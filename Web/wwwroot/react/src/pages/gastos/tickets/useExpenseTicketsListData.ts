import { useCallback, useEffect, useRef, useState } from "react";
import { ApiFetchError } from "../../../services/apiService.ts";
import { indT } from "../../../utils/indI18n.ts";
import type { ExpenseGastoTypeCode } from "../expenseTypes.ts";
import { toExpenseGastoTypeCode } from "../constants/expenseGastoTypeCatalog.ts";
import { fetchExpenseSheetTicketLinkList, fetchExpenseSheetTicketsList } from "../utils/expenseApi.ts";
import { isExpenseAbortLikeError, runExpenseReadRequestWithRetry } from "../utils/expenseRequestRetry.ts";
import {
  buildExpenseTicketLinkListPayload,
  buildExpenseTicketListPayload,
} from "../utils/expensePayloadBuilders.ts";
import type {
  ExpenseTicketAppliedFilterSnapshot,
  ExpenseTicketCard,
  ExpenseTicketLinkCard,
  ExpenseTicketListPageItem,
} from "./expenseTicketListTypes.ts";

type UseExpenseTicketsListDataArgs = {
  hasAccess: boolean;
  pageSize: number;
  mode: "general" | "link";
  onForbidden: () => void;
};

const EXPENSE_TICKETS_LIST_LOG_PREFIX = "[expense-tickets:list]";

const logExpenseTicketsListInfo = (...args: unknown[]) => {
  if (typeof console !== "undefined" && typeof console.info === "function") {
    console.info(EXPENSE_TICKETS_LIST_LOG_PREFIX, ...args);
  }
};

const logExpenseTicketsListWarn = (...args: unknown[]) => {
  if (typeof console !== "undefined" && typeof console.warn === "function") {
    console.warn(EXPENSE_TICKETS_LIST_LOG_PREFIX, ...args);
  }
};

const logExpenseTicketsListError = (...args: unknown[]) => {
  if (typeof console !== "undefined" && typeof console.error === "function") {
    console.error(EXPENSE_TICKETS_LIST_LOG_PREFIX, ...args);
  }
};

const buildExpenseTicketsDebugStack = (label: string): string => {
  if (typeof Error !== "function") return "";
  const rawStack = new Error(label).stack;
  if (typeof rawStack !== "string" || !rawStack.trim()) return "";
  return rawStack
    .split("\n")
    .slice(0, 6)
    .join("\n");
};

const toNullableNumber = (value: unknown): number | null => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const toNullableBool = (value: unknown): boolean | null => {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value === 1 ? true : value === 0 ? false : null;
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    if (normalized === "true" || normalized === "1") return true;
    if (normalized === "false" || normalized === "0") return false;
  }
  return null;
};

const toNullableTicketStatus = (value: unknown): number | null => {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed >= 0 ? parsed : null;
};

const toNullableTicketGastoType = (value: unknown): ExpenseGastoTypeCode | null => {
  return toExpenseGastoTypeCode(value);
};

const mapTicketItemToCard = (item: Record<string, unknown>): ExpenseTicketCard => {
  return {
    kind: "general",
    fileId: String(item?.FileId || "").trim(),
    description: String(item?.Description || "").trim(),
    status: toNullableTicketStatus(item?.Status),
    processedByAI: toNullableBool(item?.ProcessedByAI),
    currencyCode: String(item?.CurrencyCode || "").trim(),
    totalAmount: toNullableNumber(item?.TotalAmount),
    transDate: String(item?.TransDate || "").trim(),
    fileName: String(item?.FileName || "").trim(),
    gastoType: toNullableTicketGastoType(item?.GastoType ?? item?.gastoType),
  };
};

const mapTicketLinkItemToCard = (item: Record<string, unknown>): ExpenseTicketLinkCard => {
  return {
    kind: "link",
    fileId: String(item?.FileId || "").trim(),
    description: String(item?.Description || "").trim(),
    processedByAI: toNullableBool(item?.ProcessedByAI),
    currencyCode: String(item?.CurrencyCode || "").trim(),
    totalAmount: toNullableNumber(item?.TotalAmount),
    transDate: String(item?.TransDate || "").trim(),
    fileName: String(item?.FileName || "").trim(),
    gastoType: toNullableTicketGastoType(item?.GastoType ?? item?.gastoType),
  };
};

// Owns list data fetch, loading state, and pagination metadata for tickets.
export const useExpenseTicketsListData = ({ hasAccess, pageSize, mode, onForbidden }: UseExpenseTicketsListDataArgs) => {
  const [items, setItems] = useState<ExpenseTicketListPageItem[]>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const activeRequestControllerRef = useRef<AbortController | null>(null);
  const activeRequestKeyRef = useRef("");
  const activeRequestSeqRef = useRef(0);

  const restoreListSnapshot = useCallback(
    (snapshot: { items: ExpenseTicketListPageItem[]; total: number; page: number }) => {
      const safeItems = Array.isArray(snapshot.items) ? snapshot.items : [];
      const safeTotalRaw = Number(snapshot.total);
      const safeTotal = Number.isFinite(safeTotalRaw) && safeTotalRaw >= 0 ? safeTotalRaw : safeItems.length;
      const safePageRaw = Number(snapshot.page);
      const safePage = Number.isFinite(safePageRaw) && safePageRaw > 0 ? Math.floor(safePageRaw) : 1;

      setItems(safeItems);
      setTotal(safeTotal);
      setCurrentPage(safePage);
      setErrorMessage("");
      setIsLoading(false);
    },
    []
  );

  const loadList = useCallback(
    async (page: number, filters: ExpenseTicketAppliedFilterSnapshot) => {
      logExpenseTicketsListInfo("loadList:requested", {
        page,
        mode,
        hasAccess,
        filters,
      });
      if (!hasAccess) {
        logExpenseTicketsListWarn("loadList:blocked-no-access", {
          page,
          mode,
        });
        onForbidden();
        return;
      }

      const payload =
        mode === "link"
          ? buildExpenseTicketLinkListPayload(filters, page, pageSize)
          : buildExpenseTicketListPayload(filters, page, pageSize);
      const normalizedManagedUserId = String(filters?.managedUserId || "").trim().toUpperCase();
      const requestKey = JSON.stringify({ mode, payload, managedUserId: normalizedManagedUserId });

      if (activeRequestControllerRef.current && activeRequestKeyRef.current === requestKey) {
        logExpenseTicketsListWarn("loadList:skip-duplicate-request", {
          page,
          mode,
          requestKey,
        });
        return;
      }

      if (activeRequestControllerRef.current) {
        logExpenseTicketsListInfo("loadList:abort-previous-request", {
          previousRequestKey: activeRequestKeyRef.current,
          previousRequestSeq: activeRequestSeqRef.current,
          stack: buildExpenseTicketsDebugStack("loadList:abort-previous-request"),
        });
        activeRequestControllerRef.current.abort();
      }

      const controller = new AbortController();
      activeRequestControllerRef.current = controller;
      activeRequestKeyRef.current = requestKey;
      const requestSeq = activeRequestSeqRef.current + 1;
      activeRequestSeqRef.current = requestSeq;
      const handleAbortSignal = () => {
        logExpenseTicketsListWarn("loadList:signal-abort-event", {
          page,
          mode,
          requestSeq,
          requestKey,
          signalAborted: controller.signal.aborted,
          signalReason:
            "reason" in controller.signal
              ? ((controller.signal as AbortSignal & { reason?: unknown }).reason ?? null)
              : null,
        });
      };
      controller.signal.addEventListener("abort", handleAbortSignal, { once: true });

      setIsLoading(true);
      setErrorMessage("");
      logExpenseTicketsListInfo("loadList:fetch-start", {
        page,
        mode,
        normalizedManagedUserId,
        payload,
        requestKey,
        requestSeq,
      });

      try {
        const response = await runExpenseReadRequestWithRetry(
          () =>
            mode === "link"
              ? fetchExpenseSheetTicketLinkList(payload, {
                  suppressPermissionModal: true,
                  signal: controller.signal,
                  axUserIdOverride: normalizedManagedUserId || undefined,
                })
              : fetchExpenseSheetTicketsList(payload, {
                  suppressPermissionModal: true,
                  signal: controller.signal,
                  axUserIdOverride: normalizedManagedUserId || undefined,
                }),
          {
            signal: controller.signal,
          }
        );
        logExpenseTicketsListInfo("loadList:fetch-finished", {
          page,
          mode,
          requestSeq,
          success: response?.Success,
          total: response?.Total,
          items: Array.isArray(response?.Items) ? response.Items.length : 0,
        });
        if (requestSeq !== activeRequestSeqRef.current) return;

        if (response?.Success === false) {
          logExpenseTicketsListWarn("loadList:api-unsuccessful", {
            page,
            mode,
            message: response.Message,
          });
          setErrorMessage(response.Message || indT("Tickets_LoadError", "Could not load tickets."));
          setItems([]);
          setTotal(0);
          setCurrentPage(page);
          return;
        }

        const sourceItems = Array.isArray(response?.Items) ? response.Items : [];
        const mappedItems = sourceItems.map((item) =>
          mode === "link"
            ? mapTicketLinkItemToCard(item as unknown as Record<string, unknown>)
            : mapTicketItemToCard(item as unknown as Record<string, unknown>)
        );
        const responseTotal = Number(response?.Total ?? mappedItems.length ?? 0);

        setItems(mappedItems);
        setTotal(responseTotal);
        setCurrentPage(page);
      } catch (error) {
        if (requestSeq !== activeRequestSeqRef.current) return;
        if (isExpenseAbortLikeError(error, controller.signal)) {
          logExpenseTicketsListWarn("loadList:aborted", {
            page,
            mode,
            requestSeq,
            message: error instanceof Error ? error.message : error,
          });
          return;
        }

        if (error instanceof ApiFetchError && error.status === 403) {
          logExpenseTicketsListWarn("loadList:forbidden", {
            page,
            mode,
            requestSeq,
          });
          onForbidden();
          return;
        }

        logExpenseTicketsListError("loadList:failed", {
          page,
          mode,
          requestSeq,
          message: error instanceof Error ? error.message : error,
        });
        const message = error instanceof Error ? error.message : indT("Tickets_LoadError", "Could not load tickets.");
        setErrorMessage(message);
        setItems([]);
        setTotal(0);
        setCurrentPage(page);
      } finally {
        controller.signal.removeEventListener("abort", handleAbortSignal);
        if (requestSeq === activeRequestSeqRef.current) {
          logExpenseTicketsListInfo("loadList:finalize", {
            page,
            mode,
            requestSeq,
          });
          setIsLoading(false);
          activeRequestControllerRef.current = null;
          activeRequestKeyRef.current = "";
        }
      }
    },
    [hasAccess, mode, onForbidden, pageSize]
  );

  const resetList = useCallback((source = "unknown") => {
    if (activeRequestControllerRef.current) {
      logExpenseTicketsListWarn("resetList:abort-active-request", {
        source,
        activeRequestKey: activeRequestKeyRef.current,
        activeRequestSeq: activeRequestSeqRef.current,
        stack: buildExpenseTicketsDebugStack(`resetList:${source}`),
      });
      activeRequestControllerRef.current.abort();
      activeRequestControllerRef.current = null;
      activeRequestKeyRef.current = "";
    }
    logExpenseTicketsListInfo("resetList:clear-state", {
      source,
    });
    setItems([]);
    setTotal(0);
    setCurrentPage(1);
    setErrorMessage("");
  }, []);

  const clearListCache = useCallback(() => {
    // Ticket list auto-load must always hit the live endpoint.
  }, []);

  useEffect(() => {
    return () => {
      if (activeRequestControllerRef.current) {
        logExpenseTicketsListWarn("cleanup:abort-active-request", {
          activeRequestKey: activeRequestKeyRef.current,
          activeRequestSeq: activeRequestSeqRef.current,
          stack: buildExpenseTicketsDebugStack("cleanup:abort-active-request"),
        });
        activeRequestControllerRef.current.abort();
        activeRequestControllerRef.current = null;
        activeRequestKeyRef.current = "";
      }
    };
  }, []);

  return {
    items,
    total,
    currentPage,
    isLoading,
    errorMessage,
    loadList,
    restoreListSnapshot,
    resetList,
    clearListCache,
  };
};
