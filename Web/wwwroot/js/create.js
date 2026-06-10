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
} from "./chunks/chunk-L2CN5NRP.js";
import {
  SingleDatePicker
} from "./chunks/chunk-DU37RXVC.js";
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
} from "./chunks/chunk-A2ZWLU76.js";
import {
  SelectCombobox_default
} from "./chunks/chunk-WNGAZ2I2.js";
import {
  handleComboboxKeyDown
} from "./chunks/chunk-YMDESVRK.js";
import {
  ChevronDownSvg,
  ChevronUpSvg,
  FloatingList_default,
  useOutsideClick
} from "./chunks/chunk-XB6OXILH.js";
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
} from "./chunks/chunk-FZJKOUY3.js";
import "./chunks/chunk-SRZDJTMJ.js";
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
        visitType,
        contactMethod: Number(contactMethod || 0),
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvY3JlYWNpb24vQ3JlYXRlRm9ybS50c3giLCAiLi4vcmVhY3Qvc3JjL2hvb2tzL3VzZVRvcGJhci50cyIsICIuLi9yZWFjdC9zcmMvaG9va3MvdXNlQ3JlYXRlRHJhZnQudHMiLCAiLi4vcmVhY3Qvc3JjL3V0aWxzL2dsb2JhbFNwaW5uZXIudHMiLCAiLi4vcmVhY3Qvc3JjL2hvb2tzL3VzZUNyZWF0ZVN1Ym1pdC50cyIsICIuLi9yZWFjdC9zcmMvdXRpbHMvaW5kSWRzLnRzIiwgIi4uL3JlYWN0L3NyYy9jb21wb25lbnRzL3Zpc2l0YXMvQ29udGFjdHNDb21ib2JveC50c3giLCAiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BoZXJvaWNvbnMvcmVhY3QvMjAvc29saWQvZXNtL1hNYXJrSWNvbi5qcyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9jcmVhY2lvbi9DcmVhdGVTdGVwQ2xpZW50U2VsZWN0aW9uLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9jcmVhY2lvbi9DcmVhdGVTdGVwVmlzaXREZXRhaWxzLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9jcmVhY2lvbi9DcmVhdGVQYWdlLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiXHVGRUZGaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlU3RhdGUsIHVzZVJlZiB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgQ29uZmlybU1vZGFsIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvQ29uZmlybU1vZGFsLnRzeFwiO1xyXG5pbXBvcnQgQXBwRXJyb3JCb3VuZGFyeSBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0FwcEVycm9yQm91bmRhcnkudHN4XCI7XHJcbmltcG9ydCB7IHVzZVZpc2l0YXMgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlVmlzaXRhcy50c1wiO1xyXG5pbXBvcnQgeyB1c2VUYXBHdWFyZCB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VUYXBHdWFyZC50c1wiO1xyXG5pbXBvcnQgeyB1c2VUb3BiYXIgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlVG9wYmFyLnRzXCI7XHJcbmltcG9ydCB7IHVzZUNvbmZpcm1EaWFsb2cgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlQ29uZmlybURpYWxvZy50c1wiO1xyXG5pbXBvcnQgeyB1c2VDcmVhdGVEcmFmdCB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VDcmVhdGVEcmFmdC50c1wiO1xyXG5pbXBvcnQgeyB1c2VDcmVhdGVTdWJtaXQgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlQ3JlYXRlU3VibWl0LnRzXCI7XHJcbmltcG9ydCB7IHVzZVRleHRFZGl0b3JGaWVsZHMgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlVGV4dEVkaXRvckZpZWxkcy50c1wiO1xyXG5pbXBvcnQgQ3JlYXRlU3RlcENsaWVudFNlbGVjdGlvbiwgeyBDcmVhdGVTZWxlY3RlZENsaWVudCwgQ3JlYXRlU2VsZWN0ZWRDb250YWN0IH0gZnJvbSBcIi4vQ3JlYXRlU3RlcENsaWVudFNlbGVjdGlvbi50c3hcIjtcclxuaW1wb3J0IENyZWF0ZVN0ZXBWaXNpdERldGFpbHMgZnJvbSBcIi4vQ3JlYXRlU3RlcFZpc2l0RGV0YWlscy50c3hcIjtcclxuaW1wb3J0IHsgY2xhc3NOYW1lcyB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9jbGFzc05hbWVzLnRzXCI7XHJcbmltcG9ydCB7IGluZEZvcm1hdCwgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB7IGNhbkFjY2Vzcywgc2hvd1Blcm1pc3Npb25Nb2RhbCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9wZXJtaXNzaW9ucy50c1wiO1xyXG5pbXBvcnQgeyBzZXRQcmV2aWV3QW5jaG9yLCBzaG93UHJldmlld1Rvb2x0aXAsIGlzT3ZlcmZsb3dpbmcgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvcHJldmlld1Rvb2x0aXAudHNcIjtcclxuaW1wb3J0IHsgbmF2aWdhdGVUb1RleHRFZGl0b3JGaWVsZCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy90ZXh0RWRpdG9yTmF2aWdhdGlvbi50c1wiO1xyXG5pbXBvcnQgeyBmbGFzaEFjdGlvbk1hcmsgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvdmlzaXRhc0hpc3RvcnkudHNcIjtcclxuXHJcbmZ1bmN0aW9uIFZpc2l0YXNBcHAoKSB7XG4gIGNvbnN0IHsgdmlzaXRUeXBlcywgY29udGFjdE1ldGhvZHMsIGFzaXN0ZW50ZVRpcG9zIH0gPSB1c2VWaXNpdGFzKCk7XG4gIGNvbnN0IGNhbkNyZWF0ZVZpc2l0ID0gY2FuQWNjZXNzKFwiVklTSVRBU19HRVNUSU9OXCIsIFwiQWRkXCIpO1xyXG4gIGNvbnN0IGNhblJvbGxiYWNrRGVsZXRlID0gY2FuQWNjZXNzKFwiVklTSVRBU19HRVNUSU9OXCIsIFwiRnVsbEFjY2Vzc1wiKTtcclxuXHJcbiAgY29uc3QgZmllbGRJZENvbWVudGFyaW9zID0gXCJWaXNpdGEuQ3JlYXRlLkNvbWVudGFyaW9zXCI7XHJcbiAgY29uc3QgZmllbGRJZEFudGVjZWRlbnRlcyA9IFwiVmlzaXRhLkNyZWF0ZS5BbnRlY2VkZW50ZXNcIjtcclxuICBjb25zdCBmaWVsZElkQ29uY2x1c2lvbmVzID0gXCJWaXNpdGEuQ3JlYXRlLkNvbmNsdXNpb25lc1wiO1xyXG5cclxuICBjb25zdCBbc3RlcCwgc2V0U3RlcF0gPSB1c2VTdGF0ZSgxKTtcclxuICBjb25zdCBbc2VsZWN0ZWRDbGllbnQsIHNldFNlbGVjdGVkQ2xpZW50XSA9IHVzZVN0YXRlPENyZWF0ZVNlbGVjdGVkQ2xpZW50PihudWxsKTtcclxuICBjb25zdCBbc2VsZWN0ZWRDb250YWN0cywgc2V0U2VsZWN0ZWRDb250YWN0c10gPSB1c2VTdGF0ZTxDcmVhdGVTZWxlY3RlZENvbnRhY3RbXT4oW10pO1xyXG4gIGNvbnN0IHRvZGF5U3RyaW5nID0gKCkgPT4ge1xyXG4gICAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpO1xyXG4gICAgY29uc3QgeXl5eSA9IHRvZGF5LmdldEZ1bGxZZWFyKCk7XHJcbiAgICBjb25zdCBtbSA9IFN0cmluZyh0b2RheS5nZXRNb250aCgpICsgMSkucGFkU3RhcnQoMiwgXCIwXCIpO1xyXG4gICAgY29uc3QgZGQgPSBTdHJpbmcodG9kYXkuZ2V0RGF0ZSgpKS5wYWRTdGFydCgyLCBcIjBcIik7XHJcbiAgICByZXR1cm4gYCR7eXl5eX0tJHttbX0tJHtkZH1gO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGRlZmF1bHRWaXNpdFR5cGUgPSBTdHJpbmcodmlzaXRUeXBlc1swXT8udmFsdWUgPz8gdmlzaXRUeXBlc1swXT8uVmFsdWUgPz8gXCJcIik7XG4gIGNvbnN0IGRlZmF1bHRDb250YWN0TWV0aG9kID0gU3RyaW5nKGNvbnRhY3RNZXRob2RzWzBdPy52YWx1ZSA/PyBjb250YWN0TWV0aG9kc1swXT8uVmFsdWUgPz8gXCIwXCIpO1xuICBjb25zdCBkZWZhdWx0QXNpc3RlbnRlVGlwbyA9IFN0cmluZyhhc2lzdGVudGVUaXBvc1swXT8udmFsdWUgPz8gYXNpc3RlbnRlVGlwb3NbMF0/LlZhbHVlID8/IFwiMFwiKTtcblxuICBjb25zdCBbdmlzaXRUeXBlLCBzZXRWaXNpdFR5cGVdID0gdXNlU3RhdGU8c3RyaW5nPihkZWZhdWx0VmlzaXRUeXBlKTtcbiAgY29uc3QgW2NvbnRhY3RNZXRob2QsIHNldENvbnRhY3RNZXRob2RdID0gdXNlU3RhdGU8c3RyaW5nPihkZWZhdWx0Q29udGFjdE1ldGhvZCk7XG4gIGNvbnN0IFt0cmFuc0RhdGUsIHNldFRyYW5zRGF0ZV0gPSB1c2VTdGF0ZSgoKSA9PiB0b2RheVN0cmluZygpKTtcbiAgY29uc3QgW2Rlc2NyaXB0aW9uLCBzZXREZXNjcmlwdGlvbl0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbY29tZW50YXJpb3MsIHNldENvbWVudGFyaW9zXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFthbnRlY2VkZW50ZXMsIHNldEFudGVjZWRlbnRlc10gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbY29uY2x1c2lvbmVzLCBzZXRDb25jbHVzaW9uZXNdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW3N0YXR1cywgc2V0U3RhdHVzXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtidXN5LCBzZXRCdXN5XSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbc2hvd1JlcXVpcmVkLCBzZXRTaG93UmVxdWlyZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFttb2RhbEVycm9yLCBzZXRNb2RhbEVycm9yXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG5cclxuICBjb25zdCB7IG1vZGFsLCBvcGVuQ29uZmlybSwgY2xvc2VDb25maXJtLCBoYW5kbGVDb25maXJtIH0gPSB1c2VDb25maXJtRGlhbG9nKHtcclxuICAgIGRlZmF1bHRDb25maXJtVGV4dDogaW5kVChcIkNvbmZpcm1fWWVzXCIsIFwiQ29uZmlybV9ZZXNcIiksXHJcbiAgICBkZWZhdWx0Q2FuY2VsVGV4dDogaW5kVChcIkNvbmZpcm1fTm9cIiwgXCJDb25maXJtX05vXCIpXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZU1vZGFsQ29uZmlybSA9IFJlYWN0LnVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcclxuICAgIHNldE1vZGFsRXJyb3IoXCJcIik7XHJcbiAgICBhd2FpdCBoYW5kbGVDb25maXJtKHtcclxuICAgICAgYnVzeSxcclxuICAgICAgb25FcnJvcjogKG1zZykgPT4ge1xyXG4gICAgICAgIHNldE1vZGFsRXJyb3IobXNnKTtcclxuICAgICAgICBzZXRTdGF0dXMobXNnKTtcclxuICAgICAgICBmbGFzaEFjdGlvbk1hcmsoXCJlcnJvclByb2Nlc3NcIiwgMTUwMCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0sIFtidXN5LCBoYW5kbGVDb25maXJtXSk7XHJcblxyXG4gIGNvbnN0IG1vZGFsTG9hZGluZ1RleHQgPSBpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJDb21tb25fTG9hZGluZ1wiKTtcclxuICBjb25zdCBtb2RhbENhbmNlbFRleHQgPSBtb2RhbC5jYW5jZWxUZXh0IHx8IGluZFQoXCJDb25maXJtX05vXCIsIFwiQ29uZmlybV9Ob1wiKTtcclxuICBjb25zdCBtb2RhbENvbmZpcm1UZXh0ID0gYnVzeVxyXG4gICAgPyBtb2RhbExvYWRpbmdUZXh0XHJcbiAgICA6ICghYnVzeSAmJiBtb2RhbEVycm9yID8gaW5kVChcIkNvbW1vbl9PS1wiLCBcIkNvbW1vbl9PS1wiKSA6IChtb2RhbC5jb25maXJtVGV4dCB8fCBpbmRUKFwiQ29uZmlybV9ZZXNcIiwgXCJDb25maXJtX1llc1wiKSkpO1xyXG5cclxuICBjb25zdCBoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm0gPSBSZWFjdC51c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAoIWJ1c3kgJiYgbW9kYWxFcnJvcikge1xyXG4gICAgICBjbG9zZUNvbmZpcm0oKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaGFuZGxlTW9kYWxDb25maXJtKCk7XHJcbiAgfSwgW2J1c3ksIG1vZGFsRXJyb3IsIGNsb3NlQ29uZmlybSwgaGFuZGxlTW9kYWxDb25maXJtXSk7XHJcblxyXG4gIGNvbnN0IGRyYWZ0U25hcHNob3QgPSB1c2VNZW1vKFxyXG4gICAgKCkgPT4gKHtcclxuICAgICAgc2VsZWN0ZWRDbGllbnQsXHJcbiAgICAgIHNlbGVjdGVkQ29udGFjdHMsXG4gICAgICB2aXNpdFR5cGUsXG4gICAgICBjb250YWN0TWV0aG9kLFxuICAgICAgdHJhbnNEYXRlLFxuICAgICAgZGVzY3JpcHRpb24sXHJcbiAgICAgIGNvbWVudGFyaW9zLFxyXG4gICAgICBhbnRlY2VkZW50ZXMsXHJcbiAgICAgIGNvbmNsdXNpb25lcyxcclxuICAgICAgc3RlcCxcclxuICAgIH0pLFxyXG4gICAgW3NlbGVjdGVkQ2xpZW50LCBzZWxlY3RlZENvbnRhY3RzLCB2aXNpdFR5cGUsIGNvbnRhY3RNZXRob2QsIHRyYW5zRGF0ZSwgZGVzY3JpcHRpb24sIGNvbWVudGFyaW9zLCBhbnRlY2VkZW50ZXMsIGNvbmNsdXNpb25lcywgc3RlcF1cbiAgKTtcblxyXG4gIGNvbnN0IHsgcGVyc2lzdERyYWZ0Tm93IH0gPSB1c2VDcmVhdGVEcmFmdCh7XHJcbiAgICBkcmFmdFNuYXBzaG90LFxyXG4gICAgc2V0U2VsZWN0ZWRDbGllbnQsXHJcbiAgICBzZXRTZWxlY3RlZENvbnRhY3RzLFxuICAgIHNldFZpc2l0VHlwZSxcbiAgICBzZXRDb250YWN0TWV0aG9kLFxuICAgIHNldFRyYW5zRGF0ZSxcbiAgICBzZXREZXNjcmlwdGlvbixcclxuICAgIHNldENvbWVudGFyaW9zLFxyXG4gICAgc2V0QW50ZWNlZGVudGVzLFxyXG4gICAgc2V0Q29uY2x1c2lvbmVzLFxyXG4gICAgc2V0U3RlcCxcclxuICB9KTtcclxuXHJcbiAgLy8gT3BlbnMgdGhlIGZ1bGwtc2NyZWVuIHRleHQgZWRpdG9yIGZvciBhIG11bHRpbGluZSBmaWVsZC5cclxuICBjb25zdCBvcGVuVGV4dEVkaXRvciA9IFJlYWN0LnVzZUNhbGxiYWNrKFxyXG4gICAgKGZpZWxkSWQ6IHN0cmluZywgZmllbGRMYWJlbDogc3RyaW5nLCBmaWVsZFZhbHVlOiBzdHJpbmcsIG9wdGlvbnM6IHsgYWxsb3dFZGl0PzogYm9vbGVhbiB9ID0ge30pID0+IHtcclxuICAgICAgbmF2aWdhdGVUb1RleHRFZGl0b3JGaWVsZCh7XHJcbiAgICAgICAgZmllbGRJZCxcclxuICAgICAgICBmaWVsZExhYmVsLFxyXG4gICAgICAgIGZpZWxkVmFsdWUsXHJcbiAgICAgICAgYWxsb3dFZGl0OiBvcHRpb25zPy5hbGxvd0VkaXQgIT09IGZhbHNlLFxyXG4gICAgICAgIGJlZm9yZU5hdmlnYXRlOiBwZXJzaXN0RHJhZnROb3csXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIFtwZXJzaXN0RHJhZnROb3ddXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQ29tZW50YXJpb3NUYXAgPSBSZWFjdC51c2VDYWxsYmFjaygoZXZlbnQpID0+IHtcclxuICAgIGlmIChidXN5KSByZXR1cm47XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgb3BlblRleHRFZGl0b3IoZmllbGRJZENvbWVudGFyaW9zLCBpbmRUKFwiVmlzaXRzX0ZpZWxkX0NvbW1lbnRzXCIsIFwiQ29tbWVudHNcIiksIGNvbWVudGFyaW9zKTtcclxuICB9LCBbYnVzeSwgY29tZW50YXJpb3MsIG9wZW5UZXh0RWRpdG9yXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUNvbWVudGFyaW9zSG9sZCA9IFJlYWN0LnVzZUNhbGxiYWNrKCh0YXJnZXQsIGNsaWVudFkpID0+IHtcclxuICAgIGlmICghdGFyZ2V0IHx8ICFpc092ZXJmbG93aW5nKHRhcmdldCkpIHJldHVybiBmYWxzZTtcclxuICAgIHNldFByZXZpZXdBbmNob3IodGFyZ2V0KTtcclxuICAgIHJldHVybiBzaG93UHJldmlld1Rvb2x0aXAoU3RyaW5nKGNvbWVudGFyaW9zIHx8IFwiXCIpLCBjbGllbnRZKTtcclxuICB9LCBbY29tZW50YXJpb3NdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQW50ZWNlZGVudGVzVGFwID0gUmVhY3QudXNlQ2FsbGJhY2soKGV2ZW50KSA9PiB7XHJcbiAgICBpZiAoYnVzeSkgcmV0dXJuO1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIG9wZW5UZXh0RWRpdG9yKGZpZWxkSWRBbnRlY2VkZW50ZXMsIGluZFQoXCJWaXNpdHNfRmllbGRfQmFja2dyb3VuZFwiLCBcIkJhY2tncm91bmRcIiksIGFudGVjZWRlbnRlcyk7XHJcbiAgfSwgW2J1c3ksIGFudGVjZWRlbnRlcywgb3BlblRleHRFZGl0b3JdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQW50ZWNlZGVudGVzSG9sZCA9IFJlYWN0LnVzZUNhbGxiYWNrKCh0YXJnZXQsIGNsaWVudFkpID0+IHtcclxuICAgIGlmICghdGFyZ2V0IHx8ICFpc092ZXJmbG93aW5nKHRhcmdldCkpIHJldHVybiBmYWxzZTtcclxuICAgIHNldFByZXZpZXdBbmNob3IodGFyZ2V0KTtcclxuICAgIHJldHVybiBzaG93UHJldmlld1Rvb2x0aXAoU3RyaW5nKGFudGVjZWRlbnRlcyB8fCBcIlwiKSwgY2xpZW50WSk7XHJcbiAgfSwgW2FudGVjZWRlbnRlc10pO1xyXG5cclxuICBjb25zdCBoYW5kbGVDb25jbHVzaW9uZXNUYXAgPSBSZWFjdC51c2VDYWxsYmFjaygoZXZlbnQpID0+IHtcclxuICAgIGlmIChidXN5KSByZXR1cm47XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgb3BlblRleHRFZGl0b3IoZmllbGRJZENvbmNsdXNpb25lcywgaW5kVChcIlZpc2l0c19GaWVsZF9Db25jbHVzaW9uc1wiLCBcIkNvbmNsdXNpb25zXCIpLCBjb25jbHVzaW9uZXMpO1xyXG4gIH0sIFtidXN5LCBjb25jbHVzaW9uZXMsIG9wZW5UZXh0RWRpdG9yXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUNvbmNsdXNpb25lc0hvbGQgPSBSZWFjdC51c2VDYWxsYmFjaygodGFyZ2V0LCBjbGllbnRZKSA9PiB7XHJcbiAgICBpZiAoIXRhcmdldCB8fCAhaXNPdmVyZmxvd2luZyh0YXJnZXQpKSByZXR1cm4gZmFsc2U7XHJcbiAgICBzZXRQcmV2aWV3QW5jaG9yKHRhcmdldCk7XHJcbiAgICByZXR1cm4gc2hvd1ByZXZpZXdUb29sdGlwKFN0cmluZyhjb25jbHVzaW9uZXMgfHwgXCJcIiksIGNsaWVudFkpO1xyXG4gIH0sIFtjb25jbHVzaW9uZXNdKTtcclxuXHJcbiAgY29uc3QgY29tZW50YXJpb3NUYXAgPSB1c2VUYXBHdWFyZChoYW5kbGVDb21lbnRhcmlvc1RhcCwgaGFuZGxlQ29tZW50YXJpb3NIb2xkKTtcclxuICBjb25zdCBhbnRlY2VkZW50ZXNUYXAgPSB1c2VUYXBHdWFyZChoYW5kbGVBbnRlY2VkZW50ZXNUYXAsIGhhbmRsZUFudGVjZWRlbnRlc0hvbGQpO1xyXG4gIGNvbnN0IGNvbmNsdXNpb25lc1RhcCA9IHVzZVRhcEd1YXJkKGhhbmRsZUNvbmNsdXNpb25lc1RhcCwgaGFuZGxlQ29uY2x1c2lvbmVzSG9sZCk7XHJcblxyXG4gIGNvbnN0IHRleHRFZGl0b3JCaW5kaW5ncyA9IHVzZU1lbW8oXHJcbiAgICAoKSA9PiBbXHJcbiAgICAgIHsgZmllbGRJZDogZmllbGRJZENvbWVudGFyaW9zLCBhcHBseVZhbHVlOiBzZXRDb21lbnRhcmlvcyB9LFxyXG4gICAgICB7IGZpZWxkSWQ6IGZpZWxkSWRBbnRlY2VkZW50ZXMsIGFwcGx5VmFsdWU6IHNldEFudGVjZWRlbnRlcyB9LFxyXG4gICAgICB7IGZpZWxkSWQ6IGZpZWxkSWRDb25jbHVzaW9uZXMsIGFwcGx5VmFsdWU6IHNldENvbmNsdXNpb25lcyB9LFxyXG4gICAgXSxcclxuICAgIFtmaWVsZElkQW50ZWNlZGVudGVzLCBmaWVsZElkQ29tZW50YXJpb3MsIGZpZWxkSWRDb25jbHVzaW9uZXNdXHJcbiAgKTtcclxuXHJcbiAgdXNlVGV4dEVkaXRvckZpZWxkcyh0ZXh0RWRpdG9yQmluZGluZ3MpO1xyXG5cclxuICAvLyBDbGVhciBjb250YWN0cyBvbmx5IHdoZW4gdGhlIGNsaWVudCBjaGFuZ2VzIChhdm9pZCBjbGVhcmluZyBvbiByZXN0b3JlL3N0ZXAgMiByZXR1cm4pLlxyXG4gIGNvbnN0IHByZXZDbGllbnRSZWYgPSB1c2VSZWYobnVsbCk7XHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IGN1cnJlbnQgPSBzZWxlY3RlZENsaWVudD8udmFsdWU7XHJcbiAgICBpZiAocHJldkNsaWVudFJlZi5jdXJyZW50ICYmIHByZXZDbGllbnRSZWYuY3VycmVudCAhPT0gY3VycmVudCkge1xyXG4gICAgICBzZXRTZWxlY3RlZENvbnRhY3RzKFtdKTtcclxuICAgIH1cclxuICAgIHByZXZDbGllbnRSZWYuY3VycmVudCA9IGN1cnJlbnQ7XHJcbiAgfSwgW3NlbGVjdGVkQ2xpZW50Py52YWx1ZV0pO1xyXG5cclxuICBjb25zdCBsYXN0Q2xpZW50UmVmID0gdXNlUmVmKG51bGwpO1xyXG5cclxuICAvLyBJZiB0aGUgY2xpZW50IGNoYW5nZXMgYWZ0ZXIgc2VsZWN0aW5nIGNvbnRhY3RzLCByZXNldCB0aGUgZW50aXJlIGZvcm0uXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IGN1cnJlbnQgPSBzZWxlY3RlZENsaWVudD8udmFsdWU7XHJcbiAgICBpZiAoIWN1cnJlbnQpIHJldHVybjtcclxuXHJcbiAgICBpZiAobGFzdENsaWVudFJlZi5jdXJyZW50ICYmIGxhc3RDbGllbnRSZWYuY3VycmVudCAhPT0gY3VycmVudCkge1xyXG4gICAgICBzZXRTdGVwKDEpO1xyXG4gICAgICBzZXRTZWxlY3RlZENvbnRhY3RzKFtdKTtcbiAgICAgIHNldFZpc2l0VHlwZShkZWZhdWx0VmlzaXRUeXBlKTtcbiAgICAgIHNldENvbnRhY3RNZXRob2QoZGVmYXVsdENvbnRhY3RNZXRob2QpO1xuICAgICAgc2V0VHJhbnNEYXRlKHRvZGF5U3RyaW5nKCkpO1xuICAgICAgc2V0RGVzY3JpcHRpb24oXCJcIik7XHJcbiAgICAgIHNldENvbWVudGFyaW9zKFwiXCIpO1xyXG4gICAgICBzZXRBbnRlY2VkZW50ZXMoXCJcIik7XHJcbiAgICAgIHNldENvbmNsdXNpb25lcyhcIlwiKTtcclxuICAgICAgc2V0U3RhdHVzKFwiXCIpO1xyXG4gICAgICBzZXRCdXN5KGZhbHNlKTtcclxuICAgIH1cclxuICAgIGxhc3RDbGllbnRSZWYuY3VycmVudCA9IGN1cnJlbnQ7XHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVhY3QtaG9va3MvZXhoYXVzdGl2ZS1kZXBzXHJcbiAgfSwgW3NlbGVjdGVkQ2xpZW50Py52YWx1ZV0pO1xyXG5cclxuICBjb25zdCBjYW5Hb05leHQgPSAhIXNlbGVjdGVkQ2xpZW50O1xyXG4gIGNvbnN0IGNhbkNyZWF0ZSA9XHJcbiAgICAhIXNlbGVjdGVkQ2xpZW50ICYmXHJcbiAgICBTdHJpbmcodmlzaXRUeXBlIHx8IFwiXCIpLnRyaW0oKSAhPT0gXCJcIiAmJlxyXG4gICAgU3RyaW5nKHZpc2l0VHlwZSkgIT09IFwiMFwiICYmXHJcbiAgICBkZXNjcmlwdGlvbi50cmltKCkubGVuZ3RoID4gMCAmJlxyXG4gICAgY29tZW50YXJpb3MudHJpbSgpLmxlbmd0aCA+IDA7XHJcblxyXG4gIGNvbnN0IGhhc0FjdGl2ZVByb2Nlc3MgPSB1c2VNZW1vKCgpID0+IHtcclxuICAgIGlmIChidXN5KSByZXR1cm4gdHJ1ZTtcclxuICAgIGlmIChzdGVwID4gMSkgcmV0dXJuIHRydWU7XHJcbiAgICBpZiAoc2VsZWN0ZWRDbGllbnQpIHJldHVybiB0cnVlO1xyXG4gICAgaWYgKHNlbGVjdGVkQ29udGFjdHMubGVuZ3RoID4gMCkgcmV0dXJuIHRydWU7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICBkZXNjcmlwdGlvbi50cmltKCkubGVuZ3RoID4gMCB8fFxuICAgICAgY29udGFjdE1ldGhvZCAhPT0gZGVmYXVsdENvbnRhY3RNZXRob2QgfHxcbiAgICAgIGNvbWVudGFyaW9zLnRyaW0oKS5sZW5ndGggPiAwIHx8XG4gICAgICBhbnRlY2VkZW50ZXMudHJpbSgpLmxlbmd0aCA+IDAgfHxcclxuICAgICAgY29uY2x1c2lvbmVzLnRyaW0oKS5sZW5ndGggPiAwXHJcbiAgICApO1xyXG4gIH0sIFthbnRlY2VkZW50ZXMsIGJ1c3ksIGNvbWVudGFyaW9zLCBjb25jbHVzaW9uZXMsIGNvbnRhY3RNZXRob2QsIGRlZmF1bHRDb250YWN0TWV0aG9kLCBkZXNjcmlwdGlvbiwgc2VsZWN0ZWRDbGllbnQsIHNlbGVjdGVkQ29udGFjdHMubGVuZ3RoLCBzdGVwXSk7XG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgd2luZG93Ll9faW5kU2V0TmF2aWdhdGlvbkd1YXJkPy4oaGFzQWN0aXZlUHJvY2Vzcyk7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICB3aW5kb3cuX19pbmRDbGVhck5hdmlnYXRpb25HdWFyZD8uKCk7XHJcbiAgICB9O1xyXG4gIH0sIFtoYXNBY3RpdmVQcm9jZXNzXSk7XHJcblxyXG4gIGNvbnN0IHsgaGFuZGxlU3VibWl0IH0gPSB1c2VDcmVhdGVTdWJtaXQoe1xyXG4gICAgYnVzeSxcclxuICAgIG1vZGFsT3BlbjogbW9kYWwub3BlbixcclxuICAgIGNhbkNyZWF0ZVZpc2l0LFxyXG4gICAgY2FuUm9sbGJhY2tEZWxldGUsXHJcbiAgICBzZWxlY3RlZENsaWVudCxcclxuICAgIHNlbGVjdGVkQ29udGFjdHMsXHJcbiAgICB2aXNpdFR5cGUsXG4gICAgY29udGFjdE1ldGhvZCxcbiAgICBkZWZhdWx0QXNpc3RlbnRlVGlwbyxcbiAgICBkZXNjcmlwdGlvbixcclxuICAgIHRyYW5zRGF0ZSxcclxuICAgIGNvbWVudGFyaW9zLFxyXG4gICAgYW50ZWNlZGVudGVzLFxyXG4gICAgY29uY2x1c2lvbmVzLFxyXG4gICAgc2V0QnVzeSxcclxuICAgIHNldFN0YXR1cyxcclxuICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICBzZXRTaG93UmVxdWlyZWQsXHJcbiAgICBvcGVuQ29uZmlybSxcclxuICAgIGNsb3NlQ29uZmlybSxcclxuICB9KTtcclxuXHJcbiAgY29uc3QgaGFuZGxlVG9wYmFyUHJpbWFyeSA9IFJlYWN0LnVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmICghY2FuQ3JlYXRlVmlzaXQpIHtcclxuICAgICAgc2hvd1Blcm1pc3Npb25Nb2RhbCgpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoc3RlcCA9PT0gMSAmJiBjYW5Hb05leHQpIHNldFN0ZXAoMik7XHJcbiAgICBpZiAoc3RlcCA9PT0gMikgaGFuZGxlU3VibWl0KCk7XHJcbiAgfSwgW2NhbkNyZWF0ZVZpc2l0LCBjYW5Hb05leHQsIGhhbmRsZVN1Ym1pdCwgc3RlcF0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVUb3BiYXJCYWNrID0gUmVhY3QudXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgc2V0U3RlcCgxKTtcclxuICB9LCBbXSk7XHJcblxyXG4gIHVzZVRvcGJhcihzdGVwLCBjYW5Hb05leHQsIGhhbmRsZVRvcGJhclByaW1hcnksIGhhbmRsZVRvcGJhckJhY2ssIGJ1c3ksIGNhbkNyZWF0ZSwgY2FuQ3JlYXRlVmlzaXQpO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKHN0ZXAgPT09IDEpIHtcclxuICAgICAgc2V0U2hvd1JlcXVpcmVkKGZhbHNlKTtcclxuICAgICAgY2xvc2VDb25maXJtKCk7XHJcbiAgICB9XHJcbiAgfSwgW3N0ZXAsIGNsb3NlQ29uZmlybV0pO1xyXG5cclxuICBjb25zdCB2aXNpdFR5cGVJbnZhbGlkID0gc2hvd1JlcXVpcmVkICYmIChTdHJpbmcodmlzaXRUeXBlIHx8IFwiXCIpID09PSBcIlwiIHx8IFN0cmluZyh2aXNpdFR5cGUpID09PSBcIjBcIik7XHJcbiAgY29uc3QgZGVzY3JpcHRpb25JbnZhbGlkID0gc2hvd1JlcXVpcmVkICYmIGRlc2NyaXB0aW9uLnRyaW0oKS5sZW5ndGggPT09IDA7XHJcbiAgY29uc3QgY29tZW50YXJpb3NJbnZhbGlkID0gc2hvd1JlcXVpcmVkICYmIGNvbWVudGFyaW9zLnRyaW0oKS5sZW5ndGggPT09IDA7XHJcbiAgY29uc3QgZGVzY3JpcHRpb25JbnB1dENsYXNzTmFtZSA9IGNsYXNzTmFtZXMoXHJcbiAgICBcImZvcm0tY29udHJvbFwiLFxyXG4gICAgZGVzY3JpcHRpb25JbnZhbGlkXHJcbiAgICAgID8gXCJib3JkZXItcm9zZS00MDAgYmctcm9zZS01MCBmb2N1czpyaW5nLXJvc2UtMjAwIGZvY3VzOmJvcmRlci1yb3NlLTQwMFwiXHJcbiAgICAgIDogXCJib3JkZXItc2xhdGUtMjAwIGZvY3VzOnJpbmctcHJpbWFyeSBmb2N1czpib3JkZXItcHJpbWFyeVwiXHJcbiAgKTtcclxuICBjb25zdCBjb21lbnRhcmlvc0NsYXNzTmFtZSA9IGNsYXNzTmFtZXMoXHJcbiAgICBcImZvcm0tY29udHJvbCBjdXJzb3ItcG9pbnRlclwiLFxyXG4gICAgY29tZW50YXJpb3NJbnZhbGlkXHJcbiAgICAgID8gXCJib3JkZXItcm9zZS00MDAgYmctcm9zZS01MCBmb2N1czpyaW5nLXJvc2UtMjAwIGZvY3VzOmJvcmRlci1yb3NlLTQwMFwiXHJcbiAgICAgIDogXCJib3JkZXItc2xhdGUtMjAwIGZvY3VzOnJpbmctcHJpbWFyeSBmb2N1czpib3JkZXItcHJpbWFyeVwiXHJcbiAgKTtcclxuICBjb25zdCBkZXNjcmlwdGlvbkxhYmVsID0gaW5kVChcIlZpc2l0c19GaWVsZF9EZXNjcmlwdGlvblwiLCBcIkRlc2NyaXB0aW9uXCIpO1xyXG4gIGNvbnN0IGNvbW1lbnRzTGFiZWwgPSBpbmRUKFwiVmlzaXRzX0ZpZWxkX0NvbW1lbnRzXCIsIFwiQ29tbWVudHNcIik7XHJcbiAgY29uc3QgYmFja2dyb3VuZExhYmVsID0gaW5kVChcIlZpc2l0c19GaWVsZF9CYWNrZ3JvdW5kXCIsIFwiQmFja2dyb3VuZFwiKTtcclxuICBjb25zdCBjb25jbHVzaW9uc0xhYmVsID0gaW5kVChcIlZpc2l0c19GaWVsZF9Db25jbHVzaW9uc1wiLCBcIkNvbmNsdXNpb25zXCIpO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTRcIj5cclxuICAgICAgPENvbmZpcm1Nb2RhbFxyXG4gICAgICAgIG9wZW49e21vZGFsLm9wZW59XHJcbiAgICAgICAgdGl0bGU9e21vZGFsLnRpdGxlfVxyXG4gICAgICAgIG1lc3NhZ2U9e21vZGFsLm1lc3NhZ2V9XHJcbiAgICAgICAgY29uZmlybVRleHQ9e21vZGFsQ29uZmlybVRleHR9XHJcbiAgICAgICAgY2FuY2VsVGV4dD17bW9kYWxDYW5jZWxUZXh0fVxyXG4gICAgICAgIGxvYWRpbmdUZXh0PXttb2RhbExvYWRpbmdUZXh0fVxyXG4gICAgICAgIHNob3dDYW5jZWw9e21vZGFsLnNob3dDYW5jZWx9XHJcbiAgICAgICAgc2hvd0NvbmZpcm09e21vZGFsLnNob3dDb25maXJtfVxyXG4gICAgICAgIGJ1c3k9e2J1c3l9XHJcbiAgICAgICAgZXJyb3I9e21vZGFsRXJyb3J9XHJcbiAgICAgICAgc3RhdHVzPXtzdGF0dXN9XHJcbiAgICAgICAgb25Db25maXJtPXtoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm19XHJcbiAgICAgICAgb25DYW5jZWw9e2Nsb3NlQ29uZmlybX1cclxuICAgICAgLz5cclxuICAgICAge3N0ZXAgPT09IDEgJiYgKFxyXG4gICAgICAgIDxDcmVhdGVTdGVwQ2xpZW50U2VsZWN0aW9uXHJcbiAgICAgICAgICBzZWxlY3RlZENsaWVudD17c2VsZWN0ZWRDbGllbnR9XHJcbiAgICAgICAgICBzZWxlY3RlZENvbnRhY3RzPXtzZWxlY3RlZENvbnRhY3RzfVxyXG4gICAgICAgICAgb25DbGllbnRTZWxlY3RlZD17c2V0U2VsZWN0ZWRDbGllbnR9XHJcbiAgICAgICAgICBvbkNvbnRhY3RzQ2hhbmdlPXtzZXRTZWxlY3RlZENvbnRhY3RzfVxyXG4gICAgICAgICAgY2xpZW50TGFiZWw9e2luZFQoXCJIaXN0b3J5X0ZpbHRlcl9DbGllbnRcIiwgXCJBY2NvdW50XCIpfVxyXG4gICAgICAgICAgY2xpZW50UGxhY2Vob2xkZXI9e2luZEZvcm1hdChcIlZpc2l0c19DcmVhdGVfQ2xpZW50UGxhY2Vob2xkZXJcIiwgXCJUeXBlIGF0IGxlYXN0IHswfSBjaGFyYWN0ZXJzLi4uXCIsIDQpfVxyXG4gICAgICAgICAgc2VsZWN0ZWRDb250YWN0c0NvdW50VGV4dD17aW5kRm9ybWF0KFxyXG4gICAgICAgICAgICBcIlZpc2l0c19DcmVhdGVfU2VsZWN0ZWRDb250YWN0c0NvdW50XCIsXHJcbiAgICAgICAgICAgIFwiezB9IHNlbGVjdGVkIGNvbnRhY3QocylcIixcclxuICAgICAgICAgICAgc2VsZWN0ZWRDb250YWN0cy5sZW5ndGhcclxuICAgICAgICAgICl9XHJcbiAgICAgICAgLz5cclxuICAgICAgKX1cclxuXHJcbiAgICAgIHtzdGVwID09PSAyICYmIChcclxuICAgICAgICA8Q3JlYXRlU3RlcFZpc2l0RGV0YWlsc1xyXG4gICAgICAgICAgdGl0bGU9e2luZFQoXCJWaXNpdHNfQ3JlYXRlX1Zpc2l0RGF0YV9UaXRsZVwiLCBcIlZpc2l0IGRldGFpbHNcIil9XG4gICAgICAgICAgZGF0ZUxhYmVsPXtpbmRUKFwiVmlzaXRzX0RldGFpbF9EYXRlX0xhYmVsXCIsIFwiRGF0ZVwiKX1cclxuICAgICAgICAgIHRyYW5zRGF0ZT17dHJhbnNEYXRlfVxyXG4gICAgICAgICAgb25UcmFuc0RhdGVDaGFuZ2U9e3NldFRyYW5zRGF0ZX1cclxuICAgICAgICAgIHZpc2l0VHlwZUxhYmVsPXtpbmRUKFwiVmlzaXRzX0RldGFpbF9WaXNpdFR5cGVfTGFiZWxcIiwgXCJWaXNpdCB0eXBlXCIpfVxuICAgICAgICAgIHZpc2l0VHlwZXM9e3Zpc2l0VHlwZXN9XHJcbiAgICAgICAgICB2aXNpdFR5cGU9e3Zpc2l0VHlwZX1cbiAgICAgICAgICBvblZpc2l0VHlwZUNoYW5nZT17c2V0VmlzaXRUeXBlfVxuICAgICAgICAgIHZpc2l0VHlwZVBsYWNlaG9sZGVyPXtpbmRUKFwiVmlzaXRzX0RldGFpbF9WaXNpdFR5cGVfUGxhY2Vob2xkZXJcIiwgXCJTZWxlY3QgdHlwZVwiKX1cbiAgICAgICAgICB2aXNpdFR5cGVJbnZhbGlkPXt2aXNpdFR5cGVJbnZhbGlkfVxuICAgICAgICAgIGNvbnRhY3RNZXRob2RMYWJlbD17aW5kVChcIlZpc2l0c19EZXRhaWxfQ29udGFjdE1ldGhvZF9MYWJlbFwiLCBcIkNvbnRhY3QgbWV0aG9kXCIpfVxuICAgICAgICAgIGNvbnRhY3RNZXRob2RzPXtjb250YWN0TWV0aG9kc31cbiAgICAgICAgICBjb250YWN0TWV0aG9kPXtjb250YWN0TWV0aG9kfVxuICAgICAgICAgIG9uQ29udGFjdE1ldGhvZENoYW5nZT17c2V0Q29udGFjdE1ldGhvZH1cbiAgICAgICAgICBjb250YWN0TWV0aG9kUGxhY2Vob2xkZXI9e2luZFQoXCJWaXNpdHNfRGV0YWlsX0NvbnRhY3RNZXRob2RfUGxhY2Vob2xkZXJcIiwgXCJTZWxlY3QgbWV0aG9kXCIpfVxuICAgICAgICAgIGRlc2NyaXB0aW9uTGFiZWw9e2Rlc2NyaXB0aW9uTGFiZWx9XG4gICAgICAgICAgZGVzY3JpcHRpb25WYWx1ZT17ZGVzY3JpcHRpb259XHJcbiAgICAgICAgICBkZXNjcmlwdGlvbkNsYXNzTmFtZT17ZGVzY3JpcHRpb25JbnB1dENsYXNzTmFtZX1cclxuICAgICAgICAgIG9uRGVzY3JpcHRpb25DaGFuZ2U9e3NldERlc2NyaXB0aW9ufVxyXG4gICAgICAgICAgdGFwRmllbGRzPXtbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBpZDogXCJjb21lbnRhcmlvc1wiLFxyXG4gICAgICAgICAgICAgIGxhYmVsOiBjb21tZW50c0xhYmVsLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiBjb21lbnRhcmlvcyxcclxuICAgICAgICAgICAgICBjbGFzc05hbWU6IGNvbWVudGFyaW9zQ2xhc3NOYW1lLFxyXG4gICAgICAgICAgICAgIHBvaW50ZXJCaW5kaW5nczogY29tZW50YXJpb3NUYXAsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBpZDogXCJhbnRlY2VkZW50ZXNcIixcclxuICAgICAgICAgICAgICBsYWJlbDogYmFja2dyb3VuZExhYmVsLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiBhbnRlY2VkZW50ZXMsXHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcImZvcm0tY29udHJvbCBjdXJzb3ItcG9pbnRlclwiLFxyXG4gICAgICAgICAgICAgIHBvaW50ZXJCaW5kaW5nczogYW50ZWNlZGVudGVzVGFwLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgaWQ6IFwiY29uY2x1c2lvbmVzXCIsXHJcbiAgICAgICAgICAgICAgbGFiZWw6IGNvbmNsdXNpb25zTGFiZWwsXHJcbiAgICAgICAgICAgICAgdmFsdWU6IGNvbmNsdXNpb25lcyxcclxuICAgICAgICAgICAgICBjbGFzc05hbWU6IFwiZm9ybS1jb250cm9sIGN1cnNvci1wb2ludGVyXCIsXHJcbiAgICAgICAgICAgICAgcG9pbnRlckJpbmRpbmdzOiBjb25jbHVzaW9uZXNUYXAsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICBdfVxyXG4gICAgICAgICAgc3RhdHVzPXtzdGF0dXN9XHJcbiAgICAgICAgLz5cclxuICAgICAgKX1cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn1cclxuXHJcbi8vIENyZWF0ZSBmbG93IFVJIHdyYXBwZWQgYnkgdGhlIGVycm9yIGJvdW5kYXJ5LlxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDcmVhdGVGb3JtKCkge1xyXG4gIHJldHVybiAoXHJcbiAgICA8QXBwRXJyb3JCb3VuZGFyeSBmYWxsYmFja01lc3NhZ2U9e2luZFQoXCJWaXNpdHNfQ3JlYXRlX0Vycm9yQm91bmRhcnlcIiwgXCJBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSByZW5kZXJpbmcgdGhlIHZpc2l0cyBwYWdlLiBSZWxvYWQgYW5kIHRyeSBhZ2Fpbi5cIil9PlxuICAgICAgPFZpc2l0YXNBcHAgLz5cclxuICAgIDwvQXBwRXJyb3JCb3VuZGFyeT5cclxuICApO1xyXG59XHJcbiIsICJpbXBvcnQgeyB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi91dGlscy9pbmRJMThuLnRzXCI7XHJcblxyXG5leHBvcnQgY29uc3QgdXNlVG9wYmFyID0gKFxyXG4gIHN0ZXA6IG51bWJlcixcclxuICBjYW5Hb05leHQ6IGJvb2xlYW4sXHJcbiAgb25OZXh0OiAoKSA9PiB2b2lkLFxyXG4gIG9uUHJldjogKCkgPT4gdm9pZCxcclxuICBidXN5ID0gZmFsc2UsXHJcbiAgY2FuU3VibWl0U3RlcDIgPSB0cnVlLFxyXG4gIGNhbkFjY2VzcyA9IHRydWVcclxuKSA9PiB7XHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IGZvcndhcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdsb2JhbEZvcndhcmRCdG5cIikgYXMgSFRNTEJ1dHRvbkVsZW1lbnQgfCBudWxsO1xyXG4gICAgY29uc3QgYmFjayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2xvYmFsQmFja0J0blwiKSBhcyBIVE1MQnV0dG9uRWxlbWVudCB8IG51bGw7XHJcbiAgICBjb25zdCBmb3J3YXJkSWNvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2xvYmFsRm9yd2FyZEljb25cIik7XHJcbiAgICBjb25zdCBjcmVhdGVJY29uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnbG9iYWxDcmVhdGVJY29uXCIpO1xyXG5cclxuICAgIGlmIChmb3J3YXJkKSB7XHJcbiAgICAgIGNvbnN0IGlzU3RlcDIgPSBzdGVwID09PSAyO1xyXG4gICAgICBjb25zdCBzaG93Rm9yd2FyZCA9IGNhbkFjY2VzcyAmJiAoaXNTdGVwMiB8fCAoc3RlcCA9PT0gMSAmJiBjYW5Hb05leHQpKTtcclxuICAgICAgZm9yd2FyZC5zdHlsZS52aXNpYmlsaXR5ID0gc2hvd0ZvcndhcmQgPyBcInZpc2libGVcIiA6IFwiaGlkZGVuXCI7XHJcbiAgICAgIGZvcndhcmQuZGlzYWJsZWQgPSAhc2hvd0ZvcndhcmQgfHwgYnVzeTtcclxuICAgICAgZm9yd2FyZC5vbmNsaWNrID0gc2hvd0ZvcndhcmQgPyAoKSA9PiBvbk5leHQoKSA6IG51bGw7XHJcbiAgICAgIGZvcndhcmQuc2V0QXR0cmlidXRlKFxyXG4gICAgICAgIFwiYXJpYS1sYWJlbFwiLFxyXG4gICAgICAgIGlzU3RlcDIgPyBpbmRUKFwiQ29tbW9uX0NyZWF0ZVwiLCBcIkNyZWF0ZVwiKSA6IGluZFQoXCJDb21tb25fTmV4dFwiLCBcIk5leHRcIilcclxuICAgICAgKTtcclxuICAgICAgZm9yd2FyZC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWRpc2FibGVkXCIsIGlzU3RlcDIgJiYgIWNhblN1Ym1pdFN0ZXAyID8gXCJ0cnVlXCIgOiBcImZhbHNlXCIpO1xyXG4gICAgICBmb3J3YXJkLmNsYXNzTGlzdC50b2dnbGUoXCJvcGFjaXR5LTUwXCIsIGlzU3RlcDIgJiYgIWNhblN1Ym1pdFN0ZXAyKTtcclxuICAgICAgZm9yd2FyZC5jbGFzc0xpc3QudG9nZ2xlKFwiY3Vyc29yLW5vdC1hbGxvd2VkXCIsIGlzU3RlcDIgJiYgIWNhblN1Ym1pdFN0ZXAyKTtcclxuXHJcbiAgICAgIGlmIChmb3J3YXJkSWNvbiAmJiBjcmVhdGVJY29uKSB7XHJcbiAgICAgICAgaWYgKGlzU3RlcDIpIHtcclxuICAgICAgICAgIGZvcndhcmRJY29uLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XHJcbiAgICAgICAgICBjcmVhdGVJY29uLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGZvcndhcmRJY29uLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XHJcbiAgICAgICAgICBjcmVhdGVJY29uLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoYmFjaykge1xyXG4gICAgICBjb25zdCBzaG93QmFjayA9IGNhbkFjY2VzcyAmJiBzdGVwID09PSAyO1xyXG4gICAgICBiYWNrLnN0eWxlLnZpc2liaWxpdHkgPSBzaG93QmFjayA/IFwidmlzaWJsZVwiIDogXCJoaWRkZW5cIjtcclxuICAgICAgYmFjay5kaXNhYmxlZCA9ICFzaG93QmFjayB8fCBidXN5O1xyXG4gICAgICBiYWNrLm9uY2xpY2sgPSBzaG93QmFjayA/ICgpID0+IG9uUHJldigpIDogbnVsbDtcclxuICAgIH1cclxuICB9LCBbc3RlcCwgY2FuR29OZXh0LCBvbk5leHQsIG9uUHJldiwgYnVzeSwgY2FuU3VibWl0U3RlcDIsIGNhbkFjY2Vzc10pO1xyXG59O1xyXG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlUmVmIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IHNob3dHbG9iYWxTcGlubmVyLCBoaWRlR2xvYmFsU3Bpbm5lciB9IGZyb20gXCIuLi91dGlscy9nbG9iYWxTcGlubmVyLnRzXCI7XHJcbmltcG9ydCB7XHJcbiAgQ1JFQVRFX0ZSRVNIX1BBUkFNLFxyXG4gIFZJU0lUX0RSQUZUX0tFWSxcclxuICBDT05UQUNUU19TVE9SQUdFX0tFWSxcclxuICBDT05UQUNUU19TRUxFQ1RJT05fS0VZLFxyXG4gIGNsZWFyQ3JlYXRlU2VsZWN0aW9uQ2FjaGUsXHJcbiAgc3RyaXBGcmVzaFBhcmFtLFxyXG59IGZyb20gXCIuLi91dGlscy92aXNpdGFzU3RvcmFnZS50c1wiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHsgZ2V0U2Vzc2lvbkpzb25XaXRoRXhwaXJ5LCBnZXRTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5LCBzZXRTZXNzaW9uSnNvbldpdGhFeHBpcnkgfSBmcm9tIFwiLi4vdXRpbHMvc2Vzc2lvbkV4cGlyeS50c1wiO1xyXG5cclxuY29uc3QgQ1JFQVRFX0RSQUZUX1RUTF9NUyA9IDI0ICogNjAgKiA2MCAqIDEwMDA7XHJcblxyXG50eXBlIERyYWZ0U25hcHNob3QgPSB7XHJcbiAgc2VsZWN0ZWRDbGllbnQ6IGFueTtcbiAgc2VsZWN0ZWRDb250YWN0czogYW55W107XG4gIHZpc2l0VHlwZTogc3RyaW5nO1xuICBjb250YWN0TWV0aG9kOiBzdHJpbmc7XG4gIHRyYW5zRGF0ZTogc3RyaW5nO1xuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xyXG4gIGNvbWVudGFyaW9zOiBzdHJpbmc7XHJcbiAgYW50ZWNlZGVudGVzOiBzdHJpbmc7XHJcbiAgY29uY2x1c2lvbmVzOiBzdHJpbmc7XHJcbiAgc3RlcDogbnVtYmVyO1xyXG59O1xyXG5cclxudHlwZSBVc2VDcmVhdGVEcmFmdEFyZ3MgPSB7XHJcbiAgZHJhZnRTbmFwc2hvdDogRHJhZnRTbmFwc2hvdDtcclxuICBzZXRTZWxlY3RlZENsaWVudDogKHZhbHVlOiBhbnkpID0+IHZvaWQ7XHJcbiAgc2V0U2VsZWN0ZWRDb250YWN0czogKHZhbHVlOiBhbnlbXSkgPT4gdm9pZDtcbiAgc2V0VmlzaXRUeXBlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgc2V0Q29udGFjdE1ldGhvZDogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHNldFRyYW5zRGF0ZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHNldERlc2NyaXB0aW9uOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBzZXRDb21lbnRhcmlvczogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgc2V0QW50ZWNlZGVudGVzOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBzZXRDb25jbHVzaW9uZXM6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIHNldFN0ZXA6ICh2YWx1ZTogbnVtYmVyKSA9PiB2b2lkO1xyXG59O1xyXG5cclxuLy8gSGFuZGxlcyB2aXNpdC1jcmVhdGUgZHJhZnQgc2F2ZS9yZXN0b3JlIGxpZmVjeWNsZS5cclxuZXhwb3J0IGNvbnN0IHVzZUNyZWF0ZURyYWZ0ID0gKHtcclxuICBkcmFmdFNuYXBzaG90LFxyXG4gIHNldFNlbGVjdGVkQ2xpZW50LFxyXG4gIHNldFNlbGVjdGVkQ29udGFjdHMsXG4gIHNldFZpc2l0VHlwZSxcbiAgc2V0Q29udGFjdE1ldGhvZCxcbiAgc2V0VHJhbnNEYXRlLFxuICBzZXREZXNjcmlwdGlvbixcclxuICBzZXRDb21lbnRhcmlvcyxcclxuICBzZXRBbnRlY2VkZW50ZXMsXHJcbiAgc2V0Q29uY2x1c2lvbmVzLFxyXG4gIHNldFN0ZXAsXHJcbn06IFVzZUNyZWF0ZURyYWZ0QXJncykgPT4ge1xyXG4gIGNvbnN0IGRyYWZ0UmVzdG9yZWRSZWYgPSB1c2VSZWYoZmFsc2UpO1xyXG4gIGNvbnN0IGRyYWZ0UGVyc2lzdFRpbWVyUmVmID0gdXNlUmVmPG51bWJlciB8IG51bGw+KG51bGwpO1xyXG5cclxuICBjb25zdCBwZXJzaXN0RHJhZnRTbmFwc2hvdCA9IHVzZUNhbGxiYWNrKChkcmFmdDogRHJhZnRTbmFwc2hvdCkgPT4ge1xyXG4gICAgc2V0U2Vzc2lvbkpzb25XaXRoRXhwaXJ5KFZJU0lUX0RSQUZUX0tFWSwgZHJhZnQsIENSRUFURV9EUkFGVF9UVExfTVMpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgcGVyc2lzdERyYWZ0Tm93ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgcGVyc2lzdERyYWZ0U25hcHNob3QoZHJhZnRTbmFwc2hvdCk7XHJcbiAgfSwgW2RyYWZ0U25hcHNob3QsIHBlcnNpc3REcmFmdFNuYXBzaG90XSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIWRyYWZ0UmVzdG9yZWRSZWYuY3VycmVudCkgcmV0dXJuO1xyXG5cclxuICAgIGlmIChkcmFmdFBlcnNpc3RUaW1lclJlZi5jdXJyZW50KSB7XHJcbiAgICAgIGNsZWFyVGltZW91dChkcmFmdFBlcnNpc3RUaW1lclJlZi5jdXJyZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBkcmFmdFBlcnNpc3RUaW1lclJlZi5jdXJyZW50ID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBkcmFmdFBlcnNpc3RUaW1lclJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgcGVyc2lzdERyYWZ0U25hcHNob3QoZHJhZnRTbmFwc2hvdCk7XHJcbiAgICB9LCAxODApO1xyXG5cclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIGlmIChkcmFmdFBlcnNpc3RUaW1lclJlZi5jdXJyZW50KSB7XHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KGRyYWZ0UGVyc2lzdFRpbWVyUmVmLmN1cnJlbnQpO1xyXG4gICAgICAgIGRyYWZ0UGVyc2lzdFRpbWVyUmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH0sIFtkcmFmdFNuYXBzaG90LCBwZXJzaXN0RHJhZnRTbmFwc2hvdF0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgbGV0IGZyZXNoTG9hZCA9IGZhbHNlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgdXJsID0gbmV3IFVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XHJcbiAgICAgIGZyZXNoTG9hZCA9IHVybC5zZWFyY2hQYXJhbXMuaGFzKENSRUFURV9GUkVTSF9QQVJBTSk7XHJcbiAgICB9IGNhdGNoIHtcclxuICAgICAgZnJlc2hMb2FkID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGZyZXNoTG9hZCkge1xyXG4gICAgICBjbGVhckNyZWF0ZVNlbGVjdGlvbkNhY2hlKCk7XHJcbiAgICAgIHN0cmlwRnJlc2hQYXJhbSgpO1xyXG4gICAgICBkcmFmdFJlc3RvcmVkUmVmLmN1cnJlbnQgPSB0cnVlO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHNob3VsZFNob3cgPSBmYWxzZTtcclxuICAgIHRyeSB7XHJcbiAgICAgIHNob3VsZFNob3cgPSAhIShcclxuICAgICAgICBnZXRTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KFZJU0lUX0RSQUZUX0tFWSkgfHxcclxuICAgICAgICBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKENPTlRBQ1RTX1NUT1JBR0VfS0VZKSB8fFxyXG4gICAgICAgIHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oQ09OVEFDVFNfU0VMRUNUSU9OX0tFWSlcclxuICAgICAgKTtcclxuICAgIH0gY2F0Y2gge1xyXG4gICAgICAvLyBJZ25vcmUgc3RvcmFnZSBhY2Nlc3MgZXJyb3JzLlxyXG4gICAgfVxyXG4gICAgaWYgKHNob3VsZFNob3cpIHtcclxuICAgICAgc2hvd0dsb2JhbFNwaW5uZXIoaW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKSk7XHJcbiAgICB9XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBkcmFmdCA9IGdldFNlc3Npb25Kc29uV2l0aEV4cGlyeTxEcmFmdFNuYXBzaG90PihWSVNJVF9EUkFGVF9LRVkpO1xyXG4gICAgICBpZiAoZHJhZnQ/LnNlbGVjdGVkQ2xpZW50Py52YWx1ZSkgc2V0U2VsZWN0ZWRDbGllbnQoZHJhZnQuc2VsZWN0ZWRDbGllbnQpO1xyXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShkcmFmdD8uc2VsZWN0ZWRDb250YWN0cykpIHNldFNlbGVjdGVkQ29udGFjdHMoZHJhZnQuc2VsZWN0ZWRDb250YWN0cyk7XG4gICAgICBpZiAoZHJhZnQ/LnZpc2l0VHlwZSAhPT0gdW5kZWZpbmVkKSBzZXRWaXNpdFR5cGUoZHJhZnQudmlzaXRUeXBlKTtcbiAgICAgIGlmIChkcmFmdD8uY29udGFjdE1ldGhvZCAhPT0gdW5kZWZpbmVkKSBzZXRDb250YWN0TWV0aG9kKGRyYWZ0LmNvbnRhY3RNZXRob2QpO1xuICAgICAgaWYgKGRyYWZ0Py50cmFuc0RhdGUpIHNldFRyYW5zRGF0ZShkcmFmdC50cmFuc0RhdGUpO1xuICAgICAgaWYgKGRyYWZ0Py5kZXNjcmlwdGlvbiAhPT0gdW5kZWZpbmVkKSBzZXREZXNjcmlwdGlvbihkcmFmdC5kZXNjcmlwdGlvbik7XHJcbiAgICAgIGlmIChkcmFmdD8uY29tZW50YXJpb3MgIT09IHVuZGVmaW5lZCkgc2V0Q29tZW50YXJpb3MoZHJhZnQuY29tZW50YXJpb3MpO1xyXG4gICAgICBpZiAoZHJhZnQ/LmFudGVjZWRlbnRlcyAhPT0gdW5kZWZpbmVkKSBzZXRBbnRlY2VkZW50ZXMoZHJhZnQuYW50ZWNlZGVudGVzKTtcclxuICAgICAgaWYgKGRyYWZ0Py5jb25jbHVzaW9uZXMgIT09IHVuZGVmaW5lZCkgc2V0Q29uY2x1c2lvbmVzKGRyYWZ0LmNvbmNsdXNpb25lcyk7XHJcbiAgICAgIGlmIChkcmFmdD8uc3RlcCA9PT0gMikgc2V0U3RlcCgyKTtcclxuICAgIH0gY2F0Y2gge1xyXG4gICAgICAvLyBJZ25vcmUgbWFsZm9ybWVkIGRyYWZ0IHBheWxvYWRzLlxyXG4gICAgfSBmaW5hbGx5IHtcclxuICAgICAgaWYgKHNob3VsZFNob3cpIHtcclxuICAgICAgICBoaWRlR2xvYmFsU3Bpbm5lcigpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBkcmFmdFJlc3RvcmVkUmVmLmN1cnJlbnQgPSB0cnVlO1xyXG4gIH0sIFtcclxuICAgIHNldEFudGVjZWRlbnRlcyxcclxuICAgIHNldENvbWVudGFyaW9zLFxyXG4gICAgc2V0Q29uY2x1c2lvbmVzLFxyXG4gICAgc2V0RGVzY3JpcHRpb24sXHJcbiAgICBzZXRTZWxlY3RlZENsaWVudCxcclxuICAgIHNldFNlbGVjdGVkQ29udGFjdHMsXG4gICAgc2V0U3RlcCxcbiAgICBzZXRDb250YWN0TWV0aG9kLFxuICAgIHNldFRyYW5zRGF0ZSxcbiAgICBzZXRWaXNpdFR5cGUsXHJcbiAgXSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBwZXJzaXN0RHJhZnROb3csXHJcbiAgfTtcclxufTtcclxuIiwgImV4cG9ydCBjb25zdCBzaG93R2xvYmFsU3Bpbm5lciA9IChtZXNzYWdlPzogc3RyaW5nKSA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiB3aW5kb3cuX19pbmRTaG93R2xvYmFsU3Bpbm5lciA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgIHdpbmRvdy5fX2luZFNob3dHbG9iYWxTcGlubmVyKG1lc3NhZ2UpO1xyXG4gICAgfVxyXG4gIH0gY2F0Y2gge1xyXG4gICAgLy8gaWdub3JlXHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGhpZGVHbG9iYWxTcGlubmVyID0gKCkgPT4ge1xyXG4gIHRyeSB7XHJcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2Ygd2luZG93Ll9faW5kSGlkZUdsb2JhbFNwaW5uZXIgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICB3aW5kb3cuX19pbmRIaWRlR2xvYmFsU3Bpbm5lcigpO1xyXG4gICAgfVxyXG4gIH0gY2F0Y2gge1xyXG4gICAgLy8gaWdub3JlXHJcbiAgfVxyXG59O1xyXG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2sgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgZmV0Y2hKc29uIH0gZnJvbSBcIi4uL3NlcnZpY2VzL2FwaVNlcnZpY2UudHNcIjtcclxuaW1wb3J0IHsgaW5kRXh0cmFjdElkLCBpbmRFeHRyYWN0U2lnbmVkSWQgfSBmcm9tIFwiLi4vdXRpbHMvaW5kSWRzLnRzXCI7XHJcbmltcG9ydCB7IGluZEZvcm1hdCwgaW5kVCB9IGZyb20gXCIuLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB7IHNob3dQZXJtaXNzaW9uTW9kYWwgfSBmcm9tIFwiLi4vdXRpbHMvcGVybWlzc2lvbnMudHNcIjtcclxuaW1wb3J0IHsgZmxhc2hBY3Rpb25NYXJrLCBzZXRIaXN0b3J5RmlsdGVyRm9yRGF0ZSB9IGZyb20gXCIuLi91dGlscy92aXNpdGFzSGlzdG9yeS50c1wiO1xyXG5pbXBvcnQgeyBWSVNJVF9EUkFGVF9LRVkgfSBmcm9tIFwiLi4vdXRpbHMvdmlzaXRhc1N0b3JhZ2UudHNcIjtcclxuaW1wb3J0IHsgd2FpdCB9IGZyb20gXCIuLi91dGlscy93YWl0LnRzXCI7XHJcblxyXG50eXBlIENvbnRhY3RPcHRpb24gPSB7XHJcbiAgdmFsdWU6IHN0cmluZztcclxuICB0ZXh0OiBzdHJpbmc7XHJcbn07XHJcblxyXG50eXBlIExlZ2FjeUNvbW1hbmRSZXNwb25zZSA9IHtcclxuICBzdWNjZXNzPzogYm9vbGVhbjtcclxuICBtZXNzYWdlPzogc3RyaW5nO1xyXG4gIGRhdGE/OiB1bmtub3duO1xyXG4gIFN1Y2Nlc3M/OiBib29sZWFuO1xyXG4gIE1lc3NhZ2U/OiBzdHJpbmc7XHJcbiAgRGF0YT86IHVua25vd247XHJcbn07XHJcblxyXG5jb25zdCBnZXRMZWdhY3lSZXNwb25zZVN1Y2Nlc3MgPSAocmVzcG9uc2U6IExlZ2FjeUNvbW1hbmRSZXNwb25zZSk6IGJvb2xlYW4gPT4ge1xyXG4gIHJldHVybiByZXNwb25zZS5zdWNjZXNzID09PSB0cnVlIHx8IHJlc3BvbnNlLlN1Y2Nlc3MgPT09IHRydWU7XHJcbn07XHJcblxyXG5jb25zdCBnZXRMZWdhY3lSZXNwb25zZU1lc3NhZ2UgPSAocmVzcG9uc2U6IExlZ2FjeUNvbW1hbmRSZXNwb25zZSk6IHN0cmluZyA9PiB7XHJcbiAgY29uc3QgcmF3TWVzc2FnZSA9IHJlc3BvbnNlLm1lc3NhZ2UgPz8gcmVzcG9uc2UuTWVzc2FnZTtcclxuICByZXR1cm4gdHlwZW9mIHJhd01lc3NhZ2UgPT09IFwic3RyaW5nXCIgPyByYXdNZXNzYWdlLnRyaW0oKSA6IFwiXCI7XHJcbn07XHJcblxyXG5jb25zdCBnZXRMZWdhY3lSZXNwb25zZURhdGEgPSAocmVzcG9uc2U6IExlZ2FjeUNvbW1hbmRSZXNwb25zZSk6IHVua25vd24gPT4ge1xyXG4gIHJldHVybiByZXNwb25zZS5kYXRhID8/IHJlc3BvbnNlLkRhdGE7XHJcbn07XHJcblxyXG50eXBlIFVzZUNyZWF0ZVN1Ym1pdEFyZ3MgPSB7XHJcbiAgYnVzeTogYm9vbGVhbjtcclxuICBtb2RhbE9wZW46IGJvb2xlYW47XHJcbiAgY2FuQ3JlYXRlVmlzaXQ6IGJvb2xlYW47XHJcbiAgY2FuUm9sbGJhY2tEZWxldGU6IGJvb2xlYW47XHJcbiAgc2VsZWN0ZWRDbGllbnQ6IHsgdmFsdWU6IHN0cmluZyB9IHwgbnVsbDtcbiAgc2VsZWN0ZWRDb250YWN0czogQ29udGFjdE9wdGlvbltdO1xuICB2aXNpdFR5cGU6IHN0cmluZztcbiAgY29udGFjdE1ldGhvZDogc3RyaW5nO1xuICBkZWZhdWx0QXNpc3RlbnRlVGlwbzogc3RyaW5nO1xuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xyXG4gIHRyYW5zRGF0ZTogc3RyaW5nO1xyXG4gIGNvbWVudGFyaW9zOiBzdHJpbmc7XHJcbiAgYW50ZWNlZGVudGVzOiBzdHJpbmc7XHJcbiAgY29uY2x1c2lvbmVzOiBzdHJpbmc7XHJcbiAgc2V0QnVzeTogKHZhbHVlOiBib29sZWFuKSA9PiB2b2lkO1xyXG4gIHNldFN0YXR1czogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgc2V0TW9kYWxFcnJvcjogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgc2V0U2hvd1JlcXVpcmVkOiAodmFsdWU6IGJvb2xlYW4pID0+IHZvaWQ7XHJcbiAgb3BlbkNvbmZpcm06IChvcHRzOiB7XHJcbiAgICB0aXRsZTogc3RyaW5nO1xyXG4gICAgbWVzc2FnZTogc3RyaW5nO1xyXG4gICAgY29uZmlybVRleHQ/OiBzdHJpbmc7XHJcbiAgICBvbkNvbmZpcm0/OiAoKSA9PiBQcm9taXNlPGJvb2xlYW4gfCB2b2lkPiB8IGJvb2xlYW4gfCB2b2lkO1xyXG4gIH0pID0+IHZvaWQ7XHJcbiAgY2xvc2VDb25maXJtOiAoKSA9PiB2b2lkO1xyXG59O1xyXG5cclxuLy8gT3ducyBjcmVhdGUvY29uZmlybSBmbG93IHNvIGZvcm0gY29tcG9uZW50IHN0YXlzIGZvY3VzZWQgb24gVUkgZmllbGRzLlxyXG5leHBvcnQgY29uc3QgdXNlQ3JlYXRlU3VibWl0ID0gKHtcclxuICBidXN5LFxyXG4gIG1vZGFsT3BlbixcclxuICBjYW5DcmVhdGVWaXNpdCxcclxuICBjYW5Sb2xsYmFja0RlbGV0ZSxcclxuICBzZWxlY3RlZENsaWVudCxcclxuICBzZWxlY3RlZENvbnRhY3RzLFxuICB2aXNpdFR5cGUsXG4gIGNvbnRhY3RNZXRob2QsXG4gIGRlZmF1bHRBc2lzdGVudGVUaXBvLFxuICBkZXNjcmlwdGlvbixcclxuICB0cmFuc0RhdGUsXHJcbiAgY29tZW50YXJpb3MsXHJcbiAgYW50ZWNlZGVudGVzLFxyXG4gIGNvbmNsdXNpb25lcyxcclxuICBzZXRCdXN5LFxyXG4gIHNldFN0YXR1cyxcclxuICBzZXRNb2RhbEVycm9yLFxyXG4gIHNldFNob3dSZXF1aXJlZCxcclxuICBvcGVuQ29uZmlybSxcclxuICBjbG9zZUNvbmZpcm0sXHJcbn06IFVzZUNyZWF0ZVN1Ym1pdEFyZ3MpID0+IHtcclxuICBjb25zdCBkb0NyZWF0ZSA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcclxuICAgIGlmIChidXN5KSByZXR1cm4gZmFsc2U7XHJcbiAgICBpZiAoIWNhbkNyZWF0ZVZpc2l0KSB7XHJcbiAgICAgIHNob3dQZXJtaXNzaW9uTW9kYWwoKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgc2V0TW9kYWxFcnJvcihcIlwiKTtcclxuICAgIGlmICghc2VsZWN0ZWRDbGllbnQpIHtcclxuICAgICAgc2V0U3RhdHVzKGluZFQoXCJWaXNpdHNfQ3JlYXRlX1NlbGVjdENsaWVudFJlcXVpcmVkXCIsIFwiU2VsZWN0IGEgY2xpZW50LlwiKSk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGlmIChTdHJpbmcodmlzaXRUeXBlIHx8IFwiXCIpID09PSBcIlwiIHx8IFN0cmluZyh2aXNpdFR5cGUpID09PSBcIjBcIiB8fCAhZGVzY3JpcHRpb24udHJpbSgpIHx8ICFjb21lbnRhcmlvcy50cmltKCkpIHtcclxuICAgICAgc2V0U2hvd1JlcXVpcmVkKHRydWUpO1xyXG4gICAgICBzZXRTdGF0dXMoaW5kVChcIlZpc2l0c19DcmVhdGVfQ29tcGxldGVSZXF1aXJlZFwiLCBcIkNvbXBsZXRlIHJlcXVpcmVkIGZpZWxkcy5cIikpO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBzZXRCdXN5KHRydWUpO1xyXG4gICAgc2V0U3RhdHVzKGluZFQoXCJWaXNpdHNfQ3JlYXRlX0NyZWF0aW5nQWN0aXZpdHlcIiwgXCJDcmVhdGluZyBhY3Rpdml0eS4uLlwiKSk7XHJcblxyXG4gICAgbGV0IGNyZWF0ZWRSZWNJZCA9IFwiXCI7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBwYXlsb2FkQWN0aXZpdHkgPSB7XHJcbiAgICAgICAgYWNjb3VudE51bTogc2VsZWN0ZWRDbGllbnQudmFsdWUsXG4gICAgICAgIHZpc2l0VHlwZSxcbiAgICAgICAgY29udGFjdE1ldGhvZDogTnVtYmVyKGNvbnRhY3RNZXRob2QgfHwgMCksXG4gICAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgICB0cmFuc0RhdGUsXHJcbiAgICAgICAgY29tZW50YXJpb3MsXHJcbiAgICAgICAgYW50ZWNlZGVudGVzLFxyXG4gICAgICAgIGNvbmNsdXNpb25lcyxcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGNvbnN0IHJlc0FjdCA9IGF3YWl0IGZldGNoSnNvbjxMZWdhY3lDb21tYW5kUmVzcG9uc2U+KFwiL1Zpc2l0YXMvQ3JlYXRlQWN0aXZpdHlcIiwge1xyXG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxyXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHBheWxvYWRBY3Rpdml0eSksXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgaWYgKCFnZXRMZWdhY3lSZXNwb25zZVN1Y2Nlc3MocmVzQWN0KSkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihnZXRMZWdhY3lSZXNwb25zZU1lc3NhZ2UocmVzQWN0KSB8fCBpbmRUKFwiVmlzaXRzX0NyZWF0ZV9DcmVhdGVBY3Rpdml0eUZhaWxlZFwiLCBcIkZhaWxlZCB0byBjcmVhdGUgYWN0aXZpdHkuXCIpKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgcmVjSWRBY3RpdmlkYWQgPVxyXG4gICAgICAgIGluZEV4dHJhY3RTaWduZWRJZChnZXRMZWdhY3lSZXNwb25zZURhdGEocmVzQWN0KSkgfHxcclxuICAgICAgICBpbmRFeHRyYWN0U2lnbmVkSWQoZ2V0TGVnYWN5UmVzcG9uc2VNZXNzYWdlKHJlc0FjdCkpIHx8XHJcbiAgICAgICAgaW5kRXh0cmFjdFNpZ25lZElkKGluZEV4dHJhY3RJZChnZXRMZWdhY3lSZXNwb25zZURhdGEocmVzQWN0KSkgfHwgaW5kRXh0cmFjdElkKGdldExlZ2FjeVJlc3BvbnNlTWVzc2FnZShyZXNBY3QpKSk7XHJcbiAgICAgIGlmICghcmVjSWRBY3RpdmlkYWQpIHRocm93IG5ldyBFcnJvcihpbmRUKFwiVmlzaXRzX0NyZWF0ZV9DcmVhdGVBY3Rpdml0eUZhaWxlZFwiLCBcIkZhaWxlZCB0byBjcmVhdGUgYWN0aXZpdHkuXCIpKTtcclxuICAgICAgY3JlYXRlZFJlY0lkID0gU3RyaW5nKHJlY0lkQWN0aXZpZGFkKTtcclxuXHJcbiAgICAgIGlmIChzZWxlY3RlZENvbnRhY3RzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICBjb25zdCBhc3Npc3RhbnRCYXRjaFNpemUgPSA0O1xyXG4gICAgICAgIGNvbnN0IGNyZWF0ZUFzc2lzdGFudCA9IGFzeW5jIChjb250YWN0OiBDb250YWN0T3B0aW9uKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBwYXlsb2FkVmlzaXRhID0ge1xyXG4gICAgICAgICAgICByZWZSZWNJZEFjdGl2aWRhZDogcmVjSWRBY3RpdmlkYWQsXHJcbiAgICAgICAgICAgIGFzaXN0ZW50ZVRpcG86IGRlZmF1bHRBc2lzdGVudGVUaXBvLFxyXG4gICAgICAgICAgICBhc2lzdGVudGVJZDogY29udGFjdC50ZXh0LFxyXG4gICAgICAgICAgICBjb250YWN0b1JlY0lkOiBjb250YWN0LnZhbHVlLFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICAgIGNvbnN0IHJlc1ZpcyA9IGF3YWl0IGZldGNoSnNvbjxMZWdhY3lDb21tYW5kUmVzcG9uc2U+KFwiL1Zpc2l0YXMvQ3JlYXRlVmlzaXRhQXNpc3RlbnRlXCIsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXlsb2FkVmlzaXRhKSxcclxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGlmICghZ2V0TGVnYWN5UmVzcG9uc2VTdWNjZXNzKHJlc1ZpcykpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihnZXRMZWdhY3lSZXNwb25zZU1lc3NhZ2UocmVzVmlzKSB8fCBpbmRUKFwiVmlzaXRzX0NyZWF0ZV9DcmVhdGVWaXNpdEZhaWxlZFwiLCBcIkZhaWxlZCB0byBjcmVhdGUgdmlzaXQuXCIpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cclxuICAgICAgICBmb3IgKGxldCBpZHggPSAwOyBpZHggPCBzZWxlY3RlZENvbnRhY3RzLmxlbmd0aDsgaWR4ICs9IGFzc2lzdGFudEJhdGNoU2l6ZSkge1xyXG4gICAgICAgICAgY29uc3QgYmF0Y2ggPSBzZWxlY3RlZENvbnRhY3RzLnNsaWNlKGlkeCwgaWR4ICsgYXNzaXN0YW50QmF0Y2hTaXplKTtcclxuICAgICAgICAgIGNvbnN0IGZpcnN0ID0gYmF0Y2hbMF07XHJcbiAgICAgICAgICBpZiAoZmlyc3QpIHtcclxuICAgICAgICAgICAgc2V0U3RhdHVzKGluZEZvcm1hdChcIlZpc2l0c19DcmVhdGVfQ3JlYXRpbmdWaXNpdEZvclwiLCBcIkNyZWF0aW5nIHZpc2l0IGZvciB7MH0uLi5cIiwgZmlyc3QudGV4dCkpO1xuICAgICAgICAgIH1cclxuICAgICAgICAgIGF3YWl0IFByb21pc2UuYWxsKGJhdGNoLm1hcCgoY29udGFjdCkgPT4gY3JlYXRlQXNzaXN0YW50KGNvbnRhY3QpKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICB0cnkge1xyXG4gICAgICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oVklTSVRfRFJBRlRfS0VZKTtcclxuICAgICAgfSBjYXRjaCB7XHJcbiAgICAgICAgLy8gSWdub3JlIHN0b3JhZ2UgZXJyb3JzLlxyXG4gICAgICB9XHJcblxyXG4gICAgICBzZXRIaXN0b3J5RmlsdGVyRm9yRGF0ZSh0cmFuc0RhdGUsIHRydWUpO1xyXG4gICAgICBjbG9zZUNvbmZpcm0oKTtcclxuICAgICAgYXdhaXQgd2FpdCgyMDApO1xyXG4gICAgICBmbGFzaEFjdGlvbk1hcmsoXCJva1Byb2Nlc3NcIiwgMTIwMCk7XHJcbiAgICAgIGF3YWl0IHdhaXQoMTIwMCk7XHJcbiAgICAgIHdpbmRvdy5fX2luZEJ5cGFzc05hdmlnYXRpb25HdWFyZE9uY2U/LigpO1xyXG4gICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL0hpc3RvcmlhbC9IaXN0b3J5XCI7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSBjYXRjaCAoZTogdW5rbm93bikge1xyXG4gICAgICBpZiAoY3JlYXRlZFJlY0lkICYmIGNhblJvbGxiYWNrRGVsZXRlKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIHNldFN0YXR1cyhpbmRUKFwiVmlzaXRzX0NyZWF0ZV9Sb2xsYmFja1wiLCBcIlJvbGxpbmcgYmFjayBhY3Rpdml0eS4uLlwiKSk7XHJcbiAgICAgICAgICBhd2FpdCBmZXRjaEpzb24oYC9WaXNpdGFzL0RlbGV0ZUFjdGl2aXR5LyR7ZW5jb2RlVVJJQ29tcG9uZW50KGNyZWF0ZWRSZWNJZCl9YCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXHJcbiAgICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBjYXRjaCB7XHJcbiAgICAgICAgICAvLyBLZWVwIG9yaWdpbmFsIGVycm9yIGZsb3cuXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IG1zZyA9IGUgaW5zdGFuY2VvZiBFcnJvciA/IGUubWVzc2FnZSA6IGluZFQoXCJWaXNpdHNfQ3JlYXRlX0NyZWF0ZVZpc2l0RXJyb3JcIiwgXCJGYWlsZWQgdG8gY3JlYXRlIHRoZSB2aXNpdC5cIik7XG4gICAgICBzZXRNb2RhbEVycm9yKG1zZyk7XHJcbiAgICAgIHNldFN0YXR1cyhtc2cpO1xyXG4gICAgICBmbGFzaEFjdGlvbk1hcmsoXCJlcnJvclByb2Nlc3NcIiwgMTUwMCk7XHJcbiAgICAgIHNldEJ1c3koZmFsc2UpO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgfSwgW1xyXG4gICAgYW50ZWNlZGVudGVzLFxyXG4gICAgYnVzeSxcclxuICAgIGNhbkNyZWF0ZVZpc2l0LFxyXG4gICAgY2FuUm9sbGJhY2tEZWxldGUsXHJcbiAgICBjbG9zZUNvbmZpcm0sXHJcbiAgICBjb21lbnRhcmlvcyxcclxuICAgIGNvbmNsdXNpb25lcyxcbiAgICBjb250YWN0TWV0aG9kLFxuICAgIGRlZmF1bHRBc2lzdGVudGVUaXBvLFxuICAgIGRlc2NyaXB0aW9uLFxyXG4gICAgc2VsZWN0ZWRDbGllbnQsXHJcbiAgICBzZWxlY3RlZENvbnRhY3RzLFxyXG4gICAgc2V0QnVzeSxcclxuICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICBzZXRTaG93UmVxdWlyZWQsXHJcbiAgICBzZXRTdGF0dXMsXHJcbiAgICB0cmFuc0RhdGUsXHJcbiAgICB2aXNpdFR5cGUsXHJcbiAgXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZVN1Ym1pdCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmIChidXN5KSByZXR1cm47XHJcbiAgICBpZiAoIWNhbkNyZWF0ZVZpc2l0KSB7XHJcbiAgICAgIHNob3dQZXJtaXNzaW9uTW9kYWwoKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKG1vZGFsT3BlbikgcmV0dXJuO1xyXG4gICAgaWYgKCFzZWxlY3RlZENsaWVudCkge1xyXG4gICAgICBzZXRTdGF0dXMoaW5kVChcIlZpc2l0c19DcmVhdGVfU2VsZWN0Q2xpZW50UmVxdWlyZWRcIiwgXCJTZWxlY3QgYSBjbGllbnQuXCIpKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKFN0cmluZyh2aXNpdFR5cGUgfHwgXCJcIikgPT09IFwiXCIgfHwgU3RyaW5nKHZpc2l0VHlwZSkgPT09IFwiMFwiIHx8ICFkZXNjcmlwdGlvbi50cmltKCkgfHwgIWNvbWVudGFyaW9zLnRyaW0oKSkge1xyXG4gICAgICBzZXRTaG93UmVxdWlyZWQodHJ1ZSk7XHJcbiAgICAgIHNldFN0YXR1cyhpbmRUKFwiVmlzaXRzX0NyZWF0ZV9Db21wbGV0ZVJlcXVpcmVkXCIsIFwiQ29tcGxldGUgcmVxdWlyZWQgZmllbGRzLlwiKSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHNldE1vZGFsRXJyb3IoXCJcIik7XHJcbiAgICBvcGVuQ29uZmlybSh7XHJcbiAgICAgIHRpdGxlOiBpbmRUKFwiVmlzaXRzX0NyZWF0ZV9Db25maXJtQ3JlYXRlX1RpdGxlXCIsIFwiQ29uZmlybSBjcmVhdGVcIiksXG4gICAgICBtZXNzYWdlOiBpbmRUKFwiVmlzaXRzX0NyZWF0ZV9Db25maXJtQ3JlYXRlX0JvZHlcIiwgXCJEbyB5b3Ugd2FudCB0byBjcmVhdGUgdGhpcyB2aXNpdD9cIiksXG4gICAgICBjb25maXJtVGV4dDogaW5kVChcIkNvbmZpcm1fWWVzXCIsIFwiQ29uZmlybV9ZZXNcIiksXHJcbiAgICAgIG9uQ29uZmlybTogZG9DcmVhdGUsXHJcbiAgICB9KTtcclxuICB9LCBbXHJcbiAgICBidXN5LFxyXG4gICAgY2FuQ3JlYXRlVmlzaXQsXHJcbiAgICBjb21lbnRhcmlvcyxcclxuICAgIGRlc2NyaXB0aW9uLFxyXG4gICAgZG9DcmVhdGUsXHJcbiAgICBtb2RhbE9wZW4sXHJcbiAgICBvcGVuQ29uZmlybSxcclxuICAgIHNlbGVjdGVkQ2xpZW50LFxyXG4gICAgc2V0TW9kYWxFcnJvcixcclxuICAgIHNldFNob3dSZXF1aXJlZCxcclxuICAgIHNldFN0YXR1cyxcclxuICAgIHZpc2l0VHlwZSxcclxuICBdKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGRvQ3JlYXRlLFxyXG4gICAgaGFuZGxlU3VibWl0LFxyXG4gIH07XHJcbn07XHJcbiIsICJleHBvcnQgY29uc3QgaW5kRXh0cmFjdElkID0gKHZhbHVlOiB1bmtub3duKTogc3RyaW5nID0+IHtcclxuICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkgcmV0dXJuIFwiXCI7XHJcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiB8fCB0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCIpIHJldHVybiBTdHJpbmcodmFsdWUpLnRyaW0oKTtcclxuICBpZiAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICBjb25zdCBjYW5kaWRhdGUgPVxyXG4gICAgICAodmFsdWUgYXMgYW55KS5yZWNJZCA/P1xyXG4gICAgICAodmFsdWUgYXMgYW55KS5SZWNJZCA/P1xyXG4gICAgICAodmFsdWUgYXMgYW55KS5pZCA/P1xyXG4gICAgICAodmFsdWUgYXMgYW55KS5JZCA/P1xyXG4gICAgICAodmFsdWUgYXMgYW55KS52YWx1ZSA/P1xyXG4gICAgICAodmFsdWUgYXMgYW55KS5WYWx1ZTtcclxuICAgIGlmICh0eXBlb2YgY2FuZGlkYXRlID09PSBcInN0cmluZ1wiIHx8IHR5cGVvZiBjYW5kaWRhdGUgPT09IFwibnVtYmVyXCIpIHJldHVybiBTdHJpbmcoY2FuZGlkYXRlKS50cmltKCk7XHJcbiAgfVxyXG4gIHJldHVybiBcIlwiO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGluZEV4dHJhY3ROdW1lcmljSWQgPSAodmFsdWU6IHVua25vd24sIGRlcHRoID0gMCk6IHN0cmluZyA9PiB7XHJcbiAgaWYgKGRlcHRoID4gMykgcmV0dXJuIFwiXCI7XHJcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHJldHVybiBcIlwiO1xyXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCIgJiYgTnVtYmVyLmlzRmluaXRlKHZhbHVlKSkgcmV0dXJuIFN0cmluZyhNYXRoLnRydW5jKHZhbHVlKSk7XHJcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgY29uc3QgcmF3ID0gdmFsdWUudHJpbSgpO1xyXG4gICAgaWYgKCFyYXcpIHJldHVybiBcIlwiO1xyXG4gICAgaWYgKC9eXFxkKyQvLnRlc3QocmF3KSkgcmV0dXJuIHJhdztcclxuICAgIGNvbnN0IG0gPSByYXcubWF0Y2goLyhcXGR7Myx9KS8pO1xyXG4gICAgcmV0dXJuIG0gPyBtWzFdIDogXCJcIjtcclxuICB9XHJcbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJvYmplY3RcIikgcmV0dXJuIFwiXCI7XHJcbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XHJcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgdmFsdWUpIHtcclxuICAgICAgY29uc3QgZm91bmQgPSBpbmRFeHRyYWN0TnVtZXJpY0lkKGl0ZW0sIGRlcHRoICsgMSk7XHJcbiAgICAgIGlmIChmb3VuZCkgcmV0dXJuIGZvdW5kO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFwiXCI7XHJcbiAgfVxyXG5cclxuICBjb25zdCBrZXlzID0gW1xyXG4gICAgXCJyZWNJZFwiLFxyXG4gICAgXCJSZWNJZFwiLFxyXG4gICAgXCJyZWZSZWNJZEFjdGl2aWRhZFwiLFxyXG4gICAgXCJSZWZSZWNJZEFjdGl2aWRhZFwiLFxyXG4gICAgXCJhY3RpdmlkYWRSZWNJZFwiLFxyXG4gICAgXCJBY3RpdmlkYWRSZWNJZFwiLFxyXG4gICAgXCJpZFwiLFxyXG4gICAgXCJJZFwiLFxyXG4gICAgXCJ2YWx1ZVwiLFxyXG4gICAgXCJWYWx1ZVwiLFxyXG4gICAgXCJyZXN1bHRcIixcclxuICAgIFwiUmVzdWx0XCIsXHJcbiAgICBcImRhdGFcIixcclxuICAgIFwiRGF0YVwiLFxyXG4gICAgXCJtZXNzYWdlXCIsXHJcbiAgICBcIk1lc3NhZ2VcIixcclxuICBdO1xyXG5cclxuICBmb3IgKGNvbnN0IGsgb2Yga2V5cykge1xyXG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgaykpIHtcclxuICAgICAgY29uc3QgZm91bmQgPSBpbmRFeHRyYWN0TnVtZXJpY0lkKCh2YWx1ZSBhcyBhbnkpW2tdLCBkZXB0aCArIDEpO1xyXG4gICAgICBpZiAoZm91bmQpIHJldHVybiBmb3VuZDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZvciAoY29uc3QgdiBvZiBPYmplY3QudmFsdWVzKHZhbHVlIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+KSkge1xyXG4gICAgY29uc3QgZm91bmQgPSBpbmRFeHRyYWN0TnVtZXJpY0lkKHYsIGRlcHRoICsgMSk7XHJcbiAgICBpZiAoZm91bmQpIHJldHVybiBmb3VuZDtcclxuICB9XHJcblxyXG4gIHJldHVybiBcIlwiO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGluZEV4dHJhY3RTaWduZWRJZCA9ICh2YWx1ZTogdW5rbm93biwgZGVwdGggPSAwKTogc3RyaW5nID0+IHtcclxuICBpZiAoZGVwdGggPiAzKSByZXR1cm4gXCJcIjtcclxuICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkgcmV0dXJuIFwiXCI7XHJcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIiAmJiBOdW1iZXIuaXNGaW5pdGUodmFsdWUpKSByZXR1cm4gU3RyaW5nKE1hdGgudHJ1bmModmFsdWUpKTtcclxuICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICBjb25zdCByYXcgPSB2YWx1ZS50cmltKCk7XHJcbiAgICBpZiAoIXJhdykgcmV0dXJuIFwiXCI7XHJcbiAgICBjb25zdCBtYXRjaCA9IHJhdy5tYXRjaCgvLT9cXGR7Myx9Lyk7XHJcbiAgICByZXR1cm4gbWF0Y2ggPyBtYXRjaFswXSA6IFwiXCI7XHJcbiAgfVxyXG4gIGlmICh0eXBlb2YgdmFsdWUgIT09IFwib2JqZWN0XCIpIHJldHVybiBcIlwiO1xyXG4gIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xyXG4gICAgZm9yIChjb25zdCBpdGVtIG9mIHZhbHVlKSB7XHJcbiAgICAgIGNvbnN0IGZvdW5kID0gaW5kRXh0cmFjdFNpZ25lZElkKGl0ZW0sIGRlcHRoICsgMSk7XHJcbiAgICAgIGlmIChmb3VuZCkgcmV0dXJuIGZvdW5kO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFwiXCI7XHJcbiAgfVxyXG5cclxuICBjb25zdCBrZXlzID0gW1xyXG4gICAgXCJyZWNJZFwiLFxyXG4gICAgXCJSZWNJZFwiLFxyXG4gICAgXCJyZWZSZWNJZEFjdGl2aWRhZFwiLFxyXG4gICAgXCJSZWZSZWNJZEFjdGl2aWRhZFwiLFxyXG4gICAgXCJhY3RpdmlkYWRSZWNJZFwiLFxyXG4gICAgXCJBY3RpdmlkYWRSZWNJZFwiLFxyXG4gICAgXCJtZXNzYWdlXCIsXHJcbiAgICBcIk1lc3NhZ2VcIixcclxuICAgIFwicmVzdWx0XCIsXHJcbiAgICBcIlJlc3VsdFwiLFxyXG4gICAgXCJkYXRhXCIsXHJcbiAgICBcIkRhdGFcIixcclxuICBdO1xyXG5cclxuICBmb3IgKGNvbnN0IGsgb2Yga2V5cykge1xyXG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgaykpIHtcclxuICAgICAgY29uc3QgZm91bmQgPSBpbmRFeHRyYWN0U2lnbmVkSWQoKHZhbHVlIGFzIGFueSlba10sIGRlcHRoICsgMSk7XHJcbiAgICAgIGlmIChmb3VuZCkgcmV0dXJuIGZvdW5kO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZm9yIChjb25zdCB2IG9mIE9iamVjdC52YWx1ZXModmFsdWUgYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj4pKSB7XHJcbiAgICBjb25zdCBmb3VuZCA9IGluZEV4dHJhY3RTaWduZWRJZCh2LCBkZXB0aCArIDEpO1xyXG4gICAgaWYgKGZvdW5kKSByZXR1cm4gZm91bmQ7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gXCJcIjtcclxufTtcclxuIiwgImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZUlkLCB1c2VNZW1vLCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IFhNYXJrSWNvbiB9IGZyb20gXCJAaGVyb2ljb25zL3JlYWN0LzIwL3NvbGlkXCI7XHJcbmltcG9ydCBGbG9hdGluZ0xpc3QgZnJvbSBcIi4uL2NvbW1vbnMvRmxvYXRpbmdMaXN0LnRzeFwiO1xyXG5pbXBvcnQgU3Bpbm5lciBmcm9tIFwiLi4vY29tbW9ucy9TcGlubmVyLnRzeFwiO1xyXG5pbXBvcnQgeyBDaGV2cm9uRG93blN2ZywgQ2hldnJvblVwU3ZnIH0gZnJvbSBcIi4uL2NvbW1vbnMvY2hldnJvbnMudHN4XCI7XHJcbmltcG9ydCB7IGZldGNoSnNvbiB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XHJcbmltcG9ydCB7IGhhbmRsZUNvbWJvYm94S2V5RG93biB9IGZyb20gXCIuLi8uLi9ob29rcy91c2VDb21ib2JveEtleWJvYXJkLnRzXCI7XHJcbmltcG9ydCB7IHVzZU91dHNpZGVDbGljayB9IGZyb20gXCIuLi8uLi9ob29rcy91c2VPdXRzaWRlQ2xpY2sudHNcIjtcclxuaW1wb3J0IHsgY2xhc3NOYW1lcyB9IGZyb20gXCIuLi8uLi91dGlscy9jbGFzc05hbWVzLnRzXCI7XHJcbmltcG9ydCB7IGluZEZvcm1hdCwgaW5kVCB9IGZyb20gXCIuLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB7IGlzTm9EYXRhUm93LCBpc05vRGF0YVRleHQgfSBmcm9tIFwiLi4vLi4vdXRpbHMvbm9EYXRhLnRzXCI7XHJcbmltcG9ydCB7IGdldENhY2hlZENvbnRhY3RzLCBzZXRDYWNoZWRDb250YWN0cywgZ2V0U3RvcmVkU2VsZWN0aW9uLCBzZXRTdG9yZWRTZWxlY3Rpb24sIGNsZWFyU3RvcmVkU2VsZWN0aW9uIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Zpc2l0YXNTdG9yYWdlLnRzXCI7XHJcblxyXG50eXBlIENvbnRhY3RPcHRpb24gPSB7XHJcbiAgdmFsdWU6IHN0cmluZztcclxuICB0ZXh0OiBzdHJpbmc7XHJcbiAgY2FyZ286IHN0cmluZztcclxuICBlbXByZXNhOiBzdHJpbmc7XHJcbn07XHJcblxyXG50eXBlIENvbnRhY3RzRHJvcGRvd25SZXNwb25zZSA9IHtcclxuICBpdGVtcz86IHVua25vd25bXTtcclxuICBJdGVtcz86IHVua25vd25bXTtcclxufTtcclxuXHJcbnR5cGUgQ29udGFjdHNDb21ib2JveFByb3BzID0ge1xyXG4gIGFjY291bnROdW0/OiBzdHJpbmc7XHJcbiAgdmFsdWU/OiBDb250YWN0T3B0aW9uW107XHJcbiAgb25DaGFuZ2U6ICh2YWx1ZTogQ29udGFjdE9wdGlvbltdKSA9PiB2b2lkO1xyXG4gIHBvcnRhbENsYXNzTmFtZT86IHN0cmluZztcclxuICBwYW5lbENsYXNzTmFtZT86IHN0cmluZztcclxufTtcclxuXHJcbi8vIE11bHRpLXNlbGVjdCBjb250YWN0cyBjb21ib2JveCB0aWVkIHRvIHRoZSBzZWxlY3RlZCBjbGllbnQuXHJcbmNvbnN0IENvbnRhY3RzQ29tYm9ib3ggPSAoeyBhY2NvdW50TnVtLCB2YWx1ZSA9IFtdLCBvbkNoYW5nZSwgcG9ydGFsQ2xhc3NOYW1lLCBwYW5lbENsYXNzTmFtZSB9OiBDb250YWN0c0NvbWJvYm94UHJvcHMpID0+IHtcclxuICBjb25zdCBbcXVlcnksIHNldFF1ZXJ5XSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtvcHRpb25zLCBzZXRPcHRpb25zXSA9IHVzZVN0YXRlPENvbnRhY3RPcHRpb25bXT4oW10pO1xyXG4gIGNvbnN0IFtzZWxlY3RlZCwgc2V0U2VsZWN0ZWRdID0gdXNlU3RhdGU8Q29udGFjdE9wdGlvbltdPih2YWx1ZSk7XHJcbiAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtsb2FkaW5nTW9yZSwgc2V0TG9hZGluZ01vcmVdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtzdGF0dXMsIHNldFN0YXR1c10gPSB1c2VTdGF0ZShpbmRUKFwiVmlzaXRzX0NyZWF0ZV9TZWxlY3RDbGllbnRGaXJzdFwiLCBcIlNlbGVjdCBhIGNsaWVudCBmaXJzdC5cIikpO1xyXG4gIGNvbnN0IFtoYXNMb2FkZWQsIHNldEhhc0xvYWRlZF0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW29wZW4sIHNldE9wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtwYWdlLCBzZXRQYWdlXSA9IHVzZVN0YXRlKDEpO1xyXG4gIGNvbnN0IFtoYXNNb3JlLCBzZXRIYXNNb3JlXSA9IHVzZVN0YXRlKHRydWUpO1xyXG4gIGNvbnN0IFtibG9ja2luZywgc2V0QmxvY2tpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFthY3RpdmVJbmRleCwgc2V0QWN0aXZlSW5kZXhdID0gdXNlU3RhdGUoMCk7XHJcbiAgY29uc3QgW3Nob3dOb3RGb3VuZFN0YXRlLCBzZXRTaG93Tm90Rm91bmRTdGF0ZV0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgbGlzdFJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IGJveFJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IGFib3J0UmVmID0gdXNlUmVmPEFib3J0Q29udHJvbGxlciB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IGNvbnRhaW5lclJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IGlucHV0UmVmID0gdXNlUmVmPEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBsYXN0QWNjb3VudFJlZiA9IHVzZVJlZihhY2NvdW50TnVtIHx8IFwiXCIpO1xyXG4gIGNvbnN0IG9uQ2hhbmdlUmVmID0gdXNlUmVmKG9uQ2hhbmdlKTtcclxuICBjb25zdCBpZEJhc2UgPSB1c2VJZCgpO1xyXG4gIGNvbnN0IGlucHV0SWQgPSBgJHtpZEJhc2V9LWNvbnRhY3RzLWlucHV0YDtcclxuICBjb25zdCBsaXN0SWQgPSBgJHtpZEJhc2V9LWNvbnRhY3RzLW9wdGlvbnNgO1xyXG5cclxuICB1c2VPdXRzaWRlQ2xpY2soW2NvbnRhaW5lclJlZiwgbGlzdFJlZl0sICgpID0+IHtcclxuICAgIHNldE9wZW4oZmFsc2UpO1xyXG4gICAgc2V0U2hvd05vdEZvdW5kU3RhdGUoZmFsc2UpO1xyXG4gICAgaWYgKHF1ZXJ5LnRyaW0oKSkge1xyXG4gICAgICBzZXRRdWVyeShcIlwiKTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIG9uQ2hhbmdlUmVmLmN1cnJlbnQgPSBvbkNoYW5nZTtcclxuICB9LCBbb25DaGFuZ2VdKTtcclxuXHJcbiAgY29uc3QgaXNTYW1lU2VsZWN0aW9uID0gKGE6IENvbnRhY3RPcHRpb25bXSA9IFtdLCBiOiBDb250YWN0T3B0aW9uW10gPSBbXSkgPT4ge1xyXG4gICAgaWYgKGEubGVuZ3RoICE9PSBiLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgY29uc3QgYXMgPSBhLm1hcCgoeCkgPT4gU3RyaW5nKHgudmFsdWUpKS5zb3J0KCk7XHJcbiAgICBjb25zdCBicyA9IGIubWFwKCh4KSA9PiBTdHJpbmcoeC52YWx1ZSkpLnNvcnQoKTtcclxuICAgIHJldHVybiBhcy5ldmVyeSgodiwgaSkgPT4gdiA9PT0gYnNbaV0pO1xyXG4gIH07XHJcblxyXG4gIC8vIFN5bmMgaW50ZXJuYWwgc2VsZWN0aW9uIHdpdGggdGhlIHByb3AgKGRyYWZ0L2NhY2hlIHJlc3RvcmUpLlxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIWlzU2FtZVNlbGVjdGlvbih2YWx1ZSB8fCBbXSwgc2VsZWN0ZWQpKSB7XHJcbiAgICAgIHNldFNlbGVjdGVkKHZhbHVlIHx8IFtdKTtcclxuICAgIH1cclxuICB9LCBbdmFsdWVdKTtcclxuXHJcbiAgY29uc3QgY2FuY2VsUGVuZGluZyA9ICgpID0+IHtcclxuICAgIGlmIChhYm9ydFJlZi5jdXJyZW50KSB7XHJcbiAgICAgIGFib3J0UmVmLmN1cnJlbnQuYWJvcnQoKTtcclxuICAgICAgYWJvcnRSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIGlmIChhYm9ydFJlZi5jdXJyZW50KSB7XHJcbiAgICAgICAgYWJvcnRSZWYuY3VycmVudC5hYm9ydCgpO1xyXG4gICAgICAgIGFib3J0UmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgcHJpbWVGcm9tQ2FjaGUgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBjYWNoZWQgPSBnZXRDYWNoZWRDb250YWN0cyhhY2NvdW50TnVtKSBhcyBDb250YWN0T3B0aW9uW10gfCBudWxsO1xyXG4gICAgaWYgKGNhY2hlZCkge1xyXG4gICAgICBzZXRPcHRpb25zKGNhY2hlZCk7XHJcbiAgICAgIHNldFNob3dOb3RGb3VuZFN0YXRlKGZhbHNlKTtcclxuICAgICAgc2V0SGFzTG9hZGVkKHRydWUpO1xyXG4gICAgICBzZXRIYXNNb3JlKGNhY2hlZC5sZW5ndGggPT09IDEwKTtcclxuICAgICAgc2V0U3RhdHVzKFxyXG4gICAgICAgIGNhY2hlZC5sZW5ndGhcclxuICAgICAgICAgID8gaW5kRm9ybWF0KFwiVmlzaXRzX0NyZWF0ZV9Db250YWN0Q291bnRDYWNoZVwiLCBcInswfSBjb250YWN0cyAoY2FjaGUpXCIsIGNhY2hlZC5sZW5ndGgpXHJcbiAgICAgICAgICA6IGluZFQoXCJWaXNpdHNfQ3JlYXRlX05vQ29udGFjdHNcIiwgXCJObyBjb250YWN0c1wiKVxyXG4gICAgICApO1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9O1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY2FuY2VsUGVuZGluZygpO1xyXG4gICAgc2V0UXVlcnkoXCJcIik7XHJcbiAgICBzZXRPcGVuKGZhbHNlKTtcclxuICAgIHNldExvYWRpbmcoZmFsc2UpO1xyXG4gICAgc2V0QmxvY2tpbmcoZmFsc2UpO1xyXG4gICAgc2V0TG9hZGluZ01vcmUoZmFsc2UpO1xyXG4gICAgc2V0QWN0aXZlSW5kZXgoMCk7XHJcbiAgICBzZXRTaG93Tm90Rm91bmRTdGF0ZShmYWxzZSk7XHJcbiAgICBzZXRQYWdlKDEpO1xyXG4gICAgc2V0SGFzTW9yZSh0cnVlKTtcclxuXHJcbiAgICBpZiAoIWFjY291bnROdW0pIHtcclxuICAgICAgc2V0T3B0aW9ucyhbXSk7XHJcbiAgICAgIHNldFNlbGVjdGVkKFtdKTtcclxuICAgICAgb25DaGFuZ2VSZWYuY3VycmVudChbXSk7XHJcbiAgICAgIHNldFN0YXR1cyhpbmRUKFwiVmlzaXRzX0NyZWF0ZV9TZWxlY3RDbGllbnRGaXJzdFwiLCBcIlNlbGVjdCBhIGNsaWVudCBmaXJzdC5cIikpO1xyXG4gICAgICBzZXRIYXNMb2FkZWQoZmFsc2UpO1xyXG4gICAgICBjbGVhclN0b3JlZFNlbGVjdGlvbihsYXN0QWNjb3VudFJlZi5jdXJyZW50KTtcclxuICAgICAgbGFzdEFjY291bnRSZWYuY3VycmVudCA9IFwiXCI7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjaGFuZ2VkID0gbGFzdEFjY291bnRSZWYuY3VycmVudCAmJiBsYXN0QWNjb3VudFJlZi5jdXJyZW50ICE9PSBhY2NvdW50TnVtO1xyXG4gICAgaWYgKGNoYW5nZWQpIHtcclxuICAgICAgc2V0U2VsZWN0ZWQoW10pO1xyXG4gICAgICBvbkNoYW5nZVJlZi5jdXJyZW50KFtdKTtcclxuICAgICAgY2xlYXJTdG9yZWRTZWxlY3Rpb24obGFzdEFjY291bnRSZWYuY3VycmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdXNlZENhY2hlID0gcHJpbWVGcm9tQ2FjaGUoKTtcclxuICAgIGlmICghdXNlZENhY2hlKSB7XHJcbiAgICAgIHNldE9wdGlvbnMoW10pO1xyXG4gICAgICBzZXRIYXNMb2FkZWQoZmFsc2UpO1xyXG4gICAgICBzZXRTdGF0dXMoaW5kVChcIlZpc2l0c19DcmVhdGVfUHJlc3NBcnJvd1RvTG9hZENvbnRhY3RzXCIsIFwiUHJlc3MgQXJyb3dEb3duIHRvIGxvYWQgY29udGFjdHMuXCIpKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzdG9yZWRTZWxlY3Rpb24gPSBnZXRTdG9yZWRTZWxlY3Rpb24oYWNjb3VudE51bSkgYXMgQ29udGFjdE9wdGlvbltdO1xyXG4gICAgaWYgKHN0b3JlZFNlbGVjdGlvbi5sZW5ndGggJiYgIXZhbHVlPy5sZW5ndGgpIHtcclxuICAgICAgc2V0U2VsZWN0ZWQoc3RvcmVkU2VsZWN0aW9uKTtcclxuICAgICAgb25DaGFuZ2VSZWYuY3VycmVudChzdG9yZWRTZWxlY3Rpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIGxhc3RBY2NvdW50UmVmLmN1cnJlbnQgPSBhY2NvdW50TnVtO1xyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlYWN0LWhvb2tzL2V4aGF1c3RpdmUtZGVwc1xyXG4gIH0sIFthY2NvdW50TnVtXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBvbkNoYW5nZVJlZi5jdXJyZW50KHNlbGVjdGVkKTtcclxuICAgIGlmIChhY2NvdW50TnVtKSBzZXRTdG9yZWRTZWxlY3Rpb24oYWNjb3VudE51bSwgc2VsZWN0ZWQpO1xyXG4gIH0sIFtzZWxlY3RlZCwgYWNjb3VudE51bV0pO1xyXG5cclxuICBjb25zdCB0b1RleHQgPSAodmFsdWU6IHVua25vd24pOiBzdHJpbmcgPT4ge1xyXG4gICAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHJldHVybiBcIlwiO1xyXG4gICAgcmV0dXJuIFN0cmluZyh2YWx1ZSkudHJpbSgpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGFzT2JqZWN0UmVjb3JkID0gKHZhbHVlOiB1bmtub3duKTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4gfCBudWxsID0+IHtcclxuICAgIGlmICghdmFsdWUgfHwgdHlwZW9mIHZhbHVlICE9PSBcIm9iamVjdFwiIHx8IEFycmF5LmlzQXJyYXkodmFsdWUpKSByZXR1cm4gbnVsbDtcclxuICAgIHJldHVybiB2YWx1ZSBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPjtcclxuICB9O1xyXG5cclxuICBjb25zdCBtYXBDb250YWN0cyA9IChpdGVtczogdW5rbm93bltdID0gW10pID0+XHJcbiAgICBpdGVtc1xyXG4gICAgICAubWFwKChlbnRyeSkgPT4ge1xyXG4gICAgICAgIGlmIChpc05vRGF0YVJvdyhlbnRyeSkpIHJldHVybiBudWxsO1xyXG4gICAgICAgIGNvbnN0IHJlY29yZCA9IGFzT2JqZWN0UmVjb3JkKGVudHJ5KTtcclxuICAgICAgICBpZiAoIXJlY29yZCkgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgICAgIGNvbnN0IHJlY0lkID0gdG9UZXh0KHJlY29yZC5yZWNJZCA/PyByZWNvcmQuUmVjSWQpO1xyXG4gICAgICAgIGNvbnN0IG5hbWUgPSB0b1RleHQocmVjb3JkLm5hbWUgPz8gcmVjb3JkLk5hbWUpO1xyXG4gICAgICAgIGNvbnN0IGNhcmdvID0gdG9UZXh0KHJlY29yZC5jYXJnbyA/PyByZWNvcmQuQ2FyZ28pO1xyXG4gICAgICAgIGNvbnN0IGVtcHJlc2EgPSB0b1RleHQocmVjb3JkLmVtcHJlc2EgPz8gcmVjb3JkLkVtcHJlc2EpO1xyXG5cclxuICAgICAgICBpZiAoIXJlY0lkIHx8IGlzTm9EYXRhVGV4dChuYW1lKSkgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICB2YWx1ZTogcmVjSWQsXHJcbiAgICAgICAgICB0ZXh0OiBuYW1lLnRvVXBwZXJDYXNlKCksXHJcbiAgICAgICAgICBjYXJnbzogY2FyZ28udG9VcHBlckNhc2UoKSxcclxuICAgICAgICAgIGVtcHJlc2E6IGVtcHJlc2EudG9VcHBlckNhc2UoKSxcclxuICAgICAgICB9IGFzIENvbnRhY3RPcHRpb247XHJcbiAgICAgIH0pXHJcbiAgICAgIC5maWx0ZXIoQm9vbGVhbikgYXMgQ29udGFjdE9wdGlvbltdO1xyXG5cclxuICBjb25zdCBsb2FkID0gYXN5bmMgKHBhZ2VUb0xvYWQgPSAxLCBhcHBlbmQgPSBmYWxzZSkgPT4ge1xyXG4gICAgaWYgKCFhY2NvdW50TnVtKSByZXR1cm47XHJcbiAgICBpZiAobG9hZGluZyB8fCBsb2FkaW5nTW9yZSkgcmV0dXJuO1xyXG4gICAgY2FuY2VsUGVuZGluZygpO1xyXG5cclxuICAgIGlmICghYXBwZW5kKSB7XHJcbiAgICAgIHNldExvYWRpbmcodHJ1ZSk7XHJcbiAgICAgIHNldEJsb2NraW5nKHRydWUpO1xyXG4gICAgICBpZiAocGFnZVRvTG9hZCA9PT0gMSkgc2V0U3RhdHVzKGluZFQoXCJWaXNpdHNfQ3JlYXRlX0xvYWRpbmdDb250YWN0c1wiLCBcIkxvYWRpbmcgY29udGFjdHMuLi5cIikpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc2V0TG9hZGluZ01vcmUodHJ1ZSk7XHJcbiAgICAgIHNldEJsb2NraW5nKHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XHJcbiAgICBhYm9ydFJlZi5jdXJyZW50ID0gY29udHJvbGxlcjtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoSnNvbjxDb250YWN0c0Ryb3Bkb3duUmVzcG9uc2U+KFxyXG4gICAgICAgIGAvVmlzaXRhcy9HZXRDb250YWN0c0ZvckRyb3Bkb3duP2FjY291bnROdW09JHtlbmNvZGVVUklDb21wb25lbnQoYWNjb3VudE51bSl9JnBhZ2U9JHtwYWdlVG9Mb2FkfSZwYWdlU2l6ZT0xMGAsXHJcbiAgICAgICAgeyBzaWduYWw6IGNvbnRyb2xsZXIuc2lnbmFsIH1cclxuICAgICAgKTtcclxuICAgICAgY29uc3QgcmF3SXRlbXMgPSBBcnJheS5pc0FycmF5KHJlcy5pdGVtcykgPyByZXMuaXRlbXMgOiBBcnJheS5pc0FycmF5KHJlcy5JdGVtcykgPyByZXMuSXRlbXMgOiBbXTtcclxuICAgICAgY29uc3QgbWFwcGVkID0gbWFwQ29udGFjdHMocmF3SXRlbXMpO1xyXG4gICAgICBzZXRPcHRpb25zKChwcmV2KSA9PiB7XHJcbiAgICAgICAgY29uc3QgbmV4dCA9IGFwcGVuZCA/IFsuLi5wcmV2LCAuLi5tYXBwZWRdIDogbWFwcGVkO1xyXG4gICAgICAgIHNldENhY2hlZENvbnRhY3RzKGFjY291bnROdW0sIG5leHQpO1xyXG4gICAgICAgIHJldHVybiBuZXh0O1xyXG4gICAgICB9KTtcclxuICAgICAgc2V0U2hvd05vdEZvdW5kU3RhdGUoZmFsc2UpO1xyXG4gICAgICBzZXRIYXNMb2FkZWQodHJ1ZSk7XHJcbiAgICAgIHNldEhhc01vcmUobWFwcGVkLmxlbmd0aCA9PT0gMTApO1xyXG4gICAgICBzZXRQYWdlKHBhZ2VUb0xvYWQpO1xyXG4gICAgICBzZXRTdGF0dXMobWFwcGVkLmxlbmd0aCA/IGluZEZvcm1hdChcIlZpc2l0c19DcmVhdGVfQ29udGFjdENvdW50XCIsIFwiezB9IGNvbnRhY3RzXCIsIG1hcHBlZC5sZW5ndGgpIDogaW5kVChcIlZpc2l0c19DcmVhdGVfTm9Db250YWN0c1wiLCBcIk5vIGNvbnRhY3RzXCIpKTtcclxuICAgIH0gY2F0Y2gge1xyXG4gICAgICBzZXRTdGF0dXMoaW5kVChcIlZpc2l0c19DcmVhdGVfTG9hZENvbnRhY3RzRXJyb3JcIiwgXCJGYWlsZWQgdG8gbG9hZCBjb250YWN0cy5cIikpO1xyXG4gICAgfSBmaW5hbGx5IHtcclxuICAgICAgYWJvcnRSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xyXG4gICAgICBzZXRMb2FkaW5nTW9yZShmYWxzZSk7XHJcbiAgICAgIHNldEJsb2NraW5nKGZhbHNlKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBjb25zdCBlbnN1cmVMb2FkZWQgPSAoKSA9PiB7XHJcbiAgICBpZiAoIWFjY291bnROdW0pIHJldHVybjtcclxuICAgIGlmIChoYXNMb2FkZWQgJiYgb3B0aW9ucy5sZW5ndGgpIHJldHVybjtcclxuICAgIGlmIChwcmltZUZyb21DYWNoZSgpKSByZXR1cm47XHJcbiAgICBsb2FkKDEsIGZhbHNlKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBsb2FkTW9yZUNvbnRhY3RzID0gUmVhY3QudXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKCFhY2NvdW50TnVtIHx8ICFoYXNNb3JlIHx8IGxvYWRpbmdNb3JlIHx8IGxvYWRpbmcpIHJldHVybjtcclxuICAgIGxvYWQocGFnZSArIDEsIHRydWUpO1xyXG4gIH0sIFthY2NvdW50TnVtLCBoYXNNb3JlLCBsb2FkaW5nTW9yZSwgbG9hZGluZywgcGFnZV0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFvcGVuIHx8ICFsaXN0UmVmLmN1cnJlbnQpIHJldHVybjtcclxuICAgIGNvbnN0IGVsID0gbGlzdFJlZi5jdXJyZW50O1xyXG4gICAgY29uc3Qgb25TY3JvbGwgPSAoKSA9PiB7XHJcbiAgICAgIGlmIChlbC5zY3JvbGxUb3AgKyBlbC5jbGllbnRIZWlnaHQgPj0gZWwuc2Nyb2xsSGVpZ2h0IC0gOCkgbG9hZE1vcmVDb250YWN0cygpO1xyXG4gICAgfTtcclxuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgb25TY3JvbGwsIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcclxuICAgIHJldHVybiAoKSA9PiBlbC5yZW1vdmVFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIG9uU2Nyb2xsKTtcclxuICB9LCBbb3BlbiwgbG9hZE1vcmVDb250YWN0c10pO1xyXG5cclxuICBjb25zdCBzZWxlY3RlZFZhbHVlcyA9IHVzZU1lbW8oKCkgPT4ge1xyXG4gICAgcmV0dXJuIG5ldyBTZXQoKHNlbGVjdGVkIHx8IFtdKS5tYXAoKHMpID0+IFN0cmluZyhzLnZhbHVlKSkpO1xyXG4gIH0sIFtzZWxlY3RlZF0pO1xyXG5cclxuICBjb25zdCBhdmFpbGFibGVPcHRpb25zID0gdXNlTWVtbygoKSA9PiB7XHJcbiAgICAvLyBIaWRlIGFscmVhZHkgc2VsZWN0ZWQgY29udGFjdHMgZnJvbSB0aGUgZHJvcGRvd24gbGlzdC5cclxuICAgIHJldHVybiAob3B0aW9ucyB8fCBbXSkuZmlsdGVyKChvKSA9PiAhc2VsZWN0ZWRWYWx1ZXMuaGFzKFN0cmluZyhvLnZhbHVlKSkpO1xyXG4gIH0sIFtvcHRpb25zLCBzZWxlY3RlZFZhbHVlc10pO1xyXG5cclxuICBjb25zdCBmaWx0ZXJlZCA9IHVzZU1lbW8oKCkgPT4ge1xyXG4gICAgY29uc3QgcSA9IHF1ZXJ5LnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgaWYgKCFxKSByZXR1cm4gYXZhaWxhYmxlT3B0aW9ucztcclxuICAgIHJldHVybiBhdmFpbGFibGVPcHRpb25zLmZpbHRlcihcclxuICAgICAgKG8pID0+IG8udGV4dC50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHEpIHx8IG8uY2FyZ28udG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhxKSB8fCBvLmVtcHJlc2EudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhxKVxyXG4gICAgKTtcclxuICB9LCBbYXZhaWxhYmxlT3B0aW9ucywgcXVlcnldKTtcclxuICBjb25zdCBzaG91bGRTaG93Tm90Rm91bmRSb3cgPSBzaG93Tm90Rm91bmRTdGF0ZSB8fCAoISFxdWVyeS50cmltKCkgJiYgZmlsdGVyZWQubGVuZ3RoID09PSAwKTtcclxuICBjb25zdCByZXNvbHZlZEFjdGl2ZUluZGV4ID1cclxuICAgIGZpbHRlcmVkLmxlbmd0aCA+IDAgPyBNYXRoLm1pbihNYXRoLm1heChhY3RpdmVJbmRleCwgMCksIGZpbHRlcmVkLmxlbmd0aCAtIDEpIDogMDtcclxuICBjb25zdCBhY3RpdmVJZCA9XHJcbiAgICBvcGVuICYmIGZpbHRlcmVkW3Jlc29sdmVkQWN0aXZlSW5kZXhdID8gYCR7aWRCYXNlfS1jb250YWN0LW9wdC0ke2ZpbHRlcmVkW3Jlc29sdmVkQWN0aXZlSW5kZXhdLnZhbHVlfWAgOiB1bmRlZmluZWQ7XHJcblxyXG4gIGNvbnN0IHRvZ2dsZU9wdGlvbiA9IChvcHQ6IENvbnRhY3RPcHRpb24pID0+IHtcclxuICAgIHNldFNlbGVjdGVkKChwcmV2KSA9PiB7XHJcbiAgICAgIGNvbnN0IGV4aXN0cyA9IHByZXYuc29tZSgocCkgPT4gcC52YWx1ZSA9PT0gb3B0LnZhbHVlKTtcclxuICAgICAgaWYgKGV4aXN0cykgcmV0dXJuIHByZXYuZmlsdGVyKChwKSA9PiBwLnZhbHVlICE9PSBvcHQudmFsdWUpO1xyXG4gICAgICByZXR1cm4gWy4uLnByZXYsIG9wdF07XHJcbiAgICB9KTtcclxuICAgIHNldFNob3dOb3RGb3VuZFN0YXRlKGZhbHNlKTtcclxuICAgIHNldFF1ZXJ5KFwiXCIpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGhhbmRsZUtleURvd24gPSAoZXY6IFJlYWN0LktleWJvYXJkRXZlbnQ8SFRNTElucHV0RWxlbWVudD4pID0+IHtcclxuICAgIGhhbmRsZUNvbWJvYm94S2V5RG93bihldiwge1xyXG4gICAgICBpc09wZW46IG9wZW4sXHJcbiAgICAgIHNldE9wZW4sXHJcbiAgICAgIG9wdGlvbkNvdW50OiBmaWx0ZXJlZC5sZW5ndGgsXHJcbiAgICAgIHNldEFjdGl2ZUluZGV4LFxyXG4gICAgICBvcGVuT25BcnJvdzogdHJ1ZSxcclxuICAgICAgb25BcnJvd05hdmlnYXRlOiBlbnN1cmVMb2FkZWQsXHJcbiAgICAgIG9uRW50ZXJXaGVuT3BlbjogKCkgPT4ge1xyXG4gICAgICAgIGlmIChmaWx0ZXJlZC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICB0b2dnbGVPcHRpb24oZmlsdGVyZWRbcmVzb2x2ZWRBY3RpdmVJbmRleF0gPz8gZmlsdGVyZWRbMF0pO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHF1ZXJ5LnRyaW0oKSkge1xyXG4gICAgICAgICAgc2V0UXVlcnkoXCJcIik7XHJcbiAgICAgICAgICBzZXRTaG93Tm90Rm91bmRTdGF0ZSh0cnVlKTtcclxuICAgICAgICAgIHNldE9wZW4odHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBvbkVudGVyV2hlbkNsb3NlZDogYWNjb3VudE51bVxyXG4gICAgICAgID8gKCkgPT4ge1xyXG4gICAgICAgICAgICBlbnN1cmVMb2FkZWQoKTtcclxuICAgICAgICAgICAgc2V0T3Blbih0cnVlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICA6IHVuZGVmaW5lZCxcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMlwiIHJlZj17Y29udGFpbmVyUmVmfT5cclxuICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZFwiIGh0bWxGb3I9e2lucHV0SWR9PlxyXG4gICAgICAgIHtpbmRUKFwiVmlzaXRzX0NyZWF0ZV9TZWFyY2hDb250YWN0XCIsIFwiU2VhcmNoIGNvbnRhY3RcIil9XHJcbiAgICAgIDwvbGFiZWw+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmVcIj5cclxuICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgcmVmPXtib3hSZWZ9XHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInJlbGF0aXZlIHctZnVsbCBjdXJzb3ItZGVmYXVsdCByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBib3JkZXItc2xhdGUtMzAwIGJnLXdoaXRlIHRleHQtbGVmdCBzaGFkb3cteHMgZm9jdXMtd2l0aGluOmJvcmRlci1wcmltYXJ5IGZvY3VzLXdpdGhpbjpyaW5nLTIgZm9jdXMtd2l0aGluOnJpbmctcHJpbWFyeSBmb2N1cy13aXRoaW46cmluZy1vZmZzZXQtMCBzbTp0ZXh0LXNtXCJcclxuICAgICAgICAgID5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAgZ2FwLTEgcHgtMyBweS0yIG1pbi1oLTEwXCI+XHJcbiAgICAgICAgICAgIHtzZWxlY3RlZC5tYXAoKGMpID0+IChcclxuICAgICAgICAgICAgICA8c3BhblxyXG4gICAgICAgICAgICAgICAga2V5PXtjLnZhbHVlfVxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYmctcHJpbWFyeS8xMCB0ZXh0LXNsYXRlLTcwMCBweC0yIHB5LTEgdGV4dC14c1wiXHJcbiAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAge2MudGV4dH1cclxuICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFNlbGVjdGVkKChwcmV2KSA9PiBwcmV2LmZpbHRlcigocykgPT4gcy52YWx1ZSAhPT0gYy52YWx1ZSkpfVxyXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTcwMCBob3Zlcjp0ZXh0LXNsYXRlLTcwMC84MFwiXHJcbiAgICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2luZFQoXCJDb21tb25fRGVsZXRlXCIsIFwiRGVsZXRlXCIpfVxyXG4gICAgICAgICAgICAgICAgICB0aXRsZT17aW5kVChcIkNvbW1vbl9EZWxldGVcIiwgXCJEZWxldGVcIil9XHJcbiAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgIDxYTWFya0ljb24gY2xhc3NOYW1lPVwiaC00IHctNFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIC8+XHJcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgICA8aW5wdXRcclxuICAgICAgICAgICAgICBpZD17aW5wdXRJZH1cclxuICAgICAgICAgICAgICBuYW1lPXtgJHtpZEJhc2V9LWNvbnRhY3RzLXF1ZXJ5YH1cclxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4LTEgbWluLXctMzAgYmctdHJhbnNwYXJlbnQgdGV4dC1zbSBzbTp0ZXh0LWJhc2UgbGVhZGluZy01IHRleHQtc2xhdGUtOTAwIGJvcmRlci1ub25lIG91dGxpbmUtaGlkZGVuIHB4LTEgcHktMSBmb2N1czpyaW5nLTAgZm9jdXM6Ym9yZGVyLXRyYW5zcGFyZW50XCJcclxuICAgICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzZXRBY3RpdmVJbmRleCgwKTtcclxuICAgICAgICAgICAgICAgIHNldFNob3dOb3RGb3VuZFN0YXRlKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHNldFF1ZXJ5KGV2ZW50LnRhcmdldC52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICBvbktleURvd249e2hhbmRsZUtleURvd259XHJcbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e3NlbGVjdGVkLmxlbmd0aCA/IFwiXCIgOiBpbmRUKFwiVmlzaXRzX0NyZWF0ZV9GaWx0ZXJQbGFjZWhvbGRlclwiLCBcIlR5cGUgdG8gZmlsdGVyLi4uXCIpfVxyXG4gICAgICAgICAgICAgIGF1dG9Db21wbGV0ZT1cIm9mZlwiXHJcbiAgICAgICAgICAgICAgcmVmPXtpbnB1dFJlZn1cclxuICAgICAgICAgICAgICByZWFkT25seT17IWFjY291bnROdW19XHJcbiAgICAgICAgICAgICAgcm9sZT1cImNvbWJvYm94XCJcclxuICAgICAgICAgICAgICBhcmlhLWV4cGFuZGVkPXtvcGVufVxyXG4gICAgICAgICAgICAgIGFyaWEtY29udHJvbHM9e2xpc3RJZH1cclxuICAgICAgICAgICAgICBhcmlhLWFjdGl2ZWRlc2NlbmRhbnQ9e2FjdGl2ZUlkfVxyXG4gICAgICAgICAgICAgIGFyaWEtYXV0b2NvbXBsZXRlPVwibGlzdFwiXHJcbiAgICAgICAgICAgICAgYXJpYS1sYWJlbD17aW5kVChcIlZpc2l0c19DcmVhdGVfU2VhcmNoQ29udGFjdFwiLCBcIlNlYXJjaCBjb250YWN0XCIpfVxyXG4gICAgICAgICAgICAgIG9uRm9jdXM9eygpID0+IHtcclxuICAgICAgICAgICAgICAgIGVuc3VyZUxvYWRlZCgpO1xyXG4gICAgICAgICAgICAgICAgc2V0T3Blbih0cnVlKTtcclxuICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICB7KGxvYWRpbmcgfHwgYmxvY2tpbmcpICYmIChcclxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC15LTAgcmlnaHQtOSBmbGV4IGl0ZW1zLWNlbnRlclwiPlxyXG4gICAgICAgICAgICAgICAgPFNwaW5uZXIgLz5cclxuICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LXktMCByaWdodC0wIGZsZXggaXRlbXMtY2VudGVyIHByLTIgdGV4dC1zbGF0ZS01MDAgaG92ZXI6dGV4dC1zbGF0ZS02MDBcIlxyXG4gICAgICAgICAgICBhcmlhLWxhYmVsPXtvcGVuID8gaW5kVChcIkRyb3Bkb3duX0hpZGVPcHRpb25zXCIsIFwiSGlkZSBvcHRpb25zXCIpIDogaW5kVChcIkRyb3Bkb3duX1Nob3dPcHRpb25zXCIsIFwiU2hvdyBvcHRpb25zXCIpfVxyXG4gICAgICAgICAgICBhcmlhLWV4cGFuZGVkPXtvcGVufVxyXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XHJcbiAgICAgICAgICAgICAgaWYgKCFhY2NvdW50TnVtKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgaWYgKG9wZW4pIHtcclxuICAgICAgICAgICAgICAgIHNldE9wZW4oZmFsc2UpO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBlbnN1cmVMb2FkZWQoKTtcclxuICAgICAgICAgICAgICAgIHNldE9wZW4odHJ1ZSk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9fVxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICB7b3BlbiA/IDxDaGV2cm9uVXBTdmcgY2xhc3NOYW1lPVwiaC01IHctNVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIC8+IDogPENoZXZyb25Eb3duU3ZnIGNsYXNzTmFtZT1cImgtNSB3LTVcIiBhcmlhLWhpZGRlbj1cInRydWVcIiAvPn1cclxuICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPEZsb2F0aW5nTGlzdFxyXG4gICAgICAgICAgICBhbmNob3JSZWY9e2JveFJlZn1cclxuICAgICAgICAgICAgb3Blbj17b3Blbn1cclxuICAgICAgICAgICAgekluZGV4PXszODAwMDB9XHJcbiAgICAgICAgICAgIG1heEhlaWdodENsYXNzPVwibWF4LWgtNzJcIlxyXG4gICAgICAgICAgICByb2xlPVwibGlzdGJveFwiXHJcbiAgICAgICAgICAgIHJvdW5kZWRDbGFzcz1cInJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldXCJcclxuICAgICAgICAgICAgcG9ydGFsQ2xhc3NOYW1lPXtwb3J0YWxDbGFzc05hbWV9XHJcbiAgICAgICAgICAgIHBhbmVsQ2xhc3NOYW1lPXtwYW5lbENsYXNzTmFtZX1cclxuICAgICAgICAgID5cclxuICAgICAgICAgIDxkaXYgcmVmPXtsaXN0UmVmfSBpZD17bGlzdElkfSBhcmlhLW11bHRpc2VsZWN0YWJsZT1cInRydWVcIj5cclxuICAgICAgICAgICAge2xvYWRpbmcgJiYgKFxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgcHgtNCBweS0yIHRleHQtc20gdGV4dC1zbGF0ZS01MDBcIj5cclxuICAgICAgICAgICAgICAgIDxTcGlubmVyIHNpemU9XCJoLTQgdy00XCIgLz5cclxuICAgICAgICAgICAgICAgIHtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfVxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgICB7IWxvYWRpbmcgJiYgb3B0aW9ucy5sZW5ndGggPT09IDAgJiYgKFxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHgtNCBweS0yIHRleHQtc20gdGV4dC1zbGF0ZS01MDBcIj5cclxuICAgICAgICAgICAgICAgIHtoYXNMb2FkZWQgPyBpbmRUKFwiVmlzaXRzX0NyZWF0ZV9Ob0NvbnRhY3RzXCIsIFwiTm8gY29udGFjdHNcIikgOiBpbmRUKFwiVmlzaXRzX0NyZWF0ZV9TZWxlY3RDbGllbnRGaXJzdFwiLCBcIlNlbGVjdCBhIGNsaWVudCBmaXJzdC5cIil9XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgIHshbG9hZGluZyAmJiBvcHRpb25zLmxlbmd0aCA+IDAgJiYgZmlsdGVyZWQubGVuZ3RoID09PSAwICYmIChcclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB4LTQgcHktMiB0ZXh0LXNtIHRleHQtc2xhdGUtNTAwXCI+XHJcbiAgICAgICAgICAgICAgICB7c2hvdWxkU2hvd05vdEZvdW5kUm93XHJcbiAgICAgICAgICAgICAgICAgID8gaW5kVChcIkNvbW1vbl9Ob3RGb3VuZFwiLCBcIk5vdCBmb3VuZFwiKVxyXG4gICAgICAgICAgICAgICAgICA6IGluZFQoXCJWaXNpdHNfQ3JlYXRlX05vTW9yZUNvbnRhY3RzXCIsIFwiTm8gbW9yZSBjb250YWN0cyBhdmFpbGFibGVcIil9XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgIHshbG9hZGluZyAmJlxyXG4gICAgICAgICAgICAgIGZpbHRlcmVkLm1hcCgob3B0LCBpZHgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNlbCA9IHNlbGVjdGVkLnNvbWUoKHMpID0+IHMudmFsdWUgPT09IG9wdC52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpc0FjdGl2ZSA9IGlkeCA9PT0gcmVzb2x2ZWRBY3RpdmVJbmRleDtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgICAgICAgICAgICBrZXk9e29wdC52YWx1ZX1cclxuICAgICAgICAgICAgICAgICAgICBpZD17YCR7aWRCYXNlfS1jb250YWN0LW9wdC0ke29wdC52YWx1ZX1gfVxyXG4gICAgICAgICAgICAgICAgICAgIHJvbGU9XCJvcHRpb25cIlxyXG4gICAgICAgICAgICAgICAgICAgIGFyaWEtc2VsZWN0ZWQ9e3NlbH1cclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXHJcbiAgICAgICAgICAgICAgICAgICAgICBcInJlbGF0aXZlIGZsZXggdy1mdWxsIGN1cnNvci1kZWZhdWx0IHNlbGVjdC1ub25lIGl0ZW1zLXN0YXJ0IHB5LTIgcHgtMyB0ZXh0LWxlZnQgdGV4dC1zbVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgaXNBY3RpdmUgPyBcImJnLXByaW1hcnkgdGV4dC13aGl0ZVwiIDogc2VsID8gXCJiZy1wcmltYXJ5LzEwIHRleHQtcHJpbWFyeVwiIDogXCJ0ZXh0LXNsYXRlLTkwMFwiXHJcbiAgICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgICAgICBvbk1vdXNlRW50ZXI9eygpID0+IHNldEFjdGl2ZUluZGV4KGlkeCl9XHJcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gdG9nZ2xlT3B0aW9uKG9wdCl9XHJcbiAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIGZsZXggZmxleC1jb2wgZ2FwLTAuNSBwci0yXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXCJibG9jayB0cnVuY2F0ZVwiLCBzZWwgPyBcImZvbnQtbWVkaXVtXCIgOiBcImZvbnQtbm9ybWFsXCIpfT57b3B0LnRleHR9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC14cyB0ZXh0LXNsYXRlLTYwMCB0cnVuY2F0ZVwiPntvcHQuY2FyZ299PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgfSl9XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAge2Jsb2NraW5nICYmIChcclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgei03MDAwMCBiZy13aGl0ZS83MCBiYWNrZHJvcC1ibHVyLVsxcHhdIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldXCI+XHJcbiAgICAgICAgICAgICAgICA8U3Bpbm5lciBzaXplPVwiaC02IHctNlwiIC8+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICA8L0Zsb2F0aW5nTGlzdD5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsIGZsZXgganVzdGlmeS1lbmRcIj5cclxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNTAwIHRlY2gtaW5mb1wiPntzdGF0dXN9PC9zcGFuPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb250YWN0c0NvbWJvYm94O1xyXG4iLCAiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5mdW5jdGlvbiBYTWFya0ljb24oe1xuICB0aXRsZSxcbiAgdGl0bGVJZCxcbiAgLi4ucHJvcHNcbn0sIHN2Z1JlZikge1xuICByZXR1cm4gLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzdmdcIiwgT2JqZWN0LmFzc2lnbih7XG4gICAgeG1sbnM6IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIixcbiAgICB2aWV3Qm94OiBcIjAgMCAyMCAyMFwiLFxuICAgIGZpbGw6IFwiY3VycmVudENvbG9yXCIsXG4gICAgXCJhcmlhLWhpZGRlblwiOiBcInRydWVcIixcbiAgICBcImRhdGEtc2xvdFwiOiBcImljb25cIixcbiAgICByZWY6IHN2Z1JlZixcbiAgICBcImFyaWEtbGFiZWxsZWRieVwiOiB0aXRsZUlkXG4gIH0sIHByb3BzKSwgdGl0bGUgPyAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChcInRpdGxlXCIsIHtcbiAgICBpZDogdGl0bGVJZFxuICB9LCB0aXRsZSkgOiBudWxsLCAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChcInBhdGhcIiwge1xuICAgIGQ6IFwiTTYuMjggNS4yMmEuNzUuNzUgMCAwIDAtMS4wNiAxLjA2TDguOTQgMTBsLTMuNzIgMy43MmEuNzUuNzUgMCAxIDAgMS4wNiAxLjA2TDEwIDExLjA2bDMuNzIgMy43MmEuNzUuNzUgMCAxIDAgMS4wNi0xLjA2TDExLjA2IDEwbDMuNzItMy43MmEuNzUuNzUgMCAwIDAtMS4wNi0xLjA2TDEwIDguOTQgNi4yOCA1LjIyWlwiXG4gIH0pKTtcbn1cbmNvbnN0IEZvcndhcmRSZWYgPSAvKiNfX1BVUkVfXyovIFJlYWN0LmZvcndhcmRSZWYoWE1hcmtJY29uKTtcbmV4cG9ydCBkZWZhdWx0IEZvcndhcmRSZWY7IiwgIlx1RkVGRmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IENsaWVudFNlYXJjaENvbWJvYm94IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL3Zpc2l0YXMvQ2xpZW50U2VhcmNoQ29tYm9ib3gudHN4XCI7XHJcbmltcG9ydCBDb250YWN0c0NvbWJvYm94IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL3Zpc2l0YXMvQ29udGFjdHNDb21ib2JveC50c3hcIjtcclxuXHJcbmV4cG9ydCB0eXBlIENyZWF0ZVNlbGVjdGVkQ2xpZW50ID0ge1xyXG4gIHZhbHVlOiBzdHJpbmc7XHJcbiAgdGV4dDogc3RyaW5nO1xyXG4gIGNhcmdvPzogc3RyaW5nO1xyXG4gIGVtcHJlc2E/OiBzdHJpbmc7XHJcbn0gfCBudWxsO1xyXG5cclxuZXhwb3J0IHR5cGUgQ3JlYXRlU2VsZWN0ZWRDb250YWN0ID0ge1xyXG4gIHZhbHVlOiBzdHJpbmc7XHJcbiAgdGV4dDogc3RyaW5nO1xyXG4gIGNhcmdvOiBzdHJpbmc7XHJcbiAgZW1wcmVzYTogc3RyaW5nO1xyXG59O1xyXG5cclxudHlwZSBDcmVhdGVTdGVwQ2xpZW50U2VsZWN0aW9uUHJvcHMgPSB7XHJcbiAgc2VsZWN0ZWRDbGllbnQ6IENyZWF0ZVNlbGVjdGVkQ2xpZW50O1xyXG4gIHNlbGVjdGVkQ29udGFjdHM6IENyZWF0ZVNlbGVjdGVkQ29udGFjdFtdO1xyXG4gIG9uQ2xpZW50U2VsZWN0ZWQ6IChuZXh0Q2xpZW50OiBDcmVhdGVTZWxlY3RlZENsaWVudCkgPT4gdm9pZDtcclxuICBvbkNvbnRhY3RzQ2hhbmdlOiAobmV4dENvbnRhY3RzOiBDcmVhdGVTZWxlY3RlZENvbnRhY3RbXSkgPT4gdm9pZDtcclxuICBjbGllbnRMYWJlbDogc3RyaW5nO1xyXG4gIGNsaWVudFBsYWNlaG9sZGVyOiBzdHJpbmc7XHJcbiAgc2VsZWN0ZWRDb250YWN0c0NvdW50VGV4dDogc3RyaW5nO1xyXG59O1xyXG5cclxuLy8gUmVuZGVycyBzdGVwIDEgd2hlcmUgdXNlciBzZWxlY3RzIHRoZSBhY2NvdW50IGFuZCByZWxhdGVkIGNvbnRhY3RzLlxyXG5jb25zdCBDcmVhdGVTdGVwQ2xpZW50U2VsZWN0aW9uID0gKHtcclxuICBzZWxlY3RlZENsaWVudCxcclxuICBzZWxlY3RlZENvbnRhY3RzLFxyXG4gIG9uQ2xpZW50U2VsZWN0ZWQsXHJcbiAgb25Db250YWN0c0NoYW5nZSxcclxuICBjbGllbnRMYWJlbCxcclxuICBjbGllbnRQbGFjZWhvbGRlcixcclxuICBzZWxlY3RlZENvbnRhY3RzQ291bnRUZXh0LFxyXG59OiBDcmVhdGVTdGVwQ2xpZW50U2VsZWN0aW9uUHJvcHMpID0+IHtcclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTZcIj5cclxuICAgICAgPENsaWVudFNlYXJjaENvbWJvYm94XHJcbiAgICAgICAgdmFsdWU9e3NlbGVjdGVkQ2xpZW50fVxyXG4gICAgICAgIG9uU2VsZWN0ZWQ9e29uQ2xpZW50U2VsZWN0ZWR9XHJcbiAgICAgICAgbGFiZWw9e2NsaWVudExhYmVsfVxyXG4gICAgICAgIHBsYWNlaG9sZGVyPXtjbGllbnRQbGFjZWhvbGRlcn1cclxuICAgICAgICBwb3J0YWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxyXG4gICAgICAvPlxyXG5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTNcIj5cclxuICAgICAgICA8Q29udGFjdHNDb21ib2JveFxyXG4gICAgICAgICAgYWNjb3VudE51bT17c2VsZWN0ZWRDbGllbnQ/LnZhbHVlfVxyXG4gICAgICAgICAgdmFsdWU9e3NlbGVjdGVkQ29udGFjdHN9XHJcbiAgICAgICAgICBvbkNoYW5nZT17b25Db250YWN0c0NoYW5nZX1cclxuICAgICAgICAgIHBvcnRhbENsYXNzTmFtZT1cInZpc2l0YXMtdHlwb2dyYXBoeVwiXHJcbiAgICAgICAgLz5cclxuICAgICAgICB7c2VsZWN0ZWRDb250YWN0cy5sZW5ndGggPiAwICYmIChcclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXNsYXRlLTYwMFwiPlxyXG4gICAgICAgICAgICB7c2VsZWN0ZWRDb250YWN0c0NvdW50VGV4dH1cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICl9XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IENyZWF0ZVN0ZXBDbGllbnRTZWxlY3Rpb247XHJcbiIsICJcdUZFRkZpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBTaW5nbGVEYXRlUGlja2VyIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvU2luZ2xlRGF0ZVBpY2tlci50c3hcIjtcclxuaW1wb3J0IFNlbGVjdENvbWJvYm94IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvU2VsZWN0Q29tYm9ib3gudHN4XCI7XHJcbmltcG9ydCBWaXNpdE5hcnJhdGl2ZUZpZWxkcyBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy92aXNpdGFzL1Zpc2l0TmFycmF0aXZlRmllbGRzLnRzeFwiO1xyXG5cclxudHlwZSBTZWxlY3RPcHRpb24gPSB7XHJcbiAgdmFsdWU/OiBzdHJpbmcgfCBudW1iZXI7XHJcbiAgVmFsdWU/OiBzdHJpbmcgfCBudW1iZXI7XHJcbiAgdGV4dD86IHN0cmluZztcclxuICBUZXh0Pzogc3RyaW5nO1xyXG59O1xyXG5cclxudHlwZSBOYXJyYXRpdmVUYXBGaWVsZCA9IHtcclxuICBpZDogc3RyaW5nO1xyXG4gIGxhYmVsOiBzdHJpbmc7XHJcbiAgdmFsdWU6IHN0cmluZztcclxuICBjbGFzc05hbWU6IHN0cmluZztcclxuICBwb2ludGVyQmluZGluZ3M6IHtcclxuICAgIG9uUG9pbnRlckRvd24/OiBSZWFjdC5Qb2ludGVyRXZlbnRIYW5kbGVyPEhUTUxUZXh0QXJlYUVsZW1lbnQ+O1xyXG4gICAgb25Qb2ludGVyTW92ZT86IFJlYWN0LlBvaW50ZXJFdmVudEhhbmRsZXI8SFRNTFRleHRBcmVhRWxlbWVudD47XHJcbiAgICBvblBvaW50ZXJVcD86IFJlYWN0LlBvaW50ZXJFdmVudEhhbmRsZXI8SFRNTFRleHRBcmVhRWxlbWVudD47XHJcbiAgICBvblBvaW50ZXJDYW5jZWw/OiBSZWFjdC5Qb2ludGVyRXZlbnRIYW5kbGVyPEhUTUxUZXh0QXJlYUVsZW1lbnQ+O1xyXG4gIH07XHJcbn07XHJcblxyXG50eXBlIENyZWF0ZVN0ZXBWaXNpdERldGFpbHNQcm9wcyA9IHtcclxuICB0aXRsZTogc3RyaW5nO1xyXG4gIGRhdGVMYWJlbDogc3RyaW5nO1xyXG4gIHRyYW5zRGF0ZTogc3RyaW5nO1xyXG4gIG9uVHJhbnNEYXRlQ2hhbmdlOiAobmV4dFZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgdmlzaXRUeXBlTGFiZWw6IHN0cmluZztcclxuICB2aXNpdFR5cGVzOiBTZWxlY3RPcHRpb25bXTtcclxuICB2aXNpdFR5cGU6IHN0cmluZztcbiAgb25WaXNpdFR5cGVDaGFuZ2U6IChuZXh0VmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgdmlzaXRUeXBlUGxhY2Vob2xkZXI6IHN0cmluZztcbiAgdmlzaXRUeXBlSW52YWxpZDogYm9vbGVhbjtcbiAgY29udGFjdE1ldGhvZExhYmVsOiBzdHJpbmc7XG4gIGNvbnRhY3RNZXRob2RzOiBTZWxlY3RPcHRpb25bXTtcbiAgY29udGFjdE1ldGhvZDogc3RyaW5nO1xuICBvbkNvbnRhY3RNZXRob2RDaGFuZ2U6IChuZXh0VmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgY29udGFjdE1ldGhvZFBsYWNlaG9sZGVyOiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uTGFiZWw6IHN0cmluZztcbiAgZGVzY3JpcHRpb25WYWx1ZTogc3RyaW5nO1xyXG4gIGRlc2NyaXB0aW9uQ2xhc3NOYW1lOiBzdHJpbmc7XHJcbiAgb25EZXNjcmlwdGlvbkNoYW5nZTogKG5leHRWYWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIHRhcEZpZWxkczogTmFycmF0aXZlVGFwRmllbGRbXTtcclxuICBzdGF0dXM6IHN0cmluZztcclxufTtcclxuXHJcbi8vIFJlbmRlcnMgc3RlcCAyIHdpdGggdmlzaXQgbWV0YWRhdGEgYW5kIG5hcnJhdGl2ZSBmaWVsZHMuXHJcbmNvbnN0IENyZWF0ZVN0ZXBWaXNpdERldGFpbHMgPSAoe1xyXG4gIHRpdGxlLFxyXG4gIGRhdGVMYWJlbCxcclxuICB0cmFuc0RhdGUsXHJcbiAgb25UcmFuc0RhdGVDaGFuZ2UsXHJcbiAgdmlzaXRUeXBlTGFiZWwsXHJcbiAgdmlzaXRUeXBlcyxcclxuICB2aXNpdFR5cGUsXHJcbiAgb25WaXNpdFR5cGVDaGFuZ2UsXG4gIHZpc2l0VHlwZVBsYWNlaG9sZGVyLFxuICB2aXNpdFR5cGVJbnZhbGlkLFxuICBjb250YWN0TWV0aG9kTGFiZWwsXG4gIGNvbnRhY3RNZXRob2RzLFxuICBjb250YWN0TWV0aG9kLFxuICBvbkNvbnRhY3RNZXRob2RDaGFuZ2UsXG4gIGNvbnRhY3RNZXRob2RQbGFjZWhvbGRlcixcbiAgZGVzY3JpcHRpb25MYWJlbCxcbiAgZGVzY3JpcHRpb25WYWx1ZSxcclxuICBkZXNjcmlwdGlvbkNsYXNzTmFtZSxcclxuICBvbkRlc2NyaXB0aW9uQ2hhbmdlLFxyXG4gIHRhcEZpZWxkcyxcclxuICBzdGF0dXMsXHJcbn06IENyZWF0ZVN0ZXBWaXNpdERldGFpbHNQcm9wcykgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNoYWRvdy14cyBnbGFzcy1wYW5lbCBwLTQgc3BhY2UteS00IGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldXCI+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1iYXNlIGZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS05MDAgYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTIwMCBwYi0zXCI+XHJcbiAgICAgICAge3RpdGxlfVxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0zIGdhcC00XCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidmlzaXRhLWZpZWxkLXRleHRcIj5cbiAgICAgICAgICA8U2luZ2xlRGF0ZVBpY2tlciBsYWJlbD17ZGF0ZUxhYmVsfSB2YWx1ZT17dHJhbnNEYXRlfSBvbkNoYW5nZT17b25UcmFuc0RhdGVDaGFuZ2V9IC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8U2VsZWN0Q29tYm9ib3hcclxuICAgICAgICAgIGxhYmVsPXt2aXNpdFR5cGVMYWJlbH1cclxuICAgICAgICAgIG9wdGlvbnM9e3Zpc2l0VHlwZXN9XHJcbiAgICAgICAgICB2YWx1ZT17dmlzaXRUeXBlfVxyXG4gICAgICAgICAgb25DaGFuZ2U9eyhuZXh0VmFsdWUpID0+IG9uVmlzaXRUeXBlQ2hhbmdlKFN0cmluZyhuZXh0VmFsdWUgPz8gXCJcIikpfVxyXG4gICAgICAgICAgcGxhY2Vob2xkZXI9e3Zpc2l0VHlwZVBsYWNlaG9sZGVyfVxyXG4gICAgICAgICAgaW52YWxpZD17dmlzaXRUeXBlSW52YWxpZH1cclxuICAgICAgICAgIGVtaXRPblZhbHVlQ2hhbmdlXG4gICAgICAgICAgcG9ydGFsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcbiAgICAgICAgLz5cbiAgICAgICAgPFNlbGVjdENvbWJvYm94XG4gICAgICAgICAgbGFiZWw9e2NvbnRhY3RNZXRob2RMYWJlbH1cbiAgICAgICAgICBvcHRpb25zPXtjb250YWN0TWV0aG9kc31cbiAgICAgICAgICB2YWx1ZT17Y29udGFjdE1ldGhvZH1cbiAgICAgICAgICBvbkNoYW5nZT17KG5leHRWYWx1ZSkgPT4gb25Db250YWN0TWV0aG9kQ2hhbmdlKFN0cmluZyhuZXh0VmFsdWUgPz8gXCJcIikpfVxuICAgICAgICAgIHBsYWNlaG9sZGVyPXtjb250YWN0TWV0aG9kUGxhY2Vob2xkZXJ9XG4gICAgICAgICAgZW1pdE9uVmFsdWVDaGFuZ2VcbiAgICAgICAgICBwb3J0YWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG5cclxuICAgICAgPFZpc2l0TmFycmF0aXZlRmllbGRzXHJcbiAgICAgICAgZGVzY3JpcHRpb25MYWJlbD17ZGVzY3JpcHRpb25MYWJlbH1cclxuICAgICAgICBkZXNjcmlwdGlvblZhbHVlPXtkZXNjcmlwdGlvblZhbHVlfVxyXG4gICAgICAgIGRlc2NyaXB0aW9uQ2xhc3NOYW1lPXtkZXNjcmlwdGlvbkNsYXNzTmFtZX1cclxuICAgICAgICBvbkRlc2NyaXB0aW9uQ2hhbmdlPXtvbkRlc2NyaXB0aW9uQ2hhbmdlfVxyXG4gICAgICAgIHRhcEZpZWxkcz17dGFwRmllbGRzfVxyXG4gICAgICAvPlxyXG5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtM1wiPlxyXG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc20gdGV4dC1zbGF0ZS01MDBcIj57c3RhdHVzfTwvc3Bhbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ3JlYXRlU3RlcFZpc2l0RGV0YWlscztcclxuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IENyZWF0ZUZvcm0gZnJvbSBcIi4vQ3JlYXRlRm9ybS50c3hcIjtcclxuaW1wb3J0IFZpc2l0YXNQYWdlUHJvdmlkZXJzIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvVmlzaXRhc1BhZ2VQcm92aWRlcnMudHN4XCI7XHJcbmltcG9ydCB7IG1vdW50UmVhY3RJc2xhbmQsIG1vdW50V2hlbkRvY3VtZW50UmVhZHkgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvcmVhY3RJc2xhbmQudHN4XCI7XHJcblxyXG4vLyBQYWdlIGVudHJ5IGZvciB0aGUgdmlzaXRhcyBjcmVhdGUgaXNsYW5kLlxyXG5jb25zdCBDcmVhdGVQYWdlID0gKCkgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8VmlzaXRhc1BhZ2VQcm92aWRlcnM+XHJcbiAgICAgIDxDcmVhdGVGb3JtIC8+XHJcbiAgICA8L1Zpc2l0YXNQYWdlUHJvdmlkZXJzPlxyXG4gICk7XHJcbn07XHJcblxyXG5jb25zdCBtb3VudCA9ICgpID0+IHtcclxuICBjb25zdCByb290RWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpc2l0YXMtYXBwLXJvb3RcIik7XHJcbiAgaWYgKCFyb290RWwpIHJldHVybjtcclxuXHJcbiAgbW91bnRSZWFjdElzbGFuZChyb290RWwsIDxDcmVhdGVQYWdlIC8+KTtcclxufTtcclxuXHJcbm1vdW50V2hlbkRvY3VtZW50UmVhZHkobW91bnQpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ3JlYXRlUGFnZTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFDLElBQUFBLGdCQUE0RDs7O0FDQTdELG1CQUEwQjtBQUduQixJQUFNLFlBQVksQ0FDdkIsTUFDQSxXQUNBLFFBQ0EsUUFDQSxPQUFPLE9BQ1AsaUJBQWlCLE1BQ2pCQyxhQUFZLFNBQ1Q7QUFDSCw4QkFBVSxNQUFNO0FBQ2QsVUFBTSxVQUFVLFNBQVMsZUFBZSxrQkFBa0I7QUFDMUQs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O0FBQUEsWUFDWCxpQkFBaUI7QUFBQSxVQUNuQjtBQUFBLFVBQ0E7QUFBQSxZQUNFLElBQUk7QUFBQSxZQUNKLE9BQU87QUFBQSxZQUNQLE9BQU87QUFBQSxZQUNQLFdBQVc7QUFBQSxZQUNYLGlCQUFpQjtBQUFBLFVBQ25CO0FBQUEsUUFDRjtBQUFBLFFBQ0E7QUFBQTtBQUFBLElBQ0Y7QUFBQSxLQUVKO0FBRUo7QUFHZSxTQUFSLGFBQThCO0FBQ25DLFNBQ0UsNkNBQUMsNEJBQWlCLGlCQUFpQixLQUFLLCtCQUErQiwwRUFBMEUsR0FDL0ksdURBQUMsY0FBVyxHQUNkO0FBRUo7OztBVXZZTSxJQUFBQyxzQkFBQTtBQUhOLElBQU0sYUFBYSxNQUFNO0FBQ3ZCLFNBQ0UsNkNBQUMsZ0NBQ0MsdURBQUMsY0FBVyxHQUNkO0FBRUo7QUFFQSxJQUFNLFFBQVEsTUFBTTtBQUNsQixRQUFNLFNBQVMsU0FBUyxlQUFlLGtCQUFrQjtBQUN6RCxNQUFJLENBQUMsT0FBUTtBQUViLG1CQUFpQixRQUFRLDZDQUFDLGNBQVcsQ0FBRTtBQUN6QztBQUVBLHVCQUF1QixLQUFLO0FBRTVCLElBQU8scUJBQVE7IiwKICAibmFtZXMiOiBbImltcG9ydF9yZWFjdCIsICJjYW5BY2Nlc3MiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAidmFsdWUiLCAiUmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiUmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIl0KfQo=
