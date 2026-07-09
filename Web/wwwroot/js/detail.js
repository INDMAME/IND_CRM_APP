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
import {
  clearTextEditorValue
} from "./chunks/chunk-6FM7OI23.js";
import {
  formatModuleVisibleUserLabel,
  resolveModuleOwnerMutationAccess,
  useModuleDataVisibility
} from "./chunks/chunk-BHTW7YTR.js";
import "./chunks/chunk-DG56V5LO.js";
import {
  SelectCombobox_default
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
  setTopbarActionGroupReady
} from "./chunks/chunk-ZBKHPZJX.js";
import "./chunks/chunk-DY2B5JHI.js";
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
  getCsrfToken,
  indT
} from "./chunks/chunk-PNIKV5DC.js";
import {
  getSessionValueWithExpiry,
  removeSessionValueWithExpiry,
  setSessionValueWithExpiry
} from "./chunks/chunk-6HGCHSZG.js";
import {
  __toESM
} from "./chunks/chunk-W7NC74ZX.js";

// Web/wwwroot/react/src/pages/visitas/detail/DetailForm.tsx
var import_react5 = __toESM(require_react());

// Web/wwwroot/react/src/utils/domGuards.ts
var bindReadOnlyGuard = (el) => {
  if (!el) return () => {
  };
  const cancel = (event) => event.preventDefault();
  const events = ["contextmenu", "selectstart", "copy", "cut", "paste"];
  events.forEach((evt) => el.addEventListener(evt, cancel));
  return () => {
    events.forEach((evt) => el.removeEventListener(evt, cancel));
  };
};

// Web/wwwroot/react/src/utils/strings.ts
var hasValue = (value) => String(value || "").trim().length > 0;

// Web/wwwroot/react/src/hooks/useDetailHydration.ts
var import_react = __toESM(require_react());
var isResponseSuccess = (response) => {
  return response.success === true || response.Success === true;
};
var getResponseMessage = (response) => {
  const raw = response.message ?? response.Message;
  return typeof raw === "string" ? raw.trim() : "";
};
var getResponseData = (response) => {
  const data = response.data ?? response.Data;
  return data && typeof data === "object" ? data : null;
};
var asRecord = (value) => {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return value;
};
var useDetailHydration = ({
  actividadId,
  shouldHydrate,
  visitTypes,
  contactMethods,
  asistenteTipos,
  defaultVisitType,
  initialAsistente,
  normalizeDateToInput,
  matchOptionValue,
  applyDraftValues,
  applyTextEditorValues,
  setStatus,
  setIsHydrating,
  setTransDate,
  setVisitType,
  setContactMethod,
  setAsistenteTipo,
  setDescription,
  setComentarios,
  setAntecedentes,
  setConclusiones
}) => {
  const hydrateFromApi = (0, import_react.useCallback)(async () => {
    if (!actividadId) return;
    setIsHydrating(true);
    try {
      const res = await fetchJson(`/Visitas/GetActivityByCode?code=${encodeURIComponent(actividadId)}`);
      const responseData = getResponseData(res);
      if (!isResponseSuccess(res) || !responseData) {
        setStatus(getResponseMessage(res) || indT("Visits_Detail_LoadActivityFailed", "Failed to load activity details."));
        return;
      }
      const rawDate = String(responseData.transDate ?? responseData.TransDate ?? "");
      setTransDate(normalizeDateToInput(rawDate));
      const rawVisitType = String(
        responseData.tipoVisita ?? responseData.TipoVisita ?? responseData.visitType ?? responseData.VisitType ?? ""
      );
      setVisitType(matchOptionValue(visitTypes, rawVisitType) || defaultVisitType);
      const rawContactMethod = String(
        responseData.contactMethod ?? responseData.ContactMethod ?? ""
      );
      setContactMethod(matchOptionValue(contactMethods, rawContactMethod));
      const asistentesList = responseData.asistentes ?? responseData.Asistentes;
      const firstAsistente = Array.isArray(asistentesList) && asistentesList.length ? asRecord(asistentesList[0]) : null;
      const rawAsistenteTipo = String(
        responseData.asistenteTipo ?? responseData.AsistenteTipo ?? firstAsistente?.asistenteTipo ?? firstAsistente?.AsistenteTipo ?? ""
      );
      const normalizedAsistenteTipo = matchOptionValue(asistenteTipos, rawAsistenteTipo);
      setAsistenteTipo(normalizedAsistenteTipo || initialAsistente);
      setDescription(String(responseData.description ?? responseData.Description ?? ""));
      setComentarios(String(responseData.comentarios ?? responseData.Comentarios ?? ""));
      setAntecedentes(String(responseData.antecedentes ?? responseData.Antecedentes ?? ""));
      setConclusiones(String(responseData.conclusiones ?? responseData.Conclusiones ?? ""));
    } catch {
    } finally {
      setIsHydrating(false);
      applyDraftValues();
      applyTextEditorValues();
    }
  }, [
    actividadId,
    applyDraftValues,
    applyTextEditorValues,
    asistenteTipos,
    contactMethods,
    defaultVisitType,
    initialAsistente,
    matchOptionValue,
    normalizeDateToInput,
    setAntecedentes,
    setAsistenteTipo,
    setComentarios,
    setConclusiones,
    setDescription,
    setIsHydrating,
    setStatus,
    setTransDate,
    setVisitType,
    setContactMethod,
    visitTypes
  ]);
  (0, import_react.useEffect)(() => {
    if (shouldHydrate) {
      hydrateFromApi();
      return;
    }
    applyDraftValues();
    applyTextEditorValues();
  }, [applyDraftValues, applyTextEditorValues, hydrateFromApi, shouldHydrate]);
};

// Web/wwwroot/react/src/hooks/useDetailTopbarActions.ts
var import_react2 = __toESM(require_react());
var useDetailTopbarActions = ({
  busy,
  modalOpen,
  isEditing,
  canEditHistory,
  canDeleteHistory,
  transDate,
  setModalError,
  handleEnableEdit,
  handleCancelEdit,
  handleUpdate,
  handleDelete,
  onPermissionBlocked,
  actionGroupId = "visit-detail-actions",
  permissionsReady = true,
  openConfirm,
  closeConfirm
}) => {
  (0, import_react2.useEffect)(() => {
    if (!permissionsReady) return;
    const editIcon = document.getElementById("visitEditIcon");
    const saveIcon = document.getElementById("visitSaveIcon");
    const deleteBtn = document.getElementById("visitDeleteBtn");
    const cancelBtn = document.getElementById("visitCancelBtn");
    const editBtn = editIcon?.closest("button") ?? null;
    if (isEditing) {
      if (editBtn) editBtn.classList.toggle("topbar-hidden", !canEditHistory);
      if (editIcon) editIcon.classList.add("hidden");
      if (saveIcon) saveIcon.classList.remove("hidden");
      if (deleteBtn) deleteBtn.classList.add("topbar-hidden");
      if (cancelBtn) cancelBtn.classList.remove("topbar-hidden");
    } else {
      if (editBtn) editBtn.classList.toggle("topbar-hidden", !canEditHistory);
      if (editIcon) editIcon.classList.remove("hidden");
      if (saveIcon) saveIcon.classList.add("hidden");
      if (deleteBtn) deleteBtn.classList.toggle("topbar-hidden", !canDeleteHistory);
      if (cancelBtn) cancelBtn.classList.add("topbar-hidden");
    }
    setTopbarActionGroupReady(actionGroupId);
  }, [actionGroupId, canDeleteHistory, canEditHistory, isEditing, permissionsReady]);
  (0, import_react2.useEffect)(() => {
    if (!permissionsReady) return;
    const onEdit = () => {
      if (!canEditHistory) {
        onPermissionBlocked?.("edit");
        return;
      }
      if (isEditing) {
        if (busy || modalOpen) return;
        setModalError("");
        openConfirm({
          title: indT("Visits_Detail_SaveChanges_Title", "Visits_Detail_SaveChanges_Title"),
          message: indT("Visits_Detail_SaveChanges_Body", "Visits_Detail_SaveChanges_Body"),
          confirmText: indT("Common_Save", "Common_Save"),
          onConfirm: async () => {
            const ok = await handleUpdate();
            if (ok) {
              closeConfirm();
              setHistoryFilterForDate(transDate);
              await wait(200);
              flashActionMark("okProcess", 1200);
              await wait(1200);
              window.__indBypassNavigationGuardOnce?.();
              window.location.href = "/Historial/History";
            }
            return ok;
          }
        });
      } else {
        handleEnableEdit();
      }
    };
    const onDelete = () => {
      if (!canDeleteHistory) {
        onPermissionBlocked?.("delete");
        return;
      }
      if (busy || modalOpen) return;
      setModalError("");
      openConfirm({
        title: indT("Visits_Detail_DeleteActivity_Title", "Visits_Detail_DeleteActivity_Title"),
        message: indT("Visits_Detail_DeleteActivity_Body", "Visits_Detail_DeleteActivity_Body"),
        confirmText: indT("Common_Delete", "Common_Delete"),
        onConfirm: async () => {
          const ok = await handleDelete();
          if (ok) {
            closeConfirm();
            setHistoryFilterForDate(transDate);
            await wait(200);
            flashActionMark("okDelProcess", 1200);
            await wait(1200);
            window.__indBypassNavigationGuardOnce?.();
            window.location.href = "/Historial/History";
          }
          return ok;
        }
      });
    };
    const onCancelEdit = () => {
      if (busy || modalOpen) return;
      handleCancelEdit();
    };
    window.addEventListener("visit-edit", onEdit);
    window.addEventListener("visit-delete", onDelete);
    window.addEventListener("visit-cancel-edit", onCancelEdit);
    return () => {
      window.removeEventListener("visit-edit", onEdit);
      window.removeEventListener("visit-delete", onDelete);
      window.removeEventListener("visit-cancel-edit", onCancelEdit);
    };
  }, [
    busy,
    canDeleteHistory,
    canEditHistory,
    closeConfirm,
    handleCancelEdit,
    handleDelete,
    handleEnableEdit,
    handleUpdate,
    onPermissionBlocked,
    isEditing,
    modalOpen,
    openConfirm,
    permissionsReady,
    setModalError,
    transDate
  ]);
};

// Web/wwwroot/react/src/pages/visitas/detail/useDetailEditSession.ts
var import_react3 = __toESM(require_react());
var EDIT_MODE_TTL_MS = 6 * 60 * 60 * 1e3;
var DETAIL_DRAFT_TTL_MS = 24 * 60 * 60 * 1e3;
var useDetailEditSession = ({
  actividadId,
  recId,
  canEditHistory,
  isEditing,
  setIsEditing,
  transDate,
  visitType,
  contactMethod,
  asistenteTipo,
  description,
  comentarios,
  antecedentes,
  conclusiones,
  setTransDate,
  setVisitType,
  setContactMethod,
  setAsistenteTipo,
  setDescription,
  setComentarios,
  setAntecedentes,
  setConclusiones
}) => {
  const editModeKeyRef = (0, import_react3.useRef)("");
  const draftKeyRef = (0, import_react3.useRef)("");
  const draftPersistTimerRef = (0, import_react3.useRef)(null);
  const syncEditModeFlag = (0, import_react3.useCallback)((enabled) => {
    const key = editModeKeyRef.current;
    if (!key) return;
    if (enabled) {
      setSessionValueWithExpiry(key, "true", EDIT_MODE_TTL_MS);
      return;
    }
    removeSessionValueWithExpiry(key);
  }, []);
  const syncEditModeOnEntry = (0, import_react3.useCallback)(() => {
    const baseId = actividadId || recId || "default";
    const key = `ind_visit_edit_${baseId}`;
    const returnKey = `${key}_return`;
    const draftKey = `ind_visit_draft_${baseId}`;
    editModeKeyRef.current = key;
    try {
      const allowRestore = getSessionValueWithExpiry(returnKey) === "1";
      if (allowRestore) {
        removeSessionValueWithExpiry(returnKey);
      }
      if (canEditHistory && allowRestore && getSessionValueWithExpiry(key) === "true") {
        setIsEditing(true);
      } else {
        setIsEditing(false);
        removeSessionValueWithExpiry(key);
        removeSessionValueWithExpiry(draftKey);
      }
      if (!canEditHistory) {
        removeSessionValueWithExpiry(key);
        removeSessionValueWithExpiry(draftKey);
      }
    } catch {
    }
  }, [actividadId, canEditHistory, recId, setIsEditing]);
  (0, import_react3.useEffect)(() => {
    syncEditModeOnEntry();
  }, [syncEditModeOnEntry]);
  (0, import_react3.useEffect)(() => {
    const onPageShow = (event) => {
      const navEntry = typeof performance !== "undefined" && performance.getEntriesByType ? performance.getEntriesByType("navigation")[0] : void 0;
      const isBackForward = navEntry?.type === "back_forward";
      if (event?.persisted || isBackForward) {
        syncEditModeOnEntry();
      }
    };
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, [syncEditModeOnEntry]);
  (0, import_react3.useEffect)(() => {
    const key = `ind_visit_draft_${actividadId || recId || "default"}`;
    draftKeyRef.current = key;
  }, [actividadId, recId]);
  const saveDraft = (0, import_react3.useCallback)((draft) => {
    const key = draftKeyRef.current;
    if (!key) return;
    setSessionValueWithExpiry(key, JSON.stringify(draft), DETAIL_DRAFT_TTL_MS);
  }, []);
  const clearDraft = (0, import_react3.useCallback)(() => {
    const key = draftKeyRef.current;
    if (!key) return;
    removeSessionValueWithExpiry(key);
  }, []);
  const applyDraftValues = (0, import_react3.useCallback)(() => {
    const key = draftKeyRef.current;
    if (!key) return;
    try {
      const raw = getSessionValueWithExpiry(key);
      if (!raw) return;
      const draft = JSON.parse(raw);
      if (!draft || typeof draft !== "object") return;
      if (draft.transDate !== void 0) setTransDate(String(draft.transDate));
      if (draft.visitType !== void 0) setVisitType(String(draft.visitType));
      if (draft.contactMethod !== void 0) setContactMethod(String(draft.contactMethod));
      if (draft.asistenteTipo !== void 0) setAsistenteTipo(String(draft.asistenteTipo));
      if (draft.description !== void 0) setDescription(String(draft.description));
      if (draft.comentarios !== void 0) setComentarios(String(draft.comentarios));
      if (draft.antecedentes !== void 0) setAntecedentes(String(draft.antecedentes));
      if (draft.conclusiones !== void 0) setConclusiones(String(draft.conclusiones));
    } catch {
    }
  }, [setAntecedentes, setAsistenteTipo, setComentarios, setConclusiones, setContactMethod, setDescription, setTransDate, setVisitType]);
  (0, import_react3.useEffect)(() => {
    if (!isEditing) {
      if (draftPersistTimerRef.current) {
        clearTimeout(draftPersistTimerRef.current);
        draftPersistTimerRef.current = null;
      }
      return;
    }
    if (draftPersistTimerRef.current) {
      clearTimeout(draftPersistTimerRef.current);
    }
    draftPersistTimerRef.current = window.setTimeout(() => {
      draftPersistTimerRef.current = null;
      saveDraft({
        transDate,
        visitType,
        contactMethod,
        asistenteTipo,
        description,
        comentarios,
        antecedentes,
        conclusiones
      });
    }, 180);
    return () => {
      if (draftPersistTimerRef.current) {
        clearTimeout(draftPersistTimerRef.current);
        draftPersistTimerRef.current = null;
      }
    };
  }, [antecedentes, asistenteTipo, comentarios, conclusiones, contactMethod, description, isEditing, saveDraft, transDate, visitType]);
  return {
    editModeKeyRef,
    syncEditModeFlag,
    clearDraft,
    applyDraftValues
  };
};

// Web/wwwroot/react/src/pages/visitas/detail/useDetailMutations.ts
var import_react4 = __toESM(require_react());
var isCommandSuccess = (response) => {
  return response.success === true || response.Success === true;
};
var getCommandMessage = (response) => {
  const raw = response.message ?? response.Message;
  return typeof raw === "string" ? raw.trim() : "";
};
var toNullableEnumNumber = (value) => {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed >= 0 ? parsed : null;
};
var resolveSafeRecId = (rawRecId) => {
  const normalized = String(rawRecId ?? "").trim();
  if (!normalized) return null;
  if (!/^-?\d+$/.test(normalized)) return null;
  const absoluteDigits = normalized.startsWith("-") ? normalized.slice(1) : normalized;
  if (!absoluteDigits || /^0+$/.test(absoluteDigits)) return null;
  return normalized;
};
var shouldLogRecIdInDev = () => {
  if (typeof window === "undefined" || !window.location) return false;
  const host = String(window.location.hostname || "").trim().toLowerCase();
  return host === "localhost" || host === "127.0.0.1" || host.endsWith(".local");
};
var logSafeRecIdInDev = (operation, safeRecId) => {
  if (!shouldLogRecIdInDev()) return;
  console.info(`[visitas-detail] ${operation} recId`, safeRecId);
};
var useDetailMutations = ({
  busy,
  isEditing,
  canEditHistory,
  canDeleteHistory,
  recId,
  accountNum,
  transDate,
  visitType,
  contactMethod,
  asistenteTipo,
  description,
  comentarios,
  antecedentes,
  conclusiones,
  visitTypes,
  contactMethods,
  asistenteTipos,
  defaultVisitType,
  rawInitialVisitType,
  rawInitialContactMethod,
  rawInitialAsistente,
  matchOptionValue,
  clearDraft,
  syncEditModeFlag,
  onPermissionBlocked,
  setModalError,
  setBusy,
  setStatus,
  setIsEditing
}) => {
  const handleUpdate = (0, import_react4.useCallback)(async () => {
    if (busy || !isEditing) return false;
    if (!canEditHistory) {
      onPermissionBlocked?.("update");
      return false;
    }
    const safeRecIdValue = resolveSafeRecId(recId);
    if (safeRecIdValue === null) {
      const message = indT("Visits_Detail_InvalidRecId", "Could not resolve activity identifier. Reload and try again.");
      setModalError(message);
      setStatus(message);
      flashActionMark("errorProcess", 1500);
      return false;
    }
    setModalError("");
    setBusy(true);
    setStatus(indT("Visits_Detail_Updating", "Updating activity..."));
    try {
      const normalizedVisitType = matchOptionValue(visitTypes, visitType) || matchOptionValue(visitTypes, rawInitialVisitType) || defaultVisitType;
      const normalizedAsistenteTipo = matchOptionValue(asistenteTipos, asistenteTipo) || matchOptionValue(asistenteTipos, rawInitialAsistente) || rawInitialAsistente;
      const normalizedContactMethod = matchOptionValue(contactMethods, contactMethod) || matchOptionValue(contactMethods, rawInitialContactMethod);
      const payload = {
        accountNum,
        visitType: toNullableEnumNumber(normalizedVisitType),
        contactMethod: toNullableEnumNumber(normalizedContactMethod),
        asistenteTipo: toNullableEnumNumber(normalizedAsistenteTipo),
        description,
        transDate,
        comentarios,
        antecedentes,
        conclusiones
      };
      logSafeRecIdInDev("update", safeRecIdValue);
      const safeRecId = encodeURIComponent(safeRecIdValue);
      const response = await fetchJson(`/Visitas/UpdateActivity/${safeRecId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!isCommandSuccess(response)) {
        throw new Error(getCommandMessage(response) || indT("Visits_Detail_UpdateFailed", "Update failed."));
      }
      setStatus(indT("Visits_Detail_Updated", "Activity updated"));
      setIsEditing(false);
      syncEditModeFlag(false);
      clearDraft();
      return true;
    } catch (error) {
      const message = error instanceof Error && error.message ? error.message : indT("Visits_Detail_UpdateError", "Update error.");
      setModalError(message);
      setStatus(message);
      flashActionMark("errorProcess", 1500);
      return false;
    } finally {
      setBusy(false);
    }
  }, [
    accountNum,
    antecedentes,
    asistenteTipo,
    asistenteTipos,
    busy,
    canEditHistory,
    clearDraft,
    comentarios,
    conclusiones,
    contactMethod,
    contactMethods,
    defaultVisitType,
    description,
    isEditing,
    matchOptionValue,
    onPermissionBlocked,
    rawInitialAsistente,
    rawInitialContactMethod,
    rawInitialVisitType,
    recId,
    setBusy,
    setIsEditing,
    setModalError,
    setStatus,
    syncEditModeFlag,
    transDate,
    visitType,
    visitTypes
  ]);
  const handleDelete = (0, import_react4.useCallback)(async () => {
    if (busy) return false;
    if (!canDeleteHistory) {
      onPermissionBlocked?.("delete");
      return false;
    }
    const safeRecIdValue = resolveSafeRecId(recId);
    if (safeRecIdValue === null) {
      const message = indT("Visits_Detail_InvalidRecId", "Could not resolve activity identifier. Reload and try again.");
      setModalError(message);
      setStatus(message);
      flashActionMark("errorProcess", 1500);
      return false;
    }
    setModalError("");
    setBusy(true);
    setStatus(indT("Visits_Detail_Deleting", "Deleting activity..."));
    try {
      logSafeRecIdInDev("delete", safeRecIdValue);
      const safeRecId = encodeURIComponent(safeRecIdValue);
      const response = await fetchJson(`/Visitas/DeleteActivity/${safeRecId}`, { method: "DELETE" });
      if (!isCommandSuccess(response)) {
        throw new Error(getCommandMessage(response) || indT("Visits_Detail_DeleteFailed", "Delete failed."));
      }
      setStatus(indT("Visits_Detail_Deleted", "Activity deleted"));
      return true;
    } catch (error) {
      const message = error instanceof Error && error.message ? error.message : indT("Visits_Detail_DeleteError", "Delete error.");
      setModalError(message);
      setStatus(message);
      flashActionMark("errorProcess", 1500);
      return false;
    } finally {
      setBusy(false);
    }
  }, [busy, canDeleteHistory, onPermissionBlocked, recId, setBusy, setModalError, setStatus]);
  return {
    handleUpdate,
    handleDelete
  };
};

// Web/wwwroot/react/src/pages/visitas/detail/DetailOwnerField.tsx
var import_jsx_runtime = __toESM(require_jsx_runtime());
var DetailOwnerField = ({ label, value }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "visita-field-text", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "form-label font-semibold", htmlFor: "visit-detail-owner", children: label }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "input",
      {
        id: "visit-detail-owner",
        className: "form-control ind-readonly-field cursor-default",
        value,
        readOnly: true,
        "aria-readonly": "true"
      }
    )
  ] });
};
var DetailOwnerField_default = DetailOwnerField;

// Web/wwwroot/react/src/services/modulePermissionTraceService.ts
var TRACE_URL = "/ModulePermissions/Trace";
var MAX_BEACON_BYTES = 6e4;
var postModulePermissionTrace = (eventName, payload = {}) => {
  if (typeof window === "undefined") return;
  const event = String(eventName || "").trim();
  if (!event) return;
  const body = JSON.stringify({
    event,
    path: window.location?.pathname || "",
    ...payload
  });
  const csrfToken = getCsrfToken();
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest"
  };
  if (csrfToken) {
    headers.RequestVerificationToken = csrfToken;
  }
  void fetch(TRACE_URL, {
    method: "POST",
    credentials: "same-origin",
    headers,
    body,
    keepalive: body.length <= MAX_BEACON_BYTES
  }).catch(() => void 0);
};

// Web/wwwroot/react/src/pages/visitas/detail/DetailForm.tsx
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var EDITOR_RETURN_FLAG_TTL_MS = 2 * 60 * 60 * 1e3;
var APP_CODE = "CRM";
var MODULE_CODE = "VISITAS_GESTION";
var safeDetailText = (value) => String(value ?? "").trim();
var firstDetailText = (...values) => {
  for (const value of values) {
    const text = safeDetailText(value);
    if (text) return text;
  }
  return "";
};
var DetailApp = ({ companyId = "", axUserId = "", permissionsRevision = "" }) => {
  const { visitTypes, contactMethods, asistenteTipos } = useVisitas();
  const canViewHistory = canAccess("VISITAS_GESTION", "View");
  const canEditHistory = canAccess("VISITAS_GESTION", "Edit");
  const canDeleteHistory = canAccess("VISITAS_GESTION", "FullAccess");
  const detail = window.__ACTIVITY_DETAIL__ || {};
  const resolveActivityRecId = (payload) => {
    const candidates = [
      payload.recId,
      payload.RecId,
      payload.refRecIdActividad,
      payload.RefRecIdActividad,
      payload.actividadRecId,
      payload.ActividadRecId
    ];
    for (const candidate of candidates) {
      const normalized = String(candidate ?? "").trim();
      if (normalized) {
        return normalized;
      }
    }
    return "";
  };
  const activityRecId = resolveActivityRecId(detail);
  const detailOwnerAxUserId = firstDetailText(
    detail.ownerAxUserId,
    detail.OwnerAxUserId,
    detail.indCreatedByUserId,
    detail.INDCreatedByUserId,
    detail.createdByUserId,
    detail.CreatedByUserId,
    detail.userId,
    detail.UserId
  );
  const detailOwnerRawText = firstDetailText(detail.ownerName, detail.OwnerName, detail.ownerAlias, detail.OwnerAlias);
  const rawServerCanMutateVisit = detail.canMutateVisit ?? detail.CanMutateVisit;
  const hasServerMutationDecision = typeof rawServerCanMutateVisit === "boolean";
  const serverCanMutateVisit = rawServerCanMutateVisit === true;
  const serverMutationPermissionStatus = firstDetailText(
    detail.mutationPermissionStatus,
    detail.MutationPermissionStatus
  );
  const logPermissionTrace = (0, import_react5.useCallback)(
    (eventName, data = {}) => {
      postModulePermissionTrace(eventName, {
        recId: activityRecId,
        ownerAxUserId: detailOwnerAxUserId,
        viewerAxUserId: axUserId,
        companyId,
        permissionsRevision,
        serverCanMutateVisit: hasServerMutationDecision ? serverCanMutateVisit : null,
        serverMutationPermissionStatus,
        appCode: APP_CODE,
        moduleCode: MODULE_CODE,
        ...data
      });
    },
    [
      activityRecId,
      axUserId,
      companyId,
      detailOwnerAxUserId,
      hasServerMutationDecision,
      permissionsRevision,
      serverCanMutateVisit,
      serverMutationPermissionStatus
    ]
  );
  const { visibleUserByOwnerAxUserId, visibleUsersReady } = useModuleDataVisibility({
    enabled: canViewHistory || canEditHistory || canDeleteHistory,
    companyId,
    axUserId,
    permissionsRevision,
    appCode: APP_CODE,
    moduleCode: MODULE_CODE,
    allowCachedUsers: false,
    preloadedUsers: typeof window !== "undefined" ? window.__IND_VISIBLE_VISIT_USERS__ : void 0,
    onForbidden: showPermissionModal,
    onDebug: logPermissionTrace
  });
  const textEditorBaseId = activityRecId ? `Visita.${activityRecId}` : "Visita";
  const fieldIdComentarios = `${textEditorBaseId}.Comentarios`;
  const fieldIdAntecedentes = `${textEditorBaseId}.Antecedentes`;
  const fieldIdConclusiones = `${textEditorBaseId}.Conclusiones`;
  const normalizeDateToInput = (0, import_react5.useCallback)((value) => {
    if (!value) return "";
    const raw = String(value).trim();
    if (!raw) return "";
    if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;
    if (/^\d{2}[./-]\d{2}[./-]\d{4}$/.test(raw)) {
      const parts = raw.split(/[./-]/).map((p) => parseInt(p, 10));
      if (parts.length === 3 && !Number.isNaN(parts[0]) && !Number.isNaN(parts[1]) && !Number.isNaN(parts[2])) {
        const [d, m, y] = parts;
        const mm = String(m).padStart(2, "0");
        const dd = String(d).padStart(2, "0");
        return `${y}-${mm}-${dd}`;
      }
    }
    const dt = new Date(raw);
    if (!Number.isNaN(dt.getTime())) {
      const yyyy = dt.getFullYear();
      const mm = String(dt.getMonth() + 1).padStart(2, "0");
      const dd = String(dt.getDate()).padStart(2, "0");
      return `${yyyy}-${mm}-${dd}`;
    }
    return "";
  }, []);
  const matchOptionValue = (0, import_react5.useCallback)((options, raw) => {
    if (raw == null) return "";
    const rawStr = String(raw).trim();
    if (!rawStr) return "";
    const normalizeText = (s) => String(s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
    const rawNorm = normalizeText(rawStr);
    const altNorm = rawNorm.endsWith("o") ? `${rawNorm.slice(0, -1)}a` : rawNorm;
    const match = (options || []).find((o) => {
      const val = String(o?.value ?? o?.Value ?? "").trim();
      const text = String(o?.text ?? o?.Text ?? "").trim();
      const textNorm = normalizeText(text);
      return val === rawStr || val === rawNorm || textNorm === rawNorm || textNorm === altNorm;
    });
    return match ? String(match.value ?? match.Value ?? rawStr) : rawStr;
  }, []);
  const initialTransDate = normalizeDateToInput(String(detail.transDate ?? detail.TransDate ?? ""));
  const defaultVisitType = String(visitTypes[0]?.value ?? visitTypes[0]?.Value ?? "");
  const rawInitialVisitType = String(
    detail.tipoVisita ?? detail.TipoVisita ?? detail.visitType ?? detail.VisitType ?? ""
  );
  const initialVisitType = matchOptionValue(visitTypes, rawInitialVisitType) || defaultVisitType;
  const rawInitialContactMethod = String(
    detail.contactMethod ?? detail.ContactMethod ?? ""
  );
  const initialContactMethod = matchOptionValue(contactMethods, rawInitialContactMethod);
  const rawInitialAsistente = String(
    detail.asistenteTipo ?? detail.AsistenteTipo ?? (asistenteTipos[0]?.value ?? asistenteTipos[0]?.Value ?? "")
  );
  const initialAsistente = matchOptionValue(asistenteTipos, rawInitialAsistente) || rawInitialAsistente;
  const [transDate, setTransDate] = (0, import_react5.useState)(initialTransDate);
  const [visitType, setVisitType] = (0, import_react5.useState)(initialVisitType);
  const [contactMethod, setContactMethod] = (0, import_react5.useState)(initialContactMethod);
  const [asistenteTipo, setAsistenteTipo] = (0, import_react5.useState)(initialAsistente);
  const [description, setDescription] = (0, import_react5.useState)(String(detail.description ?? detail.Description ?? ""));
  const [comentarios, setComentarios] = (0, import_react5.useState)(String(detail.comentarios ?? detail.Comentarios ?? ""));
  const [antecedentes, setAntecedentes] = (0, import_react5.useState)(String(detail.antecedentes ?? detail.Antecedentes ?? ""));
  const [conclusiones, setConclusiones] = (0, import_react5.useState)(String(detail.conclusiones ?? detail.Conclusiones ?? ""));
  const [status, setStatus] = (0, import_react5.useState)("");
  const [busy, setBusy] = (0, import_react5.useState)(false);
  const [isEditing, setIsEditing] = (0, import_react5.useState)(false);
  const [isHydrating, setIsHydrating] = (0, import_react5.useState)(false);
  const [modalError, setModalError] = (0, import_react5.useState)("");
  const readOnlySurfaceRef = (0, import_react5.useRef)(null);
  const editSnapshotRef = (0, import_react5.useRef)(null);
  const permissionTraceRef = (0, import_react5.useRef)("");
  const recId = activityRecId;
  const accountNum = String(detail.accountNum ?? detail.AccountNum ?? "");
  const actividadId = String(detail.actividadId ?? detail.ActividadId ?? "");
  const mutationAccess = (0, import_react5.useMemo)(() => {
    return resolveModuleOwnerMutationAccess({
      usersByOwnerAxUserId: visibleUserByOwnerAxUserId,
      ownerAxUserId: detailOwnerAxUserId,
      viewerAxUserId: axUserId,
      visibleUsersReady
    });
  }, [axUserId, detailOwnerAxUserId, visibleUserByOwnerAxUserId, visibleUsersReady]);
  const visibleOwner = mutationAccess.owner;
  const detailOwnerText = visibleOwner ? formatModuleVisibleUserLabel(visibleOwner) : detailOwnerRawText || detailOwnerAxUserId;
  const showOwnerField = mutationAccess.ready && !!visibleOwner && !mutationAccess.isCurrentOwner;
  const ownerCanMutate = mutationAccess.canMutate && hasServerMutationDecision && serverCanMutateVisit;
  const canEditVisit = canEditHistory && ownerCanMutate;
  const canDeleteVisit = canDeleteHistory && ownerCanMutate;
  const isVisitEditable = isEditing && canEditVisit;
  const logBlockedPermission = (0, import_react5.useCallback)(
    (operation) => {
      logPermissionTrace("visitDetail:permission-blocked", {
        operation,
        reason: mutationAccess.reason,
        permissionsReady: mutationAccess.ready,
        isCurrentOwner: mutationAccess.isCurrentOwner,
        ownerCanMutate,
        clientCanMutate: mutationAccess.canMutate,
        hasServerMutationDecision,
        serverCanMutateVisit: hasServerMutationDecision ? serverCanMutateVisit : null,
        serverMutationPermissionStatus,
        canEditModule: canEditHistory,
        canDeleteModule: canDeleteHistory,
        canEditVisit,
        canDeleteVisit,
        visibleOwnerFound: !!visibleOwner,
        visibleOwnerPolicy: visibleOwner?.mutationPolicy || "",
        visibleOwnerPolicyInt: visibleOwner?.mutationPolicyInt ?? null,
        visibleOwnerPolicyLabel: visibleOwner?.mutationPolicyLabel || "",
        visibleOwnerCanMutate: visibleOwner?.canMutate ?? null
      });
    },
    [
      canDeleteHistory,
      canDeleteVisit,
      canEditHistory,
      canEditVisit,
      logPermissionTrace,
      mutationAccess.canMutate,
      mutationAccess.isCurrentOwner,
      mutationAccess.reason,
      mutationAccess.ready,
      hasServerMutationDecision,
      ownerCanMutate,
      serverCanMutateVisit,
      serverMutationPermissionStatus,
      visibleOwner
    ]
  );
  (0, import_react5.useEffect)(() => {
    const traceKey = [
      recId,
      axUserId,
      detailOwnerAxUserId,
      mutationAccess.reason,
      mutationAccess.ready ? "ready" : "pending",
      mutationAccess.canMutate ? "can" : "cannot",
      hasServerMutationDecision ? serverCanMutateVisit ? "server-can" : "server-cannot" : "server-missing",
      serverMutationPermissionStatus,
      mutationAccess.isCurrentOwner ? "own" : "foreign",
      visibleOwner?.mutationPolicy || "",
      visibleOwner?.mutationPolicyInt ?? "",
      visibleOwner?.mutationPolicyLabel || "",
      visibleOwner?.canMutate ?? "",
      canEditVisit ? "edit" : "read",
      canDeleteVisit ? "delete" : "nodelete"
    ].join("|");
    if (permissionTraceRef.current === traceKey) return;
    permissionTraceRef.current = traceKey;
    logPermissionTrace("visitDetail:mutation-decision", {
      reason: mutationAccess.reason,
      permissionsReady: mutationAccess.ready,
      isCurrentOwner: mutationAccess.isCurrentOwner,
      ownerCanMutate,
      clientCanMutate: mutationAccess.canMutate,
      hasServerMutationDecision,
      serverCanMutateVisit: hasServerMutationDecision ? serverCanMutateVisit : null,
      serverMutationPermissionStatus,
      canEditModule: canEditHistory,
      canDeleteModule: canDeleteHistory,
      canEditVisit,
      canDeleteVisit,
      visibleUsersReady,
      visibleOwnerFound: !!visibleOwner,
      visibleOwnerAxUserId: visibleOwner?.axUserId || "",
      visibleOwnerSource: visibleOwner?.source || "",
      visibleOwnerPolicy: visibleOwner?.mutationPolicy || "",
      visibleOwnerPolicyInt: visibleOwner?.mutationPolicyInt ?? null,
      visibleOwnerPolicyLabel: visibleOwner?.mutationPolicyLabel || "",
      visibleOwnerCanMutate: visibleOwner?.canMutate ?? null
    });
  }, [
    axUserId,
    canDeleteHistory,
    canDeleteVisit,
    canEditHistory,
    canEditVisit,
    detailOwnerAxUserId,
    hasServerMutationDecision,
    logPermissionTrace,
    mutationAccess.canMutate,
    mutationAccess.isCurrentOwner,
    mutationAccess.reason,
    mutationAccess.ready,
    ownerCanMutate,
    recId,
    serverCanMutateVisit,
    serverMutationPermissionStatus,
    visibleOwner,
    visibleUsersReady
  ]);
  const { editModeKeyRef, syncEditModeFlag, clearDraft, applyDraftValues } = useDetailEditSession({
    actividadId,
    recId,
    canEditHistory: canEditVisit,
    isEditing: isVisitEditable,
    setIsEditing,
    transDate,
    visitType,
    contactMethod,
    asistenteTipo,
    description,
    comentarios,
    antecedentes,
    conclusiones,
    setTransDate,
    setVisitType,
    setContactMethod,
    setAsistenteTipo,
    setDescription,
    setComentarios,
    setAntecedentes,
    setConclusiones
  });
  const hasServerDetail = hasValue(recId) && hasValue(accountNum) && hasValue(detail.transDate || detail.TransDate || "");
  const shouldHydrate = !!actividadId && !hasServerDetail;
  const openTextEditor = (0, import_react5.useCallback)(
    (fieldId, fieldLabel, fieldValue, options = {}) => {
      navigateToTextEditorField({
        fieldId,
        fieldLabel,
        fieldValue,
        readOnly: options?.readOnly === true,
        allowEdit: options?.allowEdit !== false,
        editModeKey: options?.editModeKey,
        editModeReturnTtlMs: EDITOR_RETURN_FLAG_TTL_MS
      });
    },
    []
  );
  const handleComentariosTap = (0, import_react5.useCallback)((event) => {
    event.preventDefault();
    openTextEditor(fieldIdComentarios, indT("Visits_Field_Comments", "Comments"), comentarios, {
      readOnly: !isVisitEditable,
      allowEdit: canEditVisit,
      editModeKey: editModeKeyRef.current
    });
  }, [comentarios, editModeKeyRef, fieldIdComentarios, isVisitEditable, canEditVisit, openTextEditor]);
  const handleComentariosHold = (0, import_react5.useCallback)((target, clientY) => {
    if (!target || !isOverflowing(target)) return false;
    setPreviewAnchor(target);
    return showPreviewTooltip(String(comentarios || ""), clientY);
  }, [comentarios]);
  const handleAntecedentesTap = (0, import_react5.useCallback)((event) => {
    event.preventDefault();
    openTextEditor(fieldIdAntecedentes, indT("Visits_Field_Background", "Background"), antecedentes, {
      readOnly: !isVisitEditable,
      allowEdit: canEditVisit,
      editModeKey: editModeKeyRef.current
    });
  }, [antecedentes, editModeKeyRef, fieldIdAntecedentes, isVisitEditable, canEditVisit, openTextEditor]);
  const handleAntecedentesHold = (0, import_react5.useCallback)((target, clientY) => {
    if (!target || !isOverflowing(target)) return false;
    setPreviewAnchor(target);
    return showPreviewTooltip(String(antecedentes || ""), clientY);
  }, [antecedentes]);
  const handleConclusionesTap = (0, import_react5.useCallback)((event) => {
    event.preventDefault();
    openTextEditor(fieldIdConclusiones, indT("Visits_Field_Conclusions", "Conclusions"), conclusiones, {
      readOnly: !isVisitEditable,
      allowEdit: canEditVisit,
      editModeKey: editModeKeyRef.current
    });
  }, [conclusiones, editModeKeyRef, fieldIdConclusiones, isVisitEditable, canEditVisit, openTextEditor]);
  const handleConclusionesHold = (0, import_react5.useCallback)((target, clientY) => {
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
  const { applyValues: applyTextEditorValues } = useTextEditorFields(textEditorBindings, {
    applyOnMount: !actividadId,
    listenPageShow: true,
    enabled: canEditVisit
  });
  (0, import_react5.useEffect)(() => {
    if (!mutationAccess.ready || canEditVisit) return;
    clearTextEditorValue(fieldIdComentarios);
    clearTextEditorValue(fieldIdAntecedentes);
    clearTextEditorValue(fieldIdConclusiones);
  }, [canEditVisit, fieldIdAntecedentes, fieldIdComentarios, fieldIdConclusiones, mutationAccess.ready]);
  const { modal, openConfirm, closeConfirm, handleConfirm } = useConfirmDialog({
    defaultConfirmText: indT("Confirm_Yes", "Confirm_Yes"),
    defaultCancelText: indT("Confirm_No", "Confirm_No")
  });
  const handleModalConfirm = (0, import_react5.useCallback)(async () => {
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
  const handleModalButtonConfirm = (0, import_react5.useCallback)(() => {
    if (!busy && modalError) {
      closeConfirm();
      return;
    }
    handleModalConfirm();
  }, [busy, modalError, closeConfirm, handleModalConfirm]);
  const hasActiveProcess = (0, import_react5.useMemo)(() => busy || isVisitEditable, [busy, isVisitEditable]);
  (0, import_react5.useEffect)(() => {
    window.__indSetNavigationGuard?.(hasActiveProcess);
    return () => {
      window.__indClearNavigationGuard?.();
    };
  }, [hasActiveProcess]);
  useDetailHydration({
    actividadId,
    shouldHydrate,
    visitTypes,
    contactMethods,
    asistenteTipos,
    defaultVisitType,
    initialAsistente,
    normalizeDateToInput,
    matchOptionValue,
    applyDraftValues,
    applyTextEditorValues,
    setStatus,
    setIsHydrating,
    setTransDate,
    setVisitType,
    setContactMethod,
    setAsistenteTipo,
    setDescription,
    setComentarios,
    setAntecedentes,
    setConclusiones
  });
  (0, import_react5.useEffect)(() => {
    const el = readOnlySurfaceRef.current;
    if (!el) return;
    if (!isVisitEditable) {
      el.classList.add("ind-readonly-surface");
    } else {
      el.classList.remove("ind-readonly-surface");
    }
  }, [isVisitEditable]);
  (0, import_react5.useEffect)(() => {
    if (isVisitEditable) {
      if (!editSnapshotRef.current) {
        editSnapshotRef.current = {
          transDate,
          visitType,
          contactMethod,
          asistenteTipo,
          description,
          comentarios,
          antecedentes,
          conclusiones
        };
      }
      return;
    }
    editSnapshotRef.current = null;
  }, [isVisitEditable, transDate, visitType, contactMethod, asistenteTipo, description, comentarios, antecedentes, conclusiones]);
  (0, import_react5.useEffect)(() => {
    if (isVisitEditable) return void 0;
    return bindReadOnlyGuard(readOnlySurfaceRef.current);
  }, [isVisitEditable]);
  const handleEnableEdit = (0, import_react5.useCallback)(() => {
    if (!canEditVisit) {
      logBlockedPermission("edit");
      return;
    }
    setIsEditing(true);
    syncEditModeFlag(true);
    setStatus(indT("Visits_Detail_EditingEnabled", "Editing enabled"));
  }, [canEditVisit, logBlockedPermission, syncEditModeFlag]);
  const handleCancelEdit = (0, import_react5.useCallback)(() => {
    if (!isEditing) return;
    setIsEditing(false);
    syncEditModeFlag(false);
    clearDraft();
    setStatus(indT("Common_Cancel", "Cancel"));
    window.__indBypassNavigationGuardOnce?.();
    window.location.reload();
  }, [isEditing, syncEditModeFlag, clearDraft]);
  const { handleUpdate, handleDelete } = useDetailMutations({
    busy,
    isEditing: isVisitEditable,
    canEditHistory: canEditVisit,
    canDeleteHistory: canDeleteVisit,
    recId,
    accountNum,
    transDate,
    visitType,
    contactMethod,
    asistenteTipo,
    description,
    comentarios,
    antecedentes,
    conclusiones,
    visitTypes,
    contactMethods,
    asistenteTipos,
    defaultVisitType,
    rawInitialVisitType,
    rawInitialContactMethod,
    rawInitialAsistente,
    matchOptionValue,
    clearDraft,
    syncEditModeFlag,
    onPermissionBlocked: logBlockedPermission,
    setModalError,
    setBusy,
    setStatus,
    setIsEditing
  });
  useDetailTopbarActions({
    busy,
    modalOpen: modal.open,
    isEditing: isVisitEditable,
    canEditHistory: canEditVisit,
    canDeleteHistory: canDeleteVisit,
    transDate,
    setModalError,
    handleEnableEdit,
    handleCancelEdit,
    handleUpdate,
    handleDelete,
    onPermissionBlocked: logBlockedPermission,
    openConfirm,
    closeConfirm,
    permissionsReady: mutationAccess.ready
  });
  const descriptionLabel = indT("Visits_Field_Description", "Description");
  const commentsLabel = indT("Visits_Field_Comments", "Comments");
  const backgroundLabel = indT("Visits_Field_Background", "Background");
  const conclusionsLabel = indT("Visits_Field_Conclusions", "Conclusions");
  const detailDescriptionClassName = classNames(
    "form-control",
    isVisitEditable ? "border-neutral-200 text-neutral-900" : "border-neutral-200 ind-readonly-field"
  );
  const detailReadOnlyClassName = classNames("form-control cursor-pointer", !isVisitEditable ? "ind-readonly-field" : "");
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
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
      "div",
      {
        ref: readOnlySurfaceRef,
        className: "relative shadow-xs glass-panel p-4 space-y-4 border border-neutral-200 rounded-[var(--radius-xl)]",
        children: [
          isHydrating && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "absolute inset-0 z-10 flex items-center justify-center bg-white/70 rounded-[var(--radius-xl)]", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "flex items-center gap-2 text-sm text-neutral-600", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Spinner_default, { size: "size-5" }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: indT("Common_Loading", "Loading") })
          ] }) }),
          showOwnerField && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(DetailOwnerField_default, { label: indT("Visits_Detail_Owner_Label", "Owner"), value: detailOwnerText }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 pt-1", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "visita-field-text", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
              SingleDatePicker,
              {
                label: indT("Visits_Detail_Date_Label", "Date"),
                value: transDate,
                onChange: setTransDate,
                disabled: !isVisitEditable,
                readOnly: !isVisitEditable
              }
            ) }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
              SelectCombobox_default,
              {
                label: indT("Visits_Detail_VisitType_Label", "Visit type"),
                options: visitTypes,
                value: visitType,
                onChange: setVisitType,
                placeholder: indT("Visits_Detail_VisitType_Placeholder", "Select type"),
                disabled: !isVisitEditable,
                readOnly: !isVisitEditable
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
              SelectCombobox_default,
              {
                label: indT("Visits_Detail_ContactMethod_Label", "Contact channel"),
                options: contactMethods,
                value: contactMethod,
                onChange: setContactMethod,
                placeholder: indT("Visits_Detail_ContactMethod_Placeholder", "Select method"),
                disabled: !isVisitEditable,
                readOnly: !isVisitEditable
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            VisitNarrativeFields_default,
            {
              descriptionLabel,
              descriptionValue: description,
              descriptionClassName: detailDescriptionClassName,
              descriptionDisabled: !isVisitEditable,
              onDescriptionChange: setDescription,
              tapFields: [
                {
                  id: "comentarios",
                  label: commentsLabel,
                  value: comentarios,
                  className: detailReadOnlyClassName,
                  pointerBindings: comentariosTap
                },
                {
                  id: "antecedentes",
                  label: backgroundLabel,
                  value: antecedentes,
                  className: detailReadOnlyClassName,
                  pointerBindings: antecedentesTap
                },
                {
                  id: "conclusiones",
                  label: conclusionsLabel,
                  value: conclusiones,
                  className: detailReadOnlyClassName,
                  pointerBindings: conclusionesTap
                }
              ]
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "flex items-center gap-3 text-sm text-neutral-600", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: status }) })
        ]
      }
    )
  ] });
};
function DetailForm(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(AppErrorBoundary_default, { fallbackMessage: indT("Visits_Detail_ErrorBoundary", "An error occurred while rendering the detail page. Reload and try again."), children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(DetailApp, { ...props }) });
}

// Web/wwwroot/react/src/pages/visitas/detail/DetailPage.tsx
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
var DetailPage = ({ companyId = "", axUserId = "", permissionsRevision = "" }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(VisitasPageProviders_default, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(DetailForm, { companyId, axUserId, permissionsRevision }) });
};
var mount = () => {
  const rootEl = document.getElementById("visita-detail-root");
  if (!rootEl) return;
  const companyId = rootEl.getAttribute("data-company-id") || "";
  const axUserId = rootEl.getAttribute("data-ax-user-id") || "";
  const permissionsRevision = rootEl.getAttribute("data-permissions-revision") || "";
  mountReactIsland(
    rootEl,
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(DetailPage, { companyId, axUserId, permissionsRevision })
  );
};
mountWhenDocumentReady(mount);
var DetailPage_default = DetailPage;
export {
  DetailPage_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvZGV0YWlsL0RldGFpbEZvcm0udHN4IiwgIi4uL3JlYWN0L3NyYy91dGlscy9kb21HdWFyZHMudHMiLCAiLi4vcmVhY3Qvc3JjL3V0aWxzL3N0cmluZ3MudHMiLCAiLi4vcmVhY3Qvc3JjL2hvb2tzL3VzZURldGFpbEh5ZHJhdGlvbi50cyIsICIuLi9yZWFjdC9zcmMvaG9va3MvdXNlRGV0YWlsVG9wYmFyQWN0aW9ucy50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9kZXRhaWwvdXNlRGV0YWlsRWRpdFNlc3Npb24udHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvZGV0YWlsL3VzZURldGFpbE11dGF0aW9ucy50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9kZXRhaWwvRGV0YWlsT3duZXJGaWVsZC50c3giLCAiLi4vcmVhY3Qvc3JjL3NlcnZpY2VzL21vZHVsZVBlcm1pc3Npb25UcmFjZVNlcnZpY2UudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvZGV0YWlsL0RldGFpbFBhZ2UudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCwgdXNlUmVmLCB1c2VDYWxsYmFjaywgdXNlTWVtbyB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgU2luZ2xlRGF0ZVBpY2tlciBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NpbmdsZURhdGVQaWNrZXIudHN4XCI7XHJcbmltcG9ydCBDb25maXJtTW9kYWwgZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9Db25maXJtTW9kYWwudHN4XCI7XHJcbmltcG9ydCBTZWxlY3RDb21ib2JveCBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NlbGVjdENvbWJvYm94LnRzeFwiO1xyXG5pbXBvcnQgQXBwRXJyb3JCb3VuZGFyeSBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0FwcEVycm9yQm91bmRhcnkudHN4XCI7XHJcbmltcG9ydCB7IHVzZVZpc2l0YXMgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlVmlzaXRhcy50c1wiO1xyXG5pbXBvcnQgU3Bpbm5lciBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NwaW5uZXIudHN4XCI7XHJcbmltcG9ydCBWaXNpdE5hcnJhdGl2ZUZpZWxkcyBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy92aXNpdGFzL1Zpc2l0TmFycmF0aXZlRmllbGRzLnRzeFwiO1xyXG5pbXBvcnQgeyBjbGFzc05hbWVzIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2NsYXNzTmFtZXMudHNcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB7IGNhbkFjY2Vzcywgc2hvd1Blcm1pc3Npb25Nb2RhbCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9wZXJtaXNzaW9ucy50c1wiO1xyXG5pbXBvcnQgeyBiaW5kUmVhZE9ubHlHdWFyZCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9kb21HdWFyZHMudHNcIjtcclxuaW1wb3J0IHsgaGFzVmFsdWUgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvc3RyaW5ncy50c1wiO1xyXG5pbXBvcnQgeyBuYXZpZ2F0ZVRvVGV4dEVkaXRvckZpZWxkIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3RleHRFZGl0b3JOYXZpZ2F0aW9uLnRzXCI7XHJcbmltcG9ydCB7IGNsZWFyVGV4dEVkaXRvclZhbHVlIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3RleHRFZGl0b3IudHNcIjtcclxuaW1wb3J0IHsgZmxhc2hBY3Rpb25NYXJrIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3Zpc2l0YXNIaXN0b3J5LnRzXCI7XHJcbmltcG9ydCB7IHNldFByZXZpZXdBbmNob3IsIHNob3dQcmV2aWV3VG9vbHRpcCwgaXNPdmVyZmxvd2luZyB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9wcmV2aWV3VG9vbHRpcC50c1wiO1xyXG5pbXBvcnQgeyB1c2VUYXBHdWFyZCB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VUYXBHdWFyZC50c1wiO1xyXG5pbXBvcnQgeyB1c2VDb25maXJtRGlhbG9nIH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZUNvbmZpcm1EaWFsb2cudHNcIjtcclxuaW1wb3J0IHsgdXNlRGV0YWlsSHlkcmF0aW9uIH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZURldGFpbEh5ZHJhdGlvbi50c1wiO1xyXG5pbXBvcnQgeyB1c2VEZXRhaWxUb3BiYXJBY3Rpb25zIH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZURldGFpbFRvcGJhckFjdGlvbnMudHNcIjtcclxuaW1wb3J0IHsgdXNlVGV4dEVkaXRvckZpZWxkcyB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VUZXh0RWRpdG9yRmllbGRzLnRzXCI7XHJcbmltcG9ydCB7IHVzZU1vZHVsZURhdGFWaXNpYmlsaXR5IH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZU1vZHVsZURhdGFWaXNpYmlsaXR5LnRzXCI7XHJcbmltcG9ydCB7IHVzZURldGFpbEVkaXRTZXNzaW9uIH0gZnJvbSBcIi4vdXNlRGV0YWlsRWRpdFNlc3Npb24udHNcIjtcclxuaW1wb3J0IHsgdXNlRGV0YWlsTXV0YXRpb25zIH0gZnJvbSBcIi4vdXNlRGV0YWlsTXV0YXRpb25zLnRzXCI7XHJcbmltcG9ydCB7XHJcbiAgZm9ybWF0TW9kdWxlVmlzaWJsZVVzZXJMYWJlbCxcclxuICByZXNvbHZlTW9kdWxlT3duZXJNdXRhdGlvbkFjY2VzcyxcclxufSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvbW9kdWxlRGF0YVZpc2liaWxpdHkudHNcIjtcclxuaW1wb3J0IERldGFpbE93bmVyRmllbGQgZnJvbSBcIi4vRGV0YWlsT3duZXJGaWVsZC50c3hcIjtcclxuaW1wb3J0IHtcclxuICBwb3N0TW9kdWxlUGVybWlzc2lvblRyYWNlLFxyXG4gIHR5cGUgTW9kdWxlUGVybWlzc2lvblRyYWNlUGF5bG9hZCxcclxufSBmcm9tIFwiLi4vLi4vLi4vc2VydmljZXMvbW9kdWxlUGVybWlzc2lvblRyYWNlU2VydmljZS50c1wiO1xyXG5cclxuY29uc3QgRURJVE9SX1JFVFVSTl9GTEFHX1RUTF9NUyA9IDIgKiA2MCAqIDYwICogMTAwMDtcclxuY29uc3QgQVBQX0NPREUgPSBcIkNSTVwiO1xyXG5jb25zdCBNT0RVTEVfQ09ERSA9IFwiVklTSVRBU19HRVNUSU9OXCI7XHJcblxyXG50eXBlIERldGFpbEZvcm1Qcm9wcyA9IHtcclxuICBjb21wYW55SWQ/OiBzdHJpbmc7XHJcbiAgYXhVc2VySWQ/OiBzdHJpbmc7XHJcbiAgcGVybWlzc2lvbnNSZXZpc2lvbj86IHN0cmluZztcclxufTtcclxuXHJcbmNvbnN0IHNhZmVEZXRhaWxUZXh0ID0gKHZhbHVlOiB1bmtub3duKTogc3RyaW5nID0+IFN0cmluZyh2YWx1ZSA/PyBcIlwiKS50cmltKCk7XHJcblxyXG5jb25zdCBmaXJzdERldGFpbFRleHQgPSAoLi4udmFsdWVzOiB1bmtub3duW10pOiBzdHJpbmcgPT4ge1xyXG4gIGZvciAoY29uc3QgdmFsdWUgb2YgdmFsdWVzKSB7XHJcbiAgICBjb25zdCB0ZXh0ID0gc2FmZURldGFpbFRleHQodmFsdWUpO1xyXG4gICAgaWYgKHRleHQpIHJldHVybiB0ZXh0O1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIFwiXCI7XHJcbn07XHJcblxyXG5jb25zdCBEZXRhaWxBcHAgPSAoeyBjb21wYW55SWQgPSBcIlwiLCBheFVzZXJJZCA9IFwiXCIsIHBlcm1pc3Npb25zUmV2aXNpb24gPSBcIlwiIH06IERldGFpbEZvcm1Qcm9wcykgPT4ge1xyXG4gIGNvbnN0IHsgdmlzaXRUeXBlcywgY29udGFjdE1ldGhvZHMsIGFzaXN0ZW50ZVRpcG9zIH0gPSB1c2VWaXNpdGFzKCk7XHJcbiAgY29uc3QgY2FuVmlld0hpc3RvcnkgPSBjYW5BY2Nlc3MoXCJWSVNJVEFTX0dFU1RJT05cIiwgXCJWaWV3XCIpO1xyXG4gIGNvbnN0IGNhbkVkaXRIaXN0b3J5ID0gY2FuQWNjZXNzKFwiVklTSVRBU19HRVNUSU9OXCIsIFwiRWRpdFwiKTtcclxuICBjb25zdCBjYW5EZWxldGVIaXN0b3J5ID0gY2FuQWNjZXNzKFwiVklTSVRBU19HRVNUSU9OXCIsIFwiRnVsbEFjY2Vzc1wiKTtcclxuICB0eXBlIEFjdGl2aXR5RGV0YWlsUGF5bG9hZCA9IHtcclxuICAgIHJlY0lkPzogc3RyaW5nIHwgbnVtYmVyO1xyXG4gICAgUmVjSWQ/OiBzdHJpbmcgfCBudW1iZXI7XHJcbiAgICByZWZSZWNJZEFjdGl2aWRhZD86IHN0cmluZyB8IG51bWJlcjtcclxuICAgIFJlZlJlY0lkQWN0aXZpZGFkPzogc3RyaW5nIHwgbnVtYmVyO1xyXG4gICAgYWN0aXZpZGFkUmVjSWQ/OiBzdHJpbmcgfCBudW1iZXI7XHJcbiAgICBBY3RpdmlkYWRSZWNJZD86IHN0cmluZyB8IG51bWJlcjtcclxuICAgIHJlYWRPbmx5PzogYm9vbGVhbjtcclxuICAgIGFsbG93RWRpdD86IGJvb2xlYW47XHJcbiAgICBlZGl0TW9kZUtleT86IHN0cmluZztcclxuICAgIG93bmVyQXhVc2VySWQ/OiBzdHJpbmc7XHJcbiAgICBPd25lckF4VXNlcklkPzogc3RyaW5nO1xyXG4gICAgb3duZXJOYW1lPzogc3RyaW5nO1xyXG4gICAgT3duZXJOYW1lPzogc3RyaW5nO1xyXG4gICAgb3duZXJBbGlhcz86IHN0cmluZztcclxuICAgIE93bmVyQWxpYXM/OiBzdHJpbmc7XHJcbiAgICBjcmVhdGVkQnlVc2VySWQ/OiBzdHJpbmc7XHJcbiAgICBDcmVhdGVkQnlVc2VySWQ/OiBzdHJpbmc7XHJcbiAgICB1c2VySWQ/OiBzdHJpbmc7XHJcbiAgICBVc2VySWQ/OiBzdHJpbmc7XHJcbiAgICBpbmRDcmVhdGVkQnlVc2VySWQ/OiBzdHJpbmc7XHJcbiAgICBJTkRDcmVhdGVkQnlVc2VySWQ/OiBzdHJpbmc7XHJcbiAgICBjYW5NdXRhdGVWaXNpdD86IGJvb2xlYW4gfCBudWxsO1xyXG4gICAgQ2FuTXV0YXRlVmlzaXQ/OiBib29sZWFuIHwgbnVsbDtcclxuICAgIG11dGF0aW9uUGVybWlzc2lvblN0YXR1cz86IHN0cmluZztcclxuICAgIE11dGF0aW9uUGVybWlzc2lvblN0YXR1cz86IHN0cmluZztcclxuICAgIFtrZXk6IHN0cmluZ106IHVua25vd247XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgZGV0YWlsID0gKHdpbmRvdy5fX0FDVElWSVRZX0RFVEFJTF9fIGFzIEFjdGl2aXR5RGV0YWlsUGF5bG9hZCkgfHwge307XHJcbiAgY29uc3QgcmVzb2x2ZUFjdGl2aXR5UmVjSWQgPSAocGF5bG9hZDogQWN0aXZpdHlEZXRhaWxQYXlsb2FkKTogc3RyaW5nID0+IHtcclxuICAgIGNvbnN0IGNhbmRpZGF0ZXMgPSBbXHJcbiAgICAgIHBheWxvYWQucmVjSWQsXHJcbiAgICAgIHBheWxvYWQuUmVjSWQsXHJcbiAgICAgIHBheWxvYWQucmVmUmVjSWRBY3RpdmlkYWQsXHJcbiAgICAgIHBheWxvYWQuUmVmUmVjSWRBY3RpdmlkYWQsXHJcbiAgICAgIHBheWxvYWQuYWN0aXZpZGFkUmVjSWQsXHJcbiAgICAgIHBheWxvYWQuQWN0aXZpZGFkUmVjSWQsXHJcbiAgICBdO1xyXG5cclxuICAgIGZvciAoY29uc3QgY2FuZGlkYXRlIG9mIGNhbmRpZGF0ZXMpIHtcclxuICAgICAgY29uc3Qgbm9ybWFsaXplZCA9IFN0cmluZyhjYW5kaWRhdGUgPz8gXCJcIikudHJpbSgpO1xyXG4gICAgICBpZiAobm9ybWFsaXplZCkge1xyXG4gICAgICAgIHJldHVybiBub3JtYWxpemVkO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIFwiXCI7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgYWN0aXZpdHlSZWNJZCA9IHJlc29sdmVBY3Rpdml0eVJlY0lkKGRldGFpbCk7XHJcbiAgLy8gU3RyaWN0IHJlY29yZC1sZXZlbCBVSSBnYXRpbmcgbmVlZHMgdGhlIGRldGFpbCBBUEkgdG8gcmV0dXJuIE93bmVyQXhVc2VySWQuXHJcbiAgLy8gTGVnYWN5IGZhbGxiYWNrcyBrZWVwIGV4aXN0aW5nIHJlY29yZHMgdXNhYmxlIHdoaWxlIEFYL0FQSSByZW1haW5zIHRoZSBmaW5hbCBlbmZvcmNlbWVudCBwb2ludC5cclxuICBjb25zdCBkZXRhaWxPd25lckF4VXNlcklkID0gZmlyc3REZXRhaWxUZXh0KFxyXG4gICAgZGV0YWlsLm93bmVyQXhVc2VySWQsXHJcbiAgICBkZXRhaWwuT3duZXJBeFVzZXJJZCxcclxuICAgIGRldGFpbC5pbmRDcmVhdGVkQnlVc2VySWQsXHJcbiAgICBkZXRhaWwuSU5EQ3JlYXRlZEJ5VXNlcklkLFxyXG4gICAgZGV0YWlsLmNyZWF0ZWRCeVVzZXJJZCxcclxuICAgIGRldGFpbC5DcmVhdGVkQnlVc2VySWQsXHJcbiAgICBkZXRhaWwudXNlcklkLFxyXG4gICAgZGV0YWlsLlVzZXJJZFxyXG4gICk7XHJcbiAgY29uc3QgZGV0YWlsT3duZXJSYXdUZXh0ID0gZmlyc3REZXRhaWxUZXh0KGRldGFpbC5vd25lck5hbWUsIGRldGFpbC5Pd25lck5hbWUsIGRldGFpbC5vd25lckFsaWFzLCBkZXRhaWwuT3duZXJBbGlhcyk7XHJcbiAgY29uc3QgcmF3U2VydmVyQ2FuTXV0YXRlVmlzaXQgPSBkZXRhaWwuY2FuTXV0YXRlVmlzaXQgPz8gZGV0YWlsLkNhbk11dGF0ZVZpc2l0O1xyXG4gIGNvbnN0IGhhc1NlcnZlck11dGF0aW9uRGVjaXNpb24gPSB0eXBlb2YgcmF3U2VydmVyQ2FuTXV0YXRlVmlzaXQgPT09IFwiYm9vbGVhblwiO1xyXG4gIGNvbnN0IHNlcnZlckNhbk11dGF0ZVZpc2l0ID0gcmF3U2VydmVyQ2FuTXV0YXRlVmlzaXQgPT09IHRydWU7XHJcbiAgY29uc3Qgc2VydmVyTXV0YXRpb25QZXJtaXNzaW9uU3RhdHVzID0gZmlyc3REZXRhaWxUZXh0KFxyXG4gICAgZGV0YWlsLm11dGF0aW9uUGVybWlzc2lvblN0YXR1cyxcclxuICAgIGRldGFpbC5NdXRhdGlvblBlcm1pc3Npb25TdGF0dXNcclxuICApO1xyXG4gIGNvbnN0IGxvZ1Blcm1pc3Npb25UcmFjZSA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKGV2ZW50TmFtZTogc3RyaW5nLCBkYXRhOiBNb2R1bGVQZXJtaXNzaW9uVHJhY2VQYXlsb2FkID0ge30pID0+IHtcclxuICAgICAgcG9zdE1vZHVsZVBlcm1pc3Npb25UcmFjZShldmVudE5hbWUsIHtcclxuICAgICAgICByZWNJZDogYWN0aXZpdHlSZWNJZCxcclxuICAgICAgICBvd25lckF4VXNlcklkOiBkZXRhaWxPd25lckF4VXNlcklkLFxyXG4gICAgICAgIHZpZXdlckF4VXNlcklkOiBheFVzZXJJZCxcclxuICAgICAgICBjb21wYW55SWQsXHJcbiAgICAgICAgcGVybWlzc2lvbnNSZXZpc2lvbixcclxuICAgICAgICBzZXJ2ZXJDYW5NdXRhdGVWaXNpdDogaGFzU2VydmVyTXV0YXRpb25EZWNpc2lvbiA/IHNlcnZlckNhbk11dGF0ZVZpc2l0IDogbnVsbCxcclxuICAgICAgICBzZXJ2ZXJNdXRhdGlvblBlcm1pc3Npb25TdGF0dXMsXHJcbiAgICAgICAgYXBwQ29kZTogQVBQX0NPREUsXHJcbiAgICAgICAgbW9kdWxlQ29kZTogTU9EVUxFX0NPREUsXHJcbiAgICAgICAgLi4uZGF0YSxcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgW1xyXG4gICAgICBhY3Rpdml0eVJlY0lkLFxyXG4gICAgICBheFVzZXJJZCxcclxuICAgICAgY29tcGFueUlkLFxyXG4gICAgICBkZXRhaWxPd25lckF4VXNlcklkLFxyXG4gICAgICBoYXNTZXJ2ZXJNdXRhdGlvbkRlY2lzaW9uLFxyXG4gICAgICBwZXJtaXNzaW9uc1JldmlzaW9uLFxyXG4gICAgICBzZXJ2ZXJDYW5NdXRhdGVWaXNpdCxcclxuICAgICAgc2VydmVyTXV0YXRpb25QZXJtaXNzaW9uU3RhdHVzLFxyXG4gICAgXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IHsgdmlzaWJsZVVzZXJCeU93bmVyQXhVc2VySWQsIHZpc2libGVVc2Vyc1JlYWR5IH0gPSB1c2VNb2R1bGVEYXRhVmlzaWJpbGl0eSh7XHJcbiAgICBlbmFibGVkOiBjYW5WaWV3SGlzdG9yeSB8fCBjYW5FZGl0SGlzdG9yeSB8fCBjYW5EZWxldGVIaXN0b3J5LFxyXG4gICAgY29tcGFueUlkLFxyXG4gICAgYXhVc2VySWQsXHJcbiAgICBwZXJtaXNzaW9uc1JldmlzaW9uLFxyXG4gICAgYXBwQ29kZTogQVBQX0NPREUsXHJcbiAgICBtb2R1bGVDb2RlOiBNT0RVTEVfQ09ERSxcclxuICAgIGFsbG93Q2FjaGVkVXNlcnM6IGZhbHNlLFxyXG4gICAgcHJlbG9hZGVkVXNlcnM6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cuX19JTkRfVklTSUJMRV9WSVNJVF9VU0VSU19fIDogdW5kZWZpbmVkLFxyXG4gICAgb25Gb3JiaWRkZW46IHNob3dQZXJtaXNzaW9uTW9kYWwsXHJcbiAgICBvbkRlYnVnOiBsb2dQZXJtaXNzaW9uVHJhY2UsXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IHRleHRFZGl0b3JCYXNlSWQgPSBhY3Rpdml0eVJlY0lkID8gYFZpc2l0YS4ke2FjdGl2aXR5UmVjSWR9YCA6IFwiVmlzaXRhXCI7XHJcbiAgY29uc3QgZmllbGRJZENvbWVudGFyaW9zID0gYCR7dGV4dEVkaXRvckJhc2VJZH0uQ29tZW50YXJpb3NgO1xyXG4gIGNvbnN0IGZpZWxkSWRBbnRlY2VkZW50ZXMgPSBgJHt0ZXh0RWRpdG9yQmFzZUlkfS5BbnRlY2VkZW50ZXNgO1xyXG4gIGNvbnN0IGZpZWxkSWRDb25jbHVzaW9uZXMgPSBgJHt0ZXh0RWRpdG9yQmFzZUlkfS5Db25jbHVzaW9uZXNgO1xyXG5cclxuICBjb25zdCBub3JtYWxpemVEYXRlVG9JbnB1dCA9IHVzZUNhbGxiYWNrKCh2YWx1ZSkgPT4ge1xyXG4gICAgaWYgKCF2YWx1ZSkgcmV0dXJuIFwiXCI7XHJcbiAgICBjb25zdCByYXcgPSBTdHJpbmcodmFsdWUpLnRyaW0oKTtcclxuICAgIGlmICghcmF3KSByZXR1cm4gXCJcIjtcclxuICAgIC8vIEFscmVhZHkgeXl5eS1NTS1kZFxyXG4gICAgaWYgKC9eXFxkezR9LVxcZHsyfS1cXGR7Mn0kLy50ZXN0KHJhdykpIHJldHVybiByYXc7XHJcbiAgICAvLyBkZC5NTS55eXl5IG9yIGRkL01NL3l5eXlcclxuICAgIGlmICgvXlxcZHsyfVsuLy1dXFxkezJ9Wy4vLV1cXGR7NH0kLy50ZXN0KHJhdykpIHtcclxuICAgICAgY29uc3QgcGFydHMgPSByYXcuc3BsaXQoL1suLy1dLykubWFwKChwKSA9PiBwYXJzZUludChwLCAxMCkpO1xyXG4gICAgICBpZiAocGFydHMubGVuZ3RoID09PSAzICYmICFOdW1iZXIuaXNOYU4ocGFydHNbMF0pICYmICFOdW1iZXIuaXNOYU4ocGFydHNbMV0pICYmICFOdW1iZXIuaXNOYU4ocGFydHNbMl0pKSB7XHJcbiAgICAgICAgY29uc3QgW2QsIG0sIHldID0gcGFydHM7XHJcbiAgICAgICAgY29uc3QgbW0gPSBTdHJpbmcobSkucGFkU3RhcnQoMiwgXCIwXCIpO1xyXG4gICAgICAgIGNvbnN0IGRkID0gU3RyaW5nKGQpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcclxuICAgICAgICByZXR1cm4gYCR7eX0tJHttbX0tJHtkZH1gO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBjb25zdCBkdCA9IG5ldyBEYXRlKHJhdyk7XHJcbiAgICBpZiAoIU51bWJlci5pc05hTihkdC5nZXRUaW1lKCkpKSB7XHJcbiAgICAgIGNvbnN0IHl5eXkgPSBkdC5nZXRGdWxsWWVhcigpO1xyXG4gICAgICBjb25zdCBtbSA9IFN0cmluZyhkdC5nZXRNb250aCgpICsgMSkucGFkU3RhcnQoMiwgXCIwXCIpO1xyXG4gICAgICBjb25zdCBkZCA9IFN0cmluZyhkdC5nZXREYXRlKCkpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcclxuICAgICAgcmV0dXJuIGAke3l5eXl9LSR7bW19LSR7ZGR9YDtcclxuICAgIH1cclxuICAgIHJldHVybiBcIlwiO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgbWF0Y2hPcHRpb25WYWx1ZSA9IHVzZUNhbGxiYWNrKChvcHRpb25zLCByYXcpID0+IHtcclxuICAgIGlmIChyYXcgPT0gbnVsbCkgcmV0dXJuIFwiXCI7XHJcbiAgICBjb25zdCByYXdTdHIgPSBTdHJpbmcocmF3KS50cmltKCk7XHJcbiAgICBpZiAoIXJhd1N0cikgcmV0dXJuIFwiXCI7XHJcblxyXG4gICAgY29uc3Qgbm9ybWFsaXplVGV4dCA9IChzKSA9PlxyXG4gICAgICBTdHJpbmcocyB8fCBcIlwiKVxyXG4gICAgICAgIC50b0xvd2VyQ2FzZSgpXHJcbiAgICAgICAgLm5vcm1hbGl6ZShcIk5GRFwiKVxyXG4gICAgICAgIC5yZXBsYWNlKC9bXFx1MDMwMC1cXHUwMzZmXS9nLCBcIlwiKVxyXG4gICAgICAgIC50cmltKCk7XHJcblxyXG4gICAgY29uc3QgcmF3Tm9ybSA9IG5vcm1hbGl6ZVRleHQocmF3U3RyKTtcclxuICAgIGNvbnN0IGFsdE5vcm0gPSByYXdOb3JtLmVuZHNXaXRoKFwib1wiKSA/IGAke3Jhd05vcm0uc2xpY2UoMCwgLTEpfWFgIDogcmF3Tm9ybTtcclxuXHJcbiAgICBjb25zdCBtYXRjaCA9IChvcHRpb25zIHx8IFtdKS5maW5kKChvKSA9PiB7XHJcbiAgICAgIGNvbnN0IHZhbCA9IFN0cmluZyhvPy52YWx1ZSA/PyBvPy5WYWx1ZSA/PyBcIlwiKS50cmltKCk7XHJcbiAgICAgIGNvbnN0IHRleHQgPSBTdHJpbmcobz8udGV4dCA/PyBvPy5UZXh0ID8/IFwiXCIpLnRyaW0oKTtcclxuICAgICAgY29uc3QgdGV4dE5vcm0gPSBub3JtYWxpemVUZXh0KHRleHQpO1xyXG4gICAgICByZXR1cm4gdmFsID09PSByYXdTdHIgfHwgdmFsID09PSByYXdOb3JtIHx8IHRleHROb3JtID09PSByYXdOb3JtIHx8IHRleHROb3JtID09PSBhbHROb3JtO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gbWF0Y2ggPyBTdHJpbmcobWF0Y2gudmFsdWUgPz8gbWF0Y2guVmFsdWUgPz8gcmF3U3RyKSA6IHJhd1N0cjtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IGluaXRpYWxUcmFuc0RhdGUgPSBub3JtYWxpemVEYXRlVG9JbnB1dChTdHJpbmcoZGV0YWlsLnRyYW5zRGF0ZSA/PyBkZXRhaWwuVHJhbnNEYXRlID8/IFwiXCIpKTtcclxuICBjb25zdCBkZWZhdWx0VmlzaXRUeXBlID0gU3RyaW5nKHZpc2l0VHlwZXNbMF0/LnZhbHVlID8/IHZpc2l0VHlwZXNbMF0/LlZhbHVlID8/IFwiXCIpO1xyXG4gIGNvbnN0IHJhd0luaXRpYWxWaXNpdFR5cGUgPSBTdHJpbmcoXHJcbiAgICBkZXRhaWwudGlwb1Zpc2l0YSA/PyBkZXRhaWwuVGlwb1Zpc2l0YSA/PyBkZXRhaWwudmlzaXRUeXBlID8/IGRldGFpbC5WaXNpdFR5cGUgPz8gXCJcIlxyXG4gICk7XHJcbiAgY29uc3QgaW5pdGlhbFZpc2l0VHlwZSA9IG1hdGNoT3B0aW9uVmFsdWUodmlzaXRUeXBlcywgcmF3SW5pdGlhbFZpc2l0VHlwZSkgfHwgZGVmYXVsdFZpc2l0VHlwZTtcclxuICBjb25zdCByYXdJbml0aWFsQ29udGFjdE1ldGhvZCA9IFN0cmluZyhcclxuICAgIGRldGFpbC5jb250YWN0TWV0aG9kID8/IGRldGFpbC5Db250YWN0TWV0aG9kID8/IFwiXCJcclxuICApO1xyXG4gIGNvbnN0IGluaXRpYWxDb250YWN0TWV0aG9kID0gbWF0Y2hPcHRpb25WYWx1ZShjb250YWN0TWV0aG9kcywgcmF3SW5pdGlhbENvbnRhY3RNZXRob2QpO1xyXG4gIGNvbnN0IHJhd0luaXRpYWxBc2lzdGVudGUgPSBTdHJpbmcoXHJcbiAgICBkZXRhaWwuYXNpc3RlbnRlVGlwbyA/PyBkZXRhaWwuQXNpc3RlbnRlVGlwbyA/PyAoYXNpc3RlbnRlVGlwb3NbMF0/LnZhbHVlID8/IGFzaXN0ZW50ZVRpcG9zWzBdPy5WYWx1ZSA/PyBcIlwiKVxyXG4gICk7XHJcbiAgY29uc3QgaW5pdGlhbEFzaXN0ZW50ZSA9IG1hdGNoT3B0aW9uVmFsdWUoYXNpc3RlbnRlVGlwb3MsIHJhd0luaXRpYWxBc2lzdGVudGUpIHx8IHJhd0luaXRpYWxBc2lzdGVudGU7XHJcblxyXG4gIGNvbnN0IFt0cmFuc0RhdGUsIHNldFRyYW5zRGF0ZV0gPSB1c2VTdGF0ZShpbml0aWFsVHJhbnNEYXRlKTtcclxuICBjb25zdCBbdmlzaXRUeXBlLCBzZXRWaXNpdFR5cGVdID0gdXNlU3RhdGUoaW5pdGlhbFZpc2l0VHlwZSk7XHJcbiAgY29uc3QgW2NvbnRhY3RNZXRob2QsIHNldENvbnRhY3RNZXRob2RdID0gdXNlU3RhdGUoaW5pdGlhbENvbnRhY3RNZXRob2QpO1xyXG4gIGNvbnN0IFthc2lzdGVudGVUaXBvLCBzZXRBc2lzdGVudGVUaXBvXSA9IHVzZVN0YXRlKGluaXRpYWxBc2lzdGVudGUpO1xyXG4gIGNvbnN0IFtkZXNjcmlwdGlvbiwgc2V0RGVzY3JpcHRpb25dID0gdXNlU3RhdGUoU3RyaW5nKGRldGFpbC5kZXNjcmlwdGlvbiA/PyBkZXRhaWwuRGVzY3JpcHRpb24gPz8gXCJcIikpO1xyXG4gIGNvbnN0IFtjb21lbnRhcmlvcywgc2V0Q29tZW50YXJpb3NdID0gdXNlU3RhdGUoU3RyaW5nKGRldGFpbC5jb21lbnRhcmlvcyA/PyBkZXRhaWwuQ29tZW50YXJpb3MgPz8gXCJcIikpO1xyXG4gIGNvbnN0IFthbnRlY2VkZW50ZXMsIHNldEFudGVjZWRlbnRlc10gPSB1c2VTdGF0ZShTdHJpbmcoZGV0YWlsLmFudGVjZWRlbnRlcyA/PyBkZXRhaWwuQW50ZWNlZGVudGVzID8/IFwiXCIpKTtcclxuICBjb25zdCBbY29uY2x1c2lvbmVzLCBzZXRDb25jbHVzaW9uZXNdID0gdXNlU3RhdGUoU3RyaW5nKGRldGFpbC5jb25jbHVzaW9uZXMgPz8gZGV0YWlsLkNvbmNsdXNpb25lcyA/PyBcIlwiKSk7XHJcbiAgY29uc3QgW3N0YXR1cywgc2V0U3RhdHVzXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtidXN5LCBzZXRCdXN5XSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbaXNFZGl0aW5nLCBzZXRJc0VkaXRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtpc0h5ZHJhdGluZywgc2V0SXNIeWRyYXRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFttb2RhbEVycm9yLCBzZXRNb2RhbEVycm9yXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IHJlYWRPbmx5U3VyZmFjZVJlZiA9IHVzZVJlZihudWxsKTtcclxuICBjb25zdCBlZGl0U25hcHNob3RSZWYgPSB1c2VSZWYobnVsbCk7XHJcbiAgY29uc3QgcGVybWlzc2lvblRyYWNlUmVmID0gdXNlUmVmKFwiXCIpO1xyXG5cclxuICBjb25zdCByZWNJZCA9IGFjdGl2aXR5UmVjSWQ7XHJcbiAgY29uc3QgYWNjb3VudE51bSA9IFN0cmluZyhkZXRhaWwuYWNjb3VudE51bSA/PyBkZXRhaWwuQWNjb3VudE51bSA/PyBcIlwiKTtcclxuICBjb25zdCBhY3RpdmlkYWRJZCA9IFN0cmluZyhkZXRhaWwuYWN0aXZpZGFkSWQgPz8gZGV0YWlsLkFjdGl2aWRhZElkID8/IFwiXCIpO1xyXG4gIGNvbnN0IG11dGF0aW9uQWNjZXNzID0gdXNlTWVtbygoKSA9PiB7XHJcbiAgICByZXR1cm4gcmVzb2x2ZU1vZHVsZU93bmVyTXV0YXRpb25BY2Nlc3Moe1xyXG4gICAgICB1c2Vyc0J5T3duZXJBeFVzZXJJZDogdmlzaWJsZVVzZXJCeU93bmVyQXhVc2VySWQsXHJcbiAgICAgIG93bmVyQXhVc2VySWQ6IGRldGFpbE93bmVyQXhVc2VySWQsXHJcbiAgICAgIHZpZXdlckF4VXNlcklkOiBheFVzZXJJZCxcclxuICAgICAgdmlzaWJsZVVzZXJzUmVhZHksXHJcbiAgICB9KTtcclxuICB9LCBbYXhVc2VySWQsIGRldGFpbE93bmVyQXhVc2VySWQsIHZpc2libGVVc2VyQnlPd25lckF4VXNlcklkLCB2aXNpYmxlVXNlcnNSZWFkeV0pO1xyXG4gIGNvbnN0IHZpc2libGVPd25lciA9IG11dGF0aW9uQWNjZXNzLm93bmVyO1xyXG4gIGNvbnN0IGRldGFpbE93bmVyVGV4dCA9IHZpc2libGVPd25lciA/IGZvcm1hdE1vZHVsZVZpc2libGVVc2VyTGFiZWwodmlzaWJsZU93bmVyKSA6IGRldGFpbE93bmVyUmF3VGV4dCB8fCBkZXRhaWxPd25lckF4VXNlcklkO1xyXG4gIGNvbnN0IHNob3dPd25lckZpZWxkID0gbXV0YXRpb25BY2Nlc3MucmVhZHkgJiYgISF2aXNpYmxlT3duZXIgJiYgIW11dGF0aW9uQWNjZXNzLmlzQ3VycmVudE93bmVyO1xyXG4gIGNvbnN0IG93bmVyQ2FuTXV0YXRlID0gbXV0YXRpb25BY2Nlc3MuY2FuTXV0YXRlICYmIGhhc1NlcnZlck11dGF0aW9uRGVjaXNpb24gJiYgc2VydmVyQ2FuTXV0YXRlVmlzaXQ7XHJcbiAgY29uc3QgY2FuRWRpdFZpc2l0ID0gY2FuRWRpdEhpc3RvcnkgJiYgb3duZXJDYW5NdXRhdGU7XHJcbiAgY29uc3QgY2FuRGVsZXRlVmlzaXQgPSBjYW5EZWxldGVIaXN0b3J5ICYmIG93bmVyQ2FuTXV0YXRlO1xyXG4gIGNvbnN0IGlzVmlzaXRFZGl0YWJsZSA9IGlzRWRpdGluZyAmJiBjYW5FZGl0VmlzaXQ7XHJcbiAgY29uc3QgbG9nQmxvY2tlZFBlcm1pc3Npb24gPSB1c2VDYWxsYmFjayhcclxuICAgIChvcGVyYXRpb246IFwiZWRpdFwiIHwgXCJ1cGRhdGVcIiB8IFwiZGVsZXRlXCIpID0+IHtcclxuICAgICAgbG9nUGVybWlzc2lvblRyYWNlKFwidmlzaXREZXRhaWw6cGVybWlzc2lvbi1ibG9ja2VkXCIsIHtcclxuICAgICAgICBvcGVyYXRpb24sXHJcbiAgICAgICAgcmVhc29uOiBtdXRhdGlvbkFjY2Vzcy5yZWFzb24sXHJcbiAgICAgICAgcGVybWlzc2lvbnNSZWFkeTogbXV0YXRpb25BY2Nlc3MucmVhZHksXHJcbiAgICAgICAgaXNDdXJyZW50T3duZXI6IG11dGF0aW9uQWNjZXNzLmlzQ3VycmVudE93bmVyLFxyXG4gICAgICAgIG93bmVyQ2FuTXV0YXRlLFxyXG4gICAgICAgIGNsaWVudENhbk11dGF0ZTogbXV0YXRpb25BY2Nlc3MuY2FuTXV0YXRlLFxyXG4gICAgICAgIGhhc1NlcnZlck11dGF0aW9uRGVjaXNpb24sXHJcbiAgICAgICAgc2VydmVyQ2FuTXV0YXRlVmlzaXQ6IGhhc1NlcnZlck11dGF0aW9uRGVjaXNpb24gPyBzZXJ2ZXJDYW5NdXRhdGVWaXNpdCA6IG51bGwsXHJcbiAgICAgICAgc2VydmVyTXV0YXRpb25QZXJtaXNzaW9uU3RhdHVzLFxyXG4gICAgICAgIGNhbkVkaXRNb2R1bGU6IGNhbkVkaXRIaXN0b3J5LFxyXG4gICAgICAgIGNhbkRlbGV0ZU1vZHVsZTogY2FuRGVsZXRlSGlzdG9yeSxcclxuICAgICAgICBjYW5FZGl0VmlzaXQsXHJcbiAgICAgICAgY2FuRGVsZXRlVmlzaXQsXHJcbiAgICAgICAgdmlzaWJsZU93bmVyRm91bmQ6ICEhdmlzaWJsZU93bmVyLFxyXG4gICAgICAgIHZpc2libGVPd25lclBvbGljeTogdmlzaWJsZU93bmVyPy5tdXRhdGlvblBvbGljeSB8fCBcIlwiLFxyXG4gICAgICAgIHZpc2libGVPd25lclBvbGljeUludDogdmlzaWJsZU93bmVyPy5tdXRhdGlvblBvbGljeUludCA/PyBudWxsLFxyXG4gICAgICAgIHZpc2libGVPd25lclBvbGljeUxhYmVsOiB2aXNpYmxlT3duZXI/Lm11dGF0aW9uUG9saWN5TGFiZWwgfHwgXCJcIixcclxuICAgICAgICB2aXNpYmxlT3duZXJDYW5NdXRhdGU6IHZpc2libGVPd25lcj8uY2FuTXV0YXRlID8/IG51bGwsXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIFtcclxuICAgICAgY2FuRGVsZXRlSGlzdG9yeSxcclxuICAgICAgY2FuRGVsZXRlVmlzaXQsXHJcbiAgICAgIGNhbkVkaXRIaXN0b3J5LFxyXG4gICAgICBjYW5FZGl0VmlzaXQsXHJcbiAgICAgIGxvZ1Blcm1pc3Npb25UcmFjZSxcclxuICAgICAgbXV0YXRpb25BY2Nlc3MuY2FuTXV0YXRlLFxyXG4gICAgICBtdXRhdGlvbkFjY2Vzcy5pc0N1cnJlbnRPd25lcixcclxuICAgICAgbXV0YXRpb25BY2Nlc3MucmVhc29uLFxyXG4gICAgICBtdXRhdGlvbkFjY2Vzcy5yZWFkeSxcclxuICAgICAgaGFzU2VydmVyTXV0YXRpb25EZWNpc2lvbixcclxuICAgICAgb3duZXJDYW5NdXRhdGUsXHJcbiAgICAgIHNlcnZlckNhbk11dGF0ZVZpc2l0LFxyXG4gICAgICBzZXJ2ZXJNdXRhdGlvblBlcm1pc3Npb25TdGF0dXMsXHJcbiAgICAgIHZpc2libGVPd25lcixcclxuICAgIF1cclxuICApO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3QgdHJhY2VLZXkgPSBbXHJcbiAgICAgIHJlY0lkLFxyXG4gICAgICBheFVzZXJJZCxcclxuICAgICAgZGV0YWlsT3duZXJBeFVzZXJJZCxcclxuICAgICAgbXV0YXRpb25BY2Nlc3MucmVhc29uLFxyXG4gICAgICBtdXRhdGlvbkFjY2Vzcy5yZWFkeSA/IFwicmVhZHlcIiA6IFwicGVuZGluZ1wiLFxyXG4gICAgICBtdXRhdGlvbkFjY2Vzcy5jYW5NdXRhdGUgPyBcImNhblwiIDogXCJjYW5ub3RcIixcclxuICAgICAgaGFzU2VydmVyTXV0YXRpb25EZWNpc2lvbiA/IChzZXJ2ZXJDYW5NdXRhdGVWaXNpdCA/IFwic2VydmVyLWNhblwiIDogXCJzZXJ2ZXItY2Fubm90XCIpIDogXCJzZXJ2ZXItbWlzc2luZ1wiLFxyXG4gICAgICBzZXJ2ZXJNdXRhdGlvblBlcm1pc3Npb25TdGF0dXMsXHJcbiAgICAgIG11dGF0aW9uQWNjZXNzLmlzQ3VycmVudE93bmVyID8gXCJvd25cIiA6IFwiZm9yZWlnblwiLFxyXG4gICAgICB2aXNpYmxlT3duZXI/Lm11dGF0aW9uUG9saWN5IHx8IFwiXCIsXHJcbiAgICAgIHZpc2libGVPd25lcj8ubXV0YXRpb25Qb2xpY3lJbnQgPz8gXCJcIixcclxuICAgICAgdmlzaWJsZU93bmVyPy5tdXRhdGlvblBvbGljeUxhYmVsIHx8IFwiXCIsXHJcbiAgICAgIHZpc2libGVPd25lcj8uY2FuTXV0YXRlID8/IFwiXCIsXHJcbiAgICAgIGNhbkVkaXRWaXNpdCA/IFwiZWRpdFwiIDogXCJyZWFkXCIsXHJcbiAgICAgIGNhbkRlbGV0ZVZpc2l0ID8gXCJkZWxldGVcIiA6IFwibm9kZWxldGVcIixcclxuICAgIF0uam9pbihcInxcIik7XHJcblxyXG4gICAgaWYgKHBlcm1pc3Npb25UcmFjZVJlZi5jdXJyZW50ID09PSB0cmFjZUtleSkgcmV0dXJuO1xyXG4gICAgcGVybWlzc2lvblRyYWNlUmVmLmN1cnJlbnQgPSB0cmFjZUtleTtcclxuXHJcbiAgICBsb2dQZXJtaXNzaW9uVHJhY2UoXCJ2aXNpdERldGFpbDptdXRhdGlvbi1kZWNpc2lvblwiLCB7XHJcbiAgICAgIHJlYXNvbjogbXV0YXRpb25BY2Nlc3MucmVhc29uLFxyXG4gICAgICBwZXJtaXNzaW9uc1JlYWR5OiBtdXRhdGlvbkFjY2Vzcy5yZWFkeSxcclxuICAgICAgaXNDdXJyZW50T3duZXI6IG11dGF0aW9uQWNjZXNzLmlzQ3VycmVudE93bmVyLFxyXG4gICAgICBvd25lckNhbk11dGF0ZSxcclxuICAgICAgY2xpZW50Q2FuTXV0YXRlOiBtdXRhdGlvbkFjY2Vzcy5jYW5NdXRhdGUsXHJcbiAgICAgIGhhc1NlcnZlck11dGF0aW9uRGVjaXNpb24sXHJcbiAgICAgIHNlcnZlckNhbk11dGF0ZVZpc2l0OiBoYXNTZXJ2ZXJNdXRhdGlvbkRlY2lzaW9uID8gc2VydmVyQ2FuTXV0YXRlVmlzaXQgOiBudWxsLFxyXG4gICAgICBzZXJ2ZXJNdXRhdGlvblBlcm1pc3Npb25TdGF0dXMsXHJcbiAgICAgIGNhbkVkaXRNb2R1bGU6IGNhbkVkaXRIaXN0b3J5LFxyXG4gICAgICBjYW5EZWxldGVNb2R1bGU6IGNhbkRlbGV0ZUhpc3RvcnksXHJcbiAgICAgIGNhbkVkaXRWaXNpdCxcclxuICAgICAgY2FuRGVsZXRlVmlzaXQsXHJcbiAgICAgIHZpc2libGVVc2Vyc1JlYWR5LFxyXG4gICAgICB2aXNpYmxlT3duZXJGb3VuZDogISF2aXNpYmxlT3duZXIsXHJcbiAgICAgIHZpc2libGVPd25lckF4VXNlcklkOiB2aXNpYmxlT3duZXI/LmF4VXNlcklkIHx8IFwiXCIsXHJcbiAgICAgIHZpc2libGVPd25lclNvdXJjZTogdmlzaWJsZU93bmVyPy5zb3VyY2UgfHwgXCJcIixcclxuICAgICAgdmlzaWJsZU93bmVyUG9saWN5OiB2aXNpYmxlT3duZXI/Lm11dGF0aW9uUG9saWN5IHx8IFwiXCIsXHJcbiAgICAgIHZpc2libGVPd25lclBvbGljeUludDogdmlzaWJsZU93bmVyPy5tdXRhdGlvblBvbGljeUludCA/PyBudWxsLFxyXG4gICAgICB2aXNpYmxlT3duZXJQb2xpY3lMYWJlbDogdmlzaWJsZU93bmVyPy5tdXRhdGlvblBvbGljeUxhYmVsIHx8IFwiXCIsXHJcbiAgICAgIHZpc2libGVPd25lckNhbk11dGF0ZTogdmlzaWJsZU93bmVyPy5jYW5NdXRhdGUgPz8gbnVsbCxcclxuICAgIH0pO1xyXG4gIH0sIFtcclxuICAgIGF4VXNlcklkLFxyXG4gICAgY2FuRGVsZXRlSGlzdG9yeSxcclxuICAgIGNhbkRlbGV0ZVZpc2l0LFxyXG4gICAgY2FuRWRpdEhpc3RvcnksXHJcbiAgICBjYW5FZGl0VmlzaXQsXHJcbiAgICBkZXRhaWxPd25lckF4VXNlcklkLFxyXG4gICAgaGFzU2VydmVyTXV0YXRpb25EZWNpc2lvbixcclxuICAgIGxvZ1Blcm1pc3Npb25UcmFjZSxcclxuICAgIG11dGF0aW9uQWNjZXNzLmNhbk11dGF0ZSxcclxuICAgIG11dGF0aW9uQWNjZXNzLmlzQ3VycmVudE93bmVyLFxyXG4gICAgbXV0YXRpb25BY2Nlc3MucmVhc29uLFxyXG4gICAgbXV0YXRpb25BY2Nlc3MucmVhZHksXHJcbiAgICBvd25lckNhbk11dGF0ZSxcclxuICAgIHJlY0lkLFxyXG4gICAgc2VydmVyQ2FuTXV0YXRlVmlzaXQsXHJcbiAgICBzZXJ2ZXJNdXRhdGlvblBlcm1pc3Npb25TdGF0dXMsXHJcbiAgICB2aXNpYmxlT3duZXIsXHJcbiAgICB2aXNpYmxlVXNlcnNSZWFkeSxcclxuICBdKTtcclxuXHJcbiAgY29uc3QgeyBlZGl0TW9kZUtleVJlZiwgc3luY0VkaXRNb2RlRmxhZywgY2xlYXJEcmFmdCwgYXBwbHlEcmFmdFZhbHVlcyB9ID0gdXNlRGV0YWlsRWRpdFNlc3Npb24oe1xyXG4gICAgYWN0aXZpZGFkSWQsXHJcbiAgICByZWNJZCxcclxuICAgIGNhbkVkaXRIaXN0b3J5OiBjYW5FZGl0VmlzaXQsXHJcbiAgICBpc0VkaXRpbmc6IGlzVmlzaXRFZGl0YWJsZSxcclxuICAgIHNldElzRWRpdGluZyxcclxuICAgIHRyYW5zRGF0ZSxcclxuICAgIHZpc2l0VHlwZSxcclxuICAgIGNvbnRhY3RNZXRob2QsXHJcbiAgICBhc2lzdGVudGVUaXBvLFxyXG4gICAgZGVzY3JpcHRpb24sXHJcbiAgICBjb21lbnRhcmlvcyxcclxuICAgIGFudGVjZWRlbnRlcyxcclxuICAgIGNvbmNsdXNpb25lcyxcclxuICAgIHNldFRyYW5zRGF0ZSxcclxuICAgIHNldFZpc2l0VHlwZSxcclxuICAgIHNldENvbnRhY3RNZXRob2QsXHJcbiAgICBzZXRBc2lzdGVudGVUaXBvLFxyXG4gICAgc2V0RGVzY3JpcHRpb24sXHJcbiAgICBzZXRDb21lbnRhcmlvcyxcclxuICAgIHNldEFudGVjZWRlbnRlcyxcclxuICAgIHNldENvbmNsdXNpb25lcyxcclxuICB9KTtcclxuXHJcbiAgY29uc3QgaGFzU2VydmVyRGV0YWlsID1cclxuICAgIGhhc1ZhbHVlKHJlY0lkKSAmJlxyXG4gICAgaGFzVmFsdWUoYWNjb3VudE51bSkgJiZcclxuICAgIGhhc1ZhbHVlKGRldGFpbC50cmFuc0RhdGUgfHwgZGV0YWlsLlRyYW5zRGF0ZSB8fCBcIlwiKTtcclxuXHJcbiAgY29uc3Qgc2hvdWxkSHlkcmF0ZSA9ICEhYWN0aXZpZGFkSWQgJiYgIWhhc1NlcnZlckRldGFpbDtcclxuXHJcbiAgY29uc3Qgb3BlblRleHRFZGl0b3IgPSB1c2VDYWxsYmFjayhcclxuICAgIChcclxuICAgICAgZmllbGRJZDogc3RyaW5nLFxyXG4gICAgICBmaWVsZExhYmVsOiBzdHJpbmcsXHJcbiAgICAgIGZpZWxkVmFsdWU6IHN0cmluZyxcclxuICAgICAgb3B0aW9uczogeyBhbGxvd0VkaXQ/OiBib29sZWFuOyByZWFkT25seT86IGJvb2xlYW47IGVkaXRNb2RlS2V5Pzogc3RyaW5nIH0gPSB7fVxyXG4gICAgKSA9PiB7XHJcbiAgICAgIG5hdmlnYXRlVG9UZXh0RWRpdG9yRmllbGQoe1xyXG4gICAgICAgIGZpZWxkSWQsXHJcbiAgICAgICAgZmllbGRMYWJlbCxcclxuICAgICAgICBmaWVsZFZhbHVlLFxyXG4gICAgICAgIHJlYWRPbmx5OiBvcHRpb25zPy5yZWFkT25seSA9PT0gdHJ1ZSxcclxuICAgICAgICBhbGxvd0VkaXQ6IG9wdGlvbnM/LmFsbG93RWRpdCAhPT0gZmFsc2UsXHJcbiAgICAgICAgZWRpdE1vZGVLZXk6IG9wdGlvbnM/LmVkaXRNb2RlS2V5LFxyXG4gICAgICAgIGVkaXRNb2RlUmV0dXJuVHRsTXM6IEVESVRPUl9SRVRVUk5fRkxBR19UVExfTVMsXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIFtdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQ29tZW50YXJpb3NUYXAgPSB1c2VDYWxsYmFjaygoZXZlbnQpID0+IHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBvcGVuVGV4dEVkaXRvcihmaWVsZElkQ29tZW50YXJpb3MsIGluZFQoXCJWaXNpdHNfRmllbGRfQ29tbWVudHNcIiwgXCJDb21tZW50c1wiKSwgY29tZW50YXJpb3MsIHtcclxuICAgICAgcmVhZE9ubHk6ICFpc1Zpc2l0RWRpdGFibGUsXHJcbiAgICAgIGFsbG93RWRpdDogY2FuRWRpdFZpc2l0LFxyXG4gICAgICBlZGl0TW9kZUtleTogZWRpdE1vZGVLZXlSZWYuY3VycmVudFxyXG4gICAgfSk7XHJcbiAgfSwgW2NvbWVudGFyaW9zLCBlZGl0TW9kZUtleVJlZiwgZmllbGRJZENvbWVudGFyaW9zLCBpc1Zpc2l0RWRpdGFibGUsIGNhbkVkaXRWaXNpdCwgb3BlblRleHRFZGl0b3JdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQ29tZW50YXJpb3NIb2xkID0gdXNlQ2FsbGJhY2soKHRhcmdldCwgY2xpZW50WSkgPT4ge1xyXG4gICAgaWYgKCF0YXJnZXQgfHwgIWlzT3ZlcmZsb3dpbmcodGFyZ2V0KSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgc2V0UHJldmlld0FuY2hvcih0YXJnZXQpO1xyXG4gICAgcmV0dXJuIHNob3dQcmV2aWV3VG9vbHRpcChTdHJpbmcoY29tZW50YXJpb3MgfHwgXCJcIiksIGNsaWVudFkpO1xyXG4gIH0sIFtjb21lbnRhcmlvc10pO1xyXG5cclxuICBjb25zdCBoYW5kbGVBbnRlY2VkZW50ZXNUYXAgPSB1c2VDYWxsYmFjaygoZXZlbnQpID0+IHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBvcGVuVGV4dEVkaXRvcihmaWVsZElkQW50ZWNlZGVudGVzLCBpbmRUKFwiVmlzaXRzX0ZpZWxkX0JhY2tncm91bmRcIiwgXCJCYWNrZ3JvdW5kXCIpLCBhbnRlY2VkZW50ZXMsIHtcclxuICAgICAgcmVhZE9ubHk6ICFpc1Zpc2l0RWRpdGFibGUsXHJcbiAgICAgIGFsbG93RWRpdDogY2FuRWRpdFZpc2l0LFxyXG4gICAgICBlZGl0TW9kZUtleTogZWRpdE1vZGVLZXlSZWYuY3VycmVudFxyXG4gICAgfSk7XHJcbiAgfSwgW2FudGVjZWRlbnRlcywgZWRpdE1vZGVLZXlSZWYsIGZpZWxkSWRBbnRlY2VkZW50ZXMsIGlzVmlzaXRFZGl0YWJsZSwgY2FuRWRpdFZpc2l0LCBvcGVuVGV4dEVkaXRvcl0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVBbnRlY2VkZW50ZXNIb2xkID0gdXNlQ2FsbGJhY2soKHRhcmdldCwgY2xpZW50WSkgPT4ge1xyXG4gICAgaWYgKCF0YXJnZXQgfHwgIWlzT3ZlcmZsb3dpbmcodGFyZ2V0KSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgc2V0UHJldmlld0FuY2hvcih0YXJnZXQpO1xyXG4gICAgcmV0dXJuIHNob3dQcmV2aWV3VG9vbHRpcChTdHJpbmcoYW50ZWNlZGVudGVzIHx8IFwiXCIpLCBjbGllbnRZKTtcclxuICB9LCBbYW50ZWNlZGVudGVzXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUNvbmNsdXNpb25lc1RhcCA9IHVzZUNhbGxiYWNrKChldmVudCkgPT4ge1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIG9wZW5UZXh0RWRpdG9yKGZpZWxkSWRDb25jbHVzaW9uZXMsIGluZFQoXCJWaXNpdHNfRmllbGRfQ29uY2x1c2lvbnNcIiwgXCJDb25jbHVzaW9uc1wiKSwgY29uY2x1c2lvbmVzLCB7XHJcbiAgICAgIHJlYWRPbmx5OiAhaXNWaXNpdEVkaXRhYmxlLFxyXG4gICAgICBhbGxvd0VkaXQ6IGNhbkVkaXRWaXNpdCxcclxuICAgICAgZWRpdE1vZGVLZXk6IGVkaXRNb2RlS2V5UmVmLmN1cnJlbnRcclxuICAgIH0pO1xyXG4gIH0sIFtjb25jbHVzaW9uZXMsIGVkaXRNb2RlS2V5UmVmLCBmaWVsZElkQ29uY2x1c2lvbmVzLCBpc1Zpc2l0RWRpdGFibGUsIGNhbkVkaXRWaXNpdCwgb3BlblRleHRFZGl0b3JdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQ29uY2x1c2lvbmVzSG9sZCA9IHVzZUNhbGxiYWNrKCh0YXJnZXQsIGNsaWVudFkpID0+IHtcclxuICAgIGlmICghdGFyZ2V0IHx8ICFpc092ZXJmbG93aW5nKHRhcmdldCkpIHJldHVybiBmYWxzZTtcclxuICAgIHNldFByZXZpZXdBbmNob3IodGFyZ2V0KTtcclxuICAgIHJldHVybiBzaG93UHJldmlld1Rvb2x0aXAoU3RyaW5nKGNvbmNsdXNpb25lcyB8fCBcIlwiKSwgY2xpZW50WSk7XHJcbiAgfSwgW2NvbmNsdXNpb25lc10pO1xyXG5cclxuICBjb25zdCBjb21lbnRhcmlvc1RhcCA9IHVzZVRhcEd1YXJkKGhhbmRsZUNvbWVudGFyaW9zVGFwLCBoYW5kbGVDb21lbnRhcmlvc0hvbGQpO1xyXG4gIGNvbnN0IGFudGVjZWRlbnRlc1RhcCA9IHVzZVRhcEd1YXJkKGhhbmRsZUFudGVjZWRlbnRlc1RhcCwgaGFuZGxlQW50ZWNlZGVudGVzSG9sZCk7XHJcbiAgY29uc3QgY29uY2x1c2lvbmVzVGFwID0gdXNlVGFwR3VhcmQoaGFuZGxlQ29uY2x1c2lvbmVzVGFwLCBoYW5kbGVDb25jbHVzaW9uZXNIb2xkKTtcclxuXHJcbiAgY29uc3QgdGV4dEVkaXRvckJpbmRpbmdzID0gdXNlTWVtbyhcclxuICAgICgpID0+IFtcclxuICAgICAgeyBmaWVsZElkOiBmaWVsZElkQ29tZW50YXJpb3MsIGFwcGx5VmFsdWU6IHNldENvbWVudGFyaW9zIH0sXHJcbiAgICAgIHsgZmllbGRJZDogZmllbGRJZEFudGVjZWRlbnRlcywgYXBwbHlWYWx1ZTogc2V0QW50ZWNlZGVudGVzIH0sXHJcbiAgICAgIHsgZmllbGRJZDogZmllbGRJZENvbmNsdXNpb25lcywgYXBwbHlWYWx1ZTogc2V0Q29uY2x1c2lvbmVzIH0sXHJcbiAgICBdLFxyXG4gICAgW2ZpZWxkSWRBbnRlY2VkZW50ZXMsIGZpZWxkSWRDb21lbnRhcmlvcywgZmllbGRJZENvbmNsdXNpb25lc11cclxuICApO1xyXG5cclxuICBjb25zdCB7IGFwcGx5VmFsdWVzOiBhcHBseVRleHRFZGl0b3JWYWx1ZXMgfSA9IHVzZVRleHRFZGl0b3JGaWVsZHModGV4dEVkaXRvckJpbmRpbmdzLCB7XHJcbiAgICBhcHBseU9uTW91bnQ6ICFhY3RpdmlkYWRJZCxcclxuICAgIGxpc3RlblBhZ2VTaG93OiB0cnVlLFxyXG4gICAgZW5hYmxlZDogY2FuRWRpdFZpc2l0LFxyXG4gIH0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFtdXRhdGlvbkFjY2Vzcy5yZWFkeSB8fCBjYW5FZGl0VmlzaXQpIHJldHVybjtcclxuXHJcbiAgICBjbGVhclRleHRFZGl0b3JWYWx1ZShmaWVsZElkQ29tZW50YXJpb3MpO1xyXG4gICAgY2xlYXJUZXh0RWRpdG9yVmFsdWUoZmllbGRJZEFudGVjZWRlbnRlcyk7XHJcbiAgICBjbGVhclRleHRFZGl0b3JWYWx1ZShmaWVsZElkQ29uY2x1c2lvbmVzKTtcclxuICB9LCBbY2FuRWRpdFZpc2l0LCBmaWVsZElkQW50ZWNlZGVudGVzLCBmaWVsZElkQ29tZW50YXJpb3MsIGZpZWxkSWRDb25jbHVzaW9uZXMsIG11dGF0aW9uQWNjZXNzLnJlYWR5XSk7XHJcblxyXG4gIGNvbnN0IHsgbW9kYWwsIG9wZW5Db25maXJtLCBjbG9zZUNvbmZpcm0sIGhhbmRsZUNvbmZpcm0gfSA9IHVzZUNvbmZpcm1EaWFsb2coe1xyXG4gICAgZGVmYXVsdENvbmZpcm1UZXh0OiBpbmRUKFwiQ29uZmlybV9ZZXNcIiwgXCJDb25maXJtX1llc1wiKSxcclxuICAgIGRlZmF1bHRDYW5jZWxUZXh0OiBpbmRUKFwiQ29uZmlybV9Ob1wiLCBcIkNvbmZpcm1fTm9cIilcclxuICB9KTtcclxuXHJcbiAgY29uc3QgaGFuZGxlTW9kYWxDb25maXJtID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgc2V0TW9kYWxFcnJvcihcIlwiKTtcclxuICAgIGF3YWl0IGhhbmRsZUNvbmZpcm0oe1xyXG4gICAgICBidXN5LFxyXG4gICAgICBvbkVycm9yOiAobXNnKSA9PiB7XHJcbiAgICAgICAgc2V0TW9kYWxFcnJvcihtc2cpO1xyXG4gICAgICAgIHNldFN0YXR1cyhtc2cpO1xyXG4gICAgICAgIGZsYXNoQWN0aW9uTWFyayhcImVycm9yUHJvY2Vzc1wiLCAxNTAwKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSwgW2J1c3ksIGhhbmRsZUNvbmZpcm1dKTtcclxuXHJcbiAgY29uc3QgbW9kYWxMb2FkaW5nVGV4dCA9IGluZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkNvbW1vbl9Mb2FkaW5nXCIpO1xyXG4gIGNvbnN0IG1vZGFsQ2FuY2VsVGV4dCA9IG1vZGFsLmNhbmNlbFRleHQgfHwgaW5kVChcIkNvbmZpcm1fTm9cIiwgXCJDb25maXJtX05vXCIpO1xyXG4gIGNvbnN0IG1vZGFsQ29uZmlybVRleHQgPSBidXN5XHJcbiAgICA/IG1vZGFsTG9hZGluZ1RleHRcclxuICAgIDogKCFidXN5ICYmIG1vZGFsRXJyb3IgPyBpbmRUKFwiQ29tbW9uX09LXCIsIFwiQ29tbW9uX09LXCIpIDogKG1vZGFsLmNvbmZpcm1UZXh0IHx8IGluZFQoXCJDb25maXJtX1llc1wiLCBcIkNvbmZpcm1fWWVzXCIpKSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZU1vZGFsQnV0dG9uQ29uZmlybSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmICghYnVzeSAmJiBtb2RhbEVycm9yKSB7XHJcbiAgICAgIGNsb3NlQ29uZmlybSgpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBoYW5kbGVNb2RhbENvbmZpcm0oKTtcclxuICB9LCBbYnVzeSwgbW9kYWxFcnJvciwgY2xvc2VDb25maXJtLCBoYW5kbGVNb2RhbENvbmZpcm1dKTtcclxuXHJcbiAgY29uc3QgaGFzQWN0aXZlUHJvY2VzcyA9IHVzZU1lbW8oKCkgPT4gYnVzeSB8fCBpc1Zpc2l0RWRpdGFibGUsIFtidXN5LCBpc1Zpc2l0RWRpdGFibGVdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIHdpbmRvdy5fX2luZFNldE5hdmlnYXRpb25HdWFyZD8uKGhhc0FjdGl2ZVByb2Nlc3MpO1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgd2luZG93Ll9faW5kQ2xlYXJOYXZpZ2F0aW9uR3VhcmQ/LigpO1xyXG4gICAgfTtcclxuICB9LCBbaGFzQWN0aXZlUHJvY2Vzc10pO1xyXG5cclxuICB1c2VEZXRhaWxIeWRyYXRpb24oe1xyXG4gICAgYWN0aXZpZGFkSWQsXHJcbiAgICBzaG91bGRIeWRyYXRlLFxyXG4gICAgdmlzaXRUeXBlcyxcclxuICAgIGNvbnRhY3RNZXRob2RzLFxyXG4gICAgYXNpc3RlbnRlVGlwb3MsXHJcbiAgICBkZWZhdWx0VmlzaXRUeXBlLFxyXG4gICAgaW5pdGlhbEFzaXN0ZW50ZSxcclxuICAgIG5vcm1hbGl6ZURhdGVUb0lucHV0LFxyXG4gICAgbWF0Y2hPcHRpb25WYWx1ZSxcclxuICAgIGFwcGx5RHJhZnRWYWx1ZXMsXHJcbiAgICBhcHBseVRleHRFZGl0b3JWYWx1ZXMsXHJcbiAgICBzZXRTdGF0dXMsXHJcbiAgICBzZXRJc0h5ZHJhdGluZyxcclxuICAgIHNldFRyYW5zRGF0ZSxcclxuICAgIHNldFZpc2l0VHlwZSxcclxuICAgIHNldENvbnRhY3RNZXRob2QsXHJcbiAgICBzZXRBc2lzdGVudGVUaXBvLFxyXG4gICAgc2V0RGVzY3JpcHRpb24sXHJcbiAgICBzZXRDb21lbnRhcmlvcyxcclxuICAgIHNldEFudGVjZWRlbnRlcyxcclxuICAgIHNldENvbmNsdXNpb25lcyxcclxuICB9KTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IGVsID0gcmVhZE9ubHlTdXJmYWNlUmVmLmN1cnJlbnQ7XHJcbiAgICBpZiAoIWVsKSByZXR1cm47XHJcbiAgICBpZiAoIWlzVmlzaXRFZGl0YWJsZSkge1xyXG4gICAgICBlbC5jbGFzc0xpc3QuYWRkKFwiaW5kLXJlYWRvbmx5LXN1cmZhY2VcIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiaW5kLXJlYWRvbmx5LXN1cmZhY2VcIik7XHJcbiAgICB9XHJcbiAgfSwgW2lzVmlzaXRFZGl0YWJsZV0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKGlzVmlzaXRFZGl0YWJsZSkge1xyXG4gICAgICBpZiAoIWVkaXRTbmFwc2hvdFJlZi5jdXJyZW50KSB7XHJcbiAgICAgICAgZWRpdFNuYXBzaG90UmVmLmN1cnJlbnQgPSB7XHJcbiAgICAgICAgICB0cmFuc0RhdGUsXHJcbiAgICAgICAgICB2aXNpdFR5cGUsXHJcbiAgICAgICAgICBjb250YWN0TWV0aG9kLFxyXG4gICAgICAgICAgYXNpc3RlbnRlVGlwbyxcclxuICAgICAgICAgIGRlc2NyaXB0aW9uLFxyXG4gICAgICAgICAgY29tZW50YXJpb3MsXHJcbiAgICAgICAgICBhbnRlY2VkZW50ZXMsXHJcbiAgICAgICAgICBjb25jbHVzaW9uZXNcclxuICAgICAgICB9O1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGVkaXRTbmFwc2hvdFJlZi5jdXJyZW50ID0gbnVsbDtcclxuICB9LCBbaXNWaXNpdEVkaXRhYmxlLCB0cmFuc0RhdGUsIHZpc2l0VHlwZSwgY29udGFjdE1ldGhvZCwgYXNpc3RlbnRlVGlwbywgZGVzY3JpcHRpb24sIGNvbWVudGFyaW9zLCBhbnRlY2VkZW50ZXMsIGNvbmNsdXNpb25lc10pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKGlzVmlzaXRFZGl0YWJsZSkgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIHJldHVybiBiaW5kUmVhZE9ubHlHdWFyZChyZWFkT25seVN1cmZhY2VSZWYuY3VycmVudCk7XHJcbiAgfSwgW2lzVmlzaXRFZGl0YWJsZV0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVFbmFibGVFZGl0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKCFjYW5FZGl0VmlzaXQpIHtcclxuICAgICAgbG9nQmxvY2tlZFBlcm1pc3Npb24oXCJlZGl0XCIpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBzZXRJc0VkaXRpbmcodHJ1ZSk7XHJcbiAgICBzeW5jRWRpdE1vZGVGbGFnKHRydWUpO1xyXG4gICAgc2V0U3RhdHVzKGluZFQoXCJWaXNpdHNfRGV0YWlsX0VkaXRpbmdFbmFibGVkXCIsIFwiRWRpdGluZyBlbmFibGVkXCIpKTtcclxuICB9LCBbY2FuRWRpdFZpc2l0LCBsb2dCbG9ja2VkUGVybWlzc2lvbiwgc3luY0VkaXRNb2RlRmxhZ10pO1xyXG5cclxuICBjb25zdCBoYW5kbGVDYW5jZWxFZGl0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKCFpc0VkaXRpbmcpIHJldHVybjtcclxuICAgIHNldElzRWRpdGluZyhmYWxzZSk7XHJcbiAgICBzeW5jRWRpdE1vZGVGbGFnKGZhbHNlKTtcclxuICAgIGNsZWFyRHJhZnQoKTtcclxuICAgIHNldFN0YXR1cyhpbmRUKFwiQ29tbW9uX0NhbmNlbFwiLCBcIkNhbmNlbFwiKSk7XHJcbiAgICB3aW5kb3cuX19pbmRCeXBhc3NOYXZpZ2F0aW9uR3VhcmRPbmNlPy4oKTtcclxuICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcclxuICB9LCBbaXNFZGl0aW5nLCBzeW5jRWRpdE1vZGVGbGFnLCBjbGVhckRyYWZ0XSk7XHJcblxyXG4gIGNvbnN0IHsgaGFuZGxlVXBkYXRlLCBoYW5kbGVEZWxldGUgfSA9IHVzZURldGFpbE11dGF0aW9ucyh7XHJcbiAgICBidXN5LFxyXG4gICAgaXNFZGl0aW5nOiBpc1Zpc2l0RWRpdGFibGUsXHJcbiAgICBjYW5FZGl0SGlzdG9yeTogY2FuRWRpdFZpc2l0LFxyXG4gICAgY2FuRGVsZXRlSGlzdG9yeTogY2FuRGVsZXRlVmlzaXQsXHJcbiAgICByZWNJZCxcclxuICAgIGFjY291bnROdW0sXHJcbiAgICB0cmFuc0RhdGUsXHJcbiAgICB2aXNpdFR5cGUsXHJcbiAgICBjb250YWN0TWV0aG9kLFxyXG4gICAgYXNpc3RlbnRlVGlwbyxcclxuICAgIGRlc2NyaXB0aW9uLFxyXG4gICAgY29tZW50YXJpb3MsXHJcbiAgICBhbnRlY2VkZW50ZXMsXHJcbiAgICBjb25jbHVzaW9uZXMsXHJcbiAgICB2aXNpdFR5cGVzLFxyXG4gICAgY29udGFjdE1ldGhvZHMsXHJcbiAgICBhc2lzdGVudGVUaXBvcyxcclxuICAgIGRlZmF1bHRWaXNpdFR5cGUsXHJcbiAgICByYXdJbml0aWFsVmlzaXRUeXBlLFxyXG4gICAgcmF3SW5pdGlhbENvbnRhY3RNZXRob2QsXHJcbiAgICByYXdJbml0aWFsQXNpc3RlbnRlLFxyXG4gICAgbWF0Y2hPcHRpb25WYWx1ZSxcclxuICAgIGNsZWFyRHJhZnQsXHJcbiAgICBzeW5jRWRpdE1vZGVGbGFnLFxyXG4gICAgb25QZXJtaXNzaW9uQmxvY2tlZDogbG9nQmxvY2tlZFBlcm1pc3Npb24sXHJcbiAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgc2V0QnVzeSxcclxuICAgIHNldFN0YXR1cyxcclxuICAgIHNldElzRWRpdGluZyxcclxuICB9KTtcclxuXHJcbiAgdXNlRGV0YWlsVG9wYmFyQWN0aW9ucyh7XHJcbiAgICBidXN5LFxyXG4gICAgbW9kYWxPcGVuOiBtb2RhbC5vcGVuLFxyXG4gICAgaXNFZGl0aW5nOiBpc1Zpc2l0RWRpdGFibGUsXHJcbiAgICBjYW5FZGl0SGlzdG9yeTogY2FuRWRpdFZpc2l0LFxyXG4gICAgY2FuRGVsZXRlSGlzdG9yeTogY2FuRGVsZXRlVmlzaXQsXHJcbiAgICB0cmFuc0RhdGUsXHJcbiAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgaGFuZGxlRW5hYmxlRWRpdCxcclxuICAgIGhhbmRsZUNhbmNlbEVkaXQsXHJcbiAgICBoYW5kbGVVcGRhdGUsXHJcbiAgICBoYW5kbGVEZWxldGUsXHJcbiAgICBvblBlcm1pc3Npb25CbG9ja2VkOiBsb2dCbG9ja2VkUGVybWlzc2lvbixcclxuICAgIG9wZW5Db25maXJtLFxyXG4gICAgY2xvc2VDb25maXJtLFxyXG4gICAgcGVybWlzc2lvbnNSZWFkeTogbXV0YXRpb25BY2Nlc3MucmVhZHksXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IGRlc2NyaXB0aW9uTGFiZWwgPSBpbmRUKFwiVmlzaXRzX0ZpZWxkX0Rlc2NyaXB0aW9uXCIsIFwiRGVzY3JpcHRpb25cIik7XHJcbiAgY29uc3QgY29tbWVudHNMYWJlbCA9IGluZFQoXCJWaXNpdHNfRmllbGRfQ29tbWVudHNcIiwgXCJDb21tZW50c1wiKTtcclxuICBjb25zdCBiYWNrZ3JvdW5kTGFiZWwgPSBpbmRUKFwiVmlzaXRzX0ZpZWxkX0JhY2tncm91bmRcIiwgXCJCYWNrZ3JvdW5kXCIpO1xyXG4gIGNvbnN0IGNvbmNsdXNpb25zTGFiZWwgPSBpbmRUKFwiVmlzaXRzX0ZpZWxkX0NvbmNsdXNpb25zXCIsIFwiQ29uY2x1c2lvbnNcIik7XHJcbiAgY29uc3QgZGV0YWlsRGVzY3JpcHRpb25DbGFzc05hbWUgPSBjbGFzc05hbWVzKFxyXG4gICAgXCJmb3JtLWNvbnRyb2xcIixcclxuICAgIGlzVmlzaXRFZGl0YWJsZSA/IFwiYm9yZGVyLW5ldXRyYWwtMjAwIHRleHQtbmV1dHJhbC05MDBcIiA6IFwiYm9yZGVyLW5ldXRyYWwtMjAwIGluZC1yZWFkb25seS1maWVsZFwiXHJcbiAgKTtcclxuICBjb25zdCBkZXRhaWxSZWFkT25seUNsYXNzTmFtZSA9IGNsYXNzTmFtZXMoXCJmb3JtLWNvbnRyb2wgY3Vyc29yLXBvaW50ZXJcIiwgIWlzVmlzaXRFZGl0YWJsZSA/IFwiaW5kLXJlYWRvbmx5LWZpZWxkXCIgOiBcIlwiKTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS00XCI+XHJcbiAgICAgIDxDb25maXJtTW9kYWxcclxuICAgICAgICBvcGVuPXttb2RhbC5vcGVufVxyXG4gICAgICAgIHRpdGxlPXttb2RhbC50aXRsZX1cclxuICAgICAgICBtZXNzYWdlPXttb2RhbC5tZXNzYWdlfVxyXG4gICAgICAgIGNvbmZpcm1UZXh0PXttb2RhbENvbmZpcm1UZXh0fVxyXG4gICAgICAgIGNhbmNlbFRleHQ9e21vZGFsQ2FuY2VsVGV4dH1cclxuICAgICAgICBsb2FkaW5nVGV4dD17bW9kYWxMb2FkaW5nVGV4dH1cclxuICAgICAgICBzaG93Q2FuY2VsPXttb2RhbC5zaG93Q2FuY2VsfVxyXG4gICAgICAgIHNob3dDb25maXJtPXttb2RhbC5zaG93Q29uZmlybX1cclxuICAgICAgICBidXN5PXtidXN5fVxyXG4gICAgICAgIGVycm9yPXttb2RhbEVycm9yfVxyXG4gICAgICAgIHN0YXR1cz17c3RhdHVzfVxyXG4gICAgICAgIG9uQ29uZmlybT17aGFuZGxlTW9kYWxCdXR0b25Db25maXJtfVxyXG4gICAgICAgIG9uQ2FuY2VsPXtjbG9zZUNvbmZpcm19XHJcbiAgICAgIC8+XHJcbiAgICAgIDxkaXZcclxuICAgICAgICByZWY9e3JlYWRPbmx5U3VyZmFjZVJlZn1cclxuICAgICAgICBjbGFzc05hbWU9XCJyZWxhdGl2ZSBzaGFkb3cteHMgZ2xhc3MtcGFuZWwgcC00IHNwYWNlLXktNCBib3JkZXIgYm9yZGVyLW5ldXRyYWwtMjAwIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldXCJcclxuICAgICAgPlxyXG4gICAgICAgIHtpc0h5ZHJhdGluZyAmJiAoXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgei0xMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBiZy13aGl0ZS83MCByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXVwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQtc20gdGV4dC1uZXV0cmFsLTYwMFwiPlxyXG4gICAgICAgICAgICAgIDxTcGlubmVyIHNpemU9XCJzaXplLTVcIiAvPlxyXG4gICAgICAgICAgICAgIDxzcGFuPntpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfTwvc3Bhbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApfVxyXG4gICAgICAgIHtzaG93T3duZXJGaWVsZCAmJiAoXHJcbiAgICAgICAgICA8RGV0YWlsT3duZXJGaWVsZCBsYWJlbD17aW5kVChcIlZpc2l0c19EZXRhaWxfT3duZXJfTGFiZWxcIiwgXCJPd25lclwiKX0gdmFsdWU9e2RldGFpbE93bmVyVGV4dH0gLz5cclxuICAgICAgICApfVxyXG5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTMgZ2FwLTQgcHQtMVwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ2aXNpdGEtZmllbGQtdGV4dFwiPlxyXG4gICAgICAgICAgICA8U2luZ2xlRGF0ZVBpY2tlclxyXG4gICAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiVmlzaXRzX0RldGFpbF9EYXRlX0xhYmVsXCIsIFwiRGF0ZVwiKX1cclxuICAgICAgICAgICAgICB2YWx1ZT17dHJhbnNEYXRlfVxyXG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXtzZXRUcmFuc0RhdGV9XHJcbiAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFpc1Zpc2l0RWRpdGFibGV9XHJcbiAgICAgICAgICAgICAgcmVhZE9ubHk9eyFpc1Zpc2l0RWRpdGFibGV9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxTZWxlY3RDb21ib2JveFxyXG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIlZpc2l0c19EZXRhaWxfVmlzaXRUeXBlX0xhYmVsXCIsIFwiVmlzaXQgdHlwZVwiKX1cclxuICAgICAgICAgICAgb3B0aW9ucz17dmlzaXRUeXBlc31cclxuICAgICAgICAgICAgdmFsdWU9e3Zpc2l0VHlwZX1cclxuICAgICAgICAgICAgb25DaGFuZ2U9e3NldFZpc2l0VHlwZX1cclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJWaXNpdHNfRGV0YWlsX1Zpc2l0VHlwZV9QbGFjZWhvbGRlclwiLCBcIlNlbGVjdCB0eXBlXCIpfVxuICAgICAgICAgICAgZGlzYWJsZWQ9eyFpc1Zpc2l0RWRpdGFibGV9XG4gICAgICAgICAgICByZWFkT25seT17IWlzVmlzaXRFZGl0YWJsZX1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxTZWxlY3RDb21ib2JveFxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJWaXNpdHNfRGV0YWlsX0NvbnRhY3RNZXRob2RfTGFiZWxcIiwgXCJDb250YWN0IGNoYW5uZWxcIil9XHJcbiAgICAgICAgICAgIG9wdGlvbnM9e2NvbnRhY3RNZXRob2RzfVxyXG4gICAgICAgICAgICB2YWx1ZT17Y29udGFjdE1ldGhvZH1cclxuICAgICAgICAgICAgb25DaGFuZ2U9e3NldENvbnRhY3RNZXRob2R9XHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiVmlzaXRzX0RldGFpbF9Db250YWN0TWV0aG9kX1BsYWNlaG9sZGVyXCIsIFwiU2VsZWN0IG1ldGhvZFwiKX1cbiAgICAgICAgICAgIGRpc2FibGVkPXshaXNWaXNpdEVkaXRhYmxlfVxuICAgICAgICAgICAgcmVhZE9ubHk9eyFpc1Zpc2l0RWRpdGFibGV9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIDxWaXNpdE5hcnJhdGl2ZUZpZWxkc1xyXG4gICAgICAgICAgZGVzY3JpcHRpb25MYWJlbD17ZGVzY3JpcHRpb25MYWJlbH1cclxuICAgICAgICAgIGRlc2NyaXB0aW9uVmFsdWU9e2Rlc2NyaXB0aW9ufVxyXG4gICAgICAgICAgZGVzY3JpcHRpb25DbGFzc05hbWU9e2RldGFpbERlc2NyaXB0aW9uQ2xhc3NOYW1lfVxyXG4gICAgICAgICAgZGVzY3JpcHRpb25EaXNhYmxlZD17IWlzVmlzaXRFZGl0YWJsZX1cclxuICAgICAgICAgIG9uRGVzY3JpcHRpb25DaGFuZ2U9e3NldERlc2NyaXB0aW9ufVxyXG4gICAgICAgICAgdGFwRmllbGRzPXtbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBpZDogXCJjb21lbnRhcmlvc1wiLFxyXG4gICAgICAgICAgICAgIGxhYmVsOiBjb21tZW50c0xhYmVsLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiBjb21lbnRhcmlvcyxcclxuICAgICAgICAgICAgICBjbGFzc05hbWU6IGRldGFpbFJlYWRPbmx5Q2xhc3NOYW1lLFxyXG4gICAgICAgICAgICAgIHBvaW50ZXJCaW5kaW5nczogY29tZW50YXJpb3NUYXAsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBpZDogXCJhbnRlY2VkZW50ZXNcIixcclxuICAgICAgICAgICAgICBsYWJlbDogYmFja2dyb3VuZExhYmVsLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiBhbnRlY2VkZW50ZXMsXHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lOiBkZXRhaWxSZWFkT25seUNsYXNzTmFtZSxcclxuICAgICAgICAgICAgICBwb2ludGVyQmluZGluZ3M6IGFudGVjZWRlbnRlc1RhcCxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIGlkOiBcImNvbmNsdXNpb25lc1wiLFxyXG4gICAgICAgICAgICAgIGxhYmVsOiBjb25jbHVzaW9uc0xhYmVsLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiBjb25jbHVzaW9uZXMsXHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lOiBkZXRhaWxSZWFkT25seUNsYXNzTmFtZSxcclxuICAgICAgICAgICAgICBwb2ludGVyQmluZGluZ3M6IGNvbmNsdXNpb25lc1RhcCxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIF19XHJcbiAgICAgICAgLz5cclxuXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMyB0ZXh0LXNtIHRleHQtbmV1dHJhbC02MDBcIj5cclxuICAgICAgICAgIDxzcGFuPntzdGF0dXN9PC9zcGFuPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG4vLyBEZXRhaWwgVUkgd3JhcHBlZCBieSB0aGUgZXJyb3IgYm91bmRhcnkuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIERldGFpbEZvcm0ocHJvcHM6IERldGFpbEZvcm1Qcm9wcykge1xyXG4gIHJldHVybiAoXHJcbiAgICA8QXBwRXJyb3JCb3VuZGFyeSBmYWxsYmFja01lc3NhZ2U9e2luZFQoXCJWaXNpdHNfRGV0YWlsX0Vycm9yQm91bmRhcnlcIiwgXCJBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSByZW5kZXJpbmcgdGhlIGRldGFpbCBwYWdlLiBSZWxvYWQgYW5kIHRyeSBhZ2Fpbi5cIil9PlxyXG4gICAgICA8RGV0YWlsQXBwIHsuLi5wcm9wc30gLz5cclxuICAgIDwvQXBwRXJyb3JCb3VuZGFyeT5cclxuICApO1xyXG59XHJcbiIsICJleHBvcnQgY29uc3QgYmluZFJlYWRPbmx5R3VhcmQgPSAoZWw6IEhUTUxFbGVtZW50IHwgbnVsbCkgPT4ge1xyXG4gIGlmICghZWwpIHJldHVybiAoKSA9PiB7fTtcclxuICBjb25zdCBjYW5jZWwgPSAoZXZlbnQ6IEV2ZW50KSA9PiBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIGNvbnN0IGV2ZW50cyA9IFtcImNvbnRleHRtZW51XCIsIFwic2VsZWN0c3RhcnRcIiwgXCJjb3B5XCIsIFwiY3V0XCIsIFwicGFzdGVcIl07XHJcbiAgZXZlbnRzLmZvckVhY2goKGV2dCkgPT4gZWwuYWRkRXZlbnRMaXN0ZW5lcihldnQsIGNhbmNlbCkpO1xyXG4gIHJldHVybiAoKSA9PiB7XHJcbiAgICBldmVudHMuZm9yRWFjaCgoZXZ0KSA9PiBlbC5yZW1vdmVFdmVudExpc3RlbmVyKGV2dCwgY2FuY2VsKSk7XHJcbiAgfTtcclxufTtcclxuIiwgImV4cG9ydCBjb25zdCBoYXNWYWx1ZSA9ICh2YWx1ZTogdW5rbm93bikgPT4gU3RyaW5nKHZhbHVlIHx8IFwiXCIpLnRyaW0oKS5sZW5ndGggPiAwO1xyXG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBmZXRjaEpzb24gfSBmcm9tIFwiLi4vc2VydmljZXMvYXBpU2VydmljZS50c1wiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuXHJcbnR5cGUgT3B0aW9uTGlrZSA9IHtcclxuICB2YWx1ZT86IHN0cmluZyB8IG51bWJlcjtcclxuICBWYWx1ZT86IHN0cmluZyB8IG51bWJlcjtcclxuICB0ZXh0Pzogc3RyaW5nO1xyXG4gIFRleHQ/OiBzdHJpbmc7XHJcbn07XHJcblxyXG50eXBlIEFjdGl2aXR5RGV0YWlsUmVjb3JkID0gUmVjb3JkPHN0cmluZywgdW5rbm93bj47XHJcblxyXG50eXBlIEFjdGl2aXR5RGV0YWlsUmVzcG9uc2UgPSB7XHJcbiAgc3VjY2Vzcz86IGJvb2xlYW47XHJcbiAgbWVzc2FnZT86IHN0cmluZztcclxuICBkYXRhPzogQWN0aXZpdHlEZXRhaWxSZWNvcmQgfCBudWxsO1xyXG4gIFN1Y2Nlc3M/OiBib29sZWFuO1xyXG4gIE1lc3NhZ2U/OiBzdHJpbmc7XHJcbiAgRGF0YT86IEFjdGl2aXR5RGV0YWlsUmVjb3JkIHwgbnVsbDtcclxufTtcclxuXHJcbmNvbnN0IGlzUmVzcG9uc2VTdWNjZXNzID0gKHJlc3BvbnNlOiBBY3Rpdml0eURldGFpbFJlc3BvbnNlKTogYm9vbGVhbiA9PiB7XHJcbiAgcmV0dXJuIHJlc3BvbnNlLnN1Y2Nlc3MgPT09IHRydWUgfHwgcmVzcG9uc2UuU3VjY2VzcyA9PT0gdHJ1ZTtcclxufTtcclxuXHJcbmNvbnN0IGdldFJlc3BvbnNlTWVzc2FnZSA9IChyZXNwb25zZTogQWN0aXZpdHlEZXRhaWxSZXNwb25zZSk6IHN0cmluZyA9PiB7XHJcbiAgY29uc3QgcmF3ID0gcmVzcG9uc2UubWVzc2FnZSA/PyByZXNwb25zZS5NZXNzYWdlO1xyXG4gIHJldHVybiB0eXBlb2YgcmF3ID09PSBcInN0cmluZ1wiID8gcmF3LnRyaW0oKSA6IFwiXCI7XHJcbn07XHJcblxyXG5jb25zdCBnZXRSZXNwb25zZURhdGEgPSAocmVzcG9uc2U6IEFjdGl2aXR5RGV0YWlsUmVzcG9uc2UpOiBBY3Rpdml0eURldGFpbFJlY29yZCB8IG51bGwgPT4ge1xyXG4gIGNvbnN0IGRhdGEgPSByZXNwb25zZS5kYXRhID8/IHJlc3BvbnNlLkRhdGE7XHJcbiAgcmV0dXJuIGRhdGEgJiYgdHlwZW9mIGRhdGEgPT09IFwib2JqZWN0XCIgPyBkYXRhIDogbnVsbDtcclxufTtcclxuXHJcbmNvbnN0IGFzUmVjb3JkID0gKHZhbHVlOiB1bmtub3duKTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4gfCBudWxsID0+IHtcclxuICBpZiAoIXZhbHVlIHx8IHR5cGVvZiB2YWx1ZSAhPT0gXCJvYmplY3RcIiB8fCBBcnJheS5pc0FycmF5KHZhbHVlKSkgcmV0dXJuIG51bGw7XHJcbiAgcmV0dXJuIHZhbHVlIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+O1xyXG59O1xyXG5cclxudHlwZSBVc2VEZXRhaWxIeWRyYXRpb25BcmdzID0ge1xyXG4gIGFjdGl2aWRhZElkOiBzdHJpbmc7XHJcbiAgc2hvdWxkSHlkcmF0ZTogYm9vbGVhbjtcclxuICB2aXNpdFR5cGVzOiBPcHRpb25MaWtlW107XHJcbiAgY29udGFjdE1ldGhvZHM6IE9wdGlvbkxpa2VbXTtcclxuICBhc2lzdGVudGVUaXBvczogT3B0aW9uTGlrZVtdO1xyXG4gIGRlZmF1bHRWaXNpdFR5cGU6IHN0cmluZztcclxuICBpbml0aWFsQXNpc3RlbnRlOiBzdHJpbmc7XHJcbiAgbm9ybWFsaXplRGF0ZVRvSW5wdXQ6ICh2YWx1ZTogc3RyaW5nKSA9PiBzdHJpbmc7XHJcbiAgbWF0Y2hPcHRpb25WYWx1ZTogKG9wdGlvbnM6IE9wdGlvbkxpa2VbXSwgcmF3OiB1bmtub3duKSA9PiBzdHJpbmc7XHJcbiAgYXBwbHlEcmFmdFZhbHVlczogKCkgPT4gdm9pZDtcclxuICBhcHBseVRleHRFZGl0b3JWYWx1ZXM6ICgpID0+IHZvaWQ7XHJcbiAgc2V0U3RhdHVzOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBzZXRJc0h5ZHJhdGluZzogKHZhbHVlOiBib29sZWFuKSA9PiB2b2lkO1xyXG4gIHNldFRyYW5zRGF0ZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgc2V0VmlzaXRUeXBlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBzZXRDb250YWN0TWV0aG9kOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBzZXRBc2lzdGVudGVUaXBvOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBzZXREZXNjcmlwdGlvbjogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgc2V0Q29tZW50YXJpb3M6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIHNldEFudGVjZWRlbnRlczogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgc2V0Q29uY2x1c2lvbmVzOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxufTtcclxuXHJcbi8vIEtlZXBzIGRldGFpbCBoeWRyYXRpb24gb3JjaGVzdHJhdGlvbiBvdXRzaWRlIHRoZSBwYWdlIGNvbXBvbmVudC5cclxuZXhwb3J0IGNvbnN0IHVzZURldGFpbEh5ZHJhdGlvbiA9ICh7XHJcbiAgYWN0aXZpZGFkSWQsXHJcbiAgc2hvdWxkSHlkcmF0ZSxcclxuICB2aXNpdFR5cGVzLFxyXG4gIGNvbnRhY3RNZXRob2RzLFxyXG4gIGFzaXN0ZW50ZVRpcG9zLFxyXG4gIGRlZmF1bHRWaXNpdFR5cGUsXHJcbiAgaW5pdGlhbEFzaXN0ZW50ZSxcclxuICBub3JtYWxpemVEYXRlVG9JbnB1dCxcclxuICBtYXRjaE9wdGlvblZhbHVlLFxyXG4gIGFwcGx5RHJhZnRWYWx1ZXMsXHJcbiAgYXBwbHlUZXh0RWRpdG9yVmFsdWVzLFxyXG4gIHNldFN0YXR1cyxcclxuICBzZXRJc0h5ZHJhdGluZyxcclxuICBzZXRUcmFuc0RhdGUsXHJcbiAgc2V0VmlzaXRUeXBlLFxyXG4gIHNldENvbnRhY3RNZXRob2QsXHJcbiAgc2V0QXNpc3RlbnRlVGlwbyxcclxuICBzZXREZXNjcmlwdGlvbixcclxuICBzZXRDb21lbnRhcmlvcyxcclxuICBzZXRBbnRlY2VkZW50ZXMsXHJcbiAgc2V0Q29uY2x1c2lvbmVzLFxyXG59OiBVc2VEZXRhaWxIeWRyYXRpb25BcmdzKSA9PiB7XHJcbiAgY29uc3QgaHlkcmF0ZUZyb21BcGkgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XHJcbiAgICBpZiAoIWFjdGl2aWRhZElkKSByZXR1cm47XHJcbiAgICBzZXRJc0h5ZHJhdGluZyh0cnVlKTtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoSnNvbjxBY3Rpdml0eURldGFpbFJlc3BvbnNlPihgL1Zpc2l0YXMvR2V0QWN0aXZpdHlCeUNvZGU/Y29kZT0ke2VuY29kZVVSSUNvbXBvbmVudChhY3RpdmlkYWRJZCl9YCk7XHJcbiAgICAgIGNvbnN0IHJlc3BvbnNlRGF0YSA9IGdldFJlc3BvbnNlRGF0YShyZXMpO1xyXG5cclxuICAgICAgaWYgKCFpc1Jlc3BvbnNlU3VjY2VzcyhyZXMpIHx8ICFyZXNwb25zZURhdGEpIHtcclxuICAgICAgICBzZXRTdGF0dXMoZ2V0UmVzcG9uc2VNZXNzYWdlKHJlcykgfHwgaW5kVChcIlZpc2l0c19EZXRhaWxfTG9hZEFjdGl2aXR5RmFpbGVkXCIsIFwiRmFpbGVkIHRvIGxvYWQgYWN0aXZpdHkgZGV0YWlscy5cIikpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgcmF3RGF0ZSA9IFN0cmluZyhyZXNwb25zZURhdGEudHJhbnNEYXRlID8/IHJlc3BvbnNlRGF0YS5UcmFuc0RhdGUgPz8gXCJcIik7XHJcbiAgICAgIHNldFRyYW5zRGF0ZShub3JtYWxpemVEYXRlVG9JbnB1dChyYXdEYXRlKSk7XHJcblxyXG4gICAgICBjb25zdCByYXdWaXNpdFR5cGUgPSBTdHJpbmcoXHJcbiAgICAgICAgcmVzcG9uc2VEYXRhLnRpcG9WaXNpdGEgPz8gcmVzcG9uc2VEYXRhLlRpcG9WaXNpdGEgPz8gcmVzcG9uc2VEYXRhLnZpc2l0VHlwZSA/PyByZXNwb25zZURhdGEuVmlzaXRUeXBlID8/IFwiXCJcclxuICAgICAgKTtcclxuICAgICAgc2V0VmlzaXRUeXBlKG1hdGNoT3B0aW9uVmFsdWUodmlzaXRUeXBlcywgcmF3VmlzaXRUeXBlKSB8fCBkZWZhdWx0VmlzaXRUeXBlKTtcclxuXHJcbiAgICAgIGNvbnN0IHJhd0NvbnRhY3RNZXRob2QgPSBTdHJpbmcoXHJcbiAgICAgICAgcmVzcG9uc2VEYXRhLmNvbnRhY3RNZXRob2QgPz8gcmVzcG9uc2VEYXRhLkNvbnRhY3RNZXRob2QgPz8gXCJcIlxyXG4gICAgICApO1xyXG4gICAgICBzZXRDb250YWN0TWV0aG9kKG1hdGNoT3B0aW9uVmFsdWUoY29udGFjdE1ldGhvZHMsIHJhd0NvbnRhY3RNZXRob2QpKTtcclxuXHJcbiAgICAgIGNvbnN0IGFzaXN0ZW50ZXNMaXN0ID0gcmVzcG9uc2VEYXRhLmFzaXN0ZW50ZXMgPz8gcmVzcG9uc2VEYXRhLkFzaXN0ZW50ZXM7XHJcbiAgICAgIGNvbnN0IGZpcnN0QXNpc3RlbnRlID0gQXJyYXkuaXNBcnJheShhc2lzdGVudGVzTGlzdCkgJiYgYXNpc3RlbnRlc0xpc3QubGVuZ3RoID8gYXNSZWNvcmQoYXNpc3RlbnRlc0xpc3RbMF0pIDogbnVsbDtcclxuICAgICAgY29uc3QgcmF3QXNpc3RlbnRlVGlwbyA9IFN0cmluZyhcclxuICAgICAgICByZXNwb25zZURhdGEuYXNpc3RlbnRlVGlwbyA/P1xyXG4gICAgICAgICAgcmVzcG9uc2VEYXRhLkFzaXN0ZW50ZVRpcG8gPz9cclxuICAgICAgICAgIGZpcnN0QXNpc3RlbnRlPy5hc2lzdGVudGVUaXBvID8/XHJcbiAgICAgICAgICBmaXJzdEFzaXN0ZW50ZT8uQXNpc3RlbnRlVGlwbyA/P1xyXG4gICAgICAgICAgXCJcIlxyXG4gICAgICApO1xyXG4gICAgICBjb25zdCBub3JtYWxpemVkQXNpc3RlbnRlVGlwbyA9IG1hdGNoT3B0aW9uVmFsdWUoYXNpc3RlbnRlVGlwb3MsIHJhd0FzaXN0ZW50ZVRpcG8pO1xyXG4gICAgICBzZXRBc2lzdGVudGVUaXBvKG5vcm1hbGl6ZWRBc2lzdGVudGVUaXBvIHx8IGluaXRpYWxBc2lzdGVudGUpO1xyXG4gICAgICBzZXREZXNjcmlwdGlvbihTdHJpbmcocmVzcG9uc2VEYXRhLmRlc2NyaXB0aW9uID8/IHJlc3BvbnNlRGF0YS5EZXNjcmlwdGlvbiA/PyBcIlwiKSk7XHJcbiAgICAgIHNldENvbWVudGFyaW9zKFN0cmluZyhyZXNwb25zZURhdGEuY29tZW50YXJpb3MgPz8gcmVzcG9uc2VEYXRhLkNvbWVudGFyaW9zID8/IFwiXCIpKTtcclxuICAgICAgc2V0QW50ZWNlZGVudGVzKFN0cmluZyhyZXNwb25zZURhdGEuYW50ZWNlZGVudGVzID8/IHJlc3BvbnNlRGF0YS5BbnRlY2VkZW50ZXMgPz8gXCJcIikpO1xyXG4gICAgICBzZXRDb25jbHVzaW9uZXMoU3RyaW5nKHJlc3BvbnNlRGF0YS5jb25jbHVzaW9uZXMgPz8gcmVzcG9uc2VEYXRhLkNvbmNsdXNpb25lcyA/PyBcIlwiKSk7XHJcbiAgICB9IGNhdGNoIHtcclxuICAgICAgLy8gS2VlcCBwcmV2aW91cyBVSSBiZWhhdmlvciBvbiBoeWRyYXRpb24gZXJyb3JzLlxyXG4gICAgfSBmaW5hbGx5IHtcclxuICAgICAgc2V0SXNIeWRyYXRpbmcoZmFsc2UpO1xyXG4gICAgICBhcHBseURyYWZ0VmFsdWVzKCk7XHJcbiAgICAgIGFwcGx5VGV4dEVkaXRvclZhbHVlcygpO1xyXG4gICAgfVxyXG4gIH0sIFtcclxuICAgIGFjdGl2aWRhZElkLFxyXG4gICAgYXBwbHlEcmFmdFZhbHVlcyxcclxuICAgIGFwcGx5VGV4dEVkaXRvclZhbHVlcyxcclxuICAgIGFzaXN0ZW50ZVRpcG9zLFxyXG4gICAgY29udGFjdE1ldGhvZHMsXHJcbiAgICBkZWZhdWx0VmlzaXRUeXBlLFxyXG4gICAgaW5pdGlhbEFzaXN0ZW50ZSxcclxuICAgIG1hdGNoT3B0aW9uVmFsdWUsXHJcbiAgICBub3JtYWxpemVEYXRlVG9JbnB1dCxcclxuICAgIHNldEFudGVjZWRlbnRlcyxcclxuICAgIHNldEFzaXN0ZW50ZVRpcG8sXHJcbiAgICBzZXRDb21lbnRhcmlvcyxcclxuICAgIHNldENvbmNsdXNpb25lcyxcclxuICAgIHNldERlc2NyaXB0aW9uLFxyXG4gICAgc2V0SXNIeWRyYXRpbmcsXHJcbiAgICBzZXRTdGF0dXMsXHJcbiAgICBzZXRUcmFuc0RhdGUsXHJcbiAgICBzZXRWaXNpdFR5cGUsXHJcbiAgICBzZXRDb250YWN0TWV0aG9kLFxyXG4gICAgdmlzaXRUeXBlcyxcclxuICBdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmIChzaG91bGRIeWRyYXRlKSB7XHJcbiAgICAgIGh5ZHJhdGVGcm9tQXBpKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGFwcGx5RHJhZnRWYWx1ZXMoKTtcclxuICAgIGFwcGx5VGV4dEVkaXRvclZhbHVlcygpO1xyXG4gIH0sIFthcHBseURyYWZ0VmFsdWVzLCBhcHBseVRleHRFZGl0b3JWYWx1ZXMsIGh5ZHJhdGVGcm9tQXBpLCBzaG91bGRIeWRyYXRlXSk7XHJcbn07XHJcbiIsICJpbXBvcnQgeyB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgd2FpdCB9IGZyb20gXCIuLi91dGlscy93YWl0LnRzXCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgeyBzZXRIaXN0b3J5RmlsdGVyRm9yRGF0ZSwgZmxhc2hBY3Rpb25NYXJrIH0gZnJvbSBcIi4uL3V0aWxzL3Zpc2l0YXNIaXN0b3J5LnRzXCI7XHJcbmltcG9ydCB7IHNldFRvcGJhckFjdGlvbkdyb3VwUmVhZHkgfSBmcm9tIFwiLi4vdXRpbHMvdG9wYmFyQWN0aW9uVmlzaWJpbGl0eS50c1wiO1xyXG5cclxudHlwZSBVc2VEZXRhaWxUb3BiYXJBY3Rpb25zQXJncyA9IHtcclxuICBidXN5OiBib29sZWFuO1xyXG4gIG1vZGFsT3BlbjogYm9vbGVhbjtcclxuICBpc0VkaXRpbmc6IGJvb2xlYW47XHJcbiAgY2FuRWRpdEhpc3Rvcnk6IGJvb2xlYW47XHJcbiAgY2FuRGVsZXRlSGlzdG9yeTogYm9vbGVhbjtcclxuICB0cmFuc0RhdGU6IHN0cmluZztcclxuICBzZXRNb2RhbEVycm9yOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBoYW5kbGVFbmFibGVFZGl0OiAoKSA9PiB2b2lkO1xyXG4gIGhhbmRsZUNhbmNlbEVkaXQ6ICgpID0+IHZvaWQ7XHJcbiAgaGFuZGxlVXBkYXRlOiAoKSA9PiBQcm9taXNlPGJvb2xlYW4+O1xyXG4gIGhhbmRsZURlbGV0ZTogKCkgPT4gUHJvbWlzZTxib29sZWFuPjtcclxuICBvblBlcm1pc3Npb25CbG9ja2VkPzogKG9wZXJhdGlvbjogXCJlZGl0XCIgfCBcImRlbGV0ZVwiKSA9PiB2b2lkO1xyXG4gIGFjdGlvbkdyb3VwSWQ/OiBzdHJpbmc7XHJcbiAgcGVybWlzc2lvbnNSZWFkeT86IGJvb2xlYW47XHJcbiAgb3BlbkNvbmZpcm06IChvcHRzOiB7XHJcbiAgICB0aXRsZTogc3RyaW5nO1xyXG4gICAgbWVzc2FnZTogc3RyaW5nO1xyXG4gICAgY29uZmlybVRleHQ/OiBzdHJpbmc7XHJcbiAgICBvbkNvbmZpcm0/OiAoKSA9PiBQcm9taXNlPGJvb2xlYW4gfCB2b2lkPiB8IGJvb2xlYW4gfCB2b2lkO1xyXG4gIH0pID0+IHZvaWQ7XHJcbiAgY2xvc2VDb25maXJtOiAoKSA9PiB2b2lkO1xyXG59O1xyXG5cclxuLy8gQ29vcmRpbmF0ZXMgdG9wYmFyIGljb24gdmlzaWJpbGl0eSBhbmQgYWN0aW9uIGV2ZW50cyBmb3IgZGV0YWlsIHBhZ2UuXHJcbmV4cG9ydCBjb25zdCB1c2VEZXRhaWxUb3BiYXJBY3Rpb25zID0gKHtcclxuICBidXN5LFxyXG4gIG1vZGFsT3BlbixcclxuICBpc0VkaXRpbmcsXHJcbiAgY2FuRWRpdEhpc3RvcnksXHJcbiAgY2FuRGVsZXRlSGlzdG9yeSxcclxuICB0cmFuc0RhdGUsXHJcbiAgc2V0TW9kYWxFcnJvcixcclxuICBoYW5kbGVFbmFibGVFZGl0LFxyXG4gIGhhbmRsZUNhbmNlbEVkaXQsXHJcbiAgaGFuZGxlVXBkYXRlLFxyXG4gIGhhbmRsZURlbGV0ZSxcclxuICBvblBlcm1pc3Npb25CbG9ja2VkLFxyXG4gIGFjdGlvbkdyb3VwSWQgPSBcInZpc2l0LWRldGFpbC1hY3Rpb25zXCIsXHJcbiAgcGVybWlzc2lvbnNSZWFkeSA9IHRydWUsXHJcbiAgb3BlbkNvbmZpcm0sXHJcbiAgY2xvc2VDb25maXJtLFxyXG59OiBVc2VEZXRhaWxUb3BiYXJBY3Rpb25zQXJncykgPT4ge1xyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIXBlcm1pc3Npb25zUmVhZHkpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBlZGl0SWNvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlzaXRFZGl0SWNvblwiKTtcclxuICAgIGNvbnN0IHNhdmVJY29uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2aXNpdFNhdmVJY29uXCIpO1xyXG4gICAgY29uc3QgZGVsZXRlQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2aXNpdERlbGV0ZUJ0blwiKTtcclxuICAgIGNvbnN0IGNhbmNlbEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlzaXRDYW5jZWxCdG5cIik7XHJcbiAgICBjb25zdCBlZGl0QnRuID0gZWRpdEljb24/LmNsb3Nlc3QoXCJidXR0b25cIikgPz8gbnVsbDtcclxuICAgIGlmIChpc0VkaXRpbmcpIHtcclxuICAgICAgaWYgKGVkaXRCdG4pIGVkaXRCdG4uY2xhc3NMaXN0LnRvZ2dsZShcInRvcGJhci1oaWRkZW5cIiwgIWNhbkVkaXRIaXN0b3J5KTtcclxuICAgICAgaWYgKGVkaXRJY29uKSBlZGl0SWNvbi5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xyXG4gICAgICBpZiAoc2F2ZUljb24pIHNhdmVJY29uLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XHJcbiAgICAgIGlmIChkZWxldGVCdG4pIGRlbGV0ZUJ0bi5jbGFzc0xpc3QuYWRkKFwidG9wYmFyLWhpZGRlblwiKTtcclxuICAgICAgaWYgKGNhbmNlbEJ0bikgY2FuY2VsQnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJ0b3BiYXItaGlkZGVuXCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKGVkaXRCdG4pIGVkaXRCdG4uY2xhc3NMaXN0LnRvZ2dsZShcInRvcGJhci1oaWRkZW5cIiwgIWNhbkVkaXRIaXN0b3J5KTtcclxuICAgICAgaWYgKGVkaXRJY29uKSBlZGl0SWNvbi5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xyXG4gICAgICBpZiAoc2F2ZUljb24pIHNhdmVJY29uLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XHJcbiAgICAgIGlmIChkZWxldGVCdG4pIGRlbGV0ZUJ0bi5jbGFzc0xpc3QudG9nZ2xlKFwidG9wYmFyLWhpZGRlblwiLCAhY2FuRGVsZXRlSGlzdG9yeSk7XHJcbiAgICAgIGlmIChjYW5jZWxCdG4pIGNhbmNlbEJ0bi5jbGFzc0xpc3QuYWRkKFwidG9wYmFyLWhpZGRlblwiKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRUb3BiYXJBY3Rpb25Hcm91cFJlYWR5KGFjdGlvbkdyb3VwSWQpO1xyXG4gIH0sIFthY3Rpb25Hcm91cElkLCBjYW5EZWxldGVIaXN0b3J5LCBjYW5FZGl0SGlzdG9yeSwgaXNFZGl0aW5nLCBwZXJtaXNzaW9uc1JlYWR5XSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIXBlcm1pc3Npb25zUmVhZHkpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBvbkVkaXQgPSAoKSA9PiB7XHJcbiAgICAgIGlmICghY2FuRWRpdEhpc3RvcnkpIHtcclxuICAgICAgICBvblBlcm1pc3Npb25CbG9ja2VkPy4oXCJlZGl0XCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBpZiAoaXNFZGl0aW5nKSB7XHJcbiAgICAgICAgaWYgKGJ1c3kgfHwgbW9kYWxPcGVuKSByZXR1cm47XHJcbiAgICAgICAgc2V0TW9kYWxFcnJvcihcIlwiKTtcclxuICAgICAgICBvcGVuQ29uZmlybSh7XHJcbiAgICAgICAgICB0aXRsZTogaW5kVChcIlZpc2l0c19EZXRhaWxfU2F2ZUNoYW5nZXNfVGl0bGVcIiwgXCJWaXNpdHNfRGV0YWlsX1NhdmVDaGFuZ2VzX1RpdGxlXCIpLFxyXG4gICAgICAgICAgbWVzc2FnZTogaW5kVChcIlZpc2l0c19EZXRhaWxfU2F2ZUNoYW5nZXNfQm9keVwiLCBcIlZpc2l0c19EZXRhaWxfU2F2ZUNoYW5nZXNfQm9keVwiKSxcclxuICAgICAgICAgIGNvbmZpcm1UZXh0OiBpbmRUKFwiQ29tbW9uX1NhdmVcIiwgXCJDb21tb25fU2F2ZVwiKSxcclxuICAgICAgICAgIG9uQ29uZmlybTogYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBvayA9IGF3YWl0IGhhbmRsZVVwZGF0ZSgpO1xyXG4gICAgICAgICAgICBpZiAob2spIHtcclxuICAgICAgICAgICAgICBjbG9zZUNvbmZpcm0oKTtcclxuICAgICAgICAgICAgICBzZXRIaXN0b3J5RmlsdGVyRm9yRGF0ZSh0cmFuc0RhdGUpO1xyXG4gICAgICAgICAgICAgIGF3YWl0IHdhaXQoMjAwKTtcclxuICAgICAgICAgICAgICBmbGFzaEFjdGlvbk1hcmsoXCJva1Byb2Nlc3NcIiwgMTIwMCk7XHJcbiAgICAgICAgICAgICAgYXdhaXQgd2FpdCgxMjAwKTtcclxuICAgICAgICAgICAgICB3aW5kb3cuX19pbmRCeXBhc3NOYXZpZ2F0aW9uR3VhcmRPbmNlPy4oKTtcclxuICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL0hpc3RvcmlhbC9IaXN0b3J5XCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG9rO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBoYW5kbGVFbmFibGVFZGl0KCk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgY29uc3Qgb25EZWxldGUgPSAoKSA9PiB7XHJcbiAgICAgIGlmICghY2FuRGVsZXRlSGlzdG9yeSkge1xyXG4gICAgICAgIG9uUGVybWlzc2lvbkJsb2NrZWQ/LihcImRlbGV0ZVwiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGJ1c3kgfHwgbW9kYWxPcGVuKSByZXR1cm47XHJcbiAgICAgIHNldE1vZGFsRXJyb3IoXCJcIik7XHJcbiAgICAgIG9wZW5Db25maXJtKHtcclxuICAgICAgICB0aXRsZTogaW5kVChcIlZpc2l0c19EZXRhaWxfRGVsZXRlQWN0aXZpdHlfVGl0bGVcIiwgXCJWaXNpdHNfRGV0YWlsX0RlbGV0ZUFjdGl2aXR5X1RpdGxlXCIpLFxyXG4gICAgICAgIG1lc3NhZ2U6IGluZFQoXCJWaXNpdHNfRGV0YWlsX0RlbGV0ZUFjdGl2aXR5X0JvZHlcIiwgXCJWaXNpdHNfRGV0YWlsX0RlbGV0ZUFjdGl2aXR5X0JvZHlcIiksXHJcbiAgICAgICAgY29uZmlybVRleHQ6IGluZFQoXCJDb21tb25fRGVsZXRlXCIsIFwiQ29tbW9uX0RlbGV0ZVwiKSxcclxuICAgICAgICBvbkNvbmZpcm06IGFzeW5jICgpID0+IHtcclxuICAgICAgICAgIGNvbnN0IG9rID0gYXdhaXQgaGFuZGxlRGVsZXRlKCk7XHJcbiAgICAgICAgICBpZiAob2spIHtcclxuICAgICAgICAgICAgY2xvc2VDb25maXJtKCk7XHJcbiAgICAgICAgICAgIHNldEhpc3RvcnlGaWx0ZXJGb3JEYXRlKHRyYW5zRGF0ZSk7XHJcbiAgICAgICAgICAgIGF3YWl0IHdhaXQoMjAwKTtcclxuICAgICAgICAgICAgZmxhc2hBY3Rpb25NYXJrKFwib2tEZWxQcm9jZXNzXCIsIDEyMDApO1xyXG4gICAgICAgICAgICBhd2FpdCB3YWl0KDEyMDApO1xyXG4gICAgICAgICAgICB3aW5kb3cuX19pbmRCeXBhc3NOYXZpZ2F0aW9uR3VhcmRPbmNlPy4oKTtcclxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9IaXN0b3JpYWwvSGlzdG9yeVwiO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIG9rO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBvbkNhbmNlbEVkaXQgPSAoKSA9PiB7XHJcbiAgICAgIGlmIChidXN5IHx8IG1vZGFsT3BlbikgcmV0dXJuO1xyXG4gICAgICBoYW5kbGVDYW5jZWxFZGl0KCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwidmlzaXQtZWRpdFwiLCBvbkVkaXQpO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJ2aXNpdC1kZWxldGVcIiwgb25EZWxldGUpO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJ2aXNpdC1jYW5jZWwtZWRpdFwiLCBvbkNhbmNlbEVkaXQpO1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ2aXNpdC1lZGl0XCIsIG9uRWRpdCk7XHJcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwidmlzaXQtZGVsZXRlXCIsIG9uRGVsZXRlKTtcclxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ2aXNpdC1jYW5jZWwtZWRpdFwiLCBvbkNhbmNlbEVkaXQpO1xyXG4gICAgfTtcclxuICB9LCBbXHJcbiAgICBidXN5LFxyXG4gICAgY2FuRGVsZXRlSGlzdG9yeSxcclxuICAgIGNhbkVkaXRIaXN0b3J5LFxyXG4gICAgY2xvc2VDb25maXJtLFxyXG4gICAgaGFuZGxlQ2FuY2VsRWRpdCxcclxuICAgIGhhbmRsZURlbGV0ZSxcclxuICAgIGhhbmRsZUVuYWJsZUVkaXQsXHJcbiAgICBoYW5kbGVVcGRhdGUsXHJcbiAgICBvblBlcm1pc3Npb25CbG9ja2VkLFxyXG4gICAgaXNFZGl0aW5nLFxyXG4gICAgbW9kYWxPcGVuLFxyXG4gICAgb3BlbkNvbmZpcm0sXHJcbiAgICBwZXJtaXNzaW9uc1JlYWR5LFxyXG4gICAgc2V0TW9kYWxFcnJvcixcclxuICAgIHRyYW5zRGF0ZSxcclxuICBdKTtcclxufTtcclxuIiwgIlx1RkVGRmltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VSZWYgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgZ2V0U2Vzc2lvblZhbHVlV2l0aEV4cGlyeSwgcmVtb3ZlU2Vzc2lvblZhbHVlV2l0aEV4cGlyeSwgc2V0U2Vzc2lvblZhbHVlV2l0aEV4cGlyeSB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9zZXNzaW9uRXhwaXJ5LnRzXCI7XHJcblxyXG5jb25zdCBFRElUX01PREVfVFRMX01TID0gNiAqIDYwICogNjAgKiAxMDAwO1xyXG5jb25zdCBERVRBSUxfRFJBRlRfVFRMX01TID0gMjQgKiA2MCAqIDYwICogMTAwMDtcclxuXHJcbnR5cGUgVXNlRGV0YWlsRWRpdFNlc3Npb25BcmdzID0ge1xyXG4gIGFjdGl2aWRhZElkOiBzdHJpbmc7XHJcbiAgcmVjSWQ6IHN0cmluZztcclxuICBjYW5FZGl0SGlzdG9yeTogYm9vbGVhbjtcclxuICBpc0VkaXRpbmc6IGJvb2xlYW47XHJcbiAgc2V0SXNFZGl0aW5nOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxib29sZWFuPj47XHJcbiAgdHJhbnNEYXRlOiBzdHJpbmc7XHJcbiAgdmlzaXRUeXBlOiBzdHJpbmc7XHJcbiAgY29udGFjdE1ldGhvZDogc3RyaW5nO1xyXG4gIGFzaXN0ZW50ZVRpcG86IHN0cmluZztcclxuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xyXG4gIGNvbWVudGFyaW9zOiBzdHJpbmc7XHJcbiAgYW50ZWNlZGVudGVzOiBzdHJpbmc7XHJcbiAgY29uY2x1c2lvbmVzOiBzdHJpbmc7XHJcbiAgc2V0VHJhbnNEYXRlOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcclxuICBzZXRWaXNpdFR5cGU6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPHN0cmluZz4+O1xyXG4gIHNldENvbnRhY3RNZXRob2Q6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPHN0cmluZz4+O1xyXG4gIHNldEFzaXN0ZW50ZVRpcG86IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPHN0cmluZz4+O1xyXG4gIHNldERlc2NyaXB0aW9uOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcclxuICBzZXRDb21lbnRhcmlvczogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XHJcbiAgc2V0QW50ZWNlZGVudGVzOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcclxuICBzZXRDb25jbHVzaW9uZXM6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPHN0cmluZz4+O1xyXG59O1xyXG5cclxudHlwZSBEZXRhaWxEcmFmdFZhbHVlcyA9IHtcclxuICB0cmFuc0RhdGU6IHN0cmluZztcclxuICB2aXNpdFR5cGU6IHN0cmluZztcclxuICBjb250YWN0TWV0aG9kOiBzdHJpbmc7XHJcbiAgYXNpc3RlbnRlVGlwbzogc3RyaW5nO1xyXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgY29tZW50YXJpb3M6IHN0cmluZztcclxuICBhbnRlY2VkZW50ZXM6IHN0cmluZztcclxuICBjb25jbHVzaW9uZXM6IHN0cmluZztcclxufTtcclxuXHJcbi8vIE1hbmFnZXMgZWRpdC1tb2RlIHNlc3Npb24gZmxhZ3MgYW5kIGRldGFpbCBkcmFmdCBwZXJzaXN0ZW5jZS5cclxuZXhwb3J0IGNvbnN0IHVzZURldGFpbEVkaXRTZXNzaW9uID0gKHtcclxuICBhY3RpdmlkYWRJZCxcclxuICByZWNJZCxcclxuICBjYW5FZGl0SGlzdG9yeSxcclxuICBpc0VkaXRpbmcsXHJcbiAgc2V0SXNFZGl0aW5nLFxyXG4gIHRyYW5zRGF0ZSxcclxuICB2aXNpdFR5cGUsXHJcbiAgY29udGFjdE1ldGhvZCxcclxuICBhc2lzdGVudGVUaXBvLFxyXG4gIGRlc2NyaXB0aW9uLFxyXG4gIGNvbWVudGFyaW9zLFxyXG4gIGFudGVjZWRlbnRlcyxcclxuICBjb25jbHVzaW9uZXMsXHJcbiAgc2V0VHJhbnNEYXRlLFxyXG4gIHNldFZpc2l0VHlwZSxcclxuICBzZXRDb250YWN0TWV0aG9kLFxyXG4gIHNldEFzaXN0ZW50ZVRpcG8sXHJcbiAgc2V0RGVzY3JpcHRpb24sXHJcbiAgc2V0Q29tZW50YXJpb3MsXHJcbiAgc2V0QW50ZWNlZGVudGVzLFxyXG4gIHNldENvbmNsdXNpb25lcyxcclxufTogVXNlRGV0YWlsRWRpdFNlc3Npb25BcmdzKSA9PiB7XHJcbiAgY29uc3QgZWRpdE1vZGVLZXlSZWYgPSB1c2VSZWYoXCJcIik7XHJcbiAgY29uc3QgZHJhZnRLZXlSZWYgPSB1c2VSZWYoXCJcIik7XHJcbiAgY29uc3QgZHJhZnRQZXJzaXN0VGltZXJSZWYgPSB1c2VSZWY8bnVtYmVyIHwgbnVsbD4obnVsbCk7XHJcblxyXG4gIC8vIFBlcnNpc3QgZWRpdCBtb2RlIHdoaWxlIHVzZXIgbmF2aWdhdGVzIHRvIHRoZSB0ZXh0IGVkaXRvciBhbmQgYmFjay5cclxuICBjb25zdCBzeW5jRWRpdE1vZGVGbGFnID0gdXNlQ2FsbGJhY2soKGVuYWJsZWQ6IGJvb2xlYW4pID0+IHtcclxuICAgIGNvbnN0IGtleSA9IGVkaXRNb2RlS2V5UmVmLmN1cnJlbnQ7XHJcbiAgICBpZiAoIWtleSkgcmV0dXJuO1xyXG4gICAgaWYgKGVuYWJsZWQpIHtcclxuICAgICAgc2V0U2Vzc2lvblZhbHVlV2l0aEV4cGlyeShrZXksIFwidHJ1ZVwiLCBFRElUX01PREVfVFRMX01TKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgcmVtb3ZlU2Vzc2lvblZhbHVlV2l0aEV4cGlyeShrZXkpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3Qgc3luY0VkaXRNb2RlT25FbnRyeSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGNvbnN0IGJhc2VJZCA9IGFjdGl2aWRhZElkIHx8IHJlY0lkIHx8IFwiZGVmYXVsdFwiO1xyXG4gICAgY29uc3Qga2V5ID0gYGluZF92aXNpdF9lZGl0XyR7YmFzZUlkfWA7XHJcbiAgICBjb25zdCByZXR1cm5LZXkgPSBgJHtrZXl9X3JldHVybmA7XHJcbiAgICBjb25zdCBkcmFmdEtleSA9IGBpbmRfdmlzaXRfZHJhZnRfJHtiYXNlSWR9YDtcclxuICAgIGVkaXRNb2RlS2V5UmVmLmN1cnJlbnQgPSBrZXk7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgYWxsb3dSZXN0b3JlID0gZ2V0U2Vzc2lvblZhbHVlV2l0aEV4cGlyeShyZXR1cm5LZXkpID09PSBcIjFcIjtcclxuICAgICAgaWYgKGFsbG93UmVzdG9yZSkge1xyXG4gICAgICAgIHJlbW92ZVNlc3Npb25WYWx1ZVdpdGhFeHBpcnkocmV0dXJuS2V5KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGNhbkVkaXRIaXN0b3J5ICYmIGFsbG93UmVzdG9yZSAmJiBnZXRTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KGtleSkgPT09IFwidHJ1ZVwiKSB7XHJcbiAgICAgICAgc2V0SXNFZGl0aW5nKHRydWUpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNldElzRWRpdGluZyhmYWxzZSk7XHJcbiAgICAgICAgcmVtb3ZlU2Vzc2lvblZhbHVlV2l0aEV4cGlyeShrZXkpO1xyXG4gICAgICAgIHJlbW92ZVNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoZHJhZnRLZXkpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIWNhbkVkaXRIaXN0b3J5KSB7XHJcbiAgICAgICAgcmVtb3ZlU2Vzc2lvblZhbHVlV2l0aEV4cGlyeShrZXkpO1xyXG4gICAgICAgIHJlbW92ZVNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoZHJhZnRLZXkpO1xyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIHtcclxuICAgICAgLyogaWdub3JlICovXHJcbiAgICB9XHJcbiAgfSwgW2FjdGl2aWRhZElkLCBjYW5FZGl0SGlzdG9yeSwgcmVjSWQsIHNldElzRWRpdGluZ10pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgc3luY0VkaXRNb2RlT25FbnRyeSgpO1xyXG4gIH0sIFtzeW5jRWRpdE1vZGVPbkVudHJ5XSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBvblBhZ2VTaG93ID0gKGV2ZW50OiBQYWdlVHJhbnNpdGlvbkV2ZW50KSA9PiB7XHJcbiAgICAgIGNvbnN0IG5hdkVudHJ5ID0gdHlwZW9mIHBlcmZvcm1hbmNlICE9PSBcInVuZGVmaW5lZFwiICYmIHBlcmZvcm1hbmNlLmdldEVudHJpZXNCeVR5cGVcclxuICAgICAgICA/IChwZXJmb3JtYW5jZS5nZXRFbnRyaWVzQnlUeXBlKFwibmF2aWdhdGlvblwiKVswXSBhcyBQZXJmb3JtYW5jZU5hdmlnYXRpb25UaW1pbmcgfCB1bmRlZmluZWQpXHJcbiAgICAgICAgOiB1bmRlZmluZWQ7XHJcbiAgICAgIGNvbnN0IGlzQmFja0ZvcndhcmQgPSBuYXZFbnRyeT8udHlwZSA9PT0gXCJiYWNrX2ZvcndhcmRcIjtcclxuICAgICAgaWYgKGV2ZW50Py5wZXJzaXN0ZWQgfHwgaXNCYWNrRm9yd2FyZCkge1xyXG4gICAgICAgIHN5bmNFZGl0TW9kZU9uRW50cnkoKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInBhZ2VzaG93XCIsIG9uUGFnZVNob3cpO1xyXG4gICAgcmV0dXJuICgpID0+IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicGFnZXNob3dcIiwgb25QYWdlU2hvdyk7XHJcbiAgfSwgW3N5bmNFZGl0TW9kZU9uRW50cnldKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IGtleSA9IGBpbmRfdmlzaXRfZHJhZnRfJHthY3RpdmlkYWRJZCB8fCByZWNJZCB8fCBcImRlZmF1bHRcIn1gO1xyXG4gICAgZHJhZnRLZXlSZWYuY3VycmVudCA9IGtleTtcclxuICB9LCBbYWN0aXZpZGFkSWQsIHJlY0lkXSk7XHJcblxyXG4gIGNvbnN0IHNhdmVEcmFmdCA9IHVzZUNhbGxiYWNrKChkcmFmdDogRGV0YWlsRHJhZnRWYWx1ZXMpID0+IHtcclxuICAgIGNvbnN0IGtleSA9IGRyYWZ0S2V5UmVmLmN1cnJlbnQ7XHJcbiAgICBpZiAoIWtleSkgcmV0dXJuO1xyXG4gICAgc2V0U2Vzc2lvblZhbHVlV2l0aEV4cGlyeShrZXksIEpTT04uc3RyaW5naWZ5KGRyYWZ0KSwgREVUQUlMX0RSQUZUX1RUTF9NUyk7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBjbGVhckRyYWZ0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgY29uc3Qga2V5ID0gZHJhZnRLZXlSZWYuY3VycmVudDtcclxuICAgIGlmICgha2V5KSByZXR1cm47XHJcbiAgICByZW1vdmVTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KGtleSk7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBhcHBseURyYWZ0VmFsdWVzID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgY29uc3Qga2V5ID0gZHJhZnRLZXlSZWYuY3VycmVudDtcclxuICAgIGlmICgha2V5KSByZXR1cm47XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcmF3ID0gZ2V0U2Vzc2lvblZhbHVlV2l0aEV4cGlyeShrZXkpO1xyXG4gICAgICBpZiAoIXJhdykgcmV0dXJuO1xyXG4gICAgICBjb25zdCBkcmFmdCA9IEpTT04ucGFyc2UocmF3KSBhcyBQYXJ0aWFsPERldGFpbERyYWZ0VmFsdWVzPjtcclxuICAgICAgaWYgKCFkcmFmdCB8fCB0eXBlb2YgZHJhZnQgIT09IFwib2JqZWN0XCIpIHJldHVybjtcclxuXHJcbiAgICAgIGlmIChkcmFmdC50cmFuc0RhdGUgIT09IHVuZGVmaW5lZCkgc2V0VHJhbnNEYXRlKFN0cmluZyhkcmFmdC50cmFuc0RhdGUpKTtcclxuICAgICAgaWYgKGRyYWZ0LnZpc2l0VHlwZSAhPT0gdW5kZWZpbmVkKSBzZXRWaXNpdFR5cGUoU3RyaW5nKGRyYWZ0LnZpc2l0VHlwZSkpO1xyXG4gICAgICBpZiAoZHJhZnQuY29udGFjdE1ldGhvZCAhPT0gdW5kZWZpbmVkKSBzZXRDb250YWN0TWV0aG9kKFN0cmluZyhkcmFmdC5jb250YWN0TWV0aG9kKSk7XHJcbiAgICAgIGlmIChkcmFmdC5hc2lzdGVudGVUaXBvICE9PSB1bmRlZmluZWQpIHNldEFzaXN0ZW50ZVRpcG8oU3RyaW5nKGRyYWZ0LmFzaXN0ZW50ZVRpcG8pKTtcclxuICAgICAgaWYgKGRyYWZ0LmRlc2NyaXB0aW9uICE9PSB1bmRlZmluZWQpIHNldERlc2NyaXB0aW9uKFN0cmluZyhkcmFmdC5kZXNjcmlwdGlvbikpO1xyXG4gICAgICBpZiAoZHJhZnQuY29tZW50YXJpb3MgIT09IHVuZGVmaW5lZCkgc2V0Q29tZW50YXJpb3MoU3RyaW5nKGRyYWZ0LmNvbWVudGFyaW9zKSk7XHJcbiAgICAgIGlmIChkcmFmdC5hbnRlY2VkZW50ZXMgIT09IHVuZGVmaW5lZCkgc2V0QW50ZWNlZGVudGVzKFN0cmluZyhkcmFmdC5hbnRlY2VkZW50ZXMpKTtcclxuICAgICAgaWYgKGRyYWZ0LmNvbmNsdXNpb25lcyAhPT0gdW5kZWZpbmVkKSBzZXRDb25jbHVzaW9uZXMoU3RyaW5nKGRyYWZ0LmNvbmNsdXNpb25lcykpO1xyXG4gICAgfSBjYXRjaCB7XHJcbiAgICAgIC8qIGlnbm9yZSAqL1xyXG4gICAgfVxyXG4gIH0sIFtzZXRBbnRlY2VkZW50ZXMsIHNldEFzaXN0ZW50ZVRpcG8sIHNldENvbWVudGFyaW9zLCBzZXRDb25jbHVzaW9uZXMsIHNldENvbnRhY3RNZXRob2QsIHNldERlc2NyaXB0aW9uLCBzZXRUcmFuc0RhdGUsIHNldFZpc2l0VHlwZV0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFpc0VkaXRpbmcpIHtcclxuICAgICAgaWYgKGRyYWZ0UGVyc2lzdFRpbWVyUmVmLmN1cnJlbnQpIHtcclxuICAgICAgICBjbGVhclRpbWVvdXQoZHJhZnRQZXJzaXN0VGltZXJSZWYuY3VycmVudCk7XHJcbiAgICAgICAgZHJhZnRQZXJzaXN0VGltZXJSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChkcmFmdFBlcnNpc3RUaW1lclJlZi5jdXJyZW50KSB7XHJcbiAgICAgIGNsZWFyVGltZW91dChkcmFmdFBlcnNpc3RUaW1lclJlZi5jdXJyZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBkcmFmdFBlcnNpc3RUaW1lclJlZi5jdXJyZW50ID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBkcmFmdFBlcnNpc3RUaW1lclJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgc2F2ZURyYWZ0KHtcclxuICAgICAgICB0cmFuc0RhdGUsXHJcbiAgICAgICAgdmlzaXRUeXBlLFxyXG4gICAgICAgIGNvbnRhY3RNZXRob2QsXHJcbiAgICAgICAgYXNpc3RlbnRlVGlwbyxcclxuICAgICAgICBkZXNjcmlwdGlvbixcclxuICAgICAgICBjb21lbnRhcmlvcyxcclxuICAgICAgICBhbnRlY2VkZW50ZXMsXHJcbiAgICAgICAgY29uY2x1c2lvbmVzLFxyXG4gICAgICB9KTtcclxuICAgIH0sIDE4MCk7XHJcblxyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgaWYgKGRyYWZ0UGVyc2lzdFRpbWVyUmVmLmN1cnJlbnQpIHtcclxuICAgICAgICBjbGVhclRpbWVvdXQoZHJhZnRQZXJzaXN0VGltZXJSZWYuY3VycmVudCk7XHJcbiAgICAgICAgZHJhZnRQZXJzaXN0VGltZXJSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfSwgW2FudGVjZWRlbnRlcywgYXNpc3RlbnRlVGlwbywgY29tZW50YXJpb3MsIGNvbmNsdXNpb25lcywgY29udGFjdE1ldGhvZCwgZGVzY3JpcHRpb24sIGlzRWRpdGluZywgc2F2ZURyYWZ0LCB0cmFuc0RhdGUsIHZpc2l0VHlwZV0pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgZWRpdE1vZGVLZXlSZWYsXHJcbiAgICBzeW5jRWRpdE1vZGVGbGFnLFxyXG4gICAgY2xlYXJEcmFmdCxcclxuICAgIGFwcGx5RHJhZnRWYWx1ZXMsXHJcbiAgfTtcclxufTtcclxuIiwgIlx1RkVGRmltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjayB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBmZXRjaEpzb24gfSBmcm9tIFwiLi4vLi4vLi4vc2VydmljZXMvYXBpU2VydmljZS50c1wiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHsgZmxhc2hBY3Rpb25NYXJrIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3Zpc2l0YXNIaXN0b3J5LnRzXCI7XHJcblxyXG50eXBlIE9wdGlvbkxpa2UgPSB7XHJcbiAgdmFsdWU/OiBzdHJpbmcgfCBudW1iZXI7XHJcbiAgVmFsdWU/OiBzdHJpbmcgfCBudW1iZXI7XHJcbiAgdGV4dD86IHN0cmluZztcclxuICBUZXh0Pzogc3RyaW5nO1xyXG59O1xyXG5cclxudHlwZSBWaXNpdENvbW1hbmRSZXNwb25zZSA9IHtcclxuICBzdWNjZXNzPzogYm9vbGVhbjtcclxuICBtZXNzYWdlPzogc3RyaW5nO1xyXG4gIFN1Y2Nlc3M/OiBib29sZWFuO1xyXG4gIE1lc3NhZ2U/OiBzdHJpbmc7XHJcbn07XHJcblxyXG5jb25zdCBpc0NvbW1hbmRTdWNjZXNzID0gKHJlc3BvbnNlOiBWaXNpdENvbW1hbmRSZXNwb25zZSk6IGJvb2xlYW4gPT4ge1xyXG4gIHJldHVybiByZXNwb25zZS5zdWNjZXNzID09PSB0cnVlIHx8IHJlc3BvbnNlLlN1Y2Nlc3MgPT09IHRydWU7XHJcbn07XHJcblxyXG5jb25zdCBnZXRDb21tYW5kTWVzc2FnZSA9IChyZXNwb25zZTogVmlzaXRDb21tYW5kUmVzcG9uc2UpOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IHJhdyA9IHJlc3BvbnNlLm1lc3NhZ2UgPz8gcmVzcG9uc2UuTWVzc2FnZTtcclxuICByZXR1cm4gdHlwZW9mIHJhdyA9PT0gXCJzdHJpbmdcIiA/IHJhdy50cmltKCkgOiBcIlwiO1xyXG59O1xyXG5cclxuLy8gQ29udmVydHMgc2VsZWN0IHZhbHVlcyB0byBudW1lcmljIGVudW0gcGF5bG9hZCB2YWx1ZXMuXHJcbmNvbnN0IHRvTnVsbGFibGVFbnVtTnVtYmVyID0gKHZhbHVlOiBzdHJpbmcpOiBudW1iZXIgfCBudWxsID0+IHtcclxuICBjb25zdCBwYXJzZWQgPSBOdW1iZXIodmFsdWUpO1xyXG4gIHJldHVybiBOdW1iZXIuaXNJbnRlZ2VyKHBhcnNlZCkgJiYgcGFyc2VkID49IDAgPyBwYXJzZWQgOiBudWxsO1xyXG59O1xyXG5cclxuLy8gS2VlcCByZWNJZCBhcyBhIG5vcm1hbGl6ZWQgc2lnbmVkIGludGVnZXIgc3RyaW5nIHRvIGF2b2lkIGxvbmcgcHJlY2lzaW9uIGxvc3MgaW4gSlMgbnVtYmVycy5cclxuY29uc3QgcmVzb2x2ZVNhZmVSZWNJZCA9IChyYXdSZWNJZDogc3RyaW5nKTogc3RyaW5nIHwgbnVsbCA9PiB7XHJcbiAgY29uc3Qgbm9ybWFsaXplZCA9IFN0cmluZyhyYXdSZWNJZCA/PyBcIlwiKS50cmltKCk7XHJcbiAgaWYgKCFub3JtYWxpemVkKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgaWYgKCEvXi0/XFxkKyQvLnRlc3Qobm9ybWFsaXplZCkpIHJldHVybiBudWxsO1xyXG5cclxuICBjb25zdCBhYnNvbHV0ZURpZ2l0cyA9IG5vcm1hbGl6ZWQuc3RhcnRzV2l0aChcIi1cIikgPyBub3JtYWxpemVkLnNsaWNlKDEpIDogbm9ybWFsaXplZDtcclxuICBpZiAoIWFic29sdXRlRGlnaXRzIHx8IC9eMCskLy50ZXN0KGFic29sdXRlRGlnaXRzKSkgcmV0dXJuIG51bGw7XHJcblxyXG4gIHJldHVybiBub3JtYWxpemVkO1xyXG59O1xyXG5cclxuY29uc3Qgc2hvdWxkTG9nUmVjSWRJbkRldiA9ICgpOiBib29sZWFuID0+IHtcclxuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhd2luZG93LmxvY2F0aW9uKSByZXR1cm4gZmFsc2U7XHJcbiAgY29uc3QgaG9zdCA9IFN0cmluZyh3aW5kb3cubG9jYXRpb24uaG9zdG5hbWUgfHwgXCJcIikudHJpbSgpLnRvTG93ZXJDYXNlKCk7XHJcbiAgcmV0dXJuIGhvc3QgPT09IFwibG9jYWxob3N0XCIgfHwgaG9zdCA9PT0gXCIxMjcuMC4wLjFcIiB8fCBob3N0LmVuZHNXaXRoKFwiLmxvY2FsXCIpO1xyXG59O1xyXG5cclxuY29uc3QgbG9nU2FmZVJlY0lkSW5EZXYgPSAob3BlcmF0aW9uOiBcInVwZGF0ZVwiIHwgXCJkZWxldGVcIiwgc2FmZVJlY0lkOiBzdHJpbmcpOiB2b2lkID0+IHtcclxuICBpZiAoIXNob3VsZExvZ1JlY0lkSW5EZXYoKSkgcmV0dXJuO1xyXG4gIGNvbnNvbGUuaW5mbyhgW3Zpc2l0YXMtZGV0YWlsXSAke29wZXJhdGlvbn0gcmVjSWRgLCBzYWZlUmVjSWQpO1xyXG59O1xyXG5cclxudHlwZSBVc2VEZXRhaWxNdXRhdGlvbnNBcmdzID0ge1xyXG4gIGJ1c3k6IGJvb2xlYW47XHJcbiAgaXNFZGl0aW5nOiBib29sZWFuO1xyXG4gIGNhbkVkaXRIaXN0b3J5OiBib29sZWFuO1xyXG4gIGNhbkRlbGV0ZUhpc3Rvcnk6IGJvb2xlYW47XHJcbiAgcmVjSWQ6IHN0cmluZztcclxuICBhY2NvdW50TnVtOiBzdHJpbmc7XHJcbiAgdHJhbnNEYXRlOiBzdHJpbmc7XHJcbiAgdmlzaXRUeXBlOiBzdHJpbmc7XHJcbiAgY29udGFjdE1ldGhvZDogc3RyaW5nO1xyXG4gIGFzaXN0ZW50ZVRpcG86IHN0cmluZztcclxuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xyXG4gIGNvbWVudGFyaW9zOiBzdHJpbmc7XHJcbiAgYW50ZWNlZGVudGVzOiBzdHJpbmc7XHJcbiAgY29uY2x1c2lvbmVzOiBzdHJpbmc7XHJcbiAgdmlzaXRUeXBlczogT3B0aW9uTGlrZVtdO1xyXG4gIGNvbnRhY3RNZXRob2RzOiBPcHRpb25MaWtlW107XHJcbiAgYXNpc3RlbnRlVGlwb3M6IE9wdGlvbkxpa2VbXTtcclxuICBkZWZhdWx0VmlzaXRUeXBlOiBzdHJpbmc7XHJcbiAgcmF3SW5pdGlhbFZpc2l0VHlwZTogc3RyaW5nO1xyXG4gIHJhd0luaXRpYWxDb250YWN0TWV0aG9kOiBzdHJpbmc7XHJcbiAgcmF3SW5pdGlhbEFzaXN0ZW50ZTogc3RyaW5nO1xyXG4gIG1hdGNoT3B0aW9uVmFsdWU6IChvcHRpb25zOiBPcHRpb25MaWtlW10sIHJhdzogdW5rbm93bikgPT4gc3RyaW5nO1xyXG4gIGNsZWFyRHJhZnQ6ICgpID0+IHZvaWQ7XHJcbiAgc3luY0VkaXRNb2RlRmxhZzogKGVuYWJsZWQ6IGJvb2xlYW4pID0+IHZvaWQ7XHJcbiAgb25QZXJtaXNzaW9uQmxvY2tlZD86IChvcGVyYXRpb246IFwidXBkYXRlXCIgfCBcImRlbGV0ZVwiKSA9PiB2b2lkO1xyXG4gIHNldE1vZGFsRXJyb3I6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPHN0cmluZz4+O1xyXG4gIHNldEJ1c3k6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPGJvb2xlYW4+PjtcclxuICBzZXRTdGF0dXM6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPHN0cmluZz4+O1xyXG4gIHNldElzRWRpdGluZzogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248Ym9vbGVhbj4+O1xyXG59O1xyXG5cclxuLy8gRW5jYXBzdWxhdGVzIHVwZGF0ZSBhbmQgZGVsZXRlIG11dGF0aW9ucyBmb3IgZGV0YWlsIGZvcm0gc3RhdGUuXHJcbmV4cG9ydCBjb25zdCB1c2VEZXRhaWxNdXRhdGlvbnMgPSAoe1xyXG4gIGJ1c3ksXHJcbiAgaXNFZGl0aW5nLFxyXG4gIGNhbkVkaXRIaXN0b3J5LFxyXG4gIGNhbkRlbGV0ZUhpc3RvcnksXHJcbiAgcmVjSWQsXHJcbiAgYWNjb3VudE51bSxcclxuICB0cmFuc0RhdGUsXHJcbiAgdmlzaXRUeXBlLFxyXG4gIGNvbnRhY3RNZXRob2QsXHJcbiAgYXNpc3RlbnRlVGlwbyxcclxuICBkZXNjcmlwdGlvbixcclxuICBjb21lbnRhcmlvcyxcclxuICBhbnRlY2VkZW50ZXMsXHJcbiAgY29uY2x1c2lvbmVzLFxyXG4gIHZpc2l0VHlwZXMsXHJcbiAgY29udGFjdE1ldGhvZHMsXHJcbiAgYXNpc3RlbnRlVGlwb3MsXHJcbiAgZGVmYXVsdFZpc2l0VHlwZSxcclxuICByYXdJbml0aWFsVmlzaXRUeXBlLFxyXG4gIHJhd0luaXRpYWxDb250YWN0TWV0aG9kLFxyXG4gIHJhd0luaXRpYWxBc2lzdGVudGUsXHJcbiAgbWF0Y2hPcHRpb25WYWx1ZSxcclxuICBjbGVhckRyYWZ0LFxyXG4gIHN5bmNFZGl0TW9kZUZsYWcsXHJcbiAgb25QZXJtaXNzaW9uQmxvY2tlZCxcclxuICBzZXRNb2RhbEVycm9yLFxyXG4gIHNldEJ1c3ksXHJcbiAgc2V0U3RhdHVzLFxyXG4gIHNldElzRWRpdGluZyxcclxufTogVXNlRGV0YWlsTXV0YXRpb25zQXJncykgPT4ge1xyXG4gIGNvbnN0IGhhbmRsZVVwZGF0ZSA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcclxuICAgIGlmIChidXN5IHx8ICFpc0VkaXRpbmcpIHJldHVybiBmYWxzZTtcclxuICAgIGlmICghY2FuRWRpdEhpc3RvcnkpIHtcclxuICAgICAgb25QZXJtaXNzaW9uQmxvY2tlZD8uKFwidXBkYXRlXCIpO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc2FmZVJlY0lkVmFsdWUgPSByZXNvbHZlU2FmZVJlY0lkKHJlY0lkKTtcclxuICAgIGlmIChzYWZlUmVjSWRWYWx1ZSA9PT0gbnVsbCkge1xyXG4gICAgICBjb25zdCBtZXNzYWdlID0gaW5kVChcIlZpc2l0c19EZXRhaWxfSW52YWxpZFJlY0lkXCIsIFwiQ291bGQgbm90IHJlc29sdmUgYWN0aXZpdHkgaWRlbnRpZmllci4gUmVsb2FkIGFuZCB0cnkgYWdhaW4uXCIpO1xyXG4gICAgICBzZXRNb2RhbEVycm9yKG1lc3NhZ2UpO1xyXG4gICAgICBzZXRTdGF0dXMobWVzc2FnZSk7XHJcbiAgICAgIGZsYXNoQWN0aW9uTWFyayhcImVycm9yUHJvY2Vzc1wiLCAxNTAwKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldE1vZGFsRXJyb3IoXCJcIik7XHJcbiAgICBzZXRCdXN5KHRydWUpO1xyXG4gICAgc2V0U3RhdHVzKGluZFQoXCJWaXNpdHNfRGV0YWlsX1VwZGF0aW5nXCIsIFwiVXBkYXRpbmcgYWN0aXZpdHkuLi5cIikpO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRWaXNpdFR5cGUgPVxyXG4gICAgICAgIG1hdGNoT3B0aW9uVmFsdWUodmlzaXRUeXBlcywgdmlzaXRUeXBlKSB8fFxyXG4gICAgICAgIG1hdGNoT3B0aW9uVmFsdWUodmlzaXRUeXBlcywgcmF3SW5pdGlhbFZpc2l0VHlwZSkgfHxcclxuICAgICAgICBkZWZhdWx0VmlzaXRUeXBlO1xyXG4gICAgICBjb25zdCBub3JtYWxpemVkQXNpc3RlbnRlVGlwbyA9XHJcbiAgICAgICAgbWF0Y2hPcHRpb25WYWx1ZShhc2lzdGVudGVUaXBvcywgYXNpc3RlbnRlVGlwbykgfHxcclxuICAgICAgICBtYXRjaE9wdGlvblZhbHVlKGFzaXN0ZW50ZVRpcG9zLCByYXdJbml0aWFsQXNpc3RlbnRlKSB8fFxyXG4gICAgICAgIHJhd0luaXRpYWxBc2lzdGVudGU7XHJcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRDb250YWN0TWV0aG9kID1cclxuICAgICAgICBtYXRjaE9wdGlvblZhbHVlKGNvbnRhY3RNZXRob2RzLCBjb250YWN0TWV0aG9kKSB8fFxyXG4gICAgICAgIG1hdGNoT3B0aW9uVmFsdWUoY29udGFjdE1ldGhvZHMsIHJhd0luaXRpYWxDb250YWN0TWV0aG9kKTtcclxuXHJcbiAgICAgIGNvbnN0IHBheWxvYWQgPSB7XHJcbiAgICAgICAgYWNjb3VudE51bSxcclxuICAgICAgICB2aXNpdFR5cGU6IHRvTnVsbGFibGVFbnVtTnVtYmVyKG5vcm1hbGl6ZWRWaXNpdFR5cGUpLFxyXG4gICAgICAgIGNvbnRhY3RNZXRob2Q6IHRvTnVsbGFibGVFbnVtTnVtYmVyKG5vcm1hbGl6ZWRDb250YWN0TWV0aG9kKSxcclxuICAgICAgICBhc2lzdGVudGVUaXBvOiB0b051bGxhYmxlRW51bU51bWJlcihub3JtYWxpemVkQXNpc3RlbnRlVGlwbyksXHJcbiAgICAgICAgZGVzY3JpcHRpb24sXHJcbiAgICAgICAgdHJhbnNEYXRlLFxyXG4gICAgICAgIGNvbWVudGFyaW9zLFxyXG4gICAgICAgIGFudGVjZWRlbnRlcyxcclxuICAgICAgICBjb25jbHVzaW9uZXMsXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBsb2dTYWZlUmVjSWRJbkRldihcInVwZGF0ZVwiLCBzYWZlUmVjSWRWYWx1ZSk7XHJcbiAgICAgIGNvbnN0IHNhZmVSZWNJZCA9IGVuY29kZVVSSUNvbXBvbmVudChzYWZlUmVjSWRWYWx1ZSk7XHJcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPFZpc2l0Q29tbWFuZFJlc3BvbnNlPihgL1Zpc2l0YXMvVXBkYXRlQWN0aXZpdHkvJHtzYWZlUmVjSWR9YCwge1xyXG4gICAgICAgIG1ldGhvZDogXCJQVVRcIixcclxuICAgICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXHJcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGF5bG9hZCksXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgaWYgKCFpc0NvbW1hbmRTdWNjZXNzKHJlc3BvbnNlKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihnZXRDb21tYW5kTWVzc2FnZShyZXNwb25zZSkgfHwgaW5kVChcIlZpc2l0c19EZXRhaWxfVXBkYXRlRmFpbGVkXCIsIFwiVXBkYXRlIGZhaWxlZC5cIikpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzZXRTdGF0dXMoaW5kVChcIlZpc2l0c19EZXRhaWxfVXBkYXRlZFwiLCBcIkFjdGl2aXR5IHVwZGF0ZWRcIikpO1xyXG4gICAgICBzZXRJc0VkaXRpbmcoZmFsc2UpO1xyXG4gICAgICBzeW5jRWRpdE1vZGVGbGFnKGZhbHNlKTtcclxuICAgICAgY2xlYXJEcmFmdCgpO1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBlcnJvciBpbnN0YW5jZW9mIEVycm9yICYmIGVycm9yLm1lc3NhZ2VcclxuICAgICAgICA/IGVycm9yLm1lc3NhZ2VcclxuICAgICAgICA6IGluZFQoXCJWaXNpdHNfRGV0YWlsX1VwZGF0ZUVycm9yXCIsIFwiVXBkYXRlIGVycm9yLlwiKTtcclxuICAgICAgc2V0TW9kYWxFcnJvcihtZXNzYWdlKTtcclxuICAgICAgc2V0U3RhdHVzKG1lc3NhZ2UpO1xyXG4gICAgICBmbGFzaEFjdGlvbk1hcmsoXCJlcnJvclByb2Nlc3NcIiwgMTUwMCk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0gZmluYWxseSB7XHJcbiAgICAgIHNldEJ1c3koZmFsc2UpO1xyXG4gICAgfVxyXG4gIH0sIFtcclxuICAgIGFjY291bnROdW0sXHJcbiAgICBhbnRlY2VkZW50ZXMsXHJcbiAgICBhc2lzdGVudGVUaXBvLFxyXG4gICAgYXNpc3RlbnRlVGlwb3MsXHJcbiAgICBidXN5LFxyXG4gICAgY2FuRWRpdEhpc3RvcnksXHJcbiAgICBjbGVhckRyYWZ0LFxyXG4gICAgY29tZW50YXJpb3MsXHJcbiAgICBjb25jbHVzaW9uZXMsXHJcbiAgICBjb250YWN0TWV0aG9kLFxyXG4gICAgY29udGFjdE1ldGhvZHMsXHJcbiAgICBkZWZhdWx0VmlzaXRUeXBlLFxyXG4gICAgZGVzY3JpcHRpb24sXHJcbiAgICBpc0VkaXRpbmcsXHJcbiAgICBtYXRjaE9wdGlvblZhbHVlLFxyXG4gICAgb25QZXJtaXNzaW9uQmxvY2tlZCxcclxuICAgIHJhd0luaXRpYWxBc2lzdGVudGUsXHJcbiAgICByYXdJbml0aWFsQ29udGFjdE1ldGhvZCxcclxuICAgIHJhd0luaXRpYWxWaXNpdFR5cGUsXHJcbiAgICByZWNJZCxcclxuICAgIHNldEJ1c3ksXHJcbiAgICBzZXRJc0VkaXRpbmcsXHJcbiAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgc2V0U3RhdHVzLFxyXG4gICAgc3luY0VkaXRNb2RlRmxhZyxcclxuICAgIHRyYW5zRGF0ZSxcclxuICAgIHZpc2l0VHlwZSxcclxuICAgIHZpc2l0VHlwZXMsXHJcbiAgXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZURlbGV0ZSA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcclxuICAgIGlmIChidXN5KSByZXR1cm4gZmFsc2U7XHJcbiAgICBpZiAoIWNhbkRlbGV0ZUhpc3RvcnkpIHtcclxuICAgICAgb25QZXJtaXNzaW9uQmxvY2tlZD8uKFwiZGVsZXRlXCIpO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc2FmZVJlY0lkVmFsdWUgPSByZXNvbHZlU2FmZVJlY0lkKHJlY0lkKTtcclxuICAgIGlmIChzYWZlUmVjSWRWYWx1ZSA9PT0gbnVsbCkge1xyXG4gICAgICBjb25zdCBtZXNzYWdlID0gaW5kVChcIlZpc2l0c19EZXRhaWxfSW52YWxpZFJlY0lkXCIsIFwiQ291bGQgbm90IHJlc29sdmUgYWN0aXZpdHkgaWRlbnRpZmllci4gUmVsb2FkIGFuZCB0cnkgYWdhaW4uXCIpO1xyXG4gICAgICBzZXRNb2RhbEVycm9yKG1lc3NhZ2UpO1xyXG4gICAgICBzZXRTdGF0dXMobWVzc2FnZSk7XHJcbiAgICAgIGZsYXNoQWN0aW9uTWFyayhcImVycm9yUHJvY2Vzc1wiLCAxNTAwKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldE1vZGFsRXJyb3IoXCJcIik7XHJcbiAgICBzZXRCdXN5KHRydWUpO1xyXG4gICAgc2V0U3RhdHVzKGluZFQoXCJWaXNpdHNfRGV0YWlsX0RlbGV0aW5nXCIsIFwiRGVsZXRpbmcgYWN0aXZpdHkuLi5cIikpO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGxvZ1NhZmVSZWNJZEluRGV2KFwiZGVsZXRlXCIsIHNhZmVSZWNJZFZhbHVlKTtcclxuICAgICAgY29uc3Qgc2FmZVJlY0lkID0gZW5jb2RlVVJJQ29tcG9uZW50KHNhZmVSZWNJZFZhbHVlKTtcclxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248VmlzaXRDb21tYW5kUmVzcG9uc2U+KGAvVmlzaXRhcy9EZWxldGVBY3Rpdml0eS8ke3NhZmVSZWNJZH1gLCB7IG1ldGhvZDogXCJERUxFVEVcIiB9KTtcclxuICAgICAgaWYgKCFpc0NvbW1hbmRTdWNjZXNzKHJlc3BvbnNlKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihnZXRDb21tYW5kTWVzc2FnZShyZXNwb25zZSkgfHwgaW5kVChcIlZpc2l0c19EZXRhaWxfRGVsZXRlRmFpbGVkXCIsIFwiRGVsZXRlIGZhaWxlZC5cIikpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzZXRTdGF0dXMoaW5kVChcIlZpc2l0c19EZXRhaWxfRGVsZXRlZFwiLCBcIkFjdGl2aXR5IGRlbGV0ZWRcIikpO1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBlcnJvciBpbnN0YW5jZW9mIEVycm9yICYmIGVycm9yLm1lc3NhZ2VcclxuICAgICAgICA/IGVycm9yLm1lc3NhZ2VcclxuICAgICAgICA6IGluZFQoXCJWaXNpdHNfRGV0YWlsX0RlbGV0ZUVycm9yXCIsIFwiRGVsZXRlIGVycm9yLlwiKTtcclxuICAgICAgc2V0TW9kYWxFcnJvcihtZXNzYWdlKTtcclxuICAgICAgc2V0U3RhdHVzKG1lc3NhZ2UpO1xyXG4gICAgICBmbGFzaEFjdGlvbk1hcmsoXCJlcnJvclByb2Nlc3NcIiwgMTUwMCk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0gZmluYWxseSB7XHJcbiAgICAgIHNldEJ1c3koZmFsc2UpO1xyXG4gICAgfVxyXG4gIH0sIFtidXN5LCBjYW5EZWxldGVIaXN0b3J5LCBvblBlcm1pc3Npb25CbG9ja2VkLCByZWNJZCwgc2V0QnVzeSwgc2V0TW9kYWxFcnJvciwgc2V0U3RhdHVzXSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBoYW5kbGVVcGRhdGUsXHJcbiAgICBoYW5kbGVEZWxldGUsXHJcbiAgfTtcclxufTtcclxuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuXHJcbnR5cGUgUHJvcHMgPSB7XHJcbiAgbGFiZWw6IHN0cmluZztcclxuICB2YWx1ZTogc3RyaW5nO1xyXG59O1xyXG5cclxuLy8gUmVhZC1vbmx5IG93bmVyIGZpZWxkIHNob3duIG9ubHkgd2hlbiB2aXNpYmlsaXR5IGNvbmZpcm1zIGEgbWFuYWdlciBjb250ZXh0LlxyXG5jb25zdCBEZXRhaWxPd25lckZpZWxkID0gKHsgbGFiZWwsIHZhbHVlIH06IFByb3BzKSA9PiB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwidmlzaXRhLWZpZWxkLXRleHRcIj5cclxuICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZFwiIGh0bWxGb3I9XCJ2aXNpdC1kZXRhaWwtb3duZXJcIj5cclxuICAgICAgICB7bGFiZWx9XHJcbiAgICAgIDwvbGFiZWw+XHJcbiAgICAgIDxpbnB1dFxyXG4gICAgICAgIGlkPVwidmlzaXQtZGV0YWlsLW93bmVyXCJcclxuICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2wgaW5kLXJlYWRvbmx5LWZpZWxkIGN1cnNvci1kZWZhdWx0XCJcclxuICAgICAgICB2YWx1ZT17dmFsdWV9XHJcbiAgICAgICAgcmVhZE9ubHlcclxuICAgICAgICBhcmlhLXJlYWRvbmx5PVwidHJ1ZVwiXHJcbiAgICAgIC8+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRGV0YWlsT3duZXJGaWVsZDtcclxuIiwgImltcG9ydCB7IGdldENzcmZUb2tlbiB9IGZyb20gXCIuL2FwaVNlcnZpY2UudHNcIjtcclxuXHJcbmV4cG9ydCB0eXBlIE1vZHVsZVBlcm1pc3Npb25UcmFjZVBheWxvYWQgPSBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPjtcclxuXHJcbmNvbnN0IFRSQUNFX1VSTCA9IFwiL01vZHVsZVBlcm1pc3Npb25zL1RyYWNlXCI7XHJcbmNvbnN0IE1BWF9CRUFDT05fQllURVMgPSA2MF8wMDA7XHJcblxyXG4vLyBTZW5kcyBtb2R1bGUgcGVybWlzc2lvbiBkaWFnbm9zdGljcyB0byBzZXJ2ZXIgbG9ncyB3aXRob3V0IGFmZmVjdGluZyB0aGUgVUkgZmxvdy5cclxuZXhwb3J0IGNvbnN0IHBvc3RNb2R1bGVQZXJtaXNzaW9uVHJhY2UgPSAoXHJcbiAgZXZlbnROYW1lOiBzdHJpbmcsXHJcbiAgcGF5bG9hZDogTW9kdWxlUGVybWlzc2lvblRyYWNlUGF5bG9hZCA9IHt9XHJcbik6IHZvaWQgPT4ge1xyXG4gIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm47XHJcblxyXG4gIGNvbnN0IGV2ZW50ID0gU3RyaW5nKGV2ZW50TmFtZSB8fCBcIlwiKS50cmltKCk7XHJcbiAgaWYgKCFldmVudCkgcmV0dXJuO1xyXG5cclxuICBjb25zdCBib2R5ID0gSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgZXZlbnQsXHJcbiAgICBwYXRoOiB3aW5kb3cubG9jYXRpb24/LnBhdGhuYW1lIHx8IFwiXCIsXHJcbiAgICAuLi5wYXlsb2FkLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBjc3JmVG9rZW4gPSBnZXRDc3JmVG9rZW4oKTtcclxuICBjb25zdCBoZWFkZXJzOiBIZWFkZXJzSW5pdCA9IHtcclxuICAgIEFjY2VwdDogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuICAgIFwiWC1SZXF1ZXN0ZWQtV2l0aFwiOiBcIlhNTEh0dHBSZXF1ZXN0XCIsXHJcbiAgfTtcclxuXHJcbiAgaWYgKGNzcmZUb2tlbikge1xyXG4gICAgKGhlYWRlcnMgYXMgUmVjb3JkPHN0cmluZywgc3RyaW5nPikuUmVxdWVzdFZlcmlmaWNhdGlvblRva2VuID0gY3NyZlRva2VuO1xyXG4gIH1cclxuXHJcbiAgdm9pZCBmZXRjaChUUkFDRV9VUkwsIHtcclxuICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICBjcmVkZW50aWFsczogXCJzYW1lLW9yaWdpblwiLFxyXG4gICAgaGVhZGVycyxcclxuICAgIGJvZHksXHJcbiAgICBrZWVwYWxpdmU6IGJvZHkubGVuZ3RoIDw9IE1BWF9CRUFDT05fQllURVMsXHJcbiAgfSkuY2F0Y2goKCkgPT4gdW5kZWZpbmVkKTtcclxufTtcclxuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IERldGFpbEZvcm0gZnJvbSBcIi4vRGV0YWlsRm9ybS50c3hcIjtcclxuaW1wb3J0IFZpc2l0YXNQYWdlUHJvdmlkZXJzIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvVmlzaXRhc1BhZ2VQcm92aWRlcnMudHN4XCI7XHJcbmltcG9ydCB7IG1vdW50UmVhY3RJc2xhbmQsIG1vdW50V2hlbkRvY3VtZW50UmVhZHkgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvcmVhY3RJc2xhbmQudHN4XCI7XHJcblxyXG50eXBlIFByb3BzID0ge1xyXG4gIGNvbXBhbnlJZD86IHN0cmluZztcclxuICBheFVzZXJJZD86IHN0cmluZztcclxuICBwZXJtaXNzaW9uc1JldmlzaW9uPzogc3RyaW5nO1xyXG59O1xyXG5cclxuLy8gUGFnZSBlbnRyeSBmb3IgdGhlIHZpc2l0YXMgZGV0YWlsIGlzbGFuZC5cclxuY29uc3QgRGV0YWlsUGFnZSA9ICh7IGNvbXBhbnlJZCA9IFwiXCIsIGF4VXNlcklkID0gXCJcIiwgcGVybWlzc2lvbnNSZXZpc2lvbiA9IFwiXCIgfTogUHJvcHMpID0+IHtcclxuICByZXR1cm4gKFxyXG4gICAgPFZpc2l0YXNQYWdlUHJvdmlkZXJzPlxyXG4gICAgICA8RGV0YWlsRm9ybSBjb21wYW55SWQ9e2NvbXBhbnlJZH0gYXhVc2VySWQ9e2F4VXNlcklkfSBwZXJtaXNzaW9uc1JldmlzaW9uPXtwZXJtaXNzaW9uc1JldmlzaW9ufSAvPlxyXG4gICAgPC9WaXNpdGFzUGFnZVByb3ZpZGVycz5cclxuICApO1xyXG59O1xyXG5cclxuY29uc3QgbW91bnQgPSAoKSA9PiB7XHJcbiAgY29uc3Qgcm9vdEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2aXNpdGEtZGV0YWlsLXJvb3RcIik7XHJcbiAgaWYgKCFyb290RWwpIHJldHVybjtcclxuICBjb25zdCBjb21wYW55SWQgPSByb290RWwuZ2V0QXR0cmlidXRlKFwiZGF0YS1jb21wYW55LWlkXCIpIHx8IFwiXCI7XHJcbiAgY29uc3QgYXhVc2VySWQgPSByb290RWwuZ2V0QXR0cmlidXRlKFwiZGF0YS1heC11c2VyLWlkXCIpIHx8IFwiXCI7XHJcbiAgY29uc3QgcGVybWlzc2lvbnNSZXZpc2lvbiA9IHJvb3RFbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXBlcm1pc3Npb25zLXJldmlzaW9uXCIpIHx8IFwiXCI7XHJcblxyXG4gIG1vdW50UmVhY3RJc2xhbmQoXHJcbiAgICByb290RWwsXHJcbiAgICA8RGV0YWlsUGFnZSBjb21wYW55SWQ9e2NvbXBhbnlJZH0gYXhVc2VySWQ9e2F4VXNlcklkfSBwZXJtaXNzaW9uc1JldmlzaW9uPXtwZXJtaXNzaW9uc1JldmlzaW9ufSAvPlxyXG4gICk7XHJcbn07XHJcblxyXG5tb3VudFdoZW5Eb2N1bWVudFJlYWR5KG1vdW50KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IERldGFpbFBhZ2U7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUFBLGdCQUF5RTs7O0FDQWxFLElBQU0sb0JBQW9CLENBQUMsT0FBMkI7QUFDM0QsTUFBSSxDQUFDLEdBQUksUUFBTyxNQUFNO0FBQUEsRUFBQztBQUN2QixRQUFNLFNBQVMsQ0FBQyxVQUFpQixNQUFNLGVBQWU7QUFDdEQsUUFBTSxTQUFTLENBQUMsZUFBZSxlQUFlLFFBQVEsT0FBTyxPQUFPO0FBQ3BFLFNBQU8sUUFBUSxDQUFDLFFBQVEsR0FBRyxpQkFBaUIsS0FBSyxNQUFNLENBQUM7QUFDeEQsU0FBTyxNQUFNO0FBQ1gsV0FBTyxRQUFRLENBQUMsUUFBUSxHQUFHLG9CQUFvQixLQUFLLE1BQU0sQ0FBQztBQUFBLEVBQzdEO0FBQ0Y7OztBQ1JPLElBQU0sV0FBVyxDQUFDLFVBQW1CLE9BQU8sU0FBUyxFQUFFLEVBQUUsS0FBSyxFQUFFLFNBQVM7OztBQ0FoRixtQkFBdUM7QUFzQnZDLElBQU0sb0JBQW9CLENBQUMsYUFBOEM7QUFDdkUsU0FBTyxTQUFTLFlBQVksUUFBUSxTQUFTLFlBQVk7QUFDM0Q7QUFFQSxJQUFNLHFCQUFxQixDQUFDLGFBQTZDO0FBQ3ZFLFFBQU0sTUFBTSxTQUFTLFdBQVcsU0FBUztBQUN6QyxTQUFPLE9BQU8sUUFBUSxXQUFXLElBQUksS0FBSyxJ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QUEsY0FDRjtBQUFBO0FBQUEsVUFDRjtBQUFBLFVBRUEsNkNBQUMsU0FBSSxXQUFVLG9EQUNiLHVEQUFDLFVBQU0sa0JBQU8sR0FDaEI7QUFBQTtBQUFBO0FBQUEsSUFDRjtBQUFBLEtBQ0Y7QUFFSjtBQUdlLFNBQVIsV0FBNEIsT0FBd0I7QUFDekQsU0FDRSw2Q0FBQyw0QkFBaUIsaUJBQWlCLEtBQUssK0JBQStCLDBFQUEwRSxHQUMvSSx1REFBQyxhQUFXLEdBQUcsT0FBTyxHQUN4QjtBQUVKOzs7QVMxd0JNLElBQUFDLHNCQUFBO0FBSE4sSUFBTSxhQUFhLENBQUMsRUFBRSxZQUFZLElBQUksV0FBVyxJQUFJLHNCQUFzQixHQUFHLE1BQWE7QUFDekYsU0FDRSw2Q0FBQyxnQ0FDQyx1REFBQyxjQUFXLFdBQXNCLFVBQW9CLHFCQUEwQyxHQUNsRztBQUVKO0FBRUEsSUFBTSxRQUFRLE1BQU07QUFDbEIsUUFBTSxTQUFTLFNBQVMsZUFBZSxvQkFBb0I7QUFDM0QsTUFBSSxDQUFDLE9BQVE7QUFDYixRQUFNLFlBQVksT0FBTyxhQUFhLGlCQUFpQixLQUFLO0FBQzVELFFBQU0sV0FBVyxPQUFPLGFBQWEsaUJBQWlCLEtBQUs7QUFDM0QsUUFBTSxzQkFBc0IsT0FBTyxhQUFhLDJCQUEyQixLQUFLO0FBRWhGO0FBQUEsSUFDRTtBQUFBLElBQ0EsNkNBQUMsY0FBVyxXQUFzQixVQUFvQixxQkFBMEM7QUFBQSxFQUNsRztBQUNGO0FBRUEsdUJBQXVCLEtBQUs7QUFFNUIsSUFBTyxxQkFBUTsiLAogICJuYW1lcyI6IFsiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfanN4X3J1bnRpbWUiXQp9Cg==
