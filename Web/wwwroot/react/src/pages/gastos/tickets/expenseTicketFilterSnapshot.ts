import { normalizeExpenseTicketStatusFilterCode } from "../constants/expenseTicketStatusCatalog.ts";
import { toExpenseGastoTypeCode } from "../constants/expenseGastoTypeCatalog.ts";
import type { ExpenseGastoTypeCode } from "../expenseTypes.ts";
import type {
  ExpenseTicketAppliedFilterSnapshot,
  ExpenseTicketProcessedByIaFilter,
} from "./expenseTicketListTypes.ts";

const normalizeGastoTypeFilter = (value: unknown): "" | ExpenseGastoTypeCode => {
  if (value === null || value === undefined) {
    return "";
  }

  const raw = String(value).trim();
  if (!raw) {
    return "";
  }

  return toExpenseGastoTypeCode(raw) ?? "";
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
    managedUserId: String(value?.managedUserId || "").trim(),
    statusFilter: normalizeExpenseTicketStatusFilterCode(value?.statusFilter, ""),
    gastoTypeFilter: normalizeGastoTypeFilter(value?.gastoTypeFilter),
    processedByIaFilter: normalizeProcessedByIaFilter(value?.processedByIaFilter),
  };
};
