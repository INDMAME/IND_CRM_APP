import { useEffect, useRef } from "react";
import { indT } from "../../../utils/indI18n.ts";
import HomeHelpTopicBrowser from "./HomeHelpTopicBrowser.tsx";
import ManualHelpTopicContent from "./ManualHelpTopicContent.tsx";
import type { HelpResponseLocale } from "./helpTypes.ts";
import { useManualHelpCatalog } from "./useManualHelpCatalog.ts";

type ManualHelpViewProps = {
  responseLocale: HelpResponseLocale;
};

// Composes the Manual topic index and its inline document reader.
const ManualHelpView = ({ responseLocale }: ManualHelpViewProps) => {
  const topicContentRef = useRef<HTMLElement | null>(null);
  const pendingFocusTopicIdRef = useRef("");
  const {
    catalog,
    catalogLoading,
    catalogError,
    selectedTopicId,
    topic,
    topicLoading,
    topicError,
    selectTopic,
  } = useManualHelpCatalog(responseLocale);

  useEffect(() => {
    if (!topic?.id || pendingFocusTopicIdRef.current !== topic.id) {
      return;
    }

    const animationFrame = window.requestAnimationFrame(() => {
      topicContentRef.current?.focus({ preventScroll: true });
      topicContentRef.current?.scrollIntoView({ block: "start" });
      pendingFocusTopicIdRef.current = "";
    });

    return () => window.cancelAnimationFrame(animationFrame);
  }, [topic?.id]);

  return (
    <div className="mx-auto w-full max-w-3xl space-y-5">
      <section
        aria-labelledby="manual-help-catalog-title"
        className="rounded-[var(--radius-xl)] border border-slate-200 bg-white p-4 shadow-[0_14px_34px_rgba(15,23,42,0.06)] sm:p-5"
      >
        <h2
          id="manual-help-catalog-title"
          className="mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-primary"
        >
          {indT("HomeHelp_CatalogTitle", "Help topics")}
        </h2>

        {catalogLoading ? (
          <p className="py-8 text-center text-sm text-slate-500" role="status" aria-live="polite">
            {indT("HomeHelp_CatalogLoading", "Loading topics…")}
          </p>
        ) : catalogError ? (
          <p
            className="rounded-[var(--radius-xl)] border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800"
            role="alert"
          >
            {catalogError}
          </p>
        ) : (
          <HomeHelpTopicBrowser
            modules={catalog?.modules || []}
            selectedTopicId={selectedTopicId}
            searchLabel={indT("HomeHelp_CatalogSearchLabel", "Search help topics")}
            searchPlaceholder={indT("HomeHelp_CatalogSearchPlaceholder", "Search topics…")}
            emptyLabel={indT("HomeHelp_CatalogEmpty", "No matching topics.")}
            detailRegionId="manual-help-topic-detail"
            onSelect={(nextTopic) => {
              pendingFocusTopicIdRef.current = nextTopic.id;
              void selectTopic(nextTopic);
            }}
          />
        )}
      </section>

      <div id="manual-help-topic-detail" aria-busy={topicLoading}>
        {topicLoading ? (
          <p
            className="rounded-[var(--radius-xl)] border border-sky-100 bg-sky-50 px-4 py-4 text-center text-sm text-sky-900"
            role="status"
            aria-live="polite"
          >
            {indT("ManualHelp_TopicLoading", "Loading manual section…")}
          </p>
        ) : null}

        {topicError ? (
          <p className="rounded-[var(--radius-xl)] border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800" role="alert">
            {topicError}
          </p>
        ) : null}

        {topic ? <ManualHelpTopicContent articleRef={topicContentRef} topic={topic} /> : null}
      </div>
    </div>
  );
};

export default ManualHelpView;
