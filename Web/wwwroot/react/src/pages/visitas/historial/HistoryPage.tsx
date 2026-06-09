import React, { useMemo, useRef } from "react";
import { indT } from "../../../utils/indI18n.ts";
import { canAccess, showPermissionModal } from "../../../utils/permissions.ts";
import HistorySummary from "./HistorySummary.tsx";
import HistoryFilterPanel from "./HistoryFilterPanel.tsx";
import HistoryResultsSection from "./HistoryResultsSection.tsx";
import { useHistoryCalendarPicker } from "./useHistoryCalendarPicker.ts";
import { useHistoryFilterActions } from "./useHistoryFilterActions.ts";
import { useHistoryInitialLoad } from "./useHistoryInitialLoad.ts";
import { useHistoryLabels } from "./useHistoryLabels.ts";
import { useHistoryNavigation } from "./useHistoryNavigation.ts";
import { useHistoryPageListeners } from "./useHistoryPageListeners.ts";
import { useHistoryPickerStepSync } from "./useHistoryPickerStepSync.ts";
import { useHistoryTimelineItems } from "./useHistoryTimelineItems.ts";
import { useHistoryVisibleOwner } from "./useHistoryVisibleOwner.ts";
import FloatingActionButton from "../../../components/commons/FloatingActionButton.tsx";
import { useHistoryActivities } from "../../../hooks/useHistoryActivities.ts";
import { useHistoryFilterCache } from "../../../hooks/useHistoryFilterCache.ts";
import { useHistoryFiltersState } from "./useHistoryFiltersState.ts";
import { mountReactIsland, mountWhenDocumentReady } from "../../../utils/reactIsland.tsx";

type Props = {
  defaultFromDate?: string;
  defaultToDate?: string;
  companyId?: string;
  axUserId?: string;
  permissionsRevision?: string;
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

const ZH_MONTH_YEAR_FORMATTER = new Intl.DateTimeFormat("zh-CN", { year: "numeric", month: "long" });

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
    return ZH_MONTH_YEAR_FORMATTER.format(d);
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
  if (debugFlag !== true) return;
  if (data) {
    console.debug("[History]", message, data);
  } else {
    console.debug("[History]", message);
  }
};

// History page with React state + effects (no legacy DOM logic).
export const HistoryPage = ({
  defaultFromDate = "",
  defaultToDate = "",
  companyId = "",
  axUserId = "",
  permissionsRevision = "",
}: Props) => {
  const locale = useMemo(() => getUiLocale(), []);
  const canViewHistory = canAccess("VISITAS_GESTION", "View");
  const canCreateVisit = canAccess("VISITAS_GESTION", "Add");
  const noDataText = indT("Common_NoData", "No data");

  const activatorRef = useRef<HTMLDivElement | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);

  const { readCachedFilter, clearFilterCache, consumeReturnFlag, saveCachedFilter } = useHistoryFilterCache();
  const {
    startDate, endDate, hoverDate, selectingStep, currentMonth, currentYear, isOpen, showManualPickerPanel,
    activeQuickFilter, selectedClient, selectedOwnerAxUserId, clientResetKey, showFilters, showManualError,
    fromDateValue, toDateValue, accountNumValue, hasRestoredFilterRef, didInitFilterRef,
    setHoverDate, setSelectingStep, setCurrentMonth, setCurrentYear, setIsOpen, setShowFilters, setShowManualError,
    setSelectedOwnerAxUserId, validateManualRange, applyDefaultRangeFromProps, resetHistoryFilters, applyCachedFilter,
    handleSelect, handleClearState, openPopover, handleActivatorKeyDown, handleSectionKeyDown, handleQuickFilter,
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

  const { visibleVisitUsers, visibleUsersLoading, visibleUsersError, selectedOwnerText, effectiveSelectedOwnerAxUserId } =
    useHistoryVisibleOwner({
      enabled: canViewHistory,
      companyId,
      axUserId,
      permissionsRevision,
      selectedOwnerAxUserId,
      onDebug: logHistory,
    });

  const { items, total, currentPage, isLoading, errorMessage, loadActivities, resetActivities, retryOnNetworkErrorRef, lastSignatureRef } =
    useHistoryActivities({
      fromDateValue,
      toDateValue,
      accountNumValue,
      ownerAxUserIdValue: effectiveSelectedOwnerAxUserId,
      pageSize: PAGE_SIZE,
      normalizeRange,
      onForbidden: showPermissionModal,
      onDebug: logHistory,
    });

  const { applyFilters, handleClear, handleResetFilters } = useHistoryFilterActions({
    startDate,
    endDate,
    fromDateValue,
    toDateValue,
    accountNumValue,
    ownerAxUserIdValue: effectiveSelectedOwnerAxUserId,
    lastSignatureRef,
    validateManualRange,
    normalizeRange,
    loadActivities,
    handleClearState,
    clearFilterCache,
    resetActivities,
    resetHistoryFilters,
    setIsOpen,
    setShowFilters,
    setShowManualError,
  });

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

  useHistoryInitialLoad({
    defaultFromDate,
    defaultToDate,
    didInitFilterRef,
    hasRestoredFilterRef,
    retryOnNetworkErrorRef,
    consumeReturnFlag,
    readCachedFilter,
    applyCachedFilter,
    applyDefaultRangeFromProps,
    loadActivities,
    resetActivities,
    resetHistoryFilters,
    clearFilterCache,
    setShowFilters,
    setIsOpen,
    logHistory,
  });

  useHistoryPickerStepSync({ startDate, endDate, selectingStep, setSelectingStep });

  const handleNavigate = useHistoryNavigation({
    canViewHistory,
    currentPage,
    fromDateValue,
    toDateValue,
    selectedClient,
    ownerAxUserId: effectiveSelectedOwnerAxUserId,
    ownerText: selectedOwnerText,
    navDelayMs: NAV_DELAY_MS,
    saveCachedFilter,
    onForbidden: showPermissionModal,
  });

  const {
    calendarLabel, manualDayCells, handlePrevMonth, handleNextMonth,
    handleGridMouseLeave, handleManualDayClick, handleManualDayHover,
  } = useHistoryCalendarPicker({
    currentMonth,
    currentYear,
    locale,
    startDate,
    endDate,
    hoverDate,
    selectingStep,
    setCurrentMonth,
    setCurrentYear,
    setHoverDate,
    handleSelect,
    logHistory,
    toISO,
    isBefore,
    formatMonthLabel,
  });

  const { timelineItems } = useHistoryTimelineItems({
    items,
    locale,
    noDataText,
    logHistory,
    toTitleCase,
    formatDateParts,
  });

  const {
    labelFrom, labelTo, summaryFrom, summaryTo, filterTitle, addDateLabel, clearRangeLabel,
    prevMonthLabel, nextMonthLabel, statusSelectStartLabel, statusSelectEndLabel, weekDayLabels,
    clearLabel, applyLabel, clientLabel, ownerLabel, ownerAllLabel, ownerNoUsersLabel, ownerLoadingLabel,
    loadingLabel, noVisitsInRangeLabel, createLabel, quickFilters, paginationLabels,
  } = useHistoryLabels(locale);
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
            ownerLabel={ownerLabel}
            ownerValue={selectedOwnerText}
            showOwner={!!selectedOwnerText}
          />
        </div>
      )}
      {showFilters && (
        <HistoryFilterPanel
          activatorRef={activatorRef}
          popoverRef={popoverRef}
          quickFilters={quickFilters}
          activeQuickFilter={activeQuickFilter}
          showInlineSummary={showInlineSummary}
          showManualPicker={showManualPicker}
          summaryFromLabel={summaryFrom}
          summaryToLabel={summaryTo}
          fromValue={startDate ? formatDisplay(startDate, locale) : "--"}
          toValue={endDate ? formatDisplay(endDate, locale) : "--"}
          ownerLabel={ownerLabel}
          ownerValue={selectedOwnerText}
          filterTitle={filterTitle}
          showManualError={showManualError}
          showStartError={showManualError && !startDate}
          showEndError={showManualError && !endDate}
          isOpen={isOpen}
          selectingStep={selectingStep}
          labelFrom={labelFrom}
          labelTo={labelTo}
          startDateText={startDate ? formatDisplay(startDate, locale) : addDateLabel}
          endDateText={endDate ? formatDisplay(endDate, locale) : addDateLabel}
          clearRangeLabel={clearRangeLabel}
          hasSelectedRange={!!startDate || !!endDate}
          monthLabel={calendarLabel}
          weekDayLabels={weekDayLabels}
          statusText={selectingStep === "start" ? statusSelectStartLabel : statusSelectEndLabel}
          dayCells={manualDayCells}
          prevMonthLabel={prevMonthLabel}
          nextMonthLabel={nextMonthLabel}
          clientResetKey={clientResetKey}
          selectedClient={selectedClient}
          clientLabel={clientLabel}
          visibleVisitUsers={visibleVisitUsers}
          currentOwnerAxUserId={axUserId}
          selectedOwnerAxUserId={effectiveSelectedOwnerAxUserId}
          visibleUsersLoading={visibleUsersLoading}
          visibleUsersError={visibleUsersError}
          ownerAllLabel={ownerAllLabel}
          ownerNoUsersLabel={ownerNoUsersLabel}
          ownerLoadingLabel={ownerLoadingLabel}
          showFilterActions={showFilterActions}
          clearLabel={clearLabel}
          applyLabel={applyLabel}
          onQuickFilter={handleQuickFilter}
          onOpenPopover={openPopover}
          onActivatorKeyDown={handleActivatorKeyDown}
          onSectionKeyDown={handleSectionKeyDown}
          onClearDate={handleClear}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
          onGridMouseLeave={handleGridMouseLeave}
          onDayClick={handleManualDayClick}
          onDayHover={handleManualDayHover}
          onClientSelected={handleClientSelected}
          onOwnerChange={setSelectedOwnerAxUserId}
          onResetFilters={handleResetFilters}
          onApplyFilters={() => {
            applyFilters({ closePanel: true, page: 1 });
          }}
        />
      )}

      <input type="hidden" id="fromDate" value={fromDateValue} readOnly />
      <input type="hidden" id="toDate" value={toDateValue} readOnly />

      <HistoryResultsSection
        showResults={showResults}
        isLoading={isLoading}
        loadingLabel={loadingLabel}
        timelineItems={timelineItems}
        noDataText={noVisitsInRangeLabel}
        errorMessage={errorMessage}
        totalPages={totalPages}
        currentPage={currentPage}
        pageWindow={PAGE_WINDOW}
        paginationLabels={paginationLabels}
        onNavigate={handleNavigate}
        onPageChange={loadActivities}
      />
      {canCreateVisit && (
        <FloatingActionButton
          route="/Visitas/Create?fresh=1"
          ariaLabel={createLabel}
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
  const companyId = root.getAttribute("data-company-id") || "";
  const axUserId = root.getAttribute("data-ax-user-id") || "";
  const permissionsRevision = root.getAttribute("data-permissions-revision") || "";

  mountReactIsland(
    root,
    <HistoryPage
      defaultFromDate={defaultFromDate}
      defaultToDate={defaultToDate}
      companyId={companyId}
      axUserId={axUserId}
      permissionsRevision={permissionsRevision}
    />
  );
};

const mount = () => {
  const rootEl = document.getElementById("visitas-history-root");
  if (!rootEl) return;
  mountHistoryPage(rootEl);
};

mountWhenDocumentReady(mount);

export default HistoryPage;
