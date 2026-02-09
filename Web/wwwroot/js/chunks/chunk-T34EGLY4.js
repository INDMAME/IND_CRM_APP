import {
  ChevronDownSvg,
  ChevronUpSvg,
  FloatingList_default,
  Spinner_default,
  classNames,
  indT,
  useOutsideClick
} from "./chunk-ISVBGEOF.js";
import {
  require_jsx_runtime,
  require_react,
  require_react_dom
} from "./chunk-RGGEM6AY.js";
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

// Web/wwwroot/react/src/components/commons/ConfirmModal.tsx
var import_react_dom = __toESM(require_react_dom());
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
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
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "fixed inset-0 z-600000 flex items-center justify-center bg-black/40 px-4", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "w-full max-w-sm rounded-2xl bg-white shadow-xl border border-slate-200 p-5 space-y-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "text-lg font-semibold text-slate-900", children: title }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "text-sm text-slate-700 whitespace-pre-line", children: message }),
      showInfo && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex items-center gap-2 text-sm text-slate-600", children: [
        busy && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Spinner_default, { size: "h-4 w-4" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: error && !busy ? "text-rose-700" : "", children: infoText })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex justify-end gap-2 pt-2", children: [
        showCancel && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          "button",
          {
            type: "button",
            className: "px-4 py-2 rounded-xl border border-slate-300 text-slate-700 hover:border-primary hover:text-primary transition",
            onClick: onCancel,
            disabled: busy,
            children: cancelText
          }
        ),
        showConfirm && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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

// Web/wwwroot/react/src/components/commons/SingleDatePicker.tsx
var import_react3 = __toESM(require_react());
var import_jsx_runtime4 = __toESM(require_jsx_runtime());
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
  const selectedDate = (0, import_react3.useMemo)(() => parseISO(value), [value]);
  const [open, setOpen] = (0, import_react3.useState)(false);
  const [currentMonth, setCurrentMonth] = (0, import_react3.useState)(
    selectedDate ? selectedDate.getMonth() : (/* @__PURE__ */ new Date()).getMonth()
  );
  const [currentYear, setCurrentYear] = (0, import_react3.useState)(
    selectedDate ? selectedDate.getFullYear() : (/* @__PURE__ */ new Date()).getFullYear()
  );
  const containerRef = (0, import_react3.useRef)(null);
  (0, import_react3.useEffect)(() => {
    if (selectedDate) {
      setCurrentMonth(selectedDate.getMonth());
      setCurrentYear(selectedDate.getFullYear());
    }
  }, [selectedDate?.getTime()]);
  (0, import_react3.useEffect)(() => {
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
  (0, import_react3.useEffect)(() => {
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
  const handleSelect = (0, import_react3.useCallback)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: containerClass, ref: containerRef, children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("label", { className: "form-label font-semibold", style: { color: labelColor }, children: String(effectiveLabel) }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "relative", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
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
          children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { style: { color: valueColor, fontWeight: 400 }, children: formatDisplay(selectedDate) })
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "absolute inset-y-0 right-0 flex items-center pr-2 text-slate-500 pointer-events-none", children: open ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ChevronUpSvg, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ChevronDownSvg, { className: "h-5 w-5" }) }),
      open && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "drp-popover", role: "dialog", "aria-modal": "true", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "drp-head", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("button", { type: "button", className: "drp-nav", "aria-label": indT2("History_PrevMonth", "Previous month"), onClick: () => goMonth(-1), children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4", fill: "none", viewBox: "0 0 30 30", stroke: "currentColor", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M15 19l-7-7 7-7" }) }) }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "drp-month", children: monthLabel }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("button", { type: "button", className: "drp-nav", "aria-label": indT2("History_NextMonth", "Next month"), onClick: () => goMonth(1), children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4", fill: "none", viewBox: "0 0 30 30", stroke: "currentColor", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 5l7 7-7 7" }) }) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "drp-weekdays", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { children: indT2("History_Day_Mon", "Mo") }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { children: indT2("History_Day_Tue", "Tu") }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { children: indT2("History_Day_Wed", "We") }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { children: indT2("History_Day_Thu", "Th") }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { children: indT2("History_Day_Fri", "Fr") }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { children: indT2("History_Day_Sat", "Sa") }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { children: indT2("History_Day_Sun", "Su") })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "drp-grid", children: [
          Array.from({ length: offset }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("button", { className: "drp-day empty", disabled: true, type: "button" }, `e-${i}`)),
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
            return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
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
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "drp-status", children: indT2("DatePicker_SelectDate", "Select date") })
      ] })
    ] })
  ] });
}

// Web/wwwroot/react/src/components/commons/SelectCombobox.tsx
var import_react4 = __toESM(require_react());
var import_jsx_runtime5 = __toESM(require_jsx_runtime());
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
  const data = (0, import_react4.useMemo)(() => {
    return (options || []).map((o) => {
      if (Array.isArray(o)) {
        return { value: o[0] ?? "", text: o[1] ?? "" };
      }
      return { value: o?.value ?? o?.Value ?? "", text: o?.text ?? o?.Text ?? "" };
    });
  }, [options]);
  const [query, setQuery] = (0, import_react4.useState)("");
  const [selected, setSelected] = (0, import_react4.useState)(
    data.find((d) => String(d.value) === String(value)) || data[0] || { value: "", text: "" }
  );
  const [open, setOpen] = (0, import_react4.useState)(false);
  const [activeIndex, setActiveIndex] = (0, import_react4.useState)(0);
  const containerRef = (0, import_react4.useRef)(null);
  const boxRef = (0, import_react4.useRef)(null);
  const listRef = (0, import_react4.useRef)(null);
  useOutsideClick([containerRef, listRef], () => setOpen(false));
  (0, import_react4.useEffect)(() => {
    setSelected(data.find((d) => String(d.value) === String(value)) || data[0] || { value: "", text: "" });
  }, [value, data]);
  (0, import_react4.useEffect)(() => {
    setQuery("");
  }, [selected]);
  (0, import_react4.useEffect)(() => {
    if (!emitOnValueChange) return;
    onChange(selected?.value ? String(selected.value) : "");
  }, [emitOnValueChange, onChange, selected]);
  const filtered = (0, import_react4.useMemo)(() => {
    if (!query.trim()) return data;
    const f = data.filter((o) => o.text.toLowerCase().includes(query.toLowerCase()));
    return f.length ? f : data;
  }, [data, query]);
  (0, import_react4.useEffect)(() => {
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
  const listBody = /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { id: listId, ref: listRef, role: "listbox", "aria-label": label, children: [
    filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "px-4 py-2 text-sm text-slate-500", children: indT("Dropdown_NoResults", "No results") }),
    filtered.map((opt, idx) => {
      const sel = selected?.value === opt.value;
      const isActive = idx === activeIndex;
      return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
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
            sel && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
              "span",
              {
                className: classNames(
                  "absolute inset-y-0 left-0 flex items-center pl-2",
                  isActive ? "text-white" : "text-primary"
                )
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: classNames("block truncate", sel ? "font-medium" : "font-normal"), children: opt.text })
          ]
        },
        String(opt.value)
      );
    })
  ] });
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
    "div",
    {
      className: classNames("space-y-2", disabled ? "pointer-events-none select-none" : ""),
      ref: containerRef,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("label", { className: classNames("form-label font-semibold", invalid ? "text-rose-700" : ""), children: label }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "relative", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
            "div",
            {
              ref: boxRef,
              className: classNames(
                "relative w-full cursor-default rounded-xl bg-white text-left focus-within:border-primary focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-white sm:text-sm",
                readOnlyMode ? "ind-readonly-field" : ""
              ),
              style: readOnlyMode ? { color: valueColor } : void 0,
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
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
                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
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
                    children: open ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(ChevronUpSvg, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(ChevronDownSvg, { className: "h-5 w-5" })
                  }
                )
              ]
            }
          ),
          usePortal ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
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
          ) : listOpen && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "absolute z-360000 mt-1 w-full rounded-xl bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden max-h-72 overflow-auto", children: listBody })
        ] })
      ]
    }
  );
};
var SelectCombobox_default = SelectCombobox;

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
var import_react5 = __toESM(require_react());
var DEFAULT_MOVE_PX = 14;
var DEFAULT_HOLD_MS = 160;
var useTapGuard = (onTap, onHoldStart, options) => {
  const movePx = options?.movePx ?? DEFAULT_MOVE_PX;
  const holdMs = options?.holdMs ?? DEFAULT_HOLD_MS;
  const stateRef = import_react5.default.useRef({
    active: false,
    pointerId: null,
    startX: 0,
    startY: 0,
    moved: false,
    held: false,
    target: null
  });
  const holdTimerRef = import_react5.default.useRef(null);
  const reset = import_react5.default.useCallback(() => {
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
  const onPointerDown = import_react5.default.useCallback(
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
  const onPointerMove = import_react5.default.useCallback(
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
  const onPointerUp = import_react5.default.useCallback(
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
var import_react6 = __toESM(require_react());
var useConfirmDialog = ({ defaultConfirmText, defaultCancelText }) => {
  const [modal, setModal] = (0, import_react6.useState)({
    open: false,
    title: "",
    message: "",
    confirmText: defaultConfirmText,
    cancelText: defaultCancelText,
    showCancel: true,
    showConfirm: true,
    onConfirm: null
  });
  const confirmInFlightRef = (0, import_react6.useRef)(false);
  const openConfirm = (0, import_react6.useCallback)(
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
  const closeConfirm = (0, import_react6.useCallback)(() => {
    setModal((prev) => ({ ...prev, open: false }));
  }, []);
  const handleConfirm = (0, import_react6.useCallback)(
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

// Web/wwwroot/react/src/utils/textEditor.ts
var TEXT_EDITOR_PREFIX = "ind_texteditor_";
var readAndClearTextEditorValue = (fieldId) => {
  const id = String(fieldId || "").trim();
  if (!id) return null;
  const key = `${TEXT_EDITOR_PREFIX}${id}`;
  try {
    const value = sessionStorage.getItem(key);
    if (value === null) return null;
    sessionStorage.removeItem(key);
    return value;
  } catch {
    return null;
  }
};

// Web/wwwroot/react/src/utils/wait.ts
var wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export {
  ConfirmModal,
  SingleDatePicker,
  SelectCombobox_default,
  useVisitas,
  setPreviewAnchor,
  showPreviewTooltip,
  isOverflowing,
  useTapGuard,
  useConfirmDialog,
  TEXT_EDITOR_PREFIX,
  readAndClearTextEditorValue,
  wait,
  I18nProvider,
  AuthProvider
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL2NvbnRleHQvSTE4bkNvbnRleHQudHN4IiwgIi4uLy4uL3JlYWN0L3NyYy9jb250ZXh0L0F1dGhDb250ZXh0LnRzeCIsICIuLi8uLi9yZWFjdC9zcmMvY29tcG9uZW50cy9jb21tb25zL0NvbmZpcm1Nb2RhbC50c3giLCAiLi4vLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9TaW5nbGVEYXRlUGlja2VyLnRzeCIsICIuLi8uLi9yZWFjdC9zcmMvY29tcG9uZW50cy9jb21tb25zL1NlbGVjdENvbWJvYm94LnRzeCIsICIuLi8uLi9yZWFjdC9zcmMvaG9va3MvdXNlVmlzaXRhcy50cyIsICIuLi8uLi9yZWFjdC9zcmMvdXRpbHMvcHJldmlld1Rvb2x0aXAudHMiLCAiLi4vLi4vcmVhY3Qvc3JjL2hvb2tzL3VzZVRhcEd1YXJkLnRzIiwgIi4uLy4uL3JlYWN0L3NyYy9ob29rcy91c2VDb25maXJtRGlhbG9nLnRzIiwgIi4uLy4uL3JlYWN0L3NyYy91dGlscy90ZXh0RWRpdG9yLnRzIiwgIi4uLy4uL3JlYWN0L3NyYy91dGlscy93YWl0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgUmVhY3QsIHsgY3JlYXRlQ29udGV4dCwgdXNlQ29udGV4dCwgdXNlTWVtbyB9IGZyb20gXCJyZWFjdFwiO1xuXG50eXBlIEkxOG5EaWN0ID0gUmVjb3JkPHN0cmluZywgc3RyaW5nPjtcblxudHlwZSBJMThuVmFsdWUgPSB7XG4gIGRpY3Rpb25hcnk6IEkxOG5EaWN0O1xuICB0OiAoa2V5OiBzdHJpbmcsIGZhbGxiYWNrPzogc3RyaW5nKSA9PiBzdHJpbmc7XG4gIGZvcm1hdDogKGtleTogc3RyaW5nLCBmYWxsYmFjazogc3RyaW5nIHwgdW5kZWZpbmVkLCAuLi5hcmdzOiBBcnJheTxzdHJpbmcgfCBudW1iZXI+KSA9PiBzdHJpbmc7XG59O1xuXG5jb25zdCBkZWZhdWx0RGljdDogSTE4bkRpY3QgPSB7fTtcblxuY29uc3QgZGVmYXVsdFZhbHVlOiBJMThuVmFsdWUgPSB7XG4gIGRpY3Rpb25hcnk6IGRlZmF1bHREaWN0LFxuICB0OiAoa2V5LCBmYWxsYmFjaykgPT4gZmFsbGJhY2sgfHwga2V5LFxuICBmb3JtYXQ6IChrZXksIGZhbGxiYWNrLCAuLi5hcmdzKSA9PiB7XG4gICAgY29uc3QgdGVtcGxhdGUgPSBmYWxsYmFjayB8fCBrZXk7XG4gICAgcmV0dXJuIFN0cmluZyh0ZW1wbGF0ZSkucmVwbGFjZSgvXFx7KFxcZCspXFx9L2csIChfLCBpZHgpID0+IFN0cmluZyhhcmdzW051bWJlcihpZHgpXSA/PyBcIlwiKSk7XG4gIH0sXG59O1xuXG5jb25zdCBJMThuQ29udGV4dCA9IGNyZWF0ZUNvbnRleHQ8STE4blZhbHVlPihkZWZhdWx0VmFsdWUpO1xuXG50eXBlIFByb3ZpZGVyUHJvcHMgPSB7XG4gIGNoaWxkcmVuOiBSZWFjdC5SZWFjdE5vZGU7XG4gIGRpY3Rpb25hcnk/OiBJMThuRGljdDtcbn07XG5cbmV4cG9ydCBjb25zdCBJMThuUHJvdmlkZXIgPSAoeyBjaGlsZHJlbiwgZGljdGlvbmFyeSB9OiBQcm92aWRlclByb3BzKSA9PiB7XG4gIGNvbnN0IGRpY3QgPSBkaWN0aW9uYXJ5IHx8IChnbG9iYWxUaGlzLl9fSU5EX0kxOE5fXyB8fCB7fSk7XG5cbiAgY29uc3QgdmFsdWUgPSB1c2VNZW1vPEkxOG5WYWx1ZT4oKCkgPT4ge1xuICAgIGNvbnN0IHQgPSAoa2V5OiBzdHJpbmcsIGZhbGxiYWNrPzogc3RyaW5nKSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZSA9IGRpY3Rba2V5XTtcbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgJiYgdmFsdWUudHJpbSgpKSByZXR1cm4gdmFsdWU7XG4gICAgICByZXR1cm4gZmFsbGJhY2sgfHwga2V5O1xuICAgIH07XG4gICAgY29uc3QgZm9ybWF0ID0gKGtleTogc3RyaW5nLCBmYWxsYmFjazogc3RyaW5nIHwgdW5kZWZpbmVkLCAuLi5hcmdzOiBBcnJheTxzdHJpbmcgfCBudW1iZXI+KSA9PiB7XG4gICAgICBjb25zdCB0ZW1wbGF0ZSA9IHQoa2V5LCBmYWxsYmFjayk7XG4gICAgICByZXR1cm4gU3RyaW5nKHRlbXBsYXRlKS5yZXBsYWNlKC9cXHsoXFxkKylcXH0vZywgKF8sIGlkeCkgPT4gU3RyaW5nKGFyZ3NbTnVtYmVyKGlkeCldID8/IFwiXCIpKTtcbiAgICB9O1xuICAgIHJldHVybiB7IGRpY3Rpb25hcnk6IGRpY3QsIHQsIGZvcm1hdCB9O1xuICB9LCBbZGljdF0pO1xuXG4gIHJldHVybiA8STE4bkNvbnRleHQuUHJvdmlkZXIgdmFsdWU9e3ZhbHVlfT57Y2hpbGRyZW59PC9JMThuQ29udGV4dC5Qcm92aWRlcj47XG59O1xuXG5leHBvcnQgY29uc3QgdXNlSTE4biA9ICgpID0+IHVzZUNvbnRleHQoSTE4bkNvbnRleHQpO1xuIiwgImltcG9ydCBSZWFjdCwgeyBjcmVhdGVDb250ZXh0LCB1c2VDb250ZXh0LCB1c2VNZW1vIH0gZnJvbSBcInJlYWN0XCI7XG5cbmV4cG9ydCB0eXBlIEFjY2Vzc0xldmVsID0gXCJWaWV3XCIgfCBcIkVkaXRcIiB8IFwiQWRkXCIgfCBcIkZ1bGxBY2Nlc3NcIjtcblxuY29uc3QgQUNDRVNTX1JJR0hUUzogUmVjb3JkPEFjY2Vzc0xldmVsLCBudW1iZXI+ID0ge1xuICBWaWV3OiAxLFxuICBFZGl0OiAyLFxuICBBZGQ6IDMsXG4gIEZ1bGxBY2Nlc3M6IDQsXG59O1xuXG50eXBlIEF1dGhWYWx1ZSA9IHtcbiAgbW9kdWxlQWNjZXNzOiBSZWNvcmQ8c3RyaW5nLCBudW1iZXI+O1xuICBzZWxlY3RlZENvbXBhbnk6IHN0cmluZztcbiAgY2FuQWNjZXNzOiAoY29kZTogc3RyaW5nLCBsZXZlbD86IEFjY2Vzc0xldmVsKSA9PiBib29sZWFuO1xufTtcblxuY29uc3QgZGVmYXVsdFZhbHVlOiBBdXRoVmFsdWUgPSB7XG4gIG1vZHVsZUFjY2Vzczoge30sXG4gIHNlbGVjdGVkQ29tcGFueTogXCJcIixcbiAgY2FuQWNjZXNzOiAoKSA9PiBmYWxzZSxcbn07XG5cbmNvbnN0IEF1dGhDb250ZXh0ID0gY3JlYXRlQ29udGV4dDxBdXRoVmFsdWU+KGRlZmF1bHRWYWx1ZSk7XG5cbnR5cGUgUHJvdmlkZXJQcm9wcyA9IHtcbiAgY2hpbGRyZW46IFJlYWN0LlJlYWN0Tm9kZTtcbiAgbW9kdWxlQWNjZXNzPzogUmVjb3JkPHN0cmluZywgbnVtYmVyPjtcbiAgc2VsZWN0ZWRDb21wYW55Pzogc3RyaW5nO1xufTtcblxuZXhwb3J0IGNvbnN0IEF1dGhQcm92aWRlciA9ICh7IGNoaWxkcmVuLCBtb2R1bGVBY2Nlc3MsIHNlbGVjdGVkQ29tcGFueSB9OiBQcm92aWRlclByb3BzKSA9PiB7XG4gIGNvbnN0IGFjY2VzcyA9IG1vZHVsZUFjY2VzcyB8fCAoZ2xvYmFsVGhpcy5fX0lORF9NT0RVTEVfQUNDRVNTX18gfHwge30pO1xuICBjb25zdCBjb21wYW55ID0gc2VsZWN0ZWRDb21wYW55IHx8IFN0cmluZyhnbG9iYWxUaGlzLl9fSU5EX1NFTEVDVEVEX0NPTVBBTllfXyB8fCBcIlwiKTtcblxuICBjb25zdCB2YWx1ZSA9IHVzZU1lbW88QXV0aFZhbHVlPigoKSA9PiB7XG4gICAgY29uc3QgY2FuQWNjZXNzID0gKGNvZGU6IHN0cmluZywgbGV2ZWw6IEFjY2Vzc0xldmVsID0gXCJWaWV3XCIpID0+IHtcbiAgICAgIGNvbnN0IGN1cnJlbnQgPSBOdW1iZXIoYWNjZXNzPy5bY29kZV0gPz8gMCk7XG4gICAgICByZXR1cm4gY3VycmVudCA+PSBBQ0NFU1NfUklHSFRTW2xldmVsXTtcbiAgICB9O1xuICAgIHJldHVybiB7IG1vZHVsZUFjY2VzczogYWNjZXNzLCBzZWxlY3RlZENvbXBhbnk6IGNvbXBhbnksIGNhbkFjY2VzcyB9O1xuICB9LCBbYWNjZXNzLCBjb21wYW55XSk7XG5cbiAgcmV0dXJuIDxBdXRoQ29udGV4dC5Qcm92aWRlciB2YWx1ZT17dmFsdWV9PntjaGlsZHJlbn08L0F1dGhDb250ZXh0LlByb3ZpZGVyPjtcbn07XG5cbmV4cG9ydCBjb25zdCB1c2VBdXRoQ29udGV4dCA9ICgpID0+IHVzZUNvbnRleHQoQXV0aENvbnRleHQpO1xuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGNyZWF0ZVBvcnRhbCB9IGZyb20gXCJyZWFjdC1kb21cIjtcbmltcG9ydCBTcGlubmVyIGZyb20gXCIuL1NwaW5uZXIudHN4XCI7XG5cbnR5cGUgQ29uZmlybU1vZGFsUHJvcHMgPSB7XG4gIG9wZW46IGJvb2xlYW47XG4gIHRpdGxlOiBzdHJpbmc7XG4gIG1lc3NhZ2U6IHN0cmluZztcbiAgY29uZmlybVRleHQ6IHN0cmluZztcbiAgY2FuY2VsVGV4dDogc3RyaW5nO1xuICBsb2FkaW5nVGV4dDogc3RyaW5nO1xuICBzaG93Q2FuY2VsPzogYm9vbGVhbjtcbiAgc2hvd0NvbmZpcm0/OiBib29sZWFuO1xuICBidXN5PzogYm9vbGVhbjtcbiAgZXJyb3I/OiBzdHJpbmc7XG4gIHN0YXR1cz86IHN0cmluZztcbiAgb25Db25maXJtOiAoKSA9PiB2b2lkO1xuICBvbkNhbmNlbDogKCkgPT4gdm9pZDtcbn07XG5cbi8vIER1bWIgY29uZmlybSBtb2RhbCB3aXRoIG9wdGlvbmFsIHNwaW5uZXIgYW5kIHN0YXR1cyB0ZXh0LlxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ29uZmlybU1vZGFsKHtcbiAgb3BlbixcbiAgdGl0bGUsXG4gIG1lc3NhZ2UsXG4gIGNvbmZpcm1UZXh0LFxuICBjYW5jZWxUZXh0LFxuICBsb2FkaW5nVGV4dCxcbiAgc2hvd0NhbmNlbCA9IHRydWUsXG4gIHNob3dDb25maXJtID0gdHJ1ZSxcbiAgYnVzeSA9IGZhbHNlLFxuICBlcnJvciA9IFwiXCIsXG4gIHN0YXR1cyA9IFwiXCIsXG4gIG9uQ29uZmlybSxcbiAgb25DYW5jZWwsXG59OiBDb25maXJtTW9kYWxQcm9wcykge1xuICBpZiAoIW9wZW4pIHJldHVybiBudWxsO1xuXG4gIGNvbnN0IHNob3dJbmZvID0gYnVzeSB8fCAhIWVycm9yO1xuICBjb25zdCBpbmZvVGV4dCA9IGJ1c3kgPyAoc3RhdHVzIHx8IGxvYWRpbmdUZXh0KSA6IGVycm9yO1xuXG4gIHJldHVybiBjcmVhdGVQb3J0YWwoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJmaXhlZCBpbnNldC0wIHotNjAwMDAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGJnLWJsYWNrLzQwIHB4LTRcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsIG1heC13LXNtIHJvdW5kZWQtMnhsIGJnLXdoaXRlIHNoYWRvdy14bCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBwLTUgc3BhY2UteS00XCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1sZyBmb250LXNlbWlib2xkIHRleHQtc2xhdGUtOTAwXCI+e3RpdGxlfTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtc20gdGV4dC1zbGF0ZS03MDAgd2hpdGVzcGFjZS1wcmUtbGluZVwiPnttZXNzYWdlfTwvZGl2PlxuICAgICAgICB7c2hvd0luZm8gJiYgKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC1zbSB0ZXh0LXNsYXRlLTYwMFwiPlxuICAgICAgICAgICAge2J1c3kgJiYgPFNwaW5uZXIgc2l6ZT1cImgtNCB3LTRcIiAvPn1cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17ZXJyb3IgJiYgIWJ1c3kgPyBcInRleHQtcm9zZS03MDBcIiA6IFwiXCJ9PntpbmZvVGV4dH08L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWVuZCBnYXAtMiBwdC0yXCI+XG4gICAgICAgICAge3Nob3dDYW5jZWwgJiYgKFxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtNCBweS0yIHJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci1zbGF0ZS0zMDAgdGV4dC1zbGF0ZS03MDAgaG92ZXI6Ym9yZGVyLXByaW1hcnkgaG92ZXI6dGV4dC1wcmltYXJ5IHRyYW5zaXRpb25cIlxuICAgICAgICAgICAgICBvbkNsaWNrPXtvbkNhbmNlbH1cbiAgICAgICAgICAgICAgZGlzYWJsZWQ9e2J1c3l9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHtjYW5jZWxUZXh0fVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgKX1cbiAgICAgICAgICB7c2hvd0NvbmZpcm0gJiYgKFxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtNCBweS0yIHJvdW5kZWQteGwgYmctcHJpbWFyeSB0ZXh0LXdoaXRlIGhvdmVyOmJnLXByaW1hcnkvOTAgdHJhbnNpdGlvblwiXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e29uQ29uZmlybX1cbiAgICAgICAgICAgICAgZGlzYWJsZWQ9e2J1c3l9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHtidXN5ID8gbG9hZGluZ1RleHQgOiBjb25maXJtVGV4dH1cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+LFxuICAgIGRvY3VtZW50LmJvZHlcbiAgKTtcbn1cbiIsICJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgQ2hldnJvbkRvd25TdmcsIENoZXZyb25VcFN2ZyB9IGZyb20gXCIuL2NoZXZyb25zLnRzeFwiO1xuXHJcbi8vIFNpbmdsZSBkYXRlIHBpY2tlciBtYXRjaGluZyB0aGUgSGlzdG9yaWFsIERSUCB2aXN1YWwgc3R5bGUuXHJcbi8vIFJldHVybnMgYW4gSVNPIHN0cmluZyAoeXl5eS1NTS1kZCkgdmlhIG9uQ2hhbmdlLlxyXG5cclxuY29uc3QgSU5EX0kxOE4gPSBnbG9iYWxUaGlzLl9fSU5EX0kxOE5fXyB8fCB7fTtcclxuY29uc3QgaW5kVCA9IChrZXksIGZhbGxiYWNrKSA9PiAoSU5EX0kxOE4gJiYgdHlwZW9mIElORF9JMThOW2tleV0gPT09IFwic3RyaW5nXCIgJiYgSU5EX0kxOE5ba2V5XSkgfHwgZmFsbGJhY2sgfHwga2V5O1xyXG5cclxuY29uc3QgcGFkID0gKG4pID0+IFN0cmluZyhuKS5wYWRTdGFydCgyLCBcIjBcIik7XHJcbmNvbnN0IHRvSVNPID0gKGQpID0+IGAke2QuZ2V0RnVsbFllYXIoKX0tJHtwYWQoZC5nZXRNb250aCgpICsgMSl9LSR7cGFkKGQuZ2V0RGF0ZSgpKX1gO1xyXG5cclxuY29uc3QgcGFyc2VJU08gPSAocykgPT4ge1xyXG4gIGlmICghcykgcmV0dXJuIG51bGw7XHJcbiAgY29uc3QgcmF3ID0gU3RyaW5nKHMpLnRyaW0oKTtcclxuICBpZiAoIXJhdykgcmV0dXJuIG51bGw7XHJcbiAgY29uc3QgcGFydHMgPSByYXcuc3BsaXQoXCItXCIpO1xyXG4gIGlmIChwYXJ0cy5sZW5ndGggPT09IDMpIHtcclxuICAgIGNvbnN0IFt5LCBtLCBkXSA9IHBhcnRzLm1hcChOdW1iZXIpO1xyXG4gICAgaWYgKCFOdW1iZXIuaXNOYU4oeSkgJiYgIU51bWJlci5pc05hTihtKSAmJiAhTnVtYmVyLmlzTmFOKGQpKSB7XHJcbiAgICAgIHJldHVybiBuZXcgRGF0ZSh5LCBtIC0gMSwgZCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBudWxsO1xyXG59O1xyXG5cclxuY29uc3Qgbm9ybWFsaXplVWlMb2NhbGUgPSAobG9jYWxlKSA9PiB7XHJcbiAgY29uc3QgdmFsdWUgPSBTdHJpbmcobG9jYWxlIHx8IFwiXCIpLnRyaW0oKTtcclxuICBpZiAoIXZhbHVlKSByZXR1cm4gXCJlcy1FU1wiO1xyXG4gIGlmICgvXnpoLWhhbnMvaS50ZXN0KHZhbHVlKSkgcmV0dXJuIFwiemgtQ05cIjtcclxuICByZXR1cm4gdmFsdWU7XHJcbn07XHJcblxyXG5jb25zdCBnZXRVaUxvY2FsZSA9ICgpID0+IHtcclxuICBjb25zdCBmcm9tSHRtbCA9IGRvY3VtZW50Py5kb2N1bWVudEVsZW1lbnQ/Lmxhbmc7XHJcbiAgaWYgKGZyb21IdG1sICYmIFN0cmluZyhmcm9tSHRtbCkudHJpbSgpKSByZXR1cm4gbm9ybWFsaXplVWlMb2NhbGUoZnJvbUh0bWwpO1xyXG4gIHJldHVybiBcImVzLUVTXCI7XHJcbn07XHJcblxyXG5jb25zdCBpc0Jhc3F1ZUxvY2FsZSA9IChsb2NhbGUpID0+IC9eZXVcXGIvaS50ZXN0KFN0cmluZyhsb2NhbGUgfHwgXCJcIikpO1xyXG5jb25zdCBCQVNRVUVfTU9OVEhTID0gW1xyXG4gIFwidXJ0YXJyaWxhXCIsXHJcbiAgXCJvdHNhaWxhXCIsXHJcbiAgXCJtYXJ0eG9hXCIsXHJcbiAgXCJhcGlyaWxhXCIsXHJcbiAgXCJtYWlhdHphXCIsXHJcbiAgXCJla2FpbmFcIixcclxuICBcInV6dGFpbGFcIixcclxuICBcImFidXp0dWFcIixcclxuICBcImlyYWlsYVwiLFxyXG4gIFwidXJyaWFcIixcclxuICBcImF6YXJvYVwiLFxyXG4gIFwiYWJlbmR1YVwiXHJcbl07XHJcbmNvbnN0IEJBU1FVRV9NT05USFNfU0hPUlQgPSBbXHJcbiAgXCJ1cnRcIixcclxuICBcIm90c1wiLFxyXG4gIFwibWFyXCIsXHJcbiAgXCJhcGlcIixcclxuICBcIm1haVwiLFxyXG4gIFwiZWthXCIsXHJcbiAgXCJ1enRcIixcclxuICBcImFidVwiLFxyXG4gIFwiaXJhXCIsXHJcbiAgXCJ1cnJcIixcclxuICBcImF6YVwiLFxyXG4gIFwiYWJlXCJcclxuXTtcclxuXHJcbmNvbnN0IGZvcm1hdERpc3BsYXkgPSAoZCkgPT4ge1xyXG4gIGlmICghZCkgcmV0dXJuIGluZFQoXCJIaXN0b3J5X0FkZERhdGVcIiwgXCJBZGQgZGF0ZVwiKTtcclxuICBjb25zdCBsb2NhbGUgPSBnZXRVaUxvY2FsZSgpO1xyXG4gIGlmIChpc0Jhc3F1ZUxvY2FsZShsb2NhbGUpKSB7XHJcbiAgICBjb25zdCBtb250aCA9IEJBU1FVRV9NT05USFNfU0hPUlRbZC5nZXRNb250aCgpXTtcclxuICAgIHJldHVybiBgJHtkLmdldERhdGUoKX0gJHttb250aH0gJHtkLmdldEZ1bGxZZWFyKCl9YC50b0xvd2VyQ2FzZSgpO1xyXG4gIH1cclxuICByZXR1cm4gZFxyXG4gICAgLnRvTG9jYWxlRGF0ZVN0cmluZyhsb2NhbGUsIHsgZGF5OiBcIm51bWVyaWNcIiwgbW9udGg6IFwic2hvcnRcIiwgeWVhcjogXCJudW1lcmljXCIgfSlcclxuICAgIC5yZXBsYWNlKC9cXC4vZywgXCJcIilcclxuICAgIC50b0xvd2VyQ2FzZSgpO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gU2luZ2xlRGF0ZVBpY2tlcih7IGxhYmVsLCB2YWx1ZSwgb25DaGFuZ2UsIGRpc2FibGVkID0gZmFsc2UsIHJlYWRPbmx5ID0gZmFsc2UgfSkge1xuICBjb25zdCBlZmZlY3RpdmVMYWJlbCA9IChsYWJlbCAmJiBTdHJpbmcobGFiZWwpLnRyaW0oKSkgPyBsYWJlbCA6IGluZFQoXCJWaXNpdHNfRGV0YWlsX0RhdGVfTGFiZWxcIiwgXCJEYXRlXCIpO1xuICBjb25zdCBzZWxlY3RlZERhdGUgPSB1c2VNZW1vKCgpID0+IHBhcnNlSVNPKHZhbHVlKSwgW3ZhbHVlXSk7XG4gIGNvbnN0IFtvcGVuLCBzZXRPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2N1cnJlbnRNb250aCwgc2V0Q3VycmVudE1vbnRoXSA9IHVzZVN0YXRlKFxyXG4gICAgc2VsZWN0ZWREYXRlID8gc2VsZWN0ZWREYXRlLmdldE1vbnRoKCkgOiBuZXcgRGF0ZSgpLmdldE1vbnRoKClcclxuICApO1xyXG4gIGNvbnN0IFtjdXJyZW50WWVhciwgc2V0Q3VycmVudFllYXJdID0gdXNlU3RhdGUoXHJcbiAgICBzZWxlY3RlZERhdGUgPyBzZWxlY3RlZERhdGUuZ2V0RnVsbFllYXIoKSA6IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGNvbnRhaW5lclJlZiA9IHVzZVJlZihudWxsKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmIChzZWxlY3RlZERhdGUpIHtcclxuICAgICAgc2V0Q3VycmVudE1vbnRoKHNlbGVjdGVkRGF0ZS5nZXRNb250aCgpKTtcclxuICAgICAgc2V0Q3VycmVudFllYXIoc2VsZWN0ZWREYXRlLmdldEZ1bGxZZWFyKCkpO1xyXG4gICAgfVxyXG4gIH0sIFtzZWxlY3RlZERhdGU/LmdldFRpbWUoKV0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3Qgb25Eb2NDbGljayA9IChldikgPT4ge1xuICAgICAgaWYgKCFjb250YWluZXJSZWYuY3VycmVudCkgcmV0dXJuO1xuICAgICAgaWYgKCFjb250YWluZXJSZWYuY3VycmVudC5jb250YWlucyhldi50YXJnZXQpKSB7XG4gICAgICAgIHNldE9wZW4oZmFsc2UpO1xuICAgICAgfVxuICAgIH07XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBvbkRvY0NsaWNrKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCBvbkRvY0NsaWNrLCB7IHBhc3NpdmU6IHRydWUgfSk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgb25Eb2NDbGljayk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCBvbkRvY0NsaWNrKTtcbiAgICB9O1xuICB9LCBbXSk7XG5cclxuICBjb25zdCByZWFkT25seU1vZGUgPSByZWFkT25seSB8fCBkaXNhYmxlZDtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChyZWFkT25seU1vZGUpIHNldE9wZW4oZmFsc2UpO1xuICB9LCBbcmVhZE9ubHlNb2RlXSk7XG5cbiAgY29uc3QgZmlyc3REYXkgPSBuZXcgRGF0ZShjdXJyZW50WWVhciwgY3VycmVudE1vbnRoLCAxKTtcbiAgY29uc3QgZGF5c0luTW9udGggPSBuZXcgRGF0ZShjdXJyZW50WWVhciwgY3VycmVudE1vbnRoICsgMSwgMCkuZ2V0RGF0ZSgpO1xyXG4gIGNvbnN0IG9mZnNldCA9IChmaXJzdERheS5nZXREYXkoKSArIDYpICUgNzsgLy8gTW9uZGF5IGFzIDBcclxuXHJcbiAgY29uc3QgbW9udGhMYWJlbCA9ICgoKSA9PiB7XHJcbiAgICBjb25zdCBsb2NhbGUgPSBnZXRVaUxvY2FsZSgpO1xyXG4gICAgaWYgKC9eemgvaS50ZXN0KGxvY2FsZSkpIHtcclxuICAgICAgcmV0dXJuIG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KGxvY2FsZSwgeyB5ZWFyOiBcIm51bWVyaWNcIiwgbW9udGg6IFwibG9uZ1wiIH0pLmZvcm1hdChmaXJzdERheSk7XHJcbiAgICB9XHJcbiAgICBpZiAoaXNCYXNxdWVMb2NhbGUobG9jYWxlKSkge1xyXG4gICAgICByZXR1cm4gYCR7QkFTUVVFX01PTlRIU1tjdXJyZW50TW9udGhdfSAke2N1cnJlbnRZZWFyfWA7XHJcbiAgICB9XHJcbiAgICBjb25zdCByYXcgPSBmaXJzdERheS50b0xvY2FsZURhdGVTdHJpbmcobG9jYWxlLCB7IG1vbnRoOiBcImxvbmdcIiB9KTtcclxuICAgIGNvbnN0IGZpcnN0ID0gcmF3LnNsaWNlKDAsIDEpO1xyXG4gICAgY29uc3QgcmVzdCA9IHJhdy5zbGljZSgxKTtcclxuICAgIHJldHVybiBgJHtmaXJzdC50b1VwcGVyQ2FzZSgpfSR7cmVzdH0gJHtjdXJyZW50WWVhcn1gO1xyXG4gIH0pKCk7XHJcblxyXG4gIGNvbnN0IHNhbWVEYXkgPSAoYSwgYikgPT5cclxuICAgIGEgJiYgYiAmJiBhLmdldEZ1bGxZZWFyKCkgPT09IGIuZ2V0RnVsbFllYXIoKSAmJiBhLmdldE1vbnRoKCkgPT09IGIuZ2V0TW9udGgoKSAmJiBhLmdldERhdGUoKSA9PT0gYi5nZXREYXRlKCk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZVNlbGVjdCA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKGRhdGVPYmopID0+IHtcclxuICAgICAgaWYgKGRpc2FibGVkKSByZXR1cm47XHJcbiAgICAgIGNvbnN0IGlzbyA9IHRvSVNPKGRhdGVPYmopO1xyXG4gICAgICBvbkNoYW5nZT8uKGlzbyk7XHJcbiAgICAgIHNldE9wZW4oZmFsc2UpO1xyXG4gICAgfSxcclxuICAgIFtkaXNhYmxlZCwgb25DaGFuZ2VdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgZ29Nb250aCA9IChpbmMpID0+IHtcclxuICAgIGlmIChkaXNhYmxlZCkgcmV0dXJuO1xyXG4gICAgbGV0IG0gPSBjdXJyZW50TW9udGggKyBpbmM7XHJcbiAgICBsZXQgeSA9IGN1cnJlbnRZZWFyO1xyXG4gICAgaWYgKG0gPiAxMSkge1xyXG4gICAgICBtID0gMDtcclxuICAgICAgeSArPSAxO1xyXG4gICAgfSBlbHNlIGlmIChtIDwgMCkge1xyXG4gICAgICBtID0gMTE7XHJcbiAgICAgIHkgLT0gMTtcclxuICAgIH1cclxuICAgIHNldEN1cnJlbnRNb250aChtKTtcclxuICAgIHNldEN1cnJlbnRZZWFyKHkpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IHZhbHVlQ29sb3IgPSByZWFkT25seU1vZGUgPyBcIiM2NDc0OGJcIiA6IFwiIzAwMjk2YmUwXCI7XG4gIGNvbnN0IGxhYmVsQ29sb3IgPSBcIiMwMDI5NmJlMFwiO1xuICBjb25zdCBjb250YWluZXJDbGFzcyA9IGBzcGFjZS15LTIgJHtkaXNhYmxlZCA/IFwicG9pbnRlci1ldmVudHMtbm9uZSBzZWxlY3Qtbm9uZVwiIDogXCJcIn1gLnRyaW0oKTtcbiAgY29uc3QgYnV0dG9uQ2xhc3MgPSBbXG4gICAgXCJmb3JtLWNvbnRyb2xcIixcbiAgICBcImZsZXggaXRlbXMtY2VudGVyXCIsXG4gICAgXCJwci0xMFwiLFxuICAgIHJlYWRPbmx5TW9kZSA/IFwiaW5kLXJlYWRvbmx5LWZpZWxkXCIgOiBcIlwiLFxuICAgIHJlYWRPbmx5TW9kZSA/IFwiY3Vyc29yLW5vdC1hbGxvd2VkXCIgOiBcImN1cnNvci1wb2ludGVyXCJcbiAgXS5maWx0ZXIoQm9vbGVhbikuam9pbihcIiBcIik7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT17Y29udGFpbmVyQ2xhc3N9IHJlZj17Y29udGFpbmVyUmVmfT5cbiAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb3JtLWxhYmVsIGZvbnQtc2VtaWJvbGRcIiBzdHlsZT17eyBjb2xvcjogbGFiZWxDb2xvciB9fT57U3RyaW5nKGVmZmVjdGl2ZUxhYmVsKX08L2xhYmVsPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZVwiPlxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgY2xhc3NOYW1lPXtidXR0b25DbGFzc31cbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICBpZiAocmVhZE9ubHlNb2RlKSByZXR1cm47XG4gICAgICAgICAgICBzZXRPcGVuKCh2KSA9PiAhdik7XG4gICAgICAgICAgfX1cbiAgICAgICAgICBvbktleURvd249eyhlKSA9PiB7XG4gICAgICAgICAgICBpZiAocmVhZE9ubHlNb2RlKSByZXR1cm47XG4gICAgICAgICAgICBpZiAoZS5rZXkgPT09IFwiRW50ZXJcIiB8fCBlLmtleSA9PT0gXCIgXCIpIHtcbiAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICBzZXRPcGVuKCh2KSA9PiAhdik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZS5rZXkgPT09IFwiRXNjYXBlXCIpIHNldE9wZW4oZmFsc2UpO1xuICAgICAgICAgIH19XG4gICAgICAgICAgYXJpYS1leHBhbmRlZD17b3Blbn1cbiAgICAgICAgICBhcmlhLWRpc2FibGVkPXtyZWFkT25seU1vZGUgPyBcInRydWVcIiA6IHVuZGVmaW5lZH1cbiAgICAgICAgPlxuICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGNvbG9yOiB2YWx1ZUNvbG9yLCBmb250V2VpZ2h0OiA0MDAgfX0+e2Zvcm1hdERpc3BsYXkoc2VsZWN0ZWREYXRlKX08L3NwYW4+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC15LTAgcmlnaHQtMCBmbGV4IGl0ZW1zLWNlbnRlciBwci0yIHRleHQtc2xhdGUtNTAwIHBvaW50ZXItZXZlbnRzLW5vbmVcIj5cbiAgICAgICAgICB7b3BlbiA/IDxDaGV2cm9uVXBTdmcgY2xhc3NOYW1lPVwiaC01IHctNVwiIC8+IDogPENoZXZyb25Eb3duU3ZnIGNsYXNzTmFtZT1cImgtNSB3LTVcIiAvPn1cbiAgICAgICAgPC9zcGFuPlxuICAgICAgICB7b3BlbiAmJiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkcnAtcG9wb3ZlclwiIHJvbGU9XCJkaWFsb2dcIiBhcmlhLW1vZGFsPVwidHJ1ZVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkcnAtaGVhZFwiPlxuICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJkcnAtbmF2XCIgYXJpYS1sYWJlbD17aW5kVChcIkhpc3RvcnlfUHJldk1vbnRoXCIsIFwiUHJldmlvdXMgbW9udGhcIil9IG9uQ2xpY2s9eygpID0+IGdvTW9udGgoLTEpfT5cbiAgICAgICAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBjbGFzc05hbWU9XCJoLTQgdy00XCIgZmlsbD1cIm5vbmVcIiB2aWV3Qm94PVwiMCAwIDMwIDMwXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCI+XG4gICAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgc3Ryb2tlV2lkdGg9XCIyXCIgZD1cIk0xNSAxOWwtNy03IDctN1wiIC8+XG4gICAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRycC1tb250aFwiPnttb250aExhYmVsfTwvZGl2PlxuICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJkcnAtbmF2XCIgYXJpYS1sYWJlbD17aW5kVChcIkhpc3RvcnlfTmV4dE1vbnRoXCIsIFwiTmV4dCBtb250aFwiKX0gb25DbGljaz17KCkgPT4gZ29Nb250aCgxKX0+XG4gICAgICAgICAgICAgICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgY2xhc3NOYW1lPVwiaC00IHctNFwiIGZpbGw9XCJub25lXCIgdmlld0JveD1cIjAgMCAzMCAzMFwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiPlxuICAgICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIHN0cm9rZVdpZHRoPVwiMlwiIGQ9XCJNOSA1bDcgNy03IDdcIiAvPlxuICAgICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkcnAtd2Vla2RheXNcIj5cbiAgICAgICAgICAgICAgPHNwYW4+e2luZFQoXCJIaXN0b3J5X0RheV9Nb25cIiwgXCJNb1wiKX08L3NwYW4+PHNwYW4+e2luZFQoXCJIaXN0b3J5X0RheV9UdWVcIiwgXCJUdVwiKX08L3NwYW4+PHNwYW4+e2luZFQoXCJIaXN0b3J5X0RheV9XZWRcIiwgXCJXZVwiKX08L3NwYW4+PHNwYW4+e2luZFQoXCJIaXN0b3J5X0RheV9UaHVcIiwgXCJUaFwiKX08L3NwYW4+PHNwYW4+e2luZFQoXCJIaXN0b3J5X0RheV9GcmlcIiwgXCJGclwiKX08L3NwYW4+PHNwYW4+e2luZFQoXCJIaXN0b3J5X0RheV9TYXRcIiwgXCJTYVwiKX08L3NwYW4+PHNwYW4+e2luZFQoXCJIaXN0b3J5X0RheV9TdW5cIiwgXCJTdVwiKX08L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZHJwLWdyaWRcIj5cbiAgICAgICAgICAgICAge0FycmF5LmZyb20oeyBsZW5ndGg6IG9mZnNldCB9KS5tYXAoKF8sIGkpID0+IChcbiAgICAgICAgICAgICAgICA8YnV0dG9uIGtleT17YGUtJHtpfWB9IGNsYXNzTmFtZT1cImRycC1kYXkgZW1wdHlcIiBkaXNhYmxlZCB0eXBlPVwiYnV0dG9uXCIgLz5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgIHtBcnJheS5mcm9tKHsgbGVuZ3RoOiBkYXlzSW5Nb250aCB9KS5tYXAoKF8sIGlkeCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRheSA9IGlkeCArIDE7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0ZU9iaiA9IG5ldyBEYXRlKGN1cnJlbnRZZWFyLCBjdXJyZW50TW9udGgsIGRheSk7XG4gICAgICAgICAgICAgICAgY29uc3QgaXNTZWxlY3RlZCA9IHNhbWVEYXkoZGF0ZU9iaiwgc2VsZWN0ZWREYXRlKTtcbiAgICAgICAgICAgICAgICBjb25zdCBpc1RvZGF5ID0gc2FtZURheShkYXRlT2JqLCBuZXcgRGF0ZSgpKTtcbiAgICAgICAgICAgICAgICBjb25zdCBjbHMgPSBbXG4gICAgICAgICAgICAgICAgICBcImRycC1kYXlcIixcbiAgICAgICAgICAgICAgICAgIGlzU2VsZWN0ZWQgPyBcInN0YXJ0IHJhbmdlLXN0YXJ0XCIgOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgaXNUb2RheSA/IFwidG9kYXlcIiA6IFwiXCJcbiAgICAgICAgICAgICAgICBdLmpvaW4oXCIgXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGtleT17dG9JU08oZGF0ZU9iail9XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2Nsc31cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlU2VsZWN0KGRhdGVPYmopfVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7ZGF5fVxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZHJwLXN0YXR1c1wiPntpbmRUKFwiRGF0ZVBpY2tlcl9TZWxlY3REYXRlXCIsIFwiU2VsZWN0IGRhdGVcIil9PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cclxuICApO1xyXG59XHJcbiIsICJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgRmxvYXRpbmdMaXN0IGZyb20gXCIuL0Zsb2F0aW5nTGlzdC50c3hcIjtcbmltcG9ydCB7IENoZXZyb25Eb3duU3ZnLCBDaGV2cm9uVXBTdmcgfSBmcm9tIFwiLi9jaGV2cm9ucy50c3hcIjtcbmltcG9ydCB7IHVzZU91dHNpZGVDbGljayB9IGZyb20gXCIuLi8uLi9ob29rcy91c2VPdXRzaWRlQ2xpY2sudHNcIjtcbmltcG9ydCB7IGNsYXNzTmFtZXMgfSBmcm9tIFwiLi4vLi4vdXRpbHMvY2xhc3NOYW1lcy50c1wiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5cbnR5cGUgUmF3T3B0aW9uID0geyB2YWx1ZT86IHN0cmluZyB8IG51bWJlcjsgVmFsdWU/OiBzdHJpbmcgfCBudW1iZXI7IHRleHQ/OiBzdHJpbmc7IFRleHQ/OiBzdHJpbmcgfSB8IFtzdHJpbmcgfCBudW1iZXIsIHN0cmluZ107XG5cbnR5cGUgU2VsZWN0Q29tYm9ib3hQcm9wcyA9IHtcbiAgbGFiZWw6IHN0cmluZztcbiAgb3B0aW9uczogUmF3T3B0aW9uW107XG4gIHZhbHVlOiBzdHJpbmcgfCBudW1iZXI7XG4gIG9uQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgcGxhY2Vob2xkZXI/OiBzdHJpbmc7XG4gIGludmFsaWQ/OiBib29sZWFuO1xuICBkaXNhYmxlZD86IGJvb2xlYW47XG4gIHJlYWRPbmx5PzogYm9vbGVhbjtcbiAgdXNlUG9ydGFsPzogYm9vbGVhbjtcbiAgZW1pdE9uVmFsdWVDaGFuZ2U/OiBib29sZWFuO1xuICBpZEJhc2U/OiBzdHJpbmc7XG4gIHBvcnRhbENsYXNzTmFtZT86IHN0cmluZztcbiAgcGFuZWxDbGFzc05hbWU/OiBzdHJpbmc7XG59O1xuXG4vLyBSZXVzYWJsZSBzZWxlY3QgY29tYm9ib3ggd2l0aCBvcHRpb25hbCBwb3J0YWwgcmVuZGVyaW5nIGZvciB0aGUgbGlzdC5cbmNvbnN0IFNlbGVjdENvbWJvYm94ID0gKHtcbiAgbGFiZWwsXG4gIG9wdGlvbnMsXG4gIHZhbHVlLFxuICBvbkNoYW5nZSxcbiAgcGxhY2Vob2xkZXIsXG4gIGludmFsaWQgPSBmYWxzZSxcbiAgZGlzYWJsZWQgPSBmYWxzZSxcbiAgcmVhZE9ubHkgPSBmYWxzZSxcbiAgdXNlUG9ydGFsID0gdHJ1ZSxcbiAgZW1pdE9uVmFsdWVDaGFuZ2UgPSBmYWxzZSxcbiAgaWRCYXNlLFxuICBwb3J0YWxDbGFzc05hbWUsXG4gIHBhbmVsQ2xhc3NOYW1lLFxufTogU2VsZWN0Q29tYm9ib3hQcm9wcykgPT4ge1xuICBjb25zdCByZWFkT25seU1vZGUgPSByZWFkT25seSB8fCBkaXNhYmxlZDtcbiAgY29uc3QgdmFsdWVDb2xvciA9IHJlYWRPbmx5TW9kZSA/IFwiIzY0NzQ4YlwiIDogXCIjMDAyOTZiZTBcIjtcbiAgY29uc3QgZGF0YSA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIHJldHVybiAob3B0aW9ucyB8fCBbXSkubWFwKChvKSA9PiB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShvKSkge1xuICAgICAgICByZXR1cm4geyB2YWx1ZTogb1swXSA/PyBcIlwiLCB0ZXh0OiBvWzFdID8/IFwiXCIgfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7IHZhbHVlOiBvPy52YWx1ZSA/PyBvPy5WYWx1ZSA/PyBcIlwiLCB0ZXh0OiBvPy50ZXh0ID8/IG8/LlRleHQgPz8gXCJcIiB9O1xuICAgIH0pO1xuICB9LCBbb3B0aW9uc10pO1xuXG4gIGNvbnN0IFtxdWVyeSwgc2V0UXVlcnldID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtzZWxlY3RlZCwgc2V0U2VsZWN0ZWRdID0gdXNlU3RhdGUoXG4gICAgZGF0YS5maW5kKChkKSA9PiBTdHJpbmcoZC52YWx1ZSkgPT09IFN0cmluZyh2YWx1ZSkpIHx8IGRhdGFbMF0gfHwgeyB2YWx1ZTogXCJcIiwgdGV4dDogXCJcIiB9XG4gICk7XG4gIGNvbnN0IFtvcGVuLCBzZXRPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2FjdGl2ZUluZGV4LCBzZXRBY3RpdmVJbmRleF0gPSB1c2VTdGF0ZSgwKTtcbiAgY29uc3QgY29udGFpbmVyUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IGJveFJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBsaXN0UmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XG5cbiAgdXNlT3V0c2lkZUNsaWNrKFtjb250YWluZXJSZWYsIGxpc3RSZWZdLCAoKSA9PiBzZXRPcGVuKGZhbHNlKSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBzZXRTZWxlY3RlZChkYXRhLmZpbmQoKGQpID0+IFN0cmluZyhkLnZhbHVlKSA9PT0gU3RyaW5nKHZhbHVlKSkgfHwgZGF0YVswXSB8fCB7IHZhbHVlOiBcIlwiLCB0ZXh0OiBcIlwiIH0pO1xuICB9LCBbdmFsdWUsIGRhdGFdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHNldFF1ZXJ5KFwiXCIpO1xuICB9LCBbc2VsZWN0ZWRdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghZW1pdE9uVmFsdWVDaGFuZ2UpIHJldHVybjtcbiAgICBvbkNoYW5nZShzZWxlY3RlZD8udmFsdWUgPyBTdHJpbmcoc2VsZWN0ZWQudmFsdWUpIDogXCJcIik7XG4gIH0sIFtlbWl0T25WYWx1ZUNoYW5nZSwgb25DaGFuZ2UsIHNlbGVjdGVkXSk7XG5cbiAgY29uc3QgZmlsdGVyZWQgPSB1c2VNZW1vKCgpID0+IHtcbiAgICBpZiAoIXF1ZXJ5LnRyaW0oKSkgcmV0dXJuIGRhdGE7XG4gICAgY29uc3QgZiA9IGRhdGEuZmlsdGVyKChvKSA9PiBvLnRleHQudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhxdWVyeS50b0xvd2VyQ2FzZSgpKSk7XG4gICAgcmV0dXJuIGYubGVuZ3RoID8gZiA6IGRhdGE7XG4gIH0sIFtkYXRhLCBxdWVyeV0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc2V0QWN0aXZlSW5kZXgoMCk7XG4gIH0sIFtmaWx0ZXJlZC5sZW5ndGgsIHF1ZXJ5XSk7XG5cbiAgY29uc3Qgc2VsZWN0T3B0aW9uID0gKG9wdDogeyB2YWx1ZTogc3RyaW5nIHwgbnVtYmVyOyB0ZXh0OiBzdHJpbmcgfSkgPT4ge1xuICAgIHNldFNlbGVjdGVkKG9wdCk7XG4gICAgc2V0UXVlcnkoXCJcIik7XG4gICAgc2V0T3BlbihmYWxzZSk7XG4gICAgaWYgKCFlbWl0T25WYWx1ZUNoYW5nZSkge1xuICAgICAgb25DaGFuZ2Uob3B0Py52YWx1ZSA/IFN0cmluZyhvcHQudmFsdWUpIDogXCJcIik7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUtleURvd24gPSAoZXY6IFJlYWN0LktleWJvYXJkRXZlbnQ8SFRNTElucHV0RWxlbWVudD4pID0+IHtcbiAgICBpZiAoZGlzYWJsZWQpIHJldHVybjtcbiAgICBpZiAoZXYua2V5ID09PSBcIkFycm93RG93blwiKSB7XG4gICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgc2V0T3Blbih0cnVlKTtcbiAgICAgIGlmIChmaWx0ZXJlZC5sZW5ndGgpIHNldEFjdGl2ZUluZGV4KChpZHgpID0+IChpZHggKyAxKSAlIGZpbHRlcmVkLmxlbmd0aCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChldi5rZXkgPT09IFwiQXJyb3dVcFwiKSB7XG4gICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgc2V0T3Blbih0cnVlKTtcbiAgICAgIGlmIChmaWx0ZXJlZC5sZW5ndGgpIHNldEFjdGl2ZUluZGV4KChpZHgpID0+IChpZHggLSAxICsgZmlsdGVyZWQubGVuZ3RoKSAlIGZpbHRlcmVkLmxlbmd0aCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChldi5rZXkgPT09IFwiRW50ZXJcIikge1xuICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGlmIChvcGVuICYmIGZpbHRlcmVkLmxlbmd0aCkge1xuICAgICAgICBzZWxlY3RPcHRpb24oZmlsdGVyZWRbYWN0aXZlSW5kZXhdID8/IGZpbHRlcmVkWzBdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNldE9wZW4odHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChldi5rZXkgPT09IFwiRXNjYXBlXCIpIHNldE9wZW4oZmFsc2UpO1xuICB9O1xuXG4gIGNvbnN0IHNhZmVJZCA9IFN0cmluZyhpZEJhc2UgfHwgbGFiZWwgfHwgXCJzZWxlY3RcIik7XG4gIGNvbnN0IGxpc3RJZCA9IGBzZWxlY3Qtb3B0aW9ucy0ke3NhZmVJZH1gO1xuICBjb25zdCBhY3RpdmVJZCA9IG9wZW4gJiYgZmlsdGVyZWRbYWN0aXZlSW5kZXhdID8gYHNlbGVjdC1vcHQtJHtzYWZlSWR9LSR7ZmlsdGVyZWRbYWN0aXZlSW5kZXhdLnZhbHVlfWAgOiB1bmRlZmluZWQ7XG4gIGNvbnN0IGxpc3RPcGVuID0gb3BlbiAmJiAhZGlzYWJsZWQ7XG5cbiAgY29uc3QgbGlzdEJvZHkgPSAoXG4gICAgPGRpdiBpZD17bGlzdElkfSByZWY9e2xpc3RSZWZ9IHJvbGU9XCJsaXN0Ym94XCIgYXJpYS1sYWJlbD17bGFiZWx9PlxuICAgICAge2ZpbHRlcmVkLmxlbmd0aCA9PT0gMCAmJiA8ZGl2IGNsYXNzTmFtZT1cInB4LTQgcHktMiB0ZXh0LXNtIHRleHQtc2xhdGUtNTAwXCI+e2luZFQoXCJEcm9wZG93bl9Ob1Jlc3VsdHNcIiwgXCJObyByZXN1bHRzXCIpfTwvZGl2Pn1cbiAgICAgIHtmaWx0ZXJlZC5tYXAoKG9wdCwgaWR4KSA9PiB7XG4gICAgICAgIGNvbnN0IHNlbCA9IHNlbGVjdGVkPy52YWx1ZSA9PT0gb3B0LnZhbHVlO1xuICAgICAgICBjb25zdCBpc0FjdGl2ZSA9IGlkeCA9PT0gYWN0aXZlSW5kZXg7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICBrZXk9e1N0cmluZyhvcHQudmFsdWUpfVxuICAgICAgICAgICAgaWQ9e2BzZWxlY3Qtb3B0LSR7c2FmZUlkfS0ke29wdC52YWx1ZX1gfVxuICAgICAgICAgICAgcm9sZT1cIm9wdGlvblwiXG4gICAgICAgICAgICBhcmlhLXNlbGVjdGVkPXtzZWx9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICAgIFwicmVsYXRpdmUgZmxleCB3LWZ1bGwgY3Vyc29yLWRlZmF1bHQgc2VsZWN0LW5vbmUgaXRlbXMtY2VudGVyIHB5LTIgcHItMyB0ZXh0LWxlZnQgdGV4dC1zbSB0eXBlLW9wdGlvblwiLFxuICAgICAgICAgICAgICBpc0FjdGl2ZSA/IFwiYmctcHJpbWFyeSB0ZXh0LXdoaXRlXCIgOiBcInRleHQtc2xhdGUtOTAwXCJcbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICBvbk1vdXNlRW50ZXI9eygpID0+IHNldEFjdGl2ZUluZGV4KGlkeCl9XG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZWxlY3RPcHRpb24ob3B0KX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7c2VsICYmIChcbiAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICAgICAgICBcImFic29sdXRlIGluc2V0LXktMCBsZWZ0LTAgZmxleCBpdGVtcy1jZW50ZXIgcGwtMlwiLFxuICAgICAgICAgICAgICAgICAgaXNBY3RpdmUgPyBcInRleHQtd2hpdGVcIiA6IFwidGV4dC1wcmltYXJ5XCJcbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA+PC9zcGFuPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcImJsb2NrIHRydW5jYXRlXCIsIHNlbCA/IFwiZm9udC1tZWRpdW1cIiA6IFwiZm9udC1ub3JtYWxcIil9PntvcHQudGV4dH08L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICk7XG4gICAgICB9KX1cbiAgICA8L2Rpdj5cbiAgKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcInNwYWNlLXktMlwiLCBkaXNhYmxlZCA/IFwicG9pbnRlci1ldmVudHMtbm9uZSBzZWxlY3Qtbm9uZVwiIDogXCJcIil9XG4gICAgICByZWY9e2NvbnRhaW5lclJlZn1cbiAgICA+XG4gICAgICA8bGFiZWwgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFwiZm9ybS1sYWJlbCBmb250LXNlbWlib2xkXCIsIGludmFsaWQgPyBcInRleHQtcm9zZS03MDBcIiA6IFwiXCIpfT57bGFiZWx9PC9sYWJlbD5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmVcIj5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIHJlZj17Ym94UmVmfVxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgICAgIFwicmVsYXRpdmUgdy1mdWxsIGN1cnNvci1kZWZhdWx0IHJvdW5kZWQteGwgYmctd2hpdGUgdGV4dC1sZWZ0IGZvY3VzLXdpdGhpbjpib3JkZXItcHJpbWFyeSBmb2N1cy13aXRoaW46cmluZy0yIGZvY3VzLXdpdGhpbjpyaW5nLXByaW1hcnkgZm9jdXMtd2l0aGluOnJpbmctb2Zmc2V0LXdoaXRlIHNtOnRleHQtc21cIixcbiAgICAgICAgICAgIHJlYWRPbmx5TW9kZSA/IFwiaW5kLXJlYWRvbmx5LWZpZWxkXCIgOiBcIlwiXG4gICAgICAgICAgKX1cbiAgICAgICAgICBzdHlsZT17cmVhZE9ubHlNb2RlID8geyBjb2xvcjogdmFsdWVDb2xvciB9IDogdW5kZWZpbmVkfVxuICAgICAgICA+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICAgIFwidy1mdWxsIHJvdW5kZWQteGwgYm9yZGVyIHB4LTMgcHktMiBwci0xMCB0ZXh0LXNtIHNtOnRleHQtYmFzZSBsZWFkaW5nLTUgZm9jdXM6b3V0bGluZS1oaWRkZW4gZm9jdXM6cmluZy0yIGRpc2FibGVkOmJnLXNsYXRlLTEwMCBkaXNhYmxlZDp0ZXh0LXNsYXRlLTUwMCBkaXNhYmxlZDpib3JkZXItc2xhdGUtMjAwIGRpc2FibGVkOmN1cnNvci1ub3QtYWxsb3dlZFwiLFxuICAgICAgICAgICAgICBpbnZhbGlkXG4gICAgICAgICAgICAgICAgPyBcImJvcmRlci1yb3NlLTQwMCBiZy1yb3NlLTUwIGZvY3VzOnJpbmctcm9zZS0yMDAgZm9jdXM6Ym9yZGVyLXJvc2UtNDAwXCJcbiAgICAgICAgICAgICAgICA6IFwiYm9yZGVyLXNsYXRlLTIwMCBmb2N1czpyaW5nLXByaW1hcnkgZm9jdXM6Ym9yZGVyLXByaW1hcnlcIixcbiAgICAgICAgICAgICAgcmVhZE9ubHlNb2RlID8gXCJpbmQtcmVhZG9ubHktZmllbGRcIiA6IFwidGV4dC1zbGF0ZS05MDBcIlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIHN0eWxlPXtyZWFkT25seU1vZGUgPyB7IGNvbG9yOiB2YWx1ZUNvbG9yIH0gOiB1bmRlZmluZWR9XG4gICAgICAgICAgICB2YWx1ZT17cXVlcnkgfHwgc2VsZWN0ZWQ/LnRleHQgfHwgXCJcIn1cbiAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgdmFsID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgICAgICAgICAgICBzZXRRdWVyeSh2YWwpO1xuICAgICAgICAgICAgICBzZXRPcGVuKHRydWUpO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIG9uS2V5RG93bj17aGFuZGxlS2V5RG93bn1cbiAgICAgICAgICAgIG9uRm9jdXM9eygpID0+IHtcbiAgICAgICAgICAgICAgaWYgKCFkaXNhYmxlZCkgc2V0T3Blbih0cnVlKTtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XG4gICAgICAgICAgICByb2xlPVwiY29tYm9ib3hcIlxuICAgICAgICAgICAgYXJpYS1leHBhbmRlZD17bGlzdE9wZW59XG4gICAgICAgICAgICBhcmlhLWNvbnRyb2xzPXtsaXN0SWR9XG4gICAgICAgICAgICBhcmlhLWFjdGl2ZWRlc2NlbmRhbnQ9e2FjdGl2ZUlkfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC15LTAgcmlnaHQtMCBmbGV4IGl0ZW1zLWNlbnRlciBwci0yIHRleHQtc2xhdGUtNTAwIGhvdmVyOnRleHQtc2xhdGUtNjAwXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgaWYgKGRpc2FibGVkKSByZXR1cm47XG4gICAgICAgICAgICAgIHNldE9wZW4oKHByZXYpID0+ICFwcmV2KTtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBhcmlhLWxhYmVsPXtvcGVuID8gaW5kVChcIkRyb3Bkb3duX0hpZGVPcHRpb25zXCIsIFwiSGlkZSBvcHRpb25zXCIpIDogaW5kVChcIkRyb3Bkb3duX1Nob3dPcHRpb25zXCIsIFwiU2hvdyBvcHRpb25zXCIpfVxuICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtvcGVuID8gPENoZXZyb25VcFN2ZyBjbGFzc05hbWU9XCJoLTUgdy01XCIgLz4gOiA8Q2hldnJvbkRvd25TdmcgY2xhc3NOYW1lPVwiaC01IHctNVwiIC8+fVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAge3VzZVBvcnRhbCA/IChcbiAgICAgICAgICA8RmxvYXRpbmdMaXN0XG4gICAgICAgICAgICBhbmNob3JSZWY9e2JveFJlZn1cbiAgICAgICAgICAgIG9wZW49e2xpc3RPcGVufVxuICAgICAgICAgICAgekluZGV4PXszNjAwMDB9XG4gICAgICAgICAgICBtYXhIZWlnaHRDbGFzcz1cIm1heC1oLTcyXCJcbiAgICAgICAgICAgIHJvbGU9XCJsaXN0Ym94XCJcbiAgICAgICAgICAgIHJvdW5kZWRDbGFzcz1cInJvdW5kZWQteGxcIlxuICAgICAgICAgICAgcG9ydGFsQ2xhc3NOYW1lPXtwb3J0YWxDbGFzc05hbWV9XG4gICAgICAgICAgICBwYW5lbENsYXNzTmFtZT17cGFuZWxDbGFzc05hbWV9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge2xpc3RCb2R5fVxuICAgICAgICAgIDwvRmxvYXRpbmdMaXN0PlxuICAgICAgICApIDogKFxuICAgICAgICAgIGxpc3RPcGVuICYmIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgei0zNjAwMDAgbXQtMSB3LWZ1bGwgcm91bmRlZC14bCBiZy13aGl0ZSBzaGFkb3ctbGcgcmluZy0xIHJpbmctYmxhY2svNSBmb2N1czpvdXRsaW5lLWhpZGRlbiBtYXgtaC03MiBvdmVyZmxvdy1hdXRvXCI+XG4gICAgICAgICAgICAgIHtsaXN0Qm9keX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIClcbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgU2VsZWN0Q29tYm9ib3g7XG4iLCAidHlwZSBWaXNpdE9wdGlvbiA9IHtcbiAgdmFsdWU/OiBzdHJpbmcgfCBudW1iZXI7XG4gIHRleHQ/OiBzdHJpbmc7XG4gIFZhbHVlPzogc3RyaW5nIHwgbnVtYmVyO1xuICBUZXh0Pzogc3RyaW5nO1xufTtcblxuZXhwb3J0IGNvbnN0IHVzZVZpc2l0YXMgPSAoKSA9PiB7XG4gIGNvbnN0IHZpc2l0VHlwZXMgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3cuX19WSVNJVF9UWVBFU19fKSB8fCBbXTtcbiAgY29uc3QgYXNpc3RlbnRlVGlwb3MgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3cuX19BU0lTVEVOVEVfVElQT1NfXykgfHwgW107XG5cbiAgcmV0dXJuIHtcbiAgICB2aXNpdFR5cGVzOiB2aXNpdFR5cGVzIGFzIFZpc2l0T3B0aW9uW10sXG4gICAgYXNpc3RlbnRlVGlwb3M6IGFzaXN0ZW50ZVRpcG9zIGFzIFZpc2l0T3B0aW9uW10sXG4gIH07XG59O1xuIiwgImNvbnN0IFBSRVZJRVdfTUFYX0hFSUdIVF9SQVRJTyA9IDAuODtcbmNvbnN0IFBSRVZJRVdfQkFTRV9GT05UID0gMTM7XG5jb25zdCBQUkVWSUVXX01JTl9GT05UID0gMTE7XG5cbmxldCBwcmV2aWV3QW5jaG9yOiBIVE1MRWxlbWVudCB8IG51bGwgPSBudWxsO1xubGV0IHByZXZpZXdDbG9zZUJvdW5kID0gZmFsc2U7XG5cbmV4cG9ydCBjb25zdCBzZXRQcmV2aWV3QW5jaG9yID0gKGFuY2hvcjogSFRNTEVsZW1lbnQgfCBudWxsKSA9PiB7XG4gIHByZXZpZXdBbmNob3IgPSBhbmNob3I7XG59O1xuXG5jb25zdCBlbnN1cmVQcmV2aWV3VG9vbHRpcCA9ICgpOiBIVE1MRWxlbWVudCA9PiB7XG4gIGxldCB0b29sdGlwRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImluZFByZXZpZXdUb29sdGlwXCIpIGFzIEhUTUxFbGVtZW50IHwgbnVsbDtcbiAgaWYgKHRvb2x0aXBFbCkgcmV0dXJuIHRvb2x0aXBFbDtcbiAgdG9vbHRpcEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgdG9vbHRpcEVsLmlkID0gXCJpbmRQcmV2aWV3VG9vbHRpcFwiO1xuICB0b29sdGlwRWwuY2xhc3NOYW1lID0gXCJpbmQtcHJldmlldy10b29sdGlwXCI7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodG9vbHRpcEVsKTtcbiAgcmV0dXJuIHRvb2x0aXBFbDtcbn07XG5cbmNvbnN0IGVuc3VyZVByZXZpZXdBdXRvQ2xvc2UgPSAoKSA9PiB7XG4gIGlmIChwcmV2aWV3Q2xvc2VCb3VuZCkgcmV0dXJuO1xuICBwcmV2aWV3Q2xvc2VCb3VuZCA9IHRydWU7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgXCJwb2ludGVyZG93blwiLFxuICAgIChldmVudCkgPT4ge1xuICAgICAgY29uc3QgdG9vbHRpcEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbmRQcmV2aWV3VG9vbHRpcFwiKTtcbiAgICAgIGlmICghdG9vbHRpcEVsIHx8ICF0b29sdGlwRWwuY2xhc3NMaXN0LmNvbnRhaW5zKFwidmlzaWJsZVwiKSkgcmV0dXJuO1xuICAgICAgaWYgKHByZXZpZXdBbmNob3IgJiYgcHJldmlld0FuY2hvci5jb250YWlucyhldmVudC50YXJnZXQgYXMgTm9kZSkpIHJldHVybjtcbiAgICAgIGhpZGVQcmV2aWV3VG9vbHRpcCgpO1xuICAgIH0sXG4gICAgdHJ1ZVxuICApO1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCAoZXZlbnQpID0+IHtcbiAgICBpZiAoZXZlbnQua2V5ID09PSBcIkVzY2FwZVwiKSBoaWRlUHJldmlld1Rvb2x0aXAoKTtcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3Qgc2hvd1ByZXZpZXdUb29sdGlwID0gKHRleHQ6IHN0cmluZywgY2xpZW50WTogbnVtYmVyKTogYm9vbGVhbiA9PiB7XG4gIGlmICghdGV4dCkgcmV0dXJuIGZhbHNlO1xuICBjb25zdCB0b29sdGlwRWwgPSBlbnN1cmVQcmV2aWV3VG9vbHRpcCgpO1xuICB0b29sdGlwRWwudGV4dENvbnRlbnQgPSB0ZXh0O1xuICB0b29sdGlwRWwuY2xhc3NMaXN0LmFkZChcInZpc2libGVcIik7XG4gIHByZXZpZXdBbmNob3IgPSBudWxsO1xuICBlbnN1cmVQcmV2aWV3QXV0b0Nsb3NlKCk7XG5cbiAgY29uc3QgY2VudGVyWCA9IE1hdGgucm91bmQod2luZG93LmlubmVyV2lkdGggLyAyKTtcbiAgdG9vbHRpcEVsLnN0eWxlLmxlZnQgPSBgJHtjZW50ZXJYfXB4YDtcblxuICBjb25zdCBtYXJnaW4gPSAxMjtcbiAgdG9vbHRpcEVsLnN0eWxlLm1heEhlaWdodCA9IGAke01hdGgucm91bmQod2luZG93LmlubmVySGVpZ2h0ICogUFJFVklFV19NQVhfSEVJR0hUX1JBVElPKX1weGA7XG4gIHRvb2x0aXBFbC5zdHlsZS5vdmVyZmxvd1kgPSBcImF1dG9cIjtcblxuICBsZXQgZm9udFNpemUgPSBQUkVWSUVXX0JBU0VfRk9OVDtcbiAgdG9vbHRpcEVsLnN0eWxlLmZvbnRTaXplID0gYCR7Zm9udFNpemV9cHhgO1xuICBsZXQgcmVjdCA9IHRvb2x0aXBFbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgY29uc3QgbWF4SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0ICogUFJFVklFV19NQVhfSEVJR0hUX1JBVElPO1xuICB3aGlsZSAocmVjdC5oZWlnaHQgPiBtYXhIZWlnaHQgJiYgZm9udFNpemUgPiBQUkVWSUVXX01JTl9GT05UKSB7XG4gICAgZm9udFNpemUgLT0gMTtcbiAgICB0b29sdGlwRWwuc3R5bGUuZm9udFNpemUgPSBgJHtmb250U2l6ZX1weGA7XG4gICAgcmVjdCA9IHRvb2x0aXBFbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgfVxuXG4gIGNvbnN0IGNlbnRlclkgPSBNYXRoLnJvdW5kKCh3aW5kb3cuaW5uZXJIZWlnaHQgLSByZWN0LmhlaWdodCkgLyAyKTtcbiAgbGV0IHRvcCA9IE51bWJlci5pc0Zpbml0ZShjZW50ZXJZKSA/IGNlbnRlclkgOiBtYXJnaW47XG4gIGNvbnN0IG1pblRvcCA9IG1hcmdpbjtcbiAgY29uc3QgbWF4VG9wID0gTWF0aC5tYXgobWFyZ2luLCB3aW5kb3cuaW5uZXJIZWlnaHQgLSByZWN0LmhlaWdodCAtIG1hcmdpbik7XG4gIGlmICh0b3AgPCBtaW5Ub3ApIHRvcCA9IG1pblRvcDtcbiAgaWYgKHRvcCA+IG1heFRvcCkgdG9wID0gbWF4VG9wO1xuICB0b29sdGlwRWwuc3R5bGUudG9wID0gYCR7TWF0aC5yb3VuZCh0b3ApfXB4YDtcbiAgcmV0dXJuIHRydWU7XG59O1xuXG5leHBvcnQgY29uc3QgaGlkZVByZXZpZXdUb29sdGlwID0gKCkgPT4ge1xuICBjb25zdCB0b29sdGlwRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImluZFByZXZpZXdUb29sdGlwXCIpO1xuICBpZiAoIXRvb2x0aXBFbCkgcmV0dXJuO1xuICB0b29sdGlwRWwuY2xhc3NMaXN0LnJlbW92ZShcInZpc2libGVcIik7XG4gIHByZXZpZXdBbmNob3IgPSBudWxsO1xufTtcblxuZXhwb3J0IGNvbnN0IGlzT3ZlcmZsb3dpbmcgPSAoZWw6IEhUTUxFbGVtZW50IHwgbnVsbCk6IGJvb2xlYW4gPT4ge1xuICBpZiAoIWVsKSByZXR1cm4gZmFsc2U7XG4gIHJldHVybiBlbC5zY3JvbGxXaWR0aCA+IGVsLmNsaWVudFdpZHRoICsgMSB8fCBlbC5zY3JvbGxIZWlnaHQgPiBlbC5jbGllbnRIZWlnaHQgKyAxO1xufTtcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBoaWRlUHJldmlld1Rvb2x0aXAgfSBmcm9tIFwiLi4vdXRpbHMvcHJldmlld1Rvb2x0aXAudHNcIjtcblxudHlwZSBUYXBIYW5kbGVyID0gKGV2ZW50OiBSZWFjdC5Qb2ludGVyRXZlbnQpID0+IHZvaWQ7XG50eXBlIEhvbGRIYW5kbGVyID0gKHRhcmdldDogSFRNTEVsZW1lbnQsIGNsaWVudFk6IG51bWJlcikgPT4gYm9vbGVhbiB8IHZvaWQ7XG5cbnR5cGUgT3B0aW9ucyA9IHtcbiAgbW92ZVB4PzogbnVtYmVyO1xuICBob2xkTXM/OiBudW1iZXI7XG59O1xuXG5jb25zdCBERUZBVUxUX01PVkVfUFggPSAxNDtcbmNvbnN0IERFRkFVTFRfSE9MRF9NUyA9IDE2MDtcblxuZXhwb3J0IGNvbnN0IHVzZVRhcEd1YXJkID0gKG9uVGFwOiBUYXBIYW5kbGVyLCBvbkhvbGRTdGFydD86IEhvbGRIYW5kbGVyLCBvcHRpb25zPzogT3B0aW9ucykgPT4ge1xuICBjb25zdCBtb3ZlUHggPSBvcHRpb25zPy5tb3ZlUHggPz8gREVGQVVMVF9NT1ZFX1BYO1xuICBjb25zdCBob2xkTXMgPSBvcHRpb25zPy5ob2xkTXMgPz8gREVGQVVMVF9IT0xEX01TO1xuXG4gIGNvbnN0IHN0YXRlUmVmID0gUmVhY3QudXNlUmVmKHtcbiAgICBhY3RpdmU6IGZhbHNlLFxuICAgIHBvaW50ZXJJZDogbnVsbCBhcyBudW1iZXIgfCBudWxsLFxuICAgIHN0YXJ0WDogMCxcbiAgICBzdGFydFk6IDAsXG4gICAgbW92ZWQ6IGZhbHNlLFxuICAgIGhlbGQ6IGZhbHNlLFxuICAgIHRhcmdldDogbnVsbCBhcyBIVE1MRWxlbWVudCB8IG51bGwsXG4gIH0pO1xuICBjb25zdCBob2xkVGltZXJSZWYgPSBSZWFjdC51c2VSZWY8bnVtYmVyIHwgbnVsbD4obnVsbCk7XG5cbiAgY29uc3QgcmVzZXQgPSBSZWFjdC51c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKGhvbGRUaW1lclJlZi5jdXJyZW50KSB7XG4gICAgICBjbGVhclRpbWVvdXQoaG9sZFRpbWVyUmVmLmN1cnJlbnQpO1xuICAgICAgaG9sZFRpbWVyUmVmLmN1cnJlbnQgPSBudWxsO1xuICAgIH1cbiAgICBzdGF0ZVJlZi5jdXJyZW50LmFjdGl2ZSA9IGZhbHNlO1xuICAgIHN0YXRlUmVmLmN1cnJlbnQucG9pbnRlcklkID0gbnVsbDtcbiAgICBzdGF0ZVJlZi5jdXJyZW50Lm1vdmVkID0gZmFsc2U7XG4gICAgc3RhdGVSZWYuY3VycmVudC5oZWxkID0gZmFsc2U7XG4gICAgc3RhdGVSZWYuY3VycmVudC50YXJnZXQgPSBudWxsO1xuICB9LCBbXSk7XG5cbiAgY29uc3Qgb25Qb2ludGVyRG93biA9IFJlYWN0LnVzZUNhbGxiYWNrKFxuICAgIChldmVudDogUmVhY3QuUG9pbnRlckV2ZW50KSA9PiB7XG4gICAgICBpZiAoZXZlbnQucG9pbnRlclR5cGUgPT09IFwibW91c2VcIiAmJiBldmVudC5idXR0b24gIT09IDApIHJldHVybjtcbiAgICAgIHN0YXRlUmVmLmN1cnJlbnQuYWN0aXZlID0gdHJ1ZTtcbiAgICAgIHN0YXRlUmVmLmN1cnJlbnQucG9pbnRlcklkID0gZXZlbnQucG9pbnRlcklkO1xuICAgICAgc3RhdGVSZWYuY3VycmVudC5zdGFydFggPSBldmVudC5jbGllbnRYO1xuICAgICAgc3RhdGVSZWYuY3VycmVudC5zdGFydFkgPSBldmVudC5jbGllbnRZO1xuICAgICAgc3RhdGVSZWYuY3VycmVudC5tb3ZlZCA9IGZhbHNlO1xuICAgICAgc3RhdGVSZWYuY3VycmVudC5oZWxkID0gZmFsc2U7XG4gICAgICBzdGF0ZVJlZi5jdXJyZW50LnRhcmdldCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQgYXMgSFRNTEVsZW1lbnQ7XG5cbiAgICAgIGlmIChvbkhvbGRTdGFydCkge1xuICAgICAgICBpZiAoaG9sZFRpbWVyUmVmLmN1cnJlbnQpIHtcbiAgICAgICAgICBjbGVhclRpbWVvdXQoaG9sZFRpbWVyUmVmLmN1cnJlbnQpO1xuICAgICAgICB9XG4gICAgICAgIGhvbGRUaW1lclJlZi5jdXJyZW50ID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHN0YXRlID0gc3RhdGVSZWYuY3VycmVudDtcbiAgICAgICAgICBpZiAoIXN0YXRlLmFjdGl2ZSB8fCBzdGF0ZS5tb3ZlZCB8fCAhc3RhdGUudGFyZ2V0KSByZXR1cm47XG4gICAgICAgICAgY29uc3QgZGlkU2hvdyA9IG9uSG9sZFN0YXJ0KHN0YXRlLnRhcmdldCwgc3RhdGUuc3RhcnRZKTtcbiAgICAgICAgICBzdGF0ZS5oZWxkID0gZGlkU2hvdyA9PT0gdHJ1ZTtcbiAgICAgICAgfSwgaG9sZE1zKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIFtvbkhvbGRTdGFydCwgaG9sZE1zXVxuICApO1xuXG4gIGNvbnN0IG9uUG9pbnRlck1vdmUgPSBSZWFjdC51c2VDYWxsYmFjayhcbiAgICAoZXZlbnQ6IFJlYWN0LlBvaW50ZXJFdmVudCkgPT4ge1xuICAgICAgY29uc3Qgc3RhdGUgPSBzdGF0ZVJlZi5jdXJyZW50O1xuICAgICAgaWYgKCFzdGF0ZS5hY3RpdmUgfHwgc3RhdGUucG9pbnRlcklkICE9PSBldmVudC5wb2ludGVySWQpIHJldHVybjtcbiAgICAgIGNvbnN0IGR4ID0gTWF0aC5hYnMoZXZlbnQuY2xpZW50WCAtIHN0YXRlLnN0YXJ0WCk7XG4gICAgICBjb25zdCBkeSA9IE1hdGguYWJzKGV2ZW50LmNsaWVudFkgLSBzdGF0ZS5zdGFydFkpO1xuICAgICAgaWYgKGR4ID4gbW92ZVB4IHx8IGR5ID4gbW92ZVB4KSB7XG4gICAgICAgIHN0YXRlLm1vdmVkID0gdHJ1ZTtcbiAgICAgICAgaWYgKGhvbGRUaW1lclJlZi5jdXJyZW50KSB7XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KGhvbGRUaW1lclJlZi5jdXJyZW50KTtcbiAgICAgICAgICBob2xkVGltZXJSZWYuY3VycmVudCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN0YXRlLmhlbGQpIGhpZGVQcmV2aWV3VG9vbHRpcCgpO1xuICAgICAgfVxuICAgIH0sXG4gICAgW21vdmVQeF1cbiAgKTtcblxuICBjb25zdCBvblBvaW50ZXJVcCA9IFJlYWN0LnVzZUNhbGxiYWNrKFxuICAgIChldmVudDogUmVhY3QuUG9pbnRlckV2ZW50KSA9PiB7XG4gICAgICBjb25zdCBzdGF0ZSA9IHN0YXRlUmVmLmN1cnJlbnQ7XG4gICAgICBpZiAoIXN0YXRlLmFjdGl2ZSB8fCBzdGF0ZS5wb2ludGVySWQgIT09IGV2ZW50LnBvaW50ZXJJZCkgcmV0dXJuO1xuICAgICAgY29uc3Qgc2hvdWxkVGFwID0gIXN0YXRlLm1vdmVkICYmICFzdGF0ZS5oZWxkO1xuICAgICAgcmVzZXQoKTtcbiAgICAgIGlmIChzaG91bGRUYXApIG9uVGFwKGV2ZW50KTtcbiAgICB9LFxuICAgIFtvblRhcCwgcmVzZXRdXG4gICk7XG5cbiAgcmV0dXJuIHtcbiAgICBvblBvaW50ZXJEb3duLFxuICAgIG9uUG9pbnRlck1vdmUsXG4gICAgb25Qb2ludGVyVXAsXG4gICAgb25Qb2ludGVyQ2FuY2VsOiByZXNldCxcbiAgfTtcbn07XG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuXG50eXBlIENvbmZpcm1Nb2RhbFN0YXRlID0ge1xuICBvcGVuOiBib29sZWFuO1xuICB0aXRsZTogc3RyaW5nO1xuICBtZXNzYWdlOiBzdHJpbmc7XG4gIGNvbmZpcm1UZXh0OiBzdHJpbmc7XG4gIGNhbmNlbFRleHQ6IHN0cmluZztcbiAgc2hvd0NhbmNlbDogYm9vbGVhbjtcbiAgc2hvd0NvbmZpcm06IGJvb2xlYW47XG4gIG9uQ29uZmlybTogKCgpID0+IFByb21pc2U8Ym9vbGVhbiB8IHZvaWQ+IHwgYm9vbGVhbiB8IHZvaWQpIHwgbnVsbDtcbn07XG5cbnR5cGUgQ29uZmlybU9wZW5PcHRpb25zID0gUGFydGlhbDxPbWl0PENvbmZpcm1Nb2RhbFN0YXRlLCBcIm9wZW5cIiB8IFwib25Db25maXJtXCI+PiAmIHtcbiAgb25Db25maXJtPzogKCgpID0+IFByb21pc2U8Ym9vbGVhbiB8IHZvaWQ+IHwgYm9vbGVhbiB8IHZvaWQpIHwgbnVsbDtcbn07XG5cbnR5cGUgVXNlQ29uZmlybURpYWxvZ0FyZ3MgPSB7XG4gIGRlZmF1bHRDb25maXJtVGV4dDogc3RyaW5nO1xuICBkZWZhdWx0Q2FuY2VsVGV4dDogc3RyaW5nO1xufTtcblxudHlwZSBIYW5kbGVDb25maXJtQXJncyA9IHtcbiAgYnVzeTogYm9vbGVhbjtcbiAgb25FcnJvcjogKG1lc3NhZ2U6IHN0cmluZykgPT4gdm9pZDtcbiAgZGVmYXVsdEVycm9yTWVzc2FnZT86IHN0cmluZztcbn07XG5cbi8vIFNoYXJlZCBjb25maXJtIGRpYWxvZyBzdGF0ZSBhbmQgY29uZmlybSBoYW5kbGVyLlxuZXhwb3J0IGNvbnN0IHVzZUNvbmZpcm1EaWFsb2cgPSAoeyBkZWZhdWx0Q29uZmlybVRleHQsIGRlZmF1bHRDYW5jZWxUZXh0IH06IFVzZUNvbmZpcm1EaWFsb2dBcmdzKSA9PiB7XG4gIGNvbnN0IFttb2RhbCwgc2V0TW9kYWxdID0gdXNlU3RhdGU8Q29uZmlybU1vZGFsU3RhdGU+KHtcbiAgICBvcGVuOiBmYWxzZSxcbiAgICB0aXRsZTogXCJcIixcbiAgICBtZXNzYWdlOiBcIlwiLFxuICAgIGNvbmZpcm1UZXh0OiBkZWZhdWx0Q29uZmlybVRleHQsXG4gICAgY2FuY2VsVGV4dDogZGVmYXVsdENhbmNlbFRleHQsXG4gICAgc2hvd0NhbmNlbDogdHJ1ZSxcbiAgICBzaG93Q29uZmlybTogdHJ1ZSxcbiAgICBvbkNvbmZpcm06IG51bGwsXG4gIH0pO1xuXG4gIGNvbnN0IGNvbmZpcm1JbkZsaWdodFJlZiA9IHVzZVJlZihmYWxzZSk7XG5cbiAgY29uc3Qgb3BlbkNvbmZpcm0gPSB1c2VDYWxsYmFjayhcbiAgICAob3B0czogQ29uZmlybU9wZW5PcHRpb25zKSA9PiB7XG4gICAgICBzZXRNb2RhbCh7XG4gICAgICAgIG9wZW46IHRydWUsXG4gICAgICAgIHRpdGxlOiBvcHRzPy50aXRsZSB8fCBcIlwiLFxuICAgICAgICBtZXNzYWdlOiBvcHRzPy5tZXNzYWdlIHx8IFwiXCIsXG4gICAgICAgIGNvbmZpcm1UZXh0OiBvcHRzPy5jb25maXJtVGV4dCB8fCBkZWZhdWx0Q29uZmlybVRleHQsXG4gICAgICAgIGNhbmNlbFRleHQ6IG9wdHM/LmNhbmNlbFRleHQgfHwgZGVmYXVsdENhbmNlbFRleHQsXG4gICAgICAgIHNob3dDYW5jZWw6IG9wdHM/LnNob3dDYW5jZWwgIT09IGZhbHNlLFxuICAgICAgICBzaG93Q29uZmlybTogb3B0cz8uc2hvd0NvbmZpcm0gIT09IGZhbHNlLFxuICAgICAgICBvbkNvbmZpcm06IG9wdHM/Lm9uQ29uZmlybSB8fCBudWxsLFxuICAgICAgfSk7XG4gICAgfSxcbiAgICBbZGVmYXVsdENhbmNlbFRleHQsIGRlZmF1bHRDb25maXJtVGV4dF1cbiAgKTtcblxuICBjb25zdCBjbG9zZUNvbmZpcm0gPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgc2V0TW9kYWwoKHByZXYpID0+ICh7IC4uLnByZXYsIG9wZW46IGZhbHNlIH0pKTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IGhhbmRsZUNvbmZpcm0gPSB1c2VDYWxsYmFjayhcbiAgICBhc3luYyAoeyBidXN5LCBvbkVycm9yLCBkZWZhdWx0RXJyb3JNZXNzYWdlIH06IEhhbmRsZUNvbmZpcm1BcmdzKSA9PiB7XG4gICAgICBpZiAoYnVzeSkgcmV0dXJuO1xuICAgICAgY29uc3QgY2IgPSBtb2RhbC5vbkNvbmZpcm07XG4gICAgICBpZiAodHlwZW9mIGNiICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgY2xvc2VDb25maXJtKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChjb25maXJtSW5GbGlnaHRSZWYuY3VycmVudCkgcmV0dXJuO1xuICAgICAgY29uZmlybUluRmxpZ2h0UmVmLmN1cnJlbnQgPSB0cnVlO1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgY2IoKTtcbiAgICAgICAgaWYgKHJlc3VsdCAhPT0gZmFsc2UpIHtcbiAgICAgICAgICBjbG9zZUNvbmZpcm0oKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyOiBhbnkpIHtcbiAgICAgICAgY29uc3QgbXNnID1cbiAgICAgICAgICBlcnI/Lm1lc3NhZ2UgfHxcbiAgICAgICAgICBkZWZhdWx0RXJyb3JNZXNzYWdlIHx8XG4gICAgICAgICAgaW5kVChcIkFwaV9SZXF1ZXN0RmFpbGVkXCIsIFwiUmVxdWVzdCBmYWlsZWQuIFBsZWFzZSB0cnkgYWdhaW4uXCIpO1xuICAgICAgICBvbkVycm9yKG1zZyk7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBjb25maXJtSW5GbGlnaHRSZWYuY3VycmVudCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0sXG4gICAgW2Nsb3NlQ29uZmlybSwgbW9kYWwub25Db25maXJtXVxuICApO1xuXG4gIHJldHVybiB7XG4gICAgbW9kYWwsXG4gICAgb3BlbkNvbmZpcm0sXG4gICAgY2xvc2VDb25maXJtLFxuICAgIGhhbmRsZUNvbmZpcm0sXG4gIH07XG59O1xyXG4iLCAiZXhwb3J0IGNvbnN0IFRFWFRfRURJVE9SX1BSRUZJWCA9IFwiaW5kX3RleHRlZGl0b3JfXCI7XG5cbmV4cG9ydCBjb25zdCByZWFkQW5kQ2xlYXJUZXh0RWRpdG9yVmFsdWUgPSAoZmllbGRJZDogc3RyaW5nKTogc3RyaW5nIHwgbnVsbCA9PiB7XG4gIGNvbnN0IGlkID0gU3RyaW5nKGZpZWxkSWQgfHwgXCJcIikudHJpbSgpO1xuICBpZiAoIWlkKSByZXR1cm4gbnVsbDtcbiAgY29uc3Qga2V5ID0gYCR7VEVYVF9FRElUT1JfUFJFRklYfSR7aWR9YDtcbiAgdHJ5IHtcbiAgICBjb25zdCB2YWx1ZSA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oa2V5KTtcbiAgICBpZiAodmFsdWUgPT09IG51bGwpIHJldHVybiBudWxsO1xuICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KTtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuIiwgImV4cG9ydCBjb25zdCB3YWl0ID0gKG1zOiBudW1iZXIpID0+IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIG1zKSk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbUJBQTBEO0FBNENqRDtBQWxDVCxJQUFNLGNBQXdCLENBQUM7QUFFL0IsSUFBTSxlQUEwQjtBQUFBLEVBQzlCLFlBQVk7QUFBQSxFQUNaLEdBQUcsQ0FBQyxLQUFLLGFBQWEsWUFBWTtBQUFBLEVBQ2xDLFFBQVEsQ0FBQyxLQUFLLGFBQWEsU0FBUztBQUNsQyxVQUFNLFdBQVcsWUFBWTtBQUM3QixXQUFPLE9BQU8sUUFBUSxFQUFFLFFBQVEsY0FBYyxDQUFDLEdBQUcsUUFBUSxPQUFPLEtBQUssT0FBTyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7QUFBQSxFQUMzRjtBQUNGO0FBRUEsSUFBTSxrQkFBYyw0QkFBeUIsWUFBWTtBQU9sRCxJQUFNLGVBQWUsQ0FBQyxFQUFFLFVBQVUsV0FBVyxNQUFxQjtBQUN2RSxRQUFNLE9BQU8sZUFBZSxXQUFXLGdCQUFn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LGdCQUFnQjtBQUFBLFFBQ25DLFdBQVcsTUFBTSxhQUFhO0FBQUEsTUFDaEMsQ0FBQztBQUFBLElBQ0g7QUFBQSxJQUNBLENBQUMsbUJBQW1CLGtCQUFrQjtBQUFBLEVBQ3hDO0FBRUEsUUFBTSxtQkFBZSwyQkFBWSxNQUFNO0FBQ3JDLGFBQVMsQ0FBQyxVQUFVLEVBQUUsR0FBRyxNQUFNLE1BQU0sTUFBTSxFQUFFO0FBQUEsRUFDL0MsR0FBRyxDQUFDLENBQUM7QUFFTCxRQUFNLG9CQUFnQjtBQUFBLElBQ3BCLE9BQU8sRUFBRSxNQUFNLFNBQVMsb0JBQW9CLE1BQXlCO0FBQ25FLFVBQUksS0FBTTtBQUNWLFlBQU0sS0FBSyxNQUFNO0FBQ2pCLFVBQUksT0FBTyxPQUFPLFlBQVk7QUFDNUIscUJBQWE7QUFDYjtBQUFBLE1BQ0Y7QUFDQSxVQUFJLG1CQUFtQixRQUFTO0FBQ2hDLHlCQUFtQixVQUFVO0FBQzdCLFVBQUk7QUFDRixjQUFNLFNBQVMsTUFBTSxHQUFHO0FBQ3hCLFlBQUksV0FBVyxPQUFPO0FBQ3BCLHVCQUFhO0FBQUEsUUFDZjtBQUFBLE1BQ0YsU0FBUyxLQUFVO0FBQ2pCLGNBQU0sTUFDSixLQUFLLFdBQ0wsdUJBQ0EsS0FBSyxxQkFBcUIsbUNBQW1DO0FBQy9ELGdCQUFRLEdBQUc7QUFBQSxNQUNiLFVBQUU7QUFDQSwyQkFBbUIsVUFBVTtBQUFBLE1BQy9CO0FBQUEsSUFDRjtBQUFBLElBQ0EsQ0FBQyxjQUFjLE1BQU0sU0FBUztBQUFBLEVBQ2hDO0FBRUEsU0FBTztBQUFBLElBQ0w7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQ0Y7OztBQ2xHTyxJQUFNLHFCQUFxQjtBQUUzQixJQUFNLDhCQUE4QixDQUFDLFlBQW1DO0FBQzdFLFFBQU0sS0FBSyxPQUFPLFdBQVcsRUFBRSxFQUFFLEtBQUs7QUFDdEMsTUFBSSxDQUFDLEdBQUksUUFBTztBQUNoQixRQUFNLE1BQU0sR0FBRyxrQkFBa0IsR0FBRyxFQUFFO0FBQ3RDLE1BQUk7QUFDRixVQUFNLFFBQVEsZUFBZSxRQUFRLEdBQUc7QUFDeEMsUUFBSSxVQUFVLEtBQU0sUUFBTztBQUMzQixtQkFBZSxXQUFXLEdBQUc7QUFDN0IsV0FBTztBQUFBLEVBQ1QsUUFBUTtBQUNOLFdBQU87QUFBQSxFQUNUO0FBQ0Y7OztBQ2RPLElBQU0sT0FBTyxDQUFDLE9BQWUsSUFBSSxRQUFRLENBQUMsWUFBWSxXQUFXLFNBQVMsRUFBRSxDQUFDOyIsCiAgIm5hbWVzIjogWyJ2YWx1ZSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImRlZmF1bHRWYWx1ZSIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbmRUIiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X3JlYWN0IiwgIlJlYWN0IiwgImltcG9ydF9yZWFjdCJdCn0K
