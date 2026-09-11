import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import {
  EXPENSE_GASOLINE_GASTO_TYPE_CODE,
  isExpenseGasolineGastoType,
  shouldWarnForAiDetectedExpense,
  shouldWarnForExpenseGastoTypeChange,
} from "../Web/wwwroot/react/src/pages/gastos/hooks/useExpenseGastoTypeWarning.ts";

assert.equal(EXPENSE_GASOLINE_GASTO_TYPE_CODE, 20);

for (const gasolineValue of [20, "20", " 20 "]) {
  assert.equal(isExpenseGasolineGastoType(gasolineValue), true);
}

for (const nonGasolineValue of [3, "3", "", "   ", null]) {
  assert.equal(isExpenseGasolineGastoType(nonGasolineValue), false);
}

assert.equal(shouldWarnForExpenseGastoTypeChange(3, 20), true);
assert.equal(shouldWarnForExpenseGastoTypeChange("3", "20"), true);
assert.equal(shouldWarnForExpenseGastoTypeChange(null, " 20 "), true);

assert.equal(shouldWarnForExpenseGastoTypeChange(20, 3), false);
assert.equal(shouldWarnForExpenseGastoTypeChange(20, 20), false);
assert.equal(shouldWarnForExpenseGastoTypeChange("20", " 20 "), false);
assert.equal(shouldWarnForExpenseGastoTypeChange(3, 3), false);

assert.equal(shouldWarnForAiDetectedExpense(true, 20), true);
assert.equal(shouldWarnForAiDetectedExpense(false, 20), false);
assert.equal(shouldWarnForAiDetectedExpense(true, 3), false);

const repositoryRoot = process.cwd();
const readExpenseSource = (...segments: string[]): string =>
  readFileSync(
    path.join(repositoryRoot, "Web", "wwwroot", "react", "src", "pages", "gastos", ...segments),
    "utf8"
  );
const ticketDetailPageSource = readExpenseSource("tickets", "detail", "ExpenseTicketDetailPage.tsx");
const ticketRouteContextSource = readExpenseSource("tickets", "detail", "useExpenseTicketDetailRouteContext.ts");
const ticketListPageSource = readExpenseSource("tickets", "ExpenseTicketsPage.tsx");
const sheetDetailControllerSource = readExpenseSource("detail", "useExpenseSheetDetailPageController.tsx");
const sheetLineDetailPageSource = readExpenseSource("line", "ExpenseSheetLineDetailPage.tsx");
const gastoTypeWarningHookSource = readExpenseSource("hooks", "useExpenseGastoTypeWarning.ts");

assert.match(
  ticketDetailPageSource,
  /setDraftGastoType\(value\);\s*warnForGastoTypeChange\(previousValue, value\);/
);
assert.match(
  sheetLineDetailPageSource,
  /handleDraftTypeValueCodeChange\(value\);\s*warnForGastoTypeChange\(previousValue, value\);/
);
assert.match(
  ticketDetailPageSource,
  /aiDetectionPending,[\s\S]*aiDetectionReady: header !== null,[\s\S]*detectedGastoType: header\?\.gastoType/
);
assert.match(ticketRouteContextSource, /searchParams\.delete\(EXPENSE_AI_DETECTION_QUERY_PARAM\)/);
assert.match(ticketRouteContextSource, /const consumeAiDetection = useCallback/);
assert.match(
  gastoTypeWarningHookSource,
  /if \(aiDetectionHandledRef\.current \|\| !aiDetectionPending \|\| !aiDetectionReady\) return;[\s\S]*const shouldShowWarning = shouldWarnForAiDetectedExpense[\s\S]*if \(shouldShowWarning && dialogOpen\) return;[\s\S]*if \(shouldShowWarning\) \{\s*showWarning\(\);\s*\}\s*onAiDetectionHandled\?\.\(\);/
);
assert.match(sheetDetailControllerSource, /query\.set\(EXPENSE_AI_DETECTION_QUERY_PARAM, "1"\)/);
assert.equal(
  ticketListPageSource.match(/query\.set\(EXPENSE_AI_DETECTION_QUERY_PARAM, "1"\)/g)?.length,
  2
);

console.log("[ok] Expense gasoline gasto type warning rules passed.");
