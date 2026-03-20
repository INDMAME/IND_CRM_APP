import {
  ChevronDownSvg,
  ChevronUpSvg,
  FloatingList_default,
  useOutsideClick
} from "./chunk-CGLQ74CG.js";
import {
  classNames
} from "./chunk-3DMDYLVT.js";
import {
  require_jsx_runtime,
  require_react
} from "./chunk-WUZVRL45.js";
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9TZWxlY3RDb21ib2JveC50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IEZsb2F0aW5nTGlzdCBmcm9tIFwiLi9GbG9hdGluZ0xpc3QudHN4XCI7XHJcbmltcG9ydCB7IENoZXZyb25Eb3duU3ZnLCBDaGV2cm9uVXBTdmcgfSBmcm9tIFwiLi9jaGV2cm9ucy50c3hcIjtcclxuaW1wb3J0IHsgdXNlT3V0c2lkZUNsaWNrIH0gZnJvbSBcIi4uLy4uL2hvb2tzL3VzZU91dHNpZGVDbGljay50c1wiO1xyXG5pbXBvcnQgeyBjbGFzc05hbWVzIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2NsYXNzTmFtZXMudHNcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcblxyXG50eXBlIFJhd09wdGlvbiA9XHJcbiAgfCB7XHJcbiAgICAgIHZhbHVlPzogc3RyaW5nIHwgbnVtYmVyO1xyXG4gICAgICBWYWx1ZT86IHN0cmluZyB8IG51bWJlcjtcclxuICAgICAgdGV4dD86IHN0cmluZztcclxuICAgICAgVGV4dD86IHN0cmluZztcclxuICAgICAgaWNvbj86IFJlYWN0LlJlYWN0Tm9kZTtcclxuICAgICAgSWNvbj86IFJlYWN0LlJlYWN0Tm9kZTtcclxuICAgIH1cclxuICB8IFtzdHJpbmcgfCBudW1iZXIsIHN0cmluZ107XHJcblxyXG50eXBlIE5vcm1hbGl6ZWRPcHRpb24gPSB7XHJcbiAgdmFsdWU6IHN0cmluZyB8IG51bWJlcjtcclxuICB0ZXh0OiBzdHJpbmc7XHJcbiAgaWNvbj86IFJlYWN0LlJlYWN0Tm9kZTtcclxufTtcclxuXHJcbmNvbnN0IEVNUFRZX09QVElPTjogTm9ybWFsaXplZE9wdGlvbiA9IHsgdmFsdWU6IFwiXCIsIHRleHQ6IFwiXCIgfTtcclxuXHJcbmNvbnN0IG5vcm1hbGl6ZUxvb2t1cFRleHQgPSAodmFsdWU6IHN0cmluZyB8IG51bWJlciB8IG51bGwgfCB1bmRlZmluZWQpOiBzdHJpbmcgPT4ge1xyXG4gIHJldHVybiBTdHJpbmcodmFsdWUgPz8gXCJcIikudHJpbSgpLnRvTG93ZXJDYXNlKCk7XHJcbn07XHJcblxyXG50eXBlIFNlbGVjdENvbWJvYm94UHJvcHMgPSB7XHJcbiAgbGFiZWw6IHN0cmluZztcclxuICBvcHRpb25zOiBSYXdPcHRpb25bXTtcclxuICB2YWx1ZTogc3RyaW5nIHwgbnVtYmVyO1xyXG4gIG9uQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBwbGFjZWhvbGRlcj86IHN0cmluZztcclxuICBpbnZhbGlkPzogYm9vbGVhbjtcclxuICBkaXNhYmxlZD86IGJvb2xlYW47XHJcbiAgcmVhZE9ubHk/OiBib29sZWFuO1xyXG4gIHVzZVBvcnRhbD86IGJvb2xlYW47XHJcbiAgZW1pdE9uVmFsdWVDaGFuZ2U/OiBib29sZWFuO1xyXG4gIGlkQmFzZT86IHN0cmluZztcclxuICBwb3J0YWxDbGFzc05hbWU/OiBzdHJpbmc7XHJcbiAgcGFuZWxDbGFzc05hbWU/OiBzdHJpbmc7XHJcbiAgc2hvd1NlYXJjaEJ1dHRvbj86IGJvb2xlYW47XHJcbiAgYWxsb3dUZXh0SW5wdXQ/OiBib29sZWFuO1xyXG4gIHNob3dMYWJlbD86IGJvb2xlYW47XHJcbiAgc2VsZWN0ZWRUZXh0TW9kZT86IFwidGV4dFwiIHwgXCJ2YWx1ZVwiO1xyXG4gIGRyb3Bkb3duRXhwYW5kUHg/OiBudW1iZXI7XHJcbiAgZHJvcGRvd25NaW5XaWR0aFB4PzogbnVtYmVyO1xyXG4gIGRyb3Bkb3duTWF4SGVpZ2h0Q2xhc3M/OiBzdHJpbmc7XHJcbiAgc2VsZWN0ZWRJY29uQ2xhc3NOYW1lPzogc3RyaW5nO1xyXG4gIG9wdGlvbkljb25DbGFzc05hbWU/OiBzdHJpbmc7XHJcbiAgYWxsb3dPcHRpb25Ib3Jpem9udGFsU2Nyb2xsPzogYm9vbGVhbjtcclxuICBsb2NrRHJvcGRvd25XaWR0aE9uRmlyc3RPcGVuPzogYm9vbGVhbjtcclxuICBkaXNhYmxlRGVmYXVsdE9wdGlvblBhZGRpbmc/OiBib29sZWFuO1xyXG4gIG9wdGlvbkxlZnRQYWRkaW5nQ2xhc3NOYW1lPzogc3RyaW5nO1xyXG4gIG9wdGlvblRleHRDbGFzc05hbWU/OiBzdHJpbmc7XHJcbiAgb3B0aW9uRGVmYXVsdENsYXNzTmFtZT86IHN0cmluZztcclxuICBvcHRpb25BY3RpdmVDbGFzc05hbWU/OiBzdHJpbmc7XHJcbiAgb3B0aW9uU2VsZWN0ZWRDbGFzc05hbWU/OiBzdHJpbmc7XHJcbiAgc2VsZWN0ZWRJbnB1dFBhZGRpbmdDbGFzc05hbWU/OiBzdHJpbmc7XHJcbiAgcGFuZWxTdHlsZT86IFJlYWN0LkNTU1Byb3BlcnRpZXM7XHJcbiAgY2xlYXJPbkVtcHR5SW5wdXQ/OiBib29sZWFuO1xyXG59O1xyXG5cclxuLy8gUmV1c2FibGUgc2VsZWN0IGNvbWJvYm94IHdpdGggb3B0aW9uYWwgcG9ydGFsIHJlbmRlcmluZyBmb3IgdGhlIGxpc3QuXHJcbmNvbnN0IFNlbGVjdENvbWJvYm94ID0gKHtcclxuICBsYWJlbCxcclxuICBvcHRpb25zLFxyXG4gIHZhbHVlLFxyXG4gIG9uQ2hhbmdlLFxyXG4gIHBsYWNlaG9sZGVyLFxyXG4gIGludmFsaWQgPSBmYWxzZSxcclxuICBkaXNhYmxlZCA9IGZhbHNlLFxyXG4gIHJlYWRPbmx5ID0gZmFsc2UsXHJcbiAgdXNlUG9ydGFsID0gdHJ1ZSxcclxuICBlbWl0T25WYWx1ZUNoYW5nZSA9IGZhbHNlLFxyXG4gIGlkQmFzZSxcclxuICBwb3J0YWxDbGFzc05hbWUsXHJcbiAgcGFuZWxDbGFzc05hbWUsXHJcbiAgc2hvd1NlYXJjaEJ1dHRvbiA9IGZhbHNlLFxyXG4gIGFsbG93VGV4dElucHV0ID0gdHJ1ZSxcclxuICBzaG93TGFiZWwgPSB0cnVlLFxyXG4gIHNlbGVjdGVkVGV4dE1vZGUgPSBcInRleHRcIixcclxuICBkcm9wZG93bkV4cGFuZFB4ID0gMCxcclxuICBkcm9wZG93bk1pbldpZHRoUHggPSAwLFxyXG4gIGRyb3Bkb3duTWF4SGVpZ2h0Q2xhc3MgPSBcIm1heC1oLTcyXCIsXHJcbiAgc2VsZWN0ZWRJY29uQ2xhc3NOYW1lID0gXCJoLTQgdy00XCIsXHJcbiAgb3B0aW9uSWNvbkNsYXNzTmFtZSA9IFwiaC00IHctNFwiLFxyXG4gIGFsbG93T3B0aW9uSG9yaXpvbnRhbFNjcm9sbCA9IGZhbHNlLFxyXG4gIGxvY2tEcm9wZG93bldpZHRoT25GaXJzdE9wZW4gPSBmYWxzZSxcclxuICBkaXNhYmxlRGVmYXVsdE9wdGlvblBhZGRpbmcgPSBmYWxzZSxcclxuICBvcHRpb25MZWZ0UGFkZGluZ0NsYXNzTmFtZSA9IFwiXCIsXHJcbiAgb3B0aW9uVGV4dENsYXNzTmFtZSA9IFwiXCIsXHJcbiAgb3B0aW9uRGVmYXVsdENsYXNzTmFtZSA9IFwidGV4dC1zbGF0ZS05MDBcIixcclxuICBvcHRpb25BY3RpdmVDbGFzc05hbWUgPSBcImJnLXByaW1hcnkgdGV4dC13aGl0ZVwiLFxyXG4gIG9wdGlvblNlbGVjdGVkQ2xhc3NOYW1lID0gXCJiZy1wcmltYXJ5IHRleHQtd2hpdGVcIixcclxuICBzZWxlY3RlZElucHV0UGFkZGluZ0NsYXNzTmFtZSA9IFwicGwtOVwiLFxyXG4gIHBhbmVsU3R5bGUsXHJcbiAgY2xlYXJPbkVtcHR5SW5wdXQgPSBmYWxzZSxcclxufTogU2VsZWN0Q29tYm9ib3hQcm9wcykgPT4ge1xyXG4gIGNvbnN0IHJlYWRPbmx5TW9kZSA9IHJlYWRPbmx5IHx8IGRpc2FibGVkO1xyXG4gIGNvbnN0IHZhbHVlQ29sb3IgPSByZWFkT25seU1vZGUgPyBcIiM2NDc0OGJcIiA6IFwiIzAwMjk2YmUwXCI7XHJcbiAgY29uc3QgZGF0YSA9IHVzZU1lbW8oKCkgPT4ge1xyXG4gICAgcmV0dXJuIChvcHRpb25zIHx8IFtdKS5tYXA8Tm9ybWFsaXplZE9wdGlvbj4oKG8pID0+IHtcclxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkobykpIHtcclxuICAgICAgICByZXR1cm4geyB2YWx1ZTogb1swXSA/PyBcIlwiLCB0ZXh0OiBvWzFdID8/IFwiXCIgfTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHZhbHVlOiBvPy52YWx1ZSA/PyBvPy5WYWx1ZSA/PyBcIlwiLFxyXG4gICAgICAgIHRleHQ6IG8/LnRleHQgPz8gbz8uVGV4dCA/PyBcIlwiLFxyXG4gICAgICAgIGljb246IG8/Lmljb24gPz8gbz8uSWNvbixcclxuICAgICAgfTtcclxuICAgIH0pO1xyXG4gIH0sIFtvcHRpb25zXSk7XHJcblxyXG4gIGNvbnN0IFtxdWVyeSwgc2V0UXVlcnldID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgW3NlbGVjdGVkLCBzZXRTZWxlY3RlZF0gPSB1c2VTdGF0ZShcclxuICAgIGRhdGEuZmluZCgoZCkgPT4gU3RyaW5nKGQudmFsdWUpID09PSBTdHJpbmcodmFsdWUpKSB8fCBFTVBUWV9PUFRJT05cclxuICApO1xyXG4gIGNvbnN0IFtvcGVuLCBzZXRPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbYWN0aXZlSW5kZXgsIHNldEFjdGl2ZUluZGV4XSA9IHVzZVN0YXRlKDApO1xyXG4gIGNvbnN0IFtzaG93Tm90Rm91bmRTdGF0ZSwgc2V0U2hvd05vdEZvdW5kU3RhdGVdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IGNvbnRhaW5lclJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IGJveFJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IGxpc3RSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBpbml0aWFsRHJvcGRvd25XaWR0aFJlZiA9IHVzZVJlZjxudW1iZXIgfCBudWxsPihudWxsKTtcclxuXHJcbiAgY29uc3QgY2xlYXJNYW51YWxWYWx1ZSA9IChuZXh0T3BlbjogYm9vbGVhbiwgc2hvd05vdEZvdW5kOiBib29sZWFuKSA9PiB7XHJcbiAgICBzZXRTZWxlY3RlZChFTVBUWV9PUFRJT04pO1xyXG4gICAgc2V0UXVlcnkoXCJcIik7XHJcbiAgICBzZXRBY3RpdmVJbmRleCgwKTtcclxuICAgIHNldFNob3dOb3RGb3VuZFN0YXRlKHNob3dOb3RGb3VuZCk7XHJcbiAgICBzZXRPcGVuKG5leHRPcGVuKTtcclxuICAgIGlmICghZW1pdE9uVmFsdWVDaGFuZ2UpIHtcclxuICAgICAgb25DaGFuZ2UoXCJcIik7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgdXNlT3V0c2lkZUNsaWNrKFtjb250YWluZXJSZWYsIGxpc3RSZWZdLCAoKSA9PiB7XHJcbiAgICBpZiAocXVlcnkgIT09IG51bGwpIHtcclxuICAgICAgY2xlYXJNYW51YWxWYWx1ZShmYWxzZSwgZmFsc2UpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgc2V0U2hvd05vdEZvdW5kU3RhdGUoZmFsc2UpO1xyXG4gICAgc2V0T3BlbihmYWxzZSk7XHJcbiAgfSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBuZXh0U2VsZWN0ZWQgPSBkYXRhLmZpbmQoKGQpID0+IFN0cmluZyhkLnZhbHVlKSA9PT0gU3RyaW5nKHZhbHVlKSkgfHwgRU1QVFlfT1BUSU9OO1xyXG4gICAgc2V0U2VsZWN0ZWQobmV4dFNlbGVjdGVkKTtcclxuXHJcbiAgICBpZiAoU3RyaW5nKHZhbHVlID8/IFwiXCIpLnRyaW0oKSkge1xyXG4gICAgICBzZXRRdWVyeShudWxsKTtcclxuICAgICAgc2V0U2hvd05vdEZvdW5kU3RhdGUoZmFsc2UpO1xyXG4gICAgfVxyXG4gIH0sIFt2YWx1ZSwgZGF0YV0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFlbWl0T25WYWx1ZUNoYW5nZSkgcmV0dXJuO1xyXG4gICAgb25DaGFuZ2Uoc2VsZWN0ZWQ/LnZhbHVlID8gU3RyaW5nKHNlbGVjdGVkLnZhbHVlKSA6IFwiXCIpO1xyXG4gIH0sIFtlbWl0T25WYWx1ZUNoYW5nZSwgb25DaGFuZ2UsIHNlbGVjdGVkXSk7XHJcblxyXG4gIGNvbnN0IGZpbHRlcmVkID0gdXNlTWVtbygoKSA9PiB7XHJcbiAgICBpZiAoIXF1ZXJ5IHx8ICFxdWVyeS50cmltKCkpIHJldHVybiBkYXRhO1xyXG4gICAgY29uc3Qgbm9ybWFsaXplZFF1ZXJ5ID0gbm9ybWFsaXplTG9va3VwVGV4dChxdWVyeSk7XHJcbiAgICByZXR1cm4gZGF0YS5maWx0ZXIoKG9wdGlvbikgPT4ge1xyXG4gICAgICBjb25zdCBvcHRpb25WYWx1ZSA9IG5vcm1hbGl6ZUxvb2t1cFRleHQob3B0aW9uLnZhbHVlKTtcclxuICAgICAgY29uc3Qgb3B0aW9uVGV4dCA9IG5vcm1hbGl6ZUxvb2t1cFRleHQob3B0aW9uLnRleHQpO1xyXG4gICAgICByZXR1cm4gb3B0aW9uVGV4dC5pbmNsdWRlcyhub3JtYWxpemVkUXVlcnkpIHx8IG9wdGlvblZhbHVlLmluY2x1ZGVzKG5vcm1hbGl6ZWRRdWVyeSk7XHJcbiAgICB9KTtcclxuICB9LCBbZGF0YSwgcXVlcnldKTtcclxuICBjb25zdCByZXNvbHZlZEFjdGl2ZUluZGV4ID1cclxuICAgIGZpbHRlcmVkLmxlbmd0aCA+IDAgPyBNYXRoLm1pbihNYXRoLm1heChhY3RpdmVJbmRleCwgMCksIGZpbHRlcmVkLmxlbmd0aCAtIDEpIDogMDtcclxuXHJcbiAgY29uc3Qgc2VsZWN0T3B0aW9uID0gKG9wdDogTm9ybWFsaXplZE9wdGlvbikgPT4ge1xyXG4gICAgc2V0U2VsZWN0ZWQob3B0KTtcclxuICAgIHNldFF1ZXJ5KG51bGwpO1xyXG4gICAgc2V0U2hvd05vdEZvdW5kU3RhdGUoZmFsc2UpO1xyXG4gICAgc2V0T3BlbihmYWxzZSk7XHJcbiAgICBpZiAoIWVtaXRPblZhbHVlQ2hhbmdlKSB7XHJcbiAgICAgIG9uQ2hhbmdlKG9wdD8udmFsdWUgPyBTdHJpbmcob3B0LnZhbHVlKSA6IFwiXCIpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGNvbnN0IGhhbmRsZUtleURvd24gPSAoZXY6IFJlYWN0LktleWJvYXJkRXZlbnQ8SFRNTElucHV0RWxlbWVudD4pID0+IHtcclxuICAgIGlmIChkaXNhYmxlZCkgcmV0dXJuO1xyXG4gICAgaWYgKGV2LmtleSA9PT0gXCJBcnJvd0Rvd25cIikge1xyXG4gICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBzZXRPcGVuKHRydWUpO1xyXG4gICAgICBpZiAoZmlsdGVyZWQubGVuZ3RoKSBzZXRBY3RpdmVJbmRleCgoaWR4KSA9PiAoaWR4ICsgMSkgJSBmaWx0ZXJlZC5sZW5ndGgpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoZXYua2V5ID09PSBcIkFycm93VXBcIikge1xyXG4gICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBzZXRPcGVuKHRydWUpO1xyXG4gICAgICBpZiAoZmlsdGVyZWQubGVuZ3RoKSBzZXRBY3RpdmVJbmRleCgoaWR4KSA9PiAoaWR4IC0gMSArIGZpbHRlcmVkLmxlbmd0aCkgJSBmaWx0ZXJlZC5sZW5ndGgpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoZXYua2V5ID09PSBcIkVudGVyXCIpIHtcclxuICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgaWYgKGNsZWFyT25FbXB0eUlucHV0ICYmIHF1ZXJ5ICE9PSBudWxsICYmICFxdWVyeS50cmltKCkpIHtcclxuICAgICAgICBzZXRTaG93Tm90Rm91bmRTdGF0ZShmYWxzZSk7XHJcbiAgICAgICAgc2V0T3BlbihmYWxzZSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChvcGVuICYmIGZpbHRlcmVkLmxlbmd0aCkge1xyXG4gICAgICAgIHNlbGVjdE9wdGlvbihmaWx0ZXJlZFtyZXNvbHZlZEFjdGl2ZUluZGV4XSA/PyBmaWx0ZXJlZFswXSk7XHJcbiAgICAgIH0gZWxzZSBpZiAocXVlcnkgIT09IG51bGwgJiYgcXVlcnkudHJpbSgpKSB7XHJcbiAgICAgICAgY2xlYXJNYW51YWxWYWx1ZSh0cnVlLCB0cnVlKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzZXRTaG93Tm90Rm91bmRTdGF0ZShmYWxzZSk7XHJcbiAgICAgICAgc2V0T3Blbih0cnVlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKGV2LmtleSA9PT0gXCJFc2NhcGVcIikge1xyXG4gICAgICBpZiAocXVlcnkgIT09IG51bGwpIHtcclxuICAgICAgICBjbGVhck1hbnVhbFZhbHVlKGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzZXRTaG93Tm90Rm91bmRTdGF0ZShmYWxzZSk7XHJcbiAgICAgIHNldE9wZW4oZmFsc2UpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGNvbnN0IHNhZmVJZCA9IFN0cmluZyhpZEJhc2UgfHwgbGFiZWwgfHwgXCJzZWxlY3RcIik7XHJcbiAgY29uc3QgbGlzdElkID0gYHNlbGVjdC1vcHRpb25zLSR7c2FmZUlkfWA7XHJcbiAgY29uc3QgYWN0aXZlSWQgPVxyXG4gICAgb3BlbiAmJiBmaWx0ZXJlZFtyZXNvbHZlZEFjdGl2ZUluZGV4XSA/IGBzZWxlY3Qtb3B0LSR7c2FmZUlkfS0ke2ZpbHRlcmVkW3Jlc29sdmVkQWN0aXZlSW5kZXhdLnZhbHVlfWAgOiB1bmRlZmluZWQ7XHJcbiAgY29uc3QgbGlzdE9wZW4gPSBvcGVuICYmICFkaXNhYmxlZDtcclxuICBjb25zdCBzZWxlY3RlZFZhbHVlID0gU3RyaW5nKHNlbGVjdGVkPy52YWx1ZSA/PyBcIlwiKS50cmltKCk7XHJcbiAgY29uc3Qgc2VsZWN0ZWREaXNwbGF5VGV4dCA9IHNlbGVjdGVkVGV4dE1vZGUgPT09IFwidmFsdWVcIiA/IHNlbGVjdGVkVmFsdWUgOiBzZWxlY3RlZD8udGV4dCB8fCBcIlwiO1xyXG4gIGNvbnN0IGRpc3BsYXlWYWx1ZSA9IHF1ZXJ5ICE9PSBudWxsID8gcXVlcnkgOiAoc2VsZWN0ZWRWYWx1ZSA/IHNlbGVjdGVkRGlzcGxheVRleHQgOiBcIlwiKTtcclxuICBjb25zdCBzaG93U2VsZWN0ZWRJY29uID0gcXVlcnkgPT09IG51bGwgJiYgISFzZWxlY3RlZFZhbHVlICYmICEhc2VsZWN0ZWQ/Lmljb247XHJcbiAgY29uc3Qgc2hvd05vdEZvdW5kUm93ID0gc2hvd05vdEZvdW5kU3RhdGUgfHwgKCEhcXVlcnkgJiYgISFxdWVyeS50cmltKCkgJiYgZmlsdGVyZWQubGVuZ3RoID09PSAwKTtcclxuICBjb25zdCBub3JtYWxpemVkRHJvcGRvd25FeHBhbmRQeCA9IE51bWJlci5pc0Zpbml0ZShkcm9wZG93bkV4cGFuZFB4KSA/IE1hdGgubWF4KDAsIGRyb3Bkb3duRXhwYW5kUHgpIDogMDtcclxuICBjb25zdCBub3JtYWxpemVkRHJvcGRvd25NaW5XaWR0aFB4ID0gTnVtYmVyLmlzRmluaXRlKGRyb3Bkb3duTWluV2lkdGhQeCkgPyBNYXRoLm1heCgwLCBkcm9wZG93bk1pbldpZHRoUHgpIDogMDtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghbG9ja0Ryb3Bkb3duV2lkdGhPbkZpcnN0T3BlbikgcmV0dXJuO1xyXG4gICAgaWYgKCFsaXN0T3BlbikgcmV0dXJuO1xyXG4gICAgaWYgKGluaXRpYWxEcm9wZG93bldpZHRoUmVmLmN1cnJlbnQgIT09IG51bGwpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCB3aWR0aCA9IGJveFJlZi5jdXJyZW50Py5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcclxuICAgIGlmICghTnVtYmVyLmlzRmluaXRlKHdpZHRoKSB8fCAhd2lkdGggfHwgd2lkdGggPD0gMCkgcmV0dXJuO1xyXG4gICAgaW5pdGlhbERyb3Bkb3duV2lkdGhSZWYuY3VycmVudCA9IHdpZHRoO1xyXG4gIH0sIFtsaXN0T3BlbiwgbG9ja0Ryb3Bkb3duV2lkdGhPbkZpcnN0T3Blbl0pO1xyXG5cclxuICBjb25zdCBtZWFzdXJlZEFuY2hvcldpZHRoID0gYm94UmVmLmN1cnJlbnQ/LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRNZWFzdXJlZEFuY2hvcldpZHRoID1cclxuICAgIE51bWJlci5pc0Zpbml0ZShtZWFzdXJlZEFuY2hvcldpZHRoKSAmJiBtZWFzdXJlZEFuY2hvcldpZHRoICYmIG1lYXN1cmVkQW5jaG9yV2lkdGggPiAwID8gbWVhc3VyZWRBbmNob3JXaWR0aCA6IG51bGw7XHJcbiAgY29uc3QgZml4ZWREcm9wZG93bkJhc2VXaWR0aCA9IGxvY2tEcm9wZG93bldpZHRoT25GaXJzdE9wZW5cclxuICAgID8gaW5pdGlhbERyb3Bkb3duV2lkdGhSZWYuY3VycmVudCA/PyBub3JtYWxpemVkTWVhc3VyZWRBbmNob3JXaWR0aFxyXG4gICAgOiBub3JtYWxpemVkTWVhc3VyZWRBbmNob3JXaWR0aDtcclxuICBjb25zdCBmaXhlZERyb3Bkb3duRXhwYW5kZWRXaWR0aCA9XHJcbiAgICBmaXhlZERyb3Bkb3duQmFzZVdpZHRoICE9PSBudWxsICYmIE51bWJlci5pc0Zpbml0ZShmaXhlZERyb3Bkb3duQmFzZVdpZHRoKVxyXG4gICAgICA/IGZpeGVkRHJvcGRvd25CYXNlV2lkdGggKyBub3JtYWxpemVkRHJvcGRvd25FeHBhbmRQeFxyXG4gICAgICA6IG51bGw7XHJcbiAgY29uc3QgcmVzb2x2ZWREcm9wZG93bldpZHRoUHggPVxyXG4gICAgZml4ZWREcm9wZG93bkV4cGFuZGVkV2lkdGggIT09IG51bGxcclxuICAgICAgPyBNYXRoLm1heChmaXhlZERyb3Bkb3duRXhwYW5kZWRXaWR0aCwgbm9ybWFsaXplZERyb3Bkb3duTWluV2lkdGhQeCB8fCAwKVxyXG4gICAgICA6IG51bGw7XHJcbiAgY29uc3QgaW5saW5lRHJvcGRvd25TdHlsZTogUmVhY3QuQ1NTUHJvcGVydGllcyB8IHVuZGVmaW5lZCA9XHJcbiAgICByZXNvbHZlZERyb3Bkb3duV2lkdGhQeCAhPT0gbnVsbCAmJiByZXNvbHZlZERyb3Bkb3duV2lkdGhQeCA+IDBcclxuICAgICAgPyB7XHJcbiAgICAgICAgICB3aWR0aDogYCR7cmVzb2x2ZWREcm9wZG93bldpZHRoUHh9cHhgLFxyXG4gICAgICAgICAgLi4uKG5vcm1hbGl6ZWREcm9wZG93bk1pbldpZHRoUHggPiAwID8geyBtaW5XaWR0aDogYCR7bm9ybWFsaXplZERyb3Bkb3duTWluV2lkdGhQeH1weGAgfSA6IHt9KSxcclxuICAgICAgICB9XHJcbiAgICAgIDogbm9ybWFsaXplZERyb3Bkb3duRXhwYW5kUHggPiAwXHJcbiAgICAgICAgPyB7XHJcbiAgICAgICAgICAgIHdpZHRoOiBgY2FsYygxMDAlICsgJHtub3JtYWxpemVkRHJvcGRvd25FeHBhbmRQeH1weClgLFxyXG4gICAgICAgICAgICAuLi4obm9ybWFsaXplZERyb3Bkb3duTWluV2lkdGhQeCA+IDAgPyB7IG1pbldpZHRoOiBgJHtub3JtYWxpemVkRHJvcGRvd25NaW5XaWR0aFB4fXB4YCB9IDoge30pLFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIDogbm9ybWFsaXplZERyb3Bkb3duTWluV2lkdGhQeCA+IDBcclxuICAgICAgICAgID8geyBtaW5XaWR0aDogYCR7bm9ybWFsaXplZERyb3Bkb3duTWluV2lkdGhQeH1weGAgfVxyXG4gICAgICAgIDogdW5kZWZpbmVkO1xyXG5cclxuICBjb25zdCBsaXN0Qm9keSA9IChcclxuICAgIDxkaXYgaWQ9e2xpc3RJZH0gcmVmPXtsaXN0UmVmfSByb2xlPVwibGlzdGJveFwiIGFyaWEtbGFiZWw9e2xhYmVsfT5cclxuICAgICAge3Nob3dOb3RGb3VuZFJvdyA/IDxkaXYgY2xhc3NOYW1lPVwicHgtNCBweS0yIHRleHQtc20gdGV4dC1zbGF0ZS01MDBcIj57aW5kVChcIkNvbW1vbl9Ob3RGb3VuZFwiLCBcIk5vdCBmb3VuZFwiKX08L2Rpdj4gOiBudWxsfVxyXG4gICAgICB7ZmlsdGVyZWQubWFwKChvcHQsIGlkeCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHNlbCA9IHNlbGVjdGVkPy52YWx1ZSA9PT0gb3B0LnZhbHVlO1xyXG4gICAgICAgIGNvbnN0IGlzQWN0aXZlID0gaWR4ID09PSByZXNvbHZlZEFjdGl2ZUluZGV4O1xyXG4gICAgICAgIGNvbnN0IG9wdGlvblN0YXRlQ2xhc3NOYW1lID0gc2VsID8gb3B0aW9uU2VsZWN0ZWRDbGFzc05hbWUgOiBpc0FjdGl2ZSA/IG9wdGlvbkFjdGl2ZUNsYXNzTmFtZSA6IG9wdGlvbkRlZmF1bHRDbGFzc05hbWU7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgICAgIGtleT17U3RyaW5nKG9wdC52YWx1ZSl9XHJcbiAgICAgICAgICAgIGlkPXtgc2VsZWN0LW9wdC0ke3NhZmVJZH0tJHtvcHQudmFsdWV9YH1cclxuICAgICAgICAgICAgcm9sZT1cIm9wdGlvblwiXHJcbiAgICAgICAgICAgIGFyaWEtc2VsZWN0ZWQ9e3NlbH1cclxuICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxyXG4gICAgICAgICAgICAgIFwicmVsYXRpdmUgZmxleCB3LWZ1bGwgY3Vyc29yLWRlZmF1bHQgc2VsZWN0LW5vbmUgaXRlbXMtY2VudGVyIHB5LTIgcHItMyB0ZXh0LWxlZnQgdGV4dC1zbVwiLFxyXG4gICAgICAgICAgICAgIG9wdGlvbkxlZnRQYWRkaW5nQ2xhc3NOYW1lLFxyXG4gICAgICAgICAgICAgIGRpc2FibGVEZWZhdWx0T3B0aW9uUGFkZGluZyA/IFwiXCIgOiBcInR5cGUtb3B0aW9uXCIsXHJcbiAgICAgICAgICAgICAgb3B0aW9uU3RhdGVDbGFzc05hbWVcclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgc3R5bGU9e1xyXG4gICAgICAgICAgICAgIGFsbG93T3B0aW9uSG9yaXpvbnRhbFNjcm9sbFxyXG4gICAgICAgICAgICAgICAgPyB7IG92ZXJmbG93WDogXCJhdXRvXCIsIG92ZXJmbG93WTogXCJoaWRkZW5cIiwgV2Via2l0T3ZlcmZsb3dTY3JvbGxpbmc6IFwidG91Y2hcIiB9XHJcbiAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9uTW91c2VFbnRlcj17KCkgPT4gc2V0QWN0aXZlSW5kZXgoaWR4KX1cclxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2VsZWN0T3B0aW9uKG9wdCl9XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIHtzZWwgJiYgKFxyXG4gICAgICAgICAgICAgIDxzcGFuXHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXHJcbiAgICAgICAgICAgICAgICAgIFwiYWJzb2x1dGUgaW5zZXQteS0wIGxlZnQtMCBmbGV4IGl0ZW1zLWNlbnRlciBwbC0yXCIsXHJcbiAgICAgICAgICAgICAgICAgIGlzQWN0aXZlID8gXCJ0ZXh0LXdoaXRlXCIgOiBcInRleHQtcHJpbWFyeVwiXHJcbiAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgID48L3NwYW4+XHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgIDxzcGFuXHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxyXG4gICAgICAgICAgICAgICAgYWxsb3dPcHRpb25Ib3Jpem9udGFsU2Nyb2xsID8gXCJpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIiA6IFwiZmxleCBtaW4tdy0wIGl0ZW1zLWNlbnRlciBnYXAtMlwiLFxyXG4gICAgICAgICAgICAgICAgc2VsID8gXCJmb250LW1lZGl1bVwiIDogXCJmb250LW5vcm1hbFwiXHJcbiAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICBzdHlsZT17YWxsb3dPcHRpb25Ib3Jpem9udGFsU2Nyb2xsID8geyBtaW5XaWR0aDogXCJtYXgtY29udGVudFwiIH0gOiB1bmRlZmluZWR9XHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICB7b3B0Lmljb24gPyAoXHJcbiAgICAgICAgICAgICAgICA8c3BhblxyXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXHJcbiAgICAgICAgICAgICAgICAgICAgXCJpbmxpbmUtZmxleCBzaHJpbmstMCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXJcIixcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb25JY29uQ2xhc3NOYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIGlzQWN0aXZlID8gXCJ0ZXh0LXdoaXRlXCIgOiBcInRleHQtc2xhdGUtNTAwXCJcclxuICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAge29wdC5pY29ufVxyXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICkgOiBudWxsfVxyXG4gICAgICAgICAgICAgIDxzcGFuXHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoYWxsb3dPcHRpb25Ib3Jpem9udGFsU2Nyb2xsID8gXCJibG9ja1wiIDogXCJibG9jayB0cnVuY2F0ZVwiLCBvcHRpb25UZXh0Q2xhc3NOYW1lKX1cclxuICAgICAgICAgICAgICAgIHN0eWxlPXthbGxvd09wdGlvbkhvcml6b250YWxTY3JvbGwgPyB7IHdoaXRlU3BhY2U6IFwibm93cmFwXCIgfSA6IHVuZGVmaW5lZH1cclxuICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICB7b3B0LnRleHR9XHJcbiAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICApO1xyXG4gICAgICB9KX1cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2XHJcbiAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcInNwYWNlLXktMlwiLCBkaXNhYmxlZCA/IFwicG9pbnRlci1ldmVudHMtbm9uZSBzZWxlY3Qtbm9uZVwiIDogXCJcIil9XHJcbiAgICAgIHJlZj17Y29udGFpbmVyUmVmfVxyXG4gICAgPlxyXG4gICAgICB7c2hvd0xhYmVsID8gPGxhYmVsIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZFwiLCBpbnZhbGlkID8gXCJ0ZXh0LXJvc2UtNzAwXCIgOiBcIlwiKX0+e2xhYmVsfTwvbGFiZWw+IDogbnVsbH1cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZVwiPlxyXG4gICAgICAgIDxkaXZcclxuICAgICAgICAgIHJlZj17Ym94UmVmfVxyXG4gICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxyXG4gICAgICAgICAgICBcInJlbGF0aXZlIHctZnVsbCBjdXJzb3ItZGVmYXVsdCByb3VuZGVkLXhsIGJnLXdoaXRlIHRleHQtbGVmdCBmb2N1cy13aXRoaW46Ym9yZGVyLXByaW1hcnkgZm9jdXMtd2l0aGluOnJpbmctMiBmb2N1cy13aXRoaW46cmluZy1wcmltYXJ5IGZvY3VzLXdpdGhpbjpyaW5nLW9mZnNldC13aGl0ZSBzbTp0ZXh0LXNtXCIsXHJcbiAgICAgICAgICAgIHJlYWRPbmx5TW9kZSA/IFwiaW5kLXJlYWRvbmx5LWZpZWxkXCIgOiBcIlwiXHJcbiAgICAgICAgICApfVxyXG4gICAgICAgICAgc3R5bGU9e3JlYWRPbmx5TW9kZSA/IHsgY29sb3I6IHZhbHVlQ29sb3IgfSA6IHVuZGVmaW5lZH1cclxuICAgICAgICA+XHJcbiAgICAgICAgICA8aW5wdXRcclxuICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxyXG4gICAgICAgICAgICAgIFwidy1mdWxsIHJvdW5kZWQteGwgYm9yZGVyIHB5LTIgdGV4dC1zbSBzbTp0ZXh0LWJhc2UgbGVhZGluZy01IGZvY3VzOm91dGxpbmUtaGlkZGVuIGZvY3VzOnJpbmctMiBkaXNhYmxlZDpiZy1zbGF0ZS0xMDAgZGlzYWJsZWQ6dGV4dC1zbGF0ZS01MDAgZGlzYWJsZWQ6Ym9yZGVyLXNsYXRlLTIwMCBkaXNhYmxlZDpjdXJzb3Itbm90LWFsbG93ZWRcIixcclxuICAgICAgICAgICAgICBzaG93U2VsZWN0ZWRJY29uID8gc2VsZWN0ZWRJbnB1dFBhZGRpbmdDbGFzc05hbWUgOiBcInBsLTNcIixcclxuICAgICAgICAgICAgICBzaG93U2VhcmNoQnV0dG9uID8gXCJwci0yMFwiIDogXCJwci0xMFwiLFxyXG4gICAgICAgICAgICAgIGludmFsaWRcclxuICAgICAgICAgICAgICAgID8gXCJib3JkZXItcm9zZS00MDAgYmctcm9zZS01MCBmb2N1czpyaW5nLXJvc2UtMjAwIGZvY3VzOmJvcmRlci1yb3NlLTQwMFwiXHJcbiAgICAgICAgICAgICAgICA6IFwiYm9yZGVyLXNsYXRlLTIwMCBmb2N1czpyaW5nLXByaW1hcnkgZm9jdXM6Ym9yZGVyLXByaW1hcnlcIixcclxuICAgICAgICAgICAgICByZWFkT25seU1vZGUgPyBcImluZC1yZWFkb25seS1maWVsZFwiIDogXCJ0ZXh0LXNsYXRlLTkwMFwiXHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgIHN0eWxlPXtyZWFkT25seU1vZGUgPyB7IGNvbG9yOiB2YWx1ZUNvbG9yIH0gOiB1bmRlZmluZWR9XHJcbiAgICAgICAgICAgIHZhbHVlPXtkaXNwbGF5VmFsdWV9XHJcbiAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cclxuICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgIGlmICghYWxsb3dUZXh0SW5wdXQpIHJldHVybjtcclxuICAgICAgICAgICAgICBjb25zdCB2YWwgPSBldmVudC50YXJnZXQudmFsdWU7XHJcbiAgICAgICAgICAgICAgc2V0QWN0aXZlSW5kZXgoMCk7XHJcbiAgICAgICAgICAgICAgc2V0U2hvd05vdEZvdW5kU3RhdGUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgIHNldFF1ZXJ5KHZhbCk7XHJcbiAgICAgICAgICAgICAgaWYgKGNsZWFyT25FbXB0eUlucHV0ICYmICF2YWwudHJpbSgpKSB7XHJcbiAgICAgICAgICAgICAgICBjbGVhck1hbnVhbFZhbHVlKGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIHNldE9wZW4odHJ1ZSk7XHJcbiAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgIG9uS2V5RG93bj17aGFuZGxlS2V5RG93bn1cclxuICAgICAgICAgICAgb25Gb2N1cz17KCkgPT4ge1xyXG4gICAgICAgICAgICAgIGlmICghZGlzYWJsZWQpIHNldE9wZW4odHJ1ZSk7XHJcbiAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cclxuICAgICAgICAgICAgcmVhZE9ubHk9e3JlYWRPbmx5TW9kZSB8fCAhYWxsb3dUZXh0SW5wdXR9XHJcbiAgICAgICAgICAgIGFyaWEtbGFiZWw9e2xhYmVsfVxyXG4gICAgICAgICAgICByb2xlPVwiY29tYm9ib3hcIlxyXG4gICAgICAgICAgICBhcmlhLWV4cGFuZGVkPXtsaXN0T3Blbn1cclxuICAgICAgICAgICAgYXJpYS1jb250cm9scz17bGlzdElkfVxyXG4gICAgICAgICAgICBhcmlhLWFjdGl2ZWRlc2NlbmRhbnQ9e2FjdGl2ZUlkfVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICAgIHtzaG93U2VsZWN0ZWRJY29uID8gKFxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJwb2ludGVyLWV2ZW50cy1ub25lIGFic29sdXRlIGluc2V0LXktMCBsZWZ0LTAgZmxleCBpdGVtcy1jZW50ZXIgcGwtMyB0ZXh0LXNsYXRlLTUwMFwiPlxyXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcImlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlclwiLCBzZWxlY3RlZEljb25DbGFzc05hbWUpfT57c2VsZWN0ZWQuaWNvbn08L3NwYW4+XHJcbiAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICkgOiBudWxsfVxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC15LTAgcmlnaHQtMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSBwci0yXCI+XHJcbiAgICAgICAgICAgIHtzaG93U2VhcmNoQnV0dG9uID8gKFxyXG4gICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgcC0xLjUgdGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC1zbGF0ZS01MDBcIlxyXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICBpZiAoZGlzYWJsZWQpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgaWYgKHF1ZXJ5ICE9PSBudWxsICYmIHF1ZXJ5LnRyaW0oKSAmJiBmaWx0ZXJlZC5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBjbGVhck1hbnVhbFZhbHVlKHRydWUsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICBzZXRPcGVuKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2luZFQoXCJDb21tb25fU2VhcmNoXCIsIFwiU2VhcmNoXCIpfVxyXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxyXG4gICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGZpbGw9XCJub25lXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIHN0cm9rZVdpZHRoPXsxLjV9IHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIGNsYXNzTmFtZT1cImgtNSB3LTVcIj5cclxuICAgICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJtMTUuNzUgMTUuNzUtMi40ODktMi40ODltMCAwYTMuMzc1IDMuMzc1IDAgMSAwLTQuNzczLTQuNzczIDMuMzc1IDMuMzc1IDAgMCAwIDQuNzc0IDQuNzc0Wk0yMSAxMmE5IDkgMCAxIDEtMTggMCA5IDkgMCAwIDEgMTggMFpcIiAvPlxyXG4gICAgICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICkgOiBudWxsfVxyXG4gICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgcC0xLjUgdGV4dC1zbGF0ZS01MDAgaG92ZXI6dGV4dC1zbGF0ZS02MDBcIlxyXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChkaXNhYmxlZCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgaWYgKG9wZW4gJiYgcXVlcnkgIT09IG51bGwgJiYgcXVlcnkudHJpbSgpKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNsZWFyTWFudWFsVmFsdWUoZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc2V0T3BlbigocHJldikgPT4gIXByZXYpO1xyXG4gICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgYXJpYS1sYWJlbD17b3BlbiA/IGluZFQoXCJEcm9wZG93bl9IaWRlT3B0aW9uc1wiLCBcIkhpZGUgb3B0aW9uc1wiKSA6IGluZFQoXCJEcm9wZG93bl9TaG93T3B0aW9uc1wiLCBcIlNob3cgb3B0aW9uc1wiKX1cclxuICAgICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICB7b3BlbiA/IDxDaGV2cm9uVXBTdmcgY2xhc3NOYW1lPVwiaC01IHctNVwiIC8+IDogPENoZXZyb25Eb3duU3ZnIGNsYXNzTmFtZT1cImgtNSB3LTVcIiAvPn1cclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICB7dXNlUG9ydGFsID8gKFxyXG4gICAgICAgICAgPEZsb2F0aW5nTGlzdFxyXG4gICAgICAgICAgICBhbmNob3JSZWY9e2JveFJlZn1cclxuICAgICAgICAgICAgb3Blbj17bGlzdE9wZW59XHJcbiAgICAgICAgICAgIHpJbmRleD17MzYwMDAwfVxyXG4gICAgICAgICAgICBmaXhlZFdpZHRoUHg9e3Jlc29sdmVkRHJvcGRvd25XaWR0aFB4ID8/IHVuZGVmaW5lZH1cclxuICAgICAgICAgICAgcGFuZWxTdHlsZT17cGFuZWxTdHlsZX1cclxuICAgICAgICAgICAgbWF4SGVpZ2h0Q2xhc3M9e2Ryb3Bkb3duTWF4SGVpZ2h0Q2xhc3N9XHJcbiAgICAgICAgICAgIHJvbGU9XCJsaXN0Ym94XCJcclxuICAgICAgICAgICAgcm91bmRlZENsYXNzPVwicm91bmRlZC14bFwiXHJcbiAgICAgICAgICAgIHBvcnRhbENsYXNzTmFtZT17cG9ydGFsQ2xhc3NOYW1lfVxyXG4gICAgICAgICAgICBwYW5lbENsYXNzTmFtZT17cGFuZWxDbGFzc05hbWV9XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIHtsaXN0Qm9keX1cclxuICAgICAgICAgIDwvRmxvYXRpbmdMaXN0PlxyXG4gICAgICAgICkgOiAoXHJcbiAgICAgICAgICBsaXN0T3BlbiAmJiAoXHJcbiAgICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2BhYnNvbHV0ZSB6LTM2MDAwMCBtdC0xIHctZnVsbCByb3VuZGVkLXhsIGJnLXdoaXRlIHNoYWRvdy1sZyByaW5nLTEgcmluZy1ibGFjay81IGZvY3VzOm91dGxpbmUtaGlkZGVuICR7ZHJvcGRvd25NYXhIZWlnaHRDbGFzc30gb3ZlcmZsb3ctYXV0byAke3BhbmVsQ2xhc3NOYW1lIHx8IFwiXCJ9YH1cclxuICAgICAgICAgICAgICBzdHlsZT17eyAuLi5pbmxpbmVEcm9wZG93blN0eWxlLCAuLi4ocGFuZWxTdHlsZSB8fCB7fSkgfX1cclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIHtsaXN0Qm9keX1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICApXHJcbiAgICAgICAgKX1cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2VsZWN0Q29tYm9ib3g7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1CQUE0RDtBQTBSbkM7QUFsUXpCLElBQU0sZUFBaUMsRUFBRSxPQUFPLElBQUksTUFBTSxHQUFHO0FBRTdELElBQU0sc0JBQXNCLENBQUMsVUFBc0Q7QUFDakYsU0FBTyxPQUFPLFNBQVMsRUFBRSxFQUFFLEtBQUssRUFBRSxZQUFZO0FBQ2hEO0FBdUNBLElBQU0saUJBQWlCLENBQUM7QUFBQSxFQUN0QjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBLFVBQVU7QUFBQSxFQUNWLFdBQVc7QUFBQSxFQUNYLFdBQVc7QUFBQSxFQUNYLFlBQVk7QUFBQSxFQUNaLG9CQUFvQjtBQUFBLEVBQ3BCO0FB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
