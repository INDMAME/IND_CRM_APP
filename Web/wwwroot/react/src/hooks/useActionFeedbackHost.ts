import { useCallback, useEffect, useRef, useState } from "react";
import { getActionFeedbackKey, showActionError, subscribeActionErrors, type ActionFeedbackRequest } from "../services/actionFeedback.ts";
import { indT } from "../utils/indI18n.ts";

// Moves legacy and server-rendered errors into the same React popup after the host is ready.
const bindPageErrorRoutes = (): (() => void) => {
  const permission = (options: Record<string, unknown> = {}) => showActionError({
    message: options.message || indT("Auth_PermissionDenied_Body", "Permission denied."),
    traceId: options.traceId, severity: "warning", errorCode: "AUTH_PERMISSION_DENIED",
  }, { title: typeof options.title === "string" ? options.title : indT("Auth_PermissionDenied_Title", "Permission denied") });
  window.IND ??= {};
  const previous = window.IND.showPermissionModal;
  window.IND.showPermissionModal = permission;
  document.querySelectorAll<HTMLElement>("[data-ind-error-message]").forEach(element => {
    showActionError({ message: element.dataset.indErrorMessage, traceId: element.dataset.indErrorTrace,
      severity: element.dataset.indErrorSeverity === "warning" ? "warning" : "error" });
  });
  const legacy = document.getElementById("indPermissionModal");
  if (legacy?.getAttribute("aria-hidden") === "false") {
    permission({ title: document.getElementById("indPermissionModalTitle")?.textContent,
      message: document.getElementById("indPermissionModalBody")?.textContent, traceId: legacy.dataset.indTraceId });
    legacy.classList.add("hidden");
    legacy.setAttribute("aria-hidden", "true");
  }
  return () => { if (window.IND?.showPermissionModal === permission) window.IND.showPermissionModal = previous; };
};

// Serializes error presentation and resolves every waiter when a shared warning is acknowledged.
export const useActionFeedbackHost = () => {
  const [queue, setQueue] = useState<ActionFeedbackRequest[]>([]);
  const callbacks = useRef(new Map<string, Set<() => void>>());
  useEffect(() => {
    const unsubscribe = subscribeActionErrors(request => {
      const key = getActionFeedbackKey(request);
      if (request.onDismiss) {
        const waiting = callbacks.current.get(key) ?? new Set<() => void>();
        waiting.add(request.onDismiss);
        callbacks.current.set(key, waiting);
      }
      setQueue(previous => previous.some(item => getActionFeedbackKey(item) === key) ? previous : [...previous, request]);
    });
    const unbind = bindPageErrorRoutes();
    return () => { unbind(); unsubscribe(); };
  }, []);
  const active = queue[0];
  const close = useCallback(() => {
    if (!active) return;
    const key = getActionFeedbackKey(active);
    const waiting = callbacks.current.get(key);
    callbacks.current.delete(key);
    setQueue(previous => previous.slice(1));
    waiting?.forEach(resolve => resolve());
  }, [active]);
  return { active, close };
};
