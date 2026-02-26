import {
  ChevronDownSvg,
  ChevronUpSvg,
  FloatingList_default,
  classNames,
  indT,
  useOutsideClick
} from "./chunk-OO4T3BDP.js";
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
  optionIconClassName = "h-4 w-4"
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
  const inlineDropdownStyle = normalizedDropdownExpandPx > 0 ? { width: `calc(100% + ${normalizedDropdownExpandPx}px)` } : void 0;
  const listBody = /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { id: listId, ref: listRef, role: "listbox", "aria-label": label, children: [
    filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "px-4 py-2 text-sm text-slate-500", children: indT("Dropdown_NoResults", "No results") }),
    filtered.map((opt, idx) => {
      const sel = selected?.value === opt.value;
      const isActive = idx === activeIndex;
      return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
        "button",
        {
          type: "button",
          id: `select-opt-${safeId}-${opt.value}`,
          role: "option",
          "aria-selected": sel,
          className: classNames(
            "relative flex w-full cursor-default select-none items-center py-2 pr-3 text-left text-sm type-option",
            isActive ? "bg-primary text-white" : "text-slate-900"
          ),
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
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: classNames("flex min-w-0 items-center gap-2", sel ? "font-medium" : "font-normal"), children: [
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
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "block truncate", children: opt.text })
            ] })
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
                      showSelectedIcon ? "pl-9" : "pl-3",
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
              className: `absolute z-360000 mt-1 w-full rounded-xl bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden ${dropdownMaxHeightClass} overflow-auto`,
              style: inlineDropdownStyle,
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL2NvbnRleHQvQXV0aENvbnRleHQudHN4IiwgIi4uLy4uL3JlYWN0L3NyYy9jb250ZXh0L0kxOG5Db250ZXh0LnRzeCIsICIuLi8uLi9yZWFjdC9zcmMvY29tcG9uZW50cy9jb21tb25zL1Zpc2l0YXNQYWdlUHJvdmlkZXJzLnRzeCIsICIuLi8uLi9yZWFjdC9zcmMvY29tcG9uZW50cy9jb21tb25zL1NlbGVjdENvbWJvYm94LnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IFJlYWN0LCB7IGNyZWF0ZUNvbnRleHQsIHVzZUNvbnRleHQsIHVzZU1lbW8gfSBmcm9tIFwicmVhY3RcIjtcblxuZXhwb3J0IHR5cGUgQWNjZXNzTGV2ZWwgPSBcIlZpZXdcIiB8IFwiRWRpdFwiIHwgXCJBZGRcIiB8IFwiRnVsbEFjY2Vzc1wiO1xuXG5jb25zdCBBQ0NFU1NfUklHSFRTOiBSZWNvcmQ8QWNjZXNzTGV2ZWwsIG51bWJlcj4gPSB7XG4gIFZpZXc6IDEsXG4gIEVkaXQ6IDIsXG4gIEFkZDogMyxcbiAgRnVsbEFjY2VzczogNCxcbn07XG5cbnR5cGUgQXV0aFZhbHVlID0ge1xuICBtb2R1bGVBY2Nlc3M6IFJlY29yZDxzdHJpbmcsIG51bWJlcj47XG4gIHNlbGVjdGVkQ29tcGFueTogc3RyaW5nO1xuICBhbGxvd1NlbGZNYW5hZ2VtZW50OiBib29sZWFuO1xuICBjYW5BY2Nlc3M6IChjb2RlOiBzdHJpbmcsIGxldmVsPzogQWNjZXNzTGV2ZWwpID0+IGJvb2xlYW47XG59O1xuXG5jb25zdCBkZWZhdWx0VmFsdWU6IEF1dGhWYWx1ZSA9IHtcbiAgbW9kdWxlQWNjZXNzOiB7fSxcbiAgc2VsZWN0ZWRDb21wYW55OiBcIlwiLFxuICBhbGxvd1NlbGZNYW5hZ2VtZW50OiBmYWxzZSxcbiAgY2FuQWNjZXNzOiAoKSA9PiBmYWxzZSxcbn07XG5cbmNvbnN0IEF1dGhDb250ZXh0ID0gY3JlYXRlQ29udGV4dDxBdXRoVmFsdWU+KGRlZmF1bHRWYWx1ZSk7XG5cbnR5cGUgUHJvdmlkZXJQcm9wcyA9IHtcbiAgY2hpbGRyZW46IFJlYWN0LlJlYWN0Tm9kZTtcbiAgbW9kdWxlQWNjZXNzPzogUmVjb3JkPHN0cmluZywgbnVtYmVyPjtcbiAgc2VsZWN0ZWRDb21wYW55Pzogc3RyaW5nO1xuICBhbGxvd1NlbGZNYW5hZ2VtZW50PzogYm9vbGVhbjtcbn07XG5cbmV4cG9ydCBjb25zdCBBdXRoUHJvdmlkZXIgPSAoeyBjaGlsZHJlbiwgbW9kdWxlQWNjZXNzLCBzZWxlY3RlZENvbXBhbnksIGFsbG93U2VsZk1hbmFnZW1lbnQgfTogUHJvdmlkZXJQcm9wcykgPT4ge1xuICBjb25zdCBhY2Nlc3MgPSBtb2R1bGVBY2Nlc3MgfHwgKGdsb2JhbFRoaXMuX19JTkRfTU9EVUxFX0FDQ0VTU19fIHx8IHt9KTtcbiAgY29uc3QgY29tcGFueSA9IHNlbGVjdGVkQ29tcGFueSB8fCBTdHJpbmcoZ2xvYmFsVGhpcy5fX0lORF9TRUxFQ1RFRF9DT01QQU5ZX18gfHwgXCJcIik7XG4gIGNvbnN0IHNlbGZNYW5hZ2VtZW50ID0gYWxsb3dTZWxmTWFuYWdlbWVudCA/PyBnbG9iYWxUaGlzLl9fSU5EX0FMTE9XX1NFTEZfTUFOQUdFTUVOVF9fID09PSB0cnVlO1xuXG4gIGNvbnN0IHZhbHVlID0gdXNlTWVtbzxBdXRoVmFsdWU+KCgpID0+IHtcbiAgICBjb25zdCBjYW5BY2Nlc3MgPSAoY29kZTogc3RyaW5nLCBsZXZlbDogQWNjZXNzTGV2ZWwgPSBcIlZpZXdcIikgPT4ge1xuICAgICAgY29uc3QgY3VycmVudCA9IE51bWJlcihhY2Nlc3M/Lltjb2RlXSA/PyAwKTtcbiAgICAgIHJldHVybiBjdXJyZW50ID49IEFDQ0VTU19SSUdIVFNbbGV2ZWxdO1xuICAgIH07XG4gICAgcmV0dXJuIHtcbiAgICAgIG1vZHVsZUFjY2VzczogYWNjZXNzLFxuICAgICAgc2VsZWN0ZWRDb21wYW55OiBjb21wYW55LFxuICAgICAgYWxsb3dTZWxmTWFuYWdlbWVudDogc2VsZk1hbmFnZW1lbnQsXG4gICAgICBjYW5BY2Nlc3MsXG4gICAgfTtcbiAgfSwgW2FjY2VzcywgY29tcGFueSwgc2VsZk1hbmFnZW1lbnRdKTtcblxuICByZXR1cm4gPEF1dGhDb250ZXh0LlByb3ZpZGVyIHZhbHVlPXt2YWx1ZX0+e2NoaWxkcmVufTwvQXV0aENvbnRleHQuUHJvdmlkZXI+O1xufTtcblxuZXhwb3J0IGNvbnN0IHVzZUF1dGhDb250ZXh0ID0gKCkgPT4gdXNlQ29udGV4dChBdXRoQ29udGV4dCk7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGNyZWF0ZUNvbnRleHQsIHVzZUNvbnRleHQsIHVzZU1lbW8gfSBmcm9tIFwicmVhY3RcIjtcblxudHlwZSBJMThuRGljdCA9IFJlY29yZDxzdHJpbmcsIHN0cmluZz47XG5cbnR5cGUgSTE4blZhbHVlID0ge1xuICBkaWN0aW9uYXJ5OiBJMThuRGljdDtcbiAgdDogKGtleTogc3RyaW5nLCBmYWxsYmFjaz86IHN0cmluZykgPT4gc3RyaW5nO1xuICBmb3JtYXQ6IChrZXk6IHN0cmluZywgZmFsbGJhY2s6IHN0cmluZyB8IHVuZGVmaW5lZCwgLi4uYXJnczogQXJyYXk8c3RyaW5nIHwgbnVtYmVyPikgPT4gc3RyaW5nO1xufTtcblxuY29uc3QgZGVmYXVsdERpY3Q6IEkxOG5EaWN0ID0ge307XG5cbmNvbnN0IGRlZmF1bHRWYWx1ZTogSTE4blZhbHVlID0ge1xuICBkaWN0aW9uYXJ5OiBkZWZhdWx0RGljdCxcbiAgdDogKGtleSwgZmFsbGJhY2spID0+IGZhbGxiYWNrIHx8IGtleSxcbiAgZm9ybWF0OiAoa2V5LCBmYWxsYmFjaywgLi4uYXJncykgPT4ge1xuICAgIGNvbnN0IHRlbXBsYXRlID0gZmFsbGJhY2sgfHwga2V5O1xuICAgIHJldHVybiBTdHJpbmcodGVtcGxhdGUpLnJlcGxhY2UoL1xceyhcXGQrKVxcfS9nLCAoXywgaWR4KSA9PiBTdHJpbmcoYXJnc1tOdW1iZXIoaWR4KV0gPz8gXCJcIikpO1xuICB9LFxufTtcblxuY29uc3QgSTE4bkNvbnRleHQgPSBjcmVhdGVDb250ZXh0PEkxOG5WYWx1ZT4oZGVmYXVsdFZhbHVlKTtcblxudHlwZSBQcm92aWRlclByb3BzID0ge1xuICBjaGlsZHJlbjogUmVhY3QuUmVhY3ROb2RlO1xuICBkaWN0aW9uYXJ5PzogSTE4bkRpY3Q7XG59O1xuXG5leHBvcnQgY29uc3QgSTE4blByb3ZpZGVyID0gKHsgY2hpbGRyZW4sIGRpY3Rpb25hcnkgfTogUHJvdmlkZXJQcm9wcykgPT4ge1xuICBjb25zdCBkaWN0ID0gZGljdGlvbmFyeSB8fCAoZ2xvYmFsVGhpcy5fX0lORF9JMThOX18gfHwge30pO1xuXG4gIGNvbnN0IHZhbHVlID0gdXNlTWVtbzxJMThuVmFsdWU+KCgpID0+IHtcbiAgICBjb25zdCB0ID0gKGtleTogc3RyaW5nLCBmYWxsYmFjaz86IHN0cmluZykgPT4ge1xuICAgICAgY29uc3QgdmFsdWUgPSBkaWN0W2tleV07XG4gICAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiICYmIHZhbHVlLnRyaW0oKSkgcmV0dXJuIHZhbHVlO1xuICAgICAgcmV0dXJuIGZhbGxiYWNrIHx8IGtleTtcbiAgICB9O1xuICAgIGNvbnN0IGZvcm1hdCA9IChrZXk6IHN0cmluZywgZmFsbGJhY2s6IHN0cmluZyB8IHVuZGVmaW5lZCwgLi4uYXJnczogQXJyYXk8c3RyaW5nIHwgbnVtYmVyPikgPT4ge1xuICAgICAgY29uc3QgdGVtcGxhdGUgPSB0KGtleSwgZmFsbGJhY2spO1xuICAgICAgcmV0dXJuIFN0cmluZyh0ZW1wbGF0ZSkucmVwbGFjZSgvXFx7KFxcZCspXFx9L2csIChfLCBpZHgpID0+IFN0cmluZyhhcmdzW051bWJlcihpZHgpXSA/PyBcIlwiKSk7XG4gICAgfTtcbiAgICByZXR1cm4geyBkaWN0aW9uYXJ5OiBkaWN0LCB0LCBmb3JtYXQgfTtcbiAgfSwgW2RpY3RdKTtcblxuICByZXR1cm4gPEkxOG5Db250ZXh0LlByb3ZpZGVyIHZhbHVlPXt2YWx1ZX0+e2NoaWxkcmVufTwvSTE4bkNvbnRleHQuUHJvdmlkZXI+O1xufTtcblxuZXhwb3J0IGNvbnN0IHVzZUkxOG4gPSAoKSA9PiB1c2VDb250ZXh0KEkxOG5Db250ZXh0KTtcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBJMThuUHJvdmlkZXIgfSBmcm9tIFwiLi4vLi4vY29udGV4dC9JMThuQ29udGV4dC50c3hcIjtcbmltcG9ydCB7IEF1dGhQcm92aWRlciB9IGZyb20gXCIuLi8uLi9jb250ZXh0L0F1dGhDb250ZXh0LnRzeFwiO1xuXG50eXBlIFByb3BzID0ge1xuICBjaGlsZHJlbjogUmVhY3QuUmVhY3ROb2RlO1xufTtcblxuLy8gU2hhcmVkIHByb3ZpZGVyIHdyYXBwZXIgZm9yIHZpc2l0YXMgUmVhY3QgaXNsYW5kcy5cbmNvbnN0IFZpc2l0YXNQYWdlUHJvdmlkZXJzID0gKHsgY2hpbGRyZW4gfTogUHJvcHMpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8STE4blByb3ZpZGVyPlxuICAgICAgPEF1dGhQcm92aWRlcj57Y2hpbGRyZW59PC9BdXRoUHJvdmlkZXI+XG4gICAgPC9JMThuUHJvdmlkZXI+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBWaXNpdGFzUGFnZVByb3ZpZGVycztcbiIsICJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgRmxvYXRpbmdMaXN0IGZyb20gXCIuL0Zsb2F0aW5nTGlzdC50c3hcIjtcbmltcG9ydCB7IENoZXZyb25Eb3duU3ZnLCBDaGV2cm9uVXBTdmcgfSBmcm9tIFwiLi9jaGV2cm9ucy50c3hcIjtcbmltcG9ydCB7IHVzZU91dHNpZGVDbGljayB9IGZyb20gXCIuLi8uLi9ob29rcy91c2VPdXRzaWRlQ2xpY2sudHNcIjtcbmltcG9ydCB7IGNsYXNzTmFtZXMgfSBmcm9tIFwiLi4vLi4vdXRpbHMvY2xhc3NOYW1lcy50c1wiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5cbnR5cGUgUmF3T3B0aW9uID1cbiAgfCB7XG4gICAgICB2YWx1ZT86IHN0cmluZyB8IG51bWJlcjtcbiAgICAgIFZhbHVlPzogc3RyaW5nIHwgbnVtYmVyO1xuICAgICAgdGV4dD86IHN0cmluZztcbiAgICAgIFRleHQ/OiBzdHJpbmc7XG4gICAgICBpY29uPzogUmVhY3QuUmVhY3ROb2RlO1xuICAgICAgSWNvbj86IFJlYWN0LlJlYWN0Tm9kZTtcbiAgICB9XG4gIHwgW3N0cmluZyB8IG51bWJlciwgc3RyaW5nXTtcblxudHlwZSBOb3JtYWxpemVkT3B0aW9uID0ge1xuICB2YWx1ZTogc3RyaW5nIHwgbnVtYmVyO1xuICB0ZXh0OiBzdHJpbmc7XG4gIGljb24/OiBSZWFjdC5SZWFjdE5vZGU7XG59O1xuXG50eXBlIFNlbGVjdENvbWJvYm94UHJvcHMgPSB7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIG9wdGlvbnM6IFJhd09wdGlvbltdO1xuICB2YWx1ZTogc3RyaW5nIHwgbnVtYmVyO1xuICBvbkNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHBsYWNlaG9sZGVyPzogc3RyaW5nO1xuICBpbnZhbGlkPzogYm9vbGVhbjtcbiAgZGlzYWJsZWQ/OiBib29sZWFuO1xuICByZWFkT25seT86IGJvb2xlYW47XG4gIHVzZVBvcnRhbD86IGJvb2xlYW47XG4gIGVtaXRPblZhbHVlQ2hhbmdlPzogYm9vbGVhbjtcbiAgaWRCYXNlPzogc3RyaW5nO1xuICBwb3J0YWxDbGFzc05hbWU/OiBzdHJpbmc7XG4gIHBhbmVsQ2xhc3NOYW1lPzogc3RyaW5nO1xuICBzaG93U2VhcmNoQnV0dG9uPzogYm9vbGVhbjtcbiAgYWxsb3dUZXh0SW5wdXQ/OiBib29sZWFuO1xuICBzaG93TGFiZWw/OiBib29sZWFuO1xuICBzZWxlY3RlZFRleHRNb2RlPzogXCJ0ZXh0XCIgfCBcInZhbHVlXCI7XG4gIGRyb3Bkb3duRXhwYW5kUHg/OiBudW1iZXI7XG4gIGRyb3Bkb3duTWF4SGVpZ2h0Q2xhc3M/OiBzdHJpbmc7XG4gIHNlbGVjdGVkSWNvbkNsYXNzTmFtZT86IHN0cmluZztcbiAgb3B0aW9uSWNvbkNsYXNzTmFtZT86IHN0cmluZztcbn07XG5cbi8vIFJldXNhYmxlIHNlbGVjdCBjb21ib2JveCB3aXRoIG9wdGlvbmFsIHBvcnRhbCByZW5kZXJpbmcgZm9yIHRoZSBsaXN0LlxuY29uc3QgU2VsZWN0Q29tYm9ib3ggPSAoe1xuICBsYWJlbCxcbiAgb3B0aW9ucyxcbiAgdmFsdWUsXG4gIG9uQ2hhbmdlLFxuICBwbGFjZWhvbGRlcixcbiAgaW52YWxpZCA9IGZhbHNlLFxuICBkaXNhYmxlZCA9IGZhbHNlLFxuICByZWFkT25seSA9IGZhbHNlLFxuICB1c2VQb3J0YWwgPSB0cnVlLFxuICBlbWl0T25WYWx1ZUNoYW5nZSA9IGZhbHNlLFxuICBpZEJhc2UsXG4gIHBvcnRhbENsYXNzTmFtZSxcbiAgcGFuZWxDbGFzc05hbWUsXG4gIHNob3dTZWFyY2hCdXR0b24gPSBmYWxzZSxcbiAgYWxsb3dUZXh0SW5wdXQgPSB0cnVlLFxuICBzaG93TGFiZWwgPSB0cnVlLFxuICBzZWxlY3RlZFRleHRNb2RlID0gXCJ0ZXh0XCIsXG4gIGRyb3Bkb3duRXhwYW5kUHggPSAwLFxuICBkcm9wZG93bk1heEhlaWdodENsYXNzID0gXCJtYXgtaC03MlwiLFxuICBzZWxlY3RlZEljb25DbGFzc05hbWUgPSBcImgtNCB3LTRcIixcbiAgb3B0aW9uSWNvbkNsYXNzTmFtZSA9IFwiaC00IHctNFwiLFxufTogU2VsZWN0Q29tYm9ib3hQcm9wcykgPT4ge1xuICBjb25zdCByZWFkT25seU1vZGUgPSByZWFkT25seSB8fCBkaXNhYmxlZDtcbiAgY29uc3QgdmFsdWVDb2xvciA9IHJlYWRPbmx5TW9kZSA/IFwiIzY0NzQ4YlwiIDogXCIjMDAyOTZiZTBcIjtcbiAgY29uc3QgZGF0YSA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIHJldHVybiAob3B0aW9ucyB8fCBbXSkubWFwPE5vcm1hbGl6ZWRPcHRpb24+KChvKSA9PiB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShvKSkge1xuICAgICAgICByZXR1cm4geyB2YWx1ZTogb1swXSA/PyBcIlwiLCB0ZXh0OiBvWzFdID8/IFwiXCIgfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHZhbHVlOiBvPy52YWx1ZSA/PyBvPy5WYWx1ZSA/PyBcIlwiLFxuICAgICAgICB0ZXh0OiBvPy50ZXh0ID8/IG8/LlRleHQgPz8gXCJcIixcbiAgICAgICAgaWNvbjogbz8uaWNvbiA/PyBvPy5JY29uLFxuICAgICAgfTtcbiAgICB9KTtcbiAgfSwgW29wdGlvbnNdKTtcblxuICBjb25zdCBbcXVlcnksIHNldFF1ZXJ5XSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbc2VsZWN0ZWQsIHNldFNlbGVjdGVkXSA9IHVzZVN0YXRlKFxuICAgIGRhdGEuZmluZCgoZCkgPT4gU3RyaW5nKGQudmFsdWUpID09PSBTdHJpbmcodmFsdWUpKSB8fCB7IHZhbHVlOiBcIlwiLCB0ZXh0OiBcIlwiIH1cbiAgKTtcbiAgY29uc3QgW29wZW4sIHNldE9wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbYWN0aXZlSW5kZXgsIHNldEFjdGl2ZUluZGV4XSA9IHVzZVN0YXRlKDApO1xuICBjb25zdCBjb250YWluZXJSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgYm94UmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IGxpc3RSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcblxuICB1c2VPdXRzaWRlQ2xpY2soW2NvbnRhaW5lclJlZiwgbGlzdFJlZl0sICgpID0+IHNldE9wZW4oZmFsc2UpKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHNldFNlbGVjdGVkKGRhdGEuZmluZCgoZCkgPT4gU3RyaW5nKGQudmFsdWUpID09PSBTdHJpbmcodmFsdWUpKSB8fCB7IHZhbHVlOiBcIlwiLCB0ZXh0OiBcIlwiIH0pO1xuICB9LCBbdmFsdWUsIGRhdGFdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIC8vIFJlc2V0IHR5cGVkIHNlYXJjaCB0ZXh0IGFmdGVyIGV4dGVybmFsIHZhbHVlIGNoYW5nZXMuXG4gICAgc2V0UXVlcnkobnVsbCk7XG4gIH0sIFtzZWxlY3RlZF0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFlbWl0T25WYWx1ZUNoYW5nZSkgcmV0dXJuO1xuICAgIG9uQ2hhbmdlKHNlbGVjdGVkPy52YWx1ZSA/IFN0cmluZyhzZWxlY3RlZC52YWx1ZSkgOiBcIlwiKTtcbiAgfSwgW2VtaXRPblZhbHVlQ2hhbmdlLCBvbkNoYW5nZSwgc2VsZWN0ZWRdKTtcblxuICBjb25zdCBmaWx0ZXJlZCA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIGlmICghcXVlcnkgfHwgIXF1ZXJ5LnRyaW0oKSkgcmV0dXJuIGRhdGE7XG4gICAgY29uc3QgZiA9IGRhdGEuZmlsdGVyKChvKSA9PiB7XG4gICAgICBjb25zdCBvcHRpb25WYWx1ZSA9IFN0cmluZyhvLnZhbHVlID8/IFwiXCIpLnRyaW0oKTtcbiAgICAgIGlmICghb3B0aW9uVmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG8udGV4dC50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHF1ZXJ5LnRvTG93ZXJDYXNlKCkpO1xuICAgIH0pO1xuICAgIHJldHVybiBmLmxlbmd0aCA/IGYgOiBkYXRhO1xuICB9LCBbZGF0YSwgcXVlcnldKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHNldEFjdGl2ZUluZGV4KDApO1xuICB9LCBbZmlsdGVyZWQubGVuZ3RoLCBxdWVyeV0pO1xuXG4gIGNvbnN0IHNlbGVjdE9wdGlvbiA9IChvcHQ6IE5vcm1hbGl6ZWRPcHRpb24pID0+IHtcbiAgICBzZXRTZWxlY3RlZChvcHQpO1xuICAgIHNldFF1ZXJ5KG51bGwpO1xuICAgIHNldE9wZW4oZmFsc2UpO1xuICAgIGlmICghZW1pdE9uVmFsdWVDaGFuZ2UpIHtcbiAgICAgIG9uQ2hhbmdlKG9wdD8udmFsdWUgPyBTdHJpbmcob3B0LnZhbHVlKSA6IFwiXCIpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVLZXlEb3duID0gKGV2OiBSZWFjdC5LZXlib2FyZEV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+KSA9PiB7XG4gICAgaWYgKGRpc2FibGVkKSByZXR1cm47XG4gICAgaWYgKGV2LmtleSA9PT0gXCJBcnJvd0Rvd25cIikge1xuICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHNldE9wZW4odHJ1ZSk7XG4gICAgICBpZiAoZmlsdGVyZWQubGVuZ3RoKSBzZXRBY3RpdmVJbmRleCgoaWR4KSA9PiAoaWR4ICsgMSkgJSBmaWx0ZXJlZC5sZW5ndGgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoZXYua2V5ID09PSBcIkFycm93VXBcIikge1xuICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHNldE9wZW4odHJ1ZSk7XG4gICAgICBpZiAoZmlsdGVyZWQubGVuZ3RoKSBzZXRBY3RpdmVJbmRleCgoaWR4KSA9PiAoaWR4IC0gMSArIGZpbHRlcmVkLmxlbmd0aCkgJSBmaWx0ZXJlZC5sZW5ndGgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoZXYua2V5ID09PSBcIkVudGVyXCIpIHtcbiAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBpZiAob3BlbiAmJiBmaWx0ZXJlZC5sZW5ndGgpIHtcbiAgICAgICAgc2VsZWN0T3B0aW9uKGZpbHRlcmVkW2FjdGl2ZUluZGV4XSA/PyBmaWx0ZXJlZFswXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZXRPcGVuKHRydWUpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZXYua2V5ID09PSBcIkVzY2FwZVwiKSBzZXRPcGVuKGZhbHNlKTtcbiAgfTtcblxuICBjb25zdCBzYWZlSWQgPSBTdHJpbmcoaWRCYXNlIHx8IGxhYmVsIHx8IFwic2VsZWN0XCIpO1xuICBjb25zdCBsaXN0SWQgPSBgc2VsZWN0LW9wdGlvbnMtJHtzYWZlSWR9YDtcbiAgY29uc3QgYWN0aXZlSWQgPSBvcGVuICYmIGZpbHRlcmVkW2FjdGl2ZUluZGV4XSA/IGBzZWxlY3Qtb3B0LSR7c2FmZUlkfS0ke2ZpbHRlcmVkW2FjdGl2ZUluZGV4XS52YWx1ZX1gIDogdW5kZWZpbmVkO1xuICBjb25zdCBsaXN0T3BlbiA9IG9wZW4gJiYgIWRpc2FibGVkO1xuICBjb25zdCBzZWxlY3RlZFZhbHVlID0gU3RyaW5nKHNlbGVjdGVkPy52YWx1ZSA/PyBcIlwiKS50cmltKCk7XG4gIGNvbnN0IHNlbGVjdGVkRGlzcGxheVRleHQgPSBzZWxlY3RlZFRleHRNb2RlID09PSBcInZhbHVlXCIgPyBzZWxlY3RlZFZhbHVlIDogc2VsZWN0ZWQ/LnRleHQgfHwgXCJcIjtcbiAgY29uc3QgZGlzcGxheVZhbHVlID0gcXVlcnkgIT09IG51bGwgPyBxdWVyeSA6IChzZWxlY3RlZFZhbHVlID8gc2VsZWN0ZWREaXNwbGF5VGV4dCA6IFwiXCIpO1xuICBjb25zdCBzaG93U2VsZWN0ZWRJY29uID0gcXVlcnkgPT09IG51bGwgJiYgISFzZWxlY3RlZFZhbHVlICYmICEhc2VsZWN0ZWQ/Lmljb247XG4gIGNvbnN0IG5vcm1hbGl6ZWREcm9wZG93bkV4cGFuZFB4ID0gTnVtYmVyLmlzRmluaXRlKGRyb3Bkb3duRXhwYW5kUHgpID8gTWF0aC5tYXgoMCwgZHJvcGRvd25FeHBhbmRQeCkgOiAwO1xuICBjb25zdCBpbmxpbmVEcm9wZG93blN0eWxlOiBSZWFjdC5DU1NQcm9wZXJ0aWVzIHwgdW5kZWZpbmVkID1cbiAgICBub3JtYWxpemVkRHJvcGRvd25FeHBhbmRQeCA+IDAgPyB7IHdpZHRoOiBgY2FsYygxMDAlICsgJHtub3JtYWxpemVkRHJvcGRvd25FeHBhbmRQeH1weClgIH0gOiB1bmRlZmluZWQ7XG5cbiAgY29uc3QgbGlzdEJvZHkgPSAoXG4gICAgPGRpdiBpZD17bGlzdElkfSByZWY9e2xpc3RSZWZ9IHJvbGU9XCJsaXN0Ym94XCIgYXJpYS1sYWJlbD17bGFiZWx9PlxuICAgICAge2ZpbHRlcmVkLmxlbmd0aCA9PT0gMCAmJiA8ZGl2IGNsYXNzTmFtZT1cInB4LTQgcHktMiB0ZXh0LXNtIHRleHQtc2xhdGUtNTAwXCI+e2luZFQoXCJEcm9wZG93bl9Ob1Jlc3VsdHNcIiwgXCJObyByZXN1bHRzXCIpfTwvZGl2Pn1cbiAgICAgIHtmaWx0ZXJlZC5tYXAoKG9wdCwgaWR4KSA9PiB7XG4gICAgICAgIGNvbnN0IHNlbCA9IHNlbGVjdGVkPy52YWx1ZSA9PT0gb3B0LnZhbHVlO1xuICAgICAgICBjb25zdCBpc0FjdGl2ZSA9IGlkeCA9PT0gYWN0aXZlSW5kZXg7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICBrZXk9e1N0cmluZyhvcHQudmFsdWUpfVxuICAgICAgICAgICAgaWQ9e2BzZWxlY3Qtb3B0LSR7c2FmZUlkfS0ke29wdC52YWx1ZX1gfVxuICAgICAgICAgICAgcm9sZT1cIm9wdGlvblwiXG4gICAgICAgICAgICBhcmlhLXNlbGVjdGVkPXtzZWx9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICAgIFwicmVsYXRpdmUgZmxleCB3LWZ1bGwgY3Vyc29yLWRlZmF1bHQgc2VsZWN0LW5vbmUgaXRlbXMtY2VudGVyIHB5LTIgcHItMyB0ZXh0LWxlZnQgdGV4dC1zbSB0eXBlLW9wdGlvblwiLFxuICAgICAgICAgICAgICBpc0FjdGl2ZSA/IFwiYmctcHJpbWFyeSB0ZXh0LXdoaXRlXCIgOiBcInRleHQtc2xhdGUtOTAwXCJcbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICBvbk1vdXNlRW50ZXI9eygpID0+IHNldEFjdGl2ZUluZGV4KGlkeCl9XG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZWxlY3RPcHRpb24ob3B0KX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7c2VsICYmIChcbiAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICAgICAgICBcImFic29sdXRlIGluc2V0LXktMCBsZWZ0LTAgZmxleCBpdGVtcy1jZW50ZXIgcGwtMlwiLFxuICAgICAgICAgICAgICAgICAgaXNBY3RpdmUgPyBcInRleHQtd2hpdGVcIiA6IFwidGV4dC1wcmltYXJ5XCJcbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA+PC9zcGFuPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcImZsZXggbWluLXctMCBpdGVtcy1jZW50ZXIgZ2FwLTJcIiwgc2VsID8gXCJmb250LW1lZGl1bVwiIDogXCJmb250LW5vcm1hbFwiKX0+XG4gICAgICAgICAgICAgIHtvcHQuaWNvbiA/IChcbiAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAgICAgICAgICAgICBcImlubGluZS1mbGV4IHNocmluay0wIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlclwiLFxuICAgICAgICAgICAgICAgICAgICBvcHRpb25JY29uQ2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICBpc0FjdGl2ZSA/IFwidGV4dC13aGl0ZVwiIDogXCJ0ZXh0LXNsYXRlLTUwMFwiXG4gICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIHtvcHQuaWNvbn1cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJibG9jayB0cnVuY2F0ZVwiPntvcHQudGV4dH08L3NwYW4+XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICk7XG4gICAgICB9KX1cbiAgICA8L2Rpdj5cbiAgKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcInNwYWNlLXktMlwiLCBkaXNhYmxlZCA/IFwicG9pbnRlci1ldmVudHMtbm9uZSBzZWxlY3Qtbm9uZVwiIDogXCJcIil9XG4gICAgICByZWY9e2NvbnRhaW5lclJlZn1cbiAgICA+XG4gICAgICB7c2hvd0xhYmVsID8gPGxhYmVsIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZFwiLCBpbnZhbGlkID8gXCJ0ZXh0LXJvc2UtNzAwXCIgOiBcIlwiKX0+e2xhYmVsfTwvbGFiZWw+IDogbnVsbH1cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmVcIj5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIHJlZj17Ym94UmVmfVxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgICAgIFwicmVsYXRpdmUgdy1mdWxsIGN1cnNvci1kZWZhdWx0IHJvdW5kZWQteGwgYmctd2hpdGUgdGV4dC1sZWZ0IGZvY3VzLXdpdGhpbjpib3JkZXItcHJpbWFyeSBmb2N1cy13aXRoaW46cmluZy0yIGZvY3VzLXdpdGhpbjpyaW5nLXByaW1hcnkgZm9jdXMtd2l0aGluOnJpbmctb2Zmc2V0LXdoaXRlIHNtOnRleHQtc21cIixcbiAgICAgICAgICAgIHJlYWRPbmx5TW9kZSA/IFwiaW5kLXJlYWRvbmx5LWZpZWxkXCIgOiBcIlwiXG4gICAgICAgICAgKX1cbiAgICAgICAgICBzdHlsZT17cmVhZE9ubHlNb2RlID8geyBjb2xvcjogdmFsdWVDb2xvciB9IDogdW5kZWZpbmVkfVxuICAgICAgICA+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICAgIFwidy1mdWxsIHJvdW5kZWQteGwgYm9yZGVyIHB5LTIgdGV4dC1zbSBzbTp0ZXh0LWJhc2UgbGVhZGluZy01IGZvY3VzOm91dGxpbmUtaGlkZGVuIGZvY3VzOnJpbmctMiBkaXNhYmxlZDpiZy1zbGF0ZS0xMDAgZGlzYWJsZWQ6dGV4dC1zbGF0ZS01MDAgZGlzYWJsZWQ6Ym9yZGVyLXNsYXRlLTIwMCBkaXNhYmxlZDpjdXJzb3Itbm90LWFsbG93ZWRcIixcbiAgICAgICAgICAgICAgc2hvd1NlbGVjdGVkSWNvbiA/IFwicGwtOVwiIDogXCJwbC0zXCIsXG4gICAgICAgICAgICAgIHNob3dTZWFyY2hCdXR0b24gPyBcInByLTIwXCIgOiBcInByLTEwXCIsXG4gICAgICAgICAgICAgIGludmFsaWRcbiAgICAgICAgICAgICAgICA/IFwiYm9yZGVyLXJvc2UtNDAwIGJnLXJvc2UtNTAgZm9jdXM6cmluZy1yb3NlLTIwMCBmb2N1czpib3JkZXItcm9zZS00MDBcIlxuICAgICAgICAgICAgICAgIDogXCJib3JkZXItc2xhdGUtMjAwIGZvY3VzOnJpbmctcHJpbWFyeSBmb2N1czpib3JkZXItcHJpbWFyeVwiLFxuICAgICAgICAgICAgICByZWFkT25seU1vZGUgPyBcImluZC1yZWFkb25seS1maWVsZFwiIDogXCJ0ZXh0LXNsYXRlLTkwMFwiXG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgc3R5bGU9e3JlYWRPbmx5TW9kZSA/IHsgY29sb3I6IHZhbHVlQ29sb3IgfSA6IHVuZGVmaW5lZH1cbiAgICAgICAgICAgIHZhbHVlPXtkaXNwbGF5VmFsdWV9XG4gICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgIGlmICghYWxsb3dUZXh0SW5wdXQpIHJldHVybjtcbiAgICAgICAgICAgICAgY29uc3QgdmFsID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgICAgICAgICAgICBzZXRRdWVyeSh2YWwpO1xuICAgICAgICAgICAgICBzZXRPcGVuKHRydWUpO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIG9uS2V5RG93bj17aGFuZGxlS2V5RG93bn1cbiAgICAgICAgICAgIG9uRm9jdXM9eygpID0+IHtcbiAgICAgICAgICAgICAgaWYgKCFkaXNhYmxlZCkgc2V0T3Blbih0cnVlKTtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XG4gICAgICAgICAgICByZWFkT25seT17cmVhZE9ubHlNb2RlIHx8ICFhbGxvd1RleHRJbnB1dH1cbiAgICAgICAgICAgIGFyaWEtbGFiZWw9e2xhYmVsfVxuICAgICAgICAgICAgcm9sZT1cImNvbWJvYm94XCJcbiAgICAgICAgICAgIGFyaWEtZXhwYW5kZWQ9e2xpc3RPcGVufVxuICAgICAgICAgICAgYXJpYS1jb250cm9scz17bGlzdElkfVxuICAgICAgICAgICAgYXJpYS1hY3RpdmVkZXNjZW5kYW50PXthY3RpdmVJZH1cbiAgICAgICAgICAvPlxuICAgICAgICAgIHtzaG93U2VsZWN0ZWRJY29uID8gKFxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicG9pbnRlci1ldmVudHMtbm9uZSBhYnNvbHV0ZSBpbnNldC15LTAgbGVmdC0wIGZsZXggaXRlbXMtY2VudGVyIHBsLTMgdGV4dC1zbGF0ZS01MDBcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtjbGFzc05hbWVzKFwiaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyXCIsIHNlbGVjdGVkSWNvbkNsYXNzTmFtZSl9PntzZWxlY3RlZC5pY29ufTwvc3Bhbj5cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LXktMCByaWdodC0wIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHByLTJcIj5cbiAgICAgICAgICAgIHtzaG93U2VhcmNoQnV0dG9uID8gKFxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgcC0xLjUgdGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC1zbGF0ZS01MDBcIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgIGlmIChkaXNhYmxlZCkgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgc2V0T3Blbih0cnVlKTtcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2luZFQoXCJDb21tb25fU2VhcmNoXCIsIFwiU2VhcmNoXCIpfVxuICAgICAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGZpbGw9XCJub25lXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIHN0cm9rZVdpZHRoPXsxLjV9IHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIGNsYXNzTmFtZT1cImgtNSB3LTVcIj5cbiAgICAgICAgICAgICAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwibTE1Ljc1IDE1Ljc1LTIuNDg5LTIuNDg5bTAgMGEzLjM3NSAzLjM3NSAwIDEgMC00Ljc3My00Ljc3MyAzLjM3NSAzLjM3NSAwIDAgMCA0Ljc3NCA0Ljc3NFpNMjEgMTJhOSA5IDAgMSAxLTE4IDAgOSA5IDAgMCAxIDE4IDBaXCIgLz5cbiAgICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHAtMS41IHRleHQtc2xhdGUtNTAwIGhvdmVyOnRleHQtc2xhdGUtNjAwXCJcbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChkaXNhYmxlZCkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIHNldE9wZW4oKHByZXYpID0+ICFwcmV2KTtcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgYXJpYS1sYWJlbD17b3BlbiA/IGluZFQoXCJEcm9wZG93bl9IaWRlT3B0aW9uc1wiLCBcIkhpZGUgb3B0aW9uc1wiKSA6IGluZFQoXCJEcm9wZG93bl9TaG93T3B0aW9uc1wiLCBcIlNob3cgb3B0aW9uc1wiKX1cbiAgICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7b3BlbiA/IDxDaGV2cm9uVXBTdmcgY2xhc3NOYW1lPVwiaC01IHctNVwiIC8+IDogPENoZXZyb25Eb3duU3ZnIGNsYXNzTmFtZT1cImgtNSB3LTVcIiAvPn1cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAge3VzZVBvcnRhbCA/IChcbiAgICAgICAgICA8RmxvYXRpbmdMaXN0XG4gICAgICAgICAgICBhbmNob3JSZWY9e2JveFJlZn1cbiAgICAgICAgICAgIG9wZW49e2xpc3RPcGVufVxuICAgICAgICAgICAgekluZGV4PXszNjAwMDB9XG4gICAgICAgICAgICBtYXhIZWlnaHRDbGFzcz17ZHJvcGRvd25NYXhIZWlnaHRDbGFzc31cbiAgICAgICAgICAgIHJvbGU9XCJsaXN0Ym94XCJcbiAgICAgICAgICAgIHJvdW5kZWRDbGFzcz1cInJvdW5kZWQteGxcIlxuICAgICAgICAgICAgcG9ydGFsQ2xhc3NOYW1lPXtwb3J0YWxDbGFzc05hbWV9XG4gICAgICAgICAgICBwYW5lbENsYXNzTmFtZT17cGFuZWxDbGFzc05hbWV9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge2xpc3RCb2R5fVxuICAgICAgICAgIDwvRmxvYXRpbmdMaXN0PlxuICAgICAgICApIDogKFxuICAgICAgICAgIGxpc3RPcGVuICYmIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgYWJzb2x1dGUgei0zNjAwMDAgbXQtMSB3LWZ1bGwgcm91bmRlZC14bCBiZy13aGl0ZSBzaGFkb3ctbGcgcmluZy0xIHJpbmctYmxhY2svNSBmb2N1czpvdXRsaW5lLWhpZGRlbiAke2Ryb3Bkb3duTWF4SGVpZ2h0Q2xhc3N9IG92ZXJmbG93LWF1dG9gfVxuICAgICAgICAgICAgICBzdHlsZT17aW5saW5lRHJvcGRvd25TdHlsZX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge2xpc3RCb2R5fVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKVxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBTZWxlY3RDb21ib2JveDtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbUJBQTBEO0FBb0RqRDtBQWhEVCxJQUFNLGdCQUE2QztBQUFBLEVBQ2pELE1BQU07QUFBQSxFQUNOLE1BQU07QUFBQSxFQUNOLEtBQUs7QUFBQSxFQUNMLFlBQVk7QUFDZDtBQVNBLElBQU0sZUFBMEI7QUFBQSxFQUM5QixjQUFjLENBQUM7QUFBQSxFQUNmLGlCQUFpQjtBQUFBLEVBQ2pCLHFCQUFxQjtBQUFBLEVBQ3JCLFdBQVcsTUFBTTtBQUNuQjtBQUVBLElBQU0sa0JBQWMsNEJBQXlCLFlBQVk7QUFTbEQsSUFBTSxlQUFlLENBQUMsRUFBRSxVQUFVLGNBQWMsaUJBQWlCLG9CQUFvQixNQUFxQjtBQUMvRyxRQUFNLFNBQVMsaUJBQWlCLFdBQVcseUJB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LGdCQUNDLG1CQUNDLDZDQUFDLFVBQUssV0FBVSx1RkFDZCx1REFBQyxVQUFLLFdBQVcsV0FBVywyQ0FBMkMscUJBQXFCLEdBQUksbUJBQVMsTUFBSyxHQUNoSCxJQUNFO0FBQUEsZ0JBQ0osOENBQUMsU0FBSSxXQUFVLDJEQUNaO0FBQUEscUNBQ0M7QUFBQSxvQkFBQztBQUFBO0FBQUEsc0JBQ0MsTUFBSztBQUFBLHNCQUNMLFdBQVU7QUFBQSxzQkFDVixTQUFTLE1BQU07QUFDYiw0QkFBSSxTQUFVO0FBQ2QsZ0NBQVEsSUFBSTtBQUFBLHNCQUNkO0FBQUEsc0JBQ0EsY0FBWSxLQUFLLGlCQUFpQixRQUFRO0FBQUEsc0JBQzFDO0FBQUEsc0JBRUEsdURBQUMsU0FBSSxPQUFNLDhCQUE2QixNQUFLLFFBQU8sU0FBUSxhQUFZLGFBQWEsS0FBSyxRQUFPLGdCQUFlLFdBQVUsV0FDeEgsdURBQUMsVUFBSyxlQUFjLFNBQVEsZ0JBQWUsU0FBUSxHQUFFLGtJQUFpSSxHQUN4TDtBQUFBO0FBQUEsa0JBQ0YsSUFDRTtBQUFBLGtCQUNKO0FBQUEsb0JBQUM7QUFBQTtBQUFBLHNCQUNDLE1BQUs7QUFBQSxzQkFDTCxXQUFVO0FBQUEsc0JBQ1YsU0FBUyxNQUFNO0FBQ2IsNEJBQUksU0FBVTtBQUNkLGdDQUFRLENBQUMsU0FBUyxDQUFDLElBQUk7QUFBQSxzQkFDekI7QUFBQSxzQkFDQSxjQUFZLE9BQU8sS0FBSyx3QkFBd0IsY0FBYyxJQUFJLEtBQUssd0JBQXdCLGNBQWM7QUFBQSxzQkFDN0c7QUFBQSxzQkFFQyxpQkFBTyw2Q0FBQyxnQkFBYSxXQUFVLFdBQVUsSUFBSyw2Q0FBQyxrQkFBZSxXQUFVLFdBQVU7QUFBQTtBQUFBLGtCQUNyRjtBQUFBLG1CQUNGO0FBQUE7QUFBQTtBQUFBLFVBQ0Y7QUFBQSxVQUNDLFlBQ0M7QUFBQSxZQUFDO0FBQUE7QUFBQSxjQUNDLFdBQVc7QUFBQSxjQUNYLE1BQU07QUFBQSxjQUNOLFFBQVE7QUFBQSxjQUNSLGdCQUFnQjtBQUFBLGNBQ2hCLE1BQUs7QUFBQSxjQUNMLGNBQWE7QUFBQSxjQUNiO0FBQUEsY0FDQTtBQUFBLGNBRUM7QUFBQTtBQUFBLFVBQ0gsSUFFQSxZQUNFO0FBQUEsWUFBQztBQUFBO0FBQUEsY0FDQyxXQUFXLHdHQUF3RyxzQkFBc0I7QUFBQSxjQUN6SSxPQUFPO0FBQUEsY0FFTjtBQUFBO0FBQUEsVUFDSDtBQUFBLFdBR047QUFBQTtBQUFBO0FBQUEsRUFDRjtBQUVKO0FBRUEsSUFBTyx5QkFBUTsiLAogICJuYW1lcyI6IFsiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSIsICJkZWZhdWx0VmFsdWUiLCAidmFsdWUiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfanN4X3J1bnRpbWUiXQp9Cg==
