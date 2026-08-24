import React, { useCallback } from "react";
import { indT } from "../../../utils/indI18n.ts";
import { showPermissionModal } from "../../../utils/permissions.ts";
import type { ExpenseSheetCreateRequest } from "../expenseTypes.ts";
import {
  normalizeExpenseReimbursableExpense,
  REIMBURSABLE_EXPENSE_BOTH_VALUE,
} from "../constants/expenseReimbursableExpenseCatalog.ts";
import { executeExpenseMutation } from "../hooks/expenseMutationUtils.ts";
import {
  createExpenseSheet,
  deleteExpenseSheet,
  propagateExpenseSheetProjectDefault,
  propagateExpenseSheetReimbursableExpense,
  updateExpenseSheetHeader,
} from "../utils/expenseApi.ts";
import { safeText } from "../utils/expenseUiUtils.ts";
import {
  buildExpenseSheetFullUpdatePayload,
  buildExpenseSheetStatusTransitionPayload,
} from "./expenseSheetHeaderPayloads.ts";

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
  canTransitionStatus: boolean;
  sheetId: string;
  draftDescription: string;
  draftCurrencyCode: string;
  draftExchangeRate: string;
  draftReimbursableExpense: number | null;
  officialExchangeRateValue: string;
  draftProjectId: string;
  draftEstadoComentarios: string;
  exchangeRateBaseCurrency: string;
  currentDescription: string;
  currentProjectId: string;
  currentEstadoComentarios: string;
  currentExpenseSheetStatus?: number | null;
  onCreateSuccess: (createdSheetId: string) => void;
  onReimbursablePropagationHeaderUpdated?: () => void;
  setModalError: React.Dispatch<React.SetStateAction<string>>;
  setBusy: React.Dispatch<React.SetStateAction<boolean>>;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
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
  canTransitionStatus,
  sheetId,
  draftDescription,
  draftCurrencyCode,
  draftExchangeRate,
  draftReimbursableExpense,
  officialExchangeRateValue,
  draftProjectId,
  draftEstadoComentarios,
  exchangeRateBaseCurrency,
  currentDescription,
  currentProjectId,
  currentEstadoComentarios,
  currentExpenseSheetStatus,
  onCreateSuccess,
  onReimbursablePropagationHeaderUpdated,
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

    const payloadResult = buildExpenseSheetFullUpdatePayload({
      draftDescription,
      draftProjectId,
      draftEstadoComentarios,
      draftReimbursableExpense,
      currentExpenseSheetStatus,
      isCreateMode,
    });
    if ("errorKey" in payloadResult) {
      const validationMessage = indT(payloadResult.errorKey, "Description is required.");
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
          const createPayload = payloadResult.payload;
          const payload: ExpenseSheetCreateRequest = {
            mode: 1,
            existingHojaGastosId: undefined,
            description: createPayload.description,
            projId: createPayload.projId,
            expenseSheetStatus: 0,
            reimbursableExpense: createPayload.reimbursableExpense,
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

        const response = await updateExpenseSheetHeader(sheetId, payloadResult.payload);

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
    currentExpenseSheetStatus,
    draftDescription,
    draftEstadoComentarios,
    draftProjectId,
    draftReimbursableExpense,
    isCreateMode,
    isEditLocked,
    isEditing,
    onCreateSuccess,
    setBusy,
    setIsEditing,
    setModalError,
    setStatus,
    sheetId,
  ]);

  const handlePropagateReimbursableExpenseToLines = useCallback(
    async (nextReimbursableExpense: number) => {
      if (busy || isCreateMode || !isEditing) return false;
      if (isEditLocked || !canEditExpense || !canEditHeaderFields) {
        showPermissionModal();
        return false;
      }

      const normalizedReimbursableExpense = normalizeExpenseReimbursableExpense(nextReimbursableExpense);
      if (
        normalizedReimbursableExpense === null ||
        normalizedReimbursableExpense === REIMBURSABLE_EXPENSE_BOTH_VALUE
      ) {
        return false;
      }

      const persistedDescription = safeText(currentDescription);
      if (!persistedDescription) {
        const validationMessage = indT("ExpenseSheets_Validation_DescriptionRequired", "Description is required.");
        setModalError(validationMessage);
        setStatus(validationMessage);
        return false;
      }

      const result = await executeExpenseMutation({
        startStatus: indT("ExpenseSheets_Detail_PropagatingReimbursable", "Updating expense sheet lines..."),
        fallbackErrorMessage: indT("ExpenseSheets_Detail_UpdateError", "Update error."),
        setModalError,
        setBusy,
        setStatus,
        action: async () => {
          const headerResponse = await updateExpenseSheetHeader(sheetId, {
            description: persistedDescription,
            projId: safeText(currentProjectId) || undefined,
            projIdProvided: false,
            expenseSheetStatus: currentExpenseSheetStatus ?? undefined,
            estadoComentarios: safeText(currentEstadoComentarios) || undefined,
            reimbursableExpense: normalizedReimbursableExpense,
          });
          if (!headerResponse.Success) {
            throw new Error(headerResponse.Message || indT("ExpenseSheets_Detail_UpdateFailed", "Update failed."));
          }
          onReimbursablePropagationHeaderUpdated?.();

          const response = await propagateExpenseSheetReimbursableExpense(sheetId);
          if (!response.Success) {
            throw new Error(response.Message || indT("ExpenseSheets_Detail_UpdateFailed", "Update failed."));
          }

          setStatus(indT("ExpenseSheets_Detail_Updated", "Expense sheet updated"));
          setIsEditing(true);
          return true;
        },
      });

      return result.ok;
    },
    [
      busy,
      canEditExpense,
      canEditHeaderFields,
      currentDescription,
      currentEstadoComentarios,
      currentExpenseSheetStatus,
      currentProjectId,
      isCreateMode,
      isEditLocked,
      isEditing,
      onReimbursablePropagationHeaderUpdated,
      setBusy,
      setIsEditing,
      setModalError,
      setStatus,
      sheetId,
    ]
  );

  const handlePropagateProjectIdToLines = useCallback(
    async (nextProjectId: string) => {
      if (busy || isCreateMode || !isEditing) return false;
      if (isEditLocked || !canEditExpense || !canEditHeaderFields) {
        showPermissionModal();
        return false;
      }

      const result = await executeExpenseMutation({
        startStatus: indT("ExpenseSheets_Detail_PropagatingProject", "Updating expense sheet lines..."),
        fallbackErrorMessage: indT("ExpenseSheets_Detail_UpdateError", "Update error."),
        setModalError,
        setBusy,
        setStatus,
        action: async () => {
          const response = await propagateExpenseSheetProjectDefault(sheetId, safeText(nextProjectId), {
            suppressPermissionModal: true,
          });
          if (!response.Success) {
            throw new Error(response.Message || indT("ExpenseSheets_Detail_UpdateFailed", "Update failed."));
          }

          setStatus(indT("ExpenseSheets_Detail_Updated", "Expense sheet updated"));
          setIsEditing(true);
          return true;
        },
      });

      return result.ok;
    },
    [
      busy,
      canEditExpense,
      canEditHeaderFields,
      isCreateMode,
      isEditLocked,
      isEditing,
      setBusy,
      setIsEditing,
      setModalError,
      setStatus,
      sheetId,
    ]
  );

  const handleStatusTransition = useCallback(
    async (nextStatus: number, startStatus: string, statusCommentOverride?: string | null) => {
      if (busy || isCreateMode || !sheetId) return false;
      if (!canTransitionStatus) {
        showPermissionModal();
        return false;
      }

      const payload = buildExpenseSheetStatusTransitionPayload({
        draftDescription,
        draftProjectId,
        draftEstadoComentarios,
        draftReimbursableExpense,
        nextStatus,
        statusCommentOverride,
      });

      const result = await executeExpenseMutation({
        startStatus,
        fallbackErrorMessage: indT("ExpenseSheets_Detail_UpdateError", "Update error."),
        setModalError,
        setBusy,
        setStatus,
        action: async () => {
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
    },
    [
      busy,
      canTransitionStatus,
      draftDescription,
      draftEstadoComentarios,
      draftProjectId,
      draftReimbursableExpense,
      isCreateMode,
      setBusy,
      setIsEditing,
      setModalError,
      setStatus,
      sheetId,
    ]
  );

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
    handlePropagateReimbursableExpenseToLines,
    handlePropagateProjectIdToLines,
    handleStatusTransition,
    handleDelete,
  };
};
