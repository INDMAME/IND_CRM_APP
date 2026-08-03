import React from "react";
import { createPortal } from "react-dom";
import Spinner from "./Spinner.tsx";

type ConfirmModalProps = {
  open: boolean;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  loadingText: string;
  showCancel?: boolean;
  showConfirm?: boolean;
  busy?: boolean;
  error?: string;
  status?: string;
  children?: React.ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
};

// Dumb confirm modal with optional spinner and status text.
export default function ConfirmModal({
  open,
  title,
  message,
  confirmText,
  cancelText,
  loadingText,
  showCancel = true,
  showConfirm = true,
  busy = false,
  error = "",
  status = "",
  children,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!open) return null;

  const showInfo = busy || !!error;
  const infoText = busy ? (status || loadingText) : error;

  return createPortal(
    <div className="fixed inset-0 z-600000 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-sm rounded-[var(--radius-xl)] bg-white shadow-xl border border-slate-200 p-5 space-y-4">
        <div className="text-lg font-semibold text-slate-900">{title}</div>
        <div className="text-sm text-slate-700 whitespace-pre-line">{message}</div>
        {children}
        {showInfo && (
          <div className="flex items-center gap-2 text-sm text-slate-600">
            {busy && <Spinner size="h-4 w-4" />}
            {busy ? (
              <span>{infoText}</span>
            ) : (
              <span
                className="text-rose-700"
                data-ind-action-feedback="modal"
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
                tabIndex={-1}
              >
                {infoText}
              </span>
            )}
          </div>
        )}
        <div className="flex justify-end gap-2 pt-2">
          {showCancel && (
            <button
              type="button"
              className="px-4 py-2 rounded-[var(--radius-xl)] border border-slate-300 text-slate-700 hover:border-primary hover:text-primary transition"
              onClick={onCancel}
              disabled={busy}
            >
              {cancelText}
            </button>
          )}
          {showConfirm && (
            <button
              type="button"
              className="px-4 py-2 rounded-[var(--radius-xl)] bg-primary text-white hover:bg-primary/90 transition"
              onClick={onConfirm}
              disabled={busy}
            >
              {busy ? loadingText : confirmText}
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
