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

export const setHistoryFilterForDate = (isoDate: string, force = false): void => {
  const value = String(isoDate || "").trim();
  if (!isIsoDate(value)) {
    if (hasHistoryFilterRange()) markHistoryReturn();
    return;
  }
  try {
    // When force is true, replace any existing history range.
    if (force || !hasHistoryFilterRange()) {
      sessionStorage.setItem(HISTORY_FILTER_KEY, JSON.stringify({ fromDate: value, toDate: value }));
    }
  } catch {
    // ignore
  }
  markHistoryReturn();
};

let actionMarkHideTimer: number | null = null;
let actionMarkAttentionFrame: number | null = null;
let actionMarkAttentionCommitFrame: number | null = null;
let actionMarkAttentionFallbackTimer: number | null = null;
const actionMarkAttentionTypes = new Set(["errorProcess", "warningProcess"]);

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

// Cancels pending attention work so only the latest ActionMark can move focus.
const cancelScheduledActionMarkAttention = () => {
  if (actionMarkAttentionFrame !== null && typeof window.cancelAnimationFrame === "function") {
    window.cancelAnimationFrame(actionMarkAttentionFrame);
  }
  if (actionMarkAttentionCommitFrame !== null && typeof window.cancelAnimationFrame === "function") {
    window.cancelAnimationFrame(actionMarkAttentionCommitFrame);
  }
  if (actionMarkAttentionFallbackTimer !== null) {
    window.clearTimeout(actionMarkAttentionFallbackTimer);
  }
  actionMarkAttentionFrame = null;
  actionMarkAttentionCommitFrame = null;
  actionMarkAttentionFallbackTimer = null;
};

// Focuses explicit feedback after React has committed it and reveals page feedback immediately.
const moveActionMarkAttentionToFeedback = () => {
  const candidates = Array.from(document.querySelectorAll<HTMLElement>("[data-ind-action-feedback]")).filter(
    (element) => element.isConnected && !element.hidden && element.getAttribute("aria-hidden") !== "true"
  );
  const target =
    candidates.find((element) => element.getAttribute("data-ind-action-feedback") === "modal") ||
    candidates[0] ||
    null;

  if (target) {
    try {
      target.focus({ preventScroll: true });
    } catch {
      target.focus();
    }
    if (target.getAttribute("data-ind-action-feedback") === "modal") {
      return;
    }
  }

  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
};

// Waits two frames because callers can publish the feedback after flashing the mark.
const scheduleActionMarkAttention = () => {
  if (typeof window.requestAnimationFrame !== "function") {
    actionMarkAttentionFallbackTimer = window.setTimeout(() => {
      actionMarkAttentionFallbackTimer = null;
      moveActionMarkAttentionToFeedback();
    }, 0);
    return;
  }

  actionMarkAttentionFrame = window.requestAnimationFrame(() => {
    actionMarkAttentionFrame = null;
    actionMarkAttentionCommitFrame = window.requestAnimationFrame(() => {
      actionMarkAttentionCommitFrame = null;
      moveActionMarkAttentionToFeedback();
    });
  });
};

const flashActionMarkLocal = (type: string, durationMs: number) => {
  cancelScheduledActionMarkAttention();
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
      colorClass = "text-emerald-600";
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

  if (actionMarkAttentionTypes.has(type)) {
    scheduleActionMarkAttention();
  }

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
