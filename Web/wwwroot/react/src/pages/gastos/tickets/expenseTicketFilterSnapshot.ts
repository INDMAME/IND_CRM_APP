import { normalizeExpenseTicketStatusFilterCode } from "../constants/expenseTicketStatusCatalog.ts";
import type { ExpenseGastoTypeCode } from "../expenseTypes.ts";
import type {
  ExpenseTicketAppliedFilterSnapshot,
  ExpenseTicketProcessedByIaFilter,
} from "./expenseTicketListTypes.ts";

const ALLOWED_GASTO_TYPES = new Set<number>([0, 1, 2, 3, 4, 5, 6, 7, 8, 14]);

const normalizeGastoTypeFilter = (value: unknown): "" | ExpenseGastoTypeCode => {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || !ALLOWED_GASTO_TYPES.has(parsed)) {
    return "";
  }

  return parsed as ExpenseGastoTypeCode;
};

const normalizeProcessedByIaFilter = (value: unknown): ExpenseTicketProcessedByIaFilter => {
  const normalized = String(value || "").trim().toLowerCase();
  if (normalized === "yes") return "yes";
  if (normalized === "no") return "no";
  return "all";
};

// Normalizes a ticket filter snapshot so cache and UI state use one canonical shape.
export const normalizeExpenseTicketFilterSnapshot = (
  value: Partial<ExpenseTicketAppliedFilterSnapshot> | null | undefined
): ExpenseTicketAppliedFilterSnapshot => {
  return {
    fromDate: String(value?.fromDate || "").trim(),
    toDate: String(value?.toDate || "").trim(),
    filterKey: String(value?.filterKey || "").trim(),
    currencyCode: String(value?.currencyCode || "").trim(),
    statusFilter: normalizeExpenseTicketStatusFilterCode(value?.statusFilter, ""),
    gastoTypeFilter: normalizeGastoTypeFilter(value?.gastoTypeFilter),
    processedByIaFilter: normalizeProcessedByIaFilter(value?.processedByIaFilter),
  };
};
