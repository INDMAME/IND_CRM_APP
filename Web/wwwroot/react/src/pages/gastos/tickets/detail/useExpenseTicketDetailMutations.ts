import React, { useCallback } from "react";
import { ApiFetchError } from "../../../../services/apiService.ts";
import { indT } from "../../../../utils/indI18n.ts";
import { showPermissionModal } from "../../../../utils/permissions.ts";
import type { ExpenseSheetTicketUpdateRequest } from "../../expenseTypes.ts";
import { executeExpenseMutation } from "../../hooks/expenseMutationUtils.ts";
import {
  deleteExpenseSheetLine,
  deleteExpenseSheetTicket,
  deleteExpenseSheetTicketFile,
  fetchExpenseSheetDetail,
  updateExpenseSheetTicket,
} from "../../utils/expenseApi.ts";
import { EXPENSE_API_DATE_FORMAT_MESSAGE, toExpenseApiDdMmYyyy } from "../../utils/expenseApiDateUtils.ts";
import { syncExpenseLinkedTicketSheetLine } from "../../utils/expenseLinkedTicketSheetSync.ts";
import { resolveExpenseSheetEditAccess } from "../../utils/expenseSheetEditAccess.ts";
import { clearExpenseTicketSheetSyncState, saveExpenseTicketSheetSyncState } from "../../utils/expenseTicketSheetSyncState.ts";
import { safeText } from "../../utils/expenseUiUtils.ts";

type DeleteLinkedExpenseLineContext = {
  sheetId: string;
  lineRecId: string;
};

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
  draftTicketTime: string;
  draftComentario: string;
  draftUrlFile: string;
  draftFileName: string;
  linkedExpenseSheetId?: string;
  linkedExpenseLineRecId?: string;
  linkedExpenseLineProjectId?: string;
  linkedExpenseLineProjectIdChanged?: boolean;
  deleteLinkedExpenseLineContext?: DeleteLinkedExpenseLineContext | null;
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

const REQUIRED_GASTO_TYPES = new Set<number>([1, 2, 3, 4, 5, 6, 7, 8, 14]);

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
  draftTicketTime,
  draftComentario,
  draftUrlFile,
  draftFileName,
  linkedExpenseSheetId,
  linkedExpenseLineRecId,
  linkedExpenseLineProjectId,
  linkedExpenseLineProjectIdChanged = false,
  deleteLinkedExpenseLineContext,
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
}: UseExpenseTicketDetailMutationsArgs) => {
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

  const runHeaderUpdate = useCallback(
    async ({ syncSheetLine }: { syncSheetLine: boolean }): Promise<boolean> => {
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
      if (parsedGastoType === undefined || !REQUIRED_GASTO_TYPES.has(parsedGastoType)) {
        const message = indT("Tickets_Validation_CategoryRequired", "Category is required.");
        setModalError(message);
        setStatus(message);
        return false;
      }

      const rawTransDate = String(draftTransDate || "").trim();
      const normalizedTransDate = rawTransDate ? toExpenseApiDdMmYyyy(rawTransDate) : "";
      if (rawTransDate && !normalizedTransDate) {
        setModalError(EXPENSE_API_DATE_FORMAT_MESSAGE);
        setStatus(EXPENSE_API_DATE_FORMAT_MESSAGE);
        return false;
      }

      const validatedSheetId = await validateLinkedSheetBeforeMutation();
      if (validatedSheetId === null) {
        return false;
      }

      const payload: ExpenseSheetTicketUpdateRequest = {
        description: normalizedDescription,
        currencyCode: normalizedCurrency,
        transDate: normalizedTransDate || undefined,
        ticketDate: normalizedTransDate || undefined,
        ticketTime: safeText(draftTicketTime) || undefined,
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

          if (syncSheetLine && validatedSheetId) {
            try {
              const syncPayload = {
                fileId,
                sheetId: validatedSheetId,
                lineRecId: safeText(linkedExpenseLineRecId) || undefined,
                ...(linkedExpenseLineProjectIdChanged
                  ? { projectIdOverride: safeText(linkedExpenseLineProjectId) }
                  : {}),
              };
              await syncExpenseLinkedTicketSheetLine(syncPayload);
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

          setStatus(indT("ExpenseSheets_Detail_Updated", "Expense sheet updated"));
          setIsEditing(false);
          return true;
        },
      });

      return result.ok;
    },
    [
      busy,
      canEditTicket,
      draftComentario,
      draftCurrencyCode,
      draftDescription,
      draftFileName,
      draftGastoType,
      draftTicketTime,
      draftTransDate,
      draftUrlFile,
      fileId,
      isEditing,
      linkedExpenseLineProjectId,
      linkedExpenseLineProjectIdChanged,
      linkedExpenseLineRecId,
      onLinkedSheetSyncFailure,
      onLinkedSheetSyncSuccess,
      setBusy,
      setIsEditing,
      setModalError,
      setStatus,
      validateLinkedSheetBeforeMutation,
    ]
  );

  const handleUpdate = useCallback(async () => {
    return runHeaderUpdate({
      syncSheetLine: true,
    });
  }, [runHeaderUpdate]);

  const handlePersistHeaderDraft = useCallback(async () => {
    return runHeaderUpdate({
      syncSheetLine: linkedExpenseLineProjectIdChanged,
    });
  }, [linkedExpenseLineProjectIdChanged, runHeaderUpdate]);

  const resolveLinkedExpenseLineContext = useCallback(async (): Promise<DeleteLinkedExpenseLineContext | null> => {
    if (deleteLinkedExpenseLineContext) {
      return deleteLinkedExpenseLineContext;
    }

    const safeSheetId = safeText(linkedExpenseSheetId);
    if (!safeSheetId) {
      return null;
    }

    const response = await fetchExpenseSheetDetail(safeSheetId, {
      suppressPermissionModal: true,
    });
    const items = Array.isArray(response.Items) ? response.Items : [];
    const detail = items.find((entry) => entry && typeof entry === "object") || null;
    const lines = Array.isArray(detail?.Lines) ? detail.Lines : [];
    const matchingLine = lines.find((line) => safeText(line?.FileId) === fileId);
    const lineRecId = safeText(matchingLine?.RecId);

    if (!lineRecId) {
      return null;
    }

    return {
      sheetId: safeSheetId,
      lineRecId,
    };
  }, [deleteLinkedExpenseLineContext, fileId, linkedExpenseSheetId]);

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
      startStatus: indT("ExpenseSheets_Detail_Deleting", "Deleting expense sheet..."),
      fallbackErrorMessage: indT("ExpenseSheets_Detail_DeleteError", "Delete error."),
      setModalError,
      setBusy,
      setStatus,
      action: async () => {
        const linkedLineContext = await resolveLinkedExpenseLineContext();

        try {
          const deleteFileResponse = await deleteExpenseSheetTicketFile(fileId, {
            suppressPermissionModal: true,
          });
          if (!deleteFileResponse.Success && !isMissingTicketFileMessage(deleteFileResponse.Message)) {
            throw new Error(deleteFileResponse.Message || indT("ExpenseSheets_Detail_DeleteFailed", "Delete failed."));
          }
        } catch (error) {
          if (!isNotFoundError(error)) {
            throw error;
          }
        }

        const response = await deleteExpenseSheetTicket(fileId);
        if (!response.Success) {
          throw new Error(response.Message || indT("ExpenseSheets_Detail_DeleteFailed", "Delete failed."));
        }

        if (linkedLineContext) {
          try {
            const lineDeleteResponse = await deleteExpenseSheetLine(
              linkedLineContext.sheetId,
              linkedLineContext.lineRecId,
              {
                suppressPermissionModal: true,
              }
            );

            if (!lineDeleteResponse.Success) {
              throw new Error(lineDeleteResponse.Message || indT("ExpenseSheets_Detail_DeleteFailed", "Delete failed."));
            }
          } catch (error) {
            // The linked line can be auto-removed by backend cascade; keep flow successful in that case.
            if (!isNotFoundError(error)) {
              throw error;
            }
          }
        }

        setStatus(indT("ExpenseSheets_Detail_Deleted", "Expense sheet deleted"));
        if (validatedSheetId) {
          clearExpenseTicketSheetSyncState();
          onLinkedSheetSyncSuccess?.();
        }
        return true;
      },
    });

    return result.ok;
  }, [
    busy,
    canDeleteTicket,
    fileId,
    onLinkedSheetSyncSuccess,
    resolveLinkedExpenseLineContext,
    setBusy,
    setModalError,
    setStatus,
    validateLinkedSheetBeforeMutation,
  ]);

  return {
    handleUpdate,
    handlePersistHeaderDraft,
    handleDelete,
  };
};
