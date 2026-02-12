import {
  AppErrorBoundary_default,
  VisitNarrativeFields_default,
  isOverflowing,
  navigateToTextEditorField,
  setPreviewAnchor,
  showPreviewTooltip,
  useTapGuard,
  useTextEditorFields,
  useVisitas
} from "./chunks/chunk-SK3P35UQ.js";
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
} from "./chunks/chunk-NVVYYUMR.js";
import {
  handleComboboxKeyDown
} from "./chunks/chunk-6HMZLOGF.js";
import {
  SingleDatePicker
} from "./chunks/chunk-PIYT6PPA.js";
import {
  ConfirmModal,
  useConfirmDialog,
  wait
} from "./chunks/chunk-4POUG5VJ.js";
import {
  flashActionMark,
  setHistoryFilterForDate
} from "./chunks/chunk-K7MECJ5E.js";
import {
  SelectCombobox_default,
  VisitasPageProviders_default
} from "./chunks/chunk-WPRFFVHK.js";
import {
  ChevronDownSvg,
  ChevronUpSvg,
  FloatingList_default,
  Spinner_default,
  canAccess,
  classNames,
  fetchJson,
  indFormat,
  indT,
  showPermissionModal,
  useOutsideClick
} from "./chunks/chunk-FICWEV5U.js";
import "./chunks/chunk-QO7GVWVB.js";
import {
  getSessionJsonWithExpiry,
  getSessionValueWithExpiry,
  setSessionJsonWithExpiry
} from "./chunks/chunk-7SKLSV7K.js";
import {
  mountReactIsland,
  mountWhenDocumentReady,
  require_jsx_runtime,
  require_react
} from "./chunks/chunk-BWM3JLWG.js";
import {
  __toESM
} from "./chunks/chunk-45FWCHS2.js";

// Web/wwwroot/react/src/pages/visitas/creacion/CreateForm.tsx
var import_react5 = __toESM(require_react());

// Web/wwwroot/react/src/hooks/useTopbar.ts
var import_react = __toESM(require_react());
var useTopbar = (step, canGoNext, onNext, onPrev, busy = false, canSubmitStep2 = true, canAccess2 = true) => {
  (0, import_react.useEffect)(() => {
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
var import_react2 = __toESM(require_react());

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
var CREATE_DRAFT_TTL_MS = 24 * 60 * 60 * 1e3;
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
  const draftRestoredRef = (0, import_react2.useRef)(false);
  const draftPersistTimerRef = (0, import_react2.useRef)(null);
  const persistDraftSnapshot = (0, import_react2.useCallback)((draft) => {
    setSessionJsonWithExpiry(VISIT_DRAFT_KEY, draft, CREATE_DRAFT_TTL_MS);
  }, []);
  const persistDraftNow = (0, import_react2.useCallback)(() => {
    persistDraftSnapshot(draftSnapshot);
  }, [draftSnapshot, persistDraftSnapshot]);
  (0, import_react2.useEffect)(() => {
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
  (0, import_react2.useEffect)(() => {
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
      shouldShow = !!(getSessionValueWithExpiry(VISIT_DRAFT_KEY) || sessionStorage.getItem(CONTACTS_STORAGE_KEY) || sessionStorage.getItem(CONTACTS_SELECTION_KEY));
    } catch {
    }
    if (shouldShow) {
      showGlobalSpinner(indT("Common_Loading", "Loading"));
    }
    try {
      const draft = getSessionJsonWithExpiry(VISIT_DRAFT_KEY);
      if (draft?.selectedClient?.value) setSelectedClient(draft.selectedClient);
      if (Array.isArray(draft?.selectedContacts)) setSelectedContacts(draft.selectedContacts);
      if (draft?.visitType !== void 0) setVisitType(draft.visitType);
      if (draft?.transDate) setTransDate(draft.transDate);
      if (draft?.description !== void 0) setDescription(draft.description);
      if (draft?.comentarios !== void 0) setComentarios(draft.comentarios);
      if (draft?.antecedentes !== void 0) setAntecedentes(draft.antecedentes);
      if (draft?.conclusiones !== void 0) setConclusiones(draft.conclusiones);
      if (draft?.step === 2) setStep(2);
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
var import_react3 = __toESM(require_react());

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
  const doCreate = (0, import_react3.useCallback)(async () => {
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
  const handleSubmit = (0, import_react3.useCallback)(() => {
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

// Web/wwwroot/react/src/components/visitas/ContactsCombobox.tsx
var import_react4 = __toESM(require_react());

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
  const [query, setQuery] = (0, import_react4.useState)("");
  const [options, setOptions] = (0, import_react4.useState)([]);
  const [selected, setSelected] = (0, import_react4.useState)(value);
  const [loading, setLoading] = (0, import_react4.useState)(false);
  const [loadingMore, setLoadingMore] = (0, import_react4.useState)(false);
  const [status, setStatus] = (0, import_react4.useState)(indT("Visits_Create_SelectClientFirst", "Select a client first."));
  const [hasLoaded, setHasLoaded] = (0, import_react4.useState)(false);
  const [open, setOpen] = (0, import_react4.useState)(false);
  const [page, setPage] = (0, import_react4.useState)(1);
  const [hasMore, setHasMore] = (0, import_react4.useState)(true);
  const [blocking, setBlocking] = (0, import_react4.useState)(false);
  const [activeIndex, setActiveIndex] = (0, import_react4.useState)(0);
  const listRef = (0, import_react4.useRef)(null);
  const boxRef = (0, import_react4.useRef)(null);
  const abortRef = (0, import_react4.useRef)(null);
  const containerRef = (0, import_react4.useRef)(null);
  const inputRef = (0, import_react4.useRef)(null);
  const lastAccountRef = (0, import_react4.useRef)(accountNum || "");
  const onChangeRef = (0, import_react4.useRef)(onChange);
  const idBase = (0, import_react4.useId)();
  const inputId = `${idBase}-contacts-input`;
  const listId = `${idBase}-contacts-options`;
  useOutsideClick([containerRef, listRef], () => setOpen(false));
  (0, import_react4.useEffect)(() => {
    onChangeRef.current = onChange;
  }, [onChange]);
  const isSameSelection = (a = [], b = []) => {
    if (a.length !== b.length) return false;
    const as = a.map((x) => String(x.value)).sort();
    const bs = b.map((x) => String(x.value)).sort();
    return as.every((v, i) => v === bs[i]);
  };
  (0, import_react4.useEffect)(() => {
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
  (0, import_react4.useEffect)(() => {
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
  (0, import_react4.useEffect)(() => {
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
  (0, import_react4.useEffect)(() => {
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
  const loadMoreContacts = import_react4.default.useCallback(() => {
    if (!accountNum || !hasMore || loadingMore || loading) return;
    load(page + 1, true);
  }, [accountNum, hasMore, loadingMore, loading, page]);
  (0, import_react4.useEffect)(() => {
    if (!open || !listRef.current) return;
    const el = listRef.current;
    const onScroll = () => {
      if (el.scrollTop + el.clientHeight >= el.scrollHeight - 8) loadMoreContacts();
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [open, loadMoreContacts]);
  const selectedValues = (0, import_react4.useMemo)(() => {
    return new Set((selected || []).map((s) => String(s.value)));
  }, [selected]);
  const availableOptions = (0, import_react4.useMemo)(() => {
    return (options || []).filter((o) => !selectedValues.has(String(o.value)));
  }, [options, selectedValues]);
  const filtered = (0, import_react4.useMemo)(() => {
    const q = query.trim().toLowerCase();
    if (!q) return availableOptions;
    const f = availableOptions.filter(
      (o) => o.text.toLowerCase().includes(q) || o.cargo.toLowerCase().includes(q) || o.empresa.toLowerCase().includes(q)
    );
    return f.length ? f : availableOptions;
  }, [availableOptions, query]);
  const activeId = open && filtered[activeIndex] ? `${idBase}-contact-opt-${filtered[activeIndex].value}` : void 0;
  (0, import_react4.useEffect)(() => {
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
    handleComboboxKeyDown(ev, {
      isOpen: open,
      setOpen,
      optionCount: filtered.length,
      setActiveIndex,
      openOnArrow: true,
      onArrowNavigate: ensureLoaded,
      onEnterWhenOpen: () => {
        toggleOption(filtered[activeIndex] ?? filtered[0]);
      },
      onEnterWhenClosed: accountNum ? () => {
        ensureLoaded();
        setOpen(true);
      } : void 0
    });
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "space-y-2", ref: containerRef, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "form-label font-semibold", htmlFor: inputId, children: indT("Visits_Create_SearchContact", "Search contact") }),
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
                        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(XMarkIcon_default, { className: "h-4 w-4", "aria-hidden": "true" })
                      }
                    )
                  ]
                },
                c.value
              )),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "input",
                {
                  id: inputId,
                  name: `${idBase}-contacts-query`,
                  className: "flex-1 min-w-30 bg-transparent text-sm sm:text-base leading-5 text-slate-900 border-none outline-hidden px-1 py-1 focus:ring-0 focus:border-transparent",
                  onChange: (event) => setQuery(event.target.value),
                  onKeyDown: handleKeyDown,
                  placeholder: selected.length ? "" : indT("Visits_Create_FilterPlaceholder", "Type to filter..."),
                  autoComplete: "off",
                  ref: inputRef,
                  readOnly: !accountNum,
                  role: "combobox",
                  "aria-expanded": open,
                  "aria-controls": listId,
                  "aria-activedescendant": activeId,
                  "aria-autocomplete": "list",
                  "aria-label": indT("Visits_Create_SearchContact", "Search contact"),
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
                children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUpSvg, { className: "h-5 w-5", "aria-hidden": "true" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDownSvg, { className: "h-5 w-5", "aria-hidden": "true" })
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
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { ref: listRef, id: listId, "aria-multiselectable": "true", children: [
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
                    id: `${idBase}-contact-opt-${opt.value}`,
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

// Web/wwwroot/react/src/pages/visitas/creacion/CreateStepClientSelection.tsx
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var CreateStepClientSelection = ({
  selectedClient,
  selectedContacts,
  onClientSelected,
  onContactsChange,
  clientLabel,
  clientPlaceholder,
  selectedContactsCountText
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "space-y-6", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      ClientSearchCombobox_default,
      {
        value: selectedClient,
        onSelected: onClientSelected,
        label: clientLabel,
        placeholder: clientPlaceholder,
        portalClassName: "visitas-typography"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "space-y-3", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        ContactsCombobox_default,
        {
          accountNum: selectedClient?.value,
          value: selectedContacts,
          onChange: onContactsChange,
          portalClassName: "visitas-typography"
        }
      ),
      selectedContacts.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "text-xs text-slate-600", children: selectedContactsCountText })
    ] })
  ] });
};
var CreateStepClientSelection_default = CreateStepClientSelection;

// Web/wwwroot/react/src/pages/visitas/creacion/CreateStepVisitDetails.tsx
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
var CreateStepVisitDetails = ({
  title,
  dateLabel,
  transDate,
  onTransDateChange,
  visitTypeLabel,
  visitTypes,
  visitType,
  onVisitTypeChange,
  visitTypePlaceholder,
  visitTypeInvalid,
  descriptionLabel,
  descriptionValue,
  descriptionClassName,
  onDescriptionChange,
  tapFields,
  status
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "shadow-xs glass-panel p-4 space-y-4 border border-slate-200 rounded-2xl", children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "text-base font-semibold text-slate-900 border-b border-slate-200 pb-3", children: title }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "visita-field-text", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(SingleDatePicker, { label: dateLabel, value: transDate, onChange: onTransDateChange }) }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        SelectCombobox_default,
        {
          label: visitTypeLabel,
          options: visitTypes,
          value: visitType,
          onChange: (nextValue) => onVisitTypeChange(String(nextValue ?? "")),
          placeholder: visitTypePlaceholder,
          invalid: visitTypeInvalid,
          emitOnValueChange: true,
          portalClassName: "visitas-typography"
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      VisitNarrativeFields_default,
      {
        descriptionLabel,
        descriptionValue,
        descriptionClassName,
        onDescriptionChange,
        tapFields
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "text-sm text-slate-500", children: status }) })
  ] });
};
var CreateStepVisitDetails_default = CreateStepVisitDetails;

// Web/wwwroot/react/src/pages/visitas/creacion/CreateForm.tsx
var import_jsx_runtime4 = __toESM(require_jsx_runtime());
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
  const defaultVisitType = String(visitTypes[0]?.value ?? visitTypes[0]?.Value ?? "");
  const defaultAsistenteTipo = String(asistenteTipos[0]?.value ?? asistenteTipos[0]?.Value ?? "0");
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
      navigateToTextEditorField({
        fieldId,
        fieldLabel,
        fieldValue,
        allowEdit: options?.allowEdit !== false,
        beforeNavigate: persistDraftNow
      });
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
  const textEditorBindings = (0, import_react5.useMemo)(
    () => [
      { fieldId: fieldIdComentarios, applyValue: setComentarios },
      { fieldId: fieldIdAntecedentes, applyValue: setAntecedentes },
      { fieldId: fieldIdConclusiones, applyValue: setConclusiones }
    ],
    [fieldIdAntecedentes, fieldIdComentarios, fieldIdConclusiones]
  );
  useTextEditorFields(textEditorBindings);
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
  (0, import_react5.useEffect)(() => {
    if (step === 1) {
      setShowRequired(false);
      closeConfirm();
    }
  }, [step, closeConfirm]);
  const visitTypeInvalid = showRequired && (String(visitType || "") === "" || String(visitType) === "0");
  const descriptionInvalid = showRequired && description.trim().length === 0;
  const comentariosInvalid = showRequired && comentarios.trim().length === 0;
  const descriptionInputClassName = classNames(
    "form-control",
    descriptionInvalid ? "border-rose-400 bg-rose-50 focus:ring-rose-200 focus:border-rose-400" : "border-slate-200 focus:ring-primary focus:border-primary"
  );
  const comentariosClassName = classNames(
    "form-control cursor-pointer",
    comentariosInvalid ? "border-rose-400 bg-rose-50 focus:ring-rose-200 focus:border-rose-400" : "border-slate-200 focus:ring-primary focus:border-primary"
  );
  const descriptionLabel = indT("Visits_Field_Description", "Description");
  const commentsLabel = indT("Visits_Field_Comments", "Comments");
  const backgroundLabel = indT("Visits_Field_Background", "Background");
  const conclusionsLabel = indT("Visits_Field_Conclusions", "Conclusions");
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "space-y-4", children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
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
    step === 1 && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      CreateStepClientSelection_default,
      {
        selectedClient,
        selectedContacts,
        onClientSelected: setSelectedClient,
        onContactsChange: setSelectedContacts,
        clientLabel: indT("Visits_Create_SearchClient", "Search client"),
        clientPlaceholder: indFormat("Visits_Create_ClientPlaceholder", "Type at least {0} characters...", 4),
        selectedContactsCountText: indFormat(
          "Visits_Create_SelectedContactsCount",
          "{0} selected contact(s)",
          selectedContacts.length
        )
      }
    ),
    step === 2 && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      CreateStepVisitDetails_default,
      {
        title: indT("Visits_Create_VisitData_Title", "Visit details"),
        dateLabel: indT("Visits_Detail_Date_Label", "Date"),
        transDate,
        onTransDateChange: setTransDate,
        visitTypeLabel: indT("Visits_Detail_VisitType_Label", "Visit type"),
        visitTypes,
        visitType,
        onVisitTypeChange: setVisitType,
        visitTypePlaceholder: indT("Visits_Detail_VisitType_Placeholder", "Select type"),
        visitTypeInvalid,
        descriptionLabel,
        descriptionValue: description,
        descriptionClassName: descriptionInputClassName,
        onDescriptionChange: setDescription,
        tapFields: [
          {
            id: "comentarios",
            label: commentsLabel,
            value: comentarios,
            className: comentariosClassName,
            pointerBindings: comentariosTap
          },
          {
            id: "antecedentes",
            label: backgroundLabel,
            value: antecedentes,
            className: "form-control cursor-pointer",
            pointerBindings: antecedentesTap
          },
          {
            id: "conclusiones",
            label: conclusionsLabel,
            value: conclusiones,
            className: "form-control cursor-pointer",
            pointerBindings: conclusionesTap
          }
        ],
        status
      }
    )
  ] });
}
function CreateForm() {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(AppErrorBoundary_default, { fallbackMessage: indT("Visits_Create_ErrorBoundary", "An error occurred while rendering the visits page. Reload and try again."), children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(VisitasApp, {}) });
}

// Web/wwwroot/react/src/pages/visitas/creacion/CreatePage.tsx
var import_jsx_runtime5 = __toESM(require_jsx_runtime());
var CreatePage = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(VisitasPageProviders_default, { children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(CreateForm, {}) });
};
var mount = () => {
  const rootEl = document.getElementById("visitas-app-root");
  if (!rootEl) return;
  mountReactIsland(rootEl, /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(CreatePage, {}));
};
mountWhenDocumentReady(mount);
var CreatePage_default = CreatePage;
export {
  CreatePage_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvY3JlYWNpb24vQ3JlYXRlRm9ybS50c3giLCAiLi4vcmVhY3Qvc3JjL2hvb2tzL3VzZVRvcGJhci50cyIsICIuLi9yZWFjdC9zcmMvaG9va3MvdXNlQ3JlYXRlRHJhZnQudHMiLCAiLi4vcmVhY3Qvc3JjL3V0aWxzL2dsb2JhbFNwaW5uZXIudHMiLCAiLi4vcmVhY3Qvc3JjL2hvb2tzL3VzZUNyZWF0ZVN1Ym1pdC50cyIsICIuLi9yZWFjdC9zcmMvdXRpbHMvaW5kSWRzLnRzIiwgIi4uL3JlYWN0L3NyYy9jb21wb25lbnRzL3Zpc2l0YXMvQ29udGFjdHNDb21ib2JveC50c3giLCAiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BoZXJvaWNvbnMvcmVhY3QvMjAvc29saWQvZXNtL1hNYXJrSWNvbi5qcyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9jcmVhY2lvbi9DcmVhdGVTdGVwQ2xpZW50U2VsZWN0aW9uLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9jcmVhY2lvbi9DcmVhdGVTdGVwVmlzaXREZXRhaWxzLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9jcmVhY2lvbi9DcmVhdGVQYWdlLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiXHVGRUZGaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlU3RhdGUsIHVzZVJlZiB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgQ29uZmlybU1vZGFsIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvQ29uZmlybU1vZGFsLnRzeFwiO1xuaW1wb3J0IEFwcEVycm9yQm91bmRhcnkgZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9BcHBFcnJvckJvdW5kYXJ5LnRzeFwiO1xuaW1wb3J0IHsgdXNlVmlzaXRhcyB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VWaXNpdGFzLnRzXCI7XG5pbXBvcnQgeyB1c2VUYXBHdWFyZCB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VUYXBHdWFyZC50c1wiO1xuaW1wb3J0IHsgdXNlVG9wYmFyIH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZVRvcGJhci50c1wiO1xuaW1wb3J0IHsgdXNlQ29uZmlybURpYWxvZyB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VDb25maXJtRGlhbG9nLnRzXCI7XG5pbXBvcnQgeyB1c2VDcmVhdGVEcmFmdCB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VDcmVhdGVEcmFmdC50c1wiO1xuaW1wb3J0IHsgdXNlQ3JlYXRlU3VibWl0IH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZUNyZWF0ZVN1Ym1pdC50c1wiO1xuaW1wb3J0IHsgdXNlVGV4dEVkaXRvckZpZWxkcyB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VUZXh0RWRpdG9yRmllbGRzLnRzXCI7XG5pbXBvcnQgQ3JlYXRlU3RlcENsaWVudFNlbGVjdGlvbiwgeyBDcmVhdGVTZWxlY3RlZENsaWVudCwgQ3JlYXRlU2VsZWN0ZWRDb250YWN0IH0gZnJvbSBcIi4vQ3JlYXRlU3RlcENsaWVudFNlbGVjdGlvbi50c3hcIjtcbmltcG9ydCBDcmVhdGVTdGVwVmlzaXREZXRhaWxzIGZyb20gXCIuL0NyZWF0ZVN0ZXBWaXNpdERldGFpbHMudHN4XCI7XG5pbXBvcnQgeyBjbGFzc05hbWVzIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2NsYXNzTmFtZXMudHNcIjtcbmltcG9ydCB7IGluZEZvcm1hdCwgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgeyBjYW5BY2Nlc3MsIHNob3dQZXJtaXNzaW9uTW9kYWwgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvcGVybWlzc2lvbnMudHNcIjtcbmltcG9ydCB7IHNldFByZXZpZXdBbmNob3IsIHNob3dQcmV2aWV3VG9vbHRpcCwgaXNPdmVyZmxvd2luZyB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9wcmV2aWV3VG9vbHRpcC50c1wiO1xuaW1wb3J0IHsgbmF2aWdhdGVUb1RleHRFZGl0b3JGaWVsZCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy90ZXh0RWRpdG9yTmF2aWdhdGlvbi50c1wiO1xuaW1wb3J0IHsgZmxhc2hBY3Rpb25NYXJrIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3Zpc2l0YXNIaXN0b3J5LnRzXCI7XG5cclxuZnVuY3Rpb24gVmlzaXRhc0FwcCgpIHtcbiAgY29uc3QgeyB2aXNpdFR5cGVzLCBhc2lzdGVudGVUaXBvcyB9ID0gdXNlVmlzaXRhcygpO1xuICBjb25zdCBjYW5DcmVhdGVWaXNpdCA9IGNhbkFjY2VzcyhcIlZJU0lUQVNfQ1JFQUNJT05cIiwgXCJBZGRcIik7XG4gIGNvbnN0IGNhblJvbGxiYWNrRGVsZXRlID0gY2FuQWNjZXNzKFwiVklTSVRBU19ISVNUT1JJQUxcIiwgXCJGdWxsQWNjZXNzXCIpO1xuXHJcbiAgY29uc3QgZmllbGRJZENvbWVudGFyaW9zID0gXCJWaXNpdGEuQ3JlYXRlLkNvbWVudGFyaW9zXCI7XHJcbiAgY29uc3QgZmllbGRJZEFudGVjZWRlbnRlcyA9IFwiVmlzaXRhLkNyZWF0ZS5BbnRlY2VkZW50ZXNcIjtcclxuICBjb25zdCBmaWVsZElkQ29uY2x1c2lvbmVzID0gXCJWaXNpdGEuQ3JlYXRlLkNvbmNsdXNpb25lc1wiO1xyXG5cclxuICBjb25zdCBbc3RlcCwgc2V0U3RlcF0gPSB1c2VTdGF0ZSgxKTtcclxuICBjb25zdCBbc2VsZWN0ZWRDbGllbnQsIHNldFNlbGVjdGVkQ2xpZW50XSA9IHVzZVN0YXRlPENyZWF0ZVNlbGVjdGVkQ2xpZW50PihudWxsKTtcbiAgY29uc3QgW3NlbGVjdGVkQ29udGFjdHMsIHNldFNlbGVjdGVkQ29udGFjdHNdID0gdXNlU3RhdGU8Q3JlYXRlU2VsZWN0ZWRDb250YWN0W10+KFtdKTtcbiAgY29uc3QgdG9kYXlTdHJpbmcgPSAoKSA9PiB7XHJcbiAgICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKCk7XHJcbiAgICBjb25zdCB5eXl5ID0gdG9kYXkuZ2V0RnVsbFllYXIoKTtcclxuICAgIGNvbnN0IG1tID0gU3RyaW5nKHRvZGF5LmdldE1vbnRoKCkgKyAxKS5wYWRTdGFydCgyLCBcIjBcIik7XHJcbiAgICBjb25zdCBkZCA9IFN0cmluZyh0b2RheS5nZXREYXRlKCkpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcclxuICAgIHJldHVybiBgJHt5eXl5fS0ke21tfS0ke2RkfWA7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgZGVmYXVsdFZpc2l0VHlwZSA9IFN0cmluZyh2aXNpdFR5cGVzWzBdPy52YWx1ZSA/PyB2aXNpdFR5cGVzWzBdPy5WYWx1ZSA/PyBcIlwiKTtcbiAgY29uc3QgZGVmYXVsdEFzaXN0ZW50ZVRpcG8gPSBTdHJpbmcoYXNpc3RlbnRlVGlwb3NbMF0/LnZhbHVlID8/IGFzaXN0ZW50ZVRpcG9zWzBdPy5WYWx1ZSA/PyBcIjBcIik7XG5cbiAgY29uc3QgW3Zpc2l0VHlwZSwgc2V0VmlzaXRUeXBlXSA9IHVzZVN0YXRlPHN0cmluZz4oZGVmYXVsdFZpc2l0VHlwZSk7XG4gIGNvbnN0IFt0cmFuc0RhdGUsIHNldFRyYW5zRGF0ZV0gPSB1c2VTdGF0ZSgoKSA9PiB0b2RheVN0cmluZygpKTtcclxuICBjb25zdCBbZGVzY3JpcHRpb24sIHNldERlc2NyaXB0aW9uXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtjb21lbnRhcmlvcywgc2V0Q29tZW50YXJpb3NdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW2FudGVjZWRlbnRlcywgc2V0QW50ZWNlZGVudGVzXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtjb25jbHVzaW9uZXMsIHNldENvbmNsdXNpb25lc10gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbc3RhdHVzLCBzZXRTdGF0dXNdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtidXN5LCBzZXRCdXN5XSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3Nob3dSZXF1aXJlZCwgc2V0U2hvd1JlcXVpcmVkXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW21vZGFsRXJyb3IsIHNldE1vZGFsRXJyb3JdID0gdXNlU3RhdGUoXCJcIik7XG5cclxuICBjb25zdCB7IG1vZGFsLCBvcGVuQ29uZmlybSwgY2xvc2VDb25maXJtLCBoYW5kbGVDb25maXJtIH0gPSB1c2VDb25maXJtRGlhbG9nKHtcclxuICAgIGRlZmF1bHRDb25maXJtVGV4dDogaW5kVChcIkNvbmZpcm1fWWVzXCIsIFwiT0tcIiksXHJcbiAgICBkZWZhdWx0Q2FuY2VsVGV4dDogaW5kVChcIkNvbmZpcm1fTm9cIiwgXCJDYW5jZWxcIilcclxuICB9KTtcclxuXHJcbiAgY29uc3QgaGFuZGxlTW9kYWxDb25maXJtID0gUmVhY3QudXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgc2V0TW9kYWxFcnJvcihcIlwiKTtcclxuICAgIGF3YWl0IGhhbmRsZUNvbmZpcm0oe1xyXG4gICAgICBidXN5LFxyXG4gICAgICBvbkVycm9yOiAobXNnKSA9PiB7XHJcbiAgICAgICAgc2V0TW9kYWxFcnJvcihtc2cpO1xyXG4gICAgICAgIHNldFN0YXR1cyhtc2cpO1xyXG4gICAgICAgIGZsYXNoQWN0aW9uTWFyayhcImVycm9yUHJvY2Vzc1wiLCAxNTAwKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSwgW2J1c3ksIGhhbmRsZUNvbmZpcm1dKTtcclxuXHJcbiAgY29uc3QgbW9kYWxMb2FkaW5nVGV4dCA9IGluZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIik7XHJcbiAgY29uc3QgbW9kYWxDYW5jZWxUZXh0ID0gbW9kYWwuY2FuY2VsVGV4dCB8fCBpbmRUKFwiQ29uZmlybV9Ob1wiLCBcIkNhbmNlbFwiKTtcclxuICBjb25zdCBtb2RhbENvbmZpcm1UZXh0ID0gYnVzeVxyXG4gICAgPyBtb2RhbExvYWRpbmdUZXh0XHJcbiAgICA6ICghYnVzeSAmJiBtb2RhbEVycm9yID8gaW5kVChcIkNvbW1vbl9PS1wiLCBcIk9LXCIpIDogKG1vZGFsLmNvbmZpcm1UZXh0IHx8IGluZFQoXCJDb25maXJtX1llc1wiLCBcIk9LXCIpKSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZU1vZGFsQnV0dG9uQ29uZmlybSA9IFJlYWN0LnVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmICghYnVzeSAmJiBtb2RhbEVycm9yKSB7XHJcbiAgICAgIGNsb3NlQ29uZmlybSgpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBoYW5kbGVNb2RhbENvbmZpcm0oKTtcclxuICB9LCBbYnVzeSwgbW9kYWxFcnJvciwgY2xvc2VDb25maXJtLCBoYW5kbGVNb2RhbENvbmZpcm1dKTtcclxuXHJcbiAgY29uc3QgZHJhZnRTbmFwc2hvdCA9IHVzZU1lbW8oXG4gICAgKCkgPT4gKHtcbiAgICAgIHNlbGVjdGVkQ2xpZW50LFxuICAgICAgc2VsZWN0ZWRDb250YWN0cyxcbiAgICAgIHZpc2l0VHlwZSxcbiAgICAgIHRyYW5zRGF0ZSxcbiAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgY29tZW50YXJpb3MsXG4gICAgICBhbnRlY2VkZW50ZXMsXG4gICAgICBjb25jbHVzaW9uZXMsXG4gICAgICBzdGVwLFxuICAgIH0pLFxuICAgIFtzZWxlY3RlZENsaWVudCwgc2VsZWN0ZWRDb250YWN0cywgdmlzaXRUeXBlLCB0cmFuc0RhdGUsIGRlc2NyaXB0aW9uLCBjb21lbnRhcmlvcywgYW50ZWNlZGVudGVzLCBjb25jbHVzaW9uZXMsIHN0ZXBdXG4gICk7XG5cbiAgY29uc3QgeyBwZXJzaXN0RHJhZnROb3cgfSA9IHVzZUNyZWF0ZURyYWZ0KHtcbiAgICBkcmFmdFNuYXBzaG90LFxuICAgIHNldFNlbGVjdGVkQ2xpZW50LFxuICAgIHNldFNlbGVjdGVkQ29udGFjdHMsXG4gICAgc2V0VmlzaXRUeXBlLFxuICAgIHNldFRyYW5zRGF0ZSxcbiAgICBzZXREZXNjcmlwdGlvbixcbiAgICBzZXRDb21lbnRhcmlvcyxcbiAgICBzZXRBbnRlY2VkZW50ZXMsXG4gICAgc2V0Q29uY2x1c2lvbmVzLFxuICAgIHNldFN0ZXAsXG4gIH0pO1xuXHJcbiAgLy8gT3BlbnMgdGhlIGZ1bGwtc2NyZWVuIHRleHQgZWRpdG9yIGZvciBhIG11bHRpbGluZSBmaWVsZC5cbiAgY29uc3Qgb3BlblRleHRFZGl0b3IgPSBSZWFjdC51c2VDYWxsYmFjayhcbiAgICAoZmllbGRJZDogc3RyaW5nLCBmaWVsZExhYmVsOiBzdHJpbmcsIGZpZWxkVmFsdWU6IHN0cmluZywgb3B0aW9uczogeyBhbGxvd0VkaXQ/OiBib29sZWFuIH0gPSB7fSkgPT4ge1xuICAgICAgbmF2aWdhdGVUb1RleHRFZGl0b3JGaWVsZCh7XG4gICAgICAgIGZpZWxkSWQsXG4gICAgICAgIGZpZWxkTGFiZWwsXG4gICAgICAgIGZpZWxkVmFsdWUsXG4gICAgICAgIGFsbG93RWRpdDogb3B0aW9ucz8uYWxsb3dFZGl0ICE9PSBmYWxzZSxcbiAgICAgICAgYmVmb3JlTmF2aWdhdGU6IHBlcnNpc3REcmFmdE5vdyxcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgW3BlcnNpc3REcmFmdE5vd11cbiAgKTtcblxyXG4gIGNvbnN0IGhhbmRsZUNvbWVudGFyaW9zVGFwID0gUmVhY3QudXNlQ2FsbGJhY2soKGV2ZW50KSA9PiB7XHJcbiAgICBpZiAoYnVzeSkgcmV0dXJuO1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIG9wZW5UZXh0RWRpdG9yKGZpZWxkSWRDb21lbnRhcmlvcywgaW5kVChcIlZpc2l0c19GaWVsZF9Db21tZW50c1wiLCBcIkNvbW1lbnRzXCIpLCBjb21lbnRhcmlvcyk7XHJcbiAgfSwgW2J1c3ksIGNvbWVudGFyaW9zLCBvcGVuVGV4dEVkaXRvcl0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVDb21lbnRhcmlvc0hvbGQgPSBSZWFjdC51c2VDYWxsYmFjaygodGFyZ2V0LCBjbGllbnRZKSA9PiB7XHJcbiAgICBpZiAoIXRhcmdldCB8fCAhaXNPdmVyZmxvd2luZyh0YXJnZXQpKSByZXR1cm4gZmFsc2U7XHJcbiAgICBzZXRQcmV2aWV3QW5jaG9yKHRhcmdldCk7XHJcbiAgICByZXR1cm4gc2hvd1ByZXZpZXdUb29sdGlwKFN0cmluZyhjb21lbnRhcmlvcyB8fCBcIlwiKSwgY2xpZW50WSk7XHJcbiAgfSwgW2NvbWVudGFyaW9zXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUFudGVjZWRlbnRlc1RhcCA9IFJlYWN0LnVzZUNhbGxiYWNrKChldmVudCkgPT4ge1xyXG4gICAgaWYgKGJ1c3kpIHJldHVybjtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBvcGVuVGV4dEVkaXRvcihmaWVsZElkQW50ZWNlZGVudGVzLCBpbmRUKFwiVmlzaXRzX0ZpZWxkX0JhY2tncm91bmRcIiwgXCJCYWNrZ3JvdW5kXCIpLCBhbnRlY2VkZW50ZXMpO1xyXG4gIH0sIFtidXN5LCBhbnRlY2VkZW50ZXMsIG9wZW5UZXh0RWRpdG9yXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUFudGVjZWRlbnRlc0hvbGQgPSBSZWFjdC51c2VDYWxsYmFjaygodGFyZ2V0LCBjbGllbnRZKSA9PiB7XHJcbiAgICBpZiAoIXRhcmdldCB8fCAhaXNPdmVyZmxvd2luZyh0YXJnZXQpKSByZXR1cm4gZmFsc2U7XHJcbiAgICBzZXRQcmV2aWV3QW5jaG9yKHRhcmdldCk7XHJcbiAgICByZXR1cm4gc2hvd1ByZXZpZXdUb29sdGlwKFN0cmluZyhhbnRlY2VkZW50ZXMgfHwgXCJcIiksIGNsaWVudFkpO1xyXG4gIH0sIFthbnRlY2VkZW50ZXNdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQ29uY2x1c2lvbmVzVGFwID0gUmVhY3QudXNlQ2FsbGJhY2soKGV2ZW50KSA9PiB7XHJcbiAgICBpZiAoYnVzeSkgcmV0dXJuO1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIG9wZW5UZXh0RWRpdG9yKGZpZWxkSWRDb25jbHVzaW9uZXMsIGluZFQoXCJWaXNpdHNfRmllbGRfQ29uY2x1c2lvbnNcIiwgXCJDb25jbHVzaW9uc1wiKSwgY29uY2x1c2lvbmVzKTtcclxuICB9LCBbYnVzeSwgY29uY2x1c2lvbmVzLCBvcGVuVGV4dEVkaXRvcl0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVDb25jbHVzaW9uZXNIb2xkID0gUmVhY3QudXNlQ2FsbGJhY2soKHRhcmdldCwgY2xpZW50WSkgPT4ge1xyXG4gICAgaWYgKCF0YXJnZXQgfHwgIWlzT3ZlcmZsb3dpbmcodGFyZ2V0KSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgc2V0UHJldmlld0FuY2hvcih0YXJnZXQpO1xyXG4gICAgcmV0dXJuIHNob3dQcmV2aWV3VG9vbHRpcChTdHJpbmcoY29uY2x1c2lvbmVzIHx8IFwiXCIpLCBjbGllbnRZKTtcclxuICB9LCBbY29uY2x1c2lvbmVzXSk7XHJcblxyXG4gIGNvbnN0IGNvbWVudGFyaW9zVGFwID0gdXNlVGFwR3VhcmQoaGFuZGxlQ29tZW50YXJpb3NUYXAsIGhhbmRsZUNvbWVudGFyaW9zSG9sZCk7XG4gIGNvbnN0IGFudGVjZWRlbnRlc1RhcCA9IHVzZVRhcEd1YXJkKGhhbmRsZUFudGVjZWRlbnRlc1RhcCwgaGFuZGxlQW50ZWNlZGVudGVzSG9sZCk7XG4gIGNvbnN0IGNvbmNsdXNpb25lc1RhcCA9IHVzZVRhcEd1YXJkKGhhbmRsZUNvbmNsdXNpb25lc1RhcCwgaGFuZGxlQ29uY2x1c2lvbmVzSG9sZCk7XG5cbiAgY29uc3QgdGV4dEVkaXRvckJpbmRpbmdzID0gdXNlTWVtbyhcbiAgICAoKSA9PiBbXG4gICAgICB7IGZpZWxkSWQ6IGZpZWxkSWRDb21lbnRhcmlvcywgYXBwbHlWYWx1ZTogc2V0Q29tZW50YXJpb3MgfSxcbiAgICAgIHsgZmllbGRJZDogZmllbGRJZEFudGVjZWRlbnRlcywgYXBwbHlWYWx1ZTogc2V0QW50ZWNlZGVudGVzIH0sXG4gICAgICB7IGZpZWxkSWQ6IGZpZWxkSWRDb25jbHVzaW9uZXMsIGFwcGx5VmFsdWU6IHNldENvbmNsdXNpb25lcyB9LFxuICAgIF0sXG4gICAgW2ZpZWxkSWRBbnRlY2VkZW50ZXMsIGZpZWxkSWRDb21lbnRhcmlvcywgZmllbGRJZENvbmNsdXNpb25lc11cbiAgKTtcblxuICB1c2VUZXh0RWRpdG9yRmllbGRzKHRleHRFZGl0b3JCaW5kaW5ncyk7XG5cbiAgLy8gQ2xlYXIgY29udGFjdHMgb25seSB3aGVuIHRoZSBjbGllbnQgY2hhbmdlcyAoYXZvaWQgY2xlYXJpbmcgb24gcmVzdG9yZS9zdGVwIDIgcmV0dXJuKS5cbiAgY29uc3QgcHJldkNsaWVudFJlZiA9IHVzZVJlZihudWxsKTtcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IGN1cnJlbnQgPSBzZWxlY3RlZENsaWVudD8udmFsdWU7XHJcbiAgICBpZiAocHJldkNsaWVudFJlZi5jdXJyZW50ICYmIHByZXZDbGllbnRSZWYuY3VycmVudCAhPT0gY3VycmVudCkge1xyXG4gICAgICBzZXRTZWxlY3RlZENvbnRhY3RzKFtdKTtcclxuICAgIH1cclxuICAgIHByZXZDbGllbnRSZWYuY3VycmVudCA9IGN1cnJlbnQ7XHJcbiAgfSwgW3NlbGVjdGVkQ2xpZW50Py52YWx1ZV0pO1xyXG5cclxuICBjb25zdCBsYXN0Q2xpZW50UmVmID0gdXNlUmVmKG51bGwpO1xyXG5cclxuICAvLyBJZiB0aGUgY2xpZW50IGNoYW5nZXMgYWZ0ZXIgc2VsZWN0aW5nIGNvbnRhY3RzLCByZXNldCB0aGUgZW50aXJlIGZvcm0uXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IGN1cnJlbnQgPSBzZWxlY3RlZENsaWVudD8udmFsdWU7XHJcbiAgICBpZiAoIWN1cnJlbnQpIHJldHVybjtcclxuXHJcbiAgICBpZiAobGFzdENsaWVudFJlZi5jdXJyZW50ICYmIGxhc3RDbGllbnRSZWYuY3VycmVudCAhPT0gY3VycmVudCkge1xyXG4gICAgICBzZXRTdGVwKDEpO1xyXG4gICAgICBzZXRTZWxlY3RlZENvbnRhY3RzKFtdKTtcclxuICAgICAgc2V0VmlzaXRUeXBlKGRlZmF1bHRWaXNpdFR5cGUpO1xyXG4gICAgICBzZXRUcmFuc0RhdGUodG9kYXlTdHJpbmcoKSk7XHJcbiAgICAgIHNldERlc2NyaXB0aW9uKFwiXCIpO1xyXG4gICAgICBzZXRDb21lbnRhcmlvcyhcIlwiKTtcclxuICAgICAgc2V0QW50ZWNlZGVudGVzKFwiXCIpO1xyXG4gICAgICBzZXRDb25jbHVzaW9uZXMoXCJcIik7XHJcbiAgICAgIHNldFN0YXR1cyhcIlwiKTtcclxuICAgICAgc2V0QnVzeShmYWxzZSk7XHJcbiAgICB9XHJcbiAgICBsYXN0Q2xpZW50UmVmLmN1cnJlbnQgPSBjdXJyZW50O1xyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlYWN0LWhvb2tzL2V4aGF1c3RpdmUtZGVwc1xyXG4gIH0sIFtzZWxlY3RlZENsaWVudD8udmFsdWVdKTtcclxuXHJcbiAgY29uc3QgY2FuR29OZXh0ID0gISFzZWxlY3RlZENsaWVudDtcbiAgY29uc3QgY2FuQ3JlYXRlID1cbiAgICAhIXNlbGVjdGVkQ2xpZW50ICYmXG4gICAgU3RyaW5nKHZpc2l0VHlwZSB8fCBcIlwiKS50cmltKCkgIT09IFwiXCIgJiZcbiAgICBTdHJpbmcodmlzaXRUeXBlKSAhPT0gXCIwXCIgJiZcbiAgICBkZXNjcmlwdGlvbi50cmltKCkubGVuZ3RoID4gMCAmJlxuICAgIGNvbWVudGFyaW9zLnRyaW0oKS5sZW5ndGggPiAwO1xuXG4gIGNvbnN0IGhhc0FjdGl2ZVByb2Nlc3MgPSB1c2VNZW1vKCgpID0+IHtcbiAgICBpZiAoYnVzeSkgcmV0dXJuIHRydWU7XG4gICAgaWYgKHN0ZXAgPiAxKSByZXR1cm4gdHJ1ZTtcbiAgICBpZiAoc2VsZWN0ZWRDbGllbnQpIHJldHVybiB0cnVlO1xuICAgIGlmIChzZWxlY3RlZENvbnRhY3RzLmxlbmd0aCA+IDApIHJldHVybiB0cnVlO1xuICAgIHJldHVybiAoXG4gICAgICBkZXNjcmlwdGlvbi50cmltKCkubGVuZ3RoID4gMCB8fFxuICAgICAgY29tZW50YXJpb3MudHJpbSgpLmxlbmd0aCA+IDAgfHxcbiAgICAgIGFudGVjZWRlbnRlcy50cmltKCkubGVuZ3RoID4gMCB8fFxuICAgICAgY29uY2x1c2lvbmVzLnRyaW0oKS5sZW5ndGggPiAwXG4gICAgKTtcbiAgfSwgW2FudGVjZWRlbnRlcywgYnVzeSwgY29tZW50YXJpb3MsIGNvbmNsdXNpb25lcywgZGVzY3JpcHRpb24sIHNlbGVjdGVkQ2xpZW50LCBzZWxlY3RlZENvbnRhY3RzLmxlbmd0aCwgc3RlcF0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgd2luZG93Ll9faW5kU2V0TmF2aWdhdGlvbkd1YXJkPy4oaGFzQWN0aXZlUHJvY2Vzcyk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHdpbmRvdy5fX2luZENsZWFyTmF2aWdhdGlvbkd1YXJkPy4oKTtcbiAgICB9O1xuICB9LCBbaGFzQWN0aXZlUHJvY2Vzc10pO1xuXG4gIGNvbnN0IHsgaGFuZGxlU3VibWl0IH0gPSB1c2VDcmVhdGVTdWJtaXQoe1xuICAgIGJ1c3ksXG4gICAgbW9kYWxPcGVuOiBtb2RhbC5vcGVuLFxuICAgIGNhbkNyZWF0ZVZpc2l0LFxuICAgIGNhblJvbGxiYWNrRGVsZXRlLFxuICAgIHNlbGVjdGVkQ2xpZW50LFxuICAgIHNlbGVjdGVkQ29udGFjdHMsXG4gICAgdmlzaXRUeXBlLFxuICAgIGRlZmF1bHRBc2lzdGVudGVUaXBvLFxuICAgIGRlc2NyaXB0aW9uLFxuICAgIHRyYW5zRGF0ZSxcbiAgICBjb21lbnRhcmlvcyxcbiAgICBhbnRlY2VkZW50ZXMsXG4gICAgY29uY2x1c2lvbmVzLFxuICAgIHNldEJ1c3ksXG4gICAgc2V0U3RhdHVzLFxuICAgIHNldE1vZGFsRXJyb3IsXG4gICAgc2V0U2hvd1JlcXVpcmVkLFxuICAgIG9wZW5Db25maXJtLFxuICAgIGNsb3NlQ29uZmlybSxcbiAgfSk7XG5cbiAgY29uc3QgaGFuZGxlVG9wYmFyUHJpbWFyeSA9IFJlYWN0LnVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoIWNhbkNyZWF0ZVZpc2l0KSB7XG4gICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChzdGVwID09PSAxICYmIGNhbkdvTmV4dCkgc2V0U3RlcCgyKTtcbiAgICBpZiAoc3RlcCA9PT0gMikgaGFuZGxlU3VibWl0KCk7XG4gIH0sIFtjYW5DcmVhdGVWaXNpdCwgY2FuR29OZXh0LCBoYW5kbGVTdWJtaXQsIHN0ZXBdKTtcblxuICBjb25zdCBoYW5kbGVUb3BiYXJCYWNrID0gUmVhY3QudXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIHNldFN0ZXAoMSk7XG4gIH0sIFtdKTtcblxuICB1c2VUb3BiYXIoc3RlcCwgY2FuR29OZXh0LCBoYW5kbGVUb3BiYXJQcmltYXJ5LCBoYW5kbGVUb3BiYXJCYWNrLCBidXN5LCBjYW5DcmVhdGUsIGNhbkNyZWF0ZVZpc2l0KTtcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoc3RlcCA9PT0gMSkge1xyXG4gICAgICBzZXRTaG93UmVxdWlyZWQoZmFsc2UpO1xyXG4gICAgICBjbG9zZUNvbmZpcm0oKTtcclxuICAgIH1cclxuICB9LCBbc3RlcCwgY2xvc2VDb25maXJtXSk7XHJcblxyXG4gIGNvbnN0IHZpc2l0VHlwZUludmFsaWQgPSBzaG93UmVxdWlyZWQgJiYgKFN0cmluZyh2aXNpdFR5cGUgfHwgXCJcIikgPT09IFwiXCIgfHwgU3RyaW5nKHZpc2l0VHlwZSkgPT09IFwiMFwiKTtcbiAgY29uc3QgZGVzY3JpcHRpb25JbnZhbGlkID0gc2hvd1JlcXVpcmVkICYmIGRlc2NyaXB0aW9uLnRyaW0oKS5sZW5ndGggPT09IDA7XG4gIGNvbnN0IGNvbWVudGFyaW9zSW52YWxpZCA9IHNob3dSZXF1aXJlZCAmJiBjb21lbnRhcmlvcy50cmltKCkubGVuZ3RoID09PSAwO1xuICBjb25zdCBkZXNjcmlwdGlvbklucHV0Q2xhc3NOYW1lID0gY2xhc3NOYW1lcyhcbiAgICBcImZvcm0tY29udHJvbFwiLFxuICAgIGRlc2NyaXB0aW9uSW52YWxpZFxuICAgICAgPyBcImJvcmRlci1yb3NlLTQwMCBiZy1yb3NlLTUwIGZvY3VzOnJpbmctcm9zZS0yMDAgZm9jdXM6Ym9yZGVyLXJvc2UtNDAwXCJcbiAgICAgIDogXCJib3JkZXItc2xhdGUtMjAwIGZvY3VzOnJpbmctcHJpbWFyeSBmb2N1czpib3JkZXItcHJpbWFyeVwiXG4gICk7XG4gIGNvbnN0IGNvbWVudGFyaW9zQ2xhc3NOYW1lID0gY2xhc3NOYW1lcyhcbiAgICBcImZvcm0tY29udHJvbCBjdXJzb3ItcG9pbnRlclwiLFxuICAgIGNvbWVudGFyaW9zSW52YWxpZFxuICAgICAgPyBcImJvcmRlci1yb3NlLTQwMCBiZy1yb3NlLTUwIGZvY3VzOnJpbmctcm9zZS0yMDAgZm9jdXM6Ym9yZGVyLXJvc2UtNDAwXCJcbiAgICAgIDogXCJib3JkZXItc2xhdGUtMjAwIGZvY3VzOnJpbmctcHJpbWFyeSBmb2N1czpib3JkZXItcHJpbWFyeVwiXG4gICk7XG4gIGNvbnN0IGRlc2NyaXB0aW9uTGFiZWwgPSBpbmRUKFwiVmlzaXRzX0ZpZWxkX0Rlc2NyaXB0aW9uXCIsIFwiRGVzY3JpcHRpb25cIik7XG4gIGNvbnN0IGNvbW1lbnRzTGFiZWwgPSBpbmRUKFwiVmlzaXRzX0ZpZWxkX0NvbW1lbnRzXCIsIFwiQ29tbWVudHNcIik7XG4gIGNvbnN0IGJhY2tncm91bmRMYWJlbCA9IGluZFQoXCJWaXNpdHNfRmllbGRfQmFja2dyb3VuZFwiLCBcIkJhY2tncm91bmRcIik7XG4gIGNvbnN0IGNvbmNsdXNpb25zTGFiZWwgPSBpbmRUKFwiVmlzaXRzX0ZpZWxkX0NvbmNsdXNpb25zXCIsIFwiQ29uY2x1c2lvbnNcIik7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNFwiPlxyXG4gICAgICA8Q29uZmlybU1vZGFsXHJcbiAgICAgICAgb3Blbj17bW9kYWwub3Blbn1cclxuICAgICAgICB0aXRsZT17bW9kYWwudGl0bGV9XHJcbiAgICAgICAgbWVzc2FnZT17bW9kYWwubWVzc2FnZX1cclxuICAgICAgICBjb25maXJtVGV4dD17bW9kYWxDb25maXJtVGV4dH1cclxuICAgICAgICBjYW5jZWxUZXh0PXttb2RhbENhbmNlbFRleHR9XHJcbiAgICAgICAgbG9hZGluZ1RleHQ9e21vZGFsTG9hZGluZ1RleHR9XHJcbiAgICAgICAgc2hvd0NhbmNlbD17bW9kYWwuc2hvd0NhbmNlbH1cclxuICAgICAgICBzaG93Q29uZmlybT17bW9kYWwuc2hvd0NvbmZpcm19XHJcbiAgICAgICAgYnVzeT17YnVzeX1cclxuICAgICAgICBlcnJvcj17bW9kYWxFcnJvcn1cclxuICAgICAgICBzdGF0dXM9e3N0YXR1c31cclxuICAgICAgICBvbkNvbmZpcm09e2hhbmRsZU1vZGFsQnV0dG9uQ29uZmlybX1cclxuICAgICAgICBvbkNhbmNlbD17Y2xvc2VDb25maXJtfVxyXG4gICAgICAvPlxyXG4gICAgICB7c3RlcCA9PT0gMSAmJiAoXG4gICAgICAgIDxDcmVhdGVTdGVwQ2xpZW50U2VsZWN0aW9uXG4gICAgICAgICAgc2VsZWN0ZWRDbGllbnQ9e3NlbGVjdGVkQ2xpZW50fVxuICAgICAgICAgIHNlbGVjdGVkQ29udGFjdHM9e3NlbGVjdGVkQ29udGFjdHN9XG4gICAgICAgICAgb25DbGllbnRTZWxlY3RlZD17c2V0U2VsZWN0ZWRDbGllbnR9XG4gICAgICAgICAgb25Db250YWN0c0NoYW5nZT17c2V0U2VsZWN0ZWRDb250YWN0c31cbiAgICAgICAgICBjbGllbnRMYWJlbD17aW5kVChcIlZpc2l0c19DcmVhdGVfU2VhcmNoQ2xpZW50XCIsIFwiU2VhcmNoIGNsaWVudFwiKX1cbiAgICAgICAgICBjbGllbnRQbGFjZWhvbGRlcj17aW5kRm9ybWF0KFwiVmlzaXRzX0NyZWF0ZV9DbGllbnRQbGFjZWhvbGRlclwiLCBcIlR5cGUgYXQgbGVhc3QgezB9IGNoYXJhY3RlcnMuLi5cIiwgNCl9XG4gICAgICAgICAgc2VsZWN0ZWRDb250YWN0c0NvdW50VGV4dD17aW5kRm9ybWF0KFxuICAgICAgICAgICAgXCJWaXNpdHNfQ3JlYXRlX1NlbGVjdGVkQ29udGFjdHNDb3VudFwiLFxuICAgICAgICAgICAgXCJ7MH0gc2VsZWN0ZWQgY29udGFjdChzKVwiLFxuICAgICAgICAgICAgc2VsZWN0ZWRDb250YWN0cy5sZW5ndGhcbiAgICAgICAgICApfVxuICAgICAgICAvPlxuICAgICAgKX1cblxyXG4gICAgICB7c3RlcCA9PT0gMiAmJiAoXG4gICAgICAgIDxDcmVhdGVTdGVwVmlzaXREZXRhaWxzXG4gICAgICAgICAgdGl0bGU9e2luZFQoXCJWaXNpdHNfQ3JlYXRlX1Zpc2l0RGF0YV9UaXRsZVwiLCBcIlZpc2l0IGRldGFpbHNcIil9XG4gICAgICAgICAgZGF0ZUxhYmVsPXtpbmRUKFwiVmlzaXRzX0RldGFpbF9EYXRlX0xhYmVsXCIsIFwiRGF0ZVwiKX1cbiAgICAgICAgICB0cmFuc0RhdGU9e3RyYW5zRGF0ZX1cbiAgICAgICAgICBvblRyYW5zRGF0ZUNoYW5nZT17c2V0VHJhbnNEYXRlfVxuICAgICAgICAgIHZpc2l0VHlwZUxhYmVsPXtpbmRUKFwiVmlzaXRzX0RldGFpbF9WaXNpdFR5cGVfTGFiZWxcIiwgXCJWaXNpdCB0eXBlXCIpfVxuICAgICAgICAgIHZpc2l0VHlwZXM9e3Zpc2l0VHlwZXN9XG4gICAgICAgICAgdmlzaXRUeXBlPXt2aXNpdFR5cGV9XG4gICAgICAgICAgb25WaXNpdFR5cGVDaGFuZ2U9e3NldFZpc2l0VHlwZX1cbiAgICAgICAgICB2aXNpdFR5cGVQbGFjZWhvbGRlcj17aW5kVChcIlZpc2l0c19EZXRhaWxfVmlzaXRUeXBlX1BsYWNlaG9sZGVyXCIsIFwiU2VsZWN0IHR5cGVcIil9XG4gICAgICAgICAgdmlzaXRUeXBlSW52YWxpZD17dmlzaXRUeXBlSW52YWxpZH1cbiAgICAgICAgICBkZXNjcmlwdGlvbkxhYmVsPXtkZXNjcmlwdGlvbkxhYmVsfVxuICAgICAgICAgIGRlc2NyaXB0aW9uVmFsdWU9e2Rlc2NyaXB0aW9ufVxuICAgICAgICAgIGRlc2NyaXB0aW9uQ2xhc3NOYW1lPXtkZXNjcmlwdGlvbklucHV0Q2xhc3NOYW1lfVxuICAgICAgICAgIG9uRGVzY3JpcHRpb25DaGFuZ2U9e3NldERlc2NyaXB0aW9ufVxuICAgICAgICAgIHRhcEZpZWxkcz17W1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBpZDogXCJjb21lbnRhcmlvc1wiLFxuICAgICAgICAgICAgICBsYWJlbDogY29tbWVudHNMYWJlbCxcbiAgICAgICAgICAgICAgdmFsdWU6IGNvbWVudGFyaW9zLFxuICAgICAgICAgICAgICBjbGFzc05hbWU6IGNvbWVudGFyaW9zQ2xhc3NOYW1lLFxuICAgICAgICAgICAgICBwb2ludGVyQmluZGluZ3M6IGNvbWVudGFyaW9zVGFwLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgaWQ6IFwiYW50ZWNlZGVudGVzXCIsXG4gICAgICAgICAgICAgIGxhYmVsOiBiYWNrZ3JvdW5kTGFiZWwsXG4gICAgICAgICAgICAgIHZhbHVlOiBhbnRlY2VkZW50ZXMsXG4gICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJmb3JtLWNvbnRyb2wgY3Vyc29yLXBvaW50ZXJcIixcbiAgICAgICAgICAgICAgcG9pbnRlckJpbmRpbmdzOiBhbnRlY2VkZW50ZXNUYXAsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBpZDogXCJjb25jbHVzaW9uZXNcIixcbiAgICAgICAgICAgICAgbGFiZWw6IGNvbmNsdXNpb25zTGFiZWwsXG4gICAgICAgICAgICAgIHZhbHVlOiBjb25jbHVzaW9uZXMsXG4gICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJmb3JtLWNvbnRyb2wgY3Vyc29yLXBvaW50ZXJcIixcbiAgICAgICAgICAgICAgcG9pbnRlckJpbmRpbmdzOiBjb25jbHVzaW9uZXNUYXAsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF19XG4gICAgICAgICAgc3RhdHVzPXtzdGF0dXN9XG4gICAgICAgIC8+XG4gICAgICApfVxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn1cblxuLy8gQ3JlYXRlIGZsb3cgVUkgd3JhcHBlZCBieSB0aGUgZXJyb3IgYm91bmRhcnkuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDcmVhdGVGb3JtKCkge1xuICByZXR1cm4gKFxuICAgIDxBcHBFcnJvckJvdW5kYXJ5IGZhbGxiYWNrTWVzc2FnZT17aW5kVChcIlZpc2l0c19DcmVhdGVfRXJyb3JCb3VuZGFyeVwiLCBcIkFuIGVycm9yIG9jY3VycmVkIHdoaWxlIHJlbmRlcmluZyB0aGUgdmlzaXRzIHBhZ2UuIFJlbG9hZCBhbmQgdHJ5IGFnYWluLlwiKX0+XG4gICAgICA8VmlzaXRhc0FwcCAvPlxuICAgIDwvQXBwRXJyb3JCb3VuZGFyeT5cbiAgKTtcbn1cbiIsICJpbXBvcnQgeyB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuXG5leHBvcnQgY29uc3QgdXNlVG9wYmFyID0gKFxuICBzdGVwOiBudW1iZXIsXG4gIGNhbkdvTmV4dDogYm9vbGVhbixcbiAgb25OZXh0OiAoKSA9PiB2b2lkLFxuICBvblByZXY6ICgpID0+IHZvaWQsXG4gIGJ1c3kgPSBmYWxzZSxcbiAgY2FuU3VibWl0U3RlcDIgPSB0cnVlLFxuICBjYW5BY2Nlc3MgPSB0cnVlXG4pID0+IHtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBmb3J3YXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnbG9iYWxGb3J3YXJkQnRuXCIpIGFzIEhUTUxCdXR0b25FbGVtZW50IHwgbnVsbDtcbiAgICBjb25zdCBiYWNrID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnbG9iYWxCYWNrQnRuXCIpIGFzIEhUTUxCdXR0b25FbGVtZW50IHwgbnVsbDtcbiAgICBjb25zdCBmb3J3YXJkSWNvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2xvYmFsRm9yd2FyZEljb25cIik7XG4gICAgY29uc3QgY3JlYXRlSWNvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2xvYmFsQ3JlYXRlSWNvblwiKTtcblxuICAgIGlmIChmb3J3YXJkKSB7XG4gICAgICBjb25zdCBpc1N0ZXAyID0gc3RlcCA9PT0gMjtcbiAgICAgIGNvbnN0IHNob3dGb3J3YXJkID0gY2FuQWNjZXNzICYmIChpc1N0ZXAyIHx8IChzdGVwID09PSAxICYmIGNhbkdvTmV4dCkpO1xuICAgICAgZm9yd2FyZC5zdHlsZS52aXNpYmlsaXR5ID0gc2hvd0ZvcndhcmQgPyBcInZpc2libGVcIiA6IFwiaGlkZGVuXCI7XG4gICAgICBmb3J3YXJkLmRpc2FibGVkID0gIXNob3dGb3J3YXJkIHx8IGJ1c3k7XG4gICAgICBmb3J3YXJkLm9uY2xpY2sgPSBzaG93Rm9yd2FyZCA/ICgpID0+IG9uTmV4dCgpIDogbnVsbDtcbiAgICAgIGZvcndhcmQuc2V0QXR0cmlidXRlKFxuICAgICAgICBcImFyaWEtbGFiZWxcIixcbiAgICAgICAgaXNTdGVwMiA/IGluZFQoXCJDb21tb25fQ3JlYXRlXCIsIFwiQ3JlYXRlXCIpIDogaW5kVChcIkNvbW1vbl9OZXh0XCIsIFwiTmV4dFwiKVxuICAgICAgKTtcbiAgICAgIGZvcndhcmQuc2V0QXR0cmlidXRlKFwiYXJpYS1kaXNhYmxlZFwiLCBpc1N0ZXAyICYmICFjYW5TdWJtaXRTdGVwMiA/IFwidHJ1ZVwiIDogXCJmYWxzZVwiKTtcbiAgICAgIGZvcndhcmQuY2xhc3NMaXN0LnRvZ2dsZShcIm9wYWNpdHktNTBcIiwgaXNTdGVwMiAmJiAhY2FuU3VibWl0U3RlcDIpO1xuICAgICAgZm9yd2FyZC5jbGFzc0xpc3QudG9nZ2xlKFwiY3Vyc29yLW5vdC1hbGxvd2VkXCIsIGlzU3RlcDIgJiYgIWNhblN1Ym1pdFN0ZXAyKTtcblxuICAgICAgaWYgKGZvcndhcmRJY29uICYmIGNyZWF0ZUljb24pIHtcbiAgICAgICAgaWYgKGlzU3RlcDIpIHtcbiAgICAgICAgICBmb3J3YXJkSWNvbi5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgICAgIGNyZWF0ZUljb24uY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmb3J3YXJkSWNvbi5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICAgICAgICAgIGNyZWF0ZUljb24uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoYmFjaykge1xuICAgICAgY29uc3Qgc2hvd0JhY2sgPSBjYW5BY2Nlc3MgJiYgc3RlcCA9PT0gMjtcbiAgICAgIGJhY2suc3R5bGUudmlzaWJpbGl0eSA9IHNob3dCYWNrID8gXCJ2aXNpYmxlXCIgOiBcImhpZGRlblwiO1xuICAgICAgYmFjay5kaXNhYmxlZCA9ICFzaG93QmFjayB8fCBidXN5O1xuICAgICAgYmFjay5vbmNsaWNrID0gc2hvd0JhY2sgPyAoKSA9PiBvblByZXYoKSA6IG51bGw7XG4gICAgfVxuICB9LCBbc3RlcCwgY2FuR29OZXh0LCBvbk5leHQsIG9uUHJldiwgYnVzeSwgY2FuU3VibWl0U3RlcDIsIGNhbkFjY2Vzc10pO1xufTtcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHNob3dHbG9iYWxTcGlubmVyLCBoaWRlR2xvYmFsU3Bpbm5lciB9IGZyb20gXCIuLi91dGlscy9nbG9iYWxTcGlubmVyLnRzXCI7XG5pbXBvcnQge1xuICBDUkVBVEVfRlJFU0hfUEFSQU0sXG4gIFZJU0lUX0RSQUZUX0tFWSxcbiAgQ09OVEFDVFNfU1RPUkFHRV9LRVksXG4gIENPTlRBQ1RTX1NFTEVDVElPTl9LRVksXG4gIGNsZWFyQ3JlYXRlU2VsZWN0aW9uQ2FjaGUsXG4gIHN0cmlwRnJlc2hQYXJhbSxcbn0gZnJvbSBcIi4uL3V0aWxzL3Zpc2l0YXNTdG9yYWdlLnRzXCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB7IGdldFNlc3Npb25Kc29uV2l0aEV4cGlyeSwgZ2V0U2Vzc2lvblZhbHVlV2l0aEV4cGlyeSwgc2V0U2Vzc2lvbkpzb25XaXRoRXhwaXJ5IH0gZnJvbSBcIi4uL3V0aWxzL3Nlc3Npb25FeHBpcnkudHNcIjtcblxuY29uc3QgQ1JFQVRFX0RSQUZUX1RUTF9NUyA9IDI0ICogNjAgKiA2MCAqIDEwMDA7XG5cbnR5cGUgRHJhZnRTbmFwc2hvdCA9IHtcbiAgc2VsZWN0ZWRDbGllbnQ6IGFueTtcbiAgc2VsZWN0ZWRDb250YWN0czogYW55W107XG4gIHZpc2l0VHlwZTogc3RyaW5nO1xuICB0cmFuc0RhdGU6IHN0cmluZztcbiAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgY29tZW50YXJpb3M6IHN0cmluZztcbiAgYW50ZWNlZGVudGVzOiBzdHJpbmc7XG4gIGNvbmNsdXNpb25lczogc3RyaW5nO1xuICBzdGVwOiBudW1iZXI7XG59O1xuXG50eXBlIFVzZUNyZWF0ZURyYWZ0QXJncyA9IHtcbiAgZHJhZnRTbmFwc2hvdDogRHJhZnRTbmFwc2hvdDtcbiAgc2V0U2VsZWN0ZWRDbGllbnQ6ICh2YWx1ZTogYW55KSA9PiB2b2lkO1xuICBzZXRTZWxlY3RlZENvbnRhY3RzOiAodmFsdWU6IGFueVtdKSA9PiB2b2lkO1xuICBzZXRWaXNpdFR5cGU6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBzZXRUcmFuc0RhdGU6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBzZXREZXNjcmlwdGlvbjogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHNldENvbWVudGFyaW9zOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgc2V0QW50ZWNlZGVudGVzOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgc2V0Q29uY2x1c2lvbmVzOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgc2V0U3RlcDogKHZhbHVlOiBudW1iZXIpID0+IHZvaWQ7XG59O1xuXG4vLyBIYW5kbGVzIHZpc2l0LWNyZWF0ZSBkcmFmdCBzYXZlL3Jlc3RvcmUgbGlmZWN5Y2xlLlxuZXhwb3J0IGNvbnN0IHVzZUNyZWF0ZURyYWZ0ID0gKHtcbiAgZHJhZnRTbmFwc2hvdCxcbiAgc2V0U2VsZWN0ZWRDbGllbnQsXG4gIHNldFNlbGVjdGVkQ29udGFjdHMsXG4gIHNldFZpc2l0VHlwZSxcbiAgc2V0VHJhbnNEYXRlLFxuICBzZXREZXNjcmlwdGlvbixcbiAgc2V0Q29tZW50YXJpb3MsXG4gIHNldEFudGVjZWRlbnRlcyxcbiAgc2V0Q29uY2x1c2lvbmVzLFxuICBzZXRTdGVwLFxufTogVXNlQ3JlYXRlRHJhZnRBcmdzKSA9PiB7XG4gIGNvbnN0IGRyYWZ0UmVzdG9yZWRSZWYgPSB1c2VSZWYoZmFsc2UpO1xuICBjb25zdCBkcmFmdFBlcnNpc3RUaW1lclJlZiA9IHVzZVJlZjxudW1iZXIgfCBudWxsPihudWxsKTtcblxuICBjb25zdCBwZXJzaXN0RHJhZnRTbmFwc2hvdCA9IHVzZUNhbGxiYWNrKChkcmFmdDogRHJhZnRTbmFwc2hvdCkgPT4ge1xuICAgIHNldFNlc3Npb25Kc29uV2l0aEV4cGlyeShWSVNJVF9EUkFGVF9LRVksIGRyYWZ0LCBDUkVBVEVfRFJBRlRfVFRMX01TKTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IHBlcnNpc3REcmFmdE5vdyA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBwZXJzaXN0RHJhZnRTbmFwc2hvdChkcmFmdFNuYXBzaG90KTtcbiAgfSwgW2RyYWZ0U25hcHNob3QsIHBlcnNpc3REcmFmdFNuYXBzaG90XSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWRyYWZ0UmVzdG9yZWRSZWYuY3VycmVudCkgcmV0dXJuO1xuXG4gICAgaWYgKGRyYWZ0UGVyc2lzdFRpbWVyUmVmLmN1cnJlbnQpIHtcbiAgICAgIGNsZWFyVGltZW91dChkcmFmdFBlcnNpc3RUaW1lclJlZi5jdXJyZW50KTtcbiAgICB9XG5cbiAgICBkcmFmdFBlcnNpc3RUaW1lclJlZi5jdXJyZW50ID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgZHJhZnRQZXJzaXN0VGltZXJSZWYuY3VycmVudCA9IG51bGw7XG4gICAgICBwZXJzaXN0RHJhZnRTbmFwc2hvdChkcmFmdFNuYXBzaG90KTtcbiAgICB9LCAxODApO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGlmIChkcmFmdFBlcnNpc3RUaW1lclJlZi5jdXJyZW50KSB7XG4gICAgICAgIGNsZWFyVGltZW91dChkcmFmdFBlcnNpc3RUaW1lclJlZi5jdXJyZW50KTtcbiAgICAgICAgZHJhZnRQZXJzaXN0VGltZXJSZWYuY3VycmVudCA9IG51bGw7XG4gICAgICB9XG4gICAgfTtcbiAgfSwgW2RyYWZ0U25hcHNob3QsIHBlcnNpc3REcmFmdFNuYXBzaG90XSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBsZXQgZnJlc2hMb2FkID0gZmFsc2U7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHVybCA9IG5ldyBVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xuICAgICAgZnJlc2hMb2FkID0gdXJsLnNlYXJjaFBhcmFtcy5oYXMoQ1JFQVRFX0ZSRVNIX1BBUkFNKTtcbiAgICB9IGNhdGNoIHtcbiAgICAgIGZyZXNoTG9hZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChmcmVzaExvYWQpIHtcbiAgICAgIGNsZWFyQ3JlYXRlU2VsZWN0aW9uQ2FjaGUoKTtcbiAgICAgIHN0cmlwRnJlc2hQYXJhbSgpO1xuICAgICAgZHJhZnRSZXN0b3JlZFJlZi5jdXJyZW50ID0gdHJ1ZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgc2hvdWxkU2hvdyA9IGZhbHNlO1xuICAgIHRyeSB7XG4gICAgICBzaG91bGRTaG93ID0gISEoXG4gICAgICAgIGdldFNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoVklTSVRfRFJBRlRfS0VZKSB8fFxuICAgICAgICBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKENPTlRBQ1RTX1NUT1JBR0VfS0VZKSB8fFxuICAgICAgICBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKENPTlRBQ1RTX1NFTEVDVElPTl9LRVkpXG4gICAgICApO1xuICAgIH0gY2F0Y2gge1xuICAgICAgLy8gSWdub3JlIHN0b3JhZ2UgYWNjZXNzIGVycm9ycy5cbiAgICB9XG4gICAgaWYgKHNob3VsZFNob3cpIHtcbiAgICAgIHNob3dHbG9iYWxTcGlubmVyKGluZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIikpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgY29uc3QgZHJhZnQgPSBnZXRTZXNzaW9uSnNvbldpdGhFeHBpcnk8RHJhZnRTbmFwc2hvdD4oVklTSVRfRFJBRlRfS0VZKTtcbiAgICAgIGlmIChkcmFmdD8uc2VsZWN0ZWRDbGllbnQ/LnZhbHVlKSBzZXRTZWxlY3RlZENsaWVudChkcmFmdC5zZWxlY3RlZENsaWVudCk7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShkcmFmdD8uc2VsZWN0ZWRDb250YWN0cykpIHNldFNlbGVjdGVkQ29udGFjdHMoZHJhZnQuc2VsZWN0ZWRDb250YWN0cyk7XG4gICAgICBpZiAoZHJhZnQ/LnZpc2l0VHlwZSAhPT0gdW5kZWZpbmVkKSBzZXRWaXNpdFR5cGUoZHJhZnQudmlzaXRUeXBlKTtcbiAgICAgIGlmIChkcmFmdD8udHJhbnNEYXRlKSBzZXRUcmFuc0RhdGUoZHJhZnQudHJhbnNEYXRlKTtcbiAgICAgIGlmIChkcmFmdD8uZGVzY3JpcHRpb24gIT09IHVuZGVmaW5lZCkgc2V0RGVzY3JpcHRpb24oZHJhZnQuZGVzY3JpcHRpb24pO1xuICAgICAgaWYgKGRyYWZ0Py5jb21lbnRhcmlvcyAhPT0gdW5kZWZpbmVkKSBzZXRDb21lbnRhcmlvcyhkcmFmdC5jb21lbnRhcmlvcyk7XG4gICAgICBpZiAoZHJhZnQ/LmFudGVjZWRlbnRlcyAhPT0gdW5kZWZpbmVkKSBzZXRBbnRlY2VkZW50ZXMoZHJhZnQuYW50ZWNlZGVudGVzKTtcbiAgICAgIGlmIChkcmFmdD8uY29uY2x1c2lvbmVzICE9PSB1bmRlZmluZWQpIHNldENvbmNsdXNpb25lcyhkcmFmdC5jb25jbHVzaW9uZXMpO1xuICAgICAgaWYgKGRyYWZ0Py5zdGVwID09PSAyKSBzZXRTdGVwKDIpO1xuICAgIH0gY2F0Y2gge1xuICAgICAgLy8gSWdub3JlIG1hbGZvcm1lZCBkcmFmdCBwYXlsb2Fkcy5cbiAgICB9IGZpbmFsbHkge1xuICAgICAgaWYgKHNob3VsZFNob3cpIHtcbiAgICAgICAgaGlkZUdsb2JhbFNwaW5uZXIoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZHJhZnRSZXN0b3JlZFJlZi5jdXJyZW50ID0gdHJ1ZTtcbiAgfSwgW1xuICAgIHNldEFudGVjZWRlbnRlcyxcbiAgICBzZXRDb21lbnRhcmlvcyxcbiAgICBzZXRDb25jbHVzaW9uZXMsXG4gICAgc2V0RGVzY3JpcHRpb24sXG4gICAgc2V0U2VsZWN0ZWRDbGllbnQsXG4gICAgc2V0U2VsZWN0ZWRDb250YWN0cyxcbiAgICBzZXRTdGVwLFxuICAgIHNldFRyYW5zRGF0ZSxcbiAgICBzZXRWaXNpdFR5cGUsXG4gIF0pO1xuXG4gIHJldHVybiB7XG4gICAgcGVyc2lzdERyYWZ0Tm93LFxuICB9O1xufTtcbiIsICJleHBvcnQgY29uc3Qgc2hvd0dsb2JhbFNwaW5uZXIgPSAobWVzc2FnZT86IHN0cmluZykgPT4ge1xuICB0cnkge1xuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiB3aW5kb3cuX19pbmRTaG93R2xvYmFsU3Bpbm5lciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICB3aW5kb3cuX19pbmRTaG93R2xvYmFsU3Bpbm5lcihtZXNzYWdlKTtcbiAgICB9XG4gIH0gY2F0Y2gge1xuICAgIC8vIGlnbm9yZVxuICB9XG59O1xuXG5leHBvcnQgY29uc3QgaGlkZUdsb2JhbFNwaW5uZXIgPSAoKSA9PiB7XG4gIHRyeSB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIHdpbmRvdy5fX2luZEhpZGVHbG9iYWxTcGlubmVyID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIHdpbmRvdy5fX2luZEhpZGVHbG9iYWxTcGlubmVyKCk7XG4gICAgfVxuICB9IGNhdGNoIHtcbiAgICAvLyBpZ25vcmVcbiAgfVxufTtcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjayB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgZmV0Y2hKc29uIH0gZnJvbSBcIi4uL3NlcnZpY2VzL2FwaVNlcnZpY2UudHNcIjtcbmltcG9ydCB7IGluZEV4dHJhY3RJZCwgaW5kRXh0cmFjdFNpZ25lZElkIH0gZnJvbSBcIi4uL3V0aWxzL2luZElkcy50c1wiO1xuaW1wb3J0IHsgaW5kRm9ybWF0LCBpbmRUIH0gZnJvbSBcIi4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB7IHNob3dQZXJtaXNzaW9uTW9kYWwgfSBmcm9tIFwiLi4vdXRpbHMvcGVybWlzc2lvbnMudHNcIjtcbmltcG9ydCB7IGZsYXNoQWN0aW9uTWFyaywgc2V0SGlzdG9yeUZpbHRlckZvckRhdGUgfSBmcm9tIFwiLi4vdXRpbHMvdmlzaXRhc0hpc3RvcnkudHNcIjtcbmltcG9ydCB7IFZJU0lUX0RSQUZUX0tFWSB9IGZyb20gXCIuLi91dGlscy92aXNpdGFzU3RvcmFnZS50c1wiO1xuaW1wb3J0IHsgd2FpdCB9IGZyb20gXCIuLi91dGlscy93YWl0LnRzXCI7XG5cbnR5cGUgQ29udGFjdE9wdGlvbiA9IHtcbiAgdmFsdWU6IHN0cmluZztcbiAgdGV4dDogc3RyaW5nO1xufTtcblxudHlwZSBVc2VDcmVhdGVTdWJtaXRBcmdzID0ge1xuICBidXN5OiBib29sZWFuO1xuICBtb2RhbE9wZW46IGJvb2xlYW47XG4gIGNhbkNyZWF0ZVZpc2l0OiBib29sZWFuO1xuICBjYW5Sb2xsYmFja0RlbGV0ZTogYm9vbGVhbjtcbiAgc2VsZWN0ZWRDbGllbnQ6IHsgdmFsdWU6IHN0cmluZyB9IHwgbnVsbDtcbiAgc2VsZWN0ZWRDb250YWN0czogQ29udGFjdE9wdGlvbltdO1xuICB2aXNpdFR5cGU6IHN0cmluZztcbiAgZGVmYXVsdEFzaXN0ZW50ZVRpcG86IHN0cmluZztcbiAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgdHJhbnNEYXRlOiBzdHJpbmc7XG4gIGNvbWVudGFyaW9zOiBzdHJpbmc7XG4gIGFudGVjZWRlbnRlczogc3RyaW5nO1xuICBjb25jbHVzaW9uZXM6IHN0cmluZztcbiAgc2V0QnVzeTogKHZhbHVlOiBib29sZWFuKSA9PiB2b2lkO1xuICBzZXRTdGF0dXM6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBzZXRNb2RhbEVycm9yOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgc2V0U2hvd1JlcXVpcmVkOiAodmFsdWU6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIG9wZW5Db25maXJtOiAob3B0czoge1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgbWVzc2FnZTogc3RyaW5nO1xuICAgIGNvbmZpcm1UZXh0Pzogc3RyaW5nO1xuICAgIG9uQ29uZmlybT86ICgpID0+IFByb21pc2U8Ym9vbGVhbiB8IHZvaWQ+IHwgYm9vbGVhbiB8IHZvaWQ7XG4gIH0pID0+IHZvaWQ7XG4gIGNsb3NlQ29uZmlybTogKCkgPT4gdm9pZDtcbn07XG5cbi8vIE93bnMgY3JlYXRlL2NvbmZpcm0gZmxvdyBzbyBmb3JtIGNvbXBvbmVudCBzdGF5cyBmb2N1c2VkIG9uIFVJIGZpZWxkcy5cbmV4cG9ydCBjb25zdCB1c2VDcmVhdGVTdWJtaXQgPSAoe1xuICBidXN5LFxuICBtb2RhbE9wZW4sXG4gIGNhbkNyZWF0ZVZpc2l0LFxuICBjYW5Sb2xsYmFja0RlbGV0ZSxcbiAgc2VsZWN0ZWRDbGllbnQsXG4gIHNlbGVjdGVkQ29udGFjdHMsXG4gIHZpc2l0VHlwZSxcbiAgZGVmYXVsdEFzaXN0ZW50ZVRpcG8sXG4gIGRlc2NyaXB0aW9uLFxuICB0cmFuc0RhdGUsXG4gIGNvbWVudGFyaW9zLFxuICBhbnRlY2VkZW50ZXMsXG4gIGNvbmNsdXNpb25lcyxcbiAgc2V0QnVzeSxcbiAgc2V0U3RhdHVzLFxuICBzZXRNb2RhbEVycm9yLFxuICBzZXRTaG93UmVxdWlyZWQsXG4gIG9wZW5Db25maXJtLFxuICBjbG9zZUNvbmZpcm0sXG59OiBVc2VDcmVhdGVTdWJtaXRBcmdzKSA9PiB7XG4gIGNvbnN0IGRvQ3JlYXRlID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xuICAgIGlmIChidXN5KSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKCFjYW5DcmVhdGVWaXNpdCkge1xuICAgICAgc2hvd1Blcm1pc3Npb25Nb2RhbCgpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xuICAgIGlmICghc2VsZWN0ZWRDbGllbnQpIHtcbiAgICAgIHNldFN0YXR1cyhpbmRUKFwiVmlzaXRzX0NyZWF0ZV9TZWxlY3RDbGllbnRSZXF1aXJlZFwiLCBcIlNlbGVjdCBhIGNsaWVudC5cIikpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoU3RyaW5nKHZpc2l0VHlwZSB8fCBcIlwiKSA9PT0gXCJcIiB8fCBTdHJpbmcodmlzaXRUeXBlKSA9PT0gXCIwXCIgfHwgIWRlc2NyaXB0aW9uLnRyaW0oKSB8fCAhY29tZW50YXJpb3MudHJpbSgpKSB7XG4gICAgICBzZXRTaG93UmVxdWlyZWQodHJ1ZSk7XG4gICAgICBzZXRTdGF0dXMoaW5kVChcIlZpc2l0c19DcmVhdGVfQ29tcGxldGVSZXF1aXJlZFwiLCBcIkNvbXBsZXRlIHJlcXVpcmVkIGZpZWxkcy5cIikpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBzZXRCdXN5KHRydWUpO1xuICAgIHNldFN0YXR1cyhpbmRUKFwiVmlzaXRzX0NyZWF0ZV9DcmVhdGluZ0FjdGl2aXR5XCIsIFwiQ3JlYXRpbmcgYWN0aXZpdHkuLi5cIikpO1xuXG4gICAgbGV0IGNyZWF0ZWRSZWNJZCA9IFwiXCI7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHBheWxvYWRBY3Rpdml0eSA9IHtcbiAgICAgICAgYWNjb3VudE51bTogc2VsZWN0ZWRDbGllbnQudmFsdWUsXG4gICAgICAgIHZpc2l0VHlwZSxcbiAgICAgICAgZGVzY3JpcHRpb24sXG4gICAgICAgIHRyYW5zRGF0ZSxcbiAgICAgICAgY29tZW50YXJpb3MsXG4gICAgICAgIGFudGVjZWRlbnRlcyxcbiAgICAgICAgY29uY2x1c2lvbmVzLFxuICAgICAgfTtcblxuICAgICAgY29uc3QgcmVzQWN0ID0gYXdhaXQgZmV0Y2hKc29uKFwiL1Zpc2l0YXMvQ3JlYXRlQWN0aXZpdHlcIiwge1xuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHBheWxvYWRBY3Rpdml0eSksXG4gICAgICB9KTtcblxuICAgICAgaWYgKCFyZXNBY3Quc3VjY2VzcykgdGhyb3cgbmV3IEVycm9yKHJlc0FjdC5tZXNzYWdlIHx8IGluZFQoXCJWaXNpdHNfQ3JlYXRlX0NyZWF0ZUFjdGl2aXR5RmFpbGVkXCIsIFwiRmFpbGVkIHRvIGNyZWF0ZSBhY3Rpdml0eS5cIikpO1xuXG4gICAgICBjb25zdCByZWNJZEFjdGl2aWRhZCA9XG4gICAgICAgIGluZEV4dHJhY3RTaWduZWRJZChyZXNBY3QuZGF0YSkgfHxcbiAgICAgICAgaW5kRXh0cmFjdFNpZ25lZElkKHJlc0FjdC5tZXNzYWdlKSB8fFxuICAgICAgICBpbmRFeHRyYWN0U2lnbmVkSWQoaW5kRXh0cmFjdElkKHJlc0FjdC5kYXRhKSB8fCBpbmRFeHRyYWN0SWQocmVzQWN0Lm1lc3NhZ2UpKTtcbiAgICAgIGlmICghcmVjSWRBY3RpdmlkYWQpIHRocm93IG5ldyBFcnJvcihpbmRUKFwiVmlzaXRzX0NyZWF0ZV9DcmVhdGVBY3Rpdml0eUZhaWxlZFwiLCBcIkZhaWxlZCB0byBjcmVhdGUgYWN0aXZpdHkuXCIpKTtcbiAgICAgIGNyZWF0ZWRSZWNJZCA9IFN0cmluZyhyZWNJZEFjdGl2aWRhZCk7XG5cbiAgICAgIGlmIChzZWxlY3RlZENvbnRhY3RzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29uc3QgYXNzaXN0YW50QmF0Y2hTaXplID0gNDtcbiAgICAgICAgY29uc3QgY3JlYXRlQXNzaXN0YW50ID0gYXN5bmMgKGNvbnRhY3Q6IENvbnRhY3RPcHRpb24pID0+IHtcbiAgICAgICAgICBjb25zdCBwYXlsb2FkVmlzaXRhID0ge1xuICAgICAgICAgICAgcmVmUmVjSWRBY3RpdmlkYWQ6IHJlY0lkQWN0aXZpZGFkLFxuICAgICAgICAgICAgYXNpc3RlbnRlVGlwbzogZGVmYXVsdEFzaXN0ZW50ZVRpcG8sXG4gICAgICAgICAgICBhc2lzdGVudGVJZDogY29udGFjdC50ZXh0LFxuICAgICAgICAgICAgY29udGFjdG9SZWNJZDogY29udGFjdC52YWx1ZSxcbiAgICAgICAgICB9O1xuICAgICAgICAgIGNvbnN0IHJlc1ZpcyA9IGF3YWl0IGZldGNoSnNvbihcIi9WaXNpdGFzL0NyZWF0ZVZpc2l0YUFzaXN0ZW50ZVwiLCB7XG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGF5bG9hZFZpc2l0YSksXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgaWYgKCFyZXNWaXMuc3VjY2Vzcykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHJlc1Zpcy5tZXNzYWdlIHx8IGluZFQoXCJWaXNpdHNfQ3JlYXRlX0NyZWF0ZVZpc2l0RmFpbGVkXCIsIFwiRmFpbGVkIHRvIGNyZWF0ZSB2aXNpdC5cIikpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBmb3IgKGxldCBpZHggPSAwOyBpZHggPCBzZWxlY3RlZENvbnRhY3RzLmxlbmd0aDsgaWR4ICs9IGFzc2lzdGFudEJhdGNoU2l6ZSkge1xuICAgICAgICAgIGNvbnN0IGJhdGNoID0gc2VsZWN0ZWRDb250YWN0cy5zbGljZShpZHgsIGlkeCArIGFzc2lzdGFudEJhdGNoU2l6ZSk7XG4gICAgICAgICAgY29uc3QgZmlyc3QgPSBiYXRjaFswXTtcbiAgICAgICAgICBpZiAoZmlyc3QpIHtcbiAgICAgICAgICAgIHNldFN0YXR1cyhpbmRGb3JtYXQoXCJWaXNpdHNfQ3JlYXRlX0NyZWF0aW5nVmlzaXRGb3JcIiwgXCJDcmVhdGluZyB2aXNpdCBmb3IgezB9Li4uXCIsIGZpcnN0LnRleHQpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoYmF0Y2gubWFwKChjb250YWN0KSA9PiBjcmVhdGVBc3Npc3RhbnQoY29udGFjdCkpKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0cnkge1xuICAgICAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKFZJU0lUX0RSQUZUX0tFWSk7XG4gICAgICB9IGNhdGNoIHtcbiAgICAgICAgLy8gSWdub3JlIHN0b3JhZ2UgZXJyb3JzLlxuICAgICAgfVxuXG4gICAgICBzZXRIaXN0b3J5RmlsdGVyRm9yRGF0ZSh0cmFuc0RhdGUsIHRydWUpO1xuICAgICAgY2xvc2VDb25maXJtKCk7XG4gICAgICBhd2FpdCB3YWl0KDIwMCk7XG4gICAgICBmbGFzaEFjdGlvbk1hcmsoXCJva1Byb2Nlc3NcIiwgMTIwMCk7XG4gICAgICBhd2FpdCB3YWl0KDEyMDApO1xuICAgICAgd2luZG93Ll9faW5kQnlwYXNzTmF2aWdhdGlvbkd1YXJkT25jZT8uKCk7XG4gICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL0hpc3RvcmlhbC9IaXN0b3J5XCI7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGNhdGNoIChlOiBhbnkpIHtcbiAgICAgIGlmIChjcmVhdGVkUmVjSWQgJiYgY2FuUm9sbGJhY2tEZWxldGUpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBzZXRTdGF0dXMoaW5kVChcIlZpc2l0c19DcmVhdGVfUm9sbGJhY2tcIiwgXCJSb2xsaW5nIGJhY2sgYWN0aXZpdHkuLi5cIikpO1xuICAgICAgICAgIGF3YWl0IGZldGNoSnNvbihgL1Zpc2l0YXMvRGVsZXRlQWN0aXZpdHkvJHtlbmNvZGVVUklDb21wb25lbnQoY3JlYXRlZFJlY0lkKX1gLCB7XG4gICAgICAgICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXG4gICAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgLy8gS2VlcCBvcmlnaW5hbCBlcnJvciBmbG93LlxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjb25zdCBtc2cgPSBlPy5tZXNzYWdlIHx8IGluZFQoXCJWaXNpdHNfQ3JlYXRlX0NyZWF0ZVZpc2l0RXJyb3JcIiwgXCJGYWlsZWQgdG8gY3JlYXRlIHRoZSB2aXNpdC5cIik7XG4gICAgICBzZXRNb2RhbEVycm9yKG1zZyk7XG4gICAgICBzZXRTdGF0dXMobXNnKTtcbiAgICAgIGZsYXNoQWN0aW9uTWFyayhcImVycm9yUHJvY2Vzc1wiLCAxNTAwKTtcbiAgICAgIHNldEJ1c3koZmFsc2UpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSwgW1xuICAgIGFudGVjZWRlbnRlcyxcbiAgICBidXN5LFxuICAgIGNhbkNyZWF0ZVZpc2l0LFxuICAgIGNhblJvbGxiYWNrRGVsZXRlLFxuICAgIGNsb3NlQ29uZmlybSxcbiAgICBjb21lbnRhcmlvcyxcbiAgICBjb25jbHVzaW9uZXMsXG4gICAgZGVmYXVsdEFzaXN0ZW50ZVRpcG8sXG4gICAgZGVzY3JpcHRpb24sXG4gICAgc2VsZWN0ZWRDbGllbnQsXG4gICAgc2VsZWN0ZWRDb250YWN0cyxcbiAgICBzZXRCdXN5LFxuICAgIHNldE1vZGFsRXJyb3IsXG4gICAgc2V0U2hvd1JlcXVpcmVkLFxuICAgIHNldFN0YXR1cyxcbiAgICB0cmFuc0RhdGUsXG4gICAgdmlzaXRUeXBlLFxuICBdKTtcblxuICBjb25zdCBoYW5kbGVTdWJtaXQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKGJ1c3kpIHJldHVybjtcbiAgICBpZiAoIWNhbkNyZWF0ZVZpc2l0KSB7XG4gICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChtb2RhbE9wZW4pIHJldHVybjtcbiAgICBpZiAoIXNlbGVjdGVkQ2xpZW50KSB7XG4gICAgICBzZXRTdGF0dXMoaW5kVChcIlZpc2l0c19DcmVhdGVfU2VsZWN0Q2xpZW50UmVxdWlyZWRcIiwgXCJTZWxlY3QgYSBjbGllbnQuXCIpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKFN0cmluZyh2aXNpdFR5cGUgfHwgXCJcIikgPT09IFwiXCIgfHwgU3RyaW5nKHZpc2l0VHlwZSkgPT09IFwiMFwiIHx8ICFkZXNjcmlwdGlvbi50cmltKCkgfHwgIWNvbWVudGFyaW9zLnRyaW0oKSkge1xuICAgICAgc2V0U2hvd1JlcXVpcmVkKHRydWUpO1xuICAgICAgc2V0U3RhdHVzKGluZFQoXCJWaXNpdHNfQ3JlYXRlX0NvbXBsZXRlUmVxdWlyZWRcIiwgXCJDb21wbGV0ZSByZXF1aXJlZCBmaWVsZHMuXCIpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgc2V0TW9kYWxFcnJvcihcIlwiKTtcbiAgICBvcGVuQ29uZmlybSh7XG4gICAgICB0aXRsZTogaW5kVChcIlZpc2l0c19DcmVhdGVfQ29uZmlybUNyZWF0ZV9UaXRsZVwiLCBcIkNvbmZpcm0gY3JlYXRlXCIpLFxuICAgICAgbWVzc2FnZTogaW5kVChcIlZpc2l0c19DcmVhdGVfQ29uZmlybUNyZWF0ZV9Cb2R5XCIsIFwiRG8geW91IHdhbnQgdG8gY3JlYXRlIHRoaXMgdmlzaXQ/XCIpLFxuICAgICAgY29uZmlybVRleHQ6IGluZFQoXCJDb25maXJtX1llc1wiLCBcIk9LXCIpLFxuICAgICAgb25Db25maXJtOiBkb0NyZWF0ZSxcbiAgICB9KTtcbiAgfSwgW1xuICAgIGJ1c3ksXG4gICAgY2FuQ3JlYXRlVmlzaXQsXG4gICAgY29tZW50YXJpb3MsXG4gICAgZGVzY3JpcHRpb24sXG4gICAgZG9DcmVhdGUsXG4gICAgbW9kYWxPcGVuLFxuICAgIG9wZW5Db25maXJtLFxuICAgIHNlbGVjdGVkQ2xpZW50LFxuICAgIHNldE1vZGFsRXJyb3IsXG4gICAgc2V0U2hvd1JlcXVpcmVkLFxuICAgIHNldFN0YXR1cyxcbiAgICB2aXNpdFR5cGUsXG4gIF0pO1xuXG4gIHJldHVybiB7XG4gICAgZG9DcmVhdGUsXG4gICAgaGFuZGxlU3VibWl0LFxuICB9O1xufTtcbiIsICJleHBvcnQgY29uc3QgaW5kRXh0cmFjdElkID0gKHZhbHVlOiB1bmtub3duKTogc3RyaW5nID0+IHtcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHJldHVybiBcIlwiO1xuICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiIHx8IHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIikgcmV0dXJuIFN0cmluZyh2YWx1ZSkudHJpbSgpO1xuICBpZiAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiKSB7XG4gICAgY29uc3QgY2FuZGlkYXRlID1cbiAgICAgICh2YWx1ZSBhcyBhbnkpLnJlY0lkID8/XG4gICAgICAodmFsdWUgYXMgYW55KS5SZWNJZCA/P1xuICAgICAgKHZhbHVlIGFzIGFueSkuaWQgPz9cbiAgICAgICh2YWx1ZSBhcyBhbnkpLklkID8/XG4gICAgICAodmFsdWUgYXMgYW55KS52YWx1ZSA/P1xuICAgICAgKHZhbHVlIGFzIGFueSkuVmFsdWU7XG4gICAgaWYgKHR5cGVvZiBjYW5kaWRhdGUgPT09IFwic3RyaW5nXCIgfHwgdHlwZW9mIGNhbmRpZGF0ZSA9PT0gXCJudW1iZXJcIikgcmV0dXJuIFN0cmluZyhjYW5kaWRhdGUpLnRyaW0oKTtcbiAgfVxuICByZXR1cm4gXCJcIjtcbn07XG5cbmV4cG9ydCBjb25zdCBpbmRFeHRyYWN0TnVtZXJpY0lkID0gKHZhbHVlOiB1bmtub3duLCBkZXB0aCA9IDApOiBzdHJpbmcgPT4ge1xuICBpZiAoZGVwdGggPiAzKSByZXR1cm4gXCJcIjtcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHJldHVybiBcIlwiO1xuICBpZiAodHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiICYmIE51bWJlci5pc0Zpbml0ZSh2YWx1ZSkpIHJldHVybiBTdHJpbmcoTWF0aC50cnVuYyh2YWx1ZSkpO1xuICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XG4gICAgY29uc3QgcmF3ID0gdmFsdWUudHJpbSgpO1xuICAgIGlmICghcmF3KSByZXR1cm4gXCJcIjtcbiAgICBpZiAoL15cXGQrJC8udGVzdChyYXcpKSByZXR1cm4gcmF3O1xuICAgIGNvbnN0IG0gPSByYXcubWF0Y2goLyhcXGR7Myx9KS8pO1xuICAgIHJldHVybiBtID8gbVsxXSA6IFwiXCI7XG4gIH1cbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJvYmplY3RcIikgcmV0dXJuIFwiXCI7XG4gIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgIGZvciAoY29uc3QgaXRlbSBvZiB2YWx1ZSkge1xuICAgICAgY29uc3QgZm91bmQgPSBpbmRFeHRyYWN0TnVtZXJpY0lkKGl0ZW0sIGRlcHRoICsgMSk7XG4gICAgICBpZiAoZm91bmQpIHJldHVybiBmb3VuZDtcbiAgICB9XG4gICAgcmV0dXJuIFwiXCI7XG4gIH1cblxuICBjb25zdCBrZXlzID0gW1xuICAgIFwicmVjSWRcIixcbiAgICBcIlJlY0lkXCIsXG4gICAgXCJyZWZSZWNJZEFjdGl2aWRhZFwiLFxuICAgIFwiUmVmUmVjSWRBY3RpdmlkYWRcIixcbiAgICBcImFjdGl2aWRhZFJlY0lkXCIsXG4gICAgXCJBY3RpdmlkYWRSZWNJZFwiLFxuICAgIFwiaWRcIixcbiAgICBcIklkXCIsXG4gICAgXCJ2YWx1ZVwiLFxuICAgIFwiVmFsdWVcIixcbiAgICBcInJlc3VsdFwiLFxuICAgIFwiUmVzdWx0XCIsXG4gICAgXCJkYXRhXCIsXG4gICAgXCJEYXRhXCIsXG4gICAgXCJtZXNzYWdlXCIsXG4gICAgXCJNZXNzYWdlXCIsXG4gIF07XG5cbiAgZm9yIChjb25zdCBrIG9mIGtleXMpIHtcbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCBrKSkge1xuICAgICAgY29uc3QgZm91bmQgPSBpbmRFeHRyYWN0TnVtZXJpY0lkKCh2YWx1ZSBhcyBhbnkpW2tdLCBkZXB0aCArIDEpO1xuICAgICAgaWYgKGZvdW5kKSByZXR1cm4gZm91bmQ7XG4gICAgfVxuICB9XG5cbiAgZm9yIChjb25zdCB2IG9mIE9iamVjdC52YWx1ZXModmFsdWUgYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj4pKSB7XG4gICAgY29uc3QgZm91bmQgPSBpbmRFeHRyYWN0TnVtZXJpY0lkKHYsIGRlcHRoICsgMSk7XG4gICAgaWYgKGZvdW5kKSByZXR1cm4gZm91bmQ7XG4gIH1cblxuICByZXR1cm4gXCJcIjtcbn07XG5cbmV4cG9ydCBjb25zdCBpbmRFeHRyYWN0U2lnbmVkSWQgPSAodmFsdWU6IHVua25vd24sIGRlcHRoID0gMCk6IHN0cmluZyA9PiB7XG4gIGlmIChkZXB0aCA+IDMpIHJldHVybiBcIlwiO1xuICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkgcmV0dXJuIFwiXCI7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCIgJiYgTnVtYmVyLmlzRmluaXRlKHZhbHVlKSkgcmV0dXJuIFN0cmluZyhNYXRoLnRydW5jKHZhbHVlKSk7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpIHtcbiAgICBjb25zdCByYXcgPSB2YWx1ZS50cmltKCk7XG4gICAgaWYgKCFyYXcpIHJldHVybiBcIlwiO1xuICAgIGNvbnN0IG1hdGNoID0gcmF3Lm1hdGNoKC8tP1xcZHszLH0vKTtcbiAgICByZXR1cm4gbWF0Y2ggPyBtYXRjaFswXSA6IFwiXCI7XG4gIH1cbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJvYmplY3RcIikgcmV0dXJuIFwiXCI7XG4gIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgIGZvciAoY29uc3QgaXRlbSBvZiB2YWx1ZSkge1xuICAgICAgY29uc3QgZm91bmQgPSBpbmRFeHRyYWN0U2lnbmVkSWQoaXRlbSwgZGVwdGggKyAxKTtcbiAgICAgIGlmIChmb3VuZCkgcmV0dXJuIGZvdW5kO1xuICAgIH1cbiAgICByZXR1cm4gXCJcIjtcbiAgfVxuXG4gIGNvbnN0IGtleXMgPSBbXG4gICAgXCJyZWNJZFwiLFxuICAgIFwiUmVjSWRcIixcbiAgICBcInJlZlJlY0lkQWN0aXZpZGFkXCIsXG4gICAgXCJSZWZSZWNJZEFjdGl2aWRhZFwiLFxuICAgIFwiYWN0aXZpZGFkUmVjSWRcIixcbiAgICBcIkFjdGl2aWRhZFJlY0lkXCIsXG4gICAgXCJtZXNzYWdlXCIsXG4gICAgXCJNZXNzYWdlXCIsXG4gICAgXCJyZXN1bHRcIixcbiAgICBcIlJlc3VsdFwiLFxuICAgIFwiZGF0YVwiLFxuICAgIFwiRGF0YVwiLFxuICBdO1xuXG4gIGZvciAoY29uc3QgayBvZiBrZXlzKSB7XG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgaykpIHtcbiAgICAgIGNvbnN0IGZvdW5kID0gaW5kRXh0cmFjdFNpZ25lZElkKCh2YWx1ZSBhcyBhbnkpW2tdLCBkZXB0aCArIDEpO1xuICAgICAgaWYgKGZvdW5kKSByZXR1cm4gZm91bmQ7XG4gICAgfVxuICB9XG5cbiAgZm9yIChjb25zdCB2IG9mIE9iamVjdC52YWx1ZXModmFsdWUgYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj4pKSB7XG4gICAgY29uc3QgZm91bmQgPSBpbmRFeHRyYWN0U2lnbmVkSWQodiwgZGVwdGggKyAxKTtcbiAgICBpZiAoZm91bmQpIHJldHVybiBmb3VuZDtcbiAgfVxuXG4gIHJldHVybiBcIlwiO1xufTtcbiIsICJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VJZCwgdXNlTWVtbywgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgWE1hcmtJY29uIH0gZnJvbSBcIkBoZXJvaWNvbnMvcmVhY3QvMjAvc29saWRcIjtcbmltcG9ydCBGbG9hdGluZ0xpc3QgZnJvbSBcIi4uL2NvbW1vbnMvRmxvYXRpbmdMaXN0LnRzeFwiO1xuaW1wb3J0IFNwaW5uZXIgZnJvbSBcIi4uL2NvbW1vbnMvU3Bpbm5lci50c3hcIjtcbmltcG9ydCB7IENoZXZyb25Eb3duU3ZnLCBDaGV2cm9uVXBTdmcgfSBmcm9tIFwiLi4vY29tbW9ucy9jaGV2cm9ucy50c3hcIjtcbmltcG9ydCB7IGZldGNoSnNvbiB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XG5pbXBvcnQgeyBoYW5kbGVDb21ib2JveEtleURvd24gfSBmcm9tIFwiLi4vLi4vaG9va3MvdXNlQ29tYm9ib3hLZXlib2FyZC50c1wiO1xuaW1wb3J0IHsgdXNlT3V0c2lkZUNsaWNrIH0gZnJvbSBcIi4uLy4uL2hvb2tzL3VzZU91dHNpZGVDbGljay50c1wiO1xuaW1wb3J0IHsgY2xhc3NOYW1lcyB9IGZyb20gXCIuLi8uLi91dGlscy9jbGFzc05hbWVzLnRzXCI7XG5pbXBvcnQgeyBpbmRGb3JtYXQsIGluZFQgfSBmcm9tIFwiLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuaW1wb3J0IHsgaXNOb0RhdGFSb3csIGlzTm9EYXRhVGV4dCB9IGZyb20gXCIuLi8uLi91dGlscy9ub0RhdGEudHNcIjtcbmltcG9ydCB7IGdldENhY2hlZENvbnRhY3RzLCBzZXRDYWNoZWRDb250YWN0cywgZ2V0U3RvcmVkU2VsZWN0aW9uLCBzZXRTdG9yZWRTZWxlY3Rpb24sIGNsZWFyU3RvcmVkU2VsZWN0aW9uIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Zpc2l0YXNTdG9yYWdlLnRzXCI7XG5cbnR5cGUgQ29udGFjdE9wdGlvbiA9IHtcbiAgdmFsdWU6IHN0cmluZztcbiAgdGV4dDogc3RyaW5nO1xuICBjYXJnbzogc3RyaW5nO1xuICBlbXByZXNhOiBzdHJpbmc7XG59O1xuXG50eXBlIENvbnRhY3RzQ29tYm9ib3hQcm9wcyA9IHtcbiAgYWNjb3VudE51bT86IHN0cmluZztcbiAgdmFsdWU/OiBDb250YWN0T3B0aW9uW107XG4gIG9uQ2hhbmdlOiAodmFsdWU6IENvbnRhY3RPcHRpb25bXSkgPT4gdm9pZDtcbiAgcG9ydGFsQ2xhc3NOYW1lPzogc3RyaW5nO1xuICBwYW5lbENsYXNzTmFtZT86IHN0cmluZztcbn07XG5cbi8vIE11bHRpLXNlbGVjdCBjb250YWN0cyBjb21ib2JveCB0aWVkIHRvIHRoZSBzZWxlY3RlZCBjbGllbnQuXG5jb25zdCBDb250YWN0c0NvbWJvYm94ID0gKHsgYWNjb3VudE51bSwgdmFsdWUgPSBbXSwgb25DaGFuZ2UsIHBvcnRhbENsYXNzTmFtZSwgcGFuZWxDbGFzc05hbWUgfTogQ29udGFjdHNDb21ib2JveFByb3BzKSA9PiB7XG4gIGNvbnN0IFtxdWVyeSwgc2V0UXVlcnldID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtvcHRpb25zLCBzZXRPcHRpb25zXSA9IHVzZVN0YXRlPENvbnRhY3RPcHRpb25bXT4oW10pO1xuICBjb25zdCBbc2VsZWN0ZWQsIHNldFNlbGVjdGVkXSA9IHVzZVN0YXRlPENvbnRhY3RPcHRpb25bXT4odmFsdWUpO1xuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtsb2FkaW5nTW9yZSwgc2V0TG9hZGluZ01vcmVdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbc3RhdHVzLCBzZXRTdGF0dXNdID0gdXNlU3RhdGUoaW5kVChcIlZpc2l0c19DcmVhdGVfU2VsZWN0Q2xpZW50Rmlyc3RcIiwgXCJTZWxlY3QgYSBjbGllbnQgZmlyc3QuXCIpKTtcbiAgY29uc3QgW2hhc0xvYWRlZCwgc2V0SGFzTG9hZGVkXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW29wZW4sIHNldE9wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbcGFnZSwgc2V0UGFnZV0gPSB1c2VTdGF0ZSgxKTtcbiAgY29uc3QgW2hhc01vcmUsIHNldEhhc01vcmVdID0gdXNlU3RhdGUodHJ1ZSk7XG4gIGNvbnN0IFtibG9ja2luZywgc2V0QmxvY2tpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbYWN0aXZlSW5kZXgsIHNldEFjdGl2ZUluZGV4XSA9IHVzZVN0YXRlKDApO1xuICBjb25zdCBsaXN0UmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IGJveFJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBhYm9ydFJlZiA9IHVzZVJlZjxBYm9ydENvbnRyb2xsZXIgfCBudWxsPihudWxsKTtcbiAgY29uc3QgY29udGFpbmVyUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IGlucHV0UmVmID0gdXNlUmVmPEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgbGFzdEFjY291bnRSZWYgPSB1c2VSZWYoYWNjb3VudE51bSB8fCBcIlwiKTtcbiAgY29uc3Qgb25DaGFuZ2VSZWYgPSB1c2VSZWYob25DaGFuZ2UpO1xuICBjb25zdCBpZEJhc2UgPSB1c2VJZCgpO1xuICBjb25zdCBpbnB1dElkID0gYCR7aWRCYXNlfS1jb250YWN0cy1pbnB1dGA7XG4gIGNvbnN0IGxpc3RJZCA9IGAke2lkQmFzZX0tY29udGFjdHMtb3B0aW9uc2A7XG5cbiAgdXNlT3V0c2lkZUNsaWNrKFtjb250YWluZXJSZWYsIGxpc3RSZWZdLCAoKSA9PiBzZXRPcGVuKGZhbHNlKSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBvbkNoYW5nZVJlZi5jdXJyZW50ID0gb25DaGFuZ2U7XG4gIH0sIFtvbkNoYW5nZV0pO1xuXG4gIGNvbnN0IGlzU2FtZVNlbGVjdGlvbiA9IChhOiBDb250YWN0T3B0aW9uW10gPSBbXSwgYjogQ29udGFjdE9wdGlvbltdID0gW10pID0+IHtcbiAgICBpZiAoYS5sZW5ndGggIT09IGIubGVuZ3RoKSByZXR1cm4gZmFsc2U7XG4gICAgY29uc3QgYXMgPSBhLm1hcCgoeCkgPT4gU3RyaW5nKHgudmFsdWUpKS5zb3J0KCk7XG4gICAgY29uc3QgYnMgPSBiLm1hcCgoeCkgPT4gU3RyaW5nKHgudmFsdWUpKS5zb3J0KCk7XG4gICAgcmV0dXJuIGFzLmV2ZXJ5KCh2LCBpKSA9PiB2ID09PSBic1tpXSk7XG4gIH07XG5cbiAgLy8gU3luYyBpbnRlcm5hbCBzZWxlY3Rpb24gd2l0aCB0aGUgcHJvcCAoZHJhZnQvY2FjaGUgcmVzdG9yZSkuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFpc1NhbWVTZWxlY3Rpb24odmFsdWUgfHwgW10sIHNlbGVjdGVkKSkge1xuICAgICAgc2V0U2VsZWN0ZWQodmFsdWUgfHwgW10pO1xuICAgIH1cbiAgfSwgW3ZhbHVlXSk7XG5cbiAgY29uc3QgY2FuY2VsUGVuZGluZyA9ICgpID0+IHtcbiAgICBpZiAoYWJvcnRSZWYuY3VycmVudCkge1xuICAgICAgYWJvcnRSZWYuY3VycmVudC5hYm9ydCgpO1xuICAgICAgYWJvcnRSZWYuY3VycmVudCA9IG51bGw7XG4gICAgfVxuICB9O1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGlmIChhYm9ydFJlZi5jdXJyZW50KSB7XG4gICAgICAgIGFib3J0UmVmLmN1cnJlbnQuYWJvcnQoKTtcbiAgICAgICAgYWJvcnRSZWYuY3VycmVudCA9IG51bGw7XG4gICAgICB9XG4gICAgfTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IHByaW1lRnJvbUNhY2hlID0gKCkgPT4ge1xuICAgIGNvbnN0IGNhY2hlZCA9IGdldENhY2hlZENvbnRhY3RzKGFjY291bnROdW0pIGFzIENvbnRhY3RPcHRpb25bXSB8IG51bGw7XG4gICAgaWYgKGNhY2hlZCkge1xuICAgICAgc2V0T3B0aW9ucyhjYWNoZWQpO1xuICAgICAgc2V0SGFzTG9hZGVkKHRydWUpO1xuICAgICAgc2V0SGFzTW9yZShjYWNoZWQubGVuZ3RoID09PSAxMCk7XG4gICAgICBzZXRTdGF0dXMoXG4gICAgICAgIGNhY2hlZC5sZW5ndGhcbiAgICAgICAgICA/IGluZEZvcm1hdChcIlZpc2l0c19DcmVhdGVfQ29udGFjdENvdW50Q2FjaGVcIiwgXCJ7MH0gY29udGFjdHMgKGNhY2hlKVwiLCBjYWNoZWQubGVuZ3RoKVxuICAgICAgICAgIDogaW5kVChcIlZpc2l0c19DcmVhdGVfTm9Db250YWN0c1wiLCBcIk5vIGNvbnRhY3RzXCIpXG4gICAgICApO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNhbmNlbFBlbmRpbmcoKTtcbiAgICBzZXRRdWVyeShcIlwiKTtcbiAgICBzZXRPcGVuKGZhbHNlKTtcbiAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICBzZXRCbG9ja2luZyhmYWxzZSk7XG4gICAgc2V0TG9hZGluZ01vcmUoZmFsc2UpO1xuICAgIHNldEFjdGl2ZUluZGV4KDApO1xuICAgIHNldFBhZ2UoMSk7XG4gICAgc2V0SGFzTW9yZSh0cnVlKTtcblxuICAgIGlmICghYWNjb3VudE51bSkge1xuICAgICAgc2V0T3B0aW9ucyhbXSk7XG4gICAgICBzZXRTZWxlY3RlZChbXSk7XG4gICAgICBvbkNoYW5nZVJlZi5jdXJyZW50KFtdKTtcbiAgICAgIHNldFN0YXR1cyhpbmRUKFwiVmlzaXRzX0NyZWF0ZV9TZWxlY3RDbGllbnRGaXJzdFwiLCBcIlNlbGVjdCBhIGNsaWVudCBmaXJzdC5cIikpO1xuICAgICAgc2V0SGFzTG9hZGVkKGZhbHNlKTtcbiAgICAgIGNsZWFyU3RvcmVkU2VsZWN0aW9uKGxhc3RBY2NvdW50UmVmLmN1cnJlbnQpO1xuICAgICAgbGFzdEFjY291bnRSZWYuY3VycmVudCA9IFwiXCI7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgY2hhbmdlZCA9IGxhc3RBY2NvdW50UmVmLmN1cnJlbnQgJiYgbGFzdEFjY291bnRSZWYuY3VycmVudCAhPT0gYWNjb3VudE51bTtcbiAgICBpZiAoY2hhbmdlZCkge1xuICAgICAgc2V0U2VsZWN0ZWQoW10pO1xuICAgICAgb25DaGFuZ2VSZWYuY3VycmVudChbXSk7XG4gICAgICBjbGVhclN0b3JlZFNlbGVjdGlvbihsYXN0QWNjb3VudFJlZi5jdXJyZW50KTtcbiAgICB9XG5cbiAgICBjb25zdCB1c2VkQ2FjaGUgPSBwcmltZUZyb21DYWNoZSgpO1xuICAgIGlmICghdXNlZENhY2hlKSB7XG4gICAgICBzZXRPcHRpb25zKFtdKTtcbiAgICAgIHNldEhhc0xvYWRlZChmYWxzZSk7XG4gICAgICBzZXRTdGF0dXMoaW5kVChcIlZpc2l0c19DcmVhdGVfUHJlc3NBcnJvd1RvTG9hZENvbnRhY3RzXCIsIFwiUHJlc3MgQXJyb3dEb3duIHRvIGxvYWQgY29udGFjdHMuXCIpKTtcbiAgICB9XG5cbiAgICBjb25zdCBzdG9yZWRTZWxlY3Rpb24gPSBnZXRTdG9yZWRTZWxlY3Rpb24oYWNjb3VudE51bSkgYXMgQ29udGFjdE9wdGlvbltdO1xuICAgIGlmIChzdG9yZWRTZWxlY3Rpb24ubGVuZ3RoICYmICF2YWx1ZT8ubGVuZ3RoKSB7XG4gICAgICBzZXRTZWxlY3RlZChzdG9yZWRTZWxlY3Rpb24pO1xuICAgICAgb25DaGFuZ2VSZWYuY3VycmVudChzdG9yZWRTZWxlY3Rpb24pO1xuICAgIH1cblxuICAgIGxhc3RBY2NvdW50UmVmLmN1cnJlbnQgPSBhY2NvdW50TnVtO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC1ob29rcy9leGhhdXN0aXZlLWRlcHNcbiAgfSwgW2FjY291bnROdW1dKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIG9uQ2hhbmdlUmVmLmN1cnJlbnQoc2VsZWN0ZWQpO1xuICAgIGlmIChhY2NvdW50TnVtKSBzZXRTdG9yZWRTZWxlY3Rpb24oYWNjb3VudE51bSwgc2VsZWN0ZWQpO1xuICB9LCBbc2VsZWN0ZWQsIGFjY291bnROdW1dKTtcblxuICBjb25zdCBtYXBDb250YWN0cyA9IChpdGVtczogdW5rbm93bltdID0gW10pID0+XG4gICAgaXRlbXNcbiAgICAgIC5tYXAoKGM6IGFueSkgPT4ge1xuICAgICAgICBpZiAoaXNOb0RhdGFSb3coYykpIHJldHVybiBudWxsO1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShjKSkgcmV0dXJuIG51bGw7XG4gICAgICAgIGNvbnN0IHJlY0lkID0gKGMucmVjSWQgfHwgYy5SZWNJZCB8fCBcIlwiKS50b1N0cmluZygpLnRyaW0oKTtcbiAgICAgICAgY29uc3QgbmFtZSA9IChjLm5hbWUgfHwgYy5OYW1lIHx8IFwiXCIpLnRvU3RyaW5nKCkudHJpbSgpO1xuICAgICAgICBjb25zdCBjYXJnbyA9IChjLmNhcmdvIHx8IGMuQ2FyZ28gfHwgXCJcIikudG9TdHJpbmcoKS50cmltKCk7XG4gICAgICAgIGNvbnN0IGVtcHJlc2EgPSAoYy5lbXByZXNhIHx8IGMuRW1wcmVzYSB8fCBcIlwiKS50b1N0cmluZygpLnRyaW0oKTtcbiAgICAgICAgaWYgKCFyZWNJZCB8fCBpc05vRGF0YVRleHQobmFtZSkpIHJldHVybiBudWxsO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHZhbHVlOiByZWNJZCxcbiAgICAgICAgICB0ZXh0OiBuYW1lLnRvVXBwZXJDYXNlKCksXG4gICAgICAgICAgY2FyZ286IGNhcmdvLnRvVXBwZXJDYXNlKCksXG4gICAgICAgICAgZW1wcmVzYTogZW1wcmVzYS50b1VwcGVyQ2FzZSgpLFxuICAgICAgICB9IGFzIENvbnRhY3RPcHRpb247XG4gICAgICB9KVxuICAgICAgLmZpbHRlcihCb29sZWFuKSBhcyBDb250YWN0T3B0aW9uW107XG5cbiAgY29uc3QgbG9hZCA9IGFzeW5jIChwYWdlVG9Mb2FkID0gMSwgYXBwZW5kID0gZmFsc2UpID0+IHtcbiAgICBpZiAoIWFjY291bnROdW0pIHJldHVybjtcbiAgICBpZiAobG9hZGluZyB8fCBsb2FkaW5nTW9yZSkgcmV0dXJuO1xuICAgIGNhbmNlbFBlbmRpbmcoKTtcblxuICAgIGlmICghYXBwZW5kKSB7XG4gICAgICBzZXRMb2FkaW5nKHRydWUpO1xuICAgICAgc2V0QmxvY2tpbmcodHJ1ZSk7XG4gICAgICBpZiAocGFnZVRvTG9hZCA9PT0gMSkgc2V0U3RhdHVzKGluZFQoXCJWaXNpdHNfQ3JlYXRlX0xvYWRpbmdDb250YWN0c1wiLCBcIkxvYWRpbmcgY29udGFjdHMuLi5cIikpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZXRMb2FkaW5nTW9yZSh0cnVlKTtcbiAgICAgIHNldEJsb2NraW5nKHRydWUpO1xuICAgIH1cblxuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XG4gICAgYWJvcnRSZWYuY3VycmVudCA9IGNvbnRyb2xsZXI7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoSnNvbihcbiAgICAgICAgYC9WaXNpdGFzL0dldENvbnRhY3RzRm9yRHJvcGRvd24/YWNjb3VudE51bT0ke2VuY29kZVVSSUNvbXBvbmVudChhY2NvdW50TnVtKX0mcGFnZT0ke3BhZ2VUb0xvYWR9JnBhZ2VTaXplPTEwYCxcbiAgICAgICAgeyBzaWduYWw6IGNvbnRyb2xsZXIuc2lnbmFsIH1cbiAgICAgICk7XG4gICAgICBjb25zdCBtYXBwZWQgPSBtYXBDb250YWN0cyhyZXMuaXRlbXMgfHwgW10pO1xuICAgICAgc2V0T3B0aW9ucygocHJldikgPT4ge1xuICAgICAgICBjb25zdCBuZXh0ID0gYXBwZW5kID8gWy4uLnByZXYsIC4uLm1hcHBlZF0gOiBtYXBwZWQ7XG4gICAgICAgIHNldENhY2hlZENvbnRhY3RzKGFjY291bnROdW0sIG5leHQpO1xuICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgIH0pO1xuICAgICAgc2V0SGFzTG9hZGVkKHRydWUpO1xuICAgICAgc2V0SGFzTW9yZShtYXBwZWQubGVuZ3RoID09PSAxMCk7XG4gICAgICBzZXRQYWdlKHBhZ2VUb0xvYWQpO1xuICAgICAgc2V0U3RhdHVzKG1hcHBlZC5sZW5ndGggPyBpbmRGb3JtYXQoXCJWaXNpdHNfQ3JlYXRlX0NvbnRhY3RDb3VudFwiLCBcInswfSBjb250YWN0c1wiLCBtYXBwZWQubGVuZ3RoKSA6IGluZFQoXCJWaXNpdHNfQ3JlYXRlX05vQ29udGFjdHNcIiwgXCJObyBjb250YWN0c1wiKSk7XG4gICAgfSBjYXRjaCB7XG4gICAgICBzZXRTdGF0dXMoaW5kVChcIlZpc2l0c19DcmVhdGVfTG9hZENvbnRhY3RzRXJyb3JcIiwgXCJGYWlsZWQgdG8gbG9hZCBjb250YWN0cy5cIikpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBhYm9ydFJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgICAgc2V0TG9hZGluZ01vcmUoZmFsc2UpO1xuICAgICAgc2V0QmxvY2tpbmcoZmFsc2UpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBlbnN1cmVMb2FkZWQgPSAoKSA9PiB7XG4gICAgaWYgKCFhY2NvdW50TnVtKSByZXR1cm47XG4gICAgaWYgKGhhc0xvYWRlZCAmJiBvcHRpb25zLmxlbmd0aCkgcmV0dXJuO1xuICAgIGlmIChwcmltZUZyb21DYWNoZSgpKSByZXR1cm47XG4gICAgbG9hZCgxLCBmYWxzZSk7XG4gIH07XG5cbiAgY29uc3QgbG9hZE1vcmVDb250YWN0cyA9IFJlYWN0LnVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoIWFjY291bnROdW0gfHwgIWhhc01vcmUgfHwgbG9hZGluZ01vcmUgfHwgbG9hZGluZykgcmV0dXJuO1xuICAgIGxvYWQocGFnZSArIDEsIHRydWUpO1xuICB9LCBbYWNjb3VudE51bSwgaGFzTW9yZSwgbG9hZGluZ01vcmUsIGxvYWRpbmcsIHBhZ2VdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghb3BlbiB8fCAhbGlzdFJlZi5jdXJyZW50KSByZXR1cm47XG4gICAgY29uc3QgZWwgPSBsaXN0UmVmLmN1cnJlbnQ7XG4gICAgY29uc3Qgb25TY3JvbGwgPSAoKSA9PiB7XG4gICAgICBpZiAoZWwuc2Nyb2xsVG9wICsgZWwuY2xpZW50SGVpZ2h0ID49IGVsLnNjcm9sbEhlaWdodCAtIDgpIGxvYWRNb3JlQ29udGFjdHMoKTtcbiAgICB9O1xuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgb25TY3JvbGwsIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcbiAgICByZXR1cm4gKCkgPT4gZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBvblNjcm9sbCk7XG4gIH0sIFtvcGVuLCBsb2FkTW9yZUNvbnRhY3RzXSk7XG5cbiAgY29uc3Qgc2VsZWN0ZWRWYWx1ZXMgPSB1c2VNZW1vKCgpID0+IHtcbiAgICByZXR1cm4gbmV3IFNldCgoc2VsZWN0ZWQgfHwgW10pLm1hcCgocykgPT4gU3RyaW5nKHMudmFsdWUpKSk7XG4gIH0sIFtzZWxlY3RlZF0pO1xuXG4gIGNvbnN0IGF2YWlsYWJsZU9wdGlvbnMgPSB1c2VNZW1vKCgpID0+IHtcbiAgICAvLyBIaWRlIGFscmVhZHkgc2VsZWN0ZWQgY29udGFjdHMgZnJvbSB0aGUgZHJvcGRvd24gbGlzdC5cbiAgICByZXR1cm4gKG9wdGlvbnMgfHwgW10pLmZpbHRlcigobykgPT4gIXNlbGVjdGVkVmFsdWVzLmhhcyhTdHJpbmcoby52YWx1ZSkpKTtcbiAgfSwgW29wdGlvbnMsIHNlbGVjdGVkVmFsdWVzXSk7XG5cbiAgY29uc3QgZmlsdGVyZWQgPSB1c2VNZW1vKCgpID0+IHtcbiAgICBjb25zdCBxID0gcXVlcnkudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKCFxKSByZXR1cm4gYXZhaWxhYmxlT3B0aW9ucztcbiAgICBjb25zdCBmID0gYXZhaWxhYmxlT3B0aW9ucy5maWx0ZXIoXG4gICAgICAobykgPT4gby50ZXh0LnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMocSkgfHwgby5jYXJnby50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHEpIHx8IG8uZW1wcmVzYS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHEpXG4gICAgKTtcbiAgICByZXR1cm4gZi5sZW5ndGggPyBmIDogYXZhaWxhYmxlT3B0aW9ucztcbiAgfSwgW2F2YWlsYWJsZU9wdGlvbnMsIHF1ZXJ5XSk7XG4gIGNvbnN0IGFjdGl2ZUlkID0gb3BlbiAmJiBmaWx0ZXJlZFthY3RpdmVJbmRleF0gPyBgJHtpZEJhc2V9LWNvbnRhY3Qtb3B0LSR7ZmlsdGVyZWRbYWN0aXZlSW5kZXhdLnZhbHVlfWAgOiB1bmRlZmluZWQ7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBzZXRBY3RpdmVJbmRleCgwKTtcbiAgfSwgW2ZpbHRlcmVkLmxlbmd0aCwgcXVlcnldKTtcblxuICBjb25zdCB0b2dnbGVPcHRpb24gPSAob3B0OiBDb250YWN0T3B0aW9uKSA9PiB7XG4gICAgc2V0U2VsZWN0ZWQoKHByZXYpID0+IHtcbiAgICAgIGNvbnN0IGV4aXN0cyA9IHByZXYuc29tZSgocCkgPT4gcC52YWx1ZSA9PT0gb3B0LnZhbHVlKTtcbiAgICAgIGlmIChleGlzdHMpIHJldHVybiBwcmV2LmZpbHRlcigocCkgPT4gcC52YWx1ZSAhPT0gb3B0LnZhbHVlKTtcbiAgICAgIHJldHVybiBbLi4ucHJldiwgb3B0XTtcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVLZXlEb3duID0gKGV2OiBSZWFjdC5LZXlib2FyZEV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+KSA9PiB7XG4gICAgaGFuZGxlQ29tYm9ib3hLZXlEb3duKGV2LCB7XG4gICAgICBpc09wZW46IG9wZW4sXG4gICAgICBzZXRPcGVuLFxuICAgICAgb3B0aW9uQ291bnQ6IGZpbHRlcmVkLmxlbmd0aCxcbiAgICAgIHNldEFjdGl2ZUluZGV4LFxuICAgICAgb3Blbk9uQXJyb3c6IHRydWUsXG4gICAgICBvbkFycm93TmF2aWdhdGU6IGVuc3VyZUxvYWRlZCxcbiAgICAgIG9uRW50ZXJXaGVuT3BlbjogKCkgPT4ge1xuICAgICAgICB0b2dnbGVPcHRpb24oZmlsdGVyZWRbYWN0aXZlSW5kZXhdID8/IGZpbHRlcmVkWzBdKTtcbiAgICAgIH0sXG4gICAgICBvbkVudGVyV2hlbkNsb3NlZDogYWNjb3VudE51bVxuICAgICAgICA/ICgpID0+IHtcbiAgICAgICAgICAgIGVuc3VyZUxvYWRlZCgpO1xuICAgICAgICAgICAgc2V0T3Blbih0cnVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIDogdW5kZWZpbmVkLFxuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIiByZWY9e2NvbnRhaW5lclJlZn0+XG4gICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZm9ybS1sYWJlbCBmb250LXNlbWlib2xkXCIgaHRtbEZvcj17aW5wdXRJZH0+XG4gICAgICAgIHtpbmRUKFwiVmlzaXRzX0NyZWF0ZV9TZWFyY2hDb250YWN0XCIsIFwiU2VhcmNoIGNvbnRhY3RcIil9XG4gICAgICA8L2xhYmVsPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZVwiPlxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIHJlZj17Ym94UmVmfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwicmVsYXRpdmUgdy1mdWxsIGN1cnNvci1kZWZhdWx0IHJvdW5kZWQtWzVweF0gYm9yZGVyLXNsYXRlLTMwMCBiZy13aGl0ZSB0ZXh0LWxlZnQgc2hhZG93LXhzIGZvY3VzLXdpdGhpbjpib3JkZXItcHJpbWFyeSBmb2N1cy13aXRoaW46cmluZy0yIGZvY3VzLXdpdGhpbjpyaW5nLXByaW1hcnkgZm9jdXMtd2l0aGluOnJpbmctb2Zmc2V0LTAgc206dGV4dC1zbVwiXG4gICAgICAgICAgPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAgZ2FwLTEgcHgtMyBweS0yIG1pbi1oLTEwXCI+XG4gICAgICAgICAgICB7c2VsZWN0ZWQubWFwKChjKSA9PiAoXG4gICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAga2V5PXtjLnZhbHVlfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHJvdW5kZWQtbWQgYmctcHJpbWFyeS8xMCB0ZXh0LXNsYXRlLTcwMCBweC0yIHB5LTEgdGV4dC14c1wiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7Yy50ZXh0fVxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0U2VsZWN0ZWQoKHByZXYpID0+IHByZXYuZmlsdGVyKChzKSA9PiBzLnZhbHVlICE9PSBjLnZhbHVlKSl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTcwMCBob3Zlcjp0ZXh0LXNsYXRlLTcwMC84MFwiXG4gICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtpbmRUKFwiQ29tbW9uX0RlbGV0ZVwiLCBcIkRlbGV0ZVwiKX1cbiAgICAgICAgICAgICAgICAgIHRpdGxlPXtpbmRUKFwiQ29tbW9uX0RlbGV0ZVwiLCBcIkRlbGV0ZVwiKX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8WE1hcmtJY29uIGNsYXNzTmFtZT1cImgtNCB3LTRcIiBhcmlhLWhpZGRlbj1cInRydWVcIiAvPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICBpZD17aW5wdXRJZH1cbiAgICAgICAgICAgICAgbmFtZT17YCR7aWRCYXNlfS1jb250YWN0cy1xdWVyeWB9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXgtMSBtaW4tdy0zMCBiZy10cmFuc3BhcmVudCB0ZXh0LXNtIHNtOnRleHQtYmFzZSBsZWFkaW5nLTUgdGV4dC1zbGF0ZS05MDAgYm9yZGVyLW5vbmUgb3V0bGluZS1oaWRkZW4gcHgtMSBweS0xIGZvY3VzOnJpbmctMCBmb2N1czpib3JkZXItdHJhbnNwYXJlbnRcIlxuICAgICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBzZXRRdWVyeShldmVudC50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICBvbktleURvd249e2hhbmRsZUtleURvd259XG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtzZWxlY3RlZC5sZW5ndGggPyBcIlwiIDogaW5kVChcIlZpc2l0c19DcmVhdGVfRmlsdGVyUGxhY2Vob2xkZXJcIiwgXCJUeXBlIHRvIGZpbHRlci4uLlwiKX1cbiAgICAgICAgICAgICAgYXV0b0NvbXBsZXRlPVwib2ZmXCJcbiAgICAgICAgICAgICAgcmVmPXtpbnB1dFJlZn1cbiAgICAgICAgICAgICAgcmVhZE9ubHk9eyFhY2NvdW50TnVtfVxuICAgICAgICAgICAgICByb2xlPVwiY29tYm9ib3hcIlxuICAgICAgICAgICAgICBhcmlhLWV4cGFuZGVkPXtvcGVufVxuICAgICAgICAgICAgICBhcmlhLWNvbnRyb2xzPXtsaXN0SWR9XG4gICAgICAgICAgICAgIGFyaWEtYWN0aXZlZGVzY2VuZGFudD17YWN0aXZlSWR9XG4gICAgICAgICAgICAgIGFyaWEtYXV0b2NvbXBsZXRlPVwibGlzdFwiXG4gICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2luZFQoXCJWaXNpdHNfQ3JlYXRlX1NlYXJjaENvbnRhY3RcIiwgXCJTZWFyY2ggY29udGFjdFwiKX1cbiAgICAgICAgICAgICAgb25Gb2N1cz17KCkgPT4ge1xuICAgICAgICAgICAgICAgIGVuc3VyZUxvYWRlZCgpO1xuICAgICAgICAgICAgICAgIHNldE9wZW4odHJ1ZSk7XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgeyhsb2FkaW5nIHx8IGJsb2NraW5nKSAmJiAoXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LXktMCByaWdodC05IGZsZXggaXRlbXMtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgPFNwaW5uZXIgLz5cbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LXktMCByaWdodC0wIGZsZXggaXRlbXMtY2VudGVyIHByLTIgdGV4dC1zbGF0ZS01MDAgaG92ZXI6dGV4dC1zbGF0ZS02MDBcIlxuICAgICAgICAgICAgYXJpYS1sYWJlbD17b3BlbiA/IGluZFQoXCJEcm9wZG93bl9IaWRlT3B0aW9uc1wiLCBcIkhpZGUgb3B0aW9uc1wiKSA6IGluZFQoXCJEcm9wZG93bl9TaG93T3B0aW9uc1wiLCBcIlNob3cgb3B0aW9uc1wiKX1cbiAgICAgICAgICAgIGFyaWEtZXhwYW5kZWQ9e29wZW59XG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgIGlmICghYWNjb3VudE51bSkgcmV0dXJuO1xuICAgICAgICAgICAgICBpZiAob3Blbikge1xuICAgICAgICAgICAgICAgIHNldE9wZW4oZmFsc2UpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGVuc3VyZUxvYWRlZCgpO1xuICAgICAgICAgICAgICAgIHNldE9wZW4odHJ1ZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH19XG4gICAgICAgICAgPlxuICAgICAgICAgICAge29wZW4gPyA8Q2hldnJvblVwU3ZnIGNsYXNzTmFtZT1cImgtNSB3LTVcIiBhcmlhLWhpZGRlbj1cInRydWVcIiAvPiA6IDxDaGV2cm9uRG93blN2ZyBjbGFzc05hbWU9XCJoLTUgdy01XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgLz59XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxGbG9hdGluZ0xpc3RcbiAgICAgICAgICAgIGFuY2hvclJlZj17Ym94UmVmfVxuICAgICAgICAgICAgb3Blbj17b3Blbn1cbiAgICAgICAgICAgIHpJbmRleD17MzgwMDAwfVxuICAgICAgICAgICAgbWF4SGVpZ2h0Q2xhc3M9XCJtYXgtaC03MlwiXG4gICAgICAgICAgICByb2xlPVwibGlzdGJveFwiXG4gICAgICAgICAgICByb3VuZGVkQ2xhc3M9XCJyb3VuZGVkLVs1cHhdXCJcbiAgICAgICAgICAgIHBvcnRhbENsYXNzTmFtZT17cG9ydGFsQ2xhc3NOYW1lfVxuICAgICAgICAgICAgcGFuZWxDbGFzc05hbWU9e3BhbmVsQ2xhc3NOYW1lfVxuICAgICAgICAgID5cbiAgICAgICAgICA8ZGl2IHJlZj17bGlzdFJlZn0gaWQ9e2xpc3RJZH0gYXJpYS1tdWx0aXNlbGVjdGFibGU9XCJ0cnVlXCI+XG4gICAgICAgICAgICB7bG9hZGluZyAmJiAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgcHgtNCBweS0yIHRleHQtc20gdGV4dC1zbGF0ZS01MDBcIj5cbiAgICAgICAgICAgICAgICA8U3Bpbm5lciBzaXplPVwiaC00IHctNFwiIC8+XG4gICAgICAgICAgICAgICAge2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIHshbG9hZGluZyAmJiBvcHRpb25zLmxlbmd0aCA9PT0gMCAmJiAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHgtNCBweS0yIHRleHQtc20gdGV4dC1zbGF0ZS01MDBcIj5cbiAgICAgICAgICAgICAgICB7aGFzTG9hZGVkID8gaW5kVChcIlZpc2l0c19DcmVhdGVfTm9Db250YWN0c1wiLCBcIk5vIGNvbnRhY3RzXCIpIDogaW5kVChcIlZpc2l0c19DcmVhdGVfU2VsZWN0Q2xpZW50Rmlyc3RcIiwgXCJTZWxlY3QgYSBjbGllbnQgZmlyc3QuXCIpfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICB7IWxvYWRpbmcgJiYgb3B0aW9ucy5sZW5ndGggPiAwICYmIGZpbHRlcmVkLmxlbmd0aCA9PT0gMCAmJiAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHgtNCBweS0yIHRleHQtc20gdGV4dC1zbGF0ZS01MDBcIj5cbiAgICAgICAgICAgICAgICB7cXVlcnkudHJpbSgpID8gaW5kVChcIlZpc2l0c19DcmVhdGVfTm9NYXRjaGVzXCIsIFwiTm8gbWF0Y2hlc1wiKSA6IGluZFQoXCJWaXNpdHNfQ3JlYXRlX05vTW9yZUNvbnRhY3RzXCIsIFwiTm8gbW9yZSBjb250YWN0cyBhdmFpbGFibGVcIil9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIHshbG9hZGluZyAmJlxuICAgICAgICAgICAgICBmaWx0ZXJlZC5tYXAoKG9wdCwgaWR4KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2VsID0gc2VsZWN0ZWQuc29tZSgocykgPT4gcy52YWx1ZSA9PT0gb3B0LnZhbHVlKTtcbiAgICAgICAgICAgICAgICBjb25zdCBpc0FjdGl2ZSA9IGlkeCA9PT0gYWN0aXZlSW5kZXg7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgIGtleT17b3B0LnZhbHVlfVxuICAgICAgICAgICAgICAgICAgICBpZD17YCR7aWRCYXNlfS1jb250YWN0LW9wdC0ke29wdC52YWx1ZX1gfVxuICAgICAgICAgICAgICAgICAgICByb2xlPVwib3B0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgYXJpYS1zZWxlY3RlZD17c2VsfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICAgICAgICAgICAgXCJyZWxhdGl2ZSBmbGV4IHctZnVsbCBjdXJzb3ItZGVmYXVsdCBzZWxlY3Qtbm9uZSBpdGVtcy1zdGFydCBweS0yIHB4LTMgdGV4dC1sZWZ0IHRleHQtc21cIixcbiAgICAgICAgICAgICAgICAgICAgICBpc0FjdGl2ZSA/IFwiYmctcHJpbWFyeSB0ZXh0LXdoaXRlXCIgOiBzZWwgPyBcImJnLXByaW1hcnkvMTAgdGV4dC1wcmltYXJ5XCIgOiBcInRleHQtc2xhdGUtOTAwXCJcbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgb25Nb3VzZUVudGVyPXsoKSA9PiBzZXRBY3RpdmVJbmRleChpZHgpfVxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB0b2dnbGVPcHRpb24ob3B0KX1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBmbGV4IGZsZXgtY29sIGdhcC0wLjUgcHItMlwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcImJsb2NrIHRydW5jYXRlXCIsIHNlbCA/IFwiZm9udC1tZWRpdW1cIiA6IFwiZm9udC1ub3JtYWxcIil9PntvcHQudGV4dH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC14cyB0ZXh0LXNsYXRlLTYwMCB0cnVuY2F0ZVwiPntvcHQuY2FyZ299PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH0pfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAge2Jsb2NraW5nICYmIChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIHotNzAwMDAgYmctd2hpdGUvNzAgYmFja2Ryb3AtYmx1ci1bMXB4XSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciByb3VuZGVkLVs1cHhdXCI+XG4gICAgICAgICAgICAgICAgPFNwaW5uZXIgc2l6ZT1cImgtNiB3LTZcIiAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9GbG9hdGluZ0xpc3Q+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsIGZsZXgganVzdGlmeS1lbmRcIj5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXNsYXRlLTUwMCB0ZWNoLWluZm9cIj57c3RhdHVzfTwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29udGFjdHNDb21ib2JveDtcbiIsICJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmZ1bmN0aW9uIFhNYXJrSWNvbih7XG4gIHRpdGxlLFxuICB0aXRsZUlkLFxuICAuLi5wcm9wc1xufSwgc3ZnUmVmKSB7XG4gIHJldHVybiAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChcInN2Z1wiLCBPYmplY3QuYXNzaWduKHtcbiAgICB4bWxuczogXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLFxuICAgIHZpZXdCb3g6IFwiMCAwIDIwIDIwXCIsXG4gICAgZmlsbDogXCJjdXJyZW50Q29sb3JcIixcbiAgICBcImFyaWEtaGlkZGVuXCI6IFwidHJ1ZVwiLFxuICAgIFwiZGF0YS1zbG90XCI6IFwiaWNvblwiLFxuICAgIHJlZjogc3ZnUmVmLFxuICAgIFwiYXJpYS1sYWJlbGxlZGJ5XCI6IHRpdGxlSWRcbiAgfSwgcHJvcHMpLCB0aXRsZSA/IC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KFwidGl0bGVcIiwge1xuICAgIGlkOiB0aXRsZUlkXG4gIH0sIHRpdGxlKSA6IG51bGwsIC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KFwicGF0aFwiLCB7XG4gICAgZDogXCJNNi4yOCA1LjIyYS43NS43NSAwIDAgMC0xLjA2IDEuMDZMOC45NCAxMGwtMy43MiAzLjcyYS43NS43NSAwIDEgMCAxLjA2IDEuMDZMMTAgMTEuMDZsMy43MiAzLjcyYS43NS43NSAwIDEgMCAxLjA2LTEuMDZMMTEuMDYgMTBsMy43Mi0zLjcyYS43NS43NSAwIDAgMC0xLjA2LTEuMDZMMTAgOC45NCA2LjI4IDUuMjJaXCJcbiAgfSkpO1xufVxuY29uc3QgRm9yd2FyZFJlZiA9IC8qI19fUFVSRV9fKi8gUmVhY3QuZm9yd2FyZFJlZihYTWFya0ljb24pO1xuZXhwb3J0IGRlZmF1bHQgRm9yd2FyZFJlZjsiLCAiXHVGRUZGaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IENsaWVudFNlYXJjaENvbWJvYm94IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL3Zpc2l0YXMvQ2xpZW50U2VhcmNoQ29tYm9ib3gudHN4XCI7XG5pbXBvcnQgQ29udGFjdHNDb21ib2JveCBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy92aXNpdGFzL0NvbnRhY3RzQ29tYm9ib3gudHN4XCI7XG5cbmV4cG9ydCB0eXBlIENyZWF0ZVNlbGVjdGVkQ2xpZW50ID0ge1xuICB2YWx1ZTogc3RyaW5nO1xuICB0ZXh0OiBzdHJpbmc7XG4gIGNhcmdvPzogc3RyaW5nO1xuICBlbXByZXNhPzogc3RyaW5nO1xufSB8IG51bGw7XG5cbmV4cG9ydCB0eXBlIENyZWF0ZVNlbGVjdGVkQ29udGFjdCA9IHtcbiAgdmFsdWU6IHN0cmluZztcbiAgdGV4dDogc3RyaW5nO1xuICBjYXJnbzogc3RyaW5nO1xuICBlbXByZXNhOiBzdHJpbmc7XG59O1xuXG50eXBlIENyZWF0ZVN0ZXBDbGllbnRTZWxlY3Rpb25Qcm9wcyA9IHtcbiAgc2VsZWN0ZWRDbGllbnQ6IENyZWF0ZVNlbGVjdGVkQ2xpZW50O1xuICBzZWxlY3RlZENvbnRhY3RzOiBDcmVhdGVTZWxlY3RlZENvbnRhY3RbXTtcbiAgb25DbGllbnRTZWxlY3RlZDogKG5leHRDbGllbnQ6IENyZWF0ZVNlbGVjdGVkQ2xpZW50KSA9PiB2b2lkO1xuICBvbkNvbnRhY3RzQ2hhbmdlOiAobmV4dENvbnRhY3RzOiBDcmVhdGVTZWxlY3RlZENvbnRhY3RbXSkgPT4gdm9pZDtcbiAgY2xpZW50TGFiZWw6IHN0cmluZztcbiAgY2xpZW50UGxhY2Vob2xkZXI6IHN0cmluZztcbiAgc2VsZWN0ZWRDb250YWN0c0NvdW50VGV4dDogc3RyaW5nO1xufTtcblxuLy8gUmVuZGVycyBzdGVwIDEgd2hlcmUgdXNlciBzZWxlY3RzIHRoZSBhY2NvdW50IGFuZCByZWxhdGVkIGNvbnRhY3RzLlxuY29uc3QgQ3JlYXRlU3RlcENsaWVudFNlbGVjdGlvbiA9ICh7XG4gIHNlbGVjdGVkQ2xpZW50LFxuICBzZWxlY3RlZENvbnRhY3RzLFxuICBvbkNsaWVudFNlbGVjdGVkLFxuICBvbkNvbnRhY3RzQ2hhbmdlLFxuICBjbGllbnRMYWJlbCxcbiAgY2xpZW50UGxhY2Vob2xkZXIsXG4gIHNlbGVjdGVkQ29udGFjdHNDb3VudFRleHQsXG59OiBDcmVhdGVTdGVwQ2xpZW50U2VsZWN0aW9uUHJvcHMpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNlwiPlxuICAgICAgPENsaWVudFNlYXJjaENvbWJvYm94XG4gICAgICAgIHZhbHVlPXtzZWxlY3RlZENsaWVudH1cbiAgICAgICAgb25TZWxlY3RlZD17b25DbGllbnRTZWxlY3RlZH1cbiAgICAgICAgbGFiZWw9e2NsaWVudExhYmVsfVxuICAgICAgICBwbGFjZWhvbGRlcj17Y2xpZW50UGxhY2Vob2xkZXJ9XG4gICAgICAgIHBvcnRhbENsYXNzTmFtZT1cInZpc2l0YXMtdHlwb2dyYXBoeVwiXG4gICAgICAvPlxuXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktM1wiPlxuICAgICAgICA8Q29udGFjdHNDb21ib2JveFxuICAgICAgICAgIGFjY291bnROdW09e3NlbGVjdGVkQ2xpZW50Py52YWx1ZX1cbiAgICAgICAgICB2YWx1ZT17c2VsZWN0ZWRDb250YWN0c31cbiAgICAgICAgICBvbkNoYW5nZT17b25Db250YWN0c0NoYW5nZX1cbiAgICAgICAgICBwb3J0YWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxuICAgICAgICAvPlxuICAgICAgICB7c2VsZWN0ZWRDb250YWN0cy5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS02MDBcIj5cbiAgICAgICAgICAgIHtzZWxlY3RlZENvbnRhY3RzQ291bnRUZXh0fVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDcmVhdGVTdGVwQ2xpZW50U2VsZWN0aW9uO1xyXG4iLCAiXHVGRUZGaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFNpbmdsZURhdGVQaWNrZXIgZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9TaW5nbGVEYXRlUGlja2VyLnRzeFwiO1xuaW1wb3J0IFNlbGVjdENvbWJvYm94IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvU2VsZWN0Q29tYm9ib3gudHN4XCI7XG5pbXBvcnQgVmlzaXROYXJyYXRpdmVGaWVsZHMgZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvdmlzaXRhcy9WaXNpdE5hcnJhdGl2ZUZpZWxkcy50c3hcIjtcblxudHlwZSBTZWxlY3RPcHRpb24gPSB7XG4gIHZhbHVlPzogc3RyaW5nIHwgbnVtYmVyO1xuICBWYWx1ZT86IHN0cmluZyB8IG51bWJlcjtcbiAgdGV4dD86IHN0cmluZztcbiAgVGV4dD86IHN0cmluZztcbn07XG5cbnR5cGUgTmFycmF0aXZlVGFwRmllbGQgPSB7XG4gIGlkOiBzdHJpbmc7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIHZhbHVlOiBzdHJpbmc7XG4gIGNsYXNzTmFtZTogc3RyaW5nO1xuICBwb2ludGVyQmluZGluZ3M6IHtcbiAgICBvblBvaW50ZXJEb3duPzogUmVhY3QuUG9pbnRlckV2ZW50SGFuZGxlcjxIVE1MVGV4dEFyZWFFbGVtZW50PjtcbiAgICBvblBvaW50ZXJNb3ZlPzogUmVhY3QuUG9pbnRlckV2ZW50SGFuZGxlcjxIVE1MVGV4dEFyZWFFbGVtZW50PjtcbiAgICBvblBvaW50ZXJVcD86IFJlYWN0LlBvaW50ZXJFdmVudEhhbmRsZXI8SFRNTFRleHRBcmVhRWxlbWVudD47XG4gICAgb25Qb2ludGVyQ2FuY2VsPzogUmVhY3QuUG9pbnRlckV2ZW50SGFuZGxlcjxIVE1MVGV4dEFyZWFFbGVtZW50PjtcbiAgfTtcbn07XG5cbnR5cGUgQ3JlYXRlU3RlcFZpc2l0RGV0YWlsc1Byb3BzID0ge1xuICB0aXRsZTogc3RyaW5nO1xuICBkYXRlTGFiZWw6IHN0cmluZztcbiAgdHJhbnNEYXRlOiBzdHJpbmc7XG4gIG9uVHJhbnNEYXRlQ2hhbmdlOiAobmV4dFZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHZpc2l0VHlwZUxhYmVsOiBzdHJpbmc7XG4gIHZpc2l0VHlwZXM6IFNlbGVjdE9wdGlvbltdO1xuICB2aXNpdFR5cGU6IHN0cmluZztcbiAgb25WaXNpdFR5cGVDaGFuZ2U6IChuZXh0VmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgdmlzaXRUeXBlUGxhY2Vob2xkZXI6IHN0cmluZztcbiAgdmlzaXRUeXBlSW52YWxpZDogYm9vbGVhbjtcbiAgZGVzY3JpcHRpb25MYWJlbDogc3RyaW5nO1xuICBkZXNjcmlwdGlvblZhbHVlOiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uQ2xhc3NOYW1lOiBzdHJpbmc7XG4gIG9uRGVzY3JpcHRpb25DaGFuZ2U6IChuZXh0VmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgdGFwRmllbGRzOiBOYXJyYXRpdmVUYXBGaWVsZFtdO1xuICBzdGF0dXM6IHN0cmluZztcbn07XG5cbi8vIFJlbmRlcnMgc3RlcCAyIHdpdGggdmlzaXQgbWV0YWRhdGEgYW5kIG5hcnJhdGl2ZSBmaWVsZHMuXG5jb25zdCBDcmVhdGVTdGVwVmlzaXREZXRhaWxzID0gKHtcbiAgdGl0bGUsXG4gIGRhdGVMYWJlbCxcbiAgdHJhbnNEYXRlLFxuICBvblRyYW5zRGF0ZUNoYW5nZSxcbiAgdmlzaXRUeXBlTGFiZWwsXG4gIHZpc2l0VHlwZXMsXG4gIHZpc2l0VHlwZSxcbiAgb25WaXNpdFR5cGVDaGFuZ2UsXG4gIHZpc2l0VHlwZVBsYWNlaG9sZGVyLFxuICB2aXNpdFR5cGVJbnZhbGlkLFxuICBkZXNjcmlwdGlvbkxhYmVsLFxuICBkZXNjcmlwdGlvblZhbHVlLFxuICBkZXNjcmlwdGlvbkNsYXNzTmFtZSxcbiAgb25EZXNjcmlwdGlvbkNoYW5nZSxcbiAgdGFwRmllbGRzLFxuICBzdGF0dXMsXG59OiBDcmVhdGVTdGVwVmlzaXREZXRhaWxzUHJvcHMpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNoYWRvdy14cyBnbGFzcy1wYW5lbCBwLTQgc3BhY2UteS00IGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHJvdW5kZWQtMnhsXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtYmFzZSBmb250LXNlbWlib2xkIHRleHQtc2xhdGUtOTAwIGJvcmRlci1iIGJvcmRlci1zbGF0ZS0yMDAgcGItM1wiPlxuICAgICAgICB7dGl0bGV9XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMiBnYXAtNFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInZpc2l0YS1maWVsZC10ZXh0XCI+XG4gICAgICAgICAgPFNpbmdsZURhdGVQaWNrZXIgbGFiZWw9e2RhdGVMYWJlbH0gdmFsdWU9e3RyYW5zRGF0ZX0gb25DaGFuZ2U9e29uVHJhbnNEYXRlQ2hhbmdlfSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPFNlbGVjdENvbWJvYm94XG4gICAgICAgICAgbGFiZWw9e3Zpc2l0VHlwZUxhYmVsfVxuICAgICAgICAgIG9wdGlvbnM9e3Zpc2l0VHlwZXN9XG4gICAgICAgICAgdmFsdWU9e3Zpc2l0VHlwZX1cbiAgICAgICAgICBvbkNoYW5nZT17KG5leHRWYWx1ZSkgPT4gb25WaXNpdFR5cGVDaGFuZ2UoU3RyaW5nKG5leHRWYWx1ZSA/PyBcIlwiKSl9XG4gICAgICAgICAgcGxhY2Vob2xkZXI9e3Zpc2l0VHlwZVBsYWNlaG9sZGVyfVxuICAgICAgICAgIGludmFsaWQ9e3Zpc2l0VHlwZUludmFsaWR9XG4gICAgICAgICAgZW1pdE9uVmFsdWVDaGFuZ2VcbiAgICAgICAgICBwb3J0YWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxWaXNpdE5hcnJhdGl2ZUZpZWxkc1xuICAgICAgICBkZXNjcmlwdGlvbkxhYmVsPXtkZXNjcmlwdGlvbkxhYmVsfVxuICAgICAgICBkZXNjcmlwdGlvblZhbHVlPXtkZXNjcmlwdGlvblZhbHVlfVxuICAgICAgICBkZXNjcmlwdGlvbkNsYXNzTmFtZT17ZGVzY3JpcHRpb25DbGFzc05hbWV9XG4gICAgICAgIG9uRGVzY3JpcHRpb25DaGFuZ2U9e29uRGVzY3JpcHRpb25DaGFuZ2V9XG4gICAgICAgIHRhcEZpZWxkcz17dGFwRmllbGRzfVxuICAgICAgLz5cblxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtM1wiPlxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNtIHRleHQtc2xhdGUtNTAwXCI+e3N0YXR1c308L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENyZWF0ZVN0ZXBWaXNpdERldGFpbHM7XHJcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgQ3JlYXRlRm9ybSBmcm9tIFwiLi9DcmVhdGVGb3JtLnRzeFwiO1xuaW1wb3J0IFZpc2l0YXNQYWdlUHJvdmlkZXJzIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvVmlzaXRhc1BhZ2VQcm92aWRlcnMudHN4XCI7XG5pbXBvcnQgeyBtb3VudFJlYWN0SXNsYW5kLCBtb3VudFdoZW5Eb2N1bWVudFJlYWR5IH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3JlYWN0SXNsYW5kLnRzeFwiO1xuXG4vLyBQYWdlIGVudHJ5IGZvciB0aGUgdmlzaXRhcyBjcmVhdGUgaXNsYW5kLlxuY29uc3QgQ3JlYXRlUGFnZSA9ICgpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8VmlzaXRhc1BhZ2VQcm92aWRlcnM+XG4gICAgICA8Q3JlYXRlRm9ybSAvPlxuICAgIDwvVmlzaXRhc1BhZ2VQcm92aWRlcnM+XG4gICk7XG59O1xuXG5jb25zdCBtb3VudCA9ICgpID0+IHtcbiAgY29uc3Qgcm9vdEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2aXNpdGFzLWFwcC1yb290XCIpO1xuICBpZiAoIXJvb3RFbCkgcmV0dXJuO1xuXG4gIG1vdW50UmVhY3RJc2xhbmQocm9vdEVsLCA8Q3JlYXRlUGFnZSAvPik7XG59O1xuXG5tb3VudFdoZW5Eb2N1bWVudFJlYWR5KG1vdW50KTtcblxuZXhwb3J0IGRlZmF1bHQgQ3JlYXRlUGFnZTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7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
