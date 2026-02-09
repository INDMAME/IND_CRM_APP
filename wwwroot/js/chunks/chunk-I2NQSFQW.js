import {
  ChevronDownSvg,
  ChevronUpSvg,
  FloatingList_default,
  Spinner_default,
  classNames,
  indT,
  useOutsideClick
} from "./chunk-J3WMNRY4.js";
import {
  readAndClearTextEditorValue
} from "./chunk-QO7GVWVB.js";
import {
  require_jsx_runtime,
  require_react,
  require_react_dom
} from "./chunk-BWM3JLWG.js";
import {
  __toESM
} from "./chunk-45FWCHS2.js";

// Web/wwwroot/react/src/context/I18nContext.tsx
var import_react = __toESM(require_react());
var import_jsx_runtime = __toESM(require_jsx_runtime());
var defaultDict = {};
var defaultValue = {
  dictionary: defaultDict,
  t: (key, fallback) => fallback || key,
  format: (key, fallback, ...args) => {
    const template = fallback || key;
    return String(template).replace(/\{(\d+)\}/g, (_, idx) => String(args[Number(idx)] ?? ""));
  }
};
var I18nContext = (0, import_react.createContext)(defaultValue);
var I18nProvider = ({ children, dictionary }) => {
  const dict = dictionary || (globalThis.__IND_I18N__ || {});
  const value = (0, import_react.useMemo)(() => {
    const t = (key, fallback) => {
      const value2 = dict[key];
      if (typeof value2 === "string" && value2.trim()) return value2;
      return fallback || key;
    };
    const format = (key, fallback, ...args) => {
      const template = t(key, fallback);
      return String(template).replace(/\{(\d+)\}/g, (_, idx) => String(args[Number(idx)] ?? ""));
    };
    return { dictionary: dict, t, format };
  }, [dict]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(I18nContext.Provider, { value, children });
};

// Web/wwwroot/react/src/context/AuthContext.tsx
var import_react2 = __toESM(require_react());
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var ACCESS_RIGHTS = {
  View: 1,
  Edit: 2,
  Add: 3,
  FullAccess: 4
};
var defaultValue2 = {
  moduleAccess: {},
  selectedCompany: "",
  canAccess: () => false
};
var AuthContext = (0, import_react2.createContext)(defaultValue2);
var AuthProvider = ({ children, moduleAccess, selectedCompany }) => {
  const access = moduleAccess || (globalThis.__IND_MODULE_ACCESS__ || {});
  const company = selectedCompany || String(globalThis.__IND_SELECTED_COMPANY__ || "");
  const value = (0, import_react2.useMemo)(() => {
    const canAccess = (code, level = "View") => {
      const current = Number(access?.[code] ?? 0);
      return current >= ACCESS_RIGHTS[level];
    };
    return { moduleAccess: access, selectedCompany: company, canAccess };
  }, [access, company]);
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(AuthContext.Provider, { value, children });
};

// Web/wwwroot/react/src/components/commons/VisitasPageProviders.tsx
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
var VisitasPageProviders = ({ children }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(I18nProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(AuthProvider, { children }) });
};
var VisitasPageProviders_default = VisitasPageProviders;

// Web/wwwroot/react/src/components/commons/ConfirmModal.tsx
var import_react_dom = __toESM(require_react_dom());
var import_jsx_runtime4 = __toESM(require_jsx_runtime());
function ConfirmModal({
  open,
  title,
  message,
  confirmText,
  cancelText,
  loadingText,
  showCancel = true,
  showConfirm = true,
  busy = false,
  error = "",
  status = "",
  onConfirm,
  onCancel
}) {
  if (!open) return null;
  const showInfo = busy || !!error;
  const infoText = busy ? status || loadingText : error;
  return (0, import_react_dom.createPortal)(
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "fixed inset-0 z-600000 flex items-center justify-center bg-black/40 px-4", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "w-full max-w-sm rounded-2xl bg-white shadow-xl border border-slate-200 p-5 space-y-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "text-lg font-semibold text-slate-900", children: title }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "text-sm text-slate-700 whitespace-pre-line", children: message }),
      showInfo && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex items-center gap-2 text-sm text-slate-600", children: [
        busy && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Spinner_default, { size: "h-4 w-4" }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: error && !busy ? "text-rose-700" : "", children: infoText })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex justify-end gap-2 pt-2", children: [
        showCancel && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          "button",
          {
            type: "button",
            className: "px-4 py-2 rounded-xl border border-slate-300 text-slate-700 hover:border-primary hover:text-primary transition",
            onClick: onCancel,
            disabled: busy,
            children: cancelText
          }
        ),
        showConfirm && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          "button",
          {
            type: "button",
            className: "px-4 py-2 rounded-xl bg-primary text-white hover:bg-primary/90 transition",
            onClick: onConfirm,
            disabled: busy,
            children: busy ? loadingText : confirmText
          }
        )
      ] })
    ] }) }),
    document.body
  );
}

// Web/wwwroot/react/src/components/commons/AppErrorBoundary.tsx
var import_react3 = __toESM(require_react());
var import_jsx_runtime5 = __toESM(require_jsx_runtime());
var AppErrorBoundary = class extends import_react3.default.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.error("[AppErrorBoundary] render error", error, info);
  }
  render() {
    if (this.state.hasError) {
      return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "p-4 rounded-xl border border-rose-200 bg-rose-50 text-rose-700", children: this.props.fallbackMessage });
    }
    return this.props.children;
  }
};
var AppErrorBoundary_default = AppErrorBoundary;

// Web/wwwroot/react/src/hooks/useVisitas.ts
var useVisitas = () => {
  const visitTypes = typeof window !== "undefined" && window.__VISIT_TYPES__ || [];
  const asistenteTipos = typeof window !== "undefined" && window.__ASISTENTE_TIPOS__ || [];
  return {
    visitTypes,
    asistenteTipos
  };
};

// Web/wwwroot/react/src/utils/previewTooltip.ts
var PREVIEW_MAX_HEIGHT_RATIO = 0.8;
var PREVIEW_BASE_FONT = 13;
var PREVIEW_MIN_FONT = 11;
var previewAnchor = null;
var previewCloseBound = false;
var setPreviewAnchor = (anchor) => {
  previewAnchor = anchor;
};
var ensurePreviewTooltip = () => {
  let tooltipEl = document.getElementById("indPreviewTooltip");
  if (tooltipEl) return tooltipEl;
  tooltipEl = document.createElement("div");
  tooltipEl.id = "indPreviewTooltip";
  tooltipEl.className = "ind-preview-tooltip";
  document.body.appendChild(tooltipEl);
  return tooltipEl;
};
var ensurePreviewAutoClose = () => {
  if (previewCloseBound) return;
  previewCloseBound = true;
  document.addEventListener(
    "pointerdown",
    (event) => {
      const tooltipEl = document.getElementById("indPreviewTooltip");
      if (!tooltipEl || !tooltipEl.classList.contains("visible")) return;
      if (previewAnchor && previewAnchor.contains(event.target)) return;
      hidePreviewTooltip();
    },
    true
  );
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") hidePreviewTooltip();
  });
};
var showPreviewTooltip = (text, clientY) => {
  if (!text) return false;
  const tooltipEl = ensurePreviewTooltip();
  tooltipEl.textContent = text;
  tooltipEl.classList.add("visible");
  previewAnchor = null;
  ensurePreviewAutoClose();
  const centerX = Math.round(window.innerWidth / 2);
  tooltipEl.style.left = `${centerX}px`;
  const margin = 12;
  tooltipEl.style.maxHeight = `${Math.round(window.innerHeight * PREVIEW_MAX_HEIGHT_RATIO)}px`;
  tooltipEl.style.overflowY = "auto";
  let fontSize = PREVIEW_BASE_FONT;
  tooltipEl.style.fontSize = `${fontSize}px`;
  let rect = tooltipEl.getBoundingClientRect();
  const maxHeight = window.innerHeight * PREVIEW_MAX_HEIGHT_RATIO;
  while (rect.height > maxHeight && fontSize > PREVIEW_MIN_FONT) {
    fontSize -= 1;
    tooltipEl.style.fontSize = `${fontSize}px`;
    rect = tooltipEl.getBoundingClientRect();
  }
  const centerY = Math.round((window.innerHeight - rect.height) / 2);
  let top = Number.isFinite(centerY) ? centerY : margin;
  const minTop = margin;
  const maxTop = Math.max(margin, window.innerHeight - rect.height - margin);
  if (top < minTop) top = minTop;
  if (top > maxTop) top = maxTop;
  tooltipEl.style.top = `${Math.round(top)}px`;
  return true;
};
var hidePreviewTooltip = () => {
  const tooltipEl = document.getElementById("indPreviewTooltip");
  if (!tooltipEl) return;
  tooltipEl.classList.remove("visible");
  previewAnchor = null;
};
var isOverflowing = (el) => {
  if (!el) return false;
  return el.scrollWidth > el.clientWidth + 1 || el.scrollHeight > el.clientHeight + 1;
};

// Web/wwwroot/react/src/hooks/useTapGuard.ts
var import_react4 = __toESM(require_react());
var DEFAULT_MOVE_PX = 14;
var DEFAULT_HOLD_MS = 160;
var useTapGuard = (onTap, onHoldStart, options) => {
  const movePx = options?.movePx ?? DEFAULT_MOVE_PX;
  const holdMs = options?.holdMs ?? DEFAULT_HOLD_MS;
  const stateRef = import_react4.default.useRef({
    active: false,
    pointerId: null,
    startX: 0,
    startY: 0,
    moved: false,
    held: false,
    target: null
  });
  const holdTimerRef = import_react4.default.useRef(null);
  const reset = import_react4.default.useCallback(() => {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
    stateRef.current.active = false;
    stateRef.current.pointerId = null;
    stateRef.current.moved = false;
    stateRef.current.held = false;
    stateRef.current.target = null;
  }, []);
  const onPointerDown = import_react4.default.useCallback(
    (event) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      stateRef.current.active = true;
      stateRef.current.pointerId = event.pointerId;
      stateRef.current.startX = event.clientX;
      stateRef.current.startY = event.clientY;
      stateRef.current.moved = false;
      stateRef.current.held = false;
      stateRef.current.target = event.currentTarget;
      if (onHoldStart) {
        if (holdTimerRef.current) {
          clearTimeout(holdTimerRef.current);
        }
        holdTimerRef.current = window.setTimeout(() => {
          const state = stateRef.current;
          if (!state.active || state.moved || !state.target) return;
          const didShow = onHoldStart(state.target, state.startY);
          state.held = didShow === true;
        }, holdMs);
      }
    },
    [onHoldStart, holdMs]
  );
  const onPointerMove = import_react4.default.useCallback(
    (event) => {
      const state = stateRef.current;
      if (!state.active || state.pointerId !== event.pointerId) return;
      const dx = Math.abs(event.clientX - state.startX);
      const dy = Math.abs(event.clientY - state.startY);
      if (dx > movePx || dy > movePx) {
        state.moved = true;
        if (holdTimerRef.current) {
          clearTimeout(holdTimerRef.current);
          holdTimerRef.current = null;
        }
        if (state.held) hidePreviewTooltip();
      }
    },
    [movePx]
  );
  const onPointerUp = import_react4.default.useCallback(
    (event) => {
      const state = stateRef.current;
      if (!state.active || state.pointerId !== event.pointerId) return;
      const shouldTap = !state.moved && !state.held;
      reset();
      if (shouldTap) onTap(event);
    },
    [onTap, reset]
  );
  return {
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel: reset
  };
};

// Web/wwwroot/react/src/hooks/useConfirmDialog.ts
var import_react5 = __toESM(require_react());
var useConfirmDialog = ({ defaultConfirmText, defaultCancelText }) => {
  const [modal, setModal] = (0, import_react5.useState)({
    open: false,
    title: "",
    message: "",
    confirmText: defaultConfirmText,
    cancelText: defaultCancelText,
    showCancel: true,
    showConfirm: true,
    onConfirm: null
  });
  const confirmInFlightRef = (0, import_react5.useRef)(false);
  const openConfirm = (0, import_react5.useCallback)(
    (opts) => {
      setModal({
        open: true,
        title: opts?.title || "",
        message: opts?.message || "",
        confirmText: opts?.confirmText || defaultConfirmText,
        cancelText: opts?.cancelText || defaultCancelText,
        showCancel: opts?.showCancel !== false,
        showConfirm: opts?.showConfirm !== false,
        onConfirm: opts?.onConfirm || null
      });
    },
    [defaultCancelText, defaultConfirmText]
  );
  const closeConfirm = (0, import_react5.useCallback)(() => {
    setModal((prev) => ({ ...prev, open: false }));
  }, []);
  const handleConfirm = (0, import_react5.useCallback)(
    async ({ busy, onError, defaultErrorMessage }) => {
      if (busy) return;
      const cb = modal.onConfirm;
      if (typeof cb !== "function") {
        closeConfirm();
        return;
      }
      if (confirmInFlightRef.current) return;
      confirmInFlightRef.current = true;
      try {
        const result = await cb();
        if (result !== false) {
          closeConfirm();
        }
      } catch (err) {
        const msg = err?.message || defaultErrorMessage || indT("Api_RequestFailed", "Request failed. Please try again.");
        onError(msg);
      } finally {
        confirmInFlightRef.current = false;
      }
    },
    [closeConfirm, modal.onConfirm]
  );
  return {
    modal,
    openConfirm,
    closeConfirm,
    handleConfirm
  };
};

// Web/wwwroot/react/src/hooks/useTextEditorFields.ts
var import_react6 = __toESM(require_react());
var useTextEditorFields = (fields, options) => {
  const applyOnMount = options?.applyOnMount !== false;
  const listenPageShow = options?.listenPageShow !== false;
  const applyValues = (0, import_react6.useCallback)(() => {
    fields.forEach((field) => {
      const value = readAndClearTextEditorValue(field.fieldId);
      if (value !== null) {
        field.applyValue(value);
      }
    });
  }, [fields]);
  (0, import_react6.useEffect)(() => {
    if (applyOnMount) {
      applyValues();
    }
    if (!listenPageShow) return void 0;
    const onPageShow = () => applyValues();
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, [applyOnMount, applyValues, listenPageShow]);
  return {
    applyValues
  };
};

// Web/wwwroot/react/src/components/commons/SingleDatePicker.tsx
var import_react7 = __toESM(require_react());
var import_jsx_runtime6 = __toESM(require_jsx_runtime());
var IND_I18N = globalThis.__IND_I18N__ || {};
var indT2 = (key, fallback) => IND_I18N && typeof IND_I18N[key] === "string" && IND_I18N[key] || fallback || key;
var pad = (n) => String(n).padStart(2, "0");
var toISO = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
var parseISO = (s) => {
  if (!s) return null;
  const raw = String(s).trim();
  if (!raw) return null;
  const parts = raw.split("-");
  if (parts.length === 3) {
    const [y, m, d] = parts.map(Number);
    if (!Number.isNaN(y) && !Number.isNaN(m) && !Number.isNaN(d)) {
      return new Date(y, m - 1, d);
    }
  }
  return null;
};
var normalizeUiLocale = (locale) => {
  const value = String(locale || "").trim();
  if (!value) return "es-ES";
  if (/^zh-hans/i.test(value)) return "zh-CN";
  return value;
};
var getUiLocale = () => {
  const fromHtml = document?.documentElement?.lang;
  if (fromHtml && String(fromHtml).trim()) return normalizeUiLocale(fromHtml);
  return "es-ES";
};
var isBasqueLocale = (locale) => /^eu\b/i.test(String(locale || ""));
var BASQUE_MONTHS = [
  "urtarrila",
  "otsaila",
  "martxoa",
  "apirila",
  "maiatza",
  "ekaina",
  "uztaila",
  "abuztua",
  "iraila",
  "urria",
  "azaroa",
  "abendua"
];
var BASQUE_MONTHS_SHORT = [
  "urt",
  "ots",
  "mar",
  "api",
  "mai",
  "eka",
  "uzt",
  "abu",
  "ira",
  "urr",
  "aza",
  "abe"
];
var formatDisplay = (d) => {
  if (!d) return indT2("History_AddDate", "Add date");
  const locale = getUiLocale();
  if (isBasqueLocale(locale)) {
    const month = BASQUE_MONTHS_SHORT[d.getMonth()];
    return `${d.getDate()} ${month} ${d.getFullYear()}`.toLowerCase();
  }
  return d.toLocaleDateString(locale, { day: "numeric", month: "short", year: "numeric" }).replace(/\./g, "").toLowerCase();
};
function SingleDatePicker({ label, value, onChange, disabled = false, readOnly = false }) {
  const effectiveLabel = label && String(label).trim() ? label : indT2("Visits_Detail_Date_Label", "Date");
  const selectedDate = (0, import_react7.useMemo)(() => parseISO(value), [value]);
  const [open, setOpen] = (0, import_react7.useState)(false);
  const [currentMonth, setCurrentMonth] = (0, import_react7.useState)(
    selectedDate ? selectedDate.getMonth() : (/* @__PURE__ */ new Date()).getMonth()
  );
  const [currentYear, setCurrentYear] = (0, import_react7.useState)(
    selectedDate ? selectedDate.getFullYear() : (/* @__PURE__ */ new Date()).getFullYear()
  );
  const containerRef = (0, import_react7.useRef)(null);
  (0, import_react7.useEffect)(() => {
    if (selectedDate) {
      setCurrentMonth(selectedDate.getMonth());
      setCurrentYear(selectedDate.getFullYear());
    }
  }, [selectedDate?.getTime()]);
  (0, import_react7.useEffect)(() => {
    const onDocClick = (ev) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(ev.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("touchstart", onDocClick, { passive: true });
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("touchstart", onDocClick);
    };
  }, []);
  const readOnlyMode = readOnly || disabled;
  (0, import_react7.useEffect)(() => {
    if (readOnlyMode) setOpen(false);
  }, [readOnlyMode]);
  const firstDay = new Date(currentYear, currentMonth, 1);
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const offset = (firstDay.getDay() + 6) % 7;
  const monthLabel = (() => {
    const locale = getUiLocale();
    if (/^zh/i.test(locale)) {
      return new Intl.DateTimeFormat(locale, { year: "numeric", month: "long" }).format(firstDay);
    }
    if (isBasqueLocale(locale)) {
      return `${BASQUE_MONTHS[currentMonth]} ${currentYear}`;
    }
    const raw = firstDay.toLocaleDateString(locale, { month: "long" });
    const first = raw.slice(0, 1);
    const rest = raw.slice(1);
    return `${first.toUpperCase()}${rest} ${currentYear}`;
  })();
  const sameDay = (a, b) => a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  const handleSelect = (0, import_react7.useCallback)(
    (dateObj) => {
      if (disabled) return;
      const iso = toISO(dateObj);
      onChange?.(iso);
      setOpen(false);
    },
    [disabled, onChange]
  );
  const goMonth = (inc) => {
    if (disabled) return;
    let m = currentMonth + inc;
    let y = currentYear;
    if (m > 11) {
      m = 0;
      y += 1;
    } else if (m < 0) {
      m = 11;
      y -= 1;
    }
    setCurrentMonth(m);
    setCurrentYear(y);
  };
  const valueColor = readOnlyMode ? "#64748b" : "#00296be0";
  const labelColor = "#00296be0";
  const containerClass = `space-y-2 ${disabled ? "pointer-events-none select-none" : ""}`.trim();
  const buttonClass = [
    "form-control",
    "flex items-center",
    "pr-10",
    readOnlyMode ? "ind-readonly-field" : "",
    readOnlyMode ? "cursor-not-allowed" : "cursor-pointer"
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: containerClass, ref: containerRef, children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("label", { className: "form-label font-semibold", style: { color: labelColor }, children: String(effectiveLabel) }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "relative", children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
        "button",
        {
          type: "button",
          className: buttonClass,
          onClick: () => {
            if (readOnlyMode) return;
            setOpen((v) => !v);
          },
          onKeyDown: (e) => {
            if (readOnlyMode) return;
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setOpen((v) => !v);
            }
            if (e.key === "Escape") setOpen(false);
          },
          "aria-expanded": open,
          "aria-disabled": readOnlyMode ? "true" : void 0,
          children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { style: { color: valueColor, fontWeight: 400 }, children: formatDisplay(selectedDate) })
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "absolute inset-y-0 right-0 flex items-center pr-2 text-slate-500 pointer-events-none", children: open ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(ChevronUpSvg, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(ChevronDownSvg, { className: "h-5 w-5" }) }),
      open && /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "drp-popover", role: "dialog", "aria-modal": "true", children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "drp-head", children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("button", { type: "button", className: "drp-nav", "aria-label": indT2("History_PrevMonth", "Previous month"), onClick: () => goMonth(-1), children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4", fill: "none", viewBox: "0 0 30 30", stroke: "currentColor", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M15 19l-7-7 7-7" }) }) }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "drp-month", children: monthLabel }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("button", { type: "button", className: "drp-nav", "aria-label": indT2("History_NextMonth", "Next month"), onClick: () => goMonth(1), children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4", fill: "none", viewBox: "0 0 30 30", stroke: "currentColor", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 5l7 7-7 7" }) }) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "drp-weekdays", children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { children: indT2("History_Day_Mon", "Mo") }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { children: indT2("History_Day_Tue", "Tu") }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { children: indT2("History_Day_Wed", "We") }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { children: indT2("History_Day_Thu", "Th") }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { children: indT2("History_Day_Fri", "Fr") }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { children: indT2("History_Day_Sat", "Sa") }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { children: indT2("History_Day_Sun", "Su") })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "drp-grid", children: [
          Array.from({ length: offset }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("button", { className: "drp-day empty", disabled: true, type: "button" }, `e-${i}`)),
          Array.from({ length: daysInMonth }).map((_, idx) => {
            const day = idx + 1;
            const dateObj = new Date(currentYear, currentMonth, day);
            const isSelected = sameDay(dateObj, selectedDate);
            const isToday = sameDay(dateObj, /* @__PURE__ */ new Date());
            const cls = [
              "drp-day",
              isSelected ? "start range-start" : "",
              isToday ? "today" : ""
            ].join(" ");
            return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
              "button",
              {
                type: "button",
                className: cls,
                onClick: () => handleSelect(dateObj),
                children: day
              },
              toISO(dateObj)
            );
          })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "drp-status", children: indT2("DatePicker_SelectDate", "Select date") })
      ] })
    ] })
  ] });
}

// Web/wwwroot/react/src/components/commons/SelectCombobox.tsx
var import_react8 = __toESM(require_react());
var import_jsx_runtime7 = __toESM(require_jsx_runtime());
var SelectCombobox = ({
  label,
  options,
  value,
  onChange,
  placeholder,
  invalid = false,
  disabled = false,
  readOnly = false,
  usePortal = true,
  emitOnValueChange = false,
  idBase,
  portalClassName,
  panelClassName
}) => {
  const readOnlyMode = readOnly || disabled;
  const valueColor = readOnlyMode ? "#64748b" : "#00296be0";
  const data = (0, import_react8.useMemo)(() => {
    return (options || []).map((o) => {
      if (Array.isArray(o)) {
        return { value: o[0] ?? "", text: o[1] ?? "" };
      }
      return { value: o?.value ?? o?.Value ?? "", text: o?.text ?? o?.Text ?? "" };
    });
  }, [options]);
  const [query, setQuery] = (0, import_react8.useState)("");
  const [selected, setSelected] = (0, import_react8.useState)(
    data.find((d) => String(d.value) === String(value)) || data[0] || { value: "", text: "" }
  );
  const [open, setOpen] = (0, import_react8.useState)(false);
  const [activeIndex, setActiveIndex] = (0, import_react8.useState)(0);
  const containerRef = (0, import_react8.useRef)(null);
  const boxRef = (0, import_react8.useRef)(null);
  const listRef = (0, import_react8.useRef)(null);
  useOutsideClick([containerRef, listRef], () => setOpen(false));
  (0, import_react8.useEffect)(() => {
    setSelected(data.find((d) => String(d.value) === String(value)) || data[0] || { value: "", text: "" });
  }, [value, data]);
  (0, import_react8.useEffect)(() => {
    setQuery("");
  }, [selected]);
  (0, import_react8.useEffect)(() => {
    if (!emitOnValueChange) return;
    onChange(selected?.value ? String(selected.value) : "");
  }, [emitOnValueChange, onChange, selected]);
  const filtered = (0, import_react8.useMemo)(() => {
    if (!query.trim()) return data;
    const f = data.filter((o) => o.text.toLowerCase().includes(query.toLowerCase()));
    return f.length ? f : data;
  }, [data, query]);
  (0, import_react8.useEffect)(() => {
    setActiveIndex(0);
  }, [filtered.length, query]);
  const selectOption = (opt) => {
    setSelected(opt);
    setQuery("");
    setOpen(false);
    if (!emitOnValueChange) {
      onChange(opt?.value ? String(opt.value) : "");
    }
  };
  const handleKeyDown = (ev) => {
    if (disabled) return;
    if (ev.key === "ArrowDown") {
      ev.preventDefault();
      setOpen(true);
      if (filtered.length) setActiveIndex((idx) => (idx + 1) % filtered.length);
      return;
    }
    if (ev.key === "ArrowUp") {
      ev.preventDefault();
      setOpen(true);
      if (filtered.length) setActiveIndex((idx) => (idx - 1 + filtered.length) % filtered.length);
      return;
    }
    if (ev.key === "Enter") {
      ev.preventDefault();
      if (open && filtered.length) {
        selectOption(filtered[activeIndex] ?? filtered[0]);
      } else {
        setOpen(true);
      }
    }
    if (ev.key === "Escape") setOpen(false);
  };
  const safeId = String(idBase || label || "select");
  const listId = `select-options-${safeId}`;
  const activeId = open && filtered[activeIndex] ? `select-opt-${safeId}-${filtered[activeIndex].value}` : void 0;
  const listOpen = open && !disabled;
  const listBody = /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { id: listId, ref: listRef, role: "listbox", "aria-label": label, children: [
    filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "px-4 py-2 text-sm text-slate-500", children: indT("Dropdown_NoResults", "No results") }),
    filtered.map((opt, idx) => {
      const sel = selected?.value === opt.value;
      const isActive = idx === activeIndex;
      return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
        "button",
        {
          type: "button",
          id: `select-opt-${safeId}-${opt.value}`,
          role: "option",
          "aria-selected": sel,
          className: classNames(
            "relative flex w-full cursor-default select-none items-center py-2 pr-3 text-left text-sm type-option",
            isActive ? "bg-primary text-white" : "text-slate-900"
          ),
          onMouseEnter: () => setActiveIndex(idx),
          onClick: () => selectOption(opt),
          children: [
            sel && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
              "span",
              {
                className: classNames(
                  "absolute inset-y-0 left-0 flex items-center pl-2",
                  isActive ? "text-white" : "text-primary"
                )
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: classNames("block truncate", sel ? "font-medium" : "font-normal"), children: opt.text })
          ]
        },
        String(opt.value)
      );
    })
  ] });
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
    "div",
    {
      className: classNames("space-y-2", disabled ? "pointer-events-none select-none" : ""),
      ref: containerRef,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("label", { className: classNames("form-label font-semibold", invalid ? "text-rose-700" : ""), children: label }),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "relative", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
            "div",
            {
              ref: boxRef,
              className: classNames(
                "relative w-full cursor-default rounded-xl bg-white text-left focus-within:border-primary focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-white sm:text-sm",
                readOnlyMode ? "ind-readonly-field" : ""
              ),
              style: readOnlyMode ? { color: valueColor } : void 0,
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
                  "input",
                  {
                    className: classNames(
                      "w-full rounded-xl border px-3 py-2 pr-10 text-sm sm:text-base leading-5 focus:outline-hidden focus:ring-2 disabled:bg-slate-100 disabled:text-slate-500 disabled:border-slate-200 disabled:cursor-not-allowed",
                      invalid ? "border-rose-400 bg-rose-50 focus:ring-rose-200 focus:border-rose-400" : "border-slate-200 focus:ring-primary focus:border-primary",
                      readOnlyMode ? "ind-readonly-field" : "text-slate-900"
                    ),
                    style: readOnlyMode ? { color: valueColor } : void 0,
                    value: query || selected?.text || "",
                    disabled,
                    onChange: (event) => {
                      const val = event.target.value;
                      setQuery(val);
                      setOpen(true);
                    },
                    onKeyDown: handleKeyDown,
                    onFocus: () => {
                      if (!disabled) setOpen(true);
                    },
                    placeholder,
                    role: "combobox",
                    "aria-expanded": listOpen,
                    "aria-controls": listId,
                    "aria-activedescendant": activeId
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
                  "button",
                  {
                    type: "button",
                    className: "absolute inset-y-0 right-0 flex items-center pr-2 text-slate-500 hover:text-slate-600",
                    onClick: () => {
                      if (disabled) return;
                      setOpen((prev) => !prev);
                    },
                    "aria-label": open ? indT("Dropdown_HideOptions", "Hide options") : indT("Dropdown_ShowOptions", "Show options"),
                    disabled,
                    children: open ? /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(ChevronUpSvg, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(ChevronDownSvg, { className: "h-5 w-5" })
                  }
                )
              ]
            }
          ),
          usePortal ? /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
            FloatingList_default,
            {
              anchorRef: boxRef,
              open: listOpen,
              zIndex: 36e4,
              maxHeightClass: "max-h-72",
              role: "listbox",
              roundedClass: "rounded-xl",
              portalClassName,
              panelClassName,
              children: listBody
            }
          ) : listOpen && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "absolute z-360000 mt-1 w-full rounded-xl bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden max-h-72 overflow-auto", children: listBody })
        ] })
      ]
    }
  );
};
var SelectCombobox_default = SelectCombobox;

// Web/wwwroot/react/src/components/visitas/VisitNarrativeFields.tsx
var import_jsx_runtime8 = __toESM(require_jsx_runtime());
var VisitNarrativeFields = ({
  descriptionLabel,
  descriptionValue,
  descriptionClassName,
  descriptionDisabled = false,
  descriptionMaxLength = 200,
  onDescriptionChange,
  tapFields
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "grid grid-cols-1 gap-3", children: [
    /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "space-y-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("label", { className: "form-label font-semibold", children: descriptionLabel }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
        "input",
        {
          id: "description",
          className: descriptionClassName,
          maxLength: descriptionMaxLength,
          value: descriptionValue,
          disabled: descriptionDisabled,
          onChange: (e) => onDescriptionChange(e.target.value)
        }
      )
    ] }),
    tapFields.map((field) => /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "space-y-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("label", { className: "form-label font-semibold", children: field.label }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
        "textarea",
        {
          id: field.id,
          className: field.className,
          value: field.value,
          readOnly: true,
          onPointerDown: field.pointerBindings.onPointerDown,
          onPointerMove: field.pointerBindings.onPointerMove,
          onPointerUp: field.pointerBindings.onPointerUp,
          onPointerCancel: field.pointerBindings.onPointerCancel
        }
      )
    ] }, field.id))
  ] });
};
var VisitNarrativeFields_default = VisitNarrativeFields;

// Web/wwwroot/react/src/utils/wait.ts
var wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export {
  ConfirmModal,
  AppErrorBoundary_default,
  useVisitas,
  setPreviewAnchor,
  showPreviewTooltip,
  isOverflowing,
  useTapGuard,
  useConfirmDialog,
  wait,
  useTextEditorFields,
  SingleDatePicker,
  SelectCombobox_default,
  VisitNarrativeFields_default,
  VisitasPageProviders_default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL2NvbnRleHQvSTE4bkNvbnRleHQudHN4IiwgIi4uLy4uL3JlYWN0L3NyYy9jb250ZXh0L0F1dGhDb250ZXh0LnRzeCIsICIuLi8uLi9yZWFjdC9zcmMvY29tcG9uZW50cy9jb21tb25zL1Zpc2l0YXNQYWdlUHJvdmlkZXJzLnRzeCIsICIuLi8uLi9yZWFjdC9zcmMvY29tcG9uZW50cy9jb21tb25zL0NvbmZpcm1Nb2RhbC50c3giLCAiLi4vLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9BcHBFcnJvckJvdW5kYXJ5LnRzeCIsICIuLi8uLi9yZWFjdC9zcmMvaG9va3MvdXNlVmlzaXRhcy50cyIsICIuLi8uLi9yZWFjdC9zcmMvdXRpbHMvcHJldmlld1Rvb2x0aXAudHMiLCAiLi4vLi4vcmVhY3Qvc3JjL2hvb2tzL3VzZVRhcEd1YXJkLnRzIiwgIi4uLy4uL3JlYWN0L3NyYy9ob29rcy91c2VDb25maXJtRGlhbG9nLnRzIiwgIi4uLy4uL3JlYWN0L3NyYy9ob29rcy91c2VUZXh0RWRpdG9yRmllbGRzLnRzIiwgIi4uLy4uL3JlYWN0L3NyYy9jb21wb25lbnRzL2NvbW1vbnMvU2luZ2xlRGF0ZVBpY2tlci50c3giLCAiLi4vLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9TZWxlY3RDb21ib2JveC50c3giLCAiLi4vLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvdmlzaXRhcy9WaXNpdE5hcnJhdGl2ZUZpZWxkcy50c3giLCAiLi4vLi4vcmVhY3Qvc3JjL3V0aWxzL3dhaXQudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBSZWFjdCwgeyBjcmVhdGVDb250ZXh0LCB1c2VDb250ZXh0LCB1c2VNZW1vIH0gZnJvbSBcInJlYWN0XCI7XG5cbnR5cGUgSTE4bkRpY3QgPSBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+O1xuXG50eXBlIEkxOG5WYWx1ZSA9IHtcbiAgZGljdGlvbmFyeTogSTE4bkRpY3Q7XG4gIHQ6IChrZXk6IHN0cmluZywgZmFsbGJhY2s/OiBzdHJpbmcpID0+IHN0cmluZztcbiAgZm9ybWF0OiAoa2V5OiBzdHJpbmcsIGZhbGxiYWNrOiBzdHJpbmcgfCB1bmRlZmluZWQsIC4uLmFyZ3M6IEFycmF5PHN0cmluZyB8IG51bWJlcj4pID0+IHN0cmluZztcbn07XG5cbmNvbnN0IGRlZmF1bHREaWN0OiBJMThuRGljdCA9IHt9O1xuXG5jb25zdCBkZWZhdWx0VmFsdWU6IEkxOG5WYWx1ZSA9IHtcbiAgZGljdGlvbmFyeTogZGVmYXVsdERpY3QsXG4gIHQ6IChrZXksIGZhbGxiYWNrKSA9PiBmYWxsYmFjayB8fCBrZXksXG4gIGZvcm1hdDogKGtleSwgZmFsbGJhY2ssIC4uLmFyZ3MpID0+IHtcbiAgICBjb25zdCB0ZW1wbGF0ZSA9IGZhbGxiYWNrIHx8IGtleTtcbiAgICByZXR1cm4gU3RyaW5nKHRlbXBsYXRlKS5yZXBsYWNlKC9cXHsoXFxkKylcXH0vZywgKF8sIGlkeCkgPT4gU3RyaW5nKGFyZ3NbTnVtYmVyKGlkeCldID8/IFwiXCIpKTtcbiAgfSxcbn07XG5cbmNvbnN0IEkxOG5Db250ZXh0ID0gY3JlYXRlQ29udGV4dDxJMThuVmFsdWU+KGRlZmF1bHRWYWx1ZSk7XG5cbnR5cGUgUHJvdmlkZXJQcm9wcyA9IHtcbiAgY2hpbGRyZW46IFJlYWN0LlJlYWN0Tm9kZTtcbiAgZGljdGlvbmFyeT86IEkxOG5EaWN0O1xufTtcblxuZXhwb3J0IGNvbnN0IEkxOG5Qcm92aWRlciA9ICh7IGNoaWxkcmVuLCBkaWN0aW9uYXJ5IH06IFByb3ZpZGVyUHJvcHMpID0+IHtcbiAgY29uc3QgZGljdCA9IGRpY3Rpb25hcnkgfHwgKGdsb2JhbFRoaXMuX19JTkRfSTE4Tl9fIHx8IHt9KTtcblxuICBjb25zdCB2YWx1ZSA9IHVzZU1lbW88STE4blZhbHVlPigoKSA9PiB7XG4gICAgY29uc3QgdCA9IChrZXk6IHN0cmluZywgZmFsbGJhY2s/OiBzdHJpbmcpID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gZGljdFtrZXldO1xuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiAmJiB2YWx1ZS50cmltKCkpIHJldHVybiB2YWx1ZTtcbiAgICAgIHJldHVybiBmYWxsYmFjayB8fCBrZXk7XG4gICAgfTtcbiAgICBjb25zdCBmb3JtYXQgPSAoa2V5OiBzdHJpbmcsIGZhbGxiYWNrOiBzdHJpbmcgfCB1bmRlZmluZWQsIC4uLmFyZ3M6IEFycmF5PHN0cmluZyB8IG51bWJlcj4pID0+IHtcbiAgICAgIGNvbnN0IHRlbXBsYXRlID0gdChrZXksIGZhbGxiYWNrKTtcbiAgICAgIHJldHVybiBTdHJpbmcodGVtcGxhdGUpLnJlcGxhY2UoL1xceyhcXGQrKVxcfS9nLCAoXywgaWR4KSA9PiBTdHJpbmcoYXJnc1tOdW1iZXIoaWR4KV0gPz8gXCJcIikpO1xuICAgIH07XG4gICAgcmV0dXJuIHsgZGljdGlvbmFyeTogZGljdCwgdCwgZm9ybWF0IH07XG4gIH0sIFtkaWN0XSk7XG5cbiAgcmV0dXJuIDxJMThuQ29udGV4dC5Qcm92aWRlciB2YWx1ZT17dmFsdWV9PntjaGlsZHJlbn08L0kxOG5Db250ZXh0LlByb3ZpZGVyPjtcbn07XG5cbmV4cG9ydCBjb25zdCB1c2VJMThuID0gKCkgPT4gdXNlQ29udGV4dChJMThuQ29udGV4dCk7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGNyZWF0ZUNvbnRleHQsIHVzZUNvbnRleHQsIHVzZU1lbW8gfSBmcm9tIFwicmVhY3RcIjtcblxuZXhwb3J0IHR5cGUgQWNjZXNzTGV2ZWwgPSBcIlZpZXdcIiB8IFwiRWRpdFwiIHwgXCJBZGRcIiB8IFwiRnVsbEFjY2Vzc1wiO1xuXG5jb25zdCBBQ0NFU1NfUklHSFRTOiBSZWNvcmQ8QWNjZXNzTGV2ZWwsIG51bWJlcj4gPSB7XG4gIFZpZXc6IDEsXG4gIEVkaXQ6IDIsXG4gIEFkZDogMyxcbiAgRnVsbEFjY2VzczogNCxcbn07XG5cbnR5cGUgQXV0aFZhbHVlID0ge1xuICBtb2R1bGVBY2Nlc3M6IFJlY29yZDxzdHJpbmcsIG51bWJlcj47XG4gIHNlbGVjdGVkQ29tcGFueTogc3RyaW5nO1xuICBjYW5BY2Nlc3M6IChjb2RlOiBzdHJpbmcsIGxldmVsPzogQWNjZXNzTGV2ZWwpID0+IGJvb2xlYW47XG59O1xuXG5jb25zdCBkZWZhdWx0VmFsdWU6IEF1dGhWYWx1ZSA9IHtcbiAgbW9kdWxlQWNjZXNzOiB7fSxcbiAgc2VsZWN0ZWRDb21wYW55OiBcIlwiLFxuICBjYW5BY2Nlc3M6ICgpID0+IGZhbHNlLFxufTtcblxuY29uc3QgQXV0aENvbnRleHQgPSBjcmVhdGVDb250ZXh0PEF1dGhWYWx1ZT4oZGVmYXVsdFZhbHVlKTtcblxudHlwZSBQcm92aWRlclByb3BzID0ge1xuICBjaGlsZHJlbjogUmVhY3QuUmVhY3ROb2RlO1xuICBtb2R1bGVBY2Nlc3M/OiBSZWNvcmQ8c3RyaW5nLCBudW1iZXI+O1xuICBzZWxlY3RlZENvbXBhbnk/OiBzdHJpbmc7XG59O1xuXG5leHBvcnQgY29uc3QgQXV0aFByb3ZpZGVyID0gKHsgY2hpbGRyZW4sIG1vZHVsZUFjY2Vzcywgc2VsZWN0ZWRDb21wYW55IH06IFByb3ZpZGVyUHJvcHMpID0+IHtcbiAgY29uc3QgYWNjZXNzID0gbW9kdWxlQWNjZXNzIHx8IChnbG9iYWxUaGlzLl9fSU5EX01PRFVMRV9BQ0NFU1NfXyB8fCB7fSk7XG4gIGNvbnN0IGNvbXBhbnkgPSBzZWxlY3RlZENvbXBhbnkgfHwgU3RyaW5nKGdsb2JhbFRoaXMuX19JTkRfU0VMRUNURURfQ09NUEFOWV9fIHx8IFwiXCIpO1xuXG4gIGNvbnN0IHZhbHVlID0gdXNlTWVtbzxBdXRoVmFsdWU+KCgpID0+IHtcbiAgICBjb25zdCBjYW5BY2Nlc3MgPSAoY29kZTogc3RyaW5nLCBsZXZlbDogQWNjZXNzTGV2ZWwgPSBcIlZpZXdcIikgPT4ge1xuICAgICAgY29uc3QgY3VycmVudCA9IE51bWJlcihhY2Nlc3M/Lltjb2RlXSA/PyAwKTtcbiAgICAgIHJldHVybiBjdXJyZW50ID49IEFDQ0VTU19SSUdIVFNbbGV2ZWxdO1xuICAgIH07XG4gICAgcmV0dXJuIHsgbW9kdWxlQWNjZXNzOiBhY2Nlc3MsIHNlbGVjdGVkQ29tcGFueTogY29tcGFueSwgY2FuQWNjZXNzIH07XG4gIH0sIFthY2Nlc3MsIGNvbXBhbnldKTtcblxuICByZXR1cm4gPEF1dGhDb250ZXh0LlByb3ZpZGVyIHZhbHVlPXt2YWx1ZX0+e2NoaWxkcmVufTwvQXV0aENvbnRleHQuUHJvdmlkZXI+O1xufTtcblxuZXhwb3J0IGNvbnN0IHVzZUF1dGhDb250ZXh0ID0gKCkgPT4gdXNlQ29udGV4dChBdXRoQ29udGV4dCk7XG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgSTE4blByb3ZpZGVyIH0gZnJvbSBcIi4uLy4uL2NvbnRleHQvSTE4bkNvbnRleHQudHN4XCI7XG5pbXBvcnQgeyBBdXRoUHJvdmlkZXIgfSBmcm9tIFwiLi4vLi4vY29udGV4dC9BdXRoQ29udGV4dC50c3hcIjtcblxudHlwZSBQcm9wcyA9IHtcbiAgY2hpbGRyZW46IFJlYWN0LlJlYWN0Tm9kZTtcbn07XG5cbi8vIFNoYXJlZCBwcm92aWRlciB3cmFwcGVyIGZvciB2aXNpdGFzIFJlYWN0IGlzbGFuZHMuXG5jb25zdCBWaXNpdGFzUGFnZVByb3ZpZGVycyA9ICh7IGNoaWxkcmVuIH06IFByb3BzKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPEkxOG5Qcm92aWRlcj5cbiAgICAgIDxBdXRoUHJvdmlkZXI+e2NoaWxkcmVufTwvQXV0aFByb3ZpZGVyPlxuICAgIDwvSTE4blByb3ZpZGVyPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgVmlzaXRhc1BhZ2VQcm92aWRlcnM7XG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgY3JlYXRlUG9ydGFsIH0gZnJvbSBcInJlYWN0LWRvbVwiO1xuaW1wb3J0IFNwaW5uZXIgZnJvbSBcIi4vU3Bpbm5lci50c3hcIjtcblxudHlwZSBDb25maXJtTW9kYWxQcm9wcyA9IHtcbiAgb3BlbjogYm9vbGVhbjtcbiAgdGl0bGU6IHN0cmluZztcbiAgbWVzc2FnZTogc3RyaW5nO1xuICBjb25maXJtVGV4dDogc3RyaW5nO1xuICBjYW5jZWxUZXh0OiBzdHJpbmc7XG4gIGxvYWRpbmdUZXh0OiBzdHJpbmc7XG4gIHNob3dDYW5jZWw/OiBib29sZWFuO1xuICBzaG93Q29uZmlybT86IGJvb2xlYW47XG4gIGJ1c3k/OiBib29sZWFuO1xuICBlcnJvcj86IHN0cmluZztcbiAgc3RhdHVzPzogc3RyaW5nO1xuICBvbkNvbmZpcm06ICgpID0+IHZvaWQ7XG4gIG9uQ2FuY2VsOiAoKSA9PiB2b2lkO1xufTtcblxuLy8gRHVtYiBjb25maXJtIG1vZGFsIHdpdGggb3B0aW9uYWwgc3Bpbm5lciBhbmQgc3RhdHVzIHRleHQuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDb25maXJtTW9kYWwoe1xuICBvcGVuLFxuICB0aXRsZSxcbiAgbWVzc2FnZSxcbiAgY29uZmlybVRleHQsXG4gIGNhbmNlbFRleHQsXG4gIGxvYWRpbmdUZXh0LFxuICBzaG93Q2FuY2VsID0gdHJ1ZSxcbiAgc2hvd0NvbmZpcm0gPSB0cnVlLFxuICBidXN5ID0gZmFsc2UsXG4gIGVycm9yID0gXCJcIixcbiAgc3RhdHVzID0gXCJcIixcbiAgb25Db25maXJtLFxuICBvbkNhbmNlbCxcbn06IENvbmZpcm1Nb2RhbFByb3BzKSB7XG4gIGlmICghb3BlbikgcmV0dXJuIG51bGw7XG5cbiAgY29uc3Qgc2hvd0luZm8gPSBidXN5IHx8ICEhZXJyb3I7XG4gIGNvbnN0IGluZm9UZXh0ID0gYnVzeSA/IChzdGF0dXMgfHwgbG9hZGluZ1RleHQpIDogZXJyb3I7XG5cbiAgcmV0dXJuIGNyZWF0ZVBvcnRhbChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImZpeGVkIGluc2V0LTAgei02MDAwMDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgYmctYmxhY2svNDAgcHgtNFwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgbWF4LXctc20gcm91bmRlZC0yeGwgYmctd2hpdGUgc2hhZG93LXhsIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHAtNSBzcGFjZS15LTRcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWxnIGZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS05MDBcIj57dGl0bGV9PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LXNsYXRlLTcwMCB3aGl0ZXNwYWNlLXByZS1saW5lXCI+e21lc3NhZ2V9PC9kaXY+XG4gICAgICAgIHtzaG93SW5mbyAmJiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0ZXh0LXNtIHRleHQtc2xhdGUtNjAwXCI+XG4gICAgICAgICAgICB7YnVzeSAmJiA8U3Bpbm5lciBzaXplPVwiaC00IHctNFwiIC8+fVxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtlcnJvciAmJiAhYnVzeSA/IFwidGV4dC1yb3NlLTcwMFwiIDogXCJcIn0+e2luZm9UZXh0fTwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktZW5kIGdhcC0yIHB0LTJcIj5cbiAgICAgICAgICB7c2hvd0NhbmNlbCAmJiAoXG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC00IHB5LTIgcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLXNsYXRlLTMwMCB0ZXh0LXNsYXRlLTcwMCBob3Zlcjpib3JkZXItcHJpbWFyeSBob3Zlcjp0ZXh0LXByaW1hcnkgdHJhbnNpdGlvblwiXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e29uQ2FuY2VsfVxuICAgICAgICAgICAgICBkaXNhYmxlZD17YnVzeX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge2NhbmNlbFRleHR9XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICApfVxuICAgICAgICAgIHtzaG93Q29uZmlybSAmJiAoXG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC00IHB5LTIgcm91bmRlZC14bCBiZy1wcmltYXJ5IHRleHQtd2hpdGUgaG92ZXI6YmctcHJpbWFyeS85MCB0cmFuc2l0aW9uXCJcbiAgICAgICAgICAgICAgb25DbGljaz17b25Db25maXJtfVxuICAgICAgICAgICAgICBkaXNhYmxlZD17YnVzeX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge2J1c3kgPyBsb2FkaW5nVGV4dCA6IGNvbmZpcm1UZXh0fVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj4sXG4gICAgZG9jdW1lbnQuYm9keVxuICApO1xufVxuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcblxudHlwZSBQcm9wcyA9IHtcbiAgZmFsbGJhY2tNZXNzYWdlOiBzdHJpbmc7XG4gIGNoaWxkcmVuOiBSZWFjdC5SZWFjdE5vZGU7XG59O1xuXG50eXBlIFN0YXRlID0ge1xuICBoYXNFcnJvcjogYm9vbGVhbjtcbn07XG5cbi8vIFNoYXJlZCBlcnJvciBib3VuZGFyeSBmb3IgUmVhY3QgaXNsYW5kcy5cbmNsYXNzIEFwcEVycm9yQm91bmRhcnkgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8UHJvcHMsIFN0YXRlPiB7XG4gIGNvbnN0cnVjdG9yKHByb3BzOiBQcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0geyBoYXNFcnJvcjogZmFsc2UgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXREZXJpdmVkU3RhdGVGcm9tRXJyb3IoKSB7XG4gICAgcmV0dXJuIHsgaGFzRXJyb3I6IHRydWUgfTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZENhdGNoKGVycm9yOiB1bmtub3duLCBpbmZvOiBSZWFjdC5FcnJvckluZm8pIHtcbiAgICBjb25zb2xlLmVycm9yKFwiW0FwcEVycm9yQm91bmRhcnldIHJlbmRlciBlcnJvclwiLCBlcnJvciwgaW5mbyk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgaWYgKHRoaXMuc3RhdGUuaGFzRXJyb3IpIHtcbiAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cInAtNCByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItcm9zZS0yMDAgYmctcm9zZS01MCB0ZXh0LXJvc2UtNzAwXCI+e3RoaXMucHJvcHMuZmFsbGJhY2tNZXNzYWdlfTwvZGl2PjtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucHJvcHMuY2hpbGRyZW47XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXBwRXJyb3JCb3VuZGFyeTtcbiIsICJ0eXBlIFZpc2l0T3B0aW9uID0ge1xuICB2YWx1ZT86IHN0cmluZyB8IG51bWJlcjtcbiAgdGV4dD86IHN0cmluZztcbiAgVmFsdWU/OiBzdHJpbmcgfCBudW1iZXI7XG4gIFRleHQ/OiBzdHJpbmc7XG59O1xuXG5leHBvcnQgY29uc3QgdXNlVmlzaXRhcyA9ICgpID0+IHtcbiAgY29uc3QgdmlzaXRUeXBlcyA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHdpbmRvdy5fX1ZJU0lUX1RZUEVTX18pIHx8IFtdO1xuICBjb25zdCBhc2lzdGVudGVUaXBvcyA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHdpbmRvdy5fX0FTSVNURU5URV9USVBPU19fKSB8fCBbXTtcblxuICByZXR1cm4ge1xuICAgIHZpc2l0VHlwZXM6IHZpc2l0VHlwZXMgYXMgVmlzaXRPcHRpb25bXSxcbiAgICBhc2lzdGVudGVUaXBvczogYXNpc3RlbnRlVGlwb3MgYXMgVmlzaXRPcHRpb25bXSxcbiAgfTtcbn07XG4iLCAiY29uc3QgUFJFVklFV19NQVhfSEVJR0hUX1JBVElPID0gMC44O1xuY29uc3QgUFJFVklFV19CQVNFX0ZPTlQgPSAxMztcbmNvbnN0IFBSRVZJRVdfTUlOX0ZPTlQgPSAxMTtcblxubGV0IHByZXZpZXdBbmNob3I6IEhUTUxFbGVtZW50IHwgbnVsbCA9IG51bGw7XG5sZXQgcHJldmlld0Nsb3NlQm91bmQgPSBmYWxzZTtcblxuZXhwb3J0IGNvbnN0IHNldFByZXZpZXdBbmNob3IgPSAoYW5jaG9yOiBIVE1MRWxlbWVudCB8IG51bGwpID0+IHtcbiAgcHJldmlld0FuY2hvciA9IGFuY2hvcjtcbn07XG5cbmNvbnN0IGVuc3VyZVByZXZpZXdUb29sdGlwID0gKCk6IEhUTUxFbGVtZW50ID0+IHtcbiAgbGV0IHRvb2x0aXBFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5kUHJldmlld1Rvb2x0aXBcIikgYXMgSFRNTEVsZW1lbnQgfCBudWxsO1xuICBpZiAodG9vbHRpcEVsKSByZXR1cm4gdG9vbHRpcEVsO1xuICB0b29sdGlwRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICB0b29sdGlwRWwuaWQgPSBcImluZFByZXZpZXdUb29sdGlwXCI7XG4gIHRvb2x0aXBFbC5jbGFzc05hbWUgPSBcImluZC1wcmV2aWV3LXRvb2x0aXBcIjtcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0b29sdGlwRWwpO1xuICByZXR1cm4gdG9vbHRpcEVsO1xufTtcblxuY29uc3QgZW5zdXJlUHJldmlld0F1dG9DbG9zZSA9ICgpID0+IHtcbiAgaWYgKHByZXZpZXdDbG9zZUJvdW5kKSByZXR1cm47XG4gIHByZXZpZXdDbG9zZUJvdW5kID0gdHJ1ZTtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICBcInBvaW50ZXJkb3duXCIsXG4gICAgKGV2ZW50KSA9PiB7XG4gICAgICBjb25zdCB0b29sdGlwRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImluZFByZXZpZXdUb29sdGlwXCIpO1xuICAgICAgaWYgKCF0b29sdGlwRWwgfHwgIXRvb2x0aXBFbC5jbGFzc0xpc3QuY29udGFpbnMoXCJ2aXNpYmxlXCIpKSByZXR1cm47XG4gICAgICBpZiAocHJldmlld0FuY2hvciAmJiBwcmV2aWV3QW5jaG9yLmNvbnRhaW5zKGV2ZW50LnRhcmdldCBhcyBOb2RlKSkgcmV0dXJuO1xuICAgICAgaGlkZVByZXZpZXdUb29sdGlwKCk7XG4gICAgfSxcbiAgICB0cnVlXG4gICk7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIChldmVudCkgPT4ge1xuICAgIGlmIChldmVudC5rZXkgPT09IFwiRXNjYXBlXCIpIGhpZGVQcmV2aWV3VG9vbHRpcCgpO1xuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBzaG93UHJldmlld1Rvb2x0aXAgPSAodGV4dDogc3RyaW5nLCBjbGllbnRZOiBudW1iZXIpOiBib29sZWFuID0+IHtcbiAgaWYgKCF0ZXh0KSByZXR1cm4gZmFsc2U7XG4gIGNvbnN0IHRvb2x0aXBFbCA9IGVuc3VyZVByZXZpZXdUb29sdGlwKCk7XG4gIHRvb2x0aXBFbC50ZXh0Q29udGVudCA9IHRleHQ7XG4gIHRvb2x0aXBFbC5jbGFzc0xpc3QuYWRkKFwidmlzaWJsZVwiKTtcbiAgcHJldmlld0FuY2hvciA9IG51bGw7XG4gIGVuc3VyZVByZXZpZXdBdXRvQ2xvc2UoKTtcblxuICBjb25zdCBjZW50ZXJYID0gTWF0aC5yb3VuZCh3aW5kb3cuaW5uZXJXaWR0aCAvIDIpO1xuICB0b29sdGlwRWwuc3R5bGUubGVmdCA9IGAke2NlbnRlclh9cHhgO1xuXG4gIGNvbnN0IG1hcmdpbiA9IDEyO1xuICB0b29sdGlwRWwuc3R5bGUubWF4SGVpZ2h0ID0gYCR7TWF0aC5yb3VuZCh3aW5kb3cuaW5uZXJIZWlnaHQgKiBQUkVWSUVXX01BWF9IRUlHSFRfUkFUSU8pfXB4YDtcbiAgdG9vbHRpcEVsLnN0eWxlLm92ZXJmbG93WSA9IFwiYXV0b1wiO1xuXG4gIGxldCBmb250U2l6ZSA9IFBSRVZJRVdfQkFTRV9GT05UO1xuICB0b29sdGlwRWwuc3R5bGUuZm9udFNpemUgPSBgJHtmb250U2l6ZX1weGA7XG4gIGxldCByZWN0ID0gdG9vbHRpcEVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICBjb25zdCBtYXhIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgKiBQUkVWSUVXX01BWF9IRUlHSFRfUkFUSU87XG4gIHdoaWxlIChyZWN0LmhlaWdodCA+IG1heEhlaWdodCAmJiBmb250U2l6ZSA+IFBSRVZJRVdfTUlOX0ZPTlQpIHtcbiAgICBmb250U2l6ZSAtPSAxO1xuICAgIHRvb2x0aXBFbC5zdHlsZS5mb250U2l6ZSA9IGAke2ZvbnRTaXplfXB4YDtcbiAgICByZWN0ID0gdG9vbHRpcEVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICB9XG5cbiAgY29uc3QgY2VudGVyWSA9IE1hdGgucm91bmQoKHdpbmRvdy5pbm5lckhlaWdodCAtIHJlY3QuaGVpZ2h0KSAvIDIpO1xuICBsZXQgdG9wID0gTnVtYmVyLmlzRmluaXRlKGNlbnRlclkpID8gY2VudGVyWSA6IG1hcmdpbjtcbiAgY29uc3QgbWluVG9wID0gbWFyZ2luO1xuICBjb25zdCBtYXhUb3AgPSBNYXRoLm1heChtYXJnaW4sIHdpbmRvdy5pbm5lckhlaWdodCAtIHJlY3QuaGVpZ2h0IC0gbWFyZ2luKTtcbiAgaWYgKHRvcCA8IG1pblRvcCkgdG9wID0gbWluVG9wO1xuICBpZiAodG9wID4gbWF4VG9wKSB0b3AgPSBtYXhUb3A7XG4gIHRvb2x0aXBFbC5zdHlsZS50b3AgPSBgJHtNYXRoLnJvdW5kKHRvcCl9cHhgO1xuICByZXR1cm4gdHJ1ZTtcbn07XG5cbmV4cG9ydCBjb25zdCBoaWRlUHJldmlld1Rvb2x0aXAgPSAoKSA9PiB7XG4gIGNvbnN0IHRvb2x0aXBFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5kUHJldmlld1Rvb2x0aXBcIik7XG4gIGlmICghdG9vbHRpcEVsKSByZXR1cm47XG4gIHRvb2x0aXBFbC5jbGFzc0xpc3QucmVtb3ZlKFwidmlzaWJsZVwiKTtcbiAgcHJldmlld0FuY2hvciA9IG51bGw7XG59O1xuXG5leHBvcnQgY29uc3QgaXNPdmVyZmxvd2luZyA9IChlbDogSFRNTEVsZW1lbnQgfCBudWxsKTogYm9vbGVhbiA9PiB7XG4gIGlmICghZWwpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIGVsLnNjcm9sbFdpZHRoID4gZWwuY2xpZW50V2lkdGggKyAxIHx8IGVsLnNjcm9sbEhlaWdodCA+IGVsLmNsaWVudEhlaWdodCArIDE7XG59O1xuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGhpZGVQcmV2aWV3VG9vbHRpcCB9IGZyb20gXCIuLi91dGlscy9wcmV2aWV3VG9vbHRpcC50c1wiO1xuXG50eXBlIFRhcEhhbmRsZXIgPSAoZXZlbnQ6IFJlYWN0LlBvaW50ZXJFdmVudCkgPT4gdm9pZDtcbnR5cGUgSG9sZEhhbmRsZXIgPSAodGFyZ2V0OiBIVE1MRWxlbWVudCwgY2xpZW50WTogbnVtYmVyKSA9PiBib29sZWFuIHwgdm9pZDtcblxudHlwZSBPcHRpb25zID0ge1xuICBtb3ZlUHg/OiBudW1iZXI7XG4gIGhvbGRNcz86IG51bWJlcjtcbn07XG5cbmNvbnN0IERFRkFVTFRfTU9WRV9QWCA9IDE0O1xuY29uc3QgREVGQVVMVF9IT0xEX01TID0gMTYwO1xuXG5leHBvcnQgY29uc3QgdXNlVGFwR3VhcmQgPSAob25UYXA6IFRhcEhhbmRsZXIsIG9uSG9sZFN0YXJ0PzogSG9sZEhhbmRsZXIsIG9wdGlvbnM/OiBPcHRpb25zKSA9PiB7XG4gIGNvbnN0IG1vdmVQeCA9IG9wdGlvbnM/Lm1vdmVQeCA/PyBERUZBVUxUX01PVkVfUFg7XG4gIGNvbnN0IGhvbGRNcyA9IG9wdGlvbnM/LmhvbGRNcyA/PyBERUZBVUxUX0hPTERfTVM7XG5cbiAgY29uc3Qgc3RhdGVSZWYgPSBSZWFjdC51c2VSZWYoe1xuICAgIGFjdGl2ZTogZmFsc2UsXG4gICAgcG9pbnRlcklkOiBudWxsIGFzIG51bWJlciB8IG51bGwsXG4gICAgc3RhcnRYOiAwLFxuICAgIHN0YXJ0WTogMCxcbiAgICBtb3ZlZDogZmFsc2UsXG4gICAgaGVsZDogZmFsc2UsXG4gICAgdGFyZ2V0OiBudWxsIGFzIEhUTUxFbGVtZW50IHwgbnVsbCxcbiAgfSk7XG4gIGNvbnN0IGhvbGRUaW1lclJlZiA9IFJlYWN0LnVzZVJlZjxudW1iZXIgfCBudWxsPihudWxsKTtcblxuICBjb25zdCByZXNldCA9IFJlYWN0LnVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoaG9sZFRpbWVyUmVmLmN1cnJlbnQpIHtcbiAgICAgIGNsZWFyVGltZW91dChob2xkVGltZXJSZWYuY3VycmVudCk7XG4gICAgICBob2xkVGltZXJSZWYuY3VycmVudCA9IG51bGw7XG4gICAgfVxuICAgIHN0YXRlUmVmLmN1cnJlbnQuYWN0aXZlID0gZmFsc2U7XG4gICAgc3RhdGVSZWYuY3VycmVudC5wb2ludGVySWQgPSBudWxsO1xuICAgIHN0YXRlUmVmLmN1cnJlbnQubW92ZWQgPSBmYWxzZTtcbiAgICBzdGF0ZVJlZi5jdXJyZW50LmhlbGQgPSBmYWxzZTtcbiAgICBzdGF0ZVJlZi5jdXJyZW50LnRhcmdldCA9IG51bGw7XG4gIH0sIFtdKTtcblxuICBjb25zdCBvblBvaW50ZXJEb3duID0gUmVhY3QudXNlQ2FsbGJhY2soXG4gICAgKGV2ZW50OiBSZWFjdC5Qb2ludGVyRXZlbnQpID0+IHtcbiAgICAgIGlmIChldmVudC5wb2ludGVyVHlwZSA9PT0gXCJtb3VzZVwiICYmIGV2ZW50LmJ1dHRvbiAhPT0gMCkgcmV0dXJuO1xuICAgICAgc3RhdGVSZWYuY3VycmVudC5hY3RpdmUgPSB0cnVlO1xuICAgICAgc3RhdGVSZWYuY3VycmVudC5wb2ludGVySWQgPSBldmVudC5wb2ludGVySWQ7XG4gICAgICBzdGF0ZVJlZi5jdXJyZW50LnN0YXJ0WCA9IGV2ZW50LmNsaWVudFg7XG4gICAgICBzdGF0ZVJlZi5jdXJyZW50LnN0YXJ0WSA9IGV2ZW50LmNsaWVudFk7XG4gICAgICBzdGF0ZVJlZi5jdXJyZW50Lm1vdmVkID0gZmFsc2U7XG4gICAgICBzdGF0ZVJlZi5jdXJyZW50LmhlbGQgPSBmYWxzZTtcbiAgICAgIHN0YXRlUmVmLmN1cnJlbnQudGFyZ2V0ID0gZXZlbnQuY3VycmVudFRhcmdldCBhcyBIVE1MRWxlbWVudDtcblxuICAgICAgaWYgKG9uSG9sZFN0YXJ0KSB7XG4gICAgICAgIGlmIChob2xkVGltZXJSZWYuY3VycmVudCkge1xuICAgICAgICAgIGNsZWFyVGltZW91dChob2xkVGltZXJSZWYuY3VycmVudCk7XG4gICAgICAgIH1cbiAgICAgICAgaG9sZFRpbWVyUmVmLmN1cnJlbnQgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgY29uc3Qgc3RhdGUgPSBzdGF0ZVJlZi5jdXJyZW50O1xuICAgICAgICAgIGlmICghc3RhdGUuYWN0aXZlIHx8IHN0YXRlLm1vdmVkIHx8ICFzdGF0ZS50YXJnZXQpIHJldHVybjtcbiAgICAgICAgICBjb25zdCBkaWRTaG93ID0gb25Ib2xkU3RhcnQoc3RhdGUudGFyZ2V0LCBzdGF0ZS5zdGFydFkpO1xuICAgICAgICAgIHN0YXRlLmhlbGQgPSBkaWRTaG93ID09PSB0cnVlO1xuICAgICAgICB9LCBob2xkTXMpO1xuICAgICAgfVxuICAgIH0sXG4gICAgW29uSG9sZFN0YXJ0LCBob2xkTXNdXG4gICk7XG5cbiAgY29uc3Qgb25Qb2ludGVyTW92ZSA9IFJlYWN0LnVzZUNhbGxiYWNrKFxuICAgIChldmVudDogUmVhY3QuUG9pbnRlckV2ZW50KSA9PiB7XG4gICAgICBjb25zdCBzdGF0ZSA9IHN0YXRlUmVmLmN1cnJlbnQ7XG4gICAgICBpZiAoIXN0YXRlLmFjdGl2ZSB8fCBzdGF0ZS5wb2ludGVySWQgIT09IGV2ZW50LnBvaW50ZXJJZCkgcmV0dXJuO1xuICAgICAgY29uc3QgZHggPSBNYXRoLmFicyhldmVudC5jbGllbnRYIC0gc3RhdGUuc3RhcnRYKTtcbiAgICAgIGNvbnN0IGR5ID0gTWF0aC5hYnMoZXZlbnQuY2xpZW50WSAtIHN0YXRlLnN0YXJ0WSk7XG4gICAgICBpZiAoZHggPiBtb3ZlUHggfHwgZHkgPiBtb3ZlUHgpIHtcbiAgICAgICAgc3RhdGUubW92ZWQgPSB0cnVlO1xuICAgICAgICBpZiAoaG9sZFRpbWVyUmVmLmN1cnJlbnQpIHtcbiAgICAgICAgICBjbGVhclRpbWVvdXQoaG9sZFRpbWVyUmVmLmN1cnJlbnQpO1xuICAgICAgICAgIGhvbGRUaW1lclJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3RhdGUuaGVsZCkgaGlkZVByZXZpZXdUb29sdGlwKCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBbbW92ZVB4XVxuICApO1xuXG4gIGNvbnN0IG9uUG9pbnRlclVwID0gUmVhY3QudXNlQ2FsbGJhY2soXG4gICAgKGV2ZW50OiBSZWFjdC5Qb2ludGVyRXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IHN0YXRlID0gc3RhdGVSZWYuY3VycmVudDtcbiAgICAgIGlmICghc3RhdGUuYWN0aXZlIHx8IHN0YXRlLnBvaW50ZXJJZCAhPT0gZXZlbnQucG9pbnRlcklkKSByZXR1cm47XG4gICAgICBjb25zdCBzaG91bGRUYXAgPSAhc3RhdGUubW92ZWQgJiYgIXN0YXRlLmhlbGQ7XG4gICAgICByZXNldCgpO1xuICAgICAgaWYgKHNob3VsZFRhcCkgb25UYXAoZXZlbnQpO1xuICAgIH0sXG4gICAgW29uVGFwLCByZXNldF1cbiAgKTtcblxuICByZXR1cm4ge1xuICAgIG9uUG9pbnRlckRvd24sXG4gICAgb25Qb2ludGVyTW92ZSxcbiAgICBvblBvaW50ZXJVcCxcbiAgICBvblBvaW50ZXJDYW5jZWw6IHJlc2V0LFxuICB9O1xufTtcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi91dGlscy9pbmRJMThuLnRzXCI7XG5cbnR5cGUgQ29uZmlybU1vZGFsU3RhdGUgPSB7XG4gIG9wZW46IGJvb2xlYW47XG4gIHRpdGxlOiBzdHJpbmc7XG4gIG1lc3NhZ2U6IHN0cmluZztcbiAgY29uZmlybVRleHQ6IHN0cmluZztcbiAgY2FuY2VsVGV4dDogc3RyaW5nO1xuICBzaG93Q2FuY2VsOiBib29sZWFuO1xuICBzaG93Q29uZmlybTogYm9vbGVhbjtcbiAgb25Db25maXJtOiAoKCkgPT4gUHJvbWlzZTxib29sZWFuIHwgdm9pZD4gfCBib29sZWFuIHwgdm9pZCkgfCBudWxsO1xufTtcblxudHlwZSBDb25maXJtT3Blbk9wdGlvbnMgPSBQYXJ0aWFsPE9taXQ8Q29uZmlybU1vZGFsU3RhdGUsIFwib3BlblwiIHwgXCJvbkNvbmZpcm1cIj4+ICYge1xuICBvbkNvbmZpcm0/OiAoKCkgPT4gUHJvbWlzZTxib29sZWFuIHwgdm9pZD4gfCBib29sZWFuIHwgdm9pZCkgfCBudWxsO1xufTtcblxudHlwZSBVc2VDb25maXJtRGlhbG9nQXJncyA9IHtcbiAgZGVmYXVsdENvbmZpcm1UZXh0OiBzdHJpbmc7XG4gIGRlZmF1bHRDYW5jZWxUZXh0OiBzdHJpbmc7XG59O1xuXG50eXBlIEhhbmRsZUNvbmZpcm1BcmdzID0ge1xuICBidXN5OiBib29sZWFuO1xuICBvbkVycm9yOiAobWVzc2FnZTogc3RyaW5nKSA9PiB2b2lkO1xuICBkZWZhdWx0RXJyb3JNZXNzYWdlPzogc3RyaW5nO1xufTtcblxuLy8gU2hhcmVkIGNvbmZpcm0gZGlhbG9nIHN0YXRlIGFuZCBjb25maXJtIGhhbmRsZXIuXG5leHBvcnQgY29uc3QgdXNlQ29uZmlybURpYWxvZyA9ICh7IGRlZmF1bHRDb25maXJtVGV4dCwgZGVmYXVsdENhbmNlbFRleHQgfTogVXNlQ29uZmlybURpYWxvZ0FyZ3MpID0+IHtcbiAgY29uc3QgW21vZGFsLCBzZXRNb2RhbF0gPSB1c2VTdGF0ZTxDb25maXJtTW9kYWxTdGF0ZT4oe1xuICAgIG9wZW46IGZhbHNlLFxuICAgIHRpdGxlOiBcIlwiLFxuICAgIG1lc3NhZ2U6IFwiXCIsXG4gICAgY29uZmlybVRleHQ6IGRlZmF1bHRDb25maXJtVGV4dCxcbiAgICBjYW5jZWxUZXh0OiBkZWZhdWx0Q2FuY2VsVGV4dCxcbiAgICBzaG93Q2FuY2VsOiB0cnVlLFxuICAgIHNob3dDb25maXJtOiB0cnVlLFxuICAgIG9uQ29uZmlybTogbnVsbCxcbiAgfSk7XG5cbiAgY29uc3QgY29uZmlybUluRmxpZ2h0UmVmID0gdXNlUmVmKGZhbHNlKTtcblxuICBjb25zdCBvcGVuQ29uZmlybSA9IHVzZUNhbGxiYWNrKFxuICAgIChvcHRzOiBDb25maXJtT3Blbk9wdGlvbnMpID0+IHtcbiAgICAgIHNldE1vZGFsKHtcbiAgICAgICAgb3BlbjogdHJ1ZSxcbiAgICAgICAgdGl0bGU6IG9wdHM/LnRpdGxlIHx8IFwiXCIsXG4gICAgICAgIG1lc3NhZ2U6IG9wdHM/Lm1lc3NhZ2UgfHwgXCJcIixcbiAgICAgICAgY29uZmlybVRleHQ6IG9wdHM/LmNvbmZpcm1UZXh0IHx8IGRlZmF1bHRDb25maXJtVGV4dCxcbiAgICAgICAgY2FuY2VsVGV4dDogb3B0cz8uY2FuY2VsVGV4dCB8fCBkZWZhdWx0Q2FuY2VsVGV4dCxcbiAgICAgICAgc2hvd0NhbmNlbDogb3B0cz8uc2hvd0NhbmNlbCAhPT0gZmFsc2UsXG4gICAgICAgIHNob3dDb25maXJtOiBvcHRzPy5zaG93Q29uZmlybSAhPT0gZmFsc2UsXG4gICAgICAgIG9uQ29uZmlybTogb3B0cz8ub25Db25maXJtIHx8IG51bGwsXG4gICAgICB9KTtcbiAgICB9LFxuICAgIFtkZWZhdWx0Q2FuY2VsVGV4dCwgZGVmYXVsdENvbmZpcm1UZXh0XVxuICApO1xuXG4gIGNvbnN0IGNsb3NlQ29uZmlybSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBzZXRNb2RhbCgocHJldikgPT4gKHsgLi4ucHJldiwgb3BlbjogZmFsc2UgfSkpO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgaGFuZGxlQ29uZmlybSA9IHVzZUNhbGxiYWNrKFxuICAgIGFzeW5jICh7IGJ1c3ksIG9uRXJyb3IsIGRlZmF1bHRFcnJvck1lc3NhZ2UgfTogSGFuZGxlQ29uZmlybUFyZ3MpID0+IHtcbiAgICAgIGlmIChidXN5KSByZXR1cm47XG4gICAgICBjb25zdCBjYiA9IG1vZGFsLm9uQ29uZmlybTtcbiAgICAgIGlmICh0eXBlb2YgY2IgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBjbG9zZUNvbmZpcm0oKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKGNvbmZpcm1JbkZsaWdodFJlZi5jdXJyZW50KSByZXR1cm47XG4gICAgICBjb25maXJtSW5GbGlnaHRSZWYuY3VycmVudCA9IHRydWU7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBjYigpO1xuICAgICAgICBpZiAocmVzdWx0ICE9PSBmYWxzZSkge1xuICAgICAgICAgIGNsb3NlQ29uZmlybSgpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnI6IGFueSkge1xuICAgICAgICBjb25zdCBtc2cgPVxuICAgICAgICAgIGVycj8ubWVzc2FnZSB8fFxuICAgICAgICAgIGRlZmF1bHRFcnJvck1lc3NhZ2UgfHxcbiAgICAgICAgICBpbmRUKFwiQXBpX1JlcXVlc3RGYWlsZWRcIiwgXCJSZXF1ZXN0IGZhaWxlZC4gUGxlYXNlIHRyeSBhZ2Fpbi5cIik7XG4gICAgICAgIG9uRXJyb3IobXNnKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGNvbmZpcm1JbkZsaWdodFJlZi5jdXJyZW50ID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSxcbiAgICBbY2xvc2VDb25maXJtLCBtb2RhbC5vbkNvbmZpcm1dXG4gICk7XG5cbiAgcmV0dXJuIHtcbiAgICBtb2RhbCxcbiAgICBvcGVuQ29uZmlybSxcbiAgICBjbG9zZUNvbmZpcm0sXG4gICAgaGFuZGxlQ29uZmlybSxcbiAgfTtcbn07XHJcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyByZWFkQW5kQ2xlYXJUZXh0RWRpdG9yVmFsdWUgfSBmcm9tIFwiLi4vdXRpbHMvdGV4dEVkaXRvci50c1wiO1xuXG50eXBlIEZpZWxkQmluZGluZyA9IHtcbiAgZmllbGRJZDogc3RyaW5nO1xuICBhcHBseVZhbHVlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbn07XG5cbnR5cGUgT3B0aW9ucyA9IHtcbiAgYXBwbHlPbk1vdW50PzogYm9vbGVhbjtcbiAgbGlzdGVuUGFnZVNob3c/OiBib29sZWFuO1xufTtcblxuLy8gU3luY2hyb25pemVzIGZpZWxkIHZhbHVlcyB0aGF0IHJldHVybiBmcm9tIHRoZSBmdWxsLXNjcmVlbiB0ZXh0IGVkaXRvci5cbmV4cG9ydCBjb25zdCB1c2VUZXh0RWRpdG9yRmllbGRzID0gKGZpZWxkczogRmllbGRCaW5kaW5nW10sIG9wdGlvbnM/OiBPcHRpb25zKSA9PiB7XG4gIGNvbnN0IGFwcGx5T25Nb3VudCA9IG9wdGlvbnM/LmFwcGx5T25Nb3VudCAhPT0gZmFsc2U7XG4gIGNvbnN0IGxpc3RlblBhZ2VTaG93ID0gb3B0aW9ucz8ubGlzdGVuUGFnZVNob3cgIT09IGZhbHNlO1xuXG4gIGNvbnN0IGFwcGx5VmFsdWVzID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGZpZWxkcy5mb3JFYWNoKChmaWVsZCkgPT4ge1xuICAgICAgY29uc3QgdmFsdWUgPSByZWFkQW5kQ2xlYXJUZXh0RWRpdG9yVmFsdWUoZmllbGQuZmllbGRJZCk7XG4gICAgICBpZiAodmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgZmllbGQuYXBwbHlWYWx1ZSh2YWx1ZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0sIFtmaWVsZHNdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChhcHBseU9uTW91bnQpIHtcbiAgICAgIGFwcGx5VmFsdWVzKCk7XG4gICAgfVxuXG4gICAgaWYgKCFsaXN0ZW5QYWdlU2hvdykgcmV0dXJuIHVuZGVmaW5lZDtcblxuICAgIGNvbnN0IG9uUGFnZVNob3cgPSAoKSA9PiBhcHBseVZhbHVlcygpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicGFnZXNob3dcIiwgb25QYWdlU2hvdyk7XG4gICAgcmV0dXJuICgpID0+IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicGFnZXNob3dcIiwgb25QYWdlU2hvdyk7XG4gIH0sIFthcHBseU9uTW91bnQsIGFwcGx5VmFsdWVzLCBsaXN0ZW5QYWdlU2hvd10pO1xuXG4gIHJldHVybiB7XG4gICAgYXBwbHlWYWx1ZXMsXG4gIH07XG59O1xuIiwgImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBDaGV2cm9uRG93blN2ZywgQ2hldnJvblVwU3ZnIH0gZnJvbSBcIi4vY2hldnJvbnMudHN4XCI7XG5cclxuLy8gU2luZ2xlIGRhdGUgcGlja2VyIG1hdGNoaW5nIHRoZSBIaXN0b3JpYWwgRFJQIHZpc3VhbCBzdHlsZS5cclxuLy8gUmV0dXJucyBhbiBJU08gc3RyaW5nICh5eXl5LU1NLWRkKSB2aWEgb25DaGFuZ2UuXHJcblxyXG5jb25zdCBJTkRfSTE4TiA9IGdsb2JhbFRoaXMuX19JTkRfSTE4Tl9fIHx8IHt9O1xyXG5jb25zdCBpbmRUID0gKGtleSwgZmFsbGJhY2spID0+IChJTkRfSTE4TiAmJiB0eXBlb2YgSU5EX0kxOE5ba2V5XSA9PT0gXCJzdHJpbmdcIiAmJiBJTkRfSTE4TltrZXldKSB8fCBmYWxsYmFjayB8fCBrZXk7XHJcblxyXG5jb25zdCBwYWQgPSAobikgPT4gU3RyaW5nKG4pLnBhZFN0YXJ0KDIsIFwiMFwiKTtcclxuY29uc3QgdG9JU08gPSAoZCkgPT4gYCR7ZC5nZXRGdWxsWWVhcigpfS0ke3BhZChkLmdldE1vbnRoKCkgKyAxKX0tJHtwYWQoZC5nZXREYXRlKCkpfWA7XHJcblxyXG5jb25zdCBwYXJzZUlTTyA9IChzKSA9PiB7XHJcbiAgaWYgKCFzKSByZXR1cm4gbnVsbDtcclxuICBjb25zdCByYXcgPSBTdHJpbmcocykudHJpbSgpO1xyXG4gIGlmICghcmF3KSByZXR1cm4gbnVsbDtcclxuICBjb25zdCBwYXJ0cyA9IHJhdy5zcGxpdChcIi1cIik7XHJcbiAgaWYgKHBhcnRzLmxlbmd0aCA9PT0gMykge1xyXG4gICAgY29uc3QgW3ksIG0sIGRdID0gcGFydHMubWFwKE51bWJlcik7XHJcbiAgICBpZiAoIU51bWJlci5pc05hTih5KSAmJiAhTnVtYmVyLmlzTmFOKG0pICYmICFOdW1iZXIuaXNOYU4oZCkpIHtcclxuICAgICAgcmV0dXJuIG5ldyBEYXRlKHksIG0gLSAxLCBkKTtcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIG51bGw7XHJcbn07XHJcblxyXG5jb25zdCBub3JtYWxpemVVaUxvY2FsZSA9IChsb2NhbGUpID0+IHtcclxuICBjb25zdCB2YWx1ZSA9IFN0cmluZyhsb2NhbGUgfHwgXCJcIikudHJpbSgpO1xyXG4gIGlmICghdmFsdWUpIHJldHVybiBcImVzLUVTXCI7XHJcbiAgaWYgKC9eemgtaGFucy9pLnRlc3QodmFsdWUpKSByZXR1cm4gXCJ6aC1DTlwiO1xyXG4gIHJldHVybiB2YWx1ZTtcclxufTtcclxuXHJcbmNvbnN0IGdldFVpTG9jYWxlID0gKCkgPT4ge1xyXG4gIGNvbnN0IGZyb21IdG1sID0gZG9jdW1lbnQ/LmRvY3VtZW50RWxlbWVudD8ubGFuZztcclxuICBpZiAoZnJvbUh0bWwgJiYgU3RyaW5nKGZyb21IdG1sKS50cmltKCkpIHJldHVybiBub3JtYWxpemVVaUxvY2FsZShmcm9tSHRtbCk7XHJcbiAgcmV0dXJuIFwiZXMtRVNcIjtcclxufTtcclxuXHJcbmNvbnN0IGlzQmFzcXVlTG9jYWxlID0gKGxvY2FsZSkgPT4gL15ldVxcYi9pLnRlc3QoU3RyaW5nKGxvY2FsZSB8fCBcIlwiKSk7XHJcbmNvbnN0IEJBU1FVRV9NT05USFMgPSBbXHJcbiAgXCJ1cnRhcnJpbGFcIixcclxuICBcIm90c2FpbGFcIixcclxuICBcIm1hcnR4b2FcIixcclxuICBcImFwaXJpbGFcIixcclxuICBcIm1haWF0emFcIixcclxuICBcImVrYWluYVwiLFxyXG4gIFwidXp0YWlsYVwiLFxyXG4gIFwiYWJ1enR1YVwiLFxyXG4gIFwiaXJhaWxhXCIsXHJcbiAgXCJ1cnJpYVwiLFxyXG4gIFwiYXphcm9hXCIsXHJcbiAgXCJhYmVuZHVhXCJcclxuXTtcclxuY29uc3QgQkFTUVVFX01PTlRIU19TSE9SVCA9IFtcclxuICBcInVydFwiLFxyXG4gIFwib3RzXCIsXHJcbiAgXCJtYXJcIixcclxuICBcImFwaVwiLFxyXG4gIFwibWFpXCIsXHJcbiAgXCJla2FcIixcclxuICBcInV6dFwiLFxyXG4gIFwiYWJ1XCIsXHJcbiAgXCJpcmFcIixcclxuICBcInVyclwiLFxyXG4gIFwiYXphXCIsXHJcbiAgXCJhYmVcIlxyXG5dO1xyXG5cclxuY29uc3QgZm9ybWF0RGlzcGxheSA9IChkKSA9PiB7XHJcbiAgaWYgKCFkKSByZXR1cm4gaW5kVChcIkhpc3RvcnlfQWRkRGF0ZVwiLCBcIkFkZCBkYXRlXCIpO1xyXG4gIGNvbnN0IGxvY2FsZSA9IGdldFVpTG9jYWxlKCk7XHJcbiAgaWYgKGlzQmFzcXVlTG9jYWxlKGxvY2FsZSkpIHtcclxuICAgIGNvbnN0IG1vbnRoID0gQkFTUVVFX01PTlRIU19TSE9SVFtkLmdldE1vbnRoKCldO1xyXG4gICAgcmV0dXJuIGAke2QuZ2V0RGF0ZSgpfSAke21vbnRofSAke2QuZ2V0RnVsbFllYXIoKX1gLnRvTG93ZXJDYXNlKCk7XHJcbiAgfVxyXG4gIHJldHVybiBkXHJcbiAgICAudG9Mb2NhbGVEYXRlU3RyaW5nKGxvY2FsZSwgeyBkYXk6IFwibnVtZXJpY1wiLCBtb250aDogXCJzaG9ydFwiLCB5ZWFyOiBcIm51bWVyaWNcIiB9KVxyXG4gICAgLnJlcGxhY2UoL1xcLi9nLCBcIlwiKVxyXG4gICAgLnRvTG93ZXJDYXNlKCk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBTaW5nbGVEYXRlUGlja2VyKHsgbGFiZWwsIHZhbHVlLCBvbkNoYW5nZSwgZGlzYWJsZWQgPSBmYWxzZSwgcmVhZE9ubHkgPSBmYWxzZSB9KSB7XG4gIGNvbnN0IGVmZmVjdGl2ZUxhYmVsID0gKGxhYmVsICYmIFN0cmluZyhsYWJlbCkudHJpbSgpKSA/IGxhYmVsIDogaW5kVChcIlZpc2l0c19EZXRhaWxfRGF0ZV9MYWJlbFwiLCBcIkRhdGVcIik7XG4gIGNvbnN0IHNlbGVjdGVkRGF0ZSA9IHVzZU1lbW8oKCkgPT4gcGFyc2VJU08odmFsdWUpLCBbdmFsdWVdKTtcbiAgY29uc3QgW29wZW4sIHNldE9wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbY3VycmVudE1vbnRoLCBzZXRDdXJyZW50TW9udGhdID0gdXNlU3RhdGUoXHJcbiAgICBzZWxlY3RlZERhdGUgPyBzZWxlY3RlZERhdGUuZ2V0TW9udGgoKSA6IG5ldyBEYXRlKCkuZ2V0TW9udGgoKVxyXG4gICk7XHJcbiAgY29uc3QgW2N1cnJlbnRZZWFyLCBzZXRDdXJyZW50WWVhcl0gPSB1c2VTdGF0ZShcclxuICAgIHNlbGVjdGVkRGF0ZSA/IHNlbGVjdGVkRGF0ZS5nZXRGdWxsWWVhcigpIDogbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgY29udGFpbmVyUmVmID0gdXNlUmVmKG51bGwpO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKHNlbGVjdGVkRGF0ZSkge1xyXG4gICAgICBzZXRDdXJyZW50TW9udGgoc2VsZWN0ZWREYXRlLmdldE1vbnRoKCkpO1xyXG4gICAgICBzZXRDdXJyZW50WWVhcihzZWxlY3RlZERhdGUuZ2V0RnVsbFllYXIoKSk7XHJcbiAgICB9XHJcbiAgfSwgW3NlbGVjdGVkRGF0ZT8uZ2V0VGltZSgpXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBvbkRvY0NsaWNrID0gKGV2KSA9PiB7XG4gICAgICBpZiAoIWNvbnRhaW5lclJlZi5jdXJyZW50KSByZXR1cm47XG4gICAgICBpZiAoIWNvbnRhaW5lclJlZi5jdXJyZW50LmNvbnRhaW5zKGV2LnRhcmdldCkpIHtcbiAgICAgICAgc2V0T3BlbihmYWxzZSk7XG4gICAgICB9XG4gICAgfTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIG9uRG9jQ2xpY2spO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIG9uRG9jQ2xpY2ssIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBvbkRvY0NsaWNrKTtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIG9uRG9jQ2xpY2spO1xuICAgIH07XG4gIH0sIFtdKTtcblxyXG4gIGNvbnN0IHJlYWRPbmx5TW9kZSA9IHJlYWRPbmx5IHx8IGRpc2FibGVkO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKHJlYWRPbmx5TW9kZSkgc2V0T3BlbihmYWxzZSk7XG4gIH0sIFtyZWFkT25seU1vZGVdKTtcblxuICBjb25zdCBmaXJzdERheSA9IG5ldyBEYXRlKGN1cnJlbnRZZWFyLCBjdXJyZW50TW9udGgsIDEpO1xuICBjb25zdCBkYXlzSW5Nb250aCA9IG5ldyBEYXRlKGN1cnJlbnRZZWFyLCBjdXJyZW50TW9udGggKyAxLCAwKS5nZXREYXRlKCk7XHJcbiAgY29uc3Qgb2Zmc2V0ID0gKGZpcnN0RGF5LmdldERheSgpICsgNikgJSA3OyAvLyBNb25kYXkgYXMgMFxyXG5cclxuICBjb25zdCBtb250aExhYmVsID0gKCgpID0+IHtcclxuICAgIGNvbnN0IGxvY2FsZSA9IGdldFVpTG9jYWxlKCk7XHJcbiAgICBpZiAoL156aC9pLnRlc3QobG9jYWxlKSkge1xyXG4gICAgICByZXR1cm4gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQobG9jYWxlLCB7IHllYXI6IFwibnVtZXJpY1wiLCBtb250aDogXCJsb25nXCIgfSkuZm9ybWF0KGZpcnN0RGF5KTtcclxuICAgIH1cclxuICAgIGlmIChpc0Jhc3F1ZUxvY2FsZShsb2NhbGUpKSB7XHJcbiAgICAgIHJldHVybiBgJHtCQVNRVUVfTU9OVEhTW2N1cnJlbnRNb250aF19ICR7Y3VycmVudFllYXJ9YDtcclxuICAgIH1cclxuICAgIGNvbnN0IHJhdyA9IGZpcnN0RGF5LnRvTG9jYWxlRGF0ZVN0cmluZyhsb2NhbGUsIHsgbW9udGg6IFwibG9uZ1wiIH0pO1xyXG4gICAgY29uc3QgZmlyc3QgPSByYXcuc2xpY2UoMCwgMSk7XHJcbiAgICBjb25zdCByZXN0ID0gcmF3LnNsaWNlKDEpO1xyXG4gICAgcmV0dXJuIGAke2ZpcnN0LnRvVXBwZXJDYXNlKCl9JHtyZXN0fSAke2N1cnJlbnRZZWFyfWA7XHJcbiAgfSkoKTtcclxuXHJcbiAgY29uc3Qgc2FtZURheSA9IChhLCBiKSA9PlxyXG4gICAgYSAmJiBiICYmIGEuZ2V0RnVsbFllYXIoKSA9PT0gYi5nZXRGdWxsWWVhcigpICYmIGEuZ2V0TW9udGgoKSA9PT0gYi5nZXRNb250aCgpICYmIGEuZ2V0RGF0ZSgpID09PSBiLmdldERhdGUoKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlU2VsZWN0ID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoZGF0ZU9iaikgPT4ge1xyXG4gICAgICBpZiAoZGlzYWJsZWQpIHJldHVybjtcclxuICAgICAgY29uc3QgaXNvID0gdG9JU08oZGF0ZU9iaik7XHJcbiAgICAgIG9uQ2hhbmdlPy4oaXNvKTtcclxuICAgICAgc2V0T3BlbihmYWxzZSk7XHJcbiAgICB9LFxyXG4gICAgW2Rpc2FibGVkLCBvbkNoYW5nZV1cclxuICApO1xyXG5cclxuICBjb25zdCBnb01vbnRoID0gKGluYykgPT4ge1xyXG4gICAgaWYgKGRpc2FibGVkKSByZXR1cm47XHJcbiAgICBsZXQgbSA9IGN1cnJlbnRNb250aCArIGluYztcclxuICAgIGxldCB5ID0gY3VycmVudFllYXI7XHJcbiAgICBpZiAobSA+IDExKSB7XHJcbiAgICAgIG0gPSAwO1xyXG4gICAgICB5ICs9IDE7XHJcbiAgICB9IGVsc2UgaWYgKG0gPCAwKSB7XHJcbiAgICAgIG0gPSAxMTtcclxuICAgICAgeSAtPSAxO1xyXG4gICAgfVxyXG4gICAgc2V0Q3VycmVudE1vbnRoKG0pO1xyXG4gICAgc2V0Q3VycmVudFllYXIoeSk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgdmFsdWVDb2xvciA9IHJlYWRPbmx5TW9kZSA/IFwiIzY0NzQ4YlwiIDogXCIjMDAyOTZiZTBcIjtcbiAgY29uc3QgbGFiZWxDb2xvciA9IFwiIzAwMjk2YmUwXCI7XG4gIGNvbnN0IGNvbnRhaW5lckNsYXNzID0gYHNwYWNlLXktMiAke2Rpc2FibGVkID8gXCJwb2ludGVyLWV2ZW50cy1ub25lIHNlbGVjdC1ub25lXCIgOiBcIlwifWAudHJpbSgpO1xuICBjb25zdCBidXR0b25DbGFzcyA9IFtcbiAgICBcImZvcm0tY29udHJvbFwiLFxuICAgIFwiZmxleCBpdGVtcy1jZW50ZXJcIixcbiAgICBcInByLTEwXCIsXG4gICAgcmVhZE9ubHlNb2RlID8gXCJpbmQtcmVhZG9ubHktZmllbGRcIiA6IFwiXCIsXG4gICAgcmVhZE9ubHlNb2RlID8gXCJjdXJzb3Itbm90LWFsbG93ZWRcIiA6IFwiY3Vyc29yLXBvaW50ZXJcIlxuICBdLmZpbHRlcihCb29sZWFuKS5qb2luKFwiIFwiKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtjb250YWluZXJDbGFzc30gcmVmPXtjb250YWluZXJSZWZ9PlxuICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZFwiIHN0eWxlPXt7IGNvbG9yOiBsYWJlbENvbG9yIH19PntTdHJpbmcoZWZmZWN0aXZlTGFiZWwpfTwvbGFiZWw+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlXCI+XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICBjbGFzc05hbWU9e2J1dHRvbkNsYXNzfVxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgIGlmIChyZWFkT25seU1vZGUpIHJldHVybjtcbiAgICAgICAgICAgIHNldE9wZW4oKHYpID0+ICF2KTtcbiAgICAgICAgICB9fVxuICAgICAgICAgIG9uS2V5RG93bj17KGUpID0+IHtcbiAgICAgICAgICAgIGlmIChyZWFkT25seU1vZGUpIHJldHVybjtcbiAgICAgICAgICAgIGlmIChlLmtleSA9PT0gXCJFbnRlclwiIHx8IGUua2V5ID09PSBcIiBcIikge1xuICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgIHNldE9wZW4oKHYpID0+ICF2KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChlLmtleSA9PT0gXCJFc2NhcGVcIikgc2V0T3BlbihmYWxzZSk7XG4gICAgICAgICAgfX1cbiAgICAgICAgICBhcmlhLWV4cGFuZGVkPXtvcGVufVxuICAgICAgICAgIGFyaWEtZGlzYWJsZWQ9e3JlYWRPbmx5TW9kZSA/IFwidHJ1ZVwiIDogdW5kZWZpbmVkfVxuICAgICAgICA+XG4gICAgICAgICAgPHNwYW4gc3R5bGU9e3sgY29sb3I6IHZhbHVlQ29sb3IsIGZvbnRXZWlnaHQ6IDQwMCB9fT57Zm9ybWF0RGlzcGxheShzZWxlY3RlZERhdGUpfTwvc3Bhbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LXktMCByaWdodC0wIGZsZXggaXRlbXMtY2VudGVyIHByLTIgdGV4dC1zbGF0ZS01MDAgcG9pbnRlci1ldmVudHMtbm9uZVwiPlxuICAgICAgICAgIHtvcGVuID8gPENoZXZyb25VcFN2ZyBjbGFzc05hbWU9XCJoLTUgdy01XCIgLz4gOiA8Q2hldnJvbkRvd25TdmcgY2xhc3NOYW1lPVwiaC01IHctNVwiIC8+fVxuICAgICAgICA8L3NwYW4+XG4gICAgICAgIHtvcGVuICYmIChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRycC1wb3BvdmVyXCIgcm9sZT1cImRpYWxvZ1wiIGFyaWEtbW9kYWw9XCJ0cnVlXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRycC1oZWFkXCI+XG4gICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImRycC1uYXZcIiBhcmlhLWxhYmVsPXtpbmRUKFwiSGlzdG9yeV9QcmV2TW9udGhcIiwgXCJQcmV2aW91cyBtb250aFwiKX0gb25DbGljaz17KCkgPT4gZ29Nb250aCgtMSl9PlxuICAgICAgICAgICAgICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGNsYXNzTmFtZT1cImgtNCB3LTRcIiBmaWxsPVwibm9uZVwiIHZpZXdCb3g9XCIwIDAgMzAgMzBcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIj5cbiAgICAgICAgICAgICAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBzdHJva2VXaWR0aD1cIjJcIiBkPVwiTTE1IDE5bC03LTcgNy03XCIgLz5cbiAgICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZHJwLW1vbnRoXCI+e21vbnRoTGFiZWx9PC9kaXY+XG4gICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImRycC1uYXZcIiBhcmlhLWxhYmVsPXtpbmRUKFwiSGlzdG9yeV9OZXh0TW9udGhcIiwgXCJOZXh0IG1vbnRoXCIpfSBvbkNsaWNrPXsoKSA9PiBnb01vbnRoKDEpfT5cbiAgICAgICAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBjbGFzc05hbWU9XCJoLTQgdy00XCIgZmlsbD1cIm5vbmVcIiB2aWV3Qm94PVwiMCAwIDMwIDMwXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCI+XG4gICAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgc3Ryb2tlV2lkdGg9XCIyXCIgZD1cIk05IDVsNyA3LTcgN1wiIC8+XG4gICAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRycC13ZWVrZGF5c1wiPlxuICAgICAgICAgICAgICA8c3Bhbj57aW5kVChcIkhpc3RvcnlfRGF5X01vblwiLCBcIk1vXCIpfTwvc3Bhbj48c3Bhbj57aW5kVChcIkhpc3RvcnlfRGF5X1R1ZVwiLCBcIlR1XCIpfTwvc3Bhbj48c3Bhbj57aW5kVChcIkhpc3RvcnlfRGF5X1dlZFwiLCBcIldlXCIpfTwvc3Bhbj48c3Bhbj57aW5kVChcIkhpc3RvcnlfRGF5X1RodVwiLCBcIlRoXCIpfTwvc3Bhbj48c3Bhbj57aW5kVChcIkhpc3RvcnlfRGF5X0ZyaVwiLCBcIkZyXCIpfTwvc3Bhbj48c3Bhbj57aW5kVChcIkhpc3RvcnlfRGF5X1NhdFwiLCBcIlNhXCIpfTwvc3Bhbj48c3Bhbj57aW5kVChcIkhpc3RvcnlfRGF5X1N1blwiLCBcIlN1XCIpfTwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkcnAtZ3JpZFwiPlxuICAgICAgICAgICAgICB7QXJyYXkuZnJvbSh7IGxlbmd0aDogb2Zmc2V0IH0pLm1hcCgoXywgaSkgPT4gKFxuICAgICAgICAgICAgICAgIDxidXR0b24ga2V5PXtgZS0ke2l9YH0gY2xhc3NOYW1lPVwiZHJwLWRheSBlbXB0eVwiIGRpc2FibGVkIHR5cGU9XCJidXR0b25cIiAvPlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAge0FycmF5LmZyb20oeyBsZW5ndGg6IGRheXNJbk1vbnRoIH0pLm1hcCgoXywgaWR4KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF5ID0gaWR4ICsgMTtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRlT2JqID0gbmV3IERhdGUoY3VycmVudFllYXIsIGN1cnJlbnRNb250aCwgZGF5KTtcbiAgICAgICAgICAgICAgICBjb25zdCBpc1NlbGVjdGVkID0gc2FtZURheShkYXRlT2JqLCBzZWxlY3RlZERhdGUpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGlzVG9kYXkgPSBzYW1lRGF5KGRhdGVPYmosIG5ldyBEYXRlKCkpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNscyA9IFtcbiAgICAgICAgICAgICAgICAgIFwiZHJwLWRheVwiLFxuICAgICAgICAgICAgICAgICAgaXNTZWxlY3RlZCA/IFwic3RhcnQgcmFuZ2Utc3RhcnRcIiA6IFwiXCIsXG4gICAgICAgICAgICAgICAgICBpc1RvZGF5ID8gXCJ0b2RheVwiIDogXCJcIlxuICAgICAgICAgICAgICAgIF0uam9pbihcIiBcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAga2V5PXt0b0lTTyhkYXRlT2JqKX1cbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xzfVxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVTZWxlY3QoZGF0ZU9iail9XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHtkYXl9XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkcnAtc3RhdHVzXCI+e2luZFQoXCJEYXRlUGlja2VyX1NlbGVjdERhdGVcIiwgXCJTZWxlY3QgZGF0ZVwiKX08L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn1cclxuIiwgImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBGbG9hdGluZ0xpc3QgZnJvbSBcIi4vRmxvYXRpbmdMaXN0LnRzeFwiO1xuaW1wb3J0IHsgQ2hldnJvbkRvd25TdmcsIENoZXZyb25VcFN2ZyB9IGZyb20gXCIuL2NoZXZyb25zLnRzeFwiO1xuaW1wb3J0IHsgdXNlT3V0c2lkZUNsaWNrIH0gZnJvbSBcIi4uLy4uL2hvb2tzL3VzZU91dHNpZGVDbGljay50c1wiO1xuaW1wb3J0IHsgY2xhc3NOYW1lcyB9IGZyb20gXCIuLi8uLi91dGlscy9jbGFzc05hbWVzLnRzXCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcblxudHlwZSBSYXdPcHRpb24gPSB7IHZhbHVlPzogc3RyaW5nIHwgbnVtYmVyOyBWYWx1ZT86IHN0cmluZyB8IG51bWJlcjsgdGV4dD86IHN0cmluZzsgVGV4dD86IHN0cmluZyB9IHwgW3N0cmluZyB8IG51bWJlciwgc3RyaW5nXTtcblxudHlwZSBTZWxlY3RDb21ib2JveFByb3BzID0ge1xuICBsYWJlbDogc3RyaW5nO1xuICBvcHRpb25zOiBSYXdPcHRpb25bXTtcbiAgdmFsdWU6IHN0cmluZyB8IG51bWJlcjtcbiAgb25DaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBwbGFjZWhvbGRlcj86IHN0cmluZztcbiAgaW52YWxpZD86IGJvb2xlYW47XG4gIGRpc2FibGVkPzogYm9vbGVhbjtcbiAgcmVhZE9ubHk/OiBib29sZWFuO1xuICB1c2VQb3J0YWw/OiBib29sZWFuO1xuICBlbWl0T25WYWx1ZUNoYW5nZT86IGJvb2xlYW47XG4gIGlkQmFzZT86IHN0cmluZztcbiAgcG9ydGFsQ2xhc3NOYW1lPzogc3RyaW5nO1xuICBwYW5lbENsYXNzTmFtZT86IHN0cmluZztcbn07XG5cbi8vIFJldXNhYmxlIHNlbGVjdCBjb21ib2JveCB3aXRoIG9wdGlvbmFsIHBvcnRhbCByZW5kZXJpbmcgZm9yIHRoZSBsaXN0LlxuY29uc3QgU2VsZWN0Q29tYm9ib3ggPSAoe1xuICBsYWJlbCxcbiAgb3B0aW9ucyxcbiAgdmFsdWUsXG4gIG9uQ2hhbmdlLFxuICBwbGFjZWhvbGRlcixcbiAgaW52YWxpZCA9IGZhbHNlLFxuICBkaXNhYmxlZCA9IGZhbHNlLFxuICByZWFkT25seSA9IGZhbHNlLFxuICB1c2VQb3J0YWwgPSB0cnVlLFxuICBlbWl0T25WYWx1ZUNoYW5nZSA9IGZhbHNlLFxuICBpZEJhc2UsXG4gIHBvcnRhbENsYXNzTmFtZSxcbiAgcGFuZWxDbGFzc05hbWUsXG59OiBTZWxlY3RDb21ib2JveFByb3BzKSA9PiB7XG4gIGNvbnN0IHJlYWRPbmx5TW9kZSA9IHJlYWRPbmx5IHx8IGRpc2FibGVkO1xuICBjb25zdCB2YWx1ZUNvbG9yID0gcmVhZE9ubHlNb2RlID8gXCIjNjQ3NDhiXCIgOiBcIiMwMDI5NmJlMFwiO1xuICBjb25zdCBkYXRhID0gdXNlTWVtbygoKSA9PiB7XG4gICAgcmV0dXJuIChvcHRpb25zIHx8IFtdKS5tYXAoKG8pID0+IHtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KG8pKSB7XG4gICAgICAgIHJldHVybiB7IHZhbHVlOiBvWzBdID8/IFwiXCIsIHRleHQ6IG9bMV0gPz8gXCJcIiB9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHsgdmFsdWU6IG8/LnZhbHVlID8/IG8/LlZhbHVlID8/IFwiXCIsIHRleHQ6IG8/LnRleHQgPz8gbz8uVGV4dCA/PyBcIlwiIH07XG4gICAgfSk7XG4gIH0sIFtvcHRpb25zXSk7XG5cbiAgY29uc3QgW3F1ZXJ5LCBzZXRRdWVyeV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW3NlbGVjdGVkLCBzZXRTZWxlY3RlZF0gPSB1c2VTdGF0ZShcbiAgICBkYXRhLmZpbmQoKGQpID0+IFN0cmluZyhkLnZhbHVlKSA9PT0gU3RyaW5nKHZhbHVlKSkgfHwgZGF0YVswXSB8fCB7IHZhbHVlOiBcIlwiLCB0ZXh0OiBcIlwiIH1cbiAgKTtcbiAgY29uc3QgW29wZW4sIHNldE9wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbYWN0aXZlSW5kZXgsIHNldEFjdGl2ZUluZGV4XSA9IHVzZVN0YXRlKDApO1xuICBjb25zdCBjb250YWluZXJSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgYm94UmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IGxpc3RSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcblxuICB1c2VPdXRzaWRlQ2xpY2soW2NvbnRhaW5lclJlZiwgbGlzdFJlZl0sICgpID0+IHNldE9wZW4oZmFsc2UpKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHNldFNlbGVjdGVkKGRhdGEuZmluZCgoZCkgPT4gU3RyaW5nKGQudmFsdWUpID09PSBTdHJpbmcodmFsdWUpKSB8fCBkYXRhWzBdIHx8IHsgdmFsdWU6IFwiXCIsIHRleHQ6IFwiXCIgfSk7XG4gIH0sIFt2YWx1ZSwgZGF0YV0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc2V0UXVlcnkoXCJcIik7XG4gIH0sIFtzZWxlY3RlZF0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFlbWl0T25WYWx1ZUNoYW5nZSkgcmV0dXJuO1xuICAgIG9uQ2hhbmdlKHNlbGVjdGVkPy52YWx1ZSA/IFN0cmluZyhzZWxlY3RlZC52YWx1ZSkgOiBcIlwiKTtcbiAgfSwgW2VtaXRPblZhbHVlQ2hhbmdlLCBvbkNoYW5nZSwgc2VsZWN0ZWRdKTtcblxuICBjb25zdCBmaWx0ZXJlZCA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIGlmICghcXVlcnkudHJpbSgpKSByZXR1cm4gZGF0YTtcbiAgICBjb25zdCBmID0gZGF0YS5maWx0ZXIoKG8pID0+IG8udGV4dC50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHF1ZXJ5LnRvTG93ZXJDYXNlKCkpKTtcbiAgICByZXR1cm4gZi5sZW5ndGggPyBmIDogZGF0YTtcbiAgfSwgW2RhdGEsIHF1ZXJ5XSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBzZXRBY3RpdmVJbmRleCgwKTtcbiAgfSwgW2ZpbHRlcmVkLmxlbmd0aCwgcXVlcnldKTtcblxuICBjb25zdCBzZWxlY3RPcHRpb24gPSAob3B0OiB7IHZhbHVlOiBzdHJpbmcgfCBudW1iZXI7IHRleHQ6IHN0cmluZyB9KSA9PiB7XG4gICAgc2V0U2VsZWN0ZWQob3B0KTtcbiAgICBzZXRRdWVyeShcIlwiKTtcbiAgICBzZXRPcGVuKGZhbHNlKTtcbiAgICBpZiAoIWVtaXRPblZhbHVlQ2hhbmdlKSB7XG4gICAgICBvbkNoYW5nZShvcHQ/LnZhbHVlID8gU3RyaW5nKG9wdC52YWx1ZSkgOiBcIlwiKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlS2V5RG93biA9IChldjogUmVhY3QuS2V5Ym9hcmRFdmVudDxIVE1MSW5wdXRFbGVtZW50PikgPT4ge1xuICAgIGlmIChkaXNhYmxlZCkgcmV0dXJuO1xuICAgIGlmIChldi5rZXkgPT09IFwiQXJyb3dEb3duXCIpIHtcbiAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBzZXRPcGVuKHRydWUpO1xuICAgICAgaWYgKGZpbHRlcmVkLmxlbmd0aCkgc2V0QWN0aXZlSW5kZXgoKGlkeCkgPT4gKGlkeCArIDEpICUgZmlsdGVyZWQubGVuZ3RoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGV2LmtleSA9PT0gXCJBcnJvd1VwXCIpIHtcbiAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBzZXRPcGVuKHRydWUpO1xuICAgICAgaWYgKGZpbHRlcmVkLmxlbmd0aCkgc2V0QWN0aXZlSW5kZXgoKGlkeCkgPT4gKGlkeCAtIDEgKyBmaWx0ZXJlZC5sZW5ndGgpICUgZmlsdGVyZWQubGVuZ3RoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGV2LmtleSA9PT0gXCJFbnRlclwiKSB7XG4gICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgaWYgKG9wZW4gJiYgZmlsdGVyZWQubGVuZ3RoKSB7XG4gICAgICAgIHNlbGVjdE9wdGlvbihmaWx0ZXJlZFthY3RpdmVJbmRleF0gPz8gZmlsdGVyZWRbMF0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2V0T3Blbih0cnVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGV2LmtleSA9PT0gXCJFc2NhcGVcIikgc2V0T3BlbihmYWxzZSk7XG4gIH07XG5cbiAgY29uc3Qgc2FmZUlkID0gU3RyaW5nKGlkQmFzZSB8fCBsYWJlbCB8fCBcInNlbGVjdFwiKTtcbiAgY29uc3QgbGlzdElkID0gYHNlbGVjdC1vcHRpb25zLSR7c2FmZUlkfWA7XG4gIGNvbnN0IGFjdGl2ZUlkID0gb3BlbiAmJiBmaWx0ZXJlZFthY3RpdmVJbmRleF0gPyBgc2VsZWN0LW9wdC0ke3NhZmVJZH0tJHtmaWx0ZXJlZFthY3RpdmVJbmRleF0udmFsdWV9YCA6IHVuZGVmaW5lZDtcbiAgY29uc3QgbGlzdE9wZW4gPSBvcGVuICYmICFkaXNhYmxlZDtcblxuICBjb25zdCBsaXN0Qm9keSA9IChcbiAgICA8ZGl2IGlkPXtsaXN0SWR9IHJlZj17bGlzdFJlZn0gcm9sZT1cImxpc3Rib3hcIiBhcmlhLWxhYmVsPXtsYWJlbH0+XG4gICAgICB7ZmlsdGVyZWQubGVuZ3RoID09PSAwICYmIDxkaXYgY2xhc3NOYW1lPVwicHgtNCBweS0yIHRleHQtc20gdGV4dC1zbGF0ZS01MDBcIj57aW5kVChcIkRyb3Bkb3duX05vUmVzdWx0c1wiLCBcIk5vIHJlc3VsdHNcIil9PC9kaXY+fVxuICAgICAge2ZpbHRlcmVkLm1hcCgob3B0LCBpZHgpID0+IHtcbiAgICAgICAgY29uc3Qgc2VsID0gc2VsZWN0ZWQ/LnZhbHVlID09PSBvcHQudmFsdWU7XG4gICAgICAgIGNvbnN0IGlzQWN0aXZlID0gaWR4ID09PSBhY3RpdmVJbmRleDtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIGtleT17U3RyaW5nKG9wdC52YWx1ZSl9XG4gICAgICAgICAgICBpZD17YHNlbGVjdC1vcHQtJHtzYWZlSWR9LSR7b3B0LnZhbHVlfWB9XG4gICAgICAgICAgICByb2xlPVwib3B0aW9uXCJcbiAgICAgICAgICAgIGFyaWEtc2VsZWN0ZWQ9e3NlbH1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgICAgICAgXCJyZWxhdGl2ZSBmbGV4IHctZnVsbCBjdXJzb3ItZGVmYXVsdCBzZWxlY3Qtbm9uZSBpdGVtcy1jZW50ZXIgcHktMiBwci0zIHRleHQtbGVmdCB0ZXh0LXNtIHR5cGUtb3B0aW9uXCIsXG4gICAgICAgICAgICAgIGlzQWN0aXZlID8gXCJiZy1wcmltYXJ5IHRleHQtd2hpdGVcIiA6IFwidGV4dC1zbGF0ZS05MDBcIlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIG9uTW91c2VFbnRlcj17KCkgPT4gc2V0QWN0aXZlSW5kZXgoaWR4KX1cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNlbGVjdE9wdGlvbihvcHQpfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtzZWwgJiYgKFxuICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgICAgICAgICAgIFwiYWJzb2x1dGUgaW5zZXQteS0wIGxlZnQtMCBmbGV4IGl0ZW1zLWNlbnRlciBwbC0yXCIsXG4gICAgICAgICAgICAgICAgICBpc0FjdGl2ZSA/IFwidGV4dC13aGl0ZVwiIDogXCJ0ZXh0LXByaW1hcnlcIlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgID48L3NwYW4+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtjbGFzc05hbWVzKFwiYmxvY2sgdHJ1bmNhdGVcIiwgc2VsID8gXCJmb250LW1lZGl1bVwiIDogXCJmb250LW5vcm1hbFwiKX0+e29wdC50ZXh0fTwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgKTtcbiAgICAgIH0pfVxuICAgIDwvZGl2PlxuICApO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdlxuICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFwic3BhY2UteS0yXCIsIGRpc2FibGVkID8gXCJwb2ludGVyLWV2ZW50cy1ub25lIHNlbGVjdC1ub25lXCIgOiBcIlwiKX1cbiAgICAgIHJlZj17Y29udGFpbmVyUmVmfVxuICAgID5cbiAgICAgIDxsYWJlbCBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXCJmb3JtLWxhYmVsIGZvbnQtc2VtaWJvbGRcIiwgaW52YWxpZCA/IFwidGV4dC1yb3NlLTcwMFwiIDogXCJcIil9PntsYWJlbH08L2xhYmVsPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZVwiPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgcmVmPXtib3hSZWZ9XG4gICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAgICAgXCJyZWxhdGl2ZSB3LWZ1bGwgY3Vyc29yLWRlZmF1bHQgcm91bmRlZC14bCBiZy13aGl0ZSB0ZXh0LWxlZnQgZm9jdXMtd2l0aGluOmJvcmRlci1wcmltYXJ5IGZvY3VzLXdpdGhpbjpyaW5nLTIgZm9jdXMtd2l0aGluOnJpbmctcHJpbWFyeSBmb2N1cy13aXRoaW46cmluZy1vZmZzZXQtd2hpdGUgc206dGV4dC1zbVwiLFxuICAgICAgICAgICAgcmVhZE9ubHlNb2RlID8gXCJpbmQtcmVhZG9ubHktZmllbGRcIiA6IFwiXCJcbiAgICAgICAgICApfVxuICAgICAgICAgIHN0eWxlPXtyZWFkT25seU1vZGUgPyB7IGNvbG9yOiB2YWx1ZUNvbG9yIH0gOiB1bmRlZmluZWR9XG4gICAgICAgID5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgICAgICAgXCJ3LWZ1bGwgcm91bmRlZC14bCBib3JkZXIgcHgtMyBweS0yIHByLTEwIHRleHQtc20gc206dGV4dC1iYXNlIGxlYWRpbmctNSBmb2N1czpvdXRsaW5lLWhpZGRlbiBmb2N1czpyaW5nLTIgZGlzYWJsZWQ6Ymctc2xhdGUtMTAwIGRpc2FibGVkOnRleHQtc2xhdGUtNTAwIGRpc2FibGVkOmJvcmRlci1zbGF0ZS0yMDAgZGlzYWJsZWQ6Y3Vyc29yLW5vdC1hbGxvd2VkXCIsXG4gICAgICAgICAgICAgIGludmFsaWRcbiAgICAgICAgICAgICAgICA/IFwiYm9yZGVyLXJvc2UtNDAwIGJnLXJvc2UtNTAgZm9jdXM6cmluZy1yb3NlLTIwMCBmb2N1czpib3JkZXItcm9zZS00MDBcIlxuICAgICAgICAgICAgICAgIDogXCJib3JkZXItc2xhdGUtMjAwIGZvY3VzOnJpbmctcHJpbWFyeSBmb2N1czpib3JkZXItcHJpbWFyeVwiLFxuICAgICAgICAgICAgICByZWFkT25seU1vZGUgPyBcImluZC1yZWFkb25seS1maWVsZFwiIDogXCJ0ZXh0LXNsYXRlLTkwMFwiXG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgc3R5bGU9e3JlYWRPbmx5TW9kZSA/IHsgY29sb3I6IHZhbHVlQ29sb3IgfSA6IHVuZGVmaW5lZH1cbiAgICAgICAgICAgIHZhbHVlPXtxdWVyeSB8fCBzZWxlY3RlZD8udGV4dCB8fCBcIlwifVxuICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCB2YWwgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgICAgICAgICAgIHNldFF1ZXJ5KHZhbCk7XG4gICAgICAgICAgICAgIHNldE9wZW4odHJ1ZSk7XG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgb25LZXlEb3duPXtoYW5kbGVLZXlEb3dufVxuICAgICAgICAgICAgb25Gb2N1cz17KCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoIWRpc2FibGVkKSBzZXRPcGVuKHRydWUpO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cbiAgICAgICAgICAgIHJvbGU9XCJjb21ib2JveFwiXG4gICAgICAgICAgICBhcmlhLWV4cGFuZGVkPXtsaXN0T3Blbn1cbiAgICAgICAgICAgIGFyaWEtY29udHJvbHM9e2xpc3RJZH1cbiAgICAgICAgICAgIGFyaWEtYWN0aXZlZGVzY2VuZGFudD17YWN0aXZlSWR9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LXktMCByaWdodC0wIGZsZXggaXRlbXMtY2VudGVyIHByLTIgdGV4dC1zbGF0ZS01MDAgaG92ZXI6dGV4dC1zbGF0ZS02MDBcIlxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoZGlzYWJsZWQpIHJldHVybjtcbiAgICAgICAgICAgICAgc2V0T3BlbigocHJldikgPT4gIXByZXYpO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIGFyaWEtbGFiZWw9e29wZW4gPyBpbmRUKFwiRHJvcGRvd25fSGlkZU9wdGlvbnNcIiwgXCJIaWRlIG9wdGlvbnNcIikgOiBpbmRUKFwiRHJvcGRvd25fU2hvd09wdGlvbnNcIiwgXCJTaG93IG9wdGlvbnNcIil9XG4gICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge29wZW4gPyA8Q2hldnJvblVwU3ZnIGNsYXNzTmFtZT1cImgtNSB3LTVcIiAvPiA6IDxDaGV2cm9uRG93blN2ZyBjbGFzc05hbWU9XCJoLTUgdy01XCIgLz59XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7dXNlUG9ydGFsID8gKFxuICAgICAgICAgIDxGbG9hdGluZ0xpc3RcbiAgICAgICAgICAgIGFuY2hvclJlZj17Ym94UmVmfVxuICAgICAgICAgICAgb3Blbj17bGlzdE9wZW59XG4gICAgICAgICAgICB6SW5kZXg9ezM2MDAwMH1cbiAgICAgICAgICAgIG1heEhlaWdodENsYXNzPVwibWF4LWgtNzJcIlxuICAgICAgICAgICAgcm9sZT1cImxpc3Rib3hcIlxuICAgICAgICAgICAgcm91bmRlZENsYXNzPVwicm91bmRlZC14bFwiXG4gICAgICAgICAgICBwb3J0YWxDbGFzc05hbWU9e3BvcnRhbENsYXNzTmFtZX1cbiAgICAgICAgICAgIHBhbmVsQ2xhc3NOYW1lPXtwYW5lbENsYXNzTmFtZX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7bGlzdEJvZHl9XG4gICAgICAgICAgPC9GbG9hdGluZ0xpc3Q+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgbGlzdE9wZW4gJiYgKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSB6LTM2MDAwMCBtdC0xIHctZnVsbCByb3VuZGVkLXhsIGJnLXdoaXRlIHNoYWRvdy1sZyByaW5nLTEgcmluZy1ibGFjay81IGZvY3VzOm91dGxpbmUtaGlkZGVuIG1heC1oLTcyIG92ZXJmbG93LWF1dG9cIj5cbiAgICAgICAgICAgICAge2xpc3RCb2R5fVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKVxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBTZWxlY3RDb21ib2JveDtcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5cbnR5cGUgUG9pbnRlckJpbmRpbmdzID0ge1xuICBvblBvaW50ZXJEb3duPzogUmVhY3QuUG9pbnRlckV2ZW50SGFuZGxlcjxIVE1MVGV4dEFyZWFFbGVtZW50PjtcbiAgb25Qb2ludGVyTW92ZT86IFJlYWN0LlBvaW50ZXJFdmVudEhhbmRsZXI8SFRNTFRleHRBcmVhRWxlbWVudD47XG4gIG9uUG9pbnRlclVwPzogUmVhY3QuUG9pbnRlckV2ZW50SGFuZGxlcjxIVE1MVGV4dEFyZWFFbGVtZW50PjtcbiAgb25Qb2ludGVyQ2FuY2VsPzogUmVhY3QuUG9pbnRlckV2ZW50SGFuZGxlcjxIVE1MVGV4dEFyZWFFbGVtZW50Pjtcbn07XG5cbnR5cGUgVGFwVGV4dEFyZWFGaWVsZCA9IHtcbiAgaWQ6IHN0cmluZztcbiAgbGFiZWw6IHN0cmluZztcbiAgdmFsdWU6IHN0cmluZztcbiAgY2xhc3NOYW1lOiBzdHJpbmc7XG4gIHBvaW50ZXJCaW5kaW5nczogUG9pbnRlckJpbmRpbmdzO1xufTtcblxudHlwZSBQcm9wcyA9IHtcbiAgZGVzY3JpcHRpb25MYWJlbDogc3RyaW5nO1xuICBkZXNjcmlwdGlvblZhbHVlOiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uQ2xhc3NOYW1lOiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uRGlzYWJsZWQ/OiBib29sZWFuO1xuICBkZXNjcmlwdGlvbk1heExlbmd0aD86IG51bWJlcjtcbiAgb25EZXNjcmlwdGlvbkNoYW5nZTogKG5leHRWYWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICB0YXBGaWVsZHM6IFRhcFRleHRBcmVhRmllbGRbXTtcbn07XG5cbi8vIFJlbmRlcnMgdGhlIHNoYXJlZCBuYXJyYXRpdmUgZmllbGRzIGJsb2NrIGZvciBjcmVhdGUvZGV0YWlsIGZsb3dzLlxuY29uc3QgVmlzaXROYXJyYXRpdmVGaWVsZHMgPSAoe1xuICBkZXNjcmlwdGlvbkxhYmVsLFxuICBkZXNjcmlwdGlvblZhbHVlLFxuICBkZXNjcmlwdGlvbkNsYXNzTmFtZSxcbiAgZGVzY3JpcHRpb25EaXNhYmxlZCA9IGZhbHNlLFxuICBkZXNjcmlwdGlvbk1heExlbmd0aCA9IDIwMCxcbiAgb25EZXNjcmlwdGlvbkNoYW5nZSxcbiAgdGFwRmllbGRzLFxufTogUHJvcHMpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgZ2FwLTNcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yXCI+XG4gICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb3JtLWxhYmVsIGZvbnQtc2VtaWJvbGRcIj57ZGVzY3JpcHRpb25MYWJlbH08L2xhYmVsPlxuICAgICAgICA8aW5wdXRcbiAgICAgICAgICBpZD1cImRlc2NyaXB0aW9uXCJcbiAgICAgICAgICBjbGFzc05hbWU9e2Rlc2NyaXB0aW9uQ2xhc3NOYW1lfVxuICAgICAgICAgIG1heExlbmd0aD17ZGVzY3JpcHRpb25NYXhMZW5ndGh9XG4gICAgICAgICAgdmFsdWU9e2Rlc2NyaXB0aW9uVmFsdWV9XG4gICAgICAgICAgZGlzYWJsZWQ9e2Rlc2NyaXB0aW9uRGlzYWJsZWR9XG4gICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBvbkRlc2NyaXB0aW9uQ2hhbmdlKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7dGFwRmllbGRzLm1hcCgoZmllbGQpID0+IChcbiAgICAgICAgPGRpdiBrZXk9e2ZpZWxkLmlkfSBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cbiAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZm9ybS1sYWJlbCBmb250LXNlbWlib2xkXCI+e2ZpZWxkLmxhYmVsfTwvbGFiZWw+XG4gICAgICAgICAgPHRleHRhcmVhXG4gICAgICAgICAgICBpZD17ZmllbGQuaWR9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2ZpZWxkLmNsYXNzTmFtZX1cbiAgICAgICAgICAgIHZhbHVlPXtmaWVsZC52YWx1ZX1cbiAgICAgICAgICAgIHJlYWRPbmx5XG4gICAgICAgICAgICBvblBvaW50ZXJEb3duPXtmaWVsZC5wb2ludGVyQmluZGluZ3Mub25Qb2ludGVyRG93bn1cbiAgICAgICAgICAgIG9uUG9pbnRlck1vdmU9e2ZpZWxkLnBvaW50ZXJCaW5kaW5ncy5vblBvaW50ZXJNb3ZlfVxuICAgICAgICAgICAgb25Qb2ludGVyVXA9e2ZpZWxkLnBvaW50ZXJCaW5kaW5ncy5vblBvaW50ZXJVcH1cbiAgICAgICAgICAgIG9uUG9pbnRlckNhbmNlbD17ZmllbGQucG9pbnRlckJpbmRpbmdzLm9uUG9pbnRlckNhbmNlbH1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICkpfVxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgVmlzaXROYXJyYXRpdmVGaWVsZHM7XG4iLCAiZXhwb3J0IGNvbnN0IHdhaXQgPSAobXM6IG51bWJlcikgPT4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgbXMpKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtQkFBMEQ7QUE0Q2pEO0FBbENULElBQU0sY0FBd0IsQ0FBQztBQUUvQixJQUFNLGVBQTBCO0FBQUEsRUFDOUIsWUFBWTtBQUFBLEVBQ1osR0FBRyxDQUFDLEtBQUssYUFBYSxZQUFZO0FBQUEsRUFDbEMsUUFBUSxDQUFDLEtBQUssYUFBYSxTQUFTO0FBQ2xDLFVBQU0sV0FBVyxZQUFZO0FBQzdCLFdBQU8sT0FBTyxRQUFRLEVBQUUsUUFBUSxjQUFjLENBQUMsR0FBRyxRQUFRLE9BQU8sS0FBSyxPQUFPLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUFBLEVBQzNGO0FBQ0Y7QUFFQSxJQUFNLGtCQUFjLDRCQUF5QixZQUFZO0FBT2xELElBQU0sZUFBZSxDQUFDLEVBQUUsVUFBVSxXQUFXLE1BQXFCO0FBQ3ZFLFFBQU0sT0FBTyxlQUFlLFdBQVcsZ0JBQWdCLENBQUM7QUFFeEQsUUFBTSxZQUFRLHNCQUFtQixNQUFNO0FBQ3JDLFVBQU0sSUFBSSxDQUFDLEtBQWEsYUFBc0I7QUFDNUMsWUFBTUEsU0FBUSxLQUFLLEdBQUc7QUFDdEIsVUFBSSxPQUFPQSxXQUFVLFlBQVlBLE9BQU0sS0FBSyxFQUFHLFFBQU9BO0FBQ3RELGFBQU8sWUFBWTtBQUFBLElBQ3JCO0FBQ0EsVUFBTSxTQUFTLENBQUMsS0FBYSxhQUFpQyxTQUFpQztBQUM3RixZQUFNLFdBQVcsRUFBRSxLQUFLLFFBQVE7QUFDaEMsYUFBTyxPQUFPLFFBQVEsRUFBRSxRQUFRLGNBQWMsQ0FBQyxHQUFHLFFBQVEsT0FBTyxLQUFLLE9BQU8sR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQUEsSUFDM0Y7QUFDQSxXQUFPLEVBQUUsWUFBWSxNQUFNLEdBQUcsT0FBTztBQUFBLEVBQ3ZDLEdBQUcsQ0FBQyxJQUFJLENBQUM7QUFFVCxTQUFPLDRDQUFDLFlBQVksVUFBWixFQUFxQixPQUFlLFVBQVM7QUFDdkQ7OztBQzdDQSxJQUFBQyxnQkFBMEQ7QUEyQ2pELElBQUFDLHNCQUFBO0FBdkNULElBQU0sZ0JBQTZDO0FBQUEsRUFDakQsTUFBTTtBQUFBLEVBQ04sTUFBTTtBQUFBLEVBQ04sS0FBSztBQUFBLEVBQ0wsWUFBWTtBQUNkO0FBUUEsSUFBTUMsZ0JBQTBCO0FBQUEsRUFDOUIsY0FBYyxDQUFDO0FBQUEsRUFDZixpQkFBaUI7QUFBQSxFQUNqQixXQUFXLE1BQU07QUFDbkI7QUFFQSxJQUFNLGtCQUFjLDZCQUF5QkEsYUFBWTtBQVFsRCxJQUFNLGVBQWUsQ0FBQyxFQUFFLFVBQVUsY0FBYyxnQkFBZ0IsTUFBcUI7QUFDMUYsUUFBTSxTQUFTLGlCQUFpQixXQUFXLHlCQUF5QixDQUFDO0FBQ3JFLFFBQU0sVUFBVSxtQkFBbUIsT0FBTyxXQUFXLDRCQUE0QixFQUFFO0FBRW5GLFFBQU0sWUFBUSx1QkFBbUIsTUFBTTtBQUNyQyxVQUFNLFlBQVksQ0FBQyxNQUFjLFFBQXFCLFdBQVc7QUFDL0QsWUFBTSxVQUFVLE9BQU8sU0FBUyxJQUFJLEtBQUssQ0FBQztBQUMxQyxhQUFPLFdBQVcsY0FBYyxLQUFLO0FBQUEsSUFDdkM7QUFDQSxXQUFPLEVBQUUsY0FBYyxRQUFRLGlCQUFpQixTQUFTLFVBQVU7QUFBQSxFQUNyRSxHQUFHLENBQUMsUUFBUSxPQUFPLENBQUM7QUFFcEIsU0FBTyw2Q0FBQyxZQUFZLFVBQVosRUFBcUIsT0FBZSxVQUFTO0FBQ3ZEOzs7QUNoQ00sSUFBQUMsc0JBQUE7QUFITixJQUFNLHVCQUF1QixDQUFDLEVBQUUsU0FBUyxNQUFhO0FBQ3BELFNBQ0UsNkNBQUMsZ0JBQ0MsdURBQUMsZ0JBQWMsVUFBUyxHQUMxQjtBQUVKO0FBRUEsSUFBTywrQkFBUTs7O0FDaEJmLHVCQUE2QjtBQTJDckIsSUFBQUMsc0JBQUE7QUF2Qk8sU0FBUixhQUE4QjtBQUFBLEVBQ25DO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBLGFBQWE7QUFBQSxFQUNiLGNBQWM7QUFBQSxFQUNkLE9BQU87QUFBQSxFQUNQLFFBQVE7QUFBQSxFQUNSLFNBQVM7QUFBQSxFQUNUO0FBQUEsRUFDQTtBQUNGLEdBQXNCO0FBQ3BCLE1BQUksQ0FBQyxLQUFNLFFBQU87QUFFbEIsUUFBTSxXQUFXLFFBQVEsQ0FBQyxDQUFDO0FBQzNCLFFBQU0sV0FBVyxPQUFRLFVBQVUsY0FBZTtBQUVsRCxhQUFPO0FBQUEsSUFDTCw2Q0FBQyxTQUFJLFdBQVUsNEVBQ2Isd0RBQUMsU0FBSSxXQUFVLHdGQUNiO0FBQUEsbURBQUMsU0FBSSxXQUFVLHdDQUF3QyxpQkFBTTtBQUFBLE1BQzdELDZDQUFDLFNBQUksV0FBVSw4Q0FBOEMsbUJBQVE7QUFBQSxNQUNwRSxZQUNDLDhDQUFDLFNBQUksV0FBVSxrREFDWjtBQUFBLGdCQUFRLDZDQUFDLG1CQUFRLE1BQUssV0FBVTtBQUFBLFFBQ2pDLDZDQUFDLFVBQUssV0FBVyxTQUFTLENBQUMsT0FBTyxrQkFBa0IsSUFBSyxvQkFBUztBQUFBLFNBQ3BFO0FBQUEsTUFFRiw4Q0FBQyxTQUFJLFdBQVUsK0JBQ1o7QUFBQSxzQkFDQztBQUFBLFVBQUM7QUFBQTtBQUFBLFlBQ0MsTUFBSztBQUFBLFlBQ0wsV0FBVTtBQUFBLFlBQ1YsU0FBUztBQUFBLFlBQ1QsVUFBVTtBQUFBLFlBRVQ7QUFBQTtBQUFBLFFBQ0g7QUFBQSxRQUVELGVBQ0M7QUFBQSxVQUFDO0FBQUE7QUFBQSxZQUNDLE1BQUs7QUFBQSxZQUNMLFdBQVU7QUFBQSxZQUNWLFNBQVM7QUFBQSxZQUNULFVBQVU7QUFBQSxZQUVULGlCQUFPLGNBQWM7QUFBQTtBQUFBLFFBQ3hCO0FBQUEsU0FFSjtBQUFBLE9BQ0YsR0FDRjtBQUFBLElBQ0EsU0FBUztBQUFBLEVBQ1g7QUFDRjs7O0FDOUVBLElBQUFDLGdCQUFrQjtBQTRCTCxJQUFBQyxzQkFBQTtBQWhCYixJQUFNLG1CQUFOLGNBQStCLGNBQUFDLFFBQU0sVUFBd0I7QUFBQSxFQUMzRCxZQUFZLE9BQWM7QUFDeEIsVUFBTSxLQUFLO0FBQ1gsU0FBSyxRQUFRLEVBQUUsVUFBVSxNQUFNO0FBQUEsRUFDakM7QUFBQSxFQUVBLE9BQU8sMkJBQTJCO0FBQ2hDLFdBQU8sRUFBRSxVQUFVLEtBQUs7QUFBQSxFQUMxQjtBQUFBLEVBRUEsa0JBQWtCLE9BQWdCLE1BQXVCO0FBQ3ZELFlBQVEsTUFBTSxtQ0FBbUMsT0FBTyxJQUFJO0FBQUEsRUFDOUQ7QUFBQSxFQUVBLFNBQVM7QUFDUCxRQUFJLEtBQUssTUFBTSxVQUFVO0FBQ3ZCLGFBQU8sNkNBQUMsU0FBSSxXQUFVLGtFQUFrRSxlQUFLLE1BQU0saUJBQWdCO0FBQUEsSUFDckg7QUFDQSxXQUFPLEtBQUssTUFBTTtBQUFBLEVBQ3BCO0FBQ0Y7QUFFQSxJQUFPLDJCQUFROzs7QUMzQlIsSUFBTSxhQUFhLE1BQU07QUFDOUIsUUFBTSxhQUFjLE9BQU8sV0FBVyxlQUFlLE9BQU8sbUJBQW9CLENBQUM7QUFDakYsUUFBTSxpQkFBa0IsT0FBTyxXQUFXLGVBQWUsT0FBTyx1QkFBd0IsQ0FBQztBQUV6RixTQUFPO0FBQUEsSUFDTDtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQ0Y7OztBQ2ZBLElBQU0sMkJBQTJCO0FBQ2pDLElBQU0sb0JBQW9CO0FBQzFCLElBQU0sbUJBQW1CO0FBRXpCLElBQUksZ0JBQW9DO0FBQ3hDLElBQUksb0JBQW9CO0FBRWpCLElBQU0sbUJBQW1CLENBQUMsV0FBK0I7QUFDOUQsa0JBQWdCO0FBQ2xCO0FBRUEsSUFBTSx1QkFBdUIsTUFBbUI7QUFDOUMsTUFBSSxZQUFZLFNBQVMsZUFBZSxtQkFBbUI7QUFDM0QsTUFBSSxVQUFXLFFBQU87QUFDdEIsY0FBWSxTQUFTLGNBQWMsS0FBSztBQUN4QyxZQUFVLEtBQUs7QUFDZixZQUFVLFlBQVk7QUFDdEIsV0FBUyxLQUFLLFlBQVksU0FBUztBQUNuQyxTQUFPO0FBQ1Q7QUFFQSxJQUFNLHlCQUF5QixNQUFNO0FBQ25DLE1BQUksa0JBQW1CO0FBQ3ZCLHNCQUFvQjtBQUNwQixXQUFTO0FBQUEsSUFDUDtBQUFBLElBQ0EsQ0FBQyxVQUFVO0FBQ1QsWUFBTSxZQUFZLFNBQVMsZUFBZSxtQkFBbUI7QUFDN0QsVUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLFVBQVUsU0FBUyxTQUFTLEVBQUc7QUFDNUQsVUFBSSxpQkFBaUIsY0FBYyxTQUFTLE1BQU0sTUFBYyxFQUFHO0FBQ25FLHlCQUFtQjtBQUFBLElBQ3JCO0FBQUEsSUFDQTtBQUFBLEVBQ0Y7QUFDQSxXQUFTLGlCQUFpQixXQUFXLENBQUMsVUFBVTtBQUM5QyxRQUFJLE1BQU0sUUFBUSxTQUFVLG9CQUFtQjtBQUFBLEVBQ2pELENBQUM7QUFDSDtBQUVPLElBQU0scUJBQXFCLENBQUMsTUFBYyxZQUE2QjtBQUM1RSxNQUFJLENBQUMsS0FBTSxRQUFPO0FBQ2xCLFFBQU0sWUFBWSxxQkFBcUI7QUFDdkMsWUFBVSxjQUFjO0FBQ3hCLFlBQVUsVUFBVSxJQUFJLFNBQVM7QUFDakMsa0JBQWdCO0FBQ2hCLHlCQUF1QjtBQUV2QixRQUFNLFVBQVUsS0FBSyxNQUFNLE9BQU8sYUFBYSxDQUFDO0FBQ2hELFlBQVUsTUFBTSxPQUFPLEdBQUcsT0FBTztBQUVqQyxRQUFNLFNBQVM7QUFDZixZQUFVLE1BQU0sWUFBWSxHQUFHLEtBQUssTUFBTSxPQUFPLGNBQWMsd0JBQXdCLENBQUM7QUFDeEYsWUFBVSxNQUFNLFlBQVk7QUFFNUIsTUFBSSxXQUFXO0FBQ2YsWUFBVSxNQUFNLFdBQVcsR0FBRyxRQUFRO0FBQ3RDLE1BQUksT0FBTyxVQUFVLHNCQUFzQjtBQUMzQyxRQUFNLFlBQVksT0FBTyxjQUFjO0FBQ3ZDLFNBQU8sS0FBSyxTQUFTLGFBQWEsV0FBVyxrQkFBa0I7QUFDN0QsZ0JBQVk7QUFDWixjQUFVLE1BQU0sV0FBVyxHQUFHLFFBQVE7QUFDdEMsV0FBTyxVQUFVLHNCQUFzQjtBQUFBLEVBQ3pDO0FBRUEsUUFBTSxVQUFVLEtBQUssT0FBTyxPQUFPLGNBQWMsS0FBSyxVQUFVLENBQUM7QUFDakUsTUFBSSxNQUFNLE9BQU8sU0FBUyxPQUFPLElBQUksVUFBVTtBQUMvQyxRQUFNLFNBQVM7QUFDZixRQUFNLFNBQVMsS0FBSyxJQUFJLFFBQVEsT0FBTyxjQUFjLEtBQUssU0FBUyxNQUFNO0FBQ3pFLE1BQUksTUFBTSxPQUFRLE9BQU07QUFDeEIsTUFBSSxNQUFNLE9BQVEsT0FBTTtBQUN4QixZQUFVLE1BQU0sTUFBTSxHQUFHLEtBQUssTUFBTSxHQUFHLENBQUM7QUFDeEMsU0FBTztBQUNUO0FBRU8sSUFBTSxxQkFBcUIsTUFBTTtBQUN0QyxRQUFNLFlBQVksU0FBUyxlQUFlLG1CQUFtQjtBQUM3RCxNQUFJLENBQUMsVUFBVztBQUNoQixZQUFVLFVBQVUsT0FBTyxTQUFTO0FBQ3BDLGtCQUFnQjtBQUNsQjtBQUVPLElBQU0sZ0JBQWdCLENBQUMsT0FBb0M7QUFDaEUsTUFBSSxDQUFDLEdBQUksUUFBTztBQUNoQixTQUFPLEdBQUcsY0FBYyxHQUFHLGNBQWMsS0FBSyxHQUFHLGVBQWUsR0FBRyxlQUFlO0FBQ3BGOzs7QUNwRkEsSUFBQUMsZ0JBQWtCO0FBV2xCLElBQU0sa0JBQWtCO0FBQ3hCLElBQU0sa0JBQWtCO0FBRWpCLElBQU0sY0FBYyxDQUFDLE9BQW1CLGFBQTJCLFlBQXNCO0FBQzlGLFFBQU0sU0FBUyxTQUFTLFVBQVU7QUFDbEMsUUFBTSxTQUFTLFNBQVMsVUFBVTtBQUVsQyxRQUFNLFdBQVcsY0FBQUMsUUFBTSxPQUFPO0FBQUEsSUFDNUIsUUFBUTtBQUFBLElBQ1IsV0FBVztBQUFBLElBQ1gsUUFBUTtBQUFBLElBQ1IsUUFBUTtBQUFBLElBQ1IsT0FBTztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sUUFBUTtBQUFBLEVBQ1YsQ0FBQztBQUNELFFBQU0sZUFBZSxjQUFBQSxRQUFNLE9BQXNCLElBQUk7QUFFckQsUUFBTSxRQUFRLGNBQUFBLFFBQU0sWUFBWSxNQUFNO0FBQ3BDLFFBQUksYUFBYSxTQUFTO0FBQ3hCLG1CQUFhLGFBQWEsT0FBTztBQUNqQyxtQkFBYSxVQUFVO0FBQUEsSUFDekI7QUFDQSxhQUFTLFFBQVEsU0FBUztBQUMxQixhQUFTLFFBQVEsWUFBWTtBQUM3QixhQUFTLFFBQVEsUUFBUTtBQUN6QixhQUFTLFFBQVEsT0FBTztBQUN4QixhQUFTLFFBQVEsU0FBUztBQUFBLEVBQzVCLEdBQUcsQ0FBQyxDQUFDO0FBRUwsUUFBTSxnQkFBZ0IsY0FBQUEsUUFBTTtBQUFBLElBQzFCLENBQUMsVUFBOEI7QUFDN0IsVUFBSSxNQUFNLGdCQUFnQixXQUFXLE1BQU0sV0FBVyxFQUFHO0FBQ3pELGVBQVMsUUFBUSxTQUFTO0FBQzFCLGVBQVMsUUFBUSxZQUFZLE1BQU07QUFDbkMsZUFBUyxRQUFRLFNBQVMsTUFBTTtBQUNoQyxlQUFTLFFBQVEsU0FBUyxNQUFNO0FBQ2hDLGVBQVMsUUFBUSxRQUFRO0FBQ3pCLGVBQVMsUUFBUSxPQUFPO0FBQ3hCLGVBQVMsUUFBUSxTQUFTLE1BQU07QUFFaEMsVUFBSSxhQUFhO0FBQ2YsWUFBSSxhQUFhLFNBQVM7QUFDeEIsdUJBQWEsYUFBYSxPQUFPO0FBQUEsUUFDbkM7QUFDQSxxQkFBYSxVQUFVLE9BQU8sV0FBVyxNQUFNO0FBQzdDLGdCQUFNLFFBQVEsU0FBUztBQUN2QixjQUFJLENBQUMsTUFBTSxVQUFVLE1BQU0sU0FBUyxDQUFDLE1BQU0sT0FBUTtBQUNuRCxnQkFBTSxVQUFVLFlBQVksTUFBTSxRQUFRLE1BQU0sTUFBTTtBQUN0RCxnQkFBTSxPQUFPLFlBQVk7QUFBQSxRQUMzQixHQUFHLE1BQU07QUFBQSxNQUNYO0FBQUEsSUFDRjtBQUFBLElBQ0EsQ0FBQyxhQUFhLE1BQU07QUFBQSxFQUN0QjtBQUVBLFFBQU0sZ0JBQWdCLGNBQUFBLFFBQU07QUFBQSxJQUMxQixDQUFDLFVBQThCO0FBQzdCLFlBQU0sUUFBUSxTQUFTO0FBQ3ZCLFVBQUksQ0FBQyxNQUFNLFVBQVUsTUFBTSxjQUFjLE1BQU0sVUFBVztBQUMxRCxZQUFNLEtBQUssS0FBSyxJQUFJLE1BQU0sVUFBVSxNQUFNLE1BQU07QUFDaEQsWUFBTSxLQUFLLEtBQUssSUFBSSxNQUFNLFVBQVUsTUFBTSxNQUFNO0FBQ2hELFVBQUksS0FBSyxVQUFVLEtBQUssUUFBUTtBQUM5QixjQUFNLFFBQVE7QUFDZCxZQUFJLGFBQWEsU0FBUztBQUN4Qix1QkFBYSxhQUFhLE9BQU87QUFDakMsdUJBQWEsVUFBVTtBQUFBLFFBQ3pCO0FBQ0EsWUFBSSxNQUFNLEtBQU0sb0JBQW1CO0FBQUEsTUFDckM7QUFBQSxJQUNGO0FBQUEsSUFDQSxDQUFDLE1BQU07QUFBQSxFQUNUO0FBRUEsUUFBTSxjQUFjLGNBQUFBLFFBQU07QUFBQSxJQUN4QixDQUFDLFVBQThCO0FBQzdCLFlBQU0sUUFBUSxTQUFTO0FBQ3ZCLFVBQUksQ0FBQyxNQUFNLFVBQVUsTUFBTSxjQUFjLE1BQU0sVUFBVztBQUMxRCxZQUFNLFlBQVksQ0FBQyxNQUFNLFNBQVMsQ0FBQyxNQUFNO0FBQ3pDLFlBQU07QUFDTixVQUFJLFVBQVcsT0FBTSxLQUFLO0FBQUEsSUFDNUI7QUFBQSxJQUNBLENBQUMsT0FBTyxLQUFLO0FBQUEsRUFDZjtBQUVBLFNBQU87QUFBQSxJQUNMO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBLGlCQUFpQjtBQUFBLEVBQ25CO0FBQ0Y7OztBQ3RHQSxJQUFBQyxnQkFBOEM7QUE4QnZDLElBQU0sbUJBQW1CLENBQUMsRUFBRSxvQkFBb0Isa0JBQWtCLE1BQTRCO0FBQ25HLFFBQU0sQ0FBQyxPQUFPLFFBQVEsUUFBSSx3QkFBNEI7QUFBQSxJQUNwRCxNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsSUFDUCxTQUFTO0FBQUEsSUFDVCxhQUFhO0FBQUEsSUFDYixZQUFZO0FBQUEsSUFDWixZQUFZO0FBQUEsSUFDWixhQUFhO0FBQUEsSUFDYixXQUFXO0FBQUEsRUFDYixDQUFDO0FBRUQsUUFBTSx5QkFBcUIsc0JBQU8sS0FBSztBQUV2QyxRQUFNLGtCQUFjO0FBQUEsSUFDbEIsQ0FBQyxTQUE2QjtBQUM1QixlQUFTO0FBQUEsUUFDUCxNQUFNO0FBQUEsUUFDTixPQUFPLE1BQU0sU0FBUztBQUFBLFFBQ3RCLFNBQVMsTUFBTSxXQUFXO0FBQUEsUUFDMUIsYUFBYSxNQUFNLGVBQWU7QUFBQSxRQUNsQyxZQUFZLE1BQU0sY0FBYztBQUFBLFFBQ2hDLFlBQVksTUFBTSxlQUFlO0FBQUEsUUFDakMsYUFBYSxNQUFNLGdCQUFnQjtBQUFBLFFBQ25DLFdBQVcsTUFBTSxhQUFhO0FBQUEsTUFDaEMsQ0FBQztBQUFBLElBQ0g7QUFBQSxJQUNBLENBQUMsbUJBQW1CLGtCQUFrQjtBQUFBLEVBQ3hDO0FBRUEsUUFBTSxtQkFBZSwyQkFBWSxNQUFNO0FBQ3JDLGFBQVMsQ0FBQyxVQUFVLEVBQUUsR0FBRyxNQUFNLE1BQU0sTUFBTSxFQUFFO0FBQUEsRUFDL0MsR0FBRyxDQUFDLENBQUM7QUFFTCxRQUFNLG9CQUFnQjtBQUFBLElBQ3BCLE9BQU8sRUFBRSxNQUFNLFNBQVMsb0JBQW9CLE1BQXlCO0FBQ25FLFVBQUksS0FBTTtBQUNWLFlBQU0sS0FBSyxNQUFNO0FBQ2pCLFVBQUksT0FBTyxPQUFPLFlBQVk7QUFDNUIscUJBQWE7QUFDYjtBQUFBLE1BQ0Y7QUFDQSxVQUFJLG1CQUFtQixRQUFTO0FBQ2hDLHlCQUFtQixVQUFVO0FBQzdCLFVBQUk7QUFDRixjQUFNLFNBQVMsTUFBTSxHQUFHO0FBQ3hCLFlBQUksV0FBVyxPQUFPO0FBQ3BCLHVCQUFhO0FBQUEsUUFDZjtBQUFBLE1BQ0YsU0FBUyxLQUFVO0FBQ2pCLGNBQU0sTUFDSixLQUFLLFdBQ0wsdUJBQ0EsS0FBSyxxQkFBcUIsbUNBQW1DO0FBQy9ELGdCQUFRLEdBQUc7QUFBQSxNQUNiLFVBQUU7QUFDQSwyQkFBbUIsVUFBVTtBQUFBLE1BQy9CO0FBQUEsSUFDRjtBQUFBLElBQ0EsQ0FBQyxjQUFjLE1BQU0sU0FBUztBQUFBLEVBQ2hDO0FBRUEsU0FBTztBQUFBLElBQ0w7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQ0Y7OztBQ2xHQSxJQUFBQyxnQkFBdUM7QUFjaEMsSUFBTSxzQkFBc0IsQ0FBQyxRQUF3QixZQUFzQjtBQUNoRixRQUFNLGVBQWUsU0FBUyxpQkFBaUI7QUFDL0MsUUFBTSxpQkFBaUIsU0FBUyxtQkFBbUI7QUFFbkQsUUFBTSxrQkFBYywyQkFBWSxNQUFNO0FBQ3BDLFdBQU8sUUFBUSxDQUFDLFVBQVU7QUFDeEIsWUFBTSxRQUFRLDRCQUE0QixNQUFNLE9BQU87QUFDdkQsVUFBSSxVQUFVLE1BQU07QUFDbEIsY0FBTSxXQUFXLEtBQUs7QUFBQSxNQUN4QjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0gsR0FBRyxDQUFDLE1BQU0sQ0FBQztBQUVYLCtCQUFVLE1BQU07QUFDZCxRQUFJLGNBQWM7QUFDaEIsa0JBQVk7QUFBQSxJQUNkO0FBRUEsUUFBSSxDQUFDLGVBQWdCLFFBQU87QUFFNUIsVUFBTSxhQUFhLE1BQU0sWUFBWTtBQUNyQyxXQUFPLGlCQUFpQixZQUFZLFVBQVU7QUFDOUMsV0FBTyxNQUFNLE9BQU8sb0JBQW9CLFlBQVksVUFBVTtBQUFBLEVBQ2hFLEdBQUcsQ0FBQyxjQUFjLGFBQWEsY0FBYyxDQUFDO0FBRTlDLFNBQU87QUFBQSxJQUNMO0FBQUEsRUFDRjtBQUNGOzs7QUMxQ0EsSUFBQUMsZ0JBQXlFO0FBc0xuRSxJQUFBQyxzQkFBQTtBQWhMTixJQUFNLFdBQVcsV0FBVyxnQkFBZ0IsQ0FBQztBQUM3QyxJQUFNQyxRQUFPLENBQUMsS0FBSyxhQUFjLFlBQVksT0FBTyxTQUFTLEdBQUcsTUFBTSxZQUFZLFNBQVMsR0FBRyxLQUFNLFlBQVk7QUFFaEgsSUFBTSxNQUFNLENBQUMsTUFBTSxPQUFPLENBQUMsRUFBRSxTQUFTLEdBQUcsR0FBRztBQUM1QyxJQUFNLFFBQVEsQ0FBQyxNQUFNLEdBQUcsRUFBRSxZQUFZLENBQUMsSUFBSSxJQUFJLEVBQUUsU0FBUyxJQUFJLENBQUMsQ0FBQyxJQUFJLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztBQUVwRixJQUFNLFdBQVcsQ0FBQyxNQUFNO0FBQ3RCLE1BQUksQ0FBQyxFQUFHLFFBQU87QUFDZixRQUFNLE1BQU0sT0FBTyxDQUFDLEVBQUUsS0FBSztBQUMzQixNQUFJLENBQUMsSUFBSyxRQUFPO0FBQ2pCLFFBQU0sUUFBUSxJQUFJLE1BQU0sR0FBRztBQUMzQixNQUFJLE1BQU0sV0FBVyxHQUFHO0FBQ3RCLFVBQU0sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLE1BQU0sSUFBSSxNQUFNO0FBQ2xDLFFBQUksQ0FBQyxPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sTUFBTSxDQUFDLEdBQUc7QUFDNUQsYUFBTyxJQUFJLEtBQUssR0FBRyxJQUFJLEdBQUcsQ0FBQztBQUFBLElBQzdCO0FBQUEsRUFDRjtBQUNBLFNBQU87QUFDVDtBQUVBLElBQU0sb0JBQW9CLENBQUMsV0FBVztBQUNwQyxRQUFNLFFBQVEsT0FBTyxVQUFVLEVBQUUsRUFBRSxLQUFLO0FBQ3hDLE1BQUksQ0FBQyxNQUFPLFFBQU87QUFDbkIsTUFBSSxZQUFZLEtBQUssS0FBSyxFQUFHLFFBQU87QUFDcEMsU0FBTztBQUNUO0FBRUEsSUFBTSxjQUFjLE1BQU07QUFDeEIsUUFBTSxXQUFXLFVBQVUsaUJBQWlCO0FBQzVDLE1BQUksWUFBWSxPQUFPLFFBQVEsRUFBRSxLQUFLLEVBQUcsUUFBTyxrQkFBa0IsUUFBUTtBQUMxRSxTQUFPO0FBQ1Q7QUFFQSxJQUFNLGlCQUFpQixDQUFDLFdBQVcsU0FBUyxLQUFLLE9BQU8sVUFBVSxFQUFFLENBQUM7QUFDckUsSUFBTSxnQkFBZ0I7QUFBQSxFQUNwQjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0Y7QUFDQSxJQUFNLHNCQUFzQjtBQUFBLEVBQzFCO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRjtBQUVBLElBQU0sZ0JBQWdCLENBQUMsTUFBTTtBQUMzQixNQUFJLENBQUMsRUFBRyxRQUFPQSxNQUFLLG1CQUFtQixVQUFVO0FBQ2pELFFBQU0sU0FBUyxZQUFZO0FBQzNCLE1BQUksZUFBZSxNQUFNLEdBQUc7QUFDMUIsVUFBTSxRQUFRLG9CQUFvQixFQUFFLFNBQVMsQ0FBQztBQUM5QyxXQUFPLEdBQUcsRUFBRSxRQUFRLENBQUMsSUFBSSxLQUFLLElBQUksRUFBRSxZQUFZLENBQUMsR0FBRyxZQUFZO0FBQUEsRUFDbEU7QUFDQSxTQUFPLEVBQ0osbUJBQW1CLFFBQVEsRUFBRSxLQUFLLFdBQVcsT0FBTyxTQUFTLE1BQU0sVUFBVSxDQUFDLEVBQzlFLFFBQVEsT0FBTyxFQUFFLEVBQ2pCLFlBQVk7QUFDakI7QUFFZSxTQUFSLGlCQUFrQyxFQUFFLE9BQU8sT0FBTyxVQUFVLFdBQVcsT0FBTyxXQUFXLE1BQU0sR0FBRztBQUN2RyxRQUFNLGlCQUFrQixTQUFTLE9BQU8sS0FBSyxFQUFFLEtBQUssSUFBSyxRQUFRQSxNQUFLLDRCQUE0QixNQUFNO0FBQ3hHLFFBQU0sbUJBQWUsdUJBQVEsTUFBTSxTQUFTLEtBQUssR0FBRyxDQUFDLEtBQUssQ0FBQztBQUMzRCxRQUFNLENBQUMsTUFBTSxPQUFPLFFBQUksd0JBQVMsS0FBSztBQUN0QyxRQUFNLENBQUMsY0FBYyxlQUFlLFFBQUk7QUFBQSxJQUN0QyxlQUFlLGFBQWEsU0FBUyxLQUFJLG9CQUFJLEtBQUssR0FBRSxTQUFTO0FBQUEsRUFDL0Q7QUFDQSxRQUFNLENBQUMsYUFBYSxjQUFjLFFBQUk7QUFBQSxJQUNwQyxlQUFlLGFBQWEsWUFBWSxLQUFJLG9CQUFJLEtBQUssR0FBRSxZQUFZO0FBQUEsRUFDckU7QUFFQSxRQUFNLG1CQUFlLHNCQUFPLElBQUk7QUFFaEMsK0JBQVUsTUFBTTtBQUNkLFFBQUksY0FBYztBQUNoQixzQkFBZ0IsYUFBYSxTQUFTLENBQUM7QUFDdkMscUJBQWUsYUFBYSxZQUFZLENBQUM7QUFBQSxJQUMzQztBQUFBLEVBQ0YsR0FBRyxDQUFDLGNBQWMsUUFBUSxDQUFDLENBQUM7QUFFNUIsK0JBQVUsTUFBTTtBQUNkLFVBQU0sYUFBYSxDQUFDLE9BQU87QUFDekIsVUFBSSxDQUFDLGFBQWEsUUFBUztBQUMzQixVQUFJLENBQUMsYUFBYSxRQUFRLFNBQVMsR0FBRyxNQUFNLEdBQUc7QUFDN0MsZ0JBQVEsS0FBSztBQUFBLE1BQ2Y7QUFBQSxJQUNGO0FBQ0EsYUFBUyxpQkFBaUIsYUFBYSxVQUFVO0FBQ2pELGFBQVMsaUJBQWlCLGNBQWMsWUFBWSxFQUFFLFNBQVMsS0FBSyxDQUFDO0FBQ3JFLFdBQU8sTUFBTTtBQUNYLGVBQVMsb0JBQW9CLGFBQWEsVUFBVTtBQUNwRCxlQUFTLG9CQUFvQixjQUFjLFVBQVU7QUFBQSxJQUN2RDtBQUFBLEVBQ0YsR0FBRyxDQUFDLENBQUM7QUFFTCxRQUFNLGVBQWUsWUFBWTtBQUVqQywrQkFBVSxNQUFNO0FBQ2QsUUFBSSxhQUFjLFNBQVEsS0FBSztBQUFBLEVBQ2pDLEdBQUcsQ0FBQyxZQUFZLENBQUM7QUFFakIsUUFBTSxXQUFXLElBQUksS0FBSyxhQUFhLGNBQWMsQ0FBQztBQUN0RCxRQUFNLGNBQWMsSUFBSSxLQUFLLGFBQWEsZUFBZSxHQUFHLENBQUMsRUFBRSxRQUFRO0FBQ3ZFLFFBQU0sVUFBVSxTQUFTLE9BQU8sSUFBSSxLQUFLO0FBRXpDLFFBQU0sY0FBYyxNQUFNO0FBQ3hCLFVBQU0sU0FBUyxZQUFZO0FBQzNCLFFBQUksT0FBTyxLQUFLLE1BQU0sR0FBRztBQUN2QixhQUFPLElBQUksS0FBSyxlQUFlLFFBQVEsRUFBRSxNQUFNLFdBQVcsT0FBTyxPQUFPLENBQUMsRUFBRSxPQUFPLFFBQVE7QUFBQSxJQUM1RjtBQUNBLFFBQUksZUFBZSxNQUFNLEdBQUc7QUFDMUIsYUFBTyxHQUFHLGNBQWMsWUFBWSxDQUFDLElBQUksV0FBVztBQUFBLElBQ3REO0FBQ0EsVUFBTSxNQUFNLFNBQVMsbUJBQW1CLFFBQVEsRUFBRSxPQUFPLE9BQU8sQ0FBQztBQUNqRSxVQUFNLFFBQVEsSUFBSSxNQUFNLEdBQUcsQ0FBQztBQUM1QixVQUFNLE9BQU8sSUFBSSxNQUFNLENBQUM7QUFDeEIsV0FBTyxHQUFHLE1BQU0sWUFBWSxDQUFDLEdBQUcsSUFBSSxJQUFJLFdBQVc7QUFBQSxFQUNyRCxHQUFHO0FBRUgsUUFBTSxVQUFVLENBQUMsR0FBRyxNQUNsQixLQUFLLEtBQUssRUFBRSxZQUFZLE1BQU0sRUFBRSxZQUFZLEtBQUssRUFBRSxTQUFTLE1BQU0sRUFBRSxTQUFTLEtBQUssRUFBRSxRQUFRLE1BQU0sRUFBRSxRQUFRO0FBRTlHLFFBQU0sbUJBQWU7QUFBQSxJQUNuQixDQUFDLFlBQVk7QUFDWCxVQUFJLFNBQVU7QUFDZCxZQUFNLE1BQU0sTUFBTSxPQUFPO0FBQ3pCLGlCQUFXLEdBQUc7QUFDZCxjQUFRLEtBQUs7QUFBQSxJQUNmO0FBQUEsSUFDQSxDQUFDLFVBQVUsUUFBUTtBQUFBLEVBQ3JCO0FBRUEsUUFBTSxVQUFVLENBQUMsUUFBUTtBQUN2QixRQUFJLFNBQVU7QUFDZCxRQUFJLElBQUksZUFBZTtBQUN2QixRQUFJLElBQUk7QUFDUixRQUFJLElBQUksSUFBSTtBQUNWLFVBQUk7QUFDSixXQUFLO0FBQUEsSUFDUCxXQUFXLElBQUksR0FBRztBQUNoQixVQUFJO0FBQ0osV0FBSztBQUFBLElBQ1A7QUFDQSxvQkFBZ0IsQ0FBQztBQUNqQixtQkFBZSxDQUFDO0FBQUEsRUFDbEI7QUFFQSxRQUFNLGFBQWEsZUFBZSxZQUFZO0FBQzlDLFFBQU0sYUFBYTtBQUNuQixRQUFNLGlCQUFpQixhQUFhLFdBQVcsb0NBQW9DLEVBQUUsR0FBRyxLQUFLO0FBQzdGLFFBQU0sY0FBYztBQUFBLElBQ2xCO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBLGVBQWUsdUJBQXVCO0FBQUEsSUFDdEMsZUFBZSx1QkFBdUI7QUFBQSxFQUN4QyxFQUFFLE9BQU8sT0FBTyxFQUFFLEtBQUssR0FBRztBQUUxQixTQUNFLDhDQUFDLFNBQUksV0FBVyxnQkFBZ0IsS0FBSyxjQUNuQztBQUFBLGlEQUFDLFdBQU0sV0FBVSw0QkFBMkIsT0FBTyxFQUFFLE9BQU8sV0FBVyxHQUFJLGlCQUFPLGNBQWMsR0FBRTtBQUFBLElBQ2xHLDhDQUFDLFNBQUksV0FBVSxZQUNiO0FBQUE7QUFBQSxRQUFDO0FBQUE7QUFBQSxVQUNDLE1BQUs7QUFBQSxVQUNMLFdBQVc7QUFBQSxVQUNYLFNBQVMsTUFBTTtBQUNiLGdCQUFJLGFBQWM7QUFDbEIsb0JBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUFBLFVBQ25CO0FBQUEsVUFDQSxXQUFXLENBQUMsTUFBTTtBQUNoQixnQkFBSSxhQUFjO0FBQ2xCLGdCQUFJLEVBQUUsUUFBUSxXQUFXLEVBQUUsUUFBUSxLQUFLO0FBQ3RDLGdCQUFFLGVBQWU7QUFDakIsc0JBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUFBLFlBQ25CO0FBQ0EsZ0JBQUksRUFBRSxRQUFRLFNBQVUsU0FBUSxLQUFLO0FBQUEsVUFDdkM7QUFBQSxVQUNBLGlCQUFlO0FBQUEsVUFDZixpQkFBZSxlQUFlLFNBQVM7QUFBQSxVQUV2Qyx1REFBQyxVQUFLLE9BQU8sRUFBRSxPQUFPLFlBQVksWUFBWSxJQUFJLEdBQUksd0JBQWMsWUFBWSxHQUFFO0FBQUE7QUFBQSxNQUNwRjtBQUFBLE1BQ0EsNkNBQUMsVUFBSyxXQUFVLHdGQUNiLGlCQUFPLDZDQUFDLGdCQUFhLFdBQVUsV0FBVSxJQUFLLDZDQUFDLGtCQUFlLFdBQVUsV0FBVSxHQUNyRjtBQUFBLE1BQ0MsUUFDQyw4Q0FBQyxTQUFJLFdBQVUsZUFBYyxNQUFLLFVBQVMsY0FBVyxRQUNwRDtBQUFBLHNEQUFDLFNBQUksV0FBVSxZQUNiO0FBQUEsdURBQUMsWUFBTyxNQUFLLFVBQVMsV0FBVSxXQUFVLGNBQVlBLE1BQUsscUJBQXFCLGdCQUFnQixHQUFHLFNBQVMsTUFBTSxRQUFRLEVBQUUsR0FDMUgsdURBQUMsU0FBSSxPQUFNLDhCQUE2QixXQUFVLFdBQVUsTUFBSyxRQUFPLFNBQVEsYUFBWSxRQUFPLGdCQUNqRyx1REFBQyxVQUFLLGVBQWMsU0FBUSxnQkFBZSxTQUFRLGFBQVksS0FBSSxHQUFFLG1CQUFrQixHQUN6RixHQUNGO0FBQUEsVUFDQSw2Q0FBQyxTQUFJLFdBQVUsYUFBYSxzQkFBVztBQUFBLFVBQ3ZDLDZDQUFDLFlBQU8sTUFBSyxVQUFTLFdBQVUsV0FBVSxjQUFZQSxNQUFLLHFCQUFxQixZQUFZLEdBQUcsU0FBUyxNQUFNLFFBQVEsQ0FBQyxHQUNySCx1REFBQyxTQUFJLE9BQU0sOEJBQTZCLFdBQVUsV0FBVSxNQUFLLFFBQU8sU0FBUSxhQUFZLFFBQU8sZ0JBQ2pHLHVEQUFDLFVBQUssZUFBYyxTQUFRLGdCQUFlLFNBQVEsYUFBWSxLQUFJLEdBQUUsZ0JBQWUsR0FDdEYsR0FDRjtBQUFBLFdBQ0Y7QUFBQSxRQUNBLDhDQUFDLFNBQUksV0FBVSxnQkFDYjtBQUFBLHVEQUFDLFVBQU0sVUFBQUEsTUFBSyxtQkFBbUIsSUFBSSxHQUFFO0FBQUEsVUFBTyw2Q0FBQyxVQUFNLFVBQUFBLE1BQUssbUJBQW1CLElBQUksR0FBRTtBQUFBLFVBQU8sNkNBQUMsVUFBTSxVQUFBQSxNQUFLLG1CQUFtQixJQUFJLEdBQUU7QUFBQSxVQUFPLDZDQUFDLFVBQU0sVUFBQUEsTUFBSyxtQkFBbUIsSUFBSSxHQUFFO0FBQUEsVUFBTyw2Q0FBQyxVQUFNLFVBQUFBLE1BQUssbUJBQW1CLElBQUksR0FBRTtBQUFBLFVBQU8sNkNBQUMsVUFBTSxVQUFBQSxNQUFLLG1CQUFtQixJQUFJLEdBQUU7QUFBQSxVQUFPLDZDQUFDLFVBQU0sVUFBQUEsTUFBSyxtQkFBbUIsSUFBSSxHQUFFO0FBQUEsV0FDL1M7QUFBQSxRQUNBLDhDQUFDLFNBQUksV0FBVSxZQUNaO0FBQUEsZ0JBQU0sS0FBSyxFQUFFLFFBQVEsT0FBTyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsTUFDdEMsNkNBQUMsWUFBc0IsV0FBVSxpQkFBZ0IsVUFBUSxNQUFDLE1BQUssWUFBbEQsS0FBSyxDQUFDLEVBQXFELENBQ3pFO0FBQUEsVUFDQSxNQUFNLEtBQUssRUFBRSxRQUFRLFlBQVksQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLFFBQVE7QUFDbkQsa0JBQU0sTUFBTSxNQUFNO0FBQ2xCLGtCQUFNLFVBQVUsSUFBSSxLQUFLLGFBQWEsY0FBYyxHQUFHO0FBQ3ZELGtCQUFNLGFBQWEsUUFBUSxTQUFTLFlBQVk7QUFDaEQsa0JBQU0sVUFBVSxRQUFRLFNBQVMsb0JBQUksS0FBSyxDQUFDO0FBQzNDLGtCQUFNLE1BQU07QUFBQSxjQUNWO0FBQUEsY0FDQSxhQUFhLHNCQUFzQjtBQUFBLGNBQ25DLFVBQVUsVUFBVTtBQUFBLFlBQ3RCLEVBQUUsS0FBSyxHQUFHO0FBQ1YsbUJBQ0U7QUFBQSxjQUFDO0FBQUE7QUFBQSxnQkFFQyxNQUFLO0FBQUEsZ0JBQ0wsV0FBVztBQUFBLGdCQUNYLFNBQVMsTUFBTSxhQUFhLE9BQU87QUFBQSxnQkFFbEM7QUFBQTtBQUFBLGNBTEksTUFBTSxPQUFPO0FBQUEsWUFNcEI7QUFBQSxVQUVKLENBQUM7QUFBQSxXQUNIO0FBQUEsUUFDQSw2Q0FBQyxTQUFJLFdBQVUsY0FBYyxVQUFBQSxNQUFLLHlCQUF5QixhQUFhLEdBQUU7QUFBQSxTQUM1RTtBQUFBLE9BRUo7QUFBQSxLQUNGO0FBRUo7OztBQ2pRQSxJQUFBQyxnQkFBNEQ7QUFnSTVCLElBQUFDLHNCQUFBO0FBdEdoQyxJQUFNLGlCQUFpQixDQUFDO0FBQUEsRUFDdEI7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQSxVQUFVO0FBQUEsRUFDVixXQUFXO0FBQUEsRUFDWCxXQUFXO0FBQUEsRUFDWCxZQUFZO0FBQUEsRUFDWixvQkFBb0I7QUFBQSxFQUNwQjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0YsTUFBMkI7QUFDekIsUUFBTSxlQUFlLFlBQVk7QUFDakMsUUFBTSxhQUFhLGVBQWUsWUFBWTtBQUM5QyxRQUFNLFdBQU8sdUJBQVEsTUFBTTtBQUN6QixZQUFRLFdBQVcsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNO0FBQ2hDLFVBQUksTUFBTSxRQUFRLENBQUMsR0FBRztBQUNwQixlQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsS0FBSyxJQUFJLE1BQU0sRUFBRSxDQUFDLEtBQUssR0FBRztBQUFBLE1BQy9DO0FBQ0EsYUFBTyxFQUFFLE9BQU8sR0FBRyxTQUFTLEdBQUcsU0FBUyxJQUFJLE1BQU0sR0FBRyxRQUFRLEdBQUcsUUFBUSxHQUFHO0FBQUEsSUFDN0UsQ0FBQztBQUFBLEVBQ0gsR0FBRyxDQUFDLE9BQU8sQ0FBQztBQUVaLFFBQU0sQ0FBQyxPQUFPLFFBQVEsUUFBSSx3QkFBUyxFQUFFO0FBQ3JDLFFBQU0sQ0FBQyxVQUFVLFdBQVcsUUFBSTtBQUFBLElBQzlCLEtBQUssS0FBSyxDQUFDLE1BQU0sT0FBTyxFQUFFLEtBQUssTUFBTSxPQUFPLEtBQUssQ0FBQyxLQUFLLEtBQUssQ0FBQyxLQUFLLEVBQUUsT0FBTyxJQUFJLE1BQU0sR0FBRztBQUFBLEVBQzFGO0FBQ0EsUUFBTSxDQUFDLE1BQU0sT0FBTyxRQUFJLHdCQUFTLEtBQUs7QUFDdEMsUUFBTSxDQUFDLGFBQWEsY0FBYyxRQUFJLHdCQUFTLENBQUM7QUFDaEQsUUFBTSxtQkFBZSxzQkFBOEIsSUFBSTtBQUN2RCxRQUFNLGFBQVMsc0JBQThCLElBQUk7QUFDakQsUUFBTSxjQUFVLHNCQUE4QixJQUFJO0FBRWxELGtCQUFnQixDQUFDLGNBQWMsT0FBTyxHQUFHLE1BQU0sUUFBUSxLQUFLLENBQUM7QUFFN0QsK0JBQVUsTUFBTTtBQUNkLGdCQUFZLEtBQUssS0FBSyxDQUFDLE1BQU0sT0FBTyxFQUFFLEtBQUssTUFBTSxPQUFPLEtBQUssQ0FBQyxLQUFLLEtBQUssQ0FBQyxLQUFLLEVBQUUsT0FBTyxJQUFJLE1BQU0sR0FBRyxDQUFDO0FBQUEsRUFDdkcsR0FBRyxDQUFDLE9BQU8sSUFBSSxDQUFDO0FBRWhCLCtCQUFVLE1BQU07QUFDZCxhQUFTLEVBQUU7QUFBQSxFQUNiLEdBQUcsQ0FBQyxRQUFRLENBQUM7QUFFYiwrQkFBVSxNQUFNO0FBQ2QsUUFBSSxDQUFDLGtCQUFtQjtBQUN4QixhQUFTLFVBQVUsUUFBUSxPQUFPLFNBQVMsS0FBSyxJQUFJLEVBQUU7QUFBQSxFQUN4RCxHQUFHLENBQUMsbUJBQW1CLFVBQVUsUUFBUSxDQUFDO0FBRTFDLFFBQU0sZUFBVyx1QkFBUSxNQUFNO0FBQzdCLFFBQUksQ0FBQyxNQUFNLEtBQUssRUFBRyxRQUFPO0FBQzFCLFVBQU0sSUFBSSxLQUFLLE9BQU8sQ0FBQyxNQUFNLEVBQUUsS0FBSyxZQUFZLEVBQUUsU0FBUyxNQUFNLFlBQVksQ0FBQyxDQUFDO0FBQy9FLFdBQU8sRUFBRSxTQUFTLElBQUk7QUFBQSxFQUN4QixHQUFHLENBQUMsTUFBTSxLQUFLLENBQUM7QUFFaEIsK0JBQVUsTUFBTTtBQUNkLG1CQUFlLENBQUM7QUFBQSxFQUNsQixHQUFHLENBQUMsU0FBUyxRQUFRLEtBQUssQ0FBQztBQUUzQixRQUFNLGVBQWUsQ0FBQyxRQUFrRDtBQUN0RSxnQkFBWSxHQUFHO0FBQ2YsYUFBUyxFQUFFO0FBQ1gsWUFBUSxLQUFLO0FBQ2IsUUFBSSxDQUFDLG1CQUFtQjtBQUN0QixlQUFTLEtBQUssUUFBUSxPQUFPLElBQUksS0FBSyxJQUFJLEVBQUU7QUFBQSxJQUM5QztBQUFBLEVBQ0Y7QUFFQSxRQUFNLGdCQUFnQixDQUFDLE9BQThDO0FBQ25FLFFBQUksU0FBVTtBQUNkLFFBQUksR0FBRyxRQUFRLGFBQWE7QUFDMUIsU0FBRyxlQUFlO0FBQ2xCLGNBQVEsSUFBSTtBQUNaLFVBQUksU0FBUyxPQUFRLGdCQUFlLENBQUMsU0FBUyxNQUFNLEtBQUssU0FBUyxNQUFNO0FBQ3hFO0FBQUEsSUFDRjtBQUNBLFFBQUksR0FBRyxRQUFRLFdBQVc7QUFDeEIsU0FBRyxlQUFlO0FBQ2xCLGNBQVEsSUFBSTtBQUNaLFVBQUksU0FBUyxPQUFRLGdCQUFlLENBQUMsU0FBUyxNQUFNLElBQUksU0FBUyxVQUFVLFNBQVMsTUFBTTtBQUMxRjtBQUFBLElBQ0Y7QUFDQSxRQUFJLEdBQUcsUUFBUSxTQUFTO0FBQ3RCLFNBQUcsZUFBZTtBQUNsQixVQUFJLFFBQVEsU0FBUyxRQUFRO0FBQzNCLHFCQUFhLFNBQVMsV0FBVyxLQUFLLFNBQVMsQ0FBQyxDQUFDO0FBQUEsTUFDbkQsT0FBTztBQUNMLGdCQUFRLElBQUk7QUFBQSxNQUNkO0FBQUEsSUFDRjtBQUNBLFFBQUksR0FBRyxRQUFRLFNBQVUsU0FBUSxLQUFLO0FBQUEsRUFDeEM7QUFFQSxRQUFNLFNBQVMsT0FBTyxVQUFVLFNBQVMsUUFBUTtBQUNqRCxRQUFNLFNBQVMsa0JBQWtCLE1BQU07QUFDdkMsUUFBTSxXQUFXLFFBQVEsU0FBUyxXQUFXLElBQUksY0FBYyxNQUFNLElBQUksU0FBUyxXQUFXLEVBQUUsS0FBSyxLQUFLO0FBQ3pHLFFBQU0sV0FBVyxRQUFRLENBQUM7QUFFMUIsUUFBTSxXQUNKLDhDQUFDLFNBQUksSUFBSSxRQUFRLEtBQUssU0FBUyxNQUFLLFdBQVUsY0FBWSxPQUN2RDtBQUFBLGFBQVMsV0FBVyxLQUFLLDZDQUFDLFNBQUksV0FBVSxvQ0FBb0MsZUFBSyxzQkFBc0IsWUFBWSxHQUFFO0FBQUEsSUFDckgsU0FBUyxJQUFJLENBQUMsS0FBSyxRQUFRO0FBQzFCLFlBQU0sTUFBTSxVQUFVLFVBQVUsSUFBSTtBQUNwQyxZQUFNLFdBQVcsUUFBUTtBQUN6QixhQUNFO0FBQUEsUUFBQztBQUFBO0FBQUEsVUFDQyxNQUFLO0FBQUEsVUFFTCxJQUFJLGNBQWMsTUFBTSxJQUFJLElBQUksS0FBSztBQUFBLFVBQ3JDLE1BQUs7QUFBQSxVQUNMLGlCQUFlO0FBQUEsVUFDZixXQUFXO0FBQUEsWUFDVDtBQUFBLFlBQ0EsV0FBVywwQkFBMEI7QUFBQSxVQUN2QztBQUFBLFVBQ0EsY0FBYyxNQUFNLGVBQWUsR0FBRztBQUFBLFVBQ3RDLFNBQVMsTUFBTSxhQUFhLEdBQUc7QUFBQSxVQUU5QjtBQUFBLG1CQUNDO0FBQUEsY0FBQztBQUFBO0FBQUEsZ0JBQ0MsV0FBVztBQUFBLGtCQUNUO0FBQUEsa0JBQ0EsV0FBVyxlQUFlO0FBQUEsZ0JBQzVCO0FBQUE7QUFBQSxZQUNEO0FBQUEsWUFFSCw2Q0FBQyxVQUFLLFdBQVcsV0FBVyxrQkFBa0IsTUFBTSxnQkFBZ0IsYUFBYSxHQUFJLGNBQUksTUFBSztBQUFBO0FBQUE7QUFBQSxRQW5CekYsT0FBTyxJQUFJLEtBQUs7QUFBQSxNQW9CdkI7QUFBQSxJQUVKLENBQUM7QUFBQSxLQUNIO0FBR0YsU0FDRTtBQUFBLElBQUM7QUFBQTtBQUFBLE1BQ0MsV0FBVyxXQUFXLGFBQWEsV0FBVyxvQ0FBb0MsRUFBRTtBQUFBLE1BQ3BGLEtBQUs7QUFBQSxNQUVMO0FBQUEscURBQUMsV0FBTSxXQUFXLFdBQVcsNEJBQTRCLFVBQVUsa0JBQWtCLEVBQUUsR0FBSSxpQkFBTTtBQUFBLFFBQ2pHLDhDQUFDLFNBQUksV0FBVSxZQUNiO0FBQUE7QUFBQSxZQUFDO0FBQUE7QUFBQSxjQUNDLEtBQUs7QUFBQSxjQUNMLFdBQVc7QUFBQSxnQkFDVDtBQUFBLGdCQUNBLGVBQWUsdUJBQXVCO0FBQUEsY0FDeEM7QUFBQSxjQUNBLE9BQU8sZUFBZSxFQUFFLE9BQU8sV0FBVyxJQUFJO0FBQUEsY0FFOUM7QUFBQTtBQUFBLGtCQUFDO0FBQUE7QUFBQSxvQkFDQyxXQUFXO0FBQUEsc0JBQ1Q7QUFBQSxzQkFDQSxVQUNJLHlFQUNBO0FBQUEsc0JBQ0osZUFBZSx1QkFBdUI7QUFBQSxvQkFDeEM7QUFBQSxvQkFDQSxPQUFPLGVBQWUsRUFBRSxPQUFPLFdBQVcsSUFBSTtBQUFBLG9CQUM5QyxPQUFPLFNBQVMsVUFBVSxRQUFRO0FBQUEsb0JBQ2xDO0FBQUEsb0JBQ0EsVUFBVSxDQUFDLFVBQVU7QUFDbkIsNEJBQU0sTUFBTSxNQUFNLE9BQU87QUFDekIsK0JBQVMsR0FBRztBQUNaLDhCQUFRLElBQUk7QUFBQSxvQkFDZDtBQUFBLG9CQUNBLFdBQVc7QUFBQSxvQkFDWCxTQUFTLE1BQU07QUFDYiwwQkFBSSxDQUFDLFNBQVUsU0FBUSxJQUFJO0FBQUEsb0JBQzdCO0FBQUEsb0JBQ0E7QUFBQSxvQkFDQSxNQUFLO0FBQUEsb0JBQ0wsaUJBQWU7QUFBQSxvQkFDZixpQkFBZTtBQUFBLG9CQUNmLHlCQUF1QjtBQUFBO0FBQUEsZ0JBQ3pCO0FBQUEsZ0JBQ0E7QUFBQSxrQkFBQztBQUFBO0FBQUEsb0JBQ0MsTUFBSztBQUFBLG9CQUNMLFdBQVU7QUFBQSxvQkFDVixTQUFTLE1BQU07QUFDYiwwQkFBSSxTQUFVO0FBQ2QsOEJBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSTtBQUFBLG9CQUN6QjtBQUFBLG9CQUNBLGNBQVksT0FBTyxLQUFLLHdCQUF3QixjQUFjLElBQUksS0FBSyx3QkFBd0IsY0FBYztBQUFBLG9CQUM3RztBQUFBLG9CQUVDLGlCQUFPLDZDQUFDLGdCQUFhLFdBQVUsV0FBVSxJQUFLLDZDQUFDLGtCQUFlLFdBQVUsV0FBVTtBQUFBO0FBQUEsZ0JBQ3JGO0FBQUE7QUFBQTtBQUFBLFVBQ0Y7QUFBQSxVQUNDLFlBQ0M7QUFBQSxZQUFDO0FBQUE7QUFBQSxjQUNDLFdBQVc7QUFBQSxjQUNYLE1BQU07QUFBQSxjQUNOLFFBQVE7QUFBQSxjQUNSLGdCQUFlO0FBQUEsY0FDZixNQUFLO0FBQUEsY0FDTCxjQUFhO0FBQUEsY0FDYjtBQUFBLGNBQ0E7QUFBQSxjQUVDO0FBQUE7QUFBQSxVQUNILElBRUEsWUFDRSw2Q0FBQyxTQUFJLFdBQVUsK0hBQ1osb0JBQ0g7QUFBQSxXQUdOO0FBQUE7QUFBQTtBQUFBLEVBQ0Y7QUFFSjtBQUVBLElBQU8seUJBQVE7OztBQ3pNVCxJQUFBQyxzQkFBQTtBQVhOLElBQU0sdUJBQXVCLENBQUM7QUFBQSxFQUM1QjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQSxzQkFBc0I7QUFBQSxFQUN0Qix1QkFBdUI7QUFBQSxFQUN2QjtBQUFBLEVBQ0E7QUFDRixNQUFhO0FBQ1gsU0FDRSw4Q0FBQyxTQUFJLFdBQVUsMEJBQ2I7QUFBQSxrREFBQyxTQUFJLFdBQVUsYUFDYjtBQUFBLG1EQUFDLFdBQU0sV0FBVSw0QkFBNEIsNEJBQWlCO0FBQUEsTUFDOUQ7QUFBQSxRQUFDO0FBQUE7QUFBQSxVQUNDLElBQUc7QUFBQSxVQUNILFdBQVc7QUFBQSxVQUNYLFdBQVc7QUFBQSxVQUNYLE9BQU87QUFBQSxVQUNQLFVBQVU7QUFBQSxVQUNWLFVBQVUsQ0FBQyxNQUFNLG9CQUFvQixFQUFFLE9BQU8sS0FBSztBQUFBO0FBQUEsTUFDckQ7QUFBQSxPQUNGO0FBQUEsSUFFQyxVQUFVLElBQUksQ0FBQyxVQUNkLDhDQUFDLFNBQW1CLFdBQVUsYUFDNUI7QUFBQSxtREFBQyxXQUFNLFdBQVUsNEJBQTRCLGdCQUFNLE9BQU07QUFBQSxNQUN6RDtBQUFBLFFBQUM7QUFBQTtBQUFBLFVBQ0MsSUFBSSxNQUFNO0FBQUEsVUFDVixXQUFXLE1BQU07QUFBQSxVQUNqQixPQUFPLE1BQU07QUFBQSxVQUNiLFVBQVE7QUFBQSxVQUNSLGVBQWUsTUFBTSxnQkFBZ0I7QUFBQSxVQUNyQyxlQUFlLE1BQU0sZ0JBQWdCO0FBQUEsVUFDckMsYUFBYSxNQUFNLGdCQUFnQjtBQUFBLFVBQ25DLGlCQUFpQixNQUFNLGdCQUFnQjtBQUFBO0FBQUEsTUFDekM7QUFBQSxTQVhRLE1BQU0sRUFZaEIsQ0FDRDtBQUFBLEtBQ0g7QUFFSjtBQUVBLElBQU8sK0JBQVE7OztBQ3RFUixJQUFNLE9BQU8sQ0FBQyxPQUFlLElBQUksUUFBUSxDQUFDLFlBQVksV0FBVyxTQUFTLEVBQUUsQ0FBQzsiLAogICJuYW1lcyI6IFsidmFsdWUiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSIsICJkZWZhdWx0VmFsdWUiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgIlJlYWN0IiwgImltcG9ydF9yZWFjdCIsICJSZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW5kVCIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9qc3hfcnVudGltZSJdCn0K
