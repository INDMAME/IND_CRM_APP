import React, { useCallback } from "react";
import { indT } from "../../../utils/indI18n.ts";
import { showPermissionModal } from "../../../utils/permissions.ts";
import type {
  ExpenseSheetCreateRequest,
  ExpenseSheetHeaderUpdateRequest,
  ExpenseSheetLine,
  ExpenseSheetLineUpdateRequest,
} from "../expenseTypes.ts";
import { toExpenseGastoTypeCode } from "../constants/expenseGastoTypeCatalog.ts";
import {
  normalizeExpenseLineReimbursableExpense,
  normalizeExpenseReimbursableExpense,
} from "../constants/expenseReimbursableExpenseCatalog.ts";
import { executeExpenseMutation } from "../hooks/expenseMutationUtils.ts";
import {
  createExpenseSheet,
  deleteExpenseSheet,
  updateExpenseSheetLine,
  updateExpenseSheetHeader,
} from "../utils/expenseApi.ts";
import { safeText } from "../utils/expenseUiUtils.ts";

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
  currentExpenseSheetStatus?: number | null;
  currentLines: ExpenseSheetLine[];
  onCreateSuccess: (createdSheetId: string) => void;
  setModalError: React.Dispatch<React.SetStateAction<string>>;
  setBusy: React.Dispatch<React.SetStateAction<boolean>>;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

const toFiniteNumber = (value: unknown): number | null => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const toPositiveNumber = (value: unknown): number | null => {
  const parsed = toFiniteNumber(value);
  return parsed != null && parsed > 0 ? parsed : null;
};

const buildReimbursableLineUpdatePayload = (
  line: ExpenseSheetLine,
  reimbursableExpense: number
): ExpenseSheetLineUpdateRequest => {
  const typeValue = toExpenseGastoTypeCode(line.typeValueCode || line.typeValue, { allowNone: false });
  const rawQty = toPositiveNumber(line.qty);
  const rawPrice = toPositiveNumber(line.price);
  const rawAmount = toPositiveNumber(line.amount);
  const qty = rawQty ?? (rawAmount != null ? 1 : 0);
  const price = rawPrice ?? (rawAmount != null && qty > 0 ? rawAmount / qty : 0);
  const transDate = safeText(line.transDate);

  if (!transDate || typeValue === null || !(qty > 0) || !(price > 0)) {
    throw new Error(indT("ExpenseSheets_Detail_UpdateFailed", "Update failed."));
  }

  return {
    transDate,
    typeValue,
    description: safeText(line.description),
    internacional: line.internacional === true,
    fileId: safeText(line.fileId) || undefined,
    ticket: line.ticket === true,
    qty,
    price,
    projId: safeText(line.projId) || undefined,
    reimbursableExpense,
    currencyCode: safeText(line.currencyCode).toUpperCase() || undefined,
    amountMST: toFiniteNumber(line.amountMST),
    exchRate: toFiniteNumber(line.exchRate),
    indAttachFiles: safeText(line.indAttachFiles) || undefined,
  };
};

const updateReimbursableExpenseOnLines = async (
  sheetId: string,
  lines: ExpenseSheetLine[],
  reimbursableExpense: number
): Promise<void> => {
  const safeSheetId = safeText(sheetId);
  if (!safeSheetId || lines.length < 1) return;

  const nextLineReimbursableExpense = normalizeExpenseLineReimbursableExpense(reimbursableExpense);
  const updates = lines.map((line) => {
    const lineRecId = safeText(line.lineRecId);
    if (!lineRecId) {
      throw new Error(indT("ExpenseSheets_Detail_UpdateFailed", "Update failed."));
    }

    return {
      lineRecId,
      payload: buildReimbursableLineUpdatePayload(line, nextLineReimbursableExpense),
    };
  });

  await Promise.all(
    updates.map(async ({ lineRecId, payload }) => {
      const response = await updateExpenseSheetLine(safeSheetId, lineRecId, payload, {
        suppressPermissionModal: true,
      });

      if (!response.Success) {
        throw new Error(response.Message || indT("ExpenseSheets_Detail_UpdateFailed", "Update failed."));
      }
    })
  );
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
  currentExpenseSheetStatus,
  currentLines,
  onCreateSuccess,
  setModalError,
  setBusy,
  setStatus,
  setIsEditing,
}: UseExpenseSheetDetailMutationsArgs) => {
  const buildUpdatePayload = useCallback(
    (
      nextStatus?: number | null,
      statusCommentOverride?: string | null
    ): { payload: ExpenseSheetHeaderUpdateRequest } | { error: string } => {
      const hasExplicitStatusCommentOverride = statusCommentOverride !== undefined;
      const normalizedDescription = String(draftDescription || "").trim();
      const normalizedProjectId = String(draftProjectId || "").trim();
      const normalizedEstadoComentarios = String(
        statusCommentOverride ?? draftEstadoComentarios ?? ""
      ).trim();
      const normalizedReimbursableExpense = normalizeExpenseReimbursableExpense(draftReimbursableExpense);
      const resolvedExpenseSheetStatus =
        nextStatus ?? (currentExpenseSheetStatus != null ? Number(currentExpenseSheetStatus) : undefined);

      if (!normalizedDescription) {
        return {
          error: indT("ExpenseSheets_Validation_DescriptionRequired", "Description is required."),
        };
      }

      return {
        payload: {
          description: normalizedDescription,
          projId: normalizedProjectId || undefined,
          expenseSheetStatus: resolvedExpenseSheetStatus,
          reimbursableExpense: normalizedReimbursableExpense,
          // Preserve explicit empty status comments so the backend can clear the stored value.
          estadoComentarios: hasExplicitStatusCommentOverride
            ? normalizedEstadoComentarios
            : (normalizedEstadoComentarios || undefined),
        },
      };
    },
    [
      canEditHeaderFields,
      currentExpenseSheetStatus,
      draftDescription,
      draftEstadoComentarios,
      draftProjectId,
      draftReimbursableExpense,
      isCreateMode,
    ]
  );

  const handleUpdate = useCallback(async () => {
    if (busy || !isEditing) return false;
    if (!isCreateMode && isEditLocked) return false;

    const canProceed = isCreateMode ? canCreateExpense : canEditExpense;
    if (!canProceed) {
      showPermissionModal();
      return false;
    }

    const payloadResult = buildUpdatePayload();
    if ("error" in payloadResult) {
      setModalError(payloadResult.error);
      setStatus(payloadResult.error);
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
    buildUpdatePayload,
    canCreateExpense,
    canEditExpense,
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

      const result = await executeExpenseMutation({
        startStatus: indT("ExpenseSheets_Detail_PropagatingReimbursable", "Updating expense sheet lines..."),
        fallbackErrorMessage: indT("ExpenseSheets_Detail_UpdateError", "Update error."),
        setModalError,
        setBusy,
        setStatus,
        action: async () => {
          await updateReimbursableExpenseOnLines(
            sheetId,
            currentLines,
            normalizeExpenseReimbursableExpense(nextReimbursableExpense)
          );

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
      currentLines,
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

      const payloadResult = buildUpdatePayload(nextStatus, statusCommentOverride);
      if ("error" in payloadResult) {
        setModalError(payloadResult.error);
        setStatus(payloadResult.error);
        return false;
      }

      const result = await executeExpenseMutation({
        startStatus,
        fallbackErrorMessage: indT("ExpenseSheets_Detail_UpdateError", "Update error."),
        setModalError,
        setBusy,
        setStatus,
        action: async () => {
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
    },
    [
      busy,
      buildUpdatePayload,
      canTransitionStatus,
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
    handleStatusTransition,
    handleDelete,
  };
};
