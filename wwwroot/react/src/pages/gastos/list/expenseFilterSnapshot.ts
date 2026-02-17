import type { AppliedFilterSnapshot } from "./expenseListTypes.ts";
import { DEFAULT_EXPENSE_STATUS_FILTER, normalizeExpenseStatusFilterCode } from "../constants/expenseStatusCatalog.ts";

// Normalizes an expense filter snapshot so cache and UI use one canonical shape.
export const normalizeExpenseFilterSnapshot = (
  value: Partial<AppliedFilterSnapshot> | null | undefined
): AppliedFilterSnapshot => {
  const billedModeRaw = Number((value as { billedMode?: unknown } | null | undefined)?.billedMode);
  const legacyStatusFallback = billedModeRaw === 1 ? 4 : billedModeRaw === 0 ? 0 : DEFAULT_EXPENSE_STATUS_FILTER;
  const statusFilter = normalizeExpenseStatusFilterCode(value?.statusFilter, legacyStatusFallback);
  const hojaGastosId = String(value?.hojaGastosId || "").trim();

  return {
    fromDate: String(value?.fromDate || "").trim(),
    toDate: String(value?.toDate || "").trim(),
    projectId: String(value?.projectId || "").trim(),
    hojaGastosId,
    currencyCode: String(value?.currencyCode || "").trim(),
    statusFilter,
    exchangeRateMode: null,
    filter: String(value?.filter || hojaGastosId || "").trim(),
  };
};
