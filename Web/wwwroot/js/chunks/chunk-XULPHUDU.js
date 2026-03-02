import {
  ChevronDownSvg,
  ChevronUpSvg,
  FloatingList_default,
  useOutsideClick
} from "./chunk-6YXFJB4W.js";
import {
  classNames,
  indT
} from "./chunk-U25S3E2U.js";
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
  (0, import_react.useEffect)(() => {
    if (!lockDropdownWidthOnFirstOpen) return;
    if (!listOpen) return;
    if (initialDropdownWidthRef.current !== null) return;
    const width = boxRef.current?.getBoundingClientRect().width;
    if (!Number.isFinite(width) || !width || width <= 0) return;
    initialDropdownWidthRef.current = width;
  }, [listOpen, lockDropdownWidthOnFirstOpen]);
  const fixedDropdownBaseWidth = lockDropdownWidthOnFirstOpen ? initialDropdownWidthRef.current : null;
  const resolvedDropdownWidthPx = fixedDropdownBaseWidth !== null && Number.isFinite(fixedDropdownBaseWidth) ? fixedDropdownBaseWidth + normalizedDropdownExpandPx : null;
  const inlineDropdownStyle = resolvedDropdownWidthPx !== null && resolvedDropdownWidthPx > 0 ? { width: `${resolvedDropdownWidthPx}px` } : normalizedDropdownExpandPx > 0 ? { width: `calc(100% + ${normalizedDropdownExpandPx}px)` } : void 0;
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9TZWxlY3RDb21ib2JveC50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBGbG9hdGluZ0xpc3QgZnJvbSBcIi4vRmxvYXRpbmdMaXN0LnRzeFwiO1xuaW1wb3J0IHsgQ2hldnJvbkRvd25TdmcsIENoZXZyb25VcFN2ZyB9IGZyb20gXCIuL2NoZXZyb25zLnRzeFwiO1xuaW1wb3J0IHsgdXNlT3V0c2lkZUNsaWNrIH0gZnJvbSBcIi4uLy4uL2hvb2tzL3VzZU91dHNpZGVDbGljay50c1wiO1xuaW1wb3J0IHsgY2xhc3NOYW1lcyB9IGZyb20gXCIuLi8uLi91dGlscy9jbGFzc05hbWVzLnRzXCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcblxudHlwZSBSYXdPcHRpb24gPVxuICB8IHtcbiAgICAgIHZhbHVlPzogc3RyaW5nIHwgbnVtYmVyO1xuICAgICAgVmFsdWU/OiBzdHJpbmcgfCBudW1iZXI7XG4gICAgICB0ZXh0Pzogc3RyaW5nO1xuICAgICAgVGV4dD86IHN0cmluZztcbiAgICAgIGljb24/OiBSZWFjdC5SZWFjdE5vZGU7XG4gICAgICBJY29uPzogUmVhY3QuUmVhY3ROb2RlO1xuICAgIH1cbiAgfCBbc3RyaW5nIHwgbnVtYmVyLCBzdHJpbmddO1xuXG50eXBlIE5vcm1hbGl6ZWRPcHRpb24gPSB7XG4gIHZhbHVlOiBzdHJpbmcgfCBudW1iZXI7XG4gIHRleHQ6IHN0cmluZztcbiAgaWNvbj86IFJlYWN0LlJlYWN0Tm9kZTtcbn07XG5cbnR5cGUgU2VsZWN0Q29tYm9ib3hQcm9wcyA9IHtcbiAgbGFiZWw6IHN0cmluZztcbiAgb3B0aW9uczogUmF3T3B0aW9uW107XG4gIHZhbHVlOiBzdHJpbmcgfCBudW1iZXI7XG4gIG9uQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgcGxhY2Vob2xkZXI/OiBzdHJpbmc7XG4gIGludmFsaWQ/OiBib29sZWFuO1xuICBkaXNhYmxlZD86IGJvb2xlYW47XG4gIHJlYWRPbmx5PzogYm9vbGVhbjtcbiAgdXNlUG9ydGFsPzogYm9vbGVhbjtcbiAgZW1pdE9uVmFsdWVDaGFuZ2U/OiBib29sZWFuO1xuICBpZEJhc2U/OiBzdHJpbmc7XG4gIHBvcnRhbENsYXNzTmFtZT86IHN0cmluZztcbiAgcGFuZWxDbGFzc05hbWU/OiBzdHJpbmc7XG4gIHNob3dTZWFyY2hCdXR0b24/OiBib29sZWFuO1xuICBhbGxvd1RleHRJbnB1dD86IGJvb2xlYW47XG4gIHNob3dMYWJlbD86IGJvb2xlYW47XG4gIHNlbGVjdGVkVGV4dE1vZGU/OiBcInRleHRcIiB8IFwidmFsdWVcIjtcbiAgZHJvcGRvd25FeHBhbmRQeD86IG51bWJlcjtcbiAgZHJvcGRvd25NYXhIZWlnaHRDbGFzcz86IHN0cmluZztcbiAgc2VsZWN0ZWRJY29uQ2xhc3NOYW1lPzogc3RyaW5nO1xuICBvcHRpb25JY29uQ2xhc3NOYW1lPzogc3RyaW5nO1xuICBhbGxvd09wdGlvbkhvcml6b250YWxTY3JvbGw/OiBib29sZWFuO1xuICBsb2NrRHJvcGRvd25XaWR0aE9uRmlyc3RPcGVuPzogYm9vbGVhbjtcbiAgZGlzYWJsZURlZmF1bHRPcHRpb25QYWRkaW5nPzogYm9vbGVhbjtcbiAgb3B0aW9uTGVmdFBhZGRpbmdDbGFzc05hbWU/OiBzdHJpbmc7XG4gIG9wdGlvblRleHRDbGFzc05hbWU/OiBzdHJpbmc7XG4gIG9wdGlvbkRlZmF1bHRDbGFzc05hbWU/OiBzdHJpbmc7XG4gIG9wdGlvbkFjdGl2ZUNsYXNzTmFtZT86IHN0cmluZztcbiAgb3B0aW9uU2VsZWN0ZWRDbGFzc05hbWU/OiBzdHJpbmc7XG4gIHNlbGVjdGVkSW5wdXRQYWRkaW5nQ2xhc3NOYW1lPzogc3RyaW5nO1xuICBwYW5lbFN0eWxlPzogUmVhY3QuQ1NTUHJvcGVydGllcztcbiAgY2xlYXJPbkVtcHR5SW5wdXQ/OiBib29sZWFuO1xufTtcblxuLy8gUmV1c2FibGUgc2VsZWN0IGNvbWJvYm94IHdpdGggb3B0aW9uYWwgcG9ydGFsIHJlbmRlcmluZyBmb3IgdGhlIGxpc3QuXG5jb25zdCBTZWxlY3RDb21ib2JveCA9ICh7XG4gIGxhYmVsLFxuICBvcHRpb25zLFxuICB2YWx1ZSxcbiAgb25DaGFuZ2UsXG4gIHBsYWNlaG9sZGVyLFxuICBpbnZhbGlkID0gZmFsc2UsXG4gIGRpc2FibGVkID0gZmFsc2UsXG4gIHJlYWRPbmx5ID0gZmFsc2UsXG4gIHVzZVBvcnRhbCA9IHRydWUsXG4gIGVtaXRPblZhbHVlQ2hhbmdlID0gZmFsc2UsXG4gIGlkQmFzZSxcbiAgcG9ydGFsQ2xhc3NOYW1lLFxuICBwYW5lbENsYXNzTmFtZSxcbiAgc2hvd1NlYXJjaEJ1dHRvbiA9IGZhbHNlLFxuICBhbGxvd1RleHRJbnB1dCA9IHRydWUsXG4gIHNob3dMYWJlbCA9IHRydWUsXG4gIHNlbGVjdGVkVGV4dE1vZGUgPSBcInRleHRcIixcbiAgZHJvcGRvd25FeHBhbmRQeCA9IDAsXG4gIGRyb3Bkb3duTWF4SGVpZ2h0Q2xhc3MgPSBcIm1heC1oLTcyXCIsXG4gIHNlbGVjdGVkSWNvbkNsYXNzTmFtZSA9IFwiaC00IHctNFwiLFxuICBvcHRpb25JY29uQ2xhc3NOYW1lID0gXCJoLTQgdy00XCIsXG4gIGFsbG93T3B0aW9uSG9yaXpvbnRhbFNjcm9sbCA9IGZhbHNlLFxuICBsb2NrRHJvcGRvd25XaWR0aE9uRmlyc3RPcGVuID0gZmFsc2UsXG4gIGRpc2FibGVEZWZhdWx0T3B0aW9uUGFkZGluZyA9IGZhbHNlLFxuICBvcHRpb25MZWZ0UGFkZGluZ0NsYXNzTmFtZSA9IFwiXCIsXG4gIG9wdGlvblRleHRDbGFzc05hbWUgPSBcIlwiLFxuICBvcHRpb25EZWZhdWx0Q2xhc3NOYW1lID0gXCJ0ZXh0LXNsYXRlLTkwMFwiLFxuICBvcHRpb25BY3RpdmVDbGFzc05hbWUgPSBcImJnLXByaW1hcnkgdGV4dC13aGl0ZVwiLFxuICBvcHRpb25TZWxlY3RlZENsYXNzTmFtZSA9IFwiYmctcHJpbWFyeSB0ZXh0LXdoaXRlXCIsXG4gIHNlbGVjdGVkSW5wdXRQYWRkaW5nQ2xhc3NOYW1lID0gXCJwbC05XCIsXG4gIHBhbmVsU3R5bGUsXG4gIGNsZWFyT25FbXB0eUlucHV0ID0gZmFsc2UsXG59OiBTZWxlY3RDb21ib2JveFByb3BzKSA9PiB7XG4gIGNvbnN0IHJlYWRPbmx5TW9kZSA9IHJlYWRPbmx5IHx8IGRpc2FibGVkO1xuICBjb25zdCB2YWx1ZUNvbG9yID0gcmVhZE9ubHlNb2RlID8gXCIjNjQ3NDhiXCIgOiBcIiMwMDI5NmJlMFwiO1xuICBjb25zdCBkYXRhID0gdXNlTWVtbygoKSA9PiB7XG4gICAgcmV0dXJuIChvcHRpb25zIHx8IFtdKS5tYXA8Tm9ybWFsaXplZE9wdGlvbj4oKG8pID0+IHtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KG8pKSB7XG4gICAgICAgIHJldHVybiB7IHZhbHVlOiBvWzBdID8/IFwiXCIsIHRleHQ6IG9bMV0gPz8gXCJcIiB9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdmFsdWU6IG8/LnZhbHVlID8/IG8/LlZhbHVlID8/IFwiXCIsXG4gICAgICAgIHRleHQ6IG8/LnRleHQgPz8gbz8uVGV4dCA/PyBcIlwiLFxuICAgICAgICBpY29uOiBvPy5pY29uID8/IG8/Lkljb24sXG4gICAgICB9O1xuICAgIH0pO1xuICB9LCBbb3B0aW9uc10pO1xuXG4gIGNvbnN0IFtxdWVyeSwgc2V0UXVlcnldID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtzZWxlY3RlZCwgc2V0U2VsZWN0ZWRdID0gdXNlU3RhdGUoXG4gICAgZGF0YS5maW5kKChkKSA9PiBTdHJpbmcoZC52YWx1ZSkgPT09IFN0cmluZyh2YWx1ZSkpIHx8IHsgdmFsdWU6IFwiXCIsIHRleHQ6IFwiXCIgfVxuICApO1xuICBjb25zdCBbb3Blbiwgc2V0T3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFthY3RpdmVJbmRleCwgc2V0QWN0aXZlSW5kZXhdID0gdXNlU3RhdGUoMCk7XG4gIGNvbnN0IGNvbnRhaW5lclJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBib3hSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgbGlzdFJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBpbml0aWFsRHJvcGRvd25XaWR0aFJlZiA9IHVzZVJlZjxudW1iZXIgfCBudWxsPihudWxsKTtcblxuICB1c2VPdXRzaWRlQ2xpY2soW2NvbnRhaW5lclJlZiwgbGlzdFJlZl0sICgpID0+IHNldE9wZW4oZmFsc2UpKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHNldFNlbGVjdGVkKGRhdGEuZmluZCgoZCkgPT4gU3RyaW5nKGQudmFsdWUpID09PSBTdHJpbmcodmFsdWUpKSB8fCB7IHZhbHVlOiBcIlwiLCB0ZXh0OiBcIlwiIH0pO1xuICB9LCBbdmFsdWUsIGRhdGFdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIC8vIFJlc2V0IHR5cGVkIHNlYXJjaCB0ZXh0IGFmdGVyIGV4dGVybmFsIHZhbHVlIGNoYW5nZXMuXG4gICAgc2V0UXVlcnkobnVsbCk7XG4gIH0sIFtzZWxlY3RlZF0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFlbWl0T25WYWx1ZUNoYW5nZSkgcmV0dXJuO1xuICAgIG9uQ2hhbmdlKHNlbGVjdGVkPy52YWx1ZSA/IFN0cmluZyhzZWxlY3RlZC52YWx1ZSkgOiBcIlwiKTtcbiAgfSwgW2VtaXRPblZhbHVlQ2hhbmdlLCBvbkNoYW5nZSwgc2VsZWN0ZWRdKTtcblxuICBjb25zdCBmaWx0ZXJlZCA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIGlmICghcXVlcnkgfHwgIXF1ZXJ5LnRyaW0oKSkgcmV0dXJuIGRhdGE7XG4gICAgY29uc3QgZiA9IGRhdGEuZmlsdGVyKChvKSA9PiB7XG4gICAgICBjb25zdCBvcHRpb25WYWx1ZSA9IFN0cmluZyhvLnZhbHVlID8/IFwiXCIpLnRyaW0oKTtcbiAgICAgIGlmICghb3B0aW9uVmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG8udGV4dC50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHF1ZXJ5LnRvTG93ZXJDYXNlKCkpO1xuICAgIH0pO1xuICAgIHJldHVybiBmLmxlbmd0aCA/IGYgOiBkYXRhO1xuICB9LCBbZGF0YSwgcXVlcnldKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHNldEFjdGl2ZUluZGV4KDApO1xuICB9LCBbZmlsdGVyZWQubGVuZ3RoLCBxdWVyeV0pO1xuXG4gIGNvbnN0IHNlbGVjdE9wdGlvbiA9IChvcHQ6IE5vcm1hbGl6ZWRPcHRpb24pID0+IHtcbiAgICBzZXRTZWxlY3RlZChvcHQpO1xuICAgIHNldFF1ZXJ5KG51bGwpO1xuICAgIHNldE9wZW4oZmFsc2UpO1xuICAgIGlmICghZW1pdE9uVmFsdWVDaGFuZ2UpIHtcbiAgICAgIG9uQ2hhbmdlKG9wdD8udmFsdWUgPyBTdHJpbmcob3B0LnZhbHVlKSA6IFwiXCIpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVLZXlEb3duID0gKGV2OiBSZWFjdC5LZXlib2FyZEV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+KSA9PiB7XG4gICAgaWYgKGRpc2FibGVkKSByZXR1cm47XG4gICAgaWYgKGV2LmtleSA9PT0gXCJBcnJvd0Rvd25cIikge1xuICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHNldE9wZW4odHJ1ZSk7XG4gICAgICBpZiAoZmlsdGVyZWQubGVuZ3RoKSBzZXRBY3RpdmVJbmRleCgoaWR4KSA9PiAoaWR4ICsgMSkgJSBmaWx0ZXJlZC5sZW5ndGgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoZXYua2V5ID09PSBcIkFycm93VXBcIikge1xuICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHNldE9wZW4odHJ1ZSk7XG4gICAgICBpZiAoZmlsdGVyZWQubGVuZ3RoKSBzZXRBY3RpdmVJbmRleCgoaWR4KSA9PiAoaWR4IC0gMSArIGZpbHRlcmVkLmxlbmd0aCkgJSBmaWx0ZXJlZC5sZW5ndGgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoZXYua2V5ID09PSBcIkVudGVyXCIpIHtcbiAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBpZiAoY2xlYXJPbkVtcHR5SW5wdXQgJiYgcXVlcnkgIT09IG51bGwgJiYgIXF1ZXJ5LnRyaW0oKSkge1xuICAgICAgICBzZXRPcGVuKGZhbHNlKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKG9wZW4gJiYgZmlsdGVyZWQubGVuZ3RoKSB7XG4gICAgICAgIHNlbGVjdE9wdGlvbihmaWx0ZXJlZFthY3RpdmVJbmRleF0gPz8gZmlsdGVyZWRbMF0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2V0T3Blbih0cnVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGV2LmtleSA9PT0gXCJFc2NhcGVcIikgc2V0T3BlbihmYWxzZSk7XG4gIH07XG5cbiAgY29uc3Qgc2FmZUlkID0gU3RyaW5nKGlkQmFzZSB8fCBsYWJlbCB8fCBcInNlbGVjdFwiKTtcbiAgY29uc3QgbGlzdElkID0gYHNlbGVjdC1vcHRpb25zLSR7c2FmZUlkfWA7XG4gIGNvbnN0IGFjdGl2ZUlkID0gb3BlbiAmJiBmaWx0ZXJlZFthY3RpdmVJbmRleF0gPyBgc2VsZWN0LW9wdC0ke3NhZmVJZH0tJHtmaWx0ZXJlZFthY3RpdmVJbmRleF0udmFsdWV9YCA6IHVuZGVmaW5lZDtcbiAgY29uc3QgbGlzdE9wZW4gPSBvcGVuICYmICFkaXNhYmxlZDtcbiAgY29uc3Qgc2VsZWN0ZWRWYWx1ZSA9IFN0cmluZyhzZWxlY3RlZD8udmFsdWUgPz8gXCJcIikudHJpbSgpO1xuICBjb25zdCBzZWxlY3RlZERpc3BsYXlUZXh0ID0gc2VsZWN0ZWRUZXh0TW9kZSA9PT0gXCJ2YWx1ZVwiID8gc2VsZWN0ZWRWYWx1ZSA6IHNlbGVjdGVkPy50ZXh0IHx8IFwiXCI7XG4gIGNvbnN0IGRpc3BsYXlWYWx1ZSA9IHF1ZXJ5ICE9PSBudWxsID8gcXVlcnkgOiAoc2VsZWN0ZWRWYWx1ZSA/IHNlbGVjdGVkRGlzcGxheVRleHQgOiBcIlwiKTtcbiAgY29uc3Qgc2hvd1NlbGVjdGVkSWNvbiA9IHF1ZXJ5ID09PSBudWxsICYmICEhc2VsZWN0ZWRWYWx1ZSAmJiAhIXNlbGVjdGVkPy5pY29uO1xuICBjb25zdCBub3JtYWxpemVkRHJvcGRvd25FeHBhbmRQeCA9IE51bWJlci5pc0Zpbml0ZShkcm9wZG93bkV4cGFuZFB4KSA/IE1hdGgubWF4KDAsIGRyb3Bkb3duRXhwYW5kUHgpIDogMDtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghbG9ja0Ryb3Bkb3duV2lkdGhPbkZpcnN0T3BlbikgcmV0dXJuO1xuICAgIGlmICghbGlzdE9wZW4pIHJldHVybjtcbiAgICBpZiAoaW5pdGlhbERyb3Bkb3duV2lkdGhSZWYuY3VycmVudCAhPT0gbnVsbCkgcmV0dXJuO1xuXG4gICAgY29uc3Qgd2lkdGggPSBib3hSZWYuY3VycmVudD8uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4gICAgaWYgKCFOdW1iZXIuaXNGaW5pdGUod2lkdGgpIHx8ICF3aWR0aCB8fCB3aWR0aCA8PSAwKSByZXR1cm47XG4gICAgaW5pdGlhbERyb3Bkb3duV2lkdGhSZWYuY3VycmVudCA9IHdpZHRoO1xuICB9LCBbbGlzdE9wZW4sIGxvY2tEcm9wZG93bldpZHRoT25GaXJzdE9wZW5dKTtcblxuICBjb25zdCBmaXhlZERyb3Bkb3duQmFzZVdpZHRoID0gbG9ja0Ryb3Bkb3duV2lkdGhPbkZpcnN0T3BlbiA/IGluaXRpYWxEcm9wZG93bldpZHRoUmVmLmN1cnJlbnQgOiBudWxsO1xuICBjb25zdCByZXNvbHZlZERyb3Bkb3duV2lkdGhQeCA9XG4gICAgZml4ZWREcm9wZG93bkJhc2VXaWR0aCAhPT0gbnVsbCAmJiBOdW1iZXIuaXNGaW5pdGUoZml4ZWREcm9wZG93bkJhc2VXaWR0aClcbiAgICAgID8gZml4ZWREcm9wZG93bkJhc2VXaWR0aCArIG5vcm1hbGl6ZWREcm9wZG93bkV4cGFuZFB4XG4gICAgICA6IG51bGw7XG4gIGNvbnN0IGlubGluZURyb3Bkb3duU3R5bGU6IFJlYWN0LkNTU1Byb3BlcnRpZXMgfCB1bmRlZmluZWQgPVxuICAgIHJlc29sdmVkRHJvcGRvd25XaWR0aFB4ICE9PSBudWxsICYmIHJlc29sdmVkRHJvcGRvd25XaWR0aFB4ID4gMFxuICAgICAgPyB7IHdpZHRoOiBgJHtyZXNvbHZlZERyb3Bkb3duV2lkdGhQeH1weGAgfVxuICAgICAgOiBub3JtYWxpemVkRHJvcGRvd25FeHBhbmRQeCA+IDBcbiAgICAgICAgPyB7IHdpZHRoOiBgY2FsYygxMDAlICsgJHtub3JtYWxpemVkRHJvcGRvd25FeHBhbmRQeH1weClgIH1cbiAgICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgY29uc3QgbGlzdEJvZHkgPSAoXG4gICAgPGRpdiBpZD17bGlzdElkfSByZWY9e2xpc3RSZWZ9IHJvbGU9XCJsaXN0Ym94XCIgYXJpYS1sYWJlbD17bGFiZWx9PlxuICAgICAge2ZpbHRlcmVkLmxlbmd0aCA9PT0gMCAmJiA8ZGl2IGNsYXNzTmFtZT1cInB4LTQgcHktMiB0ZXh0LXNtIHRleHQtc2xhdGUtNTAwXCI+e2luZFQoXCJEcm9wZG93bl9Ob1Jlc3VsdHNcIiwgXCJObyByZXN1bHRzXCIpfTwvZGl2Pn1cbiAgICAgIHtmaWx0ZXJlZC5tYXAoKG9wdCwgaWR4KSA9PiB7XG4gICAgICAgIGNvbnN0IHNlbCA9IHNlbGVjdGVkPy52YWx1ZSA9PT0gb3B0LnZhbHVlO1xuICAgICAgICBjb25zdCBpc0FjdGl2ZSA9IGlkeCA9PT0gYWN0aXZlSW5kZXg7XG4gICAgICAgIGNvbnN0IG9wdGlvblN0YXRlQ2xhc3NOYW1lID0gc2VsID8gb3B0aW9uU2VsZWN0ZWRDbGFzc05hbWUgOiBpc0FjdGl2ZSA/IG9wdGlvbkFjdGl2ZUNsYXNzTmFtZSA6IG9wdGlvbkRlZmF1bHRDbGFzc05hbWU7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICBrZXk9e1N0cmluZyhvcHQudmFsdWUpfVxuICAgICAgICAgICAgaWQ9e2BzZWxlY3Qtb3B0LSR7c2FmZUlkfS0ke29wdC52YWx1ZX1gfVxuICAgICAgICAgICAgcm9sZT1cIm9wdGlvblwiXG4gICAgICAgICAgICBhcmlhLXNlbGVjdGVkPXtzZWx9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICAgIFwicmVsYXRpdmUgZmxleCB3LWZ1bGwgY3Vyc29yLWRlZmF1bHQgc2VsZWN0LW5vbmUgaXRlbXMtY2VudGVyIHB5LTIgcHItMyB0ZXh0LWxlZnQgdGV4dC1zbVwiLFxuICAgICAgICAgICAgICBvcHRpb25MZWZ0UGFkZGluZ0NsYXNzTmFtZSxcbiAgICAgICAgICAgICAgZGlzYWJsZURlZmF1bHRPcHRpb25QYWRkaW5nID8gXCJcIiA6IFwidHlwZS1vcHRpb25cIixcbiAgICAgICAgICAgICAgb3B0aW9uU3RhdGVDbGFzc05hbWVcbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICBzdHlsZT17XG4gICAgICAgICAgICAgIGFsbG93T3B0aW9uSG9yaXpvbnRhbFNjcm9sbFxuICAgICAgICAgICAgICAgID8geyBvdmVyZmxvd1g6IFwiYXV0b1wiLCBvdmVyZmxvd1k6IFwiaGlkZGVuXCIsIFdlYmtpdE92ZXJmbG93U2Nyb2xsaW5nOiBcInRvdWNoXCIgfVxuICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvbk1vdXNlRW50ZXI9eygpID0+IHNldEFjdGl2ZUluZGV4KGlkeCl9XG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZWxlY3RPcHRpb24ob3B0KX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7c2VsICYmIChcbiAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICAgICAgICBcImFic29sdXRlIGluc2V0LXktMCBsZWZ0LTAgZmxleCBpdGVtcy1jZW50ZXIgcGwtMlwiLFxuICAgICAgICAgICAgICAgICAgaXNBY3RpdmUgPyBcInRleHQtd2hpdGVcIiA6IFwidGV4dC1wcmltYXJ5XCJcbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA+PC9zcGFuPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgICAgICAgICBhbGxvd09wdGlvbkhvcml6b250YWxTY3JvbGwgPyBcImlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiIDogXCJmbGV4IG1pbi13LTAgaXRlbXMtY2VudGVyIGdhcC0yXCIsXG4gICAgICAgICAgICAgICAgc2VsID8gXCJmb250LW1lZGl1bVwiIDogXCJmb250LW5vcm1hbFwiXG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIHN0eWxlPXthbGxvd09wdGlvbkhvcml6b250YWxTY3JvbGwgPyB7IG1pbldpZHRoOiBcIm1heC1jb250ZW50XCIgfSA6IHVuZGVmaW5lZH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge29wdC5pY29uID8gKFxuICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICAgICAgICAgIFwiaW5saW5lLWZsZXggc2hyaW5rLTAgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyXCIsXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbkljb25DbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgIGlzQWN0aXZlID8gXCJ0ZXh0LXdoaXRlXCIgOiBcInRleHQtc2xhdGUtNTAwXCJcbiAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAge29wdC5pY29ufVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKGFsbG93T3B0aW9uSG9yaXpvbnRhbFNjcm9sbCA/IFwiYmxvY2tcIiA6IFwiYmxvY2sgdHJ1bmNhdGVcIiwgb3B0aW9uVGV4dENsYXNzTmFtZSl9XG4gICAgICAgICAgICAgICAgc3R5bGU9e2FsbG93T3B0aW9uSG9yaXpvbnRhbFNjcm9sbCA/IHsgd2hpdGVTcGFjZTogXCJub3dyYXBcIiB9IDogdW5kZWZpbmVkfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge29wdC50ZXh0fVxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICk7XG4gICAgICB9KX1cbiAgICA8L2Rpdj5cbiAgKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcInNwYWNlLXktMlwiLCBkaXNhYmxlZCA/IFwicG9pbnRlci1ldmVudHMtbm9uZSBzZWxlY3Qtbm9uZVwiIDogXCJcIil9XG4gICAgICByZWY9e2NvbnRhaW5lclJlZn1cbiAgICA+XG4gICAgICB7c2hvd0xhYmVsID8gPGxhYmVsIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZFwiLCBpbnZhbGlkID8gXCJ0ZXh0LXJvc2UtNzAwXCIgOiBcIlwiKX0+e2xhYmVsfTwvbGFiZWw+IDogbnVsbH1cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmVcIj5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIHJlZj17Ym94UmVmfVxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgICAgIFwicmVsYXRpdmUgdy1mdWxsIGN1cnNvci1kZWZhdWx0IHJvdW5kZWQteGwgYmctd2hpdGUgdGV4dC1sZWZ0IGZvY3VzLXdpdGhpbjpib3JkZXItcHJpbWFyeSBmb2N1cy13aXRoaW46cmluZy0yIGZvY3VzLXdpdGhpbjpyaW5nLXByaW1hcnkgZm9jdXMtd2l0aGluOnJpbmctb2Zmc2V0LXdoaXRlIHNtOnRleHQtc21cIixcbiAgICAgICAgICAgIHJlYWRPbmx5TW9kZSA/IFwiaW5kLXJlYWRvbmx5LWZpZWxkXCIgOiBcIlwiXG4gICAgICAgICAgKX1cbiAgICAgICAgICBzdHlsZT17cmVhZE9ubHlNb2RlID8geyBjb2xvcjogdmFsdWVDb2xvciB9IDogdW5kZWZpbmVkfVxuICAgICAgICA+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICAgIFwidy1mdWxsIHJvdW5kZWQteGwgYm9yZGVyIHB5LTIgdGV4dC1zbSBzbTp0ZXh0LWJhc2UgbGVhZGluZy01IGZvY3VzOm91dGxpbmUtaGlkZGVuIGZvY3VzOnJpbmctMiBkaXNhYmxlZDpiZy1zbGF0ZS0xMDAgZGlzYWJsZWQ6dGV4dC1zbGF0ZS01MDAgZGlzYWJsZWQ6Ym9yZGVyLXNsYXRlLTIwMCBkaXNhYmxlZDpjdXJzb3Itbm90LWFsbG93ZWRcIixcbiAgICAgICAgICAgICAgc2hvd1NlbGVjdGVkSWNvbiA/IHNlbGVjdGVkSW5wdXRQYWRkaW5nQ2xhc3NOYW1lIDogXCJwbC0zXCIsXG4gICAgICAgICAgICAgIHNob3dTZWFyY2hCdXR0b24gPyBcInByLTIwXCIgOiBcInByLTEwXCIsXG4gICAgICAgICAgICAgIGludmFsaWRcbiAgICAgICAgICAgICAgICA/IFwiYm9yZGVyLXJvc2UtNDAwIGJnLXJvc2UtNTAgZm9jdXM6cmluZy1yb3NlLTIwMCBmb2N1czpib3JkZXItcm9zZS00MDBcIlxuICAgICAgICAgICAgICAgIDogXCJib3JkZXItc2xhdGUtMjAwIGZvY3VzOnJpbmctcHJpbWFyeSBmb2N1czpib3JkZXItcHJpbWFyeVwiLFxuICAgICAgICAgICAgICByZWFkT25seU1vZGUgPyBcImluZC1yZWFkb25seS1maWVsZFwiIDogXCJ0ZXh0LXNsYXRlLTkwMFwiXG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgc3R5bGU9e3JlYWRPbmx5TW9kZSA/IHsgY29sb3I6IHZhbHVlQ29sb3IgfSA6IHVuZGVmaW5lZH1cbiAgICAgICAgICAgIHZhbHVlPXtkaXNwbGF5VmFsdWV9XG4gICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgIGlmICghYWxsb3dUZXh0SW5wdXQpIHJldHVybjtcbiAgICAgICAgICAgICAgY29uc3QgdmFsID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgICAgICAgICAgICBzZXRRdWVyeSh2YWwpO1xuICAgICAgICAgICAgICBpZiAoY2xlYXJPbkVtcHR5SW5wdXQgJiYgIXZhbC50cmltKCkpIHtcbiAgICAgICAgICAgICAgICBzZXRTZWxlY3RlZCh7IHZhbHVlOiBcIlwiLCB0ZXh0OiBcIlwiIH0pO1xuICAgICAgICAgICAgICAgIHNldE9wZW4oZmFsc2UpO1xuICAgICAgICAgICAgICAgIGlmICghZW1pdE9uVmFsdWVDaGFuZ2UpIHtcbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlKFwiXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgc2V0T3Blbih0cnVlKTtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBvbktleURvd249e2hhbmRsZUtleURvd259XG4gICAgICAgICAgICBvbkZvY3VzPXsoKSA9PiB7XG4gICAgICAgICAgICAgIGlmICghZGlzYWJsZWQpIHNldE9wZW4odHJ1ZSk7XG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxuICAgICAgICAgICAgcmVhZE9ubHk9e3JlYWRPbmx5TW9kZSB8fCAhYWxsb3dUZXh0SW5wdXR9XG4gICAgICAgICAgICBhcmlhLWxhYmVsPXtsYWJlbH1cbiAgICAgICAgICAgIHJvbGU9XCJjb21ib2JveFwiXG4gICAgICAgICAgICBhcmlhLWV4cGFuZGVkPXtsaXN0T3Blbn1cbiAgICAgICAgICAgIGFyaWEtY29udHJvbHM9e2xpc3RJZH1cbiAgICAgICAgICAgIGFyaWEtYWN0aXZlZGVzY2VuZGFudD17YWN0aXZlSWR9XG4gICAgICAgICAgLz5cbiAgICAgICAgICB7c2hvd1NlbGVjdGVkSWNvbiA/IChcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInBvaW50ZXItZXZlbnRzLW5vbmUgYWJzb2x1dGUgaW5zZXQteS0wIGxlZnQtMCBmbGV4IGl0ZW1zLWNlbnRlciBwbC0zIHRleHQtc2xhdGUtNTAwXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcImlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlclwiLCBzZWxlY3RlZEljb25DbGFzc05hbWUpfT57c2VsZWN0ZWQuaWNvbn08L3NwYW4+XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC15LTAgcmlnaHQtMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSBwci0yXCI+XG4gICAgICAgICAgICB7c2hvd1NlYXJjaEJ1dHRvbiA/IChcbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHAtMS41IHRleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtc2xhdGUtNTAwXCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICBpZiAoZGlzYWJsZWQpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgIHNldE9wZW4odHJ1ZSk7XG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtpbmRUKFwiQ29tbW9uX1NlYXJjaFwiLCBcIlNlYXJjaFwiKX1cbiAgICAgICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBmaWxsPVwibm9uZVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBzdHJva2VXaWR0aD17MS41fSBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBjbGFzc05hbWU9XCJoLTUgdy01XCI+XG4gICAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIm0xNS43NSAxNS43NS0yLjQ4OS0yLjQ4OW0wIDBhMy4zNzUgMy4zNzUgMCAxIDAtNC43NzMtNC43NzMgMy4zNzUgMy4zNzUgMCAwIDAgNC43NzQgNC43NzRaTTIxIDEyYTkgOSAwIDEgMS0xOCAwIDkgOSAwIDAgMSAxOCAwWlwiIC8+XG4gICAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBwLTEuNSB0ZXh0LXNsYXRlLTUwMCBob3Zlcjp0ZXh0LXNsYXRlLTYwMFwiXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZGlzYWJsZWQpIHJldHVybjtcbiAgICAgICAgICAgICAgICBzZXRPcGVuKChwcmV2KSA9PiAhcHJldik7XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgIGFyaWEtbGFiZWw9e29wZW4gPyBpbmRUKFwiRHJvcGRvd25fSGlkZU9wdGlvbnNcIiwgXCJIaWRlIG9wdGlvbnNcIikgOiBpbmRUKFwiRHJvcGRvd25fU2hvd09wdGlvbnNcIiwgXCJTaG93IG9wdGlvbnNcIil9XG4gICAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge29wZW4gPyA8Q2hldnJvblVwU3ZnIGNsYXNzTmFtZT1cImgtNSB3LTVcIiAvPiA6IDxDaGV2cm9uRG93blN2ZyBjbGFzc05hbWU9XCJoLTUgdy01XCIgLz59XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHt1c2VQb3J0YWwgPyAoXG4gICAgICAgICAgPEZsb2F0aW5nTGlzdFxuICAgICAgICAgICAgYW5jaG9yUmVmPXtib3hSZWZ9XG4gICAgICAgICAgICBvcGVuPXtsaXN0T3Blbn1cbiAgICAgICAgICAgIHpJbmRleD17MzYwMDAwfVxuICAgICAgICAgICAgZml4ZWRXaWR0aFB4PXtyZXNvbHZlZERyb3Bkb3duV2lkdGhQeCA/PyB1bmRlZmluZWR9XG4gICAgICAgICAgICBwYW5lbFN0eWxlPXtwYW5lbFN0eWxlfVxuICAgICAgICAgICAgbWF4SGVpZ2h0Q2xhc3M9e2Ryb3Bkb3duTWF4SGVpZ2h0Q2xhc3N9XG4gICAgICAgICAgICByb2xlPVwibGlzdGJveFwiXG4gICAgICAgICAgICByb3VuZGVkQ2xhc3M9XCJyb3VuZGVkLXhsXCJcbiAgICAgICAgICAgIHBvcnRhbENsYXNzTmFtZT17cG9ydGFsQ2xhc3NOYW1lfVxuICAgICAgICAgICAgcGFuZWxDbGFzc05hbWU9e3BhbmVsQ2xhc3NOYW1lfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtsaXN0Qm9keX1cbiAgICAgICAgICA8L0Zsb2F0aW5nTGlzdD5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICBsaXN0T3BlbiAmJiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YGFic29sdXRlIHotMzYwMDAwIG10LTEgdy1mdWxsIHJvdW5kZWQteGwgYmctd2hpdGUgc2hhZG93LWxnIHJpbmctMSByaW5nLWJsYWNrLzUgZm9jdXM6b3V0bGluZS1oaWRkZW4gJHtkcm9wZG93bk1heEhlaWdodENsYXNzfSBvdmVyZmxvdy1hdXRvICR7cGFuZWxDbGFzc05hbWUgfHwgXCJcIn1gfVxuICAgICAgICAgICAgICBzdHlsZT17eyAuLi5pbmxpbmVEcm9wZG93blN0eWxlLCAuLi4ocGFuZWxTdHlsZSB8fCB7fSkgfX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge2xpc3RCb2R5fVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKVxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBTZWxlY3RDb21ib2JveDtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtQkFBNEQ7QUFnTzVCO0FBcEtoQyxJQUFNLGlCQUFpQixDQUFDO0FBQUEsRUFDdEI7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQSxVQUFVO0FBQUEsRUFDVixXQUFXO0FBQUEsRUFDWCxXQUFXO0FBQUEsRUFDWCxZQUFZO0FBQUEsRUFDWixvQkFBb0I7QUFBQSxFQUNwQjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQSxtQkFBbUI7QUFBQSxFQUNuQixpQkFBaUI7QUFBQSxFQUNqQixZQUFZ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
