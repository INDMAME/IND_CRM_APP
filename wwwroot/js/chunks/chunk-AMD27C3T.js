import {
  handleComboboxKeyDown
} from "./chunk-YMDESVRK.js";
import {
  ChevronDownSvg,
  ChevronUpSvg,
  FloatingList_default,
  useOutsideClick
} from "./chunk-OSBLOXTE.js";
import {
  Spinner_default,
  classNames
} from "./chunk-UNQYUM6B.js";
import {
  require_jsx_runtime,
  require_react
} from "./chunk-2NKOKBT5.js";
import {
  fetchJson,
  indFormat,
  indT
} from "./chunk-PNIKV5DC.js";
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvdmlzaXRhcy9DbGllbnRTZWFyY2hDb21ib2JveC50c3giLCAiLi4vLi4vcmVhY3Qvc3JjL3V0aWxzL25vRGF0YS50cyIsICIuLi8uLi9yZWFjdC9zcmMvdXRpbHMvdmlzaXRhc01hcHBpbmcudHMiLCAiLi4vLi4vcmVhY3Qvc3JjL3V0aWxzL21ha2VDYWNoZS50cyIsICIuLi8uLi9yZWFjdC9zcmMvdXRpbHMvdmlzaXRhc1N0b3JhZ2UudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBGbG9hdGluZ0xpc3QgZnJvbSBcIi4uL2NvbW1vbnMvRmxvYXRpbmdMaXN0LnRzeFwiO1xyXG5pbXBvcnQgU3Bpbm5lciBmcm9tIFwiLi4vY29tbW9ucy9TcGlubmVyLnRzeFwiO1xyXG5pbXBvcnQgeyBDaGV2cm9uRG93blN2ZywgQ2hldnJvblVwU3ZnIH0gZnJvbSBcIi4uL2NvbW1vbnMvY2hldnJvbnMudHN4XCI7XHJcbmltcG9ydCB7IGZldGNoSnNvbiB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XHJcbmltcG9ydCB7IGhhbmRsZUNvbWJvYm94S2V5RG93biB9IGZyb20gXCIuLi8uLi9ob29rcy91c2VDb21ib2JveEtleWJvYXJkLnRzXCI7XHJcbmltcG9ydCB7IHVzZU91dHNpZGVDbGljayB9IGZyb20gXCIuLi8uLi9ob29rcy91c2VPdXRzaWRlQ2xpY2sudHNcIjtcclxuaW1wb3J0IHsgY2xhc3NOYW1lcyB9IGZyb20gXCIuLi8uLi91dGlscy9jbGFzc05hbWVzLnRzXCI7XHJcbmltcG9ydCB7IGluZEZvcm1hdCwgaW5kVCB9IGZyb20gXCIuLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB7IG1hcEFjY291bnRJdGVtIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Zpc2l0YXNNYXBwaW5nLnRzXCI7XHJcbmltcG9ydCB7IGdldENsaWVudENhY2hlLCBoYXNDbGllbnRDYWNoZSwgc2V0Q2xpZW50Q2FjaGUgfSBmcm9tIFwiLi4vLi4vdXRpbHMvdmlzaXRhc1N0b3JhZ2UudHNcIjtcclxuXHJcbmV4cG9ydCB0eXBlIENsaWVudE9wdGlvbiA9IHtcclxuICB2YWx1ZTogc3RyaW5nO1xyXG4gIHRleHQ6IHN0cmluZztcclxuICBjYXJnbz86IHN0cmluZztcclxuICBlbXByZXNhPzogc3RyaW5nO1xyXG59O1xyXG5cclxudHlwZSBWYXJpYW50ID0gXCJkZWZhdWx0XCIgfCBcImNvbXBhY3RcIjtcclxuXHJcbnR5cGUgQ2xpZW50U2VhcmNoQ29tYm9ib3hQcm9wcyA9IHtcclxuICB2YWx1ZTogQ2xpZW50T3B0aW9uIHwgbnVsbDtcclxuICBvblNlbGVjdGVkOiAodmFsdWU6IENsaWVudE9wdGlvbiB8IG51bGwpID0+IHZvaWQ7XHJcbiAgbGFiZWw/OiBzdHJpbmc7XHJcbiAgcGxhY2Vob2xkZXI/OiBzdHJpbmc7XHJcbiAgdmFyaWFudD86IFZhcmlhbnQ7XHJcbiAgc2hvd0xhYmVsPzogYm9vbGVhbjtcclxuICBpZEJhc2U/OiBzdHJpbmc7XHJcbiAgY2xlYXJPbk51bGw/OiBib29sZWFuO1xyXG4gIHBvcnRhbENsYXNzTmFtZT86IHN0cmluZztcclxuICBwYW5lbENsYXNzTmFtZT86IHN0cmluZztcclxufTtcclxuXHJcbi8vIFJldXNhYmxlIGNsaWVudCBzZWFyY2ggY29tYm9ib3ggZm9yIHZpc2l0YXMgcGFnZXMuXHJcbmNvbnN0IENsaWVudFNlYXJjaENvbWJvYm94ID0gKHtcclxuICB2YWx1ZSxcclxuICBvblNlbGVjdGVkLFxyXG4gIGxhYmVsLFxyXG4gIHBsYWNlaG9sZGVyLFxyXG4gIHZhcmlhbnQgPSBcImRlZmF1bHRcIixcclxuICBzaG93TGFiZWwsXHJcbiAgaWRCYXNlLFxyXG4gIGNsZWFyT25OdWxsLFxyXG4gIHBvcnRhbENsYXNzTmFtZSxcclxuICBwYW5lbENsYXNzTmFtZSxcclxufTogQ2xpZW50U2VhcmNoQ29tYm9ib3hQcm9wcykgPT4ge1xyXG4gIGNvbnN0IGlzQ29tcGFjdCA9IHZhcmlhbnQgPT09IFwiY29tcGFjdFwiO1xyXG4gIGNvbnN0IHJlc29sdmVkTGFiZWwgPSBsYWJlbCB8fCBpbmRUKFwiVmlzaXRzX0NyZWF0ZV9TZWFyY2hDbGllbnRcIiwgXCJTZWFyY2ggY2xpZW50XCIpO1xyXG4gIGNvbnN0IHJlc29sdmVkUGxhY2Vob2xkZXIgPSBwbGFjZWhvbGRlciB8fCByZXNvbHZlZExhYmVsO1xyXG4gIGNvbnN0IHNob3VsZFNob3dMYWJlbCA9IHNob3dMYWJlbCA/PyAhaXNDb21wYWN0O1xyXG4gIGNvbnN0IHNob3VsZENsZWFyT25OdWxsID0gY2xlYXJPbk51bGwgPz8gaXNDb21wYWN0O1xyXG4gIGNvbnN0IG1pbkNoYXJzID0gNDtcclxuXHJcbiAgY29uc3QgW3F1ZXJ5LCBzZXRRdWVyeV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbb3B0aW9ucywgc2V0T3B0aW9uc10gPSB1c2VTdGF0ZTxDbGllbnRPcHRpb25bXT4oW10pO1xyXG4gIGNvbnN0IFtmZXRjaGVkUXVlcnksIHNldEZldGNoZWRRdWVyeV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW2xvYWRpbmdNb3JlLCBzZXRMb2FkaW5nTW9yZV0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW3N0YXR1cywgc2V0U3RhdHVzXSA9IHVzZVN0YXRlKGluZEZvcm1hdChcIlZpc2l0c19DcmVhdGVfTWluQ2hhcnNcIiwgXCJUeXBlIGF0IGxlYXN0IHswfSBjaGFyYWN0ZXJzLlwiLCBtaW5DaGFycykpO1xyXG4gIGNvbnN0IFtzZWxlY3RlZCwgc2V0U2VsZWN0ZWRdID0gdXNlU3RhdGU8Q2xpZW50T3B0aW9uIHwgbnVsbD4odmFsdWUpO1xyXG4gIGNvbnN0IFtvcGVuLCBzZXRPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbcGFnZSwgc2V0UGFnZV0gPSB1c2VTdGF0ZSgxKTtcclxuICBjb25zdCBbaGFzTW9yZSwgc2V0SGFzTW9yZV0gPSB1c2VTdGF0ZSh0cnVlKTtcclxuICBjb25zdCBbYmxvY2tpbmcsIHNldEJsb2NraW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbYWN0aXZlSW5kZXgsIHNldEFjdGl2ZUluZGV4XSA9IHVzZVN0YXRlKDApO1xyXG4gIGNvbnN0IFtzaG93Tm90Rm91bmRTdGF0ZSwgc2V0U2hvd05vdEZvdW5kU3RhdGVdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IGxpc3RSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBjb250YWluZXJSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBib3hSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBhYm9ydFJlZiA9IHVzZVJlZjxBYm9ydENvbnRyb2xsZXIgfCBudWxsPihudWxsKTtcclxuXHJcbiAgdXNlT3V0c2lkZUNsaWNrKFtjb250YWluZXJSZWYsIGxpc3RSZWZdLCAoKSA9PiB7XHJcbiAgICBzZXRTaG93Tm90Rm91bmRTdGF0ZShmYWxzZSk7XHJcbiAgICBzZXRPcGVuKGZhbHNlKTtcclxuICB9KTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghdmFsdWUpIHtcclxuICAgICAgaWYgKHNob3VsZENsZWFyT25OdWxsKSB7XHJcbiAgICAgICAgc2V0U2VsZWN0ZWQobnVsbCk7XHJcbiAgICAgICAgc2V0UXVlcnkoXCJcIik7XHJcbiAgICAgICAgc2V0U2hvd05vdEZvdW5kU3RhdGUoZmFsc2UpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHNldFNlbGVjdGVkKHZhbHVlKTtcclxuICAgIHNldFF1ZXJ5KHZhbHVlLnRleHQgfHwgXCJcIik7XHJcbiAgICBzZXRTaG93Tm90Rm91bmRTdGF0ZShmYWxzZSk7XHJcbiAgfSwgW3ZhbHVlLCBzaG91bGRDbGVhck9uTnVsbF0pO1xyXG5cclxuICBjb25zdCBmaWx0ZXJlZCA9IHVzZU1lbW8oKCkgPT4ge1xyXG4gICAgaWYgKCFxdWVyeS50cmltKCkpIHJldHVybiBvcHRpb25zO1xyXG4gICAgY29uc3QgcSA9IHF1ZXJ5LnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgaWYgKGZldGNoZWRRdWVyeSAmJiBxICE9PSBmZXRjaGVkUXVlcnkpIHJldHVybiBvcHRpb25zO1xyXG4gICAgY29uc3QgbWF0Y2ggPSBvcHRpb25zLmZpbHRlcigobykgPT4gby50ZXh0LnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMocSkpO1xyXG4gICAgcmV0dXJuIG1hdGNoLmxlbmd0aCA+IDAgPyBtYXRjaCA6IG9wdGlvbnM7XHJcbiAgfSwgW29wdGlvbnMsIHF1ZXJ5LCBmZXRjaGVkUXVlcnldKTtcclxuICBjb25zdCByZXNvbHZlZEFjdGl2ZUluZGV4ID1cclxuICAgIGZpbHRlcmVkLmxlbmd0aCA+IDAgPyBNYXRoLm1pbihNYXRoLm1heChhY3RpdmVJbmRleCwgMCksIGZpbHRlcmVkLmxlbmd0aCAtIDEpIDogMDtcclxuXHJcbiAgY29uc3QgY2FuY2VsUGVuZGluZyA9ICgpID0+IHtcclxuICAgIGlmIChhYm9ydFJlZi5jdXJyZW50KSB7XHJcbiAgICAgIGFib3J0UmVmLmN1cnJlbnQuYWJvcnQoKTtcclxuICAgICAgYWJvcnRSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIGlmIChhYm9ydFJlZi5jdXJyZW50KSB7XHJcbiAgICAgICAgYWJvcnRSZWYuY3VycmVudC5hYm9ydCgpO1xyXG4gICAgICAgIGFib3J0UmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3Qgc2VhcmNoID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgY29uc3QgY3VycmVudFF1ZXJ5ID0gcXVlcnkudHJpbSgpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICBpZiAoY3VycmVudFF1ZXJ5Lmxlbmd0aCA8IG1pbkNoYXJzKSB7XHJcbiAgICAgIHNldFNob3dOb3RGb3VuZFN0YXRlKGZhbHNlKTtcclxuICAgICAgc2V0U3RhdHVzKGluZEZvcm1hdChcIlZpc2l0c19DcmVhdGVfTWluQ2hhcnNcIiwgXCJUeXBlIGF0IGxlYXN0IHswfSBjaGFyYWN0ZXJzLlwiLCBtaW5DaGFycykpO1xyXG4gICAgICBzZXRPcHRpb25zKFtdKTtcclxuICAgICAgc2V0SGFzTW9yZShmYWxzZSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNhbmNlbFBlbmRpbmcoKTtcclxuICAgIHNldFBhZ2UoMSk7XHJcbiAgICBzZXRIYXNNb3JlKHRydWUpO1xyXG4gICAgc2V0T3BlbihmYWxzZSk7XHJcbiAgICBjb25zdCBjYWNoZUtleSA9IHF1ZXJ5LnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgaWYgKGhhc0NsaWVudENhY2hlKGNhY2hlS2V5KSkge1xyXG4gICAgICBjb25zdCBjYWNoZWQgPSAoZ2V0Q2xpZW50Q2FjaGUoY2FjaGVLZXkpIHx8IFtdKSBhcyBDbGllbnRPcHRpb25bXTtcclxuICAgICAgc2V0QWN0aXZlSW5kZXgoMCk7XHJcbiAgICAgIHNldEZldGNoZWRRdWVyeShjdXJyZW50UXVlcnkpO1xyXG4gICAgICBzZXRPcHRpb25zKGNhY2hlZCk7XHJcbiAgICAgIGlmIChjYWNoZWQubGVuZ3RoIDwgMSkge1xyXG4gICAgICAgIHNldFNlbGVjdGVkKG51bGwpO1xyXG4gICAgICAgIHNldFF1ZXJ5KFwiXCIpO1xyXG4gICAgICAgIHNldFNob3dOb3RGb3VuZFN0YXRlKHRydWUpO1xyXG4gICAgICAgIG9uU2VsZWN0ZWQobnVsbCk7XHJcbiAgICAgICAgc2V0U3RhdHVzKGluZFQoXCJDb21tb25fTm90Rm91bmRcIiwgXCJOb3QgZm91bmRcIikpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNldFNob3dOb3RGb3VuZFN0YXRlKGZhbHNlKTtcclxuICAgICAgICBzZXRTdGF0dXMoaW5kRm9ybWF0KFwiVmlzaXRzX0NyZWF0ZV9DbGllbnRDb3VudENhY2hlXCIsIFwiezB9IGNsaWVudHMgKGNhY2hlKVwiLCBjYWNoZWQubGVuZ3RoKSk7XHJcbiAgICAgIH1cclxuICAgICAgc2V0SGFzTW9yZShjYWNoZWQubGVuZ3RoID09PSAxMCk7XHJcbiAgICAgIHNldE9wZW4odHJ1ZSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHNldExvYWRpbmcodHJ1ZSk7XHJcbiAgICBzZXRCbG9ja2luZyh0cnVlKTtcclxuICAgIHNldFN0YXR1cyhpbmRUKFwiVmlzaXRzX0NyZWF0ZV9TZWFyY2hpbmdcIiwgXCJTZWFyY2hpbmcuLi5cIikpO1xyXG4gICAgY29uc3QgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcclxuICAgIGFib3J0UmVmLmN1cnJlbnQgPSBjb250cm9sbGVyO1xyXG4gICAgbGV0IHNob3VsZE9wZW5PbkZpbmlzaCA9IGZhbHNlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgdXJsID0gYC9WaXNpdGFzL0dldEFjY291bnRzRm9yRHJvcGRvd24/dGVybT0ke2VuY29kZVVSSUNvbXBvbmVudChxdWVyeSl9JnBhZ2U9MSZwYWdlU2l6ZT0xMGA7XHJcbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBmZXRjaEpzb248eyBpdGVtcz86IHVua25vd25bXSB9Pih1cmwsIHsgc2lnbmFsOiBjb250cm9sbGVyLnNpZ25hbCB9KTtcclxuICAgICAgY29uc3QgaXRlbXMgPSAoZGF0YS5pdGVtcyB8fCBbXSkubWFwKG1hcEFjY291bnRJdGVtKS5maWx0ZXIoQm9vbGVhbikgYXMgQ2xpZW50T3B0aW9uW107XHJcbiAgICAgIHNldEFjdGl2ZUluZGV4KDApO1xyXG4gICAgICBzZXRGZXRjaGVkUXVlcnkoY3VycmVudFF1ZXJ5KTtcclxuICAgICAgc2V0Q2xpZW50Q2FjaGUoY2FjaGVLZXksIGl0ZW1zKTtcclxuICAgICAgc2V0T3B0aW9ucyhpdGVtcyk7XHJcbiAgICAgIGlmIChpdGVtcy5sZW5ndGggPCAxKSB7XHJcbiAgICAgICAgc2V0U2VsZWN0ZWQobnVsbCk7XHJcbiAgICAgICAgc2V0UXVlcnkoXCJcIik7XHJcbiAgICAgICAgc2V0U2hvd05vdEZvdW5kU3RhdGUodHJ1ZSk7XHJcbiAgICAgICAgb25TZWxlY3RlZChudWxsKTtcclxuICAgICAgICBzZXRTdGF0dXMoaW5kVChcIkNvbW1vbl9Ob3RGb3VuZFwiLCBcIk5vdCBmb3VuZFwiKSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc2V0U2hvd05vdEZvdW5kU3RhdGUoZmFsc2UpO1xyXG4gICAgICAgIHNldFN0YXR1cyhpbmRGb3JtYXQoXCJWaXNpdHNfQ3JlYXRlX0NsaWVudENvdW50XCIsIFwiezB9IGNsaWVudHNcIiwgaXRlbXMubGVuZ3RoKSk7XHJcbiAgICAgIH1cclxuICAgICAgc2V0SGFzTW9yZShpdGVtcy5sZW5ndGggPT09IDEwKTtcclxuICAgICAgc2hvdWxkT3Blbk9uRmluaXNoID0gdHJ1ZTtcclxuICAgIH0gY2F0Y2ggKGVycjogYW55KSB7XHJcbiAgICAgIGlmIChlcnI/Lm5hbWUgPT09IFwiQWJvcnRFcnJvclwiKSB7XHJcbiAgICAgICAgc2V0U3RhdHVzKGluZFQoXCJWaXNpdHNfQ3JlYXRlX1NlYXJjaENhbmNlbGVkXCIsIFwiU2VhcmNoIGNhbmNlbGVkLlwiKSk7XHJcbiAgICAgIH0gZWxzZSBpZiAoU3RyaW5nKGVycj8ubWVzc2FnZSB8fCBcIlwiKS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKFwidGltZW91dFwiKSkge1xyXG4gICAgICAgIHNldFN0YXR1cyhpbmRUKFwiVmlzaXRzX0NyZWF0ZV9TZWFyY2hUaW1lb3V0XCIsIFwiVGhlIHNlYXJjaCB0b29rIHRvbyBsb25nLiBUeXBlIG1vcmUgY2hhcmFjdGVycyB0byBuYXJyb3cgZG93bi5cIikpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNldFN0YXR1cyhpbmRUKFwiVmlzaXRzX0NyZWF0ZV9Mb2FkQ2xpZW50c0Vycm9yXCIsIFwiRmFpbGVkIHRvIGxvYWQgY2xpZW50cy5cIikpO1xyXG4gICAgICB9XHJcbiAgICB9IGZpbmFsbHkge1xyXG4gICAgICBhYm9ydFJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XHJcbiAgICAgIHNldEJsb2NraW5nKGZhbHNlKTtcclxuICAgICAgaWYgKHNob3VsZE9wZW5PbkZpbmlzaCkgc2V0T3Blbih0cnVlKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBjb25zdCBsb2FkTW9yZSA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcclxuICAgIGlmIChsb2FkaW5nTW9yZSB8fCBsb2FkaW5nIHx8ICFoYXNNb3JlIHx8IHF1ZXJ5LnRyaW0oKS5sZW5ndGggPCBtaW5DaGFycykgcmV0dXJuO1xyXG4gICAgc2V0TG9hZGluZ01vcmUodHJ1ZSk7XHJcbiAgICBzZXRCbG9ja2luZyh0cnVlKTtcclxuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XHJcbiAgICBhYm9ydFJlZi5jdXJyZW50ID0gY29udHJvbGxlcjtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IG5leHRQYWdlID0gcGFnZSArIDE7XHJcbiAgICAgIGNvbnN0IHVybCA9IGAvVmlzaXRhcy9HZXRBY2NvdW50c0ZvckRyb3Bkb3duP3Rlcm09JHtlbmNvZGVVUklDb21wb25lbnQocXVlcnkpfSZwYWdlPSR7bmV4dFBhZ2V9JnBhZ2VTaXplPTEwYDtcclxuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IGZldGNoSnNvbjx7IGl0ZW1zPzogdW5rbm93bltdIH0+KHVybCwgeyBzaWduYWw6IGNvbnRyb2xsZXIuc2lnbmFsIH0pO1xyXG4gICAgICBjb25zdCBpdGVtcyA9IChkYXRhLml0ZW1zIHx8IFtdKS5tYXAobWFwQWNjb3VudEl0ZW0pLmZpbHRlcihCb29sZWFuKSBhcyBDbGllbnRPcHRpb25bXTtcclxuICAgICAgc2V0T3B0aW9ucygocHJldikgPT4gWy4uLnByZXYsIC4uLml0ZW1zXSk7XHJcbiAgICAgIHNldFBhZ2UobmV4dFBhZ2UpO1xyXG4gICAgICBzZXRIYXNNb3JlKGl0ZW1zLmxlbmd0aCA9PT0gMTApO1xyXG4gICAgfSBmaW5hbGx5IHtcclxuICAgICAgYWJvcnRSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgIHNldExvYWRpbmdNb3JlKGZhbHNlKTtcclxuICAgICAgc2V0QmxvY2tpbmcoZmFsc2UpO1xyXG4gICAgfVxyXG4gIH0sIFtsb2FkaW5nTW9yZSwgbG9hZGluZywgaGFzTW9yZSwgcXVlcnksIHBhZ2UsIG1pbkNoYXJzXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIW9wZW4gfHwgIWxpc3RSZWYuY3VycmVudCkgcmV0dXJuO1xyXG4gICAgY29uc3QgZWwgPSBsaXN0UmVmLmN1cnJlbnQ7XHJcbiAgICBjb25zdCBvblNjcm9sbCA9ICgpID0+IHtcclxuICAgICAgaWYgKGVsLnNjcm9sbFRvcCArIGVsLmNsaWVudEhlaWdodCA+PSBlbC5zY3JvbGxIZWlnaHQgLSA4KSBsb2FkTW9yZSgpO1xyXG4gICAgfTtcclxuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgb25TY3JvbGwsIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcclxuICAgIHJldHVybiAoKSA9PiBlbC5yZW1vdmVFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIG9uU2Nyb2xsKTtcclxuICB9LCBbb3BlbiwgbG9hZE1vcmVdKTtcclxuXHJcbiAgY29uc3Qgc2VsZWN0T3B0aW9uID0gKG9wdDogQ2xpZW50T3B0aW9uKSA9PiB7XHJcbiAgICBzZXRTZWxlY3RlZChvcHQpO1xyXG4gICAgc2V0UXVlcnkob3B0LnRleHQpO1xyXG4gICAgc2V0U2hvd05vdEZvdW5kU3RhdGUoZmFsc2UpO1xyXG4gICAgc2V0T3BlbihmYWxzZSk7XHJcbiAgICBvblNlbGVjdGVkKG9wdCk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgcmVxdWVzdFNlYXJjaE9yT3BlbiA9ICgpID0+IHtcclxuICAgIGlmIChsb2FkaW5nIHx8IGJsb2NraW5nKSByZXR1cm47XHJcbiAgICBjb25zdCB0cmltbWVkID0gcXVlcnkudHJpbSgpO1xyXG4gICAgaWYgKHRyaW1tZWQubGVuZ3RoIDwgbWluQ2hhcnMpIHtcclxuICAgICAgY2FuY2VsUGVuZGluZygpO1xyXG4gICAgICBzZXRTaG93Tm90Rm91bmRTdGF0ZShmYWxzZSk7XHJcbiAgICAgIHNldE9wdGlvbnMoW10pO1xyXG4gICAgICBzZXRIYXNNb3JlKGZhbHNlKTtcclxuICAgICAgc2V0U3RhdHVzKGluZEZvcm1hdChcIlZpc2l0c19DcmVhdGVfTWluQ2hhcnNcIiwgXCJUeXBlIGF0IGxlYXN0IHswfSBjaGFyYWN0ZXJzLlwiLCBtaW5DaGFycykpO1xyXG4gICAgICBzZXRPcGVuKHRydWUpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcUtleSA9IHRyaW1tZWQudG9Mb3dlckNhc2UoKTtcclxuICAgIGNvbnN0IGlzU2VsZWN0aW9uRGlzcGxheSA9ICEhc2VsZWN0ZWQgJiYgcXVlcnkgPT09IChzZWxlY3RlZC50ZXh0IHx8IFwiXCIpO1xyXG4gICAgY29uc3Qgc2hvdWxkU2VhcmNoID0gIWlzU2VsZWN0aW9uRGlzcGxheSAmJiBxS2V5ICE9PSBmZXRjaGVkUXVlcnk7XHJcblxyXG4gICAgaWYgKHNob3VsZFNlYXJjaCkge1xyXG4gICAgICBzZWFyY2goKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHNldE9wZW4odHJ1ZSk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaGFuZGxlS2V5RG93biA9IChldjogUmVhY3QuS2V5Ym9hcmRFdmVudDxIVE1MSW5wdXRFbGVtZW50PikgPT4ge1xyXG4gICAgaGFuZGxlQ29tYm9ib3hLZXlEb3duKGV2LCB7XHJcbiAgICAgIGlzT3Blbjogb3BlbixcclxuICAgICAgc2V0T3BlbixcclxuICAgICAgb3B0aW9uQ291bnQ6IGZpbHRlcmVkLmxlbmd0aCxcclxuICAgICAgc2V0QWN0aXZlSW5kZXgsXHJcbiAgICAgIHJlcXVpcmVPcGVuRm9yQXJyb3dzOiB0cnVlLFxyXG4gICAgICBvbkVudGVyV2hlbk9wZW46ICgpID0+IHtcclxuICAgICAgICBpZiAoZmlsdGVyZWQubGVuZ3RoIDwgMSkge1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZWxlY3RPcHRpb24oZmlsdGVyZWRbcmVzb2x2ZWRBY3RpdmVJbmRleF0gPz8gZmlsdGVyZWRbMF0pO1xyXG4gICAgICB9LFxyXG4gICAgICBvbkVudGVyV2hlbkNsb3NlZDogcmVxdWVzdFNlYXJjaE9yT3BlbixcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IHF1ZXJ5S2V5ID0gcXVlcnkudHJpbSgpLnRvTG93ZXJDYXNlKCk7XHJcbiAgY29uc3QgaXNTZWxlY3Rpb25EaXNwbGF5ID0gISFzZWxlY3RlZCAmJiBxdWVyeSA9PT0gKHNlbGVjdGVkLnRleHQgfHwgXCJcIik7XHJcbiAgY29uc3Qgc2hvd1NlYXJjaEljb24gPVxyXG4gICAgIWxvYWRpbmcgJiYgIWJsb2NraW5nICYmICFpc1NlbGVjdGlvbkRpc3BsYXkgJiYgcXVlcnlLZXkubGVuZ3RoID49IG1pbkNoYXJzICYmIChmZXRjaGVkUXVlcnkgPT09IFwiXCIgfHwgcXVlcnlLZXkgIT09IGZldGNoZWRRdWVyeSk7XHJcblxyXG4gIGNvbnN0IHdyYXBwZXJDbGFzcyA9IGlzQ29tcGFjdCA/IFwic3BhY2UteS0xIGhpc3RvcnktY2xpZW50LWNvbWJvYm94XCIgOiBcInNwYWNlLXktMlwiO1xyXG4gIGNvbnN0IGxhYmVsQ2xhc3MgPSBcImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZFwiO1xyXG4gIGNvbnN0IGNvbnRhaW5lckNsYXNzID0gaXNDb21wYWN0XHJcbiAgICA/IFwicmVsYXRpdmUgdy1mdWxsIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJnLXdoaXRlIHRleHQtbGVmdCBmb2N1cy13aXRoaW46Ym9yZGVyLXByaW1hcnkgZm9jdXMtd2l0aGluOnJpbmctMiBmb2N1cy13aXRoaW46cmluZy1wcmltYXJ5IGZvY3VzLXdpdGhpbjpyaW5nLW9mZnNldC13aGl0ZSBzbTp0ZXh0LXNtXCJcbiAgICA6IFwicmVsYXRpdmUgdy1mdWxsIGN1cnNvci1kZWZhdWx0IHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlci1zbGF0ZS0zMDAgYmctd2hpdGUgdGV4dC1sZWZ0IHNoYWRvdy14cyBmb2N1cy13aXRoaW46Ym9yZGVyLXByaW1hcnkgZm9jdXMtd2l0aGluOnJpbmctMiBmb2N1cy13aXRoaW46cmluZy1wcmltYXJ5IGZvY3VzLXdpdGhpbjpyaW5nLW9mZnNldC0wIHNtOnRleHQtc21cIjtcbiAgY29uc3QgaW5wdXRDbGFzcyA9IGlzQ29tcGFjdFxuICAgID8gXCJ3LWZ1bGwgcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgcHgtMyBweS0yIHByLTI0IHRleHQtc20gc206dGV4dC1iYXNlIGxlYWRpbmctNSB0ZXh0LXNsYXRlLTkwMCBwbGFjZWhvbGRlcjp0ZXh0LXNsYXRlLTQwMCBmb2N1czpvdXRsaW5lLWhpZGRlbiBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1wcmltYXJ5IGZvY3VzOmJvcmRlci1wcmltYXJ5XCJcbiAgICA6IFwidy1mdWxsIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHB4LTMgcHktMiBwci0yNCB0ZXh0LXNtIHNtOnRleHQtYmFzZSBsZWFkaW5nLTUgdGV4dC1zbGF0ZS05MDAgcGxhY2Vob2xkZXI6dGV4dC1zbGF0ZS00MDAgZm9jdXM6b3V0bGluZS1oaWRkZW4gZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctcHJpbWFyeSBmb2N1czpib3JkZXItcHJpbWFyeVwiO1xuICBjb25zdCBlbXB0eVRleHRDbGFzcyA9IGlzQ29tcGFjdCA/IFwicHgtNCBweS0yIHRleHQtc20gdGV4dC1zbGF0ZS01MDBcIiA6IFwicHgtNCBweS0yIHRleHQtc20gdGV4dC1zbGF0ZS01MDBcIjtcclxuICBjb25zdCBvcHRpb25DbGFzcyA9IGlzQ29tcGFjdFxyXG4gICAgPyBcInJlbGF0aXZlIGZsZXggdy1mdWxsIGN1cnNvci1kZWZhdWx0IHNlbGVjdC1ub25lIGl0ZW1zLXN0YXJ0IHB5LTIgcHgtMyB0ZXh0LWxlZnQgdGV4dC1zbVwiXHJcbiAgICA6IFwicmVsYXRpdmUgZmxleCB3LWZ1bGwgY3Vyc29yLWRlZmF1bHQgc2VsZWN0LW5vbmUgaXRlbXMtc3RhcnQgcHktMiBweC0zIHRleHQtbGVmdCB0ZXh0LXNtXCI7XHJcbiAgY29uc3Qgb3B0aW9uVGV4dENsYXNzID0gaXNDb21wYWN0ID8gXCJibG9jayB0cnVuY2F0ZSB1cHBlcmNhc2UgdGV4dC1bMTNweF1cIiA6IFwiYmxvY2sgdHJ1bmNhdGUgdXBwZXJjYXNlIHRleHQtWzEzcHhdXCI7XHJcbiAgY29uc3Qgb3B0aW9uU3ViVGV4dENsYXNzID0gaXNDb21wYWN0ID8gXCJibG9jayB0cnVuY2F0ZSB1cHBlcmNhc2UgdGV4dC1bMTFweF0gdGV4dC1zbGF0ZS02MDBcIiA6IFwiYmxvY2sgdHJ1bmNhdGUgdXBwZXJjYXNlIHRleHQtWzExcHhdIHRleHQtc2xhdGUtNjAwXCI7XHJcbiAgY29uc3Qgb3B0aW9uU3ViVGV4dFNlY29uZGFyeUNsYXNzID0gaXNDb21wYWN0XHJcbiAgICA/IFwiYmxvY2sgdHJ1bmNhdGUgdXBwZXJjYXNlIHRleHQtWzExcHhdIHRleHQtc2xhdGUtNTAwXCJcclxuICAgIDogXCJibG9jayB0cnVuY2F0ZSB1cHBlcmNhc2UgdGV4dC1bMTFweF0gdGV4dC1zbGF0ZS01MDBcIjtcclxuICBjb25zdCBzdGF0dXNDbGFzcyA9IGlzQ29tcGFjdCA/IFwidGV4dC14cyB0ZXh0LXNsYXRlLTUwMCB0ZWNoLWluZm9cIiA6IFwidGV4dC14cyB0ZXh0LXNsYXRlLTUwMCB0ZWNoLWluZm9cIjtcclxuICBjb25zdCBzZWFyY2hJY29uU2l6ZSA9IGlzQ29tcGFjdCA/IFwiaC01IHctNVwiIDogXCJoLTUgdy01XCI7XHJcbiAgY29uc3QgY2hldnJvbkljb25TaXplID0gaXNDb21wYWN0ID8gXCJoLTUgdy01XCIgOiBcImgtNSB3LTVcIjtcclxuXHJcbiAgY29uc3Qgc2FmZUlkQmFzZSA9IGlkQmFzZSB8fCAoaXNDb21wYWN0ID8gXCJoaXN0b3J5LWNsaWVudFwiIDogXCJjbGllbnRcIik7XHJcbiAgY29uc3QgbGlzdElkID0gYCR7c2FmZUlkQmFzZX0tb3B0aW9uc2A7XHJcbiAgY29uc3QgYWN0aXZlSWQgPVxyXG4gICAgb3BlbiAmJiBmaWx0ZXJlZFtyZXNvbHZlZEFjdGl2ZUluZGV4XVxyXG4gICAgICA/IGAke3NhZmVJZEJhc2V9LW9wdC0ke2ZpbHRlcmVkW3Jlc29sdmVkQWN0aXZlSW5kZXhdLnZhbHVlfWBcclxuICAgICAgOiB1bmRlZmluZWQ7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT17d3JhcHBlckNsYXNzfSByZWY9e2NvbnRhaW5lclJlZn0+XHJcbiAgICAgIHtzaG91bGRTaG93TGFiZWwgJiYgPGxhYmVsIGNsYXNzTmFtZT17bGFiZWxDbGFzc30+e3Jlc29sdmVkTGFiZWx9PC9sYWJlbD59XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmVcIj5cclxuICAgICAgICA8ZGl2IHJlZj17Ym94UmVmfSBjbGFzc05hbWU9e2NvbnRhaW5lckNsYXNzfT5cclxuICAgICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgICBjbGFzc05hbWU9e2lucHV0Q2xhc3N9XHJcbiAgICAgICAgICAgIHZhbHVlPXtxdWVyeX1cclxuICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgIGNvbnN0IHZhbCA9IGV2ZW50LnRhcmdldC52YWx1ZTtcclxuICAgICAgICAgICAgICBzZXRBY3RpdmVJbmRleCgwKTtcclxuICAgICAgICAgICAgICBzZXRRdWVyeSh2YWwpO1xyXG4gICAgICAgICAgICAgIHNldFNob3dOb3RGb3VuZFN0YXRlKGZhbHNlKTtcclxuICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWQgJiYgdmFsICE9PSAoc2VsZWN0ZWQudGV4dCB8fCBcIlwiKSkge1xyXG4gICAgICAgICAgICAgICAgc2V0U2VsZWN0ZWQobnVsbCk7XHJcbiAgICAgICAgICAgICAgICBvblNlbGVjdGVkPy4obnVsbCk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGNhbmNlbFBlbmRpbmcoKTtcclxuICAgICAgICAgICAgICBzZXRGZXRjaGVkUXVlcnkoXCJcIik7XHJcbiAgICAgICAgICAgICAgc2V0T3B0aW9ucyhbXSk7XHJcbiAgICAgICAgICAgICAgc2V0SGFzTW9yZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgc2V0U3RhdHVzKFxyXG4gICAgICAgICAgICAgICAgdmFsLnRyaW0oKS5sZW5ndGggPCBtaW5DaGFyc1xyXG4gICAgICAgICAgICAgICAgICA/IGluZEZvcm1hdChcIlZpc2l0c19DcmVhdGVfTWluQ2hhcnNcIiwgXCJUeXBlIGF0IGxlYXN0IHswfSBjaGFyYWN0ZXJzLlwiLCBtaW5DaGFycylcclxuICAgICAgICAgICAgICAgICAgOiBpbmRUKFwiVmlzaXRzX0NyZWF0ZV9QcmVzc1NlYXJjaEhpbnRcIiwgXCJQcmVzcyBzZWFyY2gsIEVudGVyIG9yIEFycm93RG93biB0byBzZWFyY2guXCIpXHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICBzZXRPcGVuKGZhbHNlKTtcclxuICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgb25LZXlEb3duPXtoYW5kbGVLZXlEb3dufVxyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17cmVzb2x2ZWRQbGFjZWhvbGRlcn1cclxuICAgICAgICAgICAgYXJpYS1sYWJlbD17cmVzb2x2ZWRMYWJlbH1cclxuICAgICAgICAgICAgcmVhZE9ubHk9e2xvYWRpbmcgfHwgYmxvY2tpbmd9XHJcbiAgICAgICAgICAgIGFyaWEtYnVzeT17bG9hZGluZyB8fCBibG9ja2luZ31cclxuICAgICAgICAgICAgcm9sZT1cImNvbWJvYm94XCJcclxuICAgICAgICAgICAgYXJpYS1leHBhbmRlZD17b3Blbn1cclxuICAgICAgICAgICAgYXJpYS1jb250cm9scz17bGlzdElkfVxyXG4gICAgICAgICAgICBhcmlhLWFjdGl2ZWRlc2NlbmRhbnQ9e2FjdGl2ZUlkfVxyXG4gICAgICAgICAgLz5cclxuXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LXktMCByaWdodC0wIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHByLTJcIj5cclxuICAgICAgICAgICAgeyhsb2FkaW5nIHx8IGJsb2NraW5nKSAmJiAoXHJcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgcHgtMlwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxyXG4gICAgICAgICAgICAgICAge2lzQ29tcGFjdCA/IDxTcGlubmVyIHNpemU9XCJoLTQgdy00XCIgLz4gOiA8U3Bpbm5lciAvPn1cclxuICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICl9XHJcblxyXG4gICAgICAgICAgICB7c2hvd1NlYXJjaEljb24gJiYgKFxyXG4gICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgcC0xLjUgdGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC1zbGF0ZS01MDBcIlxyXG4gICAgICAgICAgICAgICAgb25DbGljaz17cmVxdWVzdFNlYXJjaE9yT3Blbn1cclxuICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2luZFQoXCJWaXNpdHNfQ3JlYXRlX1NlYXJjaENsaWVudFwiLCBcIlNlYXJjaCBjbGllbnRcIil9XHJcbiAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgZmlsbD1cIm5vbmVcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgc3Ryb2tlV2lkdGg9ezEuNX0gc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgY2xhc3NOYW1lPXtzZWFyY2hJY29uU2l6ZX0+XHJcbiAgICAgICAgICAgICAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwibTE1Ljc1IDE1Ljc1LTIuNDg5LTIuNDg5bTAgMGEzLjM3NSAzLjM3NSAwIDEgMC00Ljc3My00Ljc3MyAzLjM3NSAzLjM3NSAwIDAgMCA0Ljc3NCA0Ljc3NFpNMjEgMTJhOSA5IDAgMSAxLTE4IDAgOSA5IDAgMCAxIDE4IDBaXCIgLz5cclxuICAgICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICApfVxyXG5cclxuICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHAtMS41IHRleHQtc2xhdGUtNTAwIGhvdmVyOnRleHQtc2xhdGUtNjAwXCJcclxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAobG9hZGluZyB8fCBibG9ja2luZykgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgaWYgKG9wZW4pIHtcclxuICAgICAgICAgICAgICAgICAgc2V0T3BlbihmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJlcXVlc3RTZWFyY2hPck9wZW4oKTtcclxuICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgIGRpc2FibGVkPXtsb2FkaW5nIHx8IGJsb2NraW5nfVxyXG4gICAgICAgICAgICAgIGFyaWEtbGFiZWw9e1xyXG4gICAgICAgICAgICAgICAgb3BlblxyXG4gICAgICAgICAgICAgICAgICA/IGluZFQoXCJWaXNpdHNfQ3JlYXRlX0hpZGVDbGllbnRPcHRpb25zXCIsIFwiSGlkZSBjbGllbnQgb3B0aW9uc1wiKVxyXG4gICAgICAgICAgICAgICAgICA6IGluZFQoXCJWaXNpdHNfQ3JlYXRlX1Nob3dDbGllbnRPcHRpb25zXCIsIFwiU2hvdyBjbGllbnQgb3B0aW9uc1wiKVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIHtvcGVuID8gPENoZXZyb25VcFN2ZyBjbGFzc05hbWU9e2NoZXZyb25JY29uU2l6ZX0gLz4gOiA8Q2hldnJvbkRvd25TdmcgY2xhc3NOYW1lPXtjaGV2cm9uSWNvblNpemV9IC8+fVxyXG4gICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8RmxvYXRpbmdMaXN0XHJcbiAgICAgICAgYW5jaG9yUmVmPXtib3hSZWZ9XHJcbiAgICAgICAgb3Blbj17b3Blbn1cclxuICAgICAgICB6SW5kZXg9ezQwMDAwMH1cclxuICAgICAgICBtYXhIZWlnaHRDbGFzcz1cIm1heC1oLTcyXCJcclxuICAgICAgICByb2xlPVwibGlzdGJveFwiXHJcbiAgICAgICAgcm91bmRlZENsYXNzPVwicm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV1cIlxuICAgICAgICBwb3J0YWxDbGFzc05hbWU9e3BvcnRhbENsYXNzTmFtZX1cclxuICAgICAgICBwYW5lbENsYXNzTmFtZT17cGFuZWxDbGFzc05hbWV9XHJcbiAgICAgID5cclxuICAgICAgICAgIDxkaXYgcmVmPXtsaXN0UmVmfSBpZD17bGlzdElkfT5cclxuICAgICAgICAgICAge29wdGlvbnMubGVuZ3RoID09PSAwICYmIChcclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17ZW1wdHlUZXh0Q2xhc3N9PlxyXG4gICAgICAgICAgICAgICAge3Nob3dOb3RGb3VuZFN0YXRlXHJcbiAgICAgICAgICAgICAgICAgID8gaW5kVChcIkNvbW1vbl9Ob3RGb3VuZFwiLCBcIk5vdCBmb3VuZFwiKVxyXG4gICAgICAgICAgICAgICAgICA6IHF1ZXJ5LnRyaW0oKS5sZW5ndGggPCBtaW5DaGFyc1xyXG4gICAgICAgICAgICAgICAgICA/IGluZEZvcm1hdChcIlZpc2l0c19DcmVhdGVfTWluQ2hhcnNcIiwgXCJUeXBlIGF0IGxlYXN0IHswfSBjaGFyYWN0ZXJzLlwiLCBtaW5DaGFycylcclxuICAgICAgICAgICAgICAgICAgOiBpbmRUKFwiVmlzaXRzX0NyZWF0ZV9Ob1Jlc3VsdHNcIiwgXCJObyByZXN1bHRzXCIpfVxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgICB7IWxvYWRpbmcgJiYgb3B0aW9ucy5sZW5ndGggPiAwICYmIGZpbHRlcmVkLmxlbmd0aCA9PT0gMCAmJiAoXHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2VtcHR5VGV4dENsYXNzfT57aW5kVChcIlZpc2l0c19DcmVhdGVfTm9NYXRjaGVzXCIsIFwiTm8gbWF0Y2hlc1wiKX08L2Rpdj5cclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgeyFsb2FkaW5nICYmXHJcbiAgICAgICAgICAgICAgZmlsdGVyZWQubWFwKChvcHQsIGlkeCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaXNBY3RpdmUgPSBpZHggPT09IHJlc29sdmVkQWN0aXZlSW5kZXg7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzZWwgPSBzZWxlY3RlZD8udmFsdWUgPT09IG9wdC52YWx1ZTtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgICAgICAgICAgICBrZXk9e29wdC52YWx1ZX1cclxuICAgICAgICAgICAgICAgICAgICBpZD17YCR7c2FmZUlkQmFzZX0tb3B0LSR7b3B0LnZhbHVlfWB9XHJcbiAgICAgICAgICAgICAgICAgICAgcm9sZT1cIm9wdGlvblwiXHJcbiAgICAgICAgICAgICAgICAgICAgYXJpYS1zZWxlY3RlZD17c2VsfVxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcclxuICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbkNsYXNzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgaXNBY3RpdmUgPyBcImJnLXByaW1hcnkgdGV4dC13aGl0ZVwiIDogc2VsID8gXCJiZy1wcmltYXJ5LzEwIHRleHQtcHJpbWFyeVwiIDogaXNDb21wYWN0ID8gXCJ0ZXh0LXNsYXRlLTcwMFwiIDogXCJ0ZXh0LXNsYXRlLTkwMFwiXHJcbiAgICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgICAgICBvbk1vdXNlRW50ZXI9eygpID0+IHNldEFjdGl2ZUluZGV4KGlkeCl9XHJcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2VsZWN0T3B0aW9uKG9wdCl9XHJcbiAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgc3BhY2UteS0wLjVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhvcHRpb25UZXh0Q2xhc3MsIHNlbCA/IFwiZm9udC1zZW1pYm9sZFwiIDogXCJmb250LW5vcm1hbFwiKX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtvcHQudGV4dH1cclxuICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgIHtpc0NvbXBhY3QgPyAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAge29wdC5jYXJnbyAmJiA8c3BhbiBjbGFzc05hbWU9e29wdGlvblN1YlRleHRDbGFzc30+e29wdC5jYXJnb308L3NwYW4+fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtvcHQuZW1wcmVzYSAmJiA8c3BhbiBjbGFzc05hbWU9e29wdGlvblN1YlRleHRTZWNvbmRhcnlDbGFzc30+e29wdC5lbXByZXNhfTwvc3Bhbj59XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgKSA6IChcclxuICAgICAgICAgICAgICAgICAgICAgICAgPD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e29wdGlvblN1YlRleHRDbGFzc30+e29wdC5jYXJnbyB8fCBcIlwifTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e29wdGlvblN1YlRleHRTZWNvbmRhcnlDbGFzc30+e29wdC5lbXByZXNhIHx8IFwiXCJ9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8Lz5cclxuICAgICAgICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICB9KX1cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvRmxvYXRpbmdMaXN0PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgZmxleCBqdXN0aWZ5LWVuZFwiPlxyXG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT17c3RhdHVzQ2xhc3N9PntzdGF0dXN9PC9zcGFuPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDbGllbnRTZWFyY2hDb21ib2JveDtcclxuIiwgImV4cG9ydCBjb25zdCBpc05vRGF0YVRleHQgPSAodmFsdWU6IHVua25vd24pOiBib29sZWFuID0+IHtcclxuICBjb25zdCByYXcgPSBTdHJpbmcodmFsdWUgfHwgXCJcIikudHJpbSgpLnRvTG93ZXJDYXNlKCk7XHJcbiAgaWYgKCFyYXcpIHJldHVybiBmYWxzZTtcclxuICBjb25zdCBub3JtYWxpemVkID0gcmF3LnJlcGxhY2UoL1teYS16MC05XSsvZywgXCJcIik7XHJcbiAgcmV0dXJuIG5vcm1hbGl6ZWQgPT09IFwic2luZGF0b3NcIiB8fCBub3JtYWxpemVkID09PSBcIm5vZGF0YVwiO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGlzTm9EYXRhUm93ID0gKHJvdzogdW5rbm93bik6IGJvb2xlYW4gPT4ge1xyXG4gIGlmIChyb3cgPT09IG51bGwgfHwgcm93ID09PSB1bmRlZmluZWQpIHJldHVybiB0cnVlO1xyXG4gIGlmIChBcnJheS5pc0FycmF5KHJvdykpIHtcclxuICAgIHJldHVybiByb3cubGVuZ3RoID09PSAxICYmIGlzTm9EYXRhVGV4dChyb3dbMF0pO1xyXG4gIH1cclxuICBpZiAodHlwZW9mIHJvdyA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgcmV0dXJuIGlzTm9EYXRhVGV4dChyb3cpO1xyXG4gIH1cclxuICBpZiAodHlwZW9mIHJvdyA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgY29uc3QgdmFsdWVzID0gT2JqZWN0LnZhbHVlcyhyb3cgYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj4pO1xyXG4gICAgaWYgKCF2YWx1ZXMubGVuZ3RoKSByZXR1cm4gdHJ1ZTtcclxuICAgIHJldHVybiB2YWx1ZXMuc29tZSgodikgPT4gdHlwZW9mIHYgPT09IFwic3RyaW5nXCIgJiYgaXNOb0RhdGFUZXh0KHYpKTtcclxuICB9XHJcbiAgcmV0dXJuIGZhbHNlO1xyXG59O1xyXG4iLCAiaW1wb3J0IHsgaXNOb0RhdGFSb3csIGlzTm9EYXRhVGV4dCB9IGZyb20gXCIuL25vRGF0YS50c1wiO1xyXG5cclxuZXhwb3J0IHR5cGUgQWNjb3VudEl0ZW0gPSB7XHJcbiAgdmFsdWU6IHN0cmluZztcclxuICB0ZXh0OiBzdHJpbmc7XHJcbiAgY2FyZ28/OiBzdHJpbmc7XHJcbiAgZW1wcmVzYT86IHN0cmluZztcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBtYXBBY2NvdW50SXRlbSA9IChpdGVtOiB1bmtub3duKTogQWNjb3VudEl0ZW0gfCBudWxsID0+IHtcclxuICBpZiAoaXNOb0RhdGFSb3coaXRlbSkpIHJldHVybiBudWxsO1xyXG4gIGlmIChBcnJheS5pc0FycmF5KGl0ZW0pKSB7XHJcbiAgICBjb25zdCBjb2RlID0gKGl0ZW1bMF0gfHwgXCJcIikudG9TdHJpbmcoKS50cmltKCk7XHJcbiAgICBjb25zdCBkZXNjID0gKGl0ZW1bMl0gfHwgKGl0ZW0gYXMgYW55KVsxXSB8fCBcIlwiKS50b1N0cmluZygpLnRyaW0oKTtcclxuICAgIGlmICghY29kZSB8fCBpc05vRGF0YVRleHQoY29kZSkgfHwgaXNOb0RhdGFUZXh0KGRlc2MpKSByZXR1cm4gbnVsbDtcclxuICAgIGNvbnN0IHRleHQgPSBkZXNjID8gYCR7ZGVzY30gKCR7Y29kZX0pYCA6IGNvZGU7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB2YWx1ZTogY29kZSxcclxuICAgICAgdGV4dCxcclxuICAgICAgY2FyZ286IFwiXCIsXHJcbiAgICAgIGVtcHJlc2E6IGl0ZW1bMl0gYXMgc3RyaW5nLFxyXG4gICAgfTtcclxuICB9XHJcbiAgaWYgKGl0ZW0gJiYgdHlwZW9mIGl0ZW0gPT09IFwib2JqZWN0XCIpIHtcclxuICAgIGNvbnN0IHJhdyA9IGl0ZW0gYXMgYW55O1xyXG4gICAgY29uc3QgY29kZSA9IChyYXcuYWNjb3VudE51bSB8fCByYXcuQWNjb3VudE51bSB8fCBcIlwiKS50b1N0cmluZygpLnRyaW0oKTtcclxuICAgIGNvbnN0IGRlc2MgPSAocmF3Lm5vbWJyZUNvbWVyY2lhbCB8fCByYXcuTm9tYnJlQ29tZXJjaWFsIHx8IHJhdy5yYXpvblNvY2lhbCB8fCByYXcuUmF6b25Tb2NpYWwgfHwgXCJcIilcclxuICAgICAgLnRvU3RyaW5nKClcclxuICAgICAgLnRyaW0oKTtcclxuICAgIGlmICghY29kZSB8fCBpc05vRGF0YVRleHQoY29kZSkgfHwgaXNOb0RhdGFUZXh0KGRlc2MpKSByZXR1cm4gbnVsbDtcclxuICAgIGNvbnN0IHRleHQgPSBkZXNjID8gYCR7ZGVzY30gKCR7Y29kZX0pYCA6IGNvZGU7XHJcbiAgICByZXR1cm4geyB2YWx1ZTogY29kZSwgdGV4dCB9O1xyXG4gIH1cclxuICByZXR1cm4gbnVsbDtcclxufTtcclxuIiwgImV4cG9ydCBjb25zdCBtYWtlQ2FjaGUgPSA8VD4obGltaXQgPSAxMCkgPT4ge1xyXG4gIGNvbnN0IG1hcCA9IG5ldyBNYXA8c3RyaW5nLCBUPigpO1xyXG4gIHJldHVybiB7XHJcbiAgICBnZXQ6IChrOiBzdHJpbmcpID0+IG1hcC5nZXQoayksXHJcbiAgICBzZXQ6IChrOiBzdHJpbmcsIHY6IFQpID0+IHtcclxuICAgICAgaWYgKG1hcC5oYXMoaykpIG1hcC5kZWxldGUoayk7XHJcbiAgICAgIG1hcC5zZXQoaywgdik7XHJcbiAgICAgIGlmIChtYXAuc2l6ZSA+IGxpbWl0KSB7XHJcbiAgICAgICAgY29uc3QgZmlyc3QgPSBtYXAua2V5cygpLm5leHQoKS52YWx1ZTtcclxuICAgICAgICBpZiAoZmlyc3QpIG1hcC5kZWxldGUoZmlyc3QpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgaGFzOiAoazogc3RyaW5nKSA9PiBtYXAuaGFzKGspLFxyXG4gICAgY2xlYXI6ICgpID0+IG1hcC5jbGVhcigpLFxyXG4gIH07XHJcbn07XHJcbiIsICJpbXBvcnQgeyBtYWtlQ2FjaGUgfSBmcm9tIFwiLi9tYWtlQ2FjaGUudHNcIjtcclxuXHJcbmNvbnN0IENVUlJFTlRfQ09NUEFOWSA9IFN0cmluZyhnbG9iYWxUaGlzLl9fSU5EX1NFTEVDVEVEX0NPTVBBTllfXyB8fCBcIlwiKS50cmltKCkudG9VcHBlckNhc2UoKTtcclxuY29uc3QgQ09NUEFOWV9TVE9SQUdFX1NVRkZJWCA9IENVUlJFTlRfQ09NUEFOWSA/IGBfJHtDVVJSRU5UX0NPTVBBTll9YCA6IFwiXCI7XHJcblxyXG5leHBvcnQgY29uc3QgVklTSVRfRFJBRlRfS0VZID0gYHZpc2l0YXNfZHJhZnQke0NPTVBBTllfU1RPUkFHRV9TVUZGSVh9YDtcclxuZXhwb3J0IGNvbnN0IENPTlRBQ1RTX1NUT1JBR0VfS0VZID0gYHZpc2l0YXNfY29udGFjdHNfY2FjaGVfdjEke0NPTVBBTllfU1RPUkFHRV9TVUZGSVh9YDtcclxuZXhwb3J0IGNvbnN0IENPTlRBQ1RTX1NFTEVDVElPTl9LRVkgPSBgdmlzaXRhc19jb250YWN0c19zZWxlY3RlZF92MSR7Q09NUEFOWV9TVE9SQUdFX1NVRkZJWH1gO1xyXG5leHBvcnQgY29uc3QgQ1JFQVRFX0ZSRVNIX1BBUkFNID0gXCJmcmVzaFwiO1xyXG5cclxuY29uc3QgY2xpZW50Q2FjaGUgPSBtYWtlQ2FjaGU8dW5rbm93bltdPigxMCk7XHJcbmNvbnN0IGNvbnRhY3RzQ2FjaGUgPSBtYWtlQ2FjaGU8dW5rbm93bltdPigxMCk7XHJcblxyXG5jb25zdCBjYWNoZUtleVdpdGhDb21wYW55ID0gKGtleTogc3RyaW5nKSA9PiBgJHtDVVJSRU5UX0NPTVBBTlkgfHwgXCJERUZBVUxUXCJ9Ojoke2tleX1gO1xyXG5cclxuY29uc3QgcmVhZFN0b3JhZ2UgPSAoa2V5OiBzdHJpbmcpOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHJhdyA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oa2V5KTtcclxuICAgIGlmICghcmF3KSByZXR1cm4ge307XHJcbiAgICByZXR1cm4gSlNPTi5wYXJzZShyYXcpO1xyXG4gIH0gY2F0Y2gge1xyXG4gICAgcmV0dXJuIHt9O1xyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IHdyaXRlU3RvcmFnZSA9IChrZXk6IHN0cmluZywgZGF0YTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pID0+IHtcclxuICB0cnkge1xyXG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShrZXksIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcclxuICB9IGNhdGNoIHtcclxuICAgIC8vIGlnbm9yZVxyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBnZXRDbGllbnRDYWNoZSA9IChxdWVyeTogc3RyaW5nKTogdW5rbm93bltdIHwgbnVsbCA9PiB7XHJcbiAgY29uc3QgY2FjaGVLZXkgPSBjYWNoZUtleVdpdGhDb21wYW55KHF1ZXJ5KTtcclxuICBpZiAoIWNsaWVudENhY2hlLmhhcyhjYWNoZUtleSkpIHJldHVybiBudWxsO1xyXG4gIHJldHVybiBjbGllbnRDYWNoZS5nZXQoY2FjaGVLZXkpIHx8IG51bGw7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgaGFzQ2xpZW50Q2FjaGUgPSAocXVlcnk6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xyXG4gIHJldHVybiBjbGllbnRDYWNoZS5oYXMoY2FjaGVLZXlXaXRoQ29tcGFueShxdWVyeSkpO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHNldENsaWVudENhY2hlID0gKHF1ZXJ5OiBzdHJpbmcsIGl0ZW1zOiB1bmtub3duW10pOiB2b2lkID0+IHtcclxuICBjbGllbnRDYWNoZS5zZXQoY2FjaGVLZXlXaXRoQ29tcGFueShxdWVyeSksIGl0ZW1zKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBnZXRDYWNoZWRDb250YWN0cyA9IChhY2NvdW50OiBzdHJpbmcpOiB1bmtub3duW10gfCBudWxsID0+IHtcclxuICBjb25zdCBjYWNoZUtleSA9IGNhY2hlS2V5V2l0aENvbXBhbnkoYWNjb3VudCk7XHJcbiAgaWYgKGNvbnRhY3RzQ2FjaGUuaGFzKGNhY2hlS2V5KSkgcmV0dXJuIGNvbnRhY3RzQ2FjaGUuZ2V0KGNhY2hlS2V5KSB8fCBudWxsO1xyXG4gIGNvbnN0IHN0b3JlID0gcmVhZFN0b3JhZ2UoQ09OVEFDVFNfU1RPUkFHRV9LRVkpO1xyXG4gIGNvbnN0IGNhY2hlZCA9IHN0b3JlW2FjY291bnRdO1xyXG4gIGlmIChBcnJheS5pc0FycmF5KGNhY2hlZCkpIHtcclxuICAgIGNvbnRhY3RzQ2FjaGUuc2V0KGNhY2hlS2V5LCBjYWNoZWQpO1xyXG4gICAgcmV0dXJuIGNhY2hlZDtcclxuICB9XHJcbiAgcmV0dXJuIG51bGw7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3Qgc2V0Q2FjaGVkQ29udGFjdHMgPSAoYWNjb3VudDogc3RyaW5nLCBpdGVtczogdW5rbm93bltdKTogdm9pZCA9PiB7XHJcbiAgY29udGFjdHNDYWNoZS5zZXQoY2FjaGVLZXlXaXRoQ29tcGFueShhY2NvdW50KSwgaXRlbXMpO1xyXG4gIGNvbnN0IHN0b3JlID0gcmVhZFN0b3JhZ2UoQ09OVEFDVFNfU1RPUkFHRV9LRVkpO1xyXG4gIHN0b3JlW2FjY291bnRdID0gaXRlbXM7XHJcbiAgd3JpdGVTdG9yYWdlKENPTlRBQ1RTX1NUT1JBR0VfS0VZLCBzdG9yZSk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0U3RvcmVkU2VsZWN0aW9uID0gKGFjY291bnQ6IHN0cmluZyk6IHVua25vd25bXSA9PiB7XHJcbiAgY29uc3Qgc3RvcmUgPSByZWFkU3RvcmFnZShDT05UQUNUU19TRUxFQ1RJT05fS0VZKTtcclxuICBjb25zdCByYXcgPSBzdG9yZVthY2NvdW50XTtcclxuICByZXR1cm4gQXJyYXkuaXNBcnJheShyYXcpID8gcmF3IDogW107XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3Qgc2V0U3RvcmVkU2VsZWN0aW9uID0gKGFjY291bnQ6IHN0cmluZywgaXRlbXM6IHVua25vd25bXSk6IHZvaWQgPT4ge1xyXG4gIGNvbnN0IHN0b3JlID0gcmVhZFN0b3JhZ2UoQ09OVEFDVFNfU0VMRUNUSU9OX0tFWSk7XHJcbiAgc3RvcmVbYWNjb3VudF0gPSBpdGVtcztcclxuICB3cml0ZVN0b3JhZ2UoQ09OVEFDVFNfU0VMRUNUSU9OX0tFWSwgc3RvcmUpO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGNsZWFyU3RvcmVkU2VsZWN0aW9uID0gKGFjY291bnQ6IHN0cmluZyk6IHZvaWQgPT4ge1xyXG4gIGNvbnN0IHN0b3JlID0gcmVhZFN0b3JhZ2UoQ09OVEFDVFNfU0VMRUNUSU9OX0tFWSk7XHJcbiAgaWYgKHN0b3JlW2FjY291bnRdKSB7XHJcbiAgICBkZWxldGUgc3RvcmVbYWNjb3VudF07XHJcbiAgICB3cml0ZVN0b3JhZ2UoQ09OVEFDVFNfU0VMRUNUSU9OX0tFWSwgc3RvcmUpO1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBjbGVhckNyZWF0ZVNlbGVjdGlvbkNhY2hlID0gKCk6IHZvaWQgPT4ge1xyXG4gIHRyeSB7XHJcbiAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKFZJU0lUX0RSQUZUX0tFWSk7XHJcbiAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKENPTlRBQ1RTX1NUT1JBR0VfS0VZKTtcclxuICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oQ09OVEFDVFNfU0VMRUNUSU9OX0tFWSk7XHJcbiAgfSBjYXRjaCB7XHJcbiAgICAvLyBpZ25vcmVcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3Qgc3RyaXBGcmVzaFBhcmFtID0gKCk6IHZvaWQgPT4ge1xyXG4gIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm47XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHVybCA9IG5ldyBVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xyXG4gICAgaWYgKCF1cmwuc2VhcmNoUGFyYW1zLmhhcyhDUkVBVEVfRlJFU0hfUEFSQU0pKSByZXR1cm47XHJcbiAgICB1cmwuc2VhcmNoUGFyYW1zLmRlbGV0ZShDUkVBVEVfRlJFU0hfUEFSQU0pO1xyXG4gICAgY29uc3QgbmV4dCA9IGAke3VybC5wYXRobmFtZX0ke3VybC5zZWFyY2h9JHt1cmwuaGFzaH1gO1xyXG4gICAgd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKHt9LCBcIlwiLCBuZXh0KTtcclxuICB9IGNhdGNoIHtcclxuICAgIC8vIGlnbm9yZVxyXG4gIH1cclxufTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbUJBQXlFOzs7QUNBbEUsSUFBTSxlQUFlLENBQUMsVUFBNEI7QUFDdkQsUUFBTSxNQUFNLE9BQU8sU0FBUyxFQUFFLEVBQUUsS0FBSyxFQUFFLFlBQVk7QUFDbkQsTUFBSSxDQUFDLElBQUssUUFBTztBQUNqQixRQUFNLGFBQWEsSUFBSSxRQUFRLGVBQWUsRUFBRTtBQUNoRCxTQUFPLGVBQWUsY0FBYyxlQUFlO0FBQ3JEO0FBRU8sSUFBTSxjQUFjLENBQUMsUUFBMEI7QUFDcEQsTUFBSSxRQUFRLFFBQVEsUUFBUSxPQUFXLFFBQU87QUFDOUMsTUFBSSxNQUFNLFFBQVEsR0FBRyxHQUFHO0FBQ3RCLFdBQU8sSUFBSSxXQUFXLEtBQUssYUFBYSxJQUFJLENBQUMsQ0FBQztBQUFBLEVBQ2hEO0FBQ0EsTUFBSSxPQUFPLFFBQVEsVUFBVTtBQUMzQixXQUFPLGFBQWEsR0FBRztBQUFBLEVBQ3pCO0FBQ0EsTUFBSSxPQUFPLFFBQVEsVUFBVTtBQUMzQixVQUFNLFNBQVMsT0FBTyxPQUFPLEdBQThCO0FBQzNELFFBQUksQ0FBQyxPQUFPLE9BQVEsUUFBTztBQUMzQixXQUFPLE9BQU8sS0FBSyxDQUFDLE1BQU0sT0FBTyxNQUFN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QUFBQSxVQUNmLE1BQUs7QUFBQSxVQUNMLGNBQWE7QUFBQSxVQUNiO0FBQUEsVUFDQTtBQUFBLFVBRUUsdURBQUMsU0FBSSxLQUFLLFNBQVMsSUFBSSxRQUNwQjtBQUFBLG9CQUFRLFdBQVcsS0FDbEIsNENBQUMsU0FBSSxXQUFXLGdCQUNiLDhCQUNHLEtBQUssbUJBQW1CLFdBQVcsSUFDbkMsTUFBTSxLQUFLLEVBQUUsU0FBUyxXQUN0QixVQUFVLDBCQUEwQixpQ0FBaUMsUUFBUSxJQUM3RSxLQUFLLDJCQUEyQixZQUFZLEdBQ2xEO0FBQUEsWUFFRCxDQUFDLFdBQVcsUUFBUSxTQUFTLEtBQUssU0FBUyxXQUFXLEtBQ3JELDRDQUFDLFNBQUksV0FBVyxnQkFBaUIsZUFBSywyQkFBMkIsWUFBWSxHQUFFO0FBQUEsWUFFaEYsQ0FBQyxXQUNBLFNBQVMsSUFBSSxDQUFDLEtBQUssUUFBUTtBQUN6QixvQkFBTSxXQUFXLFFBQVE7QUFDekIsb0JBQU0sTUFBTSxVQUFVLFVBQVUsSUFBSTtBQUNwQyxxQkFDRTtBQUFBLGdCQUFDO0FBQUE7QUFBQSxrQkFDQyxNQUFLO0FBQUEsa0JBRUwsSUFBSSxHQUFHLFVBQVUsUUFBUSxJQUFJLEtBQUs7QUFBQSxrQkFDbEMsTUFBSztBQUFBLGtCQUNMLGlCQUFlO0FBQUEsa0JBQ2YsV0FBVztBQUFBLG9CQUNUO0FBQUEsb0JBQ0EsV0FBVywwQkFBMEIsTUFBTSwrQkFBK0IsWUFBWSxtQkFBbUI7QUFBQSxrQkFDM0c7QUFBQSxrQkFDQSxjQUFjLE1BQU0sZUFBZSxHQUFHO0FBQUEsa0JBQ3RDLFNBQVMsTUFBTSxhQUFhLEdBQUc7QUFBQSxrQkFFL0IsdURBQUMsU0FBSSxXQUFVLDZCQUNiO0FBQUEsZ0VBQUMsVUFBSyxXQUFXLFdBQVcsaUJBQWlCLE1BQU0sa0JBQWtCLGFBQWEsR0FDL0UsY0FBSSxNQUNQO0FBQUEsb0JBQ0MsWUFDQyw0RUFDRztBQUFBLDBCQUFJLFNBQVMsNENBQUMsVUFBSyxXQUFXLG9CQUFxQixjQUFJLE9BQU07QUFBQSxzQkFDN0QsSUFBSSxXQUFXLDRDQUFDLFVBQUssV0FBVyw2QkFBOEIsY0FBSSxTQUFRO0FBQUEsdUJBQzdFLElBRUEsNEVBQ0U7QUFBQSxrRUFBQyxVQUFLLFdBQVcsb0JBQXFCLGNBQUksU0FBUyxJQUFHO0FBQUEsc0JBQ3RELDRDQUFDLFVBQUssV0FBVyw2QkFBOEIsY0FBSSxXQUFXLElBQUc7QUFBQSx1QkFDbkU7QUFBQSxxQkFFSjtBQUFBO0FBQUEsZ0JBMUJLLElBQUk7QUFBQSxjQTJCWDtBQUFBLFlBRUosQ0FBQztBQUFBLGFBQ0w7QUFBQTtBQUFBLE1BQ0Y7QUFBQSxPQUNGO0FBQUEsSUFDQSw0Q0FBQyxTQUFJLFdBQVUsMkJBQ2Isc0RBQUMsVUFBSyxXQUFXLGFBQWMsa0JBQU8sR0FDeEM7QUFBQSxLQUNGO0FBRUo7QUFFQSxJQUFPLCtCQUFROyIsCiAgIm5hbWVzIjogWyJpc1NlbGVjdGlvbkRpc3BsYXkiXQp9Cg==
