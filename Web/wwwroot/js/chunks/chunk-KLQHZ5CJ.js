import {
  handleComboboxKeyDown
} from "./chunk-YMDESVRK.js";
import {
  ChevronDownSvg,
  ChevronUpSvg,
  FloatingList_default,
  useOutsideClick
} from "./chunk-SSILOGLX.js";
import {
  normalizeCardTitleText,
  safeText
} from "./chunk-63PNSQ5Z.js";
import {
  Spinner_default,
  classNames
} from "./chunk-UNQYUM6B.js";
import {
  require_jsx_runtime,
  require_react
} from "./chunk-2NKOKBT5.js";
import {
  indT
} from "./chunk-PNIKV5DC.js";
import {
  __toESM
} from "./chunk-W7NC74ZX.js";

// Web/wwwroot/react/src/pages/gastos/components/ExpenseTimelineCard.tsx
var import_jsx_runtime = __toESM(require_jsx_runtime());
var ExpenseTimelineCard = ({
  dateParts,
  title,
  amountText,
  onOpen,
  titleClassName = "timeline-name",
  amountClassName = "expense-sheet-card__amount text-right tabular-nums",
  statusClassName,
  statusLabel,
  subtitle = "",
  subtitleContent,
  subtitleClassName = "expense-sheet-card__subtitle",
  statusIcon,
  statusIconClassName = "expense-sheet-card__status-icon",
  datePanelContent,
  interactionProps
}) => {
  const safeTitle = normalizeCardTitleText(title, "-");
  const safeAmount = amountText || "-";
  const safeSubtitle = safeText(subtitle);
  const {
    onClick: customOnClick,
    onKeyDown: customOnKeyDown,
    role: customRole,
    tabIndex: customTabIndex,
    ...restInteractionProps
  } = interactionProps || {};
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "button",
    {
      type: "button",
      className: "timeline-card timeline-card--clickable expense-timeline-card text-left",
      role: customRole,
      tabIndex: typeof customTabIndex === "number" ? customTabIndex : 0,
      onClick: customOnClick ?? onOpen,
      onKeyDown: customOnKeyDown,
      ...restInteractionProps,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "timeline-date-panel expense-timeline-card__date-panel flex flex-col items-center justify-center gap-1 border-r border-[#e2e8f0] bg-[#f8fafc] text-[#00296be0]", children: datePanelContent ? datePanelContent : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-xs font-semibold tracking-[0.2em] text-[#00296bb8]", children: dateParts.year }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-xs font-semibold uppercase tracking-[0.2em] text-[#00296bb8]", children: dateParts.month }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-2xl font-semibold text-primary", children: dateParts.day })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "timeline-card__content expense-timeline-card__content flex-1", children: [
          statusClassName ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: statusClassName, title: statusLabel, "aria-label": statusLabel }) : null,
          statusIcon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: statusIconClassName, role: "group", "aria-label": statusLabel || void 0, children: statusIcon }) : null,
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: titleClassName, "data-fulltext": safeTitle, children: safeTitle }),
          subtitleContent || safeSubtitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: subtitleClassName, "data-fulltext": safeSubtitle, children: subtitleContent || safeSubtitle }) : null,
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: amountClassName, "data-fulltext": safeAmount, children: safeAmount })
        ] })
      ]
    }
  );
};
var ExpenseTimelineCard_default = ExpenseTimelineCard;

// Web/wwwroot/react/src/pages/gastos/components/ExpenseCurrencyFlagIcon.tsx
var import_react = __toESM(require_react());
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var normalizeCurrencyCode = (value) => {
  return String(value || "").trim().toUpperCase();
};
var ExpenseCurrencyFlagIcon = ({ currencyCode, className = "", sizeClassName = "h-4 w-4" }) => {
  const normalizedCode = normalizeCurrencyCode(currencyCode);
  const [failedCode, setFailedCode] = (0, import_react.useState)("");
  const loadFailed = !!normalizedCode && failedCode === normalizedCode;
  if (!normalizedCode || loadFailed) {
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      "span",
      {
        "aria-hidden": "true",
        className: `inline-flex items-center justify-center rounded-[var(--radius-xl)] text-[10px] font-semibold leading-none text-slate-500 ${sizeClassName} ${className}`.trim(),
        children: "$"
      }
    );
  }
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
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
var compactActionButtonClassName = "flex h-8 w-6 items-center justify-center p-0";
var RemoteSearchCombobox = ({
  label,
  placeholder,
  value,
  onChange,
  onCommit,
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
  containerClassName = "space-y-2",
  labelClassName = "form-label font-semibold",
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
    onCommit?.(nextValue);
    setLastSearchedTerm(nextValue.toLowerCase());
    setOpen(false);
  };
  const queryKey = query.trim().toLowerCase();
  const showSearchIcon = !readOnlyMode && !loading && canSearchTerm(query) && queryKey !== lastSearchedTerm;
  const listId = `${idBase}-options`;
  const activeId = open && filtered[resolvedActiveIndex] ? `${idBase}-opt-${filtered[resolvedActiveIndex].value}` : void 0;
  const showLoadingOnlyState = loading && filtered.length === 0;
  const inputActionPaddingClassName = showSearchIcon || loading ? "pr-14" : "pr-9";
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: containerClassName, ref: containerRef, children: [
    showLabel ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("label", { className: labelClassName, style: { color: "#00296be0" }, children: label }) : null,
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "relative", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
        "div",
        {
          ref: boxRef,
          className: classNames(
            "relative w-full rounded-[var(--radius-xl)] bg-white text-left focus-within:border-primary focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-white sm:text-sm",
            readOnlyMode ? "ind-readonly-field" : ""
          ),
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "input",
              {
                className: classNames(
                  "w-full rounded-[var(--radius-xl)] border px-3 py-2 text-sm sm:text-base leading-5 focus:outline-hidden focus:ring-2 disabled:bg-slate-100 disabled:text-slate-500 disabled:border-slate-200 disabled:cursor-not-allowed",
                  inputActionPaddingClassName,
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
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "absolute inset-y-0 right-1 flex items-center gap-0", children: [
              loading ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "flex h-8 w-6 items-center justify-center", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Spinner_default, { size: "h-4 w-4" }) }) : null,
              showSearchIcon ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                "button",
                {
                  type: "button",
                  className: `${compactActionButtonClassName} text-slate-400 hover:text-slate-500`,
                  onClick: () => {
                    void runSearch();
                  },
                  "aria-label": indT("Common_Search", "Search"),
                  disabled: readOnlyMode,
                  children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: "size-4", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" }) })
                }
              ) : null,
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                "button",
                {
                  type: "button",
                  className: `${compactActionButtonClassName} text-slate-500 hover:text-slate-600`,
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
                  children: open ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ChevronUpSvg, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ChevronDownSvg, { className: "size-4" })
                }
              )
            ] })
          ]
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        FloatingList_default,
        {
          anchorRef: boxRef,
          open,
          zIndex: 36e4,
          maxHeightClass: "max-h-72",
          role: "listbox",
          roundedClass: "rounded-[var(--radius-xl)]",
          panelClassName,
          children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { id: listId, ref: listRef, children: showLoadingOnlyState ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "px-4 py-2 text-sm text-slate-500", children: indT("Common_Loading", "Loading") }) : showNotFoundState ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "px-4 py-2 text-sm text-slate-500", children: indT("Common_NotFound", "Not found") }) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "px-4 py-2 text-sm text-slate-500", children: indT("Common_NoData", "No data") }) : /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
            filtered.map((option, index) => {
              const isActive = index === resolvedActiveIndex;
              const optionId = option.value || `${index}`;
              return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
                  children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: "flex flex-col", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "font-medium", children: option.title || option.value }),
                    option.subtitle ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: classNames("text-xs", isActive ? "text-white/90" : "text-slate-500"), children: option.subtitle }) : null
                  ] })
                },
                optionId
              );
            }),
            loading ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "px-4 py-2 text-xs text-slate-500 border-t border-slate-100", children: indT("Common_Loading", "Loading") }) : null
          ] }) })
        }
      )
    ] })
  ] });
};
var RemoteSearchCombobox_default = RemoteSearchCombobox;

export {
  ExpenseCurrencyFlagIcon_default,
  RemoteSearchCombobox_default,
  ExpenseTimelineCard_default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VUaW1lbGluZUNhcmQudHN4IiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlQ3VycmVuY3lGbGFnSWNvbi50c3giLCAiLi4vLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9SZW1vdGVTZWFyY2hDb21ib2JveC50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlRGF0ZVBhcnRzIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcbmltcG9ydCB7IG5vcm1hbGl6ZUNhcmRUaXRsZVRleHQsIHNhZmVUZXh0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcblxyXG50eXBlIEV4cGVuc2VUaW1lbGluZUNhcmRJbnRlcmFjdGlvblByb3BzID0gUGljazxcclxuICBSZWFjdC5CdXR0b25IVE1MQXR0cmlidXRlczxIVE1MQnV0dG9uRWxlbWVudD4sXHJcbiAgfCBcImFyaWEtbGFiZWxcIlxyXG4gIHwgXCJhcmlhLXByZXNzZWRcIlxyXG4gIHwgXCJvbkNsaWNrXCJcclxuICB8IFwib25Db250ZXh0TWVudVwiXHJcbiAgfCBcIm9uS2V5RG93blwiXHJcbiAgfCBcIm9uUG9pbnRlckNhbmNlbFwiXHJcbiAgfCBcIm9uUG9pbnRlckRvd25cIlxyXG4gIHwgXCJvblBvaW50ZXJNb3ZlXCJcclxuICB8IFwib25Qb2ludGVyVXBcIlxyXG4gIHwgXCJyb2xlXCJcclxuICB8IFwidGFiSW5kZXhcIlxyXG4+O1xyXG5cclxudHlwZSBFeHBlbnNlVGltZWxpbmVDYXJkUHJvcHMgPSB7XHJcbiAgZGF0ZVBhcnRzOiBFeHBlbnNlRGF0ZVBhcnRzO1xyXG4gIHRpdGxlOiBzdHJpbmc7XHJcbiAgYW1vdW50VGV4dDogc3RyaW5nO1xyXG4gIG9uT3BlbjogKCkgPT4gdm9pZDtcclxuICB0aXRsZUNsYXNzTmFtZT86IHN0cmluZztcclxuICBhbW91bnRDbGFzc05hbWU/OiBzdHJpbmc7XHJcbiAgc3RhdHVzQ2xhc3NOYW1lPzogc3RyaW5nO1xyXG4gIHN0YXR1c0xhYmVsPzogc3RyaW5nO1xyXG4gIHN1YnRpdGxlPzogc3RyaW5nO1xyXG4gIHN1YnRpdGxlQ29udGVudD86IFJlYWN0LlJlYWN0Tm9kZTtcclxuICBzdWJ0aXRsZUNsYXNzTmFtZT86IHN0cmluZztcclxuICBzdGF0dXNJY29uPzogUmVhY3QuUmVhY3ROb2RlO1xyXG4gIHN0YXR1c0ljb25DbGFzc05hbWU/OiBzdHJpbmc7XHJcbiAgZGF0ZVBhbmVsQ29udGVudD86IFJlYWN0LlJlYWN0Tm9kZTtcclxuICBpbnRlcmFjdGlvblByb3BzPzogRXhwZW5zZVRpbWVsaW5lQ2FyZEludGVyYWN0aW9uUHJvcHM7XHJcbn07XHJcblxyXG4vLyBSZXVzYWJsZSBjbGlja2FibGUgdGltZWxpbmUgY2FyZCBmb3IgZXhwZW5zZSBzaGVldHMgYW5kIGV4cGVuc2UgbGluZXMuXHJcbmNvbnN0IEV4cGVuc2VUaW1lbGluZUNhcmQgPSAoe1xyXG4gIGRhdGVQYXJ0cyxcclxuICB0aXRsZSxcclxuICBhbW91bnRUZXh0LFxyXG4gIG9uT3BlbixcclxuICB0aXRsZUNsYXNzTmFtZSA9IFwidGltZWxpbmUtbmFtZVwiLFxyXG4gIGFtb3VudENsYXNzTmFtZSA9IFwiZXhwZW5zZS1zaGVldC1jYXJkX19hbW91bnQgdGV4dC1yaWdodCB0YWJ1bGFyLW51bXNcIixcclxuICBzdGF0dXNDbGFzc05hbWUsXHJcbiAgc3RhdHVzTGFiZWwsXHJcbiAgc3VidGl0bGUgPSBcIlwiLFxyXG4gIHN1YnRpdGxlQ29udGVudCxcclxuICBzdWJ0aXRsZUNsYXNzTmFtZSA9IFwiZXhwZW5zZS1zaGVldC1jYXJkX19zdWJ0aXRsZVwiLFxyXG4gIHN0YXR1c0ljb24sXHJcbiAgc3RhdHVzSWNvbkNsYXNzTmFtZSA9IFwiZXhwZW5zZS1zaGVldC1jYXJkX19zdGF0dXMtaWNvblwiLFxyXG4gIGRhdGVQYW5lbENvbnRlbnQsXHJcbiAgaW50ZXJhY3Rpb25Qcm9wcyxcclxufTogRXhwZW5zZVRpbWVsaW5lQ2FyZFByb3BzKSA9PiB7XHJcbiAgY29uc3Qgc2FmZVRpdGxlID0gbm9ybWFsaXplQ2FyZFRpdGxlVGV4dCh0aXRsZSwgXCItXCIpO1xyXG4gIGNvbnN0IHNhZmVBbW91bnQgPSBhbW91bnRUZXh0IHx8IFwiLVwiO1xyXG4gIGNvbnN0IHNhZmVTdWJ0aXRsZSA9IHNhZmVUZXh0KHN1YnRpdGxlKTtcclxuICBjb25zdCB7XHJcbiAgICBvbkNsaWNrOiBjdXN0b21PbkNsaWNrLFxyXG4gICAgb25LZXlEb3duOiBjdXN0b21PbktleURvd24sXHJcbiAgICByb2xlOiBjdXN0b21Sb2xlLFxyXG4gICAgdGFiSW5kZXg6IGN1c3RvbVRhYkluZGV4LFxyXG4gICAgLi4ucmVzdEludGVyYWN0aW9uUHJvcHNcclxuICB9ID0gaW50ZXJhY3Rpb25Qcm9wcyB8fCB7fTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxidXR0b25cclxuICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgIGNsYXNzTmFtZT1cInRpbWVsaW5lLWNhcmQgdGltZWxpbmUtY2FyZC0tY2xpY2thYmxlIGV4cGVuc2UtdGltZWxpbmUtY2FyZCB0ZXh0LWxlZnRcIlxyXG4gICAgICByb2xlPXtjdXN0b21Sb2xlfVxyXG4gICAgICB0YWJJbmRleD17dHlwZW9mIGN1c3RvbVRhYkluZGV4ID09PSBcIm51bWJlclwiID8gY3VzdG9tVGFiSW5kZXggOiAwfVxyXG4gICAgICBvbkNsaWNrPXtjdXN0b21PbkNsaWNrID8/IG9uT3Blbn1cclxuICAgICAgb25LZXlEb3duPXtjdXN0b21PbktleURvd259XHJcbiAgICAgIHsuLi5yZXN0SW50ZXJhY3Rpb25Qcm9wc31cclxuICAgID5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aW1lbGluZS1kYXRlLXBhbmVsIGV4cGVuc2UtdGltZWxpbmUtY2FyZF9fZGF0ZS1wYW5lbCBmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMSBib3JkZXItciBib3JkZXItWyNlMmU4ZjBdIGJnLVsjZjhmYWZjXSB0ZXh0LVsjMDAyOTZiZTBdXCI+XHJcbiAgICAgICAge2RhdGVQYW5lbENvbnRlbnQgPyAoXHJcbiAgICAgICAgICBkYXRlUGFuZWxDb250ZW50XHJcbiAgICAgICAgKSA6IChcclxuICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LXNlbWlib2xkIHRyYWNraW5nLVswLjJlbV0gdGV4dC1bIzAwMjk2YmI4XVwiPntkYXRlUGFydHMueWVhcn08L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdXBwZXJjYXNlIHRyYWNraW5nLVswLjJlbV0gdGV4dC1bIzAwMjk2YmI4XVwiPntkYXRlUGFydHMubW9udGh9PC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC0yeGwgZm9udC1zZW1pYm9sZCB0ZXh0LXByaW1hcnlcIj57ZGF0ZVBhcnRzLmRheX08L2Rpdj5cclxuICAgICAgICAgIDwvPlxyXG4gICAgICAgICl9XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpbWVsaW5lLWNhcmRfX2NvbnRlbnQgZXhwZW5zZS10aW1lbGluZS1jYXJkX19jb250ZW50IGZsZXgtMVwiPlxyXG4gICAgICAgIHtzdGF0dXNDbGFzc05hbWUgPyA8c3BhbiBjbGFzc05hbWU9e3N0YXR1c0NsYXNzTmFtZX0gdGl0bGU9e3N0YXR1c0xhYmVsfSBhcmlhLWxhYmVsPXtzdGF0dXNMYWJlbH0gLz4gOiBudWxsfVxyXG4gICAgICAgIHtzdGF0dXNJY29uID8gKFxyXG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtzdGF0dXNJY29uQ2xhc3NOYW1lfSByb2xlPVwiZ3JvdXBcIiBhcmlhLWxhYmVsPXtzdGF0dXNMYWJlbCB8fCB1bmRlZmluZWR9PlxyXG4gICAgICAgICAgICB7c3RhdHVzSWNvbn1cclxuICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICApIDogbnVsbH1cclxuICAgICAgICA8cCBjbGFzc05hbWU9e3RpdGxlQ2xhc3NOYW1lfSBkYXRhLWZ1bGx0ZXh0PXtzYWZlVGl0bGV9PlxyXG4gICAgICAgICAge3NhZmVUaXRsZX1cclxuICAgICAgICA8L3A+XHJcbiAgICAgICAge3N1YnRpdGxlQ29udGVudCB8fCBzYWZlU3VidGl0bGUgPyAoXHJcbiAgICAgICAgICA8cCBjbGFzc05hbWU9e3N1YnRpdGxlQ2xhc3NOYW1lfSBkYXRhLWZ1bGx0ZXh0PXtzYWZlU3VidGl0bGV9PlxyXG4gICAgICAgICAgICB7c3VidGl0bGVDb250ZW50IHx8IHNhZmVTdWJ0aXRsZX1cclxuICAgICAgICAgIDwvcD5cclxuICAgICAgICApIDogbnVsbH1cclxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2Ftb3VudENsYXNzTmFtZX0gZGF0YS1mdWxsdGV4dD17c2FmZUFtb3VudH0+XHJcbiAgICAgICAgICB7c2FmZUFtb3VudH1cclxuICAgICAgICA8L3NwYW4+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9idXR0b24+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VUaW1lbGluZUNhcmQ7XHJcbiIsICJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcblxyXG50eXBlIEV4cGVuc2VDdXJyZW5jeUZsYWdJY29uUHJvcHMgPSB7XHJcbiAgY3VycmVuY3lDb2RlOiBzdHJpbmc7XHJcbiAgY2xhc3NOYW1lPzogc3RyaW5nO1xyXG4gIHNpemVDbGFzc05hbWU/OiBzdHJpbmc7XHJcbn07XHJcblxyXG5jb25zdCBub3JtYWxpemVDdXJyZW5jeUNvZGUgPSAodmFsdWU6IHN0cmluZyB8IG51bWJlciB8IG51bGwgfCB1bmRlZmluZWQpOiBzdHJpbmcgPT4ge1xyXG4gIHJldHVybiBTdHJpbmcodmFsdWUgfHwgXCJcIikudHJpbSgpLnRvVXBwZXJDYXNlKCk7XHJcbn07XHJcblxyXG4vLyBSZW5kZXJzIGEgY3VycmVuY3kgZmxhZyBmcm9tIGxvY2FsIGFzc2V0cyB3aXRoIGEgc3RhYmxlIGZhbGxiYWNrIGljb24uXHJcbmNvbnN0IEV4cGVuc2VDdXJyZW5jeUZsYWdJY29uID0gKHsgY3VycmVuY3lDb2RlLCBjbGFzc05hbWUgPSBcIlwiLCBzaXplQ2xhc3NOYW1lID0gXCJoLTQgdy00XCIgfTogRXhwZW5zZUN1cnJlbmN5RmxhZ0ljb25Qcm9wcykgPT4ge1xuICBjb25zdCBub3JtYWxpemVkQ29kZSA9IG5vcm1hbGl6ZUN1cnJlbmN5Q29kZShjdXJyZW5jeUNvZGUpO1xuICBjb25zdCBbZmFpbGVkQ29kZSwgc2V0RmFpbGVkQ29kZV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgbG9hZEZhaWxlZCA9ICEhbm9ybWFsaXplZENvZGUgJiYgZmFpbGVkQ29kZSA9PT0gbm9ybWFsaXplZENvZGU7XG5cclxuICBpZiAoIW5vcm1hbGl6ZWRDb2RlIHx8IGxvYWRGYWlsZWQpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxzcGFuXHJcbiAgICAgICAgYXJpYS1oaWRkZW49XCJ0cnVlXCJcclxuICAgICAgICBjbGFzc05hbWU9e2BpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gdGV4dC1bMTBweF0gZm9udC1zZW1pYm9sZCBsZWFkaW5nLW5vbmUgdGV4dC1zbGF0ZS01MDAgJHtzaXplQ2xhc3NOYW1lfSAke2NsYXNzTmFtZX1gLnRyaW0oKX1cbiAgICAgID5cclxuICAgICAgICAkXHJcbiAgICAgIDwvc3Bhbj5cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGltZ1xyXG4gICAgICBzcmM9e2AvYXNzZXRzL2ZsYWdzLyR7ZW5jb2RlVVJJQ29tcG9uZW50KG5vcm1hbGl6ZWRDb2RlKX0uc3ZnYH1cclxuICAgICAgYWx0PVwiXCJcbiAgICAgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiXG4gICAgICBsb2FkaW5nPVwibGF6eVwiXG4gICAgICBjbGFzc05hbWU9e2Ake3NpemVDbGFzc05hbWV9IHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIG9iamVjdC1jb250YWluICR7Y2xhc3NOYW1lfWAudHJpbSgpfVxuICAgICAgb25FcnJvcj17KCkgPT4gc2V0RmFpbGVkQ29kZShub3JtYWxpemVkQ29kZSl9XG4gICAgLz5cbiAgKTtcbn07XG5cclxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZUN1cnJlbmN5RmxhZ0ljb247XHJcbiIsICJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgRmxvYXRpbmdMaXN0IGZyb20gXCIuL0Zsb2F0aW5nTGlzdC50c3hcIjtcclxuaW1wb3J0IFNwaW5uZXIgZnJvbSBcIi4vU3Bpbm5lci50c3hcIjtcclxuaW1wb3J0IHsgQ2hldnJvbkRvd25TdmcsIENoZXZyb25VcFN2ZyB9IGZyb20gXCIuL2NoZXZyb25zLnRzeFwiO1xyXG5pbXBvcnQgeyBoYW5kbGVDb21ib2JveEtleURvd24gfSBmcm9tIFwiLi4vLi4vaG9va3MvdXNlQ29tYm9ib3hLZXlib2FyZC50c1wiO1xyXG5pbXBvcnQgeyB1c2VPdXRzaWRlQ2xpY2sgfSBmcm9tIFwiLi4vLi4vaG9va3MvdXNlT3V0c2lkZUNsaWNrLnRzXCI7XHJcbmltcG9ydCB7IGNsYXNzTmFtZXMgfSBmcm9tIFwiLi4vLi4vdXRpbHMvY2xhc3NOYW1lcy50c1wiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuXHJcbmV4cG9ydCB0eXBlIFJlbW90ZVNlYXJjaE9wdGlvbiA9IHtcclxuICB2YWx1ZTogc3RyaW5nO1xyXG4gIHRpdGxlPzogc3RyaW5nO1xyXG4gIHN1YnRpdGxlPzogc3RyaW5nO1xyXG59O1xyXG5cclxudHlwZSBSZW1vdGVTZWFyY2hPcGVuU2VhcmNoTW9kZSA9IFwiY3VycmVudC12YWx1ZVwiIHwgXCJlbXB0eS1xdWVyeVwiO1xyXG5cclxudHlwZSBFeGVjdXRlU2VhcmNoT3B0aW9ucyA9IHtcclxuICBjbGVhclZhbHVlT25Ob1Jlc3VsdHM/OiBib29sZWFuO1xyXG59O1xyXG5cclxudHlwZSBSZW1vdGVTZWFyY2hDb21ib2JveFByb3BzID0ge1xyXG4gIGxhYmVsOiBzdHJpbmc7XHJcbiAgcGxhY2Vob2xkZXI6IHN0cmluZztcclxuICB2YWx1ZTogc3RyaW5nO1xyXG4gIG9uQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBvbkNvbW1pdD86ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIG9uU2VhcmNoOiAodGVybTogc3RyaW5nLCBzaWduYWw6IEFib3J0U2lnbmFsKSA9PiBQcm9taXNlPFJlbW90ZVNlYXJjaE9wdGlvbltdPjtcclxuICBvblNlYXJjaFBhZ2U/OiAoXHJcbiAgICB0ZXJtOiBzdHJpbmcsXHJcbiAgICBwYWdlOiBudW1iZXIsXHJcbiAgICBwYWdlU2l6ZTogbnVtYmVyLFxyXG4gICAgc2lnbmFsOiBBYm9ydFNpZ25hbFxyXG4gICkgPT4gUHJvbWlzZTx7IGl0ZW1zOiBSZW1vdGVTZWFyY2hPcHRpb25bXTsgdG90YWw/OiBudW1iZXIgfT47XHJcbiAgaWRCYXNlOiBzdHJpbmc7XHJcbiAgbWluU2VhcmNoTGVuZ3RoPzogbnVtYmVyO1xyXG4gIHBhZ2VTaXplPzogbnVtYmVyO1xyXG4gIGFsbG93RW1wdHlTZWFyY2g/OiBib29sZWFuO1xyXG4gIGxvYWRPbk9wZW4/OiBib29sZWFuO1xyXG4gIG9wZW5TZWFyY2hNb2RlPzogUmVtb3RlU2VhcmNoT3BlblNlYXJjaE1vZGU7XHJcbiAgaW5maW5pdGVTY3JvbGw/OiBib29sZWFuO1xyXG4gIGRpc2FibGVkPzogYm9vbGVhbjtcclxuICByZWFkT25seT86IGJvb2xlYW47XHJcbiAgc2hvd0xhYmVsPzogYm9vbGVhbjtcclxuICBjb250YWluZXJDbGFzc05hbWU/OiBzdHJpbmc7XHJcbiAgbGFiZWxDbGFzc05hbWU/OiBzdHJpbmc7XHJcbiAgcGFuZWxDbGFzc05hbWU/OiBzdHJpbmc7XHJcbn07XHJcblxyXG5jb25zdCB1bmlxdWVCeVZhbHVlID0gKGl0ZW1zOiBSZW1vdGVTZWFyY2hPcHRpb25bXSk6IFJlbW90ZVNlYXJjaE9wdGlvbltdID0+IHtcclxuICBjb25zdCBtYXAgPSBuZXcgTWFwPHN0cmluZywgUmVtb3RlU2VhcmNoT3B0aW9uPigpO1xyXG4gIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcyB8fCBbXSkge1xyXG4gICAgY29uc3Qga2V5ID0gU3RyaW5nKGl0ZW0udmFsdWUgfHwgXCJcIikudHJpbSgpO1xyXG4gICAgaWYgKCFrZXkpIGNvbnRpbnVlO1xyXG4gICAgaWYgKG1hcC5oYXMoa2V5KSkgY29udGludWU7XHJcbiAgICBtYXAuc2V0KGtleSwge1xyXG4gICAgICB2YWx1ZToga2V5LFxyXG4gICAgICB0aXRsZTogU3RyaW5nKGl0ZW0udGl0bGUgfHwgXCJcIikudHJpbSgpLFxyXG4gICAgICBzdWJ0aXRsZTogU3RyaW5nKGl0ZW0uc3VidGl0bGUgfHwgXCJcIikudHJpbSgpLFxyXG4gICAgfSk7XHJcbiAgfVxyXG4gIHJldHVybiBBcnJheS5mcm9tKG1hcC52YWx1ZXMoKSk7XHJcbn07XHJcblxyXG5jb25zdCBjb21wYWN0QWN0aW9uQnV0dG9uQ2xhc3NOYW1lID0gXCJmbGV4IGgtOCB3LTYgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHAtMFwiO1xyXG5cclxuLy8gR2VuZXJpYyByZW1vdGUtc2VhcmNoIGNvbWJvYm94IHRoYXQgc3VwcG9ydHMgbWFudWFsIHNlYXJjaCBhbmQgb3B0aW9uYWwgcGFnZWQgbG9hZGluZyBvbiBvcGVuLlxyXG5jb25zdCBSZW1vdGVTZWFyY2hDb21ib2JveCA9ICh7XHJcbiAgbGFiZWwsXHJcbiAgcGxhY2Vob2xkZXIsXHJcbiAgdmFsdWUsXHJcbiAgb25DaGFuZ2UsXHJcbiAgb25Db21taXQsXHJcbiAgb25TZWFyY2gsXHJcbiAgb25TZWFyY2hQYWdlLFxyXG4gIGlkQmFzZSxcclxuICBtaW5TZWFyY2hMZW5ndGggPSAyLFxyXG4gIHBhZ2VTaXplID0gMjAsXHJcbiAgYWxsb3dFbXB0eVNlYXJjaCA9IGZhbHNlLFxyXG4gIGxvYWRPbk9wZW4gPSBmYWxzZSxcclxuICBvcGVuU2VhcmNoTW9kZSA9IFwiY3VycmVudC12YWx1ZVwiLFxyXG4gIGluZmluaXRlU2Nyb2xsID0gZmFsc2UsXHJcbiAgZGlzYWJsZWQgPSBmYWxzZSxcclxuICByZWFkT25seSA9IGZhbHNlLFxyXG4gIHNob3dMYWJlbCA9IHRydWUsXHJcbiAgY29udGFpbmVyQ2xhc3NOYW1lID0gXCJzcGFjZS15LTJcIixcclxuICBsYWJlbENsYXNzTmFtZSA9IFwiZm9ybS1sYWJlbCBmb250LXNlbWlib2xkXCIsXHJcbiAgcGFuZWxDbGFzc05hbWUgPSBcInZpc2l0YXMtdHlwb2dyYXBoeVwiLFxyXG59OiBSZW1vdGVTZWFyY2hDb21ib2JveFByb3BzKSA9PiB7XHJcbiAgY29uc3QgcmVhZE9ubHlNb2RlID0gcmVhZE9ubHkgfHwgZGlzYWJsZWQ7XHJcbiAgY29uc3QgdmFsdWVDb2xvciA9IHJlYWRPbmx5TW9kZSA/IFwiIzY0NzQ4YlwiIDogXCIjMDAyOTZiZTBcIjtcclxuICBjb25zdCBbb3B0aW9ucywgc2V0T3B0aW9uc10gPSB1c2VTdGF0ZTxSZW1vdGVTZWFyY2hPcHRpb25bXT4oW10pO1xyXG4gIGNvbnN0IFtvcGVuLCBzZXRPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW2FjdGl2ZUluZGV4LCBzZXRBY3RpdmVJbmRleF0gPSB1c2VTdGF0ZSgwKTtcclxuICBjb25zdCBbbGFzdFNlYXJjaGVkVGVybSwgc2V0TGFzdFNlYXJjaGVkVGVybV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbc2hvd05vdEZvdW5kU3RhdGUsIHNldFNob3dOb3RGb3VuZFN0YXRlXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuXHJcbiAgY29uc3QgYWJvcnRSZWYgPSB1c2VSZWY8QWJvcnRDb250cm9sbGVyIHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgY29udGFpbmVyUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgYm94UmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgbGlzdFJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IGN1cnJlbnRQYWdlUmVmID0gdXNlUmVmKDApO1xyXG4gIGNvbnN0IGhhc01vcmVSZWYgPSB1c2VSZWYoZmFsc2UpO1xyXG4gIGNvbnN0IGxvYWRlZFNlYXJjaFRlcm1SZWYgPSB1c2VSZWYoXCJcIik7XHJcbiAgY29uc3QgbG9hZGluZ1JlZiA9IHVzZVJlZihmYWxzZSk7XHJcbiAgY29uc3QgcnVuTG9hZE1vcmVSZWYgPSB1c2VSZWY8KCgpID0+IFByb21pc2U8dm9pZD4pIHwgbnVsbD4obnVsbCk7XHJcblxyXG4gIHVzZU91dHNpZGVDbGljayhbY29udGFpbmVyUmVmLCBsaXN0UmVmXSwgKCkgPT4ge1xyXG4gICAgc2V0U2hvd05vdEZvdW5kU3RhdGUoZmFsc2UpO1xyXG4gICAgc2V0T3BlbihmYWxzZSk7XHJcbiAgfSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBhYm9ydFJlZi5jdXJyZW50Py5hYm9ydCgpO1xyXG4gICAgICBhYm9ydFJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgIH07XHJcbiAgfSwgW10pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgbG9hZGluZ1JlZi5jdXJyZW50ID0gbG9hZGluZztcclxuICB9LCBbbG9hZGluZ10pO1xyXG5cclxuICBjb25zdCBxdWVyeSA9IHZhbHVlIHx8IFwiXCI7XHJcbiAgY29uc3QgbG9hZGVkU2VhcmNoVGVybUtleSA9IGxvYWRlZFNlYXJjaFRlcm1SZWYuY3VycmVudC50cmltKCkudG9Mb3dlckNhc2UoKTtcclxuICBjb25zdCBoYXNMb2FkZWRPcGVuU2VhcmNoT3B0aW9ucyA9XHJcbiAgICBvcGVuU2VhcmNoTW9kZSA9PT0gXCJlbXB0eS1xdWVyeVwiICYmIGxvYWRlZFNlYXJjaFRlcm1LZXkgPT09IFwiXCIgJiYgb3B0aW9ucy5sZW5ndGggPiAwO1xyXG4gIGNvbnN0IHNob3VsZFNob3dMb2FkZWRPcGVuT3B0aW9ucyA9IG9wZW4gJiYgaGFzTG9hZGVkT3BlblNlYXJjaE9wdGlvbnM7XHJcblxyXG4gIGNvbnN0IGZpbHRlcmVkID0gdXNlTWVtbygoKSA9PiB7XHJcbiAgICBpZiAoc2hvdWxkU2hvd0xvYWRlZE9wZW5PcHRpb25zKSByZXR1cm4gb3B0aW9ucztcclxuICAgIGlmICghcXVlcnkudHJpbSgpKSByZXR1cm4gb3B0aW9ucztcclxuICAgIGNvbnN0IHEgPSBxdWVyeS50cmltKCkudG9Mb3dlckNhc2UoKTtcclxuICAgIHJldHVybiBvcHRpb25zLmZpbHRlcigob3B0aW9uKSA9PiB7XHJcbiAgICAgIGNvbnN0IHZhbHVlVGV4dCA9IG9wdGlvbi52YWx1ZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICBjb25zdCB0aXRsZVRleHQgPSBTdHJpbmcob3B0aW9uLnRpdGxlIHx8IFwiXCIpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgIGNvbnN0IHN1YnRpdGxlVGV4dCA9IFN0cmluZyhvcHRpb24uc3VidGl0bGUgfHwgXCJcIikudG9Mb3dlckNhc2UoKTtcclxuICAgICAgcmV0dXJuIHZhbHVlVGV4dC5pbmNsdWRlcyhxKSB8fCB0aXRsZVRleHQuaW5jbHVkZXMocSkgfHwgc3VidGl0bGVUZXh0LmluY2x1ZGVzKHEpO1xyXG4gICAgfSk7XHJcbiAgfSwgW29wdGlvbnMsIHF1ZXJ5LCBzaG91bGRTaG93TG9hZGVkT3Blbk9wdGlvbnNdKTtcclxuICBjb25zdCByZXNvbHZlZEFjdGl2ZUluZGV4ID1cclxuICAgIGZpbHRlcmVkLmxlbmd0aCA+IDAgPyBNYXRoLm1pbihNYXRoLm1heChhY3RpdmVJbmRleCwgMCksIGZpbHRlcmVkLmxlbmd0aCAtIDEpIDogMDtcclxuXHJcbiAgY29uc3QgY2FuU2VhcmNoVGVybSA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKHRlcm06IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xyXG4gICAgICBjb25zdCB0cmltbWVkID0gdGVybS50cmltKCk7XHJcbiAgICAgIGlmICghdHJpbW1lZCkgcmV0dXJuIGFsbG93RW1wdHlTZWFyY2g7XHJcbiAgICAgIHJldHVybiB0cmltbWVkLmxlbmd0aCA+PSBtaW5TZWFyY2hMZW5ndGg7XHJcbiAgICB9LFxyXG4gICAgW2FsbG93RW1wdHlTZWFyY2gsIG1pblNlYXJjaExlbmd0aF1cclxuICApO1xyXG5cclxuICBjb25zdCBleGVjdXRlU2VhcmNoID0gdXNlQ2FsbGJhY2soXHJcbiAgICBhc3luYyAodGVybTogc3RyaW5nLCBwYWdlOiBudW1iZXIsIGFwcGVuZDogYm9vbGVhbiwgc2VhcmNoT3B0aW9uczogRXhlY3V0ZVNlYXJjaE9wdGlvbnMgPSB7fSkgPT4ge1xyXG4gICAgICBhYm9ydFJlZi5jdXJyZW50Py5hYm9ydCgpO1xyXG4gICAgICBjb25zdCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xyXG4gICAgICBhYm9ydFJlZi5jdXJyZW50ID0gY29udHJvbGxlcjtcclxuICAgICAgc2V0TG9hZGluZyh0cnVlKTtcclxuICAgICAgaWYgKCFhcHBlbmQpIHtcclxuICAgICAgICBzZXRBY3RpdmVJbmRleCgwKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3Qgbm9ybWFsaXplZFRlcm0gPSB0ZXJtLnRyaW0oKTtcclxuICAgICAgY29uc3QgdGVybUtleSA9IG5vcm1hbGl6ZWRUZXJtLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgIGNvbnN0IGNsZWFyVmFsdWVPbk5vUmVzdWx0cyA9IHNlYXJjaE9wdGlvbnMuY2xlYXJWYWx1ZU9uTm9SZXN1bHRzID8/IHRydWU7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgaWYgKG9uU2VhcmNoUGFnZSkge1xyXG4gICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBvblNlYXJjaFBhZ2Uobm9ybWFsaXplZFRlcm0sIHBhZ2UsIHBhZ2VTaXplLCBjb250cm9sbGVyLnNpZ25hbCk7XHJcbiAgICAgICAgICBjb25zdCBwYWdlSXRlbXMgPSB1bmlxdWVCeVZhbHVlKEFycmF5LmlzQXJyYXkocmVzcG9uc2U/Lml0ZW1zKSA/IHJlc3BvbnNlLml0ZW1zIDogW10pO1xyXG4gICAgICAgICAgaWYgKCFhcHBlbmQgJiYgcGFnZUl0ZW1zLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICBzZXRPcHRpb25zKFtdKTtcclxuICAgICAgICAgICAgY3VycmVudFBhZ2VSZWYuY3VycmVudCA9IDA7XHJcbiAgICAgICAgICAgIGhhc01vcmVSZWYuY3VycmVudCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBzZXRMYXN0U2VhcmNoZWRUZXJtKHRlcm1LZXkpO1xyXG4gICAgICAgICAgICBsb2FkZWRTZWFyY2hUZXJtUmVmLmN1cnJlbnQgPSBub3JtYWxpemVkVGVybTtcclxuICAgICAgICAgICAgc2V0U2hvd05vdEZvdW5kU3RhdGUodHJ1ZSk7XHJcbiAgICAgICAgICAgIGlmIChjbGVhclZhbHVlT25Ob1Jlc3VsdHMpIHtcclxuICAgICAgICAgICAgICBvbkNoYW5nZShcIlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZXRPcGVuKHRydWUpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgc2V0T3B0aW9ucygocHJldmlvdXMpID0+IChhcHBlbmQgPyB1bmlxdWVCeVZhbHVlKFsuLi4ocHJldmlvdXMgfHwgW10pLCAuLi5wYWdlSXRlbXNdKSA6IHBhZ2VJdGVtcykpO1xyXG4gICAgICAgICAgY3VycmVudFBhZ2VSZWYuY3VycmVudCA9IHBhZ2U7XHJcbiAgICAgICAgICBzZXRTaG93Tm90Rm91bmRTdGF0ZShmYWxzZSk7XHJcblxyXG4gICAgICAgICAgY29uc3QgYXBpVG90YWwgPSBOdW1iZXIocmVzcG9uc2U/LnRvdGFsKTtcclxuICAgICAgICAgIGlmIChOdW1iZXIuaXNGaW5pdGUoYXBpVG90YWwpICYmIGFwaVRvdGFsID4gMCkge1xyXG4gICAgICAgICAgICBoYXNNb3JlUmVmLmN1cnJlbnQgPSBwYWdlICogcGFnZVNpemUgPCBhcGlUb3RhbDtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGhhc01vcmVSZWYuY3VycmVudCA9IHBhZ2VJdGVtcy5sZW5ndGggPj0gcGFnZVNpemU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgb25TZWFyY2gobm9ybWFsaXplZFRlcm0sIGNvbnRyb2xsZXIuc2lnbmFsKTtcclxuICAgICAgICAgIGNvbnN0IG5leHQgPSB1bmlxdWVCeVZhbHVlKHJlc3BvbnNlIHx8IFtdKTtcclxuICAgICAgICAgIGlmICghYXBwZW5kICYmIG5leHQubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHNldE9wdGlvbnMoW10pO1xyXG4gICAgICAgICAgICBjdXJyZW50UGFnZVJlZi5jdXJyZW50ID0gMDtcclxuICAgICAgICAgICAgaGFzTW9yZVJlZi5jdXJyZW50ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHNldExhc3RTZWFyY2hlZFRlcm0odGVybUtleSk7XHJcbiAgICAgICAgICAgIGxvYWRlZFNlYXJjaFRlcm1SZWYuY3VycmVudCA9IG5vcm1hbGl6ZWRUZXJtO1xyXG4gICAgICAgICAgICBzZXRTaG93Tm90Rm91bmRTdGF0ZSh0cnVlKTtcclxuICAgICAgICAgICAgaWYgKGNsZWFyVmFsdWVPbk5vUmVzdWx0cykge1xyXG4gICAgICAgICAgICAgIG9uQ2hhbmdlKFwiXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNldE9wZW4odHJ1ZSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBzZXRPcHRpb25zKG5leHQpO1xyXG4gICAgICAgICAgY3VycmVudFBhZ2VSZWYuY3VycmVudCA9IDE7XHJcbiAgICAgICAgICBoYXNNb3JlUmVmLmN1cnJlbnQgPSBmYWxzZTtcclxuICAgICAgICAgIHNldFNob3dOb3RGb3VuZFN0YXRlKGZhbHNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldExhc3RTZWFyY2hlZFRlcm0odGVybUtleSk7XHJcbiAgICAgICAgbG9hZGVkU2VhcmNoVGVybVJlZi5jdXJyZW50ID0gbm9ybWFsaXplZFRlcm07XHJcbiAgICAgICAgc2V0T3Blbih0cnVlKTtcclxuICAgICAgfSBjYXRjaCB7XHJcbiAgICAgICAgaWYgKCFhcHBlbmQpIHtcclxuICAgICAgICAgIHNldE9wdGlvbnMoW10pO1xyXG4gICAgICAgICAgY3VycmVudFBhZ2VSZWYuY3VycmVudCA9IDA7XHJcbiAgICAgICAgICBoYXNNb3JlUmVmLmN1cnJlbnQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2V0TGFzdFNlYXJjaGVkVGVybSh0ZXJtS2V5KTtcclxuICAgICAgICBsb2FkZWRTZWFyY2hUZXJtUmVmLmN1cnJlbnQgPSBub3JtYWxpemVkVGVybTtcclxuICAgICAgICBzZXRTaG93Tm90Rm91bmRTdGF0ZShmYWxzZSk7XHJcbiAgICAgICAgc2V0T3Blbih0cnVlKTtcclxuICAgICAgfSBmaW5hbGx5IHtcclxuICAgICAgICBpZiAoYWJvcnRSZWYuY3VycmVudCA9PT0gY29udHJvbGxlcikge1xyXG4gICAgICAgICAgYWJvcnRSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgW29uQ2hhbmdlLCBvblNlYXJjaCwgb25TZWFyY2hQYWdlLCBwYWdlU2l6ZV1cclxuICApO1xyXG5cclxuICBjb25zdCBydW5TZWFyY2ggPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XHJcbiAgICBpZiAocmVhZE9ubHlNb2RlIHx8IGxvYWRpbmcpIHJldHVybjtcclxuICAgIGNvbnN0IHRlcm0gPSBxdWVyeS50cmltKCk7XHJcbiAgICBjb25zdCB0ZXJtS2V5ID0gdGVybS50b0xvd2VyQ2FzZSgpO1xyXG5cclxuICAgIGlmICghY2FuU2VhcmNoVGVybSh0ZXJtKSkge1xyXG4gICAgICBzZXRPcHRpb25zKFtdKTtcclxuICAgICAgY3VycmVudFBhZ2VSZWYuY3VycmVudCA9IDA7XHJcbiAgICAgIGhhc01vcmVSZWYuY3VycmVudCA9IGZhbHNlO1xyXG4gICAgICBzZXRTaG93Tm90Rm91bmRTdGF0ZShmYWxzZSk7XHJcbiAgICAgIHNldE9wZW4oZmFsc2UpO1xyXG4gICAgICBzZXRMYXN0U2VhcmNoZWRUZXJtKFwiXCIpO1xyXG4gICAgICBsb2FkZWRTZWFyY2hUZXJtUmVmLmN1cnJlbnQgPSBcIlwiO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRlcm1LZXkgPT09IGxhc3RTZWFyY2hlZFRlcm0gJiYgb3B0aW9ucy5sZW5ndGggPiAwICYmICFvblNlYXJjaFBhZ2UpIHtcclxuICAgICAgc2V0T3Blbih0cnVlKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGF3YWl0IGV4ZWN1dGVTZWFyY2godGVybSwgMSwgZmFsc2UpO1xyXG4gIH0sIFtjYW5TZWFyY2hUZXJtLCBleGVjdXRlU2VhcmNoLCBsYXN0U2VhcmNoZWRUZXJtLCBsb2FkaW5nLCBvblNlYXJjaFBhZ2UsIG9wdGlvbnMubGVuZ3RoLCBxdWVyeSwgcmVhZE9ubHlNb2RlXSk7XHJcblxyXG4gIGNvbnN0IHJ1bk9wZW5TZWFyY2ggPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XHJcbiAgICBpZiAocmVhZE9ubHlNb2RlIHx8IGxvYWRpbmcgfHwgIWxvYWRPbk9wZW4pIHJldHVybjtcclxuXHJcbiAgICBjb25zdCB0ZXJtID0gb3BlblNlYXJjaE1vZGUgPT09IFwiZW1wdHktcXVlcnlcIiA/IFwiXCIgOiBxdWVyeS50cmltKCk7XHJcbiAgICBpZiAoIWNhblNlYXJjaFRlcm0odGVybSkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGF3YWl0IGV4ZWN1dGVTZWFyY2godGVybSwgMSwgZmFsc2UsIHtcclxuICAgICAgY2xlYXJWYWx1ZU9uTm9SZXN1bHRzOiBvcGVuU2VhcmNoTW9kZSAhPT0gXCJlbXB0eS1xdWVyeVwiLFxyXG4gICAgfSk7XHJcbiAgfSwgW2NhblNlYXJjaFRlcm0sIGV4ZWN1dGVTZWFyY2gsIGxvYWRPbk9wZW4sIGxvYWRpbmcsIG9wZW5TZWFyY2hNb2RlLCBxdWVyeSwgcmVhZE9ubHlNb2RlXSk7XHJcblxyXG4gIGNvbnN0IHJ1bkxvYWRNb3JlID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgaWYgKHJlYWRPbmx5TW9kZSB8fCBsb2FkaW5nIHx8ICFvblNlYXJjaFBhZ2UgfHwgIWluZmluaXRlU2Nyb2xsIHx8ICFoYXNNb3JlUmVmLmN1cnJlbnQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHRlcm0gPSBvcGVuU2VhcmNoTW9kZSA9PT0gXCJlbXB0eS1xdWVyeVwiID8gbG9hZGVkU2VhcmNoVGVybVJlZi5jdXJyZW50LnRyaW0oKSA6IHF1ZXJ5LnRyaW0oKTtcclxuICAgIGNvbnN0IHRlcm1LZXkgPSB0ZXJtLnRvTG93ZXJDYXNlKCk7XHJcbiAgICBpZiAob3BlblNlYXJjaE1vZGUgIT09IFwiZW1wdHktcXVlcnlcIiAmJiB0ZXJtS2V5ICE9PSBsYXN0U2VhcmNoZWRUZXJtKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIWNhblNlYXJjaFRlcm0odGVybSkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG5leHRQYWdlID0gY3VycmVudFBhZ2VSZWYuY3VycmVudCArIDE7XHJcbiAgICBpZiAobmV4dFBhZ2UgPD0gMSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgYXdhaXQgZXhlY3V0ZVNlYXJjaCh0ZXJtLCBuZXh0UGFnZSwgdHJ1ZSwgeyBjbGVhclZhbHVlT25Ob1Jlc3VsdHM6IGZhbHNlIH0pO1xyXG4gIH0sIFtcclxuICAgIGNhblNlYXJjaFRlcm0sXHJcbiAgICBleGVjdXRlU2VhcmNoLFxyXG4gICAgaW5maW5pdGVTY3JvbGwsXHJcbiAgICBsYXN0U2VhcmNoZWRUZXJtLFxyXG4gICAgbG9hZGluZyxcclxuICAgIG9uU2VhcmNoUGFnZSxcclxuICAgIG9wZW5TZWFyY2hNb2RlLFxyXG4gICAgcXVlcnksXHJcbiAgICByZWFkT25seU1vZGUsXHJcbiAgXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBydW5Mb2FkTW9yZVJlZi5jdXJyZW50ID0gcnVuTG9hZE1vcmU7XHJcbiAgfSwgW3J1bkxvYWRNb3JlXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIW9wZW4gfHwgIW9uU2VhcmNoUGFnZSB8fCAhaW5maW5pdGVTY3JvbGwpIHJldHVybjtcclxuICAgIGNvbnN0IHNjcm9sbGVyID0gbGlzdFJlZi5jdXJyZW50Py5wYXJlbnRFbGVtZW50O1xyXG4gICAgaWYgKCFzY3JvbGxlcikgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IG9uU2Nyb2xsID0gKCkgPT4ge1xyXG4gICAgICBpZiAobG9hZGluZ1JlZi5jdXJyZW50IHx8ICFoYXNNb3JlUmVmLmN1cnJlbnQpIHJldHVybjtcclxuICAgICAgY29uc3QgdGhyZXNob2xkID0gNDA7XHJcbiAgICAgIGNvbnN0IGlzTmVhckJvdHRvbSA9IHNjcm9sbGVyLnNjcm9sbFRvcCArIHNjcm9sbGVyLmNsaWVudEhlaWdodCA+PSBzY3JvbGxlci5zY3JvbGxIZWlnaHQgLSB0aHJlc2hvbGQ7XHJcbiAgICAgIGlmIChpc05lYXJCb3R0b20pIHtcclxuICAgICAgICB2b2lkIHJ1bkxvYWRNb3JlUmVmLmN1cnJlbnQ/LigpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHNjcm9sbGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgb25TY3JvbGwsIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIHNjcm9sbGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgb25TY3JvbGwpO1xyXG4gICAgfTtcclxuICB9LCBbaW5maW5pdGVTY3JvbGwsIG9uU2VhcmNoUGFnZSwgb3Blbl0pO1xyXG5cclxuICBjb25zdCBzZWxlY3RPcHRpb24gPSAob3B0aW9uOiBSZW1vdGVTZWFyY2hPcHRpb24pID0+IHtcclxuICAgIGNvbnN0IG5leHRWYWx1ZSA9IFN0cmluZyhvcHRpb24udmFsdWUgfHwgXCJcIikudHJpbSgpO1xyXG4gICAgc2V0U2hvd05vdEZvdW5kU3RhdGUoZmFsc2UpO1xyXG4gICAgb25DaGFuZ2UobmV4dFZhbHVlKTtcclxuICAgIG9uQ29tbWl0Py4obmV4dFZhbHVlKTtcclxuICAgIHNldExhc3RTZWFyY2hlZFRlcm0obmV4dFZhbHVlLnRvTG93ZXJDYXNlKCkpO1xyXG4gICAgc2V0T3BlbihmYWxzZSk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgcXVlcnlLZXkgPSBxdWVyeS50cmltKCkudG9Mb3dlckNhc2UoKTtcclxuICBjb25zdCBzaG93U2VhcmNoSWNvbiA9XHJcbiAgICAhcmVhZE9ubHlNb2RlICYmXHJcbiAgICAhbG9hZGluZyAmJlxyXG4gICAgY2FuU2VhcmNoVGVybShxdWVyeSkgJiZcclxuICAgIHF1ZXJ5S2V5ICE9PSBsYXN0U2VhcmNoZWRUZXJtO1xyXG5cclxuICBjb25zdCBsaXN0SWQgPSBgJHtpZEJhc2V9LW9wdGlvbnNgO1xyXG4gIGNvbnN0IGFjdGl2ZUlkID1cclxuICAgIG9wZW4gJiYgZmlsdGVyZWRbcmVzb2x2ZWRBY3RpdmVJbmRleF0gPyBgJHtpZEJhc2V9LW9wdC0ke2ZpbHRlcmVkW3Jlc29sdmVkQWN0aXZlSW5kZXhdLnZhbHVlfWAgOiB1bmRlZmluZWQ7XHJcbiAgY29uc3Qgc2hvd0xvYWRpbmdPbmx5U3RhdGUgPSBsb2FkaW5nICYmIGZpbHRlcmVkLmxlbmd0aCA9PT0gMDtcclxuICBjb25zdCBpbnB1dEFjdGlvblBhZGRpbmdDbGFzc05hbWUgPSBzaG93U2VhcmNoSWNvbiB8fCBsb2FkaW5nID8gXCJwci0xNFwiIDogXCJwci05XCI7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT17Y29udGFpbmVyQ2xhc3NOYW1lfSByZWY9e2NvbnRhaW5lclJlZn0+XHJcbiAgICAgIHtzaG93TGFiZWwgPyAoXHJcbiAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT17bGFiZWxDbGFzc05hbWV9IHN0eWxlPXt7IGNvbG9yOiBcIiMwMDI5NmJlMFwiIH19PlxyXG4gICAgICAgICAge2xhYmVsfVxyXG4gICAgICAgIDwvbGFiZWw+XHJcbiAgICAgICkgOiBudWxsfVxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlXCI+XHJcbiAgICAgICAgPGRpdlxyXG4gICAgICAgICAgcmVmPXtib3hSZWZ9XHJcbiAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXHJcbiAgICAgICAgICAgIFwicmVsYXRpdmUgdy1mdWxsIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJnLXdoaXRlIHRleHQtbGVmdCBmb2N1cy13aXRoaW46Ym9yZGVyLXByaW1hcnkgZm9jdXMtd2l0aGluOnJpbmctMiBmb2N1cy13aXRoaW46cmluZy1wcmltYXJ5IGZvY3VzLXdpdGhpbjpyaW5nLW9mZnNldC13aGl0ZSBzbTp0ZXh0LXNtXCIsXHJcbiAgICAgICAgICAgIHJlYWRPbmx5TW9kZSA/IFwiaW5kLXJlYWRvbmx5LWZpZWxkXCIgOiBcIlwiXHJcbiAgICAgICAgICApfVxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXHJcbiAgICAgICAgICAgICAgXCJ3LWZ1bGwgcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYm9yZGVyIHB4LTMgcHktMiB0ZXh0LXNtIHNtOnRleHQtYmFzZSBsZWFkaW5nLTUgZm9jdXM6b3V0bGluZS1oaWRkZW4gZm9jdXM6cmluZy0yIGRpc2FibGVkOmJnLXNsYXRlLTEwMCBkaXNhYmxlZDp0ZXh0LXNsYXRlLTUwMCBkaXNhYmxlZDpib3JkZXItc2xhdGUtMjAwIGRpc2FibGVkOmN1cnNvci1ub3QtYWxsb3dlZFwiLFxyXG4gICAgICAgICAgICAgIGlucHV0QWN0aW9uUGFkZGluZ0NsYXNzTmFtZSxcclxuICAgICAgICAgICAgICBcImJvcmRlci1zbGF0ZS0yMDAgZm9jdXM6cmluZy1wcmltYXJ5IGZvY3VzOmJvcmRlci1wcmltYXJ5XCIsXHJcbiAgICAgICAgICAgICAgcmVhZE9ubHlNb2RlID8gXCJpbmQtcmVhZG9ubHktZmllbGRcIiA6IFwidGV4dC1zbGF0ZS05MDBcIlxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgICBzdHlsZT17eyBjb2xvcjogdmFsdWVDb2xvciB9fVxyXG4gICAgICAgICAgICB2YWx1ZT17cXVlcnl9XHJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICBjb25zdCBuZXh0VmFsdWUgPSBldmVudC50YXJnZXQudmFsdWU7XHJcbiAgICAgICAgICAgICAgc2V0QWN0aXZlSW5kZXgoMCk7XHJcbiAgICAgICAgICAgICAgc2V0U2hvd05vdEZvdW5kU3RhdGUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgIG9uQ2hhbmdlKG5leHRWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgaWYgKG5leHRWYWx1ZS50cmltKCkudG9Mb3dlckNhc2UoKSAhPT0gbGFzdFNlYXJjaGVkVGVybSkge1xyXG4gICAgICAgICAgICAgICAgc2V0T3BlbihmYWxzZSk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICBvbkZvY3VzPXsoKSA9PiB7XHJcbiAgICAgICAgICAgICAgaWYgKCFyZWFkT25seU1vZGUgJiYgKGZpbHRlcmVkLmxlbmd0aCA+IDAgfHwgaGFzTG9hZGVkT3BlblNlYXJjaE9wdGlvbnMgfHwgc2hvd05vdEZvdW5kU3RhdGUpKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRPcGVuKHRydWUpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgb25LZXlEb3duPXsoZXZlbnQpID0+XHJcbiAgICAgICAgICAgICAgaGFuZGxlQ29tYm9ib3hLZXlEb3duKGV2ZW50LCB7XHJcbiAgICAgICAgICAgICAgICBpc09wZW46IG9wZW4sXHJcbiAgICAgICAgICAgICAgICBzZXRPcGVuLFxyXG4gICAgICAgICAgICAgICAgb3B0aW9uQ291bnQ6IGZpbHRlcmVkLmxlbmd0aCxcclxuICAgICAgICAgICAgICAgIHNldEFjdGl2ZUluZGV4LFxyXG4gICAgICAgICAgICAgICAgb25FbnRlcldoZW5PcGVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIGlmIChmaWx0ZXJlZC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0T3B0aW9uKGZpbHRlcmVkW3Jlc29sdmVkQWN0aXZlSW5kZXhdID8/IGZpbHRlcmVkWzBdKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgdm9pZCBydW5TZWFyY2goKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBvbkVudGVyV2hlbkNsb3NlZDogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICB2b2lkIHJ1blNlYXJjaCgpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG9wZW5PbkFycm93OiB0cnVlLFxyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxyXG4gICAgICAgICAgICByZWFkT25seT17cmVhZE9ubHl9XHJcbiAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cclxuICAgICAgICAgICAgYXJpYS1sYWJlbD17bGFiZWx9XHJcbiAgICAgICAgICAgIGFyaWEtZXhwYW5kZWQ9e29wZW59XHJcbiAgICAgICAgICAgIGFyaWEtY29udHJvbHM9e2xpc3RJZH1cclxuICAgICAgICAgICAgYXJpYS1hY3RpdmVkZXNjZW5kYW50PXthY3RpdmVJZH1cclxuICAgICAgICAgIC8+XHJcblxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC15LTAgcmlnaHQtMSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMFwiPlxyXG4gICAgICAgICAgICB7bG9hZGluZyA/IChcclxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmbGV4IGgtOCB3LTYgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XHJcbiAgICAgICAgICAgICAgICA8U3Bpbm5lciBzaXplPVwiaC00IHctNFwiIC8+XHJcbiAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICApIDogbnVsbH1cclxuXHJcbiAgICAgICAgICAgIHtzaG93U2VhcmNoSWNvbiA/IChcclxuICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YCR7Y29tcGFjdEFjdGlvbkJ1dHRvbkNsYXNzTmFtZX0gdGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC1zbGF0ZS01MDBgfVxyXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICB2b2lkIHJ1blNlYXJjaCgpO1xyXG4gICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2luZFQoXCJDb21tb25fU2VhcmNoXCIsIFwiU2VhcmNoXCIpfVxyXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3JlYWRPbmx5TW9kZX1cclxuICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBmaWxsPVwibm9uZVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBzdHJva2VXaWR0aD17MS41fSBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBjbGFzc05hbWU9XCJzaXplLTRcIj5cclxuICAgICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJtMTUuNzUgMTUuNzUtMi40ODktMi40ODltMCAwYTMuMzc1IDMuMzc1IDAgMSAwLTQuNzczLTQuNzczIDMuMzc1IDMuMzc1IDAgMCAwIDQuNzc0IDQuNzc0Wk0yMSAxMmE5IDkgMCAxIDEtMTggMCA5IDkgMCAwIDEgMTggMFpcIiAvPlxyXG4gICAgICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICkgOiBudWxsfVxyXG5cclxuICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YCR7Y29tcGFjdEFjdGlvbkJ1dHRvbkNsYXNzTmFtZX0gdGV4dC1zbGF0ZS01MDAgaG92ZXI6dGV4dC1zbGF0ZS02MDBgfVxyXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChyZWFkT25seU1vZGUpIHJldHVybjtcclxuICAgICAgICAgICAgICAgIGlmIChvcGVuKSB7XHJcbiAgICAgICAgICAgICAgICAgIHNldE9wZW4oZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG9wZW5TZWFyY2hNb2RlID09PSBcImVtcHR5LXF1ZXJ5XCIgJiYgbG9hZE9uT3Blbikge1xyXG4gICAgICAgICAgICAgICAgICBpZiAoaGFzTG9hZGVkT3BlblNlYXJjaE9wdGlvbnMgfHwgKGxvYWRlZFNlYXJjaFRlcm1LZXkgPT09IFwiXCIgJiYgc2hvd05vdEZvdW5kU3RhdGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0T3Blbih0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgIHZvaWQgcnVuT3BlblNlYXJjaCgpO1xyXG4gICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlcmVkLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgc2V0T3Blbih0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICghcXVlcnkudHJpbSgpICYmIGxvYWRPbk9wZW4pIHtcclxuICAgICAgICAgICAgICAgICAgdm9pZCBydW5PcGVuU2VhcmNoKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtvcGVuID8gaW5kVChcIkRyb3Bkb3duX0hpZGVPcHRpb25zXCIsIFwiSGlkZSBvcHRpb25zXCIpIDogaW5kVChcIkRyb3Bkb3duX1Nob3dPcHRpb25zXCIsIFwiU2hvdyBvcHRpb25zXCIpfVxyXG4gICAgICAgICAgICAgIGRpc2FibGVkPXtyZWFkT25seU1vZGV9XHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICB7b3BlbiA/IDxDaGV2cm9uVXBTdmcgY2xhc3NOYW1lPVwic2l6ZS00XCIgLz4gOiA8Q2hldnJvbkRvd25TdmcgY2xhc3NOYW1lPVwic2l6ZS00XCIgLz59XHJcbiAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPEZsb2F0aW5nTGlzdFxyXG4gICAgICAgICAgYW5jaG9yUmVmPXtib3hSZWZ9XHJcbiAgICAgICAgICBvcGVuPXtvcGVufVxyXG4gICAgICAgICAgekluZGV4PXszNjAwMDB9XHJcbiAgICAgICAgICBtYXhIZWlnaHRDbGFzcz1cIm1heC1oLTcyXCJcclxuICAgICAgICAgIHJvbGU9XCJsaXN0Ym94XCJcclxuICAgICAgICAgIHJvdW5kZWRDbGFzcz1cInJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldXCJcclxuICAgICAgICAgIHBhbmVsQ2xhc3NOYW1lPXtwYW5lbENsYXNzTmFtZX1cclxuICAgICAgICA+XHJcbiAgICAgICAgICA8ZGl2IGlkPXtsaXN0SWR9IHJlZj17bGlzdFJlZn0+XHJcbiAgICAgICAgICAgIHtzaG93TG9hZGluZ09ubHlTdGF0ZSA/IChcclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB4LTQgcHktMiB0ZXh0LXNtIHRleHQtc2xhdGUtNTAwXCI+e2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9PC9kaXY+XHJcbiAgICAgICAgICAgICkgOiBzaG93Tm90Rm91bmRTdGF0ZSA/IChcclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB4LTQgcHktMiB0ZXh0LXNtIHRleHQtc2xhdGUtNTAwXCI+e2luZFQoXCJDb21tb25fTm90Rm91bmRcIiwgXCJOb3QgZm91bmRcIil9PC9kaXY+XHJcbiAgICAgICAgICAgICkgOiBmaWx0ZXJlZC5sZW5ndGggPT09IDAgPyAoXHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJweC00IHB5LTIgdGV4dC1zbSB0ZXh0LXNsYXRlLTUwMFwiPntpbmRUKFwiQ29tbW9uX05vRGF0YVwiLCBcIk5vIGRhdGFcIil9PC9kaXY+XHJcbiAgICAgICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgICAgPD5cclxuICAgICAgICAgICAgICAgIHtmaWx0ZXJlZC5tYXAoKG9wdGlvbiwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgY29uc3QgaXNBY3RpdmUgPSBpbmRleCA9PT0gcmVzb2x2ZWRBY3RpdmVJbmRleDtcclxuICAgICAgICAgICAgICAgICAgY29uc3Qgb3B0aW9uSWQgPSBvcHRpb24udmFsdWUgfHwgYCR7aW5kZXh9YDtcclxuICAgICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgICAgICAgICAgICAgIGtleT17b3B0aW9uSWR9XHJcbiAgICAgICAgICAgICAgICAgICAgICBpZD17YCR7aWRCYXNlfS1vcHQtJHtvcHRpb25JZH1gfVxyXG4gICAgICAgICAgICAgICAgICAgICAgcm9sZT1cIm9wdGlvblwiXHJcbiAgICAgICAgICAgICAgICAgICAgICBhcmlhLXNlbGVjdGVkPXtpc0FjdGl2ZX1cclxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJyZWxhdGl2ZSBmbGV4IHctZnVsbCBjdXJzb3ItZGVmYXVsdCBzZWxlY3Qtbm9uZSBpdGVtcy1zdGFydCBweS0yIHB4LTMgdGV4dC1sZWZ0IHRleHQtc21cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNBY3RpdmUgPyBcImJnLXByaW1hcnkgdGV4dC13aGl0ZVwiIDogXCJ0ZXh0LXNsYXRlLTkwMFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgICAgICAgICAgb25Nb3VzZUVudGVyPXsoKSA9PiBzZXRBY3RpdmVJbmRleChpbmRleCl9XHJcbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZWxlY3RPcHRpb24ob3B0aW9uKX1cclxuICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbWVkaXVtXCI+e29wdGlvbi50aXRsZSB8fCBvcHRpb24udmFsdWV9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7b3B0aW9uLnN1YnRpdGxlID8gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcInRleHQteHNcIiwgaXNBY3RpdmUgPyBcInRleHQtd2hpdGUvOTBcIiA6IFwidGV4dC1zbGF0ZS01MDBcIil9PntvcHRpb24uc3VidGl0bGV9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICApIDogbnVsbH1cclxuICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH0pfVxyXG4gICAgICAgICAgICAgICAge2xvYWRpbmcgPyAoXHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHgtNCBweS0yIHRleHQteHMgdGV4dC1zbGF0ZS01MDAgYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTEwMFwiPntpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgKSA6IG51bGx9XHJcbiAgICAgICAgICAgICAgPC8+XHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L0Zsb2F0aW5nTGlzdD5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgUmVtb3RlU2VhcmNoQ29tYm9ib3g7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBZ0ZVO0FBMUNWLElBQU0sc0JBQXNCLENBQUM7QUFBQSxFQUMzQjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0EsaUJBQWlCO0FBQUEsRUFDakIsa0JBQWtCO0FBQUEsRUFDbEI7QUFBQSxFQUNBO0FBQUEsRUFDQSxXQUFXO0FBQUEsRUFDWDtBQUFBLEVBQ0Esb0JBQW9CO0FBQUEsRUFDcEI7QUFBQSxFQUNBLHNCQUFzQjtBQUFBLEVBQ3RCO0FBQUEsRUFDQTtBQUNGLE1BQWdDO0FBQzlCLFFBQU0sWUFBWSx1QkFBdUIsT0FBTyxHQUFHO0FBQ25ELFFBQU0sYUFBYSxjQUFjO0FBQ2pDLFFBQU0sZUFBZSxTQUFTLFFBQVE7QUFDdEMsUUFBTTtBQUFBLElBQ0osU0FBUztBQUFBLElBQ1QsV0FBVztBQUFBLElBQ1gsTUFBTTtBQUFBLElBQ04sVUFBVTtBQUFBLElBQ1YsR0FBRztBQUFBLEVBQ0wsSUFBSSxvQkFBb0IsQ0FBQztBQUV6QixTQUNFO0FBQUEsSUFBQztBQUFBO0FBQUEsTUFDQyxNQUFLO0FBQUEsTUFDTCxXQUFVO0FBQUEsTUFDVixN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
