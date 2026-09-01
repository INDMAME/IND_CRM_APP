import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const controllerUrl = new URL("../Web/Controllers/Gastos/ExpenseSheetLinkController.cs", import.meta.url);

test("expense sheet email links use one fresh detail request", async () => {
  const source = await readFile(controllerUrl, "utf8");
  const detailCalls = source.match(/GetExpenseSheetDetailAsync\(token, safeSheetId\)/gu) || [];

  assert.equal(detailCalls.length, 1);
  assert.doesNotMatch(source, /GetExpenseSheetSubordinatesAsync/u);
  assert.doesNotMatch(source, /foreach \(var candidateAxUserId/u);
});

test("the returned owner becomes the detail acting scope", async () => {
  const source = await readFile(controllerUrl, "utf8");

  assert.match(source, /NormalizeOptionalText\(sheet\.OwnerAxUserId\) \?\? GetSessionAxUserId\(\)/u);
  assert.match(source, /TempData\[ActingUserTempDataKey\] = resolvedActingUserId/u);
});
