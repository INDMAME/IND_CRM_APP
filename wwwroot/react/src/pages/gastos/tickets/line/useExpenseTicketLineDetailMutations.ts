import React, { useCallback } from "react";
import { indT } from "../../../../utils/indI18n.ts";
import { showPermissionModal } from "../../../../utils/permissions.ts";
import { executeExpenseMutation, parseDecimalInput } from "../../hooks/expenseMutationUtils.ts";
import { syncExpenseLinkedTicketSheetLine } from "../../utils/expenseLinkedTicketSheetSync.ts";
import { resolveExpenseSheetEditAccess } from "../../utils/expenseSheetEditAccess.ts";
import { clearExpenseTicketSheetSyncState, saveExpenseTicketSheetSyncState } from "../../utils/expenseTicketSheetSyncState.ts";
import { createExpenseSheetTicketLine, deleteExpenseSheetTicketLine, updateExpenseSheetTicketLine } from "../../utils/expenseApi.ts";
import { isValidTicketLineAmount, resolveTicketLineAmount } from "../../utils/expenseTicketLineAmount.ts";
import { safeText } from "../../utils/expenseUiUtils.ts";

type UseExpenseTicketLineDetailMutationsArgs = {
  busy: boolean;
  isEditing: boolean;
  isCreateMode: boolean;
  canCreateTicket: boolean;
  canEditTicket: boolean;
  canDeleteTicket: boolean;
  fileId: string;
  lineRecId: string;
  draftDescription: string;
  draftQty: string;
  draftPrice: string;
  draftTaxPercent: string;
  linkedExpenseSheetId?: string;
  allowSelfManagement: boolean;
  canManageOtherUsers: boolean;
  currentAxUserId: string;
  currentCrmUserId: string;
  selectedManagedUserId: string;
  skipLinkedSheetSyncOnCreate?: boolean;
  onLinkedSheetSyncFailure?: (message: string) => void;
  onLinkedSheetSyncSuccess?: () => void;
  setModalError: React.Dispatch<React.SetStateAction<string>>;
  setBusy: React.Dispatch<React.SetStateAction<boolean>>;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

// Encapsulates update and delete mutations for ticket line detail.
export const useExpenseTicketLineDetailMutations = ({
  busy,
  isEditing,
  isCreateMode,
  canCreateTicket,
  canEditTicket,
  canDeleteTicket,
  fileId,
  lineRecId,
  draftDescription,
  draftQty,
  draftPrice,
  draftTaxPercent,
  linkedExpenseSheetId,
  allowSelfManagement,
  canManageOtherUsers,
  currentAxUserId,
  currentCrmUserId,
  selectedManagedUserId,
  skipLinkedSheetSyncOnCreate = false,
  onLinkedSheetSyncFailure,
  onLinkedSheetSyncSuccess,
  setModalError,
  setBusy,
  setStatus,
  setIsEditing,
}: UseExpenseTicketLineDetailMutationsArgs) => {
  const validateLinkedSheetBeforeMutation = useCallback(async (): Promise<string | null> => {
    const safeSheetId = safeText(linkedExpenseSheetId);
    if (!safeSheetId) {
      return "";
    }

    const accessResult = await resolveExpenseSheetEditAccess({
      sheetId: safeSheetId,
      allowSelfManagement,
      canManageOtherUsers,
      currentAxUserId,
      currentCrmUserId,
      selectedManagedUserId,
      suppressPermissionModal: true,
    });
    if (!accessResult.isLocked) {
      return safeSheetId;
    }

    const message =
      safeText(accessResult.blockedMessage) ||
      indT("ExpenseSheets_Detail_ReadOnlyByStatus", "No se puede editar esta hoja de gastos en el estado actual.");
    setModalError(message);
    setStatus(message);
    return null;
  }, [
    allowSelfManagement,
    canManageOtherUsers,
    currentAxUserId,
    currentCrmUserId,
    linkedExpenseSheetId,
    selectedManagedUserId,
    setModalError,
    setStatus,
  ]);

  const handleUpdate = useCallback(async () => {
    if (busy || !isEditing) return false;
    const canProceed = isCreateMode ? canCreateTicket : canEditTicket;
    if (!canProceed) {
      showPermissionModal();
      return false;
    }

    const normalizedDescription = String(draftDescription || "").trim();
    const parsedQty = parseDecimalInput(draftQty);
    const parsedPrice = parseDecimalInput(draftPrice);
    const rawTaxPercent = safeText(draftTaxPercent);
    const parsedTaxPercent = rawTaxPercent ? parseDecimalInput(rawTaxPercent) : null;
    const parsedLine = {
      qty: parsedQty,
      price: parsedPrice,
    };
    const lineAmount = resolveTicketLineAmount(parsedLine);

    if (!normalizedDescription || !isValidTicketLineAmount(parsedLine) || lineAmount === null) {
      const message = indT(
        "ExpenseTickets_Line_Validation_AmountQty",
        "La cantidad no puede ser negativa, el precio no puede ser 0 y la cantidad 0 solo se permite en descuentos negativos."
      );
      setModalError(message);
      setStatus(message);
      return false;
    }

    if (rawTaxPercent && (parsedTaxPercent === null || parsedTaxPercent < 0)) {
      const message = indT("ExpenseTickets_Line_Validation_TaxPercent", "El IVA no puede ser negativo.");
      setModalError(message);
      setStatus(message);
      return false;
    }

    const validatedSheetId = await validateLinkedSheetBeforeMutation();
    if (validatedSheetId === null) {
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
        const payload = {
          description: normalizedDescription,
          qty: Number(parsedQty),
          price: Number(parsedPrice),
          totalAmount: Number(lineAmount),
          ...(parsedTaxPercent !== null ? { taxPercent: Number(parsedTaxPercent) } : {}),
        };
        const response = isCreateMode
          ? await createExpenseSheetTicketLine(fileId, payload)
          : await updateExpenseSheetTicketLine(fileId, lineRecId, payload);

        if (!response.Success) {
          throw new Error(response.Message || indT("ExpenseSheets_Detail_UpdateFailed", "Update failed."));
        }

        if (validatedSheetId && !(isCreateMode && skipLinkedSheetSyncOnCreate)) {
          try {
            await syncExpenseLinkedTicketSheetLine({
              fileId,
              sheetId: validatedSheetId,
            });
            clearExpenseTicketSheetSyncState();
            onLinkedSheetSyncSuccess?.();
          } catch (error) {
            const message =
              error instanceof Error
                ? error.message
                : indT(
                    "ExpenseTickets_SheetSync_RetryRequired",
                    "Ticket data changed, but we could not sync the expense line. Save again before leaving."
                  );
            saveExpenseTicketSheetSyncState({
              fileId,
              sheetId: validatedSheetId,
              message,
            });
            onLinkedSheetSyncFailure?.(message);
            if (!isCreateMode) {
              throw new Error(message);
            }
          }
        } else if (isCreateMode) {
          clearExpenseTicketSheetSyncState();
          onLinkedSheetSyncSuccess?.();
        }

        setStatus(
          isCreateMode
            ? indT("ExpenseSheets_Line_Detail_Created", "Expense line created")
            : indT("ExpenseSheets_Line_Detail_Updated", "Expense line updated")
        );
        if (!isCreateMode) {
          setIsEditing(false);
        }
        return true;
      },
    });

    return result.ok;
  }, [
    busy,
    canCreateTicket,
    canEditTicket,
    draftDescription,
    draftPrice,
    draftQty,
    draftTaxPercent,
    fileId,
    isCreateMode,
    isEditing,
    lineRecId,
    onLinkedSheetSyncFailure,
    onLinkedSheetSyncSuccess,
    setBusy,
    setIsEditing,
    setModalError,
    setStatus,
    skipLinkedSheetSyncOnCreate,
    validateLinkedSheetBeforeMutation,
  ]);

  const handleDelete = useCallback(async () => {
    if (busy) return false;
    if (!canDeleteTicket) {
      showPermissionModal();
      return false;
    }

    const validatedSheetId = await validateLinkedSheetBeforeMutation();
    if (validatedSheetId === null) {
      return false;
    }

    const result = await executeExpenseMutation({
      startStatus: indT("ExpenseSheets_Line_Detail_Deleting", "Deleting expense line..."),
      fallbackErrorMessage: indT("ExpenseSheets_Detail_DeleteError", "Delete error."),
      setModalError,
      setBusy,
      setStatus,
      action: async () => {
        const response = await deleteExpenseSheetTicketLine(fileId, lineRecId);
        if (!response.Success) {
          throw new Error(response.Message || indT("ExpenseSheets_Detail_DeleteFailed", "Delete failed."));
        }

        if (validatedSheetId) {
          try {
            await syncExpenseLinkedTicketSheetLine({
              fileId,
              sheetId: validatedSheetId,
            });
            clearExpenseTicketSheetSyncState();
            onLinkedSheetSyncSuccess?.();
          } catch (error) {
            const message =
              error instanceof Error
                ? error.message
                : indT(
                    "ExpenseTickets_SheetSync_RetryRequired",
                    "Ticket data changed, but we could not sync the expense line. Save again before leaving."
                  );
            saveExpenseTicketSheetSyncState({
              fileId,
              sheetId: validatedSheetId,
              message,
            });
            onLinkedSheetSyncFailure?.(message);
            setStatus(message);
          }
        }

        setStatus(indT("ExpenseSheets_Line_Detail_Deleted", "Expense line deleted"));
        return true;
      },
    });

    return result.ok;
  }, [
    busy,
    canDeleteTicket,
    fileId,
    lineRecId,
    onLinkedSheetSyncFailure,
    onLinkedSheetSyncSuccess,
    setBusy,
    setModalError,
    setStatus,
    validateLinkedSheetBeforeMutation,
  ]);

  return {
    handleUpdate,
    handleDelete,
  };
};
