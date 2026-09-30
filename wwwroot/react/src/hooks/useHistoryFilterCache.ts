import { useCallback } from "react";
import { HISTORY_CACHE_TTL_MS, HISTORY_FILTER_KEY, HISTORY_RETURN_FLAG_KEY } from "../utils/visitasHistory.ts";
import {
  getSessionJsonWithExpiry,
  getSessionValueWithExpiry,
  removeSessionValueWithExpiry,
  setSessionJsonWithExpiry,
  setSessionValueWithExpiry,
} from "../utils/sessionExpiry.ts";

export type HistoryCachedFilter = {
  fromDate: string;
  toDate: string;
  page?: number;
  clientAccount?: string;
  clientText?: string;
  ownerAxUserId?: string;
  ownerText?: string;
};

const normalizeCachedFilter = (value: HistoryCachedFilter | null): HistoryCachedFilter | null => {
  if (!value || typeof value !== "object") return null;
  return {
    fromDate: value.fromDate || "",
    toDate: value.toDate || "",
    page: value.page,
    clientAccount: value.clientAccount || "",
    clientText: value.clientText || "",
    ownerAxUserId: value.ownerAxUserId || "",
    ownerText: value.ownerText || "",
  };
};

// Keeps history filter cache reads/writes in one place.
export const useHistoryFilterCache = () => {
  const readCachedFilter = useCallback((): HistoryCachedFilter | null => {
    const parsed = getSessionJsonWithExpiry<HistoryCachedFilter>(HISTORY_FILTER_KEY);
    return normalizeCachedFilter(parsed);
  }, []);

  const clearFilterCache = useCallback(() => {
    removeSessionValueWithExpiry(HISTORY_FILTER_KEY);
    removeSessionValueWithExpiry(HISTORY_RETURN_FLAG_KEY);
  }, []);

  const consumeReturnFlag = useCallback(() => {
    const raw = getSessionValueWithExpiry(HISTORY_RETURN_FLAG_KEY);
    if (raw === "1") {
      removeSessionValueWithExpiry(HISTORY_RETURN_FLAG_KEY);
      return true;
    }
    return false;
  }, []);

  const saveCachedFilter = useCallback((filter: HistoryCachedFilter) => {
    if (!setSessionJsonWithExpiry(HISTORY_FILTER_KEY, filter, HISTORY_CACHE_TTL_MS)) {
      removeSessionValueWithExpiry(HISTORY_FILTER_KEY);
      removeSessionValueWithExpiry(HISTORY_RETURN_FLAG_KEY);
      return;
    }
    setSessionValueWithExpiry(HISTORY_RETURN_FLAG_KEY, "1", HISTORY_CACHE_TTL_MS);
  }, []);

  return {
    readCachedFilter,
    clearFilterCache,
    consumeReturnFlag,
    saveCachedFilter,
  };
};
