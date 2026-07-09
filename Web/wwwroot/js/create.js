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
} from "./chunks/chunk-GOLFPEUC.js";
import {
  SingleDatePicker
} from "./chunks/chunk-YG5LBP53.js";
import "./chunks/chunk-6FM7OI23.js";
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
} from "./chunks/chunk-A6URYQYK.js";
import {
  handleComboboxKeyDown
} from "./chunks/chunk-YMDESVRK.js";
import {
  ChevronDownSvg,
  ChevronUpSvg,
  FloatingList_default,
  SelectCombobox_default,
  useOutsideClick
} from "./chunks/chunk-SSILOGLX.js";
import {
  wait
} from "./chunks/chunk-4BE3ZFCK.js";
import {
  ConfirmModal,
  useConfirmDialog
} from "./chunks/chunk-SMHFZFDC.js";
import {
  flashActionMark,
  setHistoryFilterForDate
} from "./chunks/chunk-CBDB7NMA.js";
import {
  VisitasPageProviders_default
} from "./chunks/chunk-4B23OARV.js";
import "./chunks/chunk-UYN2TXUI.js";
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
  setContactMethod,
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
      if (draft?.contactMethod !== void 0) setContactMethod(draft.contactMethod);
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
    setContactMethod,
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
var isRecord = (value) => {
  return typeof value === "object" && value !== null && !Array.isArray(value);
};
var readStringLike = (value) => {
  if (typeof value === "string" || typeof value === "number") return String(value).trim();
  return "";
};
var readFirstStringLikeProperty = (value, keys) => {
  if (!isRecord(value)) return { value: "", source: "" };
  for (const key of keys) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      const candidate = readStringLike(value[key]);
      if (candidate) return { value: candidate, source: key };
    }
  }
  return { value: "", source: "" };
};
var extractCreateActivityRecIdFromData = (data) => {
  if (typeof data === "string" || typeof data === "number") return indExtractSignedId(data);
  const candidate = readFirstStringLikeProperty(data, [
    "RecId",
    "recId",
    "RefRecId",
    "refRecId",
    "RefRecIdActividad",
    "refRecIdActividad",
    "ActividadRecId",
    "actividadRecId"
  ]);
  return candidate.value ? indExtractSignedId(candidate.value) : "";
};
var resolveCreateActivityRecId = (response) => {
  const data = getLegacyResponseData(response);
  return extractCreateActivityRecIdFromData(data) || indExtractSignedId(getLegacyResponseMessage(response)) || indExtractSignedId(indExtractId(data) || indExtractId(getLegacyResponseMessage(response)));
};
var resolveCreateActivityOwnerForDiagnostics = (data) => {
  return readFirstStringLikeProperty(data, [
    "OwnerAxUserId",
    "ownerAxUserId",
    "INDCreatedByUserId",
    "indCreatedByUserId",
    "CreatedByUserId",
    "createdByUserId",
    "UserId",
    "userId"
  ]);
};
var logCreateActivityDiagnostics = (response, recId) => {
  const debugFlag = typeof globalThis !== "undefined" && (globalThis.__IND_DEBUG_CREATE__ === true || globalThis.__IND_DEBUG_VISITAS__ === true);
  if (!debugFlag) return;
  const owner = resolveCreateActivityOwnerForDiagnostics(getLegacyResponseData(response));
  console.debug("[VisitsCreate]", "activity:create-response", {
    recId,
    ownerAxUserId: owner.value,
    ownerSource: owner.source
  });
};
var toNullableEnumNumber = (value) => {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed >= 0 ? parsed : null;
};
var useCreateSubmit = ({
  busy,
  modalOpen,
  canCreateVisit,
  canRollbackDelete,
  selectedClient,
  selectedContacts,
  visitType,
  contactMethod,
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
        visitType: toNullableEnumNumber(visitType),
        contactMethod: toNullableEnumNumber(contactMethod || "0"),
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
      const recIdActividad = resolveCreateActivityRecId(resAct);
      if (!recIdActividad) throw new Error(indT("Visits_Create_CreateActivityFailed", "Failed to create activity."));
      logCreateActivityDiagnostics(resAct, String(recIdActividad));
      createdRecId = String(recIdActividad);
      if (selectedContacts.length > 0) {
        const assistantBatchSize = 4;
        const createAssistant = async (contact) => {
          const payloadVisita = {
            refRecIdActividad: recIdActividad,
            asistenteTipo: toNullableEnumNumber(defaultAsistenteTipo || "0"),
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
    contactMethod,
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
  contactMethodLabel,
  contactMethods,
  contactMethod,
  onContactMethodChange,
  contactMethodPlaceholder,
  descriptionLabel,
  descriptionValue,
  descriptionClassName,
  onDescriptionChange,
  tapFields,
  status
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "shadow-xs glass-panel p-4 space-y-4 border border-slate-200 rounded-[var(--radius-xl)]", children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "text-base font-semibold text-slate-900 border-b border-slate-200 pb-3", children: title }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
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
          portalClassName: "visitas-typography"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        SelectCombobox_default,
        {
          label: contactMethodLabel,
          options: contactMethods,
          value: contactMethod,
          onChange: (nextValue) => onContactMethodChange(String(nextValue ?? "")),
          placeholder: contactMethodPlaceholder,
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
  const { visitTypes, contactMethods, asistenteTipos } = useVisitas();
  const canCreateVisit = canAccess("VISITAS_GESTION", "Add");
  const canRollbackDelete = canAccess("VISITAS_GESTION", "FullAccess");
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
  const defaultContactMethod = String(contactMethods[0]?.value ?? contactMethods[0]?.Value ?? "0");
  const defaultAsistenteTipo = String(asistenteTipos[0]?.value ?? asistenteTipos[0]?.Value ?? "0");
  const [visitType, setVisitType] = (0, import_react5.useState)(defaultVisitType);
  const [contactMethod, setContactMethod] = (0, import_react5.useState)(defaultContactMethod);
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
      contactMethod,
      transDate,
      description,
      comentarios,
      antecedentes,
      conclusiones,
      step
    }),
    [selectedClient, selectedContacts, visitType, contactMethod, transDate, description, comentarios, antecedentes, conclusiones, step]
  );
  const { persistDraftNow } = useCreateDraft({
    draftSnapshot,
    setSelectedClient,
    setSelectedContacts,
    setVisitType,
    setContactMethod,
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
      setContactMethod(defaultContactMethod);
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
    return description.trim().length > 0 || contactMethod !== defaultContactMethod || comentarios.trim().length > 0 || antecedentes.trim().length > 0 || conclusiones.trim().length > 0;
  }, [antecedentes, busy, comentarios, conclusiones, contactMethod, defaultContactMethod, description, selectedClient, selectedContacts.length, step]);
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
    contactMethod,
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
        contactMethodLabel: indT("Visits_Detail_ContactMethod_Label", "Contact channel"),
        contactMethods,
        contactMethod,
        onContactMethodChange: setContactMethod,
        contactMethodPlaceholder: indT("Visits_Detail_ContactMethod_Placeholder", "Select method"),
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvY3JlYWNpb24vQ3JlYXRlRm9ybS50c3giLCAiLi4vcmVhY3Qvc3JjL2hvb2tzL3VzZVRvcGJhci50cyIsICIuLi9yZWFjdC9zcmMvaG9va3MvdXNlQ3JlYXRlRHJhZnQudHMiLCAiLi4vcmVhY3Qvc3JjL3V0aWxzL2dsb2JhbFNwaW5uZXIudHMiLCAiLi4vcmVhY3Qvc3JjL2hvb2tzL3VzZUNyZWF0ZVN1Ym1pdC50cyIsICIuLi9yZWFjdC9zcmMvdXRpbHMvaW5kSWRzLnRzIiwgIi4uL3JlYWN0L3NyYy9jb21wb25lbnRzL3Zpc2l0YXMvQ29udGFjdHNDb21ib2JveC50c3giLCAiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BoZXJvaWNvbnMvcmVhY3QvMjAvc29saWQvZXNtL1hNYXJrSWNvbi5qcyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9jcmVhY2lvbi9DcmVhdGVTdGVwQ2xpZW50U2VsZWN0aW9uLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9jcmVhY2lvbi9DcmVhdGVTdGVwVmlzaXREZXRhaWxzLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9jcmVhY2lvbi9DcmVhdGVQYWdlLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiXHVGRUZGaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlU3RhdGUsIHVzZVJlZiB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgQ29uZmlybU1vZGFsIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvQ29uZmlybU1vZGFsLnRzeFwiO1xyXG5pbXBvcnQgQXBwRXJyb3JCb3VuZGFyeSBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0FwcEVycm9yQm91bmRhcnkudHN4XCI7XHJcbmltcG9ydCB7IHVzZVZpc2l0YXMgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlVmlzaXRhcy50c1wiO1xyXG5pbXBvcnQgeyB1c2VUYXBHdWFyZCB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VUYXBHdWFyZC50c1wiO1xyXG5pbXBvcnQgeyB1c2VUb3BiYXIgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlVG9wYmFyLnRzXCI7XHJcbmltcG9ydCB7IHVzZUNvbmZpcm1EaWFsb2cgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlQ29uZmlybURpYWxvZy50c1wiO1xyXG5pbXBvcnQgeyB1c2VDcmVhdGVEcmFmdCB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VDcmVhdGVEcmFmdC50c1wiO1xyXG5pbXBvcnQgeyB1c2VDcmVhdGVTdWJtaXQgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlQ3JlYXRlU3VibWl0LnRzXCI7XHJcbmltcG9ydCB7IHVzZVRleHRFZGl0b3JGaWVsZHMgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlVGV4dEVkaXRvckZpZWxkcy50c1wiO1xyXG5pbXBvcnQgQ3JlYXRlU3RlcENsaWVudFNlbGVjdGlvbiwgeyBDcmVhdGVTZWxlY3RlZENsaWVudCwgQ3JlYXRlU2VsZWN0ZWRDb250YWN0IH0gZnJvbSBcIi4vQ3JlYXRlU3RlcENsaWVudFNlbGVjdGlvbi50c3hcIjtcclxuaW1wb3J0IENyZWF0ZVN0ZXBWaXNpdERldGFpbHMgZnJvbSBcIi4vQ3JlYXRlU3RlcFZpc2l0RGV0YWlscy50c3hcIjtcclxuaW1wb3J0IHsgY2xhc3NOYW1lcyB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9jbGFzc05hbWVzLnRzXCI7XHJcbmltcG9ydCB7IGluZEZvcm1hdCwgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB7IGNhbkFjY2Vzcywgc2hvd1Blcm1pc3Npb25Nb2RhbCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9wZXJtaXNzaW9ucy50c1wiO1xyXG5pbXBvcnQgeyBzZXRQcmV2aWV3QW5jaG9yLCBzaG93UHJldmlld1Rvb2x0aXAsIGlzT3ZlcmZsb3dpbmcgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvcHJldmlld1Rvb2x0aXAudHNcIjtcclxuaW1wb3J0IHsgbmF2aWdhdGVUb1RleHRFZGl0b3JGaWVsZCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy90ZXh0RWRpdG9yTmF2aWdhdGlvbi50c1wiO1xyXG5pbXBvcnQgeyBmbGFzaEFjdGlvbk1hcmsgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvdmlzaXRhc0hpc3RvcnkudHNcIjtcclxuXHJcbmZ1bmN0aW9uIFZpc2l0YXNBcHAoKSB7XHJcbiAgY29uc3QgeyB2aXNpdFR5cGVzLCBjb250YWN0TWV0aG9kcywgYXNpc3RlbnRlVGlwb3MgfSA9IHVzZVZpc2l0YXMoKTtcclxuICBjb25zdCBjYW5DcmVhdGVWaXNpdCA9IGNhbkFjY2VzcyhcIlZJU0lUQVNfR0VTVElPTlwiLCBcIkFkZFwiKTtcclxuICBjb25zdCBjYW5Sb2xsYmFja0RlbGV0ZSA9IGNhbkFjY2VzcyhcIlZJU0lUQVNfR0VTVElPTlwiLCBcIkZ1bGxBY2Nlc3NcIik7XHJcblxyXG4gIGNvbnN0IGZpZWxkSWRDb21lbnRhcmlvcyA9IFwiVmlzaXRhLkNyZWF0ZS5Db21lbnRhcmlvc1wiO1xyXG4gIGNvbnN0IGZpZWxkSWRBbnRlY2VkZW50ZXMgPSBcIlZpc2l0YS5DcmVhdGUuQW50ZWNlZGVudGVzXCI7XHJcbiAgY29uc3QgZmllbGRJZENvbmNsdXNpb25lcyA9IFwiVmlzaXRhLkNyZWF0ZS5Db25jbHVzaW9uZXNcIjtcclxuXHJcbiAgY29uc3QgW3N0ZXAsIHNldFN0ZXBdID0gdXNlU3RhdGUoMSk7XHJcbiAgY29uc3QgW3NlbGVjdGVkQ2xpZW50LCBzZXRTZWxlY3RlZENsaWVudF0gPSB1c2VTdGF0ZTxDcmVhdGVTZWxlY3RlZENsaWVudD4obnVsbCk7XHJcbiAgY29uc3QgW3NlbGVjdGVkQ29udGFjdHMsIHNldFNlbGVjdGVkQ29udGFjdHNdID0gdXNlU3RhdGU8Q3JlYXRlU2VsZWN0ZWRDb250YWN0W10+KFtdKTtcclxuICBjb25zdCB0b2RheVN0cmluZyA9ICgpID0+IHtcclxuICAgIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKTtcclxuICAgIGNvbnN0IHl5eXkgPSB0b2RheS5nZXRGdWxsWWVhcigpO1xyXG4gICAgY29uc3QgbW0gPSBTdHJpbmcodG9kYXkuZ2V0TW9udGgoKSArIDEpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcclxuICAgIGNvbnN0IGRkID0gU3RyaW5nKHRvZGF5LmdldERhdGUoKSkucGFkU3RhcnQoMiwgXCIwXCIpO1xyXG4gICAgcmV0dXJuIGAke3l5eXl9LSR7bW19LSR7ZGR9YDtcclxuICB9O1xyXG5cclxuICBjb25zdCBkZWZhdWx0VmlzaXRUeXBlID0gU3RyaW5nKHZpc2l0VHlwZXNbMF0/LnZhbHVlID8/IHZpc2l0VHlwZXNbMF0/LlZhbHVlID8/IFwiXCIpO1xyXG4gIGNvbnN0IGRlZmF1bHRDb250YWN0TWV0aG9kID0gU3RyaW5nKGNvbnRhY3RNZXRob2RzWzBdPy52YWx1ZSA/PyBjb250YWN0TWV0aG9kc1swXT8uVmFsdWUgPz8gXCIwXCIpO1xyXG4gIGNvbnN0IGRlZmF1bHRBc2lzdGVudGVUaXBvID0gU3RyaW5nKGFzaXN0ZW50ZVRpcG9zWzBdPy52YWx1ZSA/PyBhc2lzdGVudGVUaXBvc1swXT8uVmFsdWUgPz8gXCIwXCIpO1xyXG5cclxuICBjb25zdCBbdmlzaXRUeXBlLCBzZXRWaXNpdFR5cGVdID0gdXNlU3RhdGU8c3RyaW5nPihkZWZhdWx0VmlzaXRUeXBlKTtcclxuICBjb25zdCBbY29udGFjdE1ldGhvZCwgc2V0Q29udGFjdE1ldGhvZF0gPSB1c2VTdGF0ZTxzdHJpbmc+KGRlZmF1bHRDb250YWN0TWV0aG9kKTtcclxuICBjb25zdCBbdHJhbnNEYXRlLCBzZXRUcmFuc0RhdGVdID0gdXNlU3RhdGUoKCkgPT4gdG9kYXlTdHJpbmcoKSk7XHJcbiAgY29uc3QgW2Rlc2NyaXB0aW9uLCBzZXREZXNjcmlwdGlvbl0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbY29tZW50YXJpb3MsIHNldENvbWVudGFyaW9zXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFthbnRlY2VkZW50ZXMsIHNldEFudGVjZWRlbnRlc10gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbY29uY2x1c2lvbmVzLCBzZXRDb25jbHVzaW9uZXNdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW3N0YXR1cywgc2V0U3RhdHVzXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtidXN5LCBzZXRCdXN5XSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbc2hvd1JlcXVpcmVkLCBzZXRTaG93UmVxdWlyZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFttb2RhbEVycm9yLCBzZXRNb2RhbEVycm9yXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG5cclxuICBjb25zdCB7IG1vZGFsLCBvcGVuQ29uZmlybSwgY2xvc2VDb25maXJtLCBoYW5kbGVDb25maXJtIH0gPSB1c2VDb25maXJtRGlhbG9nKHtcclxuICAgIGRlZmF1bHRDb25maXJtVGV4dDogaW5kVChcIkNvbmZpcm1fWWVzXCIsIFwiQ29uZmlybV9ZZXNcIiksXHJcbiAgICBkZWZhdWx0Q2FuY2VsVGV4dDogaW5kVChcIkNvbmZpcm1fTm9cIiwgXCJDb25maXJtX05vXCIpXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZU1vZGFsQ29uZmlybSA9IFJlYWN0LnVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcclxuICAgIHNldE1vZGFsRXJyb3IoXCJcIik7XHJcbiAgICBhd2FpdCBoYW5kbGVDb25maXJtKHtcclxuICAgICAgYnVzeSxcclxuICAgICAgb25FcnJvcjogKG1zZykgPT4ge1xyXG4gICAgICAgIHNldE1vZGFsRXJyb3IobXNnKTtcclxuICAgICAgICBzZXRTdGF0dXMobXNnKTtcclxuICAgICAgICBmbGFzaEFjdGlvbk1hcmsoXCJlcnJvclByb2Nlc3NcIiwgMTUwMCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0sIFtidXN5LCBoYW5kbGVDb25maXJtXSk7XHJcblxyXG4gIGNvbnN0IG1vZGFsTG9hZGluZ1RleHQgPSBpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJDb21tb25fTG9hZGluZ1wiKTtcclxuICBjb25zdCBtb2RhbENhbmNlbFRleHQgPSBtb2RhbC5jYW5jZWxUZXh0IHx8IGluZFQoXCJDb25maXJtX05vXCIsIFwiQ29uZmlybV9Ob1wiKTtcclxuICBjb25zdCBtb2RhbENvbmZpcm1UZXh0ID0gYnVzeVxyXG4gICAgPyBtb2RhbExvYWRpbmdUZXh0XHJcbiAgICA6ICghYnVzeSAmJiBtb2RhbEVycm9yID8gaW5kVChcIkNvbW1vbl9PS1wiLCBcIkNvbW1vbl9PS1wiKSA6IChtb2RhbC5jb25maXJtVGV4dCB8fCBpbmRUKFwiQ29uZmlybV9ZZXNcIiwgXCJDb25maXJtX1llc1wiKSkpO1xyXG5cclxuICBjb25zdCBoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm0gPSBSZWFjdC51c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAoIWJ1c3kgJiYgbW9kYWxFcnJvcikge1xyXG4gICAgICBjbG9zZUNvbmZpcm0oKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaGFuZGxlTW9kYWxDb25maXJtKCk7XHJcbiAgfSwgW2J1c3ksIG1vZGFsRXJyb3IsIGNsb3NlQ29uZmlybSwgaGFuZGxlTW9kYWxDb25maXJtXSk7XHJcblxyXG4gIGNvbnN0IGRyYWZ0U25hcHNob3QgPSB1c2VNZW1vKFxyXG4gICAgKCkgPT4gKHtcclxuICAgICAgc2VsZWN0ZWRDbGllbnQsXHJcbiAgICAgIHNlbGVjdGVkQ29udGFjdHMsXHJcbiAgICAgIHZpc2l0VHlwZSxcclxuICAgICAgY29udGFjdE1ldGhvZCxcclxuICAgICAgdHJhbnNEYXRlLFxyXG4gICAgICBkZXNjcmlwdGlvbixcclxuICAgICAgY29tZW50YXJpb3MsXHJcbiAgICAgIGFudGVjZWRlbnRlcyxcclxuICAgICAgY29uY2x1c2lvbmVzLFxyXG4gICAgICBzdGVwLFxyXG4gICAgfSksXHJcbiAgICBbc2VsZWN0ZWRDbGllbnQsIHNlbGVjdGVkQ29udGFjdHMsIHZpc2l0VHlwZSwgY29udGFjdE1ldGhvZCwgdHJhbnNEYXRlLCBkZXNjcmlwdGlvbiwgY29tZW50YXJpb3MsIGFudGVjZWRlbnRlcywgY29uY2x1c2lvbmVzLCBzdGVwXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IHsgcGVyc2lzdERyYWZ0Tm93IH0gPSB1c2VDcmVhdGVEcmFmdCh7XHJcbiAgICBkcmFmdFNuYXBzaG90LFxyXG4gICAgc2V0U2VsZWN0ZWRDbGllbnQsXHJcbiAgICBzZXRTZWxlY3RlZENvbnRhY3RzLFxyXG4gICAgc2V0VmlzaXRUeXBlLFxyXG4gICAgc2V0Q29udGFjdE1ldGhvZCxcclxuICAgIHNldFRyYW5zRGF0ZSxcclxuICAgIHNldERlc2NyaXB0aW9uLFxyXG4gICAgc2V0Q29tZW50YXJpb3MsXHJcbiAgICBzZXRBbnRlY2VkZW50ZXMsXHJcbiAgICBzZXRDb25jbHVzaW9uZXMsXHJcbiAgICBzZXRTdGVwLFxyXG4gIH0pO1xyXG5cclxuICAvLyBPcGVucyB0aGUgZnVsbC1zY3JlZW4gdGV4dCBlZGl0b3IgZm9yIGEgbXVsdGlsaW5lIGZpZWxkLlxyXG4gIGNvbnN0IG9wZW5UZXh0RWRpdG9yID0gUmVhY3QudXNlQ2FsbGJhY2soXHJcbiAgICAoZmllbGRJZDogc3RyaW5nLCBmaWVsZExhYmVsOiBzdHJpbmcsIGZpZWxkVmFsdWU6IHN0cmluZywgb3B0aW9uczogeyBhbGxvd0VkaXQ/OiBib29sZWFuIH0gPSB7fSkgPT4ge1xyXG4gICAgICBuYXZpZ2F0ZVRvVGV4dEVkaXRvckZpZWxkKHtcclxuICAgICAgICBmaWVsZElkLFxyXG4gICAgICAgIGZpZWxkTGFiZWwsXHJcbiAgICAgICAgZmllbGRWYWx1ZSxcclxuICAgICAgICBhbGxvd0VkaXQ6IG9wdGlvbnM/LmFsbG93RWRpdCAhPT0gZmFsc2UsXHJcbiAgICAgICAgYmVmb3JlTmF2aWdhdGU6IHBlcnNpc3REcmFmdE5vdyxcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgW3BlcnNpc3REcmFmdE5vd11cclxuICApO1xyXG5cclxuICBjb25zdCBoYW5kbGVDb21lbnRhcmlvc1RhcCA9IFJlYWN0LnVzZUNhbGxiYWNrKChldmVudCkgPT4ge1xyXG4gICAgaWYgKGJ1c3kpIHJldHVybjtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBvcGVuVGV4dEVkaXRvcihmaWVsZElkQ29tZW50YXJpb3MsIGluZFQoXCJWaXNpdHNfRmllbGRfQ29tbWVudHNcIiwgXCJDb21tZW50c1wiKSwgY29tZW50YXJpb3MpO1xyXG4gIH0sIFtidXN5LCBjb21lbnRhcmlvcywgb3BlblRleHRFZGl0b3JdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQ29tZW50YXJpb3NIb2xkID0gUmVhY3QudXNlQ2FsbGJhY2soKHRhcmdldCwgY2xpZW50WSkgPT4ge1xyXG4gICAgaWYgKCF0YXJnZXQgfHwgIWlzT3ZlcmZsb3dpbmcodGFyZ2V0KSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgc2V0UHJldmlld0FuY2hvcih0YXJnZXQpO1xyXG4gICAgcmV0dXJuIHNob3dQcmV2aWV3VG9vbHRpcChTdHJpbmcoY29tZW50YXJpb3MgfHwgXCJcIiksIGNsaWVudFkpO1xyXG4gIH0sIFtjb21lbnRhcmlvc10pO1xyXG5cclxuICBjb25zdCBoYW5kbGVBbnRlY2VkZW50ZXNUYXAgPSBSZWFjdC51c2VDYWxsYmFjaygoZXZlbnQpID0+IHtcclxuICAgIGlmIChidXN5KSByZXR1cm47XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgb3BlblRleHRFZGl0b3IoZmllbGRJZEFudGVjZWRlbnRlcywgaW5kVChcIlZpc2l0c19GaWVsZF9CYWNrZ3JvdW5kXCIsIFwiQmFja2dyb3VuZFwiKSwgYW50ZWNlZGVudGVzKTtcclxuICB9LCBbYnVzeSwgYW50ZWNlZGVudGVzLCBvcGVuVGV4dEVkaXRvcl0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVBbnRlY2VkZW50ZXNIb2xkID0gUmVhY3QudXNlQ2FsbGJhY2soKHRhcmdldCwgY2xpZW50WSkgPT4ge1xyXG4gICAgaWYgKCF0YXJnZXQgfHwgIWlzT3ZlcmZsb3dpbmcodGFyZ2V0KSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgc2V0UHJldmlld0FuY2hvcih0YXJnZXQpO1xyXG4gICAgcmV0dXJuIHNob3dQcmV2aWV3VG9vbHRpcChTdHJpbmcoYW50ZWNlZGVudGVzIHx8IFwiXCIpLCBjbGllbnRZKTtcclxuICB9LCBbYW50ZWNlZGVudGVzXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUNvbmNsdXNpb25lc1RhcCA9IFJlYWN0LnVzZUNhbGxiYWNrKChldmVudCkgPT4ge1xyXG4gICAgaWYgKGJ1c3kpIHJldHVybjtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBvcGVuVGV4dEVkaXRvcihmaWVsZElkQ29uY2x1c2lvbmVzLCBpbmRUKFwiVmlzaXRzX0ZpZWxkX0NvbmNsdXNpb25zXCIsIFwiQ29uY2x1c2lvbnNcIiksIGNvbmNsdXNpb25lcyk7XHJcbiAgfSwgW2J1c3ksIGNvbmNsdXNpb25lcywgb3BlblRleHRFZGl0b3JdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQ29uY2x1c2lvbmVzSG9sZCA9IFJlYWN0LnVzZUNhbGxiYWNrKCh0YXJnZXQsIGNsaWVudFkpID0+IHtcclxuICAgIGlmICghdGFyZ2V0IHx8ICFpc092ZXJmbG93aW5nKHRhcmdldCkpIHJldHVybiBmYWxzZTtcclxuICAgIHNldFByZXZpZXdBbmNob3IodGFyZ2V0KTtcclxuICAgIHJldHVybiBzaG93UHJldmlld1Rvb2x0aXAoU3RyaW5nKGNvbmNsdXNpb25lcyB8fCBcIlwiKSwgY2xpZW50WSk7XHJcbiAgfSwgW2NvbmNsdXNpb25lc10pO1xyXG5cclxuICBjb25zdCBjb21lbnRhcmlvc1RhcCA9IHVzZVRhcEd1YXJkKGhhbmRsZUNvbWVudGFyaW9zVGFwLCBoYW5kbGVDb21lbnRhcmlvc0hvbGQpO1xyXG4gIGNvbnN0IGFudGVjZWRlbnRlc1RhcCA9IHVzZVRhcEd1YXJkKGhhbmRsZUFudGVjZWRlbnRlc1RhcCwgaGFuZGxlQW50ZWNlZGVudGVzSG9sZCk7XHJcbiAgY29uc3QgY29uY2x1c2lvbmVzVGFwID0gdXNlVGFwR3VhcmQoaGFuZGxlQ29uY2x1c2lvbmVzVGFwLCBoYW5kbGVDb25jbHVzaW9uZXNIb2xkKTtcclxuXHJcbiAgY29uc3QgdGV4dEVkaXRvckJpbmRpbmdzID0gdXNlTWVtbyhcclxuICAgICgpID0+IFtcclxuICAgICAgeyBmaWVsZElkOiBmaWVsZElkQ29tZW50YXJpb3MsIGFwcGx5VmFsdWU6IHNldENvbWVudGFyaW9zIH0sXHJcbiAgICAgIHsgZmllbGRJZDogZmllbGRJZEFudGVjZWRlbnRlcywgYXBwbHlWYWx1ZTogc2V0QW50ZWNlZGVudGVzIH0sXHJcbiAgICAgIHsgZmllbGRJZDogZmllbGRJZENvbmNsdXNpb25lcywgYXBwbHlWYWx1ZTogc2V0Q29uY2x1c2lvbmVzIH0sXHJcbiAgICBdLFxyXG4gICAgW2ZpZWxkSWRBbnRlY2VkZW50ZXMsIGZpZWxkSWRDb21lbnRhcmlvcywgZmllbGRJZENvbmNsdXNpb25lc11cclxuICApO1xyXG5cclxuICB1c2VUZXh0RWRpdG9yRmllbGRzKHRleHRFZGl0b3JCaW5kaW5ncyk7XHJcblxyXG4gIC8vIENsZWFyIGNvbnRhY3RzIG9ubHkgd2hlbiB0aGUgY2xpZW50IGNoYW5nZXMgKGF2b2lkIGNsZWFyaW5nIG9uIHJlc3RvcmUvc3RlcCAyIHJldHVybikuXHJcbiAgY29uc3QgcHJldkNsaWVudFJlZiA9IHVzZVJlZihudWxsKTtcclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3QgY3VycmVudCA9IHNlbGVjdGVkQ2xpZW50Py52YWx1ZTtcclxuICAgIGlmIChwcmV2Q2xpZW50UmVmLmN1cnJlbnQgJiYgcHJldkNsaWVudFJlZi5jdXJyZW50ICE9PSBjdXJyZW50KSB7XHJcbiAgICAgIHNldFNlbGVjdGVkQ29udGFjdHMoW10pO1xyXG4gICAgfVxyXG4gICAgcHJldkNsaWVudFJlZi5jdXJyZW50ID0gY3VycmVudDtcclxuICB9LCBbc2VsZWN0ZWRDbGllbnQ/LnZhbHVlXSk7XHJcblxyXG4gIGNvbnN0IGxhc3RDbGllbnRSZWYgPSB1c2VSZWYobnVsbCk7XHJcblxyXG4gIC8vIElmIHRoZSBjbGllbnQgY2hhbmdlcyBhZnRlciBzZWxlY3RpbmcgY29udGFjdHMsIHJlc2V0IHRoZSBlbnRpcmUgZm9ybS5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3QgY3VycmVudCA9IHNlbGVjdGVkQ2xpZW50Py52YWx1ZTtcclxuICAgIGlmICghY3VycmVudCkgcmV0dXJuO1xyXG5cclxuICAgIGlmIChsYXN0Q2xpZW50UmVmLmN1cnJlbnQgJiYgbGFzdENsaWVudFJlZi5jdXJyZW50ICE9PSBjdXJyZW50KSB7XHJcbiAgICAgIHNldFN0ZXAoMSk7XHJcbiAgICAgIHNldFNlbGVjdGVkQ29udGFjdHMoW10pO1xyXG4gICAgICBzZXRWaXNpdFR5cGUoZGVmYXVsdFZpc2l0VHlwZSk7XHJcbiAgICAgIHNldENvbnRhY3RNZXRob2QoZGVmYXVsdENvbnRhY3RNZXRob2QpO1xyXG4gICAgICBzZXRUcmFuc0RhdGUodG9kYXlTdHJpbmcoKSk7XHJcbiAgICAgIHNldERlc2NyaXB0aW9uKFwiXCIpO1xyXG4gICAgICBzZXRDb21lbnRhcmlvcyhcIlwiKTtcclxuICAgICAgc2V0QW50ZWNlZGVudGVzKFwiXCIpO1xyXG4gICAgICBzZXRDb25jbHVzaW9uZXMoXCJcIik7XHJcbiAgICAgIHNldFN0YXR1cyhcIlwiKTtcclxuICAgICAgc2V0QnVzeShmYWxzZSk7XHJcbiAgICB9XHJcbiAgICBsYXN0Q2xpZW50UmVmLmN1cnJlbnQgPSBjdXJyZW50O1xyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlYWN0LWhvb2tzL2V4aGF1c3RpdmUtZGVwc1xyXG4gIH0sIFtzZWxlY3RlZENsaWVudD8udmFsdWVdKTtcclxuXHJcbiAgY29uc3QgY2FuR29OZXh0ID0gISFzZWxlY3RlZENsaWVudDtcclxuICBjb25zdCBjYW5DcmVhdGUgPVxyXG4gICAgISFzZWxlY3RlZENsaWVudCAmJlxyXG4gICAgU3RyaW5nKHZpc2l0VHlwZSB8fCBcIlwiKS50cmltKCkgIT09IFwiXCIgJiZcclxuICAgIFN0cmluZyh2aXNpdFR5cGUpICE9PSBcIjBcIiAmJlxyXG4gICAgZGVzY3JpcHRpb24udHJpbSgpLmxlbmd0aCA+IDAgJiZcclxuICAgIGNvbWVudGFyaW9zLnRyaW0oKS5sZW5ndGggPiAwO1xyXG5cclxuICBjb25zdCBoYXNBY3RpdmVQcm9jZXNzID0gdXNlTWVtbygoKSA9PiB7XHJcbiAgICBpZiAoYnVzeSkgcmV0dXJuIHRydWU7XHJcbiAgICBpZiAoc3RlcCA+IDEpIHJldHVybiB0cnVlO1xyXG4gICAgaWYgKHNlbGVjdGVkQ2xpZW50KSByZXR1cm4gdHJ1ZTtcclxuICAgIGlmIChzZWxlY3RlZENvbnRhY3RzLmxlbmd0aCA+IDApIHJldHVybiB0cnVlO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgZGVzY3JpcHRpb24udHJpbSgpLmxlbmd0aCA+IDAgfHxcclxuICAgICAgY29udGFjdE1ldGhvZCAhPT0gZGVmYXVsdENvbnRhY3RNZXRob2QgfHxcclxuICAgICAgY29tZW50YXJpb3MudHJpbSgpLmxlbmd0aCA+IDAgfHxcclxuICAgICAgYW50ZWNlZGVudGVzLnRyaW0oKS5sZW5ndGggPiAwIHx8XHJcbiAgICAgIGNvbmNsdXNpb25lcy50cmltKCkubGVuZ3RoID4gMFxyXG4gICAgKTtcclxuICB9LCBbYW50ZWNlZGVudGVzLCBidXN5LCBjb21lbnRhcmlvcywgY29uY2x1c2lvbmVzLCBjb250YWN0TWV0aG9kLCBkZWZhdWx0Q29udGFjdE1ldGhvZCwgZGVzY3JpcHRpb24sIHNlbGVjdGVkQ2xpZW50LCBzZWxlY3RlZENvbnRhY3RzLmxlbmd0aCwgc3RlcF0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgd2luZG93Ll9faW5kU2V0TmF2aWdhdGlvbkd1YXJkPy4oaGFzQWN0aXZlUHJvY2Vzcyk7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICB3aW5kb3cuX19pbmRDbGVhck5hdmlnYXRpb25HdWFyZD8uKCk7XHJcbiAgICB9O1xyXG4gIH0sIFtoYXNBY3RpdmVQcm9jZXNzXSk7XHJcblxyXG4gIGNvbnN0IHsgaGFuZGxlU3VibWl0IH0gPSB1c2VDcmVhdGVTdWJtaXQoe1xyXG4gICAgYnVzeSxcclxuICAgIG1vZGFsT3BlbjogbW9kYWwub3BlbixcclxuICAgIGNhbkNyZWF0ZVZpc2l0LFxyXG4gICAgY2FuUm9sbGJhY2tEZWxldGUsXHJcbiAgICBzZWxlY3RlZENsaWVudCxcclxuICAgIHNlbGVjdGVkQ29udGFjdHMsXHJcbiAgICB2aXNpdFR5cGUsXHJcbiAgICBjb250YWN0TWV0aG9kLFxyXG4gICAgZGVmYXVsdEFzaXN0ZW50ZVRpcG8sXHJcbiAgICBkZXNjcmlwdGlvbixcclxuICAgIHRyYW5zRGF0ZSxcclxuICAgIGNvbWVudGFyaW9zLFxyXG4gICAgYW50ZWNlZGVudGVzLFxyXG4gICAgY29uY2x1c2lvbmVzLFxyXG4gICAgc2V0QnVzeSxcclxuICAgIHNldFN0YXR1cyxcclxuICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICBzZXRTaG93UmVxdWlyZWQsXHJcbiAgICBvcGVuQ29uZmlybSxcclxuICAgIGNsb3NlQ29uZmlybSxcclxuICB9KTtcclxuXHJcbiAgY29uc3QgaGFuZGxlVG9wYmFyUHJpbWFyeSA9IFJlYWN0LnVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmICghY2FuQ3JlYXRlVmlzaXQpIHtcclxuICAgICAgc2hvd1Blcm1pc3Npb25Nb2RhbCgpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoc3RlcCA9PT0gMSAmJiBjYW5Hb05leHQpIHNldFN0ZXAoMik7XHJcbiAgICBpZiAoc3RlcCA9PT0gMikgaGFuZGxlU3VibWl0KCk7XHJcbiAgfSwgW2NhbkNyZWF0ZVZpc2l0LCBjYW5Hb05leHQsIGhhbmRsZVN1Ym1pdCwgc3RlcF0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVUb3BiYXJCYWNrID0gUmVhY3QudXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgc2V0U3RlcCgxKTtcclxuICB9LCBbXSk7XHJcblxyXG4gIHVzZVRvcGJhcihzdGVwLCBjYW5Hb05leHQsIGhhbmRsZVRvcGJhclByaW1hcnksIGhhbmRsZVRvcGJhckJhY2ssIGJ1c3ksIGNhbkNyZWF0ZSwgY2FuQ3JlYXRlVmlzaXQpO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKHN0ZXAgPT09IDEpIHtcclxuICAgICAgc2V0U2hvd1JlcXVpcmVkKGZhbHNlKTtcclxuICAgICAgY2xvc2VDb25maXJtKCk7XHJcbiAgICB9XHJcbiAgfSwgW3N0ZXAsIGNsb3NlQ29uZmlybV0pO1xyXG5cclxuICBjb25zdCB2aXNpdFR5cGVJbnZhbGlkID0gc2hvd1JlcXVpcmVkICYmIChTdHJpbmcodmlzaXRUeXBlIHx8IFwiXCIpID09PSBcIlwiIHx8IFN0cmluZyh2aXNpdFR5cGUpID09PSBcIjBcIik7XHJcbiAgY29uc3QgZGVzY3JpcHRpb25JbnZhbGlkID0gc2hvd1JlcXVpcmVkICYmIGRlc2NyaXB0aW9uLnRyaW0oKS5sZW5ndGggPT09IDA7XHJcbiAgY29uc3QgY29tZW50YXJpb3NJbnZhbGlkID0gc2hvd1JlcXVpcmVkICYmIGNvbWVudGFyaW9zLnRyaW0oKS5sZW5ndGggPT09IDA7XHJcbiAgY29uc3QgZGVzY3JpcHRpb25JbnB1dENsYXNzTmFtZSA9IGNsYXNzTmFtZXMoXHJcbiAgICBcImZvcm0tY29udHJvbFwiLFxyXG4gICAgZGVzY3JpcHRpb25JbnZhbGlkXHJcbiAgICAgID8gXCJib3JkZXItcm9zZS00MDAgYmctcm9zZS01MCBmb2N1czpyaW5nLXJvc2UtMjAwIGZvY3VzOmJvcmRlci1yb3NlLTQwMFwiXHJcbiAgICAgIDogXCJib3JkZXItc2xhdGUtMjAwIGZvY3VzOnJpbmctcHJpbWFyeSBmb2N1czpib3JkZXItcHJpbWFyeVwiXHJcbiAgKTtcclxuICBjb25zdCBjb21lbnRhcmlvc0NsYXNzTmFtZSA9IGNsYXNzTmFtZXMoXHJcbiAgICBcImZvcm0tY29udHJvbCBjdXJzb3ItcG9pbnRlclwiLFxyXG4gICAgY29tZW50YXJpb3NJbnZhbGlkXHJcbiAgICAgID8gXCJib3JkZXItcm9zZS00MDAgYmctcm9zZS01MCBmb2N1czpyaW5nLXJvc2UtMjAwIGZvY3VzOmJvcmRlci1yb3NlLTQwMFwiXHJcbiAgICAgIDogXCJib3JkZXItc2xhdGUtMjAwIGZvY3VzOnJpbmctcHJpbWFyeSBmb2N1czpib3JkZXItcHJpbWFyeVwiXHJcbiAgKTtcclxuICBjb25zdCBkZXNjcmlwdGlvbkxhYmVsID0gaW5kVChcIlZpc2l0c19GaWVsZF9EZXNjcmlwdGlvblwiLCBcIkRlc2NyaXB0aW9uXCIpO1xyXG4gIGNvbnN0IGNvbW1lbnRzTGFiZWwgPSBpbmRUKFwiVmlzaXRzX0ZpZWxkX0NvbW1lbnRzXCIsIFwiQ29tbWVudHNcIik7XHJcbiAgY29uc3QgYmFja2dyb3VuZExhYmVsID0gaW5kVChcIlZpc2l0c19GaWVsZF9CYWNrZ3JvdW5kXCIsIFwiQmFja2dyb3VuZFwiKTtcclxuICBjb25zdCBjb25jbHVzaW9uc0xhYmVsID0gaW5kVChcIlZpc2l0c19GaWVsZF9Db25jbHVzaW9uc1wiLCBcIkNvbmNsdXNpb25zXCIpO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTRcIj5cclxuICAgICAgPENvbmZpcm1Nb2RhbFxyXG4gICAgICAgIG9wZW49e21vZGFsLm9wZW59XHJcbiAgICAgICAgdGl0bGU9e21vZGFsLnRpdGxlfVxyXG4gICAgICAgIG1lc3NhZ2U9e21vZGFsLm1lc3NhZ2V9XHJcbiAgICAgICAgY29uZmlybVRleHQ9e21vZGFsQ29uZmlybVRleHR9XHJcbiAgICAgICAgY2FuY2VsVGV4dD17bW9kYWxDYW5jZWxUZXh0fVxyXG4gICAgICAgIGxvYWRpbmdUZXh0PXttb2RhbExvYWRpbmdUZXh0fVxyXG4gICAgICAgIHNob3dDYW5jZWw9e21vZGFsLnNob3dDYW5jZWx9XHJcbiAgICAgICAgc2hvd0NvbmZpcm09e21vZGFsLnNob3dDb25maXJtfVxyXG4gICAgICAgIGJ1c3k9e2J1c3l9XHJcbiAgICAgICAgZXJyb3I9e21vZGFsRXJyb3J9XHJcbiAgICAgICAgc3RhdHVzPXtzdGF0dXN9XHJcbiAgICAgICAgb25Db25maXJtPXtoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm19XHJcbiAgICAgICAgb25DYW5jZWw9e2Nsb3NlQ29uZmlybX1cclxuICAgICAgLz5cclxuICAgICAge3N0ZXAgPT09IDEgJiYgKFxyXG4gICAgICAgIDxDcmVhdGVTdGVwQ2xpZW50U2VsZWN0aW9uXHJcbiAgICAgICAgICBzZWxlY3RlZENsaWVudD17c2VsZWN0ZWRDbGllbnR9XHJcbiAgICAgICAgICBzZWxlY3RlZENvbnRhY3RzPXtzZWxlY3RlZENvbnRhY3RzfVxyXG4gICAgICAgICAgb25DbGllbnRTZWxlY3RlZD17c2V0U2VsZWN0ZWRDbGllbnR9XHJcbiAgICAgICAgICBvbkNvbnRhY3RzQ2hhbmdlPXtzZXRTZWxlY3RlZENvbnRhY3RzfVxyXG4gICAgICAgICAgY2xpZW50TGFiZWw9e2luZFQoXCJIaXN0b3J5X0ZpbHRlcl9DbGllbnRcIiwgXCJBY2NvdW50XCIpfVxyXG4gICAgICAgICAgY2xpZW50UGxhY2Vob2xkZXI9e2luZEZvcm1hdChcIlZpc2l0c19DcmVhdGVfQ2xpZW50UGxhY2Vob2xkZXJcIiwgXCJUeXBlIGF0IGxlYXN0IHswfSBjaGFyYWN0ZXJzLi4uXCIsIDQpfVxyXG4gICAgICAgICAgc2VsZWN0ZWRDb250YWN0c0NvdW50VGV4dD17aW5kRm9ybWF0KFxyXG4gICAgICAgICAgICBcIlZpc2l0c19DcmVhdGVfU2VsZWN0ZWRDb250YWN0c0NvdW50XCIsXHJcbiAgICAgICAgICAgIFwiezB9IHNlbGVjdGVkIGNvbnRhY3QocylcIixcclxuICAgICAgICAgICAgc2VsZWN0ZWRDb250YWN0cy5sZW5ndGhcclxuICAgICAgICAgICl9XHJcbiAgICAgICAgLz5cclxuICAgICAgKX1cclxuXHJcbiAgICAgIHtzdGVwID09PSAyICYmIChcclxuICAgICAgICA8Q3JlYXRlU3RlcFZpc2l0RGV0YWlsc1xyXG4gICAgICAgICAgdGl0bGU9e2luZFQoXCJWaXNpdHNfQ3JlYXRlX1Zpc2l0RGF0YV9UaXRsZVwiLCBcIlZpc2l0IGRldGFpbHNcIil9XHJcbiAgICAgICAgICBkYXRlTGFiZWw9e2luZFQoXCJWaXNpdHNfRGV0YWlsX0RhdGVfTGFiZWxcIiwgXCJEYXRlXCIpfVxyXG4gICAgICAgICAgdHJhbnNEYXRlPXt0cmFuc0RhdGV9XHJcbiAgICAgICAgICBvblRyYW5zRGF0ZUNoYW5nZT17c2V0VHJhbnNEYXRlfVxyXG4gICAgICAgICAgdmlzaXRUeXBlTGFiZWw9e2luZFQoXCJWaXNpdHNfRGV0YWlsX1Zpc2l0VHlwZV9MYWJlbFwiLCBcIlZpc2l0IHR5cGVcIil9XHJcbiAgICAgICAgICB2aXNpdFR5cGVzPXt2aXNpdFR5cGVzfVxyXG4gICAgICAgICAgdmlzaXRUeXBlPXt2aXNpdFR5cGV9XHJcbiAgICAgICAgICBvblZpc2l0VHlwZUNoYW5nZT17c2V0VmlzaXRUeXBlfVxyXG4gICAgICAgICAgdmlzaXRUeXBlUGxhY2Vob2xkZXI9e2luZFQoXCJWaXNpdHNfRGV0YWlsX1Zpc2l0VHlwZV9QbGFjZWhvbGRlclwiLCBcIlNlbGVjdCB0eXBlXCIpfVxyXG4gICAgICAgICAgdmlzaXRUeXBlSW52YWxpZD17dmlzaXRUeXBlSW52YWxpZH1cclxuICAgICAgICAgIGNvbnRhY3RNZXRob2RMYWJlbD17aW5kVChcIlZpc2l0c19EZXRhaWxfQ29udGFjdE1ldGhvZF9MYWJlbFwiLCBcIkNvbnRhY3QgY2hhbm5lbFwiKX1cclxuICAgICAgICAgIGNvbnRhY3RNZXRob2RzPXtjb250YWN0TWV0aG9kc31cclxuICAgICAgICAgIGNvbnRhY3RNZXRob2Q9e2NvbnRhY3RNZXRob2R9XHJcbiAgICAgICAgICBvbkNvbnRhY3RNZXRob2RDaGFuZ2U9e3NldENvbnRhY3RNZXRob2R9XHJcbiAgICAgICAgICBjb250YWN0TWV0aG9kUGxhY2Vob2xkZXI9e2luZFQoXCJWaXNpdHNfRGV0YWlsX0NvbnRhY3RNZXRob2RfUGxhY2Vob2xkZXJcIiwgXCJTZWxlY3QgbWV0aG9kXCIpfVxyXG4gICAgICAgICAgZGVzY3JpcHRpb25MYWJlbD17ZGVzY3JpcHRpb25MYWJlbH1cclxuICAgICAgICAgIGRlc2NyaXB0aW9uVmFsdWU9e2Rlc2NyaXB0aW9ufVxyXG4gICAgICAgICAgZGVzY3JpcHRpb25DbGFzc05hbWU9e2Rlc2NyaXB0aW9uSW5wdXRDbGFzc05hbWV9XHJcbiAgICAgICAgICBvbkRlc2NyaXB0aW9uQ2hhbmdlPXtzZXREZXNjcmlwdGlvbn1cclxuICAgICAgICAgIHRhcEZpZWxkcz17W1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgaWQ6IFwiY29tZW50YXJpb3NcIixcclxuICAgICAgICAgICAgICBsYWJlbDogY29tbWVudHNMYWJlbCxcclxuICAgICAgICAgICAgICB2YWx1ZTogY29tZW50YXJpb3MsXHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lOiBjb21lbnRhcmlvc0NsYXNzTmFtZSxcclxuICAgICAgICAgICAgICBwb2ludGVyQmluZGluZ3M6IGNvbWVudGFyaW9zVGFwLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgaWQ6IFwiYW50ZWNlZGVudGVzXCIsXHJcbiAgICAgICAgICAgICAgbGFiZWw6IGJhY2tncm91bmRMYWJlbCxcclxuICAgICAgICAgICAgICB2YWx1ZTogYW50ZWNlZGVudGVzLFxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJmb3JtLWNvbnRyb2wgY3Vyc29yLXBvaW50ZXJcIixcclxuICAgICAgICAgICAgICBwb2ludGVyQmluZGluZ3M6IGFudGVjZWRlbnRlc1RhcCxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIGlkOiBcImNvbmNsdXNpb25lc1wiLFxyXG4gICAgICAgICAgICAgIGxhYmVsOiBjb25jbHVzaW9uc0xhYmVsLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiBjb25jbHVzaW9uZXMsXHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcImZvcm0tY29udHJvbCBjdXJzb3ItcG9pbnRlclwiLFxyXG4gICAgICAgICAgICAgIHBvaW50ZXJCaW5kaW5nczogY29uY2x1c2lvbmVzVGFwLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgXX1cclxuICAgICAgICAgIHN0YXR1cz17c3RhdHVzfVxyXG4gICAgICAgIC8+XHJcbiAgICAgICl9XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59XHJcblxyXG4vLyBDcmVhdGUgZmxvdyBVSSB3cmFwcGVkIGJ5IHRoZSBlcnJvciBib3VuZGFyeS5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ3JlYXRlRm9ybSgpIHtcclxuICByZXR1cm4gKFxyXG4gICAgPEFwcEVycm9yQm91bmRhcnkgZmFsbGJhY2tNZXNzYWdlPXtpbmRUKFwiVmlzaXRzX0NyZWF0ZV9FcnJvckJvdW5kYXJ5XCIsIFwiQW4gZXJyb3Igb2NjdXJyZWQgd2hpbGUgcmVuZGVyaW5nIHRoZSB2aXNpdHMgcGFnZS4gUmVsb2FkIGFuZCB0cnkgYWdhaW4uXCIpfT5cclxuICAgICAgPFZpc2l0YXNBcHAgLz5cclxuICAgIDwvQXBwRXJyb3JCb3VuZGFyeT5cclxuICApO1xyXG59XHJcbiIsICJpbXBvcnQgeyB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi91dGlscy9pbmRJMThuLnRzXCI7XHJcblxyXG5leHBvcnQgY29uc3QgdXNlVG9wYmFyID0gKFxyXG4gIHN0ZXA6IG51bWJlcixcclxuICBjYW5Hb05leHQ6IGJvb2xlYW4sXHJcbiAgb25OZXh0OiAoKSA9PiB2b2lkLFxyXG4gIG9uUHJldjogKCkgPT4gdm9pZCxcclxuICBidXN5ID0gZmFsc2UsXHJcbiAgY2FuU3VibWl0U3RlcDIgPSB0cnVlLFxyXG4gIGNhbkFjY2VzcyA9IHRydWVcclxuKSA9PiB7XHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IGZvcndhcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdsb2JhbEZvcndhcmRCdG5cIikgYXMgSFRNTEJ1dHRvbkVsZW1lbnQgfCBudWxsO1xyXG4gICAgY29uc3QgYmFjayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2xvYmFsQmFja0J0blwiKSBhcyBIVE1MQnV0dG9uRWxlbWVudCB8IG51bGw7XHJcbiAgICBjb25zdCBmb3J3YXJkSWNvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2xvYmFsRm9yd2FyZEljb25cIik7XHJcbiAgICBjb25zdCBjcmVhdGVJY29uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnbG9iYWxDcmVhdGVJY29uXCIpO1xyXG5cclxuICAgIGlmIChmb3J3YXJkKSB7XHJcbiAgICAgIGNvbnN0IGlzU3RlcDIgPSBzdGVwID09PSAyO1xyXG4gICAgICBjb25zdCBzaG93Rm9yd2FyZCA9IGNhbkFjY2VzcyAmJiAoaXNTdGVwMiB8fCAoc3RlcCA9PT0gMSAmJiBjYW5Hb05leHQpKTtcclxuICAgICAgZm9yd2FyZC5zdHlsZS52aXNpYmlsaXR5ID0gc2hvd0ZvcndhcmQgPyBcInZpc2libGVcIiA6IFwiaGlkZGVuXCI7XHJcbiAgICAgIGZvcndhcmQuZGlzYWJsZWQgPSAhc2hvd0ZvcndhcmQgfHwgYnVzeTtcclxuICAgICAgZm9yd2FyZC5vbmNsaWNrID0gc2hvd0ZvcndhcmQgPyAoKSA9PiBvbk5leHQoKSA6IG51bGw7XHJcbiAgICAgIGZvcndhcmQuc2V0QXR0cmlidXRlKFxyXG4gICAgICAgIFwiYXJpYS1sYWJlbFwiLFxyXG4gICAgICAgIGlzU3RlcDIgPyBpbmRUKFwiQ29tbW9uX0NyZWF0ZVwiLCBcIkNyZWF0ZVwiKSA6IGluZFQoXCJDb21tb25fTmV4dFwiLCBcIk5leHRcIilcclxuICAgICAgKTtcclxuICAgICAgZm9yd2FyZC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWRpc2FibGVkXCIsIGlzU3RlcDIgJiYgIWNhblN1Ym1pdFN0ZXAyID8gXCJ0cnVlXCIgOiBcImZhbHNlXCIpO1xyXG4gICAgICBmb3J3YXJkLmNsYXNzTGlzdC50b2dnbGUoXCJvcGFjaXR5LTUwXCIsIGlzU3RlcDIgJiYgIWNhblN1Ym1pdFN0ZXAyKTtcclxuICAgICAgZm9yd2FyZC5jbGFzc0xpc3QudG9nZ2xlKFwiY3Vyc29yLW5vdC1hbGxvd2VkXCIsIGlzU3RlcDIgJiYgIWNhblN1Ym1pdFN0ZXAyKTtcclxuXHJcbiAgICAgIGlmIChmb3J3YXJkSWNvbiAmJiBjcmVhdGVJY29uKSB7XHJcbiAgICAgICAgaWYgKGlzU3RlcDIpIHtcclxuICAgICAgICAgIGZvcndhcmRJY29uLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XHJcbiAgICAgICAgICBjcmVhdGVJY29uLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGZvcndhcmRJY29uLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XHJcbiAgICAgICAgICBjcmVhdGVJY29uLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoYmFjaykge1xyXG4gICAgICBjb25zdCBzaG93QmFjayA9IGNhbkFjY2VzcyAmJiBzdGVwID09PSAyO1xyXG4gICAgICBiYWNrLnN0eWxlLnZpc2liaWxpdHkgPSBzaG93QmFjayA/IFwidmlzaWJsZVwiIDogXCJoaWRkZW5cIjtcclxuICAgICAgYmFjay5kaXNhYmxlZCA9ICFzaG93QmFjayB8fCBidXN5O1xyXG4gICAgICBiYWNrLm9uY2xpY2sgPSBzaG93QmFjayA/ICgpID0+IG9uUHJldigpIDogbnVsbDtcclxuICAgIH1cclxuICB9LCBbc3RlcCwgY2FuR29OZXh0LCBvbk5leHQsIG9uUHJldiwgYnVzeSwgY2FuU3VibWl0U3RlcDIsIGNhbkFjY2Vzc10pO1xyXG59O1xyXG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlUmVmIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IHNob3dHbG9iYWxTcGlubmVyLCBoaWRlR2xvYmFsU3Bpbm5lciB9IGZyb20gXCIuLi91dGlscy9nbG9iYWxTcGlubmVyLnRzXCI7XHJcbmltcG9ydCB7XHJcbiAgQ1JFQVRFX0ZSRVNIX1BBUkFNLFxyXG4gIFZJU0lUX0RSQUZUX0tFWSxcclxuICBDT05UQUNUU19TVE9SQUdFX0tFWSxcclxuICBDT05UQUNUU19TRUxFQ1RJT05fS0VZLFxyXG4gIGNsZWFyQ3JlYXRlU2VsZWN0aW9uQ2FjaGUsXHJcbiAgc3RyaXBGcmVzaFBhcmFtLFxyXG59IGZyb20gXCIuLi91dGlscy92aXNpdGFzU3RvcmFnZS50c1wiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHsgZ2V0U2Vzc2lvbkpzb25XaXRoRXhwaXJ5LCBnZXRTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5LCBzZXRTZXNzaW9uSnNvbldpdGhFeHBpcnkgfSBmcm9tIFwiLi4vdXRpbHMvc2Vzc2lvbkV4cGlyeS50c1wiO1xyXG5cclxuY29uc3QgQ1JFQVRFX0RSQUZUX1RUTF9NUyA9IDI0ICogNjAgKiA2MCAqIDEwMDA7XHJcblxyXG50eXBlIERyYWZ0U25hcHNob3QgPSB7XHJcbiAgc2VsZWN0ZWRDbGllbnQ6IGFueTtcclxuICBzZWxlY3RlZENvbnRhY3RzOiBhbnlbXTtcclxuICB2aXNpdFR5cGU6IHN0cmluZztcclxuICBjb250YWN0TWV0aG9kOiBzdHJpbmc7XHJcbiAgdHJhbnNEYXRlOiBzdHJpbmc7XHJcbiAgZGVzY3JpcHRpb246IHN0cmluZztcclxuICBjb21lbnRhcmlvczogc3RyaW5nO1xyXG4gIGFudGVjZWRlbnRlczogc3RyaW5nO1xyXG4gIGNvbmNsdXNpb25lczogc3RyaW5nO1xyXG4gIHN0ZXA6IG51bWJlcjtcclxufTtcclxuXHJcbnR5cGUgVXNlQ3JlYXRlRHJhZnRBcmdzID0ge1xyXG4gIGRyYWZ0U25hcHNob3Q6IERyYWZ0U25hcHNob3Q7XHJcbiAgc2V0U2VsZWN0ZWRDbGllbnQ6ICh2YWx1ZTogYW55KSA9PiB2b2lkO1xyXG4gIHNldFNlbGVjdGVkQ29udGFjdHM6ICh2YWx1ZTogYW55W10pID0+IHZvaWQ7XHJcbiAgc2V0VmlzaXRUeXBlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBzZXRDb250YWN0TWV0aG9kOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBzZXRUcmFuc0RhdGU6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIHNldERlc2NyaXB0aW9uOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBzZXRDb21lbnRhcmlvczogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgc2V0QW50ZWNlZGVudGVzOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBzZXRDb25jbHVzaW9uZXM6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIHNldFN0ZXA6ICh2YWx1ZTogbnVtYmVyKSA9PiB2b2lkO1xyXG59O1xyXG5cclxuLy8gSGFuZGxlcyB2aXNpdC1jcmVhdGUgZHJhZnQgc2F2ZS9yZXN0b3JlIGxpZmVjeWNsZS5cclxuZXhwb3J0IGNvbnN0IHVzZUNyZWF0ZURyYWZ0ID0gKHtcclxuICBkcmFmdFNuYXBzaG90LFxyXG4gIHNldFNlbGVjdGVkQ2xpZW50LFxyXG4gIHNldFNlbGVjdGVkQ29udGFjdHMsXHJcbiAgc2V0VmlzaXRUeXBlLFxyXG4gIHNldENvbnRhY3RNZXRob2QsXHJcbiAgc2V0VHJhbnNEYXRlLFxyXG4gIHNldERlc2NyaXB0aW9uLFxyXG4gIHNldENvbWVudGFyaW9zLFxyXG4gIHNldEFudGVjZWRlbnRlcyxcclxuICBzZXRDb25jbHVzaW9uZXMsXHJcbiAgc2V0U3RlcCxcclxufTogVXNlQ3JlYXRlRHJhZnRBcmdzKSA9PiB7XHJcbiAgY29uc3QgZHJhZnRSZXN0b3JlZFJlZiA9IHVzZVJlZihmYWxzZSk7XHJcbiAgY29uc3QgZHJhZnRQZXJzaXN0VGltZXJSZWYgPSB1c2VSZWY8bnVtYmVyIHwgbnVsbD4obnVsbCk7XHJcblxyXG4gIGNvbnN0IHBlcnNpc3REcmFmdFNuYXBzaG90ID0gdXNlQ2FsbGJhY2soKGRyYWZ0OiBEcmFmdFNuYXBzaG90KSA9PiB7XHJcbiAgICBzZXRTZXNzaW9uSnNvbldpdGhFeHBpcnkoVklTSVRfRFJBRlRfS0VZLCBkcmFmdCwgQ1JFQVRFX0RSQUZUX1RUTF9NUyk7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBwZXJzaXN0RHJhZnROb3cgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBwZXJzaXN0RHJhZnRTbmFwc2hvdChkcmFmdFNuYXBzaG90KTtcclxuICB9LCBbZHJhZnRTbmFwc2hvdCwgcGVyc2lzdERyYWZ0U25hcHNob3RdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghZHJhZnRSZXN0b3JlZFJlZi5jdXJyZW50KSByZXR1cm47XHJcblxyXG4gICAgaWYgKGRyYWZ0UGVyc2lzdFRpbWVyUmVmLmN1cnJlbnQpIHtcclxuICAgICAgY2xlYXJUaW1lb3V0KGRyYWZ0UGVyc2lzdFRpbWVyUmVmLmN1cnJlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYWZ0UGVyc2lzdFRpbWVyUmVmLmN1cnJlbnQgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIGRyYWZ0UGVyc2lzdFRpbWVyUmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICBwZXJzaXN0RHJhZnRTbmFwc2hvdChkcmFmdFNuYXBzaG90KTtcclxuICAgIH0sIDE4MCk7XHJcblxyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgaWYgKGRyYWZ0UGVyc2lzdFRpbWVyUmVmLmN1cnJlbnQpIHtcclxuICAgICAgICBjbGVhclRpbWVvdXQoZHJhZnRQZXJzaXN0VGltZXJSZWYuY3VycmVudCk7XHJcbiAgICAgICAgZHJhZnRQZXJzaXN0VGltZXJSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfSwgW2RyYWZ0U25hcHNob3QsIHBlcnNpc3REcmFmdFNuYXBzaG90XSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBsZXQgZnJlc2hMb2FkID0gZmFsc2U7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCB1cmwgPSBuZXcgVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcclxuICAgICAgZnJlc2hMb2FkID0gdXJsLnNlYXJjaFBhcmFtcy5oYXMoQ1JFQVRFX0ZSRVNIX1BBUkFNKTtcclxuICAgIH0gY2F0Y2gge1xyXG4gICAgICBmcmVzaExvYWQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZnJlc2hMb2FkKSB7XHJcbiAgICAgIGNsZWFyQ3JlYXRlU2VsZWN0aW9uQ2FjaGUoKTtcclxuICAgICAgc3RyaXBGcmVzaFBhcmFtKCk7XHJcbiAgICAgIGRyYWZ0UmVzdG9yZWRSZWYuY3VycmVudCA9IHRydWU7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgc2hvdWxkU2hvdyA9IGZhbHNlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgc2hvdWxkU2hvdyA9ICEhKFxyXG4gICAgICAgIGdldFNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoVklTSVRfRFJBRlRfS0VZKSB8fFxyXG4gICAgICAgIHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oQ09OVEFDVFNfU1RPUkFHRV9LRVkpIHx8XHJcbiAgICAgICAgc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShDT05UQUNUU19TRUxFQ1RJT05fS0VZKVxyXG4gICAgICApO1xyXG4gICAgfSBjYXRjaCB7XHJcbiAgICAgIC8vIElnbm9yZSBzdG9yYWdlIGFjY2VzcyBlcnJvcnMuXHJcbiAgICB9XHJcbiAgICBpZiAoc2hvdWxkU2hvdykge1xyXG4gICAgICBzaG93R2xvYmFsU3Bpbm5lcihpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpKTtcclxuICAgIH1cclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IGRyYWZ0ID0gZ2V0U2Vzc2lvbkpzb25XaXRoRXhwaXJ5PERyYWZ0U25hcHNob3Q+KFZJU0lUX0RSQUZUX0tFWSk7XHJcbiAgICAgIGlmIChkcmFmdD8uc2VsZWN0ZWRDbGllbnQ/LnZhbHVlKSBzZXRTZWxlY3RlZENsaWVudChkcmFmdC5zZWxlY3RlZENsaWVudCk7XHJcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGRyYWZ0Py5zZWxlY3RlZENvbnRhY3RzKSkgc2V0U2VsZWN0ZWRDb250YWN0cyhkcmFmdC5zZWxlY3RlZENvbnRhY3RzKTtcclxuICAgICAgaWYgKGRyYWZ0Py52aXNpdFR5cGUgIT09IHVuZGVmaW5lZCkgc2V0VmlzaXRUeXBlKGRyYWZ0LnZpc2l0VHlwZSk7XHJcbiAgICAgIGlmIChkcmFmdD8uY29udGFjdE1ldGhvZCAhPT0gdW5kZWZpbmVkKSBzZXRDb250YWN0TWV0aG9kKGRyYWZ0LmNvbnRhY3RNZXRob2QpO1xyXG4gICAgICBpZiAoZHJhZnQ/LnRyYW5zRGF0ZSkgc2V0VHJhbnNEYXRlKGRyYWZ0LnRyYW5zRGF0ZSk7XHJcbiAgICAgIGlmIChkcmFmdD8uZGVzY3JpcHRpb24gIT09IHVuZGVmaW5lZCkgc2V0RGVzY3JpcHRpb24oZHJhZnQuZGVzY3JpcHRpb24pO1xyXG4gICAgICBpZiAoZHJhZnQ/LmNvbWVudGFyaW9zICE9PSB1bmRlZmluZWQpIHNldENvbWVudGFyaW9zKGRyYWZ0LmNvbWVudGFyaW9zKTtcclxuICAgICAgaWYgKGRyYWZ0Py5hbnRlY2VkZW50ZXMgIT09IHVuZGVmaW5lZCkgc2V0QW50ZWNlZGVudGVzKGRyYWZ0LmFudGVjZWRlbnRlcyk7XHJcbiAgICAgIGlmIChkcmFmdD8uY29uY2x1c2lvbmVzICE9PSB1bmRlZmluZWQpIHNldENvbmNsdXNpb25lcyhkcmFmdC5jb25jbHVzaW9uZXMpO1xyXG4gICAgICBpZiAoZHJhZnQ/LnN0ZXAgPT09IDIpIHNldFN0ZXAoMik7XHJcbiAgICB9IGNhdGNoIHtcclxuICAgICAgLy8gSWdub3JlIG1hbGZvcm1lZCBkcmFmdCBwYXlsb2Fkcy5cclxuICAgIH0gZmluYWxseSB7XHJcbiAgICAgIGlmIChzaG91bGRTaG93KSB7XHJcbiAgICAgICAgaGlkZUdsb2JhbFNwaW5uZXIoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgZHJhZnRSZXN0b3JlZFJlZi5jdXJyZW50ID0gdHJ1ZTtcclxuICB9LCBbXHJcbiAgICBzZXRBbnRlY2VkZW50ZXMsXHJcbiAgICBzZXRDb21lbnRhcmlvcyxcclxuICAgIHNldENvbmNsdXNpb25lcyxcclxuICAgIHNldERlc2NyaXB0aW9uLFxyXG4gICAgc2V0U2VsZWN0ZWRDbGllbnQsXHJcbiAgICBzZXRTZWxlY3RlZENvbnRhY3RzLFxyXG4gICAgc2V0U3RlcCxcclxuICAgIHNldENvbnRhY3RNZXRob2QsXHJcbiAgICBzZXRUcmFuc0RhdGUsXHJcbiAgICBzZXRWaXNpdFR5cGUsXHJcbiAgXSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBwZXJzaXN0RHJhZnROb3csXHJcbiAgfTtcclxufTtcclxuIiwgImV4cG9ydCBjb25zdCBzaG93R2xvYmFsU3Bpbm5lciA9IChtZXNzYWdlPzogc3RyaW5nKSA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiB3aW5kb3cuX19pbmRTaG93R2xvYmFsU3Bpbm5lciA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgIHdpbmRvdy5fX2luZFNob3dHbG9iYWxTcGlubmVyKG1lc3NhZ2UpO1xyXG4gICAgfVxyXG4gIH0gY2F0Y2gge1xyXG4gICAgLy8gaWdub3JlXHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGhpZGVHbG9iYWxTcGlubmVyID0gKCkgPT4ge1xyXG4gIHRyeSB7XHJcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2Ygd2luZG93Ll9faW5kSGlkZUdsb2JhbFNwaW5uZXIgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICB3aW5kb3cuX19pbmRIaWRlR2xvYmFsU3Bpbm5lcigpO1xyXG4gICAgfVxyXG4gIH0gY2F0Y2gge1xyXG4gICAgLy8gaWdub3JlXHJcbiAgfVxyXG59O1xyXG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2sgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgZmV0Y2hKc29uIH0gZnJvbSBcIi4uL3NlcnZpY2VzL2FwaVNlcnZpY2UudHNcIjtcclxuaW1wb3J0IHsgaW5kRXh0cmFjdElkLCBpbmRFeHRyYWN0U2lnbmVkSWQgfSBmcm9tIFwiLi4vdXRpbHMvaW5kSWRzLnRzXCI7XHJcbmltcG9ydCB7IGluZEZvcm1hdCwgaW5kVCB9IGZyb20gXCIuLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB7IHNob3dQZXJtaXNzaW9uTW9kYWwgfSBmcm9tIFwiLi4vdXRpbHMvcGVybWlzc2lvbnMudHNcIjtcclxuaW1wb3J0IHsgZmxhc2hBY3Rpb25NYXJrLCBzZXRIaXN0b3J5RmlsdGVyRm9yRGF0ZSB9IGZyb20gXCIuLi91dGlscy92aXNpdGFzSGlzdG9yeS50c1wiO1xyXG5pbXBvcnQgeyBWSVNJVF9EUkFGVF9LRVkgfSBmcm9tIFwiLi4vdXRpbHMvdmlzaXRhc1N0b3JhZ2UudHNcIjtcclxuaW1wb3J0IHsgd2FpdCB9IGZyb20gXCIuLi91dGlscy93YWl0LnRzXCI7XHJcblxyXG50eXBlIENvbnRhY3RPcHRpb24gPSB7XHJcbiAgdmFsdWU6IHN0cmluZztcclxuICB0ZXh0OiBzdHJpbmc7XHJcbn07XHJcblxyXG50eXBlIExlZ2FjeUNvbW1hbmRSZXNwb25zZSA9IHtcclxuICBzdWNjZXNzPzogYm9vbGVhbjtcclxuICBtZXNzYWdlPzogc3RyaW5nO1xyXG4gIGRhdGE/OiB1bmtub3duO1xyXG4gIFN1Y2Nlc3M/OiBib29sZWFuO1xyXG4gIE1lc3NhZ2U/OiBzdHJpbmc7XHJcbiAgRGF0YT86IHVua25vd247XHJcbn07XHJcblxyXG5jb25zdCBnZXRMZWdhY3lSZXNwb25zZVN1Y2Nlc3MgPSAocmVzcG9uc2U6IExlZ2FjeUNvbW1hbmRSZXNwb25zZSk6IGJvb2xlYW4gPT4ge1xyXG4gIHJldHVybiByZXNwb25zZS5zdWNjZXNzID09PSB0cnVlIHx8IHJlc3BvbnNlLlN1Y2Nlc3MgPT09IHRydWU7XHJcbn07XHJcblxyXG5jb25zdCBnZXRMZWdhY3lSZXNwb25zZU1lc3NhZ2UgPSAocmVzcG9uc2U6IExlZ2FjeUNvbW1hbmRSZXNwb25zZSk6IHN0cmluZyA9PiB7XHJcbiAgY29uc3QgcmF3TWVzc2FnZSA9IHJlc3BvbnNlLm1lc3NhZ2UgPz8gcmVzcG9uc2UuTWVzc2FnZTtcclxuICByZXR1cm4gdHlwZW9mIHJhd01lc3NhZ2UgPT09IFwic3RyaW5nXCIgPyByYXdNZXNzYWdlLnRyaW0oKSA6IFwiXCI7XHJcbn07XHJcblxyXG5jb25zdCBnZXRMZWdhY3lSZXNwb25zZURhdGEgPSAocmVzcG9uc2U6IExlZ2FjeUNvbW1hbmRSZXNwb25zZSk6IHVua25vd24gPT4ge1xyXG4gIHJldHVybiByZXNwb25zZS5kYXRhID8/IHJlc3BvbnNlLkRhdGE7XHJcbn07XHJcblxyXG5jb25zdCBpc1JlY29yZCA9ICh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIFJlY29yZDxzdHJpbmcsIHVua25vd24+ID0+IHtcclxuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmIHZhbHVlICE9PSBudWxsICYmICFBcnJheS5pc0FycmF5KHZhbHVlKTtcclxufTtcclxuXHJcbmNvbnN0IHJlYWRTdHJpbmdMaWtlID0gKHZhbHVlOiB1bmtub3duKTogc3RyaW5nID0+IHtcclxuICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiIHx8IHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIikgcmV0dXJuIFN0cmluZyh2YWx1ZSkudHJpbSgpO1xyXG4gIHJldHVybiBcIlwiO1xyXG59O1xyXG5cclxuY29uc3QgcmVhZEZpcnN0U3RyaW5nTGlrZVByb3BlcnR5ID0gKHZhbHVlOiB1bmtub3duLCBrZXlzOiBzdHJpbmdbXSk6IHsgdmFsdWU6IHN0cmluZzsgc291cmNlOiBzdHJpbmcgfSA9PiB7XHJcbiAgaWYgKCFpc1JlY29yZCh2YWx1ZSkpIHJldHVybiB7IHZhbHVlOiBcIlwiLCBzb3VyY2U6IFwiXCIgfTtcclxuICBmb3IgKGNvbnN0IGtleSBvZiBrZXlzKSB7XHJcbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCBrZXkpKSB7XHJcbiAgICAgIGNvbnN0IGNhbmRpZGF0ZSA9IHJlYWRTdHJpbmdMaWtlKHZhbHVlW2tleV0pO1xyXG4gICAgICBpZiAoY2FuZGlkYXRlKSByZXR1cm4geyB2YWx1ZTogY2FuZGlkYXRlLCBzb3VyY2U6IGtleSB9O1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4geyB2YWx1ZTogXCJcIiwgc291cmNlOiBcIlwiIH07XHJcbn07XHJcblxyXG5jb25zdCBleHRyYWN0Q3JlYXRlQWN0aXZpdHlSZWNJZEZyb21EYXRhID0gKGRhdGE6IHVua25vd24pOiBzdHJpbmcgPT4ge1xyXG4gIGlmICh0eXBlb2YgZGF0YSA9PT0gXCJzdHJpbmdcIiB8fCB0eXBlb2YgZGF0YSA9PT0gXCJudW1iZXJcIikgcmV0dXJuIGluZEV4dHJhY3RTaWduZWRJZChkYXRhKTtcclxuICBjb25zdCBjYW5kaWRhdGUgPSByZWFkRmlyc3RTdHJpbmdMaWtlUHJvcGVydHkoZGF0YSwgW1xyXG4gICAgXCJSZWNJZFwiLFxyXG4gICAgXCJyZWNJZFwiLFxyXG4gICAgXCJSZWZSZWNJZFwiLFxyXG4gICAgXCJyZWZSZWNJZFwiLFxyXG4gICAgXCJSZWZSZWNJZEFjdGl2aWRhZFwiLFxyXG4gICAgXCJyZWZSZWNJZEFjdGl2aWRhZFwiLFxyXG4gICAgXCJBY3RpdmlkYWRSZWNJZFwiLFxyXG4gICAgXCJhY3RpdmlkYWRSZWNJZFwiLFxyXG4gIF0pO1xyXG4gIHJldHVybiBjYW5kaWRhdGUudmFsdWUgPyBpbmRFeHRyYWN0U2lnbmVkSWQoY2FuZGlkYXRlLnZhbHVlKSA6IFwiXCI7XHJcbn07XHJcblxyXG5jb25zdCByZXNvbHZlQ3JlYXRlQWN0aXZpdHlSZWNJZCA9IChyZXNwb25zZTogTGVnYWN5Q29tbWFuZFJlc3BvbnNlKTogc3RyaW5nID0+IHtcclxuICBjb25zdCBkYXRhID0gZ2V0TGVnYWN5UmVzcG9uc2VEYXRhKHJlc3BvbnNlKTtcclxuICByZXR1cm4gKFxyXG4gICAgZXh0cmFjdENyZWF0ZUFjdGl2aXR5UmVjSWRGcm9tRGF0YShkYXRhKSB8fFxyXG4gICAgaW5kRXh0cmFjdFNpZ25lZElkKGdldExlZ2FjeVJlc3BvbnNlTWVzc2FnZShyZXNwb25zZSkpIHx8XHJcbiAgICBpbmRFeHRyYWN0U2lnbmVkSWQoaW5kRXh0cmFjdElkKGRhdGEpIHx8IGluZEV4dHJhY3RJZChnZXRMZWdhY3lSZXNwb25zZU1lc3NhZ2UocmVzcG9uc2UpKSlcclxuICApO1xyXG59O1xyXG5cclxuY29uc3QgcmVzb2x2ZUNyZWF0ZUFjdGl2aXR5T3duZXJGb3JEaWFnbm9zdGljcyA9IChkYXRhOiB1bmtub3duKTogeyB2YWx1ZTogc3RyaW5nOyBzb3VyY2U6IHN0cmluZyB9ID0+IHtcclxuICByZXR1cm4gcmVhZEZpcnN0U3RyaW5nTGlrZVByb3BlcnR5KGRhdGEsIFtcclxuICAgIFwiT3duZXJBeFVzZXJJZFwiLFxyXG4gICAgXCJvd25lckF4VXNlcklkXCIsXHJcbiAgICBcIklORENyZWF0ZWRCeVVzZXJJZFwiLFxyXG4gICAgXCJpbmRDcmVhdGVkQnlVc2VySWRcIixcclxuICAgIFwiQ3JlYXRlZEJ5VXNlcklkXCIsXHJcbiAgICBcImNyZWF0ZWRCeVVzZXJJZFwiLFxyXG4gICAgXCJVc2VySWRcIixcclxuICAgIFwidXNlcklkXCIsXHJcbiAgXSk7XHJcbn07XHJcblxyXG5jb25zdCBsb2dDcmVhdGVBY3Rpdml0eURpYWdub3N0aWNzID0gKHJlc3BvbnNlOiBMZWdhY3lDb21tYW5kUmVzcG9uc2UsIHJlY0lkOiBzdHJpbmcpOiB2b2lkID0+IHtcclxuICBjb25zdCBkZWJ1Z0ZsYWcgPVxyXG4gICAgdHlwZW9mIGdsb2JhbFRoaXMgIT09IFwidW5kZWZpbmVkXCIgJiZcclxuICAgICgoKGdsb2JhbFRoaXMgYXMgeyBfX0lORF9ERUJVR19DUkVBVEVfXz86IHVua25vd24gfSkuX19JTkRfREVCVUdfQ1JFQVRFX18gPT09IHRydWUpIHx8XHJcbiAgICAgICgoZ2xvYmFsVGhpcyBhcyB7IF9fSU5EX0RFQlVHX1ZJU0lUQVNfXz86IHVua25vd24gfSkuX19JTkRfREVCVUdfVklTSVRBU19fID09PSB0cnVlKSk7XHJcbiAgaWYgKCFkZWJ1Z0ZsYWcpIHJldHVybjtcclxuXHJcbiAgY29uc3Qgb3duZXIgPSByZXNvbHZlQ3JlYXRlQWN0aXZpdHlPd25lckZvckRpYWdub3N0aWNzKGdldExlZ2FjeVJlc3BvbnNlRGF0YShyZXNwb25zZSkpO1xyXG4gIGNvbnNvbGUuZGVidWcoXCJbVmlzaXRzQ3JlYXRlXVwiLCBcImFjdGl2aXR5OmNyZWF0ZS1yZXNwb25zZVwiLCB7XHJcbiAgICByZWNJZCxcclxuICAgIG93bmVyQXhVc2VySWQ6IG93bmVyLnZhbHVlLFxyXG4gICAgb3duZXJTb3VyY2U6IG93bmVyLnNvdXJjZSxcclxuICB9KTtcclxufTtcclxuXHJcbi8vIENvbnZlcnRzIHNlbGVjdCB2YWx1ZXMgdG8gbnVtZXJpYyBlbnVtIHBheWxvYWQgdmFsdWVzLlxyXG5jb25zdCB0b051bGxhYmxlRW51bU51bWJlciA9ICh2YWx1ZTogc3RyaW5nKTogbnVtYmVyIHwgbnVsbCA9PiB7XHJcbiAgY29uc3QgcGFyc2VkID0gTnVtYmVyKHZhbHVlKTtcclxuICByZXR1cm4gTnVtYmVyLmlzSW50ZWdlcihwYXJzZWQpICYmIHBhcnNlZCA+PSAwID8gcGFyc2VkIDogbnVsbDtcclxufTtcclxuXHJcbnR5cGUgVXNlQ3JlYXRlU3VibWl0QXJncyA9IHtcclxuICBidXN5OiBib29sZWFuO1xyXG4gIG1vZGFsT3BlbjogYm9vbGVhbjtcclxuICBjYW5DcmVhdGVWaXNpdDogYm9vbGVhbjtcclxuICBjYW5Sb2xsYmFja0RlbGV0ZTogYm9vbGVhbjtcclxuICBzZWxlY3RlZENsaWVudDogeyB2YWx1ZTogc3RyaW5nIH0gfCBudWxsO1xyXG4gIHNlbGVjdGVkQ29udGFjdHM6IENvbnRhY3RPcHRpb25bXTtcclxuICB2aXNpdFR5cGU6IHN0cmluZztcclxuICBjb250YWN0TWV0aG9kOiBzdHJpbmc7XHJcbiAgZGVmYXVsdEFzaXN0ZW50ZVRpcG86IHN0cmluZztcclxuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xyXG4gIHRyYW5zRGF0ZTogc3RyaW5nO1xyXG4gIGNvbWVudGFyaW9zOiBzdHJpbmc7XHJcbiAgYW50ZWNlZGVudGVzOiBzdHJpbmc7XHJcbiAgY29uY2x1c2lvbmVzOiBzdHJpbmc7XHJcbiAgc2V0QnVzeTogKHZhbHVlOiBib29sZWFuKSA9PiB2b2lkO1xyXG4gIHNldFN0YXR1czogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgc2V0TW9kYWxFcnJvcjogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgc2V0U2hvd1JlcXVpcmVkOiAodmFsdWU6IGJvb2xlYW4pID0+IHZvaWQ7XHJcbiAgb3BlbkNvbmZpcm06IChvcHRzOiB7XHJcbiAgICB0aXRsZTogc3RyaW5nO1xyXG4gICAgbWVzc2FnZTogc3RyaW5nO1xyXG4gICAgY29uZmlybVRleHQ/OiBzdHJpbmc7XHJcbiAgICBvbkNvbmZpcm0/OiAoKSA9PiBQcm9taXNlPGJvb2xlYW4gfCB2b2lkPiB8IGJvb2xlYW4gfCB2b2lkO1xyXG4gIH0pID0+IHZvaWQ7XHJcbiAgY2xvc2VDb25maXJtOiAoKSA9PiB2b2lkO1xyXG59O1xyXG5cclxuLy8gT3ducyBjcmVhdGUvY29uZmlybSBmbG93IHNvIGZvcm0gY29tcG9uZW50IHN0YXlzIGZvY3VzZWQgb24gVUkgZmllbGRzLlxyXG5leHBvcnQgY29uc3QgdXNlQ3JlYXRlU3VibWl0ID0gKHtcclxuICBidXN5LFxyXG4gIG1vZGFsT3BlbixcclxuICBjYW5DcmVhdGVWaXNpdCxcclxuICBjYW5Sb2xsYmFja0RlbGV0ZSxcclxuICBzZWxlY3RlZENsaWVudCxcclxuICBzZWxlY3RlZENvbnRhY3RzLFxyXG4gIHZpc2l0VHlwZSxcclxuICBjb250YWN0TWV0aG9kLFxyXG4gIGRlZmF1bHRBc2lzdGVudGVUaXBvLFxyXG4gIGRlc2NyaXB0aW9uLFxyXG4gIHRyYW5zRGF0ZSxcclxuICBjb21lbnRhcmlvcyxcclxuICBhbnRlY2VkZW50ZXMsXHJcbiAgY29uY2x1c2lvbmVzLFxyXG4gIHNldEJ1c3ksXHJcbiAgc2V0U3RhdHVzLFxyXG4gIHNldE1vZGFsRXJyb3IsXHJcbiAgc2V0U2hvd1JlcXVpcmVkLFxyXG4gIG9wZW5Db25maXJtLFxyXG4gIGNsb3NlQ29uZmlybSxcclxufTogVXNlQ3JlYXRlU3VibWl0QXJncykgPT4ge1xyXG4gIGNvbnN0IGRvQ3JlYXRlID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgaWYgKGJ1c3kpIHJldHVybiBmYWxzZTtcclxuICAgIGlmICghY2FuQ3JlYXRlVmlzaXQpIHtcclxuICAgICAgc2hvd1Blcm1pc3Npb25Nb2RhbCgpO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xyXG4gICAgaWYgKCFzZWxlY3RlZENsaWVudCkge1xyXG4gICAgICBzZXRTdGF0dXMoaW5kVChcIlZpc2l0c19DcmVhdGVfU2VsZWN0Q2xpZW50UmVxdWlyZWRcIiwgXCJTZWxlY3QgYSBjbGllbnQuXCIpKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaWYgKFN0cmluZyh2aXNpdFR5cGUgfHwgXCJcIikgPT09IFwiXCIgfHwgU3RyaW5nKHZpc2l0VHlwZSkgPT09IFwiMFwiIHx8ICFkZXNjcmlwdGlvbi50cmltKCkgfHwgIWNvbWVudGFyaW9zLnRyaW0oKSkge1xyXG4gICAgICBzZXRTaG93UmVxdWlyZWQodHJ1ZSk7XHJcbiAgICAgIHNldFN0YXR1cyhpbmRUKFwiVmlzaXRzX0NyZWF0ZV9Db21wbGV0ZVJlcXVpcmVkXCIsIFwiQ29tcGxldGUgcmVxdWlyZWQgZmllbGRzLlwiKSk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHNldEJ1c3kodHJ1ZSk7XHJcbiAgICBzZXRTdGF0dXMoaW5kVChcIlZpc2l0c19DcmVhdGVfQ3JlYXRpbmdBY3Rpdml0eVwiLCBcIkNyZWF0aW5nIGFjdGl2aXR5Li4uXCIpKTtcclxuXHJcbiAgICBsZXQgY3JlYXRlZFJlY0lkID0gXCJcIjtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHBheWxvYWRBY3Rpdml0eSA9IHtcclxuICAgICAgICBhY2NvdW50TnVtOiBzZWxlY3RlZENsaWVudC52YWx1ZSxcclxuICAgICAgICB2aXNpdFR5cGU6IHRvTnVsbGFibGVFbnVtTnVtYmVyKHZpc2l0VHlwZSksXHJcbiAgICAgICAgY29udGFjdE1ldGhvZDogdG9OdWxsYWJsZUVudW1OdW1iZXIoY29udGFjdE1ldGhvZCB8fCBcIjBcIiksXHJcbiAgICAgICAgZGVzY3JpcHRpb24sXHJcbiAgICAgICAgdHJhbnNEYXRlLFxyXG4gICAgICAgIGNvbWVudGFyaW9zLFxyXG4gICAgICAgIGFudGVjZWRlbnRlcyxcclxuICAgICAgICBjb25jbHVzaW9uZXMsXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBjb25zdCByZXNBY3QgPSBhd2FpdCBmZXRjaEpzb248TGVnYWN5Q29tbWFuZFJlc3BvbnNlPihcIi9WaXNpdGFzL0NyZWF0ZUFjdGl2aXR5XCIsIHtcclxuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcclxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXlsb2FkQWN0aXZpdHkpLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmICghZ2V0TGVnYWN5UmVzcG9uc2VTdWNjZXNzKHJlc0FjdCkpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZ2V0TGVnYWN5UmVzcG9uc2VNZXNzYWdlKHJlc0FjdCkgfHwgaW5kVChcIlZpc2l0c19DcmVhdGVfQ3JlYXRlQWN0aXZpdHlGYWlsZWRcIiwgXCJGYWlsZWQgdG8gY3JlYXRlIGFjdGl2aXR5LlwiKSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IHJlY0lkQWN0aXZpZGFkID0gcmVzb2x2ZUNyZWF0ZUFjdGl2aXR5UmVjSWQocmVzQWN0KTtcclxuICAgICAgaWYgKCFyZWNJZEFjdGl2aWRhZCkgdGhyb3cgbmV3IEVycm9yKGluZFQoXCJWaXNpdHNfQ3JlYXRlX0NyZWF0ZUFjdGl2aXR5RmFpbGVkXCIsIFwiRmFpbGVkIHRvIGNyZWF0ZSBhY3Rpdml0eS5cIikpO1xyXG4gICAgICBsb2dDcmVhdGVBY3Rpdml0eURpYWdub3N0aWNzKHJlc0FjdCwgU3RyaW5nKHJlY0lkQWN0aXZpZGFkKSk7XHJcbiAgICAgIGNyZWF0ZWRSZWNJZCA9IFN0cmluZyhyZWNJZEFjdGl2aWRhZCk7XHJcblxyXG4gICAgICBpZiAoc2VsZWN0ZWRDb250YWN0cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgY29uc3QgYXNzaXN0YW50QmF0Y2hTaXplID0gNDtcclxuICAgICAgICBjb25zdCBjcmVhdGVBc3Npc3RhbnQgPSBhc3luYyAoY29udGFjdDogQ29udGFjdE9wdGlvbikgPT4ge1xyXG4gICAgICAgICAgY29uc3QgcGF5bG9hZFZpc2l0YSA9IHtcclxuICAgICAgICAgICAgcmVmUmVjSWRBY3RpdmlkYWQ6IHJlY0lkQWN0aXZpZGFkLFxyXG4gICAgICAgICAgICBhc2lzdGVudGVUaXBvOiB0b051bGxhYmxlRW51bU51bWJlcihkZWZhdWx0QXNpc3RlbnRlVGlwbyB8fCBcIjBcIiksXHJcbiAgICAgICAgICAgIGFzaXN0ZW50ZUlkOiBjb250YWN0LnRleHQsXHJcbiAgICAgICAgICAgIGNvbnRhY3RvUmVjSWQ6IGNvbnRhY3QudmFsdWUsXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgY29uc3QgcmVzVmlzID0gYXdhaXQgZmV0Y2hKc29uPExlZ2FjeUNvbW1hbmRSZXNwb25zZT4oXCIvVmlzaXRhcy9DcmVhdGVWaXNpdGFBc2lzdGVudGVcIiwge1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHBheWxvYWRWaXNpdGEpLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBpZiAoIWdldExlZ2FjeVJlc3BvbnNlU3VjY2VzcyhyZXNWaXMpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihnZXRMZWdhY3lSZXNwb25zZU1lc3NhZ2UocmVzVmlzKSB8fCBpbmRUKFwiVmlzaXRzX0NyZWF0ZV9DcmVhdGVWaXNpdEZhaWxlZFwiLCBcIkZhaWxlZCB0byBjcmVhdGUgdmlzaXQuXCIpKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpZHggPSAwOyBpZHggPCBzZWxlY3RlZENvbnRhY3RzLmxlbmd0aDsgaWR4ICs9IGFzc2lzdGFudEJhdGNoU2l6ZSkge1xyXG4gICAgICAgICAgY29uc3QgYmF0Y2ggPSBzZWxlY3RlZENvbnRhY3RzLnNsaWNlKGlkeCwgaWR4ICsgYXNzaXN0YW50QmF0Y2hTaXplKTtcclxuICAgICAgICAgIGNvbnN0IGZpcnN0ID0gYmF0Y2hbMF07XHJcbiAgICAgICAgICBpZiAoZmlyc3QpIHtcclxuICAgICAgICAgICAgc2V0U3RhdHVzKGluZEZvcm1hdChcIlZpc2l0c19DcmVhdGVfQ3JlYXRpbmdWaXNpdEZvclwiLCBcIkNyZWF0aW5nIHZpc2l0IGZvciB7MH0uLi5cIiwgZmlyc3QudGV4dCkpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoYmF0Y2gubWFwKChjb250YWN0KSA9PiBjcmVhdGVBc3Npc3RhbnQoY29udGFjdCkpKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbShWSVNJVF9EUkFGVF9LRVkpO1xyXG4gICAgICB9IGNhdGNoIHtcclxuICAgICAgICAvLyBJZ25vcmUgc3RvcmFnZSBlcnJvcnMuXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNldEhpc3RvcnlGaWx0ZXJGb3JEYXRlKHRyYW5zRGF0ZSwgdHJ1ZSk7XHJcbiAgICAgIGNsb3NlQ29uZmlybSgpO1xyXG4gICAgICBhd2FpdCB3YWl0KDIwMCk7XHJcbiAgICAgIGZsYXNoQWN0aW9uTWFyayhcIm9rUHJvY2Vzc1wiLCAxMjAwKTtcclxuICAgICAgYXdhaXQgd2FpdCgxMjAwKTtcclxuICAgICAgd2luZG93Ll9faW5kQnlwYXNzTmF2aWdhdGlvbkd1YXJkT25jZT8uKCk7XHJcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvSGlzdG9yaWFsL0hpc3RvcnlcIjtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9IGNhdGNoIChlOiB1bmtub3duKSB7XHJcbiAgICAgIGlmIChjcmVhdGVkUmVjSWQgJiYgY2FuUm9sbGJhY2tEZWxldGUpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgc2V0U3RhdHVzKGluZFQoXCJWaXNpdHNfQ3JlYXRlX1JvbGxiYWNrXCIsIFwiUm9sbGluZyBiYWNrIGFjdGl2aXR5Li4uXCIpKTtcclxuICAgICAgICAgIGF3YWl0IGZldGNoSnNvbihgL1Zpc2l0YXMvRGVsZXRlQWN0aXZpdHkvJHtlbmNvZGVVUklDb21wb25lbnQoY3JlYXRlZFJlY0lkKX1gLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcclxuICAgICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9IGNhdGNoIHtcclxuICAgICAgICAgIC8vIEtlZXAgb3JpZ2luYWwgZXJyb3IgZmxvdy5cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgbXNnID0gZSBpbnN0YW5jZW9mIEVycm9yID8gZS5tZXNzYWdlIDogaW5kVChcIlZpc2l0c19DcmVhdGVfQ3JlYXRlVmlzaXRFcnJvclwiLCBcIkZhaWxlZCB0byBjcmVhdGUgdGhlIHZpc2l0LlwiKTtcclxuICAgICAgc2V0TW9kYWxFcnJvcihtc2cpO1xyXG4gICAgICBzZXRTdGF0dXMobXNnKTtcclxuICAgICAgZmxhc2hBY3Rpb25NYXJrKFwiZXJyb3JQcm9jZXNzXCIsIDE1MDApO1xyXG4gICAgICBzZXRCdXN5KGZhbHNlKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH0sIFtcclxuICAgIGFudGVjZWRlbnRlcyxcclxuICAgIGJ1c3ksXHJcbiAgICBjYW5DcmVhdGVWaXNpdCxcclxuICAgIGNhblJvbGxiYWNrRGVsZXRlLFxyXG4gICAgY2xvc2VDb25maXJtLFxyXG4gICAgY29tZW50YXJpb3MsXHJcbiAgICBjb25jbHVzaW9uZXMsXHJcbiAgICBjb250YWN0TWV0aG9kLFxyXG4gICAgZGVmYXVsdEFzaXN0ZW50ZVRpcG8sXHJcbiAgICBkZXNjcmlwdGlvbixcclxuICAgIHNlbGVjdGVkQ2xpZW50LFxyXG4gICAgc2VsZWN0ZWRDb250YWN0cyxcclxuICAgIHNldEJ1c3ksXHJcbiAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgc2V0U2hvd1JlcXVpcmVkLFxyXG4gICAgc2V0U3RhdHVzLFxyXG4gICAgdHJhbnNEYXRlLFxyXG4gICAgdmlzaXRUeXBlLFxyXG4gIF0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVTdWJtaXQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAoYnVzeSkgcmV0dXJuO1xyXG4gICAgaWYgKCFjYW5DcmVhdGVWaXNpdCkge1xyXG4gICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmIChtb2RhbE9wZW4pIHJldHVybjtcclxuICAgIGlmICghc2VsZWN0ZWRDbGllbnQpIHtcclxuICAgICAgc2V0U3RhdHVzKGluZFQoXCJWaXNpdHNfQ3JlYXRlX1NlbGVjdENsaWVudFJlcXVpcmVkXCIsIFwiU2VsZWN0IGEgY2xpZW50LlwiKSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmIChTdHJpbmcodmlzaXRUeXBlIHx8IFwiXCIpID09PSBcIlwiIHx8IFN0cmluZyh2aXNpdFR5cGUpID09PSBcIjBcIiB8fCAhZGVzY3JpcHRpb24udHJpbSgpIHx8ICFjb21lbnRhcmlvcy50cmltKCkpIHtcclxuICAgICAgc2V0U2hvd1JlcXVpcmVkKHRydWUpO1xyXG4gICAgICBzZXRTdGF0dXMoaW5kVChcIlZpc2l0c19DcmVhdGVfQ29tcGxldGVSZXF1aXJlZFwiLCBcIkNvbXBsZXRlIHJlcXVpcmVkIGZpZWxkcy5cIikpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xyXG4gICAgb3BlbkNvbmZpcm0oe1xyXG4gICAgICB0aXRsZTogaW5kVChcIlZpc2l0c19DcmVhdGVfQ29uZmlybUNyZWF0ZV9UaXRsZVwiLCBcIkNvbmZpcm0gY3JlYXRlXCIpLFxyXG4gICAgICBtZXNzYWdlOiBpbmRUKFwiVmlzaXRzX0NyZWF0ZV9Db25maXJtQ3JlYXRlX0JvZHlcIiwgXCJEbyB5b3Ugd2FudCB0byBjcmVhdGUgdGhpcyB2aXNpdD9cIiksXHJcbiAgICAgIGNvbmZpcm1UZXh0OiBpbmRUKFwiQ29uZmlybV9ZZXNcIiwgXCJDb25maXJtX1llc1wiKSxcclxuICAgICAgb25Db25maXJtOiBkb0NyZWF0ZSxcclxuICAgIH0pO1xyXG4gIH0sIFtcclxuICAgIGJ1c3ksXHJcbiAgICBjYW5DcmVhdGVWaXNpdCxcclxuICAgIGNvbWVudGFyaW9zLFxyXG4gICAgZGVzY3JpcHRpb24sXHJcbiAgICBkb0NyZWF0ZSxcclxuICAgIG1vZGFsT3BlbixcclxuICAgIG9wZW5Db25maXJtLFxyXG4gICAgc2VsZWN0ZWRDbGllbnQsXHJcbiAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgc2V0U2hvd1JlcXVpcmVkLFxyXG4gICAgc2V0U3RhdHVzLFxyXG4gICAgdmlzaXRUeXBlLFxyXG4gIF0pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgZG9DcmVhdGUsXHJcbiAgICBoYW5kbGVTdWJtaXQsXHJcbiAgfTtcclxufTtcclxuIiwgImV4cG9ydCBjb25zdCBpbmRFeHRyYWN0SWQgPSAodmFsdWU6IHVua25vd24pOiBzdHJpbmcgPT4ge1xyXG4gIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gXCJcIjtcclxuICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiIHx8IHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIikgcmV0dXJuIFN0cmluZyh2YWx1ZSkudHJpbSgpO1xyXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIpIHtcclxuICAgIGNvbnN0IGNhbmRpZGF0ZSA9XHJcbiAgICAgICh2YWx1ZSBhcyBhbnkpLnJlY0lkID8/XHJcbiAgICAgICh2YWx1ZSBhcyBhbnkpLlJlY0lkID8/XHJcbiAgICAgICh2YWx1ZSBhcyBhbnkpLmlkID8/XHJcbiAgICAgICh2YWx1ZSBhcyBhbnkpLklkID8/XHJcbiAgICAgICh2YWx1ZSBhcyBhbnkpLnZhbHVlID8/XHJcbiAgICAgICh2YWx1ZSBhcyBhbnkpLlZhbHVlO1xyXG4gICAgaWYgKHR5cGVvZiBjYW5kaWRhdGUgPT09IFwic3RyaW5nXCIgfHwgdHlwZW9mIGNhbmRpZGF0ZSA9PT0gXCJudW1iZXJcIikgcmV0dXJuIFN0cmluZyhjYW5kaWRhdGUpLnRyaW0oKTtcclxuICB9XHJcbiAgcmV0dXJuIFwiXCI7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgaW5kRXh0cmFjdE51bWVyaWNJZCA9ICh2YWx1ZTogdW5rbm93biwgZGVwdGggPSAwKTogc3RyaW5nID0+IHtcclxuICBpZiAoZGVwdGggPiAzKSByZXR1cm4gXCJcIjtcclxuICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkgcmV0dXJuIFwiXCI7XHJcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIiAmJiBOdW1iZXIuaXNGaW5pdGUodmFsdWUpKSByZXR1cm4gU3RyaW5nKE1hdGgudHJ1bmModmFsdWUpKTtcclxuICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICBjb25zdCByYXcgPSB2YWx1ZS50cmltKCk7XHJcbiAgICBpZiAoIXJhdykgcmV0dXJuIFwiXCI7XHJcbiAgICBpZiAoL15cXGQrJC8udGVzdChyYXcpKSByZXR1cm4gcmF3O1xyXG4gICAgY29uc3QgbSA9IHJhdy5tYXRjaCgvKFxcZHszLH0pLyk7XHJcbiAgICByZXR1cm4gbSA/IG1bMV0gOiBcIlwiO1xyXG4gIH1cclxuICBpZiAodHlwZW9mIHZhbHVlICE9PSBcIm9iamVjdFwiKSByZXR1cm4gXCJcIjtcclxuICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcclxuICAgIGZvciAoY29uc3QgaXRlbSBvZiB2YWx1ZSkge1xyXG4gICAgICBjb25zdCBmb3VuZCA9IGluZEV4dHJhY3ROdW1lcmljSWQoaXRlbSwgZGVwdGggKyAxKTtcclxuICAgICAgaWYgKGZvdW5kKSByZXR1cm4gZm91bmQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gXCJcIjtcclxuICB9XHJcblxyXG4gIGNvbnN0IGtleXMgPSBbXHJcbiAgICBcInJlY0lkXCIsXHJcbiAgICBcIlJlY0lkXCIsXHJcbiAgICBcInJlZlJlY0lkQWN0aXZpZGFkXCIsXHJcbiAgICBcIlJlZlJlY0lkQWN0aXZpZGFkXCIsXHJcbiAgICBcImFjdGl2aWRhZFJlY0lkXCIsXHJcbiAgICBcIkFjdGl2aWRhZFJlY0lkXCIsXHJcbiAgICBcImlkXCIsXHJcbiAgICBcIklkXCIsXHJcbiAgICBcInZhbHVlXCIsXHJcbiAgICBcIlZhbHVlXCIsXHJcbiAgICBcInJlc3VsdFwiLFxyXG4gICAgXCJSZXN1bHRcIixcclxuICAgIFwiZGF0YVwiLFxyXG4gICAgXCJEYXRhXCIsXHJcbiAgICBcIm1lc3NhZ2VcIixcclxuICAgIFwiTWVzc2FnZVwiLFxyXG4gIF07XHJcblxyXG4gIGZvciAoY29uc3QgayBvZiBrZXlzKSB7XHJcbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCBrKSkge1xyXG4gICAgICBjb25zdCBmb3VuZCA9IGluZEV4dHJhY3ROdW1lcmljSWQoKHZhbHVlIGFzIGFueSlba10sIGRlcHRoICsgMSk7XHJcbiAgICAgIGlmIChmb3VuZCkgcmV0dXJuIGZvdW5kO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZm9yIChjb25zdCB2IG9mIE9iamVjdC52YWx1ZXModmFsdWUgYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj4pKSB7XHJcbiAgICBjb25zdCBmb3VuZCA9IGluZEV4dHJhY3ROdW1lcmljSWQodiwgZGVwdGggKyAxKTtcclxuICAgIGlmIChmb3VuZCkgcmV0dXJuIGZvdW5kO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIFwiXCI7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgaW5kRXh0cmFjdFNpZ25lZElkID0gKHZhbHVlOiB1bmtub3duLCBkZXB0aCA9IDApOiBzdHJpbmcgPT4ge1xyXG4gIGlmIChkZXB0aCA+IDMpIHJldHVybiBcIlwiO1xyXG4gIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gXCJcIjtcclxuICBpZiAodHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiICYmIE51bWJlci5pc0Zpbml0ZSh2YWx1ZSkpIHJldHVybiBTdHJpbmcoTWF0aC50cnVuYyh2YWx1ZSkpO1xyXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpIHtcclxuICAgIGNvbnN0IHJhdyA9IHZhbHVlLnRyaW0oKTtcclxuICAgIGlmICghcmF3KSByZXR1cm4gXCJcIjtcclxuICAgIGNvbnN0IG1hdGNoID0gcmF3Lm1hdGNoKC8tP1xcZHszLH0vKTtcclxuICAgIHJldHVybiBtYXRjaCA/IG1hdGNoWzBdIDogXCJcIjtcclxuICB9XHJcbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJvYmplY3RcIikgcmV0dXJuIFwiXCI7XHJcbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XHJcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgdmFsdWUpIHtcclxuICAgICAgY29uc3QgZm91bmQgPSBpbmRFeHRyYWN0U2lnbmVkSWQoaXRlbSwgZGVwdGggKyAxKTtcclxuICAgICAgaWYgKGZvdW5kKSByZXR1cm4gZm91bmQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gXCJcIjtcclxuICB9XHJcblxyXG4gIGNvbnN0IGtleXMgPSBbXHJcbiAgICBcInJlY0lkXCIsXHJcbiAgICBcIlJlY0lkXCIsXHJcbiAgICBcInJlZlJlY0lkQWN0aXZpZGFkXCIsXHJcbiAgICBcIlJlZlJlY0lkQWN0aXZpZGFkXCIsXHJcbiAgICBcImFjdGl2aWRhZFJlY0lkXCIsXHJcbiAgICBcIkFjdGl2aWRhZFJlY0lkXCIsXHJcbiAgICBcIm1lc3NhZ2VcIixcclxuICAgIFwiTWVzc2FnZVwiLFxyXG4gICAgXCJyZXN1bHRcIixcclxuICAgIFwiUmVzdWx0XCIsXHJcbiAgICBcImRhdGFcIixcclxuICAgIFwiRGF0YVwiLFxyXG4gIF07XHJcblxyXG4gIGZvciAoY29uc3QgayBvZiBrZXlzKSB7XHJcbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCBrKSkge1xyXG4gICAgICBjb25zdCBmb3VuZCA9IGluZEV4dHJhY3RTaWduZWRJZCgodmFsdWUgYXMgYW55KVtrXSwgZGVwdGggKyAxKTtcclxuICAgICAgaWYgKGZvdW5kKSByZXR1cm4gZm91bmQ7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmb3IgKGNvbnN0IHYgb2YgT2JqZWN0LnZhbHVlcyh2YWx1ZSBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPikpIHtcclxuICAgIGNvbnN0IGZvdW5kID0gaW5kRXh0cmFjdFNpZ25lZElkKHYsIGRlcHRoICsgMSk7XHJcbiAgICBpZiAoZm91bmQpIHJldHVybiBmb3VuZDtcclxuICB9XHJcblxyXG4gIHJldHVybiBcIlwiO1xyXG59O1xyXG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlSWQsIHVzZU1lbW8sIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgWE1hcmtJY29uIH0gZnJvbSBcIkBoZXJvaWNvbnMvcmVhY3QvMjAvc29saWRcIjtcclxuaW1wb3J0IEZsb2F0aW5nTGlzdCBmcm9tIFwiLi4vY29tbW9ucy9GbG9hdGluZ0xpc3QudHN4XCI7XHJcbmltcG9ydCBTcGlubmVyIGZyb20gXCIuLi9jb21tb25zL1NwaW5uZXIudHN4XCI7XHJcbmltcG9ydCB7IENoZXZyb25Eb3duU3ZnLCBDaGV2cm9uVXBTdmcgfSBmcm9tIFwiLi4vY29tbW9ucy9jaGV2cm9ucy50c3hcIjtcclxuaW1wb3J0IHsgZmV0Y2hKc29uIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2FwaVNlcnZpY2UudHNcIjtcclxuaW1wb3J0IHsgaGFuZGxlQ29tYm9ib3hLZXlEb3duIH0gZnJvbSBcIi4uLy4uL2hvb2tzL3VzZUNvbWJvYm94S2V5Ym9hcmQudHNcIjtcclxuaW1wb3J0IHsgdXNlT3V0c2lkZUNsaWNrIH0gZnJvbSBcIi4uLy4uL2hvb2tzL3VzZU91dHNpZGVDbGljay50c1wiO1xyXG5pbXBvcnQgeyBjbGFzc05hbWVzIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2NsYXNzTmFtZXMudHNcIjtcclxuaW1wb3J0IHsgaW5kRm9ybWF0LCBpbmRUIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHsgaXNOb0RhdGFSb3csIGlzTm9EYXRhVGV4dCB9IGZyb20gXCIuLi8uLi91dGlscy9ub0RhdGEudHNcIjtcclxuaW1wb3J0IHsgZ2V0Q2FjaGVkQ29udGFjdHMsIHNldENhY2hlZENvbnRhY3RzLCBnZXRTdG9yZWRTZWxlY3Rpb24sIHNldFN0b3JlZFNlbGVjdGlvbiwgY2xlYXJTdG9yZWRTZWxlY3Rpb24gfSBmcm9tIFwiLi4vLi4vdXRpbHMvdmlzaXRhc1N0b3JhZ2UudHNcIjtcclxuXHJcbnR5cGUgQ29udGFjdE9wdGlvbiA9IHtcclxuICB2YWx1ZTogc3RyaW5nO1xyXG4gIHRleHQ6IHN0cmluZztcclxuICBjYXJnbzogc3RyaW5nO1xyXG4gIGVtcHJlc2E6IHN0cmluZztcclxufTtcclxuXHJcbnR5cGUgQ29udGFjdHNEcm9wZG93blJlc3BvbnNlID0ge1xyXG4gIGl0ZW1zPzogdW5rbm93bltdO1xyXG4gIEl0ZW1zPzogdW5rbm93bltdO1xyXG59O1xyXG5cclxudHlwZSBDb250YWN0c0NvbWJvYm94UHJvcHMgPSB7XHJcbiAgYWNjb3VudE51bT86IHN0cmluZztcclxuICB2YWx1ZT86IENvbnRhY3RPcHRpb25bXTtcclxuICBvbkNoYW5nZTogKHZhbHVlOiBDb250YWN0T3B0aW9uW10pID0+IHZvaWQ7XHJcbiAgcG9ydGFsQ2xhc3NOYW1lPzogc3RyaW5nO1xyXG4gIHBhbmVsQ2xhc3NOYW1lPzogc3RyaW5nO1xyXG59O1xyXG5cclxuLy8gTXVsdGktc2VsZWN0IGNvbnRhY3RzIGNvbWJvYm94IHRpZWQgdG8gdGhlIHNlbGVjdGVkIGNsaWVudC5cclxuY29uc3QgQ29udGFjdHNDb21ib2JveCA9ICh7IGFjY291bnROdW0sIHZhbHVlID0gW10sIG9uQ2hhbmdlLCBwb3J0YWxDbGFzc05hbWUsIHBhbmVsQ2xhc3NOYW1lIH06IENvbnRhY3RzQ29tYm9ib3hQcm9wcykgPT4ge1xyXG4gIGNvbnN0IFtxdWVyeSwgc2V0UXVlcnldID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW29wdGlvbnMsIHNldE9wdGlvbnNdID0gdXNlU3RhdGU8Q29udGFjdE9wdGlvbltdPihbXSk7XHJcbiAgY29uc3QgW3NlbGVjdGVkLCBzZXRTZWxlY3RlZF0gPSB1c2VTdGF0ZTxDb250YWN0T3B0aW9uW10+KHZhbHVlKTtcclxuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW2xvYWRpbmdNb3JlLCBzZXRMb2FkaW5nTW9yZV0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW3N0YXR1cywgc2V0U3RhdHVzXSA9IHVzZVN0YXRlKGluZFQoXCJWaXNpdHNfQ3JlYXRlX1NlbGVjdENsaWVudEZpcnN0XCIsIFwiU2VsZWN0IGEgY2xpZW50IGZpcnN0LlwiKSk7XHJcbiAgY29uc3QgW2hhc0xvYWRlZCwgc2V0SGFzTG9hZGVkXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbb3Blbiwgc2V0T3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW3BhZ2UsIHNldFBhZ2VdID0gdXNlU3RhdGUoMSk7XHJcbiAgY29uc3QgW2hhc01vcmUsIHNldEhhc01vcmVdID0gdXNlU3RhdGUodHJ1ZSk7XHJcbiAgY29uc3QgW2Jsb2NraW5nLCBzZXRCbG9ja2luZ10gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW2FjdGl2ZUluZGV4LCBzZXRBY3RpdmVJbmRleF0gPSB1c2VTdGF0ZSgwKTtcclxuICBjb25zdCBbc2hvd05vdEZvdW5kU3RhdGUsIHNldFNob3dOb3RGb3VuZFN0YXRlXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBsaXN0UmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgYm94UmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgYWJvcnRSZWYgPSB1c2VSZWY8QWJvcnRDb250cm9sbGVyIHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgY29udGFpbmVyUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgaW5wdXRSZWYgPSB1c2VSZWY8SFRNTElucHV0RWxlbWVudCB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IGxhc3RBY2NvdW50UmVmID0gdXNlUmVmKGFjY291bnROdW0gfHwgXCJcIik7XHJcbiAgY29uc3Qgb25DaGFuZ2VSZWYgPSB1c2VSZWYob25DaGFuZ2UpO1xyXG4gIGNvbnN0IGlkQmFzZSA9IHVzZUlkKCk7XHJcbiAgY29uc3QgaW5wdXRJZCA9IGAke2lkQmFzZX0tY29udGFjdHMtaW5wdXRgO1xyXG4gIGNvbnN0IGxpc3RJZCA9IGAke2lkQmFzZX0tY29udGFjdHMtb3B0aW9uc2A7XHJcblxyXG4gIHVzZU91dHNpZGVDbGljayhbY29udGFpbmVyUmVmLCBsaXN0UmVmXSwgKCkgPT4ge1xyXG4gICAgc2V0T3BlbihmYWxzZSk7XHJcbiAgICBzZXRTaG93Tm90Rm91bmRTdGF0ZShmYWxzZSk7XHJcbiAgICBpZiAocXVlcnkudHJpbSgpKSB7XHJcbiAgICAgIHNldFF1ZXJ5KFwiXCIpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgb25DaGFuZ2VSZWYuY3VycmVudCA9IG9uQ2hhbmdlO1xyXG4gIH0sIFtvbkNoYW5nZV0pO1xyXG5cclxuICBjb25zdCBpc1NhbWVTZWxlY3Rpb24gPSAoYTogQ29udGFjdE9wdGlvbltdID0gW10sIGI6IENvbnRhY3RPcHRpb25bXSA9IFtdKSA9PiB7XHJcbiAgICBpZiAoYS5sZW5ndGggIT09IGIubGVuZ3RoKSByZXR1cm4gZmFsc2U7XHJcbiAgICBjb25zdCBhcyA9IGEubWFwKCh4KSA9PiBTdHJpbmcoeC52YWx1ZSkpLnNvcnQoKTtcclxuICAgIGNvbnN0IGJzID0gYi5tYXAoKHgpID0+IFN0cmluZyh4LnZhbHVlKSkuc29ydCgpO1xyXG4gICAgcmV0dXJuIGFzLmV2ZXJ5KCh2LCBpKSA9PiB2ID09PSBic1tpXSk7XHJcbiAgfTtcclxuXHJcbiAgLy8gU3luYyBpbnRlcm5hbCBzZWxlY3Rpb24gd2l0aCB0aGUgcHJvcCAoZHJhZnQvY2FjaGUgcmVzdG9yZSkuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghaXNTYW1lU2VsZWN0aW9uKHZhbHVlIHx8IFtdLCBzZWxlY3RlZCkpIHtcclxuICAgICAgc2V0U2VsZWN0ZWQodmFsdWUgfHwgW10pO1xyXG4gICAgfVxyXG4gIH0sIFt2YWx1ZV0pO1xyXG5cclxuICBjb25zdCBjYW5jZWxQZW5kaW5nID0gKCkgPT4ge1xyXG4gICAgaWYgKGFib3J0UmVmLmN1cnJlbnQpIHtcclxuICAgICAgYWJvcnRSZWYuY3VycmVudC5hYm9ydCgpO1xyXG4gICAgICBhYm9ydFJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgaWYgKGFib3J0UmVmLmN1cnJlbnQpIHtcclxuICAgICAgICBhYm9ydFJlZi5jdXJyZW50LmFib3J0KCk7XHJcbiAgICAgICAgYWJvcnRSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBwcmltZUZyb21DYWNoZSA9ICgpID0+IHtcclxuICAgIGNvbnN0IGNhY2hlZCA9IGdldENhY2hlZENvbnRhY3RzKGFjY291bnROdW0pIGFzIENvbnRhY3RPcHRpb25bXSB8IG51bGw7XHJcbiAgICBpZiAoY2FjaGVkKSB7XHJcbiAgICAgIHNldE9wdGlvbnMoY2FjaGVkKTtcclxuICAgICAgc2V0U2hvd05vdEZvdW5kU3RhdGUoZmFsc2UpO1xyXG4gICAgICBzZXRIYXNMb2FkZWQodHJ1ZSk7XHJcbiAgICAgIHNldEhhc01vcmUoY2FjaGVkLmxlbmd0aCA9PT0gMTApO1xyXG4gICAgICBzZXRTdGF0dXMoXHJcbiAgICAgICAgY2FjaGVkLmxlbmd0aFxyXG4gICAgICAgICAgPyBpbmRGb3JtYXQoXCJWaXNpdHNfQ3JlYXRlX0NvbnRhY3RDb3VudENhY2hlXCIsIFwiezB9IGNvbnRhY3RzIChjYWNoZSlcIiwgY2FjaGVkLmxlbmd0aClcclxuICAgICAgICAgIDogaW5kVChcIlZpc2l0c19DcmVhdGVfTm9Db250YWN0c1wiLCBcIk5vIGNvbnRhY3RzXCIpXHJcbiAgICAgICk7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH07XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjYW5jZWxQZW5kaW5nKCk7XHJcbiAgICBzZXRRdWVyeShcIlwiKTtcclxuICAgIHNldE9wZW4oZmFsc2UpO1xyXG4gICAgc2V0TG9hZGluZyhmYWxzZSk7XHJcbiAgICBzZXRCbG9ja2luZyhmYWxzZSk7XHJcbiAgICBzZXRMb2FkaW5nTW9yZShmYWxzZSk7XHJcbiAgICBzZXRBY3RpdmVJbmRleCgwKTtcclxuICAgIHNldFNob3dOb3RGb3VuZFN0YXRlKGZhbHNlKTtcclxuICAgIHNldFBhZ2UoMSk7XHJcbiAgICBzZXRIYXNNb3JlKHRydWUpO1xyXG5cclxuICAgIGlmICghYWNjb3VudE51bSkge1xyXG4gICAgICBzZXRPcHRpb25zKFtdKTtcclxuICAgICAgc2V0U2VsZWN0ZWQoW10pO1xyXG4gICAgICBvbkNoYW5nZVJlZi5jdXJyZW50KFtdKTtcclxuICAgICAgc2V0U3RhdHVzKGluZFQoXCJWaXNpdHNfQ3JlYXRlX1NlbGVjdENsaWVudEZpcnN0XCIsIFwiU2VsZWN0IGEgY2xpZW50IGZpcnN0LlwiKSk7XHJcbiAgICAgIHNldEhhc0xvYWRlZChmYWxzZSk7XHJcbiAgICAgIGNsZWFyU3RvcmVkU2VsZWN0aW9uKGxhc3RBY2NvdW50UmVmLmN1cnJlbnQpO1xyXG4gICAgICBsYXN0QWNjb3VudFJlZi5jdXJyZW50ID0gXCJcIjtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGNoYW5nZWQgPSBsYXN0QWNjb3VudFJlZi5jdXJyZW50ICYmIGxhc3RBY2NvdW50UmVmLmN1cnJlbnQgIT09IGFjY291bnROdW07XHJcbiAgICBpZiAoY2hhbmdlZCkge1xyXG4gICAgICBzZXRTZWxlY3RlZChbXSk7XHJcbiAgICAgIG9uQ2hhbmdlUmVmLmN1cnJlbnQoW10pO1xyXG4gICAgICBjbGVhclN0b3JlZFNlbGVjdGlvbihsYXN0QWNjb3VudFJlZi5jdXJyZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB1c2VkQ2FjaGUgPSBwcmltZUZyb21DYWNoZSgpO1xyXG4gICAgaWYgKCF1c2VkQ2FjaGUpIHtcclxuICAgICAgc2V0T3B0aW9ucyhbXSk7XHJcbiAgICAgIHNldEhhc0xvYWRlZChmYWxzZSk7XHJcbiAgICAgIHNldFN0YXR1cyhpbmRUKFwiVmlzaXRzX0NyZWF0ZV9QcmVzc0Fycm93VG9Mb2FkQ29udGFjdHNcIiwgXCJQcmVzcyBBcnJvd0Rvd24gdG8gbG9hZCBjb250YWN0cy5cIikpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHN0b3JlZFNlbGVjdGlvbiA9IGdldFN0b3JlZFNlbGVjdGlvbihhY2NvdW50TnVtKSBhcyBDb250YWN0T3B0aW9uW107XHJcbiAgICBpZiAoc3RvcmVkU2VsZWN0aW9uLmxlbmd0aCAmJiAhdmFsdWU/Lmxlbmd0aCkge1xyXG4gICAgICBzZXRTZWxlY3RlZChzdG9yZWRTZWxlY3Rpb24pO1xyXG4gICAgICBvbkNoYW5nZVJlZi5jdXJyZW50KHN0b3JlZFNlbGVjdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgbGFzdEFjY291bnRSZWYuY3VycmVudCA9IGFjY291bnROdW07XHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVhY3QtaG9va3MvZXhoYXVzdGl2ZS1kZXBzXHJcbiAgfSwgW2FjY291bnROdW1dKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIG9uQ2hhbmdlUmVmLmN1cnJlbnQoc2VsZWN0ZWQpO1xyXG4gICAgaWYgKGFjY291bnROdW0pIHNldFN0b3JlZFNlbGVjdGlvbihhY2NvdW50TnVtLCBzZWxlY3RlZCk7XHJcbiAgfSwgW3NlbGVjdGVkLCBhY2NvdW50TnVtXSk7XHJcblxyXG4gIGNvbnN0IHRvVGV4dCA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZyA9PiB7XHJcbiAgICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkgcmV0dXJuIFwiXCI7XHJcbiAgICByZXR1cm4gU3RyaW5nKHZhbHVlKS50cmltKCk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgYXNPYmplY3RSZWNvcmQgPSAodmFsdWU6IHVua25vd24pOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiB8IG51bGwgPT4ge1xyXG4gICAgaWYgKCF2YWx1ZSB8fCB0eXBlb2YgdmFsdWUgIT09IFwib2JqZWN0XCIgfHwgQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHJldHVybiBudWxsO1xyXG4gICAgcmV0dXJuIHZhbHVlIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+O1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IG1hcENvbnRhY3RzID0gKGl0ZW1zOiB1bmtub3duW10gPSBbXSkgPT5cclxuICAgIGl0ZW1zXHJcbiAgICAgIC5tYXAoKGVudHJ5KSA9PiB7XHJcbiAgICAgICAgaWYgKGlzTm9EYXRhUm93KGVudHJ5KSkgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgY29uc3QgcmVjb3JkID0gYXNPYmplY3RSZWNvcmQoZW50cnkpO1xyXG4gICAgICAgIGlmICghcmVjb3JkKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgICAgICAgY29uc3QgcmVjSWQgPSB0b1RleHQocmVjb3JkLnJlY0lkID8/IHJlY29yZC5SZWNJZCk7XHJcbiAgICAgICAgY29uc3QgbmFtZSA9IHRvVGV4dChyZWNvcmQubmFtZSA/PyByZWNvcmQuTmFtZSk7XHJcbiAgICAgICAgY29uc3QgY2FyZ28gPSB0b1RleHQocmVjb3JkLmNhcmdvID8/IHJlY29yZC5DYXJnbyk7XHJcbiAgICAgICAgY29uc3QgZW1wcmVzYSA9IHRvVGV4dChyZWNvcmQuZW1wcmVzYSA/PyByZWNvcmQuRW1wcmVzYSk7XHJcblxyXG4gICAgICAgIGlmICghcmVjSWQgfHwgaXNOb0RhdGFUZXh0KG5hbWUpKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHZhbHVlOiByZWNJZCxcclxuICAgICAgICAgIHRleHQ6IG5hbWUudG9VcHBlckNhc2UoKSxcclxuICAgICAgICAgIGNhcmdvOiBjYXJnby50b1VwcGVyQ2FzZSgpLFxyXG4gICAgICAgICAgZW1wcmVzYTogZW1wcmVzYS50b1VwcGVyQ2FzZSgpLFxyXG4gICAgICAgIH0gYXMgQ29udGFjdE9wdGlvbjtcclxuICAgICAgfSlcclxuICAgICAgLmZpbHRlcihCb29sZWFuKSBhcyBDb250YWN0T3B0aW9uW107XHJcblxyXG4gIGNvbnN0IGxvYWQgPSBhc3luYyAocGFnZVRvTG9hZCA9IDEsIGFwcGVuZCA9IGZhbHNlKSA9PiB7XHJcbiAgICBpZiAoIWFjY291bnROdW0pIHJldHVybjtcclxuICAgIGlmIChsb2FkaW5nIHx8IGxvYWRpbmdNb3JlKSByZXR1cm47XHJcbiAgICBjYW5jZWxQZW5kaW5nKCk7XHJcblxyXG4gICAgaWYgKCFhcHBlbmQpIHtcclxuICAgICAgc2V0TG9hZGluZyh0cnVlKTtcclxuICAgICAgc2V0QmxvY2tpbmcodHJ1ZSk7XHJcbiAgICAgIGlmIChwYWdlVG9Mb2FkID09PSAxKSBzZXRTdGF0dXMoaW5kVChcIlZpc2l0c19DcmVhdGVfTG9hZGluZ0NvbnRhY3RzXCIsIFwiTG9hZGluZyBjb250YWN0cy4uLlwiKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzZXRMb2FkaW5nTW9yZSh0cnVlKTtcclxuICAgICAgc2V0QmxvY2tpbmcodHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcclxuICAgIGFib3J0UmVmLmN1cnJlbnQgPSBjb250cm9sbGVyO1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2hKc29uPENvbnRhY3RzRHJvcGRvd25SZXNwb25zZT4oXHJcbiAgICAgICAgYC9WaXNpdGFzL0dldENvbnRhY3RzRm9yRHJvcGRvd24/YWNjb3VudE51bT0ke2VuY29kZVVSSUNvbXBvbmVudChhY2NvdW50TnVtKX0mcGFnZT0ke3BhZ2VUb0xvYWR9JnBhZ2VTaXplPTEwYCxcclxuICAgICAgICB7IHNpZ25hbDogY29udHJvbGxlci5zaWduYWwgfVxyXG4gICAgICApO1xyXG4gICAgICBjb25zdCByYXdJdGVtcyA9IEFycmF5LmlzQXJyYXkocmVzLml0ZW1zKSA/IHJlcy5pdGVtcyA6IEFycmF5LmlzQXJyYXkocmVzLkl0ZW1zKSA/IHJlcy5JdGVtcyA6IFtdO1xyXG4gICAgICBjb25zdCBtYXBwZWQgPSBtYXBDb250YWN0cyhyYXdJdGVtcyk7XHJcbiAgICAgIHNldE9wdGlvbnMoKHByZXYpID0+IHtcclxuICAgICAgICBjb25zdCBuZXh0ID0gYXBwZW5kID8gWy4uLnByZXYsIC4uLm1hcHBlZF0gOiBtYXBwZWQ7XHJcbiAgICAgICAgc2V0Q2FjaGVkQ29udGFjdHMoYWNjb3VudE51bSwgbmV4dCk7XHJcbiAgICAgICAgcmV0dXJuIG5leHQ7XHJcbiAgICAgIH0pO1xyXG4gICAgICBzZXRTaG93Tm90Rm91bmRTdGF0ZShmYWxzZSk7XHJcbiAgICAgIHNldEhhc0xvYWRlZCh0cnVlKTtcclxuICAgICAgc2V0SGFzTW9yZShtYXBwZWQubGVuZ3RoID09PSAxMCk7XHJcbiAgICAgIHNldFBhZ2UocGFnZVRvTG9hZCk7XHJcbiAgICAgIHNldFN0YXR1cyhtYXBwZWQubGVuZ3RoID8gaW5kRm9ybWF0KFwiVmlzaXRzX0NyZWF0ZV9Db250YWN0Q291bnRcIiwgXCJ7MH0gY29udGFjdHNcIiwgbWFwcGVkLmxlbmd0aCkgOiBpbmRUKFwiVmlzaXRzX0NyZWF0ZV9Ob0NvbnRhY3RzXCIsIFwiTm8gY29udGFjdHNcIikpO1xyXG4gICAgfSBjYXRjaCB7XHJcbiAgICAgIHNldFN0YXR1cyhpbmRUKFwiVmlzaXRzX0NyZWF0ZV9Mb2FkQ29udGFjdHNFcnJvclwiLCBcIkZhaWxlZCB0byBsb2FkIGNvbnRhY3RzLlwiKSk7XHJcbiAgICB9IGZpbmFsbHkge1xyXG4gICAgICBhYm9ydFJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XHJcbiAgICAgIHNldExvYWRpbmdNb3JlKGZhbHNlKTtcclxuICAgICAgc2V0QmxvY2tpbmcoZmFsc2UpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGNvbnN0IGVuc3VyZUxvYWRlZCA9ICgpID0+IHtcclxuICAgIGlmICghYWNjb3VudE51bSkgcmV0dXJuO1xyXG4gICAgaWYgKGhhc0xvYWRlZCAmJiBvcHRpb25zLmxlbmd0aCkgcmV0dXJuO1xyXG4gICAgaWYgKHByaW1lRnJvbUNhY2hlKCkpIHJldHVybjtcclxuICAgIGxvYWQoMSwgZmFsc2UpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGxvYWRNb3JlQ29udGFjdHMgPSBSZWFjdC51c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAoIWFjY291bnROdW0gfHwgIWhhc01vcmUgfHwgbG9hZGluZ01vcmUgfHwgbG9hZGluZykgcmV0dXJuO1xyXG4gICAgbG9hZChwYWdlICsgMSwgdHJ1ZSk7XHJcbiAgfSwgW2FjY291bnROdW0sIGhhc01vcmUsIGxvYWRpbmdNb3JlLCBsb2FkaW5nLCBwYWdlXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIW9wZW4gfHwgIWxpc3RSZWYuY3VycmVudCkgcmV0dXJuO1xyXG4gICAgY29uc3QgZWwgPSBsaXN0UmVmLmN1cnJlbnQ7XHJcbiAgICBjb25zdCBvblNjcm9sbCA9ICgpID0+IHtcclxuICAgICAgaWYgKGVsLnNjcm9sbFRvcCArIGVsLmNsaWVudEhlaWdodCA+PSBlbC5zY3JvbGxIZWlnaHQgLSA4KSBsb2FkTW9yZUNvbnRhY3RzKCk7XHJcbiAgICB9O1xyXG4gICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBvblNjcm9sbCwgeyBwYXNzaXZlOiB0cnVlIH0pO1xyXG4gICAgcmV0dXJuICgpID0+IGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgb25TY3JvbGwpO1xyXG4gIH0sIFtvcGVuLCBsb2FkTW9yZUNvbnRhY3RzXSk7XHJcblxyXG4gIGNvbnN0IHNlbGVjdGVkVmFsdWVzID0gdXNlTWVtbygoKSA9PiB7XHJcbiAgICByZXR1cm4gbmV3IFNldCgoc2VsZWN0ZWQgfHwgW10pLm1hcCgocykgPT4gU3RyaW5nKHMudmFsdWUpKSk7XHJcbiAgfSwgW3NlbGVjdGVkXSk7XHJcblxyXG4gIGNvbnN0IGF2YWlsYWJsZU9wdGlvbnMgPSB1c2VNZW1vKCgpID0+IHtcclxuICAgIC8vIEhpZGUgYWxyZWFkeSBzZWxlY3RlZCBjb250YWN0cyBmcm9tIHRoZSBkcm9wZG93biBsaXN0LlxyXG4gICAgcmV0dXJuIChvcHRpb25zIHx8IFtdKS5maWx0ZXIoKG8pID0+ICFzZWxlY3RlZFZhbHVlcy5oYXMoU3RyaW5nKG8udmFsdWUpKSk7XHJcbiAgfSwgW29wdGlvbnMsIHNlbGVjdGVkVmFsdWVzXSk7XHJcblxyXG4gIGNvbnN0IGZpbHRlcmVkID0gdXNlTWVtbygoKSA9PiB7XHJcbiAgICBjb25zdCBxID0gcXVlcnkudHJpbSgpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICBpZiAoIXEpIHJldHVybiBhdmFpbGFibGVPcHRpb25zO1xyXG4gICAgcmV0dXJuIGF2YWlsYWJsZU9wdGlvbnMuZmlsdGVyKFxyXG4gICAgICAobykgPT4gby50ZXh0LnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMocSkgfHwgby5jYXJnby50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHEpIHx8IG8uZW1wcmVzYS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHEpXHJcbiAgICApO1xyXG4gIH0sIFthdmFpbGFibGVPcHRpb25zLCBxdWVyeV0pO1xyXG4gIGNvbnN0IHNob3VsZFNob3dOb3RGb3VuZFJvdyA9IHNob3dOb3RGb3VuZFN0YXRlIHx8ICghIXF1ZXJ5LnRyaW0oKSAmJiBmaWx0ZXJlZC5sZW5ndGggPT09IDApO1xyXG4gIGNvbnN0IHJlc29sdmVkQWN0aXZlSW5kZXggPVxyXG4gICAgZmlsdGVyZWQubGVuZ3RoID4gMCA/IE1hdGgubWluKE1hdGgubWF4KGFjdGl2ZUluZGV4LCAwKSwgZmlsdGVyZWQubGVuZ3RoIC0gMSkgOiAwO1xyXG4gIGNvbnN0IGFjdGl2ZUlkID1cclxuICAgIG9wZW4gJiYgZmlsdGVyZWRbcmVzb2x2ZWRBY3RpdmVJbmRleF0gPyBgJHtpZEJhc2V9LWNvbnRhY3Qtb3B0LSR7ZmlsdGVyZWRbcmVzb2x2ZWRBY3RpdmVJbmRleF0udmFsdWV9YCA6IHVuZGVmaW5lZDtcclxuXHJcbiAgY29uc3QgdG9nZ2xlT3B0aW9uID0gKG9wdDogQ29udGFjdE9wdGlvbikgPT4ge1xyXG4gICAgc2V0U2VsZWN0ZWQoKHByZXYpID0+IHtcclxuICAgICAgY29uc3QgZXhpc3RzID0gcHJldi5zb21lKChwKSA9PiBwLnZhbHVlID09PSBvcHQudmFsdWUpO1xyXG4gICAgICBpZiAoZXhpc3RzKSByZXR1cm4gcHJldi5maWx0ZXIoKHApID0+IHAudmFsdWUgIT09IG9wdC52YWx1ZSk7XHJcbiAgICAgIHJldHVybiBbLi4ucHJldiwgb3B0XTtcclxuICAgIH0pO1xyXG4gICAgc2V0U2hvd05vdEZvdW5kU3RhdGUoZmFsc2UpO1xyXG4gICAgc2V0UXVlcnkoXCJcIik7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaGFuZGxlS2V5RG93biA9IChldjogUmVhY3QuS2V5Ym9hcmRFdmVudDxIVE1MSW5wdXRFbGVtZW50PikgPT4ge1xyXG4gICAgaGFuZGxlQ29tYm9ib3hLZXlEb3duKGV2LCB7XHJcbiAgICAgIGlzT3Blbjogb3BlbixcclxuICAgICAgc2V0T3BlbixcclxuICAgICAgb3B0aW9uQ291bnQ6IGZpbHRlcmVkLmxlbmd0aCxcclxuICAgICAgc2V0QWN0aXZlSW5kZXgsXHJcbiAgICAgIG9wZW5PbkFycm93OiB0cnVlLFxyXG4gICAgICBvbkFycm93TmF2aWdhdGU6IGVuc3VyZUxvYWRlZCxcclxuICAgICAgb25FbnRlcldoZW5PcGVuOiAoKSA9PiB7XHJcbiAgICAgICAgaWYgKGZpbHRlcmVkLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgIHRvZ2dsZU9wdGlvbihmaWx0ZXJlZFtyZXNvbHZlZEFjdGl2ZUluZGV4XSA/PyBmaWx0ZXJlZFswXSk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocXVlcnkudHJpbSgpKSB7XHJcbiAgICAgICAgICBzZXRRdWVyeShcIlwiKTtcclxuICAgICAgICAgIHNldFNob3dOb3RGb3VuZFN0YXRlKHRydWUpO1xyXG4gICAgICAgICAgc2V0T3Blbih0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIG9uRW50ZXJXaGVuQ2xvc2VkOiBhY2NvdW50TnVtXHJcbiAgICAgICAgPyAoKSA9PiB7XHJcbiAgICAgICAgICAgIGVuc3VyZUxvYWRlZCgpO1xyXG4gICAgICAgICAgICBzZXRPcGVuKHRydWUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIDogdW5kZWZpbmVkLFxyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yXCIgcmVmPXtjb250YWluZXJSZWZ9PlxyXG4gICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZm9ybS1sYWJlbCBmb250LXNlbWlib2xkXCIgaHRtbEZvcj17aW5wdXRJZH0+XHJcbiAgICAgICAge2luZFQoXCJWaXNpdHNfQ3JlYXRlX1NlYXJjaENvbnRhY3RcIiwgXCJTZWFyY2ggY29udGFjdFwiKX1cclxuICAgICAgPC9sYWJlbD5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZVwiPlxyXG4gICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICByZWY9e2JveFJlZn1cclxuICAgICAgICAgICAgY2xhc3NOYW1lPVwicmVsYXRpdmUgdy1mdWxsIGN1cnNvci1kZWZhdWx0IHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlci1zbGF0ZS0zMDAgYmctd2hpdGUgdGV4dC1sZWZ0IHNoYWRvdy14cyBmb2N1cy13aXRoaW46Ym9yZGVyLXByaW1hcnkgZm9jdXMtd2l0aGluOnJpbmctMiBmb2N1cy13aXRoaW46cmluZy1wcmltYXJ5IGZvY3VzLXdpdGhpbjpyaW5nLW9mZnNldC0wIHNtOnRleHQtc21cIlxuICAgICAgICAgID5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAgZ2FwLTEgcHgtMyBweS0yIG1pbi1oLTEwXCI+XHJcbiAgICAgICAgICAgIHtzZWxlY3RlZC5tYXAoKGMpID0+IChcclxuICAgICAgICAgICAgICA8c3BhblxyXG4gICAgICAgICAgICAgICAga2V5PXtjLnZhbHVlfVxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYmctcHJpbWFyeS8xMCB0ZXh0LXNsYXRlLTcwMCBweC0yIHB5LTEgdGV4dC14c1wiXG4gICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgIHtjLnRleHR9XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTZWxlY3RlZCgocHJldikgPT4gcHJldi5maWx0ZXIoKHMpID0+IHMudmFsdWUgIT09IGMudmFsdWUpKX1cclxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS03MDAgaG92ZXI6dGV4dC1zbGF0ZS03MDAvODBcIlxyXG4gICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtpbmRUKFwiQ29tbW9uX0RlbGV0ZVwiLCBcIkRlbGV0ZVwiKX1cclxuICAgICAgICAgICAgICAgICAgdGl0bGU9e2luZFQoXCJDb21tb25fRGVsZXRlXCIsIFwiRGVsZXRlXCIpfVxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICA8WE1hcmtJY29uIGNsYXNzTmFtZT1cImgtNCB3LTRcIiBhcmlhLWhpZGRlbj1cInRydWVcIiAvPlxyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICAgICAgaWQ9e2lucHV0SWR9XHJcbiAgICAgICAgICAgICAgbmFtZT17YCR7aWRCYXNlfS1jb250YWN0cy1xdWVyeWB9XHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleC0xIG1pbi13LTMwIGJnLXRyYW5zcGFyZW50IHRleHQtc20gc206dGV4dC1iYXNlIGxlYWRpbmctNSB0ZXh0LXNsYXRlLTkwMCBib3JkZXItbm9uZSBvdXRsaW5lLWhpZGRlbiBweC0xIHB5LTEgZm9jdXM6cmluZy0wIGZvY3VzOmJvcmRlci10cmFuc3BhcmVudFwiXHJcbiAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgc2V0QWN0aXZlSW5kZXgoMCk7XHJcbiAgICAgICAgICAgICAgICBzZXRTaG93Tm90Rm91bmRTdGF0ZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBzZXRRdWVyeShldmVudC50YXJnZXQudmFsdWUpO1xyXG4gICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgb25LZXlEb3duPXtoYW5kbGVLZXlEb3dufVxyXG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtzZWxlY3RlZC5sZW5ndGggPyBcIlwiIDogaW5kVChcIlZpc2l0c19DcmVhdGVfRmlsdGVyUGxhY2Vob2xkZXJcIiwgXCJUeXBlIHRvIGZpbHRlci4uLlwiKX1cclxuICAgICAgICAgICAgICBhdXRvQ29tcGxldGU9XCJvZmZcIlxyXG4gICAgICAgICAgICAgIHJlZj17aW5wdXRSZWZ9XHJcbiAgICAgICAgICAgICAgcmVhZE9ubHk9eyFhY2NvdW50TnVtfVxyXG4gICAgICAgICAgICAgIHJvbGU9XCJjb21ib2JveFwiXHJcbiAgICAgICAgICAgICAgYXJpYS1leHBhbmRlZD17b3Blbn1cclxuICAgICAgICAgICAgICBhcmlhLWNvbnRyb2xzPXtsaXN0SWR9XHJcbiAgICAgICAgICAgICAgYXJpYS1hY3RpdmVkZXNjZW5kYW50PXthY3RpdmVJZH1cclxuICAgICAgICAgICAgICBhcmlhLWF1dG9jb21wbGV0ZT1cImxpc3RcIlxyXG4gICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2luZFQoXCJWaXNpdHNfQ3JlYXRlX1NlYXJjaENvbnRhY3RcIiwgXCJTZWFyY2ggY29udGFjdFwiKX1cclxuICAgICAgICAgICAgICBvbkZvY3VzPXsoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBlbnN1cmVMb2FkZWQoKTtcclxuICAgICAgICAgICAgICAgIHNldE9wZW4odHJ1ZSk7XHJcbiAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgeyhsb2FkaW5nIHx8IGJsb2NraW5nKSAmJiAoXHJcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQteS0wIHJpZ2h0LTkgZmxleCBpdGVtcy1jZW50ZXJcIj5cclxuICAgICAgICAgICAgICAgIDxTcGlubmVyIC8+XHJcbiAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC15LTAgcmlnaHQtMCBmbGV4IGl0ZW1zLWNlbnRlciBwci0yIHRleHQtc2xhdGUtNTAwIGhvdmVyOnRleHQtc2xhdGUtNjAwXCJcclxuICAgICAgICAgICAgYXJpYS1sYWJlbD17b3BlbiA/IGluZFQoXCJEcm9wZG93bl9IaWRlT3B0aW9uc1wiLCBcIkhpZGUgb3B0aW9uc1wiKSA6IGluZFQoXCJEcm9wZG93bl9TaG93T3B0aW9uc1wiLCBcIlNob3cgb3B0aW9uc1wiKX1cclxuICAgICAgICAgICAgYXJpYS1leHBhbmRlZD17b3Blbn1cclxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xyXG4gICAgICAgICAgICAgIGlmICghYWNjb3VudE51bSkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgIGlmIChvcGVuKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRPcGVuKGZhbHNlKTtcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZW5zdXJlTG9hZGVkKCk7XHJcbiAgICAgICAgICAgICAgICBzZXRPcGVuKHRydWUpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfX1cclxuICAgICAgICAgID5cclxuICAgICAgICAgICAge29wZW4gPyA8Q2hldnJvblVwU3ZnIGNsYXNzTmFtZT1cImgtNSB3LTVcIiBhcmlhLWhpZGRlbj1cInRydWVcIiAvPiA6IDxDaGV2cm9uRG93blN2ZyBjbGFzc05hbWU9XCJoLTUgdy01XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgLz59XHJcbiAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxGbG9hdGluZ0xpc3RcclxuICAgICAgICAgICAgYW5jaG9yUmVmPXtib3hSZWZ9XHJcbiAgICAgICAgICAgIG9wZW49e29wZW59XHJcbiAgICAgICAgICAgIHpJbmRleD17MzgwMDAwfVxyXG4gICAgICAgICAgICBtYXhIZWlnaHRDbGFzcz1cIm1heC1oLTcyXCJcclxuICAgICAgICAgICAgcm9sZT1cImxpc3Rib3hcIlxyXG4gICAgICAgICAgICByb3VuZGVkQ2xhc3M9XCJyb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXVwiXG4gICAgICAgICAgICBwb3J0YWxDbGFzc05hbWU9e3BvcnRhbENsYXNzTmFtZX1cclxuICAgICAgICAgICAgcGFuZWxDbGFzc05hbWU9e3BhbmVsQ2xhc3NOYW1lfVxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgPGRpdiByZWY9e2xpc3RSZWZ9IGlkPXtsaXN0SWR9IGFyaWEtbXVsdGlzZWxlY3RhYmxlPVwidHJ1ZVwiPlxyXG4gICAgICAgICAgICB7bG9hZGluZyAmJiAoXHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBweC00IHB5LTIgdGV4dC1zbSB0ZXh0LXNsYXRlLTUwMFwiPlxyXG4gICAgICAgICAgICAgICAgPFNwaW5uZXIgc2l6ZT1cImgtNCB3LTRcIiAvPlxyXG4gICAgICAgICAgICAgICAge2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgIHshbG9hZGluZyAmJiBvcHRpb25zLmxlbmd0aCA9PT0gMCAmJiAoXHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJweC00IHB5LTIgdGV4dC1zbSB0ZXh0LXNsYXRlLTUwMFwiPlxyXG4gICAgICAgICAgICAgICAge2hhc0xvYWRlZCA/IGluZFQoXCJWaXNpdHNfQ3JlYXRlX05vQ29udGFjdHNcIiwgXCJObyBjb250YWN0c1wiKSA6IGluZFQoXCJWaXNpdHNfQ3JlYXRlX1NlbGVjdENsaWVudEZpcnN0XCIsIFwiU2VsZWN0IGEgY2xpZW50IGZpcnN0LlwiKX1cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgeyFsb2FkaW5nICYmIG9wdGlvbnMubGVuZ3RoID4gMCAmJiBmaWx0ZXJlZC5sZW5ndGggPT09IDAgJiYgKFxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHgtNCBweS0yIHRleHQtc20gdGV4dC1zbGF0ZS01MDBcIj5cclxuICAgICAgICAgICAgICAgIHtzaG91bGRTaG93Tm90Rm91bmRSb3dcclxuICAgICAgICAgICAgICAgICAgPyBpbmRUKFwiQ29tbW9uX05vdEZvdW5kXCIsIFwiTm90IGZvdW5kXCIpXHJcbiAgICAgICAgICAgICAgICAgIDogaW5kVChcIlZpc2l0c19DcmVhdGVfTm9Nb3JlQ29udGFjdHNcIiwgXCJObyBtb3JlIGNvbnRhY3RzIGF2YWlsYWJsZVwiKX1cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgeyFsb2FkaW5nICYmXHJcbiAgICAgICAgICAgICAgZmlsdGVyZWQubWFwKChvcHQsIGlkeCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc2VsID0gc2VsZWN0ZWQuc29tZSgocykgPT4gcy52YWx1ZSA9PT0gb3B0LnZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGlzQWN0aXZlID0gaWR4ID09PSByZXNvbHZlZEFjdGl2ZUluZGV4O1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICAgICAgICAgIGtleT17b3B0LnZhbHVlfVxyXG4gICAgICAgICAgICAgICAgICAgIGlkPXtgJHtpZEJhc2V9LWNvbnRhY3Qtb3B0LSR7b3B0LnZhbHVlfWB9XHJcbiAgICAgICAgICAgICAgICAgICAgcm9sZT1cIm9wdGlvblwiXHJcbiAgICAgICAgICAgICAgICAgICAgYXJpYS1zZWxlY3RlZD17c2VsfVxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcclxuICAgICAgICAgICAgICAgICAgICAgIFwicmVsYXRpdmUgZmxleCB3LWZ1bGwgY3Vyc29yLWRlZmF1bHQgc2VsZWN0LW5vbmUgaXRlbXMtc3RhcnQgcHktMiBweC0zIHRleHQtbGVmdCB0ZXh0LXNtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICBpc0FjdGl2ZSA/IFwiYmctcHJpbWFyeSB0ZXh0LXdoaXRlXCIgOiBzZWwgPyBcImJnLXByaW1hcnkvMTAgdGV4dC1wcmltYXJ5XCIgOiBcInRleHQtc2xhdGUtOTAwXCJcclxuICAgICAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgICAgICAgIG9uTW91c2VFbnRlcj17KCkgPT4gc2V0QWN0aXZlSW5kZXgoaWR4KX1cclxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB0b2dnbGVPcHRpb24ob3B0KX1cclxuICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgZmxleCBmbGV4LWNvbCBnYXAtMC41IHByLTJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcImJsb2NrIHRydW5jYXRlXCIsIHNlbCA/IFwiZm9udC1tZWRpdW1cIiA6IFwiZm9udC1ub3JtYWxcIil9PntvcHQudGV4dH08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXhzIHRleHQtc2xhdGUtNjAwIHRydW5jYXRlXCI+e29wdC5jYXJnb308L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICB9KX1cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICB7YmxvY2tpbmcgJiYgKFxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCB6LTcwMDAwIGJnLXdoaXRlLzcwIGJhY2tkcm9wLWJsdXItWzFweF0gZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV1cIj5cbiAgICAgICAgICAgICAgICA8U3Bpbm5lciBzaXplPVwiaC02IHctNlwiIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgIDwvRmxvYXRpbmdMaXN0PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgZmxleCBqdXN0aWZ5LWVuZFwiPlxyXG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS01MDAgdGVjaC1pbmZvXCI+e3N0YXR1c308L3NwYW4+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IENvbnRhY3RzQ29tYm9ib3g7XHJcbiIsICJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmZ1bmN0aW9uIFhNYXJrSWNvbih7XG4gIHRpdGxlLFxuICB0aXRsZUlkLFxuICAuLi5wcm9wc1xufSwgc3ZnUmVmKSB7XG4gIHJldHVybiAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChcInN2Z1wiLCBPYmplY3QuYXNzaWduKHtcbiAgICB4bWxuczogXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLFxuICAgIHZpZXdCb3g6IFwiMCAwIDIwIDIwXCIsXG4gICAgZmlsbDogXCJjdXJyZW50Q29sb3JcIixcbiAgICBcImFyaWEtaGlkZGVuXCI6IFwidHJ1ZVwiLFxuICAgIFwiZGF0YS1zbG90XCI6IFwiaWNvblwiLFxuICAgIHJlZjogc3ZnUmVmLFxuICAgIFwiYXJpYS1sYWJlbGxlZGJ5XCI6IHRpdGxlSWRcbiAgfSwgcHJvcHMpLCB0aXRsZSA/IC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KFwidGl0bGVcIiwge1xuICAgIGlkOiB0aXRsZUlkXG4gIH0sIHRpdGxlKSA6IG51bGwsIC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KFwicGF0aFwiLCB7XG4gICAgZDogXCJNNi4yOCA1LjIyYS43NS43NSAwIDAgMC0xLjA2IDEuMDZMOC45NCAxMGwtMy43MiAzLjcyYS43NS43NSAwIDEgMCAxLjA2IDEuMDZMMTAgMTEuMDZsMy43MiAzLjcyYS43NS43NSAwIDEgMCAxLjA2LTEuMDZMMTEuMDYgMTBsMy43Mi0zLjcyYS43NS43NSAwIDAgMC0xLjA2LTEuMDZMMTAgOC45NCA2LjI4IDUuMjJaXCJcbiAgfSkpO1xufVxuY29uc3QgRm9yd2FyZFJlZiA9IC8qI19fUFVSRV9fKi8gUmVhY3QuZm9yd2FyZFJlZihYTWFya0ljb24pO1xuZXhwb3J0IGRlZmF1bHQgRm9yd2FyZFJlZjsiLCAiXHVGRUZGaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgQ2xpZW50U2VhcmNoQ29tYm9ib3ggZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvdmlzaXRhcy9DbGllbnRTZWFyY2hDb21ib2JveC50c3hcIjtcclxuaW1wb3J0IENvbnRhY3RzQ29tYm9ib3ggZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvdmlzaXRhcy9Db250YWN0c0NvbWJvYm94LnRzeFwiO1xyXG5cclxuZXhwb3J0IHR5cGUgQ3JlYXRlU2VsZWN0ZWRDbGllbnQgPSB7XHJcbiAgdmFsdWU6IHN0cmluZztcclxuICB0ZXh0OiBzdHJpbmc7XHJcbiAgY2FyZ28/OiBzdHJpbmc7XHJcbiAgZW1wcmVzYT86IHN0cmluZztcclxufSB8IG51bGw7XHJcblxyXG5leHBvcnQgdHlwZSBDcmVhdGVTZWxlY3RlZENvbnRhY3QgPSB7XHJcbiAgdmFsdWU6IHN0cmluZztcclxuICB0ZXh0OiBzdHJpbmc7XHJcbiAgY2FyZ286IHN0cmluZztcclxuICBlbXByZXNhOiBzdHJpbmc7XHJcbn07XHJcblxyXG50eXBlIENyZWF0ZVN0ZXBDbGllbnRTZWxlY3Rpb25Qcm9wcyA9IHtcclxuICBzZWxlY3RlZENsaWVudDogQ3JlYXRlU2VsZWN0ZWRDbGllbnQ7XHJcbiAgc2VsZWN0ZWRDb250YWN0czogQ3JlYXRlU2VsZWN0ZWRDb250YWN0W107XHJcbiAgb25DbGllbnRTZWxlY3RlZDogKG5leHRDbGllbnQ6IENyZWF0ZVNlbGVjdGVkQ2xpZW50KSA9PiB2b2lkO1xyXG4gIG9uQ29udGFjdHNDaGFuZ2U6IChuZXh0Q29udGFjdHM6IENyZWF0ZVNlbGVjdGVkQ29udGFjdFtdKSA9PiB2b2lkO1xyXG4gIGNsaWVudExhYmVsOiBzdHJpbmc7XHJcbiAgY2xpZW50UGxhY2Vob2xkZXI6IHN0cmluZztcclxuICBzZWxlY3RlZENvbnRhY3RzQ291bnRUZXh0OiBzdHJpbmc7XHJcbn07XHJcblxyXG4vLyBSZW5kZXJzIHN0ZXAgMSB3aGVyZSB1c2VyIHNlbGVjdHMgdGhlIGFjY291bnQgYW5kIHJlbGF0ZWQgY29udGFjdHMuXHJcbmNvbnN0IENyZWF0ZVN0ZXBDbGllbnRTZWxlY3Rpb24gPSAoe1xyXG4gIHNlbGVjdGVkQ2xpZW50LFxyXG4gIHNlbGVjdGVkQ29udGFjdHMsXHJcbiAgb25DbGllbnRTZWxlY3RlZCxcclxuICBvbkNvbnRhY3RzQ2hhbmdlLFxyXG4gIGNsaWVudExhYmVsLFxyXG4gIGNsaWVudFBsYWNlaG9sZGVyLFxyXG4gIHNlbGVjdGVkQ29udGFjdHNDb3VudFRleHQsXHJcbn06IENyZWF0ZVN0ZXBDbGllbnRTZWxlY3Rpb25Qcm9wcykgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNlwiPlxyXG4gICAgICA8Q2xpZW50U2VhcmNoQ29tYm9ib3hcclxuICAgICAgICB2YWx1ZT17c2VsZWN0ZWRDbGllbnR9XHJcbiAgICAgICAgb25TZWxlY3RlZD17b25DbGllbnRTZWxlY3RlZH1cclxuICAgICAgICBsYWJlbD17Y2xpZW50TGFiZWx9XHJcbiAgICAgICAgcGxhY2Vob2xkZXI9e2NsaWVudFBsYWNlaG9sZGVyfVxyXG4gICAgICAgIHBvcnRhbENsYXNzTmFtZT1cInZpc2l0YXMtdHlwb2dyYXBoeVwiXHJcbiAgICAgIC8+XHJcblxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktM1wiPlxyXG4gICAgICAgIDxDb250YWN0c0NvbWJvYm94XHJcbiAgICAgICAgICBhY2NvdW50TnVtPXtzZWxlY3RlZENsaWVudD8udmFsdWV9XHJcbiAgICAgICAgICB2YWx1ZT17c2VsZWN0ZWRDb250YWN0c31cclxuICAgICAgICAgIG9uQ2hhbmdlPXtvbkNvbnRhY3RzQ2hhbmdlfVxyXG4gICAgICAgICAgcG9ydGFsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcclxuICAgICAgICAvPlxyXG4gICAgICAgIHtzZWxlY3RlZENvbnRhY3RzLmxlbmd0aCA+IDAgJiYgKFxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNjAwXCI+XHJcbiAgICAgICAgICAgIHtzZWxlY3RlZENvbnRhY3RzQ291bnRUZXh0fVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKX1cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ3JlYXRlU3RlcENsaWVudFNlbGVjdGlvbjtcclxuIiwgIlx1RkVGRmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFNpbmdsZURhdGVQaWNrZXIgZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9TaW5nbGVEYXRlUGlja2VyLnRzeFwiO1xyXG5pbXBvcnQgU2VsZWN0Q29tYm9ib3ggZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9TZWxlY3RDb21ib2JveC50c3hcIjtcclxuaW1wb3J0IFZpc2l0TmFycmF0aXZlRmllbGRzIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL3Zpc2l0YXMvVmlzaXROYXJyYXRpdmVGaWVsZHMudHN4XCI7XHJcblxyXG50eXBlIFNlbGVjdE9wdGlvbiA9IHtcclxuICB2YWx1ZT86IHN0cmluZyB8IG51bWJlcjtcclxuICBWYWx1ZT86IHN0cmluZyB8IG51bWJlcjtcclxuICB0ZXh0Pzogc3RyaW5nO1xyXG4gIFRleHQ/OiBzdHJpbmc7XHJcbn07XHJcblxyXG50eXBlIE5hcnJhdGl2ZVRhcEZpZWxkID0ge1xyXG4gIGlkOiBzdHJpbmc7XHJcbiAgbGFiZWw6IHN0cmluZztcclxuICB2YWx1ZTogc3RyaW5nO1xyXG4gIGNsYXNzTmFtZTogc3RyaW5nO1xyXG4gIHBvaW50ZXJCaW5kaW5nczoge1xyXG4gICAgb25Qb2ludGVyRG93bj86IFJlYWN0LlBvaW50ZXJFdmVudEhhbmRsZXI8SFRNTFRleHRBcmVhRWxlbWVudD47XHJcbiAgICBvblBvaW50ZXJNb3ZlPzogUmVhY3QuUG9pbnRlckV2ZW50SGFuZGxlcjxIVE1MVGV4dEFyZWFFbGVtZW50PjtcclxuICAgIG9uUG9pbnRlclVwPzogUmVhY3QuUG9pbnRlckV2ZW50SGFuZGxlcjxIVE1MVGV4dEFyZWFFbGVtZW50PjtcclxuICAgIG9uUG9pbnRlckNhbmNlbD86IFJlYWN0LlBvaW50ZXJFdmVudEhhbmRsZXI8SFRNTFRleHRBcmVhRWxlbWVudD47XHJcbiAgfTtcclxufTtcclxuXHJcbnR5cGUgQ3JlYXRlU3RlcFZpc2l0RGV0YWlsc1Byb3BzID0ge1xyXG4gIHRpdGxlOiBzdHJpbmc7XHJcbiAgZGF0ZUxhYmVsOiBzdHJpbmc7XHJcbiAgdHJhbnNEYXRlOiBzdHJpbmc7XHJcbiAgb25UcmFuc0RhdGVDaGFuZ2U6IChuZXh0VmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICB2aXNpdFR5cGVMYWJlbDogc3RyaW5nO1xyXG4gIHZpc2l0VHlwZXM6IFNlbGVjdE9wdGlvbltdO1xyXG4gIHZpc2l0VHlwZTogc3RyaW5nO1xyXG4gIG9uVmlzaXRUeXBlQ2hhbmdlOiAobmV4dFZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgdmlzaXRUeXBlUGxhY2Vob2xkZXI6IHN0cmluZztcclxuICB2aXNpdFR5cGVJbnZhbGlkOiBib29sZWFuO1xyXG4gIGNvbnRhY3RNZXRob2RMYWJlbDogc3RyaW5nO1xyXG4gIGNvbnRhY3RNZXRob2RzOiBTZWxlY3RPcHRpb25bXTtcclxuICBjb250YWN0TWV0aG9kOiBzdHJpbmc7XHJcbiAgb25Db250YWN0TWV0aG9kQ2hhbmdlOiAobmV4dFZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgY29udGFjdE1ldGhvZFBsYWNlaG9sZGVyOiBzdHJpbmc7XHJcbiAgZGVzY3JpcHRpb25MYWJlbDogc3RyaW5nO1xyXG4gIGRlc2NyaXB0aW9uVmFsdWU6IHN0cmluZztcclxuICBkZXNjcmlwdGlvbkNsYXNzTmFtZTogc3RyaW5nO1xyXG4gIG9uRGVzY3JpcHRpb25DaGFuZ2U6IChuZXh0VmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICB0YXBGaWVsZHM6IE5hcnJhdGl2ZVRhcEZpZWxkW107XHJcbiAgc3RhdHVzOiBzdHJpbmc7XHJcbn07XHJcblxyXG4vLyBSZW5kZXJzIHN0ZXAgMiB3aXRoIHZpc2l0IG1ldGFkYXRhIGFuZCBuYXJyYXRpdmUgZmllbGRzLlxyXG5jb25zdCBDcmVhdGVTdGVwVmlzaXREZXRhaWxzID0gKHtcclxuICB0aXRsZSxcclxuICBkYXRlTGFiZWwsXHJcbiAgdHJhbnNEYXRlLFxyXG4gIG9uVHJhbnNEYXRlQ2hhbmdlLFxyXG4gIHZpc2l0VHlwZUxhYmVsLFxyXG4gIHZpc2l0VHlwZXMsXHJcbiAgdmlzaXRUeXBlLFxyXG4gIG9uVmlzaXRUeXBlQ2hhbmdlLFxyXG4gIHZpc2l0VHlwZVBsYWNlaG9sZGVyLFxyXG4gIHZpc2l0VHlwZUludmFsaWQsXHJcbiAgY29udGFjdE1ldGhvZExhYmVsLFxyXG4gIGNvbnRhY3RNZXRob2RzLFxyXG4gIGNvbnRhY3RNZXRob2QsXHJcbiAgb25Db250YWN0TWV0aG9kQ2hhbmdlLFxyXG4gIGNvbnRhY3RNZXRob2RQbGFjZWhvbGRlcixcclxuICBkZXNjcmlwdGlvbkxhYmVsLFxyXG4gIGRlc2NyaXB0aW9uVmFsdWUsXHJcbiAgZGVzY3JpcHRpb25DbGFzc05hbWUsXHJcbiAgb25EZXNjcmlwdGlvbkNoYW5nZSxcclxuICB0YXBGaWVsZHMsXHJcbiAgc3RhdHVzLFxyXG59OiBDcmVhdGVTdGVwVmlzaXREZXRhaWxzUHJvcHMpID0+IHtcclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzaGFkb3cteHMgZ2xhc3MtcGFuZWwgcC00IHNwYWNlLXktNCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXVwiPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtYmFzZSBmb250LXNlbWlib2xkIHRleHQtc2xhdGUtOTAwIGJvcmRlci1iIGJvcmRlci1zbGF0ZS0yMDAgcGItM1wiPlxyXG4gICAgICAgIHt0aXRsZX1cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMyBnYXAtNFwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidmlzaXRhLWZpZWxkLXRleHRcIj5cclxuICAgICAgICAgIDxTaW5nbGVEYXRlUGlja2VyIGxhYmVsPXtkYXRlTGFiZWx9IHZhbHVlPXt0cmFuc0RhdGV9IG9uQ2hhbmdlPXtvblRyYW5zRGF0ZUNoYW5nZX0gLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8U2VsZWN0Q29tYm9ib3hcclxuICAgICAgICAgIGxhYmVsPXt2aXNpdFR5cGVMYWJlbH1cclxuICAgICAgICAgIG9wdGlvbnM9e3Zpc2l0VHlwZXN9XHJcbiAgICAgICAgICB2YWx1ZT17dmlzaXRUeXBlfVxyXG4gICAgICAgICAgb25DaGFuZ2U9eyhuZXh0VmFsdWUpID0+IG9uVmlzaXRUeXBlQ2hhbmdlKFN0cmluZyhuZXh0VmFsdWUgPz8gXCJcIikpfVxyXG4gICAgICAgICAgcGxhY2Vob2xkZXI9e3Zpc2l0VHlwZVBsYWNlaG9sZGVyfVxyXG4gICAgICAgICAgaW52YWxpZD17dmlzaXRUeXBlSW52YWxpZH1cclxuICAgICAgICAgIHBvcnRhbENsYXNzTmFtZT1cInZpc2l0YXMtdHlwb2dyYXBoeVwiXHJcbiAgICAgICAgLz5cclxuICAgICAgICA8U2VsZWN0Q29tYm9ib3hcclxuICAgICAgICAgIGxhYmVsPXtjb250YWN0TWV0aG9kTGFiZWx9XHJcbiAgICAgICAgICBvcHRpb25zPXtjb250YWN0TWV0aG9kc31cclxuICAgICAgICAgIHZhbHVlPXtjb250YWN0TWV0aG9kfVxyXG4gICAgICAgICAgb25DaGFuZ2U9eyhuZXh0VmFsdWUpID0+IG9uQ29udGFjdE1ldGhvZENoYW5nZShTdHJpbmcobmV4dFZhbHVlID8/IFwiXCIpKX1cclxuICAgICAgICAgIHBsYWNlaG9sZGVyPXtjb250YWN0TWV0aG9kUGxhY2Vob2xkZXJ9XHJcbiAgICAgICAgICBwb3J0YWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxyXG4gICAgICAgIC8+XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgPFZpc2l0TmFycmF0aXZlRmllbGRzXHJcbiAgICAgICAgZGVzY3JpcHRpb25MYWJlbD17ZGVzY3JpcHRpb25MYWJlbH1cclxuICAgICAgICBkZXNjcmlwdGlvblZhbHVlPXtkZXNjcmlwdGlvblZhbHVlfVxyXG4gICAgICAgIGRlc2NyaXB0aW9uQ2xhc3NOYW1lPXtkZXNjcmlwdGlvbkNsYXNzTmFtZX1cclxuICAgICAgICBvbkRlc2NyaXB0aW9uQ2hhbmdlPXtvbkRlc2NyaXB0aW9uQ2hhbmdlfVxyXG4gICAgICAgIHRhcEZpZWxkcz17dGFwRmllbGRzfVxyXG4gICAgICAvPlxyXG5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtM1wiPlxyXG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc20gdGV4dC1zbGF0ZS01MDBcIj57c3RhdHVzfTwvc3Bhbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ3JlYXRlU3RlcFZpc2l0RGV0YWlscztcclxuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IENyZWF0ZUZvcm0gZnJvbSBcIi4vQ3JlYXRlRm9ybS50c3hcIjtcclxuaW1wb3J0IFZpc2l0YXNQYWdlUHJvdmlkZXJzIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvVmlzaXRhc1BhZ2VQcm92aWRlcnMudHN4XCI7XHJcbmltcG9ydCB7IG1vdW50UmVhY3RJc2xhbmQsIG1vdW50V2hlbkRvY3VtZW50UmVhZHkgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvcmVhY3RJc2xhbmQudHN4XCI7XHJcblxyXG4vLyBQYWdlIGVudHJ5IGZvciB0aGUgdmlzaXRhcyBjcmVhdGUgaXNsYW5kLlxyXG5jb25zdCBDcmVhdGVQYWdlID0gKCkgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8VmlzaXRhc1BhZ2VQcm92aWRlcnM+XHJcbiAgICAgIDxDcmVhdGVGb3JtIC8+XHJcbiAgICA8L1Zpc2l0YXNQYWdlUHJvdmlkZXJzPlxyXG4gICk7XHJcbn07XHJcblxyXG5jb25zdCBtb3VudCA9ICgpID0+IHtcclxuICBjb25zdCByb290RWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpc2l0YXMtYXBwLXJvb3RcIik7XHJcbiAgaWYgKCFyb290RWwpIHJldHVybjtcclxuXHJcbiAgbW91bnRSZWFjdElzbGFuZChyb290RWwsIDxDcmVhdGVQYWdlIC8+KTtcclxufTtcclxuXHJcbm1vdW50V2hlbkRvY3VtZW50UmVhZHkobW91bnQpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ3JlYXRlUGFnZTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQyxJQUFBQSxnQkFBNEQ7OztBQ0E3RCxtQkFBMEI7QUFHbkIsSUFBTSxZQUFZLENBQ3ZCLE1BQ0EsV0FDQSxRQUNBLFFBQ0EsT0FBTyxPQUNQLGlCQUFpQixNQUNqQkMsYUFBWSxTQUNUO0FBQ0gsOEJBQVUsTUFBTTtBQUNkLFVBQU0sVUFBVSxTQUFTLGVBQWUsa0JBQWtCO0FBQzFELFVBQU0sT0FBTyxTQUFTLGVBQWUsZUFBZTtBQUNwRCxVQUFNLGNBQWMsU0FBUyxlQUFlLG1CQUFtQjtBQUMvRCxVQUFNLGFBQWEsU0FBUyxlQUFlLGtCQUFrQjtBQUU3RCxRQUFJLFNBQVM7QUFDWCxZQUFNLFVBQVUsU0FBUztBQUN6QixZQUFNLGNBQWNBLGVBQWMsV0FBWSxTQUFTLEtBQUs7QUFDNUQsY0FBUSxNQUFNLGFBQWEsY0FBYyxZQUFZO0FBQ3JELGNBQVEsV0FBVyxDQUFDLGVBQWU7QUFDbkMsY0FBUSxVQUFVLGNBQWMsTUFBTSxPQUFPLElBQUk7QUFDakQsY0FBUTtBQUFBLFFBQ047QUFBQSxRQUNBLFVBQVUsS0FBSyxpQkFBaUIsUUFBUSxJQUFJLEtBQUssZUFBZSxNQUFNO0FBQUEsTUFDeEU7QUFDQSxjQUFRLGFBQWEsaUJBQWlCLFdBQVcsQ0FBQyxpQkFBaUIsU0FBUyxPQUFPO0FBQ25GLGNBQVEsVUFBVSxPQUFPLGNBQWMsV0FBVyxDQUFDLGNBQWM7QUFDakUsY0FBUSxVQUFVLE9BQU8sc0JBQXNCLFdBQVcsQ0FBQyxjQUFjO0FBRXpFLFVBQUksZUFBZSxZQUFZ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QkFBaUI7QUFBQSxVQUNuQjtBQUFBLFVBQ0E7QUFBQSxZQUNFLElBQUk7QUFBQSxZQUNKLE9BQU87QUFBQSxZQUNQLE9BQU87QUFBQSxZQUNQLFdBQVc7QUFBQSxZQUNYLGlCQUFpQjtBQUFBLFVBQ25CO0FBQUEsUUFDRjtBQUFBLFFBQ0E7QUFBQTtBQUFBLElBQ0Y7QUFBQSxLQUVKO0FBRUo7QUFHZSxTQUFSLGFBQThCO0FBQ25DLFNBQ0UsNkNBQUMsNEJBQWlCLGlCQUFpQixLQUFLLCtCQUErQiwwRUFBMEUsR0FDL0ksdURBQUMsY0FBVyxHQUNkO0FBRUo7OztBVXZZTSxJQUFBQyxzQkFBQTtBQUhOLElBQU0sYUFBYSxNQUFNO0FBQ3ZCLFNBQ0UsNkNBQUMsZ0NBQ0MsdURBQUMsY0FBVyxHQUNkO0FBRUo7QUFFQSxJQUFNLFFBQVEsTUFBTTtBQUNsQixRQUFNLFNBQVMsU0FBUyxlQUFlLGtCQUFrQjtBQUN6RCxNQUFJLENBQUMsT0FBUTtBQUViLG1CQUFpQixRQUFRLDZDQUFDLGNBQVcsQ0FBRTtBQUN6QztBQUVBLHVCQUF1QixLQUFLO0FBRTVCLElBQU8scUJBQVE7IiwKICAibmFtZXMiOiBbImltcG9ydF9yZWFjdCIsICJjYW5BY2Nlc3MiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAidmFsdWUiLCAiUmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiUmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIl0KfQo=
