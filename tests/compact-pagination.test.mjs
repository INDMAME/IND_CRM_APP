import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { after, before, test } from "node:test";
import { chromium, expect } from "@playwright/test";
import { build } from "esbuild";

const repoRoot = path.resolve(import.meta.dirname, "..");
const sourceRoot = "./Web/wwwroot/react/src";
const fixtureSource = `
import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import CompactPagination from "${sourceRoot}/components/commons/CompactPagination.tsx";
import ExpenseLinesTimeline from "${sourceRoot}/pages/gastos/components/ExpenseLinesTimeline.tsx";
import ExpenseTicketLinesList from "${sourceRoot}/pages/gastos/components/ExpenseTicketLinesList.tsx";
import HistoryResultsSection from "${sourceRoot}/pages/visitas/historial/HistoryResultsSection.tsx";

const labels = { first: "First", prev: "Previous", next: "Next", last: "Last" };
window.paginationRequests = [];

// Drives the real shared pager and its list wrappers without a backend.
function Fixture({ kind = "shared", initialTotal = 16, initialPage = 1, pageWindow, loading }) {
  const [page, setPage] = useState(initialPage);
  const [total, setTotal] = useState(initialTotal);
  window.resetPagination = (nextTotal, nextPage) => { setTotal(nextTotal); setPage(nextPage); };
  const changePage = (value) => { window.paginationRequests.push(value); setPage(value); };
  const common = { totalLinePages: total, linePage: page, paginationLabels: labels,
    onLinePageChange: changePage, onOpenLine: () => {}, visibleLines: [] };
  let content;
  if (kind === "sheet") {
    content = <ExpenseLinesTimeline {...common} companyCurrencyCode="EUR" linesLabel="LINES" emptyText="Empty" />;
  } else if (kind === "ticket") {
    content = <ExpenseTicketLinesList {...common} currencyCode="EUR" />;
  } else if (kind === "history") {
    content = <HistoryResultsSection showResults={true} isLoading={false} loadingLabel="Loading"
      timelineItems={[]} noDataText="Empty" errorMessage="" totalPages={total} currentPage={page}
      pageWindow={6} paginationLabels={labels} onNavigate={() => {}} onPageChange={changePage} />;
  } else {
    content = <CompactPagination totalPages={total} currentPage={page} pageWindow={pageWindow}
      labels={labels} loading={loading} onPageChange={changePage} />;
  }
  return <><output id="current-page">{page}</output>{content}</>;
}

window.mountPagination = (options) => createRoot(document.getElementById("root")).render(<Fixture {...options} />);
`;

const bundle = await build({
  stdin: { contents: fixtureSource, resolveDir: repoRoot, loader: "tsx" },
  bundle: true, format: "iife", write: false, logLevel: "silent",
});
const styles = await readFile(path.join(repoRoot, "Web/wwwroot/css/tailwind.css"), "utf8");
let browser;

before(async () => {
  const executablePath = [
    process.env.IND_CARD_TEST_BROWSER_PATH,
    chromium.executablePath(),
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "/usr/bin/chromium",
  ].find((candidate) => candidate && existsSync(candidate));
  assert.ok(executablePath, "An installed Chromium browser is required");
  browser = await chromium.launch({ executablePath, headless: true });
});

after(async () => { await browser?.close(); });

// Blocks all network traffic so navigation tests cannot reach CRM or Axapta.
async function withPager(options, verify, width = 375) {
  const context = await browser.newContext({ viewport: { width, height: 812 } });
  const requests = [];
  const errors = [];
  await context.route("**/*", (route) => { requests.push(route.request().url()); return route.abort(); });
  const page = await context.newPage();
  page.on("pageerror", (error) => errors.push(error.message));
  try {
    await page.setContent(`<!doctype html><html><head><style>${styles}</style></head>
      <body style="margin:0"><div id="root" style="padding:8px"></div></body></html>`);
    await page.addScriptTag({ content: bundle.outputFiles[0].text });
    await page.evaluate((value) => window.mountPagination(value), options);
    await page.locator("#current-page").waitFor();
    await verify(page);
    assert.deepEqual(errors, [], "Pagination must not raise browser errors");
    assert.deepEqual(requests, [], "Pagination must not make background requests");
  } finally {
    await context.close();
  }
}

// Asserts the complete visible range rather than reproducing its calculation.
async function expectPages(page, numbers) {
  await expect(page.locator("#pagination button").filter({ hasText: /^\d+$/ }))
    .toHaveText(numbers.map(String));
}

for (const width of [320, 375, 1280]) {
  for (const kind of ["shared", "sheet", "ticket", "history"]) {
    test(`${kind} pagination reveals following pages at each boundary (${width}px)`, async () => {
      await withPager({ kind }, async (page) => {
        const pager = page.locator("#pagination");
        await expectPages(page, [1, 2, 3, 4, 5, 6]);
        await pager.getByRole("button", { name: "6", exact: true }).click();
        await expectPages(page, [6, 7, 8, 9, 10, 11]);
        await expect(pager.locator('[aria-current="page"]')).toHaveText("6");
        await pager.getByRole("button", { name: "11", exact: true }).click();
        await expectPages(page, [11, 12, 13, 14, 15, 16]);
        await pager.getByRole("button", { name: "16", exact: true }).click();
        await expectPages(page, [11, 12, 13, 14, 15, 16]);
        await expect(pager.getByRole("button", { name: "Next", exact: true })).toBeDisabled();
        await expect(pager.getByRole("button", { name: "Last", exact: true })).toBeDisabled();
        assert.deepEqual(await page.evaluate(() => window.paginationRequests), [6, 11, 16]);
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
          "The pager must fit the viewport");
      }, width);
    });
  }
}

test("arrows, numbered pages, and keyboard navigation preserve the selected page and request count", async () => {
  await withPager({}, async (page) => {
    const pager = page.locator("#pagination");
    const button = (name) => pager.getByRole("button", { name, exact: true });
    await expect(button("First")).toBeDisabled();
    await expect(button("Previous")).toBeDisabled();
    await button("6").focus();
    await page.keyboard.press("Enter");
    await expectPages(page, [6, 7, 8, 9, 10, 11]);
    await button("Previous").click();
    await expectPages(page, [1, 2, 3, 4, 5, 6]);
    await expect(pager.locator('[aria-current="page"]')).toHaveText("5");
    await button("Next").click();
    await expectPages(page, [6, 7, 8, 9, 10, 11]);
    await button("10").click();
    await expectPages(page, [6, 7, 8, 9, 10, 11]);
    await button("Next").click();
    await expectPages(page, [11, 12, 13, 14, 15, 16]);
    await button("Last").click();
    await button("16").click();
    await button("First").click();
    await expectPages(page, [1, 2, 3, 4, 5, 6]);
    assert.deepEqual(await page.evaluate(() => window.paginationRequests), [6, 5, 6, 10, 11, 16, 1]);
  });
});

test("short lists and reduced totals never show nonexistent or isolated terminal pages", async () => {
  await withPager({}, async (page) => {
    for (const [total, current, expected] of [
      [0, 1, []], [1, 1, []], [2, 2, [1, 2]], [6, 6, [1, 2, 3, 4, 5, 6]],
      [7, 6, [6, 7]], [7, 7, [6, 7]], [11, 11, [6, 7, 8, 9, 10, 11]],
      [12, 11, [11, 12]], [12, 12, [11, 12]], [3, 1, [1, 2, 3]],
      [16, 6, [6, 7, 8, 9, 10, 11]],
    ]) {
      await page.evaluate(([nextTotal, nextPage]) => window.resetPagination(nextTotal, nextPage), [total, current]);
      if (total < 2) await expect(page.locator("#pagination")).toHaveCount(0);
      else {
        await expectPages(page, expected);
        await expect(page.locator('[aria-current="page"]')).toHaveText(String(current));
      }
    }
    assert.deepEqual(await page.evaluate(() => window.paginationRequests), []);
  });
});

test("custom window sizes still reveal following pages and allow a one-page window", async () => {
  await withPager({ pageWindow: 3, initialTotal: 8 }, async (page) => {
    await expectPages(page, [1, 2, 3]);
    await page.getByRole("button", { name: "3", exact: true }).click();
    await expectPages(page, [3, 4, 5]);
    await page.getByRole("button", { name: "5", exact: true }).click();
    await expectPages(page, [5, 6, 7]);
    await page.getByRole("button", { name: "7", exact: true }).click();
    await expectPages(page, [7, 8]);
  });
  await withPager({ pageWindow: 1, initialTotal: 3 }, async (page) => {
    await expectPages(page, [1]);
    await page.getByRole("button", { name: "Next", exact: true }).click();
    await expectPages(page, [2]);
    await page.getByRole("button", { name: "Last", exact: true }).click();
    await expectPages(page, [3]);
  });
});

test("loading disables every pagination control", async () => {
  await withPager({ loading: true }, async (page) => {
    const buttons = page.locator("#pagination button");
    assert.equal(await buttons.count(), 10);
    assert.deepEqual(await buttons.evaluateAll((items) => items.map((button) => button.disabled)), Array(10).fill(true));
    assert.deepEqual(await page.evaluate(() => window.paginationRequests), []);
  });
});
