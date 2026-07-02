import React, { useEffect } from "react";
import type { HistoryCachedFilter } from "../../../hooks/useHistoryFilterCache.ts";
import { setTopbarActionGroupReady } from "../../../utils/topbarActionVisibility.ts";
import type { FilterLoadRequest, LoadOverride } from "./useHistoryFiltersState.ts";

type UseHistoryPageListenersArgs = {
  readyToLoad: boolean;
  isOpen: boolean;
  activatorRef: React.RefObject<HTMLDivElement | null>;
  popoverRef: React.RefObject<HTMLDivElement | null>;
  hasRestoredFilterRef: React.MutableRefObject<boolean>;
  retryOnNetworkErrorRef: React.MutableRefObject<boolean>;
  currentPage: number;
  logHistory: (message: string, data?: Record<string, unknown>) => void;
  consumeReturnFlag: () => boolean;
  readCachedFilter: () => HistoryCachedFilter | null;
  applyCachedFilter: (filter: HistoryCachedFilter | null) => FilterLoadRequest | null;
  resolveOwnerAxUserIdForLoad: (ownerAxUserId?: string) => string;
  loadActivities: (page: number, override?: LoadOverride) => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setHoverDate: React.Dispatch<React.SetStateAction<Date | null>>;
  setShowFilters: React.Dispatch<React.SetStateAction<boolean>>;
  applyFilters: (options?: { closePanel?: boolean; force?: boolean; page?: number }) => void;
};

// Handles global listeners used by the history page filters and calendar UI.
export const useHistoryPageListeners = ({
  readyToLoad,
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
  resolveOwnerAxUserIdForLoad,
  loadActivities,
  setIsOpen,
  setHoverDate,
  setShowFilters,
  applyFilters,
}: UseHistoryPageListenersArgs) => {
  useEffect(() => {
    setTopbarActionGroupReady("history-list-actions");
  }, []);

  // Close the manual picker when clicking outside of the range picker UI.
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
  }, [activatorRef, isOpen, logHistory, popoverRef, setHoverDate, setIsOpen]);

  // Re-apply filters after browser back/forward navigation returns to the page.
  useEffect(() => {
    const onPageShow = () => {
      if (!readyToLoad) return;
      if (hasRestoredFilterRef.current) return;
      if (consumeReturnFlag()) {
        const cached = readCachedFilter();
        const cachedRequest = applyCachedFilter(cached);
        if (cachedRequest) {
          const resolvedRequest = {
            ...cachedRequest,
            override: {
              ...cachedRequest.override,
              ownerAxUserId: resolveOwnerAxUserIdForLoad(cachedRequest.override.ownerAxUserId),
            },
          };
          retryOnNetworkErrorRef.current = true;
          loadActivities(resolvedRequest.page, resolvedRequest.override);
          setShowFilters(false);
          setIsOpen(false);
          hasRestoredFilterRef.current = true;
        }
      }
    };

    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, [
    applyCachedFilter,
    consumeReturnFlag,
    hasRestoredFilterRef,
    loadActivities,
    readCachedFilter,
    readyToLoad,
    retryOnNetworkErrorRef,
    resolveOwnerAxUserIdForLoad,
    setIsOpen,
    setShowFilters,
  ]);

  // Wire topbar actions that toggle filters or force refresh of current page.
  useEffect(() => {
    const onToggleFilters = () => {
      setShowFilters((prev) => {
        const next = !prev;
        if (!next) {
          setIsOpen(false);
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
        return next;
      });
    };

    const onRefresh = () => {
      if (!readyToLoad) return;
      applyFilters({ page: currentPage, force: true, closePanel: true });
    };

    window.addEventListener("history-toggle-filter", onToggleFilters);
    window.addEventListener("history-refresh", onRefresh);

    return () => {
      window.removeEventListener("history-toggle-filter", onToggleFilters);
      window.removeEventListener("history-refresh", onRefresh);
    };
  }, [applyFilters, currentPage, readyToLoad, setIsOpen, setShowFilters]);
};
