import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import {
  resolveExistingExpenseProjectId,
  resolveExistingExpenseProjectIdFromPages,
} from "../Web/wwwroot/react/src/pages/gastos/utils/expenseProjectValidation.ts";
import {
  hasServerExpenseLineProjectDefault,
  resolveNewExpenseLineProjectCandidate,
} from "../Web/wwwroot/react/src/pages/gastos/utils/expenseProjectRules.ts";

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

assert.equal(
  resolveNewExpenseLineProjectCandidate({
    defaultLineProjectId: "PRJ-HEADER",
    headerProjectId: "PRJ-HEADER",
    serverDefaultProvided: true,
  }),
  "PRJ-HEADER"
);
assert.equal(
  resolveNewExpenseLineProjectCandidate({
    defaultLineProjectId: "",
    headerProjectId: "PRJ-HEADER",
    serverDefaultProvided: true,
  }),
  ""
);
assert.equal(
  resolveNewExpenseLineProjectCandidate({
    defaultLineProjectId: "STALE-DEFAULT",
    headerProjectId: "PRJ-HEADER",
    serverDefaultProvided: false,
  }),
  "PRJ-HEADER"
);
assert.equal(
  resolveNewExpenseLineProjectCandidate({
    defaultLineProjectId: "",
    headerProjectId: "VARIOUS",
    serverDefaultProvided: true,
  }),
  ""
);
assert.equal(hasServerExpenseLineProjectDefault({ DefaultLineProjId: "" }), true);
assert.equal(hasServerExpenseLineProjectDefault({ defaultLineProjId: "PRJ-001" }), true);
assert.equal(hasServerExpenseLineProjectDefault({ DefaultLineProjId: null }), false);
assert.equal(hasServerExpenseLineProjectDefault({ ProjId: "PRJ-001" }), false);

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
const lineMutationsSource = readExpenseSource("line", "useExpenseSheetLineDetailMutations.ts");
const linePageSource = readExpenseSource("line", "ExpenseSheetLineDetailPage.tsx");
const linkedLineSource = readExpenseSource("tickets", "detail", "useExpenseTicketLinkedSheetLine.ts");
const linkedSyncSource = readExpenseSource("utils", "expenseLinkedTicketSheetSync.ts");
const expenseApiSource = readExpenseSource("utils", "expenseApi.ts");
const expenseTypesSource = readExpenseSource("expenseTypes.ts");
const detailMutationsSource = readExpenseSource("detail", "useExpenseSheetDetailMutations.ts");
const detailControllerSource = readExpenseSource("detail", "useExpenseSheetDetailPageController.tsx");
const headerPayloadSource = readExpenseSource("detail", "expenseSheetHeaderPayloads.ts");
const lineXpoSource = readFileSync(
  path.join(repositoryRoot, ".codex", "Axapta", "CRMHojaGastosLine.xpo"),
  "latin1"
);
const serviceXpoSource = readFileSync(
  path.join(repositoryRoot, ".codex", "Axapta", "INDCRMExpenseSheetService.xpo"),
  "latin1"
);
const headerXpoSource = readFileSync(
  path.join(repositoryRoot, ".codex", "Axapta", "CRMHojaGastosTable.xpo"),
  "latin1"
);
const purchParametersXpoSource = readFileSync(
  path.join(repositoryRoot, ".codex", "Axapta", "PurchParameters.xpo"),
  "latin1"
);
const lineRequestSource = readFileSync(
  path.join(repositoryRoot, "App", "Models", "CRM", "ExpenseSheetLineRequest.cs"),
  "utf8"
);
const extractXpoMethod = (source: string, methodName: string): string => {
  const start = source.indexOf(`SOURCE #${methodName}`);
  const end = source.indexOf("ENDSOURCE", start);
  assert.ok(start >= 0 && end > start, `Missing XPO method ${methodName}`);
  return source.slice(start, end);
};

assert.match(expenseApiSource, /resolveExistingExpenseProjectIdFromPages/);
assert.match(expenseApiSource, /propagateExpenseSheetProjectDefault/);
assert.match(expenseTypesSource, /projIdProvided\?: boolean;/);
assert.match(lineRequestSource, /public bool\? ProjIdProvided \{ get; set; \}/);
assert.match(
  lineStateSource,
  /resolveNewExpenseLineProjectCandidate\([\s\S]*?defaultLineProjectId[\s\S]*?loadedHeader\.projId/
);
assert.match(
  lineStateSource,
  /setDraftProjectIdValue\(normalizedLineProjectId\);[\s\S]{0,100}setDraftProjectIdProvided\(false\);/
);
assert.match(
  lineStateSource,
  /const setDraftProjectId = useCallback\(\(value: string\) => \{[\s\S]*?setDraftProjectIdProvided\(true\);[\s\S]*?setDraftProjectIdValue\(value\);/
);
assert.doesNotMatch(
  lineStateSource,
  /setDraftProjectId\([\s\S]{0,160}nextHeader\?\.projId/
);
assert.match(
  linkedLineSource,
  /resolveNewExpenseLineProjectCandidate\([\s\S]*?defaultLineProjectId[\s\S]*?headerProjectId/
);
assert.match(linkedLineSource, /const requestId = \+\+latestRequestIdRef\.current;/);
assert.match(
  linkedLineSource,
  /const setDraftProjectId = useCallback\(\(value: string\) => \{[\s\S]*?setProjectIdTouched\(true\);[\s\S]*?setDraftProjectIdValue\(value\);/
);
assert.match(linkedLineSource, /projectIdTouched \|\| safeText\(draftProjectId\) !== safeText\(originalProjectId\)/);
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
assert.match(
  lineMutationsSource,
  /const normalizedProjectId = String\(draftProjectId \|\| ""\)\.trim\(\);[\s\S]*?const createLinePayload[\s\S]*?projId: draftProjectIdProvided \? normalizedProjectId : undefined,[\s\S]*?projIdProvided: draftProjectIdProvided[\s\S]*?const updateLinePayload[\s\S]*?projId: draftProjectIdProvided \? normalizedProjectId : undefined,[\s\S]*?projIdProvided: draftProjectIdProvided/
);
assert.match(
  linkedSyncSource,
  /const projectProvided = hasProjectIdOverride;[\s\S]*?projId: projectProvided \? resolvedProjectId : undefined,[\s\S]*?projIdProvided: projectProvided/
);
assert.match(
  detailMutationsSource,
  /await propagateExpenseSheetProjectDefault\(sheetId, safeText\(nextProjectId\)/
);
assert.doesNotMatch(detailMutationsSource, /const updateProjectIdOnLines/);
assert.doesNotMatch(detailMutationsSource, /Promise\.all\([\s\S]*?updateExpenseSheetLine/);
assert.match(headerPayloadSource, /isCreateMode \? \{\} : \{ projIdProvided: false \}/);
assert.match(
  detailControllerSource,
  /const shouldPersistAtomically\s*=\s*!isCreateMode && isEditing && canEditHeaderFieldsCurrent;/
);
assert.match(
  detailControllerSource,
  /if \(lines\.length === 0\) \{\s*void handleConfirmProjectPropagation\(nextValue\);/
);
assert.match(lineXpoSource, /SOURCE #resolveRealProjectId/);
assert.match(lineXpoSource, /_projId == purchParameters\.INDProjIdVarious/);
assert.match(lineXpoSource, /return projTable\.RecId \? projTable\.ProjId : '';/);
const lineTableInsertSource = extractXpoMethod(lineXpoSource, "insert");
assert.match(
  lineTableInsertSource,
  /if \(this\.ProjIdHornos &&[\s\S]*?!CRMHojaGastosLine::resolveEligibleProjectId\(this\.ProjIdHornos\)\)[\s\S]*?throw error/
);
assert.ok(
  lineTableInsertSource.indexOf("resolveEligibleProjectId(this.ProjIdHornos)") <
    lineTableInsertSource.indexOf("ttsbegin")
);
const lineTableUpdateSource = extractXpoMethod(lineXpoSource, "update");
assert.match(
  lineTableUpdateSource,
  /this\.ProjIdHornos != this\.orig\(\)\.ProjIdHornos &&[\s\S]*?this\.ProjIdHornos &&[\s\S]*?!CRMHojaGastosLine::resolveEligibleProjectId\(this\.ProjIdHornos\)/
);
const lineValidateWriteSource = extractXpoMethod(lineXpoSource, "validateWrite");
const lineValidateFieldSource = extractXpoMethod(lineXpoSource, "validateField");
assert.match(
  lineValidateFieldSource,
  /if \(!this\.RecId \|\| this\.ProjIdHornos != this\.orig\(\)\.ProjIdHornos\)\s*#\s*\{[\s\S]*?ProjTable::PermitirCambioProyecto\(projTableOrig\.ProjId, projTable\.ProjId\);/
);
assert.match(
  lineValidateWriteSource,
  /else if \(this\.ProjIdHornos &&[\s\S]*?\(!this\.RecId \|\| this\.ProjIdHornos != this\.orig\(\)\.ProjIdHornos\) &&[\s\S]*?!ProjTable::find\(this\.ProjIdHornos\)\.INDPermitirImputarGastos/
);
assert.match(
  lineValidateWriteSource,
  /\(!this\.RecId \|\| this\.ProjIdHornos != this\.orig\(\)\.ProjIdHornos\) &&[\s\S]*?!CRMHojaGastosLine::resolveEligibleProjectId\(this\.ProjIdHornos\)/
);
const initFromPreviousLineSource = extractXpoMethod(lineXpoSource, "InitFromPreviousLine");
assert.match(initFromPreviousLineSource, /this\.ProjIdHornos\s*= '';/);
assert.match(initFromPreviousLineSource, /this\.HojaGastosTable\(\)\.defaultProjectForNewLine\(\)/);
assert.doesNotMatch(
  initFromPreviousLineSource,
  /resolveRealProjectId\(_hojaGastosLine\.ProjIdHornos\)/
);
assert.match(serviceXpoSource, /resolveRealProjectId\(lineProjId\)/);
const updateLineSource = extractXpoMethod(serviceXpoSource, "updateExpenseSheetLine");
assert.match(
  updateLineSource,
  /projectProvided[\s\S]*?if \(projectProvided\)[\s\S]*?line\.ProjId\s*= projId;[\s\S]*?line\.ProjIdHornos = projId;/
);
assert.match(
  updateLineSource,
  /legacyProjectContract\s*=\s*conLen\(_data\) < 17;[\s\S]*?projectProvided\s*=\s*legacyProjectContract \|\| any2int\(conPeek\(_data, 17\)\) != 0;/
);
assert.match(
  updateLineSource,
  /if \(legacyProjectContract && !projId\)[\s\S]*?projId = header\.defaultProjectForNewLine\(\);[\s\S]*?if \(!projId\)[\s\S]*?projectProvided = false;/
);
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
assert.match(headerXpoSource, /SOURCE #defaultProjectForNewLine/);
const defaultProjectSource = extractXpoMethod(headerXpoSource, "defaultProjectForNewLine");
assert.match(defaultProjectSource, /return CRMHojaGastosLine::resolveEligibleProjectId\(this\.ProjId\);/);
assert.doesNotMatch(defaultProjectSource, /lastLine|select firstonly|order by/);
const headerTableInsertSource = extractXpoMethod(headerXpoSource, "insert");
assert.match(
  headerTableInsertSource,
  /if \(this\.ProjId &&[\s\S]*?!CRMHojaGastosLine::resolveEligibleProjectId\(this\.ProjId\)\)[\s\S]*?throw error/
);
const headerTableUpdateSource = extractXpoMethod(headerXpoSource, "update");
assert.match(
  headerTableUpdateSource,
  /this\.ProjId != tableOrig\.ProjId &&[\s\S]*?this\.ProjId &&[\s\S]*?!CRMHojaGastosLine::resolveEligibleProjectId\(this\.ProjId\)/
);
const headerValidateWriteSource = extractXpoMethod(headerXpoSource, "validateWrite");
assert.match(headerValidateWriteSource, /projectChanged\s*= this\.ProjId != this\.orig\(\)\.ProjId;/);
assert.match(
  headerValidateWriteSource,
  /if \(projectChanged\)[\s\S]*?ProjTable::PermitirCambioProyecto\(projTableOrig\.ProjId, projTable\.ProjId\)/
);
assert.match(
  headerValidateWriteSource,
  /if \(projectChanged && this\.ProjId\)[\s\S]*?resolveEligibleProjectId\(this\.ProjId\)[\s\S]*?else if \(projectChanged && this\.ProjId && !eligibleProjectId\)/
);
assert.match(headerXpoSource, /SOURCE #recalculateProjectFromLines/);
const recalculateProjectSource = extractXpoMethod(headerXpoSource, "recalculateProjectFromLines");
assert.match(recalculateProjectSource, /hojaGastosLine\.UserId\s*== this\.UserId/);
assert.match(
  recalculateProjectSource,
  /if \(!hasLines\)[\s\S]*calculatedProjectId = '';/
);
assert.match(
  recalculateProjectSource,
  /if \(!hasLines\)[\s\S]*commonProjectId = lineProjectId;[\s\S]*hasLines = true;[\s\S]*else if \(lineProjectId != commonProjectId\)/
);
assert.match(recalculateProjectSource, /lineProjectId != commonProjectId/);
assert.match(recalculateProjectSource, /calculatedProjectId = purchParameters\.INDProjIdVarious/);
assert.match(
  recalculateProjectSource,
  /else\s*#\s*\{\s*#\s*calculatedProjectId = commonProjectId;/
);
assert.match(
  recalculateProjectSource,
  /if \(!purchParameters\.INDProjIdVarious\)\s*#\s*throw error\("Configure INDProjIdVarious/
);
assert.match(headerXpoSource, /SOURCE #migrateVariousProjectMarker/);
assert.match(
  headerXpoSource,
  /where header\.ProjId == _oldMarker[\s\S]*?header\.ProjId = _newMarker;[\s\S]*?header\.doUpdate\(\);/
);
const projectPropagationSource = extractXpoMethod(headerXpoSource, "updateProjectDefaultInLines");
assert.match(projectPropagationSource, /header\.doUpdate\(\);/);
assert.match(projectPropagationSource, /hojaGastosLine\.doUpdate\(\);/);
const deleteLineSource = extractXpoMethod(lineXpoSource, "delete");
assert.match(deleteLineSource, /if \(hojaGastosTable\)\s*#\s*\{/);
assert.doesNotMatch(deleteLineSource, /if \(hojaGastosTable &&/);
assert.equal(
  (deleteLineSource.match(/recalculateReimbursableExpenseFromLines\(\)/g) || []).length,
  1
);
assert.match(deleteLineSource, /mustUpdate = hojaGastosTable\.recalculateProjectFromLines\(\);/);
assert.match(
  deleteLineSource,
  /if \(hojaGastosTable\.recalculateReimbursableExpenseFromLines\(\)\)\s*#\s*mustUpdate = true;/
);
assert.match(deleteLineSource, /if \(mustUpdate\)\s*#\s*hojaGastosTable\.doUpdate\(\);/);
const createSheetSource = extractXpoMethod(serviceXpoSource, "createExpenseSheet");
assert.match(createSheetSource, /lineProjectProvided/);
assert.match(createSheetSource, /conPeek\(lineIn, 13\)/);
assert.match(createSheetSource, /resolvedLineProjId = header\.defaultProjectForNewLine\(\)/);
const propagateProjectSource = extractXpoMethod(serviceXpoSource, "propagateExpenseSheetProjectDefault");
assert.match(propagateProjectSource, /projectProvided = conLen\(_data\) >= 4;/);
assert.match(
  propagateProjectSource,
  /if \(conLen\(_data\) >= 5\)[\s\S]*?projectProvided = any2int\(conPeek\(_data, 5\)\) != 0;/
);
assert.match(propagateProjectSource, /if \(projectProvided\)[\s\S]*?projectId = conPeek\(_data, 4\);/);
assert.match(propagateProjectSource, /updateProjectDefaultInLines\(projectId\)/);
const updateHeaderSource = extractXpoMethod(serviceXpoSource, "updateExpenseSheetHeader");
assert.match(
  updateHeaderSource,
  /projectProvided = conLen\(_data\) < 13 \|\| any2int\(conPeek\(_data, 13\)\) != 0;/
);
assert.match(updateHeaderSource, /projectChanged\s*= projectProvided && projId != oldProjectId;/);
assert.match(updateHeaderSource, /if \(projectProvided\)\s*#\s*header\.ProjId = projId;/);
assert.doesNotMatch(updateHeaderSource, /updateProjectDefaultInLines/);

assert.match(
  purchParametersXpoSource,
  /FIELD #INDProjIdVarious[\s\S]*?Mandatory\s+#Yes/
);
const purchUpdateSource = extractXpoMethod(purchParametersXpoSource, "Update");
assert.match(purchUpdateSource, /rawMarker = this\.INDProjIdVarious;/);
assert.match(purchUpdateSource, /markerChanged = rawMarker != oldMarker;/);
assert.match(
  purchUpdateSource,
  /if \(markerChanged\)[\s\S]*?if \(!newMarker\)[\s\S]*?ProjTable::find\(newMarker\)/
);
assert.match(
  purchUpdateSource,
  /migrateMarker = markerChanged &&[\s\S]*?CRMHojaGastosTable::migrateVariousProjectMarker[\s\S]*?super\(\);/
);
const purchValidateFieldSource = extractXpoMethod(purchParametersXpoSource, "validateField");
assert.match(purchValidateFieldSource, /fieldNum\(PurchParameters, INDProjIdVarious\)/);
assert.match(purchValidateFieldSource, /ProjTable::find\(marker\)/);

console.log("[ok] Expense project consistency rules passed.");
