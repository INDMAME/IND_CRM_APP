import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { after, before, test } from "node:test";
import { chromium, expect } from "@playwright/test";
import { build } from "esbuild";

const root = path.resolve(import.meta.dirname, "..");
const markHtml = readFileSync(path.join(root, "Web/Views/Shared/_IndActionMark.cshtml"), "utf8").replace(/@\*[\s\S]*?\*@/g, "");
const markScript = readFileSync(path.join(root, "Web/wwwroot/js/ind-action-mark.js"), "utf8");
const css = readFileSync(path.join(root, "Web/wwwroot/css/tailwind.css"), "utf8");
const fixture = await build({ stdin: { loader: "tsx", resolveDir: root, contents: `
import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { ActionFeedbackHost } from "./Web/wwwroot/react/src/pages/system/ActionFeedbackHost.tsx";
import ActionErrorNotice from "./Web/wwwroot/react/src/components/commons/ActionErrorNotice.tsx";
import { showActionError } from "./Web/wwwroot/react/src/services/actionFeedback.ts";
import { useExpenseTopbarCrudActions } from "./Web/wwwroot/react/src/pages/gastos/hooks/useExpenseTopbarCrudActions.ts";

function Fixture() {
  const [loadError, setLoadError] = useState("");
  useEffect(() => { window.setLoadError = setLoadError; window.feedbackReady = true; }, []);
  useExpenseTopbarCrudActions({ ids: { editIconId: "edit-icon", saveIconId: "save-icon", deleteBtnId: "delete-button", cancelBtnId: "cancel-button" },
    events: { editEvent: "test-save", deleteEvent: "test-delete", cancelEvent: "test-cancel" }, actionGroupId: "test-actions",
    busy: false, modalOpen: false, isEditing: true, isCreateMode: false, isLocked: false, canCreate: true, canEdit: true, canDelete: true,
    setModalError: () => {}, handleEnableEdit: () => {}, handleCancelEdit: () => {},
    handleSave: async () => window.saveSucceeded, isSaveComplete: () => window.saveComplete,
    handleDelete: async () => true, getDeleteWarning: () => window.deleteWarning,
    saveConfirmTitle: "Save", saveConfirmMessage: "Save?", saveConfirmText: "Save",
    deleteConfirmTitle: "Delete", deleteConfirmMessage: "Delete?", deleteConfirmText: "Delete",
    onSaveSuccess: () => { window.saveFinished = true; }, onDeleteSuccess: () => { window.deleteFinished = true; },
    openConfirm: options => { window.pendingConfirm = options.onConfirm; }, closeConfirm: () => {} });
  return <><ActionFeedbackHost /><ActionErrorNotice error={loadError} />
    <div id="test-actions"><button><span id="edit-icon" /><span id="save-icon" /></button>
      <button id="delete-button" /><button id="cancel-button" /></div></>;
}
window.showFailure = showActionError;
window.startFeedbackHost = () => createRoot(document.getElementById("fixture")).render(<Fixture />);
` }, bundle: true, format: "iife", write: false, logLevel: "silent" });

let browser;
before(async () => {
  const executablePath = [chromium.executablePath(), "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    "C:/Program Files/Google/Chrome/Application/chrome.exe"].find(existsSync);
  assert.ok(executablePath, "An installed Chromium browser is required");
  browser = await chromium.launch({ headless: true, executablePath });
});
after(async () => browser?.close());

// Uses the real ActionMark, popup, queue, and save orchestration without API calls or screenshots.
async function mount(start = true) {
  const page = await browser.newPage();
  await page.setContent(markHtml + '<div id="fixture"></div>');
  await page.addStyleTag({ content: css });
  await page.addScriptTag({ content: markScript });
  await page.evaluate(() => {
    window.__IND_COMMON_I18N__ = { Common_Error_Title: "Error de operación", Common_Warning_Title: "Revisa esta información",
      Common_Close: "Cerrar", Common_TraceId: "ID de seguimiento", Tickets_Error_Duplicate: "Ya existe otro ticket con la misma fecha y hora." };
    window.alert = () => { throw Error("Native alerts must not be used"); };
    window.marks = [];
    const flash = window.IND.flashActionMark;
    window.IND.flashActionMark = payload => { window.marks.push(payload.type); flash(payload); };
  });
  await page.addScriptTag({ content: fixture.outputFiles[0].text });
  if (start) {
    await page.evaluate(() => window.startFeedbackHost());
    await page.waitForFunction(() => window.feedbackReady === true);
  }
  return page;
}

test("early errors are retained and duplicate outlets share one popup with a visible error ActionMark", async () => {
  const page = await mount(false);
  try {
    await page.evaluate(() => {
      window.showFailure({ message: "Fallo de carga", traceId: "load-trace-1", severity: "error" });
      window.showFailure({ message: "Fallo de carga", traceId: "load-trace-1", severity: "error" });
      window.startFeedbackHost();
    });
    await expect(page.getByRole("dialog")).toHaveCount(1);
    await expect(page.getByRole("alert")).toHaveText("Fallo de carga");
    await expect(page.locator("[data-ind-error-trace] code")).toHaveText("load-trace-1");
    await expect(page.locator("#indActionMark")).toHaveAttribute("aria-hidden", "false");
    await expect(page.locator("#indMarkError")).toBeVisible();
    assert.equal(await page.evaluate(() => Number(getComputedStyle(document.getElementById("indActionMark")).zIndex) >
      Number(getComputedStyle(document.querySelector('dialog')).zIndex)), true);
    assert.equal(await page.locator("dialog").evaluate(element => element.matches(":modal")), false,
      "The popup must preserve the ActionMark overlay above it");
    await page.getByRole("button", { name: "Cerrar", exact: true }).click();
    await expect(page.getByRole("dialog")).toHaveCount(0);
    assert.equal(await page.evaluate(() => window.marks.includes("okProcess")), false);
  } finally { await page.close(); }
});

test("business failures use the warning mark and shared fallback translations", async () => {
  const page = await mount();
  try {
    await page.evaluate(() => window.showFailure({ message: "Raw duplicate", errorCode: "CRM_EXPENSESHEET_TICKET_DUPLICATE", traceId: "duplicate-trace" }));
    await expect(page.getByRole("alert")).toContainText("Ya existe otro ticket");
    await expect(page.locator("#indMarkWarning")).toBeVisible();
    await expect(page.locator("#indMarkCheck")).not.toBeVisible();
    await expect(page.getByText("Revisa esta información", { exact: true })).toBeVisible();
  } finally { await page.close(); }
});

test("independent errors are shown sequentially and acknowledging one never confirms success", async () => {
  const page = await mount();
  try {
    await page.evaluate(() => {
      window.showFailure({ message: "First failure", traceId: "trace-first" });
      window.showFailure({ message: "Second failure", traceId: "trace-second" });
    });
    await expect(page.getByRole("dialog")).toHaveCount(1);
    await expect(page.getByRole("alert")).toHaveText("First failure");
    await page.getByRole("button", { name: "Cerrar", exact: true }).click();
    await expect(page.getByRole("alert")).toHaveText("Second failure");
    await expect(page.getByRole("dialog")).toHaveCount(1);
    assert.equal(await page.evaluate(() => window.marks.some(type => type.startsWith("ok"))), false);
  } finally { await page.close(); }
});

test("a dismissed load error keeps source failure state and does not repeat on unrelated renders", async () => {
  const page = await mount();
  try {
    await page.evaluate(() => window.setLoadError("Load failure"));
    await expect(page.getByRole("alert")).toHaveText("Load failure");
    await page.getByRole("button", { name: "Cerrar", exact: true }).click();
    await page.evaluate(() => window.setLoadError("Load failure"));
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await page.evaluate(() => window.setLoadError(""));
    await page.evaluate(() => window.setLoadError("Load failure"));
    await expect(page.getByRole("alert")).toHaveText("Load failure");
  } finally { await page.close(); }
});

for (const [succeeded, complete, expected] of [[false, false, null], [true, false, "warningProcess"], [true, true, "okProcess"]]) {
  test(`save outcome succeeded=${succeeded}, complete=${complete} emits ${expected || "no success mark"}`, async () => {
    const page = await mount();
    try {
      await page.evaluate(([saved, done]) => {
        window.saveSucceeded = saved;
        window.saveComplete = done;
        window.dispatchEvent(new Event("test-save"));
        window.saveDone = window.pendingConfirm();
      }, [succeeded, complete]);
      if (expected) {
        await page.waitForFunction(type => window.marks.includes(type), expected);
        await expect(page.locator(expected === "okProcess" ? "#indMarkCheck" : "#indMarkWarning")).toBeVisible();
      }
      if (succeeded && !complete) {
        await expect(page.getByRole("alert")).toContainText("synchronization");
        assert.equal(await page.evaluate(() => !!window.saveFinished), false);
        await page.getByRole("button", { name: "Cerrar", exact: true }).click();
      }
      await page.evaluate(() => window.saveDone);
      assert.deepEqual(await page.evaluate(() => window.marks), expected ? [expected] : []);
      assert.equal(await page.evaluate(() => !!window.saveFinished), succeeded);
    } finally { await page.close(); }
  });
}

test("partial deletion waits for the traced warning without showing a complete deletion mark", async () => {
  const page = await mount();
  try {
    await page.evaluate(() => {
      window.deleteWarning = { message: "Sheet synchronization pending", traceId: "delete-trace", severity: "warning" };
      window.dispatchEvent(new Event("test-delete"));
      window.deleteDone = window.pendingConfirm();
    });
    await expect(page.getByRole("alert")).toHaveText("Sheet synchronization pending");
    await expect(page.locator("[data-ind-error-trace] code")).toHaveText("delete-trace");
    await expect(page.locator("#indMarkWarning")).toBeVisible();
    assert.equal(await page.evaluate(() => !!window.deleteFinished), false);
    await page.getByRole("button", { name: "Cerrar", exact: true }).click();
    await page.evaluate(() => window.deleteDone);
    assert.equal(await page.evaluate(() => window.deleteFinished), true);
    assert.deepEqual(await page.evaluate(() => window.marks), ["warningProcess"]);
  } finally { await page.close(); }
});
