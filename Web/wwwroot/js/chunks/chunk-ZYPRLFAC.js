import {
  classNames
} from "./chunk-EGSPAV7B.js";
import {
  require_jsx_runtime
} from "./chunk-2NKOKBT5.js";
import {
  __toESM
} from "./chunk-W7NC74ZX.js";

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
  showClient = false,
  ownerLabel = "",
  ownerValue = "",
  showOwner = false
}) => {
  const detailRowClassName = `history-filter-summary mt-1.5 flex items-center gap-2 text-xs min-w-0 ${className}`.trim();
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
    showClient && clientValue ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: detailRowClassName, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "font-semibold shrink-0", children: [
        clientLabel,
        ":"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "min-w-0 flex-1 truncate", children: clientValue })
    ] }) : null,
    showOwner && ownerValue ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: detailRowClassName, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "font-semibold shrink-0", children: [
        ownerLabel,
        ":"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "min-w-0 flex-1 truncate", children: ownerValue })
    ] }) : null
  ] });
};
var HistorySummary_default = HistorySummary;

// Web/wwwroot/react/src/components/commons/ActionButton.tsx
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var ActionButton = ({
  label,
  disabled = false,
  onClick,
  className,
  ariaLabel,
  type = "button"
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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

// Web/wwwroot/react/src/pages/visitas/historial/HistoryManualDatePicker.tsx
var import_jsx_runtime4 = __toESM(require_jsx_runtime());
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
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "relative", children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
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
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
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
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "drp-label", children: labelFrom }),
                /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "drp-value", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("i", { className: "bi bi-calendar3 drp-icon" }),
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { id: "drpStartValue", children: startDateText })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "drp-separator hidden sm:flex", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("i", { className: "bi bi-arrow-right" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "drp-separator-mobile flex sm:hidden" }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
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
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "drp-label", children: labelTo }),
                /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "drp-value", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("i", { className: "bi bi-calendar3 drp-icon" }),
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { id: "drpEndValue", children: endDateText })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
            "button",
            {
              type: "button",
              id: "drpClear",
              className: "drp-clear",
              "aria-label": clearRangeLabel,
              style: { display: hasSelectedRange ? "inline-flex" : "none" },
              onClick: onClear,
              children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("i", { className: "bi bi-x-lg" })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { id: "drpPopover", ref: popoverRef, className: "drp-popover", hidden: !isOpen, children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "drp-head", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          "button",
          {
            type: "button",
            className: "drp-nav",
            "data-dir": "prev",
            "aria-label": prevMonthLabel,
            onClick: onPrevMonth,
            children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4", fill: "none", viewBox: "0 0 30 30", stroke: "currentColor", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M15 19l-7-7 7-7" }) })
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { id: "drpMonthLabel", className: "drp-month", children: monthLabel }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          "button",
          {
            type: "button",
            className: "drp-nav",
            "data-dir": "next",
            "aria-label": nextMonthLabel,
            onClick: onNextMonth,
            children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4", fill: "none", viewBox: "0 0 30 30", stroke: "currentColor", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 5l7 7-7 7" }) })
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "drp-weekdays", children: weekDayLabels.map((label, index) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { children: label }, `${label}-${index}`)) }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { id: "drpGrid", className: "drp-grid", onMouseLeave: onGridMouseLeave, children: dayCells.map((cell) => {
        if (cell.isEmpty) {
          return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("button", { className: "drp-day empty", disabled: true }, cell.key);
        }
        return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
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
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { id: "drpStatus", className: "drp-status", children: statusText })
    ] })
  ] });
};
var HistoryManualDatePicker_default = HistoryManualDatePicker;

export {
  HistorySummary_default,
  ActionButton_default,
  FilterButton_default,
  HistoryManualDatePicker_default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvaGlzdG9yaWFsL0hpc3RvcnlTdW1tYXJ5LnRzeCIsICIuLi8uLi9yZWFjdC9zcmMvY29tcG9uZW50cy9jb21tb25zL0FjdGlvbkJ1dHRvbi50c3giLCAiLi4vLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9GaWx0ZXJCdXR0b24udHN4IiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy92aXNpdGFzL2hpc3RvcmlhbC9IaXN0b3J5TWFudWFsRGF0ZVBpY2tlci50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuXHJcbnR5cGUgUHJvcHMgPSB7XHJcbiAgc3VtbWFyeUZyb21MYWJlbDogc3RyaW5nO1xyXG4gIHN1bW1hcnlUb0xhYmVsOiBzdHJpbmc7XHJcbiAgZnJvbVZhbHVlOiBzdHJpbmc7XHJcbiAgdG9WYWx1ZTogc3RyaW5nO1xyXG4gIGNsYXNzTmFtZT86IHN0cmluZztcclxuICBjbGllbnRMYWJlbD86IHN0cmluZztcbiAgY2xpZW50VmFsdWU/OiBzdHJpbmc7XG4gIHNob3dDbGllbnQ/OiBib29sZWFuO1xuICBvd25lckxhYmVsPzogc3RyaW5nO1xuICBvd25lclZhbHVlPzogc3RyaW5nO1xuICBzaG93T3duZXI/OiBib29sZWFuO1xufTtcblxyXG4vLyBSZW5kZXJzIHRoZSByZXVzYWJsZSBkYXRlIHN1bW1hcnkgYmxvY2sgZm9yIGhpc3RvcnkgZmlsdGVycy5cclxuY29uc3QgSGlzdG9yeVN1bW1hcnkgPSAoe1xyXG4gIHN1bW1hcnlGcm9tTGFiZWwsXHJcbiAgc3VtbWFyeVRvTGFiZWwsXHJcbiAgZnJvbVZhbHVlLFxyXG4gIHRvVmFsdWUsXHJcbiAgY2xhc3NOYW1lID0gXCJcIixcclxuICBjbGllbnRMYWJlbCA9IFwiXCIsXG4gIGNsaWVudFZhbHVlID0gXCJcIixcbiAgc2hvd0NsaWVudCA9IGZhbHNlLFxuICBvd25lckxhYmVsID0gXCJcIixcbiAgb3duZXJWYWx1ZSA9IFwiXCIsXG4gIHNob3dPd25lciA9IGZhbHNlLFxufTogUHJvcHMpID0+IHtcbiAgY29uc3QgZGV0YWlsUm93Q2xhc3NOYW1lID0gYGhpc3RvcnktZmlsdGVyLXN1bW1hcnkgbXQtMS41IGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQteHMgbWluLXctMCAke2NsYXNzTmFtZX1gLnRyaW0oKTtcblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT17YGhpc3RvcnktZmlsdGVyLXN1bW1hcnkgZmxleCBmbGV4LXdyYXAgaXRlbXMtY2VudGVyIGdhcC14LTMgZ2FwLXktMiB0ZXh0LXhzICR7Y2xhc3NOYW1lfWAudHJpbSgpfT5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1zZW1pYm9sZFwiPntzdW1tYXJ5RnJvbUxhYmVsfTo8L3NwYW4+XG4gICAgICAgIDxzcGFuPntmcm9tVmFsdWV9PC9zcGFuPlxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkXCI+e3N1bW1hcnlUb0xhYmVsfTo8L3NwYW4+XHJcbiAgICAgICAgPHNwYW4+e3RvVmFsdWV9PC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgICB7c2hvd0NsaWVudCAmJiBjbGllbnRWYWx1ZSA/IChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2RldGFpbFJvd0NsYXNzTmFtZX0+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1zZW1pYm9sZCBzaHJpbmstMFwiPntjbGllbnRMYWJlbH06PC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1pbi13LTAgZmxleC0xIHRydW5jYXRlXCI+e2NsaWVudFZhbHVlfTwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApIDogbnVsbH1cbiAgICAgIHtzaG93T3duZXIgJiYgb3duZXJWYWx1ZSA/IChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2RldGFpbFJvd0NsYXNzTmFtZX0+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1zZW1pYm9sZCBzaHJpbmstMFwiPntvd25lckxhYmVsfTo8L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibWluLXctMCBmbGV4LTEgdHJ1bmNhdGVcIj57b3duZXJWYWx1ZX08L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKSA6IG51bGx9XG4gICAgPC8+XG4gICk7XG59O1xuXHJcbmV4cG9ydCBkZWZhdWx0IEhpc3RvcnlTdW1tYXJ5O1xyXG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBjbGFzc05hbWVzIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2NsYXNzTmFtZXMudHNcIjtcclxuXHJcbnR5cGUgUHJvcHMgPSB7XHJcbiAgbGFiZWw6IHN0cmluZztcclxuICBkaXNhYmxlZD86IGJvb2xlYW47XHJcbiAgb25DbGljaz86ICgpID0+IHZvaWQ7XHJcbiAgY2xhc3NOYW1lPzogc3RyaW5nO1xyXG4gIGFyaWFMYWJlbD86IHN0cmluZztcclxuICB0eXBlPzogXCJidXR0b25cIiB8IFwic3VibWl0XCIgfCBcInJlc2V0XCI7XHJcbn07XHJcblxyXG4vLyBEdW1iIGFjdGlvbiBidXR0b24gd2l0aCBzdGFuZGFyZGl6ZWQgc3R5bGluZy5cclxuY29uc3QgQWN0aW9uQnV0dG9uID0gKHtcclxuICBsYWJlbCxcclxuICBkaXNhYmxlZCA9IGZhbHNlLFxyXG4gIG9uQ2xpY2ssXHJcbiAgY2xhc3NOYW1lLFxyXG4gIGFyaWFMYWJlbCxcclxuICB0eXBlID0gXCJidXR0b25cIlxyXG59OiBQcm9wcykgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8YnV0dG9uXHJcbiAgICAgIHR5cGU9e3R5cGV9XHJcbiAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcImluZC1hY3Rpb24tYnRuXCIsIGNsYXNzTmFtZSl9XHJcbiAgICAgIG9uQ2xpY2s9e29uQ2xpY2t9XHJcbiAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cclxuICAgICAgYXJpYS1sYWJlbD17YXJpYUxhYmVsIHx8IGxhYmVsfVxyXG4gICAgPlxyXG4gICAgICB7bGFiZWx9XHJcbiAgICA8L2J1dHRvbj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQWN0aW9uQnV0dG9uO1xyXG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBjbGFzc05hbWVzIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2NsYXNzTmFtZXMudHNcIjtcclxuXHJcbnR5cGUgUHJvcHMgPSB7XHJcbiAgbGFiZWw6IHN0cmluZztcclxuICBhY3RpdmU/OiBib29sZWFuO1xyXG4gIGRpc2FibGVkPzogYm9vbGVhbjtcclxuICBvbkNsaWNrPzogKCkgPT4gdm9pZDtcclxuICBjbGFzc05hbWU/OiBzdHJpbmc7XHJcbiAgYXJpYUxhYmVsPzogc3RyaW5nO1xyXG4gIHR5cGU/OiBcImJ1dHRvblwiIHwgXCJzdWJtaXRcIiB8IFwicmVzZXRcIjtcclxufTtcclxuXHJcbi8vIER1bWIgZmlsdGVyIGJ1dHRvbiB3aXRoIHN0YW5kYXJkaXplZCBzdHlsaW5nLlxyXG5jb25zdCBGaWx0ZXJCdXR0b24gPSAoe1xyXG4gIGxhYmVsLFxyXG4gIGFjdGl2ZSA9IGZhbHNlLFxyXG4gIGRpc2FibGVkID0gZmFsc2UsXHJcbiAgb25DbGljayxcclxuICBjbGFzc05hbWUsXHJcbiAgYXJpYUxhYmVsLFxyXG4gIHR5cGUgPSBcImJ1dHRvblwiXHJcbn06IFByb3BzKSA9PiB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxidXR0b25cclxuICAgICAgdHlwZT17dHlwZX1cclxuICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFwiaW5kLWZpbHRlci1idG5cIiwgYWN0aXZlID8gXCJpbmQtZmlsdGVyLWJ0bi0tYWN0aXZlXCIgOiBcIlwiLCBjbGFzc05hbWUpfVxyXG4gICAgICBvbkNsaWNrPXtvbkNsaWNrfVxyXG4gICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XHJcbiAgICAgIGFyaWEtbGFiZWw9e2FyaWFMYWJlbCB8fCBsYWJlbH1cclxuICAgID5cclxuICAgICAge2xhYmVsfVxyXG4gICAgPC9idXR0b24+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEZpbHRlckJ1dHRvbjtcclxuIiwgIlx1RkVGRmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgY2xhc3NOYW1lcyB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9jbGFzc05hbWVzLnRzXCI7XHJcblxyXG5leHBvcnQgdHlwZSBIaXN0b3J5TWFudWFsRGF5Q2VsbCA9IHtcclxuICBrZXk6IHN0cmluZztcclxuICBpc0VtcHR5OiBib29sZWFuO1xyXG4gIGRhdGU/OiBEYXRlO1xyXG4gIGlzbz86IHN0cmluZztcclxuICBkYXlMYWJlbD86IG51bWJlcjtcclxuICBkYXlDbGFzcz86IHN0cmluZztcclxuICBkaXNhYmxlZD86IGJvb2xlYW47XHJcbn07XHJcblxyXG50eXBlIEhpc3RvcnlNYW51YWxEYXRlUGlja2VyUHJvcHMgPSB7XHJcbiAgYWN0aXZhdG9yUmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTERpdkVsZW1lbnQgfCBudWxsPjtcclxuICBwb3BvdmVyUmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTERpdkVsZW1lbnQgfCBudWxsPjtcclxuICBzaG93TWFudWFsRXJyb3I6IGJvb2xlYW47XHJcbiAgc2hvd1N0YXJ0RXJyb3I6IGJvb2xlYW47XHJcbiAgc2hvd0VuZEVycm9yOiBib29sZWFuO1xyXG4gIGZpbHRlclRpdGxlOiBzdHJpbmc7XHJcbiAgaXNPcGVuOiBib29sZWFuO1xyXG4gIHNlbGVjdGluZ1N0ZXA6IFwic3RhcnRcIiB8IFwiZW5kXCIgfCBcImRvbmVcIjtcclxuICBsYWJlbEZyb206IHN0cmluZztcclxuICBsYWJlbFRvOiBzdHJpbmc7XHJcbiAgc3RhcnREYXRlVGV4dDogc3RyaW5nO1xyXG4gIGVuZERhdGVUZXh0OiBzdHJpbmc7XHJcbiAgY2xlYXJSYW5nZUxhYmVsOiBzdHJpbmc7XHJcbiAgaGFzU2VsZWN0ZWRSYW5nZTogYm9vbGVhbjtcclxuICBtb250aExhYmVsOiBzdHJpbmc7XHJcbiAgd2Vla0RheUxhYmVsczogc3RyaW5nW107XHJcbiAgc3RhdHVzVGV4dDogc3RyaW5nO1xyXG4gIGRheUNlbGxzOiBIaXN0b3J5TWFudWFsRGF5Q2VsbFtdO1xyXG4gIHByZXZNb250aExhYmVsOiBzdHJpbmc7XHJcbiAgbmV4dE1vbnRoTGFiZWw6IHN0cmluZztcclxuICBvbk9wZW5Qb3BvdmVyOiAoc2VjdGlvbjogXCJzdGFydFwiIHwgXCJlbmRcIikgPT4gdm9pZDtcclxuICBvbkFjdGl2YXRvcktleURvd246IChldmVudDogUmVhY3QuS2V5Ym9hcmRFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHZvaWQ7XHJcbiAgb25TZWN0aW9uS2V5RG93bjogKGV2ZW50OiBSZWFjdC5LZXlib2FyZEV2ZW50PEhUTUxEaXZFbGVtZW50Piwgc2VjdGlvbjogXCJzdGFydFwiIHwgXCJlbmRcIikgPT4gdm9pZDtcclxuICBvbkNsZWFyOiAoZXZlbnQ6IFJlYWN0Lk1vdXNlRXZlbnQpID0+IHZvaWQ7XHJcbiAgb25QcmV2TW9udGg6IChldmVudDogUmVhY3QuTW91c2VFdmVudDxIVE1MQnV0dG9uRWxlbWVudD4pID0+IHZvaWQ7XHJcbiAgb25OZXh0TW9udGg6IChldmVudDogUmVhY3QuTW91c2VFdmVudDxIVE1MQnV0dG9uRWxlbWVudD4pID0+IHZvaWQ7XHJcbiAgb25HcmlkTW91c2VMZWF2ZTogKCkgPT4gdm9pZDtcclxuICBvbkRheUNsaWNrOiAoZGF5OiBIaXN0b3J5TWFudWFsRGF5Q2VsbCkgPT4gdm9pZDtcclxuICBvbkRheUhvdmVyOiAoZGF5OiBIaXN0b3J5TWFudWFsRGF5Q2VsbCkgPT4gdm9pZDtcclxufTtcclxuXHJcbi8vIFByZXNlbnRhdGlvbmFsIGRhdGUgcmFuZ2UgcGlja2VyIHVzZWQgYnkgdGhlIGhpc3RvcnkgcXVpY2sgZmlsdGVyLlxyXG5jb25zdCBIaXN0b3J5TWFudWFsRGF0ZVBpY2tlciA9ICh7XHJcbiAgYWN0aXZhdG9yUmVmLFxyXG4gIHBvcG92ZXJSZWYsXHJcbiAgc2hvd01hbnVhbEVycm9yLFxyXG4gIHNob3dTdGFydEVycm9yLFxyXG4gIHNob3dFbmRFcnJvcixcclxuICBmaWx0ZXJUaXRsZSxcclxuICBpc09wZW4sXHJcbiAgc2VsZWN0aW5nU3RlcCxcclxuICBsYWJlbEZyb20sXHJcbiAgbGFiZWxUbyxcclxuICBzdGFydERhdGVUZXh0LFxyXG4gIGVuZERhdGVUZXh0LFxyXG4gIGNsZWFyUmFuZ2VMYWJlbCxcclxuICBoYXNTZWxlY3RlZFJhbmdlLFxyXG4gIG1vbnRoTGFiZWwsXHJcbiAgd2Vla0RheUxhYmVscyxcclxuICBzdGF0dXNUZXh0LFxyXG4gIGRheUNlbGxzLFxyXG4gIHByZXZNb250aExhYmVsLFxyXG4gIG5leHRNb250aExhYmVsLFxyXG4gIG9uT3BlblBvcG92ZXIsXHJcbiAgb25BY3RpdmF0b3JLZXlEb3duLFxyXG4gIG9uU2VjdGlvbktleURvd24sXHJcbiAgb25DbGVhcixcclxuICBvblByZXZNb250aCxcclxuICBvbk5leHRNb250aCxcclxuICBvbkdyaWRNb3VzZUxlYXZlLFxyXG4gIG9uRGF5Q2xpY2ssXHJcbiAgb25EYXlIb3ZlcixcclxufTogSGlzdG9yeU1hbnVhbERhdGVQaWNrZXJQcm9wcykgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlXCI+XHJcbiAgICAgIDxkaXZcclxuICAgICAgICBpZD1cImRycEFjdGl2YXRvclwiXHJcbiAgICAgICAgcmVmPXthY3RpdmF0b3JSZWZ9XHJcbiAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFwiZHJwIHctZnVsbFwiLCBzaG93TWFudWFsRXJyb3IgPyBcImRycC1lcnJvclwiIDogXCJcIil9XHJcbiAgICAgICAgb25DbGljaz17KCkgPT4gb25PcGVuUG9wb3ZlcihcInN0YXJ0XCIpfVxyXG4gICAgICAgIHJvbGU9XCJidXR0b25cIlxyXG4gICAgICAgIHRhYkluZGV4PXswfVxyXG4gICAgICAgIGFyaWEtbGFiZWw9e2ZpbHRlclRpdGxlfVxyXG4gICAgICAgIGFyaWEtaGFzcG9wdXA9XCJkaWFsb2dcIlxyXG4gICAgICAgIGFyaWEtZXhwYW5kZWQ9e2lzT3Blbn1cclxuICAgICAgICBvbktleURvd249e29uQWN0aXZhdG9yS2V5RG93bn1cclxuICAgICAgPlxyXG4gICAgICAgIDxkaXZcclxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcclxuICAgICAgICAgICAgXCJkcnAtc2VjdGlvblwiLFxyXG4gICAgICAgICAgICBzZWxlY3RpbmdTdGVwID09PSBcInN0YXJ0XCIgJiYgaXNPcGVuID8gXCJhY3RpdmVcIiA6IFwiXCIsXHJcbiAgICAgICAgICAgIHNob3dTdGFydEVycm9yID8gXCJpcy1lcnJvclwiIDogXCJcIlxyXG4gICAgICAgICAgKX1cclxuICAgICAgICAgIGRhdGEtc2VjdGlvbj1cInN0YXJ0XCJcclxuICAgICAgICAgIG9uQ2xpY2s9eyhldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgb25PcGVuUG9wb3ZlcihcInN0YXJ0XCIpO1xyXG4gICAgICAgICAgfX1cclxuICAgICAgICAgIHJvbGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgdGFiSW5kZXg9ezB9XHJcbiAgICAgICAgICBhcmlhLWxhYmVsPXtsYWJlbEZyb219XHJcbiAgICAgICAgICBvbktleURvd249eyhldmVudCkgPT4gb25TZWN0aW9uS2V5RG93bihldmVudCwgXCJzdGFydFwiKX1cclxuICAgICAgICA+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRycC1sYWJlbFwiPntsYWJlbEZyb219PC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRycC12YWx1ZVwiPlxyXG4gICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJiaSBiaS1jYWxlbmRhcjMgZHJwLWljb25cIiAvPlxyXG4gICAgICAgICAgICA8c3BhbiBpZD1cImRycFN0YXJ0VmFsdWVcIj57c3RhcnREYXRlVGV4dH08L3NwYW4+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkcnAtc2VwYXJhdG9yIGhpZGRlbiBzbTpmbGV4XCI+XHJcbiAgICAgICAgICA8aSBjbGFzc05hbWU9XCJiaSBiaS1hcnJvdy1yaWdodFwiIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkcnAtc2VwYXJhdG9yLW1vYmlsZSBmbGV4IHNtOmhpZGRlblwiIC8+XHJcblxyXG4gICAgICAgIDxkaXZcclxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcclxuICAgICAgICAgICAgXCJkcnAtc2VjdGlvblwiLFxyXG4gICAgICAgICAgICBzZWxlY3RpbmdTdGVwID09PSBcImVuZFwiICYmIGlzT3BlbiA/IFwiYWN0aXZlXCIgOiBcIlwiLFxyXG4gICAgICAgICAgICBzaG93RW5kRXJyb3IgPyBcImlzLWVycm9yXCIgOiBcIlwiXHJcbiAgICAgICAgICApfVxyXG4gICAgICAgICAgZGF0YS1zZWN0aW9uPVwiZW5kXCJcclxuICAgICAgICAgIG9uQ2xpY2s9eyhldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgb25PcGVuUG9wb3ZlcihcImVuZFwiKTtcclxuICAgICAgICAgIH19XHJcbiAgICAgICAgICByb2xlPVwiYnV0dG9uXCJcclxuICAgICAgICAgIHRhYkluZGV4PXswfVxyXG4gICAgICAgICAgYXJpYS1sYWJlbD17bGFiZWxUb31cclxuICAgICAgICAgIG9uS2V5RG93bj17KGV2ZW50KSA9PiBvblNlY3Rpb25LZXlEb3duKGV2ZW50LCBcImVuZFwiKX1cclxuICAgICAgICA+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRycC1sYWJlbFwiPntsYWJlbFRvfTwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkcnAtdmFsdWVcIj5cclxuICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiYmkgYmktY2FsZW5kYXIzIGRycC1pY29uXCIgLz5cclxuICAgICAgICAgICAgPHNwYW4gaWQ9XCJkcnBFbmRWYWx1ZVwiPntlbmREYXRlVGV4dH08L3NwYW4+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgICBpZD1cImRycENsZWFyXCJcclxuICAgICAgICAgIGNsYXNzTmFtZT1cImRycC1jbGVhclwiXHJcbiAgICAgICAgICBhcmlhLWxhYmVsPXtjbGVhclJhbmdlTGFiZWx9XHJcbiAgICAgICAgICBzdHlsZT17eyBkaXNwbGF5OiBoYXNTZWxlY3RlZFJhbmdlID8gXCJpbmxpbmUtZmxleFwiIDogXCJub25lXCIgfX1cclxuICAgICAgICAgIG9uQ2xpY2s9e29uQ2xlYXJ9XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPGkgY2xhc3NOYW1lPVwiYmkgYmkteC1sZ1wiIC8+XHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgPGRpdiBpZD1cImRycFBvcG92ZXJcIiByZWY9e3BvcG92ZXJSZWZ9IGNsYXNzTmFtZT1cImRycC1wb3BvdmVyXCIgaGlkZGVuPXshaXNPcGVufT5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRycC1oZWFkXCI+XHJcbiAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJkcnAtbmF2XCJcclxuICAgICAgICAgICAgZGF0YS1kaXI9XCJwcmV2XCJcclxuICAgICAgICAgICAgYXJpYS1sYWJlbD17cHJldk1vbnRoTGFiZWx9XHJcbiAgICAgICAgICAgIG9uQ2xpY2s9e29uUHJldk1vbnRofVxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBjbGFzc05hbWU9XCJoLTQgdy00XCIgZmlsbD1cIm5vbmVcIiB2aWV3Qm94PVwiMCAwIDMwIDMwXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCI+XHJcbiAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIHN0cm9rZVdpZHRoPVwiMlwiIGQ9XCJNMTUgMTlsLTctNyA3LTdcIiAvPlxyXG4gICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgPGRpdiBpZD1cImRycE1vbnRoTGFiZWxcIiBjbGFzc05hbWU9XCJkcnAtbW9udGhcIj57bW9udGhMYWJlbH08L2Rpdj5cclxuICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImRycC1uYXZcIlxyXG4gICAgICAgICAgICBkYXRhLWRpcj1cIm5leHRcIlxyXG4gICAgICAgICAgICBhcmlhLWxhYmVsPXtuZXh0TW9udGhMYWJlbH1cclxuICAgICAgICAgICAgb25DbGljaz17b25OZXh0TW9udGh9XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGNsYXNzTmFtZT1cImgtNCB3LTRcIiBmaWxsPVwibm9uZVwiIHZpZXdCb3g9XCIwIDAgMzAgMzBcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIj5cclxuICAgICAgICAgICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgc3Ryb2tlV2lkdGg9XCIyXCIgZD1cIk05IDVsNyA3LTcgN1wiIC8+XHJcbiAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZHJwLXdlZWtkYXlzXCI+XHJcbiAgICAgICAgICB7d2Vla0RheUxhYmVscy5tYXAoKGxhYmVsLCBpbmRleCkgPT4gKFxyXG4gICAgICAgICAgICA8c3BhbiBrZXk9e2Ake2xhYmVsfS0ke2luZGV4fWB9PntsYWJlbH08L3NwYW4+XHJcbiAgICAgICAgICApKX1cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgPGRpdiBpZD1cImRycEdyaWRcIiBjbGFzc05hbWU9XCJkcnAtZ3JpZFwiIG9uTW91c2VMZWF2ZT17b25HcmlkTW91c2VMZWF2ZX0+XHJcbiAgICAgICAgICB7ZGF5Q2VsbHMubWFwKChjZWxsKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjZWxsLmlzRW1wdHkpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gPGJ1dHRvbiBrZXk9e2NlbGwua2V5fSBjbGFzc05hbWU9XCJkcnAtZGF5IGVtcHR5XCIgZGlzYWJsZWQgLz47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAga2V5PXtjZWxsLmtleX1cclxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjZWxsLmRheUNsYXNzfVxyXG4gICAgICAgICAgICAgICAgZGF0YS1kYXRlPXtjZWxsLmlzb31cclxuICAgICAgICAgICAgICAgIGRpc2FibGVkPXtjZWxsLmRpc2FibGVkfVxyXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gb25EYXlDbGljayhjZWxsKX1cclxuICAgICAgICAgICAgICAgIG9uTW91c2VFbnRlcj17KCkgPT4gb25EYXlIb3ZlcihjZWxsKX1cclxuICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICB7Y2VsbC5kYXlMYWJlbH1cclxuICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH0pfVxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICA8ZGl2IGlkPVwiZHJwU3RhdHVzXCIgY2xhc3NOYW1lPVwiZHJwLXN0YXR1c1wiPlxyXG4gICAgICAgICAge3N0YXR1c1RleHR9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEhpc3RvcnlNYW51YWxEYXRlUGlja2VyO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7OztBQWlDSTtBQWhCSixJQUFNLGlCQUFpQixDQUFDO0FBQUEsRUFDdEI7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBLFlBQVk7QUFBQSxFQUNaLGNBQWM7QUFBQSxFQUNkLGNBQWM7QUFBQSxFQUNkLGFBQWE7QUFBQSxFQUNiLGFBQWE7QUFBQSxFQUNiLGFBQWE7QUFBQSxFQUNiLFlBQVk7QUFDZCxNQUFhO0FBQ1gsUUFBTSxxQkFBcUIseUVBQXlFLFNBQVMsR0FBRyxLQUFLO0FBRXJILFNBQ0UsNEVBQ0U7QUFBQSxpREFBQyxTQUFJLFdBQVcsOEVBQThFLFNBQVMsR0FBRyxLQUFLLEdBQzdHO0FBQUEsbURBQUMsVUFBSyxXQUFVLGlCQUFpQjtBQUFBO0FBQUEsUUFBaUI7QUFBQSxTQUFDO0FBQUEsTUFDbkQsNENBQUMsVUFBTSxxQkFBVTtBQUFBLE1BQ2pCLDZDQUFDLFVBQUssV0FBVSxpQkFBaUI7QUFBQTtBQUFBLFFBQWU7QUFBQSxTQUFDO0FBQUEsTUFDakQsNENBQUMsVUFBTSxtQkFBUTtBQUFBLE9BQ2pCO0FBQUEsSUFDQyxjQUFjLGNBQ2IsNkNBQUMsU0FB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QUFDLFlBQXNCLFdBQVUsaUJBQWdCLFVBQVEsUUFBNUMsS0FBSyxHQUF3QztBQUFBLFFBQ25FO0FBRUEsZUFDRTtBQUFBLFVBQUM7QUFBQTtBQUFBLFlBRUMsTUFBSztBQUFBLFlBQ0wsV0FBVyxLQUFLO0FBQUEsWUFDaEIsYUFBVyxLQUFLO0FBQUEsWUFDaEIsVUFBVSxLQUFLO0FBQUEsWUFDZixTQUFTLE1BQU0sV0FBVyxJQUFJO0FBQUEsWUFDOUIsY0FBYyxNQUFNLFdBQVcsSUFBSTtBQUFBLFlBRWxDLGVBQUs7QUFBQTtBQUFBLFVBUkQsS0FBSztBQUFBLFFBU1o7QUFBQSxNQUVKLENBQUMsR0FDSDtBQUFBLE1BRUEsNkNBQUMsU0FBSSxJQUFHLGFBQVksV0FBVSxjQUMzQixzQkFDSDtBQUFBLE9BQ0Y7QUFBQSxLQUNGO0FBRUo7QUFFQSxJQUFPLGtDQUFROyIsCiAgIm5hbWVzIjogWyJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9qc3hfcnVudGltZSJdCn0K
