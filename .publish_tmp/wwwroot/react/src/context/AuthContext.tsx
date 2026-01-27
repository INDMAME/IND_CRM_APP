import React, { createContext, useContext, useMemo } from "react";

export type AccessLevel = "View" | "Edit" | "Add" | "FullAccess";

const ACCESS_RIGHTS: Record<AccessLevel, number> = {
  View: 1,
  Edit: 2,
  Add: 3,
  FullAccess: 4,
};

type AuthValue = {
  moduleAccess: Record<string, number>;
  selectedCompany: string;
  canAccess: (code: string, level?: AccessLevel) => boolean;
};

const defaultValue: AuthValue = {
  moduleAccess: {},
  selectedCompany: "",
  canAccess: () => false,
};

const AuthContext = createContext<AuthValue>(defaultValue);

type ProviderProps = {
  children: React.ReactNode;
  moduleAccess?: Record<string, number>;
  selectedCompany?: string;
};

export const AuthProvider = ({ children, moduleAccess, selectedCompany }: ProviderProps) => {
  const access = moduleAccess || (globalThis.__IND_MODULE_ACCESS__ || {});
  const company = selectedCompany || String(globalThis.__IND_SELECTED_COMPANY__ || "");

  const value = useMemo<AuthValue>(() => {
    const canAccess = (code: string, level: AccessLevel = "View") => {
      const current = Number(access?.[code] ?? 0);
      return current >= ACCESS_RIGHTS[level];
    };
    return { moduleAccess: access, selectedCompany: company, canAccess };
  }, [access, company]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
