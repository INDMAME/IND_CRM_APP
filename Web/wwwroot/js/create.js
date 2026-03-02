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
import "./chunks/chunk-QO7GVWVB.js";
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
} from "./chunks/chunk-3JL4YUTN.js";
import {
  getSessionJsonWithExpiry,
  getSessionValueWithExpiry,
  setSessionJsonWithExpiry
} from "./chunks/chunk-7SKLSV7K.js";
import {
  SingleDatePicker
} from "./chunks/chunk-AS4EE5L2.js";
import {
  handleComboboxKeyDown
} from "./chunks/chunk-6HMZLOGF.js";
import {
  SelectCombobox_default
} from "./chunks/chunk-XULPHUDU.js";
import {
  ChevronDownSvg,
  ChevronUpSvg,
  FloatingList_default,
  useOutsideClick
} from "./chunks/chunk-6YXFJB4W.js";
import {
  ConfirmModal,
  useConfirmDialog,
  wait
} from "./chunks/chunk-MC6PU3KM.js";
import {
  flashActionMark,
  setHistoryFilterForDate
} from "./chunks/chunk-K7MECJ5E.js";
import {
  VisitasPageProviders_default
} from "./chunks/chunk-EVHUYAZN.js";
import {
  Spinner_default,
  canAccess,
  classNames,
  fetchJson,
  indFormat,
  indT,
  showPermissionModal
} from "./chunks/chunk-U25S3E2U.js";
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvY3JlYWNpb24vQ3JlYXRlRm9ybS50c3giLCAiLi4vcmVhY3Qvc3JjL2hvb2tzL3VzZVRvcGJhci50cyIsICIuLi9yZWFjdC9zcmMvaG9va3MvdXNlQ3JlYXRlRHJhZnQudHMiLCAiLi4vcmVhY3Qvc3JjL3V0aWxzL2dsb2JhbFNwaW5uZXIudHMiLCAiLi4vcmVhY3Qvc3JjL2hvb2tzL3VzZUNyZWF0ZVN1Ym1pdC50cyIsICIuLi9yZWFjdC9zcmMvdXRpbHMvaW5kSWRzLnRzIiwgIi4uL3JlYWN0L3NyYy9jb21wb25lbnRzL3Zpc2l0YXMvQ29udGFjdHNDb21ib2JveC50c3giLCAiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BoZXJvaWNvbnMvcmVhY3QvMjAvc29saWQvZXNtL1hNYXJrSWNvbi5qcyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9jcmVhY2lvbi9DcmVhdGVTdGVwQ2xpZW50U2VsZWN0aW9uLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9jcmVhY2lvbi9DcmVhdGVTdGVwVmlzaXREZXRhaWxzLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9jcmVhY2lvbi9DcmVhdGVQYWdlLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiXHVGRUZGaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlU3RhdGUsIHVzZVJlZiB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgQ29uZmlybU1vZGFsIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvQ29uZmlybU1vZGFsLnRzeFwiO1xuaW1wb3J0IEFwcEVycm9yQm91bmRhcnkgZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9BcHBFcnJvckJvdW5kYXJ5LnRzeFwiO1xuaW1wb3J0IHsgdXNlVmlzaXRhcyB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VWaXNpdGFzLnRzXCI7XG5pbXBvcnQgeyB1c2VUYXBHdWFyZCB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VUYXBHdWFyZC50c1wiO1xuaW1wb3J0IHsgdXNlVG9wYmFyIH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZVRvcGJhci50c1wiO1xuaW1wb3J0IHsgdXNlQ29uZmlybURpYWxvZyB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VDb25maXJtRGlhbG9nLnRzXCI7XG5pbXBvcnQgeyB1c2VDcmVhdGVEcmFmdCB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VDcmVhdGVEcmFmdC50c1wiO1xuaW1wb3J0IHsgdXNlQ3JlYXRlU3VibWl0IH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZUNyZWF0ZVN1Ym1pdC50c1wiO1xuaW1wb3J0IHsgdXNlVGV4dEVkaXRvckZpZWxkcyB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VUZXh0RWRpdG9yRmllbGRzLnRzXCI7XG5pbXBvcnQgQ3JlYXRlU3RlcENsaWVudFNlbGVjdGlvbiwgeyBDcmVhdGVTZWxlY3RlZENsaWVudCwgQ3JlYXRlU2VsZWN0ZWRDb250YWN0IH0gZnJvbSBcIi4vQ3JlYXRlU3RlcENsaWVudFNlbGVjdGlvbi50c3hcIjtcbmltcG9ydCBDcmVhdGVTdGVwVmlzaXREZXRhaWxzIGZyb20gXCIuL0NyZWF0ZVN0ZXBWaXNpdERldGFpbHMudHN4XCI7XG5pbXBvcnQgeyBjbGFzc05hbWVzIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2NsYXNzTmFtZXMudHNcIjtcbmltcG9ydCB7IGluZEZvcm1hdCwgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgeyBjYW5BY2Nlc3MsIHNob3dQZXJtaXNzaW9uTW9kYWwgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvcGVybWlzc2lvbnMudHNcIjtcbmltcG9ydCB7IHNldFByZXZpZXdBbmNob3IsIHNob3dQcmV2aWV3VG9vbHRpcCwgaXNPdmVyZmxvd2luZyB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9wcmV2aWV3VG9vbHRpcC50c1wiO1xuaW1wb3J0IHsgbmF2aWdhdGVUb1RleHRFZGl0b3JGaWVsZCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy90ZXh0RWRpdG9yTmF2aWdhdGlvbi50c1wiO1xuaW1wb3J0IHsgZmxhc2hBY3Rpb25NYXJrIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3Zpc2l0YXNIaXN0b3J5LnRzXCI7XG5cclxuZnVuY3Rpb24gVmlzaXRhc0FwcCgpIHtcbiAgY29uc3QgeyB2aXNpdFR5cGVzLCBhc2lzdGVudGVUaXBvcyB9ID0gdXNlVmlzaXRhcygpO1xuICBjb25zdCBjYW5DcmVhdGVWaXNpdCA9IGNhbkFjY2VzcyhcIlZJU0lUQVNfQ1JFQUNJT05cIiwgXCJBZGRcIik7XG4gIGNvbnN0IGNhblJvbGxiYWNrRGVsZXRlID0gY2FuQWNjZXNzKFwiVklTSVRBU19ISVNUT1JJQUxcIiwgXCJGdWxsQWNjZXNzXCIpO1xuXHJcbiAgY29uc3QgZmllbGRJZENvbWVudGFyaW9zID0gXCJWaXNpdGEuQ3JlYXRlLkNvbWVudGFyaW9zXCI7XHJcbiAgY29uc3QgZmllbGRJZEFudGVjZWRlbnRlcyA9IFwiVmlzaXRhLkNyZWF0ZS5BbnRlY2VkZW50ZXNcIjtcclxuICBjb25zdCBmaWVsZElkQ29uY2x1c2lvbmVzID0gXCJWaXNpdGEuQ3JlYXRlLkNvbmNsdXNpb25lc1wiO1xyXG5cclxuICBjb25zdCBbc3RlcCwgc2V0U3RlcF0gPSB1c2VTdGF0ZSgxKTtcclxuICBjb25zdCBbc2VsZWN0ZWRDbGllbnQsIHNldFNlbGVjdGVkQ2xpZW50XSA9IHVzZVN0YXRlPENyZWF0ZVNlbGVjdGVkQ2xpZW50PihudWxsKTtcbiAgY29uc3QgW3NlbGVjdGVkQ29udGFjdHMsIHNldFNlbGVjdGVkQ29udGFjdHNdID0gdXNlU3RhdGU8Q3JlYXRlU2VsZWN0ZWRDb250YWN0W10+KFtdKTtcbiAgY29uc3QgdG9kYXlTdHJpbmcgPSAoKSA9PiB7XHJcbiAgICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKCk7XHJcbiAgICBjb25zdCB5eXl5ID0gdG9kYXkuZ2V0RnVsbFllYXIoKTtcclxuICAgIGNvbnN0IG1tID0gU3RyaW5nKHRvZGF5LmdldE1vbnRoKCkgKyAxKS5wYWRTdGFydCgyLCBcIjBcIik7XHJcbiAgICBjb25zdCBkZCA9IFN0cmluZyh0b2RheS5nZXREYXRlKCkpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcclxuICAgIHJldHVybiBgJHt5eXl5fS0ke21tfS0ke2RkfWA7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgZGVmYXVsdFZpc2l0VHlwZSA9IFN0cmluZyh2aXNpdFR5cGVzWzBdPy52YWx1ZSA/PyB2aXNpdFR5cGVzWzBdPy5WYWx1ZSA/PyBcIlwiKTtcbiAgY29uc3QgZGVmYXVsdEFzaXN0ZW50ZVRpcG8gPSBTdHJpbmcoYXNpc3RlbnRlVGlwb3NbMF0/LnZhbHVlID8/IGFzaXN0ZW50ZVRpcG9zWzBdPy5WYWx1ZSA/PyBcIjBcIik7XG5cbiAgY29uc3QgW3Zpc2l0VHlwZSwgc2V0VmlzaXRUeXBlXSA9IHVzZVN0YXRlPHN0cmluZz4oZGVmYXVsdFZpc2l0VHlwZSk7XG4gIGNvbnN0IFt0cmFuc0RhdGUsIHNldFRyYW5zRGF0ZV0gPSB1c2VTdGF0ZSgoKSA9PiB0b2RheVN0cmluZygpKTtcclxuICBjb25zdCBbZGVzY3JpcHRpb24sIHNldERlc2NyaXB0aW9uXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtjb21lbnRhcmlvcywgc2V0Q29tZW50YXJpb3NdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW2FudGVjZWRlbnRlcywgc2V0QW50ZWNlZGVudGVzXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtjb25jbHVzaW9uZXMsIHNldENvbmNsdXNpb25lc10gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbc3RhdHVzLCBzZXRTdGF0dXNdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtidXN5LCBzZXRCdXN5XSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3Nob3dSZXF1aXJlZCwgc2V0U2hvd1JlcXVpcmVkXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW21vZGFsRXJyb3IsIHNldE1vZGFsRXJyb3JdID0gdXNlU3RhdGUoXCJcIik7XG5cclxuICBjb25zdCB7IG1vZGFsLCBvcGVuQ29uZmlybSwgY2xvc2VDb25maXJtLCBoYW5kbGVDb25maXJtIH0gPSB1c2VDb25maXJtRGlhbG9nKHtcbiAgICBkZWZhdWx0Q29uZmlybVRleHQ6IGluZFQoXCJDb25maXJtX1llc1wiLCBcIkNvbmZpcm1fWWVzXCIpLFxuICAgIGRlZmF1bHRDYW5jZWxUZXh0OiBpbmRUKFwiQ29uZmlybV9Ob1wiLCBcIkNvbmZpcm1fTm9cIilcbiAgfSk7XG5cclxuICBjb25zdCBoYW5kbGVNb2RhbENvbmZpcm0gPSBSZWFjdC51c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XHJcbiAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xyXG4gICAgYXdhaXQgaGFuZGxlQ29uZmlybSh7XHJcbiAgICAgIGJ1c3ksXHJcbiAgICAgIG9uRXJyb3I6IChtc2cpID0+IHtcclxuICAgICAgICBzZXRNb2RhbEVycm9yKG1zZyk7XHJcbiAgICAgICAgc2V0U3RhdHVzKG1zZyk7XHJcbiAgICAgICAgZmxhc2hBY3Rpb25NYXJrKFwiZXJyb3JQcm9jZXNzXCIsIDE1MDApO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9LCBbYnVzeSwgaGFuZGxlQ29uZmlybV0pO1xyXG5cclxuICBjb25zdCBtb2RhbExvYWRpbmdUZXh0ID0gaW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiQ29tbW9uX0xvYWRpbmdcIik7XG4gIGNvbnN0IG1vZGFsQ2FuY2VsVGV4dCA9IG1vZGFsLmNhbmNlbFRleHQgfHwgaW5kVChcIkNvbmZpcm1fTm9cIiwgXCJDb25maXJtX05vXCIpO1xuICBjb25zdCBtb2RhbENvbmZpcm1UZXh0ID0gYnVzeVxuICAgID8gbW9kYWxMb2FkaW5nVGV4dFxuICAgIDogKCFidXN5ICYmIG1vZGFsRXJyb3IgPyBpbmRUKFwiQ29tbW9uX09LXCIsIFwiQ29tbW9uX09LXCIpIDogKG1vZGFsLmNvbmZpcm1UZXh0IHx8IGluZFQoXCJDb25maXJtX1llc1wiLCBcIkNvbmZpcm1fWWVzXCIpKSk7XG5cclxuICBjb25zdCBoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm0gPSBSZWFjdC51c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAoIWJ1c3kgJiYgbW9kYWxFcnJvcikge1xyXG4gICAgICBjbG9zZUNvbmZpcm0oKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaGFuZGxlTW9kYWxDb25maXJtKCk7XHJcbiAgfSwgW2J1c3ksIG1vZGFsRXJyb3IsIGNsb3NlQ29uZmlybSwgaGFuZGxlTW9kYWxDb25maXJtXSk7XHJcblxyXG4gIGNvbnN0IGRyYWZ0U25hcHNob3QgPSB1c2VNZW1vKFxuICAgICgpID0+ICh7XG4gICAgICBzZWxlY3RlZENsaWVudCxcbiAgICAgIHNlbGVjdGVkQ29udGFjdHMsXG4gICAgICB2aXNpdFR5cGUsXG4gICAgICB0cmFuc0RhdGUsXG4gICAgICBkZXNjcmlwdGlvbixcbiAgICAgIGNvbWVudGFyaW9zLFxuICAgICAgYW50ZWNlZGVudGVzLFxuICAgICAgY29uY2x1c2lvbmVzLFxuICAgICAgc3RlcCxcbiAgICB9KSxcbiAgICBbc2VsZWN0ZWRDbGllbnQsIHNlbGVjdGVkQ29udGFjdHMsIHZpc2l0VHlwZSwgdHJhbnNEYXRlLCBkZXNjcmlwdGlvbiwgY29tZW50YXJpb3MsIGFudGVjZWRlbnRlcywgY29uY2x1c2lvbmVzLCBzdGVwXVxuICApO1xuXG4gIGNvbnN0IHsgcGVyc2lzdERyYWZ0Tm93IH0gPSB1c2VDcmVhdGVEcmFmdCh7XG4gICAgZHJhZnRTbmFwc2hvdCxcbiAgICBzZXRTZWxlY3RlZENsaWVudCxcbiAgICBzZXRTZWxlY3RlZENvbnRhY3RzLFxuICAgIHNldFZpc2l0VHlwZSxcbiAgICBzZXRUcmFuc0RhdGUsXG4gICAgc2V0RGVzY3JpcHRpb24sXG4gICAgc2V0Q29tZW50YXJpb3MsXG4gICAgc2V0QW50ZWNlZGVudGVzLFxuICAgIHNldENvbmNsdXNpb25lcyxcbiAgICBzZXRTdGVwLFxuICB9KTtcblxyXG4gIC8vIE9wZW5zIHRoZSBmdWxsLXNjcmVlbiB0ZXh0IGVkaXRvciBmb3IgYSBtdWx0aWxpbmUgZmllbGQuXG4gIGNvbnN0IG9wZW5UZXh0RWRpdG9yID0gUmVhY3QudXNlQ2FsbGJhY2soXG4gICAgKGZpZWxkSWQ6IHN0cmluZywgZmllbGRMYWJlbDogc3RyaW5nLCBmaWVsZFZhbHVlOiBzdHJpbmcsIG9wdGlvbnM6IHsgYWxsb3dFZGl0PzogYm9vbGVhbiB9ID0ge30pID0+IHtcbiAgICAgIG5hdmlnYXRlVG9UZXh0RWRpdG9yRmllbGQoe1xuICAgICAgICBmaWVsZElkLFxuICAgICAgICBmaWVsZExhYmVsLFxuICAgICAgICBmaWVsZFZhbHVlLFxuICAgICAgICBhbGxvd0VkaXQ6IG9wdGlvbnM/LmFsbG93RWRpdCAhPT0gZmFsc2UsXG4gICAgICAgIGJlZm9yZU5hdmlnYXRlOiBwZXJzaXN0RHJhZnROb3csXG4gICAgICB9KTtcbiAgICB9LFxuICAgIFtwZXJzaXN0RHJhZnROb3ddXG4gICk7XG5cclxuICBjb25zdCBoYW5kbGVDb21lbnRhcmlvc1RhcCA9IFJlYWN0LnVzZUNhbGxiYWNrKChldmVudCkgPT4ge1xyXG4gICAgaWYgKGJ1c3kpIHJldHVybjtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBvcGVuVGV4dEVkaXRvcihmaWVsZElkQ29tZW50YXJpb3MsIGluZFQoXCJWaXNpdHNfRmllbGRfQ29tbWVudHNcIiwgXCJDb21tZW50c1wiKSwgY29tZW50YXJpb3MpO1xyXG4gIH0sIFtidXN5LCBjb21lbnRhcmlvcywgb3BlblRleHRFZGl0b3JdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQ29tZW50YXJpb3NIb2xkID0gUmVhY3QudXNlQ2FsbGJhY2soKHRhcmdldCwgY2xpZW50WSkgPT4ge1xyXG4gICAgaWYgKCF0YXJnZXQgfHwgIWlzT3ZlcmZsb3dpbmcodGFyZ2V0KSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgc2V0UHJldmlld0FuY2hvcih0YXJnZXQpO1xyXG4gICAgcmV0dXJuIHNob3dQcmV2aWV3VG9vbHRpcChTdHJpbmcoY29tZW50YXJpb3MgfHwgXCJcIiksIGNsaWVudFkpO1xyXG4gIH0sIFtjb21lbnRhcmlvc10pO1xyXG5cclxuICBjb25zdCBoYW5kbGVBbnRlY2VkZW50ZXNUYXAgPSBSZWFjdC51c2VDYWxsYmFjaygoZXZlbnQpID0+IHtcclxuICAgIGlmIChidXN5KSByZXR1cm47XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgb3BlblRleHRFZGl0b3IoZmllbGRJZEFudGVjZWRlbnRlcywgaW5kVChcIlZpc2l0c19GaWVsZF9CYWNrZ3JvdW5kXCIsIFwiQmFja2dyb3VuZFwiKSwgYW50ZWNlZGVudGVzKTtcclxuICB9LCBbYnVzeSwgYW50ZWNlZGVudGVzLCBvcGVuVGV4dEVkaXRvcl0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVBbnRlY2VkZW50ZXNIb2xkID0gUmVhY3QudXNlQ2FsbGJhY2soKHRhcmdldCwgY2xpZW50WSkgPT4ge1xyXG4gICAgaWYgKCF0YXJnZXQgfHwgIWlzT3ZlcmZsb3dpbmcodGFyZ2V0KSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgc2V0UHJldmlld0FuY2hvcih0YXJnZXQpO1xyXG4gICAgcmV0dXJuIHNob3dQcmV2aWV3VG9vbHRpcChTdHJpbmcoYW50ZWNlZGVudGVzIHx8IFwiXCIpLCBjbGllbnRZKTtcclxuICB9LCBbYW50ZWNlZGVudGVzXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUNvbmNsdXNpb25lc1RhcCA9IFJlYWN0LnVzZUNhbGxiYWNrKChldmVudCkgPT4ge1xyXG4gICAgaWYgKGJ1c3kpIHJldHVybjtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBvcGVuVGV4dEVkaXRvcihmaWVsZElkQ29uY2x1c2lvbmVzLCBpbmRUKFwiVmlzaXRzX0ZpZWxkX0NvbmNsdXNpb25zXCIsIFwiQ29uY2x1c2lvbnNcIiksIGNvbmNsdXNpb25lcyk7XHJcbiAgfSwgW2J1c3ksIGNvbmNsdXNpb25lcywgb3BlblRleHRFZGl0b3JdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQ29uY2x1c2lvbmVzSG9sZCA9IFJlYWN0LnVzZUNhbGxiYWNrKCh0YXJnZXQsIGNsaWVudFkpID0+IHtcclxuICAgIGlmICghdGFyZ2V0IHx8ICFpc092ZXJmbG93aW5nKHRhcmdldCkpIHJldHVybiBmYWxzZTtcclxuICAgIHNldFByZXZpZXdBbmNob3IodGFyZ2V0KTtcclxuICAgIHJldHVybiBzaG93UHJldmlld1Rvb2x0aXAoU3RyaW5nKGNvbmNsdXNpb25lcyB8fCBcIlwiKSwgY2xpZW50WSk7XHJcbiAgfSwgW2NvbmNsdXNpb25lc10pO1xyXG5cclxuICBjb25zdCBjb21lbnRhcmlvc1RhcCA9IHVzZVRhcEd1YXJkKGhhbmRsZUNvbWVudGFyaW9zVGFwLCBoYW5kbGVDb21lbnRhcmlvc0hvbGQpO1xuICBjb25zdCBhbnRlY2VkZW50ZXNUYXAgPSB1c2VUYXBHdWFyZChoYW5kbGVBbnRlY2VkZW50ZXNUYXAsIGhhbmRsZUFudGVjZWRlbnRlc0hvbGQpO1xuICBjb25zdCBjb25jbHVzaW9uZXNUYXAgPSB1c2VUYXBHdWFyZChoYW5kbGVDb25jbHVzaW9uZXNUYXAsIGhhbmRsZUNvbmNsdXNpb25lc0hvbGQpO1xuXG4gIGNvbnN0IHRleHRFZGl0b3JCaW5kaW5ncyA9IHVzZU1lbW8oXG4gICAgKCkgPT4gW1xuICAgICAgeyBmaWVsZElkOiBmaWVsZElkQ29tZW50YXJpb3MsIGFwcGx5VmFsdWU6IHNldENvbWVudGFyaW9zIH0sXG4gICAgICB7IGZpZWxkSWQ6IGZpZWxkSWRBbnRlY2VkZW50ZXMsIGFwcGx5VmFsdWU6IHNldEFudGVjZWRlbnRlcyB9LFxuICAgICAgeyBmaWVsZElkOiBmaWVsZElkQ29uY2x1c2lvbmVzLCBhcHBseVZhbHVlOiBzZXRDb25jbHVzaW9uZXMgfSxcbiAgICBdLFxuICAgIFtmaWVsZElkQW50ZWNlZGVudGVzLCBmaWVsZElkQ29tZW50YXJpb3MsIGZpZWxkSWRDb25jbHVzaW9uZXNdXG4gICk7XG5cbiAgdXNlVGV4dEVkaXRvckZpZWxkcyh0ZXh0RWRpdG9yQmluZGluZ3MpO1xuXG4gIC8vIENsZWFyIGNvbnRhY3RzIG9ubHkgd2hlbiB0aGUgY2xpZW50IGNoYW5nZXMgKGF2b2lkIGNsZWFyaW5nIG9uIHJlc3RvcmUvc3RlcCAyIHJldHVybikuXG4gIGNvbnN0IHByZXZDbGllbnRSZWYgPSB1c2VSZWYobnVsbCk7XG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBjdXJyZW50ID0gc2VsZWN0ZWRDbGllbnQ/LnZhbHVlO1xyXG4gICAgaWYgKHByZXZDbGllbnRSZWYuY3VycmVudCAmJiBwcmV2Q2xpZW50UmVmLmN1cnJlbnQgIT09IGN1cnJlbnQpIHtcclxuICAgICAgc2V0U2VsZWN0ZWRDb250YWN0cyhbXSk7XHJcbiAgICB9XHJcbiAgICBwcmV2Q2xpZW50UmVmLmN1cnJlbnQgPSBjdXJyZW50O1xyXG4gIH0sIFtzZWxlY3RlZENsaWVudD8udmFsdWVdKTtcclxuXHJcbiAgY29uc3QgbGFzdENsaWVudFJlZiA9IHVzZVJlZihudWxsKTtcclxuXHJcbiAgLy8gSWYgdGhlIGNsaWVudCBjaGFuZ2VzIGFmdGVyIHNlbGVjdGluZyBjb250YWN0cywgcmVzZXQgdGhlIGVudGlyZSBmb3JtLlxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBjdXJyZW50ID0gc2VsZWN0ZWRDbGllbnQ/LnZhbHVlO1xyXG4gICAgaWYgKCFjdXJyZW50KSByZXR1cm47XHJcblxyXG4gICAgaWYgKGxhc3RDbGllbnRSZWYuY3VycmVudCAmJiBsYXN0Q2xpZW50UmVmLmN1cnJlbnQgIT09IGN1cnJlbnQpIHtcclxuICAgICAgc2V0U3RlcCgxKTtcclxuICAgICAgc2V0U2VsZWN0ZWRDb250YWN0cyhbXSk7XHJcbiAgICAgIHNldFZpc2l0VHlwZShkZWZhdWx0VmlzaXRUeXBlKTtcclxuICAgICAgc2V0VHJhbnNEYXRlKHRvZGF5U3RyaW5nKCkpO1xyXG4gICAgICBzZXREZXNjcmlwdGlvbihcIlwiKTtcclxuICAgICAgc2V0Q29tZW50YXJpb3MoXCJcIik7XHJcbiAgICAgIHNldEFudGVjZWRlbnRlcyhcIlwiKTtcclxuICAgICAgc2V0Q29uY2x1c2lvbmVzKFwiXCIpO1xyXG4gICAgICBzZXRTdGF0dXMoXCJcIik7XHJcbiAgICAgIHNldEJ1c3koZmFsc2UpO1xyXG4gICAgfVxyXG4gICAgbGFzdENsaWVudFJlZi5jdXJyZW50ID0gY3VycmVudDtcclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC1ob29rcy9leGhhdXN0aXZlLWRlcHNcclxuICB9LCBbc2VsZWN0ZWRDbGllbnQ/LnZhbHVlXSk7XHJcblxyXG4gIGNvbnN0IGNhbkdvTmV4dCA9ICEhc2VsZWN0ZWRDbGllbnQ7XG4gIGNvbnN0IGNhbkNyZWF0ZSA9XG4gICAgISFzZWxlY3RlZENsaWVudCAmJlxuICAgIFN0cmluZyh2aXNpdFR5cGUgfHwgXCJcIikudHJpbSgpICE9PSBcIlwiICYmXG4gICAgU3RyaW5nKHZpc2l0VHlwZSkgIT09IFwiMFwiICYmXG4gICAgZGVzY3JpcHRpb24udHJpbSgpLmxlbmd0aCA+IDAgJiZcbiAgICBjb21lbnRhcmlvcy50cmltKCkubGVuZ3RoID4gMDtcblxuICBjb25zdCBoYXNBY3RpdmVQcm9jZXNzID0gdXNlTWVtbygoKSA9PiB7XG4gICAgaWYgKGJ1c3kpIHJldHVybiB0cnVlO1xuICAgIGlmIChzdGVwID4gMSkgcmV0dXJuIHRydWU7XG4gICAgaWYgKHNlbGVjdGVkQ2xpZW50KSByZXR1cm4gdHJ1ZTtcbiAgICBpZiAoc2VsZWN0ZWRDb250YWN0cy5sZW5ndGggPiAwKSByZXR1cm4gdHJ1ZTtcbiAgICByZXR1cm4gKFxuICAgICAgZGVzY3JpcHRpb24udHJpbSgpLmxlbmd0aCA+IDAgfHxcbiAgICAgIGNvbWVudGFyaW9zLnRyaW0oKS5sZW5ndGggPiAwIHx8XG4gICAgICBhbnRlY2VkZW50ZXMudHJpbSgpLmxlbmd0aCA+IDAgfHxcbiAgICAgIGNvbmNsdXNpb25lcy50cmltKCkubGVuZ3RoID4gMFxuICAgICk7XG4gIH0sIFthbnRlY2VkZW50ZXMsIGJ1c3ksIGNvbWVudGFyaW9zLCBjb25jbHVzaW9uZXMsIGRlc2NyaXB0aW9uLCBzZWxlY3RlZENsaWVudCwgc2VsZWN0ZWRDb250YWN0cy5sZW5ndGgsIHN0ZXBdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHdpbmRvdy5fX2luZFNldE5hdmlnYXRpb25HdWFyZD8uKGhhc0FjdGl2ZVByb2Nlc3MpO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB3aW5kb3cuX19pbmRDbGVhck5hdmlnYXRpb25HdWFyZD8uKCk7XG4gICAgfTtcbiAgfSwgW2hhc0FjdGl2ZVByb2Nlc3NdKTtcblxuICBjb25zdCB7IGhhbmRsZVN1Ym1pdCB9ID0gdXNlQ3JlYXRlU3VibWl0KHtcbiAgICBidXN5LFxuICAgIG1vZGFsT3BlbjogbW9kYWwub3BlbixcbiAgICBjYW5DcmVhdGVWaXNpdCxcbiAgICBjYW5Sb2xsYmFja0RlbGV0ZSxcbiAgICBzZWxlY3RlZENsaWVudCxcbiAgICBzZWxlY3RlZENvbnRhY3RzLFxuICAgIHZpc2l0VHlwZSxcbiAgICBkZWZhdWx0QXNpc3RlbnRlVGlwbyxcbiAgICBkZXNjcmlwdGlvbixcbiAgICB0cmFuc0RhdGUsXG4gICAgY29tZW50YXJpb3MsXG4gICAgYW50ZWNlZGVudGVzLFxuICAgIGNvbmNsdXNpb25lcyxcbiAgICBzZXRCdXN5LFxuICAgIHNldFN0YXR1cyxcbiAgICBzZXRNb2RhbEVycm9yLFxuICAgIHNldFNob3dSZXF1aXJlZCxcbiAgICBvcGVuQ29uZmlybSxcbiAgICBjbG9zZUNvbmZpcm0sXG4gIH0pO1xuXG4gIGNvbnN0IGhhbmRsZVRvcGJhclByaW1hcnkgPSBSZWFjdC51c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKCFjYW5DcmVhdGVWaXNpdCkge1xuICAgICAgc2hvd1Blcm1pc3Npb25Nb2RhbCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoc3RlcCA9PT0gMSAmJiBjYW5Hb05leHQpIHNldFN0ZXAoMik7XG4gICAgaWYgKHN0ZXAgPT09IDIpIGhhbmRsZVN1Ym1pdCgpO1xuICB9LCBbY2FuQ3JlYXRlVmlzaXQsIGNhbkdvTmV4dCwgaGFuZGxlU3VibWl0LCBzdGVwXSk7XG5cbiAgY29uc3QgaGFuZGxlVG9wYmFyQmFjayA9IFJlYWN0LnVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBzZXRTdGVwKDEpO1xuICB9LCBbXSk7XG5cbiAgdXNlVG9wYmFyKHN0ZXAsIGNhbkdvTmV4dCwgaGFuZGxlVG9wYmFyUHJpbWFyeSwgaGFuZGxlVG9wYmFyQmFjaywgYnVzeSwgY2FuQ3JlYXRlLCBjYW5DcmVhdGVWaXNpdCk7XG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKHN0ZXAgPT09IDEpIHtcclxuICAgICAgc2V0U2hvd1JlcXVpcmVkKGZhbHNlKTtcclxuICAgICAgY2xvc2VDb25maXJtKCk7XHJcbiAgICB9XHJcbiAgfSwgW3N0ZXAsIGNsb3NlQ29uZmlybV0pO1xyXG5cclxuICBjb25zdCB2aXNpdFR5cGVJbnZhbGlkID0gc2hvd1JlcXVpcmVkICYmIChTdHJpbmcodmlzaXRUeXBlIHx8IFwiXCIpID09PSBcIlwiIHx8IFN0cmluZyh2aXNpdFR5cGUpID09PSBcIjBcIik7XG4gIGNvbnN0IGRlc2NyaXB0aW9uSW52YWxpZCA9IHNob3dSZXF1aXJlZCAmJiBkZXNjcmlwdGlvbi50cmltKCkubGVuZ3RoID09PSAwO1xuICBjb25zdCBjb21lbnRhcmlvc0ludmFsaWQgPSBzaG93UmVxdWlyZWQgJiYgY29tZW50YXJpb3MudHJpbSgpLmxlbmd0aCA9PT0gMDtcbiAgY29uc3QgZGVzY3JpcHRpb25JbnB1dENsYXNzTmFtZSA9IGNsYXNzTmFtZXMoXG4gICAgXCJmb3JtLWNvbnRyb2xcIixcbiAgICBkZXNjcmlwdGlvbkludmFsaWRcbiAgICAgID8gXCJib3JkZXItcm9zZS00MDAgYmctcm9zZS01MCBmb2N1czpyaW5nLXJvc2UtMjAwIGZvY3VzOmJvcmRlci1yb3NlLTQwMFwiXG4gICAgICA6IFwiYm9yZGVyLXNsYXRlLTIwMCBmb2N1czpyaW5nLXByaW1hcnkgZm9jdXM6Ym9yZGVyLXByaW1hcnlcIlxuICApO1xuICBjb25zdCBjb21lbnRhcmlvc0NsYXNzTmFtZSA9IGNsYXNzTmFtZXMoXG4gICAgXCJmb3JtLWNvbnRyb2wgY3Vyc29yLXBvaW50ZXJcIixcbiAgICBjb21lbnRhcmlvc0ludmFsaWRcbiAgICAgID8gXCJib3JkZXItcm9zZS00MDAgYmctcm9zZS01MCBmb2N1czpyaW5nLXJvc2UtMjAwIGZvY3VzOmJvcmRlci1yb3NlLTQwMFwiXG4gICAgICA6IFwiYm9yZGVyLXNsYXRlLTIwMCBmb2N1czpyaW5nLXByaW1hcnkgZm9jdXM6Ym9yZGVyLXByaW1hcnlcIlxuICApO1xuICBjb25zdCBkZXNjcmlwdGlvbkxhYmVsID0gaW5kVChcIlZpc2l0c19GaWVsZF9EZXNjcmlwdGlvblwiLCBcIkRlc2NyaXB0aW9uXCIpO1xuICBjb25zdCBjb21tZW50c0xhYmVsID0gaW5kVChcIlZpc2l0c19GaWVsZF9Db21tZW50c1wiLCBcIkNvbW1lbnRzXCIpO1xuICBjb25zdCBiYWNrZ3JvdW5kTGFiZWwgPSBpbmRUKFwiVmlzaXRzX0ZpZWxkX0JhY2tncm91bmRcIiwgXCJCYWNrZ3JvdW5kXCIpO1xuICBjb25zdCBjb25jbHVzaW9uc0xhYmVsID0gaW5kVChcIlZpc2l0c19GaWVsZF9Db25jbHVzaW9uc1wiLCBcIkNvbmNsdXNpb25zXCIpO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTRcIj5cclxuICAgICAgPENvbmZpcm1Nb2RhbFxyXG4gICAgICAgIG9wZW49e21vZGFsLm9wZW59XHJcbiAgICAgICAgdGl0bGU9e21vZGFsLnRpdGxlfVxyXG4gICAgICAgIG1lc3NhZ2U9e21vZGFsLm1lc3NhZ2V9XHJcbiAgICAgICAgY29uZmlybVRleHQ9e21vZGFsQ29uZmlybVRleHR9XHJcbiAgICAgICAgY2FuY2VsVGV4dD17bW9kYWxDYW5jZWxUZXh0fVxyXG4gICAgICAgIGxvYWRpbmdUZXh0PXttb2RhbExvYWRpbmdUZXh0fVxyXG4gICAgICAgIHNob3dDYW5jZWw9e21vZGFsLnNob3dDYW5jZWx9XHJcbiAgICAgICAgc2hvd0NvbmZpcm09e21vZGFsLnNob3dDb25maXJtfVxyXG4gICAgICAgIGJ1c3k9e2J1c3l9XHJcbiAgICAgICAgZXJyb3I9e21vZGFsRXJyb3J9XHJcbiAgICAgICAgc3RhdHVzPXtzdGF0dXN9XHJcbiAgICAgICAgb25Db25maXJtPXtoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm19XHJcbiAgICAgICAgb25DYW5jZWw9e2Nsb3NlQ29uZmlybX1cclxuICAgICAgLz5cclxuICAgICAge3N0ZXAgPT09IDEgJiYgKFxuICAgICAgICA8Q3JlYXRlU3RlcENsaWVudFNlbGVjdGlvblxuICAgICAgICAgIHNlbGVjdGVkQ2xpZW50PXtzZWxlY3RlZENsaWVudH1cbiAgICAgICAgICBzZWxlY3RlZENvbnRhY3RzPXtzZWxlY3RlZENvbnRhY3RzfVxuICAgICAgICAgIG9uQ2xpZW50U2VsZWN0ZWQ9e3NldFNlbGVjdGVkQ2xpZW50fVxuICAgICAgICAgIG9uQ29udGFjdHNDaGFuZ2U9e3NldFNlbGVjdGVkQ29udGFjdHN9XG4gICAgICAgICAgY2xpZW50TGFiZWw9e2luZFQoXCJWaXNpdHNfQ3JlYXRlX1NlYXJjaENsaWVudFwiLCBcIlNlYXJjaCBjbGllbnRcIil9XG4gICAgICAgICAgY2xpZW50UGxhY2Vob2xkZXI9e2luZEZvcm1hdChcIlZpc2l0c19DcmVhdGVfQ2xpZW50UGxhY2Vob2xkZXJcIiwgXCJUeXBlIGF0IGxlYXN0IHswfSBjaGFyYWN0ZXJzLi4uXCIsIDQpfVxuICAgICAgICAgIHNlbGVjdGVkQ29udGFjdHNDb3VudFRleHQ9e2luZEZvcm1hdChcbiAgICAgICAgICAgIFwiVmlzaXRzX0NyZWF0ZV9TZWxlY3RlZENvbnRhY3RzQ291bnRcIixcbiAgICAgICAgICAgIFwiezB9IHNlbGVjdGVkIGNvbnRhY3QocylcIixcbiAgICAgICAgICAgIHNlbGVjdGVkQ29udGFjdHMubGVuZ3RoXG4gICAgICAgICAgKX1cbiAgICAgICAgLz5cbiAgICAgICl9XG5cclxuICAgICAge3N0ZXAgPT09IDIgJiYgKFxuICAgICAgICA8Q3JlYXRlU3RlcFZpc2l0RGV0YWlsc1xuICAgICAgICAgIHRpdGxlPXtpbmRUKFwiVmlzaXRzX0NyZWF0ZV9WaXNpdERhdGFfVGl0bGVcIiwgXCJWaXNpdCBkZXRhaWxzXCIpfVxuICAgICAgICAgIGRhdGVMYWJlbD17aW5kVChcIlZpc2l0c19EZXRhaWxfRGF0ZV9MYWJlbFwiLCBcIkRhdGVcIil9XG4gICAgICAgICAgdHJhbnNEYXRlPXt0cmFuc0RhdGV9XG4gICAgICAgICAgb25UcmFuc0RhdGVDaGFuZ2U9e3NldFRyYW5zRGF0ZX1cbiAgICAgICAgICB2aXNpdFR5cGVMYWJlbD17aW5kVChcIlZpc2l0c19EZXRhaWxfVmlzaXRUeXBlX0xhYmVsXCIsIFwiVmlzaXQgdHlwZVwiKX1cbiAgICAgICAgICB2aXNpdFR5cGVzPXt2aXNpdFR5cGVzfVxuICAgICAgICAgIHZpc2l0VHlwZT17dmlzaXRUeXBlfVxuICAgICAgICAgIG9uVmlzaXRUeXBlQ2hhbmdlPXtzZXRWaXNpdFR5cGV9XG4gICAgICAgICAgdmlzaXRUeXBlUGxhY2Vob2xkZXI9e2luZFQoXCJWaXNpdHNfRGV0YWlsX1Zpc2l0VHlwZV9QbGFjZWhvbGRlclwiLCBcIlNlbGVjdCB0eXBlXCIpfVxuICAgICAgICAgIHZpc2l0VHlwZUludmFsaWQ9e3Zpc2l0VHlwZUludmFsaWR9XG4gICAgICAgICAgZGVzY3JpcHRpb25MYWJlbD17ZGVzY3JpcHRpb25MYWJlbH1cbiAgICAgICAgICBkZXNjcmlwdGlvblZhbHVlPXtkZXNjcmlwdGlvbn1cbiAgICAgICAgICBkZXNjcmlwdGlvbkNsYXNzTmFtZT17ZGVzY3JpcHRpb25JbnB1dENsYXNzTmFtZX1cbiAgICAgICAgICBvbkRlc2NyaXB0aW9uQ2hhbmdlPXtzZXREZXNjcmlwdGlvbn1cbiAgICAgICAgICB0YXBGaWVsZHM9e1tcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgaWQ6IFwiY29tZW50YXJpb3NcIixcbiAgICAgICAgICAgICAgbGFiZWw6IGNvbW1lbnRzTGFiZWwsXG4gICAgICAgICAgICAgIHZhbHVlOiBjb21lbnRhcmlvcyxcbiAgICAgICAgICAgICAgY2xhc3NOYW1lOiBjb21lbnRhcmlvc0NsYXNzTmFtZSxcbiAgICAgICAgICAgICAgcG9pbnRlckJpbmRpbmdzOiBjb21lbnRhcmlvc1RhcCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGlkOiBcImFudGVjZWRlbnRlc1wiLFxuICAgICAgICAgICAgICBsYWJlbDogYmFja2dyb3VuZExhYmVsLFxuICAgICAgICAgICAgICB2YWx1ZTogYW50ZWNlZGVudGVzLFxuICAgICAgICAgICAgICBjbGFzc05hbWU6IFwiZm9ybS1jb250cm9sIGN1cnNvci1wb2ludGVyXCIsXG4gICAgICAgICAgICAgIHBvaW50ZXJCaW5kaW5nczogYW50ZWNlZGVudGVzVGFwLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgaWQ6IFwiY29uY2x1c2lvbmVzXCIsXG4gICAgICAgICAgICAgIGxhYmVsOiBjb25jbHVzaW9uc0xhYmVsLFxuICAgICAgICAgICAgICB2YWx1ZTogY29uY2x1c2lvbmVzLFxuICAgICAgICAgICAgICBjbGFzc05hbWU6IFwiZm9ybS1jb250cm9sIGN1cnNvci1wb2ludGVyXCIsXG4gICAgICAgICAgICAgIHBvaW50ZXJCaW5kaW5nczogY29uY2x1c2lvbmVzVGFwLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdfVxuICAgICAgICAgIHN0YXR1cz17c3RhdHVzfVxuICAgICAgICAvPlxuICAgICAgKX1cbiAgICA8L2Rpdj5cclxuICApO1xyXG59XG5cbi8vIENyZWF0ZSBmbG93IFVJIHdyYXBwZWQgYnkgdGhlIGVycm9yIGJvdW5kYXJ5LlxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ3JlYXRlRm9ybSgpIHtcbiAgcmV0dXJuIChcbiAgICA8QXBwRXJyb3JCb3VuZGFyeSBmYWxsYmFja01lc3NhZ2U9e2luZFQoXCJWaXNpdHNfQ3JlYXRlX0Vycm9yQm91bmRhcnlcIiwgXCJBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSByZW5kZXJpbmcgdGhlIHZpc2l0cyBwYWdlLiBSZWxvYWQgYW5kIHRyeSBhZ2Fpbi5cIil9PlxuICAgICAgPFZpc2l0YXNBcHAgLz5cbiAgICA8L0FwcEVycm9yQm91bmRhcnk+XG4gICk7XG59XG4iLCAiaW1wb3J0IHsgdXNlRWZmZWN0IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uL3V0aWxzL2luZEkxOG4udHNcIjtcblxuZXhwb3J0IGNvbnN0IHVzZVRvcGJhciA9IChcbiAgc3RlcDogbnVtYmVyLFxuICBjYW5Hb05leHQ6IGJvb2xlYW4sXG4gIG9uTmV4dDogKCkgPT4gdm9pZCxcbiAgb25QcmV2OiAoKSA9PiB2b2lkLFxuICBidXN5ID0gZmFsc2UsXG4gIGNhblN1Ym1pdFN0ZXAyID0gdHJ1ZSxcbiAgY2FuQWNjZXNzID0gdHJ1ZVxuKSA9PiB7XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgZm9yd2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2xvYmFsRm9yd2FyZEJ0blwiKSBhcyBIVE1MQnV0dG9uRWxlbWVudCB8IG51bGw7XG4gICAgY29uc3QgYmFjayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2xvYmFsQmFja0J0blwiKSBhcyBIVE1MQnV0dG9uRWxlbWVudCB8IG51bGw7XG4gICAgY29uc3QgZm9yd2FyZEljb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdsb2JhbEZvcndhcmRJY29uXCIpO1xuICAgIGNvbnN0IGNyZWF0ZUljb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdsb2JhbENyZWF0ZUljb25cIik7XG5cbiAgICBpZiAoZm9yd2FyZCkge1xuICAgICAgY29uc3QgaXNTdGVwMiA9IHN0ZXAgPT09IDI7XG4gICAgICBjb25zdCBzaG93Rm9yd2FyZCA9IGNhbkFjY2VzcyAmJiAoaXNTdGVwMiB8fCAoc3RlcCA9PT0gMSAmJiBjYW5Hb05leHQpKTtcbiAgICAgIGZvcndhcmQuc3R5bGUudmlzaWJpbGl0eSA9IHNob3dGb3J3YXJkID8gXCJ2aXNpYmxlXCIgOiBcImhpZGRlblwiO1xuICAgICAgZm9yd2FyZC5kaXNhYmxlZCA9ICFzaG93Rm9yd2FyZCB8fCBidXN5O1xuICAgICAgZm9yd2FyZC5vbmNsaWNrID0gc2hvd0ZvcndhcmQgPyAoKSA9PiBvbk5leHQoKSA6IG51bGw7XG4gICAgICBmb3J3YXJkLnNldEF0dHJpYnV0ZShcbiAgICAgICAgXCJhcmlhLWxhYmVsXCIsXG4gICAgICAgIGlzU3RlcDIgPyBpbmRUKFwiQ29tbW9uX0NyZWF0ZVwiLCBcIkNyZWF0ZVwiKSA6IGluZFQoXCJDb21tb25fTmV4dFwiLCBcIk5leHRcIilcbiAgICAgICk7XG4gICAgICBmb3J3YXJkLnNldEF0dHJpYnV0ZShcImFyaWEtZGlzYWJsZWRcIiwgaXNTdGVwMiAmJiAhY2FuU3VibWl0U3RlcDIgPyBcInRydWVcIiA6IFwiZmFsc2VcIik7XG4gICAgICBmb3J3YXJkLmNsYXNzTGlzdC50b2dnbGUoXCJvcGFjaXR5LTUwXCIsIGlzU3RlcDIgJiYgIWNhblN1Ym1pdFN0ZXAyKTtcbiAgICAgIGZvcndhcmQuY2xhc3NMaXN0LnRvZ2dsZShcImN1cnNvci1ub3QtYWxsb3dlZFwiLCBpc1N0ZXAyICYmICFjYW5TdWJtaXRTdGVwMik7XG5cbiAgICAgIGlmIChmb3J3YXJkSWNvbiAmJiBjcmVhdGVJY29uKSB7XG4gICAgICAgIGlmIChpc1N0ZXAyKSB7XG4gICAgICAgICAgZm9yd2FyZEljb24uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgICAgICBjcmVhdGVJY29uLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZm9yd2FyZEljb24uY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICAgICAgICBjcmVhdGVJY29uLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGJhY2spIHtcbiAgICAgIGNvbnN0IHNob3dCYWNrID0gY2FuQWNjZXNzICYmIHN0ZXAgPT09IDI7XG4gICAgICBiYWNrLnN0eWxlLnZpc2liaWxpdHkgPSBzaG93QmFjayA/IFwidmlzaWJsZVwiIDogXCJoaWRkZW5cIjtcbiAgICAgIGJhY2suZGlzYWJsZWQgPSAhc2hvd0JhY2sgfHwgYnVzeTtcbiAgICAgIGJhY2sub25jbGljayA9IHNob3dCYWNrID8gKCkgPT4gb25QcmV2KCkgOiBudWxsO1xuICAgIH1cbiAgfSwgW3N0ZXAsIGNhbkdvTmV4dCwgb25OZXh0LCBvblByZXYsIGJ1c3ksIGNhblN1Ym1pdFN0ZXAyLCBjYW5BY2Nlc3NdKTtcbn07XG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBzaG93R2xvYmFsU3Bpbm5lciwgaGlkZUdsb2JhbFNwaW5uZXIgfSBmcm9tIFwiLi4vdXRpbHMvZ2xvYmFsU3Bpbm5lci50c1wiO1xuaW1wb3J0IHtcbiAgQ1JFQVRFX0ZSRVNIX1BBUkFNLFxuICBWSVNJVF9EUkFGVF9LRVksXG4gIENPTlRBQ1RTX1NUT1JBR0VfS0VZLFxuICBDT05UQUNUU19TRUxFQ1RJT05fS0VZLFxuICBjbGVhckNyZWF0ZVNlbGVjdGlvbkNhY2hlLFxuICBzdHJpcEZyZXNoUGFyYW0sXG59IGZyb20gXCIuLi91dGlscy92aXNpdGFzU3RvcmFnZS50c1wiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgeyBnZXRTZXNzaW9uSnNvbldpdGhFeHBpcnksIGdldFNlc3Npb25WYWx1ZVdpdGhFeHBpcnksIHNldFNlc3Npb25Kc29uV2l0aEV4cGlyeSB9IGZyb20gXCIuLi91dGlscy9zZXNzaW9uRXhwaXJ5LnRzXCI7XG5cbmNvbnN0IENSRUFURV9EUkFGVF9UVExfTVMgPSAyNCAqIDYwICogNjAgKiAxMDAwO1xuXG50eXBlIERyYWZ0U25hcHNob3QgPSB7XG4gIHNlbGVjdGVkQ2xpZW50OiBhbnk7XG4gIHNlbGVjdGVkQ29udGFjdHM6IGFueVtdO1xuICB2aXNpdFR5cGU6IHN0cmluZztcbiAgdHJhbnNEYXRlOiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIGNvbWVudGFyaW9zOiBzdHJpbmc7XG4gIGFudGVjZWRlbnRlczogc3RyaW5nO1xuICBjb25jbHVzaW9uZXM6IHN0cmluZztcbiAgc3RlcDogbnVtYmVyO1xufTtcblxudHlwZSBVc2VDcmVhdGVEcmFmdEFyZ3MgPSB7XG4gIGRyYWZ0U25hcHNob3Q6IERyYWZ0U25hcHNob3Q7XG4gIHNldFNlbGVjdGVkQ2xpZW50OiAodmFsdWU6IGFueSkgPT4gdm9pZDtcbiAgc2V0U2VsZWN0ZWRDb250YWN0czogKHZhbHVlOiBhbnlbXSkgPT4gdm9pZDtcbiAgc2V0VmlzaXRUeXBlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgc2V0VHJhbnNEYXRlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgc2V0RGVzY3JpcHRpb246ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBzZXRDb21lbnRhcmlvczogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHNldEFudGVjZWRlbnRlczogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHNldENvbmNsdXNpb25lczogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHNldFN0ZXA6ICh2YWx1ZTogbnVtYmVyKSA9PiB2b2lkO1xufTtcblxuLy8gSGFuZGxlcyB2aXNpdC1jcmVhdGUgZHJhZnQgc2F2ZS9yZXN0b3JlIGxpZmVjeWNsZS5cbmV4cG9ydCBjb25zdCB1c2VDcmVhdGVEcmFmdCA9ICh7XG4gIGRyYWZ0U25hcHNob3QsXG4gIHNldFNlbGVjdGVkQ2xpZW50LFxuICBzZXRTZWxlY3RlZENvbnRhY3RzLFxuICBzZXRWaXNpdFR5cGUsXG4gIHNldFRyYW5zRGF0ZSxcbiAgc2V0RGVzY3JpcHRpb24sXG4gIHNldENvbWVudGFyaW9zLFxuICBzZXRBbnRlY2VkZW50ZXMsXG4gIHNldENvbmNsdXNpb25lcyxcbiAgc2V0U3RlcCxcbn06IFVzZUNyZWF0ZURyYWZ0QXJncykgPT4ge1xuICBjb25zdCBkcmFmdFJlc3RvcmVkUmVmID0gdXNlUmVmKGZhbHNlKTtcbiAgY29uc3QgZHJhZnRQZXJzaXN0VGltZXJSZWYgPSB1c2VSZWY8bnVtYmVyIHwgbnVsbD4obnVsbCk7XG5cbiAgY29uc3QgcGVyc2lzdERyYWZ0U25hcHNob3QgPSB1c2VDYWxsYmFjaygoZHJhZnQ6IERyYWZ0U25hcHNob3QpID0+IHtcbiAgICBzZXRTZXNzaW9uSnNvbldpdGhFeHBpcnkoVklTSVRfRFJBRlRfS0VZLCBkcmFmdCwgQ1JFQVRFX0RSQUZUX1RUTF9NUyk7XG4gIH0sIFtdKTtcblxuICBjb25zdCBwZXJzaXN0RHJhZnROb3cgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgcGVyc2lzdERyYWZ0U25hcHNob3QoZHJhZnRTbmFwc2hvdCk7XG4gIH0sIFtkcmFmdFNuYXBzaG90LCBwZXJzaXN0RHJhZnRTbmFwc2hvdF0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFkcmFmdFJlc3RvcmVkUmVmLmN1cnJlbnQpIHJldHVybjtcblxuICAgIGlmIChkcmFmdFBlcnNpc3RUaW1lclJlZi5jdXJyZW50KSB7XG4gICAgICBjbGVhclRpbWVvdXQoZHJhZnRQZXJzaXN0VGltZXJSZWYuY3VycmVudCk7XG4gICAgfVxuXG4gICAgZHJhZnRQZXJzaXN0VGltZXJSZWYuY3VycmVudCA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGRyYWZ0UGVyc2lzdFRpbWVyUmVmLmN1cnJlbnQgPSBudWxsO1xuICAgICAgcGVyc2lzdERyYWZ0U25hcHNob3QoZHJhZnRTbmFwc2hvdCk7XG4gICAgfSwgMTgwKTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBpZiAoZHJhZnRQZXJzaXN0VGltZXJSZWYuY3VycmVudCkge1xuICAgICAgICBjbGVhclRpbWVvdXQoZHJhZnRQZXJzaXN0VGltZXJSZWYuY3VycmVudCk7XG4gICAgICAgIGRyYWZ0UGVyc2lzdFRpbWVyUmVmLmN1cnJlbnQgPSBudWxsO1xuICAgICAgfVxuICAgIH07XG4gIH0sIFtkcmFmdFNuYXBzaG90LCBwZXJzaXN0RHJhZnRTbmFwc2hvdF0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgbGV0IGZyZXNoTG9hZCA9IGZhbHNlO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB1cmwgPSBuZXcgVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcbiAgICAgIGZyZXNoTG9hZCA9IHVybC5zZWFyY2hQYXJhbXMuaGFzKENSRUFURV9GUkVTSF9QQVJBTSk7XG4gICAgfSBjYXRjaCB7XG4gICAgICBmcmVzaExvYWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoZnJlc2hMb2FkKSB7XG4gICAgICBjbGVhckNyZWF0ZVNlbGVjdGlvbkNhY2hlKCk7XG4gICAgICBzdHJpcEZyZXNoUGFyYW0oKTtcbiAgICAgIGRyYWZ0UmVzdG9yZWRSZWYuY3VycmVudCA9IHRydWU7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IHNob3VsZFNob3cgPSBmYWxzZTtcbiAgICB0cnkge1xuICAgICAgc2hvdWxkU2hvdyA9ICEhKFxuICAgICAgICBnZXRTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KFZJU0lUX0RSQUZUX0tFWSkgfHxcbiAgICAgICAgc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShDT05UQUNUU19TVE9SQUdFX0tFWSkgfHxcbiAgICAgICAgc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShDT05UQUNUU19TRUxFQ1RJT05fS0VZKVxuICAgICAgKTtcbiAgICB9IGNhdGNoIHtcbiAgICAgIC8vIElnbm9yZSBzdG9yYWdlIGFjY2VzcyBlcnJvcnMuXG4gICAgfVxuICAgIGlmIChzaG91bGRTaG93KSB7XG4gICAgICBzaG93R2xvYmFsU3Bpbm5lcihpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGRyYWZ0ID0gZ2V0U2Vzc2lvbkpzb25XaXRoRXhwaXJ5PERyYWZ0U25hcHNob3Q+KFZJU0lUX0RSQUZUX0tFWSk7XG4gICAgICBpZiAoZHJhZnQ/LnNlbGVjdGVkQ2xpZW50Py52YWx1ZSkgc2V0U2VsZWN0ZWRDbGllbnQoZHJhZnQuc2VsZWN0ZWRDbGllbnQpO1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZHJhZnQ/LnNlbGVjdGVkQ29udGFjdHMpKSBzZXRTZWxlY3RlZENvbnRhY3RzKGRyYWZ0LnNlbGVjdGVkQ29udGFjdHMpO1xuICAgICAgaWYgKGRyYWZ0Py52aXNpdFR5cGUgIT09IHVuZGVmaW5lZCkgc2V0VmlzaXRUeXBlKGRyYWZ0LnZpc2l0VHlwZSk7XG4gICAgICBpZiAoZHJhZnQ/LnRyYW5zRGF0ZSkgc2V0VHJhbnNEYXRlKGRyYWZ0LnRyYW5zRGF0ZSk7XG4gICAgICBpZiAoZHJhZnQ/LmRlc2NyaXB0aW9uICE9PSB1bmRlZmluZWQpIHNldERlc2NyaXB0aW9uKGRyYWZ0LmRlc2NyaXB0aW9uKTtcbiAgICAgIGlmIChkcmFmdD8uY29tZW50YXJpb3MgIT09IHVuZGVmaW5lZCkgc2V0Q29tZW50YXJpb3MoZHJhZnQuY29tZW50YXJpb3MpO1xuICAgICAgaWYgKGRyYWZ0Py5hbnRlY2VkZW50ZXMgIT09IHVuZGVmaW5lZCkgc2V0QW50ZWNlZGVudGVzKGRyYWZ0LmFudGVjZWRlbnRlcyk7XG4gICAgICBpZiAoZHJhZnQ/LmNvbmNsdXNpb25lcyAhPT0gdW5kZWZpbmVkKSBzZXRDb25jbHVzaW9uZXMoZHJhZnQuY29uY2x1c2lvbmVzKTtcbiAgICAgIGlmIChkcmFmdD8uc3RlcCA9PT0gMikgc2V0U3RlcCgyKTtcbiAgICB9IGNhdGNoIHtcbiAgICAgIC8vIElnbm9yZSBtYWxmb3JtZWQgZHJhZnQgcGF5bG9hZHMuXG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlmIChzaG91bGRTaG93KSB7XG4gICAgICAgIGhpZGVHbG9iYWxTcGlubmVyKCk7XG4gICAgICB9XG4gICAgfVxuICAgIGRyYWZ0UmVzdG9yZWRSZWYuY3VycmVudCA9IHRydWU7XG4gIH0sIFtcbiAgICBzZXRBbnRlY2VkZW50ZXMsXG4gICAgc2V0Q29tZW50YXJpb3MsXG4gICAgc2V0Q29uY2x1c2lvbmVzLFxuICAgIHNldERlc2NyaXB0aW9uLFxuICAgIHNldFNlbGVjdGVkQ2xpZW50LFxuICAgIHNldFNlbGVjdGVkQ29udGFjdHMsXG4gICAgc2V0U3RlcCxcbiAgICBzZXRUcmFuc0RhdGUsXG4gICAgc2V0VmlzaXRUeXBlLFxuICBdKTtcblxuICByZXR1cm4ge1xuICAgIHBlcnNpc3REcmFmdE5vdyxcbiAgfTtcbn07XG4iLCAiZXhwb3J0IGNvbnN0IHNob3dHbG9iYWxTcGlubmVyID0gKG1lc3NhZ2U/OiBzdHJpbmcpID0+IHtcbiAgdHJ5IHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2Ygd2luZG93Ll9faW5kU2hvd0dsb2JhbFNwaW5uZXIgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgd2luZG93Ll9faW5kU2hvd0dsb2JhbFNwaW5uZXIobWVzc2FnZSk7XG4gICAgfVxuICB9IGNhdGNoIHtcbiAgICAvLyBpZ25vcmVcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGhpZGVHbG9iYWxTcGlubmVyID0gKCkgPT4ge1xuICB0cnkge1xuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiB3aW5kb3cuX19pbmRIaWRlR2xvYmFsU3Bpbm5lciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICB3aW5kb3cuX19pbmRIaWRlR2xvYmFsU3Bpbm5lcigpO1xuICAgIH1cbiAgfSBjYXRjaCB7XG4gICAgLy8gaWdub3JlXG4gIH1cbn07XG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2sgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGZldGNoSnNvbiB9IGZyb20gXCIuLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XG5pbXBvcnQgeyBpbmRFeHRyYWN0SWQsIGluZEV4dHJhY3RTaWduZWRJZCB9IGZyb20gXCIuLi91dGlscy9pbmRJZHMudHNcIjtcbmltcG9ydCB7IGluZEZvcm1hdCwgaW5kVCB9IGZyb20gXCIuLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgeyBzaG93UGVybWlzc2lvbk1vZGFsIH0gZnJvbSBcIi4uL3V0aWxzL3Blcm1pc3Npb25zLnRzXCI7XG5pbXBvcnQgeyBmbGFzaEFjdGlvbk1hcmssIHNldEhpc3RvcnlGaWx0ZXJGb3JEYXRlIH0gZnJvbSBcIi4uL3V0aWxzL3Zpc2l0YXNIaXN0b3J5LnRzXCI7XG5pbXBvcnQgeyBWSVNJVF9EUkFGVF9LRVkgfSBmcm9tIFwiLi4vdXRpbHMvdmlzaXRhc1N0b3JhZ2UudHNcIjtcbmltcG9ydCB7IHdhaXQgfSBmcm9tIFwiLi4vdXRpbHMvd2FpdC50c1wiO1xuXG50eXBlIENvbnRhY3RPcHRpb24gPSB7XG4gIHZhbHVlOiBzdHJpbmc7XG4gIHRleHQ6IHN0cmluZztcbn07XG5cbnR5cGUgTGVnYWN5Q29tbWFuZFJlc3BvbnNlID0ge1xuICBzdWNjZXNzPzogYm9vbGVhbjtcbiAgbWVzc2FnZT86IHN0cmluZztcbiAgZGF0YT86IHVua25vd247XG4gIFN1Y2Nlc3M/OiBib29sZWFuO1xuICBNZXNzYWdlPzogc3RyaW5nO1xuICBEYXRhPzogdW5rbm93bjtcbn07XG5cbmNvbnN0IGdldExlZ2FjeVJlc3BvbnNlU3VjY2VzcyA9IChyZXNwb25zZTogTGVnYWN5Q29tbWFuZFJlc3BvbnNlKTogYm9vbGVhbiA9PiB7XG4gIHJldHVybiByZXNwb25zZS5zdWNjZXNzID09PSB0cnVlIHx8IHJlc3BvbnNlLlN1Y2Nlc3MgPT09IHRydWU7XG59O1xuXG5jb25zdCBnZXRMZWdhY3lSZXNwb25zZU1lc3NhZ2UgPSAocmVzcG9uc2U6IExlZ2FjeUNvbW1hbmRSZXNwb25zZSk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IHJhd01lc3NhZ2UgPSByZXNwb25zZS5tZXNzYWdlID8/IHJlc3BvbnNlLk1lc3NhZ2U7XG4gIHJldHVybiB0eXBlb2YgcmF3TWVzc2FnZSA9PT0gXCJzdHJpbmdcIiA/IHJhd01lc3NhZ2UudHJpbSgpIDogXCJcIjtcbn07XG5cbmNvbnN0IGdldExlZ2FjeVJlc3BvbnNlRGF0YSA9IChyZXNwb25zZTogTGVnYWN5Q29tbWFuZFJlc3BvbnNlKTogdW5rbm93biA9PiB7XG4gIHJldHVybiByZXNwb25zZS5kYXRhID8/IHJlc3BvbnNlLkRhdGE7XG59O1xuXG50eXBlIFVzZUNyZWF0ZVN1Ym1pdEFyZ3MgPSB7XG4gIGJ1c3k6IGJvb2xlYW47XG4gIG1vZGFsT3BlbjogYm9vbGVhbjtcbiAgY2FuQ3JlYXRlVmlzaXQ6IGJvb2xlYW47XG4gIGNhblJvbGxiYWNrRGVsZXRlOiBib29sZWFuO1xuICBzZWxlY3RlZENsaWVudDogeyB2YWx1ZTogc3RyaW5nIH0gfCBudWxsO1xuICBzZWxlY3RlZENvbnRhY3RzOiBDb250YWN0T3B0aW9uW107XG4gIHZpc2l0VHlwZTogc3RyaW5nO1xuICBkZWZhdWx0QXNpc3RlbnRlVGlwbzogc3RyaW5nO1xuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICB0cmFuc0RhdGU6IHN0cmluZztcbiAgY29tZW50YXJpb3M6IHN0cmluZztcbiAgYW50ZWNlZGVudGVzOiBzdHJpbmc7XG4gIGNvbmNsdXNpb25lczogc3RyaW5nO1xuICBzZXRCdXN5OiAodmFsdWU6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHNldFN0YXR1czogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHNldE1vZGFsRXJyb3I6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBzZXRTaG93UmVxdWlyZWQ6ICh2YWx1ZTogYm9vbGVhbikgPT4gdm9pZDtcbiAgb3BlbkNvbmZpcm06IChvcHRzOiB7XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgY29uZmlybVRleHQ/OiBzdHJpbmc7XG4gICAgb25Db25maXJtPzogKCkgPT4gUHJvbWlzZTxib29sZWFuIHwgdm9pZD4gfCBib29sZWFuIHwgdm9pZDtcbiAgfSkgPT4gdm9pZDtcbiAgY2xvc2VDb25maXJtOiAoKSA9PiB2b2lkO1xufTtcblxuLy8gT3ducyBjcmVhdGUvY29uZmlybSBmbG93IHNvIGZvcm0gY29tcG9uZW50IHN0YXlzIGZvY3VzZWQgb24gVUkgZmllbGRzLlxuZXhwb3J0IGNvbnN0IHVzZUNyZWF0ZVN1Ym1pdCA9ICh7XG4gIGJ1c3ksXG4gIG1vZGFsT3BlbixcbiAgY2FuQ3JlYXRlVmlzaXQsXG4gIGNhblJvbGxiYWNrRGVsZXRlLFxuICBzZWxlY3RlZENsaWVudCxcbiAgc2VsZWN0ZWRDb250YWN0cyxcbiAgdmlzaXRUeXBlLFxuICBkZWZhdWx0QXNpc3RlbnRlVGlwbyxcbiAgZGVzY3JpcHRpb24sXG4gIHRyYW5zRGF0ZSxcbiAgY29tZW50YXJpb3MsXG4gIGFudGVjZWRlbnRlcyxcbiAgY29uY2x1c2lvbmVzLFxuICBzZXRCdXN5LFxuICBzZXRTdGF0dXMsXG4gIHNldE1vZGFsRXJyb3IsXG4gIHNldFNob3dSZXF1aXJlZCxcbiAgb3BlbkNvbmZpcm0sXG4gIGNsb3NlQ29uZmlybSxcbn06IFVzZUNyZWF0ZVN1Ym1pdEFyZ3MpID0+IHtcbiAgY29uc3QgZG9DcmVhdGUgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XG4gICAgaWYgKGJ1c3kpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoIWNhbkNyZWF0ZVZpc2l0KSB7XG4gICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHNldE1vZGFsRXJyb3IoXCJcIik7XG4gICAgaWYgKCFzZWxlY3RlZENsaWVudCkge1xuICAgICAgc2V0U3RhdHVzKGluZFQoXCJWaXNpdHNfQ3JlYXRlX1NlbGVjdENsaWVudFJlcXVpcmVkXCIsIFwiU2VsZWN0IGEgY2xpZW50LlwiKSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChTdHJpbmcodmlzaXRUeXBlIHx8IFwiXCIpID09PSBcIlwiIHx8IFN0cmluZyh2aXNpdFR5cGUpID09PSBcIjBcIiB8fCAhZGVzY3JpcHRpb24udHJpbSgpIHx8ICFjb21lbnRhcmlvcy50cmltKCkpIHtcbiAgICAgIHNldFNob3dSZXF1aXJlZCh0cnVlKTtcbiAgICAgIHNldFN0YXR1cyhpbmRUKFwiVmlzaXRzX0NyZWF0ZV9Db21wbGV0ZVJlcXVpcmVkXCIsIFwiQ29tcGxldGUgcmVxdWlyZWQgZmllbGRzLlwiKSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHNldEJ1c3kodHJ1ZSk7XG4gICAgc2V0U3RhdHVzKGluZFQoXCJWaXNpdHNfQ3JlYXRlX0NyZWF0aW5nQWN0aXZpdHlcIiwgXCJDcmVhdGluZyBhY3Rpdml0eS4uLlwiKSk7XG5cbiAgICBsZXQgY3JlYXRlZFJlY0lkID0gXCJcIjtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcGF5bG9hZEFjdGl2aXR5ID0ge1xuICAgICAgICBhY2NvdW50TnVtOiBzZWxlY3RlZENsaWVudC52YWx1ZSxcbiAgICAgICAgdmlzaXRUeXBlLFxuICAgICAgICBkZXNjcmlwdGlvbixcbiAgICAgICAgdHJhbnNEYXRlLFxuICAgICAgICBjb21lbnRhcmlvcyxcbiAgICAgICAgYW50ZWNlZGVudGVzLFxuICAgICAgICBjb25jbHVzaW9uZXMsXG4gICAgICB9O1xuXG4gICAgICBjb25zdCByZXNBY3QgPSBhd2FpdCBmZXRjaEpzb248TGVnYWN5Q29tbWFuZFJlc3BvbnNlPihcIi9WaXNpdGFzL0NyZWF0ZUFjdGl2aXR5XCIsIHtcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXlsb2FkQWN0aXZpdHkpLFxuICAgICAgfSk7XG5cbiAgICAgIGlmICghZ2V0TGVnYWN5UmVzcG9uc2VTdWNjZXNzKHJlc0FjdCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGdldExlZ2FjeVJlc3BvbnNlTWVzc2FnZShyZXNBY3QpIHx8IGluZFQoXCJWaXNpdHNfQ3JlYXRlX0NyZWF0ZUFjdGl2aXR5RmFpbGVkXCIsIFwiRmFpbGVkIHRvIGNyZWF0ZSBhY3Rpdml0eS5cIikpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCByZWNJZEFjdGl2aWRhZCA9XG4gICAgICAgIGluZEV4dHJhY3RTaWduZWRJZChnZXRMZWdhY3lSZXNwb25zZURhdGEocmVzQWN0KSkgfHxcbiAgICAgICAgaW5kRXh0cmFjdFNpZ25lZElkKGdldExlZ2FjeVJlc3BvbnNlTWVzc2FnZShyZXNBY3QpKSB8fFxuICAgICAgICBpbmRFeHRyYWN0U2lnbmVkSWQoaW5kRXh0cmFjdElkKGdldExlZ2FjeVJlc3BvbnNlRGF0YShyZXNBY3QpKSB8fCBpbmRFeHRyYWN0SWQoZ2V0TGVnYWN5UmVzcG9uc2VNZXNzYWdlKHJlc0FjdCkpKTtcbiAgICAgIGlmICghcmVjSWRBY3RpdmlkYWQpIHRocm93IG5ldyBFcnJvcihpbmRUKFwiVmlzaXRzX0NyZWF0ZV9DcmVhdGVBY3Rpdml0eUZhaWxlZFwiLCBcIkZhaWxlZCB0byBjcmVhdGUgYWN0aXZpdHkuXCIpKTtcbiAgICAgIGNyZWF0ZWRSZWNJZCA9IFN0cmluZyhyZWNJZEFjdGl2aWRhZCk7XG5cbiAgICAgIGlmIChzZWxlY3RlZENvbnRhY3RzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29uc3QgYXNzaXN0YW50QmF0Y2hTaXplID0gNDtcbiAgICAgICAgY29uc3QgY3JlYXRlQXNzaXN0YW50ID0gYXN5bmMgKGNvbnRhY3Q6IENvbnRhY3RPcHRpb24pID0+IHtcbiAgICAgICAgICBjb25zdCBwYXlsb2FkVmlzaXRhID0ge1xuICAgICAgICAgICAgcmVmUmVjSWRBY3RpdmlkYWQ6IHJlY0lkQWN0aXZpZGFkLFxuICAgICAgICAgICAgYXNpc3RlbnRlVGlwbzogZGVmYXVsdEFzaXN0ZW50ZVRpcG8sXG4gICAgICAgICAgICBhc2lzdGVudGVJZDogY29udGFjdC50ZXh0LFxuICAgICAgICAgICAgY29udGFjdG9SZWNJZDogY29udGFjdC52YWx1ZSxcbiAgICAgICAgICB9O1xuICAgICAgICAgIGNvbnN0IHJlc1ZpcyA9IGF3YWl0IGZldGNoSnNvbjxMZWdhY3lDb21tYW5kUmVzcG9uc2U+KFwiL1Zpc2l0YXMvQ3JlYXRlVmlzaXRhQXNpc3RlbnRlXCIsIHtcbiAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXlsb2FkVmlzaXRhKSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpZiAoIWdldExlZ2FjeVJlc3BvbnNlU3VjY2VzcyhyZXNWaXMpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZ2V0TGVnYWN5UmVzcG9uc2VNZXNzYWdlKHJlc1ZpcykgfHwgaW5kVChcIlZpc2l0c19DcmVhdGVfQ3JlYXRlVmlzaXRGYWlsZWRcIiwgXCJGYWlsZWQgdG8gY3JlYXRlIHZpc2l0LlwiKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGZvciAobGV0IGlkeCA9IDA7IGlkeCA8IHNlbGVjdGVkQ29udGFjdHMubGVuZ3RoOyBpZHggKz0gYXNzaXN0YW50QmF0Y2hTaXplKSB7XG4gICAgICAgICAgY29uc3QgYmF0Y2ggPSBzZWxlY3RlZENvbnRhY3RzLnNsaWNlKGlkeCwgaWR4ICsgYXNzaXN0YW50QmF0Y2hTaXplKTtcbiAgICAgICAgICBjb25zdCBmaXJzdCA9IGJhdGNoWzBdO1xuICAgICAgICAgIGlmIChmaXJzdCkge1xuICAgICAgICAgICAgc2V0U3RhdHVzKGluZEZvcm1hdChcIlZpc2l0c19DcmVhdGVfQ3JlYXRpbmdWaXNpdEZvclwiLCBcIkNyZWF0aW5nIHZpc2l0IGZvciB7MH0uLi5cIiwgZmlyc3QudGV4dCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBhd2FpdCBQcm9taXNlLmFsbChiYXRjaC5tYXAoKGNvbnRhY3QpID0+IGNyZWF0ZUFzc2lzdGFudChjb250YWN0KSkpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oVklTSVRfRFJBRlRfS0VZKTtcbiAgICAgIH0gY2F0Y2gge1xuICAgICAgICAvLyBJZ25vcmUgc3RvcmFnZSBlcnJvcnMuXG4gICAgICB9XG5cbiAgICAgIHNldEhpc3RvcnlGaWx0ZXJGb3JEYXRlKHRyYW5zRGF0ZSwgdHJ1ZSk7XG4gICAgICBjbG9zZUNvbmZpcm0oKTtcbiAgICAgIGF3YWl0IHdhaXQoMjAwKTtcbiAgICAgIGZsYXNoQWN0aW9uTWFyayhcIm9rUHJvY2Vzc1wiLCAxMjAwKTtcbiAgICAgIGF3YWl0IHdhaXQoMTIwMCk7XG4gICAgICB3aW5kb3cuX19pbmRCeXBhc3NOYXZpZ2F0aW9uR3VhcmRPbmNlPy4oKTtcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvSGlzdG9yaWFsL0hpc3RvcnlcIjtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gY2F0Y2ggKGU6IHVua25vd24pIHtcbiAgICAgIGlmIChjcmVhdGVkUmVjSWQgJiYgY2FuUm9sbGJhY2tEZWxldGUpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBzZXRTdGF0dXMoaW5kVChcIlZpc2l0c19DcmVhdGVfUm9sbGJhY2tcIiwgXCJSb2xsaW5nIGJhY2sgYWN0aXZpdHkuLi5cIikpO1xuICAgICAgICAgIGF3YWl0IGZldGNoSnNvbihgL1Zpc2l0YXMvRGVsZXRlQWN0aXZpdHkvJHtlbmNvZGVVUklDb21wb25lbnQoY3JlYXRlZFJlY0lkKX1gLCB7XG4gICAgICAgICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXG4gICAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgLy8gS2VlcCBvcmlnaW5hbCBlcnJvciBmbG93LlxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjb25zdCBtc2cgPSBlIGluc3RhbmNlb2YgRXJyb3IgPyBlLm1lc3NhZ2UgOiBpbmRUKFwiVmlzaXRzX0NyZWF0ZV9DcmVhdGVWaXNpdEVycm9yXCIsIFwiRmFpbGVkIHRvIGNyZWF0ZSB0aGUgdmlzaXQuXCIpO1xuICAgICAgc2V0TW9kYWxFcnJvcihtc2cpO1xuICAgICAgc2V0U3RhdHVzKG1zZyk7XG4gICAgICBmbGFzaEFjdGlvbk1hcmsoXCJlcnJvclByb2Nlc3NcIiwgMTUwMCk7XG4gICAgICBzZXRCdXN5KGZhbHNlKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0sIFtcbiAgICBhbnRlY2VkZW50ZXMsXG4gICAgYnVzeSxcbiAgICBjYW5DcmVhdGVWaXNpdCxcbiAgICBjYW5Sb2xsYmFja0RlbGV0ZSxcbiAgICBjbG9zZUNvbmZpcm0sXG4gICAgY29tZW50YXJpb3MsXG4gICAgY29uY2x1c2lvbmVzLFxuICAgIGRlZmF1bHRBc2lzdGVudGVUaXBvLFxuICAgIGRlc2NyaXB0aW9uLFxuICAgIHNlbGVjdGVkQ2xpZW50LFxuICAgIHNlbGVjdGVkQ29udGFjdHMsXG4gICAgc2V0QnVzeSxcbiAgICBzZXRNb2RhbEVycm9yLFxuICAgIHNldFNob3dSZXF1aXJlZCxcbiAgICBzZXRTdGF0dXMsXG4gICAgdHJhbnNEYXRlLFxuICAgIHZpc2l0VHlwZSxcbiAgXSk7XG5cbiAgY29uc3QgaGFuZGxlU3VibWl0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmIChidXN5KSByZXR1cm47XG4gICAgaWYgKCFjYW5DcmVhdGVWaXNpdCkge1xuICAgICAgc2hvd1Blcm1pc3Npb25Nb2RhbCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAobW9kYWxPcGVuKSByZXR1cm47XG4gICAgaWYgKCFzZWxlY3RlZENsaWVudCkge1xuICAgICAgc2V0U3RhdHVzKGluZFQoXCJWaXNpdHNfQ3JlYXRlX1NlbGVjdENsaWVudFJlcXVpcmVkXCIsIFwiU2VsZWN0IGEgY2xpZW50LlwiKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChTdHJpbmcodmlzaXRUeXBlIHx8IFwiXCIpID09PSBcIlwiIHx8IFN0cmluZyh2aXNpdFR5cGUpID09PSBcIjBcIiB8fCAhZGVzY3JpcHRpb24udHJpbSgpIHx8ICFjb21lbnRhcmlvcy50cmltKCkpIHtcbiAgICAgIHNldFNob3dSZXF1aXJlZCh0cnVlKTtcbiAgICAgIHNldFN0YXR1cyhpbmRUKFwiVmlzaXRzX0NyZWF0ZV9Db21wbGV0ZVJlcXVpcmVkXCIsIFwiQ29tcGxldGUgcmVxdWlyZWQgZmllbGRzLlwiKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHNldE1vZGFsRXJyb3IoXCJcIik7XG4gICAgb3BlbkNvbmZpcm0oe1xuICAgICAgdGl0bGU6IGluZFQoXCJWaXNpdHNfQ3JlYXRlX0NvbmZpcm1DcmVhdGVfVGl0bGVcIiwgXCJWaXNpdHNfQ3JlYXRlX0NvbmZpcm1DcmVhdGVfVGl0bGVcIiksXG4gICAgICBtZXNzYWdlOiBpbmRUKFwiVmlzaXRzX0NyZWF0ZV9Db25maXJtQ3JlYXRlX0JvZHlcIiwgXCJWaXNpdHNfQ3JlYXRlX0NvbmZpcm1DcmVhdGVfQm9keVwiKSxcbiAgICAgIGNvbmZpcm1UZXh0OiBpbmRUKFwiQ29uZmlybV9ZZXNcIiwgXCJDb25maXJtX1llc1wiKSxcbiAgICAgIG9uQ29uZmlybTogZG9DcmVhdGUsXG4gICAgfSk7XG4gIH0sIFtcbiAgICBidXN5LFxuICAgIGNhbkNyZWF0ZVZpc2l0LFxuICAgIGNvbWVudGFyaW9zLFxuICAgIGRlc2NyaXB0aW9uLFxuICAgIGRvQ3JlYXRlLFxuICAgIG1vZGFsT3BlbixcbiAgICBvcGVuQ29uZmlybSxcbiAgICBzZWxlY3RlZENsaWVudCxcbiAgICBzZXRNb2RhbEVycm9yLFxuICAgIHNldFNob3dSZXF1aXJlZCxcbiAgICBzZXRTdGF0dXMsXG4gICAgdmlzaXRUeXBlLFxuICBdKTtcblxuICByZXR1cm4ge1xuICAgIGRvQ3JlYXRlLFxuICAgIGhhbmRsZVN1Ym1pdCxcbiAgfTtcbn07XG4iLCAiZXhwb3J0IGNvbnN0IGluZEV4dHJhY3RJZCA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZyA9PiB7XG4gIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gXCJcIjtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiB8fCB0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCIpIHJldHVybiBTdHJpbmcodmFsdWUpLnRyaW0oKTtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIikge1xuICAgIGNvbnN0IGNhbmRpZGF0ZSA9XG4gICAgICAodmFsdWUgYXMgYW55KS5yZWNJZCA/P1xuICAgICAgKHZhbHVlIGFzIGFueSkuUmVjSWQgPz9cbiAgICAgICh2YWx1ZSBhcyBhbnkpLmlkID8/XG4gICAgICAodmFsdWUgYXMgYW55KS5JZCA/P1xuICAgICAgKHZhbHVlIGFzIGFueSkudmFsdWUgPz9cbiAgICAgICh2YWx1ZSBhcyBhbnkpLlZhbHVlO1xuICAgIGlmICh0eXBlb2YgY2FuZGlkYXRlID09PSBcInN0cmluZ1wiIHx8IHR5cGVvZiBjYW5kaWRhdGUgPT09IFwibnVtYmVyXCIpIHJldHVybiBTdHJpbmcoY2FuZGlkYXRlKS50cmltKCk7XG4gIH1cbiAgcmV0dXJuIFwiXCI7XG59O1xuXG5leHBvcnQgY29uc3QgaW5kRXh0cmFjdE51bWVyaWNJZCA9ICh2YWx1ZTogdW5rbm93biwgZGVwdGggPSAwKTogc3RyaW5nID0+IHtcbiAgaWYgKGRlcHRoID4gMykgcmV0dXJuIFwiXCI7XG4gIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gXCJcIjtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIiAmJiBOdW1iZXIuaXNGaW5pdGUodmFsdWUpKSByZXR1cm4gU3RyaW5nKE1hdGgudHJ1bmModmFsdWUpKTtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikge1xuICAgIGNvbnN0IHJhdyA9IHZhbHVlLnRyaW0oKTtcbiAgICBpZiAoIXJhdykgcmV0dXJuIFwiXCI7XG4gICAgaWYgKC9eXFxkKyQvLnRlc3QocmF3KSkgcmV0dXJuIHJhdztcbiAgICBjb25zdCBtID0gcmF3Lm1hdGNoKC8oXFxkezMsfSkvKTtcbiAgICByZXR1cm4gbSA/IG1bMV0gOiBcIlwiO1xuICB9XG4gIGlmICh0eXBlb2YgdmFsdWUgIT09IFwib2JqZWN0XCIpIHJldHVybiBcIlwiO1xuICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgdmFsdWUpIHtcbiAgICAgIGNvbnN0IGZvdW5kID0gaW5kRXh0cmFjdE51bWVyaWNJZChpdGVtLCBkZXB0aCArIDEpO1xuICAgICAgaWYgKGZvdW5kKSByZXR1cm4gZm91bmQ7XG4gICAgfVxuICAgIHJldHVybiBcIlwiO1xuICB9XG5cbiAgY29uc3Qga2V5cyA9IFtcbiAgICBcInJlY0lkXCIsXG4gICAgXCJSZWNJZFwiLFxuICAgIFwicmVmUmVjSWRBY3RpdmlkYWRcIixcbiAgICBcIlJlZlJlY0lkQWN0aXZpZGFkXCIsXG4gICAgXCJhY3RpdmlkYWRSZWNJZFwiLFxuICAgIFwiQWN0aXZpZGFkUmVjSWRcIixcbiAgICBcImlkXCIsXG4gICAgXCJJZFwiLFxuICAgIFwidmFsdWVcIixcbiAgICBcIlZhbHVlXCIsXG4gICAgXCJyZXN1bHRcIixcbiAgICBcIlJlc3VsdFwiLFxuICAgIFwiZGF0YVwiLFxuICAgIFwiRGF0YVwiLFxuICAgIFwibWVzc2FnZVwiLFxuICAgIFwiTWVzc2FnZVwiLFxuICBdO1xuXG4gIGZvciAoY29uc3QgayBvZiBrZXlzKSB7XG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgaykpIHtcbiAgICAgIGNvbnN0IGZvdW5kID0gaW5kRXh0cmFjdE51bWVyaWNJZCgodmFsdWUgYXMgYW55KVtrXSwgZGVwdGggKyAxKTtcbiAgICAgIGlmIChmb3VuZCkgcmV0dXJuIGZvdW5kO1xuICAgIH1cbiAgfVxuXG4gIGZvciAoY29uc3QgdiBvZiBPYmplY3QudmFsdWVzKHZhbHVlIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+KSkge1xuICAgIGNvbnN0IGZvdW5kID0gaW5kRXh0cmFjdE51bWVyaWNJZCh2LCBkZXB0aCArIDEpO1xuICAgIGlmIChmb3VuZCkgcmV0dXJuIGZvdW5kO1xuICB9XG5cbiAgcmV0dXJuIFwiXCI7XG59O1xuXG5leHBvcnQgY29uc3QgaW5kRXh0cmFjdFNpZ25lZElkID0gKHZhbHVlOiB1bmtub3duLCBkZXB0aCA9IDApOiBzdHJpbmcgPT4ge1xuICBpZiAoZGVwdGggPiAzKSByZXR1cm4gXCJcIjtcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHJldHVybiBcIlwiO1xuICBpZiAodHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiICYmIE51bWJlci5pc0Zpbml0ZSh2YWx1ZSkpIHJldHVybiBTdHJpbmcoTWF0aC50cnVuYyh2YWx1ZSkpO1xuICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XG4gICAgY29uc3QgcmF3ID0gdmFsdWUudHJpbSgpO1xuICAgIGlmICghcmF3KSByZXR1cm4gXCJcIjtcbiAgICBjb25zdCBtYXRjaCA9IHJhdy5tYXRjaCgvLT9cXGR7Myx9Lyk7XG4gICAgcmV0dXJuIG1hdGNoID8gbWF0Y2hbMF0gOiBcIlwiO1xuICB9XG4gIGlmICh0eXBlb2YgdmFsdWUgIT09IFwib2JqZWN0XCIpIHJldHVybiBcIlwiO1xuICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgdmFsdWUpIHtcbiAgICAgIGNvbnN0IGZvdW5kID0gaW5kRXh0cmFjdFNpZ25lZElkKGl0ZW0sIGRlcHRoICsgMSk7XG4gICAgICBpZiAoZm91bmQpIHJldHVybiBmb3VuZDtcbiAgICB9XG4gICAgcmV0dXJuIFwiXCI7XG4gIH1cblxuICBjb25zdCBrZXlzID0gW1xuICAgIFwicmVjSWRcIixcbiAgICBcIlJlY0lkXCIsXG4gICAgXCJyZWZSZWNJZEFjdGl2aWRhZFwiLFxuICAgIFwiUmVmUmVjSWRBY3RpdmlkYWRcIixcbiAgICBcImFjdGl2aWRhZFJlY0lkXCIsXG4gICAgXCJBY3RpdmlkYWRSZWNJZFwiLFxuICAgIFwibWVzc2FnZVwiLFxuICAgIFwiTWVzc2FnZVwiLFxuICAgIFwicmVzdWx0XCIsXG4gICAgXCJSZXN1bHRcIixcbiAgICBcImRhdGFcIixcbiAgICBcIkRhdGFcIixcbiAgXTtcblxuICBmb3IgKGNvbnN0IGsgb2Yga2V5cykge1xuICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodmFsdWUsIGspKSB7XG4gICAgICBjb25zdCBmb3VuZCA9IGluZEV4dHJhY3RTaWduZWRJZCgodmFsdWUgYXMgYW55KVtrXSwgZGVwdGggKyAxKTtcbiAgICAgIGlmIChmb3VuZCkgcmV0dXJuIGZvdW5kO1xuICAgIH1cbiAgfVxuXG4gIGZvciAoY29uc3QgdiBvZiBPYmplY3QudmFsdWVzKHZhbHVlIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+KSkge1xuICAgIGNvbnN0IGZvdW5kID0gaW5kRXh0cmFjdFNpZ25lZElkKHYsIGRlcHRoICsgMSk7XG4gICAgaWYgKGZvdW5kKSByZXR1cm4gZm91bmQ7XG4gIH1cblxuICByZXR1cm4gXCJcIjtcbn07XG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlSWQsIHVzZU1lbW8sIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IFhNYXJrSWNvbiB9IGZyb20gXCJAaGVyb2ljb25zL3JlYWN0LzIwL3NvbGlkXCI7XG5pbXBvcnQgRmxvYXRpbmdMaXN0IGZyb20gXCIuLi9jb21tb25zL0Zsb2F0aW5nTGlzdC50c3hcIjtcbmltcG9ydCBTcGlubmVyIGZyb20gXCIuLi9jb21tb25zL1NwaW5uZXIudHN4XCI7XG5pbXBvcnQgeyBDaGV2cm9uRG93blN2ZywgQ2hldnJvblVwU3ZnIH0gZnJvbSBcIi4uL2NvbW1vbnMvY2hldnJvbnMudHN4XCI7XG5pbXBvcnQgeyBmZXRjaEpzb24gfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvYXBpU2VydmljZS50c1wiO1xuaW1wb3J0IHsgaGFuZGxlQ29tYm9ib3hLZXlEb3duIH0gZnJvbSBcIi4uLy4uL2hvb2tzL3VzZUNvbWJvYm94S2V5Ym9hcmQudHNcIjtcbmltcG9ydCB7IHVzZU91dHNpZGVDbGljayB9IGZyb20gXCIuLi8uLi9ob29rcy91c2VPdXRzaWRlQ2xpY2sudHNcIjtcbmltcG9ydCB7IGNsYXNzTmFtZXMgfSBmcm9tIFwiLi4vLi4vdXRpbHMvY2xhc3NOYW1lcy50c1wiO1xuaW1wb3J0IHsgaW5kRm9ybWF0LCBpbmRUIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB7IGlzTm9EYXRhUm93LCBpc05vRGF0YVRleHQgfSBmcm9tIFwiLi4vLi4vdXRpbHMvbm9EYXRhLnRzXCI7XG5pbXBvcnQgeyBnZXRDYWNoZWRDb250YWN0cywgc2V0Q2FjaGVkQ29udGFjdHMsIGdldFN0b3JlZFNlbGVjdGlvbiwgc2V0U3RvcmVkU2VsZWN0aW9uLCBjbGVhclN0b3JlZFNlbGVjdGlvbiB9IGZyb20gXCIuLi8uLi91dGlscy92aXNpdGFzU3RvcmFnZS50c1wiO1xuXG50eXBlIENvbnRhY3RPcHRpb24gPSB7XG4gIHZhbHVlOiBzdHJpbmc7XG4gIHRleHQ6IHN0cmluZztcbiAgY2FyZ286IHN0cmluZztcbiAgZW1wcmVzYTogc3RyaW5nO1xufTtcblxudHlwZSBDb250YWN0c0Ryb3Bkb3duUmVzcG9uc2UgPSB7XG4gIGl0ZW1zPzogdW5rbm93bltdO1xuICBJdGVtcz86IHVua25vd25bXTtcbn07XG5cbnR5cGUgQ29udGFjdHNDb21ib2JveFByb3BzID0ge1xuICBhY2NvdW50TnVtPzogc3RyaW5nO1xuICB2YWx1ZT86IENvbnRhY3RPcHRpb25bXTtcbiAgb25DaGFuZ2U6ICh2YWx1ZTogQ29udGFjdE9wdGlvbltdKSA9PiB2b2lkO1xuICBwb3J0YWxDbGFzc05hbWU/OiBzdHJpbmc7XG4gIHBhbmVsQ2xhc3NOYW1lPzogc3RyaW5nO1xufTtcblxuLy8gTXVsdGktc2VsZWN0IGNvbnRhY3RzIGNvbWJvYm94IHRpZWQgdG8gdGhlIHNlbGVjdGVkIGNsaWVudC5cbmNvbnN0IENvbnRhY3RzQ29tYm9ib3ggPSAoeyBhY2NvdW50TnVtLCB2YWx1ZSA9IFtdLCBvbkNoYW5nZSwgcG9ydGFsQ2xhc3NOYW1lLCBwYW5lbENsYXNzTmFtZSB9OiBDb250YWN0c0NvbWJvYm94UHJvcHMpID0+IHtcbiAgY29uc3QgW3F1ZXJ5LCBzZXRRdWVyeV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW29wdGlvbnMsIHNldE9wdGlvbnNdID0gdXNlU3RhdGU8Q29udGFjdE9wdGlvbltdPihbXSk7XG4gIGNvbnN0IFtzZWxlY3RlZCwgc2V0U2VsZWN0ZWRdID0gdXNlU3RhdGU8Q29udGFjdE9wdGlvbltdPih2YWx1ZSk7XG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2xvYWRpbmdNb3JlLCBzZXRMb2FkaW5nTW9yZV0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtzdGF0dXMsIHNldFN0YXR1c10gPSB1c2VTdGF0ZShpbmRUKFwiVmlzaXRzX0NyZWF0ZV9TZWxlY3RDbGllbnRGaXJzdFwiLCBcIlNlbGVjdCBhIGNsaWVudCBmaXJzdC5cIikpO1xuICBjb25zdCBbaGFzTG9hZGVkLCBzZXRIYXNMb2FkZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbb3Blbiwgc2V0T3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtwYWdlLCBzZXRQYWdlXSA9IHVzZVN0YXRlKDEpO1xuICBjb25zdCBbaGFzTW9yZSwgc2V0SGFzTW9yZV0gPSB1c2VTdGF0ZSh0cnVlKTtcbiAgY29uc3QgW2Jsb2NraW5nLCBzZXRCbG9ja2luZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFthY3RpdmVJbmRleCwgc2V0QWN0aXZlSW5kZXhdID0gdXNlU3RhdGUoMCk7XG4gIGNvbnN0IGxpc3RSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgYm94UmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IGFib3J0UmVmID0gdXNlUmVmPEFib3J0Q29udHJvbGxlciB8IG51bGw+KG51bGwpO1xuICBjb25zdCBjb250YWluZXJSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgaW5wdXRSZWYgPSB1c2VSZWY8SFRNTElucHV0RWxlbWVudCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBsYXN0QWNjb3VudFJlZiA9IHVzZVJlZihhY2NvdW50TnVtIHx8IFwiXCIpO1xuICBjb25zdCBvbkNoYW5nZVJlZiA9IHVzZVJlZihvbkNoYW5nZSk7XG4gIGNvbnN0IGlkQmFzZSA9IHVzZUlkKCk7XG4gIGNvbnN0IGlucHV0SWQgPSBgJHtpZEJhc2V9LWNvbnRhY3RzLWlucHV0YDtcbiAgY29uc3QgbGlzdElkID0gYCR7aWRCYXNlfS1jb250YWN0cy1vcHRpb25zYDtcblxuICB1c2VPdXRzaWRlQ2xpY2soW2NvbnRhaW5lclJlZiwgbGlzdFJlZl0sICgpID0+IHNldE9wZW4oZmFsc2UpKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIG9uQ2hhbmdlUmVmLmN1cnJlbnQgPSBvbkNoYW5nZTtcbiAgfSwgW29uQ2hhbmdlXSk7XG5cbiAgY29uc3QgaXNTYW1lU2VsZWN0aW9uID0gKGE6IENvbnRhY3RPcHRpb25bXSA9IFtdLCBiOiBDb250YWN0T3B0aW9uW10gPSBbXSkgPT4ge1xuICAgIGlmIChhLmxlbmd0aCAhPT0gYi5sZW5ndGgpIHJldHVybiBmYWxzZTtcbiAgICBjb25zdCBhcyA9IGEubWFwKCh4KSA9PiBTdHJpbmcoeC52YWx1ZSkpLnNvcnQoKTtcbiAgICBjb25zdCBicyA9IGIubWFwKCh4KSA9PiBTdHJpbmcoeC52YWx1ZSkpLnNvcnQoKTtcbiAgICByZXR1cm4gYXMuZXZlcnkoKHYsIGkpID0+IHYgPT09IGJzW2ldKTtcbiAgfTtcblxuICAvLyBTeW5jIGludGVybmFsIHNlbGVjdGlvbiB3aXRoIHRoZSBwcm9wIChkcmFmdC9jYWNoZSByZXN0b3JlKS5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWlzU2FtZVNlbGVjdGlvbih2YWx1ZSB8fCBbXSwgc2VsZWN0ZWQpKSB7XG4gICAgICBzZXRTZWxlY3RlZCh2YWx1ZSB8fCBbXSk7XG4gICAgfVxuICB9LCBbdmFsdWVdKTtcblxuICBjb25zdCBjYW5jZWxQZW5kaW5nID0gKCkgPT4ge1xuICAgIGlmIChhYm9ydFJlZi5jdXJyZW50KSB7XG4gICAgICBhYm9ydFJlZi5jdXJyZW50LmFib3J0KCk7XG4gICAgICBhYm9ydFJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICB9XG4gIH07XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgaWYgKGFib3J0UmVmLmN1cnJlbnQpIHtcbiAgICAgICAgYWJvcnRSZWYuY3VycmVudC5hYm9ydCgpO1xuICAgICAgICBhYm9ydFJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9O1xuICB9LCBbXSk7XG5cbiAgY29uc3QgcHJpbWVGcm9tQ2FjaGUgPSAoKSA9PiB7XG4gICAgY29uc3QgY2FjaGVkID0gZ2V0Q2FjaGVkQ29udGFjdHMoYWNjb3VudE51bSkgYXMgQ29udGFjdE9wdGlvbltdIHwgbnVsbDtcbiAgICBpZiAoY2FjaGVkKSB7XG4gICAgICBzZXRPcHRpb25zKGNhY2hlZCk7XG4gICAgICBzZXRIYXNMb2FkZWQodHJ1ZSk7XG4gICAgICBzZXRIYXNNb3JlKGNhY2hlZC5sZW5ndGggPT09IDEwKTtcbiAgICAgIHNldFN0YXR1cyhcbiAgICAgICAgY2FjaGVkLmxlbmd0aFxuICAgICAgICAgID8gaW5kRm9ybWF0KFwiVmlzaXRzX0NyZWF0ZV9Db250YWN0Q291bnRDYWNoZVwiLCBcInswfSBjb250YWN0cyAoY2FjaGUpXCIsIGNhY2hlZC5sZW5ndGgpXG4gICAgICAgICAgOiBpbmRUKFwiVmlzaXRzX0NyZWF0ZV9Ob0NvbnRhY3RzXCIsIFwiTm8gY29udGFjdHNcIilcbiAgICAgICk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY2FuY2VsUGVuZGluZygpO1xuICAgIHNldFF1ZXJ5KFwiXCIpO1xuICAgIHNldE9wZW4oZmFsc2UpO1xuICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgIHNldEJsb2NraW5nKGZhbHNlKTtcbiAgICBzZXRMb2FkaW5nTW9yZShmYWxzZSk7XG4gICAgc2V0QWN0aXZlSW5kZXgoMCk7XG4gICAgc2V0UGFnZSgxKTtcbiAgICBzZXRIYXNNb3JlKHRydWUpO1xuXG4gICAgaWYgKCFhY2NvdW50TnVtKSB7XG4gICAgICBzZXRPcHRpb25zKFtdKTtcbiAgICAgIHNldFNlbGVjdGVkKFtdKTtcbiAgICAgIG9uQ2hhbmdlUmVmLmN1cnJlbnQoW10pO1xuICAgICAgc2V0U3RhdHVzKGluZFQoXCJWaXNpdHNfQ3JlYXRlX1NlbGVjdENsaWVudEZpcnN0XCIsIFwiU2VsZWN0IGEgY2xpZW50IGZpcnN0LlwiKSk7XG4gICAgICBzZXRIYXNMb2FkZWQoZmFsc2UpO1xuICAgICAgY2xlYXJTdG9yZWRTZWxlY3Rpb24obGFzdEFjY291bnRSZWYuY3VycmVudCk7XG4gICAgICBsYXN0QWNjb3VudFJlZi5jdXJyZW50ID0gXCJcIjtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBjaGFuZ2VkID0gbGFzdEFjY291bnRSZWYuY3VycmVudCAmJiBsYXN0QWNjb3VudFJlZi5jdXJyZW50ICE9PSBhY2NvdW50TnVtO1xuICAgIGlmIChjaGFuZ2VkKSB7XG4gICAgICBzZXRTZWxlY3RlZChbXSk7XG4gICAgICBvbkNoYW5nZVJlZi5jdXJyZW50KFtdKTtcbiAgICAgIGNsZWFyU3RvcmVkU2VsZWN0aW9uKGxhc3RBY2NvdW50UmVmLmN1cnJlbnQpO1xuICAgIH1cblxuICAgIGNvbnN0IHVzZWRDYWNoZSA9IHByaW1lRnJvbUNhY2hlKCk7XG4gICAgaWYgKCF1c2VkQ2FjaGUpIHtcbiAgICAgIHNldE9wdGlvbnMoW10pO1xuICAgICAgc2V0SGFzTG9hZGVkKGZhbHNlKTtcbiAgICAgIHNldFN0YXR1cyhpbmRUKFwiVmlzaXRzX0NyZWF0ZV9QcmVzc0Fycm93VG9Mb2FkQ29udGFjdHNcIiwgXCJQcmVzcyBBcnJvd0Rvd24gdG8gbG9hZCBjb250YWN0cy5cIikpO1xuICAgIH1cblxuICAgIGNvbnN0IHN0b3JlZFNlbGVjdGlvbiA9IGdldFN0b3JlZFNlbGVjdGlvbihhY2NvdW50TnVtKSBhcyBDb250YWN0T3B0aW9uW107XG4gICAgaWYgKHN0b3JlZFNlbGVjdGlvbi5sZW5ndGggJiYgIXZhbHVlPy5sZW5ndGgpIHtcbiAgICAgIHNldFNlbGVjdGVkKHN0b3JlZFNlbGVjdGlvbik7XG4gICAgICBvbkNoYW5nZVJlZi5jdXJyZW50KHN0b3JlZFNlbGVjdGlvbik7XG4gICAgfVxuXG4gICAgbGFzdEFjY291bnRSZWYuY3VycmVudCA9IGFjY291bnROdW07XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlYWN0LWhvb2tzL2V4aGF1c3RpdmUtZGVwc1xuICB9LCBbYWNjb3VudE51bV0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgb25DaGFuZ2VSZWYuY3VycmVudChzZWxlY3RlZCk7XG4gICAgaWYgKGFjY291bnROdW0pIHNldFN0b3JlZFNlbGVjdGlvbihhY2NvdW50TnVtLCBzZWxlY3RlZCk7XG4gIH0sIFtzZWxlY3RlZCwgYWNjb3VudE51bV0pO1xuXG4gIGNvbnN0IHRvVGV4dCA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZyA9PiB7XG4gICAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHJldHVybiBcIlwiO1xuICAgIHJldHVybiBTdHJpbmcodmFsdWUpLnRyaW0oKTtcbiAgfTtcblxuICBjb25zdCBhc09iamVjdFJlY29yZCA9ICh2YWx1ZTogdW5rbm93bik6IFJlY29yZDxzdHJpbmcsIHVua25vd24+IHwgbnVsbCA9PiB7XG4gICAgaWYgKCF2YWx1ZSB8fCB0eXBlb2YgdmFsdWUgIT09IFwib2JqZWN0XCIgfHwgQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHJldHVybiBudWxsO1xuICAgIHJldHVybiB2YWx1ZSBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPjtcbiAgfTtcblxuICBjb25zdCBtYXBDb250YWN0cyA9IChpdGVtczogdW5rbm93bltdID0gW10pID0+XG4gICAgaXRlbXNcbiAgICAgIC5tYXAoKGVudHJ5KSA9PiB7XG4gICAgICAgIGlmIChpc05vRGF0YVJvdyhlbnRyeSkpIHJldHVybiBudWxsO1xuICAgICAgICBjb25zdCByZWNvcmQgPSBhc09iamVjdFJlY29yZChlbnRyeSk7XG4gICAgICAgIGlmICghcmVjb3JkKSByZXR1cm4gbnVsbDtcblxuICAgICAgICBjb25zdCByZWNJZCA9IHRvVGV4dChyZWNvcmQucmVjSWQgPz8gcmVjb3JkLlJlY0lkKTtcbiAgICAgICAgY29uc3QgbmFtZSA9IHRvVGV4dChyZWNvcmQubmFtZSA/PyByZWNvcmQuTmFtZSk7XG4gICAgICAgIGNvbnN0IGNhcmdvID0gdG9UZXh0KHJlY29yZC5jYXJnbyA/PyByZWNvcmQuQ2FyZ28pO1xuICAgICAgICBjb25zdCBlbXByZXNhID0gdG9UZXh0KHJlY29yZC5lbXByZXNhID8/IHJlY29yZC5FbXByZXNhKTtcblxuICAgICAgICBpZiAoIXJlY0lkIHx8IGlzTm9EYXRhVGV4dChuYW1lKSkgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB2YWx1ZTogcmVjSWQsXG4gICAgICAgICAgdGV4dDogbmFtZS50b1VwcGVyQ2FzZSgpLFxuICAgICAgICAgIGNhcmdvOiBjYXJnby50b1VwcGVyQ2FzZSgpLFxuICAgICAgICAgIGVtcHJlc2E6IGVtcHJlc2EudG9VcHBlckNhc2UoKSxcbiAgICAgICAgfSBhcyBDb250YWN0T3B0aW9uO1xuICAgICAgfSlcbiAgICAgIC5maWx0ZXIoQm9vbGVhbikgYXMgQ29udGFjdE9wdGlvbltdO1xuXG4gIGNvbnN0IGxvYWQgPSBhc3luYyAocGFnZVRvTG9hZCA9IDEsIGFwcGVuZCA9IGZhbHNlKSA9PiB7XG4gICAgaWYgKCFhY2NvdW50TnVtKSByZXR1cm47XG4gICAgaWYgKGxvYWRpbmcgfHwgbG9hZGluZ01vcmUpIHJldHVybjtcbiAgICBjYW5jZWxQZW5kaW5nKCk7XG5cbiAgICBpZiAoIWFwcGVuZCkge1xuICAgICAgc2V0TG9hZGluZyh0cnVlKTtcbiAgICAgIHNldEJsb2NraW5nKHRydWUpO1xuICAgICAgaWYgKHBhZ2VUb0xvYWQgPT09IDEpIHNldFN0YXR1cyhpbmRUKFwiVmlzaXRzX0NyZWF0ZV9Mb2FkaW5nQ29udGFjdHNcIiwgXCJMb2FkaW5nIGNvbnRhY3RzLi4uXCIpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2V0TG9hZGluZ01vcmUodHJ1ZSk7XG4gICAgICBzZXRCbG9ja2luZyh0cnVlKTtcbiAgICB9XG5cbiAgICBjb25zdCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuICAgIGFib3J0UmVmLmN1cnJlbnQgPSBjb250cm9sbGVyO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaEpzb248Q29udGFjdHNEcm9wZG93blJlc3BvbnNlPihcbiAgICAgICAgYC9WaXNpdGFzL0dldENvbnRhY3RzRm9yRHJvcGRvd24/YWNjb3VudE51bT0ke2VuY29kZVVSSUNvbXBvbmVudChhY2NvdW50TnVtKX0mcGFnZT0ke3BhZ2VUb0xvYWR9JnBhZ2VTaXplPTEwYCxcbiAgICAgICAgeyBzaWduYWw6IGNvbnRyb2xsZXIuc2lnbmFsIH1cbiAgICAgICk7XG4gICAgICBjb25zdCByYXdJdGVtcyA9IEFycmF5LmlzQXJyYXkocmVzLml0ZW1zKSA/IHJlcy5pdGVtcyA6IEFycmF5LmlzQXJyYXkocmVzLkl0ZW1zKSA/IHJlcy5JdGVtcyA6IFtdO1xuICAgICAgY29uc3QgbWFwcGVkID0gbWFwQ29udGFjdHMocmF3SXRlbXMpO1xuICAgICAgc2V0T3B0aW9ucygocHJldikgPT4ge1xuICAgICAgICBjb25zdCBuZXh0ID0gYXBwZW5kID8gWy4uLnByZXYsIC4uLm1hcHBlZF0gOiBtYXBwZWQ7XG4gICAgICAgIHNldENhY2hlZENvbnRhY3RzKGFjY291bnROdW0sIG5leHQpO1xuICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgIH0pO1xuICAgICAgc2V0SGFzTG9hZGVkKHRydWUpO1xuICAgICAgc2V0SGFzTW9yZShtYXBwZWQubGVuZ3RoID09PSAxMCk7XG4gICAgICBzZXRQYWdlKHBhZ2VUb0xvYWQpO1xuICAgICAgc2V0U3RhdHVzKG1hcHBlZC5sZW5ndGggPyBpbmRGb3JtYXQoXCJWaXNpdHNfQ3JlYXRlX0NvbnRhY3RDb3VudFwiLCBcInswfSBjb250YWN0c1wiLCBtYXBwZWQubGVuZ3RoKSA6IGluZFQoXCJWaXNpdHNfQ3JlYXRlX05vQ29udGFjdHNcIiwgXCJObyBjb250YWN0c1wiKSk7XG4gICAgfSBjYXRjaCB7XG4gICAgICBzZXRTdGF0dXMoaW5kVChcIlZpc2l0c19DcmVhdGVfTG9hZENvbnRhY3RzRXJyb3JcIiwgXCJGYWlsZWQgdG8gbG9hZCBjb250YWN0cy5cIikpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBhYm9ydFJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgICAgc2V0TG9hZGluZ01vcmUoZmFsc2UpO1xuICAgICAgc2V0QmxvY2tpbmcoZmFsc2UpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBlbnN1cmVMb2FkZWQgPSAoKSA9PiB7XG4gICAgaWYgKCFhY2NvdW50TnVtKSByZXR1cm47XG4gICAgaWYgKGhhc0xvYWRlZCAmJiBvcHRpb25zLmxlbmd0aCkgcmV0dXJuO1xuICAgIGlmIChwcmltZUZyb21DYWNoZSgpKSByZXR1cm47XG4gICAgbG9hZCgxLCBmYWxzZSk7XG4gIH07XG5cbiAgY29uc3QgbG9hZE1vcmVDb250YWN0cyA9IFJlYWN0LnVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoIWFjY291bnROdW0gfHwgIWhhc01vcmUgfHwgbG9hZGluZ01vcmUgfHwgbG9hZGluZykgcmV0dXJuO1xuICAgIGxvYWQocGFnZSArIDEsIHRydWUpO1xuICB9LCBbYWNjb3VudE51bSwgaGFzTW9yZSwgbG9hZGluZ01vcmUsIGxvYWRpbmcsIHBhZ2VdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghb3BlbiB8fCAhbGlzdFJlZi5jdXJyZW50KSByZXR1cm47XG4gICAgY29uc3QgZWwgPSBsaXN0UmVmLmN1cnJlbnQ7XG4gICAgY29uc3Qgb25TY3JvbGwgPSAoKSA9PiB7XG4gICAgICBpZiAoZWwuc2Nyb2xsVG9wICsgZWwuY2xpZW50SGVpZ2h0ID49IGVsLnNjcm9sbEhlaWdodCAtIDgpIGxvYWRNb3JlQ29udGFjdHMoKTtcbiAgICB9O1xuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgb25TY3JvbGwsIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcbiAgICByZXR1cm4gKCkgPT4gZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBvblNjcm9sbCk7XG4gIH0sIFtvcGVuLCBsb2FkTW9yZUNvbnRhY3RzXSk7XG5cbiAgY29uc3Qgc2VsZWN0ZWRWYWx1ZXMgPSB1c2VNZW1vKCgpID0+IHtcbiAgICByZXR1cm4gbmV3IFNldCgoc2VsZWN0ZWQgfHwgW10pLm1hcCgocykgPT4gU3RyaW5nKHMudmFsdWUpKSk7XG4gIH0sIFtzZWxlY3RlZF0pO1xuXG4gIGNvbnN0IGF2YWlsYWJsZU9wdGlvbnMgPSB1c2VNZW1vKCgpID0+IHtcbiAgICAvLyBIaWRlIGFscmVhZHkgc2VsZWN0ZWQgY29udGFjdHMgZnJvbSB0aGUgZHJvcGRvd24gbGlzdC5cbiAgICByZXR1cm4gKG9wdGlvbnMgfHwgW10pLmZpbHRlcigobykgPT4gIXNlbGVjdGVkVmFsdWVzLmhhcyhTdHJpbmcoby52YWx1ZSkpKTtcbiAgfSwgW29wdGlvbnMsIHNlbGVjdGVkVmFsdWVzXSk7XG5cbiAgY29uc3QgZmlsdGVyZWQgPSB1c2VNZW1vKCgpID0+IHtcbiAgICBjb25zdCBxID0gcXVlcnkudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKCFxKSByZXR1cm4gYXZhaWxhYmxlT3B0aW9ucztcbiAgICBjb25zdCBmID0gYXZhaWxhYmxlT3B0aW9ucy5maWx0ZXIoXG4gICAgICAobykgPT4gby50ZXh0LnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMocSkgfHwgby5jYXJnby50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHEpIHx8IG8uZW1wcmVzYS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHEpXG4gICAgKTtcbiAgICByZXR1cm4gZi5sZW5ndGggPyBmIDogYXZhaWxhYmxlT3B0aW9ucztcbiAgfSwgW2F2YWlsYWJsZU9wdGlvbnMsIHF1ZXJ5XSk7XG4gIGNvbnN0IGFjdGl2ZUlkID0gb3BlbiAmJiBmaWx0ZXJlZFthY3RpdmVJbmRleF0gPyBgJHtpZEJhc2V9LWNvbnRhY3Qtb3B0LSR7ZmlsdGVyZWRbYWN0aXZlSW5kZXhdLnZhbHVlfWAgOiB1bmRlZmluZWQ7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBzZXRBY3RpdmVJbmRleCgwKTtcbiAgfSwgW2ZpbHRlcmVkLmxlbmd0aCwgcXVlcnldKTtcblxuICBjb25zdCB0b2dnbGVPcHRpb24gPSAob3B0OiBDb250YWN0T3B0aW9uKSA9PiB7XG4gICAgc2V0U2VsZWN0ZWQoKHByZXYpID0+IHtcbiAgICAgIGNvbnN0IGV4aXN0cyA9IHByZXYuc29tZSgocCkgPT4gcC52YWx1ZSA9PT0gb3B0LnZhbHVlKTtcbiAgICAgIGlmIChleGlzdHMpIHJldHVybiBwcmV2LmZpbHRlcigocCkgPT4gcC52YWx1ZSAhPT0gb3B0LnZhbHVlKTtcbiAgICAgIHJldHVybiBbLi4ucHJldiwgb3B0XTtcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVLZXlEb3duID0gKGV2OiBSZWFjdC5LZXlib2FyZEV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+KSA9PiB7XG4gICAgaGFuZGxlQ29tYm9ib3hLZXlEb3duKGV2LCB7XG4gICAgICBpc09wZW46IG9wZW4sXG4gICAgICBzZXRPcGVuLFxuICAgICAgb3B0aW9uQ291bnQ6IGZpbHRlcmVkLmxlbmd0aCxcbiAgICAgIHNldEFjdGl2ZUluZGV4LFxuICAgICAgb3Blbk9uQXJyb3c6IHRydWUsXG4gICAgICBvbkFycm93TmF2aWdhdGU6IGVuc3VyZUxvYWRlZCxcbiAgICAgIG9uRW50ZXJXaGVuT3BlbjogKCkgPT4ge1xuICAgICAgICB0b2dnbGVPcHRpb24oZmlsdGVyZWRbYWN0aXZlSW5kZXhdID8/IGZpbHRlcmVkWzBdKTtcbiAgICAgIH0sXG4gICAgICBvbkVudGVyV2hlbkNsb3NlZDogYWNjb3VudE51bVxuICAgICAgICA/ICgpID0+IHtcbiAgICAgICAgICAgIGVuc3VyZUxvYWRlZCgpO1xuICAgICAgICAgICAgc2V0T3Blbih0cnVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIDogdW5kZWZpbmVkLFxuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIiByZWY9e2NvbnRhaW5lclJlZn0+XG4gICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZm9ybS1sYWJlbCBmb250LXNlbWlib2xkXCIgaHRtbEZvcj17aW5wdXRJZH0+XG4gICAgICAgIHtpbmRUKFwiVmlzaXRzX0NyZWF0ZV9TZWFyY2hDb250YWN0XCIsIFwiU2VhcmNoIGNvbnRhY3RcIil9XG4gICAgICA8L2xhYmVsPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZVwiPlxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIHJlZj17Ym94UmVmfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwicmVsYXRpdmUgdy1mdWxsIGN1cnNvci1kZWZhdWx0IHJvdW5kZWQtWzVweF0gYm9yZGVyLXNsYXRlLTMwMCBiZy13aGl0ZSB0ZXh0LWxlZnQgc2hhZG93LXhzIGZvY3VzLXdpdGhpbjpib3JkZXItcHJpbWFyeSBmb2N1cy13aXRoaW46cmluZy0yIGZvY3VzLXdpdGhpbjpyaW5nLXByaW1hcnkgZm9jdXMtd2l0aGluOnJpbmctb2Zmc2V0LTAgc206dGV4dC1zbVwiXG4gICAgICAgICAgPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAgZ2FwLTEgcHgtMyBweS0yIG1pbi1oLTEwXCI+XG4gICAgICAgICAgICB7c2VsZWN0ZWQubWFwKChjKSA9PiAoXG4gICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAga2V5PXtjLnZhbHVlfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHJvdW5kZWQtbWQgYmctcHJpbWFyeS8xMCB0ZXh0LXNsYXRlLTcwMCBweC0yIHB5LTEgdGV4dC14c1wiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7Yy50ZXh0fVxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0U2VsZWN0ZWQoKHByZXYpID0+IHByZXYuZmlsdGVyKChzKSA9PiBzLnZhbHVlICE9PSBjLnZhbHVlKSl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTcwMCBob3Zlcjp0ZXh0LXNsYXRlLTcwMC84MFwiXG4gICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtpbmRUKFwiQ29tbW9uX0RlbGV0ZVwiLCBcIkRlbGV0ZVwiKX1cbiAgICAgICAgICAgICAgICAgIHRpdGxlPXtpbmRUKFwiQ29tbW9uX0RlbGV0ZVwiLCBcIkRlbGV0ZVwiKX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8WE1hcmtJY29uIGNsYXNzTmFtZT1cImgtNCB3LTRcIiBhcmlhLWhpZGRlbj1cInRydWVcIiAvPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICBpZD17aW5wdXRJZH1cbiAgICAgICAgICAgICAgbmFtZT17YCR7aWRCYXNlfS1jb250YWN0cy1xdWVyeWB9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXgtMSBtaW4tdy0zMCBiZy10cmFuc3BhcmVudCB0ZXh0LXNtIHNtOnRleHQtYmFzZSBsZWFkaW5nLTUgdGV4dC1zbGF0ZS05MDAgYm9yZGVyLW5vbmUgb3V0bGluZS1oaWRkZW4gcHgtMSBweS0xIGZvY3VzOnJpbmctMCBmb2N1czpib3JkZXItdHJhbnNwYXJlbnRcIlxuICAgICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBzZXRRdWVyeShldmVudC50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICBvbktleURvd249e2hhbmRsZUtleURvd259XG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtzZWxlY3RlZC5sZW5ndGggPyBcIlwiIDogaW5kVChcIlZpc2l0c19DcmVhdGVfRmlsdGVyUGxhY2Vob2xkZXJcIiwgXCJUeXBlIHRvIGZpbHRlci4uLlwiKX1cbiAgICAgICAgICAgICAgYXV0b0NvbXBsZXRlPVwib2ZmXCJcbiAgICAgICAgICAgICAgcmVmPXtpbnB1dFJlZn1cbiAgICAgICAgICAgICAgcmVhZE9ubHk9eyFhY2NvdW50TnVtfVxuICAgICAgICAgICAgICByb2xlPVwiY29tYm9ib3hcIlxuICAgICAgICAgICAgICBhcmlhLWV4cGFuZGVkPXtvcGVufVxuICAgICAgICAgICAgICBhcmlhLWNvbnRyb2xzPXtsaXN0SWR9XG4gICAgICAgICAgICAgIGFyaWEtYWN0aXZlZGVzY2VuZGFudD17YWN0aXZlSWR9XG4gICAgICAgICAgICAgIGFyaWEtYXV0b2NvbXBsZXRlPVwibGlzdFwiXG4gICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2luZFQoXCJWaXNpdHNfQ3JlYXRlX1NlYXJjaENvbnRhY3RcIiwgXCJTZWFyY2ggY29udGFjdFwiKX1cbiAgICAgICAgICAgICAgb25Gb2N1cz17KCkgPT4ge1xuICAgICAgICAgICAgICAgIGVuc3VyZUxvYWRlZCgpO1xuICAgICAgICAgICAgICAgIHNldE9wZW4odHJ1ZSk7XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgeyhsb2FkaW5nIHx8IGJsb2NraW5nKSAmJiAoXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LXktMCByaWdodC05IGZsZXggaXRlbXMtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgPFNwaW5uZXIgLz5cbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LXktMCByaWdodC0wIGZsZXggaXRlbXMtY2VudGVyIHByLTIgdGV4dC1zbGF0ZS01MDAgaG92ZXI6dGV4dC1zbGF0ZS02MDBcIlxuICAgICAgICAgICAgYXJpYS1sYWJlbD17b3BlbiA/IGluZFQoXCJEcm9wZG93bl9IaWRlT3B0aW9uc1wiLCBcIkhpZGUgb3B0aW9uc1wiKSA6IGluZFQoXCJEcm9wZG93bl9TaG93T3B0aW9uc1wiLCBcIlNob3cgb3B0aW9uc1wiKX1cbiAgICAgICAgICAgIGFyaWEtZXhwYW5kZWQ9e29wZW59XG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgIGlmICghYWNjb3VudE51bSkgcmV0dXJuO1xuICAgICAgICAgICAgICBpZiAob3Blbikge1xuICAgICAgICAgICAgICAgIHNldE9wZW4oZmFsc2UpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGVuc3VyZUxvYWRlZCgpO1xuICAgICAgICAgICAgICAgIHNldE9wZW4odHJ1ZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH19XG4gICAgICAgICAgPlxuICAgICAgICAgICAge29wZW4gPyA8Q2hldnJvblVwU3ZnIGNsYXNzTmFtZT1cImgtNSB3LTVcIiBhcmlhLWhpZGRlbj1cInRydWVcIiAvPiA6IDxDaGV2cm9uRG93blN2ZyBjbGFzc05hbWU9XCJoLTUgdy01XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgLz59XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxGbG9hdGluZ0xpc3RcbiAgICAgICAgICAgIGFuY2hvclJlZj17Ym94UmVmfVxuICAgICAgICAgICAgb3Blbj17b3Blbn1cbiAgICAgICAgICAgIHpJbmRleD17MzgwMDAwfVxuICAgICAgICAgICAgbWF4SGVpZ2h0Q2xhc3M9XCJtYXgtaC03MlwiXG4gICAgICAgICAgICByb2xlPVwibGlzdGJveFwiXG4gICAgICAgICAgICByb3VuZGVkQ2xhc3M9XCJyb3VuZGVkLVs1cHhdXCJcbiAgICAgICAgICAgIHBvcnRhbENsYXNzTmFtZT17cG9ydGFsQ2xhc3NOYW1lfVxuICAgICAgICAgICAgcGFuZWxDbGFzc05hbWU9e3BhbmVsQ2xhc3NOYW1lfVxuICAgICAgICAgID5cbiAgICAgICAgICA8ZGl2IHJlZj17bGlzdFJlZn0gaWQ9e2xpc3RJZH0gYXJpYS1tdWx0aXNlbGVjdGFibGU9XCJ0cnVlXCI+XG4gICAgICAgICAgICB7bG9hZGluZyAmJiAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgcHgtNCBweS0yIHRleHQtc20gdGV4dC1zbGF0ZS01MDBcIj5cbiAgICAgICAgICAgICAgICA8U3Bpbm5lciBzaXplPVwiaC00IHctNFwiIC8+XG4gICAgICAgICAgICAgICAge2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIHshbG9hZGluZyAmJiBvcHRpb25zLmxlbmd0aCA9PT0gMCAmJiAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHgtNCBweS0yIHRleHQtc20gdGV4dC1zbGF0ZS01MDBcIj5cbiAgICAgICAgICAgICAgICB7aGFzTG9hZGVkID8gaW5kVChcIlZpc2l0c19DcmVhdGVfTm9Db250YWN0c1wiLCBcIk5vIGNvbnRhY3RzXCIpIDogaW5kVChcIlZpc2l0c19DcmVhdGVfU2VsZWN0Q2xpZW50Rmlyc3RcIiwgXCJTZWxlY3QgYSBjbGllbnQgZmlyc3QuXCIpfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICB7IWxvYWRpbmcgJiYgb3B0aW9ucy5sZW5ndGggPiAwICYmIGZpbHRlcmVkLmxlbmd0aCA9PT0gMCAmJiAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHgtNCBweS0yIHRleHQtc20gdGV4dC1zbGF0ZS01MDBcIj5cbiAgICAgICAgICAgICAgICB7cXVlcnkudHJpbSgpID8gaW5kVChcIlZpc2l0c19DcmVhdGVfTm9NYXRjaGVzXCIsIFwiTm8gbWF0Y2hlc1wiKSA6IGluZFQoXCJWaXNpdHNfQ3JlYXRlX05vTW9yZUNvbnRhY3RzXCIsIFwiTm8gbW9yZSBjb250YWN0cyBhdmFpbGFibGVcIil9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIHshbG9hZGluZyAmJlxuICAgICAgICAgICAgICBmaWx0ZXJlZC5tYXAoKG9wdCwgaWR4KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2VsID0gc2VsZWN0ZWQuc29tZSgocykgPT4gcy52YWx1ZSA9PT0gb3B0LnZhbHVlKTtcbiAgICAgICAgICAgICAgICBjb25zdCBpc0FjdGl2ZSA9IGlkeCA9PT0gYWN0aXZlSW5kZXg7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgIGtleT17b3B0LnZhbHVlfVxuICAgICAgICAgICAgICAgICAgICBpZD17YCR7aWRCYXNlfS1jb250YWN0LW9wdC0ke29wdC52YWx1ZX1gfVxuICAgICAgICAgICAgICAgICAgICByb2xlPVwib3B0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgYXJpYS1zZWxlY3RlZD17c2VsfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICAgICAgICAgICAgXCJyZWxhdGl2ZSBmbGV4IHctZnVsbCBjdXJzb3ItZGVmYXVsdCBzZWxlY3Qtbm9uZSBpdGVtcy1zdGFydCBweS0yIHB4LTMgdGV4dC1sZWZ0IHRleHQtc21cIixcbiAgICAgICAgICAgICAgICAgICAgICBpc0FjdGl2ZSA/IFwiYmctcHJpbWFyeSB0ZXh0LXdoaXRlXCIgOiBzZWwgPyBcImJnLXByaW1hcnkvMTAgdGV4dC1wcmltYXJ5XCIgOiBcInRleHQtc2xhdGUtOTAwXCJcbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgb25Nb3VzZUVudGVyPXsoKSA9PiBzZXRBY3RpdmVJbmRleChpZHgpfVxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB0b2dnbGVPcHRpb24ob3B0KX1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBmbGV4IGZsZXgtY29sIGdhcC0wLjUgcHItMlwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcImJsb2NrIHRydW5jYXRlXCIsIHNlbCA/IFwiZm9udC1tZWRpdW1cIiA6IFwiZm9udC1ub3JtYWxcIil9PntvcHQudGV4dH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC14cyB0ZXh0LXNsYXRlLTYwMCB0cnVuY2F0ZVwiPntvcHQuY2FyZ299PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH0pfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAge2Jsb2NraW5nICYmIChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIHotNzAwMDAgYmctd2hpdGUvNzAgYmFja2Ryb3AtYmx1ci1bMXB4XSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciByb3VuZGVkLVs1cHhdXCI+XG4gICAgICAgICAgICAgICAgPFNwaW5uZXIgc2l6ZT1cImgtNiB3LTZcIiAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9GbG9hdGluZ0xpc3Q+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsIGZsZXgganVzdGlmeS1lbmRcIj5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXNsYXRlLTUwMCB0ZWNoLWluZm9cIj57c3RhdHVzfTwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29udGFjdHNDb21ib2JveDtcbiIsICJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmZ1bmN0aW9uIFhNYXJrSWNvbih7XG4gIHRpdGxlLFxuICB0aXRsZUlkLFxuICAuLi5wcm9wc1xufSwgc3ZnUmVmKSB7XG4gIHJldHVybiAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChcInN2Z1wiLCBPYmplY3QuYXNzaWduKHtcbiAgICB4bWxuczogXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLFxuICAgIHZpZXdCb3g6IFwiMCAwIDIwIDIwXCIsXG4gICAgZmlsbDogXCJjdXJyZW50Q29sb3JcIixcbiAgICBcImFyaWEtaGlkZGVuXCI6IFwidHJ1ZVwiLFxuICAgIFwiZGF0YS1zbG90XCI6IFwiaWNvblwiLFxuICAgIHJlZjogc3ZnUmVmLFxuICAgIFwiYXJpYS1sYWJlbGxlZGJ5XCI6IHRpdGxlSWRcbiAgfSwgcHJvcHMpLCB0aXRsZSA/IC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KFwidGl0bGVcIiwge1xuICAgIGlkOiB0aXRsZUlkXG4gIH0sIHRpdGxlKSA6IG51bGwsIC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KFwicGF0aFwiLCB7XG4gICAgZDogXCJNNi4yOCA1LjIyYS43NS43NSAwIDAgMC0xLjA2IDEuMDZMOC45NCAxMGwtMy43MiAzLjcyYS43NS43NSAwIDEgMCAxLjA2IDEuMDZMMTAgMTEuMDZsMy43MiAzLjcyYS43NS43NSAwIDEgMCAxLjA2LTEuMDZMMTEuMDYgMTBsMy43Mi0zLjcyYS43NS43NSAwIDAgMC0xLjA2LTEuMDZMMTAgOC45NCA2LjI4IDUuMjJaXCJcbiAgfSkpO1xufVxuY29uc3QgRm9yd2FyZFJlZiA9IC8qI19fUFVSRV9fKi8gUmVhY3QuZm9yd2FyZFJlZihYTWFya0ljb24pO1xuZXhwb3J0IGRlZmF1bHQgRm9yd2FyZFJlZjsiLCAiXHVGRUZGaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IENsaWVudFNlYXJjaENvbWJvYm94IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL3Zpc2l0YXMvQ2xpZW50U2VhcmNoQ29tYm9ib3gudHN4XCI7XG5pbXBvcnQgQ29udGFjdHNDb21ib2JveCBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy92aXNpdGFzL0NvbnRhY3RzQ29tYm9ib3gudHN4XCI7XG5cbmV4cG9ydCB0eXBlIENyZWF0ZVNlbGVjdGVkQ2xpZW50ID0ge1xuICB2YWx1ZTogc3RyaW5nO1xuICB0ZXh0OiBzdHJpbmc7XG4gIGNhcmdvPzogc3RyaW5nO1xuICBlbXByZXNhPzogc3RyaW5nO1xufSB8IG51bGw7XG5cbmV4cG9ydCB0eXBlIENyZWF0ZVNlbGVjdGVkQ29udGFjdCA9IHtcbiAgdmFsdWU6IHN0cmluZztcbiAgdGV4dDogc3RyaW5nO1xuICBjYXJnbzogc3RyaW5nO1xuICBlbXByZXNhOiBzdHJpbmc7XG59O1xuXG50eXBlIENyZWF0ZVN0ZXBDbGllbnRTZWxlY3Rpb25Qcm9wcyA9IHtcbiAgc2VsZWN0ZWRDbGllbnQ6IENyZWF0ZVNlbGVjdGVkQ2xpZW50O1xuICBzZWxlY3RlZENvbnRhY3RzOiBDcmVhdGVTZWxlY3RlZENvbnRhY3RbXTtcbiAgb25DbGllbnRTZWxlY3RlZDogKG5leHRDbGllbnQ6IENyZWF0ZVNlbGVjdGVkQ2xpZW50KSA9PiB2b2lkO1xuICBvbkNvbnRhY3RzQ2hhbmdlOiAobmV4dENvbnRhY3RzOiBDcmVhdGVTZWxlY3RlZENvbnRhY3RbXSkgPT4gdm9pZDtcbiAgY2xpZW50TGFiZWw6IHN0cmluZztcbiAgY2xpZW50UGxhY2Vob2xkZXI6IHN0cmluZztcbiAgc2VsZWN0ZWRDb250YWN0c0NvdW50VGV4dDogc3RyaW5nO1xufTtcblxuLy8gUmVuZGVycyBzdGVwIDEgd2hlcmUgdXNlciBzZWxlY3RzIHRoZSBhY2NvdW50IGFuZCByZWxhdGVkIGNvbnRhY3RzLlxuY29uc3QgQ3JlYXRlU3RlcENsaWVudFNlbGVjdGlvbiA9ICh7XG4gIHNlbGVjdGVkQ2xpZW50LFxuICBzZWxlY3RlZENvbnRhY3RzLFxuICBvbkNsaWVudFNlbGVjdGVkLFxuICBvbkNvbnRhY3RzQ2hhbmdlLFxuICBjbGllbnRMYWJlbCxcbiAgY2xpZW50UGxhY2Vob2xkZXIsXG4gIHNlbGVjdGVkQ29udGFjdHNDb3VudFRleHQsXG59OiBDcmVhdGVTdGVwQ2xpZW50U2VsZWN0aW9uUHJvcHMpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNlwiPlxuICAgICAgPENsaWVudFNlYXJjaENvbWJvYm94XG4gICAgICAgIHZhbHVlPXtzZWxlY3RlZENsaWVudH1cbiAgICAgICAgb25TZWxlY3RlZD17b25DbGllbnRTZWxlY3RlZH1cbiAgICAgICAgbGFiZWw9e2NsaWVudExhYmVsfVxuICAgICAgICBwbGFjZWhvbGRlcj17Y2xpZW50UGxhY2Vob2xkZXJ9XG4gICAgICAgIHBvcnRhbENsYXNzTmFtZT1cInZpc2l0YXMtdHlwb2dyYXBoeVwiXG4gICAgICAvPlxuXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktM1wiPlxuICAgICAgICA8Q29udGFjdHNDb21ib2JveFxuICAgICAgICAgIGFjY291bnROdW09e3NlbGVjdGVkQ2xpZW50Py52YWx1ZX1cbiAgICAgICAgICB2YWx1ZT17c2VsZWN0ZWRDb250YWN0c31cbiAgICAgICAgICBvbkNoYW5nZT17b25Db250YWN0c0NoYW5nZX1cbiAgICAgICAgICBwb3J0YWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxuICAgICAgICAvPlxuICAgICAgICB7c2VsZWN0ZWRDb250YWN0cy5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS02MDBcIj5cbiAgICAgICAgICAgIHtzZWxlY3RlZENvbnRhY3RzQ291bnRUZXh0fVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDcmVhdGVTdGVwQ2xpZW50U2VsZWN0aW9uO1xyXG4iLCAiXHVGRUZGaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFNpbmdsZURhdGVQaWNrZXIgZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9TaW5nbGVEYXRlUGlja2VyLnRzeFwiO1xuaW1wb3J0IFNlbGVjdENvbWJvYm94IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvU2VsZWN0Q29tYm9ib3gudHN4XCI7XG5pbXBvcnQgVmlzaXROYXJyYXRpdmVGaWVsZHMgZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvdmlzaXRhcy9WaXNpdE5hcnJhdGl2ZUZpZWxkcy50c3hcIjtcblxudHlwZSBTZWxlY3RPcHRpb24gPSB7XG4gIHZhbHVlPzogc3RyaW5nIHwgbnVtYmVyO1xuICBWYWx1ZT86IHN0cmluZyB8IG51bWJlcjtcbiAgdGV4dD86IHN0cmluZztcbiAgVGV4dD86IHN0cmluZztcbn07XG5cbnR5cGUgTmFycmF0aXZlVGFwRmllbGQgPSB7XG4gIGlkOiBzdHJpbmc7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIHZhbHVlOiBzdHJpbmc7XG4gIGNsYXNzTmFtZTogc3RyaW5nO1xuICBwb2ludGVyQmluZGluZ3M6IHtcbiAgICBvblBvaW50ZXJEb3duPzogUmVhY3QuUG9pbnRlckV2ZW50SGFuZGxlcjxIVE1MVGV4dEFyZWFFbGVtZW50PjtcbiAgICBvblBvaW50ZXJNb3ZlPzogUmVhY3QuUG9pbnRlckV2ZW50SGFuZGxlcjxIVE1MVGV4dEFyZWFFbGVtZW50PjtcbiAgICBvblBvaW50ZXJVcD86IFJlYWN0LlBvaW50ZXJFdmVudEhhbmRsZXI8SFRNTFRleHRBcmVhRWxlbWVudD47XG4gICAgb25Qb2ludGVyQ2FuY2VsPzogUmVhY3QuUG9pbnRlckV2ZW50SGFuZGxlcjxIVE1MVGV4dEFyZWFFbGVtZW50PjtcbiAgfTtcbn07XG5cbnR5cGUgQ3JlYXRlU3RlcFZpc2l0RGV0YWlsc1Byb3BzID0ge1xuICB0aXRsZTogc3RyaW5nO1xuICBkYXRlTGFiZWw6IHN0cmluZztcbiAgdHJhbnNEYXRlOiBzdHJpbmc7XG4gIG9uVHJhbnNEYXRlQ2hhbmdlOiAobmV4dFZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHZpc2l0VHlwZUxhYmVsOiBzdHJpbmc7XG4gIHZpc2l0VHlwZXM6IFNlbGVjdE9wdGlvbltdO1xuICB2aXNpdFR5cGU6IHN0cmluZztcbiAgb25WaXNpdFR5cGVDaGFuZ2U6IChuZXh0VmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgdmlzaXRUeXBlUGxhY2Vob2xkZXI6IHN0cmluZztcbiAgdmlzaXRUeXBlSW52YWxpZDogYm9vbGVhbjtcbiAgZGVzY3JpcHRpb25MYWJlbDogc3RyaW5nO1xuICBkZXNjcmlwdGlvblZhbHVlOiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uQ2xhc3NOYW1lOiBzdHJpbmc7XG4gIG9uRGVzY3JpcHRpb25DaGFuZ2U6IChuZXh0VmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgdGFwRmllbGRzOiBOYXJyYXRpdmVUYXBGaWVsZFtdO1xuICBzdGF0dXM6IHN0cmluZztcbn07XG5cbi8vIFJlbmRlcnMgc3RlcCAyIHdpdGggdmlzaXQgbWV0YWRhdGEgYW5kIG5hcnJhdGl2ZSBmaWVsZHMuXG5jb25zdCBDcmVhdGVTdGVwVmlzaXREZXRhaWxzID0gKHtcbiAgdGl0bGUsXG4gIGRhdGVMYWJlbCxcbiAgdHJhbnNEYXRlLFxuICBvblRyYW5zRGF0ZUNoYW5nZSxcbiAgdmlzaXRUeXBlTGFiZWwsXG4gIHZpc2l0VHlwZXMsXG4gIHZpc2l0VHlwZSxcbiAgb25WaXNpdFR5cGVDaGFuZ2UsXG4gIHZpc2l0VHlwZVBsYWNlaG9sZGVyLFxuICB2aXNpdFR5cGVJbnZhbGlkLFxuICBkZXNjcmlwdGlvbkxhYmVsLFxuICBkZXNjcmlwdGlvblZhbHVlLFxuICBkZXNjcmlwdGlvbkNsYXNzTmFtZSxcbiAgb25EZXNjcmlwdGlvbkNoYW5nZSxcbiAgdGFwRmllbGRzLFxuICBzdGF0dXMsXG59OiBDcmVhdGVTdGVwVmlzaXREZXRhaWxzUHJvcHMpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNoYWRvdy14cyBnbGFzcy1wYW5lbCBwLTQgc3BhY2UteS00IGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHJvdW5kZWQtMnhsXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtYmFzZSBmb250LXNlbWlib2xkIHRleHQtc2xhdGUtOTAwIGJvcmRlci1iIGJvcmRlci1zbGF0ZS0yMDAgcGItM1wiPlxuICAgICAgICB7dGl0bGV9XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMiBnYXAtNFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInZpc2l0YS1maWVsZC10ZXh0XCI+XG4gICAgICAgICAgPFNpbmdsZURhdGVQaWNrZXIgbGFiZWw9e2RhdGVMYWJlbH0gdmFsdWU9e3RyYW5zRGF0ZX0gb25DaGFuZ2U9e29uVHJhbnNEYXRlQ2hhbmdlfSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPFNlbGVjdENvbWJvYm94XG4gICAgICAgICAgbGFiZWw9e3Zpc2l0VHlwZUxhYmVsfVxuICAgICAgICAgIG9wdGlvbnM9e3Zpc2l0VHlwZXN9XG4gICAgICAgICAgdmFsdWU9e3Zpc2l0VHlwZX1cbiAgICAgICAgICBvbkNoYW5nZT17KG5leHRWYWx1ZSkgPT4gb25WaXNpdFR5cGVDaGFuZ2UoU3RyaW5nKG5leHRWYWx1ZSA/PyBcIlwiKSl9XG4gICAgICAgICAgcGxhY2Vob2xkZXI9e3Zpc2l0VHlwZVBsYWNlaG9sZGVyfVxuICAgICAgICAgIGludmFsaWQ9e3Zpc2l0VHlwZUludmFsaWR9XG4gICAgICAgICAgZW1pdE9uVmFsdWVDaGFuZ2VcbiAgICAgICAgICBwb3J0YWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxWaXNpdE5hcnJhdGl2ZUZpZWxkc1xuICAgICAgICBkZXNjcmlwdGlvbkxhYmVsPXtkZXNjcmlwdGlvbkxhYmVsfVxuICAgICAgICBkZXNjcmlwdGlvblZhbHVlPXtkZXNjcmlwdGlvblZhbHVlfVxuICAgICAgICBkZXNjcmlwdGlvbkNsYXNzTmFtZT17ZGVzY3JpcHRpb25DbGFzc05hbWV9XG4gICAgICAgIG9uRGVzY3JpcHRpb25DaGFuZ2U9e29uRGVzY3JpcHRpb25DaGFuZ2V9XG4gICAgICAgIHRhcEZpZWxkcz17dGFwRmllbGRzfVxuICAgICAgLz5cblxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtM1wiPlxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNtIHRleHQtc2xhdGUtNTAwXCI+e3N0YXR1c308L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENyZWF0ZVN0ZXBWaXNpdERldGFpbHM7XHJcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgQ3JlYXRlRm9ybSBmcm9tIFwiLi9DcmVhdGVGb3JtLnRzeFwiO1xuaW1wb3J0IFZpc2l0YXNQYWdlUHJvdmlkZXJzIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvVmlzaXRhc1BhZ2VQcm92aWRlcnMudHN4XCI7XG5pbXBvcnQgeyBtb3VudFJlYWN0SXNsYW5kLCBtb3VudFdoZW5Eb2N1bWVudFJlYWR5IH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3JlYWN0SXNsYW5kLnRzeFwiO1xuXG4vLyBQYWdlIGVudHJ5IGZvciB0aGUgdmlzaXRhcyBjcmVhdGUgaXNsYW5kLlxuY29uc3QgQ3JlYXRlUGFnZSA9ICgpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8VmlzaXRhc1BhZ2VQcm92aWRlcnM+XG4gICAgICA8Q3JlYXRlRm9ybSAvPlxuICAgIDwvVmlzaXRhc1BhZ2VQcm92aWRlcnM+XG4gICk7XG59O1xuXG5jb25zdCBtb3VudCA9ICgpID0+IHtcbiAgY29uc3Qgcm9vdEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2aXNpdGFzLWFwcC1yb290XCIpO1xuICBpZiAoIXJvb3RFbCkgcmV0dXJuO1xuXG4gIG1vdW50UmVhY3RJc2xhbmQocm9vdEVsLCA8Q3JlYXRlUGFnZSAvPik7XG59O1xuXG5tb3VudFdoZW5Eb2N1bWVudFJlYWR5KG1vdW50KTtcblxuZXhwb3J0IGRlZmF1bHQgQ3JlYXRlUGFnZTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUMsSUFBQUEsZ0JBQTREOzs7QUNBN0QsbUJBQTBCO0FBR25CLElBQU0sWUFBWSxDQUN2QixNQUNBLFdBQ0EsUUFDQSxRQUNBLE9BQU8sT0FDUCxpQkFBaUIsTUFDakJDLGFBQVksU0FDVDtBQUNILDhCQUFVLE1BQU07QUFDZCxVQUFNLFVBQVUsU0FBUyxlQUFlLGtCQUFrQjtBQUMxRCxVQUFNLE9BQU8sU0FBUyxlQUFlLGVBQWU7QUFDcEQsVUFB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MEUsR0FDL0ksdURBQUMsY0FBVyxHQUNkO0FBRUo7OztBVTNYTSxJQUFBQyxzQkFBQTtBQUhOLElBQU0sYUFBYSxNQUFNO0FBQ3ZCLFNBQ0UsNkNBQUMsZ0NBQ0MsdURBQUMsY0FBVyxHQUNkO0FBRUo7QUFFQSxJQUFNLFFBQVEsTUFBTTtBQUNsQixRQUFNLFNBQVMsU0FBUyxlQUFlLGtCQUFrQjtBQUN6RCxNQUFJLENBQUMsT0FBUTtBQUViLG1CQUFpQixRQUFRLDZDQUFDLGNBQVcsQ0FBRTtBQUN6QztBQUVBLHVCQUF1QixLQUFLO0FBRTVCLElBQU8scUJBQVE7IiwKICAibmFtZXMiOiBbImltcG9ydF9yZWFjdCIsICJjYW5BY2Nlc3MiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAidmFsdWUiLCAiUmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiUmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIl0KfQo=
