type PermissionI18n = {
  title?: string;
  message?: string;
  ok?: string;
};

type ValidationErrorItem = {
  Field: string;
  Message: string;
};

export type ApiFetchOptions = RequestInit & {
  suppressPermissionModal?: boolean;
};

export class ApiFetchError extends Error {
  status?: number;
  responseBody?: string;
  validationErrors?: ValidationErrorItem[];

  constructor(message: string, status?: number, responseBody?: string, validationErrors?: ValidationErrorItem[]) {
    super(message);
    this.name = "ApiFetchError";
    this.status = status;
    this.responseBody = responseBody;
    this.validationErrors = validationErrors;
  }
}

const getPermissionI18n = (): PermissionI18n => {
  return (typeof window !== "undefined" && window.__IND_PERMISSION_I18N__) || {};
};

const getI18n = (): Record<string, string> => {
  return (typeof globalThis !== "undefined" && globalThis.__IND_I18N__) || {};
};

const indT = (key: string, fallback?: string): string => {
  const dict = getI18n();
  const value = dict[key];
  if (typeof value === "string" && value.trim()) return value;
  return fallback || key;
};

const showPermissionModal = (opts?: Record<string, unknown>) => {
  if (typeof window !== "undefined" && window.IND?.showPermissionModal) {
    window.IND.showPermissionModal(opts || {});
    return;
  }
  const perm = getPermissionI18n();
  const fallback = perm.message || indT("Auth_PermissionDenied_Body", "Auth_PermissionDenied_Body");
  alert(fallback);
};

const CONTEXT_FAILURE_HINTS = [
  "contexto de companias no inicializado",
  "/api/auth/entra/context",
  "company context not initialized",
  "context not initialized",
];

const CONTEXT_REFRESH_ERROR_CODES = new Set(["AUTH_CONTEXT_REQUIRED", "AUTH_CONTEXT_STALE"]);
const SESSION_FAILURE_ERROR_CODES = new Set(["SESSION_EXPIRED", "AUTH_REQUIRED"]);

let forcedReloginPromise: Promise<string> | null = null;
let contextRefreshPromise: Promise<boolean> | null = null;

export const getCsrfToken = (): string => {
  const meta = document.querySelector('meta[name="csrf-token"]');
  return meta ? meta.getAttribute("content") || "" : "";
};

const tryParseJson = (raw: string): unknown | null => {
  if (!raw || !raw.trim()) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

const asRecord = (payload: unknown): Record<string, unknown> | null => {
  if (!payload || typeof payload !== "object") return null;
  return payload as Record<string, unknown>;
};

const getStringProp = (payload: unknown, ...keys: string[]): string => {
  const record = asRecord(payload);
  if (!record) return "";

  for (const key of keys) {
    const value = record[key];
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  return "";
};

const getBooleanProp = (payload: unknown, ...keys: string[]): boolean | null => {
  const record = asRecord(payload);
  if (!record) return null;

  for (const key of keys) {
    const value = record[key];
    if (typeof value === "boolean") return value;
  }

  return null;
};

const getArrayProp = (payload: unknown, ...keys: string[]): unknown[] => {
  const record = asRecord(payload);
  if (!record) return [];

  for (const key of keys) {
    const value = record[key];
    if (Array.isArray(value)) return value;
  }

  return [];
};

const getMessageFromPayload = (payload: unknown): string => {
  return getStringProp(payload, "message", "Message");
};

const getErrorCodeFromPayload = (payload: unknown): string => {
  return getStringProp(payload, "errorCode", "ErrorCode");
};

export const readApiMessageFromRaw = (raw: string): string => {
  return getMessageFromPayload(tryParseJson(raw));
};

const toValidationErrorItem = (value: unknown): ValidationErrorItem | null => {
  const record = asRecord(value);
  if (!record) return null;

  const field = getStringProp(record, "Field", "field");
  const message = getStringProp(record, "Message", "message");
  if (!field && !message) return null;

  return {
    Field: field,
    Message: message,
  };
};

const getValidationErrorsFromPayload = (payload: unknown): ValidationErrorItem[] => {
  const rawErrors = getArrayProp(payload, "Errors", "errors");
  return rawErrors
    .map((entry) => toValidationErrorItem(entry))
    .filter((entry): entry is ValidationErrorItem => entry !== null);
};

const formatValidationErrors = (errors: ValidationErrorItem[]): string => {
  if (!errors.length) return "";

  return errors
    .map((entry) => {
      if (entry.Field && entry.Message) return `${entry.Field}: ${entry.Message}`;
      return entry.Message || entry.Field;
    })
    .filter((part) => part)
    .join(" | ");
};

const normalizeForMatch = (value: string): string => {
  if (!value) return "";
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
};

const isContextBootstrapFailureMessage = (message: string): boolean => {
  const normalized = normalizeForMatch(message);
  if (!normalized) return false;
  return CONTEXT_FAILURE_HINTS.some((hint) => normalized.includes(hint));
};

const getDefaultLoginUrl = (): string => "/Auth/Login?loggedOut=true";

const requestForcedRelogin = async (reason: string): Promise<string> => {
  const csrfToken = getCsrfToken();
  const headers: HeadersInit = {
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
  };

  if (csrfToken) {
    (headers as Record<string, string>)["RequestVerificationToken"] = csrfToken;
  }

  const safeReason = encodeURIComponent(reason || "context-error");

  try {
    const response = await fetch(`/Auth/ForceRelogin?reason=${safeReason}`, {
      method: "POST",
      credentials: "same-origin",
      headers,
    });

    const raw = await response.text();
    const payload = tryParseJson(raw);
    const loginUrl = getStringProp(payload, "loginUrl", "LoginUrl");
    return loginUrl || getDefaultLoginUrl();
  } catch {
    return getDefaultLoginUrl();
  }
};

const requestContextRefresh = async (): Promise<boolean> => {
  const csrfToken = getCsrfToken();
  const headers: HeadersInit = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  };

  if (csrfToken) {
    (headers as Record<string, string>)["RequestVerificationToken"] = csrfToken;
  }

  try {
    const response = await fetch("/Auth/ApiEntraContext", {
      method: "POST",
      credentials: "same-origin",
      headers,
      body: "{}",
    });

    const raw = await response.text();
    const payload = tryParseJson(raw);
    if (!response.ok) return false;

    const record = asRecord(payload);
    if (!record) return false;

    const success = getBooleanProp(payload, "Success", "success");
    return success !== false;
  } catch {
    return false;
  }
};

const refreshContextOnce = async (): Promise<boolean> => {
  if (!contextRefreshPromise) {
    contextRefreshPromise = requestContextRefresh();
  }

  try {
    return await contextRefreshPromise;
  } finally {
    contextRefreshPromise = null;
  }
};

const shouldForceRelogin = (payload: unknown, status: number): boolean => {
  if (status === 401) return true;
  if (getBooleanProp(payload, "forceRelogin", "ForceRelogin") === true) return true;

  const errorCode = getErrorCodeFromPayload(payload);
  return SESSION_FAILURE_ERROR_CODES.has(errorCode);
};

const shouldTryContextRefresh = (payload: unknown): boolean => {
  const errorCode = getErrorCodeFromPayload(payload);
  if (CONTEXT_REFRESH_ERROR_CODES.has(errorCode)) return true;

  if (getBooleanProp(payload, "success", "Success") === false) {
    const message = getMessageFromPayload(payload);
    return isContextBootstrapFailureMessage(message);
  }

  return false;
};

const forceReloginAndWait = async <T>(reason: string): Promise<T> => {
  if (typeof window === "undefined") {
    throw new ApiFetchError(indT("Api_SessionExpired", "Your session has expired."), 401);
  }

  if (!forcedReloginPromise) {
    forcedReloginPromise = (async () => {
      await window.IND?.browserState?.prepareForRelogin(reason);
      return requestForcedRelogin(reason);
    })();
  }

  const loginUrl = await forcedReloginPromise;
  window.IND?.browserState?.completeRelogin(loginUrl);
  window.location.replace(loginUrl || getDefaultLoginUrl());

  // Keep pending until navigation finishes to avoid rendering transient errors.
  return new Promise<T>(() => {});
};

export const handleApiAuthFailure = async <T>(
  raw: string,
  status: number,
  fallbackReason: string
): Promise<T | null> => {
  const payload = tryParseJson(raw);
  if (shouldTryContextRefresh(payload)) {
    const refreshed = await refreshContextOnce();
    if (!refreshed) {
      const reason = getErrorCodeFromPayload(payload) || getMessageFromPayload(payload) || fallbackReason;
      return forceReloginAndWait<T>(reason);
    }

    return null;
  }

  if (!shouldForceRelogin(payload, status)) {
    return null;
  }

  const payloadMessage = getMessageFromPayload(payload);
  return forceReloginAndWait<T>(payloadMessage || fallbackReason);
};

type InternalFetchOptions = ApiFetchOptions & {
  __contextRetryAttempt?: boolean;
};

async function fetchJsonInternal<T = unknown>(url: string, options?: InternalFetchOptions): Promise<T> {
  const { suppressPermissionModal, ...fetchOptions } = options || {};
  const csrfToken = getCsrfToken();

  const headers: HeadersInit = {
    Accept: "application/json",
    ...(fetchOptions.headers || {}),
  };

  if (csrfToken) {
    (headers as Record<string, string>)["RequestVerificationToken"] = csrfToken;
  }

  const response = await fetch(url, {
    credentials: "same-origin",
    ...fetchOptions,
    headers,
  });

  const raw = await response.text();
  const payload = tryParseJson(raw);

  if (!response.ok) {
    const payloadMessage = getMessageFromPayload(payload);
    const payloadErrorCode = getErrorCodeFromPayload(payload);
    const validationErrors = getValidationErrorsFromPayload(payload);
    const validationMessage = formatValidationErrors(validationErrors);

    if (!options?.__contextRetryAttempt && shouldTryContextRefresh(payload)) {
      const refreshed = await refreshContextOnce();
      if (refreshed) {
        return fetchJsonInternal<T>(url, {
          ...options,
          __contextRetryAttempt: true,
        });
      }

      return forceReloginAndWait<T>(payloadErrorCode || payloadMessage || `http-${response.status}`);
    }

    if (shouldForceRelogin(payload, response.status)) {
      return forceReloginAndWait<T>(payloadMessage || `http-${response.status}`);
    }

    if (response.status === 403) {
      if (!suppressPermissionModal) showPermissionModal();
      throw new ApiFetchError(
        indT("Auth_PermissionDenied_Body", "Auth_PermissionDenied_Body"),
        response.status,
        raw
      );
    }

    if (payloadMessage || validationMessage) {
      throw new ApiFetchError(payloadMessage || validationMessage, response.status, raw, validationErrors);
    }

    throw new ApiFetchError(
      indT("Api_RequestFailed", "Api_RequestFailed"),
      response.status,
      raw,
      validationErrors
    );
  }

  if (!raw.trim()) {
    return {} as T;
  }

  if (payload !== null) {
    if (!options?.__contextRetryAttempt && shouldTryContextRefresh(payload)) {
      const refreshed = await refreshContextOnce();
      if (refreshed) {
        return fetchJsonInternal<T>(url, {
          ...options,
          __contextRetryAttempt: true,
        });
      }

      const payloadMessage = getMessageFromPayload(payload);
      const payloadErrorCode = getErrorCodeFromPayload(payload);
      return forceReloginAndWait<T>(payloadErrorCode || payloadMessage || "context-error");
    }

    if (shouldForceRelogin(payload, response.status)) {
      const payloadMessage = getMessageFromPayload(payload);
      return forceReloginAndWait<T>(payloadMessage || "context-error");
    }

    return payload as T;
  }

  throw new ApiFetchError(indT("Api_InvalidJson", "Invalid server response."), response.status, raw);
}

export async function fetchJson<T = unknown>(url: string, options?: ApiFetchOptions): Promise<T> {
  return fetchJsonInternal<T>(url, options);
}
