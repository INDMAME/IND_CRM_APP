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
} from "./chunks/chunk-T34EGLY4.js";
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
} from "./chunks/chunk-53XJ3RSU.js";
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
} from "./chunks/chunk-ISVBGEOF.js";
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
var import_react3 = __toESM(require_react());

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

// Web/wwwroot/react/src/pages/visitas/creacion/CreateForm.tsx
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
function VisitasApp() {
  const { visitTypes, asistenteTipos } = useVisitas();
  const canCreateVisit = canAccess("VISITAS_CREACION", "Add");
  const canRollbackDelete = canAccess("VISITAS_HISTORIAL", "FullAccess");
  const fieldIdComentarios = "Visita.Create.Comentarios";
  const fieldIdAntecedentes = "Visita.Create.Antecedentes";
  const fieldIdConclusiones = "Visita.Create.Conclusiones";
  const [step, setStep] = (0, import_react3.useState)(1);
  const [selectedClient, setSelectedClient] = (0, import_react3.useState)(null);
  const [selectedContacts, setSelectedContacts] = (0, import_react3.useState)([]);
  const todayString = () => {
    const today = /* @__PURE__ */ new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };
  const defaultVisitType = visitTypes[0]?.value ?? visitTypes[0]?.Value ?? "";
  const defaultAsistenteTipo = asistenteTipos[0]?.value ?? asistenteTipos[0]?.Value ?? "0";
  const [visitType, setVisitType] = (0, import_react3.useState)(defaultVisitType);
  const [transDate, setTransDate] = (0, import_react3.useState)(() => todayString());
  const [description, setDescription] = (0, import_react3.useState)("");
  const [comentarios, setComentarios] = (0, import_react3.useState)("");
  const [antecedentes, setAntecedentes] = (0, import_react3.useState)("");
  const [conclusiones, setConclusiones] = (0, import_react3.useState)("");
  const [status, setStatus] = (0, import_react3.useState)("");
  const [busy, setBusy] = (0, import_react3.useState)(false);
  const [showRequired, setShowRequired] = (0, import_react3.useState)(false);
  const draftRestoredRef = (0, import_react3.useRef)(false);
  const draftPersistTimerRef = (0, import_react3.useRef)(null);
  const [modalError, setModalError] = (0, import_react3.useState)("");
  const { modal, openConfirm, closeConfirm, handleConfirm } = useConfirmDialog({
    defaultConfirmText: indT("Confirm_Yes", "OK"),
    defaultCancelText: indT("Confirm_No", "Cancel")
  });
  const handleModalConfirm = import_react3.default.useCallback(async () => {
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
  const handleModalButtonConfirm = import_react3.default.useCallback(() => {
    if (!busy && modalError) {
      closeConfirm();
      return;
    }
    handleModalConfirm();
  }, [busy, modalError, closeConfirm, handleModalConfirm]);
  const buildDraft = import_react3.default.useCallback(
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
  const persistDraftSnapshot = import_react3.default.useCallback((draft) => {
    try {
      sessionStorage.setItem(VISIT_DRAFT_KEY, JSON.stringify(draft));
    } catch {
    }
  }, []);
  const persistDraftNow = import_react3.default.useCallback(() => {
    persistDraftSnapshot(buildDraft());
  }, [buildDraft, persistDraftSnapshot]);
  const openTextEditor = import_react3.default.useCallback(
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
  const handleComentariosTap = import_react3.default.useCallback((event) => {
    if (busy) return;
    event.preventDefault();
    openTextEditor(fieldIdComentarios, indT("Visits_Field_Comments", "Comments"), comentarios);
  }, [busy, comentarios, openTextEditor]);
  const handleComentariosHold = import_react3.default.useCallback((target, clientY) => {
    if (!target || !isOverflowing(target)) return false;
    setPreviewAnchor(target);
    return showPreviewTooltip(String(comentarios || ""), clientY);
  }, [comentarios]);
  const handleAntecedentesTap = import_react3.default.useCallback((event) => {
    if (busy) return;
    event.preventDefault();
    openTextEditor(fieldIdAntecedentes, indT("Visits_Field_Background", "Background"), antecedentes);
  }, [busy, antecedentes, openTextEditor]);
  const handleAntecedentesHold = import_react3.default.useCallback((target, clientY) => {
    if (!target || !isOverflowing(target)) return false;
    setPreviewAnchor(target);
    return showPreviewTooltip(String(antecedentes || ""), clientY);
  }, [antecedentes]);
  const handleConclusionesTap = import_react3.default.useCallback((event) => {
    if (busy) return;
    event.preventDefault();
    openTextEditor(fieldIdConclusiones, indT("Visits_Field_Conclusions", "Conclusions"), conclusiones);
  }, [busy, conclusiones, openTextEditor]);
  const handleConclusionesHold = import_react3.default.useCallback((target, clientY) => {
    if (!target || !isOverflowing(target)) return false;
    setPreviewAnchor(target);
    return showPreviewTooltip(String(conclusiones || ""), clientY);
  }, [conclusiones]);
  const comentariosTap = useTapGuard(handleComentariosTap, handleComentariosHold);
  const antecedentesTap = useTapGuard(handleAntecedentesTap, handleAntecedentesHold);
  const conclusionesTap = useTapGuard(handleConclusionesTap, handleConclusionesHold);
  const applyTextEditorValues = import_react3.default.useCallback(() => {
    const valComentarios = readAndClearTextEditorValue(fieldIdComentarios);
    if (valComentarios !== null) setComentarios(valComentarios);
    const valAntecedentes = readAndClearTextEditorValue(fieldIdAntecedentes);
    if (valAntecedentes !== null) setAntecedentes(valAntecedentes);
    const valConclusiones = readAndClearTextEditorValue(fieldIdConclusiones);
    if (valConclusiones !== null) setConclusiones(valConclusiones);
  }, [fieldIdComentarios, fieldIdAntecedentes, fieldIdConclusiones]);
  const prevClientRef = (0, import_react3.useRef)(null);
  (0, import_react3.useEffect)(() => {
    const current = selectedClient?.value;
    if (prevClientRef.current && prevClientRef.current !== current) {
      setSelectedContacts([]);
    }
    prevClientRef.current = current;
  }, [selectedClient?.value]);
  const lastClientRef = (0, import_react3.useRef)(null);
  (0, import_react3.useEffect)(() => {
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
  (0, import_react3.useEffect)(() => {
    if (!draftRestoredRef.current) return;
    if (draftPersistTimerRef.current) {
      clearTimeout(draftPersistTimerRef.current);
    }
    draftPersistTimerRef.current = window.setTimeout(() => {
      draftPersistTimerRef.current = null;
      persistDraftSnapshot(buildDraft());
    }, 180);
    return () => {
      if (draftPersistTimerRef.current) {
        clearTimeout(draftPersistTimerRef.current);
        draftPersistTimerRef.current = null;
      }
    };
  }, [buildDraft, persistDraftSnapshot]);
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
  }, []);
  (0, import_react3.useEffect)(() => {
    applyTextEditorValues();
    const onPageShow = () => applyTextEditorValues();
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, [applyTextEditorValues]);
  const canGoNext = !!selectedClient;
  const canCreate = !!selectedClient && String(visitType || "").trim() !== "" && String(visitType) !== "0" && description.trim().length > 0 && comentarios.trim().length > 0;
  const hasActiveProcess = (0, import_react3.useMemo)(() => {
    if (busy) return true;
    if (step > 1) return true;
    if (selectedClient) return true;
    if (selectedContacts.length > 0) return true;
    return description.trim().length > 0 || comentarios.trim().length > 0 || antecedentes.trim().length > 0 || conclusiones.trim().length > 0;
  }, [antecedentes, busy, comentarios, conclusiones, description, selectedClient, selectedContacts.length, step]);
  (0, import_react3.useEffect)(() => {
    window.__indSetNavigationGuard?.(hasActiveProcess);
    return () => {
      window.__indClearNavigationGuard?.();
    };
  }, [hasActiveProcess]);
  useTopbar(
    step,
    canGoNext,
    () => {
      if (!canCreateVisit) {
        showPermissionModal();
        return;
      }
      if (step === 1 && canGoNext) setStep(2);
      if (step === 2) handleSubmit();
    },
    () => setStep(1),
    busy,
    canCreate,
    canCreateVisit
  );
  const doCreate = async () => {
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
      const msg = e.message || indT("Visits_Create_CreateVisitError", "Failed to create the visit.");
      setModalError(msg);
      setStatus(msg);
      flashActionMark("errorProcess", 1500);
      setBusy(false);
      return false;
    }
  };
  const handleSubmit = () => {
    if (busy) return;
    if (!canCreateVisit) {
      showPermissionModal();
      return;
    }
    if (modal.open) return;
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
  };
  (0, import_react3.useEffect)(() => {
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
var ErrorBoundary = class extends import_react3.default.Component {
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvY3JlYWNpb24vQ3JlYXRlUGFnZS50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvY3JlYWNpb24vQ3JlYXRlRm9ybS50c3giLCAiLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvdmlzaXRhcy9Db250YWN0c0NvbWJvYm94LnRzeCIsICIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQGhlcm9pY29ucy9yZWFjdC8yMC9zb2xpZC9lc20vWE1hcmtJY29uLmpzIiwgIi4uL3JlYWN0L3NyYy9ob29rcy91c2VUb3BiYXIudHMiLCAiLi4vcmVhY3Qvc3JjL3V0aWxzL2dsb2JhbFNwaW5uZXIudHMiLCAiLi4vcmVhY3Qvc3JjL3V0aWxzL2luZElkcy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgY3JlYXRlUm9vdCB9IGZyb20gXCJyZWFjdC1kb20vY2xpZW50XCI7XG5pbXBvcnQgQ3JlYXRlRm9ybSBmcm9tIFwiLi9DcmVhdGVGb3JtLnRzeFwiO1xuaW1wb3J0IHsgSTE4blByb3ZpZGVyIH0gZnJvbSBcIi4uLy4uLy4uL2NvbnRleHQvSTE4bkNvbnRleHQudHN4XCI7XG5pbXBvcnQgeyBBdXRoUHJvdmlkZXIgfSBmcm9tIFwiLi4vLi4vLi4vY29udGV4dC9BdXRoQ29udGV4dC50c3hcIjtcblxudHlwZSBJbmRSb290RWxlbWVudCA9IEhUTUxFbGVtZW50ICYgeyBfX2luZFJvb3Q/OiBpbXBvcnQoXCJyZWFjdC1kb20vY2xpZW50XCIpLlJvb3QgfTtcblxuLy8gUGFnZSBlbnRyeSBmb3IgdGhlIHZpc2l0YXMgY3JlYXRlIGlzbGFuZC5cbmNvbnN0IENyZWF0ZVBhZ2UgPSAoKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPEkxOG5Qcm92aWRlcj5cbiAgICAgIDxBdXRoUHJvdmlkZXI+XG4gICAgICAgIDxDcmVhdGVGb3JtIC8+XG4gICAgICA8L0F1dGhQcm92aWRlcj5cbiAgICA8L0kxOG5Qcm92aWRlcj5cbiAgKTtcbn07XG5cbmNvbnN0IG1vdW50ID0gKCkgPT4ge1xuICBjb25zdCByb290RWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpc2l0YXMtYXBwLXJvb3RcIikgYXMgSW5kUm9vdEVsZW1lbnQgfCBudWxsO1xuICBpZiAoIXJvb3RFbCkgcmV0dXJuO1xuXG4gIGNvbnN0IGVsZW1lbnQgPSA8Q3JlYXRlUGFnZSAvPjtcblxuICBpZiAocm9vdEVsLl9faW5kUm9vdCkge1xuICAgIHJvb3RFbC5fX2luZFJvb3QucmVuZGVyKGVsZW1lbnQpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHJvb3QgPSBjcmVhdGVSb290KHJvb3RFbCk7XG4gIHJvb3RFbC5fX2luZFJvb3QgPSByb290O1xuICByb290LnJlbmRlcihlbGVtZW50KTtcbn07XG5cbmlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSBcImNvbXBsZXRlXCIgfHwgZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gXCJpbnRlcmFjdGl2ZVwiKSB7XG4gIG1vdW50KCk7XG59IGVsc2Uge1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBtb3VudCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IENyZWF0ZVBhZ2U7XG4iLCAiXHVGRUZGaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlU3RhdGUsIHVzZVJlZiB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgQ29uZmlybU1vZGFsIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvQ29uZmlybU1vZGFsLnRzeFwiO1xyXG5pbXBvcnQgU2luZ2xlRGF0ZVBpY2tlciBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NpbmdsZURhdGVQaWNrZXIudHN4XCI7XHJcbmltcG9ydCBTZWxlY3RDb21ib2JveCBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NlbGVjdENvbWJvYm94LnRzeFwiO1xyXG5pbXBvcnQgeyBmZXRjaEpzb24gfSBmcm9tIFwiLi4vLi4vLi4vc2VydmljZXMvYXBpU2VydmljZS50c1wiO1xyXG5pbXBvcnQgeyB1c2VWaXNpdGFzIH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZVZpc2l0YXMudHNcIjtcclxuaW1wb3J0IENsaWVudFNlYXJjaENvbWJvYm94IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL3Zpc2l0YXMvQ2xpZW50U2VhcmNoQ29tYm9ib3gudHN4XCI7XHJcbmltcG9ydCBDb250YWN0c0NvbWJvYm94IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL3Zpc2l0YXMvQ29udGFjdHNDb21ib2JveC50c3hcIjtcclxuaW1wb3J0IHsgdXNlVGFwR3VhcmQgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlVGFwR3VhcmQudHNcIjtcclxuaW1wb3J0IHsgdXNlVG9wYmFyIH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZVRvcGJhci50c1wiO1xyXG5pbXBvcnQgeyB1c2VDb25maXJtRGlhbG9nIH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZUNvbmZpcm1EaWFsb2cudHNcIjtcclxuaW1wb3J0IHsgY2xhc3NOYW1lcyB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9jbGFzc05hbWVzLnRzXCI7XHJcbmltcG9ydCB7IGluZEZvcm1hdCwgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB7IGNhbkFjY2Vzcywgc2hvd1Blcm1pc3Npb25Nb2RhbCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9wZXJtaXNzaW9ucy50c1wiO1xyXG5pbXBvcnQgeyBzaG93R2xvYmFsU3Bpbm5lciwgaGlkZUdsb2JhbFNwaW5uZXIgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvZ2xvYmFsU3Bpbm5lci50c1wiO1xyXG5pbXBvcnQgeyBpbmRFeHRyYWN0SWQsIGluZEV4dHJhY3RTaWduZWRJZCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJZHMudHNcIjtcbmltcG9ydCB7IHNldFByZXZpZXdBbmNob3IsIHNob3dQcmV2aWV3VG9vbHRpcCwgaXNPdmVyZmxvd2luZyB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9wcmV2aWV3VG9vbHRpcC50c1wiO1xyXG5pbXBvcnQgeyByZWFkQW5kQ2xlYXJUZXh0RWRpdG9yVmFsdWUsIFRFWFRfRURJVE9SX1BSRUZJWCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy90ZXh0RWRpdG9yLnRzXCI7XHJcbmltcG9ydCB7XHJcbiAgQ1JFQVRFX0ZSRVNIX1BBUkFNLFxyXG4gIFZJU0lUX0RSQUZUX0tFWSxcclxuICBDT05UQUNUU19TVE9SQUdFX0tFWSxcclxuICBDT05UQUNUU19TRUxFQ1RJT05fS0VZLFxyXG4gIGNsZWFyQ3JlYXRlU2VsZWN0aW9uQ2FjaGUsXHJcbiAgc3RyaXBGcmVzaFBhcmFtXHJcbn0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3Zpc2l0YXNTdG9yYWdlLnRzXCI7XHJcbmltcG9ydCB7IGZsYXNoQWN0aW9uTWFyaywgc2V0SGlzdG9yeUZpbHRlckZvckRhdGUgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvdmlzaXRhc0hpc3RvcnkudHNcIjtcclxuaW1wb3J0IHsgd2FpdCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy93YWl0LnRzXCI7XHJcblxyXG5mdW5jdGlvbiBWaXNpdGFzQXBwKCkge1xyXG4gIGNvbnN0IHsgdmlzaXRUeXBlcywgYXNpc3RlbnRlVGlwb3MgfSA9IHVzZVZpc2l0YXMoKTtcclxuICBjb25zdCBjYW5DcmVhdGVWaXNpdCA9IGNhbkFjY2VzcyhcIlZJU0lUQVNfQ1JFQUNJT05cIiwgXCJBZGRcIik7XHJcbiAgY29uc3QgY2FuUm9sbGJhY2tEZWxldGUgPSBjYW5BY2Nlc3MoXCJWSVNJVEFTX0hJU1RPUklBTFwiLCBcIkZ1bGxBY2Nlc3NcIik7XHJcblxyXG4gIGNvbnN0IGZpZWxkSWRDb21lbnRhcmlvcyA9IFwiVmlzaXRhLkNyZWF0ZS5Db21lbnRhcmlvc1wiO1xyXG4gIGNvbnN0IGZpZWxkSWRBbnRlY2VkZW50ZXMgPSBcIlZpc2l0YS5DcmVhdGUuQW50ZWNlZGVudGVzXCI7XHJcbiAgY29uc3QgZmllbGRJZENvbmNsdXNpb25lcyA9IFwiVmlzaXRhLkNyZWF0ZS5Db25jbHVzaW9uZXNcIjtcclxuXHJcbiAgY29uc3QgW3N0ZXAsIHNldFN0ZXBdID0gdXNlU3RhdGUoMSk7XHJcbiAgY29uc3QgW3NlbGVjdGVkQ2xpZW50LCBzZXRTZWxlY3RlZENsaWVudF0gPSB1c2VTdGF0ZShudWxsKTtcclxuICBjb25zdCBbc2VsZWN0ZWRDb250YWN0cywgc2V0U2VsZWN0ZWRDb250YWN0c10gPSB1c2VTdGF0ZShbXSk7XHJcbiAgY29uc3QgdG9kYXlTdHJpbmcgPSAoKSA9PiB7XHJcbiAgICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKCk7XHJcbiAgICBjb25zdCB5eXl5ID0gdG9kYXkuZ2V0RnVsbFllYXIoKTtcclxuICAgIGNvbnN0IG1tID0gU3RyaW5nKHRvZGF5LmdldE1vbnRoKCkgKyAxKS5wYWRTdGFydCgyLCBcIjBcIik7XHJcbiAgICBjb25zdCBkZCA9IFN0cmluZyh0b2RheS5nZXREYXRlKCkpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcclxuICAgIHJldHVybiBgJHt5eXl5fS0ke21tfS0ke2RkfWA7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgZGVmYXVsdFZpc2l0VHlwZSA9IHZpc2l0VHlwZXNbMF0/LnZhbHVlID8/IHZpc2l0VHlwZXNbMF0/LlZhbHVlID8/IFwiXCI7XHJcbiAgY29uc3QgZGVmYXVsdEFzaXN0ZW50ZVRpcG8gPSBhc2lzdGVudGVUaXBvc1swXT8udmFsdWUgPz8gYXNpc3RlbnRlVGlwb3NbMF0/LlZhbHVlID8/IFwiMFwiO1xyXG5cclxuICBjb25zdCBbdmlzaXRUeXBlLCBzZXRWaXNpdFR5cGVdID0gdXNlU3RhdGUoZGVmYXVsdFZpc2l0VHlwZSk7XHJcbiAgY29uc3QgW3RyYW5zRGF0ZSwgc2V0VHJhbnNEYXRlXSA9IHVzZVN0YXRlKCgpID0+IHRvZGF5U3RyaW5nKCkpO1xyXG4gIGNvbnN0IFtkZXNjcmlwdGlvbiwgc2V0RGVzY3JpcHRpb25dID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW2NvbWVudGFyaW9zLCBzZXRDb21lbnRhcmlvc10gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbYW50ZWNlZGVudGVzLCBzZXRBbnRlY2VkZW50ZXNdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW2NvbmNsdXNpb25lcywgc2V0Q29uY2x1c2lvbmVzXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtzdGF0dXMsIHNldFN0YXR1c10gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2J1c3ksIHNldEJ1c3ldID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbc2hvd1JlcXVpcmVkLCBzZXRTaG93UmVxdWlyZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBkcmFmdFJlc3RvcmVkUmVmID0gdXNlUmVmKGZhbHNlKTtcbiAgY29uc3QgZHJhZnRQZXJzaXN0VGltZXJSZWYgPSB1c2VSZWY8bnVtYmVyIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFttb2RhbEVycm9yLCBzZXRNb2RhbEVycm9yXSA9IHVzZVN0YXRlKFwiXCIpO1xuXHJcbiAgY29uc3QgeyBtb2RhbCwgb3BlbkNvbmZpcm0sIGNsb3NlQ29uZmlybSwgaGFuZGxlQ29uZmlybSB9ID0gdXNlQ29uZmlybURpYWxvZyh7XHJcbiAgICBkZWZhdWx0Q29uZmlybVRleHQ6IGluZFQoXCJDb25maXJtX1llc1wiLCBcIk9LXCIpLFxyXG4gICAgZGVmYXVsdENhbmNlbFRleHQ6IGluZFQoXCJDb25maXJtX05vXCIsIFwiQ2FuY2VsXCIpXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZU1vZGFsQ29uZmlybSA9IFJlYWN0LnVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcclxuICAgIHNldE1vZGFsRXJyb3IoXCJcIik7XHJcbiAgICBhd2FpdCBoYW5kbGVDb25maXJtKHtcclxuICAgICAgYnVzeSxcclxuICAgICAgb25FcnJvcjogKG1zZykgPT4ge1xyXG4gICAgICAgIHNldE1vZGFsRXJyb3IobXNnKTtcclxuICAgICAgICBzZXRTdGF0dXMobXNnKTtcclxuICAgICAgICBmbGFzaEFjdGlvbk1hcmsoXCJlcnJvclByb2Nlc3NcIiwgMTUwMCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0sIFtidXN5LCBoYW5kbGVDb25maXJtXSk7XHJcblxyXG4gIGNvbnN0IG1vZGFsTG9hZGluZ1RleHQgPSBpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpO1xyXG4gIGNvbnN0IG1vZGFsQ2FuY2VsVGV4dCA9IG1vZGFsLmNhbmNlbFRleHQgfHwgaW5kVChcIkNvbmZpcm1fTm9cIiwgXCJDYW5jZWxcIik7XHJcbiAgY29uc3QgbW9kYWxDb25maXJtVGV4dCA9IGJ1c3lcclxuICAgID8gbW9kYWxMb2FkaW5nVGV4dFxyXG4gICAgOiAoIWJ1c3kgJiYgbW9kYWxFcnJvciA/IGluZFQoXCJDb21tb25fT0tcIiwgXCJPS1wiKSA6IChtb2RhbC5jb25maXJtVGV4dCB8fCBpbmRUKFwiQ29uZmlybV9ZZXNcIiwgXCJPS1wiKSkpO1xyXG5cclxuICBjb25zdCBoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm0gPSBSZWFjdC51c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAoIWJ1c3kgJiYgbW9kYWxFcnJvcikge1xyXG4gICAgICBjbG9zZUNvbmZpcm0oKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaGFuZGxlTW9kYWxDb25maXJtKCk7XHJcbiAgfSwgW2J1c3ksIG1vZGFsRXJyb3IsIGNsb3NlQ29uZmlybSwgaGFuZGxlTW9kYWxDb25maXJtXSk7XHJcblxyXG4gIC8vIEJ1aWxkIGEgZHJhZnQgc25hcHNob3QgZm9yIHNlc3Npb25TdG9yYWdlLlxyXG4gIGNvbnN0IGJ1aWxkRHJhZnQgPSBSZWFjdC51c2VDYWxsYmFjayhcbiAgICAoKSA9PiAoe1xuICAgICAgc2VsZWN0ZWRDbGllbnQsXG4gICAgICBzZWxlY3RlZENvbnRhY3RzLFxuICAgICAgdmlzaXRUeXBlLFxyXG4gICAgICB0cmFuc0RhdGUsXHJcbiAgICAgIGRlc2NyaXB0aW9uLFxyXG4gICAgICBjb21lbnRhcmlvcyxcclxuICAgICAgYW50ZWNlZGVudGVzLFxyXG4gICAgICBjb25jbHVzaW9uZXMsXHJcbiAgICAgIHN0ZXAsXHJcbiAgICB9KSxcclxuICAgIFtzZWxlY3RlZENsaWVudCwgc2VsZWN0ZWRDb250YWN0cywgdmlzaXRUeXBlLCB0cmFuc0RhdGUsIGRlc2NyaXB0aW9uLCBjb21lbnRhcmlvcywgYW50ZWNlZGVudGVzLCBjb25jbHVzaW9uZXMsIHN0ZXBdXG4gICk7XG5cbiAgLy8gUGVyc2lzdCBhIGRyYWZ0IHNuYXBzaG90IHdpdGggZGVmZW5zaXZlIHN0b3JhZ2UgZ3VhcmRzLlxuICBjb25zdCBwZXJzaXN0RHJhZnRTbmFwc2hvdCA9IFJlYWN0LnVzZUNhbGxiYWNrKChkcmFmdCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFZJU0lUX0RSQUZUX0tFWSwgSlNPTi5zdHJpbmdpZnkoZHJhZnQpKTtcbiAgICB9IGNhdGNoIHtcbiAgICAgIC8qIGlnbm9yZSBxdW90YSBlcnJvcnMgKi9cbiAgICB9XG4gIH0sIFtdKTtcblxuICAvLyBTdG9yZSB0aGUgZHJhZnQgYmVmb3JlIGxlYXZpbmcgdGhlIHBhZ2UgdG8ga2VlcCBzdGVwIDIgb24gcmV0dXJuLlxuICBjb25zdCBwZXJzaXN0RHJhZnROb3cgPSBSZWFjdC51c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgcGVyc2lzdERyYWZ0U25hcHNob3QoYnVpbGREcmFmdCgpKTtcbiAgfSwgW2J1aWxkRHJhZnQsIHBlcnNpc3REcmFmdFNuYXBzaG90XSk7XG5cclxuICAvLyBPcGVucyB0aGUgZnVsbC1zY3JlZW4gdGV4dCBlZGl0b3IgZm9yIGEgbXVsdGlsaW5lIGZpZWxkLlxyXG4gIGNvbnN0IG9wZW5UZXh0RWRpdG9yID0gUmVhY3QudXNlQ2FsbGJhY2soXHJcbiAgICAoZmllbGRJZDogc3RyaW5nLCBmaWVsZExhYmVsOiBzdHJpbmcsIGZpZWxkVmFsdWU6IHN0cmluZywgb3B0aW9uczogeyBhbGxvd0VkaXQ/OiBib29sZWFuIH0gPSB7fSkgPT4ge1xyXG4gICAgY29uc3Qgc2FmZUlkID0gU3RyaW5nKGZpZWxkSWQgfHwgXCJcIikudHJpbSgpO1xyXG4gICAgY29uc3Qgc2FmZUxhYmVsID0gU3RyaW5nKGZpZWxkTGFiZWwgfHwgXCJcIikudHJpbSgpO1xyXG4gICAgY29uc3QgYWxsb3dFZGl0ID0gb3B0aW9ucz8uYWxsb3dFZGl0ICE9PSBmYWxzZTtcclxuICAgIGlmICghc2FmZUlkIHx8ICFzYWZlTGFiZWwpIHJldHVybjtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBrZXkgPSBgJHtURVhUX0VESVRPUl9QUkVGSVh9JHtzYWZlSWR9YDtcclxuICAgICAgLy8gUHJpbWUgdGhlIGVkaXRvciB3aXRoIHRoZSBjdXJyZW50IHZhbHVlIHdpdGhvdXQgcHVzaGluZyBsYXJnZSB0ZXh0IGludG8gdGhlIFVSTC5cclxuICAgICAgaWYgKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oa2V5KSA9PT0gbnVsbCkge1xyXG4gICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oa2V5LCBTdHJpbmcoZmllbGRWYWx1ZSB8fCBcIlwiKSk7XHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2gge1xyXG4gICAgICAvKiBpZ25vcmUgKi9cclxuICAgIH1cclxuXHJcbiAgICBwZXJzaXN0RHJhZnROb3coKTtcclxuICAgIGNvbnN0IHJldHVyblVybCA9IGAke3dpbmRvdy5sb2NhdGlvbi5wYXRobmFtZX0ke3dpbmRvdy5sb2NhdGlvbi5zZWFyY2ggfHwgXCJcIn1gO1xyXG4gICAgdHJ5IHtcclxuICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShgJHtURVhUX0VESVRPUl9QUkVGSVh9JHtzYWZlSWR9X3JldHVyblVybGAsIHJldHVyblVybCk7XHJcbiAgICB9IGNhdGNoIHtcclxuICAgICAgLyogaWdub3JlICovXHJcbiAgICB9XHJcbiAgICBjb25zdCB1cmwgPVxuICAgICAgYC9UZXh0RWRpdG9yUmVhY3QvRWRpdEZpZWxkP2ZpZWxkSWQ9JHtlbmNvZGVVUklDb21wb25lbnQoc2FmZUlkKX1gICtcbiAgICAgIGAmZmllbGRMYWJlbD0ke2VuY29kZVVSSUNvbXBvbmVudChzYWZlTGFiZWwpfWAgK1xuICAgICAgYCZyZXR1cm5Vcmw9JHtlbmNvZGVVUklDb21wb25lbnQocmV0dXJuVXJsKX1gICtcbiAgICAgIGAmYWxsb3dFZGl0PSR7YWxsb3dFZGl0ID8gXCIxXCIgOiBcIjBcIn1gO1xuXG4gICAgd2luZG93Ll9faW5kQnlwYXNzTmF2aWdhdGlvbkd1YXJkT25jZT8uKCk7XG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSB1cmw7XG4gICAgfSxcbiAgICBbcGVyc2lzdERyYWZ0Tm93XVxuICApO1xuXHJcbiAgY29uc3QgaGFuZGxlQ29tZW50YXJpb3NUYXAgPSBSZWFjdC51c2VDYWxsYmFjaygoZXZlbnQpID0+IHtcclxuICAgIGlmIChidXN5KSByZXR1cm47XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgb3BlblRleHRFZGl0b3IoZmllbGRJZENvbWVudGFyaW9zLCBpbmRUKFwiVmlzaXRzX0ZpZWxkX0NvbW1lbnRzXCIsIFwiQ29tbWVudHNcIiksIGNvbWVudGFyaW9zKTtcclxuICB9LCBbYnVzeSwgY29tZW50YXJpb3MsIG9wZW5UZXh0RWRpdG9yXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUNvbWVudGFyaW9zSG9sZCA9IFJlYWN0LnVzZUNhbGxiYWNrKCh0YXJnZXQsIGNsaWVudFkpID0+IHtcclxuICAgIGlmICghdGFyZ2V0IHx8ICFpc092ZXJmbG93aW5nKHRhcmdldCkpIHJldHVybiBmYWxzZTtcclxuICAgIHNldFByZXZpZXdBbmNob3IodGFyZ2V0KTtcclxuICAgIHJldHVybiBzaG93UHJldmlld1Rvb2x0aXAoU3RyaW5nKGNvbWVudGFyaW9zIHx8IFwiXCIpLCBjbGllbnRZKTtcclxuICB9LCBbY29tZW50YXJpb3NdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQW50ZWNlZGVudGVzVGFwID0gUmVhY3QudXNlQ2FsbGJhY2soKGV2ZW50KSA9PiB7XHJcbiAgICBpZiAoYnVzeSkgcmV0dXJuO1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIG9wZW5UZXh0RWRpdG9yKGZpZWxkSWRBbnRlY2VkZW50ZXMsIGluZFQoXCJWaXNpdHNfRmllbGRfQmFja2dyb3VuZFwiLCBcIkJhY2tncm91bmRcIiksIGFudGVjZWRlbnRlcyk7XHJcbiAgfSwgW2J1c3ksIGFudGVjZWRlbnRlcywgb3BlblRleHRFZGl0b3JdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQW50ZWNlZGVudGVzSG9sZCA9IFJlYWN0LnVzZUNhbGxiYWNrKCh0YXJnZXQsIGNsaWVudFkpID0+IHtcclxuICAgIGlmICghdGFyZ2V0IHx8ICFpc092ZXJmbG93aW5nKHRhcmdldCkpIHJldHVybiBmYWxzZTtcclxuICAgIHNldFByZXZpZXdBbmNob3IodGFyZ2V0KTtcclxuICAgIHJldHVybiBzaG93UHJldmlld1Rvb2x0aXAoU3RyaW5nKGFudGVjZWRlbnRlcyB8fCBcIlwiKSwgY2xpZW50WSk7XHJcbiAgfSwgW2FudGVjZWRlbnRlc10pO1xyXG5cclxuICBjb25zdCBoYW5kbGVDb25jbHVzaW9uZXNUYXAgPSBSZWFjdC51c2VDYWxsYmFjaygoZXZlbnQpID0+IHtcclxuICAgIGlmIChidXN5KSByZXR1cm47XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgb3BlblRleHRFZGl0b3IoZmllbGRJZENvbmNsdXNpb25lcywgaW5kVChcIlZpc2l0c19GaWVsZF9Db25jbHVzaW9uc1wiLCBcIkNvbmNsdXNpb25zXCIpLCBjb25jbHVzaW9uZXMpO1xyXG4gIH0sIFtidXN5LCBjb25jbHVzaW9uZXMsIG9wZW5UZXh0RWRpdG9yXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUNvbmNsdXNpb25lc0hvbGQgPSBSZWFjdC51c2VDYWxsYmFjaygodGFyZ2V0LCBjbGllbnRZKSA9PiB7XHJcbiAgICBpZiAoIXRhcmdldCB8fCAhaXNPdmVyZmxvd2luZyh0YXJnZXQpKSByZXR1cm4gZmFsc2U7XHJcbiAgICBzZXRQcmV2aWV3QW5jaG9yKHRhcmdldCk7XHJcbiAgICByZXR1cm4gc2hvd1ByZXZpZXdUb29sdGlwKFN0cmluZyhjb25jbHVzaW9uZXMgfHwgXCJcIiksIGNsaWVudFkpO1xyXG4gIH0sIFtjb25jbHVzaW9uZXNdKTtcclxuXHJcbiAgY29uc3QgY29tZW50YXJpb3NUYXAgPSB1c2VUYXBHdWFyZChoYW5kbGVDb21lbnRhcmlvc1RhcCwgaGFuZGxlQ29tZW50YXJpb3NIb2xkKTtcclxuICBjb25zdCBhbnRlY2VkZW50ZXNUYXAgPSB1c2VUYXBHdWFyZChoYW5kbGVBbnRlY2VkZW50ZXNUYXAsIGhhbmRsZUFudGVjZWRlbnRlc0hvbGQpO1xyXG4gIGNvbnN0IGNvbmNsdXNpb25lc1RhcCA9IHVzZVRhcEd1YXJkKGhhbmRsZUNvbmNsdXNpb25lc1RhcCwgaGFuZGxlQ29uY2x1c2lvbmVzSG9sZCk7XHJcblxyXG4gIGNvbnN0IGFwcGx5VGV4dEVkaXRvclZhbHVlcyA9IFJlYWN0LnVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGNvbnN0IHZhbENvbWVudGFyaW9zID0gcmVhZEFuZENsZWFyVGV4dEVkaXRvclZhbHVlKGZpZWxkSWRDb21lbnRhcmlvcyk7XHJcbiAgICBpZiAodmFsQ29tZW50YXJpb3MgIT09IG51bGwpIHNldENvbWVudGFyaW9zKHZhbENvbWVudGFyaW9zKTtcclxuXHJcbiAgICBjb25zdCB2YWxBbnRlY2VkZW50ZXMgPSByZWFkQW5kQ2xlYXJUZXh0RWRpdG9yVmFsdWUoZmllbGRJZEFudGVjZWRlbnRlcyk7XHJcbiAgICBpZiAodmFsQW50ZWNlZGVudGVzICE9PSBudWxsKSBzZXRBbnRlY2VkZW50ZXModmFsQW50ZWNlZGVudGVzKTtcclxuXHJcbiAgICBjb25zdCB2YWxDb25jbHVzaW9uZXMgPSByZWFkQW5kQ2xlYXJUZXh0RWRpdG9yVmFsdWUoZmllbGRJZENvbmNsdXNpb25lcyk7XHJcbiAgICBpZiAodmFsQ29uY2x1c2lvbmVzICE9PSBudWxsKSBzZXRDb25jbHVzaW9uZXModmFsQ29uY2x1c2lvbmVzKTtcclxuICB9LCBbZmllbGRJZENvbWVudGFyaW9zLCBmaWVsZElkQW50ZWNlZGVudGVzLCBmaWVsZElkQ29uY2x1c2lvbmVzXSk7XHJcblxyXG4gIC8vIENsZWFyIGNvbnRhY3RzIG9ubHkgd2hlbiB0aGUgY2xpZW50IGNoYW5nZXMgKGF2b2lkIGNsZWFyaW5nIG9uIHJlc3RvcmUvc3RlcCAyIHJldHVybikuXHJcbiAgY29uc3QgcHJldkNsaWVudFJlZiA9IHVzZVJlZihudWxsKTtcclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3QgY3VycmVudCA9IHNlbGVjdGVkQ2xpZW50Py52YWx1ZTtcclxuICAgIGlmIChwcmV2Q2xpZW50UmVmLmN1cnJlbnQgJiYgcHJldkNsaWVudFJlZi5jdXJyZW50ICE9PSBjdXJyZW50KSB7XHJcbiAgICAgIHNldFNlbGVjdGVkQ29udGFjdHMoW10pO1xyXG4gICAgfVxyXG4gICAgcHJldkNsaWVudFJlZi5jdXJyZW50ID0gY3VycmVudDtcclxuICB9LCBbc2VsZWN0ZWRDbGllbnQ/LnZhbHVlXSk7XHJcblxyXG4gIGNvbnN0IGxhc3RDbGllbnRSZWYgPSB1c2VSZWYobnVsbCk7XHJcblxyXG4gIC8vIElmIHRoZSBjbGllbnQgY2hhbmdlcyBhZnRlciBzZWxlY3RpbmcgY29udGFjdHMsIHJlc2V0IHRoZSBlbnRpcmUgZm9ybS5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3QgY3VycmVudCA9IHNlbGVjdGVkQ2xpZW50Py52YWx1ZTtcclxuICAgIGlmICghY3VycmVudCkgcmV0dXJuO1xyXG5cclxuICAgIGlmIChsYXN0Q2xpZW50UmVmLmN1cnJlbnQgJiYgbGFzdENsaWVudFJlZi5jdXJyZW50ICE9PSBjdXJyZW50KSB7XHJcbiAgICAgIHNldFN0ZXAoMSk7XHJcbiAgICAgIHNldFNlbGVjdGVkQ29udGFjdHMoW10pO1xyXG4gICAgICBzZXRWaXNpdFR5cGUoZGVmYXVsdFZpc2l0VHlwZSk7XHJcbiAgICAgIHNldFRyYW5zRGF0ZSh0b2RheVN0cmluZygpKTtcclxuICAgICAgc2V0RGVzY3JpcHRpb24oXCJcIik7XHJcbiAgICAgIHNldENvbWVudGFyaW9zKFwiXCIpO1xyXG4gICAgICBzZXRBbnRlY2VkZW50ZXMoXCJcIik7XHJcbiAgICAgIHNldENvbmNsdXNpb25lcyhcIlwiKTtcclxuICAgICAgc2V0U3RhdHVzKFwiXCIpO1xyXG4gICAgICBzZXRCdXN5KGZhbHNlKTtcclxuICAgIH1cclxuICAgIGxhc3RDbGllbnRSZWYuY3VycmVudCA9IGN1cnJlbnQ7XHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVhY3QtaG9va3MvZXhoYXVzdGl2ZS1kZXBzXHJcbiAgfSwgW3NlbGVjdGVkQ2xpZW50Py52YWx1ZV0pO1xyXG5cclxuICAvLyBQZXJzaXN0IGRyYWZ0IGluIHNlc3Npb25TdG9yYWdlIChza2lwIHVudGlsIHdlIHJlc3RvcmVkIGFueSBzYXZlZCBkcmFmdCkuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFkcmFmdFJlc3RvcmVkUmVmLmN1cnJlbnQpIHJldHVybjtcblxuICAgIGlmIChkcmFmdFBlcnNpc3RUaW1lclJlZi5jdXJyZW50KSB7XG4gICAgICBjbGVhclRpbWVvdXQoZHJhZnRQZXJzaXN0VGltZXJSZWYuY3VycmVudCk7XG4gICAgfVxuXG4gICAgZHJhZnRQZXJzaXN0VGltZXJSZWYuY3VycmVudCA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGRyYWZ0UGVyc2lzdFRpbWVyUmVmLmN1cnJlbnQgPSBudWxsO1xuICAgICAgcGVyc2lzdERyYWZ0U25hcHNob3QoYnVpbGREcmFmdCgpKTtcbiAgICB9LCAxODApO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGlmIChkcmFmdFBlcnNpc3RUaW1lclJlZi5jdXJyZW50KSB7XG4gICAgICAgIGNsZWFyVGltZW91dChkcmFmdFBlcnNpc3RUaW1lclJlZi5jdXJyZW50KTtcbiAgICAgICAgZHJhZnRQZXJzaXN0VGltZXJSZWYuY3VycmVudCA9IG51bGw7XG4gICAgICB9XG4gICAgfTtcbiAgfSwgW2J1aWxkRHJhZnQsIHBlcnNpc3REcmFmdFNuYXBzaG90XSk7XG5cclxuICAvLyBSZXN0b3JlIGRyYWZ0IG9uIG1vdW50XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgbGV0IGZyZXNoTG9hZCA9IGZhbHNlO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB1cmwgPSBuZXcgVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcbiAgICAgIGZyZXNoTG9hZCA9IHVybC5zZWFyY2hQYXJhbXMuaGFzKENSRUFURV9GUkVTSF9QQVJBTSk7XG4gICAgfSBjYXRjaCB7XG4gICAgICBmcmVzaExvYWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoZnJlc2hMb2FkKSB7XG4gICAgICBjbGVhckNyZWF0ZVNlbGVjdGlvbkNhY2hlKCk7XG4gICAgICBzdHJpcEZyZXNoUGFyYW0oKTtcbiAgICAgIGRyYWZ0UmVzdG9yZWRSZWYuY3VycmVudCA9IHRydWU7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IHNob3VsZFNob3cgPSBmYWxzZTtcbiAgICB0cnkge1xuICAgICAgc2hvdWxkU2hvdyA9ICEhKFxuICAgICAgICBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFZJU0lUX0RSQUZUX0tFWSkgfHxcbiAgICAgICAgc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShDT05UQUNUU19TVE9SQUdFX0tFWSkgfHxcbiAgICAgICAgc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShDT05UQUNUU19TRUxFQ1RJT05fS0VZKVxyXG4gICAgICApO1xyXG4gICAgfSBjYXRjaCB7XHJcbiAgICAgIC8qIGlnbm9yZSBzdG9yYWdlIGFjY2VzcyAqL1xyXG4gICAgfVxyXG4gICAgaWYgKHNob3VsZFNob3cpIHtcclxuICAgICAgc2hvd0dsb2JhbFNwaW5uZXIoaW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKSk7XHJcbiAgICB9XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCByYXcgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFZJU0lUX0RSQUZUX0tFWSk7XHJcbiAgICAgIGlmIChyYXcpIHtcclxuICAgICAgICBjb25zdCBkcmFmdCA9IEpTT04ucGFyc2UocmF3KTtcclxuICAgICAgICBpZiAoZHJhZnQ/LnNlbGVjdGVkQ2xpZW50Py52YWx1ZSkgc2V0U2VsZWN0ZWRDbGllbnQoZHJhZnQuc2VsZWN0ZWRDbGllbnQpO1xyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGRyYWZ0Py5zZWxlY3RlZENvbnRhY3RzKSkgc2V0U2VsZWN0ZWRDb250YWN0cyhkcmFmdC5zZWxlY3RlZENvbnRhY3RzKTtcclxuICAgICAgICBpZiAoZHJhZnQ/LnZpc2l0VHlwZSAhPT0gdW5kZWZpbmVkKSBzZXRWaXNpdFR5cGUoZHJhZnQudmlzaXRUeXBlKTtcclxuICAgICAgICBpZiAoZHJhZnQ/LnRyYW5zRGF0ZSkgc2V0VHJhbnNEYXRlKGRyYWZ0LnRyYW5zRGF0ZSk7XHJcbiAgICAgICAgaWYgKGRyYWZ0Py5kZXNjcmlwdGlvbiAhPT0gdW5kZWZpbmVkKSBzZXREZXNjcmlwdGlvbihkcmFmdC5kZXNjcmlwdGlvbik7XHJcbiAgICAgICAgaWYgKGRyYWZ0Py5jb21lbnRhcmlvcyAhPT0gdW5kZWZpbmVkKSBzZXRDb21lbnRhcmlvcyhkcmFmdC5jb21lbnRhcmlvcyk7XHJcbiAgICAgICAgaWYgKGRyYWZ0Py5hbnRlY2VkZW50ZXMgIT09IHVuZGVmaW5lZCkgc2V0QW50ZWNlZGVudGVzKGRyYWZ0LmFudGVjZWRlbnRlcyk7XHJcbiAgICAgICAgaWYgKGRyYWZ0Py5jb25jbHVzaW9uZXMgIT09IHVuZGVmaW5lZCkgc2V0Q29uY2x1c2lvbmVzKGRyYWZ0LmNvbmNsdXNpb25lcyk7XHJcbiAgICAgICAgaWYgKGRyYWZ0Py5zdGVwID09PSAyKSBzZXRTdGVwKDIpO1xyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIHtcclxuICAgICAgLyogaWdub3JlIHBhcnNlIGlzc3VlcyAqL1xyXG4gICAgfSBmaW5hbGx5IHtcclxuICAgICAgaWYgKHNob3VsZFNob3cpIHtcclxuICAgICAgICBoaWRlR2xvYmFsU3Bpbm5lcigpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBkcmFmdFJlc3RvcmVkUmVmLmN1cnJlbnQgPSB0cnVlO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgLy8gQXBwbHkgcGVuZGluZyB2YWx1ZXMgY29taW5nIGZyb20gdGhlIGZ1bGwtc2NyZWVuIHRleHQgZWRpdG9yLlxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBhcHBseVRleHRFZGl0b3JWYWx1ZXMoKTtcclxuICAgIGNvbnN0IG9uUGFnZVNob3cgPSAoKSA9PiBhcHBseVRleHRFZGl0b3JWYWx1ZXMoKTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicGFnZXNob3dcIiwgb25QYWdlU2hvdyk7XHJcbiAgICByZXR1cm4gKCkgPT4gd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwYWdlc2hvd1wiLCBvblBhZ2VTaG93KTtcclxuICB9LCBbYXBwbHlUZXh0RWRpdG9yVmFsdWVzXSk7XHJcblxyXG4gIGNvbnN0IGNhbkdvTmV4dCA9ICEhc2VsZWN0ZWRDbGllbnQ7XG4gIGNvbnN0IGNhbkNyZWF0ZSA9XG4gICAgISFzZWxlY3RlZENsaWVudCAmJlxuICAgIFN0cmluZyh2aXNpdFR5cGUgfHwgXCJcIikudHJpbSgpICE9PSBcIlwiICYmXG4gICAgU3RyaW5nKHZpc2l0VHlwZSkgIT09IFwiMFwiICYmXG4gICAgZGVzY3JpcHRpb24udHJpbSgpLmxlbmd0aCA+IDAgJiZcbiAgICBjb21lbnRhcmlvcy50cmltKCkubGVuZ3RoID4gMDtcblxuICBjb25zdCBoYXNBY3RpdmVQcm9jZXNzID0gdXNlTWVtbygoKSA9PiB7XG4gICAgaWYgKGJ1c3kpIHJldHVybiB0cnVlO1xuICAgIGlmIChzdGVwID4gMSkgcmV0dXJuIHRydWU7XG4gICAgaWYgKHNlbGVjdGVkQ2xpZW50KSByZXR1cm4gdHJ1ZTtcbiAgICBpZiAoc2VsZWN0ZWRDb250YWN0cy5sZW5ndGggPiAwKSByZXR1cm4gdHJ1ZTtcbiAgICByZXR1cm4gKFxuICAgICAgZGVzY3JpcHRpb24udHJpbSgpLmxlbmd0aCA+IDAgfHxcbiAgICAgIGNvbWVudGFyaW9zLnRyaW0oKS5sZW5ndGggPiAwIHx8XG4gICAgICBhbnRlY2VkZW50ZXMudHJpbSgpLmxlbmd0aCA+IDAgfHxcbiAgICAgIGNvbmNsdXNpb25lcy50cmltKCkubGVuZ3RoID4gMFxuICAgICk7XG4gIH0sIFthbnRlY2VkZW50ZXMsIGJ1c3ksIGNvbWVudGFyaW9zLCBjb25jbHVzaW9uZXMsIGRlc2NyaXB0aW9uLCBzZWxlY3RlZENsaWVudCwgc2VsZWN0ZWRDb250YWN0cy5sZW5ndGgsIHN0ZXBdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHdpbmRvdy5fX2luZFNldE5hdmlnYXRpb25HdWFyZD8uKGhhc0FjdGl2ZVByb2Nlc3MpO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB3aW5kb3cuX19pbmRDbGVhck5hdmlnYXRpb25HdWFyZD8uKCk7XG4gICAgfTtcbiAgfSwgW2hhc0FjdGl2ZVByb2Nlc3NdKTtcblxyXG4gIHVzZVRvcGJhcihcclxuICAgIHN0ZXAsXHJcbiAgICBjYW5Hb05leHQsXHJcbiAgICAoKSA9PiB7XHJcbiAgICAgIGlmICghY2FuQ3JlYXRlVmlzaXQpIHtcclxuICAgICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChzdGVwID09PSAxICYmIGNhbkdvTmV4dCkgc2V0U3RlcCgyKTtcclxuICAgICAgaWYgKHN0ZXAgPT09IDIpIGhhbmRsZVN1Ym1pdCgpO1xyXG4gICAgfSxcclxuICAgICgpID0+IHNldFN0ZXAoMSksXHJcbiAgICBidXN5LFxyXG4gICAgY2FuQ3JlYXRlLFxyXG4gICAgY2FuQ3JlYXRlVmlzaXRcclxuICApO1xyXG5cclxuICBjb25zdCBkb0NyZWF0ZSA9IGFzeW5jICgpID0+IHtcclxuICAgIGlmIChidXN5KSByZXR1cm4gZmFsc2U7XHJcbiAgICBpZiAoIWNhbkNyZWF0ZVZpc2l0KSB7XHJcbiAgICAgIHNob3dQZXJtaXNzaW9uTW9kYWwoKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgc2V0TW9kYWxFcnJvcihcIlwiKTtcclxuICAgIGlmICghc2VsZWN0ZWRDbGllbnQpIHtcbiAgICAgIHNldFN0YXR1cyhpbmRUKFwiVmlzaXRzX0NyZWF0ZV9TZWxlY3RDbGllbnRSZXF1aXJlZFwiLCBcIlNlbGVjdCBhIGNsaWVudC5cIikpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoU3RyaW5nKHZpc2l0VHlwZSB8fCBcIlwiKSA9PT0gXCJcIiB8fCBTdHJpbmcodmlzaXRUeXBlKSA9PT0gXCIwXCIgfHwgIWRlc2NyaXB0aW9uLnRyaW0oKSB8fCAhY29tZW50YXJpb3MudHJpbSgpKSB7XG4gICAgICBzZXRTaG93UmVxdWlyZWQodHJ1ZSk7XG4gICAgICBzZXRTdGF0dXMoaW5kVChcIlZpc2l0c19DcmVhdGVfQ29tcGxldGVSZXF1aXJlZFwiLCBcIkNvbXBsZXRlIHJlcXVpcmVkIGZpZWxkcy5cIikpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgc2V0QnVzeSh0cnVlKTtcclxuICAgIHNldFN0YXR1cyhpbmRUKFwiVmlzaXRzX0NyZWF0ZV9DcmVhdGluZ0FjdGl2aXR5XCIsIFwiQ3JlYXRpbmcgYWN0aXZpdHkuLi5cIikpO1xyXG5cclxuICAgIGxldCBjcmVhdGVkUmVjSWQgPSBcIlwiO1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcGF5bG9hZEFjdGl2aXR5ID0ge1xyXG4gICAgICAgIGFjY291bnROdW06IHNlbGVjdGVkQ2xpZW50LnZhbHVlLFxyXG4gICAgICAgIHZpc2l0VHlwZSxcclxuICAgICAgICBkZXNjcmlwdGlvbixcclxuICAgICAgICB0cmFuc0RhdGUsXHJcbiAgICAgICAgY29tZW50YXJpb3MsXHJcbiAgICAgICAgYW50ZWNlZGVudGVzLFxyXG4gICAgICAgIGNvbmNsdXNpb25lcyxcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGNvbnN0IHJlc0FjdCA9IGF3YWl0IGZldGNoSnNvbihcIi9WaXNpdGFzL0NyZWF0ZUFjdGl2aXR5XCIsIHtcclxuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcclxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXlsb2FkQWN0aXZpdHkpLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmICghcmVzQWN0LnN1Y2Nlc3MpIHRocm93IG5ldyBFcnJvcihyZXNBY3QubWVzc2FnZSB8fCBpbmRUKFwiVmlzaXRzX0NyZWF0ZV9DcmVhdGVBY3Rpdml0eUZhaWxlZFwiLCBcIkZhaWxlZCB0byBjcmVhdGUgYWN0aXZpdHkuXCIpKTtcclxuXHJcbiAgICAgIGNvbnN0IHJlY0lkQWN0aXZpZGFkID1cclxuICAgICAgICBpbmRFeHRyYWN0U2lnbmVkSWQocmVzQWN0LmRhdGEpIHx8XHJcbiAgICAgICAgaW5kRXh0cmFjdFNpZ25lZElkKHJlc0FjdC5tZXNzYWdlKSB8fFxyXG4gICAgICAgIGluZEV4dHJhY3RTaWduZWRJZChpbmRFeHRyYWN0SWQocmVzQWN0LmRhdGEpIHx8IGluZEV4dHJhY3RJZChyZXNBY3QubWVzc2FnZSkpO1xyXG4gICAgICBpZiAoIXJlY0lkQWN0aXZpZGFkKSB0aHJvdyBuZXcgRXJyb3IoaW5kVChcIlZpc2l0c19DcmVhdGVfQ3JlYXRlQWN0aXZpdHlGYWlsZWRcIiwgXCJGYWlsZWQgdG8gY3JlYXRlIGFjdGl2aXR5LlwiKSk7XG4gICAgICBjcmVhdGVkUmVjSWQgPSBTdHJpbmcocmVjSWRBY3RpdmlkYWQpO1xuXG4gICAgICBpZiAoc2VsZWN0ZWRDb250YWN0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnN0IGFzc2lzdGFudEJhdGNoU2l6ZSA9IDQ7XG4gICAgICAgIGNvbnN0IGNyZWF0ZUFzc2lzdGFudCA9IGFzeW5jIChjb250YWN0KSA9PiB7XG4gICAgICAgICAgY29uc3QgcGF5bG9hZFZpc2l0YSA9IHtcbiAgICAgICAgICAgIHJlZlJlY0lkQWN0aXZpZGFkOiByZWNJZEFjdGl2aWRhZCxcbiAgICAgICAgICAgIGFzaXN0ZW50ZVRpcG86IGRlZmF1bHRBc2lzdGVudGVUaXBvLFxuICAgICAgICAgICAgYXNpc3RlbnRlSWQ6IGNvbnRhY3QudGV4dCxcbiAgICAgICAgICAgIGNvbnRhY3RvUmVjSWQ6IGNvbnRhY3QudmFsdWUsXG4gICAgICAgICAgfTtcbiAgICAgICAgICBjb25zdCByZXNWaXMgPSBhd2FpdCBmZXRjaEpzb24oXCIvVmlzaXRhcy9DcmVhdGVWaXNpdGFBc2lzdGVudGVcIiwge1xuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHBheWxvYWRWaXNpdGEpLFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGlmICghcmVzVmlzLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihyZXNWaXMubWVzc2FnZSB8fCBpbmRUKFwiVmlzaXRzX0NyZWF0ZV9DcmVhdGVWaXNpdEZhaWxlZFwiLCBcIkZhaWxlZCB0byBjcmVhdGUgdmlzaXQuXCIpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgZm9yIChsZXQgaWR4ID0gMDsgaWR4IDwgc2VsZWN0ZWRDb250YWN0cy5sZW5ndGg7IGlkeCArPSBhc3Npc3RhbnRCYXRjaFNpemUpIHtcbiAgICAgICAgICBjb25zdCBiYXRjaCA9IHNlbGVjdGVkQ29udGFjdHMuc2xpY2UoaWR4LCBpZHggKyBhc3Npc3RhbnRCYXRjaFNpemUpO1xuICAgICAgICAgIGNvbnN0IGZpcnN0ID0gYmF0Y2hbMF07XG4gICAgICAgICAgaWYgKGZpcnN0KSB7XG4gICAgICAgICAgICBzZXRTdGF0dXMoaW5kRm9ybWF0KFwiVmlzaXRzX0NyZWF0ZV9DcmVhdGluZ1Zpc2l0Rm9yXCIsIFwiQ3JlYXRpbmcgdmlzaXQgZm9yIHswfS4uLlwiLCBmaXJzdC50ZXh0KSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGF3YWl0IFByb21pc2UuYWxsKGJhdGNoLm1hcCgoY29udGFjdCkgPT4gY3JlYXRlQXNzaXN0YW50KGNvbnRhY3QpKSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxyXG4gICAgICB0cnkge1xyXG4gICAgICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oVklTSVRfRFJBRlRfS0VZKTtcclxuICAgICAgfSBjYXRjaCB7XHJcbiAgICAgICAgLyogaWdub3JlICovXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNldEhpc3RvcnlGaWx0ZXJGb3JEYXRlKHRyYW5zRGF0ZSwgdHJ1ZSk7XG4gICAgICBjbG9zZUNvbmZpcm0oKTtcbiAgICAgIGF3YWl0IHdhaXQoMjAwKTtcbiAgICAgIGZsYXNoQWN0aW9uTWFyayhcIm9rUHJvY2Vzc1wiLCAxMjAwKTtcbiAgICAgIGF3YWl0IHdhaXQoMTIwMCk7XG4gICAgICB3aW5kb3cuX19pbmRCeXBhc3NOYXZpZ2F0aW9uR3VhcmRPbmNlPy4oKTtcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvSGlzdG9yaWFsL0hpc3RvcnlcIjtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgaWYgKGNyZWF0ZWRSZWNJZCAmJiBjYW5Sb2xsYmFja0RlbGV0ZSkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICBzZXRTdGF0dXMoaW5kVChcIlZpc2l0c19DcmVhdGVfUm9sbGJhY2tcIiwgXCJSb2xsaW5nIGJhY2sgYWN0aXZpdHkuLi5cIikpO1xyXG4gICAgICAgICAgYXdhaXQgZmV0Y2hKc29uKGAvVmlzaXRhcy9EZWxldGVBY3Rpdml0eS8ke2VuY29kZVVSSUNvbXBvbmVudChjcmVhdGVkUmVjSWQpfWAsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcIkRFTEVURVwiLFxyXG4gICAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gY2F0Y2gge1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBjb25zdCBtc2cgPSBlLm1lc3NhZ2UgfHwgaW5kVChcIlZpc2l0c19DcmVhdGVfQ3JlYXRlVmlzaXRFcnJvclwiLCBcIkZhaWxlZCB0byBjcmVhdGUgdGhlIHZpc2l0LlwiKTtcclxuICAgICAgc2V0TW9kYWxFcnJvcihtc2cpO1xyXG4gICAgICBzZXRTdGF0dXMobXNnKTtcclxuICAgICAgZmxhc2hBY3Rpb25NYXJrKFwiZXJyb3JQcm9jZXNzXCIsIDE1MDApO1xyXG4gICAgICBzZXRCdXN5KGZhbHNlKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGNvbnN0IGhhbmRsZVN1Ym1pdCA9ICgpID0+IHtcclxuICAgIGlmIChidXN5KSByZXR1cm47XHJcbiAgICBpZiAoIWNhbkNyZWF0ZVZpc2l0KSB7XHJcbiAgICAgIHNob3dQZXJtaXNzaW9uTW9kYWwoKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKG1vZGFsLm9wZW4pIHJldHVybjtcclxuICAgIGlmICghc2VsZWN0ZWRDbGllbnQpIHtcbiAgICAgIHNldFN0YXR1cyhpbmRUKFwiVmlzaXRzX0NyZWF0ZV9TZWxlY3RDbGllbnRSZXF1aXJlZFwiLCBcIlNlbGVjdCBhIGNsaWVudC5cIikpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoU3RyaW5nKHZpc2l0VHlwZSB8fCBcIlwiKSA9PT0gXCJcIiB8fCBTdHJpbmcodmlzaXRUeXBlKSA9PT0gXCIwXCIgfHwgIWRlc2NyaXB0aW9uLnRyaW0oKSB8fCAhY29tZW50YXJpb3MudHJpbSgpKSB7XG4gICAgICBzZXRTaG93UmVxdWlyZWQodHJ1ZSk7XG4gICAgICBzZXRTdGF0dXMoaW5kVChcIlZpc2l0c19DcmVhdGVfQ29tcGxldGVSZXF1aXJlZFwiLCBcIkNvbXBsZXRlIHJlcXVpcmVkIGZpZWxkcy5cIikpO1xuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgc2V0TW9kYWxFcnJvcihcIlwiKTtcclxuICAgIG9wZW5Db25maXJtKHtcclxuICAgICAgdGl0bGU6IGluZFQoXCJWaXNpdHNfQ3JlYXRlX0NvbmZpcm1DcmVhdGVfVGl0bGVcIiwgXCJDb25maXJtIGNyZWF0ZVwiKSxcclxuICAgICAgbWVzc2FnZTogaW5kVChcIlZpc2l0c19DcmVhdGVfQ29uZmlybUNyZWF0ZV9Cb2R5XCIsIFwiRG8geW91IHdhbnQgdG8gY3JlYXRlIHRoaXMgdmlzaXQ/XCIpLFxyXG4gICAgICBjb25maXJtVGV4dDogaW5kVChcIkNvbmZpcm1fWWVzXCIsIFwiT0tcIiksXHJcbiAgICAgIG9uQ29uZmlybTogZG9DcmVhdGUsXHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKHN0ZXAgPT09IDEpIHtcclxuICAgICAgc2V0U2hvd1JlcXVpcmVkKGZhbHNlKTtcclxuICAgICAgY2xvc2VDb25maXJtKCk7XHJcbiAgICB9XHJcbiAgfSwgW3N0ZXAsIGNsb3NlQ29uZmlybV0pO1xyXG5cclxuICBjb25zdCB2aXNpdFR5cGVJbnZhbGlkID0gc2hvd1JlcXVpcmVkICYmIChTdHJpbmcodmlzaXRUeXBlIHx8IFwiXCIpID09PSBcIlwiIHx8IFN0cmluZyh2aXNpdFR5cGUpID09PSBcIjBcIik7XHJcbiAgY29uc3QgZGVzY3JpcHRpb25JbnZhbGlkID0gc2hvd1JlcXVpcmVkICYmIGRlc2NyaXB0aW9uLnRyaW0oKS5sZW5ndGggPT09IDA7XHJcbiAgY29uc3QgY29tZW50YXJpb3NJbnZhbGlkID0gc2hvd1JlcXVpcmVkICYmIGNvbWVudGFyaW9zLnRyaW0oKS5sZW5ndGggPT09IDA7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNFwiPlxyXG4gICAgICA8Q29uZmlybU1vZGFsXHJcbiAgICAgICAgb3Blbj17bW9kYWwub3Blbn1cclxuICAgICAgICB0aXRsZT17bW9kYWwudGl0bGV9XHJcbiAgICAgICAgbWVzc2FnZT17bW9kYWwubWVzc2FnZX1cclxuICAgICAgICBjb25maXJtVGV4dD17bW9kYWxDb25maXJtVGV4dH1cclxuICAgICAgICBjYW5jZWxUZXh0PXttb2RhbENhbmNlbFRleHR9XHJcbiAgICAgICAgbG9hZGluZ1RleHQ9e21vZGFsTG9hZGluZ1RleHR9XHJcbiAgICAgICAgc2hvd0NhbmNlbD17bW9kYWwuc2hvd0NhbmNlbH1cclxuICAgICAgICBzaG93Q29uZmlybT17bW9kYWwuc2hvd0NvbmZpcm19XHJcbiAgICAgICAgYnVzeT17YnVzeX1cclxuICAgICAgICBlcnJvcj17bW9kYWxFcnJvcn1cclxuICAgICAgICBzdGF0dXM9e3N0YXR1c31cclxuICAgICAgICBvbkNvbmZpcm09e2hhbmRsZU1vZGFsQnV0dG9uQ29uZmlybX1cclxuICAgICAgICBvbkNhbmNlbD17Y2xvc2VDb25maXJtfVxyXG4gICAgICAvPlxyXG4gICAgICB7c3RlcCA9PT0gMSAmJiAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTZcIj5cclxuICAgICAgICAgIDxDbGllbnRTZWFyY2hDb21ib2JveFxuICAgICAgICAgICAgdmFsdWU9e3NlbGVjdGVkQ2xpZW50fVxuICAgICAgICAgICAgb25TZWxlY3RlZD17c2V0U2VsZWN0ZWRDbGllbnR9XG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIlZpc2l0c19DcmVhdGVfU2VhcmNoQ2xpZW50XCIsIFwiU2VhcmNoIGNsaWVudFwiKX1cbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRGb3JtYXQoXCJWaXNpdHNfQ3JlYXRlX0NsaWVudFBsYWNlaG9sZGVyXCIsIFwiVHlwZSBhdCBsZWFzdCB7MH0gY2hhcmFjdGVycy4uLlwiLCA0KX1cbiAgICAgICAgICAgIHBvcnRhbENsYXNzTmFtZT1cInZpc2l0YXMtdHlwb2dyYXBoeVwiXG4gICAgICAgICAgLz5cblxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTNcIj5cclxuICAgICAgICAgICAgPENvbnRhY3RzQ29tYm9ib3hcbiAgICAgICAgICAgICAgYWNjb3VudE51bT17c2VsZWN0ZWRDbGllbnQ/LnZhbHVlfVxuICAgICAgICAgICAgICB2YWx1ZT17c2VsZWN0ZWRDb250YWN0c31cbiAgICAgICAgICAgICAgb25DaGFuZ2U9e3NldFNlbGVjdGVkQ29udGFjdHN9XG4gICAgICAgICAgICAgIHBvcnRhbENsYXNzTmFtZT1cInZpc2l0YXMtdHlwb2dyYXBoeVwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAge3NlbGVjdGVkQ29udGFjdHMubGVuZ3RoID4gMCAmJiAoXHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNjAwXCI+XHJcbiAgICAgICAgICAgICAgICB7aW5kRm9ybWF0KFwiVmlzaXRzX0NyZWF0ZV9TZWxlY3RlZENvbnRhY3RzQ291bnRcIiwgXCJ7MH0gc2VsZWN0ZWQgY29udGFjdChzKVwiLCBzZWxlY3RlZENvbnRhY3RzLmxlbmd0aCl9XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgKX1cclxuXHJcbiAgICAgIHtzdGVwID09PSAyICYmIChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNoYWRvdy14cyBnbGFzcy1wYW5lbCBwLTQgc3BhY2UteS00IGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHJvdW5kZWQtMnhsXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtYmFzZSBmb250LXNlbWlib2xkIHRleHQtc2xhdGUtOTAwIGJvcmRlci1iIGJvcmRlci1zbGF0ZS0yMDAgcGItM1wiPlxyXG4gICAgICAgICAgICB7aW5kVChcIlZpc2l0c19DcmVhdGVfVmlzaXREYXRhX1RpdGxlXCIsIFwiVmlzaXQgZGV0YWlsc1wiKX1cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0yIGdhcC00XCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidmlzaXRhLWZpZWxkLXRleHRcIj5cclxuICAgICAgICAgICAgICA8U2luZ2xlRGF0ZVBpY2tlciBsYWJlbD17aW5kVChcIlZpc2l0c19EZXRhaWxfRGF0ZV9MYWJlbFwiLCBcIkRhdGVcIil9IHZhbHVlPXt0cmFuc0RhdGV9IG9uQ2hhbmdlPXtzZXRUcmFuc0RhdGV9IC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8U2VsZWN0Q29tYm9ib3hcbiAgICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJWaXNpdHNfRGV0YWlsX1Zpc2l0VHlwZV9MYWJlbFwiLCBcIlZpc2l0IHR5cGVcIil9XG4gICAgICAgICAgICAgIG9wdGlvbnM9e3Zpc2l0VHlwZXN9XG4gICAgICAgICAgICAgIHZhbHVlPXt2aXNpdFR5cGV9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXtzZXRWaXNpdFR5cGV9XG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiVmlzaXRzX0RldGFpbF9WaXNpdFR5cGVfUGxhY2Vob2xkZXJcIiwgXCJTZWxlY3QgdHlwZVwiKX1cbiAgICAgICAgICAgICAgaW52YWxpZD17dmlzaXRUeXBlSW52YWxpZH1cbiAgICAgICAgICAgICAgZW1pdE9uVmFsdWVDaGFuZ2VcbiAgICAgICAgICAgICAgcG9ydGFsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIGdhcC0zXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yXCI+XHJcbiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZFwiPntpbmRUKFwiVmlzaXRzX0ZpZWxkX0Rlc2NyaXB0aW9uXCIsIFwiRGVzY3JpcHRpb25cIil9PC9sYWJlbD5cclxuICAgICAgICAgICAgICA8aW5wdXRcclxuICAgICAgICAgICAgICAgIGlkPVwiZGVzY3JpcHRpb25cIlxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxyXG4gICAgICAgICAgICAgICAgICBcImZvcm0tY29udHJvbFwiLFxyXG4gICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbkludmFsaWRcclxuICAgICAgICAgICAgICAgICAgICA/IFwiYm9yZGVyLXJvc2UtNDAwIGJnLXJvc2UtNTAgZm9jdXM6cmluZy1yb3NlLTIwMCBmb2N1czpib3JkZXItcm9zZS00MDBcIlxyXG4gICAgICAgICAgICAgICAgICAgIDogXCJib3JkZXItc2xhdGUtMjAwIGZvY3VzOnJpbmctcHJpbWFyeSBmb2N1czpib3JkZXItcHJpbWFyeVwiXHJcbiAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgICAgbWF4TGVuZ3RoPXsyMDB9XHJcbiAgICAgICAgICAgICAgICB2YWx1ZT17ZGVzY3JpcHRpb259XHJcbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldERlc2NyaXB0aW9uKGUudGFyZ2V0LnZhbHVlKX1cclxuICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cclxuICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZm9ybS1sYWJlbCBmb250LXNlbWlib2xkXCI+e2luZFQoXCJWaXNpdHNfRmllbGRfQ29tbWVudHNcIiwgXCJDb21tZW50c1wiKX08L2xhYmVsPlxyXG4gICAgICAgICAgICAgIDx0ZXh0YXJlYVxyXG4gICAgICAgICAgICAgICAgaWQ9XCJjb21lbnRhcmlvc1wiXHJcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcclxuICAgICAgICAgICAgICAgICAgICBcImZvcm0tY29udHJvbCBjdXJzb3ItcG9pbnRlclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbWVudGFyaW9zSW52YWxpZFxyXG4gICAgICAgICAgICAgICAgICAgICAgPyBcImJvcmRlci1yb3NlLTQwMCBiZy1yb3NlLTUwIGZvY3VzOnJpbmctcm9zZS0yMDAgZm9jdXM6Ym9yZGVyLXJvc2UtNDAwXCJcclxuICAgICAgICAgICAgICAgICAgICAgIDogXCJib3JkZXItc2xhdGUtMjAwIGZvY3VzOnJpbmctcHJpbWFyeSBmb2N1czpib3JkZXItcHJpbWFyeVwiXHJcbiAgICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICB2YWx1ZT17Y29tZW50YXJpb3N9XHJcbiAgICAgICAgICAgICAgICByZWFkT25seVxyXG4gICAgICAgICAgICAgICAgb25Qb2ludGVyRG93bj17Y29tZW50YXJpb3NUYXAub25Qb2ludGVyRG93bn1cclxuICAgICAgICAgICAgICAgIG9uUG9pbnRlck1vdmU9e2NvbWVudGFyaW9zVGFwLm9uUG9pbnRlck1vdmV9XHJcbiAgICAgICAgICAgICAgICBvblBvaW50ZXJVcD17Y29tZW50YXJpb3NUYXAub25Qb2ludGVyVXB9XHJcbiAgICAgICAgICAgICAgICBvblBvaW50ZXJDYW5jZWw9e2NvbWVudGFyaW9zVGFwLm9uUG9pbnRlckNhbmNlbH1cclxuICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yXCI+XHJcbiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZFwiPntpbmRUKFwiVmlzaXRzX0ZpZWxkX0JhY2tncm91bmRcIiwgXCJCYWNrZ3JvdW5kXCIpfTwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICA8dGV4dGFyZWFcclxuICAgICAgICAgICAgICAgICAgaWQ9XCJhbnRlY2VkZW50ZXNcIlxyXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2wgY3Vyc29yLXBvaW50ZXJcIlxyXG4gICAgICAgICAgICAgICAgdmFsdWU9e2FudGVjZWRlbnRlc31cclxuICAgICAgICAgICAgICAgIHJlYWRPbmx5XHJcbiAgICAgICAgICAgICAgICBvblBvaW50ZXJEb3duPXthbnRlY2VkZW50ZXNUYXAub25Qb2ludGVyRG93bn1cclxuICAgICAgICAgICAgICAgIG9uUG9pbnRlck1vdmU9e2FudGVjZWRlbnRlc1RhcC5vblBvaW50ZXJNb3ZlfVxyXG4gICAgICAgICAgICAgICAgb25Qb2ludGVyVXA9e2FudGVjZWRlbnRlc1RhcC5vblBvaW50ZXJVcH1cclxuICAgICAgICAgICAgICAgIG9uUG9pbnRlckNhbmNlbD17YW50ZWNlZGVudGVzVGFwLm9uUG9pbnRlckNhbmNlbH1cclxuICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cclxuICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZm9ybS1sYWJlbCBmb250LXNlbWlib2xkXCI+e2luZFQoXCJWaXNpdHNfRmllbGRfQ29uY2x1c2lvbnNcIiwgXCJDb25jbHVzaW9uc1wiKX08L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgPHRleHRhcmVhXHJcbiAgICAgICAgICAgICAgICAgIGlkPVwiY29uY2x1c2lvbmVzXCJcclxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sIGN1cnNvci1wb2ludGVyXCJcclxuICAgICAgICAgICAgICAgIHZhbHVlPXtjb25jbHVzaW9uZXN9XHJcbiAgICAgICAgICAgICAgICByZWFkT25seVxyXG4gICAgICAgICAgICAgICAgb25Qb2ludGVyRG93bj17Y29uY2x1c2lvbmVzVGFwLm9uUG9pbnRlckRvd259XHJcbiAgICAgICAgICAgICAgICBvblBvaW50ZXJNb3ZlPXtjb25jbHVzaW9uZXNUYXAub25Qb2ludGVyTW92ZX1cclxuICAgICAgICAgICAgICAgIG9uUG9pbnRlclVwPXtjb25jbHVzaW9uZXNUYXAub25Qb2ludGVyVXB9XHJcbiAgICAgICAgICAgICAgICBvblBvaW50ZXJDYW5jZWw9e2NvbmNsdXNpb25lc1RhcC5vblBvaW50ZXJDYW5jZWx9XHJcbiAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0zXCI+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc20gdGV4dC1zbGF0ZS01MDBcIj57c3RhdHVzfTwvc3Bhbj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApfVxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufVxyXG5cclxudHlwZSBFcnJvckJvdW5kYXJ5U3RhdGUgPSB7IGhhc0Vycm9yOiBib29sZWFuIH07XHJcblxyXG5jbGFzcyBFcnJvckJvdW5kYXJ5IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PFJlYWN0LlByb3BzV2l0aENoaWxkcmVuPHt9PiwgRXJyb3JCb3VuZGFyeVN0YXRlPiB7XHJcbiAgY29uc3RydWN0b3IocHJvcHM6IFJlYWN0LlByb3BzV2l0aENoaWxkcmVuPHt9Pikge1xyXG4gICAgc3VwZXIocHJvcHMpO1xyXG4gICAgdGhpcy5zdGF0ZSA9IHsgaGFzRXJyb3I6IGZhbHNlIH07XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZ2V0RGVyaXZlZFN0YXRlRnJvbUVycm9yKCkge1xyXG4gICAgcmV0dXJuIHsgaGFzRXJyb3I6IHRydWUgfTtcclxuICB9XHJcblxyXG4gIGNvbXBvbmVudERpZENhdGNoKGVycm9yLCBpbmZvKSB7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICBpZiAodGhpcy5zdGF0ZS5oYXNFcnJvcikge1xyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IHJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci1yb3NlLTIwMCBiZy1yb3NlLTUwIHRleHQtcm9zZS03MDBcIj5cclxuICAgICAgICAgIHtpbmRUKFwiVmlzaXRzX0NyZWF0ZV9FcnJvckJvdW5kYXJ5XCIsIFwiQW4gZXJyb3Igb2NjdXJyZWQgd2hpbGUgcmVuZGVyaW5nIHRoZSB2aXNpdHMgcGFnZS4gUmVsb2FkIGFuZCB0cnkgYWdhaW4uXCIpfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMucHJvcHMuY2hpbGRyZW47XHJcbiAgfVxyXG59XHJcblxyXG4vLyBDcmVhdGUgZmxvdyBVSSB3cmFwcGVkIGJ5IHRoZSBlcnJvciBib3VuZGFyeS5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ3JlYXRlRm9ybSgpIHtcclxuICByZXR1cm4gKFxyXG4gICAgPEVycm9yQm91bmRhcnk+XHJcbiAgICAgIDxWaXNpdGFzQXBwIC8+XHJcbiAgICA8L0Vycm9yQm91bmRhcnk+XHJcbiAgKTtcclxufVxuIiwgImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IFhNYXJrSWNvbiB9IGZyb20gXCJAaGVyb2ljb25zL3JlYWN0LzIwL3NvbGlkXCI7XG5pbXBvcnQgRmxvYXRpbmdMaXN0IGZyb20gXCIuLi9jb21tb25zL0Zsb2F0aW5nTGlzdC50c3hcIjtcbmltcG9ydCBTcGlubmVyIGZyb20gXCIuLi9jb21tb25zL1NwaW5uZXIudHN4XCI7XG5pbXBvcnQgeyBDaGV2cm9uRG93blN2ZywgQ2hldnJvblVwU3ZnIH0gZnJvbSBcIi4uL2NvbW1vbnMvY2hldnJvbnMudHN4XCI7XG5pbXBvcnQgeyBmZXRjaEpzb24gfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvYXBpU2VydmljZS50c1wiO1xuaW1wb3J0IHsgdXNlT3V0c2lkZUNsaWNrIH0gZnJvbSBcIi4uLy4uL2hvb2tzL3VzZU91dHNpZGVDbGljay50c1wiO1xuaW1wb3J0IHsgY2xhc3NOYW1lcyB9IGZyb20gXCIuLi8uLi91dGlscy9jbGFzc05hbWVzLnRzXCI7XG5pbXBvcnQgeyBpbmRGb3JtYXQsIGluZFQgfSBmcm9tIFwiLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuaW1wb3J0IHsgaXNOb0RhdGFSb3csIGlzTm9EYXRhVGV4dCB9IGZyb20gXCIuLi8uLi91dGlscy9ub0RhdGEudHNcIjtcbmltcG9ydCB7IGdldENhY2hlZENvbnRhY3RzLCBzZXRDYWNoZWRDb250YWN0cywgZ2V0U3RvcmVkU2VsZWN0aW9uLCBzZXRTdG9yZWRTZWxlY3Rpb24sIGNsZWFyU3RvcmVkU2VsZWN0aW9uIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Zpc2l0YXNTdG9yYWdlLnRzXCI7XG5cbnR5cGUgQ29udGFjdE9wdGlvbiA9IHtcbiAgdmFsdWU6IHN0cmluZztcbiAgdGV4dDogc3RyaW5nO1xuICBjYXJnbzogc3RyaW5nO1xuICBlbXByZXNhOiBzdHJpbmc7XG59O1xuXG50eXBlIENvbnRhY3RzQ29tYm9ib3hQcm9wcyA9IHtcbiAgYWNjb3VudE51bT86IHN0cmluZztcbiAgdmFsdWU/OiBDb250YWN0T3B0aW9uW107XG4gIG9uQ2hhbmdlOiAodmFsdWU6IENvbnRhY3RPcHRpb25bXSkgPT4gdm9pZDtcbiAgcG9ydGFsQ2xhc3NOYW1lPzogc3RyaW5nO1xuICBwYW5lbENsYXNzTmFtZT86IHN0cmluZztcbn07XG5cbi8vIE11bHRpLXNlbGVjdCBjb250YWN0cyBjb21ib2JveCB0aWVkIHRvIHRoZSBzZWxlY3RlZCBjbGllbnQuXG5jb25zdCBDb250YWN0c0NvbWJvYm94ID0gKHsgYWNjb3VudE51bSwgdmFsdWUgPSBbXSwgb25DaGFuZ2UsIHBvcnRhbENsYXNzTmFtZSwgcGFuZWxDbGFzc05hbWUgfTogQ29udGFjdHNDb21ib2JveFByb3BzKSA9PiB7XG4gIGNvbnN0IFtxdWVyeSwgc2V0UXVlcnldID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtvcHRpb25zLCBzZXRPcHRpb25zXSA9IHVzZVN0YXRlPENvbnRhY3RPcHRpb25bXT4oW10pO1xuICBjb25zdCBbc2VsZWN0ZWQsIHNldFNlbGVjdGVkXSA9IHVzZVN0YXRlPENvbnRhY3RPcHRpb25bXT4odmFsdWUpO1xuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtsb2FkaW5nTW9yZSwgc2V0TG9hZGluZ01vcmVdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbc3RhdHVzLCBzZXRTdGF0dXNdID0gdXNlU3RhdGUoaW5kVChcIlZpc2l0c19DcmVhdGVfU2VsZWN0Q2xpZW50Rmlyc3RcIiwgXCJTZWxlY3QgYSBjbGllbnQgZmlyc3QuXCIpKTtcbiAgY29uc3QgW2hhc0xvYWRlZCwgc2V0SGFzTG9hZGVkXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW29wZW4sIHNldE9wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbcGFnZSwgc2V0UGFnZV0gPSB1c2VTdGF0ZSgxKTtcbiAgY29uc3QgW2hhc01vcmUsIHNldEhhc01vcmVdID0gdXNlU3RhdGUodHJ1ZSk7XG4gIGNvbnN0IFtibG9ja2luZywgc2V0QmxvY2tpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbYWN0aXZlSW5kZXgsIHNldEFjdGl2ZUluZGV4XSA9IHVzZVN0YXRlKDApO1xuICBjb25zdCBsaXN0UmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IGJveFJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBhYm9ydFJlZiA9IHVzZVJlZjxBYm9ydENvbnRyb2xsZXIgfCBudWxsPihudWxsKTtcbiAgY29uc3QgY29udGFpbmVyUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IGlucHV0UmVmID0gdXNlUmVmPEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgbGFzdEFjY291bnRSZWYgPSB1c2VSZWYoYWNjb3VudE51bSB8fCBcIlwiKTtcbiAgY29uc3Qgb25DaGFuZ2VSZWYgPSB1c2VSZWYob25DaGFuZ2UpO1xuXG4gIHVzZU91dHNpZGVDbGljayhbY29udGFpbmVyUmVmLCBsaXN0UmVmXSwgKCkgPT4gc2V0T3BlbihmYWxzZSkpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgb25DaGFuZ2VSZWYuY3VycmVudCA9IG9uQ2hhbmdlO1xuICB9LCBbb25DaGFuZ2VdKTtcblxuICBjb25zdCBpc1NhbWVTZWxlY3Rpb24gPSAoYTogQ29udGFjdE9wdGlvbltdID0gW10sIGI6IENvbnRhY3RPcHRpb25bXSA9IFtdKSA9PiB7XG4gICAgaWYgKGEubGVuZ3RoICE9PSBiLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuICAgIGNvbnN0IGFzID0gYS5tYXAoKHgpID0+IFN0cmluZyh4LnZhbHVlKSkuc29ydCgpO1xuICAgIGNvbnN0IGJzID0gYi5tYXAoKHgpID0+IFN0cmluZyh4LnZhbHVlKSkuc29ydCgpO1xuICAgIHJldHVybiBhcy5ldmVyeSgodiwgaSkgPT4gdiA9PT0gYnNbaV0pO1xuICB9O1xuXG4gIC8vIFN5bmMgaW50ZXJuYWwgc2VsZWN0aW9uIHdpdGggdGhlIHByb3AgKGRyYWZ0L2NhY2hlIHJlc3RvcmUpLlxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghaXNTYW1lU2VsZWN0aW9uKHZhbHVlIHx8IFtdLCBzZWxlY3RlZCkpIHtcbiAgICAgIHNldFNlbGVjdGVkKHZhbHVlIHx8IFtdKTtcbiAgICB9XG4gIH0sIFt2YWx1ZV0pO1xuXG4gIGNvbnN0IGNhbmNlbFBlbmRpbmcgPSAoKSA9PiB7XG4gICAgaWYgKGFib3J0UmVmLmN1cnJlbnQpIHtcbiAgICAgIGFib3J0UmVmLmN1cnJlbnQuYWJvcnQoKTtcbiAgICAgIGFib3J0UmVmLmN1cnJlbnQgPSBudWxsO1xuICAgIH1cbiAgfTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBpZiAoYWJvcnRSZWYuY3VycmVudCkge1xuICAgICAgICBhYm9ydFJlZi5jdXJyZW50LmFib3J0KCk7XG4gICAgICAgIGFib3J0UmVmLmN1cnJlbnQgPSBudWxsO1xuICAgICAgfVxuICAgIH07XG4gIH0sIFtdKTtcblxuICBjb25zdCBwcmltZUZyb21DYWNoZSA9ICgpID0+IHtcbiAgICBjb25zdCBjYWNoZWQgPSBnZXRDYWNoZWRDb250YWN0cyhhY2NvdW50TnVtKTtcbiAgICBpZiAoY2FjaGVkKSB7XG4gICAgICBzZXRPcHRpb25zKGNhY2hlZCk7XG4gICAgICBzZXRIYXNMb2FkZWQodHJ1ZSk7XG4gICAgICBzZXRIYXNNb3JlKGNhY2hlZC5sZW5ndGggPT09IDEwKTtcbiAgICAgIHNldFN0YXR1cyhcbiAgICAgICAgY2FjaGVkLmxlbmd0aFxuICAgICAgICAgID8gaW5kRm9ybWF0KFwiVmlzaXRzX0NyZWF0ZV9Db250YWN0Q291bnRDYWNoZVwiLCBcInswfSBjb250YWN0cyAoY2FjaGUpXCIsIGNhY2hlZC5sZW5ndGgpXG4gICAgICAgICAgOiBpbmRUKFwiVmlzaXRzX0NyZWF0ZV9Ob0NvbnRhY3RzXCIsIFwiTm8gY29udGFjdHNcIilcbiAgICAgICk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY2FuY2VsUGVuZGluZygpO1xuICAgIHNldFF1ZXJ5KFwiXCIpO1xuICAgIHNldE9wZW4oZmFsc2UpO1xuICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgIHNldEJsb2NraW5nKGZhbHNlKTtcbiAgICBzZXRMb2FkaW5nTW9yZShmYWxzZSk7XG4gICAgc2V0QWN0aXZlSW5kZXgoMCk7XG4gICAgc2V0UGFnZSgxKTtcbiAgICBzZXRIYXNNb3JlKHRydWUpO1xuXG4gICAgaWYgKCFhY2NvdW50TnVtKSB7XG4gICAgICBzZXRPcHRpb25zKFtdKTtcbiAgICAgIHNldFNlbGVjdGVkKFtdKTtcbiAgICAgIG9uQ2hhbmdlUmVmLmN1cnJlbnQoW10pO1xuICAgICAgc2V0U3RhdHVzKGluZFQoXCJWaXNpdHNfQ3JlYXRlX1NlbGVjdENsaWVudEZpcnN0XCIsIFwiU2VsZWN0IGEgY2xpZW50IGZpcnN0LlwiKSk7XG4gICAgICBzZXRIYXNMb2FkZWQoZmFsc2UpO1xuICAgICAgY2xlYXJTdG9yZWRTZWxlY3Rpb24obGFzdEFjY291bnRSZWYuY3VycmVudCk7XG4gICAgICBsYXN0QWNjb3VudFJlZi5jdXJyZW50ID0gXCJcIjtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBjaGFuZ2VkID0gbGFzdEFjY291bnRSZWYuY3VycmVudCAmJiBsYXN0QWNjb3VudFJlZi5jdXJyZW50ICE9PSBhY2NvdW50TnVtO1xuICAgIGlmIChjaGFuZ2VkKSB7XG4gICAgICBzZXRTZWxlY3RlZChbXSk7XG4gICAgICBvbkNoYW5nZVJlZi5jdXJyZW50KFtdKTtcbiAgICAgIGNsZWFyU3RvcmVkU2VsZWN0aW9uKGxhc3RBY2NvdW50UmVmLmN1cnJlbnQpO1xuICAgIH1cblxuICAgIGNvbnN0IHVzZWRDYWNoZSA9IHByaW1lRnJvbUNhY2hlKCk7XG4gICAgaWYgKCF1c2VkQ2FjaGUpIHtcbiAgICAgIHNldE9wdGlvbnMoW10pO1xuICAgICAgc2V0SGFzTG9hZGVkKGZhbHNlKTtcbiAgICAgIHNldFN0YXR1cyhpbmRUKFwiVmlzaXRzX0NyZWF0ZV9QcmVzc0Fycm93VG9Mb2FkQ29udGFjdHNcIiwgXCJQcmVzcyBBcnJvd0Rvd24gdG8gbG9hZCBjb250YWN0cy5cIikpO1xuICAgIH1cblxuICAgIGNvbnN0IHN0b3JlZFNlbGVjdGlvbiA9IGdldFN0b3JlZFNlbGVjdGlvbihhY2NvdW50TnVtKTtcbiAgICBpZiAoc3RvcmVkU2VsZWN0aW9uLmxlbmd0aCAmJiAhdmFsdWU/Lmxlbmd0aCkge1xuICAgICAgc2V0U2VsZWN0ZWQoc3RvcmVkU2VsZWN0aW9uKTtcbiAgICAgIG9uQ2hhbmdlUmVmLmN1cnJlbnQoc3RvcmVkU2VsZWN0aW9uKTtcbiAgICB9XG5cbiAgICBsYXN0QWNjb3VudFJlZi5jdXJyZW50ID0gYWNjb3VudE51bTtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVhY3QtaG9va3MvZXhoYXVzdGl2ZS1kZXBzXG4gIH0sIFthY2NvdW50TnVtXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBvbkNoYW5nZVJlZi5jdXJyZW50KHNlbGVjdGVkKTtcbiAgICBpZiAoYWNjb3VudE51bSkgc2V0U3RvcmVkU2VsZWN0aW9uKGFjY291bnROdW0sIHNlbGVjdGVkKTtcbiAgfSwgW3NlbGVjdGVkLCBhY2NvdW50TnVtXSk7XG5cbiAgY29uc3QgbWFwQ29udGFjdHMgPSAoaXRlbXM6IHVua25vd25bXSA9IFtdKSA9PlxuICAgIGl0ZW1zXG4gICAgICAubWFwKChjOiBhbnkpID0+IHtcbiAgICAgICAgaWYgKGlzTm9EYXRhUm93KGMpKSByZXR1cm4gbnVsbDtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoYykpIHJldHVybiBudWxsO1xuICAgICAgICBjb25zdCByZWNJZCA9IChjLnJlY0lkIHx8IGMuUmVjSWQgfHwgXCJcIikudG9TdHJpbmcoKS50cmltKCk7XG4gICAgICAgIGNvbnN0IG5hbWUgPSAoYy5uYW1lIHx8IGMuTmFtZSB8fCBcIlwiKS50b1N0cmluZygpLnRyaW0oKTtcbiAgICAgICAgY29uc3QgY2FyZ28gPSAoYy5jYXJnbyB8fCBjLkNhcmdvIHx8IFwiXCIpLnRvU3RyaW5nKCkudHJpbSgpO1xuICAgICAgICBjb25zdCBlbXByZXNhID0gKGMuZW1wcmVzYSB8fCBjLkVtcHJlc2EgfHwgXCJcIikudG9TdHJpbmcoKS50cmltKCk7XG4gICAgICAgIGlmICghcmVjSWQgfHwgaXNOb0RhdGFUZXh0KG5hbWUpKSByZXR1cm4gbnVsbDtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB2YWx1ZTogcmVjSWQsXG4gICAgICAgICAgdGV4dDogbmFtZS50b1VwcGVyQ2FzZSgpLFxuICAgICAgICAgIGNhcmdvOiBjYXJnby50b1VwcGVyQ2FzZSgpLFxuICAgICAgICAgIGVtcHJlc2E6IGVtcHJlc2EudG9VcHBlckNhc2UoKSxcbiAgICAgICAgfSBhcyBDb250YWN0T3B0aW9uO1xuICAgICAgfSlcbiAgICAgIC5maWx0ZXIoQm9vbGVhbikgYXMgQ29udGFjdE9wdGlvbltdO1xuXG4gIGNvbnN0IGxvYWQgPSBhc3luYyAocGFnZVRvTG9hZCA9IDEsIGFwcGVuZCA9IGZhbHNlKSA9PiB7XG4gICAgaWYgKCFhY2NvdW50TnVtKSByZXR1cm47XG4gICAgaWYgKGxvYWRpbmcgfHwgbG9hZGluZ01vcmUpIHJldHVybjtcbiAgICBjYW5jZWxQZW5kaW5nKCk7XG5cbiAgICBpZiAoIWFwcGVuZCkge1xuICAgICAgc2V0TG9hZGluZyh0cnVlKTtcbiAgICAgIHNldEJsb2NraW5nKHRydWUpO1xuICAgICAgaWYgKHBhZ2VUb0xvYWQgPT09IDEpIHNldFN0YXR1cyhpbmRUKFwiVmlzaXRzX0NyZWF0ZV9Mb2FkaW5nQ29udGFjdHNcIiwgXCJMb2FkaW5nIGNvbnRhY3RzLi4uXCIpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2V0TG9hZGluZ01vcmUodHJ1ZSk7XG4gICAgICBzZXRCbG9ja2luZyh0cnVlKTtcbiAgICB9XG5cbiAgICBjb25zdCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuICAgIGFib3J0UmVmLmN1cnJlbnQgPSBjb250cm9sbGVyO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaEpzb24oXG4gICAgICAgIGAvVmlzaXRhcy9HZXRDb250YWN0c0ZvckRyb3Bkb3duP2FjY291bnROdW09JHtlbmNvZGVVUklDb21wb25lbnQoYWNjb3VudE51bSl9JnBhZ2U9JHtwYWdlVG9Mb2FkfSZwYWdlU2l6ZT0xMGAsXG4gICAgICAgIHsgc2lnbmFsOiBjb250cm9sbGVyLnNpZ25hbCB9XG4gICAgICApO1xuICAgICAgY29uc3QgbWFwcGVkID0gbWFwQ29udGFjdHMocmVzLml0ZW1zIHx8IFtdKTtcbiAgICAgIHNldE9wdGlvbnMoKHByZXYpID0+IHtcbiAgICAgICAgY29uc3QgbmV4dCA9IGFwcGVuZCA/IFsuLi5wcmV2LCAuLi5tYXBwZWRdIDogbWFwcGVkO1xuICAgICAgICBzZXRDYWNoZWRDb250YWN0cyhhY2NvdW50TnVtLCBuZXh0KTtcbiAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICB9KTtcbiAgICAgIHNldEhhc0xvYWRlZCh0cnVlKTtcbiAgICAgIHNldEhhc01vcmUobWFwcGVkLmxlbmd0aCA9PT0gMTApO1xuICAgICAgc2V0UGFnZShwYWdlVG9Mb2FkKTtcbiAgICAgIHNldFN0YXR1cyhtYXBwZWQubGVuZ3RoID8gaW5kRm9ybWF0KFwiVmlzaXRzX0NyZWF0ZV9Db250YWN0Q291bnRcIiwgXCJ7MH0gY29udGFjdHNcIiwgbWFwcGVkLmxlbmd0aCkgOiBpbmRUKFwiVmlzaXRzX0NyZWF0ZV9Ob0NvbnRhY3RzXCIsIFwiTm8gY29udGFjdHNcIikpO1xuICAgIH0gY2F0Y2gge1xuICAgICAgc2V0U3RhdHVzKGluZFQoXCJWaXNpdHNfQ3JlYXRlX0xvYWRDb250YWN0c0Vycm9yXCIsIFwiRmFpbGVkIHRvIGxvYWQgY29udGFjdHMuXCIpKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgYWJvcnRSZWYuY3VycmVudCA9IG51bGw7XG4gICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICAgIHNldExvYWRpbmdNb3JlKGZhbHNlKTtcbiAgICAgIHNldEJsb2NraW5nKGZhbHNlKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZW5zdXJlTG9hZGVkID0gKCkgPT4ge1xuICAgIGlmICghYWNjb3VudE51bSkgcmV0dXJuO1xuICAgIGlmIChoYXNMb2FkZWQgJiYgb3B0aW9ucy5sZW5ndGgpIHJldHVybjtcbiAgICBpZiAocHJpbWVGcm9tQ2FjaGUoKSkgcmV0dXJuO1xuICAgIGxvYWQoMSwgZmFsc2UpO1xuICB9O1xuXG4gIGNvbnN0IGxvYWRNb3JlQ29udGFjdHMgPSBSZWFjdC51c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKCFhY2NvdW50TnVtIHx8ICFoYXNNb3JlIHx8IGxvYWRpbmdNb3JlIHx8IGxvYWRpbmcpIHJldHVybjtcbiAgICBsb2FkKHBhZ2UgKyAxLCB0cnVlKTtcbiAgfSwgW2FjY291bnROdW0sIGhhc01vcmUsIGxvYWRpbmdNb3JlLCBsb2FkaW5nLCBwYWdlXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIW9wZW4gfHwgIWxpc3RSZWYuY3VycmVudCkgcmV0dXJuO1xuICAgIGNvbnN0IGVsID0gbGlzdFJlZi5jdXJyZW50O1xuICAgIGNvbnN0IG9uU2Nyb2xsID0gKCkgPT4ge1xuICAgICAgaWYgKGVsLnNjcm9sbFRvcCArIGVsLmNsaWVudEhlaWdodCA+PSBlbC5zY3JvbGxIZWlnaHQgLSA4KSBsb2FkTW9yZUNvbnRhY3RzKCk7XG4gICAgfTtcbiAgICBlbC5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIG9uU2Nyb2xsLCB7IHBhc3NpdmU6IHRydWUgfSk7XG4gICAgcmV0dXJuICgpID0+IGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgb25TY3JvbGwpO1xuICB9LCBbb3BlbiwgbG9hZE1vcmVDb250YWN0c10pO1xuXG4gIGNvbnN0IHNlbGVjdGVkVmFsdWVzID0gdXNlTWVtbygoKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBTZXQoKHNlbGVjdGVkIHx8IFtdKS5tYXAoKHMpID0+IFN0cmluZyhzLnZhbHVlKSkpO1xuICB9LCBbc2VsZWN0ZWRdKTtcblxuICBjb25zdCBhdmFpbGFibGVPcHRpb25zID0gdXNlTWVtbygoKSA9PiB7XG4gICAgLy8gSGlkZSBhbHJlYWR5IHNlbGVjdGVkIGNvbnRhY3RzIGZyb20gdGhlIGRyb3Bkb3duIGxpc3QuXG4gICAgcmV0dXJuIChvcHRpb25zIHx8IFtdKS5maWx0ZXIoKG8pID0+ICFzZWxlY3RlZFZhbHVlcy5oYXMoU3RyaW5nKG8udmFsdWUpKSk7XG4gIH0sIFtvcHRpb25zLCBzZWxlY3RlZFZhbHVlc10pO1xuXG4gIGNvbnN0IGZpbHRlcmVkID0gdXNlTWVtbygoKSA9PiB7XG4gICAgY29uc3QgcSA9IHF1ZXJ5LnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICAgIGlmICghcSkgcmV0dXJuIGF2YWlsYWJsZU9wdGlvbnM7XG4gICAgY29uc3QgZiA9IGF2YWlsYWJsZU9wdGlvbnMuZmlsdGVyKFxuICAgICAgKG8pID0+IG8udGV4dC50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHEpIHx8IG8uY2FyZ28udG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhxKSB8fCBvLmVtcHJlc2EudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhxKVxuICAgICk7XG4gICAgcmV0dXJuIGYubGVuZ3RoID8gZiA6IGF2YWlsYWJsZU9wdGlvbnM7XG4gIH0sIFthdmFpbGFibGVPcHRpb25zLCBxdWVyeV0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc2V0QWN0aXZlSW5kZXgoMCk7XG4gIH0sIFtmaWx0ZXJlZC5sZW5ndGgsIHF1ZXJ5XSk7XG5cbiAgY29uc3QgdG9nZ2xlT3B0aW9uID0gKG9wdDogQ29udGFjdE9wdGlvbikgPT4ge1xuICAgIHNldFNlbGVjdGVkKChwcmV2KSA9PiB7XG4gICAgICBjb25zdCBleGlzdHMgPSBwcmV2LnNvbWUoKHApID0+IHAudmFsdWUgPT09IG9wdC52YWx1ZSk7XG4gICAgICBpZiAoZXhpc3RzKSByZXR1cm4gcHJldi5maWx0ZXIoKHApID0+IHAudmFsdWUgIT09IG9wdC52YWx1ZSk7XG4gICAgICByZXR1cm4gWy4uLnByZXYsIG9wdF07XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlS2V5RG93biA9IChldjogUmVhY3QuS2V5Ym9hcmRFdmVudDxIVE1MSW5wdXRFbGVtZW50PikgPT4ge1xuICAgIGlmIChldi5rZXkgPT09IFwiQXJyb3dEb3duXCIpIHtcbiAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBzZXRPcGVuKHRydWUpO1xuICAgICAgZW5zdXJlTG9hZGVkKCk7XG4gICAgICBpZiAoZmlsdGVyZWQubGVuZ3RoKSBzZXRBY3RpdmVJbmRleCgoaWR4KSA9PiAoaWR4ICsgMSkgJSBmaWx0ZXJlZC5sZW5ndGgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoZXYua2V5ID09PSBcIkFycm93VXBcIikge1xuICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHNldE9wZW4odHJ1ZSk7XG4gICAgICBlbnN1cmVMb2FkZWQoKTtcbiAgICAgIGlmIChmaWx0ZXJlZC5sZW5ndGgpIHNldEFjdGl2ZUluZGV4KChpZHgpID0+IChpZHggLSAxICsgZmlsdGVyZWQubGVuZ3RoKSAlIGZpbHRlcmVkLmxlbmd0aCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChldi5rZXkgPT09IFwiRW50ZXJcIikge1xuICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGlmIChvcGVuICYmIGZpbHRlcmVkLmxlbmd0aCkge1xuICAgICAgICB0b2dnbGVPcHRpb24oZmlsdGVyZWRbYWN0aXZlSW5kZXhdID8/IGZpbHRlcmVkWzBdKTtcbiAgICAgIH0gZWxzZSBpZiAoYWNjb3VudE51bSkge1xuICAgICAgICBlbnN1cmVMb2FkZWQoKTtcbiAgICAgICAgc2V0T3Blbih0cnVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGV2LmtleSA9PT0gXCJFc2NhcGVcIikgc2V0T3BlbihmYWxzZSk7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMlwiIHJlZj17Y29udGFpbmVyUmVmfT5cbiAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb3JtLWxhYmVsIGZvbnQtc2VtaWJvbGRcIj57aW5kVChcIlZpc2l0c19DcmVhdGVfU2VhcmNoQ29udGFjdFwiLCBcIlNlYXJjaCBjb250YWN0XCIpfTwvbGFiZWw+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlXCI+XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgcmVmPXtib3hSZWZ9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJyZWxhdGl2ZSB3LWZ1bGwgY3Vyc29yLWRlZmF1bHQgcm91bmRlZC1bNXB4XSBib3JkZXItc2xhdGUtMzAwIGJnLXdoaXRlIHRleHQtbGVmdCBzaGFkb3cteHMgZm9jdXMtd2l0aGluOmJvcmRlci1wcmltYXJ5IGZvY3VzLXdpdGhpbjpyaW5nLTIgZm9jdXMtd2l0aGluOnJpbmctcHJpbWFyeSBmb2N1cy13aXRoaW46cmluZy1vZmZzZXQtMCBzbTp0ZXh0LXNtXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtd3JhcCBnYXAtMSBweC0zIHB5LTIgbWluLWgtMTBcIj5cbiAgICAgICAgICAgIHtzZWxlY3RlZC5tYXAoKGMpID0+IChcbiAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICBrZXk9e2MudmFsdWV9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgcm91bmRlZC1tZCBiZy1wcmltYXJ5LzEwIHRleHQtc2xhdGUtNzAwIHB4LTIgcHktMSB0ZXh0LXhzXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHtjLnRleHR9XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTZWxlY3RlZCgocHJldikgPT4gcHJldi5maWx0ZXIoKHMpID0+IHMudmFsdWUgIT09IGMudmFsdWUpKX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNzAwIGhvdmVyOnRleHQtc2xhdGUtNzAwLzgwXCJcbiAgICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2luZFQoXCJDb21tb25fRGVsZXRlXCIsIFwiRGVsZXRlXCIpfVxuICAgICAgICAgICAgICAgICAgdGl0bGU9e2luZFQoXCJDb21tb25fRGVsZXRlXCIsIFwiRGVsZXRlXCIpfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxYTWFya0ljb24gY2xhc3NOYW1lPVwiaC00IHctNFwiIC8+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXgtMSBtaW4tdy0zMCBiZy10cmFuc3BhcmVudCB0ZXh0LXNtIHNtOnRleHQtYmFzZSBsZWFkaW5nLTUgdGV4dC1zbGF0ZS05MDAgYm9yZGVyLW5vbmUgb3V0bGluZS1oaWRkZW4gcHgtMSBweS0xIGZvY3VzOnJpbmctMCBmb2N1czpib3JkZXItdHJhbnNwYXJlbnRcIlxuICAgICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBzZXRRdWVyeShldmVudC50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICBvbktleURvd249e2hhbmRsZUtleURvd259XG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtzZWxlY3RlZC5sZW5ndGggPyBcIlwiIDogaW5kVChcIlZpc2l0c19DcmVhdGVfRmlsdGVyUGxhY2Vob2xkZXJcIiwgXCJUeXBlIHRvIGZpbHRlci4uLlwiKX1cbiAgICAgICAgICAgICAgcmVmPXtpbnB1dFJlZn1cbiAgICAgICAgICAgICAgcmVhZE9ubHk9eyFhY2NvdW50TnVtfVxuICAgICAgICAgICAgICBvbkZvY3VzPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgZW5zdXJlTG9hZGVkKCk7XG4gICAgICAgICAgICAgICAgc2V0T3Blbih0cnVlKTtcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICB7KGxvYWRpbmcgfHwgYmxvY2tpbmcpICYmIChcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQteS0wIHJpZ2h0LTkgZmxleCBpdGVtcy1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICA8U3Bpbm5lciAvPlxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQteS0wIHJpZ2h0LTAgZmxleCBpdGVtcy1jZW50ZXIgcHItMiB0ZXh0LXNsYXRlLTUwMCBob3Zlcjp0ZXh0LXNsYXRlLTYwMFwiXG4gICAgICAgICAgICBhcmlhLWxhYmVsPXtvcGVuID8gaW5kVChcIkRyb3Bkb3duX0hpZGVPcHRpb25zXCIsIFwiSGlkZSBvcHRpb25zXCIpIDogaW5kVChcIkRyb3Bkb3duX1Nob3dPcHRpb25zXCIsIFwiU2hvdyBvcHRpb25zXCIpfVxuICAgICAgICAgICAgYXJpYS1leHBhbmRlZD17b3Blbn1cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgaWYgKCFhY2NvdW50TnVtKSByZXR1cm47XG4gICAgICAgICAgICAgIGlmIChvcGVuKSB7XG4gICAgICAgICAgICAgICAgc2V0T3BlbihmYWxzZSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZW5zdXJlTG9hZGVkKCk7XG4gICAgICAgICAgICAgICAgc2V0T3Blbih0cnVlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7b3BlbiA/IDxDaGV2cm9uVXBTdmcgY2xhc3NOYW1lPVwiaC01IHctNVwiIC8+IDogPENoZXZyb25Eb3duU3ZnIGNsYXNzTmFtZT1cImgtNSB3LTVcIiAvPn1cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPEZsb2F0aW5nTGlzdFxuICAgICAgICAgICAgYW5jaG9yUmVmPXtib3hSZWZ9XG4gICAgICAgICAgICBvcGVuPXtvcGVufVxuICAgICAgICAgICAgekluZGV4PXszODAwMDB9XG4gICAgICAgICAgICBtYXhIZWlnaHRDbGFzcz1cIm1heC1oLTcyXCJcbiAgICAgICAgICAgIHJvbGU9XCJsaXN0Ym94XCJcbiAgICAgICAgICAgIHJvdW5kZWRDbGFzcz1cInJvdW5kZWQtWzVweF1cIlxuICAgICAgICAgICAgcG9ydGFsQ2xhc3NOYW1lPXtwb3J0YWxDbGFzc05hbWV9XG4gICAgICAgICAgICBwYW5lbENsYXNzTmFtZT17cGFuZWxDbGFzc05hbWV9XG4gICAgICAgICAgPlxuICAgICAgICAgIDxkaXYgcmVmPXtsaXN0UmVmfSBhcmlhLW11bHRpc2VsZWN0YWJsZT1cInRydWVcIj5cbiAgICAgICAgICAgIHtsb2FkaW5nICYmIChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBweC00IHB5LTIgdGV4dC1zbSB0ZXh0LXNsYXRlLTUwMFwiPlxuICAgICAgICAgICAgICAgIDxTcGlubmVyIHNpemU9XCJoLTQgdy00XCIgLz5cbiAgICAgICAgICAgICAgICB7aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgeyFsb2FkaW5nICYmIG9wdGlvbnMubGVuZ3RoID09PSAwICYmIChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJweC00IHB5LTIgdGV4dC1zbSB0ZXh0LXNsYXRlLTUwMFwiPlxuICAgICAgICAgICAgICAgIHtoYXNMb2FkZWQgPyBpbmRUKFwiVmlzaXRzX0NyZWF0ZV9Ob0NvbnRhY3RzXCIsIFwiTm8gY29udGFjdHNcIikgOiBpbmRUKFwiVmlzaXRzX0NyZWF0ZV9TZWxlY3RDbGllbnRGaXJzdFwiLCBcIlNlbGVjdCBhIGNsaWVudCBmaXJzdC5cIil9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIHshbG9hZGluZyAmJiBvcHRpb25zLmxlbmd0aCA+IDAgJiYgZmlsdGVyZWQubGVuZ3RoID09PSAwICYmIChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJweC00IHB5LTIgdGV4dC1zbSB0ZXh0LXNsYXRlLTUwMFwiPlxuICAgICAgICAgICAgICAgIHtxdWVyeS50cmltKCkgPyBpbmRUKFwiVmlzaXRzX0NyZWF0ZV9Ob01hdGNoZXNcIiwgXCJObyBtYXRjaGVzXCIpIDogaW5kVChcIlZpc2l0c19DcmVhdGVfTm9Nb3JlQ29udGFjdHNcIiwgXCJObyBtb3JlIGNvbnRhY3RzIGF2YWlsYWJsZVwiKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgeyFsb2FkaW5nICYmXG4gICAgICAgICAgICAgIGZpbHRlcmVkLm1hcCgob3B0LCBpZHgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBzZWwgPSBzZWxlY3RlZC5zb21lKChzKSA9PiBzLnZhbHVlID09PSBvcHQudmFsdWUpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGlzQWN0aXZlID0gaWR4ID09PSBhY3RpdmVJbmRleDtcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAga2V5PXtvcHQudmFsdWV9XG4gICAgICAgICAgICAgICAgICAgIHJvbGU9XCJvcHRpb25cIlxuICAgICAgICAgICAgICAgICAgICBhcmlhLXNlbGVjdGVkPXtzZWx9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgICAgICAgICAgICAgICBcInJlbGF0aXZlIGZsZXggdy1mdWxsIGN1cnNvci1kZWZhdWx0IHNlbGVjdC1ub25lIGl0ZW1zLXN0YXJ0IHB5LTIgcHgtMyB0ZXh0LWxlZnQgdGV4dC1zbVwiLFxuICAgICAgICAgICAgICAgICAgICAgIGlzQWN0aXZlID8gXCJiZy1wcmltYXJ5IHRleHQtd2hpdGVcIiA6IHNlbCA/IFwiYmctcHJpbWFyeS8xMCB0ZXh0LXByaW1hcnlcIiA6IFwidGV4dC1zbGF0ZS05MDBcIlxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICBvbk1vdXNlRW50ZXI9eygpID0+IHNldEFjdGl2ZUluZGV4KGlkeCl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHRvZ2dsZU9wdGlvbihvcHQpfVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIGZsZXggZmxleC1jb2wgZ2FwLTAuNSBwci0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtjbGFzc05hbWVzKFwiYmxvY2sgdHJ1bmNhdGVcIiwgc2VsID8gXCJmb250LW1lZGl1bVwiIDogXCJmb250LW5vcm1hbFwiKX0+e29wdC50ZXh0fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXhzIHRleHQtc2xhdGUtNjAwIHRydW5jYXRlXCI+e29wdC5jYXJnb308L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB7YmxvY2tpbmcgJiYgKFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgei03MDAwMCBiZy13aGl0ZS83MCBiYWNrZHJvcC1ibHVyLVsxcHhdIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHJvdW5kZWQtWzVweF1cIj5cbiAgICAgICAgICAgICAgICA8U3Bpbm5lciBzaXplPVwiaC02IHctNlwiIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L0Zsb2F0aW5nTGlzdD5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgZmxleCBqdXN0aWZ5LWVuZFwiPlxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNTAwIHRlY2gtaW5mb1wiPntzdGF0dXN9PC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb250YWN0c0NvbWJvYm94O1xuIiwgImltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuZnVuY3Rpb24gWE1hcmtJY29uKHtcbiAgdGl0bGUsXG4gIHRpdGxlSWQsXG4gIC4uLnByb3BzXG59LCBzdmdSZWYpIHtcbiAgcmV0dXJuIC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KFwic3ZnXCIsIE9iamVjdC5hc3NpZ24oe1xuICAgIHhtbG5zOiBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsXG4gICAgdmlld0JveDogXCIwIDAgMjAgMjBcIixcbiAgICBmaWxsOiBcImN1cnJlbnRDb2xvclwiLFxuICAgIFwiYXJpYS1oaWRkZW5cIjogXCJ0cnVlXCIsXG4gICAgXCJkYXRhLXNsb3RcIjogXCJpY29uXCIsXG4gICAgcmVmOiBzdmdSZWYsXG4gICAgXCJhcmlhLWxhYmVsbGVkYnlcIjogdGl0bGVJZFxuICB9LCBwcm9wcyksIHRpdGxlID8gLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0aXRsZVwiLCB7XG4gICAgaWQ6IHRpdGxlSWRcbiAgfSwgdGl0bGUpIDogbnVsbCwgLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoXCJwYXRoXCIsIHtcbiAgICBkOiBcIk02LjI4IDUuMjJhLjc1Ljc1IDAgMCAwLTEuMDYgMS4wNkw4Ljk0IDEwbC0zLjcyIDMuNzJhLjc1Ljc1IDAgMSAwIDEuMDYgMS4wNkwxMCAxMS4wNmwzLjcyIDMuNzJhLjc1Ljc1IDAgMSAwIDEuMDYtMS4wNkwxMS4wNiAxMGwzLjcyLTMuNzJhLjc1Ljc1IDAgMCAwLTEuMDYtMS4wNkwxMCA4Ljk0IDYuMjggNS4yMlpcIlxuICB9KSk7XG59XG5jb25zdCBGb3J3YXJkUmVmID0gLyojX19QVVJFX18qLyBSZWFjdC5mb3J3YXJkUmVmKFhNYXJrSWNvbik7XG5leHBvcnQgZGVmYXVsdCBGb3J3YXJkUmVmOyIsICJpbXBvcnQgeyB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuXG5leHBvcnQgY29uc3QgdXNlVG9wYmFyID0gKFxuICBzdGVwOiBudW1iZXIsXG4gIGNhbkdvTmV4dDogYm9vbGVhbixcbiAgb25OZXh0OiAoKSA9PiB2b2lkLFxuICBvblByZXY6ICgpID0+IHZvaWQsXG4gIGJ1c3kgPSBmYWxzZSxcbiAgY2FuU3VibWl0U3RlcDIgPSB0cnVlLFxuICBjYW5BY2Nlc3MgPSB0cnVlXG4pID0+IHtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBmb3J3YXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnbG9iYWxGb3J3YXJkQnRuXCIpIGFzIEhUTUxCdXR0b25FbGVtZW50IHwgbnVsbDtcbiAgICBjb25zdCBiYWNrID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnbG9iYWxCYWNrQnRuXCIpIGFzIEhUTUxCdXR0b25FbGVtZW50IHwgbnVsbDtcbiAgICBjb25zdCBmb3J3YXJkSWNvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2xvYmFsRm9yd2FyZEljb25cIik7XG4gICAgY29uc3QgY3JlYXRlSWNvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2xvYmFsQ3JlYXRlSWNvblwiKTtcblxuICAgIGlmIChmb3J3YXJkKSB7XG4gICAgICBjb25zdCBpc1N0ZXAyID0gc3RlcCA9PT0gMjtcbiAgICAgIGNvbnN0IHNob3dGb3J3YXJkID0gY2FuQWNjZXNzICYmIChpc1N0ZXAyIHx8IChzdGVwID09PSAxICYmIGNhbkdvTmV4dCkpO1xuICAgICAgZm9yd2FyZC5zdHlsZS52aXNpYmlsaXR5ID0gc2hvd0ZvcndhcmQgPyBcInZpc2libGVcIiA6IFwiaGlkZGVuXCI7XG4gICAgICBmb3J3YXJkLmRpc2FibGVkID0gIXNob3dGb3J3YXJkIHx8IGJ1c3k7XG4gICAgICBmb3J3YXJkLm9uY2xpY2sgPSBzaG93Rm9yd2FyZCA/ICgpID0+IG9uTmV4dCgpIDogbnVsbDtcbiAgICAgIGZvcndhcmQuc2V0QXR0cmlidXRlKFxuICAgICAgICBcImFyaWEtbGFiZWxcIixcbiAgICAgICAgaXNTdGVwMiA/IGluZFQoXCJDb21tb25fQ3JlYXRlXCIsIFwiQ3JlYXRlXCIpIDogaW5kVChcIkNvbW1vbl9OZXh0XCIsIFwiTmV4dFwiKVxuICAgICAgKTtcbiAgICAgIGZvcndhcmQuc2V0QXR0cmlidXRlKFwiYXJpYS1kaXNhYmxlZFwiLCBpc1N0ZXAyICYmICFjYW5TdWJtaXRTdGVwMiA/IFwidHJ1ZVwiIDogXCJmYWxzZVwiKTtcbiAgICAgIGZvcndhcmQuY2xhc3NMaXN0LnRvZ2dsZShcIm9wYWNpdHktNTBcIiwgaXNTdGVwMiAmJiAhY2FuU3VibWl0U3RlcDIpO1xuICAgICAgZm9yd2FyZC5jbGFzc0xpc3QudG9nZ2xlKFwiY3Vyc29yLW5vdC1hbGxvd2VkXCIsIGlzU3RlcDIgJiYgIWNhblN1Ym1pdFN0ZXAyKTtcblxuICAgICAgaWYgKGZvcndhcmRJY29uICYmIGNyZWF0ZUljb24pIHtcbiAgICAgICAgaWYgKGlzU3RlcDIpIHtcbiAgICAgICAgICBmb3J3YXJkSWNvbi5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgICAgIGNyZWF0ZUljb24uY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmb3J3YXJkSWNvbi5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICAgICAgICAgIGNyZWF0ZUljb24uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoYmFjaykge1xuICAgICAgY29uc3Qgc2hvd0JhY2sgPSBjYW5BY2Nlc3MgJiYgc3RlcCA9PT0gMjtcbiAgICAgIGJhY2suc3R5bGUudmlzaWJpbGl0eSA9IHNob3dCYWNrID8gXCJ2aXNpYmxlXCIgOiBcImhpZGRlblwiO1xuICAgICAgYmFjay5kaXNhYmxlZCA9ICFzaG93QmFjayB8fCBidXN5O1xuICAgICAgYmFjay5vbmNsaWNrID0gc2hvd0JhY2sgPyAoKSA9PiBvblByZXYoKSA6IG51bGw7XG4gICAgfVxuICB9LCBbc3RlcCwgY2FuR29OZXh0LCBvbk5leHQsIG9uUHJldiwgYnVzeSwgY2FuU3VibWl0U3RlcDIsIGNhbkFjY2Vzc10pO1xufTtcbiIsICJleHBvcnQgY29uc3Qgc2hvd0dsb2JhbFNwaW5uZXIgPSAobWVzc2FnZT86IHN0cmluZykgPT4ge1xuICB0cnkge1xuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiB3aW5kb3cuX19pbmRTaG93R2xvYmFsU3Bpbm5lciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICB3aW5kb3cuX19pbmRTaG93R2xvYmFsU3Bpbm5lcihtZXNzYWdlKTtcbiAgICB9XG4gIH0gY2F0Y2gge1xuICAgIC8vIGlnbm9yZVxuICB9XG59O1xuXG5leHBvcnQgY29uc3QgaGlkZUdsb2JhbFNwaW5uZXIgPSAoKSA9PiB7XG4gIHRyeSB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIHdpbmRvdy5fX2luZEhpZGVHbG9iYWxTcGlubmVyID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIHdpbmRvdy5fX2luZEhpZGVHbG9iYWxTcGlubmVyKCk7XG4gICAgfVxuICB9IGNhdGNoIHtcbiAgICAvLyBpZ25vcmVcbiAgfVxufTtcbiIsICJleHBvcnQgY29uc3QgaW5kRXh0cmFjdElkID0gKHZhbHVlOiB1bmtub3duKTogc3RyaW5nID0+IHtcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHJldHVybiBcIlwiO1xuICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiIHx8IHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIikgcmV0dXJuIFN0cmluZyh2YWx1ZSkudHJpbSgpO1xuICBpZiAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiKSB7XG4gICAgY29uc3QgY2FuZGlkYXRlID1cbiAgICAgICh2YWx1ZSBhcyBhbnkpLnJlY0lkID8/XG4gICAgICAodmFsdWUgYXMgYW55KS5SZWNJZCA/P1xuICAgICAgKHZhbHVlIGFzIGFueSkuaWQgPz9cbiAgICAgICh2YWx1ZSBhcyBhbnkpLklkID8/XG4gICAgICAodmFsdWUgYXMgYW55KS52YWx1ZSA/P1xuICAgICAgKHZhbHVlIGFzIGFueSkuVmFsdWU7XG4gICAgaWYgKHR5cGVvZiBjYW5kaWRhdGUgPT09IFwic3RyaW5nXCIgfHwgdHlwZW9mIGNhbmRpZGF0ZSA9PT0gXCJudW1iZXJcIikgcmV0dXJuIFN0cmluZyhjYW5kaWRhdGUpLnRyaW0oKTtcbiAgfVxuICByZXR1cm4gXCJcIjtcbn07XG5cbmV4cG9ydCBjb25zdCBpbmRFeHRyYWN0TnVtZXJpY0lkID0gKHZhbHVlOiB1bmtub3duLCBkZXB0aCA9IDApOiBzdHJpbmcgPT4ge1xuICBpZiAoZGVwdGggPiAzKSByZXR1cm4gXCJcIjtcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHJldHVybiBcIlwiO1xuICBpZiAodHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiICYmIE51bWJlci5pc0Zpbml0ZSh2YWx1ZSkpIHJldHVybiBTdHJpbmcoTWF0aC50cnVuYyh2YWx1ZSkpO1xuICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XG4gICAgY29uc3QgcmF3ID0gdmFsdWUudHJpbSgpO1xuICAgIGlmICghcmF3KSByZXR1cm4gXCJcIjtcbiAgICBpZiAoL15cXGQrJC8udGVzdChyYXcpKSByZXR1cm4gcmF3O1xuICAgIGNvbnN0IG0gPSByYXcubWF0Y2goLyhcXGR7Myx9KS8pO1xuICAgIHJldHVybiBtID8gbVsxXSA6IFwiXCI7XG4gIH1cbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJvYmplY3RcIikgcmV0dXJuIFwiXCI7XG4gIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgIGZvciAoY29uc3QgaXRlbSBvZiB2YWx1ZSkge1xuICAgICAgY29uc3QgZm91bmQgPSBpbmRFeHRyYWN0TnVtZXJpY0lkKGl0ZW0sIGRlcHRoICsgMSk7XG4gICAgICBpZiAoZm91bmQpIHJldHVybiBmb3VuZDtcbiAgICB9XG4gICAgcmV0dXJuIFwiXCI7XG4gIH1cblxuICBjb25zdCBrZXlzID0gW1xuICAgIFwicmVjSWRcIixcbiAgICBcIlJlY0lkXCIsXG4gICAgXCJyZWZSZWNJZEFjdGl2aWRhZFwiLFxuICAgIFwiUmVmUmVjSWRBY3RpdmlkYWRcIixcbiAgICBcImFjdGl2aWRhZFJlY0lkXCIsXG4gICAgXCJBY3RpdmlkYWRSZWNJZFwiLFxuICAgIFwiaWRcIixcbiAgICBcIklkXCIsXG4gICAgXCJ2YWx1ZVwiLFxuICAgIFwiVmFsdWVcIixcbiAgICBcInJlc3VsdFwiLFxuICAgIFwiUmVzdWx0XCIsXG4gICAgXCJkYXRhXCIsXG4gICAgXCJEYXRhXCIsXG4gICAgXCJtZXNzYWdlXCIsXG4gICAgXCJNZXNzYWdlXCIsXG4gIF07XG5cbiAgZm9yIChjb25zdCBrIG9mIGtleXMpIHtcbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCBrKSkge1xuICAgICAgY29uc3QgZm91bmQgPSBpbmRFeHRyYWN0TnVtZXJpY0lkKCh2YWx1ZSBhcyBhbnkpW2tdLCBkZXB0aCArIDEpO1xuICAgICAgaWYgKGZvdW5kKSByZXR1cm4gZm91bmQ7XG4gICAgfVxuICB9XG5cbiAgZm9yIChjb25zdCB2IG9mIE9iamVjdC52YWx1ZXModmFsdWUgYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj4pKSB7XG4gICAgY29uc3QgZm91bmQgPSBpbmRFeHRyYWN0TnVtZXJpY0lkKHYsIGRlcHRoICsgMSk7XG4gICAgaWYgKGZvdW5kKSByZXR1cm4gZm91bmQ7XG4gIH1cblxuICByZXR1cm4gXCJcIjtcbn07XG5cbmV4cG9ydCBjb25zdCBpbmRFeHRyYWN0U2lnbmVkSWQgPSAodmFsdWU6IHVua25vd24sIGRlcHRoID0gMCk6IHN0cmluZyA9PiB7XG4gIGlmIChkZXB0aCA+IDMpIHJldHVybiBcIlwiO1xuICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkgcmV0dXJuIFwiXCI7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCIgJiYgTnVtYmVyLmlzRmluaXRlKHZhbHVlKSkgcmV0dXJuIFN0cmluZyhNYXRoLnRydW5jKHZhbHVlKSk7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpIHtcbiAgICBjb25zdCByYXcgPSB2YWx1ZS50cmltKCk7XG4gICAgaWYgKCFyYXcpIHJldHVybiBcIlwiO1xuICAgIGNvbnN0IG1hdGNoID0gcmF3Lm1hdGNoKC8tP1xcZHszLH0vKTtcbiAgICByZXR1cm4gbWF0Y2ggPyBtYXRjaFswXSA6IFwiXCI7XG4gIH1cbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJvYmplY3RcIikgcmV0dXJuIFwiXCI7XG4gIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgIGZvciAoY29uc3QgaXRlbSBvZiB2YWx1ZSkge1xuICAgICAgY29uc3QgZm91bmQgPSBpbmRFeHRyYWN0U2lnbmVkSWQoaXRlbSwgZGVwdGggKyAxKTtcbiAgICAgIGlmIChmb3VuZCkgcmV0dXJuIGZvdW5kO1xuICAgIH1cbiAgICByZXR1cm4gXCJcIjtcbiAgfVxuXG4gIGNvbnN0IGtleXMgPSBbXG4gICAgXCJyZWNJZFwiLFxuICAgIFwiUmVjSWRcIixcbiAgICBcInJlZlJlY0lkQWN0aXZpZGFkXCIsXG4gICAgXCJSZWZSZWNJZEFjdGl2aWRhZFwiLFxuICAgIFwiYWN0aXZpZGFkUmVjSWRcIixcbiAgICBcIkFjdGl2aWRhZFJlY0lkXCIsXG4gICAgXCJtZXNzYWdlXCIsXG4gICAgXCJNZXNzYWdlXCIsXG4gICAgXCJyZXN1bHRcIixcbiAgICBcIlJlc3VsdFwiLFxuICAgIFwiZGF0YVwiLFxuICAgIFwiRGF0YVwiLFxuICBdO1xuXG4gIGZvciAoY29uc3QgayBvZiBrZXlzKSB7XG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgaykpIHtcbiAgICAgIGNvbnN0IGZvdW5kID0gaW5kRXh0cmFjdFNpZ25lZElkKCh2YWx1ZSBhcyBhbnkpW2tdLCBkZXB0aCArIDEpO1xuICAgICAgaWYgKGZvdW5kKSByZXR1cm4gZm91bmQ7XG4gICAgfVxuICB9XG5cbiAgZm9yIChjb25zdCB2IG9mIE9iamVjdC52YWx1ZXModmFsdWUgYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj4pKSB7XG4gICAgY29uc3QgZm91bmQgPSBpbmRFeHRyYWN0U2lnbmVkSWQodiwgZGVwdGggKyAxKTtcbiAgICBpZiAoZm91bmQpIHJldHVybiBmb3VuZDtcbiAgfVxuXG4gIHJldHVybiBcIlwiO1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLG9CQUEyQjs7O0FDRDFCLElBQUFBLGdCQUE0RDs7O0FDQTdELG1CQUE0RDs7O0FDQTVELFlBQXVCO0FBQ3ZCLFNBQVMsVUFBVTtBQUFBLEVBQ2pCO0FBQUEsRUFDQTtBQUFBLEVBQ0EsR0FBRztBQUNMLEdBQUcsUUFBUTtBQUNULFNBQW9CLGdCQUFNLG9CQUFjLE9BQU8sT0FBTyxPQUFPO0FBQUEsSUFDM0QsT0FBTztBQUFBLElBQ1AsU0FBUztBQUFBLElBQ1QsTUFBTTtBQUFBLElBQ04sZUFBZTtBQUFBLElBQ2YsYUFBYTtBQUFBLElBQ2IsS0FBSztBQUFBLElBQ0wsbUJBQW1CO0FBQUEsRUFDckIsR0FBRyxLQUFLLEdBQUcsUUFBcUIsZ0JBQU0sb0JBQWMsU0FBUztBQUFBLElBQzNELElBQUk7QUFBQSxFQUNOLEdBQUcsS0FBSyxJQUFJLE1BQW1CLGdCQUFNLG9CQUFjLFFBQVE7QUFBQSxJQUN6RCxHQUFHO0FBQUEsRUFDTCxDQUFDLENBQUM7QUFDSjtBQUNBLElBQU0sYUFBMkIsZ0JBQU0saUJBQVcsU0FBUztBQUMzRCxJQUFPLG9C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QUFBQSxFQUMvQjtBQUFBLEVBRUEsU0FBUztBQUNQLFFBQUksS0FBSyxNQUFNLFVBQVU7QUFDdkIsYUFDRSw2Q0FBQyxTQUFJLFdBQVUsa0VBQ1osZUFBSywrQkFBK0IsMEVBQTBFLEdBQ2pIO0FBQUEsSUFFSjtBQUNBLFdBQU8sS0FBSyxNQUFNO0FBQUEsRUFDcEI7QUFDRjtBQUdlLFNBQVIsYUFBOEI7QUFDbkMsU0FDRSw2Q0FBQyxpQkFDQyx1REFBQyxjQUFXLEdBQ2Q7QUFFSjs7O0FEcnFCUSxJQUFBQyxzQkFBQTtBQUpSLElBQU0sYUFBYSxNQUFNO0FBQ3ZCLFNBQ0UsNkNBQUMsZ0JBQ0MsdURBQUMsZ0JBQ0MsdURBQUMsY0FBVyxHQUNkLEdBQ0Y7QUFFSjtBQUVBLElBQU0sUUFBUSxNQUFNO0FBQ2xCLFFBQU0sU0FBUyxTQUFTLGVBQWUsa0JBQWtCO0FBQ3pELE1BQUksQ0FBQyxPQUFRO0FBRWIsUUFBTSxVQUFVLDZDQUFDLGNBQVc7QUFFNUIsTUFBSSxPQUFPLFdBQVc7QUFDcEIsV0FBTyxVQUFVLE9BQU8sT0FBTztBQUMvQjtBQUFBLEVBQ0Y7QUFFQSxRQUFNLFdBQU8sMEJBQVcsTUFBTTtBQUM5QixTQUFPLFlBQVk7QUFDbkIsT0FBSyxPQUFPLE9BQU87QUFDckI7QUFFQSxJQUFJLFNBQVMsZUFBZSxjQUFjLFNBQVMsZUFBZSxlQUFlO0FBQy9FLFFBQU07QUFDUixPQUFPO0FBQ0wsV0FBUyxpQkFBaUIsb0JBQW9CLEtBQUs7QUFDckQ7QUFFQSxJQUFPLHFCQUFROyIsCiAgIm5hbWVzIjogWyJpbXBvcnRfcmVhY3QiLCAiUmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImNhbkFjY2VzcyIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiUmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIl0KfQo=
