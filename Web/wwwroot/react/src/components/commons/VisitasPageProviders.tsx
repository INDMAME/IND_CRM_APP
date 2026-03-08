import React from "react";
import { I18nProvider } from "../../context/I18nContext.tsx";
import { AuthProvider } from "../../context/AuthContext.tsx";

type Props = {
  children: React.ReactNode;
  enableExpenseManagement?: boolean;
};

// Shared provider wrapper for visitas React islands.
const VisitasPageProviders = ({ children, enableExpenseManagement = false }: Props) => {
  return (
    <I18nProvider>
      <AuthProvider enableExpenseManagement={enableExpenseManagement}>{children}</AuthProvider>
    </I18nProvider>
  );
};

export default VisitasPageProviders;
