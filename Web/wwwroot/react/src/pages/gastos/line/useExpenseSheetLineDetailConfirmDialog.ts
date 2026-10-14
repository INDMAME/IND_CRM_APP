import { resolveActionError, type ActionError } from "../../../utils/actionError.ts";
import React, { useCallback } from "react";
import { useConfirmDialog } from "../../../hooks/useConfirmDialog.ts";
import { indT } from "../../../utils/indI18n.ts";

type UseExpenseSheetLineDetailConfirmDialogArgs = {
  busy: boolean;
  modalError: ActionError;
  setModalError: React.Dispatch<React.SetStateAction<ActionError>>;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
};

// Keeps line detail confirm dialog wiring outside the page component.
export const useExpenseSheetLineDetailConfirmDialog = ({
  busy,
  modalError,
  setModalError,
  setStatus,
}: UseExpenseSheetLineDetailConfirmDialogArgs) => {
  const { modal, openConfirm, closeConfirm, handleConfirm } = useConfirmDialog({
    defaultConfirmText: indT("Confirm_Yes", "OK"),
    defaultCancelText: indT("Confirm_No", "Cancel"),
  });

  const handleModalConfirm = useCallback(async () => {
    setModalError("");
    await handleConfirm({
      busy,
      onError: (msg, error) => {
        const feedback = resolveActionError(error, msg);
        setModalError(feedback);
        setStatus(feedback.message);
      },
    });
  }, [busy, handleConfirm, setModalError, setStatus]);

  const modalLoadingText = indT("Common_Loading", "Loading");
  const modalCancelText = modal.cancelText || indT("Confirm_No", "Cancel");
  const modalConfirmText = busy
    ? modalLoadingText
    : !busy && modalError
      ? indT("Common_OK", "OK")
      : modal.confirmText || indT("Confirm_Yes", "OK");

  const handleModalButtonConfirm = useCallback(() => {
    if (!busy && modalError) {
      closeConfirm();
      return;
    }

    void handleModalConfirm();
  }, [busy, closeConfirm, handleModalConfirm, modalError]);

  return {
    modal,
    openConfirm,
    closeConfirm,
    modalLoadingText,
    modalCancelText,
    modalConfirmText,
    handleModalButtonConfirm,
  };
};
