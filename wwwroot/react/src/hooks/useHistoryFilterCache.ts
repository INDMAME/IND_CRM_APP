import { useCallback } from "react";
import { HISTORY_FILTER_KEY, HISTORY_RETURN_FLAG_KEY } from "../utils/visitasHistory.ts";

export type HistoryCachedFilter = {
  fromDate: string;
  toDate: string;
  page?: number;
  clientAccount?: string;
  clientText?: string;
};

const parseCachedFilter = (raw: string | null): HistoryCachedFilter | null => {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    return {
      fromDate: parsed.fromDate || "",
      toDate: parsed.toDate || "",
      page: parsed.page,
      clientAccount: parsed.clientAccount || "",
      clientText: parsed.clientText || "",
    };
  } catch {
    return null;
  }
};

// Keeps history filter cache reads/writes in one place.
export const useHistoryFilterCache = () => {
  const readCachedFilter = useCallback((): HistoryCachedFilter | null => {
    try {
      return parseCachedFilter(sessionStorage.getItem(HISTORY_FILTER_KEY));
    } catch {
      return null;
    }
  }, []);

  const clearFilterCache = useCallback(() => {
    try {
      sessionStorage.removeItem(HISTORY_FILTER_KEY);
    } catch {
      // Ignore storage errors.
    }
  }, []);

  const consumeReturnFlag = useCallback(() => {
    try {
      const raw = sessionStorage.getItem(HISTORY_RETURN_FLAG_KEY);
      if (raw === "1") {
        sessionStorage.removeItem(HISTORY_RETURN_FLAG_KEY);
        return true;
      }
    } catch {
      // Ignore storage errors.
    }
    return false;
  }, []);

  const saveCachedFilter = useCallback((filter: HistoryCachedFilter) => {
    try {
      sessionStorage.setItem(HISTORY_FILTER_KEY, JSON.stringify(filter));
      sessionStorage.setItem(HISTORY_RETURN_FLAG_KEY, "1");
    } catch {
      // Ignore storage errors.
    }
  }, []);

  return {
    readCachedFilter,
    clearFilterCache,
    consumeReturnFlag,
    saveCachedFilter,
  };
};
