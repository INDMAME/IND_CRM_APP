import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import {
  resolveExistingExpenseProjectId,
  resolveExistingExpenseProjectIdFromPages,
} from "../Web/wwwroot/react/src/pages/gastos/utils/expenseProjectValidation.ts";

const projectOptions = [
  { value: "PRJ-001", text: "First project" },
  { ProjId: "prj-002", Name: "Second project" },
];

assert.equal(resolveExistingExpenseProjectId("PRJ-001", projectOptions), "PRJ-001");
assert.equal(resolveExistingExpenseProjectId(" PRJ-002 ", projectOptions), "prj-002");
assert.equal(resolveExistingExpenseProjectId("VARIOS", projectOptions), "");
assert.equal(resolveExistingExpenseProjectId("VARIOUS", projectOptions), "");
assert.equal(resolveExistingExpenseProjectId("PRJ-00", projectOptions), "");
assert.equal(resolveExistingExpenseProjectId("MISSING", projectOptions), "");
assert.equal(resolveExistingExpenseProjectId("", projectOptions), "");
assert.equal(resolveExistingExpenseProjectId("PRJ-001", []), "");

let loadedPages = 0;
assert.equal(
  await resolveExistingExpenseProjectIdFromPages("PRJ-003", async (page) => {
    loadedPages += 1;
    return page === 1
      ? { total: 51, items: projectOptions }
      : { total: 51, items: [{ value: "PRJ-003" }] };
  }),
  "PRJ-003"
);
assert.equal(loadedPages, 2);
assert.equal(
  await resolveExistingExpenseProjectIdFromPages("PRJ-001", async () => {
    throw new Error("catalog unavailable");
  }),
  ""
);

const repositoryRoot = process.cwd();
const readExpenseSource = (...segments: string[]): string =>
  readFileSync(
    path.join(repositoryRoot, "Web", "wwwroot", "react", "src", "pages", "gastos", ...segments),
    "utf8"
  );
const lineStateSource = readExpenseSource("line", "useExpenseSheetLineDetailState.ts");
const linePageSource = readExpenseSource("line", "ExpenseSheetLineDetailPage.tsx");
const linkedLineSource = readExpenseSource("tickets", "detail", "useExpenseTicketLinkedSheetLine.ts");
const linkedSyncSource = readExpenseSource("utils", "expenseLinkedTicketSheetSync.ts");
const expenseApiSource = readExpenseSource("utils", "expenseApi.ts");
const lineXpoSource = readFileSync(
  path.join(repositoryRoot, ".codex", "Axapta", "CRMHojaGastosLine.xpo"),
  "latin1"
);
const serviceXpoSource = readFileSync(
  path.join(repositoryRoot, ".codex", "Axapta", "INDCRMExpenseSheetService.xpo"),
  "latin1"
);

assert.match(expenseApiSource, /resolveExistingExpenseProjectIdFromPages/);
assert.match(
  lineStateSource,
  /const inheritedProjectId = await fetchExistingExpenseProjectId\([\s\S]*?safeText\(loadedHeader\.projId\)/
);
assert.match(lineStateSource, /setDraftProjectId\(normalizedLineProjectId\);/);
assert.doesNotMatch(
  lineStateSource,
  /setDraftProjectId\([\s\S]{0,160}nextHeader\?\.projId/
);
assert.match(linkedLineSource, /await fetchExistingExpenseProjectId\([\s\S]*?mapExpenseSheetHeader\(sheet\)\.projId/);
assert.match(linkedLineSource, /const requestId = \+\+latestRequestIdRef\.current;/);
assert.match(
  linkedLineSource,
  /await fetchExpenseSheetDetail\([\s\S]*?if \(requestId !== latestRequestIdRef\.current\) return;/
);
assert.match(
  linkedLineSource,
  /await fetchExistingExpenseProjectId\([\s\S]*?if \(requestId !== latestRequestIdRef\.current\) return;/
);
assert.match(
  linkedLineSource,
  /catch \(error\) \{\s*if \(requestId !== latestRequestIdRef\.current\) return;/
);
assert.match(
  linkedLineSource,
  /finally \{\s*if \(requestId !== latestRequestIdRef\.current\) return;\s*setIsLoading\(false\);/
);
assert.match(
  linkedLineSource,
  /return \(\) => \{\s*latestRequestIdRef\.current \+= 1;/
);
assert.match(linkedSyncSource, /const inheritedProjectId = !existingLine && !hasProjectIdOverride/);
assert.match(
  linkedSyncSource,
  /existingLine\s*\? safeText\(existingLine\.projId\)\s*:\s*safeText\(sheetProjectId\)/
);
assert.match(linePageSource, /const projectValue = safeText\(line\?\.projId\);/);
assert.match(lineXpoSource, /SOURCE #resolveRealProjectId/);
assert.match(lineXpoSource, /_projId == purchParameters\.INDProjIdVarious/);
assert.match(lineXpoSource, /return projTable\.RecId \? projTable\.ProjId : '';/);
assert.match(
  lineXpoSource,
  /resolveRealProjectId\(_hojaGastosLine\.ProjIdHornos\)/
);
assert.match(serviceXpoSource, /resolveRealProjectId\(lineProjId\)/);
assert.match(serviceXpoSource, /resolveRealProjectId\(header\.ProjId\)/);
const updateLineSourceStart = serviceXpoSource.indexOf("SOURCE #updateExpenseSheetLine");
const updateLineSourceEnd = serviceXpoSource.indexOf("ENDSOURCE", updateLineSourceStart);
assert.ok(updateLineSourceStart >= 0 && updateLineSourceEnd > updateLineSourceStart);
const updateLineSource = serviceXpoSource.slice(updateLineSourceStart, updateLineSourceEnd);
assert.match(
  updateLineSource,
  /line\.ProjId\s*= projId;[\s\S]*?line\.ProjIdHornos = projId;/
);
assert.doesNotMatch(updateLineSource, /if \(projId\)/);
assert.doesNotMatch(updateLineSource, /line\.ProjId\s*=\s*header\.ProjId/);
assert.doesNotMatch(updateLineSource, /resolveRealProjectId\(projId\)/);
assert.doesNotMatch(updateLineSource, /InitFromHojaGastosTable|InitFromPreviousLine/);
assert.ok(
  updateLineSource.indexOf("line.ProjId       = projId") <
    updateLineSource.indexOf("validateExpenseSheetLineForApi(line)")
);
assert.ok(
  updateLineSource.indexOf("validateExpenseSheetLineForApi(line)") <
    updateLineSource.indexOf("line.update()")
);
assert.match(
  lineXpoSource,
  /SOURCE #CreaActualizaProyectoEnLineCust[\s\S]*?else \{\s*#\s*this\.BorrarTodosProyecto\(\);/
);

console.log("[ok] Expense project existence validation passed.");
