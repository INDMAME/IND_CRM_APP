import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { classNames } from "../../../utils/classNames";
import { indT } from "../../../utils/indI18n";
import { canAccess, showPermissionModal } from "../../../utils/permissions";
import { getCsrfToken } from "../../../services/apiService";
import { HISTORY_FILTER_KEY, HISTORY_RETURN_FLAG_KEY } from "../../../utils/visitasHistory";
import HistoryTable, { TimelineItem } from "./HistoryTable";

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
};

type CalendarCell = {
  date: Date | null;
  iso: string;
  isEmpty: boolean;
};

const PAGE_SIZE = 5;
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
    async (page: number, override?: { fromDate: string; toDate: string }) => {
      const fromDateStr = override?.fromDate ?? fromDateValue;
      const toDateStr = override?.toDate ?? toDateValue;

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

      const filterSignature = `${fromDateStr}|${toDateStr}|${page}`;
      lastSignatureRef.current = filterSignature;

      setIsLoading(true);
      setItems([]);
      setTotal(0);
      setErrorMessage("");

      const payload = {
        fromDate: fromDateStr,
        toDate: toDateStr,
      };

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
            loadActivities(page, { fromDate: fromDateStr, toDate: toDateStr });
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

      setIsLoading(false);
      setItems(data.items || []);
      setTotal(data.total || (data.items || []).length);
      activeAbortRef.current = null;
    },
    [fromDateValue, toDateValue]
  );

  // Resets filters and clears local state.
  const resetHistoryFilters = useCallback(() => {
    setStartDate(null);
    setEndDate(null);
    setSelectingStep("start");
    setHoverDate(null);
    setCurrentMonth(new Date().getMonth());
    setCurrentYear(new Date().getFullYear());
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
      const pageVal = Number(filter.page);
      const pageToLoad = Number.isFinite(pageVal) && pageVal > 0 ? pageVal : 1;
      retryOnNetworkErrorRef.current = true;
      loadActivities(pageToLoad, { fromDate: filter.fromDate, toDate: filter.toDate });
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
      hasRestoredFilterRef.current = true;
    } else {
      clearFilterCache();
      setStartDate(null);
      setEndDate(null);
      setSelectingStep("start");
    }
  }, [applyCachedFilter, clearFilterCache, consumeReturnFlag, readCachedFilter]);

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
          hasRestoredFilterRef.current = true;
          return;
        }
      }
      resetHistoryFilters();
    };
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, [applyCachedFilter, consumeReturnFlag, readCachedFilter, resetHistoryFilters]);

  const handleSelect = useCallback(
    (dateObj: Date) => {
      logHistory("handleSelect", {
        clicked: toISO(dateObj),
        start: fromDateValue,
        end: toDateValue,
        selectingStep,
      });
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
      loadActivities(1, { fromDate: toISO(newStart), toDate: toISO(newEnd) });
      setTimeout(() => setIsOpen(false), 120);
    },
    [endDate, fromDateValue, loadActivities, selectingStep, startDate, toDateValue]
  );

  const handleClear = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      logHistory("clearRange");
      resetHistoryFilters();
      setIsOpen(false);
    },
    [resetHistoryFilters]
  );

  const openPopover = useCallback((section: "start" | "end") => {
    logHistory("openPopover", { section, start: fromDateValue, end: toDateValue, selectingStep });
    if (section === "end" && !startDate) {
      setSelectingStep("start");
    } else {
      setSelectingStep(section);
    }
    setIsOpen(true);
  }, [fromDateValue, selectingStep, startDate, toDateValue]);

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
    [canViewHistory, currentPage, fromDateValue, toDateValue]
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

  const labelFrom = indT("History_From", "From").toUpperCase();
  const labelTo = indT("History_To", "To").toUpperCase();

  return (
    <div className="max-w-3xl mx-auto px-1 sm:px-2 pt-2 pb-3 space-y-2">
      <div className="timeline-card filter-card glass-panel shadow-card p-3 sm:p-4 relative">
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
              const disabled = selectingStep === "end" && startDate && isBefore(dateObj, startDate);
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

      <ul id="pagination" className={classNames("pagination", totalPages > 1 ? "flex flex-wrap gap-2" : "")}> 
        {totalPages > 1 &&
          Array.from({ length: totalPages }, (_val, index) => {
            const page = index + 1;
            const isActive = page === currentPage;
            return (
              <button
                key={`page-${page}`}
                type="button"
                className={classNames(
                  "min-w-[36px] px-3 py-1.5 rounded-lg border text-sm font-medium transition",
                  isActive
                    ? "bg-primary border-primary text-white shadow-sm"
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

export default HistoryPage;
