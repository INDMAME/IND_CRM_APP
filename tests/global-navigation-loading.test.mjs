import { readFileSync } from "node:fs";
import { test } from "node:test";
import assert from "node:assert/strict";
import { chromium } from "@playwright/test";

const layoutPath = process.env.IND_LOADING_LAYOUT || new URL("../Web/Views/Shared/_Layout.cshtml", import.meta.url);
const layout = readFileSync(layoutPath, "utf8");
const script = [...layout.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)]
  .map((match) => match[1]).find((body) => body.includes('const overlay = document.getElementById("indGlobalLoading")'));
assert.ok(script, "The actual layout loading script must exist.");
const html = `<!doctype html><html><body>
<style>.ind-global-loading {position:fixed;inset:0;z-index:4000;background:white}.ind-global-loading--hidden {opacity:0;pointer-events:none}</style>
<div id="indGlobalLoading" class="ind-global-loading" role="status" aria-hidden="false"><span data-ind-loading-text>Loading</span></div>
<a id="next" href="/Visitas/Detalle/test">Open detail</a><a id="hash" href="#section">Section</a>
<a id="download" href="/file" download>Download</a>
<button id="detail" onclick="window.location.href='/Visitas/Detalle/test'">Detail</button>
<button id="action" onclick="window.actions=(window.actions||0)+1">Action</button>
<script>${script}</script></body></html>`;

// Run the real Razor script in a browser without a business session or production writes.
test("global navigation loading behavior", async (t) => {
  const browser = await chromium.launch({ headless: true });
  try {
    async function withPage(run, legacy = false) {
      const page = await browser.newPage();
      if (legacy) await page.addInitScript(() => Object.defineProperty(window, "navigation", { value: undefined }));
      page.setDefaultTimeout(8000);
      page.setDefaultNavigationTimeout(8000);
      let release;
      const pending = new Promise((resolve) => { release = resolve; });
      await page.route("https://loading-test.invalid/**", async (route) => {
        const path = new URL(route.request().url()).pathname;
        if (path === "/Visitas/Detalle/test") await pending;
        await route.fulfill(path === "/file"
          ? { status: 200, headers: { "Content-Disposition": 'attachment; filename="test.txt"' }, body: "test" }
          : { status: 200, contentType: "text/html", body: html });
      });
      try {
        await page.goto("https://loading-test.invalid/Historial/History");
        await run(page, release);
      } finally {
        release();
        await page.close();
      }
    }
    const visible = (page) => page.locator("#indGlobalLoading").getAttribute("aria-hidden").then((v) => v === "false");
    const start = (page) => page.evaluate(() => window.dispatchEvent(new Event("beforeunload", { cancelable: true })));

    await t.test("initial load clears the spinner", () => withPage(async (page) => {
      assert.equal(await visible(page), false);
    }));
    await t.test("loading prevents the sidebar outside-press handler from dismissing its backdrop", () => withPage(async (page) => {
      await page.evaluate(() => {
        window.outsidePresses = 0;
        document.addEventListener("pointerdown", () => window.outsidePresses++, true);
        document.addEventListener("touchstart", () => window.outsidePresses++, true);
      });
      await start(page);
      await page.mouse.click(400, 300);
      await page.evaluate(() => document.getElementById("indGlobalLoading").dispatchEvent(new Event("touchstart", { bubbles: true, cancelable: true })));
      assert.equal(await page.evaluate(() => window.outsidePresses), 0);
      assert.equal(await visible(page), true);
      await page.evaluate(() => window.dispatchEvent(new PageTransitionEvent("pageshow", { persisted: true })));
      await page.mouse.click(400, 300);
      assert.equal(await page.evaluate(() => window.outsidePresses), 1);
    }));
    await t.test("manual async loading blocks backdrop presses until completion", () => withPage(async (page) => {
      await page.evaluate(() => {
        window.outsidePresses = 0;
        document.addEventListener("pointerdown", () => window.outsidePresses++, true);
        window.__indShowGlobalSpinner();
      });
      await page.mouse.click(400, 300);
      assert.equal(await page.evaluate(() => window.outsidePresses), 0);
      await page.evaluate(() => window.__indHideGlobalSpinner());
      await page.mouse.click(400, 300);
      assert.equal(await page.evaluate(() => window.outsidePresses), 1);
    }));
    await t.test("real backdrop pointer clicks cannot dismiss pending navigation", () => withPage(async (page, release) => {
      const states = [];
      page.on("console", (message) => {
        if (message.text().startsWith("backdrop-state:")) states.push(message.text().slice(15));
      });
      await page.evaluate(() => {
        const overlay = document.getElementById("indGlobalLoading");
        new MutationObserver(() => console.log("backdrop-state:" + overlay.getAttribute("aria-hidden")))
          .observe(overlay, { attributes: true, attributeFilter: ["aria-hidden"] });
      });
      await page.locator("#next").click({ noWaitAfter: true });
      await page.mouse.click(400, 300);
      await page.mouse.dblclick(400, 300);
      await new Promise((resolve) => setTimeout(resolve, 200));
      assert.ok(states.length > 0, "Loading must have started");
      assert.ok(states.every((state) => state === "false"), "Backdrop interaction must not hide loading: " + states);
      release();
      await page.waitForURL("**/Visitas/Detalle/test", { waitUntil: "load" });
    }));
    for (const [selector, legacy] of [["#next", false], ["#detail", false], ["#next", true], ["#detail", true]]) {
    await t.test(selector + (legacy ? " legacy" : "") + " delayed navigation shows feedback before the response", () => withPage(async (page, release) => {
      const observations = [];
      let responseReleased = false;
      page.on("console", (message) => {
        if (message.text().startsWith("loading-state:")) {
          observations.push({ ...JSON.parse(message.text().slice(14)), responseReleased });
        }
      });
      await page.evaluate(() => {
        const observer = new MutationObserver(() => {
          if (document.body.getAttribute("aria-busy") !== "true") return;
          document.querySelector("#action").click();
          console.log("loading-state:" + JSON.stringify({
            hidden: document.getElementById("indGlobalLoading").getAttribute("aria-hidden"),
            actions: window.actions || 0,
          }));
          observer.disconnect();
        });
        observer.observe(document.body, { attributes: true });
      });
      await page.locator(selector).click({ noWaitAfter: true });
      await new Promise((resolve) => setTimeout(resolve, 500));
      responseReleased = true;
      release();
      await page.waitForURL("**/Visitas/Detalle/test", { waitUntil: "load" });
      assert.deepEqual(observations, [{ hidden: "false", actions: 0, responseReleased: false }]);
      assert.equal(await visible(page), false);
    }, legacy));
    }
    await t.test("canceled unload leaves the page usable", () => withPage(async (page) => {
      await page.evaluate(() => {
        window.addEventListener("beforeunload", (event) => event.preventDefault(), { once: true });
        window.dispatchEvent(new Event("beforeunload", { cancelable: true }));
      });
      assert.equal(await visible(page), false);
      await page.locator("#action").click();
      assert.equal(await page.evaluate(() => window.actions), 1);
    }));
    await t.test("manual loads cannot hide a pending navigation", () => withPage(async (page) => {
      await start(page);
      await page.evaluate(() => { window.__indShowGlobalSpinner(); window.__indHideGlobalSpinner(); });
      assert.equal(await visible(page), true);
    }));
    await t.test("load event does not hide an active async operation", () => withPage(async (page) => {
      await page.evaluate(() => { window.__indShowGlobalSpinner(); window.dispatchEvent(new Event("load")); });
      assert.equal(await visible(page), true);
      await page.evaluate(() => window.__indHideGlobalSpinner());
      assert.equal(await visible(page), false);
    }));
    await t.test("back-forward restoration resets pending navigation", () => withPage(async (page) => {
      await start(page);
      await page.evaluate(() => window.dispatchEvent(new PageTransitionEvent("pageshow", { persisted: true })));
      assert.equal(await visible(page), false);
      await page.locator("#action").click();
      assert.equal(await page.evaluate(() => window.actions), 1);
    }));
    await t.test("Escape cannot hide feedback while the request is still pending", () => withPage(async (page) => {
      await start(page);
      await page.keyboard.press("Escape");
      assert.equal(await visible(page), true);
    }));
    await t.test("same-document links do not block the page", () => withPage(async (page) => {
      await page.locator("#hash").click();
      assert.equal(await visible(page), false);
    }));
    await t.test("downloads do not leave the page blocked", () => withPage(async (page) => {
      const download = page.waitForEvent("download");
      await page.locator("#download").click();
      await download;
      assert.equal(await visible(page), false);
    }));
    await t.test("server attachments without download attributes remain usable", () => withPage(async (page) => {
      await page.locator("#download").evaluate((link) => link.removeAttribute("download"));
      const download = page.waitForEvent("download");
      await page.locator("#download").click();
      await download;
      assert.equal(await visible(page), false);
    }));
    await t.test("keyboard activation is blocked during navigation", () => withPage(async (page) => {
      await page.locator("#action").focus();
      await start(page);
      await page.keyboard.press("Enter");
      assert.equal(await page.evaluate(() => window.actions || 0), 0);
    }));
  } finally { await browser.close(); }
});
