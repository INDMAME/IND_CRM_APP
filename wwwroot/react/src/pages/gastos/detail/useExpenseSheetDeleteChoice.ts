import { useCallback, useRef, useState } from "react";
import { indT } from "../../../utils/indI18n.ts";

type DeleteChoiceArgs = {
  busy: boolean;
  hasLinkedTickets: boolean;
  onDelete: (deleteTickets: boolean) => Promise<boolean>;
  onSuccess: () => void;
  openConfirm: (options: {
    title: string;
    message: string;
    confirmText: string;
    cancelText: string;
    onConfirm: () => Promise<boolean>;
  }) => void;
};

// Asks about ticket cleanup after sheet deletion is confirmed, before any mutation starts.
export const useExpenseSheetDeleteChoice = ({ busy, hasLinkedTickets, onDelete, onSuccess, openConfirm }: DeleteChoiceArgs) => {
  const [choosingTickets, setChoosingTickets] = useState(false);
  const inFlightRef = useRef(false);

  const finishDeletion = useCallback(async (deleteTickets: boolean): Promise<boolean> => {
    if (busy || inFlightRef.current) return false;
    inFlightRef.current = true;
    try {
      const deleted = await onDelete(deleteTickets);
      if (deleted) {
        setChoosingTickets(false);
        onSuccess();
      }
      return deleted;
    } finally {
      inFlightRef.current = false;
    }
  }, [busy, onDelete, onSuccess]);

  const requestDeletion = useCallback(async (): Promise<boolean> => {
    if (busy) return false;
    if (!hasLinkedTickets) return onDelete(false);
    setChoosingTickets(true);
    openConfirm({
      title: indT("ExpenseSheets_DeleteTickets_Title", "Delete linked tickets too?"),
      message: indT("ExpenseSheets_DeleteTickets_Body", "The expense sheet and all its lines will be deleted. Keep the tickets unlinked, or delete the tickets and their attachments too."),
      confirmText: indT("ExpenseSheets_DeleteTickets_Delete", "Delete tickets"),
      cancelText: indT("ExpenseSheets_DeleteTickets_Keep", "Keep tickets"),
      onConfirm: () => finishDeletion(true),
    });
    // Keep the replacement dialog open when the first confirmation callback finishes.
    return false;
  }, [busy, finishDeletion, hasLinkedTickets, onDelete, openConfirm]);

  const preserveTickets = useCallback(() => finishDeletion(false), [finishDeletion]);
  return { choosingTickets, requestDeletion, preserveTickets };
};
