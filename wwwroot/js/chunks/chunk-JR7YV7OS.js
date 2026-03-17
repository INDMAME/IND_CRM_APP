import {
  ChevronDownSvg,
  ChevronUpSvg,
  FloatingList_default,
  useOutsideClick
} from "./chunk-AXUPQW6N.js";
import {
  classNames,
  indT
} from "./chunk-BYICIYT4.js";
import {
  require_jsx_runtime,
  require_react
} from "./chunk-BWM3JLWG.js";
import {
  __toESM
} from "./chunk-45FWCHS2.js";

// Web/wwwroot/react/src/components/commons/SelectCombobox.tsx
var import_react = __toESM(require_react());
var import_jsx_runtime = __toESM(require_jsx_runtime());
var EMPTY_OPTION = { value: "", text: "" };
var normalizeLookupText = (value) => {
  return String(value ?? "").trim().toLowerCase();
};
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
  panelClassName,
  showSearchButton = false,
  allowTextInput = true,
  showLabel = true,
  selectedTextMode = "text",
  dropdownExpandPx = 0,
  dropdownMinWidthPx = 0,
  dropdownMaxHeightClass = "max-h-72",
  selectedIconClassName = "h-4 w-4",
  optionIconClassName = "h-4 w-4",
  allowOptionHorizontalScroll = false,
  lockDropdownWidthOnFirstOpen = false,
  disableDefaultOptionPadding = false,
  optionLeftPaddingClassName = "",
  optionTextClassName = "",
  optionDefaultClassName = "text-slate-900",
  optionActiveClassName = "bg-primary text-white",
  optionSelectedClassName = "bg-primary text-white",
  selectedInputPaddingClassName = "pl-9",
  panelStyle,
  clearOnEmptyInput = false
}) => {
  const readOnlyMode = readOnly || disabled;
  const valueColor = readOnlyMode ? "#64748b" : "#00296be0";
  const data = (0, import_react.useMemo)(() => {
    return (options || []).map((o) => {
      if (Array.isArray(o)) {
        return { value: o[0] ?? "", text: o[1] ?? "" };
      }
      return {
        value: o?.value ?? o?.Value ?? "",
        text: o?.text ?? o?.Text ?? "",
        icon: o?.icon ?? o?.Icon
      };
    });
  }, [options]);
  const [query, setQuery] = (0, import_react.useState)(null);
  const [selected, setSelected] = (0, import_react.useState)(
    data.find((d) => String(d.value) === String(value)) || EMPTY_OPTION
  );
  const [open, setOpen] = (0, import_react.useState)(false);
  const [activeIndex, setActiveIndex] = (0, import_react.useState)(0);
  const [showNotFoundState, setShowNotFoundState] = (0, import_react.useState)(false);
  const containerRef = (0, import_react.useRef)(null);
  const boxRef = (0, import_react.useRef)(null);
  const listRef = (0, import_react.useRef)(null);
  const initialDropdownWidthRef = (0, import_react.useRef)(null);
  const clearManualValue = (nextOpen, showNotFound) => {
    setSelected(EMPTY_OPTION);
    setQuery("");
    setActiveIndex(0);
    setShowNotFoundState(showNotFound);
    setOpen(nextOpen);
    if (!emitOnValueChange) {
      onChange("");
    }
  };
  useOutsideClick([containerRef, listRef], () => {
    if (query !== null) {
      clearManualValue(false, false);
      return;
    }
    setShowNotFoundState(false);
    setOpen(false);
  });
  (0, import_react.useEffect)(() => {
    const nextSelected = data.find((d) => String(d.value) === String(value)) || EMPTY_OPTION;
    setSelected(nextSelected);
    if (String(value ?? "").trim()) {
      setQuery(null);
      setShowNotFoundState(false);
    }
  }, [value, data]);
  (0, import_react.useEffect)(() => {
    if (!emitOnValueChange) return;
    onChange(selected?.value ? String(selected.value) : "");
  }, [emitOnValueChange, onChange, selected]);
  const filtered = (0, import_react.useMemo)(() => {
    if (!query || !query.trim()) return data;
    const normalizedQuery = normalizeLookupText(query);
    return data.filter((option) => {
      const optionValue = normalizeLookupText(option.value);
      const optionText = normalizeLookupText(option.text);
      return optionText.includes(normalizedQuery) || optionValue.includes(normalizedQuery);
    });
  }, [data, query]);
  const resolvedActiveIndex = filtered.length > 0 ? Math.min(Math.max(activeIndex, 0), filtered.length - 1) : 0;
  const selectOption = (opt) => {
    setSelected(opt);
    setQuery(null);
    setShowNotFoundState(false);
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
      if (clearOnEmptyInput && query !== null && !query.trim()) {
        setShowNotFoundState(false);
        setOpen(false);
        return;
      }
      if (open && filtered.length) {
        selectOption(filtered[resolvedActiveIndex] ?? filtered[0]);
      } else if (query !== null && query.trim()) {
        clearManualValue(true, true);
      } else {
        setShowNotFoundState(false);
        setOpen(true);
      }
    }
    if (ev.key === "Escape") {
      if (query !== null) {
        clearManualValue(false, false);
        return;
      }
      setShowNotFoundState(false);
      setOpen(false);
    }
  };
  const safeId = String(idBase || label || "select");
  const listId = `select-options-${safeId}`;
  const activeId = open && filtered[resolvedActiveIndex] ? `select-opt-${safeId}-${filtered[resolvedActiveIndex].value}` : void 0;
  const listOpen = open && !disabled;
  const selectedValue = String(selected?.value ?? "").trim();
  const selectedDisplayText = selectedTextMode === "value" ? selectedValue : selected?.text || "";
  const displayValue = query !== null ? query : selectedValue ? selectedDisplayText : "";
  const showSelectedIcon = query === null && !!selectedValue && !!selected?.icon;
  const showNotFoundRow = showNotFoundState || !!query && !!query.trim() && filtered.length === 0;
  const normalizedDropdownExpandPx = Number.isFinite(dropdownExpandPx) ? Math.max(0, dropdownExpandPx) : 0;
  const normalizedDropdownMinWidthPx = Number.isFinite(dropdownMinWidthPx) ? Math.max(0, dropdownMinWidthPx) : 0;
  (0, import_react.useEffect)(() => {
    if (!lockDropdownWidthOnFirstOpen) return;
    if (!listOpen) return;
    if (initialDropdownWidthRef.current !== null) return;
    const width = boxRef.current?.getBoundingClientRect().width;
    if (!Number.isFinite(width) || !width || width <= 0) return;
    initialDropdownWidthRef.current = width;
  }, [listOpen, lockDropdownWidthOnFirstOpen]);
  const measuredAnchorWidth = boxRef.current?.getBoundingClientRect().width;
  const normalizedMeasuredAnchorWidth = Number.isFinite(measuredAnchorWidth) && measuredAnchorWidth && measuredAnchorWidth > 0 ? measuredAnchorWidth : null;
  const fixedDropdownBaseWidth = lockDropdownWidthOnFirstOpen ? initialDropdownWidthRef.current ?? normalizedMeasuredAnchorWidth : normalizedMeasuredAnchorWidth;
  const fixedDropdownExpandedWidth = fixedDropdownBaseWidth !== null && Number.isFinite(fixedDropdownBaseWidth) ? fixedDropdownBaseWidth + normalizedDropdownExpandPx : null;
  const resolvedDropdownWidthPx = fixedDropdownExpandedWidth !== null ? Math.max(fixedDropdownExpandedWidth, normalizedDropdownMinWidthPx || 0) : null;
  const inlineDropdownStyle = resolvedDropdownWidthPx !== null && resolvedDropdownWidthPx > 0 ? {
    width: `${resolvedDropdownWidthPx}px`,
    ...normalizedDropdownMinWidthPx > 0 ? { minWidth: `${normalizedDropdownMinWidthPx}px` } : {}
  } : normalizedDropdownExpandPx > 0 ? {
    width: `calc(100% + ${normalizedDropdownExpandPx}px)`,
    ...normalizedDropdownMinWidthPx > 0 ? { minWidth: `${normalizedDropdownMinWidthPx}px` } : {}
  } : normalizedDropdownMinWidthPx > 0 ? { minWidth: `${normalizedDropdownMinWidthPx}px` } : void 0;
  const listBody = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { id: listId, ref: listRef, role: "listbox", "aria-label": label, children: [
    showNotFoundRow ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "px-4 py-2 text-sm text-slate-500", children: indT("Common_NotFound", "Not found") }) : null,
    filtered.map((opt, idx) => {
      const sel = selected?.value === opt.value;
      const isActive = idx === resolvedActiveIndex;
      const optionStateClassName = sel ? optionSelectedClassName : isActive ? optionActiveClassName : optionDefaultClassName;
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        "button",
        {
          type: "button",
          id: `select-opt-${safeId}-${opt.value}`,
          role: "option",
          "aria-selected": sel,
          className: classNames(
            "relative flex w-full cursor-default select-none items-center py-2 pr-3 text-left text-sm",
            optionLeftPaddingClassName,
            disableDefaultOptionPadding ? "" : "type-option",
            optionStateClassName
          ),
          style: allowOptionHorizontalScroll ? { overflowX: "auto", overflowY: "hidden", WebkitOverflowScrolling: "touch" } : void 0,
          onMouseEnter: () => setActiveIndex(idx),
          onClick: () => selectOption(opt),
          children: [
            sel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "span",
              {
                className: classNames(
                  "absolute inset-y-0 left-0 flex items-center pl-2",
                  isActive ? "text-white" : "text-primary"
                )
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
              "span",
              {
                className: classNames(
                  allowOptionHorizontalScroll ? "inline-flex items-center gap-2" : "flex min-w-0 items-center gap-2",
                  sel ? "font-medium" : "font-normal"
                ),
                style: allowOptionHorizontalScroll ? { minWidth: "max-content" } : void 0,
                children: [
                  opt.icon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                    "span",
                    {
                      className: classNames(
                        "inline-flex shrink-0 items-center justify-center",
                        optionIconClassName,
                        isActive ? "text-white" : "text-slate-500"
                      ),
                      children: opt.icon
                    }
                  ) : null,
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                    "span",
                    {
                      className: classNames(allowOptionHorizontalScroll ? "block" : "block truncate", optionTextClassName),
                      style: allowOptionHorizontalScroll ? { whiteSpace: "nowrap" } : void 0,
                      children: opt.text
                    }
                  )
                ]
              }
            )
          ]
        },
        String(opt.value)
      );
    })
  ] });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      className: classNames("space-y-2", disabled ? "pointer-events-none select-none" : ""),
      ref: containerRef,
      children: [
        showLabel ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: classNames("form-label font-semibold", invalid ? "text-rose-700" : ""), children: label }) : null,
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "relative", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
            "div",
            {
              ref: boxRef,
              className: classNames(
                "relative w-full cursor-default rounded-xl bg-white text-left focus-within:border-primary focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-white sm:text-sm",
                readOnlyMode ? "ind-readonly-field" : ""
              ),
              style: readOnlyMode ? { color: valueColor } : void 0,
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "input",
                  {
                    className: classNames(
                      "w-full rounded-xl border py-2 text-sm sm:text-base leading-5 focus:outline-hidden focus:ring-2 disabled:bg-slate-100 disabled:text-slate-500 disabled:border-slate-200 disabled:cursor-not-allowed",
                      showSelectedIcon ? selectedInputPaddingClassName : "pl-3",
                      showSearchButton ? "pr-20" : "pr-10",
                      invalid ? "border-rose-400 bg-rose-50 focus:ring-rose-200 focus:border-rose-400" : "border-slate-200 focus:ring-primary focus:border-primary",
                      readOnlyMode ? "ind-readonly-field" : "text-slate-900"
                    ),
                    style: readOnlyMode ? { color: valueColor } : void 0,
                    value: displayValue,
                    disabled,
                    onChange: (event) => {
                      if (!allowTextInput) return;
                      const val = event.target.value;
                      setActiveIndex(0);
                      setShowNotFoundState(false);
                      setQuery(val);
                      if (clearOnEmptyInput && !val.trim()) {
                        clearManualValue(false, false);
                        return;
                      }
                      setOpen(true);
                    },
                    onKeyDown: handleKeyDown,
                    onFocus: () => {
                      if (!disabled) setOpen(true);
                    },
                    placeholder,
                    readOnly: readOnlyMode || !allowTextInput,
                    "aria-label": label,
                    role: "combobox",
                    "aria-expanded": listOpen,
                    "aria-controls": listId,
                    "aria-activedescendant": activeId
                  }
                ),
                showSelectedIcon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: classNames("inline-flex items-center justify-center", selectedIconClassName), children: selected.icon }) }) : null,
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "absolute inset-y-0 right-0 flex items-center gap-1 pr-2", children: [
                  showSearchButton ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                    "button",
                    {
                      type: "button",
                      className: "flex items-center p-1.5 text-slate-400 hover:text-slate-500",
                      onClick: () => {
                        if (disabled) return;
                        if (query !== null && query.trim() && filtered.length === 0) {
                          clearManualValue(true, true);
                          return;
                        }
                        setOpen(true);
                      },
                      "aria-label": indT("Common_Search", "Search"),
                      disabled,
                      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: "h-5 w-5", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" }) })
                    }
                  ) : null,
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                    "button",
                    {
                      type: "button",
                      className: "flex items-center p-1.5 text-slate-500 hover:text-slate-600",
                      onClick: () => {
                        if (disabled) return;
                        if (open && query !== null && query.trim()) {
                          clearManualValue(false, false);
                          return;
                        }
                        setOpen((prev) => !prev);
                      },
                      "aria-label": open ? indT("Dropdown_HideOptions", "Hide options") : indT("Dropdown_ShowOptions", "Show options"),
                      disabled,
                      children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUpSvg, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDownSvg, { className: "h-5 w-5" })
                    }
                  )
                ] })
              ]
            }
          ),
          usePortal ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            FloatingList_default,
            {
              anchorRef: boxRef,
              open: listOpen,
              zIndex: 36e4,
              fixedWidthPx: resolvedDropdownWidthPx ?? void 0,
              panelStyle,
              maxHeightClass: dropdownMaxHeightClass,
              role: "listbox",
              roundedClass: "rounded-xl",
              portalClassName,
              panelClassName,
              children: listBody
            }
          ) : listOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "div",
            {
              className: `absolute z-360000 mt-1 w-full rounded-xl bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden ${dropdownMaxHeightClass} overflow-auto ${panelClassName || ""}`,
              style: { ...inlineDropdownStyle, ...panelStyle || {} },
              children: listBody
            }
          )
        ] })
      ]
    }
  );
};
var SelectCombobox_default = SelectCombobox;

export {
  SelectCombobox_default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9TZWxlY3RDb21ib2JveC50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBGbG9hdGluZ0xpc3QgZnJvbSBcIi4vRmxvYXRpbmdMaXN0LnRzeFwiO1xuaW1wb3J0IHsgQ2hldnJvbkRvd25TdmcsIENoZXZyb25VcFN2ZyB9IGZyb20gXCIuL2NoZXZyb25zLnRzeFwiO1xuaW1wb3J0IHsgdXNlT3V0c2lkZUNsaWNrIH0gZnJvbSBcIi4uLy4uL2hvb2tzL3VzZU91dHNpZGVDbGljay50c1wiO1xuaW1wb3J0IHsgY2xhc3NOYW1lcyB9IGZyb20gXCIuLi8uLi91dGlscy9jbGFzc05hbWVzLnRzXCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcblxudHlwZSBSYXdPcHRpb24gPVxuICB8IHtcbiAgICAgIHZhbHVlPzogc3RyaW5nIHwgbnVtYmVyO1xuICAgICAgVmFsdWU/OiBzdHJpbmcgfCBudW1iZXI7XG4gICAgICB0ZXh0Pzogc3RyaW5nO1xuICAgICAgVGV4dD86IHN0cmluZztcbiAgICAgIGljb24/OiBSZWFjdC5SZWFjdE5vZGU7XG4gICAgICBJY29uPzogUmVhY3QuUmVhY3ROb2RlO1xuICAgIH1cbiAgfCBbc3RyaW5nIHwgbnVtYmVyLCBzdHJpbmddO1xuXG50eXBlIE5vcm1hbGl6ZWRPcHRpb24gPSB7XG4gIHZhbHVlOiBzdHJpbmcgfCBudW1iZXI7XG4gIHRleHQ6IHN0cmluZztcbiAgaWNvbj86IFJlYWN0LlJlYWN0Tm9kZTtcbn07XG5cbmNvbnN0IEVNUFRZX09QVElPTjogTm9ybWFsaXplZE9wdGlvbiA9IHsgdmFsdWU6IFwiXCIsIHRleHQ6IFwiXCIgfTtcblxuY29uc3Qgbm9ybWFsaXplTG9va3VwVGV4dCA9ICh2YWx1ZTogc3RyaW5nIHwgbnVtYmVyIHwgbnVsbCB8IHVuZGVmaW5lZCk6IHN0cmluZyA9PiB7XG4gIHJldHVybiBTdHJpbmcodmFsdWUgPz8gXCJcIikudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG59O1xuXG50eXBlIFNlbGVjdENvbWJvYm94UHJvcHMgPSB7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIG9wdGlvbnM6IFJhd09wdGlvbltdO1xuICB2YWx1ZTogc3RyaW5nIHwgbnVtYmVyO1xuICBvbkNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHBsYWNlaG9sZGVyPzogc3RyaW5nO1xuICBpbnZhbGlkPzogYm9vbGVhbjtcbiAgZGlzYWJsZWQ/OiBib29sZWFuO1xuICByZWFkT25seT86IGJvb2xlYW47XG4gIHVzZVBvcnRhbD86IGJvb2xlYW47XG4gIGVtaXRPblZhbHVlQ2hhbmdlPzogYm9vbGVhbjtcbiAgaWRCYXNlPzogc3RyaW5nO1xuICBwb3J0YWxDbGFzc05hbWU/OiBzdHJpbmc7XG4gIHBhbmVsQ2xhc3NOYW1lPzogc3RyaW5nO1xuICBzaG93U2VhcmNoQnV0dG9uPzogYm9vbGVhbjtcbiAgYWxsb3dUZXh0SW5wdXQ/OiBib29sZWFuO1xuICBzaG93TGFiZWw/OiBib29sZWFuO1xuICBzZWxlY3RlZFRleHRNb2RlPzogXCJ0ZXh0XCIgfCBcInZhbHVlXCI7XG4gIGRyb3Bkb3duRXhwYW5kUHg/OiBudW1iZXI7XG4gIGRyb3Bkb3duTWluV2lkdGhQeD86IG51bWJlcjtcbiAgZHJvcGRvd25NYXhIZWlnaHRDbGFzcz86IHN0cmluZztcbiAgc2VsZWN0ZWRJY29uQ2xhc3NOYW1lPzogc3RyaW5nO1xuICBvcHRpb25JY29uQ2xhc3NOYW1lPzogc3RyaW5nO1xuICBhbGxvd09wdGlvbkhvcml6b250YWxTY3JvbGw/OiBib29sZWFuO1xuICBsb2NrRHJvcGRvd25XaWR0aE9uRmlyc3RPcGVuPzogYm9vbGVhbjtcbiAgZGlzYWJsZURlZmF1bHRPcHRpb25QYWRkaW5nPzogYm9vbGVhbjtcbiAgb3B0aW9uTGVmdFBhZGRpbmdDbGFzc05hbWU/OiBzdHJpbmc7XG4gIG9wdGlvblRleHRDbGFzc05hbWU/OiBzdHJpbmc7XG4gIG9wdGlvbkRlZmF1bHRDbGFzc05hbWU/OiBzdHJpbmc7XG4gIG9wdGlvbkFjdGl2ZUNsYXNzTmFtZT86IHN0cmluZztcbiAgb3B0aW9uU2VsZWN0ZWRDbGFzc05hbWU/OiBzdHJpbmc7XG4gIHNlbGVjdGVkSW5wdXRQYWRkaW5nQ2xhc3NOYW1lPzogc3RyaW5nO1xuICBwYW5lbFN0eWxlPzogUmVhY3QuQ1NTUHJvcGVydGllcztcbiAgY2xlYXJPbkVtcHR5SW5wdXQ/OiBib29sZWFuO1xufTtcblxuLy8gUmV1c2FibGUgc2VsZWN0IGNvbWJvYm94IHdpdGggb3B0aW9uYWwgcG9ydGFsIHJlbmRlcmluZyBmb3IgdGhlIGxpc3QuXG5jb25zdCBTZWxlY3RDb21ib2JveCA9ICh7XG4gIGxhYmVsLFxuICBvcHRpb25zLFxuICB2YWx1ZSxcbiAgb25DaGFuZ2UsXG4gIHBsYWNlaG9sZGVyLFxuICBpbnZhbGlkID0gZmFsc2UsXG4gIGRpc2FibGVkID0gZmFsc2UsXG4gIHJlYWRPbmx5ID0gZmFsc2UsXG4gIHVzZVBvcnRhbCA9IHRydWUsXG4gIGVtaXRPblZhbHVlQ2hhbmdlID0gZmFsc2UsXG4gIGlkQmFzZSxcbiAgcG9ydGFsQ2xhc3NOYW1lLFxuICBwYW5lbENsYXNzTmFtZSxcbiAgc2hvd1NlYXJjaEJ1dHRvbiA9IGZhbHNlLFxuICBhbGxvd1RleHRJbnB1dCA9IHRydWUsXG4gIHNob3dMYWJlbCA9IHRydWUsXG4gIHNlbGVjdGVkVGV4dE1vZGUgPSBcInRleHRcIixcbiAgZHJvcGRvd25FeHBhbmRQeCA9IDAsXG4gIGRyb3Bkb3duTWluV2lkdGhQeCA9IDAsXG4gIGRyb3Bkb3duTWF4SGVpZ2h0Q2xhc3MgPSBcIm1heC1oLTcyXCIsXG4gIHNlbGVjdGVkSWNvbkNsYXNzTmFtZSA9IFwiaC00IHctNFwiLFxuICBvcHRpb25JY29uQ2xhc3NOYW1lID0gXCJoLTQgdy00XCIsXG4gIGFsbG93T3B0aW9uSG9yaXpvbnRhbFNjcm9sbCA9IGZhbHNlLFxuICBsb2NrRHJvcGRvd25XaWR0aE9uRmlyc3RPcGVuID0gZmFsc2UsXG4gIGRpc2FibGVEZWZhdWx0T3B0aW9uUGFkZGluZyA9IGZhbHNlLFxuICBvcHRpb25MZWZ0UGFkZGluZ0NsYXNzTmFtZSA9IFwiXCIsXG4gIG9wdGlvblRleHRDbGFzc05hbWUgPSBcIlwiLFxuICBvcHRpb25EZWZhdWx0Q2xhc3NOYW1lID0gXCJ0ZXh0LXNsYXRlLTkwMFwiLFxuICBvcHRpb25BY3RpdmVDbGFzc05hbWUgPSBcImJnLXByaW1hcnkgdGV4dC13aGl0ZVwiLFxuICBvcHRpb25TZWxlY3RlZENsYXNzTmFtZSA9IFwiYmctcHJpbWFyeSB0ZXh0LXdoaXRlXCIsXG4gIHNlbGVjdGVkSW5wdXRQYWRkaW5nQ2xhc3NOYW1lID0gXCJwbC05XCIsXG4gIHBhbmVsU3R5bGUsXG4gIGNsZWFyT25FbXB0eUlucHV0ID0gZmFsc2UsXG59OiBTZWxlY3RDb21ib2JveFByb3BzKSA9PiB7XG4gIGNvbnN0IHJlYWRPbmx5TW9kZSA9IHJlYWRPbmx5IHx8IGRpc2FibGVkO1xuICBjb25zdCB2YWx1ZUNvbG9yID0gcmVhZE9ubHlNb2RlID8gXCIjNjQ3NDhiXCIgOiBcIiMwMDI5NmJlMFwiO1xuICBjb25zdCBkYXRhID0gdXNlTWVtbygoKSA9PiB7XG4gICAgcmV0dXJuIChvcHRpb25zIHx8IFtdKS5tYXA8Tm9ybWFsaXplZE9wdGlvbj4oKG8pID0+IHtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KG8pKSB7XG4gICAgICAgIHJldHVybiB7IHZhbHVlOiBvWzBdID8/IFwiXCIsIHRleHQ6IG9bMV0gPz8gXCJcIiB9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdmFsdWU6IG8/LnZhbHVlID8/IG8/LlZhbHVlID8/IFwiXCIsXG4gICAgICAgIHRleHQ6IG8/LnRleHQgPz8gbz8uVGV4dCA/PyBcIlwiLFxuICAgICAgICBpY29uOiBvPy5pY29uID8/IG8/Lkljb24sXG4gICAgICB9O1xuICAgIH0pO1xuICB9LCBbb3B0aW9uc10pO1xuXG4gIGNvbnN0IFtxdWVyeSwgc2V0UXVlcnldID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtzZWxlY3RlZCwgc2V0U2VsZWN0ZWRdID0gdXNlU3RhdGUoXG4gICAgZGF0YS5maW5kKChkKSA9PiBTdHJpbmcoZC52YWx1ZSkgPT09IFN0cmluZyh2YWx1ZSkpIHx8IEVNUFRZX09QVElPTlxuICApO1xuICBjb25zdCBbb3Blbiwgc2V0T3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFthY3RpdmVJbmRleCwgc2V0QWN0aXZlSW5kZXhdID0gdXNlU3RhdGUoMCk7XG4gIGNvbnN0IFtzaG93Tm90Rm91bmRTdGF0ZSwgc2V0U2hvd05vdEZvdW5kU3RhdGVdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBjb250YWluZXJSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgYm94UmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IGxpc3RSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgaW5pdGlhbERyb3Bkb3duV2lkdGhSZWYgPSB1c2VSZWY8bnVtYmVyIHwgbnVsbD4obnVsbCk7XG5cbiAgY29uc3QgY2xlYXJNYW51YWxWYWx1ZSA9IChuZXh0T3BlbjogYm9vbGVhbiwgc2hvd05vdEZvdW5kOiBib29sZWFuKSA9PiB7XG4gICAgc2V0U2VsZWN0ZWQoRU1QVFlfT1BUSU9OKTtcbiAgICBzZXRRdWVyeShcIlwiKTtcbiAgICBzZXRBY3RpdmVJbmRleCgwKTtcbiAgICBzZXRTaG93Tm90Rm91bmRTdGF0ZShzaG93Tm90Rm91bmQpO1xuICAgIHNldE9wZW4obmV4dE9wZW4pO1xuICAgIGlmICghZW1pdE9uVmFsdWVDaGFuZ2UpIHtcbiAgICAgIG9uQ2hhbmdlKFwiXCIpO1xuICAgIH1cbiAgfTtcblxuICB1c2VPdXRzaWRlQ2xpY2soW2NvbnRhaW5lclJlZiwgbGlzdFJlZl0sICgpID0+IHtcbiAgICBpZiAocXVlcnkgIT09IG51bGwpIHtcbiAgICAgIGNsZWFyTWFudWFsVmFsdWUoZmFsc2UsIGZhbHNlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzZXRTaG93Tm90Rm91bmRTdGF0ZShmYWxzZSk7XG4gICAgc2V0T3BlbihmYWxzZSk7XG4gIH0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgbmV4dFNlbGVjdGVkID0gZGF0YS5maW5kKChkKSA9PiBTdHJpbmcoZC52YWx1ZSkgPT09IFN0cmluZyh2YWx1ZSkpIHx8IEVNUFRZX09QVElPTjtcbiAgICBzZXRTZWxlY3RlZChuZXh0U2VsZWN0ZWQpO1xuXG4gICAgaWYgKFN0cmluZyh2YWx1ZSA/PyBcIlwiKS50cmltKCkpIHtcbiAgICAgIHNldFF1ZXJ5KG51bGwpO1xuICAgICAgc2V0U2hvd05vdEZvdW5kU3RhdGUoZmFsc2UpO1xuICAgIH1cbiAgfSwgW3ZhbHVlLCBkYXRhXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWVtaXRPblZhbHVlQ2hhbmdlKSByZXR1cm47XG4gICAgb25DaGFuZ2Uoc2VsZWN0ZWQ/LnZhbHVlID8gU3RyaW5nKHNlbGVjdGVkLnZhbHVlKSA6IFwiXCIpO1xuICB9LCBbZW1pdE9uVmFsdWVDaGFuZ2UsIG9uQ2hhbmdlLCBzZWxlY3RlZF0pO1xuXG4gIGNvbnN0IGZpbHRlcmVkID0gdXNlTWVtbygoKSA9PiB7XG4gICAgaWYgKCFxdWVyeSB8fCAhcXVlcnkudHJpbSgpKSByZXR1cm4gZGF0YTtcbiAgICBjb25zdCBub3JtYWxpemVkUXVlcnkgPSBub3JtYWxpemVMb29rdXBUZXh0KHF1ZXJ5KTtcbiAgICByZXR1cm4gZGF0YS5maWx0ZXIoKG9wdGlvbikgPT4ge1xuICAgICAgY29uc3Qgb3B0aW9uVmFsdWUgPSBub3JtYWxpemVMb29rdXBUZXh0KG9wdGlvbi52YWx1ZSk7XG4gICAgICBjb25zdCBvcHRpb25UZXh0ID0gbm9ybWFsaXplTG9va3VwVGV4dChvcHRpb24udGV4dCk7XG4gICAgICByZXR1cm4gb3B0aW9uVGV4dC5pbmNsdWRlcyhub3JtYWxpemVkUXVlcnkpIHx8IG9wdGlvblZhbHVlLmluY2x1ZGVzKG5vcm1hbGl6ZWRRdWVyeSk7XG4gICAgfSk7XG4gIH0sIFtkYXRhLCBxdWVyeV0pO1xuICBjb25zdCByZXNvbHZlZEFjdGl2ZUluZGV4ID1cbiAgICBmaWx0ZXJlZC5sZW5ndGggPiAwID8gTWF0aC5taW4oTWF0aC5tYXgoYWN0aXZlSW5kZXgsIDApLCBmaWx0ZXJlZC5sZW5ndGggLSAxKSA6IDA7XG5cbiAgY29uc3Qgc2VsZWN0T3B0aW9uID0gKG9wdDogTm9ybWFsaXplZE9wdGlvbikgPT4ge1xuICAgIHNldFNlbGVjdGVkKG9wdCk7XG4gICAgc2V0UXVlcnkobnVsbCk7XG4gICAgc2V0U2hvd05vdEZvdW5kU3RhdGUoZmFsc2UpO1xuICAgIHNldE9wZW4oZmFsc2UpO1xuICAgIGlmICghZW1pdE9uVmFsdWVDaGFuZ2UpIHtcbiAgICAgIG9uQ2hhbmdlKG9wdD8udmFsdWUgPyBTdHJpbmcob3B0LnZhbHVlKSA6IFwiXCIpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVLZXlEb3duID0gKGV2OiBSZWFjdC5LZXlib2FyZEV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+KSA9PiB7XG4gICAgaWYgKGRpc2FibGVkKSByZXR1cm47XG4gICAgaWYgKGV2LmtleSA9PT0gXCJBcnJvd0Rvd25cIikge1xuICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHNldE9wZW4odHJ1ZSk7XG4gICAgICBpZiAoZmlsdGVyZWQubGVuZ3RoKSBzZXRBY3RpdmVJbmRleCgoaWR4KSA9PiAoaWR4ICsgMSkgJSBmaWx0ZXJlZC5sZW5ndGgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoZXYua2V5ID09PSBcIkFycm93VXBcIikge1xuICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHNldE9wZW4odHJ1ZSk7XG4gICAgICBpZiAoZmlsdGVyZWQubGVuZ3RoKSBzZXRBY3RpdmVJbmRleCgoaWR4KSA9PiAoaWR4IC0gMSArIGZpbHRlcmVkLmxlbmd0aCkgJSBmaWx0ZXJlZC5sZW5ndGgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoZXYua2V5ID09PSBcIkVudGVyXCIpIHtcbiAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBpZiAoY2xlYXJPbkVtcHR5SW5wdXQgJiYgcXVlcnkgIT09IG51bGwgJiYgIXF1ZXJ5LnRyaW0oKSkge1xuICAgICAgICBzZXRTaG93Tm90Rm91bmRTdGF0ZShmYWxzZSk7XG4gICAgICAgIHNldE9wZW4oZmFsc2UpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAob3BlbiAmJiBmaWx0ZXJlZC5sZW5ndGgpIHtcbiAgICAgICAgc2VsZWN0T3B0aW9uKGZpbHRlcmVkW3Jlc29sdmVkQWN0aXZlSW5kZXhdID8/IGZpbHRlcmVkWzBdKTtcbiAgICAgIH0gZWxzZSBpZiAocXVlcnkgIT09IG51bGwgJiYgcXVlcnkudHJpbSgpKSB7XG4gICAgICAgIGNsZWFyTWFudWFsVmFsdWUodHJ1ZSwgdHJ1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZXRTaG93Tm90Rm91bmRTdGF0ZShmYWxzZSk7XG4gICAgICAgIHNldE9wZW4odHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChldi5rZXkgPT09IFwiRXNjYXBlXCIpIHtcbiAgICAgIGlmIChxdWVyeSAhPT0gbnVsbCkge1xuICAgICAgICBjbGVhck1hbnVhbFZhbHVlKGZhbHNlLCBmYWxzZSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgc2V0U2hvd05vdEZvdW5kU3RhdGUoZmFsc2UpO1xuICAgICAgc2V0T3BlbihmYWxzZSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHNhZmVJZCA9IFN0cmluZyhpZEJhc2UgfHwgbGFiZWwgfHwgXCJzZWxlY3RcIik7XG4gIGNvbnN0IGxpc3RJZCA9IGBzZWxlY3Qtb3B0aW9ucy0ke3NhZmVJZH1gO1xuICBjb25zdCBhY3RpdmVJZCA9XG4gICAgb3BlbiAmJiBmaWx0ZXJlZFtyZXNvbHZlZEFjdGl2ZUluZGV4XSA/IGBzZWxlY3Qtb3B0LSR7c2FmZUlkfS0ke2ZpbHRlcmVkW3Jlc29sdmVkQWN0aXZlSW5kZXhdLnZhbHVlfWAgOiB1bmRlZmluZWQ7XG4gIGNvbnN0IGxpc3RPcGVuID0gb3BlbiAmJiAhZGlzYWJsZWQ7XG4gIGNvbnN0IHNlbGVjdGVkVmFsdWUgPSBTdHJpbmcoc2VsZWN0ZWQ/LnZhbHVlID8/IFwiXCIpLnRyaW0oKTtcbiAgY29uc3Qgc2VsZWN0ZWREaXNwbGF5VGV4dCA9IHNlbGVjdGVkVGV4dE1vZGUgPT09IFwidmFsdWVcIiA/IHNlbGVjdGVkVmFsdWUgOiBzZWxlY3RlZD8udGV4dCB8fCBcIlwiO1xuICBjb25zdCBkaXNwbGF5VmFsdWUgPSBxdWVyeSAhPT0gbnVsbCA/IHF1ZXJ5IDogKHNlbGVjdGVkVmFsdWUgPyBzZWxlY3RlZERpc3BsYXlUZXh0IDogXCJcIik7XG4gIGNvbnN0IHNob3dTZWxlY3RlZEljb24gPSBxdWVyeSA9PT0gbnVsbCAmJiAhIXNlbGVjdGVkVmFsdWUgJiYgISFzZWxlY3RlZD8uaWNvbjtcbiAgY29uc3Qgc2hvd05vdEZvdW5kUm93ID0gc2hvd05vdEZvdW5kU3RhdGUgfHwgKCEhcXVlcnkgJiYgISFxdWVyeS50cmltKCkgJiYgZmlsdGVyZWQubGVuZ3RoID09PSAwKTtcbiAgY29uc3Qgbm9ybWFsaXplZERyb3Bkb3duRXhwYW5kUHggPSBOdW1iZXIuaXNGaW5pdGUoZHJvcGRvd25FeHBhbmRQeCkgPyBNYXRoLm1heCgwLCBkcm9wZG93bkV4cGFuZFB4KSA6IDA7XG4gIGNvbnN0IG5vcm1hbGl6ZWREcm9wZG93bk1pbldpZHRoUHggPSBOdW1iZXIuaXNGaW5pdGUoZHJvcGRvd25NaW5XaWR0aFB4KSA/IE1hdGgubWF4KDAsIGRyb3Bkb3duTWluV2lkdGhQeCkgOiAwO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFsb2NrRHJvcGRvd25XaWR0aE9uRmlyc3RPcGVuKSByZXR1cm47XG4gICAgaWYgKCFsaXN0T3BlbikgcmV0dXJuO1xuICAgIGlmIChpbml0aWFsRHJvcGRvd25XaWR0aFJlZi5jdXJyZW50ICE9PSBudWxsKSByZXR1cm47XG5cbiAgICBjb25zdCB3aWR0aCA9IGJveFJlZi5jdXJyZW50Py5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcbiAgICBpZiAoIU51bWJlci5pc0Zpbml0ZSh3aWR0aCkgfHwgIXdpZHRoIHx8IHdpZHRoIDw9IDApIHJldHVybjtcbiAgICBpbml0aWFsRHJvcGRvd25XaWR0aFJlZi5jdXJyZW50ID0gd2lkdGg7XG4gIH0sIFtsaXN0T3BlbiwgbG9ja0Ryb3Bkb3duV2lkdGhPbkZpcnN0T3Blbl0pO1xuXG4gIGNvbnN0IG1lYXN1cmVkQW5jaG9yV2lkdGggPSBib3hSZWYuY3VycmVudD8uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4gIGNvbnN0IG5vcm1hbGl6ZWRNZWFzdXJlZEFuY2hvcldpZHRoID1cbiAgICBOdW1iZXIuaXNGaW5pdGUobWVhc3VyZWRBbmNob3JXaWR0aCkgJiYgbWVhc3VyZWRBbmNob3JXaWR0aCAmJiBtZWFzdXJlZEFuY2hvcldpZHRoID4gMCA/IG1lYXN1cmVkQW5jaG9yV2lkdGggOiBudWxsO1xuICBjb25zdCBmaXhlZERyb3Bkb3duQmFzZVdpZHRoID0gbG9ja0Ryb3Bkb3duV2lkdGhPbkZpcnN0T3BlblxuICAgID8gaW5pdGlhbERyb3Bkb3duV2lkdGhSZWYuY3VycmVudCA/PyBub3JtYWxpemVkTWVhc3VyZWRBbmNob3JXaWR0aFxuICAgIDogbm9ybWFsaXplZE1lYXN1cmVkQW5jaG9yV2lkdGg7XG4gIGNvbnN0IGZpeGVkRHJvcGRvd25FeHBhbmRlZFdpZHRoID1cbiAgICBmaXhlZERyb3Bkb3duQmFzZVdpZHRoICE9PSBudWxsICYmIE51bWJlci5pc0Zpbml0ZShmaXhlZERyb3Bkb3duQmFzZVdpZHRoKVxuICAgICAgPyBmaXhlZERyb3Bkb3duQmFzZVdpZHRoICsgbm9ybWFsaXplZERyb3Bkb3duRXhwYW5kUHhcbiAgICAgIDogbnVsbDtcbiAgY29uc3QgcmVzb2x2ZWREcm9wZG93bldpZHRoUHggPVxuICAgIGZpeGVkRHJvcGRvd25FeHBhbmRlZFdpZHRoICE9PSBudWxsXG4gICAgICA/IE1hdGgubWF4KGZpeGVkRHJvcGRvd25FeHBhbmRlZFdpZHRoLCBub3JtYWxpemVkRHJvcGRvd25NaW5XaWR0aFB4IHx8IDApXG4gICAgICA6IG51bGw7XG4gIGNvbnN0IGlubGluZURyb3Bkb3duU3R5bGU6IFJlYWN0LkNTU1Byb3BlcnRpZXMgfCB1bmRlZmluZWQgPVxuICAgIHJlc29sdmVkRHJvcGRvd25XaWR0aFB4ICE9PSBudWxsICYmIHJlc29sdmVkRHJvcGRvd25XaWR0aFB4ID4gMFxuICAgICAgPyB7XG4gICAgICAgICAgd2lkdGg6IGAke3Jlc29sdmVkRHJvcGRvd25XaWR0aFB4fXB4YCxcbiAgICAgICAgICAuLi4obm9ybWFsaXplZERyb3Bkb3duTWluV2lkdGhQeCA+IDAgPyB7IG1pbldpZHRoOiBgJHtub3JtYWxpemVkRHJvcGRvd25NaW5XaWR0aFB4fXB4YCB9IDoge30pLFxuICAgICAgICB9XG4gICAgICA6IG5vcm1hbGl6ZWREcm9wZG93bkV4cGFuZFB4ID4gMFxuICAgICAgICA/IHtcbiAgICAgICAgICAgIHdpZHRoOiBgY2FsYygxMDAlICsgJHtub3JtYWxpemVkRHJvcGRvd25FeHBhbmRQeH1weClgLFxuICAgICAgICAgICAgLi4uKG5vcm1hbGl6ZWREcm9wZG93bk1pbldpZHRoUHggPiAwID8geyBtaW5XaWR0aDogYCR7bm9ybWFsaXplZERyb3Bkb3duTWluV2lkdGhQeH1weGAgfSA6IHt9KSxcbiAgICAgICAgICB9XG4gICAgICAgIDogbm9ybWFsaXplZERyb3Bkb3duTWluV2lkdGhQeCA+IDBcbiAgICAgICAgICA/IHsgbWluV2lkdGg6IGAke25vcm1hbGl6ZWREcm9wZG93bk1pbldpZHRoUHh9cHhgIH1cbiAgICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgY29uc3QgbGlzdEJvZHkgPSAoXG4gICAgPGRpdiBpZD17bGlzdElkfSByZWY9e2xpc3RSZWZ9IHJvbGU9XCJsaXN0Ym94XCIgYXJpYS1sYWJlbD17bGFiZWx9PlxuICAgICAge3Nob3dOb3RGb3VuZFJvdyA/IDxkaXYgY2xhc3NOYW1lPVwicHgtNCBweS0yIHRleHQtc20gdGV4dC1zbGF0ZS01MDBcIj57aW5kVChcIkNvbW1vbl9Ob3RGb3VuZFwiLCBcIk5vdCBmb3VuZFwiKX08L2Rpdj4gOiBudWxsfVxuICAgICAge2ZpbHRlcmVkLm1hcCgob3B0LCBpZHgpID0+IHtcbiAgICAgICAgY29uc3Qgc2VsID0gc2VsZWN0ZWQ/LnZhbHVlID09PSBvcHQudmFsdWU7XG4gICAgICAgIGNvbnN0IGlzQWN0aXZlID0gaWR4ID09PSByZXNvbHZlZEFjdGl2ZUluZGV4O1xuICAgICAgICBjb25zdCBvcHRpb25TdGF0ZUNsYXNzTmFtZSA9IHNlbCA/IG9wdGlvblNlbGVjdGVkQ2xhc3NOYW1lIDogaXNBY3RpdmUgPyBvcHRpb25BY3RpdmVDbGFzc05hbWUgOiBvcHRpb25EZWZhdWx0Q2xhc3NOYW1lO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAga2V5PXtTdHJpbmcob3B0LnZhbHVlKX1cbiAgICAgICAgICAgIGlkPXtgc2VsZWN0LW9wdC0ke3NhZmVJZH0tJHtvcHQudmFsdWV9YH1cbiAgICAgICAgICAgIHJvbGU9XCJvcHRpb25cIlxuICAgICAgICAgICAgYXJpYS1zZWxlY3RlZD17c2VsfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAgICAgICBcInJlbGF0aXZlIGZsZXggdy1mdWxsIGN1cnNvci1kZWZhdWx0IHNlbGVjdC1ub25lIGl0ZW1zLWNlbnRlciBweS0yIHByLTMgdGV4dC1sZWZ0IHRleHQtc21cIixcbiAgICAgICAgICAgICAgb3B0aW9uTGVmdFBhZGRpbmdDbGFzc05hbWUsXG4gICAgICAgICAgICAgIGRpc2FibGVEZWZhdWx0T3B0aW9uUGFkZGluZyA/IFwiXCIgOiBcInR5cGUtb3B0aW9uXCIsXG4gICAgICAgICAgICAgIG9wdGlvblN0YXRlQ2xhc3NOYW1lXG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgc3R5bGU9e1xuICAgICAgICAgICAgICBhbGxvd09wdGlvbkhvcml6b250YWxTY3JvbGxcbiAgICAgICAgICAgICAgICA/IHsgb3ZlcmZsb3dYOiBcImF1dG9cIiwgb3ZlcmZsb3dZOiBcImhpZGRlblwiLCBXZWJraXRPdmVyZmxvd1Njcm9sbGluZzogXCJ0b3VjaFwiIH1cbiAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb25Nb3VzZUVudGVyPXsoKSA9PiBzZXRBY3RpdmVJbmRleChpZHgpfVxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2VsZWN0T3B0aW9uKG9wdCl9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge3NlbCAmJiAoXG4gICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAgICAgICAgICAgXCJhYnNvbHV0ZSBpbnNldC15LTAgbGVmdC0wIGZsZXggaXRlbXMtY2VudGVyIHBsLTJcIixcbiAgICAgICAgICAgICAgICAgIGlzQWN0aXZlID8gXCJ0ZXh0LXdoaXRlXCIgOiBcInRleHQtcHJpbWFyeVwiXG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPjwvc3Bhbj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICAgICAgYWxsb3dPcHRpb25Ib3Jpem9udGFsU2Nyb2xsID8gXCJpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIiA6IFwiZmxleCBtaW4tdy0wIGl0ZW1zLWNlbnRlciBnYXAtMlwiLFxuICAgICAgICAgICAgICAgIHNlbCA/IFwiZm9udC1tZWRpdW1cIiA6IFwiZm9udC1ub3JtYWxcIlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICBzdHlsZT17YWxsb3dPcHRpb25Ib3Jpem9udGFsU2Nyb2xsID8geyBtaW5XaWR0aDogXCJtYXgtY29udGVudFwiIH0gOiB1bmRlZmluZWR9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHtvcHQuaWNvbiA/IChcbiAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAgICAgICAgICAgICBcImlubGluZS1mbGV4IHNocmluay0wIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlclwiLFxuICAgICAgICAgICAgICAgICAgICBvcHRpb25JY29uQ2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICBpc0FjdGl2ZSA/IFwidGV4dC13aGl0ZVwiIDogXCJ0ZXh0LXNsYXRlLTUwMFwiXG4gICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIHtvcHQuaWNvbn1cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhhbGxvd09wdGlvbkhvcml6b250YWxTY3JvbGwgPyBcImJsb2NrXCIgOiBcImJsb2NrIHRydW5jYXRlXCIsIG9wdGlvblRleHRDbGFzc05hbWUpfVxuICAgICAgICAgICAgICAgIHN0eWxlPXthbGxvd09wdGlvbkhvcml6b250YWxTY3JvbGwgPyB7IHdoaXRlU3BhY2U6IFwibm93cmFwXCIgfSA6IHVuZGVmaW5lZH1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHtvcHQudGV4dH1cbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICApO1xuICAgICAgfSl9XG4gICAgPC9kaXY+XG4gICk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXCJzcGFjZS15LTJcIiwgZGlzYWJsZWQgPyBcInBvaW50ZXItZXZlbnRzLW5vbmUgc2VsZWN0LW5vbmVcIiA6IFwiXCIpfVxuICAgICAgcmVmPXtjb250YWluZXJSZWZ9XG4gICAgPlxuICAgICAge3Nob3dMYWJlbCA/IDxsYWJlbCBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXCJmb3JtLWxhYmVsIGZvbnQtc2VtaWJvbGRcIiwgaW52YWxpZCA/IFwidGV4dC1yb3NlLTcwMFwiIDogXCJcIil9PntsYWJlbH08L2xhYmVsPiA6IG51bGx9XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlXCI+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICByZWY9e2JveFJlZn1cbiAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICBcInJlbGF0aXZlIHctZnVsbCBjdXJzb3ItZGVmYXVsdCByb3VuZGVkLXhsIGJnLXdoaXRlIHRleHQtbGVmdCBmb2N1cy13aXRoaW46Ym9yZGVyLXByaW1hcnkgZm9jdXMtd2l0aGluOnJpbmctMiBmb2N1cy13aXRoaW46cmluZy1wcmltYXJ5IGZvY3VzLXdpdGhpbjpyaW5nLW9mZnNldC13aGl0ZSBzbTp0ZXh0LXNtXCIsXG4gICAgICAgICAgICByZWFkT25seU1vZGUgPyBcImluZC1yZWFkb25seS1maWVsZFwiIDogXCJcIlxuICAgICAgICAgICl9XG4gICAgICAgICAgc3R5bGU9e3JlYWRPbmx5TW9kZSA/IHsgY29sb3I6IHZhbHVlQ29sb3IgfSA6IHVuZGVmaW5lZH1cbiAgICAgICAgPlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAgICAgICBcInctZnVsbCByb3VuZGVkLXhsIGJvcmRlciBweS0yIHRleHQtc20gc206dGV4dC1iYXNlIGxlYWRpbmctNSBmb2N1czpvdXRsaW5lLWhpZGRlbiBmb2N1czpyaW5nLTIgZGlzYWJsZWQ6Ymctc2xhdGUtMTAwIGRpc2FibGVkOnRleHQtc2xhdGUtNTAwIGRpc2FibGVkOmJvcmRlci1zbGF0ZS0yMDAgZGlzYWJsZWQ6Y3Vyc29yLW5vdC1hbGxvd2VkXCIsXG4gICAgICAgICAgICAgIHNob3dTZWxlY3RlZEljb24gPyBzZWxlY3RlZElucHV0UGFkZGluZ0NsYXNzTmFtZSA6IFwicGwtM1wiLFxuICAgICAgICAgICAgICBzaG93U2VhcmNoQnV0dG9uID8gXCJwci0yMFwiIDogXCJwci0xMFwiLFxuICAgICAgICAgICAgICBpbnZhbGlkXG4gICAgICAgICAgICAgICAgPyBcImJvcmRlci1yb3NlLTQwMCBiZy1yb3NlLTUwIGZvY3VzOnJpbmctcm9zZS0yMDAgZm9jdXM6Ym9yZGVyLXJvc2UtNDAwXCJcbiAgICAgICAgICAgICAgICA6IFwiYm9yZGVyLXNsYXRlLTIwMCBmb2N1czpyaW5nLXByaW1hcnkgZm9jdXM6Ym9yZGVyLXByaW1hcnlcIixcbiAgICAgICAgICAgICAgcmVhZE9ubHlNb2RlID8gXCJpbmQtcmVhZG9ubHktZmllbGRcIiA6IFwidGV4dC1zbGF0ZS05MDBcIlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIHN0eWxlPXtyZWFkT25seU1vZGUgPyB7IGNvbG9yOiB2YWx1ZUNvbG9yIH0gOiB1bmRlZmluZWR9XG4gICAgICAgICAgICB2YWx1ZT17ZGlzcGxheVZhbHVlfVxuICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoIWFsbG93VGV4dElucHV0KSByZXR1cm47XG4gICAgICAgICAgICAgIGNvbnN0IHZhbCA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICAgICAgICAgICAgc2V0QWN0aXZlSW5kZXgoMCk7XG4gICAgICAgICAgICAgIHNldFNob3dOb3RGb3VuZFN0YXRlKGZhbHNlKTtcbiAgICAgICAgICAgICAgc2V0UXVlcnkodmFsKTtcbiAgICAgICAgICAgICAgaWYgKGNsZWFyT25FbXB0eUlucHV0ICYmICF2YWwudHJpbSgpKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJNYW51YWxWYWx1ZShmYWxzZSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBzZXRPcGVuKHRydWUpO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIG9uS2V5RG93bj17aGFuZGxlS2V5RG93bn1cbiAgICAgICAgICAgIG9uRm9jdXM9eygpID0+IHtcbiAgICAgICAgICAgICAgaWYgKCFkaXNhYmxlZCkgc2V0T3Blbih0cnVlKTtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XG4gICAgICAgICAgICByZWFkT25seT17cmVhZE9ubHlNb2RlIHx8ICFhbGxvd1RleHRJbnB1dH1cbiAgICAgICAgICAgIGFyaWEtbGFiZWw9e2xhYmVsfVxuICAgICAgICAgICAgcm9sZT1cImNvbWJvYm94XCJcbiAgICAgICAgICAgIGFyaWEtZXhwYW5kZWQ9e2xpc3RPcGVufVxuICAgICAgICAgICAgYXJpYS1jb250cm9scz17bGlzdElkfVxuICAgICAgICAgICAgYXJpYS1hY3RpdmVkZXNjZW5kYW50PXthY3RpdmVJZH1cbiAgICAgICAgICAvPlxuICAgICAgICAgIHtzaG93U2VsZWN0ZWRJY29uID8gKFxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicG9pbnRlci1ldmVudHMtbm9uZSBhYnNvbHV0ZSBpbnNldC15LTAgbGVmdC0wIGZsZXggaXRlbXMtY2VudGVyIHBsLTMgdGV4dC1zbGF0ZS01MDBcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtjbGFzc05hbWVzKFwiaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyXCIsIHNlbGVjdGVkSWNvbkNsYXNzTmFtZSl9PntzZWxlY3RlZC5pY29ufTwvc3Bhbj5cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LXktMCByaWdodC0wIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHByLTJcIj5cbiAgICAgICAgICAgIHtzaG93U2VhcmNoQnV0dG9uID8gKFxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgcC0xLjUgdGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC1zbGF0ZS01MDBcIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgIGlmIChkaXNhYmxlZCkgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgaWYgKHF1ZXJ5ICE9PSBudWxsICYmIHF1ZXJ5LnRyaW0oKSAmJiBmaWx0ZXJlZC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJNYW51YWxWYWx1ZSh0cnVlLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgc2V0T3Blbih0cnVlKTtcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2luZFQoXCJDb21tb25fU2VhcmNoXCIsIFwiU2VhcmNoXCIpfVxuICAgICAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGZpbGw9XCJub25lXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIHN0cm9rZVdpZHRoPXsxLjV9IHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIGNsYXNzTmFtZT1cImgtNSB3LTVcIj5cbiAgICAgICAgICAgICAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwibTE1Ljc1IDE1Ljc1LTIuNDg5LTIuNDg5bTAgMGEzLjM3NSAzLjM3NSAwIDEgMC00Ljc3My00Ljc3MyAzLjM3NSAzLjM3NSAwIDAgMCA0Ljc3NCA0Ljc3NFpNMjEgMTJhOSA5IDAgMSAxLTE4IDAgOSA5IDAgMCAxIDE4IDBaXCIgLz5cbiAgICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHAtMS41IHRleHQtc2xhdGUtNTAwIGhvdmVyOnRleHQtc2xhdGUtNjAwXCJcbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChkaXNhYmxlZCkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGlmIChvcGVuICYmIHF1ZXJ5ICE9PSBudWxsICYmIHF1ZXJ5LnRyaW0oKSkge1xuICAgICAgICAgICAgICAgICAgY2xlYXJNYW51YWxWYWx1ZShmYWxzZSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzZXRPcGVuKChwcmV2KSA9PiAhcHJldik7XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgIGFyaWEtbGFiZWw9e29wZW4gPyBpbmRUKFwiRHJvcGRvd25fSGlkZU9wdGlvbnNcIiwgXCJIaWRlIG9wdGlvbnNcIikgOiBpbmRUKFwiRHJvcGRvd25fU2hvd09wdGlvbnNcIiwgXCJTaG93IG9wdGlvbnNcIil9XG4gICAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge29wZW4gPyA8Q2hldnJvblVwU3ZnIGNsYXNzTmFtZT1cImgtNSB3LTVcIiAvPiA6IDxDaGV2cm9uRG93blN2ZyBjbGFzc05hbWU9XCJoLTUgdy01XCIgLz59XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHt1c2VQb3J0YWwgPyAoXG4gICAgICAgICAgPEZsb2F0aW5nTGlzdFxuICAgICAgICAgICAgYW5jaG9yUmVmPXtib3hSZWZ9XG4gICAgICAgICAgICBvcGVuPXtsaXN0T3Blbn1cbiAgICAgICAgICAgIHpJbmRleD17MzYwMDAwfVxuICAgICAgICAgICAgZml4ZWRXaWR0aFB4PXtyZXNvbHZlZERyb3Bkb3duV2lkdGhQeCA/PyB1bmRlZmluZWR9XG4gICAgICAgICAgICBwYW5lbFN0eWxlPXtwYW5lbFN0eWxlfVxuICAgICAgICAgICAgbWF4SGVpZ2h0Q2xhc3M9e2Ryb3Bkb3duTWF4SGVpZ2h0Q2xhc3N9XG4gICAgICAgICAgICByb2xlPVwibGlzdGJveFwiXG4gICAgICAgICAgICByb3VuZGVkQ2xhc3M9XCJyb3VuZGVkLXhsXCJcbiAgICAgICAgICAgIHBvcnRhbENsYXNzTmFtZT17cG9ydGFsQ2xhc3NOYW1lfVxuICAgICAgICAgICAgcGFuZWxDbGFzc05hbWU9e3BhbmVsQ2xhc3NOYW1lfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtsaXN0Qm9keX1cbiAgICAgICAgICA8L0Zsb2F0aW5nTGlzdD5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICBsaXN0T3BlbiAmJiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YGFic29sdXRlIHotMzYwMDAwIG10LTEgdy1mdWxsIHJvdW5kZWQteGwgYmctd2hpdGUgc2hhZG93LWxnIHJpbmctMSByaW5nLWJsYWNrLzUgZm9jdXM6b3V0bGluZS1oaWRkZW4gJHtkcm9wZG93bk1heEhlaWdodENsYXNzfSBvdmVyZmxvdy1hdXRvICR7cGFuZWxDbGFzc05hbWUgfHwgXCJcIn1gfVxuICAgICAgICAgICAgICBzdHlsZT17eyAuLi5pbmxpbmVEcm9wZG93blN0eWxlLCAuLi4ocGFuZWxTdHlsZSB8fCB7fSkgfX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge2xpc3RCb2R5fVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKVxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBTZWxlY3RDb21ib2JveDtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtQkFBNEQ7QUEwUm5DO0FBbFF6QixJQUFNLGVBQWlDLEVBQUUsT0FBTyxJQUFJLE1BQU0sR0FBRztBQUU3RCxJQUFNLHNCQUFzQixDQUFDLFVBQXNEO0FBQ2pGLFNBQU8sT0FBTyxTQUFTLEVBQUUsRUFBRSxLQUFLLEVBQUUsWUFBWTtBQUNoRDtBQXVDQSxJQUFNLGlCQUFpQixDQUFDO0FBQUEsRUFDdEI7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQSxVQUFVO0FBQUEsRUFDVixXQUFXO0FBQUEsRUFDWCxXQUFXO0FBQUEsRUFDWCxZQUFZO0FBQUEsRUFDWixvQkFBb0I7QUFBQSxFQUNwQjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQSxtQkFBbUI7QUFBQSxFQUNuQixpQkFB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
