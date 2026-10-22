import assert from "node:assert/strict";
import test from "node:test";
import { build } from "esbuild";
import { chromium } from "@playwright/test";

// Exercise the real shared transport and popup in a browser without contacting CRM.
test("API failures expose diagnostic identifiers in an accessible shared popup", async () => {
  const bundle = await build({
    stdin: {
      contents: `import './Web/wwwroot/react/src/pages/system/ApiErrorHost.tsx';
        export { fetchJson } from './Web/wwwroot/react/src/services/apiService.ts';
        export { showApiError } from './Web/wwwroot/react/src/services/apiErrorFeedback.ts';`,
      resolveDir: process.cwd(), loader: "tsx",
    },
    bundle: true, write: false, format: "iife", globalName: "errorFixture", jsx: "automatic",
  });
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage();
    await page.setContent(`<button id="origin">Upload</button><div id="ind-api-error-root"
      data-title="Error" data-close="Close" data-code="Error code" data-trace="TraceId"></div>`);
    await page.locator("#origin").focus();
    await page.addScriptTag({ content: bundle.outputFiles[0].text });

    // Inject only synthetic responses, including an unrelated field that must stay private.
    const request = async (status, body) => page.evaluate(async ({ status, body }) => {
      window.fetch = async () => new Response(JSON.stringify(body), { status });
      try { return await window.errorFixture.fetchJson("/fixture"); }
      catch (error) { return { errorCode: error.errorCode, traceId: error.traceId, status: error.status }; }
    }, { status, body });

    const result = await request(503, { Success: false, Message: "Balance exhausted", ErrorCode: "AI_QUOTA_EXCEEDED", TraceId: "trace-quota-1", secret: "PRIVATE-PROVIDER-DATA" });
    assert.deepEqual(result, { errorCode: "AI_QUOTA_EXCEEDED", traceId: "trace-quota-1", status: 503 });
    const dialog = page.getByRole("dialog", { name: "Error", exact: true });
    await dialog.waitFor();
    assert.match(await dialog.innerText(), /Balance exhausted[\s\S]*Close[\s\S]*Error code: AI_QUOTA_EXCEEDED[\s\S]*TraceId: trace-quota-1/);
    assert.doesNotMatch(await dialog.innerText(), /PRIVATE-PROVIDER-DATA/);
    await page.keyboard.press("Tab");
    assert.equal(await page.evaluate(() => document.activeElement?.textContent), "Close");
    await page.keyboard.press("Escape");
    await dialog.waitFor({ state: "detached" });
    assert.equal(await page.evaluate(() => document.activeElement?.id), "origin");
    assert.equal(await page.evaluate(() => document.body.style.overflow), "");

    await request(429, { success: false, message: "Retry later", errorCode: "AI_RATE_LIMIT_EXCEEDED", traceId: "trace-rate-2" });
    await dialog.waitFor();
    assert.match(await dialog.innerText(), /AI_RATE_LIMIT_EXCEEDED[\s\S]*trace-rate-2/);
    await dialog.getByRole("button", { name: "Close" }).click();
    await dialog.waitFor({ state: "detached" });

    await request(200, { Success: false, Message: "Validation failed", ErrorCode: "VALIDATION_ERROR", TraceId: "trace-validation-3" });
    await dialog.waitFor();
    assert.match(await dialog.innerText(), /VALIDATION_ERROR/);
    await dialog.getByRole("button", { name: "Close" }).click();
    await dialog.waitFor({ state: "detached" });
    await request(200, { Success: true, Data: { value: 1 } });
    assert.equal(await dialog.count(), 0);

    await page.evaluate(() => window.errorFixture.showApiError({ message: "Ticket failed", errorCode: "AI_QUOTA_EXCEEDED", traceId: "main-trace", details: [{ label: "attemptId", value: "attempt-1" }, { label: "ticket-create", value: "step-trace" }], onClose: () => { window.closedTicketError = true; } }));
    await dialog.waitFor();
    assert.match(await dialog.innerText(), /main-trace[\s\S]*attemptId: attempt-1[\s\S]*ticket-create: step-trace/);
    await dialog.getByRole("button", { name: "Close" }).click();
    assert.equal(await page.evaluate(() => window.closedTicketError), true);
  } finally {
    await browser.close();
  }
});
