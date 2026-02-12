import {
  ChevronDownSvg,
  ChevronUpSvg
} from "./chunk-FICWEV5U.js";
import {
  require_jsx_runtime,
  require_react
} from "./chunk-BWM3JLWG.js";
import {
  __toESM
} from "./chunk-45FWCHS2.js";

// Web/wwwroot/react/src/components/commons/SingleDatePicker.tsx
var import_react = __toESM(require_react());
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
  (0, import_react.useEffect)(() => {
    if (selectedDate) {
      setCurrentMonth(selectedDate.getMonth());
      setCurrentYear(selectedDate.getFullYear());
    }
  }, [selectedDate?.getTime()]);
  (0, import_react.useEffect)(() => {
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
  (0, import_react.useEffect)(() => {
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: containerClass, ref: containerRef, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "form-label font-semibold", style: { color: labelColor }, children: String(effectiveLabel) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "relative", children: [
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
          "aria-expanded": open,
          "aria-disabled": readOnlyMode ? "true" : void 0,
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { color: valueColor, fontWeight: 400 }, children: formatDisplay(selectedDate) })
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-y-0 right-0 flex items-center pr-2 text-slate-500 pointer-events-none", children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUpSvg, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDownSvg, { className: "h-5 w-5" }) }),
      open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "drp-popover", role: "dialog", "aria-modal": "true", children: [
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
      ] })
    ] })
  ] });
}

export {
  SingleDatePicker
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9TaW5nbGVEYXRlUGlja2VyLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IENoZXZyb25Eb3duU3ZnLCBDaGV2cm9uVXBTdmcgfSBmcm9tIFwiLi9jaGV2cm9ucy50c3hcIjtcblxyXG4vLyBTaW5nbGUgZGF0ZSBwaWNrZXIgbWF0Y2hpbmcgdGhlIEhpc3RvcmlhbCBEUlAgdmlzdWFsIHN0eWxlLlxyXG4vLyBSZXR1cm5zIGFuIElTTyBzdHJpbmcgKHl5eXktTU0tZGQpIHZpYSBvbkNoYW5nZS5cclxuXHJcbmNvbnN0IElORF9JMThOID0gZ2xvYmFsVGhpcy5fX0lORF9JMThOX18gfHwge307XHJcbmNvbnN0IGluZFQgPSAoa2V5LCBmYWxsYmFjaykgPT4gKElORF9JMThOICYmIHR5cGVvZiBJTkRfSTE4TltrZXldID09PSBcInN0cmluZ1wiICYmIElORF9JMThOW2tleV0pIHx8IGZhbGxiYWNrIHx8IGtleTtcclxuXHJcbmNvbnN0IHBhZCA9IChuKSA9PiBTdHJpbmcobikucGFkU3RhcnQoMiwgXCIwXCIpO1xyXG5jb25zdCB0b0lTTyA9IChkKSA9PiBgJHtkLmdldEZ1bGxZZWFyKCl9LSR7cGFkKGQuZ2V0TW9udGgoKSArIDEpfS0ke3BhZChkLmdldERhdGUoKSl9YDtcclxuXHJcbmNvbnN0IHBhcnNlSVNPID0gKHMpID0+IHtcclxuICBpZiAoIXMpIHJldHVybiBudWxsO1xyXG4gIGNvbnN0IHJhdyA9IFN0cmluZyhzKS50cmltKCk7XHJcbiAgaWYgKCFyYXcpIHJldHVybiBudWxsO1xyXG4gIGNvbnN0IHBhcnRzID0gcmF3LnNwbGl0KFwiLVwiKTtcclxuICBpZiAocGFydHMubGVuZ3RoID09PSAzKSB7XHJcbiAgICBjb25zdCBbeSwgbSwgZF0gPSBwYXJ0cy5tYXAoTnVtYmVyKTtcclxuICAgIGlmICghTnVtYmVyLmlzTmFOKHkpICYmICFOdW1iZXIuaXNOYU4obSkgJiYgIU51bWJlci5pc05hTihkKSkge1xyXG4gICAgICByZXR1cm4gbmV3IERhdGUoeSwgbSAtIDEsIGQpO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gbnVsbDtcclxufTtcclxuXHJcbmNvbnN0IG5vcm1hbGl6ZVVpTG9jYWxlID0gKGxvY2FsZSkgPT4ge1xyXG4gIGNvbnN0IHZhbHVlID0gU3RyaW5nKGxvY2FsZSB8fCBcIlwiKS50cmltKCk7XHJcbiAgaWYgKCF2YWx1ZSkgcmV0dXJuIFwiZXMtRVNcIjtcclxuICBpZiAoL156aC1oYW5zL2kudGVzdCh2YWx1ZSkpIHJldHVybiBcInpoLUNOXCI7XHJcbiAgcmV0dXJuIHZhbHVlO1xyXG59O1xyXG5cclxuY29uc3QgZ2V0VWlMb2NhbGUgPSAoKSA9PiB7XHJcbiAgY29uc3QgZnJvbUh0bWwgPSBkb2N1bWVudD8uZG9jdW1lbnRFbGVtZW50Py5sYW5nO1xyXG4gIGlmIChmcm9tSHRtbCAmJiBTdHJpbmcoZnJvbUh0bWwpLnRyaW0oKSkgcmV0dXJuIG5vcm1hbGl6ZVVpTG9jYWxlKGZyb21IdG1sKTtcclxuICByZXR1cm4gXCJlcy1FU1wiO1xyXG59O1xyXG5cclxuY29uc3QgaXNCYXNxdWVMb2NhbGUgPSAobG9jYWxlKSA9PiAvXmV1XFxiL2kudGVzdChTdHJpbmcobG9jYWxlIHx8IFwiXCIpKTtcclxuY29uc3QgQkFTUVVFX01PTlRIUyA9IFtcclxuICBcInVydGFycmlsYVwiLFxyXG4gIFwib3RzYWlsYVwiLFxyXG4gIFwibWFydHhvYVwiLFxyXG4gIFwiYXBpcmlsYVwiLFxyXG4gIFwibWFpYXR6YVwiLFxyXG4gIFwiZWthaW5hXCIsXHJcbiAgXCJ1enRhaWxhXCIsXHJcbiAgXCJhYnV6dHVhXCIsXHJcbiAgXCJpcmFpbGFcIixcclxuICBcInVycmlhXCIsXHJcbiAgXCJhemFyb2FcIixcclxuICBcImFiZW5kdWFcIlxyXG5dO1xyXG5jb25zdCBCQVNRVUVfTU9OVEhTX1NIT1JUID0gW1xyXG4gIFwidXJ0XCIsXHJcbiAgXCJvdHNcIixcclxuICBcIm1hclwiLFxyXG4gIFwiYXBpXCIsXHJcbiAgXCJtYWlcIixcclxuICBcImVrYVwiLFxyXG4gIFwidXp0XCIsXHJcbiAgXCJhYnVcIixcclxuICBcImlyYVwiLFxyXG4gIFwidXJyXCIsXHJcbiAgXCJhemFcIixcclxuICBcImFiZVwiXHJcbl07XHJcblxyXG5jb25zdCBmb3JtYXREaXNwbGF5ID0gKGQpID0+IHtcclxuICBpZiAoIWQpIHJldHVybiBpbmRUKFwiSGlzdG9yeV9BZGREYXRlXCIsIFwiQWRkIGRhdGVcIik7XHJcbiAgY29uc3QgbG9jYWxlID0gZ2V0VWlMb2NhbGUoKTtcclxuICBpZiAoaXNCYXNxdWVMb2NhbGUobG9jYWxlKSkge1xyXG4gICAgY29uc3QgbW9udGggPSBCQVNRVUVfTU9OVEhTX1NIT1JUW2QuZ2V0TW9udGgoKV07XHJcbiAgICByZXR1cm4gYCR7ZC5nZXREYXRlKCl9ICR7bW9udGh9ICR7ZC5nZXRGdWxsWWVhcigpfWAudG9Mb3dlckNhc2UoKTtcclxuICB9XHJcbiAgcmV0dXJuIGRcclxuICAgIC50b0xvY2FsZURhdGVTdHJpbmcobG9jYWxlLCB7IGRheTogXCJudW1lcmljXCIsIG1vbnRoOiBcInNob3J0XCIsIHllYXI6IFwibnVtZXJpY1wiIH0pXHJcbiAgICAucmVwbGFjZSgvXFwuL2csIFwiXCIpXHJcbiAgICAudG9Mb3dlckNhc2UoKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFNpbmdsZURhdGVQaWNrZXIoeyBsYWJlbCwgdmFsdWUsIG9uQ2hhbmdlLCBkaXNhYmxlZCA9IGZhbHNlLCByZWFkT25seSA9IGZhbHNlIH0pIHtcbiAgY29uc3QgZWZmZWN0aXZlTGFiZWwgPSAobGFiZWwgJiYgU3RyaW5nKGxhYmVsKS50cmltKCkpID8gbGFiZWwgOiBpbmRUKFwiVmlzaXRzX0RldGFpbF9EYXRlX0xhYmVsXCIsIFwiRGF0ZVwiKTtcbiAgY29uc3Qgc2VsZWN0ZWREYXRlID0gdXNlTWVtbygoKSA9PiBwYXJzZUlTTyh2YWx1ZSksIFt2YWx1ZV0pO1xuICBjb25zdCBbb3Blbiwgc2V0T3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtjdXJyZW50TW9udGgsIHNldEN1cnJlbnRNb250aF0gPSB1c2VTdGF0ZShcclxuICAgIHNlbGVjdGVkRGF0ZSA/IHNlbGVjdGVkRGF0ZS5nZXRNb250aCgpIDogbmV3IERhdGUoKS5nZXRNb250aCgpXHJcbiAgKTtcclxuICBjb25zdCBbY3VycmVudFllYXIsIHNldEN1cnJlbnRZZWFyXSA9IHVzZVN0YXRlKFxyXG4gICAgc2VsZWN0ZWREYXRlID8gc2VsZWN0ZWREYXRlLmdldEZ1bGxZZWFyKCkgOiBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKClcclxuICApO1xyXG5cclxuICBjb25zdCBjb250YWluZXJSZWYgPSB1c2VSZWYobnVsbCk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoc2VsZWN0ZWREYXRlKSB7XHJcbiAgICAgIHNldEN1cnJlbnRNb250aChzZWxlY3RlZERhdGUuZ2V0TW9udGgoKSk7XHJcbiAgICAgIHNldEN1cnJlbnRZZWFyKHNlbGVjdGVkRGF0ZS5nZXRGdWxsWWVhcigpKTtcclxuICAgIH1cclxuICB9LCBbc2VsZWN0ZWREYXRlPy5nZXRUaW1lKCldKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IG9uRG9jQ2xpY2sgPSAoZXYpID0+IHtcbiAgICAgIGlmICghY29udGFpbmVyUmVmLmN1cnJlbnQpIHJldHVybjtcbiAgICAgIGlmICghY29udGFpbmVyUmVmLmN1cnJlbnQuY29udGFpbnMoZXYudGFyZ2V0KSkge1xuICAgICAgICBzZXRPcGVuKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgb25Eb2NDbGljayk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgb25Eb2NDbGljaywgeyBwYXNzaXZlOiB0cnVlIH0pO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIG9uRG9jQ2xpY2spO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgb25Eb2NDbGljayk7XG4gICAgfTtcbiAgfSwgW10pO1xuXHJcbiAgY29uc3QgcmVhZE9ubHlNb2RlID0gcmVhZE9ubHkgfHwgZGlzYWJsZWQ7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAocmVhZE9ubHlNb2RlKSBzZXRPcGVuKGZhbHNlKTtcbiAgfSwgW3JlYWRPbmx5TW9kZV0pO1xuXG4gIGNvbnN0IGZpcnN0RGF5ID0gbmV3IERhdGUoY3VycmVudFllYXIsIGN1cnJlbnRNb250aCwgMSk7XG4gIGNvbnN0IGRheXNJbk1vbnRoID0gbmV3IERhdGUoY3VycmVudFllYXIsIGN1cnJlbnRNb250aCArIDEsIDApLmdldERhdGUoKTtcclxuICBjb25zdCBvZmZzZXQgPSAoZmlyc3REYXkuZ2V0RGF5KCkgKyA2KSAlIDc7IC8vIE1vbmRheSBhcyAwXHJcblxyXG4gIGNvbnN0IG1vbnRoTGFiZWwgPSAoKCkgPT4ge1xyXG4gICAgY29uc3QgbG9jYWxlID0gZ2V0VWlMb2NhbGUoKTtcclxuICAgIGlmICgvXnpoL2kudGVzdChsb2NhbGUpKSB7XHJcbiAgICAgIHJldHVybiBuZXcgSW50bC5EYXRlVGltZUZvcm1hdChsb2NhbGUsIHsgeWVhcjogXCJudW1lcmljXCIsIG1vbnRoOiBcImxvbmdcIiB9KS5mb3JtYXQoZmlyc3REYXkpO1xyXG4gICAgfVxyXG4gICAgaWYgKGlzQmFzcXVlTG9jYWxlKGxvY2FsZSkpIHtcclxuICAgICAgcmV0dXJuIGAke0JBU1FVRV9NT05USFNbY3VycmVudE1vbnRoXX0gJHtjdXJyZW50WWVhcn1gO1xyXG4gICAgfVxyXG4gICAgY29uc3QgcmF3ID0gZmlyc3REYXkudG9Mb2NhbGVEYXRlU3RyaW5nKGxvY2FsZSwgeyBtb250aDogXCJsb25nXCIgfSk7XHJcbiAgICBjb25zdCBmaXJzdCA9IHJhdy5zbGljZSgwLCAxKTtcclxuICAgIGNvbnN0IHJlc3QgPSByYXcuc2xpY2UoMSk7XHJcbiAgICByZXR1cm4gYCR7Zmlyc3QudG9VcHBlckNhc2UoKX0ke3Jlc3R9ICR7Y3VycmVudFllYXJ9YDtcclxuICB9KSgpO1xyXG5cclxuICBjb25zdCBzYW1lRGF5ID0gKGEsIGIpID0+XHJcbiAgICBhICYmIGIgJiYgYS5nZXRGdWxsWWVhcigpID09PSBiLmdldEZ1bGxZZWFyKCkgJiYgYS5nZXRNb250aCgpID09PSBiLmdldE1vbnRoKCkgJiYgYS5nZXREYXRlKCkgPT09IGIuZ2V0RGF0ZSgpO1xyXG5cclxuICBjb25zdCBoYW5kbGVTZWxlY3QgPSB1c2VDYWxsYmFjayhcclxuICAgIChkYXRlT2JqKSA9PiB7XHJcbiAgICAgIGlmIChkaXNhYmxlZCkgcmV0dXJuO1xyXG4gICAgICBjb25zdCBpc28gPSB0b0lTTyhkYXRlT2JqKTtcclxuICAgICAgb25DaGFuZ2U/Lihpc28pO1xyXG4gICAgICBzZXRPcGVuKGZhbHNlKTtcclxuICAgIH0sXHJcbiAgICBbZGlzYWJsZWQsIG9uQ2hhbmdlXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGdvTW9udGggPSAoaW5jKSA9PiB7XHJcbiAgICBpZiAoZGlzYWJsZWQpIHJldHVybjtcclxuICAgIGxldCBtID0gY3VycmVudE1vbnRoICsgaW5jO1xyXG4gICAgbGV0IHkgPSBjdXJyZW50WWVhcjtcclxuICAgIGlmIChtID4gMTEpIHtcclxuICAgICAgbSA9IDA7XHJcbiAgICAgIHkgKz0gMTtcclxuICAgIH0gZWxzZSBpZiAobSA8IDApIHtcclxuICAgICAgbSA9IDExO1xyXG4gICAgICB5IC09IDE7XHJcbiAgICB9XHJcbiAgICBzZXRDdXJyZW50TW9udGgobSk7XHJcbiAgICBzZXRDdXJyZW50WWVhcih5KTtcclxuICB9O1xyXG5cclxuICBjb25zdCB2YWx1ZUNvbG9yID0gcmVhZE9ubHlNb2RlID8gXCIjNjQ3NDhiXCIgOiBcIiMwMDI5NmJlMFwiO1xuICBjb25zdCBsYWJlbENvbG9yID0gXCIjMDAyOTZiZTBcIjtcbiAgY29uc3QgY29udGFpbmVyQ2xhc3MgPSBgc3BhY2UteS0yICR7ZGlzYWJsZWQgPyBcInBvaW50ZXItZXZlbnRzLW5vbmUgc2VsZWN0LW5vbmVcIiA6IFwiXCJ9YC50cmltKCk7XG4gIGNvbnN0IGJ1dHRvbkNsYXNzID0gW1xuICAgIFwiZm9ybS1jb250cm9sXCIsXG4gICAgXCJmbGV4IGl0ZW1zLWNlbnRlclwiLFxuICAgIFwicHItMTBcIixcbiAgICByZWFkT25seU1vZGUgPyBcImluZC1yZWFkb25seS1maWVsZFwiIDogXCJcIixcbiAgICByZWFkT25seU1vZGUgPyBcImN1cnNvci1ub3QtYWxsb3dlZFwiIDogXCJjdXJzb3ItcG9pbnRlclwiXG4gIF0uZmlsdGVyKEJvb2xlYW4pLmpvaW4oXCIgXCIpO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e2NvbnRhaW5lckNsYXNzfSByZWY9e2NvbnRhaW5lclJlZn0+XG4gICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZm9ybS1sYWJlbCBmb250LXNlbWlib2xkXCIgc3R5bGU9e3sgY29sb3I6IGxhYmVsQ29sb3IgfX0+e1N0cmluZyhlZmZlY3RpdmVMYWJlbCl9PC9sYWJlbD5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmVcIj5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgIGNsYXNzTmFtZT17YnV0dG9uQ2xhc3N9XG4gICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgaWYgKHJlYWRPbmx5TW9kZSkgcmV0dXJuO1xuICAgICAgICAgICAgc2V0T3BlbigodikgPT4gIXYpO1xuICAgICAgICAgIH19XG4gICAgICAgICAgb25LZXlEb3duPXsoZSkgPT4ge1xuICAgICAgICAgICAgaWYgKHJlYWRPbmx5TW9kZSkgcmV0dXJuO1xuICAgICAgICAgICAgaWYgKGUua2V5ID09PSBcIkVudGVyXCIgfHwgZS5rZXkgPT09IFwiIFwiKSB7XG4gICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgc2V0T3BlbigodikgPT4gIXYpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGUua2V5ID09PSBcIkVzY2FwZVwiKSBzZXRPcGVuKGZhbHNlKTtcbiAgICAgICAgICB9fVxuICAgICAgICAgIGFyaWEtZXhwYW5kZWQ9e29wZW59XG4gICAgICAgICAgYXJpYS1kaXNhYmxlZD17cmVhZE9ubHlNb2RlID8gXCJ0cnVlXCIgOiB1bmRlZmluZWR9XG4gICAgICAgID5cbiAgICAgICAgICA8c3BhbiBzdHlsZT17eyBjb2xvcjogdmFsdWVDb2xvciwgZm9udFdlaWdodDogNDAwIH19Pntmb3JtYXREaXNwbGF5KHNlbGVjdGVkRGF0ZSl9PC9zcGFuPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQteS0wIHJpZ2h0LTAgZmxleCBpdGVtcy1jZW50ZXIgcHItMiB0ZXh0LXNsYXRlLTUwMCBwb2ludGVyLWV2ZW50cy1ub25lXCI+XG4gICAgICAgICAge29wZW4gPyA8Q2hldnJvblVwU3ZnIGNsYXNzTmFtZT1cImgtNSB3LTVcIiAvPiA6IDxDaGV2cm9uRG93blN2ZyBjbGFzc05hbWU9XCJoLTUgdy01XCIgLz59XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgICAge29wZW4gJiYgKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZHJwLXBvcG92ZXJcIiByb2xlPVwiZGlhbG9nXCIgYXJpYS1tb2RhbD1cInRydWVcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZHJwLWhlYWRcIj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiZHJwLW5hdlwiIGFyaWEtbGFiZWw9e2luZFQoXCJIaXN0b3J5X1ByZXZNb250aFwiLCBcIlByZXZpb3VzIG1vbnRoXCIpfSBvbkNsaWNrPXsoKSA9PiBnb01vbnRoKC0xKX0+XG4gICAgICAgICAgICAgICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgY2xhc3NOYW1lPVwiaC00IHctNFwiIGZpbGw9XCJub25lXCIgdmlld0JveD1cIjAgMCAzMCAzMFwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiPlxuICAgICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIHN0cm9rZVdpZHRoPVwiMlwiIGQ9XCJNMTUgMTlsLTctNyA3LTdcIiAvPlxuICAgICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkcnAtbW9udGhcIj57bW9udGhMYWJlbH08L2Rpdj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiZHJwLW5hdlwiIGFyaWEtbGFiZWw9e2luZFQoXCJIaXN0b3J5X05leHRNb250aFwiLCBcIk5leHQgbW9udGhcIil9IG9uQ2xpY2s9eygpID0+IGdvTW9udGgoMSl9PlxuICAgICAgICAgICAgICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGNsYXNzTmFtZT1cImgtNCB3LTRcIiBmaWxsPVwibm9uZVwiIHZpZXdCb3g9XCIwIDAgMzAgMzBcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIj5cbiAgICAgICAgICAgICAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBzdHJva2VXaWR0aD1cIjJcIiBkPVwiTTkgNWw3IDctNyA3XCIgLz5cbiAgICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZHJwLXdlZWtkYXlzXCI+XG4gICAgICAgICAgICAgIDxzcGFuPntpbmRUKFwiSGlzdG9yeV9EYXlfTW9uXCIsIFwiTW9cIil9PC9zcGFuPjxzcGFuPntpbmRUKFwiSGlzdG9yeV9EYXlfVHVlXCIsIFwiVHVcIil9PC9zcGFuPjxzcGFuPntpbmRUKFwiSGlzdG9yeV9EYXlfV2VkXCIsIFwiV2VcIil9PC9zcGFuPjxzcGFuPntpbmRUKFwiSGlzdG9yeV9EYXlfVGh1XCIsIFwiVGhcIil9PC9zcGFuPjxzcGFuPntpbmRUKFwiSGlzdG9yeV9EYXlfRnJpXCIsIFwiRnJcIil9PC9zcGFuPjxzcGFuPntpbmRUKFwiSGlzdG9yeV9EYXlfU2F0XCIsIFwiU2FcIil9PC9zcGFuPjxzcGFuPntpbmRUKFwiSGlzdG9yeV9EYXlfU3VuXCIsIFwiU3VcIil9PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRycC1ncmlkXCI+XG4gICAgICAgICAgICAgIHtBcnJheS5mcm9tKHsgbGVuZ3RoOiBvZmZzZXQgfSkubWFwKChfLCBpKSA9PiAoXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBrZXk9e2BlLSR7aX1gfSBjbGFzc05hbWU9XCJkcnAtZGF5IGVtcHR5XCIgZGlzYWJsZWQgdHlwZT1cImJ1dHRvblwiIC8+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICB7QXJyYXkuZnJvbSh7IGxlbmd0aDogZGF5c0luTW9udGggfSkubWFwKChfLCBpZHgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXkgPSBpZHggKyAxO1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGVPYmogPSBuZXcgRGF0ZShjdXJyZW50WWVhciwgY3VycmVudE1vbnRoLCBkYXkpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGlzU2VsZWN0ZWQgPSBzYW1lRGF5KGRhdGVPYmosIHNlbGVjdGVkRGF0ZSk7XG4gICAgICAgICAgICAgICAgY29uc3QgaXNUb2RheSA9IHNhbWVEYXkoZGF0ZU9iaiwgbmV3IERhdGUoKSk7XG4gICAgICAgICAgICAgICAgY29uc3QgY2xzID0gW1xuICAgICAgICAgICAgICAgICAgXCJkcnAtZGF5XCIsXG4gICAgICAgICAgICAgICAgICBpc1NlbGVjdGVkID8gXCJzdGFydCByYW5nZS1zdGFydFwiIDogXCJcIixcbiAgICAgICAgICAgICAgICAgIGlzVG9kYXkgPyBcInRvZGF5XCIgOiBcIlwiXG4gICAgICAgICAgICAgICAgXS5qb2luKFwiIFwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBrZXk9e3RvSVNPKGRhdGVPYmopfVxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbHN9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZVNlbGVjdChkYXRlT2JqKX1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAge2RheX1cbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRycC1zdGF0dXNcIj57aW5kVChcIkRhdGVQaWNrZXJfU2VsZWN0RGF0ZVwiLCBcIlNlbGVjdCBkYXRlXCIpfTwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XHJcbiAgKTtcclxufVxyXG4i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
