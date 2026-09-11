import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { after, before, test } from "node:test";
import { chromium, expect } from "@playwright/test";
import { build } from "esbuild";

const repoRoot = path.resolve(import.meta.dirname, "..");
const componentRoot = "./Web/wwwroot/react/src/pages/gastos/components";

const fixtureSource = `
import React, { useCallback, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import ExpenseTimelineCard from "${componentRoot}/ExpenseTimelineCard.tsx";
import ExpenseLinesTimeline from "${componentRoot}/ExpenseLinesTimeline.tsx";
import ExpenseTicketLinesList from "${componentRoot}/ExpenseTicketLinesList.tsx";
import ExpenseTicketLinkTimelineItem from "${componentRoot}/ExpenseTicketLinkTimelineItem.tsx";
import { useTimelineCardEffects } from "./Web/wwwroot/react/src/hooks/useTimelineCardEffects.ts";

const dateParts = { day: "10", month: "Sep", year: "2026" };
const paginationLabels = { first: "First", prev: "Previous", next: "Next", last: "Last" };
const longTitle = "A long expense description that must retain all of its original text for the shared preview";
const record = (value) => window.expenseCardEvents.push(value);
window.expenseCardEvents = [];
window.__IND_I18N__ = { ExpenseSheets_Field_Qty: "Quantity", Tickets_Detail_Lines: "Ticket lines" };

// Mounts the existing timeline effects around a real card.
function EffectHost({ children }) {
  const containerRef = useRef(null);
  const items = useMemo(() => ["fixture"], []);
  const resolveClickableCard = useCallback((target) => {
    const card = target?.closest?.(".timeline-card--clickable");
    return card && containerRef.current?.contains(card) ? card : null;
  }, []);
  useTimelineCardEffects({ containerRef, errorMessage: "", items, resolveClickableCard });
  return <div ref={containerRef} className="timeline-box">{children}</div>;
}

// Supplies display values and mock callbacks to either card body.
function CardFixture({ layout, customHandlers, effects }) {
  const interactionProps = customHandlers ? {
    "aria-label": "Custom card",
    "aria-pressed": true,
    role: "button",
    tabIndex: 3,
    onClick: () => record("custom-click"),
    onKeyDown: (event) => record("key:" + event.key),
    onPointerDown: (event) => record("down:" + event.pointerType),
    onPointerMove: (event) => record("move:" + event.pointerType),
    onPointerUp: (event) => record("up:" + event.pointerType),
    onPointerCancel: (event) => record("cancel:" + event.pointerType),
    onContextMenu: (event) => { event.preventDefault(); record("context"); },
  } : undefined;
  const card = <div className="timeline-item">
    <ExpenseTimelineCard
      layout={layout}
      dateParts={dateParts}
      title={effects ? longTitle : "Expense example"}
      subtitle="Owner Alpha"
      amountText="1,234.50 EUR"
      statusClassName="expense-sheet-card__status expense-sheet-card__status--review"
      statusLabel="Approval requested"
      statusIcon={<span role="img" aria-label="AI processed">AI</span>}
      leadingIcon={<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4 4h16v16H4z" /></svg>}
      onOpen={() => record("open:" + layout)}
      interactionProps={interactionProps}
    />
  </div>;
  return <div id="fixture" className={effects ? "preview-fixture" : undefined}>
    {effects ? <EffectHost>{card}</EffectHost> : card}
  </div>;
}

// Keeps selection state in the consumer, as the production wrapper expects.
function TicketLinkFixture({ selectionDisabled = false, isSelectable = true }) {
  const [selected, setSelected] = useState(false);
  return <div id="fixture" className="timeline-box">
    <ExpenseTicketLinkTimelineItem
      fileId="TICKET-42"
      dateParts={dateParts}
      title="Linked ticket example"
      subtitle="Existing expense type"
      amountText="25.00 EUR"
      isSelected={selected}
      isSelectable={isSelectable}
      selectionDisabled={selectionDisabled}
      selectLabel="Select ticket"
      onOpenDetail={() => record("open:TICKET-42")}
      onToggleSelect={() => { record("select:TICKET-42"); setSelected((value) => !value); }}
    />
  </div>;
}

// Pages local sample rows without invoking a service or changing a real record.
function SheetLinesFixture() {
  const containerRef = useRef(null);
  const [page, setPage] = useState(1);
  const allLines = useMemo(() => Array.from({ length: 7 }, (_, index) => ({
    lineRecId: index === 0 ? "-123" : String(index + 1),
    description: "Sheet line " + (index + 1),
    transDate: "2026-09-10",
    amountMST: 10 + index,
    typeValue: "Existing type",
    typeValueCode: "20",
    fileId: index === 0 ? "FILE-123" : "",
  })), []);
  return <div id="fixture">
    <div style={{ height: 700 }} aria-hidden="true" />
    <output id="fixture-page">{page}</output>
    <ExpenseLinesTimeline
      visibleLines={allLines.slice((page - 1) * 6, page * 6)}
      companyCurrencyCode="EUR"
      totalLinePages={2}
      linePage={page}
      linesLabel="LINES"
      emptyText="No expense lines"
      paginationLabels={paginationLabels}
      containerRef={containerRef}
      onLinePageChange={(nextPage) => { record("page:" + nextPage); setPage(nextPage); }}
      onOpenLine={(id) => record("line:" + id)}
    />
    <div style={{ height: 1200 }} aria-hidden="true" />
  </div>;
}

// Supplies only fields that are present on a real ticket line.
function TicketLinesFixture() {
  const containerRef = useRef(null);
  const lines = [{ recId: "-456", description: "Ticket detail line", qty: 2,
    price: 8.75, totalAmount: 17.5, reimbursableExpense: null,
    reimbursableAmount: null, refRecIdTable: "", createdByUserId: "", adjustmentAmount: null }];
  return <div id="fixture"><ExpenseTicketLinesList
    visibleLines={lines} totalLinePages={1} linePage={1} currencyCode="EUR"
    paginationLabels={paginationLabels} containerRef={containerRef}
    onLinePageChange={(page) => record("page:" + page)}
    onOpenLine={(id) => record("ticket-line:" + id)}
  /></div>;
}

const root = createRoot(document.getElementById("root"));
window.mountExpenseCardFixture = (kind, options) => {
  const Component = { card: CardFixture, link: TicketLinkFixture,
    sheetLines: SheetLinesFixture, ticketLines: TicketLinesFixture }[kind];
  root.render(<Component {...options} />);
};
`;

const fixtureBundle = await build({
  stdin: { contents: fixtureSource, resolveDir: repoRoot, loader: "tsx" },
  bundle: true,
  format: "iife",
  write: false,
  logLevel: "silent",
});

const styles = (await Promise.all(
  ["tailwind.css", "layout.css", "Historial.css", "expense-cards.css"].map((file) =>
    readFile(path.join(repoRoot, "Web", "wwwroot", "css", file), "utf8")
  )
)).join("\n");

let browser;

// Uses an installed browser without downloading packages or contacting an app.
function resolveBrowserPath() {
  if (process.env.IND_CARD_TEST_BROWSER_PATH) {
    assert.ok(existsSync(process.env.IND_CARD_TEST_BROWSER_PATH), "IND_CARD_TEST_BROWSER_PATH must exist");
    return process.env.IND_CARD_TEST_BROWSER_PATH;
  }
  const candidates = [
    chromium.executablePath(),
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
    "/usr/bin/google-chrome",
  ];
  const executablePath = candidates.find((candidate) => existsSync(candidate));
  assert.ok(executablePath, "Install a Playwright browser or set IND_CARD_TEST_BROWSER_PATH to an installed Chromium browser");
  return executablePath;
}

before(async () => {
  browser = await chromium.launch({ headless: true, executablePath: resolveBrowserPath() });
});

after(async () => {
  await browser?.close();
});

// Runs the real components on about:blank with all network requests blocked.
async function withFixture(kind, options, verify) {
  const context = await browser.newContext({ viewport: { width: 375, height: 812 }, locale: "en-US" });
  const requests = [];
  const errors = [];
  await context.route("**/*", (route) => {
    requests.push(route.request().url());
    return route.abort();
  });
  const page = await context.newPage();
  page.on("pageerror", (error) => errors.push(error.message));
  try {
    await page.setContent(`<!doctype html><html lang="en-US"><head><style>${styles}</style>
      <style>body { margin: 0; } #root { padding: 16px; }
      .preview-fixture .timeline-name { width: 90px !important; max-width: 90px !important;
        white-space: nowrap !important; overflow: hidden; }</style></head>
      <body><div id="root"></div></body></html>`);
    await page.addScriptTag({ content: fixtureBundle.outputFiles[0].text });
    await page.evaluate(({ kind, options }) => window.mountExpenseCardFixture(kind, options), { kind, options });
    await page.locator("#fixture .timeline-card").first().waitFor();
    await verify(page);
    assert.deepEqual(errors, [], "The isolated components must not raise browser errors");
    assert.deepEqual(requests, [], "The fixture must not call a URL, API, or authenticated application");
    assert.equal(page.url(), "about:blank");
  } finally {
    await context.close();
  }
}

// Reads only mock callback events generated by the isolated fixture.
async function events(page) {
  return page.evaluate(() => window.expenseCardEvents);
}

for (const layout of ["header", "line"]) {
  test(`${layout} cards open once for click, Enter, and Space`, async () => {
    await withFixture("card", { layout }, async (page) => {
      const card = page.locator("#fixture .timeline-card");
      await card.click({ position: { x: 12, y: 12 } });
      await card.focus();
      await page.keyboard.press("Enter");
      await page.keyboard.press("Space");
      assert.deepEqual(await events(page), Array(3).fill(`open:${layout}`));
      assert.equal(await card.getAttribute("type"), "button");
    });
  });

  test(`${layout} cards preserve custom click, keyboard, pointer, and context handlers`, async () => {
    await withFixture("card", { layout, customHandlers: true }, async (page) => {
      const card = page.getByRole("button", { name: "Custom card", exact: true });
      assert.equal(await card.getAttribute("tabindex"), "3");
      assert.equal(await card.getAttribute("aria-pressed"), "true");
      const contextWasPrevented = await card.evaluate((element) => {
        element.click();
        element.dispatchEvent(new KeyboardEvent("keydown", { key: "X", bubbles: true }));
        for (const type of ["pointerdown", "pointermove", "pointerup", "pointercancel"]) {
          element.dispatchEvent(new PointerEvent(type, { bubbles: true, pointerType: "pen" }));
        }
        const event = new MouseEvent("contextmenu", { bubbles: true, cancelable: true });
        element.dispatchEvent(event);
        return event.defaultPrevented;
      });
      assert.equal(contextWasPrevented, true);
      assert.deepEqual(await events(page), ["custom-click", "key:X", "down:pen", "move:pen", "up:pen", "cancel:pen", "context"]);
    });
  });

  test(`${layout} metadata survives the real shared title and preview effects`, async () => {
    await withFixture("card", { layout, effects: true }, async (page) => {
      const title = page.locator("#fixture .timeline-name");
      await page.waitForFunction(() => document.querySelector("#fixture .timeline-name")?.dataset.preview === "1");
      const fullTitle = await title.getAttribute("data-fulltext");
      assert.notEqual(await title.textContent(), fullTitle, "The shared effect must actually run");
      assert.equal(await page.locator("#fixture .expense-card__date").textContent(), "10 Sep 2026");
      assert.equal(await page.locator("#fixture .expense-sheet-card__subtitle").textContent(), "Owner Alpha");
      assert.equal(await page.locator("#fixture .expense-sheet-card__amount").textContent(), "1,234.50 EUR");
      assert.equal(await page.locator("#fixture .expense-sheet-card__status").textContent(), "Approval requested");
      assert.equal(await page.getByRole("img", { name: "AI processed", exact: true }).count(), 1);
      await title.hover();
      await page.waitForFunction(() => document.getElementById("timelineTooltip")?.classList.contains("visible"));
      assert.equal(await page.locator("#timelineTooltip").textContent(), fullTitle);
      await page.keyboard.press("Escape");
      await page.waitForFunction(() => !document.getElementById("timelineTooltip")?.classList.contains("visible"));
      assert.deepEqual(await events(page), []);
    });
  });
}

test("ticket selection stays separate from opening and preserves its focus target", async () => {
  await withFixture("link", {}, async (page) => {
    const item = page.locator('.timeline-item[data-ticket-file-id="TICKET-42"]');
    const card = item.locator(".timeline-card--clickable");
    const selection = page.getByRole("button", { name: "Select ticket", exact: true });
    assert.equal(await item.locator("button button").count(), 0);
    assert.equal(await selection.getAttribute("aria-pressed"), "false");
    await selection.click();
    await page.waitForFunction(() => document.querySelector('[data-ticket-file-id="TICKET-42"]')?.dataset.ticketSelected === "true");
    assert.equal(await selection.getAttribute("aria-pressed"), "true");
    assert.deepEqual(await events(page), ["select:TICKET-42"]);
    await card.click({ position: { x: 12, y: 12 } });
    await card.focus();
    assert.equal(await card.evaluate((element) => document.activeElement === element), true);
    await page.keyboard.press("Enter");
    await page.keyboard.press("Space");
    assert.deepEqual(await events(page), ["select:TICKET-42", "open:TICKET-42", "open:TICKET-42", "open:TICKET-42"]);
    await selection.focus();
    await page.keyboard.press("Space");
    assert.equal(await selection.getAttribute("aria-pressed"), "false");
    const prevented = await card.evaluate((element) => {
      const event = new MouseEvent("contextmenu", { bubbles: true, cancelable: true });
      element.dispatchEvent(event);
      return event.defaultPrevented;
    });
    assert.equal(prevented, true);
    assert.equal(await item.getAttribute("data-ticket-selectable"), "true");
  });
});

for (const options of [{ selectionDisabled: true }, { isSelectable: false }]) {
  test(`ticket selection rejects ${Object.keys(options)[0]} without blocking detail opening`, async () => {
    await withFixture("link", options, async (page) => {
      const selection = page.getByRole("button", { name: "Select ticket", exact: true });
      assert.equal(await selection.isDisabled(), true);
      await selection.evaluate((element) => element.click());
      assert.deepEqual(await events(page), []);
      assert.equal(await selection.getAttribute("aria-pressed"), "false");
      assert.equal(await page.locator("[data-ticket-selectable]").getAttribute("data-ticket-selectable"), "false");
      await page.locator("#fixture .timeline-card").click({ position: { x: 12, y: 12 } });
      assert.deepEqual(await events(page), ["open:TICKET-42"]);
    });
  });
}

test("sheet rows preserve accessible type, signed identifiers, linked metadata, and the LINES pagination focus", async () => {
  await withFixture("sheetLines", {}, async (page) => {
    const firstCard = page.locator("#fixture .timeline-card").first();
    assert.equal(await page.getByRole("group", { name: "FILE-123", exact: true }).count(), 1);
    await expect(firstCard).toHaveAccessibleName(/Existing type/u);
    await firstCard.click({ position: { x: 12, y: 12 } });
    assert.deepEqual(await events(page), ["line:-123"]);
    await page.getByRole("button", { name: "2", exact: true }).click();
    await page.waitForFunction(() => document.getElementById("fixture-page")?.textContent === "2"
      && document.activeElement?.getAttribute("aria-label") === "LINES");
    assert.equal(await page.locator("#fixture .timeline-card").count(), 1);
    assert.ok(await page.evaluate(() => window.scrollY > 0), "Pagination must reveal the section rather than the document top");
    await page.locator("#fixture .timeline-card").focus();
    await page.keyboard.press("Enter");
    assert.deepEqual(await events(page), ["line:-123", "page:2", "line:7"]);
  });
});

test("ticket detail rows retain quantity and their own identifier without inheriting a date or type", async () => {
  await withFixture("ticketLines", {}, async (page) => {
    const card = page.locator("#fixture .timeline-card");
    assert.match(await card.locator(".expense-sheet-card__subtitle").textContent(), /^Quantity: 2[.,]00$/u);
    assert.equal(await card.locator(".expense-card__date").count(), 0);
    assert.equal(await card.locator(".expense-card-line__icon svg[aria-hidden=true]").count(), 1);
    assert.equal(await card.locator(".expense-sheet-card__status").count(), 0);
    await card.click({ position: { x: 12, y: 12 } });
    await card.focus();
    await page.keyboard.press("Enter");
    await page.keyboard.press("Space");
    assert.deepEqual(await events(page), Array(3).fill("ticket-line:-456"));
  });
});
