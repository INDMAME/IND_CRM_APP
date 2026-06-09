import { useEffect, type Dispatch, type SetStateAction } from "react";
import type { HistoryCachedFilter } from "../../../hooks/useHistoryFilterCache.ts";
import type { FilterLoadRequest, LoadOverride } from "./useHistoryFiltersState.ts";

type BooleanRef = {
  current: boolean;
};

type Args = {
  defaultFromDate: string;
  defaultToDate: string;
  didInitFilterRef: BooleanRef;
  hasRestoredFilterRef: BooleanRef;
  retryOnNetworkErrorRef: BooleanRef;
  consumeReturnFlag: () => boolean;
  readCachedFilter: () => HistoryCachedFilter | null;
  applyCachedFilter: (filter: HistoryCachedFilter | null) => FilterLoadRequest | null;
  applyDefaultRangeFromProps: () => FilterLoadRequest | null;
  loadActivities: (page: number, override?: LoadOverride) => void;
  resetActivities: () => void;
  resetHistoryFilters: () => void;
  clearFilterCache: () => void;
  setShowFilters: Dispatch<SetStateAction<boolean>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  logHistory: (message: string, data?: Record<string, unknown>) => void;
};

// Restores the history filters once on mount and starts the first activity load.
export const useHistoryInitialLoad = ({
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
}: Args) => {
  useEffect(() => {
    logHistory("init", { defaultFromDate, defaultToDate });
  }, [defaultFromDate, defaultToDate, logHistory]);

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
    setIsOpen,
    setShowFilters,
    logHistory,
  ]);
};
