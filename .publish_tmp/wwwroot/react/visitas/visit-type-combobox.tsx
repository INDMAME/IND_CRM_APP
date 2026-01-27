import React from "react";
import { createRoot } from "react-dom/client";
import VisitTypeCombobox from "../src/components/visitas/VisitTypeCombobox.tsx";

type IndRootElement = HTMLElement & { __indRoot?: import("react-dom/client").Root };

// Mount helper for the legacy view root.
const mount = () => {
  const root = document.getElementById("visit-type-combobox-root") as IndRootElement | null;
  if (!root) return;
  const data = window.__VISIT_TYPES__ || [];

  const element = <VisitTypeCombobox options={data} targetId="visitType" />;

  if (root.__indRoot) {
    root.__indRoot.render(element);
    return;
  }

  const reactRoot = createRoot(root);
  root.__indRoot = reactRoot;
  reactRoot.render(element);
};

if (document.readyState === "complete") {
  mount();
} else {
  window.addEventListener("DOMContentLoaded", mount);
}

export default VisitTypeCombobox;
