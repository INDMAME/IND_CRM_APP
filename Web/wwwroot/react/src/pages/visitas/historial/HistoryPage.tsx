import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import { createRoot } from "react-dom/client";
import { classNames } from "../../../utils/classNames.ts";
import { indT } from "../../../utils/indI18n.ts";
import { canAccess, showPermissionModal } from "../../../utils/permissions.ts";
import { getCsrfToken } from "../../../services/apiService.ts";
import { HISTORY_FILTER_KEY, HISTORY_RETURN_FLAG_KEY } from "../../../utils/visitasHistory.ts";
import ClientSearchCombobox, { ClientOption } from "../../../components/visitas/ClientSearchCombobox.tsx";
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
      setShowFilters(false);
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
      setShowFilters(false);
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
  const showResults = !showFilters;

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
            <div className="history-filter-summary mt-1.5 flex items-center gap-2 text-xs min-w-0">
              <span className="font-semibold shrink-0">{clientLabel}:</span>
              <span className="min-w-0 flex-1 truncate">{selectedClient.text}</span>
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
            className="history-quick-filters"
            itemClassName="text-[11px] font-semibold py-1 px-3"
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

          <ClientSearchCombobox
            key={clientResetKey}
            value={selectedClient}
            onSelected={handleClientSelected}
            label={indT("History_Filter_Client", "Client")}
            placeholder={indT("History_Filter_Client", "Client")}
            variant="compact"
            showLabel={false}
            idBase="history-client"
            portalClassName="visitas-typography"
          />

          {showFilterActions && (
            <div className="mt-1 grid grid-cols-2 gap-2 history-filter-actions">
              <button
                type="button"
                className="w-full rounded-full border border-transparent bg-[#00296bc4] text-[11px] font-semibold text-[#e2e8f0] hover:bg-[#00296be0] py-1 px-3"
                onClick={() => {
                  resetHistoryFilters();
                  setIsOpen(false);
                  setShowFilters(true);
                }}
              >
                {clearLabel}
              </button>
              <button
                type="button"
                className="w-full rounded-full border border-transparent bg-[#00296bc4] text-[11px] font-semibold text-[#e2e8f0] hover:bg-[#00296be0] py-1 px-3"
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
              </button>
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

      {showResults && (
        <>
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
        </>
      )}
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
