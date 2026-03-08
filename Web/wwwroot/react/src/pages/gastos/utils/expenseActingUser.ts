import { getSessionValueWithExpiry, removeSessionValueWithExpiry, setSessionValueWithExpiry } from "../../../utils/sessionExpiry.ts";
import { getExpenseScopeToken } from "./expenseScope.ts";

const normalizeUserId = (value: unknown): string => String(value || "").trim();
const EXPENSE_ACTING_USER_KEY_PREFIX = "expense_acting_user_v1";
const EXPENSE_ACTING_USER_TTL_MS = 12 * 60 * 60 * 1000;

const getScopedKey = (): string => {
  return `${EXPENSE_ACTING_USER_KEY_PREFIX}_${getExpenseScopeToken()}`;
};

// Returns the active AxUserId override used by Gastos API calls.
export const getExpenseActingUserOverride = (): string => {
  return normalizeUserId(getSessionValueWithExpiry(getScopedKey()));
};

// Sets the active AxUserId override used by Gastos API calls.
export const setExpenseActingUserOverride = (userId: unknown): string => {
  const normalized = normalizeUserId(userId);
  if (!normalized) {
    removeSessionValueWithExpiry(getScopedKey());
    return "";
  }
  setSessionValueWithExpiry(getScopedKey(), normalized, EXPENSE_ACTING_USER_TTL_MS);
  return normalized;
};

// Clears the active AxUserId override.
export const clearExpenseActingUserOverride = (): void => {
  removeSessionValueWithExpiry(getScopedKey());
};
