import { useCallback, useEffect, useMemo, useState } from "react";
import { ApiFetchError } from "../../../../services/apiService.ts";
import { indT } from "../../../../utils/indI18n.ts";
import type { ExpenseSheetDetailDto, ExpenseSheetLine } from "../../expenseTypes.ts";
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
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const reloadLine = useCallback(async () => {
    const safeSheetId = safeText(sheetId);
    const safeLineRecId = safeText(lineRecId);
    if (!enabled || !safeSheetId || !safeLineRecId) {
      setLine(null);
      setOriginalProjectId("");
      setDraftProjectId("");
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
        setErrorMessage(response?.Message || indT("ExpenseSheets_LoadError", "Could not load expense sheet detail."));
        return;
      }

      const sheet = selectSheet(response?.Items || [], safeSheetId);
      const selectedLine = sheet ? selectLine(sheet, safeLineRecId) : null;
      if (!selectedLine) {
        setLine(null);
        setOriginalProjectId("");
        setDraftProjectId("");
        setErrorMessage(indT("ExpenseSheets_NotFound", "Expense sheet was not found."));
        return;
      }

      const projectId = safeText(selectedLine.projId);
      setLine(selectedLine);
      setOriginalProjectId(projectId);
      setDraftProjectId(projectId);
    } catch (error) {
      if (error instanceof ApiFetchError && error.status === 403) {
        onForbidden();
        return;
      }

      setLine(null);
      setOriginalProjectId("");
      setDraftProjectId("");
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
  const resetDraftProjectId = useCallback(() => {
    setDraftProjectId(originalProjectId);
  }, [originalProjectId]);
  const acceptDraftProjectId = useCallback(() => {
    const safeProjectId = safeText(draftProjectId);
    setOriginalProjectId(safeProjectId);
    setDraftProjectId(safeProjectId);
  }, [draftProjectId]);

  return {
    line,
    isLoading,
    errorMessage,
    originalProjectId,
    draftProjectId,
    projectIdChanged,
    setDraftProjectId,
    resetDraftProjectId,
    acceptDraftProjectId,
    reloadLine,
  };
};
