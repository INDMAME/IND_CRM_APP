import { indT } from "./indI18n.ts";

export const ACCESS_RIGHTS = {
  View: 1,
  Edit: 2,
  Add: 3,
  FullAccess: 4,
} as const;

export type AccessRight = keyof typeof ACCESS_RIGHTS;

const getPermissionI18n = () => {
  return (typeof globalThis !== "undefined" && globalThis.__IND_PERMISSION_I18N__) || {};
};

export const getModuleAccess = (code: string): number => {
  const access = (typeof globalThis !== "undefined" && globalThis.__IND_MODULE_ACCESS__) || {};
  const value = access[code as keyof typeof access];
  return Number(value ?? 0);
};

export const canAccess = (code: string, level: AccessRight = "View"): boolean => {
  return getModuleAccess(code) >= ACCESS_RIGHTS[level];
};

export const showPermissionModal = (opts?: Record<string, unknown>) => {
  if (typeof window !== "undefined" && window.IND?.showPermissionModal) {
    window.IND.showPermissionModal(opts || {});
    return;
  }
  const perm = getPermissionI18n();
  const fallback = perm.message || indT("Auth_PermissionDenied_Body", "No tienes permisos para realizar esta accion.");
  alert(fallback);
};
