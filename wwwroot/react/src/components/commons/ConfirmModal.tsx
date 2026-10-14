import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import Spinner from "./Spinner.tsx";
import { getActionErrorMark, resolveActionError, type ActionError } from "../../utils/actionError.ts";
import { indT } from "../../utils/indI18n.ts";
import { flashActionMark } from "../../utils/visitasHistory.ts";

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
  error?: ActionError;
  errorTitle?: string;
  traceId?: string;
  status?: string;
  children?: React.ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
};

// Keeps the loading and error presentation separate from confirmation actions.
const ModalFeedback = ({ busy, text }: { busy: boolean; text: string }) => {
  if (!busy && !text) return null;
  return <div className="flex items-center gap-2 text-sm text-slate-600">
    {busy && <Spinner size="h-4 w-4" />}
    {busy ? <span>{text}</span> : <span className="text-rose-700" data-ind-action-feedback="modal"
      role="alert" aria-live="assertive" aria-atomic="true" tabIndex={-1}>{text}</span>}
  </div>;
};

// Makes the exact server trace selectable at the bottom of the popup.
const ErrorTraceFooter = ({ traceId }: { traceId?: string }) => {
  if (!traceId) return null;
  return <div className="border-t border-slate-200 pt-3 text-xs text-slate-500" data-ind-error-trace="true">
    <span>{indT("Common_TraceId", "Trace ID")}: </span>
    <code className="select-text break-all">{traceId}</code>
  </div>;
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
  errorTitle,
  traceId = "",
  status = "",
  children,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  const feedback = resolveActionError(error);
  useEffect(() => {
    if (open && !busy && feedback.message) flashActionMark(getActionErrorMark(error), 1500);
  }, [open, busy, error, feedback.message]);
  if (!open) return null;
  const hasError = !busy && !!feedback.message;
  const warning = getActionErrorMark(error) === "warningProcess";
  const failureTitle = warning ? indT("Common_Warning_Title", "Please review this information") : indT("Common_Error_Title", "Unable to complete the operation");
  const displayedTitle = hasError ? errorTitle || failureTitle : title;
  const infoText = busy ? (status || loadingText) : feedback.message;
  const errorTraceId = hasError ? feedback.traceId || resolveActionError({ traceId }).traceId : "";

  return createPortal(
    <dialog open aria-modal="true" aria-label={displayedTitle}
      className="fixed inset-0 z-600000 m-0 flex h-full w-full max-h-none max-w-none items-center justify-center border-0 bg-black/40 p-0 px-4">
      <div className="w-full max-w-sm rounded-[var(--radius-xl)] bg-white shadow-xl border border-slate-200 p-5 space-y-4">
        <div className="text-lg font-semibold text-slate-900">{displayedTitle}</div>
        {!hasError && <div className="text-sm text-slate-700 whitespace-pre-line">{message}</div>}
        {children}
        <ModalFeedback busy={busy} text={infoText} />
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
        <ErrorTraceFooter traceId={errorTraceId} />
      </div>
    </dialog>,
    document.body
  );
}
