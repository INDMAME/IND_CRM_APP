import { getCsrfToken } from "./apiService.ts";

export type ModulePermissionTracePayload = Record<string, unknown>;

const TRACE_URL = "/ModulePermissions/Trace";
const MAX_BEACON_BYTES = 60_000;

// Sends module permission diagnostics to server logs without affecting the UI flow.
export const postModulePermissionTrace = (
  eventName: string,
  payload: ModulePermissionTracePayload = {}
): void => {
  if (typeof window === "undefined") return;

  const event = String(eventName || "").trim();
  if (!event) return;

  const body = JSON.stringify({
    event,
    path: window.location?.pathname || "",
    ...payload,
  });

  const csrfToken = getCsrfToken();
  const headers: HeadersInit = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  };

  if (csrfToken) {
    (headers as Record<string, string>).RequestVerificationToken = csrfToken;
  }

  void fetch(TRACE_URL, {
    method: "POST",
    credentials: "same-origin",
    headers,
    body,
    keepalive: body.length <= MAX_BEACON_BYTES,
  }).catch(() => undefined);
};
