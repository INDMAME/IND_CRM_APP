import {
  ChevronDownSvg,
  ChevronUpSvg,
  FloatingList_default,
  useOutsideClick
} from "./chunk-USUN7TKP.js";
import {
  classNames,
  indT
} from "./chunk-GEXVJWY3.js";
import {
  require_jsx_runtime,
  require_react
} from "./chunk-KJNAPDCZ.js";
import {
  __toESM
} from "./chunk-45FWCHS2.js";

// Web/wwwroot/react/src/components/commons/SelectCombobox.tsx
var import_react = __toESM(require_react());
var import_jsx_runtime = __toESM(require_jsx_runtime());
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
    data.find((d) => String(d.value) === String(value)) || { value: "", text: "" }
  );
  const [open, setOpen] = (0, import_react.useState)(false);
  const [activeIndex, setActiveIndex] = (0, import_react.useState)(0);
  const containerRef = (0, import_react.useRef)(null);
  const boxRef = (0, import_react.useRef)(null);
  const listRef = (0, import_react.useRef)(null);
  const initialDropdownWidthRef = (0, import_react.useRef)(null);
  useOutsideClick([containerRef, listRef], () => setOpen(false));
  (0, import_react.useEffect)(() => {
    setSelected(data.find((d) => String(d.value) === String(value)) || { value: "", text: "" });
  }, [value, data]);
  (0, import_react.useEffect)(() => {
    setQuery(null);
  }, [selected]);
  (0, import_react.useEffect)(() => {
    if (!emitOnValueChange) return;
    onChange(selected?.value ? String(selected.value) : "");
  }, [emitOnValueChange, onChange, selected]);
  const filtered = (0, import_react.useMemo)(() => {
    if (!query || !query.trim()) return data;
    const f = data.filter((o) => {
      const optionValue = String(o.value ?? "").trim();
      if (!optionValue) {
        return false;
      }
      return o.text.toLowerCase().includes(query.toLowerCase());
    });
    return f.length ? f : data;
  }, [data, query]);
  (0, import_react.useEffect)(() => {
    setActiveIndex(0);
  }, [filtered.length, query]);
  const selectOption = (opt) => {
    setSelected(opt);
    setQuery(null);
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
        setOpen(false);
        return;
      }
      if (open && filtered.length) {
        selectOption(filtered[activeIndex] ?? filtered[0]);
      } else {
        setOpen(true);
      }
    }
    if (ev.key === "Escape") setOpen(false);
  };
  const safeId = String(idBase || label || "select");
  const listId = `select-options-${safeId}`;
  const activeId = open && filtered[activeIndex] ? `select-opt-${safeId}-${filtered[activeIndex].value}` : void 0;
  const listOpen = open && !disabled;
  const selectedValue = String(selected?.value ?? "").trim();
  const selectedDisplayText = selectedTextMode === "value" ? selectedValue : selected?.text || "";
  const displayValue = query !== null ? query : selectedValue ? selectedDisplayText : "";
  const showSelectedIcon = query === null && !!selectedValue && !!selected?.icon;
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
  const fixedDropdownBaseWidth = lockDropdownWidthOnFirstOpen ? initialDropdownWidthRef.current : null;
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
    filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "px-4 py-2 text-sm text-slate-500", children: indT("Dropdown_NoResults", "No results") }),
    filtered.map((opt, idx) => {
      const sel = selected?.value === opt.value;
      const isActive = idx === activeIndex;
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
                      setQuery(val);
                      if (clearOnEmptyInput && !val.trim()) {
                        setSelected({ value: "", text: "" });
                        setOpen(false);
                        if (!emitOnValueChange) {
                          onChange("");
                        }
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9TZWxlY3RDb21ib2JveC50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBGbG9hdGluZ0xpc3QgZnJvbSBcIi4vRmxvYXRpbmdMaXN0LnRzeFwiO1xuaW1wb3J0IHsgQ2hldnJvbkRvd25TdmcsIENoZXZyb25VcFN2ZyB9IGZyb20gXCIuL2NoZXZyb25zLnRzeFwiO1xuaW1wb3J0IHsgdXNlT3V0c2lkZUNsaWNrIH0gZnJvbSBcIi4uLy4uL2hvb2tzL3VzZU91dHNpZGVDbGljay50c1wiO1xuaW1wb3J0IHsgY2xhc3NOYW1lcyB9IGZyb20gXCIuLi8uLi91dGlscy9jbGFzc05hbWVzLnRzXCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcblxudHlwZSBSYXdPcHRpb24gPVxuICB8IHtcbiAgICAgIHZhbHVlPzogc3RyaW5nIHwgbnVtYmVyO1xuICAgICAgVmFsdWU/OiBzdHJpbmcgfCBudW1iZXI7XG4gICAgICB0ZXh0Pzogc3RyaW5nO1xuICAgICAgVGV4dD86IHN0cmluZztcbiAgICAgIGljb24/OiBSZWFjdC5SZWFjdE5vZGU7XG4gICAgICBJY29uPzogUmVhY3QuUmVhY3ROb2RlO1xuICAgIH1cbiAgfCBbc3RyaW5nIHwgbnVtYmVyLCBzdHJpbmddO1xuXG50eXBlIE5vcm1hbGl6ZWRPcHRpb24gPSB7XG4gIHZhbHVlOiBzdHJpbmcgfCBudW1iZXI7XG4gIHRleHQ6IHN0cmluZztcbiAgaWNvbj86IFJlYWN0LlJlYWN0Tm9kZTtcbn07XG5cbnR5cGUgU2VsZWN0Q29tYm9ib3hQcm9wcyA9IHtcbiAgbGFiZWw6IHN0cmluZztcbiAgb3B0aW9uczogUmF3T3B0aW9uW107XG4gIHZhbHVlOiBzdHJpbmcgfCBudW1iZXI7XG4gIG9uQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgcGxhY2Vob2xkZXI/OiBzdHJpbmc7XG4gIGludmFsaWQ/OiBib29sZWFuO1xuICBkaXNhYmxlZD86IGJvb2xlYW47XG4gIHJlYWRPbmx5PzogYm9vbGVhbjtcbiAgdXNlUG9ydGFsPzogYm9vbGVhbjtcbiAgZW1pdE9uVmFsdWVDaGFuZ2U/OiBib29sZWFuO1xuICBpZEJhc2U/OiBzdHJpbmc7XG4gIHBvcnRhbENsYXNzTmFtZT86IHN0cmluZztcbiAgcGFuZWxDbGFzc05hbWU/OiBzdHJpbmc7XG4gIHNob3dTZWFyY2hCdXR0b24/OiBib29sZWFuO1xuICBhbGxvd1RleHRJbnB1dD86IGJvb2xlYW47XG4gIHNob3dMYWJlbD86IGJvb2xlYW47XG4gIHNlbGVjdGVkVGV4dE1vZGU/OiBcInRleHRcIiB8IFwidmFsdWVcIjtcbiAgZHJvcGRvd25FeHBhbmRQeD86IG51bWJlcjtcbiAgZHJvcGRvd25NaW5XaWR0aFB4PzogbnVtYmVyO1xuICBkcm9wZG93bk1heEhlaWdodENsYXNzPzogc3RyaW5nO1xuICBzZWxlY3RlZEljb25DbGFzc05hbWU/OiBzdHJpbmc7XG4gIG9wdGlvbkljb25DbGFzc05hbWU/OiBzdHJpbmc7XG4gIGFsbG93T3B0aW9uSG9yaXpvbnRhbFNjcm9sbD86IGJvb2xlYW47XG4gIGxvY2tEcm9wZG93bldpZHRoT25GaXJzdE9wZW4/OiBib29sZWFuO1xuICBkaXNhYmxlRGVmYXVsdE9wdGlvblBhZGRpbmc/OiBib29sZWFuO1xuICBvcHRpb25MZWZ0UGFkZGluZ0NsYXNzTmFtZT86IHN0cmluZztcbiAgb3B0aW9uVGV4dENsYXNzTmFtZT86IHN0cmluZztcbiAgb3B0aW9uRGVmYXVsdENsYXNzTmFtZT86IHN0cmluZztcbiAgb3B0aW9uQWN0aXZlQ2xhc3NOYW1lPzogc3RyaW5nO1xuICBvcHRpb25TZWxlY3RlZENsYXNzTmFtZT86IHN0cmluZztcbiAgc2VsZWN0ZWRJbnB1dFBhZGRpbmdDbGFzc05hbWU/OiBzdHJpbmc7XG4gIHBhbmVsU3R5bGU/OiBSZWFjdC5DU1NQcm9wZXJ0aWVzO1xuICBjbGVhck9uRW1wdHlJbnB1dD86IGJvb2xlYW47XG59O1xuXG4vLyBSZXVzYWJsZSBzZWxlY3QgY29tYm9ib3ggd2l0aCBvcHRpb25hbCBwb3J0YWwgcmVuZGVyaW5nIGZvciB0aGUgbGlzdC5cbmNvbnN0IFNlbGVjdENvbWJvYm94ID0gKHtcbiAgbGFiZWwsXG4gIG9wdGlvbnMsXG4gIHZhbHVlLFxuICBvbkNoYW5nZSxcbiAgcGxhY2Vob2xkZXIsXG4gIGludmFsaWQgPSBmYWxzZSxcbiAgZGlzYWJsZWQgPSBmYWxzZSxcbiAgcmVhZE9ubHkgPSBmYWxzZSxcbiAgdXNlUG9ydGFsID0gdHJ1ZSxcbiAgZW1pdE9uVmFsdWVDaGFuZ2UgPSBmYWxzZSxcbiAgaWRCYXNlLFxuICBwb3J0YWxDbGFzc05hbWUsXG4gIHBhbmVsQ2xhc3NOYW1lLFxuICBzaG93U2VhcmNoQnV0dG9uID0gZmFsc2UsXG4gIGFsbG93VGV4dElucHV0ID0gdHJ1ZSxcbiAgc2hvd0xhYmVsID0gdHJ1ZSxcbiAgc2VsZWN0ZWRUZXh0TW9kZSA9IFwidGV4dFwiLFxuICBkcm9wZG93bkV4cGFuZFB4ID0gMCxcbiAgZHJvcGRvd25NaW5XaWR0aFB4ID0gMCxcbiAgZHJvcGRvd25NYXhIZWlnaHRDbGFzcyA9IFwibWF4LWgtNzJcIixcbiAgc2VsZWN0ZWRJY29uQ2xhc3NOYW1lID0gXCJoLTQgdy00XCIsXG4gIG9wdGlvbkljb25DbGFzc05hbWUgPSBcImgtNCB3LTRcIixcbiAgYWxsb3dPcHRpb25Ib3Jpem9udGFsU2Nyb2xsID0gZmFsc2UsXG4gIGxvY2tEcm9wZG93bldpZHRoT25GaXJzdE9wZW4gPSBmYWxzZSxcbiAgZGlzYWJsZURlZmF1bHRPcHRpb25QYWRkaW5nID0gZmFsc2UsXG4gIG9wdGlvbkxlZnRQYWRkaW5nQ2xhc3NOYW1lID0gXCJcIixcbiAgb3B0aW9uVGV4dENsYXNzTmFtZSA9IFwiXCIsXG4gIG9wdGlvbkRlZmF1bHRDbGFzc05hbWUgPSBcInRleHQtc2xhdGUtOTAwXCIsXG4gIG9wdGlvbkFjdGl2ZUNsYXNzTmFtZSA9IFwiYmctcHJpbWFyeSB0ZXh0LXdoaXRlXCIsXG4gIG9wdGlvblNlbGVjdGVkQ2xhc3NOYW1lID0gXCJiZy1wcmltYXJ5IHRleHQtd2hpdGVcIixcbiAgc2VsZWN0ZWRJbnB1dFBhZGRpbmdDbGFzc05hbWUgPSBcInBsLTlcIixcbiAgcGFuZWxTdHlsZSxcbiAgY2xlYXJPbkVtcHR5SW5wdXQgPSBmYWxzZSxcbn06IFNlbGVjdENvbWJvYm94UHJvcHMpID0+IHtcbiAgY29uc3QgcmVhZE9ubHlNb2RlID0gcmVhZE9ubHkgfHwgZGlzYWJsZWQ7XG4gIGNvbnN0IHZhbHVlQ29sb3IgPSByZWFkT25seU1vZGUgPyBcIiM2NDc0OGJcIiA6IFwiIzAwMjk2YmUwXCI7XG4gIGNvbnN0IGRhdGEgPSB1c2VNZW1vKCgpID0+IHtcbiAgICByZXR1cm4gKG9wdGlvbnMgfHwgW10pLm1hcDxOb3JtYWxpemVkT3B0aW9uPigobykgPT4ge1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkobykpIHtcbiAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG9bMF0gPz8gXCJcIiwgdGV4dDogb1sxXSA/PyBcIlwiIH07XG4gICAgICB9XG4gICAgICByZXR1cm4ge1xuICAgICAgICB2YWx1ZTogbz8udmFsdWUgPz8gbz8uVmFsdWUgPz8gXCJcIixcbiAgICAgICAgdGV4dDogbz8udGV4dCA/PyBvPy5UZXh0ID8/IFwiXCIsXG4gICAgICAgIGljb246IG8/Lmljb24gPz8gbz8uSWNvbixcbiAgICAgIH07XG4gICAgfSk7XG4gIH0sIFtvcHRpb25zXSk7XG5cbiAgY29uc3QgW3F1ZXJ5LCBzZXRRdWVyeV0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW3NlbGVjdGVkLCBzZXRTZWxlY3RlZF0gPSB1c2VTdGF0ZShcbiAgICBkYXRhLmZpbmQoKGQpID0+IFN0cmluZyhkLnZhbHVlKSA9PT0gU3RyaW5nKHZhbHVlKSkgfHwgeyB2YWx1ZTogXCJcIiwgdGV4dDogXCJcIiB9XG4gICk7XG4gIGNvbnN0IFtvcGVuLCBzZXRPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2FjdGl2ZUluZGV4LCBzZXRBY3RpdmVJbmRleF0gPSB1c2VTdGF0ZSgwKTtcbiAgY29uc3QgY29udGFpbmVyUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IGJveFJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBsaXN0UmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IGluaXRpYWxEcm9wZG93bldpZHRoUmVmID0gdXNlUmVmPG51bWJlciB8IG51bGw+KG51bGwpO1xuXG4gIHVzZU91dHNpZGVDbGljayhbY29udGFpbmVyUmVmLCBsaXN0UmVmXSwgKCkgPT4gc2V0T3BlbihmYWxzZSkpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc2V0U2VsZWN0ZWQoZGF0YS5maW5kKChkKSA9PiBTdHJpbmcoZC52YWx1ZSkgPT09IFN0cmluZyh2YWx1ZSkpIHx8IHsgdmFsdWU6IFwiXCIsIHRleHQ6IFwiXCIgfSk7XG4gIH0sIFt2YWx1ZSwgZGF0YV0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgLy8gUmVzZXQgdHlwZWQgc2VhcmNoIHRleHQgYWZ0ZXIgZXh0ZXJuYWwgdmFsdWUgY2hhbmdlcy5cbiAgICBzZXRRdWVyeShudWxsKTtcbiAgfSwgW3NlbGVjdGVkXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWVtaXRPblZhbHVlQ2hhbmdlKSByZXR1cm47XG4gICAgb25DaGFuZ2Uoc2VsZWN0ZWQ/LnZhbHVlID8gU3RyaW5nKHNlbGVjdGVkLnZhbHVlKSA6IFwiXCIpO1xuICB9LCBbZW1pdE9uVmFsdWVDaGFuZ2UsIG9uQ2hhbmdlLCBzZWxlY3RlZF0pO1xuXG4gIGNvbnN0IGZpbHRlcmVkID0gdXNlTWVtbygoKSA9PiB7XG4gICAgaWYgKCFxdWVyeSB8fCAhcXVlcnkudHJpbSgpKSByZXR1cm4gZGF0YTtcbiAgICBjb25zdCBmID0gZGF0YS5maWx0ZXIoKG8pID0+IHtcbiAgICAgIGNvbnN0IG9wdGlvblZhbHVlID0gU3RyaW5nKG8udmFsdWUgPz8gXCJcIikudHJpbSgpO1xuICAgICAgaWYgKCFvcHRpb25WYWx1ZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gby50ZXh0LnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMocXVlcnkudG9Mb3dlckNhc2UoKSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGYubGVuZ3RoID8gZiA6IGRhdGE7XG4gIH0sIFtkYXRhLCBxdWVyeV0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc2V0QWN0aXZlSW5kZXgoMCk7XG4gIH0sIFtmaWx0ZXJlZC5sZW5ndGgsIHF1ZXJ5XSk7XG5cbiAgY29uc3Qgc2VsZWN0T3B0aW9uID0gKG9wdDogTm9ybWFsaXplZE9wdGlvbikgPT4ge1xuICAgIHNldFNlbGVjdGVkKG9wdCk7XG4gICAgc2V0UXVlcnkobnVsbCk7XG4gICAgc2V0T3BlbihmYWxzZSk7XG4gICAgaWYgKCFlbWl0T25WYWx1ZUNoYW5nZSkge1xuICAgICAgb25DaGFuZ2Uob3B0Py52YWx1ZSA/IFN0cmluZyhvcHQudmFsdWUpIDogXCJcIik7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUtleURvd24gPSAoZXY6IFJlYWN0LktleWJvYXJkRXZlbnQ8SFRNTElucHV0RWxlbWVudD4pID0+IHtcbiAgICBpZiAoZGlzYWJsZWQpIHJldHVybjtcbiAgICBpZiAoZXYua2V5ID09PSBcIkFycm93RG93blwiKSB7XG4gICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgc2V0T3Blbih0cnVlKTtcbiAgICAgIGlmIChmaWx0ZXJlZC5sZW5ndGgpIHNldEFjdGl2ZUluZGV4KChpZHgpID0+IChpZHggKyAxKSAlIGZpbHRlcmVkLmxlbmd0aCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChldi5rZXkgPT09IFwiQXJyb3dVcFwiKSB7XG4gICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgc2V0T3Blbih0cnVlKTtcbiAgICAgIGlmIChmaWx0ZXJlZC5sZW5ndGgpIHNldEFjdGl2ZUluZGV4KChpZHgpID0+IChpZHggLSAxICsgZmlsdGVyZWQubGVuZ3RoKSAlIGZpbHRlcmVkLmxlbmd0aCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChldi5rZXkgPT09IFwiRW50ZXJcIikge1xuICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGlmIChjbGVhck9uRW1wdHlJbnB1dCAmJiBxdWVyeSAhPT0gbnVsbCAmJiAhcXVlcnkudHJpbSgpKSB7XG4gICAgICAgIHNldE9wZW4oZmFsc2UpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAob3BlbiAmJiBmaWx0ZXJlZC5sZW5ndGgpIHtcbiAgICAgICAgc2VsZWN0T3B0aW9uKGZpbHRlcmVkW2FjdGl2ZUluZGV4XSA/PyBmaWx0ZXJlZFswXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZXRPcGVuKHRydWUpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZXYua2V5ID09PSBcIkVzY2FwZVwiKSBzZXRPcGVuKGZhbHNlKTtcbiAgfTtcblxuICBjb25zdCBzYWZlSWQgPSBTdHJpbmcoaWRCYXNlIHx8IGxhYmVsIHx8IFwic2VsZWN0XCIpO1xuICBjb25zdCBsaXN0SWQgPSBgc2VsZWN0LW9wdGlvbnMtJHtzYWZlSWR9YDtcbiAgY29uc3QgYWN0aXZlSWQgPSBvcGVuICYmIGZpbHRlcmVkW2FjdGl2ZUluZGV4XSA/IGBzZWxlY3Qtb3B0LSR7c2FmZUlkfS0ke2ZpbHRlcmVkW2FjdGl2ZUluZGV4XS52YWx1ZX1gIDogdW5kZWZpbmVkO1xuICBjb25zdCBsaXN0T3BlbiA9IG9wZW4gJiYgIWRpc2FibGVkO1xuICBjb25zdCBzZWxlY3RlZFZhbHVlID0gU3RyaW5nKHNlbGVjdGVkPy52YWx1ZSA/PyBcIlwiKS50cmltKCk7XG4gIGNvbnN0IHNlbGVjdGVkRGlzcGxheVRleHQgPSBzZWxlY3RlZFRleHRNb2RlID09PSBcInZhbHVlXCIgPyBzZWxlY3RlZFZhbHVlIDogc2VsZWN0ZWQ/LnRleHQgfHwgXCJcIjtcbiAgY29uc3QgZGlzcGxheVZhbHVlID0gcXVlcnkgIT09IG51bGwgPyBxdWVyeSA6IChzZWxlY3RlZFZhbHVlID8gc2VsZWN0ZWREaXNwbGF5VGV4dCA6IFwiXCIpO1xuICBjb25zdCBzaG93U2VsZWN0ZWRJY29uID0gcXVlcnkgPT09IG51bGwgJiYgISFzZWxlY3RlZFZhbHVlICYmICEhc2VsZWN0ZWQ/Lmljb247XG4gIGNvbnN0IG5vcm1hbGl6ZWREcm9wZG93bkV4cGFuZFB4ID0gTnVtYmVyLmlzRmluaXRlKGRyb3Bkb3duRXhwYW5kUHgpID8gTWF0aC5tYXgoMCwgZHJvcGRvd25FeHBhbmRQeCkgOiAwO1xuICBjb25zdCBub3JtYWxpemVkRHJvcGRvd25NaW5XaWR0aFB4ID0gTnVtYmVyLmlzRmluaXRlKGRyb3Bkb3duTWluV2lkdGhQeCkgPyBNYXRoLm1heCgwLCBkcm9wZG93bk1pbldpZHRoUHgpIDogMDtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghbG9ja0Ryb3Bkb3duV2lkdGhPbkZpcnN0T3BlbikgcmV0dXJuO1xuICAgIGlmICghbGlzdE9wZW4pIHJldHVybjtcbiAgICBpZiAoaW5pdGlhbERyb3Bkb3duV2lkdGhSZWYuY3VycmVudCAhPT0gbnVsbCkgcmV0dXJuO1xuXG4gICAgY29uc3Qgd2lkdGggPSBib3hSZWYuY3VycmVudD8uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4gICAgaWYgKCFOdW1iZXIuaXNGaW5pdGUod2lkdGgpIHx8ICF3aWR0aCB8fCB3aWR0aCA8PSAwKSByZXR1cm47XG4gICAgaW5pdGlhbERyb3Bkb3duV2lkdGhSZWYuY3VycmVudCA9IHdpZHRoO1xuICB9LCBbbGlzdE9wZW4sIGxvY2tEcm9wZG93bldpZHRoT25GaXJzdE9wZW5dKTtcblxuICBjb25zdCBmaXhlZERyb3Bkb3duQmFzZVdpZHRoID0gbG9ja0Ryb3Bkb3duV2lkdGhPbkZpcnN0T3BlbiA/IGluaXRpYWxEcm9wZG93bldpZHRoUmVmLmN1cnJlbnQgOiBudWxsO1xuICBjb25zdCBmaXhlZERyb3Bkb3duRXhwYW5kZWRXaWR0aCA9XG4gICAgZml4ZWREcm9wZG93bkJhc2VXaWR0aCAhPT0gbnVsbCAmJiBOdW1iZXIuaXNGaW5pdGUoZml4ZWREcm9wZG93bkJhc2VXaWR0aClcbiAgICAgID8gZml4ZWREcm9wZG93bkJhc2VXaWR0aCArIG5vcm1hbGl6ZWREcm9wZG93bkV4cGFuZFB4XG4gICAgICA6IG51bGw7XG4gIGNvbnN0IHJlc29sdmVkRHJvcGRvd25XaWR0aFB4ID1cbiAgICBmaXhlZERyb3Bkb3duRXhwYW5kZWRXaWR0aCAhPT0gbnVsbFxuICAgICAgPyBNYXRoLm1heChmaXhlZERyb3Bkb3duRXhwYW5kZWRXaWR0aCwgbm9ybWFsaXplZERyb3Bkb3duTWluV2lkdGhQeCB8fCAwKVxuICAgICAgOiBudWxsO1xuICBjb25zdCBpbmxpbmVEcm9wZG93blN0eWxlOiBSZWFjdC5DU1NQcm9wZXJ0aWVzIHwgdW5kZWZpbmVkID1cbiAgICByZXNvbHZlZERyb3Bkb3duV2lkdGhQeCAhPT0gbnVsbCAmJiByZXNvbHZlZERyb3Bkb3duV2lkdGhQeCA+IDBcbiAgICAgID8ge1xuICAgICAgICAgIHdpZHRoOiBgJHtyZXNvbHZlZERyb3Bkb3duV2lkdGhQeH1weGAsXG4gICAgICAgICAgLi4uKG5vcm1hbGl6ZWREcm9wZG93bk1pbldpZHRoUHggPiAwID8geyBtaW5XaWR0aDogYCR7bm9ybWFsaXplZERyb3Bkb3duTWluV2lkdGhQeH1weGAgfSA6IHt9KSxcbiAgICAgICAgfVxuICAgICAgOiBub3JtYWxpemVkRHJvcGRvd25FeHBhbmRQeCA+IDBcbiAgICAgICAgPyB7XG4gICAgICAgICAgICB3aWR0aDogYGNhbGMoMTAwJSArICR7bm9ybWFsaXplZERyb3Bkb3duRXhwYW5kUHh9cHgpYCxcbiAgICAgICAgICAgIC4uLihub3JtYWxpemVkRHJvcGRvd25NaW5XaWR0aFB4ID4gMCA/IHsgbWluV2lkdGg6IGAke25vcm1hbGl6ZWREcm9wZG93bk1pbldpZHRoUHh9cHhgIH0gOiB7fSksXG4gICAgICAgICAgfVxuICAgICAgICA6IG5vcm1hbGl6ZWREcm9wZG93bk1pbldpZHRoUHggPiAwXG4gICAgICAgICAgPyB7IG1pbldpZHRoOiBgJHtub3JtYWxpemVkRHJvcGRvd25NaW5XaWR0aFB4fXB4YCB9XG4gICAgICAgIDogdW5kZWZpbmVkO1xuXG4gIGNvbnN0IGxpc3RCb2R5ID0gKFxuICAgIDxkaXYgaWQ9e2xpc3RJZH0gcmVmPXtsaXN0UmVmfSByb2xlPVwibGlzdGJveFwiIGFyaWEtbGFiZWw9e2xhYmVsfT5cbiAgICAgIHtmaWx0ZXJlZC5sZW5ndGggPT09IDAgJiYgPGRpdiBjbGFzc05hbWU9XCJweC00IHB5LTIgdGV4dC1zbSB0ZXh0LXNsYXRlLTUwMFwiPntpbmRUKFwiRHJvcGRvd25fTm9SZXN1bHRzXCIsIFwiTm8gcmVzdWx0c1wiKX08L2Rpdj59XG4gICAgICB7ZmlsdGVyZWQubWFwKChvcHQsIGlkeCkgPT4ge1xuICAgICAgICBjb25zdCBzZWwgPSBzZWxlY3RlZD8udmFsdWUgPT09IG9wdC52YWx1ZTtcbiAgICAgICAgY29uc3QgaXNBY3RpdmUgPSBpZHggPT09IGFjdGl2ZUluZGV4O1xuICAgICAgICBjb25zdCBvcHRpb25TdGF0ZUNsYXNzTmFtZSA9IHNlbCA/IG9wdGlvblNlbGVjdGVkQ2xhc3NOYW1lIDogaXNBY3RpdmUgPyBvcHRpb25BY3RpdmVDbGFzc05hbWUgOiBvcHRpb25EZWZhdWx0Q2xhc3NOYW1lO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAga2V5PXtTdHJpbmcob3B0LnZhbHVlKX1cbiAgICAgICAgICAgIGlkPXtgc2VsZWN0LW9wdC0ke3NhZmVJZH0tJHtvcHQudmFsdWV9YH1cbiAgICAgICAgICAgIHJvbGU9XCJvcHRpb25cIlxuICAgICAgICAgICAgYXJpYS1zZWxlY3RlZD17c2VsfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAgICAgICBcInJlbGF0aXZlIGZsZXggdy1mdWxsIGN1cnNvci1kZWZhdWx0IHNlbGVjdC1ub25lIGl0ZW1zLWNlbnRlciBweS0yIHByLTMgdGV4dC1sZWZ0IHRleHQtc21cIixcbiAgICAgICAgICAgICAgb3B0aW9uTGVmdFBhZGRpbmdDbGFzc05hbWUsXG4gICAgICAgICAgICAgIGRpc2FibGVEZWZhdWx0T3B0aW9uUGFkZGluZyA/IFwiXCIgOiBcInR5cGUtb3B0aW9uXCIsXG4gICAgICAgICAgICAgIG9wdGlvblN0YXRlQ2xhc3NOYW1lXG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgc3R5bGU9e1xuICAgICAgICAgICAgICBhbGxvd09wdGlvbkhvcml6b250YWxTY3JvbGxcbiAgICAgICAgICAgICAgICA/IHsgb3ZlcmZsb3dYOiBcImF1dG9cIiwgb3ZlcmZsb3dZOiBcImhpZGRlblwiLCBXZWJraXRPdmVyZmxvd1Njcm9sbGluZzogXCJ0b3VjaFwiIH1cbiAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb25Nb3VzZUVudGVyPXsoKSA9PiBzZXRBY3RpdmVJbmRleChpZHgpfVxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2VsZWN0T3B0aW9uKG9wdCl9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge3NlbCAmJiAoXG4gICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAgICAgICAgICAgXCJhYnNvbHV0ZSBpbnNldC15LTAgbGVmdC0wIGZsZXggaXRlbXMtY2VudGVyIHBsLTJcIixcbiAgICAgICAgICAgICAgICAgIGlzQWN0aXZlID8gXCJ0ZXh0LXdoaXRlXCIgOiBcInRleHQtcHJpbWFyeVwiXG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPjwvc3Bhbj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICAgICAgYWxsb3dPcHRpb25Ib3Jpem9udGFsU2Nyb2xsID8gXCJpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIiA6IFwiZmxleCBtaW4tdy0wIGl0ZW1zLWNlbnRlciBnYXAtMlwiLFxuICAgICAgICAgICAgICAgIHNlbCA/IFwiZm9udC1tZWRpdW1cIiA6IFwiZm9udC1ub3JtYWxcIlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICBzdHlsZT17YWxsb3dPcHRpb25Ib3Jpem9udGFsU2Nyb2xsID8geyBtaW5XaWR0aDogXCJtYXgtY29udGVudFwiIH0gOiB1bmRlZmluZWR9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHtvcHQuaWNvbiA/IChcbiAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAgICAgICAgICAgICBcImlubGluZS1mbGV4IHNocmluay0wIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlclwiLFxuICAgICAgICAgICAgICAgICAgICBvcHRpb25JY29uQ2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICBpc0FjdGl2ZSA/IFwidGV4dC13aGl0ZVwiIDogXCJ0ZXh0LXNsYXRlLTUwMFwiXG4gICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIHtvcHQuaWNvbn1cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhhbGxvd09wdGlvbkhvcml6b250YWxTY3JvbGwgPyBcImJsb2NrXCIgOiBcImJsb2NrIHRydW5jYXRlXCIsIG9wdGlvblRleHRDbGFzc05hbWUpfVxuICAgICAgICAgICAgICAgIHN0eWxlPXthbGxvd09wdGlvbkhvcml6b250YWxTY3JvbGwgPyB7IHdoaXRlU3BhY2U6IFwibm93cmFwXCIgfSA6IHVuZGVmaW5lZH1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHtvcHQudGV4dH1cbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICApO1xuICAgICAgfSl9XG4gICAgPC9kaXY+XG4gICk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXCJzcGFjZS15LTJcIiwgZGlzYWJsZWQgPyBcInBvaW50ZXItZXZlbnRzLW5vbmUgc2VsZWN0LW5vbmVcIiA6IFwiXCIpfVxuICAgICAgcmVmPXtjb250YWluZXJSZWZ9XG4gICAgPlxuICAgICAge3Nob3dMYWJlbCA/IDxsYWJlbCBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXCJmb3JtLWxhYmVsIGZvbnQtc2VtaWJvbGRcIiwgaW52YWxpZCA/IFwidGV4dC1yb3NlLTcwMFwiIDogXCJcIil9PntsYWJlbH08L2xhYmVsPiA6IG51bGx9XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlXCI+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICByZWY9e2JveFJlZn1cbiAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICBcInJlbGF0aXZlIHctZnVsbCBjdXJzb3ItZGVmYXVsdCByb3VuZGVkLXhsIGJnLXdoaXRlIHRleHQtbGVmdCBmb2N1cy13aXRoaW46Ym9yZGVyLXByaW1hcnkgZm9jdXMtd2l0aGluOnJpbmctMiBmb2N1cy13aXRoaW46cmluZy1wcmltYXJ5IGZvY3VzLXdpdGhpbjpyaW5nLW9mZnNldC13aGl0ZSBzbTp0ZXh0LXNtXCIsXG4gICAgICAgICAgICByZWFkT25seU1vZGUgPyBcImluZC1yZWFkb25seS1maWVsZFwiIDogXCJcIlxuICAgICAgICAgICl9XG4gICAgICAgICAgc3R5bGU9e3JlYWRPbmx5TW9kZSA/IHsgY29sb3I6IHZhbHVlQ29sb3IgfSA6IHVuZGVmaW5lZH1cbiAgICAgICAgPlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAgICAgICBcInctZnVsbCByb3VuZGVkLXhsIGJvcmRlciBweS0yIHRleHQtc20gc206dGV4dC1iYXNlIGxlYWRpbmctNSBmb2N1czpvdXRsaW5lLWhpZGRlbiBmb2N1czpyaW5nLTIgZGlzYWJsZWQ6Ymctc2xhdGUtMTAwIGRpc2FibGVkOnRleHQtc2xhdGUtNTAwIGRpc2FibGVkOmJvcmRlci1zbGF0ZS0yMDAgZGlzYWJsZWQ6Y3Vyc29yLW5vdC1hbGxvd2VkXCIsXG4gICAgICAgICAgICAgIHNob3dTZWxlY3RlZEljb24gPyBzZWxlY3RlZElucHV0UGFkZGluZ0NsYXNzTmFtZSA6IFwicGwtM1wiLFxuICAgICAgICAgICAgICBzaG93U2VhcmNoQnV0dG9uID8gXCJwci0yMFwiIDogXCJwci0xMFwiLFxuICAgICAgICAgICAgICBpbnZhbGlkXG4gICAgICAgICAgICAgICAgPyBcImJvcmRlci1yb3NlLTQwMCBiZy1yb3NlLTUwIGZvY3VzOnJpbmctcm9zZS0yMDAgZm9jdXM6Ym9yZGVyLXJvc2UtNDAwXCJcbiAgICAgICAgICAgICAgICA6IFwiYm9yZGVyLXNsYXRlLTIwMCBmb2N1czpyaW5nLXByaW1hcnkgZm9jdXM6Ym9yZGVyLXByaW1hcnlcIixcbiAgICAgICAgICAgICAgcmVhZE9ubHlNb2RlID8gXCJpbmQtcmVhZG9ubHktZmllbGRcIiA6IFwidGV4dC1zbGF0ZS05MDBcIlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIHN0eWxlPXtyZWFkT25seU1vZGUgPyB7IGNvbG9yOiB2YWx1ZUNvbG9yIH0gOiB1bmRlZmluZWR9XG4gICAgICAgICAgICB2YWx1ZT17ZGlzcGxheVZhbHVlfVxuICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoIWFsbG93VGV4dElucHV0KSByZXR1cm47XG4gICAgICAgICAgICAgIGNvbnN0IHZhbCA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICAgICAgICAgICAgc2V0UXVlcnkodmFsKTtcbiAgICAgICAgICAgICAgaWYgKGNsZWFyT25FbXB0eUlucHV0ICYmICF2YWwudHJpbSgpKSB7XG4gICAgICAgICAgICAgICAgc2V0U2VsZWN0ZWQoeyB2YWx1ZTogXCJcIiwgdGV4dDogXCJcIiB9KTtcbiAgICAgICAgICAgICAgICBzZXRPcGVuKGZhbHNlKTtcbiAgICAgICAgICAgICAgICBpZiAoIWVtaXRPblZhbHVlQ2hhbmdlKSB7XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZShcIlwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHNldE9wZW4odHJ1ZSk7XG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgb25LZXlEb3duPXtoYW5kbGVLZXlEb3dufVxuICAgICAgICAgICAgb25Gb2N1cz17KCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoIWRpc2FibGVkKSBzZXRPcGVuKHRydWUpO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cbiAgICAgICAgICAgIHJlYWRPbmx5PXtyZWFkT25seU1vZGUgfHwgIWFsbG93VGV4dElucHV0fVxuICAgICAgICAgICAgYXJpYS1sYWJlbD17bGFiZWx9XG4gICAgICAgICAgICByb2xlPVwiY29tYm9ib3hcIlxuICAgICAgICAgICAgYXJpYS1leHBhbmRlZD17bGlzdE9wZW59XG4gICAgICAgICAgICBhcmlhLWNvbnRyb2xzPXtsaXN0SWR9XG4gICAgICAgICAgICBhcmlhLWFjdGl2ZWRlc2NlbmRhbnQ9e2FjdGl2ZUlkfVxuICAgICAgICAgIC8+XG4gICAgICAgICAge3Nob3dTZWxlY3RlZEljb24gPyAoXG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJwb2ludGVyLWV2ZW50cy1ub25lIGFic29sdXRlIGluc2V0LXktMCBsZWZ0LTAgZmxleCBpdGVtcy1jZW50ZXIgcGwtMyB0ZXh0LXNsYXRlLTUwMFwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXCJpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXJcIiwgc2VsZWN0ZWRJY29uQ2xhc3NOYW1lKX0+e3NlbGVjdGVkLmljb259PC9zcGFuPlxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQteS0wIHJpZ2h0LTAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgcHItMlwiPlxuICAgICAgICAgICAge3Nob3dTZWFyY2hCdXR0b24gPyAoXG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBwLTEuNSB0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXNsYXRlLTUwMFwiXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgaWYgKGRpc2FibGVkKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICBzZXRPcGVuKHRydWUpO1xuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17aW5kVChcIkNvbW1vbl9TZWFyY2hcIiwgXCJTZWFyY2hcIil9XG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgZmlsbD1cIm5vbmVcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgc3Ryb2tlV2lkdGg9ezEuNX0gc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgY2xhc3NOYW1lPVwiaC01IHctNVwiPlxuICAgICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJtMTUuNzUgMTUuNzUtMi40ODktMi40ODltMCAwYTMuMzc1IDMuMzc1IDAgMSAwLTQuNzczLTQuNzczIDMuMzc1IDMuMzc1IDAgMCAwIDQuNzc0IDQuNzc0Wk0yMSAxMmE5IDkgMCAxIDEtMTggMCA5IDkgMCAwIDEgMTggMFpcIiAvPlxuICAgICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgcC0xLjUgdGV4dC1zbGF0ZS01MDAgaG92ZXI6dGV4dC1zbGF0ZS02MDBcIlxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGRpc2FibGVkKSByZXR1cm47XG4gICAgICAgICAgICAgICAgc2V0T3BlbigocHJldikgPT4gIXByZXYpO1xuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtvcGVuID8gaW5kVChcIkRyb3Bkb3duX0hpZGVPcHRpb25zXCIsIFwiSGlkZSBvcHRpb25zXCIpIDogaW5kVChcIkRyb3Bkb3duX1Nob3dPcHRpb25zXCIsIFwiU2hvdyBvcHRpb25zXCIpfVxuICAgICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHtvcGVuID8gPENoZXZyb25VcFN2ZyBjbGFzc05hbWU9XCJoLTUgdy01XCIgLz4gOiA8Q2hldnJvbkRvd25TdmcgY2xhc3NOYW1lPVwiaC01IHctNVwiIC8+fVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7dXNlUG9ydGFsID8gKFxuICAgICAgICAgIDxGbG9hdGluZ0xpc3RcbiAgICAgICAgICAgIGFuY2hvclJlZj17Ym94UmVmfVxuICAgICAgICAgICAgb3Blbj17bGlzdE9wZW59XG4gICAgICAgICAgICB6SW5kZXg9ezM2MDAwMH1cbiAgICAgICAgICAgIGZpeGVkV2lkdGhQeD17cmVzb2x2ZWREcm9wZG93bldpZHRoUHggPz8gdW5kZWZpbmVkfVxuICAgICAgICAgICAgcGFuZWxTdHlsZT17cGFuZWxTdHlsZX1cbiAgICAgICAgICAgIG1heEhlaWdodENsYXNzPXtkcm9wZG93bk1heEhlaWdodENsYXNzfVxuICAgICAgICAgICAgcm9sZT1cImxpc3Rib3hcIlxuICAgICAgICAgICAgcm91bmRlZENsYXNzPVwicm91bmRlZC14bFwiXG4gICAgICAgICAgICBwb3J0YWxDbGFzc05hbWU9e3BvcnRhbENsYXNzTmFtZX1cbiAgICAgICAgICAgIHBhbmVsQ2xhc3NOYW1lPXtwYW5lbENsYXNzTmFtZX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7bGlzdEJvZHl9XG4gICAgICAgICAgPC9GbG9hdGluZ0xpc3Q+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgbGlzdE9wZW4gJiYgKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2BhYnNvbHV0ZSB6LTM2MDAwMCBtdC0xIHctZnVsbCByb3VuZGVkLXhsIGJnLXdoaXRlIHNoYWRvdy1sZyByaW5nLTEgcmluZy1ibGFjay81IGZvY3VzOm91dGxpbmUtaGlkZGVuICR7ZHJvcGRvd25NYXhIZWlnaHRDbGFzc30gb3ZlcmZsb3ctYXV0byAke3BhbmVsQ2xhc3NOYW1lIHx8IFwiXCJ9YH1cbiAgICAgICAgICAgICAgc3R5bGU9e3sgLi4uaW5saW5lRHJvcGRvd25TdHlsZSwgLi4uKHBhbmVsU3R5bGUgfHwge30pIH19XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHtsaXN0Qm9keX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIClcbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgU2VsZWN0Q29tYm9ib3g7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbUJBQTREO0FBK081QjtBQWxMaEMsSUFBTSxpQkFBaUIsQ0FBQztBQUFBLEVBQ3RCO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0EsVUFBVTtBQUFBLEVBQ1YsV0FBVztBQUFBLEVBQ1gsV0FBVztBQUFBLEVBQ1gsWUFBWTtBQUFBLEVBQ1osb0JBQW9CO0FBQUEsRUFDcEI7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0EsbUJBQW1CO0FBQUEsRUFDbkIsaUJBQWlCO0FBQUEsRUFDakIsWUFBWTtBQUFBLEVBQ1osbUJBQW1CO0FBQUEsRUFDbkIsbUJBQW1CO0FBQUEsRUFDbkIscUJBQXFCO0FBQUEsRUFDckIseUJBQXlCO0FBQUEsRUFDekIsd0JBQXdCO0FBQUEsRUFDeEIsc0JBQXNCO0FBQUEsRUFDdEIsOEJBQThCO0FBQUEsRUFDOUIsK0JBQStCO0FBQUEsRUFDL0IsOEJBQThCO0FBQUEsRUFDOUIsNkJBQTZCO0FB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
