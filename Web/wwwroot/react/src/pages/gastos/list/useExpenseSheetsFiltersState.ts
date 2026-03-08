import { useCallback, useMemo, useState } from "react";
import type { ExpenseQuickFilterId, AppliedFilterSnapshot } from "./expenseListTypes.ts";
import { DEFAULT_EXPENSE_STATUS_FILTER } from "../constants/expenseStatusCatalog.ts";
import type { ExpenseStatusFilterCode } from "../expenseTypes.ts";
import { startOfDay, toIsoDate } from "../utils/expenseUiUtils.ts";
import { normalizeExpenseFilterSnapshot } from "./expenseFilterSnapshot.ts";

type UseExpenseSheetsFiltersStateArgs = {
  onApplyFilters: (snapshot: AppliedFilterSnapshot) => void;
  onClearFilters: () => void;
  defaultManagedUserId: string;
};

// Owns filter UI state and apply/clear rules for expense list page.
export const useExpenseSheetsFiltersState = ({
  onApplyFilters,
  onClearFilters,
  defaultManagedUserId,
}: UseExpenseSheetsFiltersStateArgs) => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [projectId, setProjectId] = useState("");
  const [hojaGastosId, setHojaGastosId] = useState("");
  const [currencyCode, setCurrencyCode] = useState("");
  const [managedUserId, setManagedUserId] = useState(defaultManagedUserId);
  const [statusFilter, setStatusFilter] = useState<ExpenseStatusFilterCode>(DEFAULT_EXPENSE_STATUS_FILTER);
  const exchangeRateMode = null;
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
      managedUserId,
      statusFilter,
      exchangeRateMode,
      filter: hojaGastosId,
    }),
    [currencyCode, fromDate, hojaGastosId, managedUserId, projectId, statusFilter, toDate]
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
      managedUserId,
      statusFilter,
      exchangeRateMode,
      filter: hojaGastosId,
    };

    setShowManualDateError(false);
    setAppliedFilters(snapshot);
    setShowManualDateFilter(false);
    setShowFilters(false);
    onApplyFilters(snapshot);
  }, [currencyCode, fromDate, hojaGastosId, managedUserId, onApplyFilters, projectId, statusFilter, toDate]);

  // Rehydrates the list filters from a cached snapshot when returning from detail.
  const restoreAppliedFilters = useCallback((snapshot: AppliedFilterSnapshot) => {
    const normalized = normalizeExpenseFilterSnapshot(snapshot);
    const restoredManagedUserId = String(normalized.managedUserId || defaultManagedUserId).trim();
    setFromDate(normalized.fromDate);
    setToDate(normalized.toDate);
    setProjectId(normalized.projectId);
    setHojaGastosId(normalized.hojaGastosId);
    setCurrencyCode(normalized.currencyCode);
    setManagedUserId(restoredManagedUserId);
    setStatusFilter(normalized.statusFilter);
    setActiveQuickFilter(null);
    setShowManualDateFilter(false);
    setShowManualDateError(false);
    setAppliedFilters({
      ...normalized,
      managedUserId: restoredManagedUserId,
    });
    setShowFilters(false);
  }, [defaultManagedUserId]);

  const onClear = useCallback(() => {
    setFromDate("");
    setToDate("");
    setProjectId("");
    setHojaGastosId("");
    setCurrencyCode("");
    setManagedUserId(defaultManagedUserId);
    setStatusFilter(DEFAULT_EXPENSE_STATUS_FILTER);
    setActiveQuickFilter(null);
    setShowManualDateFilter(false);
    setShowManualDateError(false);
    setManualDateAutoOpenKey(0);
    setAppliedFilters(null);
    setShowFilters(true);
    onClearFilters();
  }, [defaultManagedUserId, onClearFilters]);

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

  // Closes the manual date UI once the user finishes selecting a full range.
  const onManualRangeComplete = useCallback((nextFromDate: string, nextToDate: string) => {
    setFromDate(nextFromDate);
    setToDate(nextToDate);
    setActiveQuickFilter("custom");
    setShowManualDateError(false);
    setShowManualDateFilter(false);
  }, []);

  const onQuickFilterChange = useCallback(
    (filterId: ExpenseQuickFilterId) => {
      if (filterId === "custom") {
        // Toggle manual date controls on every Date button click.
        if (showManualDateFilter) {
          setShowManualDateFilter(false);
          setShowManualDateError(false);
          return;
        }

        setActiveQuickFilter("custom");
        setShowManualDateFilter(true);
        setShowManualDateError(false);
        // Always ask the date component to open the calendar when Date is pressed.
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
    projectId,
    hojaGastosId,
    currencyCode,
    managedUserId,
    statusFilter,
    exchangeRateMode,
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
    setManagedUserId,
    setStatusFilter,
    onApply,
    onClear,
    restoreAppliedFilters,
    onDateRangeChange,
    onManualRangeComplete,
    onQuickFilterChange,
    toggleFilterPanel,
  };
};
