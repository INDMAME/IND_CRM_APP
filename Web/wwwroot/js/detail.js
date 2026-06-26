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
import {
  clearTextEditorValue
} from "./chunks/chunk-6FM7OI23.js";
import {
  formatModuleVisibleUserLabel,
  resolveModuleOwnerMutationAccess,
  useModuleDataVisibility
} from "./chunks/chunk-ATML23VI.js";
import {
  SelectCombobox_default
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
  setTopbarActionGroupReady
} from "./chunks/chunk-ZBKHPZJX.js";
import "./chunks/chunk-DY2B5JHI.js";
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
  getCsrfToken,
  indT
} from "./chunks/chunk-63VW7TTG.js";
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
                readOnly: !isVisitEditable,
                usePortal: false
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
              SelectCombobox_default,
              {
                label: indT("Visits_Detail_ContactMethod_Label", "Contact method"),
                options: contactMethods,
                value: contactMethod,
                onChange: setContactMethod,
                placeholder: indT("Visits_Detail_ContactMethod_Placeholder", "Select method"),
                disabled: !isVisitEditable,
                readOnly: !isVisitEditable,
                usePortal: false
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvZGV0YWlsL0RldGFpbEZvcm0udHN4IiwgIi4uL3JlYWN0L3NyYy91dGlscy9kb21HdWFyZHMudHMiLCAiLi4vcmVhY3Qvc3JjL3V0aWxzL3N0cmluZ3MudHMiLCAiLi4vcmVhY3Qvc3JjL2hvb2tzL3VzZURldGFpbEh5ZHJhdGlvbi50cyIsICIuLi9yZWFjdC9zcmMvaG9va3MvdXNlRGV0YWlsVG9wYmFyQWN0aW9ucy50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9kZXRhaWwvdXNlRGV0YWlsRWRpdFNlc3Npb24udHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvZGV0YWlsL3VzZURldGFpbE11dGF0aW9ucy50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9kZXRhaWwvRGV0YWlsT3duZXJGaWVsZC50c3giLCAiLi4vcmVhY3Qvc3JjL3NlcnZpY2VzL21vZHVsZVBlcm1pc3Npb25UcmFjZVNlcnZpY2UudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvZGV0YWlsL0RldGFpbFBhZ2UudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCwgdXNlUmVmLCB1c2VDYWxsYmFjaywgdXNlTWVtbyB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgU2luZ2xlRGF0ZVBpY2tlciBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NpbmdsZURhdGVQaWNrZXIudHN4XCI7XHJcbmltcG9ydCBDb25maXJtTW9kYWwgZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9Db25maXJtTW9kYWwudHN4XCI7XHJcbmltcG9ydCBTZWxlY3RDb21ib2JveCBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NlbGVjdENvbWJvYm94LnRzeFwiO1xyXG5pbXBvcnQgQXBwRXJyb3JCb3VuZGFyeSBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0FwcEVycm9yQm91bmRhcnkudHN4XCI7XHJcbmltcG9ydCB7IHVzZVZpc2l0YXMgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlVmlzaXRhcy50c1wiO1xyXG5pbXBvcnQgU3Bpbm5lciBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NwaW5uZXIudHN4XCI7XHJcbmltcG9ydCBWaXNpdE5hcnJhdGl2ZUZpZWxkcyBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy92aXNpdGFzL1Zpc2l0TmFycmF0aXZlRmllbGRzLnRzeFwiO1xyXG5pbXBvcnQgeyBjbGFzc05hbWVzIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2NsYXNzTmFtZXMudHNcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB7IGNhbkFjY2Vzcywgc2hvd1Blcm1pc3Npb25Nb2RhbCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9wZXJtaXNzaW9ucy50c1wiO1xyXG5pbXBvcnQgeyBiaW5kUmVhZE9ubHlHdWFyZCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9kb21HdWFyZHMudHNcIjtcbmltcG9ydCB7IGhhc1ZhbHVlIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3N0cmluZ3MudHNcIjtcbmltcG9ydCB7IG5hdmlnYXRlVG9UZXh0RWRpdG9yRmllbGQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvdGV4dEVkaXRvck5hdmlnYXRpb24udHNcIjtcbmltcG9ydCB7IGNsZWFyVGV4dEVkaXRvclZhbHVlIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3RleHRFZGl0b3IudHNcIjtcbmltcG9ydCB7IGZsYXNoQWN0aW9uTWFyayB9IGZyb20gXCIuLi8uLi8uLi91dGlscy92aXNpdGFzSGlzdG9yeS50c1wiO1xuaW1wb3J0IHsgc2V0UHJldmlld0FuY2hvciwgc2hvd1ByZXZpZXdUb29sdGlwLCBpc092ZXJmbG93aW5nIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3ByZXZpZXdUb29sdGlwLnRzXCI7XHJcbmltcG9ydCB7IHVzZVRhcEd1YXJkIH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZVRhcEd1YXJkLnRzXCI7XHJcbmltcG9ydCB7IHVzZUNvbmZpcm1EaWFsb2cgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlQ29uZmlybURpYWxvZy50c1wiO1xyXG5pbXBvcnQgeyB1c2VEZXRhaWxIeWRyYXRpb24gfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlRGV0YWlsSHlkcmF0aW9uLnRzXCI7XG5pbXBvcnQgeyB1c2VEZXRhaWxUb3BiYXJBY3Rpb25zIH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZURldGFpbFRvcGJhckFjdGlvbnMudHNcIjtcbmltcG9ydCB7IHVzZVRleHRFZGl0b3JGaWVsZHMgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlVGV4dEVkaXRvckZpZWxkcy50c1wiO1xuaW1wb3J0IHsgdXNlTW9kdWxlRGF0YVZpc2liaWxpdHkgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlTW9kdWxlRGF0YVZpc2liaWxpdHkudHNcIjtcbmltcG9ydCB7IHVzZURldGFpbEVkaXRTZXNzaW9uIH0gZnJvbSBcIi4vdXNlRGV0YWlsRWRpdFNlc3Npb24udHNcIjtcbmltcG9ydCB7IHVzZURldGFpbE11dGF0aW9ucyB9IGZyb20gXCIuL3VzZURldGFpbE11dGF0aW9ucy50c1wiO1xuaW1wb3J0IHtcbiAgZm9ybWF0TW9kdWxlVmlzaWJsZVVzZXJMYWJlbCxcbiAgcmVzb2x2ZU1vZHVsZU93bmVyTXV0YXRpb25BY2Nlc3MsXG59IGZyb20gXCIuLi8uLi8uLi91dGlscy9tb2R1bGVEYXRhVmlzaWJpbGl0eS50c1wiO1xuaW1wb3J0IERldGFpbE93bmVyRmllbGQgZnJvbSBcIi4vRGV0YWlsT3duZXJGaWVsZC50c3hcIjtcbmltcG9ydCB7XG4gIHBvc3RNb2R1bGVQZXJtaXNzaW9uVHJhY2UsXG4gIHR5cGUgTW9kdWxlUGVybWlzc2lvblRyYWNlUGF5bG9hZCxcbn0gZnJvbSBcIi4uLy4uLy4uL3NlcnZpY2VzL21vZHVsZVBlcm1pc3Npb25UcmFjZVNlcnZpY2UudHNcIjtcblxuY29uc3QgRURJVE9SX1JFVFVSTl9GTEFHX1RUTF9NUyA9IDIgKiA2MCAqIDYwICogMTAwMDtcbmNvbnN0IEFQUF9DT0RFID0gXCJDUk1cIjtcbmNvbnN0IE1PRFVMRV9DT0RFID0gXCJWSVNJVEFTX0dFU1RJT05cIjtcblxudHlwZSBEZXRhaWxGb3JtUHJvcHMgPSB7XG4gIGNvbXBhbnlJZD86IHN0cmluZztcbiAgYXhVc2VySWQ/OiBzdHJpbmc7XG4gIHBlcm1pc3Npb25zUmV2aXNpb24/OiBzdHJpbmc7XG59O1xuXG5jb25zdCBzYWZlRGV0YWlsVGV4dCA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZyA9PiBTdHJpbmcodmFsdWUgPz8gXCJcIikudHJpbSgpO1xuXG5jb25zdCBmaXJzdERldGFpbFRleHQgPSAoLi4udmFsdWVzOiB1bmtub3duW10pOiBzdHJpbmcgPT4ge1xuICBmb3IgKGNvbnN0IHZhbHVlIG9mIHZhbHVlcykge1xuICAgIGNvbnN0IHRleHQgPSBzYWZlRGV0YWlsVGV4dCh2YWx1ZSk7XG4gICAgaWYgKHRleHQpIHJldHVybiB0ZXh0O1xuICB9XG5cbiAgcmV0dXJuIFwiXCI7XG59O1xuXG5jb25zdCBEZXRhaWxBcHAgPSAoeyBjb21wYW55SWQgPSBcIlwiLCBheFVzZXJJZCA9IFwiXCIsIHBlcm1pc3Npb25zUmV2aXNpb24gPSBcIlwiIH06IERldGFpbEZvcm1Qcm9wcykgPT4ge1xuICBjb25zdCB7IHZpc2l0VHlwZXMsIGNvbnRhY3RNZXRob2RzLCBhc2lzdGVudGVUaXBvcyB9ID0gdXNlVmlzaXRhcygpO1xuICBjb25zdCBjYW5WaWV3SGlzdG9yeSA9IGNhbkFjY2VzcyhcIlZJU0lUQVNfR0VTVElPTlwiLCBcIlZpZXdcIik7XG4gIGNvbnN0IGNhbkVkaXRIaXN0b3J5ID0gY2FuQWNjZXNzKFwiVklTSVRBU19HRVNUSU9OXCIsIFwiRWRpdFwiKTtcbiAgY29uc3QgY2FuRGVsZXRlSGlzdG9yeSA9IGNhbkFjY2VzcyhcIlZJU0lUQVNfR0VTVElPTlwiLCBcIkZ1bGxBY2Nlc3NcIik7XG4gIHR5cGUgQWN0aXZpdHlEZXRhaWxQYXlsb2FkID0ge1xuICAgIHJlY0lkPzogc3RyaW5nIHwgbnVtYmVyO1xyXG4gICAgUmVjSWQ/OiBzdHJpbmcgfCBudW1iZXI7XHJcbiAgICByZWZSZWNJZEFjdGl2aWRhZD86IHN0cmluZyB8IG51bWJlcjtcclxuICAgIFJlZlJlY0lkQWN0aXZpZGFkPzogc3RyaW5nIHwgbnVtYmVyO1xyXG4gICAgYWN0aXZpZGFkUmVjSWQ/OiBzdHJpbmcgfCBudW1iZXI7XHJcbiAgICBBY3RpdmlkYWRSZWNJZD86IHN0cmluZyB8IG51bWJlcjtcclxuICAgIHJlYWRPbmx5PzogYm9vbGVhbjtcbiAgICBhbGxvd0VkaXQ/OiBib29sZWFuO1xuICAgIGVkaXRNb2RlS2V5Pzogc3RyaW5nO1xuICAgIG93bmVyQXhVc2VySWQ/OiBzdHJpbmc7XG4gICAgT3duZXJBeFVzZXJJZD86IHN0cmluZztcbiAgICBvd25lck5hbWU/OiBzdHJpbmc7XG4gICAgT3duZXJOYW1lPzogc3RyaW5nO1xuICAgIG93bmVyQWxpYXM/OiBzdHJpbmc7XG4gICAgT3duZXJBbGlhcz86IHN0cmluZztcbiAgICBjcmVhdGVkQnlVc2VySWQ/OiBzdHJpbmc7XG4gICAgQ3JlYXRlZEJ5VXNlcklkPzogc3RyaW5nO1xuICAgIHVzZXJJZD86IHN0cmluZztcbiAgICBVc2VySWQ/OiBzdHJpbmc7XG4gICAgaW5kQ3JlYXRlZEJ5VXNlcklkPzogc3RyaW5nO1xuICAgIElORENyZWF0ZWRCeVVzZXJJZD86IHN0cmluZztcbiAgICBjYW5NdXRhdGVWaXNpdD86IGJvb2xlYW4gfCBudWxsO1xuICAgIENhbk11dGF0ZVZpc2l0PzogYm9vbGVhbiB8IG51bGw7XG4gICAgbXV0YXRpb25QZXJtaXNzaW9uU3RhdHVzPzogc3RyaW5nO1xuICAgIE11dGF0aW9uUGVybWlzc2lvblN0YXR1cz86IHN0cmluZztcbiAgICBba2V5OiBzdHJpbmddOiB1bmtub3duO1xuICB9O1xuXG4gIGNvbnN0IGRldGFpbCA9ICh3aW5kb3cuX19BQ1RJVklUWV9ERVRBSUxfXyBhcyBBY3Rpdml0eURldGFpbFBheWxvYWQpIHx8IHt9O1xuICBjb25zdCByZXNvbHZlQWN0aXZpdHlSZWNJZCA9IChwYXlsb2FkOiBBY3Rpdml0eURldGFpbFBheWxvYWQpOiBzdHJpbmcgPT4ge1xuICAgIGNvbnN0IGNhbmRpZGF0ZXMgPSBbXG4gICAgICBwYXlsb2FkLnJlY0lkLFxuICAgICAgcGF5bG9hZC5SZWNJZCxcclxuICAgICAgcGF5bG9hZC5yZWZSZWNJZEFjdGl2aWRhZCxcclxuICAgICAgcGF5bG9hZC5SZWZSZWNJZEFjdGl2aWRhZCxcclxuICAgICAgcGF5bG9hZC5hY3RpdmlkYWRSZWNJZCxcclxuICAgICAgcGF5bG9hZC5BY3RpdmlkYWRSZWNJZCxcclxuICAgIF07XHJcblxyXG4gICAgZm9yIChjb25zdCBjYW5kaWRhdGUgb2YgY2FuZGlkYXRlcykge1xyXG4gICAgICBjb25zdCBub3JtYWxpemVkID0gU3RyaW5nKGNhbmRpZGF0ZSA/PyBcIlwiKS50cmltKCk7XHJcbiAgICAgIGlmIChub3JtYWxpemVkKSB7XHJcbiAgICAgICAgcmV0dXJuIG5vcm1hbGl6ZWQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gXCJcIjtcclxuICB9O1xyXG5cbiAgY29uc3QgYWN0aXZpdHlSZWNJZCA9IHJlc29sdmVBY3Rpdml0eVJlY0lkKGRldGFpbCk7XG4gIC8vIFN0cmljdCByZWNvcmQtbGV2ZWwgVUkgZ2F0aW5nIG5lZWRzIHRoZSBkZXRhaWwgQVBJIHRvIHJldHVybiBPd25lckF4VXNlcklkLlxuICAvLyBMZWdhY3kgZmFsbGJhY2tzIGtlZXAgZXhpc3RpbmcgcmVjb3JkcyB1c2FibGUgd2hpbGUgQVgvQVBJIHJlbWFpbnMgdGhlIGZpbmFsIGVuZm9yY2VtZW50IHBvaW50LlxuICBjb25zdCBkZXRhaWxPd25lckF4VXNlcklkID0gZmlyc3REZXRhaWxUZXh0KFxuICAgIGRldGFpbC5vd25lckF4VXNlcklkLFxuICAgIGRldGFpbC5Pd25lckF4VXNlcklkLFxuICAgIGRldGFpbC5pbmRDcmVhdGVkQnlVc2VySWQsXG4gICAgZGV0YWlsLklORENyZWF0ZWRCeVVzZXJJZCxcbiAgICBkZXRhaWwuY3JlYXRlZEJ5VXNlcklkLFxuICAgIGRldGFpbC5DcmVhdGVkQnlVc2VySWQsXG4gICAgZGV0YWlsLnVzZXJJZCxcbiAgICBkZXRhaWwuVXNlcklkXG4gICk7XG4gIGNvbnN0IGRldGFpbE93bmVyUmF3VGV4dCA9IGZpcnN0RGV0YWlsVGV4dChkZXRhaWwub3duZXJOYW1lLCBkZXRhaWwuT3duZXJOYW1lLCBkZXRhaWwub3duZXJBbGlhcywgZGV0YWlsLk93bmVyQWxpYXMpO1xuICBjb25zdCByYXdTZXJ2ZXJDYW5NdXRhdGVWaXNpdCA9IGRldGFpbC5jYW5NdXRhdGVWaXNpdCA/PyBkZXRhaWwuQ2FuTXV0YXRlVmlzaXQ7XG4gIGNvbnN0IGhhc1NlcnZlck11dGF0aW9uRGVjaXNpb24gPSB0eXBlb2YgcmF3U2VydmVyQ2FuTXV0YXRlVmlzaXQgPT09IFwiYm9vbGVhblwiO1xuICBjb25zdCBzZXJ2ZXJDYW5NdXRhdGVWaXNpdCA9IHJhd1NlcnZlckNhbk11dGF0ZVZpc2l0ID09PSB0cnVlO1xuICBjb25zdCBzZXJ2ZXJNdXRhdGlvblBlcm1pc3Npb25TdGF0dXMgPSBmaXJzdERldGFpbFRleHQoXG4gICAgZGV0YWlsLm11dGF0aW9uUGVybWlzc2lvblN0YXR1cyxcbiAgICBkZXRhaWwuTXV0YXRpb25QZXJtaXNzaW9uU3RhdHVzXG4gICk7XG4gIGNvbnN0IGxvZ1Blcm1pc3Npb25UcmFjZSA9IHVzZUNhbGxiYWNrKFxuICAgIChldmVudE5hbWU6IHN0cmluZywgZGF0YTogTW9kdWxlUGVybWlzc2lvblRyYWNlUGF5bG9hZCA9IHt9KSA9PiB7XG4gICAgICBwb3N0TW9kdWxlUGVybWlzc2lvblRyYWNlKGV2ZW50TmFtZSwge1xuICAgICAgICByZWNJZDogYWN0aXZpdHlSZWNJZCxcbiAgICAgICAgb3duZXJBeFVzZXJJZDogZGV0YWlsT3duZXJBeFVzZXJJZCxcbiAgICAgICAgdmlld2VyQXhVc2VySWQ6IGF4VXNlcklkLFxuICAgICAgICBjb21wYW55SWQsXG4gICAgICAgIHBlcm1pc3Npb25zUmV2aXNpb24sXG4gICAgICAgIHNlcnZlckNhbk11dGF0ZVZpc2l0OiBoYXNTZXJ2ZXJNdXRhdGlvbkRlY2lzaW9uID8gc2VydmVyQ2FuTXV0YXRlVmlzaXQgOiBudWxsLFxuICAgICAgICBzZXJ2ZXJNdXRhdGlvblBlcm1pc3Npb25TdGF0dXMsXG4gICAgICAgIGFwcENvZGU6IEFQUF9DT0RFLFxuICAgICAgICBtb2R1bGVDb2RlOiBNT0RVTEVfQ09ERSxcbiAgICAgICAgLi4uZGF0YSxcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgW1xuICAgICAgYWN0aXZpdHlSZWNJZCxcbiAgICAgIGF4VXNlcklkLFxuICAgICAgY29tcGFueUlkLFxuICAgICAgZGV0YWlsT3duZXJBeFVzZXJJZCxcbiAgICAgIGhhc1NlcnZlck11dGF0aW9uRGVjaXNpb24sXG4gICAgICBwZXJtaXNzaW9uc1JldmlzaW9uLFxuICAgICAgc2VydmVyQ2FuTXV0YXRlVmlzaXQsXG4gICAgICBzZXJ2ZXJNdXRhdGlvblBlcm1pc3Npb25TdGF0dXMsXG4gICAgXVxuICApO1xuXG4gIGNvbnN0IHsgdmlzaWJsZVVzZXJCeU93bmVyQXhVc2VySWQsIHZpc2libGVVc2Vyc1JlYWR5IH0gPSB1c2VNb2R1bGVEYXRhVmlzaWJpbGl0eSh7XG4gICAgZW5hYmxlZDogY2FuVmlld0hpc3RvcnkgfHwgY2FuRWRpdEhpc3RvcnkgfHwgY2FuRGVsZXRlSGlzdG9yeSxcbiAgICBjb21wYW55SWQsXG4gICAgYXhVc2VySWQsXG4gICAgcGVybWlzc2lvbnNSZXZpc2lvbixcbiAgICBhcHBDb2RlOiBBUFBfQ09ERSxcbiAgICBtb2R1bGVDb2RlOiBNT0RVTEVfQ09ERSxcbiAgICBhbGxvd0NhY2hlZFVzZXJzOiBmYWxzZSxcbiAgICBwcmVsb2FkZWRVc2VyczogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdy5fX0lORF9WSVNJQkxFX1ZJU0lUX1VTRVJTX18gOiB1bmRlZmluZWQsXG4gICAgb25Gb3JiaWRkZW46IHNob3dQZXJtaXNzaW9uTW9kYWwsXG4gICAgb25EZWJ1ZzogbG9nUGVybWlzc2lvblRyYWNlLFxuICB9KTtcblxuICBjb25zdCB0ZXh0RWRpdG9yQmFzZUlkID0gYWN0aXZpdHlSZWNJZCA/IGBWaXNpdGEuJHthY3Rpdml0eVJlY0lkfWAgOiBcIlZpc2l0YVwiO1xuICBjb25zdCBmaWVsZElkQ29tZW50YXJpb3MgPSBgJHt0ZXh0RWRpdG9yQmFzZUlkfS5Db21lbnRhcmlvc2A7XHJcbiAgY29uc3QgZmllbGRJZEFudGVjZWRlbnRlcyA9IGAke3RleHRFZGl0b3JCYXNlSWR9LkFudGVjZWRlbnRlc2A7XHJcbiAgY29uc3QgZmllbGRJZENvbmNsdXNpb25lcyA9IGAke3RleHRFZGl0b3JCYXNlSWR9LkNvbmNsdXNpb25lc2A7XHJcblxyXG4gIGNvbnN0IG5vcm1hbGl6ZURhdGVUb0lucHV0ID0gdXNlQ2FsbGJhY2soKHZhbHVlKSA9PiB7XHJcbiAgICBpZiAoIXZhbHVlKSByZXR1cm4gXCJcIjtcclxuICAgIGNvbnN0IHJhdyA9IFN0cmluZyh2YWx1ZSkudHJpbSgpO1xyXG4gICAgaWYgKCFyYXcpIHJldHVybiBcIlwiO1xyXG4gICAgLy8gQWxyZWFkeSB5eXl5LU1NLWRkXHJcbiAgICBpZiAoL15cXGR7NH0tXFxkezJ9LVxcZHsyfSQvLnRlc3QocmF3KSkgcmV0dXJuIHJhdztcclxuICAgIC8vIGRkLk1NLnl5eXkgb3IgZGQvTU0veXl5eVxyXG4gICAgaWYgKC9eXFxkezJ9Wy4vLV1cXGR7Mn1bLi8tXVxcZHs0fSQvLnRlc3QocmF3KSkge1xyXG4gICAgICBjb25zdCBwYXJ0cyA9IHJhdy5zcGxpdCgvWy4vLV0vKS5tYXAoKHApID0+IHBhcnNlSW50KHAsIDEwKSk7XHJcbiAgICAgIGlmIChwYXJ0cy5sZW5ndGggPT09IDMgJiYgIU51bWJlci5pc05hTihwYXJ0c1swXSkgJiYgIU51bWJlci5pc05hTihwYXJ0c1sxXSkgJiYgIU51bWJlci5pc05hTihwYXJ0c1syXSkpIHtcclxuICAgICAgICBjb25zdCBbZCwgbSwgeV0gPSBwYXJ0cztcclxuICAgICAgICBjb25zdCBtbSA9IFN0cmluZyhtKS5wYWRTdGFydCgyLCBcIjBcIik7XHJcbiAgICAgICAgY29uc3QgZGQgPSBTdHJpbmcoZCkucGFkU3RhcnQoMiwgXCIwXCIpO1xyXG4gICAgICAgIHJldHVybiBgJHt5fS0ke21tfS0ke2RkfWA7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbnN0IGR0ID0gbmV3IERhdGUocmF3KTtcclxuICAgIGlmICghTnVtYmVyLmlzTmFOKGR0LmdldFRpbWUoKSkpIHtcclxuICAgICAgY29uc3QgeXl5eSA9IGR0LmdldEZ1bGxZZWFyKCk7XHJcbiAgICAgIGNvbnN0IG1tID0gU3RyaW5nKGR0LmdldE1vbnRoKCkgKyAxKS5wYWRTdGFydCgyLCBcIjBcIik7XHJcbiAgICAgIGNvbnN0IGRkID0gU3RyaW5nKGR0LmdldERhdGUoKSkucGFkU3RhcnQoMiwgXCIwXCIpO1xyXG4gICAgICByZXR1cm4gYCR7eXl5eX0tJHttbX0tJHtkZH1gO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFwiXCI7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBtYXRjaE9wdGlvblZhbHVlID0gdXNlQ2FsbGJhY2soKG9wdGlvbnMsIHJhdykgPT4ge1xyXG4gICAgaWYgKHJhdyA9PSBudWxsKSByZXR1cm4gXCJcIjtcclxuICAgIGNvbnN0IHJhd1N0ciA9IFN0cmluZyhyYXcpLnRyaW0oKTtcclxuICAgIGlmICghcmF3U3RyKSByZXR1cm4gXCJcIjtcclxuXHJcbiAgICBjb25zdCBub3JtYWxpemVUZXh0ID0gKHMpID0+XHJcbiAgICAgIFN0cmluZyhzIHx8IFwiXCIpXHJcbiAgICAgICAgLnRvTG93ZXJDYXNlKClcclxuICAgICAgICAubm9ybWFsaXplKFwiTkZEXCIpXHJcbiAgICAgICAgLnJlcGxhY2UoL1tcXHUwMzAwLVxcdTAzNmZdL2csIFwiXCIpXHJcbiAgICAgICAgLnRyaW0oKTtcclxuXHJcbiAgICBjb25zdCByYXdOb3JtID0gbm9ybWFsaXplVGV4dChyYXdTdHIpO1xyXG4gICAgY29uc3QgYWx0Tm9ybSA9IHJhd05vcm0uZW5kc1dpdGgoXCJvXCIpID8gYCR7cmF3Tm9ybS5zbGljZSgwLCAtMSl9YWAgOiByYXdOb3JtO1xyXG5cclxuICAgIGNvbnN0IG1hdGNoID0gKG9wdGlvbnMgfHwgW10pLmZpbmQoKG8pID0+IHtcclxuICAgICAgY29uc3QgdmFsID0gU3RyaW5nKG8/LnZhbHVlID8/IG8/LlZhbHVlID8/IFwiXCIpLnRyaW0oKTtcclxuICAgICAgY29uc3QgdGV4dCA9IFN0cmluZyhvPy50ZXh0ID8/IG8/LlRleHQgPz8gXCJcIikudHJpbSgpO1xyXG4gICAgICBjb25zdCB0ZXh0Tm9ybSA9IG5vcm1hbGl6ZVRleHQodGV4dCk7XHJcbiAgICAgIHJldHVybiB2YWwgPT09IHJhd1N0ciB8fCB2YWwgPT09IHJhd05vcm0gfHwgdGV4dE5vcm0gPT09IHJhd05vcm0gfHwgdGV4dE5vcm0gPT09IGFsdE5vcm07XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBtYXRjaCA/IFN0cmluZyhtYXRjaC52YWx1ZSA/PyBtYXRjaC5WYWx1ZSA/PyByYXdTdHIpIDogcmF3U3RyO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgaW5pdGlhbFRyYW5zRGF0ZSA9IG5vcm1hbGl6ZURhdGVUb0lucHV0KFN0cmluZyhkZXRhaWwudHJhbnNEYXRlID8/IGRldGFpbC5UcmFuc0RhdGUgPz8gXCJcIikpO1xyXG4gIGNvbnN0IGRlZmF1bHRWaXNpdFR5cGUgPSBTdHJpbmcodmlzaXRUeXBlc1swXT8udmFsdWUgPz8gdmlzaXRUeXBlc1swXT8uVmFsdWUgPz8gXCJcIik7XHJcbiAgY29uc3QgcmF3SW5pdGlhbFZpc2l0VHlwZSA9IFN0cmluZyhcclxuICAgIGRldGFpbC50aXBvVmlzaXRhID8/IGRldGFpbC5UaXBvVmlzaXRhID8/IGRldGFpbC52aXNpdFR5cGUgPz8gZGV0YWlsLlZpc2l0VHlwZSA/PyBcIlwiXHJcbiAgKTtcclxuICBjb25zdCBpbml0aWFsVmlzaXRUeXBlID0gbWF0Y2hPcHRpb25WYWx1ZSh2aXNpdFR5cGVzLCByYXdJbml0aWFsVmlzaXRUeXBlKSB8fCBkZWZhdWx0VmlzaXRUeXBlO1xyXG4gIGNvbnN0IHJhd0luaXRpYWxDb250YWN0TWV0aG9kID0gU3RyaW5nKFxyXG4gICAgZGV0YWlsLmNvbnRhY3RNZXRob2QgPz8gZGV0YWlsLkNvbnRhY3RNZXRob2QgPz8gXCJcIlxyXG4gICk7XHJcbiAgY29uc3QgaW5pdGlhbENvbnRhY3RNZXRob2QgPSBtYXRjaE9wdGlvblZhbHVlKGNvbnRhY3RNZXRob2RzLCByYXdJbml0aWFsQ29udGFjdE1ldGhvZCk7XHJcbiAgY29uc3QgcmF3SW5pdGlhbEFzaXN0ZW50ZSA9IFN0cmluZyhcclxuICAgIGRldGFpbC5hc2lzdGVudGVUaXBvID8/IGRldGFpbC5Bc2lzdGVudGVUaXBvID8/IChhc2lzdGVudGVUaXBvc1swXT8udmFsdWUgPz8gYXNpc3RlbnRlVGlwb3NbMF0/LlZhbHVlID8/IFwiXCIpXHJcbiAgKTtcclxuICBjb25zdCBpbml0aWFsQXNpc3RlbnRlID0gbWF0Y2hPcHRpb25WYWx1ZShhc2lzdGVudGVUaXBvcywgcmF3SW5pdGlhbEFzaXN0ZW50ZSkgfHwgcmF3SW5pdGlhbEFzaXN0ZW50ZTtcclxuXHJcbiAgY29uc3QgW3RyYW5zRGF0ZSwgc2V0VHJhbnNEYXRlXSA9IHVzZVN0YXRlKGluaXRpYWxUcmFuc0RhdGUpO1xyXG4gIGNvbnN0IFt2aXNpdFR5cGUsIHNldFZpc2l0VHlwZV0gPSB1c2VTdGF0ZShpbml0aWFsVmlzaXRUeXBlKTtcclxuICBjb25zdCBbY29udGFjdE1ldGhvZCwgc2V0Q29udGFjdE1ldGhvZF0gPSB1c2VTdGF0ZShpbml0aWFsQ29udGFjdE1ldGhvZCk7XHJcbiAgY29uc3QgW2FzaXN0ZW50ZVRpcG8sIHNldEFzaXN0ZW50ZVRpcG9dID0gdXNlU3RhdGUoaW5pdGlhbEFzaXN0ZW50ZSk7XHJcbiAgY29uc3QgW2Rlc2NyaXB0aW9uLCBzZXREZXNjcmlwdGlvbl0gPSB1c2VTdGF0ZShTdHJpbmcoZGV0YWlsLmRlc2NyaXB0aW9uID8/IGRldGFpbC5EZXNjcmlwdGlvbiA/PyBcIlwiKSk7XHJcbiAgY29uc3QgW2NvbWVudGFyaW9zLCBzZXRDb21lbnRhcmlvc10gPSB1c2VTdGF0ZShTdHJpbmcoZGV0YWlsLmNvbWVudGFyaW9zID8/IGRldGFpbC5Db21lbnRhcmlvcyA/PyBcIlwiKSk7XHJcbiAgY29uc3QgW2FudGVjZWRlbnRlcywgc2V0QW50ZWNlZGVudGVzXSA9IHVzZVN0YXRlKFN0cmluZyhkZXRhaWwuYW50ZWNlZGVudGVzID8/IGRldGFpbC5BbnRlY2VkZW50ZXMgPz8gXCJcIikpO1xyXG4gIGNvbnN0IFtjb25jbHVzaW9uZXMsIHNldENvbmNsdXNpb25lc10gPSB1c2VTdGF0ZShTdHJpbmcoZGV0YWlsLmNvbmNsdXNpb25lcyA/PyBkZXRhaWwuQ29uY2x1c2lvbmVzID8/IFwiXCIpKTtcclxuICBjb25zdCBbc3RhdHVzLCBzZXRTdGF0dXNdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW2J1c3ksIHNldEJ1c3ldID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtpc0VkaXRpbmcsIHNldElzRWRpdGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW2lzSHlkcmF0aW5nLCBzZXRJc0h5ZHJhdGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW21vZGFsRXJyb3IsIHNldE1vZGFsRXJyb3JdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IHJlYWRPbmx5U3VyZmFjZVJlZiA9IHVzZVJlZihudWxsKTtcbiAgY29uc3QgZWRpdFNuYXBzaG90UmVmID0gdXNlUmVmKG51bGwpO1xuICBjb25zdCBwZXJtaXNzaW9uVHJhY2VSZWYgPSB1c2VSZWYoXCJcIik7XG5cbiAgY29uc3QgcmVjSWQgPSBhY3Rpdml0eVJlY0lkO1xuICBjb25zdCBhY2NvdW50TnVtID0gU3RyaW5nKGRldGFpbC5hY2NvdW50TnVtID8/IGRldGFpbC5BY2NvdW50TnVtID8/IFwiXCIpO1xuICBjb25zdCBhY3RpdmlkYWRJZCA9IFN0cmluZyhkZXRhaWwuYWN0aXZpZGFkSWQgPz8gZGV0YWlsLkFjdGl2aWRhZElkID8/IFwiXCIpO1xuICBjb25zdCBtdXRhdGlvbkFjY2VzcyA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIHJldHVybiByZXNvbHZlTW9kdWxlT3duZXJNdXRhdGlvbkFjY2Vzcyh7XG4gICAgICB1c2Vyc0J5T3duZXJBeFVzZXJJZDogdmlzaWJsZVVzZXJCeU93bmVyQXhVc2VySWQsXG4gICAgICBvd25lckF4VXNlcklkOiBkZXRhaWxPd25lckF4VXNlcklkLFxuICAgICAgdmlld2VyQXhVc2VySWQ6IGF4VXNlcklkLFxuICAgICAgdmlzaWJsZVVzZXJzUmVhZHksXG4gICAgfSk7XG4gIH0sIFtheFVzZXJJZCwgZGV0YWlsT3duZXJBeFVzZXJJZCwgdmlzaWJsZVVzZXJCeU93bmVyQXhVc2VySWQsIHZpc2libGVVc2Vyc1JlYWR5XSk7XG4gIGNvbnN0IHZpc2libGVPd25lciA9IG11dGF0aW9uQWNjZXNzLm93bmVyO1xuICBjb25zdCBkZXRhaWxPd25lclRleHQgPSB2aXNpYmxlT3duZXIgPyBmb3JtYXRNb2R1bGVWaXNpYmxlVXNlckxhYmVsKHZpc2libGVPd25lcikgOiBkZXRhaWxPd25lclJhd1RleHQgfHwgZGV0YWlsT3duZXJBeFVzZXJJZDtcbiAgY29uc3Qgc2hvd093bmVyRmllbGQgPSBtdXRhdGlvbkFjY2Vzcy5yZWFkeSAmJiAhIXZpc2libGVPd25lciAmJiAhbXV0YXRpb25BY2Nlc3MuaXNDdXJyZW50T3duZXI7XG4gIGNvbnN0IG93bmVyQ2FuTXV0YXRlID0gbXV0YXRpb25BY2Nlc3MuY2FuTXV0YXRlICYmIGhhc1NlcnZlck11dGF0aW9uRGVjaXNpb24gJiYgc2VydmVyQ2FuTXV0YXRlVmlzaXQ7XG4gIGNvbnN0IGNhbkVkaXRWaXNpdCA9IGNhbkVkaXRIaXN0b3J5ICYmIG93bmVyQ2FuTXV0YXRlO1xuICBjb25zdCBjYW5EZWxldGVWaXNpdCA9IGNhbkRlbGV0ZUhpc3RvcnkgJiYgb3duZXJDYW5NdXRhdGU7XG4gIGNvbnN0IGlzVmlzaXRFZGl0YWJsZSA9IGlzRWRpdGluZyAmJiBjYW5FZGl0VmlzaXQ7XG4gIGNvbnN0IGxvZ0Jsb2NrZWRQZXJtaXNzaW9uID0gdXNlQ2FsbGJhY2soXG4gICAgKG9wZXJhdGlvbjogXCJlZGl0XCIgfCBcInVwZGF0ZVwiIHwgXCJkZWxldGVcIikgPT4ge1xuICAgICAgbG9nUGVybWlzc2lvblRyYWNlKFwidmlzaXREZXRhaWw6cGVybWlzc2lvbi1ibG9ja2VkXCIsIHtcbiAgICAgICAgb3BlcmF0aW9uLFxuICAgICAgICByZWFzb246IG11dGF0aW9uQWNjZXNzLnJlYXNvbixcbiAgICAgICAgcGVybWlzc2lvbnNSZWFkeTogbXV0YXRpb25BY2Nlc3MucmVhZHksXG4gICAgICAgIGlzQ3VycmVudE93bmVyOiBtdXRhdGlvbkFjY2Vzcy5pc0N1cnJlbnRPd25lcixcbiAgICAgICAgb3duZXJDYW5NdXRhdGUsXG4gICAgICAgIGNsaWVudENhbk11dGF0ZTogbXV0YXRpb25BY2Nlc3MuY2FuTXV0YXRlLFxuICAgICAgICBoYXNTZXJ2ZXJNdXRhdGlvbkRlY2lzaW9uLFxuICAgICAgICBzZXJ2ZXJDYW5NdXRhdGVWaXNpdDogaGFzU2VydmVyTXV0YXRpb25EZWNpc2lvbiA/IHNlcnZlckNhbk11dGF0ZVZpc2l0IDogbnVsbCxcbiAgICAgICAgc2VydmVyTXV0YXRpb25QZXJtaXNzaW9uU3RhdHVzLFxuICAgICAgICBjYW5FZGl0TW9kdWxlOiBjYW5FZGl0SGlzdG9yeSxcbiAgICAgICAgY2FuRGVsZXRlTW9kdWxlOiBjYW5EZWxldGVIaXN0b3J5LFxuICAgICAgICBjYW5FZGl0VmlzaXQsXG4gICAgICAgIGNhbkRlbGV0ZVZpc2l0LFxuICAgICAgICB2aXNpYmxlT3duZXJGb3VuZDogISF2aXNpYmxlT3duZXIsXG4gICAgICAgIHZpc2libGVPd25lclBvbGljeTogdmlzaWJsZU93bmVyPy5tdXRhdGlvblBvbGljeSB8fCBcIlwiLFxuICAgICAgICB2aXNpYmxlT3duZXJQb2xpY3lJbnQ6IHZpc2libGVPd25lcj8ubXV0YXRpb25Qb2xpY3lJbnQgPz8gbnVsbCxcbiAgICAgICAgdmlzaWJsZU93bmVyUG9saWN5TGFiZWw6IHZpc2libGVPd25lcj8ubXV0YXRpb25Qb2xpY3lMYWJlbCB8fCBcIlwiLFxuICAgICAgICB2aXNpYmxlT3duZXJDYW5NdXRhdGU6IHZpc2libGVPd25lcj8uY2FuTXV0YXRlID8/IG51bGwsXG4gICAgICB9KTtcbiAgICB9LFxuICAgIFtcbiAgICAgIGNhbkRlbGV0ZUhpc3RvcnksXG4gICAgICBjYW5EZWxldGVWaXNpdCxcbiAgICAgIGNhbkVkaXRIaXN0b3J5LFxuICAgICAgY2FuRWRpdFZpc2l0LFxuICAgICAgbG9nUGVybWlzc2lvblRyYWNlLFxuICAgICAgbXV0YXRpb25BY2Nlc3MuY2FuTXV0YXRlLFxuICAgICAgbXV0YXRpb25BY2Nlc3MuaXNDdXJyZW50T3duZXIsXG4gICAgICBtdXRhdGlvbkFjY2Vzcy5yZWFzb24sXG4gICAgICBtdXRhdGlvbkFjY2Vzcy5yZWFkeSxcbiAgICAgIGhhc1NlcnZlck11dGF0aW9uRGVjaXNpb24sXG4gICAgICBvd25lckNhbk11dGF0ZSxcbiAgICAgIHNlcnZlckNhbk11dGF0ZVZpc2l0LFxuICAgICAgc2VydmVyTXV0YXRpb25QZXJtaXNzaW9uU3RhdHVzLFxuICAgICAgdmlzaWJsZU93bmVyLFxuICAgIF1cbiAgKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IHRyYWNlS2V5ID0gW1xuICAgICAgcmVjSWQsXG4gICAgICBheFVzZXJJZCxcbiAgICAgIGRldGFpbE93bmVyQXhVc2VySWQsXG4gICAgICBtdXRhdGlvbkFjY2Vzcy5yZWFzb24sXG4gICAgICBtdXRhdGlvbkFjY2Vzcy5yZWFkeSA/IFwicmVhZHlcIiA6IFwicGVuZGluZ1wiLFxuICAgICAgbXV0YXRpb25BY2Nlc3MuY2FuTXV0YXRlID8gXCJjYW5cIiA6IFwiY2Fubm90XCIsXG4gICAgICBoYXNTZXJ2ZXJNdXRhdGlvbkRlY2lzaW9uID8gKHNlcnZlckNhbk11dGF0ZVZpc2l0ID8gXCJzZXJ2ZXItY2FuXCIgOiBcInNlcnZlci1jYW5ub3RcIikgOiBcInNlcnZlci1taXNzaW5nXCIsXG4gICAgICBzZXJ2ZXJNdXRhdGlvblBlcm1pc3Npb25TdGF0dXMsXG4gICAgICBtdXRhdGlvbkFjY2Vzcy5pc0N1cnJlbnRPd25lciA/IFwib3duXCIgOiBcImZvcmVpZ25cIixcbiAgICAgIHZpc2libGVPd25lcj8ubXV0YXRpb25Qb2xpY3kgfHwgXCJcIixcbiAgICAgIHZpc2libGVPd25lcj8ubXV0YXRpb25Qb2xpY3lJbnQgPz8gXCJcIixcbiAgICAgIHZpc2libGVPd25lcj8ubXV0YXRpb25Qb2xpY3lMYWJlbCB8fCBcIlwiLFxuICAgICAgdmlzaWJsZU93bmVyPy5jYW5NdXRhdGUgPz8gXCJcIixcbiAgICAgIGNhbkVkaXRWaXNpdCA/IFwiZWRpdFwiIDogXCJyZWFkXCIsXG4gICAgICBjYW5EZWxldGVWaXNpdCA/IFwiZGVsZXRlXCIgOiBcIm5vZGVsZXRlXCIsXG4gICAgXS5qb2luKFwifFwiKTtcblxuICAgIGlmIChwZXJtaXNzaW9uVHJhY2VSZWYuY3VycmVudCA9PT0gdHJhY2VLZXkpIHJldHVybjtcbiAgICBwZXJtaXNzaW9uVHJhY2VSZWYuY3VycmVudCA9IHRyYWNlS2V5O1xuXG4gICAgbG9nUGVybWlzc2lvblRyYWNlKFwidmlzaXREZXRhaWw6bXV0YXRpb24tZGVjaXNpb25cIiwge1xuICAgICAgcmVhc29uOiBtdXRhdGlvbkFjY2Vzcy5yZWFzb24sXG4gICAgICBwZXJtaXNzaW9uc1JlYWR5OiBtdXRhdGlvbkFjY2Vzcy5yZWFkeSxcbiAgICAgIGlzQ3VycmVudE93bmVyOiBtdXRhdGlvbkFjY2Vzcy5pc0N1cnJlbnRPd25lcixcbiAgICAgIG93bmVyQ2FuTXV0YXRlLFxuICAgICAgY2xpZW50Q2FuTXV0YXRlOiBtdXRhdGlvbkFjY2Vzcy5jYW5NdXRhdGUsXG4gICAgICBoYXNTZXJ2ZXJNdXRhdGlvbkRlY2lzaW9uLFxuICAgICAgc2VydmVyQ2FuTXV0YXRlVmlzaXQ6IGhhc1NlcnZlck11dGF0aW9uRGVjaXNpb24gPyBzZXJ2ZXJDYW5NdXRhdGVWaXNpdCA6IG51bGwsXG4gICAgICBzZXJ2ZXJNdXRhdGlvblBlcm1pc3Npb25TdGF0dXMsXG4gICAgICBjYW5FZGl0TW9kdWxlOiBjYW5FZGl0SGlzdG9yeSxcbiAgICAgIGNhbkRlbGV0ZU1vZHVsZTogY2FuRGVsZXRlSGlzdG9yeSxcbiAgICAgIGNhbkVkaXRWaXNpdCxcbiAgICAgIGNhbkRlbGV0ZVZpc2l0LFxuICAgICAgdmlzaWJsZVVzZXJzUmVhZHksXG4gICAgICB2aXNpYmxlT3duZXJGb3VuZDogISF2aXNpYmxlT3duZXIsXG4gICAgICB2aXNpYmxlT3duZXJBeFVzZXJJZDogdmlzaWJsZU93bmVyPy5heFVzZXJJZCB8fCBcIlwiLFxuICAgICAgdmlzaWJsZU93bmVyU291cmNlOiB2aXNpYmxlT3duZXI/LnNvdXJjZSB8fCBcIlwiLFxuICAgICAgdmlzaWJsZU93bmVyUG9saWN5OiB2aXNpYmxlT3duZXI/Lm11dGF0aW9uUG9saWN5IHx8IFwiXCIsXG4gICAgICB2aXNpYmxlT3duZXJQb2xpY3lJbnQ6IHZpc2libGVPd25lcj8ubXV0YXRpb25Qb2xpY3lJbnQgPz8gbnVsbCxcbiAgICAgIHZpc2libGVPd25lclBvbGljeUxhYmVsOiB2aXNpYmxlT3duZXI/Lm11dGF0aW9uUG9saWN5TGFiZWwgfHwgXCJcIixcbiAgICAgIHZpc2libGVPd25lckNhbk11dGF0ZTogdmlzaWJsZU93bmVyPy5jYW5NdXRhdGUgPz8gbnVsbCxcbiAgICB9KTtcbiAgfSwgW1xuICAgIGF4VXNlcklkLFxuICAgIGNhbkRlbGV0ZUhpc3RvcnksXG4gICAgY2FuRGVsZXRlVmlzaXQsXG4gICAgY2FuRWRpdEhpc3RvcnksXG4gICAgY2FuRWRpdFZpc2l0LFxuICAgIGRldGFpbE93bmVyQXhVc2VySWQsXG4gICAgaGFzU2VydmVyTXV0YXRpb25EZWNpc2lvbixcbiAgICBsb2dQZXJtaXNzaW9uVHJhY2UsXG4gICAgbXV0YXRpb25BY2Nlc3MuY2FuTXV0YXRlLFxuICAgIG11dGF0aW9uQWNjZXNzLmlzQ3VycmVudE93bmVyLFxuICAgIG11dGF0aW9uQWNjZXNzLnJlYXNvbixcbiAgICBtdXRhdGlvbkFjY2Vzcy5yZWFkeSxcbiAgICBvd25lckNhbk11dGF0ZSxcbiAgICByZWNJZCxcbiAgICBzZXJ2ZXJDYW5NdXRhdGVWaXNpdCxcbiAgICBzZXJ2ZXJNdXRhdGlvblBlcm1pc3Npb25TdGF0dXMsXG4gICAgdmlzaWJsZU93bmVyLFxuICAgIHZpc2libGVVc2Vyc1JlYWR5LFxuICBdKTtcblxuICBjb25zdCB7IGVkaXRNb2RlS2V5UmVmLCBzeW5jRWRpdE1vZGVGbGFnLCBjbGVhckRyYWZ0LCBhcHBseURyYWZ0VmFsdWVzIH0gPSB1c2VEZXRhaWxFZGl0U2Vzc2lvbih7XG4gICAgYWN0aXZpZGFkSWQsXG4gICAgcmVjSWQsXG4gICAgY2FuRWRpdEhpc3Rvcnk6IGNhbkVkaXRWaXNpdCxcbiAgICBpc0VkaXRpbmc6IGlzVmlzaXRFZGl0YWJsZSxcbiAgICBzZXRJc0VkaXRpbmcsXHJcbiAgICB0cmFuc0RhdGUsXHJcbiAgICB2aXNpdFR5cGUsXHJcbiAgICBjb250YWN0TWV0aG9kLFxyXG4gICAgYXNpc3RlbnRlVGlwbyxcclxuICAgIGRlc2NyaXB0aW9uLFxyXG4gICAgY29tZW50YXJpb3MsXHJcbiAgICBhbnRlY2VkZW50ZXMsXHJcbiAgICBjb25jbHVzaW9uZXMsXHJcbiAgICBzZXRUcmFuc0RhdGUsXHJcbiAgICBzZXRWaXNpdFR5cGUsXHJcbiAgICBzZXRDb250YWN0TWV0aG9kLFxyXG4gICAgc2V0QXNpc3RlbnRlVGlwbyxcclxuICAgIHNldERlc2NyaXB0aW9uLFxyXG4gICAgc2V0Q29tZW50YXJpb3MsXHJcbiAgICBzZXRBbnRlY2VkZW50ZXMsXHJcbiAgICBzZXRDb25jbHVzaW9uZXMsXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IGhhc1NlcnZlckRldGFpbCA9XHJcbiAgICBoYXNWYWx1ZShyZWNJZCkgJiZcclxuICAgIGhhc1ZhbHVlKGFjY291bnROdW0pICYmXHJcbiAgICBoYXNWYWx1ZShkZXRhaWwudHJhbnNEYXRlIHx8IGRldGFpbC5UcmFuc0RhdGUgfHwgXCJcIik7XHJcblxyXG4gIGNvbnN0IHNob3VsZEh5ZHJhdGUgPSAhIWFjdGl2aWRhZElkICYmICFoYXNTZXJ2ZXJEZXRhaWw7XHJcblxyXG4gIGNvbnN0IG9wZW5UZXh0RWRpdG9yID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoXHJcbiAgICAgIGZpZWxkSWQ6IHN0cmluZyxcclxuICAgICAgZmllbGRMYWJlbDogc3RyaW5nLFxyXG4gICAgICBmaWVsZFZhbHVlOiBzdHJpbmcsXHJcbiAgICAgIG9wdGlvbnM6IHsgYWxsb3dFZGl0PzogYm9vbGVhbjsgcmVhZE9ubHk/OiBib29sZWFuOyBlZGl0TW9kZUtleT86IHN0cmluZyB9ID0ge31cclxuICAgICkgPT4ge1xyXG4gICAgICBuYXZpZ2F0ZVRvVGV4dEVkaXRvckZpZWxkKHtcclxuICAgICAgICBmaWVsZElkLFxyXG4gICAgICAgIGZpZWxkTGFiZWwsXHJcbiAgICAgICAgZmllbGRWYWx1ZSxcclxuICAgICAgICByZWFkT25seTogb3B0aW9ucz8ucmVhZE9ubHkgPT09IHRydWUsXHJcbiAgICAgICAgYWxsb3dFZGl0OiBvcHRpb25zPy5hbGxvd0VkaXQgIT09IGZhbHNlLFxyXG4gICAgICAgIGVkaXRNb2RlS2V5OiBvcHRpb25zPy5lZGl0TW9kZUtleSxcclxuICAgICAgICBlZGl0TW9kZVJldHVyblR0bE1zOiBFRElUT1JfUkVUVVJOX0ZMQUdfVFRMX01TLFxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBbXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUNvbWVudGFyaW9zVGFwID0gdXNlQ2FsbGJhY2soKGV2ZW50KSA9PiB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgb3BlblRleHRFZGl0b3IoZmllbGRJZENvbWVudGFyaW9zLCBpbmRUKFwiVmlzaXRzX0ZpZWxkX0NvbW1lbnRzXCIsIFwiQ29tbWVudHNcIiksIGNvbWVudGFyaW9zLCB7XG4gICAgICByZWFkT25seTogIWlzVmlzaXRFZGl0YWJsZSxcbiAgICAgIGFsbG93RWRpdDogY2FuRWRpdFZpc2l0LFxuICAgICAgZWRpdE1vZGVLZXk6IGVkaXRNb2RlS2V5UmVmLmN1cnJlbnRcbiAgICB9KTtcbiAgfSwgW2NvbWVudGFyaW9zLCBlZGl0TW9kZUtleVJlZiwgZmllbGRJZENvbWVudGFyaW9zLCBpc1Zpc2l0RWRpdGFibGUsIGNhbkVkaXRWaXNpdCwgb3BlblRleHRFZGl0b3JdKTtcblxyXG4gIGNvbnN0IGhhbmRsZUNvbWVudGFyaW9zSG9sZCA9IHVzZUNhbGxiYWNrKCh0YXJnZXQsIGNsaWVudFkpID0+IHtcclxuICAgIGlmICghdGFyZ2V0IHx8ICFpc092ZXJmbG93aW5nKHRhcmdldCkpIHJldHVybiBmYWxzZTtcclxuICAgIHNldFByZXZpZXdBbmNob3IodGFyZ2V0KTtcclxuICAgIHJldHVybiBzaG93UHJldmlld1Rvb2x0aXAoU3RyaW5nKGNvbWVudGFyaW9zIHx8IFwiXCIpLCBjbGllbnRZKTtcclxuICB9LCBbY29tZW50YXJpb3NdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQW50ZWNlZGVudGVzVGFwID0gdXNlQ2FsbGJhY2soKGV2ZW50KSA9PiB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgb3BlblRleHRFZGl0b3IoZmllbGRJZEFudGVjZWRlbnRlcywgaW5kVChcIlZpc2l0c19GaWVsZF9CYWNrZ3JvdW5kXCIsIFwiQmFja2dyb3VuZFwiKSwgYW50ZWNlZGVudGVzLCB7XG4gICAgICByZWFkT25seTogIWlzVmlzaXRFZGl0YWJsZSxcbiAgICAgIGFsbG93RWRpdDogY2FuRWRpdFZpc2l0LFxuICAgICAgZWRpdE1vZGVLZXk6IGVkaXRNb2RlS2V5UmVmLmN1cnJlbnRcbiAgICB9KTtcbiAgfSwgW2FudGVjZWRlbnRlcywgZWRpdE1vZGVLZXlSZWYsIGZpZWxkSWRBbnRlY2VkZW50ZXMsIGlzVmlzaXRFZGl0YWJsZSwgY2FuRWRpdFZpc2l0LCBvcGVuVGV4dEVkaXRvcl0pO1xuXHJcbiAgY29uc3QgaGFuZGxlQW50ZWNlZGVudGVzSG9sZCA9IHVzZUNhbGxiYWNrKCh0YXJnZXQsIGNsaWVudFkpID0+IHtcclxuICAgIGlmICghdGFyZ2V0IHx8ICFpc092ZXJmbG93aW5nKHRhcmdldCkpIHJldHVybiBmYWxzZTtcclxuICAgIHNldFByZXZpZXdBbmNob3IodGFyZ2V0KTtcclxuICAgIHJldHVybiBzaG93UHJldmlld1Rvb2x0aXAoU3RyaW5nKGFudGVjZWRlbnRlcyB8fCBcIlwiKSwgY2xpZW50WSk7XHJcbiAgfSwgW2FudGVjZWRlbnRlc10pO1xyXG5cclxuICBjb25zdCBoYW5kbGVDb25jbHVzaW9uZXNUYXAgPSB1c2VDYWxsYmFjaygoZXZlbnQpID0+IHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBvcGVuVGV4dEVkaXRvcihmaWVsZElkQ29uY2x1c2lvbmVzLCBpbmRUKFwiVmlzaXRzX0ZpZWxkX0NvbmNsdXNpb25zXCIsIFwiQ29uY2x1c2lvbnNcIiksIGNvbmNsdXNpb25lcywge1xuICAgICAgcmVhZE9ubHk6ICFpc1Zpc2l0RWRpdGFibGUsXG4gICAgICBhbGxvd0VkaXQ6IGNhbkVkaXRWaXNpdCxcbiAgICAgIGVkaXRNb2RlS2V5OiBlZGl0TW9kZUtleVJlZi5jdXJyZW50XG4gICAgfSk7XG4gIH0sIFtjb25jbHVzaW9uZXMsIGVkaXRNb2RlS2V5UmVmLCBmaWVsZElkQ29uY2x1c2lvbmVzLCBpc1Zpc2l0RWRpdGFibGUsIGNhbkVkaXRWaXNpdCwgb3BlblRleHRFZGl0b3JdKTtcblxyXG4gIGNvbnN0IGhhbmRsZUNvbmNsdXNpb25lc0hvbGQgPSB1c2VDYWxsYmFjaygodGFyZ2V0LCBjbGllbnRZKSA9PiB7XHJcbiAgICBpZiAoIXRhcmdldCB8fCAhaXNPdmVyZmxvd2luZyh0YXJnZXQpKSByZXR1cm4gZmFsc2U7XHJcbiAgICBzZXRQcmV2aWV3QW5jaG9yKHRhcmdldCk7XHJcbiAgICByZXR1cm4gc2hvd1ByZXZpZXdUb29sdGlwKFN0cmluZyhjb25jbHVzaW9uZXMgfHwgXCJcIiksIGNsaWVudFkpO1xyXG4gIH0sIFtjb25jbHVzaW9uZXNdKTtcclxuXHJcbiAgY29uc3QgY29tZW50YXJpb3NUYXAgPSB1c2VUYXBHdWFyZChoYW5kbGVDb21lbnRhcmlvc1RhcCwgaGFuZGxlQ29tZW50YXJpb3NIb2xkKTtcclxuICBjb25zdCBhbnRlY2VkZW50ZXNUYXAgPSB1c2VUYXBHdWFyZChoYW5kbGVBbnRlY2VkZW50ZXNUYXAsIGhhbmRsZUFudGVjZWRlbnRlc0hvbGQpO1xyXG4gIGNvbnN0IGNvbmNsdXNpb25lc1RhcCA9IHVzZVRhcEd1YXJkKGhhbmRsZUNvbmNsdXNpb25lc1RhcCwgaGFuZGxlQ29uY2x1c2lvbmVzSG9sZCk7XHJcblxyXG4gIGNvbnN0IHRleHRFZGl0b3JCaW5kaW5ncyA9IHVzZU1lbW8oXG4gICAgKCkgPT4gW1xuICAgICAgeyBmaWVsZElkOiBmaWVsZElkQ29tZW50YXJpb3MsIGFwcGx5VmFsdWU6IHNldENvbWVudGFyaW9zIH0sXG4gICAgICB7IGZpZWxkSWQ6IGZpZWxkSWRBbnRlY2VkZW50ZXMsIGFwcGx5VmFsdWU6IHNldEFudGVjZWRlbnRlcyB9LFxuICAgICAgeyBmaWVsZElkOiBmaWVsZElkQ29uY2x1c2lvbmVzLCBhcHBseVZhbHVlOiBzZXRDb25jbHVzaW9uZXMgfSxcbiAgICBdLFxyXG4gICAgW2ZpZWxkSWRBbnRlY2VkZW50ZXMsIGZpZWxkSWRDb21lbnRhcmlvcywgZmllbGRJZENvbmNsdXNpb25lc11cclxuICApO1xyXG5cclxuICBjb25zdCB7IGFwcGx5VmFsdWVzOiBhcHBseVRleHRFZGl0b3JWYWx1ZXMgfSA9IHVzZVRleHRFZGl0b3JGaWVsZHModGV4dEVkaXRvckJpbmRpbmdzLCB7XG4gICAgYXBwbHlPbk1vdW50OiAhYWN0aXZpZGFkSWQsXG4gICAgbGlzdGVuUGFnZVNob3c6IHRydWUsXG4gICAgZW5hYmxlZDogY2FuRWRpdFZpc2l0LFxuICB9KTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghbXV0YXRpb25BY2Nlc3MucmVhZHkgfHwgY2FuRWRpdFZpc2l0KSByZXR1cm47XG5cbiAgICBjbGVhclRleHRFZGl0b3JWYWx1ZShmaWVsZElkQ29tZW50YXJpb3MpO1xuICAgIGNsZWFyVGV4dEVkaXRvclZhbHVlKGZpZWxkSWRBbnRlY2VkZW50ZXMpO1xuICAgIGNsZWFyVGV4dEVkaXRvclZhbHVlKGZpZWxkSWRDb25jbHVzaW9uZXMpO1xuICB9LCBbY2FuRWRpdFZpc2l0LCBmaWVsZElkQW50ZWNlZGVudGVzLCBmaWVsZElkQ29tZW50YXJpb3MsIGZpZWxkSWRDb25jbHVzaW9uZXMsIG11dGF0aW9uQWNjZXNzLnJlYWR5XSk7XG5cclxuICBjb25zdCB7IG1vZGFsLCBvcGVuQ29uZmlybSwgY2xvc2VDb25maXJtLCBoYW5kbGVDb25maXJtIH0gPSB1c2VDb25maXJtRGlhbG9nKHtcclxuICAgIGRlZmF1bHRDb25maXJtVGV4dDogaW5kVChcIkNvbmZpcm1fWWVzXCIsIFwiQ29uZmlybV9ZZXNcIiksXHJcbiAgICBkZWZhdWx0Q2FuY2VsVGV4dDogaW5kVChcIkNvbmZpcm1fTm9cIiwgXCJDb25maXJtX05vXCIpXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZU1vZGFsQ29uZmlybSA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcclxuICAgIHNldE1vZGFsRXJyb3IoXCJcIik7XHJcbiAgICBhd2FpdCBoYW5kbGVDb25maXJtKHtcclxuICAgICAgYnVzeSxcclxuICAgICAgb25FcnJvcjogKG1zZykgPT4ge1xyXG4gICAgICAgIHNldE1vZGFsRXJyb3IobXNnKTtcclxuICAgICAgICBzZXRTdGF0dXMobXNnKTtcclxuICAgICAgICBmbGFzaEFjdGlvbk1hcmsoXCJlcnJvclByb2Nlc3NcIiwgMTUwMCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0sIFtidXN5LCBoYW5kbGVDb25maXJtXSk7XHJcblxyXG4gIGNvbnN0IG1vZGFsTG9hZGluZ1RleHQgPSBpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJDb21tb25fTG9hZGluZ1wiKTtcclxuICBjb25zdCBtb2RhbENhbmNlbFRleHQgPSBtb2RhbC5jYW5jZWxUZXh0IHx8IGluZFQoXCJDb25maXJtX05vXCIsIFwiQ29uZmlybV9Ob1wiKTtcclxuICBjb25zdCBtb2RhbENvbmZpcm1UZXh0ID0gYnVzeVxyXG4gICAgPyBtb2RhbExvYWRpbmdUZXh0XHJcbiAgICA6ICghYnVzeSAmJiBtb2RhbEVycm9yID8gaW5kVChcIkNvbW1vbl9PS1wiLCBcIkNvbW1vbl9PS1wiKSA6IChtb2RhbC5jb25maXJtVGV4dCB8fCBpbmRUKFwiQ29uZmlybV9ZZXNcIiwgXCJDb25maXJtX1llc1wiKSkpO1xyXG5cclxuICBjb25zdCBoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm0gPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAoIWJ1c3kgJiYgbW9kYWxFcnJvcikge1xyXG4gICAgICBjbG9zZUNvbmZpcm0oKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaGFuZGxlTW9kYWxDb25maXJtKCk7XHJcbiAgfSwgW2J1c3ksIG1vZGFsRXJyb3IsIGNsb3NlQ29uZmlybSwgaGFuZGxlTW9kYWxDb25maXJtXSk7XHJcblxyXG4gIGNvbnN0IGhhc0FjdGl2ZVByb2Nlc3MgPSB1c2VNZW1vKCgpID0+IGJ1c3kgfHwgaXNWaXNpdEVkaXRhYmxlLCBbYnVzeSwgaXNWaXNpdEVkaXRhYmxlXSk7XG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgd2luZG93Ll9faW5kU2V0TmF2aWdhdGlvbkd1YXJkPy4oaGFzQWN0aXZlUHJvY2Vzcyk7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICB3aW5kb3cuX19pbmRDbGVhck5hdmlnYXRpb25HdWFyZD8uKCk7XHJcbiAgICB9O1xyXG4gIH0sIFtoYXNBY3RpdmVQcm9jZXNzXSk7XHJcblxyXG4gIHVzZURldGFpbEh5ZHJhdGlvbih7XHJcbiAgICBhY3RpdmlkYWRJZCxcclxuICAgIHNob3VsZEh5ZHJhdGUsXHJcbiAgICB2aXNpdFR5cGVzLFxyXG4gICAgY29udGFjdE1ldGhvZHMsXHJcbiAgICBhc2lzdGVudGVUaXBvcyxcclxuICAgIGRlZmF1bHRWaXNpdFR5cGUsXHJcbiAgICBpbml0aWFsQXNpc3RlbnRlLFxyXG4gICAgbm9ybWFsaXplRGF0ZVRvSW5wdXQsXHJcbiAgICBtYXRjaE9wdGlvblZhbHVlLFxyXG4gICAgYXBwbHlEcmFmdFZhbHVlcyxcclxuICAgIGFwcGx5VGV4dEVkaXRvclZhbHVlcyxcclxuICAgIHNldFN0YXR1cyxcclxuICAgIHNldElzSHlkcmF0aW5nLFxyXG4gICAgc2V0VHJhbnNEYXRlLFxyXG4gICAgc2V0VmlzaXRUeXBlLFxyXG4gICAgc2V0Q29udGFjdE1ldGhvZCxcclxuICAgIHNldEFzaXN0ZW50ZVRpcG8sXHJcbiAgICBzZXREZXNjcmlwdGlvbixcclxuICAgIHNldENvbWVudGFyaW9zLFxyXG4gICAgc2V0QW50ZWNlZGVudGVzLFxyXG4gICAgc2V0Q29uY2x1c2lvbmVzLFxyXG4gIH0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3QgZWwgPSByZWFkT25seVN1cmZhY2VSZWYuY3VycmVudDtcclxuICAgIGlmICghZWwpIHJldHVybjtcclxuICAgIGlmICghaXNWaXNpdEVkaXRhYmxlKSB7XG4gICAgICBlbC5jbGFzc0xpc3QuYWRkKFwiaW5kLXJlYWRvbmx5LXN1cmZhY2VcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoXCJpbmQtcmVhZG9ubHktc3VyZmFjZVwiKTtcbiAgICB9XG4gIH0sIFtpc1Zpc2l0RWRpdGFibGVdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChpc1Zpc2l0RWRpdGFibGUpIHtcbiAgICAgIGlmICghZWRpdFNuYXBzaG90UmVmLmN1cnJlbnQpIHtcbiAgICAgICAgZWRpdFNuYXBzaG90UmVmLmN1cnJlbnQgPSB7XG4gICAgICAgICAgdHJhbnNEYXRlLFxyXG4gICAgICAgICAgdmlzaXRUeXBlLFxyXG4gICAgICAgICAgY29udGFjdE1ldGhvZCxcclxuICAgICAgICAgIGFzaXN0ZW50ZVRpcG8sXHJcbiAgICAgICAgICBkZXNjcmlwdGlvbixcclxuICAgICAgICAgIGNvbWVudGFyaW9zLFxyXG4gICAgICAgICAgYW50ZWNlZGVudGVzLFxyXG4gICAgICAgICAgY29uY2x1c2lvbmVzXHJcbiAgICAgICAgfTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm47XHJcbiAgICB9XG4gICAgZWRpdFNuYXBzaG90UmVmLmN1cnJlbnQgPSBudWxsO1xuICB9LCBbaXNWaXNpdEVkaXRhYmxlLCB0cmFuc0RhdGUsIHZpc2l0VHlwZSwgY29udGFjdE1ldGhvZCwgYXNpc3RlbnRlVGlwbywgZGVzY3JpcHRpb24sIGNvbWVudGFyaW9zLCBhbnRlY2VkZW50ZXMsIGNvbmNsdXNpb25lc10pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKGlzVmlzaXRFZGl0YWJsZSkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICByZXR1cm4gYmluZFJlYWRPbmx5R3VhcmQocmVhZE9ubHlTdXJmYWNlUmVmLmN1cnJlbnQpO1xuICB9LCBbaXNWaXNpdEVkaXRhYmxlXSk7XG5cbiAgY29uc3QgaGFuZGxlRW5hYmxlRWRpdCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoIWNhbkVkaXRWaXNpdCkge1xuICAgICAgbG9nQmxvY2tlZFBlcm1pc3Npb24oXCJlZGl0XCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzZXRJc0VkaXRpbmcodHJ1ZSk7XG4gICAgc3luY0VkaXRNb2RlRmxhZyh0cnVlKTtcbiAgICBzZXRTdGF0dXMoaW5kVChcIlZpc2l0c19EZXRhaWxfRWRpdGluZ0VuYWJsZWRcIiwgXCJFZGl0aW5nIGVuYWJsZWRcIikpO1xuICB9LCBbY2FuRWRpdFZpc2l0LCBsb2dCbG9ja2VkUGVybWlzc2lvbiwgc3luY0VkaXRNb2RlRmxhZ10pO1xuXHJcbiAgY29uc3QgaGFuZGxlQ2FuY2VsRWRpdCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmICghaXNFZGl0aW5nKSByZXR1cm47XHJcbiAgICBzZXRJc0VkaXRpbmcoZmFsc2UpO1xyXG4gICAgc3luY0VkaXRNb2RlRmxhZyhmYWxzZSk7XHJcbiAgICBjbGVhckRyYWZ0KCk7XHJcbiAgICBzZXRTdGF0dXMoaW5kVChcIkNvbW1vbl9DYW5jZWxcIiwgXCJDYW5jZWxcIikpO1xyXG4gICAgd2luZG93Ll9faW5kQnlwYXNzTmF2aWdhdGlvbkd1YXJkT25jZT8uKCk7XHJcbiAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgfSwgW2lzRWRpdGluZywgc3luY0VkaXRNb2RlRmxhZywgY2xlYXJEcmFmdF0pO1xyXG5cclxuICBjb25zdCB7IGhhbmRsZVVwZGF0ZSwgaGFuZGxlRGVsZXRlIH0gPSB1c2VEZXRhaWxNdXRhdGlvbnMoe1xyXG4gICAgYnVzeSxcbiAgICBpc0VkaXRpbmc6IGlzVmlzaXRFZGl0YWJsZSxcbiAgICBjYW5FZGl0SGlzdG9yeTogY2FuRWRpdFZpc2l0LFxuICAgIGNhbkRlbGV0ZUhpc3Rvcnk6IGNhbkRlbGV0ZVZpc2l0LFxuICAgIHJlY0lkLFxyXG4gICAgYWNjb3VudE51bSxcclxuICAgIHRyYW5zRGF0ZSxcclxuICAgIHZpc2l0VHlwZSxcclxuICAgIGNvbnRhY3RNZXRob2QsXHJcbiAgICBhc2lzdGVudGVUaXBvLFxyXG4gICAgZGVzY3JpcHRpb24sXHJcbiAgICBjb21lbnRhcmlvcyxcclxuICAgIGFudGVjZWRlbnRlcyxcclxuICAgIGNvbmNsdXNpb25lcyxcclxuICAgIHZpc2l0VHlwZXMsXHJcbiAgICBjb250YWN0TWV0aG9kcyxcclxuICAgIGFzaXN0ZW50ZVRpcG9zLFxyXG4gICAgZGVmYXVsdFZpc2l0VHlwZSxcclxuICAgIHJhd0luaXRpYWxWaXNpdFR5cGUsXHJcbiAgICByYXdJbml0aWFsQ29udGFjdE1ldGhvZCxcclxuICAgIHJhd0luaXRpYWxBc2lzdGVudGUsXHJcbiAgICBtYXRjaE9wdGlvblZhbHVlLFxyXG4gICAgY2xlYXJEcmFmdCxcbiAgICBzeW5jRWRpdE1vZGVGbGFnLFxuICAgIG9uUGVybWlzc2lvbkJsb2NrZWQ6IGxvZ0Jsb2NrZWRQZXJtaXNzaW9uLFxuICAgIHNldE1vZGFsRXJyb3IsXG4gICAgc2V0QnVzeSxcbiAgICBzZXRTdGF0dXMsXHJcbiAgICBzZXRJc0VkaXRpbmcsXHJcbiAgfSk7XHJcblxyXG4gIHVzZURldGFpbFRvcGJhckFjdGlvbnMoe1xyXG4gICAgYnVzeSxcbiAgICBtb2RhbE9wZW46IG1vZGFsLm9wZW4sXG4gICAgaXNFZGl0aW5nOiBpc1Zpc2l0RWRpdGFibGUsXG4gICAgY2FuRWRpdEhpc3Rvcnk6IGNhbkVkaXRWaXNpdCxcbiAgICBjYW5EZWxldGVIaXN0b3J5OiBjYW5EZWxldGVWaXNpdCxcbiAgICB0cmFuc0RhdGUsXG4gICAgc2V0TW9kYWxFcnJvcixcclxuICAgIGhhbmRsZUVuYWJsZUVkaXQsXHJcbiAgICBoYW5kbGVDYW5jZWxFZGl0LFxyXG4gICAgaGFuZGxlVXBkYXRlLFxuICAgIGhhbmRsZURlbGV0ZSxcbiAgICBvblBlcm1pc3Npb25CbG9ja2VkOiBsb2dCbG9ja2VkUGVybWlzc2lvbixcbiAgICBvcGVuQ29uZmlybSxcbiAgICBjbG9zZUNvbmZpcm0sXG4gICAgcGVybWlzc2lvbnNSZWFkeTogbXV0YXRpb25BY2Nlc3MucmVhZHksXG4gIH0pO1xuXHJcbiAgY29uc3QgZGVzY3JpcHRpb25MYWJlbCA9IGluZFQoXCJWaXNpdHNfRmllbGRfRGVzY3JpcHRpb25cIiwgXCJEZXNjcmlwdGlvblwiKTtcclxuICBjb25zdCBjb21tZW50c0xhYmVsID0gaW5kVChcIlZpc2l0c19GaWVsZF9Db21tZW50c1wiLCBcIkNvbW1lbnRzXCIpO1xyXG4gIGNvbnN0IGJhY2tncm91bmRMYWJlbCA9IGluZFQoXCJWaXNpdHNfRmllbGRfQmFja2dyb3VuZFwiLCBcIkJhY2tncm91bmRcIik7XHJcbiAgY29uc3QgY29uY2x1c2lvbnNMYWJlbCA9IGluZFQoXCJWaXNpdHNfRmllbGRfQ29uY2x1c2lvbnNcIiwgXCJDb25jbHVzaW9uc1wiKTtcclxuICBjb25zdCBkZXRhaWxEZXNjcmlwdGlvbkNsYXNzTmFtZSA9IGNsYXNzTmFtZXMoXG4gICAgXCJmb3JtLWNvbnRyb2xcIixcbiAgICBpc1Zpc2l0RWRpdGFibGUgPyBcImJvcmRlci1uZXV0cmFsLTIwMCB0ZXh0LW5ldXRyYWwtOTAwXCIgOiBcImJvcmRlci1uZXV0cmFsLTIwMCBpbmQtcmVhZG9ubHktZmllbGRcIlxuICApO1xuICBjb25zdCBkZXRhaWxSZWFkT25seUNsYXNzTmFtZSA9IGNsYXNzTmFtZXMoXCJmb3JtLWNvbnRyb2wgY3Vyc29yLXBvaW50ZXJcIiwgIWlzVmlzaXRFZGl0YWJsZSA/IFwiaW5kLXJlYWRvbmx5LWZpZWxkXCIgOiBcIlwiKTtcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNFwiPlxyXG4gICAgICA8Q29uZmlybU1vZGFsXHJcbiAgICAgICAgb3Blbj17bW9kYWwub3Blbn1cclxuICAgICAgICB0aXRsZT17bW9kYWwudGl0bGV9XHJcbiAgICAgICAgbWVzc2FnZT17bW9kYWwubWVzc2FnZX1cclxuICAgICAgICBjb25maXJtVGV4dD17bW9kYWxDb25maXJtVGV4dH1cclxuICAgICAgICBjYW5jZWxUZXh0PXttb2RhbENhbmNlbFRleHR9XHJcbiAgICAgICAgbG9hZGluZ1RleHQ9e21vZGFsTG9hZGluZ1RleHR9XHJcbiAgICAgICAgc2hvd0NhbmNlbD17bW9kYWwuc2hvd0NhbmNlbH1cclxuICAgICAgICBzaG93Q29uZmlybT17bW9kYWwuc2hvd0NvbmZpcm19XHJcbiAgICAgICAgYnVzeT17YnVzeX1cclxuICAgICAgICBlcnJvcj17bW9kYWxFcnJvcn1cclxuICAgICAgICBzdGF0dXM9e3N0YXR1c31cclxuICAgICAgICBvbkNvbmZpcm09e2hhbmRsZU1vZGFsQnV0dG9uQ29uZmlybX1cclxuICAgICAgICBvbkNhbmNlbD17Y2xvc2VDb25maXJtfVxyXG4gICAgICAvPlxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgcmVmPXtyZWFkT25seVN1cmZhY2VSZWZ9XHJcbiAgICAgICAgY2xhc3NOYW1lPVwicmVsYXRpdmUgc2hhZG93LXhzIGdsYXNzLXBhbmVsIHAtNCBzcGFjZS15LTQgYm9yZGVyIGJvcmRlci1uZXV0cmFsLTIwMCByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXVwiXHJcbiAgICAgID5cclxuICAgICAgICB7aXNIeWRyYXRpbmcgJiYgKFxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIHotMTAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgYmctd2hpdGUvNzAgcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV1cIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0ZXh0LXNtIHRleHQtbmV1dHJhbC02MDBcIj5cclxuICAgICAgICAgICAgICA8U3Bpbm5lciBzaXplPVwic2l6ZS01XCIgLz5cclxuICAgICAgICAgICAgICA8c3Bhbj57aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX08L3NwYW4+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKX1cclxuICAgICAgICB7c2hvd093bmVyRmllbGQgJiYgKFxuICAgICAgICAgIDxEZXRhaWxPd25lckZpZWxkIGxhYmVsPXtpbmRUKFwiVmlzaXRzX0RldGFpbF9Pd25lcl9MYWJlbFwiLCBcIk93bmVyXCIpfSB2YWx1ZT17ZGV0YWlsT3duZXJUZXh0fSAvPlxuICAgICAgICApfVxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMyBnYXAtNCBwdC0xXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ2aXNpdGEtZmllbGQtdGV4dFwiPlxyXG4gICAgICAgICAgICA8U2luZ2xlRGF0ZVBpY2tlclxyXG4gICAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiVmlzaXRzX0RldGFpbF9EYXRlX0xhYmVsXCIsIFwiRGF0ZVwiKX1cclxuICAgICAgICAgICAgICB2YWx1ZT17dHJhbnNEYXRlfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17c2V0VHJhbnNEYXRlfVxuICAgICAgICAgICAgICBkaXNhYmxlZD17IWlzVmlzaXRFZGl0YWJsZX1cbiAgICAgICAgICAgICAgcmVhZE9ubHk9eyFpc1Zpc2l0RWRpdGFibGV9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPFNlbGVjdENvbWJvYm94XHJcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiVmlzaXRzX0RldGFpbF9WaXNpdFR5cGVfTGFiZWxcIiwgXCJWaXNpdCB0eXBlXCIpfVxyXG4gICAgICAgICAgICBvcHRpb25zPXt2aXNpdFR5cGVzfVxyXG4gICAgICAgICAgICB2YWx1ZT17dmlzaXRUeXBlfVxuICAgICAgICAgICAgb25DaGFuZ2U9e3NldFZpc2l0VHlwZX1cbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiVmlzaXRzX0RldGFpbF9WaXNpdFR5cGVfUGxhY2Vob2xkZXJcIiwgXCJTZWxlY3QgdHlwZVwiKX1cbiAgICAgICAgICAgIGRpc2FibGVkPXshaXNWaXNpdEVkaXRhYmxlfVxuICAgICAgICAgICAgcmVhZE9ubHk9eyFpc1Zpc2l0RWRpdGFibGV9XG4gICAgICAgICAgICB1c2VQb3J0YWw9e2ZhbHNlfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPFNlbGVjdENvbWJvYm94XHJcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiVmlzaXRzX0RldGFpbF9Db250YWN0TWV0aG9kX0xhYmVsXCIsIFwiQ29udGFjdCBtZXRob2RcIil9XHJcbiAgICAgICAgICAgIG9wdGlvbnM9e2NvbnRhY3RNZXRob2RzfVxyXG4gICAgICAgICAgICB2YWx1ZT17Y29udGFjdE1ldGhvZH1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXtzZXRDb250YWN0TWV0aG9kfVxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJWaXNpdHNfRGV0YWlsX0NvbnRhY3RNZXRob2RfUGxhY2Vob2xkZXJcIiwgXCJTZWxlY3QgbWV0aG9kXCIpfVxuICAgICAgICAgICAgZGlzYWJsZWQ9eyFpc1Zpc2l0RWRpdGFibGV9XG4gICAgICAgICAgICByZWFkT25seT17IWlzVmlzaXRFZGl0YWJsZX1cbiAgICAgICAgICAgIHVzZVBvcnRhbD17ZmFsc2V9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIDxWaXNpdE5hcnJhdGl2ZUZpZWxkc1xyXG4gICAgICAgICAgZGVzY3JpcHRpb25MYWJlbD17ZGVzY3JpcHRpb25MYWJlbH1cclxuICAgICAgICAgIGRlc2NyaXB0aW9uVmFsdWU9e2Rlc2NyaXB0aW9ufVxuICAgICAgICAgIGRlc2NyaXB0aW9uQ2xhc3NOYW1lPXtkZXRhaWxEZXNjcmlwdGlvbkNsYXNzTmFtZX1cbiAgICAgICAgICBkZXNjcmlwdGlvbkRpc2FibGVkPXshaXNWaXNpdEVkaXRhYmxlfVxuICAgICAgICAgIG9uRGVzY3JpcHRpb25DaGFuZ2U9e3NldERlc2NyaXB0aW9ufVxyXG4gICAgICAgICAgdGFwRmllbGRzPXtbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBpZDogXCJjb21lbnRhcmlvc1wiLFxyXG4gICAgICAgICAgICAgIGxhYmVsOiBjb21tZW50c0xhYmVsLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiBjb21lbnRhcmlvcyxcclxuICAgICAgICAgICAgICBjbGFzc05hbWU6IGRldGFpbFJlYWRPbmx5Q2xhc3NOYW1lLFxyXG4gICAgICAgICAgICAgIHBvaW50ZXJCaW5kaW5nczogY29tZW50YXJpb3NUYXAsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBpZDogXCJhbnRlY2VkZW50ZXNcIixcclxuICAgICAgICAgICAgICBsYWJlbDogYmFja2dyb3VuZExhYmVsLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiBhbnRlY2VkZW50ZXMsXHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lOiBkZXRhaWxSZWFkT25seUNsYXNzTmFtZSxcclxuICAgICAgICAgICAgICBwb2ludGVyQmluZGluZ3M6IGFudGVjZWRlbnRlc1RhcCxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIGlkOiBcImNvbmNsdXNpb25lc1wiLFxyXG4gICAgICAgICAgICAgIGxhYmVsOiBjb25jbHVzaW9uc0xhYmVsLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiBjb25jbHVzaW9uZXMsXHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lOiBkZXRhaWxSZWFkT25seUNsYXNzTmFtZSxcclxuICAgICAgICAgICAgICBwb2ludGVyQmluZGluZ3M6IGNvbmNsdXNpb25lc1RhcCxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIF19XHJcbiAgICAgICAgLz5cclxuXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMyB0ZXh0LXNtIHRleHQtbmV1dHJhbC02MDBcIj5cclxuICAgICAgICAgIDxzcGFuPntzdGF0dXN9PC9zcGFuPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG4vLyBEZXRhaWwgVUkgd3JhcHBlZCBieSB0aGUgZXJyb3IgYm91bmRhcnkuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBEZXRhaWxGb3JtKHByb3BzOiBEZXRhaWxGb3JtUHJvcHMpIHtcbiAgcmV0dXJuIChcbiAgICA8QXBwRXJyb3JCb3VuZGFyeSBmYWxsYmFja01lc3NhZ2U9e2luZFQoXCJWaXNpdHNfRGV0YWlsX0Vycm9yQm91bmRhcnlcIiwgXCJBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSByZW5kZXJpbmcgdGhlIGRldGFpbCBwYWdlLiBSZWxvYWQgYW5kIHRyeSBhZ2Fpbi5cIil9PlxuICAgICAgPERldGFpbEFwcCB7Li4ucHJvcHN9IC8+XG4gICAgPC9BcHBFcnJvckJvdW5kYXJ5PlxuICApO1xufVxuIiwgImV4cG9ydCBjb25zdCBiaW5kUmVhZE9ubHlHdWFyZCA9IChlbDogSFRNTEVsZW1lbnQgfCBudWxsKSA9PiB7XHJcbiAgaWYgKCFlbCkgcmV0dXJuICgpID0+IHt9O1xyXG4gIGNvbnN0IGNhbmNlbCA9IChldmVudDogRXZlbnQpID0+IGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgY29uc3QgZXZlbnRzID0gW1wiY29udGV4dG1lbnVcIiwgXCJzZWxlY3RzdGFydFwiLCBcImNvcHlcIiwgXCJjdXRcIiwgXCJwYXN0ZVwiXTtcclxuICBldmVudHMuZm9yRWFjaCgoZXZ0KSA9PiBlbC5hZGRFdmVudExpc3RlbmVyKGV2dCwgY2FuY2VsKSk7XHJcbiAgcmV0dXJuICgpID0+IHtcclxuICAgIGV2ZW50cy5mb3JFYWNoKChldnQpID0+IGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0LCBjYW5jZWwpKTtcclxuICB9O1xyXG59O1xyXG4iLCAiZXhwb3J0IGNvbnN0IGhhc1ZhbHVlID0gKHZhbHVlOiB1bmtub3duKSA9PiBTdHJpbmcodmFsdWUgfHwgXCJcIikudHJpbSgpLmxlbmd0aCA+IDA7XHJcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0IH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IGZldGNoSnNvbiB9IGZyb20gXCIuLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5cclxudHlwZSBPcHRpb25MaWtlID0ge1xyXG4gIHZhbHVlPzogc3RyaW5nIHwgbnVtYmVyO1xyXG4gIFZhbHVlPzogc3RyaW5nIHwgbnVtYmVyO1xyXG4gIHRleHQ/OiBzdHJpbmc7XHJcbiAgVGV4dD86IHN0cmluZztcclxufTtcclxuXHJcbnR5cGUgQWN0aXZpdHlEZXRhaWxSZWNvcmQgPSBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPjtcclxuXHJcbnR5cGUgQWN0aXZpdHlEZXRhaWxSZXNwb25zZSA9IHtcclxuICBzdWNjZXNzPzogYm9vbGVhbjtcclxuICBtZXNzYWdlPzogc3RyaW5nO1xyXG4gIGRhdGE/OiBBY3Rpdml0eURldGFpbFJlY29yZCB8IG51bGw7XHJcbiAgU3VjY2Vzcz86IGJvb2xlYW47XHJcbiAgTWVzc2FnZT86IHN0cmluZztcclxuICBEYXRhPzogQWN0aXZpdHlEZXRhaWxSZWNvcmQgfCBudWxsO1xyXG59O1xyXG5cclxuY29uc3QgaXNSZXNwb25zZVN1Y2Nlc3MgPSAocmVzcG9uc2U6IEFjdGl2aXR5RGV0YWlsUmVzcG9uc2UpOiBib29sZWFuID0+IHtcclxuICByZXR1cm4gcmVzcG9uc2Uuc3VjY2VzcyA9PT0gdHJ1ZSB8fCByZXNwb25zZS5TdWNjZXNzID09PSB0cnVlO1xyXG59O1xyXG5cclxuY29uc3QgZ2V0UmVzcG9uc2VNZXNzYWdlID0gKHJlc3BvbnNlOiBBY3Rpdml0eURldGFpbFJlc3BvbnNlKTogc3RyaW5nID0+IHtcclxuICBjb25zdCByYXcgPSByZXNwb25zZS5tZXNzYWdlID8/IHJlc3BvbnNlLk1lc3NhZ2U7XHJcbiAgcmV0dXJuIHR5cGVvZiByYXcgPT09IFwic3RyaW5nXCIgPyByYXcudHJpbSgpIDogXCJcIjtcclxufTtcclxuXHJcbmNvbnN0IGdldFJlc3BvbnNlRGF0YSA9IChyZXNwb25zZTogQWN0aXZpdHlEZXRhaWxSZXNwb25zZSk6IEFjdGl2aXR5RGV0YWlsUmVjb3JkIHwgbnVsbCA9PiB7XHJcbiAgY29uc3QgZGF0YSA9IHJlc3BvbnNlLmRhdGEgPz8gcmVzcG9uc2UuRGF0YTtcclxuICByZXR1cm4gZGF0YSAmJiB0eXBlb2YgZGF0YSA9PT0gXCJvYmplY3RcIiA/IGRhdGEgOiBudWxsO1xyXG59O1xyXG5cclxuY29uc3QgYXNSZWNvcmQgPSAodmFsdWU6IHVua25vd24pOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiB8IG51bGwgPT4ge1xyXG4gIGlmICghdmFsdWUgfHwgdHlwZW9mIHZhbHVlICE9PSBcIm9iamVjdFwiIHx8IEFycmF5LmlzQXJyYXkodmFsdWUpKSByZXR1cm4gbnVsbDtcclxuICByZXR1cm4gdmFsdWUgYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj47XHJcbn07XHJcblxyXG50eXBlIFVzZURldGFpbEh5ZHJhdGlvbkFyZ3MgPSB7XHJcbiAgYWN0aXZpZGFkSWQ6IHN0cmluZztcclxuICBzaG91bGRIeWRyYXRlOiBib29sZWFuO1xyXG4gIHZpc2l0VHlwZXM6IE9wdGlvbkxpa2VbXTtcclxuICBjb250YWN0TWV0aG9kczogT3B0aW9uTGlrZVtdO1xyXG4gIGFzaXN0ZW50ZVRpcG9zOiBPcHRpb25MaWtlW107XHJcbiAgZGVmYXVsdFZpc2l0VHlwZTogc3RyaW5nO1xyXG4gIGluaXRpYWxBc2lzdGVudGU6IHN0cmluZztcclxuICBub3JtYWxpemVEYXRlVG9JbnB1dDogKHZhbHVlOiBzdHJpbmcpID0+IHN0cmluZztcclxuICBtYXRjaE9wdGlvblZhbHVlOiAob3B0aW9uczogT3B0aW9uTGlrZVtdLCByYXc6IHVua25vd24pID0+IHN0cmluZztcclxuICBhcHBseURyYWZ0VmFsdWVzOiAoKSA9PiB2b2lkO1xyXG4gIGFwcGx5VGV4dEVkaXRvclZhbHVlczogKCkgPT4gdm9pZDtcclxuICBzZXRTdGF0dXM6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIHNldElzSHlkcmF0aW5nOiAodmFsdWU6IGJvb2xlYW4pID0+IHZvaWQ7XHJcbiAgc2V0VHJhbnNEYXRlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBzZXRWaXNpdFR5cGU6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIHNldENvbnRhY3RNZXRob2Q6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIHNldEFzaXN0ZW50ZVRpcG86ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIHNldERlc2NyaXB0aW9uOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBzZXRDb21lbnRhcmlvczogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgc2V0QW50ZWNlZGVudGVzOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBzZXRDb25jbHVzaW9uZXM6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG59O1xyXG5cclxuLy8gS2VlcHMgZGV0YWlsIGh5ZHJhdGlvbiBvcmNoZXN0cmF0aW9uIG91dHNpZGUgdGhlIHBhZ2UgY29tcG9uZW50LlxyXG5leHBvcnQgY29uc3QgdXNlRGV0YWlsSHlkcmF0aW9uID0gKHtcclxuICBhY3RpdmlkYWRJZCxcclxuICBzaG91bGRIeWRyYXRlLFxyXG4gIHZpc2l0VHlwZXMsXHJcbiAgY29udGFjdE1ldGhvZHMsXHJcbiAgYXNpc3RlbnRlVGlwb3MsXHJcbiAgZGVmYXVsdFZpc2l0VHlwZSxcclxuICBpbml0aWFsQXNpc3RlbnRlLFxyXG4gIG5vcm1hbGl6ZURhdGVUb0lucHV0LFxyXG4gIG1hdGNoT3B0aW9uVmFsdWUsXHJcbiAgYXBwbHlEcmFmdFZhbHVlcyxcclxuICBhcHBseVRleHRFZGl0b3JWYWx1ZXMsXHJcbiAgc2V0U3RhdHVzLFxyXG4gIHNldElzSHlkcmF0aW5nLFxyXG4gIHNldFRyYW5zRGF0ZSxcclxuICBzZXRWaXNpdFR5cGUsXHJcbiAgc2V0Q29udGFjdE1ldGhvZCxcclxuICBzZXRBc2lzdGVudGVUaXBvLFxyXG4gIHNldERlc2NyaXB0aW9uLFxyXG4gIHNldENvbWVudGFyaW9zLFxyXG4gIHNldEFudGVjZWRlbnRlcyxcclxuICBzZXRDb25jbHVzaW9uZXMsXHJcbn06IFVzZURldGFpbEh5ZHJhdGlvbkFyZ3MpID0+IHtcclxuICBjb25zdCBoeWRyYXRlRnJvbUFwaSA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcclxuICAgIGlmICghYWN0aXZpZGFkSWQpIHJldHVybjtcclxuICAgIHNldElzSHlkcmF0aW5nKHRydWUpO1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2hKc29uPEFjdGl2aXR5RGV0YWlsUmVzcG9uc2U+KGAvVmlzaXRhcy9HZXRBY3Rpdml0eUJ5Q29kZT9jb2RlPSR7ZW5jb2RlVVJJQ29tcG9uZW50KGFjdGl2aWRhZElkKX1gKTtcclxuICAgICAgY29uc3QgcmVzcG9uc2VEYXRhID0gZ2V0UmVzcG9uc2VEYXRhKHJlcyk7XHJcblxyXG4gICAgICBpZiAoIWlzUmVzcG9uc2VTdWNjZXNzKHJlcykgfHwgIXJlc3BvbnNlRGF0YSkge1xyXG4gICAgICAgIHNldFN0YXR1cyhnZXRSZXNwb25zZU1lc3NhZ2UocmVzKSB8fCBpbmRUKFwiVmlzaXRzX0RldGFpbF9Mb2FkQWN0aXZpdHlGYWlsZWRcIiwgXCJGYWlsZWQgdG8gbG9hZCBhY3Rpdml0eSBkZXRhaWxzLlwiKSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCByYXdEYXRlID0gU3RyaW5nKHJlc3BvbnNlRGF0YS50cmFuc0RhdGUgPz8gcmVzcG9uc2VEYXRhLlRyYW5zRGF0ZSA/PyBcIlwiKTtcclxuICAgICAgc2V0VHJhbnNEYXRlKG5vcm1hbGl6ZURhdGVUb0lucHV0KHJhd0RhdGUpKTtcclxuXHJcbiAgICAgIGNvbnN0IHJhd1Zpc2l0VHlwZSA9IFN0cmluZyhcclxuICAgICAgICByZXNwb25zZURhdGEudGlwb1Zpc2l0YSA/PyByZXNwb25zZURhdGEuVGlwb1Zpc2l0YSA/PyByZXNwb25zZURhdGEudmlzaXRUeXBlID8/IHJlc3BvbnNlRGF0YS5WaXNpdFR5cGUgPz8gXCJcIlxyXG4gICAgICApO1xyXG4gICAgICBzZXRWaXNpdFR5cGUobWF0Y2hPcHRpb25WYWx1ZSh2aXNpdFR5cGVzLCByYXdWaXNpdFR5cGUpIHx8IGRlZmF1bHRWaXNpdFR5cGUpO1xyXG5cclxuICAgICAgY29uc3QgcmF3Q29udGFjdE1ldGhvZCA9IFN0cmluZyhcclxuICAgICAgICByZXNwb25zZURhdGEuY29udGFjdE1ldGhvZCA/PyByZXNwb25zZURhdGEuQ29udGFjdE1ldGhvZCA/PyBcIlwiXHJcbiAgICAgICk7XHJcbiAgICAgIHNldENvbnRhY3RNZXRob2QobWF0Y2hPcHRpb25WYWx1ZShjb250YWN0TWV0aG9kcywgcmF3Q29udGFjdE1ldGhvZCkpO1xyXG5cclxuICAgICAgY29uc3QgYXNpc3RlbnRlc0xpc3QgPSByZXNwb25zZURhdGEuYXNpc3RlbnRlcyA/PyByZXNwb25zZURhdGEuQXNpc3RlbnRlcztcclxuICAgICAgY29uc3QgZmlyc3RBc2lzdGVudGUgPSBBcnJheS5pc0FycmF5KGFzaXN0ZW50ZXNMaXN0KSAmJiBhc2lzdGVudGVzTGlzdC5sZW5ndGggPyBhc1JlY29yZChhc2lzdGVudGVzTGlzdFswXSkgOiBudWxsO1xyXG4gICAgICBjb25zdCByYXdBc2lzdGVudGVUaXBvID0gU3RyaW5nKFxyXG4gICAgICAgIHJlc3BvbnNlRGF0YS5hc2lzdGVudGVUaXBvID8/XHJcbiAgICAgICAgICByZXNwb25zZURhdGEuQXNpc3RlbnRlVGlwbyA/P1xyXG4gICAgICAgICAgZmlyc3RBc2lzdGVudGU/LmFzaXN0ZW50ZVRpcG8gPz9cclxuICAgICAgICAgIGZpcnN0QXNpc3RlbnRlPy5Bc2lzdGVudGVUaXBvID8/XHJcbiAgICAgICAgICBcIlwiXHJcbiAgICAgICk7XHJcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRBc2lzdGVudGVUaXBvID0gbWF0Y2hPcHRpb25WYWx1ZShhc2lzdGVudGVUaXBvcywgcmF3QXNpc3RlbnRlVGlwbyk7XHJcbiAgICAgIHNldEFzaXN0ZW50ZVRpcG8obm9ybWFsaXplZEFzaXN0ZW50ZVRpcG8gfHwgaW5pdGlhbEFzaXN0ZW50ZSk7XHJcbiAgICAgIHNldERlc2NyaXB0aW9uKFN0cmluZyhyZXNwb25zZURhdGEuZGVzY3JpcHRpb24gPz8gcmVzcG9uc2VEYXRhLkRlc2NyaXB0aW9uID8/IFwiXCIpKTtcclxuICAgICAgc2V0Q29tZW50YXJpb3MoU3RyaW5nKHJlc3BvbnNlRGF0YS5jb21lbnRhcmlvcyA/PyByZXNwb25zZURhdGEuQ29tZW50YXJpb3MgPz8gXCJcIikpO1xyXG4gICAgICBzZXRBbnRlY2VkZW50ZXMoU3RyaW5nKHJlc3BvbnNlRGF0YS5hbnRlY2VkZW50ZXMgPz8gcmVzcG9uc2VEYXRhLkFudGVjZWRlbnRlcyA/PyBcIlwiKSk7XHJcbiAgICAgIHNldENvbmNsdXNpb25lcyhTdHJpbmcocmVzcG9uc2VEYXRhLmNvbmNsdXNpb25lcyA/PyByZXNwb25zZURhdGEuQ29uY2x1c2lvbmVzID8/IFwiXCIpKTtcclxuICAgIH0gY2F0Y2gge1xyXG4gICAgICAvLyBLZWVwIHByZXZpb3VzIFVJIGJlaGF2aW9yIG9uIGh5ZHJhdGlvbiBlcnJvcnMuXHJcbiAgICB9IGZpbmFsbHkge1xyXG4gICAgICBzZXRJc0h5ZHJhdGluZyhmYWxzZSk7XHJcbiAgICAgIGFwcGx5RHJhZnRWYWx1ZXMoKTtcclxuICAgICAgYXBwbHlUZXh0RWRpdG9yVmFsdWVzKCk7XHJcbiAgICB9XHJcbiAgfSwgW1xyXG4gICAgYWN0aXZpZGFkSWQsXHJcbiAgICBhcHBseURyYWZ0VmFsdWVzLFxyXG4gICAgYXBwbHlUZXh0RWRpdG9yVmFsdWVzLFxyXG4gICAgYXNpc3RlbnRlVGlwb3MsXHJcbiAgICBjb250YWN0TWV0aG9kcyxcclxuICAgIGRlZmF1bHRWaXNpdFR5cGUsXHJcbiAgICBpbml0aWFsQXNpc3RlbnRlLFxyXG4gICAgbWF0Y2hPcHRpb25WYWx1ZSxcclxuICAgIG5vcm1hbGl6ZURhdGVUb0lucHV0LFxyXG4gICAgc2V0QW50ZWNlZGVudGVzLFxyXG4gICAgc2V0QXNpc3RlbnRlVGlwbyxcclxuICAgIHNldENvbWVudGFyaW9zLFxyXG4gICAgc2V0Q29uY2x1c2lvbmVzLFxyXG4gICAgc2V0RGVzY3JpcHRpb24sXHJcbiAgICBzZXRJc0h5ZHJhdGluZyxcclxuICAgIHNldFN0YXR1cyxcclxuICAgIHNldFRyYW5zRGF0ZSxcclxuICAgIHNldFZpc2l0VHlwZSxcclxuICAgIHNldENvbnRhY3RNZXRob2QsXHJcbiAgICB2aXNpdFR5cGVzLFxyXG4gIF0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKHNob3VsZEh5ZHJhdGUpIHtcclxuICAgICAgaHlkcmF0ZUZyb21BcGkoKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgYXBwbHlEcmFmdFZhbHVlcygpO1xyXG4gICAgYXBwbHlUZXh0RWRpdG9yVmFsdWVzKCk7XHJcbiAgfSwgW2FwcGx5RHJhZnRWYWx1ZXMsIGFwcGx5VGV4dEVkaXRvclZhbHVlcywgaHlkcmF0ZUZyb21BcGksIHNob3VsZEh5ZHJhdGVdKTtcclxufTtcclxuIiwgImltcG9ydCB7IHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgd2FpdCB9IGZyb20gXCIuLi91dGlscy93YWl0LnRzXCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB7IHNldEhpc3RvcnlGaWx0ZXJGb3JEYXRlLCBmbGFzaEFjdGlvbk1hcmsgfSBmcm9tIFwiLi4vdXRpbHMvdmlzaXRhc0hpc3RvcnkudHNcIjtcbmltcG9ydCB7IHNldFRvcGJhckFjdGlvbkdyb3VwUmVhZHkgfSBmcm9tIFwiLi4vdXRpbHMvdG9wYmFyQWN0aW9uVmlzaWJpbGl0eS50c1wiO1xuXHJcbnR5cGUgVXNlRGV0YWlsVG9wYmFyQWN0aW9uc0FyZ3MgPSB7XHJcbiAgYnVzeTogYm9vbGVhbjtcclxuICBtb2RhbE9wZW46IGJvb2xlYW47XHJcbiAgaXNFZGl0aW5nOiBib29sZWFuO1xyXG4gIGNhbkVkaXRIaXN0b3J5OiBib29sZWFuO1xyXG4gIGNhbkRlbGV0ZUhpc3Rvcnk6IGJvb2xlYW47XHJcbiAgdHJhbnNEYXRlOiBzdHJpbmc7XHJcbiAgc2V0TW9kYWxFcnJvcjogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgaGFuZGxlRW5hYmxlRWRpdDogKCkgPT4gdm9pZDtcclxuICBoYW5kbGVDYW5jZWxFZGl0OiAoKSA9PiB2b2lkO1xuICBoYW5kbGVVcGRhdGU6ICgpID0+IFByb21pc2U8Ym9vbGVhbj47XG4gIGhhbmRsZURlbGV0ZTogKCkgPT4gUHJvbWlzZTxib29sZWFuPjtcbiAgb25QZXJtaXNzaW9uQmxvY2tlZD86IChvcGVyYXRpb246IFwiZWRpdFwiIHwgXCJkZWxldGVcIikgPT4gdm9pZDtcbiAgYWN0aW9uR3JvdXBJZD86IHN0cmluZztcbiAgcGVybWlzc2lvbnNSZWFkeT86IGJvb2xlYW47XG4gIG9wZW5Db25maXJtOiAob3B0czoge1xyXG4gICAgdGl0bGU6IHN0cmluZztcclxuICAgIG1lc3NhZ2U6IHN0cmluZztcclxuICAgIGNvbmZpcm1UZXh0Pzogc3RyaW5nO1xyXG4gICAgb25Db25maXJtPzogKCkgPT4gUHJvbWlzZTxib29sZWFuIHwgdm9pZD4gfCBib29sZWFuIHwgdm9pZDtcclxuICB9KSA9PiB2b2lkO1xyXG4gIGNsb3NlQ29uZmlybTogKCkgPT4gdm9pZDtcclxufTtcclxuXHJcbi8vIENvb3JkaW5hdGVzIHRvcGJhciBpY29uIHZpc2liaWxpdHkgYW5kIGFjdGlvbiBldmVudHMgZm9yIGRldGFpbCBwYWdlLlxyXG5leHBvcnQgY29uc3QgdXNlRGV0YWlsVG9wYmFyQWN0aW9ucyA9ICh7XHJcbiAgYnVzeSxcclxuICBtb2RhbE9wZW4sXHJcbiAgaXNFZGl0aW5nLFxyXG4gIGNhbkVkaXRIaXN0b3J5LFxyXG4gIGNhbkRlbGV0ZUhpc3RvcnksXHJcbiAgdHJhbnNEYXRlLFxyXG4gIHNldE1vZGFsRXJyb3IsXHJcbiAgaGFuZGxlRW5hYmxlRWRpdCxcclxuICBoYW5kbGVDYW5jZWxFZGl0LFxuICBoYW5kbGVVcGRhdGUsXG4gIGhhbmRsZURlbGV0ZSxcbiAgb25QZXJtaXNzaW9uQmxvY2tlZCxcbiAgYWN0aW9uR3JvdXBJZCA9IFwidmlzaXQtZGV0YWlsLWFjdGlvbnNcIixcbiAgcGVybWlzc2lvbnNSZWFkeSA9IHRydWUsXG4gIG9wZW5Db25maXJtLFxyXG4gIGNsb3NlQ29uZmlybSxcclxufTogVXNlRGV0YWlsVG9wYmFyQWN0aW9uc0FyZ3MpID0+IHtcclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFwZXJtaXNzaW9uc1JlYWR5KSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgZWRpdEljb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpc2l0RWRpdEljb25cIik7XHJcbiAgICBjb25zdCBzYXZlSWNvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlzaXRTYXZlSWNvblwiKTtcbiAgICBjb25zdCBkZWxldGVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpc2l0RGVsZXRlQnRuXCIpO1xuICAgIGNvbnN0IGNhbmNlbEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlzaXRDYW5jZWxCdG5cIik7XG4gICAgY29uc3QgZWRpdEJ0biA9IGVkaXRJY29uPy5jbG9zZXN0KFwiYnV0dG9uXCIpID8/IG51bGw7XG4gICAgaWYgKGlzRWRpdGluZykge1xuICAgICAgaWYgKGVkaXRCdG4pIGVkaXRCdG4uY2xhc3NMaXN0LnRvZ2dsZShcInRvcGJhci1oaWRkZW5cIiwgIWNhbkVkaXRIaXN0b3J5KTtcbiAgICAgIGlmIChlZGl0SWNvbikgZWRpdEljb24uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgIGlmIChzYXZlSWNvbikgc2F2ZUljb24uY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICAgIGlmIChkZWxldGVCdG4pIGRlbGV0ZUJ0bi5jbGFzc0xpc3QuYWRkKFwidG9wYmFyLWhpZGRlblwiKTtcbiAgICAgIGlmIChjYW5jZWxCdG4pIGNhbmNlbEJ0bi5jbGFzc0xpc3QucmVtb3ZlKFwidG9wYmFyLWhpZGRlblwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGVkaXRCdG4pIGVkaXRCdG4uY2xhc3NMaXN0LnRvZ2dsZShcInRvcGJhci1oaWRkZW5cIiwgIWNhbkVkaXRIaXN0b3J5KTtcbiAgICAgIGlmIChlZGl0SWNvbikgZWRpdEljb24uY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICAgIGlmIChzYXZlSWNvbikgc2F2ZUljb24uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgIGlmIChkZWxldGVCdG4pIGRlbGV0ZUJ0bi5jbGFzc0xpc3QudG9nZ2xlKFwidG9wYmFyLWhpZGRlblwiLCAhY2FuRGVsZXRlSGlzdG9yeSk7XG4gICAgICBpZiAoY2FuY2VsQnRuKSBjYW5jZWxCdG4uY2xhc3NMaXN0LmFkZChcInRvcGJhci1oaWRkZW5cIik7XG4gICAgfVxuXG4gICAgc2V0VG9wYmFyQWN0aW9uR3JvdXBSZWFkeShhY3Rpb25Hcm91cElkKTtcbiAgfSwgW2FjdGlvbkdyb3VwSWQsIGNhbkRlbGV0ZUhpc3RvcnksIGNhbkVkaXRIaXN0b3J5LCBpc0VkaXRpbmcsIHBlcm1pc3Npb25zUmVhZHldKTtcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIXBlcm1pc3Npb25zUmVhZHkpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBvbkVkaXQgPSAoKSA9PiB7XG4gICAgICBpZiAoIWNhbkVkaXRIaXN0b3J5KSB7XG4gICAgICAgIG9uUGVybWlzc2lvbkJsb2NrZWQ/LihcImVkaXRcIik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChpc0VkaXRpbmcpIHtcclxuICAgICAgICBpZiAoYnVzeSB8fCBtb2RhbE9wZW4pIHJldHVybjtcclxuICAgICAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xyXG4gICAgICAgIG9wZW5Db25maXJtKHtcclxuICAgICAgICAgIHRpdGxlOiBpbmRUKFwiVmlzaXRzX0RldGFpbF9TYXZlQ2hhbmdlc19UaXRsZVwiLCBcIlZpc2l0c19EZXRhaWxfU2F2ZUNoYW5nZXNfVGl0bGVcIiksXHJcbiAgICAgICAgICBtZXNzYWdlOiBpbmRUKFwiVmlzaXRzX0RldGFpbF9TYXZlQ2hhbmdlc19Cb2R5XCIsIFwiVmlzaXRzX0RldGFpbF9TYXZlQ2hhbmdlc19Cb2R5XCIpLFxyXG4gICAgICAgICAgY29uZmlybVRleHQ6IGluZFQoXCJDb21tb25fU2F2ZVwiLCBcIkNvbW1vbl9TYXZlXCIpLFxyXG4gICAgICAgICAgb25Db25maXJtOiBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG9rID0gYXdhaXQgaGFuZGxlVXBkYXRlKCk7XHJcbiAgICAgICAgICAgIGlmIChvaykge1xyXG4gICAgICAgICAgICAgIGNsb3NlQ29uZmlybSgpO1xyXG4gICAgICAgICAgICAgIHNldEhpc3RvcnlGaWx0ZXJGb3JEYXRlKHRyYW5zRGF0ZSk7XHJcbiAgICAgICAgICAgICAgYXdhaXQgd2FpdCgyMDApO1xyXG4gICAgICAgICAgICAgIGZsYXNoQWN0aW9uTWFyayhcIm9rUHJvY2Vzc1wiLCAxMjAwKTtcclxuICAgICAgICAgICAgICBhd2FpdCB3YWl0KDEyMDApO1xyXG4gICAgICAgICAgICAgIHdpbmRvdy5fX2luZEJ5cGFzc05hdmlnYXRpb25HdWFyZE9uY2U/LigpO1xyXG4gICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvSGlzdG9yaWFsL0hpc3RvcnlcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gb2s7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGhhbmRsZUVuYWJsZUVkaXQoKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBvbkRlbGV0ZSA9ICgpID0+IHtcbiAgICAgIGlmICghY2FuRGVsZXRlSGlzdG9yeSkge1xuICAgICAgICBvblBlcm1pc3Npb25CbG9ja2VkPy4oXCJkZWxldGVcIik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChidXN5IHx8IG1vZGFsT3BlbikgcmV0dXJuO1xyXG4gICAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xyXG4gICAgICBvcGVuQ29uZmlybSh7XHJcbiAgICAgICAgdGl0bGU6IGluZFQoXCJWaXNpdHNfRGV0YWlsX0RlbGV0ZUFjdGl2aXR5X1RpdGxlXCIsIFwiVmlzaXRzX0RldGFpbF9EZWxldGVBY3Rpdml0eV9UaXRsZVwiKSxcclxuICAgICAgICBtZXNzYWdlOiBpbmRUKFwiVmlzaXRzX0RldGFpbF9EZWxldGVBY3Rpdml0eV9Cb2R5XCIsIFwiVmlzaXRzX0RldGFpbF9EZWxldGVBY3Rpdml0eV9Cb2R5XCIpLFxyXG4gICAgICAgIGNvbmZpcm1UZXh0OiBpbmRUKFwiQ29tbW9uX0RlbGV0ZVwiLCBcIkNvbW1vbl9EZWxldGVcIiksXHJcbiAgICAgICAgb25Db25maXJtOiBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBvayA9IGF3YWl0IGhhbmRsZURlbGV0ZSgpO1xyXG4gICAgICAgICAgaWYgKG9rKSB7XHJcbiAgICAgICAgICAgIGNsb3NlQ29uZmlybSgpO1xyXG4gICAgICAgICAgICBzZXRIaXN0b3J5RmlsdGVyRm9yRGF0ZSh0cmFuc0RhdGUpO1xyXG4gICAgICAgICAgICBhd2FpdCB3YWl0KDIwMCk7XHJcbiAgICAgICAgICAgIGZsYXNoQWN0aW9uTWFyayhcIm9rRGVsUHJvY2Vzc1wiLCAxMjAwKTtcclxuICAgICAgICAgICAgYXdhaXQgd2FpdCgxMjAwKTtcclxuICAgICAgICAgICAgd2luZG93Ll9faW5kQnlwYXNzTmF2aWdhdGlvbkd1YXJkT25jZT8uKCk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvSGlzdG9yaWFsL0hpc3RvcnlcIjtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBvaztcclxuICAgICAgICB9LFxyXG4gICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3Qgb25DYW5jZWxFZGl0ID0gKCkgPT4ge1xyXG4gICAgICBpZiAoYnVzeSB8fCBtb2RhbE9wZW4pIHJldHVybjtcclxuICAgICAgaGFuZGxlQ2FuY2VsRWRpdCgpO1xyXG4gICAgfTtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInZpc2l0LWVkaXRcIiwgb25FZGl0KTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwidmlzaXQtZGVsZXRlXCIsIG9uRGVsZXRlKTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwidmlzaXQtY2FuY2VsLWVkaXRcIiwgb25DYW5jZWxFZGl0KTtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwidmlzaXQtZWRpdFwiLCBvbkVkaXQpO1xyXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInZpc2l0LWRlbGV0ZVwiLCBvbkRlbGV0ZSk7XHJcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwidmlzaXQtY2FuY2VsLWVkaXRcIiwgb25DYW5jZWxFZGl0KTtcclxuICAgIH07XHJcbiAgfSwgW1xyXG4gICAgYnVzeSxcclxuICAgIGNhbkRlbGV0ZUhpc3RvcnksXHJcbiAgICBjYW5FZGl0SGlzdG9yeSxcclxuICAgIGNsb3NlQ29uZmlybSxcclxuICAgIGhhbmRsZUNhbmNlbEVkaXQsXHJcbiAgICBoYW5kbGVEZWxldGUsXHJcbiAgICBoYW5kbGVFbmFibGVFZGl0LFxuICAgIGhhbmRsZVVwZGF0ZSxcbiAgICBvblBlcm1pc3Npb25CbG9ja2VkLFxuICAgIGlzRWRpdGluZyxcbiAgICBtb2RhbE9wZW4sXHJcbiAgICBvcGVuQ29uZmlybSxcclxuICAgIHBlcm1pc3Npb25zUmVhZHksXHJcbiAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgdHJhbnNEYXRlLFxyXG4gIF0pO1xyXG59O1xyXG4iLCAiXHVGRUZGaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZVJlZiB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBnZXRTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5LCByZW1vdmVTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5LCBzZXRTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5IH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3Nlc3Npb25FeHBpcnkudHNcIjtcclxuXHJcbmNvbnN0IEVESVRfTU9ERV9UVExfTVMgPSA2ICogNjAgKiA2MCAqIDEwMDA7XHJcbmNvbnN0IERFVEFJTF9EUkFGVF9UVExfTVMgPSAyNCAqIDYwICogNjAgKiAxMDAwO1xyXG5cclxudHlwZSBVc2VEZXRhaWxFZGl0U2Vzc2lvbkFyZ3MgPSB7XHJcbiAgYWN0aXZpZGFkSWQ6IHN0cmluZztcclxuICByZWNJZDogc3RyaW5nO1xyXG4gIGNhbkVkaXRIaXN0b3J5OiBib29sZWFuO1xyXG4gIGlzRWRpdGluZzogYm9vbGVhbjtcclxuICBzZXRJc0VkaXRpbmc6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPGJvb2xlYW4+PjtcbiAgdHJhbnNEYXRlOiBzdHJpbmc7XG4gIHZpc2l0VHlwZTogc3RyaW5nO1xuICBjb250YWN0TWV0aG9kOiBzdHJpbmc7XG4gIGFzaXN0ZW50ZVRpcG86IHN0cmluZztcbiAgZGVzY3JpcHRpb246IHN0cmluZztcclxuICBjb21lbnRhcmlvczogc3RyaW5nO1xyXG4gIGFudGVjZWRlbnRlczogc3RyaW5nO1xyXG4gIGNvbmNsdXNpb25lczogc3RyaW5nO1xyXG4gIHNldFRyYW5zRGF0ZTogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XG4gIHNldFZpc2l0VHlwZTogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XG4gIHNldENvbnRhY3RNZXRob2Q6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPHN0cmluZz4+O1xuICBzZXRBc2lzdGVudGVUaXBvOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcbiAgc2V0RGVzY3JpcHRpb246IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPHN0cmluZz4+O1xyXG4gIHNldENvbWVudGFyaW9zOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcclxuICBzZXRBbnRlY2VkZW50ZXM6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPHN0cmluZz4+O1xyXG4gIHNldENvbmNsdXNpb25lczogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XHJcbn07XHJcblxyXG50eXBlIERldGFpbERyYWZ0VmFsdWVzID0ge1xyXG4gIHRyYW5zRGF0ZTogc3RyaW5nO1xuICB2aXNpdFR5cGU6IHN0cmluZztcbiAgY29udGFjdE1ldGhvZDogc3RyaW5nO1xuICBhc2lzdGVudGVUaXBvOiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgY29tZW50YXJpb3M6IHN0cmluZztcclxuICBhbnRlY2VkZW50ZXM6IHN0cmluZztcclxuICBjb25jbHVzaW9uZXM6IHN0cmluZztcclxufTtcclxuXHJcbi8vIE1hbmFnZXMgZWRpdC1tb2RlIHNlc3Npb24gZmxhZ3MgYW5kIGRldGFpbCBkcmFmdCBwZXJzaXN0ZW5jZS5cclxuZXhwb3J0IGNvbnN0IHVzZURldGFpbEVkaXRTZXNzaW9uID0gKHtcclxuICBhY3RpdmlkYWRJZCxcclxuICByZWNJZCxcclxuICBjYW5FZGl0SGlzdG9yeSxcclxuICBpc0VkaXRpbmcsXHJcbiAgc2V0SXNFZGl0aW5nLFxyXG4gIHRyYW5zRGF0ZSxcbiAgdmlzaXRUeXBlLFxuICBjb250YWN0TWV0aG9kLFxuICBhc2lzdGVudGVUaXBvLFxuICBkZXNjcmlwdGlvbixcclxuICBjb21lbnRhcmlvcyxcclxuICBhbnRlY2VkZW50ZXMsXHJcbiAgY29uY2x1c2lvbmVzLFxyXG4gIHNldFRyYW5zRGF0ZSxcbiAgc2V0VmlzaXRUeXBlLFxuICBzZXRDb250YWN0TWV0aG9kLFxuICBzZXRBc2lzdGVudGVUaXBvLFxuICBzZXREZXNjcmlwdGlvbixcclxuICBzZXRDb21lbnRhcmlvcyxcclxuICBzZXRBbnRlY2VkZW50ZXMsXHJcbiAgc2V0Q29uY2x1c2lvbmVzLFxyXG59OiBVc2VEZXRhaWxFZGl0U2Vzc2lvbkFyZ3MpID0+IHtcclxuICBjb25zdCBlZGl0TW9kZUtleVJlZiA9IHVzZVJlZihcIlwiKTtcclxuICBjb25zdCBkcmFmdEtleVJlZiA9IHVzZVJlZihcIlwiKTtcclxuICBjb25zdCBkcmFmdFBlcnNpc3RUaW1lclJlZiA9IHVzZVJlZjxudW1iZXIgfCBudWxsPihudWxsKTtcclxuXHJcbiAgLy8gUGVyc2lzdCBlZGl0IG1vZGUgd2hpbGUgdXNlciBuYXZpZ2F0ZXMgdG8gdGhlIHRleHQgZWRpdG9yIGFuZCBiYWNrLlxyXG4gIGNvbnN0IHN5bmNFZGl0TW9kZUZsYWcgPSB1c2VDYWxsYmFjaygoZW5hYmxlZDogYm9vbGVhbikgPT4ge1xyXG4gICAgY29uc3Qga2V5ID0gZWRpdE1vZGVLZXlSZWYuY3VycmVudDtcclxuICAgIGlmICgha2V5KSByZXR1cm47XHJcbiAgICBpZiAoZW5hYmxlZCkge1xyXG4gICAgICBzZXRTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KGtleSwgXCJ0cnVlXCIsIEVESVRfTU9ERV9UVExfTVMpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICByZW1vdmVTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KGtleSk7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBzeW5jRWRpdE1vZGVPbkVudHJ5ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgY29uc3QgYmFzZUlkID0gYWN0aXZpZGFkSWQgfHwgcmVjSWQgfHwgXCJkZWZhdWx0XCI7XHJcbiAgICBjb25zdCBrZXkgPSBgaW5kX3Zpc2l0X2VkaXRfJHtiYXNlSWR9YDtcclxuICAgIGNvbnN0IHJldHVybktleSA9IGAke2tleX1fcmV0dXJuYDtcclxuICAgIGNvbnN0IGRyYWZ0S2V5ID0gYGluZF92aXNpdF9kcmFmdF8ke2Jhc2VJZH1gO1xyXG4gICAgZWRpdE1vZGVLZXlSZWYuY3VycmVudCA9IGtleTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBhbGxvd1Jlc3RvcmUgPSBnZXRTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KHJldHVybktleSkgPT09IFwiMVwiO1xyXG4gICAgICBpZiAoYWxsb3dSZXN0b3JlKSB7XHJcbiAgICAgICAgcmVtb3ZlU2Vzc2lvblZhbHVlV2l0aEV4cGlyeShyZXR1cm5LZXkpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoY2FuRWRpdEhpc3RvcnkgJiYgYWxsb3dSZXN0b3JlICYmIGdldFNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoa2V5KSA9PT0gXCJ0cnVlXCIpIHtcclxuICAgICAgICBzZXRJc0VkaXRpbmcodHJ1ZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc2V0SXNFZGl0aW5nKGZhbHNlKTtcclxuICAgICAgICByZW1vdmVTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KGtleSk7XHJcbiAgICAgICAgcmVtb3ZlU2Vzc2lvblZhbHVlV2l0aEV4cGlyeShkcmFmdEtleSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICghY2FuRWRpdEhpc3RvcnkpIHtcclxuICAgICAgICByZW1vdmVTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KGtleSk7XHJcbiAgICAgICAgcmVtb3ZlU2Vzc2lvblZhbHVlV2l0aEV4cGlyeShkcmFmdEtleSk7XHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2gge1xyXG4gICAgICAvKiBpZ25vcmUgKi9cclxuICAgIH1cclxuICB9LCBbYWN0aXZpZGFkSWQsIGNhbkVkaXRIaXN0b3J5LCByZWNJZCwgc2V0SXNFZGl0aW5nXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBzeW5jRWRpdE1vZGVPbkVudHJ5KCk7XHJcbiAgfSwgW3N5bmNFZGl0TW9kZU9uRW50cnldKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IG9uUGFnZVNob3cgPSAoZXZlbnQ6IFBhZ2VUcmFuc2l0aW9uRXZlbnQpID0+IHtcclxuICAgICAgY29uc3QgbmF2RW50cnkgPSB0eXBlb2YgcGVyZm9ybWFuY2UgIT09IFwidW5kZWZpbmVkXCIgJiYgcGVyZm9ybWFuY2UuZ2V0RW50cmllc0J5VHlwZVxyXG4gICAgICAgID8gKHBlcmZvcm1hbmNlLmdldEVudHJpZXNCeVR5cGUoXCJuYXZpZ2F0aW9uXCIpWzBdIGFzIFBlcmZvcm1hbmNlTmF2aWdhdGlvblRpbWluZyB8IHVuZGVmaW5lZClcclxuICAgICAgICA6IHVuZGVmaW5lZDtcclxuICAgICAgY29uc3QgaXNCYWNrRm9yd2FyZCA9IG5hdkVudHJ5Py50eXBlID09PSBcImJhY2tfZm9yd2FyZFwiO1xyXG4gICAgICBpZiAoZXZlbnQ/LnBlcnNpc3RlZCB8fCBpc0JhY2tGb3J3YXJkKSB7XHJcbiAgICAgICAgc3luY0VkaXRNb2RlT25FbnRyeSgpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicGFnZXNob3dcIiwgb25QYWdlU2hvdyk7XHJcbiAgICByZXR1cm4gKCkgPT4gd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwYWdlc2hvd1wiLCBvblBhZ2VTaG93KTtcclxuICB9LCBbc3luY0VkaXRNb2RlT25FbnRyeV0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3Qga2V5ID0gYGluZF92aXNpdF9kcmFmdF8ke2FjdGl2aWRhZElkIHx8IHJlY0lkIHx8IFwiZGVmYXVsdFwifWA7XHJcbiAgICBkcmFmdEtleVJlZi5jdXJyZW50ID0ga2V5O1xyXG4gIH0sIFthY3RpdmlkYWRJZCwgcmVjSWRdKTtcclxuXHJcbiAgY29uc3Qgc2F2ZURyYWZ0ID0gdXNlQ2FsbGJhY2soKGRyYWZ0OiBEZXRhaWxEcmFmdFZhbHVlcykgPT4ge1xyXG4gICAgY29uc3Qga2V5ID0gZHJhZnRLZXlSZWYuY3VycmVudDtcclxuICAgIGlmICgha2V5KSByZXR1cm47XHJcbiAgICBzZXRTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KGtleSwgSlNPTi5zdHJpbmdpZnkoZHJhZnQpLCBERVRBSUxfRFJBRlRfVFRMX01TKTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IGNsZWFyRHJhZnQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBjb25zdCBrZXkgPSBkcmFmdEtleVJlZi5jdXJyZW50O1xyXG4gICAgaWYgKCFrZXkpIHJldHVybjtcclxuICAgIHJlbW92ZVNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoa2V5KTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IGFwcGx5RHJhZnRWYWx1ZXMgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBjb25zdCBrZXkgPSBkcmFmdEtleVJlZi5jdXJyZW50O1xyXG4gICAgaWYgKCFrZXkpIHJldHVybjtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCByYXcgPSBnZXRTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KGtleSk7XHJcbiAgICAgIGlmICghcmF3KSByZXR1cm47XHJcbiAgICAgIGNvbnN0IGRyYWZ0ID0gSlNPTi5wYXJzZShyYXcpIGFzIFBhcnRpYWw8RGV0YWlsRHJhZnRWYWx1ZXM+O1xyXG4gICAgICBpZiAoIWRyYWZ0IHx8IHR5cGVvZiBkcmFmdCAhPT0gXCJvYmplY3RcIikgcmV0dXJuO1xyXG5cclxuICAgICAgaWYgKGRyYWZ0LnRyYW5zRGF0ZSAhPT0gdW5kZWZpbmVkKSBzZXRUcmFuc0RhdGUoU3RyaW5nKGRyYWZ0LnRyYW5zRGF0ZSkpO1xuICAgICAgaWYgKGRyYWZ0LnZpc2l0VHlwZSAhPT0gdW5kZWZpbmVkKSBzZXRWaXNpdFR5cGUoU3RyaW5nKGRyYWZ0LnZpc2l0VHlwZSkpO1xuICAgICAgaWYgKGRyYWZ0LmNvbnRhY3RNZXRob2QgIT09IHVuZGVmaW5lZCkgc2V0Q29udGFjdE1ldGhvZChTdHJpbmcoZHJhZnQuY29udGFjdE1ldGhvZCkpO1xuICAgICAgaWYgKGRyYWZ0LmFzaXN0ZW50ZVRpcG8gIT09IHVuZGVmaW5lZCkgc2V0QXNpc3RlbnRlVGlwbyhTdHJpbmcoZHJhZnQuYXNpc3RlbnRlVGlwbykpO1xuICAgICAgaWYgKGRyYWZ0LmRlc2NyaXB0aW9uICE9PSB1bmRlZmluZWQpIHNldERlc2NyaXB0aW9uKFN0cmluZyhkcmFmdC5kZXNjcmlwdGlvbikpO1xyXG4gICAgICBpZiAoZHJhZnQuY29tZW50YXJpb3MgIT09IHVuZGVmaW5lZCkgc2V0Q29tZW50YXJpb3MoU3RyaW5nKGRyYWZ0LmNvbWVudGFyaW9zKSk7XHJcbiAgICAgIGlmIChkcmFmdC5hbnRlY2VkZW50ZXMgIT09IHVuZGVmaW5lZCkgc2V0QW50ZWNlZGVudGVzKFN0cmluZyhkcmFmdC5hbnRlY2VkZW50ZXMpKTtcclxuICAgICAgaWYgKGRyYWZ0LmNvbmNsdXNpb25lcyAhPT0gdW5kZWZpbmVkKSBzZXRDb25jbHVzaW9uZXMoU3RyaW5nKGRyYWZ0LmNvbmNsdXNpb25lcykpO1xyXG4gICAgfSBjYXRjaCB7XHJcbiAgICAgIC8qIGlnbm9yZSAqL1xyXG4gICAgfVxyXG4gIH0sIFtzZXRBbnRlY2VkZW50ZXMsIHNldEFzaXN0ZW50ZVRpcG8sIHNldENvbWVudGFyaW9zLCBzZXRDb25jbHVzaW9uZXMsIHNldENvbnRhY3RNZXRob2QsIHNldERlc2NyaXB0aW9uLCBzZXRUcmFuc0RhdGUsIHNldFZpc2l0VHlwZV0pO1xuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghaXNFZGl0aW5nKSB7XHJcbiAgICAgIGlmIChkcmFmdFBlcnNpc3RUaW1lclJlZi5jdXJyZW50KSB7XHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KGRyYWZ0UGVyc2lzdFRpbWVyUmVmLmN1cnJlbnQpO1xyXG4gICAgICAgIGRyYWZ0UGVyc2lzdFRpbWVyUmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZHJhZnRQZXJzaXN0VGltZXJSZWYuY3VycmVudCkge1xyXG4gICAgICBjbGVhclRpbWVvdXQoZHJhZnRQZXJzaXN0VGltZXJSZWYuY3VycmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhZnRQZXJzaXN0VGltZXJSZWYuY3VycmVudCA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgZHJhZnRQZXJzaXN0VGltZXJSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgIHNhdmVEcmFmdCh7XHJcbiAgICAgICAgdHJhbnNEYXRlLFxuICAgICAgICB2aXNpdFR5cGUsXG4gICAgICAgIGNvbnRhY3RNZXRob2QsXG4gICAgICAgIGFzaXN0ZW50ZVRpcG8sXG4gICAgICAgIGRlc2NyaXB0aW9uLFxyXG4gICAgICAgIGNvbWVudGFyaW9zLFxyXG4gICAgICAgIGFudGVjZWRlbnRlcyxcclxuICAgICAgICBjb25jbHVzaW9uZXMsXHJcbiAgICAgIH0pO1xyXG4gICAgfSwgMTgwKTtcclxuXHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBpZiAoZHJhZnRQZXJzaXN0VGltZXJSZWYuY3VycmVudCkge1xyXG4gICAgICAgIGNsZWFyVGltZW91dChkcmFmdFBlcnNpc3RUaW1lclJlZi5jdXJyZW50KTtcclxuICAgICAgICBkcmFmdFBlcnNpc3RUaW1lclJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9LCBbYW50ZWNlZGVudGVzLCBhc2lzdGVudGVUaXBvLCBjb21lbnRhcmlvcywgY29uY2x1c2lvbmVzLCBjb250YWN0TWV0aG9kLCBkZXNjcmlwdGlvbiwgaXNFZGl0aW5nLCBzYXZlRHJhZnQsIHRyYW5zRGF0ZSwgdmlzaXRUeXBlXSk7XG5cclxuICByZXR1cm4ge1xyXG4gICAgZWRpdE1vZGVLZXlSZWYsXHJcbiAgICBzeW5jRWRpdE1vZGVGbGFnLFxyXG4gICAgY2xlYXJEcmFmdCxcclxuICAgIGFwcGx5RHJhZnRWYWx1ZXMsXHJcbiAgfTtcclxufTtcclxuIiwgIlx1RkVGRmltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjayB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBmZXRjaEpzb24gfSBmcm9tIFwiLi4vLi4vLi4vc2VydmljZXMvYXBpU2VydmljZS50c1wiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHsgZmxhc2hBY3Rpb25NYXJrIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3Zpc2l0YXNIaXN0b3J5LnRzXCI7XHJcblxyXG50eXBlIE9wdGlvbkxpa2UgPSB7XHJcbiAgdmFsdWU/OiBzdHJpbmcgfCBudW1iZXI7XHJcbiAgVmFsdWU/OiBzdHJpbmcgfCBudW1iZXI7XHJcbiAgdGV4dD86IHN0cmluZztcclxuICBUZXh0Pzogc3RyaW5nO1xyXG59O1xyXG5cclxudHlwZSBWaXNpdENvbW1hbmRSZXNwb25zZSA9IHtcclxuICBzdWNjZXNzPzogYm9vbGVhbjtcclxuICBtZXNzYWdlPzogc3RyaW5nO1xyXG4gIFN1Y2Nlc3M/OiBib29sZWFuO1xyXG4gIE1lc3NhZ2U/OiBzdHJpbmc7XHJcbn07XHJcblxyXG5jb25zdCBpc0NvbW1hbmRTdWNjZXNzID0gKHJlc3BvbnNlOiBWaXNpdENvbW1hbmRSZXNwb25zZSk6IGJvb2xlYW4gPT4ge1xyXG4gIHJldHVybiByZXNwb25zZS5zdWNjZXNzID09PSB0cnVlIHx8IHJlc3BvbnNlLlN1Y2Nlc3MgPT09IHRydWU7XHJcbn07XHJcblxyXG5jb25zdCBnZXRDb21tYW5kTWVzc2FnZSA9IChyZXNwb25zZTogVmlzaXRDb21tYW5kUmVzcG9uc2UpOiBzdHJpbmcgPT4ge1xuICBjb25zdCByYXcgPSByZXNwb25zZS5tZXNzYWdlID8/IHJlc3BvbnNlLk1lc3NhZ2U7XG4gIHJldHVybiB0eXBlb2YgcmF3ID09PSBcInN0cmluZ1wiID8gcmF3LnRyaW0oKSA6IFwiXCI7XG59O1xuXG4vLyBDb252ZXJ0cyBzZWxlY3QgdmFsdWVzIHRvIG51bWVyaWMgZW51bSBwYXlsb2FkIHZhbHVlcy5cbmNvbnN0IHRvTnVsbGFibGVFbnVtTnVtYmVyID0gKHZhbHVlOiBzdHJpbmcpOiBudW1iZXIgfCBudWxsID0+IHtcbiAgY29uc3QgcGFyc2VkID0gTnVtYmVyKHZhbHVlKTtcbiAgcmV0dXJuIE51bWJlci5pc0ludGVnZXIocGFyc2VkKSAmJiBwYXJzZWQgPj0gMCA/IHBhcnNlZCA6IG51bGw7XG59O1xuXG4vLyBLZWVwIHJlY0lkIGFzIGEgbm9ybWFsaXplZCBzaWduZWQgaW50ZWdlciBzdHJpbmcgdG8gYXZvaWQgbG9uZyBwcmVjaXNpb24gbG9zcyBpbiBKUyBudW1iZXJzLlxuY29uc3QgcmVzb2x2ZVNhZmVSZWNJZCA9IChyYXdSZWNJZDogc3RyaW5nKTogc3RyaW5nIHwgbnVsbCA9PiB7XG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSBTdHJpbmcocmF3UmVjSWQgPz8gXCJcIikudHJpbSgpO1xyXG4gIGlmICghbm9ybWFsaXplZCkgcmV0dXJuIG51bGw7XHJcblxyXG4gIGlmICghL14tP1xcZCskLy50ZXN0KG5vcm1hbGl6ZWQpKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgY29uc3QgYWJzb2x1dGVEaWdpdHMgPSBub3JtYWxpemVkLnN0YXJ0c1dpdGgoXCItXCIpID8gbm9ybWFsaXplZC5zbGljZSgxKSA6IG5vcm1hbGl6ZWQ7XHJcbiAgaWYgKCFhYnNvbHV0ZURpZ2l0cyB8fCAvXjArJC8udGVzdChhYnNvbHV0ZURpZ2l0cykpIHJldHVybiBudWxsO1xyXG5cclxuICByZXR1cm4gbm9ybWFsaXplZDtcclxufTtcclxuXHJcbmNvbnN0IHNob3VsZExvZ1JlY0lkSW5EZXYgPSAoKTogYm9vbGVhbiA9PiB7XHJcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIgfHwgIXdpbmRvdy5sb2NhdGlvbikgcmV0dXJuIGZhbHNlO1xyXG4gIGNvbnN0IGhvc3QgPSBTdHJpbmcod2luZG93LmxvY2F0aW9uLmhvc3RuYW1lIHx8IFwiXCIpLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xyXG4gIHJldHVybiBob3N0ID09PSBcImxvY2FsaG9zdFwiIHx8IGhvc3QgPT09IFwiMTI3LjAuMC4xXCIgfHwgaG9zdC5lbmRzV2l0aChcIi5sb2NhbFwiKTtcclxufTtcclxuXHJcbmNvbnN0IGxvZ1NhZmVSZWNJZEluRGV2ID0gKG9wZXJhdGlvbjogXCJ1cGRhdGVcIiB8IFwiZGVsZXRlXCIsIHNhZmVSZWNJZDogc3RyaW5nKTogdm9pZCA9PiB7XHJcbiAgaWYgKCFzaG91bGRMb2dSZWNJZEluRGV2KCkpIHJldHVybjtcclxuICBjb25zb2xlLmluZm8oYFt2aXNpdGFzLWRldGFpbF0gJHtvcGVyYXRpb259IHJlY0lkYCwgc2FmZVJlY0lkKTtcclxufTtcclxuXHJcbnR5cGUgVXNlRGV0YWlsTXV0YXRpb25zQXJncyA9IHtcclxuICBidXN5OiBib29sZWFuO1xyXG4gIGlzRWRpdGluZzogYm9vbGVhbjtcclxuICBjYW5FZGl0SGlzdG9yeTogYm9vbGVhbjtcclxuICBjYW5EZWxldGVIaXN0b3J5OiBib29sZWFuO1xyXG4gIHJlY0lkOiBzdHJpbmc7XHJcbiAgYWNjb3VudE51bTogc3RyaW5nO1xyXG4gIHRyYW5zRGF0ZTogc3RyaW5nO1xyXG4gIHZpc2l0VHlwZTogc3RyaW5nO1xyXG4gIGNvbnRhY3RNZXRob2Q6IHN0cmluZztcclxuICBhc2lzdGVudGVUaXBvOiBzdHJpbmc7XHJcbiAgZGVzY3JpcHRpb246IHN0cmluZztcclxuICBjb21lbnRhcmlvczogc3RyaW5nO1xyXG4gIGFudGVjZWRlbnRlczogc3RyaW5nO1xyXG4gIGNvbmNsdXNpb25lczogc3RyaW5nO1xyXG4gIHZpc2l0VHlwZXM6IE9wdGlvbkxpa2VbXTtcclxuICBjb250YWN0TWV0aG9kczogT3B0aW9uTGlrZVtdO1xyXG4gIGFzaXN0ZW50ZVRpcG9zOiBPcHRpb25MaWtlW107XHJcbiAgZGVmYXVsdFZpc2l0VHlwZTogc3RyaW5nO1xyXG4gIHJhd0luaXRpYWxWaXNpdFR5cGU6IHN0cmluZztcclxuICByYXdJbml0aWFsQ29udGFjdE1ldGhvZDogc3RyaW5nO1xyXG4gIHJhd0luaXRpYWxBc2lzdGVudGU6IHN0cmluZztcclxuICBtYXRjaE9wdGlvblZhbHVlOiAob3B0aW9uczogT3B0aW9uTGlrZVtdLCByYXc6IHVua25vd24pID0+IHN0cmluZztcbiAgY2xlYXJEcmFmdDogKCkgPT4gdm9pZDtcbiAgc3luY0VkaXRNb2RlRmxhZzogKGVuYWJsZWQ6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIG9uUGVybWlzc2lvbkJsb2NrZWQ/OiAob3BlcmF0aW9uOiBcInVwZGF0ZVwiIHwgXCJkZWxldGVcIikgPT4gdm9pZDtcbiAgc2V0TW9kYWxFcnJvcjogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XG4gIHNldEJ1c3k6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPGJvb2xlYW4+PjtcclxuICBzZXRTdGF0dXM6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPHN0cmluZz4+O1xyXG4gIHNldElzRWRpdGluZzogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248Ym9vbGVhbj4+O1xyXG59O1xyXG5cclxuLy8gRW5jYXBzdWxhdGVzIHVwZGF0ZSBhbmQgZGVsZXRlIG11dGF0aW9ucyBmb3IgZGV0YWlsIGZvcm0gc3RhdGUuXHJcbmV4cG9ydCBjb25zdCB1c2VEZXRhaWxNdXRhdGlvbnMgPSAoe1xyXG4gIGJ1c3ksXHJcbiAgaXNFZGl0aW5nLFxyXG4gIGNhbkVkaXRIaXN0b3J5LFxyXG4gIGNhbkRlbGV0ZUhpc3RvcnksXHJcbiAgcmVjSWQsXHJcbiAgYWNjb3VudE51bSxcclxuICB0cmFuc0RhdGUsXHJcbiAgdmlzaXRUeXBlLFxyXG4gIGNvbnRhY3RNZXRob2QsXHJcbiAgYXNpc3RlbnRlVGlwbyxcclxuICBkZXNjcmlwdGlvbixcclxuICBjb21lbnRhcmlvcyxcclxuICBhbnRlY2VkZW50ZXMsXHJcbiAgY29uY2x1c2lvbmVzLFxyXG4gIHZpc2l0VHlwZXMsXHJcbiAgY29udGFjdE1ldGhvZHMsXHJcbiAgYXNpc3RlbnRlVGlwb3MsXHJcbiAgZGVmYXVsdFZpc2l0VHlwZSxcclxuICByYXdJbml0aWFsVmlzaXRUeXBlLFxyXG4gIHJhd0luaXRpYWxDb250YWN0TWV0aG9kLFxyXG4gIHJhd0luaXRpYWxBc2lzdGVudGUsXHJcbiAgbWF0Y2hPcHRpb25WYWx1ZSxcbiAgY2xlYXJEcmFmdCxcbiAgc3luY0VkaXRNb2RlRmxhZyxcbiAgb25QZXJtaXNzaW9uQmxvY2tlZCxcbiAgc2V0TW9kYWxFcnJvcixcbiAgc2V0QnVzeSxcclxuICBzZXRTdGF0dXMsXHJcbiAgc2V0SXNFZGl0aW5nLFxyXG59OiBVc2VEZXRhaWxNdXRhdGlvbnNBcmdzKSA9PiB7XHJcbiAgY29uc3QgaGFuZGxlVXBkYXRlID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgaWYgKGJ1c3kgfHwgIWlzRWRpdGluZykgcmV0dXJuIGZhbHNlO1xuICAgIGlmICghY2FuRWRpdEhpc3RvcnkpIHtcbiAgICAgIG9uUGVybWlzc2lvbkJsb2NrZWQ/LihcInVwZGF0ZVwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cclxuICAgIGNvbnN0IHNhZmVSZWNJZFZhbHVlID0gcmVzb2x2ZVNhZmVSZWNJZChyZWNJZCk7XHJcbiAgICBpZiAoc2FmZVJlY0lkVmFsdWUgPT09IG51bGwpIHtcclxuICAgICAgY29uc3QgbWVzc2FnZSA9IGluZFQoXCJWaXNpdHNfRGV0YWlsX0ludmFsaWRSZWNJZFwiLCBcIkNvdWxkIG5vdCByZXNvbHZlIGFjdGl2aXR5IGlkZW50aWZpZXIuIFJlbG9hZCBhbmQgdHJ5IGFnYWluLlwiKTtcclxuICAgICAgc2V0TW9kYWxFcnJvcihtZXNzYWdlKTtcclxuICAgICAgc2V0U3RhdHVzKG1lc3NhZ2UpO1xyXG4gICAgICBmbGFzaEFjdGlvbk1hcmsoXCJlcnJvclByb2Nlc3NcIiwgMTUwMCk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xyXG4gICAgc2V0QnVzeSh0cnVlKTtcclxuICAgIHNldFN0YXR1cyhpbmRUKFwiVmlzaXRzX0RldGFpbF9VcGRhdGluZ1wiLCBcIlVwZGF0aW5nIGFjdGl2aXR5Li4uXCIpKTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBub3JtYWxpemVkVmlzaXRUeXBlID1cclxuICAgICAgICBtYXRjaE9wdGlvblZhbHVlKHZpc2l0VHlwZXMsIHZpc2l0VHlwZSkgfHxcclxuICAgICAgICBtYXRjaE9wdGlvblZhbHVlKHZpc2l0VHlwZXMsIHJhd0luaXRpYWxWaXNpdFR5cGUpIHx8XHJcbiAgICAgICAgZGVmYXVsdFZpc2l0VHlwZTtcclxuICAgICAgY29uc3Qgbm9ybWFsaXplZEFzaXN0ZW50ZVRpcG8gPVxyXG4gICAgICAgIG1hdGNoT3B0aW9uVmFsdWUoYXNpc3RlbnRlVGlwb3MsIGFzaXN0ZW50ZVRpcG8pIHx8XHJcbiAgICAgICAgbWF0Y2hPcHRpb25WYWx1ZShhc2lzdGVudGVUaXBvcywgcmF3SW5pdGlhbEFzaXN0ZW50ZSkgfHxcclxuICAgICAgICByYXdJbml0aWFsQXNpc3RlbnRlO1xyXG4gICAgICBjb25zdCBub3JtYWxpemVkQ29udGFjdE1ldGhvZCA9XG4gICAgICAgIG1hdGNoT3B0aW9uVmFsdWUoY29udGFjdE1ldGhvZHMsIGNvbnRhY3RNZXRob2QpIHx8XG4gICAgICAgIG1hdGNoT3B0aW9uVmFsdWUoY29udGFjdE1ldGhvZHMsIHJhd0luaXRpYWxDb250YWN0TWV0aG9kKTtcblxuICAgICAgY29uc3QgcGF5bG9hZCA9IHtcbiAgICAgICAgYWNjb3VudE51bSxcbiAgICAgICAgdmlzaXRUeXBlOiB0b051bGxhYmxlRW51bU51bWJlcihub3JtYWxpemVkVmlzaXRUeXBlKSxcbiAgICAgICAgY29udGFjdE1ldGhvZDogdG9OdWxsYWJsZUVudW1OdW1iZXIobm9ybWFsaXplZENvbnRhY3RNZXRob2QpLFxuICAgICAgICBhc2lzdGVudGVUaXBvOiB0b051bGxhYmxlRW51bU51bWJlcihub3JtYWxpemVkQXNpc3RlbnRlVGlwbyksXG4gICAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgICB0cmFuc0RhdGUsXG4gICAgICAgIGNvbWVudGFyaW9zLFxyXG4gICAgICAgIGFudGVjZWRlbnRlcyxcclxuICAgICAgICBjb25jbHVzaW9uZXMsXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBsb2dTYWZlUmVjSWRJbkRldihcInVwZGF0ZVwiLCBzYWZlUmVjSWRWYWx1ZSk7XHJcbiAgICAgIGNvbnN0IHNhZmVSZWNJZCA9IGVuY29kZVVSSUNvbXBvbmVudChzYWZlUmVjSWRWYWx1ZSk7XHJcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPFZpc2l0Q29tbWFuZFJlc3BvbnNlPihgL1Zpc2l0YXMvVXBkYXRlQWN0aXZpdHkvJHtzYWZlUmVjSWR9YCwge1xyXG4gICAgICAgIG1ldGhvZDogXCJQVVRcIixcclxuICAgICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXHJcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGF5bG9hZCksXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgaWYgKCFpc0NvbW1hbmRTdWNjZXNzKHJlc3BvbnNlKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihnZXRDb21tYW5kTWVzc2FnZShyZXNwb25zZSkgfHwgaW5kVChcIlZpc2l0c19EZXRhaWxfVXBkYXRlRmFpbGVkXCIsIFwiVXBkYXRlIGZhaWxlZC5cIikpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzZXRTdGF0dXMoaW5kVChcIlZpc2l0c19EZXRhaWxfVXBkYXRlZFwiLCBcIkFjdGl2aXR5IHVwZGF0ZWRcIikpO1xyXG4gICAgICBzZXRJc0VkaXRpbmcoZmFsc2UpO1xyXG4gICAgICBzeW5jRWRpdE1vZGVGbGFnKGZhbHNlKTtcclxuICAgICAgY2xlYXJEcmFmdCgpO1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBlcnJvciBpbnN0YW5jZW9mIEVycm9yICYmIGVycm9yLm1lc3NhZ2VcclxuICAgICAgICA/IGVycm9yLm1lc3NhZ2VcclxuICAgICAgICA6IGluZFQoXCJWaXNpdHNfRGV0YWlsX1VwZGF0ZUVycm9yXCIsIFwiVXBkYXRlIGVycm9yLlwiKTtcclxuICAgICAgc2V0TW9kYWxFcnJvcihtZXNzYWdlKTtcclxuICAgICAgc2V0U3RhdHVzKG1lc3NhZ2UpO1xyXG4gICAgICBmbGFzaEFjdGlvbk1hcmsoXCJlcnJvclByb2Nlc3NcIiwgMTUwMCk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0gZmluYWxseSB7XHJcbiAgICAgIHNldEJ1c3koZmFsc2UpO1xyXG4gICAgfVxyXG4gIH0sIFtcclxuICAgIGFjY291bnROdW0sXHJcbiAgICBhbnRlY2VkZW50ZXMsXHJcbiAgICBhc2lzdGVudGVUaXBvLFxyXG4gICAgYXNpc3RlbnRlVGlwb3MsXHJcbiAgICBidXN5LFxyXG4gICAgY2FuRWRpdEhpc3RvcnksXHJcbiAgICBjbGVhckRyYWZ0LFxyXG4gICAgY29tZW50YXJpb3MsXHJcbiAgICBjb25jbHVzaW9uZXMsXHJcbiAgICBjb250YWN0TWV0aG9kLFxyXG4gICAgY29udGFjdE1ldGhvZHMsXHJcbiAgICBkZWZhdWx0VmlzaXRUeXBlLFxyXG4gICAgZGVzY3JpcHRpb24sXHJcbiAgICBpc0VkaXRpbmcsXG4gICAgbWF0Y2hPcHRpb25WYWx1ZSxcbiAgICBvblBlcm1pc3Npb25CbG9ja2VkLFxuICAgIHJhd0luaXRpYWxBc2lzdGVudGUsXG4gICAgcmF3SW5pdGlhbENvbnRhY3RNZXRob2QsXHJcbiAgICByYXdJbml0aWFsVmlzaXRUeXBlLFxyXG4gICAgcmVjSWQsXHJcbiAgICBzZXRCdXN5LFxyXG4gICAgc2V0SXNFZGl0aW5nLFxyXG4gICAgc2V0TW9kYWxFcnJvcixcclxuICAgIHNldFN0YXR1cyxcclxuICAgIHN5bmNFZGl0TW9kZUZsYWcsXHJcbiAgICB0cmFuc0RhdGUsXHJcbiAgICB2aXNpdFR5cGUsXHJcbiAgICB2aXNpdFR5cGVzLFxyXG4gIF0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVEZWxldGUgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XG4gICAgaWYgKGJ1c3kpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoIWNhbkRlbGV0ZUhpc3RvcnkpIHtcbiAgICAgIG9uUGVybWlzc2lvbkJsb2NrZWQ/LihcImRlbGV0ZVwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cclxuICAgIGNvbnN0IHNhZmVSZWNJZFZhbHVlID0gcmVzb2x2ZVNhZmVSZWNJZChyZWNJZCk7XHJcbiAgICBpZiAoc2FmZVJlY0lkVmFsdWUgPT09IG51bGwpIHtcclxuICAgICAgY29uc3QgbWVzc2FnZSA9IGluZFQoXCJWaXNpdHNfRGV0YWlsX0ludmFsaWRSZWNJZFwiLCBcIkNvdWxkIG5vdCByZXNvbHZlIGFjdGl2aXR5IGlkZW50aWZpZXIuIFJlbG9hZCBhbmQgdHJ5IGFnYWluLlwiKTtcclxuICAgICAgc2V0TW9kYWxFcnJvcihtZXNzYWdlKTtcclxuICAgICAgc2V0U3RhdHVzKG1lc3NhZ2UpO1xyXG4gICAgICBmbGFzaEFjdGlvbk1hcmsoXCJlcnJvclByb2Nlc3NcIiwgMTUwMCk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xyXG4gICAgc2V0QnVzeSh0cnVlKTtcclxuICAgIHNldFN0YXR1cyhpbmRUKFwiVmlzaXRzX0RldGFpbF9EZWxldGluZ1wiLCBcIkRlbGV0aW5nIGFjdGl2aXR5Li4uXCIpKTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBsb2dTYWZlUmVjSWRJbkRldihcImRlbGV0ZVwiLCBzYWZlUmVjSWRWYWx1ZSk7XHJcbiAgICAgIGNvbnN0IHNhZmVSZWNJZCA9IGVuY29kZVVSSUNvbXBvbmVudChzYWZlUmVjSWRWYWx1ZSk7XHJcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPFZpc2l0Q29tbWFuZFJlc3BvbnNlPihgL1Zpc2l0YXMvRGVsZXRlQWN0aXZpdHkvJHtzYWZlUmVjSWR9YCwgeyBtZXRob2Q6IFwiREVMRVRFXCIgfSk7XHJcbiAgICAgIGlmICghaXNDb21tYW5kU3VjY2VzcyhyZXNwb25zZSkpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZ2V0Q29tbWFuZE1lc3NhZ2UocmVzcG9uc2UpIHx8IGluZFQoXCJWaXNpdHNfRGV0YWlsX0RlbGV0ZUZhaWxlZFwiLCBcIkRlbGV0ZSBmYWlsZWQuXCIpKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2V0U3RhdHVzKGluZFQoXCJWaXNpdHNfRGV0YWlsX0RlbGV0ZWRcIiwgXCJBY3Rpdml0eSBkZWxldGVkXCIpKTtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zdCBtZXNzYWdlID0gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciAmJiBlcnJvci5tZXNzYWdlXHJcbiAgICAgICAgPyBlcnJvci5tZXNzYWdlXHJcbiAgICAgICAgOiBpbmRUKFwiVmlzaXRzX0RldGFpbF9EZWxldGVFcnJvclwiLCBcIkRlbGV0ZSBlcnJvci5cIik7XHJcbiAgICAgIHNldE1vZGFsRXJyb3IobWVzc2FnZSk7XHJcbiAgICAgIHNldFN0YXR1cyhtZXNzYWdlKTtcclxuICAgICAgZmxhc2hBY3Rpb25NYXJrKFwiZXJyb3JQcm9jZXNzXCIsIDE1MDApO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9IGZpbmFsbHkge1xyXG4gICAgICBzZXRCdXN5KGZhbHNlKTtcclxuICAgIH1cclxuICB9LCBbYnVzeSwgY2FuRGVsZXRlSGlzdG9yeSwgb25QZXJtaXNzaW9uQmxvY2tlZCwgcmVjSWQsIHNldEJ1c3ksIHNldE1vZGFsRXJyb3IsIHNldFN0YXR1c10pO1xuXHJcbiAgcmV0dXJuIHtcclxuICAgIGhhbmRsZVVwZGF0ZSxcclxuICAgIGhhbmRsZURlbGV0ZSxcclxuICB9O1xyXG59O1xyXG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuXG50eXBlIFByb3BzID0ge1xuICBsYWJlbDogc3RyaW5nO1xuICB2YWx1ZTogc3RyaW5nO1xufTtcblxuLy8gUmVhZC1vbmx5IG93bmVyIGZpZWxkIHNob3duIG9ubHkgd2hlbiB2aXNpYmlsaXR5IGNvbmZpcm1zIGEgbWFuYWdlciBjb250ZXh0LlxuY29uc3QgRGV0YWlsT3duZXJGaWVsZCA9ICh7IGxhYmVsLCB2YWx1ZSB9OiBQcm9wcykgPT4ge1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwidmlzaXRhLWZpZWxkLXRleHRcIj5cbiAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb3JtLWxhYmVsIGZvbnQtc2VtaWJvbGRcIiBodG1sRm9yPVwidmlzaXQtZGV0YWlsLW93bmVyXCI+XG4gICAgICAgIHtsYWJlbH1cbiAgICAgIDwvbGFiZWw+XG4gICAgICA8aW5wdXRcbiAgICAgICAgaWQ9XCJ2aXNpdC1kZXRhaWwtb3duZXJcIlxuICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2wgaW5kLXJlYWRvbmx5LWZpZWxkIGN1cnNvci1kZWZhdWx0XCJcbiAgICAgICAgdmFsdWU9e3ZhbHVlfVxuICAgICAgICByZWFkT25seVxuICAgICAgICBhcmlhLXJlYWRvbmx5PVwidHJ1ZVwiXG4gICAgICAvPlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRGV0YWlsT3duZXJGaWVsZDtcbiIsICJpbXBvcnQgeyBnZXRDc3JmVG9rZW4gfSBmcm9tIFwiLi9hcGlTZXJ2aWNlLnRzXCI7XG5cbmV4cG9ydCB0eXBlIE1vZHVsZVBlcm1pc3Npb25UcmFjZVBheWxvYWQgPSBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPjtcblxuY29uc3QgVFJBQ0VfVVJMID0gXCIvTW9kdWxlUGVybWlzc2lvbnMvVHJhY2VcIjtcbmNvbnN0IE1BWF9CRUFDT05fQllURVMgPSA2MF8wMDA7XG5cbi8vIFNlbmRzIG1vZHVsZSBwZXJtaXNzaW9uIGRpYWdub3N0aWNzIHRvIHNlcnZlciBsb2dzIHdpdGhvdXQgYWZmZWN0aW5nIHRoZSBVSSBmbG93LlxuZXhwb3J0IGNvbnN0IHBvc3RNb2R1bGVQZXJtaXNzaW9uVHJhY2UgPSAoXG4gIGV2ZW50TmFtZTogc3RyaW5nLFxuICBwYXlsb2FkOiBNb2R1bGVQZXJtaXNzaW9uVHJhY2VQYXlsb2FkID0ge31cbik6IHZvaWQgPT4ge1xuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuO1xuXG4gIGNvbnN0IGV2ZW50ID0gU3RyaW5nKGV2ZW50TmFtZSB8fCBcIlwiKS50cmltKCk7XG4gIGlmICghZXZlbnQpIHJldHVybjtcblxuICBjb25zdCBib2R5ID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgIGV2ZW50LFxuICAgIHBhdGg6IHdpbmRvdy5sb2NhdGlvbj8ucGF0aG5hbWUgfHwgXCJcIixcbiAgICAuLi5wYXlsb2FkLFxuICB9KTtcblxuICBjb25zdCBjc3JmVG9rZW4gPSBnZXRDc3JmVG9rZW4oKTtcbiAgY29uc3QgaGVhZGVyczogSGVhZGVyc0luaXQgPSB7XG4gICAgQWNjZXB0OiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICBcIlgtUmVxdWVzdGVkLVdpdGhcIjogXCJYTUxIdHRwUmVxdWVzdFwiLFxuICB9O1xuXG4gIGlmIChjc3JmVG9rZW4pIHtcbiAgICAoaGVhZGVycyBhcyBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+KS5SZXF1ZXN0VmVyaWZpY2F0aW9uVG9rZW4gPSBjc3JmVG9rZW47XG4gIH1cblxuICB2b2lkIGZldGNoKFRSQUNFX1VSTCwge1xuICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgY3JlZGVudGlhbHM6IFwic2FtZS1vcmlnaW5cIixcbiAgICBoZWFkZXJzLFxuICAgIGJvZHksXG4gICAga2VlcGFsaXZlOiBib2R5Lmxlbmd0aCA8PSBNQVhfQkVBQ09OX0JZVEVTLFxuICB9KS5jYXRjaCgoKSA9PiB1bmRlZmluZWQpO1xufTtcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBEZXRhaWxGb3JtIGZyb20gXCIuL0RldGFpbEZvcm0udHN4XCI7XHJcbmltcG9ydCBWaXNpdGFzUGFnZVByb3ZpZGVycyBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1Zpc2l0YXNQYWdlUHJvdmlkZXJzLnRzeFwiO1xuaW1wb3J0IHsgbW91bnRSZWFjdElzbGFuZCwgbW91bnRXaGVuRG9jdW1lbnRSZWFkeSB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9yZWFjdElzbGFuZC50c3hcIjtcblxudHlwZSBQcm9wcyA9IHtcbiAgY29tcGFueUlkPzogc3RyaW5nO1xuICBheFVzZXJJZD86IHN0cmluZztcbiAgcGVybWlzc2lvbnNSZXZpc2lvbj86IHN0cmluZztcbn07XG5cbi8vIFBhZ2UgZW50cnkgZm9yIHRoZSB2aXNpdGFzIGRldGFpbCBpc2xhbmQuXG5jb25zdCBEZXRhaWxQYWdlID0gKHsgY29tcGFueUlkID0gXCJcIiwgYXhVc2VySWQgPSBcIlwiLCBwZXJtaXNzaW9uc1JldmlzaW9uID0gXCJcIiB9OiBQcm9wcykgPT4ge1xuICByZXR1cm4gKFxuICAgIDxWaXNpdGFzUGFnZVByb3ZpZGVycz5cbiAgICAgIDxEZXRhaWxGb3JtIGNvbXBhbnlJZD17Y29tcGFueUlkfSBheFVzZXJJZD17YXhVc2VySWR9IHBlcm1pc3Npb25zUmV2aXNpb249e3Blcm1pc3Npb25zUmV2aXNpb259IC8+XG4gICAgPC9WaXNpdGFzUGFnZVByb3ZpZGVycz5cbiAgKTtcbn07XG5cclxuY29uc3QgbW91bnQgPSAoKSA9PiB7XHJcbiAgY29uc3Qgcm9vdEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2aXNpdGEtZGV0YWlsLXJvb3RcIik7XG4gIGlmICghcm9vdEVsKSByZXR1cm47XG4gIGNvbnN0IGNvbXBhbnlJZCA9IHJvb3RFbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNvbXBhbnktaWRcIikgfHwgXCJcIjtcbiAgY29uc3QgYXhVc2VySWQgPSByb290RWwuZ2V0QXR0cmlidXRlKFwiZGF0YS1heC11c2VyLWlkXCIpIHx8IFwiXCI7XG4gIGNvbnN0IHBlcm1pc3Npb25zUmV2aXNpb24gPSByb290RWwuZ2V0QXR0cmlidXRlKFwiZGF0YS1wZXJtaXNzaW9ucy1yZXZpc2lvblwiKSB8fCBcIlwiO1xuXG4gIG1vdW50UmVhY3RJc2xhbmQoXG4gICAgcm9vdEVsLFxuICAgIDxEZXRhaWxQYWdlIGNvbXBhbnlJZD17Y29tcGFueUlkfSBheFVzZXJJZD17YXhVc2VySWR9IHBlcm1pc3Npb25zUmV2aXNpb249e3Blcm1pc3Npb25zUmV2aXNpb259IC8+XG4gICk7XG59O1xuXHJcbm1vdW50V2hlbkRvY3VtZW50UmVhZHkobW91bnQpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRGV0YWlsUGFnZTtcclxuIl0sCiAgIm1hcHBpbmdzIjog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QUFBO0FBSE4sSUFBTSxhQUFhLENBQUMsRUFBRSxZQUFZLElBQUksV0FBVyxJQUFJLHNCQUFzQixHQUFHLE1BQWE7QUFDekYsU0FDRSw2Q0FBQyxnQ0FDQyx1REFBQyxjQUFXLFdBQXNCLFVBQW9CLHFCQUEwQyxHQUNsRztBQUVKO0FBRUEsSUFBTSxRQUFRLE1BQU07QUFDbEIsUUFBTSxTQUFTLFNBQVMsZUFBZSxvQkFBb0I7QUFDM0QsTUFBSSxDQUFDLE9BQVE7QUFDYixRQUFNLFlBQVksT0FBTyxhQUFhLGlCQUFpQixLQUFLO0FBQzVELFFBQU0sV0FBVyxPQUFPLGFBQWEsaUJBQWlCLEtBQUs7QUFDM0QsUUFBTSxzQkFBc0IsT0FBTyxhQUFhLDJCQUEyQixLQUFLO0FBRWhGO0FBQUEsSUFDRTtBQUFBLElBQ0EsNkNBQUMsY0FBVyxXQUFzQixVQUFvQixxQkFBMEM7QUFBQSxFQUNsRztBQUNGO0FBRUEsdUJBQXVCLEtBQUs7QUFFNUIsSUFBTyxxQkFBUTsiLAogICJuYW1lcyI6IFsiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfanN4X3J1bnRpbWUiXQp9Cg==
