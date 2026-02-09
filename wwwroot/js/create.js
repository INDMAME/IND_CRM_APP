import {
  AppErrorBoundary_default,
  ConfirmModal,
  SelectCombobox_default,
  SingleDatePicker,
  VisitNarrativeFields_default,
  VisitasPageProviders_default,
  isOverflowing,
  setPreviewAnchor,
  showPreviewTooltip,
  useConfirmDialog,
  useTapGuard,
  useTextEditorFields,
  useVisitas,
  wait
} from "./chunks/chunk-I2NQSFQW.js";
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
} from "./chunks/chunk-DEIU5YG5.js";
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
} from "./chunks/chunk-J3WMNRY4.js";
import {
  primeTextEditorValue,
  setTextEditorReturnUrl
} from "./chunks/chunk-QO7GVWVB.js";
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
      const safeId = String(fieldId || "").trim();
      const safeLabel = String(fieldLabel || "").trim();
      const allowEdit = options?.allowEdit !== false;
      if (!safeId || !safeLabel) return;
      primeTextEditorValue(safeId, String(fieldValue || ""));
      persistDraftNow();
      const returnUrl = `${window.location.pathname}${window.location.search || ""}`;
      setTextEditorReturnUrl(safeId, returnUrl);
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvY3JlYWNpb24vQ3JlYXRlRm9ybS50c3giLCAiLi4vcmVhY3Qvc3JjL2hvb2tzL3VzZVRvcGJhci50cyIsICIuLi9yZWFjdC9zcmMvaG9va3MvdXNlQ3JlYXRlRHJhZnQudHMiLCAiLi4vcmVhY3Qvc3JjL3V0aWxzL2dsb2JhbFNwaW5uZXIudHMiLCAiLi4vcmVhY3Qvc3JjL2hvb2tzL3VzZUNyZWF0ZVN1Ym1pdC50cyIsICIuLi9yZWFjdC9zcmMvdXRpbHMvaW5kSWRzLnRzIiwgIi4uL3JlYWN0L3NyYy9jb21wb25lbnRzL3Zpc2l0YXMvQ29udGFjdHNDb21ib2JveC50c3giLCAiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BoZXJvaWNvbnMvcmVhY3QvMjAvc29saWQvZXNtL1hNYXJrSWNvbi5qcyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9jcmVhY2lvbi9DcmVhdGVTdGVwQ2xpZW50U2VsZWN0aW9uLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9jcmVhY2lvbi9DcmVhdGVTdGVwVmlzaXREZXRhaWxzLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9jcmVhY2lvbi9DcmVhdGVQYWdlLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiXHVGRUZGaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlU3RhdGUsIHVzZVJlZiB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgQ29uZmlybU1vZGFsIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvQ29uZmlybU1vZGFsLnRzeFwiO1xuaW1wb3J0IEFwcEVycm9yQm91bmRhcnkgZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9BcHBFcnJvckJvdW5kYXJ5LnRzeFwiO1xuaW1wb3J0IHsgdXNlVmlzaXRhcyB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VWaXNpdGFzLnRzXCI7XG5pbXBvcnQgeyB1c2VUYXBHdWFyZCB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VUYXBHdWFyZC50c1wiO1xuaW1wb3J0IHsgdXNlVG9wYmFyIH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZVRvcGJhci50c1wiO1xuaW1wb3J0IHsgdXNlQ29uZmlybURpYWxvZyB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VDb25maXJtRGlhbG9nLnRzXCI7XG5pbXBvcnQgeyB1c2VDcmVhdGVEcmFmdCB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VDcmVhdGVEcmFmdC50c1wiO1xuaW1wb3J0IHsgdXNlQ3JlYXRlU3VibWl0IH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZUNyZWF0ZVN1Ym1pdC50c1wiO1xuaW1wb3J0IHsgdXNlVGV4dEVkaXRvckZpZWxkcyB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VUZXh0RWRpdG9yRmllbGRzLnRzXCI7XG5pbXBvcnQgQ3JlYXRlU3RlcENsaWVudFNlbGVjdGlvbiwgeyBDcmVhdGVTZWxlY3RlZENsaWVudCwgQ3JlYXRlU2VsZWN0ZWRDb250YWN0IH0gZnJvbSBcIi4vQ3JlYXRlU3RlcENsaWVudFNlbGVjdGlvbi50c3hcIjtcbmltcG9ydCBDcmVhdGVTdGVwVmlzaXREZXRhaWxzIGZyb20gXCIuL0NyZWF0ZVN0ZXBWaXNpdERldGFpbHMudHN4XCI7XG5pbXBvcnQgeyBjbGFzc05hbWVzIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2NsYXNzTmFtZXMudHNcIjtcbmltcG9ydCB7IGluZEZvcm1hdCwgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgeyBjYW5BY2Nlc3MsIHNob3dQZXJtaXNzaW9uTW9kYWwgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvcGVybWlzc2lvbnMudHNcIjtcbmltcG9ydCB7IHNldFByZXZpZXdBbmNob3IsIHNob3dQcmV2aWV3VG9vbHRpcCwgaXNPdmVyZmxvd2luZyB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9wcmV2aWV3VG9vbHRpcC50c1wiO1xuaW1wb3J0IHsgcHJpbWVUZXh0RWRpdG9yVmFsdWUsIHNldFRleHRFZGl0b3JSZXR1cm5VcmwgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvdGV4dEVkaXRvci50c1wiO1xuaW1wb3J0IHsgZmxhc2hBY3Rpb25NYXJrIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3Zpc2l0YXNIaXN0b3J5LnRzXCI7XG5cclxuZnVuY3Rpb24gVmlzaXRhc0FwcCgpIHtcbiAgY29uc3QgeyB2aXNpdFR5cGVzLCBhc2lzdGVudGVUaXBvcyB9ID0gdXNlVmlzaXRhcygpO1xuICBjb25zdCBjYW5DcmVhdGVWaXNpdCA9IGNhbkFjY2VzcyhcIlZJU0lUQVNfQ1JFQUNJT05cIiwgXCJBZGRcIik7XG4gIGNvbnN0IGNhblJvbGxiYWNrRGVsZXRlID0gY2FuQWNjZXNzKFwiVklTSVRBU19ISVNUT1JJQUxcIiwgXCJGdWxsQWNjZXNzXCIpO1xuXHJcbiAgY29uc3QgZmllbGRJZENvbWVudGFyaW9zID0gXCJWaXNpdGEuQ3JlYXRlLkNvbWVudGFyaW9zXCI7XHJcbiAgY29uc3QgZmllbGRJZEFudGVjZWRlbnRlcyA9IFwiVmlzaXRhLkNyZWF0ZS5BbnRlY2VkZW50ZXNcIjtcclxuICBjb25zdCBmaWVsZElkQ29uY2x1c2lvbmVzID0gXCJWaXNpdGEuQ3JlYXRlLkNvbmNsdXNpb25lc1wiO1xyXG5cclxuICBjb25zdCBbc3RlcCwgc2V0U3RlcF0gPSB1c2VTdGF0ZSgxKTtcclxuICBjb25zdCBbc2VsZWN0ZWRDbGllbnQsIHNldFNlbGVjdGVkQ2xpZW50XSA9IHVzZVN0YXRlPENyZWF0ZVNlbGVjdGVkQ2xpZW50PihudWxsKTtcbiAgY29uc3QgW3NlbGVjdGVkQ29udGFjdHMsIHNldFNlbGVjdGVkQ29udGFjdHNdID0gdXNlU3RhdGU8Q3JlYXRlU2VsZWN0ZWRDb250YWN0W10+KFtdKTtcbiAgY29uc3QgdG9kYXlTdHJpbmcgPSAoKSA9PiB7XHJcbiAgICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKCk7XHJcbiAgICBjb25zdCB5eXl5ID0gdG9kYXkuZ2V0RnVsbFllYXIoKTtcclxuICAgIGNvbnN0IG1tID0gU3RyaW5nKHRvZGF5LmdldE1vbnRoKCkgKyAxKS5wYWRTdGFydCgyLCBcIjBcIik7XHJcbiAgICBjb25zdCBkZCA9IFN0cmluZyh0b2RheS5nZXREYXRlKCkpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcclxuICAgIHJldHVybiBgJHt5eXl5fS0ke21tfS0ke2RkfWA7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgZGVmYXVsdFZpc2l0VHlwZSA9IFN0cmluZyh2aXNpdFR5cGVzWzBdPy52YWx1ZSA/PyB2aXNpdFR5cGVzWzBdPy5WYWx1ZSA/PyBcIlwiKTtcbiAgY29uc3QgZGVmYXVsdEFzaXN0ZW50ZVRpcG8gPSBTdHJpbmcoYXNpc3RlbnRlVGlwb3NbMF0/LnZhbHVlID8/IGFzaXN0ZW50ZVRpcG9zWzBdPy5WYWx1ZSA/PyBcIjBcIik7XG5cbiAgY29uc3QgW3Zpc2l0VHlwZSwgc2V0VmlzaXRUeXBlXSA9IHVzZVN0YXRlPHN0cmluZz4oZGVmYXVsdFZpc2l0VHlwZSk7XG4gIGNvbnN0IFt0cmFuc0RhdGUsIHNldFRyYW5zRGF0ZV0gPSB1c2VTdGF0ZSgoKSA9PiB0b2RheVN0cmluZygpKTtcclxuICBjb25zdCBbZGVzY3JpcHRpb24sIHNldERlc2NyaXB0aW9uXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtjb21lbnRhcmlvcywgc2V0Q29tZW50YXJpb3NdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW2FudGVjZWRlbnRlcywgc2V0QW50ZWNlZGVudGVzXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtjb25jbHVzaW9uZXMsIHNldENvbmNsdXNpb25lc10gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbc3RhdHVzLCBzZXRTdGF0dXNdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtidXN5LCBzZXRCdXN5XSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3Nob3dSZXF1aXJlZCwgc2V0U2hvd1JlcXVpcmVkXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW21vZGFsRXJyb3IsIHNldE1vZGFsRXJyb3JdID0gdXNlU3RhdGUoXCJcIik7XG5cclxuICBjb25zdCB7IG1vZGFsLCBvcGVuQ29uZmlybSwgY2xvc2VDb25maXJtLCBoYW5kbGVDb25maXJtIH0gPSB1c2VDb25maXJtRGlhbG9nKHtcclxuICAgIGRlZmF1bHRDb25maXJtVGV4dDogaW5kVChcIkNvbmZpcm1fWWVzXCIsIFwiT0tcIiksXHJcbiAgICBkZWZhdWx0Q2FuY2VsVGV4dDogaW5kVChcIkNvbmZpcm1fTm9cIiwgXCJDYW5jZWxcIilcclxuICB9KTtcclxuXHJcbiAgY29uc3QgaGFuZGxlTW9kYWxDb25maXJtID0gUmVhY3QudXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgc2V0TW9kYWxFcnJvcihcIlwiKTtcclxuICAgIGF3YWl0IGhhbmRsZUNvbmZpcm0oe1xyXG4gICAgICBidXN5LFxyXG4gICAgICBvbkVycm9yOiAobXNnKSA9PiB7XHJcbiAgICAgICAgc2V0TW9kYWxFcnJvcihtc2cpO1xyXG4gICAgICAgIHNldFN0YXR1cyhtc2cpO1xyXG4gICAgICAgIGZsYXNoQWN0aW9uTWFyayhcImVycm9yUHJvY2Vzc1wiLCAxNTAwKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSwgW2J1c3ksIGhhbmRsZUNvbmZpcm1dKTtcclxuXHJcbiAgY29uc3QgbW9kYWxMb2FkaW5nVGV4dCA9IGluZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIik7XHJcbiAgY29uc3QgbW9kYWxDYW5jZWxUZXh0ID0gbW9kYWwuY2FuY2VsVGV4dCB8fCBpbmRUKFwiQ29uZmlybV9Ob1wiLCBcIkNhbmNlbFwiKTtcclxuICBjb25zdCBtb2RhbENvbmZpcm1UZXh0ID0gYnVzeVxyXG4gICAgPyBtb2RhbExvYWRpbmdUZXh0XHJcbiAgICA6ICghYnVzeSAmJiBtb2RhbEVycm9yID8gaW5kVChcIkNvbW1vbl9PS1wiLCBcIk9LXCIpIDogKG1vZGFsLmNvbmZpcm1UZXh0IHx8IGluZFQoXCJDb25maXJtX1llc1wiLCBcIk9LXCIpKSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZU1vZGFsQnV0dG9uQ29uZmlybSA9IFJlYWN0LnVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmICghYnVzeSAmJiBtb2RhbEVycm9yKSB7XHJcbiAgICAgIGNsb3NlQ29uZmlybSgpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBoYW5kbGVNb2RhbENvbmZpcm0oKTtcclxuICB9LCBbYnVzeSwgbW9kYWxFcnJvciwgY2xvc2VDb25maXJtLCBoYW5kbGVNb2RhbENvbmZpcm1dKTtcclxuXHJcbiAgY29uc3QgZHJhZnRTbmFwc2hvdCA9IHVzZU1lbW8oXG4gICAgKCkgPT4gKHtcbiAgICAgIHNlbGVjdGVkQ2xpZW50LFxuICAgICAgc2VsZWN0ZWRDb250YWN0cyxcbiAgICAgIHZpc2l0VHlwZSxcbiAgICAgIHRyYW5zRGF0ZSxcbiAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgY29tZW50YXJpb3MsXG4gICAgICBhbnRlY2VkZW50ZXMsXG4gICAgICBjb25jbHVzaW9uZXMsXG4gICAgICBzdGVwLFxuICAgIH0pLFxuICAgIFtzZWxlY3RlZENsaWVudCwgc2VsZWN0ZWRDb250YWN0cywgdmlzaXRUeXBlLCB0cmFuc0RhdGUsIGRlc2NyaXB0aW9uLCBjb21lbnRhcmlvcywgYW50ZWNlZGVudGVzLCBjb25jbHVzaW9uZXMsIHN0ZXBdXG4gICk7XG5cbiAgY29uc3QgeyBwZXJzaXN0RHJhZnROb3cgfSA9IHVzZUNyZWF0ZURyYWZ0KHtcbiAgICBkcmFmdFNuYXBzaG90LFxuICAgIHNldFNlbGVjdGVkQ2xpZW50LFxuICAgIHNldFNlbGVjdGVkQ29udGFjdHMsXG4gICAgc2V0VmlzaXRUeXBlLFxuICAgIHNldFRyYW5zRGF0ZSxcbiAgICBzZXREZXNjcmlwdGlvbixcbiAgICBzZXRDb21lbnRhcmlvcyxcbiAgICBzZXRBbnRlY2VkZW50ZXMsXG4gICAgc2V0Q29uY2x1c2lvbmVzLFxuICAgIHNldFN0ZXAsXG4gIH0pO1xuXHJcbiAgLy8gT3BlbnMgdGhlIGZ1bGwtc2NyZWVuIHRleHQgZWRpdG9yIGZvciBhIG11bHRpbGluZSBmaWVsZC5cbiAgY29uc3Qgb3BlblRleHRFZGl0b3IgPSBSZWFjdC51c2VDYWxsYmFjayhcbiAgICAoZmllbGRJZDogc3RyaW5nLCBmaWVsZExhYmVsOiBzdHJpbmcsIGZpZWxkVmFsdWU6IHN0cmluZywgb3B0aW9uczogeyBhbGxvd0VkaXQ/OiBib29sZWFuIH0gPSB7fSkgPT4ge1xuICAgICAgY29uc3Qgc2FmZUlkID0gU3RyaW5nKGZpZWxkSWQgfHwgXCJcIikudHJpbSgpO1xuICAgICAgY29uc3Qgc2FmZUxhYmVsID0gU3RyaW5nKGZpZWxkTGFiZWwgfHwgXCJcIikudHJpbSgpO1xuICAgICAgY29uc3QgYWxsb3dFZGl0ID0gb3B0aW9ucz8uYWxsb3dFZGl0ICE9PSBmYWxzZTtcbiAgICAgIGlmICghc2FmZUlkIHx8ICFzYWZlTGFiZWwpIHJldHVybjtcblxuICAgICAgLy8gUHJpbWUgdGhlIGVkaXRvciB3aXRoIGN1cnJlbnQgdmFsdWUgd2l0aG91dCBwdXNoaW5nIGxhcmdlIHRleHQgaW50byB0aGUgVVJMLlxuICAgICAgcHJpbWVUZXh0RWRpdG9yVmFsdWUoc2FmZUlkLCBTdHJpbmcoZmllbGRWYWx1ZSB8fCBcIlwiKSk7XG5cbiAgICAgIHBlcnNpc3REcmFmdE5vdygpO1xuICAgICAgY29uc3QgcmV0dXJuVXJsID0gYCR7d2luZG93LmxvY2F0aW9uLnBhdGhuYW1lfSR7d2luZG93LmxvY2F0aW9uLnNlYXJjaCB8fCBcIlwifWA7XG4gICAgICBzZXRUZXh0RWRpdG9yUmV0dXJuVXJsKHNhZmVJZCwgcmV0dXJuVXJsKTtcbiAgICAgIGNvbnN0IHVybCA9XG4gICAgICAgIGAvVGV4dEVkaXRvclJlYWN0L0VkaXRGaWVsZD9maWVsZElkPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHNhZmVJZCl9YCArXG4gICAgICAgIGAmZmllbGRMYWJlbD0ke2VuY29kZVVSSUNvbXBvbmVudChzYWZlTGFiZWwpfWAgK1xuICAgICAgICBgJnJldHVyblVybD0ke2VuY29kZVVSSUNvbXBvbmVudChyZXR1cm5VcmwpfWAgK1xuICAgICAgICBgJmFsbG93RWRpdD0ke2FsbG93RWRpdCA/IFwiMVwiIDogXCIwXCJ9YDtcblxuICAgICAgd2luZG93Ll9faW5kQnlwYXNzTmF2aWdhdGlvbkd1YXJkT25jZT8uKCk7XG4gICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHVybDtcbiAgICB9LFxuICAgIFtwZXJzaXN0RHJhZnROb3ddXG4gICk7XG5cclxuICBjb25zdCBoYW5kbGVDb21lbnRhcmlvc1RhcCA9IFJlYWN0LnVzZUNhbGxiYWNrKChldmVudCkgPT4ge1xyXG4gICAgaWYgKGJ1c3kpIHJldHVybjtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBvcGVuVGV4dEVkaXRvcihmaWVsZElkQ29tZW50YXJpb3MsIGluZFQoXCJWaXNpdHNfRmllbGRfQ29tbWVudHNcIiwgXCJDb21tZW50c1wiKSwgY29tZW50YXJpb3MpO1xyXG4gIH0sIFtidXN5LCBjb21lbnRhcmlvcywgb3BlblRleHRFZGl0b3JdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQ29tZW50YXJpb3NIb2xkID0gUmVhY3QudXNlQ2FsbGJhY2soKHRhcmdldCwgY2xpZW50WSkgPT4ge1xyXG4gICAgaWYgKCF0YXJnZXQgfHwgIWlzT3ZlcmZsb3dpbmcodGFyZ2V0KSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgc2V0UHJldmlld0FuY2hvcih0YXJnZXQpO1xyXG4gICAgcmV0dXJuIHNob3dQcmV2aWV3VG9vbHRpcChTdHJpbmcoY29tZW50YXJpb3MgfHwgXCJcIiksIGNsaWVudFkpO1xyXG4gIH0sIFtjb21lbnRhcmlvc10pO1xyXG5cclxuICBjb25zdCBoYW5kbGVBbnRlY2VkZW50ZXNUYXAgPSBSZWFjdC51c2VDYWxsYmFjaygoZXZlbnQpID0+IHtcclxuICAgIGlmIChidXN5KSByZXR1cm47XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgb3BlblRleHRFZGl0b3IoZmllbGRJZEFudGVjZWRlbnRlcywgaW5kVChcIlZpc2l0c19GaWVsZF9CYWNrZ3JvdW5kXCIsIFwiQmFja2dyb3VuZFwiKSwgYW50ZWNlZGVudGVzKTtcclxuICB9LCBbYnVzeSwgYW50ZWNlZGVudGVzLCBvcGVuVGV4dEVkaXRvcl0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVBbnRlY2VkZW50ZXNIb2xkID0gUmVhY3QudXNlQ2FsbGJhY2soKHRhcmdldCwgY2xpZW50WSkgPT4ge1xyXG4gICAgaWYgKCF0YXJnZXQgfHwgIWlzT3ZlcmZsb3dpbmcodGFyZ2V0KSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgc2V0UHJldmlld0FuY2hvcih0YXJnZXQpO1xyXG4gICAgcmV0dXJuIHNob3dQcmV2aWV3VG9vbHRpcChTdHJpbmcoYW50ZWNlZGVudGVzIHx8IFwiXCIpLCBjbGllbnRZKTtcclxuICB9LCBbYW50ZWNlZGVudGVzXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUNvbmNsdXNpb25lc1RhcCA9IFJlYWN0LnVzZUNhbGxiYWNrKChldmVudCkgPT4ge1xyXG4gICAgaWYgKGJ1c3kpIHJldHVybjtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBvcGVuVGV4dEVkaXRvcihmaWVsZElkQ29uY2x1c2lvbmVzLCBpbmRUKFwiVmlzaXRzX0ZpZWxkX0NvbmNsdXNpb25zXCIsIFwiQ29uY2x1c2lvbnNcIiksIGNvbmNsdXNpb25lcyk7XHJcbiAgfSwgW2J1c3ksIGNvbmNsdXNpb25lcywgb3BlblRleHRFZGl0b3JdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQ29uY2x1c2lvbmVzSG9sZCA9IFJlYWN0LnVzZUNhbGxiYWNrKCh0YXJnZXQsIGNsaWVudFkpID0+IHtcclxuICAgIGlmICghdGFyZ2V0IHx8ICFpc092ZXJmbG93aW5nKHRhcmdldCkpIHJldHVybiBmYWxzZTtcclxuICAgIHNldFByZXZpZXdBbmNob3IodGFyZ2V0KTtcclxuICAgIHJldHVybiBzaG93UHJldmlld1Rvb2x0aXAoU3RyaW5nKGNvbmNsdXNpb25lcyB8fCBcIlwiKSwgY2xpZW50WSk7XHJcbiAgfSwgW2NvbmNsdXNpb25lc10pO1xyXG5cclxuICBjb25zdCBjb21lbnRhcmlvc1RhcCA9IHVzZVRhcEd1YXJkKGhhbmRsZUNvbWVudGFyaW9zVGFwLCBoYW5kbGVDb21lbnRhcmlvc0hvbGQpO1xuICBjb25zdCBhbnRlY2VkZW50ZXNUYXAgPSB1c2VUYXBHdWFyZChoYW5kbGVBbnRlY2VkZW50ZXNUYXAsIGhhbmRsZUFudGVjZWRlbnRlc0hvbGQpO1xuICBjb25zdCBjb25jbHVzaW9uZXNUYXAgPSB1c2VUYXBHdWFyZChoYW5kbGVDb25jbHVzaW9uZXNUYXAsIGhhbmRsZUNvbmNsdXNpb25lc0hvbGQpO1xuXG4gIGNvbnN0IHRleHRFZGl0b3JCaW5kaW5ncyA9IHVzZU1lbW8oXG4gICAgKCkgPT4gW1xuICAgICAgeyBmaWVsZElkOiBmaWVsZElkQ29tZW50YXJpb3MsIGFwcGx5VmFsdWU6IHNldENvbWVudGFyaW9zIH0sXG4gICAgICB7IGZpZWxkSWQ6IGZpZWxkSWRBbnRlY2VkZW50ZXMsIGFwcGx5VmFsdWU6IHNldEFudGVjZWRlbnRlcyB9LFxuICAgICAgeyBmaWVsZElkOiBmaWVsZElkQ29uY2x1c2lvbmVzLCBhcHBseVZhbHVlOiBzZXRDb25jbHVzaW9uZXMgfSxcbiAgICBdLFxuICAgIFtmaWVsZElkQW50ZWNlZGVudGVzLCBmaWVsZElkQ29tZW50YXJpb3MsIGZpZWxkSWRDb25jbHVzaW9uZXNdXG4gICk7XG5cbiAgdXNlVGV4dEVkaXRvckZpZWxkcyh0ZXh0RWRpdG9yQmluZGluZ3MpO1xuXG4gIC8vIENsZWFyIGNvbnRhY3RzIG9ubHkgd2hlbiB0aGUgY2xpZW50IGNoYW5nZXMgKGF2b2lkIGNsZWFyaW5nIG9uIHJlc3RvcmUvc3RlcCAyIHJldHVybikuXG4gIGNvbnN0IHByZXZDbGllbnRSZWYgPSB1c2VSZWYobnVsbCk7XG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBjdXJyZW50ID0gc2VsZWN0ZWRDbGllbnQ/LnZhbHVlO1xyXG4gICAgaWYgKHByZXZDbGllbnRSZWYuY3VycmVudCAmJiBwcmV2Q2xpZW50UmVmLmN1cnJlbnQgIT09IGN1cnJlbnQpIHtcclxuICAgICAgc2V0U2VsZWN0ZWRDb250YWN0cyhbXSk7XHJcbiAgICB9XHJcbiAgICBwcmV2Q2xpZW50UmVmLmN1cnJlbnQgPSBjdXJyZW50O1xyXG4gIH0sIFtzZWxlY3RlZENsaWVudD8udmFsdWVdKTtcclxuXHJcbiAgY29uc3QgbGFzdENsaWVudFJlZiA9IHVzZVJlZihudWxsKTtcclxuXHJcbiAgLy8gSWYgdGhlIGNsaWVudCBjaGFuZ2VzIGFmdGVyIHNlbGVjdGluZyBjb250YWN0cywgcmVzZXQgdGhlIGVudGlyZSBmb3JtLlxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBjdXJyZW50ID0gc2VsZWN0ZWRDbGllbnQ/LnZhbHVlO1xyXG4gICAgaWYgKCFjdXJyZW50KSByZXR1cm47XHJcblxyXG4gICAgaWYgKGxhc3RDbGllbnRSZWYuY3VycmVudCAmJiBsYXN0Q2xpZW50UmVmLmN1cnJlbnQgIT09IGN1cnJlbnQpIHtcclxuICAgICAgc2V0U3RlcCgxKTtcclxuICAgICAgc2V0U2VsZWN0ZWRDb250YWN0cyhbXSk7XHJcbiAgICAgIHNldFZpc2l0VHlwZShkZWZhdWx0VmlzaXRUeXBlKTtcclxuICAgICAgc2V0VHJhbnNEYXRlKHRvZGF5U3RyaW5nKCkpO1xyXG4gICAgICBzZXREZXNjcmlwdGlvbihcIlwiKTtcclxuICAgICAgc2V0Q29tZW50YXJpb3MoXCJcIik7XHJcbiAgICAgIHNldEFudGVjZWRlbnRlcyhcIlwiKTtcclxuICAgICAgc2V0Q29uY2x1c2lvbmVzKFwiXCIpO1xyXG4gICAgICBzZXRTdGF0dXMoXCJcIik7XHJcbiAgICAgIHNldEJ1c3koZmFsc2UpO1xyXG4gICAgfVxyXG4gICAgbGFzdENsaWVudFJlZi5jdXJyZW50ID0gY3VycmVudDtcclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC1ob29rcy9leGhhdXN0aXZlLWRlcHNcclxuICB9LCBbc2VsZWN0ZWRDbGllbnQ/LnZhbHVlXSk7XHJcblxyXG4gIGNvbnN0IGNhbkdvTmV4dCA9ICEhc2VsZWN0ZWRDbGllbnQ7XG4gIGNvbnN0IGNhbkNyZWF0ZSA9XG4gICAgISFzZWxlY3RlZENsaWVudCAmJlxuICAgIFN0cmluZyh2aXNpdFR5cGUgfHwgXCJcIikudHJpbSgpICE9PSBcIlwiICYmXG4gICAgU3RyaW5nKHZpc2l0VHlwZSkgIT09IFwiMFwiICYmXG4gICAgZGVzY3JpcHRpb24udHJpbSgpLmxlbmd0aCA+IDAgJiZcbiAgICBjb21lbnRhcmlvcy50cmltKCkubGVuZ3RoID4gMDtcblxuICBjb25zdCBoYXNBY3RpdmVQcm9jZXNzID0gdXNlTWVtbygoKSA9PiB7XG4gICAgaWYgKGJ1c3kpIHJldHVybiB0cnVlO1xuICAgIGlmIChzdGVwID4gMSkgcmV0dXJuIHRydWU7XG4gICAgaWYgKHNlbGVjdGVkQ2xpZW50KSByZXR1cm4gdHJ1ZTtcbiAgICBpZiAoc2VsZWN0ZWRDb250YWN0cy5sZW5ndGggPiAwKSByZXR1cm4gdHJ1ZTtcbiAgICByZXR1cm4gKFxuICAgICAgZGVzY3JpcHRpb24udHJpbSgpLmxlbmd0aCA+IDAgfHxcbiAgICAgIGNvbWVudGFyaW9zLnRyaW0oKS5sZW5ndGggPiAwIHx8XG4gICAgICBhbnRlY2VkZW50ZXMudHJpbSgpLmxlbmd0aCA+IDAgfHxcbiAgICAgIGNvbmNsdXNpb25lcy50cmltKCkubGVuZ3RoID4gMFxuICAgICk7XG4gIH0sIFthbnRlY2VkZW50ZXMsIGJ1c3ksIGNvbWVudGFyaW9zLCBjb25jbHVzaW9uZXMsIGRlc2NyaXB0aW9uLCBzZWxlY3RlZENsaWVudCwgc2VsZWN0ZWRDb250YWN0cy5sZW5ndGgsIHN0ZXBdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHdpbmRvdy5fX2luZFNldE5hdmlnYXRpb25HdWFyZD8uKGhhc0FjdGl2ZVByb2Nlc3MpO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB3aW5kb3cuX19pbmRDbGVhck5hdmlnYXRpb25HdWFyZD8uKCk7XG4gICAgfTtcbiAgfSwgW2hhc0FjdGl2ZVByb2Nlc3NdKTtcblxuICBjb25zdCB7IGhhbmRsZVN1Ym1pdCB9ID0gdXNlQ3JlYXRlU3VibWl0KHtcbiAgICBidXN5LFxuICAgIG1vZGFsT3BlbjogbW9kYWwub3BlbixcbiAgICBjYW5DcmVhdGVWaXNpdCxcbiAgICBjYW5Sb2xsYmFja0RlbGV0ZSxcbiAgICBzZWxlY3RlZENsaWVudCxcbiAgICBzZWxlY3RlZENvbnRhY3RzLFxuICAgIHZpc2l0VHlwZSxcbiAgICBkZWZhdWx0QXNpc3RlbnRlVGlwbyxcbiAgICBkZXNjcmlwdGlvbixcbiAgICB0cmFuc0RhdGUsXG4gICAgY29tZW50YXJpb3MsXG4gICAgYW50ZWNlZGVudGVzLFxuICAgIGNvbmNsdXNpb25lcyxcbiAgICBzZXRCdXN5LFxuICAgIHNldFN0YXR1cyxcbiAgICBzZXRNb2RhbEVycm9yLFxuICAgIHNldFNob3dSZXF1aXJlZCxcbiAgICBvcGVuQ29uZmlybSxcbiAgICBjbG9zZUNvbmZpcm0sXG4gIH0pO1xuXG4gIGNvbnN0IGhhbmRsZVRvcGJhclByaW1hcnkgPSBSZWFjdC51c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKCFjYW5DcmVhdGVWaXNpdCkge1xuICAgICAgc2hvd1Blcm1pc3Npb25Nb2RhbCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoc3RlcCA9PT0gMSAmJiBjYW5Hb05leHQpIHNldFN0ZXAoMik7XG4gICAgaWYgKHN0ZXAgPT09IDIpIGhhbmRsZVN1Ym1pdCgpO1xuICB9LCBbY2FuQ3JlYXRlVmlzaXQsIGNhbkdvTmV4dCwgaGFuZGxlU3VibWl0LCBzdGVwXSk7XG5cbiAgY29uc3QgaGFuZGxlVG9wYmFyQmFjayA9IFJlYWN0LnVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBzZXRTdGVwKDEpO1xuICB9LCBbXSk7XG5cbiAgdXNlVG9wYmFyKHN0ZXAsIGNhbkdvTmV4dCwgaGFuZGxlVG9wYmFyUHJpbWFyeSwgaGFuZGxlVG9wYmFyQmFjaywgYnVzeSwgY2FuQ3JlYXRlLCBjYW5DcmVhdGVWaXNpdCk7XG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKHN0ZXAgPT09IDEpIHtcclxuICAgICAgc2V0U2hvd1JlcXVpcmVkKGZhbHNlKTtcclxuICAgICAgY2xvc2VDb25maXJtKCk7XHJcbiAgICB9XHJcbiAgfSwgW3N0ZXAsIGNsb3NlQ29uZmlybV0pO1xyXG5cclxuICBjb25zdCB2aXNpdFR5cGVJbnZhbGlkID0gc2hvd1JlcXVpcmVkICYmIChTdHJpbmcodmlzaXRUeXBlIHx8IFwiXCIpID09PSBcIlwiIHx8IFN0cmluZyh2aXNpdFR5cGUpID09PSBcIjBcIik7XG4gIGNvbnN0IGRlc2NyaXB0aW9uSW52YWxpZCA9IHNob3dSZXF1aXJlZCAmJiBkZXNjcmlwdGlvbi50cmltKCkubGVuZ3RoID09PSAwO1xuICBjb25zdCBjb21lbnRhcmlvc0ludmFsaWQgPSBzaG93UmVxdWlyZWQgJiYgY29tZW50YXJpb3MudHJpbSgpLmxlbmd0aCA9PT0gMDtcbiAgY29uc3QgZGVzY3JpcHRpb25JbnB1dENsYXNzTmFtZSA9IGNsYXNzTmFtZXMoXG4gICAgXCJmb3JtLWNvbnRyb2xcIixcbiAgICBkZXNjcmlwdGlvbkludmFsaWRcbiAgICAgID8gXCJib3JkZXItcm9zZS00MDAgYmctcm9zZS01MCBmb2N1czpyaW5nLXJvc2UtMjAwIGZvY3VzOmJvcmRlci1yb3NlLTQwMFwiXG4gICAgICA6IFwiYm9yZGVyLXNsYXRlLTIwMCBmb2N1czpyaW5nLXByaW1hcnkgZm9jdXM6Ym9yZGVyLXByaW1hcnlcIlxuICApO1xuICBjb25zdCBjb21lbnRhcmlvc0NsYXNzTmFtZSA9IGNsYXNzTmFtZXMoXG4gICAgXCJmb3JtLWNvbnRyb2wgY3Vyc29yLXBvaW50ZXJcIixcbiAgICBjb21lbnRhcmlvc0ludmFsaWRcbiAgICAgID8gXCJib3JkZXItcm9zZS00MDAgYmctcm9zZS01MCBmb2N1czpyaW5nLXJvc2UtMjAwIGZvY3VzOmJvcmRlci1yb3NlLTQwMFwiXG4gICAgICA6IFwiYm9yZGVyLXNsYXRlLTIwMCBmb2N1czpyaW5nLXByaW1hcnkgZm9jdXM6Ym9yZGVyLXByaW1hcnlcIlxuICApO1xuICBjb25zdCBkZXNjcmlwdGlvbkxhYmVsID0gaW5kVChcIlZpc2l0c19GaWVsZF9EZXNjcmlwdGlvblwiLCBcIkRlc2NyaXB0aW9uXCIpO1xuICBjb25zdCBjb21tZW50c0xhYmVsID0gaW5kVChcIlZpc2l0c19GaWVsZF9Db21tZW50c1wiLCBcIkNvbW1lbnRzXCIpO1xuICBjb25zdCBiYWNrZ3JvdW5kTGFiZWwgPSBpbmRUKFwiVmlzaXRzX0ZpZWxkX0JhY2tncm91bmRcIiwgXCJCYWNrZ3JvdW5kXCIpO1xuICBjb25zdCBjb25jbHVzaW9uc0xhYmVsID0gaW5kVChcIlZpc2l0c19GaWVsZF9Db25jbHVzaW9uc1wiLCBcIkNvbmNsdXNpb25zXCIpO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTRcIj5cclxuICAgICAgPENvbmZpcm1Nb2RhbFxyXG4gICAgICAgIG9wZW49e21vZGFsLm9wZW59XHJcbiAgICAgICAgdGl0bGU9e21vZGFsLnRpdGxlfVxyXG4gICAgICAgIG1lc3NhZ2U9e21vZGFsLm1lc3NhZ2V9XHJcbiAgICAgICAgY29uZmlybVRleHQ9e21vZGFsQ29uZmlybVRleHR9XHJcbiAgICAgICAgY2FuY2VsVGV4dD17bW9kYWxDYW5jZWxUZXh0fVxyXG4gICAgICAgIGxvYWRpbmdUZXh0PXttb2RhbExvYWRpbmdUZXh0fVxyXG4gICAgICAgIHNob3dDYW5jZWw9e21vZGFsLnNob3dDYW5jZWx9XHJcbiAgICAgICAgc2hvd0NvbmZpcm09e21vZGFsLnNob3dDb25maXJtfVxyXG4gICAgICAgIGJ1c3k9e2J1c3l9XHJcbiAgICAgICAgZXJyb3I9e21vZGFsRXJyb3J9XHJcbiAgICAgICAgc3RhdHVzPXtzdGF0dXN9XHJcbiAgICAgICAgb25Db25maXJtPXtoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm19XHJcbiAgICAgICAgb25DYW5jZWw9e2Nsb3NlQ29uZmlybX1cclxuICAgICAgLz5cclxuICAgICAge3N0ZXAgPT09IDEgJiYgKFxuICAgICAgICA8Q3JlYXRlU3RlcENsaWVudFNlbGVjdGlvblxuICAgICAgICAgIHNlbGVjdGVkQ2xpZW50PXtzZWxlY3RlZENsaWVudH1cbiAgICAgICAgICBzZWxlY3RlZENvbnRhY3RzPXtzZWxlY3RlZENvbnRhY3RzfVxuICAgICAgICAgIG9uQ2xpZW50U2VsZWN0ZWQ9e3NldFNlbGVjdGVkQ2xpZW50fVxuICAgICAgICAgIG9uQ29udGFjdHNDaGFuZ2U9e3NldFNlbGVjdGVkQ29udGFjdHN9XG4gICAgICAgICAgY2xpZW50TGFiZWw9e2luZFQoXCJWaXNpdHNfQ3JlYXRlX1NlYXJjaENsaWVudFwiLCBcIlNlYXJjaCBjbGllbnRcIil9XG4gICAgICAgICAgY2xpZW50UGxhY2Vob2xkZXI9e2luZEZvcm1hdChcIlZpc2l0c19DcmVhdGVfQ2xpZW50UGxhY2Vob2xkZXJcIiwgXCJUeXBlIGF0IGxlYXN0IHswfSBjaGFyYWN0ZXJzLi4uXCIsIDQpfVxuICAgICAgICAgIHNlbGVjdGVkQ29udGFjdHNDb3VudFRleHQ9e2luZEZvcm1hdChcbiAgICAgICAgICAgIFwiVmlzaXRzX0NyZWF0ZV9TZWxlY3RlZENvbnRhY3RzQ291bnRcIixcbiAgICAgICAgICAgIFwiezB9IHNlbGVjdGVkIGNvbnRhY3QocylcIixcbiAgICAgICAgICAgIHNlbGVjdGVkQ29udGFjdHMubGVuZ3RoXG4gICAgICAgICAgKX1cbiAgICAgICAgLz5cbiAgICAgICl9XG5cclxuICAgICAge3N0ZXAgPT09IDIgJiYgKFxuICAgICAgICA8Q3JlYXRlU3RlcFZpc2l0RGV0YWlsc1xuICAgICAgICAgIHRpdGxlPXtpbmRUKFwiVmlzaXRzX0NyZWF0ZV9WaXNpdERhdGFfVGl0bGVcIiwgXCJWaXNpdCBkZXRhaWxzXCIpfVxuICAgICAgICAgIGRhdGVMYWJlbD17aW5kVChcIlZpc2l0c19EZXRhaWxfRGF0ZV9MYWJlbFwiLCBcIkRhdGVcIil9XG4gICAgICAgICAgdHJhbnNEYXRlPXt0cmFuc0RhdGV9XG4gICAgICAgICAgb25UcmFuc0RhdGVDaGFuZ2U9e3NldFRyYW5zRGF0ZX1cbiAgICAgICAgICB2aXNpdFR5cGVMYWJlbD17aW5kVChcIlZpc2l0c19EZXRhaWxfVmlzaXRUeXBlX0xhYmVsXCIsIFwiVmlzaXQgdHlwZVwiKX1cbiAgICAgICAgICB2aXNpdFR5cGVzPXt2aXNpdFR5cGVzfVxuICAgICAgICAgIHZpc2l0VHlwZT17dmlzaXRUeXBlfVxuICAgICAgICAgIG9uVmlzaXRUeXBlQ2hhbmdlPXtzZXRWaXNpdFR5cGV9XG4gICAgICAgICAgdmlzaXRUeXBlUGxhY2Vob2xkZXI9e2luZFQoXCJWaXNpdHNfRGV0YWlsX1Zpc2l0VHlwZV9QbGFjZWhvbGRlclwiLCBcIlNlbGVjdCB0eXBlXCIpfVxuICAgICAgICAgIHZpc2l0VHlwZUludmFsaWQ9e3Zpc2l0VHlwZUludmFsaWR9XG4gICAgICAgICAgZGVzY3JpcHRpb25MYWJlbD17ZGVzY3JpcHRpb25MYWJlbH1cbiAgICAgICAgICBkZXNjcmlwdGlvblZhbHVlPXtkZXNjcmlwdGlvbn1cbiAgICAgICAgICBkZXNjcmlwdGlvbkNsYXNzTmFtZT17ZGVzY3JpcHRpb25JbnB1dENsYXNzTmFtZX1cbiAgICAgICAgICBvbkRlc2NyaXB0aW9uQ2hhbmdlPXtzZXREZXNjcmlwdGlvbn1cbiAgICAgICAgICB0YXBGaWVsZHM9e1tcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgaWQ6IFwiY29tZW50YXJpb3NcIixcbiAgICAgICAgICAgICAgbGFiZWw6IGNvbW1lbnRzTGFiZWwsXG4gICAgICAgICAgICAgIHZhbHVlOiBjb21lbnRhcmlvcyxcbiAgICAgICAgICAgICAgY2xhc3NOYW1lOiBjb21lbnRhcmlvc0NsYXNzTmFtZSxcbiAgICAgICAgICAgICAgcG9pbnRlckJpbmRpbmdzOiBjb21lbnRhcmlvc1RhcCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGlkOiBcImFudGVjZWRlbnRlc1wiLFxuICAgICAgICAgICAgICBsYWJlbDogYmFja2dyb3VuZExhYmVsLFxuICAgICAgICAgICAgICB2YWx1ZTogYW50ZWNlZGVudGVzLFxuICAgICAgICAgICAgICBjbGFzc05hbWU6IFwiZm9ybS1jb250cm9sIGN1cnNvci1wb2ludGVyXCIsXG4gICAgICAgICAgICAgIHBvaW50ZXJCaW5kaW5nczogYW50ZWNlZGVudGVzVGFwLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgaWQ6IFwiY29uY2x1c2lvbmVzXCIsXG4gICAgICAgICAgICAgIGxhYmVsOiBjb25jbHVzaW9uc0xhYmVsLFxuICAgICAgICAgICAgICB2YWx1ZTogY29uY2x1c2lvbmVzLFxuICAgICAgICAgICAgICBjbGFzc05hbWU6IFwiZm9ybS1jb250cm9sIGN1cnNvci1wb2ludGVyXCIsXG4gICAgICAgICAgICAgIHBvaW50ZXJCaW5kaW5nczogY29uY2x1c2lvbmVzVGFwLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdfVxuICAgICAgICAgIHN0YXR1cz17c3RhdHVzfVxuICAgICAgICAvPlxuICAgICAgKX1cbiAgICA8L2Rpdj5cclxuICApO1xyXG59XG5cbi8vIENyZWF0ZSBmbG93IFVJIHdyYXBwZWQgYnkgdGhlIGVycm9yIGJvdW5kYXJ5LlxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ3JlYXRlRm9ybSgpIHtcbiAgcmV0dXJuIChcbiAgICA8QXBwRXJyb3JCb3VuZGFyeSBmYWxsYmFja01lc3NhZ2U9e2luZFQoXCJWaXNpdHNfQ3JlYXRlX0Vycm9yQm91bmRhcnlcIiwgXCJBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSByZW5kZXJpbmcgdGhlIHZpc2l0cyBwYWdlLiBSZWxvYWQgYW5kIHRyeSBhZ2Fpbi5cIil9PlxuICAgICAgPFZpc2l0YXNBcHAgLz5cbiAgICA8L0FwcEVycm9yQm91bmRhcnk+XG4gICk7XG59XG4iLCAiaW1wb3J0IHsgdXNlRWZmZWN0IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uL3V0aWxzL2luZEkxOG4udHNcIjtcblxuZXhwb3J0IGNvbnN0IHVzZVRvcGJhciA9IChcbiAgc3RlcDogbnVtYmVyLFxuICBjYW5Hb05leHQ6IGJvb2xlYW4sXG4gIG9uTmV4dDogKCkgPT4gdm9pZCxcbiAgb25QcmV2OiAoKSA9PiB2b2lkLFxuICBidXN5ID0gZmFsc2UsXG4gIGNhblN1Ym1pdFN0ZXAyID0gdHJ1ZSxcbiAgY2FuQWNjZXNzID0gdHJ1ZVxuKSA9PiB7XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgZm9yd2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2xvYmFsRm9yd2FyZEJ0blwiKSBhcyBIVE1MQnV0dG9uRWxlbWVudCB8IG51bGw7XG4gICAgY29uc3QgYmFjayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2xvYmFsQmFja0J0blwiKSBhcyBIVE1MQnV0dG9uRWxlbWVudCB8IG51bGw7XG4gICAgY29uc3QgZm9yd2FyZEljb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdsb2JhbEZvcndhcmRJY29uXCIpO1xuICAgIGNvbnN0IGNyZWF0ZUljb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdsb2JhbENyZWF0ZUljb25cIik7XG5cbiAgICBpZiAoZm9yd2FyZCkge1xuICAgICAgY29uc3QgaXNTdGVwMiA9IHN0ZXAgPT09IDI7XG4gICAgICBjb25zdCBzaG93Rm9yd2FyZCA9IGNhbkFjY2VzcyAmJiAoaXNTdGVwMiB8fCAoc3RlcCA9PT0gMSAmJiBjYW5Hb05leHQpKTtcbiAgICAgIGZvcndhcmQuc3R5bGUudmlzaWJpbGl0eSA9IHNob3dGb3J3YXJkID8gXCJ2aXNpYmxlXCIgOiBcImhpZGRlblwiO1xuICAgICAgZm9yd2FyZC5kaXNhYmxlZCA9ICFzaG93Rm9yd2FyZCB8fCBidXN5O1xuICAgICAgZm9yd2FyZC5vbmNsaWNrID0gc2hvd0ZvcndhcmQgPyAoKSA9PiBvbk5leHQoKSA6IG51bGw7XG4gICAgICBmb3J3YXJkLnNldEF0dHJpYnV0ZShcbiAgICAgICAgXCJhcmlhLWxhYmVsXCIsXG4gICAgICAgIGlzU3RlcDIgPyBpbmRUKFwiQ29tbW9uX0NyZWF0ZVwiLCBcIkNyZWF0ZVwiKSA6IGluZFQoXCJDb21tb25fTmV4dFwiLCBcIk5leHRcIilcbiAgICAgICk7XG4gICAgICBmb3J3YXJkLnNldEF0dHJpYnV0ZShcImFyaWEtZGlzYWJsZWRcIiwgaXNTdGVwMiAmJiAhY2FuU3VibWl0U3RlcDIgPyBcInRydWVcIiA6IFwiZmFsc2VcIik7XG4gICAgICBmb3J3YXJkLmNsYXNzTGlzdC50b2dnbGUoXCJvcGFjaXR5LTUwXCIsIGlzU3RlcDIgJiYgIWNhblN1Ym1pdFN0ZXAyKTtcbiAgICAgIGZvcndhcmQuY2xhc3NMaXN0LnRvZ2dsZShcImN1cnNvci1ub3QtYWxsb3dlZFwiLCBpc1N0ZXAyICYmICFjYW5TdWJtaXRTdGVwMik7XG5cbiAgICAgIGlmIChmb3J3YXJkSWNvbiAmJiBjcmVhdGVJY29uKSB7XG4gICAgICAgIGlmIChpc1N0ZXAyKSB7XG4gICAgICAgICAgZm9yd2FyZEljb24uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgICAgICBjcmVhdGVJY29uLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZm9yd2FyZEljb24uY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICAgICAgICBjcmVhdGVJY29uLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGJhY2spIHtcbiAgICAgIGNvbnN0IHNob3dCYWNrID0gY2FuQWNjZXNzICYmIHN0ZXAgPT09IDI7XG4gICAgICBiYWNrLnN0eWxlLnZpc2liaWxpdHkgPSBzaG93QmFjayA/IFwidmlzaWJsZVwiIDogXCJoaWRkZW5cIjtcbiAgICAgIGJhY2suZGlzYWJsZWQgPSAhc2hvd0JhY2sgfHwgYnVzeTtcbiAgICAgIGJhY2sub25jbGljayA9IHNob3dCYWNrID8gKCkgPT4gb25QcmV2KCkgOiBudWxsO1xuICAgIH1cbiAgfSwgW3N0ZXAsIGNhbkdvTmV4dCwgb25OZXh0LCBvblByZXYsIGJ1c3ksIGNhblN1Ym1pdFN0ZXAyLCBjYW5BY2Nlc3NdKTtcbn07XG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBzaG93R2xvYmFsU3Bpbm5lciwgaGlkZUdsb2JhbFNwaW5uZXIgfSBmcm9tIFwiLi4vdXRpbHMvZ2xvYmFsU3Bpbm5lci50c1wiO1xuaW1wb3J0IHtcbiAgQ1JFQVRFX0ZSRVNIX1BBUkFNLFxuICBWSVNJVF9EUkFGVF9LRVksXG4gIENPTlRBQ1RTX1NUT1JBR0VfS0VZLFxuICBDT05UQUNUU19TRUxFQ1RJT05fS0VZLFxuICBjbGVhckNyZWF0ZVNlbGVjdGlvbkNhY2hlLFxuICBzdHJpcEZyZXNoUGFyYW0sXG59IGZyb20gXCIuLi91dGlscy92aXNpdGFzU3RvcmFnZS50c1wiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgeyBnZXRTZXNzaW9uSnNvbldpdGhFeHBpcnksIGdldFNlc3Npb25WYWx1ZVdpdGhFeHBpcnksIHNldFNlc3Npb25Kc29uV2l0aEV4cGlyeSB9IGZyb20gXCIuLi91dGlscy9zZXNzaW9uRXhwaXJ5LnRzXCI7XG5cbmNvbnN0IENSRUFURV9EUkFGVF9UVExfTVMgPSAyNCAqIDYwICogNjAgKiAxMDAwO1xuXG50eXBlIERyYWZ0U25hcHNob3QgPSB7XG4gIHNlbGVjdGVkQ2xpZW50OiBhbnk7XG4gIHNlbGVjdGVkQ29udGFjdHM6IGFueVtdO1xuICB2aXNpdFR5cGU6IHN0cmluZztcbiAgdHJhbnNEYXRlOiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIGNvbWVudGFyaW9zOiBzdHJpbmc7XG4gIGFudGVjZWRlbnRlczogc3RyaW5nO1xuICBjb25jbHVzaW9uZXM6IHN0cmluZztcbiAgc3RlcDogbnVtYmVyO1xufTtcblxudHlwZSBVc2VDcmVhdGVEcmFmdEFyZ3MgPSB7XG4gIGRyYWZ0U25hcHNob3Q6IERyYWZ0U25hcHNob3Q7XG4gIHNldFNlbGVjdGVkQ2xpZW50OiAodmFsdWU6IGFueSkgPT4gdm9pZDtcbiAgc2V0U2VsZWN0ZWRDb250YWN0czogKHZhbHVlOiBhbnlbXSkgPT4gdm9pZDtcbiAgc2V0VmlzaXRUeXBlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgc2V0VHJhbnNEYXRlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgc2V0RGVzY3JpcHRpb246ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBzZXRDb21lbnRhcmlvczogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHNldEFudGVjZWRlbnRlczogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHNldENvbmNsdXNpb25lczogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHNldFN0ZXA6ICh2YWx1ZTogbnVtYmVyKSA9PiB2b2lkO1xufTtcblxuLy8gSGFuZGxlcyB2aXNpdC1jcmVhdGUgZHJhZnQgc2F2ZS9yZXN0b3JlIGxpZmVjeWNsZS5cbmV4cG9ydCBjb25zdCB1c2VDcmVhdGVEcmFmdCA9ICh7XG4gIGRyYWZ0U25hcHNob3QsXG4gIHNldFNlbGVjdGVkQ2xpZW50LFxuICBzZXRTZWxlY3RlZENvbnRhY3RzLFxuICBzZXRWaXNpdFR5cGUsXG4gIHNldFRyYW5zRGF0ZSxcbiAgc2V0RGVzY3JpcHRpb24sXG4gIHNldENvbWVudGFyaW9zLFxuICBzZXRBbnRlY2VkZW50ZXMsXG4gIHNldENvbmNsdXNpb25lcyxcbiAgc2V0U3RlcCxcbn06IFVzZUNyZWF0ZURyYWZ0QXJncykgPT4ge1xuICBjb25zdCBkcmFmdFJlc3RvcmVkUmVmID0gdXNlUmVmKGZhbHNlKTtcbiAgY29uc3QgZHJhZnRQZXJzaXN0VGltZXJSZWYgPSB1c2VSZWY8bnVtYmVyIHwgbnVsbD4obnVsbCk7XG5cbiAgY29uc3QgcGVyc2lzdERyYWZ0U25hcHNob3QgPSB1c2VDYWxsYmFjaygoZHJhZnQ6IERyYWZ0U25hcHNob3QpID0+IHtcbiAgICBzZXRTZXNzaW9uSnNvbldpdGhFeHBpcnkoVklTSVRfRFJBRlRfS0VZLCBkcmFmdCwgQ1JFQVRFX0RSQUZUX1RUTF9NUyk7XG4gIH0sIFtdKTtcblxuICBjb25zdCBwZXJzaXN0RHJhZnROb3cgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgcGVyc2lzdERyYWZ0U25hcHNob3QoZHJhZnRTbmFwc2hvdCk7XG4gIH0sIFtkcmFmdFNuYXBzaG90LCBwZXJzaXN0RHJhZnRTbmFwc2hvdF0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFkcmFmdFJlc3RvcmVkUmVmLmN1cnJlbnQpIHJldHVybjtcblxuICAgIGlmIChkcmFmdFBlcnNpc3RUaW1lclJlZi5jdXJyZW50KSB7XG4gICAgICBjbGVhclRpbWVvdXQoZHJhZnRQZXJzaXN0VGltZXJSZWYuY3VycmVudCk7XG4gICAgfVxuXG4gICAgZHJhZnRQZXJzaXN0VGltZXJSZWYuY3VycmVudCA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGRyYWZ0UGVyc2lzdFRpbWVyUmVmLmN1cnJlbnQgPSBudWxsO1xuICAgICAgcGVyc2lzdERyYWZ0U25hcHNob3QoZHJhZnRTbmFwc2hvdCk7XG4gICAgfSwgMTgwKTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBpZiAoZHJhZnRQZXJzaXN0VGltZXJSZWYuY3VycmVudCkge1xuICAgICAgICBjbGVhclRpbWVvdXQoZHJhZnRQZXJzaXN0VGltZXJSZWYuY3VycmVudCk7XG4gICAgICAgIGRyYWZ0UGVyc2lzdFRpbWVyUmVmLmN1cnJlbnQgPSBudWxsO1xuICAgICAgfVxuICAgIH07XG4gIH0sIFtkcmFmdFNuYXBzaG90LCBwZXJzaXN0RHJhZnRTbmFwc2hvdF0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgbGV0IGZyZXNoTG9hZCA9IGZhbHNlO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB1cmwgPSBuZXcgVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcbiAgICAgIGZyZXNoTG9hZCA9IHVybC5zZWFyY2hQYXJhbXMuaGFzKENSRUFURV9GUkVTSF9QQVJBTSk7XG4gICAgfSBjYXRjaCB7XG4gICAgICBmcmVzaExvYWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoZnJlc2hMb2FkKSB7XG4gICAgICBjbGVhckNyZWF0ZVNlbGVjdGlvbkNhY2hlKCk7XG4gICAgICBzdHJpcEZyZXNoUGFyYW0oKTtcbiAgICAgIGRyYWZ0UmVzdG9yZWRSZWYuY3VycmVudCA9IHRydWU7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IHNob3VsZFNob3cgPSBmYWxzZTtcbiAgICB0cnkge1xuICAgICAgc2hvdWxkU2hvdyA9ICEhKFxuICAgICAgICBnZXRTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KFZJU0lUX0RSQUZUX0tFWSkgfHxcbiAgICAgICAgc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShDT05UQUNUU19TVE9SQUdFX0tFWSkgfHxcbiAgICAgICAgc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShDT05UQUNUU19TRUxFQ1RJT05fS0VZKVxuICAgICAgKTtcbiAgICB9IGNhdGNoIHtcbiAgICAgIC8vIElnbm9yZSBzdG9yYWdlIGFjY2VzcyBlcnJvcnMuXG4gICAgfVxuICAgIGlmIChzaG91bGRTaG93KSB7XG4gICAgICBzaG93R2xvYmFsU3Bpbm5lcihpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGRyYWZ0ID0gZ2V0U2Vzc2lvbkpzb25XaXRoRXhwaXJ5PERyYWZ0U25hcHNob3Q+KFZJU0lUX0RSQUZUX0tFWSk7XG4gICAgICBpZiAoZHJhZnQ/LnNlbGVjdGVkQ2xpZW50Py52YWx1ZSkgc2V0U2VsZWN0ZWRDbGllbnQoZHJhZnQuc2VsZWN0ZWRDbGllbnQpO1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZHJhZnQ/LnNlbGVjdGVkQ29udGFjdHMpKSBzZXRTZWxlY3RlZENvbnRhY3RzKGRyYWZ0LnNlbGVjdGVkQ29udGFjdHMpO1xuICAgICAgaWYgKGRyYWZ0Py52aXNpdFR5cGUgIT09IHVuZGVmaW5lZCkgc2V0VmlzaXRUeXBlKGRyYWZ0LnZpc2l0VHlwZSk7XG4gICAgICBpZiAoZHJhZnQ/LnRyYW5zRGF0ZSkgc2V0VHJhbnNEYXRlKGRyYWZ0LnRyYW5zRGF0ZSk7XG4gICAgICBpZiAoZHJhZnQ/LmRlc2NyaXB0aW9uICE9PSB1bmRlZmluZWQpIHNldERlc2NyaXB0aW9uKGRyYWZ0LmRlc2NyaXB0aW9uKTtcbiAgICAgIGlmIChkcmFmdD8uY29tZW50YXJpb3MgIT09IHVuZGVmaW5lZCkgc2V0Q29tZW50YXJpb3MoZHJhZnQuY29tZW50YXJpb3MpO1xuICAgICAgaWYgKGRyYWZ0Py5hbnRlY2VkZW50ZXMgIT09IHVuZGVmaW5lZCkgc2V0QW50ZWNlZGVudGVzKGRyYWZ0LmFudGVjZWRlbnRlcyk7XG4gICAgICBpZiAoZHJhZnQ/LmNvbmNsdXNpb25lcyAhPT0gdW5kZWZpbmVkKSBzZXRDb25jbHVzaW9uZXMoZHJhZnQuY29uY2x1c2lvbmVzKTtcbiAgICAgIGlmIChkcmFmdD8uc3RlcCA9PT0gMikgc2V0U3RlcCgyKTtcbiAgICB9IGNhdGNoIHtcbiAgICAgIC8vIElnbm9yZSBtYWxmb3JtZWQgZHJhZnQgcGF5bG9hZHMuXG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlmIChzaG91bGRTaG93KSB7XG4gICAgICAgIGhpZGVHbG9iYWxTcGlubmVyKCk7XG4gICAgICB9XG4gICAgfVxuICAgIGRyYWZ0UmVzdG9yZWRSZWYuY3VycmVudCA9IHRydWU7XG4gIH0sIFtcbiAgICBzZXRBbnRlY2VkZW50ZXMsXG4gICAgc2V0Q29tZW50YXJpb3MsXG4gICAgc2V0Q29uY2x1c2lvbmVzLFxuICAgIHNldERlc2NyaXB0aW9uLFxuICAgIHNldFNlbGVjdGVkQ2xpZW50LFxuICAgIHNldFNlbGVjdGVkQ29udGFjdHMsXG4gICAgc2V0U3RlcCxcbiAgICBzZXRUcmFuc0RhdGUsXG4gICAgc2V0VmlzaXRUeXBlLFxuICBdKTtcblxuICByZXR1cm4ge1xuICAgIHBlcnNpc3REcmFmdE5vdyxcbiAgfTtcbn07XG4iLCAiZXhwb3J0IGNvbnN0IHNob3dHbG9iYWxTcGlubmVyID0gKG1lc3NhZ2U/OiBzdHJpbmcpID0+IHtcbiAgdHJ5IHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2Ygd2luZG93Ll9faW5kU2hvd0dsb2JhbFNwaW5uZXIgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgd2luZG93Ll9faW5kU2hvd0dsb2JhbFNwaW5uZXIobWVzc2FnZSk7XG4gICAgfVxuICB9IGNhdGNoIHtcbiAgICAvLyBpZ25vcmVcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGhpZGVHbG9iYWxTcGlubmVyID0gKCkgPT4ge1xuICB0cnkge1xuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiB3aW5kb3cuX19pbmRIaWRlR2xvYmFsU3Bpbm5lciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICB3aW5kb3cuX19pbmRIaWRlR2xvYmFsU3Bpbm5lcigpO1xuICAgIH1cbiAgfSBjYXRjaCB7XG4gICAgLy8gaWdub3JlXG4gIH1cbn07XG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2sgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGZldGNoSnNvbiB9IGZyb20gXCIuLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XG5pbXBvcnQgeyBpbmRFeHRyYWN0SWQsIGluZEV4dHJhY3RTaWduZWRJZCB9IGZyb20gXCIuLi91dGlscy9pbmRJZHMudHNcIjtcbmltcG9ydCB7IGluZEZvcm1hdCwgaW5kVCB9IGZyb20gXCIuLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgeyBzaG93UGVybWlzc2lvbk1vZGFsIH0gZnJvbSBcIi4uL3V0aWxzL3Blcm1pc3Npb25zLnRzXCI7XG5pbXBvcnQgeyBmbGFzaEFjdGlvbk1hcmssIHNldEhpc3RvcnlGaWx0ZXJGb3JEYXRlIH0gZnJvbSBcIi4uL3V0aWxzL3Zpc2l0YXNIaXN0b3J5LnRzXCI7XG5pbXBvcnQgeyBWSVNJVF9EUkFGVF9LRVkgfSBmcm9tIFwiLi4vdXRpbHMvdmlzaXRhc1N0b3JhZ2UudHNcIjtcbmltcG9ydCB7IHdhaXQgfSBmcm9tIFwiLi4vdXRpbHMvd2FpdC50c1wiO1xuXG50eXBlIENvbnRhY3RPcHRpb24gPSB7XG4gIHZhbHVlOiBzdHJpbmc7XG4gIHRleHQ6IHN0cmluZztcbn07XG5cbnR5cGUgVXNlQ3JlYXRlU3VibWl0QXJncyA9IHtcbiAgYnVzeTogYm9vbGVhbjtcbiAgbW9kYWxPcGVuOiBib29sZWFuO1xuICBjYW5DcmVhdGVWaXNpdDogYm9vbGVhbjtcbiAgY2FuUm9sbGJhY2tEZWxldGU6IGJvb2xlYW47XG4gIHNlbGVjdGVkQ2xpZW50OiB7IHZhbHVlOiBzdHJpbmcgfSB8IG51bGw7XG4gIHNlbGVjdGVkQ29udGFjdHM6IENvbnRhY3RPcHRpb25bXTtcbiAgdmlzaXRUeXBlOiBzdHJpbmc7XG4gIGRlZmF1bHRBc2lzdGVudGVUaXBvOiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIHRyYW5zRGF0ZTogc3RyaW5nO1xuICBjb21lbnRhcmlvczogc3RyaW5nO1xuICBhbnRlY2VkZW50ZXM6IHN0cmluZztcbiAgY29uY2x1c2lvbmVzOiBzdHJpbmc7XG4gIHNldEJ1c3k6ICh2YWx1ZTogYm9vbGVhbikgPT4gdm9pZDtcbiAgc2V0U3RhdHVzOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgc2V0TW9kYWxFcnJvcjogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHNldFNob3dSZXF1aXJlZDogKHZhbHVlOiBib29sZWFuKSA9PiB2b2lkO1xuICBvcGVuQ29uZmlybTogKG9wdHM6IHtcbiAgICB0aXRsZTogc3RyaW5nO1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICBjb25maXJtVGV4dD86IHN0cmluZztcbiAgICBvbkNvbmZpcm0/OiAoKSA9PiBQcm9taXNlPGJvb2xlYW4gfCB2b2lkPiB8IGJvb2xlYW4gfCB2b2lkO1xuICB9KSA9PiB2b2lkO1xuICBjbG9zZUNvbmZpcm06ICgpID0+IHZvaWQ7XG59O1xuXG4vLyBPd25zIGNyZWF0ZS9jb25maXJtIGZsb3cgc28gZm9ybSBjb21wb25lbnQgc3RheXMgZm9jdXNlZCBvbiBVSSBmaWVsZHMuXG5leHBvcnQgY29uc3QgdXNlQ3JlYXRlU3VibWl0ID0gKHtcbiAgYnVzeSxcbiAgbW9kYWxPcGVuLFxuICBjYW5DcmVhdGVWaXNpdCxcbiAgY2FuUm9sbGJhY2tEZWxldGUsXG4gIHNlbGVjdGVkQ2xpZW50LFxuICBzZWxlY3RlZENvbnRhY3RzLFxuICB2aXNpdFR5cGUsXG4gIGRlZmF1bHRBc2lzdGVudGVUaXBvLFxuICBkZXNjcmlwdGlvbixcbiAgdHJhbnNEYXRlLFxuICBjb21lbnRhcmlvcyxcbiAgYW50ZWNlZGVudGVzLFxuICBjb25jbHVzaW9uZXMsXG4gIHNldEJ1c3ksXG4gIHNldFN0YXR1cyxcbiAgc2V0TW9kYWxFcnJvcixcbiAgc2V0U2hvd1JlcXVpcmVkLFxuICBvcGVuQ29uZmlybSxcbiAgY2xvc2VDb25maXJtLFxufTogVXNlQ3JlYXRlU3VibWl0QXJncykgPT4ge1xuICBjb25zdCBkb0NyZWF0ZSA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcbiAgICBpZiAoYnVzeSkgcmV0dXJuIGZhbHNlO1xuICAgIGlmICghY2FuQ3JlYXRlVmlzaXQpIHtcbiAgICAgIHNob3dQZXJtaXNzaW9uTW9kYWwoKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgc2V0TW9kYWxFcnJvcihcIlwiKTtcbiAgICBpZiAoIXNlbGVjdGVkQ2xpZW50KSB7XG4gICAgICBzZXRTdGF0dXMoaW5kVChcIlZpc2l0c19DcmVhdGVfU2VsZWN0Q2xpZW50UmVxdWlyZWRcIiwgXCJTZWxlY3QgYSBjbGllbnQuXCIpKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKFN0cmluZyh2aXNpdFR5cGUgfHwgXCJcIikgPT09IFwiXCIgfHwgU3RyaW5nKHZpc2l0VHlwZSkgPT09IFwiMFwiIHx8ICFkZXNjcmlwdGlvbi50cmltKCkgfHwgIWNvbWVudGFyaW9zLnRyaW0oKSkge1xuICAgICAgc2V0U2hvd1JlcXVpcmVkKHRydWUpO1xuICAgICAgc2V0U3RhdHVzKGluZFQoXCJWaXNpdHNfQ3JlYXRlX0NvbXBsZXRlUmVxdWlyZWRcIiwgXCJDb21wbGV0ZSByZXF1aXJlZCBmaWVsZHMuXCIpKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgc2V0QnVzeSh0cnVlKTtcbiAgICBzZXRTdGF0dXMoaW5kVChcIlZpc2l0c19DcmVhdGVfQ3JlYXRpbmdBY3Rpdml0eVwiLCBcIkNyZWF0aW5nIGFjdGl2aXR5Li4uXCIpKTtcblxuICAgIGxldCBjcmVhdGVkUmVjSWQgPSBcIlwiO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBwYXlsb2FkQWN0aXZpdHkgPSB7XG4gICAgICAgIGFjY291bnROdW06IHNlbGVjdGVkQ2xpZW50LnZhbHVlLFxuICAgICAgICB2aXNpdFR5cGUsXG4gICAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgICB0cmFuc0RhdGUsXG4gICAgICAgIGNvbWVudGFyaW9zLFxuICAgICAgICBhbnRlY2VkZW50ZXMsXG4gICAgICAgIGNvbmNsdXNpb25lcyxcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IHJlc0FjdCA9IGF3YWl0IGZldGNoSnNvbihcIi9WaXNpdGFzL0NyZWF0ZUFjdGl2aXR5XCIsIHtcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXlsb2FkQWN0aXZpdHkpLFxuICAgICAgfSk7XG5cbiAgICAgIGlmICghcmVzQWN0LnN1Y2Nlc3MpIHRocm93IG5ldyBFcnJvcihyZXNBY3QubWVzc2FnZSB8fCBpbmRUKFwiVmlzaXRzX0NyZWF0ZV9DcmVhdGVBY3Rpdml0eUZhaWxlZFwiLCBcIkZhaWxlZCB0byBjcmVhdGUgYWN0aXZpdHkuXCIpKTtcblxuICAgICAgY29uc3QgcmVjSWRBY3RpdmlkYWQgPVxuICAgICAgICBpbmRFeHRyYWN0U2lnbmVkSWQocmVzQWN0LmRhdGEpIHx8XG4gICAgICAgIGluZEV4dHJhY3RTaWduZWRJZChyZXNBY3QubWVzc2FnZSkgfHxcbiAgICAgICAgaW5kRXh0cmFjdFNpZ25lZElkKGluZEV4dHJhY3RJZChyZXNBY3QuZGF0YSkgfHwgaW5kRXh0cmFjdElkKHJlc0FjdC5tZXNzYWdlKSk7XG4gICAgICBpZiAoIXJlY0lkQWN0aXZpZGFkKSB0aHJvdyBuZXcgRXJyb3IoaW5kVChcIlZpc2l0c19DcmVhdGVfQ3JlYXRlQWN0aXZpdHlGYWlsZWRcIiwgXCJGYWlsZWQgdG8gY3JlYXRlIGFjdGl2aXR5LlwiKSk7XG4gICAgICBjcmVhdGVkUmVjSWQgPSBTdHJpbmcocmVjSWRBY3RpdmlkYWQpO1xuXG4gICAgICBpZiAoc2VsZWN0ZWRDb250YWN0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnN0IGFzc2lzdGFudEJhdGNoU2l6ZSA9IDQ7XG4gICAgICAgIGNvbnN0IGNyZWF0ZUFzc2lzdGFudCA9IGFzeW5jIChjb250YWN0OiBDb250YWN0T3B0aW9uKSA9PiB7XG4gICAgICAgICAgY29uc3QgcGF5bG9hZFZpc2l0YSA9IHtcbiAgICAgICAgICAgIHJlZlJlY0lkQWN0aXZpZGFkOiByZWNJZEFjdGl2aWRhZCxcbiAgICAgICAgICAgIGFzaXN0ZW50ZVRpcG86IGRlZmF1bHRBc2lzdGVudGVUaXBvLFxuICAgICAgICAgICAgYXNpc3RlbnRlSWQ6IGNvbnRhY3QudGV4dCxcbiAgICAgICAgICAgIGNvbnRhY3RvUmVjSWQ6IGNvbnRhY3QudmFsdWUsXG4gICAgICAgICAgfTtcbiAgICAgICAgICBjb25zdCByZXNWaXMgPSBhd2FpdCBmZXRjaEpzb24oXCIvVmlzaXRhcy9DcmVhdGVWaXNpdGFBc2lzdGVudGVcIiwge1xuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHBheWxvYWRWaXNpdGEpLFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGlmICghcmVzVmlzLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihyZXNWaXMubWVzc2FnZSB8fCBpbmRUKFwiVmlzaXRzX0NyZWF0ZV9DcmVhdGVWaXNpdEZhaWxlZFwiLCBcIkZhaWxlZCB0byBjcmVhdGUgdmlzaXQuXCIpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgZm9yIChsZXQgaWR4ID0gMDsgaWR4IDwgc2VsZWN0ZWRDb250YWN0cy5sZW5ndGg7IGlkeCArPSBhc3Npc3RhbnRCYXRjaFNpemUpIHtcbiAgICAgICAgICBjb25zdCBiYXRjaCA9IHNlbGVjdGVkQ29udGFjdHMuc2xpY2UoaWR4LCBpZHggKyBhc3Npc3RhbnRCYXRjaFNpemUpO1xuICAgICAgICAgIGNvbnN0IGZpcnN0ID0gYmF0Y2hbMF07XG4gICAgICAgICAgaWYgKGZpcnN0KSB7XG4gICAgICAgICAgICBzZXRTdGF0dXMoaW5kRm9ybWF0KFwiVmlzaXRzX0NyZWF0ZV9DcmVhdGluZ1Zpc2l0Rm9yXCIsIFwiQ3JlYXRpbmcgdmlzaXQgZm9yIHswfS4uLlwiLCBmaXJzdC50ZXh0KSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGF3YWl0IFByb21pc2UuYWxsKGJhdGNoLm1hcCgoY29udGFjdCkgPT4gY3JlYXRlQXNzaXN0YW50KGNvbnRhY3QpKSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdHJ5IHtcbiAgICAgICAgc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbShWSVNJVF9EUkFGVF9LRVkpO1xuICAgICAgfSBjYXRjaCB7XG4gICAgICAgIC8vIElnbm9yZSBzdG9yYWdlIGVycm9ycy5cbiAgICAgIH1cblxuICAgICAgc2V0SGlzdG9yeUZpbHRlckZvckRhdGUodHJhbnNEYXRlLCB0cnVlKTtcbiAgICAgIGNsb3NlQ29uZmlybSgpO1xuICAgICAgYXdhaXQgd2FpdCgyMDApO1xuICAgICAgZmxhc2hBY3Rpb25NYXJrKFwib2tQcm9jZXNzXCIsIDEyMDApO1xuICAgICAgYXdhaXQgd2FpdCgxMjAwKTtcbiAgICAgIHdpbmRvdy5fX2luZEJ5cGFzc05hdmlnYXRpb25HdWFyZE9uY2U/LigpO1xuICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9IaXN0b3JpYWwvSGlzdG9yeVwiO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBjYXRjaCAoZTogYW55KSB7XG4gICAgICBpZiAoY3JlYXRlZFJlY0lkICYmIGNhblJvbGxiYWNrRGVsZXRlKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgc2V0U3RhdHVzKGluZFQoXCJWaXNpdHNfQ3JlYXRlX1JvbGxiYWNrXCIsIFwiUm9sbGluZyBiYWNrIGFjdGl2aXR5Li4uXCIpKTtcbiAgICAgICAgICBhd2FpdCBmZXRjaEpzb24oYC9WaXNpdGFzL0RlbGV0ZUFjdGl2aXR5LyR7ZW5jb2RlVVJJQ29tcG9uZW50KGNyZWF0ZWRSZWNJZCl9YCwge1xuICAgICAgICAgICAgbWV0aG9kOiBcIkRFTEVURVwiLFxuICAgICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgIC8vIEtlZXAgb3JpZ2luYWwgZXJyb3IgZmxvdy5cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY29uc3QgbXNnID0gZT8ubWVzc2FnZSB8fCBpbmRUKFwiVmlzaXRzX0NyZWF0ZV9DcmVhdGVWaXNpdEVycm9yXCIsIFwiRmFpbGVkIHRvIGNyZWF0ZSB0aGUgdmlzaXQuXCIpO1xuICAgICAgc2V0TW9kYWxFcnJvcihtc2cpO1xuICAgICAgc2V0U3RhdHVzKG1zZyk7XG4gICAgICBmbGFzaEFjdGlvbk1hcmsoXCJlcnJvclByb2Nlc3NcIiwgMTUwMCk7XG4gICAgICBzZXRCdXN5KGZhbHNlKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0sIFtcbiAgICBhbnRlY2VkZW50ZXMsXG4gICAgYnVzeSxcbiAgICBjYW5DcmVhdGVWaXNpdCxcbiAgICBjYW5Sb2xsYmFja0RlbGV0ZSxcbiAgICBjbG9zZUNvbmZpcm0sXG4gICAgY29tZW50YXJpb3MsXG4gICAgY29uY2x1c2lvbmVzLFxuICAgIGRlZmF1bHRBc2lzdGVudGVUaXBvLFxuICAgIGRlc2NyaXB0aW9uLFxuICAgIHNlbGVjdGVkQ2xpZW50LFxuICAgIHNlbGVjdGVkQ29udGFjdHMsXG4gICAgc2V0QnVzeSxcbiAgICBzZXRNb2RhbEVycm9yLFxuICAgIHNldFNob3dSZXF1aXJlZCxcbiAgICBzZXRTdGF0dXMsXG4gICAgdHJhbnNEYXRlLFxuICAgIHZpc2l0VHlwZSxcbiAgXSk7XG5cbiAgY29uc3QgaGFuZGxlU3VibWl0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmIChidXN5KSByZXR1cm47XG4gICAgaWYgKCFjYW5DcmVhdGVWaXNpdCkge1xuICAgICAgc2hvd1Blcm1pc3Npb25Nb2RhbCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAobW9kYWxPcGVuKSByZXR1cm47XG4gICAgaWYgKCFzZWxlY3RlZENsaWVudCkge1xuICAgICAgc2V0U3RhdHVzKGluZFQoXCJWaXNpdHNfQ3JlYXRlX1NlbGVjdENsaWVudFJlcXVpcmVkXCIsIFwiU2VsZWN0IGEgY2xpZW50LlwiKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChTdHJpbmcodmlzaXRUeXBlIHx8IFwiXCIpID09PSBcIlwiIHx8IFN0cmluZyh2aXNpdFR5cGUpID09PSBcIjBcIiB8fCAhZGVzY3JpcHRpb24udHJpbSgpIHx8ICFjb21lbnRhcmlvcy50cmltKCkpIHtcbiAgICAgIHNldFNob3dSZXF1aXJlZCh0cnVlKTtcbiAgICAgIHNldFN0YXR1cyhpbmRUKFwiVmlzaXRzX0NyZWF0ZV9Db21wbGV0ZVJlcXVpcmVkXCIsIFwiQ29tcGxldGUgcmVxdWlyZWQgZmllbGRzLlwiKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHNldE1vZGFsRXJyb3IoXCJcIik7XG4gICAgb3BlbkNvbmZpcm0oe1xuICAgICAgdGl0bGU6IGluZFQoXCJWaXNpdHNfQ3JlYXRlX0NvbmZpcm1DcmVhdGVfVGl0bGVcIiwgXCJDb25maXJtIGNyZWF0ZVwiKSxcbiAgICAgIG1lc3NhZ2U6IGluZFQoXCJWaXNpdHNfQ3JlYXRlX0NvbmZpcm1DcmVhdGVfQm9keVwiLCBcIkRvIHlvdSB3YW50IHRvIGNyZWF0ZSB0aGlzIHZpc2l0P1wiKSxcbiAgICAgIGNvbmZpcm1UZXh0OiBpbmRUKFwiQ29uZmlybV9ZZXNcIiwgXCJPS1wiKSxcbiAgICAgIG9uQ29uZmlybTogZG9DcmVhdGUsXG4gICAgfSk7XG4gIH0sIFtcbiAgICBidXN5LFxuICAgIGNhbkNyZWF0ZVZpc2l0LFxuICAgIGNvbWVudGFyaW9zLFxuICAgIGRlc2NyaXB0aW9uLFxuICAgIGRvQ3JlYXRlLFxuICAgIG1vZGFsT3BlbixcbiAgICBvcGVuQ29uZmlybSxcbiAgICBzZWxlY3RlZENsaWVudCxcbiAgICBzZXRNb2RhbEVycm9yLFxuICAgIHNldFNob3dSZXF1aXJlZCxcbiAgICBzZXRTdGF0dXMsXG4gICAgdmlzaXRUeXBlLFxuICBdKTtcblxuICByZXR1cm4ge1xuICAgIGRvQ3JlYXRlLFxuICAgIGhhbmRsZVN1Ym1pdCxcbiAgfTtcbn07XG4iLCAiZXhwb3J0IGNvbnN0IGluZEV4dHJhY3RJZCA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZyA9PiB7XG4gIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gXCJcIjtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiB8fCB0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCIpIHJldHVybiBTdHJpbmcodmFsdWUpLnRyaW0oKTtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIikge1xuICAgIGNvbnN0IGNhbmRpZGF0ZSA9XG4gICAgICAodmFsdWUgYXMgYW55KS5yZWNJZCA/P1xuICAgICAgKHZhbHVlIGFzIGFueSkuUmVjSWQgPz9cbiAgICAgICh2YWx1ZSBhcyBhbnkpLmlkID8/XG4gICAgICAodmFsdWUgYXMgYW55KS5JZCA/P1xuICAgICAgKHZhbHVlIGFzIGFueSkudmFsdWUgPz9cbiAgICAgICh2YWx1ZSBhcyBhbnkpLlZhbHVlO1xuICAgIGlmICh0eXBlb2YgY2FuZGlkYXRlID09PSBcInN0cmluZ1wiIHx8IHR5cGVvZiBjYW5kaWRhdGUgPT09IFwibnVtYmVyXCIpIHJldHVybiBTdHJpbmcoY2FuZGlkYXRlKS50cmltKCk7XG4gIH1cbiAgcmV0dXJuIFwiXCI7XG59O1xuXG5leHBvcnQgY29uc3QgaW5kRXh0cmFjdE51bWVyaWNJZCA9ICh2YWx1ZTogdW5rbm93biwgZGVwdGggPSAwKTogc3RyaW5nID0+IHtcbiAgaWYgKGRlcHRoID4gMykgcmV0dXJuIFwiXCI7XG4gIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gXCJcIjtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIiAmJiBOdW1iZXIuaXNGaW5pdGUodmFsdWUpKSByZXR1cm4gU3RyaW5nKE1hdGgudHJ1bmModmFsdWUpKTtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikge1xuICAgIGNvbnN0IHJhdyA9IHZhbHVlLnRyaW0oKTtcbiAgICBpZiAoIXJhdykgcmV0dXJuIFwiXCI7XG4gICAgaWYgKC9eXFxkKyQvLnRlc3QocmF3KSkgcmV0dXJuIHJhdztcbiAgICBjb25zdCBtID0gcmF3Lm1hdGNoKC8oXFxkezMsfSkvKTtcbiAgICByZXR1cm4gbSA/IG1bMV0gOiBcIlwiO1xuICB9XG4gIGlmICh0eXBlb2YgdmFsdWUgIT09IFwib2JqZWN0XCIpIHJldHVybiBcIlwiO1xuICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgdmFsdWUpIHtcbiAgICAgIGNvbnN0IGZvdW5kID0gaW5kRXh0cmFjdE51bWVyaWNJZChpdGVtLCBkZXB0aCArIDEpO1xuICAgICAgaWYgKGZvdW5kKSByZXR1cm4gZm91bmQ7XG4gICAgfVxuICAgIHJldHVybiBcIlwiO1xuICB9XG5cbiAgY29uc3Qga2V5cyA9IFtcbiAgICBcInJlY0lkXCIsXG4gICAgXCJSZWNJZFwiLFxuICAgIFwicmVmUmVjSWRBY3RpdmlkYWRcIixcbiAgICBcIlJlZlJlY0lkQWN0aXZpZGFkXCIsXG4gICAgXCJhY3RpdmlkYWRSZWNJZFwiLFxuICAgIFwiQWN0aXZpZGFkUmVjSWRcIixcbiAgICBcImlkXCIsXG4gICAgXCJJZFwiLFxuICAgIFwidmFsdWVcIixcbiAgICBcIlZhbHVlXCIsXG4gICAgXCJyZXN1bHRcIixcbiAgICBcIlJlc3VsdFwiLFxuICAgIFwiZGF0YVwiLFxuICAgIFwiRGF0YVwiLFxuICAgIFwibWVzc2FnZVwiLFxuICAgIFwiTWVzc2FnZVwiLFxuICBdO1xuXG4gIGZvciAoY29uc3QgayBvZiBrZXlzKSB7XG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgaykpIHtcbiAgICAgIGNvbnN0IGZvdW5kID0gaW5kRXh0cmFjdE51bWVyaWNJZCgodmFsdWUgYXMgYW55KVtrXSwgZGVwdGggKyAxKTtcbiAgICAgIGlmIChmb3VuZCkgcmV0dXJuIGZvdW5kO1xuICAgIH1cbiAgfVxuXG4gIGZvciAoY29uc3QgdiBvZiBPYmplY3QudmFsdWVzKHZhbHVlIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+KSkge1xuICAgIGNvbnN0IGZvdW5kID0gaW5kRXh0cmFjdE51bWVyaWNJZCh2LCBkZXB0aCArIDEpO1xuICAgIGlmIChmb3VuZCkgcmV0dXJuIGZvdW5kO1xuICB9XG5cbiAgcmV0dXJuIFwiXCI7XG59O1xuXG5leHBvcnQgY29uc3QgaW5kRXh0cmFjdFNpZ25lZElkID0gKHZhbHVlOiB1bmtub3duLCBkZXB0aCA9IDApOiBzdHJpbmcgPT4ge1xuICBpZiAoZGVwdGggPiAzKSByZXR1cm4gXCJcIjtcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHJldHVybiBcIlwiO1xuICBpZiAodHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiICYmIE51bWJlci5pc0Zpbml0ZSh2YWx1ZSkpIHJldHVybiBTdHJpbmcoTWF0aC50cnVuYyh2YWx1ZSkpO1xuICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XG4gICAgY29uc3QgcmF3ID0gdmFsdWUudHJpbSgpO1xuICAgIGlmICghcmF3KSByZXR1cm4gXCJcIjtcbiAgICBjb25zdCBtYXRjaCA9IHJhdy5tYXRjaCgvLT9cXGR7Myx9Lyk7XG4gICAgcmV0dXJuIG1hdGNoID8gbWF0Y2hbMF0gOiBcIlwiO1xuICB9XG4gIGlmICh0eXBlb2YgdmFsdWUgIT09IFwib2JqZWN0XCIpIHJldHVybiBcIlwiO1xuICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgdmFsdWUpIHtcbiAgICAgIGNvbnN0IGZvdW5kID0gaW5kRXh0cmFjdFNpZ25lZElkKGl0ZW0sIGRlcHRoICsgMSk7XG4gICAgICBpZiAoZm91bmQpIHJldHVybiBmb3VuZDtcbiAgICB9XG4gICAgcmV0dXJuIFwiXCI7XG4gIH1cblxuICBjb25zdCBrZXlzID0gW1xuICAgIFwicmVjSWRcIixcbiAgICBcIlJlY0lkXCIsXG4gICAgXCJyZWZSZWNJZEFjdGl2aWRhZFwiLFxuICAgIFwiUmVmUmVjSWRBY3RpdmlkYWRcIixcbiAgICBcImFjdGl2aWRhZFJlY0lkXCIsXG4gICAgXCJBY3RpdmlkYWRSZWNJZFwiLFxuICAgIFwibWVzc2FnZVwiLFxuICAgIFwiTWVzc2FnZVwiLFxuICAgIFwicmVzdWx0XCIsXG4gICAgXCJSZXN1bHRcIixcbiAgICBcImRhdGFcIixcbiAgICBcIkRhdGFcIixcbiAgXTtcblxuICBmb3IgKGNvbnN0IGsgb2Yga2V5cykge1xuICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodmFsdWUsIGspKSB7XG4gICAgICBjb25zdCBmb3VuZCA9IGluZEV4dHJhY3RTaWduZWRJZCgodmFsdWUgYXMgYW55KVtrXSwgZGVwdGggKyAxKTtcbiAgICAgIGlmIChmb3VuZCkgcmV0dXJuIGZvdW5kO1xuICAgIH1cbiAgfVxuXG4gIGZvciAoY29uc3QgdiBvZiBPYmplY3QudmFsdWVzKHZhbHVlIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+KSkge1xuICAgIGNvbnN0IGZvdW5kID0gaW5kRXh0cmFjdFNpZ25lZElkKHYsIGRlcHRoICsgMSk7XG4gICAgaWYgKGZvdW5kKSByZXR1cm4gZm91bmQ7XG4gIH1cblxuICByZXR1cm4gXCJcIjtcbn07XG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlSWQsIHVzZU1lbW8sIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IFhNYXJrSWNvbiB9IGZyb20gXCJAaGVyb2ljb25zL3JlYWN0LzIwL3NvbGlkXCI7XG5pbXBvcnQgRmxvYXRpbmdMaXN0IGZyb20gXCIuLi9jb21tb25zL0Zsb2F0aW5nTGlzdC50c3hcIjtcbmltcG9ydCBTcGlubmVyIGZyb20gXCIuLi9jb21tb25zL1NwaW5uZXIudHN4XCI7XG5pbXBvcnQgeyBDaGV2cm9uRG93blN2ZywgQ2hldnJvblVwU3ZnIH0gZnJvbSBcIi4uL2NvbW1vbnMvY2hldnJvbnMudHN4XCI7XG5pbXBvcnQgeyBmZXRjaEpzb24gfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvYXBpU2VydmljZS50c1wiO1xuaW1wb3J0IHsgdXNlT3V0c2lkZUNsaWNrIH0gZnJvbSBcIi4uLy4uL2hvb2tzL3VzZU91dHNpZGVDbGljay50c1wiO1xuaW1wb3J0IHsgY2xhc3NOYW1lcyB9IGZyb20gXCIuLi8uLi91dGlscy9jbGFzc05hbWVzLnRzXCI7XG5pbXBvcnQgeyBpbmRGb3JtYXQsIGluZFQgfSBmcm9tIFwiLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuaW1wb3J0IHsgaXNOb0RhdGFSb3csIGlzTm9EYXRhVGV4dCB9IGZyb20gXCIuLi8uLi91dGlscy9ub0RhdGEudHNcIjtcbmltcG9ydCB7IGdldENhY2hlZENvbnRhY3RzLCBzZXRDYWNoZWRDb250YWN0cywgZ2V0U3RvcmVkU2VsZWN0aW9uLCBzZXRTdG9yZWRTZWxlY3Rpb24sIGNsZWFyU3RvcmVkU2VsZWN0aW9uIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Zpc2l0YXNTdG9yYWdlLnRzXCI7XG5cbnR5cGUgQ29udGFjdE9wdGlvbiA9IHtcbiAgdmFsdWU6IHN0cmluZztcbiAgdGV4dDogc3RyaW5nO1xuICBjYXJnbzogc3RyaW5nO1xuICBlbXByZXNhOiBzdHJpbmc7XG59O1xuXG50eXBlIENvbnRhY3RzQ29tYm9ib3hQcm9wcyA9IHtcbiAgYWNjb3VudE51bT86IHN0cmluZztcbiAgdmFsdWU/OiBDb250YWN0T3B0aW9uW107XG4gIG9uQ2hhbmdlOiAodmFsdWU6IENvbnRhY3RPcHRpb25bXSkgPT4gdm9pZDtcbiAgcG9ydGFsQ2xhc3NOYW1lPzogc3RyaW5nO1xuICBwYW5lbENsYXNzTmFtZT86IHN0cmluZztcbn07XG5cbi8vIE11bHRpLXNlbGVjdCBjb250YWN0cyBjb21ib2JveCB0aWVkIHRvIHRoZSBzZWxlY3RlZCBjbGllbnQuXG5jb25zdCBDb250YWN0c0NvbWJvYm94ID0gKHsgYWNjb3VudE51bSwgdmFsdWUgPSBbXSwgb25DaGFuZ2UsIHBvcnRhbENsYXNzTmFtZSwgcGFuZWxDbGFzc05hbWUgfTogQ29udGFjdHNDb21ib2JveFByb3BzKSA9PiB7XG4gIGNvbnN0IFtxdWVyeSwgc2V0UXVlcnldID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtvcHRpb25zLCBzZXRPcHRpb25zXSA9IHVzZVN0YXRlPENvbnRhY3RPcHRpb25bXT4oW10pO1xuICBjb25zdCBbc2VsZWN0ZWQsIHNldFNlbGVjdGVkXSA9IHVzZVN0YXRlPENvbnRhY3RPcHRpb25bXT4odmFsdWUpO1xuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtsb2FkaW5nTW9yZSwgc2V0TG9hZGluZ01vcmVdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbc3RhdHVzLCBzZXRTdGF0dXNdID0gdXNlU3RhdGUoaW5kVChcIlZpc2l0c19DcmVhdGVfU2VsZWN0Q2xpZW50Rmlyc3RcIiwgXCJTZWxlY3QgYSBjbGllbnQgZmlyc3QuXCIpKTtcbiAgY29uc3QgW2hhc0xvYWRlZCwgc2V0SGFzTG9hZGVkXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW29wZW4sIHNldE9wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbcGFnZSwgc2V0UGFnZV0gPSB1c2VTdGF0ZSgxKTtcbiAgY29uc3QgW2hhc01vcmUsIHNldEhhc01vcmVdID0gdXNlU3RhdGUodHJ1ZSk7XG4gIGNvbnN0IFtibG9ja2luZywgc2V0QmxvY2tpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbYWN0aXZlSW5kZXgsIHNldEFjdGl2ZUluZGV4XSA9IHVzZVN0YXRlKDApO1xuICBjb25zdCBsaXN0UmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IGJveFJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBhYm9ydFJlZiA9IHVzZVJlZjxBYm9ydENvbnRyb2xsZXIgfCBudWxsPihudWxsKTtcbiAgY29uc3QgY29udGFpbmVyUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IGlucHV0UmVmID0gdXNlUmVmPEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgbGFzdEFjY291bnRSZWYgPSB1c2VSZWYoYWNjb3VudE51bSB8fCBcIlwiKTtcbiAgY29uc3Qgb25DaGFuZ2VSZWYgPSB1c2VSZWYob25DaGFuZ2UpO1xuICBjb25zdCBpZEJhc2UgPSB1c2VJZCgpO1xuICBjb25zdCBpbnB1dElkID0gYCR7aWRCYXNlfS1jb250YWN0cy1pbnB1dGA7XG4gIGNvbnN0IGxpc3RJZCA9IGAke2lkQmFzZX0tY29udGFjdHMtb3B0aW9uc2A7XG5cbiAgdXNlT3V0c2lkZUNsaWNrKFtjb250YWluZXJSZWYsIGxpc3RSZWZdLCAoKSA9PiBzZXRPcGVuKGZhbHNlKSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBvbkNoYW5nZVJlZi5jdXJyZW50ID0gb25DaGFuZ2U7XG4gIH0sIFtvbkNoYW5nZV0pO1xuXG4gIGNvbnN0IGlzU2FtZVNlbGVjdGlvbiA9IChhOiBDb250YWN0T3B0aW9uW10gPSBbXSwgYjogQ29udGFjdE9wdGlvbltdID0gW10pID0+IHtcbiAgICBpZiAoYS5sZW5ndGggIT09IGIubGVuZ3RoKSByZXR1cm4gZmFsc2U7XG4gICAgY29uc3QgYXMgPSBhLm1hcCgoeCkgPT4gU3RyaW5nKHgudmFsdWUpKS5zb3J0KCk7XG4gICAgY29uc3QgYnMgPSBiLm1hcCgoeCkgPT4gU3RyaW5nKHgudmFsdWUpKS5zb3J0KCk7XG4gICAgcmV0dXJuIGFzLmV2ZXJ5KCh2LCBpKSA9PiB2ID09PSBic1tpXSk7XG4gIH07XG5cbiAgLy8gU3luYyBpbnRlcm5hbCBzZWxlY3Rpb24gd2l0aCB0aGUgcHJvcCAoZHJhZnQvY2FjaGUgcmVzdG9yZSkuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFpc1NhbWVTZWxlY3Rpb24odmFsdWUgfHwgW10sIHNlbGVjdGVkKSkge1xuICAgICAgc2V0U2VsZWN0ZWQodmFsdWUgfHwgW10pO1xuICAgIH1cbiAgfSwgW3ZhbHVlXSk7XG5cbiAgY29uc3QgY2FuY2VsUGVuZGluZyA9ICgpID0+IHtcbiAgICBpZiAoYWJvcnRSZWYuY3VycmVudCkge1xuICAgICAgYWJvcnRSZWYuY3VycmVudC5hYm9ydCgpO1xuICAgICAgYWJvcnRSZWYuY3VycmVudCA9IG51bGw7XG4gICAgfVxuICB9O1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGlmIChhYm9ydFJlZi5jdXJyZW50KSB7XG4gICAgICAgIGFib3J0UmVmLmN1cnJlbnQuYWJvcnQoKTtcbiAgICAgICAgYWJvcnRSZWYuY3VycmVudCA9IG51bGw7XG4gICAgICB9XG4gICAgfTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IHByaW1lRnJvbUNhY2hlID0gKCkgPT4ge1xuICAgIGNvbnN0IGNhY2hlZCA9IGdldENhY2hlZENvbnRhY3RzKGFjY291bnROdW0pIGFzIENvbnRhY3RPcHRpb25bXSB8IG51bGw7XG4gICAgaWYgKGNhY2hlZCkge1xuICAgICAgc2V0T3B0aW9ucyhjYWNoZWQpO1xuICAgICAgc2V0SGFzTG9hZGVkKHRydWUpO1xuICAgICAgc2V0SGFzTW9yZShjYWNoZWQubGVuZ3RoID09PSAxMCk7XG4gICAgICBzZXRTdGF0dXMoXG4gICAgICAgIGNhY2hlZC5sZW5ndGhcbiAgICAgICAgICA/IGluZEZvcm1hdChcIlZpc2l0c19DcmVhdGVfQ29udGFjdENvdW50Q2FjaGVcIiwgXCJ7MH0gY29udGFjdHMgKGNhY2hlKVwiLCBjYWNoZWQubGVuZ3RoKVxuICAgICAgICAgIDogaW5kVChcIlZpc2l0c19DcmVhdGVfTm9Db250YWN0c1wiLCBcIk5vIGNvbnRhY3RzXCIpXG4gICAgICApO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNhbmNlbFBlbmRpbmcoKTtcbiAgICBzZXRRdWVyeShcIlwiKTtcbiAgICBzZXRPcGVuKGZhbHNlKTtcbiAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICBzZXRCbG9ja2luZyhmYWxzZSk7XG4gICAgc2V0TG9hZGluZ01vcmUoZmFsc2UpO1xuICAgIHNldEFjdGl2ZUluZGV4KDApO1xuICAgIHNldFBhZ2UoMSk7XG4gICAgc2V0SGFzTW9yZSh0cnVlKTtcblxuICAgIGlmICghYWNjb3VudE51bSkge1xuICAgICAgc2V0T3B0aW9ucyhbXSk7XG4gICAgICBzZXRTZWxlY3RlZChbXSk7XG4gICAgICBvbkNoYW5nZVJlZi5jdXJyZW50KFtdKTtcbiAgICAgIHNldFN0YXR1cyhpbmRUKFwiVmlzaXRzX0NyZWF0ZV9TZWxlY3RDbGllbnRGaXJzdFwiLCBcIlNlbGVjdCBhIGNsaWVudCBmaXJzdC5cIikpO1xuICAgICAgc2V0SGFzTG9hZGVkKGZhbHNlKTtcbiAgICAgIGNsZWFyU3RvcmVkU2VsZWN0aW9uKGxhc3RBY2NvdW50UmVmLmN1cnJlbnQpO1xuICAgICAgbGFzdEFjY291bnRSZWYuY3VycmVudCA9IFwiXCI7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgY2hhbmdlZCA9IGxhc3RBY2NvdW50UmVmLmN1cnJlbnQgJiYgbGFzdEFjY291bnRSZWYuY3VycmVudCAhPT0gYWNjb3VudE51bTtcbiAgICBpZiAoY2hhbmdlZCkge1xuICAgICAgc2V0U2VsZWN0ZWQoW10pO1xuICAgICAgb25DaGFuZ2VSZWYuY3VycmVudChbXSk7XG4gICAgICBjbGVhclN0b3JlZFNlbGVjdGlvbihsYXN0QWNjb3VudFJlZi5jdXJyZW50KTtcbiAgICB9XG5cbiAgICBjb25zdCB1c2VkQ2FjaGUgPSBwcmltZUZyb21DYWNoZSgpO1xuICAgIGlmICghdXNlZENhY2hlKSB7XG4gICAgICBzZXRPcHRpb25zKFtdKTtcbiAgICAgIHNldEhhc0xvYWRlZChmYWxzZSk7XG4gICAgICBzZXRTdGF0dXMoaW5kVChcIlZpc2l0c19DcmVhdGVfUHJlc3NBcnJvd1RvTG9hZENvbnRhY3RzXCIsIFwiUHJlc3MgQXJyb3dEb3duIHRvIGxvYWQgY29udGFjdHMuXCIpKTtcbiAgICB9XG5cbiAgICBjb25zdCBzdG9yZWRTZWxlY3Rpb24gPSBnZXRTdG9yZWRTZWxlY3Rpb24oYWNjb3VudE51bSkgYXMgQ29udGFjdE9wdGlvbltdO1xuICAgIGlmIChzdG9yZWRTZWxlY3Rpb24ubGVuZ3RoICYmICF2YWx1ZT8ubGVuZ3RoKSB7XG4gICAgICBzZXRTZWxlY3RlZChzdG9yZWRTZWxlY3Rpb24pO1xuICAgICAgb25DaGFuZ2VSZWYuY3VycmVudChzdG9yZWRTZWxlY3Rpb24pO1xuICAgIH1cblxuICAgIGxhc3RBY2NvdW50UmVmLmN1cnJlbnQgPSBhY2NvdW50TnVtO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC1ob29rcy9leGhhdXN0aXZlLWRlcHNcbiAgfSwgW2FjY291bnROdW1dKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIG9uQ2hhbmdlUmVmLmN1cnJlbnQoc2VsZWN0ZWQpO1xuICAgIGlmIChhY2NvdW50TnVtKSBzZXRTdG9yZWRTZWxlY3Rpb24oYWNjb3VudE51bSwgc2VsZWN0ZWQpO1xuICB9LCBbc2VsZWN0ZWQsIGFjY291bnROdW1dKTtcblxuICBjb25zdCBtYXBDb250YWN0cyA9IChpdGVtczogdW5rbm93bltdID0gW10pID0+XG4gICAgaXRlbXNcbiAgICAgIC5tYXAoKGM6IGFueSkgPT4ge1xuICAgICAgICBpZiAoaXNOb0RhdGFSb3coYykpIHJldHVybiBudWxsO1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShjKSkgcmV0dXJuIG51bGw7XG4gICAgICAgIGNvbnN0IHJlY0lkID0gKGMucmVjSWQgfHwgYy5SZWNJZCB8fCBcIlwiKS50b1N0cmluZygpLnRyaW0oKTtcbiAgICAgICAgY29uc3QgbmFtZSA9IChjLm5hbWUgfHwgYy5OYW1lIHx8IFwiXCIpLnRvU3RyaW5nKCkudHJpbSgpO1xuICAgICAgICBjb25zdCBjYXJnbyA9IChjLmNhcmdvIHx8IGMuQ2FyZ28gfHwgXCJcIikudG9TdHJpbmcoKS50cmltKCk7XG4gICAgICAgIGNvbnN0IGVtcHJlc2EgPSAoYy5lbXByZXNhIHx8IGMuRW1wcmVzYSB8fCBcIlwiKS50b1N0cmluZygpLnRyaW0oKTtcbiAgICAgICAgaWYgKCFyZWNJZCB8fCBpc05vRGF0YVRleHQobmFtZSkpIHJldHVybiBudWxsO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHZhbHVlOiByZWNJZCxcbiAgICAgICAgICB0ZXh0OiBuYW1lLnRvVXBwZXJDYXNlKCksXG4gICAgICAgICAgY2FyZ286IGNhcmdvLnRvVXBwZXJDYXNlKCksXG4gICAgICAgICAgZW1wcmVzYTogZW1wcmVzYS50b1VwcGVyQ2FzZSgpLFxuICAgICAgICB9IGFzIENvbnRhY3RPcHRpb247XG4gICAgICB9KVxuICAgICAgLmZpbHRlcihCb29sZWFuKSBhcyBDb250YWN0T3B0aW9uW107XG5cbiAgY29uc3QgbG9hZCA9IGFzeW5jIChwYWdlVG9Mb2FkID0gMSwgYXBwZW5kID0gZmFsc2UpID0+IHtcbiAgICBpZiAoIWFjY291bnROdW0pIHJldHVybjtcbiAgICBpZiAobG9hZGluZyB8fCBsb2FkaW5nTW9yZSkgcmV0dXJuO1xuICAgIGNhbmNlbFBlbmRpbmcoKTtcblxuICAgIGlmICghYXBwZW5kKSB7XG4gICAgICBzZXRMb2FkaW5nKHRydWUpO1xuICAgICAgc2V0QmxvY2tpbmcodHJ1ZSk7XG4gICAgICBpZiAocGFnZVRvTG9hZCA9PT0gMSkgc2V0U3RhdHVzKGluZFQoXCJWaXNpdHNfQ3JlYXRlX0xvYWRpbmdDb250YWN0c1wiLCBcIkxvYWRpbmcgY29udGFjdHMuLi5cIikpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZXRMb2FkaW5nTW9yZSh0cnVlKTtcbiAgICAgIHNldEJsb2NraW5nKHRydWUpO1xuICAgIH1cblxuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XG4gICAgYWJvcnRSZWYuY3VycmVudCA9IGNvbnRyb2xsZXI7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoSnNvbihcbiAgICAgICAgYC9WaXNpdGFzL0dldENvbnRhY3RzRm9yRHJvcGRvd24/YWNjb3VudE51bT0ke2VuY29kZVVSSUNvbXBvbmVudChhY2NvdW50TnVtKX0mcGFnZT0ke3BhZ2VUb0xvYWR9JnBhZ2VTaXplPTEwYCxcbiAgICAgICAgeyBzaWduYWw6IGNvbnRyb2xsZXIuc2lnbmFsIH1cbiAgICAgICk7XG4gICAgICBjb25zdCBtYXBwZWQgPSBtYXBDb250YWN0cyhyZXMuaXRlbXMgfHwgW10pO1xuICAgICAgc2V0T3B0aW9ucygocHJldikgPT4ge1xuICAgICAgICBjb25zdCBuZXh0ID0gYXBwZW5kID8gWy4uLnByZXYsIC4uLm1hcHBlZF0gOiBtYXBwZWQ7XG4gICAgICAgIHNldENhY2hlZENvbnRhY3RzKGFjY291bnROdW0sIG5leHQpO1xuICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgIH0pO1xuICAgICAgc2V0SGFzTG9hZGVkKHRydWUpO1xuICAgICAgc2V0SGFzTW9yZShtYXBwZWQubGVuZ3RoID09PSAxMCk7XG4gICAgICBzZXRQYWdlKHBhZ2VUb0xvYWQpO1xuICAgICAgc2V0U3RhdHVzKG1hcHBlZC5sZW5ndGggPyBpbmRGb3JtYXQoXCJWaXNpdHNfQ3JlYXRlX0NvbnRhY3RDb3VudFwiLCBcInswfSBjb250YWN0c1wiLCBtYXBwZWQubGVuZ3RoKSA6IGluZFQoXCJWaXNpdHNfQ3JlYXRlX05vQ29udGFjdHNcIiwgXCJObyBjb250YWN0c1wiKSk7XG4gICAgfSBjYXRjaCB7XG4gICAgICBzZXRTdGF0dXMoaW5kVChcIlZpc2l0c19DcmVhdGVfTG9hZENvbnRhY3RzRXJyb3JcIiwgXCJGYWlsZWQgdG8gbG9hZCBjb250YWN0cy5cIikpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBhYm9ydFJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgICAgc2V0TG9hZGluZ01vcmUoZmFsc2UpO1xuICAgICAgc2V0QmxvY2tpbmcoZmFsc2UpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBlbnN1cmVMb2FkZWQgPSAoKSA9PiB7XG4gICAgaWYgKCFhY2NvdW50TnVtKSByZXR1cm47XG4gICAgaWYgKGhhc0xvYWRlZCAmJiBvcHRpb25zLmxlbmd0aCkgcmV0dXJuO1xuICAgIGlmIChwcmltZUZyb21DYWNoZSgpKSByZXR1cm47XG4gICAgbG9hZCgxLCBmYWxzZSk7XG4gIH07XG5cbiAgY29uc3QgbG9hZE1vcmVDb250YWN0cyA9IFJlYWN0LnVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoIWFjY291bnROdW0gfHwgIWhhc01vcmUgfHwgbG9hZGluZ01vcmUgfHwgbG9hZGluZykgcmV0dXJuO1xuICAgIGxvYWQocGFnZSArIDEsIHRydWUpO1xuICB9LCBbYWNjb3VudE51bSwgaGFzTW9yZSwgbG9hZGluZ01vcmUsIGxvYWRpbmcsIHBhZ2VdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghb3BlbiB8fCAhbGlzdFJlZi5jdXJyZW50KSByZXR1cm47XG4gICAgY29uc3QgZWwgPSBsaXN0UmVmLmN1cnJlbnQ7XG4gICAgY29uc3Qgb25TY3JvbGwgPSAoKSA9PiB7XG4gICAgICBpZiAoZWwuc2Nyb2xsVG9wICsgZWwuY2xpZW50SGVpZ2h0ID49IGVsLnNjcm9sbEhlaWdodCAtIDgpIGxvYWRNb3JlQ29udGFjdHMoKTtcbiAgICB9O1xuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgb25TY3JvbGwsIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcbiAgICByZXR1cm4gKCkgPT4gZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBvblNjcm9sbCk7XG4gIH0sIFtvcGVuLCBsb2FkTW9yZUNvbnRhY3RzXSk7XG5cbiAgY29uc3Qgc2VsZWN0ZWRWYWx1ZXMgPSB1c2VNZW1vKCgpID0+IHtcbiAgICByZXR1cm4gbmV3IFNldCgoc2VsZWN0ZWQgfHwgW10pLm1hcCgocykgPT4gU3RyaW5nKHMudmFsdWUpKSk7XG4gIH0sIFtzZWxlY3RlZF0pO1xuXG4gIGNvbnN0IGF2YWlsYWJsZU9wdGlvbnMgPSB1c2VNZW1vKCgpID0+IHtcbiAgICAvLyBIaWRlIGFscmVhZHkgc2VsZWN0ZWQgY29udGFjdHMgZnJvbSB0aGUgZHJvcGRvd24gbGlzdC5cbiAgICByZXR1cm4gKG9wdGlvbnMgfHwgW10pLmZpbHRlcigobykgPT4gIXNlbGVjdGVkVmFsdWVzLmhhcyhTdHJpbmcoby52YWx1ZSkpKTtcbiAgfSwgW29wdGlvbnMsIHNlbGVjdGVkVmFsdWVzXSk7XG5cbiAgY29uc3QgZmlsdGVyZWQgPSB1c2VNZW1vKCgpID0+IHtcbiAgICBjb25zdCBxID0gcXVlcnkudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKCFxKSByZXR1cm4gYXZhaWxhYmxlT3B0aW9ucztcbiAgICBjb25zdCBmID0gYXZhaWxhYmxlT3B0aW9ucy5maWx0ZXIoXG4gICAgICAobykgPT4gby50ZXh0LnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMocSkgfHwgby5jYXJnby50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHEpIHx8IG8uZW1wcmVzYS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHEpXG4gICAgKTtcbiAgICByZXR1cm4gZi5sZW5ndGggPyBmIDogYXZhaWxhYmxlT3B0aW9ucztcbiAgfSwgW2F2YWlsYWJsZU9wdGlvbnMsIHF1ZXJ5XSk7XG4gIGNvbnN0IGFjdGl2ZUlkID0gb3BlbiAmJiBmaWx0ZXJlZFthY3RpdmVJbmRleF0gPyBgJHtpZEJhc2V9LWNvbnRhY3Qtb3B0LSR7ZmlsdGVyZWRbYWN0aXZlSW5kZXhdLnZhbHVlfWAgOiB1bmRlZmluZWQ7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBzZXRBY3RpdmVJbmRleCgwKTtcbiAgfSwgW2ZpbHRlcmVkLmxlbmd0aCwgcXVlcnldKTtcblxuICBjb25zdCB0b2dnbGVPcHRpb24gPSAob3B0OiBDb250YWN0T3B0aW9uKSA9PiB7XG4gICAgc2V0U2VsZWN0ZWQoKHByZXYpID0+IHtcbiAgICAgIGNvbnN0IGV4aXN0cyA9IHByZXYuc29tZSgocCkgPT4gcC52YWx1ZSA9PT0gb3B0LnZhbHVlKTtcbiAgICAgIGlmIChleGlzdHMpIHJldHVybiBwcmV2LmZpbHRlcigocCkgPT4gcC52YWx1ZSAhPT0gb3B0LnZhbHVlKTtcbiAgICAgIHJldHVybiBbLi4ucHJldiwgb3B0XTtcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVLZXlEb3duID0gKGV2OiBSZWFjdC5LZXlib2FyZEV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+KSA9PiB7XG4gICAgaWYgKGV2LmtleSA9PT0gXCJBcnJvd0Rvd25cIikge1xuICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHNldE9wZW4odHJ1ZSk7XG4gICAgICBlbnN1cmVMb2FkZWQoKTtcbiAgICAgIGlmIChmaWx0ZXJlZC5sZW5ndGgpIHNldEFjdGl2ZUluZGV4KChpZHgpID0+IChpZHggKyAxKSAlIGZpbHRlcmVkLmxlbmd0aCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChldi5rZXkgPT09IFwiQXJyb3dVcFwiKSB7XG4gICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgc2V0T3Blbih0cnVlKTtcbiAgICAgIGVuc3VyZUxvYWRlZCgpO1xuICAgICAgaWYgKGZpbHRlcmVkLmxlbmd0aCkgc2V0QWN0aXZlSW5kZXgoKGlkeCkgPT4gKGlkeCAtIDEgKyBmaWx0ZXJlZC5sZW5ndGgpICUgZmlsdGVyZWQubGVuZ3RoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGV2LmtleSA9PT0gXCJFbnRlclwiKSB7XG4gICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgaWYgKG9wZW4gJiYgZmlsdGVyZWQubGVuZ3RoKSB7XG4gICAgICAgIHRvZ2dsZU9wdGlvbihmaWx0ZXJlZFthY3RpdmVJbmRleF0gPz8gZmlsdGVyZWRbMF0pO1xuICAgICAgfSBlbHNlIGlmIChhY2NvdW50TnVtKSB7XG4gICAgICAgIGVuc3VyZUxvYWRlZCgpO1xuICAgICAgICBzZXRPcGVuKHRydWUpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZXYua2V5ID09PSBcIkVzY2FwZVwiKSBzZXRPcGVuKGZhbHNlKTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yXCIgcmVmPXtjb250YWluZXJSZWZ9PlxuICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZFwiIGh0bWxGb3I9e2lucHV0SWR9PlxuICAgICAgICB7aW5kVChcIlZpc2l0c19DcmVhdGVfU2VhcmNoQ29udGFjdFwiLCBcIlNlYXJjaCBjb250YWN0XCIpfVxuICAgICAgPC9sYWJlbD5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmVcIj5cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICByZWY9e2JveFJlZn1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInJlbGF0aXZlIHctZnVsbCBjdXJzb3ItZGVmYXVsdCByb3VuZGVkLVs1cHhdIGJvcmRlci1zbGF0ZS0zMDAgYmctd2hpdGUgdGV4dC1sZWZ0IHNoYWRvdy14cyBmb2N1cy13aXRoaW46Ym9yZGVyLXByaW1hcnkgZm9jdXMtd2l0aGluOnJpbmctMiBmb2N1cy13aXRoaW46cmluZy1wcmltYXJ5IGZvY3VzLXdpdGhpbjpyaW5nLW9mZnNldC0wIHNtOnRleHQtc21cIlxuICAgICAgICAgID5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC13cmFwIGdhcC0xIHB4LTMgcHktMiBtaW4taC0xMFwiPlxuICAgICAgICAgICAge3NlbGVjdGVkLm1hcCgoYykgPT4gKFxuICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgIGtleT17Yy52YWx1ZX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSByb3VuZGVkLW1kIGJnLXByaW1hcnkvMTAgdGV4dC1zbGF0ZS03MDAgcHgtMiBweS0xIHRleHQteHNcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge2MudGV4dH1cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFNlbGVjdGVkKChwcmV2KSA9PiBwcmV2LmZpbHRlcigocykgPT4gcy52YWx1ZSAhPT0gYy52YWx1ZSkpfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS03MDAgaG92ZXI6dGV4dC1zbGF0ZS03MDAvODBcIlxuICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17aW5kVChcIkNvbW1vbl9EZWxldGVcIiwgXCJEZWxldGVcIil9XG4gICAgICAgICAgICAgICAgICB0aXRsZT17aW5kVChcIkNvbW1vbl9EZWxldGVcIiwgXCJEZWxldGVcIil9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPFhNYXJrSWNvbiBjbGFzc05hbWU9XCJoLTQgdy00XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgLz5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgaWQ9e2lucHV0SWR9XG4gICAgICAgICAgICAgIG5hbWU9e2Ake2lkQmFzZX0tY29udGFjdHMtcXVlcnlgfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4LTEgbWluLXctMzAgYmctdHJhbnNwYXJlbnQgdGV4dC1zbSBzbTp0ZXh0LWJhc2UgbGVhZGluZy01IHRleHQtc2xhdGUtOTAwIGJvcmRlci1ub25lIG91dGxpbmUtaGlkZGVuIHB4LTEgcHktMSBmb2N1czpyaW5nLTAgZm9jdXM6Ym9yZGVyLXRyYW5zcGFyZW50XCJcbiAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gc2V0UXVlcnkoZXZlbnQudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgb25LZXlEb3duPXtoYW5kbGVLZXlEb3dufVxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17c2VsZWN0ZWQubGVuZ3RoID8gXCJcIiA6IGluZFQoXCJWaXNpdHNfQ3JlYXRlX0ZpbHRlclBsYWNlaG9sZGVyXCIsIFwiVHlwZSB0byBmaWx0ZXIuLi5cIil9XG4gICAgICAgICAgICAgIGF1dG9Db21wbGV0ZT1cIm9mZlwiXG4gICAgICAgICAgICAgIHJlZj17aW5wdXRSZWZ9XG4gICAgICAgICAgICAgIHJlYWRPbmx5PXshYWNjb3VudE51bX1cbiAgICAgICAgICAgICAgcm9sZT1cImNvbWJvYm94XCJcbiAgICAgICAgICAgICAgYXJpYS1leHBhbmRlZD17b3Blbn1cbiAgICAgICAgICAgICAgYXJpYS1jb250cm9scz17bGlzdElkfVxuICAgICAgICAgICAgICBhcmlhLWFjdGl2ZWRlc2NlbmRhbnQ9e2FjdGl2ZUlkfVxuICAgICAgICAgICAgICBhcmlhLWF1dG9jb21wbGV0ZT1cImxpc3RcIlxuICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtpbmRUKFwiVmlzaXRzX0NyZWF0ZV9TZWFyY2hDb250YWN0XCIsIFwiU2VhcmNoIGNvbnRhY3RcIil9XG4gICAgICAgICAgICAgIG9uRm9jdXM9eygpID0+IHtcbiAgICAgICAgICAgICAgICBlbnN1cmVMb2FkZWQoKTtcbiAgICAgICAgICAgICAgICBzZXRPcGVuKHRydWUpO1xuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIHsobG9hZGluZyB8fCBibG9ja2luZykgJiYgKFxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC15LTAgcmlnaHQtOSBmbGV4IGl0ZW1zLWNlbnRlclwiPlxuICAgICAgICAgICAgICAgIDxTcGlubmVyIC8+XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC15LTAgcmlnaHQtMCBmbGV4IGl0ZW1zLWNlbnRlciBwci0yIHRleHQtc2xhdGUtNTAwIGhvdmVyOnRleHQtc2xhdGUtNjAwXCJcbiAgICAgICAgICAgIGFyaWEtbGFiZWw9e29wZW4gPyBpbmRUKFwiRHJvcGRvd25fSGlkZU9wdGlvbnNcIiwgXCJIaWRlIG9wdGlvbnNcIikgOiBpbmRUKFwiRHJvcGRvd25fU2hvd09wdGlvbnNcIiwgXCJTaG93IG9wdGlvbnNcIil9XG4gICAgICAgICAgICBhcmlhLWV4cGFuZGVkPXtvcGVufVxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoIWFjY291bnROdW0pIHJldHVybjtcbiAgICAgICAgICAgICAgaWYgKG9wZW4pIHtcbiAgICAgICAgICAgICAgICBzZXRPcGVuKGZhbHNlKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBlbnN1cmVMb2FkZWQoKTtcbiAgICAgICAgICAgICAgICBzZXRPcGVuKHRydWUpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtvcGVuID8gPENoZXZyb25VcFN2ZyBjbGFzc05hbWU9XCJoLTUgdy01XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgLz4gOiA8Q2hldnJvbkRvd25TdmcgY2xhc3NOYW1lPVwiaC01IHctNVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIC8+fVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8RmxvYXRpbmdMaXN0XG4gICAgICAgICAgICBhbmNob3JSZWY9e2JveFJlZn1cbiAgICAgICAgICAgIG9wZW49e29wZW59XG4gICAgICAgICAgICB6SW5kZXg9ezM4MDAwMH1cbiAgICAgICAgICAgIG1heEhlaWdodENsYXNzPVwibWF4LWgtNzJcIlxuICAgICAgICAgICAgcm9sZT1cImxpc3Rib3hcIlxuICAgICAgICAgICAgcm91bmRlZENsYXNzPVwicm91bmRlZC1bNXB4XVwiXG4gICAgICAgICAgICBwb3J0YWxDbGFzc05hbWU9e3BvcnRhbENsYXNzTmFtZX1cbiAgICAgICAgICAgIHBhbmVsQ2xhc3NOYW1lPXtwYW5lbENsYXNzTmFtZX1cbiAgICAgICAgICA+XG4gICAgICAgICAgPGRpdiByZWY9e2xpc3RSZWZ9IGlkPXtsaXN0SWR9IGFyaWEtbXVsdGlzZWxlY3RhYmxlPVwidHJ1ZVwiPlxuICAgICAgICAgICAge2xvYWRpbmcgJiYgKFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHB4LTQgcHktMiB0ZXh0LXNtIHRleHQtc2xhdGUtNTAwXCI+XG4gICAgICAgICAgICAgICAgPFNwaW5uZXIgc2l6ZT1cImgtNCB3LTRcIiAvPlxuICAgICAgICAgICAgICAgIHtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICB7IWxvYWRpbmcgJiYgb3B0aW9ucy5sZW5ndGggPT09IDAgJiYgKFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB4LTQgcHktMiB0ZXh0LXNtIHRleHQtc2xhdGUtNTAwXCI+XG4gICAgICAgICAgICAgICAge2hhc0xvYWRlZCA/IGluZFQoXCJWaXNpdHNfQ3JlYXRlX05vQ29udGFjdHNcIiwgXCJObyBjb250YWN0c1wiKSA6IGluZFQoXCJWaXNpdHNfQ3JlYXRlX1NlbGVjdENsaWVudEZpcnN0XCIsIFwiU2VsZWN0IGEgY2xpZW50IGZpcnN0LlwiKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgeyFsb2FkaW5nICYmIG9wdGlvbnMubGVuZ3RoID4gMCAmJiBmaWx0ZXJlZC5sZW5ndGggPT09IDAgJiYgKFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB4LTQgcHktMiB0ZXh0LXNtIHRleHQtc2xhdGUtNTAwXCI+XG4gICAgICAgICAgICAgICAge3F1ZXJ5LnRyaW0oKSA/IGluZFQoXCJWaXNpdHNfQ3JlYXRlX05vTWF0Y2hlc1wiLCBcIk5vIG1hdGNoZXNcIikgOiBpbmRUKFwiVmlzaXRzX0NyZWF0ZV9Ob01vcmVDb250YWN0c1wiLCBcIk5vIG1vcmUgY29udGFjdHMgYXZhaWxhYmxlXCIpfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICB7IWxvYWRpbmcgJiZcbiAgICAgICAgICAgICAgZmlsdGVyZWQubWFwKChvcHQsIGlkeCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNlbCA9IHNlbGVjdGVkLnNvbWUoKHMpID0+IHMudmFsdWUgPT09IG9wdC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgY29uc3QgaXNBY3RpdmUgPSBpZHggPT09IGFjdGl2ZUluZGV4O1xuICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICBrZXk9e29wdC52YWx1ZX1cbiAgICAgICAgICAgICAgICAgICAgaWQ9e2Ake2lkQmFzZX0tY29udGFjdC1vcHQtJHtvcHQudmFsdWV9YH1cbiAgICAgICAgICAgICAgICAgICAgcm9sZT1cIm9wdGlvblwiXG4gICAgICAgICAgICAgICAgICAgIGFyaWEtc2VsZWN0ZWQ9e3NlbH1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAgICAgICAgICAgICAgIFwicmVsYXRpdmUgZmxleCB3LWZ1bGwgY3Vyc29yLWRlZmF1bHQgc2VsZWN0LW5vbmUgaXRlbXMtc3RhcnQgcHktMiBweC0zIHRleHQtbGVmdCB0ZXh0LXNtXCIsXG4gICAgICAgICAgICAgICAgICAgICAgaXNBY3RpdmUgPyBcImJnLXByaW1hcnkgdGV4dC13aGl0ZVwiIDogc2VsID8gXCJiZy1wcmltYXJ5LzEwIHRleHQtcHJpbWFyeVwiIDogXCJ0ZXh0LXNsYXRlLTkwMFwiXG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgIG9uTW91c2VFbnRlcj17KCkgPT4gc2V0QWN0aXZlSW5kZXgoaWR4KX1cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gdG9nZ2xlT3B0aW9uKG9wdCl9XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgZmxleCBmbGV4LWNvbCBnYXAtMC41IHByLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXCJibG9jayB0cnVuY2F0ZVwiLCBzZWwgPyBcImZvbnQtbWVkaXVtXCIgOiBcImZvbnQtbm9ybWFsXCIpfT57b3B0LnRleHR9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImJsb2NrIHRleHQteHMgdGV4dC1zbGF0ZS02MDAgdHJ1bmNhdGVcIj57b3B0LmNhcmdvfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIHtibG9ja2luZyAmJiAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCB6LTcwMDAwIGJnLXdoaXRlLzcwIGJhY2tkcm9wLWJsdXItWzFweF0gZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcm91bmRlZC1bNXB4XVwiPlxuICAgICAgICAgICAgICAgIDxTcGlubmVyIHNpemU9XCJoLTYgdy02XCIgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvRmxvYXRpbmdMaXN0PlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBmbGV4IGp1c3RpZnktZW5kXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS01MDAgdGVjaC1pbmZvXCI+e3N0YXR1c308L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbnRhY3RzQ29tYm9ib3g7XG4iLCAiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5mdW5jdGlvbiBYTWFya0ljb24oe1xuICB0aXRsZSxcbiAgdGl0bGVJZCxcbiAgLi4ucHJvcHNcbn0sIHN2Z1JlZikge1xuICByZXR1cm4gLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzdmdcIiwgT2JqZWN0LmFzc2lnbih7XG4gICAgeG1sbnM6IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIixcbiAgICB2aWV3Qm94OiBcIjAgMCAyMCAyMFwiLFxuICAgIGZpbGw6IFwiY3VycmVudENvbG9yXCIsXG4gICAgXCJhcmlhLWhpZGRlblwiOiBcInRydWVcIixcbiAgICBcImRhdGEtc2xvdFwiOiBcImljb25cIixcbiAgICByZWY6IHN2Z1JlZixcbiAgICBcImFyaWEtbGFiZWxsZWRieVwiOiB0aXRsZUlkXG4gIH0sIHByb3BzKSwgdGl0bGUgPyAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChcInRpdGxlXCIsIHtcbiAgICBpZDogdGl0bGVJZFxuICB9LCB0aXRsZSkgOiBudWxsLCAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChcInBhdGhcIiwge1xuICAgIGQ6IFwiTTYuMjggNS4yMmEuNzUuNzUgMCAwIDAtMS4wNiAxLjA2TDguOTQgMTBsLTMuNzIgMy43MmEuNzUuNzUgMCAxIDAgMS4wNiAxLjA2TDEwIDExLjA2bDMuNzIgMy43MmEuNzUuNzUgMCAxIDAgMS4wNi0xLjA2TDExLjA2IDEwbDMuNzItMy43MmEuNzUuNzUgMCAwIDAtMS4wNi0xLjA2TDEwIDguOTQgNi4yOCA1LjIyWlwiXG4gIH0pKTtcbn1cbmNvbnN0IEZvcndhcmRSZWYgPSAvKiNfX1BVUkVfXyovIFJlYWN0LmZvcndhcmRSZWYoWE1hcmtJY29uKTtcbmV4cG9ydCBkZWZhdWx0IEZvcndhcmRSZWY7IiwgIlx1RkVGRmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBDbGllbnRTZWFyY2hDb21ib2JveCBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy92aXNpdGFzL0NsaWVudFNlYXJjaENvbWJvYm94LnRzeFwiO1xuaW1wb3J0IENvbnRhY3RzQ29tYm9ib3ggZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvdmlzaXRhcy9Db250YWN0c0NvbWJvYm94LnRzeFwiO1xuXG5leHBvcnQgdHlwZSBDcmVhdGVTZWxlY3RlZENsaWVudCA9IHtcbiAgdmFsdWU6IHN0cmluZztcbiAgdGV4dDogc3RyaW5nO1xuICBjYXJnbz86IHN0cmluZztcbiAgZW1wcmVzYT86IHN0cmluZztcbn0gfCBudWxsO1xuXG5leHBvcnQgdHlwZSBDcmVhdGVTZWxlY3RlZENvbnRhY3QgPSB7XG4gIHZhbHVlOiBzdHJpbmc7XG4gIHRleHQ6IHN0cmluZztcbiAgY2FyZ286IHN0cmluZztcbiAgZW1wcmVzYTogc3RyaW5nO1xufTtcblxudHlwZSBDcmVhdGVTdGVwQ2xpZW50U2VsZWN0aW9uUHJvcHMgPSB7XG4gIHNlbGVjdGVkQ2xpZW50OiBDcmVhdGVTZWxlY3RlZENsaWVudDtcbiAgc2VsZWN0ZWRDb250YWN0czogQ3JlYXRlU2VsZWN0ZWRDb250YWN0W107XG4gIG9uQ2xpZW50U2VsZWN0ZWQ6IChuZXh0Q2xpZW50OiBDcmVhdGVTZWxlY3RlZENsaWVudCkgPT4gdm9pZDtcbiAgb25Db250YWN0c0NoYW5nZTogKG5leHRDb250YWN0czogQ3JlYXRlU2VsZWN0ZWRDb250YWN0W10pID0+IHZvaWQ7XG4gIGNsaWVudExhYmVsOiBzdHJpbmc7XG4gIGNsaWVudFBsYWNlaG9sZGVyOiBzdHJpbmc7XG4gIHNlbGVjdGVkQ29udGFjdHNDb3VudFRleHQ6IHN0cmluZztcbn07XG5cbi8vIFJlbmRlcnMgc3RlcCAxIHdoZXJlIHVzZXIgc2VsZWN0cyB0aGUgYWNjb3VudCBhbmQgcmVsYXRlZCBjb250YWN0cy5cbmNvbnN0IENyZWF0ZVN0ZXBDbGllbnRTZWxlY3Rpb24gPSAoe1xuICBzZWxlY3RlZENsaWVudCxcbiAgc2VsZWN0ZWRDb250YWN0cyxcbiAgb25DbGllbnRTZWxlY3RlZCxcbiAgb25Db250YWN0c0NoYW5nZSxcbiAgY2xpZW50TGFiZWwsXG4gIGNsaWVudFBsYWNlaG9sZGVyLFxuICBzZWxlY3RlZENvbnRhY3RzQ291bnRUZXh0LFxufTogQ3JlYXRlU3RlcENsaWVudFNlbGVjdGlvblByb3BzKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTZcIj5cbiAgICAgIDxDbGllbnRTZWFyY2hDb21ib2JveFxuICAgICAgICB2YWx1ZT17c2VsZWN0ZWRDbGllbnR9XG4gICAgICAgIG9uU2VsZWN0ZWQ9e29uQ2xpZW50U2VsZWN0ZWR9XG4gICAgICAgIGxhYmVsPXtjbGllbnRMYWJlbH1cbiAgICAgICAgcGxhY2Vob2xkZXI9e2NsaWVudFBsYWNlaG9sZGVyfVxuICAgICAgICBwb3J0YWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxuICAgICAgLz5cblxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTNcIj5cbiAgICAgICAgPENvbnRhY3RzQ29tYm9ib3hcbiAgICAgICAgICBhY2NvdW50TnVtPXtzZWxlY3RlZENsaWVudD8udmFsdWV9XG4gICAgICAgICAgdmFsdWU9e3NlbGVjdGVkQ29udGFjdHN9XG4gICAgICAgICAgb25DaGFuZ2U9e29uQ29udGFjdHNDaGFuZ2V9XG4gICAgICAgICAgcG9ydGFsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcbiAgICAgICAgLz5cbiAgICAgICAge3NlbGVjdGVkQ29udGFjdHMubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNjAwXCI+XG4gICAgICAgICAgICB7c2VsZWN0ZWRDb250YWN0c0NvdW50VGV4dH1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQ3JlYXRlU3RlcENsaWVudFNlbGVjdGlvbjtcclxuIiwgIlx1RkVGRmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBTaW5nbGVEYXRlUGlja2VyIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvU2luZ2xlRGF0ZVBpY2tlci50c3hcIjtcbmltcG9ydCBTZWxlY3RDb21ib2JveCBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NlbGVjdENvbWJvYm94LnRzeFwiO1xuaW1wb3J0IFZpc2l0TmFycmF0aXZlRmllbGRzIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL3Zpc2l0YXMvVmlzaXROYXJyYXRpdmVGaWVsZHMudHN4XCI7XG5cbnR5cGUgU2VsZWN0T3B0aW9uID0ge1xuICB2YWx1ZT86IHN0cmluZyB8IG51bWJlcjtcbiAgVmFsdWU/OiBzdHJpbmcgfCBudW1iZXI7XG4gIHRleHQ/OiBzdHJpbmc7XG4gIFRleHQ/OiBzdHJpbmc7XG59O1xuXG50eXBlIE5hcnJhdGl2ZVRhcEZpZWxkID0ge1xuICBpZDogc3RyaW5nO1xuICBsYWJlbDogc3RyaW5nO1xuICB2YWx1ZTogc3RyaW5nO1xuICBjbGFzc05hbWU6IHN0cmluZztcbiAgcG9pbnRlckJpbmRpbmdzOiB7XG4gICAgb25Qb2ludGVyRG93bj86IFJlYWN0LlBvaW50ZXJFdmVudEhhbmRsZXI8SFRNTFRleHRBcmVhRWxlbWVudD47XG4gICAgb25Qb2ludGVyTW92ZT86IFJlYWN0LlBvaW50ZXJFdmVudEhhbmRsZXI8SFRNTFRleHRBcmVhRWxlbWVudD47XG4gICAgb25Qb2ludGVyVXA/OiBSZWFjdC5Qb2ludGVyRXZlbnRIYW5kbGVyPEhUTUxUZXh0QXJlYUVsZW1lbnQ+O1xuICAgIG9uUG9pbnRlckNhbmNlbD86IFJlYWN0LlBvaW50ZXJFdmVudEhhbmRsZXI8SFRNTFRleHRBcmVhRWxlbWVudD47XG4gIH07XG59O1xuXG50eXBlIENyZWF0ZVN0ZXBWaXNpdERldGFpbHNQcm9wcyA9IHtcbiAgdGl0bGU6IHN0cmluZztcbiAgZGF0ZUxhYmVsOiBzdHJpbmc7XG4gIHRyYW5zRGF0ZTogc3RyaW5nO1xuICBvblRyYW5zRGF0ZUNoYW5nZTogKG5leHRWYWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICB2aXNpdFR5cGVMYWJlbDogc3RyaW5nO1xuICB2aXNpdFR5cGVzOiBTZWxlY3RPcHRpb25bXTtcbiAgdmlzaXRUeXBlOiBzdHJpbmc7XG4gIG9uVmlzaXRUeXBlQ2hhbmdlOiAobmV4dFZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHZpc2l0VHlwZVBsYWNlaG9sZGVyOiBzdHJpbmc7XG4gIHZpc2l0VHlwZUludmFsaWQ6IGJvb2xlYW47XG4gIGRlc2NyaXB0aW9uTGFiZWw6IHN0cmluZztcbiAgZGVzY3JpcHRpb25WYWx1ZTogc3RyaW5nO1xuICBkZXNjcmlwdGlvbkNsYXNzTmFtZTogc3RyaW5nO1xuICBvbkRlc2NyaXB0aW9uQ2hhbmdlOiAobmV4dFZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHRhcEZpZWxkczogTmFycmF0aXZlVGFwRmllbGRbXTtcbiAgc3RhdHVzOiBzdHJpbmc7XG59O1xuXG4vLyBSZW5kZXJzIHN0ZXAgMiB3aXRoIHZpc2l0IG1ldGFkYXRhIGFuZCBuYXJyYXRpdmUgZmllbGRzLlxuY29uc3QgQ3JlYXRlU3RlcFZpc2l0RGV0YWlscyA9ICh7XG4gIHRpdGxlLFxuICBkYXRlTGFiZWwsXG4gIHRyYW5zRGF0ZSxcbiAgb25UcmFuc0RhdGVDaGFuZ2UsXG4gIHZpc2l0VHlwZUxhYmVsLFxuICB2aXNpdFR5cGVzLFxuICB2aXNpdFR5cGUsXG4gIG9uVmlzaXRUeXBlQ2hhbmdlLFxuICB2aXNpdFR5cGVQbGFjZWhvbGRlcixcbiAgdmlzaXRUeXBlSW52YWxpZCxcbiAgZGVzY3JpcHRpb25MYWJlbCxcbiAgZGVzY3JpcHRpb25WYWx1ZSxcbiAgZGVzY3JpcHRpb25DbGFzc05hbWUsXG4gIG9uRGVzY3JpcHRpb25DaGFuZ2UsXG4gIHRhcEZpZWxkcyxcbiAgc3RhdHVzLFxufTogQ3JlYXRlU3RlcFZpc2l0RGV0YWlsc1Byb3BzKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzaGFkb3cteHMgZ2xhc3MtcGFuZWwgcC00IHNwYWNlLXktNCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCByb3VuZGVkLTJ4bFwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWJhc2UgZm9udC1zZW1pYm9sZCB0ZXh0LXNsYXRlLTkwMCBib3JkZXItYiBib3JkZXItc2xhdGUtMjAwIHBiLTNcIj5cbiAgICAgICAge3RpdGxlfVxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTIgZ2FwLTRcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ2aXNpdGEtZmllbGQtdGV4dFwiPlxuICAgICAgICAgIDxTaW5nbGVEYXRlUGlja2VyIGxhYmVsPXtkYXRlTGFiZWx9IHZhbHVlPXt0cmFuc0RhdGV9IG9uQ2hhbmdlPXtvblRyYW5zRGF0ZUNoYW5nZX0gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxTZWxlY3RDb21ib2JveFxuICAgICAgICAgIGxhYmVsPXt2aXNpdFR5cGVMYWJlbH1cbiAgICAgICAgICBvcHRpb25zPXt2aXNpdFR5cGVzfVxuICAgICAgICAgIHZhbHVlPXt2aXNpdFR5cGV9XG4gICAgICAgICAgb25DaGFuZ2U9eyhuZXh0VmFsdWUpID0+IG9uVmlzaXRUeXBlQ2hhbmdlKFN0cmluZyhuZXh0VmFsdWUgPz8gXCJcIikpfVxuICAgICAgICAgIHBsYWNlaG9sZGVyPXt2aXNpdFR5cGVQbGFjZWhvbGRlcn1cbiAgICAgICAgICBpbnZhbGlkPXt2aXNpdFR5cGVJbnZhbGlkfVxuICAgICAgICAgIGVtaXRPblZhbHVlQ2hhbmdlXG4gICAgICAgICAgcG9ydGFsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8VmlzaXROYXJyYXRpdmVGaWVsZHNcbiAgICAgICAgZGVzY3JpcHRpb25MYWJlbD17ZGVzY3JpcHRpb25MYWJlbH1cbiAgICAgICAgZGVzY3JpcHRpb25WYWx1ZT17ZGVzY3JpcHRpb25WYWx1ZX1cbiAgICAgICAgZGVzY3JpcHRpb25DbGFzc05hbWU9e2Rlc2NyaXB0aW9uQ2xhc3NOYW1lfVxuICAgICAgICBvbkRlc2NyaXB0aW9uQ2hhbmdlPXtvbkRlc2NyaXB0aW9uQ2hhbmdlfVxuICAgICAgICB0YXBGaWVsZHM9e3RhcEZpZWxkc31cbiAgICAgIC8+XG5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTNcIj5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LXNsYXRlLTUwMFwiPntzdGF0dXN9PC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDcmVhdGVTdGVwVmlzaXREZXRhaWxzO1xyXG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IENyZWF0ZUZvcm0gZnJvbSBcIi4vQ3JlYXRlRm9ybS50c3hcIjtcbmltcG9ydCBWaXNpdGFzUGFnZVByb3ZpZGVycyBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1Zpc2l0YXNQYWdlUHJvdmlkZXJzLnRzeFwiO1xuaW1wb3J0IHsgbW91bnRSZWFjdElzbGFuZCwgbW91bnRXaGVuRG9jdW1lbnRSZWFkeSB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9yZWFjdElzbGFuZC50c3hcIjtcblxuLy8gUGFnZSBlbnRyeSBmb3IgdGhlIHZpc2l0YXMgY3JlYXRlIGlzbGFuZC5cbmNvbnN0IENyZWF0ZVBhZ2UgPSAoKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPFZpc2l0YXNQYWdlUHJvdmlkZXJzPlxuICAgICAgPENyZWF0ZUZvcm0gLz5cbiAgICA8L1Zpc2l0YXNQYWdlUHJvdmlkZXJzPlxuICApO1xufTtcblxuY29uc3QgbW91bnQgPSAoKSA9PiB7XG4gIGNvbnN0IHJvb3RFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlzaXRhcy1hcHAtcm9vdFwiKTtcbiAgaWYgKCFyb290RWwpIHJldHVybjtcblxuICBtb3VudFJlYWN0SXNsYW5kKHJvb3RFbCwgPENyZWF0ZVBhZ2UgLz4pO1xufTtcblxubW91bnRXaGVuRG9jdW1lbnRSZWFkeShtb3VudCk7XG5cbmV4cG9ydCBkZWZhdWx0IENyZWF0ZVBhZ2U7XG4iXSwKICAibWFwcGluZ3Mi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V0FBVztBQUFBLFlBQ1gsaUJBQWlCO0FBQUEsVUFDbkI7QUFBQSxVQUNBO0FBQUEsWUFDRSxJQUFJO0FBQUEsWUFDSixPQUFPO0FBQUEsWUFDUCxPQUFPO0FBQUEsWUFDUCxXQUFXO0FBQUEsWUFDWCxpQkFBaUI7QUFBQSxVQUNuQjtBQUFBLFFBQ0Y7QUFBQSxRQUNBO0FBQUE7QUFBQSxJQUNGO0FBQUEsS0FFSjtBQUVKO0FBR2UsU0FBUixhQUE4QjtBQUNuQyxTQUNFLDZDQUFDLDRCQUFpQixpQkFBaUIsS0FBSywrQkFBK0IsMEVBQTBFLEdBQy9JLHVEQUFDLGNBQVcsR0FDZDtBQUVKOzs7QVV2WU0sSUFBQUMsc0JBQUE7QUFITixJQUFNLGFBQWEsTUFBTTtBQUN2QixTQUNFLDZDQUFDLGdDQUNDLHVEQUFDLGNBQVcsR0FDZDtBQUVKO0FBRUEsSUFBTSxRQUFRLE1BQU07QUFDbEIsUUFBTSxTQUFTLFNBQVMsZUFBZSxrQkFBa0I7QUFDekQsTUFBSSxDQUFDLE9BQVE7QUFFYixtQkFBaUIsUUFBUSw2Q0FBQyxjQUFXLENBQUU7QUFDekM7QUFFQSx1QkFBdUIsS0FBSztBQUU1QixJQUFPLHFCQUFROyIsCiAgIm5hbWVzIjogWyJpbXBvcnRfcmVhY3QiLCAiY2FuQWNjZXNzIiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgIlJlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgIlJlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSJdCn0K
