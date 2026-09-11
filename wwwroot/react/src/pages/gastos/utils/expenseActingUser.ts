import { getSessionValueWithExpiry, removeSessionValueWithExpiry, setSessionValueWithExpiry } from "../../../utils/sessionExpiry.ts";
import { getExpenseScopeToken } from "./expenseScope.ts";
import { captureActiveBrowserState, captureSensitiveBrowserState } from "../../../utils/browserStorageScope.ts";

const normalizeUserId = (value: unknown): string => String(value || "").trim();
const EXPENSE_ACTING_USER_KEY_PREFIX = "expense_acting_user_v1";
const EXPENSE_ACTING_USER_TTL_MS = 12 * 60 * 60 * 1000;
let activeOverride: { snapshot: string; userId: string } | null = null;
let signedInUser: { snapshot: string; userId: string } | null = null;

const getScopedKey = (): string => {
  return `${EXPENSE_ACTING_USER_KEY_PREFIX}_${getExpenseScopeToken()}`;
};

// Returns the active AxUserId override used by Gastos API calls.
export const getExpenseActingUserOverride = (): string => {
  const snapshot = captureActiveBrowserState();
  if (!snapshot) {
    activeOverride = null;
    signedInUser = null;
    return "";
  }
  if (activeOverride?.snapshot === snapshot) {
    return activeOverride.userId;
  }
  const userId = normalizeUserId(getSessionValueWithExpiry(getScopedKey()));
  activeOverride = { snapshot, userId };
  return userId;
};

// Records the signed-in user so navigation can omit a redundant self override.
export const setExpenseActingSignedInUser = (userId: unknown): void => {
  const snapshot = captureActiveBrowserState();
  signedInUser = snapshot ? { snapshot, userId: normalizeUserId(userId) } : null;
};

// Sets the active AxUserId override used by Gastos API calls.
export const setExpenseActingUserOverride = (userId: unknown): string => {
  const normalized = normalizeUserId(userId);
  const snapshot = captureActiveBrowserState();
  if (!snapshot) {
    activeOverride = null;
    return "";
  }
  activeOverride = { snapshot, userId: normalized };
  if (!normalized) {
    removeSessionValueWithExpiry(getScopedKey());
    return "";
  }
  if (!setSessionValueWithExpiry(getScopedKey(), normalized, EXPENSE_ACTING_USER_TTL_MS)) {
    removeSessionValueWithExpiry(getScopedKey());
  }
  return normalized;
};

// Verifies that a full page navigation will restore the same actor, or the signed-in user.
export const ensureExpenseActingUserForNavigation = (): boolean => {
  const snapshot = captureSensitiveBrowserState();
  if (!snapshot) return false;
  const actor = getExpenseActingUserOverride();
  const isSelf = signedInUser?.snapshot === snapshot &&
    actor.toUpperCase() === signedInUser.userId.toUpperCase();
  if (!actor || isSelf) {
    removeSessionValueWithExpiry(getScopedKey());
    try {
      return sessionStorage.getItem(getScopedKey()) === null;
    } catch {
      return false;
    }
  }
  if (normalizeUserId(getSessionValueWithExpiry(getScopedKey())) === actor) return true;
  return setSessionValueWithExpiry(getScopedKey(), actor, EXPENSE_ACTING_USER_TTL_MS);
};

// Clears the active AxUserId override.
export const clearExpenseActingUserOverride = (): void => {
  setExpenseActingUserOverride("");
};
