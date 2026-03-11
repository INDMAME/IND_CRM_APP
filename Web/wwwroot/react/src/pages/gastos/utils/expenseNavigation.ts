type NavigateWithGuardOptions = {
  askConfirmation?: boolean;
  bypassGuardOnce?: boolean;
  message?: string;
};

type ReloadExpensePageOptions = {
  bypassGuardOnce?: boolean;
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
): void => {
  const safeUrl = String(targetUrl || "").trim();
  if (!safeUrl) return;

  const { bypassGuardOnce = true } = options;
  runGuardedNavigation(() => {
    if (bypassGuardOnce) {
      window.__indBypassNavigationGuardOnce?.();
    }
    window.location.href = safeUrl;
  }, options);
};

// Reloads the current page while bypassing the global unsaved-change guard when needed.
export const reloadExpensePage = (options: ReloadExpensePageOptions = {}): void => {
  const { bypassGuardOnce = true } = options;
  if (bypassGuardOnce) {
    window.__indBypassNavigationGuardOnce?.();
  }
  window.location.reload();
};
