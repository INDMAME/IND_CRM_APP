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
  const fallback = perm.message || indT("Auth_PermissionDenied_Body", "No tienes permisos para realizar esta accion.");
  alert(fallback);
};

const CONTEXT_FAILURE_HINTS = [
  "contexto de companias no inicializado",
  "/api/auth/entra/context",
  "company context not initialized",
  "context not initialized",
];

let forcedReloginPromise: Promise<string> | null = null;

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

const shouldForceRelogin = (payload: unknown, status: number): boolean => {
  if (status === 401) return true;
  if (getBooleanProp(payload, "forceRelogin", "ForceRelogin") === true) return true;

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
    forcedReloginPromise = requestForcedRelogin(reason);
  }

  const loginUrl = await forcedReloginPromise;
  window.location.replace(loginUrl || getDefaultLoginUrl());

  // Keep pending until navigation finishes to avoid rendering transient errors.
  return new Promise<T>(() => {});
};

export async function fetchJson<T = unknown>(url: string, options?: ApiFetchOptions): Promise<T> {
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
    const validationErrors = getValidationErrorsFromPayload(payload);
    const validationMessage = formatValidationErrors(validationErrors);

    if (shouldForceRelogin(payload, response.status)) {
      return forceReloginAndWait<T>(payloadMessage || `http-${response.status}`);
    }

    if (response.status === 403) {
      if (!suppressPermissionModal) showPermissionModal();
      throw new ApiFetchError(
        indT("Auth_PermissionDenied_Body", "No tienes permisos para realizar esta accion."),
        response.status,
        raw
      );
    }

    if (payloadMessage || validationMessage) {
      throw new ApiFetchError(payloadMessage || validationMessage, response.status, raw, validationErrors);
    }

    throw new ApiFetchError(
      indT("Api_RequestFailed", "Request failed. Please try again."),
      response.status,
      raw,
      validationErrors
    );
  }

  if (!raw.trim()) {
    return {} as T;
  }

  if (payload !== null) {
    if (shouldForceRelogin(payload, response.status)) {
      const payloadMessage = getMessageFromPayload(payload);
      return forceReloginAndWait<T>(payloadMessage || "context-error");
    }

    return payload as T;
  }

  throw new ApiFetchError(indT("Api_InvalidJson", "Invalid server response."), response.status, raw);
}
