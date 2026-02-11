import { useCallback, useMemo, useState } from "react";
import type { ExpenseQuickFilterId, AppliedFilterSnapshot } from "./expenseListTypes.ts";
import { startOfDay, toIsoDate } from "../utils/expenseUiUtils.ts";

type UseExpenseSheetsFiltersStateArgs = {
  onApplyFilters: (snapshot: AppliedFilterSnapshot) => void;
  onClearFilters: () => void;
};

// Owns filter UI state and apply/clear rules for expense list page.
export const useExpenseSheetsFiltersState = ({ onApplyFilters, onClearFilters }: UseExpenseSheetsFiltersStateArgs) => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [projectId, setProjectId] = useState("");
  const [hojaGastosId, setHojaGastosId] = useState("");
  const [currencyCode, setCurrencyCode] = useState("");
  const [billedMode, setBilledMode] = useState(2);
  const [activeQuickFilter, setActiveQuickFilter] = useState<ExpenseQuickFilterId | null>(null);
  const [showManualDateFilter, setShowManualDateFilter] = useState(false);
  const [showManualDateError, setShowManualDateError] = useState(false);
  const [manualDateAutoOpenKey, setManualDateAutoOpenKey] = useState(0);
  const [appliedFilters, setAppliedFilters] = useState<AppliedFilterSnapshot | null>(null);
  const [showFilters, setShowFilters] = useState(true);

  const currentFilters = useMemo<AppliedFilterSnapshot>(
    () => ({
      fromDate,
      toDate,
      projectId,
      hojaGastosId,
      currencyCode,
      billedMode,
      filter: hojaGastosId,
    }),
    [billedMode, currencyCode, fromDate, hojaGastosId, projectId, toDate]
  );

  const onApply = useCallback(() => {
    if (!fromDate || !toDate) {
      setShowManualDateError(true);
      setShowManualDateFilter(true);
      setActiveQuickFilter("custom");
      return;
    }

    const snapshot: AppliedFilterSnapshot = {
      fromDate,
      toDate,
      projectId,
      hojaGastosId,
      currencyCode,
      billedMode,
      filter: hojaGastosId,
    };

    setShowManualDateError(false);
    setAppliedFilters(snapshot);
    setShowManualDateFilter(false);
    setShowFilters(false);
    onApplyFilters(snapshot);
  }, [billedMode, currencyCode, fromDate, hojaGastosId, onApplyFilters, projectId, toDate]);

  const onClear = useCallback(() => {
    setFromDate("");
    setToDate("");
    setProjectId("");
    setHojaGastosId("");
    setCurrencyCode("");
    setBilledMode(2);
    setActiveQuickFilter(null);
    setShowManualDateFilter(false);
    setShowManualDateError(false);
    setManualDateAutoOpenKey(0);
    setAppliedFilters(null);
    setShowFilters(true);
    onClearFilters();
  }, [onClearFilters]);

  const onDateRangeChange = useCallback(
    (nextFromDate: string, nextToDate: string) => {
      setFromDate(nextFromDate);
      setToDate(nextToDate);
      setShowManualDateFilter(true);
      setActiveQuickFilter("custom");
      if (showManualDateError) {
        setShowManualDateError(!(nextFromDate && nextToDate));
      }
    },
    [showManualDateError]
  );

  const onQuickFilterChange = useCallback(
    (filterId: ExpenseQuickFilterId) => {
      if (filterId === "custom") {
        if (showManualDateFilter) {
          setShowManualDateFilter(false);
          setShowManualDateError(false);
          if (!fromDate || !toDate) {
            setActiveQuickFilter(null);
          }
          return;
        }

        setActiveQuickFilter("custom");
        setShowManualDateFilter(true);
        setShowManualDateError(false);
        setManualDateAutoOpenKey((previous) => previous + 1);
        return;
      }

      setActiveQuickFilter(filterId);
      setShowManualDateFilter(false);
      setShowManualDateError(false);

      const today = startOfDay(new Date());
      const nextFrom = new Date(today);
      if (filterId === "days-7") {
        nextFrom.setDate(today.getDate() - 6);
      } else if (filterId === "days-30") {
        nextFrom.setDate(today.getDate() - 29);
      } else {
        nextFrom.setDate(today.getDate() - 89);
      }

      setFromDate(toIsoDate(nextFrom));
      setToDate(toIsoDate(today));
    },
    [fromDate, showManualDateFilter, toDate]
  );

  const toggleFilterPanel = useCallback(() => {
    setShowFilters((previous) => {
      const next = !previous;
      if (!next) {
        setShowManualDateFilter(false);
      }
      return next;
    });
  }, []);

  return {
    fromDate,
    toDate,
    projectId,
    hojaGastosId,
    currencyCode,
    billedMode,
    activeQuickFilter,
    showManualDateFilter,
    showManualDateError,
    manualDateAutoOpenKey,
    appliedFilters,
    showFilters,
    currentFilters,
    setProjectId,
    setHojaGastosId,
    setCurrencyCode,
    setBilledMode,
    onApply,
    onClear,
    onDateRangeChange,
    onQuickFilterChange,
    toggleFilterPanel,
  };
};
