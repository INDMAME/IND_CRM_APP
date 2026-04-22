import React, { useCallback } from "react";
import { indT } from "../../../../utils/indI18n.ts";
import { showPermissionModal } from "../../../../utils/permissions.ts";
import { executeExpenseMutation, parseDecimalInput } from "../../hooks/expenseMutationUtils.ts";
import { syncExpenseLinkedTicketSheetLine } from "../../utils/expenseLinkedTicketSheetSync.ts";
import { resolveExpenseSheetEditAccess } from "../../utils/expenseSheetEditAccess.ts";
import { clearExpenseTicketSheetSyncState, saveExpenseTicketSheetSyncState } from "../../utils/expenseTicketSheetSyncState.ts";
import { deleteExpenseSheetTicketLine, updateExpenseSheetTicketLine } from "../../utils/expenseApi.ts";
import { safeText } from "../../utils/expenseUiUtils.ts";

type UseExpenseTicketLineDetailMutationsArgs = {
  busy: boolean;
  isEditing: boolean;
  canEditTicket: boolean;
  canDeleteTicket: boolean;
  fileId: string;
  lineRecId: string;
  draftDescription: string;
  draftQty: string;
  draftPrice: string;
  linkedExpenseSheetId?: string;
  allowSelfManagement: boolean;
  canManageOtherUsers: boolean;
  currentAxUserId: string;
  currentCrmUserId: string;
  selectedManagedUserId: string;
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
  canEditTicket,
  canDeleteTicket,
  fileId,
  lineRecId,
  draftDescription,
  draftQty,
  draftPrice,
  linkedExpenseSheetId,
  allowSelfManagement,
  canManageOtherUsers,
  currentAxUserId,
  currentCrmUserId,
  selectedManagedUserId,
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
    if (!canEditTicket) {
      showPermissionModal();
      return false;
    }

    const normalizedDescription = String(draftDescription || "").trim();
    const parsedQty = parseDecimalInput(draftQty);
    const parsedPrice = parseDecimalInput(draftPrice);

    if (!normalizedDescription || parsedQty === null || parsedQty <= 0 || parsedPrice === null || parsedPrice <= 0) {
      const message = indT("ExpenseSheets_Line_Validation_AmountQty", "Quantity and price must be greater than 0.");
      setModalError(message);
      setStatus(message);
      return false;
    }

    const validatedSheetId = await validateLinkedSheetBeforeMutation();
    if (validatedSheetId === null) {
      return false;
    }

    const result = await executeExpenseMutation({
      startStatus: indT("ExpenseSheets_Line_Detail_Updating", "Updating expense line..."),
      fallbackErrorMessage: indT("ExpenseSheets_Detail_UpdateError", "Update error."),
      setModalError,
      setBusy,
      setStatus,
      action: async () => {
        const response = await updateExpenseSheetTicketLine(fileId, lineRecId, {
          description: normalizedDescription,
          qty: Number(parsedQty),
          price: Number(parsedPrice),
          totalAmount: Number(parsedQty) * Number(parsedPrice),
        });

        if (!response.Success) {
          throw new Error(response.Message || indT("ExpenseSheets_Detail_UpdateFailed", "Update failed."));
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
            throw new Error(message);
          }
        }

        setStatus(indT("ExpenseSheets_Line_Detail_Updated", "Expense line updated"));
        setIsEditing(false);
        return true;
      },
    });

    return result.ok;
  }, [
    busy,
    canEditTicket,
    draftDescription,
    draftPrice,
    draftQty,
    fileId,
    isEditing,
    lineRecId,
    onLinkedSheetSyncFailure,
    onLinkedSheetSyncSuccess,
    setBusy,
    setIsEditing,
    setModalError,
    setStatus,
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
