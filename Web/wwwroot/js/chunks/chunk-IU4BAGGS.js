import {
  handleComboboxKeyDown
} from "./chunk-YMDESVRK.js";
import {
  ChevronDownSvg,
  ChevronUpSvg,
  FloatingList_default,
  useOutsideClick
} from "./chunk-CGLQ74CG.js";
import {
  Spinner_default,
  classNames
} from "./chunk-3DMDYLVT.js";
import {
  require_jsx_runtime,
  require_react
} from "./chunk-WUZVRL45.js";
import {
  fetchJson,
  indFormat,
  indT
} from "./chunk-5TAE4PEJ.js";
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvdmlzaXRhcy9DbGllbnRTZWFyY2hDb21ib2JveC50c3giLCAiLi4vLi4vcmVhY3Qvc3JjL3V0aWxzL25vRGF0YS50cyIsICIuLi8uLi9yZWFjdC9zcmMvdXRpbHMvdmlzaXRhc01hcHBpbmcudHMiLCAiLi4vLi4vcmVhY3Qvc3JjL3V0aWxzL21ha2VDYWNoZS50cyIsICIuLi8uLi9yZWFjdC9zcmMvdXRpbHMvdmlzaXRhc1N0b3JhZ2UudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBGbG9hdGluZ0xpc3QgZnJvbSBcIi4uL2NvbW1vbnMvRmxvYXRpbmdMaXN0LnRzeFwiO1xyXG5pbXBvcnQgU3Bpbm5lciBmcm9tIFwiLi4vY29tbW9ucy9TcGlubmVyLnRzeFwiO1xyXG5pbXBvcnQgeyBDaGV2cm9uRG93blN2ZywgQ2hldnJvblVwU3ZnIH0gZnJvbSBcIi4uL2NvbW1vbnMvY2hldnJvbnMudHN4XCI7XHJcbmltcG9ydCB7IGZldGNoSnNvbiB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XHJcbmltcG9ydCB7IGhhbmRsZUNvbWJvYm94S2V5RG93biB9IGZyb20gXCIuLi8uLi9ob29rcy91c2VDb21ib2JveEtleWJvYXJkLnRzXCI7XHJcbmltcG9ydCB7IHVzZU91dHNpZGVDbGljayB9IGZyb20gXCIuLi8uLi9ob29rcy91c2VPdXRzaWRlQ2xpY2sudHNcIjtcclxuaW1wb3J0IHsgY2xhc3NOYW1lcyB9IGZyb20gXCIuLi8uLi91dGlscy9jbGFzc05hbWVzLnRzXCI7XHJcbmltcG9ydCB7IGluZEZvcm1hdCwgaW5kVCB9IGZyb20gXCIuLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB7IG1hcEFjY291bnRJdGVtIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Zpc2l0YXNNYXBwaW5nLnRzXCI7XHJcbmltcG9ydCB7IGdldENsaWVudENhY2hlLCBoYXNDbGllbnRDYWNoZSwgc2V0Q2xpZW50Q2FjaGUgfSBmcm9tIFwiLi4vLi4vdXRpbHMvdmlzaXRhc1N0b3JhZ2UudHNcIjtcclxuXHJcbmV4cG9ydCB0eXBlIENsaWVudE9wdGlvbiA9IHtcclxuICB2YWx1ZTogc3RyaW5nO1xyXG4gIHRleHQ6IHN0cmluZztcclxuICBjYXJnbz86IHN0cmluZztcclxuICBlbXByZXNhPzogc3RyaW5nO1xyXG59O1xyXG5cclxudHlwZSBWYXJpYW50ID0gXCJkZWZhdWx0XCIgfCBcImNvbXBhY3RcIjtcclxuXHJcbnR5cGUgQ2xpZW50U2VhcmNoQ29tYm9ib3hQcm9wcyA9IHtcclxuICB2YWx1ZTogQ2xpZW50T3B0aW9uIHwgbnVsbDtcclxuICBvblNlbGVjdGVkOiAodmFsdWU6IENsaWVudE9wdGlvbiB8IG51bGwpID0+IHZvaWQ7XHJcbiAgbGFiZWw/OiBzdHJpbmc7XHJcbiAgcGxhY2Vob2xkZXI/OiBzdHJpbmc7XHJcbiAgdmFyaWFudD86IFZhcmlhbnQ7XHJcbiAgc2hvd0xhYmVsPzogYm9vbGVhbjtcclxuICBpZEJhc2U/OiBzdHJpbmc7XHJcbiAgY2xlYXJPbk51bGw/OiBib29sZWFuO1xyXG4gIHBvcnRhbENsYXNzTmFtZT86IHN0cmluZztcclxuICBwYW5lbENsYXNzTmFtZT86IHN0cmluZztcclxufTtcclxuXHJcbi8vIFJldXNhYmxlIGNsaWVudCBzZWFyY2ggY29tYm9ib3ggZm9yIHZpc2l0YXMgcGFnZXMuXHJcbmNvbnN0IENsaWVudFNlYXJjaENvbWJvYm94ID0gKHtcclxuICB2YWx1ZSxcclxuICBvblNlbGVjdGVkLFxyXG4gIGxhYmVsLFxyXG4gIHBsYWNlaG9sZGVyLFxyXG4gIHZhcmlhbnQgPSBcImRlZmF1bHRcIixcclxuICBzaG93TGFiZWwsXHJcbiAgaWRCYXNlLFxyXG4gIGNsZWFyT25OdWxsLFxyXG4gIHBvcnRhbENsYXNzTmFtZSxcclxuICBwYW5lbENsYXNzTmFtZSxcclxufTogQ2xpZW50U2VhcmNoQ29tYm9ib3hQcm9wcykgPT4ge1xyXG4gIGNvbnN0IGlzQ29tcGFjdCA9IHZhcmlhbnQgPT09IFwiY29tcGFjdFwiO1xyXG4gIGNvbnN0IHJlc29sdmVkTGFiZWwgPSBsYWJlbCB8fCBpbmRUKFwiVmlzaXRzX0NyZWF0ZV9TZWFyY2hDbGllbnRcIiwgXCJTZWFyY2ggY2xpZW50XCIpO1xyXG4gIGNvbnN0IHJlc29sdmVkUGxhY2Vob2xkZXIgPSBwbGFjZWhvbGRlciB8fCByZXNvbHZlZExhYmVsO1xyXG4gIGNvbnN0IHNob3VsZFNob3dMYWJlbCA9IHNob3dMYWJlbCA/PyAhaXNDb21wYWN0O1xyXG4gIGNvbnN0IHNob3VsZENsZWFyT25OdWxsID0gY2xlYXJPbk51bGwgPz8gaXNDb21wYWN0O1xyXG4gIGNvbnN0IG1pbkNoYXJzID0gNDtcclxuXHJcbiAgY29uc3QgW3F1ZXJ5LCBzZXRRdWVyeV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbb3B0aW9ucywgc2V0T3B0aW9uc10gPSB1c2VTdGF0ZTxDbGllbnRPcHRpb25bXT4oW10pO1xyXG4gIGNvbnN0IFtmZXRjaGVkUXVlcnksIHNldEZldGNoZWRRdWVyeV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW2xvYWRpbmdNb3JlLCBzZXRMb2FkaW5nTW9yZV0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW3N0YXR1cywgc2V0U3RhdHVzXSA9IHVzZVN0YXRlKGluZEZvcm1hdChcIlZpc2l0c19DcmVhdGVfTWluQ2hhcnNcIiwgXCJUeXBlIGF0IGxlYXN0IHswfSBjaGFyYWN0ZXJzLlwiLCBtaW5DaGFycykpO1xyXG4gIGNvbnN0IFtzZWxlY3RlZCwgc2V0U2VsZWN0ZWRdID0gdXNlU3RhdGU8Q2xpZW50T3B0aW9uIHwgbnVsbD4odmFsdWUpO1xyXG4gIGNvbnN0IFtvcGVuLCBzZXRPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbcGFnZSwgc2V0UGFnZV0gPSB1c2VTdGF0ZSgxKTtcclxuICBjb25zdCBbaGFzTW9yZSwgc2V0SGFzTW9yZV0gPSB1c2VTdGF0ZSh0cnVlKTtcclxuICBjb25zdCBbYmxvY2tpbmcsIHNldEJsb2NraW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbYWN0aXZlSW5kZXgsIHNldEFjdGl2ZUluZGV4XSA9IHVzZVN0YXRlKDApO1xyXG4gIGNvbnN0IFtzaG93Tm90Rm91bmRTdGF0ZSwgc2V0U2hvd05vdEZvdW5kU3RhdGVdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IGxpc3RSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBjb250YWluZXJSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBib3hSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBhYm9ydFJlZiA9IHVzZVJlZjxBYm9ydENvbnRyb2xsZXIgfCBudWxsPihudWxsKTtcclxuXHJcbiAgdXNlT3V0c2lkZUNsaWNrKFtjb250YWluZXJSZWYsIGxpc3RSZWZdLCAoKSA9PiB7XHJcbiAgICBzZXRTaG93Tm90Rm91bmRTdGF0ZShmYWxzZSk7XHJcbiAgICBzZXRPcGVuKGZhbHNlKTtcclxuICB9KTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghdmFsdWUpIHtcclxuICAgICAgaWYgKHNob3VsZENsZWFyT25OdWxsKSB7XHJcbiAgICAgICAgc2V0U2VsZWN0ZWQobnVsbCk7XHJcbiAgICAgICAgc2V0UXVlcnkoXCJcIik7XHJcbiAgICAgICAgc2V0U2hvd05vdEZvdW5kU3RhdGUoZmFsc2UpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHNldFNlbGVjdGVkKHZhbHVlKTtcclxuICAgIHNldFF1ZXJ5KHZhbHVlLnRleHQgfHwgXCJcIik7XHJcbiAgICBzZXRTaG93Tm90Rm91bmRTdGF0ZShmYWxzZSk7XHJcbiAgfSwgW3ZhbHVlLCBzaG91bGRDbGVhck9uTnVsbF0pO1xyXG5cclxuICBjb25zdCBmaWx0ZXJlZCA9IHVzZU1lbW8oKCkgPT4ge1xyXG4gICAgaWYgKCFxdWVyeS50cmltKCkpIHJldHVybiBvcHRpb25zO1xyXG4gICAgY29uc3QgcSA9IHF1ZXJ5LnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgaWYgKGZldGNoZWRRdWVyeSAmJiBxICE9PSBmZXRjaGVkUXVlcnkpIHJldHVybiBvcHRpb25zO1xyXG4gICAgY29uc3QgbWF0Y2ggPSBvcHRpb25zLmZpbHRlcigobykgPT4gby50ZXh0LnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMocSkpO1xyXG4gICAgcmV0dXJuIG1hdGNoLmxlbmd0aCA+IDAgPyBtYXRjaCA6IG9wdGlvbnM7XHJcbiAgfSwgW29wdGlvbnMsIHF1ZXJ5LCBmZXRjaGVkUXVlcnldKTtcclxuICBjb25zdCByZXNvbHZlZEFjdGl2ZUluZGV4ID1cclxuICAgIGZpbHRlcmVkLmxlbmd0aCA+IDAgPyBNYXRoLm1pbihNYXRoLm1heChhY3RpdmVJbmRleCwgMCksIGZpbHRlcmVkLmxlbmd0aCAtIDEpIDogMDtcclxuXHJcbiAgY29uc3QgY2FuY2VsUGVuZGluZyA9ICgpID0+IHtcclxuICAgIGlmIChhYm9ydFJlZi5jdXJyZW50KSB7XHJcbiAgICAgIGFib3J0UmVmLmN1cnJlbnQuYWJvcnQoKTtcclxuICAgICAgYWJvcnRSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIGlmIChhYm9ydFJlZi5jdXJyZW50KSB7XHJcbiAgICAgICAgYWJvcnRSZWYuY3VycmVudC5hYm9ydCgpO1xyXG4gICAgICAgIGFib3J0UmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3Qgc2VhcmNoID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgY29uc3QgY3VycmVudFF1ZXJ5ID0gcXVlcnkudHJpbSgpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICBpZiAoY3VycmVudFF1ZXJ5Lmxlbmd0aCA8IG1pbkNoYXJzKSB7XHJcbiAgICAgIHNldFNob3dOb3RGb3VuZFN0YXRlKGZhbHNlKTtcclxuICAgICAgc2V0U3RhdHVzKGluZEZvcm1hdChcIlZpc2l0c19DcmVhdGVfTWluQ2hhcnNcIiwgXCJUeXBlIGF0IGxlYXN0IHswfSBjaGFyYWN0ZXJzLlwiLCBtaW5DaGFycykpO1xyXG4gICAgICBzZXRPcHRpb25zKFtdKTtcclxuICAgICAgc2V0SGFzTW9yZShmYWxzZSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNhbmNlbFBlbmRpbmcoKTtcclxuICAgIHNldFBhZ2UoMSk7XHJcbiAgICBzZXRIYXNNb3JlKHRydWUpO1xyXG4gICAgc2V0T3BlbihmYWxzZSk7XHJcbiAgICBjb25zdCBjYWNoZUtleSA9IHF1ZXJ5LnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgaWYgKGhhc0NsaWVudENhY2hlKGNhY2hlS2V5KSkge1xyXG4gICAgICBjb25zdCBjYWNoZWQgPSAoZ2V0Q2xpZW50Q2FjaGUoY2FjaGVLZXkpIHx8IFtdKSBhcyBDbGllbnRPcHRpb25bXTtcclxuICAgICAgc2V0QWN0aXZlSW5kZXgoMCk7XHJcbiAgICAgIHNldEZldGNoZWRRdWVyeShjdXJyZW50UXVlcnkpO1xyXG4gICAgICBzZXRPcHRpb25zKGNhY2hlZCk7XHJcbiAgICAgIGlmIChjYWNoZWQubGVuZ3RoIDwgMSkge1xyXG4gICAgICAgIHNldFNlbGVjdGVkKG51bGwpO1xyXG4gICAgICAgIHNldFF1ZXJ5KFwiXCIpO1xyXG4gICAgICAgIHNldFNob3dOb3RGb3VuZFN0YXRlKHRydWUpO1xyXG4gICAgICAgIG9uU2VsZWN0ZWQobnVsbCk7XHJcbiAgICAgICAgc2V0U3RhdHVzKGluZFQoXCJDb21tb25fTm90Rm91bmRcIiwgXCJOb3QgZm91bmRcIikpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNldFNob3dOb3RGb3VuZFN0YXRlKGZhbHNlKTtcclxuICAgICAgICBzZXRTdGF0dXMoaW5kRm9ybWF0KFwiVmlzaXRzX0NyZWF0ZV9DbGllbnRDb3VudENhY2hlXCIsIFwiezB9IGNsaWVudHMgKGNhY2hlKVwiLCBjYWNoZWQubGVuZ3RoKSk7XHJcbiAgICAgIH1cclxuICAgICAgc2V0SGFzTW9yZShjYWNoZWQubGVuZ3RoID09PSAxMCk7XHJcbiAgICAgIHNldE9wZW4odHJ1ZSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHNldExvYWRpbmcodHJ1ZSk7XHJcbiAgICBzZXRCbG9ja2luZyh0cnVlKTtcclxuICAgIHNldFN0YXR1cyhpbmRUKFwiVmlzaXRzX0NyZWF0ZV9TZWFyY2hpbmdcIiwgXCJTZWFyY2hpbmcuLi5cIikpO1xyXG4gICAgY29uc3QgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcclxuICAgIGFib3J0UmVmLmN1cnJlbnQgPSBjb250cm9sbGVyO1xyXG4gICAgbGV0IHNob3VsZE9wZW5PbkZpbmlzaCA9IGZhbHNlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgdXJsID0gYC9WaXNpdGFzL0dldEFjY291bnRzRm9yRHJvcGRvd24/dGVybT0ke2VuY29kZVVSSUNvbXBvbmVudChxdWVyeSl9JnBhZ2U9MSZwYWdlU2l6ZT0xMGA7XHJcbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBmZXRjaEpzb248eyBpdGVtcz86IHVua25vd25bXSB9Pih1cmwsIHsgc2lnbmFsOiBjb250cm9sbGVyLnNpZ25hbCB9KTtcclxuICAgICAgY29uc3QgaXRlbXMgPSAoZGF0YS5pdGVtcyB8fCBbXSkubWFwKG1hcEFjY291bnRJdGVtKS5maWx0ZXIoQm9vbGVhbikgYXMgQ2xpZW50T3B0aW9uW107XHJcbiAgICAgIHNldEFjdGl2ZUluZGV4KDApO1xyXG4gICAgICBzZXRGZXRjaGVkUXVlcnkoY3VycmVudFF1ZXJ5KTtcclxuICAgICAgc2V0Q2xpZW50Q2FjaGUoY2FjaGVLZXksIGl0ZW1zKTtcclxuICAgICAgc2V0T3B0aW9ucyhpdGVtcyk7XHJcbiAgICAgIGlmIChpdGVtcy5sZW5ndGggPCAxKSB7XHJcbiAgICAgICAgc2V0U2VsZWN0ZWQobnVsbCk7XHJcbiAgICAgICAgc2V0UXVlcnkoXCJcIik7XHJcbiAgICAgICAgc2V0U2hvd05vdEZvdW5kU3RhdGUodHJ1ZSk7XHJcbiAgICAgICAgb25TZWxlY3RlZChudWxsKTtcclxuICAgICAgICBzZXRTdGF0dXMoaW5kVChcIkNvbW1vbl9Ob3RGb3VuZFwiLCBcIk5vdCBmb3VuZFwiKSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc2V0U2hvd05vdEZvdW5kU3RhdGUoZmFsc2UpO1xyXG4gICAgICAgIHNldFN0YXR1cyhpbmRGb3JtYXQoXCJWaXNpdHNfQ3JlYXRlX0NsaWVudENvdW50XCIsIFwiezB9IGNsaWVudHNcIiwgaXRlbXMubGVuZ3RoKSk7XHJcbiAgICAgIH1cclxuICAgICAgc2V0SGFzTW9yZShpdGVtcy5sZW5ndGggPT09IDEwKTtcclxuICAgICAgc2hvdWxkT3Blbk9uRmluaXNoID0gdHJ1ZTtcclxuICAgIH0gY2F0Y2ggKGVycjogYW55KSB7XHJcbiAgICAgIGlmIChlcnI/Lm5hbWUgPT09IFwiQWJvcnRFcnJvclwiKSB7XHJcbiAgICAgICAgc2V0U3RhdHVzKGluZFQoXCJWaXNpdHNfQ3JlYXRlX1NlYXJjaENhbmNlbGVkXCIsIFwiU2VhcmNoIGNhbmNlbGVkLlwiKSk7XHJcbiAgICAgIH0gZWxzZSBpZiAoU3RyaW5nKGVycj8ubWVzc2FnZSB8fCBcIlwiKS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKFwidGltZW91dFwiKSkge1xyXG4gICAgICAgIHNldFN0YXR1cyhpbmRUKFwiVmlzaXRzX0NyZWF0ZV9TZWFyY2hUaW1lb3V0XCIsIFwiVGhlIHNlYXJjaCB0b29rIHRvbyBsb25nLiBUeXBlIG1vcmUgY2hhcmFjdGVycyB0byBuYXJyb3cgZG93bi5cIikpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNldFN0YXR1cyhpbmRUKFwiVmlzaXRzX0NyZWF0ZV9Mb2FkQ2xpZW50c0Vycm9yXCIsIFwiRmFpbGVkIHRvIGxvYWQgY2xpZW50cy5cIikpO1xyXG4gICAgICB9XHJcbiAgICB9IGZpbmFsbHkge1xyXG4gICAgICBhYm9ydFJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XHJcbiAgICAgIHNldEJsb2NraW5nKGZhbHNlKTtcclxuICAgICAgaWYgKHNob3VsZE9wZW5PbkZpbmlzaCkgc2V0T3Blbih0cnVlKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBjb25zdCBsb2FkTW9yZSA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcclxuICAgIGlmIChsb2FkaW5nTW9yZSB8fCBsb2FkaW5nIHx8ICFoYXNNb3JlIHx8IHF1ZXJ5LnRyaW0oKS5sZW5ndGggPCBtaW5DaGFycykgcmV0dXJuO1xyXG4gICAgc2V0TG9hZGluZ01vcmUodHJ1ZSk7XHJcbiAgICBzZXRCbG9ja2luZyh0cnVlKTtcclxuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XHJcbiAgICBhYm9ydFJlZi5jdXJyZW50ID0gY29udHJvbGxlcjtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IG5leHRQYWdlID0gcGFnZSArIDE7XHJcbiAgICAgIGNvbnN0IHVybCA9IGAvVmlzaXRhcy9HZXRBY2NvdW50c0ZvckRyb3Bkb3duP3Rlcm09JHtlbmNvZGVVUklDb21wb25lbnQocXVlcnkpfSZwYWdlPSR7bmV4dFBhZ2V9JnBhZ2VTaXplPTEwYDtcclxuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IGZldGNoSnNvbjx7IGl0ZW1zPzogdW5rbm93bltdIH0+KHVybCwgeyBzaWduYWw6IGNvbnRyb2xsZXIuc2lnbmFsIH0pO1xyXG4gICAgICBjb25zdCBpdGVtcyA9IChkYXRhLml0ZW1zIHx8IFtdKS5tYXAobWFwQWNjb3VudEl0ZW0pLmZpbHRlcihCb29sZWFuKSBhcyBDbGllbnRPcHRpb25bXTtcclxuICAgICAgc2V0T3B0aW9ucygocHJldikgPT4gWy4uLnByZXYsIC4uLml0ZW1zXSk7XHJcbiAgICAgIHNldFBhZ2UobmV4dFBhZ2UpO1xyXG4gICAgICBzZXRIYXNNb3JlKGl0ZW1zLmxlbmd0aCA9PT0gMTApO1xyXG4gICAgfSBmaW5hbGx5IHtcclxuICAgICAgYWJvcnRSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgIHNldExvYWRpbmdNb3JlKGZhbHNlKTtcclxuICAgICAgc2V0QmxvY2tpbmcoZmFsc2UpO1xyXG4gICAgfVxyXG4gIH0sIFtsb2FkaW5nTW9yZSwgbG9hZGluZywgaGFzTW9yZSwgcXVlcnksIHBhZ2UsIG1pbkNoYXJzXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIW9wZW4gfHwgIWxpc3RSZWYuY3VycmVudCkgcmV0dXJuO1xyXG4gICAgY29uc3QgZWwgPSBsaXN0UmVmLmN1cnJlbnQ7XHJcbiAgICBjb25zdCBvblNjcm9sbCA9ICgpID0+IHtcclxuICAgICAgaWYgKGVsLnNjcm9sbFRvcCArIGVsLmNsaWVudEhlaWdodCA+PSBlbC5zY3JvbGxIZWlnaHQgLSA4KSBsb2FkTW9yZSgpO1xyXG4gICAgfTtcclxuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgb25TY3JvbGwsIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcclxuICAgIHJldHVybiAoKSA9PiBlbC5yZW1vdmVFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIG9uU2Nyb2xsKTtcclxuICB9LCBbb3BlbiwgbG9hZE1vcmVdKTtcclxuXHJcbiAgY29uc3Qgc2VsZWN0T3B0aW9uID0gKG9wdDogQ2xpZW50T3B0aW9uKSA9PiB7XHJcbiAgICBzZXRTZWxlY3RlZChvcHQpO1xyXG4gICAgc2V0UXVlcnkob3B0LnRleHQpO1xyXG4gICAgc2V0U2hvd05vdEZvdW5kU3RhdGUoZmFsc2UpO1xyXG4gICAgc2V0T3BlbihmYWxzZSk7XHJcbiAgICBvblNlbGVjdGVkKG9wdCk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgcmVxdWVzdFNlYXJjaE9yT3BlbiA9ICgpID0+IHtcclxuICAgIGlmIChsb2FkaW5nIHx8IGJsb2NraW5nKSByZXR1cm47XHJcbiAgICBjb25zdCB0cmltbWVkID0gcXVlcnkudHJpbSgpO1xyXG4gICAgaWYgKHRyaW1tZWQubGVuZ3RoIDwgbWluQ2hhcnMpIHtcclxuICAgICAgY2FuY2VsUGVuZGluZygpO1xyXG4gICAgICBzZXRTaG93Tm90Rm91bmRTdGF0ZShmYWxzZSk7XHJcbiAgICAgIHNldE9wdGlvbnMoW10pO1xyXG4gICAgICBzZXRIYXNNb3JlKGZhbHNlKTtcclxuICAgICAgc2V0U3RhdHVzKGluZEZvcm1hdChcIlZpc2l0c19DcmVhdGVfTWluQ2hhcnNcIiwgXCJUeXBlIGF0IGxlYXN0IHswfSBjaGFyYWN0ZXJzLlwiLCBtaW5DaGFycykpO1xyXG4gICAgICBzZXRPcGVuKHRydWUpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcUtleSA9IHRyaW1tZWQudG9Mb3dlckNhc2UoKTtcclxuICAgIGNvbnN0IGlzU2VsZWN0aW9uRGlzcGxheSA9ICEhc2VsZWN0ZWQgJiYgcXVlcnkgPT09IChzZWxlY3RlZC50ZXh0IHx8IFwiXCIpO1xyXG4gICAgY29uc3Qgc2hvdWxkU2VhcmNoID0gIWlzU2VsZWN0aW9uRGlzcGxheSAmJiBxS2V5ICE9PSBmZXRjaGVkUXVlcnk7XHJcblxyXG4gICAgaWYgKHNob3VsZFNlYXJjaCkge1xyXG4gICAgICBzZWFyY2goKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHNldE9wZW4odHJ1ZSk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaGFuZGxlS2V5RG93biA9IChldjogUmVhY3QuS2V5Ym9hcmRFdmVudDxIVE1MSW5wdXRFbGVtZW50PikgPT4ge1xyXG4gICAgaGFuZGxlQ29tYm9ib3hLZXlEb3duKGV2LCB7XHJcbiAgICAgIGlzT3Blbjogb3BlbixcclxuICAgICAgc2V0T3BlbixcclxuICAgICAgb3B0aW9uQ291bnQ6IGZpbHRlcmVkLmxlbmd0aCxcclxuICAgICAgc2V0QWN0aXZlSW5kZXgsXHJcbiAgICAgIHJlcXVpcmVPcGVuRm9yQXJyb3dzOiB0cnVlLFxyXG4gICAgICBvbkVudGVyV2hlbk9wZW46ICgpID0+IHtcclxuICAgICAgICBpZiAoZmlsdGVyZWQubGVuZ3RoIDwgMSkge1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZWxlY3RPcHRpb24oZmlsdGVyZWRbcmVzb2x2ZWRBY3RpdmVJbmRleF0gPz8gZmlsdGVyZWRbMF0pO1xyXG4gICAgICB9LFxyXG4gICAgICBvbkVudGVyV2hlbkNsb3NlZDogcmVxdWVzdFNlYXJjaE9yT3BlbixcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IHF1ZXJ5S2V5ID0gcXVlcnkudHJpbSgpLnRvTG93ZXJDYXNlKCk7XHJcbiAgY29uc3QgaXNTZWxlY3Rpb25EaXNwbGF5ID0gISFzZWxlY3RlZCAmJiBxdWVyeSA9PT0gKHNlbGVjdGVkLnRleHQgfHwgXCJcIik7XHJcbiAgY29uc3Qgc2hvd1NlYXJjaEljb24gPVxyXG4gICAgIWxvYWRpbmcgJiYgIWJsb2NraW5nICYmICFpc1NlbGVjdGlvbkRpc3BsYXkgJiYgcXVlcnlLZXkubGVuZ3RoID49IG1pbkNoYXJzICYmIChmZXRjaGVkUXVlcnkgPT09IFwiXCIgfHwgcXVlcnlLZXkgIT09IGZldGNoZWRRdWVyeSk7XHJcblxyXG4gIGNvbnN0IHdyYXBwZXJDbGFzcyA9IGlzQ29tcGFjdCA/IFwic3BhY2UteS0xIGhpc3RvcnktY2xpZW50LWNvbWJvYm94XCIgOiBcInNwYWNlLXktMlwiO1xyXG4gIGNvbnN0IGxhYmVsQ2xhc3MgPSBcImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZFwiO1xyXG4gIGNvbnN0IGNvbnRhaW5lckNsYXNzID0gaXNDb21wYWN0XHJcbiAgICA/IFwicmVsYXRpdmUgdy1mdWxsIHJvdW5kZWQteGwgYmctd2hpdGUgdGV4dC1sZWZ0IGZvY3VzLXdpdGhpbjpib3JkZXItcHJpbWFyeSBmb2N1cy13aXRoaW46cmluZy0yIGZvY3VzLXdpdGhpbjpyaW5nLXByaW1hcnkgZm9jdXMtd2l0aGluOnJpbmctb2Zmc2V0LXdoaXRlIHNtOnRleHQtc21cIlxyXG4gICAgOiBcInJlbGF0aXZlIHctZnVsbCBjdXJzb3ItZGVmYXVsdCByb3VuZGVkLVs1cHhdIGJvcmRlci1zbGF0ZS0zMDAgYmctd2hpdGUgdGV4dC1sZWZ0IHNoYWRvdy14cyBmb2N1cy13aXRoaW46Ym9yZGVyLXByaW1hcnkgZm9jdXMtd2l0aGluOnJpbmctMiBmb2N1cy13aXRoaW46cmluZy1wcmltYXJ5IGZvY3VzLXdpdGhpbjpyaW5nLW9mZnNldC0wIHNtOnRleHQtc21cIjtcclxuICBjb25zdCBpbnB1dENsYXNzID0gaXNDb21wYWN0XHJcbiAgICA/IFwidy1mdWxsIHJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgcHgtMyBweS0yIHByLTI0IHRleHQtc20gc206dGV4dC1iYXNlIGxlYWRpbmctNSB0ZXh0LXNsYXRlLTkwMCBwbGFjZWhvbGRlcjp0ZXh0LXNsYXRlLTQwMCBmb2N1czpvdXRsaW5lLWhpZGRlbiBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1wcmltYXJ5IGZvY3VzOmJvcmRlci1wcmltYXJ5XCJcclxuICAgIDogXCJ3LWZ1bGwgcm91bmRlZC1bNXB4XSBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBweC0zIHB5LTIgcHItMjQgdGV4dC1zbSBzbTp0ZXh0LWJhc2UgbGVhZGluZy01IHRleHQtc2xhdGUtOTAwIHBsYWNlaG9sZGVyOnRleHQtc2xhdGUtNDAwIGZvY3VzOm91dGxpbmUtaGlkZGVuIGZvY3VzOnJpbmctMiBmb2N1czpyaW5nLXByaW1hcnkgZm9jdXM6Ym9yZGVyLXByaW1hcnlcIjtcclxuICBjb25zdCBlbXB0eVRleHRDbGFzcyA9IGlzQ29tcGFjdCA/IFwicHgtNCBweS0yIHRleHQtc20gdGV4dC1zbGF0ZS01MDBcIiA6IFwicHgtNCBweS0yIHRleHQtc20gdGV4dC1zbGF0ZS01MDBcIjtcclxuICBjb25zdCBvcHRpb25DbGFzcyA9IGlzQ29tcGFjdFxyXG4gICAgPyBcInJlbGF0aXZlIGZsZXggdy1mdWxsIGN1cnNvci1kZWZhdWx0IHNlbGVjdC1ub25lIGl0ZW1zLXN0YXJ0IHB5LTIgcHgtMyB0ZXh0LWxlZnQgdGV4dC1zbVwiXHJcbiAgICA6IFwicmVsYXRpdmUgZmxleCB3LWZ1bGwgY3Vyc29yLWRlZmF1bHQgc2VsZWN0LW5vbmUgaXRlbXMtc3RhcnQgcHktMiBweC0zIHRleHQtbGVmdCB0ZXh0LXNtXCI7XHJcbiAgY29uc3Qgb3B0aW9uVGV4dENsYXNzID0gaXNDb21wYWN0ID8gXCJibG9jayB0cnVuY2F0ZSB1cHBlcmNhc2UgdGV4dC1bMTNweF1cIiA6IFwiYmxvY2sgdHJ1bmNhdGUgdXBwZXJjYXNlIHRleHQtWzEzcHhdXCI7XHJcbiAgY29uc3Qgb3B0aW9uU3ViVGV4dENsYXNzID0gaXNDb21wYWN0ID8gXCJibG9jayB0cnVuY2F0ZSB1cHBlcmNhc2UgdGV4dC1bMTFweF0gdGV4dC1zbGF0ZS02MDBcIiA6IFwiYmxvY2sgdHJ1bmNhdGUgdXBwZXJjYXNlIHRleHQtWzExcHhdIHRleHQtc2xhdGUtNjAwXCI7XHJcbiAgY29uc3Qgb3B0aW9uU3ViVGV4dFNlY29uZGFyeUNsYXNzID0gaXNDb21wYWN0XHJcbiAgICA/IFwiYmxvY2sgdHJ1bmNhdGUgdXBwZXJjYXNlIHRleHQtWzExcHhdIHRleHQtc2xhdGUtNTAwXCJcclxuICAgIDogXCJibG9jayB0cnVuY2F0ZSB1cHBlcmNhc2UgdGV4dC1bMTFweF0gdGV4dC1zbGF0ZS01MDBcIjtcclxuICBjb25zdCBzdGF0dXNDbGFzcyA9IGlzQ29tcGFjdCA/IFwidGV4dC14cyB0ZXh0LXNsYXRlLTUwMCB0ZWNoLWluZm9cIiA6IFwidGV4dC14cyB0ZXh0LXNsYXRlLTUwMCB0ZWNoLWluZm9cIjtcclxuICBjb25zdCBzZWFyY2hJY29uU2l6ZSA9IGlzQ29tcGFjdCA/IFwiaC01IHctNVwiIDogXCJoLTUgdy01XCI7XHJcbiAgY29uc3QgY2hldnJvbkljb25TaXplID0gaXNDb21wYWN0ID8gXCJoLTUgdy01XCIgOiBcImgtNSB3LTVcIjtcclxuXHJcbiAgY29uc3Qgc2FmZUlkQmFzZSA9IGlkQmFzZSB8fCAoaXNDb21wYWN0ID8gXCJoaXN0b3J5LWNsaWVudFwiIDogXCJjbGllbnRcIik7XHJcbiAgY29uc3QgbGlzdElkID0gYCR7c2FmZUlkQmFzZX0tb3B0aW9uc2A7XHJcbiAgY29uc3QgYWN0aXZlSWQgPVxyXG4gICAgb3BlbiAmJiBmaWx0ZXJlZFtyZXNvbHZlZEFjdGl2ZUluZGV4XVxyXG4gICAgICA/IGAke3NhZmVJZEJhc2V9LW9wdC0ke2ZpbHRlcmVkW3Jlc29sdmVkQWN0aXZlSW5kZXhdLnZhbHVlfWBcclxuICAgICAgOiB1bmRlZmluZWQ7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT17d3JhcHBlckNsYXNzfSByZWY9e2NvbnRhaW5lclJlZn0+XHJcbiAgICAgIHtzaG91bGRTaG93TGFiZWwgJiYgPGxhYmVsIGNsYXNzTmFtZT17bGFiZWxDbGFzc30+e3Jlc29sdmVkTGFiZWx9PC9sYWJlbD59XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmVcIj5cclxuICAgICAgICA8ZGl2IHJlZj17Ym94UmVmfSBjbGFzc05hbWU9e2NvbnRhaW5lckNsYXNzfT5cclxuICAgICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgICBjbGFzc05hbWU9e2lucHV0Q2xhc3N9XHJcbiAgICAgICAgICAgIHZhbHVlPXtxdWVyeX1cclxuICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgIGNvbnN0IHZhbCA9IGV2ZW50LnRhcmdldC52YWx1ZTtcclxuICAgICAgICAgICAgICBzZXRBY3RpdmVJbmRleCgwKTtcclxuICAgICAgICAgICAgICBzZXRRdWVyeSh2YWwpO1xyXG4gICAgICAgICAgICAgIHNldFNob3dOb3RGb3VuZFN0YXRlKGZhbHNlKTtcclxuICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWQgJiYgdmFsICE9PSAoc2VsZWN0ZWQudGV4dCB8fCBcIlwiKSkge1xyXG4gICAgICAgICAgICAgICAgc2V0U2VsZWN0ZWQobnVsbCk7XHJcbiAgICAgICAgICAgICAgICBvblNlbGVjdGVkPy4obnVsbCk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGNhbmNlbFBlbmRpbmcoKTtcclxuICAgICAgICAgICAgICBzZXRGZXRjaGVkUXVlcnkoXCJcIik7XHJcbiAgICAgICAgICAgICAgc2V0T3B0aW9ucyhbXSk7XHJcbiAgICAgICAgICAgICAgc2V0SGFzTW9yZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgc2V0U3RhdHVzKFxyXG4gICAgICAgICAgICAgICAgdmFsLnRyaW0oKS5sZW5ndGggPCBtaW5DaGFyc1xyXG4gICAgICAgICAgICAgICAgICA/IGluZEZvcm1hdChcIlZpc2l0c19DcmVhdGVfTWluQ2hhcnNcIiwgXCJUeXBlIGF0IGxlYXN0IHswfSBjaGFyYWN0ZXJzLlwiLCBtaW5DaGFycylcclxuICAgICAgICAgICAgICAgICAgOiBpbmRUKFwiVmlzaXRzX0NyZWF0ZV9QcmVzc1NlYXJjaEhpbnRcIiwgXCJQcmVzcyBzZWFyY2gsIEVudGVyIG9yIEFycm93RG93biB0byBzZWFyY2guXCIpXHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICBzZXRPcGVuKGZhbHNlKTtcclxuICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgb25LZXlEb3duPXtoYW5kbGVLZXlEb3dufVxyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17cmVzb2x2ZWRQbGFjZWhvbGRlcn1cclxuICAgICAgICAgICAgYXJpYS1sYWJlbD17cmVzb2x2ZWRMYWJlbH1cclxuICAgICAgICAgICAgcmVhZE9ubHk9e2xvYWRpbmcgfHwgYmxvY2tpbmd9XHJcbiAgICAgICAgICAgIGFyaWEtYnVzeT17bG9hZGluZyB8fCBibG9ja2luZ31cclxuICAgICAgICAgICAgcm9sZT1cImNvbWJvYm94XCJcclxuICAgICAgICAgICAgYXJpYS1leHBhbmRlZD17b3Blbn1cclxuICAgICAgICAgICAgYXJpYS1jb250cm9scz17bGlzdElkfVxyXG4gICAgICAgICAgICBhcmlhLWFjdGl2ZWRlc2NlbmRhbnQ9e2FjdGl2ZUlkfVxyXG4gICAgICAgICAgLz5cclxuXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LXktMCByaWdodC0wIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHByLTJcIj5cclxuICAgICAgICAgICAgeyhsb2FkaW5nIHx8IGJsb2NraW5nKSAmJiAoXHJcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgcHgtMlwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxyXG4gICAgICAgICAgICAgICAge2lzQ29tcGFjdCA/IDxTcGlubmVyIHNpemU9XCJoLTQgdy00XCIgLz4gOiA8U3Bpbm5lciAvPn1cclxuICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICl9XHJcblxyXG4gICAgICAgICAgICB7c2hvd1NlYXJjaEljb24gJiYgKFxyXG4gICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgcC0xLjUgdGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC1zbGF0ZS01MDBcIlxyXG4gICAgICAgICAgICAgICAgb25DbGljaz17cmVxdWVzdFNlYXJjaE9yT3Blbn1cclxuICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2luZFQoXCJWaXNpdHNfQ3JlYXRlX1NlYXJjaENsaWVudFwiLCBcIlNlYXJjaCBjbGllbnRcIil9XHJcbiAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgZmlsbD1cIm5vbmVcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgc3Ryb2tlV2lkdGg9ezEuNX0gc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgY2xhc3NOYW1lPXtzZWFyY2hJY29uU2l6ZX0+XHJcbiAgICAgICAgICAgICAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwibTE1Ljc1IDE1Ljc1LTIuNDg5LTIuNDg5bTAgMGEzLjM3NSAzLjM3NSAwIDEgMC00Ljc3My00Ljc3MyAzLjM3NSAzLjM3NSAwIDAgMCA0Ljc3NCA0Ljc3NFpNMjEgMTJhOSA5IDAgMSAxLTE4IDAgOSA5IDAgMCAxIDE4IDBaXCIgLz5cclxuICAgICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICApfVxyXG5cclxuICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHAtMS41IHRleHQtc2xhdGUtNTAwIGhvdmVyOnRleHQtc2xhdGUtNjAwXCJcclxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAobG9hZGluZyB8fCBibG9ja2luZykgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgaWYgKG9wZW4pIHtcclxuICAgICAgICAgICAgICAgICAgc2V0T3BlbihmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJlcXVlc3RTZWFyY2hPck9wZW4oKTtcclxuICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgIGRpc2FibGVkPXtsb2FkaW5nIHx8IGJsb2NraW5nfVxyXG4gICAgICAgICAgICAgIGFyaWEtbGFiZWw9e1xyXG4gICAgICAgICAgICAgICAgb3BlblxyXG4gICAgICAgICAgICAgICAgICA/IGluZFQoXCJWaXNpdHNfQ3JlYXRlX0hpZGVDbGllbnRPcHRpb25zXCIsIFwiSGlkZSBjbGllbnQgb3B0aW9uc1wiKVxyXG4gICAgICAgICAgICAgICAgICA6IGluZFQoXCJWaXNpdHNfQ3JlYXRlX1Nob3dDbGllbnRPcHRpb25zXCIsIFwiU2hvdyBjbGllbnQgb3B0aW9uc1wiKVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIHtvcGVuID8gPENoZXZyb25VcFN2ZyBjbGFzc05hbWU9e2NoZXZyb25JY29uU2l6ZX0gLz4gOiA8Q2hldnJvbkRvd25TdmcgY2xhc3NOYW1lPXtjaGV2cm9uSWNvblNpemV9IC8+fVxyXG4gICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8RmxvYXRpbmdMaXN0XHJcbiAgICAgICAgYW5jaG9yUmVmPXtib3hSZWZ9XHJcbiAgICAgICAgb3Blbj17b3Blbn1cclxuICAgICAgICB6SW5kZXg9ezQwMDAwMH1cclxuICAgICAgICBtYXhIZWlnaHRDbGFzcz1cIm1heC1oLTcyXCJcclxuICAgICAgICByb2xlPVwibGlzdGJveFwiXHJcbiAgICAgICAgcm91bmRlZENsYXNzPVwicm91bmRlZC1bNXB4XVwiXHJcbiAgICAgICAgcG9ydGFsQ2xhc3NOYW1lPXtwb3J0YWxDbGFzc05hbWV9XHJcbiAgICAgICAgcGFuZWxDbGFzc05hbWU9e3BhbmVsQ2xhc3NOYW1lfVxyXG4gICAgICA+XHJcbiAgICAgICAgICA8ZGl2IHJlZj17bGlzdFJlZn0gaWQ9e2xpc3RJZH0+XHJcbiAgICAgICAgICAgIHtvcHRpb25zLmxlbmd0aCA9PT0gMCAmJiAoXHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2VtcHR5VGV4dENsYXNzfT5cclxuICAgICAgICAgICAgICAgIHtzaG93Tm90Rm91bmRTdGF0ZVxyXG4gICAgICAgICAgICAgICAgICA/IGluZFQoXCJDb21tb25fTm90Rm91bmRcIiwgXCJOb3QgZm91bmRcIilcclxuICAgICAgICAgICAgICAgICAgOiBxdWVyeS50cmltKCkubGVuZ3RoIDwgbWluQ2hhcnNcclxuICAgICAgICAgICAgICAgICAgPyBpbmRGb3JtYXQoXCJWaXNpdHNfQ3JlYXRlX01pbkNoYXJzXCIsIFwiVHlwZSBhdCBsZWFzdCB7MH0gY2hhcmFjdGVycy5cIiwgbWluQ2hhcnMpXHJcbiAgICAgICAgICAgICAgICAgIDogaW5kVChcIlZpc2l0c19DcmVhdGVfTm9SZXN1bHRzXCIsIFwiTm8gcmVzdWx0c1wiKX1cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgeyFsb2FkaW5nICYmIG9wdGlvbnMubGVuZ3RoID4gMCAmJiBmaWx0ZXJlZC5sZW5ndGggPT09IDAgJiYgKFxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtlbXB0eVRleHRDbGFzc30+e2luZFQoXCJWaXNpdHNfQ3JlYXRlX05vTWF0Y2hlc1wiLCBcIk5vIG1hdGNoZXNcIil9PC9kaXY+XHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgIHshbG9hZGluZyAmJlxyXG4gICAgICAgICAgICAgIGZpbHRlcmVkLm1hcCgob3B0LCBpZHgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGlzQWN0aXZlID0gaWR4ID09PSByZXNvbHZlZEFjdGl2ZUluZGV4O1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc2VsID0gc2VsZWN0ZWQ/LnZhbHVlID09PSBvcHQudmFsdWU7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgICAgICAgICAgICAga2V5PXtvcHQudmFsdWV9XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ9e2Ake3NhZmVJZEJhc2V9LW9wdC0ke29wdC52YWx1ZX1gfVxyXG4gICAgICAgICAgICAgICAgICAgIHJvbGU9XCJvcHRpb25cIlxyXG4gICAgICAgICAgICAgICAgICAgIGFyaWEtc2VsZWN0ZWQ9e3NlbH1cclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXHJcbiAgICAgICAgICAgICAgICAgICAgICBvcHRpb25DbGFzcyxcclxuICAgICAgICAgICAgICAgICAgICAgIGlzQWN0aXZlID8gXCJiZy1wcmltYXJ5IHRleHQtd2hpdGVcIiA6IHNlbCA/IFwiYmctcHJpbWFyeS8xMCB0ZXh0LXByaW1hcnlcIiA6IGlzQ29tcGFjdCA/IFwidGV4dC1zbGF0ZS03MDBcIiA6IFwidGV4dC1zbGF0ZS05MDBcIlxyXG4gICAgICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICAgICAgb25Nb3VzZUVudGVyPXsoKSA9PiBzZXRBY3RpdmVJbmRleChpZHgpfVxyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNlbGVjdE9wdGlvbihvcHQpfVxyXG4gICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIHNwYWNlLXktMC41XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2NsYXNzTmFtZXMob3B0aW9uVGV4dENsYXNzLCBzZWwgPyBcImZvbnQtc2VtaWJvbGRcIiA6IFwiZm9udC1ub3JtYWxcIil9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7b3B0LnRleHR9XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICB7aXNDb21wYWN0ID8gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtvcHQuY2FyZ28gJiYgPHNwYW4gY2xhc3NOYW1lPXtvcHRpb25TdWJUZXh0Q2xhc3N9PntvcHQuY2FyZ299PC9zcGFuPn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICB7b3B0LmVtcHJlc2EgJiYgPHNwYW4gY2xhc3NOYW1lPXtvcHRpb25TdWJUZXh0U2Vjb25kYXJ5Q2xhc3N9PntvcHQuZW1wcmVzYX08L3NwYW4+fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8Lz5cclxuICAgICAgICAgICAgICAgICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtvcHRpb25TdWJUZXh0Q2xhc3N9PntvcHQuY2FyZ28gfHwgXCJcIn08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtvcHRpb25TdWJUZXh0U2Vjb25kYXJ5Q2xhc3N9PntvcHQuZW1wcmVzYSB8fCBcIlwifTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgfSl9XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L0Zsb2F0aW5nTGlzdD5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsIGZsZXgganVzdGlmeS1lbmRcIj5cclxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9e3N0YXR1c0NsYXNzfT57c3RhdHVzfTwvc3Bhbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ2xpZW50U2VhcmNoQ29tYm9ib3g7XHJcbiIsICJleHBvcnQgY29uc3QgaXNOb0RhdGFUZXh0ID0gKHZhbHVlOiB1bmtub3duKTogYm9vbGVhbiA9PiB7XHJcbiAgY29uc3QgcmF3ID0gU3RyaW5nKHZhbHVlIHx8IFwiXCIpLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xyXG4gIGlmICghcmF3KSByZXR1cm4gZmFsc2U7XHJcbiAgY29uc3Qgbm9ybWFsaXplZCA9IHJhdy5yZXBsYWNlKC9bXmEtejAtOV0rL2csIFwiXCIpO1xyXG4gIHJldHVybiBub3JtYWxpemVkID09PSBcInNpbmRhdG9zXCIgfHwgbm9ybWFsaXplZCA9PT0gXCJub2RhdGFcIjtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBpc05vRGF0YVJvdyA9IChyb3c6IHVua25vd24pOiBib29sZWFuID0+IHtcclxuICBpZiAocm93ID09PSBudWxsIHx8IHJvdyA9PT0gdW5kZWZpbmVkKSByZXR1cm4gdHJ1ZTtcclxuICBpZiAoQXJyYXkuaXNBcnJheShyb3cpKSB7XHJcbiAgICByZXR1cm4gcm93Lmxlbmd0aCA9PT0gMSAmJiBpc05vRGF0YVRleHQocm93WzBdKTtcclxuICB9XHJcbiAgaWYgKHR5cGVvZiByb3cgPT09IFwic3RyaW5nXCIpIHtcclxuICAgIHJldHVybiBpc05vRGF0YVRleHQocm93KTtcclxuICB9XHJcbiAgaWYgKHR5cGVvZiByb3cgPT09IFwib2JqZWN0XCIpIHtcclxuICAgIGNvbnN0IHZhbHVlcyA9IE9iamVjdC52YWx1ZXMocm93IGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+KTtcclxuICAgIGlmICghdmFsdWVzLmxlbmd0aCkgcmV0dXJuIHRydWU7XHJcbiAgICByZXR1cm4gdmFsdWVzLnNvbWUoKHYpID0+IHR5cGVvZiB2ID09PSBcInN0cmluZ1wiICYmIGlzTm9EYXRhVGV4dCh2KSk7XHJcbiAgfVxyXG4gIHJldHVybiBmYWxzZTtcclxufTtcclxuIiwgImltcG9ydCB7IGlzTm9EYXRhUm93LCBpc05vRGF0YVRleHQgfSBmcm9tIFwiLi9ub0RhdGEudHNcIjtcclxuXHJcbmV4cG9ydCB0eXBlIEFjY291bnRJdGVtID0ge1xyXG4gIHZhbHVlOiBzdHJpbmc7XHJcbiAgdGV4dDogc3RyaW5nO1xyXG4gIGNhcmdvPzogc3RyaW5nO1xyXG4gIGVtcHJlc2E/OiBzdHJpbmc7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgbWFwQWNjb3VudEl0ZW0gPSAoaXRlbTogdW5rbm93bik6IEFjY291bnRJdGVtIHwgbnVsbCA9PiB7XHJcbiAgaWYgKGlzTm9EYXRhUm93KGl0ZW0pKSByZXR1cm4gbnVsbDtcclxuICBpZiAoQXJyYXkuaXNBcnJheShpdGVtKSkge1xyXG4gICAgY29uc3QgY29kZSA9IChpdGVtWzBdIHx8IFwiXCIpLnRvU3RyaW5nKCkudHJpbSgpO1xyXG4gICAgY29uc3QgZGVzYyA9IChpdGVtWzJdIHx8IChpdGVtIGFzIGFueSlbMV0gfHwgXCJcIikudG9TdHJpbmcoKS50cmltKCk7XHJcbiAgICBpZiAoIWNvZGUgfHwgaXNOb0RhdGFUZXh0KGNvZGUpIHx8IGlzTm9EYXRhVGV4dChkZXNjKSkgcmV0dXJuIG51bGw7XHJcbiAgICBjb25zdCB0ZXh0ID0gZGVzYyA/IGAke2Rlc2N9ICgke2NvZGV9KWAgOiBjb2RlO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdmFsdWU6IGNvZGUsXHJcbiAgICAgIHRleHQsXHJcbiAgICAgIGNhcmdvOiBcIlwiLFxyXG4gICAgICBlbXByZXNhOiBpdGVtWzJdIGFzIHN0cmluZyxcclxuICAgIH07XHJcbiAgfVxyXG4gIGlmIChpdGVtICYmIHR5cGVvZiBpdGVtID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICBjb25zdCByYXcgPSBpdGVtIGFzIGFueTtcclxuICAgIGNvbnN0IGNvZGUgPSAocmF3LmFjY291bnROdW0gfHwgcmF3LkFjY291bnROdW0gfHwgXCJcIikudG9TdHJpbmcoKS50cmltKCk7XHJcbiAgICBjb25zdCBkZXNjID0gKHJhdy5ub21icmVDb21lcmNpYWwgfHwgcmF3Lk5vbWJyZUNvbWVyY2lhbCB8fCByYXcucmF6b25Tb2NpYWwgfHwgcmF3LlJhem9uU29jaWFsIHx8IFwiXCIpXHJcbiAgICAgIC50b1N0cmluZygpXHJcbiAgICAgIC50cmltKCk7XHJcbiAgICBpZiAoIWNvZGUgfHwgaXNOb0RhdGFUZXh0KGNvZGUpIHx8IGlzTm9EYXRhVGV4dChkZXNjKSkgcmV0dXJuIG51bGw7XHJcbiAgICBjb25zdCB0ZXh0ID0gZGVzYyA/IGAke2Rlc2N9ICgke2NvZGV9KWAgOiBjb2RlO1xyXG4gICAgcmV0dXJuIHsgdmFsdWU6IGNvZGUsIHRleHQgfTtcclxuICB9XHJcbiAgcmV0dXJuIG51bGw7XHJcbn07XHJcbiIsICJleHBvcnQgY29uc3QgbWFrZUNhY2hlID0gPFQ+KGxpbWl0ID0gMTApID0+IHtcclxuICBjb25zdCBtYXAgPSBuZXcgTWFwPHN0cmluZywgVD4oKTtcclxuICByZXR1cm4ge1xyXG4gICAgZ2V0OiAoazogc3RyaW5nKSA9PiBtYXAuZ2V0KGspLFxyXG4gICAgc2V0OiAoazogc3RyaW5nLCB2OiBUKSA9PiB7XHJcbiAgICAgIGlmIChtYXAuaGFzKGspKSBtYXAuZGVsZXRlKGspO1xyXG4gICAgICBtYXAuc2V0KGssIHYpO1xyXG4gICAgICBpZiAobWFwLnNpemUgPiBsaW1pdCkge1xyXG4gICAgICAgIGNvbnN0IGZpcnN0ID0gbWFwLmtleXMoKS5uZXh0KCkudmFsdWU7XHJcbiAgICAgICAgaWYgKGZpcnN0KSBtYXAuZGVsZXRlKGZpcnN0KTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGhhczogKGs6IHN0cmluZykgPT4gbWFwLmhhcyhrKSxcclxuICAgIGNsZWFyOiAoKSA9PiBtYXAuY2xlYXIoKSxcclxuICB9O1xyXG59O1xyXG4iLCAiaW1wb3J0IHsgbWFrZUNhY2hlIH0gZnJvbSBcIi4vbWFrZUNhY2hlLnRzXCI7XHJcblxyXG5jb25zdCBDVVJSRU5UX0NPTVBBTlkgPSBTdHJpbmcoZ2xvYmFsVGhpcy5fX0lORF9TRUxFQ1RFRF9DT01QQU5ZX18gfHwgXCJcIikudHJpbSgpLnRvVXBwZXJDYXNlKCk7XHJcbmNvbnN0IENPTVBBTllfU1RPUkFHRV9TVUZGSVggPSBDVVJSRU5UX0NPTVBBTlkgPyBgXyR7Q1VSUkVOVF9DT01QQU5ZfWAgOiBcIlwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IFZJU0lUX0RSQUZUX0tFWSA9IGB2aXNpdGFzX2RyYWZ0JHtDT01QQU5ZX1NUT1JBR0VfU1VGRklYfWA7XHJcbmV4cG9ydCBjb25zdCBDT05UQUNUU19TVE9SQUdFX0tFWSA9IGB2aXNpdGFzX2NvbnRhY3RzX2NhY2hlX3YxJHtDT01QQU5ZX1NUT1JBR0VfU1VGRklYfWA7XHJcbmV4cG9ydCBjb25zdCBDT05UQUNUU19TRUxFQ1RJT05fS0VZID0gYHZpc2l0YXNfY29udGFjdHNfc2VsZWN0ZWRfdjEke0NPTVBBTllfU1RPUkFHRV9TVUZGSVh9YDtcclxuZXhwb3J0IGNvbnN0IENSRUFURV9GUkVTSF9QQVJBTSA9IFwiZnJlc2hcIjtcclxuXHJcbmNvbnN0IGNsaWVudENhY2hlID0gbWFrZUNhY2hlPHVua25vd25bXT4oMTApO1xyXG5jb25zdCBjb250YWN0c0NhY2hlID0gbWFrZUNhY2hlPHVua25vd25bXT4oMTApO1xyXG5cclxuY29uc3QgY2FjaGVLZXlXaXRoQ29tcGFueSA9IChrZXk6IHN0cmluZykgPT4gYCR7Q1VSUkVOVF9DT01QQU5ZIHx8IFwiREVGQVVMVFwifTo6JHtrZXl9YDtcclxuXHJcbmNvbnN0IHJlYWRTdG9yYWdlID0gKGtleTogc3RyaW5nKTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4gPT4ge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCByYXcgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGtleSk7XHJcbiAgICBpZiAoIXJhdykgcmV0dXJuIHt9O1xyXG4gICAgcmV0dXJuIEpTT04ucGFyc2UocmF3KTtcclxuICB9IGNhdGNoIHtcclxuICAgIHJldHVybiB7fTtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCB3cml0ZVN0b3JhZ2UgPSAoa2V5OiBzdHJpbmcsIGRhdGE6IFJlY29yZDxzdHJpbmcsIHVua25vd24+KSA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oa2V5LCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XHJcbiAgfSBjYXRjaCB7XHJcbiAgICAvLyBpZ25vcmVcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0Q2xpZW50Q2FjaGUgPSAocXVlcnk6IHN0cmluZyk6IHVua25vd25bXSB8IG51bGwgPT4ge1xyXG4gIGNvbnN0IGNhY2hlS2V5ID0gY2FjaGVLZXlXaXRoQ29tcGFueShxdWVyeSk7XHJcbiAgaWYgKCFjbGllbnRDYWNoZS5oYXMoY2FjaGVLZXkpKSByZXR1cm4gbnVsbDtcclxuICByZXR1cm4gY2xpZW50Q2FjaGUuZ2V0KGNhY2hlS2V5KSB8fCBudWxsO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGhhc0NsaWVudENhY2hlID0gKHF1ZXJ5OiBzdHJpbmcpOiBib29sZWFuID0+IHtcclxuICByZXR1cm4gY2xpZW50Q2FjaGUuaGFzKGNhY2hlS2V5V2l0aENvbXBhbnkocXVlcnkpKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBzZXRDbGllbnRDYWNoZSA9IChxdWVyeTogc3RyaW5nLCBpdGVtczogdW5rbm93bltdKTogdm9pZCA9PiB7XHJcbiAgY2xpZW50Q2FjaGUuc2V0KGNhY2hlS2V5V2l0aENvbXBhbnkocXVlcnkpLCBpdGVtcyk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0Q2FjaGVkQ29udGFjdHMgPSAoYWNjb3VudDogc3RyaW5nKTogdW5rbm93bltdIHwgbnVsbCA9PiB7XHJcbiAgY29uc3QgY2FjaGVLZXkgPSBjYWNoZUtleVdpdGhDb21wYW55KGFjY291bnQpO1xyXG4gIGlmIChjb250YWN0c0NhY2hlLmhhcyhjYWNoZUtleSkpIHJldHVybiBjb250YWN0c0NhY2hlLmdldChjYWNoZUtleSkgfHwgbnVsbDtcclxuICBjb25zdCBzdG9yZSA9IHJlYWRTdG9yYWdlKENPTlRBQ1RTX1NUT1JBR0VfS0VZKTtcclxuICBjb25zdCBjYWNoZWQgPSBzdG9yZVthY2NvdW50XTtcclxuICBpZiAoQXJyYXkuaXNBcnJheShjYWNoZWQpKSB7XHJcbiAgICBjb250YWN0c0NhY2hlLnNldChjYWNoZUtleSwgY2FjaGVkKTtcclxuICAgIHJldHVybiBjYWNoZWQ7XHJcbiAgfVxyXG4gIHJldHVybiBudWxsO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHNldENhY2hlZENvbnRhY3RzID0gKGFjY291bnQ6IHN0cmluZywgaXRlbXM6IHVua25vd25bXSk6IHZvaWQgPT4ge1xyXG4gIGNvbnRhY3RzQ2FjaGUuc2V0KGNhY2hlS2V5V2l0aENvbXBhbnkoYWNjb3VudCksIGl0ZW1zKTtcclxuICBjb25zdCBzdG9yZSA9IHJlYWRTdG9yYWdlKENPTlRBQ1RTX1NUT1JBR0VfS0VZKTtcclxuICBzdG9yZVthY2NvdW50XSA9IGl0ZW1zO1xyXG4gIHdyaXRlU3RvcmFnZShDT05UQUNUU19TVE9SQUdFX0tFWSwgc3RvcmUpO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldFN0b3JlZFNlbGVjdGlvbiA9IChhY2NvdW50OiBzdHJpbmcpOiB1bmtub3duW10gPT4ge1xyXG4gIGNvbnN0IHN0b3JlID0gcmVhZFN0b3JhZ2UoQ09OVEFDVFNfU0VMRUNUSU9OX0tFWSk7XHJcbiAgY29uc3QgcmF3ID0gc3RvcmVbYWNjb3VudF07XHJcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkocmF3KSA/IHJhdyA6IFtdO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHNldFN0b3JlZFNlbGVjdGlvbiA9IChhY2NvdW50OiBzdHJpbmcsIGl0ZW1zOiB1bmtub3duW10pOiB2b2lkID0+IHtcclxuICBjb25zdCBzdG9yZSA9IHJlYWRTdG9yYWdlKENPTlRBQ1RTX1NFTEVDVElPTl9LRVkpO1xyXG4gIHN0b3JlW2FjY291bnRdID0gaXRlbXM7XHJcbiAgd3JpdGVTdG9yYWdlKENPTlRBQ1RTX1NFTEVDVElPTl9LRVksIHN0b3JlKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBjbGVhclN0b3JlZFNlbGVjdGlvbiA9IChhY2NvdW50OiBzdHJpbmcpOiB2b2lkID0+IHtcclxuICBjb25zdCBzdG9yZSA9IHJlYWRTdG9yYWdlKENPTlRBQ1RTX1NFTEVDVElPTl9LRVkpO1xyXG4gIGlmIChzdG9yZVthY2NvdW50XSkge1xyXG4gICAgZGVsZXRlIHN0b3JlW2FjY291bnRdO1xyXG4gICAgd3JpdGVTdG9yYWdlKENPTlRBQ1RTX1NFTEVDVElPTl9LRVksIHN0b3JlKTtcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgY2xlYXJDcmVhdGVTZWxlY3Rpb25DYWNoZSA9ICgpOiB2b2lkID0+IHtcclxuICB0cnkge1xyXG4gICAgc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbShWSVNJVF9EUkFGVF9LRVkpO1xyXG4gICAgc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbShDT05UQUNUU19TVE9SQUdFX0tFWSk7XHJcbiAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKENPTlRBQ1RTX1NFTEVDVElPTl9LRVkpO1xyXG4gIH0gY2F0Y2gge1xyXG4gICAgLy8gaWdub3JlXHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHN0cmlwRnJlc2hQYXJhbSA9ICgpOiB2b2lkID0+IHtcclxuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuO1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCB1cmwgPSBuZXcgVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcclxuICAgIGlmICghdXJsLnNlYXJjaFBhcmFtcy5oYXMoQ1JFQVRFX0ZSRVNIX1BBUkFNKSkgcmV0dXJuO1xyXG4gICAgdXJsLnNlYXJjaFBhcmFtcy5kZWxldGUoQ1JFQVRFX0ZSRVNIX1BBUkFNKTtcclxuICAgIGNvbnN0IG5leHQgPSBgJHt1cmwucGF0aG5hbWV9JHt1cmwuc2VhcmNofSR7dXJsLmhhc2h9YDtcclxuICAgIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSh7fSwgXCJcIiwgbmV4dCk7XHJcbiAgfSBjYXRjaCB7XHJcbiAgICAvLyBpZ25vcmVcclxuICB9XHJcbn07XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1CQUF5RTs7O0FDQWxFLElBQU0sZUFBZSxDQUFDLFVBQTRCO0FBQ3ZELFFBQU0sTUFBTSxPQUFPLFNBQVMsRUFBRSxFQUFFLEtBQUssRUFBRSxZQUFZO0FBQ25ELE1BQUksQ0FBQyxJQUFLLFFBQU87QUFDakIsUUFBTSxhQUFhLElBQUksUUFBUSxlQUFlLEVBQUU7QUFDaEQsU0FBTyxlQUFlLGNBQWMsZUFBZTtBQUNyRDtBQUVPLElBQU0sY0FBYyxDQUFDLFFBQTBCO0FBQ3BELE1BQUksUUFBUSxRQUFRLFFBQVEsT0FBVyxRQUFPO0FBQzlDLE1BQUksTUFBTSxRQUFRLEdBQUcsR0FBRztBQUN0QixXQUFPLElBQUksV0FBVyxLQUFLLGFBQWEsSUFBSSxDQUFDLENBQUM7QUFBQSxFQUNoRDtBQUNBLE1BQUksT0FBTyxRQUFRLFVBQVU7QUFDM0IsV0FBTyxhQUFhLEdBQUc7QUFBQSxFQUN6QjtBQUNBLE1BQUksT0FBTyxRQUFRLFVBQVU7QUFDM0IsVUFBTSxTQUFTLE9BQU8sT0FBTyxHQUE4QjtBQUMzRCxRQUFJLENBQUMsT0FBTyxPQUFRLFFBQU87QUFDM0IsV0FBTyxPQUFPLEtBQUssQ0FBQyxNQUFNLE9BQU8sTUFBTSxZQUFZLGFBQWEsQ0FBQyxDQUFDO0FBQUEsRUFDcEU7QUFDQSxTQUFPO0FBQ1Q7OztBQ1pPLElBQU0s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LHVEQUFDLFNBQUksS0FBSyxTQUFTLElBQUksUUFDcEI7QUFBQSxvQkFBUSxXQUFXLEtBQ2xCLDRDQUFDLFNBQUksV0FBVyxnQkFDYiw4QkFDRyxLQUFLLG1CQUFtQixXQUFXLElBQ25DLE1BQU0sS0FBSyxFQUFFLFNBQVMsV0FDdEIsVUFBVSwwQkFBMEIsaUNBQWlDLFFBQVEsSUFDN0UsS0FBSywyQkFBMkIsWUFBWSxHQUNsRDtBQUFBLFlBRUQsQ0FBQyxXQUFXLFFBQVEsU0FBUyxLQUFLLFNBQVMsV0FBVyxLQUNyRCw0Q0FBQyxTQUFJLFdBQVcsZ0JBQWlCLGVBQUssMkJBQTJCLFlBQVksR0FBRTtBQUFBLFlBRWhGLENBQUMsV0FDQSxTQUFTLElBQUksQ0FBQyxLQUFLLFFBQVE7QUFDekIsb0JBQU0sV0FBVyxRQUFRO0FBQ3pCLG9CQUFNLE1BQU0sVUFBVSxVQUFVLElBQUk7QUFDcEMscUJBQ0U7QUFBQSxnQkFBQztBQUFBO0FBQUEsa0JBQ0MsTUFBSztBQUFBLGtCQUVMLElBQUksR0FBRyxVQUFVLFFBQVEsSUFBSSxLQUFLO0FBQUEsa0JBQ2xDLE1BQUs7QUFBQSxrQkFDTCxpQkFBZTtBQUFBLGtCQUNmLFdBQVc7QUFBQSxvQkFDVDtBQUFBLG9CQUNBLFdBQVcsMEJBQTBCLE1BQU0sK0JBQStCLFlBQVksbUJBQW1CO0FBQUEsa0JBQzNHO0FBQUEsa0JBQ0EsY0FBYyxNQUFNLGVBQWUsR0FBRztBQUFBLGtCQUN0QyxTQUFTLE1BQU0sYUFBYSxHQUFHO0FBQUEsa0JBRS9CLHVEQUFDLFNBQUksV0FBVSw2QkFDYjtBQUFBLGdFQUFDLFVBQUssV0FBVyxXQUFXLGlCQUFpQixNQUFNLGtCQUFrQixhQUFhLEdBQy9FLGNBQUksTUFDUDtBQUFBLG9CQUNDLFlBQ0MsNEVBQ0c7QUFBQSwwQkFBSSxTQUFTLDRDQUFDLFVBQUssV0FBVyxvQkFBcUIsY0FBSSxPQUFNO0FBQUEsc0JBQzdELElBQUksV0FBVyw0Q0FBQyxVQUFLLFdBQVcsNkJBQThCLGNBQUksU0FBUTtBQUFBLHVCQUM3RSxJQUVBLDRFQUNFO0FBQUEsa0VBQUMsVUFBSyxXQUFXLG9CQUFxQixjQUFJLFNBQVMsSUFBRztBQUFBLHNCQUN0RCw0Q0FBQyxVQUFLLFdBQVcsNkJBQThCLGNBQUksV0FBVyxJQUFHO0FBQUEsdUJBQ25FO0FBQUEscUJBRUo7QUFBQTtBQUFBLGdCQTFCSyxJQUFJO0FBQUEsY0EyQlg7QUFBQSxZQUVKLENBQUM7QUFBQSxhQUNMO0FBQUE7QUFBQSxNQUNGO0FBQUEsT0FDRjtBQUFBLElBQ0EsNENBQUMsU0FBSSxXQUFVLDJCQUNiLHNEQUFDLFVBQUssV0FBVyxhQUFjLGtCQUFPLEdBQ3hDO0FBQUEsS0FDRjtBQUVKO0FBRUEsSUFBTywrQkFBUTsiLAogICJuYW1lcyI6IFsiaXNTZWxlY3Rpb25EaXNwbGF5Il0KfQo=
