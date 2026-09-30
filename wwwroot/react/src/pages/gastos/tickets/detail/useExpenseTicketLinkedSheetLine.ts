import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ApiFetchError } from "../../../../services/apiService.ts";
import { indT } from "../../../../utils/indI18n.ts";
import type { ExpenseSheetDetailDto, ExpenseSheetLine } from "../../expenseTypes.ts";
import {
  DEFAULT_LINE_REIMBURSABLE_EXPENSE,
  normalizeExpenseLineReimbursableExpense,
} from "../../constants/expenseReimbursableExpenseCatalog.ts";
import {
  fetchExistingExpenseProjectId,
  fetchExpenseSheetDetail,
  mapExpenseSheetHeader,
  mapExpenseSheetLine,
} from "../../utils/expenseApi.ts";
import { safeText } from "../../utils/expenseUiUtils.ts";
import {
  hasServerExpenseLineProjectDefault,
  resolveNewExpenseLineProjectCandidate,
} from "../../utils/expenseProjectRules.ts";

type UseExpenseTicketLinkedSheetLineArgs = {
  enabled: boolean;
  sheetId: string;
  lineRecId: string;
  initializeMissingLine: boolean;
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
  initializeMissingLine,
  onForbidden,
}: UseExpenseTicketLinkedSheetLineArgs) => {
  const [line, setLine] = useState<ExpenseSheetLine | null>(null);
  const [originalProjectId, setOriginalProjectId] = useState("");
  const [draftProjectId, setDraftProjectIdValue] = useState("");
  const [projectIdTouched, setProjectIdTouched] = useState(false);
  const [originalReimbursableExpense, setOriginalReimbursableExpense] = useState<number | null>(null);
  const [draftReimbursableExpense, setDraftReimbursableExpense] = useState<number | null>(null);
  const [localCurrencyCode, setLocalCurrencyCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const latestRequestIdRef = useRef(0);

  const reloadLine = useCallback(async () => {
    const requestId = ++latestRequestIdRef.current;
    const safeSheetId = safeText(sheetId);
    const safeLineRecId = safeText(lineRecId);
    if (!enabled || !safeSheetId) {
      setLine(null);
      setOriginalProjectId("");
      setDraftProjectIdValue("");
      setProjectIdTouched(false);
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
      if (requestId !== latestRequestIdRef.current) return;

      if (response?.Success === false) {
        setLine(null);
        setOriginalProjectId("");
        setDraftProjectIdValue("");
        setProjectIdTouched(false);
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
        // Prefills line fields during direct ticket creation from an expense sheet.
        const mappedHeader = sheet ? mapExpenseSheetHeader(sheet) : null;
        const serverDefaultProvided = hasServerExpenseLineProjectDefault(sheet);
        const projectCandidate = resolveNewExpenseLineProjectCandidate({
          defaultLineProjectId: mappedHeader?.defaultLineProjId,
          headerProjectId: mappedHeader?.projId,
          serverDefaultProvided,
        });
        const initialProjectId = initializeMissingLine && sheet
          ? serverDefaultProvided
            ? projectCandidate
            : await fetchExistingExpenseProjectId(
                projectCandidate,
                { suppressPermissionModal: true }
              )
          : "";
        if (requestId !== latestRequestIdRef.current) return;
        const initialReimbursableExpense = initializeMissingLine
          ? DEFAULT_LINE_REIMBURSABLE_EXPENSE
          : null;
        setLine(null);
        setOriginalProjectId(initialProjectId);
        setDraftProjectIdValue(initialProjectId);
        setProjectIdTouched(false);
        setOriginalReimbursableExpense(initialReimbursableExpense);
        setDraftReimbursableExpense(initialReimbursableExpense);
        setLocalCurrencyCode(sheetLocalCurrencyCode);
        setErrorMessage("");
        return;
      }

      if (!selectedLine) {
        setLine(null);
        setOriginalProjectId("");
        setDraftProjectIdValue("");
        setProjectIdTouched(false);
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
      setDraftProjectIdValue(projectId);
      setProjectIdTouched(false);
      setOriginalReimbursableExpense(reimbursableExpense);
      setDraftReimbursableExpense(reimbursableExpense);
      setLocalCurrencyCode(sheetLocalCurrencyCode);
    } catch (error) {
      if (requestId !== latestRequestIdRef.current) return;

      if (error instanceof ApiFetchError && error.status === 403) {
        onForbidden();
        return;
      }

      setLine(null);
      setOriginalProjectId("");
      setDraftProjectIdValue("");
      setProjectIdTouched(false);
      setOriginalReimbursableExpense(null);
      setDraftReimbursableExpense(null);
      setLocalCurrencyCode("");
      setErrorMessage(error instanceof Error ? error.message : indT("ExpenseSheets_LoadError", "Could not load expense sheet detail."));
    } finally {
      if (requestId !== latestRequestIdRef.current) return;
      setIsLoading(false);
    }
  }, [enabled, initializeMissingLine, lineRecId, onForbidden, sheetId]);

  useEffect(() => {
    void reloadLine();
    return () => {
      latestRequestIdRef.current += 1;
    };
  }, [reloadLine]);

  const projectIdChanged = useMemo(
    () => projectIdTouched || safeText(draftProjectId) !== safeText(originalProjectId),
    [draftProjectId, originalProjectId, projectIdTouched]
  );
  const reimbursableExpenseChanged = useMemo(
    () => draftReimbursableExpense !== originalReimbursableExpense,
    [draftReimbursableExpense, originalReimbursableExpense]
  );
  const setDraftProjectId = useCallback((value: string) => {
    setProjectIdTouched(true);
    setDraftProjectIdValue(value);
  }, []);
  const resetDraftProjectId = useCallback(() => {
    setDraftProjectIdValue(originalProjectId);
    setProjectIdTouched(false);
  }, [originalProjectId]);
  const resetDraftReimbursableExpense = useCallback(() => {
    setDraftReimbursableExpense(originalReimbursableExpense);
  }, [originalReimbursableExpense]);
  const acceptDraftProjectId = useCallback(() => {
    const safeProjectId = safeText(draftProjectId);
    setOriginalProjectId(safeProjectId);
    setDraftProjectIdValue(safeProjectId);
    setProjectIdTouched(false);
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
