import React, { useCallback } from "react";
import { indT } from "../../../utils/indI18n.ts";
import { showPermissionModal } from "../../../utils/permissions.ts";
import type { ExpenseSheetCreateRequest, ExpenseSheetHeaderUpdateRequest } from "../expenseTypes.ts";
import { executeExpenseMutation, parseDecimalInput } from "../hooks/expenseMutationUtils.ts";
import {
  createExpenseSheet,
  deleteExpenseSheet,
  updateExpenseSheetHeader,
} from "../utils/expenseApi.ts";

type UseExpenseSheetDetailMutationsArgs = {
  busy: boolean;
  isEditing: boolean;
  isCreateMode: boolean;
  isEditLocked: boolean;
  isDeleteLocked: boolean;
  isCurrencyLockedByLines: boolean;
  isExchangeRateLockedByLines: boolean;
  lockedCurrencyCode: string;
  lockedExchangeRate: string;
  canCreateExpense: boolean;
  canEditExpense: boolean;
  canDeleteExpense: boolean;
  canEditHeaderFields: boolean;
  canEditStatus: boolean;
  sheetId: string;
  draftDescription: string;
  draftCurrencyCode: string;
  draftExchangeRate: string;
  officialExchangeRateValue: string;
  draftProjectId: string;
  draftExpenseSheetStatus?: number | null;
  draftEstadoComentarios: string;
  draftVoucher: string;
  exchangeRateBaseCurrency: string;
  currentExpenseSheetStatus?: number | null;
  currentExchangeRateMode?: number | null;
  onCreateSuccess: (createdSheetId: string) => void;
  setModalError: React.Dispatch<React.SetStateAction<string>>;
  setBusy: React.Dispatch<React.SetStateAction<boolean>>;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

const normalizeExchangeRate = (raw: string): number | null => parseDecimalInput(raw);
const EXPENSE_STATUS_PAID = 4;
// Compares rates with tolerance to avoid floating point mismatch on payload mode.
const areRatesEquivalent = (left: number | null, right: number | null): boolean => {
  if (left == null || right == null) return false;
  return Math.abs(left - right) < 0.0000001;
};

// Encapsulates update and delete mutations for expense sheet header detail.
export const useExpenseSheetDetailMutations = ({
  busy,
  isEditing,
  isCreateMode,
  isEditLocked,
  isDeleteLocked,
  isCurrencyLockedByLines,
  isExchangeRateLockedByLines,
  lockedCurrencyCode,
  lockedExchangeRate,
  canCreateExpense,
  canEditExpense,
  canDeleteExpense,
  canEditHeaderFields,
  canEditStatus,
  sheetId,
  draftDescription,
  draftCurrencyCode,
  draftExchangeRate,
  officialExchangeRateValue,
  draftProjectId,
  draftExpenseSheetStatus,
  draftEstadoComentarios,
  draftVoucher,
  exchangeRateBaseCurrency,
  currentExpenseSheetStatus,
  currentExchangeRateMode,
  onCreateSuccess,
  setModalError,
  setBusy,
  setStatus,
  setIsEditing,
}: UseExpenseSheetDetailMutationsArgs) => {
  const handleUpdate = useCallback(async () => {
    if (busy || !isEditing) return false;
    if (!isCreateMode && isEditLocked) return false;

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
    const normalizedEstadoComentarios = canEditStatus ? String(draftEstadoComentarios || "").trim() : "";
    const normalizedVoucher = canEditStatus ? String(draftVoucher || "").trim() : "";
    const normalizedExchangeRateRaw = String(
      isExchangeRateLockedByLines ? (lockedExchangeRate || draftExchangeRate || "") : (draftExchangeRate || "")
    );
    const normalizedBaseCurrency = String(exchangeRateBaseCurrency || "EUR").trim().toUpperCase() || "EUR";
    const requiresExchangeRate =
      canEditHeaderFields && normalizedCurrency !== "" && normalizedCurrency !== normalizedBaseCurrency;
    const parsedExchangeRate = normalizeExchangeRate(normalizedExchangeRateRaw);
    const officialExchangeRate = normalizeExchangeRate(officialExchangeRateValue);
    const originalExchangeRate = normalizeExchangeRate(lockedExchangeRate);
    const parsedCurrentExchangeRateMode = Number(currentExchangeRateMode);
    const hasCurrentExchangeRateMode = Number.isInteger(parsedCurrentExchangeRateMode) && parsedCurrentExchangeRateMode >= 0;
    const hasValidRate = parsedExchangeRate != null && parsedExchangeRate > 0;
    const parsedDraftStatus = Number(draftExpenseSheetStatus);
    const hasDraftStatus = Number.isInteger(parsedDraftStatus) && parsedDraftStatus >= 0;
    const hasManualRateEditOnUpdate =
      canEditHeaderFields &&
      !isCreateMode &&
      hasValidRate &&
      (originalExchangeRate == null || !areRatesEquivalent(parsedExchangeRate, originalExchangeRate));
    // Only send exchangeRateMode when the user actually changed the rate manually.
    const isManualExchangeRate = (() => {
      if (!canEditHeaderFields) return false;
      if (!requiresExchangeRate || !hasValidRate) return false;
      if (isExchangeRateLockedByLines) return false;
      if (!isCreateMode && !hasManualRateEditOnUpdate) return false;
      if (officialExchangeRate == null) return true;
      return !areRatesEquivalent(parsedExchangeRate, officialExchangeRate);
    })();
    const resolvedExchangeRateMode = canEditHeaderFields
      ? (isManualExchangeRate
        ? 1
        : (normalizedEstadoComentarios ? (hasCurrentExchangeRateMode ? parsedCurrentExchangeRateMode : 0) : undefined))
      : (hasCurrentExchangeRateMode ? parsedCurrentExchangeRateMode : undefined);
    const resolvedExpenseSheetStatus = hasDraftStatus ? parsedDraftStatus : (currentExpenseSheetStatus ?? undefined);
    const resolvedVoucher = resolvedExpenseSheetStatus === EXPENSE_STATUS_PAID ? normalizedVoucher || undefined : undefined;

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
        "Exchange rate is required when currency is different from base currency."
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
            existingHojaGastosId: undefined,
            description: normalizedDescription,
            currencyCode: normalizedCurrency,
            exchRate: hasValidRate ? Number(parsedExchangeRate) : 1,
            projId: normalizedProjectId || undefined,
            expenseSheetStatus: 0,
            exchangeRateMode: resolvedExchangeRateMode,
            lines: [],
          };

          const response = await createExpenseSheet(payload);

          if (!response.Success) {
            throw new Error(response.Message || indT("Api_RequestFailed", "Request failed."));
          }

          // Accept both casing variants from backend envelopes.
          const createdData = response?.Data as { HojaGastosId?: unknown; hojaGastosId?: unknown } | null | undefined;
          const createdSheetId = String(createdData?.HojaGastosId ?? createdData?.hojaGastosId ?? "").trim();
          if (!createdSheetId) {
            throw new Error(indT("Api_RequestFailed", "Request failed."));
          }

          onCreateSuccess(createdSheetId);
          setStatus(indT("Common_Save", "Save"));
          return true;
        }

        const payload: ExpenseSheetHeaderUpdateRequest = {
          description: String(draftDescription || "").trim(),
          currencyCode: normalizedCurrency,
          exchRate: hasValidRate ? Number(parsedExchangeRate) : 1,
          projId: String(draftProjectId || "").trim() || undefined,
          voucher: resolvedVoucher,
          expenseSheetStatus: resolvedExpenseSheetStatus,
          exchangeRateMode: resolvedExchangeRateMode,
          estadoComentarios: canEditStatus ? normalizedEstadoComentarios : undefined,
        };

        const response = await updateExpenseSheetHeader(sheetId, payload);

        if (!response.Success) {
          throw new Error(response.Message || indT("ExpenseSheets_Detail_UpdateFailed", "Update failed."));
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
    canEditHeaderFields,
    draftCurrencyCode,
    draftDescription,
    draftExchangeRate,
    draftExpenseSheetStatus,
    draftEstadoComentarios,
    officialExchangeRateValue,
    draftProjectId,
    exchangeRateBaseCurrency,
    currentExpenseSheetStatus,
    currentExchangeRateMode,
    canEditStatus,
    draftVoucher,
    isCreateMode,
    isCurrencyLockedByLines,
    isExchangeRateLockedByLines,
    isEditLocked,
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
    if (isDeleteLocked) return false;
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

        if (!response.Success) {
          throw new Error(response.Message || indT("ExpenseSheets_Detail_DeleteFailed", "Delete failed."));
        }

        setStatus(indT("ExpenseSheets_Detail_Deleted", "Expense sheet deleted"));
        return true;
      },
    });

    return result.ok;
  }, [busy, canDeleteExpense, isDeleteLocked, setBusy, setModalError, setStatus, sheetId]);

  return {
    handleUpdate,
    handleDelete,
  };
};
