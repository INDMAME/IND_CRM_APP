export const HISTORY_FILTER_KEY = "visitas_history_filter_v1";
export const HISTORY_RETURN_FLAG_KEY = "visitas_history_return_v1";

export const isIsoDate = (value: string) => /^\d{4}-\d{2}-\d{2}$/.test(String(value || "").trim());

export const hasHistoryFilterRange = (): boolean => {
  try {
    const raw = sessionStorage.getItem(HISTORY_FILTER_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    return !!(parsed && parsed.fromDate && parsed.toDate);
  } catch {
    return false;
  }
};

export const markHistoryReturn = (): void => {
  try {
    sessionStorage.setItem(HISTORY_RETURN_FLAG_KEY, "1");
  } catch {
    // ignore
  }
};

export const setHistoryFilterForDate = (isoDate: string): void => {
  const value = String(isoDate || "").trim();
  if (!isIsoDate(value)) {
    if (hasHistoryFilterRange()) markHistoryReturn();
    return;
  }
  try {
    if (!hasHistoryFilterRange()) {
      sessionStorage.setItem(HISTORY_FILTER_KEY, JSON.stringify({ fromDate: value, toDate: value }));
    }
  } catch {
    // ignore
  }
  markHistoryReturn();
};

export const flashActionMark = (type: string, durationMs: number) => {
  try {
    if (window.IND && typeof window.IND.flashActionMark === "function") {
      window.IND.flashActionMark({ type, durationMs });
    }
  } catch {
    // ignore
  }
};
