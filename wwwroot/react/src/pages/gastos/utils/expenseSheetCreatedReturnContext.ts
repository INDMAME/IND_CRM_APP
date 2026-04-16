import {
  getSessionJsonWithExpiry,
  removeSessionValueWithExpiry,
  setSessionJsonWithExpiry,
} from "../../../utils/sessionExpiry.ts";
import { safeText } from "./expenseUiUtils.ts";
import { getExpenseScopeToken } from "./expenseScope.ts";

const EXPENSE_SHEET_CREATED_RETURN_CONTEXT_KEY_PREFIX = "expense_sheet_created_return_context_v1";
const EXPENSE_SHEET_CREATED_RETURN_CONTEXT_TTL_MS = 2 * 60 * 60 * 1000;

export type ExpenseSheetCreatedReturnContext = {
  sheetId: string;
};

const getScopedKey = (): string => {
  return `${EXPENSE_SHEET_CREATED_RETURN_CONTEXT_KEY_PREFIX}_${getExpenseScopeToken()}`;
};

// Normalizes the created-sheet return payload used between create and detail flows.
export const normalizeExpenseSheetCreatedReturnContext = (
  value: unknown
): ExpenseSheetCreatedReturnContext | null => {
  if (!value || typeof value !== "object") return null;

  const payload = value as Partial<ExpenseSheetCreatedReturnContext>;
  const sheetId = safeText(payload.sheetId);
  if (!sheetId) return null;

  return {
    sheetId,
  };
};

// Reads the stored created-sheet return context for the active expense scope.
export const readExpenseSheetCreatedReturnContext = (
  sheetId?: unknown
): ExpenseSheetCreatedReturnContext | null => {
  const stored = normalizeExpenseSheetCreatedReturnContext(
    getSessionJsonWithExpiry<ExpenseSheetCreatedReturnContext>(getScopedKey())
  );
  if (!stored) return null;

  const safeSheetId = safeText(sheetId);
  if (!safeSheetId) return stored;
  return stored.sheetId.toUpperCase() === safeSheetId.toUpperCase() ? stored : null;
};

// Clears the created-sheet return context for the active expense scope.
export const clearExpenseSheetCreatedReturnContext = (): void => {
  removeSessionValueWithExpiry(getScopedKey());
};

// Persists the created-sheet context so the next detail page can arm the list return state.
export const saveExpenseSheetCreatedReturnContext = (
  value: ExpenseSheetCreatedReturnContext | null | undefined
): ExpenseSheetCreatedReturnContext | null => {
  const normalized = normalizeExpenseSheetCreatedReturnContext(value);
  if (!normalized) {
    clearExpenseSheetCreatedReturnContext();
    return null;
  }

  setSessionJsonWithExpiry(getScopedKey(), normalized, EXPENSE_SHEET_CREATED_RETURN_CONTEXT_TTL_MS);
  return normalized;
};

// Consumes the created-sheet context once the matching detail page is loaded.
export const consumeExpenseSheetCreatedReturnContext = (
  sheetId?: unknown
): ExpenseSheetCreatedReturnContext | null => {
  const stored = readExpenseSheetCreatedReturnContext(sheetId);
  if (!stored) return null;

  clearExpenseSheetCreatedReturnContext();
  return stored;
};
