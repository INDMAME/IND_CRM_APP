import React from "react";
import { createRoot } from "react-dom/client";
import DetailForm from "./DetailForm.tsx";
import { I18nProvider } from "../../../context/I18nContext.tsx";
import { AuthProvider } from "../../../context/AuthContext.tsx";

// Page entry for the visitas detail island.
const DetailPage = () => {
  return (
    <I18nProvider>
      <AuthProvider>
        <DetailForm />
      </AuthProvider>
    </I18nProvider>
  );
};

const mount = () => {
  const rootEl = document.getElementById("visita-detail-root");
  if (!rootEl) return;
  const root = createRoot(rootEl);
  root.render(<DetailPage />);
};

if (document.readyState === "complete" || document.readyState === "interactive") {
  mount();
} else {
  document.addEventListener("DOMContentLoaded", mount);
}

export default DetailPage;
