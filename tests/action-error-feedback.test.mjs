import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { after, before, test } from "node:test";
import { chromium, expect } from "@playwright/test";
import { build } from "esbuild";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const bundle = await build({ stdin: { resolveDir: root, loader: "tsx", contents: `
import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import ConfirmModal from "./Web/wwwroot/react/src/components/commons/ConfirmModal.tsx";
import { executeExpenseMutation } from "./Web/wwwroot/react/src/pages/gastos/hooks/expenseMutationUtils.ts";
import { ApiFetchError } from "./Web/wwwroot/react/src/services/apiService.ts";
import { createActionError } from "./Web/wwwroot/react/src/utils/actionError.ts";
import ExpenseTicketErrorModal from "./Web/wwwroot/react/src/pages/gastos/components/ExpenseTicketErrorModal.tsx";
function Fixture() {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const fail = async () => {
    await executeExpenseMutation({ startStatus: "Saving", fallbackErrorMessage: "Request failed",
      setModalError: setError, setBusy, setStatus, flashOnError: false,
      action: async () => {
        if (window.logicalFailure) throw createActionError(window.failure, "Fallback");
        throw new ApiFetchError("Raw server message", 409, window.rawFailure ?? JSON.stringify(window.failure));
      } });
  };
  return <><button onClick={() => void fail()}>Run failure</button>
    {window.ticketPopup ? <ExpenseTicketErrorModal error={error} onClose={() => setError("")}
      onRetry={window.canRetry ? () => { window.retryCount = (window.retryCount || 0) + 1; setError(""); } : undefined} /> :
    <ConfirmModal open={!!error} title="Save changes" message="Save now?" error={error} busy={busy}
      status={status} loadingText="Saving" confirmText="Close" cancelText="Cancel" showCancel={false}
      onConfirm={() => setError("")} onCancel={() => setError("")} />}</>;
}
createRoot(document.getElementById("root")).render(<Fixture />);
` }, bundle: true, write: false, format: "iife", logLevel: "silent" });

let browser;
before(async () => {
  const executablePath = [chromium.executablePath(), "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    "C:/Program Files/Google/Chrome/Application/chrome.exe"].find(existsSync);
  assert.ok(executablePath, "An installed Chromium browser is required");
  browser = await chromium.launch({ headless: true, executablePath });
});
after(async () => browser?.close());

// Exercises actual transport errors, mutation handling, and the shared popup without live requests.
async function mount(options = {}) {
  const page = await browser.newPage();
  await page.setContent('<div id="root"></div>');
  await page.evaluate((values) => Object.assign(window, {
    __IND_I18N__: { Common_Error_Title: "No se ha podido completar la operación", Common_Warning_Title: "Revisa esta información", Common_TraceId: "ID de seguimiento",
      Tickets_Error_Duplicate: "Ya existe otro ticket tuyo con la misma fecha y hora. Revisa el ticket existente." },
    failure: { Success: false, Message: "Private raw diagnostic", TraceId: "trace-duplicate-123",
      ErrorCode: "CRM_EXPENSESHEET_TICKET_DUPLICATE", privateField: "Do not display raw payloads" },
  }, values), options);
  await page.addScriptTag({ content: bundle.outputFiles[0].text });
  await page.getByRole("button", { name: "Run failure" }).click();
  return page;
}

for (const logicalFailure of [false, true]) {
  test(`${logicalFailure ? "logical" : "HTTP"} duplicate failure is translated and keeps its trace in the popup footer`, async () => {
    const page = await mount({ logicalFailure });
    try {
      await expect(page.getByRole("alert")).toContainText("Ya existe otro ticket tuyo");
      await expect(page.locator("[data-ind-error-trace] code")).toHaveText("trace-duplicate-123");
      assert.equal(await page.locator("[data-ind-error-trace]").evaluate(el => el === el.parentElement.lastElementChild), true);
      await expect(page.getByText("Private raw diagnostic", { exact: true })).toHaveCount(0);
      await expect(page.getByText("Do not display raw payloads", { exact: true })).toHaveCount(0);
      await expect(page.getByText("Save now?", { exact: true })).toHaveCount(0);
      await page.getByRole("button", { name: "Close", exact: true }).click();
      await page.evaluate(() => { window.failure = { Message: "A different failure" }; });
      await page.getByRole("button", { name: "Run failure" }).click();
      await expect(page.getByRole("alert")).toHaveText("A different failure");
      await expect(page.locator("[data-ind-error-trace]")).toHaveCount(0);
    } finally { await page.close(); }
  });
}

test("a non-JSON error response never displays the raw response or an invented trace", async () => {
  const page = await mount({ rawFailure: "<html>Private proxy response</html>" });
  try {
    await expect(page.getByRole("alert")).toHaveText("Raw server message");
    await expect(page.locator("[data-ind-error-trace]")).toHaveCount(0);
    await expect(page.getByText("Private proxy response", { exact: true })).toHaveCount(0);
  } finally { await page.close(); }
});

for (const [culture, expectedPrefix] of [["es-ES", "Ya existe otro ticket tuyo"], ["en", "Another ticket of yours"],
  ["eu-ES", "Zure beste ticket"], ["it", "Esiste già"], ["pt", "Já existe"], ["zh-Hans", "你已有另一张"]]) {
  test(`duplicate error popup uses the actual ${culture} resources`, async () => {
    const resource = readFileSync(path.join(root, `App/Resources/Infrastructure/Localization/INDSharedResource.${culture}.resx`), "utf8");
    const dict = Object.fromEntries(["Common_Error_Title", "Common_Warning_Title", "Common_TraceId", "Tickets_Error_Duplicate"].map(key => {
      const value = resource.match(new RegExp(`<data name="${key}"[^>]*>\\s*<value>([^<]*)</value>`))?.[1];
      assert.ok(value, `Missing ${culture} resource ${key}`);
      return [key, value];
    }));
    const page = await mount({ __IND_I18N__: dict });
    try {
      await expect(page.getByRole("alert")).toContainText(expectedPrefix);
      await expect(page.getByText(dict.Common_Warning_Title, { exact: true })).toBeVisible();
      await expect(page.locator("[data-ind-error-trace]")).toContainText(dict.Common_TraceId);
    } finally { await page.close(); }
  });
}

test("ticket failure popup preserves the partial-upload retry action", async () => {
  const page = await mount({ ticketPopup: true, canRetry: true });
  try {
    await expect(page.locator("[data-ind-error-trace] code")).toHaveText("trace-duplicate-123");
    await page.getByRole("button", { name: "Retry upload", exact: true }).click();
    assert.equal(await page.evaluate(() => window.retryCount), 1);
    await expect(page.getByRole("alert")).toHaveCount(0);
  } finally { await page.close(); }
});
