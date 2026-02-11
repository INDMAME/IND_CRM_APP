import React from "react";
import { I18nProvider } from "../../context/I18nContext.tsx";
import { AuthProvider } from "../../context/AuthContext.tsx";

type Props = {
  children: React.ReactNode;
};

// Shared provider wrapper for visitas React islands.
const VisitasPageProviders = ({ children }: Props) => {
  return (
    <I18nProvider>
      <AuthProvider>{children}</AuthProvider>
    </I18nProvider>
  );
};

export default VisitasPageProviders;
