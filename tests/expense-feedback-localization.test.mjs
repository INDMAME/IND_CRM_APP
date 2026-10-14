import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

// Checks the server-to-browser bridge, where resource-only translations previously disappeared.
test("the sheet detail sends every ticket-deletion choice translation to React", () => {
  const view = readFileSync(new URL("../Web/Views/Gastos/ExpenseSheetDetail.cshtml", import.meta.url), "utf8");
  for (const suffix of ["Title", "Body", "Delete", "Keep"]) {
    const key = `ExpenseSheets_DeleteTickets_${suffix}`;
    assert.ok(view.includes(`${key} = SR["${key}"].Value`), `Missing browser translation: ${key}`);
  }
});
