import { useEffect, useRef, useState } from "react";
import { indT } from "../../../utils/indI18n.ts";
import { fetchHelpCatalog } from "./helpService.ts";
import type { HelpCatalog, HelpModule, HelpResponseLocale } from "./helpTypes.ts";

export type HomeHelpCatalogState = "idle" | "loading" | "ready" | "error";

type UseHomeHelpModuleCatalogArgs = {
  enabled: boolean;
  responseLocale: HelpResponseLocale;
};

type UseHomeHelpModuleCatalogResult = {
  modules: HelpModule[];
  state: HomeHelpCatalogState;
  errorMessage: string;
};

const EMPTY_MODULES: HelpModule[] = [];

// Loads and retains the localized module catalog required before a Home chat starts.
export const useHomeHelpModuleCatalog = ({
  enabled,
  responseLocale,
}: UseHomeHelpModuleCatalogArgs): UseHomeHelpModuleCatalogResult => {
  const [catalog, setCatalog] = useState<HelpCatalog | null>(null);
  const [state, setState] = useState<HomeHelpCatalogState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const loadedLocaleRef = useRef("");

  useEffect(() => {
    if (!enabled || loadedLocaleRef.current === responseLocale) {
      return;
    }

    const controller = new AbortController();
    setCatalog(null);
    setState("loading");
    setErrorMessage("");

    void fetchHelpCatalog(responseLocale, controller.signal)
      .then((nextCatalog) => {
        if (controller.signal.aborted) {
          return;
        }
        loadedLocaleRef.current = responseLocale;
        setCatalog(nextCatalog);
        setState("ready");
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
        setCatalog(null);
        setState("error");
        setErrorMessage(indT("HomeHelp_CatalogError", "The help topics could not be loaded."));
      });

    return () => controller.abort();
  }, [enabled, responseLocale]);

  return {
    modules: catalog?.modules || EMPTY_MODULES,
    state,
    errorMessage,
  };
};
