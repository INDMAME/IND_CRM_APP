import React, { useCallback } from "react";
import { indT } from "../../../../utils/indI18n.ts";
import { showPermissionModal } from "../../../../utils/permissions.ts";
import type { ExpenseSheetTicketUpdateRequest } from "../../expenseTypes.ts";
import { executeExpenseMutation } from "../../hooks/expenseMutationUtils.ts";
import { deleteExpenseSheetTicket, updateExpenseSheetTicket } from "../../utils/expenseApi.ts";

type UseExpenseTicketDetailMutationsArgs = {
  busy: boolean;
  isEditing: boolean;
  canEditTicket: boolean;
  canDeleteTicket: boolean;
  fileId: string;
  draftDescription: string;
  draftGastoType: string;
  draftCurrencyCode: string;
  draftTransDate: string;
  draftComentario: string;
  draftUrlFile: string;
  draftFileName: string;
  setModalError: React.Dispatch<React.SetStateAction<string>>;
  setBusy: React.Dispatch<React.SetStateAction<boolean>>;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

const parseOptionalInteger = (raw: string): number | undefined => {
  const value = String(raw || "").trim();
  if (!value) return undefined;
  const parsed = Number.parseInt(value, 10);
  return Number.isInteger(parsed) ? parsed : undefined;
};

// Tries to infer a safe extension for update payload from file name or URL.
const resolveTicketFileExtension = (fileName: string, urlFile: string): string | undefined => {
  const source = String(fileName || "").trim() || String(urlFile || "").trim();
  const match = source.match(/\.([a-zA-Z0-9]{1,10})(?:$|[?#])/);
  if (!match || !match[1]) return undefined;
  return match[1].toLowerCase();
};

// Encapsulates update and delete mutations for ticket header detail.
export const useExpenseTicketDetailMutations = ({
  busy,
  isEditing,
  canEditTicket,
  canDeleteTicket,
  fileId,
  draftDescription,
  draftGastoType,
  draftCurrencyCode,
  draftTransDate,
  draftComentario,
  draftUrlFile,
  draftFileName,
  setModalError,
  setBusy,
  setStatus,
  setIsEditing,
}: UseExpenseTicketDetailMutationsArgs) => {
  const handleUpdate = useCallback(async () => {
    if (busy || !isEditing) return false;
    if (!canEditTicket) {
      showPermissionModal();
      return false;
    }

    const normalizedDescription = String(draftDescription || "").trim();
    if (!normalizedDescription) {
      const message = indT("ExpenseSheets_Validation_DescriptionRequired", "Description is required.");
      setModalError(message);
      setStatus(message);
      return false;
    }

    const normalizedCurrency = String(draftCurrencyCode || "").trim().toUpperCase();
    if (!normalizedCurrency) {
      const message = indT("ExpenseSheets_Validation_CurrencyRequired", "Currency is required.");
      setModalError(message);
      setStatus(message);
      return false;
    }

    const parsedGastoType = parseOptionalInteger(draftGastoType);
    if (parsedGastoType !== undefined && ![0, 1, 2, 3, 4, 5, 6, 7, 8, 14].includes(parsedGastoType)) {
      const message = indT("Api_RequestFailed", "Request failed.");
      setModalError(message);
      setStatus(message);
      return false;
    }

    const payload: ExpenseSheetTicketUpdateRequest = {
      description: normalizedDescription,
      currencyCode: normalizedCurrency,
      transDate: String(draftTransDate || "").trim() || undefined,
      comentario: String(draftComentario || "").trim() || undefined,
      urlFile: String(draftUrlFile || "").trim() || undefined,
      fileName: String(draftFileName || "").trim() || undefined,
      fileExtension: resolveTicketFileExtension(draftFileName, draftUrlFile),
      gastoType: parsedGastoType as ExpenseSheetTicketUpdateRequest["gastoType"],
    };

    const result = await executeExpenseMutation({
      startStatus: indT("ExpenseSheets_Detail_Updating", "Updating expense sheet..."),
      fallbackErrorMessage: indT("ExpenseSheets_Detail_UpdateError", "Update error."),
      setModalError,
      setBusy,
      setStatus,
      action: async () => {
        const response = await updateExpenseSheetTicket(fileId, payload);
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
    canEditTicket,
    draftComentario,
    draftCurrencyCode,
    draftDescription,
    draftFileName,
    draftGastoType,
    draftTransDate,
    draftUrlFile,
    fileId,
    isEditing,
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
      startStatus: indT("ExpenseSheets_Detail_Deleting", "Deleting expense sheet..."),
      fallbackErrorMessage: indT("ExpenseSheets_Detail_DeleteError", "Delete error."),
      setModalError,
      setBusy,
      setStatus,
      action: async () => {
        const response = await deleteExpenseSheetTicket(fileId);
        if (!response.Success) {
          throw new Error(response.Message || indT("ExpenseSheets_Detail_DeleteFailed", "Delete failed."));
        }

        setStatus(indT("ExpenseSheets_Detail_Deleted", "Expense sheet deleted"));
        return true;
      },
    });

    return result.ok;
  }, [busy, canDeleteTicket, fileId, setBusy, setModalError, setStatus]);

  return {
    handleUpdate,
    handleDelete,
  };
};
