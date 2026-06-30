import { indT } from "../../../utils/indI18n.ts";
import { mapWindowEnumOptions, type ExpenseSelectOption } from "../utils/expenseSelectOptions.ts";

export const DEFAULT_REIMBURSABLE_EXPENSE = 1;

const FALLBACK_REIMBURSABLE_OPTIONS: ExpenseSelectOption[] = [
  { value: "0", text: indT("Common_No", "No") },
  { value: "1", text: indT("Common_Yes", "Yes") },
];

const getCatalogOptions = (): ExpenseSelectOption[] => {
  const source =
    typeof window !== "undefined" && Array.isArray(window.__EXPENSE_REIMBURSABLE_EXPENSES__)
      ? window.__EXPENSE_REIMBURSABLE_EXPENSES__
      : [];

  return mapWindowEnumOptions(source).filter((option) => {
    const parsed = Number(option.value);
    return Number.isInteger(parsed) && parsed >= 0;
  });
};

// Builds the header reimbursable options, preferring active AX configuration.
export const getExpenseReimbursableExpenseOptions = (): ExpenseSelectOption[] => {
  const catalogOptions = getCatalogOptions();
  if (catalogOptions.length > 0) return catalogOptions;
  return FALLBACK_REIMBURSABLE_OPTIONS;
};

// Keeps reimbursable header values constrained to numeric AX enum codes.
export const normalizeExpenseReimbursableExpense = (
  value: unknown,
  fallback: number = DEFAULT_REIMBURSABLE_EXPENSE
): number => {
  const parsed = Number(value);
  if (Number.isInteger(parsed) && parsed >= 0) {
    return parsed;
  }
  return fallback;
};

// Resolves a display label for read-only header rendering.
export const getExpenseReimbursableExpenseLabel = (value: unknown): string => {
  const normalized = normalizeExpenseReimbursableExpense(value);
  const match = getExpenseReimbursableExpenseOptions().find((option) => Number(option.value) === normalized);
  return match?.text || String(normalized);
};
