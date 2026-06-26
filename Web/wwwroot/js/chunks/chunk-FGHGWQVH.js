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
  fetchJson,
  indFormat,
  indT
} from "./chunk-63VW7TTG.js";
import {
  __toESM
} from "./chunk-W7NC74ZX.js";

// Web/wwwroot/react/src/components/visitas/ClientSearchCombobox.tsx
var import_react = __toESM(require_react());

// Web/wwwroot/react/src/utils/noData.ts
var isNoDataText = (value) => {
  const raw = String(value || "").trim().toLowerCase();
  if (!raw) return false;
  const normalized = raw.replace(/[^a-z0-9]+/g, "");
  return normalized === "sindatos" || normalized === "nodata";
};
var isNoDataRow = (row) => {
  if (row === null || row === void 0) return true;
  if (Array.isArray(row)) {
    return row.length === 1 && isNoDataText(row[0]);
  }
  if (typeof row === "string") {
    return isNoDataText(row);
  }
  if (typeof row === "object") {
    const values = Object.values(row);
    if (!values.length) return true;
    return values.some((v) => typeof v === "string" && isNoDataText(v));
  }
  return false;
};

// Web/wwwroot/react/src/utils/visitasMapping.ts
var mapAccountItem = (item) => {
  if (isNoDataRow(item)) return null;
  if (Array.isArray(item)) {
    const code = (item[0] || "").toString().trim();
    const desc = (item[2] || item[1] || "").toString().trim();
    if (!code || isNoDataText(code) || isNoDataText(desc)) return null;
    const text = desc ? `${desc} (${code})` : code;
    return {
      value: code,
      text,
      cargo: "",
      empresa: item[2]
    };
  }
  if (item && typeof item === "object") {
    const raw = item;
    const code = (raw.accountNum || raw.AccountNum || "").toString().trim();
    const desc = (raw.nombreComercial || raw.NombreComercial || raw.razonSocial || raw.RazonSocial || "").toString().trim();
    if (!code || isNoDataText(code) || isNoDataText(desc)) return null;
    const text = desc ? `${desc} (${code})` : code;
    return { value: code, text };
  }
  return null;
};

// Web/wwwroot/react/src/utils/makeCache.ts
var makeCache = (limit = 10) => {
  const map = /* @__PURE__ */ new Map();
  return {
    get: (k) => map.get(k),
    set: (k, v) => {
      if (map.has(k)) map.delete(k);
      map.set(k, v);
      if (map.size > limit) {
        const first = map.keys().next().value;
        if (first) map.delete(first);
      }
    },
    has: (k) => map.has(k),
    clear: () => map.clear()
  };
};

// Web/wwwroot/react/src/utils/visitasStorage.ts
var CURRENT_COMPANY = String(globalThis.__IND_SELECTED_COMPANY__ || "").trim().toUpperCase();
var COMPANY_STORAGE_SUFFIX = CURRENT_COMPANY ? `_${CURRENT_COMPANY}` : "";
var VISIT_DRAFT_KEY = `visitas_draft${COMPANY_STORAGE_SUFFIX}`;
var CONTACTS_STORAGE_KEY = `visitas_contacts_cache_v1${COMPANY_STORAGE_SUFFIX}`;
var CONTACTS_SELECTION_KEY = `visitas_contacts_selected_v1${COMPANY_STORAGE_SUFFIX}`;
var CREATE_FRESH_PARAM = "fresh";
var clientCache = makeCache(10);
var contactsCache = makeCache(10);
var cacheKeyWithCompany = (key) => `${CURRENT_COMPANY || "DEFAULT"}::${key}`;
var readStorage = (key) => {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
};
var writeStorage = (key, data) => {
  try {
    sessionStorage.setItem(key, JSON.stringify(data));
  } catch {
  }
};
var getClientCache = (query) => {
  const cacheKey = cacheKeyWithCompany(query);
  if (!clientCache.has(cacheKey)) return null;
  return clientCache.get(cacheKey) || null;
};
var hasClientCache = (query) => {
  return clientCache.has(cacheKeyWithCompany(query));
};
var setClientCache = (query, items) => {
  clientCache.set(cacheKeyWithCompany(query), items);
};
var getCachedContacts = (account) => {
  const cacheKey = cacheKeyWithCompany(account);
  if (contactsCache.has(cacheKey)) return contactsCache.get(cacheKey) || null;
  const store = readStorage(CONTACTS_STORAGE_KEY);
  const cached = store[account];
  if (Array.isArray(cached)) {
    contactsCache.set(cacheKey, cached);
    return cached;
  }
  return null;
};
var setCachedContacts = (account, items) => {
  contactsCache.set(cacheKeyWithCompany(account), items);
  const store = readStorage(CONTACTS_STORAGE_KEY);
  store[account] = items;
  writeStorage(CONTACTS_STORAGE_KEY, store);
};
var getStoredSelection = (account) => {
  const store = readStorage(CONTACTS_SELECTION_KEY);
  const raw = store[account];
  return Array.isArray(raw) ? raw : [];
};
var setStoredSelection = (account, items) => {
  const store = readStorage(CONTACTS_SELECTION_KEY);
  store[account] = items;
  writeStorage(CONTACTS_SELECTION_KEY, store);
};
var clearStoredSelection = (account) => {
  const store = readStorage(CONTACTS_SELECTION_KEY);
  if (store[account]) {
    delete store[account];
    writeStorage(CONTACTS_SELECTION_KEY, store);
  }
};
var clearCreateSelectionCache = () => {
  try {
    sessionStorage.removeItem(VISIT_DRAFT_KEY);
    sessionStorage.removeItem(CONTACTS_STORAGE_KEY);
    sessionStorage.removeItem(CONTACTS_SELECTION_KEY);
  } catch {
  }
};
var stripFreshParam = () => {
  if (typeof window === "undefined") return;
  try {
    const url = new URL(window.location.href);
    if (!url.searchParams.has(CREATE_FRESH_PARAM)) return;
    url.searchParams.delete(CREATE_FRESH_PARAM);
    const next = `${url.pathname}${url.search}${url.hash}`;
    window.history.replaceState({}, "", next);
  } catch {
  }
};

// Web/wwwroot/react/src/components/visitas/ClientSearchCombobox.tsx
var import_jsx_runtime = __toESM(require_jsx_runtime());
var ClientSearchCombobox = ({
  value,
  onSelected,
  label,
  placeholder,
  variant = "default",
  showLabel,
  idBase,
  clearOnNull,
  portalClassName,
  panelClassName
}) => {
  const isCompact = variant === "compact";
  const resolvedLabel = label || indT("History_Filter_Client", "Account");
  const resolvedPlaceholder = placeholder || resolvedLabel;
  const shouldShowLabel = showLabel ?? !isCompact;
  const shouldClearOnNull = clearOnNull ?? isCompact;
  const minChars = 4;
  const [query, setQuery] = (0, import_react.useState)("");
  const [options, setOptions] = (0, import_react.useState)([]);
  const [fetchedQuery, setFetchedQuery] = (0, import_react.useState)("");
  const [loading, setLoading] = (0, import_react.useState)(false);
  const [loadingMore, setLoadingMore] = (0, import_react.useState)(false);
  const [status, setStatus] = (0, import_react.useState)(() => indFormat("Visits_Create_MinChars", "Type at least {0} characters.", minChars));
  const [selected, setSelected] = (0, import_react.useState)(value);
  const [open, setOpen] = (0, import_react.useState)(false);
  const [page, setPage] = (0, import_react.useState)(1);
  const [hasMore, setHasMore] = (0, import_react.useState)(true);
  const [blocking, setBlocking] = (0, import_react.useState)(false);
  const [activeIndex, setActiveIndex] = (0, import_react.useState)(0);
  const [showNotFoundState, setShowNotFoundState] = (0, import_react.useState)(false);
  const listRef = (0, import_react.useRef)(null);
  const containerRef = (0, import_react.useRef)(null);
  const boxRef = (0, import_react.useRef)(null);
  const abortRef = (0, import_react.useRef)(null);
  useOutsideClick([containerRef, listRef], () => {
    setShowNotFoundState(false);
    setOpen(false);
  });
  (0, import_react.useEffect)(() => {
    if (!value) {
      if (shouldClearOnNull) {
        setSelected(null);
        setQuery("");
        setShowNotFoundState(false);
      }
      return;
    }
    setSelected(value);
    setQuery(value.text || "");
    setShowNotFoundState(false);
  }, [value, shouldClearOnNull]);
  const filtered = (0, import_react.useMemo)(() => {
    if (!query.trim()) return options;
    const q = query.trim().toLowerCase();
    if (fetchedQuery && q !== fetchedQuery) return options;
    const match = options.filter((o) => o.text.toLowerCase().includes(q));
    return match.length > 0 ? match : options;
  }, [options, query, fetchedQuery]);
  const resolvedActiveIndex = filtered.length > 0 ? Math.min(Math.max(activeIndex, 0), filtered.length - 1) : 0;
  const cancelPending = () => {
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
  };
  (0, import_react.useEffect)(() => {
    return () => {
      if (abortRef.current) {
        abortRef.current.abort();
        abortRef.current = null;
      }
    };
  }, []);
  const search = async () => {
    const currentQuery = query.trim().toLowerCase();
    if (currentQuery.length < minChars) {
      setShowNotFoundState(false);
      setStatus(indFormat("Visits_Create_MinChars", "Type at least {0} characters.", minChars));
      setOptions([]);
      setHasMore(false);
      return;
    }
    cancelPending();
    setPage(1);
    setHasMore(true);
    setOpen(false);
    const cacheKey = query.trim().toLowerCase();
    if (hasClientCache(cacheKey)) {
      const cached = getClientCache(cacheKey) || [];
      setActiveIndex(0);
      setFetchedQuery(currentQuery);
      setOptions(cached);
      if (cached.length < 1) {
        setSelected(null);
        setQuery("");
        setShowNotFoundState(true);
        onSelected(null);
        setStatus(indT("Common_NotFound", "Not found"));
      } else {
        setShowNotFoundState(false);
        setStatus(indFormat("Visits_Create_ClientCountCache", "{0} clients (cache)", cached.length));
      }
      setHasMore(cached.length === 10);
      setOpen(true);
      return;
    }
    setLoading(true);
    setBlocking(true);
    setStatus(indT("Visits_Create_Searching", "Searching..."));
    const controller = new AbortController();
    abortRef.current = controller;
    let shouldOpenOnFinish = false;
    try {
      const url = `/Visitas/GetAccountsForDropdown?term=${encodeURIComponent(query)}&page=1&pageSize=10`;
      const data = await fetchJson(url, { signal: controller.signal });
      const items = (data.items || []).flatMap((item) => {
        const mapped = mapAccountItem(item);
        return mapped ? [mapped] : [];
      });
      setActiveIndex(0);
      setFetchedQuery(currentQuery);
      setClientCache(cacheKey, items);
      setOptions(items);
      if (items.length < 1) {
        setSelected(null);
        setQuery("");
        setShowNotFoundState(true);
        onSelected(null);
        setStatus(indT("Common_NotFound", "Not found"));
      } else {
        setShowNotFoundState(false);
        setStatus(indFormat("Visits_Create_ClientCount", "{0} clients", items.length));
      }
      setHasMore(items.length === 10);
      shouldOpenOnFinish = true;
    } catch (err) {
      if (err?.name === "AbortError") {
        setStatus(indT("Visits_Create_SearchCanceled", "Search canceled."));
      } else if (String(err?.message || "").toLowerCase().includes("timeout")) {
        setStatus(indT("Visits_Create_SearchTimeout", "The search took too long. Type more characters to narrow down."));
      } else {
        setStatus(indT("Visits_Create_LoadClientsError", "Failed to load clients."));
      }
    } finally {
      abortRef.current = null;
      setLoading(false);
      setBlocking(false);
      if (shouldOpenOnFinish) setOpen(true);
    }
  };
  const loadMore = (0, import_react.useCallback)(async () => {
    if (loadingMore || loading || !hasMore || query.trim().length < minChars) return;
    setLoadingMore(true);
    setBlocking(true);
    const controller = new AbortController();
    abortRef.current = controller;
    try {
      const nextPage = page + 1;
      const url = `/Visitas/GetAccountsForDropdown?term=${encodeURIComponent(query)}&page=${nextPage}&pageSize=10`;
      const data = await fetchJson(url, { signal: controller.signal });
      const items = (data.items || []).flatMap((item) => {
        const mapped = mapAccountItem(item);
        return mapped ? [mapped] : [];
      });
      setOptions((prev) => [...prev, ...items]);
      setPage(nextPage);
      setHasMore(items.length === 10);
    } finally {
      abortRef.current = null;
      setLoadingMore(false);
      setBlocking(false);
    }
  }, [loadingMore, loading, hasMore, query, page, minChars]);
  (0, import_react.useEffect)(() => {
    if (!open || !listRef.current) return;
    const el = listRef.current;
    const onScroll = () => {
      if (el.scrollTop + el.clientHeight >= el.scrollHeight - 8) loadMore();
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [open, loadMore]);
  const selectOption = (opt) => {
    setSelected(opt);
    setQuery(opt.text);
    setShowNotFoundState(false);
    setOpen(false);
    onSelected(opt);
  };
  const requestSearchOrOpen = () => {
    if (loading || blocking) return;
    const trimmed = query.trim();
    if (trimmed.length < minChars) {
      cancelPending();
      setShowNotFoundState(false);
      setOptions([]);
      setHasMore(false);
      setStatus(indFormat("Visits_Create_MinChars", "Type at least {0} characters.", minChars));
      setOpen(true);
      return;
    }
    const qKey = trimmed.toLowerCase();
    const isSelectionDisplay2 = !!selected && query === (selected.text || "");
    const shouldSearch = !isSelectionDisplay2 && qKey !== fetchedQuery;
    if (shouldSearch) {
      search();
      return;
    }
    setOpen(true);
  };
  const handleKeyDown = (ev) => {
    handleComboboxKeyDown(ev, {
      isOpen: open,
      setOpen,
      optionCount: filtered.length,
      setActiveIndex,
      requireOpenForArrows: true,
      onEnterWhenOpen: () => {
        if (filtered.length < 1) {
          return;
        }
        selectOption(filtered[resolvedActiveIndex] ?? filtered[0]);
      },
      onEnterWhenClosed: requestSearchOrOpen
    });
  };
  const queryKey = query.trim().toLowerCase();
  const isSelectionDisplay = !!selected && query === (selected.text || "");
  const showSearchIcon = !loading && !blocking && !isSelectionDisplay && queryKey.length >= minChars && (fetchedQuery === "" || queryKey !== fetchedQuery);
  const wrapperClass = isCompact ? "space-y-1 history-client-combobox" : "space-y-2";
  const labelClass = "form-label font-semibold";
  const containerClass = isCompact ? "relative w-full rounded-[var(--radius-xl)] bg-white text-left focus-within:border-primary focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-white sm:text-sm" : "relative w-full cursor-default rounded-[var(--radius-xl)] border-slate-300 bg-white text-left shadow-xs focus-within:border-primary focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-0 sm:text-sm";
  const inputClass = isCompact ? "w-full rounded-[var(--radius-xl)] border border-slate-200 px-3 py-2 pr-24 text-sm sm:text-base leading-5 text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-primary focus:border-primary" : "w-full rounded-[var(--radius-xl)] border border-slate-200 px-3 py-2 pr-24 text-sm sm:text-base leading-5 text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-primary focus:border-primary";
  const emptyTextClass = isCompact ? "px-4 py-2 text-sm text-slate-500" : "px-4 py-2 text-sm text-slate-500";
  const optionClass = isCompact ? "relative flex w-full cursor-default select-none items-start py-2 px-3 text-left text-sm" : "relative flex w-full cursor-default select-none items-start py-2 px-3 text-left text-sm";
  const optionTextClass = isCompact ? "block truncate uppercase text-[13px]" : "block truncate uppercase text-[13px]";
  const optionSubTextClass = isCompact ? "block truncate uppercase text-[11px] text-slate-600" : "block truncate uppercase text-[11px] text-slate-600";
  const optionSubTextSecondaryClass = isCompact ? "block truncate uppercase text-[11px] text-slate-500" : "block truncate uppercase text-[11px] text-slate-500";
  const statusClass = isCompact ? "text-xs text-slate-500 tech-info" : "text-xs text-slate-500 tech-info";
  const searchIconSize = isCompact ? "h-5 w-5" : "h-5 w-5";
  const chevronIconSize = isCompact ? "h-5 w-5" : "h-5 w-5";
  const safeIdBase = idBase || (isCompact ? "history-client" : "client");
  const listId = `${safeIdBase}-options`;
  const activeId = open && filtered[resolvedActiveIndex] ? `${safeIdBase}-opt-${filtered[resolvedActiveIndex].value}` : void 0;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: wrapperClass, ref: containerRef, children: [
    shouldShowLabel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: labelClass, children: resolvedLabel }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "relative", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { ref: boxRef, className: containerClass, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "input",
          {
            className: inputClass,
            value: query,
            onChange: (event) => {
              const val = event.target.value;
              setActiveIndex(0);
              setQuery(val);
              setShowNotFoundState(false);
              if (selected && val !== (selected.text || "")) {
                setSelected(null);
                onSelected?.(null);
              }
              cancelPending();
              setFetchedQuery("");
              setOptions([]);
              setHasMore(false);
              setStatus(
                val.trim().length < minChars ? indFormat("Visits_Create_MinChars", "Type at least {0} characters.", minChars) : indT("Visits_Create_PressSearchHint", "Press search, Enter or ArrowDown to search.")
              );
              setOpen(false);
            },
            onKeyDown: handleKeyDown,
            placeholder: resolvedPlaceholder,
            "aria-label": resolvedLabel,
            readOnly: loading || blocking,
            "aria-busy": loading || blocking,
            role: "combobox",
            "aria-expanded": open,
            "aria-controls": listId,
            "aria-activedescendant": activeId
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "absolute inset-y-0 right-0 flex items-center gap-1 pr-2", children: [
          (loading || blocking) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "flex items-center px-2", "aria-hidden": "true", children: isCompact ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner_default, { size: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner_default, {}) }),
          showSearchIcon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "button",
            {
              type: "button",
              className: "flex items-center p-1.5 text-slate-400 hover:text-slate-500",
              onClick: requestSearchOrOpen,
              "aria-label": indT("Visits_Create_SearchClient", "Search account"),
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: searchIconSize, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" }) })
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "button",
            {
              type: "button",
              className: "flex items-center p-1.5 text-slate-500 hover:text-slate-600",
              onClick: () => {
                if (loading || blocking) return;
                if (open) {
                  setOpen(false);
                  return;
                }
                requestSearchOrOpen();
              },
              disabled: loading || blocking,
              "aria-label": open ? indT("Visits_Create_HideClientOptions", "Hide client options") : indT("Visits_Create_ShowClientOptions", "Show client options"),
              children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUpSvg, { className: chevronIconSize }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDownSvg, { className: chevronIconSize })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        FloatingList_default,
        {
          anchorRef: boxRef,
          open,
          zIndex: 4e5,
          maxHeightClass: "max-h-72",
          role: "listbox",
          roundedClass: "rounded-[var(--radius-xl)]",
          portalClassName,
          panelClassName,
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { ref: listRef, id: listId, children: [
            options.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: emptyTextClass, children: showNotFoundState ? indT("Common_NotFound", "Not found") : query.trim().length < minChars ? indFormat("Visits_Create_MinChars", "Type at least {0} characters.", minChars) : indT("Visits_Create_NoResults", "No results") }),
            !loading && options.length > 0 && filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: emptyTextClass, children: indT("Visits_Create_NoMatches", "No matches") }),
            !loading && filtered.map((opt, idx) => {
              const isActive = idx === resolvedActiveIndex;
              const sel = selected?.value === opt.value;
              return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "button",
                {
                  type: "button",
                  id: `${safeIdBase}-opt-${opt.value}`,
                  role: "option",
                  "aria-selected": sel,
                  className: classNames(
                    optionClass,
                    isActive ? "bg-primary text-white" : sel ? "bg-primary/10 text-primary" : isCompact ? "text-slate-700" : "text-slate-900"
                  ),
                  onMouseEnter: () => setActiveIndex(idx),
                  onClick: () => selectOption(opt),
                  children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-col space-y-0.5", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: classNames(optionTextClass, sel ? "font-semibold" : "font-normal"), children: opt.text }),
                    isCompact ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
                      opt.cargo && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: optionSubTextClass, children: opt.cargo }),
                      opt.empresa && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: optionSubTextSecondaryClass, children: opt.empresa })
                    ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: optionSubTextClass, children: opt.cargo || "" }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: optionSubTextSecondaryClass, children: opt.empresa || "" })
                    ] })
                  ] })
                },
                opt.value
              );
            })
          ] })
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-full flex justify-end", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: statusClass, children: status }) })
  ] });
};
var ClientSearchCombobox_default = ClientSearchCombobox;

export {
  VISIT_DRAFT_KEY,
  CONTACTS_STORAGE_KEY,
  CONTACTS_SELECTION_KEY,
  CREATE_FRESH_PARAM,
  getCachedContacts,
  setCachedContacts,
  getStoredSelection,
  setStoredSelection,
  clearStoredSelection,
  clearCreateSelectionCache,
  stripFreshParam,
  isNoDataText,
  isNoDataRow,
  ClientSearchCombobox_default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvdmlzaXRhcy9DbGllbnRTZWFyY2hDb21ib2JveC50c3giLCAiLi4vLi4vcmVhY3Qvc3JjL3V0aWxzL25vRGF0YS50cyIsICIuLi8uLi9yZWFjdC9zcmMvdXRpbHMvdmlzaXRhc01hcHBpbmcudHMiLCAiLi4vLi4vcmVhY3Qvc3JjL3V0aWxzL21ha2VDYWNoZS50cyIsICIuLi8uLi9yZWFjdC9zcmMvdXRpbHMvdmlzaXRhc1N0b3JhZ2UudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBGbG9hdGluZ0xpc3QgZnJvbSBcIi4uL2NvbW1vbnMvRmxvYXRpbmdMaXN0LnRzeFwiO1xyXG5pbXBvcnQgU3Bpbm5lciBmcm9tIFwiLi4vY29tbW9ucy9TcGlubmVyLnRzeFwiO1xyXG5pbXBvcnQgeyBDaGV2cm9uRG93blN2ZywgQ2hldnJvblVwU3ZnIH0gZnJvbSBcIi4uL2NvbW1vbnMvY2hldnJvbnMudHN4XCI7XHJcbmltcG9ydCB7IGZldGNoSnNvbiB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XHJcbmltcG9ydCB7IGhhbmRsZUNvbWJvYm94S2V5RG93biB9IGZyb20gXCIuLi8uLi9ob29rcy91c2VDb21ib2JveEtleWJvYXJkLnRzXCI7XHJcbmltcG9ydCB7IHVzZU91dHNpZGVDbGljayB9IGZyb20gXCIuLi8uLi9ob29rcy91c2VPdXRzaWRlQ2xpY2sudHNcIjtcclxuaW1wb3J0IHsgY2xhc3NOYW1lcyB9IGZyb20gXCIuLi8uLi91dGlscy9jbGFzc05hbWVzLnRzXCI7XHJcbmltcG9ydCB7IGluZEZvcm1hdCwgaW5kVCB9IGZyb20gXCIuLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB7IG1hcEFjY291bnRJdGVtIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Zpc2l0YXNNYXBwaW5nLnRzXCI7XHJcbmltcG9ydCB7IGdldENsaWVudENhY2hlLCBoYXNDbGllbnRDYWNoZSwgc2V0Q2xpZW50Q2FjaGUgfSBmcm9tIFwiLi4vLi4vdXRpbHMvdmlzaXRhc1N0b3JhZ2UudHNcIjtcclxuXHJcbmV4cG9ydCB0eXBlIENsaWVudE9wdGlvbiA9IHtcclxuICB2YWx1ZTogc3RyaW5nO1xyXG4gIHRleHQ6IHN0cmluZztcclxuICBjYXJnbz86IHN0cmluZztcclxuICBlbXByZXNhPzogc3RyaW5nO1xyXG59O1xyXG5cclxudHlwZSBWYXJpYW50ID0gXCJkZWZhdWx0XCIgfCBcImNvbXBhY3RcIjtcclxuXHJcbnR5cGUgQ2xpZW50U2VhcmNoQ29tYm9ib3hQcm9wcyA9IHtcclxuICB2YWx1ZTogQ2xpZW50T3B0aW9uIHwgbnVsbDtcclxuICBvblNlbGVjdGVkOiAodmFsdWU6IENsaWVudE9wdGlvbiB8IG51bGwpID0+IHZvaWQ7XHJcbiAgbGFiZWw/OiBzdHJpbmc7XHJcbiAgcGxhY2Vob2xkZXI/OiBzdHJpbmc7XHJcbiAgdmFyaWFudD86IFZhcmlhbnQ7XHJcbiAgc2hvd0xhYmVsPzogYm9vbGVhbjtcclxuICBpZEJhc2U/OiBzdHJpbmc7XHJcbiAgY2xlYXJPbk51bGw/OiBib29sZWFuO1xyXG4gIHBvcnRhbENsYXNzTmFtZT86IHN0cmluZztcclxuICBwYW5lbENsYXNzTmFtZT86IHN0cmluZztcclxufTtcclxuXHJcbi8vIFJldXNhYmxlIGNsaWVudCBzZWFyY2ggY29tYm9ib3ggZm9yIHZpc2l0YXMgcGFnZXMuXHJcbmNvbnN0IENsaWVudFNlYXJjaENvbWJvYm94ID0gKHtcclxuICB2YWx1ZSxcclxuICBvblNlbGVjdGVkLFxyXG4gIGxhYmVsLFxyXG4gIHBsYWNlaG9sZGVyLFxyXG4gIHZhcmlhbnQgPSBcImRlZmF1bHRcIixcclxuICBzaG93TGFiZWwsXHJcbiAgaWRCYXNlLFxyXG4gIGNsZWFyT25OdWxsLFxyXG4gIHBvcnRhbENsYXNzTmFtZSxcclxuICBwYW5lbENsYXNzTmFtZSxcclxufTogQ2xpZW50U2VhcmNoQ29tYm9ib3hQcm9wcykgPT4ge1xyXG4gIGNvbnN0IGlzQ29tcGFjdCA9IHZhcmlhbnQgPT09IFwiY29tcGFjdFwiO1xyXG4gIGNvbnN0IHJlc29sdmVkTGFiZWwgPSBsYWJlbCB8fCBpbmRUKFwiSGlzdG9yeV9GaWx0ZXJfQ2xpZW50XCIsIFwiQWNjb3VudFwiKTtcclxuICBjb25zdCByZXNvbHZlZFBsYWNlaG9sZGVyID0gcGxhY2Vob2xkZXIgfHwgcmVzb2x2ZWRMYWJlbDtcclxuICBjb25zdCBzaG91bGRTaG93TGFiZWwgPSBzaG93TGFiZWwgPz8gIWlzQ29tcGFjdDtcclxuICBjb25zdCBzaG91bGRDbGVhck9uTnVsbCA9IGNsZWFyT25OdWxsID8/IGlzQ29tcGFjdDtcclxuICBjb25zdCBtaW5DaGFycyA9IDQ7XHJcblxyXG4gIGNvbnN0IFtxdWVyeSwgc2V0UXVlcnldID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW29wdGlvbnMsIHNldE9wdGlvbnNdID0gdXNlU3RhdGU8Q2xpZW50T3B0aW9uW10+KFtdKTtcclxuICBjb25zdCBbZmV0Y2hlZFF1ZXJ5LCBzZXRGZXRjaGVkUXVlcnldID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtsb2FkaW5nTW9yZSwgc2V0TG9hZGluZ01vcmVdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtzdGF0dXMsIHNldFN0YXR1c10gPSB1c2VTdGF0ZSgoKSA9PiBpbmRGb3JtYXQoXCJWaXNpdHNfQ3JlYXRlX01pbkNoYXJzXCIsIFwiVHlwZSBhdCBsZWFzdCB7MH0gY2hhcmFjdGVycy5cIiwgbWluQ2hhcnMpKTtcclxuICBjb25zdCBbc2VsZWN0ZWQsIHNldFNlbGVjdGVkXSA9IHVzZVN0YXRlPENsaWVudE9wdGlvbiB8IG51bGw+KHZhbHVlKTtcclxuICBjb25zdCBbb3Blbiwgc2V0T3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW3BhZ2UsIHNldFBhZ2VdID0gdXNlU3RhdGUoMSk7XHJcbiAgY29uc3QgW2hhc01vcmUsIHNldEhhc01vcmVdID0gdXNlU3RhdGUodHJ1ZSk7XHJcbiAgY29uc3QgW2Jsb2NraW5nLCBzZXRCbG9ja2luZ10gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW2FjdGl2ZUluZGV4LCBzZXRBY3RpdmVJbmRleF0gPSB1c2VTdGF0ZSgwKTtcclxuICBjb25zdCBbc2hvd05vdEZvdW5kU3RhdGUsIHNldFNob3dOb3RGb3VuZFN0YXRlXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBsaXN0UmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgY29udGFpbmVyUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgYm94UmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgYWJvcnRSZWYgPSB1c2VSZWY8QWJvcnRDb250cm9sbGVyIHwgbnVsbD4obnVsbCk7XHJcblxyXG4gIHVzZU91dHNpZGVDbGljayhbY29udGFpbmVyUmVmLCBsaXN0UmVmXSwgKCkgPT4ge1xyXG4gICAgc2V0U2hvd05vdEZvdW5kU3RhdGUoZmFsc2UpO1xyXG4gICAgc2V0T3BlbihmYWxzZSk7XHJcbiAgfSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIXZhbHVlKSB7XHJcbiAgICAgIGlmIChzaG91bGRDbGVhck9uTnVsbCkge1xyXG4gICAgICAgIHNldFNlbGVjdGVkKG51bGwpO1xyXG4gICAgICAgIHNldFF1ZXJ5KFwiXCIpO1xyXG4gICAgICAgIHNldFNob3dOb3RGb3VuZFN0YXRlKGZhbHNlKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBzZXRTZWxlY3RlZCh2YWx1ZSk7XHJcbiAgICBzZXRRdWVyeSh2YWx1ZS50ZXh0IHx8IFwiXCIpO1xyXG4gICAgc2V0U2hvd05vdEZvdW5kU3RhdGUoZmFsc2UpO1xyXG4gIH0sIFt2YWx1ZSwgc2hvdWxkQ2xlYXJPbk51bGxdKTtcclxuXHJcbiAgY29uc3QgZmlsdGVyZWQgPSB1c2VNZW1vKCgpID0+IHtcclxuICAgIGlmICghcXVlcnkudHJpbSgpKSByZXR1cm4gb3B0aW9ucztcclxuICAgIGNvbnN0IHEgPSBxdWVyeS50cmltKCkudG9Mb3dlckNhc2UoKTtcclxuICAgIGlmIChmZXRjaGVkUXVlcnkgJiYgcSAhPT0gZmV0Y2hlZFF1ZXJ5KSByZXR1cm4gb3B0aW9ucztcclxuICAgIGNvbnN0IG1hdGNoID0gb3B0aW9ucy5maWx0ZXIoKG8pID0+IG8udGV4dC50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHEpKTtcclxuICAgIHJldHVybiBtYXRjaC5sZW5ndGggPiAwID8gbWF0Y2ggOiBvcHRpb25zO1xyXG4gIH0sIFtvcHRpb25zLCBxdWVyeSwgZmV0Y2hlZFF1ZXJ5XSk7XHJcbiAgY29uc3QgcmVzb2x2ZWRBY3RpdmVJbmRleCA9XHJcbiAgICBmaWx0ZXJlZC5sZW5ndGggPiAwID8gTWF0aC5taW4oTWF0aC5tYXgoYWN0aXZlSW5kZXgsIDApLCBmaWx0ZXJlZC5sZW5ndGggLSAxKSA6IDA7XHJcblxyXG4gIGNvbnN0IGNhbmNlbFBlbmRpbmcgPSAoKSA9PiB7XHJcbiAgICBpZiAoYWJvcnRSZWYuY3VycmVudCkge1xyXG4gICAgICBhYm9ydFJlZi5jdXJyZW50LmFib3J0KCk7XHJcbiAgICAgIGFib3J0UmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBpZiAoYWJvcnRSZWYuY3VycmVudCkge1xyXG4gICAgICAgIGFib3J0UmVmLmN1cnJlbnQuYWJvcnQoKTtcclxuICAgICAgICBhYm9ydFJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IHNlYXJjaCA9IGFzeW5jICgpID0+IHtcclxuICAgIGNvbnN0IGN1cnJlbnRRdWVyeSA9IHF1ZXJ5LnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgaWYgKGN1cnJlbnRRdWVyeS5sZW5ndGggPCBtaW5DaGFycykge1xyXG4gICAgICBzZXRTaG93Tm90Rm91bmRTdGF0ZShmYWxzZSk7XHJcbiAgICAgIHNldFN0YXR1cyhpbmRGb3JtYXQoXCJWaXNpdHNfQ3JlYXRlX01pbkNoYXJzXCIsIFwiVHlwZSBhdCBsZWFzdCB7MH0gY2hhcmFjdGVycy5cIiwgbWluQ2hhcnMpKTtcclxuICAgICAgc2V0T3B0aW9ucyhbXSk7XHJcbiAgICAgIHNldEhhc01vcmUoZmFsc2UpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjYW5jZWxQZW5kaW5nKCk7XHJcbiAgICBzZXRQYWdlKDEpO1xyXG4gICAgc2V0SGFzTW9yZSh0cnVlKTtcclxuICAgIHNldE9wZW4oZmFsc2UpO1xyXG4gICAgY29uc3QgY2FjaGVLZXkgPSBxdWVyeS50cmltKCkudG9Mb3dlckNhc2UoKTtcclxuICAgIGlmIChoYXNDbGllbnRDYWNoZShjYWNoZUtleSkpIHtcclxuICAgICAgY29uc3QgY2FjaGVkID0gKGdldENsaWVudENhY2hlKGNhY2hlS2V5KSB8fCBbXSkgYXMgQ2xpZW50T3B0aW9uW107XHJcbiAgICAgIHNldEFjdGl2ZUluZGV4KDApO1xyXG4gICAgICBzZXRGZXRjaGVkUXVlcnkoY3VycmVudFF1ZXJ5KTtcclxuICAgICAgc2V0T3B0aW9ucyhjYWNoZWQpO1xyXG4gICAgICBpZiAoY2FjaGVkLmxlbmd0aCA8IDEpIHtcclxuICAgICAgICBzZXRTZWxlY3RlZChudWxsKTtcclxuICAgICAgICBzZXRRdWVyeShcIlwiKTtcclxuICAgICAgICBzZXRTaG93Tm90Rm91bmRTdGF0ZSh0cnVlKTtcclxuICAgICAgICBvblNlbGVjdGVkKG51bGwpO1xyXG4gICAgICAgIHNldFN0YXR1cyhpbmRUKFwiQ29tbW9uX05vdEZvdW5kXCIsIFwiTm90IGZvdW5kXCIpKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzZXRTaG93Tm90Rm91bmRTdGF0ZShmYWxzZSk7XHJcbiAgICAgICAgc2V0U3RhdHVzKGluZEZvcm1hdChcIlZpc2l0c19DcmVhdGVfQ2xpZW50Q291bnRDYWNoZVwiLCBcInswfSBjbGllbnRzIChjYWNoZSlcIiwgY2FjaGVkLmxlbmd0aCkpO1xyXG4gICAgICB9XHJcbiAgICAgIHNldEhhc01vcmUoY2FjaGVkLmxlbmd0aCA9PT0gMTApO1xyXG4gICAgICBzZXRPcGVuKHRydWUpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBzZXRMb2FkaW5nKHRydWUpO1xyXG4gICAgc2V0QmxvY2tpbmcodHJ1ZSk7XHJcbiAgICBzZXRTdGF0dXMoaW5kVChcIlZpc2l0c19DcmVhdGVfU2VhcmNoaW5nXCIsIFwiU2VhcmNoaW5nLi4uXCIpKTtcclxuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XHJcbiAgICBhYm9ydFJlZi5jdXJyZW50ID0gY29udHJvbGxlcjtcclxuICAgIGxldCBzaG91bGRPcGVuT25GaW5pc2ggPSBmYWxzZTtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHVybCA9IGAvVmlzaXRhcy9HZXRBY2NvdW50c0ZvckRyb3Bkb3duP3Rlcm09JHtlbmNvZGVVUklDb21wb25lbnQocXVlcnkpfSZwYWdlPTEmcGFnZVNpemU9MTBgO1xyXG4gICAgICBjb25zdCBkYXRhID0gYXdhaXQgZmV0Y2hKc29uPHsgaXRlbXM/OiB1bmtub3duW10gfT4odXJsLCB7IHNpZ25hbDogY29udHJvbGxlci5zaWduYWwgfSk7XHJcbiAgICAgIGNvbnN0IGl0ZW1zID0gKGRhdGEuaXRlbXMgfHwgW10pLmZsYXRNYXAoKGl0ZW0pID0+IHtcclxuICAgICAgICBjb25zdCBtYXBwZWQgPSBtYXBBY2NvdW50SXRlbShpdGVtKTtcclxuICAgICAgICByZXR1cm4gbWFwcGVkID8gW21hcHBlZF0gOiBbXTtcclxuICAgICAgfSk7XHJcbiAgICAgIHNldEFjdGl2ZUluZGV4KDApO1xyXG4gICAgICBzZXRGZXRjaGVkUXVlcnkoY3VycmVudFF1ZXJ5KTtcclxuICAgICAgc2V0Q2xpZW50Q2FjaGUoY2FjaGVLZXksIGl0ZW1zKTtcclxuICAgICAgc2V0T3B0aW9ucyhpdGVtcyk7XHJcbiAgICAgIGlmIChpdGVtcy5sZW5ndGggPCAxKSB7XHJcbiAgICAgICAgc2V0U2VsZWN0ZWQobnVsbCk7XHJcbiAgICAgICAgc2V0UXVlcnkoXCJcIik7XHJcbiAgICAgICAgc2V0U2hvd05vdEZvdW5kU3RhdGUodHJ1ZSk7XHJcbiAgICAgICAgb25TZWxlY3RlZChudWxsKTtcclxuICAgICAgICBzZXRTdGF0dXMoaW5kVChcIkNvbW1vbl9Ob3RGb3VuZFwiLCBcIk5vdCBmb3VuZFwiKSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc2V0U2hvd05vdEZvdW5kU3RhdGUoZmFsc2UpO1xyXG4gICAgICAgIHNldFN0YXR1cyhpbmRGb3JtYXQoXCJWaXNpdHNfQ3JlYXRlX0NsaWVudENvdW50XCIsIFwiezB9IGNsaWVudHNcIiwgaXRlbXMubGVuZ3RoKSk7XHJcbiAgICAgIH1cclxuICAgICAgc2V0SGFzTW9yZShpdGVtcy5sZW5ndGggPT09IDEwKTtcclxuICAgICAgc2hvdWxkT3Blbk9uRmluaXNoID0gdHJ1ZTtcclxuICAgIH0gY2F0Y2ggKGVycjogYW55KSB7XHJcbiAgICAgIGlmIChlcnI/Lm5hbWUgPT09IFwiQWJvcnRFcnJvclwiKSB7XHJcbiAgICAgICAgc2V0U3RhdHVzKGluZFQoXCJWaXNpdHNfQ3JlYXRlX1NlYXJjaENhbmNlbGVkXCIsIFwiU2VhcmNoIGNhbmNlbGVkLlwiKSk7XHJcbiAgICAgIH0gZWxzZSBpZiAoU3RyaW5nKGVycj8ubWVzc2FnZSB8fCBcIlwiKS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKFwidGltZW91dFwiKSkge1xyXG4gICAgICAgIHNldFN0YXR1cyhpbmRUKFwiVmlzaXRzX0NyZWF0ZV9TZWFyY2hUaW1lb3V0XCIsIFwiVGhlIHNlYXJjaCB0b29rIHRvbyBsb25nLiBUeXBlIG1vcmUgY2hhcmFjdGVycyB0byBuYXJyb3cgZG93bi5cIikpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNldFN0YXR1cyhpbmRUKFwiVmlzaXRzX0NyZWF0ZV9Mb2FkQ2xpZW50c0Vycm9yXCIsIFwiRmFpbGVkIHRvIGxvYWQgY2xpZW50cy5cIikpO1xyXG4gICAgICB9XHJcbiAgICB9IGZpbmFsbHkge1xyXG4gICAgICBhYm9ydFJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XHJcbiAgICAgIHNldEJsb2NraW5nKGZhbHNlKTtcclxuICAgICAgaWYgKHNob3VsZE9wZW5PbkZpbmlzaCkgc2V0T3Blbih0cnVlKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBjb25zdCBsb2FkTW9yZSA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcclxuICAgIGlmIChsb2FkaW5nTW9yZSB8fCBsb2FkaW5nIHx8ICFoYXNNb3JlIHx8IHF1ZXJ5LnRyaW0oKS5sZW5ndGggPCBtaW5DaGFycykgcmV0dXJuO1xyXG4gICAgc2V0TG9hZGluZ01vcmUodHJ1ZSk7XHJcbiAgICBzZXRCbG9ja2luZyh0cnVlKTtcclxuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XHJcbiAgICBhYm9ydFJlZi5jdXJyZW50ID0gY29udHJvbGxlcjtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IG5leHRQYWdlID0gcGFnZSArIDE7XHJcbiAgICAgIGNvbnN0IHVybCA9IGAvVmlzaXRhcy9HZXRBY2NvdW50c0ZvckRyb3Bkb3duP3Rlcm09JHtlbmNvZGVVUklDb21wb25lbnQocXVlcnkpfSZwYWdlPSR7bmV4dFBhZ2V9JnBhZ2VTaXplPTEwYDtcclxuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IGZldGNoSnNvbjx7IGl0ZW1zPzogdW5rbm93bltdIH0+KHVybCwgeyBzaWduYWw6IGNvbnRyb2xsZXIuc2lnbmFsIH0pO1xyXG4gICAgICBjb25zdCBpdGVtcyA9IChkYXRhLml0ZW1zIHx8IFtdKS5mbGF0TWFwKChpdGVtKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbWFwcGVkID0gbWFwQWNjb3VudEl0ZW0oaXRlbSk7XHJcbiAgICAgICAgcmV0dXJuIG1hcHBlZCA/IFttYXBwZWRdIDogW107XHJcbiAgICAgIH0pO1xyXG4gICAgICBzZXRPcHRpb25zKChwcmV2KSA9PiBbLi4ucHJldiwgLi4uaXRlbXNdKTtcclxuICAgICAgc2V0UGFnZShuZXh0UGFnZSk7XHJcbiAgICAgIHNldEhhc01vcmUoaXRlbXMubGVuZ3RoID09PSAxMCk7XHJcbiAgICB9IGZpbmFsbHkge1xyXG4gICAgICBhYm9ydFJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgc2V0TG9hZGluZ01vcmUoZmFsc2UpO1xyXG4gICAgICBzZXRCbG9ja2luZyhmYWxzZSk7XHJcbiAgICB9XHJcbiAgfSwgW2xvYWRpbmdNb3JlLCBsb2FkaW5nLCBoYXNNb3JlLCBxdWVyeSwgcGFnZSwgbWluQ2hhcnNdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghb3BlbiB8fCAhbGlzdFJlZi5jdXJyZW50KSByZXR1cm47XHJcbiAgICBjb25zdCBlbCA9IGxpc3RSZWYuY3VycmVudDtcclxuICAgIGNvbnN0IG9uU2Nyb2xsID0gKCkgPT4ge1xyXG4gICAgICBpZiAoZWwuc2Nyb2xsVG9wICsgZWwuY2xpZW50SGVpZ2h0ID49IGVsLnNjcm9sbEhlaWdodCAtIDgpIGxvYWRNb3JlKCk7XHJcbiAgICB9O1xyXG4gICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBvblNjcm9sbCwgeyBwYXNzaXZlOiB0cnVlIH0pO1xyXG4gICAgcmV0dXJuICgpID0+IGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgb25TY3JvbGwpO1xyXG4gIH0sIFtvcGVuLCBsb2FkTW9yZV0pO1xyXG5cclxuICBjb25zdCBzZWxlY3RPcHRpb24gPSAob3B0OiBDbGllbnRPcHRpb24pID0+IHtcclxuICAgIHNldFNlbGVjdGVkKG9wdCk7XHJcbiAgICBzZXRRdWVyeShvcHQudGV4dCk7XHJcbiAgICBzZXRTaG93Tm90Rm91bmRTdGF0ZShmYWxzZSk7XHJcbiAgICBzZXRPcGVuKGZhbHNlKTtcclxuICAgIG9uU2VsZWN0ZWQob3B0KTtcclxuICB9O1xyXG5cclxuICBjb25zdCByZXF1ZXN0U2VhcmNoT3JPcGVuID0gKCkgPT4ge1xyXG4gICAgaWYgKGxvYWRpbmcgfHwgYmxvY2tpbmcpIHJldHVybjtcclxuICAgIGNvbnN0IHRyaW1tZWQgPSBxdWVyeS50cmltKCk7XHJcbiAgICBpZiAodHJpbW1lZC5sZW5ndGggPCBtaW5DaGFycykge1xyXG4gICAgICBjYW5jZWxQZW5kaW5nKCk7XHJcbiAgICAgIHNldFNob3dOb3RGb3VuZFN0YXRlKGZhbHNlKTtcclxuICAgICAgc2V0T3B0aW9ucyhbXSk7XHJcbiAgICAgIHNldEhhc01vcmUoZmFsc2UpO1xyXG4gICAgICBzZXRTdGF0dXMoaW5kRm9ybWF0KFwiVmlzaXRzX0NyZWF0ZV9NaW5DaGFyc1wiLCBcIlR5cGUgYXQgbGVhc3QgezB9IGNoYXJhY3RlcnMuXCIsIG1pbkNoYXJzKSk7XHJcbiAgICAgIHNldE9wZW4odHJ1ZSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBxS2V5ID0gdHJpbW1lZC50b0xvd2VyQ2FzZSgpO1xyXG4gICAgY29uc3QgaXNTZWxlY3Rpb25EaXNwbGF5ID0gISFzZWxlY3RlZCAmJiBxdWVyeSA9PT0gKHNlbGVjdGVkLnRleHQgfHwgXCJcIik7XHJcbiAgICBjb25zdCBzaG91bGRTZWFyY2ggPSAhaXNTZWxlY3Rpb25EaXNwbGF5ICYmIHFLZXkgIT09IGZldGNoZWRRdWVyeTtcclxuXHJcbiAgICBpZiAoc2hvdWxkU2VhcmNoKSB7XHJcbiAgICAgIHNlYXJjaCgpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgc2V0T3Blbih0cnVlKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBoYW5kbGVLZXlEb3duID0gKGV2OiBSZWFjdC5LZXlib2FyZEV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+KSA9PiB7XHJcbiAgICBoYW5kbGVDb21ib2JveEtleURvd24oZXYsIHtcclxuICAgICAgaXNPcGVuOiBvcGVuLFxyXG4gICAgICBzZXRPcGVuLFxyXG4gICAgICBvcHRpb25Db3VudDogZmlsdGVyZWQubGVuZ3RoLFxyXG4gICAgICBzZXRBY3RpdmVJbmRleCxcclxuICAgICAgcmVxdWlyZU9wZW5Gb3JBcnJvd3M6IHRydWUsXHJcbiAgICAgIG9uRW50ZXJXaGVuT3BlbjogKCkgPT4ge1xyXG4gICAgICAgIGlmIChmaWx0ZXJlZC5sZW5ndGggPCAxKSB7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNlbGVjdE9wdGlvbihmaWx0ZXJlZFtyZXNvbHZlZEFjdGl2ZUluZGV4XSA/PyBmaWx0ZXJlZFswXSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIG9uRW50ZXJXaGVuQ2xvc2VkOiByZXF1ZXN0U2VhcmNoT3JPcGVuLFxyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgcXVlcnlLZXkgPSBxdWVyeS50cmltKCkudG9Mb3dlckNhc2UoKTtcclxuICBjb25zdCBpc1NlbGVjdGlvbkRpc3BsYXkgPSAhIXNlbGVjdGVkICYmIHF1ZXJ5ID09PSAoc2VsZWN0ZWQudGV4dCB8fCBcIlwiKTtcclxuICBjb25zdCBzaG93U2VhcmNoSWNvbiA9XHJcbiAgICAhbG9hZGluZyAmJiAhYmxvY2tpbmcgJiYgIWlzU2VsZWN0aW9uRGlzcGxheSAmJiBxdWVyeUtleS5sZW5ndGggPj0gbWluQ2hhcnMgJiYgKGZldGNoZWRRdWVyeSA9PT0gXCJcIiB8fCBxdWVyeUtleSAhPT0gZmV0Y2hlZFF1ZXJ5KTtcclxuXHJcbiAgY29uc3Qgd3JhcHBlckNsYXNzID0gaXNDb21wYWN0ID8gXCJzcGFjZS15LTEgaGlzdG9yeS1jbGllbnQtY29tYm9ib3hcIiA6IFwic3BhY2UteS0yXCI7XHJcbiAgY29uc3QgbGFiZWxDbGFzcyA9IFwiZm9ybS1sYWJlbCBmb250LXNlbWlib2xkXCI7XHJcbiAgY29uc3QgY29udGFpbmVyQ2xhc3MgPSBpc0NvbXBhY3RcclxuICAgID8gXCJyZWxhdGl2ZSB3LWZ1bGwgcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYmctd2hpdGUgdGV4dC1sZWZ0IGZvY3VzLXdpdGhpbjpib3JkZXItcHJpbWFyeSBmb2N1cy13aXRoaW46cmluZy0yIGZvY3VzLXdpdGhpbjpyaW5nLXByaW1hcnkgZm9jdXMtd2l0aGluOnJpbmctb2Zmc2V0LXdoaXRlIHNtOnRleHQtc21cIlxyXG4gICAgOiBcInJlbGF0aXZlIHctZnVsbCBjdXJzb3ItZGVmYXVsdCByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBib3JkZXItc2xhdGUtMzAwIGJnLXdoaXRlIHRleHQtbGVmdCBzaGFkb3cteHMgZm9jdXMtd2l0aGluOmJvcmRlci1wcmltYXJ5IGZvY3VzLXdpdGhpbjpyaW5nLTIgZm9jdXMtd2l0aGluOnJpbmctcHJpbWFyeSBmb2N1cy13aXRoaW46cmluZy1vZmZzZXQtMCBzbTp0ZXh0LXNtXCI7XHJcbiAgY29uc3QgaW5wdXRDbGFzcyA9IGlzQ29tcGFjdFxyXG4gICAgPyBcInctZnVsbCByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBweC0zIHB5LTIgcHItMjQgdGV4dC1zbSBzbTp0ZXh0LWJhc2UgbGVhZGluZy01IHRleHQtc2xhdGUtOTAwIHBsYWNlaG9sZGVyOnRleHQtc2xhdGUtNDAwIGZvY3VzOm91dGxpbmUtaGlkZGVuIGZvY3VzOnJpbmctMiBmb2N1czpyaW5nLXByaW1hcnkgZm9jdXM6Ym9yZGVyLXByaW1hcnlcIlxyXG4gICAgOiBcInctZnVsbCByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBweC0zIHB5LTIgcHItMjQgdGV4dC1zbSBzbTp0ZXh0LWJhc2UgbGVhZGluZy01IHRleHQtc2xhdGUtOTAwIHBsYWNlaG9sZGVyOnRleHQtc2xhdGUtNDAwIGZvY3VzOm91dGxpbmUtaGlkZGVuIGZvY3VzOnJpbmctMiBmb2N1czpyaW5nLXByaW1hcnkgZm9jdXM6Ym9yZGVyLXByaW1hcnlcIjtcclxuICBjb25zdCBlbXB0eVRleHRDbGFzcyA9IGlzQ29tcGFjdCA/IFwicHgtNCBweS0yIHRleHQtc20gdGV4dC1zbGF0ZS01MDBcIiA6IFwicHgtNCBweS0yIHRleHQtc20gdGV4dC1zbGF0ZS01MDBcIjtcclxuICBjb25zdCBvcHRpb25DbGFzcyA9IGlzQ29tcGFjdFxyXG4gICAgPyBcInJlbGF0aXZlIGZsZXggdy1mdWxsIGN1cnNvci1kZWZhdWx0IHNlbGVjdC1ub25lIGl0ZW1zLXN0YXJ0IHB5LTIgcHgtMyB0ZXh0LWxlZnQgdGV4dC1zbVwiXHJcbiAgICA6IFwicmVsYXRpdmUgZmxleCB3LWZ1bGwgY3Vyc29yLWRlZmF1bHQgc2VsZWN0LW5vbmUgaXRlbXMtc3RhcnQgcHktMiBweC0zIHRleHQtbGVmdCB0ZXh0LXNtXCI7XHJcbiAgY29uc3Qgb3B0aW9uVGV4dENsYXNzID0gaXNDb21wYWN0ID8gXCJibG9jayB0cnVuY2F0ZSB1cHBlcmNhc2UgdGV4dC1bMTNweF1cIiA6IFwiYmxvY2sgdHJ1bmNhdGUgdXBwZXJjYXNlIHRleHQtWzEzcHhdXCI7XHJcbiAgY29uc3Qgb3B0aW9uU3ViVGV4dENsYXNzID0gaXNDb21wYWN0ID8gXCJibG9jayB0cnVuY2F0ZSB1cHBlcmNhc2UgdGV4dC1bMTFweF0gdGV4dC1zbGF0ZS02MDBcIiA6IFwiYmxvY2sgdHJ1bmNhdGUgdXBwZXJjYXNlIHRleHQtWzExcHhdIHRleHQtc2xhdGUtNjAwXCI7XHJcbiAgY29uc3Qgb3B0aW9uU3ViVGV4dFNlY29uZGFyeUNsYXNzID0gaXNDb21wYWN0XHJcbiAgICA/IFwiYmxvY2sgdHJ1bmNhdGUgdXBwZXJjYXNlIHRleHQtWzExcHhdIHRleHQtc2xhdGUtNTAwXCJcclxuICAgIDogXCJibG9jayB0cnVuY2F0ZSB1cHBlcmNhc2UgdGV4dC1bMTFweF0gdGV4dC1zbGF0ZS01MDBcIjtcclxuICBjb25zdCBzdGF0dXNDbGFzcyA9IGlzQ29tcGFjdCA/IFwidGV4dC14cyB0ZXh0LXNsYXRlLTUwMCB0ZWNoLWluZm9cIiA6IFwidGV4dC14cyB0ZXh0LXNsYXRlLTUwMCB0ZWNoLWluZm9cIjtcclxuICBjb25zdCBzZWFyY2hJY29uU2l6ZSA9IGlzQ29tcGFjdCA/IFwiaC01IHctNVwiIDogXCJoLTUgdy01XCI7XHJcbiAgY29uc3QgY2hldnJvbkljb25TaXplID0gaXNDb21wYWN0ID8gXCJoLTUgdy01XCIgOiBcImgtNSB3LTVcIjtcclxuXHJcbiAgY29uc3Qgc2FmZUlkQmFzZSA9IGlkQmFzZSB8fCAoaXNDb21wYWN0ID8gXCJoaXN0b3J5LWNsaWVudFwiIDogXCJjbGllbnRcIik7XHJcbiAgY29uc3QgbGlzdElkID0gYCR7c2FmZUlkQmFzZX0tb3B0aW9uc2A7XHJcbiAgY29uc3QgYWN0aXZlSWQgPVxyXG4gICAgb3BlbiAmJiBmaWx0ZXJlZFtyZXNvbHZlZEFjdGl2ZUluZGV4XVxyXG4gICAgICA/IGAke3NhZmVJZEJhc2V9LW9wdC0ke2ZpbHRlcmVkW3Jlc29sdmVkQWN0aXZlSW5kZXhdLnZhbHVlfWBcclxuICAgICAgOiB1bmRlZmluZWQ7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT17d3JhcHBlckNsYXNzfSByZWY9e2NvbnRhaW5lclJlZn0+XHJcbiAgICAgIHtzaG91bGRTaG93TGFiZWwgJiYgPGxhYmVsIGNsYXNzTmFtZT17bGFiZWxDbGFzc30+e3Jlc29sdmVkTGFiZWx9PC9sYWJlbD59XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmVcIj5cclxuICAgICAgICA8ZGl2IHJlZj17Ym94UmVmfSBjbGFzc05hbWU9e2NvbnRhaW5lckNsYXNzfT5cclxuICAgICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgICBjbGFzc05hbWU9e2lucHV0Q2xhc3N9XHJcbiAgICAgICAgICAgIHZhbHVlPXtxdWVyeX1cclxuICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgIGNvbnN0IHZhbCA9IGV2ZW50LnRhcmdldC52YWx1ZTtcclxuICAgICAgICAgICAgICBzZXRBY3RpdmVJbmRleCgwKTtcclxuICAgICAgICAgICAgICBzZXRRdWVyeSh2YWwpO1xyXG4gICAgICAgICAgICAgIHNldFNob3dOb3RGb3VuZFN0YXRlKGZhbHNlKTtcclxuICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWQgJiYgdmFsICE9PSAoc2VsZWN0ZWQudGV4dCB8fCBcIlwiKSkge1xyXG4gICAgICAgICAgICAgICAgc2V0U2VsZWN0ZWQobnVsbCk7XHJcbiAgICAgICAgICAgICAgICBvblNlbGVjdGVkPy4obnVsbCk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGNhbmNlbFBlbmRpbmcoKTtcclxuICAgICAgICAgICAgICBzZXRGZXRjaGVkUXVlcnkoXCJcIik7XHJcbiAgICAgICAgICAgICAgc2V0T3B0aW9ucyhbXSk7XHJcbiAgICAgICAgICAgICAgc2V0SGFzTW9yZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgc2V0U3RhdHVzKFxyXG4gICAgICAgICAgICAgICAgdmFsLnRyaW0oKS5sZW5ndGggPCBtaW5DaGFyc1xyXG4gICAgICAgICAgICAgICAgICA/IGluZEZvcm1hdChcIlZpc2l0c19DcmVhdGVfTWluQ2hhcnNcIiwgXCJUeXBlIGF0IGxlYXN0IHswfSBjaGFyYWN0ZXJzLlwiLCBtaW5DaGFycylcclxuICAgICAgICAgICAgICAgICAgOiBpbmRUKFwiVmlzaXRzX0NyZWF0ZV9QcmVzc1NlYXJjaEhpbnRcIiwgXCJQcmVzcyBzZWFyY2gsIEVudGVyIG9yIEFycm93RG93biB0byBzZWFyY2guXCIpXHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICBzZXRPcGVuKGZhbHNlKTtcclxuICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgb25LZXlEb3duPXtoYW5kbGVLZXlEb3dufVxyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17cmVzb2x2ZWRQbGFjZWhvbGRlcn1cclxuICAgICAgICAgICAgYXJpYS1sYWJlbD17cmVzb2x2ZWRMYWJlbH1cclxuICAgICAgICAgICAgcmVhZE9ubHk9e2xvYWRpbmcgfHwgYmxvY2tpbmd9XHJcbiAgICAgICAgICAgIGFyaWEtYnVzeT17bG9hZGluZyB8fCBibG9ja2luZ31cclxuICAgICAgICAgICAgcm9sZT1cImNvbWJvYm94XCJcclxuICAgICAgICAgICAgYXJpYS1leHBhbmRlZD17b3Blbn1cclxuICAgICAgICAgICAgYXJpYS1jb250cm9scz17bGlzdElkfVxyXG4gICAgICAgICAgICBhcmlhLWFjdGl2ZWRlc2NlbmRhbnQ9e2FjdGl2ZUlkfVxyXG4gICAgICAgICAgLz5cclxuXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LXktMCByaWdodC0wIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHByLTJcIj5cclxuICAgICAgICAgICAgeyhsb2FkaW5nIHx8IGJsb2NraW5nKSAmJiAoXHJcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgcHgtMlwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxyXG4gICAgICAgICAgICAgICAge2lzQ29tcGFjdCA/IDxTcGlubmVyIHNpemU9XCJoLTQgdy00XCIgLz4gOiA8U3Bpbm5lciAvPn1cclxuICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICl9XHJcblxyXG4gICAgICAgICAgICB7c2hvd1NlYXJjaEljb24gJiYgKFxyXG4gICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgcC0xLjUgdGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC1zbGF0ZS01MDBcIlxyXG4gICAgICAgICAgICAgICAgb25DbGljaz17cmVxdWVzdFNlYXJjaE9yT3Blbn1cclxuICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2luZFQoXCJWaXNpdHNfQ3JlYXRlX1NlYXJjaENsaWVudFwiLCBcIlNlYXJjaCBhY2NvdW50XCIpfVxyXG4gICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGZpbGw9XCJub25lXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIHN0cm9rZVdpZHRoPXsxLjV9IHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIGNsYXNzTmFtZT17c2VhcmNoSWNvblNpemV9PlxyXG4gICAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIm0xNS43NSAxNS43NS0yLjQ4OS0yLjQ4OW0wIDBhMy4zNzUgMy4zNzUgMCAxIDAtNC43NzMtNC43NzMgMy4zNzUgMy4zNzUgMCAwIDAgNC43NzQgNC43NzRaTTIxIDEyYTkgOSAwIDEgMS0xOCAwIDkgOSAwIDAgMSAxOCAwWlwiIC8+XHJcbiAgICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgKX1cclxuXHJcbiAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBwLTEuNSB0ZXh0LXNsYXRlLTUwMCBob3Zlcjp0ZXh0LXNsYXRlLTYwMFwiXHJcbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGxvYWRpbmcgfHwgYmxvY2tpbmcpIHJldHVybjtcclxuICAgICAgICAgICAgICAgIGlmIChvcGVuKSB7XHJcbiAgICAgICAgICAgICAgICAgIHNldE9wZW4oZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0U2VhcmNoT3JPcGVuKCk7XHJcbiAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICBkaXNhYmxlZD17bG9hZGluZyB8fCBibG9ja2luZ31cclxuICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtcclxuICAgICAgICAgICAgICAgIG9wZW5cclxuICAgICAgICAgICAgICAgICAgPyBpbmRUKFwiVmlzaXRzX0NyZWF0ZV9IaWRlQ2xpZW50T3B0aW9uc1wiLCBcIkhpZGUgY2xpZW50IG9wdGlvbnNcIilcclxuICAgICAgICAgICAgICAgICAgOiBpbmRUKFwiVmlzaXRzX0NyZWF0ZV9TaG93Q2xpZW50T3B0aW9uc1wiLCBcIlNob3cgY2xpZW50IG9wdGlvbnNcIilcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICB7b3BlbiA/IDxDaGV2cm9uVXBTdmcgY2xhc3NOYW1lPXtjaGV2cm9uSWNvblNpemV9IC8+IDogPENoZXZyb25Eb3duU3ZnIGNsYXNzTmFtZT17Y2hldnJvbkljb25TaXplfSAvPn1cclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPEZsb2F0aW5nTGlzdFxyXG4gICAgICAgIGFuY2hvclJlZj17Ym94UmVmfVxyXG4gICAgICAgIG9wZW49e29wZW59XHJcbiAgICAgICAgekluZGV4PXs0MDAwMDB9XHJcbiAgICAgICAgbWF4SGVpZ2h0Q2xhc3M9XCJtYXgtaC03MlwiXHJcbiAgICAgICAgcm9sZT1cImxpc3Rib3hcIlxyXG4gICAgICAgIHJvdW5kZWRDbGFzcz1cInJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldXCJcclxuICAgICAgICBwb3J0YWxDbGFzc05hbWU9e3BvcnRhbENsYXNzTmFtZX1cclxuICAgICAgICBwYW5lbENsYXNzTmFtZT17cGFuZWxDbGFzc05hbWV9XHJcbiAgICAgID5cclxuICAgICAgICAgIDxkaXYgcmVmPXtsaXN0UmVmfSBpZD17bGlzdElkfT5cclxuICAgICAgICAgICAge29wdGlvbnMubGVuZ3RoID09PSAwICYmIChcclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17ZW1wdHlUZXh0Q2xhc3N9PlxyXG4gICAgICAgICAgICAgICAge3Nob3dOb3RGb3VuZFN0YXRlXHJcbiAgICAgICAgICAgICAgICAgID8gaW5kVChcIkNvbW1vbl9Ob3RGb3VuZFwiLCBcIk5vdCBmb3VuZFwiKVxyXG4gICAgICAgICAgICAgICAgICA6IHF1ZXJ5LnRyaW0oKS5sZW5ndGggPCBtaW5DaGFyc1xyXG4gICAgICAgICAgICAgICAgICA/IGluZEZvcm1hdChcIlZpc2l0c19DcmVhdGVfTWluQ2hhcnNcIiwgXCJUeXBlIGF0IGxlYXN0IHswfSBjaGFyYWN0ZXJzLlwiLCBtaW5DaGFycylcclxuICAgICAgICAgICAgICAgICAgOiBpbmRUKFwiVmlzaXRzX0NyZWF0ZV9Ob1Jlc3VsdHNcIiwgXCJObyByZXN1bHRzXCIpfVxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgICB7IWxvYWRpbmcgJiYgb3B0aW9ucy5sZW5ndGggPiAwICYmIGZpbHRlcmVkLmxlbmd0aCA9PT0gMCAmJiAoXHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2VtcHR5VGV4dENsYXNzfT57aW5kVChcIlZpc2l0c19DcmVhdGVfTm9NYXRjaGVzXCIsIFwiTm8gbWF0Y2hlc1wiKX08L2Rpdj5cclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgeyFsb2FkaW5nICYmXHJcbiAgICAgICAgICAgICAgZmlsdGVyZWQubWFwKChvcHQsIGlkeCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaXNBY3RpdmUgPSBpZHggPT09IHJlc29sdmVkQWN0aXZlSW5kZXg7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzZWwgPSBzZWxlY3RlZD8udmFsdWUgPT09IG9wdC52YWx1ZTtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgICAgICAgICAgICBrZXk9e29wdC52YWx1ZX1cclxuICAgICAgICAgICAgICAgICAgICBpZD17YCR7c2FmZUlkQmFzZX0tb3B0LSR7b3B0LnZhbHVlfWB9XHJcbiAgICAgICAgICAgICAgICAgICAgcm9sZT1cIm9wdGlvblwiXHJcbiAgICAgICAgICAgICAgICAgICAgYXJpYS1zZWxlY3RlZD17c2VsfVxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcclxuICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbkNsYXNzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgaXNBY3RpdmUgPyBcImJnLXByaW1hcnkgdGV4dC13aGl0ZVwiIDogc2VsID8gXCJiZy1wcmltYXJ5LzEwIHRleHQtcHJpbWFyeVwiIDogaXNDb21wYWN0ID8gXCJ0ZXh0LXNsYXRlLTcwMFwiIDogXCJ0ZXh0LXNsYXRlLTkwMFwiXHJcbiAgICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgICAgICBvbk1vdXNlRW50ZXI9eygpID0+IHNldEFjdGl2ZUluZGV4KGlkeCl9XHJcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2VsZWN0T3B0aW9uKG9wdCl9XHJcbiAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgc3BhY2UteS0wLjVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhvcHRpb25UZXh0Q2xhc3MsIHNlbCA/IFwiZm9udC1zZW1pYm9sZFwiIDogXCJmb250LW5vcm1hbFwiKX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtvcHQudGV4dH1cclxuICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgIHtpc0NvbXBhY3QgPyAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAge29wdC5jYXJnbyAmJiA8c3BhbiBjbGFzc05hbWU9e29wdGlvblN1YlRleHRDbGFzc30+e29wdC5jYXJnb308L3NwYW4+fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtvcHQuZW1wcmVzYSAmJiA8c3BhbiBjbGFzc05hbWU9e29wdGlvblN1YlRleHRTZWNvbmRhcnlDbGFzc30+e29wdC5lbXByZXNhfTwvc3Bhbj59XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgKSA6IChcclxuICAgICAgICAgICAgICAgICAgICAgICAgPD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e29wdGlvblN1YlRleHRDbGFzc30+e29wdC5jYXJnbyB8fCBcIlwifTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e29wdGlvblN1YlRleHRTZWNvbmRhcnlDbGFzc30+e29wdC5lbXByZXNhIHx8IFwiXCJ9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8Lz5cclxuICAgICAgICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICB9KX1cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvRmxvYXRpbmdMaXN0PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgZmxleCBqdXN0aWZ5LWVuZFwiPlxyXG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT17c3RhdHVzQ2xhc3N9PntzdGF0dXN9PC9zcGFuPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDbGllbnRTZWFyY2hDb21ib2JveDtcclxuIiwgImV4cG9ydCBjb25zdCBpc05vRGF0YVRleHQgPSAodmFsdWU6IHVua25vd24pOiBib29sZWFuID0+IHtcclxuICBjb25zdCByYXcgPSBTdHJpbmcodmFsdWUgfHwgXCJcIikudHJpbSgpLnRvTG93ZXJDYXNlKCk7XHJcbiAgaWYgKCFyYXcpIHJldHVybiBmYWxzZTtcclxuICBjb25zdCBub3JtYWxpemVkID0gcmF3LnJlcGxhY2UoL1teYS16MC05XSsvZywgXCJcIik7XHJcbiAgcmV0dXJuIG5vcm1hbGl6ZWQgPT09IFwic2luZGF0b3NcIiB8fCBub3JtYWxpemVkID09PSBcIm5vZGF0YVwiO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGlzTm9EYXRhUm93ID0gKHJvdzogdW5rbm93bik6IGJvb2xlYW4gPT4ge1xyXG4gIGlmIChyb3cgPT09IG51bGwgfHwgcm93ID09PSB1bmRlZmluZWQpIHJldHVybiB0cnVlO1xyXG4gIGlmIChBcnJheS5pc0FycmF5KHJvdykpIHtcclxuICAgIHJldHVybiByb3cubGVuZ3RoID09PSAxICYmIGlzTm9EYXRhVGV4dChyb3dbMF0pO1xyXG4gIH1cclxuICBpZiAodHlwZW9mIHJvdyA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgcmV0dXJuIGlzTm9EYXRhVGV4dChyb3cpO1xyXG4gIH1cclxuICBpZiAodHlwZW9mIHJvdyA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgY29uc3QgdmFsdWVzID0gT2JqZWN0LnZhbHVlcyhyb3cgYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj4pO1xyXG4gICAgaWYgKCF2YWx1ZXMubGVuZ3RoKSByZXR1cm4gdHJ1ZTtcclxuICAgIHJldHVybiB2YWx1ZXMuc29tZSgodikgPT4gdHlwZW9mIHYgPT09IFwic3RyaW5nXCIgJiYgaXNOb0RhdGFUZXh0KHYpKTtcclxuICB9XHJcbiAgcmV0dXJuIGZhbHNlO1xyXG59O1xyXG4iLCAiaW1wb3J0IHsgaXNOb0RhdGFSb3csIGlzTm9EYXRhVGV4dCB9IGZyb20gXCIuL25vRGF0YS50c1wiO1xyXG5cclxuZXhwb3J0IHR5cGUgQWNjb3VudEl0ZW0gPSB7XHJcbiAgdmFsdWU6IHN0cmluZztcclxuICB0ZXh0OiBzdHJpbmc7XHJcbiAgY2FyZ28/OiBzdHJpbmc7XHJcbiAgZW1wcmVzYT86IHN0cmluZztcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBtYXBBY2NvdW50SXRlbSA9IChpdGVtOiB1bmtub3duKTogQWNjb3VudEl0ZW0gfCBudWxsID0+IHtcclxuICBpZiAoaXNOb0RhdGFSb3coaXRlbSkpIHJldHVybiBudWxsO1xyXG4gIGlmIChBcnJheS5pc0FycmF5KGl0ZW0pKSB7XHJcbiAgICBjb25zdCBjb2RlID0gKGl0ZW1bMF0gfHwgXCJcIikudG9TdHJpbmcoKS50cmltKCk7XHJcbiAgICBjb25zdCBkZXNjID0gKGl0ZW1bMl0gfHwgKGl0ZW0gYXMgYW55KVsxXSB8fCBcIlwiKS50b1N0cmluZygpLnRyaW0oKTtcclxuICAgIGlmICghY29kZSB8fCBpc05vRGF0YVRleHQoY29kZSkgfHwgaXNOb0RhdGFUZXh0KGRlc2MpKSByZXR1cm4gbnVsbDtcclxuICAgIGNvbnN0IHRleHQgPSBkZXNjID8gYCR7ZGVzY30gKCR7Y29kZX0pYCA6IGNvZGU7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB2YWx1ZTogY29kZSxcclxuICAgICAgdGV4dCxcclxuICAgICAgY2FyZ286IFwiXCIsXHJcbiAgICAgIGVtcHJlc2E6IGl0ZW1bMl0gYXMgc3RyaW5nLFxyXG4gICAgfTtcclxuICB9XHJcbiAgaWYgKGl0ZW0gJiYgdHlwZW9mIGl0ZW0gPT09IFwib2JqZWN0XCIpIHtcclxuICAgIGNvbnN0IHJhdyA9IGl0ZW0gYXMgYW55O1xyXG4gICAgY29uc3QgY29kZSA9IChyYXcuYWNjb3VudE51bSB8fCByYXcuQWNjb3VudE51bSB8fCBcIlwiKS50b1N0cmluZygpLnRyaW0oKTtcclxuICAgIGNvbnN0IGRlc2MgPSAocmF3Lm5vbWJyZUNvbWVyY2lhbCB8fCByYXcuTm9tYnJlQ29tZXJjaWFsIHx8IHJhdy5yYXpvblNvY2lhbCB8fCByYXcuUmF6b25Tb2NpYWwgfHwgXCJcIilcclxuICAgICAgLnRvU3RyaW5nKClcclxuICAgICAgLnRyaW0oKTtcclxuICAgIGlmICghY29kZSB8fCBpc05vRGF0YVRleHQoY29kZSkgfHwgaXNOb0RhdGFUZXh0KGRlc2MpKSByZXR1cm4gbnVsbDtcclxuICAgIGNvbnN0IHRleHQgPSBkZXNjID8gYCR7ZGVzY30gKCR7Y29kZX0pYCA6IGNvZGU7XHJcbiAgICByZXR1cm4geyB2YWx1ZTogY29kZSwgdGV4dCB9O1xyXG4gIH1cclxuICByZXR1cm4gbnVsbDtcclxufTtcclxuIiwgImV4cG9ydCBjb25zdCBtYWtlQ2FjaGUgPSA8VD4obGltaXQgPSAxMCkgPT4ge1xyXG4gIGNvbnN0IG1hcCA9IG5ldyBNYXA8c3RyaW5nLCBUPigpO1xyXG4gIHJldHVybiB7XHJcbiAgICBnZXQ6IChrOiBzdHJpbmcpID0+IG1hcC5nZXQoayksXHJcbiAgICBzZXQ6IChrOiBzdHJpbmcsIHY6IFQpID0+IHtcclxuICAgICAgaWYgKG1hcC5oYXMoaykpIG1hcC5kZWxldGUoayk7XHJcbiAgICAgIG1hcC5zZXQoaywgdik7XHJcbiAgICAgIGlmIChtYXAuc2l6ZSA+IGxpbWl0KSB7XHJcbiAgICAgICAgY29uc3QgZmlyc3QgPSBtYXAua2V5cygpLm5leHQoKS52YWx1ZTtcclxuICAgICAgICBpZiAoZmlyc3QpIG1hcC5kZWxldGUoZmlyc3QpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgaGFzOiAoazogc3RyaW5nKSA9PiBtYXAuaGFzKGspLFxyXG4gICAgY2xlYXI6ICgpID0+IG1hcC5jbGVhcigpLFxyXG4gIH07XHJcbn07XHJcbiIsICJpbXBvcnQgeyBtYWtlQ2FjaGUgfSBmcm9tIFwiLi9tYWtlQ2FjaGUudHNcIjtcclxuXHJcbmNvbnN0IENVUlJFTlRfQ09NUEFOWSA9IFN0cmluZyhnbG9iYWxUaGlzLl9fSU5EX1NFTEVDVEVEX0NPTVBBTllfXyB8fCBcIlwiKS50cmltKCkudG9VcHBlckNhc2UoKTtcclxuY29uc3QgQ09NUEFOWV9TVE9SQUdFX1NVRkZJWCA9IENVUlJFTlRfQ09NUEFOWSA/IGBfJHtDVVJSRU5UX0NPTVBBTll9YCA6IFwiXCI7XHJcblxyXG5leHBvcnQgY29uc3QgVklTSVRfRFJBRlRfS0VZID0gYHZpc2l0YXNfZHJhZnQke0NPTVBBTllfU1RPUkFHRV9TVUZGSVh9YDtcclxuZXhwb3J0IGNvbnN0IENPTlRBQ1RTX1NUT1JBR0VfS0VZID0gYHZpc2l0YXNfY29udGFjdHNfY2FjaGVfdjEke0NPTVBBTllfU1RPUkFHRV9TVUZGSVh9YDtcclxuZXhwb3J0IGNvbnN0IENPTlRBQ1RTX1NFTEVDVElPTl9LRVkgPSBgdmlzaXRhc19jb250YWN0c19zZWxlY3RlZF92MSR7Q09NUEFOWV9TVE9SQUdFX1NVRkZJWH1gO1xyXG5leHBvcnQgY29uc3QgQ1JFQVRFX0ZSRVNIX1BBUkFNID0gXCJmcmVzaFwiO1xyXG5cclxuY29uc3QgY2xpZW50Q2FjaGUgPSBtYWtlQ2FjaGU8dW5rbm93bltdPigxMCk7XHJcbmNvbnN0IGNvbnRhY3RzQ2FjaGUgPSBtYWtlQ2FjaGU8dW5rbm93bltdPigxMCk7XHJcblxyXG5jb25zdCBjYWNoZUtleVdpdGhDb21wYW55ID0gKGtleTogc3RyaW5nKSA9PiBgJHtDVVJSRU5UX0NPTVBBTlkgfHwgXCJERUZBVUxUXCJ9Ojoke2tleX1gO1xyXG5cclxuY29uc3QgcmVhZFN0b3JhZ2UgPSAoa2V5OiBzdHJpbmcpOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHJhdyA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oa2V5KTtcclxuICAgIGlmICghcmF3KSByZXR1cm4ge307XHJcbiAgICByZXR1cm4gSlNPTi5wYXJzZShyYXcpO1xyXG4gIH0gY2F0Y2gge1xyXG4gICAgcmV0dXJuIHt9O1xyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IHdyaXRlU3RvcmFnZSA9IChrZXk6IHN0cmluZywgZGF0YTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pID0+IHtcclxuICB0cnkge1xyXG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShrZXksIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcclxuICB9IGNhdGNoIHtcclxuICAgIC8vIGlnbm9yZVxyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBnZXRDbGllbnRDYWNoZSA9IChxdWVyeTogc3RyaW5nKTogdW5rbm93bltdIHwgbnVsbCA9PiB7XHJcbiAgY29uc3QgY2FjaGVLZXkgPSBjYWNoZUtleVdpdGhDb21wYW55KHF1ZXJ5KTtcclxuICBpZiAoIWNsaWVudENhY2hlLmhhcyhjYWNoZUtleSkpIHJldHVybiBudWxsO1xyXG4gIHJldHVybiBjbGllbnRDYWNoZS5nZXQoY2FjaGVLZXkpIHx8IG51bGw7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgaGFzQ2xpZW50Q2FjaGUgPSAocXVlcnk6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xyXG4gIHJldHVybiBjbGllbnRDYWNoZS5oYXMoY2FjaGVLZXlXaXRoQ29tcGFueShxdWVyeSkpO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHNldENsaWVudENhY2hlID0gKHF1ZXJ5OiBzdHJpbmcsIGl0ZW1zOiB1bmtub3duW10pOiB2b2lkID0+IHtcclxuICBjbGllbnRDYWNoZS5zZXQoY2FjaGVLZXlXaXRoQ29tcGFueShxdWVyeSksIGl0ZW1zKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBnZXRDYWNoZWRDb250YWN0cyA9IChhY2NvdW50OiBzdHJpbmcpOiB1bmtub3duW10gfCBudWxsID0+IHtcclxuICBjb25zdCBjYWNoZUtleSA9IGNhY2hlS2V5V2l0aENvbXBhbnkoYWNjb3VudCk7XHJcbiAgaWYgKGNvbnRhY3RzQ2FjaGUuaGFzKGNhY2hlS2V5KSkgcmV0dXJuIGNvbnRhY3RzQ2FjaGUuZ2V0KGNhY2hlS2V5KSB8fCBudWxsO1xyXG4gIGNvbnN0IHN0b3JlID0gcmVhZFN0b3JhZ2UoQ09OVEFDVFNfU1RPUkFHRV9LRVkpO1xyXG4gIGNvbnN0IGNhY2hlZCA9IHN0b3JlW2FjY291bnRdO1xyXG4gIGlmIChBcnJheS5pc0FycmF5KGNhY2hlZCkpIHtcclxuICAgIGNvbnRhY3RzQ2FjaGUuc2V0KGNhY2hlS2V5LCBjYWNoZWQpO1xyXG4gICAgcmV0dXJuIGNhY2hlZDtcclxuICB9XHJcbiAgcmV0dXJuIG51bGw7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3Qgc2V0Q2FjaGVkQ29udGFjdHMgPSAoYWNjb3VudDogc3RyaW5nLCBpdGVtczogdW5rbm93bltdKTogdm9pZCA9PiB7XHJcbiAgY29udGFjdHNDYWNoZS5zZXQoY2FjaGVLZXlXaXRoQ29tcGFueShhY2NvdW50KSwgaXRlbXMpO1xyXG4gIGNvbnN0IHN0b3JlID0gcmVhZFN0b3JhZ2UoQ09OVEFDVFNfU1RPUkFHRV9LRVkpO1xyXG4gIHN0b3JlW2FjY291bnRdID0gaXRlbXM7XHJcbiAgd3JpdGVTdG9yYWdlKENPTlRBQ1RTX1NUT1JBR0VfS0VZLCBzdG9yZSk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0U3RvcmVkU2VsZWN0aW9uID0gKGFjY291bnQ6IHN0cmluZyk6IHVua25vd25bXSA9PiB7XHJcbiAgY29uc3Qgc3RvcmUgPSByZWFkU3RvcmFnZShDT05UQUNUU19TRUxFQ1RJT05fS0VZKTtcclxuICBjb25zdCByYXcgPSBzdG9yZVthY2NvdW50XTtcclxuICByZXR1cm4gQXJyYXkuaXNBcnJheShyYXcpID8gcmF3IDogW107XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3Qgc2V0U3RvcmVkU2VsZWN0aW9uID0gKGFjY291bnQ6IHN0cmluZywgaXRlbXM6IHVua25vd25bXSk6IHZvaWQgPT4ge1xyXG4gIGNvbnN0IHN0b3JlID0gcmVhZFN0b3JhZ2UoQ09OVEFDVFNfU0VMRUNUSU9OX0tFWSk7XHJcbiAgc3RvcmVbYWNjb3VudF0gPSBpdGVtcztcclxuICB3cml0ZVN0b3JhZ2UoQ09OVEFDVFNfU0VMRUNUSU9OX0tFWSwgc3RvcmUpO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGNsZWFyU3RvcmVkU2VsZWN0aW9uID0gKGFjY291bnQ6IHN0cmluZyk6IHZvaWQgPT4ge1xyXG4gIGNvbnN0IHN0b3JlID0gcmVhZFN0b3JhZ2UoQ09OVEFDVFNfU0VMRUNUSU9OX0tFWSk7XHJcbiAgaWYgKHN0b3JlW2FjY291bnRdKSB7XHJcbiAgICBkZWxldGUgc3RvcmVbYWNjb3VudF07XHJcbiAgICB3cml0ZVN0b3JhZ2UoQ09OVEFDVFNfU0VMRUNUSU9OX0tFWSwgc3RvcmUpO1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBjbGVhckNyZWF0ZVNlbGVjdGlvbkNhY2hlID0gKCk6IHZvaWQgPT4ge1xyXG4gIHRyeSB7XHJcbiAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKFZJU0lUX0RSQUZUX0tFWSk7XHJcbiAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKENPTlRBQ1RTX1NUT1JBR0VfS0VZKTtcclxuICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oQ09OVEFDVFNfU0VMRUNUSU9OX0tFWSk7XHJcbiAgfSBjYXRjaCB7XHJcbiAgICAvLyBpZ25vcmVcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3Qgc3RyaXBGcmVzaFBhcmFtID0gKCk6IHZvaWQgPT4ge1xyXG4gIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm47XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHVybCA9IG5ldyBVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xyXG4gICAgaWYgKCF1cmwuc2VhcmNoUGFyYW1zLmhhcyhDUkVBVEVfRlJFU0hfUEFSQU0pKSByZXR1cm47XHJcbiAgICB1cmwuc2VhcmNoUGFyYW1zLmRlbGV0ZShDUkVBVEVfRlJFU0hfUEFSQU0pO1xyXG4gICAgY29uc3QgbmV4dCA9IGAke3VybC5wYXRobmFtZX0ke3VybC5zZWFyY2h9JHt1cmwuaGFzaH1gO1xyXG4gICAgd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKHt9LCBcIlwiLCBuZXh0KTtcclxuICB9IGNhdGNoIHtcclxuICAgIC8vIGlnbm9yZVxyXG4gIH1cclxufTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbUJBQXlFOzs7QUNBbEUsSUFBTSxlQUFlLENBQUMsVUFBNEI7QUFDdkQsUUFBTSxNQUFNLE9BQU8sU0FBUyxFQUFFLEVBQUUsS0FBSyxFQUFFLFlBQVk7QUFDbkQsTUFBSSxDQUFDLElBQUssUUFBTztBQUNqQixRQUFNLGFBQWEsSUFBSSxRQUFRLGVBQWUsRUFBRTtBQUNoRCxTQUFPLGVBQWUsY0FBYyxlQUFlO0FBQ3JEO0FBRU8sSUFBTSxjQUFjLENBQUMsUUFBMEI7QUFDcEQsTUFBSSxRQUFRLFFBQVEsUUFBUSxPQUFXLFFBQU87QUFDOUMsTUFBSSxNQUFNLFFBQVEsR0FBRyxHQUFHO0FBQ3RCLFdBQU8sSUFBSSxXQUFXLEtBQUssYUFBYSxJQUFJLENBQUMsQ0FBQztBQUFBLEVBQ2hEO0FBQ0EsTUFBSSxPQUFPLFFBQVEsVUFBVTtBQUMzQixXQUFPLGFBQWEs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
