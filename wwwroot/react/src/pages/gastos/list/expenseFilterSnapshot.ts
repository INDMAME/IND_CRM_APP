import type { AppliedFilterSnapshot } from "./expenseListTypes.ts";

// Normalizes an expense filter snapshot so cache and UI use one canonical shape.
export const normalizeExpenseFilterSnapshot = (
  value: Partial<AppliedFilterSnapshot> | null | undefined
): AppliedFilterSnapshot => {
  const billedModeRaw = Number(value?.billedMode);
  const billedMode = Number.isFinite(billedModeRaw) && billedModeRaw >= 0 && billedModeRaw <= 2 ? billedModeRaw : 2;
  const hojaGastosId = String(value?.hojaGastosId || "").trim();

  return {
    fromDate: String(value?.fromDate || "").trim(),
    toDate: String(value?.toDate || "").trim(),
    projectId: String(value?.projectId || "").trim(),
    hojaGastosId,
    currencyCode: String(value?.currencyCode || "").trim(),
    billedMode,
    filter: String(value?.filter || hojaGastosId || "").trim(),
  };
};
