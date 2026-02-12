import {
  ChevronDownSvg,
  ChevronUpSvg,
  FloatingList_default,
  classNames,
  indT,
  useOutsideClick
} from "./chunk-FICWEV5U.js";
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
      return { value: o?.value ?? o?.Value ?? "", text: o?.text ?? o?.Text ?? "" };
    });
  }, [options]);
  const [query, setQuery] = (0, import_react3.useState)("");
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
    setQuery("");
  }, [selected]);
  (0, import_react3.useEffect)(() => {
    if (!emitOnValueChange) return;
    onChange(selected?.value ? String(selected.value) : "");
  }, [emitOnValueChange, onChange, selected]);
  const filtered = (0, import_react3.useMemo)(() => {
    if (!query.trim()) return data;
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
    setQuery("");
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
  const displayValue = query || (selectedValue ? selected?.text || "" : "");
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
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: classNames("block truncate", sel ? "font-medium" : "font-normal"), children: opt.text })
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
                      "w-full rounded-xl border px-3 py-2 text-sm sm:text-base leading-5 focus:outline-hidden focus:ring-2 disabled:bg-slate-100 disabled:text-slate-500 disabled:border-slate-200 disabled:cursor-not-allowed",
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL2NvbnRleHQvSTE4bkNvbnRleHQudHN4IiwgIi4uLy4uL3JlYWN0L3NyYy9jb250ZXh0L0F1dGhDb250ZXh0LnRzeCIsICIuLi8uLi9yZWFjdC9zcmMvY29tcG9uZW50cy9jb21tb25zL1Zpc2l0YXNQYWdlUHJvdmlkZXJzLnRzeCIsICIuLi8uLi9yZWFjdC9zcmMvY29tcG9uZW50cy9jb21tb25zL1NlbGVjdENvbWJvYm94LnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IFJlYWN0LCB7IGNyZWF0ZUNvbnRleHQsIHVzZUNvbnRleHQsIHVzZU1lbW8gfSBmcm9tIFwicmVhY3RcIjtcblxudHlwZSBJMThuRGljdCA9IFJlY29yZDxzdHJpbmcsIHN0cmluZz47XG5cbnR5cGUgSTE4blZhbHVlID0ge1xuICBkaWN0aW9uYXJ5OiBJMThuRGljdDtcbiAgdDogKGtleTogc3RyaW5nLCBmYWxsYmFjaz86IHN0cmluZykgPT4gc3RyaW5nO1xuICBmb3JtYXQ6IChrZXk6IHN0cmluZywgZmFsbGJhY2s6IHN0cmluZyB8IHVuZGVmaW5lZCwgLi4uYXJnczogQXJyYXk8c3RyaW5nIHwgbnVtYmVyPikgPT4gc3RyaW5nO1xufTtcblxuY29uc3QgZGVmYXVsdERpY3Q6IEkxOG5EaWN0ID0ge307XG5cbmNvbnN0IGRlZmF1bHRWYWx1ZTogSTE4blZhbHVlID0ge1xuICBkaWN0aW9uYXJ5OiBkZWZhdWx0RGljdCxcbiAgdDogKGtleSwgZmFsbGJhY2spID0+IGZhbGxiYWNrIHx8IGtleSxcbiAgZm9ybWF0OiAoa2V5LCBmYWxsYmFjaywgLi4uYXJncykgPT4ge1xuICAgIGNvbnN0IHRlbXBsYXRlID0gZmFsbGJhY2sgfHwga2V5O1xuICAgIHJldHVybiBTdHJpbmcodGVtcGxhdGUpLnJlcGxhY2UoL1xceyhcXGQrKVxcfS9nLCAoXywgaWR4KSA9PiBTdHJpbmcoYXJnc1tOdW1iZXIoaWR4KV0gPz8gXCJcIikpO1xuICB9LFxufTtcblxuY29uc3QgSTE4bkNvbnRleHQgPSBjcmVhdGVDb250ZXh0PEkxOG5WYWx1ZT4oZGVmYXVsdFZhbHVlKTtcblxudHlwZSBQcm92aWRlclByb3BzID0ge1xuICBjaGlsZHJlbjogUmVhY3QuUmVhY3ROb2RlO1xuICBkaWN0aW9uYXJ5PzogSTE4bkRpY3Q7XG59O1xuXG5leHBvcnQgY29uc3QgSTE4blByb3ZpZGVyID0gKHsgY2hpbGRyZW4sIGRpY3Rpb25hcnkgfTogUHJvdmlkZXJQcm9wcykgPT4ge1xuICBjb25zdCBkaWN0ID0gZGljdGlvbmFyeSB8fCAoZ2xvYmFsVGhpcy5fX0lORF9JMThOX18gfHwge30pO1xuXG4gIGNvbnN0IHZhbHVlID0gdXNlTWVtbzxJMThuVmFsdWU+KCgpID0+IHtcbiAgICBjb25zdCB0ID0gKGtleTogc3RyaW5nLCBmYWxsYmFjaz86IHN0cmluZykgPT4ge1xuICAgICAgY29uc3QgdmFsdWUgPSBkaWN0W2tleV07XG4gICAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiICYmIHZhbHVlLnRyaW0oKSkgcmV0dXJuIHZhbHVlO1xuICAgICAgcmV0dXJuIGZhbGxiYWNrIHx8IGtleTtcbiAgICB9O1xuICAgIGNvbnN0IGZvcm1hdCA9IChrZXk6IHN0cmluZywgZmFsbGJhY2s6IHN0cmluZyB8IHVuZGVmaW5lZCwgLi4uYXJnczogQXJyYXk8c3RyaW5nIHwgbnVtYmVyPikgPT4ge1xuICAgICAgY29uc3QgdGVtcGxhdGUgPSB0KGtleSwgZmFsbGJhY2spO1xuICAgICAgcmV0dXJuIFN0cmluZyh0ZW1wbGF0ZSkucmVwbGFjZSgvXFx7KFxcZCspXFx9L2csIChfLCBpZHgpID0+IFN0cmluZyhhcmdzW051bWJlcihpZHgpXSA/PyBcIlwiKSk7XG4gICAgfTtcbiAgICByZXR1cm4geyBkaWN0aW9uYXJ5OiBkaWN0LCB0LCBmb3JtYXQgfTtcbiAgfSwgW2RpY3RdKTtcblxuICByZXR1cm4gPEkxOG5Db250ZXh0LlByb3ZpZGVyIHZhbHVlPXt2YWx1ZX0+e2NoaWxkcmVufTwvSTE4bkNvbnRleHQuUHJvdmlkZXI+O1xufTtcblxuZXhwb3J0IGNvbnN0IHVzZUkxOG4gPSAoKSA9PiB1c2VDb250ZXh0KEkxOG5Db250ZXh0KTtcbiIsICJpbXBvcnQgUmVhY3QsIHsgY3JlYXRlQ29udGV4dCwgdXNlQ29udGV4dCwgdXNlTWVtbyB9IGZyb20gXCJyZWFjdFwiO1xuXG5leHBvcnQgdHlwZSBBY2Nlc3NMZXZlbCA9IFwiVmlld1wiIHwgXCJFZGl0XCIgfCBcIkFkZFwiIHwgXCJGdWxsQWNjZXNzXCI7XG5cbmNvbnN0IEFDQ0VTU19SSUdIVFM6IFJlY29yZDxBY2Nlc3NMZXZlbCwgbnVtYmVyPiA9IHtcbiAgVmlldzogMSxcbiAgRWRpdDogMixcbiAgQWRkOiAzLFxuICBGdWxsQWNjZXNzOiA0LFxufTtcblxudHlwZSBBdXRoVmFsdWUgPSB7XG4gIG1vZHVsZUFjY2VzczogUmVjb3JkPHN0cmluZywgbnVtYmVyPjtcbiAgc2VsZWN0ZWRDb21wYW55OiBzdHJpbmc7XG4gIGNhbkFjY2VzczogKGNvZGU6IHN0cmluZywgbGV2ZWw/OiBBY2Nlc3NMZXZlbCkgPT4gYm9vbGVhbjtcbn07XG5cbmNvbnN0IGRlZmF1bHRWYWx1ZTogQXV0aFZhbHVlID0ge1xuICBtb2R1bGVBY2Nlc3M6IHt9LFxuICBzZWxlY3RlZENvbXBhbnk6IFwiXCIsXG4gIGNhbkFjY2VzczogKCkgPT4gZmFsc2UsXG59O1xuXG5jb25zdCBBdXRoQ29udGV4dCA9IGNyZWF0ZUNvbnRleHQ8QXV0aFZhbHVlPihkZWZhdWx0VmFsdWUpO1xuXG50eXBlIFByb3ZpZGVyUHJvcHMgPSB7XG4gIGNoaWxkcmVuOiBSZWFjdC5SZWFjdE5vZGU7XG4gIG1vZHVsZUFjY2Vzcz86IFJlY29yZDxzdHJpbmcsIG51bWJlcj47XG4gIHNlbGVjdGVkQ29tcGFueT86IHN0cmluZztcbn07XG5cbmV4cG9ydCBjb25zdCBBdXRoUHJvdmlkZXIgPSAoeyBjaGlsZHJlbiwgbW9kdWxlQWNjZXNzLCBzZWxlY3RlZENvbXBhbnkgfTogUHJvdmlkZXJQcm9wcykgPT4ge1xuICBjb25zdCBhY2Nlc3MgPSBtb2R1bGVBY2Nlc3MgfHwgKGdsb2JhbFRoaXMuX19JTkRfTU9EVUxFX0FDQ0VTU19fIHx8IHt9KTtcbiAgY29uc3QgY29tcGFueSA9IHNlbGVjdGVkQ29tcGFueSB8fCBTdHJpbmcoZ2xvYmFsVGhpcy5fX0lORF9TRUxFQ1RFRF9DT01QQU5ZX18gfHwgXCJcIik7XG5cbiAgY29uc3QgdmFsdWUgPSB1c2VNZW1vPEF1dGhWYWx1ZT4oKCkgPT4ge1xuICAgIGNvbnN0IGNhbkFjY2VzcyA9IChjb2RlOiBzdHJpbmcsIGxldmVsOiBBY2Nlc3NMZXZlbCA9IFwiVmlld1wiKSA9PiB7XG4gICAgICBjb25zdCBjdXJyZW50ID0gTnVtYmVyKGFjY2Vzcz8uW2NvZGVdID8/IDApO1xuICAgICAgcmV0dXJuIGN1cnJlbnQgPj0gQUNDRVNTX1JJR0hUU1tsZXZlbF07XG4gICAgfTtcbiAgICByZXR1cm4geyBtb2R1bGVBY2Nlc3M6IGFjY2Vzcywgc2VsZWN0ZWRDb21wYW55OiBjb21wYW55LCBjYW5BY2Nlc3MgfTtcbiAgfSwgW2FjY2VzcywgY29tcGFueV0pO1xuXG4gIHJldHVybiA8QXV0aENvbnRleHQuUHJvdmlkZXIgdmFsdWU9e3ZhbHVlfT57Y2hpbGRyZW59PC9BdXRoQ29udGV4dC5Qcm92aWRlcj47XG59O1xuXG5leHBvcnQgY29uc3QgdXNlQXV0aENvbnRleHQgPSAoKSA9PiB1c2VDb250ZXh0KEF1dGhDb250ZXh0KTtcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBJMThuUHJvdmlkZXIgfSBmcm9tIFwiLi4vLi4vY29udGV4dC9JMThuQ29udGV4dC50c3hcIjtcbmltcG9ydCB7IEF1dGhQcm92aWRlciB9IGZyb20gXCIuLi8uLi9jb250ZXh0L0F1dGhDb250ZXh0LnRzeFwiO1xuXG50eXBlIFByb3BzID0ge1xuICBjaGlsZHJlbjogUmVhY3QuUmVhY3ROb2RlO1xufTtcblxuLy8gU2hhcmVkIHByb3ZpZGVyIHdyYXBwZXIgZm9yIHZpc2l0YXMgUmVhY3QgaXNsYW5kcy5cbmNvbnN0IFZpc2l0YXNQYWdlUHJvdmlkZXJzID0gKHsgY2hpbGRyZW4gfTogUHJvcHMpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8STE4blByb3ZpZGVyPlxuICAgICAgPEF1dGhQcm92aWRlcj57Y2hpbGRyZW59PC9BdXRoUHJvdmlkZXI+XG4gICAgPC9JMThuUHJvdmlkZXI+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBWaXNpdGFzUGFnZVByb3ZpZGVycztcbiIsICJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgRmxvYXRpbmdMaXN0IGZyb20gXCIuL0Zsb2F0aW5nTGlzdC50c3hcIjtcbmltcG9ydCB7IENoZXZyb25Eb3duU3ZnLCBDaGV2cm9uVXBTdmcgfSBmcm9tIFwiLi9jaGV2cm9ucy50c3hcIjtcbmltcG9ydCB7IHVzZU91dHNpZGVDbGljayB9IGZyb20gXCIuLi8uLi9ob29rcy91c2VPdXRzaWRlQ2xpY2sudHNcIjtcbmltcG9ydCB7IGNsYXNzTmFtZXMgfSBmcm9tIFwiLi4vLi4vdXRpbHMvY2xhc3NOYW1lcy50c1wiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5cbnR5cGUgUmF3T3B0aW9uID0geyB2YWx1ZT86IHN0cmluZyB8IG51bWJlcjsgVmFsdWU/OiBzdHJpbmcgfCBudW1iZXI7IHRleHQ/OiBzdHJpbmc7IFRleHQ/OiBzdHJpbmcgfSB8IFtzdHJpbmcgfCBudW1iZXIsIHN0cmluZ107XG5cbnR5cGUgU2VsZWN0Q29tYm9ib3hQcm9wcyA9IHtcbiAgbGFiZWw6IHN0cmluZztcbiAgb3B0aW9uczogUmF3T3B0aW9uW107XG4gIHZhbHVlOiBzdHJpbmcgfCBudW1iZXI7XG4gIG9uQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgcGxhY2Vob2xkZXI/OiBzdHJpbmc7XG4gIGludmFsaWQ/OiBib29sZWFuO1xuICBkaXNhYmxlZD86IGJvb2xlYW47XG4gIHJlYWRPbmx5PzogYm9vbGVhbjtcbiAgdXNlUG9ydGFsPzogYm9vbGVhbjtcbiAgZW1pdE9uVmFsdWVDaGFuZ2U/OiBib29sZWFuO1xuICBpZEJhc2U/OiBzdHJpbmc7XG4gIHBvcnRhbENsYXNzTmFtZT86IHN0cmluZztcbiAgcGFuZWxDbGFzc05hbWU/OiBzdHJpbmc7XG4gIHNob3dTZWFyY2hCdXR0b24/OiBib29sZWFuO1xuICBhbGxvd1RleHRJbnB1dD86IGJvb2xlYW47XG4gIHNob3dMYWJlbD86IGJvb2xlYW47XG59O1xuXG4vLyBSZXVzYWJsZSBzZWxlY3QgY29tYm9ib3ggd2l0aCBvcHRpb25hbCBwb3J0YWwgcmVuZGVyaW5nIGZvciB0aGUgbGlzdC5cbmNvbnN0IFNlbGVjdENvbWJvYm94ID0gKHtcbiAgbGFiZWwsXG4gIG9wdGlvbnMsXG4gIHZhbHVlLFxuICBvbkNoYW5nZSxcbiAgcGxhY2Vob2xkZXIsXG4gIGludmFsaWQgPSBmYWxzZSxcbiAgZGlzYWJsZWQgPSBmYWxzZSxcbiAgcmVhZE9ubHkgPSBmYWxzZSxcbiAgdXNlUG9ydGFsID0gdHJ1ZSxcbiAgZW1pdE9uVmFsdWVDaGFuZ2UgPSBmYWxzZSxcbiAgaWRCYXNlLFxuICBwb3J0YWxDbGFzc05hbWUsXG4gIHBhbmVsQ2xhc3NOYW1lLFxuICBzaG93U2VhcmNoQnV0dG9uID0gZmFsc2UsXG4gIGFsbG93VGV4dElucHV0ID0gdHJ1ZSxcbiAgc2hvd0xhYmVsID0gdHJ1ZSxcbn06IFNlbGVjdENvbWJvYm94UHJvcHMpID0+IHtcbiAgY29uc3QgcmVhZE9ubHlNb2RlID0gcmVhZE9ubHkgfHwgZGlzYWJsZWQ7XG4gIGNvbnN0IHZhbHVlQ29sb3IgPSByZWFkT25seU1vZGUgPyBcIiM2NDc0OGJcIiA6IFwiIzAwMjk2YmUwXCI7XG4gIGNvbnN0IGRhdGEgPSB1c2VNZW1vKCgpID0+IHtcbiAgICByZXR1cm4gKG9wdGlvbnMgfHwgW10pLm1hcCgobykgPT4ge1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkobykpIHtcbiAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG9bMF0gPz8gXCJcIiwgdGV4dDogb1sxXSA/PyBcIlwiIH07XG4gICAgICB9XG4gICAgICByZXR1cm4geyB2YWx1ZTogbz8udmFsdWUgPz8gbz8uVmFsdWUgPz8gXCJcIiwgdGV4dDogbz8udGV4dCA/PyBvPy5UZXh0ID8/IFwiXCIgfTtcbiAgICB9KTtcbiAgfSwgW29wdGlvbnNdKTtcblxuICBjb25zdCBbcXVlcnksIHNldFF1ZXJ5XSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbc2VsZWN0ZWQsIHNldFNlbGVjdGVkXSA9IHVzZVN0YXRlKFxuICAgIGRhdGEuZmluZCgoZCkgPT4gU3RyaW5nKGQudmFsdWUpID09PSBTdHJpbmcodmFsdWUpKSB8fCB7IHZhbHVlOiBcIlwiLCB0ZXh0OiBcIlwiIH1cbiAgKTtcbiAgY29uc3QgW29wZW4sIHNldE9wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbYWN0aXZlSW5kZXgsIHNldEFjdGl2ZUluZGV4XSA9IHVzZVN0YXRlKDApO1xuICBjb25zdCBjb250YWluZXJSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgYm94UmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IGxpc3RSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcblxuICB1c2VPdXRzaWRlQ2xpY2soW2NvbnRhaW5lclJlZiwgbGlzdFJlZl0sICgpID0+IHNldE9wZW4oZmFsc2UpKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHNldFNlbGVjdGVkKGRhdGEuZmluZCgoZCkgPT4gU3RyaW5nKGQudmFsdWUpID09PSBTdHJpbmcodmFsdWUpKSB8fCB7IHZhbHVlOiBcIlwiLCB0ZXh0OiBcIlwiIH0pO1xuICB9LCBbdmFsdWUsIGRhdGFdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHNldFF1ZXJ5KFwiXCIpO1xuICB9LCBbc2VsZWN0ZWRdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghZW1pdE9uVmFsdWVDaGFuZ2UpIHJldHVybjtcbiAgICBvbkNoYW5nZShzZWxlY3RlZD8udmFsdWUgPyBTdHJpbmcoc2VsZWN0ZWQudmFsdWUpIDogXCJcIik7XG4gIH0sIFtlbWl0T25WYWx1ZUNoYW5nZSwgb25DaGFuZ2UsIHNlbGVjdGVkXSk7XG5cbiAgY29uc3QgZmlsdGVyZWQgPSB1c2VNZW1vKCgpID0+IHtcbiAgICBpZiAoIXF1ZXJ5LnRyaW0oKSkgcmV0dXJuIGRhdGE7XG4gICAgY29uc3QgZiA9IGRhdGEuZmlsdGVyKChvKSA9PiB7XG4gICAgICBjb25zdCBvcHRpb25WYWx1ZSA9IFN0cmluZyhvLnZhbHVlID8/IFwiXCIpLnRyaW0oKTtcbiAgICAgIGlmICghb3B0aW9uVmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG8udGV4dC50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHF1ZXJ5LnRvTG93ZXJDYXNlKCkpO1xuICAgIH0pO1xuICAgIHJldHVybiBmLmxlbmd0aCA/IGYgOiBkYXRhO1xuICB9LCBbZGF0YSwgcXVlcnldKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHNldEFjdGl2ZUluZGV4KDApO1xuICB9LCBbZmlsdGVyZWQubGVuZ3RoLCBxdWVyeV0pO1xuXG4gIGNvbnN0IHNlbGVjdE9wdGlvbiA9IChvcHQ6IHsgdmFsdWU6IHN0cmluZyB8IG51bWJlcjsgdGV4dDogc3RyaW5nIH0pID0+IHtcbiAgICBzZXRTZWxlY3RlZChvcHQpO1xuICAgIHNldFF1ZXJ5KFwiXCIpO1xuICAgIHNldE9wZW4oZmFsc2UpO1xuICAgIGlmICghZW1pdE9uVmFsdWVDaGFuZ2UpIHtcbiAgICAgIG9uQ2hhbmdlKG9wdD8udmFsdWUgPyBTdHJpbmcob3B0LnZhbHVlKSA6IFwiXCIpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVLZXlEb3duID0gKGV2OiBSZWFjdC5LZXlib2FyZEV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+KSA9PiB7XG4gICAgaWYgKGRpc2FibGVkKSByZXR1cm47XG4gICAgaWYgKGV2LmtleSA9PT0gXCJBcnJvd0Rvd25cIikge1xuICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHNldE9wZW4odHJ1ZSk7XG4gICAgICBpZiAoZmlsdGVyZWQubGVuZ3RoKSBzZXRBY3RpdmVJbmRleCgoaWR4KSA9PiAoaWR4ICsgMSkgJSBmaWx0ZXJlZC5sZW5ndGgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoZXYua2V5ID09PSBcIkFycm93VXBcIikge1xuICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHNldE9wZW4odHJ1ZSk7XG4gICAgICBpZiAoZmlsdGVyZWQubGVuZ3RoKSBzZXRBY3RpdmVJbmRleCgoaWR4KSA9PiAoaWR4IC0gMSArIGZpbHRlcmVkLmxlbmd0aCkgJSBmaWx0ZXJlZC5sZW5ndGgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoZXYua2V5ID09PSBcIkVudGVyXCIpIHtcbiAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBpZiAob3BlbiAmJiBmaWx0ZXJlZC5sZW5ndGgpIHtcbiAgICAgICAgc2VsZWN0T3B0aW9uKGZpbHRlcmVkW2FjdGl2ZUluZGV4XSA/PyBmaWx0ZXJlZFswXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZXRPcGVuKHRydWUpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZXYua2V5ID09PSBcIkVzY2FwZVwiKSBzZXRPcGVuKGZhbHNlKTtcbiAgfTtcblxuICBjb25zdCBzYWZlSWQgPSBTdHJpbmcoaWRCYXNlIHx8IGxhYmVsIHx8IFwic2VsZWN0XCIpO1xuICBjb25zdCBsaXN0SWQgPSBgc2VsZWN0LW9wdGlvbnMtJHtzYWZlSWR9YDtcbiAgY29uc3QgYWN0aXZlSWQgPSBvcGVuICYmIGZpbHRlcmVkW2FjdGl2ZUluZGV4XSA/IGBzZWxlY3Qtb3B0LSR7c2FmZUlkfS0ke2ZpbHRlcmVkW2FjdGl2ZUluZGV4XS52YWx1ZX1gIDogdW5kZWZpbmVkO1xuICBjb25zdCBsaXN0T3BlbiA9IG9wZW4gJiYgIWRpc2FibGVkO1xuICBjb25zdCBzZWxlY3RlZFZhbHVlID0gU3RyaW5nKHNlbGVjdGVkPy52YWx1ZSA/PyBcIlwiKS50cmltKCk7XG4gIGNvbnN0IGRpc3BsYXlWYWx1ZSA9IHF1ZXJ5IHx8IChzZWxlY3RlZFZhbHVlID8gc2VsZWN0ZWQ/LnRleHQgfHwgXCJcIiA6IFwiXCIpO1xuXG4gIGNvbnN0IGxpc3RCb2R5ID0gKFxuICAgIDxkaXYgaWQ9e2xpc3RJZH0gcmVmPXtsaXN0UmVmfSByb2xlPVwibGlzdGJveFwiIGFyaWEtbGFiZWw9e2xhYmVsfT5cbiAgICAgIHtmaWx0ZXJlZC5sZW5ndGggPT09IDAgJiYgPGRpdiBjbGFzc05hbWU9XCJweC00IHB5LTIgdGV4dC1zbSB0ZXh0LXNsYXRlLTUwMFwiPntpbmRUKFwiRHJvcGRvd25fTm9SZXN1bHRzXCIsIFwiTm8gcmVzdWx0c1wiKX08L2Rpdj59XG4gICAgICB7ZmlsdGVyZWQubWFwKChvcHQsIGlkeCkgPT4ge1xuICAgICAgICBjb25zdCBzZWwgPSBzZWxlY3RlZD8udmFsdWUgPT09IG9wdC52YWx1ZTtcbiAgICAgICAgY29uc3QgaXNBY3RpdmUgPSBpZHggPT09IGFjdGl2ZUluZGV4O1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAga2V5PXtTdHJpbmcob3B0LnZhbHVlKX1cbiAgICAgICAgICAgIGlkPXtgc2VsZWN0LW9wdC0ke3NhZmVJZH0tJHtvcHQudmFsdWV9YH1cbiAgICAgICAgICAgIHJvbGU9XCJvcHRpb25cIlxuICAgICAgICAgICAgYXJpYS1zZWxlY3RlZD17c2VsfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAgICAgICBcInJlbGF0aXZlIGZsZXggdy1mdWxsIGN1cnNvci1kZWZhdWx0IHNlbGVjdC1ub25lIGl0ZW1zLWNlbnRlciBweS0yIHByLTMgdGV4dC1sZWZ0IHRleHQtc20gdHlwZS1vcHRpb25cIixcbiAgICAgICAgICAgICAgaXNBY3RpdmUgPyBcImJnLXByaW1hcnkgdGV4dC13aGl0ZVwiIDogXCJ0ZXh0LXNsYXRlLTkwMFwiXG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgb25Nb3VzZUVudGVyPXsoKSA9PiBzZXRBY3RpdmVJbmRleChpZHgpfVxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2VsZWN0T3B0aW9uKG9wdCl9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge3NlbCAmJiAoXG4gICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAgICAgICAgICAgXCJhYnNvbHV0ZSBpbnNldC15LTAgbGVmdC0wIGZsZXggaXRlbXMtY2VudGVyIHBsLTJcIixcbiAgICAgICAgICAgICAgICAgIGlzQWN0aXZlID8gXCJ0ZXh0LXdoaXRlXCIgOiBcInRleHQtcHJpbWFyeVwiXG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPjwvc3Bhbj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXCJibG9jayB0cnVuY2F0ZVwiLCBzZWwgPyBcImZvbnQtbWVkaXVtXCIgOiBcImZvbnQtbm9ybWFsXCIpfT57b3B0LnRleHR9PC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICApO1xuICAgICAgfSl9XG4gICAgPC9kaXY+XG4gICk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXCJzcGFjZS15LTJcIiwgZGlzYWJsZWQgPyBcInBvaW50ZXItZXZlbnRzLW5vbmUgc2VsZWN0LW5vbmVcIiA6IFwiXCIpfVxuICAgICAgcmVmPXtjb250YWluZXJSZWZ9XG4gICAgPlxuICAgICAge3Nob3dMYWJlbCA/IDxsYWJlbCBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXCJmb3JtLWxhYmVsIGZvbnQtc2VtaWJvbGRcIiwgaW52YWxpZCA/IFwidGV4dC1yb3NlLTcwMFwiIDogXCJcIil9PntsYWJlbH08L2xhYmVsPiA6IG51bGx9XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlXCI+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICByZWY9e2JveFJlZn1cbiAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICBcInJlbGF0aXZlIHctZnVsbCBjdXJzb3ItZGVmYXVsdCByb3VuZGVkLXhsIGJnLXdoaXRlIHRleHQtbGVmdCBmb2N1cy13aXRoaW46Ym9yZGVyLXByaW1hcnkgZm9jdXMtd2l0aGluOnJpbmctMiBmb2N1cy13aXRoaW46cmluZy1wcmltYXJ5IGZvY3VzLXdpdGhpbjpyaW5nLW9mZnNldC13aGl0ZSBzbTp0ZXh0LXNtXCIsXG4gICAgICAgICAgICByZWFkT25seU1vZGUgPyBcImluZC1yZWFkb25seS1maWVsZFwiIDogXCJcIlxuICAgICAgICAgICl9XG4gICAgICAgICAgc3R5bGU9e3JlYWRPbmx5TW9kZSA/IHsgY29sb3I6IHZhbHVlQ29sb3IgfSA6IHVuZGVmaW5lZH1cbiAgICAgICAgPlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAgICAgICBcInctZnVsbCByb3VuZGVkLXhsIGJvcmRlciBweC0zIHB5LTIgdGV4dC1zbSBzbTp0ZXh0LWJhc2UgbGVhZGluZy01IGZvY3VzOm91dGxpbmUtaGlkZGVuIGZvY3VzOnJpbmctMiBkaXNhYmxlZDpiZy1zbGF0ZS0xMDAgZGlzYWJsZWQ6dGV4dC1zbGF0ZS01MDAgZGlzYWJsZWQ6Ym9yZGVyLXNsYXRlLTIwMCBkaXNhYmxlZDpjdXJzb3Itbm90LWFsbG93ZWRcIixcbiAgICAgICAgICAgICAgc2hvd1NlYXJjaEJ1dHRvbiA/IFwicHItMjBcIiA6IFwicHItMTBcIixcbiAgICAgICAgICAgICAgaW52YWxpZFxuICAgICAgICAgICAgICAgID8gXCJib3JkZXItcm9zZS00MDAgYmctcm9zZS01MCBmb2N1czpyaW5nLXJvc2UtMjAwIGZvY3VzOmJvcmRlci1yb3NlLTQwMFwiXG4gICAgICAgICAgICAgICAgOiBcImJvcmRlci1zbGF0ZS0yMDAgZm9jdXM6cmluZy1wcmltYXJ5IGZvY3VzOmJvcmRlci1wcmltYXJ5XCIsXG4gICAgICAgICAgICAgIHJlYWRPbmx5TW9kZSA/IFwiaW5kLXJlYWRvbmx5LWZpZWxkXCIgOiBcInRleHQtc2xhdGUtOTAwXCJcbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICBzdHlsZT17cmVhZE9ubHlNb2RlID8geyBjb2xvcjogdmFsdWVDb2xvciB9IDogdW5kZWZpbmVkfVxuICAgICAgICAgICAgdmFsdWU9e2Rpc3BsYXlWYWx1ZX1cbiAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgaWYgKCFhbGxvd1RleHRJbnB1dCkgcmV0dXJuO1xuICAgICAgICAgICAgICBjb25zdCB2YWwgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgICAgICAgICAgIHNldFF1ZXJ5KHZhbCk7XG4gICAgICAgICAgICAgIHNldE9wZW4odHJ1ZSk7XG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgb25LZXlEb3duPXtoYW5kbGVLZXlEb3dufVxuICAgICAgICAgICAgb25Gb2N1cz17KCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoIWRpc2FibGVkKSBzZXRPcGVuKHRydWUpO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cbiAgICAgICAgICAgIHJlYWRPbmx5PXtyZWFkT25seU1vZGUgfHwgIWFsbG93VGV4dElucHV0fVxuICAgICAgICAgICAgYXJpYS1sYWJlbD17bGFiZWx9XG4gICAgICAgICAgICByb2xlPVwiY29tYm9ib3hcIlxuICAgICAgICAgICAgYXJpYS1leHBhbmRlZD17bGlzdE9wZW59XG4gICAgICAgICAgICBhcmlhLWNvbnRyb2xzPXtsaXN0SWR9XG4gICAgICAgICAgICBhcmlhLWFjdGl2ZWRlc2NlbmRhbnQ9e2FjdGl2ZUlkfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC15LTAgcmlnaHQtMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSBwci0yXCI+XG4gICAgICAgICAgICB7c2hvd1NlYXJjaEJ1dHRvbiA/IChcbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHAtMS41IHRleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtc2xhdGUtNTAwXCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICBpZiAoZGlzYWJsZWQpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgIHNldE9wZW4odHJ1ZSk7XG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtpbmRUKFwiQ29tbW9uX1NlYXJjaFwiLCBcIlNlYXJjaFwiKX1cbiAgICAgICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBmaWxsPVwibm9uZVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBzdHJva2VXaWR0aD17MS41fSBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBjbGFzc05hbWU9XCJoLTUgdy01XCI+XG4gICAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIm0xNS43NSAxNS43NS0yLjQ4OS0yLjQ4OW0wIDBhMy4zNzUgMy4zNzUgMCAxIDAtNC43NzMtNC43NzMgMy4zNzUgMy4zNzUgMCAwIDAgNC43NzQgNC43NzRaTTIxIDEyYTkgOSAwIDEgMS0xOCAwIDkgOSAwIDAgMSAxOCAwWlwiIC8+XG4gICAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBwLTEuNSB0ZXh0LXNsYXRlLTUwMCBob3Zlcjp0ZXh0LXNsYXRlLTYwMFwiXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZGlzYWJsZWQpIHJldHVybjtcbiAgICAgICAgICAgICAgICBzZXRPcGVuKChwcmV2KSA9PiAhcHJldik7XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgIGFyaWEtbGFiZWw9e29wZW4gPyBpbmRUKFwiRHJvcGRvd25fSGlkZU9wdGlvbnNcIiwgXCJIaWRlIG9wdGlvbnNcIikgOiBpbmRUKFwiRHJvcGRvd25fU2hvd09wdGlvbnNcIiwgXCJTaG93IG9wdGlvbnNcIil9XG4gICAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge29wZW4gPyA8Q2hldnJvblVwU3ZnIGNsYXNzTmFtZT1cImgtNSB3LTVcIiAvPiA6IDxDaGV2cm9uRG93blN2ZyBjbGFzc05hbWU9XCJoLTUgdy01XCIgLz59XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHt1c2VQb3J0YWwgPyAoXG4gICAgICAgICAgPEZsb2F0aW5nTGlzdFxuICAgICAgICAgICAgYW5jaG9yUmVmPXtib3hSZWZ9XG4gICAgICAgICAgICBvcGVuPXtsaXN0T3Blbn1cbiAgICAgICAgICAgIHpJbmRleD17MzYwMDAwfVxuICAgICAgICAgICAgbWF4SGVpZ2h0Q2xhc3M9XCJtYXgtaC03MlwiXG4gICAgICAgICAgICByb2xlPVwibGlzdGJveFwiXG4gICAgICAgICAgICByb3VuZGVkQ2xhc3M9XCJyb3VuZGVkLXhsXCJcbiAgICAgICAgICAgIHBvcnRhbENsYXNzTmFtZT17cG9ydGFsQ2xhc3NOYW1lfVxuICAgICAgICAgICAgcGFuZWxDbGFzc05hbWU9e3BhbmVsQ2xhc3NOYW1lfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtsaXN0Qm9keX1cbiAgICAgICAgICA8L0Zsb2F0aW5nTGlzdD5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICBsaXN0T3BlbiAmJiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIHotMzYwMDAwIG10LTEgdy1mdWxsIHJvdW5kZWQteGwgYmctd2hpdGUgc2hhZG93LWxnIHJpbmctMSByaW5nLWJsYWNrLzUgZm9jdXM6b3V0bGluZS1oaWRkZW4gbWF4LWgtNzIgb3ZlcmZsb3ctYXV0b1wiPlxuICAgICAgICAgICAgICB7bGlzdEJvZHl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApXG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNlbGVjdENvbWJvYm94O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtQkFBMEQ7QUE0Q2pEO0FBbENULElBQU0sY0FBd0IsQ0FBQztBQUUvQixJQUFNLGVBQTBCO0FBQUEsRUFDOUIsWUFBWTtBQUFB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QUFBQSxzQkFDQSxjQUFZLE9BQU8sS0FBSyx3QkFBd0IsY0FBYyxJQUFJLEtBQUssd0JBQXdCLGNBQWM7QUFBQSxzQkFDN0c7QUFBQSxzQkFFQyxpQkFBTyw2Q0FBQyxnQkFBYSxXQUFVLFdBQVUsSUFBSyw2Q0FBQyxrQkFBZSxXQUFVLFdBQVU7QUFBQTtBQUFBLGtCQUNyRjtBQUFBLG1CQUNGO0FBQUE7QUFBQTtBQUFBLFVBQ0Y7QUFBQSxVQUNDLFlBQ0M7QUFBQSxZQUFDO0FBQUE7QUFBQSxjQUNDLFdBQVc7QUFBQSxjQUNYLE1BQU07QUFBQSxjQUNOLFFBQVE7QUFBQSxjQUNSLGdCQUFlO0FBQUEsY0FDZixNQUFLO0FBQUEsY0FDTCxjQUFhO0FBQUEsY0FDYjtBQUFBLGNBQ0E7QUFBQSxjQUVDO0FBQUE7QUFBQSxVQUNILElBRUEsWUFDRSw2Q0FBQyxTQUFJLFdBQVUsK0hBQ1osb0JBQ0g7QUFBQSxXQUdOO0FBQUE7QUFBQTtBQUFBLEVBQ0Y7QUFFSjtBQUVBLElBQU8seUJBQVE7IiwKICAibmFtZXMiOiBbInZhbHVlIiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiZGVmYXVsdFZhbHVlIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIl0KfQo=
