import { indT } from "../../../utils/indI18n.ts";
import { mapWindowEnumOptions, type ExpenseSelectOption } from "../utils/expenseSelectOptions.ts";
import type {
  ExpenseSheetLineReimbursableExpense,
  ExpenseSheetReimbursableExpense,
} from "../expenseTypes.ts";

export const REIMBURSABLE_EXPENSE_YES_VALUE: ExpenseSheetReimbursableExpense = 0;
export const REIMBURSABLE_EXPENSE_NO_VALUE: ExpenseSheetReimbursableExpense = 1;
export const REIMBURSABLE_EXPENSE_BOTH_VALUE: ExpenseSheetReimbursableExpense = 2;
export const LINE_REIMBURSABLE_EXPENSE_YES_VALUE: ExpenseSheetLineReimbursableExpense = 0;
export const LINE_REIMBURSABLE_EXPENSE_NO_VALUE: ExpenseSheetLineReimbursableExpense = 1;
export const DEFAULT_REIMBURSABLE_EXPENSE: ExpenseSheetReimbursableExpense = REIMBURSABLE_EXPENSE_YES_VALUE;
export const DEFAULT_LINE_REIMBURSABLE_EXPENSE: ExpenseSheetLineReimbursableExpense =
  LINE_REIMBURSABLE_EXPENSE_YES_VALUE;

const FALLBACK_REIMBURSABLE_OPTIONS: ExpenseSelectOption[] = [
  { value: String(REIMBURSABLE_EXPENSE_YES_VALUE), text: indT("Common_Yes", "Yes") },
  { value: String(REIMBURSABLE_EXPENSE_NO_VALUE), text: indT("Common_No", "No") },
  { value: String(REIMBURSABLE_EXPENSE_BOTH_VALUE), text: indT("ExpenseSheets_Reimbursable_Both", "Both") },
];

const FALLBACK_LINE_REIMBURSABLE_OPTIONS: ExpenseSelectOption[] = [
  { value: String(LINE_REIMBURSABLE_EXPENSE_YES_VALUE), text: indT("Common_Yes", "Yes") },
  { value: String(LINE_REIMBURSABLE_EXPENSE_NO_VALUE), text: indT("Common_No", "No") },
];

const getCatalogOptions = (source: Array<{ value?: string; Value?: string; text?: string; Text?: string }> = []): ExpenseSelectOption[] => {
  return mapWindowEnumOptions(source).filter((option) => {
    const parsed = Number(option.value);
    return Number.isInteger(parsed) && parsed >= 0;
  });
};

const getHeaderCatalogOptions = (): ExpenseSelectOption[] => {
  const source =
    typeof window !== "undefined" && Array.isArray(window.__EXPENSE_REIMBURSABLE_EXPENSES__)
      ? window.__EXPENSE_REIMBURSABLE_EXPENSES__
      : [];

  return getCatalogOptions(source).filter((option) => Number(option.value) <= REIMBURSABLE_EXPENSE_BOTH_VALUE);
};

const getLineCatalogOptions = (): ExpenseSelectOption[] => {
  const source =
    typeof window !== "undefined" && Array.isArray(window.__EXPENSE_REIMBURSABLE_EXPENSE_LINES__)
      ? window.__EXPENSE_REIMBURSABLE_EXPENSE_LINES__
      : [];

  return getCatalogOptions(source).filter((option) => Number(option.value) <= 1);
};

// Builds the header reimbursable options, preferring active AX configuration.
export const getExpenseReimbursableExpenseOptions = (): ExpenseSelectOption[] => {
  const catalogOptions = getHeaderCatalogOptions();
  if (catalogOptions.length > 0) return catalogOptions;
  return FALLBACK_REIMBURSABLE_OPTIONS;
};

// Header edit keeps the automatic mixed value visible, but not selectable.
export const getEditableExpenseReimbursableExpenseOptions = (): ExpenseSelectOption[] => {
  return getExpenseReimbursableExpenseOptions().filter(
    (option) => Number(option.value) !== REIMBURSABLE_EXPENSE_BOTH_VALUE
  );
};

// Builds the line reimbursable options from the line-specific AX enum catalog.
export const getExpenseLineReimbursableExpenseOptions = (): ExpenseSelectOption[] => {
  const catalogOptions = getLineCatalogOptions();
  if (catalogOptions.length > 0) return catalogOptions;
  return FALLBACK_LINE_REIMBURSABLE_OPTIONS;
};

// Keeps stored header values intact while rejecting unknown AX enum codes.
export const normalizeExpenseReimbursableExpense = (
  value: unknown,
  fallback: ExpenseSheetReimbursableExpense | null = null
): ExpenseSheetReimbursableExpense | null => {
  if (value === null || value === undefined || (typeof value === "string" && value.trim() === "")) {
    return fallback;
  }
  if (typeof value !== "number" && typeof value !== "string") return fallback;

  const parsed = Number(value);
  if (
    parsed === REIMBURSABLE_EXPENSE_YES_VALUE ||
    parsed === REIMBURSABLE_EXPENSE_NO_VALUE ||
    parsed === REIMBURSABLE_EXPENSE_BOTH_VALUE
  ) {
    return parsed as ExpenseSheetReimbursableExpense;
  }
  return fallback;
};

// Only Yes and No are editable; Both and legacy values are server-owned states.
export const isEditableExpenseReimbursableExpense = (value: unknown): boolean => {
  const normalized = normalizeExpenseReimbursableExpense(value);
  return normalized === REIMBURSABLE_EXPENSE_YES_VALUE || normalized === REIMBURSABLE_EXPENSE_NO_VALUE;
};

// Defaults omitted new headers to Yes, but preserves an explicit Both so the API rejects it.
export const resolveExpenseReimbursableExpenseForWrite = (
  value: unknown,
  isCreateMode: boolean
): ExpenseSheetReimbursableExpense | undefined => {
  const normalized = normalizeExpenseReimbursableExpense(value);
  if (isCreateMode) {
    if (normalized === REIMBURSABLE_EXPENSE_BOTH_VALUE) return normalized;
    return isEditableExpenseReimbursableExpense(normalized) && normalized !== null
      ? normalized
      : DEFAULT_REIMBURSABLE_EXPENSE;
  }
  return isEditableExpenseReimbursableExpense(normalized) && normalized !== null
    ? normalized
    : undefined;
};

// Keeps reimbursable line values constrained to numeric AX enum codes.
export const normalizeExpenseLineReimbursableExpense = (
  value: unknown,
  fallback: ExpenseSheetLineReimbursableExpense | null = null
): ExpenseSheetLineReimbursableExpense | null => {
  if (value === null || value === undefined || (typeof value === "string" && value.trim() === "")) {
    return fallback;
  }
  if (typeof value !== "number" && typeof value !== "string") return fallback;

  const parsed = Number(value);
  if (parsed === LINE_REIMBURSABLE_EXPENSE_YES_VALUE || parsed === LINE_REIMBURSABLE_EXPENSE_NO_VALUE) {
    return parsed as ExpenseSheetLineReimbursableExpense;
  }
  return fallback;
};

// Line edits require one concrete Yes/No value and preserve any legacy state otherwise.
export const isEditableExpenseLineReimbursableExpense = (value: unknown): boolean => {
  const normalized = normalizeExpenseLineReimbursableExpense(value);
  return normalized === LINE_REIMBURSABLE_EXPENSE_YES_VALUE || normalized === LINE_REIMBURSABLE_EXPENSE_NO_VALUE;
};

// Defaults new lines to Yes and omits locked values from unrelated updates.
export const resolveExpenseLineReimbursableExpenseForWrite = (
  value: unknown,
  isCreateMode: boolean
): ExpenseSheetLineReimbursableExpense | undefined => {
  const normalized = normalizeExpenseLineReimbursableExpense(value);
  if (isCreateMode) return normalized ?? DEFAULT_LINE_REIMBURSABLE_EXPENSE;
  return isEditableExpenseLineReimbursableExpense(normalized) && normalized !== null
    ? normalized
    : undefined;
};

// Resolves a display label for read-only header rendering.
export const getExpenseReimbursableExpenseLabel = (value: unknown): string => {
  if (value === null || value === undefined || String(value).trim() === "") return "-";
  const parsed = Number(value);
  if (
    parsed !== REIMBURSABLE_EXPENSE_YES_VALUE &&
    parsed !== REIMBURSABLE_EXPENSE_NO_VALUE &&
    parsed !== REIMBURSABLE_EXPENSE_BOTH_VALUE
  ) return "-";
  const normalized = normalizeExpenseReimbursableExpense(value);
  if (normalized === null) return "-";
  const match = getExpenseReimbursableExpenseOptions().find((option) => Number(option.value) === normalized);
  return match?.text || String(normalized);
};

// Resolves a display label for read-only line rendering.
export const getExpenseLineReimbursableExpenseLabel = (value: unknown): string => {
  if (value === null || value === undefined || String(value).trim() === "") return "-";
  const parsed = Number(value);
  if (parsed !== LINE_REIMBURSABLE_EXPENSE_YES_VALUE && parsed !== LINE_REIMBURSABLE_EXPENSE_NO_VALUE) return "-";
  const normalized = normalizeExpenseLineReimbursableExpense(value);
  if (normalized === null) return "-";
  const match = getExpenseLineReimbursableExpenseOptions().find((option) => Number(option.value) === normalized);
  return match?.text || String(normalized);
};
