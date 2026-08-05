import AppErrorBoundary from "../../../components/commons/AppErrorBoundary.tsx";
import { indT } from "../../../utils/indI18n.ts";
import { mountReactIsland, mountWhenDocumentReady } from "../../../utils/reactIsland.tsx";
import { normalizeHelpResponseLocale } from "./helpLocale.ts";
import ManualHelpView from "./ManualHelpView.tsx";

// Mounts the dedicated Manual React island with the global app culture.
const mount = () => {
  const rootElement = document.getElementById("manual-help-root");
  if (!rootElement) {
    return;
  }

  const responseLocale = normalizeHelpResponseLocale(
    rootElement.dataset.responseLocale || document.documentElement.lang || "es-ES"
  );
  mountReactIsland(
    rootElement,
    <AppErrorBoundary fallbackMessage={indT("HomeHelp_RenderError", "CRM help could not be displayed.")}>
      <ManualHelpView responseLocale={responseLocale} />
    </AppErrorBoundary>
  );
};

mountWhenDocumentReady(mount);
