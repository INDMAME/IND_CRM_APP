import {
  handleComboboxKeyDown
} from "./chunk-6HMZLOGF.js";
import {
  ChevronDownSvg,
  ChevronUpSvg,
  FloatingList_default,
  useOutsideClick
} from "./chunk-6YXFJB4W.js";
import {
  Spinner_default,
  classNames,
  indFormat,
  indT
} from "./chunk-BYICIYT4.js";
import {
  require_jsx_runtime,
  require_react
} from "./chunk-BWM3JLWG.js";
import {
  fetchJson
} from "./chunk-IKHTGBEE.js";
import {
  __toESM
} from "./chunk-45FWCHS2.js";

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
  const resolvedLabel = label || indT("Visits_Create_SearchClient", "Search client");
  const resolvedPlaceholder = placeholder || resolvedLabel;
  const shouldShowLabel = showLabel ?? !isCompact;
  const shouldClearOnNull = clearOnNull ?? isCompact;
  const minChars = 4;
  const [query, setQuery] = (0, import_react.useState)("");
  const [options, setOptions] = (0, import_react.useState)([]);
  const [fetchedQuery, setFetchedQuery] = (0, import_react.useState)("");
  const [loading, setLoading] = (0, import_react.useState)(false);
  const [loadingMore, setLoadingMore] = (0, import_react.useState)(false);
  const [status, setStatus] = (0, import_react.useState)(indFormat("Visits_Create_MinChars", "Type at least {0} characters.", minChars));
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
      const items = (data.items || []).map(mapAccountItem).filter(Boolean);
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
      const items = (data.items || []).map(mapAccountItem).filter(Boolean);
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
  const containerClass = isCompact ? "relative w-full rounded-xl bg-white text-left focus-within:border-primary focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-white sm:text-sm" : "relative w-full cursor-default rounded-[5px] border-slate-300 bg-white text-left shadow-xs focus-within:border-primary focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-0 sm:text-sm";
  const inputClass = isCompact ? "w-full rounded-xl border border-slate-200 px-3 py-2 pr-24 text-sm sm:text-base leading-5 text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-primary focus:border-primary" : "w-full rounded-[5px] border border-slate-200 px-3 py-2 pr-24 text-sm sm:text-base leading-5 text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-primary focus:border-primary";
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
              "aria-label": indT("Visits_Create_SearchClient", "Search client"),
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
          roundedClass: "rounded-[5px]",
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvdmlzaXRhcy9DbGllbnRTZWFyY2hDb21ib2JveC50c3giLCAiLi4vLi4vcmVhY3Qvc3JjL3V0aWxzL25vRGF0YS50cyIsICIuLi8uLi9yZWFjdC9zcmMvdXRpbHMvdmlzaXRhc01hcHBpbmcudHMiLCAiLi4vLi4vcmVhY3Qvc3JjL3V0aWxzL21ha2VDYWNoZS50cyIsICIuLi8uLi9yZWFjdC9zcmMvdXRpbHMvdmlzaXRhc1N0b3JhZ2UudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgRmxvYXRpbmdMaXN0IGZyb20gXCIuLi9jb21tb25zL0Zsb2F0aW5nTGlzdC50c3hcIjtcbmltcG9ydCBTcGlubmVyIGZyb20gXCIuLi9jb21tb25zL1NwaW5uZXIudHN4XCI7XG5pbXBvcnQgeyBDaGV2cm9uRG93blN2ZywgQ2hldnJvblVwU3ZnIH0gZnJvbSBcIi4uL2NvbW1vbnMvY2hldnJvbnMudHN4XCI7XG5pbXBvcnQgeyBmZXRjaEpzb24gfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvYXBpU2VydmljZS50c1wiO1xuaW1wb3J0IHsgaGFuZGxlQ29tYm9ib3hLZXlEb3duIH0gZnJvbSBcIi4uLy4uL2hvb2tzL3VzZUNvbWJvYm94S2V5Ym9hcmQudHNcIjtcbmltcG9ydCB7IHVzZU91dHNpZGVDbGljayB9IGZyb20gXCIuLi8uLi9ob29rcy91c2VPdXRzaWRlQ2xpY2sudHNcIjtcbmltcG9ydCB7IGNsYXNzTmFtZXMgfSBmcm9tIFwiLi4vLi4vdXRpbHMvY2xhc3NOYW1lcy50c1wiO1xuaW1wb3J0IHsgaW5kRm9ybWF0LCBpbmRUIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB7IG1hcEFjY291bnRJdGVtIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Zpc2l0YXNNYXBwaW5nLnRzXCI7XG5pbXBvcnQgeyBnZXRDbGllbnRDYWNoZSwgaGFzQ2xpZW50Q2FjaGUsIHNldENsaWVudENhY2hlIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Zpc2l0YXNTdG9yYWdlLnRzXCI7XG5cbmV4cG9ydCB0eXBlIENsaWVudE9wdGlvbiA9IHtcbiAgdmFsdWU6IHN0cmluZztcbiAgdGV4dDogc3RyaW5nO1xuICBjYXJnbz86IHN0cmluZztcbiAgZW1wcmVzYT86IHN0cmluZztcbn07XG5cbnR5cGUgVmFyaWFudCA9IFwiZGVmYXVsdFwiIHwgXCJjb21wYWN0XCI7XG5cbnR5cGUgQ2xpZW50U2VhcmNoQ29tYm9ib3hQcm9wcyA9IHtcbiAgdmFsdWU6IENsaWVudE9wdGlvbiB8IG51bGw7XG4gIG9uU2VsZWN0ZWQ6ICh2YWx1ZTogQ2xpZW50T3B0aW9uIHwgbnVsbCkgPT4gdm9pZDtcbiAgbGFiZWw/OiBzdHJpbmc7XG4gIHBsYWNlaG9sZGVyPzogc3RyaW5nO1xuICB2YXJpYW50PzogVmFyaWFudDtcbiAgc2hvd0xhYmVsPzogYm9vbGVhbjtcbiAgaWRCYXNlPzogc3RyaW5nO1xuICBjbGVhck9uTnVsbD86IGJvb2xlYW47XG4gIHBvcnRhbENsYXNzTmFtZT86IHN0cmluZztcbiAgcGFuZWxDbGFzc05hbWU/OiBzdHJpbmc7XG59O1xuXG4vLyBSZXVzYWJsZSBjbGllbnQgc2VhcmNoIGNvbWJvYm94IGZvciB2aXNpdGFzIHBhZ2VzLlxuY29uc3QgQ2xpZW50U2VhcmNoQ29tYm9ib3ggPSAoe1xuICB2YWx1ZSxcbiAgb25TZWxlY3RlZCxcbiAgbGFiZWwsXG4gIHBsYWNlaG9sZGVyLFxuICB2YXJpYW50ID0gXCJkZWZhdWx0XCIsXG4gIHNob3dMYWJlbCxcbiAgaWRCYXNlLFxuICBjbGVhck9uTnVsbCxcbiAgcG9ydGFsQ2xhc3NOYW1lLFxuICBwYW5lbENsYXNzTmFtZSxcbn06IENsaWVudFNlYXJjaENvbWJvYm94UHJvcHMpID0+IHtcbiAgY29uc3QgaXNDb21wYWN0ID0gdmFyaWFudCA9PT0gXCJjb21wYWN0XCI7XG4gIGNvbnN0IHJlc29sdmVkTGFiZWwgPSBsYWJlbCB8fCBpbmRUKFwiVmlzaXRzX0NyZWF0ZV9TZWFyY2hDbGllbnRcIiwgXCJTZWFyY2ggY2xpZW50XCIpO1xuICBjb25zdCByZXNvbHZlZFBsYWNlaG9sZGVyID0gcGxhY2Vob2xkZXIgfHwgcmVzb2x2ZWRMYWJlbDtcbiAgY29uc3Qgc2hvdWxkU2hvd0xhYmVsID0gc2hvd0xhYmVsID8/ICFpc0NvbXBhY3Q7XG4gIGNvbnN0IHNob3VsZENsZWFyT25OdWxsID0gY2xlYXJPbk51bGwgPz8gaXNDb21wYWN0O1xuICBjb25zdCBtaW5DaGFycyA9IDQ7XG5cbiAgY29uc3QgW3F1ZXJ5LCBzZXRRdWVyeV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW29wdGlvbnMsIHNldE9wdGlvbnNdID0gdXNlU3RhdGU8Q2xpZW50T3B0aW9uW10+KFtdKTtcbiAgY29uc3QgW2ZldGNoZWRRdWVyeSwgc2V0RmV0Y2hlZFF1ZXJ5XSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtsb2FkaW5nTW9yZSwgc2V0TG9hZGluZ01vcmVdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbc3RhdHVzLCBzZXRTdGF0dXNdID0gdXNlU3RhdGUoaW5kRm9ybWF0KFwiVmlzaXRzX0NyZWF0ZV9NaW5DaGFyc1wiLCBcIlR5cGUgYXQgbGVhc3QgezB9IGNoYXJhY3RlcnMuXCIsIG1pbkNoYXJzKSk7XG4gIGNvbnN0IFtzZWxlY3RlZCwgc2V0U2VsZWN0ZWRdID0gdXNlU3RhdGU8Q2xpZW50T3B0aW9uIHwgbnVsbD4odmFsdWUpO1xuICBjb25zdCBbb3Blbiwgc2V0T3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtwYWdlLCBzZXRQYWdlXSA9IHVzZVN0YXRlKDEpO1xuICBjb25zdCBbaGFzTW9yZSwgc2V0SGFzTW9yZV0gPSB1c2VTdGF0ZSh0cnVlKTtcbiAgY29uc3QgW2Jsb2NraW5nLCBzZXRCbG9ja2luZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFthY3RpdmVJbmRleCwgc2V0QWN0aXZlSW5kZXhdID0gdXNlU3RhdGUoMCk7XG4gIGNvbnN0IFtzaG93Tm90Rm91bmRTdGF0ZSwgc2V0U2hvd05vdEZvdW5kU3RhdGVdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBsaXN0UmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IGNvbnRhaW5lclJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBib3hSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgYWJvcnRSZWYgPSB1c2VSZWY8QWJvcnRDb250cm9sbGVyIHwgbnVsbD4obnVsbCk7XG5cbiAgdXNlT3V0c2lkZUNsaWNrKFtjb250YWluZXJSZWYsIGxpc3RSZWZdLCAoKSA9PiB7XG4gICAgc2V0U2hvd05vdEZvdW5kU3RhdGUoZmFsc2UpO1xuICAgIHNldE9wZW4oZmFsc2UpO1xuICB9KTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghdmFsdWUpIHtcbiAgICAgIGlmIChzaG91bGRDbGVhck9uTnVsbCkge1xuICAgICAgICBzZXRTZWxlY3RlZChudWxsKTtcbiAgICAgICAgc2V0UXVlcnkoXCJcIik7XG4gICAgICAgIHNldFNob3dOb3RGb3VuZFN0YXRlKGZhbHNlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgc2V0U2VsZWN0ZWQodmFsdWUpO1xuICAgIHNldFF1ZXJ5KHZhbHVlLnRleHQgfHwgXCJcIik7XG4gICAgc2V0U2hvd05vdEZvdW5kU3RhdGUoZmFsc2UpO1xuICB9LCBbdmFsdWUsIHNob3VsZENsZWFyT25OdWxsXSk7XG5cbiAgY29uc3QgZmlsdGVyZWQgPSB1c2VNZW1vKCgpID0+IHtcbiAgICBpZiAoIXF1ZXJ5LnRyaW0oKSkgcmV0dXJuIG9wdGlvbnM7XG4gICAgY29uc3QgcSA9IHF1ZXJ5LnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICAgIGlmIChmZXRjaGVkUXVlcnkgJiYgcSAhPT0gZmV0Y2hlZFF1ZXJ5KSByZXR1cm4gb3B0aW9ucztcbiAgICBjb25zdCBtYXRjaCA9IG9wdGlvbnMuZmlsdGVyKChvKSA9PiBvLnRleHQudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhxKSk7XG4gICAgcmV0dXJuIG1hdGNoLmxlbmd0aCA+IDAgPyBtYXRjaCA6IG9wdGlvbnM7XG4gIH0sIFtvcHRpb25zLCBxdWVyeSwgZmV0Y2hlZFF1ZXJ5XSk7XG4gIGNvbnN0IHJlc29sdmVkQWN0aXZlSW5kZXggPVxuICAgIGZpbHRlcmVkLmxlbmd0aCA+IDAgPyBNYXRoLm1pbihNYXRoLm1heChhY3RpdmVJbmRleCwgMCksIGZpbHRlcmVkLmxlbmd0aCAtIDEpIDogMDtcblxuICBjb25zdCBjYW5jZWxQZW5kaW5nID0gKCkgPT4ge1xuICAgIGlmIChhYm9ydFJlZi5jdXJyZW50KSB7XG4gICAgICBhYm9ydFJlZi5jdXJyZW50LmFib3J0KCk7XG4gICAgICBhYm9ydFJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICB9XG4gIH07XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgaWYgKGFib3J0UmVmLmN1cnJlbnQpIHtcbiAgICAgICAgYWJvcnRSZWYuY3VycmVudC5hYm9ydCgpO1xuICAgICAgICBhYm9ydFJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9O1xuICB9LCBbXSk7XG5cbiAgY29uc3Qgc2VhcmNoID0gYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IGN1cnJlbnRRdWVyeSA9IHF1ZXJ5LnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICAgIGlmIChjdXJyZW50UXVlcnkubGVuZ3RoIDwgbWluQ2hhcnMpIHtcbiAgICAgIHNldFNob3dOb3RGb3VuZFN0YXRlKGZhbHNlKTtcbiAgICAgIHNldFN0YXR1cyhpbmRGb3JtYXQoXCJWaXNpdHNfQ3JlYXRlX01pbkNoYXJzXCIsIFwiVHlwZSBhdCBsZWFzdCB7MH0gY2hhcmFjdGVycy5cIiwgbWluQ2hhcnMpKTtcbiAgICAgIHNldE9wdGlvbnMoW10pO1xuICAgICAgc2V0SGFzTW9yZShmYWxzZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNhbmNlbFBlbmRpbmcoKTtcbiAgICBzZXRQYWdlKDEpO1xuICAgIHNldEhhc01vcmUodHJ1ZSk7XG4gICAgc2V0T3BlbihmYWxzZSk7XG4gICAgY29uc3QgY2FjaGVLZXkgPSBxdWVyeS50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgICBpZiAoaGFzQ2xpZW50Q2FjaGUoY2FjaGVLZXkpKSB7XG4gICAgICBjb25zdCBjYWNoZWQgPSAoZ2V0Q2xpZW50Q2FjaGUoY2FjaGVLZXkpIHx8IFtdKSBhcyBDbGllbnRPcHRpb25bXTtcbiAgICAgIHNldEFjdGl2ZUluZGV4KDApO1xuICAgICAgc2V0RmV0Y2hlZFF1ZXJ5KGN1cnJlbnRRdWVyeSk7XG4gICAgICBzZXRPcHRpb25zKGNhY2hlZCk7XG4gICAgICBpZiAoY2FjaGVkLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgc2V0U2VsZWN0ZWQobnVsbCk7XG4gICAgICAgIHNldFF1ZXJ5KFwiXCIpO1xuICAgICAgICBzZXRTaG93Tm90Rm91bmRTdGF0ZSh0cnVlKTtcbiAgICAgICAgb25TZWxlY3RlZChudWxsKTtcbiAgICAgICAgc2V0U3RhdHVzKGluZFQoXCJDb21tb25fTm90Rm91bmRcIiwgXCJOb3QgZm91bmRcIikpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2V0U2hvd05vdEZvdW5kU3RhdGUoZmFsc2UpO1xuICAgICAgICBzZXRTdGF0dXMoaW5kRm9ybWF0KFwiVmlzaXRzX0NyZWF0ZV9DbGllbnRDb3VudENhY2hlXCIsIFwiezB9IGNsaWVudHMgKGNhY2hlKVwiLCBjYWNoZWQubGVuZ3RoKSk7XG4gICAgICB9XG4gICAgICBzZXRIYXNNb3JlKGNhY2hlZC5sZW5ndGggPT09IDEwKTtcbiAgICAgIHNldE9wZW4odHJ1ZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHNldExvYWRpbmcodHJ1ZSk7XG4gICAgc2V0QmxvY2tpbmcodHJ1ZSk7XG4gICAgc2V0U3RhdHVzKGluZFQoXCJWaXNpdHNfQ3JlYXRlX1NlYXJjaGluZ1wiLCBcIlNlYXJjaGluZy4uLlwiKSk7XG4gICAgY29uc3QgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcbiAgICBhYm9ydFJlZi5jdXJyZW50ID0gY29udHJvbGxlcjtcbiAgICBsZXQgc2hvdWxkT3Blbk9uRmluaXNoID0gZmFsc2U7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHVybCA9IGAvVmlzaXRhcy9HZXRBY2NvdW50c0ZvckRyb3Bkb3duP3Rlcm09JHtlbmNvZGVVUklDb21wb25lbnQocXVlcnkpfSZwYWdlPTEmcGFnZVNpemU9MTBgO1xuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IGZldGNoSnNvbjx7IGl0ZW1zPzogdW5rbm93bltdIH0+KHVybCwgeyBzaWduYWw6IGNvbnRyb2xsZXIuc2lnbmFsIH0pO1xuICAgICAgY29uc3QgaXRlbXMgPSAoZGF0YS5pdGVtcyB8fCBbXSkubWFwKG1hcEFjY291bnRJdGVtKS5maWx0ZXIoQm9vbGVhbikgYXMgQ2xpZW50T3B0aW9uW107XG4gICAgICBzZXRBY3RpdmVJbmRleCgwKTtcbiAgICAgIHNldEZldGNoZWRRdWVyeShjdXJyZW50UXVlcnkpO1xuICAgICAgc2V0Q2xpZW50Q2FjaGUoY2FjaGVLZXksIGl0ZW1zKTtcbiAgICAgIHNldE9wdGlvbnMoaXRlbXMpO1xuICAgICAgaWYgKGl0ZW1zLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgc2V0U2VsZWN0ZWQobnVsbCk7XG4gICAgICAgIHNldFF1ZXJ5KFwiXCIpO1xuICAgICAgICBzZXRTaG93Tm90Rm91bmRTdGF0ZSh0cnVlKTtcbiAgICAgICAgb25TZWxlY3RlZChudWxsKTtcbiAgICAgICAgc2V0U3RhdHVzKGluZFQoXCJDb21tb25fTm90Rm91bmRcIiwgXCJOb3QgZm91bmRcIikpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2V0U2hvd05vdEZvdW5kU3RhdGUoZmFsc2UpO1xuICAgICAgICBzZXRTdGF0dXMoaW5kRm9ybWF0KFwiVmlzaXRzX0NyZWF0ZV9DbGllbnRDb3VudFwiLCBcInswfSBjbGllbnRzXCIsIGl0ZW1zLmxlbmd0aCkpO1xuICAgICAgfVxuICAgICAgc2V0SGFzTW9yZShpdGVtcy5sZW5ndGggPT09IDEwKTtcbiAgICAgIHNob3VsZE9wZW5PbkZpbmlzaCA9IHRydWU7XG4gICAgfSBjYXRjaCAoZXJyOiBhbnkpIHtcbiAgICAgIGlmIChlcnI/Lm5hbWUgPT09IFwiQWJvcnRFcnJvclwiKSB7XG4gICAgICAgIHNldFN0YXR1cyhpbmRUKFwiVmlzaXRzX0NyZWF0ZV9TZWFyY2hDYW5jZWxlZFwiLCBcIlNlYXJjaCBjYW5jZWxlZC5cIikpO1xuICAgICAgfSBlbHNlIGlmIChTdHJpbmcoZXJyPy5tZXNzYWdlIHx8IFwiXCIpLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoXCJ0aW1lb3V0XCIpKSB7XG4gICAgICAgIHNldFN0YXR1cyhpbmRUKFwiVmlzaXRzX0NyZWF0ZV9TZWFyY2hUaW1lb3V0XCIsIFwiVGhlIHNlYXJjaCB0b29rIHRvbyBsb25nLiBUeXBlIG1vcmUgY2hhcmFjdGVycyB0byBuYXJyb3cgZG93bi5cIikpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2V0U3RhdHVzKGluZFQoXCJWaXNpdHNfQ3JlYXRlX0xvYWRDbGllbnRzRXJyb3JcIiwgXCJGYWlsZWQgdG8gbG9hZCBjbGllbnRzLlwiKSk7XG4gICAgICB9XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGFib3J0UmVmLmN1cnJlbnQgPSBudWxsO1xuICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICBzZXRCbG9ja2luZyhmYWxzZSk7XG4gICAgICBpZiAoc2hvdWxkT3Blbk9uRmluaXNoKSBzZXRPcGVuKHRydWUpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBsb2FkTW9yZSA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcbiAgICBpZiAobG9hZGluZ01vcmUgfHwgbG9hZGluZyB8fCAhaGFzTW9yZSB8fCBxdWVyeS50cmltKCkubGVuZ3RoIDwgbWluQ2hhcnMpIHJldHVybjtcbiAgICBzZXRMb2FkaW5nTW9yZSh0cnVlKTtcbiAgICBzZXRCbG9ja2luZyh0cnVlKTtcbiAgICBjb25zdCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuICAgIGFib3J0UmVmLmN1cnJlbnQgPSBjb250cm9sbGVyO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBuZXh0UGFnZSA9IHBhZ2UgKyAxO1xuICAgICAgY29uc3QgdXJsID0gYC9WaXNpdGFzL0dldEFjY291bnRzRm9yRHJvcGRvd24/dGVybT0ke2VuY29kZVVSSUNvbXBvbmVudChxdWVyeSl9JnBhZ2U9JHtuZXh0UGFnZX0mcGFnZVNpemU9MTBgO1xuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IGZldGNoSnNvbjx7IGl0ZW1zPzogdW5rbm93bltdIH0+KHVybCwgeyBzaWduYWw6IGNvbnRyb2xsZXIuc2lnbmFsIH0pO1xuICAgICAgY29uc3QgaXRlbXMgPSAoZGF0YS5pdGVtcyB8fCBbXSkubWFwKG1hcEFjY291bnRJdGVtKS5maWx0ZXIoQm9vbGVhbikgYXMgQ2xpZW50T3B0aW9uW107XG4gICAgICBzZXRPcHRpb25zKChwcmV2KSA9PiBbLi4ucHJldiwgLi4uaXRlbXNdKTtcbiAgICAgIHNldFBhZ2UobmV4dFBhZ2UpO1xuICAgICAgc2V0SGFzTW9yZShpdGVtcy5sZW5ndGggPT09IDEwKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgYWJvcnRSZWYuY3VycmVudCA9IG51bGw7XG4gICAgICBzZXRMb2FkaW5nTW9yZShmYWxzZSk7XG4gICAgICBzZXRCbG9ja2luZyhmYWxzZSk7XG4gICAgfVxuICB9LCBbbG9hZGluZ01vcmUsIGxvYWRpbmcsIGhhc01vcmUsIHF1ZXJ5LCBwYWdlLCBtaW5DaGFyc10pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFvcGVuIHx8ICFsaXN0UmVmLmN1cnJlbnQpIHJldHVybjtcbiAgICBjb25zdCBlbCA9IGxpc3RSZWYuY3VycmVudDtcbiAgICBjb25zdCBvblNjcm9sbCA9ICgpID0+IHtcbiAgICAgIGlmIChlbC5zY3JvbGxUb3AgKyBlbC5jbGllbnRIZWlnaHQgPj0gZWwuc2Nyb2xsSGVpZ2h0IC0gOCkgbG9hZE1vcmUoKTtcbiAgICB9O1xuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgb25TY3JvbGwsIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcbiAgICByZXR1cm4gKCkgPT4gZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBvblNjcm9sbCk7XG4gIH0sIFtvcGVuLCBsb2FkTW9yZV0pO1xuXG4gIGNvbnN0IHNlbGVjdE9wdGlvbiA9IChvcHQ6IENsaWVudE9wdGlvbikgPT4ge1xuICAgIHNldFNlbGVjdGVkKG9wdCk7XG4gICAgc2V0UXVlcnkob3B0LnRleHQpO1xuICAgIHNldFNob3dOb3RGb3VuZFN0YXRlKGZhbHNlKTtcbiAgICBzZXRPcGVuKGZhbHNlKTtcbiAgICBvblNlbGVjdGVkKG9wdCk7XG4gIH07XG5cbiAgY29uc3QgcmVxdWVzdFNlYXJjaE9yT3BlbiA9ICgpID0+IHtcbiAgICBpZiAobG9hZGluZyB8fCBibG9ja2luZykgcmV0dXJuO1xuICAgIGNvbnN0IHRyaW1tZWQgPSBxdWVyeS50cmltKCk7XG4gICAgaWYgKHRyaW1tZWQubGVuZ3RoIDwgbWluQ2hhcnMpIHtcbiAgICAgIGNhbmNlbFBlbmRpbmcoKTtcbiAgICAgIHNldFNob3dOb3RGb3VuZFN0YXRlKGZhbHNlKTtcbiAgICAgIHNldE9wdGlvbnMoW10pO1xuICAgICAgc2V0SGFzTW9yZShmYWxzZSk7XG4gICAgICBzZXRTdGF0dXMoaW5kRm9ybWF0KFwiVmlzaXRzX0NyZWF0ZV9NaW5DaGFyc1wiLCBcIlR5cGUgYXQgbGVhc3QgezB9IGNoYXJhY3RlcnMuXCIsIG1pbkNoYXJzKSk7XG4gICAgICBzZXRPcGVuKHRydWUpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHFLZXkgPSB0cmltbWVkLnRvTG93ZXJDYXNlKCk7XG4gICAgY29uc3QgaXNTZWxlY3Rpb25EaXNwbGF5ID0gISFzZWxlY3RlZCAmJiBxdWVyeSA9PT0gKHNlbGVjdGVkLnRleHQgfHwgXCJcIik7XG4gICAgY29uc3Qgc2hvdWxkU2VhcmNoID0gIWlzU2VsZWN0aW9uRGlzcGxheSAmJiBxS2V5ICE9PSBmZXRjaGVkUXVlcnk7XG5cbiAgICBpZiAoc2hvdWxkU2VhcmNoKSB7XG4gICAgICBzZWFyY2goKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzZXRPcGVuKHRydWUpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUtleURvd24gPSAoZXY6IFJlYWN0LktleWJvYXJkRXZlbnQ8SFRNTElucHV0RWxlbWVudD4pID0+IHtcbiAgICBoYW5kbGVDb21ib2JveEtleURvd24oZXYsIHtcbiAgICAgIGlzT3Blbjogb3BlbixcbiAgICAgIHNldE9wZW4sXG4gICAgICBvcHRpb25Db3VudDogZmlsdGVyZWQubGVuZ3RoLFxuICAgICAgc2V0QWN0aXZlSW5kZXgsXG4gICAgICByZXF1aXJlT3BlbkZvckFycm93czogdHJ1ZSxcbiAgICAgIG9uRW50ZXJXaGVuT3BlbjogKCkgPT4ge1xuICAgICAgICBpZiAoZmlsdGVyZWQubGVuZ3RoIDwgMSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzZWxlY3RPcHRpb24oZmlsdGVyZWRbcmVzb2x2ZWRBY3RpdmVJbmRleF0gPz8gZmlsdGVyZWRbMF0pO1xuICAgICAgfSxcbiAgICAgIG9uRW50ZXJXaGVuQ2xvc2VkOiByZXF1ZXN0U2VhcmNoT3JPcGVuLFxuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IHF1ZXJ5S2V5ID0gcXVlcnkudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG4gIGNvbnN0IGlzU2VsZWN0aW9uRGlzcGxheSA9ICEhc2VsZWN0ZWQgJiYgcXVlcnkgPT09IChzZWxlY3RlZC50ZXh0IHx8IFwiXCIpO1xuICBjb25zdCBzaG93U2VhcmNoSWNvbiA9XG4gICAgIWxvYWRpbmcgJiYgIWJsb2NraW5nICYmICFpc1NlbGVjdGlvbkRpc3BsYXkgJiYgcXVlcnlLZXkubGVuZ3RoID49IG1pbkNoYXJzICYmIChmZXRjaGVkUXVlcnkgPT09IFwiXCIgfHwgcXVlcnlLZXkgIT09IGZldGNoZWRRdWVyeSk7XG5cbiAgY29uc3Qgd3JhcHBlckNsYXNzID0gaXNDb21wYWN0ID8gXCJzcGFjZS15LTEgaGlzdG9yeS1jbGllbnQtY29tYm9ib3hcIiA6IFwic3BhY2UteS0yXCI7XG4gIGNvbnN0IGxhYmVsQ2xhc3MgPSBcImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZFwiO1xuICBjb25zdCBjb250YWluZXJDbGFzcyA9IGlzQ29tcGFjdFxuICAgID8gXCJyZWxhdGl2ZSB3LWZ1bGwgcm91bmRlZC14bCBiZy13aGl0ZSB0ZXh0LWxlZnQgZm9jdXMtd2l0aGluOmJvcmRlci1wcmltYXJ5IGZvY3VzLXdpdGhpbjpyaW5nLTIgZm9jdXMtd2l0aGluOnJpbmctcHJpbWFyeSBmb2N1cy13aXRoaW46cmluZy1vZmZzZXQtd2hpdGUgc206dGV4dC1zbVwiXG4gICAgOiBcInJlbGF0aXZlIHctZnVsbCBjdXJzb3ItZGVmYXVsdCByb3VuZGVkLVs1cHhdIGJvcmRlci1zbGF0ZS0zMDAgYmctd2hpdGUgdGV4dC1sZWZ0IHNoYWRvdy14cyBmb2N1cy13aXRoaW46Ym9yZGVyLXByaW1hcnkgZm9jdXMtd2l0aGluOnJpbmctMiBmb2N1cy13aXRoaW46cmluZy1wcmltYXJ5IGZvY3VzLXdpdGhpbjpyaW5nLW9mZnNldC0wIHNtOnRleHQtc21cIjtcbiAgY29uc3QgaW5wdXRDbGFzcyA9IGlzQ29tcGFjdFxuICAgID8gXCJ3LWZ1bGwgcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBweC0zIHB5LTIgcHItMjQgdGV4dC1zbSBzbTp0ZXh0LWJhc2UgbGVhZGluZy01IHRleHQtc2xhdGUtOTAwIHBsYWNlaG9sZGVyOnRleHQtc2xhdGUtNDAwIGZvY3VzOm91dGxpbmUtaGlkZGVuIGZvY3VzOnJpbmctMiBmb2N1czpyaW5nLXByaW1hcnkgZm9jdXM6Ym9yZGVyLXByaW1hcnlcIlxuICAgIDogXCJ3LWZ1bGwgcm91bmRlZC1bNXB4XSBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBweC0zIHB5LTIgcHItMjQgdGV4dC1zbSBzbTp0ZXh0LWJhc2UgbGVhZGluZy01IHRleHQtc2xhdGUtOTAwIHBsYWNlaG9sZGVyOnRleHQtc2xhdGUtNDAwIGZvY3VzOm91dGxpbmUtaGlkZGVuIGZvY3VzOnJpbmctMiBmb2N1czpyaW5nLXByaW1hcnkgZm9jdXM6Ym9yZGVyLXByaW1hcnlcIjtcbiAgY29uc3QgZW1wdHlUZXh0Q2xhc3MgPSBpc0NvbXBhY3QgPyBcInB4LTQgcHktMiB0ZXh0LXNtIHRleHQtc2xhdGUtNTAwXCIgOiBcInB4LTQgcHktMiB0ZXh0LXNtIHRleHQtc2xhdGUtNTAwXCI7XG4gIGNvbnN0IG9wdGlvbkNsYXNzID0gaXNDb21wYWN0XG4gICAgPyBcInJlbGF0aXZlIGZsZXggdy1mdWxsIGN1cnNvci1kZWZhdWx0IHNlbGVjdC1ub25lIGl0ZW1zLXN0YXJ0IHB5LTIgcHgtMyB0ZXh0LWxlZnQgdGV4dC1zbVwiXG4gICAgOiBcInJlbGF0aXZlIGZsZXggdy1mdWxsIGN1cnNvci1kZWZhdWx0IHNlbGVjdC1ub25lIGl0ZW1zLXN0YXJ0IHB5LTIgcHgtMyB0ZXh0LWxlZnQgdGV4dC1zbVwiO1xuICBjb25zdCBvcHRpb25UZXh0Q2xhc3MgPSBpc0NvbXBhY3QgPyBcImJsb2NrIHRydW5jYXRlIHVwcGVyY2FzZSB0ZXh0LVsxM3B4XVwiIDogXCJibG9jayB0cnVuY2F0ZSB1cHBlcmNhc2UgdGV4dC1bMTNweF1cIjtcbiAgY29uc3Qgb3B0aW9uU3ViVGV4dENsYXNzID0gaXNDb21wYWN0ID8gXCJibG9jayB0cnVuY2F0ZSB1cHBlcmNhc2UgdGV4dC1bMTFweF0gdGV4dC1zbGF0ZS02MDBcIiA6IFwiYmxvY2sgdHJ1bmNhdGUgdXBwZXJjYXNlIHRleHQtWzExcHhdIHRleHQtc2xhdGUtNjAwXCI7XG4gIGNvbnN0IG9wdGlvblN1YlRleHRTZWNvbmRhcnlDbGFzcyA9IGlzQ29tcGFjdFxuICAgID8gXCJibG9jayB0cnVuY2F0ZSB1cHBlcmNhc2UgdGV4dC1bMTFweF0gdGV4dC1zbGF0ZS01MDBcIlxuICAgIDogXCJibG9jayB0cnVuY2F0ZSB1cHBlcmNhc2UgdGV4dC1bMTFweF0gdGV4dC1zbGF0ZS01MDBcIjtcbiAgY29uc3Qgc3RhdHVzQ2xhc3MgPSBpc0NvbXBhY3QgPyBcInRleHQteHMgdGV4dC1zbGF0ZS01MDAgdGVjaC1pbmZvXCIgOiBcInRleHQteHMgdGV4dC1zbGF0ZS01MDAgdGVjaC1pbmZvXCI7XG4gIGNvbnN0IHNlYXJjaEljb25TaXplID0gaXNDb21wYWN0ID8gXCJoLTUgdy01XCIgOiBcImgtNSB3LTVcIjtcbiAgY29uc3QgY2hldnJvbkljb25TaXplID0gaXNDb21wYWN0ID8gXCJoLTUgdy01XCIgOiBcImgtNSB3LTVcIjtcblxuICBjb25zdCBzYWZlSWRCYXNlID0gaWRCYXNlIHx8IChpc0NvbXBhY3QgPyBcImhpc3RvcnktY2xpZW50XCIgOiBcImNsaWVudFwiKTtcbiAgY29uc3QgbGlzdElkID0gYCR7c2FmZUlkQmFzZX0tb3B0aW9uc2A7XG4gIGNvbnN0IGFjdGl2ZUlkID1cbiAgICBvcGVuICYmIGZpbHRlcmVkW3Jlc29sdmVkQWN0aXZlSW5kZXhdXG4gICAgICA/IGAke3NhZmVJZEJhc2V9LW9wdC0ke2ZpbHRlcmVkW3Jlc29sdmVkQWN0aXZlSW5kZXhdLnZhbHVlfWBcbiAgICAgIDogdW5kZWZpbmVkO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e3dyYXBwZXJDbGFzc30gcmVmPXtjb250YWluZXJSZWZ9PlxuICAgICAge3Nob3VsZFNob3dMYWJlbCAmJiA8bGFiZWwgY2xhc3NOYW1lPXtsYWJlbENsYXNzfT57cmVzb2x2ZWRMYWJlbH08L2xhYmVsPn1cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmVcIj5cbiAgICAgICAgPGRpdiByZWY9e2JveFJlZn0gY2xhc3NOYW1lPXtjb250YWluZXJDbGFzc30+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICBjbGFzc05hbWU9e2lucHV0Q2xhc3N9XG4gICAgICAgICAgICB2YWx1ZT17cXVlcnl9XG4gICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHZhbCA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICAgICAgICAgICAgc2V0QWN0aXZlSW5kZXgoMCk7XG4gICAgICAgICAgICAgIHNldFF1ZXJ5KHZhbCk7XG4gICAgICAgICAgICAgIHNldFNob3dOb3RGb3VuZFN0YXRlKGZhbHNlKTtcbiAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkICYmIHZhbCAhPT0gKHNlbGVjdGVkLnRleHQgfHwgXCJcIikpIHtcbiAgICAgICAgICAgICAgICBzZXRTZWxlY3RlZChudWxsKTtcbiAgICAgICAgICAgICAgICBvblNlbGVjdGVkPy4obnVsbCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgY2FuY2VsUGVuZGluZygpO1xuICAgICAgICAgICAgICBzZXRGZXRjaGVkUXVlcnkoXCJcIik7XG4gICAgICAgICAgICAgIHNldE9wdGlvbnMoW10pO1xuICAgICAgICAgICAgICBzZXRIYXNNb3JlKGZhbHNlKTtcbiAgICAgICAgICAgICAgc2V0U3RhdHVzKFxuICAgICAgICAgICAgICAgIHZhbC50cmltKCkubGVuZ3RoIDwgbWluQ2hhcnNcbiAgICAgICAgICAgICAgICAgID8gaW5kRm9ybWF0KFwiVmlzaXRzX0NyZWF0ZV9NaW5DaGFyc1wiLCBcIlR5cGUgYXQgbGVhc3QgezB9IGNoYXJhY3RlcnMuXCIsIG1pbkNoYXJzKVxuICAgICAgICAgICAgICAgICAgOiBpbmRUKFwiVmlzaXRzX0NyZWF0ZV9QcmVzc1NlYXJjaEhpbnRcIiwgXCJQcmVzcyBzZWFyY2gsIEVudGVyIG9yIEFycm93RG93biB0byBzZWFyY2guXCIpXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIHNldE9wZW4oZmFsc2UpO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIG9uS2V5RG93bj17aGFuZGxlS2V5RG93bn1cbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtyZXNvbHZlZFBsYWNlaG9sZGVyfVxuICAgICAgICAgICAgYXJpYS1sYWJlbD17cmVzb2x2ZWRMYWJlbH1cbiAgICAgICAgICAgIHJlYWRPbmx5PXtsb2FkaW5nIHx8IGJsb2NraW5nfVxuICAgICAgICAgICAgYXJpYS1idXN5PXtsb2FkaW5nIHx8IGJsb2NraW5nfVxuICAgICAgICAgICAgcm9sZT1cImNvbWJvYm94XCJcbiAgICAgICAgICAgIGFyaWEtZXhwYW5kZWQ9e29wZW59XG4gICAgICAgICAgICBhcmlhLWNvbnRyb2xzPXtsaXN0SWR9XG4gICAgICAgICAgICBhcmlhLWFjdGl2ZWRlc2NlbmRhbnQ9e2FjdGl2ZUlkfVxuICAgICAgICAgIC8+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LXktMCByaWdodC0wIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHByLTJcIj5cbiAgICAgICAgICAgIHsobG9hZGluZyB8fCBibG9ja2luZykgJiYgKFxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBweC0yXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XG4gICAgICAgICAgICAgICAge2lzQ29tcGFjdCA/IDxTcGlubmVyIHNpemU9XCJoLTQgdy00XCIgLz4gOiA8U3Bpbm5lciAvPn1cbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAge3Nob3dTZWFyY2hJY29uICYmIChcbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHAtMS41IHRleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtc2xhdGUtNTAwXCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXtyZXF1ZXN0U2VhcmNoT3JPcGVufVxuICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2luZFQoXCJWaXNpdHNfQ3JlYXRlX1NlYXJjaENsaWVudFwiLCBcIlNlYXJjaCBjbGllbnRcIil9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBmaWxsPVwibm9uZVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBzdHJva2VXaWR0aD17MS41fSBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBjbGFzc05hbWU9e3NlYXJjaEljb25TaXplfT5cbiAgICAgICAgICAgICAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwibTE1Ljc1IDE1Ljc1LTIuNDg5LTIuNDg5bTAgMGEzLjM3NSAzLjM3NSAwIDEgMC00Ljc3My00Ljc3MyAzLjM3NSAzLjM3NSAwIDAgMCA0Ljc3NCA0Ljc3NFpNMjEgMTJhOSA5IDAgMSAxLTE4IDAgOSA5IDAgMCAxIDE4IDBaXCIgLz5cbiAgICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICApfVxuXG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBwLTEuNSB0ZXh0LXNsYXRlLTUwMCBob3Zlcjp0ZXh0LXNsYXRlLTYwMFwiXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAobG9hZGluZyB8fCBibG9ja2luZykgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGlmIChvcGVuKSB7XG4gICAgICAgICAgICAgICAgICBzZXRPcGVuKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmVxdWVzdFNlYXJjaE9yT3BlbigpO1xuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICBkaXNhYmxlZD17bG9hZGluZyB8fCBibG9ja2luZ31cbiAgICAgICAgICAgICAgYXJpYS1sYWJlbD17XG4gICAgICAgICAgICAgICAgb3BlblxuICAgICAgICAgICAgICAgICAgPyBpbmRUKFwiVmlzaXRzX0NyZWF0ZV9IaWRlQ2xpZW50T3B0aW9uc1wiLCBcIkhpZGUgY2xpZW50IG9wdGlvbnNcIilcbiAgICAgICAgICAgICAgICAgIDogaW5kVChcIlZpc2l0c19DcmVhdGVfU2hvd0NsaWVudE9wdGlvbnNcIiwgXCJTaG93IGNsaWVudCBvcHRpb25zXCIpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge29wZW4gPyA8Q2hldnJvblVwU3ZnIGNsYXNzTmFtZT17Y2hldnJvbkljb25TaXplfSAvPiA6IDxDaGV2cm9uRG93blN2ZyBjbGFzc05hbWU9e2NoZXZyb25JY29uU2l6ZX0gLz59XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8RmxvYXRpbmdMaXN0XG4gICAgICAgIGFuY2hvclJlZj17Ym94UmVmfVxuICAgICAgICBvcGVuPXtvcGVufVxuICAgICAgICB6SW5kZXg9ezQwMDAwMH1cbiAgICAgICAgbWF4SGVpZ2h0Q2xhc3M9XCJtYXgtaC03MlwiXG4gICAgICAgIHJvbGU9XCJsaXN0Ym94XCJcbiAgICAgICAgcm91bmRlZENsYXNzPVwicm91bmRlZC1bNXB4XVwiXG4gICAgICAgIHBvcnRhbENsYXNzTmFtZT17cG9ydGFsQ2xhc3NOYW1lfVxuICAgICAgICBwYW5lbENsYXNzTmFtZT17cGFuZWxDbGFzc05hbWV9XG4gICAgICA+XG4gICAgICAgICAgPGRpdiByZWY9e2xpc3RSZWZ9IGlkPXtsaXN0SWR9PlxuICAgICAgICAgICAge29wdGlvbnMubGVuZ3RoID09PSAwICYmIChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2VtcHR5VGV4dENsYXNzfT5cbiAgICAgICAgICAgICAgICB7c2hvd05vdEZvdW5kU3RhdGVcbiAgICAgICAgICAgICAgICAgID8gaW5kVChcIkNvbW1vbl9Ob3RGb3VuZFwiLCBcIk5vdCBmb3VuZFwiKVxuICAgICAgICAgICAgICAgICAgOiBxdWVyeS50cmltKCkubGVuZ3RoIDwgbWluQ2hhcnNcbiAgICAgICAgICAgICAgICAgID8gaW5kRm9ybWF0KFwiVmlzaXRzX0NyZWF0ZV9NaW5DaGFyc1wiLCBcIlR5cGUgYXQgbGVhc3QgezB9IGNoYXJhY3RlcnMuXCIsIG1pbkNoYXJzKVxuICAgICAgICAgICAgICAgICAgOiBpbmRUKFwiVmlzaXRzX0NyZWF0ZV9Ob1Jlc3VsdHNcIiwgXCJObyByZXN1bHRzXCIpfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICB7IWxvYWRpbmcgJiYgb3B0aW9ucy5sZW5ndGggPiAwICYmIGZpbHRlcmVkLmxlbmd0aCA9PT0gMCAmJiAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtlbXB0eVRleHRDbGFzc30+e2luZFQoXCJWaXNpdHNfQ3JlYXRlX05vTWF0Y2hlc1wiLCBcIk5vIG1hdGNoZXNcIil9PC9kaXY+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgeyFsb2FkaW5nICYmXG4gICAgICAgICAgICAgIGZpbHRlcmVkLm1hcCgob3B0LCBpZHgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBpc0FjdGl2ZSA9IGlkeCA9PT0gcmVzb2x2ZWRBY3RpdmVJbmRleDtcbiAgICAgICAgICAgICAgICBjb25zdCBzZWwgPSBzZWxlY3RlZD8udmFsdWUgPT09IG9wdC52YWx1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAga2V5PXtvcHQudmFsdWV9XG4gICAgICAgICAgICAgICAgICAgIGlkPXtgJHtzYWZlSWRCYXNlfS1vcHQtJHtvcHQudmFsdWV9YH1cbiAgICAgICAgICAgICAgICAgICAgcm9sZT1cIm9wdGlvblwiXG4gICAgICAgICAgICAgICAgICAgIGFyaWEtc2VsZWN0ZWQ9e3NlbH1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbkNsYXNzLFxuICAgICAgICAgICAgICAgICAgICAgIGlzQWN0aXZlID8gXCJiZy1wcmltYXJ5IHRleHQtd2hpdGVcIiA6IHNlbCA/IFwiYmctcHJpbWFyeS8xMCB0ZXh0LXByaW1hcnlcIiA6IGlzQ29tcGFjdCA/IFwidGV4dC1zbGF0ZS03MDBcIiA6IFwidGV4dC1zbGF0ZS05MDBcIlxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICBvbk1vdXNlRW50ZXI9eygpID0+IHNldEFjdGl2ZUluZGV4KGlkeCl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNlbGVjdE9wdGlvbihvcHQpfVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgc3BhY2UteS0wLjVcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2NsYXNzTmFtZXMob3B0aW9uVGV4dENsYXNzLCBzZWwgPyBcImZvbnQtc2VtaWJvbGRcIiA6IFwiZm9udC1ub3JtYWxcIil9PlxuICAgICAgICAgICAgICAgICAgICAgICAge29wdC50ZXh0fVxuICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICB7aXNDb21wYWN0ID8gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAge29wdC5jYXJnbyAmJiA8c3BhbiBjbGFzc05hbWU9e29wdGlvblN1YlRleHRDbGFzc30+e29wdC5jYXJnb308L3NwYW4+fVxuICAgICAgICAgICAgICAgICAgICAgICAgICB7b3B0LmVtcHJlc2EgJiYgPHNwYW4gY2xhc3NOYW1lPXtvcHRpb25TdWJUZXh0U2Vjb25kYXJ5Q2xhc3N9PntvcHQuZW1wcmVzYX08L3NwYW4+fVxuICAgICAgICAgICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17b3B0aW9uU3ViVGV4dENsYXNzfT57b3B0LmNhcmdvIHx8IFwiXCJ9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e29wdGlvblN1YlRleHRTZWNvbmRhcnlDbGFzc30+e29wdC5lbXByZXNhIHx8IFwiXCJ9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9GbG9hdGluZ0xpc3Q+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsIGZsZXgganVzdGlmeS1lbmRcIj5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtzdGF0dXNDbGFzc30+e3N0YXR1c308L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENsaWVudFNlYXJjaENvbWJvYm94O1xuIiwgImV4cG9ydCBjb25zdCBpc05vRGF0YVRleHQgPSAodmFsdWU6IHVua25vd24pOiBib29sZWFuID0+IHtcbiAgY29uc3QgcmF3ID0gU3RyaW5nKHZhbHVlIHx8IFwiXCIpLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICBpZiAoIXJhdykgcmV0dXJuIGZhbHNlO1xuICBjb25zdCBub3JtYWxpemVkID0gcmF3LnJlcGxhY2UoL1teYS16MC05XSsvZywgXCJcIik7XG4gIHJldHVybiBub3JtYWxpemVkID09PSBcInNpbmRhdG9zXCIgfHwgbm9ybWFsaXplZCA9PT0gXCJub2RhdGFcIjtcbn07XG5cbmV4cG9ydCBjb25zdCBpc05vRGF0YVJvdyA9IChyb3c6IHVua25vd24pOiBib29sZWFuID0+IHtcbiAgaWYgKHJvdyA9PT0gbnVsbCB8fCByb3cgPT09IHVuZGVmaW5lZCkgcmV0dXJuIHRydWU7XG4gIGlmIChBcnJheS5pc0FycmF5KHJvdykpIHtcbiAgICByZXR1cm4gcm93Lmxlbmd0aCA9PT0gMSAmJiBpc05vRGF0YVRleHQocm93WzBdKTtcbiAgfVxuICBpZiAodHlwZW9mIHJvdyA9PT0gXCJzdHJpbmdcIikge1xuICAgIHJldHVybiBpc05vRGF0YVRleHQocm93KTtcbiAgfVxuICBpZiAodHlwZW9mIHJvdyA9PT0gXCJvYmplY3RcIikge1xuICAgIGNvbnN0IHZhbHVlcyA9IE9iamVjdC52YWx1ZXMocm93IGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+KTtcbiAgICBpZiAoIXZhbHVlcy5sZW5ndGgpIHJldHVybiB0cnVlO1xuICAgIHJldHVybiB2YWx1ZXMuc29tZSgodikgPT4gdHlwZW9mIHYgPT09IFwic3RyaW5nXCIgJiYgaXNOb0RhdGFUZXh0KHYpKTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59O1xuIiwgImltcG9ydCB7IGlzTm9EYXRhUm93LCBpc05vRGF0YVRleHQgfSBmcm9tIFwiLi9ub0RhdGEudHNcIjtcblxuZXhwb3J0IHR5cGUgQWNjb3VudEl0ZW0gPSB7XG4gIHZhbHVlOiBzdHJpbmc7XG4gIHRleHQ6IHN0cmluZztcbiAgY2FyZ28/OiBzdHJpbmc7XG4gIGVtcHJlc2E/OiBzdHJpbmc7XG59O1xuXG5leHBvcnQgY29uc3QgbWFwQWNjb3VudEl0ZW0gPSAoaXRlbTogdW5rbm93bik6IEFjY291bnRJdGVtIHwgbnVsbCA9PiB7XG4gIGlmIChpc05vRGF0YVJvdyhpdGVtKSkgcmV0dXJuIG51bGw7XG4gIGlmIChBcnJheS5pc0FycmF5KGl0ZW0pKSB7XG4gICAgY29uc3QgY29kZSA9IChpdGVtWzBdIHx8IFwiXCIpLnRvU3RyaW5nKCkudHJpbSgpO1xuICAgIGNvbnN0IGRlc2MgPSAoaXRlbVsyXSB8fCAoaXRlbSBhcyBhbnkpWzFdIHx8IFwiXCIpLnRvU3RyaW5nKCkudHJpbSgpO1xuICAgIGlmICghY29kZSB8fCBpc05vRGF0YVRleHQoY29kZSkgfHwgaXNOb0RhdGFUZXh0KGRlc2MpKSByZXR1cm4gbnVsbDtcbiAgICBjb25zdCB0ZXh0ID0gZGVzYyA/IGAke2Rlc2N9ICgke2NvZGV9KWAgOiBjb2RlO1xuICAgIHJldHVybiB7XG4gICAgICB2YWx1ZTogY29kZSxcbiAgICAgIHRleHQsXG4gICAgICBjYXJnbzogXCJcIixcbiAgICAgIGVtcHJlc2E6IGl0ZW1bMl0gYXMgc3RyaW5nLFxuICAgIH07XG4gIH1cbiAgaWYgKGl0ZW0gJiYgdHlwZW9mIGl0ZW0gPT09IFwib2JqZWN0XCIpIHtcbiAgICBjb25zdCByYXcgPSBpdGVtIGFzIGFueTtcbiAgICBjb25zdCBjb2RlID0gKHJhdy5hY2NvdW50TnVtIHx8IHJhdy5BY2NvdW50TnVtIHx8IFwiXCIpLnRvU3RyaW5nKCkudHJpbSgpO1xuICAgIGNvbnN0IGRlc2MgPSAocmF3Lm5vbWJyZUNvbWVyY2lhbCB8fCByYXcuTm9tYnJlQ29tZXJjaWFsIHx8IHJhdy5yYXpvblNvY2lhbCB8fCByYXcuUmF6b25Tb2NpYWwgfHwgXCJcIilcbiAgICAgIC50b1N0cmluZygpXG4gICAgICAudHJpbSgpO1xuICAgIGlmICghY29kZSB8fCBpc05vRGF0YVRleHQoY29kZSkgfHwgaXNOb0RhdGFUZXh0KGRlc2MpKSByZXR1cm4gbnVsbDtcbiAgICBjb25zdCB0ZXh0ID0gZGVzYyA/IGAke2Rlc2N9ICgke2NvZGV9KWAgOiBjb2RlO1xuICAgIHJldHVybiB7IHZhbHVlOiBjb2RlLCB0ZXh0IH07XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59O1xuIiwgImV4cG9ydCBjb25zdCBtYWtlQ2FjaGUgPSA8VD4obGltaXQgPSAxMCkgPT4ge1xuICBjb25zdCBtYXAgPSBuZXcgTWFwPHN0cmluZywgVD4oKTtcbiAgcmV0dXJuIHtcbiAgICBnZXQ6IChrOiBzdHJpbmcpID0+IG1hcC5nZXQoayksXG4gICAgc2V0OiAoazogc3RyaW5nLCB2OiBUKSA9PiB7XG4gICAgICBpZiAobWFwLmhhcyhrKSkgbWFwLmRlbGV0ZShrKTtcbiAgICAgIG1hcC5zZXQoaywgdik7XG4gICAgICBpZiAobWFwLnNpemUgPiBsaW1pdCkge1xuICAgICAgICBjb25zdCBmaXJzdCA9IG1hcC5rZXlzKCkubmV4dCgpLnZhbHVlO1xuICAgICAgICBpZiAoZmlyc3QpIG1hcC5kZWxldGUoZmlyc3QpO1xuICAgICAgfVxuICAgIH0sXG4gICAgaGFzOiAoazogc3RyaW5nKSA9PiBtYXAuaGFzKGspLFxuICAgIGNsZWFyOiAoKSA9PiBtYXAuY2xlYXIoKSxcbiAgfTtcbn07XG4iLCAiaW1wb3J0IHsgbWFrZUNhY2hlIH0gZnJvbSBcIi4vbWFrZUNhY2hlLnRzXCI7XG5cbmNvbnN0IENVUlJFTlRfQ09NUEFOWSA9IFN0cmluZyhnbG9iYWxUaGlzLl9fSU5EX1NFTEVDVEVEX0NPTVBBTllfXyB8fCBcIlwiKS50cmltKCkudG9VcHBlckNhc2UoKTtcbmNvbnN0IENPTVBBTllfU1RPUkFHRV9TVUZGSVggPSBDVVJSRU5UX0NPTVBBTlkgPyBgXyR7Q1VSUkVOVF9DT01QQU5ZfWAgOiBcIlwiO1xuXG5leHBvcnQgY29uc3QgVklTSVRfRFJBRlRfS0VZID0gYHZpc2l0YXNfZHJhZnQke0NPTVBBTllfU1RPUkFHRV9TVUZGSVh9YDtcbmV4cG9ydCBjb25zdCBDT05UQUNUU19TVE9SQUdFX0tFWSA9IGB2aXNpdGFzX2NvbnRhY3RzX2NhY2hlX3YxJHtDT01QQU5ZX1NUT1JBR0VfU1VGRklYfWA7XG5leHBvcnQgY29uc3QgQ09OVEFDVFNfU0VMRUNUSU9OX0tFWSA9IGB2aXNpdGFzX2NvbnRhY3RzX3NlbGVjdGVkX3YxJHtDT01QQU5ZX1NUT1JBR0VfU1VGRklYfWA7XG5leHBvcnQgY29uc3QgQ1JFQVRFX0ZSRVNIX1BBUkFNID0gXCJmcmVzaFwiO1xuXG5jb25zdCBjbGllbnRDYWNoZSA9IG1ha2VDYWNoZTx1bmtub3duW10+KDEwKTtcbmNvbnN0IGNvbnRhY3RzQ2FjaGUgPSBtYWtlQ2FjaGU8dW5rbm93bltdPigxMCk7XG5cbmNvbnN0IGNhY2hlS2V5V2l0aENvbXBhbnkgPSAoa2V5OiBzdHJpbmcpID0+IGAke0NVUlJFTlRfQ09NUEFOWSB8fCBcIkRFRkFVTFRcIn06OiR7a2V5fWA7XG5cbmNvbnN0IHJlYWRTdG9yYWdlID0gKGtleTogc3RyaW5nKTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4gPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHJhdyA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oa2V5KTtcbiAgICBpZiAoIXJhdykgcmV0dXJuIHt9O1xuICAgIHJldHVybiBKU09OLnBhcnNlKHJhdyk7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiB7fTtcbiAgfVxufTtcblxuY29uc3Qgd3JpdGVTdG9yYWdlID0gKGtleTogc3RyaW5nLCBkYXRhOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPikgPT4ge1xuICB0cnkge1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oa2V5LCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XG4gIH0gY2F0Y2gge1xuICAgIC8vIGlnbm9yZVxuICB9XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0Q2xpZW50Q2FjaGUgPSAocXVlcnk6IHN0cmluZyk6IHVua25vd25bXSB8IG51bGwgPT4ge1xuICBjb25zdCBjYWNoZUtleSA9IGNhY2hlS2V5V2l0aENvbXBhbnkocXVlcnkpO1xuICBpZiAoIWNsaWVudENhY2hlLmhhcyhjYWNoZUtleSkpIHJldHVybiBudWxsO1xuICByZXR1cm4gY2xpZW50Q2FjaGUuZ2V0KGNhY2hlS2V5KSB8fCBudWxsO1xufTtcblxuZXhwb3J0IGNvbnN0IGhhc0NsaWVudENhY2hlID0gKHF1ZXJ5OiBzdHJpbmcpOiBib29sZWFuID0+IHtcbiAgcmV0dXJuIGNsaWVudENhY2hlLmhhcyhjYWNoZUtleVdpdGhDb21wYW55KHF1ZXJ5KSk7XG59O1xuXG5leHBvcnQgY29uc3Qgc2V0Q2xpZW50Q2FjaGUgPSAocXVlcnk6IHN0cmluZywgaXRlbXM6IHVua25vd25bXSk6IHZvaWQgPT4ge1xuICBjbGllbnRDYWNoZS5zZXQoY2FjaGVLZXlXaXRoQ29tcGFueShxdWVyeSksIGl0ZW1zKTtcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRDYWNoZWRDb250YWN0cyA9IChhY2NvdW50OiBzdHJpbmcpOiB1bmtub3duW10gfCBudWxsID0+IHtcbiAgY29uc3QgY2FjaGVLZXkgPSBjYWNoZUtleVdpdGhDb21wYW55KGFjY291bnQpO1xuICBpZiAoY29udGFjdHNDYWNoZS5oYXMoY2FjaGVLZXkpKSByZXR1cm4gY29udGFjdHNDYWNoZS5nZXQoY2FjaGVLZXkpIHx8IG51bGw7XG4gIGNvbnN0IHN0b3JlID0gcmVhZFN0b3JhZ2UoQ09OVEFDVFNfU1RPUkFHRV9LRVkpO1xuICBjb25zdCBjYWNoZWQgPSBzdG9yZVthY2NvdW50XTtcbiAgaWYgKEFycmF5LmlzQXJyYXkoY2FjaGVkKSkge1xuICAgIGNvbnRhY3RzQ2FjaGUuc2V0KGNhY2hlS2V5LCBjYWNoZWQpO1xuICAgIHJldHVybiBjYWNoZWQ7XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59O1xuXG5leHBvcnQgY29uc3Qgc2V0Q2FjaGVkQ29udGFjdHMgPSAoYWNjb3VudDogc3RyaW5nLCBpdGVtczogdW5rbm93bltdKTogdm9pZCA9PiB7XG4gIGNvbnRhY3RzQ2FjaGUuc2V0KGNhY2hlS2V5V2l0aENvbXBhbnkoYWNjb3VudCksIGl0ZW1zKTtcbiAgY29uc3Qgc3RvcmUgPSByZWFkU3RvcmFnZShDT05UQUNUU19TVE9SQUdFX0tFWSk7XG4gIHN0b3JlW2FjY291bnRdID0gaXRlbXM7XG4gIHdyaXRlU3RvcmFnZShDT05UQUNUU19TVE9SQUdFX0tFWSwgc3RvcmUpO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldFN0b3JlZFNlbGVjdGlvbiA9IChhY2NvdW50OiBzdHJpbmcpOiB1bmtub3duW10gPT4ge1xuICBjb25zdCBzdG9yZSA9IHJlYWRTdG9yYWdlKENPTlRBQ1RTX1NFTEVDVElPTl9LRVkpO1xuICBjb25zdCByYXcgPSBzdG9yZVthY2NvdW50XTtcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkocmF3KSA/IHJhdyA6IFtdO1xufTtcblxuZXhwb3J0IGNvbnN0IHNldFN0b3JlZFNlbGVjdGlvbiA9IChhY2NvdW50OiBzdHJpbmcsIGl0ZW1zOiB1bmtub3duW10pOiB2b2lkID0+IHtcbiAgY29uc3Qgc3RvcmUgPSByZWFkU3RvcmFnZShDT05UQUNUU19TRUxFQ1RJT05fS0VZKTtcbiAgc3RvcmVbYWNjb3VudF0gPSBpdGVtcztcbiAgd3JpdGVTdG9yYWdlKENPTlRBQ1RTX1NFTEVDVElPTl9LRVksIHN0b3JlKTtcbn07XG5cbmV4cG9ydCBjb25zdCBjbGVhclN0b3JlZFNlbGVjdGlvbiA9IChhY2NvdW50OiBzdHJpbmcpOiB2b2lkID0+IHtcbiAgY29uc3Qgc3RvcmUgPSByZWFkU3RvcmFnZShDT05UQUNUU19TRUxFQ1RJT05fS0VZKTtcbiAgaWYgKHN0b3JlW2FjY291bnRdKSB7XG4gICAgZGVsZXRlIHN0b3JlW2FjY291bnRdO1xuICAgIHdyaXRlU3RvcmFnZShDT05UQUNUU19TRUxFQ1RJT05fS0VZLCBzdG9yZSk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBjbGVhckNyZWF0ZVNlbGVjdGlvbkNhY2hlID0gKCk6IHZvaWQgPT4ge1xuICB0cnkge1xuICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oVklTSVRfRFJBRlRfS0VZKTtcbiAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKENPTlRBQ1RTX1NUT1JBR0VfS0VZKTtcbiAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKENPTlRBQ1RTX1NFTEVDVElPTl9LRVkpO1xuICB9IGNhdGNoIHtcbiAgICAvLyBpZ25vcmVcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IHN0cmlwRnJlc2hQYXJhbSA9ICgpOiB2b2lkID0+IHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybjtcbiAgdHJ5IHtcbiAgICBjb25zdCB1cmwgPSBuZXcgVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcbiAgICBpZiAoIXVybC5zZWFyY2hQYXJhbXMuaGFzKENSRUFURV9GUkVTSF9QQVJBTSkpIHJldHVybjtcbiAgICB1cmwuc2VhcmNoUGFyYW1zLmRlbGV0ZShDUkVBVEVfRlJFU0hfUEFSQU0pO1xuICAgIGNvbnN0IG5leHQgPSBgJHt1cmwucGF0aG5hbWV9JHt1cmwuc2VhcmNofSR7dXJsLmhhc2h9YDtcbiAgICB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUoe30sIFwiXCIsIG5leHQpO1xuICB9IGNhdGNoIHtcbiAgICAvLyBpZ25vcmVcbiAgfVxufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1CQUF5RTs7O0FDQWxFLElBQU0sZUFBZSxDQUFDLFVBQTRCO0FBQ3ZELFFBQU0sTUFBTSxP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
