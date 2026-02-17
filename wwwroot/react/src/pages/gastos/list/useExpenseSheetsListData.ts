import { useCallback, useState } from "react";
import { ApiFetchError } from "../../../services/apiService.ts";
import { indT } from "../../../utils/indI18n.ts";
import type { ExpenseSheetCard, ExpenseSheetListFilters } from "../expenseTypes.ts";
import { buildExpenseListPayload } from "../utils/expensePayloadBuilders.ts";
import { fetchExpenseSheetList, mapExpenseSheetListItemToCard } from "../utils/expenseApi.ts";

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

  const loadList = useCallback(
    async (page: number, filters: ExpenseSheetListFilters) => {
      if (!hasAccess) {
        onForbidden();
        return;
      }

      setIsLoading(true);
      setErrorMessage("");
      const payload = buildExpenseListPayload(filters, page, pageSize);

      try {
        const response = await fetchExpenseSheetList(payload, {
          suppressPermissionModal: true,
        });

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
        setIsLoading(false);
      }
    },
    [hasAccess, onForbidden, pageSize]
  );

  const resetList = useCallback(() => {
    setItems([]);
    setTotal(0);
    setCurrentPage(1);
    setErrorMessage("");
  }, []);

  return {
    items,
    total,
    currentPage,
    isLoading,
    errorMessage,
    loadList,
    resetList,
  };
};
