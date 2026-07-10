import { useEffect, useMemo } from "react";
import {
  EXPENSE_TICKET_LINK_FAILURE_REPAIR_INTENT,
  normalizeExpenseTicketReturnContext,
  resolveExpenseTicketReturnContext,
  saveExpenseTicketReturnContext,
} from "../../utils/expenseTicketReturnContext.ts";
import { safeText } from "../../utils/expenseUiUtils.ts";

// Parses route context once and exposes stable flags for ticket detail flows.
export const useExpenseTicketDetailRouteContext = () => {
  const routeParams = useMemo(() => new URLSearchParams(window.location.search), []);
  const fileId = useMemo(() => safeText(window.__EXPENSE_TICKET_FILE_ID__), []);
  const autoEditMode = useMemo(() => safeText(routeParams.get("mode")).toLowerCase() === "edit", [routeParams]);
  const routeIntent = useMemo(() => safeText(routeParams.get("intent")).toLowerCase(), [routeParams]);
  const routeOrigin = useMemo(() => safeText(routeParams.get("origin")).toLowerCase(), [routeParams]);
  const routeSheetId = useMemo(() => safeText(routeParams.get("sheetId")), [routeParams]);
  const routeSheetLineRecId = useMemo(
    () => safeText(routeParams.get("sheetLineRecId") || routeParams.get("lineRecId")),
    [routeParams]
  );
  const explicitReturnContext = useMemo(
    () =>
      normalizeExpenseTicketReturnContext({
        fileId,
        origin: routeOrigin,
        sheetId: routeSheetId,
        sheetLineRecId: routeSheetLineRecId,
      }),
    [fileId, routeOrigin, routeSheetId, routeSheetLineRecId]
  );

  useEffect(() => {
    if (!explicitReturnContext) return;
    saveExpenseTicketReturnContext(explicitReturnContext);
  }, [explicitReturnContext]);

  return useMemo(() => {
    const ticketReturnContext = resolveExpenseTicketReturnContext(fileId, explicitReturnContext);
    const detailOrigin = ticketReturnContext?.origin || routeOrigin;
    const contextSheetId = ticketReturnContext?.sheetId || routeSheetId;
    const contextLineRecId = ticketReturnContext?.sheetLineRecId || routeSheetLineRecId;
    const isFromExpenseSheetCreate = detailOrigin === "sheet-create";
    const isFromExpenseLine = detailOrigin === "expense-line" && !!contextSheetId && !!contextLineRecId;
    const isFromSheetLink = detailOrigin === "sheet-link" && !!contextSheetId;
    const isLinkFailureRepair =
      isFromSheetLink && autoEditMode && routeIntent === EXPENSE_TICKET_LINK_FAILURE_REPAIR_INTENT;

    return {
      autoEditMode,
      detailOrigin,
      contextSheetId,
      contextLineRecId,
      isFromExpenseSheetCreate,
      isFromExpenseLine,
      isFromSheetLink,
      isLinkFailureRepair,
      ticketReturnContext,
    };
  }, [autoEditMode, explicitReturnContext, fileId, routeIntent, routeOrigin, routeSheetId, routeSheetLineRecId]);
};
