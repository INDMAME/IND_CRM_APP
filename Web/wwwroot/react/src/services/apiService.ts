type PermissionI18n = {
  title?: string;
  message?: string;
  ok?: string;
};

export type ApiFetchOptions = RequestInit & {
  suppressPermissionModal?: boolean;
};

export class ApiFetchError extends Error {
  status?: number;
  responseBody?: string;

  constructor(message: string, status?: number, responseBody?: string) {
    super(message);
    this.name = "ApiFetchError";
    this.status = status;
    this.responseBody = responseBody;
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

export const getCsrfToken = (): string => {
  const meta = document.querySelector('meta[name="csrf-token"]');
  return meta ? meta.getAttribute("content") || "" : "";
};

const tryParseJson = (raw: string): any | null => {
  if (!raw || !raw.trim()) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

const getMessageFromPayload = (payload: any): string => {
  const message = payload?.message;
  return typeof message === "string" && message.trim() ? message : "";
};

export async function fetchJson<T = any>(url: string, options?: ApiFetchOptions): Promise<T> {
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
    if (response.status === 403) {
      if (!suppressPermissionModal) showPermissionModal();
      throw new ApiFetchError(
        indT("Auth_PermissionDenied_Body", "No tienes permisos para realizar esta accion."),
        response.status,
        raw
      );
    }

    const payloadMessage = getMessageFromPayload(payload);
    if (payloadMessage) {
      throw new ApiFetchError(payloadMessage, response.status, raw);
    }

    throw new ApiFetchError(indT("Api_RequestFailed", "Request failed. Please try again."), response.status, raw);
  }

  if (!raw.trim()) {
    return {} as T;
  }

  if (payload !== null) {
    return payload as T;
  }

  throw new ApiFetchError(indT("Api_InvalidJson", "Invalid server response."), response.status, raw);
}
