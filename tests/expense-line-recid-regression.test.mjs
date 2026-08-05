import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(currentDirectory, "..");

const expenseApiSource = readFileSync(
  path.join(
    repositoryRoot,
    "Web",
    "wwwroot",
    "react",
    "src",
    "pages",
    "gastos",
    "utils",
    "expenseApi.ts",
  ),
  "utf8",
);
const expenseLinePageSource = readFileSync(
  path.join(
    repositoryRoot,
    "Web",
    "wwwroot",
    "react",
    "src",
    "pages",
    "gastos",
    "line",
    "ExpenseSheetLineDetailPage.tsx",
  ),
  "utf8",
);
const expenseApiMirrorSource = readFileSync(
  path.join(
    repositoryRoot,
    "wwwroot",
    "react",
    "src",
    "pages",
    "gastos",
    "utils",
    "expenseApi.ts",
  ),
  "utf8",
);
const expenseLinePageMirrorSource = readFileSync(
  path.join(
    repositoryRoot,
    "wwwroot",
    "react",
    "src",
    "pages",
    "gastos",
    "line",
    "ExpenseSheetLineDetailPage.tsx",
  ),
  "utf8",
);
const gastosControllerSource = readFileSync(
  path.join(repositoryRoot, "Web", "Controllers", "Gastos", "GastosController.cs"),
  "utf8",
);

// Extracts one source unit so each assertion stays scoped to the intended flow.
function sourceBetween(source, startMarker, endMarker) {
  const start = source.indexOf(startMarker);
  assert.notEqual(start, -1, `Missing source marker: ${startMarker}`);

  const end = source.indexOf(endMarker, start + startMarker.length);
  assert.notEqual(end, -1, `Missing source marker: ${endMarker}`);
  return source.slice(start, end);
}

const deleteTicketClientSource = sourceBetween(
  expenseApiSource,
  "export const deleteExpenseSheetTicket = async (",
  "export const applyExpenseSheetTicketIa = async (",
);
const deleteTicketClientMirrorSource = sourceBetween(
  expenseApiMirrorSource,
  "export const deleteExpenseSheetTicket = async (",
  "export const applyExpenseSheetTicketIa = async (",
);
const deleteTicketProxySource = sourceBetween(
  gastosControllerSource,
  "public async Task<IActionResult> ApiExpenseSheetTicketDelete(",
  "public async Task<IActionResult> ApiExpenseSheetTicketApplyIa(",
);

test("ticket deletion preserves signed non-zero line RecIds", () => {
  for (const source of [deleteTicketClientSource, deleteTicketClientMirrorSource]) {
    assert.match(source, /Number\(lineRecId\)\s*!==\s*0/);
    assert.doesNotMatch(source, /Number\(lineRecId\)\s*>\s*0/);
  }
  assert.match(deleteTicketProxySource, /lineRecId\.Value\s*==\s*0/);
  assert.doesNotMatch(deleteTicketProxySource, /lineRecId\.Value\s*<=\s*0/);
});

test("manual-line ticket FAB uses the standard Gastos baseline", () => {
  for (const source of [expenseLinePageSource, expenseLinePageMirrorSource]) {
    assert.match(source, /LINE_TICKET_FAB_BASELINE_BOTTOM_PX\s*=\s*24/);
    assert.match(source, /LINE_TICKET_FAB_WITH_NAVIGATOR_BOTTOM_PX\s*=\s*98/);
    assert.match(source, /const lineTicketFabBottom\s*=\s*lineNavigator/);
    assert.doesNotMatch(source, /LINE_TICKET_FAB_WITH_NAVIGATOR_BOTTOM_PX\s*=\s*110/);
  }
});
