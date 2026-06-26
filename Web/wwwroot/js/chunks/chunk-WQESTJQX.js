import {
  handleComboboxKeyDown
} from "./chunk-YMDESVRK.js";
import {
  ChevronDownSvg,
  ChevronUpSvg,
  FloatingList_default,
  useOutsideClick
} from "./chunk-5FRAKTKT.js";
import {
  Spinner_default,
  classNames
} from "./chunk-EGSPAV7B.js";
import {
  require_jsx_runtime,
  require_react
} from "./chunk-2NKOKBT5.js";
import {
  indT
} from "./chunk-63VW7TTG.js";
import {
  __toESM
} from "./chunk-W7NC74ZX.js";

// Web/wwwroot/react/src/pages/gastos/components/ExpenseCurrencyFlagIcon.tsx
var import_react = __toESM(require_react());
var import_jsx_runtime = __toESM(require_jsx_runtime());
var normalizeCurrencyCode = (value) => {
  return String(value || "").trim().toUpperCase();
};
var ExpenseCurrencyFlagIcon = ({ currencyCode, className = "", sizeClassName = "h-4 w-4" }) => {
  const normalizedCode = normalizeCurrencyCode(currencyCode);
  const [failedCode, setFailedCode] = (0, import_react.useState)("");
  const loadFailed = !!normalizedCode && failedCode === normalizedCode;
  if (!normalizedCode || loadFailed) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "span",
      {
        "aria-hidden": "true",
        className: `inline-flex items-center justify-center rounded-[var(--radius-xl)] text-[10px] font-semibold leading-none text-slate-500 ${sizeClassName} ${className}`.trim(),
        children: "$"
      }
    );
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "img",
    {
      src: `/assets/flags/${encodeURIComponent(normalizedCode)}.svg`,
      alt: "",
      "aria-hidden": "true",
      loading: "lazy",
      className: `${sizeClassName} rounded-[var(--radius-xl)] object-contain ${className}`.trim(),
      onError: () => setFailedCode(normalizedCode)
    }
  );
};
var ExpenseCurrencyFlagIcon_default = ExpenseCurrencyFlagIcon;

// Web/wwwroot/react/src/components/commons/RemoteSearchCombobox.tsx
var import_react2 = __toESM(require_react());
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var uniqueByValue = (items) => {
  const map = /* @__PURE__ */ new Map();
  for (const item of items || []) {
    const key = String(item.value || "").trim();
    if (!key) continue;
    if (map.has(key)) continue;
    map.set(key, {
      value: key,
      title: String(item.title || "").trim(),
      subtitle: String(item.subtitle || "").trim()
    });
  }
  return Array.from(map.values());
};
var RemoteSearchCombobox = ({
  label,
  placeholder,
  value,
  onChange,
  onSearch,
  onSearchPage,
  idBase,
  minSearchLength = 2,
  pageSize = 20,
  allowEmptySearch = false,
  loadOnOpen = false,
  openSearchMode = "current-value",
  infiniteScroll = false,
  disabled = false,
  readOnly = false,
  showLabel = true,
  panelClassName = "visitas-typography"
}) => {
  const readOnlyMode = readOnly || disabled;
  const valueColor = readOnlyMode ? "#64748b" : "#00296be0";
  const [options, setOptions] = (0, import_react2.useState)([]);
  const [open, setOpen] = (0, import_react2.useState)(false);
  const [loading, setLoading] = (0, import_react2.useState)(false);
  const [activeIndex, setActiveIndex] = (0, import_react2.useState)(0);
  const [lastSearchedTerm, setLastSearchedTerm] = (0, import_react2.useState)("");
  const [showNotFoundState, setShowNotFoundState] = (0, import_react2.useState)(false);
  const abortRef = (0, import_react2.useRef)(null);
  const containerRef = (0, import_react2.useRef)(null);
  const boxRef = (0, import_react2.useRef)(null);
  const listRef = (0, import_react2.useRef)(null);
  const currentPageRef = (0, import_react2.useRef)(0);
  const hasMoreRef = (0, import_react2.useRef)(false);
  const loadedSearchTermRef = (0, import_react2.useRef)("");
  const loadingRef = (0, import_react2.useRef)(false);
  const runLoadMoreRef = (0, import_react2.useRef)(null);
  useOutsideClick([containerRef, listRef], () => {
    setShowNotFoundState(false);
    setOpen(false);
  });
  (0, import_react2.useEffect)(() => {
    return () => {
      abortRef.current?.abort();
      abortRef.current = null;
    };
  }, []);
  (0, import_react2.useEffect)(() => {
    loadingRef.current = loading;
  }, [loading]);
  const query = value || "";
  const loadedSearchTermKey = loadedSearchTermRef.current.trim().toLowerCase();
  const hasLoadedOpenSearchOptions = openSearchMode === "empty-query" && loadedSearchTermKey === "" && options.length > 0;
  const shouldShowLoadedOpenOptions = open && hasLoadedOpenSearchOptions;
  const filtered = (0, import_react2.useMemo)(() => {
    if (shouldShowLoadedOpenOptions) return options;
    if (!query.trim()) return options;
    const q = query.trim().toLowerCase();
    return options.filter((option) => {
      const valueText = option.value.toLowerCase();
      const titleText = String(option.title || "").toLowerCase();
      const subtitleText = String(option.subtitle || "").toLowerCase();
      return valueText.includes(q) || titleText.includes(q) || subtitleText.includes(q);
    });
  }, [options, query, shouldShowLoadedOpenOptions]);
  const resolvedActiveIndex = filtered.length > 0 ? Math.min(Math.max(activeIndex, 0), filtered.length - 1) : 0;
  const canSearchTerm = (0, import_react2.useCallback)(
    (term) => {
      const trimmed = term.trim();
      if (!trimmed) return allowEmptySearch;
      return trimmed.length >= minSearchLength;
    },
    [allowEmptySearch, minSearchLength]
  );
  const executeSearch = (0, import_react2.useCallback)(
    async (term, page, append, searchOptions = {}) => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;
      setLoading(true);
      if (!append) {
        setActiveIndex(0);
      }
      const normalizedTerm = term.trim();
      const termKey = normalizedTerm.toLowerCase();
      const clearValueOnNoResults = searchOptions.clearValueOnNoResults ?? true;
      try {
        if (onSearchPage) {
          const response = await onSearchPage(normalizedTerm, page, pageSize, controller.signal);
          const pageItems = uniqueByValue(Array.isArray(response?.items) ? response.items : []);
          if (!append && pageItems.length === 0) {
            setOptions([]);
            currentPageRef.current = 0;
            hasMoreRef.current = false;
            setLastSearchedTerm(termKey);
            loadedSearchTermRef.current = normalizedTerm;
            setShowNotFoundState(true);
            if (clearValueOnNoResults) {
              onChange("");
            }
            setOpen(true);
            return;
          }
          setOptions((previous) => append ? uniqueByValue([...previous || [], ...pageItems]) : pageItems);
          currentPageRef.current = page;
          setShowNotFoundState(false);
          const apiTotal = Number(response?.total);
          if (Number.isFinite(apiTotal) && apiTotal > 0) {
            hasMoreRef.current = page * pageSize < apiTotal;
          } else {
            hasMoreRef.current = pageItems.length >= pageSize;
          }
        } else {
          const response = await onSearch(normalizedTerm, controller.signal);
          const next = uniqueByValue(response || []);
          if (!append && next.length === 0) {
            setOptions([]);
            currentPageRef.current = 0;
            hasMoreRef.current = false;
            setLastSearchedTerm(termKey);
            loadedSearchTermRef.current = normalizedTerm;
            setShowNotFoundState(true);
            if (clearValueOnNoResults) {
              onChange("");
            }
            setOpen(true);
            return;
          }
          setOptions(next);
          currentPageRef.current = 1;
          hasMoreRef.current = false;
          setShowNotFoundState(false);
        }
        setLastSearchedTerm(termKey);
        loadedSearchTermRef.current = normalizedTerm;
        setOpen(true);
      } catch {
        if (!append) {
          setOptions([]);
          currentPageRef.current = 0;
          hasMoreRef.current = false;
        }
        setLastSearchedTerm(termKey);
        loadedSearchTermRef.current = normalizedTerm;
        setShowNotFoundState(false);
        setOpen(true);
      } finally {
        if (abortRef.current === controller) {
          abortRef.current = null;
        }
        setLoading(false);
      }
    },
    [onChange, onSearch, onSearchPage, pageSize]
  );
  const runSearch = (0, import_react2.useCallback)(async () => {
    if (readOnlyMode || loading) return;
    const term = query.trim();
    const termKey = term.toLowerCase();
    if (!canSearchTerm(term)) {
      setOptions([]);
      currentPageRef.current = 0;
      hasMoreRef.current = false;
      setShowNotFoundState(false);
      setOpen(false);
      setLastSearchedTerm("");
      loadedSearchTermRef.current = "";
      return;
    }
    if (termKey === lastSearchedTerm && options.length > 0 && !onSearchPage) {
      setOpen(true);
      return;
    }
    await executeSearch(term, 1, false);
  }, [canSearchTerm, executeSearch, lastSearchedTerm, loading, onSearchPage, options.length, query, readOnlyMode]);
  const runOpenSearch = (0, import_react2.useCallback)(async () => {
    if (readOnlyMode || loading || !loadOnOpen) return;
    const term = openSearchMode === "empty-query" ? "" : query.trim();
    if (!canSearchTerm(term)) {
      return;
    }
    await executeSearch(term, 1, false, {
      clearValueOnNoResults: openSearchMode !== "empty-query"
    });
  }, [canSearchTerm, executeSearch, loadOnOpen, loading, openSearchMode, query, readOnlyMode]);
  const runLoadMore = (0, import_react2.useCallback)(async () => {
    if (readOnlyMode || loading || !onSearchPage || !infiniteScroll || !hasMoreRef.current) {
      return;
    }
    const term = openSearchMode === "empty-query" ? loadedSearchTermRef.current.trim() : query.trim();
    const termKey = term.toLowerCase();
    if (openSearchMode !== "empty-query" && termKey !== lastSearchedTerm) {
      return;
    }
    if (!canSearchTerm(term)) {
      return;
    }
    const nextPage = currentPageRef.current + 1;
    if (nextPage <= 1) {
      return;
    }
    await executeSearch(term, nextPage, true, { clearValueOnNoResults: false });
  }, [
    canSearchTerm,
    executeSearch,
    infiniteScroll,
    lastSearchedTerm,
    loading,
    onSearchPage,
    openSearchMode,
    query,
    readOnlyMode
  ]);
  (0, import_react2.useEffect)(() => {
    runLoadMoreRef.current = runLoadMore;
  }, [runLoadMore]);
  (0, import_react2.useEffect)(() => {
    if (!open || !onSearchPage || !infiniteScroll) return;
    const scroller = listRef.current?.parentElement;
    if (!scroller) return;
    const onScroll = () => {
      if (loadingRef.current || !hasMoreRef.current) return;
      const threshold = 40;
      const isNearBottom = scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - threshold;
      if (isNearBottom) {
        void runLoadMoreRef.current?.();
      }
    };
    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      scroller.removeEventListener("scroll", onScroll);
    };
  }, [infiniteScroll, onSearchPage, open]);
  const selectOption = (option) => {
    const nextValue = String(option.value || "").trim();
    setShowNotFoundState(false);
    onChange(nextValue);
    setLastSearchedTerm(nextValue.toLowerCase());
    setOpen(false);
  };
  const queryKey = query.trim().toLowerCase();
  const showSearchIcon = !readOnlyMode && !loading && canSearchTerm(query) && queryKey !== lastSearchedTerm;
  const listId = `${idBase}-options`;
  const activeId = open && filtered[resolvedActiveIndex] ? `${idBase}-opt-${filtered[resolvedActiveIndex].value}` : void 0;
  const showLoadingOnlyState = loading && filtered.length === 0;
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "space-y-2", ref: containerRef, children: [
    showLabel ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { className: "form-label font-semibold", style: { color: "#00296be0" }, children: label }) : null,
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "relative", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
        "div",
        {
          ref: boxRef,
          className: classNames(
            "relative w-full rounded-[var(--radius-xl)] bg-white text-left focus-within:border-primary focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-white sm:text-sm",
            readOnlyMode ? "ind-readonly-field" : ""
          ),
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
              "input",
              {
                className: classNames(
                  "w-full rounded-[var(--radius-xl)] border px-3 py-2 pr-20 text-sm sm:text-base leading-5 focus:outline-hidden focus:ring-2 disabled:bg-slate-100 disabled:text-slate-500 disabled:border-slate-200 disabled:cursor-not-allowed",
                  "border-slate-200 focus:ring-primary focus:border-primary",
                  readOnlyMode ? "ind-readonly-field" : "text-slate-900"
                ),
                style: { color: valueColor },
                value: query,
                onChange: (event) => {
                  const nextValue = event.target.value;
                  setActiveIndex(0);
                  setShowNotFoundState(false);
                  onChange(nextValue);
                  if (nextValue.trim().toLowerCase() !== lastSearchedTerm) {
                    setOpen(false);
                  }
                },
                onFocus: () => {
                  if (!readOnlyMode && (filtered.length > 0 || hasLoadedOpenSearchOptions || showNotFoundState)) {
                    setOpen(true);
                  }
                },
                onKeyDown: (event) => handleComboboxKeyDown(event, {
                  isOpen: open,
                  setOpen,
                  optionCount: filtered.length,
                  setActiveIndex,
                  onEnterWhenOpen: () => {
                    if (filtered.length > 0) {
                      selectOption(filtered[resolvedActiveIndex] ?? filtered[0]);
                      return;
                    }
                    void runSearch();
                  },
                  onEnterWhenClosed: () => {
                    void runSearch();
                  },
                  openOnArrow: true
                }),
                placeholder,
                readOnly,
                disabled,
                "aria-label": label,
                "aria-expanded": open,
                "aria-controls": listId,
                "aria-activedescendant": activeId
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "absolute inset-y-0 right-0 flex items-center gap-1 pr-2", children: [
              loading ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "flex items-center px-1.5", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Spinner_default, { size: "h-4 w-4" }) }) : null,
              showSearchIcon ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                "button",
                {
                  type: "button",
                  className: "flex items-center p-1.5 text-slate-400 hover:text-slate-500",
                  onClick: () => {
                    void runSearch();
                  },
                  "aria-label": indT("Common_Search", "Search"),
                  disabled: readOnlyMode,
                  children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: "size-5", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" }) })
                }
              ) : null,
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                "button",
                {
                  type: "button",
                  className: "flex items-center p-1.5 text-slate-500 hover:text-slate-600",
                  onClick: () => {
                    if (readOnlyMode) return;
                    if (open) {
                      setOpen(false);
                      return;
                    }
                    if (openSearchMode === "empty-query" && loadOnOpen) {
                      if (hasLoadedOpenSearchOptions || loadedSearchTermKey === "" && showNotFoundState) {
                        setOpen(true);
                        return;
                      }
                      void runOpenSearch();
                      return;
                    }
                    if (filtered.length > 0) {
                      setOpen(true);
                      return;
                    }
                    if (!query.trim() && loadOnOpen) {
                      void runOpenSearch();
                    }
                  },
                  "aria-label": open ? indT("Dropdown_HideOptions", "Hide options") : indT("Dropdown_ShowOptions", "Show options"),
                  disabled: readOnlyMode,
                  children: open ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ChevronUpSvg, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ChevronDownSvg, { className: "size-5" })
                }
              )
            ] })
          ]
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        FloatingList_default,
        {
          anchorRef: boxRef,
          open,
          zIndex: 36e4,
          maxHeightClass: "max-h-72",
          role: "listbox",
          roundedClass: "rounded-[var(--radius-xl)]",
          panelClassName,
          children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { id: listId, ref: listRef, children: showLoadingOnlyState ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "px-4 py-2 text-sm text-slate-500", children: indT("Common_Loading", "Loading") }) : showNotFoundState ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "px-4 py-2 text-sm text-slate-500", children: indT("Common_NotFound", "Not found") }) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "px-4 py-2 text-sm text-slate-500", children: indT("Common_NoData", "No data") }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
            filtered.map((option, index) => {
              const isActive = index === resolvedActiveIndex;
              const optionId = option.value || `${index}`;
              return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                "button",
                {
                  type: "button",
                  id: `${idBase}-opt-${optionId}`,
                  role: "option",
                  "aria-selected": isActive,
                  className: classNames(
                    "relative flex w-full cursor-default select-none items-start py-2 px-3 text-left text-sm",
                    isActive ? "bg-primary text-white" : "text-slate-900"
                  ),
                  onMouseEnter: () => setActiveIndex(index),
                  onClick: () => selectOption(option),
                  children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "flex flex-col", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "font-medium", children: option.title || option.value }),
                    option.subtitle ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: classNames("text-xs", isActive ? "text-white/90" : "text-slate-500"), children: option.subtitle }) : null
                  ] })
                },
                optionId
              );
            }),
            loading ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "px-4 py-2 text-xs text-slate-500 border-t border-slate-100", children: indT("Common_Loading", "Loading") }) : null
          ] }) })
        }
      )
    ] })
  ] });
};
var RemoteSearchCombobox_default = RemoteSearchCombobox;

export {
  ExpenseCurrencyFlagIcon_default,
  RemoteSearchCombobox_default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VDdXJyZW5jeUZsYWdJY29uLnRzeCIsICIuLi8uLi9yZWFjdC9zcmMvY29tcG9uZW50cy9jb21tb25zL1JlbW90ZVNlYXJjaENvbWJvYm94LnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcblxyXG50eXBlIEV4cGVuc2VDdXJyZW5jeUZsYWdJY29uUHJvcHMgPSB7XHJcbiAgY3VycmVuY3lDb2RlOiBzdHJpbmc7XHJcbiAgY2xhc3NOYW1lPzogc3RyaW5nO1xyXG4gIHNpemVDbGFzc05hbWU/OiBzdHJpbmc7XHJcbn07XHJcblxyXG5jb25zdCBub3JtYWxpemVDdXJyZW5jeUNvZGUgPSAodmFsdWU6IHN0cmluZyB8IG51bWJlciB8IG51bGwgfCB1bmRlZmluZWQpOiBzdHJpbmcgPT4ge1xyXG4gIHJldHVybiBTdHJpbmcodmFsdWUgfHwgXCJcIikudHJpbSgpLnRvVXBwZXJDYXNlKCk7XHJcbn07XHJcblxyXG4vLyBSZW5kZXJzIGEgY3VycmVuY3kgZmxhZyBmcm9tIGxvY2FsIGFzc2V0cyB3aXRoIGEgc3RhYmxlIGZhbGxiYWNrIGljb24uXHJcbmNvbnN0IEV4cGVuc2VDdXJyZW5jeUZsYWdJY29uID0gKHsgY3VycmVuY3lDb2RlLCBjbGFzc05hbWUgPSBcIlwiLCBzaXplQ2xhc3NOYW1lID0gXCJoLTQgdy00XCIgfTogRXhwZW5zZUN1cnJlbmN5RmxhZ0ljb25Qcm9wcykgPT4ge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRDb2RlID0gbm9ybWFsaXplQ3VycmVuY3lDb2RlKGN1cnJlbmN5Q29kZSk7XHJcbiAgY29uc3QgW2ZhaWxlZENvZGUsIHNldEZhaWxlZENvZGVdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgbG9hZEZhaWxlZCA9ICEhbm9ybWFsaXplZENvZGUgJiYgZmFpbGVkQ29kZSA9PT0gbm9ybWFsaXplZENvZGU7XHJcblxyXG4gIGlmICghbm9ybWFsaXplZENvZGUgfHwgbG9hZEZhaWxlZCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPHNwYW5cclxuICAgICAgICBhcmlhLWhpZGRlbj1cInRydWVcIlxyXG4gICAgICAgIGNsYXNzTmFtZT17YGlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSB0ZXh0LVsxMHB4XSBmb250LXNlbWlib2xkIGxlYWRpbmctbm9uZSB0ZXh0LXNsYXRlLTUwMCAke3NpemVDbGFzc05hbWV9ICR7Y2xhc3NOYW1lfWAudHJpbSgpfVxyXG4gICAgICA+XHJcbiAgICAgICAgJFxyXG4gICAgICA8L3NwYW4+XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxpbWdcclxuICAgICAgc3JjPXtgL2Fzc2V0cy9mbGFncy8ke2VuY29kZVVSSUNvbXBvbmVudChub3JtYWxpemVkQ29kZSl9LnN2Z2B9XHJcbiAgICAgIGFsdD1cIlwiXHJcbiAgICAgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiXHJcbiAgICAgIGxvYWRpbmc9XCJsYXp5XCJcclxuICAgICAgY2xhc3NOYW1lPXtgJHtzaXplQ2xhc3NOYW1lfSByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBvYmplY3QtY29udGFpbiAke2NsYXNzTmFtZX1gLnRyaW0oKX1cclxuICAgICAgb25FcnJvcj17KCkgPT4gc2V0RmFpbGVkQ29kZShub3JtYWxpemVkQ29kZSl9XHJcbiAgICAvPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlQ3VycmVuY3lGbGFnSWNvbjtcclxuIiwgImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBGbG9hdGluZ0xpc3QgZnJvbSBcIi4vRmxvYXRpbmdMaXN0LnRzeFwiO1xyXG5pbXBvcnQgU3Bpbm5lciBmcm9tIFwiLi9TcGlubmVyLnRzeFwiO1xyXG5pbXBvcnQgeyBDaGV2cm9uRG93blN2ZywgQ2hldnJvblVwU3ZnIH0gZnJvbSBcIi4vY2hldnJvbnMudHN4XCI7XHJcbmltcG9ydCB7IGhhbmRsZUNvbWJvYm94S2V5RG93biB9IGZyb20gXCIuLi8uLi9ob29rcy91c2VDb21ib2JveEtleWJvYXJkLnRzXCI7XHJcbmltcG9ydCB7IHVzZU91dHNpZGVDbGljayB9IGZyb20gXCIuLi8uLi9ob29rcy91c2VPdXRzaWRlQ2xpY2sudHNcIjtcclxuaW1wb3J0IHsgY2xhc3NOYW1lcyB9IGZyb20gXCIuLi8uLi91dGlscy9jbGFzc05hbWVzLnRzXCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5cclxuZXhwb3J0IHR5cGUgUmVtb3RlU2VhcmNoT3B0aW9uID0ge1xuICB2YWx1ZTogc3RyaW5nO1xuICB0aXRsZT86IHN0cmluZztcbiAgc3VidGl0bGU/OiBzdHJpbmc7XG59O1xuXG50eXBlIFJlbW90ZVNlYXJjaE9wZW5TZWFyY2hNb2RlID0gXCJjdXJyZW50LXZhbHVlXCIgfCBcImVtcHR5LXF1ZXJ5XCI7XG5cbnR5cGUgRXhlY3V0ZVNlYXJjaE9wdGlvbnMgPSB7XG4gIGNsZWFyVmFsdWVPbk5vUmVzdWx0cz86IGJvb2xlYW47XG59O1xuXG50eXBlIFJlbW90ZVNlYXJjaENvbWJvYm94UHJvcHMgPSB7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG4gIHZhbHVlOiBzdHJpbmc7XG4gIG9uQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgb25TZWFyY2g6ICh0ZXJtOiBzdHJpbmcsIHNpZ25hbDogQWJvcnRTaWduYWwpID0+IFByb21pc2U8UmVtb3RlU2VhcmNoT3B0aW9uW10+O1xyXG4gIG9uU2VhcmNoUGFnZT86IChcclxuICAgIHRlcm06IHN0cmluZyxcclxuICAgIHBhZ2U6IG51bWJlcixcclxuICAgIHBhZ2VTaXplOiBudW1iZXIsXHJcbiAgICBzaWduYWw6IEFib3J0U2lnbmFsXHJcbiAgKSA9PiBQcm9taXNlPHsgaXRlbXM6IFJlbW90ZVNlYXJjaE9wdGlvbltdOyB0b3RhbD86IG51bWJlciB9PjtcclxuICBpZEJhc2U6IHN0cmluZztcclxuICBtaW5TZWFyY2hMZW5ndGg/OiBudW1iZXI7XHJcbiAgcGFnZVNpemU/OiBudW1iZXI7XHJcbiAgYWxsb3dFbXB0eVNlYXJjaD86IGJvb2xlYW47XG4gIGxvYWRPbk9wZW4/OiBib29sZWFuO1xuICBvcGVuU2VhcmNoTW9kZT86IFJlbW90ZVNlYXJjaE9wZW5TZWFyY2hNb2RlO1xuICBpbmZpbml0ZVNjcm9sbD86IGJvb2xlYW47XG4gIGRpc2FibGVkPzogYm9vbGVhbjtcbiAgcmVhZE9ubHk/OiBib29sZWFuO1xuICBzaG93TGFiZWw/OiBib29sZWFuO1xuICBwYW5lbENsYXNzTmFtZT86IHN0cmluZztcclxufTtcclxuXHJcbmNvbnN0IHVuaXF1ZUJ5VmFsdWUgPSAoaXRlbXM6IFJlbW90ZVNlYXJjaE9wdGlvbltdKTogUmVtb3RlU2VhcmNoT3B0aW9uW10gPT4ge1xyXG4gIGNvbnN0IG1hcCA9IG5ldyBNYXA8c3RyaW5nLCBSZW1vdGVTZWFyY2hPcHRpb24+KCk7XHJcbiAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zIHx8IFtdKSB7XHJcbiAgICBjb25zdCBrZXkgPSBTdHJpbmcoaXRlbS52YWx1ZSB8fCBcIlwiKS50cmltKCk7XHJcbiAgICBpZiAoIWtleSkgY29udGludWU7XHJcbiAgICBpZiAobWFwLmhhcyhrZXkpKSBjb250aW51ZTtcclxuICAgIG1hcC5zZXQoa2V5LCB7XHJcbiAgICAgIHZhbHVlOiBrZXksXHJcbiAgICAgIHRpdGxlOiBTdHJpbmcoaXRlbS50aXRsZSB8fCBcIlwiKS50cmltKCksXHJcbiAgICAgIHN1YnRpdGxlOiBTdHJpbmcoaXRlbS5zdWJ0aXRsZSB8fCBcIlwiKS50cmltKCksXHJcbiAgICB9KTtcclxuICB9XHJcbiAgcmV0dXJuIEFycmF5LmZyb20obWFwLnZhbHVlcygpKTtcclxufTtcclxuXHJcbi8vIEdlbmVyaWMgcmVtb3RlLXNlYXJjaCBjb21ib2JveCB0aGF0IHN1cHBvcnRzIG1hbnVhbCBzZWFyY2ggYW5kIG9wdGlvbmFsIHBhZ2VkIGxvYWRpbmcgb24gb3Blbi5cclxuY29uc3QgUmVtb3RlU2VhcmNoQ29tYm9ib3ggPSAoe1xyXG4gIGxhYmVsLFxyXG4gIHBsYWNlaG9sZGVyLFxyXG4gIHZhbHVlLFxyXG4gIG9uQ2hhbmdlLFxyXG4gIG9uU2VhcmNoLFxyXG4gIG9uU2VhcmNoUGFnZSxcclxuICBpZEJhc2UsXHJcbiAgbWluU2VhcmNoTGVuZ3RoID0gMixcclxuICBwYWdlU2l6ZSA9IDIwLFxuICBhbGxvd0VtcHR5U2VhcmNoID0gZmFsc2UsXG4gIGxvYWRPbk9wZW4gPSBmYWxzZSxcbiAgb3BlblNlYXJjaE1vZGUgPSBcImN1cnJlbnQtdmFsdWVcIixcbiAgaW5maW5pdGVTY3JvbGwgPSBmYWxzZSxcbiAgZGlzYWJsZWQgPSBmYWxzZSxcbiAgcmVhZE9ubHkgPSBmYWxzZSxcbiAgc2hvd0xhYmVsID0gdHJ1ZSxcbiAgcGFuZWxDbGFzc05hbWUgPSBcInZpc2l0YXMtdHlwb2dyYXBoeVwiLFxyXG59OiBSZW1vdGVTZWFyY2hDb21ib2JveFByb3BzKSA9PiB7XHJcbiAgY29uc3QgcmVhZE9ubHlNb2RlID0gcmVhZE9ubHkgfHwgZGlzYWJsZWQ7XHJcbiAgY29uc3QgdmFsdWVDb2xvciA9IHJlYWRPbmx5TW9kZSA/IFwiIzY0NzQ4YlwiIDogXCIjMDAyOTZiZTBcIjtcclxuICBjb25zdCBbb3B0aW9ucywgc2V0T3B0aW9uc10gPSB1c2VTdGF0ZTxSZW1vdGVTZWFyY2hPcHRpb25bXT4oW10pO1xyXG4gIGNvbnN0IFtvcGVuLCBzZXRPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFthY3RpdmVJbmRleCwgc2V0QWN0aXZlSW5kZXhdID0gdXNlU3RhdGUoMCk7XG4gIGNvbnN0IFtsYXN0U2VhcmNoZWRUZXJtLCBzZXRMYXN0U2VhcmNoZWRUZXJtXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbc2hvd05vdEZvdW5kU3RhdGUsIHNldFNob3dOb3RGb3VuZFN0YXRlXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICBjb25zdCBhYm9ydFJlZiA9IHVzZVJlZjxBYm9ydENvbnRyb2xsZXIgfCBudWxsPihudWxsKTtcbiAgY29uc3QgY29udGFpbmVyUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IGJveFJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBsaXN0UmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IGN1cnJlbnRQYWdlUmVmID0gdXNlUmVmKDApO1xuICBjb25zdCBoYXNNb3JlUmVmID0gdXNlUmVmKGZhbHNlKTtcbiAgY29uc3QgbG9hZGVkU2VhcmNoVGVybVJlZiA9IHVzZVJlZihcIlwiKTtcbiAgY29uc3QgbG9hZGluZ1JlZiA9IHVzZVJlZihmYWxzZSk7XG4gIGNvbnN0IHJ1bkxvYWRNb3JlUmVmID0gdXNlUmVmPCgoKSA9PiBQcm9taXNlPHZvaWQ+KSB8IG51bGw+KG51bGwpO1xuXHJcbiAgdXNlT3V0c2lkZUNsaWNrKFtjb250YWluZXJSZWYsIGxpc3RSZWZdLCAoKSA9PiB7XHJcbiAgICBzZXRTaG93Tm90Rm91bmRTdGF0ZShmYWxzZSk7XHJcbiAgICBzZXRPcGVuKGZhbHNlKTtcclxuICB9KTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgYWJvcnRSZWYuY3VycmVudD8uYWJvcnQoKTtcbiAgICAgIGFib3J0UmVmLmN1cnJlbnQgPSBudWxsO1xuICAgIH07XG4gIH0sIFtdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGxvYWRpbmdSZWYuY3VycmVudCA9IGxvYWRpbmc7XG4gIH0sIFtsb2FkaW5nXSk7XG5cbiAgY29uc3QgcXVlcnkgPSB2YWx1ZSB8fCBcIlwiO1xuICBjb25zdCBsb2FkZWRTZWFyY2hUZXJtS2V5ID0gbG9hZGVkU2VhcmNoVGVybVJlZi5jdXJyZW50LnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICBjb25zdCBoYXNMb2FkZWRPcGVuU2VhcmNoT3B0aW9ucyA9XG4gICAgb3BlblNlYXJjaE1vZGUgPT09IFwiZW1wdHktcXVlcnlcIiAmJiBsb2FkZWRTZWFyY2hUZXJtS2V5ID09PSBcIlwiICYmIG9wdGlvbnMubGVuZ3RoID4gMDtcbiAgY29uc3Qgc2hvdWxkU2hvd0xvYWRlZE9wZW5PcHRpb25zID0gb3BlbiAmJiBoYXNMb2FkZWRPcGVuU2VhcmNoT3B0aW9ucztcblxuICBjb25zdCBmaWx0ZXJlZCA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIGlmIChzaG91bGRTaG93TG9hZGVkT3Blbk9wdGlvbnMpIHJldHVybiBvcHRpb25zO1xuICAgIGlmICghcXVlcnkudHJpbSgpKSByZXR1cm4gb3B0aW9ucztcbiAgICBjb25zdCBxID0gcXVlcnkudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG4gICAgcmV0dXJuIG9wdGlvbnMuZmlsdGVyKChvcHRpb24pID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlVGV4dCA9IG9wdGlvbi52YWx1ZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgY29uc3QgdGl0bGVUZXh0ID0gU3RyaW5nKG9wdGlvbi50aXRsZSB8fCBcIlwiKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgY29uc3Qgc3VidGl0bGVUZXh0ID0gU3RyaW5nKG9wdGlvbi5zdWJ0aXRsZSB8fCBcIlwiKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgcmV0dXJuIHZhbHVlVGV4dC5pbmNsdWRlcyhxKSB8fCB0aXRsZVRleHQuaW5jbHVkZXMocSkgfHwgc3VidGl0bGVUZXh0LmluY2x1ZGVzKHEpO1xuICAgIH0pO1xuICB9LCBbb3B0aW9ucywgcXVlcnksIHNob3VsZFNob3dMb2FkZWRPcGVuT3B0aW9uc10pO1xuICBjb25zdCByZXNvbHZlZEFjdGl2ZUluZGV4ID1cbiAgICBmaWx0ZXJlZC5sZW5ndGggPiAwID8gTWF0aC5taW4oTWF0aC5tYXgoYWN0aXZlSW5kZXgsIDApLCBmaWx0ZXJlZC5sZW5ndGggLSAxKSA6IDA7XG5cclxuICBjb25zdCBjYW5TZWFyY2hUZXJtID0gdXNlQ2FsbGJhY2soXHJcbiAgICAodGVybTogc3RyaW5nKTogYm9vbGVhbiA9PiB7XHJcbiAgICAgIGNvbnN0IHRyaW1tZWQgPSB0ZXJtLnRyaW0oKTtcclxuICAgICAgaWYgKCF0cmltbWVkKSByZXR1cm4gYWxsb3dFbXB0eVNlYXJjaDtcclxuICAgICAgcmV0dXJuIHRyaW1tZWQubGVuZ3RoID49IG1pblNlYXJjaExlbmd0aDtcclxuICAgIH0sXHJcbiAgICBbYWxsb3dFbXB0eVNlYXJjaCwgbWluU2VhcmNoTGVuZ3RoXVxyXG4gICk7XHJcblxuICBjb25zdCBleGVjdXRlU2VhcmNoID0gdXNlQ2FsbGJhY2soXG4gICAgYXN5bmMgKHRlcm06IHN0cmluZywgcGFnZTogbnVtYmVyLCBhcHBlbmQ6IGJvb2xlYW4sIHNlYXJjaE9wdGlvbnM6IEV4ZWN1dGVTZWFyY2hPcHRpb25zID0ge30pID0+IHtcbiAgICAgIGFib3J0UmVmLmN1cnJlbnQ/LmFib3J0KCk7XG4gICAgICBjb25zdCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuICAgICAgYWJvcnRSZWYuY3VycmVudCA9IGNvbnRyb2xsZXI7XG4gICAgICBzZXRMb2FkaW5nKHRydWUpO1xuICAgICAgaWYgKCFhcHBlbmQpIHtcbiAgICAgICAgc2V0QWN0aXZlSW5kZXgoMCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRUZXJtID0gdGVybS50cmltKCk7XG4gICAgICBjb25zdCB0ZXJtS2V5ID0gbm9ybWFsaXplZFRlcm0udG9Mb3dlckNhc2UoKTtcbiAgICAgIGNvbnN0IGNsZWFyVmFsdWVPbk5vUmVzdWx0cyA9IHNlYXJjaE9wdGlvbnMuY2xlYXJWYWx1ZU9uTm9SZXN1bHRzID8/IHRydWU7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAob25TZWFyY2hQYWdlKSB7XG4gICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBvblNlYXJjaFBhZ2Uobm9ybWFsaXplZFRlcm0sIHBhZ2UsIHBhZ2VTaXplLCBjb250cm9sbGVyLnNpZ25hbCk7XG4gICAgICAgICAgY29uc3QgcGFnZUl0ZW1zID0gdW5pcXVlQnlWYWx1ZShBcnJheS5pc0FycmF5KHJlc3BvbnNlPy5pdGVtcykgPyByZXNwb25zZS5pdGVtcyA6IFtdKTtcbiAgICAgICAgICBpZiAoIWFwcGVuZCAmJiBwYWdlSXRlbXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBzZXRPcHRpb25zKFtdKTtcbiAgICAgICAgICAgIGN1cnJlbnRQYWdlUmVmLmN1cnJlbnQgPSAwO1xuICAgICAgICAgICAgaGFzTW9yZVJlZi5jdXJyZW50ID0gZmFsc2U7XG4gICAgICAgICAgICBzZXRMYXN0U2VhcmNoZWRUZXJtKHRlcm1LZXkpO1xuICAgICAgICAgICAgbG9hZGVkU2VhcmNoVGVybVJlZi5jdXJyZW50ID0gbm9ybWFsaXplZFRlcm07XG4gICAgICAgICAgICBzZXRTaG93Tm90Rm91bmRTdGF0ZSh0cnVlKTtcbiAgICAgICAgICAgIGlmIChjbGVhclZhbHVlT25Ob1Jlc3VsdHMpIHtcbiAgICAgICAgICAgICAgb25DaGFuZ2UoXCJcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZXRPcGVuKHRydWUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHNldE9wdGlvbnMoKHByZXZpb3VzKSA9PiAoYXBwZW5kID8gdW5pcXVlQnlWYWx1ZShbLi4uKHByZXZpb3VzIHx8IFtdKSwgLi4ucGFnZUl0ZW1zXSkgOiBwYWdlSXRlbXMpKTtcbiAgICAgICAgICBjdXJyZW50UGFnZVJlZi5jdXJyZW50ID0gcGFnZTtcbiAgICAgICAgICBzZXRTaG93Tm90Rm91bmRTdGF0ZShmYWxzZSk7XG5cbiAgICAgICAgICBjb25zdCBhcGlUb3RhbCA9IE51bWJlcihyZXNwb25zZT8udG90YWwpO1xuICAgICAgICAgIGlmIChOdW1iZXIuaXNGaW5pdGUoYXBpVG90YWwpICYmIGFwaVRvdGFsID4gMCkge1xuICAgICAgICAgICAgaGFzTW9yZVJlZi5jdXJyZW50ID0gcGFnZSAqIHBhZ2VTaXplIDwgYXBpVG90YWw7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGhhc01vcmVSZWYuY3VycmVudCA9IHBhZ2VJdGVtcy5sZW5ndGggPj0gcGFnZVNpemU7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgb25TZWFyY2gobm9ybWFsaXplZFRlcm0sIGNvbnRyb2xsZXIuc2lnbmFsKTtcbiAgICAgICAgICBjb25zdCBuZXh0ID0gdW5pcXVlQnlWYWx1ZShyZXNwb25zZSB8fCBbXSk7XG4gICAgICAgICAgaWYgKCFhcHBlbmQgJiYgbmV4dC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHNldE9wdGlvbnMoW10pO1xuICAgICAgICAgICAgY3VycmVudFBhZ2VSZWYuY3VycmVudCA9IDA7XG4gICAgICAgICAgICBoYXNNb3JlUmVmLmN1cnJlbnQgPSBmYWxzZTtcbiAgICAgICAgICAgIHNldExhc3RTZWFyY2hlZFRlcm0odGVybUtleSk7XG4gICAgICAgICAgICBsb2FkZWRTZWFyY2hUZXJtUmVmLmN1cnJlbnQgPSBub3JtYWxpemVkVGVybTtcbiAgICAgICAgICAgIHNldFNob3dOb3RGb3VuZFN0YXRlKHRydWUpO1xuICAgICAgICAgICAgaWYgKGNsZWFyVmFsdWVPbk5vUmVzdWx0cykge1xuICAgICAgICAgICAgICBvbkNoYW5nZShcIlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNldE9wZW4odHJ1ZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgc2V0T3B0aW9ucyhuZXh0KTtcbiAgICAgICAgICBjdXJyZW50UGFnZVJlZi5jdXJyZW50ID0gMTtcbiAgICAgICAgICBoYXNNb3JlUmVmLmN1cnJlbnQgPSBmYWxzZTtcbiAgICAgICAgICBzZXRTaG93Tm90Rm91bmRTdGF0ZShmYWxzZSk7XG4gICAgICAgIH1cblxuICAgICAgICBzZXRMYXN0U2VhcmNoZWRUZXJtKHRlcm1LZXkpO1xuICAgICAgICBsb2FkZWRTZWFyY2hUZXJtUmVmLmN1cnJlbnQgPSBub3JtYWxpemVkVGVybTtcbiAgICAgICAgc2V0T3Blbih0cnVlKTtcbiAgICAgIH0gY2F0Y2gge1xuICAgICAgICBpZiAoIWFwcGVuZCkge1xuICAgICAgICAgIHNldE9wdGlvbnMoW10pO1xuICAgICAgICAgIGN1cnJlbnRQYWdlUmVmLmN1cnJlbnQgPSAwO1xuICAgICAgICAgIGhhc01vcmVSZWYuY3VycmVudCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHNldExhc3RTZWFyY2hlZFRlcm0odGVybUtleSk7XG4gICAgICAgIGxvYWRlZFNlYXJjaFRlcm1SZWYuY3VycmVudCA9IG5vcm1hbGl6ZWRUZXJtO1xuICAgICAgICBzZXRTaG93Tm90Rm91bmRTdGF0ZShmYWxzZSk7XG4gICAgICAgIHNldE9wZW4odHJ1ZSk7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBpZiAoYWJvcnRSZWYuY3VycmVudCA9PT0gY29udHJvbGxlcikge1xyXG4gICAgICAgICAgYWJvcnRSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgICAgfVxuICAgIH0sXG4gICAgW29uQ2hhbmdlLCBvblNlYXJjaCwgb25TZWFyY2hQYWdlLCBwYWdlU2l6ZV1cbiAgKTtcblxuICBjb25zdCBydW5TZWFyY2ggPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XG4gICAgaWYgKHJlYWRPbmx5TW9kZSB8fCBsb2FkaW5nKSByZXR1cm47XHJcbiAgICBjb25zdCB0ZXJtID0gcXVlcnkudHJpbSgpO1xyXG4gICAgY29uc3QgdGVybUtleSA9IHRlcm0udG9Mb3dlckNhc2UoKTtcclxuXHJcbiAgICBpZiAoIWNhblNlYXJjaFRlcm0odGVybSkpIHtcbiAgICAgIHNldE9wdGlvbnMoW10pO1xuICAgICAgY3VycmVudFBhZ2VSZWYuY3VycmVudCA9IDA7XG4gICAgICBoYXNNb3JlUmVmLmN1cnJlbnQgPSBmYWxzZTtcbiAgICAgIHNldFNob3dOb3RGb3VuZFN0YXRlKGZhbHNlKTtcbiAgICAgIHNldE9wZW4oZmFsc2UpO1xuICAgICAgc2V0TGFzdFNlYXJjaGVkVGVybShcIlwiKTtcbiAgICAgIGxvYWRlZFNlYXJjaFRlcm1SZWYuY3VycmVudCA9IFwiXCI7XG4gICAgICByZXR1cm47XG4gICAgfVxuXHJcbiAgICBpZiAodGVybUtleSA9PT0gbGFzdFNlYXJjaGVkVGVybSAmJiBvcHRpb25zLmxlbmd0aCA+IDAgJiYgIW9uU2VhcmNoUGFnZSkge1xyXG4gICAgICBzZXRPcGVuKHRydWUpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxuICAgIGF3YWl0IGV4ZWN1dGVTZWFyY2godGVybSwgMSwgZmFsc2UpO1xuICB9LCBbY2FuU2VhcmNoVGVybSwgZXhlY3V0ZVNlYXJjaCwgbGFzdFNlYXJjaGVkVGVybSwgbG9hZGluZywgb25TZWFyY2hQYWdlLCBvcHRpb25zLmxlbmd0aCwgcXVlcnksIHJlYWRPbmx5TW9kZV0pO1xuXG4gIGNvbnN0IHJ1bk9wZW5TZWFyY2ggPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XG4gICAgaWYgKHJlYWRPbmx5TW9kZSB8fCBsb2FkaW5nIHx8ICFsb2FkT25PcGVuKSByZXR1cm47XG5cbiAgICBjb25zdCB0ZXJtID0gb3BlblNlYXJjaE1vZGUgPT09IFwiZW1wdHktcXVlcnlcIiA/IFwiXCIgOiBxdWVyeS50cmltKCk7XG4gICAgaWYgKCFjYW5TZWFyY2hUZXJtKHRlcm0pKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgYXdhaXQgZXhlY3V0ZVNlYXJjaCh0ZXJtLCAxLCBmYWxzZSwge1xuICAgICAgY2xlYXJWYWx1ZU9uTm9SZXN1bHRzOiBvcGVuU2VhcmNoTW9kZSAhPT0gXCJlbXB0eS1xdWVyeVwiLFxuICAgIH0pO1xuICB9LCBbY2FuU2VhcmNoVGVybSwgZXhlY3V0ZVNlYXJjaCwgbG9hZE9uT3BlbiwgbG9hZGluZywgb3BlblNlYXJjaE1vZGUsIHF1ZXJ5LCByZWFkT25seU1vZGVdKTtcblxuICBjb25zdCBydW5Mb2FkTW9yZSA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcbiAgICBpZiAocmVhZE9ubHlNb2RlIHx8IGxvYWRpbmcgfHwgIW9uU2VhcmNoUGFnZSB8fCAhaW5maW5pdGVTY3JvbGwgfHwgIWhhc01vcmVSZWYuY3VycmVudCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHRlcm0gPSBvcGVuU2VhcmNoTW9kZSA9PT0gXCJlbXB0eS1xdWVyeVwiID8gbG9hZGVkU2VhcmNoVGVybVJlZi5jdXJyZW50LnRyaW0oKSA6IHF1ZXJ5LnRyaW0oKTtcbiAgICBjb25zdCB0ZXJtS2V5ID0gdGVybS50b0xvd2VyQ2FzZSgpO1xuICAgIGlmIChvcGVuU2VhcmNoTW9kZSAhPT0gXCJlbXB0eS1xdWVyeVwiICYmIHRlcm1LZXkgIT09IGxhc3RTZWFyY2hlZFRlcm0pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIWNhblNlYXJjaFRlcm0odGVybSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBuZXh0UGFnZSA9IGN1cnJlbnRQYWdlUmVmLmN1cnJlbnQgKyAxO1xuICAgIGlmIChuZXh0UGFnZSA8PSAxKSB7XHJcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBhd2FpdCBleGVjdXRlU2VhcmNoKHRlcm0sIG5leHRQYWdlLCB0cnVlLCB7IGNsZWFyVmFsdWVPbk5vUmVzdWx0czogZmFsc2UgfSk7XG4gIH0sIFtcbiAgICBjYW5TZWFyY2hUZXJtLFxuICAgIGV4ZWN1dGVTZWFyY2gsXG4gICAgaW5maW5pdGVTY3JvbGwsXG4gICAgbGFzdFNlYXJjaGVkVGVybSxcbiAgICBsb2FkaW5nLFxuICAgIG9uU2VhcmNoUGFnZSxcbiAgICBvcGVuU2VhcmNoTW9kZSxcbiAgICBxdWVyeSxcbiAgICByZWFkT25seU1vZGUsXG4gIF0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgcnVuTG9hZE1vcmVSZWYuY3VycmVudCA9IHJ1bkxvYWRNb3JlO1xuICB9LCBbcnVuTG9hZE1vcmVdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghb3BlbiB8fCAhb25TZWFyY2hQYWdlIHx8ICFpbmZpbml0ZVNjcm9sbCkgcmV0dXJuO1xuICAgIGNvbnN0IHNjcm9sbGVyID0gbGlzdFJlZi5jdXJyZW50Py5wYXJlbnRFbGVtZW50O1xyXG4gICAgaWYgKCFzY3JvbGxlcikgcmV0dXJuO1xyXG5cbiAgICBjb25zdCBvblNjcm9sbCA9ICgpID0+IHtcbiAgICAgIGlmIChsb2FkaW5nUmVmLmN1cnJlbnQgfHwgIWhhc01vcmVSZWYuY3VycmVudCkgcmV0dXJuO1xuICAgICAgY29uc3QgdGhyZXNob2xkID0gNDA7XG4gICAgICBjb25zdCBpc05lYXJCb3R0b20gPSBzY3JvbGxlci5zY3JvbGxUb3AgKyBzY3JvbGxlci5jbGllbnRIZWlnaHQgPj0gc2Nyb2xsZXIuc2Nyb2xsSGVpZ2h0IC0gdGhyZXNob2xkO1xuICAgICAgaWYgKGlzTmVhckJvdHRvbSkge1xuICAgICAgICB2b2lkIHJ1bkxvYWRNb3JlUmVmLmN1cnJlbnQ/LigpO1xuICAgICAgfVxuICAgIH07XG5cclxuICAgIHNjcm9sbGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgb25TY3JvbGwsIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIHNjcm9sbGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgb25TY3JvbGwpO1xyXG4gICAgfTtcclxuICB9LCBbaW5maW5pdGVTY3JvbGwsIG9uU2VhcmNoUGFnZSwgb3Blbl0pO1xuXHJcbiAgY29uc3Qgc2VsZWN0T3B0aW9uID0gKG9wdGlvbjogUmVtb3RlU2VhcmNoT3B0aW9uKSA9PiB7XHJcbiAgICBjb25zdCBuZXh0VmFsdWUgPSBTdHJpbmcob3B0aW9uLnZhbHVlIHx8IFwiXCIpLnRyaW0oKTtcclxuICAgIHNldFNob3dOb3RGb3VuZFN0YXRlKGZhbHNlKTtcclxuICAgIG9uQ2hhbmdlKG5leHRWYWx1ZSk7XHJcbiAgICBzZXRMYXN0U2VhcmNoZWRUZXJtKG5leHRWYWx1ZS50b0xvd2VyQ2FzZSgpKTtcclxuICAgIHNldE9wZW4oZmFsc2UpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IHF1ZXJ5S2V5ID0gcXVlcnkudHJpbSgpLnRvTG93ZXJDYXNlKCk7XHJcbiAgY29uc3Qgc2hvd1NlYXJjaEljb24gPVxyXG4gICAgIXJlYWRPbmx5TW9kZSAmJlxyXG4gICAgIWxvYWRpbmcgJiZcclxuICAgIGNhblNlYXJjaFRlcm0ocXVlcnkpICYmXHJcbiAgICBxdWVyeUtleSAhPT0gbGFzdFNlYXJjaGVkVGVybTtcclxuXHJcbiAgY29uc3QgbGlzdElkID0gYCR7aWRCYXNlfS1vcHRpb25zYDtcclxuICBjb25zdCBhY3RpdmVJZCA9XHJcbiAgICBvcGVuICYmIGZpbHRlcmVkW3Jlc29sdmVkQWN0aXZlSW5kZXhdID8gYCR7aWRCYXNlfS1vcHQtJHtmaWx0ZXJlZFtyZXNvbHZlZEFjdGl2ZUluZGV4XS52YWx1ZX1gIDogdW5kZWZpbmVkO1xyXG4gIGNvbnN0IHNob3dMb2FkaW5nT25seVN0YXRlID0gbG9hZGluZyAmJiBmaWx0ZXJlZC5sZW5ndGggPT09IDA7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMlwiIHJlZj17Y29udGFpbmVyUmVmfT5cclxuICAgICAge3Nob3dMYWJlbCA/IChcclxuICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZm9ybS1sYWJlbCBmb250LXNlbWlib2xkXCIgc3R5bGU9e3sgY29sb3I6IFwiIzAwMjk2YmUwXCIgfX0+XHJcbiAgICAgICAgICB7bGFiZWx9XHJcbiAgICAgICAgPC9sYWJlbD5cclxuICAgICAgKSA6IG51bGx9XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmVcIj5cclxuICAgICAgICA8ZGl2XHJcbiAgICAgICAgICByZWY9e2JveFJlZn1cclxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcclxuICAgICAgICAgICAgXCJyZWxhdGl2ZSB3LWZ1bGwgcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYmctd2hpdGUgdGV4dC1sZWZ0IGZvY3VzLXdpdGhpbjpib3JkZXItcHJpbWFyeSBmb2N1cy13aXRoaW46cmluZy0yIGZvY3VzLXdpdGhpbjpyaW5nLXByaW1hcnkgZm9jdXMtd2l0aGluOnJpbmctb2Zmc2V0LXdoaXRlIHNtOnRleHQtc21cIixcclxuICAgICAgICAgICAgcmVhZE9ubHlNb2RlID8gXCJpbmQtcmVhZG9ubHktZmllbGRcIiA6IFwiXCJcclxuICAgICAgICAgICl9XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcclxuICAgICAgICAgICAgICBcInctZnVsbCByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBib3JkZXIgcHgtMyBweS0yIHByLTIwIHRleHQtc20gc206dGV4dC1iYXNlIGxlYWRpbmctNSBmb2N1czpvdXRsaW5lLWhpZGRlbiBmb2N1czpyaW5nLTIgZGlzYWJsZWQ6Ymctc2xhdGUtMTAwIGRpc2FibGVkOnRleHQtc2xhdGUtNTAwIGRpc2FibGVkOmJvcmRlci1zbGF0ZS0yMDAgZGlzYWJsZWQ6Y3Vyc29yLW5vdC1hbGxvd2VkXCIsXHJcbiAgICAgICAgICAgICAgXCJib3JkZXItc2xhdGUtMjAwIGZvY3VzOnJpbmctcHJpbWFyeSBmb2N1czpib3JkZXItcHJpbWFyeVwiLFxyXG4gICAgICAgICAgICAgIHJlYWRPbmx5TW9kZSA/IFwiaW5kLXJlYWRvbmx5LWZpZWxkXCIgOiBcInRleHQtc2xhdGUtOTAwXCJcclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgc3R5bGU9e3sgY29sb3I6IHZhbHVlQ29sb3IgfX1cclxuICAgICAgICAgICAgdmFsdWU9e3F1ZXJ5fVxyXG4gICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgY29uc3QgbmV4dFZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xyXG4gICAgICAgICAgICAgIHNldEFjdGl2ZUluZGV4KDApO1xyXG4gICAgICAgICAgICAgIHNldFNob3dOb3RGb3VuZFN0YXRlKGZhbHNlKTtcclxuICAgICAgICAgICAgICBvbkNoYW5nZShuZXh0VmFsdWUpO1xyXG4gICAgICAgICAgICAgIGlmIChuZXh0VmFsdWUudHJpbSgpLnRvTG93ZXJDYXNlKCkgIT09IGxhc3RTZWFyY2hlZFRlcm0pIHtcclxuICAgICAgICAgICAgICAgIHNldE9wZW4oZmFsc2UpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgb25Gb2N1cz17KCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoIXJlYWRPbmx5TW9kZSAmJiAoZmlsdGVyZWQubGVuZ3RoID4gMCB8fCBoYXNMb2FkZWRPcGVuU2VhcmNoT3B0aW9ucyB8fCBzaG93Tm90Rm91bmRTdGF0ZSkpIHtcbiAgICAgICAgICAgICAgICBzZXRPcGVuKHRydWUpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgb25LZXlEb3duPXsoZXZlbnQpID0+XHJcbiAgICAgICAgICAgICAgaGFuZGxlQ29tYm9ib3hLZXlEb3duKGV2ZW50LCB7XHJcbiAgICAgICAgICAgICAgICBpc09wZW46IG9wZW4sXHJcbiAgICAgICAgICAgICAgICBzZXRPcGVuLFxyXG4gICAgICAgICAgICAgICAgb3B0aW9uQ291bnQ6IGZpbHRlcmVkLmxlbmd0aCxcclxuICAgICAgICAgICAgICAgIHNldEFjdGl2ZUluZGV4LFxyXG4gICAgICAgICAgICAgICAgb25FbnRlcldoZW5PcGVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIGlmIChmaWx0ZXJlZC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0T3B0aW9uKGZpbHRlcmVkW3Jlc29sdmVkQWN0aXZlSW5kZXhdID8/IGZpbHRlcmVkWzBdKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgdm9pZCBydW5TZWFyY2goKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBvbkVudGVyV2hlbkNsb3NlZDogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICB2b2lkIHJ1blNlYXJjaCgpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG9wZW5PbkFycm93OiB0cnVlLFxyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxyXG4gICAgICAgICAgICByZWFkT25seT17cmVhZE9ubHl9XHJcbiAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cclxuICAgICAgICAgICAgYXJpYS1sYWJlbD17bGFiZWx9XHJcbiAgICAgICAgICAgIGFyaWEtZXhwYW5kZWQ9e29wZW59XG4gICAgICAgICAgICBhcmlhLWNvbnRyb2xzPXtsaXN0SWR9XHJcbiAgICAgICAgICAgIGFyaWEtYWN0aXZlZGVzY2VuZGFudD17YWN0aXZlSWR9XHJcbiAgICAgICAgICAvPlxyXG5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQteS0wIHJpZ2h0LTAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgcHItMlwiPlxyXG4gICAgICAgICAgICB7bG9hZGluZyA/IChcclxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBweC0xLjVcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cclxuICAgICAgICAgICAgICAgIDxTcGlubmVyIHNpemU9XCJoLTQgdy00XCIgLz5cclxuICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICkgOiBudWxsfVxyXG5cclxuICAgICAgICAgICAge3Nob3dTZWFyY2hJY29uID8gKFxyXG4gICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgcC0xLjUgdGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC1zbGF0ZS01MDBcIlxyXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICB2b2lkIHJ1blNlYXJjaCgpO1xyXG4gICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2luZFQoXCJDb21tb25fU2VhcmNoXCIsIFwiU2VhcmNoXCIpfVxyXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3JlYWRPbmx5TW9kZX1cclxuICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBmaWxsPVwibm9uZVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBzdHJva2VXaWR0aD17MS41fSBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBjbGFzc05hbWU9XCJzaXplLTVcIj5cbiAgICAgICAgICAgICAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwibTE1Ljc1IDE1Ljc1LTIuNDg5LTIuNDg5bTAgMGEzLjM3NSAzLjM3NSAwIDEgMC00Ljc3My00Ljc3MyAzLjM3NSAzLjM3NSAwIDAgMCA0Ljc3NCA0Ljc3NFpNMjEgMTJhOSA5IDAgMSAxLTE4IDAgOSA5IDAgMCAxIDE4IDBaXCIgLz5cclxuICAgICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICApIDogbnVsbH1cclxuXHJcbiAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBwLTEuNSB0ZXh0LXNsYXRlLTUwMCBob3Zlcjp0ZXh0LXNsYXRlLTYwMFwiXHJcbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlYWRPbmx5TW9kZSkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgaWYgKG9wZW4pIHtcbiAgICAgICAgICAgICAgICAgIHNldE9wZW4oZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChvcGVuU2VhcmNoTW9kZSA9PT0gXCJlbXB0eS1xdWVyeVwiICYmIGxvYWRPbk9wZW4pIHtcbiAgICAgICAgICAgICAgICAgIGlmIChoYXNMb2FkZWRPcGVuU2VhcmNoT3B0aW9ucyB8fCAobG9hZGVkU2VhcmNoVGVybUtleSA9PT0gXCJcIiAmJiBzaG93Tm90Rm91bmRTdGF0ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0T3Blbih0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICB2b2lkIHJ1bk9wZW5TZWFyY2goKTtcbiAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoZmlsdGVyZWQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgc2V0T3Blbih0cnVlKTtcbiAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoIXF1ZXJ5LnRyaW0oKSAmJiBsb2FkT25PcGVuKSB7XG4gICAgICAgICAgICAgICAgICB2b2lkIHJ1bk9wZW5TZWFyY2goKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgIGFyaWEtbGFiZWw9e29wZW4gPyBpbmRUKFwiRHJvcGRvd25fSGlkZU9wdGlvbnNcIiwgXCJIaWRlIG9wdGlvbnNcIikgOiBpbmRUKFwiRHJvcGRvd25fU2hvd09wdGlvbnNcIiwgXCJTaG93IG9wdGlvbnNcIil9XHJcbiAgICAgICAgICAgICAgZGlzYWJsZWQ9e3JlYWRPbmx5TW9kZX1cclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIHtvcGVuID8gPENoZXZyb25VcFN2ZyBjbGFzc05hbWU9XCJzaXplLTVcIiAvPiA6IDxDaGV2cm9uRG93blN2ZyBjbGFzc05hbWU9XCJzaXplLTVcIiAvPn1cbiAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPEZsb2F0aW5nTGlzdFxyXG4gICAgICAgICAgYW5jaG9yUmVmPXtib3hSZWZ9XHJcbiAgICAgICAgICBvcGVuPXtvcGVufVxyXG4gICAgICAgICAgekluZGV4PXszNjAwMDB9XHJcbiAgICAgICAgICBtYXhIZWlnaHRDbGFzcz1cIm1heC1oLTcyXCJcclxuICAgICAgICAgIHJvbGU9XCJsaXN0Ym94XCJcclxuICAgICAgICAgIHJvdW5kZWRDbGFzcz1cInJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldXCJcclxuICAgICAgICAgIHBhbmVsQ2xhc3NOYW1lPXtwYW5lbENsYXNzTmFtZX1cclxuICAgICAgICA+XHJcbiAgICAgICAgICA8ZGl2IGlkPXtsaXN0SWR9IHJlZj17bGlzdFJlZn0+XHJcbiAgICAgICAgICAgIHtzaG93TG9hZGluZ09ubHlTdGF0ZSA/IChcclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB4LTQgcHktMiB0ZXh0LXNtIHRleHQtc2xhdGUtNTAwXCI+e2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9PC9kaXY+XHJcbiAgICAgICAgICAgICkgOiBzaG93Tm90Rm91bmRTdGF0ZSA/IChcclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB4LTQgcHktMiB0ZXh0LXNtIHRleHQtc2xhdGUtNTAwXCI+e2luZFQoXCJDb21tb25fTm90Rm91bmRcIiwgXCJOb3QgZm91bmRcIil9PC9kaXY+XHJcbiAgICAgICAgICAgICkgOiBmaWx0ZXJlZC5sZW5ndGggPT09IDAgPyAoXHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJweC00IHB5LTIgdGV4dC1zbSB0ZXh0LXNsYXRlLTUwMFwiPntpbmRUKFwiQ29tbW9uX05vRGF0YVwiLCBcIk5vIGRhdGFcIil9PC9kaXY+XHJcbiAgICAgICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgICAgPD5cclxuICAgICAgICAgICAgICAgIHtmaWx0ZXJlZC5tYXAoKG9wdGlvbiwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgY29uc3QgaXNBY3RpdmUgPSBpbmRleCA9PT0gcmVzb2x2ZWRBY3RpdmVJbmRleDtcclxuICAgICAgICAgICAgICAgICAgY29uc3Qgb3B0aW9uSWQgPSBvcHRpb24udmFsdWUgfHwgYCR7aW5kZXh9YDtcclxuICAgICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgICAgICAgICAgICAgIGtleT17b3B0aW9uSWR9XHJcbiAgICAgICAgICAgICAgICAgICAgICBpZD17YCR7aWRCYXNlfS1vcHQtJHtvcHRpb25JZH1gfVxyXG4gICAgICAgICAgICAgICAgICAgICAgcm9sZT1cIm9wdGlvblwiXHJcbiAgICAgICAgICAgICAgICAgICAgICBhcmlhLXNlbGVjdGVkPXtpc0FjdGl2ZX1cclxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJyZWxhdGl2ZSBmbGV4IHctZnVsbCBjdXJzb3ItZGVmYXVsdCBzZWxlY3Qtbm9uZSBpdGVtcy1zdGFydCBweS0yIHB4LTMgdGV4dC1sZWZ0IHRleHQtc21cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNBY3RpdmUgPyBcImJnLXByaW1hcnkgdGV4dC13aGl0ZVwiIDogXCJ0ZXh0LXNsYXRlLTkwMFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgICAgICAgICAgb25Nb3VzZUVudGVyPXsoKSA9PiBzZXRBY3RpdmVJbmRleChpbmRleCl9XHJcbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZWxlY3RPcHRpb24ob3B0aW9uKX1cclxuICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbWVkaXVtXCI+e29wdGlvbi50aXRsZSB8fCBvcHRpb24udmFsdWV9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7b3B0aW9uLnN1YnRpdGxlID8gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcInRleHQteHNcIiwgaXNBY3RpdmUgPyBcInRleHQtd2hpdGUvOTBcIiA6IFwidGV4dC1zbGF0ZS01MDBcIil9PntvcHRpb24uc3VidGl0bGV9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICApIDogbnVsbH1cclxuICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH0pfVxyXG4gICAgICAgICAgICAgICAge2xvYWRpbmcgPyAoXHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHgtNCBweS0yIHRleHQteHMgdGV4dC1zbGF0ZS01MDAgYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTEwMFwiPntpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgKSA6IG51bGx9XHJcbiAgICAgICAgICAgICAgPC8+XHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L0Zsb2F0aW5nTGlzdD5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgUmVtb3RlU2VhcmNoQ29tYm9ib3g7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtQkFBZ0M7QUFvQjFCO0FBWk4sSUFBTSx3QkFBd0IsQ0FBQyxVQUFzRDtBQUNuRixTQUFPLE9BQU8sU0FBUyxFQUFFLEVBQUUsS0FBSyxFQUFFLFlBQVk7QUFDaEQ7QUFHQSxJQUFNLDBCQUEwQixDQUFDLEVBQUUsY0FBYyxZQUFZLElBQUksZ0JBQWdCLFVBQVUsTUFBb0M7QUFDN0gsUUFBTSxpQkFBaUIsc0JBQXNCLFlB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
