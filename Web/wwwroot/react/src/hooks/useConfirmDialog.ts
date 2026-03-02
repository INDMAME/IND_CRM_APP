import { useCallback, useRef, useState } from "react";
import { indT } from "../utils/indI18n.ts";

type ConfirmModalState = {
  open: boolean;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  showCancel: boolean;
  showConfirm: boolean;
  onConfirm: (() => Promise<boolean | void> | boolean | void) | null;
};

type ConfirmOpenOptions = Partial<Omit<ConfirmModalState, "open" | "onConfirm">> & {
  onConfirm?: (() => Promise<boolean | void> | boolean | void) | null;
};

type UseConfirmDialogArgs = {
  defaultConfirmText: string;
  defaultCancelText: string;
};

type HandleConfirmArgs = {
  busy: boolean;
  onError: (message: string) => void;
  defaultErrorMessage?: string;
};

// Shared confirm dialog state and confirm handler.
export const useConfirmDialog = ({ defaultConfirmText, defaultCancelText }: UseConfirmDialogArgs) => {
  const [modal, setModal] = useState<ConfirmModalState>({
    open: false,
    title: "",
    message: "",
    confirmText: defaultConfirmText,
    cancelText: defaultCancelText,
    showCancel: true,
    showConfirm: true,
    onConfirm: null,
  });

  const confirmInFlightRef = useRef(false);

  const openConfirm = useCallback(
    (opts: ConfirmOpenOptions) => {
      setModal({
        open: true,
        title: opts?.title || "",
        message: opts?.message || "",
        confirmText: opts?.confirmText || defaultConfirmText,
        cancelText: opts?.cancelText || defaultCancelText,
        showCancel: opts?.showCancel !== false,
        showConfirm: opts?.showConfirm !== false,
        onConfirm: opts?.onConfirm || null,
      });
    },
    [defaultCancelText, defaultConfirmText]
  );

  const closeConfirm = useCallback(() => {
    setModal((prev) => ({ ...prev, open: false }));
  }, []);

  const handleConfirm = useCallback(
    async ({ busy, onError, defaultErrorMessage }: HandleConfirmArgs) => {
      if (busy) return;
      const cb = modal.onConfirm;
      if (typeof cb !== "function") {
        closeConfirm();
        return;
      }
      if (confirmInFlightRef.current) return;
      confirmInFlightRef.current = true;
      try {
        const result = await cb();
        if (result !== false) {
          closeConfirm();
        }
      } catch (err: any) {
        const msg =
          err?.message ||
          defaultErrorMessage ||
          indT("Api_RequestFailed", "Api_RequestFailed");
        onError(msg);
      } finally {
        confirmInFlightRef.current = false;
      }
    },
    [closeConfirm, modal.onConfirm]
  );

  return {
    modal,
    openConfirm,
    closeConfirm,
    handleConfirm,
  };
};
