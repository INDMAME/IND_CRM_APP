import React, { useCallback } from "react";
import { indT } from "../../../utils/indI18n.ts";
import { showPermissionModal } from "../../../utils/permissions.ts";
import type { ExpenseSheetHeaderUpdateRequest } from "../expenseTypes.ts";
import { executeExpenseMutation, parseDecimalInput } from "../hooks/expenseMutationUtils.ts";
import {
  createExpenseSheet,
  deleteExpenseSheet,
  updateExpenseSheetHeader,
  type ExpenseSheetCreateRequest,
} from "../utils/expenseApi.ts";

type UseExpenseSheetDetailMutationsArgs = {
  busy: boolean;
  isEditing: boolean;
  isCreateMode: boolean;
  isLocked: boolean;
  isCurrencyLockedByLines: boolean;
  isExchangeRateLockedByLines: boolean;
  lockedCurrencyCode: string;
  lockedExchangeRate: string;
  canCreateExpense: boolean;
  canEditExpense: boolean;
  canDeleteExpense: boolean;
  sheetId: string;
  draftDescription: string;
  draftCurrencyCode: string;
  draftExchangeRate: string;
  draftProjectId: string;
  onCreateSuccess: (createdSheetId: string) => void;
  setModalError: React.Dispatch<React.SetStateAction<string>>;
  setBusy: React.Dispatch<React.SetStateAction<boolean>>;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

const normalizeExchangeRate = (raw: string): number | null => parseDecimalInput(raw);

// Encapsulates update and delete mutations for expense sheet header detail.
export const useExpenseSheetDetailMutations = ({
  busy,
  isEditing,
  isCreateMode,
  isLocked,
  isCurrencyLockedByLines,
  isExchangeRateLockedByLines,
  lockedCurrencyCode,
  lockedExchangeRate,
  canCreateExpense,
  canEditExpense,
  canDeleteExpense,
  sheetId,
  draftDescription,
  draftCurrencyCode,
  draftExchangeRate,
  draftProjectId,
  onCreateSuccess,
  setModalError,
  setBusy,
  setStatus,
  setIsEditing,
}: UseExpenseSheetDetailMutationsArgs) => {
  const handleUpdate = useCallback(async () => {
    if (busy || !isEditing) return false;
    if (!isCreateMode && isLocked) return false;

    const canProceed = isCreateMode ? canCreateExpense : canEditExpense;
    if (!canProceed) {
      showPermissionModal();
      return false;
    }

    const normalizedCurrency = String(
      isCurrencyLockedByLines ? (lockedCurrencyCode || draftCurrencyCode || "") : (draftCurrencyCode || "")
    )
      .trim()
      .toUpperCase();
    const normalizedDescription = String(draftDescription || "").trim();
    const normalizedProjectId = String(draftProjectId || "").trim();
    const normalizedExchangeRateRaw = String(
      isExchangeRateLockedByLines ? (lockedExchangeRate || draftExchangeRate || "") : (draftExchangeRate || "")
    );
    const requiresExchangeRate = normalizedCurrency !== "" && normalizedCurrency !== "EUR";
    const parsedExchangeRate = normalizeExchangeRate(normalizedExchangeRateRaw);
    const hasValidRate = parsedExchangeRate != null && parsedExchangeRate > 0;

    if (isCreateMode) {
      if (!normalizedDescription) {
        const validationMessage = indT("ExpenseSheets_Validation_DescriptionRequired", "Description is required.");
        setModalError(validationMessage);
        setStatus(validationMessage);
        return false;
      }

      if (!normalizedCurrency) {
        const validationMessage = indT("ExpenseSheets_Validation_CurrencyRequired", "Currency is required.");
        setModalError(validationMessage);
        setStatus(validationMessage);
        return false;
      }
    }

    if (requiresExchangeRate && !hasValidRate) {
      const validationMessage = indT(
        "ExpenseSheets_Validation_ExchangeRateRequired",
        "Exchange rate is required when currency is different from EUR."
      );
      setModalError(validationMessage);
      setStatus(validationMessage);
      return false;
    }

    const result = await executeExpenseMutation({
      startStatus: isCreateMode
        ? indT("Common_Loading", "Loading")
        : indT("ExpenseSheets_Detail_Updating", "Updating expense sheet..."),
      fallbackErrorMessage: indT("ExpenseSheets_Detail_UpdateError", "Update error."),
      setModalError,
      setBusy,
      setStatus,
      action: async () => {
        if (isCreateMode) {
          const payload: ExpenseSheetCreateRequest = {
            mode: 1,
            existingHojaGastosId: null,
            description: normalizedDescription,
            currencyCode: normalizedCurrency,
            exchRate: hasValidRate ? Number(parsedExchangeRate) : 1,
            projId: normalizedProjectId || null,
            lines: [],
          };

          const response = await createExpenseSheet(payload);

          if (!response.success) {
            throw new Error(response.message || indT("Api_RequestFailed", "Request failed."));
          }

          const createdSheetId = String(response?.data?.hojaGastosId || response?.data?.HojaGastosId || "").trim();
          if (!createdSheetId) {
            throw new Error(indT("Api_RequestFailed", "Request failed."));
          }

          onCreateSuccess(createdSheetId);
          setStatus(indT("Common_Save", "Save"));
          setIsEditing(false);
          return true;
        }

        const payload: ExpenseSheetHeaderUpdateRequest = {
          description: String(draftDescription || "").trim(),
          currencyCode: normalizedCurrency,
          exchRate: hasValidRate ? Number(parsedExchangeRate) : 1,
          projId: String(draftProjectId || "").trim() || null,
        };

        const response = await updateExpenseSheetHeader(sheetId, payload);

        if (!response.success) {
          throw new Error(response.message || indT("ExpenseSheets_Detail_UpdateFailed", "Update failed."));
        }

        setStatus(indT("ExpenseSheets_Detail_Updated", "Expense sheet updated"));
        setIsEditing(false);
        return true;
      },
    });

    return result.ok;
  }, [
    busy,
    canCreateExpense,
    canEditExpense,
    draftCurrencyCode,
    draftDescription,
    draftExchangeRate,
    draftProjectId,
    isCreateMode,
    isCurrencyLockedByLines,
    isExchangeRateLockedByLines,
    isLocked,
    isEditing,
    lockedCurrencyCode,
    lockedExchangeRate,
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
      startStatus: indT("ExpenseSheets_Detail_Deleting", "Deleting expense sheet..."),
      fallbackErrorMessage: indT("ExpenseSheets_Detail_DeleteError", "Delete error."),
      setModalError,
      setBusy,
      setStatus,
      action: async () => {
        const response = await deleteExpenseSheet(sheetId);

        if (!response.success) {
          throw new Error(response.message || indT("ExpenseSheets_Detail_DeleteFailed", "Delete failed."));
        }

        setStatus(indT("ExpenseSheets_Detail_Deleted", "Expense sheet deleted"));
        return true;
      },
    });

    return result.ok;
  }, [busy, canDeleteExpense, isLocked, setBusy, setModalError, setStatus, sheetId]);

  return {
    handleUpdate,
    handleDelete,
  };
};
