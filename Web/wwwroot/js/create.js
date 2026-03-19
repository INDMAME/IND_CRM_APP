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
} from "./chunks/chunk-7CQQO3Q3.js";
import "./chunks/chunk-FBLVVGLA.js";
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
} from "./chunks/chunk-GPBWDLUX.js";
import {
  SingleDatePicker
} from "./chunks/chunk-DCPTPHJE.js";
import {
  handleComboboxKeyDown
} from "./chunks/chunk-YMDESVRK.js";
import {
  SelectCombobox_default
} from "./chunks/chunk-3OOGM76O.js";
import {
  ChevronDownSvg,
  ChevronUpSvg,
  FloatingList_default,
  useOutsideClick
} from "./chunks/chunk-EXQAFLFO.js";
import {
  wait
} from "./chunks/chunk-4BE3ZFCK.js";
import {
  ConfirmModal,
  useConfirmDialog
} from "./chunks/chunk-7V4KSXZJ.js";
import {
  flashActionMark,
  setHistoryFilterForDate
} from "./chunks/chunk-THYI4DWA.js";
import {
  VisitasPageProviders_default
} from "./chunks/chunk-Y6PDDUMA.js";
import "./chunks/chunk-TIAN3SXO.js";
import {
  Spinner_default,
  canAccess,
  classNames,
  indFormat,
  indT,
  showPermissionModal
} from "./chunks/chunk-BZRAWDAK.js";
import {
  mountReactIsland,
  mountWhenDocumentReady,
  require_jsx_runtime,
  require_react
} from "./chunks/chunk-2NKOKBT5.js";
import {
  fetchJson
} from "./chunks/chunk-ZQSWXYLP.js";
import {
  getSessionJsonWithExpiry,
  getSessionValueWithExpiry,
  setSessionJsonWithExpiry
} from "./chunks/chunk-6HGCHSZG.js";
import {
  __toESM
} from "./chunks/chunk-W7NC74ZX.js";

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
var getLegacyResponseSuccess = (response) => {
  return response.success === true || response.Success === true;
};
var getLegacyResponseMessage = (response) => {
  const rawMessage = response.message ?? response.Message;
  return typeof rawMessage === "string" ? rawMessage.trim() : "";
};
var getLegacyResponseData = (response) => {
  return response.data ?? response.Data;
};
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
      if (!getLegacyResponseSuccess(resAct)) {
        throw new Error(getLegacyResponseMessage(resAct) || indT("Visits_Create_CreateActivityFailed", "Failed to create activity."));
      }
      const recIdActividad = indExtractSignedId(getLegacyResponseData(resAct)) || indExtractSignedId(getLegacyResponseMessage(resAct)) || indExtractSignedId(indExtractId(getLegacyResponseData(resAct)) || indExtractId(getLegacyResponseMessage(resAct)));
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
          if (!getLegacyResponseSuccess(resVis)) {
            throw new Error(getLegacyResponseMessage(resVis) || indT("Visits_Create_CreateVisitFailed", "Failed to create visit."));
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
      const msg = e instanceof Error ? e.message : indT("Visits_Create_CreateVisitError", "Failed to create the visit.");
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
      title: indT("Visits_Create_ConfirmCreate_Title", "Visits_Create_ConfirmCreate_Title"),
      message: indT("Visits_Create_ConfirmCreate_Body", "Visits_Create_ConfirmCreate_Body"),
      confirmText: indT("Confirm_Yes", "Confirm_Yes"),
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
  const [showNotFoundState, setShowNotFoundState] = (0, import_react4.useState)(false);
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
  useOutsideClick([containerRef, listRef], () => {
    setOpen(false);
    setShowNotFoundState(false);
    if (query.trim()) {
      setQuery("");
    }
  });
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
      setShowNotFoundState(false);
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
    setShowNotFoundState(false);
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
  const toText = (value2) => {
    if (value2 === null || value2 === void 0) return "";
    return String(value2).trim();
  };
  const asObjectRecord = (value2) => {
    if (!value2 || typeof value2 !== "object" || Array.isArray(value2)) return null;
    return value2;
  };
  const mapContacts = (items = []) => items.map((entry) => {
    if (isNoDataRow(entry)) return null;
    const record = asObjectRecord(entry);
    if (!record) return null;
    const recId = toText(record.recId ?? record.RecId);
    const name = toText(record.name ?? record.Name);
    const cargo = toText(record.cargo ?? record.Cargo);
    const empresa = toText(record.empresa ?? record.Empresa);
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
      const rawItems = Array.isArray(res.items) ? res.items : Array.isArray(res.Items) ? res.Items : [];
      const mapped = mapContacts(rawItems);
      setOptions((prev) => {
        const next = append ? [...prev, ...mapped] : mapped;
        setCachedContacts(accountNum, next);
        return next;
      });
      setShowNotFoundState(false);
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
    return availableOptions.filter(
      (o) => o.text.toLowerCase().includes(q) || o.cargo.toLowerCase().includes(q) || o.empresa.toLowerCase().includes(q)
    );
  }, [availableOptions, query]);
  const shouldShowNotFoundRow = showNotFoundState || !!query.trim() && filtered.length === 0;
  const resolvedActiveIndex = filtered.length > 0 ? Math.min(Math.max(activeIndex, 0), filtered.length - 1) : 0;
  const activeId = open && filtered[resolvedActiveIndex] ? `${idBase}-contact-opt-${filtered[resolvedActiveIndex].value}` : void 0;
  const toggleOption = (opt) => {
    setSelected((prev) => {
      const exists = prev.some((p) => p.value === opt.value);
      if (exists) return prev.filter((p) => p.value !== opt.value);
      return [...prev, opt];
    });
    setShowNotFoundState(false);
    setQuery("");
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
        if (filtered.length > 0) {
          toggleOption(filtered[resolvedActiveIndex] ?? filtered[0]);
          return;
        }
        if (query.trim()) {
          setQuery("");
          setShowNotFoundState(true);
          setOpen(true);
        }
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
                  onChange: (event) => {
                    setActiveIndex(0);
                    setShowNotFoundState(false);
                    setQuery(event.target.value);
                  },
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
              !loading && options.length > 0 && filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "px-4 py-2 text-sm text-slate-500", children: shouldShowNotFoundRow ? indT("Common_NotFound", "Not found") : indT("Visits_Create_NoMoreContacts", "No more contacts available") }),
              !loading && filtered.map((opt, idx) => {
                const sel = selected.some((s) => s.value === opt.value);
                const isActive = idx === resolvedActiveIndex;
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
    defaultConfirmText: indT("Confirm_Yes", "Confirm_Yes"),
    defaultCancelText: indT("Confirm_No", "Confirm_No")
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
  const modalLoadingText = indT("Common_Loading", "Common_Loading");
  const modalCancelText = modal.cancelText || indT("Confirm_No", "Confirm_No");
  const modalConfirmText = busy ? modalLoadingText : !busy && modalError ? indT("Common_OK", "Common_OK") : modal.confirmText || indT("Confirm_Yes", "Confirm_Yes");
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvY3JlYWNpb24vQ3JlYXRlRm9ybS50c3giLCAiLi4vcmVhY3Qvc3JjL2hvb2tzL3VzZVRvcGJhci50cyIsICIuLi9yZWFjdC9zcmMvaG9va3MvdXNlQ3JlYXRlRHJhZnQudHMiLCAiLi4vcmVhY3Qvc3JjL3V0aWxzL2dsb2JhbFNwaW5uZXIudHMiLCAiLi4vcmVhY3Qvc3JjL2hvb2tzL3VzZUNyZWF0ZVN1Ym1pdC50cyIsICIuLi9yZWFjdC9zcmMvdXRpbHMvaW5kSWRzLnRzIiwgIi4uL3JlYWN0L3NyYy9jb21wb25lbnRzL3Zpc2l0YXMvQ29udGFjdHNDb21ib2JveC50c3giLCAiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BoZXJvaWNvbnMvcmVhY3QvMjAvc29saWQvZXNtL1hNYXJrSWNvbi5qcyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9jcmVhY2lvbi9DcmVhdGVTdGVwQ2xpZW50U2VsZWN0aW9uLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9jcmVhY2lvbi9DcmVhdGVTdGVwVmlzaXREZXRhaWxzLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9jcmVhY2lvbi9DcmVhdGVQYWdlLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiXHVGRUZGaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlU3RhdGUsIHVzZVJlZiB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgQ29uZmlybU1vZGFsIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvQ29uZmlybU1vZGFsLnRzeFwiO1xyXG5pbXBvcnQgQXBwRXJyb3JCb3VuZGFyeSBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0FwcEVycm9yQm91bmRhcnkudHN4XCI7XHJcbmltcG9ydCB7IHVzZVZpc2l0YXMgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlVmlzaXRhcy50c1wiO1xyXG5pbXBvcnQgeyB1c2VUYXBHdWFyZCB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VUYXBHdWFyZC50c1wiO1xyXG5pbXBvcnQgeyB1c2VUb3BiYXIgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlVG9wYmFyLnRzXCI7XHJcbmltcG9ydCB7IHVzZUNvbmZpcm1EaWFsb2cgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlQ29uZmlybURpYWxvZy50c1wiO1xyXG5pbXBvcnQgeyB1c2VDcmVhdGVEcmFmdCB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VDcmVhdGVEcmFmdC50c1wiO1xyXG5pbXBvcnQgeyB1c2VDcmVhdGVTdWJtaXQgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlQ3JlYXRlU3VibWl0LnRzXCI7XHJcbmltcG9ydCB7IHVzZVRleHRFZGl0b3JGaWVsZHMgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlVGV4dEVkaXRvckZpZWxkcy50c1wiO1xyXG5pbXBvcnQgQ3JlYXRlU3RlcENsaWVudFNlbGVjdGlvbiwgeyBDcmVhdGVTZWxlY3RlZENsaWVudCwgQ3JlYXRlU2VsZWN0ZWRDb250YWN0IH0gZnJvbSBcIi4vQ3JlYXRlU3RlcENsaWVudFNlbGVjdGlvbi50c3hcIjtcclxuaW1wb3J0IENyZWF0ZVN0ZXBWaXNpdERldGFpbHMgZnJvbSBcIi4vQ3JlYXRlU3RlcFZpc2l0RGV0YWlscy50c3hcIjtcclxuaW1wb3J0IHsgY2xhc3NOYW1lcyB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9jbGFzc05hbWVzLnRzXCI7XHJcbmltcG9ydCB7IGluZEZvcm1hdCwgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB7IGNhbkFjY2Vzcywgc2hvd1Blcm1pc3Npb25Nb2RhbCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9wZXJtaXNzaW9ucy50c1wiO1xyXG5pbXBvcnQgeyBzZXRQcmV2aWV3QW5jaG9yLCBzaG93UHJldmlld1Rvb2x0aXAsIGlzT3ZlcmZsb3dpbmcgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvcHJldmlld1Rvb2x0aXAudHNcIjtcclxuaW1wb3J0IHsgbmF2aWdhdGVUb1RleHRFZGl0b3JGaWVsZCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy90ZXh0RWRpdG9yTmF2aWdhdGlvbi50c1wiO1xyXG5pbXBvcnQgeyBmbGFzaEFjdGlvbk1hcmsgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvdmlzaXRhc0hpc3RvcnkudHNcIjtcclxuXHJcbmZ1bmN0aW9uIFZpc2l0YXNBcHAoKSB7XHJcbiAgY29uc3QgeyB2aXNpdFR5cGVzLCBhc2lzdGVudGVUaXBvcyB9ID0gdXNlVmlzaXRhcygpO1xyXG4gIGNvbnN0IGNhbkNyZWF0ZVZpc2l0ID0gY2FuQWNjZXNzKFwiVklTSVRBU19DUkVBQ0lPTlwiLCBcIkFkZFwiKTtcclxuICBjb25zdCBjYW5Sb2xsYmFja0RlbGV0ZSA9IGNhbkFjY2VzcyhcIlZJU0lUQVNfSElTVE9SSUFMXCIsIFwiRnVsbEFjY2Vzc1wiKTtcclxuXHJcbiAgY29uc3QgZmllbGRJZENvbWVudGFyaW9zID0gXCJWaXNpdGEuQ3JlYXRlLkNvbWVudGFyaW9zXCI7XHJcbiAgY29uc3QgZmllbGRJZEFudGVjZWRlbnRlcyA9IFwiVmlzaXRhLkNyZWF0ZS5BbnRlY2VkZW50ZXNcIjtcclxuICBjb25zdCBmaWVsZElkQ29uY2x1c2lvbmVzID0gXCJWaXNpdGEuQ3JlYXRlLkNvbmNsdXNpb25lc1wiO1xyXG5cclxuICBjb25zdCBbc3RlcCwgc2V0U3RlcF0gPSB1c2VTdGF0ZSgxKTtcclxuICBjb25zdCBbc2VsZWN0ZWRDbGllbnQsIHNldFNlbGVjdGVkQ2xpZW50XSA9IHVzZVN0YXRlPENyZWF0ZVNlbGVjdGVkQ2xpZW50PihudWxsKTtcclxuICBjb25zdCBbc2VsZWN0ZWRDb250YWN0cywgc2V0U2VsZWN0ZWRDb250YWN0c10gPSB1c2VTdGF0ZTxDcmVhdGVTZWxlY3RlZENvbnRhY3RbXT4oW10pO1xyXG4gIGNvbnN0IHRvZGF5U3RyaW5nID0gKCkgPT4ge1xyXG4gICAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpO1xyXG4gICAgY29uc3QgeXl5eSA9IHRvZGF5LmdldEZ1bGxZZWFyKCk7XHJcbiAgICBjb25zdCBtbSA9IFN0cmluZyh0b2RheS5nZXRNb250aCgpICsgMSkucGFkU3RhcnQoMiwgXCIwXCIpO1xyXG4gICAgY29uc3QgZGQgPSBTdHJpbmcodG9kYXkuZ2V0RGF0ZSgpKS5wYWRTdGFydCgyLCBcIjBcIik7XHJcbiAgICByZXR1cm4gYCR7eXl5eX0tJHttbX0tJHtkZH1gO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGRlZmF1bHRWaXNpdFR5cGUgPSBTdHJpbmcodmlzaXRUeXBlc1swXT8udmFsdWUgPz8gdmlzaXRUeXBlc1swXT8uVmFsdWUgPz8gXCJcIik7XHJcbiAgY29uc3QgZGVmYXVsdEFzaXN0ZW50ZVRpcG8gPSBTdHJpbmcoYXNpc3RlbnRlVGlwb3NbMF0/LnZhbHVlID8/IGFzaXN0ZW50ZVRpcG9zWzBdPy5WYWx1ZSA/PyBcIjBcIik7XHJcblxyXG4gIGNvbnN0IFt2aXNpdFR5cGUsIHNldFZpc2l0VHlwZV0gPSB1c2VTdGF0ZTxzdHJpbmc+KGRlZmF1bHRWaXNpdFR5cGUpO1xyXG4gIGNvbnN0IFt0cmFuc0RhdGUsIHNldFRyYW5zRGF0ZV0gPSB1c2VTdGF0ZSgoKSA9PiB0b2RheVN0cmluZygpKTtcclxuICBjb25zdCBbZGVzY3JpcHRpb24sIHNldERlc2NyaXB0aW9uXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtjb21lbnRhcmlvcywgc2V0Q29tZW50YXJpb3NdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW2FudGVjZWRlbnRlcywgc2V0QW50ZWNlZGVudGVzXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtjb25jbHVzaW9uZXMsIHNldENvbmNsdXNpb25lc10gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbc3RhdHVzLCBzZXRTdGF0dXNdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW2J1c3ksIHNldEJ1c3ldID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtzaG93UmVxdWlyZWQsIHNldFNob3dSZXF1aXJlZF0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW21vZGFsRXJyb3IsIHNldE1vZGFsRXJyb3JdID0gdXNlU3RhdGUoXCJcIik7XHJcblxyXG4gIGNvbnN0IHsgbW9kYWwsIG9wZW5Db25maXJtLCBjbG9zZUNvbmZpcm0sIGhhbmRsZUNvbmZpcm0gfSA9IHVzZUNvbmZpcm1EaWFsb2coe1xyXG4gICAgZGVmYXVsdENvbmZpcm1UZXh0OiBpbmRUKFwiQ29uZmlybV9ZZXNcIiwgXCJDb25maXJtX1llc1wiKSxcclxuICAgIGRlZmF1bHRDYW5jZWxUZXh0OiBpbmRUKFwiQ29uZmlybV9Ob1wiLCBcIkNvbmZpcm1fTm9cIilcclxuICB9KTtcclxuXHJcbiAgY29uc3QgaGFuZGxlTW9kYWxDb25maXJtID0gUmVhY3QudXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgc2V0TW9kYWxFcnJvcihcIlwiKTtcclxuICAgIGF3YWl0IGhhbmRsZUNvbmZpcm0oe1xyXG4gICAgICBidXN5LFxyXG4gICAgICBvbkVycm9yOiAobXNnKSA9PiB7XHJcbiAgICAgICAgc2V0TW9kYWxFcnJvcihtc2cpO1xyXG4gICAgICAgIHNldFN0YXR1cyhtc2cpO1xyXG4gICAgICAgIGZsYXNoQWN0aW9uTWFyayhcImVycm9yUHJvY2Vzc1wiLCAxNTAwKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSwgW2J1c3ksIGhhbmRsZUNvbmZpcm1dKTtcclxuXHJcbiAgY29uc3QgbW9kYWxMb2FkaW5nVGV4dCA9IGluZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkNvbW1vbl9Mb2FkaW5nXCIpO1xyXG4gIGNvbnN0IG1vZGFsQ2FuY2VsVGV4dCA9IG1vZGFsLmNhbmNlbFRleHQgfHwgaW5kVChcIkNvbmZpcm1fTm9cIiwgXCJDb25maXJtX05vXCIpO1xyXG4gIGNvbnN0IG1vZGFsQ29uZmlybVRleHQgPSBidXN5XHJcbiAgICA/IG1vZGFsTG9hZGluZ1RleHRcclxuICAgIDogKCFidXN5ICYmIG1vZGFsRXJyb3IgPyBpbmRUKFwiQ29tbW9uX09LXCIsIFwiQ29tbW9uX09LXCIpIDogKG1vZGFsLmNvbmZpcm1UZXh0IHx8IGluZFQoXCJDb25maXJtX1llc1wiLCBcIkNvbmZpcm1fWWVzXCIpKSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZU1vZGFsQnV0dG9uQ29uZmlybSA9IFJlYWN0LnVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmICghYnVzeSAmJiBtb2RhbEVycm9yKSB7XHJcbiAgICAgIGNsb3NlQ29uZmlybSgpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBoYW5kbGVNb2RhbENvbmZpcm0oKTtcclxuICB9LCBbYnVzeSwgbW9kYWxFcnJvciwgY2xvc2VDb25maXJtLCBoYW5kbGVNb2RhbENvbmZpcm1dKTtcclxuXHJcbiAgY29uc3QgZHJhZnRTbmFwc2hvdCA9IHVzZU1lbW8oXHJcbiAgICAoKSA9PiAoe1xyXG4gICAgICBzZWxlY3RlZENsaWVudCxcclxuICAgICAgc2VsZWN0ZWRDb250YWN0cyxcclxuICAgICAgdmlzaXRUeXBlLFxyXG4gICAgICB0cmFuc0RhdGUsXHJcbiAgICAgIGRlc2NyaXB0aW9uLFxyXG4gICAgICBjb21lbnRhcmlvcyxcclxuICAgICAgYW50ZWNlZGVudGVzLFxyXG4gICAgICBjb25jbHVzaW9uZXMsXHJcbiAgICAgIHN0ZXAsXHJcbiAgICB9KSxcclxuICAgIFtzZWxlY3RlZENsaWVudCwgc2VsZWN0ZWRDb250YWN0cywgdmlzaXRUeXBlLCB0cmFuc0RhdGUsIGRlc2NyaXB0aW9uLCBjb21lbnRhcmlvcywgYW50ZWNlZGVudGVzLCBjb25jbHVzaW9uZXMsIHN0ZXBdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgeyBwZXJzaXN0RHJhZnROb3cgfSA9IHVzZUNyZWF0ZURyYWZ0KHtcclxuICAgIGRyYWZ0U25hcHNob3QsXHJcbiAgICBzZXRTZWxlY3RlZENsaWVudCxcclxuICAgIHNldFNlbGVjdGVkQ29udGFjdHMsXHJcbiAgICBzZXRWaXNpdFR5cGUsXHJcbiAgICBzZXRUcmFuc0RhdGUsXHJcbiAgICBzZXREZXNjcmlwdGlvbixcclxuICAgIHNldENvbWVudGFyaW9zLFxyXG4gICAgc2V0QW50ZWNlZGVudGVzLFxyXG4gICAgc2V0Q29uY2x1c2lvbmVzLFxyXG4gICAgc2V0U3RlcCxcclxuICB9KTtcclxuXHJcbiAgLy8gT3BlbnMgdGhlIGZ1bGwtc2NyZWVuIHRleHQgZWRpdG9yIGZvciBhIG11bHRpbGluZSBmaWVsZC5cclxuICBjb25zdCBvcGVuVGV4dEVkaXRvciA9IFJlYWN0LnVzZUNhbGxiYWNrKFxyXG4gICAgKGZpZWxkSWQ6IHN0cmluZywgZmllbGRMYWJlbDogc3RyaW5nLCBmaWVsZFZhbHVlOiBzdHJpbmcsIG9wdGlvbnM6IHsgYWxsb3dFZGl0PzogYm9vbGVhbiB9ID0ge30pID0+IHtcclxuICAgICAgbmF2aWdhdGVUb1RleHRFZGl0b3JGaWVsZCh7XHJcbiAgICAgICAgZmllbGRJZCxcclxuICAgICAgICBmaWVsZExhYmVsLFxyXG4gICAgICAgIGZpZWxkVmFsdWUsXHJcbiAgICAgICAgYWxsb3dFZGl0OiBvcHRpb25zPy5hbGxvd0VkaXQgIT09IGZhbHNlLFxyXG4gICAgICAgIGJlZm9yZU5hdmlnYXRlOiBwZXJzaXN0RHJhZnROb3csXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIFtwZXJzaXN0RHJhZnROb3ddXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQ29tZW50YXJpb3NUYXAgPSBSZWFjdC51c2VDYWxsYmFjaygoZXZlbnQpID0+IHtcclxuICAgIGlmIChidXN5KSByZXR1cm47XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgb3BlblRleHRFZGl0b3IoZmllbGRJZENvbWVudGFyaW9zLCBpbmRUKFwiVmlzaXRzX0ZpZWxkX0NvbW1lbnRzXCIsIFwiQ29tbWVudHNcIiksIGNvbWVudGFyaW9zKTtcclxuICB9LCBbYnVzeSwgY29tZW50YXJpb3MsIG9wZW5UZXh0RWRpdG9yXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUNvbWVudGFyaW9zSG9sZCA9IFJlYWN0LnVzZUNhbGxiYWNrKCh0YXJnZXQsIGNsaWVudFkpID0+IHtcclxuICAgIGlmICghdGFyZ2V0IHx8ICFpc092ZXJmbG93aW5nKHRhcmdldCkpIHJldHVybiBmYWxzZTtcclxuICAgIHNldFByZXZpZXdBbmNob3IodGFyZ2V0KTtcclxuICAgIHJldHVybiBzaG93UHJldmlld1Rvb2x0aXAoU3RyaW5nKGNvbWVudGFyaW9zIHx8IFwiXCIpLCBjbGllbnRZKTtcclxuICB9LCBbY29tZW50YXJpb3NdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQW50ZWNlZGVudGVzVGFwID0gUmVhY3QudXNlQ2FsbGJhY2soKGV2ZW50KSA9PiB7XHJcbiAgICBpZiAoYnVzeSkgcmV0dXJuO1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIG9wZW5UZXh0RWRpdG9yKGZpZWxkSWRBbnRlY2VkZW50ZXMsIGluZFQoXCJWaXNpdHNfRmllbGRfQmFja2dyb3VuZFwiLCBcIkJhY2tncm91bmRcIiksIGFudGVjZWRlbnRlcyk7XHJcbiAgfSwgW2J1c3ksIGFudGVjZWRlbnRlcywgb3BlblRleHRFZGl0b3JdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQW50ZWNlZGVudGVzSG9sZCA9IFJlYWN0LnVzZUNhbGxiYWNrKCh0YXJnZXQsIGNsaWVudFkpID0+IHtcclxuICAgIGlmICghdGFyZ2V0IHx8ICFpc092ZXJmbG93aW5nKHRhcmdldCkpIHJldHVybiBmYWxzZTtcclxuICAgIHNldFByZXZpZXdBbmNob3IodGFyZ2V0KTtcclxuICAgIHJldHVybiBzaG93UHJldmlld1Rvb2x0aXAoU3RyaW5nKGFudGVjZWRlbnRlcyB8fCBcIlwiKSwgY2xpZW50WSk7XHJcbiAgfSwgW2FudGVjZWRlbnRlc10pO1xyXG5cclxuICBjb25zdCBoYW5kbGVDb25jbHVzaW9uZXNUYXAgPSBSZWFjdC51c2VDYWxsYmFjaygoZXZlbnQpID0+IHtcclxuICAgIGlmIChidXN5KSByZXR1cm47XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgb3BlblRleHRFZGl0b3IoZmllbGRJZENvbmNsdXNpb25lcywgaW5kVChcIlZpc2l0c19GaWVsZF9Db25jbHVzaW9uc1wiLCBcIkNvbmNsdXNpb25zXCIpLCBjb25jbHVzaW9uZXMpO1xyXG4gIH0sIFtidXN5LCBjb25jbHVzaW9uZXMsIG9wZW5UZXh0RWRpdG9yXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUNvbmNsdXNpb25lc0hvbGQgPSBSZWFjdC51c2VDYWxsYmFjaygodGFyZ2V0LCBjbGllbnRZKSA9PiB7XHJcbiAgICBpZiAoIXRhcmdldCB8fCAhaXNPdmVyZmxvd2luZyh0YXJnZXQpKSByZXR1cm4gZmFsc2U7XHJcbiAgICBzZXRQcmV2aWV3QW5jaG9yKHRhcmdldCk7XHJcbiAgICByZXR1cm4gc2hvd1ByZXZpZXdUb29sdGlwKFN0cmluZyhjb25jbHVzaW9uZXMgfHwgXCJcIiksIGNsaWVudFkpO1xyXG4gIH0sIFtjb25jbHVzaW9uZXNdKTtcclxuXHJcbiAgY29uc3QgY29tZW50YXJpb3NUYXAgPSB1c2VUYXBHdWFyZChoYW5kbGVDb21lbnRhcmlvc1RhcCwgaGFuZGxlQ29tZW50YXJpb3NIb2xkKTtcclxuICBjb25zdCBhbnRlY2VkZW50ZXNUYXAgPSB1c2VUYXBHdWFyZChoYW5kbGVBbnRlY2VkZW50ZXNUYXAsIGhhbmRsZUFudGVjZWRlbnRlc0hvbGQpO1xyXG4gIGNvbnN0IGNvbmNsdXNpb25lc1RhcCA9IHVzZVRhcEd1YXJkKGhhbmRsZUNvbmNsdXNpb25lc1RhcCwgaGFuZGxlQ29uY2x1c2lvbmVzSG9sZCk7XHJcblxyXG4gIGNvbnN0IHRleHRFZGl0b3JCaW5kaW5ncyA9IHVzZU1lbW8oXHJcbiAgICAoKSA9PiBbXHJcbiAgICAgIHsgZmllbGRJZDogZmllbGRJZENvbWVudGFyaW9zLCBhcHBseVZhbHVlOiBzZXRDb21lbnRhcmlvcyB9LFxyXG4gICAgICB7IGZpZWxkSWQ6IGZpZWxkSWRBbnRlY2VkZW50ZXMsIGFwcGx5VmFsdWU6IHNldEFudGVjZWRlbnRlcyB9LFxyXG4gICAgICB7IGZpZWxkSWQ6IGZpZWxkSWRDb25jbHVzaW9uZXMsIGFwcGx5VmFsdWU6IHNldENvbmNsdXNpb25lcyB9LFxyXG4gICAgXSxcclxuICAgIFtmaWVsZElkQW50ZWNlZGVudGVzLCBmaWVsZElkQ29tZW50YXJpb3MsIGZpZWxkSWRDb25jbHVzaW9uZXNdXHJcbiAgKTtcclxuXHJcbiAgdXNlVGV4dEVkaXRvckZpZWxkcyh0ZXh0RWRpdG9yQmluZGluZ3MpO1xyXG5cclxuICAvLyBDbGVhciBjb250YWN0cyBvbmx5IHdoZW4gdGhlIGNsaWVudCBjaGFuZ2VzIChhdm9pZCBjbGVhcmluZyBvbiByZXN0b3JlL3N0ZXAgMiByZXR1cm4pLlxyXG4gIGNvbnN0IHByZXZDbGllbnRSZWYgPSB1c2VSZWYobnVsbCk7XHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IGN1cnJlbnQgPSBzZWxlY3RlZENsaWVudD8udmFsdWU7XHJcbiAgICBpZiAocHJldkNsaWVudFJlZi5jdXJyZW50ICYmIHByZXZDbGllbnRSZWYuY3VycmVudCAhPT0gY3VycmVudCkge1xyXG4gICAgICBzZXRTZWxlY3RlZENvbnRhY3RzKFtdKTtcclxuICAgIH1cclxuICAgIHByZXZDbGllbnRSZWYuY3VycmVudCA9IGN1cnJlbnQ7XHJcbiAgfSwgW3NlbGVjdGVkQ2xpZW50Py52YWx1ZV0pO1xyXG5cclxuICBjb25zdCBsYXN0Q2xpZW50UmVmID0gdXNlUmVmKG51bGwpO1xyXG5cclxuICAvLyBJZiB0aGUgY2xpZW50IGNoYW5nZXMgYWZ0ZXIgc2VsZWN0aW5nIGNvbnRhY3RzLCByZXNldCB0aGUgZW50aXJlIGZvcm0uXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IGN1cnJlbnQgPSBzZWxlY3RlZENsaWVudD8udmFsdWU7XHJcbiAgICBpZiAoIWN1cnJlbnQpIHJldHVybjtcclxuXHJcbiAgICBpZiAobGFzdENsaWVudFJlZi5jdXJyZW50ICYmIGxhc3RDbGllbnRSZWYuY3VycmVudCAhPT0gY3VycmVudCkge1xyXG4gICAgICBzZXRTdGVwKDEpO1xyXG4gICAgICBzZXRTZWxlY3RlZENvbnRhY3RzKFtdKTtcclxuICAgICAgc2V0VmlzaXRUeXBlKGRlZmF1bHRWaXNpdFR5cGUpO1xyXG4gICAgICBzZXRUcmFuc0RhdGUodG9kYXlTdHJpbmcoKSk7XHJcbiAgICAgIHNldERlc2NyaXB0aW9uKFwiXCIpO1xyXG4gICAgICBzZXRDb21lbnRhcmlvcyhcIlwiKTtcclxuICAgICAgc2V0QW50ZWNlZGVudGVzKFwiXCIpO1xyXG4gICAgICBzZXRDb25jbHVzaW9uZXMoXCJcIik7XHJcbiAgICAgIHNldFN0YXR1cyhcIlwiKTtcclxuICAgICAgc2V0QnVzeShmYWxzZSk7XHJcbiAgICB9XHJcbiAgICBsYXN0Q2xpZW50UmVmLmN1cnJlbnQgPSBjdXJyZW50O1xyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlYWN0LWhvb2tzL2V4aGF1c3RpdmUtZGVwc1xyXG4gIH0sIFtzZWxlY3RlZENsaWVudD8udmFsdWVdKTtcclxuXHJcbiAgY29uc3QgY2FuR29OZXh0ID0gISFzZWxlY3RlZENsaWVudDtcclxuICBjb25zdCBjYW5DcmVhdGUgPVxyXG4gICAgISFzZWxlY3RlZENsaWVudCAmJlxyXG4gICAgU3RyaW5nKHZpc2l0VHlwZSB8fCBcIlwiKS50cmltKCkgIT09IFwiXCIgJiZcclxuICAgIFN0cmluZyh2aXNpdFR5cGUpICE9PSBcIjBcIiAmJlxyXG4gICAgZGVzY3JpcHRpb24udHJpbSgpLmxlbmd0aCA+IDAgJiZcclxuICAgIGNvbWVudGFyaW9zLnRyaW0oKS5sZW5ndGggPiAwO1xyXG5cclxuICBjb25zdCBoYXNBY3RpdmVQcm9jZXNzID0gdXNlTWVtbygoKSA9PiB7XHJcbiAgICBpZiAoYnVzeSkgcmV0dXJuIHRydWU7XHJcbiAgICBpZiAoc3RlcCA+IDEpIHJldHVybiB0cnVlO1xyXG4gICAgaWYgKHNlbGVjdGVkQ2xpZW50KSByZXR1cm4gdHJ1ZTtcclxuICAgIGlmIChzZWxlY3RlZENvbnRhY3RzLmxlbmd0aCA+IDApIHJldHVybiB0cnVlO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgZGVzY3JpcHRpb24udHJpbSgpLmxlbmd0aCA+IDAgfHxcclxuICAgICAgY29tZW50YXJpb3MudHJpbSgpLmxlbmd0aCA+IDAgfHxcclxuICAgICAgYW50ZWNlZGVudGVzLnRyaW0oKS5sZW5ndGggPiAwIHx8XHJcbiAgICAgIGNvbmNsdXNpb25lcy50cmltKCkubGVuZ3RoID4gMFxyXG4gICAgKTtcclxuICB9LCBbYW50ZWNlZGVudGVzLCBidXN5LCBjb21lbnRhcmlvcywgY29uY2x1c2lvbmVzLCBkZXNjcmlwdGlvbiwgc2VsZWN0ZWRDbGllbnQsIHNlbGVjdGVkQ29udGFjdHMubGVuZ3RoLCBzdGVwXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICB3aW5kb3cuX19pbmRTZXROYXZpZ2F0aW9uR3VhcmQ/LihoYXNBY3RpdmVQcm9jZXNzKTtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIHdpbmRvdy5fX2luZENsZWFyTmF2aWdhdGlvbkd1YXJkPy4oKTtcclxuICAgIH07XHJcbiAgfSwgW2hhc0FjdGl2ZVByb2Nlc3NdKTtcclxuXHJcbiAgY29uc3QgeyBoYW5kbGVTdWJtaXQgfSA9IHVzZUNyZWF0ZVN1Ym1pdCh7XHJcbiAgICBidXN5LFxyXG4gICAgbW9kYWxPcGVuOiBtb2RhbC5vcGVuLFxyXG4gICAgY2FuQ3JlYXRlVmlzaXQsXHJcbiAgICBjYW5Sb2xsYmFja0RlbGV0ZSxcclxuICAgIHNlbGVjdGVkQ2xpZW50LFxyXG4gICAgc2VsZWN0ZWRDb250YWN0cyxcclxuICAgIHZpc2l0VHlwZSxcclxuICAgIGRlZmF1bHRBc2lzdGVudGVUaXBvLFxyXG4gICAgZGVzY3JpcHRpb24sXHJcbiAgICB0cmFuc0RhdGUsXHJcbiAgICBjb21lbnRhcmlvcyxcclxuICAgIGFudGVjZWRlbnRlcyxcclxuICAgIGNvbmNsdXNpb25lcyxcclxuICAgIHNldEJ1c3ksXHJcbiAgICBzZXRTdGF0dXMsXHJcbiAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgc2V0U2hvd1JlcXVpcmVkLFxyXG4gICAgb3BlbkNvbmZpcm0sXHJcbiAgICBjbG9zZUNvbmZpcm0sXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZVRvcGJhclByaW1hcnkgPSBSZWFjdC51c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAoIWNhbkNyZWF0ZVZpc2l0KSB7XHJcbiAgICAgIHNob3dQZXJtaXNzaW9uTW9kYWwoKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKHN0ZXAgPT09IDEgJiYgY2FuR29OZXh0KSBzZXRTdGVwKDIpO1xyXG4gICAgaWYgKHN0ZXAgPT09IDIpIGhhbmRsZVN1Ym1pdCgpO1xyXG4gIH0sIFtjYW5DcmVhdGVWaXNpdCwgY2FuR29OZXh0LCBoYW5kbGVTdWJtaXQsIHN0ZXBdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlVG9wYmFyQmFjayA9IFJlYWN0LnVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIHNldFN0ZXAoMSk7XHJcbiAgfSwgW10pO1xyXG5cclxuICB1c2VUb3BiYXIoc3RlcCwgY2FuR29OZXh0LCBoYW5kbGVUb3BiYXJQcmltYXJ5LCBoYW5kbGVUb3BiYXJCYWNrLCBidXN5LCBjYW5DcmVhdGUsIGNhbkNyZWF0ZVZpc2l0KTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmIChzdGVwID09PSAxKSB7XHJcbiAgICAgIHNldFNob3dSZXF1aXJlZChmYWxzZSk7XHJcbiAgICAgIGNsb3NlQ29uZmlybSgpO1xyXG4gICAgfVxyXG4gIH0sIFtzdGVwLCBjbG9zZUNvbmZpcm1dKTtcclxuXHJcbiAgY29uc3QgdmlzaXRUeXBlSW52YWxpZCA9IHNob3dSZXF1aXJlZCAmJiAoU3RyaW5nKHZpc2l0VHlwZSB8fCBcIlwiKSA9PT0gXCJcIiB8fCBTdHJpbmcodmlzaXRUeXBlKSA9PT0gXCIwXCIpO1xyXG4gIGNvbnN0IGRlc2NyaXB0aW9uSW52YWxpZCA9IHNob3dSZXF1aXJlZCAmJiBkZXNjcmlwdGlvbi50cmltKCkubGVuZ3RoID09PSAwO1xyXG4gIGNvbnN0IGNvbWVudGFyaW9zSW52YWxpZCA9IHNob3dSZXF1aXJlZCAmJiBjb21lbnRhcmlvcy50cmltKCkubGVuZ3RoID09PSAwO1xyXG4gIGNvbnN0IGRlc2NyaXB0aW9uSW5wdXRDbGFzc05hbWUgPSBjbGFzc05hbWVzKFxyXG4gICAgXCJmb3JtLWNvbnRyb2xcIixcclxuICAgIGRlc2NyaXB0aW9uSW52YWxpZFxyXG4gICAgICA/IFwiYm9yZGVyLXJvc2UtNDAwIGJnLXJvc2UtNTAgZm9jdXM6cmluZy1yb3NlLTIwMCBmb2N1czpib3JkZXItcm9zZS00MDBcIlxyXG4gICAgICA6IFwiYm9yZGVyLXNsYXRlLTIwMCBmb2N1czpyaW5nLXByaW1hcnkgZm9jdXM6Ym9yZGVyLXByaW1hcnlcIlxyXG4gICk7XHJcbiAgY29uc3QgY29tZW50YXJpb3NDbGFzc05hbWUgPSBjbGFzc05hbWVzKFxyXG4gICAgXCJmb3JtLWNvbnRyb2wgY3Vyc29yLXBvaW50ZXJcIixcclxuICAgIGNvbWVudGFyaW9zSW52YWxpZFxyXG4gICAgICA/IFwiYm9yZGVyLXJvc2UtNDAwIGJnLXJvc2UtNTAgZm9jdXM6cmluZy1yb3NlLTIwMCBmb2N1czpib3JkZXItcm9zZS00MDBcIlxyXG4gICAgICA6IFwiYm9yZGVyLXNsYXRlLTIwMCBmb2N1czpyaW5nLXByaW1hcnkgZm9jdXM6Ym9yZGVyLXByaW1hcnlcIlxyXG4gICk7XHJcbiAgY29uc3QgZGVzY3JpcHRpb25MYWJlbCA9IGluZFQoXCJWaXNpdHNfRmllbGRfRGVzY3JpcHRpb25cIiwgXCJEZXNjcmlwdGlvblwiKTtcclxuICBjb25zdCBjb21tZW50c0xhYmVsID0gaW5kVChcIlZpc2l0c19GaWVsZF9Db21tZW50c1wiLCBcIkNvbW1lbnRzXCIpO1xyXG4gIGNvbnN0IGJhY2tncm91bmRMYWJlbCA9IGluZFQoXCJWaXNpdHNfRmllbGRfQmFja2dyb3VuZFwiLCBcIkJhY2tncm91bmRcIik7XHJcbiAgY29uc3QgY29uY2x1c2lvbnNMYWJlbCA9IGluZFQoXCJWaXNpdHNfRmllbGRfQ29uY2x1c2lvbnNcIiwgXCJDb25jbHVzaW9uc1wiKTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS00XCI+XHJcbiAgICAgIDxDb25maXJtTW9kYWxcclxuICAgICAgICBvcGVuPXttb2RhbC5vcGVufVxyXG4gICAgICAgIHRpdGxlPXttb2RhbC50aXRsZX1cclxuICAgICAgICBtZXNzYWdlPXttb2RhbC5tZXNzYWdlfVxyXG4gICAgICAgIGNvbmZpcm1UZXh0PXttb2RhbENvbmZpcm1UZXh0fVxyXG4gICAgICAgIGNhbmNlbFRleHQ9e21vZGFsQ2FuY2VsVGV4dH1cclxuICAgICAgICBsb2FkaW5nVGV4dD17bW9kYWxMb2FkaW5nVGV4dH1cclxuICAgICAgICBzaG93Q2FuY2VsPXttb2RhbC5zaG93Q2FuY2VsfVxyXG4gICAgICAgIHNob3dDb25maXJtPXttb2RhbC5zaG93Q29uZmlybX1cclxuICAgICAgICBidXN5PXtidXN5fVxyXG4gICAgICAgIGVycm9yPXttb2RhbEVycm9yfVxyXG4gICAgICAgIHN0YXR1cz17c3RhdHVzfVxyXG4gICAgICAgIG9uQ29uZmlybT17aGFuZGxlTW9kYWxCdXR0b25Db25maXJtfVxyXG4gICAgICAgIG9uQ2FuY2VsPXtjbG9zZUNvbmZpcm19XHJcbiAgICAgIC8+XHJcbiAgICAgIHtzdGVwID09PSAxICYmIChcclxuICAgICAgICA8Q3JlYXRlU3RlcENsaWVudFNlbGVjdGlvblxyXG4gICAgICAgICAgc2VsZWN0ZWRDbGllbnQ9e3NlbGVjdGVkQ2xpZW50fVxyXG4gICAgICAgICAgc2VsZWN0ZWRDb250YWN0cz17c2VsZWN0ZWRDb250YWN0c31cclxuICAgICAgICAgIG9uQ2xpZW50U2VsZWN0ZWQ9e3NldFNlbGVjdGVkQ2xpZW50fVxyXG4gICAgICAgICAgb25Db250YWN0c0NoYW5nZT17c2V0U2VsZWN0ZWRDb250YWN0c31cclxuICAgICAgICAgIGNsaWVudExhYmVsPXtpbmRUKFwiVmlzaXRzX0NyZWF0ZV9TZWFyY2hDbGllbnRcIiwgXCJTZWFyY2ggY2xpZW50XCIpfVxyXG4gICAgICAgICAgY2xpZW50UGxhY2Vob2xkZXI9e2luZEZvcm1hdChcIlZpc2l0c19DcmVhdGVfQ2xpZW50UGxhY2Vob2xkZXJcIiwgXCJUeXBlIGF0IGxlYXN0IHswfSBjaGFyYWN0ZXJzLi4uXCIsIDQpfVxyXG4gICAgICAgICAgc2VsZWN0ZWRDb250YWN0c0NvdW50VGV4dD17aW5kRm9ybWF0KFxyXG4gICAgICAgICAgICBcIlZpc2l0c19DcmVhdGVfU2VsZWN0ZWRDb250YWN0c0NvdW50XCIsXHJcbiAgICAgICAgICAgIFwiezB9IHNlbGVjdGVkIGNvbnRhY3QocylcIixcclxuICAgICAgICAgICAgc2VsZWN0ZWRDb250YWN0cy5sZW5ndGhcclxuICAgICAgICAgICl9XHJcbiAgICAgICAgLz5cclxuICAgICAgKX1cclxuXHJcbiAgICAgIHtzdGVwID09PSAyICYmIChcclxuICAgICAgICA8Q3JlYXRlU3RlcFZpc2l0RGV0YWlsc1xyXG4gICAgICAgICAgdGl0bGU9e2luZFQoXCJWaXNpdHNfQ3JlYXRlX1Zpc2l0RGF0YV9UaXRsZVwiLCBcIlZpc2l0IGRldGFpbHNcIil9XHJcbiAgICAgICAgICBkYXRlTGFiZWw9e2luZFQoXCJWaXNpdHNfRGV0YWlsX0RhdGVfTGFiZWxcIiwgXCJEYXRlXCIpfVxyXG4gICAgICAgICAgdHJhbnNEYXRlPXt0cmFuc0RhdGV9XHJcbiAgICAgICAgICBvblRyYW5zRGF0ZUNoYW5nZT17c2V0VHJhbnNEYXRlfVxyXG4gICAgICAgICAgdmlzaXRUeXBlTGFiZWw9e2luZFQoXCJWaXNpdHNfRGV0YWlsX1Zpc2l0VHlwZV9MYWJlbFwiLCBcIlZpc2l0IHR5cGVcIil9XHJcbiAgICAgICAgICB2aXNpdFR5cGVzPXt2aXNpdFR5cGVzfVxyXG4gICAgICAgICAgdmlzaXRUeXBlPXt2aXNpdFR5cGV9XHJcbiAgICAgICAgICBvblZpc2l0VHlwZUNoYW5nZT17c2V0VmlzaXRUeXBlfVxyXG4gICAgICAgICAgdmlzaXRUeXBlUGxhY2Vob2xkZXI9e2luZFQoXCJWaXNpdHNfRGV0YWlsX1Zpc2l0VHlwZV9QbGFjZWhvbGRlclwiLCBcIlNlbGVjdCB0eXBlXCIpfVxyXG4gICAgICAgICAgdmlzaXRUeXBlSW52YWxpZD17dmlzaXRUeXBlSW52YWxpZH1cclxuICAgICAgICAgIGRlc2NyaXB0aW9uTGFiZWw9e2Rlc2NyaXB0aW9uTGFiZWx9XHJcbiAgICAgICAgICBkZXNjcmlwdGlvblZhbHVlPXtkZXNjcmlwdGlvbn1cclxuICAgICAgICAgIGRlc2NyaXB0aW9uQ2xhc3NOYW1lPXtkZXNjcmlwdGlvbklucHV0Q2xhc3NOYW1lfVxyXG4gICAgICAgICAgb25EZXNjcmlwdGlvbkNoYW5nZT17c2V0RGVzY3JpcHRpb259XHJcbiAgICAgICAgICB0YXBGaWVsZHM9e1tcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIGlkOiBcImNvbWVudGFyaW9zXCIsXHJcbiAgICAgICAgICAgICAgbGFiZWw6IGNvbW1lbnRzTGFiZWwsXHJcbiAgICAgICAgICAgICAgdmFsdWU6IGNvbWVudGFyaW9zLFxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZTogY29tZW50YXJpb3NDbGFzc05hbWUsXHJcbiAgICAgICAgICAgICAgcG9pbnRlckJpbmRpbmdzOiBjb21lbnRhcmlvc1RhcCxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIGlkOiBcImFudGVjZWRlbnRlc1wiLFxyXG4gICAgICAgICAgICAgIGxhYmVsOiBiYWNrZ3JvdW5kTGFiZWwsXHJcbiAgICAgICAgICAgICAgdmFsdWU6IGFudGVjZWRlbnRlcyxcclxuICAgICAgICAgICAgICBjbGFzc05hbWU6IFwiZm9ybS1jb250cm9sIGN1cnNvci1wb2ludGVyXCIsXHJcbiAgICAgICAgICAgICAgcG9pbnRlckJpbmRpbmdzOiBhbnRlY2VkZW50ZXNUYXAsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBpZDogXCJjb25jbHVzaW9uZXNcIixcclxuICAgICAgICAgICAgICBsYWJlbDogY29uY2x1c2lvbnNMYWJlbCxcclxuICAgICAgICAgICAgICB2YWx1ZTogY29uY2x1c2lvbmVzLFxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJmb3JtLWNvbnRyb2wgY3Vyc29yLXBvaW50ZXJcIixcclxuICAgICAgICAgICAgICBwb2ludGVyQmluZGluZ3M6IGNvbmNsdXNpb25lc1RhcCxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIF19XHJcbiAgICAgICAgICBzdGF0dXM9e3N0YXR1c31cclxuICAgICAgICAvPlxyXG4gICAgICApfVxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufVxyXG5cclxuLy8gQ3JlYXRlIGZsb3cgVUkgd3JhcHBlZCBieSB0aGUgZXJyb3IgYm91bmRhcnkuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIENyZWF0ZUZvcm0oKSB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxBcHBFcnJvckJvdW5kYXJ5IGZhbGxiYWNrTWVzc2FnZT17aW5kVChcIlZpc2l0c19DcmVhdGVfRXJyb3JCb3VuZGFyeVwiLCBcIkFuIGVycm9yIG9jY3VycmVkIHdoaWxlIHJlbmRlcmluZyB0aGUgdmlzaXRzIHBhZ2UuIFJlbG9hZCBhbmQgdHJ5IGFnYWluLlwiKX0+XHJcbiAgICAgIDxWaXNpdGFzQXBwIC8+XHJcbiAgICA8L0FwcEVycm9yQm91bmRhcnk+XHJcbiAgKTtcclxufVxyXG4iLCAiaW1wb3J0IHsgdXNlRWZmZWN0IH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5cclxuZXhwb3J0IGNvbnN0IHVzZVRvcGJhciA9IChcclxuICBzdGVwOiBudW1iZXIsXHJcbiAgY2FuR29OZXh0OiBib29sZWFuLFxyXG4gIG9uTmV4dDogKCkgPT4gdm9pZCxcclxuICBvblByZXY6ICgpID0+IHZvaWQsXHJcbiAgYnVzeSA9IGZhbHNlLFxyXG4gIGNhblN1Ym1pdFN0ZXAyID0gdHJ1ZSxcclxuICBjYW5BY2Nlc3MgPSB0cnVlXHJcbikgPT4ge1xyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBmb3J3YXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnbG9iYWxGb3J3YXJkQnRuXCIpIGFzIEhUTUxCdXR0b25FbGVtZW50IHwgbnVsbDtcclxuICAgIGNvbnN0IGJhY2sgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdsb2JhbEJhY2tCdG5cIikgYXMgSFRNTEJ1dHRvbkVsZW1lbnQgfCBudWxsO1xyXG4gICAgY29uc3QgZm9yd2FyZEljb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdsb2JhbEZvcndhcmRJY29uXCIpO1xyXG4gICAgY29uc3QgY3JlYXRlSWNvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2xvYmFsQ3JlYXRlSWNvblwiKTtcclxuXHJcbiAgICBpZiAoZm9yd2FyZCkge1xyXG4gICAgICBjb25zdCBpc1N0ZXAyID0gc3RlcCA9PT0gMjtcclxuICAgICAgY29uc3Qgc2hvd0ZvcndhcmQgPSBjYW5BY2Nlc3MgJiYgKGlzU3RlcDIgfHwgKHN0ZXAgPT09IDEgJiYgY2FuR29OZXh0KSk7XHJcbiAgICAgIGZvcndhcmQuc3R5bGUudmlzaWJpbGl0eSA9IHNob3dGb3J3YXJkID8gXCJ2aXNpYmxlXCIgOiBcImhpZGRlblwiO1xyXG4gICAgICBmb3J3YXJkLmRpc2FibGVkID0gIXNob3dGb3J3YXJkIHx8IGJ1c3k7XHJcbiAgICAgIGZvcndhcmQub25jbGljayA9IHNob3dGb3J3YXJkID8gKCkgPT4gb25OZXh0KCkgOiBudWxsO1xyXG4gICAgICBmb3J3YXJkLnNldEF0dHJpYnV0ZShcclxuICAgICAgICBcImFyaWEtbGFiZWxcIixcclxuICAgICAgICBpc1N0ZXAyID8gaW5kVChcIkNvbW1vbl9DcmVhdGVcIiwgXCJDcmVhdGVcIikgOiBpbmRUKFwiQ29tbW9uX05leHRcIiwgXCJOZXh0XCIpXHJcbiAgICAgICk7XHJcbiAgICAgIGZvcndhcmQuc2V0QXR0cmlidXRlKFwiYXJpYS1kaXNhYmxlZFwiLCBpc1N0ZXAyICYmICFjYW5TdWJtaXRTdGVwMiA/IFwidHJ1ZVwiIDogXCJmYWxzZVwiKTtcclxuICAgICAgZm9yd2FyZC5jbGFzc0xpc3QudG9nZ2xlKFwib3BhY2l0eS01MFwiLCBpc1N0ZXAyICYmICFjYW5TdWJtaXRTdGVwMik7XHJcbiAgICAgIGZvcndhcmQuY2xhc3NMaXN0LnRvZ2dsZShcImN1cnNvci1ub3QtYWxsb3dlZFwiLCBpc1N0ZXAyICYmICFjYW5TdWJtaXRTdGVwMik7XHJcblxyXG4gICAgICBpZiAoZm9yd2FyZEljb24gJiYgY3JlYXRlSWNvbikge1xyXG4gICAgICAgIGlmIChpc1N0ZXAyKSB7XHJcbiAgICAgICAgICBmb3J3YXJkSWNvbi5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xyXG4gICAgICAgICAgY3JlYXRlSWNvbi5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBmb3J3YXJkSWNvbi5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xyXG4gICAgICAgICAgY3JlYXRlSWNvbi5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKGJhY2spIHtcclxuICAgICAgY29uc3Qgc2hvd0JhY2sgPSBjYW5BY2Nlc3MgJiYgc3RlcCA9PT0gMjtcclxuICAgICAgYmFjay5zdHlsZS52aXNpYmlsaXR5ID0gc2hvd0JhY2sgPyBcInZpc2libGVcIiA6IFwiaGlkZGVuXCI7XHJcbiAgICAgIGJhY2suZGlzYWJsZWQgPSAhc2hvd0JhY2sgfHwgYnVzeTtcclxuICAgICAgYmFjay5vbmNsaWNrID0gc2hvd0JhY2sgPyAoKSA9PiBvblByZXYoKSA6IG51bGw7XHJcbiAgICB9XHJcbiAgfSwgW3N0ZXAsIGNhbkdvTmV4dCwgb25OZXh0LCBvblByZXYsIGJ1c3ksIGNhblN1Ym1pdFN0ZXAyLCBjYW5BY2Nlc3NdKTtcclxufTtcclxuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZVJlZiB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBzaG93R2xvYmFsU3Bpbm5lciwgaGlkZUdsb2JhbFNwaW5uZXIgfSBmcm9tIFwiLi4vdXRpbHMvZ2xvYmFsU3Bpbm5lci50c1wiO1xyXG5pbXBvcnQge1xyXG4gIENSRUFURV9GUkVTSF9QQVJBTSxcclxuICBWSVNJVF9EUkFGVF9LRVksXHJcbiAgQ09OVEFDVFNfU1RPUkFHRV9LRVksXHJcbiAgQ09OVEFDVFNfU0VMRUNUSU9OX0tFWSxcclxuICBjbGVhckNyZWF0ZVNlbGVjdGlvbkNhY2hlLFxyXG4gIHN0cmlwRnJlc2hQYXJhbSxcclxufSBmcm9tIFwiLi4vdXRpbHMvdmlzaXRhc1N0b3JhZ2UudHNcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB7IGdldFNlc3Npb25Kc29uV2l0aEV4cGlyeSwgZ2V0U2Vzc2lvblZhbHVlV2l0aEV4cGlyeSwgc2V0U2Vzc2lvbkpzb25XaXRoRXhwaXJ5IH0gZnJvbSBcIi4uL3V0aWxzL3Nlc3Npb25FeHBpcnkudHNcIjtcclxuXHJcbmNvbnN0IENSRUFURV9EUkFGVF9UVExfTVMgPSAyNCAqIDYwICogNjAgKiAxMDAwO1xyXG5cclxudHlwZSBEcmFmdFNuYXBzaG90ID0ge1xyXG4gIHNlbGVjdGVkQ2xpZW50OiBhbnk7XHJcbiAgc2VsZWN0ZWRDb250YWN0czogYW55W107XHJcbiAgdmlzaXRUeXBlOiBzdHJpbmc7XHJcbiAgdHJhbnNEYXRlOiBzdHJpbmc7XHJcbiAgZGVzY3JpcHRpb246IHN0cmluZztcclxuICBjb21lbnRhcmlvczogc3RyaW5nO1xyXG4gIGFudGVjZWRlbnRlczogc3RyaW5nO1xyXG4gIGNvbmNsdXNpb25lczogc3RyaW5nO1xyXG4gIHN0ZXA6IG51bWJlcjtcclxufTtcclxuXHJcbnR5cGUgVXNlQ3JlYXRlRHJhZnRBcmdzID0ge1xyXG4gIGRyYWZ0U25hcHNob3Q6IERyYWZ0U25hcHNob3Q7XHJcbiAgc2V0U2VsZWN0ZWRDbGllbnQ6ICh2YWx1ZTogYW55KSA9PiB2b2lkO1xyXG4gIHNldFNlbGVjdGVkQ29udGFjdHM6ICh2YWx1ZTogYW55W10pID0+IHZvaWQ7XHJcbiAgc2V0VmlzaXRUeXBlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBzZXRUcmFuc0RhdGU6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIHNldERlc2NyaXB0aW9uOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBzZXRDb21lbnRhcmlvczogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgc2V0QW50ZWNlZGVudGVzOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBzZXRDb25jbHVzaW9uZXM6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIHNldFN0ZXA6ICh2YWx1ZTogbnVtYmVyKSA9PiB2b2lkO1xyXG59O1xyXG5cclxuLy8gSGFuZGxlcyB2aXNpdC1jcmVhdGUgZHJhZnQgc2F2ZS9yZXN0b3JlIGxpZmVjeWNsZS5cclxuZXhwb3J0IGNvbnN0IHVzZUNyZWF0ZURyYWZ0ID0gKHtcclxuICBkcmFmdFNuYXBzaG90LFxyXG4gIHNldFNlbGVjdGVkQ2xpZW50LFxyXG4gIHNldFNlbGVjdGVkQ29udGFjdHMsXHJcbiAgc2V0VmlzaXRUeXBlLFxyXG4gIHNldFRyYW5zRGF0ZSxcclxuICBzZXREZXNjcmlwdGlvbixcclxuICBzZXRDb21lbnRhcmlvcyxcclxuICBzZXRBbnRlY2VkZW50ZXMsXHJcbiAgc2V0Q29uY2x1c2lvbmVzLFxyXG4gIHNldFN0ZXAsXHJcbn06IFVzZUNyZWF0ZURyYWZ0QXJncykgPT4ge1xyXG4gIGNvbnN0IGRyYWZ0UmVzdG9yZWRSZWYgPSB1c2VSZWYoZmFsc2UpO1xyXG4gIGNvbnN0IGRyYWZ0UGVyc2lzdFRpbWVyUmVmID0gdXNlUmVmPG51bWJlciB8IG51bGw+KG51bGwpO1xyXG5cclxuICBjb25zdCBwZXJzaXN0RHJhZnRTbmFwc2hvdCA9IHVzZUNhbGxiYWNrKChkcmFmdDogRHJhZnRTbmFwc2hvdCkgPT4ge1xyXG4gICAgc2V0U2Vzc2lvbkpzb25XaXRoRXhwaXJ5KFZJU0lUX0RSQUZUX0tFWSwgZHJhZnQsIENSRUFURV9EUkFGVF9UVExfTVMpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgcGVyc2lzdERyYWZ0Tm93ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgcGVyc2lzdERyYWZ0U25hcHNob3QoZHJhZnRTbmFwc2hvdCk7XHJcbiAgfSwgW2RyYWZ0U25hcHNob3QsIHBlcnNpc3REcmFmdFNuYXBzaG90XSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIWRyYWZ0UmVzdG9yZWRSZWYuY3VycmVudCkgcmV0dXJuO1xyXG5cclxuICAgIGlmIChkcmFmdFBlcnNpc3RUaW1lclJlZi5jdXJyZW50KSB7XHJcbiAgICAgIGNsZWFyVGltZW91dChkcmFmdFBlcnNpc3RUaW1lclJlZi5jdXJyZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBkcmFmdFBlcnNpc3RUaW1lclJlZi5jdXJyZW50ID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBkcmFmdFBlcnNpc3RUaW1lclJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgcGVyc2lzdERyYWZ0U25hcHNob3QoZHJhZnRTbmFwc2hvdCk7XHJcbiAgICB9LCAxODApO1xyXG5cclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIGlmIChkcmFmdFBlcnNpc3RUaW1lclJlZi5jdXJyZW50KSB7XHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KGRyYWZ0UGVyc2lzdFRpbWVyUmVmLmN1cnJlbnQpO1xyXG4gICAgICAgIGRyYWZ0UGVyc2lzdFRpbWVyUmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH0sIFtkcmFmdFNuYXBzaG90LCBwZXJzaXN0RHJhZnRTbmFwc2hvdF0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgbGV0IGZyZXNoTG9hZCA9IGZhbHNlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgdXJsID0gbmV3IFVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XHJcbiAgICAgIGZyZXNoTG9hZCA9IHVybC5zZWFyY2hQYXJhbXMuaGFzKENSRUFURV9GUkVTSF9QQVJBTSk7XHJcbiAgICB9IGNhdGNoIHtcclxuICAgICAgZnJlc2hMb2FkID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGZyZXNoTG9hZCkge1xyXG4gICAgICBjbGVhckNyZWF0ZVNlbGVjdGlvbkNhY2hlKCk7XHJcbiAgICAgIHN0cmlwRnJlc2hQYXJhbSgpO1xyXG4gICAgICBkcmFmdFJlc3RvcmVkUmVmLmN1cnJlbnQgPSB0cnVlO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHNob3VsZFNob3cgPSBmYWxzZTtcclxuICAgIHRyeSB7XHJcbiAgICAgIHNob3VsZFNob3cgPSAhIShcclxuICAgICAgICBnZXRTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KFZJU0lUX0RSQUZUX0tFWSkgfHxcclxuICAgICAgICBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKENPTlRBQ1RTX1NUT1JBR0VfS0VZKSB8fFxyXG4gICAgICAgIHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oQ09OVEFDVFNfU0VMRUNUSU9OX0tFWSlcclxuICAgICAgKTtcclxuICAgIH0gY2F0Y2gge1xyXG4gICAgICAvLyBJZ25vcmUgc3RvcmFnZSBhY2Nlc3MgZXJyb3JzLlxyXG4gICAgfVxyXG4gICAgaWYgKHNob3VsZFNob3cpIHtcclxuICAgICAgc2hvd0dsb2JhbFNwaW5uZXIoaW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKSk7XHJcbiAgICB9XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBkcmFmdCA9IGdldFNlc3Npb25Kc29uV2l0aEV4cGlyeTxEcmFmdFNuYXBzaG90PihWSVNJVF9EUkFGVF9LRVkpO1xyXG4gICAgICBpZiAoZHJhZnQ/LnNlbGVjdGVkQ2xpZW50Py52YWx1ZSkgc2V0U2VsZWN0ZWRDbGllbnQoZHJhZnQuc2VsZWN0ZWRDbGllbnQpO1xyXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShkcmFmdD8uc2VsZWN0ZWRDb250YWN0cykpIHNldFNlbGVjdGVkQ29udGFjdHMoZHJhZnQuc2VsZWN0ZWRDb250YWN0cyk7XHJcbiAgICAgIGlmIChkcmFmdD8udmlzaXRUeXBlICE9PSB1bmRlZmluZWQpIHNldFZpc2l0VHlwZShkcmFmdC52aXNpdFR5cGUpO1xyXG4gICAgICBpZiAoZHJhZnQ/LnRyYW5zRGF0ZSkgc2V0VHJhbnNEYXRlKGRyYWZ0LnRyYW5zRGF0ZSk7XHJcbiAgICAgIGlmIChkcmFmdD8uZGVzY3JpcHRpb24gIT09IHVuZGVmaW5lZCkgc2V0RGVzY3JpcHRpb24oZHJhZnQuZGVzY3JpcHRpb24pO1xyXG4gICAgICBpZiAoZHJhZnQ/LmNvbWVudGFyaW9zICE9PSB1bmRlZmluZWQpIHNldENvbWVudGFyaW9zKGRyYWZ0LmNvbWVudGFyaW9zKTtcclxuICAgICAgaWYgKGRyYWZ0Py5hbnRlY2VkZW50ZXMgIT09IHVuZGVmaW5lZCkgc2V0QW50ZWNlZGVudGVzKGRyYWZ0LmFudGVjZWRlbnRlcyk7XHJcbiAgICAgIGlmIChkcmFmdD8uY29uY2x1c2lvbmVzICE9PSB1bmRlZmluZWQpIHNldENvbmNsdXNpb25lcyhkcmFmdC5jb25jbHVzaW9uZXMpO1xyXG4gICAgICBpZiAoZHJhZnQ/LnN0ZXAgPT09IDIpIHNldFN0ZXAoMik7XHJcbiAgICB9IGNhdGNoIHtcclxuICAgICAgLy8gSWdub3JlIG1hbGZvcm1lZCBkcmFmdCBwYXlsb2Fkcy5cclxuICAgIH0gZmluYWxseSB7XHJcbiAgICAgIGlmIChzaG91bGRTaG93KSB7XHJcbiAgICAgICAgaGlkZUdsb2JhbFNwaW5uZXIoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgZHJhZnRSZXN0b3JlZFJlZi5jdXJyZW50ID0gdHJ1ZTtcclxuICB9LCBbXHJcbiAgICBzZXRBbnRlY2VkZW50ZXMsXHJcbiAgICBzZXRDb21lbnRhcmlvcyxcclxuICAgIHNldENvbmNsdXNpb25lcyxcclxuICAgIHNldERlc2NyaXB0aW9uLFxyXG4gICAgc2V0U2VsZWN0ZWRDbGllbnQsXHJcbiAgICBzZXRTZWxlY3RlZENvbnRhY3RzLFxyXG4gICAgc2V0U3RlcCxcclxuICAgIHNldFRyYW5zRGF0ZSxcclxuICAgIHNldFZpc2l0VHlwZSxcclxuICBdKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHBlcnNpc3REcmFmdE5vdyxcclxuICB9O1xyXG59O1xyXG4iLCAiZXhwb3J0IGNvbnN0IHNob3dHbG9iYWxTcGlubmVyID0gKG1lc3NhZ2U/OiBzdHJpbmcpID0+IHtcclxuICB0cnkge1xyXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIHdpbmRvdy5fX2luZFNob3dHbG9iYWxTcGlubmVyID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgd2luZG93Ll9faW5kU2hvd0dsb2JhbFNwaW5uZXIobWVzc2FnZSk7XHJcbiAgICB9XHJcbiAgfSBjYXRjaCB7XHJcbiAgICAvLyBpZ25vcmVcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgaGlkZUdsb2JhbFNwaW5uZXIgPSAoKSA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiB3aW5kb3cuX19pbmRIaWRlR2xvYmFsU3Bpbm5lciA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgIHdpbmRvdy5fX2luZEhpZGVHbG9iYWxTcGlubmVyKCk7XHJcbiAgICB9XHJcbiAgfSBjYXRjaCB7XHJcbiAgICAvLyBpZ25vcmVcclxuICB9XHJcbn07XHJcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjayB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBmZXRjaEpzb24gfSBmcm9tIFwiLi4vc2VydmljZXMvYXBpU2VydmljZS50c1wiO1xyXG5pbXBvcnQgeyBpbmRFeHRyYWN0SWQsIGluZEV4dHJhY3RTaWduZWRJZCB9IGZyb20gXCIuLi91dGlscy9pbmRJZHMudHNcIjtcclxuaW1wb3J0IHsgaW5kRm9ybWF0LCBpbmRUIH0gZnJvbSBcIi4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHsgc2hvd1Blcm1pc3Npb25Nb2RhbCB9IGZyb20gXCIuLi91dGlscy9wZXJtaXNzaW9ucy50c1wiO1xyXG5pbXBvcnQgeyBmbGFzaEFjdGlvbk1hcmssIHNldEhpc3RvcnlGaWx0ZXJGb3JEYXRlIH0gZnJvbSBcIi4uL3V0aWxzL3Zpc2l0YXNIaXN0b3J5LnRzXCI7XHJcbmltcG9ydCB7IFZJU0lUX0RSQUZUX0tFWSB9IGZyb20gXCIuLi91dGlscy92aXNpdGFzU3RvcmFnZS50c1wiO1xyXG5pbXBvcnQgeyB3YWl0IH0gZnJvbSBcIi4uL3V0aWxzL3dhaXQudHNcIjtcclxuXHJcbnR5cGUgQ29udGFjdE9wdGlvbiA9IHtcclxuICB2YWx1ZTogc3RyaW5nO1xyXG4gIHRleHQ6IHN0cmluZztcclxufTtcclxuXHJcbnR5cGUgTGVnYWN5Q29tbWFuZFJlc3BvbnNlID0ge1xyXG4gIHN1Y2Nlc3M/OiBib29sZWFuO1xyXG4gIG1lc3NhZ2U/OiBzdHJpbmc7XHJcbiAgZGF0YT86IHVua25vd247XHJcbiAgU3VjY2Vzcz86IGJvb2xlYW47XHJcbiAgTWVzc2FnZT86IHN0cmluZztcclxuICBEYXRhPzogdW5rbm93bjtcclxufTtcclxuXHJcbmNvbnN0IGdldExlZ2FjeVJlc3BvbnNlU3VjY2VzcyA9IChyZXNwb25zZTogTGVnYWN5Q29tbWFuZFJlc3BvbnNlKTogYm9vbGVhbiA9PiB7XHJcbiAgcmV0dXJuIHJlc3BvbnNlLnN1Y2Nlc3MgPT09IHRydWUgfHwgcmVzcG9uc2UuU3VjY2VzcyA9PT0gdHJ1ZTtcclxufTtcclxuXHJcbmNvbnN0IGdldExlZ2FjeVJlc3BvbnNlTWVzc2FnZSA9IChyZXNwb25zZTogTGVnYWN5Q29tbWFuZFJlc3BvbnNlKTogc3RyaW5nID0+IHtcclxuICBjb25zdCByYXdNZXNzYWdlID0gcmVzcG9uc2UubWVzc2FnZSA/PyByZXNwb25zZS5NZXNzYWdlO1xyXG4gIHJldHVybiB0eXBlb2YgcmF3TWVzc2FnZSA9PT0gXCJzdHJpbmdcIiA/IHJhd01lc3NhZ2UudHJpbSgpIDogXCJcIjtcclxufTtcclxuXHJcbmNvbnN0IGdldExlZ2FjeVJlc3BvbnNlRGF0YSA9IChyZXNwb25zZTogTGVnYWN5Q29tbWFuZFJlc3BvbnNlKTogdW5rbm93biA9PiB7XHJcbiAgcmV0dXJuIHJlc3BvbnNlLmRhdGEgPz8gcmVzcG9uc2UuRGF0YTtcclxufTtcclxuXHJcbnR5cGUgVXNlQ3JlYXRlU3VibWl0QXJncyA9IHtcclxuICBidXN5OiBib29sZWFuO1xyXG4gIG1vZGFsT3BlbjogYm9vbGVhbjtcclxuICBjYW5DcmVhdGVWaXNpdDogYm9vbGVhbjtcclxuICBjYW5Sb2xsYmFja0RlbGV0ZTogYm9vbGVhbjtcclxuICBzZWxlY3RlZENsaWVudDogeyB2YWx1ZTogc3RyaW5nIH0gfCBudWxsO1xyXG4gIHNlbGVjdGVkQ29udGFjdHM6IENvbnRhY3RPcHRpb25bXTtcclxuICB2aXNpdFR5cGU6IHN0cmluZztcclxuICBkZWZhdWx0QXNpc3RlbnRlVGlwbzogc3RyaW5nO1xyXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgdHJhbnNEYXRlOiBzdHJpbmc7XHJcbiAgY29tZW50YXJpb3M6IHN0cmluZztcclxuICBhbnRlY2VkZW50ZXM6IHN0cmluZztcclxuICBjb25jbHVzaW9uZXM6IHN0cmluZztcclxuICBzZXRCdXN5OiAodmFsdWU6IGJvb2xlYW4pID0+IHZvaWQ7XHJcbiAgc2V0U3RhdHVzOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBzZXRNb2RhbEVycm9yOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBzZXRTaG93UmVxdWlyZWQ6ICh2YWx1ZTogYm9vbGVhbikgPT4gdm9pZDtcclxuICBvcGVuQ29uZmlybTogKG9wdHM6IHtcclxuICAgIHRpdGxlOiBzdHJpbmc7XHJcbiAgICBtZXNzYWdlOiBzdHJpbmc7XHJcbiAgICBjb25maXJtVGV4dD86IHN0cmluZztcclxuICAgIG9uQ29uZmlybT86ICgpID0+IFByb21pc2U8Ym9vbGVhbiB8IHZvaWQ+IHwgYm9vbGVhbiB8IHZvaWQ7XHJcbiAgfSkgPT4gdm9pZDtcclxuICBjbG9zZUNvbmZpcm06ICgpID0+IHZvaWQ7XHJcbn07XHJcblxyXG4vLyBPd25zIGNyZWF0ZS9jb25maXJtIGZsb3cgc28gZm9ybSBjb21wb25lbnQgc3RheXMgZm9jdXNlZCBvbiBVSSBmaWVsZHMuXHJcbmV4cG9ydCBjb25zdCB1c2VDcmVhdGVTdWJtaXQgPSAoe1xyXG4gIGJ1c3ksXHJcbiAgbW9kYWxPcGVuLFxyXG4gIGNhbkNyZWF0ZVZpc2l0LFxyXG4gIGNhblJvbGxiYWNrRGVsZXRlLFxyXG4gIHNlbGVjdGVkQ2xpZW50LFxyXG4gIHNlbGVjdGVkQ29udGFjdHMsXHJcbiAgdmlzaXRUeXBlLFxyXG4gIGRlZmF1bHRBc2lzdGVudGVUaXBvLFxyXG4gIGRlc2NyaXB0aW9uLFxyXG4gIHRyYW5zRGF0ZSxcclxuICBjb21lbnRhcmlvcyxcclxuICBhbnRlY2VkZW50ZXMsXHJcbiAgY29uY2x1c2lvbmVzLFxyXG4gIHNldEJ1c3ksXHJcbiAgc2V0U3RhdHVzLFxyXG4gIHNldE1vZGFsRXJyb3IsXHJcbiAgc2V0U2hvd1JlcXVpcmVkLFxyXG4gIG9wZW5Db25maXJtLFxyXG4gIGNsb3NlQ29uZmlybSxcclxufTogVXNlQ3JlYXRlU3VibWl0QXJncykgPT4ge1xyXG4gIGNvbnN0IGRvQ3JlYXRlID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgaWYgKGJ1c3kpIHJldHVybiBmYWxzZTtcclxuICAgIGlmICghY2FuQ3JlYXRlVmlzaXQpIHtcclxuICAgICAgc2hvd1Blcm1pc3Npb25Nb2RhbCgpO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xyXG4gICAgaWYgKCFzZWxlY3RlZENsaWVudCkge1xyXG4gICAgICBzZXRTdGF0dXMoaW5kVChcIlZpc2l0c19DcmVhdGVfU2VsZWN0Q2xpZW50UmVxdWlyZWRcIiwgXCJTZWxlY3QgYSBjbGllbnQuXCIpKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaWYgKFN0cmluZyh2aXNpdFR5cGUgfHwgXCJcIikgPT09IFwiXCIgfHwgU3RyaW5nKHZpc2l0VHlwZSkgPT09IFwiMFwiIHx8ICFkZXNjcmlwdGlvbi50cmltKCkgfHwgIWNvbWVudGFyaW9zLnRyaW0oKSkge1xyXG4gICAgICBzZXRTaG93UmVxdWlyZWQodHJ1ZSk7XHJcbiAgICAgIHNldFN0YXR1cyhpbmRUKFwiVmlzaXRzX0NyZWF0ZV9Db21wbGV0ZVJlcXVpcmVkXCIsIFwiQ29tcGxldGUgcmVxdWlyZWQgZmllbGRzLlwiKSk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHNldEJ1c3kodHJ1ZSk7XHJcbiAgICBzZXRTdGF0dXMoaW5kVChcIlZpc2l0c19DcmVhdGVfQ3JlYXRpbmdBY3Rpdml0eVwiLCBcIkNyZWF0aW5nIGFjdGl2aXR5Li4uXCIpKTtcclxuXHJcbiAgICBsZXQgY3JlYXRlZFJlY0lkID0gXCJcIjtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHBheWxvYWRBY3Rpdml0eSA9IHtcclxuICAgICAgICBhY2NvdW50TnVtOiBzZWxlY3RlZENsaWVudC52YWx1ZSxcclxuICAgICAgICB2aXNpdFR5cGUsXHJcbiAgICAgICAgZGVzY3JpcHRpb24sXHJcbiAgICAgICAgdHJhbnNEYXRlLFxyXG4gICAgICAgIGNvbWVudGFyaW9zLFxyXG4gICAgICAgIGFudGVjZWRlbnRlcyxcclxuICAgICAgICBjb25jbHVzaW9uZXMsXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBjb25zdCByZXNBY3QgPSBhd2FpdCBmZXRjaEpzb248TGVnYWN5Q29tbWFuZFJlc3BvbnNlPihcIi9WaXNpdGFzL0NyZWF0ZUFjdGl2aXR5XCIsIHtcclxuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcclxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXlsb2FkQWN0aXZpdHkpLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmICghZ2V0TGVnYWN5UmVzcG9uc2VTdWNjZXNzKHJlc0FjdCkpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZ2V0TGVnYWN5UmVzcG9uc2VNZXNzYWdlKHJlc0FjdCkgfHwgaW5kVChcIlZpc2l0c19DcmVhdGVfQ3JlYXRlQWN0aXZpdHlGYWlsZWRcIiwgXCJGYWlsZWQgdG8gY3JlYXRlIGFjdGl2aXR5LlwiKSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IHJlY0lkQWN0aXZpZGFkID1cclxuICAgICAgICBpbmRFeHRyYWN0U2lnbmVkSWQoZ2V0TGVnYWN5UmVzcG9uc2VEYXRhKHJlc0FjdCkpIHx8XHJcbiAgICAgICAgaW5kRXh0cmFjdFNpZ25lZElkKGdldExlZ2FjeVJlc3BvbnNlTWVzc2FnZShyZXNBY3QpKSB8fFxyXG4gICAgICAgIGluZEV4dHJhY3RTaWduZWRJZChpbmRFeHRyYWN0SWQoZ2V0TGVnYWN5UmVzcG9uc2VEYXRhKHJlc0FjdCkpIHx8IGluZEV4dHJhY3RJZChnZXRMZWdhY3lSZXNwb25zZU1lc3NhZ2UocmVzQWN0KSkpO1xyXG4gICAgICBpZiAoIXJlY0lkQWN0aXZpZGFkKSB0aHJvdyBuZXcgRXJyb3IoaW5kVChcIlZpc2l0c19DcmVhdGVfQ3JlYXRlQWN0aXZpdHlGYWlsZWRcIiwgXCJGYWlsZWQgdG8gY3JlYXRlIGFjdGl2aXR5LlwiKSk7XHJcbiAgICAgIGNyZWF0ZWRSZWNJZCA9IFN0cmluZyhyZWNJZEFjdGl2aWRhZCk7XHJcblxyXG4gICAgICBpZiAoc2VsZWN0ZWRDb250YWN0cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgY29uc3QgYXNzaXN0YW50QmF0Y2hTaXplID0gNDtcclxuICAgICAgICBjb25zdCBjcmVhdGVBc3Npc3RhbnQgPSBhc3luYyAoY29udGFjdDogQ29udGFjdE9wdGlvbikgPT4ge1xyXG4gICAgICAgICAgY29uc3QgcGF5bG9hZFZpc2l0YSA9IHtcclxuICAgICAgICAgICAgcmVmUmVjSWRBY3RpdmlkYWQ6IHJlY0lkQWN0aXZpZGFkLFxyXG4gICAgICAgICAgICBhc2lzdGVudGVUaXBvOiBkZWZhdWx0QXNpc3RlbnRlVGlwbyxcclxuICAgICAgICAgICAgYXNpc3RlbnRlSWQ6IGNvbnRhY3QudGV4dCxcclxuICAgICAgICAgICAgY29udGFjdG9SZWNJZDogY29udGFjdC52YWx1ZSxcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgICBjb25zdCByZXNWaXMgPSBhd2FpdCBmZXRjaEpzb248TGVnYWN5Q29tbWFuZFJlc3BvbnNlPihcIi9WaXNpdGFzL0NyZWF0ZVZpc2l0YUFzaXN0ZW50ZVwiLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGF5bG9hZFZpc2l0YSksXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGlmICghZ2V0TGVnYWN5UmVzcG9uc2VTdWNjZXNzKHJlc1ZpcykpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGdldExlZ2FjeVJlc3BvbnNlTWVzc2FnZShyZXNWaXMpIHx8IGluZFQoXCJWaXNpdHNfQ3JlYXRlX0NyZWF0ZVZpc2l0RmFpbGVkXCIsIFwiRmFpbGVkIHRvIGNyZWF0ZSB2aXNpdC5cIikpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGZvciAobGV0IGlkeCA9IDA7IGlkeCA8IHNlbGVjdGVkQ29udGFjdHMubGVuZ3RoOyBpZHggKz0gYXNzaXN0YW50QmF0Y2hTaXplKSB7XHJcbiAgICAgICAgICBjb25zdCBiYXRjaCA9IHNlbGVjdGVkQ29udGFjdHMuc2xpY2UoaWR4LCBpZHggKyBhc3Npc3RhbnRCYXRjaFNpemUpO1xyXG4gICAgICAgICAgY29uc3QgZmlyc3QgPSBiYXRjaFswXTtcclxuICAgICAgICAgIGlmIChmaXJzdCkge1xyXG4gICAgICAgICAgICBzZXRTdGF0dXMoaW5kRm9ybWF0KFwiVmlzaXRzX0NyZWF0ZV9DcmVhdGluZ1Zpc2l0Rm9yXCIsIFwiQ3JlYXRpbmcgdmlzaXQgZm9yIHswfS4uLlwiLCBmaXJzdC50ZXh0KSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBhd2FpdCBQcm9taXNlLmFsbChiYXRjaC5tYXAoKGNvbnRhY3QpID0+IGNyZWF0ZUFzc2lzdGFudChjb250YWN0KSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgdHJ5IHtcclxuICAgICAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKFZJU0lUX0RSQUZUX0tFWSk7XHJcbiAgICAgIH0gY2F0Y2gge1xyXG4gICAgICAgIC8vIElnbm9yZSBzdG9yYWdlIGVycm9ycy5cclxuICAgICAgfVxyXG5cclxuICAgICAgc2V0SGlzdG9yeUZpbHRlckZvckRhdGUodHJhbnNEYXRlLCB0cnVlKTtcclxuICAgICAgY2xvc2VDb25maXJtKCk7XHJcbiAgICAgIGF3YWl0IHdhaXQoMjAwKTtcclxuICAgICAgZmxhc2hBY3Rpb25NYXJrKFwib2tQcm9jZXNzXCIsIDEyMDApO1xyXG4gICAgICBhd2FpdCB3YWl0KDEyMDApO1xyXG4gICAgICB3aW5kb3cuX19pbmRCeXBhc3NOYXZpZ2F0aW9uR3VhcmRPbmNlPy4oKTtcclxuICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9IaXN0b3JpYWwvSGlzdG9yeVwiO1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0gY2F0Y2ggKGU6IHVua25vd24pIHtcclxuICAgICAgaWYgKGNyZWF0ZWRSZWNJZCAmJiBjYW5Sb2xsYmFja0RlbGV0ZSkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICBzZXRTdGF0dXMoaW5kVChcIlZpc2l0c19DcmVhdGVfUm9sbGJhY2tcIiwgXCJSb2xsaW5nIGJhY2sgYWN0aXZpdHkuLi5cIikpO1xyXG4gICAgICAgICAgYXdhaXQgZmV0Y2hKc29uKGAvVmlzaXRhcy9EZWxldGVBY3Rpdml0eS8ke2VuY29kZVVSSUNvbXBvbmVudChjcmVhdGVkUmVjSWQpfWAsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcIkRFTEVURVwiLFxyXG4gICAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gY2F0Y2gge1xyXG4gICAgICAgICAgLy8gS2VlcCBvcmlnaW5hbCBlcnJvciBmbG93LlxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBjb25zdCBtc2cgPSBlIGluc3RhbmNlb2YgRXJyb3IgPyBlLm1lc3NhZ2UgOiBpbmRUKFwiVmlzaXRzX0NyZWF0ZV9DcmVhdGVWaXNpdEVycm9yXCIsIFwiRmFpbGVkIHRvIGNyZWF0ZSB0aGUgdmlzaXQuXCIpO1xyXG4gICAgICBzZXRNb2RhbEVycm9yKG1zZyk7XHJcbiAgICAgIHNldFN0YXR1cyhtc2cpO1xyXG4gICAgICBmbGFzaEFjdGlvbk1hcmsoXCJlcnJvclByb2Nlc3NcIiwgMTUwMCk7XHJcbiAgICAgIHNldEJ1c3koZmFsc2UpO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgfSwgW1xyXG4gICAgYW50ZWNlZGVudGVzLFxyXG4gICAgYnVzeSxcclxuICAgIGNhbkNyZWF0ZVZpc2l0LFxyXG4gICAgY2FuUm9sbGJhY2tEZWxldGUsXHJcbiAgICBjbG9zZUNvbmZpcm0sXHJcbiAgICBjb21lbnRhcmlvcyxcclxuICAgIGNvbmNsdXNpb25lcyxcclxuICAgIGRlZmF1bHRBc2lzdGVudGVUaXBvLFxyXG4gICAgZGVzY3JpcHRpb24sXHJcbiAgICBzZWxlY3RlZENsaWVudCxcclxuICAgIHNlbGVjdGVkQ29udGFjdHMsXHJcbiAgICBzZXRCdXN5LFxyXG4gICAgc2V0TW9kYWxFcnJvcixcclxuICAgIHNldFNob3dSZXF1aXJlZCxcclxuICAgIHNldFN0YXR1cyxcclxuICAgIHRyYW5zRGF0ZSxcclxuICAgIHZpc2l0VHlwZSxcclxuICBdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlU3VibWl0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKGJ1c3kpIHJldHVybjtcclxuICAgIGlmICghY2FuQ3JlYXRlVmlzaXQpIHtcclxuICAgICAgc2hvd1Blcm1pc3Npb25Nb2RhbCgpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAobW9kYWxPcGVuKSByZXR1cm47XHJcbiAgICBpZiAoIXNlbGVjdGVkQ2xpZW50KSB7XHJcbiAgICAgIHNldFN0YXR1cyhpbmRUKFwiVmlzaXRzX0NyZWF0ZV9TZWxlY3RDbGllbnRSZXF1aXJlZFwiLCBcIlNlbGVjdCBhIGNsaWVudC5cIikpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoU3RyaW5nKHZpc2l0VHlwZSB8fCBcIlwiKSA9PT0gXCJcIiB8fCBTdHJpbmcodmlzaXRUeXBlKSA9PT0gXCIwXCIgfHwgIWRlc2NyaXB0aW9uLnRyaW0oKSB8fCAhY29tZW50YXJpb3MudHJpbSgpKSB7XHJcbiAgICAgIHNldFNob3dSZXF1aXJlZCh0cnVlKTtcclxuICAgICAgc2V0U3RhdHVzKGluZFQoXCJWaXNpdHNfQ3JlYXRlX0NvbXBsZXRlUmVxdWlyZWRcIiwgXCJDb21wbGV0ZSByZXF1aXJlZCBmaWVsZHMuXCIpKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgc2V0TW9kYWxFcnJvcihcIlwiKTtcclxuICAgIG9wZW5Db25maXJtKHtcclxuICAgICAgdGl0bGU6IGluZFQoXCJWaXNpdHNfQ3JlYXRlX0NvbmZpcm1DcmVhdGVfVGl0bGVcIiwgXCJWaXNpdHNfQ3JlYXRlX0NvbmZpcm1DcmVhdGVfVGl0bGVcIiksXHJcbiAgICAgIG1lc3NhZ2U6IGluZFQoXCJWaXNpdHNfQ3JlYXRlX0NvbmZpcm1DcmVhdGVfQm9keVwiLCBcIlZpc2l0c19DcmVhdGVfQ29uZmlybUNyZWF0ZV9Cb2R5XCIpLFxyXG4gICAgICBjb25maXJtVGV4dDogaW5kVChcIkNvbmZpcm1fWWVzXCIsIFwiQ29uZmlybV9ZZXNcIiksXHJcbiAgICAgIG9uQ29uZmlybTogZG9DcmVhdGUsXHJcbiAgICB9KTtcclxuICB9LCBbXHJcbiAgICBidXN5LFxyXG4gICAgY2FuQ3JlYXRlVmlzaXQsXHJcbiAgICBjb21lbnRhcmlvcyxcclxuICAgIGRlc2NyaXB0aW9uLFxyXG4gICAgZG9DcmVhdGUsXHJcbiAgICBtb2RhbE9wZW4sXHJcbiAgICBvcGVuQ29uZmlybSxcclxuICAgIHNlbGVjdGVkQ2xpZW50LFxyXG4gICAgc2V0TW9kYWxFcnJvcixcclxuICAgIHNldFNob3dSZXF1aXJlZCxcclxuICAgIHNldFN0YXR1cyxcclxuICAgIHZpc2l0VHlwZSxcclxuICBdKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGRvQ3JlYXRlLFxyXG4gICAgaGFuZGxlU3VibWl0LFxyXG4gIH07XHJcbn07XHJcbiIsICJleHBvcnQgY29uc3QgaW5kRXh0cmFjdElkID0gKHZhbHVlOiB1bmtub3duKTogc3RyaW5nID0+IHtcclxuICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkgcmV0dXJuIFwiXCI7XHJcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiB8fCB0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCIpIHJldHVybiBTdHJpbmcodmFsdWUpLnRyaW0oKTtcclxuICBpZiAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICBjb25zdCBjYW5kaWRhdGUgPVxyXG4gICAgICAodmFsdWUgYXMgYW55KS5yZWNJZCA/P1xyXG4gICAgICAodmFsdWUgYXMgYW55KS5SZWNJZCA/P1xyXG4gICAgICAodmFsdWUgYXMgYW55KS5pZCA/P1xyXG4gICAgICAodmFsdWUgYXMgYW55KS5JZCA/P1xyXG4gICAgICAodmFsdWUgYXMgYW55KS52YWx1ZSA/P1xyXG4gICAgICAodmFsdWUgYXMgYW55KS5WYWx1ZTtcclxuICAgIGlmICh0eXBlb2YgY2FuZGlkYXRlID09PSBcInN0cmluZ1wiIHx8IHR5cGVvZiBjYW5kaWRhdGUgPT09IFwibnVtYmVyXCIpIHJldHVybiBTdHJpbmcoY2FuZGlkYXRlKS50cmltKCk7XHJcbiAgfVxyXG4gIHJldHVybiBcIlwiO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGluZEV4dHJhY3ROdW1lcmljSWQgPSAodmFsdWU6IHVua25vd24sIGRlcHRoID0gMCk6IHN0cmluZyA9PiB7XHJcbiAgaWYgKGRlcHRoID4gMykgcmV0dXJuIFwiXCI7XHJcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHJldHVybiBcIlwiO1xyXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCIgJiYgTnVtYmVyLmlzRmluaXRlKHZhbHVlKSkgcmV0dXJuIFN0cmluZyhNYXRoLnRydW5jKHZhbHVlKSk7XHJcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgY29uc3QgcmF3ID0gdmFsdWUudHJpbSgpO1xyXG4gICAgaWYgKCFyYXcpIHJldHVybiBcIlwiO1xyXG4gICAgaWYgKC9eXFxkKyQvLnRlc3QocmF3KSkgcmV0dXJuIHJhdztcclxuICAgIGNvbnN0IG0gPSByYXcubWF0Y2goLyhcXGR7Myx9KS8pO1xyXG4gICAgcmV0dXJuIG0gPyBtWzFdIDogXCJcIjtcclxuICB9XHJcbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJvYmplY3RcIikgcmV0dXJuIFwiXCI7XHJcbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XHJcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgdmFsdWUpIHtcclxuICAgICAgY29uc3QgZm91bmQgPSBpbmRFeHRyYWN0TnVtZXJpY0lkKGl0ZW0sIGRlcHRoICsgMSk7XHJcbiAgICAgIGlmIChmb3VuZCkgcmV0dXJuIGZvdW5kO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFwiXCI7XHJcbiAgfVxyXG5cclxuICBjb25zdCBrZXlzID0gW1xyXG4gICAgXCJyZWNJZFwiLFxyXG4gICAgXCJSZWNJZFwiLFxyXG4gICAgXCJyZWZSZWNJZEFjdGl2aWRhZFwiLFxyXG4gICAgXCJSZWZSZWNJZEFjdGl2aWRhZFwiLFxyXG4gICAgXCJhY3RpdmlkYWRSZWNJZFwiLFxyXG4gICAgXCJBY3RpdmlkYWRSZWNJZFwiLFxyXG4gICAgXCJpZFwiLFxyXG4gICAgXCJJZFwiLFxyXG4gICAgXCJ2YWx1ZVwiLFxyXG4gICAgXCJWYWx1ZVwiLFxyXG4gICAgXCJyZXN1bHRcIixcclxuICAgIFwiUmVzdWx0XCIsXHJcbiAgICBcImRhdGFcIixcclxuICAgIFwiRGF0YVwiLFxyXG4gICAgXCJtZXNzYWdlXCIsXHJcbiAgICBcIk1lc3NhZ2VcIixcclxuICBdO1xyXG5cclxuICBmb3IgKGNvbnN0IGsgb2Yga2V5cykge1xyXG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgaykpIHtcclxuICAgICAgY29uc3QgZm91bmQgPSBpbmRFeHRyYWN0TnVtZXJpY0lkKCh2YWx1ZSBhcyBhbnkpW2tdLCBkZXB0aCArIDEpO1xyXG4gICAgICBpZiAoZm91bmQpIHJldHVybiBmb3VuZDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZvciAoY29uc3QgdiBvZiBPYmplY3QudmFsdWVzKHZhbHVlIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+KSkge1xyXG4gICAgY29uc3QgZm91bmQgPSBpbmRFeHRyYWN0TnVtZXJpY0lkKHYsIGRlcHRoICsgMSk7XHJcbiAgICBpZiAoZm91bmQpIHJldHVybiBmb3VuZDtcclxuICB9XHJcblxyXG4gIHJldHVybiBcIlwiO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGluZEV4dHJhY3RTaWduZWRJZCA9ICh2YWx1ZTogdW5rbm93biwgZGVwdGggPSAwKTogc3RyaW5nID0+IHtcclxuICBpZiAoZGVwdGggPiAzKSByZXR1cm4gXCJcIjtcclxuICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkgcmV0dXJuIFwiXCI7XHJcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIiAmJiBOdW1iZXIuaXNGaW5pdGUodmFsdWUpKSByZXR1cm4gU3RyaW5nKE1hdGgudHJ1bmModmFsdWUpKTtcclxuICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICBjb25zdCByYXcgPSB2YWx1ZS50cmltKCk7XHJcbiAgICBpZiAoIXJhdykgcmV0dXJuIFwiXCI7XHJcbiAgICBjb25zdCBtYXRjaCA9IHJhdy5tYXRjaCgvLT9cXGR7Myx9Lyk7XHJcbiAgICByZXR1cm4gbWF0Y2ggPyBtYXRjaFswXSA6IFwiXCI7XHJcbiAgfVxyXG4gIGlmICh0eXBlb2YgdmFsdWUgIT09IFwib2JqZWN0XCIpIHJldHVybiBcIlwiO1xyXG4gIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xyXG4gICAgZm9yIChjb25zdCBpdGVtIG9mIHZhbHVlKSB7XHJcbiAgICAgIGNvbnN0IGZvdW5kID0gaW5kRXh0cmFjdFNpZ25lZElkKGl0ZW0sIGRlcHRoICsgMSk7XHJcbiAgICAgIGlmIChmb3VuZCkgcmV0dXJuIGZvdW5kO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFwiXCI7XHJcbiAgfVxyXG5cclxuICBjb25zdCBrZXlzID0gW1xyXG4gICAgXCJyZWNJZFwiLFxyXG4gICAgXCJSZWNJZFwiLFxyXG4gICAgXCJyZWZSZWNJZEFjdGl2aWRhZFwiLFxyXG4gICAgXCJSZWZSZWNJZEFjdGl2aWRhZFwiLFxyXG4gICAgXCJhY3RpdmlkYWRSZWNJZFwiLFxyXG4gICAgXCJBY3RpdmlkYWRSZWNJZFwiLFxyXG4gICAgXCJtZXNzYWdlXCIsXHJcbiAgICBcIk1lc3NhZ2VcIixcclxuICAgIFwicmVzdWx0XCIsXHJcbiAgICBcIlJlc3VsdFwiLFxyXG4gICAgXCJkYXRhXCIsXHJcbiAgICBcIkRhdGFcIixcclxuICBdO1xyXG5cclxuICBmb3IgKGNvbnN0IGsgb2Yga2V5cykge1xyXG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgaykpIHtcclxuICAgICAgY29uc3QgZm91bmQgPSBpbmRFeHRyYWN0U2lnbmVkSWQoKHZhbHVlIGFzIGFueSlba10sIGRlcHRoICsgMSk7XHJcbiAgICAgIGlmIChmb3VuZCkgcmV0dXJuIGZvdW5kO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZm9yIChjb25zdCB2IG9mIE9iamVjdC52YWx1ZXModmFsdWUgYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj4pKSB7XHJcbiAgICBjb25zdCBmb3VuZCA9IGluZEV4dHJhY3RTaWduZWRJZCh2LCBkZXB0aCArIDEpO1xyXG4gICAgaWYgKGZvdW5kKSByZXR1cm4gZm91bmQ7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gXCJcIjtcclxufTtcclxuIiwgImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZUlkLCB1c2VNZW1vLCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IFhNYXJrSWNvbiB9IGZyb20gXCJAaGVyb2ljb25zL3JlYWN0LzIwL3NvbGlkXCI7XHJcbmltcG9ydCBGbG9hdGluZ0xpc3QgZnJvbSBcIi4uL2NvbW1vbnMvRmxvYXRpbmdMaXN0LnRzeFwiO1xyXG5pbXBvcnQgU3Bpbm5lciBmcm9tIFwiLi4vY29tbW9ucy9TcGlubmVyLnRzeFwiO1xyXG5pbXBvcnQgeyBDaGV2cm9uRG93blN2ZywgQ2hldnJvblVwU3ZnIH0gZnJvbSBcIi4uL2NvbW1vbnMvY2hldnJvbnMudHN4XCI7XHJcbmltcG9ydCB7IGZldGNoSnNvbiB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XHJcbmltcG9ydCB7IGhhbmRsZUNvbWJvYm94S2V5RG93biB9IGZyb20gXCIuLi8uLi9ob29rcy91c2VDb21ib2JveEtleWJvYXJkLnRzXCI7XHJcbmltcG9ydCB7IHVzZU91dHNpZGVDbGljayB9IGZyb20gXCIuLi8uLi9ob29rcy91c2VPdXRzaWRlQ2xpY2sudHNcIjtcclxuaW1wb3J0IHsgY2xhc3NOYW1lcyB9IGZyb20gXCIuLi8uLi91dGlscy9jbGFzc05hbWVzLnRzXCI7XHJcbmltcG9ydCB7IGluZEZvcm1hdCwgaW5kVCB9IGZyb20gXCIuLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB7IGlzTm9EYXRhUm93LCBpc05vRGF0YVRleHQgfSBmcm9tIFwiLi4vLi4vdXRpbHMvbm9EYXRhLnRzXCI7XHJcbmltcG9ydCB7IGdldENhY2hlZENvbnRhY3RzLCBzZXRDYWNoZWRDb250YWN0cywgZ2V0U3RvcmVkU2VsZWN0aW9uLCBzZXRTdG9yZWRTZWxlY3Rpb24sIGNsZWFyU3RvcmVkU2VsZWN0aW9uIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Zpc2l0YXNTdG9yYWdlLnRzXCI7XHJcblxyXG50eXBlIENvbnRhY3RPcHRpb24gPSB7XHJcbiAgdmFsdWU6IHN0cmluZztcclxuICB0ZXh0OiBzdHJpbmc7XHJcbiAgY2FyZ286IHN0cmluZztcclxuICBlbXByZXNhOiBzdHJpbmc7XHJcbn07XHJcblxyXG50eXBlIENvbnRhY3RzRHJvcGRvd25SZXNwb25zZSA9IHtcclxuICBpdGVtcz86IHVua25vd25bXTtcclxuICBJdGVtcz86IHVua25vd25bXTtcclxufTtcclxuXHJcbnR5cGUgQ29udGFjdHNDb21ib2JveFByb3BzID0ge1xyXG4gIGFjY291bnROdW0/OiBzdHJpbmc7XHJcbiAgdmFsdWU/OiBDb250YWN0T3B0aW9uW107XHJcbiAgb25DaGFuZ2U6ICh2YWx1ZTogQ29udGFjdE9wdGlvbltdKSA9PiB2b2lkO1xyXG4gIHBvcnRhbENsYXNzTmFtZT86IHN0cmluZztcclxuICBwYW5lbENsYXNzTmFtZT86IHN0cmluZztcclxufTtcclxuXHJcbi8vIE11bHRpLXNlbGVjdCBjb250YWN0cyBjb21ib2JveCB0aWVkIHRvIHRoZSBzZWxlY3RlZCBjbGllbnQuXHJcbmNvbnN0IENvbnRhY3RzQ29tYm9ib3ggPSAoeyBhY2NvdW50TnVtLCB2YWx1ZSA9IFtdLCBvbkNoYW5nZSwgcG9ydGFsQ2xhc3NOYW1lLCBwYW5lbENsYXNzTmFtZSB9OiBDb250YWN0c0NvbWJvYm94UHJvcHMpID0+IHtcclxuICBjb25zdCBbcXVlcnksIHNldFF1ZXJ5XSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtvcHRpb25zLCBzZXRPcHRpb25zXSA9IHVzZVN0YXRlPENvbnRhY3RPcHRpb25bXT4oW10pO1xyXG4gIGNvbnN0IFtzZWxlY3RlZCwgc2V0U2VsZWN0ZWRdID0gdXNlU3RhdGU8Q29udGFjdE9wdGlvbltdPih2YWx1ZSk7XHJcbiAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtsb2FkaW5nTW9yZSwgc2V0TG9hZGluZ01vcmVdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtzdGF0dXMsIHNldFN0YXR1c10gPSB1c2VTdGF0ZShpbmRUKFwiVmlzaXRzX0NyZWF0ZV9TZWxlY3RDbGllbnRGaXJzdFwiLCBcIlNlbGVjdCBhIGNsaWVudCBmaXJzdC5cIikpO1xyXG4gIGNvbnN0IFtoYXNMb2FkZWQsIHNldEhhc0xvYWRlZF0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW29wZW4sIHNldE9wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtwYWdlLCBzZXRQYWdlXSA9IHVzZVN0YXRlKDEpO1xyXG4gIGNvbnN0IFtoYXNNb3JlLCBzZXRIYXNNb3JlXSA9IHVzZVN0YXRlKHRydWUpO1xyXG4gIGNvbnN0IFtibG9ja2luZywgc2V0QmxvY2tpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFthY3RpdmVJbmRleCwgc2V0QWN0aXZlSW5kZXhdID0gdXNlU3RhdGUoMCk7XHJcbiAgY29uc3QgW3Nob3dOb3RGb3VuZFN0YXRlLCBzZXRTaG93Tm90Rm91bmRTdGF0ZV0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgbGlzdFJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IGJveFJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IGFib3J0UmVmID0gdXNlUmVmPEFib3J0Q29udHJvbGxlciB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IGNvbnRhaW5lclJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IGlucHV0UmVmID0gdXNlUmVmPEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBsYXN0QWNjb3VudFJlZiA9IHVzZVJlZihhY2NvdW50TnVtIHx8IFwiXCIpO1xyXG4gIGNvbnN0IG9uQ2hhbmdlUmVmID0gdXNlUmVmKG9uQ2hhbmdlKTtcclxuICBjb25zdCBpZEJhc2UgPSB1c2VJZCgpO1xyXG4gIGNvbnN0IGlucHV0SWQgPSBgJHtpZEJhc2V9LWNvbnRhY3RzLWlucHV0YDtcclxuICBjb25zdCBsaXN0SWQgPSBgJHtpZEJhc2V9LWNvbnRhY3RzLW9wdGlvbnNgO1xyXG5cclxuICB1c2VPdXRzaWRlQ2xpY2soW2NvbnRhaW5lclJlZiwgbGlzdFJlZl0sICgpID0+IHtcclxuICAgIHNldE9wZW4oZmFsc2UpO1xyXG4gICAgc2V0U2hvd05vdEZvdW5kU3RhdGUoZmFsc2UpO1xyXG4gICAgaWYgKHF1ZXJ5LnRyaW0oKSkge1xyXG4gICAgICBzZXRRdWVyeShcIlwiKTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIG9uQ2hhbmdlUmVmLmN1cnJlbnQgPSBvbkNoYW5nZTtcclxuICB9LCBbb25DaGFuZ2VdKTtcclxuXHJcbiAgY29uc3QgaXNTYW1lU2VsZWN0aW9uID0gKGE6IENvbnRhY3RPcHRpb25bXSA9IFtdLCBiOiBDb250YWN0T3B0aW9uW10gPSBbXSkgPT4ge1xyXG4gICAgaWYgKGEubGVuZ3RoICE9PSBiLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgY29uc3QgYXMgPSBhLm1hcCgoeCkgPT4gU3RyaW5nKHgudmFsdWUpKS5zb3J0KCk7XHJcbiAgICBjb25zdCBicyA9IGIubWFwKCh4KSA9PiBTdHJpbmcoeC52YWx1ZSkpLnNvcnQoKTtcclxuICAgIHJldHVybiBhcy5ldmVyeSgodiwgaSkgPT4gdiA9PT0gYnNbaV0pO1xyXG4gIH07XHJcblxyXG4gIC8vIFN5bmMgaW50ZXJuYWwgc2VsZWN0aW9uIHdpdGggdGhlIHByb3AgKGRyYWZ0L2NhY2hlIHJlc3RvcmUpLlxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIWlzU2FtZVNlbGVjdGlvbih2YWx1ZSB8fCBbXSwgc2VsZWN0ZWQpKSB7XHJcbiAgICAgIHNldFNlbGVjdGVkKHZhbHVlIHx8IFtdKTtcclxuICAgIH1cclxuICB9LCBbdmFsdWVdKTtcclxuXHJcbiAgY29uc3QgY2FuY2VsUGVuZGluZyA9ICgpID0+IHtcclxuICAgIGlmIChhYm9ydFJlZi5jdXJyZW50KSB7XHJcbiAgICAgIGFib3J0UmVmLmN1cnJlbnQuYWJvcnQoKTtcclxuICAgICAgYWJvcnRSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIGlmIChhYm9ydFJlZi5jdXJyZW50KSB7XHJcbiAgICAgICAgYWJvcnRSZWYuY3VycmVudC5hYm9ydCgpO1xyXG4gICAgICAgIGFib3J0UmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgcHJpbWVGcm9tQ2FjaGUgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBjYWNoZWQgPSBnZXRDYWNoZWRDb250YWN0cyhhY2NvdW50TnVtKSBhcyBDb250YWN0T3B0aW9uW10gfCBudWxsO1xyXG4gICAgaWYgKGNhY2hlZCkge1xyXG4gICAgICBzZXRPcHRpb25zKGNhY2hlZCk7XHJcbiAgICAgIHNldFNob3dOb3RGb3VuZFN0YXRlKGZhbHNlKTtcclxuICAgICAgc2V0SGFzTG9hZGVkKHRydWUpO1xyXG4gICAgICBzZXRIYXNNb3JlKGNhY2hlZC5sZW5ndGggPT09IDEwKTtcclxuICAgICAgc2V0U3RhdHVzKFxyXG4gICAgICAgIGNhY2hlZC5sZW5ndGhcclxuICAgICAgICAgID8gaW5kRm9ybWF0KFwiVmlzaXRzX0NyZWF0ZV9Db250YWN0Q291bnRDYWNoZVwiLCBcInswfSBjb250YWN0cyAoY2FjaGUpXCIsIGNhY2hlZC5sZW5ndGgpXHJcbiAgICAgICAgICA6IGluZFQoXCJWaXNpdHNfQ3JlYXRlX05vQ29udGFjdHNcIiwgXCJObyBjb250YWN0c1wiKVxyXG4gICAgICApO1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9O1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY2FuY2VsUGVuZGluZygpO1xyXG4gICAgc2V0UXVlcnkoXCJcIik7XHJcbiAgICBzZXRPcGVuKGZhbHNlKTtcclxuICAgIHNldExvYWRpbmcoZmFsc2UpO1xyXG4gICAgc2V0QmxvY2tpbmcoZmFsc2UpO1xyXG4gICAgc2V0TG9hZGluZ01vcmUoZmFsc2UpO1xyXG4gICAgc2V0QWN0aXZlSW5kZXgoMCk7XHJcbiAgICBzZXRTaG93Tm90Rm91bmRTdGF0ZShmYWxzZSk7XHJcbiAgICBzZXRQYWdlKDEpO1xyXG4gICAgc2V0SGFzTW9yZSh0cnVlKTtcclxuXHJcbiAgICBpZiAoIWFjY291bnROdW0pIHtcclxuICAgICAgc2V0T3B0aW9ucyhbXSk7XHJcbiAgICAgIHNldFNlbGVjdGVkKFtdKTtcclxuICAgICAgb25DaGFuZ2VSZWYuY3VycmVudChbXSk7XHJcbiAgICAgIHNldFN0YXR1cyhpbmRUKFwiVmlzaXRzX0NyZWF0ZV9TZWxlY3RDbGllbnRGaXJzdFwiLCBcIlNlbGVjdCBhIGNsaWVudCBmaXJzdC5cIikpO1xyXG4gICAgICBzZXRIYXNMb2FkZWQoZmFsc2UpO1xyXG4gICAgICBjbGVhclN0b3JlZFNlbGVjdGlvbihsYXN0QWNjb3VudFJlZi5jdXJyZW50KTtcclxuICAgICAgbGFzdEFjY291bnRSZWYuY3VycmVudCA9IFwiXCI7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjaGFuZ2VkID0gbGFzdEFjY291bnRSZWYuY3VycmVudCAmJiBsYXN0QWNjb3VudFJlZi5jdXJyZW50ICE9PSBhY2NvdW50TnVtO1xyXG4gICAgaWYgKGNoYW5nZWQpIHtcclxuICAgICAgc2V0U2VsZWN0ZWQoW10pO1xyXG4gICAgICBvbkNoYW5nZVJlZi5jdXJyZW50KFtdKTtcclxuICAgICAgY2xlYXJTdG9yZWRTZWxlY3Rpb24obGFzdEFjY291bnRSZWYuY3VycmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdXNlZENhY2hlID0gcHJpbWVGcm9tQ2FjaGUoKTtcclxuICAgIGlmICghdXNlZENhY2hlKSB7XHJcbiAgICAgIHNldE9wdGlvbnMoW10pO1xyXG4gICAgICBzZXRIYXNMb2FkZWQoZmFsc2UpO1xyXG4gICAgICBzZXRTdGF0dXMoaW5kVChcIlZpc2l0c19DcmVhdGVfUHJlc3NBcnJvd1RvTG9hZENvbnRhY3RzXCIsIFwiUHJlc3MgQXJyb3dEb3duIHRvIGxvYWQgY29udGFjdHMuXCIpKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzdG9yZWRTZWxlY3Rpb24gPSBnZXRTdG9yZWRTZWxlY3Rpb24oYWNjb3VudE51bSkgYXMgQ29udGFjdE9wdGlvbltdO1xyXG4gICAgaWYgKHN0b3JlZFNlbGVjdGlvbi5sZW5ndGggJiYgIXZhbHVlPy5sZW5ndGgpIHtcclxuICAgICAgc2V0U2VsZWN0ZWQoc3RvcmVkU2VsZWN0aW9uKTtcclxuICAgICAgb25DaGFuZ2VSZWYuY3VycmVudChzdG9yZWRTZWxlY3Rpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIGxhc3RBY2NvdW50UmVmLmN1cnJlbnQgPSBhY2NvdW50TnVtO1xyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlYWN0LWhvb2tzL2V4aGF1c3RpdmUtZGVwc1xyXG4gIH0sIFthY2NvdW50TnVtXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBvbkNoYW5nZVJlZi5jdXJyZW50KHNlbGVjdGVkKTtcclxuICAgIGlmIChhY2NvdW50TnVtKSBzZXRTdG9yZWRTZWxlY3Rpb24oYWNjb3VudE51bSwgc2VsZWN0ZWQpO1xyXG4gIH0sIFtzZWxlY3RlZCwgYWNjb3VudE51bV0pO1xyXG5cclxuICBjb25zdCB0b1RleHQgPSAodmFsdWU6IHVua25vd24pOiBzdHJpbmcgPT4ge1xyXG4gICAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHJldHVybiBcIlwiO1xyXG4gICAgcmV0dXJuIFN0cmluZyh2YWx1ZSkudHJpbSgpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGFzT2JqZWN0UmVjb3JkID0gKHZhbHVlOiB1bmtub3duKTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4gfCBudWxsID0+IHtcclxuICAgIGlmICghdmFsdWUgfHwgdHlwZW9mIHZhbHVlICE9PSBcIm9iamVjdFwiIHx8IEFycmF5LmlzQXJyYXkodmFsdWUpKSByZXR1cm4gbnVsbDtcclxuICAgIHJldHVybiB2YWx1ZSBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPjtcclxuICB9O1xyXG5cclxuICBjb25zdCBtYXBDb250YWN0cyA9IChpdGVtczogdW5rbm93bltdID0gW10pID0+XHJcbiAgICBpdGVtc1xyXG4gICAgICAubWFwKChlbnRyeSkgPT4ge1xyXG4gICAgICAgIGlmIChpc05vRGF0YVJvdyhlbnRyeSkpIHJldHVybiBudWxsO1xyXG4gICAgICAgIGNvbnN0IHJlY29yZCA9IGFzT2JqZWN0UmVjb3JkKGVudHJ5KTtcclxuICAgICAgICBpZiAoIXJlY29yZCkgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgICAgIGNvbnN0IHJlY0lkID0gdG9UZXh0KHJlY29yZC5yZWNJZCA/PyByZWNvcmQuUmVjSWQpO1xyXG4gICAgICAgIGNvbnN0IG5hbWUgPSB0b1RleHQocmVjb3JkLm5hbWUgPz8gcmVjb3JkLk5hbWUpO1xyXG4gICAgICAgIGNvbnN0IGNhcmdvID0gdG9UZXh0KHJlY29yZC5jYXJnbyA/PyByZWNvcmQuQ2FyZ28pO1xyXG4gICAgICAgIGNvbnN0IGVtcHJlc2EgPSB0b1RleHQocmVjb3JkLmVtcHJlc2EgPz8gcmVjb3JkLkVtcHJlc2EpO1xyXG5cclxuICAgICAgICBpZiAoIXJlY0lkIHx8IGlzTm9EYXRhVGV4dChuYW1lKSkgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICB2YWx1ZTogcmVjSWQsXHJcbiAgICAgICAgICB0ZXh0OiBuYW1lLnRvVXBwZXJDYXNlKCksXHJcbiAgICAgICAgICBjYXJnbzogY2FyZ28udG9VcHBlckNhc2UoKSxcclxuICAgICAgICAgIGVtcHJlc2E6IGVtcHJlc2EudG9VcHBlckNhc2UoKSxcclxuICAgICAgICB9IGFzIENvbnRhY3RPcHRpb247XHJcbiAgICAgIH0pXHJcbiAgICAgIC5maWx0ZXIoQm9vbGVhbikgYXMgQ29udGFjdE9wdGlvbltdO1xyXG5cclxuICBjb25zdCBsb2FkID0gYXN5bmMgKHBhZ2VUb0xvYWQgPSAxLCBhcHBlbmQgPSBmYWxzZSkgPT4ge1xyXG4gICAgaWYgKCFhY2NvdW50TnVtKSByZXR1cm47XHJcbiAgICBpZiAobG9hZGluZyB8fCBsb2FkaW5nTW9yZSkgcmV0dXJuO1xyXG4gICAgY2FuY2VsUGVuZGluZygpO1xyXG5cclxuICAgIGlmICghYXBwZW5kKSB7XHJcbiAgICAgIHNldExvYWRpbmcodHJ1ZSk7XHJcbiAgICAgIHNldEJsb2NraW5nKHRydWUpO1xyXG4gICAgICBpZiAocGFnZVRvTG9hZCA9PT0gMSkgc2V0U3RhdHVzKGluZFQoXCJWaXNpdHNfQ3JlYXRlX0xvYWRpbmdDb250YWN0c1wiLCBcIkxvYWRpbmcgY29udGFjdHMuLi5cIikpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc2V0TG9hZGluZ01vcmUodHJ1ZSk7XHJcbiAgICAgIHNldEJsb2NraW5nKHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XHJcbiAgICBhYm9ydFJlZi5jdXJyZW50ID0gY29udHJvbGxlcjtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoSnNvbjxDb250YWN0c0Ryb3Bkb3duUmVzcG9uc2U+KFxyXG4gICAgICAgIGAvVmlzaXRhcy9HZXRDb250YWN0c0ZvckRyb3Bkb3duP2FjY291bnROdW09JHtlbmNvZGVVUklDb21wb25lbnQoYWNjb3VudE51bSl9JnBhZ2U9JHtwYWdlVG9Mb2FkfSZwYWdlU2l6ZT0xMGAsXHJcbiAgICAgICAgeyBzaWduYWw6IGNvbnRyb2xsZXIuc2lnbmFsIH1cclxuICAgICAgKTtcclxuICAgICAgY29uc3QgcmF3SXRlbXMgPSBBcnJheS5pc0FycmF5KHJlcy5pdGVtcykgPyByZXMuaXRlbXMgOiBBcnJheS5pc0FycmF5KHJlcy5JdGVtcykgPyByZXMuSXRlbXMgOiBbXTtcclxuICAgICAgY29uc3QgbWFwcGVkID0gbWFwQ29udGFjdHMocmF3SXRlbXMpO1xyXG4gICAgICBzZXRPcHRpb25zKChwcmV2KSA9PiB7XHJcbiAgICAgICAgY29uc3QgbmV4dCA9IGFwcGVuZCA/IFsuLi5wcmV2LCAuLi5tYXBwZWRdIDogbWFwcGVkO1xyXG4gICAgICAgIHNldENhY2hlZENvbnRhY3RzKGFjY291bnROdW0sIG5leHQpO1xyXG4gICAgICAgIHJldHVybiBuZXh0O1xyXG4gICAgICB9KTtcclxuICAgICAgc2V0U2hvd05vdEZvdW5kU3RhdGUoZmFsc2UpO1xyXG4gICAgICBzZXRIYXNMb2FkZWQodHJ1ZSk7XHJcbiAgICAgIHNldEhhc01vcmUobWFwcGVkLmxlbmd0aCA9PT0gMTApO1xyXG4gICAgICBzZXRQYWdlKHBhZ2VUb0xvYWQpO1xyXG4gICAgICBzZXRTdGF0dXMobWFwcGVkLmxlbmd0aCA/IGluZEZvcm1hdChcIlZpc2l0c19DcmVhdGVfQ29udGFjdENvdW50XCIsIFwiezB9IGNvbnRhY3RzXCIsIG1hcHBlZC5sZW5ndGgpIDogaW5kVChcIlZpc2l0c19DcmVhdGVfTm9Db250YWN0c1wiLCBcIk5vIGNvbnRhY3RzXCIpKTtcclxuICAgIH0gY2F0Y2gge1xyXG4gICAgICBzZXRTdGF0dXMoaW5kVChcIlZpc2l0c19DcmVhdGVfTG9hZENvbnRhY3RzRXJyb3JcIiwgXCJGYWlsZWQgdG8gbG9hZCBjb250YWN0cy5cIikpO1xyXG4gICAgfSBmaW5hbGx5IHtcclxuICAgICAgYWJvcnRSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xyXG4gICAgICBzZXRMb2FkaW5nTW9yZShmYWxzZSk7XHJcbiAgICAgIHNldEJsb2NraW5nKGZhbHNlKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBjb25zdCBlbnN1cmVMb2FkZWQgPSAoKSA9PiB7XHJcbiAgICBpZiAoIWFjY291bnROdW0pIHJldHVybjtcclxuICAgIGlmIChoYXNMb2FkZWQgJiYgb3B0aW9ucy5sZW5ndGgpIHJldHVybjtcclxuICAgIGlmIChwcmltZUZyb21DYWNoZSgpKSByZXR1cm47XHJcbiAgICBsb2FkKDEsIGZhbHNlKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBsb2FkTW9yZUNvbnRhY3RzID0gUmVhY3QudXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKCFhY2NvdW50TnVtIHx8ICFoYXNNb3JlIHx8IGxvYWRpbmdNb3JlIHx8IGxvYWRpbmcpIHJldHVybjtcclxuICAgIGxvYWQocGFnZSArIDEsIHRydWUpO1xyXG4gIH0sIFthY2NvdW50TnVtLCBoYXNNb3JlLCBsb2FkaW5nTW9yZSwgbG9hZGluZywgcGFnZV0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFvcGVuIHx8ICFsaXN0UmVmLmN1cnJlbnQpIHJldHVybjtcclxuICAgIGNvbnN0IGVsID0gbGlzdFJlZi5jdXJyZW50O1xyXG4gICAgY29uc3Qgb25TY3JvbGwgPSAoKSA9PiB7XHJcbiAgICAgIGlmIChlbC5zY3JvbGxUb3AgKyBlbC5jbGllbnRIZWlnaHQgPj0gZWwuc2Nyb2xsSGVpZ2h0IC0gOCkgbG9hZE1vcmVDb250YWN0cygpO1xyXG4gICAgfTtcclxuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgb25TY3JvbGwsIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcclxuICAgIHJldHVybiAoKSA9PiBlbC5yZW1vdmVFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIG9uU2Nyb2xsKTtcclxuICB9LCBbb3BlbiwgbG9hZE1vcmVDb250YWN0c10pO1xyXG5cclxuICBjb25zdCBzZWxlY3RlZFZhbHVlcyA9IHVzZU1lbW8oKCkgPT4ge1xyXG4gICAgcmV0dXJuIG5ldyBTZXQoKHNlbGVjdGVkIHx8IFtdKS5tYXAoKHMpID0+IFN0cmluZyhzLnZhbHVlKSkpO1xyXG4gIH0sIFtzZWxlY3RlZF0pO1xyXG5cclxuICBjb25zdCBhdmFpbGFibGVPcHRpb25zID0gdXNlTWVtbygoKSA9PiB7XHJcbiAgICAvLyBIaWRlIGFscmVhZHkgc2VsZWN0ZWQgY29udGFjdHMgZnJvbSB0aGUgZHJvcGRvd24gbGlzdC5cclxuICAgIHJldHVybiAob3B0aW9ucyB8fCBbXSkuZmlsdGVyKChvKSA9PiAhc2VsZWN0ZWRWYWx1ZXMuaGFzKFN0cmluZyhvLnZhbHVlKSkpO1xyXG4gIH0sIFtvcHRpb25zLCBzZWxlY3RlZFZhbHVlc10pO1xyXG5cclxuICBjb25zdCBmaWx0ZXJlZCA9IHVzZU1lbW8oKCkgPT4ge1xyXG4gICAgY29uc3QgcSA9IHF1ZXJ5LnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgaWYgKCFxKSByZXR1cm4gYXZhaWxhYmxlT3B0aW9ucztcclxuICAgIHJldHVybiBhdmFpbGFibGVPcHRpb25zLmZpbHRlcihcclxuICAgICAgKG8pID0+IG8udGV4dC50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHEpIHx8IG8uY2FyZ28udG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhxKSB8fCBvLmVtcHJlc2EudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhxKVxyXG4gICAgKTtcclxuICB9LCBbYXZhaWxhYmxlT3B0aW9ucywgcXVlcnldKTtcclxuICBjb25zdCBzaG91bGRTaG93Tm90Rm91bmRSb3cgPSBzaG93Tm90Rm91bmRTdGF0ZSB8fCAoISFxdWVyeS50cmltKCkgJiYgZmlsdGVyZWQubGVuZ3RoID09PSAwKTtcclxuICBjb25zdCByZXNvbHZlZEFjdGl2ZUluZGV4ID1cclxuICAgIGZpbHRlcmVkLmxlbmd0aCA+IDAgPyBNYXRoLm1pbihNYXRoLm1heChhY3RpdmVJbmRleCwgMCksIGZpbHRlcmVkLmxlbmd0aCAtIDEpIDogMDtcclxuICBjb25zdCBhY3RpdmVJZCA9XHJcbiAgICBvcGVuICYmIGZpbHRlcmVkW3Jlc29sdmVkQWN0aXZlSW5kZXhdID8gYCR7aWRCYXNlfS1jb250YWN0LW9wdC0ke2ZpbHRlcmVkW3Jlc29sdmVkQWN0aXZlSW5kZXhdLnZhbHVlfWAgOiB1bmRlZmluZWQ7XHJcblxyXG4gIGNvbnN0IHRvZ2dsZU9wdGlvbiA9IChvcHQ6IENvbnRhY3RPcHRpb24pID0+IHtcclxuICAgIHNldFNlbGVjdGVkKChwcmV2KSA9PiB7XHJcbiAgICAgIGNvbnN0IGV4aXN0cyA9IHByZXYuc29tZSgocCkgPT4gcC52YWx1ZSA9PT0gb3B0LnZhbHVlKTtcclxuICAgICAgaWYgKGV4aXN0cykgcmV0dXJuIHByZXYuZmlsdGVyKChwKSA9PiBwLnZhbHVlICE9PSBvcHQudmFsdWUpO1xyXG4gICAgICByZXR1cm4gWy4uLnByZXYsIG9wdF07XHJcbiAgICB9KTtcclxuICAgIHNldFNob3dOb3RGb3VuZFN0YXRlKGZhbHNlKTtcclxuICAgIHNldFF1ZXJ5KFwiXCIpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGhhbmRsZUtleURvd24gPSAoZXY6IFJlYWN0LktleWJvYXJkRXZlbnQ8SFRNTElucHV0RWxlbWVudD4pID0+IHtcclxuICAgIGhhbmRsZUNvbWJvYm94S2V5RG93bihldiwge1xyXG4gICAgICBpc09wZW46IG9wZW4sXHJcbiAgICAgIHNldE9wZW4sXHJcbiAgICAgIG9wdGlvbkNvdW50OiBmaWx0ZXJlZC5sZW5ndGgsXHJcbiAgICAgIHNldEFjdGl2ZUluZGV4LFxyXG4gICAgICBvcGVuT25BcnJvdzogdHJ1ZSxcclxuICAgICAgb25BcnJvd05hdmlnYXRlOiBlbnN1cmVMb2FkZWQsXHJcbiAgICAgIG9uRW50ZXJXaGVuT3BlbjogKCkgPT4ge1xyXG4gICAgICAgIGlmIChmaWx0ZXJlZC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICB0b2dnbGVPcHRpb24oZmlsdGVyZWRbcmVzb2x2ZWRBY3RpdmVJbmRleF0gPz8gZmlsdGVyZWRbMF0pO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHF1ZXJ5LnRyaW0oKSkge1xyXG4gICAgICAgICAgc2V0UXVlcnkoXCJcIik7XHJcbiAgICAgICAgICBzZXRTaG93Tm90Rm91bmRTdGF0ZSh0cnVlKTtcclxuICAgICAgICAgIHNldE9wZW4odHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBvbkVudGVyV2hlbkNsb3NlZDogYWNjb3VudE51bVxyXG4gICAgICAgID8gKCkgPT4ge1xyXG4gICAgICAgICAgICBlbnN1cmVMb2FkZWQoKTtcclxuICAgICAgICAgICAgc2V0T3Blbih0cnVlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICA6IHVuZGVmaW5lZCxcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMlwiIHJlZj17Y29udGFpbmVyUmVmfT5cclxuICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZFwiIGh0bWxGb3I9e2lucHV0SWR9PlxyXG4gICAgICAgIHtpbmRUKFwiVmlzaXRzX0NyZWF0ZV9TZWFyY2hDb250YWN0XCIsIFwiU2VhcmNoIGNvbnRhY3RcIil9XHJcbiAgICAgIDwvbGFiZWw+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmVcIj5cclxuICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgcmVmPXtib3hSZWZ9XHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInJlbGF0aXZlIHctZnVsbCBjdXJzb3ItZGVmYXVsdCByb3VuZGVkLVs1cHhdIGJvcmRlci1zbGF0ZS0zMDAgYmctd2hpdGUgdGV4dC1sZWZ0IHNoYWRvdy14cyBmb2N1cy13aXRoaW46Ym9yZGVyLXByaW1hcnkgZm9jdXMtd2l0aGluOnJpbmctMiBmb2N1cy13aXRoaW46cmluZy1wcmltYXJ5IGZvY3VzLXdpdGhpbjpyaW5nLW9mZnNldC0wIHNtOnRleHQtc21cIlxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtd3JhcCBnYXAtMSBweC0zIHB5LTIgbWluLWgtMTBcIj5cclxuICAgICAgICAgICAge3NlbGVjdGVkLm1hcCgoYykgPT4gKFxyXG4gICAgICAgICAgICAgIDxzcGFuXHJcbiAgICAgICAgICAgICAgICBrZXk9e2MudmFsdWV9XHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSByb3VuZGVkLW1kIGJnLXByaW1hcnkvMTAgdGV4dC1zbGF0ZS03MDAgcHgtMiBweS0xIHRleHQteHNcIlxyXG4gICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgIHtjLnRleHR9XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTZWxlY3RlZCgocHJldikgPT4gcHJldi5maWx0ZXIoKHMpID0+IHMudmFsdWUgIT09IGMudmFsdWUpKX1cclxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS03MDAgaG92ZXI6dGV4dC1zbGF0ZS03MDAvODBcIlxyXG4gICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtpbmRUKFwiQ29tbW9uX0RlbGV0ZVwiLCBcIkRlbGV0ZVwiKX1cclxuICAgICAgICAgICAgICAgICAgdGl0bGU9e2luZFQoXCJDb21tb25fRGVsZXRlXCIsIFwiRGVsZXRlXCIpfVxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICA8WE1hcmtJY29uIGNsYXNzTmFtZT1cImgtNCB3LTRcIiBhcmlhLWhpZGRlbj1cInRydWVcIiAvPlxyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICAgICAgaWQ9e2lucHV0SWR9XHJcbiAgICAgICAgICAgICAgbmFtZT17YCR7aWRCYXNlfS1jb250YWN0cy1xdWVyeWB9XHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleC0xIG1pbi13LTMwIGJnLXRyYW5zcGFyZW50IHRleHQtc20gc206dGV4dC1iYXNlIGxlYWRpbmctNSB0ZXh0LXNsYXRlLTkwMCBib3JkZXItbm9uZSBvdXRsaW5lLWhpZGRlbiBweC0xIHB5LTEgZm9jdXM6cmluZy0wIGZvY3VzOmJvcmRlci10cmFuc3BhcmVudFwiXHJcbiAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgc2V0QWN0aXZlSW5kZXgoMCk7XHJcbiAgICAgICAgICAgICAgICBzZXRTaG93Tm90Rm91bmRTdGF0ZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBzZXRRdWVyeShldmVudC50YXJnZXQudmFsdWUpO1xyXG4gICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgb25LZXlEb3duPXtoYW5kbGVLZXlEb3dufVxyXG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtzZWxlY3RlZC5sZW5ndGggPyBcIlwiIDogaW5kVChcIlZpc2l0c19DcmVhdGVfRmlsdGVyUGxhY2Vob2xkZXJcIiwgXCJUeXBlIHRvIGZpbHRlci4uLlwiKX1cclxuICAgICAgICAgICAgICBhdXRvQ29tcGxldGU9XCJvZmZcIlxyXG4gICAgICAgICAgICAgIHJlZj17aW5wdXRSZWZ9XHJcbiAgICAgICAgICAgICAgcmVhZE9ubHk9eyFhY2NvdW50TnVtfVxyXG4gICAgICAgICAgICAgIHJvbGU9XCJjb21ib2JveFwiXHJcbiAgICAgICAgICAgICAgYXJpYS1leHBhbmRlZD17b3Blbn1cclxuICAgICAgICAgICAgICBhcmlhLWNvbnRyb2xzPXtsaXN0SWR9XHJcbiAgICAgICAgICAgICAgYXJpYS1hY3RpdmVkZXNjZW5kYW50PXthY3RpdmVJZH1cclxuICAgICAgICAgICAgICBhcmlhLWF1dG9jb21wbGV0ZT1cImxpc3RcIlxyXG4gICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2luZFQoXCJWaXNpdHNfQ3JlYXRlX1NlYXJjaENvbnRhY3RcIiwgXCJTZWFyY2ggY29udGFjdFwiKX1cclxuICAgICAgICAgICAgICBvbkZvY3VzPXsoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBlbnN1cmVMb2FkZWQoKTtcclxuICAgICAgICAgICAgICAgIHNldE9wZW4odHJ1ZSk7XHJcbiAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgeyhsb2FkaW5nIHx8IGJsb2NraW5nKSAmJiAoXHJcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQteS0wIHJpZ2h0LTkgZmxleCBpdGVtcy1jZW50ZXJcIj5cclxuICAgICAgICAgICAgICAgIDxTcGlubmVyIC8+XHJcbiAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC15LTAgcmlnaHQtMCBmbGV4IGl0ZW1zLWNlbnRlciBwci0yIHRleHQtc2xhdGUtNTAwIGhvdmVyOnRleHQtc2xhdGUtNjAwXCJcclxuICAgICAgICAgICAgYXJpYS1sYWJlbD17b3BlbiA/IGluZFQoXCJEcm9wZG93bl9IaWRlT3B0aW9uc1wiLCBcIkhpZGUgb3B0aW9uc1wiKSA6IGluZFQoXCJEcm9wZG93bl9TaG93T3B0aW9uc1wiLCBcIlNob3cgb3B0aW9uc1wiKX1cclxuICAgICAgICAgICAgYXJpYS1leHBhbmRlZD17b3Blbn1cclxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xyXG4gICAgICAgICAgICAgIGlmICghYWNjb3VudE51bSkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgIGlmIChvcGVuKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRPcGVuKGZhbHNlKTtcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZW5zdXJlTG9hZGVkKCk7XHJcbiAgICAgICAgICAgICAgICBzZXRPcGVuKHRydWUpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfX1cclxuICAgICAgICAgID5cclxuICAgICAgICAgICAge29wZW4gPyA8Q2hldnJvblVwU3ZnIGNsYXNzTmFtZT1cImgtNSB3LTVcIiBhcmlhLWhpZGRlbj1cInRydWVcIiAvPiA6IDxDaGV2cm9uRG93blN2ZyBjbGFzc05hbWU9XCJoLTUgdy01XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgLz59XHJcbiAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxGbG9hdGluZ0xpc3RcclxuICAgICAgICAgICAgYW5jaG9yUmVmPXtib3hSZWZ9XHJcbiAgICAgICAgICAgIG9wZW49e29wZW59XHJcbiAgICAgICAgICAgIHpJbmRleD17MzgwMDAwfVxyXG4gICAgICAgICAgICBtYXhIZWlnaHRDbGFzcz1cIm1heC1oLTcyXCJcclxuICAgICAgICAgICAgcm9sZT1cImxpc3Rib3hcIlxyXG4gICAgICAgICAgICByb3VuZGVkQ2xhc3M9XCJyb3VuZGVkLVs1cHhdXCJcclxuICAgICAgICAgICAgcG9ydGFsQ2xhc3NOYW1lPXtwb3J0YWxDbGFzc05hbWV9XHJcbiAgICAgICAgICAgIHBhbmVsQ2xhc3NOYW1lPXtwYW5lbENsYXNzTmFtZX1cclxuICAgICAgICAgID5cclxuICAgICAgICAgIDxkaXYgcmVmPXtsaXN0UmVmfSBpZD17bGlzdElkfSBhcmlhLW11bHRpc2VsZWN0YWJsZT1cInRydWVcIj5cclxuICAgICAgICAgICAge2xvYWRpbmcgJiYgKFxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgcHgtNCBweS0yIHRleHQtc20gdGV4dC1zbGF0ZS01MDBcIj5cclxuICAgICAgICAgICAgICAgIDxTcGlubmVyIHNpemU9XCJoLTQgdy00XCIgLz5cclxuICAgICAgICAgICAgICAgIHtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfVxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgICB7IWxvYWRpbmcgJiYgb3B0aW9ucy5sZW5ndGggPT09IDAgJiYgKFxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHgtNCBweS0yIHRleHQtc20gdGV4dC1zbGF0ZS01MDBcIj5cclxuICAgICAgICAgICAgICAgIHtoYXNMb2FkZWQgPyBpbmRUKFwiVmlzaXRzX0NyZWF0ZV9Ob0NvbnRhY3RzXCIsIFwiTm8gY29udGFjdHNcIikgOiBpbmRUKFwiVmlzaXRzX0NyZWF0ZV9TZWxlY3RDbGllbnRGaXJzdFwiLCBcIlNlbGVjdCBhIGNsaWVudCBmaXJzdC5cIil9XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgIHshbG9hZGluZyAmJiBvcHRpb25zLmxlbmd0aCA+IDAgJiYgZmlsdGVyZWQubGVuZ3RoID09PSAwICYmIChcclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB4LTQgcHktMiB0ZXh0LXNtIHRleHQtc2xhdGUtNTAwXCI+XHJcbiAgICAgICAgICAgICAgICB7c2hvdWxkU2hvd05vdEZvdW5kUm93XHJcbiAgICAgICAgICAgICAgICAgID8gaW5kVChcIkNvbW1vbl9Ob3RGb3VuZFwiLCBcIk5vdCBmb3VuZFwiKVxyXG4gICAgICAgICAgICAgICAgICA6IGluZFQoXCJWaXNpdHNfQ3JlYXRlX05vTW9yZUNvbnRhY3RzXCIsIFwiTm8gbW9yZSBjb250YWN0cyBhdmFpbGFibGVcIil9XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgIHshbG9hZGluZyAmJlxyXG4gICAgICAgICAgICAgIGZpbHRlcmVkLm1hcCgob3B0LCBpZHgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNlbCA9IHNlbGVjdGVkLnNvbWUoKHMpID0+IHMudmFsdWUgPT09IG9wdC52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpc0FjdGl2ZSA9IGlkeCA9PT0gcmVzb2x2ZWRBY3RpdmVJbmRleDtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgICAgICAgICAgICBrZXk9e29wdC52YWx1ZX1cclxuICAgICAgICAgICAgICAgICAgICBpZD17YCR7aWRCYXNlfS1jb250YWN0LW9wdC0ke29wdC52YWx1ZX1gfVxyXG4gICAgICAgICAgICAgICAgICAgIHJvbGU9XCJvcHRpb25cIlxyXG4gICAgICAgICAgICAgICAgICAgIGFyaWEtc2VsZWN0ZWQ9e3NlbH1cclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXHJcbiAgICAgICAgICAgICAgICAgICAgICBcInJlbGF0aXZlIGZsZXggdy1mdWxsIGN1cnNvci1kZWZhdWx0IHNlbGVjdC1ub25lIGl0ZW1zLXN0YXJ0IHB5LTIgcHgtMyB0ZXh0LWxlZnQgdGV4dC1zbVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgaXNBY3RpdmUgPyBcImJnLXByaW1hcnkgdGV4dC13aGl0ZVwiIDogc2VsID8gXCJiZy1wcmltYXJ5LzEwIHRleHQtcHJpbWFyeVwiIDogXCJ0ZXh0LXNsYXRlLTkwMFwiXHJcbiAgICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgICAgICBvbk1vdXNlRW50ZXI9eygpID0+IHNldEFjdGl2ZUluZGV4KGlkeCl9XHJcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gdG9nZ2xlT3B0aW9uKG9wdCl9XHJcbiAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIGZsZXggZmxleC1jb2wgZ2FwLTAuNSBwci0yXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXCJibG9jayB0cnVuY2F0ZVwiLCBzZWwgPyBcImZvbnQtbWVkaXVtXCIgOiBcImZvbnQtbm9ybWFsXCIpfT57b3B0LnRleHR9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC14cyB0ZXh0LXNsYXRlLTYwMCB0cnVuY2F0ZVwiPntvcHQuY2FyZ299PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgfSl9XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAge2Jsb2NraW5nICYmIChcclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgei03MDAwMCBiZy13aGl0ZS83MCBiYWNrZHJvcC1ibHVyLVsxcHhdIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHJvdW5kZWQtWzVweF1cIj5cclxuICAgICAgICAgICAgICAgIDxTcGlubmVyIHNpemU9XCJoLTYgdy02XCIgLz5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgIDwvRmxvYXRpbmdMaXN0PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgZmxleCBqdXN0aWZ5LWVuZFwiPlxyXG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS01MDAgdGVjaC1pbmZvXCI+e3N0YXR1c308L3NwYW4+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IENvbnRhY3RzQ29tYm9ib3g7XHJcbiIsICJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmZ1bmN0aW9uIFhNYXJrSWNvbih7XG4gIHRpdGxlLFxuICB0aXRsZUlkLFxuICAuLi5wcm9wc1xufSwgc3ZnUmVmKSB7XG4gIHJldHVybiAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChcInN2Z1wiLCBPYmplY3QuYXNzaWduKHtcbiAgICB4bWxuczogXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLFxuICAgIHZpZXdCb3g6IFwiMCAwIDIwIDIwXCIsXG4gICAgZmlsbDogXCJjdXJyZW50Q29sb3JcIixcbiAgICBcImFyaWEtaGlkZGVuXCI6IFwidHJ1ZVwiLFxuICAgIFwiZGF0YS1zbG90XCI6IFwiaWNvblwiLFxuICAgIHJlZjogc3ZnUmVmLFxuICAgIFwiYXJpYS1sYWJlbGxlZGJ5XCI6IHRpdGxlSWRcbiAgfSwgcHJvcHMpLCB0aXRsZSA/IC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KFwidGl0bGVcIiwge1xuICAgIGlkOiB0aXRsZUlkXG4gIH0sIHRpdGxlKSA6IG51bGwsIC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KFwicGF0aFwiLCB7XG4gICAgZDogXCJNNi4yOCA1LjIyYS43NS43NSAwIDAgMC0xLjA2IDEuMDZMOC45NCAxMGwtMy43MiAzLjcyYS43NS43NSAwIDEgMCAxLjA2IDEuMDZMMTAgMTEuMDZsMy43MiAzLjcyYS43NS43NSAwIDEgMCAxLjA2LTEuMDZMMTEuMDYgMTBsMy43Mi0zLjcyYS43NS43NSAwIDAgMC0xLjA2LTEuMDZMMTAgOC45NCA2LjI4IDUuMjJaXCJcbiAgfSkpO1xufVxuY29uc3QgRm9yd2FyZFJlZiA9IC8qI19fUFVSRV9fKi8gUmVhY3QuZm9yd2FyZFJlZihYTWFya0ljb24pO1xuZXhwb3J0IGRlZmF1bHQgRm9yd2FyZFJlZjsiLCAiXHVGRUZGaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgQ2xpZW50U2VhcmNoQ29tYm9ib3ggZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvdmlzaXRhcy9DbGllbnRTZWFyY2hDb21ib2JveC50c3hcIjtcclxuaW1wb3J0IENvbnRhY3RzQ29tYm9ib3ggZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvdmlzaXRhcy9Db250YWN0c0NvbWJvYm94LnRzeFwiO1xyXG5cclxuZXhwb3J0IHR5cGUgQ3JlYXRlU2VsZWN0ZWRDbGllbnQgPSB7XHJcbiAgdmFsdWU6IHN0cmluZztcclxuICB0ZXh0OiBzdHJpbmc7XHJcbiAgY2FyZ28/OiBzdHJpbmc7XHJcbiAgZW1wcmVzYT86IHN0cmluZztcclxufSB8IG51bGw7XHJcblxyXG5leHBvcnQgdHlwZSBDcmVhdGVTZWxlY3RlZENvbnRhY3QgPSB7XHJcbiAgdmFsdWU6IHN0cmluZztcclxuICB0ZXh0OiBzdHJpbmc7XHJcbiAgY2FyZ286IHN0cmluZztcclxuICBlbXByZXNhOiBzdHJpbmc7XHJcbn07XHJcblxyXG50eXBlIENyZWF0ZVN0ZXBDbGllbnRTZWxlY3Rpb25Qcm9wcyA9IHtcclxuICBzZWxlY3RlZENsaWVudDogQ3JlYXRlU2VsZWN0ZWRDbGllbnQ7XHJcbiAgc2VsZWN0ZWRDb250YWN0czogQ3JlYXRlU2VsZWN0ZWRDb250YWN0W107XHJcbiAgb25DbGllbnRTZWxlY3RlZDogKG5leHRDbGllbnQ6IENyZWF0ZVNlbGVjdGVkQ2xpZW50KSA9PiB2b2lkO1xyXG4gIG9uQ29udGFjdHNDaGFuZ2U6IChuZXh0Q29udGFjdHM6IENyZWF0ZVNlbGVjdGVkQ29udGFjdFtdKSA9PiB2b2lkO1xyXG4gIGNsaWVudExhYmVsOiBzdHJpbmc7XHJcbiAgY2xpZW50UGxhY2Vob2xkZXI6IHN0cmluZztcclxuICBzZWxlY3RlZENvbnRhY3RzQ291bnRUZXh0OiBzdHJpbmc7XHJcbn07XHJcblxyXG4vLyBSZW5kZXJzIHN0ZXAgMSB3aGVyZSB1c2VyIHNlbGVjdHMgdGhlIGFjY291bnQgYW5kIHJlbGF0ZWQgY29udGFjdHMuXHJcbmNvbnN0IENyZWF0ZVN0ZXBDbGllbnRTZWxlY3Rpb24gPSAoe1xyXG4gIHNlbGVjdGVkQ2xpZW50LFxyXG4gIHNlbGVjdGVkQ29udGFjdHMsXHJcbiAgb25DbGllbnRTZWxlY3RlZCxcclxuICBvbkNvbnRhY3RzQ2hhbmdlLFxyXG4gIGNsaWVudExhYmVsLFxyXG4gIGNsaWVudFBsYWNlaG9sZGVyLFxyXG4gIHNlbGVjdGVkQ29udGFjdHNDb3VudFRleHQsXHJcbn06IENyZWF0ZVN0ZXBDbGllbnRTZWxlY3Rpb25Qcm9wcykgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNlwiPlxyXG4gICAgICA8Q2xpZW50U2VhcmNoQ29tYm9ib3hcclxuICAgICAgICB2YWx1ZT17c2VsZWN0ZWRDbGllbnR9XHJcbiAgICAgICAgb25TZWxlY3RlZD17b25DbGllbnRTZWxlY3RlZH1cclxuICAgICAgICBsYWJlbD17Y2xpZW50TGFiZWx9XHJcbiAgICAgICAgcGxhY2Vob2xkZXI9e2NsaWVudFBsYWNlaG9sZGVyfVxyXG4gICAgICAgIHBvcnRhbENsYXNzTmFtZT1cInZpc2l0YXMtdHlwb2dyYXBoeVwiXHJcbiAgICAgIC8+XHJcblxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktM1wiPlxyXG4gICAgICAgIDxDb250YWN0c0NvbWJvYm94XHJcbiAgICAgICAgICBhY2NvdW50TnVtPXtzZWxlY3RlZENsaWVudD8udmFsdWV9XHJcbiAgICAgICAgICB2YWx1ZT17c2VsZWN0ZWRDb250YWN0c31cclxuICAgICAgICAgIG9uQ2hhbmdlPXtvbkNvbnRhY3RzQ2hhbmdlfVxyXG4gICAgICAgICAgcG9ydGFsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcclxuICAgICAgICAvPlxyXG4gICAgICAgIHtzZWxlY3RlZENvbnRhY3RzLmxlbmd0aCA+IDAgJiYgKFxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNjAwXCI+XHJcbiAgICAgICAgICAgIHtzZWxlY3RlZENvbnRhY3RzQ291bnRUZXh0fVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKX1cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ3JlYXRlU3RlcENsaWVudFNlbGVjdGlvbjtcclxuIiwgIlx1RkVGRmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFNpbmdsZURhdGVQaWNrZXIgZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9TaW5nbGVEYXRlUGlja2VyLnRzeFwiO1xyXG5pbXBvcnQgU2VsZWN0Q29tYm9ib3ggZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9TZWxlY3RDb21ib2JveC50c3hcIjtcclxuaW1wb3J0IFZpc2l0TmFycmF0aXZlRmllbGRzIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL3Zpc2l0YXMvVmlzaXROYXJyYXRpdmVGaWVsZHMudHN4XCI7XHJcblxyXG50eXBlIFNlbGVjdE9wdGlvbiA9IHtcclxuICB2YWx1ZT86IHN0cmluZyB8IG51bWJlcjtcclxuICBWYWx1ZT86IHN0cmluZyB8IG51bWJlcjtcclxuICB0ZXh0Pzogc3RyaW5nO1xyXG4gIFRleHQ/OiBzdHJpbmc7XHJcbn07XHJcblxyXG50eXBlIE5hcnJhdGl2ZVRhcEZpZWxkID0ge1xyXG4gIGlkOiBzdHJpbmc7XHJcbiAgbGFiZWw6IHN0cmluZztcclxuICB2YWx1ZTogc3RyaW5nO1xyXG4gIGNsYXNzTmFtZTogc3RyaW5nO1xyXG4gIHBvaW50ZXJCaW5kaW5nczoge1xyXG4gICAgb25Qb2ludGVyRG93bj86IFJlYWN0LlBvaW50ZXJFdmVudEhhbmRsZXI8SFRNTFRleHRBcmVhRWxlbWVudD47XHJcbiAgICBvblBvaW50ZXJNb3ZlPzogUmVhY3QuUG9pbnRlckV2ZW50SGFuZGxlcjxIVE1MVGV4dEFyZWFFbGVtZW50PjtcclxuICAgIG9uUG9pbnRlclVwPzogUmVhY3QuUG9pbnRlckV2ZW50SGFuZGxlcjxIVE1MVGV4dEFyZWFFbGVtZW50PjtcclxuICAgIG9uUG9pbnRlckNhbmNlbD86IFJlYWN0LlBvaW50ZXJFdmVudEhhbmRsZXI8SFRNTFRleHRBcmVhRWxlbWVudD47XHJcbiAgfTtcclxufTtcclxuXHJcbnR5cGUgQ3JlYXRlU3RlcFZpc2l0RGV0YWlsc1Byb3BzID0ge1xyXG4gIHRpdGxlOiBzdHJpbmc7XHJcbiAgZGF0ZUxhYmVsOiBzdHJpbmc7XHJcbiAgdHJhbnNEYXRlOiBzdHJpbmc7XHJcbiAgb25UcmFuc0RhdGVDaGFuZ2U6IChuZXh0VmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICB2aXNpdFR5cGVMYWJlbDogc3RyaW5nO1xyXG4gIHZpc2l0VHlwZXM6IFNlbGVjdE9wdGlvbltdO1xyXG4gIHZpc2l0VHlwZTogc3RyaW5nO1xyXG4gIG9uVmlzaXRUeXBlQ2hhbmdlOiAobmV4dFZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgdmlzaXRUeXBlUGxhY2Vob2xkZXI6IHN0cmluZztcclxuICB2aXNpdFR5cGVJbnZhbGlkOiBib29sZWFuO1xyXG4gIGRlc2NyaXB0aW9uTGFiZWw6IHN0cmluZztcclxuICBkZXNjcmlwdGlvblZhbHVlOiBzdHJpbmc7XHJcbiAgZGVzY3JpcHRpb25DbGFzc05hbWU6IHN0cmluZztcclxuICBvbkRlc2NyaXB0aW9uQ2hhbmdlOiAobmV4dFZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgdGFwRmllbGRzOiBOYXJyYXRpdmVUYXBGaWVsZFtdO1xyXG4gIHN0YXR1czogc3RyaW5nO1xyXG59O1xyXG5cclxuLy8gUmVuZGVycyBzdGVwIDIgd2l0aCB2aXNpdCBtZXRhZGF0YSBhbmQgbmFycmF0aXZlIGZpZWxkcy5cclxuY29uc3QgQ3JlYXRlU3RlcFZpc2l0RGV0YWlscyA9ICh7XHJcbiAgdGl0bGUsXHJcbiAgZGF0ZUxhYmVsLFxyXG4gIHRyYW5zRGF0ZSxcclxuICBvblRyYW5zRGF0ZUNoYW5nZSxcclxuICB2aXNpdFR5cGVMYWJlbCxcclxuICB2aXNpdFR5cGVzLFxyXG4gIHZpc2l0VHlwZSxcclxuICBvblZpc2l0VHlwZUNoYW5nZSxcclxuICB2aXNpdFR5cGVQbGFjZWhvbGRlcixcclxuICB2aXNpdFR5cGVJbnZhbGlkLFxyXG4gIGRlc2NyaXB0aW9uTGFiZWwsXHJcbiAgZGVzY3JpcHRpb25WYWx1ZSxcclxuICBkZXNjcmlwdGlvbkNsYXNzTmFtZSxcclxuICBvbkRlc2NyaXB0aW9uQ2hhbmdlLFxyXG4gIHRhcEZpZWxkcyxcclxuICBzdGF0dXMsXHJcbn06IENyZWF0ZVN0ZXBWaXNpdERldGFpbHNQcm9wcykgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNoYWRvdy14cyBnbGFzcy1wYW5lbCBwLTQgc3BhY2UteS00IGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHJvdW5kZWQtMnhsXCI+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1iYXNlIGZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS05MDAgYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTIwMCBwYi0zXCI+XHJcbiAgICAgICAge3RpdGxlfVxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0yIGdhcC00XCI+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ2aXNpdGEtZmllbGQtdGV4dFwiPlxyXG4gICAgICAgICAgPFNpbmdsZURhdGVQaWNrZXIgbGFiZWw9e2RhdGVMYWJlbH0gdmFsdWU9e3RyYW5zRGF0ZX0gb25DaGFuZ2U9e29uVHJhbnNEYXRlQ2hhbmdlfSAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxTZWxlY3RDb21ib2JveFxyXG4gICAgICAgICAgbGFiZWw9e3Zpc2l0VHlwZUxhYmVsfVxyXG4gICAgICAgICAgb3B0aW9ucz17dmlzaXRUeXBlc31cclxuICAgICAgICAgIHZhbHVlPXt2aXNpdFR5cGV9XHJcbiAgICAgICAgICBvbkNoYW5nZT17KG5leHRWYWx1ZSkgPT4gb25WaXNpdFR5cGVDaGFuZ2UoU3RyaW5nKG5leHRWYWx1ZSA/PyBcIlwiKSl9XHJcbiAgICAgICAgICBwbGFjZWhvbGRlcj17dmlzaXRUeXBlUGxhY2Vob2xkZXJ9XHJcbiAgICAgICAgICBpbnZhbGlkPXt2aXNpdFR5cGVJbnZhbGlkfVxyXG4gICAgICAgICAgZW1pdE9uVmFsdWVDaGFuZ2VcclxuICAgICAgICAgIHBvcnRhbENsYXNzTmFtZT1cInZpc2l0YXMtdHlwb2dyYXBoeVwiXHJcbiAgICAgICAgLz5cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICA8VmlzaXROYXJyYXRpdmVGaWVsZHNcclxuICAgICAgICBkZXNjcmlwdGlvbkxhYmVsPXtkZXNjcmlwdGlvbkxhYmVsfVxyXG4gICAgICAgIGRlc2NyaXB0aW9uVmFsdWU9e2Rlc2NyaXB0aW9uVmFsdWV9XHJcbiAgICAgICAgZGVzY3JpcHRpb25DbGFzc05hbWU9e2Rlc2NyaXB0aW9uQ2xhc3NOYW1lfVxyXG4gICAgICAgIG9uRGVzY3JpcHRpb25DaGFuZ2U9e29uRGVzY3JpcHRpb25DaGFuZ2V9XHJcbiAgICAgICAgdGFwRmllbGRzPXt0YXBGaWVsZHN9XHJcbiAgICAgIC8+XHJcblxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0zXCI+XHJcbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LXNsYXRlLTUwMFwiPntzdGF0dXN9PC9zcGFuPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDcmVhdGVTdGVwVmlzaXREZXRhaWxzO1xyXG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgQ3JlYXRlRm9ybSBmcm9tIFwiLi9DcmVhdGVGb3JtLnRzeFwiO1xyXG5pbXBvcnQgVmlzaXRhc1BhZ2VQcm92aWRlcnMgZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9WaXNpdGFzUGFnZVByb3ZpZGVycy50c3hcIjtcclxuaW1wb3J0IHsgbW91bnRSZWFjdElzbGFuZCwgbW91bnRXaGVuRG9jdW1lbnRSZWFkeSB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9yZWFjdElzbGFuZC50c3hcIjtcclxuXHJcbi8vIFBhZ2UgZW50cnkgZm9yIHRoZSB2aXNpdGFzIGNyZWF0ZSBpc2xhbmQuXHJcbmNvbnN0IENyZWF0ZVBhZ2UgPSAoKSA9PiB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxWaXNpdGFzUGFnZVByb3ZpZGVycz5cclxuICAgICAgPENyZWF0ZUZvcm0gLz5cclxuICAgIDwvVmlzaXRhc1BhZ2VQcm92aWRlcnM+XHJcbiAgKTtcclxufTtcclxuXHJcbmNvbnN0IG1vdW50ID0gKCkgPT4ge1xyXG4gIGNvbnN0IHJvb3RFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlzaXRhcy1hcHAtcm9vdFwiKTtcclxuICBpZiAoIXJvb3RFbCkgcmV0dXJuO1xyXG5cclxuICBtb3VudFJlYWN0SXNsYW5kKHJvb3RFbCwgPENyZWF0ZVBhZ2UgLz4pO1xyXG59O1xyXG5cclxubW91bnRXaGVuRG9jdW1lbnRSZWFkeShtb3VudCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDcmVhdGVQYWdlO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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QUFlO0FBQUEsUUFDNUQsV0FBVyxLQUFLLDRCQUE0QixNQUFNO0FBQUEsUUFDbEQ7QUFBQSxRQUNBLG1CQUFtQjtBQUFBLFFBQ25CLGdCQUFnQixLQUFLLGlDQUFpQyxZQUFZO0FBQUEsUUFDbEU7QUFBQSxRQUNBO0FBQUEsUUFDQSxtQkFBbUI7QUFBQSxRQUNuQixzQkFBc0IsS0FBSyx1Q0FBdUMsYUFBYTtBQUFBLFFBQy9FO0FBQUEsUUFDQTtBQUFBLFFBQ0Esa0JBQWtCO0FBQUEsUUFDbEIsc0JBQXNCO0FBQUEsUUFDdEIscUJBQXFCO0FBQUEsUUFDckIsV0FBVztBQUFBLFVBQ1Q7QUFBQSxZQUNFLElBQUk7QUFBQSxZQUNKLE9BQU87QUFBQSxZQUNQLE9BQU87QUFBQSxZQUNQLFdBQVc7QUFBQSxZQUNYLGlCQUFpQjtBQUFBLFVBQ25CO0FBQUEsVUFDQTtBQUFBLFlBQ0UsSUFBSTtBQUFBLFlBQ0osT0FBTztBQUFBLFlBQ1AsT0FBTztBQUFBLFlBQ1AsV0FBVztBQUFBLFlBQ1gsaUJBQWlCO0FBQUEsVUFDbkI7QUFBQSxVQUNBO0FBQUEsWUFDRSxJQUFJO0FBQUEsWUFDSixPQUFPO0FBQUEsWUFDUCxPQUFPO0FBQUEsWUFDUCxXQUFXO0FBQUEsWUFDWCxpQkFBaUI7QUFBQSxVQUNuQjtBQUFBLFFBQ0Y7QUFBQSxRQUNBO0FBQUE7QUFBQSxJQUNGO0FBQUEsS0FFSjtBQUVKO0FBR2UsU0FBUixhQUE4QjtBQUNuQyxTQUNFLDZDQUFDLDRCQUFpQixpQkFBaUIsS0FBSywrQkFBK0IsMEVBQTBFLEdBQy9JLHVEQUFDLGNBQVcsR0FDZDtBQUVKOzs7QVUzWE0sSUFBQUMsc0JBQUE7QUFITixJQUFNLGFBQWEsTUFBTTtBQUN2QixTQUNFLDZDQUFDLGdDQUNDLHVEQUFDLGNBQVcsR0FDZDtBQUVKO0FBRUEsSUFBTSxRQUFRLE1BQU07QUFDbEIsUUFBTSxTQUFTLFNBQVMsZUFBZSxrQkFBa0I7QUFDekQsTUFBSSxDQUFDLE9BQVE7QUFFYixtQkFBaUIsUUFBUSw2Q0FBQyxjQUFXLENBQUU7QUFDekM7QUFFQSx1QkFBdUIsS0FBSztBQUU1QixJQUFPLHFCQUFROyIsCiAgIm5hbWVzIjogWyJpbXBvcnRfcmVhY3QiLCAiY2FuQWNjZXNzIiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgInZhbHVlIiwgIlJlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgIlJlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSJdCn0K
