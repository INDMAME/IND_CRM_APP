import { mountHistoryPage } from "../src/pages/visitas/historial/HistoryPage.tsx";

type IndRootElement = HTMLElement & { __indRoot?: import("react-dom/client").Root };

const mount = () => {
  const root = document.getElementById("visitas-history-root") as IndRootElement | null;
  if (!root) return;
  mountHistoryPage(root);
};

if (document.readyState === "complete" || document.readyState === "interactive") {
  mount();
} else {
  document.addEventListener("DOMContentLoaded", mount);
}
