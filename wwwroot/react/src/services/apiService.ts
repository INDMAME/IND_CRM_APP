type PermissionI18n = {
  title?: string;
  message?: string;
  ok?: string;
};

export type ApiFetchOptions = RequestInit & {
  suppressPermissionModal?: boolean;
};

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

  const text = await response.text();

  if (!response.ok) {
    if (response.status === 403) {
      if (!suppressPermissionModal) showPermissionModal();
      throw new Error(indT("Auth_PermissionDenied_Body", "No tienes permisos para realizar esta accion."));
    }

    try {
      const json = JSON.parse(text);
      const msg = json?.message;
      if (typeof msg === "string" && msg.trim()) {
        throw new Error(msg);
      }
    } catch {
      // ignore parse errors
    }

    throw new Error(indT("Api_RequestFailed", "Request failed. Please try again."));
  }

  try {
    return JSON.parse(text) as T;
  } catch {
    throw new Error(indT("Api_InvalidJson", "Invalid server response."));
  }
}
