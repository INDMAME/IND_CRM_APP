import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import { createRoot } from "react-dom/client";
import { classNames } from "../../../utils/classNames.ts";
import { indT } from "../../../utils/indI18n.ts";
import { canAccess, showPermissionModal } from "../../../utils/permissions.ts";
import ClientSearchCombobox, { ClientOption } from "../../../components/visitas/ClientSearchCombobox.tsx";
import HistoryTable, { TimelineItem } from "./HistoryTable.tsx";
import FloatingActionButton from "../../../components/commons/FloatingActionButton.tsx";
import CompactPagination from "../../../components/commons/CompactPagination.tsx";
import FilterButton from "../../../components/commons/FilterButton.tsx";
import ActionButton from "../../../components/commons/ActionButton.tsx";
import { useHistoryActivities } from "../../../hooks/useHistoryActivities.ts";
import { useHistoryFilterCache } from "../../../hooks/useHistoryFilterCache.ts";

type Props = {
  defaultFromDate?: string;
  defaultToDate?: string;
};

type CalendarCell = {
  date: Date | null;
  iso: string;
  isEmpty: boolean;
};

type QuickFilterId = "custom" | "days-7" | "days-30" | "days-90";

const PAGE_SIZE = 6;
const PAGE_WINDOW = 6;
const NAV_DELAY_MS = 320;
const FAB_BASE_BOTTOM = 32;
const FAB_CLEARANCE = 24;
const FAB_GAP = 12;

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

const parseISO = (s: string) => {
  if (!s) return null;
  const parts = s.split("-").map(Number);
  if (parts.length !== 3) return null;
  return new Date(parts[0], parts[1] - 1, parts[2]);
};

const sameDay = (a: Date | null, b: Date | null) => !!(a && b && a.getTime() === b.getTime());

const isBefore = (a: Date | null, b: Date | null) => !!(a && b && a.getTime() < b.getTime());

  const normalizeRange = (from: string, to: string) => {
    if (!from || !to) return { from, to };
    const fromDate = parseISO(from);
    const toDate = parseISO(to);
    if (!fromDate || !toDate) return { from, to };
  if (isBefore(toDate, fromDate)) {
    return { from: toISO(toDate), to: toISO(fromDate) };
  }
  return { from: toISO(fromDate), to: toISO(toDate) };
};

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
  const canCreateVisit = canAccess("VISITAS_CREACION", "Add");
  const noDataText = indT("Common_NoData", "No data");

  const activatorRef = useRef<HTMLDivElement | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const paginationRef = useRef<HTMLDivElement | null>(null);

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [manualStartDate, setManualStartDate] = useState<Date | null>(null);
  const [manualEndDate, setManualEndDate] = useState<Date | null>(null);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [selectingStep, setSelectingStep] = useState<"start" | "end" | "done">("start");
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [isOpen, setIsOpen] = useState(false);
  const [showManualPickerPanel, setShowManualPickerPanel] = useState(false);
  const [activeQuickFilter, setActiveQuickFilter] = useState<QuickFilterId | null>(null);
  const [selectedClient, setSelectedClient] = useState<ClientOption | null>(null);
  const [clientResetKey, setClientResetKey] = useState(0);
  const [showFilters, setShowFilters] = useState(true);
  const [showManualError, setShowManualError] = useState(false);
  const [fabBottom, setFabBottom] = useState(FAB_BASE_BOTTOM);

  const hasRestoredFilterRef = useRef(false);
  const didInitFilterRef = useRef(false);
  const debugLoggedRef = useRef(0);

  const fromDateValue = useMemo(() => (startDate ? toISO(startDate) : ""), [startDate]);
  const toDateValue = useMemo(() => (endDate ? toISO(endDate) : ""), [endDate]);
  const accountNumValue = useMemo(() => (selectedClient ? selectedClient.value : ""), [selectedClient]);

  const { readCachedFilter, clearFilterCache, consumeReturnFlag, saveCachedFilter } = useHistoryFilterCache();
  const { items, total, currentPage, isLoading, errorMessage, loadActivities, resetActivities, retryOnNetworkErrorRef, lastSignatureRef } =
    useHistoryActivities({
      fromDateValue,
      toDateValue,
      accountNumValue,
      pageSize: PAGE_SIZE,
      normalizeRange,
      onForbidden: showPermissionModal,
      onDebug: logHistory,
    });

  useEffect(() => {
    logHistory("init", { defaultFromDate, defaultToDate });
  }, [defaultFromDate, defaultToDate]);

  const validateManualRange = useCallback(() => {
    if (activeQuickFilter === "custom" && (!startDate || !endDate)) {
      setShowManualError(true);
      setSelectingStep(!startDate ? "start" : "end");
      setShowManualPickerPanel(true);
      setIsOpen(true);
      setShowFilters(true);
      return false;
    }
    return true;
  }, [activeQuickFilter, endDate, startDate]);

  const applyFilters = useCallback(
    (options?: { closePanel?: boolean; force?: boolean; page?: number }) => {
      if (!validateManualRange()) return;
      if (!startDate || !endDate) return;

      const normalized = normalizeRange(fromDateValue, toDateValue);
      const page = options?.page ?? 1;
      const signature = `${normalized.from}|${normalized.to}|${accountNumValue}|${page}`;

      if (options?.force || lastSignatureRef.current !== signature) {
        loadActivities(page, { fromDate: normalized.from, toDate: normalized.to, accountNum: accountNumValue });
      }

      setShowManualError(false);
      if (options?.closePanel) {
        setIsOpen(false);
        setShowFilters(false);
      }
    },
    [accountNumValue, endDate, fromDateValue, loadActivities, startDate, toDateValue, validateManualRange]
  );

  const totalPages = Math.ceil((total || 0) / PAGE_SIZE);

  // Keep the floating action button clear of pagination on small screens.
  const updateFabBottom = useCallback(() => {
    if (!paginationRef.current || totalPages <= 1) {
      setFabBottom(FAB_BASE_BOTTOM);
      return;
    }
    const height = paginationRef.current.offsetHeight || 0;
    const next = Math.max(FAB_BASE_BOTTOM, height + FAB_CLEARANCE + FAB_GAP);
    setFabBottom((prev) => (Math.abs(prev - next) < 1 ? prev : next));
  }, [totalPages]);

  // Applies a default range when provided by the server.
  const applyDefaultRangeFromProps = useCallback(() => {
    if (!defaultFromDate || !defaultToDate) return false;
    const startRaw = parseDateValue(defaultFromDate);
    const endRaw = parseDateValue(defaultToDate);
    if (!startRaw || !endRaw) return false;

    const startDay = startOfDay(startRaw);
    const endDay = startOfDay(endRaw);

    let start = startDay;
    let end = endDay;
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
    retryOnNetworkErrorRef.current = true;
    loadActivities(1, { fromDate: toISO(start), toDate: toISO(end), accountNum: "" });
    return true;
  }, [defaultFromDate, defaultToDate, loadActivities]);

  // Resets filters and clears local state.
  const resetHistoryFilters = useCallback(() => {
    setStartDate(null);
    setEndDate(null);
    setManualStartDate(null);
    setManualEndDate(null);
    setSelectingStep("start");
    setHoverDate(null);
    setCurrentMonth(new Date().getMonth());
    setCurrentYear(new Date().getFullYear());
    setActiveQuickFilter(null);
    setShowManualPickerPanel(false);
    setSelectedClient(null);
    setClientResetKey((prev) => prev + 1);
    setShowManualError(false);
    clearFilterCache();
    resetActivities();
  }, [clearFilterCache, resetActivities]);

  // Applies a cached filter from sessionStorage.
  const applyCachedFilter = useCallback(
    (filter: ReturnType<typeof readCachedFilter>) => {
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
      setShowManualPickerPanel(false);
      setShowManualError(false);
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
    [loadActivities, readCachedFilter]
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
      return;
    }
    if (applyDefaultRangeFromProps()) {
      setShowFilters(false);
      setIsOpen(false);
      hasRestoredFilterRef.current = true;
      return;
    }
    resetHistoryFilters();
    setShowFilters(true);
    setIsOpen(false);
  }, [applyCachedFilter, applyDefaultRangeFromProps, consumeReturnFlag, readCachedFilter, resetHistoryFilters]);

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
      // Keep current state when no cached filter is available.
    };
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, [applyCachedFilter, consumeReturnFlag, readCachedFilter]);

  useEffect(() => {
    updateFabBottom();
    let observer: ResizeObserver | null = null;
    const paginationEl = paginationRef.current;
    if (paginationEl && typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(() => updateFabBottom());
      observer.observe(paginationEl);
    }
    window.addEventListener("resize", updateFabBottom);
    return () => {
      window.removeEventListener("resize", updateFabBottom);
      if (observer) observer.disconnect();
    };
  }, [updateFabBottom]);

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
      applyFilters({ page: currentPage, force: true, closePanel: true });
    };
    window.addEventListener("history-toggle-filter", onToggleFilters);
    window.addEventListener("history-refresh", onRefresh);
    return () => {
      window.removeEventListener("history-toggle-filter", onToggleFilters);
      window.removeEventListener("history-refresh", onRefresh);
    };
  }, [applyFilters, currentPage]);

  const handleSelect = useCallback(
    (dateObj: Date) => {
      logHistory("handleSelect", {
        clicked: toISO(dateObj),
        start: fromDateValue,
        end: toDateValue,
        selectingStep,
      });
      setShowManualError(false);
      setActiveQuickFilter("custom");
      setShowManualPickerPanel(true);
      const hasStart = !!startDate;
      const hasEnd = !!endDate;

      if (selectingStep === "end") {
        if (!hasStart) {
          setStartDate(dateObj);
          setEndDate(null);
          setSelectingStep("end");
          setCurrentMonth(dateObj.getMonth());
          setCurrentYear(dateObj.getFullYear());
          return;
        }

        let newStart = startDate as Date;
        let newEnd = dateObj;
        if (isBefore(newEnd, newStart)) {
          const swap = newStart;
          newStart = newEnd;
          newEnd = swap;
        }

        setStartDate(newStart);
        setEndDate(newEnd);
        setManualStartDate(newStart);
        setManualEndDate(newEnd);
        setSelectingStep("done");
        setCurrentMonth(newEnd.getMonth());
        setCurrentYear(newEnd.getFullYear());
        setHoverDate(null);
        setIsOpen(false);
        setShowManualPickerPanel(false);
        return;
      }

      const newStart = dateObj;
      if (hasEnd && endDate && isBefore(endDate, newStart)) {
        setStartDate(newStart);
        setEndDate(null);
        setSelectingStep("end");
        setCurrentMonth(newStart.getMonth());
        setCurrentYear(newStart.getFullYear());
        return;
      }

      setStartDate(newStart);
      if (hasEnd && endDate) {
        setEndDate(endDate);
        setManualStartDate(newStart);
        setManualEndDate(endDate);
        setSelectingStep("done");
        setHoverDate(null);
        setIsOpen(false);
        setShowManualPickerPanel(false);
      } else {
        setEndDate(null);
        setSelectingStep("end");
      }
      setCurrentMonth(newStart.getMonth());
      setCurrentYear(newStart.getFullYear());
    },
    [endDate, fromDateValue, selectingStep, startDate, toDateValue]
  );

  const handleClear = useCallback(
    (event: ReactMouseEvent) => {
      event.stopPropagation();
      logHistory("clearRange");
      setActiveQuickFilter(null);
      setShowManualError(false);
      setShowManualPickerPanel(false);
      resetHistoryFilters();
      setIsOpen(false);
      setShowFilters(true);
    },
    [resetHistoryFilters]
  );

  const openPopover = useCallback((section: "start" | "end") => {
    logHistory("openPopover", { section, start: fromDateValue, end: toDateValue, selectingStep });
    setShowManualError(false);
    setActiveQuickFilter("custom");
    setShowManualPickerPanel(true);
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
      setShowManualPickerPanel(false);
      setActiveQuickFilter(filterId);
      setShowManualError(false);
    },
    []
  );

  const handleQuickFilter = useCallback(
    (filterId: QuickFilterId) => {
      const today = startOfDay(new Date());

      if (filterId === "custom") {
        if (showManualPickerPanel) {
          setShowManualError(false);
          setHoverDate(null);
          setIsOpen(false);
          setShowManualPickerPanel(false);
          return;
        }

        const nextStart = manualStartDate ? new Date(manualStartDate) : null;
        const nextEnd = manualEndDate ? new Date(manualEndDate) : null;
        setActiveQuickFilter("custom");
        setShowManualPickerPanel(true);
        setStartDate(nextStart);
        setEndDate(nextEnd);
        if (nextStart) {
          setCurrentMonth(nextStart.getMonth());
          setCurrentYear(nextStart.getFullYear());
        }
        if (nextStart && nextEnd) {
          setSelectingStep("done");
          setIsOpen(false);
        } else {
          setSelectingStep(nextStart && !nextEnd ? "end" : "start");
          setIsOpen(true);
        }
        setHoverDate(null);
        setShowManualError(false);
        return;
      }

      if (filterId === "days-7") {
        const start = new Date(today);
        start.setDate(today.getDate() - 6);
        applyQuickRange(filterId, start, today);
        return;
      }

      if (filterId === "days-30") {
        const start = new Date(today);
        start.setDate(today.getDate() - 29);
        applyQuickRange(filterId, start, today);
        return;
      }

      if (filterId === "days-90") {
        const start = new Date(today);
        start.setDate(today.getDate() - 89);
        applyQuickRange(filterId, start, today);
      }
    },
    [applyQuickRange, manualEndDate, manualStartDate, showManualPickerPanel]
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
        saveCachedFilter({
          fromDate: fromDateValue || "",
          toDate: toDateValue || "",
          page: currentPage,
          clientAccount: selectedClient?.value || "",
          clientText: selectedClient?.text || "",
        });
        const target = encodeURIComponent(linkId);
        window.location.href = `/Visitas/Detalle/${target}`;
      }, NAV_DELAY_MS);
    },
    [canViewHistory, currentPage, fromDateValue, saveCachedFilter, toDateValue, selectedClient]
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

  const labelFrom = toSentenceCase(indT("History_From", "From"), locale);
  const labelTo = toSentenceCase(indT("History_To", "To"), locale);
  const summaryFrom = labelFrom;
  const summaryTo = labelTo;
  const filterTitle = indT("History_Filter_Date", "Date");
  const clearLabel = indT("History_Filter_Clear", "Clear");
  const applyLabel = indT("History_Filter_Apply", "Apply");
  const clientLabel = indT("History_Filter_Client", "Client");
  const quickCustomLabel = indT("History_Quick_Custom", "Date");
  const quick7DaysLabel = indT("History_Quick_7Days", "7 days");
  const quick30DaysLabel = indT("History_Quick_30Days", "30 days");
  const quick90DaysLabel = indT("History_Quick_90Days", "90 days");
  const pageFirstLabel = indT("History_Page_First", "First");
  const pagePrevLabel = indT("History_Page_Prev", "Previous");
  const pageNextLabel = indT("History_Page_Next", "Next");
  const pageLastLabel = indT("History_Page_Last", "Last");
  const quickFilters = useMemo(
    () => [
      { id: "custom" as const, label: quickCustomLabel },
      { id: "days-7" as const, label: quick7DaysLabel },
      { id: "days-30" as const, label: quick30DaysLabel },
      { id: "days-90" as const, label: quick90DaysLabel },
    ],
    [quick30DaysLabel, quick7DaysLabel, quick90DaysLabel, quickCustomLabel]
  );
  const paginationLabels = useMemo(
    () => ({
      first: pageFirstLabel,
      prev: pagePrevLabel,
      next: pageNextLabel,
      last: pageLastLabel,
    }),
    [pageFirstLabel, pageLastLabel, pageNextLabel, pagePrevLabel]
  );
  const showFilterActions = showFilters;
  const showSummary = !showFilters && !!startDate && !!endDate;
  const showResults = !showFilters;
  const manualRangeReady = !!manualStartDate && !!manualEndDate;
  const showInlineSummary =
    !!startDate &&
    !!endDate &&
    !isOpen &&
    (activeQuickFilter !== "custom" || manualRangeReady);
  const showManualPicker = activeQuickFilter === "custom" && showManualPickerPanel;

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
          <div className="grid grid-cols-2 gap-2 history-quick-filters" aria-label={filterTitle}>
            {quickFilters.map((item) => {
              const isActive = activeQuickFilter === item.id;
              return (
                <FilterButton
                  key={item.id}
                  label={item.label}
                  active={isActive}
                  className="w-full"
                  onClick={() => handleQuickFilter(item.id)}
                />
              );
            })}
          </div>

          {showInlineSummary && (
            <div className="history-filter-summary flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] px-1">
              <span className="font-semibold">{summaryFrom}:</span>
              <span>{startDate ? formatDisplay(startDate, locale) : "--"}</span>
              <span className="font-semibold">{summaryTo}:</span>
              <span>{endDate ? formatDisplay(endDate, locale) : "--"}</span>
            </div>
          )}

          {showManualPicker && (
          <div className="relative">
              <div
                id="drpActivator"
                ref={activatorRef}
                className={classNames("drp w-full", showManualError ? "drp-error" : "")}
                onClick={() => openPopover("start")}
              >
                <div
                  className={classNames(
                    "drp-section",
                    selectingStep === "start" && isOpen ? "active" : "",
                    showManualError && !startDate ? "is-error" : ""
                  )}
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
                  className={classNames(
                    "drp-section",
                    selectingStep === "end" && isOpen ? "active" : "",
                    showManualError && !endDate ? "is-error" : ""
                  )}
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
              <ActionButton
                label={clearLabel}
                className="w-full"
                onClick={() => {
                  resetHistoryFilters();
                  setIsOpen(false);
                  setShowFilters(true);
                }}
              />
              <ActionButton
                label={applyLabel}
                className="w-full"
                onClick={() => {
                  applyFilters({ closePanel: true, page: 1 });
                }}
              />
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

          <CompactPagination
            ref={paginationRef}
            totalPages={totalPages}
            currentPage={currentPage}
            pageWindow={PAGE_WINDOW}
            onPageChange={(page) => loadActivities(page)}
            labels={paginationLabels}
          />
        </>
      )}
      {canCreateVisit && (
        <FloatingActionButton
          route="/Visitas/Create?fresh=1"
          ariaLabel={indT("Common_Create", "Create")}
          size={76}
          right={16}
          bottom={fabBottom}
        />
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
