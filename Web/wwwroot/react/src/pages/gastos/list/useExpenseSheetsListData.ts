import { useCallback, useEffect, useRef, useState } from "react";
import { ApiFetchError } from "../../../services/apiService.ts";
import { indT } from "../../../utils/indI18n.ts";
import type { ExpenseSheetCard, ExpenseSheetListFilters } from "../expenseTypes.ts";
import { buildExpenseListPayload } from "../utils/expensePayloadBuilders.ts";
import { fetchExpenseSheetList, mapExpenseSheetListItemToCard } from "../utils/expenseApi.ts";
import { isExpenseAbortLikeError, runExpenseReadRequestWithRetry } from "../utils/expenseRequestRetry.ts";

type UseExpenseSheetsListDataArgs = {
  hasAccess: boolean;
  pageSize: number;
  onForbidden: () => void;
};

// Owns list data fetch, loading state, and pagination metadata.
export const useExpenseSheetsListData = ({ hasAccess, pageSize, onForbidden }: UseExpenseSheetsListDataArgs) => {
  const [items, setItems] = useState<ExpenseSheetCard[]>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const activeRequestControllerRef = useRef<AbortController | null>(null);
  const activeRequestSeqRef = useRef(0);

  useEffect(() => {
    return () => {
      activeRequestSeqRef.current += 1;
      if (!activeRequestControllerRef.current) return;
      activeRequestControllerRef.current.abort();
      activeRequestControllerRef.current = null;
    };
  }, []);

  const restoreListSnapshot = useCallback(
    (snapshot: { items: ExpenseSheetCard[]; total: number; page: number }) => {
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
    async (page: number, filters: ExpenseSheetListFilters) => {
      if (!hasAccess) {
        onForbidden();
        return;
      }

      if (activeRequestControllerRef.current) {
        activeRequestControllerRef.current.abort();
      }

      const controller = new AbortController();
      activeRequestControllerRef.current = controller;
      const requestSeq = activeRequestSeqRef.current + 1;
      activeRequestSeqRef.current = requestSeq;

      setIsLoading(true);
      setErrorMessage("");
      const payload = buildExpenseListPayload(filters, page, pageSize);
      const selectedManagedUserId = String(filters?.managedUserId || "").trim();

      try {
        const response = await runExpenseReadRequestWithRetry(
          () =>
            fetchExpenseSheetList(payload, {
              suppressPermissionModal: true,
              signal: controller.signal,
              axUserIdOverride: selectedManagedUserId || undefined,
            }),
          {
            signal: controller.signal,
          }
        );
        if (requestSeq !== activeRequestSeqRef.current) return;

        if (response?.Success === false) {
          setErrorMessage(response.Message || indT("ExpenseSheets_LoadError", "Could not load expense sheets."));
          setItems([]);
          setTotal(0);
          setCurrentPage(page);
          return;
        }

        const nextItems = (Array.isArray(response?.Items) ? response.Items : []).map((item) =>
          mapExpenseSheetListItemToCard(item)
        );
        const nextTotal = Number(response?.Total ?? nextItems.length ?? 0);
        setItems(nextItems);
        setTotal(nextTotal);
        setCurrentPage(page);
      } catch (error) {
        if (requestSeq !== activeRequestSeqRef.current) return;
        if (isExpenseAbortLikeError(error, controller.signal)) return;

        if (error instanceof ApiFetchError && error.status === 403) {
          onForbidden();
          return;
        }

        const message = error instanceof Error ? error.message : indT("ExpenseSheets_LoadError", "Could not load expense sheets.");
        setErrorMessage(message);
        setItems([]);
        setTotal(0);
        setCurrentPage(page);
      } finally {
        if (requestSeq === activeRequestSeqRef.current) {
          setIsLoading(false);
          activeRequestControllerRef.current = null;
        }
      }
    },
    [hasAccess, onForbidden, pageSize]
  );

  const resetList = useCallback(() => {
    activeRequestSeqRef.current += 1;
    if (activeRequestControllerRef.current) {
      activeRequestControllerRef.current.abort();
      activeRequestControllerRef.current = null;
    }
    setItems([]);
    setTotal(0);
    setCurrentPage(1);
    setErrorMessage("");
    setIsLoading(false);
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
  };
};
