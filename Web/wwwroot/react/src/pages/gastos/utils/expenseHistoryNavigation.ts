// Detects browser history returns that recreate the page without app-level return flags.
export const isExpenseHistoryBackForwardNavigation = (): boolean => {
  if (typeof window === "undefined" || typeof performance === "undefined") {
    return false;
  }

  if (typeof performance.getEntriesByType !== "function") {
    return false;
  }

  const navigationEntries = performance.getEntriesByType("navigation");
  const navigationEntry = navigationEntries[0] as PerformanceNavigationTiming | undefined;
  return navigationEntry?.type === "back_forward";
};

const normalizePathname = (value: string): string => {
  return String(value || "").trim().toLowerCase();
};

// Detects whether the current page was opened from one of the expected expense detail routes.
export const hasExpenseReturnReferrer = (expectedPaths: string[]): boolean => {
  if (typeof document === "undefined" || typeof window === "undefined") {
    return false;
  }

  const rawReferrer = String(document.referrer || "").trim();
  if (!rawReferrer) return false;

  try {
    const referrerUrl = new URL(rawReferrer, window.location.origin);
    const referrerPath = normalizePathname(referrerUrl.pathname);
    return expectedPaths.some((path) => normalizePathname(path) === referrerPath);
  } catch {
    return false;
  }
};
