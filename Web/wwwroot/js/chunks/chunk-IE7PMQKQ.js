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
    ] }) : null,
    showOwner && ownerValue ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "history-filter-summary mt-1.5 flex items-center gap-2 text-xs min-w-0", children: [
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvaGlzdG9yaWFsL0hpc3RvcnlTdW1tYXJ5LnRzeCIsICIuLi8uLi9yZWFjdC9zcmMvY29tcG9uZW50cy9jb21tb25zL0FjdGlvbkJ1dHRvbi50c3giLCAiLi4vLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9GaWx0ZXJCdXR0b24udHN4IiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy92aXNpdGFzL2hpc3RvcmlhbC9IaXN0b3J5TWFudWFsRGF0ZVBpY2tlci50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuXHJcbnR5cGUgUHJvcHMgPSB7XHJcbiAgc3VtbWFyeUZyb21MYWJlbDogc3RyaW5nO1xyXG4gIHN1bW1hcnlUb0xhYmVsOiBzdHJpbmc7XHJcbiAgZnJvbVZhbHVlOiBzdHJpbmc7XHJcbiAgdG9WYWx1ZTogc3RyaW5nO1xyXG4gIGNsYXNzTmFtZT86IHN0cmluZztcclxuICBjbGllbnRMYWJlbD86IHN0cmluZztcbiAgY2xpZW50VmFsdWU/OiBzdHJpbmc7XG4gIHNob3dDbGllbnQ/OiBib29sZWFuO1xuICBvd25lckxhYmVsPzogc3RyaW5nO1xuICBvd25lclZhbHVlPzogc3RyaW5nO1xuICBzaG93T3duZXI/OiBib29sZWFuO1xufTtcblxyXG4vLyBSZW5kZXJzIHRoZSByZXVzYWJsZSBkYXRlIHN1bW1hcnkgYmxvY2sgZm9yIGhpc3RvcnkgZmlsdGVycy5cclxuY29uc3QgSGlzdG9yeVN1bW1hcnkgPSAoe1xyXG4gIHN1bW1hcnlGcm9tTGFiZWwsXHJcbiAgc3VtbWFyeVRvTGFiZWwsXHJcbiAgZnJvbVZhbHVlLFxyXG4gIHRvVmFsdWUsXHJcbiAgY2xhc3NOYW1lID0gXCJcIixcclxuICBjbGllbnRMYWJlbCA9IFwiXCIsXG4gIGNsaWVudFZhbHVlID0gXCJcIixcbiAgc2hvd0NsaWVudCA9IGZhbHNlLFxuICBvd25lckxhYmVsID0gXCJcIixcbiAgb3duZXJWYWx1ZSA9IFwiXCIsXG4gIHNob3dPd25lciA9IGZhbHNlLFxufTogUHJvcHMpID0+IHtcbiAgcmV0dXJuIChcclxuICAgIDw+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtgaGlzdG9yeS1maWx0ZXItc3VtbWFyeSBmbGV4IGZsZXgtd3JhcCBpdGVtcy1jZW50ZXIgZ2FwLXgtMyBnYXAteS0yIHRleHQteHMgJHtjbGFzc05hbWV9YC50cmltKCl9PlxyXG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtc2VtaWJvbGRcIj57c3VtbWFyeUZyb21MYWJlbH06PC9zcGFuPlxyXG4gICAgICAgIDxzcGFuPntmcm9tVmFsdWV9PC9zcGFuPlxyXG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtc2VtaWJvbGRcIj57c3VtbWFyeVRvTGFiZWx9Ojwvc3Bhbj5cclxuICAgICAgICA8c3Bhbj57dG9WYWx1ZX08L3NwYW4+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICB7c2hvd0NsaWVudCAmJiBjbGllbnRWYWx1ZSA/IChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoaXN0b3J5LWZpbHRlci1zdW1tYXJ5IG10LTEuNSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0ZXh0LXhzIG1pbi13LTBcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkIHNocmluay0wXCI+e2NsaWVudExhYmVsfTo8L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibWluLXctMCBmbGV4LTEgdHJ1bmNhdGVcIj57Y2xpZW50VmFsdWV9PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICkgOiBudWxsfVxuICAgICAge3Nob3dPd25lciAmJiBvd25lclZhbHVlID8gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhpc3RvcnktZmlsdGVyLXN1bW1hcnkgbXQtMS41IGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQteHMgbWluLXctMFwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtc2VtaWJvbGQgc2hyaW5rLTBcIj57b3duZXJMYWJlbH06PC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1pbi13LTAgZmxleC0xIHRydW5jYXRlXCI+e293bmVyVmFsdWV9PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICkgOiBudWxsfVxuICAgIDwvPlxuICApO1xufTtcblxyXG5leHBvcnQgZGVmYXVsdCBIaXN0b3J5U3VtbWFyeTtcclxuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgY2xhc3NOYW1lcyB9IGZyb20gXCIuLi8uLi91dGlscy9jbGFzc05hbWVzLnRzXCI7XHJcblxyXG50eXBlIFByb3BzID0ge1xyXG4gIGxhYmVsOiBzdHJpbmc7XHJcbiAgZGlzYWJsZWQ/OiBib29sZWFuO1xyXG4gIG9uQ2xpY2s/OiAoKSA9PiB2b2lkO1xyXG4gIGNsYXNzTmFtZT86IHN0cmluZztcclxuICBhcmlhTGFiZWw/OiBzdHJpbmc7XHJcbiAgdHlwZT86IFwiYnV0dG9uXCIgfCBcInN1Ym1pdFwiIHwgXCJyZXNldFwiO1xyXG59O1xyXG5cclxuLy8gRHVtYiBhY3Rpb24gYnV0dG9uIHdpdGggc3RhbmRhcmRpemVkIHN0eWxpbmcuXHJcbmNvbnN0IEFjdGlvbkJ1dHRvbiA9ICh7XHJcbiAgbGFiZWwsXHJcbiAgZGlzYWJsZWQgPSBmYWxzZSxcclxuICBvbkNsaWNrLFxyXG4gIGNsYXNzTmFtZSxcclxuICBhcmlhTGFiZWwsXHJcbiAgdHlwZSA9IFwiYnV0dG9uXCJcclxufTogUHJvcHMpID0+IHtcclxuICByZXR1cm4gKFxyXG4gICAgPGJ1dHRvblxyXG4gICAgICB0eXBlPXt0eXBlfVxyXG4gICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXCJpbmQtYWN0aW9uLWJ0blwiLCBjbGFzc05hbWUpfVxyXG4gICAgICBvbkNsaWNrPXtvbkNsaWNrfVxyXG4gICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XHJcbiAgICAgIGFyaWEtbGFiZWw9e2FyaWFMYWJlbCB8fCBsYWJlbH1cclxuICAgID5cclxuICAgICAge2xhYmVsfVxyXG4gICAgPC9idXR0b24+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFjdGlvbkJ1dHRvbjtcclxuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgY2xhc3NOYW1lcyB9IGZyb20gXCIuLi8uLi91dGlscy9jbGFzc05hbWVzLnRzXCI7XHJcblxyXG50eXBlIFByb3BzID0ge1xyXG4gIGxhYmVsOiBzdHJpbmc7XHJcbiAgYWN0aXZlPzogYm9vbGVhbjtcclxuICBkaXNhYmxlZD86IGJvb2xlYW47XHJcbiAgb25DbGljaz86ICgpID0+IHZvaWQ7XHJcbiAgY2xhc3NOYW1lPzogc3RyaW5nO1xyXG4gIGFyaWFMYWJlbD86IHN0cmluZztcclxuICB0eXBlPzogXCJidXR0b25cIiB8IFwic3VibWl0XCIgfCBcInJlc2V0XCI7XHJcbn07XHJcblxyXG4vLyBEdW1iIGZpbHRlciBidXR0b24gd2l0aCBzdGFuZGFyZGl6ZWQgc3R5bGluZy5cclxuY29uc3QgRmlsdGVyQnV0dG9uID0gKHtcclxuICBsYWJlbCxcclxuICBhY3RpdmUgPSBmYWxzZSxcclxuICBkaXNhYmxlZCA9IGZhbHNlLFxyXG4gIG9uQ2xpY2ssXHJcbiAgY2xhc3NOYW1lLFxyXG4gIGFyaWFMYWJlbCxcclxuICB0eXBlID0gXCJidXR0b25cIlxyXG59OiBQcm9wcykgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8YnV0dG9uXHJcbiAgICAgIHR5cGU9e3R5cGV9XHJcbiAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcImluZC1maWx0ZXItYnRuXCIsIGFjdGl2ZSA/IFwiaW5kLWZpbHRlci1idG4tLWFjdGl2ZVwiIDogXCJcIiwgY2xhc3NOYW1lKX1cclxuICAgICAgb25DbGljaz17b25DbGlja31cclxuICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxyXG4gICAgICBhcmlhLWxhYmVsPXthcmlhTGFiZWwgfHwgbGFiZWx9XHJcbiAgICA+XHJcbiAgICAgIHtsYWJlbH1cclxuICAgIDwvYnV0dG9uPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBGaWx0ZXJCdXR0b247XHJcbiIsICJcdUZFRkZpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IGNsYXNzTmFtZXMgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvY2xhc3NOYW1lcy50c1wiO1xyXG5cclxuZXhwb3J0IHR5cGUgSGlzdG9yeU1hbnVhbERheUNlbGwgPSB7XHJcbiAga2V5OiBzdHJpbmc7XHJcbiAgaXNFbXB0eTogYm9vbGVhbjtcclxuICBkYXRlPzogRGF0ZTtcclxuICBpc28/OiBzdHJpbmc7XHJcbiAgZGF5TGFiZWw/OiBudW1iZXI7XHJcbiAgZGF5Q2xhc3M/OiBzdHJpbmc7XHJcbiAgZGlzYWJsZWQ/OiBib29sZWFuO1xyXG59O1xyXG5cclxudHlwZSBIaXN0b3J5TWFudWFsRGF0ZVBpY2tlclByb3BzID0ge1xyXG4gIGFjdGl2YXRvclJlZjogUmVhY3QuUmVmT2JqZWN0PEhUTUxEaXZFbGVtZW50IHwgbnVsbD47XHJcbiAgcG9wb3ZlclJlZjogUmVhY3QuUmVmT2JqZWN0PEhUTUxEaXZFbGVtZW50IHwgbnVsbD47XHJcbiAgc2hvd01hbnVhbEVycm9yOiBib29sZWFuO1xyXG4gIHNob3dTdGFydEVycm9yOiBib29sZWFuO1xyXG4gIHNob3dFbmRFcnJvcjogYm9vbGVhbjtcclxuICBmaWx0ZXJUaXRsZTogc3RyaW5nO1xyXG4gIGlzT3BlbjogYm9vbGVhbjtcclxuICBzZWxlY3RpbmdTdGVwOiBcInN0YXJ0XCIgfCBcImVuZFwiIHwgXCJkb25lXCI7XHJcbiAgbGFiZWxGcm9tOiBzdHJpbmc7XHJcbiAgbGFiZWxUbzogc3RyaW5nO1xyXG4gIHN0YXJ0RGF0ZVRleHQ6IHN0cmluZztcclxuICBlbmREYXRlVGV4dDogc3RyaW5nO1xyXG4gIGNsZWFyUmFuZ2VMYWJlbDogc3RyaW5nO1xyXG4gIGhhc1NlbGVjdGVkUmFuZ2U6IGJvb2xlYW47XHJcbiAgbW9udGhMYWJlbDogc3RyaW5nO1xyXG4gIHdlZWtEYXlMYWJlbHM6IHN0cmluZ1tdO1xyXG4gIHN0YXR1c1RleHQ6IHN0cmluZztcclxuICBkYXlDZWxsczogSGlzdG9yeU1hbnVhbERheUNlbGxbXTtcclxuICBwcmV2TW9udGhMYWJlbDogc3RyaW5nO1xyXG4gIG5leHRNb250aExhYmVsOiBzdHJpbmc7XHJcbiAgb25PcGVuUG9wb3ZlcjogKHNlY3Rpb246IFwic3RhcnRcIiB8IFwiZW5kXCIpID0+IHZvaWQ7XHJcbiAgb25BY3RpdmF0b3JLZXlEb3duOiAoZXZlbnQ6IFJlYWN0LktleWJvYXJkRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB2b2lkO1xyXG4gIG9uU2VjdGlvbktleURvd246IChldmVudDogUmVhY3QuS2V5Ym9hcmRFdmVudDxIVE1MRGl2RWxlbWVudD4sIHNlY3Rpb246IFwic3RhcnRcIiB8IFwiZW5kXCIpID0+IHZvaWQ7XHJcbiAgb25DbGVhcjogKGV2ZW50OiBSZWFjdC5Nb3VzZUV2ZW50KSA9PiB2b2lkO1xyXG4gIG9uUHJldk1vbnRoOiAoZXZlbnQ6IFJlYWN0Lk1vdXNlRXZlbnQ8SFRNTEJ1dHRvbkVsZW1lbnQ+KSA9PiB2b2lkO1xyXG4gIG9uTmV4dE1vbnRoOiAoZXZlbnQ6IFJlYWN0Lk1vdXNlRXZlbnQ8SFRNTEJ1dHRvbkVsZW1lbnQ+KSA9PiB2b2lkO1xyXG4gIG9uR3JpZE1vdXNlTGVhdmU6ICgpID0+IHZvaWQ7XHJcbiAgb25EYXlDbGljazogKGRheTogSGlzdG9yeU1hbnVhbERheUNlbGwpID0+IHZvaWQ7XHJcbiAgb25EYXlIb3ZlcjogKGRheTogSGlzdG9yeU1hbnVhbERheUNlbGwpID0+IHZvaWQ7XHJcbn07XHJcblxyXG4vLyBQcmVzZW50YXRpb25hbCBkYXRlIHJhbmdlIHBpY2tlciB1c2VkIGJ5IHRoZSBoaXN0b3J5IHF1aWNrIGZpbHRlci5cclxuY29uc3QgSGlzdG9yeU1hbnVhbERhdGVQaWNrZXIgPSAoe1xyXG4gIGFjdGl2YXRvclJlZixcclxuICBwb3BvdmVyUmVmLFxyXG4gIHNob3dNYW51YWxFcnJvcixcclxuICBzaG93U3RhcnRFcnJvcixcclxuICBzaG93RW5kRXJyb3IsXHJcbiAgZmlsdGVyVGl0bGUsXHJcbiAgaXNPcGVuLFxyXG4gIHNlbGVjdGluZ1N0ZXAsXHJcbiAgbGFiZWxGcm9tLFxyXG4gIGxhYmVsVG8sXHJcbiAgc3RhcnREYXRlVGV4dCxcclxuICBlbmREYXRlVGV4dCxcclxuICBjbGVhclJhbmdlTGFiZWwsXHJcbiAgaGFzU2VsZWN0ZWRSYW5nZSxcclxuICBtb250aExhYmVsLFxyXG4gIHdlZWtEYXlMYWJlbHMsXHJcbiAgc3RhdHVzVGV4dCxcclxuICBkYXlDZWxscyxcclxuICBwcmV2TW9udGhMYWJlbCxcclxuICBuZXh0TW9udGhMYWJlbCxcclxuICBvbk9wZW5Qb3BvdmVyLFxyXG4gIG9uQWN0aXZhdG9yS2V5RG93bixcclxuICBvblNlY3Rpb25LZXlEb3duLFxyXG4gIG9uQ2xlYXIsXHJcbiAgb25QcmV2TW9udGgsXHJcbiAgb25OZXh0TW9udGgsXHJcbiAgb25HcmlkTW91c2VMZWF2ZSxcclxuICBvbkRheUNsaWNrLFxyXG4gIG9uRGF5SG92ZXIsXHJcbn06IEhpc3RvcnlNYW51YWxEYXRlUGlja2VyUHJvcHMpID0+IHtcclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZVwiPlxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgaWQ9XCJkcnBBY3RpdmF0b3JcIlxyXG4gICAgICAgIHJlZj17YWN0aXZhdG9yUmVmfVxyXG4gICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcImRycCB3LWZ1bGxcIiwgc2hvd01hbnVhbEVycm9yID8gXCJkcnAtZXJyb3JcIiA6IFwiXCIpfVxyXG4gICAgICAgIG9uQ2xpY2s9eygpID0+IG9uT3BlblBvcG92ZXIoXCJzdGFydFwiKX1cclxuICAgICAgICByb2xlPVwiYnV0dG9uXCJcclxuICAgICAgICB0YWJJbmRleD17MH1cclxuICAgICAgICBhcmlhLWxhYmVsPXtmaWx0ZXJUaXRsZX1cclxuICAgICAgICBhcmlhLWhhc3BvcHVwPVwiZGlhbG9nXCJcclxuICAgICAgICBhcmlhLWV4cGFuZGVkPXtpc09wZW59XHJcbiAgICAgICAgb25LZXlEb3duPXtvbkFjdGl2YXRvcktleURvd259XHJcbiAgICAgID5cclxuICAgICAgICA8ZGl2XHJcbiAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXHJcbiAgICAgICAgICAgIFwiZHJwLXNlY3Rpb25cIixcclxuICAgICAgICAgICAgc2VsZWN0aW5nU3RlcCA9PT0gXCJzdGFydFwiICYmIGlzT3BlbiA/IFwiYWN0aXZlXCIgOiBcIlwiLFxyXG4gICAgICAgICAgICBzaG93U3RhcnRFcnJvciA/IFwiaXMtZXJyb3JcIiA6IFwiXCJcclxuICAgICAgICAgICl9XHJcbiAgICAgICAgICBkYXRhLXNlY3Rpb249XCJzdGFydFwiXHJcbiAgICAgICAgICBvbkNsaWNrPXsoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIG9uT3BlblBvcG92ZXIoXCJzdGFydFwiKTtcclxuICAgICAgICAgIH19XHJcbiAgICAgICAgICByb2xlPVwiYnV0dG9uXCJcclxuICAgICAgICAgIHRhYkluZGV4PXswfVxyXG4gICAgICAgICAgYXJpYS1sYWJlbD17bGFiZWxGcm9tfVxyXG4gICAgICAgICAgb25LZXlEb3duPXsoZXZlbnQpID0+IG9uU2VjdGlvbktleURvd24oZXZlbnQsIFwic3RhcnRcIil9XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkcnAtbGFiZWxcIj57bGFiZWxGcm9tfTwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkcnAtdmFsdWVcIj5cclxuICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiYmkgYmktY2FsZW5kYXIzIGRycC1pY29uXCIgLz5cclxuICAgICAgICAgICAgPHNwYW4gaWQ9XCJkcnBTdGFydFZhbHVlXCI+e3N0YXJ0RGF0ZVRleHR9PC9zcGFuPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZHJwLXNlcGFyYXRvciBoaWRkZW4gc206ZmxleFwiPlxyXG4gICAgICAgICAgPGkgY2xhc3NOYW1lPVwiYmkgYmktYXJyb3ctcmlnaHRcIiAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZHJwLXNlcGFyYXRvci1tb2JpbGUgZmxleCBzbTpoaWRkZW5cIiAvPlxyXG5cclxuICAgICAgICA8ZGl2XHJcbiAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXHJcbiAgICAgICAgICAgIFwiZHJwLXNlY3Rpb25cIixcclxuICAgICAgICAgICAgc2VsZWN0aW5nU3RlcCA9PT0gXCJlbmRcIiAmJiBpc09wZW4gPyBcImFjdGl2ZVwiIDogXCJcIixcclxuICAgICAgICAgICAgc2hvd0VuZEVycm9yID8gXCJpcy1lcnJvclwiIDogXCJcIlxyXG4gICAgICAgICAgKX1cclxuICAgICAgICAgIGRhdGEtc2VjdGlvbj1cImVuZFwiXHJcbiAgICAgICAgICBvbkNsaWNrPXsoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIG9uT3BlblBvcG92ZXIoXCJlbmRcIik7XHJcbiAgICAgICAgICB9fVxyXG4gICAgICAgICAgcm9sZT1cImJ1dHRvblwiXHJcbiAgICAgICAgICB0YWJJbmRleD17MH1cclxuICAgICAgICAgIGFyaWEtbGFiZWw9e2xhYmVsVG99XHJcbiAgICAgICAgICBvbktleURvd249eyhldmVudCkgPT4gb25TZWN0aW9uS2V5RG93bihldmVudCwgXCJlbmRcIil9XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkcnAtbGFiZWxcIj57bGFiZWxUb308L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZHJwLXZhbHVlXCI+XHJcbiAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImJpIGJpLWNhbGVuZGFyMyBkcnAtaWNvblwiIC8+XHJcbiAgICAgICAgICAgIDxzcGFuIGlkPVwiZHJwRW5kVmFsdWVcIj57ZW5kRGF0ZVRleHR9PC9zcGFuPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIDxidXR0b25cclxuICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgaWQ9XCJkcnBDbGVhclwiXHJcbiAgICAgICAgICBjbGFzc05hbWU9XCJkcnAtY2xlYXJcIlxyXG4gICAgICAgICAgYXJpYS1sYWJlbD17Y2xlYXJSYW5nZUxhYmVsfVxyXG4gICAgICAgICAgc3R5bGU9e3sgZGlzcGxheTogaGFzU2VsZWN0ZWRSYW5nZSA/IFwiaW5saW5lLWZsZXhcIiA6IFwibm9uZVwiIH19XHJcbiAgICAgICAgICBvbkNsaWNrPXtvbkNsZWFyfVxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImJpIGJpLXgtbGdcIiAvPlxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIDxkaXYgaWQ9XCJkcnBQb3BvdmVyXCIgcmVmPXtwb3BvdmVyUmVmfSBjbGFzc05hbWU9XCJkcnAtcG9wb3ZlclwiIGhpZGRlbj17IWlzT3Blbn0+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkcnAtaGVhZFwiPlxyXG4gICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiZHJwLW5hdlwiXHJcbiAgICAgICAgICAgIGRhdGEtZGlyPVwicHJldlwiXHJcbiAgICAgICAgICAgIGFyaWEtbGFiZWw9e3ByZXZNb250aExhYmVsfVxyXG4gICAgICAgICAgICBvbkNsaWNrPXtvblByZXZNb250aH1cclxuICAgICAgICAgID5cclxuICAgICAgICAgICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgY2xhc3NOYW1lPVwiaC00IHctNFwiIGZpbGw9XCJub25lXCIgdmlld0JveD1cIjAgMCAzMCAzMFwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiPlxyXG4gICAgICAgICAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBzdHJva2VXaWR0aD1cIjJcIiBkPVwiTTE1IDE5bC03LTcgNy03XCIgLz5cclxuICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgIDxkaXYgaWQ9XCJkcnBNb250aExhYmVsXCIgY2xhc3NOYW1lPVwiZHJwLW1vbnRoXCI+e21vbnRoTGFiZWx9PC9kaXY+XHJcbiAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJkcnAtbmF2XCJcclxuICAgICAgICAgICAgZGF0YS1kaXI9XCJuZXh0XCJcclxuICAgICAgICAgICAgYXJpYS1sYWJlbD17bmV4dE1vbnRoTGFiZWx9XHJcbiAgICAgICAgICAgIG9uQ2xpY2s9e29uTmV4dE1vbnRofVxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBjbGFzc05hbWU9XCJoLTQgdy00XCIgZmlsbD1cIm5vbmVcIiB2aWV3Qm94PVwiMCAwIDMwIDMwXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCI+XHJcbiAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIHN0cm9rZVdpZHRoPVwiMlwiIGQ9XCJNOSA1bDcgNy03IDdcIiAvPlxyXG4gICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRycC13ZWVrZGF5c1wiPlxyXG4gICAgICAgICAge3dlZWtEYXlMYWJlbHMubWFwKChsYWJlbCwgaW5kZXgpID0+IChcclxuICAgICAgICAgICAgPHNwYW4ga2V5PXtgJHtsYWJlbH0tJHtpbmRleH1gfT57bGFiZWx9PC9zcGFuPlxyXG4gICAgICAgICAgKSl9XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIDxkaXYgaWQ9XCJkcnBHcmlkXCIgY2xhc3NOYW1lPVwiZHJwLWdyaWRcIiBvbk1vdXNlTGVhdmU9e29uR3JpZE1vdXNlTGVhdmV9PlxyXG4gICAgICAgICAge2RheUNlbGxzLm1hcCgoY2VsbCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY2VsbC5pc0VtcHR5KSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIDxidXR0b24ga2V5PXtjZWxsLmtleX0gY2xhc3NOYW1lPVwiZHJwLWRheSBlbXB0eVwiIGRpc2FibGVkIC8+O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgIGtleT17Y2VsbC5rZXl9XHJcbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2VsbC5kYXlDbGFzc31cclxuICAgICAgICAgICAgICAgIGRhdGEtZGF0ZT17Y2VsbC5pc299XHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlZD17Y2VsbC5kaXNhYmxlZH1cclxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG9uRGF5Q2xpY2soY2VsbCl9XHJcbiAgICAgICAgICAgICAgICBvbk1vdXNlRW50ZXI9eygpID0+IG9uRGF5SG92ZXIoY2VsbCl9XHJcbiAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAge2NlbGwuZGF5TGFiZWx9XHJcbiAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9KX1cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgPGRpdiBpZD1cImRycFN0YXR1c1wiIGNsYXNzTmFtZT1cImRycC1zdGF0dXNcIj5cclxuICAgICAgICAgIHtzdGF0dXNUZXh0fVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBIaXN0b3J5TWFudWFsRGF0ZVBpY2tlcjtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7QUErQkk7QUFkSixJQUFNLGlCQUFpQixDQUFDO0FBQUEsRUFDdEI7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBLFlBQVk7QUFBQSxFQUNaLGNBQWM7QUFBQSxFQUNkLGNBQWM7QUFBQSxFQUNkLGFBQWE7QUFBQSxFQUNiLGFBQWE7QUFBQSxFQUNiLGFBQWE7QUFBQSxFQUNiLFlBQVk7QUFDZCxNQUFhO0FBQ1gsU0FDRSw0RUFDRTtBQUFBLGlEQUFDLFNBQUksV0FBVyw4RUFBOEUsU0FBUyxHQUFHLEtBQUssR0FDN0c7QUFBQSxtREFBQyxVQUFLLFdBQVUsaUJBQWlCO0FBQUE7QUFBQSxRQUFpQjtBQUFBLFNBQUM7QUFBQSxNQUNuRCw0Q0FBQyxVQUFNLHFCQUFVO0FBQUEsTUFDakIsNkNBQUMsVUFBSyxXQUFVLGlCQUFpQjtBQUFBO0FBQUEsUUFBZTtBQUFBLFNBQUM7QUFBQSxNQUNqRCw0Q0FBQyxVQUFNLG1CQUFRO0FBQUEsT0FDakI7QUFBQSxJQUNDLGNBQWMsY0FDYiw2Q0FBQyxTQUFJLFdBQVUseUVBQ2I7QUFBQSxtREFBQyxVQUFLLFdBQVUsMEJBQTBCO0FBQUE7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U0FBSSxJQUFHLGNBQWEsS0FBSyxZQUFZLFdBQVUsZUFBYyxRQUFRLENBQUMsUUFDckU7QUFBQSxvREFBQyxTQUFJLFdBQVUsWUFDYjtBQUFBO0FBQUEsVUFBQztBQUFBO0FBQUEsWUFDQyxNQUFLO0FBQUEsWUFDTCxXQUFVO0FBQUEsWUFDVixZQUFTO0FBQUEsWUFDVCxjQUFZO0FBQUEsWUFDWixTQUFTO0FBQUEsWUFFVCx1REFBQyxTQUFJLE9BQU0sOEJBQTZCLFdBQVUsV0FBVSxNQUFLLFFBQU8sU0FBUSxhQUFZLFFBQU8sZ0JBQ2pHLHVEQUFDLFVBQUssZUFBYyxTQUFRLGdCQUFlLFNBQVEsYUFBWSxLQUFJLEdBQUUsbUJBQWtCLEdBQ3pGO0FBQUE7QUFBQSxRQUNGO0FBQUEsUUFDQSw2Q0FBQyxTQUFJLElBQUcsaUJBQWdCLFdBQVUsYUFBYSxzQkFBVztBQUFBLFFBQzFEO0FBQUEsVUFBQztBQUFBO0FBQUEsWUFDQyxNQUFLO0FBQUEsWUFDTCxXQUFVO0FBQUEsWUFDVixZQUFTO0FBQUEsWUFDVCxjQUFZO0FBQUEsWUFDWixTQUFTO0FBQUEsWUFFVCx1REFBQyxTQUFJLE9BQU0sOEJBQTZCLFdBQVUsV0FBVSxNQUFLLFFBQU8sU0FBUSxhQUFZLFFBQU8sZ0JBQ2pHLHVEQUFDLFVBQUssZUFBYyxTQUFRLGdCQUFlLFNBQVEsYUFBWSxLQUFJLEdBQUUsZ0JBQWUsR0FDdEY7QUFBQTtBQUFBLFFBQ0Y7QUFBQSxTQUNGO0FBQUEsTUFFQSw2Q0FBQyxTQUFJLFdBQVUsZ0JBQ1osd0JBQWMsSUFBSSxDQUFDLE9BQU8sVUFDekIsNkNBQUMsVUFBZ0MsbUJBQXRCLEdBQUcsS0FBSyxJQUFJLEtBQUssRUFBVyxDQUN4QyxHQUNIO0FBQUEsTUFFQSw2Q0FBQyxTQUFJLElBQUcsV0FBVSxXQUFVLFlBQVcsY0FBYyxrQkFDbEQsbUJBQVMsSUFBSSxDQUFDLFNBQVM7QUFDdEIsWUFBSSxLQUFLLFNBQVM7QUFDaEIsaUJBQU8sNkNBQUMsWUFBc0IsV0FBVSxpQkFBZ0IsVUFBUSxRQUE1QyxLQUFLLEdBQXdDO0FBQUEsUUFDbkU7QUFFQSxlQUNFO0FBQUEsVUFBQztBQUFBO0FBQUEsWUFFQyxNQUFLO0FBQUEsWUFDTCxXQUFXLEtBQUs7QUFBQSxZQUNoQixhQUFXLEtBQUs7QUFBQSxZQUNoQixVQUFVLEtBQUs7QUFBQSxZQUNmLFNBQVMsTUFBTSxXQUFXLElBQUk7QUFBQSxZQUM5QixjQUFjLE1BQU0sV0FBVyxJQUFJO0FBQUEsWUFFbEMsZUFBSztBQUFBO0FBQUEsVUFSRCxLQUFLO0FBQUEsUUFTWjtBQUFBLE1BRUosQ0FBQyxHQUNIO0FBQUEsTUFFQSw2Q0FBQyxTQUFJLElBQUcsYUFBWSxXQUFVLGNBQzNCLHNCQUNIO0FBQUEsT0FDRjtBQUFBLEtBQ0Y7QUFFSjtBQUVBLElBQU8sa0NBQVE7IiwKICAibmFtZXMiOiBbImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X2pzeF9ydW50aW1lIl0KfQo=
