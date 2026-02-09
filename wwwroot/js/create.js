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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvY3JlYWNpb24vQ3JlYXRlUGFnZS50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvY3JlYWNpb24vQ3JlYXRlRm9ybS50c3giLCAiLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvdmlzaXRhcy9Db250YWN0c0NvbWJvYm94LnRzeCIsICIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQGhlcm9pY29ucy9yZWFjdC8yMC9zb2xpZC9lc20vWE1hcmtJY29uLmpzIiwgIi4uL3JlYWN0L3NyYy9ob29rcy91c2VUb3BiYXIudHMiLCAiLi4vcmVhY3Qvc3JjL3V0aWxzL2dsb2JhbFNwaW5uZXIudHMiLCAiLi4vcmVhY3Qvc3JjL3V0aWxzL2luZElkcy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgY3JlYXRlUm9vdCB9IGZyb20gXCJyZWFjdC1kb20vY2xpZW50XCI7XG5pbXBvcnQgQ3JlYXRlRm9ybSBmcm9tIFwiLi9DcmVhdGVGb3JtLnRzeFwiO1xuaW1wb3J0IHsgSTE4blByb3ZpZGVyIH0gZnJvbSBcIi4uLy4uLy4uL2NvbnRleHQvSTE4bkNvbnRleHQudHN4XCI7XG5pbXBvcnQgeyBBdXRoUHJvdmlkZXIgfSBmcm9tIFwiLi4vLi4vLi4vY29udGV4dC9BdXRoQ29udGV4dC50c3hcIjtcblxudHlwZSBJbmRSb290RWxlbWVudCA9IEhUTUxFbGVtZW50ICYgeyBfX2luZFJvb3Q/OiBpbXBvcnQoXCJyZWFjdC1kb20vY2xpZW50XCIpLlJvb3QgfTtcblxuLy8gUGFnZSBlbnRyeSBmb3IgdGhlIHZpc2l0YXMgY3JlYXRlIGlzbGFuZC5cbmNvbnN0IENyZWF0ZVBhZ2UgPSAoKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPEkxOG5Qcm92aWRlcj5cbiAgICAgIDxBdXRoUHJvdmlkZXI+XG4gICAgICAgIDxDcmVhdGVGb3JtIC8+XG4gICAgICA8L0F1dGhQcm92aWRlcj5cbiAgICA8L0kxOG5Qcm92aWRlcj5cbiAgKTtcbn07XG5cbmNvbnN0IG1vdW50ID0gKCkgPT4ge1xuICBjb25zdCByb290RWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpc2l0YXMtYXBwLXJvb3RcIikgYXMgSW5kUm9vdEVsZW1lbnQgfCBudWxsO1xuICBpZiAoIXJvb3RFbCkgcmV0dXJuO1xuXG4gIGNvbnN0IGVsZW1lbnQgPSA8Q3JlYXRlUGFnZSAvPjtcblxuICBpZiAocm9vdEVsLl9faW5kUm9vdCkge1xuICAgIHJvb3RFbC5fX2luZFJvb3QucmVuZGVyKGVsZW1lbnQpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHJvb3QgPSBjcmVhdGVSb290KHJvb3RFbCk7XG4gIHJvb3RFbC5fX2luZFJvb3QgPSByb290O1xuICByb290LnJlbmRlcihlbGVtZW50KTtcbn07XG5cbmlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSBcImNvbXBsZXRlXCIgfHwgZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gXCJpbnRlcmFjdGl2ZVwiKSB7XG4gIG1vdW50KCk7XG59IGVsc2Uge1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBtb3VudCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IENyZWF0ZVBhZ2U7XG4iLCAiXHVGRUZGaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlU3RhdGUsIHVzZVJlZiB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgQ29uZmlybU1vZGFsIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvQ29uZmlybU1vZGFsLnRzeFwiO1xyXG5pbXBvcnQgU2luZ2xlRGF0ZVBpY2tlciBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NpbmdsZURhdGVQaWNrZXIudHN4XCI7XHJcbmltcG9ydCBTZWxlY3RDb21ib2JveCBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NlbGVjdENvbWJvYm94LnRzeFwiO1xyXG5pbXBvcnQgeyBmZXRjaEpzb24gfSBmcm9tIFwiLi4vLi4vLi4vc2VydmljZXMvYXBpU2VydmljZS50c1wiO1xyXG5pbXBvcnQgeyB1c2VWaXNpdGFzIH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZVZpc2l0YXMudHNcIjtcclxuaW1wb3J0IENsaWVudFNlYXJjaENvbWJvYm94IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL3Zpc2l0YXMvQ2xpZW50U2VhcmNoQ29tYm9ib3gudHN4XCI7XHJcbmltcG9ydCBDb250YWN0c0NvbWJvYm94IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL3Zpc2l0YXMvQ29udGFjdHNDb21ib2JveC50c3hcIjtcclxuaW1wb3J0IHsgdXNlVGFwR3VhcmQgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlVGFwR3VhcmQudHNcIjtcclxuaW1wb3J0IHsgdXNlVG9wYmFyIH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZVRvcGJhci50c1wiO1xyXG5pbXBvcnQgeyB1c2VDb25maXJtRGlhbG9nIH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZUNvbmZpcm1EaWFsb2cudHNcIjtcclxuaW1wb3J0IHsgY2xhc3NOYW1lcyB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9jbGFzc05hbWVzLnRzXCI7XHJcbmltcG9ydCB7IGluZEZvcm1hdCwgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB7IGNhbkFjY2Vzcywgc2hvd1Blcm1pc3Npb25Nb2RhbCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9wZXJtaXNzaW9ucy50c1wiO1xyXG5pbXBvcnQgeyBzaG93R2xvYmFsU3Bpbm5lciwgaGlkZUdsb2JhbFNwaW5uZXIgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvZ2xvYmFsU3Bpbm5lci50c1wiO1xyXG5pbXBvcnQgeyBpbmRFeHRyYWN0SWQsIGluZEV4dHJhY3RTaWduZWRJZCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJZHMudHNcIjtcbmltcG9ydCB7IHNldFByZXZpZXdBbmNob3IsIHNob3dQcmV2aWV3VG9vbHRpcCwgaXNPdmVyZmxvd2luZyB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9wcmV2aWV3VG9vbHRpcC50c1wiO1xyXG5pbXBvcnQgeyByZWFkQW5kQ2xlYXJUZXh0RWRpdG9yVmFsdWUsIFRFWFRfRURJVE9SX1BSRUZJWCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy90ZXh0RWRpdG9yLnRzXCI7XHJcbmltcG9ydCB7XHJcbiAgQ1JFQVRFX0ZSRVNIX1BBUkFNLFxyXG4gIFZJU0lUX0RSQUZUX0tFWSxcclxuICBDT05UQUNUU19TVE9SQUdFX0tFWSxcclxuICBDT05UQUNUU19TRUxFQ1RJT05fS0VZLFxyXG4gIGNsZWFyQ3JlYXRlU2VsZWN0aW9uQ2FjaGUsXHJcbiAgc3RyaXBGcmVzaFBhcmFtXHJcbn0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3Zpc2l0YXNTdG9yYWdlLnRzXCI7XHJcbmltcG9ydCB7IGZsYXNoQWN0aW9uTWFyaywgc2V0SGlzdG9yeUZpbHRlckZvckRhdGUgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvdmlzaXRhc0hpc3RvcnkudHNcIjtcclxuaW1wb3J0IHsgd2FpdCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy93YWl0LnRzXCI7XHJcblxyXG5mdW5jdGlvbiBWaXNpdGFzQXBwKCkge1xyXG4gIGNvbnN0IHsgdmlzaXRUeXBlcywgYXNpc3RlbnRlVGlwb3MgfSA9IHVzZVZpc2l0YXMoKTtcclxuICBjb25zdCBjYW5DcmVhdGVWaXNpdCA9IGNhbkFjY2VzcyhcIlZJU0lUQVNfQ1JFQUNJT05cIiwgXCJBZGRcIik7XHJcbiAgY29uc3QgY2FuUm9sbGJhY2tEZWxldGUgPSBjYW5BY2Nlc3MoXCJWSVNJVEFTX0hJU1RPUklBTFwiLCBcIkZ1bGxBY2Nlc3NcIik7XHJcblxyXG4gIGNvbnN0IGZpZWxkSWRDb21lbnRhcmlvcyA9IFwiVmlzaXRhLkNyZWF0ZS5Db21lbnRhcmlvc1wiO1xyXG4gIGNvbnN0IGZpZWxkSWRBbnRlY2VkZW50ZXMgPSBcIlZpc2l0YS5DcmVhdGUuQW50ZWNlZGVudGVzXCI7XHJcbiAgY29uc3QgZmllbGRJZENvbmNsdXNpb25lcyA9IFwiVmlzaXRhLkNyZWF0ZS5Db25jbHVzaW9uZXNcIjtcclxuXHJcbiAgY29uc3QgW3N0ZXAsIHNldFN0ZXBdID0gdXNlU3RhdGUoMSk7XHJcbiAgY29uc3QgW3NlbGVjdGVkQ2xpZW50LCBzZXRTZWxlY3RlZENsaWVudF0gPSB1c2VTdGF0ZShudWxsKTtcclxuICBjb25zdCBbc2VsZWN0ZWRDb250YWN0cywgc2V0U2VsZWN0ZWRDb250YWN0c10gPSB1c2VTdGF0ZShbXSk7XHJcbiAgY29uc3QgdG9kYXlTdHJpbmcgPSAoKSA9PiB7XHJcbiAgICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKCk7XHJcbiAgICBjb25zdCB5eXl5ID0gdG9kYXkuZ2V0RnVsbFllYXIoKTtcclxuICAgIGNvbnN0IG1tID0gU3RyaW5nKHRvZGF5LmdldE1vbnRoKCkgKyAxKS5wYWRTdGFydCgyLCBcIjBcIik7XHJcbiAgICBjb25zdCBkZCA9IFN0cmluZyh0b2RheS5nZXREYXRlKCkpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcclxuICAgIHJldHVybiBgJHt5eXl5fS0ke21tfS0ke2RkfWA7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgZGVmYXVsdFZpc2l0VHlwZSA9IHZpc2l0VHlwZXNbMF0/LnZhbHVlID8/IHZpc2l0VHlwZXNbMF0/LlZhbHVlID8/IFwiXCI7XHJcbiAgY29uc3QgZGVmYXVsdEFzaXN0ZW50ZVRpcG8gPSBhc2lzdGVudGVUaXBvc1swXT8udmFsdWUgPz8gYXNpc3RlbnRlVGlwb3NbMF0/LlZhbHVlID8/IFwiMFwiO1xyXG5cclxuICBjb25zdCBbdmlzaXRUeXBlLCBzZXRWaXNpdFR5cGVdID0gdXNlU3RhdGUoZGVmYXVsdFZpc2l0VHlwZSk7XHJcbiAgY29uc3QgW3RyYW5zRGF0ZSwgc2V0VHJhbnNEYXRlXSA9IHVzZVN0YXRlKCgpID0+IHRvZGF5U3RyaW5nKCkpO1xyXG4gIGNvbnN0IFtkZXNjcmlwdGlvbiwgc2V0RGVzY3JpcHRpb25dID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW2NvbWVudGFyaW9zLCBzZXRDb21lbnRhcmlvc10gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbYW50ZWNlZGVudGVzLCBzZXRBbnRlY2VkZW50ZXNdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW2NvbmNsdXNpb25lcywgc2V0Q29uY2x1c2lvbmVzXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtzdGF0dXMsIHNldFN0YXR1c10gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2J1c3ksIHNldEJ1c3ldID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbc2hvd1JlcXVpcmVkLCBzZXRTaG93UmVxdWlyZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBkcmFmdFJlc3RvcmVkUmVmID0gdXNlUmVmKGZhbHNlKTtcbiAgY29uc3QgZHJhZnRQZXJzaXN0VGltZXJSZWYgPSB1c2VSZWY8bnVtYmVyIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFttb2RhbEVycm9yLCBzZXRNb2RhbEVycm9yXSA9IHVzZVN0YXRlKFwiXCIpO1xuXHJcbiAgY29uc3QgeyBtb2RhbCwgb3BlbkNvbmZpcm0sIGNsb3NlQ29uZmlybSwgaGFuZGxlQ29uZmlybSB9ID0gdXNlQ29uZmlybURpYWxvZyh7XHJcbiAgICBkZWZhdWx0Q29uZmlybVRleHQ6IGluZFQoXCJDb25maXJtX1llc1wiLCBcIk9LXCIpLFxyXG4gICAgZGVmYXVsdENhbmNlbFRleHQ6IGluZFQoXCJDb25maXJtX05vXCIsIFwiQ2FuY2VsXCIpXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZU1vZGFsQ29uZmlybSA9IFJlYWN0LnVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcclxuICAgIHNldE1vZGFsRXJyb3IoXCJcIik7XHJcbiAgICBhd2FpdCBoYW5kbGVDb25maXJtKHtcclxuICAgICAgYnVzeSxcclxuICAgICAgb25FcnJvcjogKG1zZykgPT4ge1xyXG4gICAgICAgIHNldE1vZGFsRXJyb3IobXNnKTtcclxuICAgICAgICBzZXRTdGF0dXMobXNnKTtcclxuICAgICAgICBmbGFzaEFjdGlvbk1hcmsoXCJlcnJvclByb2Nlc3NcIiwgMTUwMCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0sIFtidXN5LCBoYW5kbGVDb25maXJtXSk7XHJcblxyXG4gIGNvbnN0IG1vZGFsTG9hZGluZ1RleHQgPSBpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpO1xyXG4gIGNvbnN0IG1vZGFsQ2FuY2VsVGV4dCA9IG1vZGFsLmNhbmNlbFRleHQgfHwgaW5kVChcIkNvbmZpcm1fTm9cIiwgXCJDYW5jZWxcIik7XHJcbiAgY29uc3QgbW9kYWxDb25maXJtVGV4dCA9IGJ1c3lcclxuICAgID8gbW9kYWxMb2FkaW5nVGV4dFxyXG4gICAgOiAoIWJ1c3kgJiYgbW9kYWxFcnJvciA/IGluZFQoXCJDb21tb25fT0tcIiwgXCJPS1wiKSA6IChtb2RhbC5jb25maXJtVGV4dCB8fCBpbmRUKFwiQ29uZmlybV9ZZXNcIiwgXCJPS1wiKSkpO1xyXG5cclxuICBjb25zdCBoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm0gPSBSZWFjdC51c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAoIWJ1c3kgJiYgbW9kYWxFcnJvcikge1xyXG4gICAgICBjbG9zZUNvbmZpcm0oKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaGFuZGxlTW9kYWxDb25maXJtKCk7XHJcbiAgfSwgW2J1c3ksIG1vZGFsRXJyb3IsIGNsb3NlQ29uZmlybSwgaGFuZGxlTW9kYWxDb25maXJtXSk7XHJcblxyXG4gIC8vIEJ1aWxkIGEgZHJhZnQgc25hcHNob3QgZm9yIHNlc3Npb25TdG9yYWdlLlxyXG4gIGNvbnN0IGJ1aWxkRHJhZnQgPSBSZWFjdC51c2VDYWxsYmFjayhcbiAgICAoKSA9PiAoe1xuICAgICAgc2VsZWN0ZWRDbGllbnQsXG4gICAgICBzZWxlY3RlZENvbnRhY3RzLFxuICAgICAgdmlzaXRUeXBlLFxyXG4gICAgICB0cmFuc0RhdGUsXHJcbiAgICAgIGRlc2NyaXB0aW9uLFxyXG4gICAgICBjb21lbnRhcmlvcyxcclxuICAgICAgYW50ZWNlZGVudGVzLFxyXG4gICAgICBjb25jbHVzaW9uZXMsXHJcbiAgICAgIHN0ZXAsXHJcbiAgICB9KSxcclxuICAgIFtzZWxlY3RlZENsaWVudCwgc2VsZWN0ZWRDb250YWN0cywgdmlzaXRUeXBlLCB0cmFuc0RhdGUsIGRlc2NyaXB0aW9uLCBjb21lbnRhcmlvcywgYW50ZWNlZGVudGVzLCBjb25jbHVzaW9uZXMsIHN0ZXBdXG4gICk7XG5cbiAgLy8gUGVyc2lzdCBhIGRyYWZ0IHNuYXBzaG90IHdpdGggZGVmZW5zaXZlIHN0b3JhZ2UgZ3VhcmRzLlxuICBjb25zdCBwZXJzaXN0RHJhZnRTbmFwc2hvdCA9IFJlYWN0LnVzZUNhbGxiYWNrKChkcmFmdCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFZJU0lUX0RSQUZUX0tFWSwgSlNPTi5zdHJpbmdpZnkoZHJhZnQpKTtcbiAgICB9IGNhdGNoIHtcbiAgICAgIC8qIGlnbm9yZSBxdW90YSBlcnJvcnMgKi9cbiAgICB9XG4gIH0sIFtdKTtcblxuICAvLyBTdG9yZSB0aGUgZHJhZnQgYmVmb3JlIGxlYXZpbmcgdGhlIHBhZ2UgdG8ga2VlcCBzdGVwIDIgb24gcmV0dXJuLlxuICBjb25zdCBwZXJzaXN0RHJhZnROb3cgPSBSZWFjdC51c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgcGVyc2lzdERyYWZ0U25hcHNob3QoYnVpbGREcmFmdCgpKTtcbiAgfSwgW2J1aWxkRHJhZnQsIHBlcnNpc3REcmFmdFNuYXBzaG90XSk7XG5cclxuICAvLyBPcGVucyB0aGUgZnVsbC1zY3JlZW4gdGV4dCBlZGl0b3IgZm9yIGEgbXVsdGlsaW5lIGZpZWxkLlxyXG4gIGNvbnN0IG9wZW5UZXh0RWRpdG9yID0gUmVhY3QudXNlQ2FsbGJhY2soXHJcbiAgICAoZmllbGRJZDogc3RyaW5nLCBmaWVsZExhYmVsOiBzdHJpbmcsIGZpZWxkVmFsdWU6IHN0cmluZywgb3B0aW9uczogeyBhbGxvd0VkaXQ/OiBib29sZWFuIH0gPSB7fSkgPT4ge1xyXG4gICAgY29uc3Qgc2FmZUlkID0gU3RyaW5nKGZpZWxkSWQgfHwgXCJcIikudHJpbSgpO1xyXG4gICAgY29uc3Qgc2FmZUxhYmVsID0gU3RyaW5nKGZpZWxkTGFiZWwgfHwgXCJcIikudHJpbSgpO1xyXG4gICAgY29uc3QgYWxsb3dFZGl0ID0gb3B0aW9ucz8uYWxsb3dFZGl0ICE9PSBmYWxzZTtcclxuICAgIGlmICghc2FmZUlkIHx8ICFzYWZlTGFiZWwpIHJldHVybjtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBrZXkgPSBgJHtURVhUX0VESVRPUl9QUkVGSVh9JHtzYWZlSWR9YDtcclxuICAgICAgLy8gUHJpbWUgdGhlIGVkaXRvciB3aXRoIHRoZSBjdXJyZW50IHZhbHVlIHdpdGhvdXQgcHVzaGluZyBsYXJnZSB0ZXh0IGludG8gdGhlIFVSTC5cclxuICAgICAgaWYgKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oa2V5KSA9PT0gbnVsbCkge1xyXG4gICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oa2V5LCBTdHJpbmcoZmllbGRWYWx1ZSB8fCBcIlwiKSk7XHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2gge1xyXG4gICAgICAvKiBpZ25vcmUgKi9cclxuICAgIH1cclxuXHJcbiAgICBwZXJzaXN0RHJhZnROb3coKTtcclxuICAgIGNvbnN0IHJldHVyblVybCA9IGAke3dpbmRvdy5sb2NhdGlvbi5wYXRobmFtZX0ke3dpbmRvdy5sb2NhdGlvbi5zZWFyY2ggfHwgXCJcIn1gO1xyXG4gICAgdHJ5IHtcclxuICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShgJHtURVhUX0VESVRPUl9QUkVGSVh9JHtzYWZlSWR9X3JldHVyblVybGAsIHJldHVyblVybCk7XHJcbiAgICB9IGNhdGNoIHtcclxuICAgICAgLyogaWdub3JlICovXHJcbiAgICB9XHJcbiAgICBjb25zdCB1cmwgPVxyXG4gICAgICBgL1RleHRFZGl0b3JSZWFjdC9FZGl0RmllbGQ/ZmllbGRJZD0ke2VuY29kZVVSSUNvbXBvbmVudChzYWZlSWQpfWAgK1xyXG4gICAgICBgJmZpZWxkTGFiZWw9JHtlbmNvZGVVUklDb21wb25lbnQoc2FmZUxhYmVsKX1gICtcclxuICAgICAgYCZyZXR1cm5Vcmw9JHtlbmNvZGVVUklDb21wb25lbnQocmV0dXJuVXJsKX1gICtcclxuICAgICAgYCZhbGxvd0VkaXQ9JHthbGxvd0VkaXQgPyBcIjFcIiA6IFwiMFwifWA7XHJcblxyXG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSB1cmw7XHJcbiAgICB9LFxyXG4gICAgW3BlcnNpc3REcmFmdE5vd11cclxuICApO1xyXG5cclxuICBjb25zdCBoYW5kbGVDb21lbnRhcmlvc1RhcCA9IFJlYWN0LnVzZUNhbGxiYWNrKChldmVudCkgPT4ge1xyXG4gICAgaWYgKGJ1c3kpIHJldHVybjtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBvcGVuVGV4dEVkaXRvcihmaWVsZElkQ29tZW50YXJpb3MsIGluZFQoXCJWaXNpdHNfRmllbGRfQ29tbWVudHNcIiwgXCJDb21tZW50c1wiKSwgY29tZW50YXJpb3MpO1xyXG4gIH0sIFtidXN5LCBjb21lbnRhcmlvcywgb3BlblRleHRFZGl0b3JdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQ29tZW50YXJpb3NIb2xkID0gUmVhY3QudXNlQ2FsbGJhY2soKHRhcmdldCwgY2xpZW50WSkgPT4ge1xyXG4gICAgaWYgKCF0YXJnZXQgfHwgIWlzT3ZlcmZsb3dpbmcodGFyZ2V0KSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgc2V0UHJldmlld0FuY2hvcih0YXJnZXQpO1xyXG4gICAgcmV0dXJuIHNob3dQcmV2aWV3VG9vbHRpcChTdHJpbmcoY29tZW50YXJpb3MgfHwgXCJcIiksIGNsaWVudFkpO1xyXG4gIH0sIFtjb21lbnRhcmlvc10pO1xyXG5cclxuICBjb25zdCBoYW5kbGVBbnRlY2VkZW50ZXNUYXAgPSBSZWFjdC51c2VDYWxsYmFjaygoZXZlbnQpID0+IHtcclxuICAgIGlmIChidXN5KSByZXR1cm47XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgb3BlblRleHRFZGl0b3IoZmllbGRJZEFudGVjZWRlbnRlcywgaW5kVChcIlZpc2l0c19GaWVsZF9CYWNrZ3JvdW5kXCIsIFwiQmFja2dyb3VuZFwiKSwgYW50ZWNlZGVudGVzKTtcclxuICB9LCBbYnVzeSwgYW50ZWNlZGVudGVzLCBvcGVuVGV4dEVkaXRvcl0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVBbnRlY2VkZW50ZXNIb2xkID0gUmVhY3QudXNlQ2FsbGJhY2soKHRhcmdldCwgY2xpZW50WSkgPT4ge1xyXG4gICAgaWYgKCF0YXJnZXQgfHwgIWlzT3ZlcmZsb3dpbmcodGFyZ2V0KSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgc2V0UHJldmlld0FuY2hvcih0YXJnZXQpO1xyXG4gICAgcmV0dXJuIHNob3dQcmV2aWV3VG9vbHRpcChTdHJpbmcoYW50ZWNlZGVudGVzIHx8IFwiXCIpLCBjbGllbnRZKTtcclxuICB9LCBbYW50ZWNlZGVudGVzXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUNvbmNsdXNpb25lc1RhcCA9IFJlYWN0LnVzZUNhbGxiYWNrKChldmVudCkgPT4ge1xyXG4gICAgaWYgKGJ1c3kpIHJldHVybjtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBvcGVuVGV4dEVkaXRvcihmaWVsZElkQ29uY2x1c2lvbmVzLCBpbmRUKFwiVmlzaXRzX0ZpZWxkX0NvbmNsdXNpb25zXCIsIFwiQ29uY2x1c2lvbnNcIiksIGNvbmNsdXNpb25lcyk7XHJcbiAgfSwgW2J1c3ksIGNvbmNsdXNpb25lcywgb3BlblRleHRFZGl0b3JdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQ29uY2x1c2lvbmVzSG9sZCA9IFJlYWN0LnVzZUNhbGxiYWNrKCh0YXJnZXQsIGNsaWVudFkpID0+IHtcclxuICAgIGlmICghdGFyZ2V0IHx8ICFpc092ZXJmbG93aW5nKHRhcmdldCkpIHJldHVybiBmYWxzZTtcclxuICAgIHNldFByZXZpZXdBbmNob3IodGFyZ2V0KTtcclxuICAgIHJldHVybiBzaG93UHJldmlld1Rvb2x0aXAoU3RyaW5nKGNvbmNsdXNpb25lcyB8fCBcIlwiKSwgY2xpZW50WSk7XHJcbiAgfSwgW2NvbmNsdXNpb25lc10pO1xyXG5cclxuICBjb25zdCBjb21lbnRhcmlvc1RhcCA9IHVzZVRhcEd1YXJkKGhhbmRsZUNvbWVudGFyaW9zVGFwLCBoYW5kbGVDb21lbnRhcmlvc0hvbGQpO1xyXG4gIGNvbnN0IGFudGVjZWRlbnRlc1RhcCA9IHVzZVRhcEd1YXJkKGhhbmRsZUFudGVjZWRlbnRlc1RhcCwgaGFuZGxlQW50ZWNlZGVudGVzSG9sZCk7XHJcbiAgY29uc3QgY29uY2x1c2lvbmVzVGFwID0gdXNlVGFwR3VhcmQoaGFuZGxlQ29uY2x1c2lvbmVzVGFwLCBoYW5kbGVDb25jbHVzaW9uZXNIb2xkKTtcclxuXHJcbiAgY29uc3QgYXBwbHlUZXh0RWRpdG9yVmFsdWVzID0gUmVhY3QudXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgY29uc3QgdmFsQ29tZW50YXJpb3MgPSByZWFkQW5kQ2xlYXJUZXh0RWRpdG9yVmFsdWUoZmllbGRJZENvbWVudGFyaW9zKTtcclxuICAgIGlmICh2YWxDb21lbnRhcmlvcyAhPT0gbnVsbCkgc2V0Q29tZW50YXJpb3ModmFsQ29tZW50YXJpb3MpO1xyXG5cclxuICAgIGNvbnN0IHZhbEFudGVjZWRlbnRlcyA9IHJlYWRBbmRDbGVhclRleHRFZGl0b3JWYWx1ZShmaWVsZElkQW50ZWNlZGVudGVzKTtcclxuICAgIGlmICh2YWxBbnRlY2VkZW50ZXMgIT09IG51bGwpIHNldEFudGVjZWRlbnRlcyh2YWxBbnRlY2VkZW50ZXMpO1xyXG5cclxuICAgIGNvbnN0IHZhbENvbmNsdXNpb25lcyA9IHJlYWRBbmRDbGVhclRleHRFZGl0b3JWYWx1ZShmaWVsZElkQ29uY2x1c2lvbmVzKTtcclxuICAgIGlmICh2YWxDb25jbHVzaW9uZXMgIT09IG51bGwpIHNldENvbmNsdXNpb25lcyh2YWxDb25jbHVzaW9uZXMpO1xyXG4gIH0sIFtmaWVsZElkQ29tZW50YXJpb3MsIGZpZWxkSWRBbnRlY2VkZW50ZXMsIGZpZWxkSWRDb25jbHVzaW9uZXNdKTtcclxuXHJcbiAgLy8gQ2xlYXIgY29udGFjdHMgb25seSB3aGVuIHRoZSBjbGllbnQgY2hhbmdlcyAoYXZvaWQgY2xlYXJpbmcgb24gcmVzdG9yZS9zdGVwIDIgcmV0dXJuKS5cclxuICBjb25zdCBwcmV2Q2xpZW50UmVmID0gdXNlUmVmKG51bGwpO1xyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBjdXJyZW50ID0gc2VsZWN0ZWRDbGllbnQ/LnZhbHVlO1xyXG4gICAgaWYgKHByZXZDbGllbnRSZWYuY3VycmVudCAmJiBwcmV2Q2xpZW50UmVmLmN1cnJlbnQgIT09IGN1cnJlbnQpIHtcclxuICAgICAgc2V0U2VsZWN0ZWRDb250YWN0cyhbXSk7XHJcbiAgICB9XHJcbiAgICBwcmV2Q2xpZW50UmVmLmN1cnJlbnQgPSBjdXJyZW50O1xyXG4gIH0sIFtzZWxlY3RlZENsaWVudD8udmFsdWVdKTtcclxuXHJcbiAgY29uc3QgbGFzdENsaWVudFJlZiA9IHVzZVJlZihudWxsKTtcclxuXHJcbiAgLy8gSWYgdGhlIGNsaWVudCBjaGFuZ2VzIGFmdGVyIHNlbGVjdGluZyBjb250YWN0cywgcmVzZXQgdGhlIGVudGlyZSBmb3JtLlxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBjdXJyZW50ID0gc2VsZWN0ZWRDbGllbnQ/LnZhbHVlO1xyXG4gICAgaWYgKCFjdXJyZW50KSByZXR1cm47XHJcblxyXG4gICAgaWYgKGxhc3RDbGllbnRSZWYuY3VycmVudCAmJiBsYXN0Q2xpZW50UmVmLmN1cnJlbnQgIT09IGN1cnJlbnQpIHtcclxuICAgICAgc2V0U3RlcCgxKTtcclxuICAgICAgc2V0U2VsZWN0ZWRDb250YWN0cyhbXSk7XHJcbiAgICAgIHNldFZpc2l0VHlwZShkZWZhdWx0VmlzaXRUeXBlKTtcclxuICAgICAgc2V0VHJhbnNEYXRlKHRvZGF5U3RyaW5nKCkpO1xyXG4gICAgICBzZXREZXNjcmlwdGlvbihcIlwiKTtcclxuICAgICAgc2V0Q29tZW50YXJpb3MoXCJcIik7XHJcbiAgICAgIHNldEFudGVjZWRlbnRlcyhcIlwiKTtcclxuICAgICAgc2V0Q29uY2x1c2lvbmVzKFwiXCIpO1xyXG4gICAgICBzZXRTdGF0dXMoXCJcIik7XHJcbiAgICAgIHNldEJ1c3koZmFsc2UpO1xyXG4gICAgfVxyXG4gICAgbGFzdENsaWVudFJlZi5jdXJyZW50ID0gY3VycmVudDtcclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC1ob29rcy9leGhhdXN0aXZlLWRlcHNcclxuICB9LCBbc2VsZWN0ZWRDbGllbnQ/LnZhbHVlXSk7XHJcblxyXG4gIC8vIFBlcnNpc3QgZHJhZnQgaW4gc2Vzc2lvblN0b3JhZ2UgKHNraXAgdW50aWwgd2UgcmVzdG9yZWQgYW55IHNhdmVkIGRyYWZ0KS5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWRyYWZ0UmVzdG9yZWRSZWYuY3VycmVudCkgcmV0dXJuO1xuXG4gICAgaWYgKGRyYWZ0UGVyc2lzdFRpbWVyUmVmLmN1cnJlbnQpIHtcbiAgICAgIGNsZWFyVGltZW91dChkcmFmdFBlcnNpc3RUaW1lclJlZi5jdXJyZW50KTtcbiAgICB9XG5cbiAgICBkcmFmdFBlcnNpc3RUaW1lclJlZi5jdXJyZW50ID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgZHJhZnRQZXJzaXN0VGltZXJSZWYuY3VycmVudCA9IG51bGw7XG4gICAgICBwZXJzaXN0RHJhZnRTbmFwc2hvdChidWlsZERyYWZ0KCkpO1xuICAgIH0sIDE4MCk7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgaWYgKGRyYWZ0UGVyc2lzdFRpbWVyUmVmLmN1cnJlbnQpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KGRyYWZ0UGVyc2lzdFRpbWVyUmVmLmN1cnJlbnQpO1xuICAgICAgICBkcmFmdFBlcnNpc3RUaW1lclJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9O1xuICB9LCBbYnVpbGREcmFmdCwgcGVyc2lzdERyYWZ0U25hcHNob3RdKTtcblxyXG4gIC8vIFJlc3RvcmUgZHJhZnQgb24gbW91bnRcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBsZXQgZnJlc2hMb2FkID0gZmFsc2U7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHVybCA9IG5ldyBVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xuICAgICAgZnJlc2hMb2FkID0gdXJsLnNlYXJjaFBhcmFtcy5oYXMoQ1JFQVRFX0ZSRVNIX1BBUkFNKTtcbiAgICB9IGNhdGNoIHtcbiAgICAgIGZyZXNoTG9hZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChmcmVzaExvYWQpIHtcbiAgICAgIGNsZWFyQ3JlYXRlU2VsZWN0aW9uQ2FjaGUoKTtcbiAgICAgIHN0cmlwRnJlc2hQYXJhbSgpO1xuICAgICAgZHJhZnRSZXN0b3JlZFJlZi5jdXJyZW50ID0gdHJ1ZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgc2hvdWxkU2hvdyA9IGZhbHNlO1xuICAgIHRyeSB7XG4gICAgICBzaG91bGRTaG93ID0gISEoXG4gICAgICAgIHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oVklTSVRfRFJBRlRfS0VZKSB8fFxuICAgICAgICBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKENPTlRBQ1RTX1NUT1JBR0VfS0VZKSB8fFxuICAgICAgICBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKENPTlRBQ1RTX1NFTEVDVElPTl9LRVkpXHJcbiAgICAgICk7XHJcbiAgICB9IGNhdGNoIHtcclxuICAgICAgLyogaWdub3JlIHN0b3JhZ2UgYWNjZXNzICovXHJcbiAgICB9XHJcbiAgICBpZiAoc2hvdWxkU2hvdykge1xyXG4gICAgICBzaG93R2xvYmFsU3Bpbm5lcihpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpKTtcclxuICAgIH1cclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHJhdyA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oVklTSVRfRFJBRlRfS0VZKTtcclxuICAgICAgaWYgKHJhdykge1xyXG4gICAgICAgIGNvbnN0IGRyYWZ0ID0gSlNPTi5wYXJzZShyYXcpO1xyXG4gICAgICAgIGlmIChkcmFmdD8uc2VsZWN0ZWRDbGllbnQ/LnZhbHVlKSBzZXRTZWxlY3RlZENsaWVudChkcmFmdC5zZWxlY3RlZENsaWVudCk7XHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZHJhZnQ/LnNlbGVjdGVkQ29udGFjdHMpKSBzZXRTZWxlY3RlZENvbnRhY3RzKGRyYWZ0LnNlbGVjdGVkQ29udGFjdHMpO1xyXG4gICAgICAgIGlmIChkcmFmdD8udmlzaXRUeXBlICE9PSB1bmRlZmluZWQpIHNldFZpc2l0VHlwZShkcmFmdC52aXNpdFR5cGUpO1xyXG4gICAgICAgIGlmIChkcmFmdD8udHJhbnNEYXRlKSBzZXRUcmFuc0RhdGUoZHJhZnQudHJhbnNEYXRlKTtcclxuICAgICAgICBpZiAoZHJhZnQ/LmRlc2NyaXB0aW9uICE9PSB1bmRlZmluZWQpIHNldERlc2NyaXB0aW9uKGRyYWZ0LmRlc2NyaXB0aW9uKTtcclxuICAgICAgICBpZiAoZHJhZnQ/LmNvbWVudGFyaW9zICE9PSB1bmRlZmluZWQpIHNldENvbWVudGFyaW9zKGRyYWZ0LmNvbWVudGFyaW9zKTtcclxuICAgICAgICBpZiAoZHJhZnQ/LmFudGVjZWRlbnRlcyAhPT0gdW5kZWZpbmVkKSBzZXRBbnRlY2VkZW50ZXMoZHJhZnQuYW50ZWNlZGVudGVzKTtcclxuICAgICAgICBpZiAoZHJhZnQ/LmNvbmNsdXNpb25lcyAhPT0gdW5kZWZpbmVkKSBzZXRDb25jbHVzaW9uZXMoZHJhZnQuY29uY2x1c2lvbmVzKTtcclxuICAgICAgICBpZiAoZHJhZnQ/LnN0ZXAgPT09IDIpIHNldFN0ZXAoMik7XHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2gge1xyXG4gICAgICAvKiBpZ25vcmUgcGFyc2UgaXNzdWVzICovXHJcbiAgICB9IGZpbmFsbHkge1xyXG4gICAgICBpZiAoc2hvdWxkU2hvdykge1xyXG4gICAgICAgIGhpZGVHbG9iYWxTcGlubmVyKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGRyYWZ0UmVzdG9yZWRSZWYuY3VycmVudCA9IHRydWU7XHJcbiAgfSwgW10pO1xyXG5cclxuICAvLyBBcHBseSBwZW5kaW5nIHZhbHVlcyBjb21pbmcgZnJvbSB0aGUgZnVsbC1zY3JlZW4gdGV4dCBlZGl0b3IuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGFwcGx5VGV4dEVkaXRvclZhbHVlcygpO1xyXG4gICAgY29uc3Qgb25QYWdlU2hvdyA9ICgpID0+IGFwcGx5VGV4dEVkaXRvclZhbHVlcygpO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwYWdlc2hvd1wiLCBvblBhZ2VTaG93KTtcclxuICAgIHJldHVybiAoKSA9PiB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInBhZ2VzaG93XCIsIG9uUGFnZVNob3cpO1xyXG4gIH0sIFthcHBseVRleHRFZGl0b3JWYWx1ZXNdKTtcclxuXHJcbiAgY29uc3QgY2FuR29OZXh0ID0gISFzZWxlY3RlZENsaWVudDtcbiAgY29uc3QgY2FuQ3JlYXRlID1cbiAgICAhIXNlbGVjdGVkQ2xpZW50ICYmXG4gICAgU3RyaW5nKHZpc2l0VHlwZSB8fCBcIlwiKS50cmltKCkgIT09IFwiXCIgJiZcbiAgICBTdHJpbmcodmlzaXRUeXBlKSAhPT0gXCIwXCIgJiZcbiAgICBkZXNjcmlwdGlvbi50cmltKCkubGVuZ3RoID4gMCAmJlxuICAgIGNvbWVudGFyaW9zLnRyaW0oKS5sZW5ndGggPiAwO1xyXG5cclxuICB1c2VUb3BiYXIoXHJcbiAgICBzdGVwLFxyXG4gICAgY2FuR29OZXh0LFxyXG4gICAgKCkgPT4ge1xyXG4gICAgICBpZiAoIWNhbkNyZWF0ZVZpc2l0KSB7XHJcbiAgICAgICAgc2hvd1Blcm1pc3Npb25Nb2RhbCgpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBpZiAoc3RlcCA9PT0gMSAmJiBjYW5Hb05leHQpIHNldFN0ZXAoMik7XHJcbiAgICAgIGlmIChzdGVwID09PSAyKSBoYW5kbGVTdWJtaXQoKTtcclxuICAgIH0sXHJcbiAgICAoKSA9PiBzZXRTdGVwKDEpLFxyXG4gICAgYnVzeSxcclxuICAgIGNhbkNyZWF0ZSxcclxuICAgIGNhbkNyZWF0ZVZpc2l0XHJcbiAgKTtcclxuXHJcbiAgY29uc3QgZG9DcmVhdGUgPSBhc3luYyAoKSA9PiB7XHJcbiAgICBpZiAoYnVzeSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgaWYgKCFjYW5DcmVhdGVWaXNpdCkge1xyXG4gICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHNldE1vZGFsRXJyb3IoXCJcIik7XHJcbiAgICBpZiAoIXNlbGVjdGVkQ2xpZW50KSB7XG4gICAgICBzZXRTdGF0dXMoaW5kVChcIlZpc2l0c19DcmVhdGVfU2VsZWN0Q2xpZW50UmVxdWlyZWRcIiwgXCJTZWxlY3QgYSBjbGllbnQuXCIpKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKFN0cmluZyh2aXNpdFR5cGUgfHwgXCJcIikgPT09IFwiXCIgfHwgU3RyaW5nKHZpc2l0VHlwZSkgPT09IFwiMFwiIHx8ICFkZXNjcmlwdGlvbi50cmltKCkgfHwgIWNvbWVudGFyaW9zLnRyaW0oKSkge1xuICAgICAgc2V0U2hvd1JlcXVpcmVkKHRydWUpO1xuICAgICAgc2V0U3RhdHVzKGluZFQoXCJWaXNpdHNfQ3JlYXRlX0NvbXBsZXRlUmVxdWlyZWRcIiwgXCJDb21wbGV0ZSByZXF1aXJlZCBmaWVsZHMuXCIpKTtcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHNldEJ1c3kodHJ1ZSk7XHJcbiAgICBzZXRTdGF0dXMoaW5kVChcIlZpc2l0c19DcmVhdGVfQ3JlYXRpbmdBY3Rpdml0eVwiLCBcIkNyZWF0aW5nIGFjdGl2aXR5Li4uXCIpKTtcclxuXHJcbiAgICBsZXQgY3JlYXRlZFJlY0lkID0gXCJcIjtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHBheWxvYWRBY3Rpdml0eSA9IHtcclxuICAgICAgICBhY2NvdW50TnVtOiBzZWxlY3RlZENsaWVudC52YWx1ZSxcclxuICAgICAgICB2aXNpdFR5cGUsXHJcbiAgICAgICAgZGVzY3JpcHRpb24sXHJcbiAgICAgICAgdHJhbnNEYXRlLFxyXG4gICAgICAgIGNvbWVudGFyaW9zLFxyXG4gICAgICAgIGFudGVjZWRlbnRlcyxcclxuICAgICAgICBjb25jbHVzaW9uZXMsXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBjb25zdCByZXNBY3QgPSBhd2FpdCBmZXRjaEpzb24oXCIvVmlzaXRhcy9DcmVhdGVBY3Rpdml0eVwiLCB7XHJcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXHJcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGF5bG9hZEFjdGl2aXR5KSxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpZiAoIXJlc0FjdC5zdWNjZXNzKSB0aHJvdyBuZXcgRXJyb3IocmVzQWN0Lm1lc3NhZ2UgfHwgaW5kVChcIlZpc2l0c19DcmVhdGVfQ3JlYXRlQWN0aXZpdHlGYWlsZWRcIiwgXCJGYWlsZWQgdG8gY3JlYXRlIGFjdGl2aXR5LlwiKSk7XHJcblxyXG4gICAgICBjb25zdCByZWNJZEFjdGl2aWRhZCA9XHJcbiAgICAgICAgaW5kRXh0cmFjdFNpZ25lZElkKHJlc0FjdC5kYXRhKSB8fFxyXG4gICAgICAgIGluZEV4dHJhY3RTaWduZWRJZChyZXNBY3QubWVzc2FnZSkgfHxcclxuICAgICAgICBpbmRFeHRyYWN0U2lnbmVkSWQoaW5kRXh0cmFjdElkKHJlc0FjdC5kYXRhKSB8fCBpbmRFeHRyYWN0SWQocmVzQWN0Lm1lc3NhZ2UpKTtcclxuICAgICAgaWYgKCFyZWNJZEFjdGl2aWRhZCkgdGhyb3cgbmV3IEVycm9yKGluZFQoXCJWaXNpdHNfQ3JlYXRlX0NyZWF0ZUFjdGl2aXR5RmFpbGVkXCIsIFwiRmFpbGVkIHRvIGNyZWF0ZSBhY3Rpdml0eS5cIikpO1xuICAgICAgY3JlYXRlZFJlY0lkID0gU3RyaW5nKHJlY0lkQWN0aXZpZGFkKTtcblxuICAgICAgaWYgKHNlbGVjdGVkQ29udGFjdHMubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCBhc3Npc3RhbnRCYXRjaFNpemUgPSA0O1xuICAgICAgICBjb25zdCBjcmVhdGVBc3Npc3RhbnQgPSBhc3luYyAoY29udGFjdCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHBheWxvYWRWaXNpdGEgPSB7XG4gICAgICAgICAgICByZWZSZWNJZEFjdGl2aWRhZDogcmVjSWRBY3RpdmlkYWQsXG4gICAgICAgICAgICBhc2lzdGVudGVUaXBvOiBkZWZhdWx0QXNpc3RlbnRlVGlwbyxcbiAgICAgICAgICAgIGFzaXN0ZW50ZUlkOiBjb250YWN0LnRleHQsXG4gICAgICAgICAgICBjb250YWN0b1JlY0lkOiBjb250YWN0LnZhbHVlLFxuICAgICAgICAgIH07XG4gICAgICAgICAgY29uc3QgcmVzVmlzID0gYXdhaXQgZmV0Y2hKc29uKFwiL1Zpc2l0YXMvQ3JlYXRlVmlzaXRhQXNpc3RlbnRlXCIsIHtcbiAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXlsb2FkVmlzaXRhKSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpZiAoIXJlc1Zpcy5zdWNjZXNzKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IocmVzVmlzLm1lc3NhZ2UgfHwgaW5kVChcIlZpc2l0c19DcmVhdGVfQ3JlYXRlVmlzaXRGYWlsZWRcIiwgXCJGYWlsZWQgdG8gY3JlYXRlIHZpc2l0LlwiKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGZvciAobGV0IGlkeCA9IDA7IGlkeCA8IHNlbGVjdGVkQ29udGFjdHMubGVuZ3RoOyBpZHggKz0gYXNzaXN0YW50QmF0Y2hTaXplKSB7XG4gICAgICAgICAgY29uc3QgYmF0Y2ggPSBzZWxlY3RlZENvbnRhY3RzLnNsaWNlKGlkeCwgaWR4ICsgYXNzaXN0YW50QmF0Y2hTaXplKTtcbiAgICAgICAgICBjb25zdCBmaXJzdCA9IGJhdGNoWzBdO1xuICAgICAgICAgIGlmIChmaXJzdCkge1xuICAgICAgICAgICAgc2V0U3RhdHVzKGluZEZvcm1hdChcIlZpc2l0c19DcmVhdGVfQ3JlYXRpbmdWaXNpdEZvclwiLCBcIkNyZWF0aW5nIHZpc2l0IGZvciB7MH0uLi5cIiwgZmlyc3QudGV4dCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBhd2FpdCBQcm9taXNlLmFsbChiYXRjaC5tYXAoKGNvbnRhY3QpID0+IGNyZWF0ZUFzc2lzdGFudChjb250YWN0KSkpO1xuICAgICAgICB9XG4gICAgICB9XG5cclxuICAgICAgdHJ5IHtcclxuICAgICAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKFZJU0lUX0RSQUZUX0tFWSk7XHJcbiAgICAgIH0gY2F0Y2gge1xyXG4gICAgICAgIC8qIGlnbm9yZSAqL1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzZXRIaXN0b3J5RmlsdGVyRm9yRGF0ZSh0cmFuc0RhdGUsIHRydWUpO1xuICAgICAgY2xvc2VDb25maXJtKCk7XHJcbiAgICAgIGF3YWl0IHdhaXQoMjAwKTtcclxuICAgICAgZmxhc2hBY3Rpb25NYXJrKFwib2tQcm9jZXNzXCIsIDEyMDApO1xyXG4gICAgICBhd2FpdCB3YWl0KDEyMDApO1xyXG4gICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL0hpc3RvcmlhbC9IaXN0b3J5XCI7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICBpZiAoY3JlYXRlZFJlY0lkICYmIGNhblJvbGxiYWNrRGVsZXRlKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIHNldFN0YXR1cyhpbmRUKFwiVmlzaXRzX0NyZWF0ZV9Sb2xsYmFja1wiLCBcIlJvbGxpbmcgYmFjayBhY3Rpdml0eS4uLlwiKSk7XHJcbiAgICAgICAgICBhd2FpdCBmZXRjaEpzb24oYC9WaXNpdGFzL0RlbGV0ZUFjdGl2aXR5LyR7ZW5jb2RlVVJJQ29tcG9uZW50KGNyZWF0ZWRSZWNJZCl9YCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXHJcbiAgICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBjYXRjaCB7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IG1zZyA9IGUubWVzc2FnZSB8fCBpbmRUKFwiVmlzaXRzX0NyZWF0ZV9DcmVhdGVWaXNpdEVycm9yXCIsIFwiRmFpbGVkIHRvIGNyZWF0ZSB0aGUgdmlzaXQuXCIpO1xyXG4gICAgICBzZXRNb2RhbEVycm9yKG1zZyk7XHJcbiAgICAgIHNldFN0YXR1cyhtc2cpO1xyXG4gICAgICBmbGFzaEFjdGlvbk1hcmsoXCJlcnJvclByb2Nlc3NcIiwgMTUwMCk7XHJcbiAgICAgIHNldEJ1c3koZmFsc2UpO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaGFuZGxlU3VibWl0ID0gKCkgPT4ge1xyXG4gICAgaWYgKGJ1c3kpIHJldHVybjtcclxuICAgIGlmICghY2FuQ3JlYXRlVmlzaXQpIHtcclxuICAgICAgc2hvd1Blcm1pc3Npb25Nb2RhbCgpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAobW9kYWwub3BlbikgcmV0dXJuO1xyXG4gICAgaWYgKCFzZWxlY3RlZENsaWVudCkge1xuICAgICAgc2V0U3RhdHVzKGluZFQoXCJWaXNpdHNfQ3JlYXRlX1NlbGVjdENsaWVudFJlcXVpcmVkXCIsIFwiU2VsZWN0IGEgY2xpZW50LlwiKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChTdHJpbmcodmlzaXRUeXBlIHx8IFwiXCIpID09PSBcIlwiIHx8IFN0cmluZyh2aXNpdFR5cGUpID09PSBcIjBcIiB8fCAhZGVzY3JpcHRpb24udHJpbSgpIHx8ICFjb21lbnRhcmlvcy50cmltKCkpIHtcbiAgICAgIHNldFNob3dSZXF1aXJlZCh0cnVlKTtcbiAgICAgIHNldFN0YXR1cyhpbmRUKFwiVmlzaXRzX0NyZWF0ZV9Db21wbGV0ZVJlcXVpcmVkXCIsIFwiQ29tcGxldGUgcmVxdWlyZWQgZmllbGRzLlwiKSk7XG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xyXG4gICAgb3BlbkNvbmZpcm0oe1xyXG4gICAgICB0aXRsZTogaW5kVChcIlZpc2l0c19DcmVhdGVfQ29uZmlybUNyZWF0ZV9UaXRsZVwiLCBcIkNvbmZpcm0gY3JlYXRlXCIpLFxyXG4gICAgICBtZXNzYWdlOiBpbmRUKFwiVmlzaXRzX0NyZWF0ZV9Db25maXJtQ3JlYXRlX0JvZHlcIiwgXCJEbyB5b3Ugd2FudCB0byBjcmVhdGUgdGhpcyB2aXNpdD9cIiksXHJcbiAgICAgIGNvbmZpcm1UZXh0OiBpbmRUKFwiQ29uZmlybV9ZZXNcIiwgXCJPS1wiKSxcclxuICAgICAgb25Db25maXJtOiBkb0NyZWF0ZSxcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoc3RlcCA9PT0gMSkge1xyXG4gICAgICBzZXRTaG93UmVxdWlyZWQoZmFsc2UpO1xyXG4gICAgICBjbG9zZUNvbmZpcm0oKTtcclxuICAgIH1cclxuICB9LCBbc3RlcCwgY2xvc2VDb25maXJtXSk7XHJcblxyXG4gIGNvbnN0IHZpc2l0VHlwZUludmFsaWQgPSBzaG93UmVxdWlyZWQgJiYgKFN0cmluZyh2aXNpdFR5cGUgfHwgXCJcIikgPT09IFwiXCIgfHwgU3RyaW5nKHZpc2l0VHlwZSkgPT09IFwiMFwiKTtcclxuICBjb25zdCBkZXNjcmlwdGlvbkludmFsaWQgPSBzaG93UmVxdWlyZWQgJiYgZGVzY3JpcHRpb24udHJpbSgpLmxlbmd0aCA9PT0gMDtcclxuICBjb25zdCBjb21lbnRhcmlvc0ludmFsaWQgPSBzaG93UmVxdWlyZWQgJiYgY29tZW50YXJpb3MudHJpbSgpLmxlbmd0aCA9PT0gMDtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS00XCI+XHJcbiAgICAgIDxDb25maXJtTW9kYWxcclxuICAgICAgICBvcGVuPXttb2RhbC5vcGVufVxyXG4gICAgICAgIHRpdGxlPXttb2RhbC50aXRsZX1cclxuICAgICAgICBtZXNzYWdlPXttb2RhbC5tZXNzYWdlfVxyXG4gICAgICAgIGNvbmZpcm1UZXh0PXttb2RhbENvbmZpcm1UZXh0fVxyXG4gICAgICAgIGNhbmNlbFRleHQ9e21vZGFsQ2FuY2VsVGV4dH1cclxuICAgICAgICBsb2FkaW5nVGV4dD17bW9kYWxMb2FkaW5nVGV4dH1cclxuICAgICAgICBzaG93Q2FuY2VsPXttb2RhbC5zaG93Q2FuY2VsfVxyXG4gICAgICAgIHNob3dDb25maXJtPXttb2RhbC5zaG93Q29uZmlybX1cclxuICAgICAgICBidXN5PXtidXN5fVxyXG4gICAgICAgIGVycm9yPXttb2RhbEVycm9yfVxyXG4gICAgICAgIHN0YXR1cz17c3RhdHVzfVxyXG4gICAgICAgIG9uQ29uZmlybT17aGFuZGxlTW9kYWxCdXR0b25Db25maXJtfVxyXG4gICAgICAgIG9uQ2FuY2VsPXtjbG9zZUNvbmZpcm19XHJcbiAgICAgIC8+XHJcbiAgICAgIHtzdGVwID09PSAxICYmIChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNlwiPlxyXG4gICAgICAgICAgPENsaWVudFNlYXJjaENvbWJvYm94XG4gICAgICAgICAgICB2YWx1ZT17c2VsZWN0ZWRDbGllbnR9XG4gICAgICAgICAgICBvblNlbGVjdGVkPXtzZXRTZWxlY3RlZENsaWVudH1cbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiVmlzaXRzX0NyZWF0ZV9TZWFyY2hDbGllbnRcIiwgXCJTZWFyY2ggY2xpZW50XCIpfVxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZEZvcm1hdChcIlZpc2l0c19DcmVhdGVfQ2xpZW50UGxhY2Vob2xkZXJcIiwgXCJUeXBlIGF0IGxlYXN0IHswfSBjaGFyYWN0ZXJzLi4uXCIsIDQpfVxuICAgICAgICAgICAgcG9ydGFsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcbiAgICAgICAgICAvPlxuXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktM1wiPlxyXG4gICAgICAgICAgICA8Q29udGFjdHNDb21ib2JveFxuICAgICAgICAgICAgICBhY2NvdW50TnVtPXtzZWxlY3RlZENsaWVudD8udmFsdWV9XG4gICAgICAgICAgICAgIHZhbHVlPXtzZWxlY3RlZENvbnRhY3RzfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17c2V0U2VsZWN0ZWRDb250YWN0c31cbiAgICAgICAgICAgICAgcG9ydGFsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICB7c2VsZWN0ZWRDb250YWN0cy5sZW5ndGggPiAwICYmIChcclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS02MDBcIj5cclxuICAgICAgICAgICAgICAgIHtpbmRGb3JtYXQoXCJWaXNpdHNfQ3JlYXRlX1NlbGVjdGVkQ29udGFjdHNDb3VudFwiLCBcInswfSBzZWxlY3RlZCBjb250YWN0KHMpXCIsIHNlbGVjdGVkQ29udGFjdHMubGVuZ3RoKX1cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApfVxyXG5cclxuICAgICAge3N0ZXAgPT09IDIgJiYgKFxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2hhZG93LXhzIGdsYXNzLXBhbmVsIHAtNCBzcGFjZS15LTQgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgcm91bmRlZC0yeGxcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1iYXNlIGZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS05MDAgYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTIwMCBwYi0zXCI+XHJcbiAgICAgICAgICAgIHtpbmRUKFwiVmlzaXRzX0NyZWF0ZV9WaXNpdERhdGFfVGl0bGVcIiwgXCJWaXNpdCBkZXRhaWxzXCIpfVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTIgZ2FwLTRcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ2aXNpdGEtZmllbGQtdGV4dFwiPlxyXG4gICAgICAgICAgICAgIDxTaW5nbGVEYXRlUGlja2VyIGxhYmVsPXtpbmRUKFwiVmlzaXRzX0RldGFpbF9EYXRlX0xhYmVsXCIsIFwiRGF0ZVwiKX0gdmFsdWU9e3RyYW5zRGF0ZX0gb25DaGFuZ2U9e3NldFRyYW5zRGF0ZX0gLz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxTZWxlY3RDb21ib2JveFxuICAgICAgICAgICAgICBsYWJlbD17aW5kVChcIlZpc2l0c19EZXRhaWxfVmlzaXRUeXBlX0xhYmVsXCIsIFwiVmlzaXQgdHlwZVwiKX1cbiAgICAgICAgICAgICAgb3B0aW9ucz17dmlzaXRUeXBlc31cbiAgICAgICAgICAgICAgdmFsdWU9e3Zpc2l0VHlwZX1cbiAgICAgICAgICAgICAgb25DaGFuZ2U9e3NldFZpc2l0VHlwZX1cbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJWaXNpdHNfRGV0YWlsX1Zpc2l0VHlwZV9QbGFjZWhvbGRlclwiLCBcIlNlbGVjdCB0eXBlXCIpfVxuICAgICAgICAgICAgICBpbnZhbGlkPXt2aXNpdFR5cGVJbnZhbGlkfVxuICAgICAgICAgICAgICBlbWl0T25WYWx1ZUNoYW5nZVxuICAgICAgICAgICAgICBwb3J0YWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgZ2FwLTNcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cclxuICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZm9ybS1sYWJlbCBmb250LXNlbWlib2xkXCI+e2luZFQoXCJWaXNpdHNfRmllbGRfRGVzY3JpcHRpb25cIiwgXCJEZXNjcmlwdGlvblwiKX08L2xhYmVsPlxyXG4gICAgICAgICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgICAgICAgaWQ9XCJkZXNjcmlwdGlvblwiXHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXHJcbiAgICAgICAgICAgICAgICAgIFwiZm9ybS1jb250cm9sXCIsXHJcbiAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uSW52YWxpZFxyXG4gICAgICAgICAgICAgICAgICAgID8gXCJib3JkZXItcm9zZS00MDAgYmctcm9zZS01MCBmb2N1czpyaW5nLXJvc2UtMjAwIGZvY3VzOmJvcmRlci1yb3NlLTQwMFwiXHJcbiAgICAgICAgICAgICAgICAgICAgOiBcImJvcmRlci1zbGF0ZS0yMDAgZm9jdXM6cmluZy1wcmltYXJ5IGZvY3VzOmJvcmRlci1wcmltYXJ5XCJcclxuICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICBtYXhMZW5ndGg9ezIwMH1cclxuICAgICAgICAgICAgICAgIHZhbHVlPXtkZXNjcmlwdGlvbn1cclxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0RGVzY3JpcHRpb24oZS50YXJnZXQudmFsdWUpfVxyXG4gICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMlwiPlxyXG4gICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb3JtLWxhYmVsIGZvbnQtc2VtaWJvbGRcIj57aW5kVChcIlZpc2l0c19GaWVsZF9Db21tZW50c1wiLCBcIkNvbW1lbnRzXCIpfTwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgPHRleHRhcmVhXHJcbiAgICAgICAgICAgICAgICBpZD1cImNvbWVudGFyaW9zXCJcclxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZm9ybS1jb250cm9sIGN1cnNvci1wb2ludGVyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY29tZW50YXJpb3NJbnZhbGlkXHJcbiAgICAgICAgICAgICAgICAgICAgICA/IFwiYm9yZGVyLXJvc2UtNDAwIGJnLXJvc2UtNTAgZm9jdXM6cmluZy1yb3NlLTIwMCBmb2N1czpib3JkZXItcm9zZS00MDBcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgOiBcImJvcmRlci1zbGF0ZS0yMDAgZm9jdXM6cmluZy1wcmltYXJ5IGZvY3VzOmJvcmRlci1wcmltYXJ5XCJcclxuICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgIHZhbHVlPXtjb21lbnRhcmlvc31cclxuICAgICAgICAgICAgICAgIHJlYWRPbmx5XHJcbiAgICAgICAgICAgICAgICBvblBvaW50ZXJEb3duPXtjb21lbnRhcmlvc1RhcC5vblBvaW50ZXJEb3dufVxyXG4gICAgICAgICAgICAgICAgb25Qb2ludGVyTW92ZT17Y29tZW50YXJpb3NUYXAub25Qb2ludGVyTW92ZX1cclxuICAgICAgICAgICAgICAgIG9uUG9pbnRlclVwPXtjb21lbnRhcmlvc1RhcC5vblBvaW50ZXJVcH1cclxuICAgICAgICAgICAgICAgIG9uUG9pbnRlckNhbmNlbD17Y29tZW50YXJpb3NUYXAub25Qb2ludGVyQ2FuY2VsfVxyXG4gICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cclxuICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZm9ybS1sYWJlbCBmb250LXNlbWlib2xkXCI+e2luZFQoXCJWaXNpdHNfRmllbGRfQmFja2dyb3VuZFwiLCBcIkJhY2tncm91bmRcIil9PC9sYWJlbD5cclxuICAgICAgICAgICAgICAgIDx0ZXh0YXJlYVxyXG4gICAgICAgICAgICAgICAgICBpZD1cImFudGVjZWRlbnRlc1wiXHJcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbCBjdXJzb3ItcG9pbnRlclwiXHJcbiAgICAgICAgICAgICAgICB2YWx1ZT17YW50ZWNlZGVudGVzfVxyXG4gICAgICAgICAgICAgICAgcmVhZE9ubHlcclxuICAgICAgICAgICAgICAgIG9uUG9pbnRlckRvd249e2FudGVjZWRlbnRlc1RhcC5vblBvaW50ZXJEb3dufVxyXG4gICAgICAgICAgICAgICAgb25Qb2ludGVyTW92ZT17YW50ZWNlZGVudGVzVGFwLm9uUG9pbnRlck1vdmV9XHJcbiAgICAgICAgICAgICAgICBvblBvaW50ZXJVcD17YW50ZWNlZGVudGVzVGFwLm9uUG9pbnRlclVwfVxyXG4gICAgICAgICAgICAgICAgb25Qb2ludGVyQ2FuY2VsPXthbnRlY2VkZW50ZXNUYXAub25Qb2ludGVyQ2FuY2VsfVxyXG4gICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMlwiPlxyXG4gICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb3JtLWxhYmVsIGZvbnQtc2VtaWJvbGRcIj57aW5kVChcIlZpc2l0c19GaWVsZF9Db25jbHVzaW9uc1wiLCBcIkNvbmNsdXNpb25zXCIpfTwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICA8dGV4dGFyZWFcclxuICAgICAgICAgICAgICAgICAgaWQ9XCJjb25jbHVzaW9uZXNcIlxyXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2wgY3Vyc29yLXBvaW50ZXJcIlxyXG4gICAgICAgICAgICAgICAgdmFsdWU9e2NvbmNsdXNpb25lc31cclxuICAgICAgICAgICAgICAgIHJlYWRPbmx5XHJcbiAgICAgICAgICAgICAgICBvblBvaW50ZXJEb3duPXtjb25jbHVzaW9uZXNUYXAub25Qb2ludGVyRG93bn1cclxuICAgICAgICAgICAgICAgIG9uUG9pbnRlck1vdmU9e2NvbmNsdXNpb25lc1RhcC5vblBvaW50ZXJNb3ZlfVxyXG4gICAgICAgICAgICAgICAgb25Qb2ludGVyVXA9e2NvbmNsdXNpb25lc1RhcC5vblBvaW50ZXJVcH1cclxuICAgICAgICAgICAgICAgIG9uUG9pbnRlckNhbmNlbD17Y29uY2x1c2lvbmVzVGFwLm9uUG9pbnRlckNhbmNlbH1cclxuICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTNcIj5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LXNsYXRlLTUwMFwiPntzdGF0dXN9PC9zcGFuPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICl9XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59XHJcblxyXG50eXBlIEVycm9yQm91bmRhcnlTdGF0ZSA9IHsgaGFzRXJyb3I6IGJvb2xlYW4gfTtcclxuXHJcbmNsYXNzIEVycm9yQm91bmRhcnkgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8UmVhY3QuUHJvcHNXaXRoQ2hpbGRyZW48e30+LCBFcnJvckJvdW5kYXJ5U3RhdGU+IHtcclxuICBjb25zdHJ1Y3Rvcihwcm9wczogUmVhY3QuUHJvcHNXaXRoQ2hpbGRyZW48e30+KSB7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcbiAgICB0aGlzLnN0YXRlID0geyBoYXNFcnJvcjogZmFsc2UgfTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBnZXREZXJpdmVkU3RhdGVGcm9tRXJyb3IoKSB7XHJcbiAgICByZXR1cm4geyBoYXNFcnJvcjogdHJ1ZSB9O1xyXG4gIH1cclxuXHJcbiAgY29tcG9uZW50RGlkQ2F0Y2goZXJyb3IsIGluZm8pIHtcclxuICB9XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIGlmICh0aGlzLnN0YXRlLmhhc0Vycm9yKSB7XHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTQgcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLXJvc2UtMjAwIGJnLXJvc2UtNTAgdGV4dC1yb3NlLTcwMFwiPlxyXG4gICAgICAgICAge2luZFQoXCJWaXNpdHNfQ3JlYXRlX0Vycm9yQm91bmRhcnlcIiwgXCJBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSByZW5kZXJpbmcgdGhlIHZpc2l0cyBwYWdlLiBSZWxvYWQgYW5kIHRyeSBhZ2Fpbi5cIil9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5jaGlsZHJlbjtcclxuICB9XHJcbn1cclxuXHJcbi8vIENyZWF0ZSBmbG93IFVJIHdyYXBwZWQgYnkgdGhlIGVycm9yIGJvdW5kYXJ5LlxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDcmVhdGVGb3JtKCkge1xyXG4gIHJldHVybiAoXHJcbiAgICA8RXJyb3JCb3VuZGFyeT5cclxuICAgICAgPFZpc2l0YXNBcHAgLz5cclxuICAgIDwvRXJyb3JCb3VuZGFyeT5cclxuICApO1xyXG59XG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgWE1hcmtJY29uIH0gZnJvbSBcIkBoZXJvaWNvbnMvcmVhY3QvMjAvc29saWRcIjtcbmltcG9ydCBGbG9hdGluZ0xpc3QgZnJvbSBcIi4uL2NvbW1vbnMvRmxvYXRpbmdMaXN0LnRzeFwiO1xuaW1wb3J0IFNwaW5uZXIgZnJvbSBcIi4uL2NvbW1vbnMvU3Bpbm5lci50c3hcIjtcbmltcG9ydCB7IENoZXZyb25Eb3duU3ZnLCBDaGV2cm9uVXBTdmcgfSBmcm9tIFwiLi4vY29tbW9ucy9jaGV2cm9ucy50c3hcIjtcbmltcG9ydCB7IGZldGNoSnNvbiB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XG5pbXBvcnQgeyB1c2VPdXRzaWRlQ2xpY2sgfSBmcm9tIFwiLi4vLi4vaG9va3MvdXNlT3V0c2lkZUNsaWNrLnRzXCI7XG5pbXBvcnQgeyBjbGFzc05hbWVzIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2NsYXNzTmFtZXMudHNcIjtcbmltcG9ydCB7IGluZEZvcm1hdCwgaW5kVCB9IGZyb20gXCIuLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgeyBpc05vRGF0YVJvdywgaXNOb0RhdGFUZXh0IH0gZnJvbSBcIi4uLy4uL3V0aWxzL25vRGF0YS50c1wiO1xuaW1wb3J0IHsgZ2V0Q2FjaGVkQ29udGFjdHMsIHNldENhY2hlZENvbnRhY3RzLCBnZXRTdG9yZWRTZWxlY3Rpb24sIHNldFN0b3JlZFNlbGVjdGlvbiwgY2xlYXJTdG9yZWRTZWxlY3Rpb24gfSBmcm9tIFwiLi4vLi4vdXRpbHMvdmlzaXRhc1N0b3JhZ2UudHNcIjtcblxudHlwZSBDb250YWN0T3B0aW9uID0ge1xuICB2YWx1ZTogc3RyaW5nO1xuICB0ZXh0OiBzdHJpbmc7XG4gIGNhcmdvOiBzdHJpbmc7XG4gIGVtcHJlc2E6IHN0cmluZztcbn07XG5cbnR5cGUgQ29udGFjdHNDb21ib2JveFByb3BzID0ge1xuICBhY2NvdW50TnVtPzogc3RyaW5nO1xuICB2YWx1ZT86IENvbnRhY3RPcHRpb25bXTtcbiAgb25DaGFuZ2U6ICh2YWx1ZTogQ29udGFjdE9wdGlvbltdKSA9PiB2b2lkO1xuICBwb3J0YWxDbGFzc05hbWU/OiBzdHJpbmc7XG4gIHBhbmVsQ2xhc3NOYW1lPzogc3RyaW5nO1xufTtcblxuLy8gTXVsdGktc2VsZWN0IGNvbnRhY3RzIGNvbWJvYm94IHRpZWQgdG8gdGhlIHNlbGVjdGVkIGNsaWVudC5cbmNvbnN0IENvbnRhY3RzQ29tYm9ib3ggPSAoeyBhY2NvdW50TnVtLCB2YWx1ZSA9IFtdLCBvbkNoYW5nZSwgcG9ydGFsQ2xhc3NOYW1lLCBwYW5lbENsYXNzTmFtZSB9OiBDb250YWN0c0NvbWJvYm94UHJvcHMpID0+IHtcbiAgY29uc3QgW3F1ZXJ5LCBzZXRRdWVyeV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW29wdGlvbnMsIHNldE9wdGlvbnNdID0gdXNlU3RhdGU8Q29udGFjdE9wdGlvbltdPihbXSk7XG4gIGNvbnN0IFtzZWxlY3RlZCwgc2V0U2VsZWN0ZWRdID0gdXNlU3RhdGU8Q29udGFjdE9wdGlvbltdPih2YWx1ZSk7XG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2xvYWRpbmdNb3JlLCBzZXRMb2FkaW5nTW9yZV0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtzdGF0dXMsIHNldFN0YXR1c10gPSB1c2VTdGF0ZShpbmRUKFwiVmlzaXRzX0NyZWF0ZV9TZWxlY3RDbGllbnRGaXJzdFwiLCBcIlNlbGVjdCBhIGNsaWVudCBmaXJzdC5cIikpO1xuICBjb25zdCBbaGFzTG9hZGVkLCBzZXRIYXNMb2FkZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbb3Blbiwgc2V0T3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtwYWdlLCBzZXRQYWdlXSA9IHVzZVN0YXRlKDEpO1xuICBjb25zdCBbaGFzTW9yZSwgc2V0SGFzTW9yZV0gPSB1c2VTdGF0ZSh0cnVlKTtcbiAgY29uc3QgW2Jsb2NraW5nLCBzZXRCbG9ja2luZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFthY3RpdmVJbmRleCwgc2V0QWN0aXZlSW5kZXhdID0gdXNlU3RhdGUoMCk7XG4gIGNvbnN0IGxpc3RSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgYm94UmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IGFib3J0UmVmID0gdXNlUmVmPEFib3J0Q29udHJvbGxlciB8IG51bGw+KG51bGwpO1xuICBjb25zdCBjb250YWluZXJSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgaW5wdXRSZWYgPSB1c2VSZWY8SFRNTElucHV0RWxlbWVudCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBsYXN0QWNjb3VudFJlZiA9IHVzZVJlZihhY2NvdW50TnVtIHx8IFwiXCIpO1xuICBjb25zdCBvbkNoYW5nZVJlZiA9IHVzZVJlZihvbkNoYW5nZSk7XG5cbiAgdXNlT3V0c2lkZUNsaWNrKFtjb250YWluZXJSZWYsIGxpc3RSZWZdLCAoKSA9PiBzZXRPcGVuKGZhbHNlKSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBvbkNoYW5nZVJlZi5jdXJyZW50ID0gb25DaGFuZ2U7XG4gIH0sIFtvbkNoYW5nZV0pO1xuXG4gIGNvbnN0IGlzU2FtZVNlbGVjdGlvbiA9IChhOiBDb250YWN0T3B0aW9uW10gPSBbXSwgYjogQ29udGFjdE9wdGlvbltdID0gW10pID0+IHtcbiAgICBpZiAoYS5sZW5ndGggIT09IGIubGVuZ3RoKSByZXR1cm4gZmFsc2U7XG4gICAgY29uc3QgYXMgPSBhLm1hcCgoeCkgPT4gU3RyaW5nKHgudmFsdWUpKS5zb3J0KCk7XG4gICAgY29uc3QgYnMgPSBiLm1hcCgoeCkgPT4gU3RyaW5nKHgudmFsdWUpKS5zb3J0KCk7XG4gICAgcmV0dXJuIGFzLmV2ZXJ5KCh2LCBpKSA9PiB2ID09PSBic1tpXSk7XG4gIH07XG5cbiAgLy8gU3luYyBpbnRlcm5hbCBzZWxlY3Rpb24gd2l0aCB0aGUgcHJvcCAoZHJhZnQvY2FjaGUgcmVzdG9yZSkuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFpc1NhbWVTZWxlY3Rpb24odmFsdWUgfHwgW10sIHNlbGVjdGVkKSkge1xuICAgICAgc2V0U2VsZWN0ZWQodmFsdWUgfHwgW10pO1xuICAgIH1cbiAgfSwgW3ZhbHVlXSk7XG5cbiAgY29uc3QgY2FuY2VsUGVuZGluZyA9ICgpID0+IHtcbiAgICBpZiAoYWJvcnRSZWYuY3VycmVudCkge1xuICAgICAgYWJvcnRSZWYuY3VycmVudC5hYm9ydCgpO1xuICAgICAgYWJvcnRSZWYuY3VycmVudCA9IG51bGw7XG4gICAgfVxuICB9O1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGlmIChhYm9ydFJlZi5jdXJyZW50KSB7XG4gICAgICAgIGFib3J0UmVmLmN1cnJlbnQuYWJvcnQoKTtcbiAgICAgICAgYWJvcnRSZWYuY3VycmVudCA9IG51bGw7XG4gICAgICB9XG4gICAgfTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IHByaW1lRnJvbUNhY2hlID0gKCkgPT4ge1xuICAgIGNvbnN0IGNhY2hlZCA9IGdldENhY2hlZENvbnRhY3RzKGFjY291bnROdW0pO1xuICAgIGlmIChjYWNoZWQpIHtcbiAgICAgIHNldE9wdGlvbnMoY2FjaGVkKTtcbiAgICAgIHNldEhhc0xvYWRlZCh0cnVlKTtcbiAgICAgIHNldEhhc01vcmUoY2FjaGVkLmxlbmd0aCA9PT0gMTApO1xuICAgICAgc2V0U3RhdHVzKFxuICAgICAgICBjYWNoZWQubGVuZ3RoXG4gICAgICAgICAgPyBpbmRGb3JtYXQoXCJWaXNpdHNfQ3JlYXRlX0NvbnRhY3RDb3VudENhY2hlXCIsIFwiezB9IGNvbnRhY3RzIChjYWNoZSlcIiwgY2FjaGVkLmxlbmd0aClcbiAgICAgICAgICA6IGluZFQoXCJWaXNpdHNfQ3JlYXRlX05vQ29udGFjdHNcIiwgXCJObyBjb250YWN0c1wiKVxuICAgICAgKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjYW5jZWxQZW5kaW5nKCk7XG4gICAgc2V0UXVlcnkoXCJcIik7XG4gICAgc2V0T3BlbihmYWxzZSk7XG4gICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgc2V0QmxvY2tpbmcoZmFsc2UpO1xuICAgIHNldExvYWRpbmdNb3JlKGZhbHNlKTtcbiAgICBzZXRBY3RpdmVJbmRleCgwKTtcbiAgICBzZXRQYWdlKDEpO1xuICAgIHNldEhhc01vcmUodHJ1ZSk7XG5cbiAgICBpZiAoIWFjY291bnROdW0pIHtcbiAgICAgIHNldE9wdGlvbnMoW10pO1xuICAgICAgc2V0U2VsZWN0ZWQoW10pO1xuICAgICAgb25DaGFuZ2VSZWYuY3VycmVudChbXSk7XG4gICAgICBzZXRTdGF0dXMoaW5kVChcIlZpc2l0c19DcmVhdGVfU2VsZWN0Q2xpZW50Rmlyc3RcIiwgXCJTZWxlY3QgYSBjbGllbnQgZmlyc3QuXCIpKTtcbiAgICAgIHNldEhhc0xvYWRlZChmYWxzZSk7XG4gICAgICBjbGVhclN0b3JlZFNlbGVjdGlvbihsYXN0QWNjb3VudFJlZi5jdXJyZW50KTtcbiAgICAgIGxhc3RBY2NvdW50UmVmLmN1cnJlbnQgPSBcIlwiO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGNoYW5nZWQgPSBsYXN0QWNjb3VudFJlZi5jdXJyZW50ICYmIGxhc3RBY2NvdW50UmVmLmN1cnJlbnQgIT09IGFjY291bnROdW07XG4gICAgaWYgKGNoYW5nZWQpIHtcbiAgICAgIHNldFNlbGVjdGVkKFtdKTtcbiAgICAgIG9uQ2hhbmdlUmVmLmN1cnJlbnQoW10pO1xuICAgICAgY2xlYXJTdG9yZWRTZWxlY3Rpb24obGFzdEFjY291bnRSZWYuY3VycmVudCk7XG4gICAgfVxuXG4gICAgY29uc3QgdXNlZENhY2hlID0gcHJpbWVGcm9tQ2FjaGUoKTtcbiAgICBpZiAoIXVzZWRDYWNoZSkge1xuICAgICAgc2V0T3B0aW9ucyhbXSk7XG4gICAgICBzZXRIYXNMb2FkZWQoZmFsc2UpO1xuICAgICAgc2V0U3RhdHVzKGluZFQoXCJWaXNpdHNfQ3JlYXRlX1ByZXNzQXJyb3dUb0xvYWRDb250YWN0c1wiLCBcIlByZXNzIEFycm93RG93biB0byBsb2FkIGNvbnRhY3RzLlwiKSk7XG4gICAgfVxuXG4gICAgY29uc3Qgc3RvcmVkU2VsZWN0aW9uID0gZ2V0U3RvcmVkU2VsZWN0aW9uKGFjY291bnROdW0pO1xuICAgIGlmIChzdG9yZWRTZWxlY3Rpb24ubGVuZ3RoICYmICF2YWx1ZT8ubGVuZ3RoKSB7XG4gICAgICBzZXRTZWxlY3RlZChzdG9yZWRTZWxlY3Rpb24pO1xuICAgICAgb25DaGFuZ2VSZWYuY3VycmVudChzdG9yZWRTZWxlY3Rpb24pO1xuICAgIH1cblxuICAgIGxhc3RBY2NvdW50UmVmLmN1cnJlbnQgPSBhY2NvdW50TnVtO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC1ob29rcy9leGhhdXN0aXZlLWRlcHNcbiAgfSwgW2FjY291bnROdW1dKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIG9uQ2hhbmdlUmVmLmN1cnJlbnQoc2VsZWN0ZWQpO1xuICAgIGlmIChhY2NvdW50TnVtKSBzZXRTdG9yZWRTZWxlY3Rpb24oYWNjb3VudE51bSwgc2VsZWN0ZWQpO1xuICB9LCBbc2VsZWN0ZWQsIGFjY291bnROdW1dKTtcblxuICBjb25zdCBtYXBDb250YWN0cyA9IChpdGVtczogdW5rbm93bltdID0gW10pID0+XG4gICAgaXRlbXNcbiAgICAgIC5tYXAoKGM6IGFueSkgPT4ge1xuICAgICAgICBpZiAoaXNOb0RhdGFSb3coYykpIHJldHVybiBudWxsO1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShjKSkgcmV0dXJuIG51bGw7XG4gICAgICAgIGNvbnN0IHJlY0lkID0gKGMucmVjSWQgfHwgYy5SZWNJZCB8fCBcIlwiKS50b1N0cmluZygpLnRyaW0oKTtcbiAgICAgICAgY29uc3QgbmFtZSA9IChjLm5hbWUgfHwgYy5OYW1lIHx8IFwiXCIpLnRvU3RyaW5nKCkudHJpbSgpO1xuICAgICAgICBjb25zdCBjYXJnbyA9IChjLmNhcmdvIHx8IGMuQ2FyZ28gfHwgXCJcIikudG9TdHJpbmcoKS50cmltKCk7XG4gICAgICAgIGNvbnN0IGVtcHJlc2EgPSAoYy5lbXByZXNhIHx8IGMuRW1wcmVzYSB8fCBcIlwiKS50b1N0cmluZygpLnRyaW0oKTtcbiAgICAgICAgaWYgKCFyZWNJZCB8fCBpc05vRGF0YVRleHQobmFtZSkpIHJldHVybiBudWxsO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHZhbHVlOiByZWNJZCxcbiAgICAgICAgICB0ZXh0OiBuYW1lLnRvVXBwZXJDYXNlKCksXG4gICAgICAgICAgY2FyZ286IGNhcmdvLnRvVXBwZXJDYXNlKCksXG4gICAgICAgICAgZW1wcmVzYTogZW1wcmVzYS50b1VwcGVyQ2FzZSgpLFxuICAgICAgICB9IGFzIENvbnRhY3RPcHRpb247XG4gICAgICB9KVxuICAgICAgLmZpbHRlcihCb29sZWFuKSBhcyBDb250YWN0T3B0aW9uW107XG5cbiAgY29uc3QgbG9hZCA9IGFzeW5jIChwYWdlVG9Mb2FkID0gMSwgYXBwZW5kID0gZmFsc2UpID0+IHtcbiAgICBpZiAoIWFjY291bnROdW0pIHJldHVybjtcbiAgICBpZiAobG9hZGluZyB8fCBsb2FkaW5nTW9yZSkgcmV0dXJuO1xuICAgIGNhbmNlbFBlbmRpbmcoKTtcblxuICAgIGlmICghYXBwZW5kKSB7XG4gICAgICBzZXRMb2FkaW5nKHRydWUpO1xuICAgICAgc2V0QmxvY2tpbmcodHJ1ZSk7XG4gICAgICBpZiAocGFnZVRvTG9hZCA9PT0gMSkgc2V0U3RhdHVzKGluZFQoXCJWaXNpdHNfQ3JlYXRlX0xvYWRpbmdDb250YWN0c1wiLCBcIkxvYWRpbmcgY29udGFjdHMuLi5cIikpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZXRMb2FkaW5nTW9yZSh0cnVlKTtcbiAgICAgIHNldEJsb2NraW5nKHRydWUpO1xuICAgIH1cblxuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XG4gICAgYWJvcnRSZWYuY3VycmVudCA9IGNvbnRyb2xsZXI7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoSnNvbihcbiAgICAgICAgYC9WaXNpdGFzL0dldENvbnRhY3RzRm9yRHJvcGRvd24/YWNjb3VudE51bT0ke2VuY29kZVVSSUNvbXBvbmVudChhY2NvdW50TnVtKX0mcGFnZT0ke3BhZ2VUb0xvYWR9JnBhZ2VTaXplPTEwYCxcbiAgICAgICAgeyBzaWduYWw6IGNvbnRyb2xsZXIuc2lnbmFsIH1cbiAgICAgICk7XG4gICAgICBjb25zdCBtYXBwZWQgPSBtYXBDb250YWN0cyhyZXMuaXRlbXMgfHwgW10pO1xuICAgICAgc2V0T3B0aW9ucygocHJldikgPT4ge1xuICAgICAgICBjb25zdCBuZXh0ID0gYXBwZW5kID8gWy4uLnByZXYsIC4uLm1hcHBlZF0gOiBtYXBwZWQ7XG4gICAgICAgIHNldENhY2hlZENvbnRhY3RzKGFjY291bnROdW0sIG5leHQpO1xuICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgIH0pO1xuICAgICAgc2V0SGFzTG9hZGVkKHRydWUpO1xuICAgICAgc2V0SGFzTW9yZShtYXBwZWQubGVuZ3RoID09PSAxMCk7XG4gICAgICBzZXRQYWdlKHBhZ2VUb0xvYWQpO1xuICAgICAgc2V0U3RhdHVzKG1hcHBlZC5sZW5ndGggPyBpbmRGb3JtYXQoXCJWaXNpdHNfQ3JlYXRlX0NvbnRhY3RDb3VudFwiLCBcInswfSBjb250YWN0c1wiLCBtYXBwZWQubGVuZ3RoKSA6IGluZFQoXCJWaXNpdHNfQ3JlYXRlX05vQ29udGFjdHNcIiwgXCJObyBjb250YWN0c1wiKSk7XG4gICAgfSBjYXRjaCB7XG4gICAgICBzZXRTdGF0dXMoaW5kVChcIlZpc2l0c19DcmVhdGVfTG9hZENvbnRhY3RzRXJyb3JcIiwgXCJGYWlsZWQgdG8gbG9hZCBjb250YWN0cy5cIikpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBhYm9ydFJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgICAgc2V0TG9hZGluZ01vcmUoZmFsc2UpO1xuICAgICAgc2V0QmxvY2tpbmcoZmFsc2UpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBlbnN1cmVMb2FkZWQgPSAoKSA9PiB7XG4gICAgaWYgKCFhY2NvdW50TnVtKSByZXR1cm47XG4gICAgaWYgKGhhc0xvYWRlZCAmJiBvcHRpb25zLmxlbmd0aCkgcmV0dXJuO1xuICAgIGlmIChwcmltZUZyb21DYWNoZSgpKSByZXR1cm47XG4gICAgbG9hZCgxLCBmYWxzZSk7XG4gIH07XG5cbiAgY29uc3QgbG9hZE1vcmVDb250YWN0cyA9IFJlYWN0LnVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoIWFjY291bnROdW0gfHwgIWhhc01vcmUgfHwgbG9hZGluZ01vcmUgfHwgbG9hZGluZykgcmV0dXJuO1xuICAgIGxvYWQocGFnZSArIDEsIHRydWUpO1xuICB9LCBbYWNjb3VudE51bSwgaGFzTW9yZSwgbG9hZGluZ01vcmUsIGxvYWRpbmcsIHBhZ2VdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghb3BlbiB8fCAhbGlzdFJlZi5jdXJyZW50KSByZXR1cm47XG4gICAgY29uc3QgZWwgPSBsaXN0UmVmLmN1cnJlbnQ7XG4gICAgY29uc3Qgb25TY3JvbGwgPSAoKSA9PiB7XG4gICAgICBpZiAoZWwuc2Nyb2xsVG9wICsgZWwuY2xpZW50SGVpZ2h0ID49IGVsLnNjcm9sbEhlaWdodCAtIDgpIGxvYWRNb3JlQ29udGFjdHMoKTtcbiAgICB9O1xuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgb25TY3JvbGwsIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcbiAgICByZXR1cm4gKCkgPT4gZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBvblNjcm9sbCk7XG4gIH0sIFtvcGVuLCBsb2FkTW9yZUNvbnRhY3RzXSk7XG5cbiAgY29uc3Qgc2VsZWN0ZWRWYWx1ZXMgPSB1c2VNZW1vKCgpID0+IHtcbiAgICByZXR1cm4gbmV3IFNldCgoc2VsZWN0ZWQgfHwgW10pLm1hcCgocykgPT4gU3RyaW5nKHMudmFsdWUpKSk7XG4gIH0sIFtzZWxlY3RlZF0pO1xuXG4gIGNvbnN0IGF2YWlsYWJsZU9wdGlvbnMgPSB1c2VNZW1vKCgpID0+IHtcbiAgICAvLyBIaWRlIGFscmVhZHkgc2VsZWN0ZWQgY29udGFjdHMgZnJvbSB0aGUgZHJvcGRvd24gbGlzdC5cbiAgICByZXR1cm4gKG9wdGlvbnMgfHwgW10pLmZpbHRlcigobykgPT4gIXNlbGVjdGVkVmFsdWVzLmhhcyhTdHJpbmcoby52YWx1ZSkpKTtcbiAgfSwgW29wdGlvbnMsIHNlbGVjdGVkVmFsdWVzXSk7XG5cbiAgY29uc3QgZmlsdGVyZWQgPSB1c2VNZW1vKCgpID0+IHtcbiAgICBjb25zdCBxID0gcXVlcnkudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKCFxKSByZXR1cm4gYXZhaWxhYmxlT3B0aW9ucztcbiAgICBjb25zdCBmID0gYXZhaWxhYmxlT3B0aW9ucy5maWx0ZXIoXG4gICAgICAobykgPT4gby50ZXh0LnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMocSkgfHwgby5jYXJnby50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHEpIHx8IG8uZW1wcmVzYS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHEpXG4gICAgKTtcbiAgICByZXR1cm4gZi5sZW5ndGggPyBmIDogYXZhaWxhYmxlT3B0aW9ucztcbiAgfSwgW2F2YWlsYWJsZU9wdGlvbnMsIHF1ZXJ5XSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBzZXRBY3RpdmVJbmRleCgwKTtcbiAgfSwgW2ZpbHRlcmVkLmxlbmd0aCwgcXVlcnldKTtcblxuICBjb25zdCB0b2dnbGVPcHRpb24gPSAob3B0OiBDb250YWN0T3B0aW9uKSA9PiB7XG4gICAgc2V0U2VsZWN0ZWQoKHByZXYpID0+IHtcbiAgICAgIGNvbnN0IGV4aXN0cyA9IHByZXYuc29tZSgocCkgPT4gcC52YWx1ZSA9PT0gb3B0LnZhbHVlKTtcbiAgICAgIGlmIChleGlzdHMpIHJldHVybiBwcmV2LmZpbHRlcigocCkgPT4gcC52YWx1ZSAhPT0gb3B0LnZhbHVlKTtcbiAgICAgIHJldHVybiBbLi4ucHJldiwgb3B0XTtcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVLZXlEb3duID0gKGV2OiBSZWFjdC5LZXlib2FyZEV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+KSA9PiB7XG4gICAgaWYgKGV2LmtleSA9PT0gXCJBcnJvd0Rvd25cIikge1xuICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHNldE9wZW4odHJ1ZSk7XG4gICAgICBlbnN1cmVMb2FkZWQoKTtcbiAgICAgIGlmIChmaWx0ZXJlZC5sZW5ndGgpIHNldEFjdGl2ZUluZGV4KChpZHgpID0+IChpZHggKyAxKSAlIGZpbHRlcmVkLmxlbmd0aCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChldi5rZXkgPT09IFwiQXJyb3dVcFwiKSB7XG4gICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgc2V0T3Blbih0cnVlKTtcbiAgICAgIGVuc3VyZUxvYWRlZCgpO1xuICAgICAgaWYgKGZpbHRlcmVkLmxlbmd0aCkgc2V0QWN0aXZlSW5kZXgoKGlkeCkgPT4gKGlkeCAtIDEgKyBmaWx0ZXJlZC5sZW5ndGgpICUgZmlsdGVyZWQubGVuZ3RoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGV2LmtleSA9PT0gXCJFbnRlclwiKSB7XG4gICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgaWYgKG9wZW4gJiYgZmlsdGVyZWQubGVuZ3RoKSB7XG4gICAgICAgIHRvZ2dsZU9wdGlvbihmaWx0ZXJlZFthY3RpdmVJbmRleF0gPz8gZmlsdGVyZWRbMF0pO1xuICAgICAgfSBlbHNlIGlmIChhY2NvdW50TnVtKSB7XG4gICAgICAgIGVuc3VyZUxvYWRlZCgpO1xuICAgICAgICBzZXRPcGVuKHRydWUpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZXYua2V5ID09PSBcIkVzY2FwZVwiKSBzZXRPcGVuKGZhbHNlKTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yXCIgcmVmPXtjb250YWluZXJSZWZ9PlxuICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZFwiPntpbmRUKFwiVmlzaXRzX0NyZWF0ZV9TZWFyY2hDb250YWN0XCIsIFwiU2VhcmNoIGNvbnRhY3RcIil9PC9sYWJlbD5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmVcIj5cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICByZWY9e2JveFJlZn1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInJlbGF0aXZlIHctZnVsbCBjdXJzb3ItZGVmYXVsdCByb3VuZGVkLVs1cHhdIGJvcmRlci1zbGF0ZS0zMDAgYmctd2hpdGUgdGV4dC1sZWZ0IHNoYWRvdy14cyBmb2N1cy13aXRoaW46Ym9yZGVyLXByaW1hcnkgZm9jdXMtd2l0aGluOnJpbmctMiBmb2N1cy13aXRoaW46cmluZy1wcmltYXJ5IGZvY3VzLXdpdGhpbjpyaW5nLW9mZnNldC0wIHNtOnRleHQtc21cIlxuICAgICAgICAgID5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC13cmFwIGdhcC0xIHB4LTMgcHktMiBtaW4taC0xMFwiPlxuICAgICAgICAgICAge3NlbGVjdGVkLm1hcCgoYykgPT4gKFxuICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgIGtleT17Yy52YWx1ZX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSByb3VuZGVkLW1kIGJnLXByaW1hcnkvMTAgdGV4dC1zbGF0ZS03MDAgcHgtMiBweS0xIHRleHQteHNcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge2MudGV4dH1cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFNlbGVjdGVkKChwcmV2KSA9PiBwcmV2LmZpbHRlcigocykgPT4gcy52YWx1ZSAhPT0gYy52YWx1ZSkpfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS03MDAgaG92ZXI6dGV4dC1zbGF0ZS03MDAvODBcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxYTWFya0ljb24gY2xhc3NOYW1lPVwiaC00IHctNFwiIC8+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXgtMSBtaW4tdy0zMCBiZy10cmFuc3BhcmVudCB0ZXh0LXNtIHNtOnRleHQtYmFzZSBsZWFkaW5nLTUgdGV4dC1zbGF0ZS05MDAgYm9yZGVyLW5vbmUgb3V0bGluZS1oaWRkZW4gcHgtMSBweS0xIGZvY3VzOnJpbmctMCBmb2N1czpib3JkZXItdHJhbnNwYXJlbnRcIlxuICAgICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBzZXRRdWVyeShldmVudC50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICBvbktleURvd249e2hhbmRsZUtleURvd259XG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtzZWxlY3RlZC5sZW5ndGggPyBcIlwiIDogaW5kVChcIlZpc2l0c19DcmVhdGVfRmlsdGVyUGxhY2Vob2xkZXJcIiwgXCJUeXBlIHRvIGZpbHRlci4uLlwiKX1cbiAgICAgICAgICAgICAgcmVmPXtpbnB1dFJlZn1cbiAgICAgICAgICAgICAgcmVhZE9ubHk9eyFhY2NvdW50TnVtfVxuICAgICAgICAgICAgICBvbkZvY3VzPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgZW5zdXJlTG9hZGVkKCk7XG4gICAgICAgICAgICAgICAgc2V0T3Blbih0cnVlKTtcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICB7KGxvYWRpbmcgfHwgYmxvY2tpbmcpICYmIChcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQteS0wIHJpZ2h0LTkgZmxleCBpdGVtcy1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICA8U3Bpbm5lciAvPlxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQteS0wIHJpZ2h0LTAgZmxleCBpdGVtcy1jZW50ZXIgcHItMiB0ZXh0LXNsYXRlLTUwMCBob3Zlcjp0ZXh0LXNsYXRlLTYwMFwiXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgIGlmICghYWNjb3VudE51bSkgcmV0dXJuO1xuICAgICAgICAgICAgICBpZiAob3Blbikge1xuICAgICAgICAgICAgICAgIHNldE9wZW4oZmFsc2UpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGVuc3VyZUxvYWRlZCgpO1xuICAgICAgICAgICAgICAgIHNldE9wZW4odHJ1ZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH19XG4gICAgICAgICAgPlxuICAgICAgICAgICAge29wZW4gPyA8Q2hldnJvblVwU3ZnIGNsYXNzTmFtZT1cImgtNSB3LTVcIiAvPiA6IDxDaGV2cm9uRG93blN2ZyBjbGFzc05hbWU9XCJoLTUgdy01XCIgLz59XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxGbG9hdGluZ0xpc3RcbiAgICAgICAgICAgIGFuY2hvclJlZj17Ym94UmVmfVxuICAgICAgICAgICAgb3Blbj17b3Blbn1cbiAgICAgICAgICAgIHpJbmRleD17MzgwMDAwfVxuICAgICAgICAgICAgbWF4SGVpZ2h0Q2xhc3M9XCJtYXgtaC03MlwiXG4gICAgICAgICAgICByb2xlPVwibGlzdGJveFwiXG4gICAgICAgICAgICByb3VuZGVkQ2xhc3M9XCJyb3VuZGVkLVs1cHhdXCJcbiAgICAgICAgICAgIHBvcnRhbENsYXNzTmFtZT17cG9ydGFsQ2xhc3NOYW1lfVxuICAgICAgICAgICAgcGFuZWxDbGFzc05hbWU9e3BhbmVsQ2xhc3NOYW1lfVxuICAgICAgICAgID5cbiAgICAgICAgICA8ZGl2IHJlZj17bGlzdFJlZn0gYXJpYS1tdWx0aXNlbGVjdGFibGU9XCJ0cnVlXCI+XG4gICAgICAgICAgICB7bG9hZGluZyAmJiAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgcHgtNCBweS0yIHRleHQtc20gdGV4dC1zbGF0ZS01MDBcIj5cbiAgICAgICAgICAgICAgICA8U3Bpbm5lciBzaXplPVwiaC00IHctNFwiIC8+XG4gICAgICAgICAgICAgICAge2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIHshbG9hZGluZyAmJiBvcHRpb25zLmxlbmd0aCA9PT0gMCAmJiAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHgtNCBweS0yIHRleHQtc20gdGV4dC1zbGF0ZS01MDBcIj5cbiAgICAgICAgICAgICAgICB7aGFzTG9hZGVkID8gaW5kVChcIlZpc2l0c19DcmVhdGVfTm9Db250YWN0c1wiLCBcIk5vIGNvbnRhY3RzXCIpIDogaW5kVChcIlZpc2l0c19DcmVhdGVfU2VsZWN0Q2xpZW50Rmlyc3RcIiwgXCJTZWxlY3QgYSBjbGllbnQgZmlyc3QuXCIpfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICB7IWxvYWRpbmcgJiYgb3B0aW9ucy5sZW5ndGggPiAwICYmIGZpbHRlcmVkLmxlbmd0aCA9PT0gMCAmJiAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHgtNCBweS0yIHRleHQtc20gdGV4dC1zbGF0ZS01MDBcIj5cbiAgICAgICAgICAgICAgICB7cXVlcnkudHJpbSgpID8gaW5kVChcIlZpc2l0c19DcmVhdGVfTm9NYXRjaGVzXCIsIFwiTm8gbWF0Y2hlc1wiKSA6IGluZFQoXCJWaXNpdHNfQ3JlYXRlX05vTW9yZUNvbnRhY3RzXCIsIFwiTm8gbW9yZSBjb250YWN0cyBhdmFpbGFibGVcIil9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIHshbG9hZGluZyAmJlxuICAgICAgICAgICAgICBmaWx0ZXJlZC5tYXAoKG9wdCwgaWR4KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2VsID0gc2VsZWN0ZWQuc29tZSgocykgPT4gcy52YWx1ZSA9PT0gb3B0LnZhbHVlKTtcbiAgICAgICAgICAgICAgICBjb25zdCBpc0FjdGl2ZSA9IGlkeCA9PT0gYWN0aXZlSW5kZXg7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgIGtleT17b3B0LnZhbHVlfVxuICAgICAgICAgICAgICAgICAgICByb2xlPVwib3B0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgYXJpYS1zZWxlY3RlZD17c2VsfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICAgICAgICAgICAgXCJyZWxhdGl2ZSBmbGV4IHctZnVsbCBjdXJzb3ItZGVmYXVsdCBzZWxlY3Qtbm9uZSBpdGVtcy1zdGFydCBweS0yIHB4LTMgdGV4dC1sZWZ0IHRleHQtc21cIixcbiAgICAgICAgICAgICAgICAgICAgICBpc0FjdGl2ZSA/IFwiYmctcHJpbWFyeSB0ZXh0LXdoaXRlXCIgOiBzZWwgPyBcImJnLXByaW1hcnkvMTAgdGV4dC1wcmltYXJ5XCIgOiBcInRleHQtc2xhdGUtOTAwXCJcbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgb25Nb3VzZUVudGVyPXsoKSA9PiBzZXRBY3RpdmVJbmRleChpZHgpfVxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB0b2dnbGVPcHRpb24ob3B0KX1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBmbGV4IGZsZXgtY29sIGdhcC0wLjUgcHItMlwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcImJsb2NrIHRydW5jYXRlXCIsIHNlbCA/IFwiZm9udC1tZWRpdW1cIiA6IFwiZm9udC1ub3JtYWxcIil9PntvcHQudGV4dH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC14cyB0ZXh0LXNsYXRlLTYwMCB0cnVuY2F0ZVwiPntvcHQuY2FyZ299PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH0pfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAge2Jsb2NraW5nICYmIChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIHotNzAwMDAgYmctd2hpdGUvNzAgYmFja2Ryb3AtYmx1ci1bMXB4XSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciByb3VuZGVkLVs1cHhdXCI+XG4gICAgICAgICAgICAgICAgPFNwaW5uZXIgc2l6ZT1cImgtNiB3LTZcIiAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9GbG9hdGluZ0xpc3Q+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsIGZsZXgganVzdGlmeS1lbmRcIj5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXNsYXRlLTUwMCB0ZWNoLWluZm9cIj57c3RhdHVzfTwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29udGFjdHNDb21ib2JveDtcbiIsICJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmZ1bmN0aW9uIFhNYXJrSWNvbih7XG4gIHRpdGxlLFxuICB0aXRsZUlkLFxuICAuLi5wcm9wc1xufSwgc3ZnUmVmKSB7XG4gIHJldHVybiAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChcInN2Z1wiLCBPYmplY3QuYXNzaWduKHtcbiAgICB4bWxuczogXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLFxuICAgIHZpZXdCb3g6IFwiMCAwIDIwIDIwXCIsXG4gICAgZmlsbDogXCJjdXJyZW50Q29sb3JcIixcbiAgICBcImFyaWEtaGlkZGVuXCI6IFwidHJ1ZVwiLFxuICAgIFwiZGF0YS1zbG90XCI6IFwiaWNvblwiLFxuICAgIHJlZjogc3ZnUmVmLFxuICAgIFwiYXJpYS1sYWJlbGxlZGJ5XCI6IHRpdGxlSWRcbiAgfSwgcHJvcHMpLCB0aXRsZSA/IC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KFwidGl0bGVcIiwge1xuICAgIGlkOiB0aXRsZUlkXG4gIH0sIHRpdGxlKSA6IG51bGwsIC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KFwicGF0aFwiLCB7XG4gICAgZDogXCJNNi4yOCA1LjIyYS43NS43NSAwIDAgMC0xLjA2IDEuMDZMOC45NCAxMGwtMy43MiAzLjcyYS43NS43NSAwIDEgMCAxLjA2IDEuMDZMMTAgMTEuMDZsMy43MiAzLjcyYS43NS43NSAwIDEgMCAxLjA2LTEuMDZMMTEuMDYgMTBsMy43Mi0zLjcyYS43NS43NSAwIDAgMC0xLjA2LTEuMDZMMTAgOC45NCA2LjI4IDUuMjJaXCJcbiAgfSkpO1xufVxuY29uc3QgRm9yd2FyZFJlZiA9IC8qI19fUFVSRV9fKi8gUmVhY3QuZm9yd2FyZFJlZihYTWFya0ljb24pO1xuZXhwb3J0IGRlZmF1bHQgRm9yd2FyZFJlZjsiLCAiaW1wb3J0IHsgdXNlRWZmZWN0IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uL3V0aWxzL2luZEkxOG4udHNcIjtcblxuZXhwb3J0IGNvbnN0IHVzZVRvcGJhciA9IChcbiAgc3RlcDogbnVtYmVyLFxuICBjYW5Hb05leHQ6IGJvb2xlYW4sXG4gIG9uTmV4dDogKCkgPT4gdm9pZCxcbiAgb25QcmV2OiAoKSA9PiB2b2lkLFxuICBidXN5ID0gZmFsc2UsXG4gIGNhblN1Ym1pdFN0ZXAyID0gdHJ1ZSxcbiAgY2FuQWNjZXNzID0gdHJ1ZVxuKSA9PiB7XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgZm9yd2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2xvYmFsRm9yd2FyZEJ0blwiKSBhcyBIVE1MQnV0dG9uRWxlbWVudCB8IG51bGw7XG4gICAgY29uc3QgYmFjayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2xvYmFsQmFja0J0blwiKSBhcyBIVE1MQnV0dG9uRWxlbWVudCB8IG51bGw7XG4gICAgY29uc3QgZm9yd2FyZEljb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdsb2JhbEZvcndhcmRJY29uXCIpO1xuICAgIGNvbnN0IGNyZWF0ZUljb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdsb2JhbENyZWF0ZUljb25cIik7XG5cbiAgICBpZiAoZm9yd2FyZCkge1xuICAgICAgY29uc3QgaXNTdGVwMiA9IHN0ZXAgPT09IDI7XG4gICAgICBjb25zdCBzaG93Rm9yd2FyZCA9IGNhbkFjY2VzcyAmJiAoaXNTdGVwMiB8fCAoc3RlcCA9PT0gMSAmJiBjYW5Hb05leHQpKTtcbiAgICAgIGZvcndhcmQuc3R5bGUudmlzaWJpbGl0eSA9IHNob3dGb3J3YXJkID8gXCJ2aXNpYmxlXCIgOiBcImhpZGRlblwiO1xuICAgICAgZm9yd2FyZC5kaXNhYmxlZCA9ICFzaG93Rm9yd2FyZCB8fCBidXN5O1xuICAgICAgZm9yd2FyZC5vbmNsaWNrID0gc2hvd0ZvcndhcmQgPyAoKSA9PiBvbk5leHQoKSA6IG51bGw7XG4gICAgICBmb3J3YXJkLnNldEF0dHJpYnV0ZShcbiAgICAgICAgXCJhcmlhLWxhYmVsXCIsXG4gICAgICAgIGlzU3RlcDIgPyBpbmRUKFwiQ29tbW9uX0NyZWF0ZVwiLCBcIkNyZWF0ZVwiKSA6IGluZFQoXCJDb21tb25fTmV4dFwiLCBcIk5leHRcIilcbiAgICAgICk7XG4gICAgICBmb3J3YXJkLnNldEF0dHJpYnV0ZShcImFyaWEtZGlzYWJsZWRcIiwgaXNTdGVwMiAmJiAhY2FuU3VibWl0U3RlcDIgPyBcInRydWVcIiA6IFwiZmFsc2VcIik7XG4gICAgICBmb3J3YXJkLmNsYXNzTGlzdC50b2dnbGUoXCJvcGFjaXR5LTUwXCIsIGlzU3RlcDIgJiYgIWNhblN1Ym1pdFN0ZXAyKTtcbiAgICAgIGZvcndhcmQuY2xhc3NMaXN0LnRvZ2dsZShcImN1cnNvci1ub3QtYWxsb3dlZFwiLCBpc1N0ZXAyICYmICFjYW5TdWJtaXRTdGVwMik7XG5cbiAgICAgIGlmIChmb3J3YXJkSWNvbiAmJiBjcmVhdGVJY29uKSB7XG4gICAgICAgIGlmIChpc1N0ZXAyKSB7XG4gICAgICAgICAgZm9yd2FyZEljb24uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgICAgICBjcmVhdGVJY29uLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZm9yd2FyZEljb24uY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICAgICAgICBjcmVhdGVJY29uLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGJhY2spIHtcbiAgICAgIGNvbnN0IHNob3dCYWNrID0gY2FuQWNjZXNzICYmIHN0ZXAgPT09IDI7XG4gICAgICBiYWNrLnN0eWxlLnZpc2liaWxpdHkgPSBzaG93QmFjayA/IFwidmlzaWJsZVwiIDogXCJoaWRkZW5cIjtcbiAgICAgIGJhY2suZGlzYWJsZWQgPSAhc2hvd0JhY2sgfHwgYnVzeTtcbiAgICAgIGJhY2sub25jbGljayA9IHNob3dCYWNrID8gKCkgPT4gb25QcmV2KCkgOiBudWxsO1xuICAgIH1cbiAgfSwgW3N0ZXAsIGNhbkdvTmV4dCwgb25OZXh0LCBvblByZXYsIGJ1c3ksIGNhblN1Ym1pdFN0ZXAyLCBjYW5BY2Nlc3NdKTtcbn07XG4iLCAiZXhwb3J0IGNvbnN0IHNob3dHbG9iYWxTcGlubmVyID0gKG1lc3NhZ2U/OiBzdHJpbmcpID0+IHtcbiAgdHJ5IHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2Ygd2luZG93Ll9faW5kU2hvd0dsb2JhbFNwaW5uZXIgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgd2luZG93Ll9faW5kU2hvd0dsb2JhbFNwaW5uZXIobWVzc2FnZSk7XG4gICAgfVxuICB9IGNhdGNoIHtcbiAgICAvLyBpZ25vcmVcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGhpZGVHbG9iYWxTcGlubmVyID0gKCkgPT4ge1xuICB0cnkge1xuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiB3aW5kb3cuX19pbmRIaWRlR2xvYmFsU3Bpbm5lciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICB3aW5kb3cuX19pbmRIaWRlR2xvYmFsU3Bpbm5lcigpO1xuICAgIH1cbiAgfSBjYXRjaCB7XG4gICAgLy8gaWdub3JlXG4gIH1cbn07XG4iLCAiZXhwb3J0IGNvbnN0IGluZEV4dHJhY3RJZCA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZyA9PiB7XG4gIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gXCJcIjtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiB8fCB0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCIpIHJldHVybiBTdHJpbmcodmFsdWUpLnRyaW0oKTtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIikge1xuICAgIGNvbnN0IGNhbmRpZGF0ZSA9XG4gICAgICAodmFsdWUgYXMgYW55KS5yZWNJZCA/P1xuICAgICAgKHZhbHVlIGFzIGFueSkuUmVjSWQgPz9cbiAgICAgICh2YWx1ZSBhcyBhbnkpLmlkID8/XG4gICAgICAodmFsdWUgYXMgYW55KS5JZCA/P1xuICAgICAgKHZhbHVlIGFzIGFueSkudmFsdWUgPz9cbiAgICAgICh2YWx1ZSBhcyBhbnkpLlZhbHVlO1xuICAgIGlmICh0eXBlb2YgY2FuZGlkYXRlID09PSBcInN0cmluZ1wiIHx8IHR5cGVvZiBjYW5kaWRhdGUgPT09IFwibnVtYmVyXCIpIHJldHVybiBTdHJpbmcoY2FuZGlkYXRlKS50cmltKCk7XG4gIH1cbiAgcmV0dXJuIFwiXCI7XG59O1xuXG5leHBvcnQgY29uc3QgaW5kRXh0cmFjdE51bWVyaWNJZCA9ICh2YWx1ZTogdW5rbm93biwgZGVwdGggPSAwKTogc3RyaW5nID0+IHtcbiAgaWYgKGRlcHRoID4gMykgcmV0dXJuIFwiXCI7XG4gIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gXCJcIjtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIiAmJiBOdW1iZXIuaXNGaW5pdGUodmFsdWUpKSByZXR1cm4gU3RyaW5nKE1hdGgudHJ1bmModmFsdWUpKTtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikge1xuICAgIGNvbnN0IHJhdyA9IHZhbHVlLnRyaW0oKTtcbiAgICBpZiAoIXJhdykgcmV0dXJuIFwiXCI7XG4gICAgaWYgKC9eXFxkKyQvLnRlc3QocmF3KSkgcmV0dXJuIHJhdztcbiAgICBjb25zdCBtID0gcmF3Lm1hdGNoKC8oXFxkezMsfSkvKTtcbiAgICByZXR1cm4gbSA/IG1bMV0gOiBcIlwiO1xuICB9XG4gIGlmICh0eXBlb2YgdmFsdWUgIT09IFwib2JqZWN0XCIpIHJldHVybiBcIlwiO1xuICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgdmFsdWUpIHtcbiAgICAgIGNvbnN0IGZvdW5kID0gaW5kRXh0cmFjdE51bWVyaWNJZChpdGVtLCBkZXB0aCArIDEpO1xuICAgICAgaWYgKGZvdW5kKSByZXR1cm4gZm91bmQ7XG4gICAgfVxuICAgIHJldHVybiBcIlwiO1xuICB9XG5cbiAgY29uc3Qga2V5cyA9IFtcbiAgICBcInJlY0lkXCIsXG4gICAgXCJSZWNJZFwiLFxuICAgIFwicmVmUmVjSWRBY3RpdmlkYWRcIixcbiAgICBcIlJlZlJlY0lkQWN0aXZpZGFkXCIsXG4gICAgXCJhY3RpdmlkYWRSZWNJZFwiLFxuICAgIFwiQWN0aXZpZGFkUmVjSWRcIixcbiAgICBcImlkXCIsXG4gICAgXCJJZFwiLFxuICAgIFwidmFsdWVcIixcbiAgICBcIlZhbHVlXCIsXG4gICAgXCJyZXN1bHRcIixcbiAgICBcIlJlc3VsdFwiLFxuICAgIFwiZGF0YVwiLFxuICAgIFwiRGF0YVwiLFxuICAgIFwibWVzc2FnZVwiLFxuICAgIFwiTWVzc2FnZVwiLFxuICBdO1xuXG4gIGZvciAoY29uc3QgayBvZiBrZXlzKSB7XG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgaykpIHtcbiAgICAgIGNvbnN0IGZvdW5kID0gaW5kRXh0cmFjdE51bWVyaWNJZCgodmFsdWUgYXMgYW55KVtrXSwgZGVwdGggKyAxKTtcbiAgICAgIGlmIChmb3VuZCkgcmV0dXJuIGZvdW5kO1xuICAgIH1cbiAgfVxuXG4gIGZvciAoY29uc3QgdiBvZiBPYmplY3QudmFsdWVzKHZhbHVlIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+KSkge1xuICAgIGNvbnN0IGZvdW5kID0gaW5kRXh0cmFjdE51bWVyaWNJZCh2LCBkZXB0aCArIDEpO1xuICAgIGlmIChmb3VuZCkgcmV0dXJuIGZvdW5kO1xuICB9XG5cbiAgcmV0dXJuIFwiXCI7XG59O1xuXG5leHBvcnQgY29uc3QgaW5kRXh0cmFjdFNpZ25lZElkID0gKHZhbHVlOiB1bmtub3duLCBkZXB0aCA9IDApOiBzdHJpbmcgPT4ge1xuICBpZiAoZGVwdGggPiAzKSByZXR1cm4gXCJcIjtcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHJldHVybiBcIlwiO1xuICBpZiAodHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiICYmIE51bWJlci5pc0Zpbml0ZSh2YWx1ZSkpIHJldHVybiBTdHJpbmcoTWF0aC50cnVuYyh2YWx1ZSkpO1xuICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XG4gICAgY29uc3QgcmF3ID0gdmFsdWUudHJpbSgpO1xuICAgIGlmICghcmF3KSByZXR1cm4gXCJcIjtcbiAgICBjb25zdCBtYXRjaCA9IHJhdy5tYXRjaCgvLT9cXGR7Myx9Lyk7XG4gICAgcmV0dXJuIG1hdGNoID8gbWF0Y2hbMF0gOiBcIlwiO1xuICB9XG4gIGlmICh0eXBlb2YgdmFsdWUgIT09IFwib2JqZWN0XCIpIHJldHVybiBcIlwiO1xuICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgdmFsdWUpIHtcbiAgICAgIGNvbnN0IGZvdW5kID0gaW5kRXh0cmFjdFNpZ25lZElkKGl0ZW0sIGRlcHRoICsgMSk7XG4gICAgICBpZiAoZm91bmQpIHJldHVybiBmb3VuZDtcbiAgICB9XG4gICAgcmV0dXJuIFwiXCI7XG4gIH1cblxuICBjb25zdCBrZXlzID0gW1xuICAgIFwicmVjSWRcIixcbiAgICBcIlJlY0lkXCIsXG4gICAgXCJyZWZSZWNJZEFjdGl2aWRhZFwiLFxuICAgIFwiUmVmUmVjSWRBY3RpdmlkYWRcIixcbiAgICBcImFjdGl2aWRhZFJlY0lkXCIsXG4gICAgXCJBY3RpdmlkYWRSZWNJZFwiLFxuICAgIFwibWVzc2FnZVwiLFxuICAgIFwiTWVzc2FnZVwiLFxuICAgIFwicmVzdWx0XCIsXG4gICAgXCJSZXN1bHRcIixcbiAgICBcImRhdGFcIixcbiAgICBcIkRhdGFcIixcbiAgXTtcblxuICBmb3IgKGNvbnN0IGsgb2Yga2V5cykge1xuICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodmFsdWUsIGspKSB7XG4gICAgICBjb25zdCBmb3VuZCA9IGluZEV4dHJhY3RTaWduZWRJZCgodmFsdWUgYXMgYW55KVtrXSwgZGVwdGggKyAxKTtcbiAgICAgIGlmIChmb3VuZCkgcmV0dXJuIGZvdW5kO1xuICAgIH1cbiAgfVxuXG4gIGZvciAoY29uc3QgdiBvZiBPYmplY3QudmFsdWVzKHZhbHVlIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+KSkge1xuICAgIGNvbnN0IGZvdW5kID0gaW5kRXh0cmFjdFNpZ25lZElkKHYsIGRlcHRoICsgMSk7XG4gICAgaWYgKGZvdW5kKSByZXR1cm4gZm91bmQ7XG4gIH1cblxuICByZXR1cm4gXCJcIjtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxvQkFBMkI7OztBQ0QxQixJQUFBQSxnQkFBNEQ7OztBQ0E3RCxtQkFBNEQ7OztBQ0E1RCxZQUF1QjtBQUN2QixTQUFTLFVBQVU7QUFBQSxFQUNqQjtBQUFBLEVBQ0E7QUFBQSxFQUNBLEdBQUc7QUFDTCxHQUFHLFFBQVE7QUFDVCxTQUFvQixnQkFBTSxvQkFBYyxPQUFPLE9BQU8sT0FBTztBQUFBLElBQzNELE9BQU87QUFBQSxJQUNQLFNBQVM7QUFBQSxJQUNULE1BQU07QUFBQSxJQUNOLGVBQWU7QUFBQSxJQUNmLGFBQWE7QUFBQSxJQUNiLEtBQUs7QUFBQSxJQUNMLG1CQUFtQjtBQUFBLEVBQ3JCLEdBQUcsS0FBSyxHQUFHLFFBQXFCLGdCQUFNLG9CQUFjLFNBQVM7QUFBQSxJQUMzRCxJQUFJO0FBQUEsRUFDTixHQUFHLEtBQUssSUFBSSxNQUFtQixnQkFBTSxvQkFBYyxRQUFRO0FBQUEsSUFDekQsR0FBRztBQUFBLEVBQ0wsQ0FBQyxDQUFDO0FBQ0o7QUFDQSxJQUFNLGFBQTJCLGdCQUFNLGlCQUFXLFNBQVM7QUFDM0QsSUFBTyxvQkFBUTs7O0FEZ1JUO0FBelFOLElBQU0sbUJBQW1CLENBQUMsRUFBRSxZQUFZLFFBQVEsQ0FBQyxHQUFHLFVBQVUsaUJBQWlCLGVBQWUsTUFBNkI7QUFDekgsUUFBTSxDQUFDLE9BQU8sUUFBUSxRQUFJLHVCQUFTLEVBQUU7QUFDckMsUUFB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QVksT0FBb0M7QUFDOUMsVUFBTSxLQUFLO0FBQ1gsU0FBSyxRQUFRLEVBQUUsVUFBVSxNQUFNO0FBQUEsRUFDakM7QUFBQSxFQUVBLE9BQU8sMkJBQTJCO0FBQ2hDLFdBQU8sRUFBRSxVQUFVLEtBQUs7QUFBQSxFQUMxQjtBQUFBLEVBRUEsa0JBQWtCLE9BQU8sTUFBTTtBQUFBLEVBQy9CO0FBQUEsRUFFQSxTQUFTO0FBQ1AsUUFBSSxLQUFLLE1BQU0sVUFBVTtBQUN2QixhQUNFLDZDQUFDLFNBQUksV0FBVSxrRUFDWixlQUFLLCtCQUErQiwwRUFBMEUsR0FDakg7QUFBQSxJQUVKO0FBQ0EsV0FBTyxLQUFLLE1BQU07QUFBQSxFQUNwQjtBQUNGO0FBR2UsU0FBUixhQUE4QjtBQUNuQyxTQUNFLDZDQUFDLGlCQUNDLHVEQUFDLGNBQVcsR0FDZDtBQUVKOzs7QUQvb0JRLElBQUFDLHNCQUFBO0FBSlIsSUFBTSxhQUFhLE1BQU07QUFDdkIsU0FDRSw2Q0FBQyxnQkFDQyx1REFBQyxnQkFDQyx1REFBQyxjQUFXLEdBQ2QsR0FDRjtBQUVKO0FBRUEsSUFBTSxRQUFRLE1BQU07QUFDbEIsUUFBTSxTQUFTLFNBQVMsZUFBZSxrQkFBa0I7QUFDekQsTUFBSSxDQUFDLE9BQVE7QUFFYixRQUFNLFVBQVUsNkNBQUMsY0FBVztBQUU1QixNQUFJLE9BQU8sV0FBVztBQUNwQixXQUFPLFVBQVUsT0FBTyxPQUFPO0FBQy9CO0FBQUEsRUFDRjtBQUVBLFFBQU0sV0FBTywwQkFBVyxNQUFNO0FBQzlCLFNBQU8sWUFBWTtBQUNuQixPQUFLLE9BQU8sT0FBTztBQUNyQjtBQUVBLElBQUksU0FBUyxlQUFlLGNBQWMsU0FBUyxlQUFlLGVBQWU7QUFDL0UsUUFBTTtBQUNSLE9BQU87QUFDTCxXQUFTLGlCQUFpQixvQkFBb0IsS0FBSztBQUNyRDtBQUVBLElBQU8scUJBQVE7IiwKICAibmFtZXMiOiBbImltcG9ydF9yZWFjdCIsICJSZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiY2FuQWNjZXNzIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJSZWFjdCIsICJpbXBvcnRfanN4X3J1bnRpbWUiXQp9Cg==
