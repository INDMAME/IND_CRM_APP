import {
  ChevronDownSvg,
  ChevronUpSvg,
  FloatingList_default,
  useOutsideClick
} from "./chunk-YSYVIEZS.js";
import {
  classNames
} from "./chunk-LKHWXI2V.js";
import {
  indT
} from "./chunk-V2CDSLX2.js";
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
  showLabel = true
}) => {
  const readOnlyMode = readOnly || disabled;
  const valueColor = readOnlyMode ? "#64748b" : "#00296be0";
  const data = (0, import_react.useMemo)(() => {
    return (options || []).map((o) => {
      if (Array.isArray(o)) {
        return { value: o[0] ?? "", text: o[1] ?? "" };
      }
      return { value: o?.value ?? o?.Value ?? "", text: o?.text ?? o?.Text ?? "" };
    });
  }, [options]);
  const [query, setQuery] = (0, import_react.useState)("");
  const [selected, setSelected] = (0, import_react.useState)(
    data.find((d) => String(d.value) === String(value)) || data[0] || { value: "", text: "" }
  );
  const [open, setOpen] = (0, import_react.useState)(false);
  const [activeIndex, setActiveIndex] = (0, import_react.useState)(0);
  const containerRef = (0, import_react.useRef)(null);
  const boxRef = (0, import_react.useRef)(null);
  const listRef = (0, import_react.useRef)(null);
  useOutsideClick([containerRef, listRef], () => setOpen(false));
  (0, import_react.useEffect)(() => {
    setSelected(data.find((d) => String(d.value) === String(value)) || data[0] || { value: "", text: "" });
  }, [value, data]);
  (0, import_react.useEffect)(() => {
    setQuery("");
  }, [selected]);
  (0, import_react.useEffect)(() => {
    if (!emitOnValueChange) return;
    onChange(selected?.value ? String(selected.value) : "");
  }, [emitOnValueChange, onChange, selected]);
  const filtered = (0, import_react.useMemo)(() => {
    if (!query.trim()) return data;
    const f = data.filter((o) => o.text.toLowerCase().includes(query.toLowerCase()));
    return f.length ? f : data;
  }, [data, query]);
  (0, import_react.useEffect)(() => {
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
  const listBody = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { id: listId, ref: listRef, role: "listbox", "aria-label": label, children: [
    filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "px-4 py-2 text-sm text-slate-500", children: indT("Dropdown_NoResults", "No results") }),
    filtered.map((opt, idx) => {
      const sel = selected?.value === opt.value;
      const isActive = idx === activeIndex;
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
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
            sel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "span",
              {
                className: classNames(
                  "absolute inset-y-0 left-0 flex items-center pl-2",
                  isActive ? "text-white" : "text-primary"
                )
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: classNames("block truncate", sel ? "font-medium" : "font-normal"), children: opt.text })
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
                      "w-full rounded-xl border px-3 py-2 text-sm sm:text-base leading-5 focus:outline-hidden focus:ring-2 disabled:bg-slate-100 disabled:text-slate-500 disabled:border-slate-200 disabled:cursor-not-allowed",
                      showSearchButton ? "pr-20" : "pr-10",
                      invalid ? "border-rose-400 bg-rose-50 focus:ring-rose-200 focus:border-rose-400" : "border-slate-200 focus:ring-primary focus:border-primary",
                      readOnlyMode ? "ind-readonly-field" : "text-slate-900"
                    ),
                    style: readOnlyMode ? { color: valueColor } : void 0,
                    value: query || selected?.text || "",
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
              maxHeightClass: "max-h-72",
              role: "listbox",
              roundedClass: "rounded-xl",
              portalClassName,
              panelClassName,
              children: listBody
            }
          ) : listOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute z-360000 mt-1 w-full rounded-xl bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden max-h-72 overflow-auto", children: listBody })
        ] })
      ]
    }
  );
};
var SelectCombobox_default = SelectCombobox;

export {
  SelectCombobox_default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9TZWxlY3RDb21ib2JveC50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBGbG9hdGluZ0xpc3QgZnJvbSBcIi4vRmxvYXRpbmdMaXN0LnRzeFwiO1xuaW1wb3J0IHsgQ2hldnJvbkRvd25TdmcsIENoZXZyb25VcFN2ZyB9IGZyb20gXCIuL2NoZXZyb25zLnRzeFwiO1xuaW1wb3J0IHsgdXNlT3V0c2lkZUNsaWNrIH0gZnJvbSBcIi4uLy4uL2hvb2tzL3VzZU91dHNpZGVDbGljay50c1wiO1xuaW1wb3J0IHsgY2xhc3NOYW1lcyB9IGZyb20gXCIuLi8uLi91dGlscy9jbGFzc05hbWVzLnRzXCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcblxudHlwZSBSYXdPcHRpb24gPSB7IHZhbHVlPzogc3RyaW5nIHwgbnVtYmVyOyBWYWx1ZT86IHN0cmluZyB8IG51bWJlcjsgdGV4dD86IHN0cmluZzsgVGV4dD86IHN0cmluZyB9IHwgW3N0cmluZyB8IG51bWJlciwgc3RyaW5nXTtcblxudHlwZSBTZWxlY3RDb21ib2JveFByb3BzID0ge1xuICBsYWJlbDogc3RyaW5nO1xuICBvcHRpb25zOiBSYXdPcHRpb25bXTtcbiAgdmFsdWU6IHN0cmluZyB8IG51bWJlcjtcbiAgb25DaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBwbGFjZWhvbGRlcj86IHN0cmluZztcbiAgaW52YWxpZD86IGJvb2xlYW47XG4gIGRpc2FibGVkPzogYm9vbGVhbjtcbiAgcmVhZE9ubHk/OiBib29sZWFuO1xuICB1c2VQb3J0YWw/OiBib29sZWFuO1xuICBlbWl0T25WYWx1ZUNoYW5nZT86IGJvb2xlYW47XG4gIGlkQmFzZT86IHN0cmluZztcbiAgcG9ydGFsQ2xhc3NOYW1lPzogc3RyaW5nO1xuICBwYW5lbENsYXNzTmFtZT86IHN0cmluZztcbiAgc2hvd1NlYXJjaEJ1dHRvbj86IGJvb2xlYW47XG4gIGFsbG93VGV4dElucHV0PzogYm9vbGVhbjtcbiAgc2hvd0xhYmVsPzogYm9vbGVhbjtcbn07XG5cbi8vIFJldXNhYmxlIHNlbGVjdCBjb21ib2JveCB3aXRoIG9wdGlvbmFsIHBvcnRhbCByZW5kZXJpbmcgZm9yIHRoZSBsaXN0LlxuY29uc3QgU2VsZWN0Q29tYm9ib3ggPSAoe1xuICBsYWJlbCxcbiAgb3B0aW9ucyxcbiAgdmFsdWUsXG4gIG9uQ2hhbmdlLFxuICBwbGFjZWhvbGRlcixcbiAgaW52YWxpZCA9IGZhbHNlLFxuICBkaXNhYmxlZCA9IGZhbHNlLFxuICByZWFkT25seSA9IGZhbHNlLFxuICB1c2VQb3J0YWwgPSB0cnVlLFxuICBlbWl0T25WYWx1ZUNoYW5nZSA9IGZhbHNlLFxuICBpZEJhc2UsXG4gIHBvcnRhbENsYXNzTmFtZSxcbiAgcGFuZWxDbGFzc05hbWUsXG4gIHNob3dTZWFyY2hCdXR0b24gPSBmYWxzZSxcbiAgYWxsb3dUZXh0SW5wdXQgPSB0cnVlLFxuICBzaG93TGFiZWwgPSB0cnVlLFxufTogU2VsZWN0Q29tYm9ib3hQcm9wcykgPT4ge1xuICBjb25zdCByZWFkT25seU1vZGUgPSByZWFkT25seSB8fCBkaXNhYmxlZDtcbiAgY29uc3QgdmFsdWVDb2xvciA9IHJlYWRPbmx5TW9kZSA/IFwiIzY0NzQ4YlwiIDogXCIjMDAyOTZiZTBcIjtcbiAgY29uc3QgZGF0YSA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIHJldHVybiAob3B0aW9ucyB8fCBbXSkubWFwKChvKSA9PiB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShvKSkge1xuICAgICAgICByZXR1cm4geyB2YWx1ZTogb1swXSA/PyBcIlwiLCB0ZXh0OiBvWzFdID8/IFwiXCIgfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7IHZhbHVlOiBvPy52YWx1ZSA/PyBvPy5WYWx1ZSA/PyBcIlwiLCB0ZXh0OiBvPy50ZXh0ID8/IG8/LlRleHQgPz8gXCJcIiB9O1xuICAgIH0pO1xuICB9LCBbb3B0aW9uc10pO1xuXG4gIGNvbnN0IFtxdWVyeSwgc2V0UXVlcnldID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtzZWxlY3RlZCwgc2V0U2VsZWN0ZWRdID0gdXNlU3RhdGUoXG4gICAgZGF0YS5maW5kKChkKSA9PiBTdHJpbmcoZC52YWx1ZSkgPT09IFN0cmluZyh2YWx1ZSkpIHx8IGRhdGFbMF0gfHwgeyB2YWx1ZTogXCJcIiwgdGV4dDogXCJcIiB9XG4gICk7XG4gIGNvbnN0IFtvcGVuLCBzZXRPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2FjdGl2ZUluZGV4LCBzZXRBY3RpdmVJbmRleF0gPSB1c2VTdGF0ZSgwKTtcbiAgY29uc3QgY29udGFpbmVyUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IGJveFJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBsaXN0UmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XG5cbiAgdXNlT3V0c2lkZUNsaWNrKFtjb250YWluZXJSZWYsIGxpc3RSZWZdLCAoKSA9PiBzZXRPcGVuKGZhbHNlKSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBzZXRTZWxlY3RlZChkYXRhLmZpbmQoKGQpID0+IFN0cmluZyhkLnZhbHVlKSA9PT0gU3RyaW5nKHZhbHVlKSkgfHwgZGF0YVswXSB8fCB7IHZhbHVlOiBcIlwiLCB0ZXh0OiBcIlwiIH0pO1xuICB9LCBbdmFsdWUsIGRhdGFdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHNldFF1ZXJ5KFwiXCIpO1xuICB9LCBbc2VsZWN0ZWRdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghZW1pdE9uVmFsdWVDaGFuZ2UpIHJldHVybjtcbiAgICBvbkNoYW5nZShzZWxlY3RlZD8udmFsdWUgPyBTdHJpbmcoc2VsZWN0ZWQudmFsdWUpIDogXCJcIik7XG4gIH0sIFtlbWl0T25WYWx1ZUNoYW5nZSwgb25DaGFuZ2UsIHNlbGVjdGVkXSk7XG5cbiAgY29uc3QgZmlsdGVyZWQgPSB1c2VNZW1vKCgpID0+IHtcbiAgICBpZiAoIXF1ZXJ5LnRyaW0oKSkgcmV0dXJuIGRhdGE7XG4gICAgY29uc3QgZiA9IGRhdGEuZmlsdGVyKChvKSA9PiBvLnRleHQudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhxdWVyeS50b0xvd2VyQ2FzZSgpKSk7XG4gICAgcmV0dXJuIGYubGVuZ3RoID8gZiA6IGRhdGE7XG4gIH0sIFtkYXRhLCBxdWVyeV0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc2V0QWN0aXZlSW5kZXgoMCk7XG4gIH0sIFtmaWx0ZXJlZC5sZW5ndGgsIHF1ZXJ5XSk7XG5cbiAgY29uc3Qgc2VsZWN0T3B0aW9uID0gKG9wdDogeyB2YWx1ZTogc3RyaW5nIHwgbnVtYmVyOyB0ZXh0OiBzdHJpbmcgfSkgPT4ge1xuICAgIHNldFNlbGVjdGVkKG9wdCk7XG4gICAgc2V0UXVlcnkoXCJcIik7XG4gICAgc2V0T3BlbihmYWxzZSk7XG4gICAgaWYgKCFlbWl0T25WYWx1ZUNoYW5nZSkge1xuICAgICAgb25DaGFuZ2Uob3B0Py52YWx1ZSA/IFN0cmluZyhvcHQudmFsdWUpIDogXCJcIik7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUtleURvd24gPSAoZXY6IFJlYWN0LktleWJvYXJkRXZlbnQ8SFRNTElucHV0RWxlbWVudD4pID0+IHtcbiAgICBpZiAoZGlzYWJsZWQpIHJldHVybjtcbiAgICBpZiAoZXYua2V5ID09PSBcIkFycm93RG93blwiKSB7XG4gICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgc2V0T3Blbih0cnVlKTtcbiAgICAgIGlmIChmaWx0ZXJlZC5sZW5ndGgpIHNldEFjdGl2ZUluZGV4KChpZHgpID0+IChpZHggKyAxKSAlIGZpbHRlcmVkLmxlbmd0aCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChldi5rZXkgPT09IFwiQXJyb3dVcFwiKSB7XG4gICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgc2V0T3Blbih0cnVlKTtcbiAgICAgIGlmIChmaWx0ZXJlZC5sZW5ndGgpIHNldEFjdGl2ZUluZGV4KChpZHgpID0+IChpZHggLSAxICsgZmlsdGVyZWQubGVuZ3RoKSAlIGZpbHRlcmVkLmxlbmd0aCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChldi5rZXkgPT09IFwiRW50ZXJcIikge1xuICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGlmIChvcGVuICYmIGZpbHRlcmVkLmxlbmd0aCkge1xuICAgICAgICBzZWxlY3RPcHRpb24oZmlsdGVyZWRbYWN0aXZlSW5kZXhdID8/IGZpbHRlcmVkWzBdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNldE9wZW4odHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChldi5rZXkgPT09IFwiRXNjYXBlXCIpIHNldE9wZW4oZmFsc2UpO1xuICB9O1xuXG4gIGNvbnN0IHNhZmVJZCA9IFN0cmluZyhpZEJhc2UgfHwgbGFiZWwgfHwgXCJzZWxlY3RcIik7XG4gIGNvbnN0IGxpc3RJZCA9IGBzZWxlY3Qtb3B0aW9ucy0ke3NhZmVJZH1gO1xuICBjb25zdCBhY3RpdmVJZCA9IG9wZW4gJiYgZmlsdGVyZWRbYWN0aXZlSW5kZXhdID8gYHNlbGVjdC1vcHQtJHtzYWZlSWR9LSR7ZmlsdGVyZWRbYWN0aXZlSW5kZXhdLnZhbHVlfWAgOiB1bmRlZmluZWQ7XG4gIGNvbnN0IGxpc3RPcGVuID0gb3BlbiAmJiAhZGlzYWJsZWQ7XG5cbiAgY29uc3QgbGlzdEJvZHkgPSAoXG4gICAgPGRpdiBpZD17bGlzdElkfSByZWY9e2xpc3RSZWZ9IHJvbGU9XCJsaXN0Ym94XCIgYXJpYS1sYWJlbD17bGFiZWx9PlxuICAgICAge2ZpbHRlcmVkLmxlbmd0aCA9PT0gMCAmJiA8ZGl2IGNsYXNzTmFtZT1cInB4LTQgcHktMiB0ZXh0LXNtIHRleHQtc2xhdGUtNTAwXCI+e2luZFQoXCJEcm9wZG93bl9Ob1Jlc3VsdHNcIiwgXCJObyByZXN1bHRzXCIpfTwvZGl2Pn1cbiAgICAgIHtmaWx0ZXJlZC5tYXAoKG9wdCwgaWR4KSA9PiB7XG4gICAgICAgIGNvbnN0IHNlbCA9IHNlbGVjdGVkPy52YWx1ZSA9PT0gb3B0LnZhbHVlO1xuICAgICAgICBjb25zdCBpc0FjdGl2ZSA9IGlkeCA9PT0gYWN0aXZlSW5kZXg7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICBrZXk9e1N0cmluZyhvcHQudmFsdWUpfVxuICAgICAgICAgICAgaWQ9e2BzZWxlY3Qtb3B0LSR7c2FmZUlkfS0ke29wdC52YWx1ZX1gfVxuICAgICAgICAgICAgcm9sZT1cIm9wdGlvblwiXG4gICAgICAgICAgICBhcmlhLXNlbGVjdGVkPXtzZWx9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICAgIFwicmVsYXRpdmUgZmxleCB3LWZ1bGwgY3Vyc29yLWRlZmF1bHQgc2VsZWN0LW5vbmUgaXRlbXMtY2VudGVyIHB5LTIgcHItMyB0ZXh0LWxlZnQgdGV4dC1zbSB0eXBlLW9wdGlvblwiLFxuICAgICAgICAgICAgICBpc0FjdGl2ZSA/IFwiYmctcHJpbWFyeSB0ZXh0LXdoaXRlXCIgOiBcInRleHQtc2xhdGUtOTAwXCJcbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICBvbk1vdXNlRW50ZXI9eygpID0+IHNldEFjdGl2ZUluZGV4KGlkeCl9XG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZWxlY3RPcHRpb24ob3B0KX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7c2VsICYmIChcbiAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICAgICAgICBcImFic29sdXRlIGluc2V0LXktMCBsZWZ0LTAgZmxleCBpdGVtcy1jZW50ZXIgcGwtMlwiLFxuICAgICAgICAgICAgICAgICAgaXNBY3RpdmUgPyBcInRleHQtd2hpdGVcIiA6IFwidGV4dC1wcmltYXJ5XCJcbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA+PC9zcGFuPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcImJsb2NrIHRydW5jYXRlXCIsIHNlbCA/IFwiZm9udC1tZWRpdW1cIiA6IFwiZm9udC1ub3JtYWxcIil9PntvcHQudGV4dH08L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICk7XG4gICAgICB9KX1cbiAgICA8L2Rpdj5cbiAgKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcInNwYWNlLXktMlwiLCBkaXNhYmxlZCA/IFwicG9pbnRlci1ldmVudHMtbm9uZSBzZWxlY3Qtbm9uZVwiIDogXCJcIil9XG4gICAgICByZWY9e2NvbnRhaW5lclJlZn1cbiAgICA+XG4gICAgICB7c2hvd0xhYmVsID8gPGxhYmVsIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZFwiLCBpbnZhbGlkID8gXCJ0ZXh0LXJvc2UtNzAwXCIgOiBcIlwiKX0+e2xhYmVsfTwvbGFiZWw+IDogbnVsbH1cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmVcIj5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIHJlZj17Ym94UmVmfVxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgICAgIFwicmVsYXRpdmUgdy1mdWxsIGN1cnNvci1kZWZhdWx0IHJvdW5kZWQteGwgYmctd2hpdGUgdGV4dC1sZWZ0IGZvY3VzLXdpdGhpbjpib3JkZXItcHJpbWFyeSBmb2N1cy13aXRoaW46cmluZy0yIGZvY3VzLXdpdGhpbjpyaW5nLXByaW1hcnkgZm9jdXMtd2l0aGluOnJpbmctb2Zmc2V0LXdoaXRlIHNtOnRleHQtc21cIixcbiAgICAgICAgICAgIHJlYWRPbmx5TW9kZSA/IFwiaW5kLXJlYWRvbmx5LWZpZWxkXCIgOiBcIlwiXG4gICAgICAgICAgKX1cbiAgICAgICAgICBzdHlsZT17cmVhZE9ubHlNb2RlID8geyBjb2xvcjogdmFsdWVDb2xvciB9IDogdW5kZWZpbmVkfVxuICAgICAgICA+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICAgIFwidy1mdWxsIHJvdW5kZWQteGwgYm9yZGVyIHB4LTMgcHktMiB0ZXh0LXNtIHNtOnRleHQtYmFzZSBsZWFkaW5nLTUgZm9jdXM6b3V0bGluZS1oaWRkZW4gZm9jdXM6cmluZy0yIGRpc2FibGVkOmJnLXNsYXRlLTEwMCBkaXNhYmxlZDp0ZXh0LXNsYXRlLTUwMCBkaXNhYmxlZDpib3JkZXItc2xhdGUtMjAwIGRpc2FibGVkOmN1cnNvci1ub3QtYWxsb3dlZFwiLFxuICAgICAgICAgICAgICBzaG93U2VhcmNoQnV0dG9uID8gXCJwci0yMFwiIDogXCJwci0xMFwiLFxuICAgICAgICAgICAgICBpbnZhbGlkXG4gICAgICAgICAgICAgICAgPyBcImJvcmRlci1yb3NlLTQwMCBiZy1yb3NlLTUwIGZvY3VzOnJpbmctcm9zZS0yMDAgZm9jdXM6Ym9yZGVyLXJvc2UtNDAwXCJcbiAgICAgICAgICAgICAgICA6IFwiYm9yZGVyLXNsYXRlLTIwMCBmb2N1czpyaW5nLXByaW1hcnkgZm9jdXM6Ym9yZGVyLXByaW1hcnlcIixcbiAgICAgICAgICAgICAgcmVhZE9ubHlNb2RlID8gXCJpbmQtcmVhZG9ubHktZmllbGRcIiA6IFwidGV4dC1zbGF0ZS05MDBcIlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIHN0eWxlPXtyZWFkT25seU1vZGUgPyB7IGNvbG9yOiB2YWx1ZUNvbG9yIH0gOiB1bmRlZmluZWR9XG4gICAgICAgICAgICB2YWx1ZT17cXVlcnkgfHwgc2VsZWN0ZWQ/LnRleHQgfHwgXCJcIn1cbiAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgaWYgKCFhbGxvd1RleHRJbnB1dCkgcmV0dXJuO1xuICAgICAgICAgICAgICBjb25zdCB2YWwgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgICAgICAgICAgIHNldFF1ZXJ5KHZhbCk7XG4gICAgICAgICAgICAgIHNldE9wZW4odHJ1ZSk7XG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgb25LZXlEb3duPXtoYW5kbGVLZXlEb3dufVxuICAgICAgICAgICAgb25Gb2N1cz17KCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoIWRpc2FibGVkKSBzZXRPcGVuKHRydWUpO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cbiAgICAgICAgICAgIHJlYWRPbmx5PXtyZWFkT25seU1vZGUgfHwgIWFsbG93VGV4dElucHV0fVxuICAgICAgICAgICAgYXJpYS1sYWJlbD17bGFiZWx9XG4gICAgICAgICAgICByb2xlPVwiY29tYm9ib3hcIlxuICAgICAgICAgICAgYXJpYS1leHBhbmRlZD17bGlzdE9wZW59XG4gICAgICAgICAgICBhcmlhLWNvbnRyb2xzPXtsaXN0SWR9XG4gICAgICAgICAgICBhcmlhLWFjdGl2ZWRlc2NlbmRhbnQ9e2FjdGl2ZUlkfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC15LTAgcmlnaHQtMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSBwci0yXCI+XG4gICAgICAgICAgICB7c2hvd1NlYXJjaEJ1dHRvbiA/IChcbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHAtMS41IHRleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtc2xhdGUtNTAwXCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICBpZiAoZGlzYWJsZWQpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgIHNldE9wZW4odHJ1ZSk7XG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtpbmRUKFwiQ29tbW9uX1NlYXJjaFwiLCBcIlNlYXJjaFwiKX1cbiAgICAgICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBmaWxsPVwibm9uZVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBzdHJva2VXaWR0aD17MS41fSBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBjbGFzc05hbWU9XCJoLTUgdy01XCI+XG4gICAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIm0xNS43NSAxNS43NS0yLjQ4OS0yLjQ4OW0wIDBhMy4zNzUgMy4zNzUgMCAxIDAtNC43NzMtNC43NzMgMy4zNzUgMy4zNzUgMCAwIDAgNC43NzQgNC43NzRaTTIxIDEyYTkgOSAwIDEgMS0xOCAwIDkgOSAwIDAgMSAxOCAwWlwiIC8+XG4gICAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBwLTEuNSB0ZXh0LXNsYXRlLTUwMCBob3Zlcjp0ZXh0LXNsYXRlLTYwMFwiXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZGlzYWJsZWQpIHJldHVybjtcbiAgICAgICAgICAgICAgICBzZXRPcGVuKChwcmV2KSA9PiAhcHJldik7XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgIGFyaWEtbGFiZWw9e29wZW4gPyBpbmRUKFwiRHJvcGRvd25fSGlkZU9wdGlvbnNcIiwgXCJIaWRlIG9wdGlvbnNcIikgOiBpbmRUKFwiRHJvcGRvd25fU2hvd09wdGlvbnNcIiwgXCJTaG93IG9wdGlvbnNcIil9XG4gICAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge29wZW4gPyA8Q2hldnJvblVwU3ZnIGNsYXNzTmFtZT1cImgtNSB3LTVcIiAvPiA6IDxDaGV2cm9uRG93blN2ZyBjbGFzc05hbWU9XCJoLTUgdy01XCIgLz59XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHt1c2VQb3J0YWwgPyAoXG4gICAgICAgICAgPEZsb2F0aW5nTGlzdFxuICAgICAgICAgICAgYW5jaG9yUmVmPXtib3hSZWZ9XG4gICAgICAgICAgICBvcGVuPXtsaXN0T3Blbn1cbiAgICAgICAgICAgIHpJbmRleD17MzYwMDAwfVxuICAgICAgICAgICAgbWF4SGVpZ2h0Q2xhc3M9XCJtYXgtaC03MlwiXG4gICAgICAgICAgICByb2xlPVwibGlzdGJveFwiXG4gICAgICAgICAgICByb3VuZGVkQ2xhc3M9XCJyb3VuZGVkLXhsXCJcbiAgICAgICAgICAgIHBvcnRhbENsYXNzTmFtZT17cG9ydGFsQ2xhc3NOYW1lfVxuICAgICAgICAgICAgcGFuZWxDbGFzc05hbWU9e3BhbmVsQ2xhc3NOYW1lfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtsaXN0Qm9keX1cbiAgICAgICAgICA8L0Zsb2F0aW5nTGlzdD5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICBsaXN0T3BlbiAmJiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIHotMzYwMDAwIG10LTEgdy1mdWxsIHJvdW5kZWQteGwgYmctd2hpdGUgc2hhZG93LWxnIHJpbmctMSByaW5nLWJsYWNrLzUgZm9jdXM6b3V0bGluZS1oaWRkZW4gbWF4LWgtNzIgb3ZlcmZsb3ctYXV0b1wiPlxuICAgICAgICAgICAgICB7bGlzdEJvZHl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApXG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNlbGVjdENvbWJvYm94O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbUJBQTREO0FBc0k1QjtBQXpHaEMsSUFBTSxpQkFBaUIsQ0FBQztBQUFBLEVBQ3RCO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0EsVUFBVTtBQUFBLEVBQ1YsV0FBVztBQUFBLEVBQ1gsV0FBVztBQUFBLEVBQ1gsWUFBWTtBQUFBLEVBQ1osb0JBQW9CO0FBQUEsRUFDcEI7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0EsbUJBQW1CO0FBQUEsRUFDbkIsaUJBQWlCO0FBQUEsRUFDakIsWUFBWTtBQUNkLE1BQTJCO0FBQ3pCLFFBQU0sZUFBZSxZQUFZO0FBQ2pDLFFBQU0sYUFBYSxlQUFlLFlBQVk7QUFDOUMsUUFBTSxXQUFPLHNCQUFRLE1BQU07QUFDekIsWUFBUSxXQUFXLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTTtBQUNoQyxVQUFJLE1BQU0sUUFBUSxDQUFDLEdBQUc7QUFDcEIsZUFBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLEtBQUssSUFBSSxNQUFNLEVBQUUsQ0FBQyxLQUFLLEdBQUc7QUFBQSxNQUMvQztBQUNBLGFBQU8sRUFBRSxPQUFPLEdBQUcsU0FBUyxHQUFHLFNBQVMsSUFBSSxNQUFNLEdBQUcsUUFBUSxHQUFHLFFBQVEsR0FBRztBQUFBLElBQzdFLENBQUM7QUFBQSxFQUNILEdBQUcsQ0FBQyxPQUFPLENBQUM7QUFFWixRQUFNLENBQUMsT0FBTyxRQUFRLFFBQUksdUJBQVMsRUFBRTtBQUNyQyxRQUFNLENBQUMsVUFBVSxXQUFXLFFBQUk7QUFBQSxJQUM5QixLQUFLLEtBQUssQ0FBQyxNQUFNLE9BQU8sRUFBRSxLQUFLLE1BQU0sT0FBTyxLQUFLLENBQUMsS0FBSyxLQUFLLENBQUMsS0FBSyxFQUFFLE9BQU8sSUFBSSxNQUFNLEdBQUc7QUFBQSxFQUMxRjtBQUNBLFFBQU0sQ0FBQyxNQUFNLE9BQU8sUUFBSSx1QkFBUyxLQUFLO0FBQ3RDLFFBQU0sQ0FBQyxhQUFhLGNBQWMsUUFBSSx1QkFBUyxDQUFDO0FBQ2hELFFBQU0sbUJBQWUscUJBQThCLElBQUk7QUFDdkQsUUFBTSxhQUFTLHFCQUE4QixJQUFJO0FBQ2pELFFBQU0sY0FBVSxxQkFBOEIsSUFBSTtBQUVsRCxrQkFBZ0IsQ0FBQyxjQUFjLE9BQU8sR0FBRyxNQUFNLFFBQVEsS0FBSyxDQUFDO0FBRTdELDhCQUFVLE1BQU07QUFDZCxnQkFBWSxLQUFLLEtBQUssQ0FBQyxNQUFNLE9BQU8sRUFBRSxLQUFLLE1BQU0sT0FBTyxLQUFLLENBQUMsS0FBSyxLQUFLLENBQUMsS0FBSyxFQUFFLE9BQU8sSUFBSSxNQUFNLEdBQUcsQ0FBQztBQUFBLEVBQ3ZHLEdBQUcsQ0FBQyxPQUFPLElBQUksQ0FBQztBQUVoQiw4QkFBVSxNQUFNO0FBQ2QsYUFBUyxFQUFFO0FBQUEsRUFDYixHQUFHLENBQUMsUUFBUSxDQUFDO0FBRWIsOEJBQVUsTUFBTTtBQUNkLFFBQUksQ0FBQyxrQkFBbUI7QUFDeEIsYUFBUyxVQUFVLFFBQVEsT0FBTyxTQUFTLEtBQUssSUFBSSxFQUFFO0FBQUEsRUFDeEQsR0FBRyxDQUFDLG1CQUFtQixVQUFVLFFBQVEsQ0FBQztBQUUxQyxRQUFNLGVBQVcsc0JBQVEsTUFBTTtBQUM3QixRQUFJLENBQUMsTUFBTSxLQUFLLEVBQUcsUUFBTztBQUMxQixVQUFNLElBQUksS0FBSyxPQUFPLENBQUMsTUFBTSxFQUFFLEtBQUssWUFBWSxFQUFFLFNBQVMsTUFBTSxZQUFZLENBQUMsQ0FBQztBQUMvRSxXQUFPLEVBQUUsU0FBUyxJQUFJO0FBQUEsRUFDeEIsR0FBRyxDQUFDLE1BQU0sS0FBSyxDQUFDO0FBRWhCLDhCQUFVLE1BQU07QUFDZCxtQkFBZSxDQUFDO0FBQUEsRUFDbEIsR0FBRyxDQUFDLFNBQVMsUUFBUSxLQUFLLENBQUM7QUFFM0IsUUFBTSxlQUFlLENBQUMsUUFBa0Q7QUFDdEUsZ0JBQVksR0FBRztBQUNmLGFBQVMsRUFBRTtBQUNYLFlBQVEsS0FBSztBQUNiLFFBQUksQ0FBQyxtQkFBbUI7QUFDdEIsZUFBUyxLQUFLLFFBQVEsT0FBTyxJQUFJLEtBQUssSUFBSSxFQUFFO0FBQUEsSUFDOUM7QUFBQSxFQUNGO0FBRUEsUUFBTSxnQkFBZ0IsQ0FBQyxPQUE4QztBQUNuRSxRQUFJLFNBQVU7QUFDZCxRQUFJLEdBQUcsUUFBUSxhQUFhO0FBQzFCLFNBQUcsZUFBZTtBQUNsQixjQUFRLElBQUk7QUFDWixVQUFJLFNBQVMsT0FBUSxnQkFBZSxDQUFDLFNBQVMsTUFBTSxLQUFLLFNBQVMsTUFBTTtBQUN4RTtBQUFBLElBQ0Y7QUFDQSxRQUFJLEdBQUcsUUFBUSxXQUFXO0FBQ3hCLFNBQUcsZUFBZTtBQUNsQixjQUFRLElBQUk7QUFDWixVQUFJLFNBQVMsT0FBUSxnQkFBZSxDQUFDLFNBQVMsTUFBTSxJQUFJLFNBQVMsVUFBVSxTQUFTLE1BQU07QUFDMUY7QUFBQSxJQUNGO0FBQ0EsUUFBSSxHQUFHLFFBQVEsU0FBUztBQUN0QixTQUFHLGVBQWU7QUFDbEIsVUFBSSxRQUFRLFNBQVMsUUFBUTtBQUMzQixxQkFBYSxTQUFTLFdBQVcsS0FBSyxTQUFTLENBQUMsQ0FBQztBQUFBLE1BQ25ELE9BQU87QUFDTCxnQkFBUSxJQUFJO0FBQUEsTUFDZDtBQUFBLElBQ0Y7QUFDQSxRQUFJLEdBQUcsUUFBUSxTQUFVLFNBQVEsS0FBSztBQUFBLEVBQ3hDO0FBRUEsUUFBTSxTQUFTLE9BQU8sVUFBVSxTQUFTLFFBQVE7QUFDakQsUUFBTSxTQUFTLGtCQUFrQixNQUFNO0FBQ3ZDLFFBQU0sV0FBVyxRQUFRLFNBQVMsV0FBVyxJQUFJLGNBQWMsTUFBTSxJQUFJLFNBQVMsV0FBVyxFQUFFLEtBQUssS0FBSztBQUN6RyxRQUFNLFdBQVcsUUFBUSxDQUFDO0FBRTFCLFFBQU0sV0FDSiw2Q0FBQyxTQUFJLElBQUksUUFBUSxLQUFLLFNBQVMsTUFBSyxXQUFVLGNBQVksT0FDdkQ7QUFBQSxhQUFTLFdBQVcsS0FBSyw0Q0FBQyxTQUFJLFdBQVUsb0NBQW9DLGVBQUssc0JBQXNCLFlBQVksR0FBRTtBQUFBLElBQ3JILFNBQVMsSUFBSSxDQUFDLEtBQUssUUFBUTtBQUMxQixZQUFNLE1BQU0sVUFBVSxVQUFVLElBQUk7QUFDcEMsWUFBTSxXQUFXLFFBQVE7QUFDekIsYUFDRTtBQUFBLFFBQUM7QUFBQTtBQUFBLFVBQ0MsTUFBSztBQUFBLFVBRUwsSUFBSSxjQUFjLE1BQU0sSUFBSSxJQUFJLEtBQUs7QUFBQSxVQUNyQyxNQUFLO0FBQUEsVUFDTCxpQkFBZTtBQUFBLFVBQ2YsV0FBVztBQUFBLFlBQ1Q7QUFBQSxZQUNBLFdBQVcsMEJBQTBCO0FBQUEsVUFDdkM7QUFBQSxVQUNBLGNBQWMsTUFBTSxlQUFlLEdBQUc7QUFBQSxVQUN0QyxTQUFTLE1BQU0sYUFBYSxHQUFHO0FBQUEsVUFFOUI7QUFBQSxtQkFDQztBQUFBLGNBQUM7QUFBQTtBQUFBLGdCQUNDLFdBQVc7QUFBQSxrQkFDVDtBQUFBLGtCQUNBLFdBQVcsZUFBZTtBQUFBLGdCQUM1QjtBQUFBO0FBQUEsWUFDRDtBQUFBLFlBRUgsNENBQUMsVUFBSyxXQUFXLFdBQVcsa0JBQWtCLE1BQU0sZ0JBQWdCLGFBQWEsR0FBSSxjQUFJLE1BQUs7QUFBQTtBQUFBO0FBQUEsUUFuQnpGLE9BQU8sSUFBSSxLQUFLO0FBQUEsTUFvQnZCO0FBQUEsSUFFSixDQUFDO0FBQUEsS0FDSDtBQUdGLFNBQ0U7QUFBQSxJQUFDO0FBQUE7QUFBQSxNQUNDLFdBQVcsV0FBVyxhQUFhLFdBQVcsb0NBQW9DLEVBQUU7QUFBQSxNQUNwRixLQUFLO0FBQUEsTUFFSjtBQUFBLG9CQUFZLDRDQUFDLFdBQU0sV0FBVyxXQUFXLDRCQUE0QixVQUFVLGtCQUFrQixFQUFFLEdBQUksaUJBQU0sSUFBVztBQUFBLFFBQ3pILDZDQUFDLFNBQUksV0FBVSxZQUNiO0FBQUE7QUFBQSxZQUFDO0FBQUE7QUFBQSxjQUNDLEtBQUs7QUFBQSxjQUNMLFdBQVc7QUFBQSxnQkFDVDtBQUFBLGdCQUNBLGVBQWUsdUJBQXVCO0FBQUEsY0FDeEM7QUFBQSxjQUNBLE9BQU8sZUFBZSxFQUFFLE9BQU8sV0FBVyxJQUFJO0FBQUEsY0FFOUM7QUFBQTtBQUFBLGtCQUFDO0FBQUE7QUFBQSxvQkFDQyxXQUFXO0FBQUEsc0JBQ1Q7QUFBQSxzQkFDQSxtQkFBbUIsVUFBVTtBQUFBLHNCQUM3QixVQUNJLHlFQUNBO0FBQUEsc0JBQ0osZUFBZSx1QkFBdUI7QUFBQSxvQkFDeEM7QUFBQSxvQkFDQSxPQUFPLGVBQWUsRUFBRSxPQUFPLFdBQVcsSUFBSTtBQUFBLG9CQUM5QyxPQUFPLFNBQVMsVUFBVSxRQUFRO0FBQUEsb0JBQ2xDO0FBQUEsb0JBQ0EsVUFBVSxDQUFDLFVBQVU7QUFDbkIsMEJBQUksQ0FBQyxlQUFnQjtBQUNyQiw0QkFBTSxNQUFNLE1BQU0sT0FBTztBQUN6QiwrQkFBUyxHQUFHO0FBQ1osOEJBQVEsSUFBSTtBQUFBLG9CQUNkO0FBQUEsb0JBQ0EsV0FBVztBQUFBLG9CQUNYLFNBQVMsTUFBTTtBQUNiLDBCQUFJLENBQUMsU0FBVSxTQUFRLElBQUk7QUFBQSxvQkFDN0I7QUFBQSxvQkFDQTtBQUFBLG9CQUNBLFVBQVUsZ0JBQWdCLENBQUM7QUFBQSxvQkFDM0IsY0FBWTtBQUFBLG9CQUNaLE1BQUs7QUFBQSxvQkFDTCxpQkFBZTtBQUFBLG9CQUNmLGlCQUFlO0FBQUEsb0JBQ2YseUJBQXVCO0FBQUE7QUFBQSxnQkFDekI7QUFBQSxnQkFDQSw2Q0FBQyxTQUFJLFdBQVUsMkRBQ1o7QUFBQSxxQ0FDQztBQUFBLG9CQUFDO0FBQUE7QUFBQSxzQkFDQyxNQUFLO0FBQUEsc0JBQ0wsV0FBVTtBQUFBLHNCQUNWLFNBQVMsTUFBTTtBQUNiLDRCQUFJLFNBQVU7QUFDZCxnQ0FBUSxJQUFJO0FBQUEsc0JBQ2Q7QUFBQSxzQkFDQSxjQUFZLEtBQUssaUJBQWlCLFFBQVE7QUFBQSxzQkFDMUM7QUFBQSxzQkFFQSxzREFBQyxTQUFJLE9BQU0sOEJBQTZCLE1BQUssUUFBTyxTQUFRLGFBQVksYUFBYSxLQUFLLFFBQU8sZ0JBQWUsV0FBVSxXQUN4SCxzREFBQyxVQUFLLGVBQWMsU0FBUSxnQkFBZSxTQUFRLEdBQUUsa0lBQWlJLEdBQ3hMO0FBQUE7QUFBQSxrQkFDRixJQUNFO0FBQUEsa0JBQ0o7QUFBQSxvQkFBQztBQUFBO0FBQUEsc0JBQ0MsTUFBSztBQUFBLHNCQUNMLFdBQVU7QUFBQSxzQkFDVixTQUFTLE1BQU07QUFDYiw0QkFBSSxTQUFVO0FBQ2QsZ0NBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSTtBQUFBLHNCQUN6QjtBQUFBLHNCQUNBLGNBQVksT0FBTyxLQUFLLHdCQUF3QixjQUFjLElBQUksS0FBSyx3QkFBd0IsY0FBYztBQUFBLHNCQUM3RztBQUFBLHNCQUVDLGlCQUFPLDRDQUFDLGdCQUFhLFdBQVUsV0FBVSxJQUFLLDRDQUFDLGtCQUFlLFdBQVUsV0FBVTtBQUFBO0FBQUEsa0JBQ3JGO0FBQUEsbUJBQ0Y7QUFBQTtBQUFBO0FBQUEsVUFDRjtBQUFBLFVBQ0MsWUFDQztBQUFBLFlBQUM7QUFBQTtBQUFBLGNBQ0MsV0FBVztBQUFBLGNBQ1gsTUFBTTtBQUFBLGNBQ04sUUFBUTtBQUFBLGNBQ1IsZ0JBQWU7QUFBQSxjQUNmLE1BQUs7QUFBQSxjQUNMLGNBQWE7QUFBQSxjQUNiO0FBQUEsY0FDQTtBQUFBLGNBRUM7QUFBQTtBQUFBLFVBQ0gsSUFFQSxZQUNFLDRDQUFDLFNBQUksV0FBVSwrSEFDWixvQkFDSDtBQUFBLFdBR047QUFBQTtBQUFBO0FBQUEsRUFDRjtBQUVKO0FBRUEsSUFBTyx5QkFBUTsiLAogICJuYW1lcyI6IFtdCn0K
