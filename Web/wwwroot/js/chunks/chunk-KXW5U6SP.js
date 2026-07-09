import {
  useFloatingPosition
} from "./chunk-SSILOGLX.js";
import {
  classNames
} from "./chunk-UNQYUM6B.js";
import {
  require_jsx_runtime,
  require_react_dom
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
var import_react_dom = __toESM(require_react_dom());
var import_jsx_runtime4 = __toESM(require_jsx_runtime());
var MIN_POPOVER_WIDTH_PX = 360;
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
  const floatingStyle = useFloatingPosition(activatorRef, isOpen, {
    overlayRef: popoverRef,
    autoFitViewport: true,
    minWidth: MIN_POPOVER_WIDTH_PX
  });
  const popover = isOpen && typeof document !== "undefined" ? (0, import_react_dom.createPortal)(
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
      "div",
      {
        id: "drpPopover",
        ref: popoverRef,
        className: "drp-popover",
        role: "group",
        "aria-label": filterTitle,
        "data-floating-placement": floatingStyle.placement,
        style: {
          position: "fixed",
          top: floatingStyle.top,
          left: floatingStyle.left,
          width: floatingStyle.width,
          maxHeight: floatingStyle.maxHeight,
          overflowY: "auto",
          overscrollBehavior: "contain",
          zIndex: 36e4
        },
        children: [
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
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "drp-weekdays", children: weekDayLabels.map((weekDayLabel) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { children: weekDayLabel }, weekDayLabel)) }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { id: "drpGrid", className: "drp-grid", onMouseLeave: onGridMouseLeave, children: dayCells.map((cell) => {
            if (cell.isEmpty) {
              return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "drp-day empty block", "aria-hidden": "true" }, cell.key);
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
        ]
      }
    ),
    document.body
  ) : null;
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
        "aria-haspopup": "grid",
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
    popover
  ] });
};
var HistoryManualDatePicker_default = HistoryManualDatePicker;

export {
  HistorySummary_default,
  ActionButton_default,
  FilterButton_default,
  HistoryManualDatePicker_default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvaGlzdG9yaWFsL0hpc3RvcnlTdW1tYXJ5LnRzeCIsICIuLi8uLi9yZWFjdC9zcmMvY29tcG9uZW50cy9jb21tb25zL0FjdGlvbkJ1dHRvbi50c3giLCAiLi4vLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9GaWx0ZXJCdXR0b24udHN4IiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy92aXNpdGFzL2hpc3RvcmlhbC9IaXN0b3J5TWFudWFsRGF0ZVBpY2tlci50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuXHJcbnR5cGUgUHJvcHMgPSB7XHJcbiAgc3VtbWFyeUZyb21MYWJlbDogc3RyaW5nO1xyXG4gIHN1bW1hcnlUb0xhYmVsOiBzdHJpbmc7XHJcbiAgZnJvbVZhbHVlOiBzdHJpbmc7XHJcbiAgdG9WYWx1ZTogc3RyaW5nO1xyXG4gIGNsYXNzTmFtZT86IHN0cmluZztcclxuICBjbGllbnRMYWJlbD86IHN0cmluZztcclxuICBjbGllbnRWYWx1ZT86IHN0cmluZztcclxuICBzaG93Q2xpZW50PzogYm9vbGVhbjtcclxuICBvd25lckxhYmVsPzogc3RyaW5nO1xyXG4gIG93bmVyVmFsdWU/OiBzdHJpbmc7XHJcbiAgc2hvd093bmVyPzogYm9vbGVhbjtcclxufTtcclxuXHJcbi8vIFJlbmRlcnMgdGhlIHJldXNhYmxlIGRhdGUgc3VtbWFyeSBibG9jayBmb3IgaGlzdG9yeSBmaWx0ZXJzLlxyXG5jb25zdCBIaXN0b3J5U3VtbWFyeSA9ICh7XHJcbiAgc3VtbWFyeUZyb21MYWJlbCxcclxuICBzdW1tYXJ5VG9MYWJlbCxcclxuICBmcm9tVmFsdWUsXHJcbiAgdG9WYWx1ZSxcclxuICBjbGFzc05hbWUgPSBcIlwiLFxyXG4gIGNsaWVudExhYmVsID0gXCJcIixcclxuICBjbGllbnRWYWx1ZSA9IFwiXCIsXHJcbiAgc2hvd0NsaWVudCA9IGZhbHNlLFxyXG4gIG93bmVyTGFiZWwgPSBcIlwiLFxyXG4gIG93bmVyVmFsdWUgPSBcIlwiLFxyXG4gIHNob3dPd25lciA9IGZhbHNlLFxyXG59OiBQcm9wcykgPT4ge1xyXG4gIGNvbnN0IGRldGFpbFJvd0NsYXNzTmFtZSA9IGBoaXN0b3J5LWZpbHRlci1zdW1tYXJ5IG10LTEuNSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0ZXh0LXhzIG1pbi13LTAgJHtjbGFzc05hbWV9YC50cmltKCk7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8PlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17YGhpc3RvcnktZmlsdGVyLXN1bW1hcnkgZmxleCBmbGV4LXdyYXAgaXRlbXMtY2VudGVyIGdhcC14LTMgZ2FwLXktMiB0ZXh0LXhzICR7Y2xhc3NOYW1lfWAudHJpbSgpfT5cclxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkXCI+e3N1bW1hcnlGcm9tTGFiZWx9Ojwvc3Bhbj5cclxuICAgICAgICA8c3Bhbj57ZnJvbVZhbHVlfTwvc3Bhbj5cclxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkXCI+e3N1bW1hcnlUb0xhYmVsfTo8L3NwYW4+XHJcbiAgICAgICAgPHNwYW4+e3RvVmFsdWV9PC9zcGFuPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAge3Nob3dDbGllbnQgJiYgY2xpZW50VmFsdWUgPyAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2RldGFpbFJvd0NsYXNzTmFtZX0+XHJcbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkIHNocmluay0wXCI+e2NsaWVudExhYmVsfTo8L3NwYW4+XHJcbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJtaW4tdy0wIGZsZXgtMSB0cnVuY2F0ZVwiPntjbGllbnRWYWx1ZX08L3NwYW4+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICkgOiBudWxsfVxyXG4gICAgICB7c2hvd093bmVyICYmIG93bmVyVmFsdWUgPyAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2RldGFpbFJvd0NsYXNzTmFtZX0+XHJcbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkIHNocmluay0wXCI+e293bmVyTGFiZWx9Ojwvc3Bhbj5cclxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1pbi13LTAgZmxleC0xIHRydW5jYXRlXCI+e293bmVyVmFsdWV9PC9zcGFuPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApIDogbnVsbH1cclxuICAgIDwvPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBIaXN0b3J5U3VtbWFyeTtcclxuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgY2xhc3NOYW1lcyB9IGZyb20gXCIuLi8uLi91dGlscy9jbGFzc05hbWVzLnRzXCI7XHJcblxyXG50eXBlIFByb3BzID0ge1xyXG4gIGxhYmVsOiBzdHJpbmc7XHJcbiAgZGlzYWJsZWQ/OiBib29sZWFuO1xyXG4gIG9uQ2xpY2s/OiAoKSA9PiB2b2lkO1xyXG4gIGNsYXNzTmFtZT86IHN0cmluZztcclxuICBhcmlhTGFiZWw/OiBzdHJpbmc7XHJcbiAgdHlwZT86IFwiYnV0dG9uXCIgfCBcInN1Ym1pdFwiIHwgXCJyZXNldFwiO1xyXG59O1xyXG5cclxuLy8gRHVtYiBhY3Rpb24gYnV0dG9uIHdpdGggc3RhbmRhcmRpemVkIHN0eWxpbmcuXHJcbmNvbnN0IEFjdGlvbkJ1dHRvbiA9ICh7XHJcbiAgbGFiZWwsXHJcbiAgZGlzYWJsZWQgPSBmYWxzZSxcclxuICBvbkNsaWNrLFxyXG4gIGNsYXNzTmFtZSxcclxuICBhcmlhTGFiZWwsXHJcbiAgdHlwZSA9IFwiYnV0dG9uXCJcclxufTogUHJvcHMpID0+IHtcclxuICByZXR1cm4gKFxyXG4gICAgPGJ1dHRvblxyXG4gICAgICB0eXBlPXt0eXBlfVxyXG4gICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXCJpbmQtYWN0aW9uLWJ0blwiLCBjbGFzc05hbWUpfVxyXG4gICAgICBvbkNsaWNrPXtvbkNsaWNrfVxyXG4gICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XHJcbiAgICAgIGFyaWEtbGFiZWw9e2FyaWFMYWJlbCB8fCBsYWJlbH1cclxuICAgID5cclxuICAgICAge2xhYmVsfVxyXG4gICAgPC9idXR0b24+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFjdGlvbkJ1dHRvbjtcclxuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgY2xhc3NOYW1lcyB9IGZyb20gXCIuLi8uLi91dGlscy9jbGFzc05hbWVzLnRzXCI7XHJcblxyXG50eXBlIFByb3BzID0ge1xyXG4gIGxhYmVsOiBzdHJpbmc7XHJcbiAgYWN0aXZlPzogYm9vbGVhbjtcclxuICBkaXNhYmxlZD86IGJvb2xlYW47XHJcbiAgb25DbGljaz86ICgpID0+IHZvaWQ7XHJcbiAgY2xhc3NOYW1lPzogc3RyaW5nO1xyXG4gIGFyaWFMYWJlbD86IHN0cmluZztcclxuICB0eXBlPzogXCJidXR0b25cIiB8IFwic3VibWl0XCIgfCBcInJlc2V0XCI7XHJcbn07XHJcblxyXG4vLyBEdW1iIGZpbHRlciBidXR0b24gd2l0aCBzdGFuZGFyZGl6ZWQgc3R5bGluZy5cclxuY29uc3QgRmlsdGVyQnV0dG9uID0gKHtcclxuICBsYWJlbCxcclxuICBhY3RpdmUgPSBmYWxzZSxcclxuICBkaXNhYmxlZCA9IGZhbHNlLFxyXG4gIG9uQ2xpY2ssXHJcbiAgY2xhc3NOYW1lLFxyXG4gIGFyaWFMYWJlbCxcclxuICB0eXBlID0gXCJidXR0b25cIlxyXG59OiBQcm9wcykgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8YnV0dG9uXHJcbiAgICAgIHR5cGU9e3R5cGV9XHJcbiAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcImluZC1maWx0ZXItYnRuXCIsIGFjdGl2ZSA/IFwiaW5kLWZpbHRlci1idG4tLWFjdGl2ZVwiIDogXCJcIiwgY2xhc3NOYW1lKX1cclxuICAgICAgb25DbGljaz17b25DbGlja31cclxuICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxyXG4gICAgICBhcmlhLWxhYmVsPXthcmlhTGFiZWwgfHwgbGFiZWx9XHJcbiAgICA+XHJcbiAgICAgIHtsYWJlbH1cclxuICAgIDwvYnV0dG9uPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBGaWx0ZXJCdXR0b247XHJcbiIsICJcdUZFRkZpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IGNsYXNzTmFtZXMgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvY2xhc3NOYW1lcy50c1wiO1xuaW1wb3J0IHsgY3JlYXRlUG9ydGFsIH0gZnJvbSBcInJlYWN0LWRvbVwiO1xuaW1wb3J0IHsgdXNlRmxvYXRpbmdQb3NpdGlvbiB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VGbG9hdGluZ1Bvc2l0aW9uLnRzXCI7XG5cclxuZXhwb3J0IHR5cGUgSGlzdG9yeU1hbnVhbERheUNlbGwgPSB7XHJcbiAga2V5OiBzdHJpbmc7XHJcbiAgaXNFbXB0eTogYm9vbGVhbjtcclxuICBkYXRlPzogRGF0ZTtcclxuICBpc28/OiBzdHJpbmc7XHJcbiAgZGF5TGFiZWw/OiBudW1iZXI7XHJcbiAgZGF5Q2xhc3M/OiBzdHJpbmc7XHJcbiAgZGlzYWJsZWQ/OiBib29sZWFuO1xyXG59O1xyXG5cclxudHlwZSBIaXN0b3J5TWFudWFsRGF0ZVBpY2tlclByb3BzID0ge1xuICBhY3RpdmF0b3JSZWY6IFJlYWN0LlJlZk9iamVjdDxIVE1MRGl2RWxlbWVudCB8IG51bGw+O1xyXG4gIHBvcG92ZXJSZWY6IFJlYWN0LlJlZk9iamVjdDxIVE1MRGl2RWxlbWVudCB8IG51bGw+O1xyXG4gIHNob3dNYW51YWxFcnJvcjogYm9vbGVhbjtcclxuICBzaG93U3RhcnRFcnJvcjogYm9vbGVhbjtcclxuICBzaG93RW5kRXJyb3I6IGJvb2xlYW47XHJcbiAgZmlsdGVyVGl0bGU6IHN0cmluZztcclxuICBpc09wZW46IGJvb2xlYW47XHJcbiAgc2VsZWN0aW5nU3RlcDogXCJzdGFydFwiIHwgXCJlbmRcIiB8IFwiZG9uZVwiO1xyXG4gIGxhYmVsRnJvbTogc3RyaW5nO1xyXG4gIGxhYmVsVG86IHN0cmluZztcclxuICBzdGFydERhdGVUZXh0OiBzdHJpbmc7XHJcbiAgZW5kRGF0ZVRleHQ6IHN0cmluZztcclxuICBjbGVhclJhbmdlTGFiZWw6IHN0cmluZztcclxuICBoYXNTZWxlY3RlZFJhbmdlOiBib29sZWFuO1xyXG4gIG1vbnRoTGFiZWw6IHN0cmluZztcclxuICB3ZWVrRGF5TGFiZWxzOiBzdHJpbmdbXTtcclxuICBzdGF0dXNUZXh0OiBzdHJpbmc7XHJcbiAgZGF5Q2VsbHM6IEhpc3RvcnlNYW51YWxEYXlDZWxsW107XHJcbiAgcHJldk1vbnRoTGFiZWw6IHN0cmluZztcclxuICBuZXh0TW9udGhMYWJlbDogc3RyaW5nO1xyXG4gIG9uT3BlblBvcG92ZXI6IChzZWN0aW9uOiBcInN0YXJ0XCIgfCBcImVuZFwiKSA9PiB2b2lkO1xyXG4gIG9uQWN0aXZhdG9yS2V5RG93bjogKGV2ZW50OiBSZWFjdC5LZXlib2FyZEV2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4gdm9pZDtcclxuICBvblNlY3Rpb25LZXlEb3duOiAoZXZlbnQ6IFJlYWN0LktleWJvYXJkRXZlbnQ8SFRNTERpdkVsZW1lbnQ+LCBzZWN0aW9uOiBcInN0YXJ0XCIgfCBcImVuZFwiKSA9PiB2b2lkO1xyXG4gIG9uQ2xlYXI6IChldmVudDogUmVhY3QuTW91c2VFdmVudCkgPT4gdm9pZDtcclxuICBvblByZXZNb250aDogKGV2ZW50OiBSZWFjdC5Nb3VzZUV2ZW50PEhUTUxCdXR0b25FbGVtZW50PikgPT4gdm9pZDtcclxuICBvbk5leHRNb250aDogKGV2ZW50OiBSZWFjdC5Nb3VzZUV2ZW50PEhUTUxCdXR0b25FbGVtZW50PikgPT4gdm9pZDtcclxuICBvbkdyaWRNb3VzZUxlYXZlOiAoKSA9PiB2b2lkO1xyXG4gIG9uRGF5Q2xpY2s6IChkYXk6IEhpc3RvcnlNYW51YWxEYXlDZWxsKSA9PiB2b2lkO1xyXG4gIG9uRGF5SG92ZXI6IChkYXk6IEhpc3RvcnlNYW51YWxEYXlDZWxsKSA9PiB2b2lkO1xufTtcblxuY29uc3QgTUlOX1BPUE9WRVJfV0lEVEhfUFggPSAzNjA7XG5cbi8vIFByZXNlbnRhdGlvbmFsIGRhdGUgcmFuZ2UgcGlja2VyIHVzZWQgYnkgdGhlIGhpc3RvcnkgcXVpY2sgZmlsdGVyLlxuY29uc3QgSGlzdG9yeU1hbnVhbERhdGVQaWNrZXIgPSAoe1xyXG4gIGFjdGl2YXRvclJlZixcclxuICBwb3BvdmVyUmVmLFxyXG4gIHNob3dNYW51YWxFcnJvcixcclxuICBzaG93U3RhcnRFcnJvcixcclxuICBzaG93RW5kRXJyb3IsXHJcbiAgZmlsdGVyVGl0bGUsXHJcbiAgaXNPcGVuLFxyXG4gIHNlbGVjdGluZ1N0ZXAsXHJcbiAgbGFiZWxGcm9tLFxyXG4gIGxhYmVsVG8sXHJcbiAgc3RhcnREYXRlVGV4dCxcclxuICBlbmREYXRlVGV4dCxcclxuICBjbGVhclJhbmdlTGFiZWwsXHJcbiAgaGFzU2VsZWN0ZWRSYW5nZSxcclxuICBtb250aExhYmVsLFxyXG4gIHdlZWtEYXlMYWJlbHMsXHJcbiAgc3RhdHVzVGV4dCxcclxuICBkYXlDZWxscyxcclxuICBwcmV2TW9udGhMYWJlbCxcclxuICBuZXh0TW9udGhMYWJlbCxcclxuICBvbk9wZW5Qb3BvdmVyLFxyXG4gIG9uQWN0aXZhdG9yS2V5RG93bixcclxuICBvblNlY3Rpb25LZXlEb3duLFxyXG4gIG9uQ2xlYXIsXHJcbiAgb25QcmV2TW9udGgsXHJcbiAgb25OZXh0TW9udGgsXHJcbiAgb25HcmlkTW91c2VMZWF2ZSxcclxuICBvbkRheUNsaWNrLFxuICBvbkRheUhvdmVyLFxufTogSGlzdG9yeU1hbnVhbERhdGVQaWNrZXJQcm9wcykgPT4ge1xuICBjb25zdCBmbG9hdGluZ1N0eWxlID0gdXNlRmxvYXRpbmdQb3NpdGlvbihhY3RpdmF0b3JSZWYsIGlzT3Blbiwge1xuICAgIG92ZXJsYXlSZWY6IHBvcG92ZXJSZWYsXG4gICAgYXV0b0ZpdFZpZXdwb3J0OiB0cnVlLFxuICAgIG1pbldpZHRoOiBNSU5fUE9QT1ZFUl9XSURUSF9QWCxcbiAgfSk7XG4gIGNvbnN0IHBvcG92ZXIgPVxuICAgIGlzT3BlbiAmJiB0eXBlb2YgZG9jdW1lbnQgIT09IFwidW5kZWZpbmVkXCJcbiAgICAgID8gY3JlYXRlUG9ydGFsKFxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGlkPVwiZHJwUG9wb3ZlclwiXG4gICAgICAgICAgICByZWY9e3BvcG92ZXJSZWZ9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJkcnAtcG9wb3ZlclwiXG4gICAgICAgICAgICByb2xlPVwiZ3JvdXBcIlxuICAgICAgICAgICAgYXJpYS1sYWJlbD17ZmlsdGVyVGl0bGV9XG4gICAgICAgICAgICBkYXRhLWZsb2F0aW5nLXBsYWNlbWVudD17ZmxvYXRpbmdTdHlsZS5wbGFjZW1lbnR9XG4gICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICBwb3NpdGlvbjogXCJmaXhlZFwiLFxuICAgICAgICAgICAgICB0b3A6IGZsb2F0aW5nU3R5bGUudG9wLFxuICAgICAgICAgICAgICBsZWZ0OiBmbG9hdGluZ1N0eWxlLmxlZnQsXG4gICAgICAgICAgICAgIHdpZHRoOiBmbG9hdGluZ1N0eWxlLndpZHRoLFxuICAgICAgICAgICAgICBtYXhIZWlnaHQ6IGZsb2F0aW5nU3R5bGUubWF4SGVpZ2h0LFxuICAgICAgICAgICAgICBvdmVyZmxvd1k6IFwiYXV0b1wiLFxuICAgICAgICAgICAgICBvdmVyc2Nyb2xsQmVoYXZpb3I6IFwiY29udGFpblwiLFxuICAgICAgICAgICAgICB6SW5kZXg6IDM2MDAwMCxcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkcnAtaGVhZFwiPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZHJwLW5hdlwiXG4gICAgICAgICAgICAgICAgZGF0YS1kaXI9XCJwcmV2XCJcbiAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtwcmV2TW9udGhMYWJlbH1cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXtvblByZXZNb250aH1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGNsYXNzTmFtZT1cImgtNCB3LTRcIiBmaWxsPVwibm9uZVwiIHZpZXdCb3g9XCIwIDAgMzAgMzBcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIj5cbiAgICAgICAgICAgICAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBzdHJva2VXaWR0aD1cIjJcIiBkPVwiTTE1IDE5bC03LTcgNy03XCIgLz5cbiAgICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDxkaXYgaWQ9XCJkcnBNb250aExhYmVsXCIgY2xhc3NOYW1lPVwiZHJwLW1vbnRoXCI+e21vbnRoTGFiZWx9PC9kaXY+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJkcnAtbmF2XCJcbiAgICAgICAgICAgICAgICBkYXRhLWRpcj1cIm5leHRcIlxuICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9e25leHRNb250aExhYmVsfVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e29uTmV4dE1vbnRofVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgY2xhc3NOYW1lPVwiaC00IHctNFwiIGZpbGw9XCJub25lXCIgdmlld0JveD1cIjAgMCAzMCAzMFwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiPlxuICAgICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIHN0cm9rZVdpZHRoPVwiMlwiIGQ9XCJNOSA1bDcgNy03IDdcIiAvPlxuICAgICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRycC13ZWVrZGF5c1wiPlxuICAgICAgICAgICAgICB7d2Vla0RheUxhYmVscy5tYXAoKHdlZWtEYXlMYWJlbCkgPT4gKFxuICAgICAgICAgICAgICAgIDxzcGFuIGtleT17d2Vla0RheUxhYmVsfT57d2Vla0RheUxhYmVsfTwvc3Bhbj5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBpZD1cImRycEdyaWRcIiBjbGFzc05hbWU9XCJkcnAtZ3JpZFwiIG9uTW91c2VMZWF2ZT17b25HcmlkTW91c2VMZWF2ZX0+XG4gICAgICAgICAgICAgIHtkYXlDZWxscy5tYXAoKGNlbGwpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoY2VsbC5pc0VtcHR5KSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gPHNwYW4ga2V5PXtjZWxsLmtleX0gY2xhc3NOYW1lPVwiZHJwLWRheSBlbXB0eSBibG9ja1wiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIC8+O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGtleT17Y2VsbC5rZXl9XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NlbGwuZGF5Q2xhc3N9XG4gICAgICAgICAgICAgICAgICAgIGRhdGEtZGF0ZT17Y2VsbC5pc299XG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtjZWxsLmRpc2FibGVkfVxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvbkRheUNsaWNrKGNlbGwpfVxuICAgICAgICAgICAgICAgICAgICBvbk1vdXNlRW50ZXI9eygpID0+IG9uRGF5SG92ZXIoY2VsbCl9XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHtjZWxsLmRheUxhYmVsfVxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBpZD1cImRycFN0YXR1c1wiIGNsYXNzTmFtZT1cImRycC1zdGF0dXNcIj5cbiAgICAgICAgICAgICAge3N0YXR1c1RleHR9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj4sXG4gICAgICAgICAgZG9jdW1lbnQuYm9keVxuICAgICAgICApXG4gICAgICA6IG51bGw7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlXCI+XG4gICAgICA8ZGl2XHJcbiAgICAgICAgaWQ9XCJkcnBBY3RpdmF0b3JcIlxyXG4gICAgICAgIHJlZj17YWN0aXZhdG9yUmVmfVxyXG4gICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcImRycCB3LWZ1bGxcIiwgc2hvd01hbnVhbEVycm9yID8gXCJkcnAtZXJyb3JcIiA6IFwiXCIpfVxyXG4gICAgICAgIG9uQ2xpY2s9eygpID0+IG9uT3BlblBvcG92ZXIoXCJzdGFydFwiKX1cclxuICAgICAgICByb2xlPVwiYnV0dG9uXCJcclxuICAgICAgICB0YWJJbmRleD17MH1cbiAgICAgICAgYXJpYS1sYWJlbD17ZmlsdGVyVGl0bGV9XG4gICAgICAgIGFyaWEtaGFzcG9wdXA9XCJncmlkXCJcbiAgICAgICAgYXJpYS1leHBhbmRlZD17aXNPcGVufVxuICAgICAgICBvbktleURvd249e29uQWN0aXZhdG9yS2V5RG93bn1cclxuICAgICAgPlxyXG4gICAgICAgIDxkaXZcclxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcclxuICAgICAgICAgICAgXCJkcnAtc2VjdGlvblwiLFxyXG4gICAgICAgICAgICBzZWxlY3RpbmdTdGVwID09PSBcInN0YXJ0XCIgJiYgaXNPcGVuID8gXCJhY3RpdmVcIiA6IFwiXCIsXHJcbiAgICAgICAgICAgIHNob3dTdGFydEVycm9yID8gXCJpcy1lcnJvclwiIDogXCJcIlxyXG4gICAgICAgICAgKX1cclxuICAgICAgICAgIGRhdGEtc2VjdGlvbj1cInN0YXJ0XCJcclxuICAgICAgICAgIG9uQ2xpY2s9eyhldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgb25PcGVuUG9wb3ZlcihcInN0YXJ0XCIpO1xyXG4gICAgICAgICAgfX1cclxuICAgICAgICAgIHJvbGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgdGFiSW5kZXg9ezB9XHJcbiAgICAgICAgICBhcmlhLWxhYmVsPXtsYWJlbEZyb219XHJcbiAgICAgICAgICBvbktleURvd249eyhldmVudCkgPT4gb25TZWN0aW9uS2V5RG93bihldmVudCwgXCJzdGFydFwiKX1cclxuICAgICAgICA+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRycC1sYWJlbFwiPntsYWJlbEZyb219PC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRycC12YWx1ZVwiPlxyXG4gICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJiaSBiaS1jYWxlbmRhcjMgZHJwLWljb25cIiAvPlxyXG4gICAgICAgICAgICA8c3BhbiBpZD1cImRycFN0YXJ0VmFsdWVcIj57c3RhcnREYXRlVGV4dH08L3NwYW4+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkcnAtc2VwYXJhdG9yIGhpZGRlbiBzbTpmbGV4XCI+XHJcbiAgICAgICAgICA8aSBjbGFzc05hbWU9XCJiaSBiaS1hcnJvdy1yaWdodFwiIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkcnAtc2VwYXJhdG9yLW1vYmlsZSBmbGV4IHNtOmhpZGRlblwiIC8+XHJcblxyXG4gICAgICAgIDxkaXZcclxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcclxuICAgICAgICAgICAgXCJkcnAtc2VjdGlvblwiLFxyXG4gICAgICAgICAgICBzZWxlY3RpbmdTdGVwID09PSBcImVuZFwiICYmIGlzT3BlbiA/IFwiYWN0aXZlXCIgOiBcIlwiLFxyXG4gICAgICAgICAgICBzaG93RW5kRXJyb3IgPyBcImlzLWVycm9yXCIgOiBcIlwiXHJcbiAgICAgICAgICApfVxyXG4gICAgICAgICAgZGF0YS1zZWN0aW9uPVwiZW5kXCJcclxuICAgICAgICAgIG9uQ2xpY2s9eyhldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgb25PcGVuUG9wb3ZlcihcImVuZFwiKTtcclxuICAgICAgICAgIH19XHJcbiAgICAgICAgICByb2xlPVwiYnV0dG9uXCJcclxuICAgICAgICAgIHRhYkluZGV4PXswfVxyXG4gICAgICAgICAgYXJpYS1sYWJlbD17bGFiZWxUb31cclxuICAgICAgICAgIG9uS2V5RG93bj17KGV2ZW50KSA9PiBvblNlY3Rpb25LZXlEb3duKGV2ZW50LCBcImVuZFwiKX1cclxuICAgICAgICA+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRycC1sYWJlbFwiPntsYWJlbFRvfTwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkcnAtdmFsdWVcIj5cclxuICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiYmkgYmktY2FsZW5kYXIzIGRycC1pY29uXCIgLz5cclxuICAgICAgICAgICAgPHNwYW4gaWQ9XCJkcnBFbmRWYWx1ZVwiPntlbmREYXRlVGV4dH08L3NwYW4+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgICBpZD1cImRycENsZWFyXCJcclxuICAgICAgICAgIGNsYXNzTmFtZT1cImRycC1jbGVhclwiXHJcbiAgICAgICAgICBhcmlhLWxhYmVsPXtjbGVhclJhbmdlTGFiZWx9XHJcbiAgICAgICAgICBzdHlsZT17eyBkaXNwbGF5OiBoYXNTZWxlY3RlZFJhbmdlID8gXCJpbmxpbmUtZmxleFwiIDogXCJub25lXCIgfX1cclxuICAgICAgICAgIG9uQ2xpY2s9e29uQ2xlYXJ9XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPGkgY2xhc3NOYW1lPVwiYmkgYmkteC1sZ1wiIC8+XHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAge3BvcG92ZXJ9XG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEhpc3RvcnlNYW51YWxEYXRlUGlja2VyO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7QUFpQ0k7QUFoQkosSUFBTSxpQkFBaUIsQ0FBQztBQUFBLEVBQ3RCO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQSxZQUFZO0FBQUEsRUFDWixjQUFjO0FBQUEsRUFDZCxjQUFjO0FBQUEsRUFDZCxhQUFhO0FBQUEsRUFDYixhQUFhO0FBQUEsRUFDYixhQUFhO0FBQUEsRUFDYixZQUFZO0FBQ2QsTUFBYTtBQUNYLFFBQU0scUJBQXFCLHlFQUF5RSxTQUFT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QWdCO0FBQ3RCLDhCQUFjLE9BQU87QUFBQSxjQUN2QjtBQUFBLGNBQ0EsTUFBSztBQUFBLGNBQ0wsVUFBVTtBQUFBLGNBQ1YsY0FBWTtBQUFBLGNBQ1osV0FBVyxDQUFDLFVBQVUsaUJBQWlCLE9BQU8sT0FBTztBQUFBLGNBRXJEO0FBQUEsNkRBQUMsU0FBSSxXQUFVLGFBQWEscUJBQVU7QUFBQSxnQkFDdEMsOENBQUMsU0FBSSxXQUFVLGFBQ2I7QUFBQSwrREFBQyxPQUFFLFdBQVUsNEJBQTJCO0FBQUEsa0JBQ3hDLDZDQUFDLFVBQUssSUFBRyxpQkFBaUIseUJBQWM7QUFBQSxtQkFDMUM7QUFBQTtBQUFBO0FBQUEsVUFDRjtBQUFBLFVBRUEsNkNBQUMsU0FBSSxXQUFVLGdDQUNiLHVEQUFDLE9BQUUsV0FBVSxxQkFBb0IsR0FDbkM7QUFBQSxVQUNBLDZDQUFDLFNBQUksV0FBVSx1Q0FBc0M7QUFBQSxVQUVyRDtBQUFBLFlBQUM7QUFBQTtBQUFBLGNBQ0MsV0FBVztBQUFBLGdCQUNUO0FBQUEsZ0JBQ0Esa0JBQWtCLFNBQVMsU0FBUyxXQUFXO0FBQUEsZ0JBQy9DLGVBQWUsYUFBYTtBQUFBLGNBQzlCO0FBQUEsY0FDQSxnQkFBYTtBQUFBLGNBQ2IsU0FBUyxDQUFDLFVBQVU7QUFDbEIsc0JBQU0sZ0JBQWdCO0FBQ3RCLDhCQUFjLEtBQUs7QUFBQSxjQUNyQjtBQUFBLGNBQ0EsTUFBSztBQUFBLGNBQ0wsVUFBVTtBQUFBLGNBQ1YsY0FBWTtBQUFBLGNBQ1osV0FBVyxDQUFDLFVBQVUsaUJBQWlCLE9BQU8sS0FBSztBQUFBLGNBRW5EO0FBQUEsNkRBQUMsU0FBSSxXQUFVLGFBQWEsbUJBQVE7QUFBQSxnQkFDcEMsOENBQUMsU0FBSSxXQUFVLGFBQ2I7QUFBQSwrREFBQyxPQUFFLFdBQVUsNEJBQTJCO0FBQUEsa0JBQ3hDLDZDQUFDLFVBQUssSUFBRyxlQUFlLHVCQUFZO0FBQUEsbUJBQ3RDO0FBQUE7QUFBQTtBQUFBLFVBQ0Y7QUFBQSxVQUVBO0FBQUEsWUFBQztBQUFBO0FBQUEsY0FDQyxNQUFLO0FBQUEsY0FDTCxJQUFHO0FBQUEsY0FDSCxXQUFVO0FBQUEsY0FDVixjQUFZO0FBQUEsY0FDWixPQUFPLEVBQUUsU0FBUyxtQkFBbUIsZ0JBQWdCLE9BQU87QUFBQSxjQUM1RCxTQUFTO0FBQUEsY0FFVCx1REFBQyxPQUFFLFdBQVUsY0FBYTtBQUFBO0FBQUEsVUFDNUI7QUFBQTtBQUFBO0FBQUEsSUFDRjtBQUFBLElBRUM7QUFBQSxLQUNIO0FBRUo7QUFFQSxJQUFPLGtDQUFROyIsCiAgIm5hbWVzIjogWyJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9qc3hfcnVudGltZSJdCn0K
