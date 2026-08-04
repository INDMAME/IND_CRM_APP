import React, { useEffect, useMemo, useState } from "react";
import { ChevronDownIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import type { HelpModule, HelpTopicSummary } from "./helpTypes.ts";

type HomeHelpTopicBrowserProps = {
  modules: HelpModule[];
  searchLabel: string;
  searchPlaceholder: string;
  emptyLabel: string;
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

// Provides a complete, grouped, filterable browser for every catalog topic.
const HomeHelpTopicBrowser = ({
  modules,
  searchLabel,
  searchPlaceholder,
  emptyLabel,
  readOnly = false,
  onSelect,
}: HomeHelpTopicBrowserProps) => {
  const [query, setQuery] = useState("");
  const [openModuleIds, setOpenModuleIds] = useState<Set<string>>(() => {
    const firstModuleId = modules[0]?.id;
    return new Set(firstModuleId ? [firstModuleId] : []);
  });
  const normalizedQuery = normalizeSearchText(query);

  useEffect(() => {
    const firstModuleId = modules[0]?.id;
    if (!firstModuleId) {
      return;
    }
    setOpenModuleIds((current) => current.size > 0 ? current : new Set([firstModuleId]));
  }, [modules]);

  const filteredModules = useMemo(() => {
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
  }, [modules, normalizedQuery]);

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
          value={query}
          readOnly={readOnly}
          placeholder={searchPlaceholder}
          aria-label={searchLabel}
          className="block w-full rounded-[var(--radius-xl)] border border-slate-200 bg-white py-2 pl-8 pr-2 text-[11px] text-slate-700 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-primary/20 read-only:cursor-not-allowed read-only:text-slate-400"
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>

      <div className="mt-2 max-h-56 space-y-1.5 overflow-y-auto pr-1">
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
                <summary className="flex cursor-pointer list-none items-center gap-1.5 px-2.5 py-2 text-[11px] font-semibold text-primary focus:outline-hidden focus:ring-2 focus:ring-inset focus:ring-primary/20">
                  <span className="min-w-0 flex-1">{module.title}</span>
                  <span className="text-slate-400">{module.topics.length}</span>
                  <ChevronDownIcon className={`h-3.5 w-3.5 transition ${open ? "rotate-180" : ""}`} aria-hidden="true" />
                </summary>
                <div className="space-y-1 border-t border-slate-100 p-1.5">
                  {module.topics.map((topic) => (
                    <button
                      key={topic.id}
                      type="button"
                      disabled={readOnly}
                      className="block w-full rounded-[var(--radius-xl)] px-2 py-1.5 text-left text-[11px] font-semibold text-primary transition hover:bg-primary/5 focus:outline-hidden focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
                      onClick={() => onSelect(topic)}
                    >
                      <span className="block">{topic.title}</span>
                      {topic.summary ? <span className="mt-0.5 block font-normal text-slate-500">{topic.summary}</span> : null}
                    </button>
                  ))}
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
