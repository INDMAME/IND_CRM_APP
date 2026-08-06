import React, { useMemo, useState } from "react";
import { ChevronDownIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import type { HelpModule, HelpTopicSummary } from "./helpTypes.ts";

type HomeHelpTopicBrowserProps = {
  modules: HelpModule[];
  selectedTopicId?: string;
  searchLabel: string;
  searchPlaceholder: string;
  emptyLabel: string;
  detailRegionId?: string;
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

// Filters catalog modules with the same normalized text used by the search input.
export const filterHelpModules = (modules: HelpModule[], query: string): HelpModule[] => {
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery) {
    return modules;
  }

  return modules.flatMap((module) => {
    const moduleMatches = normalizeSearchText(`${module.title} ${module.description}`).includes(normalizedQuery);
    const topics = moduleMatches
      ? module.topics
      : module.topics.filter((topic) =>
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
  emptyLabel,
  detailRegionId,
  readOnly = false,
  onSelect,
}: HomeHelpTopicBrowserProps) => {
  const [query, setQuery] = useState("");
  const [openModuleIds, setOpenModuleIds] = useState<Set<string>>(() => {
    const firstModuleId = modules[0]?.id;
    return new Set(firstModuleId ? [firstModuleId] : []);
  });
  const normalizedQuery = normalizeSearchText(query);

  const filteredModules = useMemo(() => filterHelpModules(modules, normalizedQuery), [modules, normalizedQuery]);

  const handleModuleToggle = (moduleId: string, open: boolean) => {
    if (normalizedQuery) {
      return;
    }
    setOpenModuleIds((current) => {
      const next = new Set(current);
      if (open) {
        next.add(moduleId);
      } else {
        next.delete(moduleId);
      }
      return next;
    });
  };

  return (
    <div className="w-full">
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
          className="block w-full rounded-[var(--radius-xl)] border border-slate-200 bg-white py-2.5 pl-8 pr-2 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-primary/20 read-only:cursor-not-allowed read-only:text-slate-400"
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>

      <div className="mt-3 max-h-[min(65vh,36rem)] space-y-2 overflow-y-auto overscroll-contain pr-1">
        {filteredModules.length === 0 ? (
          <p className="px-2 py-3 text-center text-[11px] text-slate-500">{emptyLabel}</p>
        ) : (
          filteredModules.map((module) => {
            const open = Boolean(normalizedQuery) || openModuleIds.has(module.id);
            return (
              <details
                key={module.id}
                open={open}
                className="rounded-[var(--radius-xl)] border border-slate-200 bg-white"
                onToggle={(event) => {
                  if (normalizedQuery && !event.currentTarget.open) {
                    event.currentTarget.open = true;
                    return;
                  }
                  handleModuleToggle(module.id, event.currentTarget.open);
                }}
              >
                <summary className="flex cursor-pointer list-none items-center gap-1.5 px-3 py-2.5 text-sm font-semibold text-primary focus:outline-hidden focus:ring-2 focus:ring-inset focus:ring-primary/20">
                  <span className="min-w-0 flex-1 break-words">{module.title}</span>
                  <span className="text-slate-400">{module.topics.length}</span>
                  <ChevronDownIcon className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true" />
                </summary>
                <div className="space-y-1 border-t border-slate-100 p-1.5">
                  {module.topics.map((topic) => {
                    const selected = topic.id === selectedTopicId;
                    return (
                      <button
                        key={topic.id}
                        type="button"
                        disabled={readOnly}
                        aria-controls={detailRegionId}
                        aria-pressed={selected}
                        className={`block w-full rounded-[var(--radius-xl)] border px-2.5 py-2 text-left text-sm font-semibold transition-colors focus:outline-hidden focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50 ${
                          selected
                            ? "border-primary/20 bg-primary/10 text-primary"
                            : "border-transparent text-primary hover:bg-primary/5"
                        }`}
                        onClick={() => onSelect(topic)}
                      >
                        <span className="block break-words">{topic.title}</span>
                        {topic.summary ? <span className="mt-0.5 block break-words text-xs font-normal leading-5 text-slate-500">{topic.summary}</span> : null}
                      </button>
                    );
                  })}
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
