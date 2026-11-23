import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { after, before, test } from "node:test";
import { chromium, expect } from "@playwright/test";
import { build } from "esbuild";

const repoRoot = path.resolve(import.meta.dirname, "..");
const fixtureOrigin = "http://visit-client-pagination.test";
const targetName = "BSH ELECTRODOMESTICOS ESPAÑA, S.A.";
let browser;
let fixtureBundle;
let fixtureStyles;

// Uses an existing browser and bundles the real selector without contacting the CRM.
before(async () => {
  const executablePath = [
    process.env.IND_HISTORY_TEST_BROWSER_PATH,
    chromium.executablePath(),
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "/usr/bin/chromium",
  ].find((candidate) => candidate && existsSync(candidate));
  assert.ok(executablePath, "An installed Chromium browser is required");
  const bundle = await build({
    stdin: {
      contents: `
        import React, { useState } from "react";
        import { createRoot } from "react-dom/client";
        import ClientSearchCombobox from "./Web/wwwroot/react/src/components/visitas/ClientSearchCombobox.tsx";
        import { FloatingLayerContext } from "./Web/wwwroot/react/src/components/commons/FloatingLayerContext.ts";
        function Fixture() {
          const [value, setValue] = useState(null);
          const variant = new URLSearchParams(location.search).get("variant");
          const host = variant === "compact" ? document.querySelector("#fixture-host") : undefined;
          return <FloatingLayerContext.Provider value={host}>
            <ClientSearchCombobox value={value} onSelected={setValue} variant={variant}
              label="Account" idBase="fixture-account" />
            <output id="selected-account">{value?.value || ""}</output>
          </FloatingLayerContext.Provider>;
        }
        createRoot(document.querySelector("#fixture-root")).render(<Fixture />);
      `,
      resolveDir: repoRoot,
      loader: "tsx",
    },
    bundle: true,
    format: "iife",
    write: false,
    logLevel: "silent",
  });
  fixtureBundle = bundle.outputFiles[0].text;
  fixtureStyles = await readFile(process.env.IND_VISIT_TEST_CSS || path.join(repoRoot, "Web/wwwroot/css/tailwind.css"), "utf8");
  browser = await chromium.launch({ headless: true, executablePath });
});

after(async () => {
  await browser?.close();
});

// Places the reported account on page two and leaves a final partial page.
function accounts(pageNumber) {
  const rows = Array.from({ length: 45 }, (_, index) => ({
    accountNum: index === 18 ? "702" : `FIXTURE-${index + 1}`,
    nombreComercial: index === 18 ? targetName : `ELECTRO fixture account ${index + 1}`,
  }));
  return { total: rows.length, items: rows.slice((pageNumber - 1) * 10, pageNumber * 10) };
}

// Scrolls the rendered listbox, preserving the real DOM event target and bubbling rules.
async function scrollToBottom(listbox) {
  await listbox.evaluate((element) => { element.scrollTop = element.scrollHeight; });
}

for (const viewport of [{ width: 390, height: 400 }, { width: 390, height: 700 }, { width: 1280, height: 900 }, { width: 1280, height: 1600 }, { width: 390, height: 700, failPage: true }]) {
  for (const variant of ["default", "compact"]) {
    test(`${viewport.width}x${viewport.height} ${variant}: ${viewport.failPage ? "failed page does not retry automatically" : "reaches later accounts without forced panel height"}`, async () => {
      const context = await browser.newContext({ viewport });
      const page = await context.newPage();
      page.setDefaultTimeout(5000);
      const calls = [];
      const errors = [];
      const unexpected = [];
      page.on("pageerror", (error) => errors.push(error.message));
      await context.route("**/*", async (route) => {
        const url = new URL(route.request().url());
        if (url.origin !== fixtureOrigin) {
          unexpected.push(url.href);
          return route.abort();
        }
        if (url.pathname === "/") return route.fulfill({ contentType: "text/html", body: `
          <!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1">
          <link rel="stylesheet" href="/fixture.css">
          <script>
            window.__IND_ENTRA_OID__ = "pagination-fixture-user";
            window.__IND_SELECTED_COMPANY__ = "tst";
            window.IND = { browserState: {
              getEpoch: () => 1, isPersistenceAllowed: () => true, isContextActive: () => true
            }};
          </script><script defer src="/fixture.js"></script></head>
          <body><div id="fixture-host" style="padding:24px;max-width:480px">
            <div id="fixture-root"></div>
          </div></body></html>` });
        if (url.pathname === "/fixture.js") return route.fulfill({ contentType: "application/javascript", body: fixtureBundle });
        if (url.pathname === "/fixture.css") return route.fulfill({ contentType: "text/css", body: fixtureStyles });
        if (url.pathname === "/Visitas/GetAccountsForDropdown") {
          const request = {
            term: url.searchParams.get("term"),
            page: Number(url.searchParams.get("page")),
            pageSize: Number(url.searchParams.get("pageSize")),
          };
          calls.push(request);
          if (viewport.failPage && request.page === 2) return route.fulfill({ status: 500, json: { message: "Fixture page failure" } });
          return route.fulfill({ json: accounts(request.page) });
        }
        unexpected.push(url.href);
        return route.abort();
      });
      try {
        await page.goto(`${fixtureOrigin}/?variant=${variant}`);
        const input = page.getByRole("combobox");
        await input.fill("ELECTRO");
        await input.press("Enter");
        const listbox = page.getByRole("listbox");
        if (viewport.failPage) {
          await expect.poll(() => calls.length).toBe(2);
          await expect(input).toHaveAttribute("aria-busy", "false");
          for (const height of [720, 680, 700]) {
            await page.setViewportSize({ width: 390, height });
            await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
          }
          assert.deepEqual(calls.map((call) => call.page), [1, 2]);
          await expect(listbox.getByRole("option")).toHaveCount(10);
          assert.deepEqual(errors, []);
          return;
        }
        // Short viewports scroll; larger ones must fill without a synthetic scroll event.
        if (viewport.height === 400) {
          await expect(listbox.getByRole("option")).toHaveCount(10);
          assert.equal(await listbox.evaluate((element) => element.scrollHeight > element.clientHeight), true);
          await scrollToBottom(listbox);
        }
        await expect.poll(() => listbox.getByRole("option").count()).toBeGreaterThanOrEqual(20);
        await expect(listbox.getByRole("option", { name: `${targetName} (702)` })).toHaveCount(1);
        assert.deepEqual(calls.slice(0, 2).map((call) => call.page), [1, 2]);
        for (let pageNumber = 3; pageNumber <= 5; pageNumber++) {
          await scrollToBottom(listbox);
          await expect.poll(() => listbox.getByRole("option").count()).toBeGreaterThanOrEqual(Math.min(pageNumber * 10, 45));
        }
        await listbox.getByRole("option", { name: `${targetName} (702)` }).click();
        await expect(page.locator("#selected-account")).toHaveText("702");
        await expect(listbox).toHaveCount(0);
        await page.getByRole("button", { name: "Show client options" }).click();
        await expect(listbox.getByRole("option")).toHaveCount(45);
        await scrollToBottom(listbox);
        await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
        assert.deepEqual(calls.map((call) => call.page), [1, 2, 3, 4, 5]);
        assert.ok(calls.every((call) => call.term.toLowerCase() === "electro" && call.pageSize === 10));
        assert.deepEqual(errors, []);
        assert.deepEqual(unexpected, []);
      } finally {
        await context.close();
      }
    });
  }
}
