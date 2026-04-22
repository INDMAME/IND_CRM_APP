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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvdmlzaXRhcy9DbGllbnRTZWFyY2hDb21ib2JveC50c3giLCAiLi4vLi4vcmVhY3Qvc3JjL3V0aWxzL25vRGF0YS50cyIsICIuLi8uLi9yZWFjdC9zcmMvdXRpbHMvdmlzaXRhc01hcHBpbmcudHMiLCAiLi4vLi4vcmVhY3Qvc3JjL3V0aWxzL21ha2VDYWNoZS50cyIsICIuLi8uLi9yZWFjdC9zcmMvdXRpbHMvdmlzaXRhc1N0b3JhZ2UudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBGbG9hdGluZ0xpc3QgZnJvbSBcIi4uL2NvbW1vbnMvRmxvYXRpbmdMaXN0LnRzeFwiO1xyXG5pbXBvcnQgU3Bpbm5lciBmcm9tIFwiLi4vY29tbW9ucy9TcGlubmVyLnRzeFwiO1xyXG5pbXBvcnQgeyBDaGV2cm9uRG93blN2ZywgQ2hldnJvblVwU3ZnIH0gZnJvbSBcIi4uL2NvbW1vbnMvY2hldnJvbnMudHN4XCI7XHJcbmltcG9ydCB7IGZldGNoSnNvbiB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XHJcbmltcG9ydCB7IGhhbmRsZUNvbWJvYm94S2V5RG93biB9IGZyb20gXCIuLi8uLi9ob29rcy91c2VDb21ib2JveEtleWJvYXJkLnRzXCI7XHJcbmltcG9ydCB7IHVzZU91dHNpZGVDbGljayB9IGZyb20gXCIuLi8uLi9ob29rcy91c2VPdXRzaWRlQ2xpY2sudHNcIjtcclxuaW1wb3J0IHsgY2xhc3NOYW1lcyB9IGZyb20gXCIuLi8uLi91dGlscy9jbGFzc05hbWVzLnRzXCI7XHJcbmltcG9ydCB7IGluZEZvcm1hdCwgaW5kVCB9IGZyb20gXCIuLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB7IG1hcEFjY291bnRJdGVtIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Zpc2l0YXNNYXBwaW5nLnRzXCI7XHJcbmltcG9ydCB7IGdldENsaWVudENhY2hlLCBoYXNDbGllbnRDYWNoZSwgc2V0Q2xpZW50Q2FjaGUgfSBmcm9tIFwiLi4vLi4vdXRpbHMvdmlzaXRhc1N0b3JhZ2UudHNcIjtcclxuXHJcbmV4cG9ydCB0eXBlIENsaWVudE9wdGlvbiA9IHtcclxuICB2YWx1ZTogc3RyaW5nO1xyXG4gIHRleHQ6IHN0cmluZztcclxuICBjYXJnbz86IHN0cmluZztcclxuICBlbXByZXNhPzogc3RyaW5nO1xyXG59O1xyXG5cclxudHlwZSBWYXJpYW50ID0gXCJkZWZhdWx0XCIgfCBcImNvbXBhY3RcIjtcclxuXHJcbnR5cGUgQ2xpZW50U2VhcmNoQ29tYm9ib3hQcm9wcyA9IHtcclxuICB2YWx1ZTogQ2xpZW50T3B0aW9uIHwgbnVsbDtcclxuICBvblNlbGVjdGVkOiAodmFsdWU6IENsaWVudE9wdGlvbiB8IG51bGwpID0+IHZvaWQ7XHJcbiAgbGFiZWw/OiBzdHJpbmc7XHJcbiAgcGxhY2Vob2xkZXI/OiBzdHJpbmc7XHJcbiAgdmFyaWFudD86IFZhcmlhbnQ7XHJcbiAgc2hvd0xhYmVsPzogYm9vbGVhbjtcclxuICBpZEJhc2U/OiBzdHJpbmc7XHJcbiAgY2xlYXJPbk51bGw/OiBib29sZWFuO1xyXG4gIHBvcnRhbENsYXNzTmFtZT86IHN0cmluZztcclxuICBwYW5lbENsYXNzTmFtZT86IHN0cmluZztcclxufTtcclxuXHJcbi8vIFJldXNhYmxlIGNsaWVudCBzZWFyY2ggY29tYm9ib3ggZm9yIHZpc2l0YXMgcGFnZXMuXHJcbmNvbnN0IENsaWVudFNlYXJjaENvbWJvYm94ID0gKHtcclxuICB2YWx1ZSxcclxuICBvblNlbGVjdGVkLFxyXG4gIGxhYmVsLFxyXG4gIHBsYWNlaG9sZGVyLFxyXG4gIHZhcmlhbnQgPSBcImRlZmF1bHRcIixcclxuICBzaG93TGFiZWwsXHJcbiAgaWRCYXNlLFxyXG4gIGNsZWFyT25OdWxsLFxyXG4gIHBvcnRhbENsYXNzTmFtZSxcclxuICBwYW5lbENsYXNzTmFtZSxcclxufTogQ2xpZW50U2VhcmNoQ29tYm9ib3hQcm9wcykgPT4ge1xyXG4gIGNvbnN0IGlzQ29tcGFjdCA9IHZhcmlhbnQgPT09IFwiY29tcGFjdFwiO1xyXG4gIGNvbnN0IHJlc29sdmVkTGFiZWwgPSBsYWJlbCB8fCBpbmRUKFwiSGlzdG9yeV9GaWx0ZXJfQ2xpZW50XCIsIFwiQWNjb3VudFwiKTtcbiAgY29uc3QgcmVzb2x2ZWRQbGFjZWhvbGRlciA9IHBsYWNlaG9sZGVyIHx8IHJlc29sdmVkTGFiZWw7XHJcbiAgY29uc3Qgc2hvdWxkU2hvd0xhYmVsID0gc2hvd0xhYmVsID8/ICFpc0NvbXBhY3Q7XHJcbiAgY29uc3Qgc2hvdWxkQ2xlYXJPbk51bGwgPSBjbGVhck9uTnVsbCA/PyBpc0NvbXBhY3Q7XHJcbiAgY29uc3QgbWluQ2hhcnMgPSA0O1xyXG5cclxuICBjb25zdCBbcXVlcnksIHNldFF1ZXJ5XSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtvcHRpb25zLCBzZXRPcHRpb25zXSA9IHVzZVN0YXRlPENsaWVudE9wdGlvbltdPihbXSk7XHJcbiAgY29uc3QgW2ZldGNoZWRRdWVyeSwgc2V0RmV0Y2hlZFF1ZXJ5XSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbbG9hZGluZ01vcmUsIHNldExvYWRpbmdNb3JlXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbc3RhdHVzLCBzZXRTdGF0dXNdID0gdXNlU3RhdGUoKCkgPT4gaW5kRm9ybWF0KFwiVmlzaXRzX0NyZWF0ZV9NaW5DaGFyc1wiLCBcIlR5cGUgYXQgbGVhc3QgezB9IGNoYXJhY3RlcnMuXCIsIG1pbkNoYXJzKSk7XG4gIGNvbnN0IFtzZWxlY3RlZCwgc2V0U2VsZWN0ZWRdID0gdXNlU3RhdGU8Q2xpZW50T3B0aW9uIHwgbnVsbD4odmFsdWUpO1xyXG4gIGNvbnN0IFtvcGVuLCBzZXRPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbcGFnZSwgc2V0UGFnZV0gPSB1c2VTdGF0ZSgxKTtcclxuICBjb25zdCBbaGFzTW9yZSwgc2V0SGFzTW9yZV0gPSB1c2VTdGF0ZSh0cnVlKTtcclxuICBjb25zdCBbYmxvY2tpbmcsIHNldEJsb2NraW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbYWN0aXZlSW5kZXgsIHNldEFjdGl2ZUluZGV4XSA9IHVzZVN0YXRlKDApO1xyXG4gIGNvbnN0IFtzaG93Tm90Rm91bmRTdGF0ZSwgc2V0U2hvd05vdEZvdW5kU3RhdGVdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IGxpc3RSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBjb250YWluZXJSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBib3hSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBhYm9ydFJlZiA9IHVzZVJlZjxBYm9ydENvbnRyb2xsZXIgfCBudWxsPihudWxsKTtcclxuXHJcbiAgdXNlT3V0c2lkZUNsaWNrKFtjb250YWluZXJSZWYsIGxpc3RSZWZdLCAoKSA9PiB7XHJcbiAgICBzZXRTaG93Tm90Rm91bmRTdGF0ZShmYWxzZSk7XHJcbiAgICBzZXRPcGVuKGZhbHNlKTtcclxuICB9KTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghdmFsdWUpIHtcclxuICAgICAgaWYgKHNob3VsZENsZWFyT25OdWxsKSB7XHJcbiAgICAgICAgc2V0U2VsZWN0ZWQobnVsbCk7XHJcbiAgICAgICAgc2V0UXVlcnkoXCJcIik7XHJcbiAgICAgICAgc2V0U2hvd05vdEZvdW5kU3RhdGUoZmFsc2UpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHNldFNlbGVjdGVkKHZhbHVlKTtcclxuICAgIHNldFF1ZXJ5KHZhbHVlLnRleHQgfHwgXCJcIik7XHJcbiAgICBzZXRTaG93Tm90Rm91bmRTdGF0ZShmYWxzZSk7XHJcbiAgfSwgW3ZhbHVlLCBzaG91bGRDbGVhck9uTnVsbF0pO1xyXG5cclxuICBjb25zdCBmaWx0ZXJlZCA9IHVzZU1lbW8oKCkgPT4ge1xyXG4gICAgaWYgKCFxdWVyeS50cmltKCkpIHJldHVybiBvcHRpb25zO1xyXG4gICAgY29uc3QgcSA9IHF1ZXJ5LnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgaWYgKGZldGNoZWRRdWVyeSAmJiBxICE9PSBmZXRjaGVkUXVlcnkpIHJldHVybiBvcHRpb25zO1xyXG4gICAgY29uc3QgbWF0Y2ggPSBvcHRpb25zLmZpbHRlcigobykgPT4gby50ZXh0LnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMocSkpO1xyXG4gICAgcmV0dXJuIG1hdGNoLmxlbmd0aCA+IDAgPyBtYXRjaCA6IG9wdGlvbnM7XHJcbiAgfSwgW29wdGlvbnMsIHF1ZXJ5LCBmZXRjaGVkUXVlcnldKTtcclxuICBjb25zdCByZXNvbHZlZEFjdGl2ZUluZGV4ID1cclxuICAgIGZpbHRlcmVkLmxlbmd0aCA+IDAgPyBNYXRoLm1pbihNYXRoLm1heChhY3RpdmVJbmRleCwgMCksIGZpbHRlcmVkLmxlbmd0aCAtIDEpIDogMDtcclxuXHJcbiAgY29uc3QgY2FuY2VsUGVuZGluZyA9ICgpID0+IHtcclxuICAgIGlmIChhYm9ydFJlZi5jdXJyZW50KSB7XHJcbiAgICAgIGFib3J0UmVmLmN1cnJlbnQuYWJvcnQoKTtcclxuICAgICAgYWJvcnRSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIGlmIChhYm9ydFJlZi5jdXJyZW50KSB7XHJcbiAgICAgICAgYWJvcnRSZWYuY3VycmVudC5hYm9ydCgpO1xyXG4gICAgICAgIGFib3J0UmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3Qgc2VhcmNoID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgY29uc3QgY3VycmVudFF1ZXJ5ID0gcXVlcnkudHJpbSgpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICBpZiAoY3VycmVudFF1ZXJ5Lmxlbmd0aCA8IG1pbkNoYXJzKSB7XHJcbiAgICAgIHNldFNob3dOb3RGb3VuZFN0YXRlKGZhbHNlKTtcclxuICAgICAgc2V0U3RhdHVzKGluZEZvcm1hdChcIlZpc2l0c19DcmVhdGVfTWluQ2hhcnNcIiwgXCJUeXBlIGF0IGxlYXN0IHswfSBjaGFyYWN0ZXJzLlwiLCBtaW5DaGFycykpO1xyXG4gICAgICBzZXRPcHRpb25zKFtdKTtcclxuICAgICAgc2V0SGFzTW9yZShmYWxzZSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNhbmNlbFBlbmRpbmcoKTtcclxuICAgIHNldFBhZ2UoMSk7XHJcbiAgICBzZXRIYXNNb3JlKHRydWUpO1xyXG4gICAgc2V0T3BlbihmYWxzZSk7XHJcbiAgICBjb25zdCBjYWNoZUtleSA9IHF1ZXJ5LnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgaWYgKGhhc0NsaWVudENhY2hlKGNhY2hlS2V5KSkge1xyXG4gICAgICBjb25zdCBjYWNoZWQgPSAoZ2V0Q2xpZW50Q2FjaGUoY2FjaGVLZXkpIHx8IFtdKSBhcyBDbGllbnRPcHRpb25bXTtcclxuICAgICAgc2V0QWN0aXZlSW5kZXgoMCk7XHJcbiAgICAgIHNldEZldGNoZWRRdWVyeShjdXJyZW50UXVlcnkpO1xyXG4gICAgICBzZXRPcHRpb25zKGNhY2hlZCk7XHJcbiAgICAgIGlmIChjYWNoZWQubGVuZ3RoIDwgMSkge1xyXG4gICAgICAgIHNldFNlbGVjdGVkKG51bGwpO1xyXG4gICAgICAgIHNldFF1ZXJ5KFwiXCIpO1xyXG4gICAgICAgIHNldFNob3dOb3RGb3VuZFN0YXRlKHRydWUpO1xyXG4gICAgICAgIG9uU2VsZWN0ZWQobnVsbCk7XHJcbiAgICAgICAgc2V0U3RhdHVzKGluZFQoXCJDb21tb25fTm90Rm91bmRcIiwgXCJOb3QgZm91bmRcIikpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNldFNob3dOb3RGb3VuZFN0YXRlKGZhbHNlKTtcclxuICAgICAgICBzZXRTdGF0dXMoaW5kRm9ybWF0KFwiVmlzaXRzX0NyZWF0ZV9DbGllbnRDb3VudENhY2hlXCIsIFwiezB9IGNsaWVudHMgKGNhY2hlKVwiLCBjYWNoZWQubGVuZ3RoKSk7XHJcbiAgICAgIH1cclxuICAgICAgc2V0SGFzTW9yZShjYWNoZWQubGVuZ3RoID09PSAxMCk7XHJcbiAgICAgIHNldE9wZW4odHJ1ZSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHNldExvYWRpbmcodHJ1ZSk7XHJcbiAgICBzZXRCbG9ja2luZyh0cnVlKTtcclxuICAgIHNldFN0YXR1cyhpbmRUKFwiVmlzaXRzX0NyZWF0ZV9TZWFyY2hpbmdcIiwgXCJTZWFyY2hpbmcuLi5cIikpO1xyXG4gICAgY29uc3QgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcclxuICAgIGFib3J0UmVmLmN1cnJlbnQgPSBjb250cm9sbGVyO1xyXG4gICAgbGV0IHNob3VsZE9wZW5PbkZpbmlzaCA9IGZhbHNlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgdXJsID0gYC9WaXNpdGFzL0dldEFjY291bnRzRm9yRHJvcGRvd24/dGVybT0ke2VuY29kZVVSSUNvbXBvbmVudChxdWVyeSl9JnBhZ2U9MSZwYWdlU2l6ZT0xMGA7XHJcbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBmZXRjaEpzb248eyBpdGVtcz86IHVua25vd25bXSB9Pih1cmwsIHsgc2lnbmFsOiBjb250cm9sbGVyLnNpZ25hbCB9KTtcbiAgICAgIGNvbnN0IGl0ZW1zID0gKGRhdGEuaXRlbXMgfHwgW10pLmZsYXRNYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgY29uc3QgbWFwcGVkID0gbWFwQWNjb3VudEl0ZW0oaXRlbSk7XG4gICAgICAgIHJldHVybiBtYXBwZWQgPyBbbWFwcGVkXSA6IFtdO1xuICAgICAgfSk7XG4gICAgICBzZXRBY3RpdmVJbmRleCgwKTtcclxuICAgICAgc2V0RmV0Y2hlZFF1ZXJ5KGN1cnJlbnRRdWVyeSk7XHJcbiAgICAgIHNldENsaWVudENhY2hlKGNhY2hlS2V5LCBpdGVtcyk7XHJcbiAgICAgIHNldE9wdGlvbnMoaXRlbXMpO1xyXG4gICAgICBpZiAoaXRlbXMubGVuZ3RoIDwgMSkge1xyXG4gICAgICAgIHNldFNlbGVjdGVkKG51bGwpO1xyXG4gICAgICAgIHNldFF1ZXJ5KFwiXCIpO1xyXG4gICAgICAgIHNldFNob3dOb3RGb3VuZFN0YXRlKHRydWUpO1xyXG4gICAgICAgIG9uU2VsZWN0ZWQobnVsbCk7XHJcbiAgICAgICAgc2V0U3RhdHVzKGluZFQoXCJDb21tb25fTm90Rm91bmRcIiwgXCJOb3QgZm91bmRcIikpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNldFNob3dOb3RGb3VuZFN0YXRlKGZhbHNlKTtcclxuICAgICAgICBzZXRTdGF0dXMoaW5kRm9ybWF0KFwiVmlzaXRzX0NyZWF0ZV9DbGllbnRDb3VudFwiLCBcInswfSBjbGllbnRzXCIsIGl0ZW1zLmxlbmd0aCkpO1xyXG4gICAgICB9XHJcbiAgICAgIHNldEhhc01vcmUoaXRlbXMubGVuZ3RoID09PSAxMCk7XHJcbiAgICAgIHNob3VsZE9wZW5PbkZpbmlzaCA9IHRydWU7XHJcbiAgICB9IGNhdGNoIChlcnI6IGFueSkge1xyXG4gICAgICBpZiAoZXJyPy5uYW1lID09PSBcIkFib3J0RXJyb3JcIikge1xyXG4gICAgICAgIHNldFN0YXR1cyhpbmRUKFwiVmlzaXRzX0NyZWF0ZV9TZWFyY2hDYW5jZWxlZFwiLCBcIlNlYXJjaCBjYW5jZWxlZC5cIikpO1xyXG4gICAgICB9IGVsc2UgaWYgKFN0cmluZyhlcnI/Lm1lc3NhZ2UgfHwgXCJcIikudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhcInRpbWVvdXRcIikpIHtcclxuICAgICAgICBzZXRTdGF0dXMoaW5kVChcIlZpc2l0c19DcmVhdGVfU2VhcmNoVGltZW91dFwiLCBcIlRoZSBzZWFyY2ggdG9vayB0b28gbG9uZy4gVHlwZSBtb3JlIGNoYXJhY3RlcnMgdG8gbmFycm93IGRvd24uXCIpKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzZXRTdGF0dXMoaW5kVChcIlZpc2l0c19DcmVhdGVfTG9hZENsaWVudHNFcnJvclwiLCBcIkZhaWxlZCB0byBsb2FkIGNsaWVudHMuXCIpKTtcclxuICAgICAgfVxyXG4gICAgfSBmaW5hbGx5IHtcclxuICAgICAgYWJvcnRSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xyXG4gICAgICBzZXRCbG9ja2luZyhmYWxzZSk7XHJcbiAgICAgIGlmIChzaG91bGRPcGVuT25GaW5pc2gpIHNldE9wZW4odHJ1ZSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgbG9hZE1vcmUgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XHJcbiAgICBpZiAobG9hZGluZ01vcmUgfHwgbG9hZGluZyB8fCAhaGFzTW9yZSB8fCBxdWVyeS50cmltKCkubGVuZ3RoIDwgbWluQ2hhcnMpIHJldHVybjtcclxuICAgIHNldExvYWRpbmdNb3JlKHRydWUpO1xyXG4gICAgc2V0QmxvY2tpbmcodHJ1ZSk7XHJcbiAgICBjb25zdCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xyXG4gICAgYWJvcnRSZWYuY3VycmVudCA9IGNvbnRyb2xsZXI7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBuZXh0UGFnZSA9IHBhZ2UgKyAxO1xyXG4gICAgICBjb25zdCB1cmwgPSBgL1Zpc2l0YXMvR2V0QWNjb3VudHNGb3JEcm9wZG93bj90ZXJtPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHF1ZXJ5KX0mcGFnZT0ke25leHRQYWdlfSZwYWdlU2l6ZT0xMGA7XHJcbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBmZXRjaEpzb248eyBpdGVtcz86IHVua25vd25bXSB9Pih1cmwsIHsgc2lnbmFsOiBjb250cm9sbGVyLnNpZ25hbCB9KTtcbiAgICAgIGNvbnN0IGl0ZW1zID0gKGRhdGEuaXRlbXMgfHwgW10pLmZsYXRNYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgY29uc3QgbWFwcGVkID0gbWFwQWNjb3VudEl0ZW0oaXRlbSk7XG4gICAgICAgIHJldHVybiBtYXBwZWQgPyBbbWFwcGVkXSA6IFtdO1xuICAgICAgfSk7XG4gICAgICBzZXRPcHRpb25zKChwcmV2KSA9PiBbLi4ucHJldiwgLi4uaXRlbXNdKTtcclxuICAgICAgc2V0UGFnZShuZXh0UGFnZSk7XHJcbiAgICAgIHNldEhhc01vcmUoaXRlbXMubGVuZ3RoID09PSAxMCk7XHJcbiAgICB9IGZpbmFsbHkge1xyXG4gICAgICBhYm9ydFJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgc2V0TG9hZGluZ01vcmUoZmFsc2UpO1xyXG4gICAgICBzZXRCbG9ja2luZyhmYWxzZSk7XHJcbiAgICB9XHJcbiAgfSwgW2xvYWRpbmdNb3JlLCBsb2FkaW5nLCBoYXNNb3JlLCBxdWVyeSwgcGFnZSwgbWluQ2hhcnNdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghb3BlbiB8fCAhbGlzdFJlZi5jdXJyZW50KSByZXR1cm47XHJcbiAgICBjb25zdCBlbCA9IGxpc3RSZWYuY3VycmVudDtcclxuICAgIGNvbnN0IG9uU2Nyb2xsID0gKCkgPT4ge1xyXG4gICAgICBpZiAoZWwuc2Nyb2xsVG9wICsgZWwuY2xpZW50SGVpZ2h0ID49IGVsLnNjcm9sbEhlaWdodCAtIDgpIGxvYWRNb3JlKCk7XHJcbiAgICB9O1xyXG4gICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBvblNjcm9sbCwgeyBwYXNzaXZlOiB0cnVlIH0pO1xyXG4gICAgcmV0dXJuICgpID0+IGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgb25TY3JvbGwpO1xyXG4gIH0sIFtvcGVuLCBsb2FkTW9yZV0pO1xyXG5cclxuICBjb25zdCBzZWxlY3RPcHRpb24gPSAob3B0OiBDbGllbnRPcHRpb24pID0+IHtcclxuICAgIHNldFNlbGVjdGVkKG9wdCk7XHJcbiAgICBzZXRRdWVyeShvcHQudGV4dCk7XHJcbiAgICBzZXRTaG93Tm90Rm91bmRTdGF0ZShmYWxzZSk7XHJcbiAgICBzZXRPcGVuKGZhbHNlKTtcclxuICAgIG9uU2VsZWN0ZWQob3B0KTtcclxuICB9O1xyXG5cclxuICBjb25zdCByZXF1ZXN0U2VhcmNoT3JPcGVuID0gKCkgPT4ge1xyXG4gICAgaWYgKGxvYWRpbmcgfHwgYmxvY2tpbmcpIHJldHVybjtcclxuICAgIGNvbnN0IHRyaW1tZWQgPSBxdWVyeS50cmltKCk7XHJcbiAgICBpZiAodHJpbW1lZC5sZW5ndGggPCBtaW5DaGFycykge1xyXG4gICAgICBjYW5jZWxQZW5kaW5nKCk7XHJcbiAgICAgIHNldFNob3dOb3RGb3VuZFN0YXRlKGZhbHNlKTtcclxuICAgICAgc2V0T3B0aW9ucyhbXSk7XHJcbiAgICAgIHNldEhhc01vcmUoZmFsc2UpO1xyXG4gICAgICBzZXRTdGF0dXMoaW5kRm9ybWF0KFwiVmlzaXRzX0NyZWF0ZV9NaW5DaGFyc1wiLCBcIlR5cGUgYXQgbGVhc3QgezB9IGNoYXJhY3RlcnMuXCIsIG1pbkNoYXJzKSk7XHJcbiAgICAgIHNldE9wZW4odHJ1ZSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBxS2V5ID0gdHJpbW1lZC50b0xvd2VyQ2FzZSgpO1xyXG4gICAgY29uc3QgaXNTZWxlY3Rpb25EaXNwbGF5ID0gISFzZWxlY3RlZCAmJiBxdWVyeSA9PT0gKHNlbGVjdGVkLnRleHQgfHwgXCJcIik7XHJcbiAgICBjb25zdCBzaG91bGRTZWFyY2ggPSAhaXNTZWxlY3Rpb25EaXNwbGF5ICYmIHFLZXkgIT09IGZldGNoZWRRdWVyeTtcclxuXHJcbiAgICBpZiAoc2hvdWxkU2VhcmNoKSB7XHJcbiAgICAgIHNlYXJjaCgpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgc2V0T3Blbih0cnVlKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBoYW5kbGVLZXlEb3duID0gKGV2OiBSZWFjdC5LZXlib2FyZEV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+KSA9PiB7XHJcbiAgICBoYW5kbGVDb21ib2JveEtleURvd24oZXYsIHtcclxuICAgICAgaXNPcGVuOiBvcGVuLFxyXG4gICAgICBzZXRPcGVuLFxyXG4gICAgICBvcHRpb25Db3VudDogZmlsdGVyZWQubGVuZ3RoLFxyXG4gICAgICBzZXRBY3RpdmVJbmRleCxcclxuICAgICAgcmVxdWlyZU9wZW5Gb3JBcnJvd3M6IHRydWUsXHJcbiAgICAgIG9uRW50ZXJXaGVuT3BlbjogKCkgPT4ge1xyXG4gICAgICAgIGlmIChmaWx0ZXJlZC5sZW5ndGggPCAxKSB7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNlbGVjdE9wdGlvbihmaWx0ZXJlZFtyZXNvbHZlZEFjdGl2ZUluZGV4XSA/PyBmaWx0ZXJlZFswXSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIG9uRW50ZXJXaGVuQ2xvc2VkOiByZXF1ZXN0U2VhcmNoT3JPcGVuLFxyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgcXVlcnlLZXkgPSBxdWVyeS50cmltKCkudG9Mb3dlckNhc2UoKTtcclxuICBjb25zdCBpc1NlbGVjdGlvbkRpc3BsYXkgPSAhIXNlbGVjdGVkICYmIHF1ZXJ5ID09PSAoc2VsZWN0ZWQudGV4dCB8fCBcIlwiKTtcclxuICBjb25zdCBzaG93U2VhcmNoSWNvbiA9XHJcbiAgICAhbG9hZGluZyAmJiAhYmxvY2tpbmcgJiYgIWlzU2VsZWN0aW9uRGlzcGxheSAmJiBxdWVyeUtleS5sZW5ndGggPj0gbWluQ2hhcnMgJiYgKGZldGNoZWRRdWVyeSA9PT0gXCJcIiB8fCBxdWVyeUtleSAhPT0gZmV0Y2hlZFF1ZXJ5KTtcclxuXHJcbiAgY29uc3Qgd3JhcHBlckNsYXNzID0gaXNDb21wYWN0ID8gXCJzcGFjZS15LTEgaGlzdG9yeS1jbGllbnQtY29tYm9ib3hcIiA6IFwic3BhY2UteS0yXCI7XHJcbiAgY29uc3QgbGFiZWxDbGFzcyA9IFwiZm9ybS1sYWJlbCBmb250LXNlbWlib2xkXCI7XHJcbiAgY29uc3QgY29udGFpbmVyQ2xhc3MgPSBpc0NvbXBhY3RcclxuICAgID8gXCJyZWxhdGl2ZSB3LWZ1bGwgcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYmctd2hpdGUgdGV4dC1sZWZ0IGZvY3VzLXdpdGhpbjpib3JkZXItcHJpbWFyeSBmb2N1cy13aXRoaW46cmluZy0yIGZvY3VzLXdpdGhpbjpyaW5nLXByaW1hcnkgZm9jdXMtd2l0aGluOnJpbmctb2Zmc2V0LXdoaXRlIHNtOnRleHQtc21cIlxuICAgIDogXCJyZWxhdGl2ZSB3LWZ1bGwgY3Vyc29yLWRlZmF1bHQgcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYm9yZGVyLXNsYXRlLTMwMCBiZy13aGl0ZSB0ZXh0LWxlZnQgc2hhZG93LXhzIGZvY3VzLXdpdGhpbjpib3JkZXItcHJpbWFyeSBmb2N1cy13aXRoaW46cmluZy0yIGZvY3VzLXdpdGhpbjpyaW5nLXByaW1hcnkgZm9jdXMtd2l0aGluOnJpbmctb2Zmc2V0LTAgc206dGV4dC1zbVwiO1xuICBjb25zdCBpbnB1dENsYXNzID0gaXNDb21wYWN0XG4gICAgPyBcInctZnVsbCByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBweC0zIHB5LTIgcHItMjQgdGV4dC1zbSBzbTp0ZXh0LWJhc2UgbGVhZGluZy01IHRleHQtc2xhdGUtOTAwIHBsYWNlaG9sZGVyOnRleHQtc2xhdGUtNDAwIGZvY3VzOm91dGxpbmUtaGlkZGVuIGZvY3VzOnJpbmctMiBmb2N1czpyaW5nLXByaW1hcnkgZm9jdXM6Ym9yZGVyLXByaW1hcnlcIlxuICAgIDogXCJ3LWZ1bGwgcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgcHgtMyBweS0yIHByLTI0IHRleHQtc20gc206dGV4dC1iYXNlIGxlYWRpbmctNSB0ZXh0LXNsYXRlLTkwMCBwbGFjZWhvbGRlcjp0ZXh0LXNsYXRlLTQwMCBmb2N1czpvdXRsaW5lLWhpZGRlbiBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1wcmltYXJ5IGZvY3VzOmJvcmRlci1wcmltYXJ5XCI7XG4gIGNvbnN0IGVtcHR5VGV4dENsYXNzID0gaXNDb21wYWN0ID8gXCJweC00IHB5LTIgdGV4dC1zbSB0ZXh0LXNsYXRlLTUwMFwiIDogXCJweC00IHB5LTIgdGV4dC1zbSB0ZXh0LXNsYXRlLTUwMFwiO1xyXG4gIGNvbnN0IG9wdGlvbkNsYXNzID0gaXNDb21wYWN0XHJcbiAgICA/IFwicmVsYXRpdmUgZmxleCB3LWZ1bGwgY3Vyc29yLWRlZmF1bHQgc2VsZWN0LW5vbmUgaXRlbXMtc3RhcnQgcHktMiBweC0zIHRleHQtbGVmdCB0ZXh0LXNtXCJcclxuICAgIDogXCJyZWxhdGl2ZSBmbGV4IHctZnVsbCBjdXJzb3ItZGVmYXVsdCBzZWxlY3Qtbm9uZSBpdGVtcy1zdGFydCBweS0yIHB4LTMgdGV4dC1sZWZ0IHRleHQtc21cIjtcclxuICBjb25zdCBvcHRpb25UZXh0Q2xhc3MgPSBpc0NvbXBhY3QgPyBcImJsb2NrIHRydW5jYXRlIHVwcGVyY2FzZSB0ZXh0LVsxM3B4XVwiIDogXCJibG9jayB0cnVuY2F0ZSB1cHBlcmNhc2UgdGV4dC1bMTNweF1cIjtcclxuICBjb25zdCBvcHRpb25TdWJUZXh0Q2xhc3MgPSBpc0NvbXBhY3QgPyBcImJsb2NrIHRydW5jYXRlIHVwcGVyY2FzZSB0ZXh0LVsxMXB4XSB0ZXh0LXNsYXRlLTYwMFwiIDogXCJibG9jayB0cnVuY2F0ZSB1cHBlcmNhc2UgdGV4dC1bMTFweF0gdGV4dC1zbGF0ZS02MDBcIjtcclxuICBjb25zdCBvcHRpb25TdWJUZXh0U2Vjb25kYXJ5Q2xhc3MgPSBpc0NvbXBhY3RcclxuICAgID8gXCJibG9jayB0cnVuY2F0ZSB1cHBlcmNhc2UgdGV4dC1bMTFweF0gdGV4dC1zbGF0ZS01MDBcIlxyXG4gICAgOiBcImJsb2NrIHRydW5jYXRlIHVwcGVyY2FzZSB0ZXh0LVsxMXB4XSB0ZXh0LXNsYXRlLTUwMFwiO1xyXG4gIGNvbnN0IHN0YXR1c0NsYXNzID0gaXNDb21wYWN0ID8gXCJ0ZXh0LXhzIHRleHQtc2xhdGUtNTAwIHRlY2gtaW5mb1wiIDogXCJ0ZXh0LXhzIHRleHQtc2xhdGUtNTAwIHRlY2gtaW5mb1wiO1xyXG4gIGNvbnN0IHNlYXJjaEljb25TaXplID0gaXNDb21wYWN0ID8gXCJoLTUgdy01XCIgOiBcImgtNSB3LTVcIjtcclxuICBjb25zdCBjaGV2cm9uSWNvblNpemUgPSBpc0NvbXBhY3QgPyBcImgtNSB3LTVcIiA6IFwiaC01IHctNVwiO1xyXG5cclxuICBjb25zdCBzYWZlSWRCYXNlID0gaWRCYXNlIHx8IChpc0NvbXBhY3QgPyBcImhpc3RvcnktY2xpZW50XCIgOiBcImNsaWVudFwiKTtcclxuICBjb25zdCBsaXN0SWQgPSBgJHtzYWZlSWRCYXNlfS1vcHRpb25zYDtcclxuICBjb25zdCBhY3RpdmVJZCA9XHJcbiAgICBvcGVuICYmIGZpbHRlcmVkW3Jlc29sdmVkQWN0aXZlSW5kZXhdXHJcbiAgICAgID8gYCR7c2FmZUlkQmFzZX0tb3B0LSR7ZmlsdGVyZWRbcmVzb2x2ZWRBY3RpdmVJbmRleF0udmFsdWV9YFxyXG4gICAgICA6IHVuZGVmaW5lZDtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPXt3cmFwcGVyQ2xhc3N9IHJlZj17Y29udGFpbmVyUmVmfT5cclxuICAgICAge3Nob3VsZFNob3dMYWJlbCAmJiA8bGFiZWwgY2xhc3NOYW1lPXtsYWJlbENsYXNzfT57cmVzb2x2ZWRMYWJlbH08L2xhYmVsPn1cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZVwiPlxyXG4gICAgICAgIDxkaXYgcmVmPXtib3hSZWZ9IGNsYXNzTmFtZT17Y29udGFpbmVyQ2xhc3N9PlxyXG4gICAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT17aW5wdXRDbGFzc31cclxuICAgICAgICAgICAgdmFsdWU9e3F1ZXJ5fVxyXG4gICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgY29uc3QgdmFsID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xyXG4gICAgICAgICAgICAgIHNldEFjdGl2ZUluZGV4KDApO1xyXG4gICAgICAgICAgICAgIHNldFF1ZXJ5KHZhbCk7XHJcbiAgICAgICAgICAgICAgc2V0U2hvd05vdEZvdW5kU3RhdGUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgIGlmIChzZWxlY3RlZCAmJiB2YWwgIT09IChzZWxlY3RlZC50ZXh0IHx8IFwiXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRTZWxlY3RlZChudWxsKTtcclxuICAgICAgICAgICAgICAgIG9uU2VsZWN0ZWQ/LihudWxsKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgY2FuY2VsUGVuZGluZygpO1xyXG4gICAgICAgICAgICAgIHNldEZldGNoZWRRdWVyeShcIlwiKTtcclxuICAgICAgICAgICAgICBzZXRPcHRpb25zKFtdKTtcclxuICAgICAgICAgICAgICBzZXRIYXNNb3JlKGZhbHNlKTtcclxuICAgICAgICAgICAgICBzZXRTdGF0dXMoXHJcbiAgICAgICAgICAgICAgICB2YWwudHJpbSgpLmxlbmd0aCA8IG1pbkNoYXJzXHJcbiAgICAgICAgICAgICAgICAgID8gaW5kRm9ybWF0KFwiVmlzaXRzX0NyZWF0ZV9NaW5DaGFyc1wiLCBcIlR5cGUgYXQgbGVhc3QgezB9IGNoYXJhY3RlcnMuXCIsIG1pbkNoYXJzKVxyXG4gICAgICAgICAgICAgICAgICA6IGluZFQoXCJWaXNpdHNfQ3JlYXRlX1ByZXNzU2VhcmNoSGludFwiLCBcIlByZXNzIHNlYXJjaCwgRW50ZXIgb3IgQXJyb3dEb3duIHRvIHNlYXJjaC5cIilcclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgIHNldE9wZW4oZmFsc2UpO1xyXG4gICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICBvbktleURvd249e2hhbmRsZUtleURvd259XHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtyZXNvbHZlZFBsYWNlaG9sZGVyfVxyXG4gICAgICAgICAgICBhcmlhLWxhYmVsPXtyZXNvbHZlZExhYmVsfVxyXG4gICAgICAgICAgICByZWFkT25seT17bG9hZGluZyB8fCBibG9ja2luZ31cclxuICAgICAgICAgICAgYXJpYS1idXN5PXtsb2FkaW5nIHx8IGJsb2NraW5nfVxyXG4gICAgICAgICAgICByb2xlPVwiY29tYm9ib3hcIlxyXG4gICAgICAgICAgICBhcmlhLWV4cGFuZGVkPXtvcGVufVxyXG4gICAgICAgICAgICBhcmlhLWNvbnRyb2xzPXtsaXN0SWR9XHJcbiAgICAgICAgICAgIGFyaWEtYWN0aXZlZGVzY2VuZGFudD17YWN0aXZlSWR9XHJcbiAgICAgICAgICAvPlxyXG5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQteS0wIHJpZ2h0LTAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgcHItMlwiPlxyXG4gICAgICAgICAgICB7KGxvYWRpbmcgfHwgYmxvY2tpbmcpICYmIChcclxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBweC0yXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XHJcbiAgICAgICAgICAgICAgICB7aXNDb21wYWN0ID8gPFNwaW5uZXIgc2l6ZT1cImgtNCB3LTRcIiAvPiA6IDxTcGlubmVyIC8+fVxyXG4gICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgKX1cclxuXHJcbiAgICAgICAgICAgIHtzaG93U2VhcmNoSWNvbiAmJiAoXHJcbiAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBwLTEuNSB0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXNsYXRlLTUwMFwiXHJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXtyZXF1ZXN0U2VhcmNoT3JPcGVufVxyXG4gICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17aW5kVChcIlZpc2l0c19DcmVhdGVfU2VhcmNoQ2xpZW50XCIsIFwiU2VhcmNoIGFjY291bnRcIil9XG4gICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGZpbGw9XCJub25lXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIHN0cm9rZVdpZHRoPXsxLjV9IHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIGNsYXNzTmFtZT17c2VhcmNoSWNvblNpemV9PlxyXG4gICAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIm0xNS43NSAxNS43NS0yLjQ4OS0yLjQ4OW0wIDBhMy4zNzUgMy4zNzUgMCAxIDAtNC43NzMtNC43NzMgMy4zNzUgMy4zNzUgMCAwIDAgNC43NzQgNC43NzRaTTIxIDEyYTkgOSAwIDEgMS0xOCAwIDkgOSAwIDAgMSAxOCAwWlwiIC8+XHJcbiAgICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgKX1cclxuXHJcbiAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBwLTEuNSB0ZXh0LXNsYXRlLTUwMCBob3Zlcjp0ZXh0LXNsYXRlLTYwMFwiXHJcbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGxvYWRpbmcgfHwgYmxvY2tpbmcpIHJldHVybjtcclxuICAgICAgICAgICAgICAgIGlmIChvcGVuKSB7XHJcbiAgICAgICAgICAgICAgICAgIHNldE9wZW4oZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0U2VhcmNoT3JPcGVuKCk7XHJcbiAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICBkaXNhYmxlZD17bG9hZGluZyB8fCBibG9ja2luZ31cclxuICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtcclxuICAgICAgICAgICAgICAgIG9wZW5cclxuICAgICAgICAgICAgICAgICAgPyBpbmRUKFwiVmlzaXRzX0NyZWF0ZV9IaWRlQ2xpZW50T3B0aW9uc1wiLCBcIkhpZGUgY2xpZW50IG9wdGlvbnNcIilcclxuICAgICAgICAgICAgICAgICAgOiBpbmRUKFwiVmlzaXRzX0NyZWF0ZV9TaG93Q2xpZW50T3B0aW9uc1wiLCBcIlNob3cgY2xpZW50IG9wdGlvbnNcIilcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICB7b3BlbiA/IDxDaGV2cm9uVXBTdmcgY2xhc3NOYW1lPXtjaGV2cm9uSWNvblNpemV9IC8+IDogPENoZXZyb25Eb3duU3ZnIGNsYXNzTmFtZT17Y2hldnJvbkljb25TaXplfSAvPn1cclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPEZsb2F0aW5nTGlzdFxyXG4gICAgICAgIGFuY2hvclJlZj17Ym94UmVmfVxyXG4gICAgICAgIG9wZW49e29wZW59XHJcbiAgICAgICAgekluZGV4PXs0MDAwMDB9XHJcbiAgICAgICAgbWF4SGVpZ2h0Q2xhc3M9XCJtYXgtaC03MlwiXHJcbiAgICAgICAgcm9sZT1cImxpc3Rib3hcIlxyXG4gICAgICAgIHJvdW5kZWRDbGFzcz1cInJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldXCJcbiAgICAgICAgcG9ydGFsQ2xhc3NOYW1lPXtwb3J0YWxDbGFzc05hbWV9XHJcbiAgICAgICAgcGFuZWxDbGFzc05hbWU9e3BhbmVsQ2xhc3NOYW1lfVxyXG4gICAgICA+XHJcbiAgICAgICAgICA8ZGl2IHJlZj17bGlzdFJlZn0gaWQ9e2xpc3RJZH0+XHJcbiAgICAgICAgICAgIHtvcHRpb25zLmxlbmd0aCA9PT0gMCAmJiAoXHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2VtcHR5VGV4dENsYXNzfT5cclxuICAgICAgICAgICAgICAgIHtzaG93Tm90Rm91bmRTdGF0ZVxyXG4gICAgICAgICAgICAgICAgICA/IGluZFQoXCJDb21tb25fTm90Rm91bmRcIiwgXCJOb3QgZm91bmRcIilcclxuICAgICAgICAgICAgICAgICAgOiBxdWVyeS50cmltKCkubGVuZ3RoIDwgbWluQ2hhcnNcclxuICAgICAgICAgICAgICAgICAgPyBpbmRGb3JtYXQoXCJWaXNpdHNfQ3JlYXRlX01pbkNoYXJzXCIsIFwiVHlwZSBhdCBsZWFzdCB7MH0gY2hhcmFjdGVycy5cIiwgbWluQ2hhcnMpXHJcbiAgICAgICAgICAgICAgICAgIDogaW5kVChcIlZpc2l0c19DcmVhdGVfTm9SZXN1bHRzXCIsIFwiTm8gcmVzdWx0c1wiKX1cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgeyFsb2FkaW5nICYmIG9wdGlvbnMubGVuZ3RoID4gMCAmJiBmaWx0ZXJlZC5sZW5ndGggPT09IDAgJiYgKFxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtlbXB0eVRleHRDbGFzc30+e2luZFQoXCJWaXNpdHNfQ3JlYXRlX05vTWF0Y2hlc1wiLCBcIk5vIG1hdGNoZXNcIil9PC9kaXY+XHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgIHshbG9hZGluZyAmJlxyXG4gICAgICAgICAgICAgIGZpbHRlcmVkLm1hcCgob3B0LCBpZHgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGlzQWN0aXZlID0gaWR4ID09PSByZXNvbHZlZEFjdGl2ZUluZGV4O1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc2VsID0gc2VsZWN0ZWQ/LnZhbHVlID09PSBvcHQudmFsdWU7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgICAgICAgICAgICAga2V5PXtvcHQudmFsdWV9XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ9e2Ake3NhZmVJZEJhc2V9LW9wdC0ke29wdC52YWx1ZX1gfVxyXG4gICAgICAgICAgICAgICAgICAgIHJvbGU9XCJvcHRpb25cIlxyXG4gICAgICAgICAgICAgICAgICAgIGFyaWEtc2VsZWN0ZWQ9e3NlbH1cclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXHJcbiAgICAgICAgICAgICAgICAgICAgICBvcHRpb25DbGFzcyxcclxuICAgICAgICAgICAgICAgICAgICAgIGlzQWN0aXZlID8gXCJiZy1wcmltYXJ5IHRleHQtd2hpdGVcIiA6IHNlbCA/IFwiYmctcHJpbWFyeS8xMCB0ZXh0LXByaW1hcnlcIiA6IGlzQ29tcGFjdCA/IFwidGV4dC1zbGF0ZS03MDBcIiA6IFwidGV4dC1zbGF0ZS05MDBcIlxyXG4gICAgICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICAgICAgb25Nb3VzZUVudGVyPXsoKSA9PiBzZXRBY3RpdmVJbmRleChpZHgpfVxyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNlbGVjdE9wdGlvbihvcHQpfVxyXG4gICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIHNwYWNlLXktMC41XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2NsYXNzTmFtZXMob3B0aW9uVGV4dENsYXNzLCBzZWwgPyBcImZvbnQtc2VtaWJvbGRcIiA6IFwiZm9udC1ub3JtYWxcIil9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7b3B0LnRleHR9XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICB7aXNDb21wYWN0ID8gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtvcHQuY2FyZ28gJiYgPHNwYW4gY2xhc3NOYW1lPXtvcHRpb25TdWJUZXh0Q2xhc3N9PntvcHQuY2FyZ299PC9zcGFuPn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICB7b3B0LmVtcHJlc2EgJiYgPHNwYW4gY2xhc3NOYW1lPXtvcHRpb25TdWJUZXh0U2Vjb25kYXJ5Q2xhc3N9PntvcHQuZW1wcmVzYX08L3NwYW4+fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8Lz5cclxuICAgICAgICAgICAgICAgICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtvcHRpb25TdWJUZXh0Q2xhc3N9PntvcHQuY2FyZ28gfHwgXCJcIn08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtvcHRpb25TdWJUZXh0U2Vjb25kYXJ5Q2xhc3N9PntvcHQuZW1wcmVzYSB8fCBcIlwifTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgfSl9XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L0Zsb2F0aW5nTGlzdD5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsIGZsZXgganVzdGlmeS1lbmRcIj5cclxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9e3N0YXR1c0NsYXNzfT57c3RhdHVzfTwvc3Bhbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ2xpZW50U2VhcmNoQ29tYm9ib3g7XHJcbiIsICJleHBvcnQgY29uc3QgaXNOb0RhdGFUZXh0ID0gKHZhbHVlOiB1bmtub3duKTogYm9vbGVhbiA9PiB7XHJcbiAgY29uc3QgcmF3ID0gU3RyaW5nKHZhbHVlIHx8IFwiXCIpLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xyXG4gIGlmICghcmF3KSByZXR1cm4gZmFsc2U7XHJcbiAgY29uc3Qgbm9ybWFsaXplZCA9IHJhdy5yZXBsYWNlKC9bXmEtejAtOV0rL2csIFwiXCIpO1xyXG4gIHJldHVybiBub3JtYWxpemVkID09PSBcInNpbmRhdG9zXCIgfHwgbm9ybWFsaXplZCA9PT0gXCJub2RhdGFcIjtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBpc05vRGF0YVJvdyA9IChyb3c6IHVua25vd24pOiBib29sZWFuID0+IHtcclxuICBpZiAocm93ID09PSBudWxsIHx8IHJvdyA9PT0gdW5kZWZpbmVkKSByZXR1cm4gdHJ1ZTtcclxuICBpZiAoQXJyYXkuaXNBcnJheShyb3cpKSB7XHJcbiAgICByZXR1cm4gcm93Lmxlbmd0aCA9PT0gMSAmJiBpc05vRGF0YVRleHQocm93WzBdKTtcclxuICB9XHJcbiAgaWYgKHR5cGVvZiByb3cgPT09IFwic3RyaW5nXCIpIHtcclxuICAgIHJldHVybiBpc05vRGF0YVRleHQocm93KTtcclxuICB9XHJcbiAgaWYgKHR5cGVvZiByb3cgPT09IFwib2JqZWN0XCIpIHtcclxuICAgIGNvbnN0IHZhbHVlcyA9IE9iamVjdC52YWx1ZXMocm93IGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+KTtcclxuICAgIGlmICghdmFsdWVzLmxlbmd0aCkgcmV0dXJuIHRydWU7XHJcbiAgICByZXR1cm4gdmFsdWVzLnNvbWUoKHYpID0+IHR5cGVvZiB2ID09PSBcInN0cmluZ1wiICYmIGlzTm9EYXRhVGV4dCh2KSk7XHJcbiAgfVxyXG4gIHJldHVybiBmYWxzZTtcclxufTtcclxuIiwgImltcG9ydCB7IGlzTm9EYXRhUm93LCBpc05vRGF0YVRleHQgfSBmcm9tIFwiLi9ub0RhdGEudHNcIjtcclxuXHJcbmV4cG9ydCB0eXBlIEFjY291bnRJdGVtID0ge1xyXG4gIHZhbHVlOiBzdHJpbmc7XHJcbiAgdGV4dDogc3RyaW5nO1xyXG4gIGNhcmdvPzogc3RyaW5nO1xyXG4gIGVtcHJlc2E/OiBzdHJpbmc7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgbWFwQWNjb3VudEl0ZW0gPSAoaXRlbTogdW5rbm93bik6IEFjY291bnRJdGVtIHwgbnVsbCA9PiB7XHJcbiAgaWYgKGlzTm9EYXRhUm93KGl0ZW0pKSByZXR1cm4gbnVsbDtcclxuICBpZiAoQXJyYXkuaXNBcnJheShpdGVtKSkge1xyXG4gICAgY29uc3QgY29kZSA9IChpdGVtWzBdIHx8IFwiXCIpLnRvU3RyaW5nKCkudHJpbSgpO1xyXG4gICAgY29uc3QgZGVzYyA9IChpdGVtWzJdIHx8IChpdGVtIGFzIGFueSlbMV0gfHwgXCJcIikudG9TdHJpbmcoKS50cmltKCk7XHJcbiAgICBpZiAoIWNvZGUgfHwgaXNOb0RhdGFUZXh0KGNvZGUpIHx8IGlzTm9EYXRhVGV4dChkZXNjKSkgcmV0dXJuIG51bGw7XHJcbiAgICBjb25zdCB0ZXh0ID0gZGVzYyA/IGAke2Rlc2N9ICgke2NvZGV9KWAgOiBjb2RlO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdmFsdWU6IGNvZGUsXHJcbiAgICAgIHRleHQsXHJcbiAgICAgIGNhcmdvOiBcIlwiLFxyXG4gICAgICBlbXByZXNhOiBpdGVtWzJdIGFzIHN0cmluZyxcclxuICAgIH07XHJcbiAgfVxyXG4gIGlmIChpdGVtICYmIHR5cGVvZiBpdGVtID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICBjb25zdCByYXcgPSBpdGVtIGFzIGFueTtcclxuICAgIGNvbnN0IGNvZGUgPSAocmF3LmFjY291bnROdW0gfHwgcmF3LkFjY291bnROdW0gfHwgXCJcIikudG9TdHJpbmcoKS50cmltKCk7XHJcbiAgICBjb25zdCBkZXNjID0gKHJhdy5ub21icmVDb21lcmNpYWwgfHwgcmF3Lk5vbWJyZUNvbWVyY2lhbCB8fCByYXcucmF6b25Tb2NpYWwgfHwgcmF3LlJhem9uU29jaWFsIHx8IFwiXCIpXHJcbiAgICAgIC50b1N0cmluZygpXHJcbiAgICAgIC50cmltKCk7XHJcbiAgICBpZiAoIWNvZGUgfHwgaXNOb0RhdGFUZXh0KGNvZGUpIHx8IGlzTm9EYXRhVGV4dChkZXNjKSkgcmV0dXJuIG51bGw7XHJcbiAgICBjb25zdCB0ZXh0ID0gZGVzYyA/IGAke2Rlc2N9ICgke2NvZGV9KWAgOiBjb2RlO1xyXG4gICAgcmV0dXJuIHsgdmFsdWU6IGNvZGUsIHRleHQgfTtcclxuICB9XHJcbiAgcmV0dXJuIG51bGw7XHJcbn07XHJcbiIsICJleHBvcnQgY29uc3QgbWFrZUNhY2hlID0gPFQ+KGxpbWl0ID0gMTApID0+IHtcclxuICBjb25zdCBtYXAgPSBuZXcgTWFwPHN0cmluZywgVD4oKTtcclxuICByZXR1cm4ge1xyXG4gICAgZ2V0OiAoazogc3RyaW5nKSA9PiBtYXAuZ2V0KGspLFxyXG4gICAgc2V0OiAoazogc3RyaW5nLCB2OiBUKSA9PiB7XHJcbiAgICAgIGlmIChtYXAuaGFzKGspKSBtYXAuZGVsZXRlKGspO1xyXG4gICAgICBtYXAuc2V0KGssIHYpO1xyXG4gICAgICBpZiAobWFwLnNpemUgPiBsaW1pdCkge1xyXG4gICAgICAgIGNvbnN0IGZpcnN0ID0gbWFwLmtleXMoKS5uZXh0KCkudmFsdWU7XHJcbiAgICAgICAgaWYgKGZpcnN0KSBtYXAuZGVsZXRlKGZpcnN0KTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGhhczogKGs6IHN0cmluZykgPT4gbWFwLmhhcyhrKSxcclxuICAgIGNsZWFyOiAoKSA9PiBtYXAuY2xlYXIoKSxcclxuICB9O1xyXG59O1xyXG4iLCAiaW1wb3J0IHsgbWFrZUNhY2hlIH0gZnJvbSBcIi4vbWFrZUNhY2hlLnRzXCI7XHJcblxyXG5jb25zdCBDVVJSRU5UX0NPTVBBTlkgPSBTdHJpbmcoZ2xvYmFsVGhpcy5fX0lORF9TRUxFQ1RFRF9DT01QQU5ZX18gfHwgXCJcIikudHJpbSgpLnRvVXBwZXJDYXNlKCk7XHJcbmNvbnN0IENPTVBBTllfU1RPUkFHRV9TVUZGSVggPSBDVVJSRU5UX0NPTVBBTlkgPyBgXyR7Q1VSUkVOVF9DT01QQU5ZfWAgOiBcIlwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IFZJU0lUX0RSQUZUX0tFWSA9IGB2aXNpdGFzX2RyYWZ0JHtDT01QQU5ZX1NUT1JBR0VfU1VGRklYfWA7XHJcbmV4cG9ydCBjb25zdCBDT05UQUNUU19TVE9SQUdFX0tFWSA9IGB2aXNpdGFzX2NvbnRhY3RzX2NhY2hlX3YxJHtDT01QQU5ZX1NUT1JBR0VfU1VGRklYfWA7XHJcbmV4cG9ydCBjb25zdCBDT05UQUNUU19TRUxFQ1RJT05fS0VZID0gYHZpc2l0YXNfY29udGFjdHNfc2VsZWN0ZWRfdjEke0NPTVBBTllfU1RPUkFHRV9TVUZGSVh9YDtcclxuZXhwb3J0IGNvbnN0IENSRUFURV9GUkVTSF9QQVJBTSA9IFwiZnJlc2hcIjtcclxuXHJcbmNvbnN0IGNsaWVudENhY2hlID0gbWFrZUNhY2hlPHVua25vd25bXT4oMTApO1xyXG5jb25zdCBjb250YWN0c0NhY2hlID0gbWFrZUNhY2hlPHVua25vd25bXT4oMTApO1xyXG5cclxuY29uc3QgY2FjaGVLZXlXaXRoQ29tcGFueSA9IChrZXk6IHN0cmluZykgPT4gYCR7Q1VSUkVOVF9DT01QQU5ZIHx8IFwiREVGQVVMVFwifTo6JHtrZXl9YDtcclxuXHJcbmNvbnN0IHJlYWRTdG9yYWdlID0gKGtleTogc3RyaW5nKTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4gPT4ge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCByYXcgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGtleSk7XHJcbiAgICBpZiAoIXJhdykgcmV0dXJuIHt9O1xyXG4gICAgcmV0dXJuIEpTT04ucGFyc2UocmF3KTtcclxuICB9IGNhdGNoIHtcclxuICAgIHJldHVybiB7fTtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCB3cml0ZVN0b3JhZ2UgPSAoa2V5OiBzdHJpbmcsIGRhdGE6IFJlY29yZDxzdHJpbmcsIHVua25vd24+KSA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oa2V5LCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XHJcbiAgfSBjYXRjaCB7XHJcbiAgICAvLyBpZ25vcmVcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0Q2xpZW50Q2FjaGUgPSAocXVlcnk6IHN0cmluZyk6IHVua25vd25bXSB8IG51bGwgPT4ge1xyXG4gIGNvbnN0IGNhY2hlS2V5ID0gY2FjaGVLZXlXaXRoQ29tcGFueShxdWVyeSk7XHJcbiAgaWYgKCFjbGllbnRDYWNoZS5oYXMoY2FjaGVLZXkpKSByZXR1cm4gbnVsbDtcclxuICByZXR1cm4gY2xpZW50Q2FjaGUuZ2V0KGNhY2hlS2V5KSB8fCBudWxsO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGhhc0NsaWVudENhY2hlID0gKHF1ZXJ5OiBzdHJpbmcpOiBib29sZWFuID0+IHtcclxuICByZXR1cm4gY2xpZW50Q2FjaGUuaGFzKGNhY2hlS2V5V2l0aENvbXBhbnkocXVlcnkpKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBzZXRDbGllbnRDYWNoZSA9IChxdWVyeTogc3RyaW5nLCBpdGVtczogdW5rbm93bltdKTogdm9pZCA9PiB7XHJcbiAgY2xpZW50Q2FjaGUuc2V0KGNhY2hlS2V5V2l0aENvbXBhbnkocXVlcnkpLCBpdGVtcyk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0Q2FjaGVkQ29udGFjdHMgPSAoYWNjb3VudDogc3RyaW5nKTogdW5rbm93bltdIHwgbnVsbCA9PiB7XHJcbiAgY29uc3QgY2FjaGVLZXkgPSBjYWNoZUtleVdpdGhDb21wYW55KGFjY291bnQpO1xyXG4gIGlmIChjb250YWN0c0NhY2hlLmhhcyhjYWNoZUtleSkpIHJldHVybiBjb250YWN0c0NhY2hlLmdldChjYWNoZUtleSkgfHwgbnVsbDtcclxuICBjb25zdCBzdG9yZSA9IHJlYWRTdG9yYWdlKENPTlRBQ1RTX1NUT1JBR0VfS0VZKTtcclxuICBjb25zdCBjYWNoZWQgPSBzdG9yZVthY2NvdW50XTtcclxuICBpZiAoQXJyYXkuaXNBcnJheShjYWNoZWQpKSB7XHJcbiAgICBjb250YWN0c0NhY2hlLnNldChjYWNoZUtleSwgY2FjaGVkKTtcclxuICAgIHJldHVybiBjYWNoZWQ7XHJcbiAgfVxyXG4gIHJldHVybiBudWxsO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHNldENhY2hlZENvbnRhY3RzID0gKGFjY291bnQ6IHN0cmluZywgaXRlbXM6IHVua25vd25bXSk6IHZvaWQgPT4ge1xyXG4gIGNvbnRhY3RzQ2FjaGUuc2V0KGNhY2hlS2V5V2l0aENvbXBhbnkoYWNjb3VudCksIGl0ZW1zKTtcclxuICBjb25zdCBzdG9yZSA9IHJlYWRTdG9yYWdlKENPTlRBQ1RTX1NUT1JBR0VfS0VZKTtcclxuICBzdG9yZVthY2NvdW50XSA9IGl0ZW1zO1xyXG4gIHdyaXRlU3RvcmFnZShDT05UQUNUU19TVE9SQUdFX0tFWSwgc3RvcmUpO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldFN0b3JlZFNlbGVjdGlvbiA9IChhY2NvdW50OiBzdHJpbmcpOiB1bmtub3duW10gPT4ge1xyXG4gIGNvbnN0IHN0b3JlID0gcmVhZFN0b3JhZ2UoQ09OVEFDVFNfU0VMRUNUSU9OX0tFWSk7XHJcbiAgY29uc3QgcmF3ID0gc3RvcmVbYWNjb3VudF07XHJcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkocmF3KSA/IHJhdyA6IFtdO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHNldFN0b3JlZFNlbGVjdGlvbiA9IChhY2NvdW50OiBzdHJpbmcsIGl0ZW1zOiB1bmtub3duW10pOiB2b2lkID0+IHtcclxuICBjb25zdCBzdG9yZSA9IHJlYWRTdG9yYWdlKENPTlRBQ1RTX1NFTEVDVElPTl9LRVkpO1xyXG4gIHN0b3JlW2FjY291bnRdID0gaXRlbXM7XHJcbiAgd3JpdGVTdG9yYWdlKENPTlRBQ1RTX1NFTEVDVElPTl9LRVksIHN0b3JlKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBjbGVhclN0b3JlZFNlbGVjdGlvbiA9IChhY2NvdW50OiBzdHJpbmcpOiB2b2lkID0+IHtcclxuICBjb25zdCBzdG9yZSA9IHJlYWRTdG9yYWdlKENPTlRBQ1RTX1NFTEVDVElPTl9LRVkpO1xyXG4gIGlmIChzdG9yZVthY2NvdW50XSkge1xyXG4gICAgZGVsZXRlIHN0b3JlW2FjY291bnRdO1xyXG4gICAgd3JpdGVTdG9yYWdlKENPTlRBQ1RTX1NFTEVDVElPTl9LRVksIHN0b3JlKTtcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgY2xlYXJDcmVhdGVTZWxlY3Rpb25DYWNoZSA9ICgpOiB2b2lkID0+IHtcclxuICB0cnkge1xyXG4gICAgc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbShWSVNJVF9EUkFGVF9LRVkpO1xyXG4gICAgc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbShDT05UQUNUU19TVE9SQUdFX0tFWSk7XHJcbiAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKENPTlRBQ1RTX1NFTEVDVElPTl9LRVkpO1xyXG4gIH0gY2F0Y2gge1xyXG4gICAgLy8gaWdub3JlXHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHN0cmlwRnJlc2hQYXJhbSA9ICgpOiB2b2lkID0+IHtcclxuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuO1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCB1cmwgPSBuZXcgVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcclxuICAgIGlmICghdXJsLnNlYXJjaFBhcmFtcy5oYXMoQ1JFQVRFX0ZSRVNIX1BBUkFNKSkgcmV0dXJuO1xyXG4gICAgdXJsLnNlYXJjaFBhcmFtcy5kZWxldGUoQ1JFQVRFX0ZSRVNIX1BBUkFNKTtcclxuICAgIGNvbnN0IG5leHQgPSBgJHt1cmwucGF0aG5hbWV9JHt1cmwuc2VhcmNofSR7dXJsLmhhc2h9YDtcclxuICAgIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSh7fSwgXCJcIiwgbmV4dCk7XHJcbiAgfSBjYXRjaCB7XHJcbiAgICAvLyBpZ25vcmVcclxuICB9XHJcbn07XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1CQUF5RTs7O0FDQWxFLElBQU0sZUFBZSxDQUFDLFVBQTRCO0FBQ3ZELFFBQU0sTUFBTSxPQUFPLFNBQVMsRUFBRSxFQUFFLEtBQUssRUFBRSxZQUFZO0FBQ25ELE1BQUksQ0FBQyxJQUFLLFFBQU87QUFDakIsUUFBTSxhQUFhLElBQUksUUFBUSxlQUFlLEVBQUU7QUFDaEQsU0FBTyxlQUFlLGNBQWMsZUFBZTtBQUNyRDtBQUVPLElBQU0sY0FBYyxDQUFDLFFBQTBCO0FBQ3BELE1BQUksUUFBUSxRQUFRLFFBQVEsT0FBVyxRQUFPO0FBQzlDLE1BQUksTUFBTSxRQUFRLEdBQUcsR0FBRztBQUN0QixXQUFPLElBQUksV0FBVyxLQUFLLGFBQWEsSUFBSSxDQUFDLENBQUM7QUFBQSxFQUNoRDtBQUNBLE1BQUksT0FBTyxRQUFRLFVBQVU7QUFDM0IsV0FBTyxhQUFhLEdBQUc7QUFBQSxFQUN6QjtBQUNBLE1BQUksT0FBTyxRQUFRLFVB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
