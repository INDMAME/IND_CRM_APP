import {
  ChevronDownSvg,
  ChevronUpSvg,
  FloatingList_default,
  classNames,
  indT,
  useOutsideClick
} from "./chunk-TAYDLPRE.js";
import {
  require_jsx_runtime,
  require_react
} from "./chunk-BWM3JLWG.js";
import {
  __toESM
} from "./chunk-45FWCHS2.js";

// Web/wwwroot/react/src/context/AuthContext.tsx
var import_react = __toESM(require_react());
var import_jsx_runtime = __toESM(require_jsx_runtime());
var ACCESS_RIGHTS = {
  View: 1,
  Edit: 2,
  Add: 3,
  FullAccess: 4
};
var defaultValue = {
  moduleAccess: {},
  selectedCompany: "",
  allowSelfManagement: false,
  canAccess: () => false
};
var AuthContext = (0, import_react.createContext)(defaultValue);
var AuthProvider = ({ children, moduleAccess, selectedCompany, allowSelfManagement }) => {
  const access = moduleAccess || (globalThis.__IND_MODULE_ACCESS__ || {});
  const company = selectedCompany || String(globalThis.__IND_SELECTED_COMPANY__ || "");
  const selfManagement = allowSelfManagement ?? globalThis.__IND_ALLOW_SELF_MANAGEMENT__ === true;
  const value = (0, import_react.useMemo)(() => {
    const canAccess = (code, level = "View") => {
      const current = Number(access?.[code] ?? 0);
      return current >= ACCESS_RIGHTS[level];
    };
    return {
      moduleAccess: access,
      selectedCompany: company,
      allowSelfManagement: selfManagement,
      canAccess
    };
  }, [access, company, selfManagement]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthContext.Provider, { value, children });
};
var useAuthContext = () => (0, import_react.useContext)(AuthContext);

// Web/wwwroot/react/src/context/I18nContext.tsx
var import_react2 = __toESM(require_react());
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var defaultDict = {};
var defaultValue2 = {
  dictionary: defaultDict,
  t: (key, fallback) => fallback || key,
  format: (key, fallback, ...args) => {
    const template = fallback || key;
    return String(template).replace(/\{(\d+)\}/g, (_, idx) => String(args[Number(idx)] ?? ""));
  }
};
var I18nContext = (0, import_react2.createContext)(defaultValue2);
var I18nProvider = ({ children, dictionary }) => {
  const dict = dictionary || (globalThis.__IND_I18N__ || {});
  const value = (0, import_react2.useMemo)(() => {
    const t = (key, fallback) => {
      const value2 = dict[key];
      if (typeof value2 === "string" && value2.trim()) return value2;
      return fallback || key;
    };
    const format = (key, fallback, ...args) => {
      const template = t(key, fallback);
      return String(template).replace(/\{(\d+)\}/g, (_, idx) => String(args[Number(idx)] ?? ""));
    };
    return { dictionary: dict, t, format };
  }, [dict]);
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(I18nContext.Provider, { value, children });
};

// Web/wwwroot/react/src/components/commons/VisitasPageProviders.tsx
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
var VisitasPageProviders = ({ children }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(I18nProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(AuthProvider, { children }) });
};
var VisitasPageProviders_default = VisitasPageProviders;

// Web/wwwroot/react/src/components/commons/SelectCombobox.tsx
var import_react3 = __toESM(require_react());
var import_jsx_runtime4 = __toESM(require_jsx_runtime());
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
  const data = (0, import_react3.useMemo)(() => {
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
  const [query, setQuery] = (0, import_react3.useState)(null);
  const [selected, setSelected] = (0, import_react3.useState)(
    data.find((d) => String(d.value) === String(value)) || { value: "", text: "" }
  );
  const [open, setOpen] = (0, import_react3.useState)(false);
  const [activeIndex, setActiveIndex] = (0, import_react3.useState)(0);
  const containerRef = (0, import_react3.useRef)(null);
  const boxRef = (0, import_react3.useRef)(null);
  const listRef = (0, import_react3.useRef)(null);
  const initialDropdownWidthRef = (0, import_react3.useRef)(null);
  useOutsideClick([containerRef, listRef], () => setOpen(false));
  (0, import_react3.useEffect)(() => {
    setSelected(data.find((d) => String(d.value) === String(value)) || { value: "", text: "" });
  }, [value, data]);
  (0, import_react3.useEffect)(() => {
    setQuery(null);
  }, [selected]);
  (0, import_react3.useEffect)(() => {
    if (!emitOnValueChange) return;
    onChange(selected?.value ? String(selected.value) : "");
  }, [emitOnValueChange, onChange, selected]);
  const filtered = (0, import_react3.useMemo)(() => {
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
  (0, import_react3.useEffect)(() => {
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
  (0, import_react3.useEffect)(() => {
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
  const listBody = /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { id: listId, ref: listRef, role: "listbox", "aria-label": label, children: [
    filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "px-4 py-2 text-sm text-slate-500", children: indT("Dropdown_NoResults", "No results") }),
    filtered.map((opt, idx) => {
      const sel = selected?.value === opt.value;
      const isActive = idx === activeIndex;
      const optionStateClassName = sel ? optionSelectedClassName : isActive ? optionActiveClassName : optionDefaultClassName;
      return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
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
            sel && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "span",
              {
                className: classNames(
                  "absolute inset-y-0 left-0 flex items-center pl-2",
                  isActive ? "text-white" : "text-primary"
                )
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
              "span",
              {
                className: classNames(
                  allowOptionHorizontalScroll ? "inline-flex items-center gap-2" : "flex min-w-0 items-center gap-2",
                  sel ? "font-medium" : "font-normal"
                ),
                style: allowOptionHorizontalScroll ? { minWidth: "max-content" } : void 0,
                children: [
                  opt.icon ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
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
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
    "div",
    {
      className: classNames("space-y-2", disabled ? "pointer-events-none select-none" : ""),
      ref: containerRef,
      children: [
        showLabel ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("label", { className: classNames("form-label font-semibold", invalid ? "text-rose-700" : ""), children: label }) : null,
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "relative", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
            "div",
            {
              ref: boxRef,
              className: classNames(
                "relative w-full cursor-default rounded-xl bg-white text-left focus-within:border-primary focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-white sm:text-sm",
                readOnlyMode ? "ind-readonly-field" : ""
              ),
              style: readOnlyMode ? { color: valueColor } : void 0,
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
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
                showSelectedIcon ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: classNames("inline-flex items-center justify-center", selectedIconClassName), children: selected.icon }) }) : null,
                /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "absolute inset-y-0 right-0 flex items-center gap-1 pr-2", children: [
                  showSearchButton ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
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
                      children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: "h-5 w-5", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" }) })
                    }
                  ) : null,
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
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
                      children: open ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ChevronUpSvg, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ChevronDownSvg, { className: "h-5 w-5" })
                    }
                  )
                ] })
              ]
            }
          ),
          usePortal ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
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
          ) : listOpen && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
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
  SelectCombobox_default,
  useAuthContext,
  VisitasPageProviders_default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL2NvbnRleHQvQXV0aENvbnRleHQudHN4IiwgIi4uLy4uL3JlYWN0L3NyYy9jb250ZXh0L0kxOG5Db250ZXh0LnRzeCIsICIuLi8uLi9yZWFjdC9zcmMvY29tcG9uZW50cy9jb21tb25zL1Zpc2l0YXNQYWdlUHJvdmlkZXJzLnRzeCIsICIuLi8uLi9yZWFjdC9zcmMvY29tcG9uZW50cy9jb21tb25zL1NlbGVjdENvbWJvYm94LnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IFJlYWN0LCB7IGNyZWF0ZUNvbnRleHQsIHVzZUNvbnRleHQsIHVzZU1lbW8gfSBmcm9tIFwicmVhY3RcIjtcblxuZXhwb3J0IHR5cGUgQWNjZXNzTGV2ZWwgPSBcIlZpZXdcIiB8IFwiRWRpdFwiIHwgXCJBZGRcIiB8IFwiRnVsbEFjY2Vzc1wiO1xuXG5jb25zdCBBQ0NFU1NfUklHSFRTOiBSZWNvcmQ8QWNjZXNzTGV2ZWwsIG51bWJlcj4gPSB7XG4gIFZpZXc6IDEsXG4gIEVkaXQ6IDIsXG4gIEFkZDogMyxcbiAgRnVsbEFjY2VzczogNCxcbn07XG5cbnR5cGUgQXV0aFZhbHVlID0ge1xuICBtb2R1bGVBY2Nlc3M6IFJlY29yZDxzdHJpbmcsIG51bWJlcj47XG4gIHNlbGVjdGVkQ29tcGFueTogc3RyaW5nO1xuICBhbGxvd1NlbGZNYW5hZ2VtZW50OiBib29sZWFuO1xuICBjYW5BY2Nlc3M6IChjb2RlOiBzdHJpbmcsIGxldmVsPzogQWNjZXNzTGV2ZWwpID0+IGJvb2xlYW47XG59O1xuXG5jb25zdCBkZWZhdWx0VmFsdWU6IEF1dGhWYWx1ZSA9IHtcbiAgbW9kdWxlQWNjZXNzOiB7fSxcbiAgc2VsZWN0ZWRDb21wYW55OiBcIlwiLFxuICBhbGxvd1NlbGZNYW5hZ2VtZW50OiBmYWxzZSxcbiAgY2FuQWNjZXNzOiAoKSA9PiBmYWxzZSxcbn07XG5cbmNvbnN0IEF1dGhDb250ZXh0ID0gY3JlYXRlQ29udGV4dDxBdXRoVmFsdWU+KGRlZmF1bHRWYWx1ZSk7XG5cbnR5cGUgUHJvdmlkZXJQcm9wcyA9IHtcbiAgY2hpbGRyZW46IFJlYWN0LlJlYWN0Tm9kZTtcbiAgbW9kdWxlQWNjZXNzPzogUmVjb3JkPHN0cmluZywgbnVtYmVyPjtcbiAgc2VsZWN0ZWRDb21wYW55Pzogc3RyaW5nO1xuICBhbGxvd1NlbGZNYW5hZ2VtZW50PzogYm9vbGVhbjtcbn07XG5cbmV4cG9ydCBjb25zdCBBdXRoUHJvdmlkZXIgPSAoeyBjaGlsZHJlbiwgbW9kdWxlQWNjZXNzLCBzZWxlY3RlZENvbXBhbnksIGFsbG93U2VsZk1hbmFnZW1lbnQgfTogUHJvdmlkZXJQcm9wcykgPT4ge1xuICBjb25zdCBhY2Nlc3MgPSBtb2R1bGVBY2Nlc3MgfHwgKGdsb2JhbFRoaXMuX19JTkRfTU9EVUxFX0FDQ0VTU19fIHx8IHt9KTtcbiAgY29uc3QgY29tcGFueSA9IHNlbGVjdGVkQ29tcGFueSB8fCBTdHJpbmcoZ2xvYmFsVGhpcy5fX0lORF9TRUxFQ1RFRF9DT01QQU5ZX18gfHwgXCJcIik7XG4gIC8vIENvbXBhbnktc2NvcGVkIHBlcm1pc3Npb24gaW5qZWN0ZWQgYnkgUmF6b3IgbGF5b3V0IGZyb20gc2VsZWN0ZWQgY29tcGFueSBjb250ZXh0LlxuICAvLyBTZW5zaXRpdmUgZWRpdCBmbG93cyBtdXN0IGdhdGUgd2l0aCB0aGlzIHZhbHVlIGluIGFkZGl0aW9uIHRvIG1vZHVsZSBhY2Nlc3MgcmlnaHRzLlxuICBjb25zdCBzZWxmTWFuYWdlbWVudCA9IGFsbG93U2VsZk1hbmFnZW1lbnQgPz8gZ2xvYmFsVGhpcy5fX0lORF9BTExPV19TRUxGX01BTkFHRU1FTlRfXyA9PT0gdHJ1ZTtcblxuICBjb25zdCB2YWx1ZSA9IHVzZU1lbW88QXV0aFZhbHVlPigoKSA9PiB7XG4gICAgY29uc3QgY2FuQWNjZXNzID0gKGNvZGU6IHN0cmluZywgbGV2ZWw6IEFjY2Vzc0xldmVsID0gXCJWaWV3XCIpID0+IHtcbiAgICAgIGNvbnN0IGN1cnJlbnQgPSBOdW1iZXIoYWNjZXNzPy5bY29kZV0gPz8gMCk7XG4gICAgICByZXR1cm4gY3VycmVudCA+PSBBQ0NFU1NfUklHSFRTW2xldmVsXTtcbiAgICB9O1xuICAgIHJldHVybiB7XG4gICAgICBtb2R1bGVBY2Nlc3M6IGFjY2VzcyxcbiAgICAgIHNlbGVjdGVkQ29tcGFueTogY29tcGFueSxcbiAgICAgIGFsbG93U2VsZk1hbmFnZW1lbnQ6IHNlbGZNYW5hZ2VtZW50LFxuICAgICAgY2FuQWNjZXNzLFxuICAgIH07XG4gIH0sIFthY2Nlc3MsIGNvbXBhbnksIHNlbGZNYW5hZ2VtZW50XSk7XG5cbiAgcmV0dXJuIDxBdXRoQ29udGV4dC5Qcm92aWRlciB2YWx1ZT17dmFsdWV9PntjaGlsZHJlbn08L0F1dGhDb250ZXh0LlByb3ZpZGVyPjtcbn07XG5cbmV4cG9ydCBjb25zdCB1c2VBdXRoQ29udGV4dCA9ICgpID0+IHVzZUNvbnRleHQoQXV0aENvbnRleHQpO1xuIiwgImltcG9ydCBSZWFjdCwgeyBjcmVhdGVDb250ZXh0LCB1c2VDb250ZXh0LCB1c2VNZW1vIH0gZnJvbSBcInJlYWN0XCI7XG5cbnR5cGUgSTE4bkRpY3QgPSBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+O1xuXG50eXBlIEkxOG5WYWx1ZSA9IHtcbiAgZGljdGlvbmFyeTogSTE4bkRpY3Q7XG4gIHQ6IChrZXk6IHN0cmluZywgZmFsbGJhY2s/OiBzdHJpbmcpID0+IHN0cmluZztcbiAgZm9ybWF0OiAoa2V5OiBzdHJpbmcsIGZhbGxiYWNrOiBzdHJpbmcgfCB1bmRlZmluZWQsIC4uLmFyZ3M6IEFycmF5PHN0cmluZyB8IG51bWJlcj4pID0+IHN0cmluZztcbn07XG5cbmNvbnN0IGRlZmF1bHREaWN0OiBJMThuRGljdCA9IHt9O1xuXG5jb25zdCBkZWZhdWx0VmFsdWU6IEkxOG5WYWx1ZSA9IHtcbiAgZGljdGlvbmFyeTogZGVmYXVsdERpY3QsXG4gIHQ6IChrZXksIGZhbGxiYWNrKSA9PiBmYWxsYmFjayB8fCBrZXksXG4gIGZvcm1hdDogKGtleSwgZmFsbGJhY2ssIC4uLmFyZ3MpID0+IHtcbiAgICBjb25zdCB0ZW1wbGF0ZSA9IGZhbGxiYWNrIHx8IGtleTtcbiAgICByZXR1cm4gU3RyaW5nKHRlbXBsYXRlKS5yZXBsYWNlKC9cXHsoXFxkKylcXH0vZywgKF8sIGlkeCkgPT4gU3RyaW5nKGFyZ3NbTnVtYmVyKGlkeCldID8/IFwiXCIpKTtcbiAgfSxcbn07XG5cbmNvbnN0IEkxOG5Db250ZXh0ID0gY3JlYXRlQ29udGV4dDxJMThuVmFsdWU+KGRlZmF1bHRWYWx1ZSk7XG5cbnR5cGUgUHJvdmlkZXJQcm9wcyA9IHtcbiAgY2hpbGRyZW46IFJlYWN0LlJlYWN0Tm9kZTtcbiAgZGljdGlvbmFyeT86IEkxOG5EaWN0O1xufTtcblxuZXhwb3J0IGNvbnN0IEkxOG5Qcm92aWRlciA9ICh7IGNoaWxkcmVuLCBkaWN0aW9uYXJ5IH06IFByb3ZpZGVyUHJvcHMpID0+IHtcbiAgY29uc3QgZGljdCA9IGRpY3Rpb25hcnkgfHwgKGdsb2JhbFRoaXMuX19JTkRfSTE4Tl9fIHx8IHt9KTtcblxuICBjb25zdCB2YWx1ZSA9IHVzZU1lbW88STE4blZhbHVlPigoKSA9PiB7XG4gICAgY29uc3QgdCA9IChrZXk6IHN0cmluZywgZmFsbGJhY2s/OiBzdHJpbmcpID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gZGljdFtrZXldO1xuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiAmJiB2YWx1ZS50cmltKCkpIHJldHVybiB2YWx1ZTtcbiAgICAgIHJldHVybiBmYWxsYmFjayB8fCBrZXk7XG4gICAgfTtcbiAgICBjb25zdCBmb3JtYXQgPSAoa2V5OiBzdHJpbmcsIGZhbGxiYWNrOiBzdHJpbmcgfCB1bmRlZmluZWQsIC4uLmFyZ3M6IEFycmF5PHN0cmluZyB8IG51bWJlcj4pID0+IHtcbiAgICAgIGNvbnN0IHRlbXBsYXRlID0gdChrZXksIGZhbGxiYWNrKTtcbiAgICAgIHJldHVybiBTdHJpbmcodGVtcGxhdGUpLnJlcGxhY2UoL1xceyhcXGQrKVxcfS9nLCAoXywgaWR4KSA9PiBTdHJpbmcoYXJnc1tOdW1iZXIoaWR4KV0gPz8gXCJcIikpO1xuICAgIH07XG4gICAgcmV0dXJuIHsgZGljdGlvbmFyeTogZGljdCwgdCwgZm9ybWF0IH07XG4gIH0sIFtkaWN0XSk7XG5cbiAgcmV0dXJuIDxJMThuQ29udGV4dC5Qcm92aWRlciB2YWx1ZT17dmFsdWV9PntjaGlsZHJlbn08L0kxOG5Db250ZXh0LlByb3ZpZGVyPjtcbn07XG5cbmV4cG9ydCBjb25zdCB1c2VJMThuID0gKCkgPT4gdXNlQ29udGV4dChJMThuQ29udGV4dCk7XG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgSTE4blByb3ZpZGVyIH0gZnJvbSBcIi4uLy4uL2NvbnRleHQvSTE4bkNvbnRleHQudHN4XCI7XG5pbXBvcnQgeyBBdXRoUHJvdmlkZXIgfSBmcm9tIFwiLi4vLi4vY29udGV4dC9BdXRoQ29udGV4dC50c3hcIjtcblxudHlwZSBQcm9wcyA9IHtcbiAgY2hpbGRyZW46IFJlYWN0LlJlYWN0Tm9kZTtcbn07XG5cbi8vIFNoYXJlZCBwcm92aWRlciB3cmFwcGVyIGZvciB2aXNpdGFzIFJlYWN0IGlzbGFuZHMuXG5jb25zdCBWaXNpdGFzUGFnZVByb3ZpZGVycyA9ICh7IGNoaWxkcmVuIH06IFByb3BzKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPEkxOG5Qcm92aWRlcj5cbiAgICAgIDxBdXRoUHJvdmlkZXI+e2NoaWxkcmVufTwvQXV0aFByb3ZpZGVyPlxuICAgIDwvSTE4blByb3ZpZGVyPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgVmlzaXRhc1BhZ2VQcm92aWRlcnM7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IEZsb2F0aW5nTGlzdCBmcm9tIFwiLi9GbG9hdGluZ0xpc3QudHN4XCI7XG5pbXBvcnQgeyBDaGV2cm9uRG93blN2ZywgQ2hldnJvblVwU3ZnIH0gZnJvbSBcIi4vY2hldnJvbnMudHN4XCI7XG5pbXBvcnQgeyB1c2VPdXRzaWRlQ2xpY2sgfSBmcm9tIFwiLi4vLi4vaG9va3MvdXNlT3V0c2lkZUNsaWNrLnRzXCI7XG5pbXBvcnQgeyBjbGFzc05hbWVzIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2NsYXNzTmFtZXMudHNcIjtcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuXG50eXBlIFJhd09wdGlvbiA9XG4gIHwge1xuICAgICAgdmFsdWU/OiBzdHJpbmcgfCBudW1iZXI7XG4gICAgICBWYWx1ZT86IHN0cmluZyB8IG51bWJlcjtcbiAgICAgIHRleHQ/OiBzdHJpbmc7XG4gICAgICBUZXh0Pzogc3RyaW5nO1xuICAgICAgaWNvbj86IFJlYWN0LlJlYWN0Tm9kZTtcbiAgICAgIEljb24/OiBSZWFjdC5SZWFjdE5vZGU7XG4gICAgfVxuICB8IFtzdHJpbmcgfCBudW1iZXIsIHN0cmluZ107XG5cbnR5cGUgTm9ybWFsaXplZE9wdGlvbiA9IHtcbiAgdmFsdWU6IHN0cmluZyB8IG51bWJlcjtcbiAgdGV4dDogc3RyaW5nO1xuICBpY29uPzogUmVhY3QuUmVhY3ROb2RlO1xufTtcblxudHlwZSBTZWxlY3RDb21ib2JveFByb3BzID0ge1xuICBsYWJlbDogc3RyaW5nO1xuICBvcHRpb25zOiBSYXdPcHRpb25bXTtcbiAgdmFsdWU6IHN0cmluZyB8IG51bWJlcjtcbiAgb25DaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBwbGFjZWhvbGRlcj86IHN0cmluZztcbiAgaW52YWxpZD86IGJvb2xlYW47XG4gIGRpc2FibGVkPzogYm9vbGVhbjtcbiAgcmVhZE9ubHk/OiBib29sZWFuO1xuICB1c2VQb3J0YWw/OiBib29sZWFuO1xuICBlbWl0T25WYWx1ZUNoYW5nZT86IGJvb2xlYW47XG4gIGlkQmFzZT86IHN0cmluZztcbiAgcG9ydGFsQ2xhc3NOYW1lPzogc3RyaW5nO1xuICBwYW5lbENsYXNzTmFtZT86IHN0cmluZztcbiAgc2hvd1NlYXJjaEJ1dHRvbj86IGJvb2xlYW47XG4gIGFsbG93VGV4dElucHV0PzogYm9vbGVhbjtcbiAgc2hvd0xhYmVsPzogYm9vbGVhbjtcbiAgc2VsZWN0ZWRUZXh0TW9kZT86IFwidGV4dFwiIHwgXCJ2YWx1ZVwiO1xuICBkcm9wZG93bkV4cGFuZFB4PzogbnVtYmVyO1xuICBkcm9wZG93bk1heEhlaWdodENsYXNzPzogc3RyaW5nO1xuICBzZWxlY3RlZEljb25DbGFzc05hbWU/OiBzdHJpbmc7XG4gIG9wdGlvbkljb25DbGFzc05hbWU/OiBzdHJpbmc7XG4gIGFsbG93T3B0aW9uSG9yaXpvbnRhbFNjcm9sbD86IGJvb2xlYW47XG4gIGxvY2tEcm9wZG93bldpZHRoT25GaXJzdE9wZW4/OiBib29sZWFuO1xuICBkaXNhYmxlRGVmYXVsdE9wdGlvblBhZGRpbmc/OiBib29sZWFuO1xuICBvcHRpb25MZWZ0UGFkZGluZ0NsYXNzTmFtZT86IHN0cmluZztcbiAgb3B0aW9uVGV4dENsYXNzTmFtZT86IHN0cmluZztcbiAgb3B0aW9uRGVmYXVsdENsYXNzTmFtZT86IHN0cmluZztcbiAgb3B0aW9uQWN0aXZlQ2xhc3NOYW1lPzogc3RyaW5nO1xuICBvcHRpb25TZWxlY3RlZENsYXNzTmFtZT86IHN0cmluZztcbiAgc2VsZWN0ZWRJbnB1dFBhZGRpbmdDbGFzc05hbWU/OiBzdHJpbmc7XG4gIHBhbmVsU3R5bGU/OiBSZWFjdC5DU1NQcm9wZXJ0aWVzO1xuICBjbGVhck9uRW1wdHlJbnB1dD86IGJvb2xlYW47XG59O1xuXG4vLyBSZXVzYWJsZSBzZWxlY3QgY29tYm9ib3ggd2l0aCBvcHRpb25hbCBwb3J0YWwgcmVuZGVyaW5nIGZvciB0aGUgbGlzdC5cbmNvbnN0IFNlbGVjdENvbWJvYm94ID0gKHtcbiAgbGFiZWwsXG4gIG9wdGlvbnMsXG4gIHZhbHVlLFxuICBvbkNoYW5nZSxcbiAgcGxhY2Vob2xkZXIsXG4gIGludmFsaWQgPSBmYWxzZSxcbiAgZGlzYWJsZWQgPSBmYWxzZSxcbiAgcmVhZE9ubHkgPSBmYWxzZSxcbiAgdXNlUG9ydGFsID0gdHJ1ZSxcbiAgZW1pdE9uVmFsdWVDaGFuZ2UgPSBmYWxzZSxcbiAgaWRCYXNlLFxuICBwb3J0YWxDbGFzc05hbWUsXG4gIHBhbmVsQ2xhc3NOYW1lLFxuICBzaG93U2VhcmNoQnV0dG9uID0gZmFsc2UsXG4gIGFsbG93VGV4dElucHV0ID0gdHJ1ZSxcbiAgc2hvd0xhYmVsID0gdHJ1ZSxcbiAgc2VsZWN0ZWRUZXh0TW9kZSA9IFwidGV4dFwiLFxuICBkcm9wZG93bkV4cGFuZFB4ID0gMCxcbiAgZHJvcGRvd25NYXhIZWlnaHRDbGFzcyA9IFwibWF4LWgtNzJcIixcbiAgc2VsZWN0ZWRJY29uQ2xhc3NOYW1lID0gXCJoLTQgdy00XCIsXG4gIG9wdGlvbkljb25DbGFzc05hbWUgPSBcImgtNCB3LTRcIixcbiAgYWxsb3dPcHRpb25Ib3Jpem9udGFsU2Nyb2xsID0gZmFsc2UsXG4gIGxvY2tEcm9wZG93bldpZHRoT25GaXJzdE9wZW4gPSBmYWxzZSxcbiAgZGlzYWJsZURlZmF1bHRPcHRpb25QYWRkaW5nID0gZmFsc2UsXG4gIG9wdGlvbkxlZnRQYWRkaW5nQ2xhc3NOYW1lID0gXCJcIixcbiAgb3B0aW9uVGV4dENsYXNzTmFtZSA9IFwiXCIsXG4gIG9wdGlvbkRlZmF1bHRDbGFzc05hbWUgPSBcInRleHQtc2xhdGUtOTAwXCIsXG4gIG9wdGlvbkFjdGl2ZUNsYXNzTmFtZSA9IFwiYmctcHJpbWFyeSB0ZXh0LXdoaXRlXCIsXG4gIG9wdGlvblNlbGVjdGVkQ2xhc3NOYW1lID0gXCJiZy1wcmltYXJ5IHRleHQtd2hpdGVcIixcbiAgc2VsZWN0ZWRJbnB1dFBhZGRpbmdDbGFzc05hbWUgPSBcInBsLTlcIixcbiAgcGFuZWxTdHlsZSxcbiAgY2xlYXJPbkVtcHR5SW5wdXQgPSBmYWxzZSxcbn06IFNlbGVjdENvbWJvYm94UHJvcHMpID0+IHtcbiAgY29uc3QgcmVhZE9ubHlNb2RlID0gcmVhZE9ubHkgfHwgZGlzYWJsZWQ7XG4gIGNvbnN0IHZhbHVlQ29sb3IgPSByZWFkT25seU1vZGUgPyBcIiM2NDc0OGJcIiA6IFwiIzAwMjk2YmUwXCI7XG4gIGNvbnN0IGRhdGEgPSB1c2VNZW1vKCgpID0+IHtcbiAgICByZXR1cm4gKG9wdGlvbnMgfHwgW10pLm1hcDxOb3JtYWxpemVkT3B0aW9uPigobykgPT4ge1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkobykpIHtcbiAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG9bMF0gPz8gXCJcIiwgdGV4dDogb1sxXSA/PyBcIlwiIH07XG4gICAgICB9XG4gICAgICByZXR1cm4ge1xuICAgICAgICB2YWx1ZTogbz8udmFsdWUgPz8gbz8uVmFsdWUgPz8gXCJcIixcbiAgICAgICAgdGV4dDogbz8udGV4dCA/PyBvPy5UZXh0ID8/IFwiXCIsXG4gICAgICAgIGljb246IG8/Lmljb24gPz8gbz8uSWNvbixcbiAgICAgIH07XG4gICAgfSk7XG4gIH0sIFtvcHRpb25zXSk7XG5cbiAgY29uc3QgW3F1ZXJ5LCBzZXRRdWVyeV0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW3NlbGVjdGVkLCBzZXRTZWxlY3RlZF0gPSB1c2VTdGF0ZShcbiAgICBkYXRhLmZpbmQoKGQpID0+IFN0cmluZyhkLnZhbHVlKSA9PT0gU3RyaW5nKHZhbHVlKSkgfHwgeyB2YWx1ZTogXCJcIiwgdGV4dDogXCJcIiB9XG4gICk7XG4gIGNvbnN0IFtvcGVuLCBzZXRPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2FjdGl2ZUluZGV4LCBzZXRBY3RpdmVJbmRleF0gPSB1c2VTdGF0ZSgwKTtcbiAgY29uc3QgY29udGFpbmVyUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IGJveFJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBsaXN0UmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IGluaXRpYWxEcm9wZG93bldpZHRoUmVmID0gdXNlUmVmPG51bWJlciB8IG51bGw+KG51bGwpO1xuXG4gIHVzZU91dHNpZGVDbGljayhbY29udGFpbmVyUmVmLCBsaXN0UmVmXSwgKCkgPT4gc2V0T3BlbihmYWxzZSkpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc2V0U2VsZWN0ZWQoZGF0YS5maW5kKChkKSA9PiBTdHJpbmcoZC52YWx1ZSkgPT09IFN0cmluZyh2YWx1ZSkpIHx8IHsgdmFsdWU6IFwiXCIsIHRleHQ6IFwiXCIgfSk7XG4gIH0sIFt2YWx1ZSwgZGF0YV0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgLy8gUmVzZXQgdHlwZWQgc2VhcmNoIHRleHQgYWZ0ZXIgZXh0ZXJuYWwgdmFsdWUgY2hhbmdlcy5cbiAgICBzZXRRdWVyeShudWxsKTtcbiAgfSwgW3NlbGVjdGVkXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWVtaXRPblZhbHVlQ2hhbmdlKSByZXR1cm47XG4gICAgb25DaGFuZ2Uoc2VsZWN0ZWQ/LnZhbHVlID8gU3RyaW5nKHNlbGVjdGVkLnZhbHVlKSA6IFwiXCIpO1xuICB9LCBbZW1pdE9uVmFsdWVDaGFuZ2UsIG9uQ2hhbmdlLCBzZWxlY3RlZF0pO1xuXG4gIGNvbnN0IGZpbHRlcmVkID0gdXNlTWVtbygoKSA9PiB7XG4gICAgaWYgKCFxdWVyeSB8fCAhcXVlcnkudHJpbSgpKSByZXR1cm4gZGF0YTtcbiAgICBjb25zdCBmID0gZGF0YS5maWx0ZXIoKG8pID0+IHtcbiAgICAgIGNvbnN0IG9wdGlvblZhbHVlID0gU3RyaW5nKG8udmFsdWUgPz8gXCJcIikudHJpbSgpO1xuICAgICAgaWYgKCFvcHRpb25WYWx1ZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gby50ZXh0LnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMocXVlcnkudG9Mb3dlckNhc2UoKSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGYubGVuZ3RoID8gZiA6IGRhdGE7XG4gIH0sIFtkYXRhLCBxdWVyeV0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc2V0QWN0aXZlSW5kZXgoMCk7XG4gIH0sIFtmaWx0ZXJlZC5sZW5ndGgsIHF1ZXJ5XSk7XG5cbiAgY29uc3Qgc2VsZWN0T3B0aW9uID0gKG9wdDogTm9ybWFsaXplZE9wdGlvbikgPT4ge1xuICAgIHNldFNlbGVjdGVkKG9wdCk7XG4gICAgc2V0UXVlcnkobnVsbCk7XG4gICAgc2V0T3BlbihmYWxzZSk7XG4gICAgaWYgKCFlbWl0T25WYWx1ZUNoYW5nZSkge1xuICAgICAgb25DaGFuZ2Uob3B0Py52YWx1ZSA/IFN0cmluZyhvcHQudmFsdWUpIDogXCJcIik7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUtleURvd24gPSAoZXY6IFJlYWN0LktleWJvYXJkRXZlbnQ8SFRNTElucHV0RWxlbWVudD4pID0+IHtcbiAgICBpZiAoZGlzYWJsZWQpIHJldHVybjtcbiAgICBpZiAoZXYua2V5ID09PSBcIkFycm93RG93blwiKSB7XG4gICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgc2V0T3Blbih0cnVlKTtcbiAgICAgIGlmIChmaWx0ZXJlZC5sZW5ndGgpIHNldEFjdGl2ZUluZGV4KChpZHgpID0+IChpZHggKyAxKSAlIGZpbHRlcmVkLmxlbmd0aCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChldi5rZXkgPT09IFwiQXJyb3dVcFwiKSB7XG4gICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgc2V0T3Blbih0cnVlKTtcbiAgICAgIGlmIChmaWx0ZXJlZC5sZW5ndGgpIHNldEFjdGl2ZUluZGV4KChpZHgpID0+IChpZHggLSAxICsgZmlsdGVyZWQubGVuZ3RoKSAlIGZpbHRlcmVkLmxlbmd0aCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChldi5rZXkgPT09IFwiRW50ZXJcIikge1xuICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGlmIChjbGVhck9uRW1wdHlJbnB1dCAmJiBxdWVyeSAhPT0gbnVsbCAmJiAhcXVlcnkudHJpbSgpKSB7XG4gICAgICAgIHNldE9wZW4oZmFsc2UpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAob3BlbiAmJiBmaWx0ZXJlZC5sZW5ndGgpIHtcbiAgICAgICAgc2VsZWN0T3B0aW9uKGZpbHRlcmVkW2FjdGl2ZUluZGV4XSA/PyBmaWx0ZXJlZFswXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZXRPcGVuKHRydWUpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZXYua2V5ID09PSBcIkVzY2FwZVwiKSBzZXRPcGVuKGZhbHNlKTtcbiAgfTtcblxuICBjb25zdCBzYWZlSWQgPSBTdHJpbmcoaWRCYXNlIHx8IGxhYmVsIHx8IFwic2VsZWN0XCIpO1xuICBjb25zdCBsaXN0SWQgPSBgc2VsZWN0LW9wdGlvbnMtJHtzYWZlSWR9YDtcbiAgY29uc3QgYWN0aXZlSWQgPSBvcGVuICYmIGZpbHRlcmVkW2FjdGl2ZUluZGV4XSA/IGBzZWxlY3Qtb3B0LSR7c2FmZUlkfS0ke2ZpbHRlcmVkW2FjdGl2ZUluZGV4XS52YWx1ZX1gIDogdW5kZWZpbmVkO1xuICBjb25zdCBsaXN0T3BlbiA9IG9wZW4gJiYgIWRpc2FibGVkO1xuICBjb25zdCBzZWxlY3RlZFZhbHVlID0gU3RyaW5nKHNlbGVjdGVkPy52YWx1ZSA/PyBcIlwiKS50cmltKCk7XG4gIGNvbnN0IHNlbGVjdGVkRGlzcGxheVRleHQgPSBzZWxlY3RlZFRleHRNb2RlID09PSBcInZhbHVlXCIgPyBzZWxlY3RlZFZhbHVlIDogc2VsZWN0ZWQ/LnRleHQgfHwgXCJcIjtcbiAgY29uc3QgZGlzcGxheVZhbHVlID0gcXVlcnkgIT09IG51bGwgPyBxdWVyeSA6IChzZWxlY3RlZFZhbHVlID8gc2VsZWN0ZWREaXNwbGF5VGV4dCA6IFwiXCIpO1xuICBjb25zdCBzaG93U2VsZWN0ZWRJY29uID0gcXVlcnkgPT09IG51bGwgJiYgISFzZWxlY3RlZFZhbHVlICYmICEhc2VsZWN0ZWQ/Lmljb247XG4gIGNvbnN0IG5vcm1hbGl6ZWREcm9wZG93bkV4cGFuZFB4ID0gTnVtYmVyLmlzRmluaXRlKGRyb3Bkb3duRXhwYW5kUHgpID8gTWF0aC5tYXgoMCwgZHJvcGRvd25FeHBhbmRQeCkgOiAwO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFsb2NrRHJvcGRvd25XaWR0aE9uRmlyc3RPcGVuKSByZXR1cm47XG4gICAgaWYgKCFsaXN0T3BlbikgcmV0dXJuO1xuICAgIGlmIChpbml0aWFsRHJvcGRvd25XaWR0aFJlZi5jdXJyZW50ICE9PSBudWxsKSByZXR1cm47XG5cbiAgICBjb25zdCB3aWR0aCA9IGJveFJlZi5jdXJyZW50Py5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcbiAgICBpZiAoIU51bWJlci5pc0Zpbml0ZSh3aWR0aCkgfHwgIXdpZHRoIHx8IHdpZHRoIDw9IDApIHJldHVybjtcbiAgICBpbml0aWFsRHJvcGRvd25XaWR0aFJlZi5jdXJyZW50ID0gd2lkdGg7XG4gIH0sIFtsaXN0T3BlbiwgbG9ja0Ryb3Bkb3duV2lkdGhPbkZpcnN0T3Blbl0pO1xuXG4gIGNvbnN0IGZpeGVkRHJvcGRvd25CYXNlV2lkdGggPSBsb2NrRHJvcGRvd25XaWR0aE9uRmlyc3RPcGVuID8gaW5pdGlhbERyb3Bkb3duV2lkdGhSZWYuY3VycmVudCA6IG51bGw7XG4gIGNvbnN0IHJlc29sdmVkRHJvcGRvd25XaWR0aFB4ID1cbiAgICBmaXhlZERyb3Bkb3duQmFzZVdpZHRoICE9PSBudWxsICYmIE51bWJlci5pc0Zpbml0ZShmaXhlZERyb3Bkb3duQmFzZVdpZHRoKVxuICAgICAgPyBmaXhlZERyb3Bkb3duQmFzZVdpZHRoICsgbm9ybWFsaXplZERyb3Bkb3duRXhwYW5kUHhcbiAgICAgIDogbnVsbDtcbiAgY29uc3QgaW5saW5lRHJvcGRvd25TdHlsZTogUmVhY3QuQ1NTUHJvcGVydGllcyB8IHVuZGVmaW5lZCA9XG4gICAgcmVzb2x2ZWREcm9wZG93bldpZHRoUHggIT09IG51bGwgJiYgcmVzb2x2ZWREcm9wZG93bldpZHRoUHggPiAwXG4gICAgICA/IHsgd2lkdGg6IGAke3Jlc29sdmVkRHJvcGRvd25XaWR0aFB4fXB4YCB9XG4gICAgICA6IG5vcm1hbGl6ZWREcm9wZG93bkV4cGFuZFB4ID4gMFxuICAgICAgICA/IHsgd2lkdGg6IGBjYWxjKDEwMCUgKyAke25vcm1hbGl6ZWREcm9wZG93bkV4cGFuZFB4fXB4KWAgfVxuICAgICAgICA6IHVuZGVmaW5lZDtcblxuICBjb25zdCBsaXN0Qm9keSA9IChcbiAgICA8ZGl2IGlkPXtsaXN0SWR9IHJlZj17bGlzdFJlZn0gcm9sZT1cImxpc3Rib3hcIiBhcmlhLWxhYmVsPXtsYWJlbH0+XG4gICAgICB7ZmlsdGVyZWQubGVuZ3RoID09PSAwICYmIDxkaXYgY2xhc3NOYW1lPVwicHgtNCBweS0yIHRleHQtc20gdGV4dC1zbGF0ZS01MDBcIj57aW5kVChcIkRyb3Bkb3duX05vUmVzdWx0c1wiLCBcIk5vIHJlc3VsdHNcIil9PC9kaXY+fVxuICAgICAge2ZpbHRlcmVkLm1hcCgob3B0LCBpZHgpID0+IHtcbiAgICAgICAgY29uc3Qgc2VsID0gc2VsZWN0ZWQ/LnZhbHVlID09PSBvcHQudmFsdWU7XG4gICAgICAgIGNvbnN0IGlzQWN0aXZlID0gaWR4ID09PSBhY3RpdmVJbmRleDtcbiAgICAgICAgY29uc3Qgb3B0aW9uU3RhdGVDbGFzc05hbWUgPSBzZWwgPyBvcHRpb25TZWxlY3RlZENsYXNzTmFtZSA6IGlzQWN0aXZlID8gb3B0aW9uQWN0aXZlQ2xhc3NOYW1lIDogb3B0aW9uRGVmYXVsdENsYXNzTmFtZTtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIGtleT17U3RyaW5nKG9wdC52YWx1ZSl9XG4gICAgICAgICAgICBpZD17YHNlbGVjdC1vcHQtJHtzYWZlSWR9LSR7b3B0LnZhbHVlfWB9XG4gICAgICAgICAgICByb2xlPVwib3B0aW9uXCJcbiAgICAgICAgICAgIGFyaWEtc2VsZWN0ZWQ9e3NlbH1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgICAgICAgXCJyZWxhdGl2ZSBmbGV4IHctZnVsbCBjdXJzb3ItZGVmYXVsdCBzZWxlY3Qtbm9uZSBpdGVtcy1jZW50ZXIgcHktMiBwci0zIHRleHQtbGVmdCB0ZXh0LXNtXCIsXG4gICAgICAgICAgICAgIG9wdGlvbkxlZnRQYWRkaW5nQ2xhc3NOYW1lLFxuICAgICAgICAgICAgICBkaXNhYmxlRGVmYXVsdE9wdGlvblBhZGRpbmcgPyBcIlwiIDogXCJ0eXBlLW9wdGlvblwiLFxuICAgICAgICAgICAgICBvcHRpb25TdGF0ZUNsYXNzTmFtZVxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIHN0eWxlPXtcbiAgICAgICAgICAgICAgYWxsb3dPcHRpb25Ib3Jpem9udGFsU2Nyb2xsXG4gICAgICAgICAgICAgICAgPyB7IG92ZXJmbG93WDogXCJhdXRvXCIsIG92ZXJmbG93WTogXCJoaWRkZW5cIiwgV2Via2l0T3ZlcmZsb3dTY3JvbGxpbmc6IFwidG91Y2hcIiB9XG4gICAgICAgICAgICAgICAgOiB1bmRlZmluZWRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9uTW91c2VFbnRlcj17KCkgPT4gc2V0QWN0aXZlSW5kZXgoaWR4KX1cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNlbGVjdE9wdGlvbihvcHQpfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtzZWwgJiYgKFxuICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgICAgICAgICAgIFwiYWJzb2x1dGUgaW5zZXQteS0wIGxlZnQtMCBmbGV4IGl0ZW1zLWNlbnRlciBwbC0yXCIsXG4gICAgICAgICAgICAgICAgICBpc0FjdGl2ZSA/IFwidGV4dC13aGl0ZVwiIDogXCJ0ZXh0LXByaW1hcnlcIlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgID48L3NwYW4+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAgICAgICAgIGFsbG93T3B0aW9uSG9yaXpvbnRhbFNjcm9sbCA/IFwiaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCIgOiBcImZsZXggbWluLXctMCBpdGVtcy1jZW50ZXIgZ2FwLTJcIixcbiAgICAgICAgICAgICAgICBzZWwgPyBcImZvbnQtbWVkaXVtXCIgOiBcImZvbnQtbm9ybWFsXCJcbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgc3R5bGU9e2FsbG93T3B0aW9uSG9yaXpvbnRhbFNjcm9sbCA/IHsgbWluV2lkdGg6IFwibWF4LWNvbnRlbnRcIiB9IDogdW5kZWZpbmVkfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7b3B0Lmljb24gPyAoXG4gICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgICAgICAgICAgICAgXCJpbmxpbmUtZmxleCBzaHJpbmstMCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uSWNvbkNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgaXNBY3RpdmUgPyBcInRleHQtd2hpdGVcIiA6IFwidGV4dC1zbGF0ZS01MDBcIlxuICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICB7b3B0Lmljb259XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoYWxsb3dPcHRpb25Ib3Jpem9udGFsU2Nyb2xsID8gXCJibG9ja1wiIDogXCJibG9jayB0cnVuY2F0ZVwiLCBvcHRpb25UZXh0Q2xhc3NOYW1lKX1cbiAgICAgICAgICAgICAgICBzdHlsZT17YWxsb3dPcHRpb25Ib3Jpem9udGFsU2Nyb2xsID8geyB3aGl0ZVNwYWNlOiBcIm5vd3JhcFwiIH0gOiB1bmRlZmluZWR9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7b3B0LnRleHR9XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgKTtcbiAgICAgIH0pfVxuICAgIDwvZGl2PlxuICApO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdlxuICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFwic3BhY2UteS0yXCIsIGRpc2FibGVkID8gXCJwb2ludGVyLWV2ZW50cy1ub25lIHNlbGVjdC1ub25lXCIgOiBcIlwiKX1cbiAgICAgIHJlZj17Y29udGFpbmVyUmVmfVxuICAgID5cbiAgICAgIHtzaG93TGFiZWwgPyA8bGFiZWwgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFwiZm9ybS1sYWJlbCBmb250LXNlbWlib2xkXCIsIGludmFsaWQgPyBcInRleHQtcm9zZS03MDBcIiA6IFwiXCIpfT57bGFiZWx9PC9sYWJlbD4gOiBudWxsfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZVwiPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgcmVmPXtib3hSZWZ9XG4gICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAgICAgXCJyZWxhdGl2ZSB3LWZ1bGwgY3Vyc29yLWRlZmF1bHQgcm91bmRlZC14bCBiZy13aGl0ZSB0ZXh0LWxlZnQgZm9jdXMtd2l0aGluOmJvcmRlci1wcmltYXJ5IGZvY3VzLXdpdGhpbjpyaW5nLTIgZm9jdXMtd2l0aGluOnJpbmctcHJpbWFyeSBmb2N1cy13aXRoaW46cmluZy1vZmZzZXQtd2hpdGUgc206dGV4dC1zbVwiLFxuICAgICAgICAgICAgcmVhZE9ubHlNb2RlID8gXCJpbmQtcmVhZG9ubHktZmllbGRcIiA6IFwiXCJcbiAgICAgICAgICApfVxuICAgICAgICAgIHN0eWxlPXtyZWFkT25seU1vZGUgPyB7IGNvbG9yOiB2YWx1ZUNvbG9yIH0gOiB1bmRlZmluZWR9XG4gICAgICAgID5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgICAgICAgXCJ3LWZ1bGwgcm91bmRlZC14bCBib3JkZXIgcHktMiB0ZXh0LXNtIHNtOnRleHQtYmFzZSBsZWFkaW5nLTUgZm9jdXM6b3V0bGluZS1oaWRkZW4gZm9jdXM6cmluZy0yIGRpc2FibGVkOmJnLXNsYXRlLTEwMCBkaXNhYmxlZDp0ZXh0LXNsYXRlLTUwMCBkaXNhYmxlZDpib3JkZXItc2xhdGUtMjAwIGRpc2FibGVkOmN1cnNvci1ub3QtYWxsb3dlZFwiLFxuICAgICAgICAgICAgICBzaG93U2VsZWN0ZWRJY29uID8gc2VsZWN0ZWRJbnB1dFBhZGRpbmdDbGFzc05hbWUgOiBcInBsLTNcIixcbiAgICAgICAgICAgICAgc2hvd1NlYXJjaEJ1dHRvbiA/IFwicHItMjBcIiA6IFwicHItMTBcIixcbiAgICAgICAgICAgICAgaW52YWxpZFxuICAgICAgICAgICAgICAgID8gXCJib3JkZXItcm9zZS00MDAgYmctcm9zZS01MCBmb2N1czpyaW5nLXJvc2UtMjAwIGZvY3VzOmJvcmRlci1yb3NlLTQwMFwiXG4gICAgICAgICAgICAgICAgOiBcImJvcmRlci1zbGF0ZS0yMDAgZm9jdXM6cmluZy1wcmltYXJ5IGZvY3VzOmJvcmRlci1wcmltYXJ5XCIsXG4gICAgICAgICAgICAgIHJlYWRPbmx5TW9kZSA/IFwiaW5kLXJlYWRvbmx5LWZpZWxkXCIgOiBcInRleHQtc2xhdGUtOTAwXCJcbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICBzdHlsZT17cmVhZE9ubHlNb2RlID8geyBjb2xvcjogdmFsdWVDb2xvciB9IDogdW5kZWZpbmVkfVxuICAgICAgICAgICAgdmFsdWU9e2Rpc3BsYXlWYWx1ZX1cbiAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgaWYgKCFhbGxvd1RleHRJbnB1dCkgcmV0dXJuO1xuICAgICAgICAgICAgICBjb25zdCB2YWwgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgICAgICAgICAgIHNldFF1ZXJ5KHZhbCk7XG4gICAgICAgICAgICAgIGlmIChjbGVhck9uRW1wdHlJbnB1dCAmJiAhdmFsLnRyaW0oKSkge1xuICAgICAgICAgICAgICAgIHNldFNlbGVjdGVkKHsgdmFsdWU6IFwiXCIsIHRleHQ6IFwiXCIgfSk7XG4gICAgICAgICAgICAgICAgc2V0T3BlbihmYWxzZSk7XG4gICAgICAgICAgICAgICAgaWYgKCFlbWl0T25WYWx1ZUNoYW5nZSkge1xuICAgICAgICAgICAgICAgICAgb25DaGFuZ2UoXCJcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBzZXRPcGVuKHRydWUpO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIG9uS2V5RG93bj17aGFuZGxlS2V5RG93bn1cbiAgICAgICAgICAgIG9uRm9jdXM9eygpID0+IHtcbiAgICAgICAgICAgICAgaWYgKCFkaXNhYmxlZCkgc2V0T3Blbih0cnVlKTtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XG4gICAgICAgICAgICByZWFkT25seT17cmVhZE9ubHlNb2RlIHx8ICFhbGxvd1RleHRJbnB1dH1cbiAgICAgICAgICAgIGFyaWEtbGFiZWw9e2xhYmVsfVxuICAgICAgICAgICAgcm9sZT1cImNvbWJvYm94XCJcbiAgICAgICAgICAgIGFyaWEtZXhwYW5kZWQ9e2xpc3RPcGVufVxuICAgICAgICAgICAgYXJpYS1jb250cm9scz17bGlzdElkfVxuICAgICAgICAgICAgYXJpYS1hY3RpdmVkZXNjZW5kYW50PXthY3RpdmVJZH1cbiAgICAgICAgICAvPlxuICAgICAgICAgIHtzaG93U2VsZWN0ZWRJY29uID8gKFxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicG9pbnRlci1ldmVudHMtbm9uZSBhYnNvbHV0ZSBpbnNldC15LTAgbGVmdC0wIGZsZXggaXRlbXMtY2VudGVyIHBsLTMgdGV4dC1zbGF0ZS01MDBcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtjbGFzc05hbWVzKFwiaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyXCIsIHNlbGVjdGVkSWNvbkNsYXNzTmFtZSl9PntzZWxlY3RlZC5pY29ufTwvc3Bhbj5cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LXktMCByaWdodC0wIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHByLTJcIj5cbiAgICAgICAgICAgIHtzaG93U2VhcmNoQnV0dG9uID8gKFxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgcC0xLjUgdGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC1zbGF0ZS01MDBcIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgIGlmIChkaXNhYmxlZCkgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgc2V0T3Blbih0cnVlKTtcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2luZFQoXCJDb21tb25fU2VhcmNoXCIsIFwiU2VhcmNoXCIpfVxuICAgICAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGZpbGw9XCJub25lXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIHN0cm9rZVdpZHRoPXsxLjV9IHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIGNsYXNzTmFtZT1cImgtNSB3LTVcIj5cbiAgICAgICAgICAgICAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwibTE1Ljc1IDE1Ljc1LTIuNDg5LTIuNDg5bTAgMGEzLjM3NSAzLjM3NSAwIDEgMC00Ljc3My00Ljc3MyAzLjM3NSAzLjM3NSAwIDAgMCA0Ljc3NCA0Ljc3NFpNMjEgMTJhOSA5IDAgMSAxLTE4IDAgOSA5IDAgMCAxIDE4IDBaXCIgLz5cbiAgICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHAtMS41IHRleHQtc2xhdGUtNTAwIGhvdmVyOnRleHQtc2xhdGUtNjAwXCJcbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChkaXNhYmxlZCkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIHNldE9wZW4oKHByZXYpID0+ICFwcmV2KTtcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgYXJpYS1sYWJlbD17b3BlbiA/IGluZFQoXCJEcm9wZG93bl9IaWRlT3B0aW9uc1wiLCBcIkhpZGUgb3B0aW9uc1wiKSA6IGluZFQoXCJEcm9wZG93bl9TaG93T3B0aW9uc1wiLCBcIlNob3cgb3B0aW9uc1wiKX1cbiAgICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7b3BlbiA/IDxDaGV2cm9uVXBTdmcgY2xhc3NOYW1lPVwiaC01IHctNVwiIC8+IDogPENoZXZyb25Eb3duU3ZnIGNsYXNzTmFtZT1cImgtNSB3LTVcIiAvPn1cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAge3VzZVBvcnRhbCA/IChcbiAgICAgICAgICA8RmxvYXRpbmdMaXN0XG4gICAgICAgICAgICBhbmNob3JSZWY9e2JveFJlZn1cbiAgICAgICAgICAgIG9wZW49e2xpc3RPcGVufVxuICAgICAgICAgICAgekluZGV4PXszNjAwMDB9XG4gICAgICAgICAgICBmaXhlZFdpZHRoUHg9e3Jlc29sdmVkRHJvcGRvd25XaWR0aFB4ID8/IHVuZGVmaW5lZH1cbiAgICAgICAgICAgIHBhbmVsU3R5bGU9e3BhbmVsU3R5bGV9XG4gICAgICAgICAgICBtYXhIZWlnaHRDbGFzcz17ZHJvcGRvd25NYXhIZWlnaHRDbGFzc31cbiAgICAgICAgICAgIHJvbGU9XCJsaXN0Ym94XCJcbiAgICAgICAgICAgIHJvdW5kZWRDbGFzcz1cInJvdW5kZWQteGxcIlxuICAgICAgICAgICAgcG9ydGFsQ2xhc3NOYW1lPXtwb3J0YWxDbGFzc05hbWV9XG4gICAgICAgICAgICBwYW5lbENsYXNzTmFtZT17cGFuZWxDbGFzc05hbWV9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge2xpc3RCb2R5fVxuICAgICAgICAgIDwvRmxvYXRpbmdMaXN0PlxuICAgICAgICApIDogKFxuICAgICAgICAgIGxpc3RPcGVuICYmIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgYWJzb2x1dGUgei0zNjAwMDAgbXQtMSB3LWZ1bGwgcm91bmRlZC14bCBiZy13aGl0ZSBzaGFkb3ctbGcgcmluZy0xIHJpbmctYmxhY2svNSBmb2N1czpvdXRsaW5lLWhpZGRlbiAke2Ryb3Bkb3duTWF4SGVpZ2h0Q2xhc3N9IG92ZXJmbG93LWF1dG8gJHtwYW5lbENsYXNzTmFtZSB8fCBcIlwifWB9XG4gICAgICAgICAgICAgIHN0eWxlPXt7IC4uLmlubGluZURyb3Bkb3duU3R5bGUsIC4uLihwYW5lbFN0eWxlIHx8IHt9KSB9fVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7bGlzdEJvZHl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApXG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNlbGVjdENvbWJvYm94O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtQkFBMEQ7QUFzRGpEO0FBbERULElBQU0sZ0JBQTZDO0FBQUEsRUFDakQsTUFBTTtBQUFBLEVBQ04sTUFBTTtBQUFBLEVBQ04sS0FBSztBQUFBLEVBQ0wsWUFBWTtBQUNkO0FBU0EsSUFBTSxlQUEwQjtBQUFBLEVBQzlCLGNBQWMsQ0FBQztBQUFBLEVBQ2YsaUJBQWlCO0FBQUEsRUFDakIscUJBQXFCO0FBQUEsRUFDckIsV0FBVyxNQUFNO0FBQ25CO0FBRUEsSUFBTSxrQkFBYyw0QkFBeUIsWUFBWTtBQVNsRCxJQUFNLGVBQWUsQ0FBQyxFQUFFLFVBQVUsY0FBYyxpQkFBaUIsb0JBQW9CLE1BQXFCO0FBQy9HLFFBQU0sU0FBUyxpQkFBaUIsV0FBVyx5QkFBeUIsQ0FBQztBQUNyRSxRQUFNLFVBQVUsbUJBQW1CLE9BQU8sV0FBVyw0QkFBNEIsRUFBRTtBQUduRixRQUFNLGlCQUFpQix1QkFBdUIsV0FBVyxrQ0FBa0M7QUFFM0YsUUFBTSxZQUFRLHNCQUFtQixNQUFNO0FBQ3JDLFVBQU0sWUFBWSxDQUFDLE1BQWMsUUFBcUIsV0FBVztBQUMvRCxZQUFNLFVBQVUsT0FBTyxTQUFTLElBQUksS0FBSyxDQUFDO0FBQzFDLGFBQU8sV0FBVyxjQUFjLEtBQUs7QUFBQSxJQUN2QztBQUNBLFdBQU87QUFBQSxNQUNMLGNBQWM7QUFBQSxNQUNkLGlCQUFpQjtBQUFBLE1BQ2pCLHFCQUFxQjtBQUFBLE1BQ3JCO0FBQUEsSUFDRjtBQUFBLEVBQ0YsR0FBRyxDQUFDLFFBQVEsU0FBUyxjQUFjLENBQUM7QUFFcEMsU0FBTyw0Q0FBQyxZQUFZLFVBQVosRUFBcUIsT0FBZSxVQUFTO0FBQ3ZEO0FBRU8sSUFBTSxpQkFBaUIsVUFBTSx5QkFBVyxXQUFXOzs7QUN6RDFELElBQUFBLGdCQUEwRDtBQTRDakQsSUFBQUMsc0JBQUE7QUFsQ1QsSUFBTSxjQUF3QixDQUFDO0FBRS9CLElBQU1DLGdCQUEwQjtBQUFBLEVBQzlCLFlBQVk7QUFBQSxFQUNaLEdBQUcsQ0FBQyxLQUFLLGFBQWEsWUFBWTtBQUFBLEVBQ2xDLFFBQVEsQ0FBQyxLQUFLLGFBQWEsU0FBUztBQUNsQyxVQUFNLFdBQVcsWUFBWTtBQUM3QixXQUFPLE9BQU8sUUFBUSxFQUFFLFFBQVEsY0FBYyxDQUFDLEdBQUcsUUFBUSxPQUFPLEtBQUssT0FBTyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7QUFBQSxFQUMzRjtBQUNGO0FBRUEsSUFBTSxrQkFBYyw2QkFBeUJBLGFBQVk7QUFPbEQsSUFBTSxlQUFlLENBQUMsRUFBRSxVQUFVLFdBQVcsTUFBcUI7QUFDdkUsUUFBTSxPQUFPLGVBQWUsV0FBVyxnQkFBZ0IsQ0FBQztBQUV4RCxRQUFNLFlBQVEsdUJBQW1CLE1BQU07QUFDckMsVUFBTSxJQUFJLENBQUMsS0FBYSxhQUFzQjtBQUM1QyxZQUFNQyxTQUFRLEtBQUssR0FBRztBQUN0QixVQUFJLE9BQU9BLFdBQVUsWUFBWUEsT0FBTSxLQUFLLEVBQUcsUUFBT0E7QUFDdEQsYUFBTyxZQUFZO0FBQUEsSUFDckI7QUFDQSxVQUFNLFNBQVMsQ0FBQyxLQUFhLGFBQWlDLFNBQWlDO0FBQzdGLFlBQU0sV0FBVyxFQUFFLEtBQUssUUFBUTtBQUNoQyxhQUFPLE9BQU8sUUFBUSxFQUFFLFFBQVEsY0FBYyxDQUFDLEdBQUcsUUFBUSxPQUFPLEtBQUssT0FBTyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7QUFBQSxJQUMzRjtBQUNBLFdBQU8sRUFBRSxZQUFZLE1BQU0sR0FBRyxPQUFPO0FBQUEsRUFDdkMsR0FBRyxDQUFDLElBQUksQ0FBQztBQUVULFNBQU8sNkNBQUMsWUFBWSxVQUFaLEVBQXFCLE9BQWUsVUFBUztBQUN2RDs7O0FDakNNLElBQUFDLHNCQUFBO0FBSE4sSUFBTSx1QkFBdUIsQ0FBQyxFQUFFLFNBQVMsTUFBYTtBQUNwRCxTQUNFLDZDQUFDLGdCQUNDLHVEQUFDLGdCQUFjLFVBQVMsR0FDMUI7QUFFSjtBQUVBLElBQU8sK0JBQVE7OztBQ2pCZixJQUFBQyxnQkFBNEQ7QUFnTzVCLElBQUFDLHNCQUFBO0FBcEtoQyxJQUFNLGlCQUFpQixDQUFDO0FBQUEsRUFDdEI7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQSxVQUFVO0FBQUEsRUFDVixXQUFXO0FBQUEsRUFDWCxXQUFXO0FBQUEsRUFDWCxZQUFZO0FBQUEsRUFDWixvQkFBb0I7QUFBQSxFQUNwQjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQSxtQkFBbUI7QUFBQSxFQUNuQixpQkFBaUI7QUFBQSxFQUNqQixZQUFZO0FBQUEsRUFDWixtQkFBbUI7QUFBQSxFQUNuQixtQkFBbUI7QUFBQSxFQUNuQix5QkFBeUI7QUFBQSxFQUN6Qix3QkFBd0I7QUFBQSxFQUN4QixzQkFBc0I7QUFBQSxFQUN0Qiw4QkFBOEI7QUFBQSxFQUM5QiwrQkFBK0I7QUFBQSxFQUMvQiw4QkFBOEI7QUFBQSxFQUM5Qiw2QkFBNkI7QUFBQSxFQUM3QixzQkFBc0I7QUFBQSxFQUN0Qix5QkFBeUI7QUFBQSxFQUN6Qix3QkFBd0I7QUFBQSxFQUN4QiwwQkFBMEI7QUFBQSxFQUMxQixnQ0FBZ0M7QUFBQSxFQUNoQztBQUFBLEVBQ0Esb0JBQW9CO0FBQ3RCLE1BQTJCO0FBQ3pCLFFBQU0sZUFBZSxZQUFZO0FBQ2pDLFFBQU0sYUFBYSxlQUFlLFlBQVk7QUFDOUMsUUFBTSxXQUFPLHVCQUFRLE1BQU07QUFDekIsWUFBUSxXQUFXLENBQUMsR0FBRyxJQUFzQixDQUFDLE1BQU07QUFDbEQsVUFBSSxNQUFNLFFBQVEsQ0FBQyxHQUFHO0FBQ3BCLGVBQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxLQUFLLElBQUksTUFBTSxFQUFFLENBQUMsS0FBSyxHQUFHO0FBQUEsTUFDL0M7QUFDQSxhQUFPO0FBQUEsUUFDTCxPQUFPLEdBQUcsU0FBUyxHQUFHLFNBQVM7QUFBQSxRQUMvQixNQUFNLEdBQUcsUUFBUSxHQUFHLFFBQVE7QUFBQSxRQUM1QixNQUFNLEdBQUcsUUFBUSxHQUFHO0FBQUEsTUFDdEI7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNILEdBQUcsQ0FBQyxPQUFPLENBQUM7QUFFWixRQUFNLENBQUMsT0FBTyxRQUFRLFFBQUksd0JBQXdCLElBQUk7QUFDdEQsUUFBTSxDQUFDLFVBQVUsV0FBVyxRQUFJO0FBQUEsSUFDOUIsS0FBSyxLQUFLLENBQUMsTUFBTSxPQUFPLEVBQUUsS0FBSyxNQUFNLE9BQU8sS0FBSyxDQUFDLEtBQUssRUFBRSxPQUFPLElBQUksTUFBTSxHQUFHO0FBQUEsRUFDL0U7QUFDQSxRQUFNLENBQUMsTUFBTSxPQUFPLFFBQUksd0JBQVMsS0FBSztBQUN0QyxRQUFNLENBQUMsYUFBYSxjQUFjLFFBQUksd0JBQVMsQ0FBQztBQUNoRCxRQUFNLG1CQUFlLHNCQUE4QixJQUFJO0FBQ3ZELFFBQU0sYUFBUyxzQkFBOEIsSUFBSTtBQUNqRCxRQUFNLGNBQVUsc0JBQThCLElBQUk7QUFDbEQsUUFBTSw4QkFBMEIsc0JBQXNCLElBQUk7QUFFMUQsa0JBQWdCLENBQUMsY0FBYyxPQUFPLEdBQUcsTUFBTSxRQUFRLEtBQUssQ0FBQztBQUU3RCwrQkFBVSxNQUFNO0FBQ2QsZ0JBQVksS0FBSyxLQUFLLENBQUMsTUFBTSxPQUFPLEVBQUUsS0FBSyxNQUFNLE9BQU8sS0FBSyxDQUFDLEtBQUssRUFBRSxPQUFPLElBQUksTUFBTSxHQUFHLENBQUM7QUFBQSxFQUM1RixHQUFHLENBQUMsT0FBTyxJQUFJLENBQUM7QUFFaEIsK0JBQVUsTUFBTTtBQUVkLGFBQVMsSUFBSTtBQUFBLEVBQ2YsR0FBRyxDQUFDLFFBQVEsQ0FBQztBQUViLCtCQUFVLE1BQU07QUFDZCxRQUFJLENBQUMsa0JBQW1CO0FBQ3hCLGFBQVMsVUFBVSxRQUFRLE9BQU8sU0FBUyxLQUFLLElBQUksRUFBRTtBQUFBLEVBQ3hELEdBQUcsQ0FBQyxtQkFBbUIsVUFBVSxRQUFRLENBQUM7QUFFMUMsUUFBTSxlQUFXLHVCQUFRLE1BQU07QUFDN0IsUUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEtBQUssRUFBRyxRQUFPO0FBQ3BDLFVBQU0sSUFBSSxLQUFLLE9BQU8sQ0FBQyxNQUFNO0FBQzNCLFlBQU0sY0FBYyxPQUFPLEVBQUUsU0FBUyxFQUFFLEVBQUUsS0FBSztBQUMvQyxVQUFJLENBQUMsYUFBYTtBQUNoQixlQUFPO0FBQUEsTUFDVDtBQUNBLGFBQU8sRUFBRSxLQUFLLFlBQVksRUFBRSxTQUFTLE1BQU0sWUFBWSxDQUFDO0FBQUEsSUFDMUQsQ0FBQztBQUNELFdBQU8sRUFBRSxTQUFTLElBQUk7QUFBQSxFQUN4QixHQUFHLENBQUMsTUFBTSxLQUFLLENBQUM7QUFFaEIsK0JBQVUsTUFBTTtBQUNkLG1CQUFlLENBQUM7QUFBQSxFQUNsQixHQUFHLENBQUMsU0FBUyxRQUFRLEtBQUssQ0FBQztBQUUzQixRQUFNLGVBQWUsQ0FBQyxRQUEwQjtBQUM5QyxnQkFBWSxHQUFHO0FBQ2YsYUFBUyxJQUFJO0FBQ2IsWUFBUSxLQUFLO0FBQ2IsUUFBSSxDQUFDLG1CQUFtQjtBQUN0QixlQUFTLEtBQUssUUFBUSxPQUFPLElBQUksS0FBSyxJQUFJLEVBQUU7QUFBQSxJQUM5QztBQUFBLEVBQ0Y7QUFFQSxRQUFNLGdCQUFnQixDQUFDLE9BQThDO0FBQ25FLFFBQUksU0FBVTtBQUNkLFFBQUksR0FBRyxRQUFRLGFBQWE7QUFDMUIsU0FBRyxlQUFlO0FBQ2xCLGNBQVEsSUFBSTtBQUNaLFVBQUksU0FBUyxPQUFRLGdCQUFlLENBQUMsU0FBUyxNQUFNLEtBQUssU0FBUyxNQUFNO0FBQ3hFO0FBQUEsSUFDRjtBQUNBLFFBQUksR0FBRyxRQUFRLFdBQVc7QUFDeEIsU0FBRyxlQUFlO0FBQ2xCLGNBQVEsSUFBSTtBQUNaLFVBQUksU0FBUyxPQUFRLGdCQUFlLENBQUMsU0FBUyxNQUFNLElBQUksU0FBUyxVQUFVLFNBQVMsTUFBTTtBQUMxRjtBQUFBLElBQ0Y7QUFDQSxRQUFJLEdBQUcsUUFBUSxTQUFTO0FBQ3RCLFNBQUcsZUFBZTtBQUNsQixVQUFJLHFCQUFxQixVQUFVLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRztBQUN4RCxnQkFBUSxLQUFLO0FBQ2I7QUFBQSxNQUNGO0FBQ0EsVUFBSSxRQUFRLFNBQVMsUUFBUTtBQUMzQixxQkFBYSxTQUFTLFdBQVcsS0FBSyxTQUFTLENBQUMsQ0FBQztBQUFBLE1BQ25ELE9BQU87QUFDTCxnQkFBUSxJQUFJO0FBQUEsTUFDZDtBQUFBLElBQ0Y7QUFDQSxRQUFJLEdBQUcsUUFBUSxTQUFVLFNBQVEsS0FBSztBQUFBLEVBQ3hDO0FBRUEsUUFBTSxTQUFTLE9BQU8sVUFBVSxTQUFTLFFBQVE7QUFDakQsUUFBTSxTQUFTLGtCQUFrQixNQUFNO0FBQ3ZDLFFBQU0sV0FBVyxRQUFRLFNBQVMsV0FBVyxJQUFJLGNBQWMsTUFBTSxJQUFJLFNBQVMsV0FBVyxFQUFFLEtBQUssS0FBSztBQUN6RyxRQUFNLFdBQVcsUUFBUSxDQUFDO0FBQzFCLFFBQU0sZ0JBQWdCLE9BQU8sVUFBVSxTQUFTLEVBQUUsRUFBRSxLQUFLO0FBQ3pELFFBQU0sc0JBQXNCLHFCQUFxQixVQUFVLGdCQUFnQixVQUFVLFFBQVE7QUFDN0YsUUFBTSxlQUFlLFVBQVUsT0FBTyxRQUFTLGdCQUFnQixzQkFBc0I7QUFDckYsUUFBTSxtQkFBbUIsVUFBVSxRQUFRLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLFVBQVU7QUFDMUUsUUFBTSw2QkFBNkIsT0FBTyxTQUFTLGdCQUFnQixJQUFJLEtBQUssSUFBSSxHQUFHLGdCQUFnQixJQUFJO0FBRXZHLCtCQUFVLE1BQU07QUFDZCxRQUFJLENBQUMsNkJBQThCO0FBQ25DLFFBQUksQ0FBQyxTQUFVO0FBQ2YsUUFBSSx3QkFBd0IsWUFBWSxLQUFNO0FBRTlDLFVBQU0sUUFBUSxPQUFPLFNBQVMsc0JBQXNCLEVBQUU7QUFDdEQsUUFBSSxDQUFDLE9BQU8sU0FBUyxLQUFLLEtBQUssQ0FBQyxTQUFTLFNBQVMsRUFBRztBQUNyRCw0QkFBd0IsVUFBVTtBQUFBLEVBQ3BDLEdBQUcsQ0FBQyxVQUFVLDRCQUE0QixDQUFDO0FBRTNDLFFBQU0seUJBQXlCLCtCQUErQix3QkFBd0IsVUFBVTtBQUNoRyxRQUFNLDBCQUNKLDJCQUEyQixRQUFRLE9BQU8sU0FBUyxzQkFBc0IsSUFDckUseUJBQXlCLDZCQUN6QjtBQUNOLFFBQU0sc0JBQ0osNEJBQTRCLFFBQVEsMEJBQTBCLElBQzFELEVBQUUsT0FBTyxHQUFHLHVCQUF1QixLQUFLLElBQ3hDLDZCQUE2QixJQUMzQixFQUFFLE9BQU8sZUFBZSwwQkFBMEIsTUFBTSxJQUN4RDtBQUVSLFFBQU0sV0FDSiw4Q0FBQyxTQUFJLElBQUksUUFBUSxLQUFLLFNBQVMsTUFBSyxXQUFVLGNBQVksT0FDdkQ7QUFBQSxhQUFTLFdBQVcsS0FBSyw2Q0FBQyxTQUFJLFdBQVUsb0NBQW9DLGVBQUssc0JBQXNCLFlBQVksR0FBRTtBQUFBLElBQ3JILFNBQVMsSUFBSSxDQUFDLEtBQUssUUFBUTtBQUMxQixZQUFNLE1BQU0sVUFBVSxVQUFVLElBQUk7QUFDcEMsWUFBTSxXQUFXLFFBQVE7QUFDekIsWUFBTSx1QkFBdUIsTUFBTSwwQkFBMEIsV0FBVyx3QkFBd0I7QUFDaEcsYUFDRTtBQUFBLFFBQUM7QUFBQTtBQUFBLFVBQ0MsTUFBSztBQUFBLFVBRUwsSUFBSSxjQUFjLE1BQU0sSUFBSSxJQUFJLEtBQUs7QUFBQSxVQUNyQyxNQUFLO0FBQUEsVUFDTCxpQkFBZTtBQUFBLFVBQ2YsV0FBVztBQUFBLFlBQ1Q7QUFBQSxZQUNBO0FBQUEsWUFDQSw4QkFBOEIsS0FBSztBQUFBLFlBQ25DO0FBQUEsVUFDRjtBQUFBLFVBQ0EsT0FDRSw4QkFDSSxFQUFFLFdBQVcsUUFBUSxXQUFXLFVBQVUseUJBQXlCLFFBQVEsSUFDM0U7QUFBQSxVQUVOLGNBQWMsTUFBTSxlQUFlLEdBQUc7QUFBQSxVQUN0QyxTQUFTLE1BQU0sYUFBYSxHQUFHO0FBQUEsVUFFOUI7QUFBQSxtQkFDQztBQUFBLGNBQUM7QUFBQTtBQUFBLGdCQUNDLFdBQVc7QUFBQSxrQkFDVDtBQUFBLGtCQUNBLFdBQVcsZUFBZTtBQUFBLGdCQUM1QjtBQUFBO0FBQUEsWUFDRDtBQUFBLFlBRUg7QUFBQSxjQUFDO0FBQUE7QUFBQSxnQkFDQyxXQUFXO0FBQUEsa0JBQ1QsOEJBQThCLG1DQUFtQztBQUFBLGtCQUNqRSxNQUFNLGdCQUFnQjtBQUFBLGdCQUN4QjtBQUFBLGdCQUNBLE9BQU8sOEJBQThCLEVBQUUsVUFBVSxjQUFjLElBQUk7QUFBQSxnQkFFbEU7QUFBQSxzQkFBSSxPQUNIO0FBQUEsb0JBQUM7QUFBQTtBQUFBLHNCQUNDLFdBQVc7QUFBQSx3QkFDVDtBQUFBLHdCQUNBO0FBQUEsd0JBQ0EsV0FBVyxlQUFlO0FBQUEsc0JBQzVCO0FBQUEsc0JBRUMsY0FBSTtBQUFBO0FBQUEsa0JBQ1AsSUFDRTtBQUFBLGtCQUNKO0FBQUEsb0JBQUM7QUFBQTtBQUFBLHNCQUNDLFdBQVcsV0FBVyw4QkFBOEIsVUFBVSxrQkFBa0IsbUJBQW1CO0FBQUEsc0JBQ25HLE9BQU8sOEJBQThCLEVBQUUsWUFBWSxTQUFTLElBQUk7QUFBQSxzQkFFL0QsY0FBSTtBQUFBO0FBQUEsa0JBQ1A7QUFBQTtBQUFBO0FBQUEsWUFDRjtBQUFBO0FBQUE7QUFBQSxRQWxESyxPQUFPLElBQUksS0FBSztBQUFBLE1BbUR2QjtBQUFBLElBRUosQ0FBQztBQUFBLEtBQ0g7QUFHRixTQUNFO0FBQUEsSUFBQztBQUFBO0FBQUEsTUFDQyxXQUFXLFdBQVcsYUFBYSxXQUFXLG9DQUFvQyxFQUFFO0FBQUEsTUFDcEYsS0FBSztBQUFBLE1BRUo7QUFBQSxvQkFBWSw2Q0FBQyxXQUFNLFdBQVcsV0FBVyw0QkFBNEIsVUFBVSxrQkFBa0IsRUFBRSxHQUFJLGlCQUFNLElBQVc7QUFBQSxRQUN6SCw4Q0FBQyxTQUFJLFdBQVUsWUFDYjtBQUFBO0FBQUEsWUFBQztBQUFBO0FBQUEsY0FDQyxLQUFLO0FBQUEsY0FDTCxXQUFXO0FBQUEsZ0JBQ1Q7QUFBQSxnQkFDQSxlQUFlLHVCQUF1QjtBQUFBLGNBQ3hDO0FBQUEsY0FDQSxPQUFPLGVBQWUsRUFBRSxPQUFPLFdBQVcsSUFBSTtBQUFBLGNBRTlDO0FBQUE7QUFBQSxrQkFBQztBQUFBO0FBQUEsb0JBQ0MsV0FBVztBQUFBLHNCQUNUO0FBQUEsc0JBQ0EsbUJBQW1CLGdDQUFnQztBQUFBLHNCQUNuRCxtQkFBbUIsVUFBVTtBQUFBLHNCQUM3QixVQUNJLHlFQUNBO0FBQUEsc0JBQ0osZUFBZSx1QkFBdUI7QUFBQSxvQkFDeEM7QUFBQSxvQkFDQSxPQUFPLGVBQWUsRUFBRSxPQUFPLFdBQVcsSUFBSTtBQUFBLG9CQUM5QyxPQUFPO0FBQUEsb0JBQ1A7QUFBQSxvQkFDQSxVQUFVLENBQUMsVUFBVTtBQUNuQiwwQkFBSSxDQUFDLGVBQWdCO0FBQ3JCLDRCQUFNLE1BQU0sTUFBTSxPQUFPO0FBQ3pCLCtCQUFTLEdBQUc7QUFDWiwwQkFBSSxxQkFBcUIsQ0FBQyxJQUFJLEtBQUssR0FBRztBQUNwQyxvQ0FBWSxFQUFFLE9BQU8sSUFBSSxNQUFNLEdBQUcsQ0FBQztBQUNuQyxnQ0FBUSxLQUFLO0FBQ2IsNEJBQUksQ0FBQyxtQkFBbUI7QUFDdEIsbUNBQVMsRUFBRTtBQUFBLHdCQUNiO0FBQ0E7QUFBQSxzQkFDRjtBQUNBLDhCQUFRLElBQUk7QUFBQSxvQkFDZDtBQUFBLG9CQUNBLFdBQVc7QUFBQSxvQkFDWCxTQUFTLE1BQU07QUFDYiwwQkFBSSxDQUFDLFNBQVUsU0FBUSxJQUFJO0FBQUEsb0JBQzdCO0FBQUEsb0JBQ0E7QUFBQSxvQkFDQSxVQUFVLGdCQUFnQixDQUFDO0FBQUEsb0JBQzNCLGNBQVk7QUFBQSxvQkFDWixNQUFLO0FBQUEsb0JBQ0wsaUJBQWU7QUFBQSxvQkFDZixpQkFBZTtBQUFBLG9CQUNmLHlCQUF1QjtBQUFBO0FBQUEsZ0JBQ3pCO0FBQUEsZ0JBQ0MsbUJBQ0MsNkNBQUMsVUFBSyxXQUFVLHVGQUNkLHVEQUFDLFVBQUssV0FBVyxXQUFXLDJDQUEyQyxxQkFBcUIsR0FBSSxtQkFBUyxNQUFLLEdBQ2hILElBQ0U7QUFBQSxnQkFDSiw4Q0FBQyxTQUFJLFdBQVUsMkRBQ1o7QUFBQSxxQ0FDQztBQUFBLG9CQUFDO0FBQUE7QUFBQSxzQkFDQyxNQUFLO0FBQUEsc0JBQ0wsV0FBVTtBQUFBLHNCQUNWLFNBQVMsTUFBTTtBQUNiLDRCQUFJLFNBQVU7QUFDZCxnQ0FBUSxJQUFJO0FBQUEsc0JBQ2Q7QUFBQSxzQkFDQSxjQUFZLEtBQUssaUJBQWlCLFFBQVE7QUFBQSxzQkFDMUM7QUFBQSxzQkFFQSx1REFBQyxTQUFJLE9BQU0sOEJBQTZCLE1BQUssUUFBTyxTQUFRLGFBQVksYUFBYSxLQUFLLFFBQU8sZ0JBQWUsV0FBVSxXQUN4SCx1REFBQyxVQUFLLGVBQWMsU0FBUSxnQkFBZSxTQUFRLEdBQUUsa0lBQWlJLEdBQ3hMO0FBQUE7QUFBQSxrQkFDRixJQUNFO0FBQUEsa0JBQ0o7QUFBQSxvQkFBQztBQUFBO0FBQUEsc0JBQ0MsTUFBSztBQUFBLHNCQUNMLFdBQVU7QUFBQSxzQkFDVixTQUFTLE1BQU07QUFDYiw0QkFBSSxTQUFVO0FBQ2QsZ0NBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSTtBQUFBLHNCQUN6QjtBQUFBLHNCQUNBLGNBQVksT0FBTyxLQUFLLHdCQUF3QixjQUFjLElBQUksS0FBSyx3QkFBd0IsY0FBYztBQUFBLHNCQUM3RztBQUFBLHNCQUVDLGlCQUFPLDZDQUFDLGdCQUFhLFdBQVUsV0FBVSxJQUFLLDZDQUFDLGtCQUFlLFdBQVUsV0FBVTtBQUFBO0FBQUEsa0JBQ3JGO0FBQUEsbUJBQ0Y7QUFBQTtBQUFBO0FBQUEsVUFDRjtBQUFBLFVBQ0MsWUFDQztBQUFBLFlBQUM7QUFBQTtBQUFBLGNBQ0MsV0FBVztBQUFBLGNBQ1gsTUFBTTtBQUFBLGNBQ04sUUFBUTtBQUFBLGNBQ1IsY0FBYywyQkFBMkI7QUFBQSxjQUN6QztBQUFBLGNBQ0EsZ0JBQWdCO0FBQUEsY0FDaEIsTUFBSztBQUFBLGNBQ0wsY0FBYTtBQUFBLGNBQ2I7QUFBQSxjQUNBO0FBQUEsY0FFQztBQUFBO0FBQUEsVUFDSCxJQUVBLFlBQ0U7QUFBQSxZQUFDO0FBQUE7QUFBQSxjQUNDLFdBQVcsd0dBQXdHLHNCQUFzQixrQkFBa0Isa0JBQWtCLEVBQUU7QUFBQSxjQUMvSyxPQUFPLEVBQUUsR0FBRyxxQkFBcUIsR0FBSSxjQUFjLENBQUMsRUFBRztBQUFBLGNBRXREO0FBQUE7QUFBQSxVQUNIO0FBQUEsV0FHTjtBQUFBO0FBQUE7QUFBQSxFQUNGO0FBRUo7QUFFQSxJQUFPLHlCQUFROyIsCiAgIm5hbWVzIjogWyJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImRlZmF1bHRWYWx1ZSIsICJ2YWx1ZSIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSJdCn0K
