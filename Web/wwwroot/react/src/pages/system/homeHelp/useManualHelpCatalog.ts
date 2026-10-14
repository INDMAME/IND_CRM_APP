import { useCallback, useEffect, useRef, useState } from "react";
import { indT } from "../../../utils/indI18n.ts";
import { fetchHelpCatalog, fetchHelpTopic } from "./helpService.ts";
import type {
  HelpCatalog,
  HelpResponseLocale,
  HelpTopic,
  HelpTopicSummary,
} from "./helpTypes.ts";

type UseManualHelpCatalogResult = {
  catalog: HelpCatalog | null;
  catalogLoading: boolean;
  catalogError: string;
  selectedTopicId: string;
  topic: HelpTopic | null;
  topicLoading: boolean;
  topicError: string;
  selectTopic: (topic: HelpTopicSummary) => Promise<void>;
};

// Owns catalog and selected-topic requests for the dedicated Manual page.
export const useManualHelpCatalog = (
  responseLocale: HelpResponseLocale
): UseManualHelpCatalogResult => {
  const [catalog, setCatalog] = useState<HelpCatalog | null>(null);
  const [catalogLoading, setCatalogLoading] = useState(true);
  const [catalogError, setCatalogError] = useState("");
  const [selectedTopicId, setSelectedTopicId] = useState("");
  const [topic, setTopic] = useState<HelpTopic | null>(null);
  const [topicLoading, setTopicLoading] = useState(false);
  const [topicError, setTopicError] = useState("");
  const topicControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    void fetchHelpCatalog(responseLocale, controller.signal)
      .then((nextCatalog) => setCatalog(nextCatalog))
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
        setCatalog(null);
        setCatalogError(indT("HomeHelp_CatalogError", "The help topics could not be loaded."));
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setCatalogLoading(false);
        }
      });

    return () => controller.abort();
  }, [responseLocale]);

  useEffect(() => {
    return () => topicControllerRef.current?.abort();
  }, []);

  const selectTopic = useCallback((topicSummary: HelpTopicSummary): Promise<void> => {
    const nextTopicId = String(topicSummary.id || "").trim();
    if (!nextTopicId) {
      return Promise.resolve();
    }

    topicControllerRef.current?.abort();
    const controller = new AbortController();
    topicControllerRef.current = controller;
    setSelectedTopicId(nextTopicId);
    setTopic(null);
    setTopicLoading(true);
    setTopicError("");

    return fetchHelpTopic(nextTopicId, responseLocale, controller.signal)
      .then((nextTopic) => {
        if (!controller.signal.aborted) {
          setTopic(nextTopic);
        }
      })
      .catch((error: unknown) => {
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          setTopicError(indT("ManualHelp_TopicError", "The manual section could not be loaded."));
        }
      })
      .finally(() => {
        if (topicControllerRef.current === controller) {
          topicControllerRef.current = null;
          if (!controller.signal.aborted) {
            setTopicLoading(false);
          }
        }
      });
  }, [responseLocale]);

  return {
    catalog,
    catalogLoading,
    catalogError,
    selectedTopicId,
    topic,
    topicLoading,
    topicError,
    selectTopic,
  };
};
