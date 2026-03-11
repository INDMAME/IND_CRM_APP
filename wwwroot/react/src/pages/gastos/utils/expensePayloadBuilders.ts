import type {
  ExpenseSheetListApiRequest,
  ExpenseSheetTicketLinkBulkFilters,
  ExpenseSheetTicketLinkListRequest,
  ExpenseSheetListFilters,
  ExpenseSheetTicketListRequest,
} from "../expenseTypes.ts";
import { DEFAULT_EXPENSE_STATUS_FILTER } from "../constants/expenseStatusCatalog.ts";
import type { ExpenseTicketAppliedFilterSnapshot } from "../tickets/expenseTicketListTypes.ts";

const DEFAULT_SUGGEST_PAGE_SIZE = 50;
const ALLOWED_TICKET_GASTO_TYPES = new Set<number>([0, 1, 2, 3, 4, 5, 6, 7, 8, 14]);

const isValidExpenseSheetStatus = (value: unknown): value is number => {
  return Number.isInteger(value) && Number(value) >= 0 && Number(value) <= 4;
};

// Resolves the optional API status filter from UI filter state.
const resolveExpenseSheetStatus = (statusFilter: number): number | null => {
  if (statusFilter === DEFAULT_EXPENSE_STATUS_FILTER) {
    return null;
  }

  if (!isValidExpenseSheetStatus(statusFilter)) {
    return null;
  }

  return statusFilter;
};

const normalizeOptionalText = (value: string | undefined): string | undefined => {
  const trimmed = String(value || "").trim();
  return trimmed ? trimmed : undefined;
};

const resolveProcessedByAiFilter = (
  value: ExpenseTicketAppliedFilterSnapshot["processedByIaFilter"]
): boolean | null => {
  if (value === "yes") {
    return true;
  }

  if (value === "no") {
    return false;
  }

  return null;
};

const resolveTicketStatusFilter = (
  value: ExpenseTicketAppliedFilterSnapshot["statusFilter"]
): 0 | 1 | null => {
  return value === 0 || value === 1 ? value : null;
};

const resolveTicketGastoTypeFilter = (
  value: ExpenseTicketAppliedFilterSnapshot["gastoTypeFilter"]
): ExpenseSheetTicketListRequest["gastoType"] => {
  if (value === "" || value === null || value === undefined) {
    return null;
  }

  const parsed = Number(value);
  if (!Number.isInteger(parsed) || !ALLOWED_TICKET_GASTO_TYPES.has(parsed)) {
    return null;
  }

  return parsed as ExpenseSheetTicketListRequest["gastoType"];
};

const buildExpenseTicketFilterPayload = (
  filters: ExpenseTicketAppliedFilterSnapshot
): ExpenseSheetTicketLinkBulkFilters => {
  const safeFilterKey = normalizeOptionalText(filters.filterKey);

  return {
    createdDateFrom: normalizeOptionalText(filters.fromDate),
    createdDateTo: normalizeOptionalText(filters.toDate),
    searchKey: safeFilterKey,
    filter: safeFilterKey,
    currencyCode: normalizeOptionalText(filters.currencyCode),
    gastoType: resolveTicketGastoTypeFilter(filters.gastoTypeFilter),
    processedByAI: resolveProcessedByAiFilter(filters.processedByIaFilter),
  };
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
    billedMode: 2,
    createdDateFrom: normalizeOptionalText(filters.fromDate),
    createdDateTo: normalizeOptionalText(filters.toDate),
    projId: normalizeOptionalText(filters.projectId),
    currencyCode: normalizeOptionalText(filters.currencyCode),
    expenseSheetStatus: resolveExpenseSheetStatus(filters.statusFilter),
    includeSubordinates: filters.includeSubordinates === true,
    page: nextPage,
    pageSize: nextPageSize,
  };
};

// Build suggestion payload for expense sheet dropdown search.
export const buildExpenseSheetSuggestPayload = (
  term: string,
  pageSize = DEFAULT_SUGGEST_PAGE_SIZE,
  page = 1,
  includeSubordinates = false
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
    includeSubordinates: includeSubordinates === true,
    page: nextPage,
    pageSize: nextPageSize,
  };
};

// Build list payload for /api/crm/expensesheets/tickets/list from ticket filter state.
export const buildExpenseTicketListPayload = (
  filters: ExpenseTicketAppliedFilterSnapshot,
  page: number,
  pageSize: number
): ExpenseSheetTicketListRequest => {
  const nextPage = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
  const nextPageSize = Number.isFinite(pageSize) && pageSize > 0 ? Math.floor(pageSize) : DEFAULT_SUGGEST_PAGE_SIZE;

  return {
    page: nextPage,
    pageSize: nextPageSize,
    ...buildExpenseTicketFilterPayload(filters),
    status: resolveTicketStatusFilter(filters.statusFilter),
  };
};

// Build list payload for /api/crm/expensesheets/tickets/link/list from ticket filter state.
export const buildExpenseTicketLinkListPayload = (
  filters: ExpenseTicketAppliedFilterSnapshot,
  page: number,
  pageSize: number
): ExpenseSheetTicketLinkListRequest => {
  const nextPage = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
  const nextPageSize = Number.isFinite(pageSize) && pageSize > 0 ? Math.floor(pageSize) : DEFAULT_SUGGEST_PAGE_SIZE;

  return {
    page: nextPage,
    pageSize: nextPageSize,
    ...buildExpenseTicketFilterPayload(filters),
  };
};

// Build filter payload for /api/crm/expensesheets/tickets/link/bulk in filtered mode.
export const buildExpenseTicketLinkBulkFilters = (
  filters: ExpenseTicketAppliedFilterSnapshot
): ExpenseSheetTicketLinkBulkFilters => {
  return buildExpenseTicketFilterPayload(filters);
};
