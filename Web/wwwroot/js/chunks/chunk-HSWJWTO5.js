import {
  classNames
} from "./chunk-OO4T3BDP.js";
import {
  require_jsx_runtime
} from "./chunk-BWM3JLWG.js";
import {
  __toESM
} from "./chunk-45FWCHS2.js";

// Web/wwwroot/react/src/pages/visitas/historial/HistorySummary.tsx
var import_jsx_runtime = __toESM(require_jsx_runtime());
var HistorySummary = ({
  summaryFromLabel,
  summaryToLabel,
  fromValue,
  toValue,
  className = "",
  clientLabel = "",
  clientValue = "",
  showClient = false
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: `history-filter-summary flex flex-wrap items-center gap-x-3 gap-y-2 text-xs ${className}`.trim(), children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "font-semibold", children: [
        summaryFromLabel,
        ":"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: fromValue }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "font-semibold", children: [
        summaryToLabel,
        ":"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: toValue })
    ] }),
    showClient && clientValue ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "history-filter-summary mt-1.5 flex items-center gap-2 text-xs min-w-0", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "font-semibold shrink-0", children: [
        clientLabel,
        ":"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "min-w-0 flex-1 truncate", children: clientValue })
    ] }) : null
  ] });
};
var HistorySummary_default = HistorySummary;

// Web/wwwroot/react/src/pages/visitas/historial/HistoryManualDatePicker.tsx
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var HistoryManualDatePicker = ({
  activatorRef,
  popoverRef,
  showManualError,
  showStartError,
  showEndError,
  filterTitle,
  isOpen,
  selectingStep,
  labelFrom,
  labelTo,
  startDateText,
  endDateText,
  clearRangeLabel,
  hasSelectedRange,
  monthLabel,
  weekDayLabels,
  statusText,
  dayCells,
  prevMonthLabel,
  nextMonthLabel,
  onOpenPopover,
  onActivatorKeyDown,
  onSectionKeyDown,
  onClear,
  onPrevMonth,
  onNextMonth,
  onGridMouseLeave,
  onDayClick,
  onDayHover
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "relative", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
      "div",
      {
        id: "drpActivator",
        ref: activatorRef,
        className: classNames("drp w-full", showManualError ? "drp-error" : ""),
        onClick: () => onOpenPopover("start"),
        role: "button",
        tabIndex: 0,
        "aria-label": filterTitle,
        "aria-haspopup": "dialog",
        "aria-expanded": isOpen,
        onKeyDown: onActivatorKeyDown,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
            "div",
            {
              className: classNames(
                "drp-section",
                selectingStep === "start" && isOpen ? "active" : "",
                showStartError ? "is-error" : ""
              ),
              "data-section": "start",
              onClick: (event) => {
                event.stopPropagation();
                onOpenPopover("start");
              },
              role: "button",
              tabIndex: 0,
              "aria-label": labelFrom,
              onKeyDown: (event) => onSectionKeyDown(event, "start"),
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "drp-label", children: labelFrom }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "drp-value", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("i", { className: "bi bi-calendar3 drp-icon" }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { id: "drpStartValue", children: startDateText })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "drp-separator hidden sm:flex", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("i", { className: "bi bi-arrow-right" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "drp-separator-mobile flex sm:hidden" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
            "div",
            {
              className: classNames(
                "drp-section",
                selectingStep === "end" && isOpen ? "active" : "",
                showEndError ? "is-error" : ""
              ),
              "data-section": "end",
              onClick: (event) => {
                event.stopPropagation();
                onOpenPopover("end");
              },
              role: "button",
              tabIndex: 0,
              "aria-label": labelTo,
              onKeyDown: (event) => onSectionKeyDown(event, "end"),
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "drp-label", children: labelTo }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "drp-value", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("i", { className: "bi bi-calendar3 drp-icon" }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { id: "drpEndValue", children: endDateText })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            "button",
            {
              type: "button",
              id: "drpClear",
              className: "drp-clear",
              "aria-label": clearRangeLabel,
              style: { display: hasSelectedRange ? "inline-flex" : "none" },
              onClick: onClear,
              children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("i", { className: "bi bi-x-lg" })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { id: "drpPopover", ref: popoverRef, className: "drp-popover", hidden: !isOpen, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "drp-head", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          "button",
          {
            type: "button",
            className: "drp-nav",
            "data-dir": "prev",
            "aria-label": prevMonthLabel,
            onClick: onPrevMonth,
            children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4", fill: "none", viewBox: "0 0 30 30", stroke: "currentColor", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M15 19l-7-7 7-7" }) })
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { id: "drpMonthLabel", className: "drp-month", children: monthLabel }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          "button",
          {
            type: "button",
            className: "drp-nav",
            "data-dir": "next",
            "aria-label": nextMonthLabel,
            onClick: onNextMonth,
            children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4", fill: "none", viewBox: "0 0 30 30", stroke: "currentColor", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 5l7 7-7 7" }) })
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "drp-weekdays", children: weekDayLabels.map((label, index) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: label }, `${label}-${index}`)) }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { id: "drpGrid", className: "drp-grid", onMouseLeave: onGridMouseLeave, children: dayCells.map((cell) => {
        if (cell.isEmpty) {
          return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { className: "drp-day empty", disabled: true }, cell.key);
        }
        return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          "button",
          {
            type: "button",
            className: cell.dayClass,
            "data-date": cell.iso,
            disabled: cell.disabled,
            onClick: () => onDayClick(cell),
            onMouseEnter: () => onDayHover(cell),
            children: cell.dayLabel
          },
          cell.key
        );
      }) }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { id: "drpStatus", className: "drp-status", children: statusText })
    ] })
  ] });
};
var HistoryManualDatePicker_default = HistoryManualDatePicker;

// Web/wwwroot/react/src/components/commons/FilterButton.tsx
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
var FilterButton = ({
  label,
  active = false,
  disabled = false,
  onClick,
  className,
  ariaLabel,
  type = "button"
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    "button",
    {
      type,
      className: classNames("ind-filter-btn", active ? "ind-filter-btn--active" : "", className),
      onClick,
      disabled,
      "aria-label": ariaLabel || label,
      children: label
    }
  );
};
var FilterButton_default = FilterButton;

// Web/wwwroot/react/src/components/commons/ActionButton.tsx
var import_jsx_runtime4 = __toESM(require_jsx_runtime());
var ActionButton = ({
  label,
  disabled = false,
  onClick,
  className,
  ariaLabel,
  type = "button"
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
    "button",
    {
      type,
      className: classNames("ind-action-btn", className),
      onClick,
      disabled,
      "aria-label": ariaLabel || label,
      children: label
    }
  );
};
var ActionButton_default = ActionButton;

export {
  HistorySummary_default,
  HistoryManualDatePicker_default,
  FilterButton_default,
  ActionButton_default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvaGlzdG9yaWFsL0hpc3RvcnlTdW1tYXJ5LnRzeCIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9oaXN0b3JpYWwvSGlzdG9yeU1hbnVhbERhdGVQaWNrZXIudHN4IiwgIi4uLy4uL3JlYWN0L3NyYy9jb21wb25lbnRzL2NvbW1vbnMvRmlsdGVyQnV0dG9uLnRzeCIsICIuLi8uLi9yZWFjdC9zcmMvY29tcG9uZW50cy9jb21tb25zL0FjdGlvbkJ1dHRvbi50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcblxudHlwZSBQcm9wcyA9IHtcbiAgc3VtbWFyeUZyb21MYWJlbDogc3RyaW5nO1xuICBzdW1tYXJ5VG9MYWJlbDogc3RyaW5nO1xuICBmcm9tVmFsdWU6IHN0cmluZztcbiAgdG9WYWx1ZTogc3RyaW5nO1xuICBjbGFzc05hbWU/OiBzdHJpbmc7XG4gIGNsaWVudExhYmVsPzogc3RyaW5nO1xuICBjbGllbnRWYWx1ZT86IHN0cmluZztcbiAgc2hvd0NsaWVudD86IGJvb2xlYW47XG59O1xuXG4vLyBSZW5kZXJzIHRoZSByZXVzYWJsZSBkYXRlIHN1bW1hcnkgYmxvY2sgZm9yIGhpc3RvcnkgZmlsdGVycy5cbmNvbnN0IEhpc3RvcnlTdW1tYXJ5ID0gKHtcbiAgc3VtbWFyeUZyb21MYWJlbCxcbiAgc3VtbWFyeVRvTGFiZWwsXG4gIGZyb21WYWx1ZSxcbiAgdG9WYWx1ZSxcbiAgY2xhc3NOYW1lID0gXCJcIixcbiAgY2xpZW50TGFiZWwgPSBcIlwiLFxuICBjbGllbnRWYWx1ZSA9IFwiXCIsXG4gIHNob3dDbGllbnQgPSBmYWxzZSxcbn06IFByb3BzKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtgaGlzdG9yeS1maWx0ZXItc3VtbWFyeSBmbGV4IGZsZXgtd3JhcCBpdGVtcy1jZW50ZXIgZ2FwLXgtMyBnYXAteS0yIHRleHQteHMgJHtjbGFzc05hbWV9YC50cmltKCl9PlxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkXCI+e3N1bW1hcnlGcm9tTGFiZWx9Ojwvc3Bhbj5cbiAgICAgICAgPHNwYW4+e2Zyb21WYWx1ZX08L3NwYW4+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtc2VtaWJvbGRcIj57c3VtbWFyeVRvTGFiZWx9Ojwvc3Bhbj5cbiAgICAgICAgPHNwYW4+e3RvVmFsdWV9PC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgICB7c2hvd0NsaWVudCAmJiBjbGllbnRWYWx1ZSA/IChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoaXN0b3J5LWZpbHRlci1zdW1tYXJ5IG10LTEuNSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0ZXh0LXhzIG1pbi13LTBcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkIHNocmluay0wXCI+e2NsaWVudExhYmVsfTo8L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibWluLXctMCBmbGV4LTEgdHJ1bmNhdGVcIj57Y2xpZW50VmFsdWV9PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICkgOiBudWxsfVxuICAgIDwvPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgSGlzdG9yeVN1bW1hcnk7XG4iLCAiXHVGRUZGaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgY2xhc3NOYW1lcyB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9jbGFzc05hbWVzLnRzXCI7XG5cbmV4cG9ydCB0eXBlIEhpc3RvcnlNYW51YWxEYXlDZWxsID0ge1xuICBrZXk6IHN0cmluZztcbiAgaXNFbXB0eTogYm9vbGVhbjtcbiAgZGF0ZT86IERhdGU7XG4gIGlzbz86IHN0cmluZztcbiAgZGF5TGFiZWw/OiBudW1iZXI7XG4gIGRheUNsYXNzPzogc3RyaW5nO1xuICBkaXNhYmxlZD86IGJvb2xlYW47XG59O1xuXG50eXBlIEhpc3RvcnlNYW51YWxEYXRlUGlja2VyUHJvcHMgPSB7XG4gIGFjdGl2YXRvclJlZjogUmVhY3QuUmVmT2JqZWN0PEhUTUxEaXZFbGVtZW50IHwgbnVsbD47XG4gIHBvcG92ZXJSZWY6IFJlYWN0LlJlZk9iamVjdDxIVE1MRGl2RWxlbWVudCB8IG51bGw+O1xuICBzaG93TWFudWFsRXJyb3I6IGJvb2xlYW47XG4gIHNob3dTdGFydEVycm9yOiBib29sZWFuO1xuICBzaG93RW5kRXJyb3I6IGJvb2xlYW47XG4gIGZpbHRlclRpdGxlOiBzdHJpbmc7XG4gIGlzT3BlbjogYm9vbGVhbjtcbiAgc2VsZWN0aW5nU3RlcDogXCJzdGFydFwiIHwgXCJlbmRcIiB8IFwiZG9uZVwiO1xuICBsYWJlbEZyb206IHN0cmluZztcbiAgbGFiZWxUbzogc3RyaW5nO1xuICBzdGFydERhdGVUZXh0OiBzdHJpbmc7XG4gIGVuZERhdGVUZXh0OiBzdHJpbmc7XG4gIGNsZWFyUmFuZ2VMYWJlbDogc3RyaW5nO1xuICBoYXNTZWxlY3RlZFJhbmdlOiBib29sZWFuO1xuICBtb250aExhYmVsOiBzdHJpbmc7XG4gIHdlZWtEYXlMYWJlbHM6IHN0cmluZ1tdO1xuICBzdGF0dXNUZXh0OiBzdHJpbmc7XG4gIGRheUNlbGxzOiBIaXN0b3J5TWFudWFsRGF5Q2VsbFtdO1xuICBwcmV2TW9udGhMYWJlbDogc3RyaW5nO1xuICBuZXh0TW9udGhMYWJlbDogc3RyaW5nO1xuICBvbk9wZW5Qb3BvdmVyOiAoc2VjdGlvbjogXCJzdGFydFwiIHwgXCJlbmRcIikgPT4gdm9pZDtcbiAgb25BY3RpdmF0b3JLZXlEb3duOiAoZXZlbnQ6IFJlYWN0LktleWJvYXJkRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB2b2lkO1xuICBvblNlY3Rpb25LZXlEb3duOiAoZXZlbnQ6IFJlYWN0LktleWJvYXJkRXZlbnQ8SFRNTERpdkVsZW1lbnQ+LCBzZWN0aW9uOiBcInN0YXJ0XCIgfCBcImVuZFwiKSA9PiB2b2lkO1xuICBvbkNsZWFyOiAoZXZlbnQ6IFJlYWN0Lk1vdXNlRXZlbnQpID0+IHZvaWQ7XG4gIG9uUHJldk1vbnRoOiAoZXZlbnQ6IFJlYWN0Lk1vdXNlRXZlbnQ8SFRNTEJ1dHRvbkVsZW1lbnQ+KSA9PiB2b2lkO1xuICBvbk5leHRNb250aDogKGV2ZW50OiBSZWFjdC5Nb3VzZUV2ZW50PEhUTUxCdXR0b25FbGVtZW50PikgPT4gdm9pZDtcbiAgb25HcmlkTW91c2VMZWF2ZTogKCkgPT4gdm9pZDtcbiAgb25EYXlDbGljazogKGRheTogSGlzdG9yeU1hbnVhbERheUNlbGwpID0+IHZvaWQ7XG4gIG9uRGF5SG92ZXI6IChkYXk6IEhpc3RvcnlNYW51YWxEYXlDZWxsKSA9PiB2b2lkO1xufTtcblxuLy8gUHJlc2VudGF0aW9uYWwgZGF0ZSByYW5nZSBwaWNrZXIgdXNlZCBieSB0aGUgaGlzdG9yeSBxdWljayBmaWx0ZXIuXG5jb25zdCBIaXN0b3J5TWFudWFsRGF0ZVBpY2tlciA9ICh7XG4gIGFjdGl2YXRvclJlZixcbiAgcG9wb3ZlclJlZixcbiAgc2hvd01hbnVhbEVycm9yLFxuICBzaG93U3RhcnRFcnJvcixcbiAgc2hvd0VuZEVycm9yLFxuICBmaWx0ZXJUaXRsZSxcbiAgaXNPcGVuLFxuICBzZWxlY3RpbmdTdGVwLFxuICBsYWJlbEZyb20sXG4gIGxhYmVsVG8sXG4gIHN0YXJ0RGF0ZVRleHQsXG4gIGVuZERhdGVUZXh0LFxuICBjbGVhclJhbmdlTGFiZWwsXG4gIGhhc1NlbGVjdGVkUmFuZ2UsXG4gIG1vbnRoTGFiZWwsXG4gIHdlZWtEYXlMYWJlbHMsXG4gIHN0YXR1c1RleHQsXG4gIGRheUNlbGxzLFxuICBwcmV2TW9udGhMYWJlbCxcbiAgbmV4dE1vbnRoTGFiZWwsXG4gIG9uT3BlblBvcG92ZXIsXG4gIG9uQWN0aXZhdG9yS2V5RG93bixcbiAgb25TZWN0aW9uS2V5RG93bixcbiAgb25DbGVhcixcbiAgb25QcmV2TW9udGgsXG4gIG9uTmV4dE1vbnRoLFxuICBvbkdyaWRNb3VzZUxlYXZlLFxuICBvbkRheUNsaWNrLFxuICBvbkRheUhvdmVyLFxufTogSGlzdG9yeU1hbnVhbERhdGVQaWNrZXJQcm9wcykgPT4ge1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmVcIj5cbiAgICAgIDxkaXZcbiAgICAgICAgaWQ9XCJkcnBBY3RpdmF0b3JcIlxuICAgICAgICByZWY9e2FjdGl2YXRvclJlZn1cbiAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFwiZHJwIHctZnVsbFwiLCBzaG93TWFudWFsRXJyb3IgPyBcImRycC1lcnJvclwiIDogXCJcIil9XG4gICAgICAgIG9uQ2xpY2s9eygpID0+IG9uT3BlblBvcG92ZXIoXCJzdGFydFwiKX1cbiAgICAgICAgcm9sZT1cImJ1dHRvblwiXG4gICAgICAgIHRhYkluZGV4PXswfVxuICAgICAgICBhcmlhLWxhYmVsPXtmaWx0ZXJUaXRsZX1cbiAgICAgICAgYXJpYS1oYXNwb3B1cD1cImRpYWxvZ1wiXG4gICAgICAgIGFyaWEtZXhwYW5kZWQ9e2lzT3Blbn1cbiAgICAgICAgb25LZXlEb3duPXtvbkFjdGl2YXRvcktleURvd259XG4gICAgICA+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICBcImRycC1zZWN0aW9uXCIsXG4gICAgICAgICAgICBzZWxlY3RpbmdTdGVwID09PSBcInN0YXJ0XCIgJiYgaXNPcGVuID8gXCJhY3RpdmVcIiA6IFwiXCIsXG4gICAgICAgICAgICBzaG93U3RhcnRFcnJvciA/IFwiaXMtZXJyb3JcIiA6IFwiXCJcbiAgICAgICAgICApfVxuICAgICAgICAgIGRhdGEtc2VjdGlvbj1cInN0YXJ0XCJcbiAgICAgICAgICBvbkNsaWNrPXsoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgb25PcGVuUG9wb3ZlcihcInN0YXJ0XCIpO1xuICAgICAgICAgIH19XG4gICAgICAgICAgcm9sZT1cImJ1dHRvblwiXG4gICAgICAgICAgdGFiSW5kZXg9ezB9XG4gICAgICAgICAgYXJpYS1sYWJlbD17bGFiZWxGcm9tfVxuICAgICAgICAgIG9uS2V5RG93bj17KGV2ZW50KSA9PiBvblNlY3Rpb25LZXlEb3duKGV2ZW50LCBcInN0YXJ0XCIpfVxuICAgICAgICA+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkcnAtbGFiZWxcIj57bGFiZWxGcm9tfTwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZHJwLXZhbHVlXCI+XG4gICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJiaSBiaS1jYWxlbmRhcjMgZHJwLWljb25cIiAvPlxuICAgICAgICAgICAgPHNwYW4gaWQ9XCJkcnBTdGFydFZhbHVlXCI+e3N0YXJ0RGF0ZVRleHR9PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRycC1zZXBhcmF0b3IgaGlkZGVuIHNtOmZsZXhcIj5cbiAgICAgICAgICA8aSBjbGFzc05hbWU9XCJiaSBiaS1hcnJvdy1yaWdodFwiIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRycC1zZXBhcmF0b3ItbW9iaWxlIGZsZXggc206aGlkZGVuXCIgLz5cblxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAgICAgXCJkcnAtc2VjdGlvblwiLFxuICAgICAgICAgICAgc2VsZWN0aW5nU3RlcCA9PT0gXCJlbmRcIiAmJiBpc09wZW4gPyBcImFjdGl2ZVwiIDogXCJcIixcbiAgICAgICAgICAgIHNob3dFbmRFcnJvciA/IFwiaXMtZXJyb3JcIiA6IFwiXCJcbiAgICAgICAgICApfVxuICAgICAgICAgIGRhdGEtc2VjdGlvbj1cImVuZFwiXG4gICAgICAgICAgb25DbGljaz17KGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIG9uT3BlblBvcG92ZXIoXCJlbmRcIik7XG4gICAgICAgICAgfX1cbiAgICAgICAgICByb2xlPVwiYnV0dG9uXCJcbiAgICAgICAgICB0YWJJbmRleD17MH1cbiAgICAgICAgICBhcmlhLWxhYmVsPXtsYWJlbFRvfVxuICAgICAgICAgIG9uS2V5RG93bj17KGV2ZW50KSA9PiBvblNlY3Rpb25LZXlEb3duKGV2ZW50LCBcImVuZFwiKX1cbiAgICAgICAgPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZHJwLWxhYmVsXCI+e2xhYmVsVG99PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkcnAtdmFsdWVcIj5cbiAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImJpIGJpLWNhbGVuZGFyMyBkcnAtaWNvblwiIC8+XG4gICAgICAgICAgICA8c3BhbiBpZD1cImRycEVuZFZhbHVlXCI+e2VuZERhdGVUZXh0fTwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgIGlkPVwiZHJwQ2xlYXJcIlxuICAgICAgICAgIGNsYXNzTmFtZT1cImRycC1jbGVhclwiXG4gICAgICAgICAgYXJpYS1sYWJlbD17Y2xlYXJSYW5nZUxhYmVsfVxuICAgICAgICAgIHN0eWxlPXt7IGRpc3BsYXk6IGhhc1NlbGVjdGVkUmFuZ2UgPyBcImlubGluZS1mbGV4XCIgOiBcIm5vbmVcIiB9fVxuICAgICAgICAgIG9uQ2xpY2s9e29uQ2xlYXJ9XG4gICAgICAgID5cbiAgICAgICAgICA8aSBjbGFzc05hbWU9XCJiaSBiaS14LWxnXCIgLz5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiBpZD1cImRycFBvcG92ZXJcIiByZWY9e3BvcG92ZXJSZWZ9IGNsYXNzTmFtZT1cImRycC1wb3BvdmVyXCIgaGlkZGVuPXshaXNPcGVufT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkcnAtaGVhZFwiPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiZHJwLW5hdlwiXG4gICAgICAgICAgICBkYXRhLWRpcj1cInByZXZcIlxuICAgICAgICAgICAgYXJpYS1sYWJlbD17cHJldk1vbnRoTGFiZWx9XG4gICAgICAgICAgICBvbkNsaWNrPXtvblByZXZNb250aH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBjbGFzc05hbWU9XCJoLTQgdy00XCIgZmlsbD1cIm5vbmVcIiB2aWV3Qm94PVwiMCAwIDMwIDMwXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCI+XG4gICAgICAgICAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBzdHJva2VXaWR0aD1cIjJcIiBkPVwiTTE1IDE5bC03LTcgNy03XCIgLz5cbiAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDxkaXYgaWQ9XCJkcnBNb250aExhYmVsXCIgY2xhc3NOYW1lPVwiZHJwLW1vbnRoXCI+e21vbnRoTGFiZWx9PC9kaXY+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJkcnAtbmF2XCJcbiAgICAgICAgICAgIGRhdGEtZGlyPVwibmV4dFwiXG4gICAgICAgICAgICBhcmlhLWxhYmVsPXtuZXh0TW9udGhMYWJlbH1cbiAgICAgICAgICAgIG9uQ2xpY2s9e29uTmV4dE1vbnRofVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGNsYXNzTmFtZT1cImgtNCB3LTRcIiBmaWxsPVwibm9uZVwiIHZpZXdCb3g9XCIwIDAgMzAgMzBcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIj5cbiAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIHN0cm9rZVdpZHRoPVwiMlwiIGQ9XCJNOSA1bDcgNy03IDdcIiAvPlxuICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZHJwLXdlZWtkYXlzXCI+XG4gICAgICAgICAge3dlZWtEYXlMYWJlbHMubWFwKChsYWJlbCwgaW5kZXgpID0+IChcbiAgICAgICAgICAgIDxzcGFuIGtleT17YCR7bGFiZWx9LSR7aW5kZXh9YH0+e2xhYmVsfTwvc3Bhbj5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBpZD1cImRycEdyaWRcIiBjbGFzc05hbWU9XCJkcnAtZ3JpZFwiIG9uTW91c2VMZWF2ZT17b25HcmlkTW91c2VMZWF2ZX0+XG4gICAgICAgICAge2RheUNlbGxzLm1hcCgoY2VsbCkgPT4ge1xuICAgICAgICAgICAgaWYgKGNlbGwuaXNFbXB0eSkge1xuICAgICAgICAgICAgICByZXR1cm4gPGJ1dHRvbiBrZXk9e2NlbGwua2V5fSBjbGFzc05hbWU9XCJkcnAtZGF5IGVtcHR5XCIgZGlzYWJsZWQgLz47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBrZXk9e2NlbGwua2V5fVxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2VsbC5kYXlDbGFzc31cbiAgICAgICAgICAgICAgICBkYXRhLWRhdGU9e2NlbGwuaXNvfVxuICAgICAgICAgICAgICAgIGRpc2FibGVkPXtjZWxsLmRpc2FibGVkfVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG9uRGF5Q2xpY2soY2VsbCl9XG4gICAgICAgICAgICAgICAgb25Nb3VzZUVudGVyPXsoKSA9PiBvbkRheUhvdmVyKGNlbGwpfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge2NlbGwuZGF5TGFiZWx9XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9KX1cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBpZD1cImRycFN0YXR1c1wiIGNsYXNzTmFtZT1cImRycC1zdGF0dXNcIj5cbiAgICAgICAgICB7c3RhdHVzVGV4dH1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEhpc3RvcnlNYW51YWxEYXRlUGlja2VyO1xyXG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgY2xhc3NOYW1lcyB9IGZyb20gXCIuLi8uLi91dGlscy9jbGFzc05hbWVzLnRzXCI7XG5cbnR5cGUgUHJvcHMgPSB7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIGFjdGl2ZT86IGJvb2xlYW47XG4gIGRpc2FibGVkPzogYm9vbGVhbjtcbiAgb25DbGljaz86ICgpID0+IHZvaWQ7XG4gIGNsYXNzTmFtZT86IHN0cmluZztcbiAgYXJpYUxhYmVsPzogc3RyaW5nO1xuICB0eXBlPzogXCJidXR0b25cIiB8IFwic3VibWl0XCIgfCBcInJlc2V0XCI7XG59O1xuXG4vLyBEdW1iIGZpbHRlciBidXR0b24gd2l0aCBzdGFuZGFyZGl6ZWQgc3R5bGluZy5cbmNvbnN0IEZpbHRlckJ1dHRvbiA9ICh7XG4gIGxhYmVsLFxuICBhY3RpdmUgPSBmYWxzZSxcbiAgZGlzYWJsZWQgPSBmYWxzZSxcbiAgb25DbGljayxcbiAgY2xhc3NOYW1lLFxuICBhcmlhTGFiZWwsXG4gIHR5cGUgPSBcImJ1dHRvblwiXG59OiBQcm9wcykgPT4ge1xuICByZXR1cm4gKFxuICAgIDxidXR0b25cbiAgICAgIHR5cGU9e3R5cGV9XG4gICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXCJpbmQtZmlsdGVyLWJ0blwiLCBhY3RpdmUgPyBcImluZC1maWx0ZXItYnRuLS1hY3RpdmVcIiA6IFwiXCIsIGNsYXNzTmFtZSl9XG4gICAgICBvbkNsaWNrPXtvbkNsaWNrfVxuICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgYXJpYS1sYWJlbD17YXJpYUxhYmVsIHx8IGxhYmVsfVxuICAgID5cbiAgICAgIHtsYWJlbH1cbiAgICA8L2J1dHRvbj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEZpbHRlckJ1dHRvbjtcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBjbGFzc05hbWVzIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2NsYXNzTmFtZXMudHNcIjtcblxudHlwZSBQcm9wcyA9IHtcbiAgbGFiZWw6IHN0cmluZztcbiAgZGlzYWJsZWQ/OiBib29sZWFuO1xuICBvbkNsaWNrPzogKCkgPT4gdm9pZDtcbiAgY2xhc3NOYW1lPzogc3RyaW5nO1xuICBhcmlhTGFiZWw/OiBzdHJpbmc7XG4gIHR5cGU/OiBcImJ1dHRvblwiIHwgXCJzdWJtaXRcIiB8IFwicmVzZXRcIjtcbn07XG5cbi8vIER1bWIgYWN0aW9uIGJ1dHRvbiB3aXRoIHN0YW5kYXJkaXplZCBzdHlsaW5nLlxuY29uc3QgQWN0aW9uQnV0dG9uID0gKHtcbiAgbGFiZWwsXG4gIGRpc2FibGVkID0gZmFsc2UsXG4gIG9uQ2xpY2ssXG4gIGNsYXNzTmFtZSxcbiAgYXJpYUxhYmVsLFxuICB0eXBlID0gXCJidXR0b25cIlxufTogUHJvcHMpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8YnV0dG9uXG4gICAgICB0eXBlPXt0eXBlfVxuICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFwiaW5kLWFjdGlvbi1idG5cIiwgY2xhc3NOYW1lKX1cbiAgICAgIG9uQ2xpY2s9e29uQ2xpY2t9XG4gICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICBhcmlhLWxhYmVsPXthcmlhTGFiZWwgfHwgbGFiZWx9XG4gICAgPlxuICAgICAge2xhYmVsfVxuICAgIDwvYnV0dG9uPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQWN0aW9uQnV0dG9uO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7QUF5Qkk7QUFYSixJQUFNLGlCQUFpQixDQUFDO0FBQUEsRUFDdEI7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBLFlBQVk7QUFBQSxFQUNaLGNBQWM7QUFBQSxFQUNkLGNBQWM7QUFBQSxFQUNkLGFBQWE7QUFDZixNQUFhO0FBQ1gsU0FDRSw0RUFDRTtBQUFBLGlEQUFDLFNBQUksV0FBVyw4RUFBOEUsU0FBUyxHQUFHLEtBQUssR0FDN0c7QUFBQSxtREFBQyxVQUFLLFdBQVUsaUJBQWlCO0FBQUE7QUFBQSxRQUFpQjtBQUFBLFNBQUM7QUFBQSxNQUNuRCw0Q0FBQyxVQUFNLHFCQUFVO0FBQUEsTUFDakIsNkNBQUMsVUFBSyxXQUFVLGlCQUFpQjtBQUFBO0FBQUEsUUFBZTtBQUFBLFNBQUM7QUFBQSxNQUNqRCw0Q0FBQyxVQUFNLG1CQUFRO0FBQUEsT0FDakI7QUFBQSxJQUNDLGNBQWMsY0FDYiw2Q0FBQyxTQUFJLFdBQVUseUVBQ2I7QUFBQSxtREFBQyxVQUFLLFdBQVUsMEJBQTBCO0FBQUE7QUFBQSxRQUFZO0FBQUEsU0FBQztBQUFBLE1BQ3ZELDRDQUFDLFVBQUssV0FBVSwyQkFBMkIsdUJBQVk7QUFBQSxPQUN6RCxJQUNFO0FBQUEsS0FDTjtBQUVKO0FBRUEsSUFBTyx5QkFBUTs7O0FDaUVMLElBQUFBLHNCQUFBO0FBN0RWLElBQU0sMEJBQTBCLENBQUM7QUFBQSxFQUMvQjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7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
