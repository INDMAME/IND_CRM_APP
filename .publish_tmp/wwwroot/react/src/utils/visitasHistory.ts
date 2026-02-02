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

let actionMarkHideTimer: number | null = null;

const getActionMarkNodes = () => ({
  root: document.getElementById("indActionMark"),
  wrap: document.getElementById("indActionMarkWrap"),
  check: document.getElementById("indMarkCheck"),
  warn: document.getElementById("indMarkWarning"),
  error: document.getElementById("indMarkError"),
});

const resetActionMark = (nodes: ReturnType<typeof getActionMarkNodes>) => {
  if (!nodes.wrap) return;
  nodes.wrap.classList.remove("text-emerald-600", "text-rose-600", "text-amber-500");
  nodes.wrap.classList.remove("drop-shadow-[0_18px_24px_rgba(0,0,0,0.15)]");
  if (nodes.check) nodes.check.classList.add("hidden");
  if (nodes.warn) nodes.warn.classList.add("hidden");
  if (nodes.error) nodes.error.classList.add("hidden");
};

const hideActionMark = (nodes: ReturnType<typeof getActionMarkNodes>) => {
  if (!nodes.root) return;
  nodes.root.classList.add("hidden");
  nodes.root.setAttribute("aria-hidden", "true");
  resetActionMark(nodes);
};

const flashActionMarkLocal = (type: string, durationMs: number) => {
  const nodes = getActionMarkNodes();
  if (!nodes.root || !nodes.wrap || !nodes.check || !nodes.warn || !nodes.error) {
    return;
  }

  if (actionMarkHideTimer) {
    window.clearTimeout(actionMarkHideTimer);
    actionMarkHideTimer = null;
  }

  resetActionMark(nodes);

  let icon = nodes.check;
  let colorClass = "text-emerald-600";

  switch (type) {
    case "okProcess":
      icon = nodes.check;
      colorClass = "text-emerald-600";
      break;
    case "okDelProcess":
      icon = nodes.check;
      colorClass = "text-rose-600";
      break;
    case "warningProcess":
      icon = nodes.warn;
      colorClass = "text-amber-500";
      break;
    case "errorProcess":
      icon = nodes.error;
      colorClass = "text-rose-600";
      break;
    default:
      icon = nodes.check;
      colorClass = "text-emerald-600";
      break;
  }

  nodes.wrap.classList.add(colorClass);
  nodes.wrap.classList.add("drop-shadow-[0_18px_24px_rgba(0,0,0,0.15)]");
  icon.classList.remove("hidden");
  nodes.root.classList.remove("hidden");
  nodes.root.setAttribute("aria-hidden", "false");
  nodes.root.style.setProperty("display", "flex", "important");
  nodes.root.style.setProperty("opacity", "1", "important");
  nodes.root.style.setProperty("visibility", "visible", "important");

  if (durationMs > 0) {
    actionMarkHideTimer = window.setTimeout(() => {
      nodes.root.style.removeProperty("display");
      nodes.root.style.removeProperty("opacity");
      nodes.root.style.removeProperty("visibility");
      hideActionMark(nodes);
    }, durationMs);
  }
};

export const flashActionMark = (type: string, durationMs: number) => {
  try {
    if (window.IND && typeof window.IND.flashActionMark === "function") {
      window.IND.flashActionMark({ type, durationMs });
      return;
    }
  } catch {
    // ignore
  }

  try {
    flashActionMarkLocal(type, durationMs);
  } catch {
    // ignore
  }
};
