import React, { type Ref, useDeferredValue, useMemo, useState } from "react";
import { ChevronDownIcon, ChevronRightIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import type { HelpModule, HelpTopicSummary } from "./helpTypes.ts";

type HomeHelpTopicBrowserProps = {
  modules: HelpModule[];
  selectedTopicId?: string;
  searchLabel: string;
  searchPlaceholder: string;
  loadingLabel: string;
  emptyLabel: string;
  detailRegionId?: string;
  selectedTopicButtonRef?: Ref<HTMLButtonElement>;
  readOnly?: boolean;
  onSelect: (topic: HelpTopicSummary) => void;
};

// Normalizes searchable copy while retaining the original localized display values.
const normalizeSearchText = (value: string): string => {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
};

// Filters catalog modules down to topics whose visible copy matches the search input.
export const filterHelpModules = (modules: HelpModule[], query: string): HelpModule[] => {
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery) {
    return modules;
  }

  return modules.flatMap((module) => {
    const topics = module.topics.filter((topic) =>
      normalizeSearchText(`${topic.title} ${topic.summary}`).includes(normalizedQuery)
    );
    return topics.length > 0 ? [{ ...module, topics }] : [];
  });
};

// Provides a complete, grouped, filterable browser for every catalog topic.
const HomeHelpTopicBrowser = ({
  modules,
  selectedTopicId = "",
  searchLabel,
  searchPlaceholder,
  loadingLabel,
  emptyLabel,
  detailRegionId,
  selectedTopicButtonRef,
  readOnly = false,
  onSelect,
}: HomeHelpTopicBrowserProps) => {
  const [query, setQuery] = useState("");
  const [openModuleId, setOpenModuleId] = useState("");
  const deferredQuery = useDeferredValue(query);
  const normalizedQuery = normalizeSearchText(query);
  const deferredNormalizedQuery = normalizeSearchText(deferredQuery);
  const isSearchPending = normalizedQuery !== deferredNormalizedQuery;

  const filteredModules = useMemo(
    () => filterHelpModules(modules, deferredNormalizedQuery),
    [modules, deferredNormalizedQuery]
  );

  const handleSearchChange = (nextQuery: string) => {
    const normalizedNextQuery = normalizeSearchText(nextQuery);
    const nextFilteredModules = filterHelpModules(modules, nextQuery);
    setQuery(nextQuery);
    setOpenModuleId(normalizedNextQuery ? nextFilteredModules[0]?.id || "" : "");
  };

  const handleModuleToggle = (moduleId: string) => {
    setOpenModuleId((current) => current === moduleId ? "" : moduleId);
  };

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col">
      <label className="relative block">
        <span className="sr-only">{searchLabel}</span>
        <MagnifyingGlassIcon className="pointer-events-none absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" aria-hidden="true" />
        <input
          type="search"
          name="crm-help-topic-search"
          autoComplete="off"
          value={query}
          readOnly={readOnly}
          placeholder={searchPlaceholder}
          aria-label={searchLabel}
          aria-controls="manual-help-topic-search-results"
          className="block w-full rounded-[var(--radius-xl)] border border-slate-200 bg-white py-2.5 pl-8 pr-2 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-primary/20 read-only:cursor-not-allowed read-only:text-slate-400"
          onChange={(event) => handleSearchChange(event.target.value)}
        />
      </label>

      <div
        id="manual-help-topic-search-results"
        className="mt-3 min-h-0 flex-1 space-y-2 overflow-y-scroll overscroll-contain [scrollbar-gutter:stable] pr-1"
        aria-busy={isSearchPending}
      >
        {isSearchPending ? (
          <p className="px-2 py-6 text-center text-[11px] text-slate-500" role="status" aria-live="polite">
            {loadingLabel}
          </p>
        ) : filteredModules.length === 0 ? (
          <p className="px-2 py-3 text-center text-[11px] text-slate-500" role="status">
            {emptyLabel}
          </p>
        ) : (
          filteredModules.map((module) => {
            const open = openModuleId === module.id;
            const moduleDescriptionId = !normalizedQuery && module.description
              ? `manual-help-module-description-${module.id}`
              : undefined;
            return (
              <details
                key={module.id}
                open={open}
                className="rounded-[var(--radius-xl)] border border-slate-200 bg-white"
              >
                <summary
                  aria-describedby={moduleDescriptionId}
                  className="flex cursor-pointer list-none items-center gap-1.5 px-3 py-2.5 text-sm font-semibold text-primary focus:outline-hidden focus:ring-2 focus:ring-inset focus:ring-primary/20"
                  onClick={(event) => {
                    event.preventDefault();
                    handleModuleToggle(module.id);
                  }}
                >
                  <span className="min-w-0 flex-1 break-words">{module.title}</span>
                  <span className="text-slate-400">{module.topics.length}</span>
                  <ChevronDownIcon className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true" />
                </summary>
                <div className="border-t border-slate-100 p-1.5">
                  {moduleDescriptionId ? (
                    <p
                      id={moduleDescriptionId}
                      className="m-1 mb-2 rounded-[var(--radius-xl)] bg-slate-100 px-2.5 py-2 text-xs font-normal leading-5 text-slate-600"
                    >
                      {module.description}
                    </p>
                  ) : null}
                  <div className="space-y-1">
                    {module.topics.map((topic) => {
                      const selected = topic.id === selectedTopicId;
                      const topicTitleId = `manual-help-topic-title-${topic.id}`;
                      const topicSummaryId = topic.summary ? `manual-help-topic-summary-${topic.id}` : undefined;
                      return (
                        <button
                          key={topic.id}
                          ref={selected ? selectedTopicButtonRef : undefined}
                          type="button"
                          disabled={readOnly}
                          aria-controls={detailRegionId}
                          aria-labelledby={topicTitleId}
                          aria-describedby={topicSummaryId}
                          aria-pressed={selected}
                          className={`group flex w-full touch-manipulation items-start gap-3 rounded-[var(--radius-xl)] border px-3 py-3 text-left transition-[border-color,background-color,box-shadow] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 ${
                            selected
                              ? "border-primary/30 bg-primary/[0.07] shadow-[0_8px_20px_rgba(0,41,107,0.08)]"
                              : "border-slate-200 bg-white hover:border-primary/25 hover:bg-primary/[0.03] hover:shadow-[0_8px_18px_rgba(15,23,42,0.06)]"
                          }`}
                          onClick={() => onSelect(topic)}
                        >
                          <span className="min-w-0 flex-1">
                            <span id={topicTitleId} className="block break-words text-sm font-semibold text-primary">
                              {topic.title}
                            </span>
                            {topic.summary ? (
                              <span
                                id={topicSummaryId}
                                className="mt-1.5 block break-words text-xs font-normal leading-5 text-slate-600"
                              >
                                {topic.summary}
                              </span>
                            ) : null}
                          </span>
                          <ChevronRightIcon
                            className={`mt-0.5 h-4 w-4 shrink-0 transition-[color,transform] motion-reduce:transform-none motion-reduce:transition-none group-hover:translate-x-0.5 ${
                              selected ? "text-primary" : "text-slate-400 group-hover:text-primary"
                            }`}
                            aria-hidden="true"
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </details>
            );
          })
        )}
      </div>
    </div>
  );
};

export default HomeHelpTopicBrowser;
