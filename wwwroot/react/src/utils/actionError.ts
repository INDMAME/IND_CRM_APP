import { indT } from "./indI18n.ts";

export type ActionErrorDetails = { message: string; traceId?: string; errorCode?: string; severity?: "error" | "warning" };
export type ActionError = string | ActionErrorDetails;

const messageKeys: Record<string, string> = {
  CRM_EXPENSESHEET_TICKET_DUPLICATE: "Tickets_Error_Duplicate",
  CRM_EXPENSESHEET_CLEANUP_PENDING: "ExpenseSheets_Delete_CleanupPending",
  CRM_EXPENSESHEET_DELETE_CHOICE_CONFLICT: "ExpenseSheets_Delete_ChoiceConflict",
  NETWORK_ERROR: "Api_RequestFailed",
  HTTP_SERVER_ERROR: "Api_RequestFailed",
  UPSTREAM_ERROR: "Api_RequestFailed",
  UNHANDLED_ERROR: "Api_RequestFailed",
  INTERNAL_ERROR: "Api_RequestFailed",
  AX_SESSION_ERROR: "Api_RequestFailed",
  AX_TIMEOUT: "Api_RequestFailed",
  SESSION_EXPIRED: "Api_SessionExpired",
  INVALID_RESPONSE: "Api_InvalidJson",
};

// Reads only displayable error metadata; raw responses and unrelated fields stay private.
export const resolveActionError = (error: unknown, fallback = ""): ActionErrorDetails => {
  if (typeof error === "string") return { message: error || fallback };
  const source = error && typeof error === "object" ? error as Record<string, unknown> : {};
  let payload: Record<string, unknown> = {};
  if (typeof source.responseBody === "string") {
    try {
      const parsed: unknown = JSON.parse(source.responseBody);
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) payload = parsed as Record<string, unknown>;
    } catch { /* A non-JSON response has no structured error metadata. */ }
  }
  const text = (value: unknown): string => typeof value === "string" ? value.trim() : "";
  const status = Number(source.status);
  const errorCode = text(payload.ErrorCode ?? payload.errorCode ?? source.ErrorCode ?? source.errorCode)
    || (source.name === "TypeError" ? "NETWORK_ERROR" : status >= 500 ? "HTTP_SERVER_ERROR" : "");
  const rawTraceId = text(payload.TraceId ?? payload.traceId ?? source.TraceId ?? source.traceId);
  const traceId = /^[A-Za-z0-9._:|\-]{1,128}$/.test(rawTraceId) ? rawTraceId : "";
  const serverMessage = text(payload.Message ?? payload.message ?? source.Message ?? source.message) || fallback;
  const validationFailure = /MISSING_FIELDS|VALIDATION|INVALID_(?:DATE|TIME|FIELD|AMOUNT|CURRENCY|REQUEST)/.test(errorCode);
  const messageKey = messageKeys[errorCode] || (validationFailure ? "Common_Error_Validation" : "");
  const message = messageKey ? indT(messageKey, serverMessage) : serverMessage;
  const businessFailure = /DUPLICATE|VALIDATION|MISSING_FIELDS|CONFLICT|FORBIDDEN|PERMISSION|READ_ONLY|CLEANUP_PENDING/.test(errorCode)
    || [400, 403, 404, 409, 422, 429].includes(status);
  const severity = source.severity === "warning" || source.severity === "error" ? source.severity : businessFailure ? "warning" : "error";
  return { message, severity, ...(traceId ? { traceId } : {}), ...(errorCode ? { errorCode } : {}) };
};

// Keeps a logical API failure's trace when mutation callers throw it for shared handling.
export const createActionError = (response: unknown, fallback: string, messageOverride?: string): Error => {
  const details = resolveActionError(response, fallback);
  return Object.assign(new Error(messageOverride || details.message), { traceId: details.traceId, errorCode: details.errorCode, severity: details.severity });
};

// Uses warnings for recoverable business failures and errors for technical failures.
export const getActionErrorMark = (error: unknown): "warningProcess" | "errorProcess" =>
  typeof error === "string" || resolveActionError(error).severity === "warning" ? "warningProcess" : "errorProcess";
