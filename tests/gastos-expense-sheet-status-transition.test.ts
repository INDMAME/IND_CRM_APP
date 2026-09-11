import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import {
  buildExpenseSheetFullUpdatePayload,
  buildExpenseSheetStatusTransitionPayload,
} from "../Web/wwwroot/react/src/pages/gastos/detail/expenseSheetHeaderPayloads.ts";

const legacyDraft = {
  draftDescription: "   ",
  draftProjectId: " P-100 ",
  draftEstadoComentarios: "Keep this comment",
  draftReimbursableExpense: 0,
};

const legacyTransitionPayload = buildExpenseSheetStatusTransitionPayload({
  ...legacyDraft,
  nextStatus: 2,
  statusCommentOverride: "",
});

assert.deepEqual(legacyTransitionPayload, {
  description: "",
  projId: "P-100",
  projIdProvided: false,
  expenseSheetStatus: 2,
  reimbursableExpense: 0,
  estadoComentarios: "",
});

assert.deepEqual(
  buildExpenseSheetStatusTransitionPayload({
    ...legacyDraft,
    draftDescription: "Existing description",
    draftProjectId: " P-200 ",
    draftEstadoComentarios: " Keep this comment ",
    draftReimbursableExpense: 1,
    nextStatus: 1,
  }),
  {
    description: "Existing description",
    projId: "P-200",
    projIdProvided: false,
    expenseSheetStatus: 1,
    reimbursableExpense: 1,
    estadoComentarios: "Keep this comment",
  }
);

for (const isCreateMode of [false, true]) {
  assert.deepEqual(
    buildExpenseSheetFullUpdatePayload({
      ...legacyDraft,
      currentExpenseSheetStatus: 1,
      isCreateMode,
    }),
    { errorKey: "ExpenseSheets_Validation_DescriptionRequired" }
  );
}

const existingDescriptionResult = buildExpenseSheetFullUpdatePayload({
  ...legacyDraft,
  draftDescription: "Existing description",
  currentExpenseSheetStatus: 1,
  isCreateMode: false,
});
assert.ok("payload" in existingDescriptionResult);
assert.equal(existingDescriptionResult.payload.description, "Existing description");
assert.equal(existingDescriptionResult.payload.projIdProvided, false);

const createDescriptionResult = buildExpenseSheetFullUpdatePayload({
  ...legacyDraft,
  draftDescription: "New sheet",
  currentExpenseSheetStatus: 0,
  isCreateMode: true,
});
assert.ok("payload" in createDescriptionResult);
assert.equal("projIdProvided" in createDescriptionResult.payload, false);

const repositoryRoot = process.cwd();
const gastosControllerSource = readFileSync(
  path.join(repositoryRoot, "Web", "Controllers", "Gastos", "GastosController.cs"),
  "utf8"
);
const expenseSheetDetailMutationsSource = readFileSync(
  path.join(
    repositoryRoot,
    "Web",
    "wwwroot",
    "react",
    "src",
    "pages",
    "gastos",
    "detail",
    "useExpenseSheetDetailMutations.ts"
  ),
  "utf8"
);
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
    "expenseApi.ts"
  ),
  "utf8"
);

const statusTransitionHandlerStart = expenseSheetDetailMutationsSource.indexOf(
  "const handleStatusTransition = useCallback"
);
const statusTransitionHandlerEnd = expenseSheetDetailMutationsSource.indexOf(
  "const handleDelete = useCallback",
  statusTransitionHandlerStart
);
assert.ok(statusTransitionHandlerStart >= 0 && statusTransitionHandlerEnd > statusTransitionHandlerStart);
const statusTransitionHandlerSource = expenseSheetDetailMutationsSource.slice(
  statusTransitionHandlerStart,
  statusTransitionHandlerEnd
);
assert.match(statusTransitionHandlerSource, /buildExpenseSheetStatusTransitionPayload\(/);
assert.doesNotMatch(statusTransitionHandlerSource, /ExpenseSheets_Validation_DescriptionRequired/);
assert.equal(
  (statusTransitionHandlerSource.match(/updateExpenseSheetHeader\(/g) || []).length,
  1
);

const updateApiStart = expenseApiSource.indexOf(
  "export const updateExpenseSheetHeader = async"
);
const updateApiEnd = expenseApiSource.indexOf(
  "export const propagateExpenseSheetReimbursableExpense = async",
  updateApiStart
);
assert.ok(updateApiStart >= 0 && updateApiEnd > updateApiStart);
const updateApiSource = expenseApiSource.slice(updateApiStart, updateApiEnd);
assert.equal((updateApiSource.match(/fetchJson</g) || []).length, 1);
assert.match(
  updateApiSource,
  /fetchJson<[^\r\n]+>\(`\/api\/crm\/expensesheets\/\$\{safeSheetId\}`,[\s\S]*?method: "PUT"/
);

const effectiveRequestMethodStart = gastosControllerSource.indexOf(
  "private ExpenseSheetUpdateRequest BuildExpenseSheetEffectiveHeaderUpdateRequest"
);
const effectiveRequestMethodEnd = gastosControllerSource.indexOf(
  "// Status-only actions reuse the stored snapshot",
  effectiveRequestMethodStart
);
assert.ok(effectiveRequestMethodStart >= 0 && effectiveRequestMethodEnd > effectiveRequestMethodStart);
const effectiveRequestMethodSource = gastosControllerSource.slice(
  effectiveRequestMethodStart,
  effectiveRequestMethodEnd
);

const statusOnlyGuardIndex = effectiveRequestMethodSource.indexOf(
  "mutationGuard.Policy?.InteractionMode != ExpenseSheetInteractionMode.StatusActionOnly"
);
const legacyFallbackIndex = effectiveRequestMethodSource.indexOf(
  "string.IsNullOrWhiteSpace(effectiveDescription)"
);
const guardedReturnIndex = effectiveRequestMethodSource.indexOf("return request;", statusOnlyGuardIndex);
assert.ok(statusOnlyGuardIndex >= 0);
assert.ok(guardedReturnIndex > statusOnlyGuardIndex && guardedReturnIndex < legacyFallbackIndex);
assert.ok(legacyFallbackIndex > statusOnlyGuardIndex);
assert.match(
  effectiveRequestMethodSource,
  /if\s*\(string\.IsNullOrWhiteSpace\(effectiveDescription\)\)/
);
assert.doesNotMatch(
  effectiveRequestMethodSource,
  /if\s*\(!string\.IsNullOrWhiteSpace\(effectiveDescription\)\)/
);
assert.match(effectiveRequestMethodSource, /var effectiveDescription = snapshot\.Description;/);
assert.match(
  effectiveRequestMethodSource,
  /effectiveDescription = \$"Hoja de gastos \{hojaGastosId\}";/
);
assert.match(effectiveRequestMethodSource, /Description = effectiveDescription,/);
assert.match(effectiveRequestMethodSource, /ProjId = null,/);
assert.match(effectiveRequestMethodSource, /ProjIdProvided = false,/);
assert.match(effectiveRequestMethodSource, /ExpenseSheetStatus = request\.ExpenseSheetStatus,/);
assert.match(effectiveRequestMethodSource, /EstadoComentarios = request\.EstadoComentarios,/);

const fallbackLogStart = effectiveRequestMethodSource.indexOf("_logger.LogInformation(", legacyFallbackIndex);
const fallbackLogEnd = effectiveRequestMethodSource.indexOf(");", fallbackLogStart);
assert.ok(fallbackLogStart > legacyFallbackIndex && fallbackLogEnd > fallbackLogStart);
const fallbackLogSource = effectiveRequestMethodSource.slice(fallbackLogStart, fallbackLogEnd);
assert.match(fallbackLogSource, /legacy expense sheet description fallback/i);
assert.match(fallbackLogSource, /\{HojaGastosId\}/);
assert.match(fallbackLogSource, /\{CurrentStatus\}/);
assert.match(fallbackLogSource, /\{TargetStatus\}/);
assert.doesNotMatch(fallbackLogSource, /EstadoComentarios|status comment/i);

const transitionGuardStart = gastosControllerSource.indexOf(
  "private ExpenseSheetMutationGuardResult ValidateExpenseSheetHeaderUpdate"
);
const transitionGuardEnd = gastosControllerSource.indexOf(
  "private ExpenseSheetUpdateRequest BuildExpenseSheetEffectiveHeaderUpdateRequest",
  transitionGuardStart
);
assert.ok(transitionGuardStart >= 0 && transitionGuardEnd > transitionGuardStart);
const transitionGuardSource = gastosControllerSource.slice(transitionGuardStart, transitionGuardEnd);
assert.match(transitionGuardSource, /!policy\.AllowedNextStatuses\.Contains\(requestedStatus\.Value\)/);
assert.match(transitionGuardSource, /StatusCode = StatusCodes\.Status409Conflict/);
assert.match(transitionGuardSource, /ErrorCode = ExpenseSheetStatusTransitionErrorCode/);

const apiUpdateStart = gastosControllerSource.indexOf(
  "public async Task<IActionResult> ApiExpenseSheetUpdate"
);
const apiUpdateEnd = gastosControllerSource.indexOf(
  "public async Task<IActionResult> ApiExpenseSheetReimbursableExpensePropagate",
  apiUpdateStart
);
assert.ok(apiUpdateStart >= 0 && apiUpdateEnd > apiUpdateStart);
const apiUpdateSource = gastosControllerSource.slice(apiUpdateStart, apiUpdateEnd);
const apiGuardIndex = apiUpdateSource.indexOf("ValidateExpenseSheetMutationAsync(");
const apiDeniedIndex = apiUpdateSource.indexOf("if (!mutationGuard.Allowed)", apiGuardIndex);
const apiDeniedReturnIndex = apiUpdateSource.indexOf(
  "return CreateApiCommandError(mutationGuard.StatusCode",
  apiDeniedIndex
);
const apiEffectiveRequestIndex = apiUpdateSource.indexOf(
  "BuildExpenseSheetEffectiveHeaderUpdateRequest(",
  apiDeniedReturnIndex
);
const apiWriteIndex = apiUpdateSource.indexOf(
  "_apiClient.UpdateExpenseSheetHeaderAsync(",
  apiEffectiveRequestIndex
);
assert.ok(apiGuardIndex >= 0);
assert.ok(apiDeniedIndex > apiGuardIndex);
assert.ok(apiDeniedReturnIndex > apiDeniedIndex && apiDeniedReturnIndex < apiEffectiveRequestIndex);
assert.ok(apiEffectiveRequestIndex > apiDeniedReturnIndex && apiWriteIndex > apiEffectiveRequestIndex);
assert.match(
  apiUpdateSource.slice(apiWriteIndex),
  /_apiClient\.UpdateExpenseSheetHeaderAsync\(\s*token,\s*safeSheetId,\s*effectiveRequest,/
);

assert.equal(
  (effectiveRequestMethodSource.match(/\$"Hoja de gastos \{hojaGastosId\}"/g) || []).length,
  1
);

console.log("[ok] Expense sheet status transition regression rules passed.");
