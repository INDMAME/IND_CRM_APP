import { useCallback, useEffect, useRef, useState } from "react";
import { ApiFetchError, fetchJson } from "../services/apiService.ts";
import { indT } from "../utils/indI18n.ts";

export type HistoryActivityItem = {
  actividadId?: string | number;
  ActividadId?: string | number;
  recId?: string | number;
  RecId?: string | number;
  name?: string;
  Name?: string;
  transDate?: string;
  TransDate?: string;
  description?: string;
  Description?: string;
};

type HistoryResponse = {
  items?: HistoryActivityItem[];
  total?: number;
};

type LoadOverride = {
  fromDate: string;
  toDate: string;
  accountNum?: string;
};

type UseHistoryActivitiesArgs = {
  fromDateValue: string;
  toDateValue: string;
  accountNumValue: string;
  pageSize: number;
  retryDelayMs?: number;
  normalizeRange: (from: string, to: string) => { from: string; to: string };
  onForbidden: () => void;
  onDebug?: (message: string, data?: Record<string, unknown>) => void;
};

// Centralizes history fetch/retry logic to keep page components smaller.
export const useHistoryActivities = ({
  fromDateValue,
  toDateValue,
  accountNumValue,
  pageSize,
  retryDelayMs = 600,
  normalizeRange,
  onForbidden,
  onDebug,
}: UseHistoryActivitiesArgs) => {
  const [items, setItems] = useState<HistoryActivityItem[]>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const retryOnNetworkErrorRef = useRef(false);
  const activeAbortRef = useRef<AbortController | null>(null);
  const activeRequestIdRef = useRef(0);
  const retryTimerRef = useRef<number | null>(null);
  const lastSignatureRef = useRef("");

  const clearRetryTimer = useCallback(() => {
    if (retryTimerRef.current) {
      clearTimeout(retryTimerRef.current);
      retryTimerRef.current = null;
    }
  }, []);

  const abortActiveRequest = useCallback(() => {
    if (!activeAbortRef.current) return;
    try {
      activeAbortRef.current.abort();
    } catch {
      // Ignore abort errors.
    }
    activeAbortRef.current = null;
  }, []);

  const resetActivities = useCallback(() => {
    clearRetryTimer();
    abortActiveRequest();
    setItems([]);
    setTotal(0);
    setErrorMessage("");
    setIsLoading(false);
  }, [abortActiveRequest, clearRetryTimer]);

  const loadActivities = useCallback(
    async (page: number, override?: LoadOverride) => {
      const fromDateStr = override?.fromDate ?? fromDateValue;
      const toDateStr = override?.toDate ?? toDateValue;
      const accountNumStr = override?.accountNum ?? accountNumValue;

      if (!fromDateStr || !toDateStr) {
        setIsLoading(false);
        setItems([]);
        setTotal(0);
        setErrorMessage("");
        return;
      }

      setCurrentPage(page);
      clearRetryTimer();

      const requestId = ++activeRequestIdRef.current;
      abortActiveRequest();

      const controller = new AbortController();
      activeAbortRef.current = controller;

      const normalized = normalizeRange(fromDateStr, toDateStr);
      const filterSignature = `${normalized.from}|${normalized.to}|${accountNumStr}|${page}`;
      lastSignatureRef.current = filterSignature;

      setIsLoading(true);
      setItems([]);
      setTotal(0);
      setErrorMessage("");

      const payload = {
        fromDate: normalized.from,
        toDate: normalized.to,
        accountNum: accountNumStr,
      };

      onDebug?.("loadActivities:request", { page, pageSize, payload });

      let data: HistoryResponse;
      try {
        data = await fetchJson<HistoryResponse>(`/Historial/GetActivities?page=${page}&pageSize=${pageSize}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          signal: controller.signal,
          suppressPermissionModal: true,
        });
      } catch (err: any) {
        if (requestId !== activeRequestIdRef.current) return;
        if (err?.name === "AbortError") {
          activeAbortRef.current = null;
          return;
        }

        if (err instanceof ApiFetchError && err.status === 403) {
          setIsLoading(false);
          activeAbortRef.current = null;
          onForbidden();
          return;
        }

        const isNetworkError = !(err instanceof ApiFetchError) || typeof err.status !== "number";
        if (isNetworkError && retryOnNetworkErrorRef.current) {
          retryOnNetworkErrorRef.current = false;
          activeAbortRef.current = null;
          retryTimerRef.current = window.setTimeout(() => {
            if (requestId !== activeRequestIdRef.current) return;
            if (lastSignatureRef.current !== filterSignature) return;
            loadActivities(page, {
              fromDate: fromDateStr,
              toDate: toDateStr,
              accountNum: accountNumStr,
            });
          }, retryDelayMs);
          return;
        }
        setIsLoading(false);
        setErrorMessage(err?.message || indT("Api_RequestFailed", "No se pudo conectar con el servidor (red)."));
        activeAbortRef.current = null;
        return;
      }

      if (requestId !== activeRequestIdRef.current) return;

      onDebug?.("loadActivities:response", {
        status: 200,
        total: data?.total ?? 0,
        count: Array.isArray(data?.items) ? data.items.length : 0,
      });

      setIsLoading(false);
      setItems(data.items || []);
      setTotal(data.total || (data.items || []).length);
      activeAbortRef.current = null;
    },
    [
      abortActiveRequest,
      accountNumValue,
      clearRetryTimer,
      fromDateValue,
      normalizeRange,
      onDebug,
      onForbidden,
      pageSize,
      retryDelayMs,
      toDateValue,
    ]
  );

  useEffect(() => {
    return () => {
      clearRetryTimer();
      abortActiveRequest();
    };
  }, [abortActiveRequest, clearRetryTimer]);

  return {
    items,
    total,
    currentPage,
    isLoading,
    errorMessage,
    loadActivities,
    resetActivities,
    retryOnNetworkErrorRef,
    lastSignatureRef,
  };
};
