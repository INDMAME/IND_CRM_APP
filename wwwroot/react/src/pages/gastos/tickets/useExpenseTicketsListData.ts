import { useCallback, useState } from "react";
import { ApiFetchError } from "../../../services/apiService.ts";
import { indT } from "../../../utils/indI18n.ts";
import type { ExpenseGastoTypeCode } from "../expenseTypes.ts";
import { fetchExpenseSheetTicketsList } from "../utils/expenseApi.ts";
import { buildExpenseTicketListPayload } from "../utils/expensePayloadBuilders.ts";
import type { ExpenseTicketAppliedFilterSnapshot, ExpenseTicketCard } from "./expenseTicketListTypes.ts";

type UseExpenseTicketsListDataArgs = {
  hasAccess: boolean;
  pageSize: number;
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

// Owns list data fetch, loading state, and pagination metadata for tickets.
export const useExpenseTicketsListData = ({ hasAccess, pageSize, onForbidden }: UseExpenseTicketsListDataArgs) => {
  const [items, setItems] = useState<ExpenseTicketCard[]>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const loadList = useCallback(
    async (page: number, filters: ExpenseTicketAppliedFilterSnapshot) => {
      if (!hasAccess) {
        onForbidden();
        return;
      }

      setIsLoading(true);
      setErrorMessage("");

      try {
        const payload = buildExpenseTicketListPayload(filters, page, pageSize);
        const response = await fetchExpenseSheetTicketsList(payload, {
          suppressPermissionModal: true,
        });

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

        setItems(mappedItems);
        setTotal(nextTotal);
        setCurrentPage(page);
      } catch (error) {
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
