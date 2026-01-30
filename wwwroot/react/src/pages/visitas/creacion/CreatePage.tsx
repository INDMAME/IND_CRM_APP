import React from "react";
import { createRoot } from "react-dom/client";
import CreateForm from "./CreateForm.tsx";
import { I18nProvider } from "../../../context/I18nContext.tsx";
import { AuthProvider } from "../../../context/AuthContext.tsx";

// Page entry for the visitas create island.
const CreatePage = () => {
  return (
    <I18nProvider>
      <AuthProvider>
        <CreateForm />
      </AuthProvider>
    </I18nProvider>
  );
};

const mount = () => {
  const rootEl = document.getElementById("visitas-app-root");
  if (!rootEl) return;
  const root = createRoot(rootEl);
  root.render(<CreatePage />);
};

if (document.readyState === "complete" || document.readyState === "interactive") {
  mount();
} else {
  document.addEventListener("DOMContentLoaded", mount);
}

export default CreatePage;
