import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import path from "node:path";
import { after, before, test } from "node:test";
import { chromium, expect } from "@playwright/test";
import { build } from "esbuild";

const root = path.resolve(import.meta.dirname, "..");
const fixture = await build({
  stdin: { resolveDir: root, loader: "tsx", contents: `
import React, { useCallback, useState } from "react";
import { createRoot } from "react-dom/client";
import ConfirmModal from "./Web/wwwroot/react/src/components/commons/ConfirmModal.tsx";
import { useConfirmDialog } from "./Web/wwwroot/react/src/hooks/useConfirmDialog.ts";
import { useExpenseSheetDeleteChoice } from "./Web/wwwroot/react/src/pages/gastos/detail/useExpenseSheetDeleteChoice.ts";

// Uses the real dialog and hook while replacing destructive operations with recorded decisions.
function Fixture() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const dialog = useConfirmDialog({ defaultConfirmText: "Delete sheet", defaultCancelText: "Cancel" });
  const onDelete = useCallback(async (deleteTickets) => {
    window.decisions.push(deleteTickets);
    setBusy(true);
    if (window.deferDeletion) await new Promise(resolve => { window.releaseDeletion = resolve; });
    const success = !window.failNext;
    window.failNext = false;
    setBusy(false);
    if (!success) setError("Retry deletion");
    return success;
  }, []);
  const onSuccess = useCallback(() => setDone(true), []);
  const choice = useExpenseSheetDeleteChoice({ busy, hasLinkedTickets: window.hasTickets, onDelete, onSuccess, openConfirm: dialog.openConfirm });
  const confirm = () => {
    setError("");
    void dialog.handleConfirm({ busy, onError: setError });
  };
  const cancel = () => {
    if (busy) return;
    if (choice.choosingTickets) {
      setError("");
      void choice.preserveTickets();
    } else dialog.cancelConfirm();
  };
  return <>
    <button onClick={() => dialog.openConfirm({ title: "Delete sheet?", message: "Delete sheet and lines?", onConfirm: async () => {
      const deleted = await choice.requestDeletion();
      if (deleted) setDone(true);
      return deleted;
    } })}>Start deletion</button>
    {done && <p>Completed</p>}
    <ConfirmModal open={dialog.modal.open} title={dialog.modal.title} message={dialog.modal.message}
      confirmText={dialog.modal.confirmText} cancelText={dialog.modal.cancelText} loadingText="Deleting"
      busy={busy} error={error} onConfirm={confirm} onCancel={cancel} />
  </>;
}
createRoot(document.getElementById("root")).render(<Fixture />);
` },
  bundle: true, write: false, format: "iife", logLevel: "silent",
});

let browser;
before(async () => {
  const executablePath = [chromium.executablePath(),
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    "C:/Program Files/Google/Chrome/Application/chrome.exe"].find(existsSync);
  assert.ok(executablePath, "An installed Chromium browser is required");
  browser = await chromium.launch({ headless: true, executablePath });
});
after(async () => browser?.close());

// Mounts an isolated local page without API, AX, Azure, or screenshots.
async function mount(hasTickets = true, failNext = false, deferDeletion = false) {
  const page = await browser.newPage();
  await page.setContent('<div id="root"></div>');
  await page.evaluate((options) => Object.assign(window, options, { decisions: [] }), { hasTickets, failNext, deferDeletion });
  await page.addScriptTag({ content: fixture.outputFiles[0].text });
  await page.getByRole("button", { name: "Start deletion" }).click();
  return page;
}

test("cancelling the first confirmation makes no deletion request", async () => {
  const page = await mount();
  try {
    await page.getByRole("button", { name: "Cancel", exact: true }).click();
    assert.deepEqual(await page.evaluate(() => window.decisions), []);
    await expect(page.getByText("Delete sheet?", { exact: true })).toHaveCount(0);
  } finally { await page.close(); }
});

for (const deleteTickets of [false, true]) {
  test(`second confirmation forwards deleteTickets=${deleteTickets} after no earlier mutation`, async () => {
    const page = await mount();
    try {
      await page.getByRole("button", { name: "Delete sheet", exact: true }).click();
      await expect(page.getByText("Delete linked tickets too?", { exact: true })).toBeVisible();
      assert.deepEqual(await page.evaluate(() => window.decisions), []);
      await page.getByRole("button", { name: deleteTickets ? "Delete tickets" : "Keep tickets", exact: true }).click();
      await expect(page.getByText("Completed", { exact: true })).toBeVisible();
      assert.deepEqual(await page.evaluate(() => window.decisions), [deleteTickets]);
    } finally { await page.close(); }
  });
}

test("an empty sheet skips the ticket question and explicitly preserves tickets", async () => {
  const page = await mount(false);
  try {
    await page.getByRole("button", { name: "Delete sheet", exact: true }).click();
    await expect(page.getByText("Completed", { exact: true })).toBeVisible();
    assert.deepEqual(await page.evaluate(() => window.decisions), [false]);
  } finally { await page.close(); }
});

test("a failed complete deletion keeps the choice dialog open for the same retry", async () => {
  const page = await mount(true, true);
  try {
    await page.getByRole("button", { name: "Delete sheet", exact: true }).click();
    await page.getByRole("button", { name: "Delete tickets", exact: true }).click();
    await expect(page.getByText("Retry deletion", { exact: true })).toBeVisible();
    await expect(page.getByText("Completed", { exact: true })).toHaveCount(0);
    await page.getByRole("button", { name: "Delete tickets", exact: true }).click();
    await expect(page.getByText("Completed", { exact: true })).toBeVisible();
    assert.deepEqual(await page.evaluate(() => window.decisions), [true, true]);
  } finally { await page.close(); }
});

test("both choices are disabled while a deletion is in flight", async () => {
  const page = await mount(true, false, true);
  try {
    await page.getByRole("button", { name: "Delete sheet", exact: true }).click();
    await page.getByRole("button", { name: "Keep tickets", exact: true }).click();
    await expect(page.getByRole("button", { name: "Keep tickets", exact: true })).toBeDisabled();
    await expect(page.getByRole("button", { name: "Deleting", exact: true })).toBeDisabled();
    await page.evaluate(() => window.releaseDeletion());
    await expect(page.getByText("Completed", { exact: true })).toBeVisible();
    assert.deepEqual(await page.evaluate(() => window.decisions), [false]);
  } finally { await page.close(); }
});
