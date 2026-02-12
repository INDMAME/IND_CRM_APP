import {
  handleComboboxKeyDown
} from "./chunk-6HMZLOGF.js";
import {
  fetchExpenseProjects,
  normalizeCardTitleText
} from "./chunk-CHD5EVDL.js";
import {
  SelectCombobox_default
} from "./chunk-WPRFFVHK.js";
import {
  ChevronDownSvg,
  ChevronUpSvg,
  FloatingList_default,
  Spinner_default,
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

// Web/wwwroot/react/src/pages/gastos/components/ExpenseTimelineCard.tsx
var import_jsx_runtime = __toESM(require_jsx_runtime());
var ExpenseTimelineCard = ({
  dateParts,
  title,
  amountText,
  onOpen,
  titleClassName = "timeline-name",
  amountClassName = "expense-sheet-card__amount",
  statusClassName,
  statusLabel
}) => {
  const safeTitle = normalizeCardTitleText(title, "-");
  const safeAmount = amountText || "-";
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      className: "timeline-card timeline-card--clickable",
      role: "button",
      tabIndex: 0,
      onClick: onOpen,
      onKeyDown: (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen();
        }
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "timeline-date-panel flex flex-col items-center justify-center gap-1 px-3 py-3 bg-slate-50 border-r border-slate-200 text-slate-600", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-xs font-semibold tracking-[0.2em] text-slate-500", children: dateParts.year }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-xs font-semibold uppercase tracking-[0.2em] text-slate-500", children: dateParts.month }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-2xl font-semibold text-primary", children: dateParts.day })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "timeline-card__content flex-1 py-3 px-4", children: [
          statusClassName ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: statusClassName, title: statusLabel, "aria-label": statusLabel }) : null,
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: titleClassName, "data-fulltext": safeTitle, children: safeTitle }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: amountClassName, "data-fulltext": safeAmount, children: safeAmount })
        ] })
      ]
    }
  );
};
var ExpenseTimelineCard_default = ExpenseTimelineCard;

// Web/wwwroot/react/src/pages/gastos/components/ExpenseCurrencyFilterSelect.tsx
var import_react = __toESM(require_react());

// Web/wwwroot/react/src/pages/gastos/constants/currencyCodes.ts
var expenseCurrencyCodes = [
  "AED",
  "AFN",
  "ALL",
  "AMD",
  "AOA",
  "ARS",
  "AUD",
  "AWG",
  "AZN",
  "BAM",
  "BBD",
  "BDT",
  "BHD",
  "BIF",
  "BMD",
  "BND",
  "BOB",
  "BOV",
  "BRL",
  "BSD",
  "BTN",
  "BWP",
  "BYN",
  "BZD",
  "CAD",
  "CDF",
  "CHE",
  "CHF",
  "CHW",
  "CLF",
  "CLP",
  "CNY",
  "COP",
  "COU",
  "CRC",
  "CUC",
  "CUP",
  "CVE",
  "CZK",
  "DJF",
  "DKK",
  "DOP",
  "DZD",
  "EGP",
  "ERN",
  "ETB",
  "EUR",
  "FJD",
  "FKP",
  "GBP",
  "GEL",
  "GHS",
  "GIP",
  "GMD",
  "GNF",
  "GTQ",
  "GYD",
  "HKD",
  "HNL",
  "HTG",
  "HUF",
  "IDR",
  "ILS",
  "INR",
  "IQD",
  "IRR",
  "ISK",
  "JMD",
  "JOD",
  "JPY",
  "KES",
  "KGS",
  "KHR",
  "KMF",
  "KPW",
  "KRW",
  "KWD",
  "KYD",
  "KZT",
  "LAK",
  "LBP",
  "LKR",
  "LRD",
  "LSL",
  "LYD",
  "MAD",
  "MDL",
  "MGA",
  "MKD",
  "MMK",
  "MNT",
  "MOP",
  "MRU",
  "MUR",
  "MVR",
  "MWK",
  "MXN",
  "MXV",
  "MYR",
  "MZN",
  "NAD",
  "NGN",
  "NIO",
  "NOK",
  "NPR",
  "NZD",
  "OMR",
  "PAB",
  "PEN",
  "PGK",
  "PHP",
  "PKR",
  "PLN",
  "PYG",
  "QAR",
  "RON",
  "RSD",
  "RUB",
  "RWF",
  "SAR",
  "SBD",
  "SCR",
  "SDG",
  "SEK",
  "SGD",
  "SHP",
  "SLE",
  "SOS",
  "SRD",
  "SSP",
  "STN",
  "SVC",
  "SYP",
  "SZL",
  "THB",
  "TJS",
  "TMT",
  "TND",
  "TOP",
  "TRY",
  "TTD",
  "TWD",
  "TZS",
  "UAH",
  "UGX",
  "USD",
  "USN",
  "UYI",
  "UYU",
  "UZS",
  "VED",
  "VEF",
  "VND",
  "VUV",
  "WST",
  "XAF",
  "XCD",
  "XCG",
  "XDR",
  "XOF",
  "XPF",
  "XSU",
  "XUA",
  "YER",
  "ZAR",
  "ZMW",
  "ZWL"
];
var expenseCurrencyOptions = expenseCurrencyCodes.map((code) => ({ value: code, text: code }));

// Web/wwwroot/react/src/pages/gastos/components/ExpenseCurrencyFilterSelect.tsx
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var ExpenseCurrencyFilterSelect = ({
  label,
  placeholder,
  value,
  onChange,
  readOnly = false,
  disabled = false,
  showLabel = true,
  idBase = "expense-currency"
}) => {
  const options = (0, import_react.useMemo)(() => expenseCurrencyOptions, []);
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    SelectCombobox_default,
    {
      label,
      placeholder,
      options,
      value: String(value || "").trim().toUpperCase(),
      onChange: (nextValue) => onChange(String(nextValue || "").trim().toUpperCase()),
      readOnly,
      disabled,
      allowTextInput: true,
      showSearchButton: false,
      showLabel,
      usePortal: false,
      idBase,
      portalClassName: "visitas-typography",
      panelClassName: "visitas-typography"
    }
  );
};
var ExpenseCurrencyFilterSelect_default = ExpenseCurrencyFilterSelect;

// Web/wwwroot/react/src/pages/gastos/components/ExpenseProjectFilterInput.tsx
var import_react3 = __toESM(require_react());

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
  infiniteScroll = false,
  disabled = false,
  readOnly = false,
  showLabel = true,
  panelClassName = "visitas-typography"
}) => {
  const readOnlyMode = readOnly || disabled;
  const valueColor = readOnlyMode ? "#64748b" : "#00296be0";
  const [query, setQuery] = (0, import_react2.useState)(value || "");
  const [options, setOptions] = (0, import_react2.useState)([]);
  const [open, setOpen] = (0, import_react2.useState)(false);
  const [loading, setLoading] = (0, import_react2.useState)(false);
  const [activeIndex, setActiveIndex] = (0, import_react2.useState)(0);
  const [lastSearchedTerm, setLastSearchedTerm] = (0, import_react2.useState)("");
  const [currentPage, setCurrentPage] = (0, import_react2.useState)(0);
  const [hasMore, setHasMore] = (0, import_react2.useState)(false);
  const abortRef = (0, import_react2.useRef)(null);
  const containerRef = (0, import_react2.useRef)(null);
  const boxRef = (0, import_react2.useRef)(null);
  const listRef = (0, import_react2.useRef)(null);
  useOutsideClick([containerRef, listRef], () => setOpen(false));
  (0, import_react2.useEffect)(() => {
    setQuery(value || "");
  }, [value]);
  (0, import_react2.useEffect)(() => {
    return () => {
      abortRef.current?.abort();
      abortRef.current = null;
    };
  }, []);
  const filtered = (0, import_react2.useMemo)(() => {
    if (!query.trim()) return options;
    const q = query.trim().toLowerCase();
    return options.filter((option) => {
      const valueText = option.value.toLowerCase();
      const titleText = String(option.title || "").toLowerCase();
      const subtitleText = String(option.subtitle || "").toLowerCase();
      return valueText.includes(q) || titleText.includes(q) || subtitleText.includes(q);
    });
  }, [options, query]);
  (0, import_react2.useEffect)(() => {
    setActiveIndex(0);
  }, [filtered.length, query]);
  const canSearchTerm = (0, import_react2.useCallback)(
    (term) => {
      const trimmed = term.trim();
      if (!trimmed) return allowEmptySearch;
      return trimmed.length >= minSearchLength;
    },
    [allowEmptySearch, minSearchLength]
  );
  const executeSearch = (0, import_react2.useCallback)(
    async (term, page, append) => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;
      setLoading(true);
      const termKey = term.toLowerCase();
      try {
        if (onSearchPage) {
          const response = await onSearchPage(term, page, pageSize, controller.signal);
          const pageItems = uniqueByValue(Array.isArray(response?.items) ? response.items : []);
          setOptions((previous) => append ? uniqueByValue([...previous || [], ...pageItems]) : pageItems);
          setCurrentPage(page);
          const apiTotal = Number(response?.total);
          if (Number.isFinite(apiTotal) && apiTotal > 0) {
            setHasMore(page * pageSize < apiTotal);
          } else {
            setHasMore(pageItems.length >= pageSize);
          }
        } else {
          const response = await onSearch(term, controller.signal);
          const next = uniqueByValue(response || []);
          setOptions(next);
          setCurrentPage(1);
          setHasMore(false);
        }
        setLastSearchedTerm(termKey);
        setOpen(true);
      } catch {
        if (!append) {
          setOptions([]);
          setCurrentPage(0);
          setHasMore(false);
        }
        setLastSearchedTerm(termKey);
        setOpen(true);
      } finally {
        if (abortRef.current === controller) {
          abortRef.current = null;
        }
        setLoading(false);
      }
    },
    [onSearch, onSearchPage, pageSize]
  );
  const runSearch = (0, import_react2.useCallback)(async () => {
    if (readOnlyMode || loading) return;
    const term = query.trim();
    const termKey = term.toLowerCase();
    if (!canSearchTerm(term)) {
      setOptions([]);
      setCurrentPage(0);
      setHasMore(false);
      setOpen(false);
      setLastSearchedTerm("");
      return;
    }
    if (termKey === lastSearchedTerm && options.length > 0 && !onSearchPage) {
      setOpen(true);
      return;
    }
    await executeSearch(term, 1, false);
  }, [canSearchTerm, executeSearch, lastSearchedTerm, loading, onSearchPage, options.length, query, readOnlyMode]);
  const runLoadMore = (0, import_react2.useCallback)(async () => {
    if (readOnlyMode || loading || !onSearchPage || !infiniteScroll || !hasMore) {
      return;
    }
    const term = query.trim();
    const termKey = term.toLowerCase();
    if (termKey !== lastSearchedTerm) {
      return;
    }
    const nextPage = currentPage + 1;
    if (nextPage <= 1) {
      return;
    }
    await executeSearch(term, nextPage, true);
  }, [currentPage, executeSearch, hasMore, infiniteScroll, lastSearchedTerm, loading, onSearchPage, query, readOnlyMode]);
  (0, import_react2.useEffect)(() => {
    if (!open || !onSearchPage || !infiniteScroll) return;
    const scroller = listRef.current?.parentElement;
    if (!scroller) return;
    const onScroll = () => {
      if (loading || !hasMore) return;
      const threshold = 40;
      const isNearBottom = scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - threshold;
      if (isNearBottom) {
        void runLoadMore();
      }
    };
    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      scroller.removeEventListener("scroll", onScroll);
    };
  }, [hasMore, infiniteScroll, loading, onSearchPage, open, runLoadMore]);
  const selectOption = (option) => {
    const nextValue = String(option.value || "").trim();
    setQuery(nextValue);
    onChange(nextValue);
    setLastSearchedTerm(nextValue.toLowerCase());
    setOpen(false);
  };
  const queryKey = query.trim().toLowerCase();
  const showSearchIcon = !readOnlyMode && !loading && canSearchTerm(query) && queryKey !== lastSearchedTerm;
  const listId = `${idBase}-options`;
  const activeId = open && filtered[activeIndex] ? `${idBase}-opt-${filtered[activeIndex].value}` : void 0;
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "space-y-2", ref: containerRef, children: [
    showLabel ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("label", { className: "form-label font-semibold", style: { color: "#00296be0" }, children: label }) : null,
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "relative", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
        "div",
        {
          ref: boxRef,
          className: classNames(
            "relative w-full rounded-xl bg-white text-left focus-within:border-primary focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-white sm:text-sm",
            readOnlyMode ? "ind-readonly-field" : ""
          ),
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "input",
              {
                className: classNames(
                  "w-full rounded-xl border px-3 py-2 pr-20 text-sm sm:text-base leading-5 focus:outline-hidden focus:ring-2 disabled:bg-slate-100 disabled:text-slate-500 disabled:border-slate-200 disabled:cursor-not-allowed",
                  "border-slate-200 focus:ring-primary focus:border-primary",
                  readOnlyMode ? "ind-readonly-field" : "text-slate-900"
                ),
                style: { color: valueColor },
                value: query,
                onChange: (event) => {
                  const nextValue = event.target.value;
                  setQuery(nextValue);
                  onChange(nextValue);
                  if (nextValue.trim().toLowerCase() !== lastSearchedTerm) {
                    setOpen(false);
                  }
                },
                onFocus: () => {
                  if (!readOnlyMode && filtered.length > 0) {
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
                      selectOption(filtered[activeIndex] ?? filtered[0]);
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
                role: "combobox",
                "aria-expanded": open,
                "aria-controls": listId,
                "aria-activedescendant": activeId
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "absolute inset-y-0 right-0 flex items-center gap-1 pr-2", children: [
              loading ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "flex items-center px-1.5", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Spinner_default, { size: "h-4 w-4" }) }) : null,
              showSearchIcon ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                "button",
                {
                  type: "button",
                  className: "flex items-center p-1.5 text-slate-400 hover:text-slate-500",
                  onClick: () => {
                    void runSearch();
                  },
                  "aria-label": indT("Common_Search", "Search"),
                  disabled: readOnlyMode,
                  children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: "h-5 w-5", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" }) })
                }
              ) : null,
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
                    if (filtered.length > 0) {
                      setOpen(true);
                      return;
                    }
                    if (!query.trim() && loadOnOpen) {
                      void runSearch();
                    }
                  },
                  "aria-label": open ? indT("Dropdown_HideOptions", "Hide options") : indT("Dropdown_ShowOptions", "Show options"),
                  disabled: readOnlyMode,
                  children: open ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ChevronUpSvg, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ChevronDownSvg, { className: "h-5 w-5" })
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
          roundedClass: "rounded-xl",
          panelClassName,
          children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { id: listId, ref: listRef, children: loading ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "px-4 py-2 text-sm text-slate-500", children: indT("Common_Loading", "Loading") }) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "px-4 py-2 text-sm text-slate-500", children: indT("Common_NoData", "No data") }) : filtered.map((option, index) => {
            const isActive = index === activeIndex;
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
          }) })
        }
      )
    ] })
  ] });
};
var RemoteSearchCombobox_default = RemoteSearchCombobox;

// Web/wwwroot/react/src/pages/gastos/components/ExpenseProjectFilterInput.tsx
var import_jsx_runtime4 = __toESM(require_jsx_runtime());
var SEARCH_PAGE_SIZE = 10;
var mapProjectOptions = (items) => {
  return (Array.isArray(items) ? items : []).map((item) => {
    const valueText = String(item?.value || "").trim();
    if (!valueText) return null;
    const subtitle = String(item?.text || "").trim();
    return {
      value: valueText,
      title: valueText,
      subtitle: subtitle || "-"
    };
  }).filter(Boolean);
};
var ExpenseProjectFilterInput = ({
  label,
  placeholder,
  value,
  onChange,
  readOnly = false,
  disabled = false,
  showLabel = true
}) => {
  const loadOptions = (0, import_react3.useCallback)(async (term, signal) => {
    const response = await fetchExpenseProjects(term, 1, SEARCH_PAGE_SIZE, {
      signal,
      suppressPermissionModal: true
    });
    return mapProjectOptions(response?.items);
  }, []);
  const loadOptionsPage = (0, import_react3.useCallback)(async (term, page, pageSize, signal) => {
    const response = await fetchExpenseProjects(term, page, pageSize, {
      signal,
      suppressPermissionModal: true
    });
    return {
      items: mapProjectOptions(response?.items),
      total: Number(response?.total || 0)
    };
  }, []);
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
    RemoteSearchCombobox_default,
    {
      label,
      placeholder,
      value,
      onChange,
      onSearch: loadOptions,
      onSearchPage: loadOptionsPage,
      idBase: "expense-project-filter",
      minSearchLength: 0,
      pageSize: SEARCH_PAGE_SIZE,
      allowEmptySearch: true,
      loadOnOpen: true,
      infiniteScroll: true,
      disabled,
      readOnly,
      showLabel,
      panelClassName: "visitas-typography"
    }
  );
};
var ExpenseProjectFilterInput_default = ExpenseProjectFilterInput;

export {
  ExpenseCurrencyFilterSelect_default,
  RemoteSearchCombobox_default,
  ExpenseProjectFilterInput_default,
  ExpenseTimelineCard_default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VUaW1lbGluZUNhcmQudHN4IiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlQ3VycmVuY3lGaWx0ZXJTZWxlY3QudHN4IiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29uc3RhbnRzL2N1cnJlbmN5Q29kZXMudHMiLCAiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VQcm9qZWN0RmlsdGVySW5wdXQudHN4IiwgIi4uLy4uL3JlYWN0L3NyYy9jb21wb25lbnRzL2NvbW1vbnMvUmVtb3RlU2VhcmNoQ29tYm9ib3gudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VEYXRlUGFydHMgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcbmltcG9ydCB7IG5vcm1hbGl6ZUNhcmRUaXRsZVRleHQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcblxudHlwZSBFeHBlbnNlVGltZWxpbmVDYXJkUHJvcHMgPSB7XG4gIGRhdGVQYXJ0czogRXhwZW5zZURhdGVQYXJ0cztcbiAgdGl0bGU6IHN0cmluZztcbiAgYW1vdW50VGV4dDogc3RyaW5nO1xuICBvbk9wZW46ICgpID0+IHZvaWQ7XG4gIHRpdGxlQ2xhc3NOYW1lPzogc3RyaW5nO1xuICBhbW91bnRDbGFzc05hbWU/OiBzdHJpbmc7XG4gIHN0YXR1c0NsYXNzTmFtZT86IHN0cmluZztcbiAgc3RhdHVzTGFiZWw/OiBzdHJpbmc7XG59O1xuXG4vLyBSZXVzYWJsZSBjbGlja2FibGUgdGltZWxpbmUgY2FyZCBmb3IgZXhwZW5zZSBzaGVldHMgYW5kIGV4cGVuc2UgbGluZXMuXG5jb25zdCBFeHBlbnNlVGltZWxpbmVDYXJkID0gKHtcbiAgZGF0ZVBhcnRzLFxuICB0aXRsZSxcbiAgYW1vdW50VGV4dCxcbiAgb25PcGVuLFxuICB0aXRsZUNsYXNzTmFtZSA9IFwidGltZWxpbmUtbmFtZVwiLFxuICBhbW91bnRDbGFzc05hbWUgPSBcImV4cGVuc2Utc2hlZXQtY2FyZF9fYW1vdW50XCIsXG4gIHN0YXR1c0NsYXNzTmFtZSxcbiAgc3RhdHVzTGFiZWwsXG59OiBFeHBlbnNlVGltZWxpbmVDYXJkUHJvcHMpID0+IHtcbiAgY29uc3Qgc2FmZVRpdGxlID0gbm9ybWFsaXplQ2FyZFRpdGxlVGV4dCh0aXRsZSwgXCItXCIpO1xuICBjb25zdCBzYWZlQW1vdW50ID0gYW1vdW50VGV4dCB8fCBcIi1cIjtcblxuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIGNsYXNzTmFtZT1cInRpbWVsaW5lLWNhcmQgdGltZWxpbmUtY2FyZC0tY2xpY2thYmxlXCJcbiAgICAgIHJvbGU9XCJidXR0b25cIlxuICAgICAgdGFiSW5kZXg9ezB9XG4gICAgICBvbkNsaWNrPXtvbk9wZW59XG4gICAgICBvbktleURvd249eyhldmVudCkgPT4ge1xuICAgICAgICBpZiAoZXZlbnQua2V5ID09PSBcIkVudGVyXCIgfHwgZXZlbnQua2V5ID09PSBcIiBcIikge1xuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgb25PcGVuKCk7XG4gICAgICAgIH1cbiAgICAgIH19XG4gICAgPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aW1lbGluZS1kYXRlLXBhbmVsIGZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0xIHB4LTMgcHktMyBiZy1zbGF0ZS01MCBib3JkZXItciBib3JkZXItc2xhdGUtMjAwIHRleHQtc2xhdGUtNjAwXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LXNlbWlib2xkIHRyYWNraW5nLVswLjJlbV0gdGV4dC1zbGF0ZS01MDBcIj57ZGF0ZVBhcnRzLnllYXJ9PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LXNlbWlib2xkIHVwcGVyY2FzZSB0cmFja2luZy1bMC4yZW1dIHRleHQtc2xhdGUtNTAwXCI+e2RhdGVQYXJ0cy5tb250aH08L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LTJ4bCBmb250LXNlbWlib2xkIHRleHQtcHJpbWFyeVwiPntkYXRlUGFydHMuZGF5fTwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpbWVsaW5lLWNhcmRfX2NvbnRlbnQgZmxleC0xIHB5LTMgcHgtNFwiPlxuICAgICAgICB7c3RhdHVzQ2xhc3NOYW1lID8gPHNwYW4gY2xhc3NOYW1lPXtzdGF0dXNDbGFzc05hbWV9IHRpdGxlPXtzdGF0dXNMYWJlbH0gYXJpYS1sYWJlbD17c3RhdHVzTGFiZWx9IC8+IDogbnVsbH1cbiAgICAgICAgPHAgY2xhc3NOYW1lPXt0aXRsZUNsYXNzTmFtZX0gZGF0YS1mdWxsdGV4dD17c2FmZVRpdGxlfT5cbiAgICAgICAgICB7c2FmZVRpdGxlfVxuICAgICAgICA8L3A+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YW1vdW50Q2xhc3NOYW1lfSBkYXRhLWZ1bGx0ZXh0PXtzYWZlQW1vdW50fT5cbiAgICAgICAgICB7c2FmZUFtb3VudH1cbiAgICAgICAgPC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlVGltZWxpbmVDYXJkO1xuIiwgImltcG9ydCBSZWFjdCwgeyB1c2VNZW1vIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgU2VsZWN0Q29tYm9ib3ggZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9TZWxlY3RDb21ib2JveC50c3hcIjtcbmltcG9ydCB7IGV4cGVuc2VDdXJyZW5jeU9wdGlvbnMgfSBmcm9tIFwiLi4vY29uc3RhbnRzL2N1cnJlbmN5Q29kZXMudHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNlbGVjdE9wdGlvbiB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlU2VsZWN0T3B0aW9ucy50c1wiO1xuXG50eXBlIEV4cGVuc2VDdXJyZW5jeUZpbHRlclNlbGVjdFByb3BzID0ge1xuICBsYWJlbDogc3RyaW5nO1xuICBwbGFjZWhvbGRlcjogc3RyaW5nO1xuICB2YWx1ZTogc3RyaW5nO1xuICBvbkNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHJlYWRPbmx5PzogYm9vbGVhbjtcbiAgZGlzYWJsZWQ/OiBib29sZWFuO1xuICBzaG93TGFiZWw/OiBib29sZWFuO1xuICBpZEJhc2U/OiBzdHJpbmc7XG59O1xuXG4vLyBTaGFyZWQgZml4ZWQgY3VycmVuY3kgY29tYm9ib3ggd2l0aCBsb2NhbCBpbnN0YW50IHNlYXJjaCBmb3IgZXhwZW5zZSBmaWx0ZXJzLlxuY29uc3QgRXhwZW5zZUN1cnJlbmN5RmlsdGVyU2VsZWN0ID0gKHtcbiAgbGFiZWwsXG4gIHBsYWNlaG9sZGVyLFxuICB2YWx1ZSxcbiAgb25DaGFuZ2UsXG4gIHJlYWRPbmx5ID0gZmFsc2UsXG4gIGRpc2FibGVkID0gZmFsc2UsXG4gIHNob3dMYWJlbCA9IHRydWUsXG4gIGlkQmFzZSA9IFwiZXhwZW5zZS1jdXJyZW5jeVwiLFxufTogRXhwZW5zZUN1cnJlbmN5RmlsdGVyU2VsZWN0UHJvcHMpID0+IHtcbiAgY29uc3Qgb3B0aW9ucyA9IHVzZU1lbW88RXhwZW5zZVNlbGVjdE9wdGlvbltdPigoKSA9PiBleHBlbnNlQ3VycmVuY3lPcHRpb25zLCBbXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8U2VsZWN0Q29tYm9ib3hcbiAgICAgIGxhYmVsPXtsYWJlbH1cbiAgICAgIHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cbiAgICAgIG9wdGlvbnM9e29wdGlvbnN9XG4gICAgICB2YWx1ZT17U3RyaW5nKHZhbHVlIHx8IFwiXCIpLnRyaW0oKS50b1VwcGVyQ2FzZSgpfVxuICAgICAgb25DaGFuZ2U9eyhuZXh0VmFsdWUpID0+IG9uQ2hhbmdlKFN0cmluZyhuZXh0VmFsdWUgfHwgXCJcIikudHJpbSgpLnRvVXBwZXJDYXNlKCkpfVxuICAgICAgcmVhZE9ubHk9e3JlYWRPbmx5fVxuICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgYWxsb3dUZXh0SW5wdXRcbiAgICAgIHNob3dTZWFyY2hCdXR0b249e2ZhbHNlfVxuICAgICAgc2hvd0xhYmVsPXtzaG93TGFiZWx9XG4gICAgICB1c2VQb3J0YWw9e2ZhbHNlfVxuICAgICAgaWRCYXNlPXtpZEJhc2V9XG4gICAgICBwb3J0YWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxuICAgICAgcGFuZWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxuICAgIC8+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlQ3VycmVuY3lGaWx0ZXJTZWxlY3Q7XG5cclxuIiwgIlx1RkVGRi8vIEZpeGVkIElTTy1saWtlIGN1cnJlbmN5IGNvZGUgbGlzdCBmb3IgRXhwZW5zZSBTaGVldHMgZmlsdGVycy5cclxuLy8gU291cmNlOiBodHRwczovL3d3dy5pYmFuLmNvbS9jdXJyZW5jeS1jb2RlcyAocmV0cmlldmVkIDIwMjYtMDItMTApLlxyXG5leHBvcnQgY29uc3QgZXhwZW5zZUN1cnJlbmN5Q29kZXM6IHN0cmluZ1tdID0gW1xyXG4gIFwiQUVEXCIsXHJcbiAgXCJBRk5cIixcclxuICBcIkFMTFwiLFxyXG4gIFwiQU1EXCIsXHJcbiAgXCJBT0FcIixcclxuICBcIkFSU1wiLFxyXG4gIFwiQVVEXCIsXHJcbiAgXCJBV0dcIixcclxuICBcIkFaTlwiLFxyXG4gIFwiQkFNXCIsXHJcbiAgXCJCQkRcIixcclxuICBcIkJEVFwiLFxyXG4gIFwiQkhEXCIsXHJcbiAgXCJCSUZcIixcclxuICBcIkJNRFwiLFxyXG4gIFwiQk5EXCIsXHJcbiAgXCJCT0JcIixcclxuICBcIkJPVlwiLFxyXG4gIFwiQlJMXCIsXHJcbiAgXCJCU0RcIixcclxuICBcIkJUTlwiLFxyXG4gIFwiQldQXCIsXHJcbiAgXCJCWU5cIixcclxuICBcIkJaRFwiLFxyXG4gIFwiQ0FEXCIsXHJcbiAgXCJDREZcIixcclxuICBcIkNIRVwiLFxyXG4gIFwiQ0hGXCIsXHJcbiAgXCJDSFdcIixcclxuICBcIkNMRlwiLFxyXG4gIFwiQ0xQXCIsXHJcbiAgXCJDTllcIixcclxuICBcIkNPUFwiLFxyXG4gIFwiQ09VXCIsXHJcbiAgXCJDUkNcIixcclxuICBcIkNVQ1wiLFxyXG4gIFwiQ1VQXCIsXHJcbiAgXCJDVkVcIixcclxuICBcIkNaS1wiLFxyXG4gIFwiREpGXCIsXHJcbiAgXCJES0tcIixcclxuICBcIkRPUFwiLFxyXG4gIFwiRFpEXCIsXHJcbiAgXCJFR1BcIixcclxuICBcIkVSTlwiLFxyXG4gIFwiRVRCXCIsXHJcbiAgXCJFVVJcIixcclxuICBcIkZKRFwiLFxyXG4gIFwiRktQXCIsXHJcbiAgXCJHQlBcIixcclxuICBcIkdFTFwiLFxyXG4gIFwiR0hTXCIsXHJcbiAgXCJHSVBcIixcclxuICBcIkdNRFwiLFxyXG4gIFwiR05GXCIsXHJcbiAgXCJHVFFcIixcclxuICBcIkdZRFwiLFxyXG4gIFwiSEtEXCIsXHJcbiAgXCJITkxcIixcclxuICBcIkhUR1wiLFxyXG4gIFwiSFVGXCIsXHJcbiAgXCJJRFJcIixcclxuICBcIklMU1wiLFxyXG4gIFwiSU5SXCIsXHJcbiAgXCJJUURcIixcclxuICBcIklSUlwiLFxyXG4gIFwiSVNLXCIsXHJcbiAgXCJKTURcIixcclxuICBcIkpPRFwiLFxyXG4gIFwiSlBZXCIsXHJcbiAgXCJLRVNcIixcclxuICBcIktHU1wiLFxyXG4gIFwiS0hSXCIsXHJcbiAgXCJLTUZcIixcclxuICBcIktQV1wiLFxyXG4gIFwiS1JXXCIsXHJcbiAgXCJLV0RcIixcclxuICBcIktZRFwiLFxyXG4gIFwiS1pUXCIsXHJcbiAgXCJMQUtcIixcclxuICBcIkxCUFwiLFxyXG4gIFwiTEtSXCIsXHJcbiAgXCJMUkRcIixcclxuICBcIkxTTFwiLFxyXG4gIFwiTFlEXCIsXHJcbiAgXCJNQURcIixcclxuICBcIk1ETFwiLFxyXG4gIFwiTUdBXCIsXHJcbiAgXCJNS0RcIixcclxuICBcIk1NS1wiLFxyXG4gIFwiTU5UXCIsXHJcbiAgXCJNT1BcIixcclxuICBcIk1SVVwiLFxyXG4gIFwiTVVSXCIsXHJcbiAgXCJNVlJcIixcclxuICBcIk1XS1wiLFxyXG4gIFwiTVhOXCIsXHJcbiAgXCJNWFZcIixcclxuICBcIk1ZUlwiLFxyXG4gIFwiTVpOXCIsXHJcbiAgXCJOQURcIixcclxuICBcIk5HTlwiLFxyXG4gIFwiTklPXCIsXHJcbiAgXCJOT0tcIixcclxuICBcIk5QUlwiLFxyXG4gIFwiTlpEXCIsXHJcbiAgXCJPTVJcIixcclxuICBcIlBBQlwiLFxyXG4gIFwiUEVOXCIsXHJcbiAgXCJQR0tcIixcclxuICBcIlBIUFwiLFxyXG4gIFwiUEtSXCIsXHJcbiAgXCJQTE5cIixcclxuICBcIlBZR1wiLFxyXG4gIFwiUUFSXCIsXHJcbiAgXCJST05cIixcclxuICBcIlJTRFwiLFxyXG4gIFwiUlVCXCIsXHJcbiAgXCJSV0ZcIixcclxuICBcIlNBUlwiLFxyXG4gIFwiU0JEXCIsXHJcbiAgXCJTQ1JcIixcclxuICBcIlNER1wiLFxyXG4gIFwiU0VLXCIsXHJcbiAgXCJTR0RcIixcclxuICBcIlNIUFwiLFxyXG4gIFwiU0xFXCIsXHJcbiAgXCJTT1NcIixcclxuICBcIlNSRFwiLFxyXG4gIFwiU1NQXCIsXHJcbiAgXCJTVE5cIixcclxuICBcIlNWQ1wiLFxyXG4gIFwiU1lQXCIsXHJcbiAgXCJTWkxcIixcclxuICBcIlRIQlwiLFxyXG4gIFwiVEpTXCIsXHJcbiAgXCJUTVRcIixcclxuICBcIlRORFwiLFxyXG4gIFwiVE9QXCIsXHJcbiAgXCJUUllcIixcclxuICBcIlRURFwiLFxyXG4gIFwiVFdEXCIsXHJcbiAgXCJUWlNcIixcclxuICBcIlVBSFwiLFxyXG4gIFwiVUdYXCIsXHJcbiAgXCJVU0RcIixcclxuICBcIlVTTlwiLFxyXG4gIFwiVVlJXCIsXHJcbiAgXCJVWVVcIixcclxuICBcIlVaU1wiLFxyXG4gIFwiVkVEXCIsXHJcbiAgXCJWRUZcIixcclxuICBcIlZORFwiLFxyXG4gIFwiVlVWXCIsXHJcbiAgXCJXU1RcIixcclxuICBcIlhBRlwiLFxyXG4gIFwiWENEXCIsXHJcbiAgXCJYQ0dcIixcclxuICBcIlhEUlwiLFxyXG4gIFwiWE9GXCIsXHJcbiAgXCJYUEZcIixcclxuICBcIlhTVVwiLFxyXG4gIFwiWFVBXCIsXHJcbiAgXCJZRVJcIixcclxuICBcIlpBUlwiLFxyXG4gIFwiWk1XXCIsXHJcbiAgXCJaV0xcIixcclxuXTtcclxuXHJcbmV4cG9ydCBjb25zdCBleHBlbnNlQ3VycmVuY3lPcHRpb25zID0gZXhwZW5zZUN1cnJlbmN5Q29kZXMubWFwKChjb2RlKSA9PiAoeyB2YWx1ZTogY29kZSwgdGV4dDogY29kZSB9KSk7XHJcbiIsICJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2sgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBSZW1vdGVTZWFyY2hDb21ib2JveCwgeyB0eXBlIFJlbW90ZVNlYXJjaE9wdGlvbiB9IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvUmVtb3RlU2VhcmNoQ29tYm9ib3gudHN4XCI7XG5pbXBvcnQgeyBmZXRjaEV4cGVuc2VQcm9qZWN0cyB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlQXBpLnRzXCI7XG5cbnR5cGUgRXhwZW5zZVByb2plY3RGaWx0ZXJJbnB1dFByb3BzID0ge1xuICBsYWJlbDogc3RyaW5nO1xuICBwbGFjZWhvbGRlcjogc3RyaW5nO1xuICB2YWx1ZTogc3RyaW5nO1xuICBvbkNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHJlYWRPbmx5PzogYm9vbGVhbjtcbiAgZGlzYWJsZWQ/OiBib29sZWFuO1xuICBzaG93TGFiZWw/OiBib29sZWFuO1xufTtcblxuY29uc3QgU0VBUkNIX1BBR0VfU0laRSA9IDEwO1xuXG5jb25zdCBtYXBQcm9qZWN0T3B0aW9ucyA9IChpdGVtczogQXJyYXk8eyB2YWx1ZT86IHN0cmluZzsgdGV4dD86IHN0cmluZyB9PiB8IHVuZGVmaW5lZCk6IFJlbW90ZVNlYXJjaE9wdGlvbltdID0+IHtcbiAgcmV0dXJuIChBcnJheS5pc0FycmF5KGl0ZW1zKSA/IGl0ZW1zIDogW10pXG4gICAgLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgY29uc3QgdmFsdWVUZXh0ID0gU3RyaW5nKGl0ZW0/LnZhbHVlIHx8IFwiXCIpLnRyaW0oKTtcbiAgICAgIGlmICghdmFsdWVUZXh0KSByZXR1cm4gbnVsbDtcbiAgICAgIGNvbnN0IHN1YnRpdGxlID0gU3RyaW5nKGl0ZW0/LnRleHQgfHwgXCJcIikudHJpbSgpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdmFsdWU6IHZhbHVlVGV4dCxcbiAgICAgICAgdGl0bGU6IHZhbHVlVGV4dCxcbiAgICAgICAgc3VidGl0bGU6IHN1YnRpdGxlIHx8IFwiLVwiLFxuICAgICAgfSBhcyBSZW1vdGVTZWFyY2hPcHRpb247XG4gICAgfSlcbiAgICAuZmlsdGVyKEJvb2xlYW4pIGFzIFJlbW90ZVNlYXJjaE9wdGlvbltdO1xufTtcblxuLy8gUHJvamVjdCBmaWx0ZXIgaW5wdXQgYmFja2VkIGJ5IHJlbW90ZSBkcm9wZG93biBzdWdnZXN0aW9ucy5cbmNvbnN0IEV4cGVuc2VQcm9qZWN0RmlsdGVySW5wdXQgPSAoe1xuICBsYWJlbCxcbiAgcGxhY2Vob2xkZXIsXG4gIHZhbHVlLFxuICBvbkNoYW5nZSxcbiAgcmVhZE9ubHkgPSBmYWxzZSxcbiAgZGlzYWJsZWQgPSBmYWxzZSxcbiAgc2hvd0xhYmVsID0gdHJ1ZSxcbn06IEV4cGVuc2VQcm9qZWN0RmlsdGVySW5wdXRQcm9wcykgPT4ge1xuICBjb25zdCBsb2FkT3B0aW9ucyA9IHVzZUNhbGxiYWNrKGFzeW5jICh0ZXJtOiBzdHJpbmcsIHNpZ25hbDogQWJvcnRTaWduYWwpOiBQcm9taXNlPFJlbW90ZVNlYXJjaE9wdGlvbltdPiA9PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEV4cGVuc2VQcm9qZWN0cyh0ZXJtLCAxLCBTRUFSQ0hfUEFHRV9TSVpFLCB7XG4gICAgICBzaWduYWwsXG4gICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcbiAgICB9KTtcblxuICAgIHJldHVybiBtYXBQcm9qZWN0T3B0aW9ucyhyZXNwb25zZT8uaXRlbXMpO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgbG9hZE9wdGlvbnNQYWdlID0gdXNlQ2FsbGJhY2soYXN5bmMgKHRlcm06IHN0cmluZywgcGFnZTogbnVtYmVyLCBwYWdlU2l6ZTogbnVtYmVyLCBzaWduYWw6IEFib3J0U2lnbmFsKSA9PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEV4cGVuc2VQcm9qZWN0cyh0ZXJtLCBwYWdlLCBwYWdlU2l6ZSwge1xuICAgICAgc2lnbmFsLFxuICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXG4gICAgfSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgaXRlbXM6IG1hcFByb2plY3RPcHRpb25zKHJlc3BvbnNlPy5pdGVtcyksXG4gICAgICB0b3RhbDogTnVtYmVyKHJlc3BvbnNlPy50b3RhbCB8fCAwKSxcbiAgICB9O1xuICB9LCBbXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8UmVtb3RlU2VhcmNoQ29tYm9ib3hcbiAgICAgIGxhYmVsPXtsYWJlbH1cbiAgICAgIHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cbiAgICAgIHZhbHVlPXt2YWx1ZX1cbiAgICAgIG9uQ2hhbmdlPXtvbkNoYW5nZX1cbiAgICAgIG9uU2VhcmNoPXtsb2FkT3B0aW9uc31cbiAgICAgIG9uU2VhcmNoUGFnZT17bG9hZE9wdGlvbnNQYWdlfVxuICAgICAgaWRCYXNlPVwiZXhwZW5zZS1wcm9qZWN0LWZpbHRlclwiXG4gICAgICBtaW5TZWFyY2hMZW5ndGg9ezB9XG4gICAgICBwYWdlU2l6ZT17U0VBUkNIX1BBR0VfU0laRX1cbiAgICAgIGFsbG93RW1wdHlTZWFyY2hcbiAgICAgIGxvYWRPbk9wZW5cbiAgICAgIGluZmluaXRlU2Nyb2xsXG4gICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICByZWFkT25seT17cmVhZE9ubHl9XG4gICAgICBzaG93TGFiZWw9e3Nob3dMYWJlbH1cbiAgICAgIHBhbmVsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcbiAgICAvPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVByb2plY3RGaWx0ZXJJbnB1dDtcbiIsICJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IEZsb2F0aW5nTGlzdCBmcm9tIFwiLi9GbG9hdGluZ0xpc3QudHN4XCI7XG5pbXBvcnQgU3Bpbm5lciBmcm9tIFwiLi9TcGlubmVyLnRzeFwiO1xuaW1wb3J0IHsgQ2hldnJvbkRvd25TdmcsIENoZXZyb25VcFN2ZyB9IGZyb20gXCIuL2NoZXZyb25zLnRzeFwiO1xuaW1wb3J0IHsgaGFuZGxlQ29tYm9ib3hLZXlEb3duIH0gZnJvbSBcIi4uLy4uL2hvb2tzL3VzZUNvbWJvYm94S2V5Ym9hcmQudHNcIjtcbmltcG9ydCB7IHVzZU91dHNpZGVDbGljayB9IGZyb20gXCIuLi8uLi9ob29rcy91c2VPdXRzaWRlQ2xpY2sudHNcIjtcbmltcG9ydCB7IGNsYXNzTmFtZXMgfSBmcm9tIFwiLi4vLi4vdXRpbHMvY2xhc3NOYW1lcy50c1wiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5cbmV4cG9ydCB0eXBlIFJlbW90ZVNlYXJjaE9wdGlvbiA9IHtcbiAgdmFsdWU6IHN0cmluZztcbiAgdGl0bGU/OiBzdHJpbmc7XG4gIHN1YnRpdGxlPzogc3RyaW5nO1xufTtcblxudHlwZSBSZW1vdGVTZWFyY2hDb21ib2JveFByb3BzID0ge1xuICBsYWJlbDogc3RyaW5nO1xuICBwbGFjZWhvbGRlcjogc3RyaW5nO1xuICB2YWx1ZTogc3RyaW5nO1xuICBvbkNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uU2VhcmNoOiAodGVybTogc3RyaW5nLCBzaWduYWw6IEFib3J0U2lnbmFsKSA9PiBQcm9taXNlPFJlbW90ZVNlYXJjaE9wdGlvbltdPjtcbiAgb25TZWFyY2hQYWdlPzogKFxuICAgIHRlcm06IHN0cmluZyxcbiAgICBwYWdlOiBudW1iZXIsXG4gICAgcGFnZVNpemU6IG51bWJlcixcbiAgICBzaWduYWw6IEFib3J0U2lnbmFsXG4gICkgPT4gUHJvbWlzZTx7IGl0ZW1zOiBSZW1vdGVTZWFyY2hPcHRpb25bXTsgdG90YWw/OiBudW1iZXIgfT47XG4gIGlkQmFzZTogc3RyaW5nO1xuICBtaW5TZWFyY2hMZW5ndGg/OiBudW1iZXI7XG4gIHBhZ2VTaXplPzogbnVtYmVyO1xuICBhbGxvd0VtcHR5U2VhcmNoPzogYm9vbGVhbjtcbiAgbG9hZE9uT3Blbj86IGJvb2xlYW47XG4gIGluZmluaXRlU2Nyb2xsPzogYm9vbGVhbjtcbiAgZGlzYWJsZWQ/OiBib29sZWFuO1xuICByZWFkT25seT86IGJvb2xlYW47XG4gIHNob3dMYWJlbD86IGJvb2xlYW47XG4gIHBhbmVsQ2xhc3NOYW1lPzogc3RyaW5nO1xufTtcblxuY29uc3QgdW5pcXVlQnlWYWx1ZSA9IChpdGVtczogUmVtb3RlU2VhcmNoT3B0aW9uW10pOiBSZW1vdGVTZWFyY2hPcHRpb25bXSA9PiB7XG4gIGNvbnN0IG1hcCA9IG5ldyBNYXA8c3RyaW5nLCBSZW1vdGVTZWFyY2hPcHRpb24+KCk7XG4gIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcyB8fCBbXSkge1xuICAgIGNvbnN0IGtleSA9IFN0cmluZyhpdGVtLnZhbHVlIHx8IFwiXCIpLnRyaW0oKTtcbiAgICBpZiAoIWtleSkgY29udGludWU7XG4gICAgaWYgKG1hcC5oYXMoa2V5KSkgY29udGludWU7XG4gICAgbWFwLnNldChrZXksIHtcbiAgICAgIHZhbHVlOiBrZXksXG4gICAgICB0aXRsZTogU3RyaW5nKGl0ZW0udGl0bGUgfHwgXCJcIikudHJpbSgpLFxuICAgICAgc3VidGl0bGU6IFN0cmluZyhpdGVtLnN1YnRpdGxlIHx8IFwiXCIpLnRyaW0oKSxcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gQXJyYXkuZnJvbShtYXAudmFsdWVzKCkpO1xufTtcblxuLy8gR2VuZXJpYyByZW1vdGUtc2VhcmNoIGNvbWJvYm94IHRoYXQgc3VwcG9ydHMgbWFudWFsIHNlYXJjaCBhbmQgb3B0aW9uYWwgcGFnZWQgbG9hZGluZyBvbiBvcGVuLlxuY29uc3QgUmVtb3RlU2VhcmNoQ29tYm9ib3ggPSAoe1xuICBsYWJlbCxcbiAgcGxhY2Vob2xkZXIsXG4gIHZhbHVlLFxuICBvbkNoYW5nZSxcbiAgb25TZWFyY2gsXG4gIG9uU2VhcmNoUGFnZSxcbiAgaWRCYXNlLFxuICBtaW5TZWFyY2hMZW5ndGggPSAyLFxuICBwYWdlU2l6ZSA9IDIwLFxuICBhbGxvd0VtcHR5U2VhcmNoID0gZmFsc2UsXG4gIGxvYWRPbk9wZW4gPSBmYWxzZSxcbiAgaW5maW5pdGVTY3JvbGwgPSBmYWxzZSxcbiAgZGlzYWJsZWQgPSBmYWxzZSxcbiAgcmVhZE9ubHkgPSBmYWxzZSxcbiAgc2hvd0xhYmVsID0gdHJ1ZSxcbiAgcGFuZWxDbGFzc05hbWUgPSBcInZpc2l0YXMtdHlwb2dyYXBoeVwiLFxufTogUmVtb3RlU2VhcmNoQ29tYm9ib3hQcm9wcykgPT4ge1xuICBjb25zdCByZWFkT25seU1vZGUgPSByZWFkT25seSB8fCBkaXNhYmxlZDtcbiAgY29uc3QgdmFsdWVDb2xvciA9IHJlYWRPbmx5TW9kZSA/IFwiIzY0NzQ4YlwiIDogXCIjMDAyOTZiZTBcIjtcbiAgY29uc3QgW3F1ZXJ5LCBzZXRRdWVyeV0gPSB1c2VTdGF0ZSh2YWx1ZSB8fCBcIlwiKTtcbiAgY29uc3QgW29wdGlvbnMsIHNldE9wdGlvbnNdID0gdXNlU3RhdGU8UmVtb3RlU2VhcmNoT3B0aW9uW10+KFtdKTtcbiAgY29uc3QgW29wZW4sIHNldE9wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFthY3RpdmVJbmRleCwgc2V0QWN0aXZlSW5kZXhdID0gdXNlU3RhdGUoMCk7XG4gIGNvbnN0IFtsYXN0U2VhcmNoZWRUZXJtLCBzZXRMYXN0U2VhcmNoZWRUZXJtXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbY3VycmVudFBhZ2UsIHNldEN1cnJlbnRQYWdlXSA9IHVzZVN0YXRlKDApO1xuICBjb25zdCBbaGFzTW9yZSwgc2V0SGFzTW9yZV0gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgY29uc3QgYWJvcnRSZWYgPSB1c2VSZWY8QWJvcnRDb250cm9sbGVyIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IGNvbnRhaW5lclJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBib3hSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgbGlzdFJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xuXG4gIHVzZU91dHNpZGVDbGljayhbY29udGFpbmVyUmVmLCBsaXN0UmVmXSwgKCkgPT4gc2V0T3BlbihmYWxzZSkpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc2V0UXVlcnkodmFsdWUgfHwgXCJcIik7XG4gIH0sIFt2YWx1ZV0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGFib3J0UmVmLmN1cnJlbnQ/LmFib3J0KCk7XG4gICAgICBhYm9ydFJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICB9O1xuICB9LCBbXSk7XG5cbiAgY29uc3QgZmlsdGVyZWQgPSB1c2VNZW1vKCgpID0+IHtcbiAgICBpZiAoIXF1ZXJ5LnRyaW0oKSkgcmV0dXJuIG9wdGlvbnM7XG4gICAgY29uc3QgcSA9IHF1ZXJ5LnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICAgIHJldHVybiBvcHRpb25zLmZpbHRlcigob3B0aW9uKSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZVRleHQgPSBvcHRpb24udmFsdWUudG9Mb3dlckNhc2UoKTtcbiAgICAgIGNvbnN0IHRpdGxlVGV4dCA9IFN0cmluZyhvcHRpb24udGl0bGUgfHwgXCJcIikudG9Mb3dlckNhc2UoKTtcbiAgICAgIGNvbnN0IHN1YnRpdGxlVGV4dCA9IFN0cmluZyhvcHRpb24uc3VidGl0bGUgfHwgXCJcIikudG9Mb3dlckNhc2UoKTtcbiAgICAgIHJldHVybiB2YWx1ZVRleHQuaW5jbHVkZXMocSkgfHwgdGl0bGVUZXh0LmluY2x1ZGVzKHEpIHx8IHN1YnRpdGxlVGV4dC5pbmNsdWRlcyhxKTtcbiAgICB9KTtcbiAgfSwgW29wdGlvbnMsIHF1ZXJ5XSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBzZXRBY3RpdmVJbmRleCgwKTtcbiAgfSwgW2ZpbHRlcmVkLmxlbmd0aCwgcXVlcnldKTtcblxuICBjb25zdCBjYW5TZWFyY2hUZXJtID0gdXNlQ2FsbGJhY2soXG4gICAgKHRlcm06IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xuICAgICAgY29uc3QgdHJpbW1lZCA9IHRlcm0udHJpbSgpO1xuICAgICAgaWYgKCF0cmltbWVkKSByZXR1cm4gYWxsb3dFbXB0eVNlYXJjaDtcbiAgICAgIHJldHVybiB0cmltbWVkLmxlbmd0aCA+PSBtaW5TZWFyY2hMZW5ndGg7XG4gICAgfSxcbiAgICBbYWxsb3dFbXB0eVNlYXJjaCwgbWluU2VhcmNoTGVuZ3RoXVxuICApO1xuXG4gIGNvbnN0IGV4ZWN1dGVTZWFyY2ggPSB1c2VDYWxsYmFjayhcbiAgICBhc3luYyAodGVybTogc3RyaW5nLCBwYWdlOiBudW1iZXIsIGFwcGVuZDogYm9vbGVhbikgPT4ge1xuICAgICAgYWJvcnRSZWYuY3VycmVudD8uYWJvcnQoKTtcbiAgICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XG4gICAgICBhYm9ydFJlZi5jdXJyZW50ID0gY29udHJvbGxlcjtcbiAgICAgIHNldExvYWRpbmcodHJ1ZSk7XG5cbiAgICAgIGNvbnN0IHRlcm1LZXkgPSB0ZXJtLnRvTG93ZXJDYXNlKCk7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAob25TZWFyY2hQYWdlKSB7XG4gICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBvblNlYXJjaFBhZ2UodGVybSwgcGFnZSwgcGFnZVNpemUsIGNvbnRyb2xsZXIuc2lnbmFsKTtcbiAgICAgICAgICBjb25zdCBwYWdlSXRlbXMgPSB1bmlxdWVCeVZhbHVlKEFycmF5LmlzQXJyYXkocmVzcG9uc2U/Lml0ZW1zKSA/IHJlc3BvbnNlLml0ZW1zIDogW10pO1xuICAgICAgICAgIHNldE9wdGlvbnMoKHByZXZpb3VzKSA9PiAoYXBwZW5kID8gdW5pcXVlQnlWYWx1ZShbLi4uKHByZXZpb3VzIHx8IFtdKSwgLi4ucGFnZUl0ZW1zXSkgOiBwYWdlSXRlbXMpKTtcbiAgICAgICAgICBzZXRDdXJyZW50UGFnZShwYWdlKTtcblxuICAgICAgICAgIGNvbnN0IGFwaVRvdGFsID0gTnVtYmVyKHJlc3BvbnNlPy50b3RhbCk7XG4gICAgICAgICAgaWYgKE51bWJlci5pc0Zpbml0ZShhcGlUb3RhbCkgJiYgYXBpVG90YWwgPiAwKSB7XG4gICAgICAgICAgICBzZXRIYXNNb3JlKHBhZ2UgKiBwYWdlU2l6ZSA8IGFwaVRvdGFsKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2V0SGFzTW9yZShwYWdlSXRlbXMubGVuZ3RoID49IHBhZ2VTaXplKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBvblNlYXJjaCh0ZXJtLCBjb250cm9sbGVyLnNpZ25hbCk7XG4gICAgICAgICAgY29uc3QgbmV4dCA9IHVuaXF1ZUJ5VmFsdWUocmVzcG9uc2UgfHwgW10pO1xuICAgICAgICAgIHNldE9wdGlvbnMobmV4dCk7XG4gICAgICAgICAgc2V0Q3VycmVudFBhZ2UoMSk7XG4gICAgICAgICAgc2V0SGFzTW9yZShmYWxzZSk7XG4gICAgICAgIH1cblxuICAgICAgICBzZXRMYXN0U2VhcmNoZWRUZXJtKHRlcm1LZXkpO1xuICAgICAgICBzZXRPcGVuKHRydWUpO1xuICAgICAgfSBjYXRjaCB7XG4gICAgICAgIGlmICghYXBwZW5kKSB7XG4gICAgICAgICAgc2V0T3B0aW9ucyhbXSk7XG4gICAgICAgICAgc2V0Q3VycmVudFBhZ2UoMCk7XG4gICAgICAgICAgc2V0SGFzTW9yZShmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgc2V0TGFzdFNlYXJjaGVkVGVybSh0ZXJtS2V5KTtcbiAgICAgICAgc2V0T3Blbih0cnVlKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGlmIChhYm9ydFJlZi5jdXJyZW50ID09PSBjb250cm9sbGVyKSB7XG4gICAgICAgICAgYWJvcnRSZWYuY3VycmVudCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBbb25TZWFyY2gsIG9uU2VhcmNoUGFnZSwgcGFnZVNpemVdXG4gICk7XG5cbiAgY29uc3QgcnVuU2VhcmNoID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xuICAgIGlmIChyZWFkT25seU1vZGUgfHwgbG9hZGluZykgcmV0dXJuO1xuICAgIGNvbnN0IHRlcm0gPSBxdWVyeS50cmltKCk7XG4gICAgY29uc3QgdGVybUtleSA9IHRlcm0udG9Mb3dlckNhc2UoKTtcblxuICAgIGlmICghY2FuU2VhcmNoVGVybSh0ZXJtKSkge1xuICAgICAgc2V0T3B0aW9ucyhbXSk7XG4gICAgICBzZXRDdXJyZW50UGFnZSgwKTtcbiAgICAgIHNldEhhc01vcmUoZmFsc2UpO1xuICAgICAgc2V0T3BlbihmYWxzZSk7XG4gICAgICBzZXRMYXN0U2VhcmNoZWRUZXJtKFwiXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0ZXJtS2V5ID09PSBsYXN0U2VhcmNoZWRUZXJtICYmIG9wdGlvbnMubGVuZ3RoID4gMCAmJiAhb25TZWFyY2hQYWdlKSB7XG4gICAgICBzZXRPcGVuKHRydWUpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGF3YWl0IGV4ZWN1dGVTZWFyY2godGVybSwgMSwgZmFsc2UpO1xuICB9LCBbY2FuU2VhcmNoVGVybSwgZXhlY3V0ZVNlYXJjaCwgbGFzdFNlYXJjaGVkVGVybSwgbG9hZGluZywgb25TZWFyY2hQYWdlLCBvcHRpb25zLmxlbmd0aCwgcXVlcnksIHJlYWRPbmx5TW9kZV0pO1xuXG4gIGNvbnN0IHJ1bkxvYWRNb3JlID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xuICAgIGlmIChyZWFkT25seU1vZGUgfHwgbG9hZGluZyB8fCAhb25TZWFyY2hQYWdlIHx8ICFpbmZpbml0ZVNjcm9sbCB8fCAhaGFzTW9yZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHRlcm0gPSBxdWVyeS50cmltKCk7XG4gICAgY29uc3QgdGVybUtleSA9IHRlcm0udG9Mb3dlckNhc2UoKTtcbiAgICBpZiAodGVybUtleSAhPT0gbGFzdFNlYXJjaGVkVGVybSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG5leHRQYWdlID0gY3VycmVudFBhZ2UgKyAxO1xuICAgIGlmIChuZXh0UGFnZSA8PSAxKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgYXdhaXQgZXhlY3V0ZVNlYXJjaCh0ZXJtLCBuZXh0UGFnZSwgdHJ1ZSk7XG4gIH0sIFtjdXJyZW50UGFnZSwgZXhlY3V0ZVNlYXJjaCwgaGFzTW9yZSwgaW5maW5pdGVTY3JvbGwsIGxhc3RTZWFyY2hlZFRlcm0sIGxvYWRpbmcsIG9uU2VhcmNoUGFnZSwgcXVlcnksIHJlYWRPbmx5TW9kZV0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFvcGVuIHx8ICFvblNlYXJjaFBhZ2UgfHwgIWluZmluaXRlU2Nyb2xsKSByZXR1cm47XG4gICAgY29uc3Qgc2Nyb2xsZXIgPSBsaXN0UmVmLmN1cnJlbnQ/LnBhcmVudEVsZW1lbnQ7XG4gICAgaWYgKCFzY3JvbGxlcikgcmV0dXJuO1xuXG4gICAgY29uc3Qgb25TY3JvbGwgPSAoKSA9PiB7XG4gICAgICBpZiAobG9hZGluZyB8fCAhaGFzTW9yZSkgcmV0dXJuO1xuICAgICAgY29uc3QgdGhyZXNob2xkID0gNDA7XG4gICAgICBjb25zdCBpc05lYXJCb3R0b20gPSBzY3JvbGxlci5zY3JvbGxUb3AgKyBzY3JvbGxlci5jbGllbnRIZWlnaHQgPj0gc2Nyb2xsZXIuc2Nyb2xsSGVpZ2h0IC0gdGhyZXNob2xkO1xuICAgICAgaWYgKGlzTmVhckJvdHRvbSkge1xuICAgICAgICB2b2lkIHJ1bkxvYWRNb3JlKCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHNjcm9sbGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgb25TY3JvbGwsIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgc2Nyb2xsZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBvblNjcm9sbCk7XG4gICAgfTtcbiAgfSwgW2hhc01vcmUsIGluZmluaXRlU2Nyb2xsLCBsb2FkaW5nLCBvblNlYXJjaFBhZ2UsIG9wZW4sIHJ1bkxvYWRNb3JlXSk7XG5cbiAgY29uc3Qgc2VsZWN0T3B0aW9uID0gKG9wdGlvbjogUmVtb3RlU2VhcmNoT3B0aW9uKSA9PiB7XG4gICAgY29uc3QgbmV4dFZhbHVlID0gU3RyaW5nKG9wdGlvbi52YWx1ZSB8fCBcIlwiKS50cmltKCk7XG4gICAgc2V0UXVlcnkobmV4dFZhbHVlKTtcbiAgICBvbkNoYW5nZShuZXh0VmFsdWUpO1xuICAgIHNldExhc3RTZWFyY2hlZFRlcm0obmV4dFZhbHVlLnRvTG93ZXJDYXNlKCkpO1xuICAgIHNldE9wZW4oZmFsc2UpO1xuICB9O1xuXG4gIGNvbnN0IHF1ZXJ5S2V5ID0gcXVlcnkudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG4gIGNvbnN0IHNob3dTZWFyY2hJY29uID1cbiAgICAhcmVhZE9ubHlNb2RlICYmXG4gICAgIWxvYWRpbmcgJiZcbiAgICBjYW5TZWFyY2hUZXJtKHF1ZXJ5KSAmJlxuICAgIHF1ZXJ5S2V5ICE9PSBsYXN0U2VhcmNoZWRUZXJtO1xuXG4gIGNvbnN0IGxpc3RJZCA9IGAke2lkQmFzZX0tb3B0aW9uc2A7XG4gIGNvbnN0IGFjdGl2ZUlkID0gb3BlbiAmJiBmaWx0ZXJlZFthY3RpdmVJbmRleF0gPyBgJHtpZEJhc2V9LW9wdC0ke2ZpbHRlcmVkW2FjdGl2ZUluZGV4XS52YWx1ZX1gIDogdW5kZWZpbmVkO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIiByZWY9e2NvbnRhaW5lclJlZn0+XG4gICAgICB7c2hvd0xhYmVsID8gKFxuICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZm9ybS1sYWJlbCBmb250LXNlbWlib2xkXCIgc3R5bGU9e3sgY29sb3I6IFwiIzAwMjk2YmUwXCIgfX0+XG4gICAgICAgICAge2xhYmVsfVxuICAgICAgICA8L2xhYmVsPlxuICAgICAgKSA6IG51bGx9XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlXCI+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICByZWY9e2JveFJlZn1cbiAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICBcInJlbGF0aXZlIHctZnVsbCByb3VuZGVkLXhsIGJnLXdoaXRlIHRleHQtbGVmdCBmb2N1cy13aXRoaW46Ym9yZGVyLXByaW1hcnkgZm9jdXMtd2l0aGluOnJpbmctMiBmb2N1cy13aXRoaW46cmluZy1wcmltYXJ5IGZvY3VzLXdpdGhpbjpyaW5nLW9mZnNldC13aGl0ZSBzbTp0ZXh0LXNtXCIsXG4gICAgICAgICAgICByZWFkT25seU1vZGUgPyBcImluZC1yZWFkb25seS1maWVsZFwiIDogXCJcIlxuICAgICAgICAgICl9XG4gICAgICAgID5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgICAgICAgXCJ3LWZ1bGwgcm91bmRlZC14bCBib3JkZXIgcHgtMyBweS0yIHByLTIwIHRleHQtc20gc206dGV4dC1iYXNlIGxlYWRpbmctNSBmb2N1czpvdXRsaW5lLWhpZGRlbiBmb2N1czpyaW5nLTIgZGlzYWJsZWQ6Ymctc2xhdGUtMTAwIGRpc2FibGVkOnRleHQtc2xhdGUtNTAwIGRpc2FibGVkOmJvcmRlci1zbGF0ZS0yMDAgZGlzYWJsZWQ6Y3Vyc29yLW5vdC1hbGxvd2VkXCIsXG4gICAgICAgICAgICAgIFwiYm9yZGVyLXNsYXRlLTIwMCBmb2N1czpyaW5nLXByaW1hcnkgZm9jdXM6Ym9yZGVyLXByaW1hcnlcIixcbiAgICAgICAgICAgICAgcmVhZE9ubHlNb2RlID8gXCJpbmQtcmVhZG9ubHktZmllbGRcIiA6IFwidGV4dC1zbGF0ZS05MDBcIlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIHN0eWxlPXt7IGNvbG9yOiB2YWx1ZUNvbG9yIH19XG4gICAgICAgICAgICB2YWx1ZT17cXVlcnl9XG4gICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IG5leHRWYWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICAgICAgICAgICAgc2V0UXVlcnkobmV4dFZhbHVlKTtcbiAgICAgICAgICAgICAgb25DaGFuZ2UobmV4dFZhbHVlKTtcbiAgICAgICAgICAgICAgaWYgKG5leHRWYWx1ZS50cmltKCkudG9Mb3dlckNhc2UoKSAhPT0gbGFzdFNlYXJjaGVkVGVybSkge1xuICAgICAgICAgICAgICAgIHNldE9wZW4oZmFsc2UpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgb25Gb2N1cz17KCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoIXJlYWRPbmx5TW9kZSAmJiBmaWx0ZXJlZC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgc2V0T3Blbih0cnVlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIG9uS2V5RG93bj17KGV2ZW50KSA9PlxuICAgICAgICAgICAgICBoYW5kbGVDb21ib2JveEtleURvd24oZXZlbnQsIHtcbiAgICAgICAgICAgICAgICBpc09wZW46IG9wZW4sXG4gICAgICAgICAgICAgICAgc2V0T3BlbixcbiAgICAgICAgICAgICAgICBvcHRpb25Db3VudDogZmlsdGVyZWQubGVuZ3RoLFxuICAgICAgICAgICAgICAgIHNldEFjdGl2ZUluZGV4LFxuICAgICAgICAgICAgICAgIG9uRW50ZXJXaGVuT3BlbjogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgaWYgKGZpbHRlcmVkLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0T3B0aW9uKGZpbHRlcmVkW2FjdGl2ZUluZGV4XSA/PyBmaWx0ZXJlZFswXSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIHZvaWQgcnVuU2VhcmNoKCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvbkVudGVyV2hlbkNsb3NlZDogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgdm9pZCBydW5TZWFyY2goKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9wZW5PbkFycm93OiB0cnVlLFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxuICAgICAgICAgICAgcmVhZE9ubHk9e3JlYWRPbmx5fVxuICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgICAgYXJpYS1sYWJlbD17bGFiZWx9XG4gICAgICAgICAgICByb2xlPVwiY29tYm9ib3hcIlxuICAgICAgICAgICAgYXJpYS1leHBhbmRlZD17b3Blbn1cbiAgICAgICAgICAgIGFyaWEtY29udHJvbHM9e2xpc3RJZH1cbiAgICAgICAgICAgIGFyaWEtYWN0aXZlZGVzY2VuZGFudD17YWN0aXZlSWR9XG4gICAgICAgICAgLz5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQteS0wIHJpZ2h0LTAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgcHItMlwiPlxuICAgICAgICAgICAge2xvYWRpbmcgPyAoXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHB4LTEuNVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuICAgICAgICAgICAgICAgIDxTcGlubmVyIHNpemU9XCJoLTQgdy00XCIgLz5cbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgKSA6IG51bGx9XG5cbiAgICAgICAgICAgIHtzaG93U2VhcmNoSWNvbiA/IChcbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHAtMS41IHRleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtc2xhdGUtNTAwXCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICB2b2lkIHJ1blNlYXJjaCgpO1xuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17aW5kVChcIkNvbW1vbl9TZWFyY2hcIiwgXCJTZWFyY2hcIil9XG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3JlYWRPbmx5TW9kZX1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGZpbGw9XCJub25lXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIHN0cm9rZVdpZHRoPXsxLjV9IHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIGNsYXNzTmFtZT1cImgtNSB3LTVcIj5cbiAgICAgICAgICAgICAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwibTE1Ljc1IDE1Ljc1LTIuNDg5LTIuNDg5bTAgMGEzLjM3NSAzLjM3NSAwIDEgMC00Ljc3My00Ljc3MyAzLjM3NSAzLjM3NSAwIDAgMCA0Ljc3NCA0Ljc3NFpNMjEgMTJhOSA5IDAgMSAxLTE4IDAgOSA5IDAgMCAxIDE4IDBaXCIgLz5cbiAgICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICApIDogbnVsbH1cblxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgcC0xLjUgdGV4dC1zbGF0ZS01MDAgaG92ZXI6dGV4dC1zbGF0ZS02MDBcIlxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlYWRPbmx5TW9kZSkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGlmIChvcGVuKSB7XG4gICAgICAgICAgICAgICAgICBzZXRPcGVuKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlcmVkLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgIHNldE9wZW4odHJ1ZSk7XG4gICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCFxdWVyeS50cmltKCkgJiYgbG9hZE9uT3Blbikge1xuICAgICAgICAgICAgICAgICAgdm9pZCBydW5TZWFyY2goKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgIGFyaWEtbGFiZWw9e29wZW4gPyBpbmRUKFwiRHJvcGRvd25fSGlkZU9wdGlvbnNcIiwgXCJIaWRlIG9wdGlvbnNcIikgOiBpbmRUKFwiRHJvcGRvd25fU2hvd09wdGlvbnNcIiwgXCJTaG93IG9wdGlvbnNcIil9XG4gICAgICAgICAgICAgIGRpc2FibGVkPXtyZWFkT25seU1vZGV9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHtvcGVuID8gPENoZXZyb25VcFN2ZyBjbGFzc05hbWU9XCJoLTUgdy01XCIgLz4gOiA8Q2hldnJvbkRvd25TdmcgY2xhc3NOYW1lPVwiaC01IHctNVwiIC8+fVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8RmxvYXRpbmdMaXN0XG4gICAgICAgICAgYW5jaG9yUmVmPXtib3hSZWZ9XG4gICAgICAgICAgb3Blbj17b3Blbn1cbiAgICAgICAgICB6SW5kZXg9ezM2MDAwMH1cbiAgICAgICAgICBtYXhIZWlnaHRDbGFzcz1cIm1heC1oLTcyXCJcbiAgICAgICAgICByb2xlPVwibGlzdGJveFwiXG4gICAgICAgICAgcm91bmRlZENsYXNzPVwicm91bmRlZC14bFwiXG4gICAgICAgICAgcGFuZWxDbGFzc05hbWU9e3BhbmVsQ2xhc3NOYW1lfVxuICAgICAgICA+XG4gICAgICAgICAgPGRpdiBpZD17bGlzdElkfSByZWY9e2xpc3RSZWZ9PlxuICAgICAgICAgICAge2xvYWRpbmcgPyAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHgtNCBweS0yIHRleHQtc20gdGV4dC1zbGF0ZS01MDBcIj57aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX08L2Rpdj5cbiAgICAgICAgICAgICkgOiBmaWx0ZXJlZC5sZW5ndGggPT09IDAgPyAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHgtNCBweS0yIHRleHQtc20gdGV4dC1zbGF0ZS01MDBcIj57aW5kVChcIkNvbW1vbl9Ob0RhdGFcIiwgXCJObyBkYXRhXCIpfTwvZGl2PlxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgZmlsdGVyZWQubWFwKChvcHRpb24sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgaXNBY3RpdmUgPSBpbmRleCA9PT0gYWN0aXZlSW5kZXg7XG4gICAgICAgICAgICAgICAgY29uc3Qgb3B0aW9uSWQgPSBvcHRpb24udmFsdWUgfHwgYCR7aW5kZXh9YDtcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAga2V5PXtvcHRpb25JZH1cbiAgICAgICAgICAgICAgICAgICAgaWQ9e2Ake2lkQmFzZX0tb3B0LSR7b3B0aW9uSWR9YH1cbiAgICAgICAgICAgICAgICAgICAgcm9sZT1cIm9wdGlvblwiXG4gICAgICAgICAgICAgICAgICAgIGFyaWEtc2VsZWN0ZWQ9e2lzQWN0aXZlfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICAgICAgICAgICAgXCJyZWxhdGl2ZSBmbGV4IHctZnVsbCBjdXJzb3ItZGVmYXVsdCBzZWxlY3Qtbm9uZSBpdGVtcy1zdGFydCBweS0yIHB4LTMgdGV4dC1sZWZ0IHRleHQtc21cIixcbiAgICAgICAgICAgICAgICAgICAgICBpc0FjdGl2ZSA/IFwiYmctcHJpbWFyeSB0ZXh0LXdoaXRlXCIgOiBcInRleHQtc2xhdGUtOTAwXCJcbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgb25Nb3VzZUVudGVyPXsoKSA9PiBzZXRBY3RpdmVJbmRleChpbmRleCl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNlbGVjdE9wdGlvbihvcHRpb24pfVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tZWRpdW1cIj57b3B0aW9uLnRpdGxlIHx8IG9wdGlvbi52YWx1ZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAge29wdGlvbi5zdWJ0aXRsZSA/IChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcInRleHQteHNcIiwgaXNBY3RpdmUgPyBcInRleHQtd2hpdGUvOTBcIiA6IFwidGV4dC1zbGF0ZS01MDBcIil9PntvcHRpb24uc3VidGl0bGV9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9GbG9hdGluZ0xpc3Q+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFJlbW90ZVNlYXJjaENvbWJvYm94O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBDTTtBQTFCTixJQUFNLHNCQUFzQixDQUFDO0FBQUEsRUFDM0I7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBLGlCQUFpQjtBQUFBLEVBQ2pCLGtCQUFrQjtBQUFBLEVBQ2xCO0FBQUEsRUFDQTtBQUNGLE1BQWdDO0FBQzlCLFFBQU0sWUFBWSx1QkFBdUIsT0FBTyxHQUFHO0FBQ25ELFFBQU0sYUFBYSxjQUFjO0FBRWpDLFNBQ0U7QUFBQSxJQUFDO0FBQUE7QUFBQSxNQUNDLFdBQVU7QUFBQSxNQUNWLE1BQUs7QUFBQSxNQUNMLFVBQVU7QUFBQSxNQUNWLFNBQVM7QUFBQSxNQUNULFdBQVcsQ0FBQyxVQUFVO0FBQ3BCLFlBQUksTUFBTSxRQUFRLFdBQVcsTUFBTSxRQUFRLEtBQUs7QUFDOUMsZ0JBQU0sZUFBZTtBQUNyQixpQkFBTztBQUFBLFFBQ1Q7QUFBQSxNQUNGO0FBQUEsTUFFQTtBQUFBLHFEQUFDLFNBQUksV0FBVSxzSUFDYjtBQUFBLHNEQUFDLFNBQUksV0FBVSx5REFBeUQsb0JBQVUsTUFBSztBQUFBLFVBQ3ZGLDRDQUFDLFNBQUksV0FBVSxtRUFBbUUsb0JBQVUsT0FBTTtBQUFBLFVBQ2xHLDRDQUFDLFNBQUksV0FBVSx1Q0FBdUMsb0JBQVUsS0FBSTtBQUFBLFdBQ3RFO0FBQUEsUUFDQSw2Q0FBQyxTQUFJLFdBQVUsMkNBQ1o7QUFBQSw0QkFBa0IsNENBQUMsVUFBSyxXQUFXLGlCQUFpQixPQUFPLGFBQWEsY0FBWSxhQUFhLElBQUs7QUFBQSxVQUN2Ryw0Q0FBQyxPQUFFLFdBQVcsZ0JBQWdCLGlCQUFlLFdBQzFDLHFCQUNIO0FBQUEsVUFDQSw0Q0FBQyxVQUFLLFdBQVcsaUJBQWlCLGlCQUFlLFlBQzlDLHNCQUNIO0FBQUEsV0FDRjtBQUFBO0FBQUE7QUFBQSxFQUNGO0FBRUo7QUFFQSxJQUFPLDhCQUFROzs7QUM1RGYsbUJBQStCOzs7QUNFeEIsSUFBTSx1QkFBaUM7QUFBQSxFQUM1QztBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFB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
