import React from "react";
import { createRoot } from "react-dom/client";

export type IndRootElement = HTMLElement & { __indRoot?: import("react-dom/client").Root };

// Mounts or re-renders a React island on a Razor host element.
export const mountReactIsland = (rootEl: IndRootElement | null, element: React.ReactElement): void => {
  if (!rootEl) return;

  const existing = rootEl.__indRoot;
  if (existing) {
    existing.render(element);
    return;
  }

  const root = createRoot(rootEl);
  rootEl.__indRoot = root;
  root.render(element);
};

// Defers mount until DOM is ready for pages loaded via server-side Razor.
export const mountWhenDocumentReady = (mount: () => void): void => {
  if (typeof document === "undefined") return;
  if (document.readyState === "complete" || document.readyState === "interactive") {
    mount();
    return;
  }
  document.addEventListener("DOMContentLoaded", mount);
};
