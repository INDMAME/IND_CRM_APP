import type { ExpenseSheetListApiRequest, ExpenseSheetListFilters } from "../expenseTypes.ts";
import { DEFAULT_EXPENSE_STATUS_FILTER } from "../constants/expenseStatusCatalog.ts";

const DEFAULT_SUGGEST_PAGE_SIZE = 50;

// Maps the new status filter to legacy billedMode while list endpoints are upgraded.
const resolveLegacyBilledMode = (statusFilter: number): 0 | 1 | 2 => {
  if (statusFilter === 4) return 1;
  if (statusFilter === DEFAULT_EXPENSE_STATUS_FILTER) return 2;
  return 0;
};

const normalizeOptionalText = (value: string | undefined): string | undefined => {
  const trimmed = String(value || "").trim();
  return trimmed ? trimmed : undefined;
};

// Build list payload for /api/crm/expensesheets/list from current filter state.
export const buildExpenseListPayload = (
  filters: ExpenseSheetListFilters,
  page: number,
  pageSize: number
): ExpenseSheetListApiRequest => {
  const nextPage = Number.isFinite(page) && page > 0 ? page : 1;
  const nextPageSize = Number.isFinite(pageSize) && pageSize > 0 ? pageSize : DEFAULT_SUGGEST_PAGE_SIZE;
  const safeFilter = String(filters.filter || filters.hojaGastosId || "").trim();

  return {
    filter: safeFilter || "",
    billedMode: resolveLegacyBilledMode(filters.statusFilter),
    createdDateFrom: normalizeOptionalText(filters.fromDate),
    createdDateTo: normalizeOptionalText(filters.toDate),
    projId: normalizeOptionalText(filters.projectId),
    currencyCode: normalizeOptionalText(filters.currencyCode),
    page: nextPage,
    pageSize: nextPageSize,
  };
};

// Build suggestion payload for expense sheet dropdown search.
export const buildExpenseSheetSuggestPayload = (
  term: string,
  pageSize = DEFAULT_SUGGEST_PAGE_SIZE,
  page = 1
): ExpenseSheetListApiRequest => {
  const safeTerm = String(term || "").trim();
  const nextPageSize = Number.isFinite(pageSize) && pageSize > 0 ? pageSize : DEFAULT_SUGGEST_PAGE_SIZE;
  const nextPage = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;

  return {
    filter: safeTerm || "",
    billedMode: 2,
    createdDateFrom: undefined,
    createdDateTo: undefined,
    projId: undefined,
    currencyCode: undefined,
    page: nextPage,
    pageSize: nextPageSize,
  };
};
