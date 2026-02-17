import React, { useCallback } from "react";
import { indT } from "../../../utils/indI18n.ts";
import { showPermissionModal } from "../../../utils/permissions.ts";
import type {
  ExpenseSheetCreateLineRequest,
  ExpenseSheetLine,
  ExpenseSheetLineUpdateRequest,
} from "../expenseTypes.ts";
import { parseExpenseInternationalValue } from "../constants/internationalOptions.ts";
import { safeText } from "../utils/expenseUiUtils.ts";
import { executeExpenseMutation, parseDecimalInput } from "../hooks/expenseMutationUtils.ts";
import { createExpenseSheet, deleteExpenseSheetLine, updateExpenseSheetLine } from "../utils/expenseApi.ts";

type UseExpenseSheetLineDetailMutationsArgs = {
  busy: boolean;
  isEditing: boolean;
  isCreateMode: boolean;
  isLocked: boolean;
  canCreateExpense: boolean;
  canEditExpense: boolean;
  canDeleteExpense: boolean;
  sheetId: string;
  lineId: string;
  line: ExpenseSheetLine | null;
  draftDescription: string;
  draftTransDate: string;
  draftTypeValueCode: string;
  draftAmount: string;
  draftQty: string;
  draftProjectId: string;
  draftInternational: string;
  setModalError: React.Dispatch<React.SetStateAction<string>>;
  setBusy: React.Dispatch<React.SetStateAction<boolean>>;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  onCreateSuccess: () => void;
};

const normalizeLineDate = (raw: string): string => {
  const value = String(raw || "").trim();
  if (!value) return "";

  if (/^\d{8}$/.test(value)) {
    return value;
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return value.replace(/-/g, "");
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return "";
  }

  const yyyy = parsed.getFullYear();
  const mm = String(parsed.getMonth() + 1).padStart(2, "0");
  const dd = String(parsed.getDate()).padStart(2, "0");
  return `${yyyy}${mm}${dd}`;
};

const parseNumber = (raw: string): number | null => parseDecimalInput(raw);

// Encapsulates update and delete mutations for expense sheet line detail.
export const useExpenseSheetLineDetailMutations = ({
  busy,
  isEditing,
  isCreateMode,
  isLocked,
  canCreateExpense,
  canEditExpense,
  canDeleteExpense,
  sheetId,
  lineId,
  line,
  draftDescription,
  draftTransDate,
  draftTypeValueCode,
  draftAmount,
  draftQty,
  draftProjectId,
  draftInternational,
  setModalError,
  setBusy,
  setStatus,
  setIsEditing,
  onCreateSuccess,
}: UseExpenseSheetLineDetailMutationsArgs) => {
  const handleUpdate = useCallback(async () => {
    if (busy || !isEditing) return false;
    if (isLocked) return false;

    const canProceed = isCreateMode ? canCreateExpense : canEditExpense;
    if (!canProceed) {
      showPermissionModal();
      return false;
    }

    const normalizedDate = normalizeLineDate(draftTransDate);
    const parsedTypeValue = Number.parseInt(String(draftTypeValueCode || "").trim(), 10);
    const parsedAmount = parseNumber(draftAmount);
    const parsedQty = parseNumber(draftQty);
    const parsedInternational = parseExpenseInternationalValue(draftInternational);

    const hasValidQtyAmount = parsedQty != null && parsedQty > 0 && parsedAmount != null && parsedAmount >= 0;
    if (!hasValidQtyAmount) {
      const validationMessage = indT(
        "ExpenseSheets_Line_Validation_AmountQty",
        "Quantity must be greater than 0 and amount cannot be negative."
      );
      setModalError(validationMessage);
      setStatus(validationMessage);
      return false;
    }

    if (!normalizedDate || !Number.isFinite(parsedTypeValue) || parsedTypeValue <= 0) {
      const validationMessage = indT("Api_RequestFailed", "Request failed.");
      setModalError(validationMessage);
      setStatus(validationMessage);
      return false;
    }

    const result = await executeExpenseMutation({
      startStatus: isCreateMode
        ? indT("ExpenseSheets_Line_Detail_Creating", "Creating expense line...")
        : indT("ExpenseSheets_Line_Detail_Updating", "Updating expense line..."),
      fallbackErrorMessage: indT("ExpenseSheets_Detail_UpdateError", "Update error."),
      setModalError,
      setBusy,
      setStatus,
      action: async () => {
        const commonLinePayload = {
          transDate: normalizedDate,
          typeValue: parsedTypeValue,
          description: String(draftDescription || "").trim(),
          internacional: parsedInternational ?? line?.internacional ?? false,
          ticket: line?.ticket === true,
          qty: parsedQty,
          projId: String(draftProjectId || "").trim() || undefined,
          indAttachFiles: safeText(line?.indAttachFiles),
        };

        const createLinePayload: ExpenseSheetCreateLineRequest = {
          ...commonLinePayload,
          amount: parsedAmount,
        };

        const updateLinePayload: ExpenseSheetLineUpdateRequest = {
          ...commonLinePayload,
          Amount: parsedAmount,
        };

        const response = isCreateMode
          ? await createExpenseSheet({
              mode: 2,
              existingHojaGastosId: sheetId,
              lines: [createLinePayload],
            })
          : await updateExpenseSheetLine(sheetId, lineId, updateLinePayload);

        if (!response.Success) {
          throw new Error(response.Message || indT("ExpenseSheets_Detail_UpdateFailed", "Update failed."));
        }

        if (isCreateMode) {
          setStatus(indT("ExpenseSheets_Line_Detail_Created", "Expense line created"));
          onCreateSuccess();
        } else {
          setStatus(indT("ExpenseSheets_Line_Detail_Updated", "Expense line updated"));
          setIsEditing(false);
        }
        return true;
      },
    });

    return result.ok;
  }, [
    busy,
    canCreateExpense,
    canEditExpense,
    draftAmount,
    draftDescription,
    draftInternational,
    draftProjectId,
    draftQty,
    draftTransDate,
    draftTypeValueCode,
    isCreateMode,
    isLocked,
    isEditing,
    line,
    lineId,
    onCreateSuccess,
    setBusy,
    setIsEditing,
    setModalError,
    setStatus,
    sheetId,
  ]);

  const handleDelete = useCallback(async () => {
    if (busy) return false;
    if (isLocked) return false;
    if (!canDeleteExpense) {
      showPermissionModal();
      return false;
    }

    const result = await executeExpenseMutation({
      startStatus: indT("ExpenseSheets_Line_Detail_Deleting", "Deleting expense line..."),
      fallbackErrorMessage: indT("ExpenseSheets_Detail_DeleteError", "Delete error."),
      setModalError,
      setBusy,
      setStatus,
      action: async () => {
        const response = await deleteExpenseSheetLine(sheetId, lineId);

        if (!response.Success) {
          throw new Error(response.Message || indT("ExpenseSheets_Detail_DeleteFailed", "Delete failed."));
        }

        setStatus(indT("ExpenseSheets_Line_Detail_Deleted", "Expense line deleted"));
        return true;
      },
    });

    return result.ok;
  }, [busy, canDeleteExpense, isLocked, lineId, setBusy, setModalError, setStatus, sheetId]);

  return {
    handleUpdate,
    handleDelete,
  };
};
