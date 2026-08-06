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
const expenseLineTicketFabSource = readFileSync(
  path.join(
    repositoryRoot,
    "Web",
    "wwwroot",
    "react",
    "src",
    "pages",
    "gastos",
    "line",
    "ExpenseSheetLineTicketFab.tsx",
  ),
  "utf8",
);
const expenseLineTicketFabMirrorSource = readFileSync(
  path.join(
    repositoryRoot,
    "wwwroot",
    "react",
    "src",
    "pages",
    "gastos",
    "line",
    "ExpenseSheetLineTicketFab.tsx",
  ),
  "utf8",
);
const expenseLineStateSource = readFileSync(
  path.join(
    repositoryRoot,
    "Web",
    "wwwroot",
    "react",
    "src",
    "pages",
    "gastos",
    "line",
    "useExpenseSheetLineDetailState.ts",
  ),
  "utf8",
);
const expenseLineStateMirrorSource = readFileSync(
  path.join(
    repositoryRoot,
    "wwwroot",
    "react",
    "src",
    "pages",
    "gastos",
    "line",
    "useExpenseSheetLineDetailState.ts",
  ),
  "utf8",
);
const expenseTicketsPageSource = readFileSync(
  path.join(
    repositoryRoot,
    "Web",
    "wwwroot",
    "react",
    "src",
    "pages",
    "gastos",
    "tickets",
    "ExpenseTicketsPage.tsx",
  ),
  "utf8",
);
const expenseTicketsPageMirrorSource = readFileSync(
  path.join(
    repositoryRoot,
    "wwwroot",
    "react",
    "src",
    "pages",
    "gastos",
    "tickets",
    "ExpenseTicketsPage.tsx",
  ),
  "utf8",
);
const expenseTicketLinkSheetGateSource = readFileSync(
  path.join(
    repositoryRoot,
    "Web",
    "wwwroot",
    "react",
    "src",
    "pages",
    "gastos",
    "tickets",
    "useExpenseTicketLinkSheetGate.ts",
  ),
  "utf8",
);
const expenseTicketLinkSheetGateMirrorSource = readFileSync(
  path.join(
    repositoryRoot,
    "wwwroot",
    "react",
    "src",
    "pages",
    "gastos",
    "tickets",
    "useExpenseTicketLinkSheetGate.ts",
  ),
  "utf8",
);
const expenseTicketsListDataSource = readFileSync(
  path.join(
    repositoryRoot,
    "Web",
    "wwwroot",
    "react",
    "src",
    "pages",
    "gastos",
    "tickets",
    "useExpenseTicketsListData.ts",
  ),
  "utf8",
);
const expenseTicketsListDataMirrorSource = readFileSync(
  path.join(
    repositoryRoot,
    "wwwroot",
    "react",
    "src",
    "pages",
    "gastos",
    "tickets",
    "useExpenseTicketsListData.ts",
  ),
  "utf8",
);
const expenseSheetEditAccessSource = readFileSync(
  path.join(
    repositoryRoot,
    "Web",
    "wwwroot",
    "react",
    "src",
    "pages",
    "gastos",
    "utils",
    "expenseSheetEditAccess.ts",
  ),
  "utf8",
);
const expenseSheetEditAccessMirrorSource = readFileSync(
  path.join(
    repositoryRoot,
    "wwwroot",
    "react",
    "src",
    "pages",
    "gastos",
    "utils",
    "expenseSheetEditAccess.ts",
  ),
  "utf8",
);
const gastosControllerSource = readFileSync(
  path.join(repositoryRoot, "Web", "Controllers", "Gastos", "GastosController.cs"),
  "utf8",
);
const moduleAuthorizeFilterSource = readFileSync(
  path.join(
    repositoryRoot,
    "App",
    "Infrastructure",
    "Security",
    "Filters",
    "INDModuleAuthorizeFilter.cs",
  ),
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
const attachLineTicketProxySource = sourceBetween(
  gastosControllerSource,
  "public async Task<IActionResult> ApiExpenseSheetLineTicketAttach(",
  "public async Task<IActionResult> ApiExpenseSheetLineTicketDetach(",
);
const detachLineTicketProxySource = sourceBetween(
  gastosControllerSource,
  "public async Task<IActionResult> ApiExpenseSheetLineTicketDetach(",
  "public async Task<IActionResult> ApiExpenseSheetLineDelete(",
);
const expenseSheetMutationGuardSource = sourceBetween(
  gastosControllerSource,
  "private async Task<ExpenseSheetMutationGuardResult> ValidateExpenseSheetMutationAsync(",
  "private static ExpenseSheetSnapshot BuildExpenseSheetSnapshot(",
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

test("manual-line link and detach actions share the standard ticket FAB", () => {
  for (const source of [expenseLinePageSource, expenseLinePageMirrorSource]) {
    assert.match(source, /action=\{hasLinkedTicket \? "detach" : "link"\}/);
    assert.match(
      source,
      /onAction=\{hasLinkedTicket \? handleOpenDetachTicketConfirm : handleOpenExistingTicketLink\}/,
    );
    assert.doesNotMatch(source, /canManageLineTicketLink && hasLinkedTicket/);
  }

  for (const source of [expenseLineTicketFabSource, expenseLineTicketFabMirrorSource]) {
    assert.match(source, /ExpenseSheetLineTicketFabAction = "link" \| "detach"/);
    assert.match(source, /ExpenseSheets_Fab_LinkTicket/);
    assert.match(source, /ExpenseSheets_Line_Ticket_DetachButton/);
    assert.match(source, /UnlinkTicketIcon/);
  }
});

test("manual-line ticket actions require Edit and the current sheet owner", () => {
  for (const source of [expenseLinePageSource, expenseLinePageMirrorSource]) {
    assert.match(
      source,
      /canManageExpenseLineTicket\s*=\s*canAccess\("GASTOS_HOJA_GASTO",\s*"Edit"\)\s*&&\s*canViewLinkedTicketLines/,
    );
    assert.match(source, /canManageLineTicketLink\s*=[\s\S]*!isManagingOtherUser/);
    assert.match(source, /canManageLineTicketLink\s*=[\s\S]*isCurrentUserExpenseOwner/);
    assert.doesNotMatch(source, /canLinkExpenseTicket\s*=\s*canAccess\("GASTOS_HOJA_GASTO",\s*"Add"\)/);
  }

  for (const source of [expenseLineStateSource, expenseLineStateMirrorSource]) {
    assert.match(source, /isManagingOtherUser,[\s\S]*canCreateExpenseCurrent/);
    assert.match(source, /recordOwnerUserId:\s*mappedHeader\.ownerAxUserId\s*\|\|\s*mappedHeader\.userId/);
    assert.match(source, /isCurrentUserExpenseOwner,[\s\S]*isSheetLocked/);
  }

  assert.match(attachLineTicketProxySource, /ExpenseSheetMutationType\.OwnLineTicketMutation/);
  assert.match(detachLineTicketProxySource, /ExpenseSheetMutationType\.OwnLineTicketMutation/);
  assert.match(
    expenseSheetMutationGuardSource,
    /mutationType\s*==\s*ExpenseSheetMutationType\.OwnLineTicketMutation\s*&&\s*isManagingOtherUser/,
  );
  assert.match(expenseSheetMutationGuardSource, /SelectSheetExact\(result\.GetAnyItems\(\),\s*safeSheetId\)/);
  assert.match(moduleAuthorizeFilterSource, /IsExpenseSheetLineTicketAssociationPath/);
  assert.match(
    moduleAuthorizeFilterSource,
    /IsExpenseSheetLineTicketAssociationPath\(path\)[\s\S]*return IndAccessRights\.Edit;/,
  );
});

test("line-link selector cannot restore or load another user's tickets", () => {
  for (const source of [expenseTicketsPageSource, expenseTicketsPageMirrorSource]) {
    assert.match(source, /canEditSheetLineTicket\s*=\s*canAccess\("GASTOS_HOJA_GASTO",\s*"Edit"\)/);
    assert.match(
      source,
      /canProcessLinkMode\s*=\s*!isLinkMode\s*\|\|\s*\(isLineLinkMode\s*\?\s*canEditSheetLineTicket\s*:\s*canLinkSheetLines\)/,
    );
    assert.match(source, /showManagedUserFilter\s*=\s*isLinkMode\s*&&\s*!isLineLinkMode\s*&&\s*canManageOtherUsers/);
    assert.match(source, /requestedUserIdForMode\s*=\s*isLineLinkMode\s*\?\s*currentAxUserId\s*:\s*requestedUserId/);
    assert.match(source, /canLoadTicketList\s*=[\s\S]*linkSheetCheckComplete[\s\S]*!linkFlowLocked/);
    assert.match(source, /blocked-line-link/);
    assert.match(source, /resetList\("line-link-gate-closed"\)/);
    assert.match(
      source,
      /isLineLinkMode\s*&&[\s\S]*!lineLinkTargetReady[\s\S]*!safeText\(validatedOwnerAxUserId\)/,
    );
    assert.match(source, /lineLinkOwnerAxUserId\s*=\s*safeText\(validatedOwnerAxUserId\)/);
    assert.match(source, /runTicketLinkFlowRef\.current\s*=\s*runTicketLinkFlow/);
    assert.match(source, /return runTicketLinkFlowRef\.current\(\)/);
    assert.doesNotMatch(
      source,
      /lineLinkOwnerAxUserId\s*=\s*safeText\(validatedOwnerAxUserId\s*\|\|\s*currentAxUserId\)/,
    );
    assert.match(
      source,
      /isLineLinkMode\s*\?\s*lineLinkOwnerAxUserId\s*:\s*activeFilters\.managedUserId\s*\|\|\s*currentAxUserId/,
    );
  }

  for (const source of [expenseTicketLinkSheetGateSource, expenseTicketLinkSheetGateMirrorSource]) {
    assert.match(source, /isLineLinkMode\?:\s*boolean/);
    assert.match(source, /isLineLinkMode\s*&&\s*!accessResult\.isCurrentUserExpenseOwner/);
    assert.match(source, /isLineLinkMode\s*&&\s*!managementBootstrapReady/);
    assert.match(source, /isLineLinkMode\s*&&\s*!safeText\(currentAxUserId\)/);
    assert.match(source, /linkSheetLocked:\s*true,[\s\S]*linkSheetCheckBusy:\s*true/);
  }

  for (const source of [expenseSheetEditAccessSource, expenseSheetEditAccessMirrorSource]) {
    assert.match(source, /isManagingOtherUser:\s*boolean/);
    assert.match(source, /isCurrentUserExpenseOwner:\s*boolean/);
    assert.match(source, /mappedHeader\.ownerAxUserId\s*\|\|\s*mappedHeader\.userId/);
    assert.match(source, /"X-IND-AxUserId":\s*requestedOwnerAxUserId/);
    assert.doesNotMatch(source, /return selected as ExpenseSheetDetailDto;[\s\S]*\|\| items\[0\]/);
  }

  for (const source of [expenseTicketsListDataSource, expenseTicketsListDataMirrorSource]) {
    assert.match(source, /activeRequestSeqRef\.current\s*\+=\s*1;[\s\S]*activeRequestControllerRef\.current\.abort\(\)/);
    assert.match(source, /setIsLoading\(false\)/);
  }
});

test("canonical and compatibility sources stay byte-identical for line-ticket flow", () => {
  for (const [canonical, mirror] of [
    [expenseLinePageSource, expenseLinePageMirrorSource],
    [expenseLineTicketFabSource, expenseLineTicketFabMirrorSource],
    [expenseLineStateSource, expenseLineStateMirrorSource],
    [expenseTicketsPageSource, expenseTicketsPageMirrorSource],
    [expenseTicketLinkSheetGateSource, expenseTicketLinkSheetGateMirrorSource],
    [expenseTicketsListDataSource, expenseTicketsListDataMirrorSource],
    [expenseSheetEditAccessSource, expenseSheetEditAccessMirrorSource],
  ]) {
    assert.equal(mirror, canonical);
  }
});

test("ticket link reads stay View while dedicated line detach stays Edit", () => {
  assert.match(
    moduleAuthorizeFilterSource,
    /path\.Equals\("\/api\/crm\/expensesheets\/tickets\/link\/list"[\s\S]*return IndAccessRights\.View;/,
  );
  assert.match(
    moduleAuthorizeFilterSource,
    /HttpMethods\.IsDelete\(method\)[\s\S]*IsExpenseSheetLineTicketAssociationPath\(path\)[\s\S]*return IndAccessRights\.Edit;/,
  );
  assert.match(moduleAuthorizeFilterSource, /HttpMethods\.IsDelete\(method\)[\s\S]*return IndAccessRights\.FullAccess;/);
});
