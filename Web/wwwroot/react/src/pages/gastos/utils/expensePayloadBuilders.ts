import type { ExpenseSheetListFilters, ExpenseSheetListRequest } from "../expenseTypes.ts";

const DEFAULT_SUGGEST_PAGE_SIZE = 50;

// Build list payload for /Gastos/ListExpenseSheets from current filter state.
export const buildExpenseListPayload = (
  filters: ExpenseSheetListFilters,
  page: number,
  pageSize: number
): ExpenseSheetListRequest => {
  const nextPage = Number.isFinite(page) && page > 0 ? page : 1;
  const nextPageSize = Number.isFinite(pageSize) && pageSize > 0 ? pageSize : DEFAULT_SUGGEST_PAGE_SIZE;
  const safeFilter = String(filters.filter || filters.hojaGastosId || "").trim();

  return {
    filter: safeFilter,
    billedMode: filters.billedMode,
    fromDate: filters.fromDate,
    toDate: filters.toDate,
    projectId: filters.projectId,
    hojaGastosId: filters.hojaGastosId,
    currencyCode: filters.currencyCode,
    page: nextPage,
    pageSize: nextPageSize,
  };
};

// Build suggestion payload for expense sheet dropdown search.
export const buildExpenseSheetSuggestPayload = (
  term: string,
  pageSize = DEFAULT_SUGGEST_PAGE_SIZE,
  page = 1
): ExpenseSheetListRequest => {
  const safeTerm = String(term || "").trim();
  const nextPageSize = Number.isFinite(pageSize) && pageSize > 0 ? pageSize : DEFAULT_SUGGEST_PAGE_SIZE;
  const nextPage = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;

  return {
    filter: safeTerm,
    billedMode: 2,
    fromDate: "",
    toDate: "",
    projectId: "",
    hojaGastosId: "",
    currencyCode: "",
    page: nextPage,
    pageSize: nextPageSize,
  };
};
