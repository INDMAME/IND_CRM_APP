import {
  ChevronDownSvg,
  ChevronUpSvg,
  useFloatingPosition
} from "./chunk-SSILOGLX.js";
import {
  require_jsx_runtime,
  require_react,
  require_react_dom
} from "./chunk-2NKOKBT5.js";
import {
  __toESM
} from "./chunk-W7NC74ZX.js";

// Web/wwwroot/react/src/components/commons/SingleDatePicker.tsx
var import_react = __toESM(require_react());
var import_react_dom = __toESM(require_react_dom());
var import_jsx_runtime = __toESM(require_jsx_runtime());
var IND_I18N = globalThis.__IND_I18N__ || {};
var indT = (key, fallback) => IND_I18N && typeof IND_I18N[key] === "string" && IND_I18N[key] || fallback || key;
var MIN_POPOVER_WIDTH_PX = 360;
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
    autoFitViewport: true,
    minWidth: MIN_POPOVER_WIDTH_PX
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9TaW5nbGVEYXRlUGlja2VyLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgY3JlYXRlUG9ydGFsIH0gZnJvbSBcInJlYWN0LWRvbVwiO1xyXG5pbXBvcnQgeyB1c2VGbG9hdGluZ1Bvc2l0aW9uIH0gZnJvbSBcIi4uLy4uL2hvb2tzL3VzZUZsb2F0aW5nUG9zaXRpb24udHNcIjtcclxuaW1wb3J0IHsgQ2hldnJvbkRvd25TdmcsIENoZXZyb25VcFN2ZyB9IGZyb20gXCIuL2NoZXZyb25zLnRzeFwiO1xyXG5cclxuLy8gU2luZ2xlIGRhdGUgcGlja2VyIG1hdGNoaW5nIHRoZSBIaXN0b3JpYWwgRFJQIHZpc3VhbCBzdHlsZS5cclxuLy8gUmV0dXJucyBhbiBJU08gc3RyaW5nICh5eXl5LU1NLWRkKSB2aWEgb25DaGFuZ2UuXHJcblxyXG5jb25zdCBJTkRfSTE4TiA9IGdsb2JhbFRoaXMuX19JTkRfSTE4Tl9fIHx8IHt9O1xuY29uc3QgaW5kVCA9IChrZXksIGZhbGxiYWNrKSA9PiAoSU5EX0kxOE4gJiYgdHlwZW9mIElORF9JMThOW2tleV0gPT09IFwic3RyaW5nXCIgJiYgSU5EX0kxOE5ba2V5XSkgfHwgZmFsbGJhY2sgfHwga2V5O1xuY29uc3QgTUlOX1BPUE9WRVJfV0lEVEhfUFggPSAzNjA7XG5cclxuY29uc3QgcGFkID0gKG4pID0+IFN0cmluZyhuKS5wYWRTdGFydCgyLCBcIjBcIik7XHJcbmNvbnN0IHRvSVNPID0gKGQpID0+IGAke2QuZ2V0RnVsbFllYXIoKX0tJHtwYWQoZC5nZXRNb250aCgpICsgMSl9LSR7cGFkKGQuZ2V0RGF0ZSgpKX1gO1xyXG5cclxuY29uc3QgcGFyc2VJU08gPSAocykgPT4ge1xyXG4gIGlmICghcykgcmV0dXJuIG51bGw7XHJcbiAgY29uc3QgcmF3ID0gU3RyaW5nKHMpLnRyaW0oKTtcclxuICBpZiAoIXJhdykgcmV0dXJuIG51bGw7XHJcbiAgY29uc3QgcGFydHMgPSByYXcuc3BsaXQoXCItXCIpO1xyXG4gIGlmIChwYXJ0cy5sZW5ndGggPT09IDMpIHtcclxuICAgIGNvbnN0IFt5LCBtLCBkXSA9IHBhcnRzLm1hcChOdW1iZXIpO1xyXG4gICAgaWYgKCFOdW1iZXIuaXNOYU4oeSkgJiYgIU51bWJlci5pc05hTihtKSAmJiAhTnVtYmVyLmlzTmFOKGQpKSB7XHJcbiAgICAgIHJldHVybiBuZXcgRGF0ZSh5LCBtIC0gMSwgZCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBudWxsO1xyXG59O1xyXG5cclxuY29uc3Qgbm9ybWFsaXplVWlMb2NhbGUgPSAobG9jYWxlKSA9PiB7XHJcbiAgY29uc3QgdmFsdWUgPSBTdHJpbmcobG9jYWxlIHx8IFwiXCIpLnRyaW0oKTtcclxuICBpZiAoIXZhbHVlKSByZXR1cm4gXCJlcy1FU1wiO1xyXG4gIGlmICgvXnpoLWhhbnMvaS50ZXN0KHZhbHVlKSkgcmV0dXJuIFwiemgtQ05cIjtcclxuICByZXR1cm4gdmFsdWU7XHJcbn07XHJcblxyXG5jb25zdCBnZXRVaUxvY2FsZSA9ICgpID0+IHtcclxuICBjb25zdCBmcm9tSHRtbCA9IGRvY3VtZW50Py5kb2N1bWVudEVsZW1lbnQ/Lmxhbmc7XHJcbiAgaWYgKGZyb21IdG1sICYmIFN0cmluZyhmcm9tSHRtbCkudHJpbSgpKSByZXR1cm4gbm9ybWFsaXplVWlMb2NhbGUoZnJvbUh0bWwpO1xyXG4gIHJldHVybiBcImVzLUVTXCI7XHJcbn07XHJcblxyXG5jb25zdCBpc0Jhc3F1ZUxvY2FsZSA9IChsb2NhbGUpID0+IC9eZXVcXGIvaS50ZXN0KFN0cmluZyhsb2NhbGUgfHwgXCJcIikpO1xyXG5jb25zdCBCQVNRVUVfTU9OVEhTID0gW1xyXG4gIFwidXJ0YXJyaWxhXCIsXHJcbiAgXCJvdHNhaWxhXCIsXHJcbiAgXCJtYXJ0eG9hXCIsXHJcbiAgXCJhcGlyaWxhXCIsXHJcbiAgXCJtYWlhdHphXCIsXHJcbiAgXCJla2FpbmFcIixcclxuICBcInV6dGFpbGFcIixcclxuICBcImFidXp0dWFcIixcclxuICBcImlyYWlsYVwiLFxyXG4gIFwidXJyaWFcIixcclxuICBcImF6YXJvYVwiLFxyXG4gIFwiYWJlbmR1YVwiXHJcbl07XHJcbmNvbnN0IEJBU1FVRV9NT05USFNfU0hPUlQgPSBbXHJcbiAgXCJ1cnRcIixcclxuICBcIm90c1wiLFxyXG4gIFwibWFyXCIsXHJcbiAgXCJhcGlcIixcclxuICBcIm1haVwiLFxyXG4gIFwiZWthXCIsXHJcbiAgXCJ1enRcIixcclxuICBcImFidVwiLFxyXG4gIFwiaXJhXCIsXHJcbiAgXCJ1cnJcIixcclxuICBcImF6YVwiLFxyXG4gIFwiYWJlXCJcclxuXTtcclxuXHJcbmNvbnN0IGZvcm1hdERpc3BsYXkgPSAoZCkgPT4ge1xyXG4gIGlmICghZCkgcmV0dXJuIGluZFQoXCJIaXN0b3J5X0FkZERhdGVcIiwgXCJBZGQgZGF0ZVwiKTtcclxuICBjb25zdCBsb2NhbGUgPSBnZXRVaUxvY2FsZSgpO1xyXG4gIGlmIChpc0Jhc3F1ZUxvY2FsZShsb2NhbGUpKSB7XHJcbiAgICBjb25zdCBtb250aCA9IEJBU1FVRV9NT05USFNfU0hPUlRbZC5nZXRNb250aCgpXTtcclxuICAgIHJldHVybiBgJHtkLmdldERhdGUoKX0gJHttb250aH0gJHtkLmdldEZ1bGxZZWFyKCl9YC50b0xvd2VyQ2FzZSgpO1xyXG4gIH1cclxuICByZXR1cm4gZFxyXG4gICAgLnRvTG9jYWxlRGF0ZVN0cmluZyhsb2NhbGUsIHsgZGF5OiBcIm51bWVyaWNcIiwgbW9udGg6IFwic2hvcnRcIiwgeWVhcjogXCJudW1lcmljXCIgfSlcclxuICAgIC5yZXBsYWNlKC9cXC4vZywgXCJcIilcclxuICAgIC50b0xvd2VyQ2FzZSgpO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gU2luZ2xlRGF0ZVBpY2tlcih7IGxhYmVsLCB2YWx1ZSwgb25DaGFuZ2UsIGRpc2FibGVkID0gZmFsc2UsIHJlYWRPbmx5ID0gZmFsc2UgfSkge1xyXG4gIGNvbnN0IGVmZmVjdGl2ZUxhYmVsID0gKGxhYmVsICYmIFN0cmluZyhsYWJlbCkudHJpbSgpKSA/IGxhYmVsIDogaW5kVChcIlZpc2l0c19EZXRhaWxfRGF0ZV9MYWJlbFwiLCBcIkRhdGVcIik7XHJcbiAgY29uc3Qgc2VsZWN0ZWREYXRlID0gdXNlTWVtbygoKSA9PiBwYXJzZUlTTyh2YWx1ZSksIFt2YWx1ZV0pO1xyXG4gIGNvbnN0IFtvcGVuLCBzZXRPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbY3VycmVudE1vbnRoLCBzZXRDdXJyZW50TW9udGhdID0gdXNlU3RhdGUoXHJcbiAgICBzZWxlY3RlZERhdGUgPyBzZWxlY3RlZERhdGUuZ2V0TW9udGgoKSA6IG5ldyBEYXRlKCkuZ2V0TW9udGgoKVxyXG4gICk7XHJcbiAgY29uc3QgW2N1cnJlbnRZZWFyLCBzZXRDdXJyZW50WWVhcl0gPSB1c2VTdGF0ZShcclxuICAgIHNlbGVjdGVkRGF0ZSA/IHNlbGVjdGVkRGF0ZS5nZXRGdWxsWWVhcigpIDogbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgY29udGFpbmVyUmVmID0gdXNlUmVmKG51bGwpO1xyXG4gIGNvbnN0IHBvcG92ZXJSZWYgPSB1c2VSZWYobnVsbCk7XHJcbiAgY29uc3QgYW5jaG9yUmVmID0gdXNlUmVmKG51bGwpO1xyXG4gIGNvbnN0IHJlYWRPbmx5TW9kZSA9IHJlYWRPbmx5IHx8IGRpc2FibGVkO1xyXG4gIGNvbnN0IGlzUG9wb3Zlck9wZW4gPSBvcGVuICYmICFyZWFkT25seU1vZGU7XHJcbiAgY29uc3QgZmxvYXRpbmdTdHlsZSA9IHVzZUZsb2F0aW5nUG9zaXRpb24oYW5jaG9yUmVmLCBpc1BvcG92ZXJPcGVuLCB7XG4gICAgb3ZlcmxheVJlZjogcG9wb3ZlclJlZixcbiAgICBhdXRvRml0Vmlld3BvcnQ6IHRydWUsXG4gICAgbWluV2lkdGg6IE1JTl9QT1BPVkVSX1dJRFRIX1BYLFxuICB9KTtcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoc2VsZWN0ZWREYXRlKSB7XHJcbiAgICAgIHNldEN1cnJlbnRNb250aChzZWxlY3RlZERhdGUuZ2V0TW9udGgoKSk7XHJcbiAgICAgIHNldEN1cnJlbnRZZWFyKHNlbGVjdGVkRGF0ZS5nZXRGdWxsWWVhcigpKTtcclxuICAgIH1cclxuICB9LCBbc2VsZWN0ZWREYXRlPy5nZXRUaW1lKCldKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IG9uRG9jQ2xpY2sgPSAoZXYpID0+IHtcclxuICAgICAgY29uc3QgdGFyZ2V0ID0gZXYudGFyZ2V0O1xyXG4gICAgICBpZiAoY29udGFpbmVyUmVmLmN1cnJlbnQ/LmNvbnRhaW5zKHRhcmdldCkpIHJldHVybjtcclxuICAgICAgaWYgKHBvcG92ZXJSZWYuY3VycmVudD8uY29udGFpbnModGFyZ2V0KSkgcmV0dXJuO1xyXG4gICAgICBzZXRPcGVuKGZhbHNlKTtcclxuICAgIH07XHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIG9uRG9jQ2xpY2spO1xyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgb25Eb2NDbGljaywgeyBwYXNzaXZlOiB0cnVlIH0pO1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBvbkRvY0NsaWNrKTtcclxuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgb25Eb2NDbGljayk7XHJcbiAgICB9O1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgZmlyc3REYXkgPSBuZXcgRGF0ZShjdXJyZW50WWVhciwgY3VycmVudE1vbnRoLCAxKTtcclxuICBjb25zdCBkYXlzSW5Nb250aCA9IG5ldyBEYXRlKGN1cnJlbnRZZWFyLCBjdXJyZW50TW9udGggKyAxLCAwKS5nZXREYXRlKCk7XHJcbiAgY29uc3Qgb2Zmc2V0ID0gKGZpcnN0RGF5LmdldERheSgpICsgNikgJSA3OyAvLyBNb25kYXkgYXMgMFxyXG5cclxuICBjb25zdCBtb250aExhYmVsID0gKCgpID0+IHtcclxuICAgIGNvbnN0IGxvY2FsZSA9IGdldFVpTG9jYWxlKCk7XHJcbiAgICBpZiAoL156aC9pLnRlc3QobG9jYWxlKSkge1xyXG4gICAgICByZXR1cm4gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQobG9jYWxlLCB7IHllYXI6IFwibnVtZXJpY1wiLCBtb250aDogXCJsb25nXCIgfSkuZm9ybWF0KGZpcnN0RGF5KTtcclxuICAgIH1cclxuICAgIGlmIChpc0Jhc3F1ZUxvY2FsZShsb2NhbGUpKSB7XHJcbiAgICAgIHJldHVybiBgJHtCQVNRVUVfTU9OVEhTW2N1cnJlbnRNb250aF19ICR7Y3VycmVudFllYXJ9YDtcclxuICAgIH1cclxuICAgIGNvbnN0IHJhdyA9IGZpcnN0RGF5LnRvTG9jYWxlRGF0ZVN0cmluZyhsb2NhbGUsIHsgbW9udGg6IFwibG9uZ1wiIH0pO1xyXG4gICAgY29uc3QgZmlyc3QgPSByYXcuc2xpY2UoMCwgMSk7XHJcbiAgICBjb25zdCByZXN0ID0gcmF3LnNsaWNlKDEpO1xyXG4gICAgcmV0dXJuIGAke2ZpcnN0LnRvVXBwZXJDYXNlKCl9JHtyZXN0fSAke2N1cnJlbnRZZWFyfWA7XHJcbiAgfSkoKTtcclxuXHJcbiAgY29uc3Qgc2FtZURheSA9IChhLCBiKSA9PlxyXG4gICAgYSAmJiBiICYmIGEuZ2V0RnVsbFllYXIoKSA9PT0gYi5nZXRGdWxsWWVhcigpICYmIGEuZ2V0TW9udGgoKSA9PT0gYi5nZXRNb250aCgpICYmIGEuZ2V0RGF0ZSgpID09PSBiLmdldERhdGUoKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlU2VsZWN0ID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoZGF0ZU9iaikgPT4ge1xyXG4gICAgICBpZiAoZGlzYWJsZWQpIHJldHVybjtcclxuICAgICAgY29uc3QgaXNvID0gdG9JU08oZGF0ZU9iaik7XHJcbiAgICAgIG9uQ2hhbmdlPy4oaXNvKTtcclxuICAgICAgc2V0T3BlbihmYWxzZSk7XHJcbiAgICB9LFxyXG4gICAgW2Rpc2FibGVkLCBvbkNoYW5nZV1cclxuICApO1xyXG5cclxuICBjb25zdCBnb01vbnRoID0gKGluYykgPT4ge1xyXG4gICAgaWYgKGRpc2FibGVkKSByZXR1cm47XHJcbiAgICBsZXQgbSA9IGN1cnJlbnRNb250aCArIGluYztcclxuICAgIGxldCB5ID0gY3VycmVudFllYXI7XHJcbiAgICBpZiAobSA+IDExKSB7XHJcbiAgICAgIG0gPSAwO1xyXG4gICAgICB5ICs9IDE7XHJcbiAgICB9IGVsc2UgaWYgKG0gPCAwKSB7XHJcbiAgICAgIG0gPSAxMTtcclxuICAgICAgeSAtPSAxO1xyXG4gICAgfVxyXG4gICAgc2V0Q3VycmVudE1vbnRoKG0pO1xyXG4gICAgc2V0Q3VycmVudFllYXIoeSk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgdmFsdWVDb2xvciA9IHJlYWRPbmx5TW9kZSA/IFwiIzY0NzQ4YlwiIDogXCIjMDAyOTZiZTBcIjtcclxuICBjb25zdCBsYWJlbENvbG9yID0gXCIjMDAyOTZiZTBcIjtcclxuICBjb25zdCBjb250YWluZXJDbGFzcyA9IGBzcGFjZS15LTIgJHtkaXNhYmxlZCA/IFwicG9pbnRlci1ldmVudHMtbm9uZSBzZWxlY3Qtbm9uZVwiIDogXCJcIn1gLnRyaW0oKTtcclxuICBjb25zdCBidXR0b25DbGFzcyA9IFtcclxuICAgIFwiZm9ybS1jb250cm9sXCIsXHJcbiAgICBcImZsZXggaXRlbXMtY2VudGVyXCIsXHJcbiAgICBcInByLTEwXCIsXHJcbiAgICByZWFkT25seU1vZGUgPyBcImluZC1yZWFkb25seS1maWVsZFwiIDogXCJcIixcclxuICAgIHJlYWRPbmx5TW9kZSA/IFwiY3Vyc29yLW5vdC1hbGxvd2VkXCIgOiBcImN1cnNvci1wb2ludGVyXCJcclxuICBdLmZpbHRlcihCb29sZWFuKS5qb2luKFwiIFwiKTtcclxuICBjb25zdCBwb3BvdmVyID1cclxuICAgIGlzUG9wb3Zlck9wZW4gJiYgdHlwZW9mIGRvY3VtZW50ICE9PSBcInVuZGVmaW5lZFwiXHJcbiAgICAgID8gY3JlYXRlUG9ydGFsKFxyXG4gICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICByZWY9e3BvcG92ZXJSZWZ9XHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImRycC1wb3BvdmVyXCJcclxuICAgICAgICAgICAgcm9sZT1cImRpYWxvZ1wiXHJcbiAgICAgICAgICAgIGFyaWEtbW9kYWw9XCJ0cnVlXCJcclxuICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICBwb3NpdGlvbjogXCJmaXhlZFwiLFxyXG4gICAgICAgICAgICAgIHRvcDogZmxvYXRpbmdTdHlsZS50b3AsXHJcbiAgICAgICAgICAgICAgbGVmdDogZmxvYXRpbmdTdHlsZS5sZWZ0LFxyXG4gICAgICAgICAgICAgIHdpZHRoOiBmbG9hdGluZ1N0eWxlLndpZHRoLFxyXG4gICAgICAgICAgICAgIG1heEhlaWdodDogZmxvYXRpbmdTdHlsZS5tYXhIZWlnaHQsXHJcbiAgICAgICAgICAgICAgekluZGV4OiAzNjAwMDAsXHJcbiAgICAgICAgICAgICAgb3ZlcmZsb3dZOiBcImF1dG9cIixcclxuICAgICAgICAgICAgICBvdmVyc2Nyb2xsQmVoYXZpb3I6IFwiY29udGFpblwiLFxyXG4gICAgICAgICAgICB9fVxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRycC1oZWFkXCI+XHJcbiAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiZHJwLW5hdlwiIGFyaWEtbGFiZWw9e2luZFQoXCJIaXN0b3J5X1ByZXZNb250aFwiLCBcIlByZXZpb3VzIG1vbnRoXCIpfSBvbkNsaWNrPXsoKSA9PiBnb01vbnRoKC0xKX0+XHJcbiAgICAgICAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBjbGFzc05hbWU9XCJoLTQgdy00XCIgZmlsbD1cIm5vbmVcIiB2aWV3Qm94PVwiMCAwIDMwIDMwXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBzdHJva2VXaWR0aD1cIjJcIiBkPVwiTTE1IDE5bC03LTcgNy03XCIgLz5cclxuICAgICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZHJwLW1vbnRoXCI+e21vbnRoTGFiZWx9PC9kaXY+XHJcbiAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiZHJwLW5hdlwiIGFyaWEtbGFiZWw9e2luZFQoXCJIaXN0b3J5X05leHRNb250aFwiLCBcIk5leHQgbW9udGhcIil9IG9uQ2xpY2s9eygpID0+IGdvTW9udGgoMSl9PlxyXG4gICAgICAgICAgICAgICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgY2xhc3NOYW1lPVwiaC00IHctNFwiIGZpbGw9XCJub25lXCIgdmlld0JveD1cIjAgMCAzMCAzMFwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiPlxyXG4gICAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgc3Ryb2tlV2lkdGg9XCIyXCIgZD1cIk05IDVsNyA3LTcgN1wiIC8+XHJcbiAgICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZHJwLXdlZWtkYXlzXCI+XHJcbiAgICAgICAgICAgICAgPHNwYW4+e2luZFQoXCJIaXN0b3J5X0RheV9Nb25cIiwgXCJNb1wiKX08L3NwYW4+PHNwYW4+e2luZFQoXCJIaXN0b3J5X0RheV9UdWVcIiwgXCJUdVwiKX08L3NwYW4+PHNwYW4+e2luZFQoXCJIaXN0b3J5X0RheV9XZWRcIiwgXCJXZVwiKX08L3NwYW4+PHNwYW4+e2luZFQoXCJIaXN0b3J5X0RheV9UaHVcIiwgXCJUaFwiKX08L3NwYW4+PHNwYW4+e2luZFQoXCJIaXN0b3J5X0RheV9GcmlcIiwgXCJGclwiKX08L3NwYW4+PHNwYW4+e2luZFQoXCJIaXN0b3J5X0RheV9TYXRcIiwgXCJTYVwiKX08L3NwYW4+PHNwYW4+e2luZFQoXCJIaXN0b3J5X0RheV9TdW5cIiwgXCJTdVwiKX08L3NwYW4+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRycC1ncmlkXCI+XHJcbiAgICAgICAgICAgICAge0FycmF5LmZyb20oeyBsZW5ndGg6IG9mZnNldCB9KS5tYXAoKF8sIGkpID0+IChcclxuICAgICAgICAgICAgICAgIDxidXR0b24ga2V5PXtgZS0ke2l9YH0gY2xhc3NOYW1lPVwiZHJwLWRheSBlbXB0eVwiIGRpc2FibGVkIHR5cGU9XCJidXR0b25cIiAvPlxyXG4gICAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgICAgIHtBcnJheS5mcm9tKHsgbGVuZ3RoOiBkYXlzSW5Nb250aCB9KS5tYXAoKF8sIGlkeCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZGF5ID0gaWR4ICsgMTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGVPYmogPSBuZXcgRGF0ZShjdXJyZW50WWVhciwgY3VycmVudE1vbnRoLCBkYXkpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaXNTZWxlY3RlZCA9IHNhbWVEYXkoZGF0ZU9iaiwgc2VsZWN0ZWREYXRlKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGlzVG9kYXkgPSBzYW1lRGF5KGRhdGVPYmosIG5ldyBEYXRlKCkpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2xzID0gW1xyXG4gICAgICAgICAgICAgICAgICBcImRycC1kYXlcIixcclxuICAgICAgICAgICAgICAgICAgaXNTZWxlY3RlZCA/IFwic3RhcnQgcmFuZ2Utc3RhcnRcIiA6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgIGlzVG9kYXkgPyBcInRvZGF5XCIgOiBcIlwiXHJcbiAgICAgICAgICAgICAgICBdLmpvaW4oXCIgXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgIGtleT17dG9JU08oZGF0ZU9iail9XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbHN9XHJcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlU2VsZWN0KGRhdGVPYmopfVxyXG4gICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAge2RheX1cclxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgIH0pfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkcnAtc3RhdHVzXCI+e2luZFQoXCJEYXRlUGlja2VyX1NlbGVjdERhdGVcIiwgXCJTZWxlY3QgZGF0ZVwiKX08L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PixcclxuICAgICAgICAgIGRvY3VtZW50LmJvZHlcclxuICAgICAgICApXHJcbiAgICAgIDogbnVsbDtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPXtjb250YWluZXJDbGFzc30gcmVmPXtjb250YWluZXJSZWZ9PlxyXG4gICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZm9ybS1sYWJlbCBmb250LXNlbWlib2xkXCIgc3R5bGU9e3sgY29sb3I6IGxhYmVsQ29sb3IgfX0+e1N0cmluZyhlZmZlY3RpdmVMYWJlbCl9PC9sYWJlbD5cclxuICAgICAgPGRpdiByZWY9e2FuY2hvclJlZn0gY2xhc3NOYW1lPVwicmVsYXRpdmVcIj5cclxuICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgIGNsYXNzTmFtZT17YnV0dG9uQ2xhc3N9XHJcbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZWFkT25seU1vZGUpIHJldHVybjtcclxuICAgICAgICAgICAgc2V0T3BlbigodikgPT4gIXYpO1xyXG4gICAgICAgICAgfX1cclxuICAgICAgICAgIG9uS2V5RG93bj17KGUpID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlYWRPbmx5TW9kZSkgcmV0dXJuO1xyXG4gICAgICAgICAgICBpZiAoZS5rZXkgPT09IFwiRW50ZXJcIiB8fCBlLmtleSA9PT0gXCIgXCIpIHtcclxuICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgc2V0T3BlbigodikgPT4gIXYpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChlLmtleSA9PT0gXCJFc2NhcGVcIikgc2V0T3BlbihmYWxzZSk7XHJcbiAgICAgICAgICB9fVxyXG4gICAgICAgICAgYXJpYS1leHBhbmRlZD17aXNQb3BvdmVyT3Blbn1cclxuICAgICAgICAgIGFyaWEtZGlzYWJsZWQ9e3JlYWRPbmx5TW9kZSA/IFwidHJ1ZVwiIDogdW5kZWZpbmVkfVxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGNvbG9yOiB2YWx1ZUNvbG9yLCBmb250V2VpZ2h0OiA0MDAgfX0+e2Zvcm1hdERpc3BsYXkoc2VsZWN0ZWREYXRlKX08L3NwYW4+XHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQteS0wIHJpZ2h0LTAgZmxleCBpdGVtcy1jZW50ZXIgcHItMiB0ZXh0LXNsYXRlLTUwMCBwb2ludGVyLWV2ZW50cy1ub25lXCI+XHJcbiAgICAgICAgICB7aXNQb3BvdmVyT3BlbiA/IDxDaGV2cm9uVXBTdmcgY2xhc3NOYW1lPVwiaC01IHctNVwiIC8+IDogPENoZXZyb25Eb3duU3ZnIGNsYXNzTmFtZT1cImgtNSB3LTVcIiAvPn1cclxuICAgICAgICA8L3NwYW4+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICB7cG9wb3Zlcn1cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn1cclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbUJBQXlFO0FBQ3pFLHVCQUE2QjtBQTJNakI7QUFwTVosSUFBTSxXQUFXLFdBQVcsZ0JBQWdCLENBQUM7QUFDN0MsSUFBTSxPQUFPLENBQUMsS0FBSyxhQUFjLFlBQVksT0FBTyxTQUFTLEdBQUcsTUFBTSxZQUFZLFNBQVMsR0FBRyxLQUFNLFlBQVk7QUFDaEgsSUFBTSx1QkFBdUI7QUFFN0IsSUFBTSxNQUFNLENBQUMsTUFBTSxPQUFPLENBQUMsRUFBRSxTQUFTLEdBQUcsR0FBRztBQUM1QyxJQUFNLFFBQVEsQ0FBQyxNQUFNLEdBQUcsRUFBRSxZQUFZLENBQUMsSUFBSSxJQUFJLEVBQUUsU0FBUyxJQUFJLENBQUMsQ0FBQyxJQUFJLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztBQUVwRixJQUFNLFdBQVcsQ0FBQyxNQUFNO0FBQ3RCLE1BQUksQ0FBQyxFQUFHLFFBQU87QUFDZixRQUFNLE1BQU0sT0FBTyxDQUFDLEVBQUUsS0FBSztBQUMzQixNQUFJLENBQUMsSUFBSyxRQUFPO0FBQ2pCLFFBQU0sUUFBUSxJQUFJLE1BQU0sR0FBRztBQUMzQixNQUFJLE1BQU0s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
