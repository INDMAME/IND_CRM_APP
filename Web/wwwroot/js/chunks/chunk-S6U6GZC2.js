import {
  ChevronDownSvg,
  ChevronUpSvg,
  FloatingList_default,
  useOutsideClick
} from "./chunk-OSBLOXTE.js";
import {
  classNames
} from "./chunk-ZHH4AWW7.js";
import {
  require_jsx_runtime,
  require_react
} from "./chunk-2NKOKBT5.js";
import {
  indT
} from "./chunk-5TAE4PEJ.js";
import {
  __toESM
} from "./chunk-W7NC74ZX.js";

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
  inputRef,
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
  const assignInputRef = (node) => {
    if (!inputRef) return;
    if (typeof inputRef === "function") {
      inputRef(node);
      return;
    }
    inputRef.current = node;
  };
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
                "relative w-full cursor-default rounded-[var(--radius-xl)] bg-white text-left focus-within:border-primary focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-white sm:text-sm",
                readOnlyMode ? "ind-readonly-field" : ""
              ),
              style: readOnlyMode ? { color: valueColor } : void 0,
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "input",
                  {
                    ref: assignInputRef,
                    className: classNames(
                      "w-full rounded-[var(--radius-xl)] border py-2 text-sm sm:text-base leading-5 focus:outline-hidden focus:ring-2 disabled:bg-slate-100 disabled:text-slate-500 disabled:border-slate-200 disabled:cursor-not-allowed",
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
              roundedClass: "rounded-[var(--radius-xl)]",
              portalClassName,
              panelClassName,
              children: listBody
            }
          ) : listOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "div",
            {
              className: `absolute z-360000 mt-1 w-full rounded-[var(--radius-xl)] bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden ${dropdownMaxHeightClass} overflow-auto ${panelClassName || ""}`,
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9TZWxlY3RDb21ib2JveC50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IEZsb2F0aW5nTGlzdCBmcm9tIFwiLi9GbG9hdGluZ0xpc3QudHN4XCI7XHJcbmltcG9ydCB7IENoZXZyb25Eb3duU3ZnLCBDaGV2cm9uVXBTdmcgfSBmcm9tIFwiLi9jaGV2cm9ucy50c3hcIjtcclxuaW1wb3J0IHsgdXNlT3V0c2lkZUNsaWNrIH0gZnJvbSBcIi4uLy4uL2hvb2tzL3VzZU91dHNpZGVDbGljay50c1wiO1xyXG5pbXBvcnQgeyBjbGFzc05hbWVzIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2NsYXNzTmFtZXMudHNcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcblxyXG50eXBlIFJhd09wdGlvbiA9XHJcbiAgfCB7XHJcbiAgICAgIHZhbHVlPzogc3RyaW5nIHwgbnVtYmVyO1xyXG4gICAgICBWYWx1ZT86IHN0cmluZyB8IG51bWJlcjtcclxuICAgICAgdGV4dD86IHN0cmluZztcclxuICAgICAgVGV4dD86IHN0cmluZztcclxuICAgICAgaWNvbj86IFJlYWN0LlJlYWN0Tm9kZTtcclxuICAgICAgSWNvbj86IFJlYWN0LlJlYWN0Tm9kZTtcclxuICAgIH1cclxuICB8IFtzdHJpbmcgfCBudW1iZXIsIHN0cmluZ107XHJcblxyXG50eXBlIE5vcm1hbGl6ZWRPcHRpb24gPSB7XHJcbiAgdmFsdWU6IHN0cmluZyB8IG51bWJlcjtcclxuICB0ZXh0OiBzdHJpbmc7XHJcbiAgaWNvbj86IFJlYWN0LlJlYWN0Tm9kZTtcclxufTtcclxuXHJcbmNvbnN0IEVNUFRZX09QVElPTjogTm9ybWFsaXplZE9wdGlvbiA9IHsgdmFsdWU6IFwiXCIsIHRleHQ6IFwiXCIgfTtcclxuXHJcbmNvbnN0IG5vcm1hbGl6ZUxvb2t1cFRleHQgPSAodmFsdWU6IHN0cmluZyB8IG51bWJlciB8IG51bGwgfCB1bmRlZmluZWQpOiBzdHJpbmcgPT4ge1xyXG4gIHJldHVybiBTdHJpbmcodmFsdWUgPz8gXCJcIikudHJpbSgpLnRvTG93ZXJDYXNlKCk7XHJcbn07XHJcblxyXG50eXBlIFNlbGVjdENvbWJvYm94UHJvcHMgPSB7XHJcbiAgbGFiZWw6IHN0cmluZztcclxuICBvcHRpb25zOiBSYXdPcHRpb25bXTtcclxuICB2YWx1ZTogc3RyaW5nIHwgbnVtYmVyO1xyXG4gIG9uQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBpbnB1dFJlZj86IFJlYWN0LlJlZjxIVE1MSW5wdXRFbGVtZW50PjtcclxuICBwbGFjZWhvbGRlcj86IHN0cmluZztcclxuICBpbnZhbGlkPzogYm9vbGVhbjtcclxuICBkaXNhYmxlZD86IGJvb2xlYW47XHJcbiAgcmVhZE9ubHk/OiBib29sZWFuO1xyXG4gIHVzZVBvcnRhbD86IGJvb2xlYW47XHJcbiAgZW1pdE9uVmFsdWVDaGFuZ2U/OiBib29sZWFuO1xyXG4gIGlkQmFzZT86IHN0cmluZztcclxuICBwb3J0YWxDbGFzc05hbWU/OiBzdHJpbmc7XHJcbiAgcGFuZWxDbGFzc05hbWU/OiBzdHJpbmc7XHJcbiAgc2hvd1NlYXJjaEJ1dHRvbj86IGJvb2xlYW47XHJcbiAgYWxsb3dUZXh0SW5wdXQ/OiBib29sZWFuO1xyXG4gIHNob3dMYWJlbD86IGJvb2xlYW47XHJcbiAgc2VsZWN0ZWRUZXh0TW9kZT86IFwidGV4dFwiIHwgXCJ2YWx1ZVwiO1xyXG4gIGRyb3Bkb3duRXhwYW5kUHg/OiBudW1iZXI7XHJcbiAgZHJvcGRvd25NaW5XaWR0aFB4PzogbnVtYmVyO1xyXG4gIGRyb3Bkb3duTWF4SGVpZ2h0Q2xhc3M/OiBzdHJpbmc7XHJcbiAgc2VsZWN0ZWRJY29uQ2xhc3NOYW1lPzogc3RyaW5nO1xyXG4gIG9wdGlvbkljb25DbGFzc05hbWU/OiBzdHJpbmc7XHJcbiAgYWxsb3dPcHRpb25Ib3Jpem9udGFsU2Nyb2xsPzogYm9vbGVhbjtcclxuICBsb2NrRHJvcGRvd25XaWR0aE9uRmlyc3RPcGVuPzogYm9vbGVhbjtcclxuICBkaXNhYmxlRGVmYXVsdE9wdGlvblBhZGRpbmc/OiBib29sZWFuO1xyXG4gIG9wdGlvbkxlZnRQYWRkaW5nQ2xhc3NOYW1lPzogc3RyaW5nO1xyXG4gIG9wdGlvblRleHRDbGFzc05hbWU/OiBzdHJpbmc7XHJcbiAgb3B0aW9uRGVmYXVsdENsYXNzTmFtZT86IHN0cmluZztcclxuICBvcHRpb25BY3RpdmVDbGFzc05hbWU/OiBzdHJpbmc7XHJcbiAgb3B0aW9uU2VsZWN0ZWRDbGFzc05hbWU/OiBzdHJpbmc7XHJcbiAgc2VsZWN0ZWRJbnB1dFBhZGRpbmdDbGFzc05hbWU/OiBzdHJpbmc7XHJcbiAgcGFuZWxTdHlsZT86IFJlYWN0LkNTU1Byb3BlcnRpZXM7XHJcbiAgY2xlYXJPbkVtcHR5SW5wdXQ/OiBib29sZWFuO1xyXG59O1xyXG5cclxuLy8gUmV1c2FibGUgc2VsZWN0IGNvbWJvYm94IHdpdGggb3B0aW9uYWwgcG9ydGFsIHJlbmRlcmluZyBmb3IgdGhlIGxpc3QuXHJcbmNvbnN0IFNlbGVjdENvbWJvYm94ID0gKHtcclxuICBsYWJlbCxcclxuICBvcHRpb25zLFxyXG4gIHZhbHVlLFxyXG4gIG9uQ2hhbmdlLFxyXG4gIGlucHV0UmVmLFxyXG4gIHBsYWNlaG9sZGVyLFxyXG4gIGludmFsaWQgPSBmYWxzZSxcclxuICBkaXNhYmxlZCA9IGZhbHNlLFxyXG4gIHJlYWRPbmx5ID0gZmFsc2UsXHJcbiAgdXNlUG9ydGFsID0gdHJ1ZSxcclxuICBlbWl0T25WYWx1ZUNoYW5nZSA9IGZhbHNlLFxyXG4gIGlkQmFzZSxcclxuICBwb3J0YWxDbGFzc05hbWUsXHJcbiAgcGFuZWxDbGFzc05hbWUsXHJcbiAgc2hvd1NlYXJjaEJ1dHRvbiA9IGZhbHNlLFxyXG4gIGFsbG93VGV4dElucHV0ID0gdHJ1ZSxcclxuICBzaG93TGFiZWwgPSB0cnVlLFxyXG4gIHNlbGVjdGVkVGV4dE1vZGUgPSBcInRleHRcIixcclxuICBkcm9wZG93bkV4cGFuZFB4ID0gMCxcclxuICBkcm9wZG93bk1pbldpZHRoUHggPSAwLFxyXG4gIGRyb3Bkb3duTWF4SGVpZ2h0Q2xhc3MgPSBcIm1heC1oLTcyXCIsXHJcbiAgc2VsZWN0ZWRJY29uQ2xhc3NOYW1lID0gXCJoLTQgdy00XCIsXHJcbiAgb3B0aW9uSWNvbkNsYXNzTmFtZSA9IFwiaC00IHctNFwiLFxyXG4gIGFsbG93T3B0aW9uSG9yaXpvbnRhbFNjcm9sbCA9IGZhbHNlLFxyXG4gIGxvY2tEcm9wZG93bldpZHRoT25GaXJzdE9wZW4gPSBmYWxzZSxcclxuICBkaXNhYmxlRGVmYXVsdE9wdGlvblBhZGRpbmcgPSBmYWxzZSxcclxuICBvcHRpb25MZWZ0UGFkZGluZ0NsYXNzTmFtZSA9IFwiXCIsXHJcbiAgb3B0aW9uVGV4dENsYXNzTmFtZSA9IFwiXCIsXHJcbiAgb3B0aW9uRGVmYXVsdENsYXNzTmFtZSA9IFwidGV4dC1zbGF0ZS05MDBcIixcclxuICBvcHRpb25BY3RpdmVDbGFzc05hbWUgPSBcImJnLXByaW1hcnkgdGV4dC13aGl0ZVwiLFxyXG4gIG9wdGlvblNlbGVjdGVkQ2xhc3NOYW1lID0gXCJiZy1wcmltYXJ5IHRleHQtd2hpdGVcIixcclxuICBzZWxlY3RlZElucHV0UGFkZGluZ0NsYXNzTmFtZSA9IFwicGwtOVwiLFxyXG4gIHBhbmVsU3R5bGUsXHJcbiAgY2xlYXJPbkVtcHR5SW5wdXQgPSBmYWxzZSxcclxufTogU2VsZWN0Q29tYm9ib3hQcm9wcykgPT4ge1xyXG4gIGNvbnN0IGFzc2lnbklucHV0UmVmID0gKG5vZGU6IEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsKSA9PiB7XHJcbiAgICBpZiAoIWlucHV0UmVmKSByZXR1cm47XHJcblxyXG4gICAgaWYgKHR5cGVvZiBpbnB1dFJlZiA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgIGlucHV0UmVmKG5vZGUpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaW5wdXRSZWYuY3VycmVudCA9IG5vZGU7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgcmVhZE9ubHlNb2RlID0gcmVhZE9ubHkgfHwgZGlzYWJsZWQ7XHJcbiAgY29uc3QgdmFsdWVDb2xvciA9IHJlYWRPbmx5TW9kZSA/IFwiIzY0NzQ4YlwiIDogXCIjMDAyOTZiZTBcIjtcclxuICBjb25zdCBkYXRhID0gdXNlTWVtbygoKSA9PiB7XHJcbiAgICByZXR1cm4gKG9wdGlvbnMgfHwgW10pLm1hcDxOb3JtYWxpemVkT3B0aW9uPigobykgPT4ge1xyXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShvKSkge1xyXG4gICAgICAgIHJldHVybiB7IHZhbHVlOiBvWzBdID8/IFwiXCIsIHRleHQ6IG9bMV0gPz8gXCJcIiB9O1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgdmFsdWU6IG8/LnZhbHVlID8/IG8/LlZhbHVlID8/IFwiXCIsXHJcbiAgICAgICAgdGV4dDogbz8udGV4dCA/PyBvPy5UZXh0ID8/IFwiXCIsXHJcbiAgICAgICAgaWNvbjogbz8uaWNvbiA/PyBvPy5JY29uLFxyXG4gICAgICB9O1xyXG4gICAgfSk7XHJcbiAgfSwgW29wdGlvbnNdKTtcclxuXHJcbiAgY29uc3QgW3F1ZXJ5LCBzZXRRdWVyeV0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBbc2VsZWN0ZWQsIHNldFNlbGVjdGVkXSA9IHVzZVN0YXRlKFxyXG4gICAgZGF0YS5maW5kKChkKSA9PiBTdHJpbmcoZC52YWx1ZSkgPT09IFN0cmluZyh2YWx1ZSkpIHx8IEVNUFRZX09QVElPTlxyXG4gICk7XHJcbiAgY29uc3QgW29wZW4sIHNldE9wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFthY3RpdmVJbmRleCwgc2V0QWN0aXZlSW5kZXhdID0gdXNlU3RhdGUoMCk7XHJcbiAgY29uc3QgW3Nob3dOb3RGb3VuZFN0YXRlLCBzZXRTaG93Tm90Rm91bmRTdGF0ZV0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgY29udGFpbmVyUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgYm94UmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgbGlzdFJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IGluaXRpYWxEcm9wZG93bldpZHRoUmVmID0gdXNlUmVmPG51bWJlciB8IG51bGw+KG51bGwpO1xyXG5cclxuICBjb25zdCBjbGVhck1hbnVhbFZhbHVlID0gKG5leHRPcGVuOiBib29sZWFuLCBzaG93Tm90Rm91bmQ6IGJvb2xlYW4pID0+IHtcclxuICAgIHNldFNlbGVjdGVkKEVNUFRZX09QVElPTik7XHJcbiAgICBzZXRRdWVyeShcIlwiKTtcclxuICAgIHNldEFjdGl2ZUluZGV4KDApO1xyXG4gICAgc2V0U2hvd05vdEZvdW5kU3RhdGUoc2hvd05vdEZvdW5kKTtcclxuICAgIHNldE9wZW4obmV4dE9wZW4pO1xyXG4gICAgaWYgKCFlbWl0T25WYWx1ZUNoYW5nZSkge1xyXG4gICAgICBvbkNoYW5nZShcIlwiKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICB1c2VPdXRzaWRlQ2xpY2soW2NvbnRhaW5lclJlZiwgbGlzdFJlZl0sICgpID0+IHtcclxuICAgIGlmIChxdWVyeSAhPT0gbnVsbCkge1xyXG4gICAgICBjbGVhck1hbnVhbFZhbHVlKGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBzZXRTaG93Tm90Rm91bmRTdGF0ZShmYWxzZSk7XHJcbiAgICBzZXRPcGVuKGZhbHNlKTtcclxuICB9KTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IG5leHRTZWxlY3RlZCA9IGRhdGEuZmluZCgoZCkgPT4gU3RyaW5nKGQudmFsdWUpID09PSBTdHJpbmcodmFsdWUpKSB8fCBFTVBUWV9PUFRJT047XHJcbiAgICBzZXRTZWxlY3RlZChuZXh0U2VsZWN0ZWQpO1xyXG5cclxuICAgIGlmIChTdHJpbmcodmFsdWUgPz8gXCJcIikudHJpbSgpKSB7XHJcbiAgICAgIHNldFF1ZXJ5KG51bGwpO1xyXG4gICAgICBzZXRTaG93Tm90Rm91bmRTdGF0ZShmYWxzZSk7XHJcbiAgICB9XHJcbiAgfSwgW3ZhbHVlLCBkYXRhXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIWVtaXRPblZhbHVlQ2hhbmdlKSByZXR1cm47XHJcbiAgICBvbkNoYW5nZShzZWxlY3RlZD8udmFsdWUgPyBTdHJpbmcoc2VsZWN0ZWQudmFsdWUpIDogXCJcIik7XHJcbiAgfSwgW2VtaXRPblZhbHVlQ2hhbmdlLCBvbkNoYW5nZSwgc2VsZWN0ZWRdKTtcclxuXHJcbiAgY29uc3QgZmlsdGVyZWQgPSB1c2VNZW1vKCgpID0+IHtcclxuICAgIGlmICghcXVlcnkgfHwgIXF1ZXJ5LnRyaW0oKSkgcmV0dXJuIGRhdGE7XHJcbiAgICBjb25zdCBub3JtYWxpemVkUXVlcnkgPSBub3JtYWxpemVMb29rdXBUZXh0KHF1ZXJ5KTtcclxuICAgIHJldHVybiBkYXRhLmZpbHRlcigob3B0aW9uKSA9PiB7XHJcbiAgICAgIGNvbnN0IG9wdGlvblZhbHVlID0gbm9ybWFsaXplTG9va3VwVGV4dChvcHRpb24udmFsdWUpO1xyXG4gICAgICBjb25zdCBvcHRpb25UZXh0ID0gbm9ybWFsaXplTG9va3VwVGV4dChvcHRpb24udGV4dCk7XHJcbiAgICAgIHJldHVybiBvcHRpb25UZXh0LmluY2x1ZGVzKG5vcm1hbGl6ZWRRdWVyeSkgfHwgb3B0aW9uVmFsdWUuaW5jbHVkZXMobm9ybWFsaXplZFF1ZXJ5KTtcclxuICAgIH0pO1xyXG4gIH0sIFtkYXRhLCBxdWVyeV0pO1xyXG4gIGNvbnN0IHJlc29sdmVkQWN0aXZlSW5kZXggPVxyXG4gICAgZmlsdGVyZWQubGVuZ3RoID4gMCA/IE1hdGgubWluKE1hdGgubWF4KGFjdGl2ZUluZGV4LCAwKSwgZmlsdGVyZWQubGVuZ3RoIC0gMSkgOiAwO1xyXG5cclxuICBjb25zdCBzZWxlY3RPcHRpb24gPSAob3B0OiBOb3JtYWxpemVkT3B0aW9uKSA9PiB7XHJcbiAgICBzZXRTZWxlY3RlZChvcHQpO1xyXG4gICAgc2V0UXVlcnkobnVsbCk7XHJcbiAgICBzZXRTaG93Tm90Rm91bmRTdGF0ZShmYWxzZSk7XHJcbiAgICBzZXRPcGVuKGZhbHNlKTtcclxuICAgIGlmICghZW1pdE9uVmFsdWVDaGFuZ2UpIHtcclxuICAgICAgb25DaGFuZ2Uob3B0Py52YWx1ZSA/IFN0cmluZyhvcHQudmFsdWUpIDogXCJcIik7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaGFuZGxlS2V5RG93biA9IChldjogUmVhY3QuS2V5Ym9hcmRFdmVudDxIVE1MSW5wdXRFbGVtZW50PikgPT4ge1xyXG4gICAgaWYgKGRpc2FibGVkKSByZXR1cm47XHJcbiAgICBpZiAoZXYua2V5ID09PSBcIkFycm93RG93blwiKSB7XHJcbiAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIHNldE9wZW4odHJ1ZSk7XHJcbiAgICAgIGlmIChmaWx0ZXJlZC5sZW5ndGgpIHNldEFjdGl2ZUluZGV4KChpZHgpID0+IChpZHggKyAxKSAlIGZpbHRlcmVkLmxlbmd0aCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmIChldi5rZXkgPT09IFwiQXJyb3dVcFwiKSB7XHJcbiAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIHNldE9wZW4odHJ1ZSk7XHJcbiAgICAgIGlmIChmaWx0ZXJlZC5sZW5ndGgpIHNldEFjdGl2ZUluZGV4KChpZHgpID0+IChpZHggLSAxICsgZmlsdGVyZWQubGVuZ3RoKSAlIGZpbHRlcmVkLmxlbmd0aCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmIChldi5rZXkgPT09IFwiRW50ZXJcIikge1xyXG4gICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBpZiAoY2xlYXJPbkVtcHR5SW5wdXQgJiYgcXVlcnkgIT09IG51bGwgJiYgIXF1ZXJ5LnRyaW0oKSkge1xyXG4gICAgICAgIHNldFNob3dOb3RGb3VuZFN0YXRlKGZhbHNlKTtcclxuICAgICAgICBzZXRPcGVuKGZhbHNlKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgaWYgKG9wZW4gJiYgZmlsdGVyZWQubGVuZ3RoKSB7XHJcbiAgICAgICAgc2VsZWN0T3B0aW9uKGZpbHRlcmVkW3Jlc29sdmVkQWN0aXZlSW5kZXhdID8/IGZpbHRlcmVkWzBdKTtcclxuICAgICAgfSBlbHNlIGlmIChxdWVyeSAhPT0gbnVsbCAmJiBxdWVyeS50cmltKCkpIHtcclxuICAgICAgICBjbGVhck1hbnVhbFZhbHVlKHRydWUsIHRydWUpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNldFNob3dOb3RGb3VuZFN0YXRlKGZhbHNlKTtcclxuICAgICAgICBzZXRPcGVuKHRydWUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoZXYua2V5ID09PSBcIkVzY2FwZVwiKSB7XHJcbiAgICAgIGlmIChxdWVyeSAhPT0gbnVsbCkge1xyXG4gICAgICAgIGNsZWFyTWFudWFsVmFsdWUoZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNldFNob3dOb3RGb3VuZFN0YXRlKGZhbHNlKTtcclxuICAgICAgc2V0T3BlbihmYWxzZSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY29uc3Qgc2FmZUlkID0gU3RyaW5nKGlkQmFzZSB8fCBsYWJlbCB8fCBcInNlbGVjdFwiKTtcclxuICBjb25zdCBsaXN0SWQgPSBgc2VsZWN0LW9wdGlvbnMtJHtzYWZlSWR9YDtcclxuICBjb25zdCBhY3RpdmVJZCA9XHJcbiAgICBvcGVuICYmIGZpbHRlcmVkW3Jlc29sdmVkQWN0aXZlSW5kZXhdID8gYHNlbGVjdC1vcHQtJHtzYWZlSWR9LSR7ZmlsdGVyZWRbcmVzb2x2ZWRBY3RpdmVJbmRleF0udmFsdWV9YCA6IHVuZGVmaW5lZDtcclxuICBjb25zdCBsaXN0T3BlbiA9IG9wZW4gJiYgIWRpc2FibGVkO1xyXG4gIGNvbnN0IHNlbGVjdGVkVmFsdWUgPSBTdHJpbmcoc2VsZWN0ZWQ/LnZhbHVlID8/IFwiXCIpLnRyaW0oKTtcclxuICBjb25zdCBzZWxlY3RlZERpc3BsYXlUZXh0ID0gc2VsZWN0ZWRUZXh0TW9kZSA9PT0gXCJ2YWx1ZVwiID8gc2VsZWN0ZWRWYWx1ZSA6IHNlbGVjdGVkPy50ZXh0IHx8IFwiXCI7XHJcbiAgY29uc3QgZGlzcGxheVZhbHVlID0gcXVlcnkgIT09IG51bGwgPyBxdWVyeSA6IChzZWxlY3RlZFZhbHVlID8gc2VsZWN0ZWREaXNwbGF5VGV4dCA6IFwiXCIpO1xyXG4gIGNvbnN0IHNob3dTZWxlY3RlZEljb24gPSBxdWVyeSA9PT0gbnVsbCAmJiAhIXNlbGVjdGVkVmFsdWUgJiYgISFzZWxlY3RlZD8uaWNvbjtcclxuICBjb25zdCBzaG93Tm90Rm91bmRSb3cgPSBzaG93Tm90Rm91bmRTdGF0ZSB8fCAoISFxdWVyeSAmJiAhIXF1ZXJ5LnRyaW0oKSAmJiBmaWx0ZXJlZC5sZW5ndGggPT09IDApO1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWREcm9wZG93bkV4cGFuZFB4ID0gTnVtYmVyLmlzRmluaXRlKGRyb3Bkb3duRXhwYW5kUHgpID8gTWF0aC5tYXgoMCwgZHJvcGRvd25FeHBhbmRQeCkgOiAwO1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWREcm9wZG93bk1pbldpZHRoUHggPSBOdW1iZXIuaXNGaW5pdGUoZHJvcGRvd25NaW5XaWR0aFB4KSA/IE1hdGgubWF4KDAsIGRyb3Bkb3duTWluV2lkdGhQeCkgOiAwO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFsb2NrRHJvcGRvd25XaWR0aE9uRmlyc3RPcGVuKSByZXR1cm47XHJcbiAgICBpZiAoIWxpc3RPcGVuKSByZXR1cm47XHJcbiAgICBpZiAoaW5pdGlhbERyb3Bkb3duV2lkdGhSZWYuY3VycmVudCAhPT0gbnVsbCkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IHdpZHRoID0gYm94UmVmLmN1cnJlbnQ/LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xyXG4gICAgaWYgKCFOdW1iZXIuaXNGaW5pdGUod2lkdGgpIHx8ICF3aWR0aCB8fCB3aWR0aCA8PSAwKSByZXR1cm47XHJcbiAgICBpbml0aWFsRHJvcGRvd25XaWR0aFJlZi5jdXJyZW50ID0gd2lkdGg7XHJcbiAgfSwgW2xpc3RPcGVuLCBsb2NrRHJvcGRvd25XaWR0aE9uRmlyc3RPcGVuXSk7XHJcblxyXG4gIGNvbnN0IG1lYXN1cmVkQW5jaG9yV2lkdGggPSBib3hSZWYuY3VycmVudD8uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XHJcbiAgY29uc3Qgbm9ybWFsaXplZE1lYXN1cmVkQW5jaG9yV2lkdGggPVxyXG4gICAgTnVtYmVyLmlzRmluaXRlKG1lYXN1cmVkQW5jaG9yV2lkdGgpICYmIG1lYXN1cmVkQW5jaG9yV2lkdGggJiYgbWVhc3VyZWRBbmNob3JXaWR0aCA+IDAgPyBtZWFzdXJlZEFuY2hvcldpZHRoIDogbnVsbDtcclxuICBjb25zdCBmaXhlZERyb3Bkb3duQmFzZVdpZHRoID0gbG9ja0Ryb3Bkb3duV2lkdGhPbkZpcnN0T3BlblxyXG4gICAgPyBpbml0aWFsRHJvcGRvd25XaWR0aFJlZi5jdXJyZW50ID8/IG5vcm1hbGl6ZWRNZWFzdXJlZEFuY2hvcldpZHRoXHJcbiAgICA6IG5vcm1hbGl6ZWRNZWFzdXJlZEFuY2hvcldpZHRoO1xyXG4gIGNvbnN0IGZpeGVkRHJvcGRvd25FeHBhbmRlZFdpZHRoID1cclxuICAgIGZpeGVkRHJvcGRvd25CYXNlV2lkdGggIT09IG51bGwgJiYgTnVtYmVyLmlzRmluaXRlKGZpeGVkRHJvcGRvd25CYXNlV2lkdGgpXHJcbiAgICAgID8gZml4ZWREcm9wZG93bkJhc2VXaWR0aCArIG5vcm1hbGl6ZWREcm9wZG93bkV4cGFuZFB4XHJcbiAgICAgIDogbnVsbDtcclxuICBjb25zdCByZXNvbHZlZERyb3Bkb3duV2lkdGhQeCA9XHJcbiAgICBmaXhlZERyb3Bkb3duRXhwYW5kZWRXaWR0aCAhPT0gbnVsbFxyXG4gICAgICA/IE1hdGgubWF4KGZpeGVkRHJvcGRvd25FeHBhbmRlZFdpZHRoLCBub3JtYWxpemVkRHJvcGRvd25NaW5XaWR0aFB4IHx8IDApXHJcbiAgICAgIDogbnVsbDtcclxuICBjb25zdCBpbmxpbmVEcm9wZG93blN0eWxlOiBSZWFjdC5DU1NQcm9wZXJ0aWVzIHwgdW5kZWZpbmVkID1cclxuICAgIHJlc29sdmVkRHJvcGRvd25XaWR0aFB4ICE9PSBudWxsICYmIHJlc29sdmVkRHJvcGRvd25XaWR0aFB4ID4gMFxyXG4gICAgICA/IHtcclxuICAgICAgICAgIHdpZHRoOiBgJHtyZXNvbHZlZERyb3Bkb3duV2lkdGhQeH1weGAsXHJcbiAgICAgICAgICAuLi4obm9ybWFsaXplZERyb3Bkb3duTWluV2lkdGhQeCA+IDAgPyB7IG1pbldpZHRoOiBgJHtub3JtYWxpemVkRHJvcGRvd25NaW5XaWR0aFB4fXB4YCB9IDoge30pLFxyXG4gICAgICAgIH1cclxuICAgICAgOiBub3JtYWxpemVkRHJvcGRvd25FeHBhbmRQeCA+IDBcclxuICAgICAgICA/IHtcclxuICAgICAgICAgICAgd2lkdGg6IGBjYWxjKDEwMCUgKyAke25vcm1hbGl6ZWREcm9wZG93bkV4cGFuZFB4fXB4KWAsXHJcbiAgICAgICAgICAgIC4uLihub3JtYWxpemVkRHJvcGRvd25NaW5XaWR0aFB4ID4gMCA/IHsgbWluV2lkdGg6IGAke25vcm1hbGl6ZWREcm9wZG93bk1pbldpZHRoUHh9cHhgIH0gOiB7fSksXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgOiBub3JtYWxpemVkRHJvcGRvd25NaW5XaWR0aFB4ID4gMFxyXG4gICAgICAgICAgPyB7IG1pbldpZHRoOiBgJHtub3JtYWxpemVkRHJvcGRvd25NaW5XaWR0aFB4fXB4YCB9XHJcbiAgICAgICAgOiB1bmRlZmluZWQ7XHJcblxyXG4gIGNvbnN0IGxpc3RCb2R5ID0gKFxyXG4gICAgPGRpdiBpZD17bGlzdElkfSByZWY9e2xpc3RSZWZ9IHJvbGU9XCJsaXN0Ym94XCIgYXJpYS1sYWJlbD17bGFiZWx9PlxyXG4gICAgICB7c2hvd05vdEZvdW5kUm93ID8gPGRpdiBjbGFzc05hbWU9XCJweC00IHB5LTIgdGV4dC1zbSB0ZXh0LXNsYXRlLTUwMFwiPntpbmRUKFwiQ29tbW9uX05vdEZvdW5kXCIsIFwiTm90IGZvdW5kXCIpfTwvZGl2PiA6IG51bGx9XHJcbiAgICAgIHtmaWx0ZXJlZC5tYXAoKG9wdCwgaWR4KSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2VsID0gc2VsZWN0ZWQ/LnZhbHVlID09PSBvcHQudmFsdWU7XHJcbiAgICAgICAgY29uc3QgaXNBY3RpdmUgPSBpZHggPT09IHJlc29sdmVkQWN0aXZlSW5kZXg7XHJcbiAgICAgICAgY29uc3Qgb3B0aW9uU3RhdGVDbGFzc05hbWUgPSBzZWwgPyBvcHRpb25TZWxlY3RlZENsYXNzTmFtZSA6IGlzQWN0aXZlID8gb3B0aW9uQWN0aXZlQ2xhc3NOYW1lIDogb3B0aW9uRGVmYXVsdENsYXNzTmFtZTtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgICAga2V5PXtTdHJpbmcob3B0LnZhbHVlKX1cclxuICAgICAgICAgICAgaWQ9e2BzZWxlY3Qtb3B0LSR7c2FmZUlkfS0ke29wdC52YWx1ZX1gfVxyXG4gICAgICAgICAgICByb2xlPVwib3B0aW9uXCJcclxuICAgICAgICAgICAgYXJpYS1zZWxlY3RlZD17c2VsfVxyXG4gICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXHJcbiAgICAgICAgICAgICAgXCJyZWxhdGl2ZSBmbGV4IHctZnVsbCBjdXJzb3ItZGVmYXVsdCBzZWxlY3Qtbm9uZSBpdGVtcy1jZW50ZXIgcHktMiBwci0zIHRleHQtbGVmdCB0ZXh0LXNtXCIsXHJcbiAgICAgICAgICAgICAgb3B0aW9uTGVmdFBhZGRpbmdDbGFzc05hbWUsXHJcbiAgICAgICAgICAgICAgZGlzYWJsZURlZmF1bHRPcHRpb25QYWRkaW5nID8gXCJcIiA6IFwidHlwZS1vcHRpb25cIixcclxuICAgICAgICAgICAgICBvcHRpb25TdGF0ZUNsYXNzTmFtZVxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgICBzdHlsZT17XHJcbiAgICAgICAgICAgICAgYWxsb3dPcHRpb25Ib3Jpem9udGFsU2Nyb2xsXHJcbiAgICAgICAgICAgICAgICA/IHsgb3ZlcmZsb3dYOiBcImF1dG9cIiwgb3ZlcmZsb3dZOiBcImhpZGRlblwiLCBXZWJraXRPdmVyZmxvd1Njcm9sbGluZzogXCJ0b3VjaFwiIH1cclxuICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb25Nb3VzZUVudGVyPXsoKSA9PiBzZXRBY3RpdmVJbmRleChpZHgpfVxyXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZWxlY3RPcHRpb24ob3B0KX1cclxuICAgICAgICAgID5cclxuICAgICAgICAgICAge3NlbCAmJiAoXHJcbiAgICAgICAgICAgICAgPHNwYW5cclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcclxuICAgICAgICAgICAgICAgICAgXCJhYnNvbHV0ZSBpbnNldC15LTAgbGVmdC0wIGZsZXggaXRlbXMtY2VudGVyIHBsLTJcIixcclxuICAgICAgICAgICAgICAgICAgaXNBY3RpdmUgPyBcInRleHQtd2hpdGVcIiA6IFwidGV4dC1wcmltYXJ5XCJcclxuICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgPjwvc3Bhbj5cclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgPHNwYW5cclxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXHJcbiAgICAgICAgICAgICAgICBhbGxvd09wdGlvbkhvcml6b250YWxTY3JvbGwgPyBcImlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiIDogXCJmbGV4IG1pbi13LTAgaXRlbXMtY2VudGVyIGdhcC0yXCIsXHJcbiAgICAgICAgICAgICAgICBzZWwgPyBcImZvbnQtbWVkaXVtXCIgOiBcImZvbnQtbm9ybWFsXCJcclxuICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgIHN0eWxlPXthbGxvd09wdGlvbkhvcml6b250YWxTY3JvbGwgPyB7IG1pbldpZHRoOiBcIm1heC1jb250ZW50XCIgfSA6IHVuZGVmaW5lZH1cclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIHtvcHQuaWNvbiA/IChcclxuICAgICAgICAgICAgICAgIDxzcGFuXHJcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcclxuICAgICAgICAgICAgICAgICAgICBcImlubGluZS1mbGV4IHNocmluay0wIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbkljb25DbGFzc05hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgaXNBY3RpdmUgPyBcInRleHQtd2hpdGVcIiA6IFwidGV4dC1zbGF0ZS01MDBcIlxyXG4gICAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICB7b3B0Lmljb259XHJcbiAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgKSA6IG51bGx9XHJcbiAgICAgICAgICAgICAgPHNwYW5cclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhhbGxvd09wdGlvbkhvcml6b250YWxTY3JvbGwgPyBcImJsb2NrXCIgOiBcImJsb2NrIHRydW5jYXRlXCIsIG9wdGlvblRleHRDbGFzc05hbWUpfVxyXG4gICAgICAgICAgICAgICAgc3R5bGU9e2FsbG93T3B0aW9uSG9yaXpvbnRhbFNjcm9sbCA/IHsgd2hpdGVTcGFjZTogXCJub3dyYXBcIiB9IDogdW5kZWZpbmVkfVxyXG4gICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgIHtvcHQudGV4dH1cclxuICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICk7XHJcbiAgICAgIH0pfVxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXZcclxuICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFwic3BhY2UteS0yXCIsIGRpc2FibGVkID8gXCJwb2ludGVyLWV2ZW50cy1ub25lIHNlbGVjdC1ub25lXCIgOiBcIlwiKX1cclxuICAgICAgcmVmPXtjb250YWluZXJSZWZ9XHJcbiAgICA+XHJcbiAgICAgIHtzaG93TGFiZWwgPyA8bGFiZWwgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFwiZm9ybS1sYWJlbCBmb250LXNlbWlib2xkXCIsIGludmFsaWQgPyBcInRleHQtcm9zZS03MDBcIiA6IFwiXCIpfT57bGFiZWx9PC9sYWJlbD4gOiBudWxsfVxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlXCI+XHJcbiAgICAgICAgPGRpdlxyXG4gICAgICAgICAgcmVmPXtib3hSZWZ9XHJcbiAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXHJcbiAgICAgICAgICAgIFwicmVsYXRpdmUgdy1mdWxsIGN1cnNvci1kZWZhdWx0IHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJnLXdoaXRlIHRleHQtbGVmdCBmb2N1cy13aXRoaW46Ym9yZGVyLXByaW1hcnkgZm9jdXMtd2l0aGluOnJpbmctMiBmb2N1cy13aXRoaW46cmluZy1wcmltYXJ5IGZvY3VzLXdpdGhpbjpyaW5nLW9mZnNldC13aGl0ZSBzbTp0ZXh0LXNtXCIsXHJcbiAgICAgICAgICAgIHJlYWRPbmx5TW9kZSA/IFwiaW5kLXJlYWRvbmx5LWZpZWxkXCIgOiBcIlwiXHJcbiAgICAgICAgICApfVxyXG4gICAgICAgICAgc3R5bGU9e3JlYWRPbmx5TW9kZSA/IHsgY29sb3I6IHZhbHVlQ29sb3IgfSA6IHVuZGVmaW5lZH1cclxuICAgICAgICA+XHJcbiAgICAgICAgICA8aW5wdXRcclxuICAgICAgICAgICAgcmVmPXthc3NpZ25JbnB1dFJlZn1cclxuICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxyXG4gICAgICAgICAgICAgIFwidy1mdWxsIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlciBweS0yIHRleHQtc20gc206dGV4dC1iYXNlIGxlYWRpbmctNSBmb2N1czpvdXRsaW5lLWhpZGRlbiBmb2N1czpyaW5nLTIgZGlzYWJsZWQ6Ymctc2xhdGUtMTAwIGRpc2FibGVkOnRleHQtc2xhdGUtNTAwIGRpc2FibGVkOmJvcmRlci1zbGF0ZS0yMDAgZGlzYWJsZWQ6Y3Vyc29yLW5vdC1hbGxvd2VkXCIsXHJcbiAgICAgICAgICAgICAgc2hvd1NlbGVjdGVkSWNvbiA/IHNlbGVjdGVkSW5wdXRQYWRkaW5nQ2xhc3NOYW1lIDogXCJwbC0zXCIsXHJcbiAgICAgICAgICAgICAgc2hvd1NlYXJjaEJ1dHRvbiA/IFwicHItMjBcIiA6IFwicHItMTBcIixcclxuICAgICAgICAgICAgICBpbnZhbGlkXHJcbiAgICAgICAgICAgICAgICA/IFwiYm9yZGVyLXJvc2UtNDAwIGJnLXJvc2UtNTAgZm9jdXM6cmluZy1yb3NlLTIwMCBmb2N1czpib3JkZXItcm9zZS00MDBcIlxyXG4gICAgICAgICAgICAgICAgOiBcImJvcmRlci1zbGF0ZS0yMDAgZm9jdXM6cmluZy1wcmltYXJ5IGZvY3VzOmJvcmRlci1wcmltYXJ5XCIsXHJcbiAgICAgICAgICAgICAgcmVhZE9ubHlNb2RlID8gXCJpbmQtcmVhZG9ubHktZmllbGRcIiA6IFwidGV4dC1zbGF0ZS05MDBcIlxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgICBzdHlsZT17cmVhZE9ubHlNb2RlID8geyBjb2xvcjogdmFsdWVDb2xvciB9IDogdW5kZWZpbmVkfVxyXG4gICAgICAgICAgICB2YWx1ZT17ZGlzcGxheVZhbHVlfVxyXG4gICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XHJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICBpZiAoIWFsbG93VGV4dElucHV0KSByZXR1cm47XHJcbiAgICAgICAgICAgICAgY29uc3QgdmFsID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xyXG4gICAgICAgICAgICAgIHNldEFjdGl2ZUluZGV4KDApO1xyXG4gICAgICAgICAgICAgIHNldFNob3dOb3RGb3VuZFN0YXRlKGZhbHNlKTtcclxuICAgICAgICAgICAgICBzZXRRdWVyeSh2YWwpO1xyXG4gICAgICAgICAgICAgIGlmIChjbGVhck9uRW1wdHlJbnB1dCAmJiAhdmFsLnRyaW0oKSkge1xyXG4gICAgICAgICAgICAgICAgY2xlYXJNYW51YWxWYWx1ZShmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBzZXRPcGVuKHRydWUpO1xyXG4gICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICBvbktleURvd249e2hhbmRsZUtleURvd259XHJcbiAgICAgICAgICAgIG9uRm9jdXM9eygpID0+IHtcclxuICAgICAgICAgICAgICBpZiAoIWRpc2FibGVkKSBzZXRPcGVuKHRydWUpO1xyXG4gICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XHJcbiAgICAgICAgICAgIHJlYWRPbmx5PXtyZWFkT25seU1vZGUgfHwgIWFsbG93VGV4dElucHV0fVxyXG4gICAgICAgICAgICBhcmlhLWxhYmVsPXtsYWJlbH1cclxuICAgICAgICAgICAgcm9sZT1cImNvbWJvYm94XCJcclxuICAgICAgICAgICAgYXJpYS1leHBhbmRlZD17bGlzdE9wZW59XHJcbiAgICAgICAgICAgIGFyaWEtY29udHJvbHM9e2xpc3RJZH1cclxuICAgICAgICAgICAgYXJpYS1hY3RpdmVkZXNjZW5kYW50PXthY3RpdmVJZH1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgICB7c2hvd1NlbGVjdGVkSWNvbiA/IChcclxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicG9pbnRlci1ldmVudHMtbm9uZSBhYnNvbHV0ZSBpbnNldC15LTAgbGVmdC0wIGZsZXggaXRlbXMtY2VudGVyIHBsLTMgdGV4dC1zbGF0ZS01MDBcIj5cclxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXCJpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXJcIiwgc2VsZWN0ZWRJY29uQ2xhc3NOYW1lKX0+e3NlbGVjdGVkLmljb259PC9zcGFuPlxyXG4gICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICApIDogbnVsbH1cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQteS0wIHJpZ2h0LTAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgcHItMlwiPlxyXG4gICAgICAgICAgICB7c2hvd1NlYXJjaEJ1dHRvbiA/IChcclxuICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHAtMS41IHRleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtc2xhdGUtNTAwXCJcclxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcclxuICAgICAgICAgICAgICAgICAgaWYgKGRpc2FibGVkKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgIGlmIChxdWVyeSAhPT0gbnVsbCAmJiBxdWVyeS50cmltKCkgJiYgZmlsdGVyZWQubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJNYW51YWxWYWx1ZSh0cnVlLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgc2V0T3Blbih0cnVlKTtcclxuICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtpbmRUKFwiQ29tbW9uX1NlYXJjaFwiLCBcIlNlYXJjaFwiKX1cclxuICAgICAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cclxuICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBmaWxsPVwibm9uZVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBzdHJva2VXaWR0aD17MS41fSBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBjbGFzc05hbWU9XCJoLTUgdy01XCI+XHJcbiAgICAgICAgICAgICAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwibTE1Ljc1IDE1Ljc1LTIuNDg5LTIuNDg5bTAgMGEzLjM3NSAzLjM3NSAwIDEgMC00Ljc3My00Ljc3MyAzLjM3NSAzLjM3NSAwIDAgMCA0Ljc3NCA0Ljc3NFpNMjEgMTJhOSA5IDAgMSAxLTE4IDAgOSA5IDAgMCAxIDE4IDBaXCIgLz5cclxuICAgICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICApIDogbnVsbH1cclxuICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHAtMS41IHRleHQtc2xhdGUtNTAwIGhvdmVyOnRleHQtc2xhdGUtNjAwXCJcclxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGlzYWJsZWQpIHJldHVybjtcclxuICAgICAgICAgICAgICAgIGlmIChvcGVuICYmIHF1ZXJ5ICE9PSBudWxsICYmIHF1ZXJ5LnRyaW0oKSkge1xyXG4gICAgICAgICAgICAgICAgICBjbGVhck1hbnVhbFZhbHVlKGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHNldE9wZW4oKHByZXYpID0+ICFwcmV2KTtcclxuICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgIGFyaWEtbGFiZWw9e29wZW4gPyBpbmRUKFwiRHJvcGRvd25fSGlkZU9wdGlvbnNcIiwgXCJIaWRlIG9wdGlvbnNcIikgOiBpbmRUKFwiRHJvcGRvd25fU2hvd09wdGlvbnNcIiwgXCJTaG93IG9wdGlvbnNcIil9XHJcbiAgICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAge29wZW4gPyA8Q2hldnJvblVwU3ZnIGNsYXNzTmFtZT1cImgtNSB3LTVcIiAvPiA6IDxDaGV2cm9uRG93blN2ZyBjbGFzc05hbWU9XCJoLTUgdy01XCIgLz59XHJcbiAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAge3VzZVBvcnRhbCA/IChcclxuICAgICAgICAgIDxGbG9hdGluZ0xpc3RcclxuICAgICAgICAgICAgYW5jaG9yUmVmPXtib3hSZWZ9XHJcbiAgICAgICAgICAgIG9wZW49e2xpc3RPcGVufVxyXG4gICAgICAgICAgICB6SW5kZXg9ezM2MDAwMH1cclxuICAgICAgICAgICAgZml4ZWRXaWR0aFB4PXtyZXNvbHZlZERyb3Bkb3duV2lkdGhQeCA/PyB1bmRlZmluZWR9XHJcbiAgICAgICAgICAgIHBhbmVsU3R5bGU9e3BhbmVsU3R5bGV9XHJcbiAgICAgICAgICAgIG1heEhlaWdodENsYXNzPXtkcm9wZG93bk1heEhlaWdodENsYXNzfVxyXG4gICAgICAgICAgICByb2xlPVwibGlzdGJveFwiXHJcbiAgICAgICAgICAgIHJvdW5kZWRDbGFzcz1cInJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldXCJcclxuICAgICAgICAgICAgcG9ydGFsQ2xhc3NOYW1lPXtwb3J0YWxDbGFzc05hbWV9XHJcbiAgICAgICAgICAgIHBhbmVsQ2xhc3NOYW1lPXtwYW5lbENsYXNzTmFtZX1cclxuICAgICAgICAgID5cclxuICAgICAgICAgICAge2xpc3RCb2R5fVxyXG4gICAgICAgICAgPC9GbG9hdGluZ0xpc3Q+XHJcbiAgICAgICAgKSA6IChcclxuICAgICAgICAgIGxpc3RPcGVuICYmIChcclxuICAgICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YGFic29sdXRlIHotMzYwMDAwIG10LTEgdy1mdWxsIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJnLXdoaXRlIHNoYWRvdy1sZyByaW5nLTEgcmluZy1ibGFjay81IGZvY3VzOm91dGxpbmUtaGlkZGVuICR7ZHJvcGRvd25NYXhIZWlnaHRDbGFzc30gb3ZlcmZsb3ctYXV0byAke3BhbmVsQ2xhc3NOYW1lIHx8IFwiXCJ9YH1cclxuICAgICAgICAgICAgICBzdHlsZT17eyAuLi5pbmxpbmVEcm9wZG93blN0eWxlLCAuLi4ocGFuZWxTdHlsZSB8fCB7fSkgfX1cclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIHtsaXN0Qm9keX1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICApXHJcbiAgICAgICAgKX1cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rp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
