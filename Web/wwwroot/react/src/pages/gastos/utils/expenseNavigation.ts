import { ensureExpenseActingUserForNavigation } from "./expenseActingUser.ts";
import { indT } from "../../../utils/indI18n.ts";

type NavigateWithGuardOptions = {
  askConfirmation?: boolean;
  bypassGuardOnce?: boolean;
  message?: string;
  replace?: boolean;
};

type ReloadExpensePageOptions = {
  bypassGuardOnce?: boolean;
};

// Keeps the current page when the destination cannot restore the selected actor.
const canNavigateWithActingUser = (): boolean => {
  if (ensureExpenseActingUserForNavigation()) return true;
  window.alert(indT("Expense_ContextSaveFailed", "Could not preserve the selected user in this browser. Try again before opening another page."));
  return false;
};

// Updates the global navigation guard lifecycle for active edit processes.
export const setExpenseNavigationGuard = (
  activeOrOptions?: boolean | IndNavigationGuardOptions,
  message?: string
): void => {
  window.__indSetNavigationGuard?.(activeOrOptions, message);
};

// Clears global navigation guard flags when component unmounts.
export const clearExpenseNavigationGuard = (): void => {
  window.__indClearNavigationGuard?.();
};

// Executes navigation action through site guard if available.
export const runGuardedNavigation = (
  action: () => void,
  options: NavigateWithGuardOptions = {}
): void => {
  const { askConfirmation = false, message } = options;
  if (askConfirmation && typeof window.__indRequestNavigation === "function") {
    window.__indRequestNavigation(action, message);
    return;
  }

  action();
};

// Navigates to target URL and keeps site-level guard behavior consistent.
export const navigateToExpenseUrl = (
  targetUrl: string,
  options: NavigateWithGuardOptions = {}
): boolean => {
  const safeUrl = String(targetUrl || "").trim();
  if (!safeUrl) return false;

  const { bypassGuardOnce = true } = options;
  let navigationStarted = false;
  runGuardedNavigation(() => {
    if (!canNavigateWithActingUser()) return;
    if (bypassGuardOnce) {
      window.__indBypassNavigationGuardOnce?.();
    }
    if (options.replace) window.location.replace(safeUrl);
    else window.location.href = safeUrl;
    navigationStarted = true;
  }, options);
  return navigationStarted;
};

// Reloads the current page while bypassing the global unsaved-change guard when needed.
export const reloadExpensePage = (options: ReloadExpensePageOptions = {}): void => {
  if (!canNavigateWithActingUser()) return;
  const { bypassGuardOnce = true } = options;
  if (bypassGuardOnce) {
    window.__indBypassNavigationGuardOnce?.();
  }
  window.location.reload();
};
