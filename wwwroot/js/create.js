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
} from "./chunks/chunk-5D3SR5T5.js";
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
} from "./chunks/chunk-AW63WUOB.js";
import {
  SingleDatePicker
} from "./chunks/chunk-TQTUWJA7.js";
import {
  handleComboboxKeyDown
} from "./chunks/chunk-YMDESVRK.js";
import {
  SelectCombobox_default
} from "./chunks/chunk-QKSAMRAN.js";
import {
  ChevronDownSvg,
  ChevronUpSvg,
  FloatingList_default,
  useOutsideClick
} from "./chunks/chunk-OSBLOXTE.js";
import {
  wait
} from "./chunks/chunk-4BE3ZFCK.js";
import {
  ConfirmModal,
  useConfirmDialog
} from "./chunks/chunk-PDB5ASGP.js";
import {
  flashActionMark,
  setHistoryFilterForDate
} from "./chunks/chunk-CBDB7NMA.js";
import {
  VisitasPageProviders_default
} from "./chunks/chunk-YWX6VBOY.js";
import "./chunks/chunk-KUDPX4K4.js";
import {
  Spinner_default,
  canAccess,
  classNames,
  showPermissionModal
} from "./chunks/chunk-UNQYUM6B.js";
import {
  mountReactIsland,
  mountWhenDocumentReady,
  require_jsx_runtime,
  require_react
} from "./chunks/chunk-2NKOKBT5.js";
import {
  fetchJson,
  indFormat,
  indT
} from "./chunks/chunk-PNIKV5DC.js";
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
          className: "relative w-full cursor-default rounded-[var(--radius-xl)] border-slate-300 bg-white text-left shadow-xs focus-within:border-primary focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-0 sm:text-sm",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-wrap gap-1 px-3 py-2 min-h-10", children: [
              selected.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                "span",
                {
                  className: "flex items-center gap-1 rounded-[var(--radius-xl)] bg-primary/10 text-slate-700 px-2 py-1 text-xs",
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
          roundedClass: "rounded-[var(--radius-xl)]",
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
            blocking && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 z-70000 bg-white/70 backdrop-blur-[1px] flex items-center justify-center rounded-[var(--radius-xl)]", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner_default, { size: "h-6 w-6" }) })
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
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "shadow-xs glass-panel p-4 space-y-4 border border-slate-200 rounded-[var(--radius-xl)]", children: [
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
        clientLabel: indT("History_Filter_Client", "Account"),
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvY3JlYWNpb24vQ3JlYXRlRm9ybS50c3giLCAiLi4vcmVhY3Qvc3JjL2hvb2tzL3VzZVRvcGJhci50cyIsICIuLi9yZWFjdC9zcmMvaG9va3MvdXNlQ3JlYXRlRHJhZnQudHMiLCAiLi4vcmVhY3Qvc3JjL3V0aWxzL2dsb2JhbFNwaW5uZXIudHMiLCAiLi4vcmVhY3Qvc3JjL2hvb2tzL3VzZUNyZWF0ZVN1Ym1pdC50cyIsICIuLi9yZWFjdC9zcmMvdXRpbHMvaW5kSWRzLnRzIiwgIi4uL3JlYWN0L3NyYy9jb21wb25lbnRzL3Zpc2l0YXMvQ29udGFjdHNDb21ib2JveC50c3giLCAiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BoZXJvaWNvbnMvcmVhY3QvMjAvc29saWQvZXNtL1hNYXJrSWNvbi5qcyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9jcmVhY2lvbi9DcmVhdGVTdGVwQ2xpZW50U2VsZWN0aW9uLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9jcmVhY2lvbi9DcmVhdGVTdGVwVmlzaXREZXRhaWxzLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9jcmVhY2lvbi9DcmVhdGVQYWdlLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiXHVGRUZGaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlU3RhdGUsIHVzZVJlZiB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgQ29uZmlybU1vZGFsIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvQ29uZmlybU1vZGFsLnRzeFwiO1xyXG5pbXBvcnQgQXBwRXJyb3JCb3VuZGFyeSBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0FwcEVycm9yQm91bmRhcnkudHN4XCI7XHJcbmltcG9ydCB7IHVzZVZpc2l0YXMgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlVmlzaXRhcy50c1wiO1xyXG5pbXBvcnQgeyB1c2VUYXBHdWFyZCB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VUYXBHdWFyZC50c1wiO1xyXG5pbXBvcnQgeyB1c2VUb3BiYXIgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlVG9wYmFyLnRzXCI7XHJcbmltcG9ydCB7IHVzZUNvbmZpcm1EaWFsb2cgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlQ29uZmlybURpYWxvZy50c1wiO1xyXG5pbXBvcnQgeyB1c2VDcmVhdGVEcmFmdCB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VDcmVhdGVEcmFmdC50c1wiO1xyXG5pbXBvcnQgeyB1c2VDcmVhdGVTdWJtaXQgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlQ3JlYXRlU3VibWl0LnRzXCI7XHJcbmltcG9ydCB7IHVzZVRleHRFZGl0b3JGaWVsZHMgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlVGV4dEVkaXRvckZpZWxkcy50c1wiO1xyXG5pbXBvcnQgQ3JlYXRlU3RlcENsaWVudFNlbGVjdGlvbiwgeyBDcmVhdGVTZWxlY3RlZENsaWVudCwgQ3JlYXRlU2VsZWN0ZWRDb250YWN0IH0gZnJvbSBcIi4vQ3JlYXRlU3RlcENsaWVudFNlbGVjdGlvbi50c3hcIjtcclxuaW1wb3J0IENyZWF0ZVN0ZXBWaXNpdERldGFpbHMgZnJvbSBcIi4vQ3JlYXRlU3RlcFZpc2l0RGV0YWlscy50c3hcIjtcclxuaW1wb3J0IHsgY2xhc3NOYW1lcyB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9jbGFzc05hbWVzLnRzXCI7XHJcbmltcG9ydCB7IGluZEZvcm1hdCwgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB7IGNhbkFjY2Vzcywgc2hvd1Blcm1pc3Npb25Nb2RhbCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9wZXJtaXNzaW9ucy50c1wiO1xyXG5pbXBvcnQgeyBzZXRQcmV2aWV3QW5jaG9yLCBzaG93UHJldmlld1Rvb2x0aXAsIGlzT3ZlcmZsb3dpbmcgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvcHJldmlld1Rvb2x0aXAudHNcIjtcclxuaW1wb3J0IHsgbmF2aWdhdGVUb1RleHRFZGl0b3JGaWVsZCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy90ZXh0RWRpdG9yTmF2aWdhdGlvbi50c1wiO1xyXG5pbXBvcnQgeyBmbGFzaEFjdGlvbk1hcmsgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvdmlzaXRhc0hpc3RvcnkudHNcIjtcclxuXHJcbmZ1bmN0aW9uIFZpc2l0YXNBcHAoKSB7XHJcbiAgY29uc3QgeyB2aXNpdFR5cGVzLCBhc2lzdGVudGVUaXBvcyB9ID0gdXNlVmlzaXRhcygpO1xyXG4gIGNvbnN0IGNhbkNyZWF0ZVZpc2l0ID0gY2FuQWNjZXNzKFwiVklTSVRBU19DUkVBQ0lPTlwiLCBcIkFkZFwiKTtcclxuICBjb25zdCBjYW5Sb2xsYmFja0RlbGV0ZSA9IGNhbkFjY2VzcyhcIlZJU0lUQVNfSElTVE9SSUFMXCIsIFwiRnVsbEFjY2Vzc1wiKTtcclxuXHJcbiAgY29uc3QgZmllbGRJZENvbWVudGFyaW9zID0gXCJWaXNpdGEuQ3JlYXRlLkNvbWVudGFyaW9zXCI7XHJcbiAgY29uc3QgZmllbGRJZEFudGVjZWRlbnRlcyA9IFwiVmlzaXRhLkNyZWF0ZS5BbnRlY2VkZW50ZXNcIjtcclxuICBjb25zdCBmaWVsZElkQ29uY2x1c2lvbmVzID0gXCJWaXNpdGEuQ3JlYXRlLkNvbmNsdXNpb25lc1wiO1xyXG5cclxuICBjb25zdCBbc3RlcCwgc2V0U3RlcF0gPSB1c2VTdGF0ZSgxKTtcclxuICBjb25zdCBbc2VsZWN0ZWRDbGllbnQsIHNldFNlbGVjdGVkQ2xpZW50XSA9IHVzZVN0YXRlPENyZWF0ZVNlbGVjdGVkQ2xpZW50PihudWxsKTtcclxuICBjb25zdCBbc2VsZWN0ZWRDb250YWN0cywgc2V0U2VsZWN0ZWRDb250YWN0c10gPSB1c2VTdGF0ZTxDcmVhdGVTZWxlY3RlZENvbnRhY3RbXT4oW10pO1xyXG4gIGNvbnN0IHRvZGF5U3RyaW5nID0gKCkgPT4ge1xyXG4gICAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpO1xyXG4gICAgY29uc3QgeXl5eSA9IHRvZGF5LmdldEZ1bGxZZWFyKCk7XHJcbiAgICBjb25zdCBtbSA9IFN0cmluZyh0b2RheS5nZXRNb250aCgpICsgMSkucGFkU3RhcnQoMiwgXCIwXCIpO1xyXG4gICAgY29uc3QgZGQgPSBTdHJpbmcodG9kYXkuZ2V0RGF0ZSgpKS5wYWRTdGFydCgyLCBcIjBcIik7XHJcbiAgICByZXR1cm4gYCR7eXl5eX0tJHttbX0tJHtkZH1gO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGRlZmF1bHRWaXNpdFR5cGUgPSBTdHJpbmcodmlzaXRUeXBlc1swXT8udmFsdWUgPz8gdmlzaXRUeXBlc1swXT8uVmFsdWUgPz8gXCJcIik7XHJcbiAgY29uc3QgZGVmYXVsdEFzaXN0ZW50ZVRpcG8gPSBTdHJpbmcoYXNpc3RlbnRlVGlwb3NbMF0/LnZhbHVlID8/IGFzaXN0ZW50ZVRpcG9zWzBdPy5WYWx1ZSA/PyBcIjBcIik7XHJcblxyXG4gIGNvbnN0IFt2aXNpdFR5cGUsIHNldFZpc2l0VHlwZV0gPSB1c2VTdGF0ZTxzdHJpbmc+KGRlZmF1bHRWaXNpdFR5cGUpO1xyXG4gIGNvbnN0IFt0cmFuc0RhdGUsIHNldFRyYW5zRGF0ZV0gPSB1c2VTdGF0ZSgoKSA9PiB0b2RheVN0cmluZygpKTtcclxuICBjb25zdCBbZGVzY3JpcHRpb24sIHNldERlc2NyaXB0aW9uXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtjb21lbnRhcmlvcywgc2V0Q29tZW50YXJpb3NdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW2FudGVjZWRlbnRlcywgc2V0QW50ZWNlZGVudGVzXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtjb25jbHVzaW9uZXMsIHNldENvbmNsdXNpb25lc10gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbc3RhdHVzLCBzZXRTdGF0dXNdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW2J1c3ksIHNldEJ1c3ldID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtzaG93UmVxdWlyZWQsIHNldFNob3dSZXF1aXJlZF0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW21vZGFsRXJyb3IsIHNldE1vZGFsRXJyb3JdID0gdXNlU3RhdGUoXCJcIik7XHJcblxyXG4gIGNvbnN0IHsgbW9kYWwsIG9wZW5Db25maXJtLCBjbG9zZUNvbmZpcm0sIGhhbmRsZUNvbmZpcm0gfSA9IHVzZUNvbmZpcm1EaWFsb2coe1xyXG4gICAgZGVmYXVsdENvbmZpcm1UZXh0OiBpbmRUKFwiQ29uZmlybV9ZZXNcIiwgXCJDb25maXJtX1llc1wiKSxcclxuICAgIGRlZmF1bHRDYW5jZWxUZXh0OiBpbmRUKFwiQ29uZmlybV9Ob1wiLCBcIkNvbmZpcm1fTm9cIilcclxuICB9KTtcclxuXHJcbiAgY29uc3QgaGFuZGxlTW9kYWxDb25maXJtID0gUmVhY3QudXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgc2V0TW9kYWxFcnJvcihcIlwiKTtcclxuICAgIGF3YWl0IGhhbmRsZUNvbmZpcm0oe1xyXG4gICAgICBidXN5LFxyXG4gICAgICBvbkVycm9yOiAobXNnKSA9PiB7XHJcbiAgICAgICAgc2V0TW9kYWxFcnJvcihtc2cpO1xyXG4gICAgICAgIHNldFN0YXR1cyhtc2cpO1xyXG4gICAgICAgIGZsYXNoQWN0aW9uTWFyayhcImVycm9yUHJvY2Vzc1wiLCAxNTAwKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSwgW2J1c3ksIGhhbmRsZUNvbmZpcm1dKTtcclxuXHJcbiAgY29uc3QgbW9kYWxMb2FkaW5nVGV4dCA9IGluZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkNvbW1vbl9Mb2FkaW5nXCIpO1xyXG4gIGNvbnN0IG1vZGFsQ2FuY2VsVGV4dCA9IG1vZGFsLmNhbmNlbFRleHQgfHwgaW5kVChcIkNvbmZpcm1fTm9cIiwgXCJDb25maXJtX05vXCIpO1xyXG4gIGNvbnN0IG1vZGFsQ29uZmlybVRleHQgPSBidXN5XHJcbiAgICA/IG1vZGFsTG9hZGluZ1RleHRcclxuICAgIDogKCFidXN5ICYmIG1vZGFsRXJyb3IgPyBpbmRUKFwiQ29tbW9uX09LXCIsIFwiQ29tbW9uX09LXCIpIDogKG1vZGFsLmNvbmZpcm1UZXh0IHx8IGluZFQoXCJDb25maXJtX1llc1wiLCBcIkNvbmZpcm1fWWVzXCIpKSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZU1vZGFsQnV0dG9uQ29uZmlybSA9IFJlYWN0LnVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmICghYnVzeSAmJiBtb2RhbEVycm9yKSB7XHJcbiAgICAgIGNsb3NlQ29uZmlybSgpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBoYW5kbGVNb2RhbENvbmZpcm0oKTtcclxuICB9LCBbYnVzeSwgbW9kYWxFcnJvciwgY2xvc2VDb25maXJtLCBoYW5kbGVNb2RhbENvbmZpcm1dKTtcclxuXHJcbiAgY29uc3QgZHJhZnRTbmFwc2hvdCA9IHVzZU1lbW8oXHJcbiAgICAoKSA9PiAoe1xyXG4gICAgICBzZWxlY3RlZENsaWVudCxcclxuICAgICAgc2VsZWN0ZWRDb250YWN0cyxcclxuICAgICAgdmlzaXRUeXBlLFxyXG4gICAgICB0cmFuc0RhdGUsXHJcbiAgICAgIGRlc2NyaXB0aW9uLFxyXG4gICAgICBjb21lbnRhcmlvcyxcclxuICAgICAgYW50ZWNlZGVudGVzLFxyXG4gICAgICBjb25jbHVzaW9uZXMsXHJcbiAgICAgIHN0ZXAsXHJcbiAgICB9KSxcclxuICAgIFtzZWxlY3RlZENsaWVudCwgc2VsZWN0ZWRDb250YWN0cywgdmlzaXRUeXBlLCB0cmFuc0RhdGUsIGRlc2NyaXB0aW9uLCBjb21lbnRhcmlvcywgYW50ZWNlZGVudGVzLCBjb25jbHVzaW9uZXMsIHN0ZXBdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgeyBwZXJzaXN0RHJhZnROb3cgfSA9IHVzZUNyZWF0ZURyYWZ0KHtcclxuICAgIGRyYWZ0U25hcHNob3QsXHJcbiAgICBzZXRTZWxlY3RlZENsaWVudCxcclxuICAgIHNldFNlbGVjdGVkQ29udGFjdHMsXHJcbiAgICBzZXRWaXNpdFR5cGUsXHJcbiAgICBzZXRUcmFuc0RhdGUsXHJcbiAgICBzZXREZXNjcmlwdGlvbixcclxuICAgIHNldENvbWVudGFyaW9zLFxyXG4gICAgc2V0QW50ZWNlZGVudGVzLFxyXG4gICAgc2V0Q29uY2x1c2lvbmVzLFxyXG4gICAgc2V0U3RlcCxcclxuICB9KTtcclxuXHJcbiAgLy8gT3BlbnMgdGhlIGZ1bGwtc2NyZWVuIHRleHQgZWRpdG9yIGZvciBhIG11bHRpbGluZSBmaWVsZC5cclxuICBjb25zdCBvcGVuVGV4dEVkaXRvciA9IFJlYWN0LnVzZUNhbGxiYWNrKFxyXG4gICAgKGZpZWxkSWQ6IHN0cmluZywgZmllbGRMYWJlbDogc3RyaW5nLCBmaWVsZFZhbHVlOiBzdHJpbmcsIG9wdGlvbnM6IHsgYWxsb3dFZGl0PzogYm9vbGVhbiB9ID0ge30pID0+IHtcclxuICAgICAgbmF2aWdhdGVUb1RleHRFZGl0b3JGaWVsZCh7XHJcbiAgICAgICAgZmllbGRJZCxcclxuICAgICAgICBmaWVsZExhYmVsLFxyXG4gICAgICAgIGZpZWxkVmFsdWUsXHJcbiAgICAgICAgYWxsb3dFZGl0OiBvcHRpb25zPy5hbGxvd0VkaXQgIT09IGZhbHNlLFxyXG4gICAgICAgIGJlZm9yZU5hdmlnYXRlOiBwZXJzaXN0RHJhZnROb3csXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIFtwZXJzaXN0RHJhZnROb3ddXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQ29tZW50YXJpb3NUYXAgPSBSZWFjdC51c2VDYWxsYmFjaygoZXZlbnQpID0+IHtcclxuICAgIGlmIChidXN5KSByZXR1cm47XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgb3BlblRleHRFZGl0b3IoZmllbGRJZENvbWVudGFyaW9zLCBpbmRUKFwiVmlzaXRzX0ZpZWxkX0NvbW1lbnRzXCIsIFwiQ29tbWVudHNcIiksIGNvbWVudGFyaW9zKTtcclxuICB9LCBbYnVzeSwgY29tZW50YXJpb3MsIG9wZW5UZXh0RWRpdG9yXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUNvbWVudGFyaW9zSG9sZCA9IFJlYWN0LnVzZUNhbGxiYWNrKCh0YXJnZXQsIGNsaWVudFkpID0+IHtcclxuICAgIGlmICghdGFyZ2V0IHx8ICFpc092ZXJmbG93aW5nKHRhcmdldCkpIHJldHVybiBmYWxzZTtcclxuICAgIHNldFByZXZpZXdBbmNob3IodGFyZ2V0KTtcclxuICAgIHJldHVybiBzaG93UHJldmlld1Rvb2x0aXAoU3RyaW5nKGNvbWVudGFyaW9zIHx8IFwiXCIpLCBjbGllbnRZKTtcclxuICB9LCBbY29tZW50YXJpb3NdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQW50ZWNlZGVudGVzVGFwID0gUmVhY3QudXNlQ2FsbGJhY2soKGV2ZW50KSA9PiB7XHJcbiAgICBpZiAoYnVzeSkgcmV0dXJuO1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIG9wZW5UZXh0RWRpdG9yKGZpZWxkSWRBbnRlY2VkZW50ZXMsIGluZFQoXCJWaXNpdHNfRmllbGRfQmFja2dyb3VuZFwiLCBcIkJhY2tncm91bmRcIiksIGFudGVjZWRlbnRlcyk7XHJcbiAgfSwgW2J1c3ksIGFudGVjZWRlbnRlcywgb3BlblRleHRFZGl0b3JdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQW50ZWNlZGVudGVzSG9sZCA9IFJlYWN0LnVzZUNhbGxiYWNrKCh0YXJnZXQsIGNsaWVudFkpID0+IHtcclxuICAgIGlmICghdGFyZ2V0IHx8ICFpc092ZXJmbG93aW5nKHRhcmdldCkpIHJldHVybiBmYWxzZTtcclxuICAgIHNldFByZXZpZXdBbmNob3IodGFyZ2V0KTtcclxuICAgIHJldHVybiBzaG93UHJldmlld1Rvb2x0aXAoU3RyaW5nKGFudGVjZWRlbnRlcyB8fCBcIlwiKSwgY2xpZW50WSk7XHJcbiAgfSwgW2FudGVjZWRlbnRlc10pO1xyXG5cclxuICBjb25zdCBoYW5kbGVDb25jbHVzaW9uZXNUYXAgPSBSZWFjdC51c2VDYWxsYmFjaygoZXZlbnQpID0+IHtcclxuICAgIGlmIChidXN5KSByZXR1cm47XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgb3BlblRleHRFZGl0b3IoZmllbGRJZENvbmNsdXNpb25lcywgaW5kVChcIlZpc2l0c19GaWVsZF9Db25jbHVzaW9uc1wiLCBcIkNvbmNsdXNpb25zXCIpLCBjb25jbHVzaW9uZXMpO1xyXG4gIH0sIFtidXN5LCBjb25jbHVzaW9uZXMsIG9wZW5UZXh0RWRpdG9yXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUNvbmNsdXNpb25lc0hvbGQgPSBSZWFjdC51c2VDYWxsYmFjaygodGFyZ2V0LCBjbGllbnRZKSA9PiB7XHJcbiAgICBpZiAoIXRhcmdldCB8fCAhaXNPdmVyZmxvd2luZyh0YXJnZXQpKSByZXR1cm4gZmFsc2U7XHJcbiAgICBzZXRQcmV2aWV3QW5jaG9yKHRhcmdldCk7XHJcbiAgICByZXR1cm4gc2hvd1ByZXZpZXdUb29sdGlwKFN0cmluZyhjb25jbHVzaW9uZXMgfHwgXCJcIiksIGNsaWVudFkpO1xyXG4gIH0sIFtjb25jbHVzaW9uZXNdKTtcclxuXHJcbiAgY29uc3QgY29tZW50YXJpb3NUYXAgPSB1c2VUYXBHdWFyZChoYW5kbGVDb21lbnRhcmlvc1RhcCwgaGFuZGxlQ29tZW50YXJpb3NIb2xkKTtcclxuICBjb25zdCBhbnRlY2VkZW50ZXNUYXAgPSB1c2VUYXBHdWFyZChoYW5kbGVBbnRlY2VkZW50ZXNUYXAsIGhhbmRsZUFudGVjZWRlbnRlc0hvbGQpO1xyXG4gIGNvbnN0IGNvbmNsdXNpb25lc1RhcCA9IHVzZVRhcEd1YXJkKGhhbmRsZUNvbmNsdXNpb25lc1RhcCwgaGFuZGxlQ29uY2x1c2lvbmVzSG9sZCk7XHJcblxyXG4gIGNvbnN0IHRleHRFZGl0b3JCaW5kaW5ncyA9IHVzZU1lbW8oXHJcbiAgICAoKSA9PiBbXHJcbiAgICAgIHsgZmllbGRJZDogZmllbGRJZENvbWVudGFyaW9zLCBhcHBseVZhbHVlOiBzZXRDb21lbnRhcmlvcyB9LFxyXG4gICAgICB7IGZpZWxkSWQ6IGZpZWxkSWRBbnRlY2VkZW50ZXMsIGFwcGx5VmFsdWU6IHNldEFudGVjZWRlbnRlcyB9LFxyXG4gICAgICB7IGZpZWxkSWQ6IGZpZWxkSWRDb25jbHVzaW9uZXMsIGFwcGx5VmFsdWU6IHNldENvbmNsdXNpb25lcyB9LFxyXG4gICAgXSxcclxuICAgIFtmaWVsZElkQW50ZWNlZGVudGVzLCBmaWVsZElkQ29tZW50YXJpb3MsIGZpZWxkSWRDb25jbHVzaW9uZXNdXHJcbiAgKTtcclxuXHJcbiAgdXNlVGV4dEVkaXRvckZpZWxkcyh0ZXh0RWRpdG9yQmluZGluZ3MpO1xyXG5cclxuICAvLyBDbGVhciBjb250YWN0cyBvbmx5IHdoZW4gdGhlIGNsaWVudCBjaGFuZ2VzIChhdm9pZCBjbGVhcmluZyBvbiByZXN0b3JlL3N0ZXAgMiByZXR1cm4pLlxyXG4gIGNvbnN0IHByZXZDbGllbnRSZWYgPSB1c2VSZWYobnVsbCk7XHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IGN1cnJlbnQgPSBzZWxlY3RlZENsaWVudD8udmFsdWU7XHJcbiAgICBpZiAocHJldkNsaWVudFJlZi5jdXJyZW50ICYmIHByZXZDbGllbnRSZWYuY3VycmVudCAhPT0gY3VycmVudCkge1xyXG4gICAgICBzZXRTZWxlY3RlZENvbnRhY3RzKFtdKTtcclxuICAgIH1cclxuICAgIHByZXZDbGllbnRSZWYuY3VycmVudCA9IGN1cnJlbnQ7XHJcbiAgfSwgW3NlbGVjdGVkQ2xpZW50Py52YWx1ZV0pO1xyXG5cclxuICBjb25zdCBsYXN0Q2xpZW50UmVmID0gdXNlUmVmKG51bGwpO1xyXG5cclxuICAvLyBJZiB0aGUgY2xpZW50IGNoYW5nZXMgYWZ0ZXIgc2VsZWN0aW5nIGNvbnRhY3RzLCByZXNldCB0aGUgZW50aXJlIGZvcm0uXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IGN1cnJlbnQgPSBzZWxlY3RlZENsaWVudD8udmFsdWU7XHJcbiAgICBpZiAoIWN1cnJlbnQpIHJldHVybjtcclxuXHJcbiAgICBpZiAobGFzdENsaWVudFJlZi5jdXJyZW50ICYmIGxhc3RDbGllbnRSZWYuY3VycmVudCAhPT0gY3VycmVudCkge1xyXG4gICAgICBzZXRTdGVwKDEpO1xyXG4gICAgICBzZXRTZWxlY3RlZENvbnRhY3RzKFtdKTtcclxuICAgICAgc2V0VmlzaXRUeXBlKGRlZmF1bHRWaXNpdFR5cGUpO1xyXG4gICAgICBzZXRUcmFuc0RhdGUodG9kYXlTdHJpbmcoKSk7XHJcbiAgICAgIHNldERlc2NyaXB0aW9uKFwiXCIpO1xyXG4gICAgICBzZXRDb21lbnRhcmlvcyhcIlwiKTtcclxuICAgICAgc2V0QW50ZWNlZGVudGVzKFwiXCIpO1xyXG4gICAgICBzZXRDb25jbHVzaW9uZXMoXCJcIik7XHJcbiAgICAgIHNldFN0YXR1cyhcIlwiKTtcclxuICAgICAgc2V0QnVzeShmYWxzZSk7XHJcbiAgICB9XHJcbiAgICBsYXN0Q2xpZW50UmVmLmN1cnJlbnQgPSBjdXJyZW50O1xyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlYWN0LWhvb2tzL2V4aGF1c3RpdmUtZGVwc1xyXG4gIH0sIFtzZWxlY3RlZENsaWVudD8udmFsdWVdKTtcclxuXHJcbiAgY29uc3QgY2FuR29OZXh0ID0gISFzZWxlY3RlZENsaWVudDtcclxuICBjb25zdCBjYW5DcmVhdGUgPVxyXG4gICAgISFzZWxlY3RlZENsaWVudCAmJlxyXG4gICAgU3RyaW5nKHZpc2l0VHlwZSB8fCBcIlwiKS50cmltKCkgIT09IFwiXCIgJiZcclxuICAgIFN0cmluZyh2aXNpdFR5cGUpICE9PSBcIjBcIiAmJlxyXG4gICAgZGVzY3JpcHRpb24udHJpbSgpLmxlbmd0aCA+IDAgJiZcclxuICAgIGNvbWVudGFyaW9zLnRyaW0oKS5sZW5ndGggPiAwO1xyXG5cclxuICBjb25zdCBoYXNBY3RpdmVQcm9jZXNzID0gdXNlTWVtbygoKSA9PiB7XHJcbiAgICBpZiAoYnVzeSkgcmV0dXJuIHRydWU7XHJcbiAgICBpZiAoc3RlcCA+IDEpIHJldHVybiB0cnVlO1xyXG4gICAgaWYgKHNlbGVjdGVkQ2xpZW50KSByZXR1cm4gdHJ1ZTtcclxuICAgIGlmIChzZWxlY3RlZENvbnRhY3RzLmxlbmd0aCA+IDApIHJldHVybiB0cnVlO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgZGVzY3JpcHRpb24udHJpbSgpLmxlbmd0aCA+IDAgfHxcclxuICAgICAgY29tZW50YXJpb3MudHJpbSgpLmxlbmd0aCA+IDAgfHxcclxuICAgICAgYW50ZWNlZGVudGVzLnRyaW0oKS5sZW5ndGggPiAwIHx8XHJcbiAgICAgIGNvbmNsdXNpb25lcy50cmltKCkubGVuZ3RoID4gMFxyXG4gICAgKTtcclxuICB9LCBbYW50ZWNlZGVudGVzLCBidXN5LCBjb21lbnRhcmlvcywgY29uY2x1c2lvbmVzLCBkZXNjcmlwdGlvbiwgc2VsZWN0ZWRDbGllbnQsIHNlbGVjdGVkQ29udGFjdHMubGVuZ3RoLCBzdGVwXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICB3aW5kb3cuX19pbmRTZXROYXZpZ2F0aW9uR3VhcmQ/LihoYXNBY3RpdmVQcm9jZXNzKTtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIHdpbmRvdy5fX2luZENsZWFyTmF2aWdhdGlvbkd1YXJkPy4oKTtcclxuICAgIH07XHJcbiAgfSwgW2hhc0FjdGl2ZVByb2Nlc3NdKTtcclxuXHJcbiAgY29uc3QgeyBoYW5kbGVTdWJtaXQgfSA9IHVzZUNyZWF0ZVN1Ym1pdCh7XHJcbiAgICBidXN5LFxyXG4gICAgbW9kYWxPcGVuOiBtb2RhbC5vcGVuLFxyXG4gICAgY2FuQ3JlYXRlVmlzaXQsXHJcbiAgICBjYW5Sb2xsYmFja0RlbGV0ZSxcclxuICAgIHNlbGVjdGVkQ2xpZW50LFxyXG4gICAgc2VsZWN0ZWRDb250YWN0cyxcclxuICAgIHZpc2l0VHlwZSxcclxuICAgIGRlZmF1bHRBc2lzdGVudGVUaXBvLFxyXG4gICAgZGVzY3JpcHRpb24sXHJcbiAgICB0cmFuc0RhdGUsXHJcbiAgICBjb21lbnRhcmlvcyxcclxuICAgIGFudGVjZWRlbnRlcyxcclxuICAgIGNvbmNsdXNpb25lcyxcclxuICAgIHNldEJ1c3ksXHJcbiAgICBzZXRTdGF0dXMsXHJcbiAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgc2V0U2hvd1JlcXVpcmVkLFxyXG4gICAgb3BlbkNvbmZpcm0sXHJcbiAgICBjbG9zZUNvbmZpcm0sXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZVRvcGJhclByaW1hcnkgPSBSZWFjdC51c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAoIWNhbkNyZWF0ZVZpc2l0KSB7XHJcbiAgICAgIHNob3dQZXJtaXNzaW9uTW9kYWwoKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKHN0ZXAgPT09IDEgJiYgY2FuR29OZXh0KSBzZXRTdGVwKDIpO1xyXG4gICAgaWYgKHN0ZXAgPT09IDIpIGhhbmRsZVN1Ym1pdCgpO1xyXG4gIH0sIFtjYW5DcmVhdGVWaXNpdCwgY2FuR29OZXh0LCBoYW5kbGVTdWJtaXQsIHN0ZXBdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlVG9wYmFyQmFjayA9IFJlYWN0LnVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIHNldFN0ZXAoMSk7XHJcbiAgfSwgW10pO1xyXG5cclxuICB1c2VUb3BiYXIoc3RlcCwgY2FuR29OZXh0LCBoYW5kbGVUb3BiYXJQcmltYXJ5LCBoYW5kbGVUb3BiYXJCYWNrLCBidXN5LCBjYW5DcmVhdGUsIGNhbkNyZWF0ZVZpc2l0KTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmIChzdGVwID09PSAxKSB7XHJcbiAgICAgIHNldFNob3dSZXF1aXJlZChmYWxzZSk7XHJcbiAgICAgIGNsb3NlQ29uZmlybSgpO1xyXG4gICAgfVxyXG4gIH0sIFtzdGVwLCBjbG9zZUNvbmZpcm1dKTtcclxuXHJcbiAgY29uc3QgdmlzaXRUeXBlSW52YWxpZCA9IHNob3dSZXF1aXJlZCAmJiAoU3RyaW5nKHZpc2l0VHlwZSB8fCBcIlwiKSA9PT0gXCJcIiB8fCBTdHJpbmcodmlzaXRUeXBlKSA9PT0gXCIwXCIpO1xyXG4gIGNvbnN0IGRlc2NyaXB0aW9uSW52YWxpZCA9IHNob3dSZXF1aXJlZCAmJiBkZXNjcmlwdGlvbi50cmltKCkubGVuZ3RoID09PSAwO1xyXG4gIGNvbnN0IGNvbWVudGFyaW9zSW52YWxpZCA9IHNob3dSZXF1aXJlZCAmJiBjb21lbnRhcmlvcy50cmltKCkubGVuZ3RoID09PSAwO1xyXG4gIGNvbnN0IGRlc2NyaXB0aW9uSW5wdXRDbGFzc05hbWUgPSBjbGFzc05hbWVzKFxyXG4gICAgXCJmb3JtLWNvbnRyb2xcIixcclxuICAgIGRlc2NyaXB0aW9uSW52YWxpZFxyXG4gICAgICA/IFwiYm9yZGVyLXJvc2UtNDAwIGJnLXJvc2UtNTAgZm9jdXM6cmluZy1yb3NlLTIwMCBmb2N1czpib3JkZXItcm9zZS00MDBcIlxyXG4gICAgICA6IFwiYm9yZGVyLXNsYXRlLTIwMCBmb2N1czpyaW5nLXByaW1hcnkgZm9jdXM6Ym9yZGVyLXByaW1hcnlcIlxyXG4gICk7XHJcbiAgY29uc3QgY29tZW50YXJpb3NDbGFzc05hbWUgPSBjbGFzc05hbWVzKFxyXG4gICAgXCJmb3JtLWNvbnRyb2wgY3Vyc29yLXBvaW50ZXJcIixcclxuICAgIGNvbWVudGFyaW9zSW52YWxpZFxyXG4gICAgICA/IFwiYm9yZGVyLXJvc2UtNDAwIGJnLXJvc2UtNTAgZm9jdXM6cmluZy1yb3NlLTIwMCBmb2N1czpib3JkZXItcm9zZS00MDBcIlxyXG4gICAgICA6IFwiYm9yZGVyLXNsYXRlLTIwMCBmb2N1czpyaW5nLXByaW1hcnkgZm9jdXM6Ym9yZGVyLXByaW1hcnlcIlxyXG4gICk7XHJcbiAgY29uc3QgZGVzY3JpcHRpb25MYWJlbCA9IGluZFQoXCJWaXNpdHNfRmllbGRfRGVzY3JpcHRpb25cIiwgXCJEZXNjcmlwdGlvblwiKTtcclxuICBjb25zdCBjb21tZW50c0xhYmVsID0gaW5kVChcIlZpc2l0c19GaWVsZF9Db21tZW50c1wiLCBcIkNvbW1lbnRzXCIpO1xyXG4gIGNvbnN0IGJhY2tncm91bmRMYWJlbCA9IGluZFQoXCJWaXNpdHNfRmllbGRfQmFja2dyb3VuZFwiLCBcIkJhY2tncm91bmRcIik7XHJcbiAgY29uc3QgY29uY2x1c2lvbnNMYWJlbCA9IGluZFQoXCJWaXNpdHNfRmllbGRfQ29uY2x1c2lvbnNcIiwgXCJDb25jbHVzaW9uc1wiKTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS00XCI+XHJcbiAgICAgIDxDb25maXJtTW9kYWxcclxuICAgICAgICBvcGVuPXttb2RhbC5vcGVufVxyXG4gICAgICAgIHRpdGxlPXttb2RhbC50aXRsZX1cclxuICAgICAgICBtZXNzYWdlPXttb2RhbC5tZXNzYWdlfVxyXG4gICAgICAgIGNvbmZpcm1UZXh0PXttb2RhbENvbmZpcm1UZXh0fVxyXG4gICAgICAgIGNhbmNlbFRleHQ9e21vZGFsQ2FuY2VsVGV4dH1cclxuICAgICAgICBsb2FkaW5nVGV4dD17bW9kYWxMb2FkaW5nVGV4dH1cclxuICAgICAgICBzaG93Q2FuY2VsPXttb2RhbC5zaG93Q2FuY2VsfVxyXG4gICAgICAgIHNob3dDb25maXJtPXttb2RhbC5zaG93Q29uZmlybX1cclxuICAgICAgICBidXN5PXtidXN5fVxyXG4gICAgICAgIGVycm9yPXttb2RhbEVycm9yfVxyXG4gICAgICAgIHN0YXR1cz17c3RhdHVzfVxyXG4gICAgICAgIG9uQ29uZmlybT17aGFuZGxlTW9kYWxCdXR0b25Db25maXJtfVxyXG4gICAgICAgIG9uQ2FuY2VsPXtjbG9zZUNvbmZpcm19XHJcbiAgICAgIC8+XHJcbiAgICAgIHtzdGVwID09PSAxICYmIChcclxuICAgICAgICA8Q3JlYXRlU3RlcENsaWVudFNlbGVjdGlvblxyXG4gICAgICAgICAgc2VsZWN0ZWRDbGllbnQ9e3NlbGVjdGVkQ2xpZW50fVxyXG4gICAgICAgICAgc2VsZWN0ZWRDb250YWN0cz17c2VsZWN0ZWRDb250YWN0c31cclxuICAgICAgICAgIG9uQ2xpZW50U2VsZWN0ZWQ9e3NldFNlbGVjdGVkQ2xpZW50fVxyXG4gICAgICAgICAgb25Db250YWN0c0NoYW5nZT17c2V0U2VsZWN0ZWRDb250YWN0c31cclxuICAgICAgICAgIGNsaWVudExhYmVsPXtpbmRUKFwiSGlzdG9yeV9GaWx0ZXJfQ2xpZW50XCIsIFwiQWNjb3VudFwiKX1cbiAgICAgICAgICBjbGllbnRQbGFjZWhvbGRlcj17aW5kRm9ybWF0KFwiVmlzaXRzX0NyZWF0ZV9DbGllbnRQbGFjZWhvbGRlclwiLCBcIlR5cGUgYXQgbGVhc3QgezB9IGNoYXJhY3RlcnMuLi5cIiwgNCl9XHJcbiAgICAgICAgICBzZWxlY3RlZENvbnRhY3RzQ291bnRUZXh0PXtpbmRGb3JtYXQoXHJcbiAgICAgICAgICAgIFwiVmlzaXRzX0NyZWF0ZV9TZWxlY3RlZENvbnRhY3RzQ291bnRcIixcclxuICAgICAgICAgICAgXCJ7MH0gc2VsZWN0ZWQgY29udGFjdChzKVwiLFxyXG4gICAgICAgICAgICBzZWxlY3RlZENvbnRhY3RzLmxlbmd0aFxyXG4gICAgICAgICAgKX1cclxuICAgICAgICAvPlxyXG4gICAgICApfVxyXG5cclxuICAgICAge3N0ZXAgPT09IDIgJiYgKFxyXG4gICAgICAgIDxDcmVhdGVTdGVwVmlzaXREZXRhaWxzXHJcbiAgICAgICAgICB0aXRsZT17aW5kVChcIlZpc2l0c19DcmVhdGVfVmlzaXREYXRhX1RpdGxlXCIsIFwiVmlzaXQgZGV0YWlsc1wiKX1cclxuICAgICAgICAgIGRhdGVMYWJlbD17aW5kVChcIlZpc2l0c19EZXRhaWxfRGF0ZV9MYWJlbFwiLCBcIkRhdGVcIil9XHJcbiAgICAgICAgICB0cmFuc0RhdGU9e3RyYW5zRGF0ZX1cclxuICAgICAgICAgIG9uVHJhbnNEYXRlQ2hhbmdlPXtzZXRUcmFuc0RhdGV9XHJcbiAgICAgICAgICB2aXNpdFR5cGVMYWJlbD17aW5kVChcIlZpc2l0c19EZXRhaWxfVmlzaXRUeXBlX0xhYmVsXCIsIFwiVmlzaXQgdHlwZVwiKX1cclxuICAgICAgICAgIHZpc2l0VHlwZXM9e3Zpc2l0VHlwZXN9XHJcbiAgICAgICAgICB2aXNpdFR5cGU9e3Zpc2l0VHlwZX1cclxuICAgICAgICAgIG9uVmlzaXRUeXBlQ2hhbmdlPXtzZXRWaXNpdFR5cGV9XHJcbiAgICAgICAgICB2aXNpdFR5cGVQbGFjZWhvbGRlcj17aW5kVChcIlZpc2l0c19EZXRhaWxfVmlzaXRUeXBlX1BsYWNlaG9sZGVyXCIsIFwiU2VsZWN0IHR5cGVcIil9XHJcbiAgICAgICAgICB2aXNpdFR5cGVJbnZhbGlkPXt2aXNpdFR5cGVJbnZhbGlkfVxyXG4gICAgICAgICAgZGVzY3JpcHRpb25MYWJlbD17ZGVzY3JpcHRpb25MYWJlbH1cclxuICAgICAgICAgIGRlc2NyaXB0aW9uVmFsdWU9e2Rlc2NyaXB0aW9ufVxyXG4gICAgICAgICAgZGVzY3JpcHRpb25DbGFzc05hbWU9e2Rlc2NyaXB0aW9uSW5wdXRDbGFzc05hbWV9XHJcbiAgICAgICAgICBvbkRlc2NyaXB0aW9uQ2hhbmdlPXtzZXREZXNjcmlwdGlvbn1cclxuICAgICAgICAgIHRhcEZpZWxkcz17W1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgaWQ6IFwiY29tZW50YXJpb3NcIixcclxuICAgICAgICAgICAgICBsYWJlbDogY29tbWVudHNMYWJlbCxcclxuICAgICAgICAgICAgICB2YWx1ZTogY29tZW50YXJpb3MsXHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lOiBjb21lbnRhcmlvc0NsYXNzTmFtZSxcclxuICAgICAgICAgICAgICBwb2ludGVyQmluZGluZ3M6IGNvbWVudGFyaW9zVGFwLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgaWQ6IFwiYW50ZWNlZGVudGVzXCIsXHJcbiAgICAgICAgICAgICAgbGFiZWw6IGJhY2tncm91bmRMYWJlbCxcclxuICAgICAgICAgICAgICB2YWx1ZTogYW50ZWNlZGVudGVzLFxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJmb3JtLWNvbnRyb2wgY3Vyc29yLXBvaW50ZXJcIixcclxuICAgICAgICAgICAgICBwb2ludGVyQmluZGluZ3M6IGFudGVjZWRlbnRlc1RhcCxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIGlkOiBcImNvbmNsdXNpb25lc1wiLFxyXG4gICAgICAgICAgICAgIGxhYmVsOiBjb25jbHVzaW9uc0xhYmVsLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiBjb25jbHVzaW9uZXMsXHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcImZvcm0tY29udHJvbCBjdXJzb3ItcG9pbnRlclwiLFxyXG4gICAgICAgICAgICAgIHBvaW50ZXJCaW5kaW5nczogY29uY2x1c2lvbmVzVGFwLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgXX1cclxuICAgICAgICAgIHN0YXR1cz17c3RhdHVzfVxyXG4gICAgICAgIC8+XHJcbiAgICAgICl9XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59XHJcblxyXG4vLyBDcmVhdGUgZmxvdyBVSSB3cmFwcGVkIGJ5IHRoZSBlcnJvciBib3VuZGFyeS5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ3JlYXRlRm9ybSgpIHtcclxuICByZXR1cm4gKFxyXG4gICAgPEFwcEVycm9yQm91bmRhcnkgZmFsbGJhY2tNZXNzYWdlPXtpbmRUKFwiVmlzaXRzX0NyZWF0ZV9FcnJvckJvdW5kYXJ5XCIsIFwiQW4gZXJyb3Igb2NjdXJyZWQgd2hpbGUgcmVuZGVyaW5nIHRoZSB2aXNpdHMgcGFnZS4gUmVsb2FkIGFuZCB0cnkgYWdhaW4uXCIpfT5cclxuICAgICAgPFZpc2l0YXNBcHAgLz5cclxuICAgIDwvQXBwRXJyb3JCb3VuZGFyeT5cclxuICApO1xyXG59XHJcbiIsICJpbXBvcnQgeyB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi91dGlscy9pbmRJMThuLnRzXCI7XHJcblxyXG5leHBvcnQgY29uc3QgdXNlVG9wYmFyID0gKFxyXG4gIHN0ZXA6IG51bWJlcixcclxuICBjYW5Hb05leHQ6IGJvb2xlYW4sXHJcbiAgb25OZXh0OiAoKSA9PiB2b2lkLFxyXG4gIG9uUHJldjogKCkgPT4gdm9pZCxcclxuICBidXN5ID0gZmFsc2UsXHJcbiAgY2FuU3VibWl0U3RlcDIgPSB0cnVlLFxyXG4gIGNhbkFjY2VzcyA9IHRydWVcclxuKSA9PiB7XHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IGZvcndhcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdsb2JhbEZvcndhcmRCdG5cIikgYXMgSFRNTEJ1dHRvbkVsZW1lbnQgfCBudWxsO1xyXG4gICAgY29uc3QgYmFjayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2xvYmFsQmFja0J0blwiKSBhcyBIVE1MQnV0dG9uRWxlbWVudCB8IG51bGw7XHJcbiAgICBjb25zdCBmb3J3YXJkSWNvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2xvYmFsRm9yd2FyZEljb25cIik7XHJcbiAgICBjb25zdCBjcmVhdGVJY29uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnbG9iYWxDcmVhdGVJY29uXCIpO1xyXG5cclxuICAgIGlmIChmb3J3YXJkKSB7XHJcbiAgICAgIGNvbnN0IGlzU3RlcDIgPSBzdGVwID09PSAyO1xyXG4gICAgICBjb25zdCBzaG93Rm9yd2FyZCA9IGNhbkFjY2VzcyAmJiAoaXNTdGVwMiB8fCAoc3RlcCA9PT0gMSAmJiBjYW5Hb05leHQpKTtcclxuICAgICAgZm9yd2FyZC5zdHlsZS52aXNpYmlsaXR5ID0gc2hvd0ZvcndhcmQgPyBcInZpc2libGVcIiA6IFwiaGlkZGVuXCI7XHJcbiAgICAgIGZvcndhcmQuZGlzYWJsZWQgPSAhc2hvd0ZvcndhcmQgfHwgYnVzeTtcclxuICAgICAgZm9yd2FyZC5vbmNsaWNrID0gc2hvd0ZvcndhcmQgPyAoKSA9PiBvbk5leHQoKSA6IG51bGw7XHJcbiAgICAgIGZvcndhcmQuc2V0QXR0cmlidXRlKFxyXG4gICAgICAgIFwiYXJpYS1sYWJlbFwiLFxyXG4gICAgICAgIGlzU3RlcDIgPyBpbmRUKFwiQ29tbW9uX0NyZWF0ZVwiLCBcIkNyZWF0ZVwiKSA6IGluZFQoXCJDb21tb25fTmV4dFwiLCBcIk5leHRcIilcclxuICAgICAgKTtcclxuICAgICAgZm9yd2FyZC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWRpc2FibGVkXCIsIGlzU3RlcDIgJiYgIWNhblN1Ym1pdFN0ZXAyID8gXCJ0cnVlXCIgOiBcImZhbHNlXCIpO1xyXG4gICAgICBmb3J3YXJkLmNsYXNzTGlzdC50b2dnbGUoXCJvcGFjaXR5LTUwXCIsIGlzU3RlcDIgJiYgIWNhblN1Ym1pdFN0ZXAyKTtcclxuICAgICAgZm9yd2FyZC5jbGFzc0xpc3QudG9nZ2xlKFwiY3Vyc29yLW5vdC1hbGxvd2VkXCIsIGlzU3RlcDIgJiYgIWNhblN1Ym1pdFN0ZXAyKTtcclxuXHJcbiAgICAgIGlmIChmb3J3YXJkSWNvbiAmJiBjcmVhdGVJY29uKSB7XHJcbiAgICAgICAgaWYgKGlzU3RlcDIpIHtcclxuICAgICAgICAgIGZvcndhcmRJY29uLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XHJcbiAgICAgICAgICBjcmVhdGVJY29uLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGZvcndhcmRJY29uLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XHJcbiAgICAgICAgICBjcmVhdGVJY29uLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoYmFjaykge1xyXG4gICAgICBjb25zdCBzaG93QmFjayA9IGNhbkFjY2VzcyAmJiBzdGVwID09PSAyO1xyXG4gICAgICBiYWNrLnN0eWxlLnZpc2liaWxpdHkgPSBzaG93QmFjayA/IFwidmlzaWJsZVwiIDogXCJoaWRkZW5cIjtcclxuICAgICAgYmFjay5kaXNhYmxlZCA9ICFzaG93QmFjayB8fCBidXN5O1xyXG4gICAgICBiYWNrLm9uY2xpY2sgPSBzaG93QmFjayA/ICgpID0+IG9uUHJldigpIDogbnVsbDtcclxuICAgIH1cclxuICB9LCBbc3RlcCwgY2FuR29OZXh0LCBvbk5leHQsIG9uUHJldiwgYnVzeSwgY2FuU3VibWl0U3RlcDIsIGNhbkFjY2Vzc10pO1xyXG59O1xyXG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlUmVmIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IHNob3dHbG9iYWxTcGlubmVyLCBoaWRlR2xvYmFsU3Bpbm5lciB9IGZyb20gXCIuLi91dGlscy9nbG9iYWxTcGlubmVyLnRzXCI7XHJcbmltcG9ydCB7XHJcbiAgQ1JFQVRFX0ZSRVNIX1BBUkFNLFxyXG4gIFZJU0lUX0RSQUZUX0tFWSxcclxuICBDT05UQUNUU19TVE9SQUdFX0tFWSxcclxuICBDT05UQUNUU19TRUxFQ1RJT05fS0VZLFxyXG4gIGNsZWFyQ3JlYXRlU2VsZWN0aW9uQ2FjaGUsXHJcbiAgc3RyaXBGcmVzaFBhcmFtLFxyXG59IGZyb20gXCIuLi91dGlscy92aXNpdGFzU3RvcmFnZS50c1wiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHsgZ2V0U2Vzc2lvbkpzb25XaXRoRXhwaXJ5LCBnZXRTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5LCBzZXRTZXNzaW9uSnNvbldpdGhFeHBpcnkgfSBmcm9tIFwiLi4vdXRpbHMvc2Vzc2lvbkV4cGlyeS50c1wiO1xyXG5cclxuY29uc3QgQ1JFQVRFX0RSQUZUX1RUTF9NUyA9IDI0ICogNjAgKiA2MCAqIDEwMDA7XHJcblxyXG50eXBlIERyYWZ0U25hcHNob3QgPSB7XHJcbiAgc2VsZWN0ZWRDbGllbnQ6IGFueTtcclxuICBzZWxlY3RlZENvbnRhY3RzOiBhbnlbXTtcclxuICB2aXNpdFR5cGU6IHN0cmluZztcclxuICB0cmFuc0RhdGU6IHN0cmluZztcclxuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xyXG4gIGNvbWVudGFyaW9zOiBzdHJpbmc7XHJcbiAgYW50ZWNlZGVudGVzOiBzdHJpbmc7XHJcbiAgY29uY2x1c2lvbmVzOiBzdHJpbmc7XHJcbiAgc3RlcDogbnVtYmVyO1xyXG59O1xyXG5cclxudHlwZSBVc2VDcmVhdGVEcmFmdEFyZ3MgPSB7XHJcbiAgZHJhZnRTbmFwc2hvdDogRHJhZnRTbmFwc2hvdDtcclxuICBzZXRTZWxlY3RlZENsaWVudDogKHZhbHVlOiBhbnkpID0+IHZvaWQ7XHJcbiAgc2V0U2VsZWN0ZWRDb250YWN0czogKHZhbHVlOiBhbnlbXSkgPT4gdm9pZDtcclxuICBzZXRWaXNpdFR5cGU6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIHNldFRyYW5zRGF0ZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgc2V0RGVzY3JpcHRpb246ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIHNldENvbWVudGFyaW9zOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBzZXRBbnRlY2VkZW50ZXM6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIHNldENvbmNsdXNpb25lczogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgc2V0U3RlcDogKHZhbHVlOiBudW1iZXIpID0+IHZvaWQ7XHJcbn07XHJcblxyXG4vLyBIYW5kbGVzIHZpc2l0LWNyZWF0ZSBkcmFmdCBzYXZlL3Jlc3RvcmUgbGlmZWN5Y2xlLlxyXG5leHBvcnQgY29uc3QgdXNlQ3JlYXRlRHJhZnQgPSAoe1xyXG4gIGRyYWZ0U25hcHNob3QsXHJcbiAgc2V0U2VsZWN0ZWRDbGllbnQsXHJcbiAgc2V0U2VsZWN0ZWRDb250YWN0cyxcclxuICBzZXRWaXNpdFR5cGUsXHJcbiAgc2V0VHJhbnNEYXRlLFxyXG4gIHNldERlc2NyaXB0aW9uLFxyXG4gIHNldENvbWVudGFyaW9zLFxyXG4gIHNldEFudGVjZWRlbnRlcyxcclxuICBzZXRDb25jbHVzaW9uZXMsXHJcbiAgc2V0U3RlcCxcclxufTogVXNlQ3JlYXRlRHJhZnRBcmdzKSA9PiB7XHJcbiAgY29uc3QgZHJhZnRSZXN0b3JlZFJlZiA9IHVzZVJlZihmYWxzZSk7XHJcbiAgY29uc3QgZHJhZnRQZXJzaXN0VGltZXJSZWYgPSB1c2VSZWY8bnVtYmVyIHwgbnVsbD4obnVsbCk7XHJcblxyXG4gIGNvbnN0IHBlcnNpc3REcmFmdFNuYXBzaG90ID0gdXNlQ2FsbGJhY2soKGRyYWZ0OiBEcmFmdFNuYXBzaG90KSA9PiB7XHJcbiAgICBzZXRTZXNzaW9uSnNvbldpdGhFeHBpcnkoVklTSVRfRFJBRlRfS0VZLCBkcmFmdCwgQ1JFQVRFX0RSQUZUX1RUTF9NUyk7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBwZXJzaXN0RHJhZnROb3cgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBwZXJzaXN0RHJhZnRTbmFwc2hvdChkcmFmdFNuYXBzaG90KTtcclxuICB9LCBbZHJhZnRTbmFwc2hvdCwgcGVyc2lzdERyYWZ0U25hcHNob3RdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghZHJhZnRSZXN0b3JlZFJlZi5jdXJyZW50KSByZXR1cm47XHJcblxyXG4gICAgaWYgKGRyYWZ0UGVyc2lzdFRpbWVyUmVmLmN1cnJlbnQpIHtcclxuICAgICAgY2xlYXJUaW1lb3V0KGRyYWZ0UGVyc2lzdFRpbWVyUmVmLmN1cnJlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYWZ0UGVyc2lzdFRpbWVyUmVmLmN1cnJlbnQgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIGRyYWZ0UGVyc2lzdFRpbWVyUmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICBwZXJzaXN0RHJhZnRTbmFwc2hvdChkcmFmdFNuYXBzaG90KTtcclxuICAgIH0sIDE4MCk7XHJcblxyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgaWYgKGRyYWZ0UGVyc2lzdFRpbWVyUmVmLmN1cnJlbnQpIHtcclxuICAgICAgICBjbGVhclRpbWVvdXQoZHJhZnRQZXJzaXN0VGltZXJSZWYuY3VycmVudCk7XHJcbiAgICAgICAgZHJhZnRQZXJzaXN0VGltZXJSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfSwgW2RyYWZ0U25hcHNob3QsIHBlcnNpc3REcmFmdFNuYXBzaG90XSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBsZXQgZnJlc2hMb2FkID0gZmFsc2U7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCB1cmwgPSBuZXcgVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcclxuICAgICAgZnJlc2hMb2FkID0gdXJsLnNlYXJjaFBhcmFtcy5oYXMoQ1JFQVRFX0ZSRVNIX1BBUkFNKTtcclxuICAgIH0gY2F0Y2gge1xyXG4gICAgICBmcmVzaExvYWQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZnJlc2hMb2FkKSB7XHJcbiAgICAgIGNsZWFyQ3JlYXRlU2VsZWN0aW9uQ2FjaGUoKTtcclxuICAgICAgc3RyaXBGcmVzaFBhcmFtKCk7XHJcbiAgICAgIGRyYWZ0UmVzdG9yZWRSZWYuY3VycmVudCA9IHRydWU7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgc2hvdWxkU2hvdyA9IGZhbHNlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgc2hvdWxkU2hvdyA9ICEhKFxyXG4gICAgICAgIGdldFNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoVklTSVRfRFJBRlRfS0VZKSB8fFxyXG4gICAgICAgIHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oQ09OVEFDVFNfU1RPUkFHRV9LRVkpIHx8XHJcbiAgICAgICAgc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShDT05UQUNUU19TRUxFQ1RJT05fS0VZKVxyXG4gICAgICApO1xyXG4gICAgfSBjYXRjaCB7XHJcbiAgICAgIC8vIElnbm9yZSBzdG9yYWdlIGFjY2VzcyBlcnJvcnMuXHJcbiAgICB9XHJcbiAgICBpZiAoc2hvdWxkU2hvdykge1xyXG4gICAgICBzaG93R2xvYmFsU3Bpbm5lcihpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpKTtcclxuICAgIH1cclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IGRyYWZ0ID0gZ2V0U2Vzc2lvbkpzb25XaXRoRXhwaXJ5PERyYWZ0U25hcHNob3Q+KFZJU0lUX0RSQUZUX0tFWSk7XHJcbiAgICAgIGlmIChkcmFmdD8uc2VsZWN0ZWRDbGllbnQ/LnZhbHVlKSBzZXRTZWxlY3RlZENsaWVudChkcmFmdC5zZWxlY3RlZENsaWVudCk7XHJcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGRyYWZ0Py5zZWxlY3RlZENvbnRhY3RzKSkgc2V0U2VsZWN0ZWRDb250YWN0cyhkcmFmdC5zZWxlY3RlZENvbnRhY3RzKTtcclxuICAgICAgaWYgKGRyYWZ0Py52aXNpdFR5cGUgIT09IHVuZGVmaW5lZCkgc2V0VmlzaXRUeXBlKGRyYWZ0LnZpc2l0VHlwZSk7XHJcbiAgICAgIGlmIChkcmFmdD8udHJhbnNEYXRlKSBzZXRUcmFuc0RhdGUoZHJhZnQudHJhbnNEYXRlKTtcclxuICAgICAgaWYgKGRyYWZ0Py5kZXNjcmlwdGlvbiAhPT0gdW5kZWZpbmVkKSBzZXREZXNjcmlwdGlvbihkcmFmdC5kZXNjcmlwdGlvbik7XHJcbiAgICAgIGlmIChkcmFmdD8uY29tZW50YXJpb3MgIT09IHVuZGVmaW5lZCkgc2V0Q29tZW50YXJpb3MoZHJhZnQuY29tZW50YXJpb3MpO1xyXG4gICAgICBpZiAoZHJhZnQ/LmFudGVjZWRlbnRlcyAhPT0gdW5kZWZpbmVkKSBzZXRBbnRlY2VkZW50ZXMoZHJhZnQuYW50ZWNlZGVudGVzKTtcclxuICAgICAgaWYgKGRyYWZ0Py5jb25jbHVzaW9uZXMgIT09IHVuZGVmaW5lZCkgc2V0Q29uY2x1c2lvbmVzKGRyYWZ0LmNvbmNsdXNpb25lcyk7XHJcbiAgICAgIGlmIChkcmFmdD8uc3RlcCA9PT0gMikgc2V0U3RlcCgyKTtcclxuICAgIH0gY2F0Y2gge1xyXG4gICAgICAvLyBJZ25vcmUgbWFsZm9ybWVkIGRyYWZ0IHBheWxvYWRzLlxyXG4gICAgfSBmaW5hbGx5IHtcclxuICAgICAgaWYgKHNob3VsZFNob3cpIHtcclxuICAgICAgICBoaWRlR2xvYmFsU3Bpbm5lcigpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBkcmFmdFJlc3RvcmVkUmVmLmN1cnJlbnQgPSB0cnVlO1xyXG4gIH0sIFtcclxuICAgIHNldEFudGVjZWRlbnRlcyxcclxuICAgIHNldENvbWVudGFyaW9zLFxyXG4gICAgc2V0Q29uY2x1c2lvbmVzLFxyXG4gICAgc2V0RGVzY3JpcHRpb24sXHJcbiAgICBzZXRTZWxlY3RlZENsaWVudCxcclxuICAgIHNldFNlbGVjdGVkQ29udGFjdHMsXHJcbiAgICBzZXRTdGVwLFxyXG4gICAgc2V0VHJhbnNEYXRlLFxyXG4gICAgc2V0VmlzaXRUeXBlLFxyXG4gIF0pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgcGVyc2lzdERyYWZ0Tm93LFxyXG4gIH07XHJcbn07XHJcbiIsICJleHBvcnQgY29uc3Qgc2hvd0dsb2JhbFNwaW5uZXIgPSAobWVzc2FnZT86IHN0cmluZykgPT4ge1xyXG4gIHRyeSB7XHJcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2Ygd2luZG93Ll9faW5kU2hvd0dsb2JhbFNwaW5uZXIgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICB3aW5kb3cuX19pbmRTaG93R2xvYmFsU3Bpbm5lcihtZXNzYWdlKTtcclxuICAgIH1cclxuICB9IGNhdGNoIHtcclxuICAgIC8vIGlnbm9yZVxyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBoaWRlR2xvYmFsU3Bpbm5lciA9ICgpID0+IHtcclxuICB0cnkge1xyXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIHdpbmRvdy5fX2luZEhpZGVHbG9iYWxTcGlubmVyID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgd2luZG93Ll9faW5kSGlkZUdsb2JhbFNwaW5uZXIoKTtcclxuICAgIH1cclxuICB9IGNhdGNoIHtcclxuICAgIC8vIGlnbm9yZVxyXG4gIH1cclxufTtcclxuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IGZldGNoSnNvbiB9IGZyb20gXCIuLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XHJcbmltcG9ydCB7IGluZEV4dHJhY3RJZCwgaW5kRXh0cmFjdFNpZ25lZElkIH0gZnJvbSBcIi4uL3V0aWxzL2luZElkcy50c1wiO1xyXG5pbXBvcnQgeyBpbmRGb3JtYXQsIGluZFQgfSBmcm9tIFwiLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgeyBzaG93UGVybWlzc2lvbk1vZGFsIH0gZnJvbSBcIi4uL3V0aWxzL3Blcm1pc3Npb25zLnRzXCI7XHJcbmltcG9ydCB7IGZsYXNoQWN0aW9uTWFyaywgc2V0SGlzdG9yeUZpbHRlckZvckRhdGUgfSBmcm9tIFwiLi4vdXRpbHMvdmlzaXRhc0hpc3RvcnkudHNcIjtcclxuaW1wb3J0IHsgVklTSVRfRFJBRlRfS0VZIH0gZnJvbSBcIi4uL3V0aWxzL3Zpc2l0YXNTdG9yYWdlLnRzXCI7XHJcbmltcG9ydCB7IHdhaXQgfSBmcm9tIFwiLi4vdXRpbHMvd2FpdC50c1wiO1xyXG5cclxudHlwZSBDb250YWN0T3B0aW9uID0ge1xyXG4gIHZhbHVlOiBzdHJpbmc7XHJcbiAgdGV4dDogc3RyaW5nO1xyXG59O1xyXG5cclxudHlwZSBMZWdhY3lDb21tYW5kUmVzcG9uc2UgPSB7XHJcbiAgc3VjY2Vzcz86IGJvb2xlYW47XHJcbiAgbWVzc2FnZT86IHN0cmluZztcclxuICBkYXRhPzogdW5rbm93bjtcclxuICBTdWNjZXNzPzogYm9vbGVhbjtcclxuICBNZXNzYWdlPzogc3RyaW5nO1xyXG4gIERhdGE/OiB1bmtub3duO1xyXG59O1xyXG5cclxuY29uc3QgZ2V0TGVnYWN5UmVzcG9uc2VTdWNjZXNzID0gKHJlc3BvbnNlOiBMZWdhY3lDb21tYW5kUmVzcG9uc2UpOiBib29sZWFuID0+IHtcclxuICByZXR1cm4gcmVzcG9uc2Uuc3VjY2VzcyA9PT0gdHJ1ZSB8fCByZXNwb25zZS5TdWNjZXNzID09PSB0cnVlO1xyXG59O1xyXG5cclxuY29uc3QgZ2V0TGVnYWN5UmVzcG9uc2VNZXNzYWdlID0gKHJlc3BvbnNlOiBMZWdhY3lDb21tYW5kUmVzcG9uc2UpOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IHJhd01lc3NhZ2UgPSByZXNwb25zZS5tZXNzYWdlID8/IHJlc3BvbnNlLk1lc3NhZ2U7XHJcbiAgcmV0dXJuIHR5cGVvZiByYXdNZXNzYWdlID09PSBcInN0cmluZ1wiID8gcmF3TWVzc2FnZS50cmltKCkgOiBcIlwiO1xyXG59O1xyXG5cclxuY29uc3QgZ2V0TGVnYWN5UmVzcG9uc2VEYXRhID0gKHJlc3BvbnNlOiBMZWdhY3lDb21tYW5kUmVzcG9uc2UpOiB1bmtub3duID0+IHtcclxuICByZXR1cm4gcmVzcG9uc2UuZGF0YSA/PyByZXNwb25zZS5EYXRhO1xyXG59O1xyXG5cclxudHlwZSBVc2VDcmVhdGVTdWJtaXRBcmdzID0ge1xyXG4gIGJ1c3k6IGJvb2xlYW47XHJcbiAgbW9kYWxPcGVuOiBib29sZWFuO1xyXG4gIGNhbkNyZWF0ZVZpc2l0OiBib29sZWFuO1xyXG4gIGNhblJvbGxiYWNrRGVsZXRlOiBib29sZWFuO1xyXG4gIHNlbGVjdGVkQ2xpZW50OiB7IHZhbHVlOiBzdHJpbmcgfSB8IG51bGw7XHJcbiAgc2VsZWN0ZWRDb250YWN0czogQ29udGFjdE9wdGlvbltdO1xyXG4gIHZpc2l0VHlwZTogc3RyaW5nO1xyXG4gIGRlZmF1bHRBc2lzdGVudGVUaXBvOiBzdHJpbmc7XHJcbiAgZGVzY3JpcHRpb246IHN0cmluZztcclxuICB0cmFuc0RhdGU6IHN0cmluZztcclxuICBjb21lbnRhcmlvczogc3RyaW5nO1xyXG4gIGFudGVjZWRlbnRlczogc3RyaW5nO1xyXG4gIGNvbmNsdXNpb25lczogc3RyaW5nO1xyXG4gIHNldEJ1c3k6ICh2YWx1ZTogYm9vbGVhbikgPT4gdm9pZDtcclxuICBzZXRTdGF0dXM6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIHNldE1vZGFsRXJyb3I6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIHNldFNob3dSZXF1aXJlZDogKHZhbHVlOiBib29sZWFuKSA9PiB2b2lkO1xyXG4gIG9wZW5Db25maXJtOiAob3B0czoge1xyXG4gICAgdGl0bGU6IHN0cmluZztcclxuICAgIG1lc3NhZ2U6IHN0cmluZztcclxuICAgIGNvbmZpcm1UZXh0Pzogc3RyaW5nO1xyXG4gICAgb25Db25maXJtPzogKCkgPT4gUHJvbWlzZTxib29sZWFuIHwgdm9pZD4gfCBib29sZWFuIHwgdm9pZDtcclxuICB9KSA9PiB2b2lkO1xyXG4gIGNsb3NlQ29uZmlybTogKCkgPT4gdm9pZDtcclxufTtcclxuXHJcbi8vIE93bnMgY3JlYXRlL2NvbmZpcm0gZmxvdyBzbyBmb3JtIGNvbXBvbmVudCBzdGF5cyBmb2N1c2VkIG9uIFVJIGZpZWxkcy5cclxuZXhwb3J0IGNvbnN0IHVzZUNyZWF0ZVN1Ym1pdCA9ICh7XHJcbiAgYnVzeSxcclxuICBtb2RhbE9wZW4sXHJcbiAgY2FuQ3JlYXRlVmlzaXQsXHJcbiAgY2FuUm9sbGJhY2tEZWxldGUsXHJcbiAgc2VsZWN0ZWRDbGllbnQsXHJcbiAgc2VsZWN0ZWRDb250YWN0cyxcclxuICB2aXNpdFR5cGUsXHJcbiAgZGVmYXVsdEFzaXN0ZW50ZVRpcG8sXHJcbiAgZGVzY3JpcHRpb24sXHJcbiAgdHJhbnNEYXRlLFxyXG4gIGNvbWVudGFyaW9zLFxyXG4gIGFudGVjZWRlbnRlcyxcclxuICBjb25jbHVzaW9uZXMsXHJcbiAgc2V0QnVzeSxcclxuICBzZXRTdGF0dXMsXHJcbiAgc2V0TW9kYWxFcnJvcixcclxuICBzZXRTaG93UmVxdWlyZWQsXHJcbiAgb3BlbkNvbmZpcm0sXHJcbiAgY2xvc2VDb25maXJtLFxyXG59OiBVc2VDcmVhdGVTdWJtaXRBcmdzKSA9PiB7XHJcbiAgY29uc3QgZG9DcmVhdGUgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XHJcbiAgICBpZiAoYnVzeSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgaWYgKCFjYW5DcmVhdGVWaXNpdCkge1xyXG4gICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHNldE1vZGFsRXJyb3IoXCJcIik7XHJcbiAgICBpZiAoIXNlbGVjdGVkQ2xpZW50KSB7XHJcbiAgICAgIHNldFN0YXR1cyhpbmRUKFwiVmlzaXRzX0NyZWF0ZV9TZWxlY3RDbGllbnRSZXF1aXJlZFwiLCBcIlNlbGVjdCBhIGNsaWVudC5cIikpO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZiAoU3RyaW5nKHZpc2l0VHlwZSB8fCBcIlwiKSA9PT0gXCJcIiB8fCBTdHJpbmcodmlzaXRUeXBlKSA9PT0gXCIwXCIgfHwgIWRlc2NyaXB0aW9uLnRyaW0oKSB8fCAhY29tZW50YXJpb3MudHJpbSgpKSB7XHJcbiAgICAgIHNldFNob3dSZXF1aXJlZCh0cnVlKTtcclxuICAgICAgc2V0U3RhdHVzKGluZFQoXCJWaXNpdHNfQ3JlYXRlX0NvbXBsZXRlUmVxdWlyZWRcIiwgXCJDb21wbGV0ZSByZXF1aXJlZCBmaWVsZHMuXCIpKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgc2V0QnVzeSh0cnVlKTtcclxuICAgIHNldFN0YXR1cyhpbmRUKFwiVmlzaXRzX0NyZWF0ZV9DcmVhdGluZ0FjdGl2aXR5XCIsIFwiQ3JlYXRpbmcgYWN0aXZpdHkuLi5cIikpO1xyXG5cclxuICAgIGxldCBjcmVhdGVkUmVjSWQgPSBcIlwiO1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcGF5bG9hZEFjdGl2aXR5ID0ge1xyXG4gICAgICAgIGFjY291bnROdW06IHNlbGVjdGVkQ2xpZW50LnZhbHVlLFxyXG4gICAgICAgIHZpc2l0VHlwZSxcclxuICAgICAgICBkZXNjcmlwdGlvbixcclxuICAgICAgICB0cmFuc0RhdGUsXHJcbiAgICAgICAgY29tZW50YXJpb3MsXHJcbiAgICAgICAgYW50ZWNlZGVudGVzLFxyXG4gICAgICAgIGNvbmNsdXNpb25lcyxcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGNvbnN0IHJlc0FjdCA9IGF3YWl0IGZldGNoSnNvbjxMZWdhY3lDb21tYW5kUmVzcG9uc2U+KFwiL1Zpc2l0YXMvQ3JlYXRlQWN0aXZpdHlcIiwge1xyXG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxyXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHBheWxvYWRBY3Rpdml0eSksXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgaWYgKCFnZXRMZWdhY3lSZXNwb25zZVN1Y2Nlc3MocmVzQWN0KSkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihnZXRMZWdhY3lSZXNwb25zZU1lc3NhZ2UocmVzQWN0KSB8fCBpbmRUKFwiVmlzaXRzX0NyZWF0ZV9DcmVhdGVBY3Rpdml0eUZhaWxlZFwiLCBcIkZhaWxlZCB0byBjcmVhdGUgYWN0aXZpdHkuXCIpKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgcmVjSWRBY3RpdmlkYWQgPVxyXG4gICAgICAgIGluZEV4dHJhY3RTaWduZWRJZChnZXRMZWdhY3lSZXNwb25zZURhdGEocmVzQWN0KSkgfHxcclxuICAgICAgICBpbmRFeHRyYWN0U2lnbmVkSWQoZ2V0TGVnYWN5UmVzcG9uc2VNZXNzYWdlKHJlc0FjdCkpIHx8XHJcbiAgICAgICAgaW5kRXh0cmFjdFNpZ25lZElkKGluZEV4dHJhY3RJZChnZXRMZWdhY3lSZXNwb25zZURhdGEocmVzQWN0KSkgfHwgaW5kRXh0cmFjdElkKGdldExlZ2FjeVJlc3BvbnNlTWVzc2FnZShyZXNBY3QpKSk7XHJcbiAgICAgIGlmICghcmVjSWRBY3RpdmlkYWQpIHRocm93IG5ldyBFcnJvcihpbmRUKFwiVmlzaXRzX0NyZWF0ZV9DcmVhdGVBY3Rpdml0eUZhaWxlZFwiLCBcIkZhaWxlZCB0byBjcmVhdGUgYWN0aXZpdHkuXCIpKTtcclxuICAgICAgY3JlYXRlZFJlY0lkID0gU3RyaW5nKHJlY0lkQWN0aXZpZGFkKTtcclxuXHJcbiAgICAgIGlmIChzZWxlY3RlZENvbnRhY3RzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICBjb25zdCBhc3Npc3RhbnRCYXRjaFNpemUgPSA0O1xyXG4gICAgICAgIGNvbnN0IGNyZWF0ZUFzc2lzdGFudCA9IGFzeW5jIChjb250YWN0OiBDb250YWN0T3B0aW9uKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBwYXlsb2FkVmlzaXRhID0ge1xyXG4gICAgICAgICAgICByZWZSZWNJZEFjdGl2aWRhZDogcmVjSWRBY3RpdmlkYWQsXHJcbiAgICAgICAgICAgIGFzaXN0ZW50ZVRpcG86IGRlZmF1bHRBc2lzdGVudGVUaXBvLFxyXG4gICAgICAgICAgICBhc2lzdGVudGVJZDogY29udGFjdC50ZXh0LFxyXG4gICAgICAgICAgICBjb250YWN0b1JlY0lkOiBjb250YWN0LnZhbHVlLFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICAgIGNvbnN0IHJlc1ZpcyA9IGF3YWl0IGZldGNoSnNvbjxMZWdhY3lDb21tYW5kUmVzcG9uc2U+KFwiL1Zpc2l0YXMvQ3JlYXRlVmlzaXRhQXNpc3RlbnRlXCIsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXlsb2FkVmlzaXRhKSxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgaWYgKCFnZXRMZWdhY3lSZXNwb25zZVN1Y2Nlc3MocmVzVmlzKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZ2V0TGVnYWN5UmVzcG9uc2VNZXNzYWdlKHJlc1ZpcykgfHwgaW5kVChcIlZpc2l0c19DcmVhdGVfQ3JlYXRlVmlzaXRGYWlsZWRcIiwgXCJGYWlsZWQgdG8gY3JlYXRlIHZpc2l0LlwiKSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaWR4ID0gMDsgaWR4IDwgc2VsZWN0ZWRDb250YWN0cy5sZW5ndGg7IGlkeCArPSBhc3Npc3RhbnRCYXRjaFNpemUpIHtcclxuICAgICAgICAgIGNvbnN0IGJhdGNoID0gc2VsZWN0ZWRDb250YWN0cy5zbGljZShpZHgsIGlkeCArIGFzc2lzdGFudEJhdGNoU2l6ZSk7XHJcbiAgICAgICAgICBjb25zdCBmaXJzdCA9IGJhdGNoWzBdO1xyXG4gICAgICAgICAgaWYgKGZpcnN0KSB7XHJcbiAgICAgICAgICAgIHNldFN0YXR1cyhpbmRGb3JtYXQoXCJWaXNpdHNfQ3JlYXRlX0NyZWF0aW5nVmlzaXRGb3JcIiwgXCJDcmVhdGluZyB2aXNpdCBmb3IgezB9Li4uXCIsIGZpcnN0LnRleHQpKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGF3YWl0IFByb21pc2UuYWxsKGJhdGNoLm1hcCgoY29udGFjdCkgPT4gY3JlYXRlQXNzaXN0YW50KGNvbnRhY3QpKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICB0cnkge1xyXG4gICAgICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oVklTSVRfRFJBRlRfS0VZKTtcclxuICAgICAgfSBjYXRjaCB7XHJcbiAgICAgICAgLy8gSWdub3JlIHN0b3JhZ2UgZXJyb3JzLlxyXG4gICAgICB9XHJcblxyXG4gICAgICBzZXRIaXN0b3J5RmlsdGVyRm9yRGF0ZSh0cmFuc0RhdGUsIHRydWUpO1xyXG4gICAgICBjbG9zZUNvbmZpcm0oKTtcclxuICAgICAgYXdhaXQgd2FpdCgyMDApO1xyXG4gICAgICBmbGFzaEFjdGlvbk1hcmsoXCJva1Byb2Nlc3NcIiwgMTIwMCk7XHJcbiAgICAgIGF3YWl0IHdhaXQoMTIwMCk7XHJcbiAgICAgIHdpbmRvdy5fX2luZEJ5cGFzc05hdmlnYXRpb25HdWFyZE9uY2U/LigpO1xyXG4gICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL0hpc3RvcmlhbC9IaXN0b3J5XCI7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSBjYXRjaCAoZTogdW5rbm93bikge1xyXG4gICAgICBpZiAoY3JlYXRlZFJlY0lkICYmIGNhblJvbGxiYWNrRGVsZXRlKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIHNldFN0YXR1cyhpbmRUKFwiVmlzaXRzX0NyZWF0ZV9Sb2xsYmFja1wiLCBcIlJvbGxpbmcgYmFjayBhY3Rpdml0eS4uLlwiKSk7XHJcbiAgICAgICAgICBhd2FpdCBmZXRjaEpzb24oYC9WaXNpdGFzL0RlbGV0ZUFjdGl2aXR5LyR7ZW5jb2RlVVJJQ29tcG9uZW50KGNyZWF0ZWRSZWNJZCl9YCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXHJcbiAgICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBjYXRjaCB7XHJcbiAgICAgICAgICAvLyBLZWVwIG9yaWdpbmFsIGVycm9yIGZsb3cuXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IG1zZyA9IGUgaW5zdGFuY2VvZiBFcnJvciA/IGUubWVzc2FnZSA6IGluZFQoXCJWaXNpdHNfQ3JlYXRlX0NyZWF0ZVZpc2l0RXJyb3JcIiwgXCJGYWlsZWQgdG8gY3JlYXRlIHRoZSB2aXNpdC5cIik7XHJcbiAgICAgIHNldE1vZGFsRXJyb3IobXNnKTtcclxuICAgICAgc2V0U3RhdHVzKG1zZyk7XHJcbiAgICAgIGZsYXNoQWN0aW9uTWFyayhcImVycm9yUHJvY2Vzc1wiLCAxNTAwKTtcclxuICAgICAgc2V0QnVzeShmYWxzZSk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9LCBbXHJcbiAgICBhbnRlY2VkZW50ZXMsXHJcbiAgICBidXN5LFxyXG4gICAgY2FuQ3JlYXRlVmlzaXQsXHJcbiAgICBjYW5Sb2xsYmFja0RlbGV0ZSxcclxuICAgIGNsb3NlQ29uZmlybSxcclxuICAgIGNvbWVudGFyaW9zLFxyXG4gICAgY29uY2x1c2lvbmVzLFxyXG4gICAgZGVmYXVsdEFzaXN0ZW50ZVRpcG8sXHJcbiAgICBkZXNjcmlwdGlvbixcclxuICAgIHNlbGVjdGVkQ2xpZW50LFxyXG4gICAgc2VsZWN0ZWRDb250YWN0cyxcclxuICAgIHNldEJ1c3ksXHJcbiAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgc2V0U2hvd1JlcXVpcmVkLFxyXG4gICAgc2V0U3RhdHVzLFxyXG4gICAgdHJhbnNEYXRlLFxyXG4gICAgdmlzaXRUeXBlLFxyXG4gIF0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVTdWJtaXQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAoYnVzeSkgcmV0dXJuO1xyXG4gICAgaWYgKCFjYW5DcmVhdGVWaXNpdCkge1xyXG4gICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmIChtb2RhbE9wZW4pIHJldHVybjtcclxuICAgIGlmICghc2VsZWN0ZWRDbGllbnQpIHtcclxuICAgICAgc2V0U3RhdHVzKGluZFQoXCJWaXNpdHNfQ3JlYXRlX1NlbGVjdENsaWVudFJlcXVpcmVkXCIsIFwiU2VsZWN0IGEgY2xpZW50LlwiKSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmIChTdHJpbmcodmlzaXRUeXBlIHx8IFwiXCIpID09PSBcIlwiIHx8IFN0cmluZyh2aXNpdFR5cGUpID09PSBcIjBcIiB8fCAhZGVzY3JpcHRpb24udHJpbSgpIHx8ICFjb21lbnRhcmlvcy50cmltKCkpIHtcclxuICAgICAgc2V0U2hvd1JlcXVpcmVkKHRydWUpO1xyXG4gICAgICBzZXRTdGF0dXMoaW5kVChcIlZpc2l0c19DcmVhdGVfQ29tcGxldGVSZXF1aXJlZFwiLCBcIkNvbXBsZXRlIHJlcXVpcmVkIGZpZWxkcy5cIikpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xyXG4gICAgb3BlbkNvbmZpcm0oe1xyXG4gICAgICB0aXRsZTogaW5kVChcIlZpc2l0c19DcmVhdGVfQ29uZmlybUNyZWF0ZV9UaXRsZVwiLCBcIlZpc2l0c19DcmVhdGVfQ29uZmlybUNyZWF0ZV9UaXRsZVwiKSxcclxuICAgICAgbWVzc2FnZTogaW5kVChcIlZpc2l0c19DcmVhdGVfQ29uZmlybUNyZWF0ZV9Cb2R5XCIsIFwiVmlzaXRzX0NyZWF0ZV9Db25maXJtQ3JlYXRlX0JvZHlcIiksXHJcbiAgICAgIGNvbmZpcm1UZXh0OiBpbmRUKFwiQ29uZmlybV9ZZXNcIiwgXCJDb25maXJtX1llc1wiKSxcclxuICAgICAgb25Db25maXJtOiBkb0NyZWF0ZSxcclxuICAgIH0pO1xyXG4gIH0sIFtcclxuICAgIGJ1c3ksXHJcbiAgICBjYW5DcmVhdGVWaXNpdCxcclxuICAgIGNvbWVudGFyaW9zLFxyXG4gICAgZGVzY3JpcHRpb24sXHJcbiAgICBkb0NyZWF0ZSxcclxuICAgIG1vZGFsT3BlbixcclxuICAgIG9wZW5Db25maXJtLFxyXG4gICAgc2VsZWN0ZWRDbGllbnQsXHJcbiAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgc2V0U2hvd1JlcXVpcmVkLFxyXG4gICAgc2V0U3RhdHVzLFxyXG4gICAgdmlzaXRUeXBlLFxyXG4gIF0pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgZG9DcmVhdGUsXHJcbiAgICBoYW5kbGVTdWJtaXQsXHJcbiAgfTtcclxufTtcclxuIiwgImV4cG9ydCBjb25zdCBpbmRFeHRyYWN0SWQgPSAodmFsdWU6IHVua25vd24pOiBzdHJpbmcgPT4ge1xyXG4gIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gXCJcIjtcclxuICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiIHx8IHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIikgcmV0dXJuIFN0cmluZyh2YWx1ZSkudHJpbSgpO1xyXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIpIHtcclxuICAgIGNvbnN0IGNhbmRpZGF0ZSA9XHJcbiAgICAgICh2YWx1ZSBhcyBhbnkpLnJlY0lkID8/XHJcbiAgICAgICh2YWx1ZSBhcyBhbnkpLlJlY0lkID8/XHJcbiAgICAgICh2YWx1ZSBhcyBhbnkpLmlkID8/XHJcbiAgICAgICh2YWx1ZSBhcyBhbnkpLklkID8/XHJcbiAgICAgICh2YWx1ZSBhcyBhbnkpLnZhbHVlID8/XHJcbiAgICAgICh2YWx1ZSBhcyBhbnkpLlZhbHVlO1xyXG4gICAgaWYgKHR5cGVvZiBjYW5kaWRhdGUgPT09IFwic3RyaW5nXCIgfHwgdHlwZW9mIGNhbmRpZGF0ZSA9PT0gXCJudW1iZXJcIikgcmV0dXJuIFN0cmluZyhjYW5kaWRhdGUpLnRyaW0oKTtcclxuICB9XHJcbiAgcmV0dXJuIFwiXCI7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgaW5kRXh0cmFjdE51bWVyaWNJZCA9ICh2YWx1ZTogdW5rbm93biwgZGVwdGggPSAwKTogc3RyaW5nID0+IHtcclxuICBpZiAoZGVwdGggPiAzKSByZXR1cm4gXCJcIjtcclxuICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkgcmV0dXJuIFwiXCI7XHJcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIiAmJiBOdW1iZXIuaXNGaW5pdGUodmFsdWUpKSByZXR1cm4gU3RyaW5nKE1hdGgudHJ1bmModmFsdWUpKTtcclxuICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICBjb25zdCByYXcgPSB2YWx1ZS50cmltKCk7XHJcbiAgICBpZiAoIXJhdykgcmV0dXJuIFwiXCI7XHJcbiAgICBpZiAoL15cXGQrJC8udGVzdChyYXcpKSByZXR1cm4gcmF3O1xyXG4gICAgY29uc3QgbSA9IHJhdy5tYXRjaCgvKFxcZHszLH0pLyk7XHJcbiAgICByZXR1cm4gbSA/IG1bMV0gOiBcIlwiO1xyXG4gIH1cclxuICBpZiAodHlwZW9mIHZhbHVlICE9PSBcIm9iamVjdFwiKSByZXR1cm4gXCJcIjtcclxuICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcclxuICAgIGZvciAoY29uc3QgaXRlbSBvZiB2YWx1ZSkge1xyXG4gICAgICBjb25zdCBmb3VuZCA9IGluZEV4dHJhY3ROdW1lcmljSWQoaXRlbSwgZGVwdGggKyAxKTtcclxuICAgICAgaWYgKGZvdW5kKSByZXR1cm4gZm91bmQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gXCJcIjtcclxuICB9XHJcblxyXG4gIGNvbnN0IGtleXMgPSBbXHJcbiAgICBcInJlY0lkXCIsXHJcbiAgICBcIlJlY0lkXCIsXHJcbiAgICBcInJlZlJlY0lkQWN0aXZpZGFkXCIsXHJcbiAgICBcIlJlZlJlY0lkQWN0aXZpZGFkXCIsXHJcbiAgICBcImFjdGl2aWRhZFJlY0lkXCIsXHJcbiAgICBcIkFjdGl2aWRhZFJlY0lkXCIsXHJcbiAgICBcImlkXCIsXHJcbiAgICBcIklkXCIsXHJcbiAgICBcInZhbHVlXCIsXHJcbiAgICBcIlZhbHVlXCIsXHJcbiAgICBcInJlc3VsdFwiLFxyXG4gICAgXCJSZXN1bHRcIixcclxuICAgIFwiZGF0YVwiLFxyXG4gICAgXCJEYXRhXCIsXHJcbiAgICBcIm1lc3NhZ2VcIixcclxuICAgIFwiTWVzc2FnZVwiLFxyXG4gIF07XHJcblxyXG4gIGZvciAoY29uc3QgayBvZiBrZXlzKSB7XHJcbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCBrKSkge1xyXG4gICAgICBjb25zdCBmb3VuZCA9IGluZEV4dHJhY3ROdW1lcmljSWQoKHZhbHVlIGFzIGFueSlba10sIGRlcHRoICsgMSk7XHJcbiAgICAgIGlmIChmb3VuZCkgcmV0dXJuIGZvdW5kO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZm9yIChjb25zdCB2IG9mIE9iamVjdC52YWx1ZXModmFsdWUgYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj4pKSB7XHJcbiAgICBjb25zdCBmb3VuZCA9IGluZEV4dHJhY3ROdW1lcmljSWQodiwgZGVwdGggKyAxKTtcclxuICAgIGlmIChmb3VuZCkgcmV0dXJuIGZvdW5kO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIFwiXCI7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgaW5kRXh0cmFjdFNpZ25lZElkID0gKHZhbHVlOiB1bmtub3duLCBkZXB0aCA9IDApOiBzdHJpbmcgPT4ge1xyXG4gIGlmIChkZXB0aCA+IDMpIHJldHVybiBcIlwiO1xyXG4gIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gXCJcIjtcclxuICBpZiAodHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiICYmIE51bWJlci5pc0Zpbml0ZSh2YWx1ZSkpIHJldHVybiBTdHJpbmcoTWF0aC50cnVuYyh2YWx1ZSkpO1xyXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpIHtcclxuICAgIGNvbnN0IHJhdyA9IHZhbHVlLnRyaW0oKTtcclxuICAgIGlmICghcmF3KSByZXR1cm4gXCJcIjtcclxuICAgIGNvbnN0IG1hdGNoID0gcmF3Lm1hdGNoKC8tP1xcZHszLH0vKTtcclxuICAgIHJldHVybiBtYXRjaCA/IG1hdGNoWzBdIDogXCJcIjtcclxuICB9XHJcbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJvYmplY3RcIikgcmV0dXJuIFwiXCI7XHJcbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XHJcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgdmFsdWUpIHtcclxuICAgICAgY29uc3QgZm91bmQgPSBpbmRFeHRyYWN0U2lnbmVkSWQoaXRlbSwgZGVwdGggKyAxKTtcclxuICAgICAgaWYgKGZvdW5kKSByZXR1cm4gZm91bmQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gXCJcIjtcclxuICB9XHJcblxyXG4gIGNvbnN0IGtleXMgPSBbXHJcbiAgICBcInJlY0lkXCIsXHJcbiAgICBcIlJlY0lkXCIsXHJcbiAgICBcInJlZlJlY0lkQWN0aXZpZGFkXCIsXHJcbiAgICBcIlJlZlJlY0lkQWN0aXZpZGFkXCIsXHJcbiAgICBcImFjdGl2aWRhZFJlY0lkXCIsXHJcbiAgICBcIkFjdGl2aWRhZFJlY0lkXCIsXHJcbiAgICBcIm1lc3NhZ2VcIixcclxuICAgIFwiTWVzc2FnZVwiLFxyXG4gICAgXCJyZXN1bHRcIixcclxuICAgIFwiUmVzdWx0XCIsXHJcbiAgICBcImRhdGFcIixcclxuICAgIFwiRGF0YVwiLFxyXG4gIF07XHJcblxyXG4gIGZvciAoY29uc3QgayBvZiBrZXlzKSB7XHJcbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCBrKSkge1xyXG4gICAgICBjb25zdCBmb3VuZCA9IGluZEV4dHJhY3RTaWduZWRJZCgodmFsdWUgYXMgYW55KVtrXSwgZGVwdGggKyAxKTtcclxuICAgICAgaWYgKGZvdW5kKSByZXR1cm4gZm91bmQ7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmb3IgKGNvbnN0IHYgb2YgT2JqZWN0LnZhbHVlcyh2YWx1ZSBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPikpIHtcclxuICAgIGNvbnN0IGZvdW5kID0gaW5kRXh0cmFjdFNpZ25lZElkKHYsIGRlcHRoICsgMSk7XHJcbiAgICBpZiAoZm91bmQpIHJldHVybiBmb3VuZDtcclxuICB9XHJcblxyXG4gIHJldHVybiBcIlwiO1xyXG59O1xyXG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlSWQsIHVzZU1lbW8sIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgWE1hcmtJY29uIH0gZnJvbSBcIkBoZXJvaWNvbnMvcmVhY3QvMjAvc29saWRcIjtcclxuaW1wb3J0IEZsb2F0aW5nTGlzdCBmcm9tIFwiLi4vY29tbW9ucy9GbG9hdGluZ0xpc3QudHN4XCI7XHJcbmltcG9ydCBTcGlubmVyIGZyb20gXCIuLi9jb21tb25zL1NwaW5uZXIudHN4XCI7XHJcbmltcG9ydCB7IENoZXZyb25Eb3duU3ZnLCBDaGV2cm9uVXBTdmcgfSBmcm9tIFwiLi4vY29tbW9ucy9jaGV2cm9ucy50c3hcIjtcclxuaW1wb3J0IHsgZmV0Y2hKc29uIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2FwaVNlcnZpY2UudHNcIjtcclxuaW1wb3J0IHsgaGFuZGxlQ29tYm9ib3hLZXlEb3duIH0gZnJvbSBcIi4uLy4uL2hvb2tzL3VzZUNvbWJvYm94S2V5Ym9hcmQudHNcIjtcclxuaW1wb3J0IHsgdXNlT3V0c2lkZUNsaWNrIH0gZnJvbSBcIi4uLy4uL2hvb2tzL3VzZU91dHNpZGVDbGljay50c1wiO1xyXG5pbXBvcnQgeyBjbGFzc05hbWVzIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2NsYXNzTmFtZXMudHNcIjtcclxuaW1wb3J0IHsgaW5kRm9ybWF0LCBpbmRUIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHsgaXNOb0RhdGFSb3csIGlzTm9EYXRhVGV4dCB9IGZyb20gXCIuLi8uLi91dGlscy9ub0RhdGEudHNcIjtcclxuaW1wb3J0IHsgZ2V0Q2FjaGVkQ29udGFjdHMsIHNldENhY2hlZENvbnRhY3RzLCBnZXRTdG9yZWRTZWxlY3Rpb24sIHNldFN0b3JlZFNlbGVjdGlvbiwgY2xlYXJTdG9yZWRTZWxlY3Rpb24gfSBmcm9tIFwiLi4vLi4vdXRpbHMvdmlzaXRhc1N0b3JhZ2UudHNcIjtcclxuXHJcbnR5cGUgQ29udGFjdE9wdGlvbiA9IHtcclxuICB2YWx1ZTogc3RyaW5nO1xyXG4gIHRleHQ6IHN0cmluZztcclxuICBjYXJnbzogc3RyaW5nO1xyXG4gIGVtcHJlc2E6IHN0cmluZztcclxufTtcclxuXHJcbnR5cGUgQ29udGFjdHNEcm9wZG93blJlc3BvbnNlID0ge1xyXG4gIGl0ZW1zPzogdW5rbm93bltdO1xyXG4gIEl0ZW1zPzogdW5rbm93bltdO1xyXG59O1xyXG5cclxudHlwZSBDb250YWN0c0NvbWJvYm94UHJvcHMgPSB7XHJcbiAgYWNjb3VudE51bT86IHN0cmluZztcclxuICB2YWx1ZT86IENvbnRhY3RPcHRpb25bXTtcclxuICBvbkNoYW5nZTogKHZhbHVlOiBDb250YWN0T3B0aW9uW10pID0+IHZvaWQ7XHJcbiAgcG9ydGFsQ2xhc3NOYW1lPzogc3RyaW5nO1xyXG4gIHBhbmVsQ2xhc3NOYW1lPzogc3RyaW5nO1xyXG59O1xyXG5cclxuLy8gTXVsdGktc2VsZWN0IGNvbnRhY3RzIGNvbWJvYm94IHRpZWQgdG8gdGhlIHNlbGVjdGVkIGNsaWVudC5cclxuY29uc3QgQ29udGFjdHNDb21ib2JveCA9ICh7IGFjY291bnROdW0sIHZhbHVlID0gW10sIG9uQ2hhbmdlLCBwb3J0YWxDbGFzc05hbWUsIHBhbmVsQ2xhc3NOYW1lIH06IENvbnRhY3RzQ29tYm9ib3hQcm9wcykgPT4ge1xyXG4gIGNvbnN0IFtxdWVyeSwgc2V0UXVlcnldID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW29wdGlvbnMsIHNldE9wdGlvbnNdID0gdXNlU3RhdGU8Q29udGFjdE9wdGlvbltdPihbXSk7XHJcbiAgY29uc3QgW3NlbGVjdGVkLCBzZXRTZWxlY3RlZF0gPSB1c2VTdGF0ZTxDb250YWN0T3B0aW9uW10+KHZhbHVlKTtcclxuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW2xvYWRpbmdNb3JlLCBzZXRMb2FkaW5nTW9yZV0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW3N0YXR1cywgc2V0U3RhdHVzXSA9IHVzZVN0YXRlKGluZFQoXCJWaXNpdHNfQ3JlYXRlX1NlbGVjdENsaWVudEZpcnN0XCIsIFwiU2VsZWN0IGEgY2xpZW50IGZpcnN0LlwiKSk7XHJcbiAgY29uc3QgW2hhc0xvYWRlZCwgc2V0SGFzTG9hZGVkXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbb3Blbiwgc2V0T3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW3BhZ2UsIHNldFBhZ2VdID0gdXNlU3RhdGUoMSk7XHJcbiAgY29uc3QgW2hhc01vcmUsIHNldEhhc01vcmVdID0gdXNlU3RhdGUodHJ1ZSk7XHJcbiAgY29uc3QgW2Jsb2NraW5nLCBzZXRCbG9ja2luZ10gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW2FjdGl2ZUluZGV4LCBzZXRBY3RpdmVJbmRleF0gPSB1c2VTdGF0ZSgwKTtcclxuICBjb25zdCBbc2hvd05vdEZvdW5kU3RhdGUsIHNldFNob3dOb3RGb3VuZFN0YXRlXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBsaXN0UmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgYm94UmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgYWJvcnRSZWYgPSB1c2VSZWY8QWJvcnRDb250cm9sbGVyIHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgY29udGFpbmVyUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgaW5wdXRSZWYgPSB1c2VSZWY8SFRNTElucHV0RWxlbWVudCB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IGxhc3RBY2NvdW50UmVmID0gdXNlUmVmKGFjY291bnROdW0gfHwgXCJcIik7XHJcbiAgY29uc3Qgb25DaGFuZ2VSZWYgPSB1c2VSZWYob25DaGFuZ2UpO1xyXG4gIGNvbnN0IGlkQmFzZSA9IHVzZUlkKCk7XHJcbiAgY29uc3QgaW5wdXRJZCA9IGAke2lkQmFzZX0tY29udGFjdHMtaW5wdXRgO1xyXG4gIGNvbnN0IGxpc3RJZCA9IGAke2lkQmFzZX0tY29udGFjdHMtb3B0aW9uc2A7XHJcblxyXG4gIHVzZU91dHNpZGVDbGljayhbY29udGFpbmVyUmVmLCBsaXN0UmVmXSwgKCkgPT4ge1xyXG4gICAgc2V0T3BlbihmYWxzZSk7XHJcbiAgICBzZXRTaG93Tm90Rm91bmRTdGF0ZShmYWxzZSk7XHJcbiAgICBpZiAocXVlcnkudHJpbSgpKSB7XHJcbiAgICAgIHNldFF1ZXJ5KFwiXCIpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgb25DaGFuZ2VSZWYuY3VycmVudCA9IG9uQ2hhbmdlO1xyXG4gIH0sIFtvbkNoYW5nZV0pO1xyXG5cclxuICBjb25zdCBpc1NhbWVTZWxlY3Rpb24gPSAoYTogQ29udGFjdE9wdGlvbltdID0gW10sIGI6IENvbnRhY3RPcHRpb25bXSA9IFtdKSA9PiB7XHJcbiAgICBpZiAoYS5sZW5ndGggIT09IGIubGVuZ3RoKSByZXR1cm4gZmFsc2U7XHJcbiAgICBjb25zdCBhcyA9IGEubWFwKCh4KSA9PiBTdHJpbmcoeC52YWx1ZSkpLnNvcnQoKTtcclxuICAgIGNvbnN0IGJzID0gYi5tYXAoKHgpID0+IFN0cmluZyh4LnZhbHVlKSkuc29ydCgpO1xyXG4gICAgcmV0dXJuIGFzLmV2ZXJ5KCh2LCBpKSA9PiB2ID09PSBic1tpXSk7XHJcbiAgfTtcclxuXHJcbiAgLy8gU3luYyBpbnRlcm5hbCBzZWxlY3Rpb24gd2l0aCB0aGUgcHJvcCAoZHJhZnQvY2FjaGUgcmVzdG9yZSkuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghaXNTYW1lU2VsZWN0aW9uKHZhbHVlIHx8IFtdLCBzZWxlY3RlZCkpIHtcclxuICAgICAgc2V0U2VsZWN0ZWQodmFsdWUgfHwgW10pO1xyXG4gICAgfVxyXG4gIH0sIFt2YWx1ZV0pO1xyXG5cclxuICBjb25zdCBjYW5jZWxQZW5kaW5nID0gKCkgPT4ge1xyXG4gICAgaWYgKGFib3J0UmVmLmN1cnJlbnQpIHtcclxuICAgICAgYWJvcnRSZWYuY3VycmVudC5hYm9ydCgpO1xyXG4gICAgICBhYm9ydFJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgaWYgKGFib3J0UmVmLmN1cnJlbnQpIHtcclxuICAgICAgICBhYm9ydFJlZi5jdXJyZW50LmFib3J0KCk7XHJcbiAgICAgICAgYWJvcnRSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBwcmltZUZyb21DYWNoZSA9ICgpID0+IHtcclxuICAgIGNvbnN0IGNhY2hlZCA9IGdldENhY2hlZENvbnRhY3RzKGFjY291bnROdW0pIGFzIENvbnRhY3RPcHRpb25bXSB8IG51bGw7XHJcbiAgICBpZiAoY2FjaGVkKSB7XHJcbiAgICAgIHNldE9wdGlvbnMoY2FjaGVkKTtcclxuICAgICAgc2V0U2hvd05vdEZvdW5kU3RhdGUoZmFsc2UpO1xyXG4gICAgICBzZXRIYXNMb2FkZWQodHJ1ZSk7XHJcbiAgICAgIHNldEhhc01vcmUoY2FjaGVkLmxlbmd0aCA9PT0gMTApO1xyXG4gICAgICBzZXRTdGF0dXMoXHJcbiAgICAgICAgY2FjaGVkLmxlbmd0aFxyXG4gICAgICAgICAgPyBpbmRGb3JtYXQoXCJWaXNpdHNfQ3JlYXRlX0NvbnRhY3RDb3VudENhY2hlXCIsIFwiezB9IGNvbnRhY3RzIChjYWNoZSlcIiwgY2FjaGVkLmxlbmd0aClcclxuICAgICAgICAgIDogaW5kVChcIlZpc2l0c19DcmVhdGVfTm9Db250YWN0c1wiLCBcIk5vIGNvbnRhY3RzXCIpXHJcbiAgICAgICk7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH07XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjYW5jZWxQZW5kaW5nKCk7XHJcbiAgICBzZXRRdWVyeShcIlwiKTtcclxuICAgIHNldE9wZW4oZmFsc2UpO1xyXG4gICAgc2V0TG9hZGluZyhmYWxzZSk7XHJcbiAgICBzZXRCbG9ja2luZyhmYWxzZSk7XHJcbiAgICBzZXRMb2FkaW5nTW9yZShmYWxzZSk7XHJcbiAgICBzZXRBY3RpdmVJbmRleCgwKTtcclxuICAgIHNldFNob3dOb3RGb3VuZFN0YXRlKGZhbHNlKTtcclxuICAgIHNldFBhZ2UoMSk7XHJcbiAgICBzZXRIYXNNb3JlKHRydWUpO1xyXG5cclxuICAgIGlmICghYWNjb3VudE51bSkge1xyXG4gICAgICBzZXRPcHRpb25zKFtdKTtcclxuICAgICAgc2V0U2VsZWN0ZWQoW10pO1xyXG4gICAgICBvbkNoYW5nZVJlZi5jdXJyZW50KFtdKTtcclxuICAgICAgc2V0U3RhdHVzKGluZFQoXCJWaXNpdHNfQ3JlYXRlX1NlbGVjdENsaWVudEZpcnN0XCIsIFwiU2VsZWN0IGEgY2xpZW50IGZpcnN0LlwiKSk7XHJcbiAgICAgIHNldEhhc0xvYWRlZChmYWxzZSk7XHJcbiAgICAgIGNsZWFyU3RvcmVkU2VsZWN0aW9uKGxhc3RBY2NvdW50UmVmLmN1cnJlbnQpO1xyXG4gICAgICBsYXN0QWNjb3VudFJlZi5jdXJyZW50ID0gXCJcIjtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGNoYW5nZWQgPSBsYXN0QWNjb3VudFJlZi5jdXJyZW50ICYmIGxhc3RBY2NvdW50UmVmLmN1cnJlbnQgIT09IGFjY291bnROdW07XHJcbiAgICBpZiAoY2hhbmdlZCkge1xyXG4gICAgICBzZXRTZWxlY3RlZChbXSk7XHJcbiAgICAgIG9uQ2hhbmdlUmVmLmN1cnJlbnQoW10pO1xyXG4gICAgICBjbGVhclN0b3JlZFNlbGVjdGlvbihsYXN0QWNjb3VudFJlZi5jdXJyZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB1c2VkQ2FjaGUgPSBwcmltZUZyb21DYWNoZSgpO1xyXG4gICAgaWYgKCF1c2VkQ2FjaGUpIHtcclxuICAgICAgc2V0T3B0aW9ucyhbXSk7XHJcbiAgICAgIHNldEhhc0xvYWRlZChmYWxzZSk7XHJcbiAgICAgIHNldFN0YXR1cyhpbmRUKFwiVmlzaXRzX0NyZWF0ZV9QcmVzc0Fycm93VG9Mb2FkQ29udGFjdHNcIiwgXCJQcmVzcyBBcnJvd0Rvd24gdG8gbG9hZCBjb250YWN0cy5cIikpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHN0b3JlZFNlbGVjdGlvbiA9IGdldFN0b3JlZFNlbGVjdGlvbihhY2NvdW50TnVtKSBhcyBDb250YWN0T3B0aW9uW107XHJcbiAgICBpZiAoc3RvcmVkU2VsZWN0aW9uLmxlbmd0aCAmJiAhdmFsdWU/Lmxlbmd0aCkge1xyXG4gICAgICBzZXRTZWxlY3RlZChzdG9yZWRTZWxlY3Rpb24pO1xyXG4gICAgICBvbkNoYW5nZVJlZi5jdXJyZW50KHN0b3JlZFNlbGVjdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgbGFzdEFjY291bnRSZWYuY3VycmVudCA9IGFjY291bnROdW07XHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVhY3QtaG9va3MvZXhoYXVzdGl2ZS1kZXBzXHJcbiAgfSwgW2FjY291bnROdW1dKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIG9uQ2hhbmdlUmVmLmN1cnJlbnQoc2VsZWN0ZWQpO1xyXG4gICAgaWYgKGFjY291bnROdW0pIHNldFN0b3JlZFNlbGVjdGlvbihhY2NvdW50TnVtLCBzZWxlY3RlZCk7XHJcbiAgfSwgW3NlbGVjdGVkLCBhY2NvdW50TnVtXSk7XHJcblxyXG4gIGNvbnN0IHRvVGV4dCA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZyA9PiB7XHJcbiAgICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkgcmV0dXJuIFwiXCI7XHJcbiAgICByZXR1cm4gU3RyaW5nKHZhbHVlKS50cmltKCk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgYXNPYmplY3RSZWNvcmQgPSAodmFsdWU6IHVua25vd24pOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiB8IG51bGwgPT4ge1xyXG4gICAgaWYgKCF2YWx1ZSB8fCB0eXBlb2YgdmFsdWUgIT09IFwib2JqZWN0XCIgfHwgQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHJldHVybiBudWxsO1xyXG4gICAgcmV0dXJuIHZhbHVlIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+O1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IG1hcENvbnRhY3RzID0gKGl0ZW1zOiB1bmtub3duW10gPSBbXSkgPT5cclxuICAgIGl0ZW1zXHJcbiAgICAgIC5tYXAoKGVudHJ5KSA9PiB7XHJcbiAgICAgICAgaWYgKGlzTm9EYXRhUm93KGVudHJ5KSkgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgY29uc3QgcmVjb3JkID0gYXNPYmplY3RSZWNvcmQoZW50cnkpO1xyXG4gICAgICAgIGlmICghcmVjb3JkKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgICAgICAgY29uc3QgcmVjSWQgPSB0b1RleHQocmVjb3JkLnJlY0lkID8/IHJlY29yZC5SZWNJZCk7XHJcbiAgICAgICAgY29uc3QgbmFtZSA9IHRvVGV4dChyZWNvcmQubmFtZSA/PyByZWNvcmQuTmFtZSk7XHJcbiAgICAgICAgY29uc3QgY2FyZ28gPSB0b1RleHQocmVjb3JkLmNhcmdvID8/IHJlY29yZC5DYXJnbyk7XHJcbiAgICAgICAgY29uc3QgZW1wcmVzYSA9IHRvVGV4dChyZWNvcmQuZW1wcmVzYSA/PyByZWNvcmQuRW1wcmVzYSk7XHJcblxyXG4gICAgICAgIGlmICghcmVjSWQgfHwgaXNOb0RhdGFUZXh0KG5hbWUpKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHZhbHVlOiByZWNJZCxcclxuICAgICAgICAgIHRleHQ6IG5hbWUudG9VcHBlckNhc2UoKSxcclxuICAgICAgICAgIGNhcmdvOiBjYXJnby50b1VwcGVyQ2FzZSgpLFxyXG4gICAgICAgICAgZW1wcmVzYTogZW1wcmVzYS50b1VwcGVyQ2FzZSgpLFxyXG4gICAgICAgIH0gYXMgQ29udGFjdE9wdGlvbjtcclxuICAgICAgfSlcclxuICAgICAgLmZpbHRlcihCb29sZWFuKSBhcyBDb250YWN0T3B0aW9uW107XHJcblxyXG4gIGNvbnN0IGxvYWQgPSBhc3luYyAocGFnZVRvTG9hZCA9IDEsIGFwcGVuZCA9IGZhbHNlKSA9PiB7XHJcbiAgICBpZiAoIWFjY291bnROdW0pIHJldHVybjtcclxuICAgIGlmIChsb2FkaW5nIHx8IGxvYWRpbmdNb3JlKSByZXR1cm47XHJcbiAgICBjYW5jZWxQZW5kaW5nKCk7XHJcblxyXG4gICAgaWYgKCFhcHBlbmQpIHtcclxuICAgICAgc2V0TG9hZGluZyh0cnVlKTtcclxuICAgICAgc2V0QmxvY2tpbmcodHJ1ZSk7XHJcbiAgICAgIGlmIChwYWdlVG9Mb2FkID09PSAxKSBzZXRTdGF0dXMoaW5kVChcIlZpc2l0c19DcmVhdGVfTG9hZGluZ0NvbnRhY3RzXCIsIFwiTG9hZGluZyBjb250YWN0cy4uLlwiKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzZXRMb2FkaW5nTW9yZSh0cnVlKTtcclxuICAgICAgc2V0QmxvY2tpbmcodHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcclxuICAgIGFib3J0UmVmLmN1cnJlbnQgPSBjb250cm9sbGVyO1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2hKc29uPENvbnRhY3RzRHJvcGRvd25SZXNwb25zZT4oXHJcbiAgICAgICAgYC9WaXNpdGFzL0dldENvbnRhY3RzRm9yRHJvcGRvd24/YWNjb3VudE51bT0ke2VuY29kZVVSSUNvbXBvbmVudChhY2NvdW50TnVtKX0mcGFnZT0ke3BhZ2VUb0xvYWR9JnBhZ2VTaXplPTEwYCxcclxuICAgICAgICB7IHNpZ25hbDogY29udHJvbGxlci5zaWduYWwgfVxyXG4gICAgICApO1xyXG4gICAgICBjb25zdCByYXdJdGVtcyA9IEFycmF5LmlzQXJyYXkocmVzLml0ZW1zKSA/IHJlcy5pdGVtcyA6IEFycmF5LmlzQXJyYXkocmVzLkl0ZW1zKSA/IHJlcy5JdGVtcyA6IFtdO1xyXG4gICAgICBjb25zdCBtYXBwZWQgPSBtYXBDb250YWN0cyhyYXdJdGVtcyk7XHJcbiAgICAgIHNldE9wdGlvbnMoKHByZXYpID0+IHtcclxuICAgICAgICBjb25zdCBuZXh0ID0gYXBwZW5kID8gWy4uLnByZXYsIC4uLm1hcHBlZF0gOiBtYXBwZWQ7XHJcbiAgICAgICAgc2V0Q2FjaGVkQ29udGFjdHMoYWNjb3VudE51bSwgbmV4dCk7XHJcbiAgICAgICAgcmV0dXJuIG5leHQ7XHJcbiAgICAgIH0pO1xyXG4gICAgICBzZXRTaG93Tm90Rm91bmRTdGF0ZShmYWxzZSk7XHJcbiAgICAgIHNldEhhc0xvYWRlZCh0cnVlKTtcclxuICAgICAgc2V0SGFzTW9yZShtYXBwZWQubGVuZ3RoID09PSAxMCk7XHJcbiAgICAgIHNldFBhZ2UocGFnZVRvTG9hZCk7XHJcbiAgICAgIHNldFN0YXR1cyhtYXBwZWQubGVuZ3RoID8gaW5kRm9ybWF0KFwiVmlzaXRzX0NyZWF0ZV9Db250YWN0Q291bnRcIiwgXCJ7MH0gY29udGFjdHNcIiwgbWFwcGVkLmxlbmd0aCkgOiBpbmRUKFwiVmlzaXRzX0NyZWF0ZV9Ob0NvbnRhY3RzXCIsIFwiTm8gY29udGFjdHNcIikpO1xyXG4gICAgfSBjYXRjaCB7XHJcbiAgICAgIHNldFN0YXR1cyhpbmRUKFwiVmlzaXRzX0NyZWF0ZV9Mb2FkQ29udGFjdHNFcnJvclwiLCBcIkZhaWxlZCB0byBsb2FkIGNvbnRhY3RzLlwiKSk7XHJcbiAgICB9IGZpbmFsbHkge1xyXG4gICAgICBhYm9ydFJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XHJcbiAgICAgIHNldExvYWRpbmdNb3JlKGZhbHNlKTtcclxuICAgICAgc2V0QmxvY2tpbmcoZmFsc2UpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGNvbnN0IGVuc3VyZUxvYWRlZCA9ICgpID0+IHtcclxuICAgIGlmICghYWNjb3VudE51bSkgcmV0dXJuO1xyXG4gICAgaWYgKGhhc0xvYWRlZCAmJiBvcHRpb25zLmxlbmd0aCkgcmV0dXJuO1xyXG4gICAgaWYgKHByaW1lRnJvbUNhY2hlKCkpIHJldHVybjtcclxuICAgIGxvYWQoMSwgZmFsc2UpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGxvYWRNb3JlQ29udGFjdHMgPSBSZWFjdC51c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAoIWFjY291bnROdW0gfHwgIWhhc01vcmUgfHwgbG9hZGluZ01vcmUgfHwgbG9hZGluZykgcmV0dXJuO1xyXG4gICAgbG9hZChwYWdlICsgMSwgdHJ1ZSk7XHJcbiAgfSwgW2FjY291bnROdW0sIGhhc01vcmUsIGxvYWRpbmdNb3JlLCBsb2FkaW5nLCBwYWdlXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIW9wZW4gfHwgIWxpc3RSZWYuY3VycmVudCkgcmV0dXJuO1xyXG4gICAgY29uc3QgZWwgPSBsaXN0UmVmLmN1cnJlbnQ7XHJcbiAgICBjb25zdCBvblNjcm9sbCA9ICgpID0+IHtcclxuICAgICAgaWYgKGVsLnNjcm9sbFRvcCArIGVsLmNsaWVudEhlaWdodCA+PSBlbC5zY3JvbGxIZWlnaHQgLSA4KSBsb2FkTW9yZUNvbnRhY3RzKCk7XHJcbiAgICB9O1xyXG4gICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBvblNjcm9sbCwgeyBwYXNzaXZlOiB0cnVlIH0pO1xyXG4gICAgcmV0dXJuICgpID0+IGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgb25TY3JvbGwpO1xyXG4gIH0sIFtvcGVuLCBsb2FkTW9yZUNvbnRhY3RzXSk7XHJcblxyXG4gIGNvbnN0IHNlbGVjdGVkVmFsdWVzID0gdXNlTWVtbygoKSA9PiB7XHJcbiAgICByZXR1cm4gbmV3IFNldCgoc2VsZWN0ZWQgfHwgW10pLm1hcCgocykgPT4gU3RyaW5nKHMudmFsdWUpKSk7XHJcbiAgfSwgW3NlbGVjdGVkXSk7XHJcblxyXG4gIGNvbnN0IGF2YWlsYWJsZU9wdGlvbnMgPSB1c2VNZW1vKCgpID0+IHtcclxuICAgIC8vIEhpZGUgYWxyZWFkeSBzZWxlY3RlZCBjb250YWN0cyBmcm9tIHRoZSBkcm9wZG93biBsaXN0LlxyXG4gICAgcmV0dXJuIChvcHRpb25zIHx8IFtdKS5maWx0ZXIoKG8pID0+ICFzZWxlY3RlZFZhbHVlcy5oYXMoU3RyaW5nKG8udmFsdWUpKSk7XHJcbiAgfSwgW29wdGlvbnMsIHNlbGVjdGVkVmFsdWVzXSk7XHJcblxyXG4gIGNvbnN0IGZpbHRlcmVkID0gdXNlTWVtbygoKSA9PiB7XHJcbiAgICBjb25zdCBxID0gcXVlcnkudHJpbSgpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICBpZiAoIXEpIHJldHVybiBhdmFpbGFibGVPcHRpb25zO1xyXG4gICAgcmV0dXJuIGF2YWlsYWJsZU9wdGlvbnMuZmlsdGVyKFxyXG4gICAgICAobykgPT4gby50ZXh0LnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMocSkgfHwgby5jYXJnby50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHEpIHx8IG8uZW1wcmVzYS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHEpXHJcbiAgICApO1xyXG4gIH0sIFthdmFpbGFibGVPcHRpb25zLCBxdWVyeV0pO1xyXG4gIGNvbnN0IHNob3VsZFNob3dOb3RGb3VuZFJvdyA9IHNob3dOb3RGb3VuZFN0YXRlIHx8ICghIXF1ZXJ5LnRyaW0oKSAmJiBmaWx0ZXJlZC5sZW5ndGggPT09IDApO1xyXG4gIGNvbnN0IHJlc29sdmVkQWN0aXZlSW5kZXggPVxyXG4gICAgZmlsdGVyZWQubGVuZ3RoID4gMCA/IE1hdGgubWluKE1hdGgubWF4KGFjdGl2ZUluZGV4LCAwKSwgZmlsdGVyZWQubGVuZ3RoIC0gMSkgOiAwO1xyXG4gIGNvbnN0IGFjdGl2ZUlkID1cclxuICAgIG9wZW4gJiYgZmlsdGVyZWRbcmVzb2x2ZWRBY3RpdmVJbmRleF0gPyBgJHtpZEJhc2V9LWNvbnRhY3Qtb3B0LSR7ZmlsdGVyZWRbcmVzb2x2ZWRBY3RpdmVJbmRleF0udmFsdWV9YCA6IHVuZGVmaW5lZDtcclxuXHJcbiAgY29uc3QgdG9nZ2xlT3B0aW9uID0gKG9wdDogQ29udGFjdE9wdGlvbikgPT4ge1xyXG4gICAgc2V0U2VsZWN0ZWQoKHByZXYpID0+IHtcclxuICAgICAgY29uc3QgZXhpc3RzID0gcHJldi5zb21lKChwKSA9PiBwLnZhbHVlID09PSBvcHQudmFsdWUpO1xyXG4gICAgICBpZiAoZXhpc3RzKSByZXR1cm4gcHJldi5maWx0ZXIoKHApID0+IHAudmFsdWUgIT09IG9wdC52YWx1ZSk7XHJcbiAgICAgIHJldHVybiBbLi4ucHJldiwgb3B0XTtcclxuICAgIH0pO1xyXG4gICAgc2V0U2hvd05vdEZvdW5kU3RhdGUoZmFsc2UpO1xyXG4gICAgc2V0UXVlcnkoXCJcIik7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaGFuZGxlS2V5RG93biA9IChldjogUmVhY3QuS2V5Ym9hcmRFdmVudDxIVE1MSW5wdXRFbGVtZW50PikgPT4ge1xyXG4gICAgaGFuZGxlQ29tYm9ib3hLZXlEb3duKGV2LCB7XHJcbiAgICAgIGlzT3Blbjogb3BlbixcclxuICAgICAgc2V0T3BlbixcclxuICAgICAgb3B0aW9uQ291bnQ6IGZpbHRlcmVkLmxlbmd0aCxcclxuICAgICAgc2V0QWN0aXZlSW5kZXgsXHJcbiAgICAgIG9wZW5PbkFycm93OiB0cnVlLFxyXG4gICAgICBvbkFycm93TmF2aWdhdGU6IGVuc3VyZUxvYWRlZCxcclxuICAgICAgb25FbnRlcldoZW5PcGVuOiAoKSA9PiB7XHJcbiAgICAgICAgaWYgKGZpbHRlcmVkLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgIHRvZ2dsZU9wdGlvbihmaWx0ZXJlZFtyZXNvbHZlZEFjdGl2ZUluZGV4XSA/PyBmaWx0ZXJlZFswXSk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocXVlcnkudHJpbSgpKSB7XHJcbiAgICAgICAgICBzZXRRdWVyeShcIlwiKTtcclxuICAgICAgICAgIHNldFNob3dOb3RGb3VuZFN0YXRlKHRydWUpO1xyXG4gICAgICAgICAgc2V0T3Blbih0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIG9uRW50ZXJXaGVuQ2xvc2VkOiBhY2NvdW50TnVtXHJcbiAgICAgICAgPyAoKSA9PiB7XHJcbiAgICAgICAgICAgIGVuc3VyZUxvYWRlZCgpO1xyXG4gICAgICAgICAgICBzZXRPcGVuKHRydWUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIDogdW5kZWZpbmVkLFxyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yXCIgcmVmPXtjb250YWluZXJSZWZ9PlxyXG4gICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZm9ybS1sYWJlbCBmb250LXNlbWlib2xkXCIgaHRtbEZvcj17aW5wdXRJZH0+XHJcbiAgICAgICAge2luZFQoXCJWaXNpdHNfQ3JlYXRlX1NlYXJjaENvbnRhY3RcIiwgXCJTZWFyY2ggY29udGFjdFwiKX1cclxuICAgICAgPC9sYWJlbD5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZVwiPlxyXG4gICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICByZWY9e2JveFJlZn1cclxuICAgICAgICAgICAgY2xhc3NOYW1lPVwicmVsYXRpdmUgdy1mdWxsIGN1cnNvci1kZWZhdWx0IHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlci1zbGF0ZS0zMDAgYmctd2hpdGUgdGV4dC1sZWZ0IHNoYWRvdy14cyBmb2N1cy13aXRoaW46Ym9yZGVyLXByaW1hcnkgZm9jdXMtd2l0aGluOnJpbmctMiBmb2N1cy13aXRoaW46cmluZy1wcmltYXJ5IGZvY3VzLXdpdGhpbjpyaW5nLW9mZnNldC0wIHNtOnRleHQtc21cIlxuICAgICAgICAgID5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAgZ2FwLTEgcHgtMyBweS0yIG1pbi1oLTEwXCI+XHJcbiAgICAgICAgICAgIHtzZWxlY3RlZC5tYXAoKGMpID0+IChcclxuICAgICAgICAgICAgICA8c3BhblxyXG4gICAgICAgICAgICAgICAga2V5PXtjLnZhbHVlfVxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYmctcHJpbWFyeS8xMCB0ZXh0LXNsYXRlLTcwMCBweC0yIHB5LTEgdGV4dC14c1wiXG4gICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgIHtjLnRleHR9XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTZWxlY3RlZCgocHJldikgPT4gcHJldi5maWx0ZXIoKHMpID0+IHMudmFsdWUgIT09IGMudmFsdWUpKX1cclxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS03MDAgaG92ZXI6dGV4dC1zbGF0ZS03MDAvODBcIlxyXG4gICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtpbmRUKFwiQ29tbW9uX0RlbGV0ZVwiLCBcIkRlbGV0ZVwiKX1cclxuICAgICAgICAgICAgICAgICAgdGl0bGU9e2luZFQoXCJDb21tb25fRGVsZXRlXCIsIFwiRGVsZXRlXCIpfVxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICA8WE1hcmtJY29uIGNsYXNzTmFtZT1cImgtNCB3LTRcIiBhcmlhLWhpZGRlbj1cInRydWVcIiAvPlxyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICAgICAgaWQ9e2lucHV0SWR9XHJcbiAgICAgICAgICAgICAgbmFtZT17YCR7aWRCYXNlfS1jb250YWN0cy1xdWVyeWB9XHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleC0xIG1pbi13LTMwIGJnLXRyYW5zcGFyZW50IHRleHQtc20gc206dGV4dC1iYXNlIGxlYWRpbmctNSB0ZXh0LXNsYXRlLTkwMCBib3JkZXItbm9uZSBvdXRsaW5lLWhpZGRlbiBweC0xIHB5LTEgZm9jdXM6cmluZy0wIGZvY3VzOmJvcmRlci10cmFuc3BhcmVudFwiXHJcbiAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgc2V0QWN0aXZlSW5kZXgoMCk7XHJcbiAgICAgICAgICAgICAgICBzZXRTaG93Tm90Rm91bmRTdGF0ZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBzZXRRdWVyeShldmVudC50YXJnZXQudmFsdWUpO1xyXG4gICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgb25LZXlEb3duPXtoYW5kbGVLZXlEb3dufVxyXG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtzZWxlY3RlZC5sZW5ndGggPyBcIlwiIDogaW5kVChcIlZpc2l0c19DcmVhdGVfRmlsdGVyUGxhY2Vob2xkZXJcIiwgXCJUeXBlIHRvIGZpbHRlci4uLlwiKX1cclxuICAgICAgICAgICAgICBhdXRvQ29tcGxldGU9XCJvZmZcIlxyXG4gICAgICAgICAgICAgIHJlZj17aW5wdXRSZWZ9XHJcbiAgICAgICAgICAgICAgcmVhZE9ubHk9eyFhY2NvdW50TnVtfVxyXG4gICAgICAgICAgICAgIHJvbGU9XCJjb21ib2JveFwiXHJcbiAgICAgICAgICAgICAgYXJpYS1leHBhbmRlZD17b3Blbn1cclxuICAgICAgICAgICAgICBhcmlhLWNvbnRyb2xzPXtsaXN0SWR9XHJcbiAgICAgICAgICAgICAgYXJpYS1hY3RpdmVkZXNjZW5kYW50PXthY3RpdmVJZH1cclxuICAgICAgICAgICAgICBhcmlhLWF1dG9jb21wbGV0ZT1cImxpc3RcIlxyXG4gICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2luZFQoXCJWaXNpdHNfQ3JlYXRlX1NlYXJjaENvbnRhY3RcIiwgXCJTZWFyY2ggY29udGFjdFwiKX1cclxuICAgICAgICAgICAgICBvbkZvY3VzPXsoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBlbnN1cmVMb2FkZWQoKTtcclxuICAgICAgICAgICAgICAgIHNldE9wZW4odHJ1ZSk7XHJcbiAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgeyhsb2FkaW5nIHx8IGJsb2NraW5nKSAmJiAoXHJcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQteS0wIHJpZ2h0LTkgZmxleCBpdGVtcy1jZW50ZXJcIj5cclxuICAgICAgICAgICAgICAgIDxTcGlubmVyIC8+XHJcbiAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC15LTAgcmlnaHQtMCBmbGV4IGl0ZW1zLWNlbnRlciBwci0yIHRleHQtc2xhdGUtNTAwIGhvdmVyOnRleHQtc2xhdGUtNjAwXCJcclxuICAgICAgICAgICAgYXJpYS1sYWJlbD17b3BlbiA/IGluZFQoXCJEcm9wZG93bl9IaWRlT3B0aW9uc1wiLCBcIkhpZGUgb3B0aW9uc1wiKSA6IGluZFQoXCJEcm9wZG93bl9TaG93T3B0aW9uc1wiLCBcIlNob3cgb3B0aW9uc1wiKX1cclxuICAgICAgICAgICAgYXJpYS1leHBhbmRlZD17b3Blbn1cclxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xyXG4gICAgICAgICAgICAgIGlmICghYWNjb3VudE51bSkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgIGlmIChvcGVuKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRPcGVuKGZhbHNlKTtcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZW5zdXJlTG9hZGVkKCk7XHJcbiAgICAgICAgICAgICAgICBzZXRPcGVuKHRydWUpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfX1cclxuICAgICAgICAgID5cclxuICAgICAgICAgICAge29wZW4gPyA8Q2hldnJvblVwU3ZnIGNsYXNzTmFtZT1cImgtNSB3LTVcIiBhcmlhLWhpZGRlbj1cInRydWVcIiAvPiA6IDxDaGV2cm9uRG93blN2ZyBjbGFzc05hbWU9XCJoLTUgdy01XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgLz59XHJcbiAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxGbG9hdGluZ0xpc3RcclxuICAgICAgICAgICAgYW5jaG9yUmVmPXtib3hSZWZ9XHJcbiAgICAgICAgICAgIG9wZW49e29wZW59XHJcbiAgICAgICAgICAgIHpJbmRleD17MzgwMDAwfVxyXG4gICAgICAgICAgICBtYXhIZWlnaHRDbGFzcz1cIm1heC1oLTcyXCJcclxuICAgICAgICAgICAgcm9sZT1cImxpc3Rib3hcIlxyXG4gICAgICAgICAgICByb3VuZGVkQ2xhc3M9XCJyb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXVwiXG4gICAgICAgICAgICBwb3J0YWxDbGFzc05hbWU9e3BvcnRhbENsYXNzTmFtZX1cclxuICAgICAgICAgICAgcGFuZWxDbGFzc05hbWU9e3BhbmVsQ2xhc3NOYW1lfVxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgPGRpdiByZWY9e2xpc3RSZWZ9IGlkPXtsaXN0SWR9IGFyaWEtbXVsdGlzZWxlY3RhYmxlPVwidHJ1ZVwiPlxyXG4gICAgICAgICAgICB7bG9hZGluZyAmJiAoXHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBweC00IHB5LTIgdGV4dC1zbSB0ZXh0LXNsYXRlLTUwMFwiPlxyXG4gICAgICAgICAgICAgICAgPFNwaW5uZXIgc2l6ZT1cImgtNCB3LTRcIiAvPlxyXG4gICAgICAgICAgICAgICAge2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgIHshbG9hZGluZyAmJiBvcHRpb25zLmxlbmd0aCA9PT0gMCAmJiAoXHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJweC00IHB5LTIgdGV4dC1zbSB0ZXh0LXNsYXRlLTUwMFwiPlxyXG4gICAgICAgICAgICAgICAge2hhc0xvYWRlZCA/IGluZFQoXCJWaXNpdHNfQ3JlYXRlX05vQ29udGFjdHNcIiwgXCJObyBjb250YWN0c1wiKSA6IGluZFQoXCJWaXNpdHNfQ3JlYXRlX1NlbGVjdENsaWVudEZpcnN0XCIsIFwiU2VsZWN0IGEgY2xpZW50IGZpcnN0LlwiKX1cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgeyFsb2FkaW5nICYmIG9wdGlvbnMubGVuZ3RoID4gMCAmJiBmaWx0ZXJlZC5sZW5ndGggPT09IDAgJiYgKFxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHgtNCBweS0yIHRleHQtc20gdGV4dC1zbGF0ZS01MDBcIj5cclxuICAgICAgICAgICAgICAgIHtzaG91bGRTaG93Tm90Rm91bmRSb3dcclxuICAgICAgICAgICAgICAgICAgPyBpbmRUKFwiQ29tbW9uX05vdEZvdW5kXCIsIFwiTm90IGZvdW5kXCIpXHJcbiAgICAgICAgICAgICAgICAgIDogaW5kVChcIlZpc2l0c19DcmVhdGVfTm9Nb3JlQ29udGFjdHNcIiwgXCJObyBtb3JlIGNvbnRhY3RzIGF2YWlsYWJsZVwiKX1cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgeyFsb2FkaW5nICYmXHJcbiAgICAgICAgICAgICAgZmlsdGVyZWQubWFwKChvcHQsIGlkeCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc2VsID0gc2VsZWN0ZWQuc29tZSgocykgPT4gcy52YWx1ZSA9PT0gb3B0LnZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGlzQWN0aXZlID0gaWR4ID09PSByZXNvbHZlZEFjdGl2ZUluZGV4O1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICAgICAgICAgIGtleT17b3B0LnZhbHVlfVxyXG4gICAgICAgICAgICAgICAgICAgIGlkPXtgJHtpZEJhc2V9LWNvbnRhY3Qtb3B0LSR7b3B0LnZhbHVlfWB9XHJcbiAgICAgICAgICAgICAgICAgICAgcm9sZT1cIm9wdGlvblwiXHJcbiAgICAgICAgICAgICAgICAgICAgYXJpYS1zZWxlY3RlZD17c2VsfVxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcclxuICAgICAgICAgICAgICAgICAgICAgIFwicmVsYXRpdmUgZmxleCB3LWZ1bGwgY3Vyc29yLWRlZmF1bHQgc2VsZWN0LW5vbmUgaXRlbXMtc3RhcnQgcHktMiBweC0zIHRleHQtbGVmdCB0ZXh0LXNtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICBpc0FjdGl2ZSA/IFwiYmctcHJpbWFyeSB0ZXh0LXdoaXRlXCIgOiBzZWwgPyBcImJnLXByaW1hcnkvMTAgdGV4dC1wcmltYXJ5XCIgOiBcInRleHQtc2xhdGUtOTAwXCJcclxuICAgICAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgICAgICAgIG9uTW91c2VFbnRlcj17KCkgPT4gc2V0QWN0aXZlSW5kZXgoaWR4KX1cclxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB0b2dnbGVPcHRpb24ob3B0KX1cclxuICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgZmxleCBmbGV4LWNvbCBnYXAtMC41IHByLTJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcImJsb2NrIHRydW5jYXRlXCIsIHNlbCA/IFwiZm9udC1tZWRpdW1cIiA6IFwiZm9udC1ub3JtYWxcIil9PntvcHQudGV4dH08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXhzIHRleHQtc2xhdGUtNjAwIHRydW5jYXRlXCI+e29wdC5jYXJnb308L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICB9KX1cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICB7YmxvY2tpbmcgJiYgKFxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCB6LTcwMDAwIGJnLXdoaXRlLzcwIGJhY2tkcm9wLWJsdXItWzFweF0gZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV1cIj5cbiAgICAgICAgICAgICAgICA8U3Bpbm5lciBzaXplPVwiaC02IHctNlwiIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgIDwvRmxvYXRpbmdMaXN0PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgZmxleCBqdXN0aWZ5LWVuZFwiPlxyXG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS01MDAgdGVjaC1pbmZvXCI+e3N0YXR1c308L3NwYW4+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IENvbnRhY3RzQ29tYm9ib3g7XHJcbiIsICJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmZ1bmN0aW9uIFhNYXJrSWNvbih7XG4gIHRpdGxlLFxuICB0aXRsZUlkLFxuICAuLi5wcm9wc1xufSwgc3ZnUmVmKSB7XG4gIHJldHVybiAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChcInN2Z1wiLCBPYmplY3QuYXNzaWduKHtcbiAgICB4bWxuczogXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLFxuICAgIHZpZXdCb3g6IFwiMCAwIDIwIDIwXCIsXG4gICAgZmlsbDogXCJjdXJyZW50Q29sb3JcIixcbiAgICBcImFyaWEtaGlkZGVuXCI6IFwidHJ1ZVwiLFxuICAgIFwiZGF0YS1zbG90XCI6IFwiaWNvblwiLFxuICAgIHJlZjogc3ZnUmVmLFxuICAgIFwiYXJpYS1sYWJlbGxlZGJ5XCI6IHRpdGxlSWRcbiAgfSwgcHJvcHMpLCB0aXRsZSA/IC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KFwidGl0bGVcIiwge1xuICAgIGlkOiB0aXRsZUlkXG4gIH0sIHRpdGxlKSA6IG51bGwsIC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KFwicGF0aFwiLCB7XG4gICAgZDogXCJNNi4yOCA1LjIyYS43NS43NSAwIDAgMC0xLjA2IDEuMDZMOC45NCAxMGwtMy43MiAzLjcyYS43NS43NSAwIDEgMCAxLjA2IDEuMDZMMTAgMTEuMDZsMy43MiAzLjcyYS43NS43NSAwIDEgMCAxLjA2LTEuMDZMMTEuMDYgMTBsMy43Mi0zLjcyYS43NS43NSAwIDAgMC0xLjA2LTEuMDZMMTAgOC45NCA2LjI4IDUuMjJaXCJcbiAgfSkpO1xufVxuY29uc3QgRm9yd2FyZFJlZiA9IC8qI19fUFVSRV9fKi8gUmVhY3QuZm9yd2FyZFJlZihYTWFya0ljb24pO1xuZXhwb3J0IGRlZmF1bHQgRm9yd2FyZFJlZjsiLCAiXHVGRUZGaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgQ2xpZW50U2VhcmNoQ29tYm9ib3ggZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvdmlzaXRhcy9DbGllbnRTZWFyY2hDb21ib2JveC50c3hcIjtcclxuaW1wb3J0IENvbnRhY3RzQ29tYm9ib3ggZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvdmlzaXRhcy9Db250YWN0c0NvbWJvYm94LnRzeFwiO1xyXG5cclxuZXhwb3J0IHR5cGUgQ3JlYXRlU2VsZWN0ZWRDbGllbnQgPSB7XHJcbiAgdmFsdWU6IHN0cmluZztcclxuICB0ZXh0OiBzdHJpbmc7XHJcbiAgY2FyZ28/OiBzdHJpbmc7XHJcbiAgZW1wcmVzYT86IHN0cmluZztcclxufSB8IG51bGw7XHJcblxyXG5leHBvcnQgdHlwZSBDcmVhdGVTZWxlY3RlZENvbnRhY3QgPSB7XHJcbiAgdmFsdWU6IHN0cmluZztcclxuICB0ZXh0OiBzdHJpbmc7XHJcbiAgY2FyZ286IHN0cmluZztcclxuICBlbXByZXNhOiBzdHJpbmc7XHJcbn07XHJcblxyXG50eXBlIENyZWF0ZVN0ZXBDbGllbnRTZWxlY3Rpb25Qcm9wcyA9IHtcclxuICBzZWxlY3RlZENsaWVudDogQ3JlYXRlU2VsZWN0ZWRDbGllbnQ7XHJcbiAgc2VsZWN0ZWRDb250YWN0czogQ3JlYXRlU2VsZWN0ZWRDb250YWN0W107XHJcbiAgb25DbGllbnRTZWxlY3RlZDogKG5leHRDbGllbnQ6IENyZWF0ZVNlbGVjdGVkQ2xpZW50KSA9PiB2b2lkO1xyXG4gIG9uQ29udGFjdHNDaGFuZ2U6IChuZXh0Q29udGFjdHM6IENyZWF0ZVNlbGVjdGVkQ29udGFjdFtdKSA9PiB2b2lkO1xyXG4gIGNsaWVudExhYmVsOiBzdHJpbmc7XHJcbiAgY2xpZW50UGxhY2Vob2xkZXI6IHN0cmluZztcclxuICBzZWxlY3RlZENvbnRhY3RzQ291bnRUZXh0OiBzdHJpbmc7XHJcbn07XHJcblxyXG4vLyBSZW5kZXJzIHN0ZXAgMSB3aGVyZSB1c2VyIHNlbGVjdHMgdGhlIGFjY291bnQgYW5kIHJlbGF0ZWQgY29udGFjdHMuXHJcbmNvbnN0IENyZWF0ZVN0ZXBDbGllbnRTZWxlY3Rpb24gPSAoe1xyXG4gIHNlbGVjdGVkQ2xpZW50LFxyXG4gIHNlbGVjdGVkQ29udGFjdHMsXHJcbiAgb25DbGllbnRTZWxlY3RlZCxcclxuICBvbkNvbnRhY3RzQ2hhbmdlLFxyXG4gIGNsaWVudExhYmVsLFxyXG4gIGNsaWVudFBsYWNlaG9sZGVyLFxyXG4gIHNlbGVjdGVkQ29udGFjdHNDb3VudFRleHQsXHJcbn06IENyZWF0ZVN0ZXBDbGllbnRTZWxlY3Rpb25Qcm9wcykgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNlwiPlxyXG4gICAgICA8Q2xpZW50U2VhcmNoQ29tYm9ib3hcclxuICAgICAgICB2YWx1ZT17c2VsZWN0ZWRDbGllbnR9XHJcbiAgICAgICAgb25TZWxlY3RlZD17b25DbGllbnRTZWxlY3RlZH1cclxuICAgICAgICBsYWJlbD17Y2xpZW50TGFiZWx9XHJcbiAgICAgICAgcGxhY2Vob2xkZXI9e2NsaWVudFBsYWNlaG9sZGVyfVxyXG4gICAgICAgIHBvcnRhbENsYXNzTmFtZT1cInZpc2l0YXMtdHlwb2dyYXBoeVwiXHJcbiAgICAgIC8+XHJcblxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktM1wiPlxyXG4gICAgICAgIDxDb250YWN0c0NvbWJvYm94XHJcbiAgICAgICAgICBhY2NvdW50TnVtPXtzZWxlY3RlZENsaWVudD8udmFsdWV9XHJcbiAgICAgICAgICB2YWx1ZT17c2VsZWN0ZWRDb250YWN0c31cclxuICAgICAgICAgIG9uQ2hhbmdlPXtvbkNvbnRhY3RzQ2hhbmdlfVxyXG4gICAgICAgICAgcG9ydGFsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcclxuICAgICAgICAvPlxyXG4gICAgICAgIHtzZWxlY3RlZENvbnRhY3RzLmxlbmd0aCA+IDAgJiYgKFxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNjAwXCI+XHJcbiAgICAgICAgICAgIHtzZWxlY3RlZENvbnRhY3RzQ291bnRUZXh0fVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKX1cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ3JlYXRlU3RlcENsaWVudFNlbGVjdGlvbjtcclxuIiwgIlx1RkVGRmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFNpbmdsZURhdGVQaWNrZXIgZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9TaW5nbGVEYXRlUGlja2VyLnRzeFwiO1xyXG5pbXBvcnQgU2VsZWN0Q29tYm9ib3ggZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9TZWxlY3RDb21ib2JveC50c3hcIjtcclxuaW1wb3J0IFZpc2l0TmFycmF0aXZlRmllbGRzIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL3Zpc2l0YXMvVmlzaXROYXJyYXRpdmVGaWVsZHMudHN4XCI7XHJcblxyXG50eXBlIFNlbGVjdE9wdGlvbiA9IHtcclxuICB2YWx1ZT86IHN0cmluZyB8IG51bWJlcjtcclxuICBWYWx1ZT86IHN0cmluZyB8IG51bWJlcjtcclxuICB0ZXh0Pzogc3RyaW5nO1xyXG4gIFRleHQ/OiBzdHJpbmc7XHJcbn07XHJcblxyXG50eXBlIE5hcnJhdGl2ZVRhcEZpZWxkID0ge1xyXG4gIGlkOiBzdHJpbmc7XHJcbiAgbGFiZWw6IHN0cmluZztcclxuICB2YWx1ZTogc3RyaW5nO1xyXG4gIGNsYXNzTmFtZTogc3RyaW5nO1xyXG4gIHBvaW50ZXJCaW5kaW5nczoge1xyXG4gICAgb25Qb2ludGVyRG93bj86IFJlYWN0LlBvaW50ZXJFdmVudEhhbmRsZXI8SFRNTFRleHRBcmVhRWxlbWVudD47XHJcbiAgICBvblBvaW50ZXJNb3ZlPzogUmVhY3QuUG9pbnRlckV2ZW50SGFuZGxlcjxIVE1MVGV4dEFyZWFFbGVtZW50PjtcclxuICAgIG9uUG9pbnRlclVwPzogUmVhY3QuUG9pbnRlckV2ZW50SGFuZGxlcjxIVE1MVGV4dEFyZWFFbGVtZW50PjtcclxuICAgIG9uUG9pbnRlckNhbmNlbD86IFJlYWN0LlBvaW50ZXJFdmVudEhhbmRsZXI8SFRNTFRleHRBcmVhRWxlbWVudD47XHJcbiAgfTtcclxufTtcclxuXHJcbnR5cGUgQ3JlYXRlU3RlcFZpc2l0RGV0YWlsc1Byb3BzID0ge1xyXG4gIHRpdGxlOiBzdHJpbmc7XHJcbiAgZGF0ZUxhYmVsOiBzdHJpbmc7XHJcbiAgdHJhbnNEYXRlOiBzdHJpbmc7XHJcbiAgb25UcmFuc0RhdGVDaGFuZ2U6IChuZXh0VmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICB2aXNpdFR5cGVMYWJlbDogc3RyaW5nO1xyXG4gIHZpc2l0VHlwZXM6IFNlbGVjdE9wdGlvbltdO1xyXG4gIHZpc2l0VHlwZTogc3RyaW5nO1xyXG4gIG9uVmlzaXRUeXBlQ2hhbmdlOiAobmV4dFZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgdmlzaXRUeXBlUGxhY2Vob2xkZXI6IHN0cmluZztcclxuICB2aXNpdFR5cGVJbnZhbGlkOiBib29sZWFuO1xyXG4gIGRlc2NyaXB0aW9uTGFiZWw6IHN0cmluZztcclxuICBkZXNjcmlwdGlvblZhbHVlOiBzdHJpbmc7XHJcbiAgZGVzY3JpcHRpb25DbGFzc05hbWU6IHN0cmluZztcclxuICBvbkRlc2NyaXB0aW9uQ2hhbmdlOiAobmV4dFZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgdGFwRmllbGRzOiBOYXJyYXRpdmVUYXBGaWVsZFtdO1xyXG4gIHN0YXR1czogc3RyaW5nO1xyXG59O1xyXG5cclxuLy8gUmVuZGVycyBzdGVwIDIgd2l0aCB2aXNpdCBtZXRhZGF0YSBhbmQgbmFycmF0aXZlIGZpZWxkcy5cclxuY29uc3QgQ3JlYXRlU3RlcFZpc2l0RGV0YWlscyA9ICh7XHJcbiAgdGl0bGUsXHJcbiAgZGF0ZUxhYmVsLFxyXG4gIHRyYW5zRGF0ZSxcclxuICBvblRyYW5zRGF0ZUNoYW5nZSxcclxuICB2aXNpdFR5cGVMYWJlbCxcclxuICB2aXNpdFR5cGVzLFxyXG4gIHZpc2l0VHlwZSxcclxuICBvblZpc2l0VHlwZUNoYW5nZSxcclxuICB2aXNpdFR5cGVQbGFjZWhvbGRlcixcclxuICB2aXNpdFR5cGVJbnZhbGlkLFxyXG4gIGRlc2NyaXB0aW9uTGFiZWwsXHJcbiAgZGVzY3JpcHRpb25WYWx1ZSxcclxuICBkZXNjcmlwdGlvbkNsYXNzTmFtZSxcclxuICBvbkRlc2NyaXB0aW9uQ2hhbmdlLFxyXG4gIHRhcEZpZWxkcyxcclxuICBzdGF0dXMsXHJcbn06IENyZWF0ZVN0ZXBWaXNpdERldGFpbHNQcm9wcykgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNoYWRvdy14cyBnbGFzcy1wYW5lbCBwLTQgc3BhY2UteS00IGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtYmFzZSBmb250LXNlbWlib2xkIHRleHQtc2xhdGUtOTAwIGJvcmRlci1iIGJvcmRlci1zbGF0ZS0yMDAgcGItM1wiPlxyXG4gICAgICAgIHt0aXRsZX1cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMiBnYXAtNFwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidmlzaXRhLWZpZWxkLXRleHRcIj5cclxuICAgICAgICAgIDxTaW5nbGVEYXRlUGlja2VyIGxhYmVsPXtkYXRlTGFiZWx9IHZhbHVlPXt0cmFuc0RhdGV9IG9uQ2hhbmdlPXtvblRyYW5zRGF0ZUNoYW5nZX0gLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8U2VsZWN0Q29tYm9ib3hcclxuICAgICAgICAgIGxhYmVsPXt2aXNpdFR5cGVMYWJlbH1cclxuICAgICAgICAgIG9wdGlvbnM9e3Zpc2l0VHlwZXN9XHJcbiAgICAgICAgICB2YWx1ZT17dmlzaXRUeXBlfVxyXG4gICAgICAgICAgb25DaGFuZ2U9eyhuZXh0VmFsdWUpID0+IG9uVmlzaXRUeXBlQ2hhbmdlKFN0cmluZyhuZXh0VmFsdWUgPz8gXCJcIikpfVxyXG4gICAgICAgICAgcGxhY2Vob2xkZXI9e3Zpc2l0VHlwZVBsYWNlaG9sZGVyfVxyXG4gICAgICAgICAgaW52YWxpZD17dmlzaXRUeXBlSW52YWxpZH1cclxuICAgICAgICAgIGVtaXRPblZhbHVlQ2hhbmdlXHJcbiAgICAgICAgICBwb3J0YWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxyXG4gICAgICAgIC8+XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgPFZpc2l0TmFycmF0aXZlRmllbGRzXHJcbiAgICAgICAgZGVzY3JpcHRpb25MYWJlbD17ZGVzY3JpcHRpb25MYWJlbH1cclxuICAgICAgICBkZXNjcmlwdGlvblZhbHVlPXtkZXNjcmlwdGlvblZhbHVlfVxyXG4gICAgICAgIGRlc2NyaXB0aW9uQ2xhc3NOYW1lPXtkZXNjcmlwdGlvbkNsYXNzTmFtZX1cclxuICAgICAgICBvbkRlc2NyaXB0aW9uQ2hhbmdlPXtvbkRlc2NyaXB0aW9uQ2hhbmdlfVxyXG4gICAgICAgIHRhcEZpZWxkcz17dGFwRmllbGRzfVxyXG4gICAgICAvPlxyXG5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtM1wiPlxyXG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc20gdGV4dC1zbGF0ZS01MDBcIj57c3RhdHVzfTwvc3Bhbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ3JlYXRlU3RlcFZpc2l0RGV0YWlscztcclxuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IENyZWF0ZUZvcm0gZnJvbSBcIi4vQ3JlYXRlRm9ybS50c3hcIjtcclxuaW1wb3J0IFZpc2l0YXNQYWdlUHJvdmlkZXJzIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvVmlzaXRhc1BhZ2VQcm92aWRlcnMudHN4XCI7XHJcbmltcG9ydCB7IG1vdW50UmVhY3RJc2xhbmQsIG1vdW50V2hlbkRvY3VtZW50UmVhZHkgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvcmVhY3RJc2xhbmQudHN4XCI7XHJcblxyXG4vLyBQYWdlIGVudHJ5IGZvciB0aGUgdmlzaXRhcyBjcmVhdGUgaXNsYW5kLlxyXG5jb25zdCBDcmVhdGVQYWdlID0gKCkgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8VmlzaXRhc1BhZ2VQcm92aWRlcnM+XHJcbiAgICAgIDxDcmVhdGVGb3JtIC8+XHJcbiAgICA8L1Zpc2l0YXNQYWdlUHJvdmlkZXJzPlxyXG4gICk7XHJcbn07XHJcblxyXG5jb25zdCBtb3VudCA9ICgpID0+IHtcclxuICBjb25zdCByb290RWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpc2l0YXMtYXBwLXJvb3RcIik7XHJcbiAgaWYgKCFyb290RWwpIHJldHVybjtcclxuXHJcbiAgbW91bnRSZWFjdElzbGFuZChyb290RWwsIDxDcmVhdGVQYWdlIC8+KTtcclxufTtcclxuXHJcbm1vdW50V2hlbkRvY3VtZW50UmVhZHkobW91bnQpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ3JlYXRlUGFnZTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7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QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLE9BQU8sS0FBSyxpQ0FBaUMsZUFBZTtBQUFBLFFBQzVELFdBQVcsS0FBSyw0QkFBNEIsTUFBTTtBQUFBLFFBQ2xEO0FBQUEsUUFDQSxtQkFBbUI7QUFBQSxRQUNuQixnQkFBZ0IsS0FBSyxpQ0FBaUMsWUFBWTtBQUFBLFFBQ2xFO0FBQUEsUUFDQTtBQUFBLFFBQ0EsbUJBQW1CO0FBQUEsUUFDbkIsc0JBQXNCLEtBQUssdUNBQXVDLGFBQWE7QUFBQSxRQUMvRTtBQUFBLFFBQ0E7QUFBQSxRQUNBLGtCQUFrQjtBQUFBLFFBQ2xCLHNCQUFzQjtBQUFBLFFBQ3RCLHFCQUFxQjtBQUFBLFFBQ3JCLFdBQVc7QUFBQSxVQUNUO0FBQUEsWUFDRSxJQUFJO0FBQUEsWUFDSixPQUFPO0FBQUEsWUFDUCxPQUFPO0FBQUEsWUFDUCxXQUFXO0FBQUEsWUFDWCxpQkFBaUI7QUFBQSxVQUNuQjtBQUFBLFVBQ0E7QUFBQSxZQUNFLElBQUk7QUFBQSxZQUNKLE9BQU87QUFBQSxZQUNQLE9BQU87QUFBQSxZQUNQLFdBQVc7QUFBQSxZQUNYLGlCQUFpQjtBQUFBLFVBQ25CO0FBQUEsVUFDQTtBQUFBLFlBQ0UsSUFBSTtBQUFBLFlBQ0osT0FBTztBQUFBLFlBQ1AsT0FBTztBQUFBLFlBQ1AsV0FBVztBQUFBLFlBQ1gsaUJBQWlCO0FBQUEsVUFDbkI7QUFBQSxRQUNGO0FBQUEsUUFDQTtBQUFBO0FBQUEsSUFDRjtBQUFBLEtBRUo7QUFFSjtBQUdlLFNBQVIsYUFBOEI7QUFDbkMsU0FDRSw2Q0FBQyw0QkFBaUIsaUJBQWlCLEtBQUssK0JBQStCLDBFQUEwRSxHQUMvSSx1REFBQyxjQUFXLEdBQ2Q7QUFFSjs7O0FVM1hNLElBQUFDLHNCQUFBO0FBSE4sSUFBTSxhQUFhLE1BQU07QUFDdkIsU0FDRSw2Q0FBQyxnQ0FDQyx1REFBQyxjQUFXLEdBQ2Q7QUFFSjtBQUVBLElBQU0sUUFBUSxNQUFNO0FBQ2xCLFFBQU0sU0FBUyxTQUFTLGVBQWUsa0JBQWtCO0FBQ3pELE1BQUksQ0FBQyxPQUFRO0FBRWIsbUJBQWlCLFFBQVEsNkNBQUMsY0FBVyxDQUFFO0FBQ3pDO0FBRUEsdUJBQXVCLEtBQUs7QUFFNUIsSUFBTyxxQkFBUTsiLAogICJuYW1lcyI6IFsiaW1wb3J0X3JlYWN0IiwgImNhbkFjY2VzcyIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJ2YWx1ZSIsICJSZWFjdCIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJSZWFjdCIsICJpbXBvcnRfanN4X3J1bnRpbWUiXQp9Cg==
