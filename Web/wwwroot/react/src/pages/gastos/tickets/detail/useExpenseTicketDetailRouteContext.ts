import { useEffect, useMemo } from "react";
import {
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
  const routeOrigin = useMemo(() => safeText(routeParams.get("origin")).toLowerCase(), [routeParams]);
  const routeSheetId = useMemo(() => safeText(routeParams.get("sheetId")), [routeParams]);
  const contextLineRecId = useMemo(() => safeText(routeParams.get("lineRecId")), [routeParams]);
  const explicitReturnContext = useMemo(
    () =>
      normalizeExpenseTicketReturnContext({
        fileId,
        origin: routeOrigin,
        sheetId: routeSheetId,
      }),
    [fileId, routeOrigin, routeSheetId]
  );

  useEffect(() => {
    if (!explicitReturnContext) return;
    saveExpenseTicketReturnContext(explicitReturnContext);
  }, [explicitReturnContext]);

  return useMemo(() => {
    const ticketReturnContext = resolveExpenseTicketReturnContext(fileId, explicitReturnContext);
    const detailOrigin = ticketReturnContext?.origin || routeOrigin;
    const contextSheetId = ticketReturnContext?.sheetId || routeSheetId;
    const isFromExpenseSheetCreate = detailOrigin === "sheet-create";
    const isFromExpenseLine = detailOrigin === "expense-line" && !!contextSheetId && !!contextLineRecId;
    const isFromSheetLink = detailOrigin === "sheet-link" && !!contextSheetId;

    return {
      autoEditMode,
      detailOrigin,
      contextSheetId,
      contextLineRecId,
      isFromExpenseSheetCreate,
      isFromExpenseLine,
      isFromSheetLink,
      ticketReturnContext,
    };
  }, [autoEditMode, contextLineRecId, explicitReturnContext, fileId, routeOrigin, routeSheetId]);
};
