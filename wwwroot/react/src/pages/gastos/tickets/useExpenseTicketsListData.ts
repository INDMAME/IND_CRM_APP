import { useCallback, useEffect, useRef, useState } from "react";
import { ApiFetchError } from "../../../services/apiService.ts";
import { indT } from "../../../utils/indI18n.ts";
import { getSessionJsonWithExpiry, setSessionJsonWithExpiry } from "../../../utils/sessionExpiry.ts";
import type { ExpenseGastoTypeCode } from "../expenseTypes.ts";
import { fetchExpenseSheetTicketsList } from "../utils/expenseApi.ts";
import { getExpenseScopeToken } from "../utils/expenseScope.ts";
import { buildExpenseTicketListPayload } from "../utils/expensePayloadBuilders.ts";
import type { ExpenseTicketAppliedFilterSnapshot, ExpenseTicketCard } from "./expenseTicketListTypes.ts";

type UseExpenseTicketsListDataArgs = {
  hasAccess: boolean;
  pageSize: number;
  onForbidden: () => void;
};
const ALLOWED_GASTO_TYPE_CODES = new Set<number>([0, 1, 2, 3, 4, 5, 6, 7, 8, 14]);
const EXPENSE_TICKETS_LIST_CACHE_KEY_PREFIX = "expense_tickets_list_v1";
const EXPENSE_TICKETS_LIST_CACHE_TTL_MS = 2 * 60 * 1000;
const BULK_SELECTION_PAGE_SIZE = 200;
const BULK_SELECTION_CONCURRENCY = 4;

type ExpenseTicketListCacheEntry = {
  requestKey: string;
  page: number;
  total: number;
  items: ExpenseTicketCard[];
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
    fileId: String(item?.FileId || "").trim(),
    description: String(item?.Description || "").trim(),
    status: toNullableTicketStatus(item?.Status),
    hojaGastosIdDisplay: String(item?.HojaGastosIdDisplay ?? item?.hojaGastosIdDisplay ?? "").trim(),
    processedByAI: toNullableBool(item?.ProcessedByAI),
    currencyCode: String(item?.CurrencyCode || "").trim(),
    totalAmount: toNullableNumber(item?.TotalAmount),
    createdByUserId: String(item?.CreatedByUserId || "").trim(),
    transDate: String(item?.TransDate || "").trim(),
    urlFile: String(item?.UrlFile || "").trim(),
    fileName: String(item?.FileName || "").trim(),
    gastoType: toNullableTicketGastoType(item?.GastoType ?? item?.gastoType),
  };
};

const getListCacheScope = () => {
  return getExpenseScopeToken();
};

const getListCacheKey = () => `${EXPENSE_TICKETS_LIST_CACHE_KEY_PREFIX}_${getListCacheScope()}`;

// Reads one short-lived list snapshot to avoid repeating the same expensive request.
const readListCacheEntry = (requestKey: string): ExpenseTicketListCacheEntry | null => {
  const raw = getSessionJsonWithExpiry<ExpenseTicketListCacheEntry>(getListCacheKey());
  if (!raw || typeof raw !== "object") return null;
  if (String(raw.requestKey || "") !== requestKey) return null;

  const safeItems = Array.isArray(raw.items) ? raw.items : [];
  const totalRaw = Number(raw.total);
  const total = Number.isFinite(totalRaw) && totalRaw >= 0 ? totalRaw : safeItems.length;
  const pageRaw = Number(raw.page);
  const page = Number.isFinite(pageRaw) && pageRaw > 0 ? Math.floor(pageRaw) : 1;

  return {
    requestKey,
    page,
    total,
    items: safeItems,
  };
};

const writeListCacheEntry = (entry: ExpenseTicketListCacheEntry): void => {
  setSessionJsonWithExpiry(getListCacheKey(), entry, EXPENSE_TICKETS_LIST_CACHE_TTL_MS);
};

// Owns list data fetch, loading state, and pagination metadata for tickets.
export const useExpenseTicketsListData = ({ hasAccess, pageSize, onForbidden }: UseExpenseTicketsListDataArgs) => {
  const [items, setItems] = useState<ExpenseTicketCard[]>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const activeRequestControllerRef = useRef<AbortController | null>(null);
  const activeRequestKeyRef = useRef("");
  const activeRequestSeqRef = useRef(0);

  const restoreListSnapshot = useCallback(
    (snapshot: { items: ExpenseTicketCard[]; total: number; page: number }) => {
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

      const payload = buildExpenseTicketListPayload(filters, page, pageSize);
      const normalizedManagedUserId = String(filters?.managedUserId || "").trim().toUpperCase();
      const requestKey = JSON.stringify({
        payload,
        managedUserId: normalizedManagedUserId,
      });
      const cachedEntry = readListCacheEntry(requestKey);
      if (cachedEntry) {
        if (activeRequestControllerRef.current) {
          activeRequestControllerRef.current.abort();
          activeRequestControllerRef.current = null;
          activeRequestKeyRef.current = "";
          activeRequestSeqRef.current += 1;
        }
        restoreListSnapshot({
          items: cachedEntry.items,
          total: cachedEntry.total,
          page: cachedEntry.page,
        });
        return;
      }

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
        const response = await fetchExpenseSheetTicketsList(payload, {
          suppressPermissionModal: true,
          signal: controller.signal,
          axUserIdOverride: normalizedManagedUserId || undefined,
        });
        if (requestSeq !== activeRequestSeqRef.current) return;

        if (response?.Success === false) {
          setErrorMessage(response.Message || indT("Tickets_LoadError", "Could not load tickets."));
          setItems([]);
          setTotal(0);
          setCurrentPage(page);
          return;
        }

        const mappedItems = (Array.isArray(response?.Items) ? response.Items : []).map((item) =>
          mapTicketItemToCard(item as unknown as Record<string, unknown>)
        );
        const responseTotal = Number(response?.Total ?? mappedItems.length ?? 0);
        const nextTotal = responseTotal;

        writeListCacheEntry({
          requestKey,
          page,
          total: nextTotal,
          items: mappedItems,
        });

        setItems(mappedItems);
        setTotal(nextTotal);
        setCurrentPage(page);
      } catch (error) {
        if (controller.signal.aborted) return;
        if (error instanceof DOMException && error.name === "AbortError") return;
        if (requestSeq !== activeRequestSeqRef.current) return;

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
    [hasAccess, onForbidden, pageSize, restoreListSnapshot]
  );

  // Loads the full filtered ticket result set for true select-all behavior.
  const loadAllMatchingTickets = useCallback(
    async (
      filters: ExpenseTicketAppliedFilterSnapshot,
      axUserIdOverride = ""
    ): Promise<ExpenseTicketCard[]> => {
      if (!hasAccess) {
        onForbidden();
        return [];
      }

      const normalizedAxUserIdOverride = String(axUserIdOverride || "").trim().toUpperCase();
      const ticketMap = new Map<string, ExpenseTicketCard>();

      const fetchPage = async (page: number): Promise<{ items: ExpenseTicketCard[]; total: number }> => {
        const payload = buildExpenseTicketListPayload(filters, page, BULK_SELECTION_PAGE_SIZE);
        const response = await fetchExpenseSheetTicketsList(payload, {
          suppressPermissionModal: true,
          axUserIdOverride: normalizedAxUserIdOverride || undefined,
        });
        const sourceItems = Array.isArray(response?.Items) ? response.Items : [];
        if (response?.Success === false && sourceItems.length < 1) {
          throw new Error(response.Message || indT("Tickets_LoadError", "Could not load tickets."));
        }

        return {
          items: sourceItems.map((item) => mapTicketItemToCard(item as unknown as Record<string, unknown>)),
          total: Number(response?.Total ?? sourceItems.length ?? 0),
        };
      };

      try {
        const firstPage = await fetchPage(1);
        for (const item of firstPage.items) {
          const normalizedFileId = String(item.fileId || "").trim().toUpperCase();
          if (!normalizedFileId) continue;
          ticketMap.set(normalizedFileId, item);
        }

        const resolvedTotal = firstPage.total > 0 ? firstPage.total : firstPage.items.length;
        const totalPages = Math.max(1, Math.ceil(resolvedTotal / BULK_SELECTION_PAGE_SIZE));
        const remainingPages = Array.from({ length: Math.max(0, totalPages - 1) }, (_value, index) => index + 2);

        for (let index = 0; index < remainingPages.length; index += BULK_SELECTION_CONCURRENCY) {
          const pageChunk = remainingPages.slice(index, index + BULK_SELECTION_CONCURRENCY);
          const pageResults = await Promise.all(pageChunk.map((page) => fetchPage(page)));

          for (const pageResult of pageResults) {
            for (const item of pageResult.items) {
              const normalizedFileId = String(item.fileId || "").trim().toUpperCase();
              if (!normalizedFileId) continue;
              ticketMap.set(normalizedFileId, item);
            }
          }
        }

        return Array.from(ticketMap.values());
      } catch (error) {
        if (error instanceof ApiFetchError && error.status === 403) {
          onForbidden();
          return [];
        }

        throw error;
      }
    },
    [hasAccess, onForbidden]
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
    loadAllMatchingTickets,
    restoreListSnapshot,
    resetList,
  };
};
