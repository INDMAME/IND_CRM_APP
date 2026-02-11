import {
  handleComboboxKeyDown
} from "./chunk-6HMZLOGF.js";
import {
  ChevronDownSvg,
  ChevronUpSvg,
  FloatingList_default,
  Spinner_default,
  useOutsideClick
} from "./chunk-YSYVIEZS.js";
import {
  classNames
} from "./chunk-LKHWXI2V.js";
import {
  fetchJson,
  indFormat,
  indT
} from "./chunk-V2CDSLX2.js";
import {
  require_jsx_runtime,
  require_react
} from "./chunk-BWM3JLWG.js";
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
  const listRef = (0, import_react.useRef)(null);
  const containerRef = (0, import_react.useRef)(null);
  const boxRef = (0, import_react.useRef)(null);
  const abortRef = (0, import_react.useRef)(null);
  useOutsideClick([containerRef, listRef], () => setOpen(false));
  (0, import_react.useEffect)(() => {
    if (!value) {
      if (shouldClearOnNull) {
        setSelected(null);
        setQuery("");
      }
      return;
    }
    setSelected(value);
    setQuery(value.text || "");
  }, [value, shouldClearOnNull]);
  const filtered = (0, import_react.useMemo)(() => {
    if (!query.trim()) return options;
    const q = query.trim().toLowerCase();
    if (fetchedQuery && q !== fetchedQuery) return options;
    const match = options.filter((o) => o.text.toLowerCase().includes(q));
    return match.length > 0 ? match : options;
  }, [options, query, fetchedQuery]);
  (0, import_react.useEffect)(() => {
    setActiveIndex(0);
  }, [filtered.length, query]);
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
      setFetchedQuery(currentQuery);
      setOptions(cached);
      setStatus(
        cached.length ? indFormat("Visits_Create_ClientCountCache", "{0} clients (cache)", cached.length) : indT("Visits_Create_NoResults", "No results")
      );
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
      setFetchedQuery(currentQuery);
      setClientCache(cacheKey, items);
      setOptions(items);
      setStatus(items.length ? indFormat("Visits_Create_ClientCount", "{0} clients", items.length) : indT("Visits_Create_NoResults", "No results"));
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
    setOpen(false);
    onSelected(opt);
  };
  const requestSearchOrOpen = () => {
    if (loading || blocking) return;
    const trimmed = query.trim();
    if (trimmed.length < minChars) {
      cancelPending();
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
        selectOption(filtered[activeIndex] ?? filtered[0]);
      },
      onEnterWhenClosed: requestSearchOrOpen
    });
  };
  const queryKey = query.trim().toLowerCase();
  const isSelectionDisplay = !!selected && query === (selected.text || "");
  const showSearchIcon = !loading && !blocking && !isSelectionDisplay && queryKey.length >= minChars && (fetchedQuery === "" || queryKey !== fetchedQuery);
  const wrapperClass = isCompact ? "space-y-1 history-client-combobox" : "space-y-2";
  const labelClass = "form-label font-semibold";
  const containerClass = isCompact ? "relative w-full rounded-[5px] border border-slate-200/70 bg-transparent text-left focus-within:border-primary/70 focus-within:ring-2 focus-within:ring-primary/20 focus-within:ring-offset-0" : "relative w-full cursor-default rounded-[5px] border-slate-300 bg-white text-left shadow-xs focus-within:border-primary focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-0 sm:text-sm";
  const inputClass = isCompact ? "w-full rounded-[5px] border border-transparent bg-transparent px-3 pr-24 py-2 text-[11px] leading-5 text-slate-700 placeholder:text-slate-400 focus:outline-hidden" : "w-full rounded-[5px] border border-slate-200 px-3 py-2 pr-24 text-sm sm:text-base leading-5 text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-primary focus:border-primary";
  const emptyTextClass = isCompact ? "px-4 py-2 text-[11px] text-slate-500" : "px-4 py-2 text-sm text-slate-500";
  const optionClass = isCompact ? "relative flex w-full cursor-default select-none items-start py-2 px-3 text-left text-[11px]" : "relative flex w-full cursor-default select-none items-start py-2 px-3 text-left text-sm";
  const optionTextClass = isCompact ? "block truncate uppercase text-[12px]" : "block truncate uppercase text-[13px]";
  const optionSubTextClass = isCompact ? "block truncate uppercase text-[10px] text-slate-600" : "block truncate uppercase text-[11px] text-slate-600";
  const optionSubTextSecondaryClass = isCompact ? "block truncate uppercase text-[10px] text-slate-500" : "block truncate uppercase text-[11px] text-slate-500";
  const statusClass = isCompact ? "text-[10px] text-slate-500 tech-info" : "text-xs text-slate-500 tech-info";
  const searchIconSize = isCompact ? "h-4 w-4" : "h-5 w-5";
  const chevronIconSize = isCompact ? "h-4 w-4" : "h-5 w-5";
  const safeIdBase = idBase || (isCompact ? "history-client" : "client");
  const listId = `${safeIdBase}-options`;
  const activeId = open && filtered[activeIndex] ? `${safeIdBase}-opt-${filtered[activeIndex].value}` : void 0;
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
              setQuery(val);
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
            options.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: emptyTextClass, children: query.trim().length < minChars ? indFormat("Visits_Create_MinChars", "Type at least {0} characters.", minChars) : indT("Visits_Create_NoResults", "No results") }),
            !loading && options.length > 0 && filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: emptyTextClass, children: indT("Visits_Create_NoMatches", "No matches") }),
            !loading && filtered.map((opt, idx) => {
              const isActive = idx === activeIndex;
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvdmlzaXRhcy9DbGllbnRTZWFyY2hDb21ib2JveC50c3giLCAiLi4vLi4vcmVhY3Qvc3JjL3V0aWxzL25vRGF0YS50cyIsICIuLi8uLi9yZWFjdC9zcmMvdXRpbHMvdmlzaXRhc01hcHBpbmcudHMiLCAiLi4vLi4vcmVhY3Qvc3JjL3V0aWxzL21ha2VDYWNoZS50cyIsICIuLi8uLi9yZWFjdC9zcmMvdXRpbHMvdmlzaXRhc1N0b3JhZ2UudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgRmxvYXRpbmdMaXN0IGZyb20gXCIuLi9jb21tb25zL0Zsb2F0aW5nTGlzdC50c3hcIjtcbmltcG9ydCBTcGlubmVyIGZyb20gXCIuLi9jb21tb25zL1NwaW5uZXIudHN4XCI7XG5pbXBvcnQgeyBDaGV2cm9uRG93blN2ZywgQ2hldnJvblVwU3ZnIH0gZnJvbSBcIi4uL2NvbW1vbnMvY2hldnJvbnMudHN4XCI7XG5pbXBvcnQgeyBmZXRjaEpzb24gfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvYXBpU2VydmljZS50c1wiO1xuaW1wb3J0IHsgaGFuZGxlQ29tYm9ib3hLZXlEb3duIH0gZnJvbSBcIi4uLy4uL2hvb2tzL3VzZUNvbWJvYm94S2V5Ym9hcmQudHNcIjtcbmltcG9ydCB7IHVzZU91dHNpZGVDbGljayB9IGZyb20gXCIuLi8uLi9ob29rcy91c2VPdXRzaWRlQ2xpY2sudHNcIjtcbmltcG9ydCB7IGNsYXNzTmFtZXMgfSBmcm9tIFwiLi4vLi4vdXRpbHMvY2xhc3NOYW1lcy50c1wiO1xuaW1wb3J0IHsgaW5kRm9ybWF0LCBpbmRUIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB7IG1hcEFjY291bnRJdGVtIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Zpc2l0YXNNYXBwaW5nLnRzXCI7XG5pbXBvcnQgeyBnZXRDbGllbnRDYWNoZSwgaGFzQ2xpZW50Q2FjaGUsIHNldENsaWVudENhY2hlIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Zpc2l0YXNTdG9yYWdlLnRzXCI7XG5cbmV4cG9ydCB0eXBlIENsaWVudE9wdGlvbiA9IHtcbiAgdmFsdWU6IHN0cmluZztcbiAgdGV4dDogc3RyaW5nO1xuICBjYXJnbz86IHN0cmluZztcbiAgZW1wcmVzYT86IHN0cmluZztcbn07XG5cbnR5cGUgVmFyaWFudCA9IFwiZGVmYXVsdFwiIHwgXCJjb21wYWN0XCI7XG5cbnR5cGUgQ2xpZW50U2VhcmNoQ29tYm9ib3hQcm9wcyA9IHtcbiAgdmFsdWU6IENsaWVudE9wdGlvbiB8IG51bGw7XG4gIG9uU2VsZWN0ZWQ6ICh2YWx1ZTogQ2xpZW50T3B0aW9uIHwgbnVsbCkgPT4gdm9pZDtcbiAgbGFiZWw/OiBzdHJpbmc7XG4gIHBsYWNlaG9sZGVyPzogc3RyaW5nO1xuICB2YXJpYW50PzogVmFyaWFudDtcbiAgc2hvd0xhYmVsPzogYm9vbGVhbjtcbiAgaWRCYXNlPzogc3RyaW5nO1xuICBjbGVhck9uTnVsbD86IGJvb2xlYW47XG4gIHBvcnRhbENsYXNzTmFtZT86IHN0cmluZztcbiAgcGFuZWxDbGFzc05hbWU/OiBzdHJpbmc7XG59O1xuXG4vLyBSZXVzYWJsZSBjbGllbnQgc2VhcmNoIGNvbWJvYm94IGZvciB2aXNpdGFzIHBhZ2VzLlxuY29uc3QgQ2xpZW50U2VhcmNoQ29tYm9ib3ggPSAoe1xuICB2YWx1ZSxcbiAgb25TZWxlY3RlZCxcbiAgbGFiZWwsXG4gIHBsYWNlaG9sZGVyLFxuICB2YXJpYW50ID0gXCJkZWZhdWx0XCIsXG4gIHNob3dMYWJlbCxcbiAgaWRCYXNlLFxuICBjbGVhck9uTnVsbCxcbiAgcG9ydGFsQ2xhc3NOYW1lLFxuICBwYW5lbENsYXNzTmFtZSxcbn06IENsaWVudFNlYXJjaENvbWJvYm94UHJvcHMpID0+IHtcbiAgY29uc3QgaXNDb21wYWN0ID0gdmFyaWFudCA9PT0gXCJjb21wYWN0XCI7XG4gIGNvbnN0IHJlc29sdmVkTGFiZWwgPSBsYWJlbCB8fCBpbmRUKFwiVmlzaXRzX0NyZWF0ZV9TZWFyY2hDbGllbnRcIiwgXCJTZWFyY2ggY2xpZW50XCIpO1xuICBjb25zdCByZXNvbHZlZFBsYWNlaG9sZGVyID0gcGxhY2Vob2xkZXIgfHwgcmVzb2x2ZWRMYWJlbDtcbiAgY29uc3Qgc2hvdWxkU2hvd0xhYmVsID0gc2hvd0xhYmVsID8/ICFpc0NvbXBhY3Q7XG4gIGNvbnN0IHNob3VsZENsZWFyT25OdWxsID0gY2xlYXJPbk51bGwgPz8gaXNDb21wYWN0O1xuICBjb25zdCBtaW5DaGFycyA9IDQ7XG5cbiAgY29uc3QgW3F1ZXJ5LCBzZXRRdWVyeV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW29wdGlvbnMsIHNldE9wdGlvbnNdID0gdXNlU3RhdGU8Q2xpZW50T3B0aW9uW10+KFtdKTtcbiAgY29uc3QgW2ZldGNoZWRRdWVyeSwgc2V0RmV0Y2hlZFF1ZXJ5XSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtsb2FkaW5nTW9yZSwgc2V0TG9hZGluZ01vcmVdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbc3RhdHVzLCBzZXRTdGF0dXNdID0gdXNlU3RhdGUoaW5kRm9ybWF0KFwiVmlzaXRzX0NyZWF0ZV9NaW5DaGFyc1wiLCBcIlR5cGUgYXQgbGVhc3QgezB9IGNoYXJhY3RlcnMuXCIsIG1pbkNoYXJzKSk7XG4gIGNvbnN0IFtzZWxlY3RlZCwgc2V0U2VsZWN0ZWRdID0gdXNlU3RhdGU8Q2xpZW50T3B0aW9uIHwgbnVsbD4odmFsdWUpO1xuICBjb25zdCBbb3Blbiwgc2V0T3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtwYWdlLCBzZXRQYWdlXSA9IHVzZVN0YXRlKDEpO1xuICBjb25zdCBbaGFzTW9yZSwgc2V0SGFzTW9yZV0gPSB1c2VTdGF0ZSh0cnVlKTtcbiAgY29uc3QgW2Jsb2NraW5nLCBzZXRCbG9ja2luZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFthY3RpdmVJbmRleCwgc2V0QWN0aXZlSW5kZXhdID0gdXNlU3RhdGUoMCk7XG4gIGNvbnN0IGxpc3RSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgY29udGFpbmVyUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IGJveFJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBhYm9ydFJlZiA9IHVzZVJlZjxBYm9ydENvbnRyb2xsZXIgfCBudWxsPihudWxsKTtcblxuICB1c2VPdXRzaWRlQ2xpY2soW2NvbnRhaW5lclJlZiwgbGlzdFJlZl0sICgpID0+IHNldE9wZW4oZmFsc2UpKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghdmFsdWUpIHtcbiAgICAgIGlmIChzaG91bGRDbGVhck9uTnVsbCkge1xuICAgICAgICBzZXRTZWxlY3RlZChudWxsKTtcbiAgICAgICAgc2V0UXVlcnkoXCJcIik7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHNldFNlbGVjdGVkKHZhbHVlKTtcbiAgICBzZXRRdWVyeSh2YWx1ZS50ZXh0IHx8IFwiXCIpO1xuICB9LCBbdmFsdWUsIHNob3VsZENsZWFyT25OdWxsXSk7XG5cbiAgY29uc3QgZmlsdGVyZWQgPSB1c2VNZW1vKCgpID0+IHtcbiAgICBpZiAoIXF1ZXJ5LnRyaW0oKSkgcmV0dXJuIG9wdGlvbnM7XG4gICAgY29uc3QgcSA9IHF1ZXJ5LnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICAgIGlmIChmZXRjaGVkUXVlcnkgJiYgcSAhPT0gZmV0Y2hlZFF1ZXJ5KSByZXR1cm4gb3B0aW9ucztcbiAgICBjb25zdCBtYXRjaCA9IG9wdGlvbnMuZmlsdGVyKChvKSA9PiBvLnRleHQudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhxKSk7XG4gICAgcmV0dXJuIG1hdGNoLmxlbmd0aCA+IDAgPyBtYXRjaCA6IG9wdGlvbnM7XG4gIH0sIFtvcHRpb25zLCBxdWVyeSwgZmV0Y2hlZFF1ZXJ5XSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBzZXRBY3RpdmVJbmRleCgwKTtcbiAgfSwgW2ZpbHRlcmVkLmxlbmd0aCwgcXVlcnldKTtcblxuICBjb25zdCBjYW5jZWxQZW5kaW5nID0gKCkgPT4ge1xuICAgIGlmIChhYm9ydFJlZi5jdXJyZW50KSB7XG4gICAgICBhYm9ydFJlZi5jdXJyZW50LmFib3J0KCk7XG4gICAgICBhYm9ydFJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICB9XG4gIH07XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgaWYgKGFib3J0UmVmLmN1cnJlbnQpIHtcbiAgICAgICAgYWJvcnRSZWYuY3VycmVudC5hYm9ydCgpO1xuICAgICAgICBhYm9ydFJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9O1xuICB9LCBbXSk7XG5cbiAgY29uc3Qgc2VhcmNoID0gYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IGN1cnJlbnRRdWVyeSA9IHF1ZXJ5LnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICAgIGlmIChjdXJyZW50UXVlcnkubGVuZ3RoIDwgbWluQ2hhcnMpIHtcbiAgICAgIHNldFN0YXR1cyhpbmRGb3JtYXQoXCJWaXNpdHNfQ3JlYXRlX01pbkNoYXJzXCIsIFwiVHlwZSBhdCBsZWFzdCB7MH0gY2hhcmFjdGVycy5cIiwgbWluQ2hhcnMpKTtcbiAgICAgIHNldE9wdGlvbnMoW10pO1xuICAgICAgc2V0SGFzTW9yZShmYWxzZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNhbmNlbFBlbmRpbmcoKTtcbiAgICBzZXRQYWdlKDEpO1xuICAgIHNldEhhc01vcmUodHJ1ZSk7XG4gICAgc2V0T3BlbihmYWxzZSk7XG4gICAgY29uc3QgY2FjaGVLZXkgPSBxdWVyeS50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgICBpZiAoaGFzQ2xpZW50Q2FjaGUoY2FjaGVLZXkpKSB7XG4gICAgICBjb25zdCBjYWNoZWQgPSAoZ2V0Q2xpZW50Q2FjaGUoY2FjaGVLZXkpIHx8IFtdKSBhcyBDbGllbnRPcHRpb25bXTtcbiAgICAgIHNldEZldGNoZWRRdWVyeShjdXJyZW50UXVlcnkpO1xuICAgICAgc2V0T3B0aW9ucyhjYWNoZWQpO1xuICAgICAgc2V0U3RhdHVzKFxuICAgICAgICBjYWNoZWQubGVuZ3RoXG4gICAgICAgICAgPyBpbmRGb3JtYXQoXCJWaXNpdHNfQ3JlYXRlX0NsaWVudENvdW50Q2FjaGVcIiwgXCJ7MH0gY2xpZW50cyAoY2FjaGUpXCIsIGNhY2hlZC5sZW5ndGgpXG4gICAgICAgICAgOiBpbmRUKFwiVmlzaXRzX0NyZWF0ZV9Ob1Jlc3VsdHNcIiwgXCJObyByZXN1bHRzXCIpXG4gICAgICApO1xuICAgICAgc2V0SGFzTW9yZShjYWNoZWQubGVuZ3RoID09PSAxMCk7XG4gICAgICBzZXRPcGVuKHRydWUpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzZXRMb2FkaW5nKHRydWUpO1xuICAgIHNldEJsb2NraW5nKHRydWUpO1xuICAgIHNldFN0YXR1cyhpbmRUKFwiVmlzaXRzX0NyZWF0ZV9TZWFyY2hpbmdcIiwgXCJTZWFyY2hpbmcuLi5cIikpO1xuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XG4gICAgYWJvcnRSZWYuY3VycmVudCA9IGNvbnRyb2xsZXI7XG4gICAgbGV0IHNob3VsZE9wZW5PbkZpbmlzaCA9IGZhbHNlO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB1cmwgPSBgL1Zpc2l0YXMvR2V0QWNjb3VudHNGb3JEcm9wZG93bj90ZXJtPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHF1ZXJ5KX0mcGFnZT0xJnBhZ2VTaXplPTEwYDtcbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBmZXRjaEpzb248eyBpdGVtcz86IHVua25vd25bXSB9Pih1cmwsIHsgc2lnbmFsOiBjb250cm9sbGVyLnNpZ25hbCB9KTtcbiAgICAgIGNvbnN0IGl0ZW1zID0gKGRhdGEuaXRlbXMgfHwgW10pLm1hcChtYXBBY2NvdW50SXRlbSkuZmlsdGVyKEJvb2xlYW4pIGFzIENsaWVudE9wdGlvbltdO1xuICAgICAgc2V0RmV0Y2hlZFF1ZXJ5KGN1cnJlbnRRdWVyeSk7XG4gICAgICBzZXRDbGllbnRDYWNoZShjYWNoZUtleSwgaXRlbXMpO1xuICAgICAgc2V0T3B0aW9ucyhpdGVtcyk7XG4gICAgICBzZXRTdGF0dXMoaXRlbXMubGVuZ3RoID8gaW5kRm9ybWF0KFwiVmlzaXRzX0NyZWF0ZV9DbGllbnRDb3VudFwiLCBcInswfSBjbGllbnRzXCIsIGl0ZW1zLmxlbmd0aCkgOiBpbmRUKFwiVmlzaXRzX0NyZWF0ZV9Ob1Jlc3VsdHNcIiwgXCJObyByZXN1bHRzXCIpKTtcbiAgICAgIHNldEhhc01vcmUoaXRlbXMubGVuZ3RoID09PSAxMCk7XG4gICAgICBzaG91bGRPcGVuT25GaW5pc2ggPSB0cnVlO1xuICAgIH0gY2F0Y2ggKGVycjogYW55KSB7XG4gICAgICBpZiAoZXJyPy5uYW1lID09PSBcIkFib3J0RXJyb3JcIikge1xuICAgICAgICBzZXRTdGF0dXMoaW5kVChcIlZpc2l0c19DcmVhdGVfU2VhcmNoQ2FuY2VsZWRcIiwgXCJTZWFyY2ggY2FuY2VsZWQuXCIpKTtcbiAgICAgIH0gZWxzZSBpZiAoU3RyaW5nKGVycj8ubWVzc2FnZSB8fCBcIlwiKS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKFwidGltZW91dFwiKSkge1xuICAgICAgICBzZXRTdGF0dXMoaW5kVChcIlZpc2l0c19DcmVhdGVfU2VhcmNoVGltZW91dFwiLCBcIlRoZSBzZWFyY2ggdG9vayB0b28gbG9uZy4gVHlwZSBtb3JlIGNoYXJhY3RlcnMgdG8gbmFycm93IGRvd24uXCIpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNldFN0YXR1cyhpbmRUKFwiVmlzaXRzX0NyZWF0ZV9Mb2FkQ2xpZW50c0Vycm9yXCIsIFwiRmFpbGVkIHRvIGxvYWQgY2xpZW50cy5cIikpO1xuICAgICAgfVxuICAgIH0gZmluYWxseSB7XG4gICAgICBhYm9ydFJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgICAgc2V0QmxvY2tpbmcoZmFsc2UpO1xuICAgICAgaWYgKHNob3VsZE9wZW5PbkZpbmlzaCkgc2V0T3Blbih0cnVlKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgbG9hZE1vcmUgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XG4gICAgaWYgKGxvYWRpbmdNb3JlIHx8IGxvYWRpbmcgfHwgIWhhc01vcmUgfHwgcXVlcnkudHJpbSgpLmxlbmd0aCA8IG1pbkNoYXJzKSByZXR1cm47XG4gICAgc2V0TG9hZGluZ01vcmUodHJ1ZSk7XG4gICAgc2V0QmxvY2tpbmcodHJ1ZSk7XG4gICAgY29uc3QgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcbiAgICBhYm9ydFJlZi5jdXJyZW50ID0gY29udHJvbGxlcjtcbiAgICB0cnkge1xuICAgICAgY29uc3QgbmV4dFBhZ2UgPSBwYWdlICsgMTtcbiAgICAgIGNvbnN0IHVybCA9IGAvVmlzaXRhcy9HZXRBY2NvdW50c0ZvckRyb3Bkb3duP3Rlcm09JHtlbmNvZGVVUklDb21wb25lbnQocXVlcnkpfSZwYWdlPSR7bmV4dFBhZ2V9JnBhZ2VTaXplPTEwYDtcbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBmZXRjaEpzb248eyBpdGVtcz86IHVua25vd25bXSB9Pih1cmwsIHsgc2lnbmFsOiBjb250cm9sbGVyLnNpZ25hbCB9KTtcbiAgICAgIGNvbnN0IGl0ZW1zID0gKGRhdGEuaXRlbXMgfHwgW10pLm1hcChtYXBBY2NvdW50SXRlbSkuZmlsdGVyKEJvb2xlYW4pIGFzIENsaWVudE9wdGlvbltdO1xuICAgICAgc2V0T3B0aW9ucygocHJldikgPT4gWy4uLnByZXYsIC4uLml0ZW1zXSk7XG4gICAgICBzZXRQYWdlKG5leHRQYWdlKTtcbiAgICAgIHNldEhhc01vcmUoaXRlbXMubGVuZ3RoID09PSAxMCk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGFib3J0UmVmLmN1cnJlbnQgPSBudWxsO1xuICAgICAgc2V0TG9hZGluZ01vcmUoZmFsc2UpO1xuICAgICAgc2V0QmxvY2tpbmcoZmFsc2UpO1xuICAgIH1cbiAgfSwgW2xvYWRpbmdNb3JlLCBsb2FkaW5nLCBoYXNNb3JlLCBxdWVyeSwgcGFnZSwgbWluQ2hhcnNdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghb3BlbiB8fCAhbGlzdFJlZi5jdXJyZW50KSByZXR1cm47XG4gICAgY29uc3QgZWwgPSBsaXN0UmVmLmN1cnJlbnQ7XG4gICAgY29uc3Qgb25TY3JvbGwgPSAoKSA9PiB7XG4gICAgICBpZiAoZWwuc2Nyb2xsVG9wICsgZWwuY2xpZW50SGVpZ2h0ID49IGVsLnNjcm9sbEhlaWdodCAtIDgpIGxvYWRNb3JlKCk7XG4gICAgfTtcbiAgICBlbC5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIG9uU2Nyb2xsLCB7IHBhc3NpdmU6IHRydWUgfSk7XG4gICAgcmV0dXJuICgpID0+IGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgb25TY3JvbGwpO1xuICB9LCBbb3BlbiwgbG9hZE1vcmVdKTtcblxuICBjb25zdCBzZWxlY3RPcHRpb24gPSAob3B0OiBDbGllbnRPcHRpb24pID0+IHtcbiAgICBzZXRTZWxlY3RlZChvcHQpO1xuICAgIHNldFF1ZXJ5KG9wdC50ZXh0KTtcbiAgICBzZXRPcGVuKGZhbHNlKTtcbiAgICBvblNlbGVjdGVkKG9wdCk7XG4gIH07XG5cbiAgY29uc3QgcmVxdWVzdFNlYXJjaE9yT3BlbiA9ICgpID0+IHtcbiAgICBpZiAobG9hZGluZyB8fCBibG9ja2luZykgcmV0dXJuO1xuICAgIGNvbnN0IHRyaW1tZWQgPSBxdWVyeS50cmltKCk7XG4gICAgaWYgKHRyaW1tZWQubGVuZ3RoIDwgbWluQ2hhcnMpIHtcbiAgICAgIGNhbmNlbFBlbmRpbmcoKTtcbiAgICAgIHNldE9wdGlvbnMoW10pO1xuICAgICAgc2V0SGFzTW9yZShmYWxzZSk7XG4gICAgICBzZXRTdGF0dXMoaW5kRm9ybWF0KFwiVmlzaXRzX0NyZWF0ZV9NaW5DaGFyc1wiLCBcIlR5cGUgYXQgbGVhc3QgezB9IGNoYXJhY3RlcnMuXCIsIG1pbkNoYXJzKSk7XG4gICAgICBzZXRPcGVuKHRydWUpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHFLZXkgPSB0cmltbWVkLnRvTG93ZXJDYXNlKCk7XG4gICAgY29uc3QgaXNTZWxlY3Rpb25EaXNwbGF5ID0gISFzZWxlY3RlZCAmJiBxdWVyeSA9PT0gKHNlbGVjdGVkLnRleHQgfHwgXCJcIik7XG4gICAgY29uc3Qgc2hvdWxkU2VhcmNoID0gIWlzU2VsZWN0aW9uRGlzcGxheSAmJiBxS2V5ICE9PSBmZXRjaGVkUXVlcnk7XG5cbiAgICBpZiAoc2hvdWxkU2VhcmNoKSB7XG4gICAgICBzZWFyY2goKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzZXRPcGVuKHRydWUpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUtleURvd24gPSAoZXY6IFJlYWN0LktleWJvYXJkRXZlbnQ8SFRNTElucHV0RWxlbWVudD4pID0+IHtcbiAgICBoYW5kbGVDb21ib2JveEtleURvd24oZXYsIHtcbiAgICAgIGlzT3Blbjogb3BlbixcbiAgICAgIHNldE9wZW4sXG4gICAgICBvcHRpb25Db3VudDogZmlsdGVyZWQubGVuZ3RoLFxuICAgICAgc2V0QWN0aXZlSW5kZXgsXG4gICAgICByZXF1aXJlT3BlbkZvckFycm93czogdHJ1ZSxcbiAgICAgIG9uRW50ZXJXaGVuT3BlbjogKCkgPT4ge1xuICAgICAgICBzZWxlY3RPcHRpb24oZmlsdGVyZWRbYWN0aXZlSW5kZXhdID8/IGZpbHRlcmVkWzBdKTtcbiAgICAgIH0sXG4gICAgICBvbkVudGVyV2hlbkNsb3NlZDogcmVxdWVzdFNlYXJjaE9yT3BlbixcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBxdWVyeUtleSA9IHF1ZXJ5LnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICBjb25zdCBpc1NlbGVjdGlvbkRpc3BsYXkgPSAhIXNlbGVjdGVkICYmIHF1ZXJ5ID09PSAoc2VsZWN0ZWQudGV4dCB8fCBcIlwiKTtcbiAgY29uc3Qgc2hvd1NlYXJjaEljb24gPVxuICAgICFsb2FkaW5nICYmICFibG9ja2luZyAmJiAhaXNTZWxlY3Rpb25EaXNwbGF5ICYmIHF1ZXJ5S2V5Lmxlbmd0aCA+PSBtaW5DaGFycyAmJiAoZmV0Y2hlZFF1ZXJ5ID09PSBcIlwiIHx8IHF1ZXJ5S2V5ICE9PSBmZXRjaGVkUXVlcnkpO1xuXG4gIGNvbnN0IHdyYXBwZXJDbGFzcyA9IGlzQ29tcGFjdCA/IFwic3BhY2UteS0xIGhpc3RvcnktY2xpZW50LWNvbWJvYm94XCIgOiBcInNwYWNlLXktMlwiO1xuICBjb25zdCBsYWJlbENsYXNzID0gXCJmb3JtLWxhYmVsIGZvbnQtc2VtaWJvbGRcIjtcbiAgY29uc3QgY29udGFpbmVyQ2xhc3MgPSBpc0NvbXBhY3RcbiAgICA/IFwicmVsYXRpdmUgdy1mdWxsIHJvdW5kZWQtWzVweF0gYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAvNzAgYmctdHJhbnNwYXJlbnQgdGV4dC1sZWZ0IGZvY3VzLXdpdGhpbjpib3JkZXItcHJpbWFyeS83MCBmb2N1cy13aXRoaW46cmluZy0yIGZvY3VzLXdpdGhpbjpyaW5nLXByaW1hcnkvMjAgZm9jdXMtd2l0aGluOnJpbmctb2Zmc2V0LTBcIlxuICAgIDogXCJyZWxhdGl2ZSB3LWZ1bGwgY3Vyc29yLWRlZmF1bHQgcm91bmRlZC1bNXB4XSBib3JkZXItc2xhdGUtMzAwIGJnLXdoaXRlIHRleHQtbGVmdCBzaGFkb3cteHMgZm9jdXMtd2l0aGluOmJvcmRlci1wcmltYXJ5IGZvY3VzLXdpdGhpbjpyaW5nLTIgZm9jdXMtd2l0aGluOnJpbmctcHJpbWFyeSBmb2N1cy13aXRoaW46cmluZy1vZmZzZXQtMCBzbTp0ZXh0LXNtXCI7XG4gIGNvbnN0IGlucHV0Q2xhc3MgPSBpc0NvbXBhY3RcbiAgICA/IFwidy1mdWxsIHJvdW5kZWQtWzVweF0gYm9yZGVyIGJvcmRlci10cmFuc3BhcmVudCBiZy10cmFuc3BhcmVudCBweC0zIHByLTI0IHB5LTIgdGV4dC1bMTFweF0gbGVhZGluZy01IHRleHQtc2xhdGUtNzAwIHBsYWNlaG9sZGVyOnRleHQtc2xhdGUtNDAwIGZvY3VzOm91dGxpbmUtaGlkZGVuXCJcbiAgICA6IFwidy1mdWxsIHJvdW5kZWQtWzVweF0gYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgcHgtMyBweS0yIHByLTI0IHRleHQtc20gc206dGV4dC1iYXNlIGxlYWRpbmctNSB0ZXh0LXNsYXRlLTkwMCBwbGFjZWhvbGRlcjp0ZXh0LXNsYXRlLTQwMCBmb2N1czpvdXRsaW5lLWhpZGRlbiBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1wcmltYXJ5IGZvY3VzOmJvcmRlci1wcmltYXJ5XCI7XG4gIGNvbnN0IGVtcHR5VGV4dENsYXNzID0gaXNDb21wYWN0ID8gXCJweC00IHB5LTIgdGV4dC1bMTFweF0gdGV4dC1zbGF0ZS01MDBcIiA6IFwicHgtNCBweS0yIHRleHQtc20gdGV4dC1zbGF0ZS01MDBcIjtcbiAgY29uc3Qgb3B0aW9uQ2xhc3MgPSBpc0NvbXBhY3RcbiAgICA/IFwicmVsYXRpdmUgZmxleCB3LWZ1bGwgY3Vyc29yLWRlZmF1bHQgc2VsZWN0LW5vbmUgaXRlbXMtc3RhcnQgcHktMiBweC0zIHRleHQtbGVmdCB0ZXh0LVsxMXB4XVwiXG4gICAgOiBcInJlbGF0aXZlIGZsZXggdy1mdWxsIGN1cnNvci1kZWZhdWx0IHNlbGVjdC1ub25lIGl0ZW1zLXN0YXJ0IHB5LTIgcHgtMyB0ZXh0LWxlZnQgdGV4dC1zbVwiO1xuICBjb25zdCBvcHRpb25UZXh0Q2xhc3MgPSBpc0NvbXBhY3QgPyBcImJsb2NrIHRydW5jYXRlIHVwcGVyY2FzZSB0ZXh0LVsxMnB4XVwiIDogXCJibG9jayB0cnVuY2F0ZSB1cHBlcmNhc2UgdGV4dC1bMTNweF1cIjtcbiAgY29uc3Qgb3B0aW9uU3ViVGV4dENsYXNzID0gaXNDb21wYWN0ID8gXCJibG9jayB0cnVuY2F0ZSB1cHBlcmNhc2UgdGV4dC1bMTBweF0gdGV4dC1zbGF0ZS02MDBcIiA6IFwiYmxvY2sgdHJ1bmNhdGUgdXBwZXJjYXNlIHRleHQtWzExcHhdIHRleHQtc2xhdGUtNjAwXCI7XG4gIGNvbnN0IG9wdGlvblN1YlRleHRTZWNvbmRhcnlDbGFzcyA9IGlzQ29tcGFjdFxuICAgID8gXCJibG9jayB0cnVuY2F0ZSB1cHBlcmNhc2UgdGV4dC1bMTBweF0gdGV4dC1zbGF0ZS01MDBcIlxuICAgIDogXCJibG9jayB0cnVuY2F0ZSB1cHBlcmNhc2UgdGV4dC1bMTFweF0gdGV4dC1zbGF0ZS01MDBcIjtcbiAgY29uc3Qgc3RhdHVzQ2xhc3MgPSBpc0NvbXBhY3QgPyBcInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNTAwIHRlY2gtaW5mb1wiIDogXCJ0ZXh0LXhzIHRleHQtc2xhdGUtNTAwIHRlY2gtaW5mb1wiO1xuICBjb25zdCBzZWFyY2hJY29uU2l6ZSA9IGlzQ29tcGFjdCA/IFwiaC00IHctNFwiIDogXCJoLTUgdy01XCI7XG4gIGNvbnN0IGNoZXZyb25JY29uU2l6ZSA9IGlzQ29tcGFjdCA/IFwiaC00IHctNFwiIDogXCJoLTUgdy01XCI7XG5cbiAgY29uc3Qgc2FmZUlkQmFzZSA9IGlkQmFzZSB8fCAoaXNDb21wYWN0ID8gXCJoaXN0b3J5LWNsaWVudFwiIDogXCJjbGllbnRcIik7XG4gIGNvbnN0IGxpc3RJZCA9IGAke3NhZmVJZEJhc2V9LW9wdGlvbnNgO1xuICBjb25zdCBhY3RpdmVJZCA9IG9wZW4gJiYgZmlsdGVyZWRbYWN0aXZlSW5kZXhdID8gYCR7c2FmZUlkQmFzZX0tb3B0LSR7ZmlsdGVyZWRbYWN0aXZlSW5kZXhdLnZhbHVlfWAgOiB1bmRlZmluZWQ7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT17d3JhcHBlckNsYXNzfSByZWY9e2NvbnRhaW5lclJlZn0+XG4gICAgICB7c2hvdWxkU2hvd0xhYmVsICYmIDxsYWJlbCBjbGFzc05hbWU9e2xhYmVsQ2xhc3N9PntyZXNvbHZlZExhYmVsfTwvbGFiZWw+fVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZVwiPlxuICAgICAgICA8ZGl2IHJlZj17Ym94UmVmfSBjbGFzc05hbWU9e2NvbnRhaW5lckNsYXNzfT5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIGNsYXNzTmFtZT17aW5wdXRDbGFzc31cbiAgICAgICAgICAgIHZhbHVlPXtxdWVyeX1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgdmFsID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgICAgICAgICAgICBzZXRRdWVyeSh2YWwpO1xuICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWQgJiYgdmFsICE9PSAoc2VsZWN0ZWQudGV4dCB8fCBcIlwiKSkge1xuICAgICAgICAgICAgICAgIHNldFNlbGVjdGVkKG51bGwpO1xuICAgICAgICAgICAgICAgIG9uU2VsZWN0ZWQ/LihudWxsKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjYW5jZWxQZW5kaW5nKCk7XG4gICAgICAgICAgICAgIHNldEZldGNoZWRRdWVyeShcIlwiKTtcbiAgICAgICAgICAgICAgc2V0T3B0aW9ucyhbXSk7XG4gICAgICAgICAgICAgIHNldEhhc01vcmUoZmFsc2UpO1xuICAgICAgICAgICAgICBzZXRTdGF0dXMoXG4gICAgICAgICAgICAgICAgdmFsLnRyaW0oKS5sZW5ndGggPCBtaW5DaGFyc1xuICAgICAgICAgICAgICAgICAgPyBpbmRGb3JtYXQoXCJWaXNpdHNfQ3JlYXRlX01pbkNoYXJzXCIsIFwiVHlwZSBhdCBsZWFzdCB7MH0gY2hhcmFjdGVycy5cIiwgbWluQ2hhcnMpXG4gICAgICAgICAgICAgICAgICA6IGluZFQoXCJWaXNpdHNfQ3JlYXRlX1ByZXNzU2VhcmNoSGludFwiLCBcIlByZXNzIHNlYXJjaCwgRW50ZXIgb3IgQXJyb3dEb3duIHRvIHNlYXJjaC5cIilcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgc2V0T3BlbihmYWxzZSk7XG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgb25LZXlEb3duPXtoYW5kbGVLZXlEb3dufVxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e3Jlc29sdmVkUGxhY2Vob2xkZXJ9XG4gICAgICAgICAgICBhcmlhLWxhYmVsPXtyZXNvbHZlZExhYmVsfVxuICAgICAgICAgICAgcmVhZE9ubHk9e2xvYWRpbmcgfHwgYmxvY2tpbmd9XG4gICAgICAgICAgICBhcmlhLWJ1c3k9e2xvYWRpbmcgfHwgYmxvY2tpbmd9XG4gICAgICAgICAgICByb2xlPVwiY29tYm9ib3hcIlxuICAgICAgICAgICAgYXJpYS1leHBhbmRlZD17b3Blbn1cbiAgICAgICAgICAgIGFyaWEtY29udHJvbHM9e2xpc3RJZH1cbiAgICAgICAgICAgIGFyaWEtYWN0aXZlZGVzY2VuZGFudD17YWN0aXZlSWR9XG4gICAgICAgICAgLz5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQteS0wIHJpZ2h0LTAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgcHItMlwiPlxuICAgICAgICAgICAgeyhsb2FkaW5nIHx8IGJsb2NraW5nKSAmJiAoXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHB4LTJcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cbiAgICAgICAgICAgICAgICB7aXNDb21wYWN0ID8gPFNwaW5uZXIgc2l6ZT1cImgtNCB3LTRcIiAvPiA6IDxTcGlubmVyIC8+fVxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICApfVxuXG4gICAgICAgICAgICB7c2hvd1NlYXJjaEljb24gJiYgKFxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgcC0xLjUgdGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC1zbGF0ZS01MDBcIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3JlcXVlc3RTZWFyY2hPck9wZW59XG4gICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17aW5kVChcIlZpc2l0c19DcmVhdGVfU2VhcmNoQ2xpZW50XCIsIFwiU2VhcmNoIGNsaWVudFwiKX1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGZpbGw9XCJub25lXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIHN0cm9rZVdpZHRoPXsxLjV9IHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIGNsYXNzTmFtZT17c2VhcmNoSWNvblNpemV9PlxuICAgICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJtMTUuNzUgMTUuNzUtMi40ODktMi40ODltMCAwYTMuMzc1IDMuMzc1IDAgMSAwLTQuNzczLTQuNzczIDMuMzc1IDMuMzc1IDAgMCAwIDQuNzc0IDQuNzc0Wk0yMSAxMmE5IDkgMCAxIDEtMTggMCA5IDkgMCAwIDEgMTggMFpcIiAvPlxuICAgICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHAtMS41IHRleHQtc2xhdGUtNTAwIGhvdmVyOnRleHQtc2xhdGUtNjAwXCJcbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChsb2FkaW5nIHx8IGJsb2NraW5nKSByZXR1cm47XG4gICAgICAgICAgICAgICAgaWYgKG9wZW4pIHtcbiAgICAgICAgICAgICAgICAgIHNldE9wZW4oZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXF1ZXN0U2VhcmNoT3JPcGVuKCk7XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgIGRpc2FibGVkPXtsb2FkaW5nIHx8IGJsb2NraW5nfVxuICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtcbiAgICAgICAgICAgICAgICBvcGVuXG4gICAgICAgICAgICAgICAgICA/IGluZFQoXCJWaXNpdHNfQ3JlYXRlX0hpZGVDbGllbnRPcHRpb25zXCIsIFwiSGlkZSBjbGllbnQgb3B0aW9uc1wiKVxuICAgICAgICAgICAgICAgICAgOiBpbmRUKFwiVmlzaXRzX0NyZWF0ZV9TaG93Q2xpZW50T3B0aW9uc1wiLCBcIlNob3cgY2xpZW50IG9wdGlvbnNcIilcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7b3BlbiA/IDxDaGV2cm9uVXBTdmcgY2xhc3NOYW1lPXtjaGV2cm9uSWNvblNpemV9IC8+IDogPENoZXZyb25Eb3duU3ZnIGNsYXNzTmFtZT17Y2hldnJvbkljb25TaXplfSAvPn1cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDxGbG9hdGluZ0xpc3RcbiAgICAgICAgYW5jaG9yUmVmPXtib3hSZWZ9XG4gICAgICAgIG9wZW49e29wZW59XG4gICAgICAgIHpJbmRleD17NDAwMDAwfVxuICAgICAgICBtYXhIZWlnaHRDbGFzcz1cIm1heC1oLTcyXCJcbiAgICAgICAgcm9sZT1cImxpc3Rib3hcIlxuICAgICAgICByb3VuZGVkQ2xhc3M9XCJyb3VuZGVkLVs1cHhdXCJcbiAgICAgICAgcG9ydGFsQ2xhc3NOYW1lPXtwb3J0YWxDbGFzc05hbWV9XG4gICAgICAgIHBhbmVsQ2xhc3NOYW1lPXtwYW5lbENsYXNzTmFtZX1cbiAgICAgID5cbiAgICAgICAgICA8ZGl2IHJlZj17bGlzdFJlZn0gaWQ9e2xpc3RJZH0+XG4gICAgICAgICAgICB7b3B0aW9ucy5sZW5ndGggPT09IDAgJiYgKFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17ZW1wdHlUZXh0Q2xhc3N9PlxuICAgICAgICAgICAgICAgIHtxdWVyeS50cmltKCkubGVuZ3RoIDwgbWluQ2hhcnNcbiAgICAgICAgICAgICAgICAgID8gaW5kRm9ybWF0KFwiVmlzaXRzX0NyZWF0ZV9NaW5DaGFyc1wiLCBcIlR5cGUgYXQgbGVhc3QgezB9IGNoYXJhY3RlcnMuXCIsIG1pbkNoYXJzKVxuICAgICAgICAgICAgICAgICAgOiBpbmRUKFwiVmlzaXRzX0NyZWF0ZV9Ob1Jlc3VsdHNcIiwgXCJObyByZXN1bHRzXCIpfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICB7IWxvYWRpbmcgJiYgb3B0aW9ucy5sZW5ndGggPiAwICYmIGZpbHRlcmVkLmxlbmd0aCA9PT0gMCAmJiAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtlbXB0eVRleHRDbGFzc30+e2luZFQoXCJWaXNpdHNfQ3JlYXRlX05vTWF0Y2hlc1wiLCBcIk5vIG1hdGNoZXNcIil9PC9kaXY+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgeyFsb2FkaW5nICYmXG4gICAgICAgICAgICAgIGZpbHRlcmVkLm1hcCgob3B0LCBpZHgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBpc0FjdGl2ZSA9IGlkeCA9PT0gYWN0aXZlSW5kZXg7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2VsID0gc2VsZWN0ZWQ/LnZhbHVlID09PSBvcHQudmFsdWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgIGtleT17b3B0LnZhbHVlfVxuICAgICAgICAgICAgICAgICAgICBpZD17YCR7c2FmZUlkQmFzZX0tb3B0LSR7b3B0LnZhbHVlfWB9XG4gICAgICAgICAgICAgICAgICAgIHJvbGU9XCJvcHRpb25cIlxuICAgICAgICAgICAgICAgICAgICBhcmlhLXNlbGVjdGVkPXtzZWx9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgICAgICAgICAgICAgICBvcHRpb25DbGFzcyxcbiAgICAgICAgICAgICAgICAgICAgICBpc0FjdGl2ZSA/IFwiYmctcHJpbWFyeSB0ZXh0LXdoaXRlXCIgOiBzZWwgPyBcImJnLXByaW1hcnkvMTAgdGV4dC1wcmltYXJ5XCIgOiBpc0NvbXBhY3QgPyBcInRleHQtc2xhdGUtNzAwXCIgOiBcInRleHQtc2xhdGUtOTAwXCJcbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgb25Nb3VzZUVudGVyPXsoKSA9PiBzZXRBY3RpdmVJbmRleChpZHgpfVxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZWxlY3RPcHRpb24ob3B0KX1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIHNwYWNlLXktMC41XCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtjbGFzc05hbWVzKG9wdGlvblRleHRDbGFzcywgc2VsID8gXCJmb250LXNlbWlib2xkXCIgOiBcImZvbnQtbm9ybWFsXCIpfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtvcHQudGV4dH1cbiAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAge2lzQ29tcGFjdCA/IChcbiAgICAgICAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtvcHQuY2FyZ28gJiYgPHNwYW4gY2xhc3NOYW1lPXtvcHRpb25TdWJUZXh0Q2xhc3N9PntvcHQuY2FyZ299PC9zcGFuPn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAge29wdC5lbXByZXNhICYmIDxzcGFuIGNsYXNzTmFtZT17b3B0aW9uU3ViVGV4dFNlY29uZGFyeUNsYXNzfT57b3B0LmVtcHJlc2F9PC9zcGFuPn1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e29wdGlvblN1YlRleHRDbGFzc30+e29wdC5jYXJnbyB8fCBcIlwifTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtvcHRpb25TdWJUZXh0U2Vjb25kYXJ5Q2xhc3N9PntvcHQuZW1wcmVzYSB8fCBcIlwifTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvRmxvYXRpbmdMaXN0PlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBmbGV4IGp1c3RpZnktZW5kXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT17c3RhdHVzQ2xhc3N9PntzdGF0dXN9PC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDbGllbnRTZWFyY2hDb21ib2JveDtcbiIsICJleHBvcnQgY29uc3QgaXNOb0RhdGFUZXh0ID0gKHZhbHVlOiB1bmtub3duKTogYm9vbGVhbiA9PiB7XG4gIGNvbnN0IHJhdyA9IFN0cmluZyh2YWx1ZSB8fCBcIlwiKS50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgaWYgKCFyYXcpIHJldHVybiBmYWxzZTtcbiAgY29uc3Qgbm9ybWFsaXplZCA9IHJhdy5yZXBsYWNlKC9bXmEtejAtOV0rL2csIFwiXCIpO1xuICByZXR1cm4gbm9ybWFsaXplZCA9PT0gXCJzaW5kYXRvc1wiIHx8IG5vcm1hbGl6ZWQgPT09IFwibm9kYXRhXCI7XG59O1xuXG5leHBvcnQgY29uc3QgaXNOb0RhdGFSb3cgPSAocm93OiB1bmtub3duKTogYm9vbGVhbiA9PiB7XG4gIGlmIChyb3cgPT09IG51bGwgfHwgcm93ID09PSB1bmRlZmluZWQpIHJldHVybiB0cnVlO1xuICBpZiAoQXJyYXkuaXNBcnJheShyb3cpKSB7XG4gICAgcmV0dXJuIHJvdy5sZW5ndGggPT09IDEgJiYgaXNOb0RhdGFUZXh0KHJvd1swXSk7XG4gIH1cbiAgaWYgKHR5cGVvZiByb3cgPT09IFwic3RyaW5nXCIpIHtcbiAgICByZXR1cm4gaXNOb0RhdGFUZXh0KHJvdyk7XG4gIH1cbiAgaWYgKHR5cGVvZiByb3cgPT09IFwib2JqZWN0XCIpIHtcbiAgICBjb25zdCB2YWx1ZXMgPSBPYmplY3QudmFsdWVzKHJvdyBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPik7XG4gICAgaWYgKCF2YWx1ZXMubGVuZ3RoKSByZXR1cm4gdHJ1ZTtcbiAgICByZXR1cm4gdmFsdWVzLnNvbWUoKHYpID0+IHR5cGVvZiB2ID09PSBcInN0cmluZ1wiICYmIGlzTm9EYXRhVGV4dCh2KSk7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcbiIsICJpbXBvcnQgeyBpc05vRGF0YVJvdywgaXNOb0RhdGFUZXh0IH0gZnJvbSBcIi4vbm9EYXRhLnRzXCI7XG5cbmV4cG9ydCB0eXBlIEFjY291bnRJdGVtID0ge1xuICB2YWx1ZTogc3RyaW5nO1xuICB0ZXh0OiBzdHJpbmc7XG4gIGNhcmdvPzogc3RyaW5nO1xuICBlbXByZXNhPzogc3RyaW5nO1xufTtcblxuZXhwb3J0IGNvbnN0IG1hcEFjY291bnRJdGVtID0gKGl0ZW06IHVua25vd24pOiBBY2NvdW50SXRlbSB8IG51bGwgPT4ge1xuICBpZiAoaXNOb0RhdGFSb3coaXRlbSkpIHJldHVybiBudWxsO1xuICBpZiAoQXJyYXkuaXNBcnJheShpdGVtKSkge1xuICAgIGNvbnN0IGNvZGUgPSAoaXRlbVswXSB8fCBcIlwiKS50b1N0cmluZygpLnRyaW0oKTtcbiAgICBjb25zdCBkZXNjID0gKGl0ZW1bMl0gfHwgKGl0ZW0gYXMgYW55KVsxXSB8fCBcIlwiKS50b1N0cmluZygpLnRyaW0oKTtcbiAgICBpZiAoIWNvZGUgfHwgaXNOb0RhdGFUZXh0KGNvZGUpIHx8IGlzTm9EYXRhVGV4dChkZXNjKSkgcmV0dXJuIG51bGw7XG4gICAgY29uc3QgdGV4dCA9IGRlc2MgPyBgJHtkZXNjfSAoJHtjb2RlfSlgIDogY29kZTtcbiAgICByZXR1cm4ge1xuICAgICAgdmFsdWU6IGNvZGUsXG4gICAgICB0ZXh0LFxuICAgICAgY2FyZ286IFwiXCIsXG4gICAgICBlbXByZXNhOiBpdGVtWzJdIGFzIHN0cmluZyxcbiAgICB9O1xuICB9XG4gIGlmIChpdGVtICYmIHR5cGVvZiBpdGVtID09PSBcIm9iamVjdFwiKSB7XG4gICAgY29uc3QgcmF3ID0gaXRlbSBhcyBhbnk7XG4gICAgY29uc3QgY29kZSA9IChyYXcuYWNjb3VudE51bSB8fCByYXcuQWNjb3VudE51bSB8fCBcIlwiKS50b1N0cmluZygpLnRyaW0oKTtcbiAgICBjb25zdCBkZXNjID0gKHJhdy5ub21icmVDb21lcmNpYWwgfHwgcmF3Lk5vbWJyZUNvbWVyY2lhbCB8fCByYXcucmF6b25Tb2NpYWwgfHwgcmF3LlJhem9uU29jaWFsIHx8IFwiXCIpXG4gICAgICAudG9TdHJpbmcoKVxuICAgICAgLnRyaW0oKTtcbiAgICBpZiAoIWNvZGUgfHwgaXNOb0RhdGFUZXh0KGNvZGUpIHx8IGlzTm9EYXRhVGV4dChkZXNjKSkgcmV0dXJuIG51bGw7XG4gICAgY29uc3QgdGV4dCA9IGRlc2MgPyBgJHtkZXNjfSAoJHtjb2RlfSlgIDogY29kZTtcbiAgICByZXR1cm4geyB2YWx1ZTogY29kZSwgdGV4dCB9O1xuICB9XG4gIHJldHVybiBudWxsO1xufTtcbiIsICJleHBvcnQgY29uc3QgbWFrZUNhY2hlID0gPFQ+KGxpbWl0ID0gMTApID0+IHtcbiAgY29uc3QgbWFwID0gbmV3IE1hcDxzdHJpbmcsIFQ+KCk7XG4gIHJldHVybiB7XG4gICAgZ2V0OiAoazogc3RyaW5nKSA9PiBtYXAuZ2V0KGspLFxuICAgIHNldDogKGs6IHN0cmluZywgdjogVCkgPT4ge1xuICAgICAgaWYgKG1hcC5oYXMoaykpIG1hcC5kZWxldGUoayk7XG4gICAgICBtYXAuc2V0KGssIHYpO1xuICAgICAgaWYgKG1hcC5zaXplID4gbGltaXQpIHtcbiAgICAgICAgY29uc3QgZmlyc3QgPSBtYXAua2V5cygpLm5leHQoKS52YWx1ZTtcbiAgICAgICAgaWYgKGZpcnN0KSBtYXAuZGVsZXRlKGZpcnN0KTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGhhczogKGs6IHN0cmluZykgPT4gbWFwLmhhcyhrKSxcbiAgICBjbGVhcjogKCkgPT4gbWFwLmNsZWFyKCksXG4gIH07XG59O1xuIiwgImltcG9ydCB7IG1ha2VDYWNoZSB9IGZyb20gXCIuL21ha2VDYWNoZS50c1wiO1xuXG5jb25zdCBDVVJSRU5UX0NPTVBBTlkgPSBTdHJpbmcoZ2xvYmFsVGhpcy5fX0lORF9TRUxFQ1RFRF9DT01QQU5ZX18gfHwgXCJcIikudHJpbSgpLnRvVXBwZXJDYXNlKCk7XG5jb25zdCBDT01QQU5ZX1NUT1JBR0VfU1VGRklYID0gQ1VSUkVOVF9DT01QQU5ZID8gYF8ke0NVUlJFTlRfQ09NUEFOWX1gIDogXCJcIjtcblxuZXhwb3J0IGNvbnN0IFZJU0lUX0RSQUZUX0tFWSA9IGB2aXNpdGFzX2RyYWZ0JHtDT01QQU5ZX1NUT1JBR0VfU1VGRklYfWA7XG5leHBvcnQgY29uc3QgQ09OVEFDVFNfU1RPUkFHRV9LRVkgPSBgdmlzaXRhc19jb250YWN0c19jYWNoZV92MSR7Q09NUEFOWV9TVE9SQUdFX1NVRkZJWH1gO1xuZXhwb3J0IGNvbnN0IENPTlRBQ1RTX1NFTEVDVElPTl9LRVkgPSBgdmlzaXRhc19jb250YWN0c19zZWxlY3RlZF92MSR7Q09NUEFOWV9TVE9SQUdFX1NVRkZJWH1gO1xuZXhwb3J0IGNvbnN0IENSRUFURV9GUkVTSF9QQVJBTSA9IFwiZnJlc2hcIjtcblxuY29uc3QgY2xpZW50Q2FjaGUgPSBtYWtlQ2FjaGU8dW5rbm93bltdPigxMCk7XG5jb25zdCBjb250YWN0c0NhY2hlID0gbWFrZUNhY2hlPHVua25vd25bXT4oMTApO1xuXG5jb25zdCBjYWNoZUtleVdpdGhDb21wYW55ID0gKGtleTogc3RyaW5nKSA9PiBgJHtDVVJSRU5UX0NPTVBBTlkgfHwgXCJERUZBVUxUXCJ9Ojoke2tleX1gO1xuXG5jb25zdCByZWFkU3RvcmFnZSA9IChrZXk6IHN0cmluZyk6IFJlY29yZDxzdHJpbmcsIHVua25vd24+ID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCByYXcgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGtleSk7XG4gICAgaWYgKCFyYXcpIHJldHVybiB7fTtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShyYXcpO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4ge307XG4gIH1cbn07XG5cbmNvbnN0IHdyaXRlU3RvcmFnZSA9IChrZXk6IHN0cmluZywgZGF0YTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pID0+IHtcbiAgdHJ5IHtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKGtleSwgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuICB9IGNhdGNoIHtcbiAgICAvLyBpZ25vcmVcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGdldENsaWVudENhY2hlID0gKHF1ZXJ5OiBzdHJpbmcpOiB1bmtub3duW10gfCBudWxsID0+IHtcbiAgY29uc3QgY2FjaGVLZXkgPSBjYWNoZUtleVdpdGhDb21wYW55KHF1ZXJ5KTtcbiAgaWYgKCFjbGllbnRDYWNoZS5oYXMoY2FjaGVLZXkpKSByZXR1cm4gbnVsbDtcbiAgcmV0dXJuIGNsaWVudENhY2hlLmdldChjYWNoZUtleSkgfHwgbnVsbDtcbn07XG5cbmV4cG9ydCBjb25zdCBoYXNDbGllbnRDYWNoZSA9IChxdWVyeTogc3RyaW5nKTogYm9vbGVhbiA9PiB7XG4gIHJldHVybiBjbGllbnRDYWNoZS5oYXMoY2FjaGVLZXlXaXRoQ29tcGFueShxdWVyeSkpO1xufTtcblxuZXhwb3J0IGNvbnN0IHNldENsaWVudENhY2hlID0gKHF1ZXJ5OiBzdHJpbmcsIGl0ZW1zOiB1bmtub3duW10pOiB2b2lkID0+IHtcbiAgY2xpZW50Q2FjaGUuc2V0KGNhY2hlS2V5V2l0aENvbXBhbnkocXVlcnkpLCBpdGVtcyk7XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0Q2FjaGVkQ29udGFjdHMgPSAoYWNjb3VudDogc3RyaW5nKTogdW5rbm93bltdIHwgbnVsbCA9PiB7XG4gIGNvbnN0IGNhY2hlS2V5ID0gY2FjaGVLZXlXaXRoQ29tcGFueShhY2NvdW50KTtcbiAgaWYgKGNvbnRhY3RzQ2FjaGUuaGFzKGNhY2hlS2V5KSkgcmV0dXJuIGNvbnRhY3RzQ2FjaGUuZ2V0KGNhY2hlS2V5KSB8fCBudWxsO1xuICBjb25zdCBzdG9yZSA9IHJlYWRTdG9yYWdlKENPTlRBQ1RTX1NUT1JBR0VfS0VZKTtcbiAgY29uc3QgY2FjaGVkID0gc3RvcmVbYWNjb3VudF07XG4gIGlmIChBcnJheS5pc0FycmF5KGNhY2hlZCkpIHtcbiAgICBjb250YWN0c0NhY2hlLnNldChjYWNoZUtleSwgY2FjaGVkKTtcbiAgICByZXR1cm4gY2FjaGVkO1xuICB9XG4gIHJldHVybiBudWxsO1xufTtcblxuZXhwb3J0IGNvbnN0IHNldENhY2hlZENvbnRhY3RzID0gKGFjY291bnQ6IHN0cmluZywgaXRlbXM6IHVua25vd25bXSk6IHZvaWQgPT4ge1xuICBjb250YWN0c0NhY2hlLnNldChjYWNoZUtleVdpdGhDb21wYW55KGFjY291bnQpLCBpdGVtcyk7XG4gIGNvbnN0IHN0b3JlID0gcmVhZFN0b3JhZ2UoQ09OVEFDVFNfU1RPUkFHRV9LRVkpO1xuICBzdG9yZVthY2NvdW50XSA9IGl0ZW1zO1xuICB3cml0ZVN0b3JhZ2UoQ09OVEFDVFNfU1RPUkFHRV9LRVksIHN0b3JlKTtcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRTdG9yZWRTZWxlY3Rpb24gPSAoYWNjb3VudDogc3RyaW5nKTogdW5rbm93bltdID0+IHtcbiAgY29uc3Qgc3RvcmUgPSByZWFkU3RvcmFnZShDT05UQUNUU19TRUxFQ1RJT05fS0VZKTtcbiAgY29uc3QgcmF3ID0gc3RvcmVbYWNjb3VudF07XG4gIHJldHVybiBBcnJheS5pc0FycmF5KHJhdykgPyByYXcgOiBbXTtcbn07XG5cbmV4cG9ydCBjb25zdCBzZXRTdG9yZWRTZWxlY3Rpb24gPSAoYWNjb3VudDogc3RyaW5nLCBpdGVtczogdW5rbm93bltdKTogdm9pZCA9PiB7XG4gIGNvbnN0IHN0b3JlID0gcmVhZFN0b3JhZ2UoQ09OVEFDVFNfU0VMRUNUSU9OX0tFWSk7XG4gIHN0b3JlW2FjY291bnRdID0gaXRlbXM7XG4gIHdyaXRlU3RvcmFnZShDT05UQUNUU19TRUxFQ1RJT05fS0VZLCBzdG9yZSk7XG59O1xuXG5leHBvcnQgY29uc3QgY2xlYXJTdG9yZWRTZWxlY3Rpb24gPSAoYWNjb3VudDogc3RyaW5nKTogdm9pZCA9PiB7XG4gIGNvbnN0IHN0b3JlID0gcmVhZFN0b3JhZ2UoQ09OVEFDVFNfU0VMRUNUSU9OX0tFWSk7XG4gIGlmIChzdG9yZVthY2NvdW50XSkge1xuICAgIGRlbGV0ZSBzdG9yZVthY2NvdW50XTtcbiAgICB3cml0ZVN0b3JhZ2UoQ09OVEFDVFNfU0VMRUNUSU9OX0tFWSwgc3RvcmUpO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgY2xlYXJDcmVhdGVTZWxlY3Rpb25DYWNoZSA9ICgpOiB2b2lkID0+IHtcbiAgdHJ5IHtcbiAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKFZJU0lUX0RSQUZUX0tFWSk7XG4gICAgc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbShDT05UQUNUU19TVE9SQUdFX0tFWSk7XG4gICAgc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbShDT05UQUNUU19TRUxFQ1RJT05fS0VZKTtcbiAgfSBjYXRjaCB7XG4gICAgLy8gaWdub3JlXG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBzdHJpcEZyZXNoUGFyYW0gPSAoKTogdm9pZCA9PiB7XG4gIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm47XG4gIHRyeSB7XG4gICAgY29uc3QgdXJsID0gbmV3IFVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XG4gICAgaWYgKCF1cmwuc2VhcmNoUGFyYW1zLmhhcyhDUkVBVEVfRlJFU0hfUEFSQU0pKSByZXR1cm47XG4gICAgdXJsLnNlYXJjaFBhcmFtcy5kZWxldGUoQ1JFQVRFX0ZSRVNIX1BBUkFNKTtcbiAgICBjb25zdCBuZXh0ID0gYCR7dXJsLnBhdGhuYW1lfSR7dXJsLnNlYXJjaH0ke3VybC5oYXNofWA7XG4gICAgd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKHt9LCBcIlwiLCBuZXh0KTtcbiAgfSBjYXRjaCB7XG4gICAgLy8gaWdub3JlXG4gIH1cbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtQkFBeUU7OztBQ0FsRSxJQUFNLGVBQWUsQ0FBQyxVQUE0QjtBQUN2RCxRQUFNLE1BQU0sT0FBTyxTQUFTLEVBQUUsRUFBRSxLQUFLLEVBQUUsWUFBWTtBQUNuRCxNQUFJLENBQUMsSUFBSyxRQUFPO0FBQ2pCLFFBQU0sYUFBYSxJQUFJLFFBQVEsZUFBZSxFQUFFO0FBQ2hELFNBQU8sZUFBZSxjQUFjLGVBQWU7QUFDckQ7QUFFTyxJQUFNLGNBQWMsQ0FBQyxRQUEwQjtBQUNwRCxN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
