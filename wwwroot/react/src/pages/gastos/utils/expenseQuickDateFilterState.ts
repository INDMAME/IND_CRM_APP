import type { ExpenseQuickDateFilterId } from "../constants/expenseQuickDateFilterCatalog.ts";
import { safeText, startOfDay, toIsoDate } from "./expenseUiUtils.ts";

const QUICK_DATE_FILTER_RANGES: Array<{
  id: Exclude<ExpenseQuickDateFilterId, "custom">;
  daysToSubtract: number;
}> = [
  { id: "days-7", daysToSubtract: 6 },
  { id: "days-30", daysToSubtract: 29 },
  { id: "days-90", daysToSubtract: 89 },
];

// Resolves which quick date preset matches one persisted expense date range.
export const resolveExpenseQuickDateFilterFromRange = (
  fromDate: string,
  toDate: string
): ExpenseQuickDateFilterId | null => {
  const normalizedFromDate = safeText(fromDate);
  const normalizedToDate = safeText(toDate);
  if (!normalizedFromDate || !normalizedToDate) {
    return null;
  }

  const today = startOfDay(new Date());
  if (normalizedToDate !== toIsoDate(today)) {
    return null;
  }

  for (const entry of QUICK_DATE_FILTER_RANGES) {
    const candidateFromDate = new Date(today);
    candidateFromDate.setDate(today.getDate() - entry.daysToSubtract);
    if (normalizedFromDate === toIsoDate(candidateFromDate)) {
      return entry.id;
    }
  }

  return null;
};
