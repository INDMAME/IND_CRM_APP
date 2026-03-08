import { useCallback, useEffect, useMemo, useState } from "react";
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
  defaultManagedUserId: string;
  fixedStatusFilter?: ExpenseTicketStatusFilterCode | null;
  allowEmptyDatesOnApply?: boolean;
};

// Owns filter UI state and apply/clear rules for expense tickets list page.
export const useExpenseTicketsFiltersState = ({
  onApplyFilters,
  onClearFilters,
  defaultManagedUserId,
  fixedStatusFilter = null,
  allowEmptyDatesOnApply = false,
}: UseExpenseTicketsFiltersStateArgs) => {
  const hasFixedStatusFilter = fixedStatusFilter === 0 || fixedStatusFilter === 1;

  const resolveStatusFilter = useCallback(
    (value: ExpenseTicketStatusFilterCode): ExpenseTicketStatusFilterCode => {
      if (hasFixedStatusFilter) {
        return fixedStatusFilter as ExpenseTicketStatusFilterCode;
      }
      return value;
    },
    [fixedStatusFilter, hasFixedStatusFilter]
  );

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [filterKey, setFilterKey] = useState("");
  const [currencyCode, setCurrencyCode] = useState("");
  const [managedUserId, setManagedUserId] = useState(defaultManagedUserId);
  const [statusFilterRaw, setStatusFilterRaw] = useState<ExpenseTicketStatusFilterCode>(resolveStatusFilter(""));
  const [gastoTypeFilter, setGastoTypeFilter] = useState<"" | ExpenseGastoTypeCode>("");
  const [processedByIaFilter, setProcessedByIaFilter] = useState<"all" | "yes" | "no">("all");
  const [activeQuickFilter, setActiveQuickFilter] = useState<ExpenseTicketQuickFilterId | null>(null);
  const [showManualDateFilter, setShowManualDateFilter] = useState(false);
  const [showManualDateError, setShowManualDateError] = useState(false);
  const [manualDateAutoOpenKey, setManualDateAutoOpenKey] = useState(0);
  const [appliedFilters, setAppliedFilters] = useState<ExpenseTicketAppliedFilterSnapshot | null>(null);
  const [showFilters, setShowFilters] = useState(true);

  useEffect(() => {
    if (!hasFixedStatusFilter) return;
    setStatusFilterRaw(fixedStatusFilter as ExpenseTicketStatusFilterCode);
  }, [fixedStatusFilter, hasFixedStatusFilter]);

  const statusFilter = resolveStatusFilter(statusFilterRaw);

  const currentFilters = useMemo<ExpenseTicketAppliedFilterSnapshot>(
    () => ({
      fromDate,
      toDate,
      filterKey: filterKey.trim(),
      currencyCode: currencyCode.trim(),
      managedUserId: managedUserId.trim(),
      statusFilter,
      gastoTypeFilter,
      processedByIaFilter,
    }),
    [currencyCode, filterKey, fromDate, gastoTypeFilter, managedUserId, processedByIaFilter, statusFilter, toDate]
  );

  const setStatusFilter = useCallback(
    (value: ExpenseTicketStatusFilterCode) => {
      if (hasFixedStatusFilter) {
        setStatusFilterRaw(fixedStatusFilter as ExpenseTicketStatusFilterCode);
        return;
      }
      setStatusFilterRaw(value);
    },
    [fixedStatusFilter, hasFixedStatusFilter]
  );

  const onApply = useCallback(() => {
    if (!allowEmptyDatesOnApply && (!fromDate || !toDate)) {
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
      managedUserId: managedUserId.trim(),
      statusFilter,
      gastoTypeFilter,
      processedByIaFilter,
    };

    setShowManualDateError(false);
    setAppliedFilters(snapshot);
    setShowManualDateFilter(false);
    setShowFilters(false);
    onApplyFilters(snapshot);
  }, [
    allowEmptyDatesOnApply,
    currencyCode,
    filterKey,
    fromDate,
    gastoTypeFilter,
    managedUserId,
    onApplyFilters,
    processedByIaFilter,
    statusFilter,
    toDate,
  ]);

  // Rehydrates ticket filters from a cached snapshot when returning from detail.
  const restoreAppliedFilters = useCallback(
    (snapshot: ExpenseTicketAppliedFilterSnapshot) => {
      const normalized = normalizeExpenseTicketFilterSnapshot(snapshot);
      const normalizedStatusFilter = resolveStatusFilter(normalized.statusFilter);
      const restoredManagedUserId = String(normalized.managedUserId || defaultManagedUserId).trim();
      setFromDate(normalized.fromDate);
      setToDate(normalized.toDate);
      setFilterKey(normalized.filterKey);
      setCurrencyCode(normalized.currencyCode);
      setManagedUserId(restoredManagedUserId);
      setStatusFilterRaw(normalizedStatusFilter);
      setGastoTypeFilter(normalized.gastoTypeFilter);
      setProcessedByIaFilter(normalized.processedByIaFilter);
      setActiveQuickFilter(null);
      setShowManualDateFilter(false);
      setShowManualDateError(false);
      setAppliedFilters({
        ...normalized,
        managedUserId: restoredManagedUserId,
        statusFilter: normalizedStatusFilter,
      });
      setShowFilters(false);
    },
    [defaultManagedUserId, resolveStatusFilter]
  );

  const onClear = useCallback(() => {
    setFromDate("");
    setToDate("");
    setFilterKey("");
    setCurrencyCode("");
    setManagedUserId(defaultManagedUserId);
    setStatusFilterRaw(resolveStatusFilter(""));
    setGastoTypeFilter("");
    setProcessedByIaFilter("all");
    setActiveQuickFilter(null);
    setShowManualDateFilter(false);
    setShowManualDateError(false);
    setManualDateAutoOpenKey(0);
    setAppliedFilters(null);
    setShowFilters(true);
    onClearFilters();
  }, [defaultManagedUserId, onClearFilters, resolveStatusFilter]);

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
    managedUserId,
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
    setManagedUserId,
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
    statusFilterLocked: hasFixedStatusFilter,
  };
};
