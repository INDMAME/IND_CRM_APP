import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { classNames } from "../../../utils/classNames.ts";
import { indT } from "../../../utils/indI18n.ts";
import { canAccess, showPermissionModal } from "../../../utils/permissions.ts";
import ClientSearchCombobox from "../../../components/visitas/ClientSearchCombobox.tsx";
import HistoryTable from "./HistoryTable.tsx";
import HistorySummary from "./HistorySummary.tsx";
import HistoryManualDatePicker, { HistoryManualDayCell } from "./HistoryManualDatePicker.tsx";
import { useHistoryPageListeners } from "./useHistoryPageListeners.ts";
import { useHistoryTimelineItems } from "./useHistoryTimelineItems.ts";
import FloatingActionButton from "../../../components/commons/FloatingActionButton.tsx";
import CompactPagination from "../../../components/commons/CompactPagination.tsx";
import FilterButton from "../../../components/commons/FilterButton.tsx";
import ActionButton from "../../../components/commons/ActionButton.tsx";
import { useHistoryActivities } from "../../../hooks/useHistoryActivities.ts";
import { useHistoryFilterCache } from "../../../hooks/useHistoryFilterCache.ts";
import { useHistoryFiltersState } from "./useHistoryFiltersState.ts";
import { mountReactIsland, mountWhenDocumentReady } from "../../../utils/reactIsland.tsx";

type Props = {
  defaultFromDate?: string;
  defaultToDate?: string;
};

type CalendarCell = {
  date: Date | null;
  iso: string;
  isEmpty: boolean;
};

const PAGE_SIZE = 6;
const PAGE_WINDOW = 6;
const NAV_DELAY_MS = 320;
const FAB_BASE_BOTTOM = 32;

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
  if (debugFlag !== true) return;
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

  const { readCachedFilter, clearFilterCache, consumeReturnFlag, saveCachedFilter } = useHistoryFilterCache();
  const {
    startDate,
    endDate,
    hoverDate,
    selectingStep,
    currentMonth,
    currentYear,
    isOpen,
    showManualPickerPanel,
    activeQuickFilter,
    selectedClient,
    clientResetKey,
    showFilters,
    showManualError,
    fromDateValue,
    toDateValue,
    accountNumValue,
    hasRestoredFilterRef,
    didInitFilterRef,
    setHoverDate,
    setSelectingStep,
    setCurrentMonth,
    setCurrentYear,
    setIsOpen,
    setShowFilters,
    setShowManualError,
    validateManualRange,
    applyDefaultRangeFromProps,
    resetHistoryFilters,
    applyCachedFilter,
    handleSelect,
    handleClearState,
    openPopover,
    handleActivatorKeyDown,
    handleSectionKeyDown,
    handleQuickFilter,
    handleClientSelected,
  } = useHistoryFiltersState({
    defaultFromDate,
    defaultToDate,
    logHistory,
    parseDateValue,
    parseISO,
    toISO,
    startOfDay,
    isBefore,
  });

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

  useHistoryPageListeners({
    isOpen,
    activatorRef,
    popoverRef,
    hasRestoredFilterRef,
    retryOnNetworkErrorRef,
    currentPage,
    logHistory,
    consumeReturnFlag,
    readCachedFilter,
    applyCachedFilter,
    loadActivities,
    setIsOpen,
    setHoverDate,
    setShowFilters,
    applyFilters,
  });

  // Restore cached filter on initial mount only.
  useEffect(() => {
    if (didInitFilterRef.current) return;
    didInitFilterRef.current = true;
    const cached = consumeReturnFlag() ? readCachedFilter() : null;
    if (cached && cached.fromDate && cached.toDate) {
      logHistory("restoreFilter", cached);
      const cachedRequest = applyCachedFilter(cached);
      if (cachedRequest) {
        retryOnNetworkErrorRef.current = true;
        loadActivities(cachedRequest.page, cachedRequest.override);
        setShowFilters(false);
        setIsOpen(false);
        hasRestoredFilterRef.current = true;
        return;
      }
    }

    const defaultRequest = applyDefaultRangeFromProps();
    if (defaultRequest) {
      retryOnNetworkErrorRef.current = true;
      loadActivities(defaultRequest.page, defaultRequest.override);
      setShowFilters(false);
      setIsOpen(false);
      hasRestoredFilterRef.current = true;
      return;
    }

    resetHistoryFilters();
    clearFilterCache();
    resetActivities();
    setShowFilters(true);
    setIsOpen(false);
  }, [
    applyCachedFilter,
    applyDefaultRangeFromProps,
    clearFilterCache,
    consumeReturnFlag,
    didInitFilterRef,
    hasRestoredFilterRef,
    loadActivities,
    readCachedFilter,
    resetActivities,
    resetHistoryFilters,
    retryOnNetworkErrorRef,
  ]);

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

  const handleClear = useCallback(
    (event: React.MouseEvent) => {
      handleClearState(event);
      clearFilterCache();
      resetActivities();
    },
    [clearFilterCache, handleClearState, resetActivities]
  );

  const handleResetFilters = useCallback(() => {
    resetHistoryFilters();
    clearFilterCache();
    resetActivities();
    setIsOpen(false);
    setShowFilters(true);
  }, [clearFilterCache, resetActivities, resetHistoryFilters, setIsOpen, setShowFilters]);

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

  const handlePrevMonth = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      setCurrentMonth((prev) => {
        const next = prev - 1;
        if (next < 0) {
          setCurrentYear((year) => year - 1);
          return 11;
        }
        return next;
      });
    },
    [setCurrentMonth, setCurrentYear]
  );

  const handleNextMonth = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      setCurrentMonth((prev) => {
        const next = prev + 1;
        if (next > 11) {
          setCurrentYear((year) => year + 1);
          return 0;
        }
        return next;
      });
    },
    [setCurrentMonth, setCurrentYear]
  );

  const handleGridMouseLeave = useCallback(() => {
    setHoverDate(null);
  }, [setHoverDate]);

  const handleManualDayClick = useCallback(
    (cell: HistoryManualDayCell) => {
      if (!cell.date) return;
      logHistory("dayClick", { date: cell.iso || "", disabled: !!cell.disabled });
      handleSelect(cell.date);
    },
    [handleSelect]
  );

  const handleManualDayHover = useCallback(
    (cell: HistoryManualDayCell) => {
      if (!cell.date) return;
      if (selectingStep === "end" && startDate) {
        setHoverDate(new Date(cell.date));
      }
    },
    [selectingStep, setHoverDate, startDate]
  );

  const manualDayCells = useMemo<HistoryManualDayCell[]>(() => {
    return calendar.cells.map((cell, idx) => {
      if (cell.isEmpty) {
        return { key: `empty-${idx}`, isEmpty: true };
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

      return {
        key: cell.iso,
        isEmpty: false,
        date: dateObj,
        iso: cell.iso,
        dayLabel: dateObj.getDate(),
        dayClass,
        disabled,
      };
    });
  }, [calendar.cells, endDate, hoverDate, previewEnd, selectingStep, startDate]);

  const { timelineItems } = useHistoryTimelineItems({
    items,
    locale,
    noDataText,
    logHistory,
    toTitleCase,
    formatDateParts,
  });

  const labelFrom = toSentenceCase(indT("History_From", "From"), locale);
  const labelTo = toSentenceCase(indT("History_To", "To"), locale);
  const summaryFrom = labelFrom;
  const summaryTo = labelTo;
  const filterTitle = indT("History_Filter_Date", "Date");
  const addDateLabel = indT("History_AddDate", "Add date");
  const clearRangeLabel = indT("History_ClearRange", "Clear range");
  const prevMonthLabel = indT("History_PrevMonth", "Previous month");
  const nextMonthLabel = indT("History_NextMonth", "Next month");
  const statusSelectStartLabel = indT("History_Status_SelectStart", "Select start date");
  const statusSelectEndLabel = indT("History_Status_SelectEnd", "Select end date");
  const weekDayLabels = useMemo(
    () => [
      indT("History_Day_Mon", "Mon"),
      indT("History_Day_Tue", "Tue"),
      indT("History_Day_Wed", "Wed"),
      indT("History_Day_Thu", "Thu"),
      indT("History_Day_Fri", "Fri"),
      indT("History_Day_Sat", "Sat"),
      indT("History_Day_Sun", "Sun"),
    ],
    []
  );
  const clearLabel = indT("History_Filter_Clear", "Clear");
  const applyLabel = indT("History_Filter_Apply", "Apply");
  const clientLabel = indT("History_Filter_Client", "Account");
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
  const showManualPicker = activeQuickFilter === "custom" && showManualPickerPanel;
  const showInlineSummary = !!startDate && !!endDate && !showManualPicker;

  return (
    <div className="max-w-3xl mx-auto px-1 sm:px-2 pt-3 pb-4 space-y-2">
      {showSummary && (
        <div className="filter-card filter-card--summary p-3 sm:p-4 mt-1 mb-3">
          <HistorySummary
            summaryFromLabel={summaryFrom}
            summaryToLabel={summaryTo}
            fromValue={startDate ? formatDisplay(startDate, locale) : "--"}
            toValue={endDate ? formatDisplay(endDate, locale) : "--"}
            clientLabel={clientLabel}
            clientValue={selectedClient?.text || ""}
            showClient={!!selectedClient}
          />
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
            <HistorySummary
              summaryFromLabel={summaryFrom}
              summaryToLabel={summaryTo}
              fromValue={startDate ? formatDisplay(startDate, locale) : "--"}
              toValue={endDate ? formatDisplay(endDate, locale) : "--"}
              className="gap-y-1 text-[11px] px-1"
            />
          )}

          {showManualPicker && (
            <HistoryManualDatePicker
              activatorRef={activatorRef}
              popoverRef={popoverRef}
              showManualError={showManualError}
              showStartError={showManualError && !startDate}
              showEndError={showManualError && !endDate}
              filterTitle={filterTitle}
              isOpen={isOpen}
              selectingStep={selectingStep}
              labelFrom={labelFrom}
              labelTo={labelTo}
              startDateText={startDate ? formatDisplay(startDate, locale) : addDateLabel}
              endDateText={endDate ? formatDisplay(endDate, locale) : addDateLabel}
              clearRangeLabel={clearRangeLabel}
              hasSelectedRange={!!startDate || !!endDate}
              monthLabel={calendar.label}
              weekDayLabels={weekDayLabels}
              statusText={selectingStep === "start" ? statusSelectStartLabel : statusSelectEndLabel}
              dayCells={manualDayCells}
              prevMonthLabel={prevMonthLabel}
              nextMonthLabel={nextMonthLabel}
              onOpenPopover={openPopover}
              onActivatorKeyDown={handleActivatorKeyDown}
              onSectionKeyDown={handleSectionKeyDown}
              onClear={handleClear}
              onPrevMonth={handlePrevMonth}
              onNextMonth={handleNextMonth}
              onGridMouseLeave={handleGridMouseLeave}
              onDayClick={handleManualDayClick}
              onDayHover={handleManualDayHover}
            />
          )}

          <ClientSearchCombobox
            key={clientResetKey}
            value={selectedClient}
            onSelected={handleClientSelected}
            label={indT("History_Filter_Client", "Account")}
            placeholder={indT("History_Filter_Client", "Account")}
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
                onClick={handleResetFilters}
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
            totalPages={totalPages}
            currentPage={currentPage}
            pageWindow={PAGE_WINDOW}
            loading={isLoading}
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
          bottom={FAB_BASE_BOTTOM}
        />
      )}
    </div>
  );
};

// Mount helper for the legacy Razor view.
export const mountHistoryPage = (root: HTMLElement) => {
  const defaultFromDate = root.getAttribute("data-default-from") || "";
  const defaultToDate = root.getAttribute("data-default-to") || "";

  mountReactIsland(root, <HistoryPage defaultFromDate={defaultFromDate} defaultToDate={defaultToDate} />);
};

const mount = () => {
  const rootEl = document.getElementById("visitas-history-root");
  if (!rootEl) return;
  mountHistoryPage(rootEl);
};

mountWhenDocumentReady(mount);

export default HistoryPage;
