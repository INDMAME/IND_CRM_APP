import React, { useCallback } from "react";
import { ApiFetchError } from "../../../services/apiService.ts";
import { indT } from "../../../utils/indI18n.ts";
import { showPermissionModal } from "../../../utils/permissions.ts";
import type {
  ExpenseSheetCreateLineRequest,
  ExpenseSheetLine,
  ExpenseSheetLineUpdateRequest,
} from "../expenseTypes.ts";
import { parseExpenseInternationalValue } from "../constants/internationalOptions.ts";
import { resolveExpenseLineReimbursableExpenseForWrite } from "../constants/expenseReimbursableExpenseCatalog.ts";
import { toExpenseGastoTypeCode } from "../constants/expenseGastoTypeCatalog.ts";
import { safeText } from "../utils/expenseUiUtils.ts";
import { EXPENSE_API_DATE_FORMAT_MESSAGE, toExpenseApiDdMmYyyy } from "../utils/expenseApiDateUtils.ts";
import { executeExpenseMutation, parseDecimalInput } from "../hooks/expenseMutationUtils.ts";
import {
  isExpenseLineForeignCurrency,
  normalizeExpenseLineCurrencyCode,
  resolveExpenseLineAmountMSTForCurrencyPayload,
  resolveExpenseLineExchangeRateForCurrency,
} from "../utils/expenseLineCurrency.ts";
import {
  createExpenseSheet,
  deleteExpenseSheetLine,
  deleteExpenseSheetTicket,
  deleteExpenseSheetTicketFile,
  detachExpenseSheetLineTicket,
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
  draftProjectIdProvided: boolean;
  draftInternational: string;
  draftReimbursableExpense: number | null;
  draftCurrencyCode: string;
  draftAmountMST: string;
  draftExchangeRate: string;
  localCurrencyCode: string;
  setModalError: React.Dispatch<React.SetStateAction<string>>;
  setBusy: React.Dispatch<React.SetStateAction<boolean>>;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  onInvalidDescription?: () => void;
  onInvalidType?: () => void;
  onInvalidAmountQty?: () => void;
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
  draftProjectIdProvided,
  draftInternational,
  draftReimbursableExpense,
  draftCurrencyCode,
  draftAmountMST,
  draftExchangeRate,
  localCurrencyCode,
  setModalError,
  setBusy,
  setStatus,
  setIsEditing,
  onInvalidDescription,
  onInvalidType,
  onInvalidAmountQty,
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
    const parsedTypeValue = toExpenseGastoTypeCode(draftTypeValueCode, { allowNone: false });
    const parsedPrice = parseNumber(draftPrice);
    const parsedQty = parseNumber(draftQty);
    const parsedInternational = parseExpenseInternationalValue(draftInternational);
    const reimbursableExpenseForWrite = resolveExpenseLineReimbursableExpenseForWrite(
      draftReimbursableExpense,
      isCreateMode
    );
    const parsedAmountMST = parseNumber(draftAmountMST);
    const parsedExchangeRate = parseNumber(draftExchangeRate);
    const normalizedCurrencyCode = normalizeExpenseLineCurrencyCode(draftCurrencyCode);
    const normalizedLocalCurrencyCode = normalizeExpenseLineCurrencyCode(localCurrencyCode);
    const normalizedDescription = String(draftDescription || "").trim();

    if (!normalizedDescription) {
      onInvalidDescription?.();
      const validationMessage = indT("ExpenseSheets_Validation_DescriptionRequired", "Description is required.");
      setModalError(validationMessage);
      setStatus(validationMessage);
      return false;
    }

    const hasValidQtyPrice = parsedQty != null && parsedQty > 0 && parsedPrice != null && parsedPrice > 0;
    if (!hasValidQtyPrice) {
      onInvalidAmountQty?.();
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

    if (parsedTypeValue === null) {
      onInvalidType?.();
      return false;
    }

    const isForeignCurrency = isExpenseLineForeignCurrency(normalizedCurrencyCode, normalizedLocalCurrencyCode);
    const hasForeignCurrencySettlement =
      (parsedExchangeRate != null && parsedExchangeRate > 0) ||
      (parsedAmountMST != null && parsedAmountMST > 0);
    if (isForeignCurrency && !hasForeignCurrencySettlement) {
      const validationMessage = indT(
        "ExpenseSheets_Line_Validation_ForeignCurrencyGrossAmount",
        "Foreign currency lines require an exchange rate greater than 0 or a gross amount in company currency."
      );
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
        const lineAmount = Number(parsedQty) * Number(parsedPrice);
        const payloadAmountMST = resolveExpenseLineAmountMSTForCurrencyPayload(
          lineAmount,
          parsedAmountMST,
          normalizedCurrencyCode,
          normalizedLocalCurrencyCode
        );
        const payloadExchangeRate = resolveExpenseLineExchangeRateForCurrency(
          normalizedCurrencyCode,
          normalizedLocalCurrencyCode,
          parsedExchangeRate
        );
        const normalizedProjectId = String(draftProjectId || "").trim();
        const commonLinePayload = {
          transDate: normalizedDate,
          typeValue: parsedTypeValue,
          description: normalizedDescription,
          internacional: parsedInternational ?? line?.internacional ?? false,
          ticket: line?.ticket === true,
          qty: Number(parsedQty),
          price: Number(parsedPrice),
          reimbursableExpense: reimbursableExpenseForWrite,
          currencyCode: normalizedCurrencyCode || undefined,
          amountMST: payloadAmountMST,
          exchRate: payloadExchangeRate,
          indAttachFiles: safeText(line?.indAttachFiles),
        };

        const createLinePayload: ExpenseSheetCreateLineRequest = {
          ...commonLinePayload,
          projId: draftProjectIdProvided ? normalizedProjectId : undefined,
          projIdProvided: draftProjectIdProvided,
        };
        const updateLinePayload: ExpenseSheetLineUpdateRequest = {
          ...commonLinePayload,
          projId: draftProjectIdProvided ? normalizedProjectId : undefined,
          projIdProvided: draftProjectIdProvided,
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
    draftPrice,
    draftDescription,
    draftInternational,
    draftAmountMST,
    draftCurrencyCode,
    draftExchangeRate,
    draftProjectId,
    draftProjectIdProvided,
    draftQty,
    draftTransDate,
    draftTypeValueCode,
    draftReimbursableExpense,
    isCreateMode,
    isEditLocked,
    isEditing,
    line,
    lineId,
    localCurrencyCode,
    onCreateSuccess,
    onInvalidDescription,
    onInvalidAmountQty,
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
        const isTicketOriginLine = line?.ticket === true;

        // MMS - Detach first so AX line deletion cannot cascade into the linked ticket. - 2026.08.04
        if (safeLinkedTicketFileId) {
          const detachResponse = await detachExpenseSheetLineTicket(sheetId, lineId);
          if (!detachResponse.Success) {
            throw new Error(
              detachResponse.Message ||
                indT("ExpenseSheets_Line_Ticket_DetachFailed", "Could not detach the ticket.")
            );
          }

          // MMS - Ticket-origin lines keep the legacy cleanup after the relationship is safely removed. - 2026.08.04
          if (isTicketOriginLine) {
            try {
              const deleteFileResponse = await deleteExpenseSheetTicketFile(safeLinkedTicketFileId);
              if (!deleteFileResponse.Success && !isMissingTicketFileMessage(deleteFileResponse.Message)) {
                throw new Error(
                  deleteFileResponse.Message || indT("ExpenseSheets_Detail_DeleteFailed", "Delete failed.")
                );
              }
            } catch (error) {
              if (!isNotFoundError(error)) {
                throw error;
              }
            }

            try {
              const deleteTicketResponse = await deleteExpenseSheetTicket(safeLinkedTicketFileId);
              if (!deleteTicketResponse.Success) {
                throw new Error(
                  deleteTicketResponse.Message || indT("ExpenseSheets_Detail_DeleteFailed", "Delete failed.")
                );
              }
            } catch (error) {
              if (!isNotFoundError(error)) {
                throw error;
              }
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
    line,
    lineId,
    linkedTicketFileId,
    setBusy,
    setModalError,
    setStatus,
    sheetId,
  ]);

  const handleDetachTicket = useCallback(async () => {
    if (busy || isCreateMode || line?.ticket === true || !safeText(linkedTicketFileId)) return false;
    if (!canEditExpense) {
      showPermissionModal();
      return false;
    }

    const result = await executeExpenseMutation({
      startStatus: indT("ExpenseSheets_Line_Ticket_Detaching", "Detaching ticket..."),
      fallbackErrorMessage: indT("ExpenseSheets_Line_Ticket_DetachFailed", "Could not detach the ticket."),
      setModalError,
      setBusy,
      setStatus,
      action: async () => {
        const response = await detachExpenseSheetLineTicket(sheetId, lineId);
        if (!response.Success) {
          throw new Error(
            response.Message || indT("ExpenseSheets_Line_Ticket_DetachFailed", "Could not detach the ticket.")
          );
        }

        setStatus(indT("ExpenseSheets_Line_Ticket_Detached", "Ticket detached."));
        return true;
      },
    });

    return result.ok;
  }, [
    busy,
    canEditExpense,
    isCreateMode,
    line?.ticket,
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
    handleDetachTicket,
  };
};
