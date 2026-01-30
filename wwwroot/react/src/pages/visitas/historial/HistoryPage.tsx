import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent, MouseEvent as ReactMouseEvent } from "react";
import { createRoot } from "react-dom/client";
import { classNames } from "../../../utils/classNames.ts";
import { indFormat, indT } from "../../../utils/indI18n.ts";
import { canAccess, showPermissionModal } from "../../../utils/permissions.ts";
import { fetchJson, getCsrfToken } from "../../../services/apiService.ts";
import { HISTORY_FILTER_KEY, HISTORY_RETURN_FLAG_KEY } from "../../../utils/visitasHistory.ts";
import { getClientCache, hasClientCache, setClientCache } from "../../../utils/visitasStorage.ts";
import { mapAccountItem } from "../../../utils/visitasMapping.ts";
import { useOutsideClick } from "../../../hooks/useOutsideClick.ts";
import { ChevronDownSvg, ChevronUpSvg } from "../../../components/commons/chevrons.tsx";
import FloatingList from "../../../components/commons/FloatingList.tsx";
import Spinner from "../../../components/commons/Spinner.tsx";
import StarBorder from "../../../components/commons/StarBorder.tsx";
import QuickFilterSlider from "../../../components/commons/QuickFilterSlider.tsx";
import HistoryTable, { TimelineItem } from "./HistoryTable.tsx";

type Props = {
  defaultFromDate?: string;
  defaultToDate?: string;
};

type ActivityItem = {
  actividadId?: string | number;
  ActividadId?: string | number;
  recId?: string | number;
  RecId?: string | number;
  name?: string;
  Name?: string;
  transDate?: string;
  TransDate?: string;
  description?: string;
  Description?: string;
};

type HistoryResponse = {
  items?: ActivityItem[];
  total?: number;
};

type CachedFilter = {
  fromDate: string;
  toDate: string;
  page?: number;
  clientAccount?: string;
  clientText?: string;
};

type ClientOption = {
  value: string;
  text: string;
  cargo?: string;
  empresa?: string;
};

type CalendarCell = {
  date: Date | null;
  iso: string;
  isEmpty: boolean;
};

type QuickFilterId = "custom" | "this-week" | "last-week" | "this-month" | "last-month";

const PAGE_SIZE = 6;
const NAV_DELAY_MS = 320;

const normalizeUiLocale = (locale: string) => {
  const value = String(locale || "").trim();
  if (!value) return "es-ES";
  if (/^zh-hans/i.test(value)) return "zh-CN";
  return value;
};

const isBasqueLocale = (locale: string) => /^eu\b/i.test(String(locale || ""));

const BASQUE_MONTHS = [
  "urtarrila",
  "otsaila",
  "martxoa",
  "apirila",
  "maiatza",
  "ekaina",
  "uztaila",
  "abuztua",
  "iraila",
  "urria",
  "azaroa",
  "abendua",
];

const BASQUE_MONTHS_SHORT = [
  "urt",
  "ots",
  "mar",
  "api",
  "mai",
  "eka",
  "uzt",
  "abu",
  "ira",
  "urr",
  "aza",
  "abe",
];

const getUiLocale = () => {
  const fromHtml = typeof document !== "undefined" ? document.documentElement.lang : "";
  if (fromHtml && String(fromHtml).trim()) return normalizeUiLocale(fromHtml);
  return "es-ES";
};

const pad = (n: number) => n.toString().padStart(2, "0");

const toISO = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

const startOfWeek = (d: Date) => {
  const dayOffset = (d.getDay() + 6) % 7;
  const start = startOfDay(d);
  start.setDate(start.getDate() - dayOffset);
  return start;
};

const endOfWeek = (start: Date) => {
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  return end;
};

const parseISO = (s: string) => {
  if (!s) return null;
  const parts = s.split("-").map(Number);
  if (parts.length !== 3) return null;
  return new Date(parts[0], parts[1] - 1, parts[2]);
};

const sameDay = (a: Date | null, b: Date | null) => !!(a && b && a.getTime() === b.getTime());

const isBefore = (a: Date | null, b: Date | null) => !!(a && b && a.getTime() < b.getTime());

const formatDisplay = (d: Date, locale: string) => {
  if (isBasqueLocale(locale)) {
    const month = BASQUE_MONTHS_SHORT[d.getMonth()];
    return `${d.getDate()} ${month} ${d.getFullYear()}`.toLowerCase();
  }
  return d
    .toLocaleDateString(locale, {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
    .replace(/\./g, "")
    .toLowerCase();
};

const formatMonthLabel = (d: Date, locale: string) => {
  if (/^zh/i.test(locale)) {
    return new Intl.DateTimeFormat(locale, { year: "numeric", month: "long" }).format(d);
  }
  if (isBasqueLocale(locale)) {
    return `${BASQUE_MONTHS[d.getMonth()]} ${d.getFullYear()}`;
  }
  const monthName = d.toLocaleDateString(locale, { month: "long" });
  const capMonthName = monthName && /[A-Za-z]/.test(monthName[0])
    ? monthName[0].toLocaleUpperCase(locale) + monthName.slice(1)
    : monthName;
  return `${capMonthName} ${d.getFullYear()}`;
};

const parseDateValue = (value: string) => {
  if (!value) return null;
  const raw = String(value).trim();
  if (!raw) return null;

  const datePart = raw.split("T")[0].split(" ")[0];

  if (/^\d{4}-\d{2}-\d{2}$/.test(datePart)) {
    const [y, m, d] = datePart.split("-").map(Number);
    return new Date(y, m - 1, d);
  }

  if (/^\d{2}[./-]\d{2}[./-]\d{4}$/.test(datePart)) {
    const parts = datePart.split(/[./-]/).map(Number);
    const [d, m, y] = parts;
    return new Date(y, m - 1, d);
  }

  const parsed = new Date(raw);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const formatDateParts = (value: string, locale: string) => {
  if (!value) return { year: "", month: "", day: "" };
  const d = parseDateValue(value);
  if (!d) return { year: "", month: "", day: "" };
  let month = "";
  if (isBasqueLocale(locale)) {
    month = BASQUE_MONTHS_SHORT[d.getMonth()] || "";
  } else {
    month = d.toLocaleDateString(locale, { month: "short" }).replace(/\./g, "");
  }
  return {
    year: String(d.getFullYear()),
    month: month.toUpperCase(),
    day: String(d.getDate()).padStart(2, "0"),
  };
};

const toTitleCase = (value: string, locale: string) => {
  if (!value) return "";
  const lower = value.toLocaleLowerCase(locale);
  try {
    return lower.replace(/(^|[^\p{L}])(\p{L})/gu, (_match, prefix, ch) => `${prefix}${ch.toLocaleUpperCase(locale)}`);
  } catch {
    return lower.replace(/(^|[\s-/])(\S)/g, (_match, prefix, ch) => `${prefix}${ch.toLocaleUpperCase(locale)}`);
  }
};

const toSentenceCase = (value: string, locale: string) => {
  if (!value) return "";
  const trimmed = value.trim();
  if (!trimmed) return trimmed;
  const lower = trimmed.toLocaleLowerCase(locale);
  return lower[0].toLocaleUpperCase(locale) + lower.slice(1);
};

const logHistory = (message: string, data?: Record<string, unknown>) => {
  if (typeof window === "undefined") return;
  const debugFlag = (window as any).__IND_DEBUG_HISTORY__;
  if (debugFlag === false) return;
  if (data) {
    console.debug("[History]", message, data);
  } else {
    console.debug("[History]", message);
  }
};

type HistoryClientComboboxProps = {
  value: ClientOption | null;
  onSelected: (value: ClientOption | null) => void;
};

const HistoryClientCombobox = ({ value, onSelected }: HistoryClientComboboxProps) => {
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState<ClientOption[]>([]);
  const [fetchedQuery, setFetchedQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [status, setStatus] = useState(indFormat("Visits_Create_MinChars", "Type at least {0} characters.", 4));
  const [selected, setSelected] = useState<ClientOption | null>(value);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [blocking, setBlocking] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const clientLabel = indT("History_Filter_Client", "Client");

  useOutsideClick([containerRef, listRef], () => setOpen(false));

  useEffect(() => {
    if (!value) {
      setSelected(null);
      setQuery("");
      return;
    }
    setSelected(value);
    setQuery(value.text || "");
  }, [value]);

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
    if (currentQuery.length < 4) {
      setStatus(indFormat("Visits_Create_MinChars", "Type at least {0} characters.", 4));
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
    if (loadingMore || loading || !hasMore || query.trim().length < 4) return;
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
  }, [loadingMore, loading, hasMore, query, page]);

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
    if (trimmed.length < 4) {
      cancelPending();
      setOptions([]);
      setHasMore(false);
      setStatus(indFormat("Visits_Create_MinChars", "Type at least {0} characters.", 4));
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

  const handleKeyDown = (ev: ReactKeyboardEvent<HTMLInputElement>) => {
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
    !loading && !blocking && !isSelectionDisplay && queryKey.length >= 4 && (fetchedQuery === "" || queryKey !== fetchedQuery);

  return (
    <div className="space-y-1" ref={containerRef}>
      <div className="relative">
        <div
          ref={boxRef}
          className="relative w-full rounded-xl border border-slate-200/70 bg-transparent text-left focus-within:border-primary/70 focus-within:ring-2 focus-within:ring-primary/20 focus-within:ring-offset-0"
        >
          <input
            className="w-full rounded-xl border border-transparent bg-transparent px-3 pr-24 py-2 text-[11px] leading-5 text-slate-700 placeholder:text-slate-400 focus:outline-hidden"
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
                val.trim().length < 4
                  ? indFormat("Visits_Create_MinChars", "Type at least {0} characters.", 4)
                  : indT("Visits_Create_PressSearchHint", "Press search, Enter or ArrowDown to search.")
              );
              setOpen(false);
            }}
            onKeyDown={handleKeyDown}
            placeholder={clientLabel}
            aria-label={clientLabel}
            readOnly={loading || blocking}
            aria-busy={loading || blocking}
            role="combobox"
            aria-expanded={open}
            aria-controls="history-client-options"
            aria-activedescendant={open && filtered[activeIndex] ? `history-client-opt-${filtered[activeIndex].value}` : undefined}
          />

          <div className="absolute inset-y-0 right-0 flex items-center gap-1 pr-2">
            {(loading || blocking) && (
              <span className="flex items-center px-2" aria-hidden="true">
                <Spinner size="h-4 w-4" />
              </span>
            )}

            {showSearchIcon && (
              <button
                type="button"
                className="flex items-center p-1.5 text-slate-400 hover:text-slate-500"
                onClick={requestSearchOrOpen}
                aria-label={indT("Visits_Create_SearchClient", "Search client")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
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
              {open ? <ChevronUpSvg className="h-4 w-4" /> : <ChevronDownSvg className="h-4 w-4" />}
            </button>
          </div>
        </div>
        <FloatingList anchorRef={boxRef} open={open} zIndex={400000} maxHeightClass="max-h-72" role="listbox" roundedClass="rounded-xl">
          <div ref={listRef} id="history-client-options">
            {options.length === 0 && (
              <div className="px-4 py-2 text-[11px] text-slate-500">
                {query.trim().length < 4
                  ? indFormat("Visits_Create_MinChars", "Type at least {0} characters.", 4)
                  : indT("Visits_Create_NoResults", "No results")}
              </div>
            )}
            {!loading && options.length > 0 && filtered.length === 0 && (
              <div className="px-4 py-2 text-[11px] text-slate-500">{indT("Visits_Create_NoMatches", "No matches")}</div>
            )}
            {!loading &&
              filtered.map((opt, idx) => {
                const isActive = idx === activeIndex;
                const sel = selected?.value === opt.value;
                return (
                  <button
                    type="button"
                    key={opt.value}
                    id={`history-client-opt-${opt.value}`}
                    role="option"
                    aria-selected={sel}
                    className={classNames(
                      "relative flex w-full cursor-default select-none items-start py-2 px-3 text-left text-[11px]",
                      isActive ? "bg-primary text-white" : sel ? "bg-primary/10 text-primary" : "text-slate-700"
                    )}
                    onMouseEnter={() => setActiveIndex(idx)}
                    onClick={() => selectOption(opt)}
                  >
                    <div className="flex flex-col space-y-0.5">
                      <span className={classNames("block truncate uppercase text-[12px]", sel ? "font-semibold" : "font-normal")}>
                        {opt.text}
                      </span>
                      {opt.cargo && (
                        <span className="block truncate uppercase text-[10px] text-slate-600">
                          {opt.cargo}
                        </span>
                      )}
                      {opt.empresa && (
                        <span className="block truncate uppercase text-[10px] text-slate-500">
                          {opt.empresa}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
          </div>
        </FloatingList>
      </div>
      <div className="w-full flex justify-end">
        <span className="text-[10px] text-slate-500 tech-info">{status}</span>
      </div>
    </div>
  );
};

// History page with React state + effects (no legacy DOM logic).
export const HistoryPage = ({ defaultFromDate = "", defaultToDate = "" }: Props) => {
  const locale = useMemo(() => getUiLocale(), []);
  const canViewHistory = canAccess("VISITAS_HISTORIAL", "View");
  const noDataText = indT("Common_NoData", "No data");

  const activatorRef = useRef<HTMLDivElement | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [selectingStep, setSelectingStep] = useState<"start" | "end" | "done">("start");
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [isOpen, setIsOpen] = useState(false);
  const [activeQuickFilter, setActiveQuickFilter] = useState<QuickFilterId | null>(null);
  const [selectedClient, setSelectedClient] = useState<ClientOption | null>(null);
  const [clientResetKey, setClientResetKey] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const [items, setItems] = useState<ActivityItem[]>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const hasRestoredFilterRef = useRef(false);
  const didInitFilterRef = useRef(false);
  const retryOnNetworkErrorRef = useRef(false);
  const activeAbortRef = useRef<AbortController | null>(null);
  const activeRequestIdRef = useRef(0);
  const retryTimerRef = useRef<number | null>(null);
  const lastSignatureRef = useRef("");
  const debugLoggedRef = useRef(0);

  const fromDateValue = useMemo(() => (startDate ? toISO(startDate) : ""), [startDate]);
  const toDateValue = useMemo(() => (endDate ? toISO(endDate) : ""), [endDate]);
  const accountNumValue = useMemo(() => (selectedClient ? selectedClient.value : ""), [selectedClient]);

  useEffect(() => {
    logHistory("init", { defaultFromDate, defaultToDate });
  }, [defaultFromDate, defaultToDate]);

  // Reads the cached filter from sessionStorage.
  const readCachedFilter = useCallback((): CachedFilter | null => {
    try {
      const raw = sessionStorage.getItem(HISTORY_FILTER_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object") return null;
      return {
        fromDate: parsed.fromDate || "",
        toDate: parsed.toDate || "",
        page: parsed.page,
        clientAccount: parsed.clientAccount || "",
        clientText: parsed.clientText || "",
      };
    } catch {
      return null;
    }
  }, []);

  // Clears the cached filter in sessionStorage.
  const clearFilterCache = useCallback(() => {
    try {
      sessionStorage.removeItem(HISTORY_FILTER_KEY);
    } catch {
      // ignore cache errors
    }
  }, []);

  // Consumes the return flag used to restore filters after navigation.
  const consumeReturnFlag = useCallback(() => {
    try {
      const raw = sessionStorage.getItem(HISTORY_RETURN_FLAG_KEY);
      if (raw === "1") {
        sessionStorage.removeItem(HISTORY_RETURN_FLAG_KEY);
        return true;
      }
    } catch {
      // ignore cache errors
    }
    return false;
  }, []); 

  // Fetches activities from MVC with CSRF protection and retry on initial network error.
  const loadActivities = useCallback(
    async (page: number, override?: { fromDate: string; toDate: string; accountNum?: string }) => {
      const fromDateStr = override?.fromDate ?? fromDateValue;
      const toDateStr = override?.toDate ?? toDateValue;
      const accountNumStr = override?.accountNum ?? accountNumValue;

      if (!fromDateStr || !toDateStr) {
        setIsLoading(false);
        setItems([]);
        setTotal(0);
        setErrorMessage("");
        return;
      }

      setCurrentPage(page);

      if (retryTimerRef.current) {
        clearTimeout(retryTimerRef.current);
        retryTimerRef.current = null;
      }

      const requestId = ++activeRequestIdRef.current;
      if (activeAbortRef.current) {
        try {
          activeAbortRef.current.abort();
        } catch {
          // ignore abort errors
        }
      }
      const controller = new AbortController();
      activeAbortRef.current = controller;

      const filterSignature = `${fromDateStr}|${toDateStr}|${accountNumStr}|${page}`;
      lastSignatureRef.current = filterSignature;

      setIsLoading(true);
      setItems([]);
      setTotal(0);
      setErrorMessage("");

      const payload = {
        fromDate: fromDateStr,
        toDate: toDateStr,
        accountNum: accountNumStr,
      };

      logHistory("loadActivities:request", { page, pageSize: PAGE_SIZE, payload });

      let response: Response;
      try {
        const token = getCsrfToken();
        const headers: Record<string, string> = { "Content-Type": "application/json" };
        if (token) headers.RequestVerificationToken = token;

        response = await fetch(`/Historial/GetActivities?page=${page}&pageSize=${PAGE_SIZE}`, {
          method: "POST",
          headers,
          body: JSON.stringify(payload),
          credentials: "same-origin",
          signal: controller.signal,
        });
      } catch (err: any) {
        if (requestId !== activeRequestIdRef.current) return;
        if (err?.name === "AbortError") {
          activeAbortRef.current = null;
          return;
        }
        if (retryOnNetworkErrorRef.current) {
          retryOnNetworkErrorRef.current = false;
          activeAbortRef.current = null;
          retryTimerRef.current = window.setTimeout(() => {
            if (requestId !== activeRequestIdRef.current) return;
            if (lastSignatureRef.current !== filterSignature) return;
            loadActivities(page, { fromDate: fromDateStr, toDate: toDateStr, accountNum: accountNumStr });
          }, 600);
          return;
        }
        setIsLoading(false);
        setErrorMessage(indT("Api_RequestFailed", "No se pudo conectar con el servidor (red)."));
        activeAbortRef.current = null;
        return;
      }

      if (requestId !== activeRequestIdRef.current) return;

      if (response.status === 403) {
        setIsLoading(false);
        activeAbortRef.current = null;
        showPermissionModal();
        return;
      }

      if (!response.ok) {
        const statusText = response.statusText || "Error del servidor";
        setIsLoading(false);
        setErrorMessage(`${response.status} - ${statusText}. Verifica el backend.`);
        activeAbortRef.current = null;
        return;
      }

      const raw = await response.text();
      let data: HistoryResponse;
      try {
        data = JSON.parse(raw);
      } catch {
        setIsLoading(false);
        setErrorMessage(indT("Api_InvalidJson", "Error procesando datos"));
        activeAbortRef.current = null;
        return;
      }

      if (requestId !== activeRequestIdRef.current) return;

      logHistory("loadActivities:response", {
        status: response.status,
        total: data?.total ?? 0,
        count: Array.isArray(data?.items) ? data.items.length : 0,
      });

      setIsLoading(false);
      setItems(data.items || []);
      setTotal(data.total || (data.items || []).length);
      activeAbortRef.current = null;
    },
    [fromDateValue, toDateValue, accountNumValue]
  );

  const applyDefaultRange = useCallback(() => {
    const today = startOfDay(new Date());
    const defaultStart = new Date(today);
    defaultStart.setDate(today.getDate() - 7);

    let start = defaultStart;
    let end = today;

    if (isBefore(end, start)) {
      const swap = start;
      start = end;
      end = swap;
    }

    setStartDate(start);
    setEndDate(end);
    setSelectingStep("done");
    setHoverDate(null);
    setCurrentMonth(start.getMonth());
    setCurrentYear(start.getFullYear());
    setActiveQuickFilter(null);
    setSelectedClient(null);
    setIsOpen(false);
    setShowFilters(false);
    retryOnNetworkErrorRef.current = true;
    loadActivities(1, { fromDate: toISO(start), toDate: toISO(end), accountNum: "" });
  }, [loadActivities]);

  // Resets filters and clears local state.
  const resetHistoryFilters = useCallback(() => {
    setStartDate(null);
    setEndDate(null);
    setSelectingStep("start");
    setHoverDate(null);
    setCurrentMonth(new Date().getMonth());
    setCurrentYear(new Date().getFullYear());
    setActiveQuickFilter(null);
    setSelectedClient(null);
    setClientResetKey((prev) => prev + 1);
    clearFilterCache();
    setItems([]);
    setTotal(0);
    setErrorMessage("");
    setIsLoading(false);
  }, [clearFilterCache]);

  // Applies a cached filter from sessionStorage.
  const applyCachedFilter = useCallback(
    (filter: CachedFilter | null) => {
      if (!filter || !filter.fromDate || !filter.toDate) return false;
      const start = parseISO(filter.fromDate);
      const end = parseISO(filter.toDate);
      setStartDate(start);
      setEndDate(end);
      setSelectingStep(end ? "done" : "end");
      setHoverDate(null);
      setCurrentMonth(start ? start.getMonth() : new Date().getMonth());
      setCurrentYear(start ? start.getFullYear() : new Date().getFullYear());
      setActiveQuickFilter(null);
      if (filter.clientAccount) {
        setSelectedClient({ value: filter.clientAccount, text: filter.clientText || filter.clientAccount });
      } else {
        setSelectedClient(null);
      }
      const pageVal = Number(filter.page);
      const pageToLoad = Number.isFinite(pageVal) && pageVal > 0 ? pageVal : 1;
      retryOnNetworkErrorRef.current = true;
      loadActivities(pageToLoad, { fromDate: filter.fromDate, toDate: filter.toDate, accountNum: filter.clientAccount || "" });
      return true;
    },
    [loadActivities]
  );

  // Restore cached filter on initial mount only.
  useEffect(() => {
    if (didInitFilterRef.current) return;
    didInitFilterRef.current = true;
    const cached = consumeReturnFlag() ? readCachedFilter() : null;
    if (cached && cached.fromDate && cached.toDate) {
      logHistory("restoreFilter", cached);
      applyCachedFilter(cached);
      setShowFilters(false);
      setIsOpen(false);
      hasRestoredFilterRef.current = true;
    } else {
      clearFilterCache();
      applyDefaultRange();
    }
  }, [applyCachedFilter, applyDefaultRange, clearFilterCache, consumeReturnFlag, readCachedFilter]);

  // Keep the picker step in sync with current selection.
  useEffect(() => {
    if (startDate && !endDate && selectingStep === "start") {
      setSelectingStep("end");
      return;
    }
    if (!startDate && selectingStep !== "start") {
      setSelectingStep("start");
    }
  }, [startDate, endDate, selectingStep]);

  // Close the calendar when clicking outside the picker.
  useEffect(() => {
    if (!isOpen) return;
    const handleOutside = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      if (popoverRef.current?.contains(target)) return;
      if (activatorRef.current?.contains(target)) return;
      logHistory("closePopover:outside");
      setIsOpen(false);
      setHoverDate(null);
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [isOpen]);

  // Re-apply filters after returning from detail view.
  useEffect(() => {
    const onPageShow = () => {
      if (hasRestoredFilterRef.current) return;
      if (consumeReturnFlag()) {
        const cached = readCachedFilter();
        if (applyCachedFilter(cached)) {
          setShowFilters(false);
          setIsOpen(false);
          hasRestoredFilterRef.current = true;
          return;
        }
      }
      applyDefaultRange();
    };
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, [applyCachedFilter, applyDefaultRange, consumeReturnFlag, readCachedFilter]);

  useEffect(() => {
    const onToggleFilters = () => {
      setShowFilters((prev) => {
        const next = !prev;
        if (!next) {
          setIsOpen(false);
        }
        return next;
      });
    };
    const onRefresh = () => {
      if (!fromDateValue || !toDateValue) return;
      loadActivities(currentPage, { fromDate: fromDateValue, toDate: toDateValue, accountNum: accountNumValue });
    };
    window.addEventListener("history-toggle-filter", onToggleFilters);
    window.addEventListener("history-refresh", onRefresh);
    return () => {
      window.removeEventListener("history-toggle-filter", onToggleFilters);
      window.removeEventListener("history-refresh", onRefresh);
    };
  }, [accountNumValue, currentPage, fromDateValue, loadActivities, toDateValue]);

  const handleSelect = useCallback(
    (dateObj: Date) => {
      logHistory("handleSelect", {
        clicked: toISO(dateObj),
        start: fromDateValue,
        end: toDateValue,
        selectingStep,
      });
      setActiveQuickFilter("custom");
      if (!startDate || endDate) {
        setStartDate(dateObj);
        setEndDate(null);
        setSelectingStep("end");
        setCurrentMonth(dateObj.getMonth());
        setCurrentYear(dateObj.getFullYear());
        return;
      }

      if (startDate && isBefore(dateObj, startDate)) {
        setStartDate(dateObj);
        setEndDate(null);
        setSelectingStep("end");
        setCurrentMonth(dateObj.getMonth());
        setCurrentYear(dateObj.getFullYear());
        return;
      }

      const newStart = startDate;
      const newEnd = dateObj;
      setStartDate(newStart);
      setEndDate(newEnd);
      setSelectingStep("done");
      setCurrentMonth(dateObj.getMonth());
      setCurrentYear(dateObj.getFullYear());
      setHoverDate(null);
      setIsOpen(false);
      loadActivities(1, { fromDate: toISO(newStart), toDate: toISO(newEnd), accountNum: accountNumValue });
    },
    [accountNumValue, endDate, fromDateValue, loadActivities, selectingStep, startDate, toDateValue]
  );

  const handleClear = useCallback(
    (event: ReactMouseEvent) => {
      event.stopPropagation();
      logHistory("clearRange");
      setActiveQuickFilter(null);
      resetHistoryFilters();
      setIsOpen(false);
      setShowFilters(true);
    },
    [resetHistoryFilters]
  );

  const openPopover = useCallback((section: "start" | "end") => {
    logHistory("openPopover", { section, start: fromDateValue, end: toDateValue, selectingStep });
    setActiveQuickFilter("custom");
    if (section === "end" && !startDate) {
      setSelectingStep("start");
    } else {
      setSelectingStep(section);
    }
    setIsOpen(true);
  }, [fromDateValue, selectingStep, startDate, toDateValue]);

  const applyQuickRange = useCallback(
    (filterId: QuickFilterId, start: Date, end: Date) => {
      const startDay = startOfDay(start);
      const endDay = startOfDay(end);
      setStartDate(startDay);
      setEndDate(endDay);
      setSelectingStep("done");
      setHoverDate(null);
      setCurrentMonth(startDay.getMonth());
      setCurrentYear(startDay.getFullYear());
      setIsOpen(false);
      setActiveQuickFilter(filterId);
      loadActivities(1, { fromDate: toISO(startDay), toDate: toISO(endDay), accountNum: accountNumValue });
    },
    [accountNumValue, loadActivities]
  );

  const handleQuickFilter = useCallback(
    (filterId: QuickFilterId) => {
      if (filterId === "custom") {
        openPopover("start");
        return;
      }

      const today = startOfDay(new Date());

      if (filterId === "this-week") {
        const start = startOfWeek(today);
        const end = endOfWeek(start);
        applyQuickRange(filterId, start, end);
        return;
      }

      if (filterId === "last-week") {
        const startThisWeek = startOfWeek(today);
        const start = new Date(startThisWeek);
        start.setDate(startThisWeek.getDate() - 7);
        const end = endOfWeek(start);
        applyQuickRange(filterId, start, end);
        return;
      }

      if (filterId === "this-month") {
        const start = new Date(today.getFullYear(), today.getMonth(), 1);
        applyQuickRange(filterId, start, today);
        return;
      }

      if (filterId === "last-month") {
        const start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const end = new Date(today.getFullYear(), today.getMonth(), 0);
        applyQuickRange(filterId, start, end);
      }
    },
    [applyQuickRange, openPopover]
  );

  const handleClientSelected = useCallback(
    (client: ClientOption | null) => {
      setSelectedClient(client);
    },
    []
  );

  const handleNavigate = useCallback(
    (linkId: string) => {
      if (!canViewHistory) {
        showPermissionModal();
        return;
      }
      setTimeout(() => {
        try {
            sessionStorage.setItem(
            HISTORY_FILTER_KEY,
            JSON.stringify({
              fromDate: fromDateValue || "",
              toDate: toDateValue || "",
              page: currentPage,
              clientAccount: selectedClient?.value || "",
              clientText: selectedClient?.text || "",
            })
          );
          sessionStorage.setItem(HISTORY_RETURN_FLAG_KEY, "1");
        } catch {
          // ignore cache errors
        }
        const target = encodeURIComponent(linkId);
        window.location.href = `/Visitas/Detalle/${target}`;
      }, NAV_DELAY_MS);
    },
    [canViewHistory, currentPage, fromDateValue, toDateValue, selectedClient]
  );

  const calendar = useMemo(() => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const offset = (firstDay.getDay() + 6) % 7;
    const cells: CalendarCell[] = [];
    for (let i = 0; i < offset; i++) {
      cells.push({ date: null, iso: "", isEmpty: true });
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const dateObj = new Date(currentYear, currentMonth, d);
      cells.push({ date: dateObj, iso: toISO(dateObj), isEmpty: false });
    }
    return {
      cells,
      label: formatMonthLabel(firstDay, locale),
    };
  }, [currentMonth, currentYear, locale]);

  const previewEnd = endDate || (selectingStep === "end" ? hoverDate : null);

  const timelineItems: TimelineItem[] = useMemo(() => {
    return items.map((x) => {
      const actividadIdRaw = (x.actividadId ?? x.ActividadId ?? "").toString().trim();
      const actividadId = actividadIdRaw || "";
      const recIdRaw = x.recId ?? x.RecId ?? "";
      const recId = recIdRaw && !Number.isNaN(Number(recIdRaw)) ? Number(recIdRaw) : null;
      let linkId = actividadId || (recId ? recId.toString() : "");

      if (debugLoggedRef.current < 5) {
        console.debug("activity item", { actividadId, recIdRaw, recId, raw: x });
        debugLoggedRef.current += 1;
      }

      const rawName = (x.name ?? x.Name ?? "").toString().trim();
      const fullName = toTitleCase(rawName, locale);
      const fecha = (x.transDate ?? x.TransDate ?? "").toString();
      const rawDesc = (x.description ?? x.Description ?? "").toString().trim();
      const fullDesc = rawDesc;

      const isNoDataCard = !rawName && !rawDesc;
      if (isNoDataCard) {
        linkId = "";
      }

      return {
        id: linkId,
        actividadId,
        recId,
        name: fullName,
        description: fullDesc || noDataText,
        fullName,
        fullDesc,
        dateParts: formatDateParts(fecha, locale),
        isNoData: isNoDataCard,
      };
    });
  }, [items, locale, noDataText]);

  const totalPages = Math.ceil((total || 0) / PAGE_SIZE);

  const labelFrom = toSentenceCase(indT("History_From", "From"), locale);
  const labelTo = toSentenceCase(indT("History_To", "To"), locale);
  const summaryFrom = labelFrom;
  const summaryTo = labelTo;
  const filterTitle = indT("History_Filter_Date", "Date");
  const clearLabel = indT("History_Filter_Clear", "Clear");
  const applyLabel = indT("History_Filter_Apply", "Apply");
  const clientLabel = indT("History_Filter_Client", "Client");
  const quickCustomLabel = indT("History_Quick_Custom", "Dates");
  const quickThisWeekLabel = indT("History_Quick_ThisWeek", "This week");
  const quickLastWeekLabel = indT("History_Quick_LastWeek", "Last week");
  const quickThisMonthLabel = indT("History_Quick_ThisMonth", "This month");
  const quickLastMonthLabel = indT("History_Quick_LastMonth", "Last month");
  const quickFilters = [
    { id: "custom" as const, label: quickCustomLabel },
    { id: "this-week" as const, label: quickThisWeekLabel },
    { id: "last-week" as const, label: quickLastWeekLabel },
    { id: "this-month" as const, label: quickThisMonthLabel },
    { id: "last-month" as const, label: quickLastMonthLabel },
  ];
  const showFilterActions = showFilters;
  const showSummary = !showFilters && !!startDate && !!endDate;

  return (
    <div className="max-w-3xl mx-auto px-1 sm:px-2 pt-3 pb-4 space-y-2">
      {showSummary && (
        <div className="filter-card filter-card--summary p-3 sm:p-4 mt-1 mb-3">
          <div className="history-filter-summary flex flex-wrap items-center gap-x-3 gap-y-2 text-xs">
            <span className="font-semibold">{summaryFrom}:</span>
            <span>{startDate ? formatDisplay(startDate, locale) : "--"}</span>
            <span className="font-semibold">{summaryTo}:</span>
            <span>{endDate ? formatDisplay(endDate, locale) : "--"}</span>
          </div>
          {selectedClient && (
            <div className="history-filter-summary mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs">
              <span className="font-semibold">{clientLabel}:</span>
              <span className="max-w-full truncate">{selectedClient.text}</span>
            </div>
          )}
        </div>
      )}
      {showFilters && (
      <div className="filter-card filter-card--expanded p-2 sm:p-2.5 relative">
        <div className="space-y-1.5 history-filter-stack flex flex-col">
          <QuickFilterSlider
            items={quickFilters}
            activeId={activeQuickFilter}
            onSelect={handleQuickFilter}
            ariaLabel={filterTitle}
            useStarBorder={true}
          />

          {activeQuickFilter === "custom" && (
          <div className="relative">
              <div id="drpActivator" ref={activatorRef} className="drp w-full" onClick={() => openPopover("start")}>
                <div
                  className={classNames("drp-section", selectingStep === "start" && isOpen ? "active" : "")}
                  data-section="start"
                  onClick={(e) => {
                    e.stopPropagation();
                    openPopover("start");
                  }}
                >
                  <div className="drp-label">{labelFrom}</div>
                  <div className="drp-value">
                    <i className="bi bi-calendar3 drp-icon" />
                    <span id="drpStartValue">
                      {startDate ? formatDisplay(startDate, locale) : indT("History_AddDate", "Add date")}
                    </span>
                  </div>
                </div>

                <div className="drp-separator hidden sm:flex">
                  <i className="bi bi-arrow-right" />
                </div>
                <div className="drp-separator-mobile flex sm:hidden" />

                <div
                  className={classNames("drp-section", selectingStep === "end" && isOpen ? "active" : "")}
                  data-section="end"
                  onClick={(e) => {
                    e.stopPropagation();
                    openPopover("end");
                  }}
                >
                  <div className="drp-label">{labelTo}</div>
                  <div className="drp-value">
                    <i className="bi bi-calendar3 drp-icon" />
                    <span id="drpEndValue">
                      {endDate ? formatDisplay(endDate, locale) : indT("History_AddDate", "Add date")}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  id="drpClear"
                  className="drp-clear"
                  aria-label={indT("History_ClearRange", "Clear range")}
                  style={{ display: startDate || endDate ? "inline-flex" : "none" }}
                  onClick={handleClear}
                >
                  <i className="bi bi-x-lg" />
                </button>
              </div>

              <div id="drpPopover" ref={popoverRef} className="drp-popover" hidden={!isOpen}>
                <div className="drp-head">
                  <button
                    type="button"
                    className="drp-nav"
                    data-dir="prev"
                    aria-label={indT("History_PrevMonth", "Previous month")}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentMonth((prev) => {
                        const next = prev - 1;
                        if (next < 0) {
                          setCurrentYear((year) => year - 1);
                          return 11;
                        }
                        return next;
                      });
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 30 30" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <div id="drpMonthLabel" className="drp-month">{calendar.label}</div>
                  <button
                    type="button"
                    className="drp-nav"
                    data-dir="next"
                    aria-label={indT("History_NextMonth", "Next month")}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentMonth((prev) => {
                        const next = prev + 1;
                        if (next > 11) {
                          setCurrentYear((year) => year + 1);
                          return 0;
                        }
                        return next;
                      });
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 30 30" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
                <div className="drp-weekdays">
                  <span>{indT("History_Day_Mon", "Mon")}</span>
                  <span>{indT("History_Day_Tue", "Tue")}</span>
                  <span>{indT("History_Day_Wed", "Wed")}</span>
                  <span>{indT("History_Day_Thu", "Thu")}</span>
                  <span>{indT("History_Day_Fri", "Fri")}</span>
                  <span>{indT("History_Day_Sat", "Sat")}</span>
                  <span>{indT("History_Day_Sun", "Sun")}</span>
                </div>
                <div
                  id="drpGrid"
                  className="drp-grid"
                  onMouseLeave={() => {
                    setHoverDate(null);
                  }}
                >
                  {calendar.cells.map((cell, idx) => {
                    if (cell.isEmpty) {
                      return <button key={`empty-${idx}`} className="drp-day empty" disabled />;
                    }

                    const dateObj = cell.date as Date;
                    const isStart = sameDay(dateObj, startDate);
                    const isEnd = sameDay(dateObj, endDate);
                    const inRange = startDate && previewEnd && isBefore(startDate, dateObj) && isBefore(dateObj, previewEnd);
                    const hoverRange = startDate && !endDate && hoverDate && isBefore(startDate, dateObj) && isBefore(dateObj, hoverDate);
                    const disabled = selectingStep === "end" && !!startDate && isBefore(dateObj, startDate);
                    const isToday = sameDay(dateObj, new Date());

                    const dayClass = classNames(
                      "drp-day",
                      isStart ? "start range-start" : "",
                      isEnd ? "end range-end" : "",
                      inRange ? "in-range" : "",
                      hoverRange ? "hover-range" : "",
                      disabled ? "disabled" : "",
                      isToday ? "today" : ""
                    );

                    return (
                      <button
                        key={cell.iso}
                        type="button"
                        className={dayClass}
                        data-date={cell.iso}
                        disabled={disabled}
                        onClick={(e) => {
                          logHistory("dayClick", { date: cell.iso, disabled });
                          handleSelect(dateObj);
                        }}
                        onMouseEnter={() => {
                          if (selectingStep === "end" && startDate) {
                            setHoverDate(new Date(dateObj));
                          }
                        }}
                      >
                        {dateObj.getDate()}
                      </button>
                    );
                  })}
                </div>
                <div id="drpStatus" className="drp-status">
                  {selectingStep === "start"
                    ? indT("History_Status_SelectStart", "Select start date")
                    : indT("History_Status_SelectEnd", "Select end date")}
                </div>
              </div>
          </div>
          )}

          <HistoryClientCombobox key={clientResetKey} value={selectedClient} onSelected={handleClientSelected} />

          {showFilterActions && (
            <div className="mt-auto grid grid-cols-2 gap-2 pt-1 history-filter-actions">
              <StarBorder
                as="button"
                type="button"
                className="w-full"
                contentClassName="w-full rounded-full border border-transparent bg-[#00296bc4] text-[11px] font-semibold text-[#e2e8f0] hover:bg-[#00296be0] py-1.5 px-3"
                color="#00296bc4"
                speed="2.5s"
                thickness={2.5}
                useDefaultStyle={false}
                onClick={() => {
                  resetHistoryFilters();
                  setIsOpen(false);
                  setShowFilters(true);
                }}
              >
                {clearLabel}
              </StarBorder>
              <StarBorder
                as="button"
                type="button"
                className="w-full"
                contentClassName="w-full rounded-full border border-transparent bg-[#00296bc4] text-[11px] font-semibold text-[#e2e8f0] hover:bg-[#00296be0] py-1.5 px-3"
                color="#00296bc4"
                speed="2.5s"
                thickness={2.5}
                useDefaultStyle={false}
                onClick={() => {
                  if (!startDate || !endDate) return;
                  const signature = `${fromDateValue}|${toDateValue}|${accountNumValue}|1`;
                  if (lastSignatureRef.current !== signature) {
                    loadActivities(1, { fromDate: fromDateValue, toDate: toDateValue, accountNum: accountNumValue });
                  }
                  setIsOpen(false);
                  setShowFilters(false);
                }}
              >
                {applyLabel}
              </StarBorder>
            </div>
          )}
        </div>
      </div>
      )}

      <input type="hidden" id="fromDate" value={fromDateValue} readOnly />
      <input type="hidden" id="toDate" value={toDateValue} readOnly />

      <div
        id="resultsLoader"
        className="loader-box glass-panel shadow-card flex items-center gap-2 text-sm text-slate-700"
        style={{ display: isLoading ? "flex" : "none" }}
      >
        <svg className="ind-spinner h-5 w-5" viewBox="0 0 20 20" role="status" aria-label={indT("History_Loading", "Loading")}>
          <circle className="ind-spinner__circle" cx="10" cy="10" r="8" strokeWidth="2" />
        </svg>
        {indT("History_Loading", "Loading")}
      </div>

      <HistoryTable
        items={timelineItems}
        noDataText={indT("History_NoDataInRange", "No visits in this range")}
        errorMessage={errorMessage}
        onNavigate={handleNavigate}
      />

      <ul id="pagination" className={classNames("pagination", totalPages > 1 ? "flex flex-wrap gap-2 justify-center" : "")}> 
        {totalPages > 1 &&
          Array.from({ length: totalPages }, (_val, index) => {
            const page = index + 1;
            const isActive = page === currentPage;
            return (
              <button
                key={`page-${page}`}
                type="button"
                className={classNames(
                  "min-w-7.5 px-2.5 py-1 rounded-md border text-[11px] font-semibold transition",
                  isActive
                    ? "bg-[#00296be0] border-[#00296be0] text-white shadow-sm"
                    : "border-slate-300 text-slate-700 hover:border-primary hover:text-primary"
                )}
                onClick={(e) => {
                  e.preventDefault();
                  loadActivities(page);
                }}
              >
                {page}
              </button>
            );
          })}
      </ul>
    </div>
  );
};

// Mount helper for the legacy Razor view.
export const mountHistoryPage = (root: HTMLElement) => {
  const defaultFromDate = root.getAttribute("data-default-from") || "";
  const defaultToDate = root.getAttribute("data-default-to") || "";

  const element = <HistoryPage defaultFromDate={defaultFromDate} defaultToDate={defaultToDate} />;
  const existing = (root as HTMLElement & { __indRoot?: import("react-dom/client").Root }).__indRoot;

  if (existing) {
    existing.render(element);
    return;
  }

  const reactRoot = createRoot(root);
  (root as HTMLElement & { __indRoot?: import("react-dom/client").Root }).__indRoot = reactRoot;
  reactRoot.render(element);
};

const mount = () => {
  const rootEl = document.getElementById("visitas-history-root");
  if (!rootEl) return;
  mountHistoryPage(rootEl);
};

if (typeof document !== "undefined") {
  if (document.readyState === "complete" || document.readyState === "interactive") {
    mount();
  } else {
    document.addEventListener("DOMContentLoaded", mount);
  }
}

export default HistoryPage;
