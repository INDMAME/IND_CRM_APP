import {
  ChevronDownSvg,
  ChevronUpSvg,
  Spinner_default
} from "./chunk-YSYVIEZS.js";
import {
  indT
} from "./chunk-V2CDSLX2.js";
import {
  primeTextEditorValue,
  readAndClearTextEditorValue,
  setTextEditorReturnUrl
} from "./chunk-QO7GVWVB.js";
import {
  setSessionValueWithExpiry
} from "./chunk-7SKLSV7K.js";
import {
  require_jsx_runtime,
  require_react,
  require_react_dom
} from "./chunk-BWM3JLWG.js";
import {
  __toESM
} from "./chunk-45FWCHS2.js";

// Web/wwwroot/react/src/components/commons/ConfirmModal.tsx
var import_react_dom = __toESM(require_react_dom());
var import_jsx_runtime = __toESM(require_jsx_runtime());
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
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "fixed inset-0 z-600000 flex items-center justify-center bg-black/40 px-4", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "w-full max-w-sm rounded-2xl bg-white shadow-xl border border-slate-200 p-5 space-y-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-lg font-semibold text-slate-900", children: title }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-sm text-slate-700 whitespace-pre-line", children: message }),
      showInfo && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center gap-2 text-sm text-slate-600", children: [
        busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner_default, { size: "h-4 w-4" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: error && !busy ? "text-rose-700" : "", children: infoText })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex justify-end gap-2 pt-2", children: [
        showCancel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "button",
          {
            type: "button",
            className: "px-4 py-2 rounded-xl border border-slate-300 text-slate-700 hover:border-primary hover:text-primary transition",
            onClick: onCancel,
            disabled: busy,
            children: cancelText
          }
        ),
        showConfirm && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
var import_react = __toESM(require_react());
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var AppErrorBoundary = class extends import_react.default.Component {
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
      return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "p-4 rounded-xl border border-rose-200 bg-rose-50 text-rose-700", children: this.props.fallbackMessage });
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
var import_react2 = __toESM(require_react());
var DEFAULT_MOVE_PX = 14;
var DEFAULT_HOLD_MS = 160;
var useTapGuard = (onTap, onHoldStart, options) => {
  const movePx = options?.movePx ?? DEFAULT_MOVE_PX;
  const holdMs = options?.holdMs ?? DEFAULT_HOLD_MS;
  const stateRef = import_react2.default.useRef({
    active: false,
    pointerId: null,
    startX: 0,
    startY: 0,
    moved: false,
    held: false,
    target: null
  });
  const holdTimerRef = import_react2.default.useRef(null);
  const reset = import_react2.default.useCallback(() => {
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
  const onPointerDown = import_react2.default.useCallback(
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
  const onPointerMove = import_react2.default.useCallback(
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
  const onPointerUp = import_react2.default.useCallback(
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
var import_react3 = __toESM(require_react());
var useConfirmDialog = ({ defaultConfirmText, defaultCancelText }) => {
  const [modal, setModal] = (0, import_react3.useState)({
    open: false,
    title: "",
    message: "",
    confirmText: defaultConfirmText,
    cancelText: defaultCancelText,
    showCancel: true,
    showConfirm: true,
    onConfirm: null
  });
  const confirmInFlightRef = (0, import_react3.useRef)(false);
  const openConfirm = (0, import_react3.useCallback)(
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
  const closeConfirm = (0, import_react3.useCallback)(() => {
    setModal((prev) => ({ ...prev, open: false }));
  }, []);
  const handleConfirm = (0, import_react3.useCallback)(
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
var import_react4 = __toESM(require_react());
var useTextEditorFields = (fields, options) => {
  const applyOnMount = options?.applyOnMount !== false;
  const listenPageShow = options?.listenPageShow !== false;
  const applyValues = (0, import_react4.useCallback)(() => {
    fields.forEach((field) => {
      const value = readAndClearTextEditorValue(field.fieldId);
      if (value !== null) {
        field.applyValue(value);
      }
    });
  }, [fields]);
  (0, import_react4.useEffect)(() => {
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
var import_react5 = __toESM(require_react());
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
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
  const selectedDate = (0, import_react5.useMemo)(() => parseISO(value), [value]);
  const [open, setOpen] = (0, import_react5.useState)(false);
  const [currentMonth, setCurrentMonth] = (0, import_react5.useState)(
    selectedDate ? selectedDate.getMonth() : (/* @__PURE__ */ new Date()).getMonth()
  );
  const [currentYear, setCurrentYear] = (0, import_react5.useState)(
    selectedDate ? selectedDate.getFullYear() : (/* @__PURE__ */ new Date()).getFullYear()
  );
  const containerRef = (0, import_react5.useRef)(null);
  (0, import_react5.useEffect)(() => {
    if (selectedDate) {
      setCurrentMonth(selectedDate.getMonth());
      setCurrentYear(selectedDate.getFullYear());
    }
  }, [selectedDate?.getTime()]);
  (0, import_react5.useEffect)(() => {
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
  (0, import_react5.useEffect)(() => {
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
  const handleSelect = (0, import_react5.useCallback)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: containerClass, ref: containerRef, children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("label", { className: "form-label font-semibold", style: { color: labelColor }, children: String(effectiveLabel) }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "relative", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
          children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { style: { color: valueColor, fontWeight: 400 }, children: formatDisplay(selectedDate) })
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "absolute inset-y-0 right-0 flex items-center pr-2 text-slate-500 pointer-events-none", children: open ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ChevronUpSvg, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ChevronDownSvg, { className: "h-5 w-5" }) }),
      open && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "drp-popover", role: "dialog", "aria-modal": "true", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "drp-head", children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", className: "drp-nav", "aria-label": indT2("History_PrevMonth", "Previous month"), onClick: () => goMonth(-1), children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4", fill: "none", viewBox: "0 0 30 30", stroke: "currentColor", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M15 19l-7-7 7-7" }) }) }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "drp-month", children: monthLabel }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", className: "drp-nav", "aria-label": indT2("History_NextMonth", "Next month"), onClick: () => goMonth(1), children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4", fill: "none", viewBox: "0 0 30 30", stroke: "currentColor", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 5l7 7-7 7" }) }) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "drp-weekdays", children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: indT2("History_Day_Mon", "Mo") }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: indT2("History_Day_Tue", "Tu") }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: indT2("History_Day_Wed", "We") }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: indT2("History_Day_Thu", "Th") }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: indT2("History_Day_Fri", "Fr") }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: indT2("History_Day_Sat", "Sa") }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: indT2("History_Day_Sun", "Su") })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "drp-grid", children: [
          Array.from({ length: offset }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { className: "drp-day empty", disabled: true, type: "button" }, `e-${i}`)),
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
            return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "drp-status", children: indT2("DatePicker_SelectDate", "Select date") })
      ] })
    ] })
  ] });
}

// Web/wwwroot/react/src/components/visitas/VisitNarrativeFields.tsx
var import_jsx_runtime4 = __toESM(require_jsx_runtime());
var VisitNarrativeFields = ({
  descriptionLabel,
  descriptionValue,
  descriptionClassName,
  descriptionDisabled = false,
  descriptionMaxLength = 200,
  onDescriptionChange,
  tapFields
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "grid grid-cols-1 gap-3", children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "space-y-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("label", { className: "form-label font-semibold", children: descriptionLabel }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
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
    tapFields.map((field) => /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "space-y-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("label", { className: "form-label font-semibold", children: field.label }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
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

// Web/wwwroot/react/src/utils/textEditorNavigation.ts
var navigateToTextEditorField = ({
  fieldId,
  fieldLabel,
  fieldValue,
  allowEdit = true,
  readOnly,
  editModeKey,
  editModeReturnTtlMs,
  beforeNavigate
}) => {
  const safeId = String(fieldId || "").trim();
  const safeLabel = String(fieldLabel || "").trim();
  if (!safeId || !safeLabel) return false;
  primeTextEditorValue(safeId, String(fieldValue || ""));
  beforeNavigate?.();
  const returnUrl = `${window.location.pathname}${window.location.search || ""}`;
  setTextEditorReturnUrl(safeId, returnUrl);
  const safeEditModeKey = String(editModeKey || "").trim();
  if (safeEditModeKey && editModeReturnTtlMs && editModeReturnTtlMs > 0) {
    setSessionValueWithExpiry(`${safeEditModeKey}_return`, "1", editModeReturnTtlMs);
  }
  const queryParts = [
    `fieldId=${encodeURIComponent(safeId)}`,
    `fieldLabel=${encodeURIComponent(safeLabel)}`,
    `returnUrl=${encodeURIComponent(returnUrl)}`,
    `allowEdit=${allowEdit ? "1" : "0"}`
  ];
  if (typeof readOnly === "boolean") {
    queryParts.push(`readOnly=${readOnly ? "1" : "0"}`);
  }
  if (safeEditModeKey) {
    queryParts.push(`editModeKey=${encodeURIComponent(safeEditModeKey)}`);
  }
  const url = `/TextEditorReact/EditField?${queryParts.join("&")}`;
  window.__indBypassNavigationGuardOnce?.();
  window.location.href = url;
  return true;
};

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
  VisitNarrativeFields_default,
  navigateToTextEditorField
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9Db25maXJtTW9kYWwudHN4IiwgIi4uLy4uL3JlYWN0L3NyYy9jb21wb25lbnRzL2NvbW1vbnMvQXBwRXJyb3JCb3VuZGFyeS50c3giLCAiLi4vLi4vcmVhY3Qvc3JjL2hvb2tzL3VzZVZpc2l0YXMudHMiLCAiLi4vLi4vcmVhY3Qvc3JjL3V0aWxzL3ByZXZpZXdUb29sdGlwLnRzIiwgIi4uLy4uL3JlYWN0L3NyYy9ob29rcy91c2VUYXBHdWFyZC50cyIsICIuLi8uLi9yZWFjdC9zcmMvaG9va3MvdXNlQ29uZmlybURpYWxvZy50cyIsICIuLi8uLi9yZWFjdC9zcmMvaG9va3MvdXNlVGV4dEVkaXRvckZpZWxkcy50cyIsICIuLi8uLi9yZWFjdC9zcmMvY29tcG9uZW50cy9jb21tb25zL1NpbmdsZURhdGVQaWNrZXIudHN4IiwgIi4uLy4uL3JlYWN0L3NyYy9jb21wb25lbnRzL3Zpc2l0YXMvVmlzaXROYXJyYXRpdmVGaWVsZHMudHN4IiwgIi4uLy4uL3JlYWN0L3NyYy91dGlscy90ZXh0RWRpdG9yTmF2aWdhdGlvbi50cyIsICIuLi8uLi9yZWFjdC9zcmMvdXRpbHMvd2FpdC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgY3JlYXRlUG9ydGFsIH0gZnJvbSBcInJlYWN0LWRvbVwiO1xuaW1wb3J0IFNwaW5uZXIgZnJvbSBcIi4vU3Bpbm5lci50c3hcIjtcblxudHlwZSBDb25maXJtTW9kYWxQcm9wcyA9IHtcbiAgb3BlbjogYm9vbGVhbjtcbiAgdGl0bGU6IHN0cmluZztcbiAgbWVzc2FnZTogc3RyaW5nO1xuICBjb25maXJtVGV4dDogc3RyaW5nO1xuICBjYW5jZWxUZXh0OiBzdHJpbmc7XG4gIGxvYWRpbmdUZXh0OiBzdHJpbmc7XG4gIHNob3dDYW5jZWw/OiBib29sZWFuO1xuICBzaG93Q29uZmlybT86IGJvb2xlYW47XG4gIGJ1c3k/OiBib29sZWFuO1xuICBlcnJvcj86IHN0cmluZztcbiAgc3RhdHVzPzogc3RyaW5nO1xuICBvbkNvbmZpcm06ICgpID0+IHZvaWQ7XG4gIG9uQ2FuY2VsOiAoKSA9PiB2b2lkO1xufTtcblxuLy8gRHVtYiBjb25maXJtIG1vZGFsIHdpdGggb3B0aW9uYWwgc3Bpbm5lciBhbmQgc3RhdHVzIHRleHQuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDb25maXJtTW9kYWwoe1xuICBvcGVuLFxuICB0aXRsZSxcbiAgbWVzc2FnZSxcbiAgY29uZmlybVRleHQsXG4gIGNhbmNlbFRleHQsXG4gIGxvYWRpbmdUZXh0LFxuICBzaG93Q2FuY2VsID0gdHJ1ZSxcbiAgc2hvd0NvbmZpcm0gPSB0cnVlLFxuICBidXN5ID0gZmFsc2UsXG4gIGVycm9yID0gXCJcIixcbiAgc3RhdHVzID0gXCJcIixcbiAgb25Db25maXJtLFxuICBvbkNhbmNlbCxcbn06IENvbmZpcm1Nb2RhbFByb3BzKSB7XG4gIGlmICghb3BlbikgcmV0dXJuIG51bGw7XG5cbiAgY29uc3Qgc2hvd0luZm8gPSBidXN5IHx8ICEhZXJyb3I7XG4gIGNvbnN0IGluZm9UZXh0ID0gYnVzeSA/IChzdGF0dXMgfHwgbG9hZGluZ1RleHQpIDogZXJyb3I7XG5cbiAgcmV0dXJuIGNyZWF0ZVBvcnRhbChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImZpeGVkIGluc2V0LTAgei02MDAwMDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgYmctYmxhY2svNDAgcHgtNFwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgbWF4LXctc20gcm91bmRlZC0yeGwgYmctd2hpdGUgc2hhZG93LXhsIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHAtNSBzcGFjZS15LTRcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWxnIGZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS05MDBcIj57dGl0bGV9PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LXNsYXRlLTcwMCB3aGl0ZXNwYWNlLXByZS1saW5lXCI+e21lc3NhZ2V9PC9kaXY+XG4gICAgICAgIHtzaG93SW5mbyAmJiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0ZXh0LXNtIHRleHQtc2xhdGUtNjAwXCI+XG4gICAgICAgICAgICB7YnVzeSAmJiA8U3Bpbm5lciBzaXplPVwiaC00IHctNFwiIC8+fVxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtlcnJvciAmJiAhYnVzeSA/IFwidGV4dC1yb3NlLTcwMFwiIDogXCJcIn0+e2luZm9UZXh0fTwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktZW5kIGdhcC0yIHB0LTJcIj5cbiAgICAgICAgICB7c2hvd0NhbmNlbCAmJiAoXG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC00IHB5LTIgcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLXNsYXRlLTMwMCB0ZXh0LXNsYXRlLTcwMCBob3Zlcjpib3JkZXItcHJpbWFyeSBob3Zlcjp0ZXh0LXByaW1hcnkgdHJhbnNpdGlvblwiXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e29uQ2FuY2VsfVxuICAgICAgICAgICAgICBkaXNhYmxlZD17YnVzeX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge2NhbmNlbFRleHR9XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICApfVxuICAgICAgICAgIHtzaG93Q29uZmlybSAmJiAoXG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC00IHB5LTIgcm91bmRlZC14bCBiZy1wcmltYXJ5IHRleHQtd2hpdGUgaG92ZXI6YmctcHJpbWFyeS85MCB0cmFuc2l0aW9uXCJcbiAgICAgICAgICAgICAgb25DbGljaz17b25Db25maXJtfVxuICAgICAgICAgICAgICBkaXNhYmxlZD17YnVzeX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge2J1c3kgPyBsb2FkaW5nVGV4dCA6IGNvbmZpcm1UZXh0fVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj4sXG4gICAgZG9jdW1lbnQuYm9keVxuICApO1xufVxuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcblxudHlwZSBQcm9wcyA9IHtcbiAgZmFsbGJhY2tNZXNzYWdlOiBzdHJpbmc7XG4gIGNoaWxkcmVuOiBSZWFjdC5SZWFjdE5vZGU7XG59O1xuXG50eXBlIFN0YXRlID0ge1xuICBoYXNFcnJvcjogYm9vbGVhbjtcbn07XG5cbi8vIFNoYXJlZCBlcnJvciBib3VuZGFyeSBmb3IgUmVhY3QgaXNsYW5kcy5cbmNsYXNzIEFwcEVycm9yQm91bmRhcnkgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8UHJvcHMsIFN0YXRlPiB7XG4gIGNvbnN0cnVjdG9yKHByb3BzOiBQcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0geyBoYXNFcnJvcjogZmFsc2UgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXREZXJpdmVkU3RhdGVGcm9tRXJyb3IoKSB7XG4gICAgcmV0dXJuIHsgaGFzRXJyb3I6IHRydWUgfTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZENhdGNoKGVycm9yOiB1bmtub3duLCBpbmZvOiBSZWFjdC5FcnJvckluZm8pIHtcbiAgICBjb25zb2xlLmVycm9yKFwiW0FwcEVycm9yQm91bmRhcnldIHJlbmRlciBlcnJvclwiLCBlcnJvciwgaW5mbyk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgaWYgKHRoaXMuc3RhdGUuaGFzRXJyb3IpIHtcbiAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cInAtNCByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItcm9zZS0yMDAgYmctcm9zZS01MCB0ZXh0LXJvc2UtNzAwXCI+e3RoaXMucHJvcHMuZmFsbGJhY2tNZXNzYWdlfTwvZGl2PjtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucHJvcHMuY2hpbGRyZW47XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXBwRXJyb3JCb3VuZGFyeTtcbiIsICJ0eXBlIFZpc2l0T3B0aW9uID0ge1xuICB2YWx1ZT86IHN0cmluZyB8IG51bWJlcjtcbiAgdGV4dD86IHN0cmluZztcbiAgVmFsdWU/OiBzdHJpbmcgfCBudW1iZXI7XG4gIFRleHQ/OiBzdHJpbmc7XG59O1xuXG5leHBvcnQgY29uc3QgdXNlVmlzaXRhcyA9ICgpID0+IHtcbiAgY29uc3QgdmlzaXRUeXBlcyA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHdpbmRvdy5fX1ZJU0lUX1RZUEVTX18pIHx8IFtdO1xuICBjb25zdCBhc2lzdGVudGVUaXBvcyA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHdpbmRvdy5fX0FTSVNURU5URV9USVBPU19fKSB8fCBbXTtcblxuICByZXR1cm4ge1xuICAgIHZpc2l0VHlwZXM6IHZpc2l0VHlwZXMgYXMgVmlzaXRPcHRpb25bXSxcbiAgICBhc2lzdGVudGVUaXBvczogYXNpc3RlbnRlVGlwb3MgYXMgVmlzaXRPcHRpb25bXSxcbiAgfTtcbn07XG4iLCAiY29uc3QgUFJFVklFV19NQVhfSEVJR0hUX1JBVElPID0gMC44O1xuY29uc3QgUFJFVklFV19CQVNFX0ZPTlQgPSAxMztcbmNvbnN0IFBSRVZJRVdfTUlOX0ZPTlQgPSAxMTtcblxubGV0IHByZXZpZXdBbmNob3I6IEhUTUxFbGVtZW50IHwgbnVsbCA9IG51bGw7XG5sZXQgcHJldmlld0Nsb3NlQm91bmQgPSBmYWxzZTtcblxuZXhwb3J0IGNvbnN0IHNldFByZXZpZXdBbmNob3IgPSAoYW5jaG9yOiBIVE1MRWxlbWVudCB8IG51bGwpID0+IHtcbiAgcHJldmlld0FuY2hvciA9IGFuY2hvcjtcbn07XG5cbmNvbnN0IGVuc3VyZVByZXZpZXdUb29sdGlwID0gKCk6IEhUTUxFbGVtZW50ID0+IHtcbiAgbGV0IHRvb2x0aXBFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5kUHJldmlld1Rvb2x0aXBcIikgYXMgSFRNTEVsZW1lbnQgfCBudWxsO1xuICBpZiAodG9vbHRpcEVsKSByZXR1cm4gdG9vbHRpcEVsO1xuICB0b29sdGlwRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICB0b29sdGlwRWwuaWQgPSBcImluZFByZXZpZXdUb29sdGlwXCI7XG4gIHRvb2x0aXBFbC5jbGFzc05hbWUgPSBcImluZC1wcmV2aWV3LXRvb2x0aXBcIjtcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0b29sdGlwRWwpO1xuICByZXR1cm4gdG9vbHRpcEVsO1xufTtcblxuY29uc3QgZW5zdXJlUHJldmlld0F1dG9DbG9zZSA9ICgpID0+IHtcbiAgaWYgKHByZXZpZXdDbG9zZUJvdW5kKSByZXR1cm47XG4gIHByZXZpZXdDbG9zZUJvdW5kID0gdHJ1ZTtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICBcInBvaW50ZXJkb3duXCIsXG4gICAgKGV2ZW50KSA9PiB7XG4gICAgICBjb25zdCB0b29sdGlwRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImluZFByZXZpZXdUb29sdGlwXCIpO1xuICAgICAgaWYgKCF0b29sdGlwRWwgfHwgIXRvb2x0aXBFbC5jbGFzc0xpc3QuY29udGFpbnMoXCJ2aXNpYmxlXCIpKSByZXR1cm47XG4gICAgICBpZiAocHJldmlld0FuY2hvciAmJiBwcmV2aWV3QW5jaG9yLmNvbnRhaW5zKGV2ZW50LnRhcmdldCBhcyBOb2RlKSkgcmV0dXJuO1xuICAgICAgaGlkZVByZXZpZXdUb29sdGlwKCk7XG4gICAgfSxcbiAgICB0cnVlXG4gICk7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIChldmVudCkgPT4ge1xuICAgIGlmIChldmVudC5rZXkgPT09IFwiRXNjYXBlXCIpIGhpZGVQcmV2aWV3VG9vbHRpcCgpO1xuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBzaG93UHJldmlld1Rvb2x0aXAgPSAodGV4dDogc3RyaW5nLCBjbGllbnRZOiBudW1iZXIpOiBib29sZWFuID0+IHtcbiAgaWYgKCF0ZXh0KSByZXR1cm4gZmFsc2U7XG4gIGNvbnN0IHRvb2x0aXBFbCA9IGVuc3VyZVByZXZpZXdUb29sdGlwKCk7XG4gIHRvb2x0aXBFbC50ZXh0Q29udGVudCA9IHRleHQ7XG4gIHRvb2x0aXBFbC5jbGFzc0xpc3QuYWRkKFwidmlzaWJsZVwiKTtcbiAgcHJldmlld0FuY2hvciA9IG51bGw7XG4gIGVuc3VyZVByZXZpZXdBdXRvQ2xvc2UoKTtcblxuICBjb25zdCBjZW50ZXJYID0gTWF0aC5yb3VuZCh3aW5kb3cuaW5uZXJXaWR0aCAvIDIpO1xuICB0b29sdGlwRWwuc3R5bGUubGVmdCA9IGAke2NlbnRlclh9cHhgO1xuXG4gIGNvbnN0IG1hcmdpbiA9IDEyO1xuICB0b29sdGlwRWwuc3R5bGUubWF4SGVpZ2h0ID0gYCR7TWF0aC5yb3VuZCh3aW5kb3cuaW5uZXJIZWlnaHQgKiBQUkVWSUVXX01BWF9IRUlHSFRfUkFUSU8pfXB4YDtcbiAgdG9vbHRpcEVsLnN0eWxlLm92ZXJmbG93WSA9IFwiYXV0b1wiO1xuXG4gIGxldCBmb250U2l6ZSA9IFBSRVZJRVdfQkFTRV9GT05UO1xuICB0b29sdGlwRWwuc3R5bGUuZm9udFNpemUgPSBgJHtmb250U2l6ZX1weGA7XG4gIGxldCByZWN0ID0gdG9vbHRpcEVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICBjb25zdCBtYXhIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgKiBQUkVWSUVXX01BWF9IRUlHSFRfUkFUSU87XG4gIHdoaWxlIChyZWN0LmhlaWdodCA+IG1heEhlaWdodCAmJiBmb250U2l6ZSA+IFBSRVZJRVdfTUlOX0ZPTlQpIHtcbiAgICBmb250U2l6ZSAtPSAxO1xuICAgIHRvb2x0aXBFbC5zdHlsZS5mb250U2l6ZSA9IGAke2ZvbnRTaXplfXB4YDtcbiAgICByZWN0ID0gdG9vbHRpcEVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICB9XG5cbiAgY29uc3QgY2VudGVyWSA9IE1hdGgucm91bmQoKHdpbmRvdy5pbm5lckhlaWdodCAtIHJlY3QuaGVpZ2h0KSAvIDIpO1xuICBsZXQgdG9wID0gTnVtYmVyLmlzRmluaXRlKGNlbnRlclkpID8gY2VudGVyWSA6IG1hcmdpbjtcbiAgY29uc3QgbWluVG9wID0gbWFyZ2luO1xuICBjb25zdCBtYXhUb3AgPSBNYXRoLm1heChtYXJnaW4sIHdpbmRvdy5pbm5lckhlaWdodCAtIHJlY3QuaGVpZ2h0IC0gbWFyZ2luKTtcbiAgaWYgKHRvcCA8IG1pblRvcCkgdG9wID0gbWluVG9wO1xuICBpZiAodG9wID4gbWF4VG9wKSB0b3AgPSBtYXhUb3A7XG4gIHRvb2x0aXBFbC5zdHlsZS50b3AgPSBgJHtNYXRoLnJvdW5kKHRvcCl9cHhgO1xuICByZXR1cm4gdHJ1ZTtcbn07XG5cbmV4cG9ydCBjb25zdCBoaWRlUHJldmlld1Rvb2x0aXAgPSAoKSA9PiB7XG4gIGNvbnN0IHRvb2x0aXBFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5kUHJldmlld1Rvb2x0aXBcIik7XG4gIGlmICghdG9vbHRpcEVsKSByZXR1cm47XG4gIHRvb2x0aXBFbC5jbGFzc0xpc3QucmVtb3ZlKFwidmlzaWJsZVwiKTtcbiAgcHJldmlld0FuY2hvciA9IG51bGw7XG59O1xuXG5leHBvcnQgY29uc3QgaXNPdmVyZmxvd2luZyA9IChlbDogSFRNTEVsZW1lbnQgfCBudWxsKTogYm9vbGVhbiA9PiB7XG4gIGlmICghZWwpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIGVsLnNjcm9sbFdpZHRoID4gZWwuY2xpZW50V2lkdGggKyAxIHx8IGVsLnNjcm9sbEhlaWdodCA+IGVsLmNsaWVudEhlaWdodCArIDE7XG59O1xuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGhpZGVQcmV2aWV3VG9vbHRpcCB9IGZyb20gXCIuLi91dGlscy9wcmV2aWV3VG9vbHRpcC50c1wiO1xuXG50eXBlIFRhcEhhbmRsZXIgPSAoZXZlbnQ6IFJlYWN0LlBvaW50ZXJFdmVudCkgPT4gdm9pZDtcbnR5cGUgSG9sZEhhbmRsZXIgPSAodGFyZ2V0OiBIVE1MRWxlbWVudCwgY2xpZW50WTogbnVtYmVyKSA9PiBib29sZWFuIHwgdm9pZDtcblxudHlwZSBPcHRpb25zID0ge1xuICBtb3ZlUHg/OiBudW1iZXI7XG4gIGhvbGRNcz86IG51bWJlcjtcbn07XG5cbmNvbnN0IERFRkFVTFRfTU9WRV9QWCA9IDE0O1xuY29uc3QgREVGQVVMVF9IT0xEX01TID0gMTYwO1xuXG5leHBvcnQgY29uc3QgdXNlVGFwR3VhcmQgPSAob25UYXA6IFRhcEhhbmRsZXIsIG9uSG9sZFN0YXJ0PzogSG9sZEhhbmRsZXIsIG9wdGlvbnM/OiBPcHRpb25zKSA9PiB7XG4gIGNvbnN0IG1vdmVQeCA9IG9wdGlvbnM/Lm1vdmVQeCA/PyBERUZBVUxUX01PVkVfUFg7XG4gIGNvbnN0IGhvbGRNcyA9IG9wdGlvbnM/LmhvbGRNcyA/PyBERUZBVUxUX0hPTERfTVM7XG5cbiAgY29uc3Qgc3RhdGVSZWYgPSBSZWFjdC51c2VSZWYoe1xuICAgIGFjdGl2ZTogZmFsc2UsXG4gICAgcG9pbnRlcklkOiBudWxsIGFzIG51bWJlciB8IG51bGwsXG4gICAgc3RhcnRYOiAwLFxuICAgIHN0YXJ0WTogMCxcbiAgICBtb3ZlZDogZmFsc2UsXG4gICAgaGVsZDogZmFsc2UsXG4gICAgdGFyZ2V0OiBudWxsIGFzIEhUTUxFbGVtZW50IHwgbnVsbCxcbiAgfSk7XG4gIGNvbnN0IGhvbGRUaW1lclJlZiA9IFJlYWN0LnVzZVJlZjxudW1iZXIgfCBudWxsPihudWxsKTtcblxuICBjb25zdCByZXNldCA9IFJlYWN0LnVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoaG9sZFRpbWVyUmVmLmN1cnJlbnQpIHtcbiAgICAgIGNsZWFyVGltZW91dChob2xkVGltZXJSZWYuY3VycmVudCk7XG4gICAgICBob2xkVGltZXJSZWYuY3VycmVudCA9IG51bGw7XG4gICAgfVxuICAgIHN0YXRlUmVmLmN1cnJlbnQuYWN0aXZlID0gZmFsc2U7XG4gICAgc3RhdGVSZWYuY3VycmVudC5wb2ludGVySWQgPSBudWxsO1xuICAgIHN0YXRlUmVmLmN1cnJlbnQubW92ZWQgPSBmYWxzZTtcbiAgICBzdGF0ZVJlZi5jdXJyZW50LmhlbGQgPSBmYWxzZTtcbiAgICBzdGF0ZVJlZi5jdXJyZW50LnRhcmdldCA9IG51bGw7XG4gIH0sIFtdKTtcblxuICBjb25zdCBvblBvaW50ZXJEb3duID0gUmVhY3QudXNlQ2FsbGJhY2soXG4gICAgKGV2ZW50OiBSZWFjdC5Qb2ludGVyRXZlbnQpID0+IHtcbiAgICAgIGlmIChldmVudC5wb2ludGVyVHlwZSA9PT0gXCJtb3VzZVwiICYmIGV2ZW50LmJ1dHRvbiAhPT0gMCkgcmV0dXJuO1xuICAgICAgc3RhdGVSZWYuY3VycmVudC5hY3RpdmUgPSB0cnVlO1xuICAgICAgc3RhdGVSZWYuY3VycmVudC5wb2ludGVySWQgPSBldmVudC5wb2ludGVySWQ7XG4gICAgICBzdGF0ZVJlZi5jdXJyZW50LnN0YXJ0WCA9IGV2ZW50LmNsaWVudFg7XG4gICAgICBzdGF0ZVJlZi5jdXJyZW50LnN0YXJ0WSA9IGV2ZW50LmNsaWVudFk7XG4gICAgICBzdGF0ZVJlZi5jdXJyZW50Lm1vdmVkID0gZmFsc2U7XG4gICAgICBzdGF0ZVJlZi5jdXJyZW50LmhlbGQgPSBmYWxzZTtcbiAgICAgIHN0YXRlUmVmLmN1cnJlbnQudGFyZ2V0ID0gZXZlbnQuY3VycmVudFRhcmdldCBhcyBIVE1MRWxlbWVudDtcblxuICAgICAgaWYgKG9uSG9sZFN0YXJ0KSB7XG4gICAgICAgIGlmIChob2xkVGltZXJSZWYuY3VycmVudCkge1xuICAgICAgICAgIGNsZWFyVGltZW91dChob2xkVGltZXJSZWYuY3VycmVudCk7XG4gICAgICAgIH1cbiAgICAgICAgaG9sZFRpbWVyUmVmLmN1cnJlbnQgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgY29uc3Qgc3RhdGUgPSBzdGF0ZVJlZi5jdXJyZW50O1xuICAgICAgICAgIGlmICghc3RhdGUuYWN0aXZlIHx8IHN0YXRlLm1vdmVkIHx8ICFzdGF0ZS50YXJnZXQpIHJldHVybjtcbiAgICAgICAgICBjb25zdCBkaWRTaG93ID0gb25Ib2xkU3RhcnQoc3RhdGUudGFyZ2V0LCBzdGF0ZS5zdGFydFkpO1xuICAgICAgICAgIHN0YXRlLmhlbGQgPSBkaWRTaG93ID09PSB0cnVlO1xuICAgICAgICB9LCBob2xkTXMpO1xuICAgICAgfVxuICAgIH0sXG4gICAgW29uSG9sZFN0YXJ0LCBob2xkTXNdXG4gICk7XG5cbiAgY29uc3Qgb25Qb2ludGVyTW92ZSA9IFJlYWN0LnVzZUNhbGxiYWNrKFxuICAgIChldmVudDogUmVhY3QuUG9pbnRlckV2ZW50KSA9PiB7XG4gICAgICBjb25zdCBzdGF0ZSA9IHN0YXRlUmVmLmN1cnJlbnQ7XG4gICAgICBpZiAoIXN0YXRlLmFjdGl2ZSB8fCBzdGF0ZS5wb2ludGVySWQgIT09IGV2ZW50LnBvaW50ZXJJZCkgcmV0dXJuO1xuICAgICAgY29uc3QgZHggPSBNYXRoLmFicyhldmVudC5jbGllbnRYIC0gc3RhdGUuc3RhcnRYKTtcbiAgICAgIGNvbnN0IGR5ID0gTWF0aC5hYnMoZXZlbnQuY2xpZW50WSAtIHN0YXRlLnN0YXJ0WSk7XG4gICAgICBpZiAoZHggPiBtb3ZlUHggfHwgZHkgPiBtb3ZlUHgpIHtcbiAgICAgICAgc3RhdGUubW92ZWQgPSB0cnVlO1xuICAgICAgICBpZiAoaG9sZFRpbWVyUmVmLmN1cnJlbnQpIHtcbiAgICAgICAgICBjbGVhclRpbWVvdXQoaG9sZFRpbWVyUmVmLmN1cnJlbnQpO1xuICAgICAgICAgIGhvbGRUaW1lclJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3RhdGUuaGVsZCkgaGlkZVByZXZpZXdUb29sdGlwKCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBbbW92ZVB4XVxuICApO1xuXG4gIGNvbnN0IG9uUG9pbnRlclVwID0gUmVhY3QudXNlQ2FsbGJhY2soXG4gICAgKGV2ZW50OiBSZWFjdC5Qb2ludGVyRXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IHN0YXRlID0gc3RhdGVSZWYuY3VycmVudDtcbiAgICAgIGlmICghc3RhdGUuYWN0aXZlIHx8IHN0YXRlLnBvaW50ZXJJZCAhPT0gZXZlbnQucG9pbnRlcklkKSByZXR1cm47XG4gICAgICBjb25zdCBzaG91bGRUYXAgPSAhc3RhdGUubW92ZWQgJiYgIXN0YXRlLmhlbGQ7XG4gICAgICByZXNldCgpO1xuICAgICAgaWYgKHNob3VsZFRhcCkgb25UYXAoZXZlbnQpO1xuICAgIH0sXG4gICAgW29uVGFwLCByZXNldF1cbiAgKTtcblxuICByZXR1cm4ge1xuICAgIG9uUG9pbnRlckRvd24sXG4gICAgb25Qb2ludGVyTW92ZSxcbiAgICBvblBvaW50ZXJVcCxcbiAgICBvblBvaW50ZXJDYW5jZWw6IHJlc2V0LFxuICB9O1xufTtcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi91dGlscy9pbmRJMThuLnRzXCI7XG5cbnR5cGUgQ29uZmlybU1vZGFsU3RhdGUgPSB7XG4gIG9wZW46IGJvb2xlYW47XG4gIHRpdGxlOiBzdHJpbmc7XG4gIG1lc3NhZ2U6IHN0cmluZztcbiAgY29uZmlybVRleHQ6IHN0cmluZztcbiAgY2FuY2VsVGV4dDogc3RyaW5nO1xuICBzaG93Q2FuY2VsOiBib29sZWFuO1xuICBzaG93Q29uZmlybTogYm9vbGVhbjtcbiAgb25Db25maXJtOiAoKCkgPT4gUHJvbWlzZTxib29sZWFuIHwgdm9pZD4gfCBib29sZWFuIHwgdm9pZCkgfCBudWxsO1xufTtcblxudHlwZSBDb25maXJtT3Blbk9wdGlvbnMgPSBQYXJ0aWFsPE9taXQ8Q29uZmlybU1vZGFsU3RhdGUsIFwib3BlblwiIHwgXCJvbkNvbmZpcm1cIj4+ICYge1xuICBvbkNvbmZpcm0/OiAoKCkgPT4gUHJvbWlzZTxib29sZWFuIHwgdm9pZD4gfCBib29sZWFuIHwgdm9pZCkgfCBudWxsO1xufTtcblxudHlwZSBVc2VDb25maXJtRGlhbG9nQXJncyA9IHtcbiAgZGVmYXVsdENvbmZpcm1UZXh0OiBzdHJpbmc7XG4gIGRlZmF1bHRDYW5jZWxUZXh0OiBzdHJpbmc7XG59O1xuXG50eXBlIEhhbmRsZUNvbmZpcm1BcmdzID0ge1xuICBidXN5OiBib29sZWFuO1xuICBvbkVycm9yOiAobWVzc2FnZTogc3RyaW5nKSA9PiB2b2lkO1xuICBkZWZhdWx0RXJyb3JNZXNzYWdlPzogc3RyaW5nO1xufTtcblxuLy8gU2hhcmVkIGNvbmZpcm0gZGlhbG9nIHN0YXRlIGFuZCBjb25maXJtIGhhbmRsZXIuXG5leHBvcnQgY29uc3QgdXNlQ29uZmlybURpYWxvZyA9ICh7IGRlZmF1bHRDb25maXJtVGV4dCwgZGVmYXVsdENhbmNlbFRleHQgfTogVXNlQ29uZmlybURpYWxvZ0FyZ3MpID0+IHtcbiAgY29uc3QgW21vZGFsLCBzZXRNb2RhbF0gPSB1c2VTdGF0ZTxDb25maXJtTW9kYWxTdGF0ZT4oe1xuICAgIG9wZW46IGZhbHNlLFxuICAgIHRpdGxlOiBcIlwiLFxuICAgIG1lc3NhZ2U6IFwiXCIsXG4gICAgY29uZmlybVRleHQ6IGRlZmF1bHRDb25maXJtVGV4dCxcbiAgICBjYW5jZWxUZXh0OiBkZWZhdWx0Q2FuY2VsVGV4dCxcbiAgICBzaG93Q2FuY2VsOiB0cnVlLFxuICAgIHNob3dDb25maXJtOiB0cnVlLFxuICAgIG9uQ29uZmlybTogbnVsbCxcbiAgfSk7XG5cbiAgY29uc3QgY29uZmlybUluRmxpZ2h0UmVmID0gdXNlUmVmKGZhbHNlKTtcblxuICBjb25zdCBvcGVuQ29uZmlybSA9IHVzZUNhbGxiYWNrKFxuICAgIChvcHRzOiBDb25maXJtT3Blbk9wdGlvbnMpID0+IHtcbiAgICAgIHNldE1vZGFsKHtcbiAgICAgICAgb3BlbjogdHJ1ZSxcbiAgICAgICAgdGl0bGU6IG9wdHM/LnRpdGxlIHx8IFwiXCIsXG4gICAgICAgIG1lc3NhZ2U6IG9wdHM/Lm1lc3NhZ2UgfHwgXCJcIixcbiAgICAgICAgY29uZmlybVRleHQ6IG9wdHM/LmNvbmZpcm1UZXh0IHx8IGRlZmF1bHRDb25maXJtVGV4dCxcbiAgICAgICAgY2FuY2VsVGV4dDogb3B0cz8uY2FuY2VsVGV4dCB8fCBkZWZhdWx0Q2FuY2VsVGV4dCxcbiAgICAgICAgc2hvd0NhbmNlbDogb3B0cz8uc2hvd0NhbmNlbCAhPT0gZmFsc2UsXG4gICAgICAgIHNob3dDb25maXJtOiBvcHRzPy5zaG93Q29uZmlybSAhPT0gZmFsc2UsXG4gICAgICAgIG9uQ29uZmlybTogb3B0cz8ub25Db25maXJtIHx8IG51bGwsXG4gICAgICB9KTtcbiAgICB9LFxuICAgIFtkZWZhdWx0Q2FuY2VsVGV4dCwgZGVmYXVsdENvbmZpcm1UZXh0XVxuICApO1xuXG4gIGNvbnN0IGNsb3NlQ29uZmlybSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBzZXRNb2RhbCgocHJldikgPT4gKHsgLi4ucHJldiwgb3BlbjogZmFsc2UgfSkpO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgaGFuZGxlQ29uZmlybSA9IHVzZUNhbGxiYWNrKFxuICAgIGFzeW5jICh7IGJ1c3ksIG9uRXJyb3IsIGRlZmF1bHRFcnJvck1lc3NhZ2UgfTogSGFuZGxlQ29uZmlybUFyZ3MpID0+IHtcbiAgICAgIGlmIChidXN5KSByZXR1cm47XG4gICAgICBjb25zdCBjYiA9IG1vZGFsLm9uQ29uZmlybTtcbiAgICAgIGlmICh0eXBlb2YgY2IgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBjbG9zZUNvbmZpcm0oKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKGNvbmZpcm1JbkZsaWdodFJlZi5jdXJyZW50KSByZXR1cm47XG4gICAgICBjb25maXJtSW5GbGlnaHRSZWYuY3VycmVudCA9IHRydWU7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBjYigpO1xuICAgICAgICBpZiAocmVzdWx0ICE9PSBmYWxzZSkge1xuICAgICAgICAgIGNsb3NlQ29uZmlybSgpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnI6IGFueSkge1xuICAgICAgICBjb25zdCBtc2cgPVxuICAgICAgICAgIGVycj8ubWVzc2FnZSB8fFxuICAgICAgICAgIGRlZmF1bHRFcnJvck1lc3NhZ2UgfHxcbiAgICAgICAgICBpbmRUKFwiQXBpX1JlcXVlc3RGYWlsZWRcIiwgXCJSZXF1ZXN0IGZhaWxlZC4gUGxlYXNlIHRyeSBhZ2Fpbi5cIik7XG4gICAgICAgIG9uRXJyb3IobXNnKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGNvbmZpcm1JbkZsaWdodFJlZi5jdXJyZW50ID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSxcbiAgICBbY2xvc2VDb25maXJtLCBtb2RhbC5vbkNvbmZpcm1dXG4gICk7XG5cbiAgcmV0dXJuIHtcbiAgICBtb2RhbCxcbiAgICBvcGVuQ29uZmlybSxcbiAgICBjbG9zZUNvbmZpcm0sXG4gICAgaGFuZGxlQ29uZmlybSxcbiAgfTtcbn07XHJcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyByZWFkQW5kQ2xlYXJUZXh0RWRpdG9yVmFsdWUgfSBmcm9tIFwiLi4vdXRpbHMvdGV4dEVkaXRvci50c1wiO1xuXG50eXBlIEZpZWxkQmluZGluZyA9IHtcbiAgZmllbGRJZDogc3RyaW5nO1xuICBhcHBseVZhbHVlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbn07XG5cbnR5cGUgT3B0aW9ucyA9IHtcbiAgYXBwbHlPbk1vdW50PzogYm9vbGVhbjtcbiAgbGlzdGVuUGFnZVNob3c/OiBib29sZWFuO1xufTtcblxuLy8gU3luY2hyb25pemVzIGZpZWxkIHZhbHVlcyB0aGF0IHJldHVybiBmcm9tIHRoZSBmdWxsLXNjcmVlbiB0ZXh0IGVkaXRvci5cbmV4cG9ydCBjb25zdCB1c2VUZXh0RWRpdG9yRmllbGRzID0gKGZpZWxkczogRmllbGRCaW5kaW5nW10sIG9wdGlvbnM/OiBPcHRpb25zKSA9PiB7XG4gIGNvbnN0IGFwcGx5T25Nb3VudCA9IG9wdGlvbnM/LmFwcGx5T25Nb3VudCAhPT0gZmFsc2U7XG4gIGNvbnN0IGxpc3RlblBhZ2VTaG93ID0gb3B0aW9ucz8ubGlzdGVuUGFnZVNob3cgIT09IGZhbHNlO1xuXG4gIGNvbnN0IGFwcGx5VmFsdWVzID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGZpZWxkcy5mb3JFYWNoKChmaWVsZCkgPT4ge1xuICAgICAgY29uc3QgdmFsdWUgPSByZWFkQW5kQ2xlYXJUZXh0RWRpdG9yVmFsdWUoZmllbGQuZmllbGRJZCk7XG4gICAgICBpZiAodmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgZmllbGQuYXBwbHlWYWx1ZSh2YWx1ZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0sIFtmaWVsZHNdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChhcHBseU9uTW91bnQpIHtcbiAgICAgIGFwcGx5VmFsdWVzKCk7XG4gICAgfVxuXG4gICAgaWYgKCFsaXN0ZW5QYWdlU2hvdykgcmV0dXJuIHVuZGVmaW5lZDtcblxuICAgIGNvbnN0IG9uUGFnZVNob3cgPSAoKSA9PiBhcHBseVZhbHVlcygpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicGFnZXNob3dcIiwgb25QYWdlU2hvdyk7XG4gICAgcmV0dXJuICgpID0+IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicGFnZXNob3dcIiwgb25QYWdlU2hvdyk7XG4gIH0sIFthcHBseU9uTW91bnQsIGFwcGx5VmFsdWVzLCBsaXN0ZW5QYWdlU2hvd10pO1xuXG4gIHJldHVybiB7XG4gICAgYXBwbHlWYWx1ZXMsXG4gIH07XG59O1xuIiwgImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBDaGV2cm9uRG93blN2ZywgQ2hldnJvblVwU3ZnIH0gZnJvbSBcIi4vY2hldnJvbnMudHN4XCI7XG5cclxuLy8gU2luZ2xlIGRhdGUgcGlja2VyIG1hdGNoaW5nIHRoZSBIaXN0b3JpYWwgRFJQIHZpc3VhbCBzdHlsZS5cclxuLy8gUmV0dXJucyBhbiBJU08gc3RyaW5nICh5eXl5LU1NLWRkKSB2aWEgb25DaGFuZ2UuXHJcblxyXG5jb25zdCBJTkRfSTE4TiA9IGdsb2JhbFRoaXMuX19JTkRfSTE4Tl9fIHx8IHt9O1xyXG5jb25zdCBpbmRUID0gKGtleSwgZmFsbGJhY2spID0+IChJTkRfSTE4TiAmJiB0eXBlb2YgSU5EX0kxOE5ba2V5XSA9PT0gXCJzdHJpbmdcIiAmJiBJTkRfSTE4TltrZXldKSB8fCBmYWxsYmFjayB8fCBrZXk7XHJcblxyXG5jb25zdCBwYWQgPSAobikgPT4gU3RyaW5nKG4pLnBhZFN0YXJ0KDIsIFwiMFwiKTtcclxuY29uc3QgdG9JU08gPSAoZCkgPT4gYCR7ZC5nZXRGdWxsWWVhcigpfS0ke3BhZChkLmdldE1vbnRoKCkgKyAxKX0tJHtwYWQoZC5nZXREYXRlKCkpfWA7XHJcblxyXG5jb25zdCBwYXJzZUlTTyA9IChzKSA9PiB7XHJcbiAgaWYgKCFzKSByZXR1cm4gbnVsbDtcclxuICBjb25zdCByYXcgPSBTdHJpbmcocykudHJpbSgpO1xyXG4gIGlmICghcmF3KSByZXR1cm4gbnVsbDtcclxuICBjb25zdCBwYXJ0cyA9IHJhdy5zcGxpdChcIi1cIik7XHJcbiAgaWYgKHBhcnRzLmxlbmd0aCA9PT0gMykge1xyXG4gICAgY29uc3QgW3ksIG0sIGRdID0gcGFydHMubWFwKE51bWJlcik7XHJcbiAgICBpZiAoIU51bWJlci5pc05hTih5KSAmJiAhTnVtYmVyLmlzTmFOKG0pICYmICFOdW1iZXIuaXNOYU4oZCkpIHtcclxuICAgICAgcmV0dXJuIG5ldyBEYXRlKHksIG0gLSAxLCBkKTtcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIG51bGw7XHJcbn07XHJcblxyXG5jb25zdCBub3JtYWxpemVVaUxvY2FsZSA9IChsb2NhbGUpID0+IHtcclxuICBjb25zdCB2YWx1ZSA9IFN0cmluZyhsb2NhbGUgfHwgXCJcIikudHJpbSgpO1xyXG4gIGlmICghdmFsdWUpIHJldHVybiBcImVzLUVTXCI7XHJcbiAgaWYgKC9eemgtaGFucy9pLnRlc3QodmFsdWUpKSByZXR1cm4gXCJ6aC1DTlwiO1xyXG4gIHJldHVybiB2YWx1ZTtcclxufTtcclxuXHJcbmNvbnN0IGdldFVpTG9jYWxlID0gKCkgPT4ge1xyXG4gIGNvbnN0IGZyb21IdG1sID0gZG9jdW1lbnQ/LmRvY3VtZW50RWxlbWVudD8ubGFuZztcclxuICBpZiAoZnJvbUh0bWwgJiYgU3RyaW5nKGZyb21IdG1sKS50cmltKCkpIHJldHVybiBub3JtYWxpemVVaUxvY2FsZShmcm9tSHRtbCk7XHJcbiAgcmV0dXJuIFwiZXMtRVNcIjtcclxufTtcclxuXHJcbmNvbnN0IGlzQmFzcXVlTG9jYWxlID0gKGxvY2FsZSkgPT4gL15ldVxcYi9pLnRlc3QoU3RyaW5nKGxvY2FsZSB8fCBcIlwiKSk7XHJcbmNvbnN0IEJBU1FVRV9NT05USFMgPSBbXHJcbiAgXCJ1cnRhcnJpbGFcIixcclxuICBcIm90c2FpbGFcIixcclxuICBcIm1hcnR4b2FcIixcclxuICBcImFwaXJpbGFcIixcclxuICBcIm1haWF0emFcIixcclxuICBcImVrYWluYVwiLFxyXG4gIFwidXp0YWlsYVwiLFxyXG4gIFwiYWJ1enR1YVwiLFxyXG4gIFwiaXJhaWxhXCIsXHJcbiAgXCJ1cnJpYVwiLFxyXG4gIFwiYXphcm9hXCIsXHJcbiAgXCJhYmVuZHVhXCJcclxuXTtcclxuY29uc3QgQkFTUVVFX01PTlRIU19TSE9SVCA9IFtcclxuICBcInVydFwiLFxyXG4gIFwib3RzXCIsXHJcbiAgXCJtYXJcIixcclxuICBcImFwaVwiLFxyXG4gIFwibWFpXCIsXHJcbiAgXCJla2FcIixcclxuICBcInV6dFwiLFxyXG4gIFwiYWJ1XCIsXHJcbiAgXCJpcmFcIixcclxuICBcInVyclwiLFxyXG4gIFwiYXphXCIsXHJcbiAgXCJhYmVcIlxyXG5dO1xyXG5cclxuY29uc3QgZm9ybWF0RGlzcGxheSA9IChkKSA9PiB7XHJcbiAgaWYgKCFkKSByZXR1cm4gaW5kVChcIkhpc3RvcnlfQWRkRGF0ZVwiLCBcIkFkZCBkYXRlXCIpO1xyXG4gIGNvbnN0IGxvY2FsZSA9IGdldFVpTG9jYWxlKCk7XHJcbiAgaWYgKGlzQmFzcXVlTG9jYWxlKGxvY2FsZSkpIHtcclxuICAgIGNvbnN0IG1vbnRoID0gQkFTUVVFX01PTlRIU19TSE9SVFtkLmdldE1vbnRoKCldO1xyXG4gICAgcmV0dXJuIGAke2QuZ2V0RGF0ZSgpfSAke21vbnRofSAke2QuZ2V0RnVsbFllYXIoKX1gLnRvTG93ZXJDYXNlKCk7XHJcbiAgfVxyXG4gIHJldHVybiBkXHJcbiAgICAudG9Mb2NhbGVEYXRlU3RyaW5nKGxvY2FsZSwgeyBkYXk6IFwibnVtZXJpY1wiLCBtb250aDogXCJzaG9ydFwiLCB5ZWFyOiBcIm51bWVyaWNcIiB9KVxyXG4gICAgLnJlcGxhY2UoL1xcLi9nLCBcIlwiKVxyXG4gICAgLnRvTG93ZXJDYXNlKCk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBTaW5nbGVEYXRlUGlja2VyKHsgbGFiZWwsIHZhbHVlLCBvbkNoYW5nZSwgZGlzYWJsZWQgPSBmYWxzZSwgcmVhZE9ubHkgPSBmYWxzZSB9KSB7XG4gIGNvbnN0IGVmZmVjdGl2ZUxhYmVsID0gKGxhYmVsICYmIFN0cmluZyhsYWJlbCkudHJpbSgpKSA/IGxhYmVsIDogaW5kVChcIlZpc2l0c19EZXRhaWxfRGF0ZV9MYWJlbFwiLCBcIkRhdGVcIik7XG4gIGNvbnN0IHNlbGVjdGVkRGF0ZSA9IHVzZU1lbW8oKCkgPT4gcGFyc2VJU08odmFsdWUpLCBbdmFsdWVdKTtcbiAgY29uc3QgW29wZW4sIHNldE9wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbY3VycmVudE1vbnRoLCBzZXRDdXJyZW50TW9udGhdID0gdXNlU3RhdGUoXHJcbiAgICBzZWxlY3RlZERhdGUgPyBzZWxlY3RlZERhdGUuZ2V0TW9udGgoKSA6IG5ldyBEYXRlKCkuZ2V0TW9udGgoKVxyXG4gICk7XHJcbiAgY29uc3QgW2N1cnJlbnRZZWFyLCBzZXRDdXJyZW50WWVhcl0gPSB1c2VTdGF0ZShcclxuICAgIHNlbGVjdGVkRGF0ZSA/IHNlbGVjdGVkRGF0ZS5nZXRGdWxsWWVhcigpIDogbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgY29udGFpbmVyUmVmID0gdXNlUmVmKG51bGwpO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKHNlbGVjdGVkRGF0ZSkge1xyXG4gICAgICBzZXRDdXJyZW50TW9udGgoc2VsZWN0ZWREYXRlLmdldE1vbnRoKCkpO1xyXG4gICAgICBzZXRDdXJyZW50WWVhcihzZWxlY3RlZERhdGUuZ2V0RnVsbFllYXIoKSk7XHJcbiAgICB9XHJcbiAgfSwgW3NlbGVjdGVkRGF0ZT8uZ2V0VGltZSgpXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBvbkRvY0NsaWNrID0gKGV2KSA9PiB7XG4gICAgICBpZiAoIWNvbnRhaW5lclJlZi5jdXJyZW50KSByZXR1cm47XG4gICAgICBpZiAoIWNvbnRhaW5lclJlZi5jdXJyZW50LmNvbnRhaW5zKGV2LnRhcmdldCkpIHtcbiAgICAgICAgc2V0T3BlbihmYWxzZSk7XG4gICAgICB9XG4gICAgfTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIG9uRG9jQ2xpY2spO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIG9uRG9jQ2xpY2ssIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBvbkRvY0NsaWNrKTtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIG9uRG9jQ2xpY2spO1xuICAgIH07XG4gIH0sIFtdKTtcblxyXG4gIGNvbnN0IHJlYWRPbmx5TW9kZSA9IHJlYWRPbmx5IHx8IGRpc2FibGVkO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKHJlYWRPbmx5TW9kZSkgc2V0T3BlbihmYWxzZSk7XG4gIH0sIFtyZWFkT25seU1vZGVdKTtcblxuICBjb25zdCBmaXJzdERheSA9IG5ldyBEYXRlKGN1cnJlbnRZZWFyLCBjdXJyZW50TW9udGgsIDEpO1xuICBjb25zdCBkYXlzSW5Nb250aCA9IG5ldyBEYXRlKGN1cnJlbnRZZWFyLCBjdXJyZW50TW9udGggKyAxLCAwKS5nZXREYXRlKCk7XHJcbiAgY29uc3Qgb2Zmc2V0ID0gKGZpcnN0RGF5LmdldERheSgpICsgNikgJSA3OyAvLyBNb25kYXkgYXMgMFxyXG5cclxuICBjb25zdCBtb250aExhYmVsID0gKCgpID0+IHtcclxuICAgIGNvbnN0IGxvY2FsZSA9IGdldFVpTG9jYWxlKCk7XHJcbiAgICBpZiAoL156aC9pLnRlc3QobG9jYWxlKSkge1xyXG4gICAgICByZXR1cm4gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQobG9jYWxlLCB7IHllYXI6IFwibnVtZXJpY1wiLCBtb250aDogXCJsb25nXCIgfSkuZm9ybWF0KGZpcnN0RGF5KTtcclxuICAgIH1cclxuICAgIGlmIChpc0Jhc3F1ZUxvY2FsZShsb2NhbGUpKSB7XHJcbiAgICAgIHJldHVybiBgJHtCQVNRVUVfTU9OVEhTW2N1cnJlbnRNb250aF19ICR7Y3VycmVudFllYXJ9YDtcclxuICAgIH1cclxuICAgIGNvbnN0IHJhdyA9IGZpcnN0RGF5LnRvTG9jYWxlRGF0ZVN0cmluZyhsb2NhbGUsIHsgbW9udGg6IFwibG9uZ1wiIH0pO1xyXG4gICAgY29uc3QgZmlyc3QgPSByYXcuc2xpY2UoMCwgMSk7XHJcbiAgICBjb25zdCByZXN0ID0gcmF3LnNsaWNlKDEpO1xyXG4gICAgcmV0dXJuIGAke2ZpcnN0LnRvVXBwZXJDYXNlKCl9JHtyZXN0fSAke2N1cnJlbnRZZWFyfWA7XHJcbiAgfSkoKTtcclxuXHJcbiAgY29uc3Qgc2FtZURheSA9IChhLCBiKSA9PlxyXG4gICAgYSAmJiBiICYmIGEuZ2V0RnVsbFllYXIoKSA9PT0gYi5nZXRGdWxsWWVhcigpICYmIGEuZ2V0TW9udGgoKSA9PT0gYi5nZXRNb250aCgpICYmIGEuZ2V0RGF0ZSgpID09PSBiLmdldERhdGUoKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlU2VsZWN0ID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoZGF0ZU9iaikgPT4ge1xyXG4gICAgICBpZiAoZGlzYWJsZWQpIHJldHVybjtcclxuICAgICAgY29uc3QgaXNvID0gdG9JU08oZGF0ZU9iaik7XHJcbiAgICAgIG9uQ2hhbmdlPy4oaXNvKTtcclxuICAgICAgc2V0T3BlbihmYWxzZSk7XHJcbiAgICB9LFxyXG4gICAgW2Rpc2FibGVkLCBvbkNoYW5nZV1cclxuICApO1xyXG5cclxuICBjb25zdCBnb01vbnRoID0gKGluYykgPT4ge1xyXG4gICAgaWYgKGRpc2FibGVkKSByZXR1cm47XHJcbiAgICBsZXQgbSA9IGN1cnJlbnRNb250aCArIGluYztcclxuICAgIGxldCB5ID0gY3VycmVudFllYXI7XHJcbiAgICBpZiAobSA+IDExKSB7XHJcbiAgICAgIG0gPSAwO1xyXG4gICAgICB5ICs9IDE7XHJcbiAgICB9IGVsc2UgaWYgKG0gPCAwKSB7XHJcbiAgICAgIG0gPSAxMTtcclxuICAgICAgeSAtPSAxO1xyXG4gICAgfVxyXG4gICAgc2V0Q3VycmVudE1vbnRoKG0pO1xyXG4gICAgc2V0Q3VycmVudFllYXIoeSk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgdmFsdWVDb2xvciA9IHJlYWRPbmx5TW9kZSA/IFwiIzY0NzQ4YlwiIDogXCIjMDAyOTZiZTBcIjtcbiAgY29uc3QgbGFiZWxDb2xvciA9IFwiIzAwMjk2YmUwXCI7XG4gIGNvbnN0IGNvbnRhaW5lckNsYXNzID0gYHNwYWNlLXktMiAke2Rpc2FibGVkID8gXCJwb2ludGVyLWV2ZW50cy1ub25lIHNlbGVjdC1ub25lXCIgOiBcIlwifWAudHJpbSgpO1xuICBjb25zdCBidXR0b25DbGFzcyA9IFtcbiAgICBcImZvcm0tY29udHJvbFwiLFxuICAgIFwiZmxleCBpdGVtcy1jZW50ZXJcIixcbiAgICBcInByLTEwXCIsXG4gICAgcmVhZE9ubHlNb2RlID8gXCJpbmQtcmVhZG9ubHktZmllbGRcIiA6IFwiXCIsXG4gICAgcmVhZE9ubHlNb2RlID8gXCJjdXJzb3Itbm90LWFsbG93ZWRcIiA6IFwiY3Vyc29yLXBvaW50ZXJcIlxuICBdLmZpbHRlcihCb29sZWFuKS5qb2luKFwiIFwiKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtjb250YWluZXJDbGFzc30gcmVmPXtjb250YWluZXJSZWZ9PlxuICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZFwiIHN0eWxlPXt7IGNvbG9yOiBsYWJlbENvbG9yIH19PntTdHJpbmcoZWZmZWN0aXZlTGFiZWwpfTwvbGFiZWw+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlXCI+XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICBjbGFzc05hbWU9e2J1dHRvbkNsYXNzfVxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgIGlmIChyZWFkT25seU1vZGUpIHJldHVybjtcbiAgICAgICAgICAgIHNldE9wZW4oKHYpID0+ICF2KTtcbiAgICAgICAgICB9fVxuICAgICAgICAgIG9uS2V5RG93bj17KGUpID0+IHtcbiAgICAgICAgICAgIGlmIChyZWFkT25seU1vZGUpIHJldHVybjtcbiAgICAgICAgICAgIGlmIChlLmtleSA9PT0gXCJFbnRlclwiIHx8IGUua2V5ID09PSBcIiBcIikge1xuICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgIHNldE9wZW4oKHYpID0+ICF2KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChlLmtleSA9PT0gXCJFc2NhcGVcIikgc2V0T3BlbihmYWxzZSk7XG4gICAgICAgICAgfX1cbiAgICAgICAgICBhcmlhLWV4cGFuZGVkPXtvcGVufVxuICAgICAgICAgIGFyaWEtZGlzYWJsZWQ9e3JlYWRPbmx5TW9kZSA/IFwidHJ1ZVwiIDogdW5kZWZpbmVkfVxuICAgICAgICA+XG4gICAgICAgICAgPHNwYW4gc3R5bGU9e3sgY29sb3I6IHZhbHVlQ29sb3IsIGZvbnRXZWlnaHQ6IDQwMCB9fT57Zm9ybWF0RGlzcGxheShzZWxlY3RlZERhdGUpfTwvc3Bhbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LXktMCByaWdodC0wIGZsZXggaXRlbXMtY2VudGVyIHByLTIgdGV4dC1zbGF0ZS01MDAgcG9pbnRlci1ldmVudHMtbm9uZVwiPlxuICAgICAgICAgIHtvcGVuID8gPENoZXZyb25VcFN2ZyBjbGFzc05hbWU9XCJoLTUgdy01XCIgLz4gOiA8Q2hldnJvbkRvd25TdmcgY2xhc3NOYW1lPVwiaC01IHctNVwiIC8+fVxuICAgICAgICA8L3NwYW4+XG4gICAgICAgIHtvcGVuICYmIChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRycC1wb3BvdmVyXCIgcm9sZT1cImRpYWxvZ1wiIGFyaWEtbW9kYWw9XCJ0cnVlXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRycC1oZWFkXCI+XG4gICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImRycC1uYXZcIiBhcmlhLWxhYmVsPXtpbmRUKFwiSGlzdG9yeV9QcmV2TW9udGhcIiwgXCJQcmV2aW91cyBtb250aFwiKX0gb25DbGljaz17KCkgPT4gZ29Nb250aCgtMSl9PlxuICAgICAgICAgICAgICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGNsYXNzTmFtZT1cImgtNCB3LTRcIiBmaWxsPVwibm9uZVwiIHZpZXdCb3g9XCIwIDAgMzAgMzBcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIj5cbiAgICAgICAgICAgICAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBzdHJva2VXaWR0aD1cIjJcIiBkPVwiTTE1IDE5bC03LTcgNy03XCIgLz5cbiAgICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZHJwLW1vbnRoXCI+e21vbnRoTGFiZWx9PC9kaXY+XG4gICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImRycC1uYXZcIiBhcmlhLWxhYmVsPXtpbmRUKFwiSGlzdG9yeV9OZXh0TW9udGhcIiwgXCJOZXh0IG1vbnRoXCIpfSBvbkNsaWNrPXsoKSA9PiBnb01vbnRoKDEpfT5cbiAgICAgICAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBjbGFzc05hbWU9XCJoLTQgdy00XCIgZmlsbD1cIm5vbmVcIiB2aWV3Qm94PVwiMCAwIDMwIDMwXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCI+XG4gICAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgc3Ryb2tlV2lkdGg9XCIyXCIgZD1cIk05IDVsNyA3LTcgN1wiIC8+XG4gICAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRycC13ZWVrZGF5c1wiPlxuICAgICAgICAgICAgICA8c3Bhbj57aW5kVChcIkhpc3RvcnlfRGF5X01vblwiLCBcIk1vXCIpfTwvc3Bhbj48c3Bhbj57aW5kVChcIkhpc3RvcnlfRGF5X1R1ZVwiLCBcIlR1XCIpfTwvc3Bhbj48c3Bhbj57aW5kVChcIkhpc3RvcnlfRGF5X1dlZFwiLCBcIldlXCIpfTwvc3Bhbj48c3Bhbj57aW5kVChcIkhpc3RvcnlfRGF5X1RodVwiLCBcIlRoXCIpfTwvc3Bhbj48c3Bhbj57aW5kVChcIkhpc3RvcnlfRGF5X0ZyaVwiLCBcIkZyXCIpfTwvc3Bhbj48c3Bhbj57aW5kVChcIkhpc3RvcnlfRGF5X1NhdFwiLCBcIlNhXCIpfTwvc3Bhbj48c3Bhbj57aW5kVChcIkhpc3RvcnlfRGF5X1N1blwiLCBcIlN1XCIpfTwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkcnAtZ3JpZFwiPlxuICAgICAgICAgICAgICB7QXJyYXkuZnJvbSh7IGxlbmd0aDogb2Zmc2V0IH0pLm1hcCgoXywgaSkgPT4gKFxuICAgICAgICAgICAgICAgIDxidXR0b24ga2V5PXtgZS0ke2l9YH0gY2xhc3NOYW1lPVwiZHJwLWRheSBlbXB0eVwiIGRpc2FibGVkIHR5cGU9XCJidXR0b25cIiAvPlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAge0FycmF5LmZyb20oeyBsZW5ndGg6IGRheXNJbk1vbnRoIH0pLm1hcCgoXywgaWR4KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF5ID0gaWR4ICsgMTtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRlT2JqID0gbmV3IERhdGUoY3VycmVudFllYXIsIGN1cnJlbnRNb250aCwgZGF5KTtcbiAgICAgICAgICAgICAgICBjb25zdCBpc1NlbGVjdGVkID0gc2FtZURheShkYXRlT2JqLCBzZWxlY3RlZERhdGUpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGlzVG9kYXkgPSBzYW1lRGF5KGRhdGVPYmosIG5ldyBEYXRlKCkpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNscyA9IFtcbiAgICAgICAgICAgICAgICAgIFwiZHJwLWRheVwiLFxuICAgICAgICAgICAgICAgICAgaXNTZWxlY3RlZCA/IFwic3RhcnQgcmFuZ2Utc3RhcnRcIiA6IFwiXCIsXG4gICAgICAgICAgICAgICAgICBpc1RvZGF5ID8gXCJ0b2RheVwiIDogXCJcIlxuICAgICAgICAgICAgICAgIF0uam9pbihcIiBcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAga2V5PXt0b0lTTyhkYXRlT2JqKX1cbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xzfVxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVTZWxlY3QoZGF0ZU9iail9XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHtkYXl9XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkcnAtc3RhdHVzXCI+e2luZFQoXCJEYXRlUGlja2VyX1NlbGVjdERhdGVcIiwgXCJTZWxlY3QgZGF0ZVwiKX08L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn1cclxuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcblxudHlwZSBQb2ludGVyQmluZGluZ3MgPSB7XG4gIG9uUG9pbnRlckRvd24/OiBSZWFjdC5Qb2ludGVyRXZlbnRIYW5kbGVyPEhUTUxUZXh0QXJlYUVsZW1lbnQ+O1xuICBvblBvaW50ZXJNb3ZlPzogUmVhY3QuUG9pbnRlckV2ZW50SGFuZGxlcjxIVE1MVGV4dEFyZWFFbGVtZW50PjtcbiAgb25Qb2ludGVyVXA/OiBSZWFjdC5Qb2ludGVyRXZlbnRIYW5kbGVyPEhUTUxUZXh0QXJlYUVsZW1lbnQ+O1xuICBvblBvaW50ZXJDYW5jZWw/OiBSZWFjdC5Qb2ludGVyRXZlbnRIYW5kbGVyPEhUTUxUZXh0QXJlYUVsZW1lbnQ+O1xufTtcblxudHlwZSBUYXBUZXh0QXJlYUZpZWxkID0ge1xuICBpZDogc3RyaW5nO1xuICBsYWJlbDogc3RyaW5nO1xuICB2YWx1ZTogc3RyaW5nO1xuICBjbGFzc05hbWU6IHN0cmluZztcbiAgcG9pbnRlckJpbmRpbmdzOiBQb2ludGVyQmluZGluZ3M7XG59O1xuXG50eXBlIFByb3BzID0ge1xuICBkZXNjcmlwdGlvbkxhYmVsOiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uVmFsdWU6IHN0cmluZztcbiAgZGVzY3JpcHRpb25DbGFzc05hbWU6IHN0cmluZztcbiAgZGVzY3JpcHRpb25EaXNhYmxlZD86IGJvb2xlYW47XG4gIGRlc2NyaXB0aW9uTWF4TGVuZ3RoPzogbnVtYmVyO1xuICBvbkRlc2NyaXB0aW9uQ2hhbmdlOiAobmV4dFZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHRhcEZpZWxkczogVGFwVGV4dEFyZWFGaWVsZFtdO1xufTtcblxuLy8gUmVuZGVycyB0aGUgc2hhcmVkIG5hcnJhdGl2ZSBmaWVsZHMgYmxvY2sgZm9yIGNyZWF0ZS9kZXRhaWwgZmxvd3MuXG5jb25zdCBWaXNpdE5hcnJhdGl2ZUZpZWxkcyA9ICh7XG4gIGRlc2NyaXB0aW9uTGFiZWwsXG4gIGRlc2NyaXB0aW9uVmFsdWUsXG4gIGRlc2NyaXB0aW9uQ2xhc3NOYW1lLFxuICBkZXNjcmlwdGlvbkRpc2FibGVkID0gZmFsc2UsXG4gIGRlc2NyaXB0aW9uTWF4TGVuZ3RoID0gMjAwLFxuICBvbkRlc2NyaXB0aW9uQ2hhbmdlLFxuICB0YXBGaWVsZHMsXG59OiBQcm9wcykgPT4ge1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBnYXAtM1wiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cbiAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZFwiPntkZXNjcmlwdGlvbkxhYmVsfTwvbGFiZWw+XG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgIGlkPVwiZGVzY3JpcHRpb25cIlxuICAgICAgICAgIGNsYXNzTmFtZT17ZGVzY3JpcHRpb25DbGFzc05hbWV9XG4gICAgICAgICAgbWF4TGVuZ3RoPXtkZXNjcmlwdGlvbk1heExlbmd0aH1cbiAgICAgICAgICB2YWx1ZT17ZGVzY3JpcHRpb25WYWx1ZX1cbiAgICAgICAgICBkaXNhYmxlZD17ZGVzY3JpcHRpb25EaXNhYmxlZH1cbiAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IG9uRGVzY3JpcHRpb25DaGFuZ2UoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHt0YXBGaWVsZHMubWFwKChmaWVsZCkgPT4gKFxuICAgICAgICA8ZGl2IGtleT17ZmllbGQuaWR9IGNsYXNzTmFtZT1cInNwYWNlLXktMlwiPlxuICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb3JtLWxhYmVsIGZvbnQtc2VtaWJvbGRcIj57ZmllbGQubGFiZWx9PC9sYWJlbD5cbiAgICAgICAgICA8dGV4dGFyZWFcbiAgICAgICAgICAgIGlkPXtmaWVsZC5pZH1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17ZmllbGQuY2xhc3NOYW1lfVxuICAgICAgICAgICAgdmFsdWU9e2ZpZWxkLnZhbHVlfVxuICAgICAgICAgICAgcmVhZE9ubHlcbiAgICAgICAgICAgIG9uUG9pbnRlckRvd249e2ZpZWxkLnBvaW50ZXJCaW5kaW5ncy5vblBvaW50ZXJEb3dufVxuICAgICAgICAgICAgb25Qb2ludGVyTW92ZT17ZmllbGQucG9pbnRlckJpbmRpbmdzLm9uUG9pbnRlck1vdmV9XG4gICAgICAgICAgICBvblBvaW50ZXJVcD17ZmllbGQucG9pbnRlckJpbmRpbmdzLm9uUG9pbnRlclVwfVxuICAgICAgICAgICAgb25Qb2ludGVyQ2FuY2VsPXtmaWVsZC5wb2ludGVyQmluZGluZ3Mub25Qb2ludGVyQ2FuY2VsfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKSl9XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBWaXNpdE5hcnJhdGl2ZUZpZWxkcztcbiIsICJcdUZFRkZpbXBvcnQgeyBzZXRTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5IH0gZnJvbSBcIi4vc2Vzc2lvbkV4cGlyeS50c1wiO1xuaW1wb3J0IHsgcHJpbWVUZXh0RWRpdG9yVmFsdWUsIHNldFRleHRFZGl0b3JSZXR1cm5VcmwgfSBmcm9tIFwiLi90ZXh0RWRpdG9yLnRzXCI7XG5cbnR5cGUgTmF2aWdhdGVUb1RleHRFZGl0b3JGaWVsZE9wdGlvbnMgPSB7XG4gIGZpZWxkSWQ6IHN0cmluZztcbiAgZmllbGRMYWJlbDogc3RyaW5nO1xuICBmaWVsZFZhbHVlOiBzdHJpbmc7XG4gIGFsbG93RWRpdD86IGJvb2xlYW47XG4gIHJlYWRPbmx5PzogYm9vbGVhbjtcbiAgZWRpdE1vZGVLZXk/OiBzdHJpbmc7XG4gIGVkaXRNb2RlUmV0dXJuVHRsTXM/OiBudW1iZXI7XG4gIGJlZm9yZU5hdmlnYXRlPzogKCkgPT4gdm9pZDtcbn07XG5cbi8vIEJ1aWxkcyBhbmQgbmF2aWdhdGVzIHRvIHRoZSBzaGFyZWQgdGV4dCBlZGl0b3Igcm91dGUgZm9yIGxhcmdlIHRleHQgZmllbGRzLlxuZXhwb3J0IGNvbnN0IG5hdmlnYXRlVG9UZXh0RWRpdG9yRmllbGQgPSAoe1xuICBmaWVsZElkLFxuICBmaWVsZExhYmVsLFxuICBmaWVsZFZhbHVlLFxuICBhbGxvd0VkaXQgPSB0cnVlLFxuICByZWFkT25seSxcbiAgZWRpdE1vZGVLZXksXG4gIGVkaXRNb2RlUmV0dXJuVHRsTXMsXG4gIGJlZm9yZU5hdmlnYXRlLFxufTogTmF2aWdhdGVUb1RleHRFZGl0b3JGaWVsZE9wdGlvbnMpID0+IHtcbiAgY29uc3Qgc2FmZUlkID0gU3RyaW5nKGZpZWxkSWQgfHwgXCJcIikudHJpbSgpO1xuICBjb25zdCBzYWZlTGFiZWwgPSBTdHJpbmcoZmllbGRMYWJlbCB8fCBcIlwiKS50cmltKCk7XG4gIGlmICghc2FmZUlkIHx8ICFzYWZlTGFiZWwpIHJldHVybiBmYWxzZTtcblxuICAvLyBQcmltZSBlZGl0b3Igc3RhdGUgd2l0aG91dCBwdXR0aW5nIGxhcmdlIHBheWxvYWRzIGluIHRoZSBVUkwuXG4gIHByaW1lVGV4dEVkaXRvclZhbHVlKHNhZmVJZCwgU3RyaW5nKGZpZWxkVmFsdWUgfHwgXCJcIikpO1xuXG4gIGJlZm9yZU5hdmlnYXRlPy4oKTtcblxuICBjb25zdCByZXR1cm5VcmwgPSBgJHt3aW5kb3cubG9jYXRpb24ucGF0aG5hbWV9JHt3aW5kb3cubG9jYXRpb24uc2VhcmNoIHx8IFwiXCJ9YDtcbiAgc2V0VGV4dEVkaXRvclJldHVyblVybChzYWZlSWQsIHJldHVyblVybCk7XG5cbiAgY29uc3Qgc2FmZUVkaXRNb2RlS2V5ID0gU3RyaW5nKGVkaXRNb2RlS2V5IHx8IFwiXCIpLnRyaW0oKTtcbiAgaWYgKHNhZmVFZGl0TW9kZUtleSAmJiBlZGl0TW9kZVJldHVyblR0bE1zICYmIGVkaXRNb2RlUmV0dXJuVHRsTXMgPiAwKSB7XG4gICAgc2V0U2Vzc2lvblZhbHVlV2l0aEV4cGlyeShgJHtzYWZlRWRpdE1vZGVLZXl9X3JldHVybmAsIFwiMVwiLCBlZGl0TW9kZVJldHVyblR0bE1zKTtcbiAgfVxuXG4gIGNvbnN0IHF1ZXJ5UGFydHMgPSBbXG4gICAgYGZpZWxkSWQ9JHtlbmNvZGVVUklDb21wb25lbnQoc2FmZUlkKX1gLFxuICAgIGBmaWVsZExhYmVsPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHNhZmVMYWJlbCl9YCxcbiAgICBgcmV0dXJuVXJsPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHJldHVyblVybCl9YCxcbiAgICBgYWxsb3dFZGl0PSR7YWxsb3dFZGl0ID8gXCIxXCIgOiBcIjBcIn1gLFxuICBdO1xuXG4gIGlmICh0eXBlb2YgcmVhZE9ubHkgPT09IFwiYm9vbGVhblwiKSB7XG4gICAgcXVlcnlQYXJ0cy5wdXNoKGByZWFkT25seT0ke3JlYWRPbmx5ID8gXCIxXCIgOiBcIjBcIn1gKTtcbiAgfVxuXG4gIGlmIChzYWZlRWRpdE1vZGVLZXkpIHtcbiAgICBxdWVyeVBhcnRzLnB1c2goYGVkaXRNb2RlS2V5PSR7ZW5jb2RlVVJJQ29tcG9uZW50KHNhZmVFZGl0TW9kZUtleSl9YCk7XG4gIH1cblxuICBjb25zdCB1cmwgPSBgL1RleHRFZGl0b3JSZWFjdC9FZGl0RmllbGQ/JHtxdWVyeVBhcnRzLmpvaW4oXCImXCIpfWA7XG5cbiAgd2luZG93Ll9faW5kQnlwYXNzTmF2aWdhdGlvbkd1YXJkT25jZT8uKCk7XG4gIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gdXJsO1xuICByZXR1cm4gdHJ1ZTtcbn07XHJcbiIsICJleHBvcnQgY29uc3Qgd2FpdCA9IChtczogbnVtYmVyKSA9PiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dChyZXNvbHZlLCBtcykpO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSx1QkFBNkI7QUEyQ3JCO0FBdkJPLFNBQVIsYUFBOEI7QUFBQSxFQUNuQztBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQSxhQUFhO0FBQUEsRUFDYixjQUFjO0FBQUEsRUFDZCxPQUFPO0FBQUEsRUFDUCxRQUFRO0FBQUEsRUFDUixTQUFTO0FBQUEsRUFD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O0FBQUEsRUFDcEM7QUFFQSxNQUFJLE9BQU8sYUFBYSxXQUFXO0FBQ2pDLGVBQVcsS0FBSyxZQUFZLFdBQVcsTUFBTSxHQUFHLEVBQUU7QUFBQSxFQUNwRDtBQUVBLE1BQUksaUJBQWlCO0FBQ25CLGVBQVcsS0FBSyxlQUFlLG1CQUFtQixlQUFlLENBQUMsRUFBRTtBQUFBLEVBQ3RFO0FBRUEsUUFBTSxNQUFNLDhCQUE4QixXQUFXLEtBQUssR0FBRyxDQUFDO0FBRTlELFNBQU8saUNBQWlDO0FBQ3hDLFNBQU8sU0FBUyxPQUFPO0FBQ3ZCLFNBQU87QUFDVDs7O0FDOURPLElBQU0sT0FBTyxDQUFDLE9BQWUsSUFBSSxRQUFRLENBQUMsWUFBWSxXQUFXLFNBQVMsRUFBRSxDQUFDOyIsCiAgIm5hbWVzIjogWyJpbXBvcnRfanN4X3J1bnRpbWUiLCAiUmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgIlJlYWN0IiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbmRUIiwgImltcG9ydF9qc3hfcnVudGltZSJdCn0K
