import React, { useEffect, useRef, useSyncExternalStore } from "react";
import ConfirmModal from "./ConfirmModal.tsx";
import { closeApiError, getApiError, subscribeApiErrors } from "../../services/apiErrorFeedback.ts";

type ApiErrorDialogProps = { title: string; closeLabel: string; codeLabel: string; traceLabel: string };

// Present API failures consistently, keeping log identifiers below the user message.
export default function ApiErrorDialog({ title, closeLabel, codeLabel, traceLabel }: ApiErrorDialogProps) {
  const error = useSyncExternalStore(subscribeApiErrors, getApiError, getApiError);
  const diagnosticsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!error) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const dialog = diagnosticsRef.current?.closest('[role="dialog"]');
    const button = dialog?.querySelector<HTMLButtonElement>("button");
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    button?.focus();
    // This informational popup has one action, so Tab stays on its close button.
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); event.stopImmediatePropagation(); closeApiError(); }
      if (event.key === "Tab") { event.preventDefault(); button?.focus(); }
    };
    document.addEventListener("keydown", handleKey, true);
    return () => {
      document.removeEventListener("keydown", handleKey, true);
      document.body.style.overflow = previousOverflow;
      if (previousFocus?.isConnected) previousFocus.focus();
    };
  }, [error]);

  return (
    <ConfirmModal open={!!error} feedbackLayer title={title} message={error?.message || ""}
      confirmText={closeLabel} cancelText="" loadingText="" showCancel={false}
      onConfirm={closeApiError} onCancel={closeApiError}
      footer={
        <div ref={diagnosticsRef} className="border-t border-slate-200 pt-3 text-xs text-slate-500 break-all select-text">
          {error?.errorCode ? <p>{codeLabel}: <code>{error.errorCode}</code></p> : null}
          {error?.traceId ? <p>{traceLabel}: <code>{error.traceId}</code></p> : null}
          {error?.details?.map((detail) => <p key={`${detail.label}-${detail.value}`}>{detail.label}: <code>{detail.value}</code></p>)}
        </div>
      }
    />
  );
}
