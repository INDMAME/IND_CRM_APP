import React, { useCallback, useMemo, useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import type { ClientOption } from "../../../components/visitas/ClientSearchCombobox.tsx";
import type { HistoryCachedFilter } from "../../../hooks/useHistoryFilterCache.ts";

export type QuickFilterId = "custom" | "days-7" | "days-30" | "days-90";

export type LoadOverride = {
  fromDate: string;
  toDate: string;
  accountNum?: string;
  ownerAxUserId?: string;
};

export type FilterLoadRequest = {
  page: number;
  override: LoadOverride;
};

const HISTORY_QUICK_FILTER_RANGES: Array<{
  id: Exclude<QuickFilterId, "custom">;
  daysToSubtract: number;
}> = [
  { id: "days-7", daysToSubtract: 6 },
  { id: "days-30", daysToSubtract: 29 },
  { id: "days-90", daysToSubtract: 89 },
];

type UseHistoryFiltersStateArgs = {
  defaultFromDate: string;
  defaultToDate: string;
  logHistory: (message: string, data?: Record<string, unknown>) => void;
  parseDateValue: (value: string) => Date | null;
  parseISO: (value: string) => Date | null;
  toISO: (value: Date) => string;
  startOfDay: (value: Date) => Date;
  isBefore: (a: Date | null, b: Date | null) => boolean;
};

// Encapsulates history filter state and date-range orchestration.
export const useHistoryFiltersState = ({
  defaultFromDate,
  defaultToDate,
  logHistory,
  parseDateValue,
  parseISO,
  toISO,
  startOfDay,
  isBefore,
}: UseHistoryFiltersStateArgs) => {
  const resolveQuickFilterFromRange = useCallback(
    (start: Date | null, end: Date | null): QuickFilterId | null => {
      if (!start || !end) {
        return null;
      }

      const normalizedStart = startOfDay(start);
      const normalizedEnd = startOfDay(end);
      const today = startOfDay(new Date());
      if (toISO(normalizedEnd) !== toISO(today)) {
        return null;
      }

      for (const entry of HISTORY_QUICK_FILTER_RANGES) {
        const candidateStart = new Date(today);
        candidateStart.setDate(today.getDate() - entry.daysToSubtract);
        if (toISO(normalizedStart) === toISO(candidateStart)) {
          return entry.id;
        }
      }

      return null;
    },
    [startOfDay, toISO]
  );

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
  const [selectedOwnerAxUserId, setSelectedOwnerAxUserId] = useState("");
  const [clientResetKey, setClientResetKey] = useState(0);
  const [showFilters, setShowFilters] = useState(true);
  const [showManualError, setShowManualError] = useState(false);

  const hasRestoredFilterRef = useRef(false);
  const didInitFilterRef = useRef(false);

  const fromDateValue = useMemo(() => (startDate ? toISO(startDate) : ""), [startDate, toISO]);
  const toDateValue = useMemo(() => (endDate ? toISO(endDate) : ""), [endDate, toISO]);
  const accountNumValue = useMemo(() => (selectedClient ? selectedClient.value : ""), [selectedClient]);

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

  // Applies a default date range and returns the load payload needed by the page.
  const applyDefaultRangeFromProps = useCallback((): FilterLoadRequest | null => {
    if (!defaultFromDate || !defaultToDate) return null;
    const startRaw = parseDateValue(defaultFromDate);
    const endRaw = parseDateValue(defaultToDate);
    if (!startRaw || !endRaw) return null;

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
    setActiveQuickFilter(resolveQuickFilterFromRange(start, end));
    setSelectedClient(null);
    setSelectedOwnerAxUserId("");
    setIsOpen(false);

    return {
      page: 1,
      override: {
        fromDate: toISO(start),
        toDate: toISO(end),
        accountNum: "",
      },
    };
  }, [defaultFromDate, defaultToDate, isBefore, parseDateValue, resolveQuickFilterFromRange, startOfDay, toISO]);

  // Resets history filters local state only.
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
    setSelectedOwnerAxUserId("");
    setClientResetKey((prev) => prev + 1);
    setShowManualError(false);
  }, []);

  // Applies cached filters and returns the load payload needed by the page.
  const applyCachedFilter = useCallback(
    (filter: HistoryCachedFilter | null): FilterLoadRequest | null => {
      if (!filter || !filter.fromDate || !filter.toDate) return null;

      const start = parseISO(filter.fromDate);
      const end = parseISO(filter.toDate);
      setStartDate(start);
      setEndDate(end);
      setSelectingStep(end ? "done" : "end");
      setHoverDate(null);
      setCurrentMonth(start ? start.getMonth() : new Date().getMonth());
      setCurrentYear(start ? start.getFullYear() : new Date().getFullYear());
      setActiveQuickFilter(resolveQuickFilterFromRange(start, end));
      setShowManualPickerPanel(false);
      setShowManualError(false);

      if (filter.clientAccount) {
        setSelectedClient({ value: filter.clientAccount, text: filter.clientText || filter.clientAccount });
      } else {
        setSelectedClient(null);
      }
      setSelectedOwnerAxUserId(filter.ownerAxUserId || "");

      const pageVal = Number(filter.page);
      const pageToLoad = Number.isFinite(pageVal) && pageVal > 0 ? pageVal : 1;

      return {
        page: pageToLoad,
        override: {
          fromDate: filter.fromDate,
          toDate: filter.toDate,
          accountNum: filter.clientAccount || "",
          ownerAxUserId: filter.ownerAxUserId || "",
        },
      };
    },
    [parseISO, resolveQuickFilterFromRange]
  );

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
    [endDate, fromDateValue, isBefore, logHistory, selectingStep, startDate, toDateValue, toISO]
  );

  const handleClearState = useCallback(
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
    [logHistory, resetHistoryFilters]
  );

  const openPopover = useCallback(
    (section: "start" | "end") => {
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
    },
    [fromDateValue, logHistory, selectingStep, startDate, toDateValue]
  );

  const handleActivatorKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      openPopover("start");
    },
    [openPopover]
  );

  const handleSectionKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>, section: "start" | "end") => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      event.stopPropagation();
      openPopover(section);
    },
    [openPopover]
  );

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
    [startOfDay]
  );

  const handleQuickFilter = useCallback(
    (filterId: QuickFilterId) => {
      const today = startOfDay(new Date());

      if (filterId === "custom") {
        // Toggle manual panel on every Date button click.
        if (showManualPickerPanel) {
          setShowManualError(false);
          setHoverDate(null);
          setSelectingStep(startDate && endDate ? "done" : startDate ? "end" : "start");
          setIsOpen(false);
          setShowManualPickerPanel(false);
          return;
        }

        const nextStart = manualStartDate ? new Date(manualStartDate) : startDate ? new Date(startDate) : null;
        const nextEnd = manualEndDate ? new Date(manualEndDate) : endDate ? new Date(endDate) : null;
        setActiveQuickFilter("custom");
        setShowManualPickerPanel(true);
        setStartDate(nextStart);
        setEndDate(nextEnd);

        if (nextStart) {
          setCurrentMonth(nextStart.getMonth());
          setCurrentYear(nextStart.getFullYear());
        }

        // Always reopen the manual calendar when the custom date quick filter is pressed.
        setSelectingStep(nextStart && !nextEnd ? "end" : "start");
        setIsOpen(true);
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
    [applyQuickRange, endDate, manualEndDate, manualStartDate, showManualPickerPanel, startDate, startOfDay]
  );

  const handleClientSelected = useCallback((client: ClientOption | null) => {
    setSelectedClient(client);
  }, []);

  return {
    startDate,
    endDate,
    manualStartDate,
    manualEndDate,
    hoverDate,
    selectingStep,
    currentMonth,
    currentYear,
    isOpen,
    showManualPickerPanel,
    activeQuickFilter,
    selectedClient,
    selectedOwnerAxUserId,
    clientResetKey,
    showFilters,
    showManualError,
    fromDateValue,
    toDateValue,
    accountNumValue,
    hasRestoredFilterRef,
    didInitFilterRef,
    setStartDate,
    setEndDate,
    setManualStartDate,
    setManualEndDate,
    setHoverDate,
    setSelectingStep,
    setCurrentMonth,
    setCurrentYear,
    setIsOpen,
    setShowManualPickerPanel,
    setActiveQuickFilter,
    setSelectedClient,
    setSelectedOwnerAxUserId,
    setClientResetKey,
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
  };
};
