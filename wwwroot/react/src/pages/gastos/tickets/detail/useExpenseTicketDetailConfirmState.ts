import { useCallback } from "react";
import { useConfirmDialog } from "../../../../hooks/useConfirmDialog.ts";
import { indT } from "../../../../utils/indI18n.ts";

type UseExpenseTicketDetailConfirmStateArgs = {
  busy: boolean;
  modalError: string;
  setModalError: (value: string) => void;
  setStatus: (value: string) => void;
};

// Encapsulates confirm modal state so the page container stays focused on flow wiring.
export const useExpenseTicketDetailConfirmState = ({
  busy,
  modalError,
  setModalError,
  setStatus,
}: UseExpenseTicketDetailConfirmStateArgs) => {
  const { modal, openConfirm, closeConfirm, handleConfirm } = useConfirmDialog({
    defaultConfirmText: indT("Confirm_Yes", "OK"),
    defaultCancelText: indT("Confirm_No", "Cancel"),
  });

  const handleModalConfirm = useCallback(async () => {
    setModalError("");
    await handleConfirm({
      busy,
      onError: (msg) => {
        setModalError(msg);
        setStatus(msg);
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
