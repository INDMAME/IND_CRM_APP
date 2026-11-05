import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { test } from "node:test";
import assert from "node:assert/strict";
import { chromium, webkit } from "@playwright/test";

const root = resolve("Web/wwwroot");
const html = `<!doctype html><html lang="en"><body>
<div id="visitas-history-root" data-default-from="2026-08-08" data-default-to="2026-11-05"
 data-company-id="AZM" data-ax-user-id="VIEWER" data-permissions-revision="REV"></div>
<script>
window.__IND_MODULE_ACCESS__={VISITAS_GESTION:4};
window.__IND_SELECTED_COMPANY__="AZM";
window.__IND_VISIBLE_VISIT_USERS__=[{AxUserId:"STALE",Name:"Stale owner"}];
window.__IND_I18N__={Common_Loading:"Loading",History_Filter_Refresh:"Retry",Auth_PermissionDenied_Body:"Denied"};
window.IND={showPermissionModal:()=>{window.denied=true}};
</script><script type="module" src="/js/history.js"></script></body></html>`;
const owners = [{ AxUserId: "VIEWER", Name: "Viewer", CanMutate: true }];

// Exercise the actual production bundle while holding authorization and activity responses.
for (const [name, engine] of [["Chromium", chromium], ["WebKit", webkit]]) {
  test(name + " asynchronous history", async (t) => {
    const browser = await engine.launch({ headless: true });
    try {
      for (const mode of ["success", "empty", "failure-with-items", "forbidden", "server-error"]) {
        await t.test(mode, async () => {
          const page = await browser.newPage();
          page.setDefaultTimeout(5000);
          const errors = [];
          page.on("pageerror", (error) => errors.push(error.message));
          let release;
          const pending = new Promise((r) => { release = r; });
          let ownerRequests = 0;
          const activityRequests = [];
          await page.route("https://history-test.invalid/**", async (route) => {
            const url = new URL(route.request().url());
            if (url.pathname === "/api/crm/data-visibility/visible-users") {
              ownerRequests++;
              await pending;
              const retry = ownerRequests > 1;
              return route.fulfill({ status: retry ? 200 : mode === "forbidden" ? 403 : mode === "server-error" ? 500 : 200,
                json: { Success: retry || mode === "success" || mode === "empty", Items: mode === "empty" ? [] : owners, Message: "Visibility failed" } });
            }
            if (url.pathname === "/Historial/GetActivities") {
              activityRequests.push(url.search);
              return route.fulfill({ json: { total: 0, items: [] } });
            }
            if (url.pathname.startsWith("/js/")) return route.fulfill({
              contentType: "text/javascript", body: readFileSync(resolve(root, "." + url.pathname)) });
            return route.fulfill({ contentType: "text/html", body: html });
          });
          try {
            await page.goto("https://history-test.invalid/Historial/History");
            await page.waitForSelector("#resultsLoader");
            assert.equal(activityRequests.length, 0, "Activities must wait for fresh visibility");
            assert.equal(ownerRequests, 1, "Stale preloaded owners must not skip the request");
            assert.equal(await page.locator("fieldset button").first().isDisabled(), true);
            release();
            if (["failure-with-items", "forbidden", "server-error"].includes(mode)) {
              await page.waitForSelector('[role="alert"]');
              assert.equal(activityRequests.length, 0, "A failed permission lookup must not start a query");
              assert.equal(await page.locator("fieldset button").first().isDisabled(), true);
              await page.getByRole("button", { name: "Retry", exact: true }).click();
            }
            await page.waitForFunction(() => getComputedStyle(document.querySelector("#resultsLoader")).display === "none");
            for (let i = 0; i < 30 && activityRequests.length === 0; i++) await page.waitForTimeout(50);
            assert.equal(activityRequests.length, 1, "The initial activity query runs once after visibility succeeds");
            assert.ok(activityRequests.every((query) => !query.includes("STALE")));
            assert.deepEqual(errors, []);
          } catch (error) {
            console.error(error.stack);
            console.error({ mode, ownerRequests, activityRequests, errors, body: (await page.locator("body").innerText()).slice(0, 500) });
            throw error;
          } finally { release(); await page.close(); }
        });
      }
    } finally { await browser.close(); }
  });
}
