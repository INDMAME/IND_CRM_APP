import {
  ChevronDownSvg,
  ChevronUpSvg,
  useFloatingPosition
} from "./chunk-AXUPQW6N.js";
import {
  require_jsx_runtime,
  require_react,
  require_react_dom
} from "./chunk-BWM3JLWG.js";
import {
  __toESM
} from "./chunk-45FWCHS2.js";

// Web/wwwroot/react/src/components/commons/SingleDatePicker.tsx
var import_react = __toESM(require_react());
var import_react_dom = __toESM(require_react_dom());
var import_jsx_runtime = __toESM(require_jsx_runtime());
var IND_I18N = globalThis.__IND_I18N__ || {};
var indT = (key, fallback) => IND_I18N && typeof IND_I18N[key] === "string" && IND_I18N[key] || fallback || key;
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
  if (!d) return indT("History_AddDate", "Add date");
  const locale = getUiLocale();
  if (isBasqueLocale(locale)) {
    const month = BASQUE_MONTHS_SHORT[d.getMonth()];
    return `${d.getDate()} ${month} ${d.getFullYear()}`.toLowerCase();
  }
  return d.toLocaleDateString(locale, { day: "numeric", month: "short", year: "numeric" }).replace(/\./g, "").toLowerCase();
};
function SingleDatePicker({ label, value, onChange, disabled = false, readOnly = false }) {
  const effectiveLabel = label && String(label).trim() ? label : indT("Visits_Detail_Date_Label", "Date");
  const selectedDate = (0, import_react.useMemo)(() => parseISO(value), [value]);
  const [open, setOpen] = (0, import_react.useState)(false);
  const [currentMonth, setCurrentMonth] = (0, import_react.useState)(
    selectedDate ? selectedDate.getMonth() : (/* @__PURE__ */ new Date()).getMonth()
  );
  const [currentYear, setCurrentYear] = (0, import_react.useState)(
    selectedDate ? selectedDate.getFullYear() : (/* @__PURE__ */ new Date()).getFullYear()
  );
  const containerRef = (0, import_react.useRef)(null);
  const popoverRef = (0, import_react.useRef)(null);
  const anchorRef = (0, import_react.useRef)(null);
  const readOnlyMode = readOnly || disabled;
  const isPopoverOpen = open && !readOnlyMode;
  const floatingStyle = useFloatingPosition(anchorRef, isPopoverOpen, {
    overlayRef: popoverRef,
    autoFitViewport: true
  });
  (0, import_react.useEffect)(() => {
    if (selectedDate) {
      setCurrentMonth(selectedDate.getMonth());
      setCurrentYear(selectedDate.getFullYear());
    }
  }, [selectedDate?.getTime()]);
  (0, import_react.useEffect)(() => {
    const onDocClick = (ev) => {
      const target = ev.target;
      if (containerRef.current?.contains(target)) return;
      if (popoverRef.current?.contains(target)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("touchstart", onDocClick, { passive: true });
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("touchstart", onDocClick);
    };
  }, []);
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
  const handleSelect = (0, import_react.useCallback)(
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
  const popover = isPopoverOpen && typeof document !== "undefined" ? (0, import_react_dom.createPortal)(
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "div",
      {
        ref: popoverRef,
        className: "drp-popover",
        role: "dialog",
        "aria-modal": "true",
        style: {
          position: "fixed",
          top: floatingStyle.top,
          left: floatingStyle.left,
          width: floatingStyle.width,
          maxHeight: floatingStyle.maxHeight,
          zIndex: 36e4,
          overflowY: "auto",
          overscrollBehavior: "contain"
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "drp-head", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", className: "drp-nav", "aria-label": indT("History_PrevMonth", "Previous month"), onClick: () => goMonth(-1), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4", fill: "none", viewBox: "0 0 30 30", stroke: "currentColor", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M15 19l-7-7 7-7" }) }) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "drp-month", children: monthLabel }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", className: "drp-nav", "aria-label": indT("History_NextMonth", "Next month"), onClick: () => goMonth(1), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4", fill: "none", viewBox: "0 0 30 30", stroke: "currentColor", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 5l7 7-7 7" }) }) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "drp-weekdays", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: indT("History_Day_Mon", "Mo") }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: indT("History_Day_Tue", "Tu") }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: indT("History_Day_Wed", "We") }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: indT("History_Day_Thu", "Th") }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: indT("History_Day_Fri", "Fr") }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: indT("History_Day_Sat", "Sa") }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: indT("History_Day_Sun", "Su") })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "drp-grid", children: [
            Array.from({ length: offset }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "drp-day empty", disabled: true, type: "button" }, `e-${i}`)),
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
              return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "drp-status", children: indT("DatePicker_SelectDate", "Select date") })
        ]
      }
    ),
    document.body
  ) : null;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: containerClass, ref: containerRef, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "form-label font-semibold", style: { color: labelColor }, children: String(effectiveLabel) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { ref: anchorRef, className: "relative", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
          "aria-expanded": isPopoverOpen,
          "aria-disabled": readOnlyMode ? "true" : void 0,
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { color: valueColor, fontWeight: 400 }, children: formatDisplay(selectedDate) })
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-y-0 right-0 flex items-center pr-2 text-slate-500 pointer-events-none", children: isPopoverOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUpSvg, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDownSvg, { className: "h-5 w-5" }) })
    ] }),
    popover
  ] });
}

export {
  SingleDatePicker
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9TaW5nbGVEYXRlUGlja2VyLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGNyZWF0ZVBvcnRhbCB9IGZyb20gXCJyZWFjdC1kb21cIjtcbmltcG9ydCB7IHVzZUZsb2F0aW5nUG9zaXRpb24gfSBmcm9tIFwiLi4vLi4vaG9va3MvdXNlRmxvYXRpbmdQb3NpdGlvbi50c1wiO1xuaW1wb3J0IHsgQ2hldnJvbkRvd25TdmcsIENoZXZyb25VcFN2ZyB9IGZyb20gXCIuL2NoZXZyb25zLnRzeFwiO1xuXHJcbi8vIFNpbmdsZSBkYXRlIHBpY2tlciBtYXRjaGluZyB0aGUgSGlzdG9yaWFsIERSUCB2aXN1YWwgc3R5bGUuXHJcbi8vIFJldHVybnMgYW4gSVNPIHN0cmluZyAoeXl5eS1NTS1kZCkgdmlhIG9uQ2hhbmdlLlxyXG5cclxuY29uc3QgSU5EX0kxOE4gPSBnbG9iYWxUaGlzLl9fSU5EX0kxOE5fXyB8fCB7fTtcclxuY29uc3QgaW5kVCA9IChrZXksIGZhbGxiYWNrKSA9PiAoSU5EX0kxOE4gJiYgdHlwZW9mIElORF9JMThOW2tleV0gPT09IFwic3RyaW5nXCIgJiYgSU5EX0kxOE5ba2V5XSkgfHwgZmFsbGJhY2sgfHwga2V5O1xyXG5cclxuY29uc3QgcGFkID0gKG4pID0+IFN0cmluZyhuKS5wYWRTdGFydCgyLCBcIjBcIik7XHJcbmNvbnN0IHRvSVNPID0gKGQpID0+IGAke2QuZ2V0RnVsbFllYXIoKX0tJHtwYWQoZC5nZXRNb250aCgpICsgMSl9LSR7cGFkKGQuZ2V0RGF0ZSgpKX1gO1xyXG5cclxuY29uc3QgcGFyc2VJU08gPSAocykgPT4ge1xyXG4gIGlmICghcykgcmV0dXJuIG51bGw7XHJcbiAgY29uc3QgcmF3ID0gU3RyaW5nKHMpLnRyaW0oKTtcclxuICBpZiAoIXJhdykgcmV0dXJuIG51bGw7XHJcbiAgY29uc3QgcGFydHMgPSByYXcuc3BsaXQoXCItXCIpO1xyXG4gIGlmIChwYXJ0cy5sZW5ndGggPT09IDMpIHtcclxuICAgIGNvbnN0IFt5LCBtLCBkXSA9IHBhcnRzLm1hcChOdW1iZXIpO1xyXG4gICAgaWYgKCFOdW1iZXIuaXNOYU4oeSkgJiYgIU51bWJlci5pc05hTihtKSAmJiAhTnVtYmVyLmlzTmFOKGQpKSB7XHJcbiAgICAgIHJldHVybiBuZXcgRGF0ZSh5LCBtIC0gMSwgZCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBudWxsO1xyXG59O1xyXG5cclxuY29uc3Qgbm9ybWFsaXplVWlMb2NhbGUgPSAobG9jYWxlKSA9PiB7XHJcbiAgY29uc3QgdmFsdWUgPSBTdHJpbmcobG9jYWxlIHx8IFwiXCIpLnRyaW0oKTtcclxuICBpZiAoIXZhbHVlKSByZXR1cm4gXCJlcy1FU1wiO1xyXG4gIGlmICgvXnpoLWhhbnMvaS50ZXN0KHZhbHVlKSkgcmV0dXJuIFwiemgtQ05cIjtcclxuICByZXR1cm4gdmFsdWU7XHJcbn07XHJcblxyXG5jb25zdCBnZXRVaUxvY2FsZSA9ICgpID0+IHtcclxuICBjb25zdCBmcm9tSHRtbCA9IGRvY3VtZW50Py5kb2N1bWVudEVsZW1lbnQ/Lmxhbmc7XHJcbiAgaWYgKGZyb21IdG1sICYmIFN0cmluZyhmcm9tSHRtbCkudHJpbSgpKSByZXR1cm4gbm9ybWFsaXplVWlMb2NhbGUoZnJvbUh0bWwpO1xyXG4gIHJldHVybiBcImVzLUVTXCI7XHJcbn07XHJcblxyXG5jb25zdCBpc0Jhc3F1ZUxvY2FsZSA9IChsb2NhbGUpID0+IC9eZXVcXGIvaS50ZXN0KFN0cmluZyhsb2NhbGUgfHwgXCJcIikpO1xyXG5jb25zdCBCQVNRVUVfTU9OVEhTID0gW1xyXG4gIFwidXJ0YXJyaWxhXCIsXHJcbiAgXCJvdHNhaWxhXCIsXHJcbiAgXCJtYXJ0eG9hXCIsXHJcbiAgXCJhcGlyaWxhXCIsXHJcbiAgXCJtYWlhdHphXCIsXHJcbiAgXCJla2FpbmFcIixcclxuICBcInV6dGFpbGFcIixcclxuICBcImFidXp0dWFcIixcclxuICBcImlyYWlsYVwiLFxyXG4gIFwidXJyaWFcIixcclxuICBcImF6YXJvYVwiLFxyXG4gIFwiYWJlbmR1YVwiXHJcbl07XHJcbmNvbnN0IEJBU1FVRV9NT05USFNfU0hPUlQgPSBbXHJcbiAgXCJ1cnRcIixcclxuICBcIm90c1wiLFxyXG4gIFwibWFyXCIsXHJcbiAgXCJhcGlcIixcclxuICBcIm1haVwiLFxyXG4gIFwiZWthXCIsXHJcbiAgXCJ1enRcIixcclxuICBcImFidVwiLFxyXG4gIFwiaXJhXCIsXHJcbiAgXCJ1cnJcIixcclxuICBcImF6YVwiLFxyXG4gIFwiYWJlXCJcclxuXTtcclxuXHJcbmNvbnN0IGZvcm1hdERpc3BsYXkgPSAoZCkgPT4ge1xyXG4gIGlmICghZCkgcmV0dXJuIGluZFQoXCJIaXN0b3J5X0FkZERhdGVcIiwgXCJBZGQgZGF0ZVwiKTtcclxuICBjb25zdCBsb2NhbGUgPSBnZXRVaUxvY2FsZSgpO1xyXG4gIGlmIChpc0Jhc3F1ZUxvY2FsZShsb2NhbGUpKSB7XHJcbiAgICBjb25zdCBtb250aCA9IEJBU1FVRV9NT05USFNfU0hPUlRbZC5nZXRNb250aCgpXTtcclxuICAgIHJldHVybiBgJHtkLmdldERhdGUoKX0gJHttb250aH0gJHtkLmdldEZ1bGxZZWFyKCl9YC50b0xvd2VyQ2FzZSgpO1xyXG4gIH1cclxuICByZXR1cm4gZFxyXG4gICAgLnRvTG9jYWxlRGF0ZVN0cmluZyhsb2NhbGUsIHsgZGF5OiBcIm51bWVyaWNcIiwgbW9udGg6IFwic2hvcnRcIiwgeWVhcjogXCJudW1lcmljXCIgfSlcclxuICAgIC5yZXBsYWNlKC9cXC4vZywgXCJcIilcclxuICAgIC50b0xvd2VyQ2FzZSgpO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gU2luZ2xlRGF0ZVBpY2tlcih7IGxhYmVsLCB2YWx1ZSwgb25DaGFuZ2UsIGRpc2FibGVkID0gZmFsc2UsIHJlYWRPbmx5ID0gZmFsc2UgfSkge1xuICBjb25zdCBlZmZlY3RpdmVMYWJlbCA9IChsYWJlbCAmJiBTdHJpbmcobGFiZWwpLnRyaW0oKSkgPyBsYWJlbCA6IGluZFQoXCJWaXNpdHNfRGV0YWlsX0RhdGVfTGFiZWxcIiwgXCJEYXRlXCIpO1xuICBjb25zdCBzZWxlY3RlZERhdGUgPSB1c2VNZW1vKCgpID0+IHBhcnNlSVNPKHZhbHVlKSwgW3ZhbHVlXSk7XG4gIGNvbnN0IFtvcGVuLCBzZXRPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2N1cnJlbnRNb250aCwgc2V0Q3VycmVudE1vbnRoXSA9IHVzZVN0YXRlKFxyXG4gICAgc2VsZWN0ZWREYXRlID8gc2VsZWN0ZWREYXRlLmdldE1vbnRoKCkgOiBuZXcgRGF0ZSgpLmdldE1vbnRoKClcclxuICApO1xyXG4gIGNvbnN0IFtjdXJyZW50WWVhciwgc2V0Q3VycmVudFllYXJdID0gdXNlU3RhdGUoXHJcbiAgICBzZWxlY3RlZERhdGUgPyBzZWxlY3RlZERhdGUuZ2V0RnVsbFllYXIoKSA6IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKVxyXG4gICk7XHJcblxuICBjb25zdCBjb250YWluZXJSZWYgPSB1c2VSZWYobnVsbCk7XG4gIGNvbnN0IHBvcG92ZXJSZWYgPSB1c2VSZWYobnVsbCk7XG4gIGNvbnN0IGFuY2hvclJlZiA9IHVzZVJlZihudWxsKTtcbiAgY29uc3QgcmVhZE9ubHlNb2RlID0gcmVhZE9ubHkgfHwgZGlzYWJsZWQ7XG4gIGNvbnN0IGlzUG9wb3Zlck9wZW4gPSBvcGVuICYmICFyZWFkT25seU1vZGU7XG4gIGNvbnN0IGZsb2F0aW5nU3R5bGUgPSB1c2VGbG9hdGluZ1Bvc2l0aW9uKGFuY2hvclJlZiwgaXNQb3BvdmVyT3Blbiwge1xuICAgIG92ZXJsYXlSZWY6IHBvcG92ZXJSZWYsXG4gICAgYXV0b0ZpdFZpZXdwb3J0OiB0cnVlLFxuICB9KTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChzZWxlY3RlZERhdGUpIHtcbiAgICAgIHNldEN1cnJlbnRNb250aChzZWxlY3RlZERhdGUuZ2V0TW9udGgoKSk7XG4gICAgICBzZXRDdXJyZW50WWVhcihzZWxlY3RlZERhdGUuZ2V0RnVsbFllYXIoKSk7XHJcbiAgICB9XHJcbiAgfSwgW3NlbGVjdGVkRGF0ZT8uZ2V0VGltZSgpXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3Qgb25Eb2NDbGljayA9IChldikgPT4ge1xuICAgICAgY29uc3QgdGFyZ2V0ID0gZXYudGFyZ2V0O1xuICAgICAgaWYgKGNvbnRhaW5lclJlZi5jdXJyZW50Py5jb250YWlucyh0YXJnZXQpKSByZXR1cm47XG4gICAgICBpZiAocG9wb3ZlclJlZi5jdXJyZW50Py5jb250YWlucyh0YXJnZXQpKSByZXR1cm47XG4gICAgICBzZXRPcGVuKGZhbHNlKTtcbiAgICB9O1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgb25Eb2NDbGljayk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgb25Eb2NDbGljaywgeyBwYXNzaXZlOiB0cnVlIH0pO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIG9uRG9jQ2xpY2spO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgb25Eb2NDbGljayk7XG4gICAgfTtcbiAgfSwgW10pO1xuXHJcbiAgY29uc3QgZmlyc3REYXkgPSBuZXcgRGF0ZShjdXJyZW50WWVhciwgY3VycmVudE1vbnRoLCAxKTtcbiAgY29uc3QgZGF5c0luTW9udGggPSBuZXcgRGF0ZShjdXJyZW50WWVhciwgY3VycmVudE1vbnRoICsgMSwgMCkuZ2V0RGF0ZSgpO1xyXG4gIGNvbnN0IG9mZnNldCA9IChmaXJzdERheS5nZXREYXkoKSArIDYpICUgNzsgLy8gTW9uZGF5IGFzIDBcclxuXHJcbiAgY29uc3QgbW9udGhMYWJlbCA9ICgoKSA9PiB7XHJcbiAgICBjb25zdCBsb2NhbGUgPSBnZXRVaUxvY2FsZSgpO1xyXG4gICAgaWYgKC9eemgvaS50ZXN0KGxvY2FsZSkpIHtcclxuICAgICAgcmV0dXJuIG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KGxvY2FsZSwgeyB5ZWFyOiBcIm51bWVyaWNcIiwgbW9udGg6IFwibG9uZ1wiIH0pLmZvcm1hdChmaXJzdERheSk7XHJcbiAgICB9XHJcbiAgICBpZiAoaXNCYXNxdWVMb2NhbGUobG9jYWxlKSkge1xyXG4gICAgICByZXR1cm4gYCR7QkFTUVVFX01PTlRIU1tjdXJyZW50TW9udGhdfSAke2N1cnJlbnRZZWFyfWA7XHJcbiAgICB9XHJcbiAgICBjb25zdCByYXcgPSBmaXJzdERheS50b0xvY2FsZURhdGVTdHJpbmcobG9jYWxlLCB7IG1vbnRoOiBcImxvbmdcIiB9KTtcclxuICAgIGNvbnN0IGZpcnN0ID0gcmF3LnNsaWNlKDAsIDEpO1xyXG4gICAgY29uc3QgcmVzdCA9IHJhdy5zbGljZSgxKTtcclxuICAgIHJldHVybiBgJHtmaXJzdC50b1VwcGVyQ2FzZSgpfSR7cmVzdH0gJHtjdXJyZW50WWVhcn1gO1xyXG4gIH0pKCk7XHJcblxyXG4gIGNvbnN0IHNhbWVEYXkgPSAoYSwgYikgPT5cclxuICAgIGEgJiYgYiAmJiBhLmdldEZ1bGxZZWFyKCkgPT09IGIuZ2V0RnVsbFllYXIoKSAmJiBhLmdldE1vbnRoKCkgPT09IGIuZ2V0TW9udGgoKSAmJiBhLmdldERhdGUoKSA9PT0gYi5nZXREYXRlKCk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZVNlbGVjdCA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKGRhdGVPYmopID0+IHtcclxuICAgICAgaWYgKGRpc2FibGVkKSByZXR1cm47XHJcbiAgICAgIGNvbnN0IGlzbyA9IHRvSVNPKGRhdGVPYmopO1xyXG4gICAgICBvbkNoYW5nZT8uKGlzbyk7XHJcbiAgICAgIHNldE9wZW4oZmFsc2UpO1xyXG4gICAgfSxcclxuICAgIFtkaXNhYmxlZCwgb25DaGFuZ2VdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgZ29Nb250aCA9IChpbmMpID0+IHtcclxuICAgIGlmIChkaXNhYmxlZCkgcmV0dXJuO1xyXG4gICAgbGV0IG0gPSBjdXJyZW50TW9udGggKyBpbmM7XHJcbiAgICBsZXQgeSA9IGN1cnJlbnRZZWFyO1xyXG4gICAgaWYgKG0gPiAxMSkge1xyXG4gICAgICBtID0gMDtcclxuICAgICAgeSArPSAxO1xyXG4gICAgfSBlbHNlIGlmIChtIDwgMCkge1xyXG4gICAgICBtID0gMTE7XHJcbiAgICAgIHkgLT0gMTtcclxuICAgIH1cclxuICAgIHNldEN1cnJlbnRNb250aChtKTtcclxuICAgIHNldEN1cnJlbnRZZWFyKHkpO1xyXG4gIH07XHJcblxuICBjb25zdCB2YWx1ZUNvbG9yID0gcmVhZE9ubHlNb2RlID8gXCIjNjQ3NDhiXCIgOiBcIiMwMDI5NmJlMFwiO1xuICBjb25zdCBsYWJlbENvbG9yID0gXCIjMDAyOTZiZTBcIjtcbiAgY29uc3QgY29udGFpbmVyQ2xhc3MgPSBgc3BhY2UteS0yICR7ZGlzYWJsZWQgPyBcInBvaW50ZXItZXZlbnRzLW5vbmUgc2VsZWN0LW5vbmVcIiA6IFwiXCJ9YC50cmltKCk7XG4gIGNvbnN0IGJ1dHRvbkNsYXNzID0gW1xuICAgIFwiZm9ybS1jb250cm9sXCIsXG4gICAgXCJmbGV4IGl0ZW1zLWNlbnRlclwiLFxuICAgIFwicHItMTBcIixcbiAgICByZWFkT25seU1vZGUgPyBcImluZC1yZWFkb25seS1maWVsZFwiIDogXCJcIixcbiAgICByZWFkT25seU1vZGUgPyBcImN1cnNvci1ub3QtYWxsb3dlZFwiIDogXCJjdXJzb3ItcG9pbnRlclwiXG4gIF0uZmlsdGVyKEJvb2xlYW4pLmpvaW4oXCIgXCIpO1xuICBjb25zdCBwb3BvdmVyID1cbiAgICBpc1BvcG92ZXJPcGVuICYmIHR5cGVvZiBkb2N1bWVudCAhPT0gXCJ1bmRlZmluZWRcIlxuICAgICAgPyBjcmVhdGVQb3J0YWwoXG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgcmVmPXtwb3BvdmVyUmVmfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiZHJwLXBvcG92ZXJcIlxuICAgICAgICAgICAgcm9sZT1cImRpYWxvZ1wiXG4gICAgICAgICAgICBhcmlhLW1vZGFsPVwidHJ1ZVwiXG4gICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICBwb3NpdGlvbjogXCJmaXhlZFwiLFxuICAgICAgICAgICAgICB0b3A6IGZsb2F0aW5nU3R5bGUudG9wLFxuICAgICAgICAgICAgICBsZWZ0OiBmbG9hdGluZ1N0eWxlLmxlZnQsXG4gICAgICAgICAgICAgIHdpZHRoOiBmbG9hdGluZ1N0eWxlLndpZHRoLFxuICAgICAgICAgICAgICBtYXhIZWlnaHQ6IGZsb2F0aW5nU3R5bGUubWF4SGVpZ2h0LFxuICAgICAgICAgICAgICB6SW5kZXg6IDM2MDAwMCxcbiAgICAgICAgICAgICAgb3ZlcmZsb3dZOiBcImF1dG9cIixcbiAgICAgICAgICAgICAgb3ZlcnNjcm9sbEJlaGF2aW9yOiBcImNvbnRhaW5cIixcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkcnAtaGVhZFwiPlxuICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJkcnAtbmF2XCIgYXJpYS1sYWJlbD17aW5kVChcIkhpc3RvcnlfUHJldk1vbnRoXCIsIFwiUHJldmlvdXMgbW9udGhcIil9IG9uQ2xpY2s9eygpID0+IGdvTW9udGgoLTEpfT5cbiAgICAgICAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBjbGFzc05hbWU9XCJoLTQgdy00XCIgZmlsbD1cIm5vbmVcIiB2aWV3Qm94PVwiMCAwIDMwIDMwXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCI+XG4gICAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgc3Ryb2tlV2lkdGg9XCIyXCIgZD1cIk0xNSAxOWwtNy03IDctN1wiIC8+XG4gICAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRycC1tb250aFwiPnttb250aExhYmVsfTwvZGl2PlxuICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJkcnAtbmF2XCIgYXJpYS1sYWJlbD17aW5kVChcIkhpc3RvcnlfTmV4dE1vbnRoXCIsIFwiTmV4dCBtb250aFwiKX0gb25DbGljaz17KCkgPT4gZ29Nb250aCgxKX0+XG4gICAgICAgICAgICAgICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgY2xhc3NOYW1lPVwiaC00IHctNFwiIGZpbGw9XCJub25lXCIgdmlld0JveD1cIjAgMCAzMCAzMFwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiPlxuICAgICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIHN0cm9rZVdpZHRoPVwiMlwiIGQ9XCJNOSA1bDcgNy03IDdcIiAvPlxuICAgICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkcnAtd2Vla2RheXNcIj5cbiAgICAgICAgICAgICAgPHNwYW4+e2luZFQoXCJIaXN0b3J5X0RheV9Nb25cIiwgXCJNb1wiKX08L3NwYW4+PHNwYW4+e2luZFQoXCJIaXN0b3J5X0RheV9UdWVcIiwgXCJUdVwiKX08L3NwYW4+PHNwYW4+e2luZFQoXCJIaXN0b3J5X0RheV9XZWRcIiwgXCJXZVwiKX08L3NwYW4+PHNwYW4+e2luZFQoXCJIaXN0b3J5X0RheV9UaHVcIiwgXCJUaFwiKX08L3NwYW4+PHNwYW4+e2luZFQoXCJIaXN0b3J5X0RheV9GcmlcIiwgXCJGclwiKX08L3NwYW4+PHNwYW4+e2luZFQoXCJIaXN0b3J5X0RheV9TYXRcIiwgXCJTYVwiKX08L3NwYW4+PHNwYW4+e2luZFQoXCJIaXN0b3J5X0RheV9TdW5cIiwgXCJTdVwiKX08L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZHJwLWdyaWRcIj5cbiAgICAgICAgICAgICAge0FycmF5LmZyb20oeyBsZW5ndGg6IG9mZnNldCB9KS5tYXAoKF8sIGkpID0+IChcbiAgICAgICAgICAgICAgICA8YnV0dG9uIGtleT17YGUtJHtpfWB9IGNsYXNzTmFtZT1cImRycC1kYXkgZW1wdHlcIiBkaXNhYmxlZCB0eXBlPVwiYnV0dG9uXCIgLz5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgIHtBcnJheS5mcm9tKHsgbGVuZ3RoOiBkYXlzSW5Nb250aCB9KS5tYXAoKF8sIGlkeCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRheSA9IGlkeCArIDE7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0ZU9iaiA9IG5ldyBEYXRlKGN1cnJlbnRZZWFyLCBjdXJyZW50TW9udGgsIGRheSk7XG4gICAgICAgICAgICAgICAgY29uc3QgaXNTZWxlY3RlZCA9IHNhbWVEYXkoZGF0ZU9iaiwgc2VsZWN0ZWREYXRlKTtcbiAgICAgICAgICAgICAgICBjb25zdCBpc1RvZGF5ID0gc2FtZURheShkYXRlT2JqLCBuZXcgRGF0ZSgpKTtcbiAgICAgICAgICAgICAgICBjb25zdCBjbHMgPSBbXG4gICAgICAgICAgICAgICAgICBcImRycC1kYXlcIixcbiAgICAgICAgICAgICAgICAgIGlzU2VsZWN0ZWQgPyBcInN0YXJ0IHJhbmdlLXN0YXJ0XCIgOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgaXNUb2RheSA/IFwidG9kYXlcIiA6IFwiXCJcbiAgICAgICAgICAgICAgICBdLmpvaW4oXCIgXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGtleT17dG9JU08oZGF0ZU9iail9XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2Nsc31cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlU2VsZWN0KGRhdGVPYmopfVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7ZGF5fVxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZHJwLXN0YXR1c1wiPntpbmRUKFwiRGF0ZVBpY2tlcl9TZWxlY3REYXRlXCIsIFwiU2VsZWN0IGRhdGVcIil9PC9kaXY+XG4gICAgICAgICAgPC9kaXY+LFxuICAgICAgICAgIGRvY3VtZW50LmJvZHlcbiAgICAgICAgKVxuICAgICAgOiBudWxsO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e2NvbnRhaW5lckNsYXNzfSByZWY9e2NvbnRhaW5lclJlZn0+XG4gICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZm9ybS1sYWJlbCBmb250LXNlbWlib2xkXCIgc3R5bGU9e3sgY29sb3I6IGxhYmVsQ29sb3IgfX0+e1N0cmluZyhlZmZlY3RpdmVMYWJlbCl9PC9sYWJlbD5cbiAgICAgIDxkaXYgcmVmPXthbmNob3JSZWZ9IGNsYXNzTmFtZT1cInJlbGF0aXZlXCI+XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICBjbGFzc05hbWU9e2J1dHRvbkNsYXNzfVxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgIGlmIChyZWFkT25seU1vZGUpIHJldHVybjtcbiAgICAgICAgICAgIHNldE9wZW4oKHYpID0+ICF2KTtcbiAgICAgICAgICB9fVxuICAgICAgICAgIG9uS2V5RG93bj17KGUpID0+IHtcbiAgICAgICAgICAgIGlmIChyZWFkT25seU1vZGUpIHJldHVybjtcbiAgICAgICAgICAgIGlmIChlLmtleSA9PT0gXCJFbnRlclwiIHx8IGUua2V5ID09PSBcIiBcIikge1xuICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgIHNldE9wZW4oKHYpID0+ICF2KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChlLmtleSA9PT0gXCJFc2NhcGVcIikgc2V0T3BlbihmYWxzZSk7XG4gICAgICAgICAgfX1cbiAgICAgICAgICBhcmlhLWV4cGFuZGVkPXtpc1BvcG92ZXJPcGVufVxuICAgICAgICAgIGFyaWEtZGlzYWJsZWQ9e3JlYWRPbmx5TW9kZSA/IFwidHJ1ZVwiIDogdW5kZWZpbmVkfVxuICAgICAgICA+XG4gICAgICAgICAgPHNwYW4gc3R5bGU9e3sgY29sb3I6IHZhbHVlQ29sb3IsIGZvbnRXZWlnaHQ6IDQwMCB9fT57Zm9ybWF0RGlzcGxheShzZWxlY3RlZERhdGUpfTwvc3Bhbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LXktMCByaWdodC0wIGZsZXggaXRlbXMtY2VudGVyIHByLTIgdGV4dC1zbGF0ZS01MDAgcG9pbnRlci1ldmVudHMtbm9uZVwiPlxuICAgICAgICAgIHtpc1BvcG92ZXJPcGVuID8gPENoZXZyb25VcFN2ZyBjbGFzc05hbWU9XCJoLTUgdy01XCIgLz4gOiA8Q2hldnJvbkRvd25TdmcgY2xhc3NOYW1lPVwiaC01IHctNVwiIC8+fVxuICAgICAgICA8L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICAgIHtwb3BvdmVyfVxu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
