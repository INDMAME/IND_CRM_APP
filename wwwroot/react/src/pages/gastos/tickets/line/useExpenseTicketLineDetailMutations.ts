import React, { useCallback } from "react";
import { indT } from "../../../../utils/indI18n.ts";
import { showPermissionModal } from "../../../../utils/permissions.ts";
import { executeExpenseMutation, parseDecimalInput } from "../../hooks/expenseMutationUtils.ts";
import { deleteExpenseSheetTicketLine, updateExpenseSheetTicketLine } from "../../utils/expenseApi.ts";

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
  setModalError,
  setBusy,
  setStatus,
  setIsEditing,
}: UseExpenseTicketLineDetailMutationsArgs) => {
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
    setBusy,
    setIsEditing,
    setModalError,
    setStatus,
  ]);

  const handleDelete = useCallback(async () => {
    if (busy) return false;
    if (!canDeleteTicket) {
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
        const response = await deleteExpenseSheetTicketLine(fileId, lineRecId);
        if (!response.Success) {
          throw new Error(response.Message || indT("ExpenseSheets_Detail_DeleteFailed", "Delete failed."));
        }

        setStatus(indT("ExpenseSheets_Line_Detail_Deleted", "Expense line deleted"));
        return true;
      },
    });

    return result.ok;
  }, [busy, canDeleteTicket, fileId, lineRecId, setBusy, setModalError, setStatus]);

  return {
    handleUpdate,
    handleDelete,
  };
};
