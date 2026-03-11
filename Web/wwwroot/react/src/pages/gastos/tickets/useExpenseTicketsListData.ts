import { useCallback, useEffect, useRef, useState } from "react";
import { ApiFetchError } from "../../../services/apiService.ts";
import { indT } from "../../../utils/indI18n.ts";
import type { ExpenseGastoTypeCode } from "../expenseTypes.ts";
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

const ALLOWED_GASTO_TYPE_CODES = new Set<number>([0, 1, 2, 3, 4, 5, 6, 7, 8, 14]);

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

const toNullableTicketStatus = (value: unknown): 0 | 1 | null => {
  const parsed = Number(value);
  return parsed === 0 || parsed === 1 ? parsed : null;
};

const toNullableTicketGastoType = (value: unknown): ExpenseGastoTypeCode | null => {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || !ALLOWED_GASTO_TYPE_CODES.has(parsed)) {
    return null;
  }

  return parsed as ExpenseGastoTypeCode;
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
      if (!hasAccess) {
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
        return;
      }

      if (activeRequestControllerRef.current) {
        activeRequestControllerRef.current.abort();
      }

      const controller = new AbortController();
      activeRequestControllerRef.current = controller;
      activeRequestKeyRef.current = requestKey;
      const requestSeq = activeRequestSeqRef.current + 1;
      activeRequestSeqRef.current = requestSeq;

      setIsLoading(true);
      setErrorMessage("");

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
        if (requestSeq !== activeRequestSeqRef.current) return;

        if (response?.Success === false) {
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
        if (isExpenseAbortLikeError(error, controller.signal)) return;

        if (error instanceof ApiFetchError && error.status === 403) {
          onForbidden();
          return;
        }

        const message = error instanceof Error ? error.message : indT("Tickets_LoadError", "Could not load tickets.");
        setErrorMessage(message);
        setItems([]);
        setTotal(0);
        setCurrentPage(page);
      } finally {
        if (requestSeq === activeRequestSeqRef.current) {
          setIsLoading(false);
          activeRequestControllerRef.current = null;
          activeRequestKeyRef.current = "";
        }
      }
    },
    [hasAccess, mode, onForbidden, pageSize]
  );

  const resetList = useCallback(() => {
    if (activeRequestControllerRef.current) {
      activeRequestControllerRef.current.abort();
      activeRequestControllerRef.current = null;
      activeRequestKeyRef.current = "";
    }
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
