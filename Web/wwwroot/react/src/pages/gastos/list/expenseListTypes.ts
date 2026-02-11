import type { ExpenseSheetListFilters } from "../expenseTypes.ts";

export type ExpenseQuickFilterId = "custom" | "days-7" | "days-30" | "days-90";

export type AppliedFilterSnapshot = ExpenseSheetListFilters;
