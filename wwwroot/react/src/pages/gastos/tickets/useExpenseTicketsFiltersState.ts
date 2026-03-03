import { useCallback, useMemo, useState } from "react";
import type {
  ExpenseTicketAppliedFilterSnapshot,
  ExpenseTicketQuickFilterId,
} from "./expenseTicketListTypes.ts";
import type { ExpenseGastoTypeCode } from "../expenseTypes.ts";
import type { ExpenseTicketStatusFilterCode } from "../constants/expenseTicketStatusCatalog.ts";
import { startOfDay, toIsoDate } from "../utils/expenseUiUtils.ts";
import { normalizeExpenseTicketFilterSnapshot } from "./expenseTicketFilterSnapshot.ts";

type UseExpenseTicketsFiltersStateArgs = {
  onApplyFilters: (snapshot: ExpenseTicketAppliedFilterSnapshot) => void;
  onClearFilters: () => void;
};

// Owns filter UI state and apply/clear rules for expense tickets list page.
export const useExpenseTicketsFiltersState = ({ onApplyFilters, onClearFilters }: UseExpenseTicketsFiltersStateArgs) => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [filterKey, setFilterKey] = useState("");
  const [currencyCode, setCurrencyCode] = useState("");
  const [statusFilter, setStatusFilter] = useState<ExpenseTicketStatusFilterCode>("");
  const [gastoTypeFilter, setGastoTypeFilter] = useState<"" | ExpenseGastoTypeCode>("");
  const [processedByIaFilter, setProcessedByIaFilter] = useState<"all" | "yes" | "no">("all");
  const [activeQuickFilter, setActiveQuickFilter] = useState<ExpenseTicketQuickFilterId | null>(null);
  const [showManualDateFilter, setShowManualDateFilter] = useState(false);
  const [showManualDateError, setShowManualDateError] = useState(false);
  const [manualDateAutoOpenKey, setManualDateAutoOpenKey] = useState(0);
  const [appliedFilters, setAppliedFilters] = useState<ExpenseTicketAppliedFilterSnapshot | null>(null);
  const [showFilters, setShowFilters] = useState(true);

  const currentFilters = useMemo<ExpenseTicketAppliedFilterSnapshot>(
    () => ({
      fromDate,
      toDate,
      filterKey: filterKey.trim(),
      currencyCode: currencyCode.trim(),
      statusFilter,
      gastoTypeFilter,
      processedByIaFilter,
    }),
    [currencyCode, filterKey, fromDate, gastoTypeFilter, processedByIaFilter, statusFilter, toDate]
  );

  const onApply = useCallback(() => {
    if (!fromDate || !toDate) {
      setShowManualDateError(true);
      setShowManualDateFilter(true);
      setActiveQuickFilter("custom");
      return;
    }

    const snapshot: ExpenseTicketAppliedFilterSnapshot = {
      fromDate,
      toDate,
      filterKey: filterKey.trim(),
      currencyCode: currencyCode.trim(),
      statusFilter,
      gastoTypeFilter,
      processedByIaFilter,
    };

    setShowManualDateError(false);
    setAppliedFilters(snapshot);
    setShowManualDateFilter(false);
    setShowFilters(false);
    onApplyFilters(snapshot);
  }, [currencyCode, filterKey, fromDate, gastoTypeFilter, onApplyFilters, processedByIaFilter, statusFilter, toDate]);

  // Rehydrates ticket filters from a cached snapshot when returning from detail.
  const restoreAppliedFilters = useCallback((snapshot: ExpenseTicketAppliedFilterSnapshot) => {
    const normalized = normalizeExpenseTicketFilterSnapshot(snapshot);
    setFromDate(normalized.fromDate);
    setToDate(normalized.toDate);
    setFilterKey(normalized.filterKey);
    setCurrencyCode(normalized.currencyCode);
    setStatusFilter(normalized.statusFilter);
    setGastoTypeFilter(normalized.gastoTypeFilter);
    setProcessedByIaFilter(normalized.processedByIaFilter);
    setActiveQuickFilter(null);
    setShowManualDateFilter(false);
    setShowManualDateError(false);
    setAppliedFilters(normalized);
    setShowFilters(false);
  }, []);

  const onClear = useCallback(() => {
    setFromDate("");
    setToDate("");
    setFilterKey("");
    setCurrencyCode("");
    setStatusFilter("");
    setGastoTypeFilter("");
    setProcessedByIaFilter("all");
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
      const hasFullRange = !!nextFromDate && !!nextToDate;
      setFromDate(nextFromDate);
      setToDate(nextToDate);
      if (!hasFullRange) {
        setShowManualDateFilter(true);
      }
      setActiveQuickFilter("custom");
      if (showManualDateError) {
        setShowManualDateError(!hasFullRange);
      }
    },
    [showManualDateError]
  );

  const onManualRangeComplete = useCallback((nextFromDate: string, nextToDate: string) => {
    setFromDate(nextFromDate);
    setToDate(nextToDate);
    setActiveQuickFilter("custom");
    setShowManualDateError(false);
    setShowManualDateFilter(false);
  }, []);

  const onQuickFilterChange = useCallback(
    (filterId: ExpenseTicketQuickFilterId) => {
      if (filterId === "custom") {
        if (showManualDateFilter) {
          setShowManualDateFilter(false);
          setShowManualDateError(false);
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
    [showManualDateFilter]
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
    filterKey,
    currencyCode,
    statusFilter,
    gastoTypeFilter,
    processedByIaFilter,
    activeQuickFilter,
    showManualDateFilter,
    showManualDateError,
    manualDateAutoOpenKey,
    appliedFilters,
    showFilters,
    currentFilters,
    setFilterKey,
    setCurrencyCode,
    setStatusFilter,
    setGastoTypeFilter,
    setProcessedByIaFilter,
    onApply,
    onClear,
    restoreAppliedFilters,
    onDateRangeChange,
    onManualRangeComplete,
    onQuickFilterChange,
    toggleFilterPanel,
  };
};
