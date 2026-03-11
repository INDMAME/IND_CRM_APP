import { useMemo } from "react";
import { safeText } from "../../utils/expenseUiUtils.ts";

// Parses route context once and exposes stable flags for ticket detail flows.
export const useExpenseTicketDetailRouteContext = () => {
  const routeParams = useMemo(() => new URLSearchParams(window.location.search), []);

  return useMemo(() => {
    const autoEditMode = safeText(routeParams.get("mode")).toLowerCase() === "edit";
    const detailOrigin = safeText(routeParams.get("origin")).toLowerCase();
    const contextSheetId = safeText(routeParams.get("sheetId"));
    const contextLineRecId = safeText(routeParams.get("lineRecId"));
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
    };
  }, [routeParams]);
};
