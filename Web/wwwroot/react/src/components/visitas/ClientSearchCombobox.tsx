import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import FloatingList from "../commons/FloatingList.tsx";
import Spinner from "../commons/Spinner.tsx";
import { ChevronDownSvg, ChevronUpSvg } from "../commons/chevrons.tsx";
import { fetchJson } from "../../services/apiService.ts";
import { useOutsideClick } from "../../hooks/useOutsideClick.ts";
import { classNames } from "../../utils/classNames.ts";
import { indFormat, indT } from "../../utils/indI18n.ts";
import { mapAccountItem } from "../../utils/visitasMapping.ts";
import { getClientCache, hasClientCache, setClientCache } from "../../utils/visitasStorage.ts";

export type ClientOption = {
  value: string;
  text: string;
  cargo?: string;
  empresa?: string;
};

type Variant = "default" | "compact";

type ClientSearchComboboxProps = {
  value: ClientOption | null;
  onSelected: (value: ClientOption | null) => void;
  label?: string;
  placeholder?: string;
  variant?: Variant;
  showLabel?: boolean;
  idBase?: string;
  clearOnNull?: boolean;
  portalClassName?: string;
  panelClassName?: string;
};

// Reusable client search combobox for visitas pages.
const ClientSearchCombobox = ({
  value,
  onSelected,
  label,
  placeholder,
  variant = "default",
  showLabel,
  idBase,
  clearOnNull,
  portalClassName,
  panelClassName,
}: ClientSearchComboboxProps) => {
  const isCompact = variant === "compact";
  const resolvedLabel = label || indT("Visits_Create_SearchClient", "Search client");
  const resolvedPlaceholder = placeholder || resolvedLabel;
  const shouldShowLabel = showLabel ?? !isCompact;
  const shouldClearOnNull = clearOnNull ?? isCompact;
  const minChars = 4;

  const [query, setQuery] = useState("");
  const [options, setOptions] = useState<ClientOption[]>([]);
  const [fetchedQuery, setFetchedQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [status, setStatus] = useState(indFormat("Visits_Create_MinChars", "Type at least {0} characters.", minChars));
  const [selected, setSelected] = useState<ClientOption | null>(value);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [blocking, setBlocking] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useOutsideClick([containerRef, listRef], () => setOpen(false));

  useEffect(() => {
    if (!value) {
      if (shouldClearOnNull) {
        setSelected(null);
        setQuery("");
      }
      return;
    }
    setSelected(value);
    setQuery(value.text || "");
  }, [value, shouldClearOnNull]);

  const filtered = useMemo(() => {
    if (!query.trim()) return options;
    const q = query.trim().toLowerCase();
    if (fetchedQuery && q !== fetchedQuery) return options;
    const match = options.filter((o) => o.text.toLowerCase().includes(q));
    return match.length > 0 ? match : options;
  }, [options, query, fetchedQuery]);

  useEffect(() => {
    setActiveIndex(0);
  }, [filtered.length, query]);

  const cancelPending = () => {
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
  };

  const search = async () => {
    const currentQuery = query.trim().toLowerCase();
    if (currentQuery.length < minChars) {
      setStatus(indFormat("Visits_Create_MinChars", "Type at least {0} characters.", minChars));
      setOptions([]);
      setHasMore(false);
      return;
    }
    cancelPending();
    setPage(1);
    setHasMore(true);
    setOpen(false);
    const cacheKey = query.trim().toLowerCase();
    if (hasClientCache(cacheKey)) {
      const cached = (getClientCache(cacheKey) || []) as ClientOption[];
      setFetchedQuery(currentQuery);
      setOptions(cached);
      setStatus(
        cached.length
          ? indFormat("Visits_Create_ClientCountCache", "{0} clients (cache)", cached.length)
          : indT("Visits_Create_NoResults", "No results")
      );
      setHasMore(cached.length === 10);
      setOpen(true);
      return;
    }
    setLoading(true);
    setBlocking(true);
    setStatus(indT("Visits_Create_Searching", "Searching..."));
    const controller = new AbortController();
    abortRef.current = controller;
    let shouldOpenOnFinish = false;
    try {
      const url = `/Visitas/GetAccountsForDropdown?term=${encodeURIComponent(query)}&page=1&pageSize=10`;
      const data = await fetchJson<{ items?: unknown[] }>(url, { signal: controller.signal });
      const items = (data.items || []).map(mapAccountItem).filter(Boolean) as ClientOption[];
      setFetchedQuery(currentQuery);
      setClientCache(cacheKey, items);
      setOptions(items);
      setStatus(items.length ? indFormat("Visits_Create_ClientCount", "{0} clients", items.length) : indT("Visits_Create_NoResults", "No results"));
      setHasMore(items.length === 10);
      shouldOpenOnFinish = true;
    } catch (err: any) {
      if (err?.name === "AbortError") {
        setStatus(indT("Visits_Create_SearchCanceled", "Search canceled."));
      } else if (String(err?.message || "").toLowerCase().includes("timeout")) {
        setStatus(indT("Visits_Create_SearchTimeout", "The search took too long. Type more characters to narrow down."));
      } else {
        setStatus(indT("Visits_Create_LoadClientsError", "Failed to load clients."));
      }
    } finally {
      abortRef.current = null;
      setLoading(false);
      setBlocking(false);
      if (shouldOpenOnFinish) setOpen(true);
    }
  };

  const loadMore = useCallback(async () => {
    if (loadingMore || loading || !hasMore || query.trim().length < minChars) return;
    setLoadingMore(true);
    setBlocking(true);
    const controller = new AbortController();
    abortRef.current = controller;
    try {
      const nextPage = page + 1;
      const url = `/Visitas/GetAccountsForDropdown?term=${encodeURIComponent(query)}&page=${nextPage}&pageSize=10`;
      const data = await fetchJson<{ items?: unknown[] }>(url, { signal: controller.signal });
      const items = (data.items || []).map(mapAccountItem).filter(Boolean) as ClientOption[];
      setOptions((prev) => [...prev, ...items]);
      setPage(nextPage);
      setHasMore(items.length === 10);
    } finally {
      abortRef.current = null;
      setLoadingMore(false);
      setBlocking(false);
    }
  }, [loadingMore, loading, hasMore, query, page, minChars]);

  useEffect(() => {
    if (!open || !listRef.current) return;
    const el = listRef.current;
    const onScroll = () => {
      if (el.scrollTop + el.clientHeight >= el.scrollHeight - 8) loadMore();
    };
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, [open, loadMore]);

  const selectOption = (opt: ClientOption) => {
    setSelected(opt);
    setQuery(opt.text);
    setOpen(false);
    onSelected(opt);
  };

  const requestSearchOrOpen = () => {
    if (loading || blocking) return;
    const trimmed = query.trim();
    if (trimmed.length < minChars) {
      cancelPending();
      setOptions([]);
      setHasMore(false);
      setStatus(indFormat("Visits_Create_MinChars", "Type at least {0} characters.", minChars));
      setOpen(true);
      return;
    }

    const qKey = trimmed.toLowerCase();
    const isSelectionDisplay = !!selected && query === (selected.text || "");
    const shouldSearch = !isSelectionDisplay && qKey !== fetchedQuery;

    if (shouldSearch) {
      search();
      return;
    }

    setOpen(true);
  };

  const handleKeyDown = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    if (ev.key === "ArrowDown") {
      if (!open) return;
      ev.preventDefault();
      if (filtered.length) setActiveIndex((idx) => (idx + 1) % filtered.length);
      return;
    }
    if (ev.key === "ArrowUp") {
      if (!open) return;
      ev.preventDefault();
      if (filtered.length) setActiveIndex((idx) => (idx - 1 + filtered.length) % filtered.length);
      return;
    }
    if (ev.key === "Enter") {
      ev.preventDefault();
      if (open && filtered.length) {
        selectOption(filtered[activeIndex] ?? filtered[0]);
      } else {
        requestSearchOrOpen();
      }
    }
    if (ev.key === "Escape") {
      setOpen(false);
    }
  };

  const queryKey = query.trim().toLowerCase();
  const isSelectionDisplay = !!selected && query === (selected.text || "");
  const showSearchIcon =
    !loading && !blocking && !isSelectionDisplay && queryKey.length >= minChars && (fetchedQuery === "" || queryKey !== fetchedQuery);

  const wrapperClass = isCompact ? "space-y-1 history-client-combobox" : "space-y-2";
  const labelClass = "form-label font-semibold";
  const containerClass = isCompact
    ? "relative w-full rounded-xl border border-slate-200/70 bg-transparent text-left focus-within:border-primary/70 focus-within:ring-2 focus-within:ring-primary/20 focus-within:ring-offset-0"
    : "relative w-full cursor-default rounded-xl border-slate-300 bg-white text-left shadow-xs focus-within:border-primary focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-0 sm:text-sm";
  const inputClass = isCompact
    ? "w-full rounded-xl border border-transparent bg-transparent px-3 pr-24 py-2 text-[11px] leading-5 text-slate-700 placeholder:text-slate-400 focus:outline-hidden"
    : "w-full rounded-xl border border-slate-200 px-3 py-2 pr-24 text-sm sm:text-base leading-5 text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-primary focus:border-primary";
  const emptyTextClass = isCompact ? "px-4 py-2 text-[11px] text-slate-500" : "px-4 py-2 text-sm text-slate-500";
  const optionClass = isCompact
    ? "relative flex w-full cursor-default select-none items-start py-2 px-3 text-left text-[11px]"
    : "relative flex w-full cursor-default select-none items-start py-2 px-3 text-left text-sm";
  const optionTextClass = isCompact ? "block truncate uppercase text-[12px]" : "block truncate uppercase text-[13px]";
  const optionSubTextClass = isCompact ? "block truncate uppercase text-[10px] text-slate-600" : "block truncate uppercase text-[11px] text-slate-600";
  const optionSubTextSecondaryClass = isCompact
    ? "block truncate uppercase text-[10px] text-slate-500"
    : "block truncate uppercase text-[11px] text-slate-500";
  const statusClass = isCompact ? "text-[10px] text-slate-500 tech-info" : "text-xs text-slate-500 tech-info";
  const searchIconSize = isCompact ? "h-4 w-4" : "h-5 w-5";
  const chevronIconSize = isCompact ? "h-4 w-4" : "h-5 w-5";

  const safeIdBase = idBase || (isCompact ? "history-client" : "client");
  const listId = `${safeIdBase}-options`;
  const activeId = open && filtered[activeIndex] ? `${safeIdBase}-opt-${filtered[activeIndex].value}` : undefined;

  return (
    <div className={wrapperClass} ref={containerRef}>
      {shouldShowLabel && <label className={labelClass}>{resolvedLabel}</label>}
      <div className="relative">
        <div ref={boxRef} className={containerClass}>
          <input
            className={inputClass}
            value={query}
            onChange={(event) => {
              const val = event.target.value;
              setQuery(val);
              if (selected && val !== (selected.text || "")) {
                setSelected(null);
                onSelected?.(null);
              }
              cancelPending();
              setFetchedQuery("");
              setOptions([]);
              setHasMore(false);
              setStatus(
                val.trim().length < minChars
                  ? indFormat("Visits_Create_MinChars", "Type at least {0} characters.", minChars)
                  : indT("Visits_Create_PressSearchHint", "Press search, Enter or ArrowDown to search.")
              );
              setOpen(false);
            }}
            onKeyDown={handleKeyDown}
            placeholder={resolvedPlaceholder}
            aria-label={resolvedLabel}
            readOnly={loading || blocking}
            aria-busy={loading || blocking}
            role="combobox"
            aria-expanded={open}
            aria-controls={listId}
            aria-activedescendant={activeId}
          />

          <div className="absolute inset-y-0 right-0 flex items-center gap-1 pr-2">
            {(loading || blocking) && (
              <span className="flex items-center px-2" aria-hidden="true">
                {isCompact ? <Spinner size="h-4 w-4" /> : <Spinner />}
              </span>
            )}

            {showSearchIcon && (
              <button
                type="button"
                className="flex items-center p-1.5 text-slate-400 hover:text-slate-500"
                onClick={requestSearchOrOpen}
                aria-label={indT("Visits_Create_SearchClient", "Search client")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={searchIconSize}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </button>
            )}

            <button
              type="button"
              className="flex items-center p-1.5 text-slate-500 hover:text-slate-600"
              onClick={() => {
                if (loading || blocking) return;
                if (open) {
                  setOpen(false);
                  return;
                }
                requestSearchOrOpen();
              }}
              disabled={loading || blocking}
              aria-label={
                open
                  ? indT("Visits_Create_HideClientOptions", "Hide client options")
                  : indT("Visits_Create_ShowClientOptions", "Show client options")
              }
            >
              {open ? <ChevronUpSvg className={chevronIconSize} /> : <ChevronDownSvg className={chevronIconSize} />}
            </button>
          </div>
        </div>
        <FloatingList
          anchorRef={boxRef}
          open={open}
          zIndex={400000}
          maxHeightClass="max-h-72"
          role="listbox"
          roundedClass="rounded-xl"
          portalClassName={portalClassName}
          panelClassName={panelClassName}
        >
          <div ref={listRef} id={listId}>
            {options.length === 0 && (
              <div className={emptyTextClass}>
                {query.trim().length < minChars
                  ? indFormat("Visits_Create_MinChars", "Type at least {0} characters.", minChars)
                  : indT("Visits_Create_NoResults", "No results")}
              </div>
            )}
            {!loading && options.length > 0 && filtered.length === 0 && (
              <div className={emptyTextClass}>{indT("Visits_Create_NoMatches", "No matches")}</div>
            )}
            {!loading &&
              filtered.map((opt, idx) => {
                const isActive = idx === activeIndex;
                const sel = selected?.value === opt.value;
                return (
                  <button
                    type="button"
                    key={opt.value}
                    id={`${safeIdBase}-opt-${opt.value}`}
                    role="option"
                    aria-selected={sel}
                    className={classNames(
                      optionClass,
                      isActive ? "bg-primary text-white" : sel ? "bg-primary/10 text-primary" : isCompact ? "text-slate-700" : "text-slate-900"
                    )}
                    onMouseEnter={() => setActiveIndex(idx)}
                    onClick={() => selectOption(opt)}
                  >
                    <div className="flex flex-col space-y-0.5">
                      <span className={classNames(optionTextClass, sel ? "font-semibold" : "font-normal")}>
                        {opt.text}
                      </span>
                      {isCompact ? (
                        <>
                          {opt.cargo && <span className={optionSubTextClass}>{opt.cargo}</span>}
                          {opt.empresa && <span className={optionSubTextSecondaryClass}>{opt.empresa}</span>}
                        </>
                      ) : (
                        <>
                          <span className={optionSubTextClass}>{opt.cargo || ""}</span>
                          <span className={optionSubTextSecondaryClass}>{opt.empresa || ""}</span>
                        </>
                      )}
                    </div>
                  </button>
                );
              })}
          </div>
        </FloatingList>
      </div>
      <div className="w-full flex justify-end">
        <span className={statusClass}>{status}</span>
      </div>
    </div>
  );
};

export default ClientSearchCombobox;
