import { useCallback, useEffect, useMemo, useState } from "react";
import { ApiFetchError } from "../../../../services/apiService.ts";
import { indT } from "../../../../utils/indI18n.ts";
import type { ExpenseSheetDetailDto, ExpenseSheetLine } from "../../expenseTypes.ts";
import { normalizeExpenseLineReimbursableExpense } from "../../constants/expenseReimbursableExpenseCatalog.ts";
import { fetchExpenseSheetDetail, mapExpenseSheetLine } from "../../utils/expenseApi.ts";
import { safeText } from "../../utils/expenseUiUtils.ts";

type UseExpenseTicketLinkedSheetLineArgs = {
  enabled: boolean;
  sheetId: string;
  lineRecId: string;
  onForbidden: () => void;
};

const selectSheet = (items: ExpenseSheetDetailDto[], sheetId: string): ExpenseSheetDetailDto | null => {
  const safeSheetId = safeText(sheetId).toUpperCase();
  if (!Array.isArray(items) || items.length < 1) {
    return null;
  }

  return (
    items.find((entry) => safeText(entry?.HojaGastosId ?? entry?.hojaGastosId).toUpperCase() === safeSheetId) ||
    items[0] ||
    null
  );
};

const selectLine = (sheet: ExpenseSheetDetailDto, lineRecId: string): ExpenseSheetLine | null => {
  const safeLineRecId = safeText(lineRecId).toUpperCase();
  const sourceLines = sheet.Lines ?? sheet.lines ?? [];
  const mappedLines = Array.isArray(sourceLines) ? sourceLines.map((entry) => mapExpenseSheetLine(entry)) : [];

  return mappedLines.find((line) => safeText(line.lineRecId).toUpperCase() === safeLineRecId) || null;
};

// Loads the expense-sheet line that gives contextual fields to a linked ticket detail.
export const useExpenseTicketLinkedSheetLine = ({
  enabled,
  sheetId,
  lineRecId,
  onForbidden,
}: UseExpenseTicketLinkedSheetLineArgs) => {
  const [line, setLine] = useState<ExpenseSheetLine | null>(null);
  const [originalProjectId, setOriginalProjectId] = useState("");
  const [draftProjectId, setDraftProjectId] = useState("");
  const [originalReimbursableExpense, setOriginalReimbursableExpense] = useState<number | null>(null);
  const [draftReimbursableExpense, setDraftReimbursableExpense] = useState<number | null>(null);
  const [localCurrencyCode, setLocalCurrencyCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const reloadLine = useCallback(async () => {
    const safeSheetId = safeText(sheetId);
    const safeLineRecId = safeText(lineRecId);
    if (!enabled || !safeSheetId) {
      setLine(null);
      setOriginalProjectId("");
      setDraftProjectId("");
      setOriginalReimbursableExpense(null);
      setDraftReimbursableExpense(null);
      setLocalCurrencyCode("");
      setErrorMessage("");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetchExpenseSheetDetail(safeSheetId, {
        suppressPermissionModal: true,
      });

      if (response?.Success === false) {
        setLine(null);
        setOriginalProjectId("");
        setDraftProjectId("");
        setOriginalReimbursableExpense(null);
        setDraftReimbursableExpense(null);
        setLocalCurrencyCode("");
        setErrorMessage(response?.Message || indT("ExpenseSheets_LoadError", "Could not load expense sheet detail."));
        return;
      }

      const sheet = selectSheet(response?.Items || [], safeSheetId);
      const sheetLocalCurrencyCode = safeText(sheet?.CurrencyCode ?? sheet?.currencyCode).toUpperCase();
      const selectedLine = sheet && safeLineRecId ? selectLine(sheet, safeLineRecId) : null;
      if (!safeLineRecId) {
        setLine(null);
        setOriginalProjectId("");
        setDraftProjectId("");
        setOriginalReimbursableExpense(null);
        setDraftReimbursableExpense(null);
        setLocalCurrencyCode(sheetLocalCurrencyCode);
        setErrorMessage("");
        return;
      }

      if (!selectedLine) {
        setLine(null);
        setOriginalProjectId("");
        setDraftProjectId("");
        setOriginalReimbursableExpense(null);
        setDraftReimbursableExpense(null);
        setLocalCurrencyCode(sheetLocalCurrencyCode);
        setErrorMessage(indT("ExpenseSheets_NotFound", "Expense sheet was not found."));
        return;
      }

      const projectId = safeText(selectedLine.projId);
      const reimbursableExpense = normalizeExpenseLineReimbursableExpense(selectedLine.reimbursableExpense);
      setLine(selectedLine);
      setOriginalProjectId(projectId);
      setDraftProjectId(projectId);
      setOriginalReimbursableExpense(reimbursableExpense);
      setDraftReimbursableExpense(reimbursableExpense);
      setLocalCurrencyCode(sheetLocalCurrencyCode);
    } catch (error) {
      if (error instanceof ApiFetchError && error.status === 403) {
        onForbidden();
        return;
      }

      setLine(null);
      setOriginalProjectId("");
      setDraftProjectId("");
      setOriginalReimbursableExpense(null);
      setDraftReimbursableExpense(null);
      setLocalCurrencyCode("");
      setErrorMessage(error instanceof Error ? error.message : indT("ExpenseSheets_LoadError", "Could not load expense sheet detail."));
    } finally {
      setIsLoading(false);
    }
  }, [enabled, lineRecId, onForbidden, sheetId]);

  useEffect(() => {
    void reloadLine();
  }, [reloadLine]);

  const projectIdChanged = useMemo(
    () => safeText(draftProjectId) !== safeText(originalProjectId),
    [draftProjectId, originalProjectId]
  );
  const reimbursableExpenseChanged = useMemo(
    () => draftReimbursableExpense !== originalReimbursableExpense,
    [draftReimbursableExpense, originalReimbursableExpense]
  );
  const resetDraftProjectId = useCallback(() => {
    setDraftProjectId(originalProjectId);
  }, [originalProjectId]);
  const resetDraftReimbursableExpense = useCallback(() => {
    setDraftReimbursableExpense(originalReimbursableExpense);
  }, [originalReimbursableExpense]);
  const acceptDraftProjectId = useCallback(() => {
    const safeProjectId = safeText(draftProjectId);
    setOriginalProjectId(safeProjectId);
    setDraftProjectId(safeProjectId);
  }, [draftProjectId]);
  const acceptDraftReimbursableExpense = useCallback(() => {
    const safeReimbursableExpense = normalizeExpenseLineReimbursableExpense(draftReimbursableExpense);
    setOriginalReimbursableExpense(safeReimbursableExpense);
    setDraftReimbursableExpense(safeReimbursableExpense);
  }, [draftReimbursableExpense]);

  return {
    line,
    localCurrencyCode,
    isLoading,
    errorMessage,
    originalProjectId,
    draftProjectId,
    projectIdChanged,
    originalReimbursableExpense,
    draftReimbursableExpense,
    reimbursableExpenseChanged,
    setDraftProjectId,
    setDraftReimbursableExpense,
    resetDraftProjectId,
    resetDraftReimbursableExpense,
    acceptDraftProjectId,
    acceptDraftReimbursableExpense,
    reloadLine,
  };
};
