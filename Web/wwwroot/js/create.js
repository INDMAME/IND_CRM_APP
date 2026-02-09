import {
  AuthProvider,
  ConfirmModal,
  I18nProvider,
  SelectCombobox_default,
  SingleDatePicker,
  TEXT_EDITOR_PREFIX,
  isOverflowing,
  readAndClearTextEditorValue,
  setPreviewAnchor,
  showPreviewTooltip,
  useConfirmDialog,
  useTapGuard,
  useVisitas,
  wait
} from "./chunks/chunk-ARDMAVJR.js";
import {
  CONTACTS_SELECTION_KEY,
  CONTACTS_STORAGE_KEY,
  CREATE_FRESH_PARAM,
  ClientSearchCombobox_default,
  VISIT_DRAFT_KEY,
  clearCreateSelectionCache,
  clearStoredSelection,
  getCachedContacts,
  getStoredSelection,
  isNoDataRow,
  isNoDataText,
  setCachedContacts,
  setStoredSelection,
  stripFreshParam
} from "./chunks/chunk-OJH2LQZY.js";
import {
  ChevronDownSvg,
  ChevronUpSvg,
  FloatingList_default,
  Spinner_default,
  canAccess,
  classNames,
  fetchJson,
  flashActionMark,
  indFormat,
  indT,
  setHistoryFilterForDate,
  showPermissionModal,
  useOutsideClick
} from "./chunks/chunk-BPRI7LXP.js";
import {
  require_client,
  require_jsx_runtime,
  require_react
} from "./chunks/chunk-RGGEM6AY.js";
import {
  __toESM
} from "./chunks/chunk-45FWCHS2.js";

// Web/wwwroot/react/src/pages/visitas/creacion/CreatePage.tsx
var import_client = __toESM(require_client());

// Web/wwwroot/react/src/pages/visitas/creacion/CreateForm.tsx
var import_react5 = __toESM(require_react());

// Web/wwwroot/react/src/components/visitas/ContactsCombobox.tsx
var import_react = __toESM(require_react());

// node_modules/@heroicons/react/20/solid/esm/XMarkIcon.js
var React = __toESM(require_react(), 1);
function XMarkIcon({
  title,
  titleId,
  ...props
}, svgRef) {
  return /* @__PURE__ */ React.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /* @__PURE__ */ React.createElement("title", {
    id: titleId
  }, title) : null, /* @__PURE__ */ React.createElement("path", {
    d: "M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z"
  }));
}
var ForwardRef = /* @__PURE__ */ React.forwardRef(XMarkIcon);
var XMarkIcon_default = ForwardRef;

// Web/wwwroot/react/src/components/visitas/ContactsCombobox.tsx
var import_jsx_runtime = __toESM(require_jsx_runtime());
var ContactsCombobox = ({ accountNum, value = [], onChange, portalClassName, panelClassName }) => {
  const [query, setQuery] = (0, import_react.useState)("");
  const [options, setOptions] = (0, import_react.useState)([]);
  const [selected, setSelected] = (0, import_react.useState)(value);
  const [loading, setLoading] = (0, import_react.useState)(false);
  const [loadingMore, setLoadingMore] = (0, import_react.useState)(false);
  const [status, setStatus] = (0, import_react.useState)(indT("Visits_Create_SelectClientFirst", "Select a client first."));
  const [hasLoaded, setHasLoaded] = (0, import_react.useState)(false);
  const [open, setOpen] = (0, import_react.useState)(false);
  const [page, setPage] = (0, import_react.useState)(1);
  const [hasMore, setHasMore] = (0, import_react.useState)(true);
  const [blocking, setBlocking] = (0, import_react.useState)(false);
  const [activeIndex, setActiveIndex] = (0, import_react.useState)(0);
  const listRef = (0, import_react.useRef)(null);
  const boxRef = (0, import_react.useRef)(null);
  const abortRef = (0, import_react.useRef)(null);
  const containerRef = (0, import_react.useRef)(null);
  const inputRef = (0, import_react.useRef)(null);
  const lastAccountRef = (0, import_react.useRef)(accountNum || "");
  const onChangeRef = (0, import_react.useRef)(onChange);
  useOutsideClick([containerRef, listRef], () => setOpen(false));
  (0, import_react.useEffect)(() => {
    onChangeRef.current = onChange;
  }, [onChange]);
  const isSameSelection = (a = [], b = []) => {
    if (a.length !== b.length) return false;
    const as = a.map((x) => String(x.value)).sort();
    const bs = b.map((x) => String(x.value)).sort();
    return as.every((v, i) => v === bs[i]);
  };
  (0, import_react.useEffect)(() => {
    if (!isSameSelection(value || [], selected)) {
      setSelected(value || []);
    }
  }, [value]);
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
  const primeFromCache = () => {
    const cached = getCachedContacts(accountNum);
    if (cached) {
      setOptions(cached);
      setHasLoaded(true);
      setHasMore(cached.length === 10);
      setStatus(
        cached.length ? indFormat("Visits_Create_ContactCountCache", "{0} contacts (cache)", cached.length) : indT("Visits_Create_NoContacts", "No contacts")
      );
      return true;
    }
    return false;
  };
  (0, import_react.useEffect)(() => {
    cancelPending();
    setQuery("");
    setOpen(false);
    setLoading(false);
    setBlocking(false);
    setLoadingMore(false);
    setActiveIndex(0);
    setPage(1);
    setHasMore(true);
    if (!accountNum) {
      setOptions([]);
      setSelected([]);
      onChangeRef.current([]);
      setStatus(indT("Visits_Create_SelectClientFirst", "Select a client first."));
      setHasLoaded(false);
      clearStoredSelection(lastAccountRef.current);
      lastAccountRef.current = "";
      return;
    }
    const changed = lastAccountRef.current && lastAccountRef.current !== accountNum;
    if (changed) {
      setSelected([]);
      onChangeRef.current([]);
      clearStoredSelection(lastAccountRef.current);
    }
    const usedCache = primeFromCache();
    if (!usedCache) {
      setOptions([]);
      setHasLoaded(false);
      setStatus(indT("Visits_Create_PressArrowToLoadContacts", "Press ArrowDown to load contacts."));
    }
    const storedSelection = getStoredSelection(accountNum);
    if (storedSelection.length && !value?.length) {
      setSelected(storedSelection);
      onChangeRef.current(storedSelection);
    }
    lastAccountRef.current = accountNum;
  }, [accountNum]);
  (0, import_react.useEffect)(() => {
    onChangeRef.current(selected);
    if (accountNum) setStoredSelection(accountNum, selected);
  }, [selected, accountNum]);
  const mapContacts = (items = []) => items.map((c) => {
    if (isNoDataRow(c)) return null;
    if (Array.isArray(c)) return null;
    const recId = (c.recId || c.RecId || "").toString().trim();
    const name = (c.name || c.Name || "").toString().trim();
    const cargo = (c.cargo || c.Cargo || "").toString().trim();
    const empresa = (c.empresa || c.Empresa || "").toString().trim();
    if (!recId || isNoDataText(name)) return null;
    return {
      value: recId,
      text: name.toUpperCase(),
      cargo: cargo.toUpperCase(),
      empresa: empresa.toUpperCase()
    };
  }).filter(Boolean);
  const load = async (pageToLoad = 1, append = false) => {
    if (!accountNum) return;
    if (loading || loadingMore) return;
    cancelPending();
    if (!append) {
      setLoading(true);
      setBlocking(true);
      if (pageToLoad === 1) setStatus(indT("Visits_Create_LoadingContacts", "Loading contacts..."));
    } else {
      setLoadingMore(true);
      setBlocking(true);
    }
    const controller = new AbortController();
    abortRef.current = controller;
    try {
      const res = await fetchJson(
        `/Visitas/GetContactsForDropdown?accountNum=${encodeURIComponent(accountNum)}&page=${pageToLoad}&pageSize=10`,
        { signal: controller.signal }
      );
      const mapped = mapContacts(res.items || []);
      setOptions((prev) => {
        const next = append ? [...prev, ...mapped] : mapped;
        setCachedContacts(accountNum, next);
        return next;
      });
      setHasLoaded(true);
      setHasMore(mapped.length === 10);
      setPage(pageToLoad);
      setStatus(mapped.length ? indFormat("Visits_Create_ContactCount", "{0} contacts", mapped.length) : indT("Visits_Create_NoContacts", "No contacts"));
    } catch {
      setStatus(indT("Visits_Create_LoadContactsError", "Failed to load contacts."));
    } finally {
      abortRef.current = null;
      setLoading(false);
      setLoadingMore(false);
      setBlocking(false);
    }
  };
  const ensureLoaded = () => {
    if (!accountNum) return;
    if (hasLoaded && options.length) return;
    if (primeFromCache()) return;
    load(1, false);
  };
  const loadMoreContacts = import_react.default.useCallback(() => {
    if (!accountNum || !hasMore || loadingMore || loading) return;
    load(page + 1, true);
  }, [accountNum, hasMore, loadingMore, loading, page]);
  (0, import_react.useEffect)(() => {
    if (!open || !listRef.current) return;
    const el = listRef.current;
    const onScroll = () => {
      if (el.scrollTop + el.clientHeight >= el.scrollHeight - 8) loadMoreContacts();
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [open, loadMoreContacts]);
  const selectedValues = (0, import_react.useMemo)(() => {
    return new Set((selected || []).map((s) => String(s.value)));
  }, [selected]);
  const availableOptions = (0, import_react.useMemo)(() => {
    return (options || []).filter((o) => !selectedValues.has(String(o.value)));
  }, [options, selectedValues]);
  const filtered = (0, import_react.useMemo)(() => {
    const q = query.trim().toLowerCase();
    if (!q) return availableOptions;
    const f = availableOptions.filter(
      (o) => o.text.toLowerCase().includes(q) || o.cargo.toLowerCase().includes(q) || o.empresa.toLowerCase().includes(q)
    );
    return f.length ? f : availableOptions;
  }, [availableOptions, query]);
  (0, import_react.useEffect)(() => {
    setActiveIndex(0);
  }, [filtered.length, query]);
  const toggleOption = (opt) => {
    setSelected((prev) => {
      const exists = prev.some((p) => p.value === opt.value);
      if (exists) return prev.filter((p) => p.value !== opt.value);
      return [...prev, opt];
    });
  };
  const handleKeyDown = (ev) => {
    if (ev.key === "ArrowDown") {
      ev.preventDefault();
      setOpen(true);
      ensureLoaded();
      if (filtered.length) setActiveIndex((idx) => (idx + 1) % filtered.length);
      return;
    }
    if (ev.key === "ArrowUp") {
      ev.preventDefault();
      setOpen(true);
      ensureLoaded();
      if (filtered.length) setActiveIndex((idx) => (idx - 1 + filtered.length) % filtered.length);
      return;
    }
    if (ev.key === "Enter") {
      ev.preventDefault();
      if (open && filtered.length) {
        toggleOption(filtered[activeIndex] ?? filtered[0]);
      } else if (accountNum) {
        ensureLoaded();
        setOpen(true);
      }
    }
    if (ev.key === "Escape") setOpen(false);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "space-y-2", ref: containerRef, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "form-label font-semibold", children: indT("Visits_Create_SearchContact", "Search contact") }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "relative", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        "div",
        {
          ref: boxRef,
          className: "relative w-full cursor-default rounded-[5px] border-slate-300 bg-white text-left shadow-xs focus-within:border-primary focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-0 sm:text-sm",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-wrap gap-1 px-3 py-2 min-h-10", children: [
              selected.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                "span",
                {
                  className: "flex items-center gap-1 rounded-md bg-primary/10 text-slate-700 px-2 py-1 text-xs",
                  children: [
                    c.text,
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                      "button",
                      {
                        type: "button",
                        onClick: () => setSelected((prev) => prev.filter((s) => s.value !== c.value)),
                        className: "text-slate-700 hover:text-slate-700/80",
                        "aria-label": indT("Common_Delete", "Delete"),
                        title: indT("Common_Delete", "Delete"),
                        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(XMarkIcon_default, { className: "h-4 w-4" })
                      }
                    )
                  ]
                },
                c.value
              )),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "input",
                {
                  className: "flex-1 min-w-30 bg-transparent text-sm sm:text-base leading-5 text-slate-900 border-none outline-hidden px-1 py-1 focus:ring-0 focus:border-transparent",
                  onChange: (event) => setQuery(event.target.value),
                  onKeyDown: handleKeyDown,
                  placeholder: selected.length ? "" : indT("Visits_Create_FilterPlaceholder", "Type to filter..."),
                  ref: inputRef,
                  readOnly: !accountNum,
                  onFocus: () => {
                    ensureLoaded();
                    setOpen(true);
                  }
                }
              ),
              (loading || blocking) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-y-0 right-9 flex items-center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner_default, {}) })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "button",
              {
                type: "button",
                className: "absolute inset-y-0 right-0 flex items-center pr-2 text-slate-500 hover:text-slate-600",
                "aria-label": open ? indT("Dropdown_HideOptions", "Hide options") : indT("Dropdown_ShowOptions", "Show options"),
                "aria-expanded": open,
                onClick: () => {
                  if (!accountNum) return;
                  if (open) {
                    setOpen(false);
                  } else {
                    ensureLoaded();
                    setOpen(true);
                  }
                },
                children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUpSvg, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDownSvg, { className: "h-5 w-5" })
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        FloatingList_default,
        {
          anchorRef: boxRef,
          open,
          zIndex: 38e4,
          maxHeightClass: "max-h-72",
          role: "listbox",
          roundedClass: "rounded-[5px]",
          portalClassName,
          panelClassName,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { ref: listRef, "aria-multiselectable": "true", children: [
              loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center gap-2 px-4 py-2 text-sm text-slate-500", children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner_default, { size: "h-4 w-4" }),
                indT("Common_Loading", "Loading")
              ] }),
              !loading && options.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "px-4 py-2 text-sm text-slate-500", children: hasLoaded ? indT("Visits_Create_NoContacts", "No contacts") : indT("Visits_Create_SelectClientFirst", "Select a client first.") }),
              !loading && options.length > 0 && filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "px-4 py-2 text-sm text-slate-500", children: query.trim() ? indT("Visits_Create_NoMatches", "No matches") : indT("Visits_Create_NoMoreContacts", "No more contacts available") }),
              !loading && filtered.map((opt, idx) => {
                const sel = selected.some((s) => s.value === opt.value);
                const isActive = idx === activeIndex;
                return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "button",
                  {
                    type: "button",
                    role: "option",
                    "aria-selected": sel,
                    className: classNames(
                      "relative flex w-full cursor-default select-none items-start py-2 px-3 text-left text-sm",
                      isActive ? "bg-primary text-white" : sel ? "bg-primary/10 text-primary" : "text-slate-900"
                    ),
                    onMouseEnter: () => setActiveIndex(idx),
                    onClick: () => toggleOption(opt),
                    children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "relative flex flex-col gap-0.5 pr-2", children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: classNames("block truncate", sel ? "font-medium" : "font-normal"), children: opt.text }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "block text-xs text-slate-600 truncate", children: opt.cargo })
                    ] })
                  },
                  opt.value
                );
              })
            ] }),
            blocking && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 z-70000 bg-white/70 backdrop-blur-[1px] flex items-center justify-center rounded-[5px]", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner_default, { size: "h-6 w-6" }) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-full flex justify-end", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-xs text-slate-500 tech-info", children: status }) })
  ] });
};
var ContactsCombobox_default = ContactsCombobox;

// Web/wwwroot/react/src/hooks/useTopbar.ts
var import_react2 = __toESM(require_react());
var useTopbar = (step, canGoNext, onNext, onPrev, busy = false, canSubmitStep2 = true, canAccess2 = true) => {
  (0, import_react2.useEffect)(() => {
    const forward = document.getElementById("globalForwardBtn");
    const back = document.getElementById("globalBackBtn");
    const forwardIcon = document.getElementById("globalForwardIcon");
    const createIcon = document.getElementById("globalCreateIcon");
    if (forward) {
      const isStep2 = step === 2;
      const showForward = canAccess2 && (isStep2 || step === 1 && canGoNext);
      forward.style.visibility = showForward ? "visible" : "hidden";
      forward.disabled = !showForward || busy;
      forward.onclick = showForward ? () => onNext() : null;
      forward.setAttribute(
        "aria-label",
        isStep2 ? indT("Common_Create", "Create") : indT("Common_Next", "Next")
      );
      forward.setAttribute("aria-disabled", isStep2 && !canSubmitStep2 ? "true" : "false");
      forward.classList.toggle("opacity-50", isStep2 && !canSubmitStep2);
      forward.classList.toggle("cursor-not-allowed", isStep2 && !canSubmitStep2);
      if (forwardIcon && createIcon) {
        if (isStep2) {
          forwardIcon.classList.add("hidden");
          createIcon.classList.remove("hidden");
        } else {
          forwardIcon.classList.remove("hidden");
          createIcon.classList.add("hidden");
        }
      }
    }
    if (back) {
      const showBack = canAccess2 && step === 2;
      back.style.visibility = showBack ? "visible" : "hidden";
      back.disabled = !showBack || busy;
      back.onclick = showBack ? () => onPrev() : null;
    }
  }, [step, canGoNext, onNext, onPrev, busy, canSubmitStep2, canAccess2]);
};

// Web/wwwroot/react/src/hooks/useCreateDraft.ts
var import_react3 = __toESM(require_react());

// Web/wwwroot/react/src/utils/globalSpinner.ts
var showGlobalSpinner = (message) => {
  try {
    if (typeof window !== "undefined" && typeof window.__indShowGlobalSpinner === "function") {
      window.__indShowGlobalSpinner(message);
    }
  } catch {
  }
};
var hideGlobalSpinner = () => {
  try {
    if (typeof window !== "undefined" && typeof window.__indHideGlobalSpinner === "function") {
      window.__indHideGlobalSpinner();
    }
  } catch {
  }
};

// Web/wwwroot/react/src/hooks/useCreateDraft.ts
var useCreateDraft = ({
  draftSnapshot,
  setSelectedClient,
  setSelectedContacts,
  setVisitType,
  setTransDate,
  setDescription,
  setComentarios,
  setAntecedentes,
  setConclusiones,
  setStep
}) => {
  const draftRestoredRef = (0, import_react3.useRef)(false);
  const draftPersistTimerRef = (0, import_react3.useRef)(null);
  const persistDraftSnapshot = (0, import_react3.useCallback)((draft) => {
    try {
      sessionStorage.setItem(VISIT_DRAFT_KEY, JSON.stringify(draft));
    } catch {
    }
  }, []);
  const persistDraftNow = (0, import_react3.useCallback)(() => {
    persistDraftSnapshot(draftSnapshot);
  }, [draftSnapshot, persistDraftSnapshot]);
  (0, import_react3.useEffect)(() => {
    if (!draftRestoredRef.current) return;
    if (draftPersistTimerRef.current) {
      clearTimeout(draftPersistTimerRef.current);
    }
    draftPersistTimerRef.current = window.setTimeout(() => {
      draftPersistTimerRef.current = null;
      persistDraftSnapshot(draftSnapshot);
    }, 180);
    return () => {
      if (draftPersistTimerRef.current) {
        clearTimeout(draftPersistTimerRef.current);
        draftPersistTimerRef.current = null;
      }
    };
  }, [draftSnapshot, persistDraftSnapshot]);
  (0, import_react3.useEffect)(() => {
    let freshLoad = false;
    try {
      const url = new URL(window.location.href);
      freshLoad = url.searchParams.has(CREATE_FRESH_PARAM);
    } catch {
      freshLoad = false;
    }
    if (freshLoad) {
      clearCreateSelectionCache();
      stripFreshParam();
      draftRestoredRef.current = true;
      return;
    }
    let shouldShow = false;
    try {
      shouldShow = !!(sessionStorage.getItem(VISIT_DRAFT_KEY) || sessionStorage.getItem(CONTACTS_STORAGE_KEY) || sessionStorage.getItem(CONTACTS_SELECTION_KEY));
    } catch {
    }
    if (shouldShow) {
      showGlobalSpinner(indT("Common_Loading", "Loading"));
    }
    try {
      const raw = sessionStorage.getItem(VISIT_DRAFT_KEY);
      if (raw) {
        const draft = JSON.parse(raw);
        if (draft?.selectedClient?.value) setSelectedClient(draft.selectedClient);
        if (Array.isArray(draft?.selectedContacts)) setSelectedContacts(draft.selectedContacts);
        if (draft?.visitType !== void 0) setVisitType(draft.visitType);
        if (draft?.transDate) setTransDate(draft.transDate);
        if (draft?.description !== void 0) setDescription(draft.description);
        if (draft?.comentarios !== void 0) setComentarios(draft.comentarios);
        if (draft?.antecedentes !== void 0) setAntecedentes(draft.antecedentes);
        if (draft?.conclusiones !== void 0) setConclusiones(draft.conclusiones);
        if (draft?.step === 2) setStep(2);
      }
    } catch {
    } finally {
      if (shouldShow) {
        hideGlobalSpinner();
      }
    }
    draftRestoredRef.current = true;
  }, [
    setAntecedentes,
    setComentarios,
    setConclusiones,
    setDescription,
    setSelectedClient,
    setSelectedContacts,
    setStep,
    setTransDate,
    setVisitType
  ]);
  return {
    persistDraftNow
  };
};

// Web/wwwroot/react/src/hooks/useCreateSubmit.ts
var import_react4 = __toESM(require_react());

// Web/wwwroot/react/src/utils/indIds.ts
var indExtractId = (value) => {
  if (value === null || value === void 0) return "";
  if (typeof value === "string" || typeof value === "number") return String(value).trim();
  if (typeof value === "object") {
    const candidate = value.recId ?? value.RecId ?? value.id ?? value.Id ?? value.value ?? value.Value;
    if (typeof candidate === "string" || typeof candidate === "number") return String(candidate).trim();
  }
  return "";
};
var indExtractSignedId = (value, depth = 0) => {
  if (depth > 3) return "";
  if (value === null || value === void 0) return "";
  if (typeof value === "number" && Number.isFinite(value)) return String(Math.trunc(value));
  if (typeof value === "string") {
    const raw = value.trim();
    if (!raw) return "";
    const match = raw.match(/-?\d{3,}/);
    return match ? match[0] : "";
  }
  if (typeof value !== "object") return "";
  if (Array.isArray(value)) {
    for (const item of value) {
      const found = indExtractSignedId(item, depth + 1);
      if (found) return found;
    }
    return "";
  }
  const keys = [
    "recId",
    "RecId",
    "refRecIdActividad",
    "RefRecIdActividad",
    "actividadRecId",
    "ActividadRecId",
    "message",
    "Message",
    "result",
    "Result",
    "data",
    "Data"
  ];
  for (const k of keys) {
    if (Object.prototype.hasOwnProperty.call(value, k)) {
      const found = indExtractSignedId(value[k], depth + 1);
      if (found) return found;
    }
  }
  for (const v of Object.values(value)) {
    const found = indExtractSignedId(v, depth + 1);
    if (found) return found;
  }
  return "";
};

// Web/wwwroot/react/src/hooks/useCreateSubmit.ts
var useCreateSubmit = ({
  busy,
  modalOpen,
  canCreateVisit,
  canRollbackDelete,
  selectedClient,
  selectedContacts,
  visitType,
  defaultAsistenteTipo,
  description,
  transDate,
  comentarios,
  antecedentes,
  conclusiones,
  setBusy,
  setStatus,
  setModalError,
  setShowRequired,
  openConfirm,
  closeConfirm
}) => {
  const doCreate = (0, import_react4.useCallback)(async () => {
    if (busy) return false;
    if (!canCreateVisit) {
      showPermissionModal();
      return false;
    }
    setModalError("");
    if (!selectedClient) {
      setStatus(indT("Visits_Create_SelectClientRequired", "Select a client."));
      return false;
    }
    if (String(visitType || "") === "" || String(visitType) === "0" || !description.trim() || !comentarios.trim()) {
      setShowRequired(true);
      setStatus(indT("Visits_Create_CompleteRequired", "Complete required fields."));
      return false;
    }
    setBusy(true);
    setStatus(indT("Visits_Create_CreatingActivity", "Creating activity..."));
    let createdRecId = "";
    try {
      const payloadActivity = {
        accountNum: selectedClient.value,
        visitType,
        description,
        transDate,
        comentarios,
        antecedentes,
        conclusiones
      };
      const resAct = await fetchJson("/Visitas/CreateActivity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payloadActivity)
      });
      if (!resAct.success) throw new Error(resAct.message || indT("Visits_Create_CreateActivityFailed", "Failed to create activity."));
      const recIdActividad = indExtractSignedId(resAct.data) || indExtractSignedId(resAct.message) || indExtractSignedId(indExtractId(resAct.data) || indExtractId(resAct.message));
      if (!recIdActividad) throw new Error(indT("Visits_Create_CreateActivityFailed", "Failed to create activity."));
      createdRecId = String(recIdActividad);
      if (selectedContacts.length > 0) {
        const assistantBatchSize = 4;
        const createAssistant = async (contact) => {
          const payloadVisita = {
            refRecIdActividad: recIdActividad,
            asistenteTipo: defaultAsistenteTipo,
            asistenteId: contact.text,
            contactoRecId: contact.value
          };
          const resVis = await fetchJson("/Visitas/CreateVisitaAsistente", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payloadVisita)
          });
          if (!resVis.success) {
            throw new Error(resVis.message || indT("Visits_Create_CreateVisitFailed", "Failed to create visit."));
          }
        };
        for (let idx = 0; idx < selectedContacts.length; idx += assistantBatchSize) {
          const batch = selectedContacts.slice(idx, idx + assistantBatchSize);
          const first = batch[0];
          if (first) {
            setStatus(indFormat("Visits_Create_CreatingVisitFor", "Creating visit for {0}...", first.text));
          }
          await Promise.all(batch.map((contact) => createAssistant(contact)));
        }
      }
      try {
        sessionStorage.removeItem(VISIT_DRAFT_KEY);
      } catch {
      }
      setHistoryFilterForDate(transDate, true);
      closeConfirm();
      await wait(200);
      flashActionMark("okProcess", 1200);
      await wait(1200);
      window.__indBypassNavigationGuardOnce?.();
      window.location.href = "/Historial/History";
      return true;
    } catch (e) {
      if (createdRecId && canRollbackDelete) {
        try {
          setStatus(indT("Visits_Create_Rollback", "Rolling back activity..."));
          await fetchJson(`/Visitas/DeleteActivity/${encodeURIComponent(createdRecId)}`, {
            method: "DELETE",
            suppressPermissionModal: true
          });
        } catch {
        }
      }
      const msg = e?.message || indT("Visits_Create_CreateVisitError", "Failed to create the visit.");
      setModalError(msg);
      setStatus(msg);
      flashActionMark("errorProcess", 1500);
      setBusy(false);
      return false;
    }
  }, [
    antecedentes,
    busy,
    canCreateVisit,
    canRollbackDelete,
    closeConfirm,
    comentarios,
    conclusiones,
    defaultAsistenteTipo,
    description,
    selectedClient,
    selectedContacts,
    setBusy,
    setModalError,
    setShowRequired,
    setStatus,
    transDate,
    visitType
  ]);
  const handleSubmit = (0, import_react4.useCallback)(() => {
    if (busy) return;
    if (!canCreateVisit) {
      showPermissionModal();
      return;
    }
    if (modalOpen) return;
    if (!selectedClient) {
      setStatus(indT("Visits_Create_SelectClientRequired", "Select a client."));
      return;
    }
    if (String(visitType || "") === "" || String(visitType) === "0" || !description.trim() || !comentarios.trim()) {
      setShowRequired(true);
      setStatus(indT("Visits_Create_CompleteRequired", "Complete required fields."));
      return;
    }
    setModalError("");
    openConfirm({
      title: indT("Visits_Create_ConfirmCreate_Title", "Confirm create"),
      message: indT("Visits_Create_ConfirmCreate_Body", "Do you want to create this visit?"),
      confirmText: indT("Confirm_Yes", "OK"),
      onConfirm: doCreate
    });
  }, [
    busy,
    canCreateVisit,
    comentarios,
    description,
    doCreate,
    modalOpen,
    openConfirm,
    selectedClient,
    setModalError,
    setShowRequired,
    setStatus,
    visitType
  ]);
  return {
    doCreate,
    handleSubmit
  };
};

// Web/wwwroot/react/src/pages/visitas/creacion/CreateForm.tsx
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
function VisitasApp() {
  const { visitTypes, asistenteTipos } = useVisitas();
  const canCreateVisit = canAccess("VISITAS_CREACION", "Add");
  const canRollbackDelete = canAccess("VISITAS_HISTORIAL", "FullAccess");
  const fieldIdComentarios = "Visita.Create.Comentarios";
  const fieldIdAntecedentes = "Visita.Create.Antecedentes";
  const fieldIdConclusiones = "Visita.Create.Conclusiones";
  const [step, setStep] = (0, import_react5.useState)(1);
  const [selectedClient, setSelectedClient] = (0, import_react5.useState)(null);
  const [selectedContacts, setSelectedContacts] = (0, import_react5.useState)([]);
  const todayString = () => {
    const today = /* @__PURE__ */ new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };
  const defaultVisitType = visitTypes[0]?.value ?? visitTypes[0]?.Value ?? "";
  const defaultAsistenteTipo = asistenteTipos[0]?.value ?? asistenteTipos[0]?.Value ?? "0";
  const [visitType, setVisitType] = (0, import_react5.useState)(defaultVisitType);
  const [transDate, setTransDate] = (0, import_react5.useState)(() => todayString());
  const [description, setDescription] = (0, import_react5.useState)("");
  const [comentarios, setComentarios] = (0, import_react5.useState)("");
  const [antecedentes, setAntecedentes] = (0, import_react5.useState)("");
  const [conclusiones, setConclusiones] = (0, import_react5.useState)("");
  const [status, setStatus] = (0, import_react5.useState)("");
  const [busy, setBusy] = (0, import_react5.useState)(false);
  const [showRequired, setShowRequired] = (0, import_react5.useState)(false);
  const [modalError, setModalError] = (0, import_react5.useState)("");
  const { modal, openConfirm, closeConfirm, handleConfirm } = useConfirmDialog({
    defaultConfirmText: indT("Confirm_Yes", "OK"),
    defaultCancelText: indT("Confirm_No", "Cancel")
  });
  const handleModalConfirm = import_react5.default.useCallback(async () => {
    setModalError("");
    await handleConfirm({
      busy,
      onError: (msg) => {
        setModalError(msg);
        setStatus(msg);
        flashActionMark("errorProcess", 1500);
      }
    });
  }, [busy, handleConfirm]);
  const modalLoadingText = indT("Common_Loading", "Loading");
  const modalCancelText = modal.cancelText || indT("Confirm_No", "Cancel");
  const modalConfirmText = busy ? modalLoadingText : !busy && modalError ? indT("Common_OK", "OK") : modal.confirmText || indT("Confirm_Yes", "OK");
  const handleModalButtonConfirm = import_react5.default.useCallback(() => {
    if (!busy && modalError) {
      closeConfirm();
      return;
    }
    handleModalConfirm();
  }, [busy, modalError, closeConfirm, handleModalConfirm]);
  const draftSnapshot = (0, import_react5.useMemo)(
    () => ({
      selectedClient,
      selectedContacts,
      visitType,
      transDate,
      description,
      comentarios,
      antecedentes,
      conclusiones,
      step
    }),
    [selectedClient, selectedContacts, visitType, transDate, description, comentarios, antecedentes, conclusiones, step]
  );
  const { persistDraftNow } = useCreateDraft({
    draftSnapshot,
    setSelectedClient,
    setSelectedContacts,
    setVisitType,
    setTransDate,
    setDescription,
    setComentarios,
    setAntecedentes,
    setConclusiones,
    setStep
  });
  const openTextEditor = import_react5.default.useCallback(
    (fieldId, fieldLabel, fieldValue, options = {}) => {
      const safeId = String(fieldId || "").trim();
      const safeLabel = String(fieldLabel || "").trim();
      const allowEdit = options?.allowEdit !== false;
      if (!safeId || !safeLabel) return;
      try {
        const key = `${TEXT_EDITOR_PREFIX}${safeId}`;
        if (sessionStorage.getItem(key) === null) {
          sessionStorage.setItem(key, String(fieldValue || ""));
        }
      } catch {
      }
      persistDraftNow();
      const returnUrl = `${window.location.pathname}${window.location.search || ""}`;
      try {
        sessionStorage.setItem(`${TEXT_EDITOR_PREFIX}${safeId}_returnUrl`, returnUrl);
      } catch {
      }
      const url = `/TextEditorReact/EditField?fieldId=${encodeURIComponent(safeId)}&fieldLabel=${encodeURIComponent(safeLabel)}&returnUrl=${encodeURIComponent(returnUrl)}&allowEdit=${allowEdit ? "1" : "0"}`;
      window.__indBypassNavigationGuardOnce?.();
      window.location.href = url;
    },
    [persistDraftNow]
  );
  const handleComentariosTap = import_react5.default.useCallback((event) => {
    if (busy) return;
    event.preventDefault();
    openTextEditor(fieldIdComentarios, indT("Visits_Field_Comments", "Comments"), comentarios);
  }, [busy, comentarios, openTextEditor]);
  const handleComentariosHold = import_react5.default.useCallback((target, clientY) => {
    if (!target || !isOverflowing(target)) return false;
    setPreviewAnchor(target);
    return showPreviewTooltip(String(comentarios || ""), clientY);
  }, [comentarios]);
  const handleAntecedentesTap = import_react5.default.useCallback((event) => {
    if (busy) return;
    event.preventDefault();
    openTextEditor(fieldIdAntecedentes, indT("Visits_Field_Background", "Background"), antecedentes);
  }, [busy, antecedentes, openTextEditor]);
  const handleAntecedentesHold = import_react5.default.useCallback((target, clientY) => {
    if (!target || !isOverflowing(target)) return false;
    setPreviewAnchor(target);
    return showPreviewTooltip(String(antecedentes || ""), clientY);
  }, [antecedentes]);
  const handleConclusionesTap = import_react5.default.useCallback((event) => {
    if (busy) return;
    event.preventDefault();
    openTextEditor(fieldIdConclusiones, indT("Visits_Field_Conclusions", "Conclusions"), conclusiones);
  }, [busy, conclusiones, openTextEditor]);
  const handleConclusionesHold = import_react5.default.useCallback((target, clientY) => {
    if (!target || !isOverflowing(target)) return false;
    setPreviewAnchor(target);
    return showPreviewTooltip(String(conclusiones || ""), clientY);
  }, [conclusiones]);
  const comentariosTap = useTapGuard(handleComentariosTap, handleComentariosHold);
  const antecedentesTap = useTapGuard(handleAntecedentesTap, handleAntecedentesHold);
  const conclusionesTap = useTapGuard(handleConclusionesTap, handleConclusionesHold);
  const applyTextEditorValues = import_react5.default.useCallback(() => {
    const valComentarios = readAndClearTextEditorValue(fieldIdComentarios);
    if (valComentarios !== null) setComentarios(valComentarios);
    const valAntecedentes = readAndClearTextEditorValue(fieldIdAntecedentes);
    if (valAntecedentes !== null) setAntecedentes(valAntecedentes);
    const valConclusiones = readAndClearTextEditorValue(fieldIdConclusiones);
    if (valConclusiones !== null) setConclusiones(valConclusiones);
  }, [fieldIdComentarios, fieldIdAntecedentes, fieldIdConclusiones]);
  const prevClientRef = (0, import_react5.useRef)(null);
  (0, import_react5.useEffect)(() => {
    const current = selectedClient?.value;
    if (prevClientRef.current && prevClientRef.current !== current) {
      setSelectedContacts([]);
    }
    prevClientRef.current = current;
  }, [selectedClient?.value]);
  const lastClientRef = (0, import_react5.useRef)(null);
  (0, import_react5.useEffect)(() => {
    const current = selectedClient?.value;
    if (!current) return;
    if (lastClientRef.current && lastClientRef.current !== current) {
      setStep(1);
      setSelectedContacts([]);
      setVisitType(defaultVisitType);
      setTransDate(todayString());
      setDescription("");
      setComentarios("");
      setAntecedentes("");
      setConclusiones("");
      setStatus("");
      setBusy(false);
    }
    lastClientRef.current = current;
  }, [selectedClient?.value]);
  (0, import_react5.useEffect)(() => {
    applyTextEditorValues();
    const onPageShow = () => applyTextEditorValues();
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, [applyTextEditorValues]);
  const canGoNext = !!selectedClient;
  const canCreate = !!selectedClient && String(visitType || "").trim() !== "" && String(visitType) !== "0" && description.trim().length > 0 && comentarios.trim().length > 0;
  const hasActiveProcess = (0, import_react5.useMemo)(() => {
    if (busy) return true;
    if (step > 1) return true;
    if (selectedClient) return true;
    if (selectedContacts.length > 0) return true;
    return description.trim().length > 0 || comentarios.trim().length > 0 || antecedentes.trim().length > 0 || conclusiones.trim().length > 0;
  }, [antecedentes, busy, comentarios, conclusiones, description, selectedClient, selectedContacts.length, step]);
  (0, import_react5.useEffect)(() => {
    window.__indSetNavigationGuard?.(hasActiveProcess);
    return () => {
      window.__indClearNavigationGuard?.();
    };
  }, [hasActiveProcess]);
  const handleTopbarPrimary = import_react5.default.useCallback(() => {
    if (!canCreateVisit) {
      showPermissionModal();
      return;
    }
    if (step === 1 && canGoNext) setStep(2);
    if (step === 2) handleSubmit();
  }, [canCreateVisit, canGoNext, handleSubmit, step]);
  const handleTopbarBack = import_react5.default.useCallback(() => {
    setStep(1);
  }, []);
  useTopbar(step, canGoNext, handleTopbarPrimary, handleTopbarBack, busy, canCreate, canCreateVisit);
  const { handleSubmit } = useCreateSubmit({
    busy,
    modalOpen: modal.open,
    canCreateVisit,
    canRollbackDelete,
    selectedClient,
    selectedContacts,
    visitType,
    defaultAsistenteTipo,
    description,
    transDate,
    comentarios,
    antecedentes,
    conclusiones,
    setBusy,
    setStatus,
    setModalError,
    setShowRequired,
    openConfirm,
    closeConfirm
  });
  (0, import_react5.useEffect)(() => {
    if (step === 1) {
      setShowRequired(false);
      closeConfirm();
    }
  }, [step, closeConfirm]);
  const visitTypeInvalid = showRequired && (String(visitType || "") === "" || String(visitType) === "0");
  const descriptionInvalid = showRequired && description.trim().length === 0;
  const comentariosInvalid = showRequired && comentarios.trim().length === 0;
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "space-y-4", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      ConfirmModal,
      {
        open: modal.open,
        title: modal.title,
        message: modal.message,
        confirmText: modalConfirmText,
        cancelText: modalCancelText,
        loadingText: modalLoadingText,
        showCancel: modal.showCancel,
        showConfirm: modal.showConfirm,
        busy,
        error: modalError,
        status,
        onConfirm: handleModalButtonConfirm,
        onCancel: closeConfirm
      }
    ),
    step === 1 && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "space-y-6", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        ClientSearchCombobox_default,
        {
          value: selectedClient,
          onSelected: setSelectedClient,
          label: indT("Visits_Create_SearchClient", "Search client"),
          placeholder: indFormat("Visits_Create_ClientPlaceholder", "Type at least {0} characters...", 4),
          portalClassName: "visitas-typography"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "space-y-3", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          ContactsCombobox_default,
          {
            accountNum: selectedClient?.value,
            value: selectedContacts,
            onChange: setSelectedContacts,
            portalClassName: "visitas-typography"
          }
        ),
        selectedContacts.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "text-xs text-slate-600", children: indFormat("Visits_Create_SelectedContactsCount", "{0} selected contact(s)", selectedContacts.length) })
      ] })
    ] }),
    step === 2 && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "shadow-xs glass-panel p-4 space-y-4 border border-slate-200 rounded-2xl", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "text-base font-semibold text-slate-900 border-b border-slate-200 pb-3", children: indT("Visits_Create_VisitData_Title", "Visit details") }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "visita-field-text", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(SingleDatePicker, { label: indT("Visits_Detail_Date_Label", "Date"), value: transDate, onChange: setTransDate }) }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          SelectCombobox_default,
          {
            label: indT("Visits_Detail_VisitType_Label", "Visit type"),
            options: visitTypes,
            value: visitType,
            onChange: setVisitType,
            placeholder: indT("Visits_Detail_VisitType_Placeholder", "Select type"),
            invalid: visitTypeInvalid,
            emitOnValueChange: true,
            portalClassName: "visitas-typography"
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "grid grid-cols-1 gap-3", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "space-y-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { className: "form-label font-semibold", children: indT("Visits_Field_Description", "Description") }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            "input",
            {
              id: "description",
              className: classNames(
                "form-control",
                descriptionInvalid ? "border-rose-400 bg-rose-50 focus:ring-rose-200 focus:border-rose-400" : "border-slate-200 focus:ring-primary focus:border-primary"
              ),
              maxLength: 200,
              value: description,
              onChange: (e) => setDescription(e.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "space-y-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { className: "form-label font-semibold", children: indT("Visits_Field_Comments", "Comments") }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            "textarea",
            {
              id: "comentarios",
              className: classNames(
                "form-control cursor-pointer",
                comentariosInvalid ? "border-rose-400 bg-rose-50 focus:ring-rose-200 focus:border-rose-400" : "border-slate-200 focus:ring-primary focus:border-primary"
              ),
              value: comentarios,
              readOnly: true,
              onPointerDown: comentariosTap.onPointerDown,
              onPointerMove: comentariosTap.onPointerMove,
              onPointerUp: comentariosTap.onPointerUp,
              onPointerCancel: comentariosTap.onPointerCancel
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "space-y-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { className: "form-label font-semibold", children: indT("Visits_Field_Background", "Background") }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            "textarea",
            {
              id: "antecedentes",
              className: "form-control cursor-pointer",
              value: antecedentes,
              readOnly: true,
              onPointerDown: antecedentesTap.onPointerDown,
              onPointerMove: antecedentesTap.onPointerMove,
              onPointerUp: antecedentesTap.onPointerUp,
              onPointerCancel: antecedentesTap.onPointerCancel
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "space-y-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { className: "form-label font-semibold", children: indT("Visits_Field_Conclusions", "Conclusions") }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            "textarea",
            {
              id: "conclusiones",
              className: "form-control cursor-pointer",
              value: conclusiones,
              readOnly: true,
              onPointerDown: conclusionesTap.onPointerDown,
              onPointerMove: conclusionesTap.onPointerMove,
              onPointerUp: conclusionesTap.onPointerUp,
              onPointerCancel: conclusionesTap.onPointerCancel
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "text-sm text-slate-500", children: status }) })
    ] })
  ] });
}
var ErrorBoundary = class extends import_react5.default.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
  }
  render() {
    if (this.state.hasError) {
      return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "p-4 rounded-xl border border-rose-200 bg-rose-50 text-rose-700", children: indT("Visits_Create_ErrorBoundary", "An error occurred while rendering the visits page. Reload and try again.") });
    }
    return this.props.children;
  }
};
function CreateForm() {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ErrorBoundary, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(VisitasApp, {}) });
}

// Web/wwwroot/react/src/pages/visitas/creacion/CreatePage.tsx
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
var CreatePage = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(I18nProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(CreateForm, {}) }) });
};
var mount = () => {
  const rootEl = document.getElementById("visitas-app-root");
  if (!rootEl) return;
  const element = /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(CreatePage, {});
  if (rootEl.__indRoot) {
    rootEl.__indRoot.render(element);
    return;
  }
  const root = (0, import_client.createRoot)(rootEl);
  rootEl.__indRoot = root;
  root.render(element);
};
if (document.readyState === "complete" || document.readyState === "interactive") {
  mount();
} else {
  document.addEventListener("DOMContentLoaded", mount);
}
var CreatePage_default = CreatePage;
export {
  CreatePage_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvY3JlYWNpb24vQ3JlYXRlUGFnZS50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvY3JlYWNpb24vQ3JlYXRlRm9ybS50c3giLCAiLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvdmlzaXRhcy9Db250YWN0c0NvbWJvYm94LnRzeCIsICIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQGhlcm9pY29ucy9yZWFjdC8yMC9zb2xpZC9lc20vWE1hcmtJY29uLmpzIiwgIi4uL3JlYWN0L3NyYy9ob29rcy91c2VUb3BiYXIudHMiLCAiLi4vcmVhY3Qvc3JjL2hvb2tzL3VzZUNyZWF0ZURyYWZ0LnRzIiwgIi4uL3JlYWN0L3NyYy91dGlscy9nbG9iYWxTcGlubmVyLnRzIiwgIi4uL3JlYWN0L3NyYy9ob29rcy91c2VDcmVhdGVTdWJtaXQudHMiLCAiLi4vcmVhY3Qvc3JjL3V0aWxzL2luZElkcy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgY3JlYXRlUm9vdCB9IGZyb20gXCJyZWFjdC1kb20vY2xpZW50XCI7XG5pbXBvcnQgQ3JlYXRlRm9ybSBmcm9tIFwiLi9DcmVhdGVGb3JtLnRzeFwiO1xuaW1wb3J0IHsgSTE4blByb3ZpZGVyIH0gZnJvbSBcIi4uLy4uLy4uL2NvbnRleHQvSTE4bkNvbnRleHQudHN4XCI7XG5pbXBvcnQgeyBBdXRoUHJvdmlkZXIgfSBmcm9tIFwiLi4vLi4vLi4vY29udGV4dC9BdXRoQ29udGV4dC50c3hcIjtcblxudHlwZSBJbmRSb290RWxlbWVudCA9IEhUTUxFbGVtZW50ICYgeyBfX2luZFJvb3Q/OiBpbXBvcnQoXCJyZWFjdC1kb20vY2xpZW50XCIpLlJvb3QgfTtcblxuLy8gUGFnZSBlbnRyeSBmb3IgdGhlIHZpc2l0YXMgY3JlYXRlIGlzbGFuZC5cbmNvbnN0IENyZWF0ZVBhZ2UgPSAoKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPEkxOG5Qcm92aWRlcj5cbiAgICAgIDxBdXRoUHJvdmlkZXI+XG4gICAgICAgIDxDcmVhdGVGb3JtIC8+XG4gICAgICA8L0F1dGhQcm92aWRlcj5cbiAgICA8L0kxOG5Qcm92aWRlcj5cbiAgKTtcbn07XG5cbmNvbnN0IG1vdW50ID0gKCkgPT4ge1xuICBjb25zdCByb290RWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpc2l0YXMtYXBwLXJvb3RcIikgYXMgSW5kUm9vdEVsZW1lbnQgfCBudWxsO1xuICBpZiAoIXJvb3RFbCkgcmV0dXJuO1xuXG4gIGNvbnN0IGVsZW1lbnQgPSA8Q3JlYXRlUGFnZSAvPjtcblxuICBpZiAocm9vdEVsLl9faW5kUm9vdCkge1xuICAgIHJvb3RFbC5fX2luZFJvb3QucmVuZGVyKGVsZW1lbnQpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHJvb3QgPSBjcmVhdGVSb290KHJvb3RFbCk7XG4gIHJvb3RFbC5fX2luZFJvb3QgPSByb290O1xuICByb290LnJlbmRlcihlbGVtZW50KTtcbn07XG5cbmlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSBcImNvbXBsZXRlXCIgfHwgZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gXCJpbnRlcmFjdGl2ZVwiKSB7XG4gIG1vdW50KCk7XG59IGVsc2Uge1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBtb3VudCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IENyZWF0ZVBhZ2U7XG4iLCAiXHVGRUZGaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlU3RhdGUsIHVzZVJlZiB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgQ29uZmlybU1vZGFsIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvQ29uZmlybU1vZGFsLnRzeFwiO1xuaW1wb3J0IFNpbmdsZURhdGVQaWNrZXIgZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9TaW5nbGVEYXRlUGlja2VyLnRzeFwiO1xuaW1wb3J0IFNlbGVjdENvbWJvYm94IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvU2VsZWN0Q29tYm9ib3gudHN4XCI7XG5pbXBvcnQgeyB1c2VWaXNpdGFzIH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZVZpc2l0YXMudHNcIjtcbmltcG9ydCBDbGllbnRTZWFyY2hDb21ib2JveCBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy92aXNpdGFzL0NsaWVudFNlYXJjaENvbWJvYm94LnRzeFwiO1xuaW1wb3J0IENvbnRhY3RzQ29tYm9ib3ggZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvdmlzaXRhcy9Db250YWN0c0NvbWJvYm94LnRzeFwiO1xuaW1wb3J0IHsgdXNlVGFwR3VhcmQgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlVGFwR3VhcmQudHNcIjtcbmltcG9ydCB7IHVzZVRvcGJhciB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VUb3BiYXIudHNcIjtcbmltcG9ydCB7IHVzZUNvbmZpcm1EaWFsb2cgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlQ29uZmlybURpYWxvZy50c1wiO1xuaW1wb3J0IHsgdXNlQ3JlYXRlRHJhZnQgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlQ3JlYXRlRHJhZnQudHNcIjtcbmltcG9ydCB7IHVzZUNyZWF0ZVN1Ym1pdCB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VDcmVhdGVTdWJtaXQudHNcIjtcbmltcG9ydCB7IGNsYXNzTmFtZXMgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvY2xhc3NOYW1lcy50c1wiO1xuaW1wb3J0IHsgaW5kRm9ybWF0LCBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB7IGNhbkFjY2Vzcywgc2hvd1Blcm1pc3Npb25Nb2RhbCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9wZXJtaXNzaW9ucy50c1wiO1xuaW1wb3J0IHsgc2V0UHJldmlld0FuY2hvciwgc2hvd1ByZXZpZXdUb29sdGlwLCBpc092ZXJmbG93aW5nIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3ByZXZpZXdUb29sdGlwLnRzXCI7XG5pbXBvcnQgeyByZWFkQW5kQ2xlYXJUZXh0RWRpdG9yVmFsdWUsIFRFWFRfRURJVE9SX1BSRUZJWCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy90ZXh0RWRpdG9yLnRzXCI7XG5pbXBvcnQgeyBmbGFzaEFjdGlvbk1hcmsgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvdmlzaXRhc0hpc3RvcnkudHNcIjtcblxyXG5mdW5jdGlvbiBWaXNpdGFzQXBwKCkge1xyXG4gIGNvbnN0IHsgdmlzaXRUeXBlcywgYXNpc3RlbnRlVGlwb3MgfSA9IHVzZVZpc2l0YXMoKTtcclxuICBjb25zdCBjYW5DcmVhdGVWaXNpdCA9IGNhbkFjY2VzcyhcIlZJU0lUQVNfQ1JFQUNJT05cIiwgXCJBZGRcIik7XHJcbiAgY29uc3QgY2FuUm9sbGJhY2tEZWxldGUgPSBjYW5BY2Nlc3MoXCJWSVNJVEFTX0hJU1RPUklBTFwiLCBcIkZ1bGxBY2Nlc3NcIik7XHJcblxyXG4gIGNvbnN0IGZpZWxkSWRDb21lbnRhcmlvcyA9IFwiVmlzaXRhLkNyZWF0ZS5Db21lbnRhcmlvc1wiO1xyXG4gIGNvbnN0IGZpZWxkSWRBbnRlY2VkZW50ZXMgPSBcIlZpc2l0YS5DcmVhdGUuQW50ZWNlZGVudGVzXCI7XHJcbiAgY29uc3QgZmllbGRJZENvbmNsdXNpb25lcyA9IFwiVmlzaXRhLkNyZWF0ZS5Db25jbHVzaW9uZXNcIjtcclxuXHJcbiAgY29uc3QgW3N0ZXAsIHNldFN0ZXBdID0gdXNlU3RhdGUoMSk7XHJcbiAgY29uc3QgW3NlbGVjdGVkQ2xpZW50LCBzZXRTZWxlY3RlZENsaWVudF0gPSB1c2VTdGF0ZShudWxsKTtcclxuICBjb25zdCBbc2VsZWN0ZWRDb250YWN0cywgc2V0U2VsZWN0ZWRDb250YWN0c10gPSB1c2VTdGF0ZShbXSk7XHJcbiAgY29uc3QgdG9kYXlTdHJpbmcgPSAoKSA9PiB7XHJcbiAgICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKCk7XHJcbiAgICBjb25zdCB5eXl5ID0gdG9kYXkuZ2V0RnVsbFllYXIoKTtcclxuICAgIGNvbnN0IG1tID0gU3RyaW5nKHRvZGF5LmdldE1vbnRoKCkgKyAxKS5wYWRTdGFydCgyLCBcIjBcIik7XHJcbiAgICBjb25zdCBkZCA9IFN0cmluZyh0b2RheS5nZXREYXRlKCkpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcclxuICAgIHJldHVybiBgJHt5eXl5fS0ke21tfS0ke2RkfWA7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgZGVmYXVsdFZpc2l0VHlwZSA9IHZpc2l0VHlwZXNbMF0/LnZhbHVlID8/IHZpc2l0VHlwZXNbMF0/LlZhbHVlID8/IFwiXCI7XHJcbiAgY29uc3QgZGVmYXVsdEFzaXN0ZW50ZVRpcG8gPSBhc2lzdGVudGVUaXBvc1swXT8udmFsdWUgPz8gYXNpc3RlbnRlVGlwb3NbMF0/LlZhbHVlID8/IFwiMFwiO1xyXG5cclxuICBjb25zdCBbdmlzaXRUeXBlLCBzZXRWaXNpdFR5cGVdID0gdXNlU3RhdGUoZGVmYXVsdFZpc2l0VHlwZSk7XHJcbiAgY29uc3QgW3RyYW5zRGF0ZSwgc2V0VHJhbnNEYXRlXSA9IHVzZVN0YXRlKCgpID0+IHRvZGF5U3RyaW5nKCkpO1xyXG4gIGNvbnN0IFtkZXNjcmlwdGlvbiwgc2V0RGVzY3JpcHRpb25dID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW2NvbWVudGFyaW9zLCBzZXRDb21lbnRhcmlvc10gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbYW50ZWNlZGVudGVzLCBzZXRBbnRlY2VkZW50ZXNdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW2NvbmNsdXNpb25lcywgc2V0Q29uY2x1c2lvbmVzXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtzdGF0dXMsIHNldFN0YXR1c10gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2J1c3ksIHNldEJ1c3ldID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbc2hvd1JlcXVpcmVkLCBzZXRTaG93UmVxdWlyZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbbW9kYWxFcnJvciwgc2V0TW9kYWxFcnJvcl0gPSB1c2VTdGF0ZShcIlwiKTtcblxyXG4gIGNvbnN0IHsgbW9kYWwsIG9wZW5Db25maXJtLCBjbG9zZUNvbmZpcm0sIGhhbmRsZUNvbmZpcm0gfSA9IHVzZUNvbmZpcm1EaWFsb2coe1xyXG4gICAgZGVmYXVsdENvbmZpcm1UZXh0OiBpbmRUKFwiQ29uZmlybV9ZZXNcIiwgXCJPS1wiKSxcclxuICAgIGRlZmF1bHRDYW5jZWxUZXh0OiBpbmRUKFwiQ29uZmlybV9Ob1wiLCBcIkNhbmNlbFwiKVxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVNb2RhbENvbmZpcm0gPSBSZWFjdC51c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XHJcbiAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xyXG4gICAgYXdhaXQgaGFuZGxlQ29uZmlybSh7XHJcbiAgICAgIGJ1c3ksXHJcbiAgICAgIG9uRXJyb3I6IChtc2cpID0+IHtcclxuICAgICAgICBzZXRNb2RhbEVycm9yKG1zZyk7XHJcbiAgICAgICAgc2V0U3RhdHVzKG1zZyk7XHJcbiAgICAgICAgZmxhc2hBY3Rpb25NYXJrKFwiZXJyb3JQcm9jZXNzXCIsIDE1MDApO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9LCBbYnVzeSwgaGFuZGxlQ29uZmlybV0pO1xyXG5cclxuICBjb25zdCBtb2RhbExvYWRpbmdUZXh0ID0gaW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKTtcclxuICBjb25zdCBtb2RhbENhbmNlbFRleHQgPSBtb2RhbC5jYW5jZWxUZXh0IHx8IGluZFQoXCJDb25maXJtX05vXCIsIFwiQ2FuY2VsXCIpO1xyXG4gIGNvbnN0IG1vZGFsQ29uZmlybVRleHQgPSBidXN5XHJcbiAgICA/IG1vZGFsTG9hZGluZ1RleHRcclxuICAgIDogKCFidXN5ICYmIG1vZGFsRXJyb3IgPyBpbmRUKFwiQ29tbW9uX09LXCIsIFwiT0tcIikgOiAobW9kYWwuY29uZmlybVRleHQgfHwgaW5kVChcIkNvbmZpcm1fWWVzXCIsIFwiT0tcIikpKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlTW9kYWxCdXR0b25Db25maXJtID0gUmVhY3QudXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKCFidXN5ICYmIG1vZGFsRXJyb3IpIHtcclxuICAgICAgY2xvc2VDb25maXJtKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGhhbmRsZU1vZGFsQ29uZmlybSgpO1xyXG4gIH0sIFtidXN5LCBtb2RhbEVycm9yLCBjbG9zZUNvbmZpcm0sIGhhbmRsZU1vZGFsQ29uZmlybV0pO1xyXG5cclxuICBjb25zdCBkcmFmdFNuYXBzaG90ID0gdXNlTWVtbyhcbiAgICAoKSA9PiAoe1xuICAgICAgc2VsZWN0ZWRDbGllbnQsXG4gICAgICBzZWxlY3RlZENvbnRhY3RzLFxuICAgICAgdmlzaXRUeXBlLFxuICAgICAgdHJhbnNEYXRlLFxuICAgICAgZGVzY3JpcHRpb24sXG4gICAgICBjb21lbnRhcmlvcyxcbiAgICAgIGFudGVjZWRlbnRlcyxcbiAgICAgIGNvbmNsdXNpb25lcyxcbiAgICAgIHN0ZXAsXG4gICAgfSksXG4gICAgW3NlbGVjdGVkQ2xpZW50LCBzZWxlY3RlZENvbnRhY3RzLCB2aXNpdFR5cGUsIHRyYW5zRGF0ZSwgZGVzY3JpcHRpb24sIGNvbWVudGFyaW9zLCBhbnRlY2VkZW50ZXMsIGNvbmNsdXNpb25lcywgc3RlcF1cbiAgKTtcblxuICBjb25zdCB7IHBlcnNpc3REcmFmdE5vdyB9ID0gdXNlQ3JlYXRlRHJhZnQoe1xuICAgIGRyYWZ0U25hcHNob3QsXG4gICAgc2V0U2VsZWN0ZWRDbGllbnQsXG4gICAgc2V0U2VsZWN0ZWRDb250YWN0cyxcbiAgICBzZXRWaXNpdFR5cGUsXG4gICAgc2V0VHJhbnNEYXRlLFxuICAgIHNldERlc2NyaXB0aW9uLFxuICAgIHNldENvbWVudGFyaW9zLFxuICAgIHNldEFudGVjZWRlbnRlcyxcbiAgICBzZXRDb25jbHVzaW9uZXMsXG4gICAgc2V0U3RlcCxcbiAgfSk7XG5cclxuICAvLyBPcGVucyB0aGUgZnVsbC1zY3JlZW4gdGV4dCBlZGl0b3IgZm9yIGEgbXVsdGlsaW5lIGZpZWxkLlxyXG4gIGNvbnN0IG9wZW5UZXh0RWRpdG9yID0gUmVhY3QudXNlQ2FsbGJhY2soXHJcbiAgICAoZmllbGRJZDogc3RyaW5nLCBmaWVsZExhYmVsOiBzdHJpbmcsIGZpZWxkVmFsdWU6IHN0cmluZywgb3B0aW9uczogeyBhbGxvd0VkaXQ/OiBib29sZWFuIH0gPSB7fSkgPT4ge1xyXG4gICAgY29uc3Qgc2FmZUlkID0gU3RyaW5nKGZpZWxkSWQgfHwgXCJcIikudHJpbSgpO1xyXG4gICAgY29uc3Qgc2FmZUxhYmVsID0gU3RyaW5nKGZpZWxkTGFiZWwgfHwgXCJcIikudHJpbSgpO1xyXG4gICAgY29uc3QgYWxsb3dFZGl0ID0gb3B0aW9ucz8uYWxsb3dFZGl0ICE9PSBmYWxzZTtcclxuICAgIGlmICghc2FmZUlkIHx8ICFzYWZlTGFiZWwpIHJldHVybjtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBrZXkgPSBgJHtURVhUX0VESVRPUl9QUkVGSVh9JHtzYWZlSWR9YDtcclxuICAgICAgLy8gUHJpbWUgdGhlIGVkaXRvciB3aXRoIHRoZSBjdXJyZW50IHZhbHVlIHdpdGhvdXQgcHVzaGluZyBsYXJnZSB0ZXh0IGludG8gdGhlIFVSTC5cclxuICAgICAgaWYgKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oa2V5KSA9PT0gbnVsbCkge1xyXG4gICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oa2V5LCBTdHJpbmcoZmllbGRWYWx1ZSB8fCBcIlwiKSk7XHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2gge1xyXG4gICAgICAvKiBpZ25vcmUgKi9cclxuICAgIH1cclxuXHJcbiAgICBwZXJzaXN0RHJhZnROb3coKTtcclxuICAgIGNvbnN0IHJldHVyblVybCA9IGAke3dpbmRvdy5sb2NhdGlvbi5wYXRobmFtZX0ke3dpbmRvdy5sb2NhdGlvbi5zZWFyY2ggfHwgXCJcIn1gO1xyXG4gICAgdHJ5IHtcclxuICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShgJHtURVhUX0VESVRPUl9QUkVGSVh9JHtzYWZlSWR9X3JldHVyblVybGAsIHJldHVyblVybCk7XHJcbiAgICB9IGNhdGNoIHtcclxuICAgICAgLyogaWdub3JlICovXHJcbiAgICB9XHJcbiAgICBjb25zdCB1cmwgPVxuICAgICAgYC9UZXh0RWRpdG9yUmVhY3QvRWRpdEZpZWxkP2ZpZWxkSWQ9JHtlbmNvZGVVUklDb21wb25lbnQoc2FmZUlkKX1gICtcbiAgICAgIGAmZmllbGRMYWJlbD0ke2VuY29kZVVSSUNvbXBvbmVudChzYWZlTGFiZWwpfWAgK1xuICAgICAgYCZyZXR1cm5Vcmw9JHtlbmNvZGVVUklDb21wb25lbnQocmV0dXJuVXJsKX1gICtcbiAgICAgIGAmYWxsb3dFZGl0PSR7YWxsb3dFZGl0ID8gXCIxXCIgOiBcIjBcIn1gO1xuXG4gICAgd2luZG93Ll9faW5kQnlwYXNzTmF2aWdhdGlvbkd1YXJkT25jZT8uKCk7XG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSB1cmw7XG4gICAgfSxcbiAgICBbcGVyc2lzdERyYWZ0Tm93XVxuICApO1xuXHJcbiAgY29uc3QgaGFuZGxlQ29tZW50YXJpb3NUYXAgPSBSZWFjdC51c2VDYWxsYmFjaygoZXZlbnQpID0+IHtcclxuICAgIGlmIChidXN5KSByZXR1cm47XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgb3BlblRleHRFZGl0b3IoZmllbGRJZENvbWVudGFyaW9zLCBpbmRUKFwiVmlzaXRzX0ZpZWxkX0NvbW1lbnRzXCIsIFwiQ29tbWVudHNcIiksIGNvbWVudGFyaW9zKTtcclxuICB9LCBbYnVzeSwgY29tZW50YXJpb3MsIG9wZW5UZXh0RWRpdG9yXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUNvbWVudGFyaW9zSG9sZCA9IFJlYWN0LnVzZUNhbGxiYWNrKCh0YXJnZXQsIGNsaWVudFkpID0+IHtcclxuICAgIGlmICghdGFyZ2V0IHx8ICFpc092ZXJmbG93aW5nKHRhcmdldCkpIHJldHVybiBmYWxzZTtcclxuICAgIHNldFByZXZpZXdBbmNob3IodGFyZ2V0KTtcclxuICAgIHJldHVybiBzaG93UHJldmlld1Rvb2x0aXAoU3RyaW5nKGNvbWVudGFyaW9zIHx8IFwiXCIpLCBjbGllbnRZKTtcclxuICB9LCBbY29tZW50YXJpb3NdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQW50ZWNlZGVudGVzVGFwID0gUmVhY3QudXNlQ2FsbGJhY2soKGV2ZW50KSA9PiB7XHJcbiAgICBpZiAoYnVzeSkgcmV0dXJuO1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIG9wZW5UZXh0RWRpdG9yKGZpZWxkSWRBbnRlY2VkZW50ZXMsIGluZFQoXCJWaXNpdHNfRmllbGRfQmFja2dyb3VuZFwiLCBcIkJhY2tncm91bmRcIiksIGFudGVjZWRlbnRlcyk7XHJcbiAgfSwgW2J1c3ksIGFudGVjZWRlbnRlcywgb3BlblRleHRFZGl0b3JdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQW50ZWNlZGVudGVzSG9sZCA9IFJlYWN0LnVzZUNhbGxiYWNrKCh0YXJnZXQsIGNsaWVudFkpID0+IHtcclxuICAgIGlmICghdGFyZ2V0IHx8ICFpc092ZXJmbG93aW5nKHRhcmdldCkpIHJldHVybiBmYWxzZTtcclxuICAgIHNldFByZXZpZXdBbmNob3IodGFyZ2V0KTtcclxuICAgIHJldHVybiBzaG93UHJldmlld1Rvb2x0aXAoU3RyaW5nKGFudGVjZWRlbnRlcyB8fCBcIlwiKSwgY2xpZW50WSk7XHJcbiAgfSwgW2FudGVjZWRlbnRlc10pO1xyXG5cclxuICBjb25zdCBoYW5kbGVDb25jbHVzaW9uZXNUYXAgPSBSZWFjdC51c2VDYWxsYmFjaygoZXZlbnQpID0+IHtcclxuICAgIGlmIChidXN5KSByZXR1cm47XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgb3BlblRleHRFZGl0b3IoZmllbGRJZENvbmNsdXNpb25lcywgaW5kVChcIlZpc2l0c19GaWVsZF9Db25jbHVzaW9uc1wiLCBcIkNvbmNsdXNpb25zXCIpLCBjb25jbHVzaW9uZXMpO1xyXG4gIH0sIFtidXN5LCBjb25jbHVzaW9uZXMsIG9wZW5UZXh0RWRpdG9yXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUNvbmNsdXNpb25lc0hvbGQgPSBSZWFjdC51c2VDYWxsYmFjaygodGFyZ2V0LCBjbGllbnRZKSA9PiB7XHJcbiAgICBpZiAoIXRhcmdldCB8fCAhaXNPdmVyZmxvd2luZyh0YXJnZXQpKSByZXR1cm4gZmFsc2U7XHJcbiAgICBzZXRQcmV2aWV3QW5jaG9yKHRhcmdldCk7XHJcbiAgICByZXR1cm4gc2hvd1ByZXZpZXdUb29sdGlwKFN0cmluZyhjb25jbHVzaW9uZXMgfHwgXCJcIiksIGNsaWVudFkpO1xyXG4gIH0sIFtjb25jbHVzaW9uZXNdKTtcclxuXHJcbiAgY29uc3QgY29tZW50YXJpb3NUYXAgPSB1c2VUYXBHdWFyZChoYW5kbGVDb21lbnRhcmlvc1RhcCwgaGFuZGxlQ29tZW50YXJpb3NIb2xkKTtcclxuICBjb25zdCBhbnRlY2VkZW50ZXNUYXAgPSB1c2VUYXBHdWFyZChoYW5kbGVBbnRlY2VkZW50ZXNUYXAsIGhhbmRsZUFudGVjZWRlbnRlc0hvbGQpO1xyXG4gIGNvbnN0IGNvbmNsdXNpb25lc1RhcCA9IHVzZVRhcEd1YXJkKGhhbmRsZUNvbmNsdXNpb25lc1RhcCwgaGFuZGxlQ29uY2x1c2lvbmVzSG9sZCk7XHJcblxyXG4gIGNvbnN0IGFwcGx5VGV4dEVkaXRvclZhbHVlcyA9IFJlYWN0LnVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGNvbnN0IHZhbENvbWVudGFyaW9zID0gcmVhZEFuZENsZWFyVGV4dEVkaXRvclZhbHVlKGZpZWxkSWRDb21lbnRhcmlvcyk7XHJcbiAgICBpZiAodmFsQ29tZW50YXJpb3MgIT09IG51bGwpIHNldENvbWVudGFyaW9zKHZhbENvbWVudGFyaW9zKTtcclxuXHJcbiAgICBjb25zdCB2YWxBbnRlY2VkZW50ZXMgPSByZWFkQW5kQ2xlYXJUZXh0RWRpdG9yVmFsdWUoZmllbGRJZEFudGVjZWRlbnRlcyk7XHJcbiAgICBpZiAodmFsQW50ZWNlZGVudGVzICE9PSBudWxsKSBzZXRBbnRlY2VkZW50ZXModmFsQW50ZWNlZGVudGVzKTtcclxuXHJcbiAgICBjb25zdCB2YWxDb25jbHVzaW9uZXMgPSByZWFkQW5kQ2xlYXJUZXh0RWRpdG9yVmFsdWUoZmllbGRJZENvbmNsdXNpb25lcyk7XHJcbiAgICBpZiAodmFsQ29uY2x1c2lvbmVzICE9PSBudWxsKSBzZXRDb25jbHVzaW9uZXModmFsQ29uY2x1c2lvbmVzKTtcclxuICB9LCBbZmllbGRJZENvbWVudGFyaW9zLCBmaWVsZElkQW50ZWNlZGVudGVzLCBmaWVsZElkQ29uY2x1c2lvbmVzXSk7XHJcblxyXG4gIC8vIENsZWFyIGNvbnRhY3RzIG9ubHkgd2hlbiB0aGUgY2xpZW50IGNoYW5nZXMgKGF2b2lkIGNsZWFyaW5nIG9uIHJlc3RvcmUvc3RlcCAyIHJldHVybikuXHJcbiAgY29uc3QgcHJldkNsaWVudFJlZiA9IHVzZVJlZihudWxsKTtcclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3QgY3VycmVudCA9IHNlbGVjdGVkQ2xpZW50Py52YWx1ZTtcclxuICAgIGlmIChwcmV2Q2xpZW50UmVmLmN1cnJlbnQgJiYgcHJldkNsaWVudFJlZi5jdXJyZW50ICE9PSBjdXJyZW50KSB7XHJcbiAgICAgIHNldFNlbGVjdGVkQ29udGFjdHMoW10pO1xyXG4gICAgfVxyXG4gICAgcHJldkNsaWVudFJlZi5jdXJyZW50ID0gY3VycmVudDtcclxuICB9LCBbc2VsZWN0ZWRDbGllbnQ/LnZhbHVlXSk7XHJcblxyXG4gIGNvbnN0IGxhc3RDbGllbnRSZWYgPSB1c2VSZWYobnVsbCk7XHJcblxyXG4gIC8vIElmIHRoZSBjbGllbnQgY2hhbmdlcyBhZnRlciBzZWxlY3RpbmcgY29udGFjdHMsIHJlc2V0IHRoZSBlbnRpcmUgZm9ybS5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3QgY3VycmVudCA9IHNlbGVjdGVkQ2xpZW50Py52YWx1ZTtcclxuICAgIGlmICghY3VycmVudCkgcmV0dXJuO1xyXG5cclxuICAgIGlmIChsYXN0Q2xpZW50UmVmLmN1cnJlbnQgJiYgbGFzdENsaWVudFJlZi5jdXJyZW50ICE9PSBjdXJyZW50KSB7XHJcbiAgICAgIHNldFN0ZXAoMSk7XHJcbiAgICAgIHNldFNlbGVjdGVkQ29udGFjdHMoW10pO1xyXG4gICAgICBzZXRWaXNpdFR5cGUoZGVmYXVsdFZpc2l0VHlwZSk7XHJcbiAgICAgIHNldFRyYW5zRGF0ZSh0b2RheVN0cmluZygpKTtcclxuICAgICAgc2V0RGVzY3JpcHRpb24oXCJcIik7XHJcbiAgICAgIHNldENvbWVudGFyaW9zKFwiXCIpO1xyXG4gICAgICBzZXRBbnRlY2VkZW50ZXMoXCJcIik7XHJcbiAgICAgIHNldENvbmNsdXNpb25lcyhcIlwiKTtcclxuICAgICAgc2V0U3RhdHVzKFwiXCIpO1xyXG4gICAgICBzZXRCdXN5KGZhbHNlKTtcclxuICAgIH1cclxuICAgIGxhc3RDbGllbnRSZWYuY3VycmVudCA9IGN1cnJlbnQ7XHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVhY3QtaG9va3MvZXhoYXVzdGl2ZS1kZXBzXHJcbiAgfSwgW3NlbGVjdGVkQ2xpZW50Py52YWx1ZV0pO1xyXG5cclxuICAvLyBBcHBseSBwZW5kaW5nIHZhbHVlcyBjb21pbmcgZnJvbSB0aGUgZnVsbC1zY3JlZW4gdGV4dCBlZGl0b3IuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgYXBwbHlUZXh0RWRpdG9yVmFsdWVzKCk7XHJcbiAgICBjb25zdCBvblBhZ2VTaG93ID0gKCkgPT4gYXBwbHlUZXh0RWRpdG9yVmFsdWVzKCk7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInBhZ2VzaG93XCIsIG9uUGFnZVNob3cpO1xyXG4gICAgcmV0dXJuICgpID0+IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicGFnZXNob3dcIiwgb25QYWdlU2hvdyk7XHJcbiAgfSwgW2FwcGx5VGV4dEVkaXRvclZhbHVlc10pO1xyXG5cclxuICBjb25zdCBjYW5Hb05leHQgPSAhIXNlbGVjdGVkQ2xpZW50O1xuICBjb25zdCBjYW5DcmVhdGUgPVxuICAgICEhc2VsZWN0ZWRDbGllbnQgJiZcbiAgICBTdHJpbmcodmlzaXRUeXBlIHx8IFwiXCIpLnRyaW0oKSAhPT0gXCJcIiAmJlxuICAgIFN0cmluZyh2aXNpdFR5cGUpICE9PSBcIjBcIiAmJlxuICAgIGRlc2NyaXB0aW9uLnRyaW0oKS5sZW5ndGggPiAwICYmXG4gICAgY29tZW50YXJpb3MudHJpbSgpLmxlbmd0aCA+IDA7XG5cbiAgY29uc3QgaGFzQWN0aXZlUHJvY2VzcyA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIGlmIChidXN5KSByZXR1cm4gdHJ1ZTtcbiAgICBpZiAoc3RlcCA+IDEpIHJldHVybiB0cnVlO1xuICAgIGlmIChzZWxlY3RlZENsaWVudCkgcmV0dXJuIHRydWU7XG4gICAgaWYgKHNlbGVjdGVkQ29udGFjdHMubGVuZ3RoID4gMCkgcmV0dXJuIHRydWU7XG4gICAgcmV0dXJuIChcbiAgICAgIGRlc2NyaXB0aW9uLnRyaW0oKS5sZW5ndGggPiAwIHx8XG4gICAgICBjb21lbnRhcmlvcy50cmltKCkubGVuZ3RoID4gMCB8fFxuICAgICAgYW50ZWNlZGVudGVzLnRyaW0oKS5sZW5ndGggPiAwIHx8XG4gICAgICBjb25jbHVzaW9uZXMudHJpbSgpLmxlbmd0aCA+IDBcbiAgICApO1xuICB9LCBbYW50ZWNlZGVudGVzLCBidXN5LCBjb21lbnRhcmlvcywgY29uY2x1c2lvbmVzLCBkZXNjcmlwdGlvbiwgc2VsZWN0ZWRDbGllbnQsIHNlbGVjdGVkQ29udGFjdHMubGVuZ3RoLCBzdGVwXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICB3aW5kb3cuX19pbmRTZXROYXZpZ2F0aW9uR3VhcmQ/LihoYXNBY3RpdmVQcm9jZXNzKTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgd2luZG93Ll9faW5kQ2xlYXJOYXZpZ2F0aW9uR3VhcmQ/LigpO1xuICAgIH07XG4gIH0sIFtoYXNBY3RpdmVQcm9jZXNzXSk7XG5cclxuICBjb25zdCBoYW5kbGVUb3BiYXJQcmltYXJ5ID0gUmVhY3QudXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmICghY2FuQ3JlYXRlVmlzaXQpIHtcbiAgICAgIHNob3dQZXJtaXNzaW9uTW9kYWwoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHN0ZXAgPT09IDEgJiYgY2FuR29OZXh0KSBzZXRTdGVwKDIpO1xuICAgIGlmIChzdGVwID09PSAyKSBoYW5kbGVTdWJtaXQoKTtcbiAgfSwgW2NhbkNyZWF0ZVZpc2l0LCBjYW5Hb05leHQsIGhhbmRsZVN1Ym1pdCwgc3RlcF0pO1xuXG4gIGNvbnN0IGhhbmRsZVRvcGJhckJhY2sgPSBSZWFjdC51c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgc2V0U3RlcCgxKTtcbiAgfSwgW10pO1xuXG4gIHVzZVRvcGJhcihzdGVwLCBjYW5Hb05leHQsIGhhbmRsZVRvcGJhclByaW1hcnksIGhhbmRsZVRvcGJhckJhY2ssIGJ1c3ksIGNhbkNyZWF0ZSwgY2FuQ3JlYXRlVmlzaXQpO1xuXHJcbiAgY29uc3QgeyBoYW5kbGVTdWJtaXQgfSA9IHVzZUNyZWF0ZVN1Ym1pdCh7XG4gICAgYnVzeSxcbiAgICBtb2RhbE9wZW46IG1vZGFsLm9wZW4sXG4gICAgY2FuQ3JlYXRlVmlzaXQsXG4gICAgY2FuUm9sbGJhY2tEZWxldGUsXG4gICAgc2VsZWN0ZWRDbGllbnQsXG4gICAgc2VsZWN0ZWRDb250YWN0cyxcbiAgICB2aXNpdFR5cGUsXG4gICAgZGVmYXVsdEFzaXN0ZW50ZVRpcG8sXG4gICAgZGVzY3JpcHRpb24sXG4gICAgdHJhbnNEYXRlLFxuICAgIGNvbWVudGFyaW9zLFxuICAgIGFudGVjZWRlbnRlcyxcbiAgICBjb25jbHVzaW9uZXMsXG4gICAgc2V0QnVzeSxcbiAgICBzZXRTdGF0dXMsXG4gICAgc2V0TW9kYWxFcnJvcixcbiAgICBzZXRTaG93UmVxdWlyZWQsXG4gICAgb3BlbkNvbmZpcm0sXG4gICAgY2xvc2VDb25maXJtLFxuICB9KTtcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoc3RlcCA9PT0gMSkge1xyXG4gICAgICBzZXRTaG93UmVxdWlyZWQoZmFsc2UpO1xyXG4gICAgICBjbG9zZUNvbmZpcm0oKTtcclxuICAgIH1cclxuICB9LCBbc3RlcCwgY2xvc2VDb25maXJtXSk7XHJcblxyXG4gIGNvbnN0IHZpc2l0VHlwZUludmFsaWQgPSBzaG93UmVxdWlyZWQgJiYgKFN0cmluZyh2aXNpdFR5cGUgfHwgXCJcIikgPT09IFwiXCIgfHwgU3RyaW5nKHZpc2l0VHlwZSkgPT09IFwiMFwiKTtcclxuICBjb25zdCBkZXNjcmlwdGlvbkludmFsaWQgPSBzaG93UmVxdWlyZWQgJiYgZGVzY3JpcHRpb24udHJpbSgpLmxlbmd0aCA9PT0gMDtcclxuICBjb25zdCBjb21lbnRhcmlvc0ludmFsaWQgPSBzaG93UmVxdWlyZWQgJiYgY29tZW50YXJpb3MudHJpbSgpLmxlbmd0aCA9PT0gMDtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS00XCI+XHJcbiAgICAgIDxDb25maXJtTW9kYWxcclxuICAgICAgICBvcGVuPXttb2RhbC5vcGVufVxyXG4gICAgICAgIHRpdGxlPXttb2RhbC50aXRsZX1cclxuICAgICAgICBtZXNzYWdlPXttb2RhbC5tZXNzYWdlfVxyXG4gICAgICAgIGNvbmZpcm1UZXh0PXttb2RhbENvbmZpcm1UZXh0fVxyXG4gICAgICAgIGNhbmNlbFRleHQ9e21vZGFsQ2FuY2VsVGV4dH1cclxuICAgICAgICBsb2FkaW5nVGV4dD17bW9kYWxMb2FkaW5nVGV4dH1cclxuICAgICAgICBzaG93Q2FuY2VsPXttb2RhbC5zaG93Q2FuY2VsfVxyXG4gICAgICAgIHNob3dDb25maXJtPXttb2RhbC5zaG93Q29uZmlybX1cclxuICAgICAgICBidXN5PXtidXN5fVxyXG4gICAgICAgIGVycm9yPXttb2RhbEVycm9yfVxyXG4gICAgICAgIHN0YXR1cz17c3RhdHVzfVxyXG4gICAgICAgIG9uQ29uZmlybT17aGFuZGxlTW9kYWxCdXR0b25Db25maXJtfVxyXG4gICAgICAgIG9uQ2FuY2VsPXtjbG9zZUNvbmZpcm19XHJcbiAgICAgIC8+XHJcbiAgICAgIHtzdGVwID09PSAxICYmIChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNlwiPlxyXG4gICAgICAgICAgPENsaWVudFNlYXJjaENvbWJvYm94XG4gICAgICAgICAgICB2YWx1ZT17c2VsZWN0ZWRDbGllbnR9XG4gICAgICAgICAgICBvblNlbGVjdGVkPXtzZXRTZWxlY3RlZENsaWVudH1cbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiVmlzaXRzX0NyZWF0ZV9TZWFyY2hDbGllbnRcIiwgXCJTZWFyY2ggY2xpZW50XCIpfVxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZEZvcm1hdChcIlZpc2l0c19DcmVhdGVfQ2xpZW50UGxhY2Vob2xkZXJcIiwgXCJUeXBlIGF0IGxlYXN0IHswfSBjaGFyYWN0ZXJzLi4uXCIsIDQpfVxuICAgICAgICAgICAgcG9ydGFsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcbiAgICAgICAgICAvPlxuXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktM1wiPlxyXG4gICAgICAgICAgICA8Q29udGFjdHNDb21ib2JveFxuICAgICAgICAgICAgICBhY2NvdW50TnVtPXtzZWxlY3RlZENsaWVudD8udmFsdWV9XG4gICAgICAgICAgICAgIHZhbHVlPXtzZWxlY3RlZENvbnRhY3RzfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17c2V0U2VsZWN0ZWRDb250YWN0c31cbiAgICAgICAgICAgICAgcG9ydGFsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICB7c2VsZWN0ZWRDb250YWN0cy5sZW5ndGggPiAwICYmIChcclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS02MDBcIj5cclxuICAgICAgICAgICAgICAgIHtpbmRGb3JtYXQoXCJWaXNpdHNfQ3JlYXRlX1NlbGVjdGVkQ29udGFjdHNDb3VudFwiLCBcInswfSBzZWxlY3RlZCBjb250YWN0KHMpXCIsIHNlbGVjdGVkQ29udGFjdHMubGVuZ3RoKX1cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApfVxyXG5cclxuICAgICAge3N0ZXAgPT09IDIgJiYgKFxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2hhZG93LXhzIGdsYXNzLXBhbmVsIHAtNCBzcGFjZS15LTQgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgcm91bmRlZC0yeGxcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1iYXNlIGZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS05MDAgYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTIwMCBwYi0zXCI+XHJcbiAgICAgICAgICAgIHtpbmRUKFwiVmlzaXRzX0NyZWF0ZV9WaXNpdERhdGFfVGl0bGVcIiwgXCJWaXNpdCBkZXRhaWxzXCIpfVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTIgZ2FwLTRcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ2aXNpdGEtZmllbGQtdGV4dFwiPlxyXG4gICAgICAgICAgICAgIDxTaW5nbGVEYXRlUGlja2VyIGxhYmVsPXtpbmRUKFwiVmlzaXRzX0RldGFpbF9EYXRlX0xhYmVsXCIsIFwiRGF0ZVwiKX0gdmFsdWU9e3RyYW5zRGF0ZX0gb25DaGFuZ2U9e3NldFRyYW5zRGF0ZX0gLz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxTZWxlY3RDb21ib2JveFxuICAgICAgICAgICAgICBsYWJlbD17aW5kVChcIlZpc2l0c19EZXRhaWxfVmlzaXRUeXBlX0xhYmVsXCIsIFwiVmlzaXQgdHlwZVwiKX1cbiAgICAgICAgICAgICAgb3B0aW9ucz17dmlzaXRUeXBlc31cbiAgICAgICAgICAgICAgdmFsdWU9e3Zpc2l0VHlwZX1cbiAgICAgICAgICAgICAgb25DaGFuZ2U9e3NldFZpc2l0VHlwZX1cbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJWaXNpdHNfRGV0YWlsX1Zpc2l0VHlwZV9QbGFjZWhvbGRlclwiLCBcIlNlbGVjdCB0eXBlXCIpfVxuICAgICAgICAgICAgICBpbnZhbGlkPXt2aXNpdFR5cGVJbnZhbGlkfVxuICAgICAgICAgICAgICBlbWl0T25WYWx1ZUNoYW5nZVxuICAgICAgICAgICAgICBwb3J0YWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgZ2FwLTNcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cclxuICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZm9ybS1sYWJlbCBmb250LXNlbWlib2xkXCI+e2luZFQoXCJWaXNpdHNfRmllbGRfRGVzY3JpcHRpb25cIiwgXCJEZXNjcmlwdGlvblwiKX08L2xhYmVsPlxyXG4gICAgICAgICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgICAgICAgaWQ9XCJkZXNjcmlwdGlvblwiXHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXHJcbiAgICAgICAgICAgICAgICAgIFwiZm9ybS1jb250cm9sXCIsXHJcbiAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uSW52YWxpZFxyXG4gICAgICAgICAgICAgICAgICAgID8gXCJib3JkZXItcm9zZS00MDAgYmctcm9zZS01MCBmb2N1czpyaW5nLXJvc2UtMjAwIGZvY3VzOmJvcmRlci1yb3NlLTQwMFwiXHJcbiAgICAgICAgICAgICAgICAgICAgOiBcImJvcmRlci1zbGF0ZS0yMDAgZm9jdXM6cmluZy1wcmltYXJ5IGZvY3VzOmJvcmRlci1wcmltYXJ5XCJcclxuICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICBtYXhMZW5ndGg9ezIwMH1cclxuICAgICAgICAgICAgICAgIHZhbHVlPXtkZXNjcmlwdGlvbn1cclxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0RGVzY3JpcHRpb24oZS50YXJnZXQudmFsdWUpfVxyXG4gICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMlwiPlxyXG4gICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb3JtLWxhYmVsIGZvbnQtc2VtaWJvbGRcIj57aW5kVChcIlZpc2l0c19GaWVsZF9Db21tZW50c1wiLCBcIkNvbW1lbnRzXCIpfTwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgPHRleHRhcmVhXHJcbiAgICAgICAgICAgICAgICBpZD1cImNvbWVudGFyaW9zXCJcclxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZm9ybS1jb250cm9sIGN1cnNvci1wb2ludGVyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY29tZW50YXJpb3NJbnZhbGlkXHJcbiAgICAgICAgICAgICAgICAgICAgICA/IFwiYm9yZGVyLXJvc2UtNDAwIGJnLXJvc2UtNTAgZm9jdXM6cmluZy1yb3NlLTIwMCBmb2N1czpib3JkZXItcm9zZS00MDBcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgOiBcImJvcmRlci1zbGF0ZS0yMDAgZm9jdXM6cmluZy1wcmltYXJ5IGZvY3VzOmJvcmRlci1wcmltYXJ5XCJcclxuICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgIHZhbHVlPXtjb21lbnRhcmlvc31cclxuICAgICAgICAgICAgICAgIHJlYWRPbmx5XHJcbiAgICAgICAgICAgICAgICBvblBvaW50ZXJEb3duPXtjb21lbnRhcmlvc1RhcC5vblBvaW50ZXJEb3dufVxyXG4gICAgICAgICAgICAgICAgb25Qb2ludGVyTW92ZT17Y29tZW50YXJpb3NUYXAub25Qb2ludGVyTW92ZX1cclxuICAgICAgICAgICAgICAgIG9uUG9pbnRlclVwPXtjb21lbnRhcmlvc1RhcC5vblBvaW50ZXJVcH1cclxuICAgICAgICAgICAgICAgIG9uUG9pbnRlckNhbmNlbD17Y29tZW50YXJpb3NUYXAub25Qb2ludGVyQ2FuY2VsfVxyXG4gICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cclxuICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZm9ybS1sYWJlbCBmb250LXNlbWlib2xkXCI+e2luZFQoXCJWaXNpdHNfRmllbGRfQmFja2dyb3VuZFwiLCBcIkJhY2tncm91bmRcIil9PC9sYWJlbD5cclxuICAgICAgICAgICAgICAgIDx0ZXh0YXJlYVxyXG4gICAgICAgICAgICAgICAgICBpZD1cImFudGVjZWRlbnRlc1wiXHJcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbCBjdXJzb3ItcG9pbnRlclwiXHJcbiAgICAgICAgICAgICAgICB2YWx1ZT17YW50ZWNlZGVudGVzfVxyXG4gICAgICAgICAgICAgICAgcmVhZE9ubHlcclxuICAgICAgICAgICAgICAgIG9uUG9pbnRlckRvd249e2FudGVjZWRlbnRlc1RhcC5vblBvaW50ZXJEb3dufVxyXG4gICAgICAgICAgICAgICAgb25Qb2ludGVyTW92ZT17YW50ZWNlZGVudGVzVGFwLm9uUG9pbnRlck1vdmV9XHJcbiAgICAgICAgICAgICAgICBvblBvaW50ZXJVcD17YW50ZWNlZGVudGVzVGFwLm9uUG9pbnRlclVwfVxyXG4gICAgICAgICAgICAgICAgb25Qb2ludGVyQ2FuY2VsPXthbnRlY2VkZW50ZXNUYXAub25Qb2ludGVyQ2FuY2VsfVxyXG4gICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMlwiPlxyXG4gICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb3JtLWxhYmVsIGZvbnQtc2VtaWJvbGRcIj57aW5kVChcIlZpc2l0c19GaWVsZF9Db25jbHVzaW9uc1wiLCBcIkNvbmNsdXNpb25zXCIpfTwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICA8dGV4dGFyZWFcclxuICAgICAgICAgICAgICAgICAgaWQ9XCJjb25jbHVzaW9uZXNcIlxyXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2wgY3Vyc29yLXBvaW50ZXJcIlxyXG4gICAgICAgICAgICAgICAgdmFsdWU9e2NvbmNsdXNpb25lc31cclxuICAgICAgICAgICAgICAgIHJlYWRPbmx5XHJcbiAgICAgICAgICAgICAgICBvblBvaW50ZXJEb3duPXtjb25jbHVzaW9uZXNUYXAub25Qb2ludGVyRG93bn1cclxuICAgICAgICAgICAgICAgIG9uUG9pbnRlck1vdmU9e2NvbmNsdXNpb25lc1RhcC5vblBvaW50ZXJNb3ZlfVxyXG4gICAgICAgICAgICAgICAgb25Qb2ludGVyVXA9e2NvbmNsdXNpb25lc1RhcC5vblBvaW50ZXJVcH1cclxuICAgICAgICAgICAgICAgIG9uUG9pbnRlckNhbmNlbD17Y29uY2x1c2lvbmVzVGFwLm9uUG9pbnRlckNhbmNlbH1cclxuICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTNcIj5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LXNsYXRlLTUwMFwiPntzdGF0dXN9PC9zcGFuPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICl9XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59XHJcblxyXG50eXBlIEVycm9yQm91bmRhcnlTdGF0ZSA9IHsgaGFzRXJyb3I6IGJvb2xlYW4gfTtcclxuXHJcbmNsYXNzIEVycm9yQm91bmRhcnkgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8UmVhY3QuUHJvcHNXaXRoQ2hpbGRyZW48e30+LCBFcnJvckJvdW5kYXJ5U3RhdGU+IHtcclxuICBjb25zdHJ1Y3Rvcihwcm9wczogUmVhY3QuUHJvcHNXaXRoQ2hpbGRyZW48e30+KSB7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcbiAgICB0aGlzLnN0YXRlID0geyBoYXNFcnJvcjogZmFsc2UgfTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBnZXREZXJpdmVkU3RhdGVGcm9tRXJyb3IoKSB7XHJcbiAgICByZXR1cm4geyBoYXNFcnJvcjogdHJ1ZSB9O1xyXG4gIH1cclxuXHJcbiAgY29tcG9uZW50RGlkQ2F0Y2goZXJyb3IsIGluZm8pIHtcclxuICB9XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIGlmICh0aGlzLnN0YXRlLmhhc0Vycm9yKSB7XHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTQgcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLXJvc2UtMjAwIGJnLXJvc2UtNTAgdGV4dC1yb3NlLTcwMFwiPlxyXG4gICAgICAgICAge2luZFQoXCJWaXNpdHNfQ3JlYXRlX0Vycm9yQm91bmRhcnlcIiwgXCJBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSByZW5kZXJpbmcgdGhlIHZpc2l0cyBwYWdlLiBSZWxvYWQgYW5kIHRyeSBhZ2Fpbi5cIil9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5jaGlsZHJlbjtcclxuICB9XHJcbn1cclxuXHJcbi8vIENyZWF0ZSBmbG93IFVJIHdyYXBwZWQgYnkgdGhlIGVycm9yIGJvdW5kYXJ5LlxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDcmVhdGVGb3JtKCkge1xyXG4gIHJldHVybiAoXHJcbiAgICA8RXJyb3JCb3VuZGFyeT5cclxuICAgICAgPFZpc2l0YXNBcHAgLz5cclxuICAgIDwvRXJyb3JCb3VuZGFyeT5cclxuICApO1xyXG59XG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgWE1hcmtJY29uIH0gZnJvbSBcIkBoZXJvaWNvbnMvcmVhY3QvMjAvc29saWRcIjtcbmltcG9ydCBGbG9hdGluZ0xpc3QgZnJvbSBcIi4uL2NvbW1vbnMvRmxvYXRpbmdMaXN0LnRzeFwiO1xuaW1wb3J0IFNwaW5uZXIgZnJvbSBcIi4uL2NvbW1vbnMvU3Bpbm5lci50c3hcIjtcbmltcG9ydCB7IENoZXZyb25Eb3duU3ZnLCBDaGV2cm9uVXBTdmcgfSBmcm9tIFwiLi4vY29tbW9ucy9jaGV2cm9ucy50c3hcIjtcbmltcG9ydCB7IGZldGNoSnNvbiB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XG5pbXBvcnQgeyB1c2VPdXRzaWRlQ2xpY2sgfSBmcm9tIFwiLi4vLi4vaG9va3MvdXNlT3V0c2lkZUNsaWNrLnRzXCI7XG5pbXBvcnQgeyBjbGFzc05hbWVzIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2NsYXNzTmFtZXMudHNcIjtcbmltcG9ydCB7IGluZEZvcm1hdCwgaW5kVCB9IGZyb20gXCIuLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgeyBpc05vRGF0YVJvdywgaXNOb0RhdGFUZXh0IH0gZnJvbSBcIi4uLy4uL3V0aWxzL25vRGF0YS50c1wiO1xuaW1wb3J0IHsgZ2V0Q2FjaGVkQ29udGFjdHMsIHNldENhY2hlZENvbnRhY3RzLCBnZXRTdG9yZWRTZWxlY3Rpb24sIHNldFN0b3JlZFNlbGVjdGlvbiwgY2xlYXJTdG9yZWRTZWxlY3Rpb24gfSBmcm9tIFwiLi4vLi4vdXRpbHMvdmlzaXRhc1N0b3JhZ2UudHNcIjtcblxudHlwZSBDb250YWN0T3B0aW9uID0ge1xuICB2YWx1ZTogc3RyaW5nO1xuICB0ZXh0OiBzdHJpbmc7XG4gIGNhcmdvOiBzdHJpbmc7XG4gIGVtcHJlc2E6IHN0cmluZztcbn07XG5cbnR5cGUgQ29udGFjdHNDb21ib2JveFByb3BzID0ge1xuICBhY2NvdW50TnVtPzogc3RyaW5nO1xuICB2YWx1ZT86IENvbnRhY3RPcHRpb25bXTtcbiAgb25DaGFuZ2U6ICh2YWx1ZTogQ29udGFjdE9wdGlvbltdKSA9PiB2b2lkO1xuICBwb3J0YWxDbGFzc05hbWU/OiBzdHJpbmc7XG4gIHBhbmVsQ2xhc3NOYW1lPzogc3RyaW5nO1xufTtcblxuLy8gTXVsdGktc2VsZWN0IGNvbnRhY3RzIGNvbWJvYm94IHRpZWQgdG8gdGhlIHNlbGVjdGVkIGNsaWVudC5cbmNvbnN0IENvbnRhY3RzQ29tYm9ib3ggPSAoeyBhY2NvdW50TnVtLCB2YWx1ZSA9IFtdLCBvbkNoYW5nZSwgcG9ydGFsQ2xhc3NOYW1lLCBwYW5lbENsYXNzTmFtZSB9OiBDb250YWN0c0NvbWJvYm94UHJvcHMpID0+IHtcbiAgY29uc3QgW3F1ZXJ5LCBzZXRRdWVyeV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW29wdGlvbnMsIHNldE9wdGlvbnNdID0gdXNlU3RhdGU8Q29udGFjdE9wdGlvbltdPihbXSk7XG4gIGNvbnN0IFtzZWxlY3RlZCwgc2V0U2VsZWN0ZWRdID0gdXNlU3RhdGU8Q29udGFjdE9wdGlvbltdPih2YWx1ZSk7XG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2xvYWRpbmdNb3JlLCBzZXRMb2FkaW5nTW9yZV0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtzdGF0dXMsIHNldFN0YXR1c10gPSB1c2VTdGF0ZShpbmRUKFwiVmlzaXRzX0NyZWF0ZV9TZWxlY3RDbGllbnRGaXJzdFwiLCBcIlNlbGVjdCBhIGNsaWVudCBmaXJzdC5cIikpO1xuICBjb25zdCBbaGFzTG9hZGVkLCBzZXRIYXNMb2FkZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbb3Blbiwgc2V0T3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtwYWdlLCBzZXRQYWdlXSA9IHVzZVN0YXRlKDEpO1xuICBjb25zdCBbaGFzTW9yZSwgc2V0SGFzTW9yZV0gPSB1c2VTdGF0ZSh0cnVlKTtcbiAgY29uc3QgW2Jsb2NraW5nLCBzZXRCbG9ja2luZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFthY3RpdmVJbmRleCwgc2V0QWN0aXZlSW5kZXhdID0gdXNlU3RhdGUoMCk7XG4gIGNvbnN0IGxpc3RSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgYm94UmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IGFib3J0UmVmID0gdXNlUmVmPEFib3J0Q29udHJvbGxlciB8IG51bGw+KG51bGwpO1xuICBjb25zdCBjb250YWluZXJSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgaW5wdXRSZWYgPSB1c2VSZWY8SFRNTElucHV0RWxlbWVudCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBsYXN0QWNjb3VudFJlZiA9IHVzZVJlZihhY2NvdW50TnVtIHx8IFwiXCIpO1xuICBjb25zdCBvbkNoYW5nZVJlZiA9IHVzZVJlZihvbkNoYW5nZSk7XG5cbiAgdXNlT3V0c2lkZUNsaWNrKFtjb250YWluZXJSZWYsIGxpc3RSZWZdLCAoKSA9PiBzZXRPcGVuKGZhbHNlKSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBvbkNoYW5nZVJlZi5jdXJyZW50ID0gb25DaGFuZ2U7XG4gIH0sIFtvbkNoYW5nZV0pO1xuXG4gIGNvbnN0IGlzU2FtZVNlbGVjdGlvbiA9IChhOiBDb250YWN0T3B0aW9uW10gPSBbXSwgYjogQ29udGFjdE9wdGlvbltdID0gW10pID0+IHtcbiAgICBpZiAoYS5sZW5ndGggIT09IGIubGVuZ3RoKSByZXR1cm4gZmFsc2U7XG4gICAgY29uc3QgYXMgPSBhLm1hcCgoeCkgPT4gU3RyaW5nKHgudmFsdWUpKS5zb3J0KCk7XG4gICAgY29uc3QgYnMgPSBiLm1hcCgoeCkgPT4gU3RyaW5nKHgudmFsdWUpKS5zb3J0KCk7XG4gICAgcmV0dXJuIGFzLmV2ZXJ5KCh2LCBpKSA9PiB2ID09PSBic1tpXSk7XG4gIH07XG5cbiAgLy8gU3luYyBpbnRlcm5hbCBzZWxlY3Rpb24gd2l0aCB0aGUgcHJvcCAoZHJhZnQvY2FjaGUgcmVzdG9yZSkuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFpc1NhbWVTZWxlY3Rpb24odmFsdWUgfHwgW10sIHNlbGVjdGVkKSkge1xuICAgICAgc2V0U2VsZWN0ZWQodmFsdWUgfHwgW10pO1xuICAgIH1cbiAgfSwgW3ZhbHVlXSk7XG5cbiAgY29uc3QgY2FuY2VsUGVuZGluZyA9ICgpID0+IHtcbiAgICBpZiAoYWJvcnRSZWYuY3VycmVudCkge1xuICAgICAgYWJvcnRSZWYuY3VycmVudC5hYm9ydCgpO1xuICAgICAgYWJvcnRSZWYuY3VycmVudCA9IG51bGw7XG4gICAgfVxuICB9O1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGlmIChhYm9ydFJlZi5jdXJyZW50KSB7XG4gICAgICAgIGFib3J0UmVmLmN1cnJlbnQuYWJvcnQoKTtcbiAgICAgICAgYWJvcnRSZWYuY3VycmVudCA9IG51bGw7XG4gICAgICB9XG4gICAgfTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IHByaW1lRnJvbUNhY2hlID0gKCkgPT4ge1xuICAgIGNvbnN0IGNhY2hlZCA9IGdldENhY2hlZENvbnRhY3RzKGFjY291bnROdW0pO1xuICAgIGlmIChjYWNoZWQpIHtcbiAgICAgIHNldE9wdGlvbnMoY2FjaGVkKTtcbiAgICAgIHNldEhhc0xvYWRlZCh0cnVlKTtcbiAgICAgIHNldEhhc01vcmUoY2FjaGVkLmxlbmd0aCA9PT0gMTApO1xuICAgICAgc2V0U3RhdHVzKFxuICAgICAgICBjYWNoZWQubGVuZ3RoXG4gICAgICAgICAgPyBpbmRGb3JtYXQoXCJWaXNpdHNfQ3JlYXRlX0NvbnRhY3RDb3VudENhY2hlXCIsIFwiezB9IGNvbnRhY3RzIChjYWNoZSlcIiwgY2FjaGVkLmxlbmd0aClcbiAgICAgICAgICA6IGluZFQoXCJWaXNpdHNfQ3JlYXRlX05vQ29udGFjdHNcIiwgXCJObyBjb250YWN0c1wiKVxuICAgICAgKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjYW5jZWxQZW5kaW5nKCk7XG4gICAgc2V0UXVlcnkoXCJcIik7XG4gICAgc2V0T3BlbihmYWxzZSk7XG4gICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgc2V0QmxvY2tpbmcoZmFsc2UpO1xuICAgIHNldExvYWRpbmdNb3JlKGZhbHNlKTtcbiAgICBzZXRBY3RpdmVJbmRleCgwKTtcbiAgICBzZXRQYWdlKDEpO1xuICAgIHNldEhhc01vcmUodHJ1ZSk7XG5cbiAgICBpZiAoIWFjY291bnROdW0pIHtcbiAgICAgIHNldE9wdGlvbnMoW10pO1xuICAgICAgc2V0U2VsZWN0ZWQoW10pO1xuICAgICAgb25DaGFuZ2VSZWYuY3VycmVudChbXSk7XG4gICAgICBzZXRTdGF0dXMoaW5kVChcIlZpc2l0c19DcmVhdGVfU2VsZWN0Q2xpZW50Rmlyc3RcIiwgXCJTZWxlY3QgYSBjbGllbnQgZmlyc3QuXCIpKTtcbiAgICAgIHNldEhhc0xvYWRlZChmYWxzZSk7XG4gICAgICBjbGVhclN0b3JlZFNlbGVjdGlvbihsYXN0QWNjb3VudFJlZi5jdXJyZW50KTtcbiAgICAgIGxhc3RBY2NvdW50UmVmLmN1cnJlbnQgPSBcIlwiO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGNoYW5nZWQgPSBsYXN0QWNjb3VudFJlZi5jdXJyZW50ICYmIGxhc3RBY2NvdW50UmVmLmN1cnJlbnQgIT09IGFjY291bnROdW07XG4gICAgaWYgKGNoYW5nZWQpIHtcbiAgICAgIHNldFNlbGVjdGVkKFtdKTtcbiAgICAgIG9uQ2hhbmdlUmVmLmN1cnJlbnQoW10pO1xuICAgICAgY2xlYXJTdG9yZWRTZWxlY3Rpb24obGFzdEFjY291bnRSZWYuY3VycmVudCk7XG4gICAgfVxuXG4gICAgY29uc3QgdXNlZENhY2hlID0gcHJpbWVGcm9tQ2FjaGUoKTtcbiAgICBpZiAoIXVzZWRDYWNoZSkge1xuICAgICAgc2V0T3B0aW9ucyhbXSk7XG4gICAgICBzZXRIYXNMb2FkZWQoZmFsc2UpO1xuICAgICAgc2V0U3RhdHVzKGluZFQoXCJWaXNpdHNfQ3JlYXRlX1ByZXNzQXJyb3dUb0xvYWRDb250YWN0c1wiLCBcIlByZXNzIEFycm93RG93biB0byBsb2FkIGNvbnRhY3RzLlwiKSk7XG4gICAgfVxuXG4gICAgY29uc3Qgc3RvcmVkU2VsZWN0aW9uID0gZ2V0U3RvcmVkU2VsZWN0aW9uKGFjY291bnROdW0pO1xuICAgIGlmIChzdG9yZWRTZWxlY3Rpb24ubGVuZ3RoICYmICF2YWx1ZT8ubGVuZ3RoKSB7XG4gICAgICBzZXRTZWxlY3RlZChzdG9yZWRTZWxlY3Rpb24pO1xuICAgICAgb25DaGFuZ2VSZWYuY3VycmVudChzdG9yZWRTZWxlY3Rpb24pO1xuICAgIH1cblxuICAgIGxhc3RBY2NvdW50UmVmLmN1cnJlbnQgPSBhY2NvdW50TnVtO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC1ob29rcy9leGhhdXN0aXZlLWRlcHNcbiAgfSwgW2FjY291bnROdW1dKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIG9uQ2hhbmdlUmVmLmN1cnJlbnQoc2VsZWN0ZWQpO1xuICAgIGlmIChhY2NvdW50TnVtKSBzZXRTdG9yZWRTZWxlY3Rpb24oYWNjb3VudE51bSwgc2VsZWN0ZWQpO1xuICB9LCBbc2VsZWN0ZWQsIGFjY291bnROdW1dKTtcblxuICBjb25zdCBtYXBDb250YWN0cyA9IChpdGVtczogdW5rbm93bltdID0gW10pID0+XG4gICAgaXRlbXNcbiAgICAgIC5tYXAoKGM6IGFueSkgPT4ge1xuICAgICAgICBpZiAoaXNOb0RhdGFSb3coYykpIHJldHVybiBudWxsO1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShjKSkgcmV0dXJuIG51bGw7XG4gICAgICAgIGNvbnN0IHJlY0lkID0gKGMucmVjSWQgfHwgYy5SZWNJZCB8fCBcIlwiKS50b1N0cmluZygpLnRyaW0oKTtcbiAgICAgICAgY29uc3QgbmFtZSA9IChjLm5hbWUgfHwgYy5OYW1lIHx8IFwiXCIpLnRvU3RyaW5nKCkudHJpbSgpO1xuICAgICAgICBjb25zdCBjYXJnbyA9IChjLmNhcmdvIHx8IGMuQ2FyZ28gfHwgXCJcIikudG9TdHJpbmcoKS50cmltKCk7XG4gICAgICAgIGNvbnN0IGVtcHJlc2EgPSAoYy5lbXByZXNhIHx8IGMuRW1wcmVzYSB8fCBcIlwiKS50b1N0cmluZygpLnRyaW0oKTtcbiAgICAgICAgaWYgKCFyZWNJZCB8fCBpc05vRGF0YVRleHQobmFtZSkpIHJldHVybiBudWxsO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHZhbHVlOiByZWNJZCxcbiAgICAgICAgICB0ZXh0OiBuYW1lLnRvVXBwZXJDYXNlKCksXG4gICAgICAgICAgY2FyZ286IGNhcmdvLnRvVXBwZXJDYXNlKCksXG4gICAgICAgICAgZW1wcmVzYTogZW1wcmVzYS50b1VwcGVyQ2FzZSgpLFxuICAgICAgICB9IGFzIENvbnRhY3RPcHRpb247XG4gICAgICB9KVxuICAgICAgLmZpbHRlcihCb29sZWFuKSBhcyBDb250YWN0T3B0aW9uW107XG5cbiAgY29uc3QgbG9hZCA9IGFzeW5jIChwYWdlVG9Mb2FkID0gMSwgYXBwZW5kID0gZmFsc2UpID0+IHtcbiAgICBpZiAoIWFjY291bnROdW0pIHJldHVybjtcbiAgICBpZiAobG9hZGluZyB8fCBsb2FkaW5nTW9yZSkgcmV0dXJuO1xuICAgIGNhbmNlbFBlbmRpbmcoKTtcblxuICAgIGlmICghYXBwZW5kKSB7XG4gICAgICBzZXRMb2FkaW5nKHRydWUpO1xuICAgICAgc2V0QmxvY2tpbmcodHJ1ZSk7XG4gICAgICBpZiAocGFnZVRvTG9hZCA9PT0gMSkgc2V0U3RhdHVzKGluZFQoXCJWaXNpdHNfQ3JlYXRlX0xvYWRpbmdDb250YWN0c1wiLCBcIkxvYWRpbmcgY29udGFjdHMuLi5cIikpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZXRMb2FkaW5nTW9yZSh0cnVlKTtcbiAgICAgIHNldEJsb2NraW5nKHRydWUpO1xuICAgIH1cblxuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XG4gICAgYWJvcnRSZWYuY3VycmVudCA9IGNvbnRyb2xsZXI7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoSnNvbihcbiAgICAgICAgYC9WaXNpdGFzL0dldENvbnRhY3RzRm9yRHJvcGRvd24/YWNjb3VudE51bT0ke2VuY29kZVVSSUNvbXBvbmVudChhY2NvdW50TnVtKX0mcGFnZT0ke3BhZ2VUb0xvYWR9JnBhZ2VTaXplPTEwYCxcbiAgICAgICAgeyBzaWduYWw6IGNvbnRyb2xsZXIuc2lnbmFsIH1cbiAgICAgICk7XG4gICAgICBjb25zdCBtYXBwZWQgPSBtYXBDb250YWN0cyhyZXMuaXRlbXMgfHwgW10pO1xuICAgICAgc2V0T3B0aW9ucygocHJldikgPT4ge1xuICAgICAgICBjb25zdCBuZXh0ID0gYXBwZW5kID8gWy4uLnByZXYsIC4uLm1hcHBlZF0gOiBtYXBwZWQ7XG4gICAgICAgIHNldENhY2hlZENvbnRhY3RzKGFjY291bnROdW0sIG5leHQpO1xuICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgIH0pO1xuICAgICAgc2V0SGFzTG9hZGVkKHRydWUpO1xuICAgICAgc2V0SGFzTW9yZShtYXBwZWQubGVuZ3RoID09PSAxMCk7XG4gICAgICBzZXRQYWdlKHBhZ2VUb0xvYWQpO1xuICAgICAgc2V0U3RhdHVzKG1hcHBlZC5sZW5ndGggPyBpbmRGb3JtYXQoXCJWaXNpdHNfQ3JlYXRlX0NvbnRhY3RDb3VudFwiLCBcInswfSBjb250YWN0c1wiLCBtYXBwZWQubGVuZ3RoKSA6IGluZFQoXCJWaXNpdHNfQ3JlYXRlX05vQ29udGFjdHNcIiwgXCJObyBjb250YWN0c1wiKSk7XG4gICAgfSBjYXRjaCB7XG4gICAgICBzZXRTdGF0dXMoaW5kVChcIlZpc2l0c19DcmVhdGVfTG9hZENvbnRhY3RzRXJyb3JcIiwgXCJGYWlsZWQgdG8gbG9hZCBjb250YWN0cy5cIikpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBhYm9ydFJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgICAgc2V0TG9hZGluZ01vcmUoZmFsc2UpO1xuICAgICAgc2V0QmxvY2tpbmcoZmFsc2UpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBlbnN1cmVMb2FkZWQgPSAoKSA9PiB7XG4gICAgaWYgKCFhY2NvdW50TnVtKSByZXR1cm47XG4gICAgaWYgKGhhc0xvYWRlZCAmJiBvcHRpb25zLmxlbmd0aCkgcmV0dXJuO1xuICAgIGlmIChwcmltZUZyb21DYWNoZSgpKSByZXR1cm47XG4gICAgbG9hZCgxLCBmYWxzZSk7XG4gIH07XG5cbiAgY29uc3QgbG9hZE1vcmVDb250YWN0cyA9IFJlYWN0LnVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoIWFjY291bnROdW0gfHwgIWhhc01vcmUgfHwgbG9hZGluZ01vcmUgfHwgbG9hZGluZykgcmV0dXJuO1xuICAgIGxvYWQocGFnZSArIDEsIHRydWUpO1xuICB9LCBbYWNjb3VudE51bSwgaGFzTW9yZSwgbG9hZGluZ01vcmUsIGxvYWRpbmcsIHBhZ2VdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghb3BlbiB8fCAhbGlzdFJlZi5jdXJyZW50KSByZXR1cm47XG4gICAgY29uc3QgZWwgPSBsaXN0UmVmLmN1cnJlbnQ7XG4gICAgY29uc3Qgb25TY3JvbGwgPSAoKSA9PiB7XG4gICAgICBpZiAoZWwuc2Nyb2xsVG9wICsgZWwuY2xpZW50SGVpZ2h0ID49IGVsLnNjcm9sbEhlaWdodCAtIDgpIGxvYWRNb3JlQ29udGFjdHMoKTtcbiAgICB9O1xuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgb25TY3JvbGwsIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcbiAgICByZXR1cm4gKCkgPT4gZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBvblNjcm9sbCk7XG4gIH0sIFtvcGVuLCBsb2FkTW9yZUNvbnRhY3RzXSk7XG5cbiAgY29uc3Qgc2VsZWN0ZWRWYWx1ZXMgPSB1c2VNZW1vKCgpID0+IHtcbiAgICByZXR1cm4gbmV3IFNldCgoc2VsZWN0ZWQgfHwgW10pLm1hcCgocykgPT4gU3RyaW5nKHMudmFsdWUpKSk7XG4gIH0sIFtzZWxlY3RlZF0pO1xuXG4gIGNvbnN0IGF2YWlsYWJsZU9wdGlvbnMgPSB1c2VNZW1vKCgpID0+IHtcbiAgICAvLyBIaWRlIGFscmVhZHkgc2VsZWN0ZWQgY29udGFjdHMgZnJvbSB0aGUgZHJvcGRvd24gbGlzdC5cbiAgICByZXR1cm4gKG9wdGlvbnMgfHwgW10pLmZpbHRlcigobykgPT4gIXNlbGVjdGVkVmFsdWVzLmhhcyhTdHJpbmcoby52YWx1ZSkpKTtcbiAgfSwgW29wdGlvbnMsIHNlbGVjdGVkVmFsdWVzXSk7XG5cbiAgY29uc3QgZmlsdGVyZWQgPSB1c2VNZW1vKCgpID0+IHtcbiAgICBjb25zdCBxID0gcXVlcnkudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKCFxKSByZXR1cm4gYXZhaWxhYmxlT3B0aW9ucztcbiAgICBjb25zdCBmID0gYXZhaWxhYmxlT3B0aW9ucy5maWx0ZXIoXG4gICAgICAobykgPT4gby50ZXh0LnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMocSkgfHwgby5jYXJnby50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHEpIHx8IG8uZW1wcmVzYS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHEpXG4gICAgKTtcbiAgICByZXR1cm4gZi5sZW5ndGggPyBmIDogYXZhaWxhYmxlT3B0aW9ucztcbiAgfSwgW2F2YWlsYWJsZU9wdGlvbnMsIHF1ZXJ5XSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBzZXRBY3RpdmVJbmRleCgwKTtcbiAgfSwgW2ZpbHRlcmVkLmxlbmd0aCwgcXVlcnldKTtcblxuICBjb25zdCB0b2dnbGVPcHRpb24gPSAob3B0OiBDb250YWN0T3B0aW9uKSA9PiB7XG4gICAgc2V0U2VsZWN0ZWQoKHByZXYpID0+IHtcbiAgICAgIGNvbnN0IGV4aXN0cyA9IHByZXYuc29tZSgocCkgPT4gcC52YWx1ZSA9PT0gb3B0LnZhbHVlKTtcbiAgICAgIGlmIChleGlzdHMpIHJldHVybiBwcmV2LmZpbHRlcigocCkgPT4gcC52YWx1ZSAhPT0gb3B0LnZhbHVlKTtcbiAgICAgIHJldHVybiBbLi4ucHJldiwgb3B0XTtcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVLZXlEb3duID0gKGV2OiBSZWFjdC5LZXlib2FyZEV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+KSA9PiB7XG4gICAgaWYgKGV2LmtleSA9PT0gXCJBcnJvd0Rvd25cIikge1xuICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHNldE9wZW4odHJ1ZSk7XG4gICAgICBlbnN1cmVMb2FkZWQoKTtcbiAgICAgIGlmIChmaWx0ZXJlZC5sZW5ndGgpIHNldEFjdGl2ZUluZGV4KChpZHgpID0+IChpZHggKyAxKSAlIGZpbHRlcmVkLmxlbmd0aCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChldi5rZXkgPT09IFwiQXJyb3dVcFwiKSB7XG4gICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgc2V0T3Blbih0cnVlKTtcbiAgICAgIGVuc3VyZUxvYWRlZCgpO1xuICAgICAgaWYgKGZpbHRlcmVkLmxlbmd0aCkgc2V0QWN0aXZlSW5kZXgoKGlkeCkgPT4gKGlkeCAtIDEgKyBmaWx0ZXJlZC5sZW5ndGgpICUgZmlsdGVyZWQubGVuZ3RoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGV2LmtleSA9PT0gXCJFbnRlclwiKSB7XG4gICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgaWYgKG9wZW4gJiYgZmlsdGVyZWQubGVuZ3RoKSB7XG4gICAgICAgIHRvZ2dsZU9wdGlvbihmaWx0ZXJlZFthY3RpdmVJbmRleF0gPz8gZmlsdGVyZWRbMF0pO1xuICAgICAgfSBlbHNlIGlmIChhY2NvdW50TnVtKSB7XG4gICAgICAgIGVuc3VyZUxvYWRlZCgpO1xuICAgICAgICBzZXRPcGVuKHRydWUpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZXYua2V5ID09PSBcIkVzY2FwZVwiKSBzZXRPcGVuKGZhbHNlKTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yXCIgcmVmPXtjb250YWluZXJSZWZ9PlxuICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZFwiPntpbmRUKFwiVmlzaXRzX0NyZWF0ZV9TZWFyY2hDb250YWN0XCIsIFwiU2VhcmNoIGNvbnRhY3RcIil9PC9sYWJlbD5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmVcIj5cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICByZWY9e2JveFJlZn1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInJlbGF0aXZlIHctZnVsbCBjdXJzb3ItZGVmYXVsdCByb3VuZGVkLVs1cHhdIGJvcmRlci1zbGF0ZS0zMDAgYmctd2hpdGUgdGV4dC1sZWZ0IHNoYWRvdy14cyBmb2N1cy13aXRoaW46Ym9yZGVyLXByaW1hcnkgZm9jdXMtd2l0aGluOnJpbmctMiBmb2N1cy13aXRoaW46cmluZy1wcmltYXJ5IGZvY3VzLXdpdGhpbjpyaW5nLW9mZnNldC0wIHNtOnRleHQtc21cIlxuICAgICAgICAgID5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC13cmFwIGdhcC0xIHB4LTMgcHktMiBtaW4taC0xMFwiPlxuICAgICAgICAgICAge3NlbGVjdGVkLm1hcCgoYykgPT4gKFxuICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgIGtleT17Yy52YWx1ZX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSByb3VuZGVkLW1kIGJnLXByaW1hcnkvMTAgdGV4dC1zbGF0ZS03MDAgcHgtMiBweS0xIHRleHQteHNcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge2MudGV4dH1cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFNlbGVjdGVkKChwcmV2KSA9PiBwcmV2LmZpbHRlcigocykgPT4gcy52YWx1ZSAhPT0gYy52YWx1ZSkpfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS03MDAgaG92ZXI6dGV4dC1zbGF0ZS03MDAvODBcIlxuICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17aW5kVChcIkNvbW1vbl9EZWxldGVcIiwgXCJEZWxldGVcIil9XG4gICAgICAgICAgICAgICAgICB0aXRsZT17aW5kVChcIkNvbW1vbl9EZWxldGVcIiwgXCJEZWxldGVcIil9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPFhNYXJrSWNvbiBjbGFzc05hbWU9XCJoLTQgdy00XCIgLz5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleC0xIG1pbi13LTMwIGJnLXRyYW5zcGFyZW50IHRleHQtc20gc206dGV4dC1iYXNlIGxlYWRpbmctNSB0ZXh0LXNsYXRlLTkwMCBib3JkZXItbm9uZSBvdXRsaW5lLWhpZGRlbiBweC0xIHB5LTEgZm9jdXM6cmluZy0wIGZvY3VzOmJvcmRlci10cmFuc3BhcmVudFwiXG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IHNldFF1ZXJ5KGV2ZW50LnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgIG9uS2V5RG93bj17aGFuZGxlS2V5RG93bn1cbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e3NlbGVjdGVkLmxlbmd0aCA/IFwiXCIgOiBpbmRUKFwiVmlzaXRzX0NyZWF0ZV9GaWx0ZXJQbGFjZWhvbGRlclwiLCBcIlR5cGUgdG8gZmlsdGVyLi4uXCIpfVxuICAgICAgICAgICAgICByZWY9e2lucHV0UmVmfVxuICAgICAgICAgICAgICByZWFkT25seT17IWFjY291bnROdW19XG4gICAgICAgICAgICAgIG9uRm9jdXM9eygpID0+IHtcbiAgICAgICAgICAgICAgICBlbnN1cmVMb2FkZWQoKTtcbiAgICAgICAgICAgICAgICBzZXRPcGVuKHRydWUpO1xuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIHsobG9hZGluZyB8fCBibG9ja2luZykgJiYgKFxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC15LTAgcmlnaHQtOSBmbGV4IGl0ZW1zLWNlbnRlclwiPlxuICAgICAgICAgICAgICAgIDxTcGlubmVyIC8+XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC15LTAgcmlnaHQtMCBmbGV4IGl0ZW1zLWNlbnRlciBwci0yIHRleHQtc2xhdGUtNTAwIGhvdmVyOnRleHQtc2xhdGUtNjAwXCJcbiAgICAgICAgICAgIGFyaWEtbGFiZWw9e29wZW4gPyBpbmRUKFwiRHJvcGRvd25fSGlkZU9wdGlvbnNcIiwgXCJIaWRlIG9wdGlvbnNcIikgOiBpbmRUKFwiRHJvcGRvd25fU2hvd09wdGlvbnNcIiwgXCJTaG93IG9wdGlvbnNcIil9XG4gICAgICAgICAgICBhcmlhLWV4cGFuZGVkPXtvcGVufVxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoIWFjY291bnROdW0pIHJldHVybjtcbiAgICAgICAgICAgICAgaWYgKG9wZW4pIHtcbiAgICAgICAgICAgICAgICBzZXRPcGVuKGZhbHNlKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBlbnN1cmVMb2FkZWQoKTtcbiAgICAgICAgICAgICAgICBzZXRPcGVuKHRydWUpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtvcGVuID8gPENoZXZyb25VcFN2ZyBjbGFzc05hbWU9XCJoLTUgdy01XCIgLz4gOiA8Q2hldnJvbkRvd25TdmcgY2xhc3NOYW1lPVwiaC01IHctNVwiIC8+fVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8RmxvYXRpbmdMaXN0XG4gICAgICAgICAgICBhbmNob3JSZWY9e2JveFJlZn1cbiAgICAgICAgICAgIG9wZW49e29wZW59XG4gICAgICAgICAgICB6SW5kZXg9ezM4MDAwMH1cbiAgICAgICAgICAgIG1heEhlaWdodENsYXNzPVwibWF4LWgtNzJcIlxuICAgICAgICAgICAgcm9sZT1cImxpc3Rib3hcIlxuICAgICAgICAgICAgcm91bmRlZENsYXNzPVwicm91bmRlZC1bNXB4XVwiXG4gICAgICAgICAgICBwb3J0YWxDbGFzc05hbWU9e3BvcnRhbENsYXNzTmFtZX1cbiAgICAgICAgICAgIHBhbmVsQ2xhc3NOYW1lPXtwYW5lbENsYXNzTmFtZX1cbiAgICAgICAgICA+XG4gICAgICAgICAgPGRpdiByZWY9e2xpc3RSZWZ9IGFyaWEtbXVsdGlzZWxlY3RhYmxlPVwidHJ1ZVwiPlxuICAgICAgICAgICAge2xvYWRpbmcgJiYgKFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHB4LTQgcHktMiB0ZXh0LXNtIHRleHQtc2xhdGUtNTAwXCI+XG4gICAgICAgICAgICAgICAgPFNwaW5uZXIgc2l6ZT1cImgtNCB3LTRcIiAvPlxuICAgICAgICAgICAgICAgIHtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICB7IWxvYWRpbmcgJiYgb3B0aW9ucy5sZW5ndGggPT09IDAgJiYgKFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB4LTQgcHktMiB0ZXh0LXNtIHRleHQtc2xhdGUtNTAwXCI+XG4gICAgICAgICAgICAgICAge2hhc0xvYWRlZCA/IGluZFQoXCJWaXNpdHNfQ3JlYXRlX05vQ29udGFjdHNcIiwgXCJObyBjb250YWN0c1wiKSA6IGluZFQoXCJWaXNpdHNfQ3JlYXRlX1NlbGVjdENsaWVudEZpcnN0XCIsIFwiU2VsZWN0IGEgY2xpZW50IGZpcnN0LlwiKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgeyFsb2FkaW5nICYmIG9wdGlvbnMubGVuZ3RoID4gMCAmJiBmaWx0ZXJlZC5sZW5ndGggPT09IDAgJiYgKFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB4LTQgcHktMiB0ZXh0LXNtIHRleHQtc2xhdGUtNTAwXCI+XG4gICAgICAgICAgICAgICAge3F1ZXJ5LnRyaW0oKSA/IGluZFQoXCJWaXNpdHNfQ3JlYXRlX05vTWF0Y2hlc1wiLCBcIk5vIG1hdGNoZXNcIikgOiBpbmRUKFwiVmlzaXRzX0NyZWF0ZV9Ob01vcmVDb250YWN0c1wiLCBcIk5vIG1vcmUgY29udGFjdHMgYXZhaWxhYmxlXCIpfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICB7IWxvYWRpbmcgJiZcbiAgICAgICAgICAgICAgZmlsdGVyZWQubWFwKChvcHQsIGlkeCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNlbCA9IHNlbGVjdGVkLnNvbWUoKHMpID0+IHMudmFsdWUgPT09IG9wdC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgY29uc3QgaXNBY3RpdmUgPSBpZHggPT09IGFjdGl2ZUluZGV4O1xuICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICBrZXk9e29wdC52YWx1ZX1cbiAgICAgICAgICAgICAgICAgICAgcm9sZT1cIm9wdGlvblwiXG4gICAgICAgICAgICAgICAgICAgIGFyaWEtc2VsZWN0ZWQ9e3NlbH1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAgICAgICAgICAgICAgIFwicmVsYXRpdmUgZmxleCB3LWZ1bGwgY3Vyc29yLWRlZmF1bHQgc2VsZWN0LW5vbmUgaXRlbXMtc3RhcnQgcHktMiBweC0zIHRleHQtbGVmdCB0ZXh0LXNtXCIsXG4gICAgICAgICAgICAgICAgICAgICAgaXNBY3RpdmUgPyBcImJnLXByaW1hcnkgdGV4dC13aGl0ZVwiIDogc2VsID8gXCJiZy1wcmltYXJ5LzEwIHRleHQtcHJpbWFyeVwiIDogXCJ0ZXh0LXNsYXRlLTkwMFwiXG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgIG9uTW91c2VFbnRlcj17KCkgPT4gc2V0QWN0aXZlSW5kZXgoaWR4KX1cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gdG9nZ2xlT3B0aW9uKG9wdCl9XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgZmxleCBmbGV4LWNvbCBnYXAtMC41IHByLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXCJibG9jayB0cnVuY2F0ZVwiLCBzZWwgPyBcImZvbnQtbWVkaXVtXCIgOiBcImZvbnQtbm9ybWFsXCIpfT57b3B0LnRleHR9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImJsb2NrIHRleHQteHMgdGV4dC1zbGF0ZS02MDAgdHJ1bmNhdGVcIj57b3B0LmNhcmdvfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIHtibG9ja2luZyAmJiAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCB6LTcwMDAwIGJnLXdoaXRlLzcwIGJhY2tkcm9wLWJsdXItWzFweF0gZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcm91bmRlZC1bNXB4XVwiPlxuICAgICAgICAgICAgICAgIDxTcGlubmVyIHNpemU9XCJoLTYgdy02XCIgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvRmxvYXRpbmdMaXN0PlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBmbGV4IGp1c3RpZnktZW5kXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS01MDAgdGVjaC1pbmZvXCI+e3N0YXR1c308L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbnRhY3RzQ29tYm9ib3g7XG4iLCAiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5mdW5jdGlvbiBYTWFya0ljb24oe1xuICB0aXRsZSxcbiAgdGl0bGVJZCxcbiAgLi4ucHJvcHNcbn0sIHN2Z1JlZikge1xuICByZXR1cm4gLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzdmdcIiwgT2JqZWN0LmFzc2lnbih7XG4gICAgeG1sbnM6IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIixcbiAgICB2aWV3Qm94OiBcIjAgMCAyMCAyMFwiLFxuICAgIGZpbGw6IFwiY3VycmVudENvbG9yXCIsXG4gICAgXCJhcmlhLWhpZGRlblwiOiBcInRydWVcIixcbiAgICBcImRhdGEtc2xvdFwiOiBcImljb25cIixcbiAgICByZWY6IHN2Z1JlZixcbiAgICBcImFyaWEtbGFiZWxsZWRieVwiOiB0aXRsZUlkXG4gIH0sIHByb3BzKSwgdGl0bGUgPyAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChcInRpdGxlXCIsIHtcbiAgICBpZDogdGl0bGVJZFxuICB9LCB0aXRsZSkgOiBudWxsLCAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChcInBhdGhcIiwge1xuICAgIGQ6IFwiTTYuMjggNS4yMmEuNzUuNzUgMCAwIDAtMS4wNiAxLjA2TDguOTQgMTBsLTMuNzIgMy43MmEuNzUuNzUgMCAxIDAgMS4wNiAxLjA2TDEwIDExLjA2bDMuNzIgMy43MmEuNzUuNzUgMCAxIDAgMS4wNi0xLjA2TDExLjA2IDEwbDMuNzItMy43MmEuNzUuNzUgMCAwIDAtMS4wNi0xLjA2TDEwIDguOTQgNi4yOCA1LjIyWlwiXG4gIH0pKTtcbn1cbmNvbnN0IEZvcndhcmRSZWYgPSAvKiNfX1BVUkVfXyovIFJlYWN0LmZvcndhcmRSZWYoWE1hcmtJY29uKTtcbmV4cG9ydCBkZWZhdWx0IEZvcndhcmRSZWY7IiwgImltcG9ydCB7IHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi91dGlscy9pbmRJMThuLnRzXCI7XG5cbmV4cG9ydCBjb25zdCB1c2VUb3BiYXIgPSAoXG4gIHN0ZXA6IG51bWJlcixcbiAgY2FuR29OZXh0OiBib29sZWFuLFxuICBvbk5leHQ6ICgpID0+IHZvaWQsXG4gIG9uUHJldjogKCkgPT4gdm9pZCxcbiAgYnVzeSA9IGZhbHNlLFxuICBjYW5TdWJtaXRTdGVwMiA9IHRydWUsXG4gIGNhbkFjY2VzcyA9IHRydWVcbikgPT4ge1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGZvcndhcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdsb2JhbEZvcndhcmRCdG5cIikgYXMgSFRNTEJ1dHRvbkVsZW1lbnQgfCBudWxsO1xuICAgIGNvbnN0IGJhY2sgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdsb2JhbEJhY2tCdG5cIikgYXMgSFRNTEJ1dHRvbkVsZW1lbnQgfCBudWxsO1xuICAgIGNvbnN0IGZvcndhcmRJY29uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnbG9iYWxGb3J3YXJkSWNvblwiKTtcbiAgICBjb25zdCBjcmVhdGVJY29uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnbG9iYWxDcmVhdGVJY29uXCIpO1xuXG4gICAgaWYgKGZvcndhcmQpIHtcbiAgICAgIGNvbnN0IGlzU3RlcDIgPSBzdGVwID09PSAyO1xuICAgICAgY29uc3Qgc2hvd0ZvcndhcmQgPSBjYW5BY2Nlc3MgJiYgKGlzU3RlcDIgfHwgKHN0ZXAgPT09IDEgJiYgY2FuR29OZXh0KSk7XG4gICAgICBmb3J3YXJkLnN0eWxlLnZpc2liaWxpdHkgPSBzaG93Rm9yd2FyZCA/IFwidmlzaWJsZVwiIDogXCJoaWRkZW5cIjtcbiAgICAgIGZvcndhcmQuZGlzYWJsZWQgPSAhc2hvd0ZvcndhcmQgfHwgYnVzeTtcbiAgICAgIGZvcndhcmQub25jbGljayA9IHNob3dGb3J3YXJkID8gKCkgPT4gb25OZXh0KCkgOiBudWxsO1xuICAgICAgZm9yd2FyZC5zZXRBdHRyaWJ1dGUoXG4gICAgICAgIFwiYXJpYS1sYWJlbFwiLFxuICAgICAgICBpc1N0ZXAyID8gaW5kVChcIkNvbW1vbl9DcmVhdGVcIiwgXCJDcmVhdGVcIikgOiBpbmRUKFwiQ29tbW9uX05leHRcIiwgXCJOZXh0XCIpXG4gICAgICApO1xuICAgICAgZm9yd2FyZC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWRpc2FibGVkXCIsIGlzU3RlcDIgJiYgIWNhblN1Ym1pdFN0ZXAyID8gXCJ0cnVlXCIgOiBcImZhbHNlXCIpO1xuICAgICAgZm9yd2FyZC5jbGFzc0xpc3QudG9nZ2xlKFwib3BhY2l0eS01MFwiLCBpc1N0ZXAyICYmICFjYW5TdWJtaXRTdGVwMik7XG4gICAgICBmb3J3YXJkLmNsYXNzTGlzdC50b2dnbGUoXCJjdXJzb3Itbm90LWFsbG93ZWRcIiwgaXNTdGVwMiAmJiAhY2FuU3VibWl0U3RlcDIpO1xuXG4gICAgICBpZiAoZm9yd2FyZEljb24gJiYgY3JlYXRlSWNvbikge1xuICAgICAgICBpZiAoaXNTdGVwMikge1xuICAgICAgICAgIGZvcndhcmRJY29uLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICAgICAgY3JlYXRlSWNvbi5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGZvcndhcmRJY29uLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gICAgICAgICAgY3JlYXRlSWNvbi5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChiYWNrKSB7XG4gICAgICBjb25zdCBzaG93QmFjayA9IGNhbkFjY2VzcyAmJiBzdGVwID09PSAyO1xuICAgICAgYmFjay5zdHlsZS52aXNpYmlsaXR5ID0gc2hvd0JhY2sgPyBcInZpc2libGVcIiA6IFwiaGlkZGVuXCI7XG4gICAgICBiYWNrLmRpc2FibGVkID0gIXNob3dCYWNrIHx8IGJ1c3k7XG4gICAgICBiYWNrLm9uY2xpY2sgPSBzaG93QmFjayA/ICgpID0+IG9uUHJldigpIDogbnVsbDtcbiAgICB9XG4gIH0sIFtzdGVwLCBjYW5Hb05leHQsIG9uTmV4dCwgb25QcmV2LCBidXN5LCBjYW5TdWJtaXRTdGVwMiwgY2FuQWNjZXNzXSk7XG59O1xuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZVJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgc2hvd0dsb2JhbFNwaW5uZXIsIGhpZGVHbG9iYWxTcGlubmVyIH0gZnJvbSBcIi4uL3V0aWxzL2dsb2JhbFNwaW5uZXIudHNcIjtcbmltcG9ydCB7XG4gIENSRUFURV9GUkVTSF9QQVJBTSxcbiAgVklTSVRfRFJBRlRfS0VZLFxuICBDT05UQUNUU19TVE9SQUdFX0tFWSxcbiAgQ09OVEFDVFNfU0VMRUNUSU9OX0tFWSxcbiAgY2xlYXJDcmVhdGVTZWxlY3Rpb25DYWNoZSxcbiAgc3RyaXBGcmVzaFBhcmFtLFxufSBmcm9tIFwiLi4vdXRpbHMvdmlzaXRhc1N0b3JhZ2UudHNcIjtcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuXG50eXBlIERyYWZ0U25hcHNob3QgPSB7XG4gIHNlbGVjdGVkQ2xpZW50OiBhbnk7XG4gIHNlbGVjdGVkQ29udGFjdHM6IGFueVtdO1xuICB2aXNpdFR5cGU6IHN0cmluZztcbiAgdHJhbnNEYXRlOiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIGNvbWVudGFyaW9zOiBzdHJpbmc7XG4gIGFudGVjZWRlbnRlczogc3RyaW5nO1xuICBjb25jbHVzaW9uZXM6IHN0cmluZztcbiAgc3RlcDogbnVtYmVyO1xufTtcblxudHlwZSBVc2VDcmVhdGVEcmFmdEFyZ3MgPSB7XG4gIGRyYWZ0U25hcHNob3Q6IERyYWZ0U25hcHNob3Q7XG4gIHNldFNlbGVjdGVkQ2xpZW50OiAodmFsdWU6IGFueSkgPT4gdm9pZDtcbiAgc2V0U2VsZWN0ZWRDb250YWN0czogKHZhbHVlOiBhbnlbXSkgPT4gdm9pZDtcbiAgc2V0VmlzaXRUeXBlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgc2V0VHJhbnNEYXRlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgc2V0RGVzY3JpcHRpb246ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBzZXRDb21lbnRhcmlvczogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHNldEFudGVjZWRlbnRlczogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHNldENvbmNsdXNpb25lczogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHNldFN0ZXA6ICh2YWx1ZTogbnVtYmVyKSA9PiB2b2lkO1xufTtcblxuLy8gSGFuZGxlcyB2aXNpdC1jcmVhdGUgZHJhZnQgc2F2ZS9yZXN0b3JlIGxpZmVjeWNsZS5cbmV4cG9ydCBjb25zdCB1c2VDcmVhdGVEcmFmdCA9ICh7XG4gIGRyYWZ0U25hcHNob3QsXG4gIHNldFNlbGVjdGVkQ2xpZW50LFxuICBzZXRTZWxlY3RlZENvbnRhY3RzLFxuICBzZXRWaXNpdFR5cGUsXG4gIHNldFRyYW5zRGF0ZSxcbiAgc2V0RGVzY3JpcHRpb24sXG4gIHNldENvbWVudGFyaW9zLFxuICBzZXRBbnRlY2VkZW50ZXMsXG4gIHNldENvbmNsdXNpb25lcyxcbiAgc2V0U3RlcCxcbn06IFVzZUNyZWF0ZURyYWZ0QXJncykgPT4ge1xuICBjb25zdCBkcmFmdFJlc3RvcmVkUmVmID0gdXNlUmVmKGZhbHNlKTtcbiAgY29uc3QgZHJhZnRQZXJzaXN0VGltZXJSZWYgPSB1c2VSZWY8bnVtYmVyIHwgbnVsbD4obnVsbCk7XG5cbiAgY29uc3QgcGVyc2lzdERyYWZ0U25hcHNob3QgPSB1c2VDYWxsYmFjaygoZHJhZnQ6IERyYWZ0U25hcHNob3QpID0+IHtcbiAgICB0cnkge1xuICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShWSVNJVF9EUkFGVF9LRVksIEpTT04uc3RyaW5naWZ5KGRyYWZ0KSk7XG4gICAgfSBjYXRjaCB7XG4gICAgICAvLyBJZ25vcmUgc3RvcmFnZSBxdW90YSBlcnJvcnMuXG4gICAgfVxuICB9LCBbXSk7XG5cbiAgY29uc3QgcGVyc2lzdERyYWZ0Tm93ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIHBlcnNpc3REcmFmdFNuYXBzaG90KGRyYWZ0U25hcHNob3QpO1xuICB9LCBbZHJhZnRTbmFwc2hvdCwgcGVyc2lzdERyYWZ0U25hcHNob3RdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghZHJhZnRSZXN0b3JlZFJlZi5jdXJyZW50KSByZXR1cm47XG5cbiAgICBpZiAoZHJhZnRQZXJzaXN0VGltZXJSZWYuY3VycmVudCkge1xuICAgICAgY2xlYXJUaW1lb3V0KGRyYWZ0UGVyc2lzdFRpbWVyUmVmLmN1cnJlbnQpO1xuICAgIH1cblxuICAgIGRyYWZ0UGVyc2lzdFRpbWVyUmVmLmN1cnJlbnQgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBkcmFmdFBlcnNpc3RUaW1lclJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICAgIHBlcnNpc3REcmFmdFNuYXBzaG90KGRyYWZ0U25hcHNob3QpO1xuICAgIH0sIDE4MCk7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgaWYgKGRyYWZ0UGVyc2lzdFRpbWVyUmVmLmN1cnJlbnQpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KGRyYWZ0UGVyc2lzdFRpbWVyUmVmLmN1cnJlbnQpO1xuICAgICAgICBkcmFmdFBlcnNpc3RUaW1lclJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9O1xuICB9LCBbZHJhZnRTbmFwc2hvdCwgcGVyc2lzdERyYWZ0U25hcHNob3RdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGxldCBmcmVzaExvYWQgPSBmYWxzZTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgdXJsID0gbmV3IFVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XG4gICAgICBmcmVzaExvYWQgPSB1cmwuc2VhcmNoUGFyYW1zLmhhcyhDUkVBVEVfRlJFU0hfUEFSQU0pO1xuICAgIH0gY2F0Y2gge1xuICAgICAgZnJlc2hMb2FkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKGZyZXNoTG9hZCkge1xuICAgICAgY2xlYXJDcmVhdGVTZWxlY3Rpb25DYWNoZSgpO1xuICAgICAgc3RyaXBGcmVzaFBhcmFtKCk7XG4gICAgICBkcmFmdFJlc3RvcmVkUmVmLmN1cnJlbnQgPSB0cnVlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBzaG91bGRTaG93ID0gZmFsc2U7XG4gICAgdHJ5IHtcbiAgICAgIHNob3VsZFNob3cgPSAhIShcbiAgICAgICAgc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShWSVNJVF9EUkFGVF9LRVkpIHx8XG4gICAgICAgIHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oQ09OVEFDVFNfU1RPUkFHRV9LRVkpIHx8XG4gICAgICAgIHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oQ09OVEFDVFNfU0VMRUNUSU9OX0tFWSlcbiAgICAgICk7XG4gICAgfSBjYXRjaCB7XG4gICAgICAvLyBJZ25vcmUgc3RvcmFnZSBhY2Nlc3MgZXJyb3JzLlxuICAgIH1cbiAgICBpZiAoc2hvdWxkU2hvdykge1xuICAgICAgc2hvd0dsb2JhbFNwaW5uZXIoaW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKSk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICBjb25zdCByYXcgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFZJU0lUX0RSQUZUX0tFWSk7XG4gICAgICBpZiAocmF3KSB7XG4gICAgICAgIGNvbnN0IGRyYWZ0ID0gSlNPTi5wYXJzZShyYXcpO1xuICAgICAgICBpZiAoZHJhZnQ/LnNlbGVjdGVkQ2xpZW50Py52YWx1ZSkgc2V0U2VsZWN0ZWRDbGllbnQoZHJhZnQuc2VsZWN0ZWRDbGllbnQpO1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShkcmFmdD8uc2VsZWN0ZWRDb250YWN0cykpIHNldFNlbGVjdGVkQ29udGFjdHMoZHJhZnQuc2VsZWN0ZWRDb250YWN0cyk7XG4gICAgICAgIGlmIChkcmFmdD8udmlzaXRUeXBlICE9PSB1bmRlZmluZWQpIHNldFZpc2l0VHlwZShkcmFmdC52aXNpdFR5cGUpO1xuICAgICAgICBpZiAoZHJhZnQ/LnRyYW5zRGF0ZSkgc2V0VHJhbnNEYXRlKGRyYWZ0LnRyYW5zRGF0ZSk7XG4gICAgICAgIGlmIChkcmFmdD8uZGVzY3JpcHRpb24gIT09IHVuZGVmaW5lZCkgc2V0RGVzY3JpcHRpb24oZHJhZnQuZGVzY3JpcHRpb24pO1xuICAgICAgICBpZiAoZHJhZnQ/LmNvbWVudGFyaW9zICE9PSB1bmRlZmluZWQpIHNldENvbWVudGFyaW9zKGRyYWZ0LmNvbWVudGFyaW9zKTtcbiAgICAgICAgaWYgKGRyYWZ0Py5hbnRlY2VkZW50ZXMgIT09IHVuZGVmaW5lZCkgc2V0QW50ZWNlZGVudGVzKGRyYWZ0LmFudGVjZWRlbnRlcyk7XG4gICAgICAgIGlmIChkcmFmdD8uY29uY2x1c2lvbmVzICE9PSB1bmRlZmluZWQpIHNldENvbmNsdXNpb25lcyhkcmFmdC5jb25jbHVzaW9uZXMpO1xuICAgICAgICBpZiAoZHJhZnQ/LnN0ZXAgPT09IDIpIHNldFN0ZXAoMik7XG4gICAgICB9XG4gICAgfSBjYXRjaCB7XG4gICAgICAvLyBJZ25vcmUgbWFsZm9ybWVkIGRyYWZ0IHBheWxvYWRzLlxuICAgIH0gZmluYWxseSB7XG4gICAgICBpZiAoc2hvdWxkU2hvdykge1xuICAgICAgICBoaWRlR2xvYmFsU3Bpbm5lcigpO1xuICAgICAgfVxuICAgIH1cbiAgICBkcmFmdFJlc3RvcmVkUmVmLmN1cnJlbnQgPSB0cnVlO1xuICB9LCBbXG4gICAgc2V0QW50ZWNlZGVudGVzLFxuICAgIHNldENvbWVudGFyaW9zLFxuICAgIHNldENvbmNsdXNpb25lcyxcbiAgICBzZXREZXNjcmlwdGlvbixcbiAgICBzZXRTZWxlY3RlZENsaWVudCxcbiAgICBzZXRTZWxlY3RlZENvbnRhY3RzLFxuICAgIHNldFN0ZXAsXG4gICAgc2V0VHJhbnNEYXRlLFxuICAgIHNldFZpc2l0VHlwZSxcbiAgXSk7XG5cbiAgcmV0dXJuIHtcbiAgICBwZXJzaXN0RHJhZnROb3csXG4gIH07XG59O1xuIiwgImV4cG9ydCBjb25zdCBzaG93R2xvYmFsU3Bpbm5lciA9IChtZXNzYWdlPzogc3RyaW5nKSA9PiB7XG4gIHRyeSB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIHdpbmRvdy5fX2luZFNob3dHbG9iYWxTcGlubmVyID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIHdpbmRvdy5fX2luZFNob3dHbG9iYWxTcGlubmVyKG1lc3NhZ2UpO1xuICAgIH1cbiAgfSBjYXRjaCB7XG4gICAgLy8gaWdub3JlXG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBoaWRlR2xvYmFsU3Bpbm5lciA9ICgpID0+IHtcbiAgdHJ5IHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2Ygd2luZG93Ll9faW5kSGlkZUdsb2JhbFNwaW5uZXIgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgd2luZG93Ll9faW5kSGlkZUdsb2JhbFNwaW5uZXIoKTtcbiAgICB9XG4gIH0gY2F0Y2gge1xuICAgIC8vIGlnbm9yZVxuICB9XG59O1xuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBmZXRjaEpzb24gfSBmcm9tIFwiLi4vc2VydmljZXMvYXBpU2VydmljZS50c1wiO1xuaW1wb3J0IHsgaW5kRXh0cmFjdElkLCBpbmRFeHRyYWN0U2lnbmVkSWQgfSBmcm9tIFwiLi4vdXRpbHMvaW5kSWRzLnRzXCI7XG5pbXBvcnQgeyBpbmRGb3JtYXQsIGluZFQgfSBmcm9tIFwiLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuaW1wb3J0IHsgc2hvd1Blcm1pc3Npb25Nb2RhbCB9IGZyb20gXCIuLi91dGlscy9wZXJtaXNzaW9ucy50c1wiO1xuaW1wb3J0IHsgZmxhc2hBY3Rpb25NYXJrLCBzZXRIaXN0b3J5RmlsdGVyRm9yRGF0ZSB9IGZyb20gXCIuLi91dGlscy92aXNpdGFzSGlzdG9yeS50c1wiO1xuaW1wb3J0IHsgVklTSVRfRFJBRlRfS0VZIH0gZnJvbSBcIi4uL3V0aWxzL3Zpc2l0YXNTdG9yYWdlLnRzXCI7XG5pbXBvcnQgeyB3YWl0IH0gZnJvbSBcIi4uL3V0aWxzL3dhaXQudHNcIjtcblxudHlwZSBDb250YWN0T3B0aW9uID0ge1xuICB2YWx1ZTogc3RyaW5nO1xuICB0ZXh0OiBzdHJpbmc7XG59O1xuXG50eXBlIFVzZUNyZWF0ZVN1Ym1pdEFyZ3MgPSB7XG4gIGJ1c3k6IGJvb2xlYW47XG4gIG1vZGFsT3BlbjogYm9vbGVhbjtcbiAgY2FuQ3JlYXRlVmlzaXQ6IGJvb2xlYW47XG4gIGNhblJvbGxiYWNrRGVsZXRlOiBib29sZWFuO1xuICBzZWxlY3RlZENsaWVudDogeyB2YWx1ZTogc3RyaW5nIH0gfCBudWxsO1xuICBzZWxlY3RlZENvbnRhY3RzOiBDb250YWN0T3B0aW9uW107XG4gIHZpc2l0VHlwZTogc3RyaW5nO1xuICBkZWZhdWx0QXNpc3RlbnRlVGlwbzogc3RyaW5nO1xuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICB0cmFuc0RhdGU6IHN0cmluZztcbiAgY29tZW50YXJpb3M6IHN0cmluZztcbiAgYW50ZWNlZGVudGVzOiBzdHJpbmc7XG4gIGNvbmNsdXNpb25lczogc3RyaW5nO1xuICBzZXRCdXN5OiAodmFsdWU6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHNldFN0YXR1czogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHNldE1vZGFsRXJyb3I6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBzZXRTaG93UmVxdWlyZWQ6ICh2YWx1ZTogYm9vbGVhbikgPT4gdm9pZDtcbiAgb3BlbkNvbmZpcm06IChvcHRzOiB7XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgY29uZmlybVRleHQ/OiBzdHJpbmc7XG4gICAgb25Db25maXJtPzogKCkgPT4gUHJvbWlzZTxib29sZWFuIHwgdm9pZD4gfCBib29sZWFuIHwgdm9pZDtcbiAgfSkgPT4gdm9pZDtcbiAgY2xvc2VDb25maXJtOiAoKSA9PiB2b2lkO1xufTtcblxuLy8gT3ducyBjcmVhdGUvY29uZmlybSBmbG93IHNvIGZvcm0gY29tcG9uZW50IHN0YXlzIGZvY3VzZWQgb24gVUkgZmllbGRzLlxuZXhwb3J0IGNvbnN0IHVzZUNyZWF0ZVN1Ym1pdCA9ICh7XG4gIGJ1c3ksXG4gIG1vZGFsT3BlbixcbiAgY2FuQ3JlYXRlVmlzaXQsXG4gIGNhblJvbGxiYWNrRGVsZXRlLFxuICBzZWxlY3RlZENsaWVudCxcbiAgc2VsZWN0ZWRDb250YWN0cyxcbiAgdmlzaXRUeXBlLFxuICBkZWZhdWx0QXNpc3RlbnRlVGlwbyxcbiAgZGVzY3JpcHRpb24sXG4gIHRyYW5zRGF0ZSxcbiAgY29tZW50YXJpb3MsXG4gIGFudGVjZWRlbnRlcyxcbiAgY29uY2x1c2lvbmVzLFxuICBzZXRCdXN5LFxuICBzZXRTdGF0dXMsXG4gIHNldE1vZGFsRXJyb3IsXG4gIHNldFNob3dSZXF1aXJlZCxcbiAgb3BlbkNvbmZpcm0sXG4gIGNsb3NlQ29uZmlybSxcbn06IFVzZUNyZWF0ZVN1Ym1pdEFyZ3MpID0+IHtcbiAgY29uc3QgZG9DcmVhdGUgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XG4gICAgaWYgKGJ1c3kpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoIWNhbkNyZWF0ZVZpc2l0KSB7XG4gICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHNldE1vZGFsRXJyb3IoXCJcIik7XG4gICAgaWYgKCFzZWxlY3RlZENsaWVudCkge1xuICAgICAgc2V0U3RhdHVzKGluZFQoXCJWaXNpdHNfQ3JlYXRlX1NlbGVjdENsaWVudFJlcXVpcmVkXCIsIFwiU2VsZWN0IGEgY2xpZW50LlwiKSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChTdHJpbmcodmlzaXRUeXBlIHx8IFwiXCIpID09PSBcIlwiIHx8IFN0cmluZyh2aXNpdFR5cGUpID09PSBcIjBcIiB8fCAhZGVzY3JpcHRpb24udHJpbSgpIHx8ICFjb21lbnRhcmlvcy50cmltKCkpIHtcbiAgICAgIHNldFNob3dSZXF1aXJlZCh0cnVlKTtcbiAgICAgIHNldFN0YXR1cyhpbmRUKFwiVmlzaXRzX0NyZWF0ZV9Db21wbGV0ZVJlcXVpcmVkXCIsIFwiQ29tcGxldGUgcmVxdWlyZWQgZmllbGRzLlwiKSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHNldEJ1c3kodHJ1ZSk7XG4gICAgc2V0U3RhdHVzKGluZFQoXCJWaXNpdHNfQ3JlYXRlX0NyZWF0aW5nQWN0aXZpdHlcIiwgXCJDcmVhdGluZyBhY3Rpdml0eS4uLlwiKSk7XG5cbiAgICBsZXQgY3JlYXRlZFJlY0lkID0gXCJcIjtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcGF5bG9hZEFjdGl2aXR5ID0ge1xuICAgICAgICBhY2NvdW50TnVtOiBzZWxlY3RlZENsaWVudC52YWx1ZSxcbiAgICAgICAgdmlzaXRUeXBlLFxuICAgICAgICBkZXNjcmlwdGlvbixcbiAgICAgICAgdHJhbnNEYXRlLFxuICAgICAgICBjb21lbnRhcmlvcyxcbiAgICAgICAgYW50ZWNlZGVudGVzLFxuICAgICAgICBjb25jbHVzaW9uZXMsXG4gICAgICB9O1xuXG4gICAgICBjb25zdCByZXNBY3QgPSBhd2FpdCBmZXRjaEpzb24oXCIvVmlzaXRhcy9DcmVhdGVBY3Rpdml0eVwiLCB7XG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGF5bG9hZEFjdGl2aXR5KSxcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoIXJlc0FjdC5zdWNjZXNzKSB0aHJvdyBuZXcgRXJyb3IocmVzQWN0Lm1lc3NhZ2UgfHwgaW5kVChcIlZpc2l0c19DcmVhdGVfQ3JlYXRlQWN0aXZpdHlGYWlsZWRcIiwgXCJGYWlsZWQgdG8gY3JlYXRlIGFjdGl2aXR5LlwiKSk7XG5cbiAgICAgIGNvbnN0IHJlY0lkQWN0aXZpZGFkID1cbiAgICAgICAgaW5kRXh0cmFjdFNpZ25lZElkKHJlc0FjdC5kYXRhKSB8fFxuICAgICAgICBpbmRFeHRyYWN0U2lnbmVkSWQocmVzQWN0Lm1lc3NhZ2UpIHx8XG4gICAgICAgIGluZEV4dHJhY3RTaWduZWRJZChpbmRFeHRyYWN0SWQocmVzQWN0LmRhdGEpIHx8IGluZEV4dHJhY3RJZChyZXNBY3QubWVzc2FnZSkpO1xuICAgICAgaWYgKCFyZWNJZEFjdGl2aWRhZCkgdGhyb3cgbmV3IEVycm9yKGluZFQoXCJWaXNpdHNfQ3JlYXRlX0NyZWF0ZUFjdGl2aXR5RmFpbGVkXCIsIFwiRmFpbGVkIHRvIGNyZWF0ZSBhY3Rpdml0eS5cIikpO1xuICAgICAgY3JlYXRlZFJlY0lkID0gU3RyaW5nKHJlY0lkQWN0aXZpZGFkKTtcblxuICAgICAgaWYgKHNlbGVjdGVkQ29udGFjdHMubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCBhc3Npc3RhbnRCYXRjaFNpemUgPSA0O1xuICAgICAgICBjb25zdCBjcmVhdGVBc3Npc3RhbnQgPSBhc3luYyAoY29udGFjdDogQ29udGFjdE9wdGlvbikgPT4ge1xuICAgICAgICAgIGNvbnN0IHBheWxvYWRWaXNpdGEgPSB7XG4gICAgICAgICAgICByZWZSZWNJZEFjdGl2aWRhZDogcmVjSWRBY3RpdmlkYWQsXG4gICAgICAgICAgICBhc2lzdGVudGVUaXBvOiBkZWZhdWx0QXNpc3RlbnRlVGlwbyxcbiAgICAgICAgICAgIGFzaXN0ZW50ZUlkOiBjb250YWN0LnRleHQsXG4gICAgICAgICAgICBjb250YWN0b1JlY0lkOiBjb250YWN0LnZhbHVlLFxuICAgICAgICAgIH07XG4gICAgICAgICAgY29uc3QgcmVzVmlzID0gYXdhaXQgZmV0Y2hKc29uKFwiL1Zpc2l0YXMvQ3JlYXRlVmlzaXRhQXNpc3RlbnRlXCIsIHtcbiAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXlsb2FkVmlzaXRhKSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpZiAoIXJlc1Zpcy5zdWNjZXNzKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IocmVzVmlzLm1lc3NhZ2UgfHwgaW5kVChcIlZpc2l0c19DcmVhdGVfQ3JlYXRlVmlzaXRGYWlsZWRcIiwgXCJGYWlsZWQgdG8gY3JlYXRlIHZpc2l0LlwiKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGZvciAobGV0IGlkeCA9IDA7IGlkeCA8IHNlbGVjdGVkQ29udGFjdHMubGVuZ3RoOyBpZHggKz0gYXNzaXN0YW50QmF0Y2hTaXplKSB7XG4gICAgICAgICAgY29uc3QgYmF0Y2ggPSBzZWxlY3RlZENvbnRhY3RzLnNsaWNlKGlkeCwgaWR4ICsgYXNzaXN0YW50QmF0Y2hTaXplKTtcbiAgICAgICAgICBjb25zdCBmaXJzdCA9IGJhdGNoWzBdO1xuICAgICAgICAgIGlmIChmaXJzdCkge1xuICAgICAgICAgICAgc2V0U3RhdHVzKGluZEZvcm1hdChcIlZpc2l0c19DcmVhdGVfQ3JlYXRpbmdWaXNpdEZvclwiLCBcIkNyZWF0aW5nIHZpc2l0IGZvciB7MH0uLi5cIiwgZmlyc3QudGV4dCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBhd2FpdCBQcm9taXNlLmFsbChiYXRjaC5tYXAoKGNvbnRhY3QpID0+IGNyZWF0ZUFzc2lzdGFudChjb250YWN0KSkpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oVklTSVRfRFJBRlRfS0VZKTtcbiAgICAgIH0gY2F0Y2gge1xuICAgICAgICAvLyBJZ25vcmUgc3RvcmFnZSBlcnJvcnMuXG4gICAgICB9XG5cbiAgICAgIHNldEhpc3RvcnlGaWx0ZXJGb3JEYXRlKHRyYW5zRGF0ZSwgdHJ1ZSk7XG4gICAgICBjbG9zZUNvbmZpcm0oKTtcbiAgICAgIGF3YWl0IHdhaXQoMjAwKTtcbiAgICAgIGZsYXNoQWN0aW9uTWFyayhcIm9rUHJvY2Vzc1wiLCAxMjAwKTtcbiAgICAgIGF3YWl0IHdhaXQoMTIwMCk7XG4gICAgICB3aW5kb3cuX19pbmRCeXBhc3NOYXZpZ2F0aW9uR3VhcmRPbmNlPy4oKTtcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvSGlzdG9yaWFsL0hpc3RvcnlcIjtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gY2F0Y2ggKGU6IGFueSkge1xuICAgICAgaWYgKGNyZWF0ZWRSZWNJZCAmJiBjYW5Sb2xsYmFja0RlbGV0ZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHNldFN0YXR1cyhpbmRUKFwiVmlzaXRzX0NyZWF0ZV9Sb2xsYmFja1wiLCBcIlJvbGxpbmcgYmFjayBhY3Rpdml0eS4uLlwiKSk7XG4gICAgICAgICAgYXdhaXQgZmV0Y2hKc29uKGAvVmlzaXRhcy9EZWxldGVBY3Rpdml0eS8ke2VuY29kZVVSSUNvbXBvbmVudChjcmVhdGVkUmVjSWQpfWAsIHtcbiAgICAgICAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcbiAgICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICAvLyBLZWVwIG9yaWdpbmFsIGVycm9yIGZsb3cuXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNvbnN0IG1zZyA9IGU/Lm1lc3NhZ2UgfHwgaW5kVChcIlZpc2l0c19DcmVhdGVfQ3JlYXRlVmlzaXRFcnJvclwiLCBcIkZhaWxlZCB0byBjcmVhdGUgdGhlIHZpc2l0LlwiKTtcbiAgICAgIHNldE1vZGFsRXJyb3IobXNnKTtcbiAgICAgIHNldFN0YXR1cyhtc2cpO1xuICAgICAgZmxhc2hBY3Rpb25NYXJrKFwiZXJyb3JQcm9jZXNzXCIsIDE1MDApO1xuICAgICAgc2V0QnVzeShmYWxzZSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9LCBbXG4gICAgYW50ZWNlZGVudGVzLFxuICAgIGJ1c3ksXG4gICAgY2FuQ3JlYXRlVmlzaXQsXG4gICAgY2FuUm9sbGJhY2tEZWxldGUsXG4gICAgY2xvc2VDb25maXJtLFxuICAgIGNvbWVudGFyaW9zLFxuICAgIGNvbmNsdXNpb25lcyxcbiAgICBkZWZhdWx0QXNpc3RlbnRlVGlwbyxcbiAgICBkZXNjcmlwdGlvbixcbiAgICBzZWxlY3RlZENsaWVudCxcbiAgICBzZWxlY3RlZENvbnRhY3RzLFxuICAgIHNldEJ1c3ksXG4gICAgc2V0TW9kYWxFcnJvcixcbiAgICBzZXRTaG93UmVxdWlyZWQsXG4gICAgc2V0U3RhdHVzLFxuICAgIHRyYW5zRGF0ZSxcbiAgICB2aXNpdFR5cGUsXG4gIF0pO1xuXG4gIGNvbnN0IGhhbmRsZVN1Ym1pdCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoYnVzeSkgcmV0dXJuO1xuICAgIGlmICghY2FuQ3JlYXRlVmlzaXQpIHtcbiAgICAgIHNob3dQZXJtaXNzaW9uTW9kYWwoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKG1vZGFsT3BlbikgcmV0dXJuO1xuICAgIGlmICghc2VsZWN0ZWRDbGllbnQpIHtcbiAgICAgIHNldFN0YXR1cyhpbmRUKFwiVmlzaXRzX0NyZWF0ZV9TZWxlY3RDbGllbnRSZXF1aXJlZFwiLCBcIlNlbGVjdCBhIGNsaWVudC5cIikpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoU3RyaW5nKHZpc2l0VHlwZSB8fCBcIlwiKSA9PT0gXCJcIiB8fCBTdHJpbmcodmlzaXRUeXBlKSA9PT0gXCIwXCIgfHwgIWRlc2NyaXB0aW9uLnRyaW0oKSB8fCAhY29tZW50YXJpb3MudHJpbSgpKSB7XG4gICAgICBzZXRTaG93UmVxdWlyZWQodHJ1ZSk7XG4gICAgICBzZXRTdGF0dXMoaW5kVChcIlZpc2l0c19DcmVhdGVfQ29tcGxldGVSZXF1aXJlZFwiLCBcIkNvbXBsZXRlIHJlcXVpcmVkIGZpZWxkcy5cIikpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xuICAgIG9wZW5Db25maXJtKHtcbiAgICAgIHRpdGxlOiBpbmRUKFwiVmlzaXRzX0NyZWF0ZV9Db25maXJtQ3JlYXRlX1RpdGxlXCIsIFwiQ29uZmlybSBjcmVhdGVcIiksXG4gICAgICBtZXNzYWdlOiBpbmRUKFwiVmlzaXRzX0NyZWF0ZV9Db25maXJtQ3JlYXRlX0JvZHlcIiwgXCJEbyB5b3Ugd2FudCB0byBjcmVhdGUgdGhpcyB2aXNpdD9cIiksXG4gICAgICBjb25maXJtVGV4dDogaW5kVChcIkNvbmZpcm1fWWVzXCIsIFwiT0tcIiksXG4gICAgICBvbkNvbmZpcm06IGRvQ3JlYXRlLFxuICAgIH0pO1xuICB9LCBbXG4gICAgYnVzeSxcbiAgICBjYW5DcmVhdGVWaXNpdCxcbiAgICBjb21lbnRhcmlvcyxcbiAgICBkZXNjcmlwdGlvbixcbiAgICBkb0NyZWF0ZSxcbiAgICBtb2RhbE9wZW4sXG4gICAgb3BlbkNvbmZpcm0sXG4gICAgc2VsZWN0ZWRDbGllbnQsXG4gICAgc2V0TW9kYWxFcnJvcixcbiAgICBzZXRTaG93UmVxdWlyZWQsXG4gICAgc2V0U3RhdHVzLFxuICAgIHZpc2l0VHlwZSxcbiAgXSk7XG5cbiAgcmV0dXJuIHtcbiAgICBkb0NyZWF0ZSxcbiAgICBoYW5kbGVTdWJtaXQsXG4gIH07XG59O1xuIiwgImV4cG9ydCBjb25zdCBpbmRFeHRyYWN0SWQgPSAodmFsdWU6IHVua25vd24pOiBzdHJpbmcgPT4ge1xuICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkgcmV0dXJuIFwiXCI7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgfHwgdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiKSByZXR1cm4gU3RyaW5nKHZhbHVlKS50cmltKCk7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIpIHtcbiAgICBjb25zdCBjYW5kaWRhdGUgPVxuICAgICAgKHZhbHVlIGFzIGFueSkucmVjSWQgPz9cbiAgICAgICh2YWx1ZSBhcyBhbnkpLlJlY0lkID8/XG4gICAgICAodmFsdWUgYXMgYW55KS5pZCA/P1xuICAgICAgKHZhbHVlIGFzIGFueSkuSWQgPz9cbiAgICAgICh2YWx1ZSBhcyBhbnkpLnZhbHVlID8/XG4gICAgICAodmFsdWUgYXMgYW55KS5WYWx1ZTtcbiAgICBpZiAodHlwZW9mIGNhbmRpZGF0ZSA9PT0gXCJzdHJpbmdcIiB8fCB0eXBlb2YgY2FuZGlkYXRlID09PSBcIm51bWJlclwiKSByZXR1cm4gU3RyaW5nKGNhbmRpZGF0ZSkudHJpbSgpO1xuICB9XG4gIHJldHVybiBcIlwiO1xufTtcblxuZXhwb3J0IGNvbnN0IGluZEV4dHJhY3ROdW1lcmljSWQgPSAodmFsdWU6IHVua25vd24sIGRlcHRoID0gMCk6IHN0cmluZyA9PiB7XG4gIGlmIChkZXB0aCA+IDMpIHJldHVybiBcIlwiO1xuICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkgcmV0dXJuIFwiXCI7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCIgJiYgTnVtYmVyLmlzRmluaXRlKHZhbHVlKSkgcmV0dXJuIFN0cmluZyhNYXRoLnRydW5jKHZhbHVlKSk7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpIHtcbiAgICBjb25zdCByYXcgPSB2YWx1ZS50cmltKCk7XG4gICAgaWYgKCFyYXcpIHJldHVybiBcIlwiO1xuICAgIGlmICgvXlxcZCskLy50ZXN0KHJhdykpIHJldHVybiByYXc7XG4gICAgY29uc3QgbSA9IHJhdy5tYXRjaCgvKFxcZHszLH0pLyk7XG4gICAgcmV0dXJuIG0gPyBtWzFdIDogXCJcIjtcbiAgfVxuICBpZiAodHlwZW9mIHZhbHVlICE9PSBcIm9iamVjdFwiKSByZXR1cm4gXCJcIjtcbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgZm9yIChjb25zdCBpdGVtIG9mIHZhbHVlKSB7XG4gICAgICBjb25zdCBmb3VuZCA9IGluZEV4dHJhY3ROdW1lcmljSWQoaXRlbSwgZGVwdGggKyAxKTtcbiAgICAgIGlmIChmb3VuZCkgcmV0dXJuIGZvdW5kO1xuICAgIH1cbiAgICByZXR1cm4gXCJcIjtcbiAgfVxuXG4gIGNvbnN0IGtleXMgPSBbXG4gICAgXCJyZWNJZFwiLFxuICAgIFwiUmVjSWRcIixcbiAgICBcInJlZlJlY0lkQWN0aXZpZGFkXCIsXG4gICAgXCJSZWZSZWNJZEFjdGl2aWRhZFwiLFxuICAgIFwiYWN0aXZpZGFkUmVjSWRcIixcbiAgICBcIkFjdGl2aWRhZFJlY0lkXCIsXG4gICAgXCJpZFwiLFxuICAgIFwiSWRcIixcbiAgICBcInZhbHVlXCIsXG4gICAgXCJWYWx1ZVwiLFxuICAgIFwicmVzdWx0XCIsXG4gICAgXCJSZXN1bHRcIixcbiAgICBcImRhdGFcIixcbiAgICBcIkRhdGFcIixcbiAgICBcIm1lc3NhZ2VcIixcbiAgICBcIk1lc3NhZ2VcIixcbiAgXTtcblxuICBmb3IgKGNvbnN0IGsgb2Yga2V5cykge1xuICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodmFsdWUsIGspKSB7XG4gICAgICBjb25zdCBmb3VuZCA9IGluZEV4dHJhY3ROdW1lcmljSWQoKHZhbHVlIGFzIGFueSlba10sIGRlcHRoICsgMSk7XG4gICAgICBpZiAoZm91bmQpIHJldHVybiBmb3VuZDtcbiAgICB9XG4gIH1cblxuICBmb3IgKGNvbnN0IHYgb2YgT2JqZWN0LnZhbHVlcyh2YWx1ZSBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPikpIHtcbiAgICBjb25zdCBmb3VuZCA9IGluZEV4dHJhY3ROdW1lcmljSWQodiwgZGVwdGggKyAxKTtcbiAgICBpZiAoZm91bmQpIHJldHVybiBmb3VuZDtcbiAgfVxuXG4gIHJldHVybiBcIlwiO1xufTtcblxuZXhwb3J0IGNvbnN0IGluZEV4dHJhY3RTaWduZWRJZCA9ICh2YWx1ZTogdW5rbm93biwgZGVwdGggPSAwKTogc3RyaW5nID0+IHtcbiAgaWYgKGRlcHRoID4gMykgcmV0dXJuIFwiXCI7XG4gIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gXCJcIjtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIiAmJiBOdW1iZXIuaXNGaW5pdGUodmFsdWUpKSByZXR1cm4gU3RyaW5nKE1hdGgudHJ1bmModmFsdWUpKTtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikge1xuICAgIGNvbnN0IHJhdyA9IHZhbHVlLnRyaW0oKTtcbiAgICBpZiAoIXJhdykgcmV0dXJuIFwiXCI7XG4gICAgY29uc3QgbWF0Y2ggPSByYXcubWF0Y2goLy0/XFxkezMsfS8pO1xuICAgIHJldHVybiBtYXRjaCA/IG1hdGNoWzBdIDogXCJcIjtcbiAgfVxuICBpZiAodHlwZW9mIHZhbHVlICE9PSBcIm9iamVjdFwiKSByZXR1cm4gXCJcIjtcbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgZm9yIChjb25zdCBpdGVtIG9mIHZhbHVlKSB7XG4gICAgICBjb25zdCBmb3VuZCA9IGluZEV4dHJhY3RTaWduZWRJZChpdGVtLCBkZXB0aCArIDEpO1xuICAgICAgaWYgKGZvdW5kKSByZXR1cm4gZm91bmQ7XG4gICAgfVxuICAgIHJldHVybiBcIlwiO1xuICB9XG5cbiAgY29uc3Qga2V5cyA9IFtcbiAgICBcInJlY0lkXCIsXG4gICAgXCJSZWNJZFwiLFxuICAgIFwicmVmUmVjSWRBY3RpdmlkYWRcIixcbiAgICBcIlJlZlJlY0lkQWN0aXZpZGFkXCIsXG4gICAgXCJhY3RpdmlkYWRSZWNJZFwiLFxuICAgIFwiQWN0aXZpZGFkUmVjSWRcIixcbiAgICBcIm1lc3NhZ2VcIixcbiAgICBcIk1lc3NhZ2VcIixcbiAgICBcInJlc3VsdFwiLFxuICAgIFwiUmVzdWx0XCIsXG4gICAgXCJkYXRhXCIsXG4gICAgXCJEYXRhXCIsXG4gIF07XG5cbiAgZm9yIChjb25zdCBrIG9mIGtleXMpIHtcbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCBrKSkge1xuICAgICAgY29uc3QgZm91bmQgPSBpbmRFeHRyYWN0U2lnbmVkSWQoKHZhbHVlIGFzIGFueSlba10sIGRlcHRoICsgMSk7XG4gICAgICBpZiAoZm91bmQpIHJldHVybiBmb3VuZDtcbiAgICB9XG4gIH1cblxuICBmb3IgKGNvbnN0IHYgb2YgT2JqZWN0LnZhbHVlcyh2YWx1ZSBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPikpIHtcbiAgICBjb25zdCBmb3VuZCA9IGluZEV4dHJhY3RTaWduZWRJZCh2LCBkZXB0aCArIDEpO1xuICAgIGlmIChmb3VuZCkgcmV0dXJuIGZvdW5kO1xuICB9XG5cbiAgcmV0dXJuIFwiXCI7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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QUEyQjtBQUNoQyxXQUFPLEVBQUUsVUFBVSxLQUFLO0FBQUEsRUFDMUI7QUFBQSxFQUVBLGtCQUFrQixPQUFPLE1BQU07QUFBQSxFQUMvQjtBQUFBLEVBRUEsU0FBUztBQUNQLFFBQUksS0FBSyxNQUFNLFVBQVU7QUFDdkIsYUFDRSw2Q0FBQyxTQUFJLFdBQVUsa0VBQ1osZUFBSywrQkFBK0IsMEVBQTBFLEdBQ2pIO0FBQUEsSUFFSjtBQUNBLFdBQU8sS0FBSyxNQUFNO0FBQUEsRUFDcEI7QUFDRjtBQUdlLFNBQVIsYUFBOEI7QUFDbkMsU0FDRSw2Q0FBQyxpQkFDQyx1REFBQyxjQUFXLEdBQ2Q7QUFFSjs7O0FEMWRRLElBQUFDLHNCQUFBO0FBSlIsSUFBTSxhQUFhLE1BQU07QUFDdkIsU0FDRSw2Q0FBQyxnQkFDQyx1REFBQyxnQkFDQyx1REFBQyxjQUFXLEdBQ2QsR0FDRjtBQUVKO0FBRUEsSUFBTSxRQUFRLE1BQU07QUFDbEIsUUFBTSxTQUFTLFNBQVMsZUFBZSxrQkFBa0I7QUFDekQsTUFBSSxDQUFDLE9BQVE7QUFFYixRQUFNLFVBQVUsNkNBQUMsY0FBVztBQUU1QixNQUFJLE9BQU8sV0FBVztBQUNwQixXQUFPLFVBQVUsT0FBTyxPQUFPO0FBQy9CO0FBQUEsRUFDRjtBQUVBLFFBQU0sV0FBTywwQkFBVyxNQUFNO0FBQzlCLFNBQU8sWUFBWTtBQUNuQixPQUFLLE9BQU8sT0FBTztBQUNyQjtBQUVBLElBQUksU0FBUyxlQUFlLGNBQWMsU0FBUyxlQUFlLGVBQWU7QUFDL0UsUUFBTTtBQUNSLE9BQU87QUFDTCxXQUFTLGlCQUFpQixvQkFBb0IsS0FBSztBQUNyRDtBQUVBLElBQU8scUJBQVE7IiwKICAibmFtZXMiOiBbImltcG9ydF9yZWFjdCIsICJSZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiY2FuQWNjZXNzIiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgIlJlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSJdCn0K
