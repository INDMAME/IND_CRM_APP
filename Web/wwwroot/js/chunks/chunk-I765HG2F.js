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

// Web/wwwroot/react/src/context/I18nContext.tsx
var import_react = __toESM(require_react());
var import_jsx_runtime = __toESM(require_jsx_runtime());
var defaultDict = {};
var defaultValue = {
  dictionary: defaultDict,
  t: (key, fallback) => fallback || key,
  format: (key, fallback, ...args) => {
    const template = fallback || key;
    return String(template).replace(/\{(\d+)\}/g, (_, idx) => String(args[Number(idx)] ?? ""));
  }
};
var I18nContext = (0, import_react.createContext)(defaultValue);
var I18nProvider = ({ children, dictionary }) => {
  const dict = dictionary || (globalThis.__IND_I18N__ || {});
  const value = (0, import_react.useMemo)(() => {
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(I18nContext.Provider, { value, children });
};

// Web/wwwroot/react/src/context/AuthContext.tsx
var import_react2 = __toESM(require_react());
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var ACCESS_RIGHTS = {
  View: 1,
  Edit: 2,
  Add: 3,
  FullAccess: 4
};
var defaultValue2 = {
  moduleAccess: {},
  selectedCompany: "",
  canAccess: () => false
};
var AuthContext = (0, import_react2.createContext)(defaultValue2);
var AuthProvider = ({ children, moduleAccess, selectedCompany }) => {
  const access = moduleAccess || (globalThis.__IND_MODULE_ACCESS__ || {});
  const company = selectedCompany || String(globalThis.__IND_SELECTED_COMPANY__ || "");
  const value = (0, import_react2.useMemo)(() => {
    const canAccess = (code, level = "View") => {
      const current = Number(access?.[code] ?? 0);
      return current >= ACCESS_RIGHTS[level];
    };
    return { moduleAccess: access, selectedCompany: company, canAccess };
  }, [access, company]);
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(AuthContext.Provider, { value, children });
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
  showLabel = true
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
  const displayValue = query !== null ? query : selectedValue ? selected?.text || "" : "";
  const showSelectedIcon = query === null && !!selectedValue && !!selected?.icon;
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
                    "inline-flex h-4 w-4 shrink-0 items-center justify-center",
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
                showSelectedIcon ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "inline-flex h-4 w-4 items-center justify-center", children: selected.icon }) }) : null,
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
              maxHeightClass: "max-h-72",
              role: "listbox",
              roundedClass: "rounded-xl",
              portalClassName,
              panelClassName,
              children: listBody
            }
          ) : listOpen && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "absolute z-360000 mt-1 w-full rounded-xl bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden max-h-72 overflow-auto", children: listBody })
        ] })
      ]
    }
  );
};
var SelectCombobox_default = SelectCombobox;

export {
  SelectCombobox_default,
  VisitasPageProviders_default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL2NvbnRleHQvSTE4bkNvbnRleHQudHN4IiwgIi4uLy4uL3JlYWN0L3NyYy9jb250ZXh0L0F1dGhDb250ZXh0LnRzeCIsICIuLi8uLi9yZWFjdC9zcmMvY29tcG9uZW50cy9jb21tb25zL1Zpc2l0YXNQYWdlUHJvdmlkZXJzLnRzeCIsICIuLi8uLi9yZWFjdC9zcmMvY29tcG9uZW50cy9jb21tb25zL1NlbGVjdENvbWJvYm94LnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IFJlYWN0LCB7IGNyZWF0ZUNvbnRleHQsIHVzZUNvbnRleHQsIHVzZU1lbW8gfSBmcm9tIFwicmVhY3RcIjtcblxudHlwZSBJMThuRGljdCA9IFJlY29yZDxzdHJpbmcsIHN0cmluZz47XG5cbnR5cGUgSTE4blZhbHVlID0ge1xuICBkaWN0aW9uYXJ5OiBJMThuRGljdDtcbiAgdDogKGtleTogc3RyaW5nLCBmYWxsYmFjaz86IHN0cmluZykgPT4gc3RyaW5nO1xuICBmb3JtYXQ6IChrZXk6IHN0cmluZywgZmFsbGJhY2s6IHN0cmluZyB8IHVuZGVmaW5lZCwgLi4uYXJnczogQXJyYXk8c3RyaW5nIHwgbnVtYmVyPikgPT4gc3RyaW5nO1xufTtcblxuY29uc3QgZGVmYXVsdERpY3Q6IEkxOG5EaWN0ID0ge307XG5cbmNvbnN0IGRlZmF1bHRWYWx1ZTogSTE4blZhbHVlID0ge1xuICBkaWN0aW9uYXJ5OiBkZWZhdWx0RGljdCxcbiAgdDogKGtleSwgZmFsbGJhY2spID0+IGZhbGxiYWNrIHx8IGtleSxcbiAgZm9ybWF0OiAoa2V5LCBmYWxsYmFjaywgLi4uYXJncykgPT4ge1xuICAgIGNvbnN0IHRlbXBsYXRlID0gZmFsbGJhY2sgfHwga2V5O1xuICAgIHJldHVybiBTdHJpbmcodGVtcGxhdGUpLnJlcGxhY2UoL1xceyhcXGQrKVxcfS9nLCAoXywgaWR4KSA9PiBTdHJpbmcoYXJnc1tOdW1iZXIoaWR4KV0gPz8gXCJcIikpO1xuICB9LFxufTtcblxuY29uc3QgSTE4bkNvbnRleHQgPSBjcmVhdGVDb250ZXh0PEkxOG5WYWx1ZT4oZGVmYXVsdFZhbHVlKTtcblxudHlwZSBQcm92aWRlclByb3BzID0ge1xuICBjaGlsZHJlbjogUmVhY3QuUmVhY3ROb2RlO1xuICBkaWN0aW9uYXJ5PzogSTE4bkRpY3Q7XG59O1xuXG5leHBvcnQgY29uc3QgSTE4blByb3ZpZGVyID0gKHsgY2hpbGRyZW4sIGRpY3Rpb25hcnkgfTogUHJvdmlkZXJQcm9wcykgPT4ge1xuICBjb25zdCBkaWN0ID0gZGljdGlvbmFyeSB8fCAoZ2xvYmFsVGhpcy5fX0lORF9JMThOX18gfHwge30pO1xuXG4gIGNvbnN0IHZhbHVlID0gdXNlTWVtbzxJMThuVmFsdWU+KCgpID0+IHtcbiAgICBjb25zdCB0ID0gKGtleTogc3RyaW5nLCBmYWxsYmFjaz86IHN0cmluZykgPT4ge1xuICAgICAgY29uc3QgdmFsdWUgPSBkaWN0W2tleV07XG4gICAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiICYmIHZhbHVlLnRyaW0oKSkgcmV0dXJuIHZhbHVlO1xuICAgICAgcmV0dXJuIGZhbGxiYWNrIHx8IGtleTtcbiAgICB9O1xuICAgIGNvbnN0IGZvcm1hdCA9IChrZXk6IHN0cmluZywgZmFsbGJhY2s6IHN0cmluZyB8IHVuZGVmaW5lZCwgLi4uYXJnczogQXJyYXk8c3RyaW5nIHwgbnVtYmVyPikgPT4ge1xuICAgICAgY29uc3QgdGVtcGxhdGUgPSB0KGtleSwgZmFsbGJhY2spO1xuICAgICAgcmV0dXJuIFN0cmluZyh0ZW1wbGF0ZSkucmVwbGFjZSgvXFx7KFxcZCspXFx9L2csIChfLCBpZHgpID0+IFN0cmluZyhhcmdzW051bWJlcihpZHgpXSA/PyBcIlwiKSk7XG4gICAgfTtcbiAgICByZXR1cm4geyBkaWN0aW9uYXJ5OiBkaWN0LCB0LCBmb3JtYXQgfTtcbiAgfSwgW2RpY3RdKTtcblxuICByZXR1cm4gPEkxOG5Db250ZXh0LlByb3ZpZGVyIHZhbHVlPXt2YWx1ZX0+e2NoaWxkcmVufTwvSTE4bkNvbnRleHQuUHJvdmlkZXI+O1xufTtcblxuZXhwb3J0IGNvbnN0IHVzZUkxOG4gPSAoKSA9PiB1c2VDb250ZXh0KEkxOG5Db250ZXh0KTtcbiIsICJpbXBvcnQgUmVhY3QsIHsgY3JlYXRlQ29udGV4dCwgdXNlQ29udGV4dCwgdXNlTWVtbyB9IGZyb20gXCJyZWFjdFwiO1xuXG5leHBvcnQgdHlwZSBBY2Nlc3NMZXZlbCA9IFwiVmlld1wiIHwgXCJFZGl0XCIgfCBcIkFkZFwiIHwgXCJGdWxsQWNjZXNzXCI7XG5cbmNvbnN0IEFDQ0VTU19SSUdIVFM6IFJlY29yZDxBY2Nlc3NMZXZlbCwgbnVtYmVyPiA9IHtcbiAgVmlldzogMSxcbiAgRWRpdDogMixcbiAgQWRkOiAzLFxuICBGdWxsQWNjZXNzOiA0LFxufTtcblxudHlwZSBBdXRoVmFsdWUgPSB7XG4gIG1vZHVsZUFjY2VzczogUmVjb3JkPHN0cmluZywgbnVtYmVyPjtcbiAgc2VsZWN0ZWRDb21wYW55OiBzdHJpbmc7XG4gIGNhbkFjY2VzczogKGNvZGU6IHN0cmluZywgbGV2ZWw/OiBBY2Nlc3NMZXZlbCkgPT4gYm9vbGVhbjtcbn07XG5cbmNvbnN0IGRlZmF1bHRWYWx1ZTogQXV0aFZhbHVlID0ge1xuICBtb2R1bGVBY2Nlc3M6IHt9LFxuICBzZWxlY3RlZENvbXBhbnk6IFwiXCIsXG4gIGNhbkFjY2VzczogKCkgPT4gZmFsc2UsXG59O1xuXG5jb25zdCBBdXRoQ29udGV4dCA9IGNyZWF0ZUNvbnRleHQ8QXV0aFZhbHVlPihkZWZhdWx0VmFsdWUpO1xuXG50eXBlIFByb3ZpZGVyUHJvcHMgPSB7XG4gIGNoaWxkcmVuOiBSZWFjdC5SZWFjdE5vZGU7XG4gIG1vZHVsZUFjY2Vzcz86IFJlY29yZDxzdHJpbmcsIG51bWJlcj47XG4gIHNlbGVjdGVkQ29tcGFueT86IHN0cmluZztcbn07XG5cbmV4cG9ydCBjb25zdCBBdXRoUHJvdmlkZXIgPSAoeyBjaGlsZHJlbiwgbW9kdWxlQWNjZXNzLCBzZWxlY3RlZENvbXBhbnkgfTogUHJvdmlkZXJQcm9wcykgPT4ge1xuICBjb25zdCBhY2Nlc3MgPSBtb2R1bGVBY2Nlc3MgfHwgKGdsb2JhbFRoaXMuX19JTkRfTU9EVUxFX0FDQ0VTU19fIHx8IHt9KTtcbiAgY29uc3QgY29tcGFueSA9IHNlbGVjdGVkQ29tcGFueSB8fCBTdHJpbmcoZ2xvYmFsVGhpcy5fX0lORF9TRUxFQ1RFRF9DT01QQU5ZX18gfHwgXCJcIik7XG5cbiAgY29uc3QgdmFsdWUgPSB1c2VNZW1vPEF1dGhWYWx1ZT4oKCkgPT4ge1xuICAgIGNvbnN0IGNhbkFjY2VzcyA9IChjb2RlOiBzdHJpbmcsIGxldmVsOiBBY2Nlc3NMZXZlbCA9IFwiVmlld1wiKSA9PiB7XG4gICAgICBjb25zdCBjdXJyZW50ID0gTnVtYmVyKGFjY2Vzcz8uW2NvZGVdID8/IDApO1xuICAgICAgcmV0dXJuIGN1cnJlbnQgPj0gQUNDRVNTX1JJR0hUU1tsZXZlbF07XG4gICAgfTtcbiAgICByZXR1cm4geyBtb2R1bGVBY2Nlc3M6IGFjY2Vzcywgc2VsZWN0ZWRDb21wYW55OiBjb21wYW55LCBjYW5BY2Nlc3MgfTtcbiAgfSwgW2FjY2VzcywgY29tcGFueV0pO1xuXG4gIHJldHVybiA8QXV0aENvbnRleHQuUHJvdmlkZXIgdmFsdWU9e3ZhbHVlfT57Y2hpbGRyZW59PC9BdXRoQ29udGV4dC5Qcm92aWRlcj47XG59O1xuXG5leHBvcnQgY29uc3QgdXNlQXV0aENvbnRleHQgPSAoKSA9PiB1c2VDb250ZXh0KEF1dGhDb250ZXh0KTtcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBJMThuUHJvdmlkZXIgfSBmcm9tIFwiLi4vLi4vY29udGV4dC9JMThuQ29udGV4dC50c3hcIjtcbmltcG9ydCB7IEF1dGhQcm92aWRlciB9IGZyb20gXCIuLi8uLi9jb250ZXh0L0F1dGhDb250ZXh0LnRzeFwiO1xuXG50eXBlIFByb3BzID0ge1xuICBjaGlsZHJlbjogUmVhY3QuUmVhY3ROb2RlO1xufTtcblxuLy8gU2hhcmVkIHByb3ZpZGVyIHdyYXBwZXIgZm9yIHZpc2l0YXMgUmVhY3QgaXNsYW5kcy5cbmNvbnN0IFZpc2l0YXNQYWdlUHJvdmlkZXJzID0gKHsgY2hpbGRyZW4gfTogUHJvcHMpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8STE4blByb3ZpZGVyPlxuICAgICAgPEF1dGhQcm92aWRlcj57Y2hpbGRyZW59PC9BdXRoUHJvdmlkZXI+XG4gICAgPC9JMThuUHJvdmlkZXI+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBWaXNpdGFzUGFnZVByb3ZpZGVycztcbiIsICJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgRmxvYXRpbmdMaXN0IGZyb20gXCIuL0Zsb2F0aW5nTGlzdC50c3hcIjtcbmltcG9ydCB7IENoZXZyb25Eb3duU3ZnLCBDaGV2cm9uVXBTdmcgfSBmcm9tIFwiLi9jaGV2cm9ucy50c3hcIjtcbmltcG9ydCB7IHVzZU91dHNpZGVDbGljayB9IGZyb20gXCIuLi8uLi9ob29rcy91c2VPdXRzaWRlQ2xpY2sudHNcIjtcbmltcG9ydCB7IGNsYXNzTmFtZXMgfSBmcm9tIFwiLi4vLi4vdXRpbHMvY2xhc3NOYW1lcy50c1wiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5cbnR5cGUgUmF3T3B0aW9uID1cbiAgfCB7XG4gICAgICB2YWx1ZT86IHN0cmluZyB8IG51bWJlcjtcbiAgICAgIFZhbHVlPzogc3RyaW5nIHwgbnVtYmVyO1xuICAgICAgdGV4dD86IHN0cmluZztcbiAgICAgIFRleHQ/OiBzdHJpbmc7XG4gICAgICBpY29uPzogUmVhY3QuUmVhY3ROb2RlO1xuICAgICAgSWNvbj86IFJlYWN0LlJlYWN0Tm9kZTtcbiAgICB9XG4gIHwgW3N0cmluZyB8IG51bWJlciwgc3RyaW5nXTtcblxudHlwZSBOb3JtYWxpemVkT3B0aW9uID0ge1xuICB2YWx1ZTogc3RyaW5nIHwgbnVtYmVyO1xuICB0ZXh0OiBzdHJpbmc7XG4gIGljb24/OiBSZWFjdC5SZWFjdE5vZGU7XG59O1xuXG50eXBlIFNlbGVjdENvbWJvYm94UHJvcHMgPSB7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIG9wdGlvbnM6IFJhd09wdGlvbltdO1xuICB2YWx1ZTogc3RyaW5nIHwgbnVtYmVyO1xuICBvbkNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHBsYWNlaG9sZGVyPzogc3RyaW5nO1xuICBpbnZhbGlkPzogYm9vbGVhbjtcbiAgZGlzYWJsZWQ/OiBib29sZWFuO1xuICByZWFkT25seT86IGJvb2xlYW47XG4gIHVzZVBvcnRhbD86IGJvb2xlYW47XG4gIGVtaXRPblZhbHVlQ2hhbmdlPzogYm9vbGVhbjtcbiAgaWRCYXNlPzogc3RyaW5nO1xuICBwb3J0YWxDbGFzc05hbWU/OiBzdHJpbmc7XG4gIHBhbmVsQ2xhc3NOYW1lPzogc3RyaW5nO1xuICBzaG93U2VhcmNoQnV0dG9uPzogYm9vbGVhbjtcbiAgYWxsb3dUZXh0SW5wdXQ/OiBib29sZWFuO1xuICBzaG93TGFiZWw/OiBib29sZWFuO1xufTtcblxuLy8gUmV1c2FibGUgc2VsZWN0IGNvbWJvYm94IHdpdGggb3B0aW9uYWwgcG9ydGFsIHJlbmRlcmluZyBmb3IgdGhlIGxpc3QuXG5jb25zdCBTZWxlY3RDb21ib2JveCA9ICh7XG4gIGxhYmVsLFxuICBvcHRpb25zLFxuICB2YWx1ZSxcbiAgb25DaGFuZ2UsXG4gIHBsYWNlaG9sZGVyLFxuICBpbnZhbGlkID0gZmFsc2UsXG4gIGRpc2FibGVkID0gZmFsc2UsXG4gIHJlYWRPbmx5ID0gZmFsc2UsXG4gIHVzZVBvcnRhbCA9IHRydWUsXG4gIGVtaXRPblZhbHVlQ2hhbmdlID0gZmFsc2UsXG4gIGlkQmFzZSxcbiAgcG9ydGFsQ2xhc3NOYW1lLFxuICBwYW5lbENsYXNzTmFtZSxcbiAgc2hvd1NlYXJjaEJ1dHRvbiA9IGZhbHNlLFxuICBhbGxvd1RleHRJbnB1dCA9IHRydWUsXG4gIHNob3dMYWJlbCA9IHRydWUsXG59OiBTZWxlY3RDb21ib2JveFByb3BzKSA9PiB7XG4gIGNvbnN0IHJlYWRPbmx5TW9kZSA9IHJlYWRPbmx5IHx8IGRpc2FibGVkO1xuICBjb25zdCB2YWx1ZUNvbG9yID0gcmVhZE9ubHlNb2RlID8gXCIjNjQ3NDhiXCIgOiBcIiMwMDI5NmJlMFwiO1xuICBjb25zdCBkYXRhID0gdXNlTWVtbygoKSA9PiB7XG4gICAgcmV0dXJuIChvcHRpb25zIHx8IFtdKS5tYXA8Tm9ybWFsaXplZE9wdGlvbj4oKG8pID0+IHtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KG8pKSB7XG4gICAgICAgIHJldHVybiB7IHZhbHVlOiBvWzBdID8/IFwiXCIsIHRleHQ6IG9bMV0gPz8gXCJcIiB9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdmFsdWU6IG8/LnZhbHVlID8/IG8/LlZhbHVlID8/IFwiXCIsXG4gICAgICAgIHRleHQ6IG8/LnRleHQgPz8gbz8uVGV4dCA/PyBcIlwiLFxuICAgICAgICBpY29uOiBvPy5pY29uID8/IG8/Lkljb24sXG4gICAgICB9O1xuICAgIH0pO1xuICB9LCBbb3B0aW9uc10pO1xuXG4gIGNvbnN0IFtxdWVyeSwgc2V0UXVlcnldID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtzZWxlY3RlZCwgc2V0U2VsZWN0ZWRdID0gdXNlU3RhdGUoXG4gICAgZGF0YS5maW5kKChkKSA9PiBTdHJpbmcoZC52YWx1ZSkgPT09IFN0cmluZyh2YWx1ZSkpIHx8IHsgdmFsdWU6IFwiXCIsIHRleHQ6IFwiXCIgfVxuICApO1xuICBjb25zdCBbb3Blbiwgc2V0T3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFthY3RpdmVJbmRleCwgc2V0QWN0aXZlSW5kZXhdID0gdXNlU3RhdGUoMCk7XG4gIGNvbnN0IGNvbnRhaW5lclJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBib3hSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgbGlzdFJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xuXG4gIHVzZU91dHNpZGVDbGljayhbY29udGFpbmVyUmVmLCBsaXN0UmVmXSwgKCkgPT4gc2V0T3BlbihmYWxzZSkpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc2V0U2VsZWN0ZWQoZGF0YS5maW5kKChkKSA9PiBTdHJpbmcoZC52YWx1ZSkgPT09IFN0cmluZyh2YWx1ZSkpIHx8IHsgdmFsdWU6IFwiXCIsIHRleHQ6IFwiXCIgfSk7XG4gIH0sIFt2YWx1ZSwgZGF0YV0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgLy8gUmVzZXQgdHlwZWQgc2VhcmNoIHRleHQgYWZ0ZXIgZXh0ZXJuYWwgdmFsdWUgY2hhbmdlcy5cbiAgICBzZXRRdWVyeShudWxsKTtcbiAgfSwgW3NlbGVjdGVkXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWVtaXRPblZhbHVlQ2hhbmdlKSByZXR1cm47XG4gICAgb25DaGFuZ2Uoc2VsZWN0ZWQ/LnZhbHVlID8gU3RyaW5nKHNlbGVjdGVkLnZhbHVlKSA6IFwiXCIpO1xuICB9LCBbZW1pdE9uVmFsdWVDaGFuZ2UsIG9uQ2hhbmdlLCBzZWxlY3RlZF0pO1xuXG4gIGNvbnN0IGZpbHRlcmVkID0gdXNlTWVtbygoKSA9PiB7XG4gICAgaWYgKCFxdWVyeSB8fCAhcXVlcnkudHJpbSgpKSByZXR1cm4gZGF0YTtcbiAgICBjb25zdCBmID0gZGF0YS5maWx0ZXIoKG8pID0+IHtcbiAgICAgIGNvbnN0IG9wdGlvblZhbHVlID0gU3RyaW5nKG8udmFsdWUgPz8gXCJcIikudHJpbSgpO1xuICAgICAgaWYgKCFvcHRpb25WYWx1ZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gby50ZXh0LnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMocXVlcnkudG9Mb3dlckNhc2UoKSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGYubGVuZ3RoID8gZiA6IGRhdGE7XG4gIH0sIFtkYXRhLCBxdWVyeV0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc2V0QWN0aXZlSW5kZXgoMCk7XG4gIH0sIFtmaWx0ZXJlZC5sZW5ndGgsIHF1ZXJ5XSk7XG5cbiAgY29uc3Qgc2VsZWN0T3B0aW9uID0gKG9wdDogTm9ybWFsaXplZE9wdGlvbikgPT4ge1xuICAgIHNldFNlbGVjdGVkKG9wdCk7XG4gICAgc2V0UXVlcnkobnVsbCk7XG4gICAgc2V0T3BlbihmYWxzZSk7XG4gICAgaWYgKCFlbWl0T25WYWx1ZUNoYW5nZSkge1xuICAgICAgb25DaGFuZ2Uob3B0Py52YWx1ZSA/IFN0cmluZyhvcHQudmFsdWUpIDogXCJcIik7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUtleURvd24gPSAoZXY6IFJlYWN0LktleWJvYXJkRXZlbnQ8SFRNTElucHV0RWxlbWVudD4pID0+IHtcbiAgICBpZiAoZGlzYWJsZWQpIHJldHVybjtcbiAgICBpZiAoZXYua2V5ID09PSBcIkFycm93RG93blwiKSB7XG4gICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgc2V0T3Blbih0cnVlKTtcbiAgICAgIGlmIChmaWx0ZXJlZC5sZW5ndGgpIHNldEFjdGl2ZUluZGV4KChpZHgpID0+IChpZHggKyAxKSAlIGZpbHRlcmVkLmxlbmd0aCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChldi5rZXkgPT09IFwiQXJyb3dVcFwiKSB7XG4gICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgc2V0T3Blbih0cnVlKTtcbiAgICAgIGlmIChmaWx0ZXJlZC5sZW5ndGgpIHNldEFjdGl2ZUluZGV4KChpZHgpID0+IChpZHggLSAxICsgZmlsdGVyZWQubGVuZ3RoKSAlIGZpbHRlcmVkLmxlbmd0aCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChldi5rZXkgPT09IFwiRW50ZXJcIikge1xuICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGlmIChvcGVuICYmIGZpbHRlcmVkLmxlbmd0aCkge1xuICAgICAgICBzZWxlY3RPcHRpb24oZmlsdGVyZWRbYWN0aXZlSW5kZXhdID8/IGZpbHRlcmVkWzBdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNldE9wZW4odHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChldi5rZXkgPT09IFwiRXNjYXBlXCIpIHNldE9wZW4oZmFsc2UpO1xuICB9O1xuXG4gIGNvbnN0IHNhZmVJZCA9IFN0cmluZyhpZEJhc2UgfHwgbGFiZWwgfHwgXCJzZWxlY3RcIik7XG4gIGNvbnN0IGxpc3RJZCA9IGBzZWxlY3Qtb3B0aW9ucy0ke3NhZmVJZH1gO1xuICBjb25zdCBhY3RpdmVJZCA9IG9wZW4gJiYgZmlsdGVyZWRbYWN0aXZlSW5kZXhdID8gYHNlbGVjdC1vcHQtJHtzYWZlSWR9LSR7ZmlsdGVyZWRbYWN0aXZlSW5kZXhdLnZhbHVlfWAgOiB1bmRlZmluZWQ7XG4gIGNvbnN0IGxpc3RPcGVuID0gb3BlbiAmJiAhZGlzYWJsZWQ7XG4gIGNvbnN0IHNlbGVjdGVkVmFsdWUgPSBTdHJpbmcoc2VsZWN0ZWQ/LnZhbHVlID8/IFwiXCIpLnRyaW0oKTtcbiAgY29uc3QgZGlzcGxheVZhbHVlID0gcXVlcnkgIT09IG51bGwgPyBxdWVyeSA6IChzZWxlY3RlZFZhbHVlID8gc2VsZWN0ZWQ/LnRleHQgfHwgXCJcIiA6IFwiXCIpO1xuICBjb25zdCBzaG93U2VsZWN0ZWRJY29uID0gcXVlcnkgPT09IG51bGwgJiYgISFzZWxlY3RlZFZhbHVlICYmICEhc2VsZWN0ZWQ/Lmljb247XG5cbiAgY29uc3QgbGlzdEJvZHkgPSAoXG4gICAgPGRpdiBpZD17bGlzdElkfSByZWY9e2xpc3RSZWZ9IHJvbGU9XCJsaXN0Ym94XCIgYXJpYS1sYWJlbD17bGFiZWx9PlxuICAgICAge2ZpbHRlcmVkLmxlbmd0aCA9PT0gMCAmJiA8ZGl2IGNsYXNzTmFtZT1cInB4LTQgcHktMiB0ZXh0LXNtIHRleHQtc2xhdGUtNTAwXCI+e2luZFQoXCJEcm9wZG93bl9Ob1Jlc3VsdHNcIiwgXCJObyByZXN1bHRzXCIpfTwvZGl2Pn1cbiAgICAgIHtmaWx0ZXJlZC5tYXAoKG9wdCwgaWR4KSA9PiB7XG4gICAgICAgIGNvbnN0IHNlbCA9IHNlbGVjdGVkPy52YWx1ZSA9PT0gb3B0LnZhbHVlO1xuICAgICAgICBjb25zdCBpc0FjdGl2ZSA9IGlkeCA9PT0gYWN0aXZlSW5kZXg7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICBrZXk9e1N0cmluZyhvcHQudmFsdWUpfVxuICAgICAgICAgICAgaWQ9e2BzZWxlY3Qtb3B0LSR7c2FmZUlkfS0ke29wdC52YWx1ZX1gfVxuICAgICAgICAgICAgcm9sZT1cIm9wdGlvblwiXG4gICAgICAgICAgICBhcmlhLXNlbGVjdGVkPXtzZWx9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICAgIFwicmVsYXRpdmUgZmxleCB3LWZ1bGwgY3Vyc29yLWRlZmF1bHQgc2VsZWN0LW5vbmUgaXRlbXMtY2VudGVyIHB5LTIgcHItMyB0ZXh0LWxlZnQgdGV4dC1zbSB0eXBlLW9wdGlvblwiLFxuICAgICAgICAgICAgICBpc0FjdGl2ZSA/IFwiYmctcHJpbWFyeSB0ZXh0LXdoaXRlXCIgOiBcInRleHQtc2xhdGUtOTAwXCJcbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICBvbk1vdXNlRW50ZXI9eygpID0+IHNldEFjdGl2ZUluZGV4KGlkeCl9XG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZWxlY3RPcHRpb24ob3B0KX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7c2VsICYmIChcbiAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICAgICAgICBcImFic29sdXRlIGluc2V0LXktMCBsZWZ0LTAgZmxleCBpdGVtcy1jZW50ZXIgcGwtMlwiLFxuICAgICAgICAgICAgICAgICAgaXNBY3RpdmUgPyBcInRleHQtd2hpdGVcIiA6IFwidGV4dC1wcmltYXJ5XCJcbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA+PC9zcGFuPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcImZsZXggbWluLXctMCBpdGVtcy1jZW50ZXIgZ2FwLTJcIiwgc2VsID8gXCJmb250LW1lZGl1bVwiIDogXCJmb250LW5vcm1hbFwiKX0+XG4gICAgICAgICAgICAgIHtvcHQuaWNvbiA/IChcbiAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAgICAgICAgICAgICBcImlubGluZS1mbGV4IGgtNCB3LTQgc2hyaW5rLTAgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyXCIsXG4gICAgICAgICAgICAgICAgICAgIGlzQWN0aXZlID8gXCJ0ZXh0LXdoaXRlXCIgOiBcInRleHQtc2xhdGUtNTAwXCJcbiAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAge29wdC5pY29ufVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImJsb2NrIHRydW5jYXRlXCI+e29wdC50ZXh0fTwvc3Bhbj5cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgKTtcbiAgICAgIH0pfVxuICAgIDwvZGl2PlxuICApO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdlxuICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFwic3BhY2UteS0yXCIsIGRpc2FibGVkID8gXCJwb2ludGVyLWV2ZW50cy1ub25lIHNlbGVjdC1ub25lXCIgOiBcIlwiKX1cbiAgICAgIHJlZj17Y29udGFpbmVyUmVmfVxuICAgID5cbiAgICAgIHtzaG93TGFiZWwgPyA8bGFiZWwgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFwiZm9ybS1sYWJlbCBmb250LXNlbWlib2xkXCIsIGludmFsaWQgPyBcInRleHQtcm9zZS03MDBcIiA6IFwiXCIpfT57bGFiZWx9PC9sYWJlbD4gOiBudWxsfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZVwiPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgcmVmPXtib3hSZWZ9XG4gICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAgICAgXCJyZWxhdGl2ZSB3LWZ1bGwgY3Vyc29yLWRlZmF1bHQgcm91bmRlZC14bCBiZy13aGl0ZSB0ZXh0LWxlZnQgZm9jdXMtd2l0aGluOmJvcmRlci1wcmltYXJ5IGZvY3VzLXdpdGhpbjpyaW5nLTIgZm9jdXMtd2l0aGluOnJpbmctcHJpbWFyeSBmb2N1cy13aXRoaW46cmluZy1vZmZzZXQtd2hpdGUgc206dGV4dC1zbVwiLFxuICAgICAgICAgICAgcmVhZE9ubHlNb2RlID8gXCJpbmQtcmVhZG9ubHktZmllbGRcIiA6IFwiXCJcbiAgICAgICAgICApfVxuICAgICAgICAgIHN0eWxlPXtyZWFkT25seU1vZGUgPyB7IGNvbG9yOiB2YWx1ZUNvbG9yIH0gOiB1bmRlZmluZWR9XG4gICAgICAgID5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgICAgICAgXCJ3LWZ1bGwgcm91bmRlZC14bCBib3JkZXIgcHktMiB0ZXh0LXNtIHNtOnRleHQtYmFzZSBsZWFkaW5nLTUgZm9jdXM6b3V0bGluZS1oaWRkZW4gZm9jdXM6cmluZy0yIGRpc2FibGVkOmJnLXNsYXRlLTEwMCBkaXNhYmxlZDp0ZXh0LXNsYXRlLTUwMCBkaXNhYmxlZDpib3JkZXItc2xhdGUtMjAwIGRpc2FibGVkOmN1cnNvci1ub3QtYWxsb3dlZFwiLFxuICAgICAgICAgICAgICBzaG93U2VsZWN0ZWRJY29uID8gXCJwbC05XCIgOiBcInBsLTNcIixcbiAgICAgICAgICAgICAgc2hvd1NlYXJjaEJ1dHRvbiA/IFwicHItMjBcIiA6IFwicHItMTBcIixcbiAgICAgICAgICAgICAgaW52YWxpZFxuICAgICAgICAgICAgICAgID8gXCJib3JkZXItcm9zZS00MDAgYmctcm9zZS01MCBmb2N1czpyaW5nLXJvc2UtMjAwIGZvY3VzOmJvcmRlci1yb3NlLTQwMFwiXG4gICAgICAgICAgICAgICAgOiBcImJvcmRlci1zbGF0ZS0yMDAgZm9jdXM6cmluZy1wcmltYXJ5IGZvY3VzOmJvcmRlci1wcmltYXJ5XCIsXG4gICAgICAgICAgICAgIHJlYWRPbmx5TW9kZSA/IFwiaW5kLXJlYWRvbmx5LWZpZWxkXCIgOiBcInRleHQtc2xhdGUtOTAwXCJcbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICBzdHlsZT17cmVhZE9ubHlNb2RlID8geyBjb2xvcjogdmFsdWVDb2xvciB9IDogdW5kZWZpbmVkfVxuICAgICAgICAgICAgdmFsdWU9e2Rpc3BsYXlWYWx1ZX1cbiAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgaWYgKCFhbGxvd1RleHRJbnB1dCkgcmV0dXJuO1xuICAgICAgICAgICAgICBjb25zdCB2YWwgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgICAgICAgICAgIHNldFF1ZXJ5KHZhbCk7XG4gICAgICAgICAgICAgIHNldE9wZW4odHJ1ZSk7XG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgb25LZXlEb3duPXtoYW5kbGVLZXlEb3dufVxuICAgICAgICAgICAgb25Gb2N1cz17KCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoIWRpc2FibGVkKSBzZXRPcGVuKHRydWUpO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cbiAgICAgICAgICAgIHJlYWRPbmx5PXtyZWFkT25seU1vZGUgfHwgIWFsbG93VGV4dElucHV0fVxuICAgICAgICAgICAgYXJpYS1sYWJlbD17bGFiZWx9XG4gICAgICAgICAgICByb2xlPVwiY29tYm9ib3hcIlxuICAgICAgICAgICAgYXJpYS1leHBhbmRlZD17bGlzdE9wZW59XG4gICAgICAgICAgICBhcmlhLWNvbnRyb2xzPXtsaXN0SWR9XG4gICAgICAgICAgICBhcmlhLWFjdGl2ZWRlc2NlbmRhbnQ9e2FjdGl2ZUlkfVxuICAgICAgICAgIC8+XG4gICAgICAgICAge3Nob3dTZWxlY3RlZEljb24gPyAoXG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJwb2ludGVyLWV2ZW50cy1ub25lIGFic29sdXRlIGluc2V0LXktMCBsZWZ0LTAgZmxleCBpdGVtcy1jZW50ZXIgcGwtMyB0ZXh0LXNsYXRlLTUwMFwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJpbmxpbmUtZmxleCBoLTQgdy00IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlclwiPntzZWxlY3RlZC5pY29ufTwvc3Bhbj5cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LXktMCByaWdodC0wIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHByLTJcIj5cbiAgICAgICAgICAgIHtzaG93U2VhcmNoQnV0dG9uID8gKFxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgcC0xLjUgdGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC1zbGF0ZS01MDBcIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgIGlmIChkaXNhYmxlZCkgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgc2V0T3Blbih0cnVlKTtcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2luZFQoXCJDb21tb25fU2VhcmNoXCIsIFwiU2VhcmNoXCIpfVxuICAgICAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGZpbGw9XCJub25lXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIHN0cm9rZVdpZHRoPXsxLjV9IHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIGNsYXNzTmFtZT1cImgtNSB3LTVcIj5cbiAgICAgICAgICAgICAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwibTE1Ljc1IDE1Ljc1LTIuNDg5LTIuNDg5bTAgMGEzLjM3NSAzLjM3NSAwIDEgMC00Ljc3My00Ljc3MyAzLjM3NSAzLjM3NSAwIDAgMCA0Ljc3NCA0Ljc3NFpNMjEgMTJhOSA5IDAgMSAxLTE4IDAgOSA5IDAgMCAxIDE4IDBaXCIgLz5cbiAgICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHAtMS41IHRleHQtc2xhdGUtNTAwIGhvdmVyOnRleHQtc2xhdGUtNjAwXCJcbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChkaXNhYmxlZCkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIHNldE9wZW4oKHByZXYpID0+ICFwcmV2KTtcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgYXJpYS1sYWJlbD17b3BlbiA/IGluZFQoXCJEcm9wZG93bl9IaWRlT3B0aW9uc1wiLCBcIkhpZGUgb3B0aW9uc1wiKSA6IGluZFQoXCJEcm9wZG93bl9TaG93T3B0aW9uc1wiLCBcIlNob3cgb3B0aW9uc1wiKX1cbiAgICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7b3BlbiA/IDxDaGV2cm9uVXBTdmcgY2xhc3NOYW1lPVwiaC01IHctNVwiIC8+IDogPENoZXZyb25Eb3duU3ZnIGNsYXNzTmFtZT1cImgtNSB3LTVcIiAvPn1cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAge3VzZVBvcnRhbCA/IChcbiAgICAgICAgICA8RmxvYXRpbmdMaXN0XG4gICAgICAgICAgICBhbmNob3JSZWY9e2JveFJlZn1cbiAgICAgICAgICAgIG9wZW49e2xpc3RPcGVufVxuICAgICAgICAgICAgekluZGV4PXszNjAwMDB9XG4gICAgICAgICAgICBtYXhIZWlnaHRDbGFzcz1cIm1heC1oLTcyXCJcbiAgICAgICAgICAgIHJvbGU9XCJsaXN0Ym94XCJcbiAgICAgICAgICAgIHJvdW5kZWRDbGFzcz1cInJvdW5kZWQteGxcIlxuICAgICAgICAgICAgcG9ydGFsQ2xhc3NOYW1lPXtwb3J0YWxDbGFzc05hbWV9XG4gICAgICAgICAgICBwYW5lbENsYXNzTmFtZT17cGFuZWxDbGFzc05hbWV9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge2xpc3RCb2R5fVxuICAgICAgICAgIDwvRmxvYXRpbmdMaXN0PlxuICAgICAgICApIDogKFxuICAgICAgICAgIGxpc3RPcGVuICYmIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgei0zNjAwMDAgbXQtMSB3LWZ1bGwgcm91bmRlZC14bCBiZy13aGl0ZSBzaGFkb3ctbGcgcmluZy0xIHJpbmctYmxhY2svNSBmb2N1czpvdXRsaW5lLWhpZGRlbiBtYXgtaC03MiBvdmVyZmxvdy1hdXRvXCI+XG4gICAgICAgICAgICAgIHtsaXN0Qm9keX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIClcbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgU2VsZWN0Q29tYm9ib3g7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1CQUEwRDtBQTRDakQ7QUFsQ1QsSUFBTSxjQUF3QixDQUFDO0FBRS9CLElBQU0sZUFBMEI7QUFBQSxFQUM5QixZQUFZO0FBQUEsRUFDWixHQUFHLENBQUMsS0FBSyxhQUFhLFlBQVk7QUFBQSxFQUNsQyxRQUFRLENBQUMsS0FBSyxhQUFhLFNBQVM7QUFDbEMsVUFBTSxXQUFXLFlBQVk7QUFDN0IsV0FBTyxPQUFPLFFBQVEsRUFBRSxRQUFRLGNBQWMsQ0FBQyxHQUFHLFFBQVEsT0FBTyxLQUFLLE9BQU8sR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQUEsRUFDM0Y7QUFDRjtBQUVBLElBQU0sa0JBQWMsNEJBQXlCLFlBQVk7QUFPbEQsSUFBTSxlQUFlLENBQUMsRUFBRSxVQUFVLFdBQVcsTUFBcUI7QUFDdkUsUUFBTSxPQUFPLGVBQWUsV0FBVyxnQkFBZ0IsQ0FBQztBQUV4RCxRQUFNLFlBQVEsc0JBQW1CLE1BQU07QUFDckMsVUFBTSxJQUFJLENBQUMsS0FBYSxhQUFzQjtBQUM1QyxZQUFNQSxTQUFRLEtBQUssR0FBRztBQUN0QixVQUFJLE9BQU9BLFdBQVUsWUFBWUEsT0FBTSxLQUFLLEVBQUcsUUFBT0E7QUFDdEQsYUFBTyxZQUFZO0FBQUEsSUFDckI7QUFDQSxVQUFNLFNBQVMsQ0FBQyxLQUFhLGFBQWlDLFNBQWlDO0FBQzdGLFlBQU0sV0FBVyxFQUFFLEtBQUssUUFBUTtBQUNoQyxhQUFPLE9B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YiwwQkFBSSxDQUFDLFNBQVUsU0FBUSxJQUFJO0FBQUEsb0JBQzdCO0FBQUEsb0JBQ0E7QUFBQSxvQkFDQSxVQUFVLGdCQUFnQixDQUFDO0FBQUEsb0JBQzNCLGNBQVk7QUFBQSxvQkFDWixNQUFLO0FBQUEsb0JBQ0wsaUJBQWU7QUFBQSxvQkFDZixpQkFBZTtBQUFBLG9CQUNmLHlCQUF1QjtBQUFBO0FBQUEsZ0JBQ3pCO0FBQUEsZ0JBQ0MsbUJBQ0MsNkNBQUMsVUFBSyxXQUFVLHVGQUNkLHVEQUFDLFVBQUssV0FBVSxtREFBbUQsbUJBQVMsTUFBSyxHQUNuRixJQUNFO0FBQUEsZ0JBQ0osOENBQUMsU0FBSSxXQUFVLDJEQUNaO0FBQUEscUNBQ0M7QUFBQSxvQkFBQztBQUFBO0FBQUEsc0JBQ0MsTUFBSztBQUFBLHNCQUNMLFdBQVU7QUFBQSxzQkFDVixTQUFTLE1BQU07QUFDYiw0QkFBSSxTQUFVO0FBQ2QsZ0NBQVEsSUFBSTtBQUFBLHNCQUNkO0FBQUEsc0JBQ0EsY0FBWSxLQUFLLGlCQUFpQixRQUFRO0FBQUEsc0JBQzFDO0FBQUEsc0JBRUEsdURBQUMsU0FBSSxPQUFNLDhCQUE2QixNQUFLLFFBQU8sU0FBUSxhQUFZLGFBQWEsS0FBSyxRQUFPLGdCQUFlLFdBQVUsV0FDeEgsdURBQUMsVUFBSyxlQUFjLFNBQVEsZ0JBQWUsU0FBUSxHQUFFLGtJQUFpSSxHQUN4TDtBQUFBO0FBQUEsa0JBQ0YsSUFDRTtBQUFBLGtCQUNKO0FBQUEsb0JBQUM7QUFBQTtBQUFBLHNCQUNDLE1BQUs7QUFBQSxzQkFDTCxXQUFVO0FBQUEsc0JBQ1YsU0FBUyxNQUFNO0FBQ2IsNEJBQUksU0FBVTtBQUNkLGdDQUFRLENBQUMsU0FBUyxDQUFDLElBQUk7QUFBQSxzQkFDekI7QUFBQSxzQkFDQSxjQUFZLE9BQU8sS0FBSyx3QkFBd0IsY0FBYyxJQUFJLEtBQUssd0JBQXdCLGNBQWM7QUFBQSxzQkFDN0c7QUFBQSxzQkFFQyxpQkFBTyw2Q0FBQyxnQkFBYSxXQUFVLFdBQVUsSUFBSyw2Q0FBQyxrQkFBZSxXQUFVLFdBQVU7QUFBQTtBQUFBLGtCQUNyRjtBQUFBLG1CQUNGO0FBQUE7QUFBQTtBQUFBLFVBQ0Y7QUFBQSxVQUNDLFlBQ0M7QUFBQSxZQUFDO0FBQUE7QUFBQSxjQUNDLFdBQVc7QUFBQSxjQUNYLE1BQU07QUFBQSxjQUNOLFFBQVE7QUFBQSxjQUNSLGdCQUFlO0FBQUEsY0FDZixNQUFLO0FBQUEsY0FDTCxjQUFhO0FBQUEsY0FDYjtBQUFBLGNBQ0E7QUFBQSxjQUVDO0FBQUE7QUFBQSxVQUNILElBRUEsWUFDRSw2Q0FBQyxTQUFJLFdBQVUsK0hBQ1osb0JBQ0g7QUFBQSxXQUdOO0FBQUE7QUFBQTtBQUFBLEVBQ0Y7QUFFSjtBQUVBLElBQU8seUJBQVE7IiwKICAibmFtZXMiOiBbInZhbHVlIiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiZGVmYXVsdFZhbHVlIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIl0KfQo=
