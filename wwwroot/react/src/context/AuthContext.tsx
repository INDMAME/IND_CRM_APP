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
  allowSelfManagement: boolean;
  canAccess: (code: string, level?: AccessLevel) => boolean;
};

const defaultValue: AuthValue = {
  moduleAccess: {},
  selectedCompany: "",
  allowSelfManagement: false,
  canAccess: () => false,
};

const AuthContext = createContext<AuthValue>(defaultValue);

type ProviderProps = {
  children: React.ReactNode;
  moduleAccess?: Record<string, number>;
  selectedCompany?: string;
  allowSelfManagement?: boolean;
};

export const AuthProvider = ({ children, moduleAccess, selectedCompany, allowSelfManagement }: ProviderProps) => {
  const access = moduleAccess || (globalThis.__IND_MODULE_ACCESS__ || {});
  const company = selectedCompany || String(globalThis.__IND_SELECTED_COMPANY__ || "");
  const selfManagement = allowSelfManagement ?? globalThis.__IND_ALLOW_SELF_MANAGEMENT__ === true;

  const value = useMemo<AuthValue>(() => {
    const canAccess = (code: string, level: AccessLevel = "View") => {
      const current = Number(access?.[code] ?? 0);
      return current >= ACCESS_RIGHTS[level];
    };
    return {
      moduleAccess: access,
      selectedCompany: company,
      allowSelfManagement: selfManagement,
      canAccess,
    };
  }, [access, company, selfManagement]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
