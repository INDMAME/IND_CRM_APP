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
} from "./chunks/chunk-MDVDE6LE.js";
import {
  SingleDatePicker
} from "./chunks/chunk-6BFAITKE.js";
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
} from "./chunks/chunk-FGHGWQVH.js";
import {
  handleComboboxKeyDown
} from "./chunks/chunk-YMDESVRK.js";
import {
  ChevronDownSvg,
  ChevronUpSvg,
  FloatingList_default,
  SelectCombobox_default,
  useOutsideClick
} from "./chunks/chunk-5FRAKTKT.js";
import {
  wait
} from "./chunks/chunk-4BE3ZFCK.js";
import {
  ConfirmModal,
  useConfirmDialog
} from "./chunks/chunk-UXY4YQ3D.js";
import {
  flashActionMark,
  setHistoryFilterForDate
} from "./chunks/chunk-CBDB7NMA.js";
import {
  VisitasPageProviders_default
} from "./chunks/chunk-FBPSAJMQ.js";
import "./chunks/chunk-HGU6IHIX.js";
import {
  Spinner_default,
  canAccess,
  classNames,
  showPermissionModal
} from "./chunks/chunk-EGSPAV7B.js";
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
} from "./chunks/chunk-63VW7TTG.js";
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
          emitOnValueChange: true,
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
        contactMethodLabel: indT("Visits_Detail_ContactMethod_Label", "Contact method"),
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvY3JlYWNpb24vQ3JlYXRlRm9ybS50c3giLCAiLi4vcmVhY3Qvc3JjL2hvb2tzL3VzZVRvcGJhci50cyIsICIuLi9yZWFjdC9zcmMvaG9va3MvdXNlQ3JlYXRlRHJhZnQudHMiLCAiLi4vcmVhY3Qvc3JjL3V0aWxzL2dsb2JhbFNwaW5uZXIudHMiLCAiLi4vcmVhY3Qvc3JjL2hvb2tzL3VzZUNyZWF0ZVN1Ym1pdC50cyIsICIuLi9yZWFjdC9zcmMvdXRpbHMvaW5kSWRzLnRzIiwgIi4uL3JlYWN0L3NyYy9jb21wb25lbnRzL3Zpc2l0YXMvQ29udGFjdHNDb21ib2JveC50c3giLCAiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BoZXJvaWNvbnMvcmVhY3QvMjAvc29saWQvZXNtL1hNYXJrSWNvbi5qcyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9jcmVhY2lvbi9DcmVhdGVTdGVwQ2xpZW50U2VsZWN0aW9uLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9jcmVhY2lvbi9DcmVhdGVTdGVwVmlzaXREZXRhaWxzLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9jcmVhY2lvbi9DcmVhdGVQYWdlLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiXHVGRUZGaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlU3RhdGUsIHVzZVJlZiB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgQ29uZmlybU1vZGFsIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvQ29uZmlybU1vZGFsLnRzeFwiO1xyXG5pbXBvcnQgQXBwRXJyb3JCb3VuZGFyeSBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0FwcEVycm9yQm91bmRhcnkudHN4XCI7XHJcbmltcG9ydCB7IHVzZVZpc2l0YXMgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlVmlzaXRhcy50c1wiO1xyXG5pbXBvcnQgeyB1c2VUYXBHdWFyZCB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VUYXBHdWFyZC50c1wiO1xyXG5pbXBvcnQgeyB1c2VUb3BiYXIgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlVG9wYmFyLnRzXCI7XHJcbmltcG9ydCB7IHVzZUNvbmZpcm1EaWFsb2cgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlQ29uZmlybURpYWxvZy50c1wiO1xyXG5pbXBvcnQgeyB1c2VDcmVhdGVEcmFmdCB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VDcmVhdGVEcmFmdC50c1wiO1xyXG5pbXBvcnQgeyB1c2VDcmVhdGVTdWJtaXQgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlQ3JlYXRlU3VibWl0LnRzXCI7XHJcbmltcG9ydCB7IHVzZVRleHRFZGl0b3JGaWVsZHMgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlVGV4dEVkaXRvckZpZWxkcy50c1wiO1xyXG5pbXBvcnQgQ3JlYXRlU3RlcENsaWVudFNlbGVjdGlvbiwgeyBDcmVhdGVTZWxlY3RlZENsaWVudCwgQ3JlYXRlU2VsZWN0ZWRDb250YWN0IH0gZnJvbSBcIi4vQ3JlYXRlU3RlcENsaWVudFNlbGVjdGlvbi50c3hcIjtcclxuaW1wb3J0IENyZWF0ZVN0ZXBWaXNpdERldGFpbHMgZnJvbSBcIi4vQ3JlYXRlU3RlcFZpc2l0RGV0YWlscy50c3hcIjtcclxuaW1wb3J0IHsgY2xhc3NOYW1lcyB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9jbGFzc05hbWVzLnRzXCI7XHJcbmltcG9ydCB7IGluZEZvcm1hdCwgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB7IGNhbkFjY2Vzcywgc2hvd1Blcm1pc3Npb25Nb2RhbCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9wZXJtaXNzaW9ucy50c1wiO1xyXG5pbXBvcnQgeyBzZXRQcmV2aWV3QW5jaG9yLCBzaG93UHJldmlld1Rvb2x0aXAsIGlzT3ZlcmZsb3dpbmcgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvcHJldmlld1Rvb2x0aXAudHNcIjtcclxuaW1wb3J0IHsgbmF2aWdhdGVUb1RleHRFZGl0b3JGaWVsZCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy90ZXh0RWRpdG9yTmF2aWdhdGlvbi50c1wiO1xyXG5pbXBvcnQgeyBmbGFzaEFjdGlvbk1hcmsgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvdmlzaXRhc0hpc3RvcnkudHNcIjtcclxuXHJcbmZ1bmN0aW9uIFZpc2l0YXNBcHAoKSB7XG4gIGNvbnN0IHsgdmlzaXRUeXBlcywgY29udGFjdE1ldGhvZHMsIGFzaXN0ZW50ZVRpcG9zIH0gPSB1c2VWaXNpdGFzKCk7XG4gIGNvbnN0IGNhbkNyZWF0ZVZpc2l0ID0gY2FuQWNjZXNzKFwiVklTSVRBU19HRVNUSU9OXCIsIFwiQWRkXCIpO1xyXG4gIGNvbnN0IGNhblJvbGxiYWNrRGVsZXRlID0gY2FuQWNjZXNzKFwiVklTSVRBU19HRVNUSU9OXCIsIFwiRnVsbEFjY2Vzc1wiKTtcclxuXHJcbiAgY29uc3QgZmllbGRJZENvbWVudGFyaW9zID0gXCJWaXNpdGEuQ3JlYXRlLkNvbWVudGFyaW9zXCI7XHJcbiAgY29uc3QgZmllbGRJZEFudGVjZWRlbnRlcyA9IFwiVmlzaXRhLkNyZWF0ZS5BbnRlY2VkZW50ZXNcIjtcclxuICBjb25zdCBmaWVsZElkQ29uY2x1c2lvbmVzID0gXCJWaXNpdGEuQ3JlYXRlLkNvbmNsdXNpb25lc1wiO1xyXG5cclxuICBjb25zdCBbc3RlcCwgc2V0U3RlcF0gPSB1c2VTdGF0ZSgxKTtcclxuICBjb25zdCBbc2VsZWN0ZWRDbGllbnQsIHNldFNlbGVjdGVkQ2xpZW50XSA9IHVzZVN0YXRlPENyZWF0ZVNlbGVjdGVkQ2xpZW50PihudWxsKTtcclxuICBjb25zdCBbc2VsZWN0ZWRDb250YWN0cywgc2V0U2VsZWN0ZWRDb250YWN0c10gPSB1c2VTdGF0ZTxDcmVhdGVTZWxlY3RlZENvbnRhY3RbXT4oW10pO1xyXG4gIGNvbnN0IHRvZGF5U3RyaW5nID0gKCkgPT4ge1xyXG4gICAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpO1xyXG4gICAgY29uc3QgeXl5eSA9IHRvZGF5LmdldEZ1bGxZZWFyKCk7XHJcbiAgICBjb25zdCBtbSA9IFN0cmluZyh0b2RheS5nZXRNb250aCgpICsgMSkucGFkU3RhcnQoMiwgXCIwXCIpO1xyXG4gICAgY29uc3QgZGQgPSBTdHJpbmcodG9kYXkuZ2V0RGF0ZSgpKS5wYWRTdGFydCgyLCBcIjBcIik7XHJcbiAgICByZXR1cm4gYCR7eXl5eX0tJHttbX0tJHtkZH1gO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGRlZmF1bHRWaXNpdFR5cGUgPSBTdHJpbmcodmlzaXRUeXBlc1swXT8udmFsdWUgPz8gdmlzaXRUeXBlc1swXT8uVmFsdWUgPz8gXCJcIik7XG4gIGNvbnN0IGRlZmF1bHRDb250YWN0TWV0aG9kID0gU3RyaW5nKGNvbnRhY3RNZXRob2RzWzBdPy52YWx1ZSA/PyBjb250YWN0TWV0aG9kc1swXT8uVmFsdWUgPz8gXCIwXCIpO1xuICBjb25zdCBkZWZhdWx0QXNpc3RlbnRlVGlwbyA9IFN0cmluZyhhc2lzdGVudGVUaXBvc1swXT8udmFsdWUgPz8gYXNpc3RlbnRlVGlwb3NbMF0/LlZhbHVlID8/IFwiMFwiKTtcblxuICBjb25zdCBbdmlzaXRUeXBlLCBzZXRWaXNpdFR5cGVdID0gdXNlU3RhdGU8c3RyaW5nPihkZWZhdWx0VmlzaXRUeXBlKTtcbiAgY29uc3QgW2NvbnRhY3RNZXRob2QsIHNldENvbnRhY3RNZXRob2RdID0gdXNlU3RhdGU8c3RyaW5nPihkZWZhdWx0Q29udGFjdE1ldGhvZCk7XG4gIGNvbnN0IFt0cmFuc0RhdGUsIHNldFRyYW5zRGF0ZV0gPSB1c2VTdGF0ZSgoKSA9PiB0b2RheVN0cmluZygpKTtcbiAgY29uc3QgW2Rlc2NyaXB0aW9uLCBzZXREZXNjcmlwdGlvbl0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbY29tZW50YXJpb3MsIHNldENvbWVudGFyaW9zXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFthbnRlY2VkZW50ZXMsIHNldEFudGVjZWRlbnRlc10gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbY29uY2x1c2lvbmVzLCBzZXRDb25jbHVzaW9uZXNdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW3N0YXR1cywgc2V0U3RhdHVzXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtidXN5LCBzZXRCdXN5XSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbc2hvd1JlcXVpcmVkLCBzZXRTaG93UmVxdWlyZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFttb2RhbEVycm9yLCBzZXRNb2RhbEVycm9yXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG5cclxuICBjb25zdCB7IG1vZGFsLCBvcGVuQ29uZmlybSwgY2xvc2VDb25maXJtLCBoYW5kbGVDb25maXJtIH0gPSB1c2VDb25maXJtRGlhbG9nKHtcclxuICAgIGRlZmF1bHRDb25maXJtVGV4dDogaW5kVChcIkNvbmZpcm1fWWVzXCIsIFwiQ29uZmlybV9ZZXNcIiksXHJcbiAgICBkZWZhdWx0Q2FuY2VsVGV4dDogaW5kVChcIkNvbmZpcm1fTm9cIiwgXCJDb25maXJtX05vXCIpXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZU1vZGFsQ29uZmlybSA9IFJlYWN0LnVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcclxuICAgIHNldE1vZGFsRXJyb3IoXCJcIik7XHJcbiAgICBhd2FpdCBoYW5kbGVDb25maXJtKHtcclxuICAgICAgYnVzeSxcclxuICAgICAgb25FcnJvcjogKG1zZykgPT4ge1xyXG4gICAgICAgIHNldE1vZGFsRXJyb3IobXNnKTtcclxuICAgICAgICBzZXRTdGF0dXMobXNnKTtcclxuICAgICAgICBmbGFzaEFjdGlvbk1hcmsoXCJlcnJvclByb2Nlc3NcIiwgMTUwMCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0sIFtidXN5LCBoYW5kbGVDb25maXJtXSk7XHJcblxyXG4gIGNvbnN0IG1vZGFsTG9hZGluZ1RleHQgPSBpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJDb21tb25fTG9hZGluZ1wiKTtcclxuICBjb25zdCBtb2RhbENhbmNlbFRleHQgPSBtb2RhbC5jYW5jZWxUZXh0IHx8IGluZFQoXCJDb25maXJtX05vXCIsIFwiQ29uZmlybV9Ob1wiKTtcclxuICBjb25zdCBtb2RhbENvbmZpcm1UZXh0ID0gYnVzeVxyXG4gICAgPyBtb2RhbExvYWRpbmdUZXh0XHJcbiAgICA6ICghYnVzeSAmJiBtb2RhbEVycm9yID8gaW5kVChcIkNvbW1vbl9PS1wiLCBcIkNvbW1vbl9PS1wiKSA6IChtb2RhbC5jb25maXJtVGV4dCB8fCBpbmRUKFwiQ29uZmlybV9ZZXNcIiwgXCJDb25maXJtX1llc1wiKSkpO1xyXG5cclxuICBjb25zdCBoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm0gPSBSZWFjdC51c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAoIWJ1c3kgJiYgbW9kYWxFcnJvcikge1xyXG4gICAgICBjbG9zZUNvbmZpcm0oKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaGFuZGxlTW9kYWxDb25maXJtKCk7XHJcbiAgfSwgW2J1c3ksIG1vZGFsRXJyb3IsIGNsb3NlQ29uZmlybSwgaGFuZGxlTW9kYWxDb25maXJtXSk7XHJcblxyXG4gIGNvbnN0IGRyYWZ0U25hcHNob3QgPSB1c2VNZW1vKFxyXG4gICAgKCkgPT4gKHtcclxuICAgICAgc2VsZWN0ZWRDbGllbnQsXHJcbiAgICAgIHNlbGVjdGVkQ29udGFjdHMsXG4gICAgICB2aXNpdFR5cGUsXG4gICAgICBjb250YWN0TWV0aG9kLFxuICAgICAgdHJhbnNEYXRlLFxuICAgICAgZGVzY3JpcHRpb24sXHJcbiAgICAgIGNvbWVudGFyaW9zLFxyXG4gICAgICBhbnRlY2VkZW50ZXMsXHJcbiAgICAgIGNvbmNsdXNpb25lcyxcclxuICAgICAgc3RlcCxcclxuICAgIH0pLFxyXG4gICAgW3NlbGVjdGVkQ2xpZW50LCBzZWxlY3RlZENvbnRhY3RzLCB2aXNpdFR5cGUsIGNvbnRhY3RNZXRob2QsIHRyYW5zRGF0ZSwgZGVzY3JpcHRpb24sIGNvbWVudGFyaW9zLCBhbnRlY2VkZW50ZXMsIGNvbmNsdXNpb25lcywgc3RlcF1cbiAgKTtcblxyXG4gIGNvbnN0IHsgcGVyc2lzdERyYWZ0Tm93IH0gPSB1c2VDcmVhdGVEcmFmdCh7XHJcbiAgICBkcmFmdFNuYXBzaG90LFxyXG4gICAgc2V0U2VsZWN0ZWRDbGllbnQsXHJcbiAgICBzZXRTZWxlY3RlZENvbnRhY3RzLFxuICAgIHNldFZpc2l0VHlwZSxcbiAgICBzZXRDb250YWN0TWV0aG9kLFxuICAgIHNldFRyYW5zRGF0ZSxcbiAgICBzZXREZXNjcmlwdGlvbixcclxuICAgIHNldENvbWVudGFyaW9zLFxyXG4gICAgc2V0QW50ZWNlZGVudGVzLFxyXG4gICAgc2V0Q29uY2x1c2lvbmVzLFxyXG4gICAgc2V0U3RlcCxcclxuICB9KTtcclxuXHJcbiAgLy8gT3BlbnMgdGhlIGZ1bGwtc2NyZWVuIHRleHQgZWRpdG9yIGZvciBhIG11bHRpbGluZSBmaWVsZC5cclxuICBjb25zdCBvcGVuVGV4dEVkaXRvciA9IFJlYWN0LnVzZUNhbGxiYWNrKFxyXG4gICAgKGZpZWxkSWQ6IHN0cmluZywgZmllbGRMYWJlbDogc3RyaW5nLCBmaWVsZFZhbHVlOiBzdHJpbmcsIG9wdGlvbnM6IHsgYWxsb3dFZGl0PzogYm9vbGVhbiB9ID0ge30pID0+IHtcclxuICAgICAgbmF2aWdhdGVUb1RleHRFZGl0b3JGaWVsZCh7XHJcbiAgICAgICAgZmllbGRJZCxcclxuICAgICAgICBmaWVsZExhYmVsLFxyXG4gICAgICAgIGZpZWxkVmFsdWUsXHJcbiAgICAgICAgYWxsb3dFZGl0OiBvcHRpb25zPy5hbGxvd0VkaXQgIT09IGZhbHNlLFxyXG4gICAgICAgIGJlZm9yZU5hdmlnYXRlOiBwZXJzaXN0RHJhZnROb3csXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIFtwZXJzaXN0RHJhZnROb3ddXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQ29tZW50YXJpb3NUYXAgPSBSZWFjdC51c2VDYWxsYmFjaygoZXZlbnQpID0+IHtcclxuICAgIGlmIChidXN5KSByZXR1cm47XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgb3BlblRleHRFZGl0b3IoZmllbGRJZENvbWVudGFyaW9zLCBpbmRUKFwiVmlzaXRzX0ZpZWxkX0NvbW1lbnRzXCIsIFwiQ29tbWVudHNcIiksIGNvbWVudGFyaW9zKTtcclxuICB9LCBbYnVzeSwgY29tZW50YXJpb3MsIG9wZW5UZXh0RWRpdG9yXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUNvbWVudGFyaW9zSG9sZCA9IFJlYWN0LnVzZUNhbGxiYWNrKCh0YXJnZXQsIGNsaWVudFkpID0+IHtcclxuICAgIGlmICghdGFyZ2V0IHx8ICFpc092ZXJmbG93aW5nKHRhcmdldCkpIHJldHVybiBmYWxzZTtcclxuICAgIHNldFByZXZpZXdBbmNob3IodGFyZ2V0KTtcclxuICAgIHJldHVybiBzaG93UHJldmlld1Rvb2x0aXAoU3RyaW5nKGNvbWVudGFyaW9zIHx8IFwiXCIpLCBjbGllbnRZKTtcclxuICB9LCBbY29tZW50YXJpb3NdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQW50ZWNlZGVudGVzVGFwID0gUmVhY3QudXNlQ2FsbGJhY2soKGV2ZW50KSA9PiB7XHJcbiAgICBpZiAoYnVzeSkgcmV0dXJuO1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIG9wZW5UZXh0RWRpdG9yKGZpZWxkSWRBbnRlY2VkZW50ZXMsIGluZFQoXCJWaXNpdHNfRmllbGRfQmFja2dyb3VuZFwiLCBcIkJhY2tncm91bmRcIiksIGFudGVjZWRlbnRlcyk7XHJcbiAgfSwgW2J1c3ksIGFudGVjZWRlbnRlcywgb3BlblRleHRFZGl0b3JdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQW50ZWNlZGVudGVzSG9sZCA9IFJlYWN0LnVzZUNhbGxiYWNrKCh0YXJnZXQsIGNsaWVudFkpID0+IHtcclxuICAgIGlmICghdGFyZ2V0IHx8ICFpc092ZXJmbG93aW5nKHRhcmdldCkpIHJldHVybiBmYWxzZTtcclxuICAgIHNldFByZXZpZXdBbmNob3IodGFyZ2V0KTtcclxuICAgIHJldHVybiBzaG93UHJldmlld1Rvb2x0aXAoU3RyaW5nKGFudGVjZWRlbnRlcyB8fCBcIlwiKSwgY2xpZW50WSk7XHJcbiAgfSwgW2FudGVjZWRlbnRlc10pO1xyXG5cclxuICBjb25zdCBoYW5kbGVDb25jbHVzaW9uZXNUYXAgPSBSZWFjdC51c2VDYWxsYmFjaygoZXZlbnQpID0+IHtcclxuICAgIGlmIChidXN5KSByZXR1cm47XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgb3BlblRleHRFZGl0b3IoZmllbGRJZENvbmNsdXNpb25lcywgaW5kVChcIlZpc2l0c19GaWVsZF9Db25jbHVzaW9uc1wiLCBcIkNvbmNsdXNpb25zXCIpLCBjb25jbHVzaW9uZXMpO1xyXG4gIH0sIFtidXN5LCBjb25jbHVzaW9uZXMsIG9wZW5UZXh0RWRpdG9yXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUNvbmNsdXNpb25lc0hvbGQgPSBSZWFjdC51c2VDYWxsYmFjaygodGFyZ2V0LCBjbGllbnRZKSA9PiB7XHJcbiAgICBpZiAoIXRhcmdldCB8fCAhaXNPdmVyZmxvd2luZyh0YXJnZXQpKSByZXR1cm4gZmFsc2U7XHJcbiAgICBzZXRQcmV2aWV3QW5jaG9yKHRhcmdldCk7XHJcbiAgICByZXR1cm4gc2hvd1ByZXZpZXdUb29sdGlwKFN0cmluZyhjb25jbHVzaW9uZXMgfHwgXCJcIiksIGNsaWVudFkpO1xyXG4gIH0sIFtjb25jbHVzaW9uZXNdKTtcclxuXHJcbiAgY29uc3QgY29tZW50YXJpb3NUYXAgPSB1c2VUYXBHdWFyZChoYW5kbGVDb21lbnRhcmlvc1RhcCwgaGFuZGxlQ29tZW50YXJpb3NIb2xkKTtcclxuICBjb25zdCBhbnRlY2VkZW50ZXNUYXAgPSB1c2VUYXBHdWFyZChoYW5kbGVBbnRlY2VkZW50ZXNUYXAsIGhhbmRsZUFudGVjZWRlbnRlc0hvbGQpO1xyXG4gIGNvbnN0IGNvbmNsdXNpb25lc1RhcCA9IHVzZVRhcEd1YXJkKGhhbmRsZUNvbmNsdXNpb25lc1RhcCwgaGFuZGxlQ29uY2x1c2lvbmVzSG9sZCk7XHJcblxyXG4gIGNvbnN0IHRleHRFZGl0b3JCaW5kaW5ncyA9IHVzZU1lbW8oXHJcbiAgICAoKSA9PiBbXHJcbiAgICAgIHsgZmllbGRJZDogZmllbGRJZENvbWVudGFyaW9zLCBhcHBseVZhbHVlOiBzZXRDb21lbnRhcmlvcyB9LFxyXG4gICAgICB7IGZpZWxkSWQ6IGZpZWxkSWRBbnRlY2VkZW50ZXMsIGFwcGx5VmFsdWU6IHNldEFudGVjZWRlbnRlcyB9LFxyXG4gICAgICB7IGZpZWxkSWQ6IGZpZWxkSWRDb25jbHVzaW9uZXMsIGFwcGx5VmFsdWU6IHNldENvbmNsdXNpb25lcyB9LFxyXG4gICAgXSxcclxuICAgIFtmaWVsZElkQW50ZWNlZGVudGVzLCBmaWVsZElkQ29tZW50YXJpb3MsIGZpZWxkSWRDb25jbHVzaW9uZXNdXHJcbiAgKTtcclxuXHJcbiAgdXNlVGV4dEVkaXRvckZpZWxkcyh0ZXh0RWRpdG9yQmluZGluZ3MpO1xyXG5cclxuICAvLyBDbGVhciBjb250YWN0cyBvbmx5IHdoZW4gdGhlIGNsaWVudCBjaGFuZ2VzIChhdm9pZCBjbGVhcmluZyBvbiByZXN0b3JlL3N0ZXAgMiByZXR1cm4pLlxyXG4gIGNvbnN0IHByZXZDbGllbnRSZWYgPSB1c2VSZWYobnVsbCk7XHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IGN1cnJlbnQgPSBzZWxlY3RlZENsaWVudD8udmFsdWU7XHJcbiAgICBpZiAocHJldkNsaWVudFJlZi5jdXJyZW50ICYmIHByZXZDbGllbnRSZWYuY3VycmVudCAhPT0gY3VycmVudCkge1xyXG4gICAgICBzZXRTZWxlY3RlZENvbnRhY3RzKFtdKTtcclxuICAgIH1cclxuICAgIHByZXZDbGllbnRSZWYuY3VycmVudCA9IGN1cnJlbnQ7XHJcbiAgfSwgW3NlbGVjdGVkQ2xpZW50Py52YWx1ZV0pO1xyXG5cclxuICBjb25zdCBsYXN0Q2xpZW50UmVmID0gdXNlUmVmKG51bGwpO1xyXG5cclxuICAvLyBJZiB0aGUgY2xpZW50IGNoYW5nZXMgYWZ0ZXIgc2VsZWN0aW5nIGNvbnRhY3RzLCByZXNldCB0aGUgZW50aXJlIGZvcm0uXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IGN1cnJlbnQgPSBzZWxlY3RlZENsaWVudD8udmFsdWU7XHJcbiAgICBpZiAoIWN1cnJlbnQpIHJldHVybjtcclxuXHJcbiAgICBpZiAobGFzdENsaWVudFJlZi5jdXJyZW50ICYmIGxhc3RDbGllbnRSZWYuY3VycmVudCAhPT0gY3VycmVudCkge1xyXG4gICAgICBzZXRTdGVwKDEpO1xyXG4gICAgICBzZXRTZWxlY3RlZENvbnRhY3RzKFtdKTtcbiAgICAgIHNldFZpc2l0VHlwZShkZWZhdWx0VmlzaXRUeXBlKTtcbiAgICAgIHNldENvbnRhY3RNZXRob2QoZGVmYXVsdENvbnRhY3RNZXRob2QpO1xuICAgICAgc2V0VHJhbnNEYXRlKHRvZGF5U3RyaW5nKCkpO1xuICAgICAgc2V0RGVzY3JpcHRpb24oXCJcIik7XHJcbiAgICAgIHNldENvbWVudGFyaW9zKFwiXCIpO1xyXG4gICAgICBzZXRBbnRlY2VkZW50ZXMoXCJcIik7XHJcbiAgICAgIHNldENvbmNsdXNpb25lcyhcIlwiKTtcclxuICAgICAgc2V0U3RhdHVzKFwiXCIpO1xyXG4gICAgICBzZXRCdXN5KGZhbHNlKTtcclxuICAgIH1cclxuICAgIGxhc3RDbGllbnRSZWYuY3VycmVudCA9IGN1cnJlbnQ7XHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVhY3QtaG9va3MvZXhoYXVzdGl2ZS1kZXBzXHJcbiAgfSwgW3NlbGVjdGVkQ2xpZW50Py52YWx1ZV0pO1xyXG5cclxuICBjb25zdCBjYW5Hb05leHQgPSAhIXNlbGVjdGVkQ2xpZW50O1xyXG4gIGNvbnN0IGNhbkNyZWF0ZSA9XHJcbiAgICAhIXNlbGVjdGVkQ2xpZW50ICYmXHJcbiAgICBTdHJpbmcodmlzaXRUeXBlIHx8IFwiXCIpLnRyaW0oKSAhPT0gXCJcIiAmJlxyXG4gICAgU3RyaW5nKHZpc2l0VHlwZSkgIT09IFwiMFwiICYmXHJcbiAgICBkZXNjcmlwdGlvbi50cmltKCkubGVuZ3RoID4gMCAmJlxyXG4gICAgY29tZW50YXJpb3MudHJpbSgpLmxlbmd0aCA+IDA7XHJcblxyXG4gIGNvbnN0IGhhc0FjdGl2ZVByb2Nlc3MgPSB1c2VNZW1vKCgpID0+IHtcclxuICAgIGlmIChidXN5KSByZXR1cm4gdHJ1ZTtcclxuICAgIGlmIChzdGVwID4gMSkgcmV0dXJuIHRydWU7XHJcbiAgICBpZiAoc2VsZWN0ZWRDbGllbnQpIHJldHVybiB0cnVlO1xyXG4gICAgaWYgKHNlbGVjdGVkQ29udGFjdHMubGVuZ3RoID4gMCkgcmV0dXJuIHRydWU7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICBkZXNjcmlwdGlvbi50cmltKCkubGVuZ3RoID4gMCB8fFxuICAgICAgY29udGFjdE1ldGhvZCAhPT0gZGVmYXVsdENvbnRhY3RNZXRob2QgfHxcbiAgICAgIGNvbWVudGFyaW9zLnRyaW0oKS5sZW5ndGggPiAwIHx8XG4gICAgICBhbnRlY2VkZW50ZXMudHJpbSgpLmxlbmd0aCA+IDAgfHxcclxuICAgICAgY29uY2x1c2lvbmVzLnRyaW0oKS5sZW5ndGggPiAwXHJcbiAgICApO1xyXG4gIH0sIFthbnRlY2VkZW50ZXMsIGJ1c3ksIGNvbWVudGFyaW9zLCBjb25jbHVzaW9uZXMsIGNvbnRhY3RNZXRob2QsIGRlZmF1bHRDb250YWN0TWV0aG9kLCBkZXNjcmlwdGlvbiwgc2VsZWN0ZWRDbGllbnQsIHNlbGVjdGVkQ29udGFjdHMubGVuZ3RoLCBzdGVwXSk7XG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgd2luZG93Ll9faW5kU2V0TmF2aWdhdGlvbkd1YXJkPy4oaGFzQWN0aXZlUHJvY2Vzcyk7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICB3aW5kb3cuX19pbmRDbGVhck5hdmlnYXRpb25HdWFyZD8uKCk7XHJcbiAgICB9O1xyXG4gIH0sIFtoYXNBY3RpdmVQcm9jZXNzXSk7XHJcblxyXG4gIGNvbnN0IHsgaGFuZGxlU3VibWl0IH0gPSB1c2VDcmVhdGVTdWJtaXQoe1xyXG4gICAgYnVzeSxcclxuICAgIG1vZGFsT3BlbjogbW9kYWwub3BlbixcclxuICAgIGNhbkNyZWF0ZVZpc2l0LFxyXG4gICAgY2FuUm9sbGJhY2tEZWxldGUsXHJcbiAgICBzZWxlY3RlZENsaWVudCxcclxuICAgIHNlbGVjdGVkQ29udGFjdHMsXHJcbiAgICB2aXNpdFR5cGUsXG4gICAgY29udGFjdE1ldGhvZCxcbiAgICBkZWZhdWx0QXNpc3RlbnRlVGlwbyxcbiAgICBkZXNjcmlwdGlvbixcclxuICAgIHRyYW5zRGF0ZSxcclxuICAgIGNvbWVudGFyaW9zLFxyXG4gICAgYW50ZWNlZGVudGVzLFxyXG4gICAgY29uY2x1c2lvbmVzLFxyXG4gICAgc2V0QnVzeSxcclxuICAgIHNldFN0YXR1cyxcclxuICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICBzZXRTaG93UmVxdWlyZWQsXHJcbiAgICBvcGVuQ29uZmlybSxcclxuICAgIGNsb3NlQ29uZmlybSxcclxuICB9KTtcclxuXHJcbiAgY29uc3QgaGFuZGxlVG9wYmFyUHJpbWFyeSA9IFJlYWN0LnVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmICghY2FuQ3JlYXRlVmlzaXQpIHtcclxuICAgICAgc2hvd1Blcm1pc3Npb25Nb2RhbCgpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoc3RlcCA9PT0gMSAmJiBjYW5Hb05leHQpIHNldFN0ZXAoMik7XHJcbiAgICBpZiAoc3RlcCA9PT0gMikgaGFuZGxlU3VibWl0KCk7XHJcbiAgfSwgW2NhbkNyZWF0ZVZpc2l0LCBjYW5Hb05leHQsIGhhbmRsZVN1Ym1pdCwgc3RlcF0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVUb3BiYXJCYWNrID0gUmVhY3QudXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgc2V0U3RlcCgxKTtcclxuICB9LCBbXSk7XHJcblxyXG4gIHVzZVRvcGJhcihzdGVwLCBjYW5Hb05leHQsIGhhbmRsZVRvcGJhclByaW1hcnksIGhhbmRsZVRvcGJhckJhY2ssIGJ1c3ksIGNhbkNyZWF0ZSwgY2FuQ3JlYXRlVmlzaXQpO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKHN0ZXAgPT09IDEpIHtcclxuICAgICAgc2V0U2hvd1JlcXVpcmVkKGZhbHNlKTtcclxuICAgICAgY2xvc2VDb25maXJtKCk7XHJcbiAgICB9XHJcbiAgfSwgW3N0ZXAsIGNsb3NlQ29uZmlybV0pO1xyXG5cclxuICBjb25zdCB2aXNpdFR5cGVJbnZhbGlkID0gc2hvd1JlcXVpcmVkICYmIChTdHJpbmcodmlzaXRUeXBlIHx8IFwiXCIpID09PSBcIlwiIHx8IFN0cmluZyh2aXNpdFR5cGUpID09PSBcIjBcIik7XHJcbiAgY29uc3QgZGVzY3JpcHRpb25JbnZhbGlkID0gc2hvd1JlcXVpcmVkICYmIGRlc2NyaXB0aW9uLnRyaW0oKS5sZW5ndGggPT09IDA7XHJcbiAgY29uc3QgY29tZW50YXJpb3NJbnZhbGlkID0gc2hvd1JlcXVpcmVkICYmIGNvbWVudGFyaW9zLnRyaW0oKS5sZW5ndGggPT09IDA7XHJcbiAgY29uc3QgZGVzY3JpcHRpb25JbnB1dENsYXNzTmFtZSA9IGNsYXNzTmFtZXMoXHJcbiAgICBcImZvcm0tY29udHJvbFwiLFxyXG4gICAgZGVzY3JpcHRpb25JbnZhbGlkXHJcbiAgICAgID8gXCJib3JkZXItcm9zZS00MDAgYmctcm9zZS01MCBmb2N1czpyaW5nLXJvc2UtMjAwIGZvY3VzOmJvcmRlci1yb3NlLTQwMFwiXHJcbiAgICAgIDogXCJib3JkZXItc2xhdGUtMjAwIGZvY3VzOnJpbmctcHJpbWFyeSBmb2N1czpib3JkZXItcHJpbWFyeVwiXHJcbiAgKTtcclxuICBjb25zdCBjb21lbnRhcmlvc0NsYXNzTmFtZSA9IGNsYXNzTmFtZXMoXHJcbiAgICBcImZvcm0tY29udHJvbCBjdXJzb3ItcG9pbnRlclwiLFxyXG4gICAgY29tZW50YXJpb3NJbnZhbGlkXHJcbiAgICAgID8gXCJib3JkZXItcm9zZS00MDAgYmctcm9zZS01MCBmb2N1czpyaW5nLXJvc2UtMjAwIGZvY3VzOmJvcmRlci1yb3NlLTQwMFwiXHJcbiAgICAgIDogXCJib3JkZXItc2xhdGUtMjAwIGZvY3VzOnJpbmctcHJpbWFyeSBmb2N1czpib3JkZXItcHJpbWFyeVwiXHJcbiAgKTtcclxuICBjb25zdCBkZXNjcmlwdGlvbkxhYmVsID0gaW5kVChcIlZpc2l0c19GaWVsZF9EZXNjcmlwdGlvblwiLCBcIkRlc2NyaXB0aW9uXCIpO1xyXG4gIGNvbnN0IGNvbW1lbnRzTGFiZWwgPSBpbmRUKFwiVmlzaXRzX0ZpZWxkX0NvbW1lbnRzXCIsIFwiQ29tbWVudHNcIik7XHJcbiAgY29uc3QgYmFja2dyb3VuZExhYmVsID0gaW5kVChcIlZpc2l0c19GaWVsZF9CYWNrZ3JvdW5kXCIsIFwiQmFja2dyb3VuZFwiKTtcclxuICBjb25zdCBjb25jbHVzaW9uc0xhYmVsID0gaW5kVChcIlZpc2l0c19GaWVsZF9Db25jbHVzaW9uc1wiLCBcIkNvbmNsdXNpb25zXCIpO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTRcIj5cclxuICAgICAgPENvbmZpcm1Nb2RhbFxyXG4gICAgICAgIG9wZW49e21vZGFsLm9wZW59XHJcbiAgICAgICAgdGl0bGU9e21vZGFsLnRpdGxlfVxyXG4gICAgICAgIG1lc3NhZ2U9e21vZGFsLm1lc3NhZ2V9XHJcbiAgICAgICAgY29uZmlybVRleHQ9e21vZGFsQ29uZmlybVRleHR9XHJcbiAgICAgICAgY2FuY2VsVGV4dD17bW9kYWxDYW5jZWxUZXh0fVxyXG4gICAgICAgIGxvYWRpbmdUZXh0PXttb2RhbExvYWRpbmdUZXh0fVxyXG4gICAgICAgIHNob3dDYW5jZWw9e21vZGFsLnNob3dDYW5jZWx9XHJcbiAgICAgICAgc2hvd0NvbmZpcm09e21vZGFsLnNob3dDb25maXJtfVxyXG4gICAgICAgIGJ1c3k9e2J1c3l9XHJcbiAgICAgICAgZXJyb3I9e21vZGFsRXJyb3J9XHJcbiAgICAgICAgc3RhdHVzPXtzdGF0dXN9XHJcbiAgICAgICAgb25Db25maXJtPXtoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm19XHJcbiAgICAgICAgb25DYW5jZWw9e2Nsb3NlQ29uZmlybX1cclxuICAgICAgLz5cclxuICAgICAge3N0ZXAgPT09IDEgJiYgKFxyXG4gICAgICAgIDxDcmVhdGVTdGVwQ2xpZW50U2VsZWN0aW9uXHJcbiAgICAgICAgICBzZWxlY3RlZENsaWVudD17c2VsZWN0ZWRDbGllbnR9XHJcbiAgICAgICAgICBzZWxlY3RlZENvbnRhY3RzPXtzZWxlY3RlZENvbnRhY3RzfVxyXG4gICAgICAgICAgb25DbGllbnRTZWxlY3RlZD17c2V0U2VsZWN0ZWRDbGllbnR9XHJcbiAgICAgICAgICBvbkNvbnRhY3RzQ2hhbmdlPXtzZXRTZWxlY3RlZENvbnRhY3RzfVxyXG4gICAgICAgICAgY2xpZW50TGFiZWw9e2luZFQoXCJIaXN0b3J5X0ZpbHRlcl9DbGllbnRcIiwgXCJBY2NvdW50XCIpfVxyXG4gICAgICAgICAgY2xpZW50UGxhY2Vob2xkZXI9e2luZEZvcm1hdChcIlZpc2l0c19DcmVhdGVfQ2xpZW50UGxhY2Vob2xkZXJcIiwgXCJUeXBlIGF0IGxlYXN0IHswfSBjaGFyYWN0ZXJzLi4uXCIsIDQpfVxyXG4gICAgICAgICAgc2VsZWN0ZWRDb250YWN0c0NvdW50VGV4dD17aW5kRm9ybWF0KFxyXG4gICAgICAgICAgICBcIlZpc2l0c19DcmVhdGVfU2VsZWN0ZWRDb250YWN0c0NvdW50XCIsXHJcbiAgICAgICAgICAgIFwiezB9IHNlbGVjdGVkIGNvbnRhY3QocylcIixcclxuICAgICAgICAgICAgc2VsZWN0ZWRDb250YWN0cy5sZW5ndGhcclxuICAgICAgICAgICl9XHJcbiAgICAgICAgLz5cclxuICAgICAgKX1cclxuXHJcbiAgICAgIHtzdGVwID09PSAyICYmIChcclxuICAgICAgICA8Q3JlYXRlU3RlcFZpc2l0RGV0YWlsc1xyXG4gICAgICAgICAgdGl0bGU9e2luZFQoXCJWaXNpdHNfQ3JlYXRlX1Zpc2l0RGF0YV9UaXRsZVwiLCBcIlZpc2l0IGRldGFpbHNcIil9XG4gICAgICAgICAgZGF0ZUxhYmVsPXtpbmRUKFwiVmlzaXRzX0RldGFpbF9EYXRlX0xhYmVsXCIsIFwiRGF0ZVwiKX1cclxuICAgICAgICAgIHRyYW5zRGF0ZT17dHJhbnNEYXRlfVxyXG4gICAgICAgICAgb25UcmFuc0RhdGVDaGFuZ2U9e3NldFRyYW5zRGF0ZX1cclxuICAgICAgICAgIHZpc2l0VHlwZUxhYmVsPXtpbmRUKFwiVmlzaXRzX0RldGFpbF9WaXNpdFR5cGVfTGFiZWxcIiwgXCJWaXNpdCB0eXBlXCIpfVxuICAgICAgICAgIHZpc2l0VHlwZXM9e3Zpc2l0VHlwZXN9XHJcbiAgICAgICAgICB2aXNpdFR5cGU9e3Zpc2l0VHlwZX1cbiAgICAgICAgICBvblZpc2l0VHlwZUNoYW5nZT17c2V0VmlzaXRUeXBlfVxuICAgICAgICAgIHZpc2l0VHlwZVBsYWNlaG9sZGVyPXtpbmRUKFwiVmlzaXRzX0RldGFpbF9WaXNpdFR5cGVfUGxhY2Vob2xkZXJcIiwgXCJTZWxlY3QgdHlwZVwiKX1cbiAgICAgICAgICB2aXNpdFR5cGVJbnZhbGlkPXt2aXNpdFR5cGVJbnZhbGlkfVxuICAgICAgICAgIGNvbnRhY3RNZXRob2RMYWJlbD17aW5kVChcIlZpc2l0c19EZXRhaWxfQ29udGFjdE1ldGhvZF9MYWJlbFwiLCBcIkNvbnRhY3QgbWV0aG9kXCIpfVxuICAgICAgICAgIGNvbnRhY3RNZXRob2RzPXtjb250YWN0TWV0aG9kc31cbiAgICAgICAgICBjb250YWN0TWV0aG9kPXtjb250YWN0TWV0aG9kfVxuICAgICAgICAgIG9uQ29udGFjdE1ldGhvZENoYW5nZT17c2V0Q29udGFjdE1ldGhvZH1cbiAgICAgICAgICBjb250YWN0TWV0aG9kUGxhY2Vob2xkZXI9e2luZFQoXCJWaXNpdHNfRGV0YWlsX0NvbnRhY3RNZXRob2RfUGxhY2Vob2xkZXJcIiwgXCJTZWxlY3QgbWV0aG9kXCIpfVxuICAgICAgICAgIGRlc2NyaXB0aW9uTGFiZWw9e2Rlc2NyaXB0aW9uTGFiZWx9XG4gICAgICAgICAgZGVzY3JpcHRpb25WYWx1ZT17ZGVzY3JpcHRpb259XHJcbiAgICAgICAgICBkZXNjcmlwdGlvbkNsYXNzTmFtZT17ZGVzY3JpcHRpb25JbnB1dENsYXNzTmFtZX1cclxuICAgICAgICAgIG9uRGVzY3JpcHRpb25DaGFuZ2U9e3NldERlc2NyaXB0aW9ufVxyXG4gICAgICAgICAgdGFwRmllbGRzPXtbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBpZDogXCJjb21lbnRhcmlvc1wiLFxyXG4gICAgICAgICAgICAgIGxhYmVsOiBjb21tZW50c0xhYmVsLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiBjb21lbnRhcmlvcyxcclxuICAgICAgICAgICAgICBjbGFzc05hbWU6IGNvbWVudGFyaW9zQ2xhc3NOYW1lLFxyXG4gICAgICAgICAgICAgIHBvaW50ZXJCaW5kaW5nczogY29tZW50YXJpb3NUYXAsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBpZDogXCJhbnRlY2VkZW50ZXNcIixcclxuICAgICAgICAgICAgICBsYWJlbDogYmFja2dyb3VuZExhYmVsLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiBhbnRlY2VkZW50ZXMsXHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcImZvcm0tY29udHJvbCBjdXJzb3ItcG9pbnRlclwiLFxyXG4gICAgICAgICAgICAgIHBvaW50ZXJCaW5kaW5nczogYW50ZWNlZGVudGVzVGFwLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgaWQ6IFwiY29uY2x1c2lvbmVzXCIsXHJcbiAgICAgICAgICAgICAgbGFiZWw6IGNvbmNsdXNpb25zTGFiZWwsXHJcbiAgICAgICAgICAgICAgdmFsdWU6IGNvbmNsdXNpb25lcyxcclxuICAgICAgICAgICAgICBjbGFzc05hbWU6IFwiZm9ybS1jb250cm9sIGN1cnNvci1wb2ludGVyXCIsXHJcbiAgICAgICAgICAgICAgcG9pbnRlckJpbmRpbmdzOiBjb25jbHVzaW9uZXNUYXAsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICBdfVxyXG4gICAgICAgICAgc3RhdHVzPXtzdGF0dXN9XHJcbiAgICAgICAgLz5cclxuICAgICAgKX1cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn1cclxuXHJcbi8vIENyZWF0ZSBmbG93IFVJIHdyYXBwZWQgYnkgdGhlIGVycm9yIGJvdW5kYXJ5LlxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDcmVhdGVGb3JtKCkge1xyXG4gIHJldHVybiAoXHJcbiAgICA8QXBwRXJyb3JCb3VuZGFyeSBmYWxsYmFja01lc3NhZ2U9e2luZFQoXCJWaXNpdHNfQ3JlYXRlX0Vycm9yQm91bmRhcnlcIiwgXCJBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSByZW5kZXJpbmcgdGhlIHZpc2l0cyBwYWdlLiBSZWxvYWQgYW5kIHRyeSBhZ2Fpbi5cIil9PlxuICAgICAgPFZpc2l0YXNBcHAgLz5cclxuICAgIDwvQXBwRXJyb3JCb3VuZGFyeT5cclxuICApO1xyXG59XHJcbiIsICJpbXBvcnQgeyB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi91dGlscy9pbmRJMThuLnRzXCI7XHJcblxyXG5leHBvcnQgY29uc3QgdXNlVG9wYmFyID0gKFxyXG4gIHN0ZXA6IG51bWJlcixcclxuICBjYW5Hb05leHQ6IGJvb2xlYW4sXHJcbiAgb25OZXh0OiAoKSA9PiB2b2lkLFxyXG4gIG9uUHJldjogKCkgPT4gdm9pZCxcclxuICBidXN5ID0gZmFsc2UsXHJcbiAgY2FuU3VibWl0U3RlcDIgPSB0cnVlLFxyXG4gIGNhbkFjY2VzcyA9IHRydWVcclxuKSA9PiB7XHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IGZvcndhcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdsb2JhbEZvcndhcmRCdG5cIikgYXMgSFRNTEJ1dHRvbkVsZW1lbnQgfCBudWxsO1xyXG4gICAgY29uc3QgYmFjayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2xvYmFsQmFja0J0blwiKSBhcyBIVE1MQnV0dG9uRWxlbWVudCB8IG51bGw7XHJcbiAgICBjb25zdCBmb3J3YXJkSWNvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2xvYmFsRm9yd2FyZEljb25cIik7XHJcbiAgICBjb25zdCBjcmVhdGVJY29uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnbG9iYWxDcmVhdGVJY29uXCIpO1xyXG5cclxuICAgIGlmIChmb3J3YXJkKSB7XHJcbiAgICAgIGNvbnN0IGlzU3RlcDIgPSBzdGVwID09PSAyO1xyXG4gICAgICBjb25zdCBzaG93Rm9yd2FyZCA9IGNhbkFjY2VzcyAmJiAoaXNTdGVwMiB8fCAoc3RlcCA9PT0gMSAmJiBjYW5Hb05leHQpKTtcclxuICAgICAgZm9yd2FyZC5zdHlsZS52aXNpYmlsaXR5ID0gc2hvd0ZvcndhcmQgPyBcInZpc2libGVcIiA6IFwiaGlkZGVuXCI7XHJcbiAgICAgIGZvcndhcmQuZGlzYWJsZWQgPSAhc2hvd0ZvcndhcmQgfHwgYnVzeTtcclxuICAgICAgZm9yd2FyZC5vbmNsaWNrID0gc2hvd0ZvcndhcmQgPyAoKSA9PiBvbk5leHQoKSA6IG51bGw7XHJcbiAgICAgIGZvcndhcmQuc2V0QXR0cmlidXRlKFxyXG4gICAgICAgIFwiYXJpYS1sYWJlbFwiLFxyXG4gICAgICAgIGlzU3RlcDIgPyBpbmRUKFwiQ29tbW9uX0NyZWF0ZVwiLCBcIkNyZWF0ZVwiKSA6IGluZFQoXCJDb21tb25fTmV4dFwiLCBcIk5leHRcIilcclxuICAgICAgKTtcclxuICAgICAgZm9yd2FyZC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWRpc2FibGVkXCIsIGlzU3RlcDIgJiYgIWNhblN1Ym1pdFN0ZXAyID8gXCJ0cnVlXCIgOiBcImZhbHNlXCIpO1xyXG4gICAgICBmb3J3YXJkLmNsYXNzTGlzdC50b2dnbGUoXCJvcGFjaXR5LTUwXCIsIGlzU3RlcDIgJiYgIWNhblN1Ym1pdFN0ZXAyKTtcclxuICAgICAgZm9yd2FyZC5jbGFzc0xpc3QudG9nZ2xlKFwiY3Vyc29yLW5vdC1hbGxvd2VkXCIsIGlzU3RlcDIgJiYgIWNhblN1Ym1pdFN0ZXAyKTtcclxuXHJcbiAgICAgIGlmIChmb3J3YXJkSWNvbiAmJiBjcmVhdGVJY29uKSB7XHJcbiAgICAgICAgaWYgKGlzU3RlcDIpIHtcclxuICAgICAgICAgIGZvcndhcmRJY29uLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XHJcbiAgICAgICAgICBjcmVhdGVJY29uLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGZvcndhcmRJY29uLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XHJcbiAgICAgICAgICBjcmVhdGVJY29uLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoYmFjaykge1xyXG4gICAgICBjb25zdCBzaG93QmFjayA9IGNhbkFjY2VzcyAmJiBzdGVwID09PSAyO1xyXG4gICAgICBiYWNrLnN0eWxlLnZpc2liaWxpdHkgPSBzaG93QmFjayA/IFwidmlzaWJsZVwiIDogXCJoaWRkZW5cIjtcclxuICAgICAgYmFjay5kaXNhYmxlZCA9ICFzaG93QmFjayB8fCBidXN5O1xyXG4gICAgICBiYWNrLm9uY2xpY2sgPSBzaG93QmFjayA/ICgpID0+IG9uUHJldigpIDogbnVsbDtcclxuICAgIH1cclxuICB9LCBbc3RlcCwgY2FuR29OZXh0LCBvbk5leHQsIG9uUHJldiwgYnVzeSwgY2FuU3VibWl0U3RlcDIsIGNhbkFjY2Vzc10pO1xyXG59O1xyXG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlUmVmIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IHNob3dHbG9iYWxTcGlubmVyLCBoaWRlR2xvYmFsU3Bpbm5lciB9IGZyb20gXCIuLi91dGlscy9nbG9iYWxTcGlubmVyLnRzXCI7XHJcbmltcG9ydCB7XHJcbiAgQ1JFQVRFX0ZSRVNIX1BBUkFNLFxyXG4gIFZJU0lUX0RSQUZUX0tFWSxcclxuICBDT05UQUNUU19TVE9SQUdFX0tFWSxcclxuICBDT05UQUNUU19TRUxFQ1RJT05fS0VZLFxyXG4gIGNsZWFyQ3JlYXRlU2VsZWN0aW9uQ2FjaGUsXHJcbiAgc3RyaXBGcmVzaFBhcmFtLFxyXG59IGZyb20gXCIuLi91dGlscy92aXNpdGFzU3RvcmFnZS50c1wiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHsgZ2V0U2Vzc2lvbkpzb25XaXRoRXhwaXJ5LCBnZXRTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5LCBzZXRTZXNzaW9uSnNvbldpdGhFeHBpcnkgfSBmcm9tIFwiLi4vdXRpbHMvc2Vzc2lvbkV4cGlyeS50c1wiO1xyXG5cclxuY29uc3QgQ1JFQVRFX0RSQUZUX1RUTF9NUyA9IDI0ICogNjAgKiA2MCAqIDEwMDA7XHJcblxyXG50eXBlIERyYWZ0U25hcHNob3QgPSB7XHJcbiAgc2VsZWN0ZWRDbGllbnQ6IGFueTtcbiAgc2VsZWN0ZWRDb250YWN0czogYW55W107XG4gIHZpc2l0VHlwZTogc3RyaW5nO1xuICBjb250YWN0TWV0aG9kOiBzdHJpbmc7XG4gIHRyYW5zRGF0ZTogc3RyaW5nO1xuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xyXG4gIGNvbWVudGFyaW9zOiBzdHJpbmc7XHJcbiAgYW50ZWNlZGVudGVzOiBzdHJpbmc7XHJcbiAgY29uY2x1c2lvbmVzOiBzdHJpbmc7XHJcbiAgc3RlcDogbnVtYmVyO1xyXG59O1xyXG5cclxudHlwZSBVc2VDcmVhdGVEcmFmdEFyZ3MgPSB7XHJcbiAgZHJhZnRTbmFwc2hvdDogRHJhZnRTbmFwc2hvdDtcclxuICBzZXRTZWxlY3RlZENsaWVudDogKHZhbHVlOiBhbnkpID0+IHZvaWQ7XHJcbiAgc2V0U2VsZWN0ZWRDb250YWN0czogKHZhbHVlOiBhbnlbXSkgPT4gdm9pZDtcbiAgc2V0VmlzaXRUeXBlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgc2V0Q29udGFjdE1ldGhvZDogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHNldFRyYW5zRGF0ZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHNldERlc2NyaXB0aW9uOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBzZXRDb21lbnRhcmlvczogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgc2V0QW50ZWNlZGVudGVzOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBzZXRDb25jbHVzaW9uZXM6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIHNldFN0ZXA6ICh2YWx1ZTogbnVtYmVyKSA9PiB2b2lkO1xyXG59O1xyXG5cclxuLy8gSGFuZGxlcyB2aXNpdC1jcmVhdGUgZHJhZnQgc2F2ZS9yZXN0b3JlIGxpZmVjeWNsZS5cclxuZXhwb3J0IGNvbnN0IHVzZUNyZWF0ZURyYWZ0ID0gKHtcclxuICBkcmFmdFNuYXBzaG90LFxyXG4gIHNldFNlbGVjdGVkQ2xpZW50LFxyXG4gIHNldFNlbGVjdGVkQ29udGFjdHMsXG4gIHNldFZpc2l0VHlwZSxcbiAgc2V0Q29udGFjdE1ldGhvZCxcbiAgc2V0VHJhbnNEYXRlLFxuICBzZXREZXNjcmlwdGlvbixcclxuICBzZXRDb21lbnRhcmlvcyxcclxuICBzZXRBbnRlY2VkZW50ZXMsXHJcbiAgc2V0Q29uY2x1c2lvbmVzLFxyXG4gIHNldFN0ZXAsXHJcbn06IFVzZUNyZWF0ZURyYWZ0QXJncykgPT4ge1xyXG4gIGNvbnN0IGRyYWZ0UmVzdG9yZWRSZWYgPSB1c2VSZWYoZmFsc2UpO1xyXG4gIGNvbnN0IGRyYWZ0UGVyc2lzdFRpbWVyUmVmID0gdXNlUmVmPG51bWJlciB8IG51bGw+KG51bGwpO1xyXG5cclxuICBjb25zdCBwZXJzaXN0RHJhZnRTbmFwc2hvdCA9IHVzZUNhbGxiYWNrKChkcmFmdDogRHJhZnRTbmFwc2hvdCkgPT4ge1xyXG4gICAgc2V0U2Vzc2lvbkpzb25XaXRoRXhwaXJ5KFZJU0lUX0RSQUZUX0tFWSwgZHJhZnQsIENSRUFURV9EUkFGVF9UVExfTVMpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgcGVyc2lzdERyYWZ0Tm93ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgcGVyc2lzdERyYWZ0U25hcHNob3QoZHJhZnRTbmFwc2hvdCk7XHJcbiAgfSwgW2RyYWZ0U25hcHNob3QsIHBlcnNpc3REcmFmdFNuYXBzaG90XSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIWRyYWZ0UmVzdG9yZWRSZWYuY3VycmVudCkgcmV0dXJuO1xyXG5cclxuICAgIGlmIChkcmFmdFBlcnNpc3RUaW1lclJlZi5jdXJyZW50KSB7XHJcbiAgICAgIGNsZWFyVGltZW91dChkcmFmdFBlcnNpc3RUaW1lclJlZi5jdXJyZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBkcmFmdFBlcnNpc3RUaW1lclJlZi5jdXJyZW50ID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBkcmFmdFBlcnNpc3RUaW1lclJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgcGVyc2lzdERyYWZ0U25hcHNob3QoZHJhZnRTbmFwc2hvdCk7XHJcbiAgICB9LCAxODApO1xyXG5cclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIGlmIChkcmFmdFBlcnNpc3RUaW1lclJlZi5jdXJyZW50KSB7XHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KGRyYWZ0UGVyc2lzdFRpbWVyUmVmLmN1cnJlbnQpO1xyXG4gICAgICAgIGRyYWZ0UGVyc2lzdFRpbWVyUmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH0sIFtkcmFmdFNuYXBzaG90LCBwZXJzaXN0RHJhZnRTbmFwc2hvdF0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgbGV0IGZyZXNoTG9hZCA9IGZhbHNlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgdXJsID0gbmV3IFVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XHJcbiAgICAgIGZyZXNoTG9hZCA9IHVybC5zZWFyY2hQYXJhbXMuaGFzKENSRUFURV9GUkVTSF9QQVJBTSk7XHJcbiAgICB9IGNhdGNoIHtcclxuICAgICAgZnJlc2hMb2FkID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGZyZXNoTG9hZCkge1xyXG4gICAgICBjbGVhckNyZWF0ZVNlbGVjdGlvbkNhY2hlKCk7XHJcbiAgICAgIHN0cmlwRnJlc2hQYXJhbSgpO1xyXG4gICAgICBkcmFmdFJlc3RvcmVkUmVmLmN1cnJlbnQgPSB0cnVlO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHNob3VsZFNob3cgPSBmYWxzZTtcclxuICAgIHRyeSB7XHJcbiAgICAgIHNob3VsZFNob3cgPSAhIShcclxuICAgICAgICBnZXRTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KFZJU0lUX0RSQUZUX0tFWSkgfHxcclxuICAgICAgICBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKENPTlRBQ1RTX1NUT1JBR0VfS0VZKSB8fFxyXG4gICAgICAgIHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oQ09OVEFDVFNfU0VMRUNUSU9OX0tFWSlcclxuICAgICAgKTtcclxuICAgIH0gY2F0Y2gge1xyXG4gICAgICAvLyBJZ25vcmUgc3RvcmFnZSBhY2Nlc3MgZXJyb3JzLlxyXG4gICAgfVxyXG4gICAgaWYgKHNob3VsZFNob3cpIHtcclxuICAgICAgc2hvd0dsb2JhbFNwaW5uZXIoaW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKSk7XHJcbiAgICB9XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBkcmFmdCA9IGdldFNlc3Npb25Kc29uV2l0aEV4cGlyeTxEcmFmdFNuYXBzaG90PihWSVNJVF9EUkFGVF9LRVkpO1xyXG4gICAgICBpZiAoZHJhZnQ/LnNlbGVjdGVkQ2xpZW50Py52YWx1ZSkgc2V0U2VsZWN0ZWRDbGllbnQoZHJhZnQuc2VsZWN0ZWRDbGllbnQpO1xyXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShkcmFmdD8uc2VsZWN0ZWRDb250YWN0cykpIHNldFNlbGVjdGVkQ29udGFjdHMoZHJhZnQuc2VsZWN0ZWRDb250YWN0cyk7XG4gICAgICBpZiAoZHJhZnQ/LnZpc2l0VHlwZSAhPT0gdW5kZWZpbmVkKSBzZXRWaXNpdFR5cGUoZHJhZnQudmlzaXRUeXBlKTtcbiAgICAgIGlmIChkcmFmdD8uY29udGFjdE1ldGhvZCAhPT0gdW5kZWZpbmVkKSBzZXRDb250YWN0TWV0aG9kKGRyYWZ0LmNvbnRhY3RNZXRob2QpO1xuICAgICAgaWYgKGRyYWZ0Py50cmFuc0RhdGUpIHNldFRyYW5zRGF0ZShkcmFmdC50cmFuc0RhdGUpO1xuICAgICAgaWYgKGRyYWZ0Py5kZXNjcmlwdGlvbiAhPT0gdW5kZWZpbmVkKSBzZXREZXNjcmlwdGlvbihkcmFmdC5kZXNjcmlwdGlvbik7XHJcbiAgICAgIGlmIChkcmFmdD8uY29tZW50YXJpb3MgIT09IHVuZGVmaW5lZCkgc2V0Q29tZW50YXJpb3MoZHJhZnQuY29tZW50YXJpb3MpO1xyXG4gICAgICBpZiAoZHJhZnQ/LmFudGVjZWRlbnRlcyAhPT0gdW5kZWZpbmVkKSBzZXRBbnRlY2VkZW50ZXMoZHJhZnQuYW50ZWNlZGVudGVzKTtcclxuICAgICAgaWYgKGRyYWZ0Py5jb25jbHVzaW9uZXMgIT09IHVuZGVmaW5lZCkgc2V0Q29uY2x1c2lvbmVzKGRyYWZ0LmNvbmNsdXNpb25lcyk7XHJcbiAgICAgIGlmIChkcmFmdD8uc3RlcCA9PT0gMikgc2V0U3RlcCgyKTtcclxuICAgIH0gY2F0Y2gge1xyXG4gICAgICAvLyBJZ25vcmUgbWFsZm9ybWVkIGRyYWZ0IHBheWxvYWRzLlxyXG4gICAgfSBmaW5hbGx5IHtcclxuICAgICAgaWYgKHNob3VsZFNob3cpIHtcclxuICAgICAgICBoaWRlR2xvYmFsU3Bpbm5lcigpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBkcmFmdFJlc3RvcmVkUmVmLmN1cnJlbnQgPSB0cnVlO1xyXG4gIH0sIFtcclxuICAgIHNldEFudGVjZWRlbnRlcyxcclxuICAgIHNldENvbWVudGFyaW9zLFxyXG4gICAgc2V0Q29uY2x1c2lvbmVzLFxyXG4gICAgc2V0RGVzY3JpcHRpb24sXHJcbiAgICBzZXRTZWxlY3RlZENsaWVudCxcclxuICAgIHNldFNlbGVjdGVkQ29udGFjdHMsXG4gICAgc2V0U3RlcCxcbiAgICBzZXRDb250YWN0TWV0aG9kLFxuICAgIHNldFRyYW5zRGF0ZSxcbiAgICBzZXRWaXNpdFR5cGUsXHJcbiAgXSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBwZXJzaXN0RHJhZnROb3csXHJcbiAgfTtcclxufTtcclxuIiwgImV4cG9ydCBjb25zdCBzaG93R2xvYmFsU3Bpbm5lciA9IChtZXNzYWdlPzogc3RyaW5nKSA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiB3aW5kb3cuX19pbmRTaG93R2xvYmFsU3Bpbm5lciA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgIHdpbmRvdy5fX2luZFNob3dHbG9iYWxTcGlubmVyKG1lc3NhZ2UpO1xyXG4gICAgfVxyXG4gIH0gY2F0Y2gge1xyXG4gICAgLy8gaWdub3JlXHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGhpZGVHbG9iYWxTcGlubmVyID0gKCkgPT4ge1xyXG4gIHRyeSB7XHJcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2Ygd2luZG93Ll9faW5kSGlkZUdsb2JhbFNwaW5uZXIgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICB3aW5kb3cuX19pbmRIaWRlR2xvYmFsU3Bpbm5lcigpO1xyXG4gICAgfVxyXG4gIH0gY2F0Y2gge1xyXG4gICAgLy8gaWdub3JlXHJcbiAgfVxyXG59O1xyXG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2sgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgZmV0Y2hKc29uIH0gZnJvbSBcIi4uL3NlcnZpY2VzL2FwaVNlcnZpY2UudHNcIjtcclxuaW1wb3J0IHsgaW5kRXh0cmFjdElkLCBpbmRFeHRyYWN0U2lnbmVkSWQgfSBmcm9tIFwiLi4vdXRpbHMvaW5kSWRzLnRzXCI7XHJcbmltcG9ydCB7IGluZEZvcm1hdCwgaW5kVCB9IGZyb20gXCIuLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB7IHNob3dQZXJtaXNzaW9uTW9kYWwgfSBmcm9tIFwiLi4vdXRpbHMvcGVybWlzc2lvbnMudHNcIjtcclxuaW1wb3J0IHsgZmxhc2hBY3Rpb25NYXJrLCBzZXRIaXN0b3J5RmlsdGVyRm9yRGF0ZSB9IGZyb20gXCIuLi91dGlscy92aXNpdGFzSGlzdG9yeS50c1wiO1xyXG5pbXBvcnQgeyBWSVNJVF9EUkFGVF9LRVkgfSBmcm9tIFwiLi4vdXRpbHMvdmlzaXRhc1N0b3JhZ2UudHNcIjtcclxuaW1wb3J0IHsgd2FpdCB9IGZyb20gXCIuLi91dGlscy93YWl0LnRzXCI7XHJcblxyXG50eXBlIENvbnRhY3RPcHRpb24gPSB7XHJcbiAgdmFsdWU6IHN0cmluZztcclxuICB0ZXh0OiBzdHJpbmc7XHJcbn07XHJcblxyXG50eXBlIExlZ2FjeUNvbW1hbmRSZXNwb25zZSA9IHtcclxuICBzdWNjZXNzPzogYm9vbGVhbjtcclxuICBtZXNzYWdlPzogc3RyaW5nO1xyXG4gIGRhdGE/OiB1bmtub3duO1xyXG4gIFN1Y2Nlc3M/OiBib29sZWFuO1xyXG4gIE1lc3NhZ2U/OiBzdHJpbmc7XHJcbiAgRGF0YT86IHVua25vd247XHJcbn07XHJcblxyXG5jb25zdCBnZXRMZWdhY3lSZXNwb25zZVN1Y2Nlc3MgPSAocmVzcG9uc2U6IExlZ2FjeUNvbW1hbmRSZXNwb25zZSk6IGJvb2xlYW4gPT4ge1xyXG4gIHJldHVybiByZXNwb25zZS5zdWNjZXNzID09PSB0cnVlIHx8IHJlc3BvbnNlLlN1Y2Nlc3MgPT09IHRydWU7XHJcbn07XHJcblxyXG5jb25zdCBnZXRMZWdhY3lSZXNwb25zZU1lc3NhZ2UgPSAocmVzcG9uc2U6IExlZ2FjeUNvbW1hbmRSZXNwb25zZSk6IHN0cmluZyA9PiB7XHJcbiAgY29uc3QgcmF3TWVzc2FnZSA9IHJlc3BvbnNlLm1lc3NhZ2UgPz8gcmVzcG9uc2UuTWVzc2FnZTtcclxuICByZXR1cm4gdHlwZW9mIHJhd01lc3NhZ2UgPT09IFwic3RyaW5nXCIgPyByYXdNZXNzYWdlLnRyaW0oKSA6IFwiXCI7XHJcbn07XHJcblxyXG5jb25zdCBnZXRMZWdhY3lSZXNwb25zZURhdGEgPSAocmVzcG9uc2U6IExlZ2FjeUNvbW1hbmRSZXNwb25zZSk6IHVua25vd24gPT4ge1xuICByZXR1cm4gcmVzcG9uc2UuZGF0YSA/PyByZXNwb25zZS5EYXRhO1xufTtcblxuY29uc3QgaXNSZWNvcmQgPSAodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiA9PiB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiYgdmFsdWUgIT09IG51bGwgJiYgIUFycmF5LmlzQXJyYXkodmFsdWUpO1xufTtcblxuY29uc3QgcmVhZFN0cmluZ0xpa2UgPSAodmFsdWU6IHVua25vd24pOiBzdHJpbmcgPT4ge1xuICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiIHx8IHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIikgcmV0dXJuIFN0cmluZyh2YWx1ZSkudHJpbSgpO1xuICByZXR1cm4gXCJcIjtcbn07XG5cbmNvbnN0IHJlYWRGaXJzdFN0cmluZ0xpa2VQcm9wZXJ0eSA9ICh2YWx1ZTogdW5rbm93biwga2V5czogc3RyaW5nW10pOiB7IHZhbHVlOiBzdHJpbmc7IHNvdXJjZTogc3RyaW5nIH0gPT4ge1xuICBpZiAoIWlzUmVjb3JkKHZhbHVlKSkgcmV0dXJuIHsgdmFsdWU6IFwiXCIsIHNvdXJjZTogXCJcIiB9O1xuICBmb3IgKGNvbnN0IGtleSBvZiBrZXlzKSB7XG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwga2V5KSkge1xuICAgICAgY29uc3QgY2FuZGlkYXRlID0gcmVhZFN0cmluZ0xpa2UodmFsdWVba2V5XSk7XG4gICAgICBpZiAoY2FuZGlkYXRlKSByZXR1cm4geyB2YWx1ZTogY2FuZGlkYXRlLCBzb3VyY2U6IGtleSB9O1xuICAgIH1cbiAgfVxuICByZXR1cm4geyB2YWx1ZTogXCJcIiwgc291cmNlOiBcIlwiIH07XG59O1xuXG5jb25zdCBleHRyYWN0Q3JlYXRlQWN0aXZpdHlSZWNJZEZyb21EYXRhID0gKGRhdGE6IHVua25vd24pOiBzdHJpbmcgPT4ge1xuICBpZiAodHlwZW9mIGRhdGEgPT09IFwic3RyaW5nXCIgfHwgdHlwZW9mIGRhdGEgPT09IFwibnVtYmVyXCIpIHJldHVybiBpbmRFeHRyYWN0U2lnbmVkSWQoZGF0YSk7XG4gIGNvbnN0IGNhbmRpZGF0ZSA9IHJlYWRGaXJzdFN0cmluZ0xpa2VQcm9wZXJ0eShkYXRhLCBbXG4gICAgXCJSZWNJZFwiLFxuICAgIFwicmVjSWRcIixcbiAgICBcIlJlZlJlY0lkXCIsXG4gICAgXCJyZWZSZWNJZFwiLFxuICAgIFwiUmVmUmVjSWRBY3RpdmlkYWRcIixcbiAgICBcInJlZlJlY0lkQWN0aXZpZGFkXCIsXG4gICAgXCJBY3RpdmlkYWRSZWNJZFwiLFxuICAgIFwiYWN0aXZpZGFkUmVjSWRcIixcbiAgXSk7XG4gIHJldHVybiBjYW5kaWRhdGUudmFsdWUgPyBpbmRFeHRyYWN0U2lnbmVkSWQoY2FuZGlkYXRlLnZhbHVlKSA6IFwiXCI7XG59O1xuXG5jb25zdCByZXNvbHZlQ3JlYXRlQWN0aXZpdHlSZWNJZCA9IChyZXNwb25zZTogTGVnYWN5Q29tbWFuZFJlc3BvbnNlKTogc3RyaW5nID0+IHtcbiAgY29uc3QgZGF0YSA9IGdldExlZ2FjeVJlc3BvbnNlRGF0YShyZXNwb25zZSk7XG4gIHJldHVybiAoXG4gICAgZXh0cmFjdENyZWF0ZUFjdGl2aXR5UmVjSWRGcm9tRGF0YShkYXRhKSB8fFxuICAgIGluZEV4dHJhY3RTaWduZWRJZChnZXRMZWdhY3lSZXNwb25zZU1lc3NhZ2UocmVzcG9uc2UpKSB8fFxuICAgIGluZEV4dHJhY3RTaWduZWRJZChpbmRFeHRyYWN0SWQoZGF0YSkgfHwgaW5kRXh0cmFjdElkKGdldExlZ2FjeVJlc3BvbnNlTWVzc2FnZShyZXNwb25zZSkpKVxuICApO1xufTtcblxuY29uc3QgcmVzb2x2ZUNyZWF0ZUFjdGl2aXR5T3duZXJGb3JEaWFnbm9zdGljcyA9IChkYXRhOiB1bmtub3duKTogeyB2YWx1ZTogc3RyaW5nOyBzb3VyY2U6IHN0cmluZyB9ID0+IHtcbiAgcmV0dXJuIHJlYWRGaXJzdFN0cmluZ0xpa2VQcm9wZXJ0eShkYXRhLCBbXG4gICAgXCJPd25lckF4VXNlcklkXCIsXG4gICAgXCJvd25lckF4VXNlcklkXCIsXG4gICAgXCJJTkRDcmVhdGVkQnlVc2VySWRcIixcbiAgICBcImluZENyZWF0ZWRCeVVzZXJJZFwiLFxuICAgIFwiQ3JlYXRlZEJ5VXNlcklkXCIsXG4gICAgXCJjcmVhdGVkQnlVc2VySWRcIixcbiAgICBcIlVzZXJJZFwiLFxuICAgIFwidXNlcklkXCIsXG4gIF0pO1xufTtcblxuY29uc3QgbG9nQ3JlYXRlQWN0aXZpdHlEaWFnbm9zdGljcyA9IChyZXNwb25zZTogTGVnYWN5Q29tbWFuZFJlc3BvbnNlLCByZWNJZDogc3RyaW5nKTogdm9pZCA9PiB7XG4gIGNvbnN0IGRlYnVnRmxhZyA9XG4gICAgdHlwZW9mIGdsb2JhbFRoaXMgIT09IFwidW5kZWZpbmVkXCIgJiZcbiAgICAoKChnbG9iYWxUaGlzIGFzIHsgX19JTkRfREVCVUdfQ1JFQVRFX18/OiB1bmtub3duIH0pLl9fSU5EX0RFQlVHX0NSRUFURV9fID09PSB0cnVlKSB8fFxuICAgICAgKChnbG9iYWxUaGlzIGFzIHsgX19JTkRfREVCVUdfVklTSVRBU19fPzogdW5rbm93biB9KS5fX0lORF9ERUJVR19WSVNJVEFTX18gPT09IHRydWUpKTtcbiAgaWYgKCFkZWJ1Z0ZsYWcpIHJldHVybjtcblxuICBjb25zdCBvd25lciA9IHJlc29sdmVDcmVhdGVBY3Rpdml0eU93bmVyRm9yRGlhZ25vc3RpY3MoZ2V0TGVnYWN5UmVzcG9uc2VEYXRhKHJlc3BvbnNlKSk7XG4gIGNvbnNvbGUuZGVidWcoXCJbVmlzaXRzQ3JlYXRlXVwiLCBcImFjdGl2aXR5OmNyZWF0ZS1yZXNwb25zZVwiLCB7XG4gICAgcmVjSWQsXG4gICAgb3duZXJBeFVzZXJJZDogb3duZXIudmFsdWUsXG4gICAgb3duZXJTb3VyY2U6IG93bmVyLnNvdXJjZSxcbiAgfSk7XG59O1xuXG4vLyBDb252ZXJ0cyBzZWxlY3QgdmFsdWVzIHRvIG51bWVyaWMgZW51bSBwYXlsb2FkIHZhbHVlcy5cbmNvbnN0IHRvTnVsbGFibGVFbnVtTnVtYmVyID0gKHZhbHVlOiBzdHJpbmcpOiBudW1iZXIgfCBudWxsID0+IHtcbiAgY29uc3QgcGFyc2VkID0gTnVtYmVyKHZhbHVlKTtcbiAgcmV0dXJuIE51bWJlci5pc0ludGVnZXIocGFyc2VkKSAmJiBwYXJzZWQgPj0gMCA/IHBhcnNlZCA6IG51bGw7XG59O1xuXG50eXBlIFVzZUNyZWF0ZVN1Ym1pdEFyZ3MgPSB7XG4gIGJ1c3k6IGJvb2xlYW47XHJcbiAgbW9kYWxPcGVuOiBib29sZWFuO1xyXG4gIGNhbkNyZWF0ZVZpc2l0OiBib29sZWFuO1xyXG4gIGNhblJvbGxiYWNrRGVsZXRlOiBib29sZWFuO1xyXG4gIHNlbGVjdGVkQ2xpZW50OiB7IHZhbHVlOiBzdHJpbmcgfSB8IG51bGw7XG4gIHNlbGVjdGVkQ29udGFjdHM6IENvbnRhY3RPcHRpb25bXTtcbiAgdmlzaXRUeXBlOiBzdHJpbmc7XG4gIGNvbnRhY3RNZXRob2Q6IHN0cmluZztcbiAgZGVmYXVsdEFzaXN0ZW50ZVRpcG86IHN0cmluZztcbiAgZGVzY3JpcHRpb246IHN0cmluZztcclxuICB0cmFuc0RhdGU6IHN0cmluZztcclxuICBjb21lbnRhcmlvczogc3RyaW5nO1xyXG4gIGFudGVjZWRlbnRlczogc3RyaW5nO1xyXG4gIGNvbmNsdXNpb25lczogc3RyaW5nO1xyXG4gIHNldEJ1c3k6ICh2YWx1ZTogYm9vbGVhbikgPT4gdm9pZDtcclxuICBzZXRTdGF0dXM6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIHNldE1vZGFsRXJyb3I6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIHNldFNob3dSZXF1aXJlZDogKHZhbHVlOiBib29sZWFuKSA9PiB2b2lkO1xyXG4gIG9wZW5Db25maXJtOiAob3B0czoge1xyXG4gICAgdGl0bGU6IHN0cmluZztcclxuICAgIG1lc3NhZ2U6IHN0cmluZztcclxuICAgIGNvbmZpcm1UZXh0Pzogc3RyaW5nO1xyXG4gICAgb25Db25maXJtPzogKCkgPT4gUHJvbWlzZTxib29sZWFuIHwgdm9pZD4gfCBib29sZWFuIHwgdm9pZDtcclxuICB9KSA9PiB2b2lkO1xyXG4gIGNsb3NlQ29uZmlybTogKCkgPT4gdm9pZDtcclxufTtcclxuXHJcbi8vIE93bnMgY3JlYXRlL2NvbmZpcm0gZmxvdyBzbyBmb3JtIGNvbXBvbmVudCBzdGF5cyBmb2N1c2VkIG9uIFVJIGZpZWxkcy5cclxuZXhwb3J0IGNvbnN0IHVzZUNyZWF0ZVN1Ym1pdCA9ICh7XHJcbiAgYnVzeSxcclxuICBtb2RhbE9wZW4sXHJcbiAgY2FuQ3JlYXRlVmlzaXQsXHJcbiAgY2FuUm9sbGJhY2tEZWxldGUsXHJcbiAgc2VsZWN0ZWRDbGllbnQsXHJcbiAgc2VsZWN0ZWRDb250YWN0cyxcbiAgdmlzaXRUeXBlLFxuICBjb250YWN0TWV0aG9kLFxuICBkZWZhdWx0QXNpc3RlbnRlVGlwbyxcbiAgZGVzY3JpcHRpb24sXHJcbiAgdHJhbnNEYXRlLFxyXG4gIGNvbWVudGFyaW9zLFxyXG4gIGFudGVjZWRlbnRlcyxcclxuICBjb25jbHVzaW9uZXMsXHJcbiAgc2V0QnVzeSxcclxuICBzZXRTdGF0dXMsXHJcbiAgc2V0TW9kYWxFcnJvcixcclxuICBzZXRTaG93UmVxdWlyZWQsXHJcbiAgb3BlbkNvbmZpcm0sXHJcbiAgY2xvc2VDb25maXJtLFxyXG59OiBVc2VDcmVhdGVTdWJtaXRBcmdzKSA9PiB7XHJcbiAgY29uc3QgZG9DcmVhdGUgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XHJcbiAgICBpZiAoYnVzeSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgaWYgKCFjYW5DcmVhdGVWaXNpdCkge1xyXG4gICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHNldE1vZGFsRXJyb3IoXCJcIik7XHJcbiAgICBpZiAoIXNlbGVjdGVkQ2xpZW50KSB7XHJcbiAgICAgIHNldFN0YXR1cyhpbmRUKFwiVmlzaXRzX0NyZWF0ZV9TZWxlY3RDbGllbnRSZXF1aXJlZFwiLCBcIlNlbGVjdCBhIGNsaWVudC5cIikpO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZiAoU3RyaW5nKHZpc2l0VHlwZSB8fCBcIlwiKSA9PT0gXCJcIiB8fCBTdHJpbmcodmlzaXRUeXBlKSA9PT0gXCIwXCIgfHwgIWRlc2NyaXB0aW9uLnRyaW0oKSB8fCAhY29tZW50YXJpb3MudHJpbSgpKSB7XHJcbiAgICAgIHNldFNob3dSZXF1aXJlZCh0cnVlKTtcclxuICAgICAgc2V0U3RhdHVzKGluZFQoXCJWaXNpdHNfQ3JlYXRlX0NvbXBsZXRlUmVxdWlyZWRcIiwgXCJDb21wbGV0ZSByZXF1aXJlZCBmaWVsZHMuXCIpKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgc2V0QnVzeSh0cnVlKTtcclxuICAgIHNldFN0YXR1cyhpbmRUKFwiVmlzaXRzX0NyZWF0ZV9DcmVhdGluZ0FjdGl2aXR5XCIsIFwiQ3JlYXRpbmcgYWN0aXZpdHkuLi5cIikpO1xyXG5cclxuICAgIGxldCBjcmVhdGVkUmVjSWQgPSBcIlwiO1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcGF5bG9hZEFjdGl2aXR5ID0ge1xuICAgICAgICBhY2NvdW50TnVtOiBzZWxlY3RlZENsaWVudC52YWx1ZSxcbiAgICAgICAgdmlzaXRUeXBlOiB0b051bGxhYmxlRW51bU51bWJlcih2aXNpdFR5cGUpLFxuICAgICAgICBjb250YWN0TWV0aG9kOiB0b051bGxhYmxlRW51bU51bWJlcihjb250YWN0TWV0aG9kIHx8IFwiMFwiKSxcbiAgICAgICAgZGVzY3JpcHRpb24sXG4gICAgICAgIHRyYW5zRGF0ZSxcbiAgICAgICAgY29tZW50YXJpb3MsXG4gICAgICAgIGFudGVjZWRlbnRlcyxcbiAgICAgICAgY29uY2x1c2lvbmVzLFxyXG4gICAgICB9O1xyXG5cclxuICAgICAgY29uc3QgcmVzQWN0ID0gYXdhaXQgZmV0Y2hKc29uPExlZ2FjeUNvbW1hbmRSZXNwb25zZT4oXCIvVmlzaXRhcy9DcmVhdGVBY3Rpdml0eVwiLCB7XHJcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXHJcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGF5bG9hZEFjdGl2aXR5KSxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpZiAoIWdldExlZ2FjeVJlc3BvbnNlU3VjY2VzcyhyZXNBY3QpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGdldExlZ2FjeVJlc3BvbnNlTWVzc2FnZShyZXNBY3QpIHx8IGluZFQoXCJWaXNpdHNfQ3JlYXRlX0NyZWF0ZUFjdGl2aXR5RmFpbGVkXCIsIFwiRmFpbGVkIHRvIGNyZWF0ZSBhY3Rpdml0eS5cIikpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCByZWNJZEFjdGl2aWRhZCA9IHJlc29sdmVDcmVhdGVBY3Rpdml0eVJlY0lkKHJlc0FjdCk7XG4gICAgICBpZiAoIXJlY0lkQWN0aXZpZGFkKSB0aHJvdyBuZXcgRXJyb3IoaW5kVChcIlZpc2l0c19DcmVhdGVfQ3JlYXRlQWN0aXZpdHlGYWlsZWRcIiwgXCJGYWlsZWQgdG8gY3JlYXRlIGFjdGl2aXR5LlwiKSk7XG4gICAgICBsb2dDcmVhdGVBY3Rpdml0eURpYWdub3N0aWNzKHJlc0FjdCwgU3RyaW5nKHJlY0lkQWN0aXZpZGFkKSk7XG4gICAgICBjcmVhdGVkUmVjSWQgPSBTdHJpbmcocmVjSWRBY3RpdmlkYWQpO1xuXHJcbiAgICAgIGlmIChzZWxlY3RlZENvbnRhY3RzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICBjb25zdCBhc3Npc3RhbnRCYXRjaFNpemUgPSA0O1xyXG4gICAgICAgIGNvbnN0IGNyZWF0ZUFzc2lzdGFudCA9IGFzeW5jIChjb250YWN0OiBDb250YWN0T3B0aW9uKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBwYXlsb2FkVmlzaXRhID0ge1xuICAgICAgICAgICAgcmVmUmVjSWRBY3RpdmlkYWQ6IHJlY0lkQWN0aXZpZGFkLFxuICAgICAgICAgICAgYXNpc3RlbnRlVGlwbzogdG9OdWxsYWJsZUVudW1OdW1iZXIoZGVmYXVsdEFzaXN0ZW50ZVRpcG8gfHwgXCIwXCIpLFxuICAgICAgICAgICAgYXNpc3RlbnRlSWQ6IGNvbnRhY3QudGV4dCxcbiAgICAgICAgICAgIGNvbnRhY3RvUmVjSWQ6IGNvbnRhY3QudmFsdWUsXG4gICAgICAgICAgfTtcbiAgICAgICAgICBjb25zdCByZXNWaXMgPSBhd2FpdCBmZXRjaEpzb248TGVnYWN5Q29tbWFuZFJlc3BvbnNlPihcIi9WaXNpdGFzL0NyZWF0ZVZpc2l0YUFzaXN0ZW50ZVwiLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGF5bG9hZFZpc2l0YSksXHJcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpZiAoIWdldExlZ2FjeVJlc3BvbnNlU3VjY2VzcyhyZXNWaXMpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZ2V0TGVnYWN5UmVzcG9uc2VNZXNzYWdlKHJlc1ZpcykgfHwgaW5kVChcIlZpc2l0c19DcmVhdGVfQ3JlYXRlVmlzaXRGYWlsZWRcIiwgXCJGYWlsZWQgdG8gY3JlYXRlIHZpc2l0LlwiKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXHJcbiAgICAgICAgZm9yIChsZXQgaWR4ID0gMDsgaWR4IDwgc2VsZWN0ZWRDb250YWN0cy5sZW5ndGg7IGlkeCArPSBhc3Npc3RhbnRCYXRjaFNpemUpIHtcclxuICAgICAgICAgIGNvbnN0IGJhdGNoID0gc2VsZWN0ZWRDb250YWN0cy5zbGljZShpZHgsIGlkeCArIGFzc2lzdGFudEJhdGNoU2l6ZSk7XHJcbiAgICAgICAgICBjb25zdCBmaXJzdCA9IGJhdGNoWzBdO1xyXG4gICAgICAgICAgaWYgKGZpcnN0KSB7XHJcbiAgICAgICAgICAgIHNldFN0YXR1cyhpbmRGb3JtYXQoXCJWaXNpdHNfQ3JlYXRlX0NyZWF0aW5nVmlzaXRGb3JcIiwgXCJDcmVhdGluZyB2aXNpdCBmb3IgezB9Li4uXCIsIGZpcnN0LnRleHQpKTtcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBhd2FpdCBQcm9taXNlLmFsbChiYXRjaC5tYXAoKGNvbnRhY3QpID0+IGNyZWF0ZUFzc2lzdGFudChjb250YWN0KSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgdHJ5IHtcclxuICAgICAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKFZJU0lUX0RSQUZUX0tFWSk7XHJcbiAgICAgIH0gY2F0Y2gge1xyXG4gICAgICAgIC8vIElnbm9yZSBzdG9yYWdlIGVycm9ycy5cclxuICAgICAgfVxyXG5cclxuICAgICAgc2V0SGlzdG9yeUZpbHRlckZvckRhdGUodHJhbnNEYXRlLCB0cnVlKTtcclxuICAgICAgY2xvc2VDb25maXJtKCk7XHJcbiAgICAgIGF3YWl0IHdhaXQoMjAwKTtcclxuICAgICAgZmxhc2hBY3Rpb25NYXJrKFwib2tQcm9jZXNzXCIsIDEyMDApO1xyXG4gICAgICBhd2FpdCB3YWl0KDEyMDApO1xyXG4gICAgICB3aW5kb3cuX19pbmRCeXBhc3NOYXZpZ2F0aW9uR3VhcmRPbmNlPy4oKTtcclxuICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9IaXN0b3JpYWwvSGlzdG9yeVwiO1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0gY2F0Y2ggKGU6IHVua25vd24pIHtcclxuICAgICAgaWYgKGNyZWF0ZWRSZWNJZCAmJiBjYW5Sb2xsYmFja0RlbGV0ZSkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICBzZXRTdGF0dXMoaW5kVChcIlZpc2l0c19DcmVhdGVfUm9sbGJhY2tcIiwgXCJSb2xsaW5nIGJhY2sgYWN0aXZpdHkuLi5cIikpO1xyXG4gICAgICAgICAgYXdhaXQgZmV0Y2hKc29uKGAvVmlzaXRhcy9EZWxldGVBY3Rpdml0eS8ke2VuY29kZVVSSUNvbXBvbmVudChjcmVhdGVkUmVjSWQpfWAsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcIkRFTEVURVwiLFxyXG4gICAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gY2F0Y2gge1xyXG4gICAgICAgICAgLy8gS2VlcCBvcmlnaW5hbCBlcnJvciBmbG93LlxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBjb25zdCBtc2cgPSBlIGluc3RhbmNlb2YgRXJyb3IgPyBlLm1lc3NhZ2UgOiBpbmRUKFwiVmlzaXRzX0NyZWF0ZV9DcmVhdGVWaXNpdEVycm9yXCIsIFwiRmFpbGVkIHRvIGNyZWF0ZSB0aGUgdmlzaXQuXCIpO1xuICAgICAgc2V0TW9kYWxFcnJvcihtc2cpO1xyXG4gICAgICBzZXRTdGF0dXMobXNnKTtcclxuICAgICAgZmxhc2hBY3Rpb25NYXJrKFwiZXJyb3JQcm9jZXNzXCIsIDE1MDApO1xyXG4gICAgICBzZXRCdXN5KGZhbHNlKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH0sIFtcclxuICAgIGFudGVjZWRlbnRlcyxcclxuICAgIGJ1c3ksXHJcbiAgICBjYW5DcmVhdGVWaXNpdCxcclxuICAgIGNhblJvbGxiYWNrRGVsZXRlLFxyXG4gICAgY2xvc2VDb25maXJtLFxyXG4gICAgY29tZW50YXJpb3MsXHJcbiAgICBjb25jbHVzaW9uZXMsXG4gICAgY29udGFjdE1ldGhvZCxcbiAgICBkZWZhdWx0QXNpc3RlbnRlVGlwbyxcbiAgICBkZXNjcmlwdGlvbixcclxuICAgIHNlbGVjdGVkQ2xpZW50LFxyXG4gICAgc2VsZWN0ZWRDb250YWN0cyxcclxuICAgIHNldEJ1c3ksXHJcbiAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgc2V0U2hvd1JlcXVpcmVkLFxyXG4gICAgc2V0U3RhdHVzLFxyXG4gICAgdHJhbnNEYXRlLFxyXG4gICAgdmlzaXRUeXBlLFxyXG4gIF0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVTdWJtaXQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAoYnVzeSkgcmV0dXJuO1xyXG4gICAgaWYgKCFjYW5DcmVhdGVWaXNpdCkge1xyXG4gICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmIChtb2RhbE9wZW4pIHJldHVybjtcclxuICAgIGlmICghc2VsZWN0ZWRDbGllbnQpIHtcclxuICAgICAgc2V0U3RhdHVzKGluZFQoXCJWaXNpdHNfQ3JlYXRlX1NlbGVjdENsaWVudFJlcXVpcmVkXCIsIFwiU2VsZWN0IGEgY2xpZW50LlwiKSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmIChTdHJpbmcodmlzaXRUeXBlIHx8IFwiXCIpID09PSBcIlwiIHx8IFN0cmluZyh2aXNpdFR5cGUpID09PSBcIjBcIiB8fCAhZGVzY3JpcHRpb24udHJpbSgpIHx8ICFjb21lbnRhcmlvcy50cmltKCkpIHtcclxuICAgICAgc2V0U2hvd1JlcXVpcmVkKHRydWUpO1xyXG4gICAgICBzZXRTdGF0dXMoaW5kVChcIlZpc2l0c19DcmVhdGVfQ29tcGxldGVSZXF1aXJlZFwiLCBcIkNvbXBsZXRlIHJlcXVpcmVkIGZpZWxkcy5cIikpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xyXG4gICAgb3BlbkNvbmZpcm0oe1xyXG4gICAgICB0aXRsZTogaW5kVChcIlZpc2l0c19DcmVhdGVfQ29uZmlybUNyZWF0ZV9UaXRsZVwiLCBcIkNvbmZpcm0gY3JlYXRlXCIpLFxuICAgICAgbWVzc2FnZTogaW5kVChcIlZpc2l0c19DcmVhdGVfQ29uZmlybUNyZWF0ZV9Cb2R5XCIsIFwiRG8geW91IHdhbnQgdG8gY3JlYXRlIHRoaXMgdmlzaXQ/XCIpLFxuICAgICAgY29uZmlybVRleHQ6IGluZFQoXCJDb25maXJtX1llc1wiLCBcIkNvbmZpcm1fWWVzXCIpLFxyXG4gICAgICBvbkNvbmZpcm06IGRvQ3JlYXRlLFxyXG4gICAgfSk7XHJcbiAgfSwgW1xyXG4gICAgYnVzeSxcclxuICAgIGNhbkNyZWF0ZVZpc2l0LFxyXG4gICAgY29tZW50YXJpb3MsXHJcbiAgICBkZXNjcmlwdGlvbixcclxuICAgIGRvQ3JlYXRlLFxyXG4gICAgbW9kYWxPcGVuLFxyXG4gICAgb3BlbkNvbmZpcm0sXHJcbiAgICBzZWxlY3RlZENsaWVudCxcclxuICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICBzZXRTaG93UmVxdWlyZWQsXHJcbiAgICBzZXRTdGF0dXMsXHJcbiAgICB2aXNpdFR5cGUsXHJcbiAgXSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBkb0NyZWF0ZSxcclxuICAgIGhhbmRsZVN1Ym1pdCxcclxuICB9O1xyXG59O1xyXG4iLCAiZXhwb3J0IGNvbnN0IGluZEV4dHJhY3RJZCA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZyA9PiB7XHJcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHJldHVybiBcIlwiO1xyXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgfHwgdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiKSByZXR1cm4gU3RyaW5nKHZhbHVlKS50cmltKCk7XHJcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgY29uc3QgY2FuZGlkYXRlID1cclxuICAgICAgKHZhbHVlIGFzIGFueSkucmVjSWQgPz9cclxuICAgICAgKHZhbHVlIGFzIGFueSkuUmVjSWQgPz9cclxuICAgICAgKHZhbHVlIGFzIGFueSkuaWQgPz9cclxuICAgICAgKHZhbHVlIGFzIGFueSkuSWQgPz9cclxuICAgICAgKHZhbHVlIGFzIGFueSkudmFsdWUgPz9cclxuICAgICAgKHZhbHVlIGFzIGFueSkuVmFsdWU7XHJcbiAgICBpZiAodHlwZW9mIGNhbmRpZGF0ZSA9PT0gXCJzdHJpbmdcIiB8fCB0eXBlb2YgY2FuZGlkYXRlID09PSBcIm51bWJlclwiKSByZXR1cm4gU3RyaW5nKGNhbmRpZGF0ZSkudHJpbSgpO1xyXG4gIH1cclxuICByZXR1cm4gXCJcIjtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBpbmRFeHRyYWN0TnVtZXJpY0lkID0gKHZhbHVlOiB1bmtub3duLCBkZXB0aCA9IDApOiBzdHJpbmcgPT4ge1xyXG4gIGlmIChkZXB0aCA+IDMpIHJldHVybiBcIlwiO1xyXG4gIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gXCJcIjtcclxuICBpZiAodHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiICYmIE51bWJlci5pc0Zpbml0ZSh2YWx1ZSkpIHJldHVybiBTdHJpbmcoTWF0aC50cnVuYyh2YWx1ZSkpO1xyXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpIHtcclxuICAgIGNvbnN0IHJhdyA9IHZhbHVlLnRyaW0oKTtcclxuICAgIGlmICghcmF3KSByZXR1cm4gXCJcIjtcclxuICAgIGlmICgvXlxcZCskLy50ZXN0KHJhdykpIHJldHVybiByYXc7XHJcbiAgICBjb25zdCBtID0gcmF3Lm1hdGNoKC8oXFxkezMsfSkvKTtcclxuICAgIHJldHVybiBtID8gbVsxXSA6IFwiXCI7XHJcbiAgfVxyXG4gIGlmICh0eXBlb2YgdmFsdWUgIT09IFwib2JqZWN0XCIpIHJldHVybiBcIlwiO1xyXG4gIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xyXG4gICAgZm9yIChjb25zdCBpdGVtIG9mIHZhbHVlKSB7XHJcbiAgICAgIGNvbnN0IGZvdW5kID0gaW5kRXh0cmFjdE51bWVyaWNJZChpdGVtLCBkZXB0aCArIDEpO1xyXG4gICAgICBpZiAoZm91bmQpIHJldHVybiBmb3VuZDtcclxuICAgIH1cclxuICAgIHJldHVybiBcIlwiO1xyXG4gIH1cclxuXHJcbiAgY29uc3Qga2V5cyA9IFtcclxuICAgIFwicmVjSWRcIixcclxuICAgIFwiUmVjSWRcIixcclxuICAgIFwicmVmUmVjSWRBY3RpdmlkYWRcIixcclxuICAgIFwiUmVmUmVjSWRBY3RpdmlkYWRcIixcclxuICAgIFwiYWN0aXZpZGFkUmVjSWRcIixcclxuICAgIFwiQWN0aXZpZGFkUmVjSWRcIixcclxuICAgIFwiaWRcIixcclxuICAgIFwiSWRcIixcclxuICAgIFwidmFsdWVcIixcclxuICAgIFwiVmFsdWVcIixcclxuICAgIFwicmVzdWx0XCIsXHJcbiAgICBcIlJlc3VsdFwiLFxyXG4gICAgXCJkYXRhXCIsXHJcbiAgICBcIkRhdGFcIixcclxuICAgIFwibWVzc2FnZVwiLFxyXG4gICAgXCJNZXNzYWdlXCIsXHJcbiAgXTtcclxuXHJcbiAgZm9yIChjb25zdCBrIG9mIGtleXMpIHtcclxuICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodmFsdWUsIGspKSB7XHJcbiAgICAgIGNvbnN0IGZvdW5kID0gaW5kRXh0cmFjdE51bWVyaWNJZCgodmFsdWUgYXMgYW55KVtrXSwgZGVwdGggKyAxKTtcclxuICAgICAgaWYgKGZvdW5kKSByZXR1cm4gZm91bmQ7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmb3IgKGNvbnN0IHYgb2YgT2JqZWN0LnZhbHVlcyh2YWx1ZSBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPikpIHtcclxuICAgIGNvbnN0IGZvdW5kID0gaW5kRXh0cmFjdE51bWVyaWNJZCh2LCBkZXB0aCArIDEpO1xyXG4gICAgaWYgKGZvdW5kKSByZXR1cm4gZm91bmQ7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gXCJcIjtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBpbmRFeHRyYWN0U2lnbmVkSWQgPSAodmFsdWU6IHVua25vd24sIGRlcHRoID0gMCk6IHN0cmluZyA9PiB7XHJcbiAgaWYgKGRlcHRoID4gMykgcmV0dXJuIFwiXCI7XHJcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHJldHVybiBcIlwiO1xyXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCIgJiYgTnVtYmVyLmlzRmluaXRlKHZhbHVlKSkgcmV0dXJuIFN0cmluZyhNYXRoLnRydW5jKHZhbHVlKSk7XHJcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgY29uc3QgcmF3ID0gdmFsdWUudHJpbSgpO1xyXG4gICAgaWYgKCFyYXcpIHJldHVybiBcIlwiO1xyXG4gICAgY29uc3QgbWF0Y2ggPSByYXcubWF0Y2goLy0/XFxkezMsfS8pO1xyXG4gICAgcmV0dXJuIG1hdGNoID8gbWF0Y2hbMF0gOiBcIlwiO1xyXG4gIH1cclxuICBpZiAodHlwZW9mIHZhbHVlICE9PSBcIm9iamVjdFwiKSByZXR1cm4gXCJcIjtcclxuICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcclxuICAgIGZvciAoY29uc3QgaXRlbSBvZiB2YWx1ZSkge1xyXG4gICAgICBjb25zdCBmb3VuZCA9IGluZEV4dHJhY3RTaWduZWRJZChpdGVtLCBkZXB0aCArIDEpO1xyXG4gICAgICBpZiAoZm91bmQpIHJldHVybiBmb3VuZDtcclxuICAgIH1cclxuICAgIHJldHVybiBcIlwiO1xyXG4gIH1cclxuXHJcbiAgY29uc3Qga2V5cyA9IFtcclxuICAgIFwicmVjSWRcIixcclxuICAgIFwiUmVjSWRcIixcclxuICAgIFwicmVmUmVjSWRBY3RpdmlkYWRcIixcclxuICAgIFwiUmVmUmVjSWRBY3RpdmlkYWRcIixcclxuICAgIFwiYWN0aXZpZGFkUmVjSWRcIixcclxuICAgIFwiQWN0aXZpZGFkUmVjSWRcIixcclxuICAgIFwibWVzc2FnZVwiLFxyXG4gICAgXCJNZXNzYWdlXCIsXHJcbiAgICBcInJlc3VsdFwiLFxyXG4gICAgXCJSZXN1bHRcIixcclxuICAgIFwiZGF0YVwiLFxyXG4gICAgXCJEYXRhXCIsXHJcbiAgXTtcclxuXHJcbiAgZm9yIChjb25zdCBrIG9mIGtleXMpIHtcclxuICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodmFsdWUsIGspKSB7XHJcbiAgICAgIGNvbnN0IGZvdW5kID0gaW5kRXh0cmFjdFNpZ25lZElkKCh2YWx1ZSBhcyBhbnkpW2tdLCBkZXB0aCArIDEpO1xyXG4gICAgICBpZiAoZm91bmQpIHJldHVybiBmb3VuZDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZvciAoY29uc3QgdiBvZiBPYmplY3QudmFsdWVzKHZhbHVlIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+KSkge1xyXG4gICAgY29uc3QgZm91bmQgPSBpbmRFeHRyYWN0U2lnbmVkSWQodiwgZGVwdGggKyAxKTtcclxuICAgIGlmIChmb3VuZCkgcmV0dXJuIGZvdW5kO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIFwiXCI7XHJcbn07XHJcbiIsICJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VJZCwgdXNlTWVtbywgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBYTWFya0ljb24gfSBmcm9tIFwiQGhlcm9pY29ucy9yZWFjdC8yMC9zb2xpZFwiO1xyXG5pbXBvcnQgRmxvYXRpbmdMaXN0IGZyb20gXCIuLi9jb21tb25zL0Zsb2F0aW5nTGlzdC50c3hcIjtcclxuaW1wb3J0IFNwaW5uZXIgZnJvbSBcIi4uL2NvbW1vbnMvU3Bpbm5lci50c3hcIjtcclxuaW1wb3J0IHsgQ2hldnJvbkRvd25TdmcsIENoZXZyb25VcFN2ZyB9IGZyb20gXCIuLi9jb21tb25zL2NoZXZyb25zLnRzeFwiO1xyXG5pbXBvcnQgeyBmZXRjaEpzb24gfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvYXBpU2VydmljZS50c1wiO1xyXG5pbXBvcnQgeyBoYW5kbGVDb21ib2JveEtleURvd24gfSBmcm9tIFwiLi4vLi4vaG9va3MvdXNlQ29tYm9ib3hLZXlib2FyZC50c1wiO1xyXG5pbXBvcnQgeyB1c2VPdXRzaWRlQ2xpY2sgfSBmcm9tIFwiLi4vLi4vaG9va3MvdXNlT3V0c2lkZUNsaWNrLnRzXCI7XHJcbmltcG9ydCB7IGNsYXNzTmFtZXMgfSBmcm9tIFwiLi4vLi4vdXRpbHMvY2xhc3NOYW1lcy50c1wiO1xyXG5pbXBvcnQgeyBpbmRGb3JtYXQsIGluZFQgfSBmcm9tIFwiLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgeyBpc05vRGF0YVJvdywgaXNOb0RhdGFUZXh0IH0gZnJvbSBcIi4uLy4uL3V0aWxzL25vRGF0YS50c1wiO1xyXG5pbXBvcnQgeyBnZXRDYWNoZWRDb250YWN0cywgc2V0Q2FjaGVkQ29udGFjdHMsIGdldFN0b3JlZFNlbGVjdGlvbiwgc2V0U3RvcmVkU2VsZWN0aW9uLCBjbGVhclN0b3JlZFNlbGVjdGlvbiB9IGZyb20gXCIuLi8uLi91dGlscy92aXNpdGFzU3RvcmFnZS50c1wiO1xyXG5cclxudHlwZSBDb250YWN0T3B0aW9uID0ge1xyXG4gIHZhbHVlOiBzdHJpbmc7XHJcbiAgdGV4dDogc3RyaW5nO1xyXG4gIGNhcmdvOiBzdHJpbmc7XHJcbiAgZW1wcmVzYTogc3RyaW5nO1xyXG59O1xyXG5cclxudHlwZSBDb250YWN0c0Ryb3Bkb3duUmVzcG9uc2UgPSB7XHJcbiAgaXRlbXM/OiB1bmtub3duW107XHJcbiAgSXRlbXM/OiB1bmtub3duW107XHJcbn07XHJcblxyXG50eXBlIENvbnRhY3RzQ29tYm9ib3hQcm9wcyA9IHtcclxuICBhY2NvdW50TnVtPzogc3RyaW5nO1xyXG4gIHZhbHVlPzogQ29udGFjdE9wdGlvbltdO1xyXG4gIG9uQ2hhbmdlOiAodmFsdWU6IENvbnRhY3RPcHRpb25bXSkgPT4gdm9pZDtcclxuICBwb3J0YWxDbGFzc05hbWU/OiBzdHJpbmc7XHJcbiAgcGFuZWxDbGFzc05hbWU/OiBzdHJpbmc7XHJcbn07XHJcblxyXG4vLyBNdWx0aS1zZWxlY3QgY29udGFjdHMgY29tYm9ib3ggdGllZCB0byB0aGUgc2VsZWN0ZWQgY2xpZW50LlxyXG5jb25zdCBDb250YWN0c0NvbWJvYm94ID0gKHsgYWNjb3VudE51bSwgdmFsdWUgPSBbXSwgb25DaGFuZ2UsIHBvcnRhbENsYXNzTmFtZSwgcGFuZWxDbGFzc05hbWUgfTogQ29udGFjdHNDb21ib2JveFByb3BzKSA9PiB7XHJcbiAgY29uc3QgW3F1ZXJ5LCBzZXRRdWVyeV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbb3B0aW9ucywgc2V0T3B0aW9uc10gPSB1c2VTdGF0ZTxDb250YWN0T3B0aW9uW10+KFtdKTtcclxuICBjb25zdCBbc2VsZWN0ZWQsIHNldFNlbGVjdGVkXSA9IHVzZVN0YXRlPENvbnRhY3RPcHRpb25bXT4odmFsdWUpO1xyXG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbbG9hZGluZ01vcmUsIHNldExvYWRpbmdNb3JlXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbc3RhdHVzLCBzZXRTdGF0dXNdID0gdXNlU3RhdGUoaW5kVChcIlZpc2l0c19DcmVhdGVfU2VsZWN0Q2xpZW50Rmlyc3RcIiwgXCJTZWxlY3QgYSBjbGllbnQgZmlyc3QuXCIpKTtcclxuICBjb25zdCBbaGFzTG9hZGVkLCBzZXRIYXNMb2FkZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtvcGVuLCBzZXRPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbcGFnZSwgc2V0UGFnZV0gPSB1c2VTdGF0ZSgxKTtcclxuICBjb25zdCBbaGFzTW9yZSwgc2V0SGFzTW9yZV0gPSB1c2VTdGF0ZSh0cnVlKTtcclxuICBjb25zdCBbYmxvY2tpbmcsIHNldEJsb2NraW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbYWN0aXZlSW5kZXgsIHNldEFjdGl2ZUluZGV4XSA9IHVzZVN0YXRlKDApO1xyXG4gIGNvbnN0IFtzaG93Tm90Rm91bmRTdGF0ZSwgc2V0U2hvd05vdEZvdW5kU3RhdGVdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IGxpc3RSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBib3hSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBhYm9ydFJlZiA9IHVzZVJlZjxBYm9ydENvbnRyb2xsZXIgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBjb250YWluZXJSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBpbnB1dFJlZiA9IHVzZVJlZjxIVE1MSW5wdXRFbGVtZW50IHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgbGFzdEFjY291bnRSZWYgPSB1c2VSZWYoYWNjb3VudE51bSB8fCBcIlwiKTtcclxuICBjb25zdCBvbkNoYW5nZVJlZiA9IHVzZVJlZihvbkNoYW5nZSk7XHJcbiAgY29uc3QgaWRCYXNlID0gdXNlSWQoKTtcclxuICBjb25zdCBpbnB1dElkID0gYCR7aWRCYXNlfS1jb250YWN0cy1pbnB1dGA7XHJcbiAgY29uc3QgbGlzdElkID0gYCR7aWRCYXNlfS1jb250YWN0cy1vcHRpb25zYDtcclxuXHJcbiAgdXNlT3V0c2lkZUNsaWNrKFtjb250YWluZXJSZWYsIGxpc3RSZWZdLCAoKSA9PiB7XHJcbiAgICBzZXRPcGVuKGZhbHNlKTtcclxuICAgIHNldFNob3dOb3RGb3VuZFN0YXRlKGZhbHNlKTtcclxuICAgIGlmIChxdWVyeS50cmltKCkpIHtcclxuICAgICAgc2V0UXVlcnkoXCJcIik7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBvbkNoYW5nZVJlZi5jdXJyZW50ID0gb25DaGFuZ2U7XHJcbiAgfSwgW29uQ2hhbmdlXSk7XHJcblxyXG4gIGNvbnN0IGlzU2FtZVNlbGVjdGlvbiA9IChhOiBDb250YWN0T3B0aW9uW10gPSBbXSwgYjogQ29udGFjdE9wdGlvbltdID0gW10pID0+IHtcclxuICAgIGlmIChhLmxlbmd0aCAhPT0gYi5sZW5ndGgpIHJldHVybiBmYWxzZTtcclxuICAgIGNvbnN0IGFzID0gYS5tYXAoKHgpID0+IFN0cmluZyh4LnZhbHVlKSkuc29ydCgpO1xyXG4gICAgY29uc3QgYnMgPSBiLm1hcCgoeCkgPT4gU3RyaW5nKHgudmFsdWUpKS5zb3J0KCk7XHJcbiAgICByZXR1cm4gYXMuZXZlcnkoKHYsIGkpID0+IHYgPT09IGJzW2ldKTtcclxuICB9O1xyXG5cclxuICAvLyBTeW5jIGludGVybmFsIHNlbGVjdGlvbiB3aXRoIHRoZSBwcm9wIChkcmFmdC9jYWNoZSByZXN0b3JlKS5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFpc1NhbWVTZWxlY3Rpb24odmFsdWUgfHwgW10sIHNlbGVjdGVkKSkge1xyXG4gICAgICBzZXRTZWxlY3RlZCh2YWx1ZSB8fCBbXSk7XHJcbiAgICB9XHJcbiAgfSwgW3ZhbHVlXSk7XHJcblxyXG4gIGNvbnN0IGNhbmNlbFBlbmRpbmcgPSAoKSA9PiB7XHJcbiAgICBpZiAoYWJvcnRSZWYuY3VycmVudCkge1xyXG4gICAgICBhYm9ydFJlZi5jdXJyZW50LmFib3J0KCk7XHJcbiAgICAgIGFib3J0UmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBpZiAoYWJvcnRSZWYuY3VycmVudCkge1xyXG4gICAgICAgIGFib3J0UmVmLmN1cnJlbnQuYWJvcnQoKTtcclxuICAgICAgICBhYm9ydFJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IHByaW1lRnJvbUNhY2hlID0gKCkgPT4ge1xyXG4gICAgY29uc3QgY2FjaGVkID0gZ2V0Q2FjaGVkQ29udGFjdHMoYWNjb3VudE51bSkgYXMgQ29udGFjdE9wdGlvbltdIHwgbnVsbDtcclxuICAgIGlmIChjYWNoZWQpIHtcclxuICAgICAgc2V0T3B0aW9ucyhjYWNoZWQpO1xyXG4gICAgICBzZXRTaG93Tm90Rm91bmRTdGF0ZShmYWxzZSk7XHJcbiAgICAgIHNldEhhc0xvYWRlZCh0cnVlKTtcclxuICAgICAgc2V0SGFzTW9yZShjYWNoZWQubGVuZ3RoID09PSAxMCk7XHJcbiAgICAgIHNldFN0YXR1cyhcclxuICAgICAgICBjYWNoZWQubGVuZ3RoXHJcbiAgICAgICAgICA/IGluZEZvcm1hdChcIlZpc2l0c19DcmVhdGVfQ29udGFjdENvdW50Q2FjaGVcIiwgXCJ7MH0gY29udGFjdHMgKGNhY2hlKVwiLCBjYWNoZWQubGVuZ3RoKVxyXG4gICAgICAgICAgOiBpbmRUKFwiVmlzaXRzX0NyZWF0ZV9Ob0NvbnRhY3RzXCIsIFwiTm8gY29udGFjdHNcIilcclxuICAgICAgKTtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNhbmNlbFBlbmRpbmcoKTtcclxuICAgIHNldFF1ZXJ5KFwiXCIpO1xyXG4gICAgc2V0T3BlbihmYWxzZSk7XHJcbiAgICBzZXRMb2FkaW5nKGZhbHNlKTtcclxuICAgIHNldEJsb2NraW5nKGZhbHNlKTtcclxuICAgIHNldExvYWRpbmdNb3JlKGZhbHNlKTtcclxuICAgIHNldEFjdGl2ZUluZGV4KDApO1xyXG4gICAgc2V0U2hvd05vdEZvdW5kU3RhdGUoZmFsc2UpO1xyXG4gICAgc2V0UGFnZSgxKTtcclxuICAgIHNldEhhc01vcmUodHJ1ZSk7XHJcblxyXG4gICAgaWYgKCFhY2NvdW50TnVtKSB7XHJcbiAgICAgIHNldE9wdGlvbnMoW10pO1xyXG4gICAgICBzZXRTZWxlY3RlZChbXSk7XHJcbiAgICAgIG9uQ2hhbmdlUmVmLmN1cnJlbnQoW10pO1xyXG4gICAgICBzZXRTdGF0dXMoaW5kVChcIlZpc2l0c19DcmVhdGVfU2VsZWN0Q2xpZW50Rmlyc3RcIiwgXCJTZWxlY3QgYSBjbGllbnQgZmlyc3QuXCIpKTtcclxuICAgICAgc2V0SGFzTG9hZGVkKGZhbHNlKTtcclxuICAgICAgY2xlYXJTdG9yZWRTZWxlY3Rpb24obGFzdEFjY291bnRSZWYuY3VycmVudCk7XHJcbiAgICAgIGxhc3RBY2NvdW50UmVmLmN1cnJlbnQgPSBcIlwiO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY2hhbmdlZCA9IGxhc3RBY2NvdW50UmVmLmN1cnJlbnQgJiYgbGFzdEFjY291bnRSZWYuY3VycmVudCAhPT0gYWNjb3VudE51bTtcclxuICAgIGlmIChjaGFuZ2VkKSB7XHJcbiAgICAgIHNldFNlbGVjdGVkKFtdKTtcclxuICAgICAgb25DaGFuZ2VSZWYuY3VycmVudChbXSk7XHJcbiAgICAgIGNsZWFyU3RvcmVkU2VsZWN0aW9uKGxhc3RBY2NvdW50UmVmLmN1cnJlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHVzZWRDYWNoZSA9IHByaW1lRnJvbUNhY2hlKCk7XHJcbiAgICBpZiAoIXVzZWRDYWNoZSkge1xyXG4gICAgICBzZXRPcHRpb25zKFtdKTtcclxuICAgICAgc2V0SGFzTG9hZGVkKGZhbHNlKTtcclxuICAgICAgc2V0U3RhdHVzKGluZFQoXCJWaXNpdHNfQ3JlYXRlX1ByZXNzQXJyb3dUb0xvYWRDb250YWN0c1wiLCBcIlByZXNzIEFycm93RG93biB0byBsb2FkIGNvbnRhY3RzLlwiKSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc3RvcmVkU2VsZWN0aW9uID0gZ2V0U3RvcmVkU2VsZWN0aW9uKGFjY291bnROdW0pIGFzIENvbnRhY3RPcHRpb25bXTtcclxuICAgIGlmIChzdG9yZWRTZWxlY3Rpb24ubGVuZ3RoICYmICF2YWx1ZT8ubGVuZ3RoKSB7XHJcbiAgICAgIHNldFNlbGVjdGVkKHN0b3JlZFNlbGVjdGlvbik7XHJcbiAgICAgIG9uQ2hhbmdlUmVmLmN1cnJlbnQoc3RvcmVkU2VsZWN0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBsYXN0QWNjb3VudFJlZi5jdXJyZW50ID0gYWNjb3VudE51bTtcclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC1ob29rcy9leGhhdXN0aXZlLWRlcHNcclxuICB9LCBbYWNjb3VudE51bV0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgb25DaGFuZ2VSZWYuY3VycmVudChzZWxlY3RlZCk7XHJcbiAgICBpZiAoYWNjb3VudE51bSkgc2V0U3RvcmVkU2VsZWN0aW9uKGFjY291bnROdW0sIHNlbGVjdGVkKTtcclxuICB9LCBbc2VsZWN0ZWQsIGFjY291bnROdW1dKTtcclxuXHJcbiAgY29uc3QgdG9UZXh0ID0gKHZhbHVlOiB1bmtub3duKTogc3RyaW5nID0+IHtcclxuICAgIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gXCJcIjtcclxuICAgIHJldHVybiBTdHJpbmcodmFsdWUpLnRyaW0oKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBhc09iamVjdFJlY29yZCA9ICh2YWx1ZTogdW5rbm93bik6IFJlY29yZDxzdHJpbmcsIHVua25vd24+IHwgbnVsbCA9PiB7XHJcbiAgICBpZiAoIXZhbHVlIHx8IHR5cGVvZiB2YWx1ZSAhPT0gXCJvYmplY3RcIiB8fCBBcnJheS5pc0FycmF5KHZhbHVlKSkgcmV0dXJuIG51bGw7XHJcbiAgICByZXR1cm4gdmFsdWUgYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj47XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgbWFwQ29udGFjdHMgPSAoaXRlbXM6IHVua25vd25bXSA9IFtdKSA9PlxyXG4gICAgaXRlbXNcclxuICAgICAgLm1hcCgoZW50cnkpID0+IHtcclxuICAgICAgICBpZiAoaXNOb0RhdGFSb3coZW50cnkpKSByZXR1cm4gbnVsbDtcclxuICAgICAgICBjb25zdCByZWNvcmQgPSBhc09iamVjdFJlY29yZChlbnRyeSk7XHJcbiAgICAgICAgaWYgKCFyZWNvcmQpIHJldHVybiBudWxsO1xyXG5cclxuICAgICAgICBjb25zdCByZWNJZCA9IHRvVGV4dChyZWNvcmQucmVjSWQgPz8gcmVjb3JkLlJlY0lkKTtcclxuICAgICAgICBjb25zdCBuYW1lID0gdG9UZXh0KHJlY29yZC5uYW1lID8/IHJlY29yZC5OYW1lKTtcclxuICAgICAgICBjb25zdCBjYXJnbyA9IHRvVGV4dChyZWNvcmQuY2FyZ28gPz8gcmVjb3JkLkNhcmdvKTtcclxuICAgICAgICBjb25zdCBlbXByZXNhID0gdG9UZXh0KHJlY29yZC5lbXByZXNhID8/IHJlY29yZC5FbXByZXNhKTtcclxuXHJcbiAgICAgICAgaWYgKCFyZWNJZCB8fCBpc05vRGF0YVRleHQobmFtZSkpIHJldHVybiBudWxsO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgdmFsdWU6IHJlY0lkLFxyXG4gICAgICAgICAgdGV4dDogbmFtZS50b1VwcGVyQ2FzZSgpLFxyXG4gICAgICAgICAgY2FyZ286IGNhcmdvLnRvVXBwZXJDYXNlKCksXHJcbiAgICAgICAgICBlbXByZXNhOiBlbXByZXNhLnRvVXBwZXJDYXNlKCksXHJcbiAgICAgICAgfSBhcyBDb250YWN0T3B0aW9uO1xyXG4gICAgICB9KVxyXG4gICAgICAuZmlsdGVyKEJvb2xlYW4pIGFzIENvbnRhY3RPcHRpb25bXTtcclxuXHJcbiAgY29uc3QgbG9hZCA9IGFzeW5jIChwYWdlVG9Mb2FkID0gMSwgYXBwZW5kID0gZmFsc2UpID0+IHtcclxuICAgIGlmICghYWNjb3VudE51bSkgcmV0dXJuO1xyXG4gICAgaWYgKGxvYWRpbmcgfHwgbG9hZGluZ01vcmUpIHJldHVybjtcclxuICAgIGNhbmNlbFBlbmRpbmcoKTtcclxuXHJcbiAgICBpZiAoIWFwcGVuZCkge1xyXG4gICAgICBzZXRMb2FkaW5nKHRydWUpO1xyXG4gICAgICBzZXRCbG9ja2luZyh0cnVlKTtcclxuICAgICAgaWYgKHBhZ2VUb0xvYWQgPT09IDEpIHNldFN0YXR1cyhpbmRUKFwiVmlzaXRzX0NyZWF0ZV9Mb2FkaW5nQ29udGFjdHNcIiwgXCJMb2FkaW5nIGNvbnRhY3RzLi4uXCIpKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHNldExvYWRpbmdNb3JlKHRydWUpO1xyXG4gICAgICBzZXRCbG9ja2luZyh0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xyXG4gICAgYWJvcnRSZWYuY3VycmVudCA9IGNvbnRyb2xsZXI7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaEpzb248Q29udGFjdHNEcm9wZG93blJlc3BvbnNlPihcclxuICAgICAgICBgL1Zpc2l0YXMvR2V0Q29udGFjdHNGb3JEcm9wZG93bj9hY2NvdW50TnVtPSR7ZW5jb2RlVVJJQ29tcG9uZW50KGFjY291bnROdW0pfSZwYWdlPSR7cGFnZVRvTG9hZH0mcGFnZVNpemU9MTBgLFxyXG4gICAgICAgIHsgc2lnbmFsOiBjb250cm9sbGVyLnNpZ25hbCB9XHJcbiAgICAgICk7XHJcbiAgICAgIGNvbnN0IHJhd0l0ZW1zID0gQXJyYXkuaXNBcnJheShyZXMuaXRlbXMpID8gcmVzLml0ZW1zIDogQXJyYXkuaXNBcnJheShyZXMuSXRlbXMpID8gcmVzLkl0ZW1zIDogW107XHJcbiAgICAgIGNvbnN0IG1hcHBlZCA9IG1hcENvbnRhY3RzKHJhd0l0ZW1zKTtcclxuICAgICAgc2V0T3B0aW9ucygocHJldikgPT4ge1xyXG4gICAgICAgIGNvbnN0IG5leHQgPSBhcHBlbmQgPyBbLi4ucHJldiwgLi4ubWFwcGVkXSA6IG1hcHBlZDtcclxuICAgICAgICBzZXRDYWNoZWRDb250YWN0cyhhY2NvdW50TnVtLCBuZXh0KTtcclxuICAgICAgICByZXR1cm4gbmV4dDtcclxuICAgICAgfSk7XHJcbiAgICAgIHNldFNob3dOb3RGb3VuZFN0YXRlKGZhbHNlKTtcclxuICAgICAgc2V0SGFzTG9hZGVkKHRydWUpO1xyXG4gICAgICBzZXRIYXNNb3JlKG1hcHBlZC5sZW5ndGggPT09IDEwKTtcclxuICAgICAgc2V0UGFnZShwYWdlVG9Mb2FkKTtcclxuICAgICAgc2V0U3RhdHVzKG1hcHBlZC5sZW5ndGggPyBpbmRGb3JtYXQoXCJWaXNpdHNfQ3JlYXRlX0NvbnRhY3RDb3VudFwiLCBcInswfSBjb250YWN0c1wiLCBtYXBwZWQubGVuZ3RoKSA6IGluZFQoXCJWaXNpdHNfQ3JlYXRlX05vQ29udGFjdHNcIiwgXCJObyBjb250YWN0c1wiKSk7XHJcbiAgICB9IGNhdGNoIHtcclxuICAgICAgc2V0U3RhdHVzKGluZFQoXCJWaXNpdHNfQ3JlYXRlX0xvYWRDb250YWN0c0Vycm9yXCIsIFwiRmFpbGVkIHRvIGxvYWQgY29udGFjdHMuXCIpKTtcclxuICAgIH0gZmluYWxseSB7XHJcbiAgICAgIGFib3J0UmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcclxuICAgICAgc2V0TG9hZGluZ01vcmUoZmFsc2UpO1xyXG4gICAgICBzZXRCbG9ja2luZyhmYWxzZSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgZW5zdXJlTG9hZGVkID0gKCkgPT4ge1xyXG4gICAgaWYgKCFhY2NvdW50TnVtKSByZXR1cm47XHJcbiAgICBpZiAoaGFzTG9hZGVkICYmIG9wdGlvbnMubGVuZ3RoKSByZXR1cm47XHJcbiAgICBpZiAocHJpbWVGcm9tQ2FjaGUoKSkgcmV0dXJuO1xyXG4gICAgbG9hZCgxLCBmYWxzZSk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgbG9hZE1vcmVDb250YWN0cyA9IFJlYWN0LnVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmICghYWNjb3VudE51bSB8fCAhaGFzTW9yZSB8fCBsb2FkaW5nTW9yZSB8fCBsb2FkaW5nKSByZXR1cm47XHJcbiAgICBsb2FkKHBhZ2UgKyAxLCB0cnVlKTtcclxuICB9LCBbYWNjb3VudE51bSwgaGFzTW9yZSwgbG9hZGluZ01vcmUsIGxvYWRpbmcsIHBhZ2VdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghb3BlbiB8fCAhbGlzdFJlZi5jdXJyZW50KSByZXR1cm47XHJcbiAgICBjb25zdCBlbCA9IGxpc3RSZWYuY3VycmVudDtcclxuICAgIGNvbnN0IG9uU2Nyb2xsID0gKCkgPT4ge1xyXG4gICAgICBpZiAoZWwuc2Nyb2xsVG9wICsgZWwuY2xpZW50SGVpZ2h0ID49IGVsLnNjcm9sbEhlaWdodCAtIDgpIGxvYWRNb3JlQ29udGFjdHMoKTtcclxuICAgIH07XHJcbiAgICBlbC5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIG9uU2Nyb2xsLCB7IHBhc3NpdmU6IHRydWUgfSk7XHJcbiAgICByZXR1cm4gKCkgPT4gZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBvblNjcm9sbCk7XHJcbiAgfSwgW29wZW4sIGxvYWRNb3JlQ29udGFjdHNdKTtcclxuXHJcbiAgY29uc3Qgc2VsZWN0ZWRWYWx1ZXMgPSB1c2VNZW1vKCgpID0+IHtcclxuICAgIHJldHVybiBuZXcgU2V0KChzZWxlY3RlZCB8fCBbXSkubWFwKChzKSA9PiBTdHJpbmcocy52YWx1ZSkpKTtcclxuICB9LCBbc2VsZWN0ZWRdKTtcclxuXHJcbiAgY29uc3QgYXZhaWxhYmxlT3B0aW9ucyA9IHVzZU1lbW8oKCkgPT4ge1xyXG4gICAgLy8gSGlkZSBhbHJlYWR5IHNlbGVjdGVkIGNvbnRhY3RzIGZyb20gdGhlIGRyb3Bkb3duIGxpc3QuXHJcbiAgICByZXR1cm4gKG9wdGlvbnMgfHwgW10pLmZpbHRlcigobykgPT4gIXNlbGVjdGVkVmFsdWVzLmhhcyhTdHJpbmcoby52YWx1ZSkpKTtcclxuICB9LCBbb3B0aW9ucywgc2VsZWN0ZWRWYWx1ZXNdKTtcclxuXHJcbiAgY29uc3QgZmlsdGVyZWQgPSB1c2VNZW1vKCgpID0+IHtcclxuICAgIGNvbnN0IHEgPSBxdWVyeS50cmltKCkudG9Mb3dlckNhc2UoKTtcclxuICAgIGlmICghcSkgcmV0dXJuIGF2YWlsYWJsZU9wdGlvbnM7XHJcbiAgICByZXR1cm4gYXZhaWxhYmxlT3B0aW9ucy5maWx0ZXIoXHJcbiAgICAgIChvKSA9PiBvLnRleHQudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhxKSB8fCBvLmNhcmdvLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMocSkgfHwgby5lbXByZXNhLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMocSlcclxuICAgICk7XHJcbiAgfSwgW2F2YWlsYWJsZU9wdGlvbnMsIHF1ZXJ5XSk7XHJcbiAgY29uc3Qgc2hvdWxkU2hvd05vdEZvdW5kUm93ID0gc2hvd05vdEZvdW5kU3RhdGUgfHwgKCEhcXVlcnkudHJpbSgpICYmIGZpbHRlcmVkLmxlbmd0aCA9PT0gMCk7XHJcbiAgY29uc3QgcmVzb2x2ZWRBY3RpdmVJbmRleCA9XHJcbiAgICBmaWx0ZXJlZC5sZW5ndGggPiAwID8gTWF0aC5taW4oTWF0aC5tYXgoYWN0aXZlSW5kZXgsIDApLCBmaWx0ZXJlZC5sZW5ndGggLSAxKSA6IDA7XHJcbiAgY29uc3QgYWN0aXZlSWQgPVxyXG4gICAgb3BlbiAmJiBmaWx0ZXJlZFtyZXNvbHZlZEFjdGl2ZUluZGV4XSA/IGAke2lkQmFzZX0tY29udGFjdC1vcHQtJHtmaWx0ZXJlZFtyZXNvbHZlZEFjdGl2ZUluZGV4XS52YWx1ZX1gIDogdW5kZWZpbmVkO1xyXG5cclxuICBjb25zdCB0b2dnbGVPcHRpb24gPSAob3B0OiBDb250YWN0T3B0aW9uKSA9PiB7XHJcbiAgICBzZXRTZWxlY3RlZCgocHJldikgPT4ge1xyXG4gICAgICBjb25zdCBleGlzdHMgPSBwcmV2LnNvbWUoKHApID0+IHAudmFsdWUgPT09IG9wdC52YWx1ZSk7XHJcbiAgICAgIGlmIChleGlzdHMpIHJldHVybiBwcmV2LmZpbHRlcigocCkgPT4gcC52YWx1ZSAhPT0gb3B0LnZhbHVlKTtcclxuICAgICAgcmV0dXJuIFsuLi5wcmV2LCBvcHRdO1xyXG4gICAgfSk7XHJcbiAgICBzZXRTaG93Tm90Rm91bmRTdGF0ZShmYWxzZSk7XHJcbiAgICBzZXRRdWVyeShcIlwiKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBoYW5kbGVLZXlEb3duID0gKGV2OiBSZWFjdC5LZXlib2FyZEV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+KSA9PiB7XHJcbiAgICBoYW5kbGVDb21ib2JveEtleURvd24oZXYsIHtcclxuICAgICAgaXNPcGVuOiBvcGVuLFxyXG4gICAgICBzZXRPcGVuLFxyXG4gICAgICBvcHRpb25Db3VudDogZmlsdGVyZWQubGVuZ3RoLFxyXG4gICAgICBzZXRBY3RpdmVJbmRleCxcclxuICAgICAgb3Blbk9uQXJyb3c6IHRydWUsXHJcbiAgICAgIG9uQXJyb3dOYXZpZ2F0ZTogZW5zdXJlTG9hZGVkLFxyXG4gICAgICBvbkVudGVyV2hlbk9wZW46ICgpID0+IHtcclxuICAgICAgICBpZiAoZmlsdGVyZWQubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgdG9nZ2xlT3B0aW9uKGZpbHRlcmVkW3Jlc29sdmVkQWN0aXZlSW5kZXhdID8/IGZpbHRlcmVkWzBdKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChxdWVyeS50cmltKCkpIHtcclxuICAgICAgICAgIHNldFF1ZXJ5KFwiXCIpO1xyXG4gICAgICAgICAgc2V0U2hvd05vdEZvdW5kU3RhdGUodHJ1ZSk7XHJcbiAgICAgICAgICBzZXRPcGVuKHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgb25FbnRlcldoZW5DbG9zZWQ6IGFjY291bnROdW1cclxuICAgICAgICA/ICgpID0+IHtcclxuICAgICAgICAgICAgZW5zdXJlTG9hZGVkKCk7XHJcbiAgICAgICAgICAgIHNldE9wZW4odHJ1ZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgOiB1bmRlZmluZWQsXHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIiByZWY9e2NvbnRhaW5lclJlZn0+XHJcbiAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb3JtLWxhYmVsIGZvbnQtc2VtaWJvbGRcIiBodG1sRm9yPXtpbnB1dElkfT5cclxuICAgICAgICB7aW5kVChcIlZpc2l0c19DcmVhdGVfU2VhcmNoQ29udGFjdFwiLCBcIlNlYXJjaCBjb250YWN0XCIpfVxyXG4gICAgICA8L2xhYmVsPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlXCI+XHJcbiAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgIHJlZj17Ym94UmVmfVxyXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJyZWxhdGl2ZSB3LWZ1bGwgY3Vyc29yLWRlZmF1bHQgcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYm9yZGVyLXNsYXRlLTMwMCBiZy13aGl0ZSB0ZXh0LWxlZnQgc2hhZG93LXhzIGZvY3VzLXdpdGhpbjpib3JkZXItcHJpbWFyeSBmb2N1cy13aXRoaW46cmluZy0yIGZvY3VzLXdpdGhpbjpyaW5nLXByaW1hcnkgZm9jdXMtd2l0aGluOnJpbmctb2Zmc2V0LTAgc206dGV4dC1zbVwiXHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC13cmFwIGdhcC0xIHB4LTMgcHktMiBtaW4taC0xMFwiPlxyXG4gICAgICAgICAgICB7c2VsZWN0ZWQubWFwKChjKSA9PiAoXHJcbiAgICAgICAgICAgICAgPHNwYW5cclxuICAgICAgICAgICAgICAgIGtleT17Yy52YWx1ZX1cclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJnLXByaW1hcnkvMTAgdGV4dC1zbGF0ZS03MDAgcHgtMiBweS0xIHRleHQteHNcIlxyXG4gICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgIHtjLnRleHR9XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTZWxlY3RlZCgocHJldikgPT4gcHJldi5maWx0ZXIoKHMpID0+IHMudmFsdWUgIT09IGMudmFsdWUpKX1cclxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS03MDAgaG92ZXI6dGV4dC1zbGF0ZS03MDAvODBcIlxyXG4gICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtpbmRUKFwiQ29tbW9uX0RlbGV0ZVwiLCBcIkRlbGV0ZVwiKX1cclxuICAgICAgICAgICAgICAgICAgdGl0bGU9e2luZFQoXCJDb21tb25fRGVsZXRlXCIsIFwiRGVsZXRlXCIpfVxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICA8WE1hcmtJY29uIGNsYXNzTmFtZT1cImgtNCB3LTRcIiBhcmlhLWhpZGRlbj1cInRydWVcIiAvPlxyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICAgICAgaWQ9e2lucHV0SWR9XHJcbiAgICAgICAgICAgICAgbmFtZT17YCR7aWRCYXNlfS1jb250YWN0cy1xdWVyeWB9XHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleC0xIG1pbi13LTMwIGJnLXRyYW5zcGFyZW50IHRleHQtc20gc206dGV4dC1iYXNlIGxlYWRpbmctNSB0ZXh0LXNsYXRlLTkwMCBib3JkZXItbm9uZSBvdXRsaW5lLWhpZGRlbiBweC0xIHB5LTEgZm9jdXM6cmluZy0wIGZvY3VzOmJvcmRlci10cmFuc3BhcmVudFwiXHJcbiAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgc2V0QWN0aXZlSW5kZXgoMCk7XHJcbiAgICAgICAgICAgICAgICBzZXRTaG93Tm90Rm91bmRTdGF0ZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBzZXRRdWVyeShldmVudC50YXJnZXQudmFsdWUpO1xyXG4gICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgb25LZXlEb3duPXtoYW5kbGVLZXlEb3dufVxyXG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtzZWxlY3RlZC5sZW5ndGggPyBcIlwiIDogaW5kVChcIlZpc2l0c19DcmVhdGVfRmlsdGVyUGxhY2Vob2xkZXJcIiwgXCJUeXBlIHRvIGZpbHRlci4uLlwiKX1cclxuICAgICAgICAgICAgICBhdXRvQ29tcGxldGU9XCJvZmZcIlxyXG4gICAgICAgICAgICAgIHJlZj17aW5wdXRSZWZ9XHJcbiAgICAgICAgICAgICAgcmVhZE9ubHk9eyFhY2NvdW50TnVtfVxyXG4gICAgICAgICAgICAgIHJvbGU9XCJjb21ib2JveFwiXHJcbiAgICAgICAgICAgICAgYXJpYS1leHBhbmRlZD17b3Blbn1cclxuICAgICAgICAgICAgICBhcmlhLWNvbnRyb2xzPXtsaXN0SWR9XHJcbiAgICAgICAgICAgICAgYXJpYS1hY3RpdmVkZXNjZW5kYW50PXthY3RpdmVJZH1cclxuICAgICAgICAgICAgICBhcmlhLWF1dG9jb21wbGV0ZT1cImxpc3RcIlxyXG4gICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2luZFQoXCJWaXNpdHNfQ3JlYXRlX1NlYXJjaENvbnRhY3RcIiwgXCJTZWFyY2ggY29udGFjdFwiKX1cclxuICAgICAgICAgICAgICBvbkZvY3VzPXsoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBlbnN1cmVMb2FkZWQoKTtcclxuICAgICAgICAgICAgICAgIHNldE9wZW4odHJ1ZSk7XHJcbiAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgeyhsb2FkaW5nIHx8IGJsb2NraW5nKSAmJiAoXHJcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQteS0wIHJpZ2h0LTkgZmxleCBpdGVtcy1jZW50ZXJcIj5cclxuICAgICAgICAgICAgICAgIDxTcGlubmVyIC8+XHJcbiAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC15LTAgcmlnaHQtMCBmbGV4IGl0ZW1zLWNlbnRlciBwci0yIHRleHQtc2xhdGUtNTAwIGhvdmVyOnRleHQtc2xhdGUtNjAwXCJcclxuICAgICAgICAgICAgYXJpYS1sYWJlbD17b3BlbiA/IGluZFQoXCJEcm9wZG93bl9IaWRlT3B0aW9uc1wiLCBcIkhpZGUgb3B0aW9uc1wiKSA6IGluZFQoXCJEcm9wZG93bl9TaG93T3B0aW9uc1wiLCBcIlNob3cgb3B0aW9uc1wiKX1cclxuICAgICAgICAgICAgYXJpYS1leHBhbmRlZD17b3Blbn1cclxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xyXG4gICAgICAgICAgICAgIGlmICghYWNjb3VudE51bSkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgIGlmIChvcGVuKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRPcGVuKGZhbHNlKTtcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZW5zdXJlTG9hZGVkKCk7XHJcbiAgICAgICAgICAgICAgICBzZXRPcGVuKHRydWUpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfX1cclxuICAgICAgICAgID5cclxuICAgICAgICAgICAge29wZW4gPyA8Q2hldnJvblVwU3ZnIGNsYXNzTmFtZT1cImgtNSB3LTVcIiBhcmlhLWhpZGRlbj1cInRydWVcIiAvPiA6IDxDaGV2cm9uRG93blN2ZyBjbGFzc05hbWU9XCJoLTUgdy01XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgLz59XHJcbiAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxGbG9hdGluZ0xpc3RcclxuICAgICAgICAgICAgYW5jaG9yUmVmPXtib3hSZWZ9XHJcbiAgICAgICAgICAgIG9wZW49e29wZW59XHJcbiAgICAgICAgICAgIHpJbmRleD17MzgwMDAwfVxyXG4gICAgICAgICAgICBtYXhIZWlnaHRDbGFzcz1cIm1heC1oLTcyXCJcclxuICAgICAgICAgICAgcm9sZT1cImxpc3Rib3hcIlxyXG4gICAgICAgICAgICByb3VuZGVkQ2xhc3M9XCJyb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXVwiXHJcbiAgICAgICAgICAgIHBvcnRhbENsYXNzTmFtZT17cG9ydGFsQ2xhc3NOYW1lfVxyXG4gICAgICAgICAgICBwYW5lbENsYXNzTmFtZT17cGFuZWxDbGFzc05hbWV9XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICA8ZGl2IHJlZj17bGlzdFJlZn0gaWQ9e2xpc3RJZH0gYXJpYS1tdWx0aXNlbGVjdGFibGU9XCJ0cnVlXCI+XHJcbiAgICAgICAgICAgIHtsb2FkaW5nICYmIChcclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHB4LTQgcHktMiB0ZXh0LXNtIHRleHQtc2xhdGUtNTAwXCI+XHJcbiAgICAgICAgICAgICAgICA8U3Bpbm5lciBzaXplPVwiaC00IHctNFwiIC8+XHJcbiAgICAgICAgICAgICAgICB7aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX1cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgeyFsb2FkaW5nICYmIG9wdGlvbnMubGVuZ3RoID09PSAwICYmIChcclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB4LTQgcHktMiB0ZXh0LXNtIHRleHQtc2xhdGUtNTAwXCI+XHJcbiAgICAgICAgICAgICAgICB7aGFzTG9hZGVkID8gaW5kVChcIlZpc2l0c19DcmVhdGVfTm9Db250YWN0c1wiLCBcIk5vIGNvbnRhY3RzXCIpIDogaW5kVChcIlZpc2l0c19DcmVhdGVfU2VsZWN0Q2xpZW50Rmlyc3RcIiwgXCJTZWxlY3QgYSBjbGllbnQgZmlyc3QuXCIpfVxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgICB7IWxvYWRpbmcgJiYgb3B0aW9ucy5sZW5ndGggPiAwICYmIGZpbHRlcmVkLmxlbmd0aCA9PT0gMCAmJiAoXHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJweC00IHB5LTIgdGV4dC1zbSB0ZXh0LXNsYXRlLTUwMFwiPlxyXG4gICAgICAgICAgICAgICAge3Nob3VsZFNob3dOb3RGb3VuZFJvd1xyXG4gICAgICAgICAgICAgICAgICA/IGluZFQoXCJDb21tb25fTm90Rm91bmRcIiwgXCJOb3QgZm91bmRcIilcclxuICAgICAgICAgICAgICAgICAgOiBpbmRUKFwiVmlzaXRzX0NyZWF0ZV9Ob01vcmVDb250YWN0c1wiLCBcIk5vIG1vcmUgY29udGFjdHMgYXZhaWxhYmxlXCIpfVxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgICB7IWxvYWRpbmcgJiZcclxuICAgICAgICAgICAgICBmaWx0ZXJlZC5tYXAoKG9wdCwgaWR4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzZWwgPSBzZWxlY3RlZC5zb21lKChzKSA9PiBzLnZhbHVlID09PSBvcHQudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaXNBY3RpdmUgPSBpZHggPT09IHJlc29sdmVkQWN0aXZlSW5kZXg7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgICAgICAgICAgICAga2V5PXtvcHQudmFsdWV9XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ9e2Ake2lkQmFzZX0tY29udGFjdC1vcHQtJHtvcHQudmFsdWV9YH1cclxuICAgICAgICAgICAgICAgICAgICByb2xlPVwib3B0aW9uXCJcclxuICAgICAgICAgICAgICAgICAgICBhcmlhLXNlbGVjdGVkPXtzZWx9XHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxyXG4gICAgICAgICAgICAgICAgICAgICAgXCJyZWxhdGl2ZSBmbGV4IHctZnVsbCBjdXJzb3ItZGVmYXVsdCBzZWxlY3Qtbm9uZSBpdGVtcy1zdGFydCBweS0yIHB4LTMgdGV4dC1sZWZ0IHRleHQtc21cIixcclxuICAgICAgICAgICAgICAgICAgICAgIGlzQWN0aXZlID8gXCJiZy1wcmltYXJ5IHRleHQtd2hpdGVcIiA6IHNlbCA/IFwiYmctcHJpbWFyeS8xMCB0ZXh0LXByaW1hcnlcIiA6IFwidGV4dC1zbGF0ZS05MDBcIlxyXG4gICAgICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICAgICAgb25Nb3VzZUVudGVyPXsoKSA9PiBzZXRBY3RpdmVJbmRleChpZHgpfVxyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHRvZ2dsZU9wdGlvbihvcHQpfVxyXG4gICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBmbGV4IGZsZXgtY29sIGdhcC0wLjUgcHItMlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtjbGFzc05hbWVzKFwiYmxvY2sgdHJ1bmNhdGVcIiwgc2VsID8gXCJmb250LW1lZGl1bVwiIDogXCJmb250LW5vcm1hbFwiKX0+e29wdC50ZXh0fTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImJsb2NrIHRleHQteHMgdGV4dC1zbGF0ZS02MDAgdHJ1bmNhdGVcIj57b3B0LmNhcmdvfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgIH0pfVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIHtibG9ja2luZyAmJiAoXHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIHotNzAwMDAgYmctd2hpdGUvNzAgYmFja2Ryb3AtYmx1ci1bMXB4XSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXVwiPlxyXG4gICAgICAgICAgICAgICAgPFNwaW5uZXIgc2l6ZT1cImgtNiB3LTZcIiAvPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgPC9GbG9hdGluZ0xpc3Q+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBmbGV4IGp1c3RpZnktZW5kXCI+XHJcbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXNsYXRlLTUwMCB0ZWNoLWluZm9cIj57c3RhdHVzfTwvc3Bhbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29udGFjdHNDb21ib2JveDtcclxuIiwgImltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuZnVuY3Rpb24gWE1hcmtJY29uKHtcbiAgdGl0bGUsXG4gIHRpdGxlSWQsXG4gIC4uLnByb3BzXG59LCBzdmdSZWYpIHtcbiAgcmV0dXJuIC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KFwic3ZnXCIsIE9iamVjdC5hc3NpZ24oe1xuICAgIHhtbG5zOiBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsXG4gICAgdmlld0JveDogXCIwIDAgMjAgMjBcIixcbiAgICBmaWxsOiBcImN1cnJlbnRDb2xvclwiLFxuICAgIFwiYXJpYS1oaWRkZW5cIjogXCJ0cnVlXCIsXG4gICAgXCJkYXRhLXNsb3RcIjogXCJpY29uXCIsXG4gICAgcmVmOiBzdmdSZWYsXG4gICAgXCJhcmlhLWxhYmVsbGVkYnlcIjogdGl0bGVJZFxuICB9LCBwcm9wcyksIHRpdGxlID8gLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0aXRsZVwiLCB7XG4gICAgaWQ6IHRpdGxlSWRcbiAgfSwgdGl0bGUpIDogbnVsbCwgLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoXCJwYXRoXCIsIHtcbiAgICBkOiBcIk02LjI4IDUuMjJhLjc1Ljc1IDAgMCAwLTEuMDYgMS4wNkw4Ljk0IDEwbC0zLjcyIDMuNzJhLjc1Ljc1IDAgMSAwIDEuMDYgMS4wNkwxMCAxMS4wNmwzLjcyIDMuNzJhLjc1Ljc1IDAgMSAwIDEuMDYtMS4wNkwxMS4wNiAxMGwzLjcyLTMuNzJhLjc1Ljc1IDAgMCAwLTEuMDYtMS4wNkwxMCA4Ljk0IDYuMjggNS4yMlpcIlxuICB9KSk7XG59XG5jb25zdCBGb3J3YXJkUmVmID0gLyojX19QVVJFX18qLyBSZWFjdC5mb3J3YXJkUmVmKFhNYXJrSWNvbik7XG5leHBvcnQgZGVmYXVsdCBGb3J3YXJkUmVmOyIsICJcdUZFRkZpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBDbGllbnRTZWFyY2hDb21ib2JveCBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy92aXNpdGFzL0NsaWVudFNlYXJjaENvbWJvYm94LnRzeFwiO1xyXG5pbXBvcnQgQ29udGFjdHNDb21ib2JveCBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy92aXNpdGFzL0NvbnRhY3RzQ29tYm9ib3gudHN4XCI7XHJcblxyXG5leHBvcnQgdHlwZSBDcmVhdGVTZWxlY3RlZENsaWVudCA9IHtcclxuICB2YWx1ZTogc3RyaW5nO1xyXG4gIHRleHQ6IHN0cmluZztcclxuICBjYXJnbz86IHN0cmluZztcclxuICBlbXByZXNhPzogc3RyaW5nO1xyXG59IHwgbnVsbDtcclxuXHJcbmV4cG9ydCB0eXBlIENyZWF0ZVNlbGVjdGVkQ29udGFjdCA9IHtcclxuICB2YWx1ZTogc3RyaW5nO1xyXG4gIHRleHQ6IHN0cmluZztcclxuICBjYXJnbzogc3RyaW5nO1xyXG4gIGVtcHJlc2E6IHN0cmluZztcclxufTtcclxuXHJcbnR5cGUgQ3JlYXRlU3RlcENsaWVudFNlbGVjdGlvblByb3BzID0ge1xyXG4gIHNlbGVjdGVkQ2xpZW50OiBDcmVhdGVTZWxlY3RlZENsaWVudDtcclxuICBzZWxlY3RlZENvbnRhY3RzOiBDcmVhdGVTZWxlY3RlZENvbnRhY3RbXTtcclxuICBvbkNsaWVudFNlbGVjdGVkOiAobmV4dENsaWVudDogQ3JlYXRlU2VsZWN0ZWRDbGllbnQpID0+IHZvaWQ7XHJcbiAgb25Db250YWN0c0NoYW5nZTogKG5leHRDb250YWN0czogQ3JlYXRlU2VsZWN0ZWRDb250YWN0W10pID0+IHZvaWQ7XHJcbiAgY2xpZW50TGFiZWw6IHN0cmluZztcclxuICBjbGllbnRQbGFjZWhvbGRlcjogc3RyaW5nO1xyXG4gIHNlbGVjdGVkQ29udGFjdHNDb3VudFRleHQ6IHN0cmluZztcclxufTtcclxuXHJcbi8vIFJlbmRlcnMgc3RlcCAxIHdoZXJlIHVzZXIgc2VsZWN0cyB0aGUgYWNjb3VudCBhbmQgcmVsYXRlZCBjb250YWN0cy5cclxuY29uc3QgQ3JlYXRlU3RlcENsaWVudFNlbGVjdGlvbiA9ICh7XHJcbiAgc2VsZWN0ZWRDbGllbnQsXHJcbiAgc2VsZWN0ZWRDb250YWN0cyxcclxuICBvbkNsaWVudFNlbGVjdGVkLFxyXG4gIG9uQ29udGFjdHNDaGFuZ2UsXHJcbiAgY2xpZW50TGFiZWwsXHJcbiAgY2xpZW50UGxhY2Vob2xkZXIsXHJcbiAgc2VsZWN0ZWRDb250YWN0c0NvdW50VGV4dCxcclxufTogQ3JlYXRlU3RlcENsaWVudFNlbGVjdGlvblByb3BzKSA9PiB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS02XCI+XHJcbiAgICAgIDxDbGllbnRTZWFyY2hDb21ib2JveFxyXG4gICAgICAgIHZhbHVlPXtzZWxlY3RlZENsaWVudH1cclxuICAgICAgICBvblNlbGVjdGVkPXtvbkNsaWVudFNlbGVjdGVkfVxyXG4gICAgICAgIGxhYmVsPXtjbGllbnRMYWJlbH1cclxuICAgICAgICBwbGFjZWhvbGRlcj17Y2xpZW50UGxhY2Vob2xkZXJ9XHJcbiAgICAgICAgcG9ydGFsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcclxuICAgICAgLz5cclxuXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0zXCI+XHJcbiAgICAgICAgPENvbnRhY3RzQ29tYm9ib3hcclxuICAgICAgICAgIGFjY291bnROdW09e3NlbGVjdGVkQ2xpZW50Py52YWx1ZX1cclxuICAgICAgICAgIHZhbHVlPXtzZWxlY3RlZENvbnRhY3RzfVxyXG4gICAgICAgICAgb25DaGFuZ2U9e29uQ29udGFjdHNDaGFuZ2V9XHJcbiAgICAgICAgICBwb3J0YWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxyXG4gICAgICAgIC8+XHJcbiAgICAgICAge3NlbGVjdGVkQ29udGFjdHMubGVuZ3RoID4gMCAmJiAoXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS02MDBcIj5cclxuICAgICAgICAgICAge3NlbGVjdGVkQ29udGFjdHNDb3VudFRleHR9XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApfVxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDcmVhdGVTdGVwQ2xpZW50U2VsZWN0aW9uO1xyXG4iLCAiXHVGRUZGaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgU2luZ2xlRGF0ZVBpY2tlciBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NpbmdsZURhdGVQaWNrZXIudHN4XCI7XHJcbmltcG9ydCBTZWxlY3RDb21ib2JveCBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NlbGVjdENvbWJvYm94LnRzeFwiO1xyXG5pbXBvcnQgVmlzaXROYXJyYXRpdmVGaWVsZHMgZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvdmlzaXRhcy9WaXNpdE5hcnJhdGl2ZUZpZWxkcy50c3hcIjtcclxuXHJcbnR5cGUgU2VsZWN0T3B0aW9uID0ge1xyXG4gIHZhbHVlPzogc3RyaW5nIHwgbnVtYmVyO1xyXG4gIFZhbHVlPzogc3RyaW5nIHwgbnVtYmVyO1xyXG4gIHRleHQ/OiBzdHJpbmc7XHJcbiAgVGV4dD86IHN0cmluZztcclxufTtcclxuXHJcbnR5cGUgTmFycmF0aXZlVGFwRmllbGQgPSB7XHJcbiAgaWQ6IHN0cmluZztcclxuICBsYWJlbDogc3RyaW5nO1xyXG4gIHZhbHVlOiBzdHJpbmc7XHJcbiAgY2xhc3NOYW1lOiBzdHJpbmc7XHJcbiAgcG9pbnRlckJpbmRpbmdzOiB7XHJcbiAgICBvblBvaW50ZXJEb3duPzogUmVhY3QuUG9pbnRlckV2ZW50SGFuZGxlcjxIVE1MVGV4dEFyZWFFbGVtZW50PjtcclxuICAgIG9uUG9pbnRlck1vdmU/OiBSZWFjdC5Qb2ludGVyRXZlbnRIYW5kbGVyPEhUTUxUZXh0QXJlYUVsZW1lbnQ+O1xyXG4gICAgb25Qb2ludGVyVXA/OiBSZWFjdC5Qb2ludGVyRXZlbnRIYW5kbGVyPEhUTUxUZXh0QXJlYUVsZW1lbnQ+O1xyXG4gICAgb25Qb2ludGVyQ2FuY2VsPzogUmVhY3QuUG9pbnRlckV2ZW50SGFuZGxlcjxIVE1MVGV4dEFyZWFFbGVtZW50PjtcclxuICB9O1xyXG59O1xyXG5cclxudHlwZSBDcmVhdGVTdGVwVmlzaXREZXRhaWxzUHJvcHMgPSB7XHJcbiAgdGl0bGU6IHN0cmluZztcclxuICBkYXRlTGFiZWw6IHN0cmluZztcclxuICB0cmFuc0RhdGU6IHN0cmluZztcclxuICBvblRyYW5zRGF0ZUNoYW5nZTogKG5leHRWYWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIHZpc2l0VHlwZUxhYmVsOiBzdHJpbmc7XHJcbiAgdmlzaXRUeXBlczogU2VsZWN0T3B0aW9uW107XHJcbiAgdmlzaXRUeXBlOiBzdHJpbmc7XG4gIG9uVmlzaXRUeXBlQ2hhbmdlOiAobmV4dFZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHZpc2l0VHlwZVBsYWNlaG9sZGVyOiBzdHJpbmc7XG4gIHZpc2l0VHlwZUludmFsaWQ6IGJvb2xlYW47XG4gIGNvbnRhY3RNZXRob2RMYWJlbDogc3RyaW5nO1xuICBjb250YWN0TWV0aG9kczogU2VsZWN0T3B0aW9uW107XG4gIGNvbnRhY3RNZXRob2Q6IHN0cmluZztcbiAgb25Db250YWN0TWV0aG9kQ2hhbmdlOiAobmV4dFZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIGNvbnRhY3RNZXRob2RQbGFjZWhvbGRlcjogc3RyaW5nO1xuICBkZXNjcmlwdGlvbkxhYmVsOiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uVmFsdWU6IHN0cmluZztcclxuICBkZXNjcmlwdGlvbkNsYXNzTmFtZTogc3RyaW5nO1xyXG4gIG9uRGVzY3JpcHRpb25DaGFuZ2U6IChuZXh0VmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICB0YXBGaWVsZHM6IE5hcnJhdGl2ZVRhcEZpZWxkW107XHJcbiAgc3RhdHVzOiBzdHJpbmc7XHJcbn07XHJcblxyXG4vLyBSZW5kZXJzIHN0ZXAgMiB3aXRoIHZpc2l0IG1ldGFkYXRhIGFuZCBuYXJyYXRpdmUgZmllbGRzLlxyXG5jb25zdCBDcmVhdGVTdGVwVmlzaXREZXRhaWxzID0gKHtcclxuICB0aXRsZSxcclxuICBkYXRlTGFiZWwsXHJcbiAgdHJhbnNEYXRlLFxyXG4gIG9uVHJhbnNEYXRlQ2hhbmdlLFxyXG4gIHZpc2l0VHlwZUxhYmVsLFxyXG4gIHZpc2l0VHlwZXMsXHJcbiAgdmlzaXRUeXBlLFxyXG4gIG9uVmlzaXRUeXBlQ2hhbmdlLFxuICB2aXNpdFR5cGVQbGFjZWhvbGRlcixcbiAgdmlzaXRUeXBlSW52YWxpZCxcbiAgY29udGFjdE1ldGhvZExhYmVsLFxuICBjb250YWN0TWV0aG9kcyxcbiAgY29udGFjdE1ldGhvZCxcbiAgb25Db250YWN0TWV0aG9kQ2hhbmdlLFxuICBjb250YWN0TWV0aG9kUGxhY2Vob2xkZXIsXG4gIGRlc2NyaXB0aW9uTGFiZWwsXG4gIGRlc2NyaXB0aW9uVmFsdWUsXHJcbiAgZGVzY3JpcHRpb25DbGFzc05hbWUsXHJcbiAgb25EZXNjcmlwdGlvbkNoYW5nZSxcclxuICB0YXBGaWVsZHMsXHJcbiAgc3RhdHVzLFxyXG59OiBDcmVhdGVTdGVwVmlzaXREZXRhaWxzUHJvcHMpID0+IHtcclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzaGFkb3cteHMgZ2xhc3MtcGFuZWwgcC00IHNwYWNlLXktNCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXVwiPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtYmFzZSBmb250LXNlbWlib2xkIHRleHQtc2xhdGUtOTAwIGJvcmRlci1iIGJvcmRlci1zbGF0ZS0yMDAgcGItM1wiPlxyXG4gICAgICAgIHt0aXRsZX1cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMyBnYXAtNFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInZpc2l0YS1maWVsZC10ZXh0XCI+XG4gICAgICAgICAgPFNpbmdsZURhdGVQaWNrZXIgbGFiZWw9e2RhdGVMYWJlbH0gdmFsdWU9e3RyYW5zRGF0ZX0gb25DaGFuZ2U9e29uVHJhbnNEYXRlQ2hhbmdlfSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPFNlbGVjdENvbWJvYm94XHJcbiAgICAgICAgICBsYWJlbD17dmlzaXRUeXBlTGFiZWx9XHJcbiAgICAgICAgICBvcHRpb25zPXt2aXNpdFR5cGVzfVxyXG4gICAgICAgICAgdmFsdWU9e3Zpc2l0VHlwZX1cclxuICAgICAgICAgIG9uQ2hhbmdlPXsobmV4dFZhbHVlKSA9PiBvblZpc2l0VHlwZUNoYW5nZShTdHJpbmcobmV4dFZhbHVlID8/IFwiXCIpKX1cclxuICAgICAgICAgIHBsYWNlaG9sZGVyPXt2aXNpdFR5cGVQbGFjZWhvbGRlcn1cclxuICAgICAgICAgIGludmFsaWQ9e3Zpc2l0VHlwZUludmFsaWR9XHJcbiAgICAgICAgICBlbWl0T25WYWx1ZUNoYW5nZVxuICAgICAgICAgIHBvcnRhbENsYXNzTmFtZT1cInZpc2l0YXMtdHlwb2dyYXBoeVwiXG4gICAgICAgIC8+XG4gICAgICAgIDxTZWxlY3RDb21ib2JveFxuICAgICAgICAgIGxhYmVsPXtjb250YWN0TWV0aG9kTGFiZWx9XG4gICAgICAgICAgb3B0aW9ucz17Y29udGFjdE1ldGhvZHN9XG4gICAgICAgICAgdmFsdWU9e2NvbnRhY3RNZXRob2R9XG4gICAgICAgICAgb25DaGFuZ2U9eyhuZXh0VmFsdWUpID0+IG9uQ29udGFjdE1ldGhvZENoYW5nZShTdHJpbmcobmV4dFZhbHVlID8/IFwiXCIpKX1cbiAgICAgICAgICBwbGFjZWhvbGRlcj17Y29udGFjdE1ldGhvZFBsYWNlaG9sZGVyfVxuICAgICAgICAgIGVtaXRPblZhbHVlQ2hhbmdlXG4gICAgICAgICAgcG9ydGFsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuXHJcbiAgICAgIDxWaXNpdE5hcnJhdGl2ZUZpZWxkc1xyXG4gICAgICAgIGRlc2NyaXB0aW9uTGFiZWw9e2Rlc2NyaXB0aW9uTGFiZWx9XHJcbiAgICAgICAgZGVzY3JpcHRpb25WYWx1ZT17ZGVzY3JpcHRpb25WYWx1ZX1cclxuICAgICAgICBkZXNjcmlwdGlvbkNsYXNzTmFtZT17ZGVzY3JpcHRpb25DbGFzc05hbWV9XHJcbiAgICAgICAgb25EZXNjcmlwdGlvbkNoYW5nZT17b25EZXNjcmlwdGlvbkNoYW5nZX1cclxuICAgICAgICB0YXBGaWVsZHM9e3RhcEZpZWxkc31cclxuICAgICAgLz5cclxuXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTNcIj5cclxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNtIHRleHQtc2xhdGUtNTAwXCI+e3N0YXR1c308L3NwYW4+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IENyZWF0ZVN0ZXBWaXNpdERldGFpbHM7XHJcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBDcmVhdGVGb3JtIGZyb20gXCIuL0NyZWF0ZUZvcm0udHN4XCI7XHJcbmltcG9ydCBWaXNpdGFzUGFnZVByb3ZpZGVycyBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1Zpc2l0YXNQYWdlUHJvdmlkZXJzLnRzeFwiO1xyXG5pbXBvcnQgeyBtb3VudFJlYWN0SXNsYW5kLCBtb3VudFdoZW5Eb2N1bWVudFJlYWR5IH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3JlYWN0SXNsYW5kLnRzeFwiO1xyXG5cclxuLy8gUGFnZSBlbnRyeSBmb3IgdGhlIHZpc2l0YXMgY3JlYXRlIGlzbGFuZC5cclxuY29uc3QgQ3JlYXRlUGFnZSA9ICgpID0+IHtcclxuICByZXR1cm4gKFxyXG4gICAgPFZpc2l0YXNQYWdlUHJvdmlkZXJzPlxyXG4gICAgICA8Q3JlYXRlRm9ybSAvPlxyXG4gICAgPC9WaXNpdGFzUGFnZVByb3ZpZGVycz5cclxuICApO1xyXG59O1xyXG5cclxuY29uc3QgbW91bnQgPSAoKSA9PiB7XHJcbiAgY29uc3Qgcm9vdEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2aXNpdGFzLWFwcC1yb290XCIpO1xyXG4gIGlmICghcm9vdEVsKSByZXR1cm47XHJcblxyXG4gIG1vdW50UmVhY3RJc2xhbmQocm9vdEVsLCA8Q3JlYXRlUGFnZSAvPik7XHJcbn07XHJcblxyXG5tb3VudFdoZW5Eb2N1bWVudFJlYWR5KG1vdW50KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IENyZWF0ZVBhZ2U7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUMsSUFBQUEsZ0JBQTREOzs7QUNBN0QsbUJBQTBCO0FBR25CLElBQU0sWUFBWSxDQUN2QixNQUNBLFdBQ0EsUUFDQSxRQUNBLE9BQU8sT0FDUCxpQkFBaUIsTUFDakJDLGFBQVksU0FDVDtBQUNILDhCQUFVLE1BQU07QUFD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S0FBSyxpQ0FBaUMsZUFBZTtBQUFBLFFBQzVELFdBQVcsS0FBSyw0QkFBNEIsTUFBTTtBQUFBLFFBQ2xEO0FBQUEsUUFDQSxtQkFBbUI7QUFBQSxRQUNuQixnQkFBZ0IsS0FBSyxpQ0FBaUMsWUFBWTtBQUFBLFFBQ2xFO0FBQUEsUUFDQTtBQUFBLFFBQ0EsbUJBQW1CO0FBQUEsUUFDbkIsc0JBQXNCLEtBQUssdUNBQXVDLGFBQWE7QUFBQSxRQUMvRTtBQUFBLFFBQ0Esb0JBQW9CLEtBQUsscUNBQXFDLGdCQUFnQjtBQUFBLFFBQzlFO0FBQUEsUUFDQTtBQUFBLFFBQ0EsdUJBQXVCO0FBQUEsUUFDdkIsMEJBQTBCLEtBQUssMkNBQTJDLGVBQWU7QUFBQSxRQUN6RjtBQUFBLFFBQ0Esa0JBQWtCO0FBQUEsUUFDbEIsc0JBQXNCO0FBQUEsUUFDdEIscUJBQXFCO0FBQUEsUUFDckIsV0FBVztBQUFBLFVBQ1Q7QUFBQSxZQUNFLElBQUk7QUFBQSxZQUNKLE9BQU87QUFBQSxZQUNQLE9BQU87QUFBQSxZQUNQLFdBQVc7QUFBQSxZQUNYLGlCQUFpQjtBQUFBLFVBQ25CO0FBQUEsVUFDQTtBQUFBLFlBQ0UsSUFBSTtBQUFBLFlBQ0osT0FBTztBQUFBLFlBQ1AsT0FBTztBQUFBLFlBQ1AsV0FBVztBQUFBLFlBQ1gsaUJBQWlCO0FBQUEsVUFDbkI7QUFBQSxVQUNBO0FBQUEsWUFDRSxJQUFJO0FBQUEsWUFDSixPQUFPO0FBQUEsWUFDUCxPQUFPO0FBQUEsWUFDUCxXQUFXO0FBQUEsWUFDWCxpQkFBaUI7QUFBQSxVQUNuQjtBQUFBLFFBQ0Y7QUFBQSxRQUNBO0FBQUE7QUFBQSxJQUNGO0FBQUEsS0FFSjtBQUVKO0FBR2UsU0FBUixhQUE4QjtBQUNuQyxTQUNFLDZDQUFDLDRCQUFpQixpQkFBaUIsS0FBSywrQkFBK0IsMEVBQTBFLEdBQy9JLHVEQUFDLGNBQVcsR0FDZDtBQUVKOzs7QVV2WU0sSUFBQUMsc0JBQUE7QUFITixJQUFNLGFBQWEsTUFBTTtBQUN2QixTQUNFLDZDQUFDLGdDQUNDLHVEQUFDLGNBQVcsR0FDZDtBQUVKO0FBRUEsSUFBTSxRQUFRLE1BQU07QUFDbEIsUUFBTSxTQUFTLFNBQVMsZUFBZSxrQkFBa0I7QUFDekQsTUFBSSxDQUFDLE9BQVE7QUFFYixtQkFBaUIsUUFBUSw2Q0FBQyxjQUFXLENBQUU7QUFDekM7QUFFQSx1QkFBdUIsS0FBSztBQUU1QixJQUFPLHFCQUFROyIsCiAgIm5hbWVzIjogWyJpbXBvcnRfcmVhY3QiLCAiY2FuQWNjZXNzIiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgInZhbHVlIiwgIlJlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgIlJlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSJdCn0K
