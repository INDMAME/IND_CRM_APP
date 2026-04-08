import React, { useCallback } from "react";
import { indT } from "../../../utils/indI18n.ts";
import { showPermissionModal } from "../../../utils/permissions.ts";
import { ApiFetchError } from "../../../services/apiService.ts";
import type {
  ExpenseSheetCreateLineRequest,
  ExpenseSheetLine,
  ExpenseSheetLineUpdateRequest,
} from "../expenseTypes.ts";
import { parseExpenseInternationalValue } from "../constants/internationalOptions.ts";
import { safeText } from "../utils/expenseUiUtils.ts";
import { EXPENSE_API_DATE_FORMAT_MESSAGE, toExpenseApiDdMmYyyy } from "../utils/expenseApiDateUtils.ts";
import { executeExpenseMutation, parseDecimalInput } from "../hooks/expenseMutationUtils.ts";
import {
  createExpenseSheet,
  deleteExpenseSheetLine,
  deleteExpenseSheetTicket,
  deleteExpenseSheetTicketFile,
  updateExpenseSheetLine,
} from "../utils/expenseApi.ts";

type UseExpenseSheetLineDetailMutationsArgs = {
  busy: boolean;
  isEditing: boolean;
  isCreateMode: boolean;
  isEditLocked: boolean;
  isDeleteLocked: boolean;
  canCreateExpense: boolean;
  canEditExpense: boolean;
  canDeleteExpense: boolean;
  sheetId: string;
  lineId: string;
  line: ExpenseSheetLine | null;
  linkedTicketFileId: string;
  draftDescription: string;
  draftTransDate: string;
  draftTypeValueCode: string;
  draftPrice: string;
  draftQty: string;
  draftProjectId: string;
  draftInternational: string;
  setModalError: React.Dispatch<React.SetStateAction<string>>;
  setBusy: React.Dispatch<React.SetStateAction<boolean>>;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  onInvalidType?: () => void;
  onCreateSuccess: () => void;
};

const normalizeLineDate = (raw: string): string => {
  return toExpenseApiDdMmYyyy(raw);
};

const parseNumber = (raw: string): number | null => parseDecimalInput(raw);

// Encapsulates update and delete mutations for expense sheet line detail.
export const useExpenseSheetLineDetailMutations = ({
  busy,
  isEditing,
  isCreateMode,
  isEditLocked,
  isDeleteLocked,
  canCreateExpense,
  canEditExpense,
  canDeleteExpense,
  sheetId,
  lineId,
  line,
  linkedTicketFileId,
  draftDescription,
  draftTransDate,
  draftTypeValueCode,
  draftPrice,
  draftQty,
  draftProjectId,
  draftInternational,
  setModalError,
  setBusy,
  setStatus,
  setIsEditing,
  onInvalidType,
  onCreateSuccess,
}: UseExpenseSheetLineDetailMutationsArgs) => {
  const isNotFoundError = (error: unknown): boolean => {
    return error instanceof ApiFetchError && error.status === 404;
  };

  const isMissingTicketFileMessage = (message: unknown): boolean => {
    const normalized = String(message || "").trim().toLowerCase();
    if (!normalized) return false;

    return (
      normalized.includes("archivo asociado") ||
      normalized.includes("archivo adjunto") ||
      normalized.includes("associated file") ||
      normalized.includes("attached file")
    );
  };

  const handleUpdate = useCallback(async () => {
    if (busy || !isEditing) return false;
    if (isEditLocked) return false;

    const canProceed = isCreateMode ? canCreateExpense : canEditExpense;
    if (!canProceed) {
      showPermissionModal();
      return false;
    }

    const normalizedDate = normalizeLineDate(draftTransDate);
    const parsedTypeValue = Number.parseInt(String(draftTypeValueCode || "").trim(), 10);
    const parsedPrice = parseNumber(draftPrice);
    const parsedQty = parseNumber(draftQty);
    const parsedInternational = parseExpenseInternationalValue(draftInternational);

    const hasValidQtyPrice = parsedQty != null && parsedQty > 0 && parsedPrice != null && parsedPrice > 0;
    if (!hasValidQtyPrice) {
      const validationMessage = indT(
        "ExpenseSheets_Line_Validation_AmountQty",
        "Quantity and price must be greater than 0."
      );
      setModalError(validationMessage);
      setStatus(validationMessage);
      return false;
    }

    if (!normalizedDate) {
      setModalError(EXPENSE_API_DATE_FORMAT_MESSAGE);
      setStatus(EXPENSE_API_DATE_FORMAT_MESSAGE);
      return false;
    }

    if (!Number.isFinite(parsedTypeValue) || parsedTypeValue <= 0) {
      const validationMessage = indT("Api_RequestFailed", "Request failed.");
      onInvalidType?.();
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
          qty: Number(parsedQty),
          price: Number(parsedPrice),
          projId: String(draftProjectId || "").trim() || undefined,
          indAttachFiles: safeText(line?.indAttachFiles),
        };

        const createLinePayload: ExpenseSheetCreateLineRequest = commonLinePayload;
        const updateLinePayload: ExpenseSheetLineUpdateRequest = commonLinePayload;

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
    draftPrice,
    draftDescription,
    draftInternational,
    draftProjectId,
    draftQty,
    draftTransDate,
    draftTypeValueCode,
    isCreateMode,
    isEditLocked,
    isEditing,
    line,
    lineId,
    onCreateSuccess,
    onInvalidType,
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
      startStatus: indT("ExpenseSheets_Line_Detail_Deleting", "Deleting expense line..."),
      fallbackErrorMessage: indT("ExpenseSheets_Detail_DeleteError", "Delete error."),
      setModalError,
      setBusy,
      setStatus,
      action: async () => {
        const safeLinkedTicketFileId = safeText(linkedTicketFileId);
        if (safeLinkedTicketFileId) {
          try {
            const deleteFileResponse = await deleteExpenseSheetTicketFile(safeLinkedTicketFileId);
            if (!deleteFileResponse.Success && !isMissingTicketFileMessage(deleteFileResponse.Message)) {
              throw new Error(deleteFileResponse.Message || indT("ExpenseSheets_Detail_DeleteFailed", "Delete failed."));
            }
          } catch (error) {
            if (!isNotFoundError(error)) {
              throw error;
            }
          }

          try {
            const deleteTicketResponse = await deleteExpenseSheetTicket(safeLinkedTicketFileId);
            if (!deleteTicketResponse.Success) {
              throw new Error(deleteTicketResponse.Message || indT("ExpenseSheets_Detail_DeleteFailed", "Delete failed."));
            }
          } catch (error) {
            if (!isNotFoundError(error)) {
              throw error;
            }
          }
        }

        const response = await deleteExpenseSheetLine(sheetId, lineId);

        if (!response.Success) {
          throw new Error(response.Message || indT("ExpenseSheets_Detail_DeleteFailed", "Delete failed."));
        }

        setStatus(indT("ExpenseSheets_Line_Detail_Deleted", "Expense line deleted"));
        return true;
      },
    });

    return result.ok;
  }, [
    busy,
    canDeleteExpense,
    isDeleteLocked,
    lineId,
    linkedTicketFileId,
    setBusy,
    setModalError,
    setStatus,
    sheetId,
  ]);

  return {
    handleUpdate,
    handleDelete,
  };
};
