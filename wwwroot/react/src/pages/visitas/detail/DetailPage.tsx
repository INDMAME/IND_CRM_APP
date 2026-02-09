import React from "react";
import { createRoot } from "react-dom/client";
import DetailForm from "./DetailForm.tsx";
import { I18nProvider } from "../../../context/I18nContext.tsx";
import { AuthProvider } from "../../../context/AuthContext.tsx";

type IndRootElement = HTMLElement & { __indRoot?: import("react-dom/client").Root };

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
  const rootEl = document.getElementById("visita-detail-root") as IndRootElement | null;
  if (!rootEl) return;

  const element = <DetailPage />;

  if (rootEl.__indRoot) {
    rootEl.__indRoot.render(element);
    return;
  }

  const root = createRoot(rootEl);
  rootEl.__indRoot = root;
  root.render(element);
};

if (document.readyState === "complete" || document.readyState === "interactive") {
  mount();
} else {
  document.addEventListener("DOMContentLoaded", mount);
}

export default DetailPage;
