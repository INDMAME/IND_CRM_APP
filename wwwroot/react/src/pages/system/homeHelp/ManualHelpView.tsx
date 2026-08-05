import { BookOpenIcon } from "@heroicons/react/24/outline";
import { useRef } from "react";
import { indFormat, indT } from "../../../utils/indI18n.ts";
import HomeHelpTopicBrowser from "./HomeHelpTopicBrowser.tsx";
import ManualHelpTopicContent from "./ManualHelpTopicContent.tsx";
import type { HelpResponseLocale } from "./helpTypes.ts";
import { useManualHelpCatalog } from "./useManualHelpCatalog.ts";

type ManualHelpViewProps = {
  responseLocale: HelpResponseLocale;
};

// Composes the Manual topic index and its inline document reader.
const ManualHelpView = ({ responseLocale }: ManualHelpViewProps) => {
  const topicRegionRef = useRef<HTMLDivElement | null>(null);
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

  return (
    <div className="mx-auto w-full max-w-3xl space-y-5">
      <header className="text-center">
        <span className="mx-auto inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-xl)] bg-primary/10 text-primary">
          <BookOpenIcon className="h-6 w-6" aria-hidden="true" />
        </span>
        <h1 className="mt-3 text-balance text-2xl font-semibold text-primary">
          {indT("Nav_Manual", "Manual")}
        </h1>
        {catalog?.knowledgeVersion ? (
          <p className="mt-1 text-xs font-medium text-sky-800">
            {indFormat("HomeHelp_KnowledgeVersion", "Guide version {0}", catalog.knowledgeVersion)}
          </p>
        ) : null}
      </header>

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
            onSelect={(nextTopic) => {
              void selectTopic(nextTopic);
              window.requestAnimationFrame(() => topicRegionRef.current?.scrollIntoView({ block: "start" }));
            }}
          />
        )}
      </section>

      <div ref={topicRegionRef} className="scroll-mt-4">
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

        {topic ? <ManualHelpTopicContent topic={topic} /> : null}
      </div>
    </div>
  );
};

export default ManualHelpView;
