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
} from "./chunks/chunk-HTOF6LZE.js";
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
} from "./chunks/chunk-IU4BAGGS.js";
import {
  SingleDatePicker
} from "./chunks/chunk-UWXS5GXW.js";
import {
  handleComboboxKeyDown
} from "./chunks/chunk-YMDESVRK.js";
import {
  SelectCombobox_default
} from "./chunks/chunk-JXIHF6W4.js";
import {
  ChevronDownSvg,
  ChevronUpSvg,
  FloatingList_default,
  useOutsideClick
} from "./chunks/chunk-CGLQ74CG.js";
import {
  wait
} from "./chunks/chunk-4BE3ZFCK.js";
import {
  ConfirmModal,
  useConfirmDialog
} from "./chunks/chunk-A4F6XO5X.js";
import {
  flashActionMark,
  setHistoryFilterForDate
} from "./chunks/chunk-THYI4DWA.js";
import {
  VisitasPageProviders_default
} from "./chunks/chunk-OAWUU2EQ.js";
import "./chunks/chunk-7CXSZQJB.js";
import {
  Spinner_default,
  canAccess,
  classNames,
  showPermissionModal
} from "./chunks/chunk-3DMDYLVT.js";
import {
  mountReactIsland,
  mountWhenDocumentReady,
  require_jsx_runtime,
  require_react
} from "./chunks/chunk-WUZVRL45.js";
import {
  fetchJson,
  indFormat,
  indT
} from "./chunks/chunk-5TAE4PEJ.js";
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

// ../GitHub Projects/IND_CRM_APP/IND_CRM_APP/node_modules/@heroicons/react/20/solid/esm/XMarkIcon.js
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvY3JlYWNpb24vQ3JlYXRlRm9ybS50c3giLCAiLi4vcmVhY3Qvc3JjL2hvb2tzL3VzZVRvcGJhci50cyIsICIuLi9yZWFjdC9zcmMvaG9va3MvdXNlQ3JlYXRlRHJhZnQudHMiLCAiLi4vcmVhY3Qvc3JjL3V0aWxzL2dsb2JhbFNwaW5uZXIudHMiLCAiLi4vcmVhY3Qvc3JjL2hvb2tzL3VzZUNyZWF0ZVN1Ym1pdC50cyIsICIuLi9yZWFjdC9zcmMvdXRpbHMvaW5kSWRzLnRzIiwgIi4uL3JlYWN0L3NyYy9jb21wb25lbnRzL3Zpc2l0YXMvQ29udGFjdHNDb21ib2JveC50c3giLCAiLi4vLi4vLi4vLi4vR2l0SHViIFByb2plY3RzL0lORF9DUk1fQVBQL0lORF9DUk1fQVBQL25vZGVfbW9kdWxlcy9AaGVyb2ljb25zL3JlYWN0LzIwL3NvbGlkL2VzbS9YTWFya0ljb24uanMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvY3JlYWNpb24vQ3JlYXRlU3RlcENsaWVudFNlbGVjdGlvbi50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvY3JlYWNpb24vQ3JlYXRlU3RlcFZpc2l0RGV0YWlscy50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvY3JlYWNpb24vQ3JlYXRlUGFnZS50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIlx1RkVGRmltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVN0YXRlLCB1c2VSZWYgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IENvbmZpcm1Nb2RhbCBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0NvbmZpcm1Nb2RhbC50c3hcIjtcclxuaW1wb3J0IEFwcEVycm9yQm91bmRhcnkgZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9BcHBFcnJvckJvdW5kYXJ5LnRzeFwiO1xyXG5pbXBvcnQgeyB1c2VWaXNpdGFzIH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZVZpc2l0YXMudHNcIjtcclxuaW1wb3J0IHsgdXNlVGFwR3VhcmQgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlVGFwR3VhcmQudHNcIjtcclxuaW1wb3J0IHsgdXNlVG9wYmFyIH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZVRvcGJhci50c1wiO1xyXG5pbXBvcnQgeyB1c2VDb25maXJtRGlhbG9nIH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZUNvbmZpcm1EaWFsb2cudHNcIjtcclxuaW1wb3J0IHsgdXNlQ3JlYXRlRHJhZnQgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlQ3JlYXRlRHJhZnQudHNcIjtcclxuaW1wb3J0IHsgdXNlQ3JlYXRlU3VibWl0IH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZUNyZWF0ZVN1Ym1pdC50c1wiO1xyXG5pbXBvcnQgeyB1c2VUZXh0RWRpdG9yRmllbGRzIH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZVRleHRFZGl0b3JGaWVsZHMudHNcIjtcclxuaW1wb3J0IENyZWF0ZVN0ZXBDbGllbnRTZWxlY3Rpb24sIHsgQ3JlYXRlU2VsZWN0ZWRDbGllbnQsIENyZWF0ZVNlbGVjdGVkQ29udGFjdCB9IGZyb20gXCIuL0NyZWF0ZVN0ZXBDbGllbnRTZWxlY3Rpb24udHN4XCI7XHJcbmltcG9ydCBDcmVhdGVTdGVwVmlzaXREZXRhaWxzIGZyb20gXCIuL0NyZWF0ZVN0ZXBWaXNpdERldGFpbHMudHN4XCI7XHJcbmltcG9ydCB7IGNsYXNzTmFtZXMgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvY2xhc3NOYW1lcy50c1wiO1xyXG5pbXBvcnQgeyBpbmRGb3JtYXQsIGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgeyBjYW5BY2Nlc3MsIHNob3dQZXJtaXNzaW9uTW9kYWwgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvcGVybWlzc2lvbnMudHNcIjtcclxuaW1wb3J0IHsgc2V0UHJldmlld0FuY2hvciwgc2hvd1ByZXZpZXdUb29sdGlwLCBpc092ZXJmbG93aW5nIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3ByZXZpZXdUb29sdGlwLnRzXCI7XHJcbmltcG9ydCB7IG5hdmlnYXRlVG9UZXh0RWRpdG9yRmllbGQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvdGV4dEVkaXRvck5hdmlnYXRpb24udHNcIjtcclxuaW1wb3J0IHsgZmxhc2hBY3Rpb25NYXJrIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3Zpc2l0YXNIaXN0b3J5LnRzXCI7XHJcblxyXG5mdW5jdGlvbiBWaXNpdGFzQXBwKCkge1xyXG4gIGNvbnN0IHsgdmlzaXRUeXBlcywgYXNpc3RlbnRlVGlwb3MgfSA9IHVzZVZpc2l0YXMoKTtcclxuICBjb25zdCBjYW5DcmVhdGVWaXNpdCA9IGNhbkFjY2VzcyhcIlZJU0lUQVNfQ1JFQUNJT05cIiwgXCJBZGRcIik7XHJcbiAgY29uc3QgY2FuUm9sbGJhY2tEZWxldGUgPSBjYW5BY2Nlc3MoXCJWSVNJVEFTX0hJU1RPUklBTFwiLCBcIkZ1bGxBY2Nlc3NcIik7XHJcblxyXG4gIGNvbnN0IGZpZWxkSWRDb21lbnRhcmlvcyA9IFwiVmlzaXRhLkNyZWF0ZS5Db21lbnRhcmlvc1wiO1xyXG4gIGNvbnN0IGZpZWxkSWRBbnRlY2VkZW50ZXMgPSBcIlZpc2l0YS5DcmVhdGUuQW50ZWNlZGVudGVzXCI7XHJcbiAgY29uc3QgZmllbGRJZENvbmNsdXNpb25lcyA9IFwiVmlzaXRhLkNyZWF0ZS5Db25jbHVzaW9uZXNcIjtcclxuXHJcbiAgY29uc3QgW3N0ZXAsIHNldFN0ZXBdID0gdXNlU3RhdGUoMSk7XHJcbiAgY29uc3QgW3NlbGVjdGVkQ2xpZW50LCBzZXRTZWxlY3RlZENsaWVudF0gPSB1c2VTdGF0ZTxDcmVhdGVTZWxlY3RlZENsaWVudD4obnVsbCk7XHJcbiAgY29uc3QgW3NlbGVjdGVkQ29udGFjdHMsIHNldFNlbGVjdGVkQ29udGFjdHNdID0gdXNlU3RhdGU8Q3JlYXRlU2VsZWN0ZWRDb250YWN0W10+KFtdKTtcclxuICBjb25zdCB0b2RheVN0cmluZyA9ICgpID0+IHtcclxuICAgIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKTtcclxuICAgIGNvbnN0IHl5eXkgPSB0b2RheS5nZXRGdWxsWWVhcigpO1xyXG4gICAgY29uc3QgbW0gPSBTdHJpbmcodG9kYXkuZ2V0TW9udGgoKSArIDEpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcclxuICAgIGNvbnN0IGRkID0gU3RyaW5nKHRvZGF5LmdldERhdGUoKSkucGFkU3RhcnQoMiwgXCIwXCIpO1xyXG4gICAgcmV0dXJuIGAke3l5eXl9LSR7bW19LSR7ZGR9YDtcclxuICB9O1xyXG5cclxuICBjb25zdCBkZWZhdWx0VmlzaXRUeXBlID0gU3RyaW5nKHZpc2l0VHlwZXNbMF0/LnZhbHVlID8/IHZpc2l0VHlwZXNbMF0/LlZhbHVlID8/IFwiXCIpO1xyXG4gIGNvbnN0IGRlZmF1bHRBc2lzdGVudGVUaXBvID0gU3RyaW5nKGFzaXN0ZW50ZVRpcG9zWzBdPy52YWx1ZSA/PyBhc2lzdGVudGVUaXBvc1swXT8uVmFsdWUgPz8gXCIwXCIpO1xyXG5cclxuICBjb25zdCBbdmlzaXRUeXBlLCBzZXRWaXNpdFR5cGVdID0gdXNlU3RhdGU8c3RyaW5nPihkZWZhdWx0VmlzaXRUeXBlKTtcclxuICBjb25zdCBbdHJhbnNEYXRlLCBzZXRUcmFuc0RhdGVdID0gdXNlU3RhdGUoKCkgPT4gdG9kYXlTdHJpbmcoKSk7XHJcbiAgY29uc3QgW2Rlc2NyaXB0aW9uLCBzZXREZXNjcmlwdGlvbl0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbY29tZW50YXJpb3MsIHNldENvbWVudGFyaW9zXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFthbnRlY2VkZW50ZXMsIHNldEFudGVjZWRlbnRlc10gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbY29uY2x1c2lvbmVzLCBzZXRDb25jbHVzaW9uZXNdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW3N0YXR1cywgc2V0U3RhdHVzXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtidXN5LCBzZXRCdXN5XSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbc2hvd1JlcXVpcmVkLCBzZXRTaG93UmVxdWlyZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFttb2RhbEVycm9yLCBzZXRNb2RhbEVycm9yXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG5cclxuICBjb25zdCB7IG1vZGFsLCBvcGVuQ29uZmlybSwgY2xvc2VDb25maXJtLCBoYW5kbGVDb25maXJtIH0gPSB1c2VDb25maXJtRGlhbG9nKHtcclxuICAgIGRlZmF1bHRDb25maXJtVGV4dDogaW5kVChcIkNvbmZpcm1fWWVzXCIsIFwiQ29uZmlybV9ZZXNcIiksXHJcbiAgICBkZWZhdWx0Q2FuY2VsVGV4dDogaW5kVChcIkNvbmZpcm1fTm9cIiwgXCJDb25maXJtX05vXCIpXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZU1vZGFsQ29uZmlybSA9IFJlYWN0LnVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcclxuICAgIHNldE1vZGFsRXJyb3IoXCJcIik7XHJcbiAgICBhd2FpdCBoYW5kbGVDb25maXJtKHtcclxuICAgICAgYnVzeSxcclxuICAgICAgb25FcnJvcjogKG1zZykgPT4ge1xyXG4gICAgICAgIHNldE1vZGFsRXJyb3IobXNnKTtcclxuICAgICAgICBzZXRTdGF0dXMobXNnKTtcclxuICAgICAgICBmbGFzaEFjdGlvbk1hcmsoXCJlcnJvclByb2Nlc3NcIiwgMTUwMCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0sIFtidXN5LCBoYW5kbGVDb25maXJtXSk7XHJcblxyXG4gIGNvbnN0IG1vZGFsTG9hZGluZ1RleHQgPSBpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJDb21tb25fTG9hZGluZ1wiKTtcclxuICBjb25zdCBtb2RhbENhbmNlbFRleHQgPSBtb2RhbC5jYW5jZWxUZXh0IHx8IGluZFQoXCJDb25maXJtX05vXCIsIFwiQ29uZmlybV9Ob1wiKTtcclxuICBjb25zdCBtb2RhbENvbmZpcm1UZXh0ID0gYnVzeVxyXG4gICAgPyBtb2RhbExvYWRpbmdUZXh0XHJcbiAgICA6ICghYnVzeSAmJiBtb2RhbEVycm9yID8gaW5kVChcIkNvbW1vbl9PS1wiLCBcIkNvbW1vbl9PS1wiKSA6IChtb2RhbC5jb25maXJtVGV4dCB8fCBpbmRUKFwiQ29uZmlybV9ZZXNcIiwgXCJDb25maXJtX1llc1wiKSkpO1xyXG5cclxuICBjb25zdCBoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm0gPSBSZWFjdC51c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAoIWJ1c3kgJiYgbW9kYWxFcnJvcikge1xyXG4gICAgICBjbG9zZUNvbmZpcm0oKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaGFuZGxlTW9kYWxDb25maXJtKCk7XHJcbiAgfSwgW2J1c3ksIG1vZGFsRXJyb3IsIGNsb3NlQ29uZmlybSwgaGFuZGxlTW9kYWxDb25maXJtXSk7XHJcblxyXG4gIGNvbnN0IGRyYWZ0U25hcHNob3QgPSB1c2VNZW1vKFxyXG4gICAgKCkgPT4gKHtcclxuICAgICAgc2VsZWN0ZWRDbGllbnQsXHJcbiAgICAgIHNlbGVjdGVkQ29udGFjdHMsXHJcbiAgICAgIHZpc2l0VHlwZSxcclxuICAgICAgdHJhbnNEYXRlLFxyXG4gICAgICBkZXNjcmlwdGlvbixcclxuICAgICAgY29tZW50YXJpb3MsXHJcbiAgICAgIGFudGVjZWRlbnRlcyxcclxuICAgICAgY29uY2x1c2lvbmVzLFxyXG4gICAgICBzdGVwLFxyXG4gICAgfSksXHJcbiAgICBbc2VsZWN0ZWRDbGllbnQsIHNlbGVjdGVkQ29udGFjdHMsIHZpc2l0VHlwZSwgdHJhbnNEYXRlLCBkZXNjcmlwdGlvbiwgY29tZW50YXJpb3MsIGFudGVjZWRlbnRlcywgY29uY2x1c2lvbmVzLCBzdGVwXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IHsgcGVyc2lzdERyYWZ0Tm93IH0gPSB1c2VDcmVhdGVEcmFmdCh7XHJcbiAgICBkcmFmdFNuYXBzaG90LFxyXG4gICAgc2V0U2VsZWN0ZWRDbGllbnQsXHJcbiAgICBzZXRTZWxlY3RlZENvbnRhY3RzLFxyXG4gICAgc2V0VmlzaXRUeXBlLFxyXG4gICAgc2V0VHJhbnNEYXRlLFxyXG4gICAgc2V0RGVzY3JpcHRpb24sXHJcbiAgICBzZXRDb21lbnRhcmlvcyxcclxuICAgIHNldEFudGVjZWRlbnRlcyxcclxuICAgIHNldENvbmNsdXNpb25lcyxcclxuICAgIHNldFN0ZXAsXHJcbiAgfSk7XHJcblxyXG4gIC8vIE9wZW5zIHRoZSBmdWxsLXNjcmVlbiB0ZXh0IGVkaXRvciBmb3IgYSBtdWx0aWxpbmUgZmllbGQuXHJcbiAgY29uc3Qgb3BlblRleHRFZGl0b3IgPSBSZWFjdC51c2VDYWxsYmFjayhcclxuICAgIChmaWVsZElkOiBzdHJpbmcsIGZpZWxkTGFiZWw6IHN0cmluZywgZmllbGRWYWx1ZTogc3RyaW5nLCBvcHRpb25zOiB7IGFsbG93RWRpdD86IGJvb2xlYW4gfSA9IHt9KSA9PiB7XHJcbiAgICAgIG5hdmlnYXRlVG9UZXh0RWRpdG9yRmllbGQoe1xyXG4gICAgICAgIGZpZWxkSWQsXHJcbiAgICAgICAgZmllbGRMYWJlbCxcclxuICAgICAgICBmaWVsZFZhbHVlLFxyXG4gICAgICAgIGFsbG93RWRpdDogb3B0aW9ucz8uYWxsb3dFZGl0ICE9PSBmYWxzZSxcclxuICAgICAgICBiZWZvcmVOYXZpZ2F0ZTogcGVyc2lzdERyYWZ0Tm93LFxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBbcGVyc2lzdERyYWZ0Tm93XVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUNvbWVudGFyaW9zVGFwID0gUmVhY3QudXNlQ2FsbGJhY2soKGV2ZW50KSA9PiB7XHJcbiAgICBpZiAoYnVzeSkgcmV0dXJuO1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIG9wZW5UZXh0RWRpdG9yKGZpZWxkSWRDb21lbnRhcmlvcywgaW5kVChcIlZpc2l0c19GaWVsZF9Db21tZW50c1wiLCBcIkNvbW1lbnRzXCIpLCBjb21lbnRhcmlvcyk7XHJcbiAgfSwgW2J1c3ksIGNvbWVudGFyaW9zLCBvcGVuVGV4dEVkaXRvcl0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVDb21lbnRhcmlvc0hvbGQgPSBSZWFjdC51c2VDYWxsYmFjaygodGFyZ2V0LCBjbGllbnRZKSA9PiB7XHJcbiAgICBpZiAoIXRhcmdldCB8fCAhaXNPdmVyZmxvd2luZyh0YXJnZXQpKSByZXR1cm4gZmFsc2U7XHJcbiAgICBzZXRQcmV2aWV3QW5jaG9yKHRhcmdldCk7XHJcbiAgICByZXR1cm4gc2hvd1ByZXZpZXdUb29sdGlwKFN0cmluZyhjb21lbnRhcmlvcyB8fCBcIlwiKSwgY2xpZW50WSk7XHJcbiAgfSwgW2NvbWVudGFyaW9zXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUFudGVjZWRlbnRlc1RhcCA9IFJlYWN0LnVzZUNhbGxiYWNrKChldmVudCkgPT4ge1xyXG4gICAgaWYgKGJ1c3kpIHJldHVybjtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBvcGVuVGV4dEVkaXRvcihmaWVsZElkQW50ZWNlZGVudGVzLCBpbmRUKFwiVmlzaXRzX0ZpZWxkX0JhY2tncm91bmRcIiwgXCJCYWNrZ3JvdW5kXCIpLCBhbnRlY2VkZW50ZXMpO1xyXG4gIH0sIFtidXN5LCBhbnRlY2VkZW50ZXMsIG9wZW5UZXh0RWRpdG9yXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUFudGVjZWRlbnRlc0hvbGQgPSBSZWFjdC51c2VDYWxsYmFjaygodGFyZ2V0LCBjbGllbnRZKSA9PiB7XHJcbiAgICBpZiAoIXRhcmdldCB8fCAhaXNPdmVyZmxvd2luZyh0YXJnZXQpKSByZXR1cm4gZmFsc2U7XHJcbiAgICBzZXRQcmV2aWV3QW5jaG9yKHRhcmdldCk7XHJcbiAgICByZXR1cm4gc2hvd1ByZXZpZXdUb29sdGlwKFN0cmluZyhhbnRlY2VkZW50ZXMgfHwgXCJcIiksIGNsaWVudFkpO1xyXG4gIH0sIFthbnRlY2VkZW50ZXNdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQ29uY2x1c2lvbmVzVGFwID0gUmVhY3QudXNlQ2FsbGJhY2soKGV2ZW50KSA9PiB7XHJcbiAgICBpZiAoYnVzeSkgcmV0dXJuO1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIG9wZW5UZXh0RWRpdG9yKGZpZWxkSWRDb25jbHVzaW9uZXMsIGluZFQoXCJWaXNpdHNfRmllbGRfQ29uY2x1c2lvbnNcIiwgXCJDb25jbHVzaW9uc1wiKSwgY29uY2x1c2lvbmVzKTtcclxuICB9LCBbYnVzeSwgY29uY2x1c2lvbmVzLCBvcGVuVGV4dEVkaXRvcl0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVDb25jbHVzaW9uZXNIb2xkID0gUmVhY3QudXNlQ2FsbGJhY2soKHRhcmdldCwgY2xpZW50WSkgPT4ge1xyXG4gICAgaWYgKCF0YXJnZXQgfHwgIWlzT3ZlcmZsb3dpbmcodGFyZ2V0KSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgc2V0UHJldmlld0FuY2hvcih0YXJnZXQpO1xyXG4gICAgcmV0dXJuIHNob3dQcmV2aWV3VG9vbHRpcChTdHJpbmcoY29uY2x1c2lvbmVzIHx8IFwiXCIpLCBjbGllbnRZKTtcclxuICB9LCBbY29uY2x1c2lvbmVzXSk7XHJcblxyXG4gIGNvbnN0IGNvbWVudGFyaW9zVGFwID0gdXNlVGFwR3VhcmQoaGFuZGxlQ29tZW50YXJpb3NUYXAsIGhhbmRsZUNvbWVudGFyaW9zSG9sZCk7XHJcbiAgY29uc3QgYW50ZWNlZGVudGVzVGFwID0gdXNlVGFwR3VhcmQoaGFuZGxlQW50ZWNlZGVudGVzVGFwLCBoYW5kbGVBbnRlY2VkZW50ZXNIb2xkKTtcclxuICBjb25zdCBjb25jbHVzaW9uZXNUYXAgPSB1c2VUYXBHdWFyZChoYW5kbGVDb25jbHVzaW9uZXNUYXAsIGhhbmRsZUNvbmNsdXNpb25lc0hvbGQpO1xyXG5cclxuICBjb25zdCB0ZXh0RWRpdG9yQmluZGluZ3MgPSB1c2VNZW1vKFxyXG4gICAgKCkgPT4gW1xyXG4gICAgICB7IGZpZWxkSWQ6IGZpZWxkSWRDb21lbnRhcmlvcywgYXBwbHlWYWx1ZTogc2V0Q29tZW50YXJpb3MgfSxcclxuICAgICAgeyBmaWVsZElkOiBmaWVsZElkQW50ZWNlZGVudGVzLCBhcHBseVZhbHVlOiBzZXRBbnRlY2VkZW50ZXMgfSxcclxuICAgICAgeyBmaWVsZElkOiBmaWVsZElkQ29uY2x1c2lvbmVzLCBhcHBseVZhbHVlOiBzZXRDb25jbHVzaW9uZXMgfSxcclxuICAgIF0sXHJcbiAgICBbZmllbGRJZEFudGVjZWRlbnRlcywgZmllbGRJZENvbWVudGFyaW9zLCBmaWVsZElkQ29uY2x1c2lvbmVzXVxyXG4gICk7XHJcblxyXG4gIHVzZVRleHRFZGl0b3JGaWVsZHModGV4dEVkaXRvckJpbmRpbmdzKTtcclxuXHJcbiAgLy8gQ2xlYXIgY29udGFjdHMgb25seSB3aGVuIHRoZSBjbGllbnQgY2hhbmdlcyAoYXZvaWQgY2xlYXJpbmcgb24gcmVzdG9yZS9zdGVwIDIgcmV0dXJuKS5cclxuICBjb25zdCBwcmV2Q2xpZW50UmVmID0gdXNlUmVmKG51bGwpO1xyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBjdXJyZW50ID0gc2VsZWN0ZWRDbGllbnQ/LnZhbHVlO1xyXG4gICAgaWYgKHByZXZDbGllbnRSZWYuY3VycmVudCAmJiBwcmV2Q2xpZW50UmVmLmN1cnJlbnQgIT09IGN1cnJlbnQpIHtcclxuICAgICAgc2V0U2VsZWN0ZWRDb250YWN0cyhbXSk7XHJcbiAgICB9XHJcbiAgICBwcmV2Q2xpZW50UmVmLmN1cnJlbnQgPSBjdXJyZW50O1xyXG4gIH0sIFtzZWxlY3RlZENsaWVudD8udmFsdWVdKTtcclxuXHJcbiAgY29uc3QgbGFzdENsaWVudFJlZiA9IHVzZVJlZihudWxsKTtcclxuXHJcbiAgLy8gSWYgdGhlIGNsaWVudCBjaGFuZ2VzIGFmdGVyIHNlbGVjdGluZyBjb250YWN0cywgcmVzZXQgdGhlIGVudGlyZSBmb3JtLlxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBjdXJyZW50ID0gc2VsZWN0ZWRDbGllbnQ/LnZhbHVlO1xyXG4gICAgaWYgKCFjdXJyZW50KSByZXR1cm47XHJcblxyXG4gICAgaWYgKGxhc3RDbGllbnRSZWYuY3VycmVudCAmJiBsYXN0Q2xpZW50UmVmLmN1cnJlbnQgIT09IGN1cnJlbnQpIHtcclxuICAgICAgc2V0U3RlcCgxKTtcclxuICAgICAgc2V0U2VsZWN0ZWRDb250YWN0cyhbXSk7XHJcbiAgICAgIHNldFZpc2l0VHlwZShkZWZhdWx0VmlzaXRUeXBlKTtcclxuICAgICAgc2V0VHJhbnNEYXRlKHRvZGF5U3RyaW5nKCkpO1xyXG4gICAgICBzZXREZXNjcmlwdGlvbihcIlwiKTtcclxuICAgICAgc2V0Q29tZW50YXJpb3MoXCJcIik7XHJcbiAgICAgIHNldEFudGVjZWRlbnRlcyhcIlwiKTtcclxuICAgICAgc2V0Q29uY2x1c2lvbmVzKFwiXCIpO1xyXG4gICAgICBzZXRTdGF0dXMoXCJcIik7XHJcbiAgICAgIHNldEJ1c3koZmFsc2UpO1xyXG4gICAgfVxyXG4gICAgbGFzdENsaWVudFJlZi5jdXJyZW50ID0gY3VycmVudDtcclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC1ob29rcy9leGhhdXN0aXZlLWRlcHNcclxuICB9LCBbc2VsZWN0ZWRDbGllbnQ/LnZhbHVlXSk7XHJcblxyXG4gIGNvbnN0IGNhbkdvTmV4dCA9ICEhc2VsZWN0ZWRDbGllbnQ7XHJcbiAgY29uc3QgY2FuQ3JlYXRlID1cclxuICAgICEhc2VsZWN0ZWRDbGllbnQgJiZcclxuICAgIFN0cmluZyh2aXNpdFR5cGUgfHwgXCJcIikudHJpbSgpICE9PSBcIlwiICYmXHJcbiAgICBTdHJpbmcodmlzaXRUeXBlKSAhPT0gXCIwXCIgJiZcclxuICAgIGRlc2NyaXB0aW9uLnRyaW0oKS5sZW5ndGggPiAwICYmXHJcbiAgICBjb21lbnRhcmlvcy50cmltKCkubGVuZ3RoID4gMDtcclxuXHJcbiAgY29uc3QgaGFzQWN0aXZlUHJvY2VzcyA9IHVzZU1lbW8oKCkgPT4ge1xyXG4gICAgaWYgKGJ1c3kpIHJldHVybiB0cnVlO1xyXG4gICAgaWYgKHN0ZXAgPiAxKSByZXR1cm4gdHJ1ZTtcclxuICAgIGlmIChzZWxlY3RlZENsaWVudCkgcmV0dXJuIHRydWU7XHJcbiAgICBpZiAoc2VsZWN0ZWRDb250YWN0cy5sZW5ndGggPiAwKSByZXR1cm4gdHJ1ZTtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIGRlc2NyaXB0aW9uLnRyaW0oKS5sZW5ndGggPiAwIHx8XHJcbiAgICAgIGNvbWVudGFyaW9zLnRyaW0oKS5sZW5ndGggPiAwIHx8XHJcbiAgICAgIGFudGVjZWRlbnRlcy50cmltKCkubGVuZ3RoID4gMCB8fFxyXG4gICAgICBjb25jbHVzaW9uZXMudHJpbSgpLmxlbmd0aCA+IDBcclxuICAgICk7XHJcbiAgfSwgW2FudGVjZWRlbnRlcywgYnVzeSwgY29tZW50YXJpb3MsIGNvbmNsdXNpb25lcywgZGVzY3JpcHRpb24sIHNlbGVjdGVkQ2xpZW50LCBzZWxlY3RlZENvbnRhY3RzLmxlbmd0aCwgc3RlcF0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgd2luZG93Ll9faW5kU2V0TmF2aWdhdGlvbkd1YXJkPy4oaGFzQWN0aXZlUHJvY2Vzcyk7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICB3aW5kb3cuX19pbmRDbGVhck5hdmlnYXRpb25HdWFyZD8uKCk7XHJcbiAgICB9O1xyXG4gIH0sIFtoYXNBY3RpdmVQcm9jZXNzXSk7XHJcblxyXG4gIGNvbnN0IHsgaGFuZGxlU3VibWl0IH0gPSB1c2VDcmVhdGVTdWJtaXQoe1xyXG4gICAgYnVzeSxcclxuICAgIG1vZGFsT3BlbjogbW9kYWwub3BlbixcclxuICAgIGNhbkNyZWF0ZVZpc2l0LFxyXG4gICAgY2FuUm9sbGJhY2tEZWxldGUsXHJcbiAgICBzZWxlY3RlZENsaWVudCxcclxuICAgIHNlbGVjdGVkQ29udGFjdHMsXHJcbiAgICB2aXNpdFR5cGUsXHJcbiAgICBkZWZhdWx0QXNpc3RlbnRlVGlwbyxcclxuICAgIGRlc2NyaXB0aW9uLFxyXG4gICAgdHJhbnNEYXRlLFxyXG4gICAgY29tZW50YXJpb3MsXHJcbiAgICBhbnRlY2VkZW50ZXMsXHJcbiAgICBjb25jbHVzaW9uZXMsXHJcbiAgICBzZXRCdXN5LFxyXG4gICAgc2V0U3RhdHVzLFxyXG4gICAgc2V0TW9kYWxFcnJvcixcclxuICAgIHNldFNob3dSZXF1aXJlZCxcclxuICAgIG9wZW5Db25maXJtLFxyXG4gICAgY2xvc2VDb25maXJtLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVUb3BiYXJQcmltYXJ5ID0gUmVhY3QudXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKCFjYW5DcmVhdGVWaXNpdCkge1xyXG4gICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmIChzdGVwID09PSAxICYmIGNhbkdvTmV4dCkgc2V0U3RlcCgyKTtcclxuICAgIGlmIChzdGVwID09PSAyKSBoYW5kbGVTdWJtaXQoKTtcclxuICB9LCBbY2FuQ3JlYXRlVmlzaXQsIGNhbkdvTmV4dCwgaGFuZGxlU3VibWl0LCBzdGVwXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZVRvcGJhckJhY2sgPSBSZWFjdC51c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBzZXRTdGVwKDEpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgdXNlVG9wYmFyKHN0ZXAsIGNhbkdvTmV4dCwgaGFuZGxlVG9wYmFyUHJpbWFyeSwgaGFuZGxlVG9wYmFyQmFjaywgYnVzeSwgY2FuQ3JlYXRlLCBjYW5DcmVhdGVWaXNpdCk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoc3RlcCA9PT0gMSkge1xyXG4gICAgICBzZXRTaG93UmVxdWlyZWQoZmFsc2UpO1xyXG4gICAgICBjbG9zZUNvbmZpcm0oKTtcclxuICAgIH1cclxuICB9LCBbc3RlcCwgY2xvc2VDb25maXJtXSk7XHJcblxyXG4gIGNvbnN0IHZpc2l0VHlwZUludmFsaWQgPSBzaG93UmVxdWlyZWQgJiYgKFN0cmluZyh2aXNpdFR5cGUgfHwgXCJcIikgPT09IFwiXCIgfHwgU3RyaW5nKHZpc2l0VHlwZSkgPT09IFwiMFwiKTtcclxuICBjb25zdCBkZXNjcmlwdGlvbkludmFsaWQgPSBzaG93UmVxdWlyZWQgJiYgZGVzY3JpcHRpb24udHJpbSgpLmxlbmd0aCA9PT0gMDtcclxuICBjb25zdCBjb21lbnRhcmlvc0ludmFsaWQgPSBzaG93UmVxdWlyZWQgJiYgY29tZW50YXJpb3MudHJpbSgpLmxlbmd0aCA9PT0gMDtcclxuICBjb25zdCBkZXNjcmlwdGlvbklucHV0Q2xhc3NOYW1lID0gY2xhc3NOYW1lcyhcclxuICAgIFwiZm9ybS1jb250cm9sXCIsXHJcbiAgICBkZXNjcmlwdGlvbkludmFsaWRcclxuICAgICAgPyBcImJvcmRlci1yb3NlLTQwMCBiZy1yb3NlLTUwIGZvY3VzOnJpbmctcm9zZS0yMDAgZm9jdXM6Ym9yZGVyLXJvc2UtNDAwXCJcclxuICAgICAgOiBcImJvcmRlci1zbGF0ZS0yMDAgZm9jdXM6cmluZy1wcmltYXJ5IGZvY3VzOmJvcmRlci1wcmltYXJ5XCJcclxuICApO1xyXG4gIGNvbnN0IGNvbWVudGFyaW9zQ2xhc3NOYW1lID0gY2xhc3NOYW1lcyhcclxuICAgIFwiZm9ybS1jb250cm9sIGN1cnNvci1wb2ludGVyXCIsXHJcbiAgICBjb21lbnRhcmlvc0ludmFsaWRcclxuICAgICAgPyBcImJvcmRlci1yb3NlLTQwMCBiZy1yb3NlLTUwIGZvY3VzOnJpbmctcm9zZS0yMDAgZm9jdXM6Ym9yZGVyLXJvc2UtNDAwXCJcclxuICAgICAgOiBcImJvcmRlci1zbGF0ZS0yMDAgZm9jdXM6cmluZy1wcmltYXJ5IGZvY3VzOmJvcmRlci1wcmltYXJ5XCJcclxuICApO1xyXG4gIGNvbnN0IGRlc2NyaXB0aW9uTGFiZWwgPSBpbmRUKFwiVmlzaXRzX0ZpZWxkX0Rlc2NyaXB0aW9uXCIsIFwiRGVzY3JpcHRpb25cIik7XHJcbiAgY29uc3QgY29tbWVudHNMYWJlbCA9IGluZFQoXCJWaXNpdHNfRmllbGRfQ29tbWVudHNcIiwgXCJDb21tZW50c1wiKTtcclxuICBjb25zdCBiYWNrZ3JvdW5kTGFiZWwgPSBpbmRUKFwiVmlzaXRzX0ZpZWxkX0JhY2tncm91bmRcIiwgXCJCYWNrZ3JvdW5kXCIpO1xyXG4gIGNvbnN0IGNvbmNsdXNpb25zTGFiZWwgPSBpbmRUKFwiVmlzaXRzX0ZpZWxkX0NvbmNsdXNpb25zXCIsIFwiQ29uY2x1c2lvbnNcIik7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNFwiPlxyXG4gICAgICA8Q29uZmlybU1vZGFsXHJcbiAgICAgICAgb3Blbj17bW9kYWwub3Blbn1cclxuICAgICAgICB0aXRsZT17bW9kYWwudGl0bGV9XHJcbiAgICAgICAgbWVzc2FnZT17bW9kYWwubWVzc2FnZX1cclxuICAgICAgICBjb25maXJtVGV4dD17bW9kYWxDb25maXJtVGV4dH1cclxuICAgICAgICBjYW5jZWxUZXh0PXttb2RhbENhbmNlbFRleHR9XHJcbiAgICAgICAgbG9hZGluZ1RleHQ9e21vZGFsTG9hZGluZ1RleHR9XHJcbiAgICAgICAgc2hvd0NhbmNlbD17bW9kYWwuc2hvd0NhbmNlbH1cclxuICAgICAgICBzaG93Q29uZmlybT17bW9kYWwuc2hvd0NvbmZpcm19XHJcbiAgICAgICAgYnVzeT17YnVzeX1cclxuICAgICAgICBlcnJvcj17bW9kYWxFcnJvcn1cclxuICAgICAgICBzdGF0dXM9e3N0YXR1c31cclxuICAgICAgICBvbkNvbmZpcm09e2hhbmRsZU1vZGFsQnV0dG9uQ29uZmlybX1cclxuICAgICAgICBvbkNhbmNlbD17Y2xvc2VDb25maXJtfVxyXG4gICAgICAvPlxyXG4gICAgICB7c3RlcCA9PT0gMSAmJiAoXHJcbiAgICAgICAgPENyZWF0ZVN0ZXBDbGllbnRTZWxlY3Rpb25cclxuICAgICAgICAgIHNlbGVjdGVkQ2xpZW50PXtzZWxlY3RlZENsaWVudH1cclxuICAgICAgICAgIHNlbGVjdGVkQ29udGFjdHM9e3NlbGVjdGVkQ29udGFjdHN9XHJcbiAgICAgICAgICBvbkNsaWVudFNlbGVjdGVkPXtzZXRTZWxlY3RlZENsaWVudH1cclxuICAgICAgICAgIG9uQ29udGFjdHNDaGFuZ2U9e3NldFNlbGVjdGVkQ29udGFjdHN9XHJcbiAgICAgICAgICBjbGllbnRMYWJlbD17aW5kVChcIlZpc2l0c19DcmVhdGVfU2VhcmNoQ2xpZW50XCIsIFwiU2VhcmNoIGNsaWVudFwiKX1cclxuICAgICAgICAgIGNsaWVudFBsYWNlaG9sZGVyPXtpbmRGb3JtYXQoXCJWaXNpdHNfQ3JlYXRlX0NsaWVudFBsYWNlaG9sZGVyXCIsIFwiVHlwZSBhdCBsZWFzdCB7MH0gY2hhcmFjdGVycy4uLlwiLCA0KX1cclxuICAgICAgICAgIHNlbGVjdGVkQ29udGFjdHNDb3VudFRleHQ9e2luZEZvcm1hdChcclxuICAgICAgICAgICAgXCJWaXNpdHNfQ3JlYXRlX1NlbGVjdGVkQ29udGFjdHNDb3VudFwiLFxyXG4gICAgICAgICAgICBcInswfSBzZWxlY3RlZCBjb250YWN0KHMpXCIsXHJcbiAgICAgICAgICAgIHNlbGVjdGVkQ29udGFjdHMubGVuZ3RoXHJcbiAgICAgICAgICApfVxyXG4gICAgICAgIC8+XHJcbiAgICAgICl9XHJcblxyXG4gICAgICB7c3RlcCA9PT0gMiAmJiAoXHJcbiAgICAgICAgPENyZWF0ZVN0ZXBWaXNpdERldGFpbHNcclxuICAgICAgICAgIHRpdGxlPXtpbmRUKFwiVmlzaXRzX0NyZWF0ZV9WaXNpdERhdGFfVGl0bGVcIiwgXCJWaXNpdCBkZXRhaWxzXCIpfVxyXG4gICAgICAgICAgZGF0ZUxhYmVsPXtpbmRUKFwiVmlzaXRzX0RldGFpbF9EYXRlX0xhYmVsXCIsIFwiRGF0ZVwiKX1cclxuICAgICAgICAgIHRyYW5zRGF0ZT17dHJhbnNEYXRlfVxyXG4gICAgICAgICAgb25UcmFuc0RhdGVDaGFuZ2U9e3NldFRyYW5zRGF0ZX1cclxuICAgICAgICAgIHZpc2l0VHlwZUxhYmVsPXtpbmRUKFwiVmlzaXRzX0RldGFpbF9WaXNpdFR5cGVfTGFiZWxcIiwgXCJWaXNpdCB0eXBlXCIpfVxyXG4gICAgICAgICAgdmlzaXRUeXBlcz17dmlzaXRUeXBlc31cclxuICAgICAgICAgIHZpc2l0VHlwZT17dmlzaXRUeXBlfVxyXG4gICAgICAgICAgb25WaXNpdFR5cGVDaGFuZ2U9e3NldFZpc2l0VHlwZX1cclxuICAgICAgICAgIHZpc2l0VHlwZVBsYWNlaG9sZGVyPXtpbmRUKFwiVmlzaXRzX0RldGFpbF9WaXNpdFR5cGVfUGxhY2Vob2xkZXJcIiwgXCJTZWxlY3QgdHlwZVwiKX1cclxuICAgICAgICAgIHZpc2l0VHlwZUludmFsaWQ9e3Zpc2l0VHlwZUludmFsaWR9XHJcbiAgICAgICAgICBkZXNjcmlwdGlvbkxhYmVsPXtkZXNjcmlwdGlvbkxhYmVsfVxyXG4gICAgICAgICAgZGVzY3JpcHRpb25WYWx1ZT17ZGVzY3JpcHRpb259XHJcbiAgICAgICAgICBkZXNjcmlwdGlvbkNsYXNzTmFtZT17ZGVzY3JpcHRpb25JbnB1dENsYXNzTmFtZX1cclxuICAgICAgICAgIG9uRGVzY3JpcHRpb25DaGFuZ2U9e3NldERlc2NyaXB0aW9ufVxyXG4gICAgICAgICAgdGFwRmllbGRzPXtbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBpZDogXCJjb21lbnRhcmlvc1wiLFxyXG4gICAgICAgICAgICAgIGxhYmVsOiBjb21tZW50c0xhYmVsLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiBjb21lbnRhcmlvcyxcclxuICAgICAgICAgICAgICBjbGFzc05hbWU6IGNvbWVudGFyaW9zQ2xhc3NOYW1lLFxyXG4gICAgICAgICAgICAgIHBvaW50ZXJCaW5kaW5nczogY29tZW50YXJpb3NUYXAsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBpZDogXCJhbnRlY2VkZW50ZXNcIixcclxuICAgICAgICAgICAgICBsYWJlbDogYmFja2dyb3VuZExhYmVsLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiBhbnRlY2VkZW50ZXMsXHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcImZvcm0tY29udHJvbCBjdXJzb3ItcG9pbnRlclwiLFxyXG4gICAgICAgICAgICAgIHBvaW50ZXJCaW5kaW5nczogYW50ZWNlZGVudGVzVGFwLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgaWQ6IFwiY29uY2x1c2lvbmVzXCIsXHJcbiAgICAgICAgICAgICAgbGFiZWw6IGNvbmNsdXNpb25zTGFiZWwsXHJcbiAgICAgICAgICAgICAgdmFsdWU6IGNvbmNsdXNpb25lcyxcclxuICAgICAgICAgICAgICBjbGFzc05hbWU6IFwiZm9ybS1jb250cm9sIGN1cnNvci1wb2ludGVyXCIsXHJcbiAgICAgICAgICAgICAgcG9pbnRlckJpbmRpbmdzOiBjb25jbHVzaW9uZXNUYXAsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICBdfVxyXG4gICAgICAgICAgc3RhdHVzPXtzdGF0dXN9XHJcbiAgICAgICAgLz5cclxuICAgICAgKX1cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn1cclxuXHJcbi8vIENyZWF0ZSBmbG93IFVJIHdyYXBwZWQgYnkgdGhlIGVycm9yIGJvdW5kYXJ5LlxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDcmVhdGVGb3JtKCkge1xyXG4gIHJldHVybiAoXHJcbiAgICA8QXBwRXJyb3JCb3VuZGFyeSBmYWxsYmFja01lc3NhZ2U9e2luZFQoXCJWaXNpdHNfQ3JlYXRlX0Vycm9yQm91bmRhcnlcIiwgXCJBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSByZW5kZXJpbmcgdGhlIHZpc2l0cyBwYWdlLiBSZWxvYWQgYW5kIHRyeSBhZ2Fpbi5cIil9PlxyXG4gICAgICA8VmlzaXRhc0FwcCAvPlxyXG4gICAgPC9BcHBFcnJvckJvdW5kYXJ5PlxyXG4gICk7XHJcbn1cclxuIiwgImltcG9ydCB7IHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuXHJcbmV4cG9ydCBjb25zdCB1c2VUb3BiYXIgPSAoXHJcbiAgc3RlcDogbnVtYmVyLFxyXG4gIGNhbkdvTmV4dDogYm9vbGVhbixcclxuICBvbk5leHQ6ICgpID0+IHZvaWQsXHJcbiAgb25QcmV2OiAoKSA9PiB2b2lkLFxyXG4gIGJ1c3kgPSBmYWxzZSxcclxuICBjYW5TdWJtaXRTdGVwMiA9IHRydWUsXHJcbiAgY2FuQWNjZXNzID0gdHJ1ZVxyXG4pID0+IHtcclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3QgZm9yd2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2xvYmFsRm9yd2FyZEJ0blwiKSBhcyBIVE1MQnV0dG9uRWxlbWVudCB8IG51bGw7XHJcbiAgICBjb25zdCBiYWNrID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnbG9iYWxCYWNrQnRuXCIpIGFzIEhUTUxCdXR0b25FbGVtZW50IHwgbnVsbDtcclxuICAgIGNvbnN0IGZvcndhcmRJY29uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnbG9iYWxGb3J3YXJkSWNvblwiKTtcclxuICAgIGNvbnN0IGNyZWF0ZUljb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdsb2JhbENyZWF0ZUljb25cIik7XHJcblxyXG4gICAgaWYgKGZvcndhcmQpIHtcclxuICAgICAgY29uc3QgaXNTdGVwMiA9IHN0ZXAgPT09IDI7XHJcbiAgICAgIGNvbnN0IHNob3dGb3J3YXJkID0gY2FuQWNjZXNzICYmIChpc1N0ZXAyIHx8IChzdGVwID09PSAxICYmIGNhbkdvTmV4dCkpO1xyXG4gICAgICBmb3J3YXJkLnN0eWxlLnZpc2liaWxpdHkgPSBzaG93Rm9yd2FyZCA/IFwidmlzaWJsZVwiIDogXCJoaWRkZW5cIjtcclxuICAgICAgZm9yd2FyZC5kaXNhYmxlZCA9ICFzaG93Rm9yd2FyZCB8fCBidXN5O1xyXG4gICAgICBmb3J3YXJkLm9uY2xpY2sgPSBzaG93Rm9yd2FyZCA/ICgpID0+IG9uTmV4dCgpIDogbnVsbDtcclxuICAgICAgZm9yd2FyZC5zZXRBdHRyaWJ1dGUoXHJcbiAgICAgICAgXCJhcmlhLWxhYmVsXCIsXHJcbiAgICAgICAgaXNTdGVwMiA/IGluZFQoXCJDb21tb25fQ3JlYXRlXCIsIFwiQ3JlYXRlXCIpIDogaW5kVChcIkNvbW1vbl9OZXh0XCIsIFwiTmV4dFwiKVxyXG4gICAgICApO1xyXG4gICAgICBmb3J3YXJkLnNldEF0dHJpYnV0ZShcImFyaWEtZGlzYWJsZWRcIiwgaXNTdGVwMiAmJiAhY2FuU3VibWl0U3RlcDIgPyBcInRydWVcIiA6IFwiZmFsc2VcIik7XHJcbiAgICAgIGZvcndhcmQuY2xhc3NMaXN0LnRvZ2dsZShcIm9wYWNpdHktNTBcIiwgaXNTdGVwMiAmJiAhY2FuU3VibWl0U3RlcDIpO1xyXG4gICAgICBmb3J3YXJkLmNsYXNzTGlzdC50b2dnbGUoXCJjdXJzb3Itbm90LWFsbG93ZWRcIiwgaXNTdGVwMiAmJiAhY2FuU3VibWl0U3RlcDIpO1xyXG5cclxuICAgICAgaWYgKGZvcndhcmRJY29uICYmIGNyZWF0ZUljb24pIHtcclxuICAgICAgICBpZiAoaXNTdGVwMikge1xyXG4gICAgICAgICAgZm9yd2FyZEljb24uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcclxuICAgICAgICAgIGNyZWF0ZUljb24uY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZm9yd2FyZEljb24uY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcclxuICAgICAgICAgIGNyZWF0ZUljb24uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChiYWNrKSB7XHJcbiAgICAgIGNvbnN0IHNob3dCYWNrID0gY2FuQWNjZXNzICYmIHN0ZXAgPT09IDI7XHJcbiAgICAgIGJhY2suc3R5bGUudmlzaWJpbGl0eSA9IHNob3dCYWNrID8gXCJ2aXNpYmxlXCIgOiBcImhpZGRlblwiO1xyXG4gICAgICBiYWNrLmRpc2FibGVkID0gIXNob3dCYWNrIHx8IGJ1c3k7XHJcbiAgICAgIGJhY2sub25jbGljayA9IHNob3dCYWNrID8gKCkgPT4gb25QcmV2KCkgOiBudWxsO1xyXG4gICAgfVxyXG4gIH0sIFtzdGVwLCBjYW5Hb05leHQsIG9uTmV4dCwgb25QcmV2LCBidXN5LCBjYW5TdWJtaXRTdGVwMiwgY2FuQWNjZXNzXSk7XHJcbn07XHJcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VSZWYgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgc2hvd0dsb2JhbFNwaW5uZXIsIGhpZGVHbG9iYWxTcGlubmVyIH0gZnJvbSBcIi4uL3V0aWxzL2dsb2JhbFNwaW5uZXIudHNcIjtcclxuaW1wb3J0IHtcclxuICBDUkVBVEVfRlJFU0hfUEFSQU0sXHJcbiAgVklTSVRfRFJBRlRfS0VZLFxyXG4gIENPTlRBQ1RTX1NUT1JBR0VfS0VZLFxyXG4gIENPTlRBQ1RTX1NFTEVDVElPTl9LRVksXHJcbiAgY2xlYXJDcmVhdGVTZWxlY3Rpb25DYWNoZSxcclxuICBzdHJpcEZyZXNoUGFyYW0sXHJcbn0gZnJvbSBcIi4uL3V0aWxzL3Zpc2l0YXNTdG9yYWdlLnRzXCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgeyBnZXRTZXNzaW9uSnNvbldpdGhFeHBpcnksIGdldFNlc3Npb25WYWx1ZVdpdGhFeHBpcnksIHNldFNlc3Npb25Kc29uV2l0aEV4cGlyeSB9IGZyb20gXCIuLi91dGlscy9zZXNzaW9uRXhwaXJ5LnRzXCI7XHJcblxyXG5jb25zdCBDUkVBVEVfRFJBRlRfVFRMX01TID0gMjQgKiA2MCAqIDYwICogMTAwMDtcclxuXHJcbnR5cGUgRHJhZnRTbmFwc2hvdCA9IHtcclxuICBzZWxlY3RlZENsaWVudDogYW55O1xyXG4gIHNlbGVjdGVkQ29udGFjdHM6IGFueVtdO1xyXG4gIHZpc2l0VHlwZTogc3RyaW5nO1xyXG4gIHRyYW5zRGF0ZTogc3RyaW5nO1xyXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgY29tZW50YXJpb3M6IHN0cmluZztcclxuICBhbnRlY2VkZW50ZXM6IHN0cmluZztcclxuICBjb25jbHVzaW9uZXM6IHN0cmluZztcclxuICBzdGVwOiBudW1iZXI7XHJcbn07XHJcblxyXG50eXBlIFVzZUNyZWF0ZURyYWZ0QXJncyA9IHtcclxuICBkcmFmdFNuYXBzaG90OiBEcmFmdFNuYXBzaG90O1xyXG4gIHNldFNlbGVjdGVkQ2xpZW50OiAodmFsdWU6IGFueSkgPT4gdm9pZDtcclxuICBzZXRTZWxlY3RlZENvbnRhY3RzOiAodmFsdWU6IGFueVtdKSA9PiB2b2lkO1xyXG4gIHNldFZpc2l0VHlwZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgc2V0VHJhbnNEYXRlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBzZXREZXNjcmlwdGlvbjogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgc2V0Q29tZW50YXJpb3M6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIHNldEFudGVjZWRlbnRlczogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgc2V0Q29uY2x1c2lvbmVzOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBzZXRTdGVwOiAodmFsdWU6IG51bWJlcikgPT4gdm9pZDtcclxufTtcclxuXHJcbi8vIEhhbmRsZXMgdmlzaXQtY3JlYXRlIGRyYWZ0IHNhdmUvcmVzdG9yZSBsaWZlY3ljbGUuXHJcbmV4cG9ydCBjb25zdCB1c2VDcmVhdGVEcmFmdCA9ICh7XHJcbiAgZHJhZnRTbmFwc2hvdCxcclxuICBzZXRTZWxlY3RlZENsaWVudCxcclxuICBzZXRTZWxlY3RlZENvbnRhY3RzLFxyXG4gIHNldFZpc2l0VHlwZSxcclxuICBzZXRUcmFuc0RhdGUsXHJcbiAgc2V0RGVzY3JpcHRpb24sXHJcbiAgc2V0Q29tZW50YXJpb3MsXHJcbiAgc2V0QW50ZWNlZGVudGVzLFxyXG4gIHNldENvbmNsdXNpb25lcyxcclxuICBzZXRTdGVwLFxyXG59OiBVc2VDcmVhdGVEcmFmdEFyZ3MpID0+IHtcclxuICBjb25zdCBkcmFmdFJlc3RvcmVkUmVmID0gdXNlUmVmKGZhbHNlKTtcclxuICBjb25zdCBkcmFmdFBlcnNpc3RUaW1lclJlZiA9IHVzZVJlZjxudW1iZXIgfCBudWxsPihudWxsKTtcclxuXHJcbiAgY29uc3QgcGVyc2lzdERyYWZ0U25hcHNob3QgPSB1c2VDYWxsYmFjaygoZHJhZnQ6IERyYWZ0U25hcHNob3QpID0+IHtcclxuICAgIHNldFNlc3Npb25Kc29uV2l0aEV4cGlyeShWSVNJVF9EUkFGVF9LRVksIGRyYWZ0LCBDUkVBVEVfRFJBRlRfVFRMX01TKTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IHBlcnNpc3REcmFmdE5vdyA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIHBlcnNpc3REcmFmdFNuYXBzaG90KGRyYWZ0U25hcHNob3QpO1xyXG4gIH0sIFtkcmFmdFNuYXBzaG90LCBwZXJzaXN0RHJhZnRTbmFwc2hvdF0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFkcmFmdFJlc3RvcmVkUmVmLmN1cnJlbnQpIHJldHVybjtcclxuXHJcbiAgICBpZiAoZHJhZnRQZXJzaXN0VGltZXJSZWYuY3VycmVudCkge1xyXG4gICAgICBjbGVhclRpbWVvdXQoZHJhZnRQZXJzaXN0VGltZXJSZWYuY3VycmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhZnRQZXJzaXN0VGltZXJSZWYuY3VycmVudCA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgZHJhZnRQZXJzaXN0VGltZXJSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgIHBlcnNpc3REcmFmdFNuYXBzaG90KGRyYWZ0U25hcHNob3QpO1xyXG4gICAgfSwgMTgwKTtcclxuXHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBpZiAoZHJhZnRQZXJzaXN0VGltZXJSZWYuY3VycmVudCkge1xyXG4gICAgICAgIGNsZWFyVGltZW91dChkcmFmdFBlcnNpc3RUaW1lclJlZi5jdXJyZW50KTtcclxuICAgICAgICBkcmFmdFBlcnNpc3RUaW1lclJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9LCBbZHJhZnRTbmFwc2hvdCwgcGVyc2lzdERyYWZ0U25hcHNob3RdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGxldCBmcmVzaExvYWQgPSBmYWxzZTtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHVybCA9IG5ldyBVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xyXG4gICAgICBmcmVzaExvYWQgPSB1cmwuc2VhcmNoUGFyYW1zLmhhcyhDUkVBVEVfRlJFU0hfUEFSQU0pO1xyXG4gICAgfSBjYXRjaCB7XHJcbiAgICAgIGZyZXNoTG9hZCA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChmcmVzaExvYWQpIHtcclxuICAgICAgY2xlYXJDcmVhdGVTZWxlY3Rpb25DYWNoZSgpO1xyXG4gICAgICBzdHJpcEZyZXNoUGFyYW0oKTtcclxuICAgICAgZHJhZnRSZXN0b3JlZFJlZi5jdXJyZW50ID0gdHJ1ZTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBzaG91bGRTaG93ID0gZmFsc2U7XHJcbiAgICB0cnkge1xyXG4gICAgICBzaG91bGRTaG93ID0gISEoXHJcbiAgICAgICAgZ2V0U2Vzc2lvblZhbHVlV2l0aEV4cGlyeShWSVNJVF9EUkFGVF9LRVkpIHx8XHJcbiAgICAgICAgc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShDT05UQUNUU19TVE9SQUdFX0tFWSkgfHxcclxuICAgICAgICBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKENPTlRBQ1RTX1NFTEVDVElPTl9LRVkpXHJcbiAgICAgICk7XHJcbiAgICB9IGNhdGNoIHtcclxuICAgICAgLy8gSWdub3JlIHN0b3JhZ2UgYWNjZXNzIGVycm9ycy5cclxuICAgIH1cclxuICAgIGlmIChzaG91bGRTaG93KSB7XHJcbiAgICAgIHNob3dHbG9iYWxTcGlubmVyKGluZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIikpO1xyXG4gICAgfVxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgZHJhZnQgPSBnZXRTZXNzaW9uSnNvbldpdGhFeHBpcnk8RHJhZnRTbmFwc2hvdD4oVklTSVRfRFJBRlRfS0VZKTtcclxuICAgICAgaWYgKGRyYWZ0Py5zZWxlY3RlZENsaWVudD8udmFsdWUpIHNldFNlbGVjdGVkQ2xpZW50KGRyYWZ0LnNlbGVjdGVkQ2xpZW50KTtcclxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZHJhZnQ/LnNlbGVjdGVkQ29udGFjdHMpKSBzZXRTZWxlY3RlZENvbnRhY3RzKGRyYWZ0LnNlbGVjdGVkQ29udGFjdHMpO1xyXG4gICAgICBpZiAoZHJhZnQ/LnZpc2l0VHlwZSAhPT0gdW5kZWZpbmVkKSBzZXRWaXNpdFR5cGUoZHJhZnQudmlzaXRUeXBlKTtcclxuICAgICAgaWYgKGRyYWZ0Py50cmFuc0RhdGUpIHNldFRyYW5zRGF0ZShkcmFmdC50cmFuc0RhdGUpO1xyXG4gICAgICBpZiAoZHJhZnQ/LmRlc2NyaXB0aW9uICE9PSB1bmRlZmluZWQpIHNldERlc2NyaXB0aW9uKGRyYWZ0LmRlc2NyaXB0aW9uKTtcclxuICAgICAgaWYgKGRyYWZ0Py5jb21lbnRhcmlvcyAhPT0gdW5kZWZpbmVkKSBzZXRDb21lbnRhcmlvcyhkcmFmdC5jb21lbnRhcmlvcyk7XHJcbiAgICAgIGlmIChkcmFmdD8uYW50ZWNlZGVudGVzICE9PSB1bmRlZmluZWQpIHNldEFudGVjZWRlbnRlcyhkcmFmdC5hbnRlY2VkZW50ZXMpO1xyXG4gICAgICBpZiAoZHJhZnQ/LmNvbmNsdXNpb25lcyAhPT0gdW5kZWZpbmVkKSBzZXRDb25jbHVzaW9uZXMoZHJhZnQuY29uY2x1c2lvbmVzKTtcclxuICAgICAgaWYgKGRyYWZ0Py5zdGVwID09PSAyKSBzZXRTdGVwKDIpO1xyXG4gICAgfSBjYXRjaCB7XHJcbiAgICAgIC8vIElnbm9yZSBtYWxmb3JtZWQgZHJhZnQgcGF5bG9hZHMuXHJcbiAgICB9IGZpbmFsbHkge1xyXG4gICAgICBpZiAoc2hvdWxkU2hvdykge1xyXG4gICAgICAgIGhpZGVHbG9iYWxTcGlubmVyKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGRyYWZ0UmVzdG9yZWRSZWYuY3VycmVudCA9IHRydWU7XHJcbiAgfSwgW1xyXG4gICAgc2V0QW50ZWNlZGVudGVzLFxyXG4gICAgc2V0Q29tZW50YXJpb3MsXHJcbiAgICBzZXRDb25jbHVzaW9uZXMsXHJcbiAgICBzZXREZXNjcmlwdGlvbixcclxuICAgIHNldFNlbGVjdGVkQ2xpZW50LFxyXG4gICAgc2V0U2VsZWN0ZWRDb250YWN0cyxcclxuICAgIHNldFN0ZXAsXHJcbiAgICBzZXRUcmFuc0RhdGUsXHJcbiAgICBzZXRWaXNpdFR5cGUsXHJcbiAgXSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBwZXJzaXN0RHJhZnROb3csXHJcbiAgfTtcclxufTtcclxuIiwgImV4cG9ydCBjb25zdCBzaG93R2xvYmFsU3Bpbm5lciA9IChtZXNzYWdlPzogc3RyaW5nKSA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiB3aW5kb3cuX19pbmRTaG93R2xvYmFsU3Bpbm5lciA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgIHdpbmRvdy5fX2luZFNob3dHbG9iYWxTcGlubmVyKG1lc3NhZ2UpO1xyXG4gICAgfVxyXG4gIH0gY2F0Y2gge1xyXG4gICAgLy8gaWdub3JlXHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGhpZGVHbG9iYWxTcGlubmVyID0gKCkgPT4ge1xyXG4gIHRyeSB7XHJcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2Ygd2luZG93Ll9faW5kSGlkZUdsb2JhbFNwaW5uZXIgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICB3aW5kb3cuX19pbmRIaWRlR2xvYmFsU3Bpbm5lcigpO1xyXG4gICAgfVxyXG4gIH0gY2F0Y2gge1xyXG4gICAgLy8gaWdub3JlXHJcbiAgfVxyXG59O1xyXG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2sgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgZmV0Y2hKc29uIH0gZnJvbSBcIi4uL3NlcnZpY2VzL2FwaVNlcnZpY2UudHNcIjtcclxuaW1wb3J0IHsgaW5kRXh0cmFjdElkLCBpbmRFeHRyYWN0U2lnbmVkSWQgfSBmcm9tIFwiLi4vdXRpbHMvaW5kSWRzLnRzXCI7XHJcbmltcG9ydCB7IGluZEZvcm1hdCwgaW5kVCB9IGZyb20gXCIuLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB7IHNob3dQZXJtaXNzaW9uTW9kYWwgfSBmcm9tIFwiLi4vdXRpbHMvcGVybWlzc2lvbnMudHNcIjtcclxuaW1wb3J0IHsgZmxhc2hBY3Rpb25NYXJrLCBzZXRIaXN0b3J5RmlsdGVyRm9yRGF0ZSB9IGZyb20gXCIuLi91dGlscy92aXNpdGFzSGlzdG9yeS50c1wiO1xyXG5pbXBvcnQgeyBWSVNJVF9EUkFGVF9LRVkgfSBmcm9tIFwiLi4vdXRpbHMvdmlzaXRhc1N0b3JhZ2UudHNcIjtcclxuaW1wb3J0IHsgd2FpdCB9IGZyb20gXCIuLi91dGlscy93YWl0LnRzXCI7XHJcblxyXG50eXBlIENvbnRhY3RPcHRpb24gPSB7XHJcbiAgdmFsdWU6IHN0cmluZztcclxuICB0ZXh0OiBzdHJpbmc7XHJcbn07XHJcblxyXG50eXBlIExlZ2FjeUNvbW1hbmRSZXNwb25zZSA9IHtcclxuICBzdWNjZXNzPzogYm9vbGVhbjtcclxuICBtZXNzYWdlPzogc3RyaW5nO1xyXG4gIGRhdGE/OiB1bmtub3duO1xyXG4gIFN1Y2Nlc3M/OiBib29sZWFuO1xyXG4gIE1lc3NhZ2U/OiBzdHJpbmc7XHJcbiAgRGF0YT86IHVua25vd247XHJcbn07XHJcblxyXG5jb25zdCBnZXRMZWdhY3lSZXNwb25zZVN1Y2Nlc3MgPSAocmVzcG9uc2U6IExlZ2FjeUNvbW1hbmRSZXNwb25zZSk6IGJvb2xlYW4gPT4ge1xyXG4gIHJldHVybiByZXNwb25zZS5zdWNjZXNzID09PSB0cnVlIHx8IHJlc3BvbnNlLlN1Y2Nlc3MgPT09IHRydWU7XHJcbn07XHJcblxyXG5jb25zdCBnZXRMZWdhY3lSZXNwb25zZU1lc3NhZ2UgPSAocmVzcG9uc2U6IExlZ2FjeUNvbW1hbmRSZXNwb25zZSk6IHN0cmluZyA9PiB7XHJcbiAgY29uc3QgcmF3TWVzc2FnZSA9IHJlc3BvbnNlLm1lc3NhZ2UgPz8gcmVzcG9uc2UuTWVzc2FnZTtcclxuICByZXR1cm4gdHlwZW9mIHJhd01lc3NhZ2UgPT09IFwic3RyaW5nXCIgPyByYXdNZXNzYWdlLnRyaW0oKSA6IFwiXCI7XHJcbn07XHJcblxyXG5jb25zdCBnZXRMZWdhY3lSZXNwb25zZURhdGEgPSAocmVzcG9uc2U6IExlZ2FjeUNvbW1hbmRSZXNwb25zZSk6IHVua25vd24gPT4ge1xyXG4gIHJldHVybiByZXNwb25zZS5kYXRhID8/IHJlc3BvbnNlLkRhdGE7XHJcbn07XHJcblxyXG50eXBlIFVzZUNyZWF0ZVN1Ym1pdEFyZ3MgPSB7XHJcbiAgYnVzeTogYm9vbGVhbjtcclxuICBtb2RhbE9wZW46IGJvb2xlYW47XHJcbiAgY2FuQ3JlYXRlVmlzaXQ6IGJvb2xlYW47XHJcbiAgY2FuUm9sbGJhY2tEZWxldGU6IGJvb2xlYW47XHJcbiAgc2VsZWN0ZWRDbGllbnQ6IHsgdmFsdWU6IHN0cmluZyB9IHwgbnVsbDtcclxuICBzZWxlY3RlZENvbnRhY3RzOiBDb250YWN0T3B0aW9uW107XHJcbiAgdmlzaXRUeXBlOiBzdHJpbmc7XHJcbiAgZGVmYXVsdEFzaXN0ZW50ZVRpcG86IHN0cmluZztcclxuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xyXG4gIHRyYW5zRGF0ZTogc3RyaW5nO1xyXG4gIGNvbWVudGFyaW9zOiBzdHJpbmc7XHJcbiAgYW50ZWNlZGVudGVzOiBzdHJpbmc7XHJcbiAgY29uY2x1c2lvbmVzOiBzdHJpbmc7XHJcbiAgc2V0QnVzeTogKHZhbHVlOiBib29sZWFuKSA9PiB2b2lkO1xyXG4gIHNldFN0YXR1czogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgc2V0TW9kYWxFcnJvcjogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgc2V0U2hvd1JlcXVpcmVkOiAodmFsdWU6IGJvb2xlYW4pID0+IHZvaWQ7XHJcbiAgb3BlbkNvbmZpcm06IChvcHRzOiB7XHJcbiAgICB0aXRsZTogc3RyaW5nO1xyXG4gICAgbWVzc2FnZTogc3RyaW5nO1xyXG4gICAgY29uZmlybVRleHQ/OiBzdHJpbmc7XHJcbiAgICBvbkNvbmZpcm0/OiAoKSA9PiBQcm9taXNlPGJvb2xlYW4gfCB2b2lkPiB8IGJvb2xlYW4gfCB2b2lkO1xyXG4gIH0pID0+IHZvaWQ7XHJcbiAgY2xvc2VDb25maXJtOiAoKSA9PiB2b2lkO1xyXG59O1xyXG5cclxuLy8gT3ducyBjcmVhdGUvY29uZmlybSBmbG93IHNvIGZvcm0gY29tcG9uZW50IHN0YXlzIGZvY3VzZWQgb24gVUkgZmllbGRzLlxyXG5leHBvcnQgY29uc3QgdXNlQ3JlYXRlU3VibWl0ID0gKHtcclxuICBidXN5LFxyXG4gIG1vZGFsT3BlbixcclxuICBjYW5DcmVhdGVWaXNpdCxcclxuICBjYW5Sb2xsYmFja0RlbGV0ZSxcclxuICBzZWxlY3RlZENsaWVudCxcclxuICBzZWxlY3RlZENvbnRhY3RzLFxyXG4gIHZpc2l0VHlwZSxcclxuICBkZWZhdWx0QXNpc3RlbnRlVGlwbyxcclxuICBkZXNjcmlwdGlvbixcclxuICB0cmFuc0RhdGUsXHJcbiAgY29tZW50YXJpb3MsXHJcbiAgYW50ZWNlZGVudGVzLFxyXG4gIGNvbmNsdXNpb25lcyxcclxuICBzZXRCdXN5LFxyXG4gIHNldFN0YXR1cyxcclxuICBzZXRNb2RhbEVycm9yLFxyXG4gIHNldFNob3dSZXF1aXJlZCxcclxuICBvcGVuQ29uZmlybSxcclxuICBjbG9zZUNvbmZpcm0sXHJcbn06IFVzZUNyZWF0ZVN1Ym1pdEFyZ3MpID0+IHtcclxuICBjb25zdCBkb0NyZWF0ZSA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcclxuICAgIGlmIChidXN5KSByZXR1cm4gZmFsc2U7XHJcbiAgICBpZiAoIWNhbkNyZWF0ZVZpc2l0KSB7XHJcbiAgICAgIHNob3dQZXJtaXNzaW9uTW9kYWwoKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgc2V0TW9kYWxFcnJvcihcIlwiKTtcclxuICAgIGlmICghc2VsZWN0ZWRDbGllbnQpIHtcclxuICAgICAgc2V0U3RhdHVzKGluZFQoXCJWaXNpdHNfQ3JlYXRlX1NlbGVjdENsaWVudFJlcXVpcmVkXCIsIFwiU2VsZWN0IGEgY2xpZW50LlwiKSk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGlmIChTdHJpbmcodmlzaXRUeXBlIHx8IFwiXCIpID09PSBcIlwiIHx8IFN0cmluZyh2aXNpdFR5cGUpID09PSBcIjBcIiB8fCAhZGVzY3JpcHRpb24udHJpbSgpIHx8ICFjb21lbnRhcmlvcy50cmltKCkpIHtcclxuICAgICAgc2V0U2hvd1JlcXVpcmVkKHRydWUpO1xyXG4gICAgICBzZXRTdGF0dXMoaW5kVChcIlZpc2l0c19DcmVhdGVfQ29tcGxldGVSZXF1aXJlZFwiLCBcIkNvbXBsZXRlIHJlcXVpcmVkIGZpZWxkcy5cIikpO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBzZXRCdXN5KHRydWUpO1xyXG4gICAgc2V0U3RhdHVzKGluZFQoXCJWaXNpdHNfQ3JlYXRlX0NyZWF0aW5nQWN0aXZpdHlcIiwgXCJDcmVhdGluZyBhY3Rpdml0eS4uLlwiKSk7XHJcblxyXG4gICAgbGV0IGNyZWF0ZWRSZWNJZCA9IFwiXCI7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBwYXlsb2FkQWN0aXZpdHkgPSB7XHJcbiAgICAgICAgYWNjb3VudE51bTogc2VsZWN0ZWRDbGllbnQudmFsdWUsXHJcbiAgICAgICAgdmlzaXRUeXBlLFxyXG4gICAgICAgIGRlc2NyaXB0aW9uLFxyXG4gICAgICAgIHRyYW5zRGF0ZSxcclxuICAgICAgICBjb21lbnRhcmlvcyxcclxuICAgICAgICBhbnRlY2VkZW50ZXMsXHJcbiAgICAgICAgY29uY2x1c2lvbmVzLFxyXG4gICAgICB9O1xyXG5cclxuICAgICAgY29uc3QgcmVzQWN0ID0gYXdhaXQgZmV0Y2hKc29uPExlZ2FjeUNvbW1hbmRSZXNwb25zZT4oXCIvVmlzaXRhcy9DcmVhdGVBY3Rpdml0eVwiLCB7XHJcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXHJcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGF5bG9hZEFjdGl2aXR5KSxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpZiAoIWdldExlZ2FjeVJlc3BvbnNlU3VjY2VzcyhyZXNBY3QpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGdldExlZ2FjeVJlc3BvbnNlTWVzc2FnZShyZXNBY3QpIHx8IGluZFQoXCJWaXNpdHNfQ3JlYXRlX0NyZWF0ZUFjdGl2aXR5RmFpbGVkXCIsIFwiRmFpbGVkIHRvIGNyZWF0ZSBhY3Rpdml0eS5cIikpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCByZWNJZEFjdGl2aWRhZCA9XHJcbiAgICAgICAgaW5kRXh0cmFjdFNpZ25lZElkKGdldExlZ2FjeVJlc3BvbnNlRGF0YShyZXNBY3QpKSB8fFxyXG4gICAgICAgIGluZEV4dHJhY3RTaWduZWRJZChnZXRMZWdhY3lSZXNwb25zZU1lc3NhZ2UocmVzQWN0KSkgfHxcclxuICAgICAgICBpbmRFeHRyYWN0U2lnbmVkSWQoaW5kRXh0cmFjdElkKGdldExlZ2FjeVJlc3BvbnNlRGF0YShyZXNBY3QpKSB8fCBpbmRFeHRyYWN0SWQoZ2V0TGVnYWN5UmVzcG9uc2VNZXNzYWdlKHJlc0FjdCkpKTtcclxuICAgICAgaWYgKCFyZWNJZEFjdGl2aWRhZCkgdGhyb3cgbmV3IEVycm9yKGluZFQoXCJWaXNpdHNfQ3JlYXRlX0NyZWF0ZUFjdGl2aXR5RmFpbGVkXCIsIFwiRmFpbGVkIHRvIGNyZWF0ZSBhY3Rpdml0eS5cIikpO1xyXG4gICAgICBjcmVhdGVkUmVjSWQgPSBTdHJpbmcocmVjSWRBY3RpdmlkYWQpO1xyXG5cclxuICAgICAgaWYgKHNlbGVjdGVkQ29udGFjdHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIGNvbnN0IGFzc2lzdGFudEJhdGNoU2l6ZSA9IDQ7XHJcbiAgICAgICAgY29uc3QgY3JlYXRlQXNzaXN0YW50ID0gYXN5bmMgKGNvbnRhY3Q6IENvbnRhY3RPcHRpb24pID0+IHtcclxuICAgICAgICAgIGNvbnN0IHBheWxvYWRWaXNpdGEgPSB7XHJcbiAgICAgICAgICAgIHJlZlJlY0lkQWN0aXZpZGFkOiByZWNJZEFjdGl2aWRhZCxcclxuICAgICAgICAgICAgYXNpc3RlbnRlVGlwbzogZGVmYXVsdEFzaXN0ZW50ZVRpcG8sXHJcbiAgICAgICAgICAgIGFzaXN0ZW50ZUlkOiBjb250YWN0LnRleHQsXHJcbiAgICAgICAgICAgIGNvbnRhY3RvUmVjSWQ6IGNvbnRhY3QudmFsdWUsXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgY29uc3QgcmVzVmlzID0gYXdhaXQgZmV0Y2hKc29uPExlZ2FjeUNvbW1hbmRSZXNwb25zZT4oXCIvVmlzaXRhcy9DcmVhdGVWaXNpdGFBc2lzdGVudGVcIiwge1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHBheWxvYWRWaXNpdGEpLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBpZiAoIWdldExlZ2FjeVJlc3BvbnNlU3VjY2VzcyhyZXNWaXMpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihnZXRMZWdhY3lSZXNwb25zZU1lc3NhZ2UocmVzVmlzKSB8fCBpbmRUKFwiVmlzaXRzX0NyZWF0ZV9DcmVhdGVWaXNpdEZhaWxlZFwiLCBcIkZhaWxlZCB0byBjcmVhdGUgdmlzaXQuXCIpKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpZHggPSAwOyBpZHggPCBzZWxlY3RlZENvbnRhY3RzLmxlbmd0aDsgaWR4ICs9IGFzc2lzdGFudEJhdGNoU2l6ZSkge1xyXG4gICAgICAgICAgY29uc3QgYmF0Y2ggPSBzZWxlY3RlZENvbnRhY3RzLnNsaWNlKGlkeCwgaWR4ICsgYXNzaXN0YW50QmF0Y2hTaXplKTtcclxuICAgICAgICAgIGNvbnN0IGZpcnN0ID0gYmF0Y2hbMF07XHJcbiAgICAgICAgICBpZiAoZmlyc3QpIHtcclxuICAgICAgICAgICAgc2V0U3RhdHVzKGluZEZvcm1hdChcIlZpc2l0c19DcmVhdGVfQ3JlYXRpbmdWaXNpdEZvclwiLCBcIkNyZWF0aW5nIHZpc2l0IGZvciB7MH0uLi5cIiwgZmlyc3QudGV4dCkpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoYmF0Y2gubWFwKChjb250YWN0KSA9PiBjcmVhdGVBc3Npc3RhbnQoY29udGFjdCkpKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbShWSVNJVF9EUkFGVF9LRVkpO1xyXG4gICAgICB9IGNhdGNoIHtcclxuICAgICAgICAvLyBJZ25vcmUgc3RvcmFnZSBlcnJvcnMuXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNldEhpc3RvcnlGaWx0ZXJGb3JEYXRlKHRyYW5zRGF0ZSwgdHJ1ZSk7XHJcbiAgICAgIGNsb3NlQ29uZmlybSgpO1xyXG4gICAgICBhd2FpdCB3YWl0KDIwMCk7XHJcbiAgICAgIGZsYXNoQWN0aW9uTWFyayhcIm9rUHJvY2Vzc1wiLCAxMjAwKTtcclxuICAgICAgYXdhaXQgd2FpdCgxMjAwKTtcclxuICAgICAgd2luZG93Ll9faW5kQnlwYXNzTmF2aWdhdGlvbkd1YXJkT25jZT8uKCk7XHJcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvSGlzdG9yaWFsL0hpc3RvcnlcIjtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9IGNhdGNoIChlOiB1bmtub3duKSB7XHJcbiAgICAgIGlmIChjcmVhdGVkUmVjSWQgJiYgY2FuUm9sbGJhY2tEZWxldGUpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgc2V0U3RhdHVzKGluZFQoXCJWaXNpdHNfQ3JlYXRlX1JvbGxiYWNrXCIsIFwiUm9sbGluZyBiYWNrIGFjdGl2aXR5Li4uXCIpKTtcclxuICAgICAgICAgIGF3YWl0IGZldGNoSnNvbihgL1Zpc2l0YXMvRGVsZXRlQWN0aXZpdHkvJHtlbmNvZGVVUklDb21wb25lbnQoY3JlYXRlZFJlY0lkKX1gLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcclxuICAgICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9IGNhdGNoIHtcclxuICAgICAgICAgIC8vIEtlZXAgb3JpZ2luYWwgZXJyb3IgZmxvdy5cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgbXNnID0gZSBpbnN0YW5jZW9mIEVycm9yID8gZS5tZXNzYWdlIDogaW5kVChcIlZpc2l0c19DcmVhdGVfQ3JlYXRlVmlzaXRFcnJvclwiLCBcIkZhaWxlZCB0byBjcmVhdGUgdGhlIHZpc2l0LlwiKTtcclxuICAgICAgc2V0TW9kYWxFcnJvcihtc2cpO1xyXG4gICAgICBzZXRTdGF0dXMobXNnKTtcclxuICAgICAgZmxhc2hBY3Rpb25NYXJrKFwiZXJyb3JQcm9jZXNzXCIsIDE1MDApO1xyXG4gICAgICBzZXRCdXN5KGZhbHNlKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH0sIFtcclxuICAgIGFudGVjZWRlbnRlcyxcclxuICAgIGJ1c3ksXHJcbiAgICBjYW5DcmVhdGVWaXNpdCxcclxuICAgIGNhblJvbGxiYWNrRGVsZXRlLFxyXG4gICAgY2xvc2VDb25maXJtLFxyXG4gICAgY29tZW50YXJpb3MsXHJcbiAgICBjb25jbHVzaW9uZXMsXHJcbiAgICBkZWZhdWx0QXNpc3RlbnRlVGlwbyxcclxuICAgIGRlc2NyaXB0aW9uLFxyXG4gICAgc2VsZWN0ZWRDbGllbnQsXHJcbiAgICBzZWxlY3RlZENvbnRhY3RzLFxyXG4gICAgc2V0QnVzeSxcclxuICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICBzZXRTaG93UmVxdWlyZWQsXHJcbiAgICBzZXRTdGF0dXMsXHJcbiAgICB0cmFuc0RhdGUsXHJcbiAgICB2aXNpdFR5cGUsXHJcbiAgXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZVN1Ym1pdCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmIChidXN5KSByZXR1cm47XHJcbiAgICBpZiAoIWNhbkNyZWF0ZVZpc2l0KSB7XHJcbiAgICAgIHNob3dQZXJtaXNzaW9uTW9kYWwoKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKG1vZGFsT3BlbikgcmV0dXJuO1xyXG4gICAgaWYgKCFzZWxlY3RlZENsaWVudCkge1xyXG4gICAgICBzZXRTdGF0dXMoaW5kVChcIlZpc2l0c19DcmVhdGVfU2VsZWN0Q2xpZW50UmVxdWlyZWRcIiwgXCJTZWxlY3QgYSBjbGllbnQuXCIpKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKFN0cmluZyh2aXNpdFR5cGUgfHwgXCJcIikgPT09IFwiXCIgfHwgU3RyaW5nKHZpc2l0VHlwZSkgPT09IFwiMFwiIHx8ICFkZXNjcmlwdGlvbi50cmltKCkgfHwgIWNvbWVudGFyaW9zLnRyaW0oKSkge1xyXG4gICAgICBzZXRTaG93UmVxdWlyZWQodHJ1ZSk7XHJcbiAgICAgIHNldFN0YXR1cyhpbmRUKFwiVmlzaXRzX0NyZWF0ZV9Db21wbGV0ZVJlcXVpcmVkXCIsIFwiQ29tcGxldGUgcmVxdWlyZWQgZmllbGRzLlwiKSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHNldE1vZGFsRXJyb3IoXCJcIik7XHJcbiAgICBvcGVuQ29uZmlybSh7XHJcbiAgICAgIHRpdGxlOiBpbmRUKFwiVmlzaXRzX0NyZWF0ZV9Db25maXJtQ3JlYXRlX1RpdGxlXCIsIFwiVmlzaXRzX0NyZWF0ZV9Db25maXJtQ3JlYXRlX1RpdGxlXCIpLFxyXG4gICAgICBtZXNzYWdlOiBpbmRUKFwiVmlzaXRzX0NyZWF0ZV9Db25maXJtQ3JlYXRlX0JvZHlcIiwgXCJWaXNpdHNfQ3JlYXRlX0NvbmZpcm1DcmVhdGVfQm9keVwiKSxcclxuICAgICAgY29uZmlybVRleHQ6IGluZFQoXCJDb25maXJtX1llc1wiLCBcIkNvbmZpcm1fWWVzXCIpLFxyXG4gICAgICBvbkNvbmZpcm06IGRvQ3JlYXRlLFxyXG4gICAgfSk7XHJcbiAgfSwgW1xyXG4gICAgYnVzeSxcclxuICAgIGNhbkNyZWF0ZVZpc2l0LFxyXG4gICAgY29tZW50YXJpb3MsXHJcbiAgICBkZXNjcmlwdGlvbixcclxuICAgIGRvQ3JlYXRlLFxyXG4gICAgbW9kYWxPcGVuLFxyXG4gICAgb3BlbkNvbmZpcm0sXHJcbiAgICBzZWxlY3RlZENsaWVudCxcclxuICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICBzZXRTaG93UmVxdWlyZWQsXHJcbiAgICBzZXRTdGF0dXMsXHJcbiAgICB2aXNpdFR5cGUsXHJcbiAgXSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBkb0NyZWF0ZSxcclxuICAgIGhhbmRsZVN1Ym1pdCxcclxuICB9O1xyXG59O1xyXG4iLCAiZXhwb3J0IGNvbnN0IGluZEV4dHJhY3RJZCA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZyA9PiB7XHJcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHJldHVybiBcIlwiO1xyXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgfHwgdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiKSByZXR1cm4gU3RyaW5nKHZhbHVlKS50cmltKCk7XHJcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgY29uc3QgY2FuZGlkYXRlID1cclxuICAgICAgKHZhbHVlIGFzIGFueSkucmVjSWQgPz9cclxuICAgICAgKHZhbHVlIGFzIGFueSkuUmVjSWQgPz9cclxuICAgICAgKHZhbHVlIGFzIGFueSkuaWQgPz9cclxuICAgICAgKHZhbHVlIGFzIGFueSkuSWQgPz9cclxuICAgICAgKHZhbHVlIGFzIGFueSkudmFsdWUgPz9cclxuICAgICAgKHZhbHVlIGFzIGFueSkuVmFsdWU7XHJcbiAgICBpZiAodHlwZW9mIGNhbmRpZGF0ZSA9PT0gXCJzdHJpbmdcIiB8fCB0eXBlb2YgY2FuZGlkYXRlID09PSBcIm51bWJlclwiKSByZXR1cm4gU3RyaW5nKGNhbmRpZGF0ZSkudHJpbSgpO1xyXG4gIH1cclxuICByZXR1cm4gXCJcIjtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBpbmRFeHRyYWN0TnVtZXJpY0lkID0gKHZhbHVlOiB1bmtub3duLCBkZXB0aCA9IDApOiBzdHJpbmcgPT4ge1xyXG4gIGlmIChkZXB0aCA+IDMpIHJldHVybiBcIlwiO1xyXG4gIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gXCJcIjtcclxuICBpZiAodHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiICYmIE51bWJlci5pc0Zpbml0ZSh2YWx1ZSkpIHJldHVybiBTdHJpbmcoTWF0aC50cnVuYyh2YWx1ZSkpO1xyXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpIHtcclxuICAgIGNvbnN0IHJhdyA9IHZhbHVlLnRyaW0oKTtcclxuICAgIGlmICghcmF3KSByZXR1cm4gXCJcIjtcclxuICAgIGlmICgvXlxcZCskLy50ZXN0KHJhdykpIHJldHVybiByYXc7XHJcbiAgICBjb25zdCBtID0gcmF3Lm1hdGNoKC8oXFxkezMsfSkvKTtcclxuICAgIHJldHVybiBtID8gbVsxXSA6IFwiXCI7XHJcbiAgfVxyXG4gIGlmICh0eXBlb2YgdmFsdWUgIT09IFwib2JqZWN0XCIpIHJldHVybiBcIlwiO1xyXG4gIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xyXG4gICAgZm9yIChjb25zdCBpdGVtIG9mIHZhbHVlKSB7XHJcbiAgICAgIGNvbnN0IGZvdW5kID0gaW5kRXh0cmFjdE51bWVyaWNJZChpdGVtLCBkZXB0aCArIDEpO1xyXG4gICAgICBpZiAoZm91bmQpIHJldHVybiBmb3VuZDtcclxuICAgIH1cclxuICAgIHJldHVybiBcIlwiO1xyXG4gIH1cclxuXHJcbiAgY29uc3Qga2V5cyA9IFtcclxuICAgIFwicmVjSWRcIixcclxuICAgIFwiUmVjSWRcIixcclxuICAgIFwicmVmUmVjSWRBY3RpdmlkYWRcIixcclxuICAgIFwiUmVmUmVjSWRBY3RpdmlkYWRcIixcclxuICAgIFwiYWN0aXZpZGFkUmVjSWRcIixcclxuICAgIFwiQWN0aXZpZGFkUmVjSWRcIixcclxuICAgIFwiaWRcIixcclxuICAgIFwiSWRcIixcclxuICAgIFwidmFsdWVcIixcclxuICAgIFwiVmFsdWVcIixcclxuICAgIFwicmVzdWx0XCIsXHJcbiAgICBcIlJlc3VsdFwiLFxyXG4gICAgXCJkYXRhXCIsXHJcbiAgICBcIkRhdGFcIixcclxuICAgIFwibWVzc2FnZVwiLFxyXG4gICAgXCJNZXNzYWdlXCIsXHJcbiAgXTtcclxuXHJcbiAgZm9yIChjb25zdCBrIG9mIGtleXMpIHtcclxuICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodmFsdWUsIGspKSB7XHJcbiAgICAgIGNvbnN0IGZvdW5kID0gaW5kRXh0cmFjdE51bWVyaWNJZCgodmFsdWUgYXMgYW55KVtrXSwgZGVwdGggKyAxKTtcclxuICAgICAgaWYgKGZvdW5kKSByZXR1cm4gZm91bmQ7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmb3IgKGNvbnN0IHYgb2YgT2JqZWN0LnZhbHVlcyh2YWx1ZSBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPikpIHtcclxuICAgIGNvbnN0IGZvdW5kID0gaW5kRXh0cmFjdE51bWVyaWNJZCh2LCBkZXB0aCArIDEpO1xyXG4gICAgaWYgKGZvdW5kKSByZXR1cm4gZm91bmQ7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gXCJcIjtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBpbmRFeHRyYWN0U2lnbmVkSWQgPSAodmFsdWU6IHVua25vd24sIGRlcHRoID0gMCk6IHN0cmluZyA9PiB7XHJcbiAgaWYgKGRlcHRoID4gMykgcmV0dXJuIFwiXCI7XHJcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHJldHVybiBcIlwiO1xyXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCIgJiYgTnVtYmVyLmlzRmluaXRlKHZhbHVlKSkgcmV0dXJuIFN0cmluZyhNYXRoLnRydW5jKHZhbHVlKSk7XHJcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgY29uc3QgcmF3ID0gdmFsdWUudHJpbSgpO1xyXG4gICAgaWYgKCFyYXcpIHJldHVybiBcIlwiO1xyXG4gICAgY29uc3QgbWF0Y2ggPSByYXcubWF0Y2goLy0/XFxkezMsfS8pO1xyXG4gICAgcmV0dXJuIG1hdGNoID8gbWF0Y2hbMF0gOiBcIlwiO1xyXG4gIH1cclxuICBpZiAodHlwZW9mIHZhbHVlICE9PSBcIm9iamVjdFwiKSByZXR1cm4gXCJcIjtcclxuICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcclxuICAgIGZvciAoY29uc3QgaXRlbSBvZiB2YWx1ZSkge1xyXG4gICAgICBjb25zdCBmb3VuZCA9IGluZEV4dHJhY3RTaWduZWRJZChpdGVtLCBkZXB0aCArIDEpO1xyXG4gICAgICBpZiAoZm91bmQpIHJldHVybiBmb3VuZDtcclxuICAgIH1cclxuICAgIHJldHVybiBcIlwiO1xyXG4gIH1cclxuXHJcbiAgY29uc3Qga2V5cyA9IFtcclxuICAgIFwicmVjSWRcIixcclxuICAgIFwiUmVjSWRcIixcclxuICAgIFwicmVmUmVjSWRBY3RpdmlkYWRcIixcclxuICAgIFwiUmVmUmVjSWRBY3RpdmlkYWRcIixcclxuICAgIFwiYWN0aXZpZGFkUmVjSWRcIixcclxuICAgIFwiQWN0aXZpZGFkUmVjSWRcIixcclxuICAgIFwibWVzc2FnZVwiLFxyXG4gICAgXCJNZXNzYWdlXCIsXHJcbiAgICBcInJlc3VsdFwiLFxyXG4gICAgXCJSZXN1bHRcIixcclxuICAgIFwiZGF0YVwiLFxyXG4gICAgXCJEYXRhXCIsXHJcbiAgXTtcclxuXHJcbiAgZm9yIChjb25zdCBrIG9mIGtleXMpIHtcclxuICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodmFsdWUsIGspKSB7XHJcbiAgICAgIGNvbnN0IGZvdW5kID0gaW5kRXh0cmFjdFNpZ25lZElkKCh2YWx1ZSBhcyBhbnkpW2tdLCBkZXB0aCArIDEpO1xyXG4gICAgICBpZiAoZm91bmQpIHJldHVybiBmb3VuZDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZvciAoY29uc3QgdiBvZiBPYmplY3QudmFsdWVzKHZhbHVlIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+KSkge1xyXG4gICAgY29uc3QgZm91bmQgPSBpbmRFeHRyYWN0U2lnbmVkSWQodiwgZGVwdGggKyAxKTtcclxuICAgIGlmIChmb3VuZCkgcmV0dXJuIGZvdW5kO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIFwiXCI7XHJcbn07XHJcbiIsICJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VJZCwgdXNlTWVtbywgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBYTWFya0ljb24gfSBmcm9tIFwiQGhlcm9pY29ucy9yZWFjdC8yMC9zb2xpZFwiO1xyXG5pbXBvcnQgRmxvYXRpbmdMaXN0IGZyb20gXCIuLi9jb21tb25zL0Zsb2F0aW5nTGlzdC50c3hcIjtcclxuaW1wb3J0IFNwaW5uZXIgZnJvbSBcIi4uL2NvbW1vbnMvU3Bpbm5lci50c3hcIjtcclxuaW1wb3J0IHsgQ2hldnJvbkRvd25TdmcsIENoZXZyb25VcFN2ZyB9IGZyb20gXCIuLi9jb21tb25zL2NoZXZyb25zLnRzeFwiO1xyXG5pbXBvcnQgeyBmZXRjaEpzb24gfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvYXBpU2VydmljZS50c1wiO1xyXG5pbXBvcnQgeyBoYW5kbGVDb21ib2JveEtleURvd24gfSBmcm9tIFwiLi4vLi4vaG9va3MvdXNlQ29tYm9ib3hLZXlib2FyZC50c1wiO1xyXG5pbXBvcnQgeyB1c2VPdXRzaWRlQ2xpY2sgfSBmcm9tIFwiLi4vLi4vaG9va3MvdXNlT3V0c2lkZUNsaWNrLnRzXCI7XHJcbmltcG9ydCB7IGNsYXNzTmFtZXMgfSBmcm9tIFwiLi4vLi4vdXRpbHMvY2xhc3NOYW1lcy50c1wiO1xyXG5pbXBvcnQgeyBpbmRGb3JtYXQsIGluZFQgfSBmcm9tIFwiLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgeyBpc05vRGF0YVJvdywgaXNOb0RhdGFUZXh0IH0gZnJvbSBcIi4uLy4uL3V0aWxzL25vRGF0YS50c1wiO1xyXG5pbXBvcnQgeyBnZXRDYWNoZWRDb250YWN0cywgc2V0Q2FjaGVkQ29udGFjdHMsIGdldFN0b3JlZFNlbGVjdGlvbiwgc2V0U3RvcmVkU2VsZWN0aW9uLCBjbGVhclN0b3JlZFNlbGVjdGlvbiB9IGZyb20gXCIuLi8uLi91dGlscy92aXNpdGFzU3RvcmFnZS50c1wiO1xyXG5cclxudHlwZSBDb250YWN0T3B0aW9uID0ge1xyXG4gIHZhbHVlOiBzdHJpbmc7XHJcbiAgdGV4dDogc3RyaW5nO1xyXG4gIGNhcmdvOiBzdHJpbmc7XHJcbiAgZW1wcmVzYTogc3RyaW5nO1xyXG59O1xyXG5cclxudHlwZSBDb250YWN0c0Ryb3Bkb3duUmVzcG9uc2UgPSB7XHJcbiAgaXRlbXM/OiB1bmtub3duW107XHJcbiAgSXRlbXM/OiB1bmtub3duW107XHJcbn07XHJcblxyXG50eXBlIENvbnRhY3RzQ29tYm9ib3hQcm9wcyA9IHtcclxuICBhY2NvdW50TnVtPzogc3RyaW5nO1xyXG4gIHZhbHVlPzogQ29udGFjdE9wdGlvbltdO1xyXG4gIG9uQ2hhbmdlOiAodmFsdWU6IENvbnRhY3RPcHRpb25bXSkgPT4gdm9pZDtcclxuICBwb3J0YWxDbGFzc05hbWU/OiBzdHJpbmc7XHJcbiAgcGFuZWxDbGFzc05hbWU/OiBzdHJpbmc7XHJcbn07XHJcblxyXG4vLyBNdWx0aS1zZWxlY3QgY29udGFjdHMgY29tYm9ib3ggdGllZCB0byB0aGUgc2VsZWN0ZWQgY2xpZW50LlxyXG5jb25zdCBDb250YWN0c0NvbWJvYm94ID0gKHsgYWNjb3VudE51bSwgdmFsdWUgPSBbXSwgb25DaGFuZ2UsIHBvcnRhbENsYXNzTmFtZSwgcGFuZWxDbGFzc05hbWUgfTogQ29udGFjdHNDb21ib2JveFByb3BzKSA9PiB7XHJcbiAgY29uc3QgW3F1ZXJ5LCBzZXRRdWVyeV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbb3B0aW9ucywgc2V0T3B0aW9uc10gPSB1c2VTdGF0ZTxDb250YWN0T3B0aW9uW10+KFtdKTtcclxuICBjb25zdCBbc2VsZWN0ZWQsIHNldFNlbGVjdGVkXSA9IHVzZVN0YXRlPENvbnRhY3RPcHRpb25bXT4odmFsdWUpO1xyXG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbbG9hZGluZ01vcmUsIHNldExvYWRpbmdNb3JlXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbc3RhdHVzLCBzZXRTdGF0dXNdID0gdXNlU3RhdGUoaW5kVChcIlZpc2l0c19DcmVhdGVfU2VsZWN0Q2xpZW50Rmlyc3RcIiwgXCJTZWxlY3QgYSBjbGllbnQgZmlyc3QuXCIpKTtcclxuICBjb25zdCBbaGFzTG9hZGVkLCBzZXRIYXNMb2FkZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtvcGVuLCBzZXRPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbcGFnZSwgc2V0UGFnZV0gPSB1c2VTdGF0ZSgxKTtcclxuICBjb25zdCBbaGFzTW9yZSwgc2V0SGFzTW9yZV0gPSB1c2VTdGF0ZSh0cnVlKTtcclxuICBjb25zdCBbYmxvY2tpbmcsIHNldEJsb2NraW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbYWN0aXZlSW5kZXgsIHNldEFjdGl2ZUluZGV4XSA9IHVzZVN0YXRlKDApO1xyXG4gIGNvbnN0IFtzaG93Tm90Rm91bmRTdGF0ZSwgc2V0U2hvd05vdEZvdW5kU3RhdGVdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IGxpc3RSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBib3hSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBhYm9ydFJlZiA9IHVzZVJlZjxBYm9ydENvbnRyb2xsZXIgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBjb250YWluZXJSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBpbnB1dFJlZiA9IHVzZVJlZjxIVE1MSW5wdXRFbGVtZW50IHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgbGFzdEFjY291bnRSZWYgPSB1c2VSZWYoYWNjb3VudE51bSB8fCBcIlwiKTtcclxuICBjb25zdCBvbkNoYW5nZVJlZiA9IHVzZVJlZihvbkNoYW5nZSk7XHJcbiAgY29uc3QgaWRCYXNlID0gdXNlSWQoKTtcclxuICBjb25zdCBpbnB1dElkID0gYCR7aWRCYXNlfS1jb250YWN0cy1pbnB1dGA7XHJcbiAgY29uc3QgbGlzdElkID0gYCR7aWRCYXNlfS1jb250YWN0cy1vcHRpb25zYDtcclxuXHJcbiAgdXNlT3V0c2lkZUNsaWNrKFtjb250YWluZXJSZWYsIGxpc3RSZWZdLCAoKSA9PiB7XHJcbiAgICBzZXRPcGVuKGZhbHNlKTtcclxuICAgIHNldFNob3dOb3RGb3VuZFN0YXRlKGZhbHNlKTtcclxuICAgIGlmIChxdWVyeS50cmltKCkpIHtcclxuICAgICAgc2V0UXVlcnkoXCJcIik7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBvbkNoYW5nZVJlZi5jdXJyZW50ID0gb25DaGFuZ2U7XHJcbiAgfSwgW29uQ2hhbmdlXSk7XHJcblxyXG4gIGNvbnN0IGlzU2FtZVNlbGVjdGlvbiA9IChhOiBDb250YWN0T3B0aW9uW10gPSBbXSwgYjogQ29udGFjdE9wdGlvbltdID0gW10pID0+IHtcclxuICAgIGlmIChhLmxlbmd0aCAhPT0gYi5sZW5ndGgpIHJldHVybiBmYWxzZTtcclxuICAgIGNvbnN0IGFzID0gYS5tYXAoKHgpID0+IFN0cmluZyh4LnZhbHVlKSkuc29ydCgpO1xyXG4gICAgY29uc3QgYnMgPSBiLm1hcCgoeCkgPT4gU3RyaW5nKHgudmFsdWUpKS5zb3J0KCk7XHJcbiAgICByZXR1cm4gYXMuZXZlcnkoKHYsIGkpID0+IHYgPT09IGJzW2ldKTtcclxuICB9O1xyXG5cclxuICAvLyBTeW5jIGludGVybmFsIHNlbGVjdGlvbiB3aXRoIHRoZSBwcm9wIChkcmFmdC9jYWNoZSByZXN0b3JlKS5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFpc1NhbWVTZWxlY3Rpb24odmFsdWUgfHwgW10sIHNlbGVjdGVkKSkge1xyXG4gICAgICBzZXRTZWxlY3RlZCh2YWx1ZSB8fCBbXSk7XHJcbiAgICB9XHJcbiAgfSwgW3ZhbHVlXSk7XHJcblxyXG4gIGNvbnN0IGNhbmNlbFBlbmRpbmcgPSAoKSA9PiB7XHJcbiAgICBpZiAoYWJvcnRSZWYuY3VycmVudCkge1xyXG4gICAgICBhYm9ydFJlZi5jdXJyZW50LmFib3J0KCk7XHJcbiAgICAgIGFib3J0UmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBpZiAoYWJvcnRSZWYuY3VycmVudCkge1xyXG4gICAgICAgIGFib3J0UmVmLmN1cnJlbnQuYWJvcnQoKTtcclxuICAgICAgICBhYm9ydFJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IHByaW1lRnJvbUNhY2hlID0gKCkgPT4ge1xyXG4gICAgY29uc3QgY2FjaGVkID0gZ2V0Q2FjaGVkQ29udGFjdHMoYWNjb3VudE51bSkgYXMgQ29udGFjdE9wdGlvbltdIHwgbnVsbDtcclxuICAgIGlmIChjYWNoZWQpIHtcclxuICAgICAgc2V0T3B0aW9ucyhjYWNoZWQpO1xyXG4gICAgICBzZXRTaG93Tm90Rm91bmRTdGF0ZShmYWxzZSk7XHJcbiAgICAgIHNldEhhc0xvYWRlZCh0cnVlKTtcclxuICAgICAgc2V0SGFzTW9yZShjYWNoZWQubGVuZ3RoID09PSAxMCk7XHJcbiAgICAgIHNldFN0YXR1cyhcclxuICAgICAgICBjYWNoZWQubGVuZ3RoXHJcbiAgICAgICAgICA/IGluZEZvcm1hdChcIlZpc2l0c19DcmVhdGVfQ29udGFjdENvdW50Q2FjaGVcIiwgXCJ7MH0gY29udGFjdHMgKGNhY2hlKVwiLCBjYWNoZWQubGVuZ3RoKVxyXG4gICAgICAgICAgOiBpbmRUKFwiVmlzaXRzX0NyZWF0ZV9Ob0NvbnRhY3RzXCIsIFwiTm8gY29udGFjdHNcIilcclxuICAgICAgKTtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNhbmNlbFBlbmRpbmcoKTtcclxuICAgIHNldFF1ZXJ5KFwiXCIpO1xyXG4gICAgc2V0T3BlbihmYWxzZSk7XHJcbiAgICBzZXRMb2FkaW5nKGZhbHNlKTtcclxuICAgIHNldEJsb2NraW5nKGZhbHNlKTtcclxuICAgIHNldExvYWRpbmdNb3JlKGZhbHNlKTtcclxuICAgIHNldEFjdGl2ZUluZGV4KDApO1xyXG4gICAgc2V0U2hvd05vdEZvdW5kU3RhdGUoZmFsc2UpO1xyXG4gICAgc2V0UGFnZSgxKTtcclxuICAgIHNldEhhc01vcmUodHJ1ZSk7XHJcblxyXG4gICAgaWYgKCFhY2NvdW50TnVtKSB7XHJcbiAgICAgIHNldE9wdGlvbnMoW10pO1xyXG4gICAgICBzZXRTZWxlY3RlZChbXSk7XHJcbiAgICAgIG9uQ2hhbmdlUmVmLmN1cnJlbnQoW10pO1xyXG4gICAgICBzZXRTdGF0dXMoaW5kVChcIlZpc2l0c19DcmVhdGVfU2VsZWN0Q2xpZW50Rmlyc3RcIiwgXCJTZWxlY3QgYSBjbGllbnQgZmlyc3QuXCIpKTtcclxuICAgICAgc2V0SGFzTG9hZGVkKGZhbHNlKTtcclxuICAgICAgY2xlYXJTdG9yZWRTZWxlY3Rpb24obGFzdEFjY291bnRSZWYuY3VycmVudCk7XHJcbiAgICAgIGxhc3RBY2NvdW50UmVmLmN1cnJlbnQgPSBcIlwiO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY2hhbmdlZCA9IGxhc3RBY2NvdW50UmVmLmN1cnJlbnQgJiYgbGFzdEFjY291bnRSZWYuY3VycmVudCAhPT0gYWNjb3VudE51bTtcclxuICAgIGlmIChjaGFuZ2VkKSB7XHJcbiAgICAgIHNldFNlbGVjdGVkKFtdKTtcclxuICAgICAgb25DaGFuZ2VSZWYuY3VycmVudChbXSk7XHJcbiAgICAgIGNsZWFyU3RvcmVkU2VsZWN0aW9uKGxhc3RBY2NvdW50UmVmLmN1cnJlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHVzZWRDYWNoZSA9IHByaW1lRnJvbUNhY2hlKCk7XHJcbiAgICBpZiAoIXVzZWRDYWNoZSkge1xyXG4gICAgICBzZXRPcHRpb25zKFtdKTtcclxuICAgICAgc2V0SGFzTG9hZGVkKGZhbHNlKTtcclxuICAgICAgc2V0U3RhdHVzKGluZFQoXCJWaXNpdHNfQ3JlYXRlX1ByZXNzQXJyb3dUb0xvYWRDb250YWN0c1wiLCBcIlByZXNzIEFycm93RG93biB0byBsb2FkIGNvbnRhY3RzLlwiKSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc3RvcmVkU2VsZWN0aW9uID0gZ2V0U3RvcmVkU2VsZWN0aW9uKGFjY291bnROdW0pIGFzIENvbnRhY3RPcHRpb25bXTtcclxuICAgIGlmIChzdG9yZWRTZWxlY3Rpb24ubGVuZ3RoICYmICF2YWx1ZT8ubGVuZ3RoKSB7XHJcbiAgICAgIHNldFNlbGVjdGVkKHN0b3JlZFNlbGVjdGlvbik7XHJcbiAgICAgIG9uQ2hhbmdlUmVmLmN1cnJlbnQoc3RvcmVkU2VsZWN0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBsYXN0QWNjb3VudFJlZi5jdXJyZW50ID0gYWNjb3VudE51bTtcclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC1ob29rcy9leGhhdXN0aXZlLWRlcHNcclxuICB9LCBbYWNjb3VudE51bV0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgb25DaGFuZ2VSZWYuY3VycmVudChzZWxlY3RlZCk7XHJcbiAgICBpZiAoYWNjb3VudE51bSkgc2V0U3RvcmVkU2VsZWN0aW9uKGFjY291bnROdW0sIHNlbGVjdGVkKTtcclxuICB9LCBbc2VsZWN0ZWQsIGFjY291bnROdW1dKTtcclxuXHJcbiAgY29uc3QgdG9UZXh0ID0gKHZhbHVlOiB1bmtub3duKTogc3RyaW5nID0+IHtcclxuICAgIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gXCJcIjtcclxuICAgIHJldHVybiBTdHJpbmcodmFsdWUpLnRyaW0oKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBhc09iamVjdFJlY29yZCA9ICh2YWx1ZTogdW5rbm93bik6IFJlY29yZDxzdHJpbmcsIHVua25vd24+IHwgbnVsbCA9PiB7XHJcbiAgICBpZiAoIXZhbHVlIHx8IHR5cGVvZiB2YWx1ZSAhPT0gXCJvYmplY3RcIiB8fCBBcnJheS5pc0FycmF5KHZhbHVlKSkgcmV0dXJuIG51bGw7XHJcbiAgICByZXR1cm4gdmFsdWUgYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj47XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgbWFwQ29udGFjdHMgPSAoaXRlbXM6IHVua25vd25bXSA9IFtdKSA9PlxyXG4gICAgaXRlbXNcclxuICAgICAgLm1hcCgoZW50cnkpID0+IHtcclxuICAgICAgICBpZiAoaXNOb0RhdGFSb3coZW50cnkpKSByZXR1cm4gbnVsbDtcclxuICAgICAgICBjb25zdCByZWNvcmQgPSBhc09iamVjdFJlY29yZChlbnRyeSk7XHJcbiAgICAgICAgaWYgKCFyZWNvcmQpIHJldHVybiBudWxsO1xyXG5cclxuICAgICAgICBjb25zdCByZWNJZCA9IHRvVGV4dChyZWNvcmQucmVjSWQgPz8gcmVjb3JkLlJlY0lkKTtcclxuICAgICAgICBjb25zdCBuYW1lID0gdG9UZXh0KHJlY29yZC5uYW1lID8/IHJlY29yZC5OYW1lKTtcclxuICAgICAgICBjb25zdCBjYXJnbyA9IHRvVGV4dChyZWNvcmQuY2FyZ28gPz8gcmVjb3JkLkNhcmdvKTtcclxuICAgICAgICBjb25zdCBlbXByZXNhID0gdG9UZXh0KHJlY29yZC5lbXByZXNhID8/IHJlY29yZC5FbXByZXNhKTtcclxuXHJcbiAgICAgICAgaWYgKCFyZWNJZCB8fCBpc05vRGF0YVRleHQobmFtZSkpIHJldHVybiBudWxsO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgdmFsdWU6IHJlY0lkLFxyXG4gICAgICAgICAgdGV4dDogbmFtZS50b1VwcGVyQ2FzZSgpLFxyXG4gICAgICAgICAgY2FyZ286IGNhcmdvLnRvVXBwZXJDYXNlKCksXHJcbiAgICAgICAgICBlbXByZXNhOiBlbXByZXNhLnRvVXBwZXJDYXNlKCksXHJcbiAgICAgICAgfSBhcyBDb250YWN0T3B0aW9uO1xyXG4gICAgICB9KVxyXG4gICAgICAuZmlsdGVyKEJvb2xlYW4pIGFzIENvbnRhY3RPcHRpb25bXTtcclxuXHJcbiAgY29uc3QgbG9hZCA9IGFzeW5jIChwYWdlVG9Mb2FkID0gMSwgYXBwZW5kID0gZmFsc2UpID0+IHtcclxuICAgIGlmICghYWNjb3VudE51bSkgcmV0dXJuO1xyXG4gICAgaWYgKGxvYWRpbmcgfHwgbG9hZGluZ01vcmUpIHJldHVybjtcclxuICAgIGNhbmNlbFBlbmRpbmcoKTtcclxuXHJcbiAgICBpZiAoIWFwcGVuZCkge1xyXG4gICAgICBzZXRMb2FkaW5nKHRydWUpO1xyXG4gICAgICBzZXRCbG9ja2luZyh0cnVlKTtcclxuICAgICAgaWYgKHBhZ2VUb0xvYWQgPT09IDEpIHNldFN0YXR1cyhpbmRUKFwiVmlzaXRzX0NyZWF0ZV9Mb2FkaW5nQ29udGFjdHNcIiwgXCJMb2FkaW5nIGNvbnRhY3RzLi4uXCIpKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHNldExvYWRpbmdNb3JlKHRydWUpO1xyXG4gICAgICBzZXRCbG9ja2luZyh0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xyXG4gICAgYWJvcnRSZWYuY3VycmVudCA9IGNvbnRyb2xsZXI7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaEpzb248Q29udGFjdHNEcm9wZG93blJlc3BvbnNlPihcclxuICAgICAgICBgL1Zpc2l0YXMvR2V0Q29udGFjdHNGb3JEcm9wZG93bj9hY2NvdW50TnVtPSR7ZW5jb2RlVVJJQ29tcG9uZW50KGFjY291bnROdW0pfSZwYWdlPSR7cGFnZVRvTG9hZH0mcGFnZVNpemU9MTBgLFxyXG4gICAgICAgIHsgc2lnbmFsOiBjb250cm9sbGVyLnNpZ25hbCB9XHJcbiAgICAgICk7XHJcbiAgICAgIGNvbnN0IHJhd0l0ZW1zID0gQXJyYXkuaXNBcnJheShyZXMuaXRlbXMpID8gcmVzLml0ZW1zIDogQXJyYXkuaXNBcnJheShyZXMuSXRlbXMpID8gcmVzLkl0ZW1zIDogW107XHJcbiAgICAgIGNvbnN0IG1hcHBlZCA9IG1hcENvbnRhY3RzKHJhd0l0ZW1zKTtcclxuICAgICAgc2V0T3B0aW9ucygocHJldikgPT4ge1xyXG4gICAgICAgIGNvbnN0IG5leHQgPSBhcHBlbmQgPyBbLi4ucHJldiwgLi4ubWFwcGVkXSA6IG1hcHBlZDtcclxuICAgICAgICBzZXRDYWNoZWRDb250YWN0cyhhY2NvdW50TnVtLCBuZXh0KTtcclxuICAgICAgICByZXR1cm4gbmV4dDtcclxuICAgICAgfSk7XHJcbiAgICAgIHNldFNob3dOb3RGb3VuZFN0YXRlKGZhbHNlKTtcclxuICAgICAgc2V0SGFzTG9hZGVkKHRydWUpO1xyXG4gICAgICBzZXRIYXNNb3JlKG1hcHBlZC5sZW5ndGggPT09IDEwKTtcclxuICAgICAgc2V0UGFnZShwYWdlVG9Mb2FkKTtcclxuICAgICAgc2V0U3RhdHVzKG1hcHBlZC5sZW5ndGggPyBpbmRGb3JtYXQoXCJWaXNpdHNfQ3JlYXRlX0NvbnRhY3RDb3VudFwiLCBcInswfSBjb250YWN0c1wiLCBtYXBwZWQubGVuZ3RoKSA6IGluZFQoXCJWaXNpdHNfQ3JlYXRlX05vQ29udGFjdHNcIiwgXCJObyBjb250YWN0c1wiKSk7XHJcbiAgICB9IGNhdGNoIHtcclxuICAgICAgc2V0U3RhdHVzKGluZFQoXCJWaXNpdHNfQ3JlYXRlX0xvYWRDb250YWN0c0Vycm9yXCIsIFwiRmFpbGVkIHRvIGxvYWQgY29udGFjdHMuXCIpKTtcclxuICAgIH0gZmluYWxseSB7XHJcbiAgICAgIGFib3J0UmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcclxuICAgICAgc2V0TG9hZGluZ01vcmUoZmFsc2UpO1xyXG4gICAgICBzZXRCbG9ja2luZyhmYWxzZSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgZW5zdXJlTG9hZGVkID0gKCkgPT4ge1xyXG4gICAgaWYgKCFhY2NvdW50TnVtKSByZXR1cm47XHJcbiAgICBpZiAoaGFzTG9hZGVkICYmIG9wdGlvbnMubGVuZ3RoKSByZXR1cm47XHJcbiAgICBpZiAocHJpbWVGcm9tQ2FjaGUoKSkgcmV0dXJuO1xyXG4gICAgbG9hZCgxLCBmYWxzZSk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgbG9hZE1vcmVDb250YWN0cyA9IFJlYWN0LnVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmICghYWNjb3VudE51bSB8fCAhaGFzTW9yZSB8fCBsb2FkaW5nTW9yZSB8fCBsb2FkaW5nKSByZXR1cm47XHJcbiAgICBsb2FkKHBhZ2UgKyAxLCB0cnVlKTtcclxuICB9LCBbYWNjb3VudE51bSwgaGFzTW9yZSwgbG9hZGluZ01vcmUsIGxvYWRpbmcsIHBhZ2VdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghb3BlbiB8fCAhbGlzdFJlZi5jdXJyZW50KSByZXR1cm47XHJcbiAgICBjb25zdCBlbCA9IGxpc3RSZWYuY3VycmVudDtcclxuICAgIGNvbnN0IG9uU2Nyb2xsID0gKCkgPT4ge1xyXG4gICAgICBpZiAoZWwuc2Nyb2xsVG9wICsgZWwuY2xpZW50SGVpZ2h0ID49IGVsLnNjcm9sbEhlaWdodCAtIDgpIGxvYWRNb3JlQ29udGFjdHMoKTtcclxuICAgIH07XHJcbiAgICBlbC5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIG9uU2Nyb2xsLCB7IHBhc3NpdmU6IHRydWUgfSk7XHJcbiAgICByZXR1cm4gKCkgPT4gZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBvblNjcm9sbCk7XHJcbiAgfSwgW29wZW4sIGxvYWRNb3JlQ29udGFjdHNdKTtcclxuXHJcbiAgY29uc3Qgc2VsZWN0ZWRWYWx1ZXMgPSB1c2VNZW1vKCgpID0+IHtcclxuICAgIHJldHVybiBuZXcgU2V0KChzZWxlY3RlZCB8fCBbXSkubWFwKChzKSA9PiBTdHJpbmcocy52YWx1ZSkpKTtcclxuICB9LCBbc2VsZWN0ZWRdKTtcclxuXHJcbiAgY29uc3QgYXZhaWxhYmxlT3B0aW9ucyA9IHVzZU1lbW8oKCkgPT4ge1xyXG4gICAgLy8gSGlkZSBhbHJlYWR5IHNlbGVjdGVkIGNvbnRhY3RzIGZyb20gdGhlIGRyb3Bkb3duIGxpc3QuXHJcbiAgICByZXR1cm4gKG9wdGlvbnMgfHwgW10pLmZpbHRlcigobykgPT4gIXNlbGVjdGVkVmFsdWVzLmhhcyhTdHJpbmcoby52YWx1ZSkpKTtcclxuICB9LCBbb3B0aW9ucywgc2VsZWN0ZWRWYWx1ZXNdKTtcclxuXHJcbiAgY29uc3QgZmlsdGVyZWQgPSB1c2VNZW1vKCgpID0+IHtcclxuICAgIGNvbnN0IHEgPSBxdWVyeS50cmltKCkudG9Mb3dlckNhc2UoKTtcclxuICAgIGlmICghcSkgcmV0dXJuIGF2YWlsYWJsZU9wdGlvbnM7XHJcbiAgICByZXR1cm4gYXZhaWxhYmxlT3B0aW9ucy5maWx0ZXIoXHJcbiAgICAgIChvKSA9PiBvLnRleHQudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhxKSB8fCBvLmNhcmdvLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMocSkgfHwgby5lbXByZXNhLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMocSlcclxuICAgICk7XHJcbiAgfSwgW2F2YWlsYWJsZU9wdGlvbnMsIHF1ZXJ5XSk7XHJcbiAgY29uc3Qgc2hvdWxkU2hvd05vdEZvdW5kUm93ID0gc2hvd05vdEZvdW5kU3RhdGUgfHwgKCEhcXVlcnkudHJpbSgpICYmIGZpbHRlcmVkLmxlbmd0aCA9PT0gMCk7XHJcbiAgY29uc3QgcmVzb2x2ZWRBY3RpdmVJbmRleCA9XHJcbiAgICBmaWx0ZXJlZC5sZW5ndGggPiAwID8gTWF0aC5taW4oTWF0aC5tYXgoYWN0aXZlSW5kZXgsIDApLCBmaWx0ZXJlZC5sZW5ndGggLSAxKSA6IDA7XHJcbiAgY29uc3QgYWN0aXZlSWQgPVxyXG4gICAgb3BlbiAmJiBmaWx0ZXJlZFtyZXNvbHZlZEFjdGl2ZUluZGV4XSA/IGAke2lkQmFzZX0tY29udGFjdC1vcHQtJHtmaWx0ZXJlZFtyZXNvbHZlZEFjdGl2ZUluZGV4XS52YWx1ZX1gIDogdW5kZWZpbmVkO1xyXG5cclxuICBjb25zdCB0b2dnbGVPcHRpb24gPSAob3B0OiBDb250YWN0T3B0aW9uKSA9PiB7XHJcbiAgICBzZXRTZWxlY3RlZCgocHJldikgPT4ge1xyXG4gICAgICBjb25zdCBleGlzdHMgPSBwcmV2LnNvbWUoKHApID0+IHAudmFsdWUgPT09IG9wdC52YWx1ZSk7XHJcbiAgICAgIGlmIChleGlzdHMpIHJldHVybiBwcmV2LmZpbHRlcigocCkgPT4gcC52YWx1ZSAhPT0gb3B0LnZhbHVlKTtcclxuICAgICAgcmV0dXJuIFsuLi5wcmV2LCBvcHRdO1xyXG4gICAgfSk7XHJcbiAgICBzZXRTaG93Tm90Rm91bmRTdGF0ZShmYWxzZSk7XHJcbiAgICBzZXRRdWVyeShcIlwiKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBoYW5kbGVLZXlEb3duID0gKGV2OiBSZWFjdC5LZXlib2FyZEV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+KSA9PiB7XHJcbiAgICBoYW5kbGVDb21ib2JveEtleURvd24oZXYsIHtcclxuICAgICAgaXNPcGVuOiBvcGVuLFxyXG4gICAgICBzZXRPcGVuLFxyXG4gICAgICBvcHRpb25Db3VudDogZmlsdGVyZWQubGVuZ3RoLFxyXG4gICAgICBzZXRBY3RpdmVJbmRleCxcclxuICAgICAgb3Blbk9uQXJyb3c6IHRydWUsXHJcbiAgICAgIG9uQXJyb3dOYXZpZ2F0ZTogZW5zdXJlTG9hZGVkLFxyXG4gICAgICBvbkVudGVyV2hlbk9wZW46ICgpID0+IHtcclxuICAgICAgICBpZiAoZmlsdGVyZWQubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgdG9nZ2xlT3B0aW9uKGZpbHRlcmVkW3Jlc29sdmVkQWN0aXZlSW5kZXhdID8/IGZpbHRlcmVkWzBdKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChxdWVyeS50cmltKCkpIHtcclxuICAgICAgICAgIHNldFF1ZXJ5KFwiXCIpO1xyXG4gICAgICAgICAgc2V0U2hvd05vdEZvdW5kU3RhdGUodHJ1ZSk7XHJcbiAgICAgICAgICBzZXRPcGVuKHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgb25FbnRlcldoZW5DbG9zZWQ6IGFjY291bnROdW1cclxuICAgICAgICA/ICgpID0+IHtcclxuICAgICAgICAgICAgZW5zdXJlTG9hZGVkKCk7XHJcbiAgICAgICAgICAgIHNldE9wZW4odHJ1ZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgOiB1bmRlZmluZWQsXHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIiByZWY9e2NvbnRhaW5lclJlZn0+XHJcbiAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb3JtLWxhYmVsIGZvbnQtc2VtaWJvbGRcIiBodG1sRm9yPXtpbnB1dElkfT5cclxuICAgICAgICB7aW5kVChcIlZpc2l0c19DcmVhdGVfU2VhcmNoQ29udGFjdFwiLCBcIlNlYXJjaCBjb250YWN0XCIpfVxyXG4gICAgICA8L2xhYmVsPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlXCI+XHJcbiAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgIHJlZj17Ym94UmVmfVxyXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJyZWxhdGl2ZSB3LWZ1bGwgY3Vyc29yLWRlZmF1bHQgcm91bmRlZC1bNXB4XSBib3JkZXItc2xhdGUtMzAwIGJnLXdoaXRlIHRleHQtbGVmdCBzaGFkb3cteHMgZm9jdXMtd2l0aGluOmJvcmRlci1wcmltYXJ5IGZvY3VzLXdpdGhpbjpyaW5nLTIgZm9jdXMtd2l0aGluOnJpbmctcHJpbWFyeSBmb2N1cy13aXRoaW46cmluZy1vZmZzZXQtMCBzbTp0ZXh0LXNtXCJcclxuICAgICAgICAgID5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAgZ2FwLTEgcHgtMyBweS0yIG1pbi1oLTEwXCI+XHJcbiAgICAgICAgICAgIHtzZWxlY3RlZC5tYXAoKGMpID0+IChcclxuICAgICAgICAgICAgICA8c3BhblxyXG4gICAgICAgICAgICAgICAga2V5PXtjLnZhbHVlfVxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgcm91bmRlZC1tZCBiZy1wcmltYXJ5LzEwIHRleHQtc2xhdGUtNzAwIHB4LTIgcHktMSB0ZXh0LXhzXCJcclxuICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICB7Yy50ZXh0fVxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0U2VsZWN0ZWQoKHByZXYpID0+IHByZXYuZmlsdGVyKChzKSA9PiBzLnZhbHVlICE9PSBjLnZhbHVlKSl9XHJcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNzAwIGhvdmVyOnRleHQtc2xhdGUtNzAwLzgwXCJcclxuICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17aW5kVChcIkNvbW1vbl9EZWxldGVcIiwgXCJEZWxldGVcIil9XHJcbiAgICAgICAgICAgICAgICAgIHRpdGxlPXtpbmRUKFwiQ29tbW9uX0RlbGV0ZVwiLCBcIkRlbGV0ZVwiKX1cclxuICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgPFhNYXJrSWNvbiBjbGFzc05hbWU9XCJoLTQgdy00XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgLz5cclxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgICAgIGlkPXtpbnB1dElkfVxyXG4gICAgICAgICAgICAgIG5hbWU9e2Ake2lkQmFzZX0tY29udGFjdHMtcXVlcnlgfVxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXgtMSBtaW4tdy0zMCBiZy10cmFuc3BhcmVudCB0ZXh0LXNtIHNtOnRleHQtYmFzZSBsZWFkaW5nLTUgdGV4dC1zbGF0ZS05MDAgYm9yZGVyLW5vbmUgb3V0bGluZS1oaWRkZW4gcHgtMSBweS0xIGZvY3VzOnJpbmctMCBmb2N1czpib3JkZXItdHJhbnNwYXJlbnRcIlxyXG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgIHNldEFjdGl2ZUluZGV4KDApO1xyXG4gICAgICAgICAgICAgICAgc2V0U2hvd05vdEZvdW5kU3RhdGUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgc2V0UXVlcnkoZXZlbnQudGFyZ2V0LnZhbHVlKTtcclxuICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgIG9uS2V5RG93bj17aGFuZGxlS2V5RG93bn1cclxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17c2VsZWN0ZWQubGVuZ3RoID8gXCJcIiA6IGluZFQoXCJWaXNpdHNfQ3JlYXRlX0ZpbHRlclBsYWNlaG9sZGVyXCIsIFwiVHlwZSB0byBmaWx0ZXIuLi5cIil9XHJcbiAgICAgICAgICAgICAgYXV0b0NvbXBsZXRlPVwib2ZmXCJcclxuICAgICAgICAgICAgICByZWY9e2lucHV0UmVmfVxyXG4gICAgICAgICAgICAgIHJlYWRPbmx5PXshYWNjb3VudE51bX1cclxuICAgICAgICAgICAgICByb2xlPVwiY29tYm9ib3hcIlxyXG4gICAgICAgICAgICAgIGFyaWEtZXhwYW5kZWQ9e29wZW59XHJcbiAgICAgICAgICAgICAgYXJpYS1jb250cm9scz17bGlzdElkfVxyXG4gICAgICAgICAgICAgIGFyaWEtYWN0aXZlZGVzY2VuZGFudD17YWN0aXZlSWR9XHJcbiAgICAgICAgICAgICAgYXJpYS1hdXRvY29tcGxldGU9XCJsaXN0XCJcclxuICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtpbmRUKFwiVmlzaXRzX0NyZWF0ZV9TZWFyY2hDb250YWN0XCIsIFwiU2VhcmNoIGNvbnRhY3RcIil9XHJcbiAgICAgICAgICAgICAgb25Gb2N1cz17KCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZW5zdXJlTG9hZGVkKCk7XHJcbiAgICAgICAgICAgICAgICBzZXRPcGVuKHRydWUpO1xyXG4gICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIHsobG9hZGluZyB8fCBibG9ja2luZykgJiYgKFxyXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LXktMCByaWdodC05IGZsZXggaXRlbXMtY2VudGVyXCI+XHJcbiAgICAgICAgICAgICAgICA8U3Bpbm5lciAvPlxyXG4gICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQteS0wIHJpZ2h0LTAgZmxleCBpdGVtcy1jZW50ZXIgcHItMiB0ZXh0LXNsYXRlLTUwMCBob3Zlcjp0ZXh0LXNsYXRlLTYwMFwiXHJcbiAgICAgICAgICAgIGFyaWEtbGFiZWw9e29wZW4gPyBpbmRUKFwiRHJvcGRvd25fSGlkZU9wdGlvbnNcIiwgXCJIaWRlIG9wdGlvbnNcIikgOiBpbmRUKFwiRHJvcGRvd25fU2hvd09wdGlvbnNcIiwgXCJTaG93IG9wdGlvbnNcIil9XHJcbiAgICAgICAgICAgIGFyaWEtZXhwYW5kZWQ9e29wZW59XHJcbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcclxuICAgICAgICAgICAgICBpZiAoIWFjY291bnROdW0pIHJldHVybjtcclxuICAgICAgICAgICAgICBpZiAob3Blbikge1xyXG4gICAgICAgICAgICAgICAgc2V0T3BlbihmYWxzZSk7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGVuc3VyZUxvYWRlZCgpO1xyXG4gICAgICAgICAgICAgICAgc2V0T3Blbih0cnVlKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH19XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIHtvcGVuID8gPENoZXZyb25VcFN2ZyBjbGFzc05hbWU9XCJoLTUgdy01XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgLz4gOiA8Q2hldnJvbkRvd25TdmcgY2xhc3NOYW1lPVwiaC01IHctNVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIC8+fVxyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8RmxvYXRpbmdMaXN0XHJcbiAgICAgICAgICAgIGFuY2hvclJlZj17Ym94UmVmfVxyXG4gICAgICAgICAgICBvcGVuPXtvcGVufVxyXG4gICAgICAgICAgICB6SW5kZXg9ezM4MDAwMH1cclxuICAgICAgICAgICAgbWF4SGVpZ2h0Q2xhc3M9XCJtYXgtaC03MlwiXHJcbiAgICAgICAgICAgIHJvbGU9XCJsaXN0Ym94XCJcclxuICAgICAgICAgICAgcm91bmRlZENsYXNzPVwicm91bmRlZC1bNXB4XVwiXHJcbiAgICAgICAgICAgIHBvcnRhbENsYXNzTmFtZT17cG9ydGFsQ2xhc3NOYW1lfVxyXG4gICAgICAgICAgICBwYW5lbENsYXNzTmFtZT17cGFuZWxDbGFzc05hbWV9XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICA8ZGl2IHJlZj17bGlzdFJlZn0gaWQ9e2xpc3RJZH0gYXJpYS1tdWx0aXNlbGVjdGFibGU9XCJ0cnVlXCI+XHJcbiAgICAgICAgICAgIHtsb2FkaW5nICYmIChcclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHB4LTQgcHktMiB0ZXh0LXNtIHRleHQtc2xhdGUtNTAwXCI+XHJcbiAgICAgICAgICAgICAgICA8U3Bpbm5lciBzaXplPVwiaC00IHctNFwiIC8+XHJcbiAgICAgICAgICAgICAgICB7aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX1cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgeyFsb2FkaW5nICYmIG9wdGlvbnMubGVuZ3RoID09PSAwICYmIChcclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB4LTQgcHktMiB0ZXh0LXNtIHRleHQtc2xhdGUtNTAwXCI+XHJcbiAgICAgICAgICAgICAgICB7aGFzTG9hZGVkID8gaW5kVChcIlZpc2l0c19DcmVhdGVfTm9Db250YWN0c1wiLCBcIk5vIGNvbnRhY3RzXCIpIDogaW5kVChcIlZpc2l0c19DcmVhdGVfU2VsZWN0Q2xpZW50Rmlyc3RcIiwgXCJTZWxlY3QgYSBjbGllbnQgZmlyc3QuXCIpfVxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgICB7IWxvYWRpbmcgJiYgb3B0aW9ucy5sZW5ndGggPiAwICYmIGZpbHRlcmVkLmxlbmd0aCA9PT0gMCAmJiAoXHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJweC00IHB5LTIgdGV4dC1zbSB0ZXh0LXNsYXRlLTUwMFwiPlxyXG4gICAgICAgICAgICAgICAge3Nob3VsZFNob3dOb3RGb3VuZFJvd1xyXG4gICAgICAgICAgICAgICAgICA/IGluZFQoXCJDb21tb25fTm90Rm91bmRcIiwgXCJOb3QgZm91bmRcIilcclxuICAgICAgICAgICAgICAgICAgOiBpbmRUKFwiVmlzaXRzX0NyZWF0ZV9Ob01vcmVDb250YWN0c1wiLCBcIk5vIG1vcmUgY29udGFjdHMgYXZhaWxhYmxlXCIpfVxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgICB7IWxvYWRpbmcgJiZcclxuICAgICAgICAgICAgICBmaWx0ZXJlZC5tYXAoKG9wdCwgaWR4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzZWwgPSBzZWxlY3RlZC5zb21lKChzKSA9PiBzLnZhbHVlID09PSBvcHQudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaXNBY3RpdmUgPSBpZHggPT09IHJlc29sdmVkQWN0aXZlSW5kZXg7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgICAgICAgICAgICAga2V5PXtvcHQudmFsdWV9XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ9e2Ake2lkQmFzZX0tY29udGFjdC1vcHQtJHtvcHQudmFsdWV9YH1cclxuICAgICAgICAgICAgICAgICAgICByb2xlPVwib3B0aW9uXCJcclxuICAgICAgICAgICAgICAgICAgICBhcmlhLXNlbGVjdGVkPXtzZWx9XHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxyXG4gICAgICAgICAgICAgICAgICAgICAgXCJyZWxhdGl2ZSBmbGV4IHctZnVsbCBjdXJzb3ItZGVmYXVsdCBzZWxlY3Qtbm9uZSBpdGVtcy1zdGFydCBweS0yIHB4LTMgdGV4dC1sZWZ0IHRleHQtc21cIixcclxuICAgICAgICAgICAgICAgICAgICAgIGlzQWN0aXZlID8gXCJiZy1wcmltYXJ5IHRleHQtd2hpdGVcIiA6IHNlbCA/IFwiYmctcHJpbWFyeS8xMCB0ZXh0LXByaW1hcnlcIiA6IFwidGV4dC1zbGF0ZS05MDBcIlxyXG4gICAgICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICAgICAgb25Nb3VzZUVudGVyPXsoKSA9PiBzZXRBY3RpdmVJbmRleChpZHgpfVxyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHRvZ2dsZU9wdGlvbihvcHQpfVxyXG4gICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBmbGV4IGZsZXgtY29sIGdhcC0wLjUgcHItMlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtjbGFzc05hbWVzKFwiYmxvY2sgdHJ1bmNhdGVcIiwgc2VsID8gXCJmb250LW1lZGl1bVwiIDogXCJmb250LW5vcm1hbFwiKX0+e29wdC50ZXh0fTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImJsb2NrIHRleHQteHMgdGV4dC1zbGF0ZS02MDAgdHJ1bmNhdGVcIj57b3B0LmNhcmdvfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgIH0pfVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIHtibG9ja2luZyAmJiAoXHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIHotNzAwMDAgYmctd2hpdGUvNzAgYmFja2Ryb3AtYmx1ci1bMXB4XSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciByb3VuZGVkLVs1cHhdXCI+XHJcbiAgICAgICAgICAgICAgICA8U3Bpbm5lciBzaXplPVwiaC02IHctNlwiIC8+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICA8L0Zsb2F0aW5nTGlzdD5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsIGZsZXgganVzdGlmeS1lbmRcIj5cclxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNTAwIHRlY2gtaW5mb1wiPntzdGF0dXN9PC9zcGFuPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb250YWN0c0NvbWJvYm94O1xyXG4iLCAiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5mdW5jdGlvbiBYTWFya0ljb24oe1xuICB0aXRsZSxcbiAgdGl0bGVJZCxcbiAgLi4ucHJvcHNcbn0sIHN2Z1JlZikge1xuICByZXR1cm4gLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzdmdcIiwgT2JqZWN0LmFzc2lnbih7XG4gICAgeG1sbnM6IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIixcbiAgICB2aWV3Qm94OiBcIjAgMCAyMCAyMFwiLFxuICAgIGZpbGw6IFwiY3VycmVudENvbG9yXCIsXG4gICAgXCJhcmlhLWhpZGRlblwiOiBcInRydWVcIixcbiAgICBcImRhdGEtc2xvdFwiOiBcImljb25cIixcbiAgICByZWY6IHN2Z1JlZixcbiAgICBcImFyaWEtbGFiZWxsZWRieVwiOiB0aXRsZUlkXG4gIH0sIHByb3BzKSwgdGl0bGUgPyAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChcInRpdGxlXCIsIHtcbiAgICBpZDogdGl0bGVJZFxuICB9LCB0aXRsZSkgOiBudWxsLCAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChcInBhdGhcIiwge1xuICAgIGQ6IFwiTTYuMjggNS4yMmEuNzUuNzUgMCAwIDAtMS4wNiAxLjA2TDguOTQgMTBsLTMuNzIgMy43MmEuNzUuNzUgMCAxIDAgMS4wNiAxLjA2TDEwIDExLjA2bDMuNzIgMy43MmEuNzUuNzUgMCAxIDAgMS4wNi0xLjA2TDExLjA2IDEwbDMuNzItMy43MmEuNzUuNzUgMCAwIDAtMS4wNi0xLjA2TDEwIDguOTQgNi4yOCA1LjIyWlwiXG4gIH0pKTtcbn1cbmNvbnN0IEZvcndhcmRSZWYgPSAvKiNfX1BVUkVfXyovIFJlYWN0LmZvcndhcmRSZWYoWE1hcmtJY29uKTtcbmV4cG9ydCBkZWZhdWx0IEZvcndhcmRSZWY7IiwgIlx1RkVGRmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IENsaWVudFNlYXJjaENvbWJvYm94IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL3Zpc2l0YXMvQ2xpZW50U2VhcmNoQ29tYm9ib3gudHN4XCI7XHJcbmltcG9ydCBDb250YWN0c0NvbWJvYm94IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL3Zpc2l0YXMvQ29udGFjdHNDb21ib2JveC50c3hcIjtcclxuXHJcbmV4cG9ydCB0eXBlIENyZWF0ZVNlbGVjdGVkQ2xpZW50ID0ge1xyXG4gIHZhbHVlOiBzdHJpbmc7XHJcbiAgdGV4dDogc3RyaW5nO1xyXG4gIGNhcmdvPzogc3RyaW5nO1xyXG4gIGVtcHJlc2E/OiBzdHJpbmc7XHJcbn0gfCBudWxsO1xyXG5cclxuZXhwb3J0IHR5cGUgQ3JlYXRlU2VsZWN0ZWRDb250YWN0ID0ge1xyXG4gIHZhbHVlOiBzdHJpbmc7XHJcbiAgdGV4dDogc3RyaW5nO1xyXG4gIGNhcmdvOiBzdHJpbmc7XHJcbiAgZW1wcmVzYTogc3RyaW5nO1xyXG59O1xyXG5cclxudHlwZSBDcmVhdGVTdGVwQ2xpZW50U2VsZWN0aW9uUHJvcHMgPSB7XHJcbiAgc2VsZWN0ZWRDbGllbnQ6IENyZWF0ZVNlbGVjdGVkQ2xpZW50O1xyXG4gIHNlbGVjdGVkQ29udGFjdHM6IENyZWF0ZVNlbGVjdGVkQ29udGFjdFtdO1xyXG4gIG9uQ2xpZW50U2VsZWN0ZWQ6IChuZXh0Q2xpZW50OiBDcmVhdGVTZWxlY3RlZENsaWVudCkgPT4gdm9pZDtcclxuICBvbkNvbnRhY3RzQ2hhbmdlOiAobmV4dENvbnRhY3RzOiBDcmVhdGVTZWxlY3RlZENvbnRhY3RbXSkgPT4gdm9pZDtcclxuICBjbGllbnRMYWJlbDogc3RyaW5nO1xyXG4gIGNsaWVudFBsYWNlaG9sZGVyOiBzdHJpbmc7XHJcbiAgc2VsZWN0ZWRDb250YWN0c0NvdW50VGV4dDogc3RyaW5nO1xyXG59O1xyXG5cclxuLy8gUmVuZGVycyBzdGVwIDEgd2hlcmUgdXNlciBzZWxlY3RzIHRoZSBhY2NvdW50IGFuZCByZWxhdGVkIGNvbnRhY3RzLlxyXG5jb25zdCBDcmVhdGVTdGVwQ2xpZW50U2VsZWN0aW9uID0gKHtcclxuICBzZWxlY3RlZENsaWVudCxcclxuICBzZWxlY3RlZENvbnRhY3RzLFxyXG4gIG9uQ2xpZW50U2VsZWN0ZWQsXHJcbiAgb25Db250YWN0c0NoYW5nZSxcclxuICBjbGllbnRMYWJlbCxcclxuICBjbGllbnRQbGFjZWhvbGRlcixcclxuICBzZWxlY3RlZENvbnRhY3RzQ291bnRUZXh0LFxyXG59OiBDcmVhdGVTdGVwQ2xpZW50U2VsZWN0aW9uUHJvcHMpID0+IHtcclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTZcIj5cclxuICAgICAgPENsaWVudFNlYXJjaENvbWJvYm94XHJcbiAgICAgICAgdmFsdWU9e3NlbGVjdGVkQ2xpZW50fVxyXG4gICAgICAgIG9uU2VsZWN0ZWQ9e29uQ2xpZW50U2VsZWN0ZWR9XHJcbiAgICAgICAgbGFiZWw9e2NsaWVudExhYmVsfVxyXG4gICAgICAgIHBsYWNlaG9sZGVyPXtjbGllbnRQbGFjZWhvbGRlcn1cclxuICAgICAgICBwb3J0YWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxyXG4gICAgICAvPlxyXG5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTNcIj5cclxuICAgICAgICA8Q29udGFjdHNDb21ib2JveFxyXG4gICAgICAgICAgYWNjb3VudE51bT17c2VsZWN0ZWRDbGllbnQ/LnZhbHVlfVxyXG4gICAgICAgICAgdmFsdWU9e3NlbGVjdGVkQ29udGFjdHN9XHJcbiAgICAgICAgICBvbkNoYW5nZT17b25Db250YWN0c0NoYW5nZX1cclxuICAgICAgICAgIHBvcnRhbENsYXNzTmFtZT1cInZpc2l0YXMtdHlwb2dyYXBoeVwiXHJcbiAgICAgICAgLz5cclxuICAgICAgICB7c2VsZWN0ZWRDb250YWN0cy5sZW5ndGggPiAwICYmIChcclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXNsYXRlLTYwMFwiPlxyXG4gICAgICAgICAgICB7c2VsZWN0ZWRDb250YWN0c0NvdW50VGV4dH1cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICl9XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IENyZWF0ZVN0ZXBDbGllbnRTZWxlY3Rpb247XHJcbiIsICJcdUZFRkZpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBTaW5nbGVEYXRlUGlja2VyIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvU2luZ2xlRGF0ZVBpY2tlci50c3hcIjtcclxuaW1wb3J0IFNlbGVjdENvbWJvYm94IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvU2VsZWN0Q29tYm9ib3gudHN4XCI7XHJcbmltcG9ydCBWaXNpdE5hcnJhdGl2ZUZpZWxkcyBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy92aXNpdGFzL1Zpc2l0TmFycmF0aXZlRmllbGRzLnRzeFwiO1xyXG5cclxudHlwZSBTZWxlY3RPcHRpb24gPSB7XHJcbiAgdmFsdWU/OiBzdHJpbmcgfCBudW1iZXI7XHJcbiAgVmFsdWU/OiBzdHJpbmcgfCBudW1iZXI7XHJcbiAgdGV4dD86IHN0cmluZztcclxuICBUZXh0Pzogc3RyaW5nO1xyXG59O1xyXG5cclxudHlwZSBOYXJyYXRpdmVUYXBGaWVsZCA9IHtcclxuICBpZDogc3RyaW5nO1xyXG4gIGxhYmVsOiBzdHJpbmc7XHJcbiAgdmFsdWU6IHN0cmluZztcclxuICBjbGFzc05hbWU6IHN0cmluZztcclxuICBwb2ludGVyQmluZGluZ3M6IHtcclxuICAgIG9uUG9pbnRlckRvd24/OiBSZWFjdC5Qb2ludGVyRXZlbnRIYW5kbGVyPEhUTUxUZXh0QXJlYUVsZW1lbnQ+O1xyXG4gICAgb25Qb2ludGVyTW92ZT86IFJlYWN0LlBvaW50ZXJFdmVudEhhbmRsZXI8SFRNTFRleHRBcmVhRWxlbWVudD47XHJcbiAgICBvblBvaW50ZXJVcD86IFJlYWN0LlBvaW50ZXJFdmVudEhhbmRsZXI8SFRNTFRleHRBcmVhRWxlbWVudD47XHJcbiAgICBvblBvaW50ZXJDYW5jZWw/OiBSZWFjdC5Qb2ludGVyRXZlbnRIYW5kbGVyPEhUTUxUZXh0QXJlYUVsZW1lbnQ+O1xyXG4gIH07XHJcbn07XHJcblxyXG50eXBlIENyZWF0ZVN0ZXBWaXNpdERldGFpbHNQcm9wcyA9IHtcclxuICB0aXRsZTogc3RyaW5nO1xyXG4gIGRhdGVMYWJlbDogc3RyaW5nO1xyXG4gIHRyYW5zRGF0ZTogc3RyaW5nO1xyXG4gIG9uVHJhbnNEYXRlQ2hhbmdlOiAobmV4dFZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgdmlzaXRUeXBlTGFiZWw6IHN0cmluZztcclxuICB2aXNpdFR5cGVzOiBTZWxlY3RPcHRpb25bXTtcclxuICB2aXNpdFR5cGU6IHN0cmluZztcclxuICBvblZpc2l0VHlwZUNoYW5nZTogKG5leHRWYWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIHZpc2l0VHlwZVBsYWNlaG9sZGVyOiBzdHJpbmc7XHJcbiAgdmlzaXRUeXBlSW52YWxpZDogYm9vbGVhbjtcclxuICBkZXNjcmlwdGlvbkxhYmVsOiBzdHJpbmc7XHJcbiAgZGVzY3JpcHRpb25WYWx1ZTogc3RyaW5nO1xyXG4gIGRlc2NyaXB0aW9uQ2xhc3NOYW1lOiBzdHJpbmc7XHJcbiAgb25EZXNjcmlwdGlvbkNoYW5nZTogKG5leHRWYWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIHRhcEZpZWxkczogTmFycmF0aXZlVGFwRmllbGRbXTtcclxuICBzdGF0dXM6IHN0cmluZztcclxufTtcclxuXHJcbi8vIFJlbmRlcnMgc3RlcCAyIHdpdGggdmlzaXQgbWV0YWRhdGEgYW5kIG5hcnJhdGl2ZSBmaWVsZHMuXHJcbmNvbnN0IENyZWF0ZVN0ZXBWaXNpdERldGFpbHMgPSAoe1xyXG4gIHRpdGxlLFxyXG4gIGRhdGVMYWJlbCxcclxuICB0cmFuc0RhdGUsXHJcbiAgb25UcmFuc0RhdGVDaGFuZ2UsXHJcbiAgdmlzaXRUeXBlTGFiZWwsXHJcbiAgdmlzaXRUeXBlcyxcclxuICB2aXNpdFR5cGUsXHJcbiAgb25WaXNpdFR5cGVDaGFuZ2UsXHJcbiAgdmlzaXRUeXBlUGxhY2Vob2xkZXIsXHJcbiAgdmlzaXRUeXBlSW52YWxpZCxcclxuICBkZXNjcmlwdGlvbkxhYmVsLFxyXG4gIGRlc2NyaXB0aW9uVmFsdWUsXHJcbiAgZGVzY3JpcHRpb25DbGFzc05hbWUsXHJcbiAgb25EZXNjcmlwdGlvbkNoYW5nZSxcclxuICB0YXBGaWVsZHMsXHJcbiAgc3RhdHVzLFxyXG59OiBDcmVhdGVTdGVwVmlzaXREZXRhaWxzUHJvcHMpID0+IHtcclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzaGFkb3cteHMgZ2xhc3MtcGFuZWwgcC00IHNwYWNlLXktNCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCByb3VuZGVkLTJ4bFwiPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtYmFzZSBmb250LXNlbWlib2xkIHRleHQtc2xhdGUtOTAwIGJvcmRlci1iIGJvcmRlci1zbGF0ZS0yMDAgcGItM1wiPlxyXG4gICAgICAgIHt0aXRsZX1cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMiBnYXAtNFwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidmlzaXRhLWZpZWxkLXRleHRcIj5cclxuICAgICAgICAgIDxTaW5nbGVEYXRlUGlja2VyIGxhYmVsPXtkYXRlTGFiZWx9IHZhbHVlPXt0cmFuc0RhdGV9IG9uQ2hhbmdlPXtvblRyYW5zRGF0ZUNoYW5nZX0gLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8U2VsZWN0Q29tYm9ib3hcclxuICAgICAgICAgIGxhYmVsPXt2aXNpdFR5cGVMYWJlbH1cclxuICAgICAgICAgIG9wdGlvbnM9e3Zpc2l0VHlwZXN9XHJcbiAgICAgICAgICB2YWx1ZT17dmlzaXRUeXBlfVxyXG4gICAgICAgICAgb25DaGFuZ2U9eyhuZXh0VmFsdWUpID0+IG9uVmlzaXRUeXBlQ2hhbmdlKFN0cmluZyhuZXh0VmFsdWUgPz8gXCJcIikpfVxyXG4gICAgICAgICAgcGxhY2Vob2xkZXI9e3Zpc2l0VHlwZVBsYWNlaG9sZGVyfVxyXG4gICAgICAgICAgaW52YWxpZD17dmlzaXRUeXBlSW52YWxpZH1cclxuICAgICAgICAgIGVtaXRPblZhbHVlQ2hhbmdlXHJcbiAgICAgICAgICBwb3J0YWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxyXG4gICAgICAgIC8+XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgPFZpc2l0TmFycmF0aXZlRmllbGRzXHJcbiAgICAgICAgZGVzY3JpcHRpb25MYWJlbD17ZGVzY3JpcHRpb25MYWJlbH1cclxuICAgICAgICBkZXNjcmlwdGlvblZhbHVlPXtkZXNjcmlwdGlvblZhbHVlfVxyXG4gICAgICAgIGRlc2NyaXB0aW9uQ2xhc3NOYW1lPXtkZXNjcmlwdGlvbkNsYXNzTmFtZX1cclxuICAgICAgICBvbkRlc2NyaXB0aW9uQ2hhbmdlPXtvbkRlc2NyaXB0aW9uQ2hhbmdlfVxyXG4gICAgICAgIHRhcEZpZWxkcz17dGFwRmllbGRzfVxyXG4gICAgICAvPlxyXG5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtM1wiPlxyXG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc20gdGV4dC1zbGF0ZS01MDBcIj57c3RhdHVzfTwvc3Bhbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ3JlYXRlU3RlcFZpc2l0RGV0YWlscztcclxuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IENyZWF0ZUZvcm0gZnJvbSBcIi4vQ3JlYXRlRm9ybS50c3hcIjtcclxuaW1wb3J0IFZpc2l0YXNQYWdlUHJvdmlkZXJzIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvVmlzaXRhc1BhZ2VQcm92aWRlcnMudHN4XCI7XHJcbmltcG9ydCB7IG1vdW50UmVhY3RJc2xhbmQsIG1vdW50V2hlbkRvY3VtZW50UmVhZHkgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvcmVhY3RJc2xhbmQudHN4XCI7XHJcblxyXG4vLyBQYWdlIGVudHJ5IGZvciB0aGUgdmlzaXRhcyBjcmVhdGUgaXNsYW5kLlxyXG5jb25zdCBDcmVhdGVQYWdlID0gKCkgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8VmlzaXRhc1BhZ2VQcm92aWRlcnM+XHJcbiAgICAgIDxDcmVhdGVGb3JtIC8+XHJcbiAgICA8L1Zpc2l0YXNQYWdlUHJvdmlkZXJzPlxyXG4gICk7XHJcbn07XHJcblxyXG5jb25zdCBtb3VudCA9ICgpID0+IHtcclxuICBjb25zdCByb290RWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpc2l0YXMtYXBwLXJvb3RcIik7XHJcbiAgaWYgKCFyb290RWwpIHJldHVybjtcclxuXHJcbiAgbW91bnRSZWFjdElzbGFuZChyb290RWwsIDxDcmVhdGVQYWdlIC8+KTtcclxufTtcclxuXHJcbm1vdW50V2hlbkRvY3VtZW50UmVhZHkobW91bnQpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ3JlYXRlUGFnZTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7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QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLE9BQU8sS0FBSyxpQ0FBaUMsZUFBZTtBQUFBLFFBQzVELFdBQVcsS0FBSyw0QkFBNEIsTUFBTTtBQUFBLFFBQ2xEO0FBQUEsUUFDQSxtQkFBbUI7QUFBQSxRQUNuQixnQkFBZ0IsS0FBSyxpQ0FBaUMsWUFBWTtBQUFBLFFBQ2xFO0FBQUEsUUFDQTtBQUFBLFFBQ0EsbUJBQW1CO0FBQUEsUUFDbkIsc0JBQXNCLEtBQUssdUNBQXVDLGFBQWE7QUFBQSxRQUMvRTtBQUFBLFFBQ0E7QUFBQSxRQUNBLGtCQUFrQjtBQUFBLFFBQ2xCLHNCQUFzQjtBQUFBLFFBQ3RCLHFCQUFxQjtBQUFBLFFBQ3JCLFdBQVc7QUFBQSxVQUNUO0FBQUEsWUFDRSxJQUFJO0FBQUEsWUFDSixPQUFPO0FBQUEsWUFDUCxPQUFPO0FBQUEsWUFDUCxXQUFXO0FBQUEsWUFDWCxpQkFBaUI7QUFBQSxVQUNuQjtBQUFBLFVBQ0E7QUFBQSxZQUNFLElBQUk7QUFBQSxZQUNKLE9BQU87QUFBQSxZQUNQLE9BQU87QUFBQSxZQUNQLFdBQVc7QUFBQSxZQUNYLGlCQUFpQjtBQUFBLFVBQ25CO0FBQUEsVUFDQTtBQUFBLFlBQ0UsSUFBSTtBQUFBLFlBQ0osT0FBTztBQUFBLFlBQ1AsT0FBTztBQUFBLFlBQ1AsV0FBVztBQUFBLFlBQ1gsaUJBQWlCO0FBQUEsVUFDbkI7QUFBQSxRQUNGO0FBQUEsUUFDQTtBQUFBO0FBQUEsSUFDRjtBQUFBLEtBRUo7QUFFSjtBQUdlLFNBQVIsYUFBOEI7QUFDbkMsU0FDRSw2Q0FBQyw0QkFBaUIsaUJBQWlCLEtBQUssK0JBQStCLDBFQUEwRSxHQUMvSSx1REFBQyxjQUFXLEdBQ2Q7QUFFSjs7O0FVM1hNLElBQUFDLHNCQUFBO0FBSE4sSUFBTSxhQUFhLE1BQU07QUFDdkIsU0FDRSw2Q0FBQyxnQ0FDQyx1REFBQyxjQUFXLEdBQ2Q7QUFFSjtBQUVBLElBQU0sUUFBUSxNQUFNO0FBQ2xCLFFBQU0sU0FBUyxTQUFTLGVBQWUsa0JBQWtCO0FBQ3pELE1BQUksQ0FBQyxPQUFRO0FBRWIsbUJBQWlCLFFBQVEsNkNBQUMsY0FBVyxDQUFFO0FBQ3pDO0FBRUEsdUJBQXVCLEtBQUs7QUFFNUIsSUFBTyxxQkFBUTsiLAogICJuYW1lcyI6IFsiaW1wb3J0X3JlYWN0IiwgImNhbkFjY2VzcyIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJ2YWx1ZSIsICJSZWFjdCIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJSZWFjdCIsICJpbXBvcnRfanN4X3J1bnRpbWUiXQp9Cg==
