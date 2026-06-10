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
  canMutateOwner,
  formatModuleVisibleUserLabel,
  getVisibleUserForOwner,
  hasMutationPolicy,
  normalizeOwnerAxUserId,
  useModuleDataVisibility
} from "./chunks/chunk-ZRTHZVEN.js";
import {
  SelectCombobox_default
} from "./chunks/chunk-WNGAZ2I2.js";
import "./chunks/chunk-XB6OXILH.js";
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
} from "./chunks/chunk-IHXECQHV.js";
import "./chunks/chunk-SRZDJTMJ.js";
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
        showPermissionModal();
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
        showPermissionModal();
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
  setModalError,
  setBusy,
  setStatus,
  setIsEditing
}) => {
  const handleUpdate = (0, import_react4.useCallback)(async () => {
    if (busy || !isEditing) return false;
    if (!canEditHistory) {
      showPermissionModal();
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
      const contactMethodValue = Number(normalizedContactMethod);
      const payload = {
        accountNum,
        visitType: normalizedVisitType,
        contactMethod: Number.isFinite(contactMethodValue) ? contactMethodValue : null,
        asistenteTipo: normalizedAsistenteTipo,
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
      showPermissionModal();
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
  }, [busy, canDeleteHistory, recId, setBusy, setModalError, setStatus]);
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
  const { visibleUserByOwnerAxUserId, visibleUsersReady } = useModuleDataVisibility({
    enabled: canViewHistory || canEditHistory || canDeleteHistory,
    companyId,
    axUserId,
    permissionsRevision,
    appCode: APP_CODE,
    moduleCode: MODULE_CODE,
    preloadedUsers: typeof window !== "undefined" ? window.__IND_VISIBLE_VISIT_USERS__ : void 0,
    onForbidden: showPermissionModal
  });
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
  const recId = activityRecId;
  const accountNum = String(detail.accountNum ?? detail.AccountNum ?? "");
  const actividadId = String(detail.actividadId ?? detail.ActividadId ?? "");
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
  const visibleOwner = (0, import_react5.useMemo)(() => {
    return getVisibleUserForOwner(visibleUserByOwnerAxUserId, detailOwnerAxUserId);
  }, [detailOwnerAxUserId, visibleUserByOwnerAxUserId]);
  const detailOwnerText = visibleOwner ? formatModuleVisibleUserLabel(visibleOwner) : detailOwnerRawText || detailOwnerAxUserId;
  const isCurrentOwner = !!detailOwnerAxUserId && normalizeOwnerAxUserId(detailOwnerAxUserId) === normalizeOwnerAxUserId(axUserId);
  const showOwnerField = visibleUsersReady && !!visibleOwner && !isCurrentOwner;
  const ownerCanMutate = !visibleUsersReady || !hasMutationPolicy(visibleOwner) ? true : canMutateOwner(visibleUserByOwnerAxUserId, detailOwnerAxUserId);
  const canEditVisit = canEditHistory && ownerCanMutate;
  const canDeleteVisit = canDeleteHistory && ownerCanMutate;
  const { editModeKeyRef, syncEditModeFlag, clearDraft, applyDraftValues } = useDetailEditSession({
    actividadId,
    recId,
    canEditHistory: canEditVisit,
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
      readOnly: !isEditing,
      allowEdit: canEditVisit,
      editModeKey: editModeKeyRef.current
    });
  }, [comentarios, editModeKeyRef, fieldIdComentarios, isEditing, canEditVisit, openTextEditor]);
  const handleComentariosHold = (0, import_react5.useCallback)((target, clientY) => {
    if (!target || !isOverflowing(target)) return false;
    setPreviewAnchor(target);
    return showPreviewTooltip(String(comentarios || ""), clientY);
  }, [comentarios]);
  const handleAntecedentesTap = (0, import_react5.useCallback)((event) => {
    event.preventDefault();
    openTextEditor(fieldIdAntecedentes, indT("Visits_Field_Background", "Background"), antecedentes, {
      readOnly: !isEditing,
      allowEdit: canEditVisit,
      editModeKey: editModeKeyRef.current
    });
  }, [antecedentes, editModeKeyRef, fieldIdAntecedentes, isEditing, canEditVisit, openTextEditor]);
  const handleAntecedentesHold = (0, import_react5.useCallback)((target, clientY) => {
    if (!target || !isOverflowing(target)) return false;
    setPreviewAnchor(target);
    return showPreviewTooltip(String(antecedentes || ""), clientY);
  }, [antecedentes]);
  const handleConclusionesTap = (0, import_react5.useCallback)((event) => {
    event.preventDefault();
    openTextEditor(fieldIdConclusiones, indT("Visits_Field_Conclusions", "Conclusions"), conclusiones, {
      readOnly: !isEditing,
      allowEdit: canEditVisit,
      editModeKey: editModeKeyRef.current
    });
  }, [conclusiones, editModeKeyRef, fieldIdConclusiones, isEditing, canEditVisit, openTextEditor]);
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
    listenPageShow: true
  });
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
  const hasActiveProcess = (0, import_react5.useMemo)(() => busy || isEditing, [busy, isEditing]);
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
    if (!isEditing) {
      el.classList.add("ind-readonly-surface");
    } else {
      el.classList.remove("ind-readonly-surface");
    }
  }, [isEditing]);
  (0, import_react5.useEffect)(() => {
    if (isEditing) {
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
  }, [isEditing, transDate, visitType, contactMethod, asistenteTipo, description, comentarios, antecedentes, conclusiones]);
  (0, import_react5.useEffect)(() => {
    if (isEditing) return void 0;
    return bindReadOnlyGuard(readOnlySurfaceRef.current);
  }, [isEditing]);
  const handleEnableEdit = (0, import_react5.useCallback)(() => {
    if (!canEditVisit) {
      showPermissionModal();
      return;
    }
    setIsEditing(true);
    syncEditModeFlag(true);
    setStatus(indT("Visits_Detail_EditingEnabled", "Editing enabled"));
  }, [canEditVisit, syncEditModeFlag]);
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
    isEditing,
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
    setModalError,
    setBusy,
    setStatus,
    setIsEditing
  });
  useDetailTopbarActions({
    busy,
    modalOpen: modal.open,
    isEditing,
    canEditHistory: canEditVisit,
    canDeleteHistory: canDeleteVisit,
    transDate,
    setModalError,
    handleEnableEdit,
    handleCancelEdit,
    handleUpdate,
    handleDelete,
    openConfirm,
    closeConfirm,
    permissionsReady: visibleUsersReady
  });
  const descriptionLabel = indT("Visits_Field_Description", "Description");
  const commentsLabel = indT("Visits_Field_Comments", "Comments");
  const backgroundLabel = indT("Visits_Field_Background", "Background");
  const conclusionsLabel = indT("Visits_Field_Conclusions", "Conclusions");
  const detailDescriptionClassName = classNames(
    "form-control",
    isEditing ? "border-neutral-200 text-neutral-900" : "border-neutral-200 ind-readonly-field"
  );
  const detailReadOnlyClassName = classNames("form-control cursor-pointer", !isEditing ? "ind-readonly-field" : "");
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
                disabled: !isEditing,
                readOnly: !isEditing
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
                disabled: !isEditing,
                readOnly: !isEditing,
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
                disabled: !isEditing,
                readOnly: !isEditing,
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
              descriptionDisabled: !isEditing,
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvZGV0YWlsL0RldGFpbEZvcm0udHN4IiwgIi4uL3JlYWN0L3NyYy91dGlscy9kb21HdWFyZHMudHMiLCAiLi4vcmVhY3Qvc3JjL3V0aWxzL3N0cmluZ3MudHMiLCAiLi4vcmVhY3Qvc3JjL2hvb2tzL3VzZURldGFpbEh5ZHJhdGlvbi50cyIsICIuLi9yZWFjdC9zcmMvaG9va3MvdXNlRGV0YWlsVG9wYmFyQWN0aW9ucy50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9kZXRhaWwvdXNlRGV0YWlsRWRpdFNlc3Npb24udHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvZGV0YWlsL3VzZURldGFpbE11dGF0aW9ucy50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9kZXRhaWwvRGV0YWlsT3duZXJGaWVsZC50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvZGV0YWlsL0RldGFpbFBhZ2UudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCwgdXNlUmVmLCB1c2VDYWxsYmFjaywgdXNlTWVtbyB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgU2luZ2xlRGF0ZVBpY2tlciBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NpbmdsZURhdGVQaWNrZXIudHN4XCI7XHJcbmltcG9ydCBDb25maXJtTW9kYWwgZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9Db25maXJtTW9kYWwudHN4XCI7XHJcbmltcG9ydCBTZWxlY3RDb21ib2JveCBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NlbGVjdENvbWJvYm94LnRzeFwiO1xyXG5pbXBvcnQgQXBwRXJyb3JCb3VuZGFyeSBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0FwcEVycm9yQm91bmRhcnkudHN4XCI7XHJcbmltcG9ydCB7IHVzZVZpc2l0YXMgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlVmlzaXRhcy50c1wiO1xyXG5pbXBvcnQgU3Bpbm5lciBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NwaW5uZXIudHN4XCI7XHJcbmltcG9ydCBWaXNpdE5hcnJhdGl2ZUZpZWxkcyBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy92aXNpdGFzL1Zpc2l0TmFycmF0aXZlRmllbGRzLnRzeFwiO1xyXG5pbXBvcnQgeyBjbGFzc05hbWVzIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2NsYXNzTmFtZXMudHNcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB7IGNhbkFjY2Vzcywgc2hvd1Blcm1pc3Npb25Nb2RhbCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9wZXJtaXNzaW9ucy50c1wiO1xyXG5pbXBvcnQgeyBiaW5kUmVhZE9ubHlHdWFyZCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9kb21HdWFyZHMudHNcIjtcclxuaW1wb3J0IHsgaGFzVmFsdWUgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvc3RyaW5ncy50c1wiO1xyXG5pbXBvcnQgeyBuYXZpZ2F0ZVRvVGV4dEVkaXRvckZpZWxkIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3RleHRFZGl0b3JOYXZpZ2F0aW9uLnRzXCI7XHJcbmltcG9ydCB7IGZsYXNoQWN0aW9uTWFyayB9IGZyb20gXCIuLi8uLi8uLi91dGlscy92aXNpdGFzSGlzdG9yeS50c1wiO1xyXG5pbXBvcnQgeyBzZXRQcmV2aWV3QW5jaG9yLCBzaG93UHJldmlld1Rvb2x0aXAsIGlzT3ZlcmZsb3dpbmcgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvcHJldmlld1Rvb2x0aXAudHNcIjtcclxuaW1wb3J0IHsgdXNlVGFwR3VhcmQgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlVGFwR3VhcmQudHNcIjtcclxuaW1wb3J0IHsgdXNlQ29uZmlybURpYWxvZyB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VDb25maXJtRGlhbG9nLnRzXCI7XHJcbmltcG9ydCB7IHVzZURldGFpbEh5ZHJhdGlvbiB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VEZXRhaWxIeWRyYXRpb24udHNcIjtcbmltcG9ydCB7IHVzZURldGFpbFRvcGJhckFjdGlvbnMgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlRGV0YWlsVG9wYmFyQWN0aW9ucy50c1wiO1xuaW1wb3J0IHsgdXNlVGV4dEVkaXRvckZpZWxkcyB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VUZXh0RWRpdG9yRmllbGRzLnRzXCI7XG5pbXBvcnQgeyB1c2VNb2R1bGVEYXRhVmlzaWJpbGl0eSB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VNb2R1bGVEYXRhVmlzaWJpbGl0eS50c1wiO1xuaW1wb3J0IHsgdXNlRGV0YWlsRWRpdFNlc3Npb24gfSBmcm9tIFwiLi91c2VEZXRhaWxFZGl0U2Vzc2lvbi50c1wiO1xuaW1wb3J0IHsgdXNlRGV0YWlsTXV0YXRpb25zIH0gZnJvbSBcIi4vdXNlRGV0YWlsTXV0YXRpb25zLnRzXCI7XG5pbXBvcnQge1xuICBjYW5NdXRhdGVPd25lcixcbiAgZm9ybWF0TW9kdWxlVmlzaWJsZVVzZXJMYWJlbCxcbiAgZ2V0VmlzaWJsZVVzZXJGb3JPd25lcixcbiAgaGFzTXV0YXRpb25Qb2xpY3ksXG4gIG5vcm1hbGl6ZU93bmVyQXhVc2VySWQsXG59IGZyb20gXCIuLi8uLi8uLi91dGlscy9tb2R1bGVEYXRhVmlzaWJpbGl0eS50c1wiO1xuaW1wb3J0IERldGFpbE93bmVyRmllbGQgZnJvbSBcIi4vRGV0YWlsT3duZXJGaWVsZC50c3hcIjtcblxuY29uc3QgRURJVE9SX1JFVFVSTl9GTEFHX1RUTF9NUyA9IDIgKiA2MCAqIDYwICogMTAwMDtcbmNvbnN0IEFQUF9DT0RFID0gXCJDUk1cIjtcbmNvbnN0IE1PRFVMRV9DT0RFID0gXCJWSVNJVEFTX0dFU1RJT05cIjtcblxudHlwZSBEZXRhaWxGb3JtUHJvcHMgPSB7XG4gIGNvbXBhbnlJZD86IHN0cmluZztcbiAgYXhVc2VySWQ/OiBzdHJpbmc7XG4gIHBlcm1pc3Npb25zUmV2aXNpb24/OiBzdHJpbmc7XG59O1xuXG5jb25zdCBzYWZlRGV0YWlsVGV4dCA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZyA9PiBTdHJpbmcodmFsdWUgPz8gXCJcIikudHJpbSgpO1xuXG5jb25zdCBmaXJzdERldGFpbFRleHQgPSAoLi4udmFsdWVzOiB1bmtub3duW10pOiBzdHJpbmcgPT4ge1xuICBmb3IgKGNvbnN0IHZhbHVlIG9mIHZhbHVlcykge1xuICAgIGNvbnN0IHRleHQgPSBzYWZlRGV0YWlsVGV4dCh2YWx1ZSk7XG4gICAgaWYgKHRleHQpIHJldHVybiB0ZXh0O1xuICB9XG5cbiAgcmV0dXJuIFwiXCI7XG59O1xuXG5jb25zdCBEZXRhaWxBcHAgPSAoeyBjb21wYW55SWQgPSBcIlwiLCBheFVzZXJJZCA9IFwiXCIsIHBlcm1pc3Npb25zUmV2aXNpb24gPSBcIlwiIH06IERldGFpbEZvcm1Qcm9wcykgPT4ge1xuICBjb25zdCB7IHZpc2l0VHlwZXMsIGNvbnRhY3RNZXRob2RzLCBhc2lzdGVudGVUaXBvcyB9ID0gdXNlVmlzaXRhcygpO1xuICBjb25zdCBjYW5WaWV3SGlzdG9yeSA9IGNhbkFjY2VzcyhcIlZJU0lUQVNfR0VTVElPTlwiLCBcIlZpZXdcIik7XG4gIGNvbnN0IGNhbkVkaXRIaXN0b3J5ID0gY2FuQWNjZXNzKFwiVklTSVRBU19HRVNUSU9OXCIsIFwiRWRpdFwiKTtcbiAgY29uc3QgY2FuRGVsZXRlSGlzdG9yeSA9IGNhbkFjY2VzcyhcIlZJU0lUQVNfR0VTVElPTlwiLCBcIkZ1bGxBY2Nlc3NcIik7XG4gIHR5cGUgQWN0aXZpdHlEZXRhaWxQYXlsb2FkID0ge1xuICAgIHJlY0lkPzogc3RyaW5nIHwgbnVtYmVyO1xyXG4gICAgUmVjSWQ/OiBzdHJpbmcgfCBudW1iZXI7XHJcbiAgICByZWZSZWNJZEFjdGl2aWRhZD86IHN0cmluZyB8IG51bWJlcjtcclxuICAgIFJlZlJlY0lkQWN0aXZpZGFkPzogc3RyaW5nIHwgbnVtYmVyO1xyXG4gICAgYWN0aXZpZGFkUmVjSWQ/OiBzdHJpbmcgfCBudW1iZXI7XHJcbiAgICBBY3RpdmlkYWRSZWNJZD86IHN0cmluZyB8IG51bWJlcjtcclxuICAgIHJlYWRPbmx5PzogYm9vbGVhbjtcbiAgICBhbGxvd0VkaXQ/OiBib29sZWFuO1xuICAgIGVkaXRNb2RlS2V5Pzogc3RyaW5nO1xuICAgIG93bmVyQXhVc2VySWQ/OiBzdHJpbmc7XG4gICAgT3duZXJBeFVzZXJJZD86IHN0cmluZztcbiAgICBvd25lck5hbWU/OiBzdHJpbmc7XG4gICAgT3duZXJOYW1lPzogc3RyaW5nO1xuICAgIG93bmVyQWxpYXM/OiBzdHJpbmc7XG4gICAgT3duZXJBbGlhcz86IHN0cmluZztcbiAgICBjcmVhdGVkQnlVc2VySWQ/OiBzdHJpbmc7XG4gICAgQ3JlYXRlZEJ5VXNlcklkPzogc3RyaW5nO1xuICAgIHVzZXJJZD86IHN0cmluZztcbiAgICBVc2VySWQ/OiBzdHJpbmc7XG4gICAgaW5kQ3JlYXRlZEJ5VXNlcklkPzogc3RyaW5nO1xuICAgIElORENyZWF0ZWRCeVVzZXJJZD86IHN0cmluZztcbiAgICBba2V5OiBzdHJpbmddOiB1bmtub3duO1xuICB9O1xuXG4gIGNvbnN0IGRldGFpbCA9ICh3aW5kb3cuX19BQ1RJVklUWV9ERVRBSUxfXyBhcyBBY3Rpdml0eURldGFpbFBheWxvYWQpIHx8IHt9O1xuICBjb25zdCB7IHZpc2libGVVc2VyQnlPd25lckF4VXNlcklkLCB2aXNpYmxlVXNlcnNSZWFkeSB9ID0gdXNlTW9kdWxlRGF0YVZpc2liaWxpdHkoe1xuICAgIGVuYWJsZWQ6IGNhblZpZXdIaXN0b3J5IHx8IGNhbkVkaXRIaXN0b3J5IHx8IGNhbkRlbGV0ZUhpc3RvcnksXG4gICAgY29tcGFueUlkLFxuICAgIGF4VXNlcklkLFxuICAgIHBlcm1pc3Npb25zUmV2aXNpb24sXG4gICAgYXBwQ29kZTogQVBQX0NPREUsXG4gICAgbW9kdWxlQ29kZTogTU9EVUxFX0NPREUsXG4gICAgcHJlbG9hZGVkVXNlcnM6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cuX19JTkRfVklTSUJMRV9WSVNJVF9VU0VSU19fIDogdW5kZWZpbmVkLFxuICAgIG9uRm9yYmlkZGVuOiBzaG93UGVybWlzc2lvbk1vZGFsLFxuICB9KTtcblxyXG4gIGNvbnN0IHJlc29sdmVBY3Rpdml0eVJlY0lkID0gKHBheWxvYWQ6IEFjdGl2aXR5RGV0YWlsUGF5bG9hZCk6IHN0cmluZyA9PiB7XHJcbiAgICBjb25zdCBjYW5kaWRhdGVzID0gW1xyXG4gICAgICBwYXlsb2FkLnJlY0lkLFxyXG4gICAgICBwYXlsb2FkLlJlY0lkLFxyXG4gICAgICBwYXlsb2FkLnJlZlJlY0lkQWN0aXZpZGFkLFxyXG4gICAgICBwYXlsb2FkLlJlZlJlY0lkQWN0aXZpZGFkLFxyXG4gICAgICBwYXlsb2FkLmFjdGl2aWRhZFJlY0lkLFxyXG4gICAgICBwYXlsb2FkLkFjdGl2aWRhZFJlY0lkLFxyXG4gICAgXTtcclxuXHJcbiAgICBmb3IgKGNvbnN0IGNhbmRpZGF0ZSBvZiBjYW5kaWRhdGVzKSB7XHJcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSBTdHJpbmcoY2FuZGlkYXRlID8/IFwiXCIpLnRyaW0oKTtcclxuICAgICAgaWYgKG5vcm1hbGl6ZWQpIHtcclxuICAgICAgICByZXR1cm4gbm9ybWFsaXplZDtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBcIlwiO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGFjdGl2aXR5UmVjSWQgPSByZXNvbHZlQWN0aXZpdHlSZWNJZChkZXRhaWwpO1xyXG5cclxuICBjb25zdCB0ZXh0RWRpdG9yQmFzZUlkID0gYWN0aXZpdHlSZWNJZCA/IGBWaXNpdGEuJHthY3Rpdml0eVJlY0lkfWAgOiBcIlZpc2l0YVwiO1xyXG4gIGNvbnN0IGZpZWxkSWRDb21lbnRhcmlvcyA9IGAke3RleHRFZGl0b3JCYXNlSWR9LkNvbWVudGFyaW9zYDtcclxuICBjb25zdCBmaWVsZElkQW50ZWNlZGVudGVzID0gYCR7dGV4dEVkaXRvckJhc2VJZH0uQW50ZWNlZGVudGVzYDtcclxuICBjb25zdCBmaWVsZElkQ29uY2x1c2lvbmVzID0gYCR7dGV4dEVkaXRvckJhc2VJZH0uQ29uY2x1c2lvbmVzYDtcclxuXHJcbiAgY29uc3Qgbm9ybWFsaXplRGF0ZVRvSW5wdXQgPSB1c2VDYWxsYmFjaygodmFsdWUpID0+IHtcclxuICAgIGlmICghdmFsdWUpIHJldHVybiBcIlwiO1xyXG4gICAgY29uc3QgcmF3ID0gU3RyaW5nKHZhbHVlKS50cmltKCk7XHJcbiAgICBpZiAoIXJhdykgcmV0dXJuIFwiXCI7XHJcbiAgICAvLyBBbHJlYWR5IHl5eXktTU0tZGRcclxuICAgIGlmICgvXlxcZHs0fS1cXGR7Mn0tXFxkezJ9JC8udGVzdChyYXcpKSByZXR1cm4gcmF3O1xyXG4gICAgLy8gZGQuTU0ueXl5eSBvciBkZC9NTS95eXl5XHJcbiAgICBpZiAoL15cXGR7Mn1bLi8tXVxcZHsyfVsuLy1dXFxkezR9JC8udGVzdChyYXcpKSB7XHJcbiAgICAgIGNvbnN0IHBhcnRzID0gcmF3LnNwbGl0KC9bLi8tXS8pLm1hcCgocCkgPT4gcGFyc2VJbnQocCwgMTApKTtcclxuICAgICAgaWYgKHBhcnRzLmxlbmd0aCA9PT0gMyAmJiAhTnVtYmVyLmlzTmFOKHBhcnRzWzBdKSAmJiAhTnVtYmVyLmlzTmFOKHBhcnRzWzFdKSAmJiAhTnVtYmVyLmlzTmFOKHBhcnRzWzJdKSkge1xyXG4gICAgICAgIGNvbnN0IFtkLCBtLCB5XSA9IHBhcnRzO1xyXG4gICAgICAgIGNvbnN0IG1tID0gU3RyaW5nKG0pLnBhZFN0YXJ0KDIsIFwiMFwiKTtcclxuICAgICAgICBjb25zdCBkZCA9IFN0cmluZyhkKS5wYWRTdGFydCgyLCBcIjBcIik7XHJcbiAgICAgICAgcmV0dXJuIGAke3l9LSR7bW19LSR7ZGR9YDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgY29uc3QgZHQgPSBuZXcgRGF0ZShyYXcpO1xyXG4gICAgaWYgKCFOdW1iZXIuaXNOYU4oZHQuZ2V0VGltZSgpKSkge1xyXG4gICAgICBjb25zdCB5eXl5ID0gZHQuZ2V0RnVsbFllYXIoKTtcclxuICAgICAgY29uc3QgbW0gPSBTdHJpbmcoZHQuZ2V0TW9udGgoKSArIDEpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcclxuICAgICAgY29uc3QgZGQgPSBTdHJpbmcoZHQuZ2V0RGF0ZSgpKS5wYWRTdGFydCgyLCBcIjBcIik7XHJcbiAgICAgIHJldHVybiBgJHt5eXl5fS0ke21tfS0ke2RkfWA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gXCJcIjtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IG1hdGNoT3B0aW9uVmFsdWUgPSB1c2VDYWxsYmFjaygob3B0aW9ucywgcmF3KSA9PiB7XHJcbiAgICBpZiAocmF3ID09IG51bGwpIHJldHVybiBcIlwiO1xyXG4gICAgY29uc3QgcmF3U3RyID0gU3RyaW5nKHJhdykudHJpbSgpO1xyXG4gICAgaWYgKCFyYXdTdHIpIHJldHVybiBcIlwiO1xyXG5cclxuICAgIGNvbnN0IG5vcm1hbGl6ZVRleHQgPSAocykgPT5cclxuICAgICAgU3RyaW5nKHMgfHwgXCJcIilcclxuICAgICAgICAudG9Mb3dlckNhc2UoKVxyXG4gICAgICAgIC5ub3JtYWxpemUoXCJORkRcIilcclxuICAgICAgICAucmVwbGFjZSgvW1xcdTAzMDAtXFx1MDM2Zl0vZywgXCJcIilcclxuICAgICAgICAudHJpbSgpO1xyXG5cclxuICAgIGNvbnN0IHJhd05vcm0gPSBub3JtYWxpemVUZXh0KHJhd1N0cik7XHJcbiAgICBjb25zdCBhbHROb3JtID0gcmF3Tm9ybS5lbmRzV2l0aChcIm9cIikgPyBgJHtyYXdOb3JtLnNsaWNlKDAsIC0xKX1hYCA6IHJhd05vcm07XHJcblxyXG4gICAgY29uc3QgbWF0Y2ggPSAob3B0aW9ucyB8fCBbXSkuZmluZCgobykgPT4ge1xyXG4gICAgICBjb25zdCB2YWwgPSBTdHJpbmcobz8udmFsdWUgPz8gbz8uVmFsdWUgPz8gXCJcIikudHJpbSgpO1xyXG4gICAgICBjb25zdCB0ZXh0ID0gU3RyaW5nKG8/LnRleHQgPz8gbz8uVGV4dCA/PyBcIlwiKS50cmltKCk7XHJcbiAgICAgIGNvbnN0IHRleHROb3JtID0gbm9ybWFsaXplVGV4dCh0ZXh0KTtcclxuICAgICAgcmV0dXJuIHZhbCA9PT0gcmF3U3RyIHx8IHZhbCA9PT0gcmF3Tm9ybSB8fCB0ZXh0Tm9ybSA9PT0gcmF3Tm9ybSB8fCB0ZXh0Tm9ybSA9PT0gYWx0Tm9ybTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIG1hdGNoID8gU3RyaW5nKG1hdGNoLnZhbHVlID8/IG1hdGNoLlZhbHVlID8/IHJhd1N0cikgOiByYXdTdHI7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBpbml0aWFsVHJhbnNEYXRlID0gbm9ybWFsaXplRGF0ZVRvSW5wdXQoU3RyaW5nKGRldGFpbC50cmFuc0RhdGUgPz8gZGV0YWlsLlRyYW5zRGF0ZSA/PyBcIlwiKSk7XHJcbiAgY29uc3QgZGVmYXVsdFZpc2l0VHlwZSA9IFN0cmluZyh2aXNpdFR5cGVzWzBdPy52YWx1ZSA/PyB2aXNpdFR5cGVzWzBdPy5WYWx1ZSA/PyBcIlwiKTtcclxuICBjb25zdCByYXdJbml0aWFsVmlzaXRUeXBlID0gU3RyaW5nKFxyXG4gICAgZGV0YWlsLnRpcG9WaXNpdGEgPz8gZGV0YWlsLlRpcG9WaXNpdGEgPz8gZGV0YWlsLnZpc2l0VHlwZSA/PyBkZXRhaWwuVmlzaXRUeXBlID8/IFwiXCJcclxuICApO1xyXG4gIGNvbnN0IGluaXRpYWxWaXNpdFR5cGUgPSBtYXRjaE9wdGlvblZhbHVlKHZpc2l0VHlwZXMsIHJhd0luaXRpYWxWaXNpdFR5cGUpIHx8IGRlZmF1bHRWaXNpdFR5cGU7XHJcbiAgY29uc3QgcmF3SW5pdGlhbENvbnRhY3RNZXRob2QgPSBTdHJpbmcoXHJcbiAgICBkZXRhaWwuY29udGFjdE1ldGhvZCA/PyBkZXRhaWwuQ29udGFjdE1ldGhvZCA/PyBcIlwiXHJcbiAgKTtcclxuICBjb25zdCBpbml0aWFsQ29udGFjdE1ldGhvZCA9IG1hdGNoT3B0aW9uVmFsdWUoY29udGFjdE1ldGhvZHMsIHJhd0luaXRpYWxDb250YWN0TWV0aG9kKTtcclxuICBjb25zdCByYXdJbml0aWFsQXNpc3RlbnRlID0gU3RyaW5nKFxyXG4gICAgZGV0YWlsLmFzaXN0ZW50ZVRpcG8gPz8gZGV0YWlsLkFzaXN0ZW50ZVRpcG8gPz8gKGFzaXN0ZW50ZVRpcG9zWzBdPy52YWx1ZSA/PyBhc2lzdGVudGVUaXBvc1swXT8uVmFsdWUgPz8gXCJcIilcclxuICApO1xyXG4gIGNvbnN0IGluaXRpYWxBc2lzdGVudGUgPSBtYXRjaE9wdGlvblZhbHVlKGFzaXN0ZW50ZVRpcG9zLCByYXdJbml0aWFsQXNpc3RlbnRlKSB8fCByYXdJbml0aWFsQXNpc3RlbnRlO1xyXG5cclxuICBjb25zdCBbdHJhbnNEYXRlLCBzZXRUcmFuc0RhdGVdID0gdXNlU3RhdGUoaW5pdGlhbFRyYW5zRGF0ZSk7XHJcbiAgY29uc3QgW3Zpc2l0VHlwZSwgc2V0VmlzaXRUeXBlXSA9IHVzZVN0YXRlKGluaXRpYWxWaXNpdFR5cGUpO1xyXG4gIGNvbnN0IFtjb250YWN0TWV0aG9kLCBzZXRDb250YWN0TWV0aG9kXSA9IHVzZVN0YXRlKGluaXRpYWxDb250YWN0TWV0aG9kKTtcclxuICBjb25zdCBbYXNpc3RlbnRlVGlwbywgc2V0QXNpc3RlbnRlVGlwb10gPSB1c2VTdGF0ZShpbml0aWFsQXNpc3RlbnRlKTtcclxuICBjb25zdCBbZGVzY3JpcHRpb24sIHNldERlc2NyaXB0aW9uXSA9IHVzZVN0YXRlKFN0cmluZyhkZXRhaWwuZGVzY3JpcHRpb24gPz8gZGV0YWlsLkRlc2NyaXB0aW9uID8/IFwiXCIpKTtcclxuICBjb25zdCBbY29tZW50YXJpb3MsIHNldENvbWVudGFyaW9zXSA9IHVzZVN0YXRlKFN0cmluZyhkZXRhaWwuY29tZW50YXJpb3MgPz8gZGV0YWlsLkNvbWVudGFyaW9zID8/IFwiXCIpKTtcclxuICBjb25zdCBbYW50ZWNlZGVudGVzLCBzZXRBbnRlY2VkZW50ZXNdID0gdXNlU3RhdGUoU3RyaW5nKGRldGFpbC5hbnRlY2VkZW50ZXMgPz8gZGV0YWlsLkFudGVjZWRlbnRlcyA/PyBcIlwiKSk7XHJcbiAgY29uc3QgW2NvbmNsdXNpb25lcywgc2V0Q29uY2x1c2lvbmVzXSA9IHVzZVN0YXRlKFN0cmluZyhkZXRhaWwuY29uY2x1c2lvbmVzID8/IGRldGFpbC5Db25jbHVzaW9uZXMgPz8gXCJcIikpO1xyXG4gIGNvbnN0IFtzdGF0dXMsIHNldFN0YXR1c10gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbYnVzeSwgc2V0QnVzeV0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW2lzRWRpdGluZywgc2V0SXNFZGl0aW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbaXNIeWRyYXRpbmcsIHNldElzSHlkcmF0aW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbbW9kYWxFcnJvciwgc2V0TW9kYWxFcnJvcl0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCByZWFkT25seVN1cmZhY2VSZWYgPSB1c2VSZWYobnVsbCk7XHJcbiAgY29uc3QgZWRpdFNuYXBzaG90UmVmID0gdXNlUmVmKG51bGwpO1xyXG5cclxuICBjb25zdCByZWNJZCA9IGFjdGl2aXR5UmVjSWQ7XG4gIGNvbnN0IGFjY291bnROdW0gPSBTdHJpbmcoZGV0YWlsLmFjY291bnROdW0gPz8gZGV0YWlsLkFjY291bnROdW0gPz8gXCJcIik7XG4gIGNvbnN0IGFjdGl2aWRhZElkID0gU3RyaW5nKGRldGFpbC5hY3RpdmlkYWRJZCA/PyBkZXRhaWwuQWN0aXZpZGFkSWQgPz8gXCJcIik7XG4gIGNvbnN0IGRldGFpbE93bmVyQXhVc2VySWQgPSBmaXJzdERldGFpbFRleHQoXG4gICAgZGV0YWlsLm93bmVyQXhVc2VySWQsXG4gICAgZGV0YWlsLk93bmVyQXhVc2VySWQsXG4gICAgZGV0YWlsLmluZENyZWF0ZWRCeVVzZXJJZCxcbiAgICBkZXRhaWwuSU5EQ3JlYXRlZEJ5VXNlcklkLFxuICAgIGRldGFpbC5jcmVhdGVkQnlVc2VySWQsXG4gICAgZGV0YWlsLkNyZWF0ZWRCeVVzZXJJZCxcbiAgICBkZXRhaWwudXNlcklkLFxuICAgIGRldGFpbC5Vc2VySWRcbiAgKTtcbiAgY29uc3QgZGV0YWlsT3duZXJSYXdUZXh0ID0gZmlyc3REZXRhaWxUZXh0KGRldGFpbC5vd25lck5hbWUsIGRldGFpbC5Pd25lck5hbWUsIGRldGFpbC5vd25lckFsaWFzLCBkZXRhaWwuT3duZXJBbGlhcyk7XG4gIGNvbnN0IHZpc2libGVPd25lciA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIHJldHVybiBnZXRWaXNpYmxlVXNlckZvck93bmVyKHZpc2libGVVc2VyQnlPd25lckF4VXNlcklkLCBkZXRhaWxPd25lckF4VXNlcklkKTtcbiAgfSwgW2RldGFpbE93bmVyQXhVc2VySWQsIHZpc2libGVVc2VyQnlPd25lckF4VXNlcklkXSk7XG4gIGNvbnN0IGRldGFpbE93bmVyVGV4dCA9IHZpc2libGVPd25lciA/IGZvcm1hdE1vZHVsZVZpc2libGVVc2VyTGFiZWwodmlzaWJsZU93bmVyKSA6IGRldGFpbE93bmVyUmF3VGV4dCB8fCBkZXRhaWxPd25lckF4VXNlcklkO1xuICBjb25zdCBpc0N1cnJlbnRPd25lciA9XG4gICAgISFkZXRhaWxPd25lckF4VXNlcklkICYmIG5vcm1hbGl6ZU93bmVyQXhVc2VySWQoZGV0YWlsT3duZXJBeFVzZXJJZCkgPT09IG5vcm1hbGl6ZU93bmVyQXhVc2VySWQoYXhVc2VySWQpO1xuICBjb25zdCBzaG93T3duZXJGaWVsZCA9IHZpc2libGVVc2Vyc1JlYWR5ICYmICEhdmlzaWJsZU93bmVyICYmICFpc0N1cnJlbnRPd25lcjtcbiAgLy8gT25seSBoaWRlIGFjdGlvbnMgd2hlbiB0aGUgZW5kcG9pbnQgcmV0dXJuZWQgYSByZXNvbHZlZCBtdXRhdGlvbiBwb2xpY3kgZm9yIHRoZSBvd25lci5cbiAgY29uc3Qgb3duZXJDYW5NdXRhdGUgPSAhdmlzaWJsZVVzZXJzUmVhZHkgfHwgIWhhc011dGF0aW9uUG9saWN5KHZpc2libGVPd25lcilcbiAgICA/IHRydWVcbiAgICA6IGNhbk11dGF0ZU93bmVyKHZpc2libGVVc2VyQnlPd25lckF4VXNlcklkLCBkZXRhaWxPd25lckF4VXNlcklkKTtcbiAgY29uc3QgY2FuRWRpdFZpc2l0ID0gY2FuRWRpdEhpc3RvcnkgJiYgb3duZXJDYW5NdXRhdGU7XG4gIGNvbnN0IGNhbkRlbGV0ZVZpc2l0ID0gY2FuRGVsZXRlSGlzdG9yeSAmJiBvd25lckNhbk11dGF0ZTtcblxuICBjb25zdCB7IGVkaXRNb2RlS2V5UmVmLCBzeW5jRWRpdE1vZGVGbGFnLCBjbGVhckRyYWZ0LCBhcHBseURyYWZ0VmFsdWVzIH0gPSB1c2VEZXRhaWxFZGl0U2Vzc2lvbih7XG4gICAgYWN0aXZpZGFkSWQsXG4gICAgcmVjSWQsXG4gICAgY2FuRWRpdEhpc3Rvcnk6IGNhbkVkaXRWaXNpdCxcbiAgICBpc0VkaXRpbmcsXHJcbiAgICBzZXRJc0VkaXRpbmcsXHJcbiAgICB0cmFuc0RhdGUsXHJcbiAgICB2aXNpdFR5cGUsXHJcbiAgICBjb250YWN0TWV0aG9kLFxyXG4gICAgYXNpc3RlbnRlVGlwbyxcclxuICAgIGRlc2NyaXB0aW9uLFxyXG4gICAgY29tZW50YXJpb3MsXHJcbiAgICBhbnRlY2VkZW50ZXMsXHJcbiAgICBjb25jbHVzaW9uZXMsXHJcbiAgICBzZXRUcmFuc0RhdGUsXHJcbiAgICBzZXRWaXNpdFR5cGUsXHJcbiAgICBzZXRDb250YWN0TWV0aG9kLFxyXG4gICAgc2V0QXNpc3RlbnRlVGlwbyxcclxuICAgIHNldERlc2NyaXB0aW9uLFxyXG4gICAgc2V0Q29tZW50YXJpb3MsXHJcbiAgICBzZXRBbnRlY2VkZW50ZXMsXHJcbiAgICBzZXRDb25jbHVzaW9uZXMsXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IGhhc1NlcnZlckRldGFpbCA9XHJcbiAgICBoYXNWYWx1ZShyZWNJZCkgJiZcclxuICAgIGhhc1ZhbHVlKGFjY291bnROdW0pICYmXHJcbiAgICBoYXNWYWx1ZShkZXRhaWwudHJhbnNEYXRlIHx8IGRldGFpbC5UcmFuc0RhdGUgfHwgXCJcIik7XHJcblxyXG4gIGNvbnN0IHNob3VsZEh5ZHJhdGUgPSAhIWFjdGl2aWRhZElkICYmICFoYXNTZXJ2ZXJEZXRhaWw7XHJcblxyXG4gIGNvbnN0IG9wZW5UZXh0RWRpdG9yID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoXHJcbiAgICAgIGZpZWxkSWQ6IHN0cmluZyxcclxuICAgICAgZmllbGRMYWJlbDogc3RyaW5nLFxyXG4gICAgICBmaWVsZFZhbHVlOiBzdHJpbmcsXHJcbiAgICAgIG9wdGlvbnM6IHsgYWxsb3dFZGl0PzogYm9vbGVhbjsgcmVhZE9ubHk/OiBib29sZWFuOyBlZGl0TW9kZUtleT86IHN0cmluZyB9ID0ge31cclxuICAgICkgPT4ge1xyXG4gICAgICBuYXZpZ2F0ZVRvVGV4dEVkaXRvckZpZWxkKHtcclxuICAgICAgICBmaWVsZElkLFxyXG4gICAgICAgIGZpZWxkTGFiZWwsXHJcbiAgICAgICAgZmllbGRWYWx1ZSxcclxuICAgICAgICByZWFkT25seTogb3B0aW9ucz8ucmVhZE9ubHkgPT09IHRydWUsXHJcbiAgICAgICAgYWxsb3dFZGl0OiBvcHRpb25zPy5hbGxvd0VkaXQgIT09IGZhbHNlLFxyXG4gICAgICAgIGVkaXRNb2RlS2V5OiBvcHRpb25zPy5lZGl0TW9kZUtleSxcclxuICAgICAgICBlZGl0TW9kZVJldHVyblR0bE1zOiBFRElUT1JfUkVUVVJOX0ZMQUdfVFRMX01TLFxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBbXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUNvbWVudGFyaW9zVGFwID0gdXNlQ2FsbGJhY2soKGV2ZW50KSA9PiB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgb3BlblRleHRFZGl0b3IoZmllbGRJZENvbWVudGFyaW9zLCBpbmRUKFwiVmlzaXRzX0ZpZWxkX0NvbW1lbnRzXCIsIFwiQ29tbWVudHNcIiksIGNvbWVudGFyaW9zLCB7XG4gICAgICByZWFkT25seTogIWlzRWRpdGluZyxcbiAgICAgIGFsbG93RWRpdDogY2FuRWRpdFZpc2l0LFxuICAgICAgZWRpdE1vZGVLZXk6IGVkaXRNb2RlS2V5UmVmLmN1cnJlbnRcbiAgICB9KTtcbiAgfSwgW2NvbWVudGFyaW9zLCBlZGl0TW9kZUtleVJlZiwgZmllbGRJZENvbWVudGFyaW9zLCBpc0VkaXRpbmcsIGNhbkVkaXRWaXNpdCwgb3BlblRleHRFZGl0b3JdKTtcblxyXG4gIGNvbnN0IGhhbmRsZUNvbWVudGFyaW9zSG9sZCA9IHVzZUNhbGxiYWNrKCh0YXJnZXQsIGNsaWVudFkpID0+IHtcclxuICAgIGlmICghdGFyZ2V0IHx8ICFpc092ZXJmbG93aW5nKHRhcmdldCkpIHJldHVybiBmYWxzZTtcclxuICAgIHNldFByZXZpZXdBbmNob3IodGFyZ2V0KTtcclxuICAgIHJldHVybiBzaG93UHJldmlld1Rvb2x0aXAoU3RyaW5nKGNvbWVudGFyaW9zIHx8IFwiXCIpLCBjbGllbnRZKTtcclxuICB9LCBbY29tZW50YXJpb3NdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQW50ZWNlZGVudGVzVGFwID0gdXNlQ2FsbGJhY2soKGV2ZW50KSA9PiB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgb3BlblRleHRFZGl0b3IoZmllbGRJZEFudGVjZWRlbnRlcywgaW5kVChcIlZpc2l0c19GaWVsZF9CYWNrZ3JvdW5kXCIsIFwiQmFja2dyb3VuZFwiKSwgYW50ZWNlZGVudGVzLCB7XG4gICAgICByZWFkT25seTogIWlzRWRpdGluZyxcbiAgICAgIGFsbG93RWRpdDogY2FuRWRpdFZpc2l0LFxuICAgICAgZWRpdE1vZGVLZXk6IGVkaXRNb2RlS2V5UmVmLmN1cnJlbnRcbiAgICB9KTtcbiAgfSwgW2FudGVjZWRlbnRlcywgZWRpdE1vZGVLZXlSZWYsIGZpZWxkSWRBbnRlY2VkZW50ZXMsIGlzRWRpdGluZywgY2FuRWRpdFZpc2l0LCBvcGVuVGV4dEVkaXRvcl0pO1xuXHJcbiAgY29uc3QgaGFuZGxlQW50ZWNlZGVudGVzSG9sZCA9IHVzZUNhbGxiYWNrKCh0YXJnZXQsIGNsaWVudFkpID0+IHtcclxuICAgIGlmICghdGFyZ2V0IHx8ICFpc092ZXJmbG93aW5nKHRhcmdldCkpIHJldHVybiBmYWxzZTtcclxuICAgIHNldFByZXZpZXdBbmNob3IodGFyZ2V0KTtcclxuICAgIHJldHVybiBzaG93UHJldmlld1Rvb2x0aXAoU3RyaW5nKGFudGVjZWRlbnRlcyB8fCBcIlwiKSwgY2xpZW50WSk7XHJcbiAgfSwgW2FudGVjZWRlbnRlc10pO1xyXG5cclxuICBjb25zdCBoYW5kbGVDb25jbHVzaW9uZXNUYXAgPSB1c2VDYWxsYmFjaygoZXZlbnQpID0+IHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBvcGVuVGV4dEVkaXRvcihmaWVsZElkQ29uY2x1c2lvbmVzLCBpbmRUKFwiVmlzaXRzX0ZpZWxkX0NvbmNsdXNpb25zXCIsIFwiQ29uY2x1c2lvbnNcIiksIGNvbmNsdXNpb25lcywge1xuICAgICAgcmVhZE9ubHk6ICFpc0VkaXRpbmcsXG4gICAgICBhbGxvd0VkaXQ6IGNhbkVkaXRWaXNpdCxcbiAgICAgIGVkaXRNb2RlS2V5OiBlZGl0TW9kZUtleVJlZi5jdXJyZW50XG4gICAgfSk7XG4gIH0sIFtjb25jbHVzaW9uZXMsIGVkaXRNb2RlS2V5UmVmLCBmaWVsZElkQ29uY2x1c2lvbmVzLCBpc0VkaXRpbmcsIGNhbkVkaXRWaXNpdCwgb3BlblRleHRFZGl0b3JdKTtcblxyXG4gIGNvbnN0IGhhbmRsZUNvbmNsdXNpb25lc0hvbGQgPSB1c2VDYWxsYmFjaygodGFyZ2V0LCBjbGllbnRZKSA9PiB7XHJcbiAgICBpZiAoIXRhcmdldCB8fCAhaXNPdmVyZmxvd2luZyh0YXJnZXQpKSByZXR1cm4gZmFsc2U7XHJcbiAgICBzZXRQcmV2aWV3QW5jaG9yKHRhcmdldCk7XHJcbiAgICByZXR1cm4gc2hvd1ByZXZpZXdUb29sdGlwKFN0cmluZyhjb25jbHVzaW9uZXMgfHwgXCJcIiksIGNsaWVudFkpO1xyXG4gIH0sIFtjb25jbHVzaW9uZXNdKTtcclxuXHJcbiAgY29uc3QgY29tZW50YXJpb3NUYXAgPSB1c2VUYXBHdWFyZChoYW5kbGVDb21lbnRhcmlvc1RhcCwgaGFuZGxlQ29tZW50YXJpb3NIb2xkKTtcclxuICBjb25zdCBhbnRlY2VkZW50ZXNUYXAgPSB1c2VUYXBHdWFyZChoYW5kbGVBbnRlY2VkZW50ZXNUYXAsIGhhbmRsZUFudGVjZWRlbnRlc0hvbGQpO1xyXG4gIGNvbnN0IGNvbmNsdXNpb25lc1RhcCA9IHVzZVRhcEd1YXJkKGhhbmRsZUNvbmNsdXNpb25lc1RhcCwgaGFuZGxlQ29uY2x1c2lvbmVzSG9sZCk7XHJcblxyXG4gIGNvbnN0IHRleHRFZGl0b3JCaW5kaW5ncyA9IHVzZU1lbW8oXHJcbiAgICAoKSA9PiBbXHJcbiAgICAgIHsgZmllbGRJZDogZmllbGRJZENvbWVudGFyaW9zLCBhcHBseVZhbHVlOiBzZXRDb21lbnRhcmlvcyB9LFxyXG4gICAgICB7IGZpZWxkSWQ6IGZpZWxkSWRBbnRlY2VkZW50ZXMsIGFwcGx5VmFsdWU6IHNldEFudGVjZWRlbnRlcyB9LFxyXG4gICAgICB7IGZpZWxkSWQ6IGZpZWxkSWRDb25jbHVzaW9uZXMsIGFwcGx5VmFsdWU6IHNldENvbmNsdXNpb25lcyB9LFxyXG4gICAgXSxcclxuICAgIFtmaWVsZElkQW50ZWNlZGVudGVzLCBmaWVsZElkQ29tZW50YXJpb3MsIGZpZWxkSWRDb25jbHVzaW9uZXNdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgeyBhcHBseVZhbHVlczogYXBwbHlUZXh0RWRpdG9yVmFsdWVzIH0gPSB1c2VUZXh0RWRpdG9yRmllbGRzKHRleHRFZGl0b3JCaW5kaW5ncywge1xyXG4gICAgYXBwbHlPbk1vdW50OiAhYWN0aXZpZGFkSWQsXHJcbiAgICBsaXN0ZW5QYWdlU2hvdzogdHJ1ZSxcclxuICB9KTtcclxuXHJcbiAgY29uc3QgeyBtb2RhbCwgb3BlbkNvbmZpcm0sIGNsb3NlQ29uZmlybSwgaGFuZGxlQ29uZmlybSB9ID0gdXNlQ29uZmlybURpYWxvZyh7XHJcbiAgICBkZWZhdWx0Q29uZmlybVRleHQ6IGluZFQoXCJDb25maXJtX1llc1wiLCBcIkNvbmZpcm1fWWVzXCIpLFxyXG4gICAgZGVmYXVsdENhbmNlbFRleHQ6IGluZFQoXCJDb25maXJtX05vXCIsIFwiQ29uZmlybV9Ob1wiKVxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVNb2RhbENvbmZpcm0gPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XHJcbiAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xyXG4gICAgYXdhaXQgaGFuZGxlQ29uZmlybSh7XHJcbiAgICAgIGJ1c3ksXHJcbiAgICAgIG9uRXJyb3I6IChtc2cpID0+IHtcclxuICAgICAgICBzZXRNb2RhbEVycm9yKG1zZyk7XHJcbiAgICAgICAgc2V0U3RhdHVzKG1zZyk7XHJcbiAgICAgICAgZmxhc2hBY3Rpb25NYXJrKFwiZXJyb3JQcm9jZXNzXCIsIDE1MDApO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9LCBbYnVzeSwgaGFuZGxlQ29uZmlybV0pO1xyXG5cclxuICBjb25zdCBtb2RhbExvYWRpbmdUZXh0ID0gaW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiQ29tbW9uX0xvYWRpbmdcIik7XHJcbiAgY29uc3QgbW9kYWxDYW5jZWxUZXh0ID0gbW9kYWwuY2FuY2VsVGV4dCB8fCBpbmRUKFwiQ29uZmlybV9Ob1wiLCBcIkNvbmZpcm1fTm9cIik7XHJcbiAgY29uc3QgbW9kYWxDb25maXJtVGV4dCA9IGJ1c3lcclxuICAgID8gbW9kYWxMb2FkaW5nVGV4dFxyXG4gICAgOiAoIWJ1c3kgJiYgbW9kYWxFcnJvciA/IGluZFQoXCJDb21tb25fT0tcIiwgXCJDb21tb25fT0tcIikgOiAobW9kYWwuY29uZmlybVRleHQgfHwgaW5kVChcIkNvbmZpcm1fWWVzXCIsIFwiQ29uZmlybV9ZZXNcIikpKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlTW9kYWxCdXR0b25Db25maXJtID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKCFidXN5ICYmIG1vZGFsRXJyb3IpIHtcclxuICAgICAgY2xvc2VDb25maXJtKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGhhbmRsZU1vZGFsQ29uZmlybSgpO1xyXG4gIH0sIFtidXN5LCBtb2RhbEVycm9yLCBjbG9zZUNvbmZpcm0sIGhhbmRsZU1vZGFsQ29uZmlybV0pO1xyXG5cclxuICBjb25zdCBoYXNBY3RpdmVQcm9jZXNzID0gdXNlTWVtbygoKSA9PiBidXN5IHx8IGlzRWRpdGluZywgW2J1c3ksIGlzRWRpdGluZ10pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgd2luZG93Ll9faW5kU2V0TmF2aWdhdGlvbkd1YXJkPy4oaGFzQWN0aXZlUHJvY2Vzcyk7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICB3aW5kb3cuX19pbmRDbGVhck5hdmlnYXRpb25HdWFyZD8uKCk7XHJcbiAgICB9O1xyXG4gIH0sIFtoYXNBY3RpdmVQcm9jZXNzXSk7XHJcblxyXG4gIHVzZURldGFpbEh5ZHJhdGlvbih7XHJcbiAgICBhY3RpdmlkYWRJZCxcclxuICAgIHNob3VsZEh5ZHJhdGUsXHJcbiAgICB2aXNpdFR5cGVzLFxyXG4gICAgY29udGFjdE1ldGhvZHMsXHJcbiAgICBhc2lzdGVudGVUaXBvcyxcclxuICAgIGRlZmF1bHRWaXNpdFR5cGUsXHJcbiAgICBpbml0aWFsQXNpc3RlbnRlLFxyXG4gICAgbm9ybWFsaXplRGF0ZVRvSW5wdXQsXHJcbiAgICBtYXRjaE9wdGlvblZhbHVlLFxyXG4gICAgYXBwbHlEcmFmdFZhbHVlcyxcclxuICAgIGFwcGx5VGV4dEVkaXRvclZhbHVlcyxcclxuICAgIHNldFN0YXR1cyxcclxuICAgIHNldElzSHlkcmF0aW5nLFxyXG4gICAgc2V0VHJhbnNEYXRlLFxyXG4gICAgc2V0VmlzaXRUeXBlLFxyXG4gICAgc2V0Q29udGFjdE1ldGhvZCxcclxuICAgIHNldEFzaXN0ZW50ZVRpcG8sXHJcbiAgICBzZXREZXNjcmlwdGlvbixcclxuICAgIHNldENvbWVudGFyaW9zLFxyXG4gICAgc2V0QW50ZWNlZGVudGVzLFxyXG4gICAgc2V0Q29uY2x1c2lvbmVzLFxyXG4gIH0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3QgZWwgPSByZWFkT25seVN1cmZhY2VSZWYuY3VycmVudDtcclxuICAgIGlmICghZWwpIHJldHVybjtcclxuICAgIGlmICghaXNFZGl0aW5nKSB7XHJcbiAgICAgIGVsLmNsYXNzTGlzdC5hZGQoXCJpbmQtcmVhZG9ubHktc3VyZmFjZVwiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoXCJpbmQtcmVhZG9ubHktc3VyZmFjZVwiKTtcclxuICAgIH1cclxuICB9LCBbaXNFZGl0aW5nXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoaXNFZGl0aW5nKSB7XHJcbiAgICAgIGlmICghZWRpdFNuYXBzaG90UmVmLmN1cnJlbnQpIHtcclxuICAgICAgICBlZGl0U25hcHNob3RSZWYuY3VycmVudCA9IHtcclxuICAgICAgICAgIHRyYW5zRGF0ZSxcclxuICAgICAgICAgIHZpc2l0VHlwZSxcclxuICAgICAgICAgIGNvbnRhY3RNZXRob2QsXHJcbiAgICAgICAgICBhc2lzdGVudGVUaXBvLFxyXG4gICAgICAgICAgZGVzY3JpcHRpb24sXHJcbiAgICAgICAgICBjb21lbnRhcmlvcyxcclxuICAgICAgICAgIGFudGVjZWRlbnRlcyxcclxuICAgICAgICAgIGNvbmNsdXNpb25lc1xyXG4gICAgICAgIH07XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgZWRpdFNuYXBzaG90UmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gIH0sIFtpc0VkaXRpbmcsIHRyYW5zRGF0ZSwgdmlzaXRUeXBlLCBjb250YWN0TWV0aG9kLCBhc2lzdGVudGVUaXBvLCBkZXNjcmlwdGlvbiwgY29tZW50YXJpb3MsIGFudGVjZWRlbnRlcywgY29uY2x1c2lvbmVzXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoaXNFZGl0aW5nKSByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgcmV0dXJuIGJpbmRSZWFkT25seUd1YXJkKHJlYWRPbmx5U3VyZmFjZVJlZi5jdXJyZW50KTtcclxuICB9LCBbaXNFZGl0aW5nXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUVuYWJsZUVkaXQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKCFjYW5FZGl0VmlzaXQpIHtcbiAgICAgIHNob3dQZXJtaXNzaW9uTW9kYWwoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgc2V0SXNFZGl0aW5nKHRydWUpO1xuICAgIHN5bmNFZGl0TW9kZUZsYWcodHJ1ZSk7XG4gICAgc2V0U3RhdHVzKGluZFQoXCJWaXNpdHNfRGV0YWlsX0VkaXRpbmdFbmFibGVkXCIsIFwiRWRpdGluZyBlbmFibGVkXCIpKTtcbiAgfSwgW2NhbkVkaXRWaXNpdCwgc3luY0VkaXRNb2RlRmxhZ10pO1xuXHJcbiAgY29uc3QgaGFuZGxlQ2FuY2VsRWRpdCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmICghaXNFZGl0aW5nKSByZXR1cm47XHJcbiAgICBzZXRJc0VkaXRpbmcoZmFsc2UpO1xyXG4gICAgc3luY0VkaXRNb2RlRmxhZyhmYWxzZSk7XHJcbiAgICBjbGVhckRyYWZ0KCk7XHJcbiAgICBzZXRTdGF0dXMoaW5kVChcIkNvbW1vbl9DYW5jZWxcIiwgXCJDYW5jZWxcIikpO1xyXG4gICAgd2luZG93Ll9faW5kQnlwYXNzTmF2aWdhdGlvbkd1YXJkT25jZT8uKCk7XHJcbiAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgfSwgW2lzRWRpdGluZywgc3luY0VkaXRNb2RlRmxhZywgY2xlYXJEcmFmdF0pO1xyXG5cclxuICBjb25zdCB7IGhhbmRsZVVwZGF0ZSwgaGFuZGxlRGVsZXRlIH0gPSB1c2VEZXRhaWxNdXRhdGlvbnMoe1xyXG4gICAgYnVzeSxcbiAgICBpc0VkaXRpbmcsXG4gICAgY2FuRWRpdEhpc3Rvcnk6IGNhbkVkaXRWaXNpdCxcbiAgICBjYW5EZWxldGVIaXN0b3J5OiBjYW5EZWxldGVWaXNpdCxcbiAgICByZWNJZCxcclxuICAgIGFjY291bnROdW0sXHJcbiAgICB0cmFuc0RhdGUsXHJcbiAgICB2aXNpdFR5cGUsXHJcbiAgICBjb250YWN0TWV0aG9kLFxyXG4gICAgYXNpc3RlbnRlVGlwbyxcclxuICAgIGRlc2NyaXB0aW9uLFxyXG4gICAgY29tZW50YXJpb3MsXHJcbiAgICBhbnRlY2VkZW50ZXMsXHJcbiAgICBjb25jbHVzaW9uZXMsXHJcbiAgICB2aXNpdFR5cGVzLFxyXG4gICAgY29udGFjdE1ldGhvZHMsXHJcbiAgICBhc2lzdGVudGVUaXBvcyxcclxuICAgIGRlZmF1bHRWaXNpdFR5cGUsXHJcbiAgICByYXdJbml0aWFsVmlzaXRUeXBlLFxyXG4gICAgcmF3SW5pdGlhbENvbnRhY3RNZXRob2QsXHJcbiAgICByYXdJbml0aWFsQXNpc3RlbnRlLFxyXG4gICAgbWF0Y2hPcHRpb25WYWx1ZSxcclxuICAgIGNsZWFyRHJhZnQsXHJcbiAgICBzeW5jRWRpdE1vZGVGbGFnLFxyXG4gICAgc2V0TW9kYWxFcnJvcixcclxuICAgIHNldEJ1c3ksXHJcbiAgICBzZXRTdGF0dXMsXHJcbiAgICBzZXRJc0VkaXRpbmcsXHJcbiAgfSk7XHJcblxyXG4gIHVzZURldGFpbFRvcGJhckFjdGlvbnMoe1xyXG4gICAgYnVzeSxcclxuICAgIG1vZGFsT3BlbjogbW9kYWwub3BlbixcbiAgICBpc0VkaXRpbmcsXG4gICAgY2FuRWRpdEhpc3Rvcnk6IGNhbkVkaXRWaXNpdCxcbiAgICBjYW5EZWxldGVIaXN0b3J5OiBjYW5EZWxldGVWaXNpdCxcbiAgICB0cmFuc0RhdGUsXG4gICAgc2V0TW9kYWxFcnJvcixcclxuICAgIGhhbmRsZUVuYWJsZUVkaXQsXHJcbiAgICBoYW5kbGVDYW5jZWxFZGl0LFxyXG4gICAgaGFuZGxlVXBkYXRlLFxyXG4gICAgaGFuZGxlRGVsZXRlLFxyXG4gICAgb3BlbkNvbmZpcm0sXG4gICAgY2xvc2VDb25maXJtLFxuICAgIHBlcm1pc3Npb25zUmVhZHk6IHZpc2libGVVc2Vyc1JlYWR5LFxuICB9KTtcblxyXG4gIGNvbnN0IGRlc2NyaXB0aW9uTGFiZWwgPSBpbmRUKFwiVmlzaXRzX0ZpZWxkX0Rlc2NyaXB0aW9uXCIsIFwiRGVzY3JpcHRpb25cIik7XHJcbiAgY29uc3QgY29tbWVudHNMYWJlbCA9IGluZFQoXCJWaXNpdHNfRmllbGRfQ29tbWVudHNcIiwgXCJDb21tZW50c1wiKTtcclxuICBjb25zdCBiYWNrZ3JvdW5kTGFiZWwgPSBpbmRUKFwiVmlzaXRzX0ZpZWxkX0JhY2tncm91bmRcIiwgXCJCYWNrZ3JvdW5kXCIpO1xyXG4gIGNvbnN0IGNvbmNsdXNpb25zTGFiZWwgPSBpbmRUKFwiVmlzaXRzX0ZpZWxkX0NvbmNsdXNpb25zXCIsIFwiQ29uY2x1c2lvbnNcIik7XHJcbiAgY29uc3QgZGV0YWlsRGVzY3JpcHRpb25DbGFzc05hbWUgPSBjbGFzc05hbWVzKFxyXG4gICAgXCJmb3JtLWNvbnRyb2xcIixcclxuICAgIGlzRWRpdGluZyA/IFwiYm9yZGVyLW5ldXRyYWwtMjAwIHRleHQtbmV1dHJhbC05MDBcIiA6IFwiYm9yZGVyLW5ldXRyYWwtMjAwIGluZC1yZWFkb25seS1maWVsZFwiXHJcbiAgKTtcclxuICBjb25zdCBkZXRhaWxSZWFkT25seUNsYXNzTmFtZSA9IGNsYXNzTmFtZXMoXCJmb3JtLWNvbnRyb2wgY3Vyc29yLXBvaW50ZXJcIiwgIWlzRWRpdGluZyA/IFwiaW5kLXJlYWRvbmx5LWZpZWxkXCIgOiBcIlwiKTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS00XCI+XHJcbiAgICAgIDxDb25maXJtTW9kYWxcclxuICAgICAgICBvcGVuPXttb2RhbC5vcGVufVxyXG4gICAgICAgIHRpdGxlPXttb2RhbC50aXRsZX1cclxuICAgICAgICBtZXNzYWdlPXttb2RhbC5tZXNzYWdlfVxyXG4gICAgICAgIGNvbmZpcm1UZXh0PXttb2RhbENvbmZpcm1UZXh0fVxyXG4gICAgICAgIGNhbmNlbFRleHQ9e21vZGFsQ2FuY2VsVGV4dH1cclxuICAgICAgICBsb2FkaW5nVGV4dD17bW9kYWxMb2FkaW5nVGV4dH1cclxuICAgICAgICBzaG93Q2FuY2VsPXttb2RhbC5zaG93Q2FuY2VsfVxyXG4gICAgICAgIHNob3dDb25maXJtPXttb2RhbC5zaG93Q29uZmlybX1cclxuICAgICAgICBidXN5PXtidXN5fVxyXG4gICAgICAgIGVycm9yPXttb2RhbEVycm9yfVxyXG4gICAgICAgIHN0YXR1cz17c3RhdHVzfVxyXG4gICAgICAgIG9uQ29uZmlybT17aGFuZGxlTW9kYWxCdXR0b25Db25maXJtfVxyXG4gICAgICAgIG9uQ2FuY2VsPXtjbG9zZUNvbmZpcm19XHJcbiAgICAgIC8+XHJcbiAgICAgIDxkaXZcclxuICAgICAgICByZWY9e3JlYWRPbmx5U3VyZmFjZVJlZn1cclxuICAgICAgICBjbGFzc05hbWU9XCJyZWxhdGl2ZSBzaGFkb3cteHMgZ2xhc3MtcGFuZWwgcC00IHNwYWNlLXktNCBib3JkZXIgYm9yZGVyLW5ldXRyYWwtMjAwIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldXCJcclxuICAgICAgPlxyXG4gICAgICAgIHtpc0h5ZHJhdGluZyAmJiAoXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgei0xMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBiZy13aGl0ZS83MCByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXVwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQtc20gdGV4dC1uZXV0cmFsLTYwMFwiPlxyXG4gICAgICAgICAgICAgIDxTcGlubmVyIHNpemU9XCJzaXplLTVcIiAvPlxyXG4gICAgICAgICAgICAgIDxzcGFuPntpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfTwvc3Bhbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApfVxyXG4gICAgICAgIHtzaG93T3duZXJGaWVsZCAmJiAoXG4gICAgICAgICAgPERldGFpbE93bmVyRmllbGQgbGFiZWw9e2luZFQoXCJWaXNpdHNfRGV0YWlsX093bmVyX0xhYmVsXCIsIFwiT3duZXJcIil9IHZhbHVlPXtkZXRhaWxPd25lclRleHR9IC8+XG4gICAgICAgICl9XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0zIGdhcC00IHB0LTFcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInZpc2l0YS1maWVsZC10ZXh0XCI+XHJcbiAgICAgICAgICAgIDxTaW5nbGVEYXRlUGlja2VyXHJcbiAgICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJWaXNpdHNfRGV0YWlsX0RhdGVfTGFiZWxcIiwgXCJEYXRlXCIpfVxyXG4gICAgICAgICAgICAgIHZhbHVlPXt0cmFuc0RhdGV9XHJcbiAgICAgICAgICAgICAgb25DaGFuZ2U9e3NldFRyYW5zRGF0ZX1cclxuICAgICAgICAgICAgICBkaXNhYmxlZD17IWlzRWRpdGluZ31cclxuICAgICAgICAgICAgICByZWFkT25seT17IWlzRWRpdGluZ31cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPFNlbGVjdENvbWJvYm94XHJcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiVmlzaXRzX0RldGFpbF9WaXNpdFR5cGVfTGFiZWxcIiwgXCJWaXNpdCB0eXBlXCIpfVxyXG4gICAgICAgICAgICBvcHRpb25zPXt2aXNpdFR5cGVzfVxyXG4gICAgICAgICAgICB2YWx1ZT17dmlzaXRUeXBlfVxyXG4gICAgICAgICAgICBvbkNoYW5nZT17c2V0VmlzaXRUeXBlfVxyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIlZpc2l0c19EZXRhaWxfVmlzaXRUeXBlX1BsYWNlaG9sZGVyXCIsIFwiU2VsZWN0IHR5cGVcIil9XHJcbiAgICAgICAgICAgIGRpc2FibGVkPXshaXNFZGl0aW5nfVxyXG4gICAgICAgICAgICByZWFkT25seT17IWlzRWRpdGluZ31cclxuICAgICAgICAgICAgdXNlUG9ydGFsPXtmYWxzZX1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8U2VsZWN0Q29tYm9ib3hcclxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJWaXNpdHNfRGV0YWlsX0NvbnRhY3RNZXRob2RfTGFiZWxcIiwgXCJDb250YWN0IG1ldGhvZFwiKX1cclxuICAgICAgICAgICAgb3B0aW9ucz17Y29udGFjdE1ldGhvZHN9XHJcbiAgICAgICAgICAgIHZhbHVlPXtjb250YWN0TWV0aG9kfVxyXG4gICAgICAgICAgICBvbkNoYW5nZT17c2V0Q29udGFjdE1ldGhvZH1cclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJWaXNpdHNfRGV0YWlsX0NvbnRhY3RNZXRob2RfUGxhY2Vob2xkZXJcIiwgXCJTZWxlY3QgbWV0aG9kXCIpfVxyXG4gICAgICAgICAgICBkaXNhYmxlZD17IWlzRWRpdGluZ31cclxuICAgICAgICAgICAgcmVhZE9ubHk9eyFpc0VkaXRpbmd9XHJcbiAgICAgICAgICAgIHVzZVBvcnRhbD17ZmFsc2V9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICA8VmlzaXROYXJyYXRpdmVGaWVsZHNcclxuICAgICAgICAgIGRlc2NyaXB0aW9uTGFiZWw9e2Rlc2NyaXB0aW9uTGFiZWx9XHJcbiAgICAgICAgICBkZXNjcmlwdGlvblZhbHVlPXtkZXNjcmlwdGlvbn1cclxuICAgICAgICAgIGRlc2NyaXB0aW9uQ2xhc3NOYW1lPXtkZXRhaWxEZXNjcmlwdGlvbkNsYXNzTmFtZX1cclxuICAgICAgICAgIGRlc2NyaXB0aW9uRGlzYWJsZWQ9eyFpc0VkaXRpbmd9XHJcbiAgICAgICAgICBvbkRlc2NyaXB0aW9uQ2hhbmdlPXtzZXREZXNjcmlwdGlvbn1cclxuICAgICAgICAgIHRhcEZpZWxkcz17W1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgaWQ6IFwiY29tZW50YXJpb3NcIixcclxuICAgICAgICAgICAgICBsYWJlbDogY29tbWVudHNMYWJlbCxcclxuICAgICAgICAgICAgICB2YWx1ZTogY29tZW50YXJpb3MsXHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lOiBkZXRhaWxSZWFkT25seUNsYXNzTmFtZSxcclxuICAgICAgICAgICAgICBwb2ludGVyQmluZGluZ3M6IGNvbWVudGFyaW9zVGFwLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgaWQ6IFwiYW50ZWNlZGVudGVzXCIsXHJcbiAgICAgICAgICAgICAgbGFiZWw6IGJhY2tncm91bmRMYWJlbCxcclxuICAgICAgICAgICAgICB2YWx1ZTogYW50ZWNlZGVudGVzLFxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZTogZGV0YWlsUmVhZE9ubHlDbGFzc05hbWUsXHJcbiAgICAgICAgICAgICAgcG9pbnRlckJpbmRpbmdzOiBhbnRlY2VkZW50ZXNUYXAsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBpZDogXCJjb25jbHVzaW9uZXNcIixcclxuICAgICAgICAgICAgICBsYWJlbDogY29uY2x1c2lvbnNMYWJlbCxcclxuICAgICAgICAgICAgICB2YWx1ZTogY29uY2x1c2lvbmVzLFxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZTogZGV0YWlsUmVhZE9ubHlDbGFzc05hbWUsXHJcbiAgICAgICAgICAgICAgcG9pbnRlckJpbmRpbmdzOiBjb25jbHVzaW9uZXNUYXAsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICBdfVxyXG4gICAgICAgIC8+XHJcblxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTMgdGV4dC1zbSB0ZXh0LW5ldXRyYWwtNjAwXCI+XHJcbiAgICAgICAgICA8c3Bhbj57c3RhdHVzfTwvc3Bhbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuLy8gRGV0YWlsIFVJIHdyYXBwZWQgYnkgdGhlIGVycm9yIGJvdW5kYXJ5LlxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRGV0YWlsRm9ybShwcm9wczogRGV0YWlsRm9ybVByb3BzKSB7XG4gIHJldHVybiAoXG4gICAgPEFwcEVycm9yQm91bmRhcnkgZmFsbGJhY2tNZXNzYWdlPXtpbmRUKFwiVmlzaXRzX0RldGFpbF9FcnJvckJvdW5kYXJ5XCIsIFwiQW4gZXJyb3Igb2NjdXJyZWQgd2hpbGUgcmVuZGVyaW5nIHRoZSBkZXRhaWwgcGFnZS4gUmVsb2FkIGFuZCB0cnkgYWdhaW4uXCIpfT5cbiAgICAgIDxEZXRhaWxBcHAgey4uLnByb3BzfSAvPlxuICAgIDwvQXBwRXJyb3JCb3VuZGFyeT5cbiAgKTtcbn1cbiIsICJleHBvcnQgY29uc3QgYmluZFJlYWRPbmx5R3VhcmQgPSAoZWw6IEhUTUxFbGVtZW50IHwgbnVsbCkgPT4ge1xyXG4gIGlmICghZWwpIHJldHVybiAoKSA9PiB7fTtcclxuICBjb25zdCBjYW5jZWwgPSAoZXZlbnQ6IEV2ZW50KSA9PiBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIGNvbnN0IGV2ZW50cyA9IFtcImNvbnRleHRtZW51XCIsIFwic2VsZWN0c3RhcnRcIiwgXCJjb3B5XCIsIFwiY3V0XCIsIFwicGFzdGVcIl07XHJcbiAgZXZlbnRzLmZvckVhY2goKGV2dCkgPT4gZWwuYWRkRXZlbnRMaXN0ZW5lcihldnQsIGNhbmNlbCkpO1xyXG4gIHJldHVybiAoKSA9PiB7XHJcbiAgICBldmVudHMuZm9yRWFjaCgoZXZ0KSA9PiBlbC5yZW1vdmVFdmVudExpc3RlbmVyKGV2dCwgY2FuY2VsKSk7XHJcbiAgfTtcclxufTtcclxuIiwgImV4cG9ydCBjb25zdCBoYXNWYWx1ZSA9ICh2YWx1ZTogdW5rbm93bikgPT4gU3RyaW5nKHZhbHVlIHx8IFwiXCIpLnRyaW0oKS5sZW5ndGggPiAwO1xyXG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBmZXRjaEpzb24gfSBmcm9tIFwiLi4vc2VydmljZXMvYXBpU2VydmljZS50c1wiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuXHJcbnR5cGUgT3B0aW9uTGlrZSA9IHtcclxuICB2YWx1ZT86IHN0cmluZyB8IG51bWJlcjtcclxuICBWYWx1ZT86IHN0cmluZyB8IG51bWJlcjtcclxuICB0ZXh0Pzogc3RyaW5nO1xyXG4gIFRleHQ/OiBzdHJpbmc7XHJcbn07XHJcblxyXG50eXBlIEFjdGl2aXR5RGV0YWlsUmVjb3JkID0gUmVjb3JkPHN0cmluZywgdW5rbm93bj47XHJcblxyXG50eXBlIEFjdGl2aXR5RGV0YWlsUmVzcG9uc2UgPSB7XHJcbiAgc3VjY2Vzcz86IGJvb2xlYW47XHJcbiAgbWVzc2FnZT86IHN0cmluZztcclxuICBkYXRhPzogQWN0aXZpdHlEZXRhaWxSZWNvcmQgfCBudWxsO1xyXG4gIFN1Y2Nlc3M/OiBib29sZWFuO1xyXG4gIE1lc3NhZ2U/OiBzdHJpbmc7XHJcbiAgRGF0YT86IEFjdGl2aXR5RGV0YWlsUmVjb3JkIHwgbnVsbDtcclxufTtcclxuXHJcbmNvbnN0IGlzUmVzcG9uc2VTdWNjZXNzID0gKHJlc3BvbnNlOiBBY3Rpdml0eURldGFpbFJlc3BvbnNlKTogYm9vbGVhbiA9PiB7XHJcbiAgcmV0dXJuIHJlc3BvbnNlLnN1Y2Nlc3MgPT09IHRydWUgfHwgcmVzcG9uc2UuU3VjY2VzcyA9PT0gdHJ1ZTtcclxufTtcclxuXHJcbmNvbnN0IGdldFJlc3BvbnNlTWVzc2FnZSA9IChyZXNwb25zZTogQWN0aXZpdHlEZXRhaWxSZXNwb25zZSk6IHN0cmluZyA9PiB7XHJcbiAgY29uc3QgcmF3ID0gcmVzcG9uc2UubWVzc2FnZSA/PyByZXNwb25zZS5NZXNzYWdlO1xyXG4gIHJldHVybiB0eXBlb2YgcmF3ID09PSBcInN0cmluZ1wiID8gcmF3LnRyaW0oKSA6IFwiXCI7XHJcbn07XHJcblxyXG5jb25zdCBnZXRSZXNwb25zZURhdGEgPSAocmVzcG9uc2U6IEFjdGl2aXR5RGV0YWlsUmVzcG9uc2UpOiBBY3Rpdml0eURldGFpbFJlY29yZCB8IG51bGwgPT4ge1xyXG4gIGNvbnN0IGRhdGEgPSByZXNwb25zZS5kYXRhID8/IHJlc3BvbnNlLkRhdGE7XHJcbiAgcmV0dXJuIGRhdGEgJiYgdHlwZW9mIGRhdGEgPT09IFwib2JqZWN0XCIgPyBkYXRhIDogbnVsbDtcclxufTtcclxuXHJcbmNvbnN0IGFzUmVjb3JkID0gKHZhbHVlOiB1bmtub3duKTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4gfCBudWxsID0+IHtcclxuICBpZiAoIXZhbHVlIHx8IHR5cGVvZiB2YWx1ZSAhPT0gXCJvYmplY3RcIiB8fCBBcnJheS5pc0FycmF5KHZhbHVlKSkgcmV0dXJuIG51bGw7XHJcbiAgcmV0dXJuIHZhbHVlIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+O1xyXG59O1xyXG5cclxudHlwZSBVc2VEZXRhaWxIeWRyYXRpb25BcmdzID0ge1xyXG4gIGFjdGl2aWRhZElkOiBzdHJpbmc7XHJcbiAgc2hvdWxkSHlkcmF0ZTogYm9vbGVhbjtcclxuICB2aXNpdFR5cGVzOiBPcHRpb25MaWtlW107XHJcbiAgY29udGFjdE1ldGhvZHM6IE9wdGlvbkxpa2VbXTtcclxuICBhc2lzdGVudGVUaXBvczogT3B0aW9uTGlrZVtdO1xyXG4gIGRlZmF1bHRWaXNpdFR5cGU6IHN0cmluZztcclxuICBpbml0aWFsQXNpc3RlbnRlOiBzdHJpbmc7XHJcbiAgbm9ybWFsaXplRGF0ZVRvSW5wdXQ6ICh2YWx1ZTogc3RyaW5nKSA9PiBzdHJpbmc7XHJcbiAgbWF0Y2hPcHRpb25WYWx1ZTogKG9wdGlvbnM6IE9wdGlvbkxpa2VbXSwgcmF3OiB1bmtub3duKSA9PiBzdHJpbmc7XHJcbiAgYXBwbHlEcmFmdFZhbHVlczogKCkgPT4gdm9pZDtcclxuICBhcHBseVRleHRFZGl0b3JWYWx1ZXM6ICgpID0+IHZvaWQ7XHJcbiAgc2V0U3RhdHVzOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBzZXRJc0h5ZHJhdGluZzogKHZhbHVlOiBib29sZWFuKSA9PiB2b2lkO1xyXG4gIHNldFRyYW5zRGF0ZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgc2V0VmlzaXRUeXBlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBzZXRDb250YWN0TWV0aG9kOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBzZXRBc2lzdGVudGVUaXBvOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBzZXREZXNjcmlwdGlvbjogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgc2V0Q29tZW50YXJpb3M6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIHNldEFudGVjZWRlbnRlczogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgc2V0Q29uY2x1c2lvbmVzOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxufTtcclxuXHJcbi8vIEtlZXBzIGRldGFpbCBoeWRyYXRpb24gb3JjaGVzdHJhdGlvbiBvdXRzaWRlIHRoZSBwYWdlIGNvbXBvbmVudC5cclxuZXhwb3J0IGNvbnN0IHVzZURldGFpbEh5ZHJhdGlvbiA9ICh7XHJcbiAgYWN0aXZpZGFkSWQsXHJcbiAgc2hvdWxkSHlkcmF0ZSxcclxuICB2aXNpdFR5cGVzLFxyXG4gIGNvbnRhY3RNZXRob2RzLFxyXG4gIGFzaXN0ZW50ZVRpcG9zLFxyXG4gIGRlZmF1bHRWaXNpdFR5cGUsXHJcbiAgaW5pdGlhbEFzaXN0ZW50ZSxcclxuICBub3JtYWxpemVEYXRlVG9JbnB1dCxcclxuICBtYXRjaE9wdGlvblZhbHVlLFxyXG4gIGFwcGx5RHJhZnRWYWx1ZXMsXHJcbiAgYXBwbHlUZXh0RWRpdG9yVmFsdWVzLFxyXG4gIHNldFN0YXR1cyxcclxuICBzZXRJc0h5ZHJhdGluZyxcclxuICBzZXRUcmFuc0RhdGUsXHJcbiAgc2V0VmlzaXRUeXBlLFxyXG4gIHNldENvbnRhY3RNZXRob2QsXHJcbiAgc2V0QXNpc3RlbnRlVGlwbyxcclxuICBzZXREZXNjcmlwdGlvbixcclxuICBzZXRDb21lbnRhcmlvcyxcclxuICBzZXRBbnRlY2VkZW50ZXMsXHJcbiAgc2V0Q29uY2x1c2lvbmVzLFxyXG59OiBVc2VEZXRhaWxIeWRyYXRpb25BcmdzKSA9PiB7XHJcbiAgY29uc3QgaHlkcmF0ZUZyb21BcGkgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XHJcbiAgICBpZiAoIWFjdGl2aWRhZElkKSByZXR1cm47XHJcbiAgICBzZXRJc0h5ZHJhdGluZyh0cnVlKTtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoSnNvbjxBY3Rpdml0eURldGFpbFJlc3BvbnNlPihgL1Zpc2l0YXMvR2V0QWN0aXZpdHlCeUNvZGU/Y29kZT0ke2VuY29kZVVSSUNvbXBvbmVudChhY3RpdmlkYWRJZCl9YCk7XHJcbiAgICAgIGNvbnN0IHJlc3BvbnNlRGF0YSA9IGdldFJlc3BvbnNlRGF0YShyZXMpO1xyXG5cclxuICAgICAgaWYgKCFpc1Jlc3BvbnNlU3VjY2VzcyhyZXMpIHx8ICFyZXNwb25zZURhdGEpIHtcclxuICAgICAgICBzZXRTdGF0dXMoZ2V0UmVzcG9uc2VNZXNzYWdlKHJlcykgfHwgaW5kVChcIlZpc2l0c19EZXRhaWxfTG9hZEFjdGl2aXR5RmFpbGVkXCIsIFwiRmFpbGVkIHRvIGxvYWQgYWN0aXZpdHkgZGV0YWlscy5cIikpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgcmF3RGF0ZSA9IFN0cmluZyhyZXNwb25zZURhdGEudHJhbnNEYXRlID8/IHJlc3BvbnNlRGF0YS5UcmFuc0RhdGUgPz8gXCJcIik7XHJcbiAgICAgIHNldFRyYW5zRGF0ZShub3JtYWxpemVEYXRlVG9JbnB1dChyYXdEYXRlKSk7XHJcblxyXG4gICAgICBjb25zdCByYXdWaXNpdFR5cGUgPSBTdHJpbmcoXHJcbiAgICAgICAgcmVzcG9uc2VEYXRhLnRpcG9WaXNpdGEgPz8gcmVzcG9uc2VEYXRhLlRpcG9WaXNpdGEgPz8gcmVzcG9uc2VEYXRhLnZpc2l0VHlwZSA/PyByZXNwb25zZURhdGEuVmlzaXRUeXBlID8/IFwiXCJcclxuICAgICAgKTtcclxuICAgICAgc2V0VmlzaXRUeXBlKG1hdGNoT3B0aW9uVmFsdWUodmlzaXRUeXBlcywgcmF3VmlzaXRUeXBlKSB8fCBkZWZhdWx0VmlzaXRUeXBlKTtcclxuXHJcbiAgICAgIGNvbnN0IHJhd0NvbnRhY3RNZXRob2QgPSBTdHJpbmcoXHJcbiAgICAgICAgcmVzcG9uc2VEYXRhLmNvbnRhY3RNZXRob2QgPz8gcmVzcG9uc2VEYXRhLkNvbnRhY3RNZXRob2QgPz8gXCJcIlxyXG4gICAgICApO1xyXG4gICAgICBzZXRDb250YWN0TWV0aG9kKG1hdGNoT3B0aW9uVmFsdWUoY29udGFjdE1ldGhvZHMsIHJhd0NvbnRhY3RNZXRob2QpKTtcclxuXHJcbiAgICAgIGNvbnN0IGFzaXN0ZW50ZXNMaXN0ID0gcmVzcG9uc2VEYXRhLmFzaXN0ZW50ZXMgPz8gcmVzcG9uc2VEYXRhLkFzaXN0ZW50ZXM7XHJcbiAgICAgIGNvbnN0IGZpcnN0QXNpc3RlbnRlID0gQXJyYXkuaXNBcnJheShhc2lzdGVudGVzTGlzdCkgJiYgYXNpc3RlbnRlc0xpc3QubGVuZ3RoID8gYXNSZWNvcmQoYXNpc3RlbnRlc0xpc3RbMF0pIDogbnVsbDtcclxuICAgICAgY29uc3QgcmF3QXNpc3RlbnRlVGlwbyA9IFN0cmluZyhcclxuICAgICAgICByZXNwb25zZURhdGEuYXNpc3RlbnRlVGlwbyA/P1xyXG4gICAgICAgICAgcmVzcG9uc2VEYXRhLkFzaXN0ZW50ZVRpcG8gPz9cclxuICAgICAgICAgIGZpcnN0QXNpc3RlbnRlPy5hc2lzdGVudGVUaXBvID8/XHJcbiAgICAgICAgICBmaXJzdEFzaXN0ZW50ZT8uQXNpc3RlbnRlVGlwbyA/P1xyXG4gICAgICAgICAgXCJcIlxyXG4gICAgICApO1xyXG4gICAgICBjb25zdCBub3JtYWxpemVkQXNpc3RlbnRlVGlwbyA9IG1hdGNoT3B0aW9uVmFsdWUoYXNpc3RlbnRlVGlwb3MsIHJhd0FzaXN0ZW50ZVRpcG8pO1xyXG4gICAgICBzZXRBc2lzdGVudGVUaXBvKG5vcm1hbGl6ZWRBc2lzdGVudGVUaXBvIHx8IGluaXRpYWxBc2lzdGVudGUpO1xyXG4gICAgICBzZXREZXNjcmlwdGlvbihTdHJpbmcocmVzcG9uc2VEYXRhLmRlc2NyaXB0aW9uID8/IHJlc3BvbnNlRGF0YS5EZXNjcmlwdGlvbiA/PyBcIlwiKSk7XHJcbiAgICAgIHNldENvbWVudGFyaW9zKFN0cmluZyhyZXNwb25zZURhdGEuY29tZW50YXJpb3MgPz8gcmVzcG9uc2VEYXRhLkNvbWVudGFyaW9zID8/IFwiXCIpKTtcclxuICAgICAgc2V0QW50ZWNlZGVudGVzKFN0cmluZyhyZXNwb25zZURhdGEuYW50ZWNlZGVudGVzID8/IHJlc3BvbnNlRGF0YS5BbnRlY2VkZW50ZXMgPz8gXCJcIikpO1xyXG4gICAgICBzZXRDb25jbHVzaW9uZXMoU3RyaW5nKHJlc3BvbnNlRGF0YS5jb25jbHVzaW9uZXMgPz8gcmVzcG9uc2VEYXRhLkNvbmNsdXNpb25lcyA/PyBcIlwiKSk7XHJcbiAgICB9IGNhdGNoIHtcclxuICAgICAgLy8gS2VlcCBwcmV2aW91cyBVSSBiZWhhdmlvciBvbiBoeWRyYXRpb24gZXJyb3JzLlxyXG4gICAgfSBmaW5hbGx5IHtcclxuICAgICAgc2V0SXNIeWRyYXRpbmcoZmFsc2UpO1xyXG4gICAgICBhcHBseURyYWZ0VmFsdWVzKCk7XHJcbiAgICAgIGFwcGx5VGV4dEVkaXRvclZhbHVlcygpO1xyXG4gICAgfVxyXG4gIH0sIFtcclxuICAgIGFjdGl2aWRhZElkLFxyXG4gICAgYXBwbHlEcmFmdFZhbHVlcyxcclxuICAgIGFwcGx5VGV4dEVkaXRvclZhbHVlcyxcclxuICAgIGFzaXN0ZW50ZVRpcG9zLFxyXG4gICAgY29udGFjdE1ldGhvZHMsXHJcbiAgICBkZWZhdWx0VmlzaXRUeXBlLFxyXG4gICAgaW5pdGlhbEFzaXN0ZW50ZSxcclxuICAgIG1hdGNoT3B0aW9uVmFsdWUsXHJcbiAgICBub3JtYWxpemVEYXRlVG9JbnB1dCxcclxuICAgIHNldEFudGVjZWRlbnRlcyxcclxuICAgIHNldEFzaXN0ZW50ZVRpcG8sXHJcbiAgICBzZXRDb21lbnRhcmlvcyxcclxuICAgIHNldENvbmNsdXNpb25lcyxcclxuICAgIHNldERlc2NyaXB0aW9uLFxyXG4gICAgc2V0SXNIeWRyYXRpbmcsXHJcbiAgICBzZXRTdGF0dXMsXHJcbiAgICBzZXRUcmFuc0RhdGUsXHJcbiAgICBzZXRWaXNpdFR5cGUsXHJcbiAgICBzZXRDb250YWN0TWV0aG9kLFxyXG4gICAgdmlzaXRUeXBlcyxcclxuICBdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmIChzaG91bGRIeWRyYXRlKSB7XHJcbiAgICAgIGh5ZHJhdGVGcm9tQXBpKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGFwcGx5RHJhZnRWYWx1ZXMoKTtcclxuICAgIGFwcGx5VGV4dEVkaXRvclZhbHVlcygpO1xyXG4gIH0sIFthcHBseURyYWZ0VmFsdWVzLCBhcHBseVRleHRFZGl0b3JWYWx1ZXMsIGh5ZHJhdGVGcm9tQXBpLCBzaG91bGRIeWRyYXRlXSk7XHJcbn07XHJcbiIsICJpbXBvcnQgeyB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgd2FpdCB9IGZyb20gXCIuLi91dGlscy93YWl0LnRzXCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgeyBzaG93UGVybWlzc2lvbk1vZGFsIH0gZnJvbSBcIi4uL3V0aWxzL3Blcm1pc3Npb25zLnRzXCI7XHJcbmltcG9ydCB7IHNldEhpc3RvcnlGaWx0ZXJGb3JEYXRlLCBmbGFzaEFjdGlvbk1hcmsgfSBmcm9tIFwiLi4vdXRpbHMvdmlzaXRhc0hpc3RvcnkudHNcIjtcclxuaW1wb3J0IHsgc2V0VG9wYmFyQWN0aW9uR3JvdXBSZWFkeSB9IGZyb20gXCIuLi91dGlscy90b3BiYXJBY3Rpb25WaXNpYmlsaXR5LnRzXCI7XHJcblxyXG50eXBlIFVzZURldGFpbFRvcGJhckFjdGlvbnNBcmdzID0ge1xyXG4gIGJ1c3k6IGJvb2xlYW47XHJcbiAgbW9kYWxPcGVuOiBib29sZWFuO1xyXG4gIGlzRWRpdGluZzogYm9vbGVhbjtcclxuICBjYW5FZGl0SGlzdG9yeTogYm9vbGVhbjtcclxuICBjYW5EZWxldGVIaXN0b3J5OiBib29sZWFuO1xyXG4gIHRyYW5zRGF0ZTogc3RyaW5nO1xyXG4gIHNldE1vZGFsRXJyb3I6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIGhhbmRsZUVuYWJsZUVkaXQ6ICgpID0+IHZvaWQ7XHJcbiAgaGFuZGxlQ2FuY2VsRWRpdDogKCkgPT4gdm9pZDtcclxuICBoYW5kbGVVcGRhdGU6ICgpID0+IFByb21pc2U8Ym9vbGVhbj47XHJcbiAgaGFuZGxlRGVsZXRlOiAoKSA9PiBQcm9taXNlPGJvb2xlYW4+O1xyXG4gIGFjdGlvbkdyb3VwSWQ/OiBzdHJpbmc7XHJcbiAgcGVybWlzc2lvbnNSZWFkeT86IGJvb2xlYW47XHJcbiAgb3BlbkNvbmZpcm06IChvcHRzOiB7XHJcbiAgICB0aXRsZTogc3RyaW5nO1xyXG4gICAgbWVzc2FnZTogc3RyaW5nO1xyXG4gICAgY29uZmlybVRleHQ/OiBzdHJpbmc7XHJcbiAgICBvbkNvbmZpcm0/OiAoKSA9PiBQcm9taXNlPGJvb2xlYW4gfCB2b2lkPiB8IGJvb2xlYW4gfCB2b2lkO1xyXG4gIH0pID0+IHZvaWQ7XHJcbiAgY2xvc2VDb25maXJtOiAoKSA9PiB2b2lkO1xyXG59O1xyXG5cclxuLy8gQ29vcmRpbmF0ZXMgdG9wYmFyIGljb24gdmlzaWJpbGl0eSBhbmQgYWN0aW9uIGV2ZW50cyBmb3IgZGV0YWlsIHBhZ2UuXHJcbmV4cG9ydCBjb25zdCB1c2VEZXRhaWxUb3BiYXJBY3Rpb25zID0gKHtcclxuICBidXN5LFxyXG4gIG1vZGFsT3BlbixcclxuICBpc0VkaXRpbmcsXHJcbiAgY2FuRWRpdEhpc3RvcnksXHJcbiAgY2FuRGVsZXRlSGlzdG9yeSxcclxuICB0cmFuc0RhdGUsXHJcbiAgc2V0TW9kYWxFcnJvcixcclxuICBoYW5kbGVFbmFibGVFZGl0LFxyXG4gIGhhbmRsZUNhbmNlbEVkaXQsXHJcbiAgaGFuZGxlVXBkYXRlLFxyXG4gIGhhbmRsZURlbGV0ZSxcclxuICBhY3Rpb25Hcm91cElkID0gXCJ2aXNpdC1kZXRhaWwtYWN0aW9uc1wiLFxyXG4gIHBlcm1pc3Npb25zUmVhZHkgPSB0cnVlLFxyXG4gIG9wZW5Db25maXJtLFxyXG4gIGNsb3NlQ29uZmlybSxcclxufTogVXNlRGV0YWlsVG9wYmFyQWN0aW9uc0FyZ3MpID0+IHtcclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFwZXJtaXNzaW9uc1JlYWR5KSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgZWRpdEljb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpc2l0RWRpdEljb25cIik7XHJcbiAgICBjb25zdCBzYXZlSWNvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlzaXRTYXZlSWNvblwiKTtcbiAgICBjb25zdCBkZWxldGVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpc2l0RGVsZXRlQnRuXCIpO1xuICAgIGNvbnN0IGNhbmNlbEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlzaXRDYW5jZWxCdG5cIik7XG4gICAgY29uc3QgZWRpdEJ0biA9IGVkaXRJY29uPy5jbG9zZXN0KFwiYnV0dG9uXCIpID8/IG51bGw7XG4gICAgaWYgKGlzRWRpdGluZykge1xuICAgICAgaWYgKGVkaXRCdG4pIGVkaXRCdG4uY2xhc3NMaXN0LnRvZ2dsZShcInRvcGJhci1oaWRkZW5cIiwgIWNhbkVkaXRIaXN0b3J5KTtcbiAgICAgIGlmIChlZGl0SWNvbikgZWRpdEljb24uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgIGlmIChzYXZlSWNvbikgc2F2ZUljb24uY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICAgIGlmIChkZWxldGVCdG4pIGRlbGV0ZUJ0bi5jbGFzc0xpc3QuYWRkKFwidG9wYmFyLWhpZGRlblwiKTtcbiAgICAgIGlmIChjYW5jZWxCdG4pIGNhbmNlbEJ0bi5jbGFzc0xpc3QucmVtb3ZlKFwidG9wYmFyLWhpZGRlblwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGVkaXRCdG4pIGVkaXRCdG4uY2xhc3NMaXN0LnRvZ2dsZShcInRvcGJhci1oaWRkZW5cIiwgIWNhbkVkaXRIaXN0b3J5KTtcbiAgICAgIGlmIChlZGl0SWNvbikgZWRpdEljb24uY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICAgIGlmIChzYXZlSWNvbikgc2F2ZUljb24uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgIGlmIChkZWxldGVCdG4pIGRlbGV0ZUJ0bi5jbGFzc0xpc3QudG9nZ2xlKFwidG9wYmFyLWhpZGRlblwiLCAhY2FuRGVsZXRlSGlzdG9yeSk7XG4gICAgICBpZiAoY2FuY2VsQnRuKSBjYW5jZWxCdG4uY2xhc3NMaXN0LmFkZChcInRvcGJhci1oaWRkZW5cIik7XG4gICAgfVxuXG4gICAgc2V0VG9wYmFyQWN0aW9uR3JvdXBSZWFkeShhY3Rpb25Hcm91cElkKTtcbiAgfSwgW2FjdGlvbkdyb3VwSWQsIGNhbkRlbGV0ZUhpc3RvcnksIGNhbkVkaXRIaXN0b3J5LCBpc0VkaXRpbmcsIHBlcm1pc3Npb25zUmVhZHldKTtcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIXBlcm1pc3Npb25zUmVhZHkpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBvbkVkaXQgPSAoKSA9PiB7XHJcbiAgICAgIGlmICghY2FuRWRpdEhpc3RvcnkpIHtcclxuICAgICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChpc0VkaXRpbmcpIHtcclxuICAgICAgICBpZiAoYnVzeSB8fCBtb2RhbE9wZW4pIHJldHVybjtcclxuICAgICAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xyXG4gICAgICAgIG9wZW5Db25maXJtKHtcclxuICAgICAgICAgIHRpdGxlOiBpbmRUKFwiVmlzaXRzX0RldGFpbF9TYXZlQ2hhbmdlc19UaXRsZVwiLCBcIlZpc2l0c19EZXRhaWxfU2F2ZUNoYW5nZXNfVGl0bGVcIiksXHJcbiAgICAgICAgICBtZXNzYWdlOiBpbmRUKFwiVmlzaXRzX0RldGFpbF9TYXZlQ2hhbmdlc19Cb2R5XCIsIFwiVmlzaXRzX0RldGFpbF9TYXZlQ2hhbmdlc19Cb2R5XCIpLFxyXG4gICAgICAgICAgY29uZmlybVRleHQ6IGluZFQoXCJDb21tb25fU2F2ZVwiLCBcIkNvbW1vbl9TYXZlXCIpLFxyXG4gICAgICAgICAgb25Db25maXJtOiBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG9rID0gYXdhaXQgaGFuZGxlVXBkYXRlKCk7XHJcbiAgICAgICAgICAgIGlmIChvaykge1xyXG4gICAgICAgICAgICAgIGNsb3NlQ29uZmlybSgpO1xyXG4gICAgICAgICAgICAgIHNldEhpc3RvcnlGaWx0ZXJGb3JEYXRlKHRyYW5zRGF0ZSk7XHJcbiAgICAgICAgICAgICAgYXdhaXQgd2FpdCgyMDApO1xyXG4gICAgICAgICAgICAgIGZsYXNoQWN0aW9uTWFyayhcIm9rUHJvY2Vzc1wiLCAxMjAwKTtcclxuICAgICAgICAgICAgICBhd2FpdCB3YWl0KDEyMDApO1xyXG4gICAgICAgICAgICAgIHdpbmRvdy5fX2luZEJ5cGFzc05hdmlnYXRpb25HdWFyZE9uY2U/LigpO1xyXG4gICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvSGlzdG9yaWFsL0hpc3RvcnlcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gb2s7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGhhbmRsZUVuYWJsZUVkaXQoKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBvbkRlbGV0ZSA9ICgpID0+IHtcclxuICAgICAgaWYgKCFjYW5EZWxldGVIaXN0b3J5KSB7XHJcbiAgICAgICAgc2hvd1Blcm1pc3Npb25Nb2RhbCgpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBpZiAoYnVzeSB8fCBtb2RhbE9wZW4pIHJldHVybjtcclxuICAgICAgc2V0TW9kYWxFcnJvcihcIlwiKTtcclxuICAgICAgb3BlbkNvbmZpcm0oe1xyXG4gICAgICAgIHRpdGxlOiBpbmRUKFwiVmlzaXRzX0RldGFpbF9EZWxldGVBY3Rpdml0eV9UaXRsZVwiLCBcIlZpc2l0c19EZXRhaWxfRGVsZXRlQWN0aXZpdHlfVGl0bGVcIiksXHJcbiAgICAgICAgbWVzc2FnZTogaW5kVChcIlZpc2l0c19EZXRhaWxfRGVsZXRlQWN0aXZpdHlfQm9keVwiLCBcIlZpc2l0c19EZXRhaWxfRGVsZXRlQWN0aXZpdHlfQm9keVwiKSxcclxuICAgICAgICBjb25maXJtVGV4dDogaW5kVChcIkNvbW1vbl9EZWxldGVcIiwgXCJDb21tb25fRGVsZXRlXCIpLFxyXG4gICAgICAgIG9uQ29uZmlybTogYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgY29uc3Qgb2sgPSBhd2FpdCBoYW5kbGVEZWxldGUoKTtcclxuICAgICAgICAgIGlmIChvaykge1xyXG4gICAgICAgICAgICBjbG9zZUNvbmZpcm0oKTtcclxuICAgICAgICAgICAgc2V0SGlzdG9yeUZpbHRlckZvckRhdGUodHJhbnNEYXRlKTtcclxuICAgICAgICAgICAgYXdhaXQgd2FpdCgyMDApO1xyXG4gICAgICAgICAgICBmbGFzaEFjdGlvbk1hcmsoXCJva0RlbFByb2Nlc3NcIiwgMTIwMCk7XHJcbiAgICAgICAgICAgIGF3YWl0IHdhaXQoMTIwMCk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5fX2luZEJ5cGFzc05hdmlnYXRpb25HdWFyZE9uY2U/LigpO1xyXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL0hpc3RvcmlhbC9IaXN0b3J5XCI7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gb2s7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IG9uQ2FuY2VsRWRpdCA9ICgpID0+IHtcclxuICAgICAgaWYgKGJ1c3kgfHwgbW9kYWxPcGVuKSByZXR1cm47XHJcbiAgICAgIGhhbmRsZUNhbmNlbEVkaXQoKTtcclxuICAgIH07XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJ2aXNpdC1lZGl0XCIsIG9uRWRpdCk7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInZpc2l0LWRlbGV0ZVwiLCBvbkRlbGV0ZSk7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInZpc2l0LWNhbmNlbC1lZGl0XCIsIG9uQ2FuY2VsRWRpdCk7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInZpc2l0LWVkaXRcIiwgb25FZGl0KTtcclxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ2aXNpdC1kZWxldGVcIiwgb25EZWxldGUpO1xyXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInZpc2l0LWNhbmNlbC1lZGl0XCIsIG9uQ2FuY2VsRWRpdCk7XHJcbiAgICB9O1xyXG4gIH0sIFtcclxuICAgIGJ1c3ksXHJcbiAgICBjYW5EZWxldGVIaXN0b3J5LFxyXG4gICAgY2FuRWRpdEhpc3RvcnksXHJcbiAgICBjbG9zZUNvbmZpcm0sXHJcbiAgICBoYW5kbGVDYW5jZWxFZGl0LFxyXG4gICAgaGFuZGxlRGVsZXRlLFxyXG4gICAgaGFuZGxlRW5hYmxlRWRpdCxcclxuICAgIGhhbmRsZVVwZGF0ZSxcclxuICAgIGlzRWRpdGluZyxcclxuICAgIG1vZGFsT3BlbixcclxuICAgIG9wZW5Db25maXJtLFxyXG4gICAgcGVybWlzc2lvbnNSZWFkeSxcclxuICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICB0cmFuc0RhdGUsXHJcbiAgXSk7XHJcbn07XHJcbiIsICJcdUZFRkZpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlUmVmIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IGdldFNlc3Npb25WYWx1ZVdpdGhFeHBpcnksIHJlbW92ZVNlc3Npb25WYWx1ZVdpdGhFeHBpcnksIHNldFNlc3Npb25WYWx1ZVdpdGhFeHBpcnkgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvc2Vzc2lvbkV4cGlyeS50c1wiO1xyXG5cclxuY29uc3QgRURJVF9NT0RFX1RUTF9NUyA9IDYgKiA2MCAqIDYwICogMTAwMDtcclxuY29uc3QgREVUQUlMX0RSQUZUX1RUTF9NUyA9IDI0ICogNjAgKiA2MCAqIDEwMDA7XHJcblxyXG50eXBlIFVzZURldGFpbEVkaXRTZXNzaW9uQXJncyA9IHtcclxuICBhY3RpdmlkYWRJZDogc3RyaW5nO1xyXG4gIHJlY0lkOiBzdHJpbmc7XHJcbiAgY2FuRWRpdEhpc3Rvcnk6IGJvb2xlYW47XHJcbiAgaXNFZGl0aW5nOiBib29sZWFuO1xyXG4gIHNldElzRWRpdGluZzogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248Ym9vbGVhbj4+O1xuICB0cmFuc0RhdGU6IHN0cmluZztcbiAgdmlzaXRUeXBlOiBzdHJpbmc7XG4gIGNvbnRhY3RNZXRob2Q6IHN0cmluZztcbiAgYXNpc3RlbnRlVGlwbzogc3RyaW5nO1xuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xyXG4gIGNvbWVudGFyaW9zOiBzdHJpbmc7XHJcbiAgYW50ZWNlZGVudGVzOiBzdHJpbmc7XHJcbiAgY29uY2x1c2lvbmVzOiBzdHJpbmc7XHJcbiAgc2V0VHJhbnNEYXRlOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcbiAgc2V0VmlzaXRUeXBlOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcbiAgc2V0Q29udGFjdE1ldGhvZDogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XG4gIHNldEFzaXN0ZW50ZVRpcG86IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPHN0cmluZz4+O1xuICBzZXREZXNjcmlwdGlvbjogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XHJcbiAgc2V0Q29tZW50YXJpb3M6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPHN0cmluZz4+O1xyXG4gIHNldEFudGVjZWRlbnRlczogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XHJcbiAgc2V0Q29uY2x1c2lvbmVzOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcclxufTtcclxuXHJcbnR5cGUgRGV0YWlsRHJhZnRWYWx1ZXMgPSB7XHJcbiAgdHJhbnNEYXRlOiBzdHJpbmc7XG4gIHZpc2l0VHlwZTogc3RyaW5nO1xuICBjb250YWN0TWV0aG9kOiBzdHJpbmc7XG4gIGFzaXN0ZW50ZVRpcG86IHN0cmluZztcbiAgZGVzY3JpcHRpb246IHN0cmluZztcclxuICBjb21lbnRhcmlvczogc3RyaW5nO1xyXG4gIGFudGVjZWRlbnRlczogc3RyaW5nO1xyXG4gIGNvbmNsdXNpb25lczogc3RyaW5nO1xyXG59O1xyXG5cclxuLy8gTWFuYWdlcyBlZGl0LW1vZGUgc2Vzc2lvbiBmbGFncyBhbmQgZGV0YWlsIGRyYWZ0IHBlcnNpc3RlbmNlLlxyXG5leHBvcnQgY29uc3QgdXNlRGV0YWlsRWRpdFNlc3Npb24gPSAoe1xyXG4gIGFjdGl2aWRhZElkLFxyXG4gIHJlY0lkLFxyXG4gIGNhbkVkaXRIaXN0b3J5LFxyXG4gIGlzRWRpdGluZyxcclxuICBzZXRJc0VkaXRpbmcsXHJcbiAgdHJhbnNEYXRlLFxuICB2aXNpdFR5cGUsXG4gIGNvbnRhY3RNZXRob2QsXG4gIGFzaXN0ZW50ZVRpcG8sXG4gIGRlc2NyaXB0aW9uLFxyXG4gIGNvbWVudGFyaW9zLFxyXG4gIGFudGVjZWRlbnRlcyxcclxuICBjb25jbHVzaW9uZXMsXHJcbiAgc2V0VHJhbnNEYXRlLFxuICBzZXRWaXNpdFR5cGUsXG4gIHNldENvbnRhY3RNZXRob2QsXG4gIHNldEFzaXN0ZW50ZVRpcG8sXG4gIHNldERlc2NyaXB0aW9uLFxyXG4gIHNldENvbWVudGFyaW9zLFxyXG4gIHNldEFudGVjZWRlbnRlcyxcclxuICBzZXRDb25jbHVzaW9uZXMsXHJcbn06IFVzZURldGFpbEVkaXRTZXNzaW9uQXJncykgPT4ge1xyXG4gIGNvbnN0IGVkaXRNb2RlS2V5UmVmID0gdXNlUmVmKFwiXCIpO1xyXG4gIGNvbnN0IGRyYWZ0S2V5UmVmID0gdXNlUmVmKFwiXCIpO1xyXG4gIGNvbnN0IGRyYWZ0UGVyc2lzdFRpbWVyUmVmID0gdXNlUmVmPG51bWJlciB8IG51bGw+KG51bGwpO1xyXG5cclxuICAvLyBQZXJzaXN0IGVkaXQgbW9kZSB3aGlsZSB1c2VyIG5hdmlnYXRlcyB0byB0aGUgdGV4dCBlZGl0b3IgYW5kIGJhY2suXHJcbiAgY29uc3Qgc3luY0VkaXRNb2RlRmxhZyA9IHVzZUNhbGxiYWNrKChlbmFibGVkOiBib29sZWFuKSA9PiB7XHJcbiAgICBjb25zdCBrZXkgPSBlZGl0TW9kZUtleVJlZi5jdXJyZW50O1xyXG4gICAgaWYgKCFrZXkpIHJldHVybjtcclxuICAgIGlmIChlbmFibGVkKSB7XHJcbiAgICAgIHNldFNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoa2V5LCBcInRydWVcIiwgRURJVF9NT0RFX1RUTF9NUyk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHJlbW92ZVNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoa2V5KTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IHN5bmNFZGl0TW9kZU9uRW50cnkgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBjb25zdCBiYXNlSWQgPSBhY3RpdmlkYWRJZCB8fCByZWNJZCB8fCBcImRlZmF1bHRcIjtcclxuICAgIGNvbnN0IGtleSA9IGBpbmRfdmlzaXRfZWRpdF8ke2Jhc2VJZH1gO1xyXG4gICAgY29uc3QgcmV0dXJuS2V5ID0gYCR7a2V5fV9yZXR1cm5gO1xyXG4gICAgY29uc3QgZHJhZnRLZXkgPSBgaW5kX3Zpc2l0X2RyYWZ0XyR7YmFzZUlkfWA7XHJcbiAgICBlZGl0TW9kZUtleVJlZi5jdXJyZW50ID0ga2V5O1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IGFsbG93UmVzdG9yZSA9IGdldFNlc3Npb25WYWx1ZVdpdGhFeHBpcnkocmV0dXJuS2V5KSA9PT0gXCIxXCI7XHJcbiAgICAgIGlmIChhbGxvd1Jlc3RvcmUpIHtcclxuICAgICAgICByZW1vdmVTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KHJldHVybktleSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChjYW5FZGl0SGlzdG9yeSAmJiBhbGxvd1Jlc3RvcmUgJiYgZ2V0U2Vzc2lvblZhbHVlV2l0aEV4cGlyeShrZXkpID09PSBcInRydWVcIikge1xyXG4gICAgICAgIHNldElzRWRpdGluZyh0cnVlKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzZXRJc0VkaXRpbmcoZmFsc2UpO1xyXG4gICAgICAgIHJlbW92ZVNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoa2V5KTtcclxuICAgICAgICByZW1vdmVTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KGRyYWZ0S2V5KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCFjYW5FZGl0SGlzdG9yeSkge1xyXG4gICAgICAgIHJlbW92ZVNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoa2V5KTtcclxuICAgICAgICByZW1vdmVTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KGRyYWZ0S2V5KTtcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCB7XHJcbiAgICAgIC8qIGlnbm9yZSAqL1xyXG4gICAgfVxyXG4gIH0sIFthY3RpdmlkYWRJZCwgY2FuRWRpdEhpc3RvcnksIHJlY0lkLCBzZXRJc0VkaXRpbmddKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIHN5bmNFZGl0TW9kZU9uRW50cnkoKTtcclxuICB9LCBbc3luY0VkaXRNb2RlT25FbnRyeV0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3Qgb25QYWdlU2hvdyA9IChldmVudDogUGFnZVRyYW5zaXRpb25FdmVudCkgPT4ge1xyXG4gICAgICBjb25zdCBuYXZFbnRyeSA9IHR5cGVvZiBwZXJmb3JtYW5jZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBwZXJmb3JtYW5jZS5nZXRFbnRyaWVzQnlUeXBlXHJcbiAgICAgICAgPyAocGVyZm9ybWFuY2UuZ2V0RW50cmllc0J5VHlwZShcIm5hdmlnYXRpb25cIilbMF0gYXMgUGVyZm9ybWFuY2VOYXZpZ2F0aW9uVGltaW5nIHwgdW5kZWZpbmVkKVxyXG4gICAgICAgIDogdW5kZWZpbmVkO1xyXG4gICAgICBjb25zdCBpc0JhY2tGb3J3YXJkID0gbmF2RW50cnk/LnR5cGUgPT09IFwiYmFja19mb3J3YXJkXCI7XHJcbiAgICAgIGlmIChldmVudD8ucGVyc2lzdGVkIHx8IGlzQmFja0ZvcndhcmQpIHtcclxuICAgICAgICBzeW5jRWRpdE1vZGVPbkVudHJ5KCk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwYWdlc2hvd1wiLCBvblBhZ2VTaG93KTtcclxuICAgIHJldHVybiAoKSA9PiB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInBhZ2VzaG93XCIsIG9uUGFnZVNob3cpO1xyXG4gIH0sIFtzeW5jRWRpdE1vZGVPbkVudHJ5XSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBrZXkgPSBgaW5kX3Zpc2l0X2RyYWZ0XyR7YWN0aXZpZGFkSWQgfHwgcmVjSWQgfHwgXCJkZWZhdWx0XCJ9YDtcclxuICAgIGRyYWZ0S2V5UmVmLmN1cnJlbnQgPSBrZXk7XHJcbiAgfSwgW2FjdGl2aWRhZElkLCByZWNJZF0pO1xyXG5cclxuICBjb25zdCBzYXZlRHJhZnQgPSB1c2VDYWxsYmFjaygoZHJhZnQ6IERldGFpbERyYWZ0VmFsdWVzKSA9PiB7XHJcbiAgICBjb25zdCBrZXkgPSBkcmFmdEtleVJlZi5jdXJyZW50O1xyXG4gICAgaWYgKCFrZXkpIHJldHVybjtcclxuICAgIHNldFNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoa2V5LCBKU09OLnN0cmluZ2lmeShkcmFmdCksIERFVEFJTF9EUkFGVF9UVExfTVMpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgY2xlYXJEcmFmdCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGNvbnN0IGtleSA9IGRyYWZ0S2V5UmVmLmN1cnJlbnQ7XHJcbiAgICBpZiAoIWtleSkgcmV0dXJuO1xyXG4gICAgcmVtb3ZlU2Vzc2lvblZhbHVlV2l0aEV4cGlyeShrZXkpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgYXBwbHlEcmFmdFZhbHVlcyA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGNvbnN0IGtleSA9IGRyYWZ0S2V5UmVmLmN1cnJlbnQ7XHJcbiAgICBpZiAoIWtleSkgcmV0dXJuO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHJhdyA9IGdldFNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoa2V5KTtcclxuICAgICAgaWYgKCFyYXcpIHJldHVybjtcclxuICAgICAgY29uc3QgZHJhZnQgPSBKU09OLnBhcnNlKHJhdykgYXMgUGFydGlhbDxEZXRhaWxEcmFmdFZhbHVlcz47XHJcbiAgICAgIGlmICghZHJhZnQgfHwgdHlwZW9mIGRyYWZ0ICE9PSBcIm9iamVjdFwiKSByZXR1cm47XHJcblxyXG4gICAgICBpZiAoZHJhZnQudHJhbnNEYXRlICE9PSB1bmRlZmluZWQpIHNldFRyYW5zRGF0ZShTdHJpbmcoZHJhZnQudHJhbnNEYXRlKSk7XG4gICAgICBpZiAoZHJhZnQudmlzaXRUeXBlICE9PSB1bmRlZmluZWQpIHNldFZpc2l0VHlwZShTdHJpbmcoZHJhZnQudmlzaXRUeXBlKSk7XG4gICAgICBpZiAoZHJhZnQuY29udGFjdE1ldGhvZCAhPT0gdW5kZWZpbmVkKSBzZXRDb250YWN0TWV0aG9kKFN0cmluZyhkcmFmdC5jb250YWN0TWV0aG9kKSk7XG4gICAgICBpZiAoZHJhZnQuYXNpc3RlbnRlVGlwbyAhPT0gdW5kZWZpbmVkKSBzZXRBc2lzdGVudGVUaXBvKFN0cmluZyhkcmFmdC5hc2lzdGVudGVUaXBvKSk7XG4gICAgICBpZiAoZHJhZnQuZGVzY3JpcHRpb24gIT09IHVuZGVmaW5lZCkgc2V0RGVzY3JpcHRpb24oU3RyaW5nKGRyYWZ0LmRlc2NyaXB0aW9uKSk7XHJcbiAgICAgIGlmIChkcmFmdC5jb21lbnRhcmlvcyAhPT0gdW5kZWZpbmVkKSBzZXRDb21lbnRhcmlvcyhTdHJpbmcoZHJhZnQuY29tZW50YXJpb3MpKTtcclxuICAgICAgaWYgKGRyYWZ0LmFudGVjZWRlbnRlcyAhPT0gdW5kZWZpbmVkKSBzZXRBbnRlY2VkZW50ZXMoU3RyaW5nKGRyYWZ0LmFudGVjZWRlbnRlcykpO1xyXG4gICAgICBpZiAoZHJhZnQuY29uY2x1c2lvbmVzICE9PSB1bmRlZmluZWQpIHNldENvbmNsdXNpb25lcyhTdHJpbmcoZHJhZnQuY29uY2x1c2lvbmVzKSk7XHJcbiAgICB9IGNhdGNoIHtcclxuICAgICAgLyogaWdub3JlICovXHJcbiAgICB9XHJcbiAgfSwgW3NldEFudGVjZWRlbnRlcywgc2V0QXNpc3RlbnRlVGlwbywgc2V0Q29tZW50YXJpb3MsIHNldENvbmNsdXNpb25lcywgc2V0Q29udGFjdE1ldGhvZCwgc2V0RGVzY3JpcHRpb24sIHNldFRyYW5zRGF0ZSwgc2V0VmlzaXRUeXBlXSk7XG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFpc0VkaXRpbmcpIHtcclxuICAgICAgaWYgKGRyYWZ0UGVyc2lzdFRpbWVyUmVmLmN1cnJlbnQpIHtcclxuICAgICAgICBjbGVhclRpbWVvdXQoZHJhZnRQZXJzaXN0VGltZXJSZWYuY3VycmVudCk7XHJcbiAgICAgICAgZHJhZnRQZXJzaXN0VGltZXJSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChkcmFmdFBlcnNpc3RUaW1lclJlZi5jdXJyZW50KSB7XHJcbiAgICAgIGNsZWFyVGltZW91dChkcmFmdFBlcnNpc3RUaW1lclJlZi5jdXJyZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBkcmFmdFBlcnNpc3RUaW1lclJlZi5jdXJyZW50ID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBkcmFmdFBlcnNpc3RUaW1lclJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgc2F2ZURyYWZ0KHtcclxuICAgICAgICB0cmFuc0RhdGUsXG4gICAgICAgIHZpc2l0VHlwZSxcbiAgICAgICAgY29udGFjdE1ldGhvZCxcbiAgICAgICAgYXNpc3RlbnRlVGlwbyxcbiAgICAgICAgZGVzY3JpcHRpb24sXHJcbiAgICAgICAgY29tZW50YXJpb3MsXHJcbiAgICAgICAgYW50ZWNlZGVudGVzLFxyXG4gICAgICAgIGNvbmNsdXNpb25lcyxcclxuICAgICAgfSk7XHJcbiAgICB9LCAxODApO1xyXG5cclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIGlmIChkcmFmdFBlcnNpc3RUaW1lclJlZi5jdXJyZW50KSB7XHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KGRyYWZ0UGVyc2lzdFRpbWVyUmVmLmN1cnJlbnQpO1xyXG4gICAgICAgIGRyYWZ0UGVyc2lzdFRpbWVyUmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH0sIFthbnRlY2VkZW50ZXMsIGFzaXN0ZW50ZVRpcG8sIGNvbWVudGFyaW9zLCBjb25jbHVzaW9uZXMsIGNvbnRhY3RNZXRob2QsIGRlc2NyaXB0aW9uLCBpc0VkaXRpbmcsIHNhdmVEcmFmdCwgdHJhbnNEYXRlLCB2aXNpdFR5cGVdKTtcblxyXG4gIHJldHVybiB7XHJcbiAgICBlZGl0TW9kZUtleVJlZixcclxuICAgIHN5bmNFZGl0TW9kZUZsYWcsXHJcbiAgICBjbGVhckRyYWZ0LFxyXG4gICAgYXBwbHlEcmFmdFZhbHVlcyxcclxuICB9O1xyXG59O1xyXG4iLCAiXHVGRUZGaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IGZldGNoSnNvbiB9IGZyb20gXCIuLi8uLi8uLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgeyBzaG93UGVybWlzc2lvbk1vZGFsIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3Blcm1pc3Npb25zLnRzXCI7XHJcbmltcG9ydCB7IGZsYXNoQWN0aW9uTWFyayB9IGZyb20gXCIuLi8uLi8uLi91dGlscy92aXNpdGFzSGlzdG9yeS50c1wiO1xyXG5cclxudHlwZSBPcHRpb25MaWtlID0ge1xyXG4gIHZhbHVlPzogc3RyaW5nIHwgbnVtYmVyO1xyXG4gIFZhbHVlPzogc3RyaW5nIHwgbnVtYmVyO1xyXG4gIHRleHQ/OiBzdHJpbmc7XHJcbiAgVGV4dD86IHN0cmluZztcclxufTtcclxuXHJcbnR5cGUgVmlzaXRDb21tYW5kUmVzcG9uc2UgPSB7XHJcbiAgc3VjY2Vzcz86IGJvb2xlYW47XHJcbiAgbWVzc2FnZT86IHN0cmluZztcclxuICBTdWNjZXNzPzogYm9vbGVhbjtcclxuICBNZXNzYWdlPzogc3RyaW5nO1xyXG59O1xyXG5cclxuY29uc3QgaXNDb21tYW5kU3VjY2VzcyA9IChyZXNwb25zZTogVmlzaXRDb21tYW5kUmVzcG9uc2UpOiBib29sZWFuID0+IHtcclxuICByZXR1cm4gcmVzcG9uc2Uuc3VjY2VzcyA9PT0gdHJ1ZSB8fCByZXNwb25zZS5TdWNjZXNzID09PSB0cnVlO1xyXG59O1xyXG5cclxuY29uc3QgZ2V0Q29tbWFuZE1lc3NhZ2UgPSAocmVzcG9uc2U6IFZpc2l0Q29tbWFuZFJlc3BvbnNlKTogc3RyaW5nID0+IHtcclxuICBjb25zdCByYXcgPSByZXNwb25zZS5tZXNzYWdlID8/IHJlc3BvbnNlLk1lc3NhZ2U7XHJcbiAgcmV0dXJuIHR5cGVvZiByYXcgPT09IFwic3RyaW5nXCIgPyByYXcudHJpbSgpIDogXCJcIjtcclxufTtcclxuXHJcbi8vIEtlZXAgcmVjSWQgYXMgYSBub3JtYWxpemVkIHNpZ25lZCBpbnRlZ2VyIHN0cmluZyB0byBhdm9pZCBsb25nIHByZWNpc2lvbiBsb3NzIGluIEpTIG51bWJlcnMuXHJcbmNvbnN0IHJlc29sdmVTYWZlUmVjSWQgPSAocmF3UmVjSWQ6IHN0cmluZyk6IHN0cmluZyB8IG51bGwgPT4ge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSBTdHJpbmcocmF3UmVjSWQgPz8gXCJcIikudHJpbSgpO1xyXG4gIGlmICghbm9ybWFsaXplZCkgcmV0dXJuIG51bGw7XHJcblxyXG4gIGlmICghL14tP1xcZCskLy50ZXN0KG5vcm1hbGl6ZWQpKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgY29uc3QgYWJzb2x1dGVEaWdpdHMgPSBub3JtYWxpemVkLnN0YXJ0c1dpdGgoXCItXCIpID8gbm9ybWFsaXplZC5zbGljZSgxKSA6IG5vcm1hbGl6ZWQ7XHJcbiAgaWYgKCFhYnNvbHV0ZURpZ2l0cyB8fCAvXjArJC8udGVzdChhYnNvbHV0ZURpZ2l0cykpIHJldHVybiBudWxsO1xyXG5cclxuICByZXR1cm4gbm9ybWFsaXplZDtcclxufTtcclxuXHJcbmNvbnN0IHNob3VsZExvZ1JlY0lkSW5EZXYgPSAoKTogYm9vbGVhbiA9PiB7XHJcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIgfHwgIXdpbmRvdy5sb2NhdGlvbikgcmV0dXJuIGZhbHNlO1xyXG4gIGNvbnN0IGhvc3QgPSBTdHJpbmcod2luZG93LmxvY2F0aW9uLmhvc3RuYW1lIHx8IFwiXCIpLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xyXG4gIHJldHVybiBob3N0ID09PSBcImxvY2FsaG9zdFwiIHx8IGhvc3QgPT09IFwiMTI3LjAuMC4xXCIgfHwgaG9zdC5lbmRzV2l0aChcIi5sb2NhbFwiKTtcclxufTtcclxuXHJcbmNvbnN0IGxvZ1NhZmVSZWNJZEluRGV2ID0gKG9wZXJhdGlvbjogXCJ1cGRhdGVcIiB8IFwiZGVsZXRlXCIsIHNhZmVSZWNJZDogc3RyaW5nKTogdm9pZCA9PiB7XHJcbiAgaWYgKCFzaG91bGRMb2dSZWNJZEluRGV2KCkpIHJldHVybjtcclxuICBjb25zb2xlLmluZm8oYFt2aXNpdGFzLWRldGFpbF0gJHtvcGVyYXRpb259IHJlY0lkYCwgc2FmZVJlY0lkKTtcclxufTtcclxuXHJcbnR5cGUgVXNlRGV0YWlsTXV0YXRpb25zQXJncyA9IHtcclxuICBidXN5OiBib29sZWFuO1xyXG4gIGlzRWRpdGluZzogYm9vbGVhbjtcclxuICBjYW5FZGl0SGlzdG9yeTogYm9vbGVhbjtcclxuICBjYW5EZWxldGVIaXN0b3J5OiBib29sZWFuO1xyXG4gIHJlY0lkOiBzdHJpbmc7XHJcbiAgYWNjb3VudE51bTogc3RyaW5nO1xyXG4gIHRyYW5zRGF0ZTogc3RyaW5nO1xyXG4gIHZpc2l0VHlwZTogc3RyaW5nO1xyXG4gIGNvbnRhY3RNZXRob2Q6IHN0cmluZztcclxuICBhc2lzdGVudGVUaXBvOiBzdHJpbmc7XHJcbiAgZGVzY3JpcHRpb246IHN0cmluZztcclxuICBjb21lbnRhcmlvczogc3RyaW5nO1xyXG4gIGFudGVjZWRlbnRlczogc3RyaW5nO1xyXG4gIGNvbmNsdXNpb25lczogc3RyaW5nO1xyXG4gIHZpc2l0VHlwZXM6IE9wdGlvbkxpa2VbXTtcclxuICBjb250YWN0TWV0aG9kczogT3B0aW9uTGlrZVtdO1xyXG4gIGFzaXN0ZW50ZVRpcG9zOiBPcHRpb25MaWtlW107XHJcbiAgZGVmYXVsdFZpc2l0VHlwZTogc3RyaW5nO1xyXG4gIHJhd0luaXRpYWxWaXNpdFR5cGU6IHN0cmluZztcclxuICByYXdJbml0aWFsQ29udGFjdE1ldGhvZDogc3RyaW5nO1xyXG4gIHJhd0luaXRpYWxBc2lzdGVudGU6IHN0cmluZztcclxuICBtYXRjaE9wdGlvblZhbHVlOiAob3B0aW9uczogT3B0aW9uTGlrZVtdLCByYXc6IHVua25vd24pID0+IHN0cmluZztcclxuICBjbGVhckRyYWZ0OiAoKSA9PiB2b2lkO1xyXG4gIHN5bmNFZGl0TW9kZUZsYWc6IChlbmFibGVkOiBib29sZWFuKSA9PiB2b2lkO1xyXG4gIHNldE1vZGFsRXJyb3I6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPHN0cmluZz4+O1xyXG4gIHNldEJ1c3k6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPGJvb2xlYW4+PjtcclxuICBzZXRTdGF0dXM6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPHN0cmluZz4+O1xyXG4gIHNldElzRWRpdGluZzogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248Ym9vbGVhbj4+O1xyXG59O1xyXG5cclxuLy8gRW5jYXBzdWxhdGVzIHVwZGF0ZSBhbmQgZGVsZXRlIG11dGF0aW9ucyBmb3IgZGV0YWlsIGZvcm0gc3RhdGUuXHJcbmV4cG9ydCBjb25zdCB1c2VEZXRhaWxNdXRhdGlvbnMgPSAoe1xyXG4gIGJ1c3ksXHJcbiAgaXNFZGl0aW5nLFxyXG4gIGNhbkVkaXRIaXN0b3J5LFxyXG4gIGNhbkRlbGV0ZUhpc3RvcnksXHJcbiAgcmVjSWQsXHJcbiAgYWNjb3VudE51bSxcclxuICB0cmFuc0RhdGUsXHJcbiAgdmlzaXRUeXBlLFxyXG4gIGNvbnRhY3RNZXRob2QsXHJcbiAgYXNpc3RlbnRlVGlwbyxcclxuICBkZXNjcmlwdGlvbixcclxuICBjb21lbnRhcmlvcyxcclxuICBhbnRlY2VkZW50ZXMsXHJcbiAgY29uY2x1c2lvbmVzLFxyXG4gIHZpc2l0VHlwZXMsXHJcbiAgY29udGFjdE1ldGhvZHMsXHJcbiAgYXNpc3RlbnRlVGlwb3MsXHJcbiAgZGVmYXVsdFZpc2l0VHlwZSxcclxuICByYXdJbml0aWFsVmlzaXRUeXBlLFxyXG4gIHJhd0luaXRpYWxDb250YWN0TWV0aG9kLFxyXG4gIHJhd0luaXRpYWxBc2lzdGVudGUsXHJcbiAgbWF0Y2hPcHRpb25WYWx1ZSxcclxuICBjbGVhckRyYWZ0LFxyXG4gIHN5bmNFZGl0TW9kZUZsYWcsXHJcbiAgc2V0TW9kYWxFcnJvcixcclxuICBzZXRCdXN5LFxyXG4gIHNldFN0YXR1cyxcclxuICBzZXRJc0VkaXRpbmcsXHJcbn06IFVzZURldGFpbE11dGF0aW9uc0FyZ3MpID0+IHtcclxuICBjb25zdCBoYW5kbGVVcGRhdGUgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XHJcbiAgICBpZiAoYnVzeSB8fCAhaXNFZGl0aW5nKSByZXR1cm4gZmFsc2U7XHJcbiAgICBpZiAoIWNhbkVkaXRIaXN0b3J5KSB7XHJcbiAgICAgIHNob3dQZXJtaXNzaW9uTW9kYWwoKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHNhZmVSZWNJZFZhbHVlID0gcmVzb2x2ZVNhZmVSZWNJZChyZWNJZCk7XHJcbiAgICBpZiAoc2FmZVJlY0lkVmFsdWUgPT09IG51bGwpIHtcclxuICAgICAgY29uc3QgbWVzc2FnZSA9IGluZFQoXCJWaXNpdHNfRGV0YWlsX0ludmFsaWRSZWNJZFwiLCBcIkNvdWxkIG5vdCByZXNvbHZlIGFjdGl2aXR5IGlkZW50aWZpZXIuIFJlbG9hZCBhbmQgdHJ5IGFnYWluLlwiKTtcclxuICAgICAgc2V0TW9kYWxFcnJvcihtZXNzYWdlKTtcclxuICAgICAgc2V0U3RhdHVzKG1lc3NhZ2UpO1xyXG4gICAgICBmbGFzaEFjdGlvbk1hcmsoXCJlcnJvclByb2Nlc3NcIiwgMTUwMCk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xyXG4gICAgc2V0QnVzeSh0cnVlKTtcclxuICAgIHNldFN0YXR1cyhpbmRUKFwiVmlzaXRzX0RldGFpbF9VcGRhdGluZ1wiLCBcIlVwZGF0aW5nIGFjdGl2aXR5Li4uXCIpKTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBub3JtYWxpemVkVmlzaXRUeXBlID1cclxuICAgICAgICBtYXRjaE9wdGlvblZhbHVlKHZpc2l0VHlwZXMsIHZpc2l0VHlwZSkgfHxcclxuICAgICAgICBtYXRjaE9wdGlvblZhbHVlKHZpc2l0VHlwZXMsIHJhd0luaXRpYWxWaXNpdFR5cGUpIHx8XHJcbiAgICAgICAgZGVmYXVsdFZpc2l0VHlwZTtcclxuICAgICAgY29uc3Qgbm9ybWFsaXplZEFzaXN0ZW50ZVRpcG8gPVxyXG4gICAgICAgIG1hdGNoT3B0aW9uVmFsdWUoYXNpc3RlbnRlVGlwb3MsIGFzaXN0ZW50ZVRpcG8pIHx8XHJcbiAgICAgICAgbWF0Y2hPcHRpb25WYWx1ZShhc2lzdGVudGVUaXBvcywgcmF3SW5pdGlhbEFzaXN0ZW50ZSkgfHxcclxuICAgICAgICByYXdJbml0aWFsQXNpc3RlbnRlO1xyXG4gICAgICBjb25zdCBub3JtYWxpemVkQ29udGFjdE1ldGhvZCA9XHJcbiAgICAgICAgbWF0Y2hPcHRpb25WYWx1ZShjb250YWN0TWV0aG9kcywgY29udGFjdE1ldGhvZCkgfHxcclxuICAgICAgICBtYXRjaE9wdGlvblZhbHVlKGNvbnRhY3RNZXRob2RzLCByYXdJbml0aWFsQ29udGFjdE1ldGhvZCk7XHJcbiAgICAgIGNvbnN0IGNvbnRhY3RNZXRob2RWYWx1ZSA9IE51bWJlcihub3JtYWxpemVkQ29udGFjdE1ldGhvZCk7XHJcblxyXG4gICAgICBjb25zdCBwYXlsb2FkID0ge1xyXG4gICAgICAgIGFjY291bnROdW0sXHJcbiAgICAgICAgdmlzaXRUeXBlOiBub3JtYWxpemVkVmlzaXRUeXBlLFxyXG4gICAgICAgIGNvbnRhY3RNZXRob2Q6IE51bWJlci5pc0Zpbml0ZShjb250YWN0TWV0aG9kVmFsdWUpID8gY29udGFjdE1ldGhvZFZhbHVlIDogbnVsbCxcclxuICAgICAgICBhc2lzdGVudGVUaXBvOiBub3JtYWxpemVkQXNpc3RlbnRlVGlwbyxcclxuICAgICAgICBkZXNjcmlwdGlvbixcclxuICAgICAgICB0cmFuc0RhdGUsXHJcbiAgICAgICAgY29tZW50YXJpb3MsXHJcbiAgICAgICAgYW50ZWNlZGVudGVzLFxyXG4gICAgICAgIGNvbmNsdXNpb25lcyxcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGxvZ1NhZmVSZWNJZEluRGV2KFwidXBkYXRlXCIsIHNhZmVSZWNJZFZhbHVlKTtcclxuICAgICAgY29uc3Qgc2FmZVJlY0lkID0gZW5jb2RlVVJJQ29tcG9uZW50KHNhZmVSZWNJZFZhbHVlKTtcclxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248VmlzaXRDb21tYW5kUmVzcG9uc2U+KGAvVmlzaXRhcy9VcGRhdGVBY3Rpdml0eS8ke3NhZmVSZWNJZH1gLCB7XHJcbiAgICAgICAgbWV0aG9kOiBcIlBVVFwiLFxyXG4gICAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcclxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXlsb2FkKSxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpZiAoIWlzQ29tbWFuZFN1Y2Nlc3MocmVzcG9uc2UpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGdldENvbW1hbmRNZXNzYWdlKHJlc3BvbnNlKSB8fCBpbmRUKFwiVmlzaXRzX0RldGFpbF9VcGRhdGVGYWlsZWRcIiwgXCJVcGRhdGUgZmFpbGVkLlwiKSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNldFN0YXR1cyhpbmRUKFwiVmlzaXRzX0RldGFpbF9VcGRhdGVkXCIsIFwiQWN0aXZpdHkgdXBkYXRlZFwiKSk7XHJcbiAgICAgIHNldElzRWRpdGluZyhmYWxzZSk7XHJcbiAgICAgIHN5bmNFZGl0TW9kZUZsYWcoZmFsc2UpO1xyXG4gICAgICBjbGVhckRyYWZ0KCk7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc3QgbWVzc2FnZSA9IGVycm9yIGluc3RhbmNlb2YgRXJyb3IgJiYgZXJyb3IubWVzc2FnZVxyXG4gICAgICAgID8gZXJyb3IubWVzc2FnZVxyXG4gICAgICAgIDogaW5kVChcIlZpc2l0c19EZXRhaWxfVXBkYXRlRXJyb3JcIiwgXCJVcGRhdGUgZXJyb3IuXCIpO1xyXG4gICAgICBzZXRNb2RhbEVycm9yKG1lc3NhZ2UpO1xyXG4gICAgICBzZXRTdGF0dXMobWVzc2FnZSk7XHJcbiAgICAgIGZsYXNoQWN0aW9uTWFyayhcImVycm9yUHJvY2Vzc1wiLCAxNTAwKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSBmaW5hbGx5IHtcclxuICAgICAgc2V0QnVzeShmYWxzZSk7XHJcbiAgICB9XHJcbiAgfSwgW1xyXG4gICAgYWNjb3VudE51bSxcclxuICAgIGFudGVjZWRlbnRlcyxcclxuICAgIGFzaXN0ZW50ZVRpcG8sXHJcbiAgICBhc2lzdGVudGVUaXBvcyxcclxuICAgIGJ1c3ksXHJcbiAgICBjYW5FZGl0SGlzdG9yeSxcclxuICAgIGNsZWFyRHJhZnQsXHJcbiAgICBjb21lbnRhcmlvcyxcclxuICAgIGNvbmNsdXNpb25lcyxcclxuICAgIGNvbnRhY3RNZXRob2QsXHJcbiAgICBjb250YWN0TWV0aG9kcyxcclxuICAgIGRlZmF1bHRWaXNpdFR5cGUsXHJcbiAgICBkZXNjcmlwdGlvbixcclxuICAgIGlzRWRpdGluZyxcclxuICAgIG1hdGNoT3B0aW9uVmFsdWUsXHJcbiAgICByYXdJbml0aWFsQXNpc3RlbnRlLFxyXG4gICAgcmF3SW5pdGlhbENvbnRhY3RNZXRob2QsXHJcbiAgICByYXdJbml0aWFsVmlzaXRUeXBlLFxyXG4gICAgcmVjSWQsXHJcbiAgICBzZXRCdXN5LFxyXG4gICAgc2V0SXNFZGl0aW5nLFxyXG4gICAgc2V0TW9kYWxFcnJvcixcclxuICAgIHNldFN0YXR1cyxcclxuICAgIHN5bmNFZGl0TW9kZUZsYWcsXHJcbiAgICB0cmFuc0RhdGUsXHJcbiAgICB2aXNpdFR5cGUsXHJcbiAgICB2aXNpdFR5cGVzLFxyXG4gIF0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVEZWxldGUgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XHJcbiAgICBpZiAoYnVzeSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgaWYgKCFjYW5EZWxldGVIaXN0b3J5KSB7XHJcbiAgICAgIHNob3dQZXJtaXNzaW9uTW9kYWwoKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHNhZmVSZWNJZFZhbHVlID0gcmVzb2x2ZVNhZmVSZWNJZChyZWNJZCk7XHJcbiAgICBpZiAoc2FmZVJlY0lkVmFsdWUgPT09IG51bGwpIHtcclxuICAgICAgY29uc3QgbWVzc2FnZSA9IGluZFQoXCJWaXNpdHNfRGV0YWlsX0ludmFsaWRSZWNJZFwiLCBcIkNvdWxkIG5vdCByZXNvbHZlIGFjdGl2aXR5IGlkZW50aWZpZXIuIFJlbG9hZCBhbmQgdHJ5IGFnYWluLlwiKTtcclxuICAgICAgc2V0TW9kYWxFcnJvcihtZXNzYWdlKTtcclxuICAgICAgc2V0U3RhdHVzKG1lc3NhZ2UpO1xyXG4gICAgICBmbGFzaEFjdGlvbk1hcmsoXCJlcnJvclByb2Nlc3NcIiwgMTUwMCk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xyXG4gICAgc2V0QnVzeSh0cnVlKTtcclxuICAgIHNldFN0YXR1cyhpbmRUKFwiVmlzaXRzX0RldGFpbF9EZWxldGluZ1wiLCBcIkRlbGV0aW5nIGFjdGl2aXR5Li4uXCIpKTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBsb2dTYWZlUmVjSWRJbkRldihcImRlbGV0ZVwiLCBzYWZlUmVjSWRWYWx1ZSk7XHJcbiAgICAgIGNvbnN0IHNhZmVSZWNJZCA9IGVuY29kZVVSSUNvbXBvbmVudChzYWZlUmVjSWRWYWx1ZSk7XHJcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPFZpc2l0Q29tbWFuZFJlc3BvbnNlPihgL1Zpc2l0YXMvRGVsZXRlQWN0aXZpdHkvJHtzYWZlUmVjSWR9YCwgeyBtZXRob2Q6IFwiREVMRVRFXCIgfSk7XHJcbiAgICAgIGlmICghaXNDb21tYW5kU3VjY2VzcyhyZXNwb25zZSkpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZ2V0Q29tbWFuZE1lc3NhZ2UocmVzcG9uc2UpIHx8IGluZFQoXCJWaXNpdHNfRGV0YWlsX0RlbGV0ZUZhaWxlZFwiLCBcIkRlbGV0ZSBmYWlsZWQuXCIpKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2V0U3RhdHVzKGluZFQoXCJWaXNpdHNfRGV0YWlsX0RlbGV0ZWRcIiwgXCJBY3Rpdml0eSBkZWxldGVkXCIpKTtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zdCBtZXNzYWdlID0gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciAmJiBlcnJvci5tZXNzYWdlXHJcbiAgICAgICAgPyBlcnJvci5tZXNzYWdlXHJcbiAgICAgICAgOiBpbmRUKFwiVmlzaXRzX0RldGFpbF9EZWxldGVFcnJvclwiLCBcIkRlbGV0ZSBlcnJvci5cIik7XHJcbiAgICAgIHNldE1vZGFsRXJyb3IobWVzc2FnZSk7XHJcbiAgICAgIHNldFN0YXR1cyhtZXNzYWdlKTtcclxuICAgICAgZmxhc2hBY3Rpb25NYXJrKFwiZXJyb3JQcm9jZXNzXCIsIDE1MDApO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9IGZpbmFsbHkge1xyXG4gICAgICBzZXRCdXN5KGZhbHNlKTtcclxuICAgIH1cclxuICB9LCBbYnVzeSwgY2FuRGVsZXRlSGlzdG9yeSwgcmVjSWQsIHNldEJ1c3ksIHNldE1vZGFsRXJyb3IsIHNldFN0YXR1c10pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgaGFuZGxlVXBkYXRlLFxyXG4gICAgaGFuZGxlRGVsZXRlLFxyXG4gIH07XHJcbn07XHJcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5cbnR5cGUgUHJvcHMgPSB7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIHZhbHVlOiBzdHJpbmc7XG59O1xuXG4vLyBSZWFkLW9ubHkgb3duZXIgZmllbGQgc2hvd24gb25seSB3aGVuIHZpc2liaWxpdHkgY29uZmlybXMgYSBtYW5hZ2VyIGNvbnRleHQuXG5jb25zdCBEZXRhaWxPd25lckZpZWxkID0gKHsgbGFiZWwsIHZhbHVlIH06IFByb3BzKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJ2aXNpdGEtZmllbGQtdGV4dFwiPlxuICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZFwiIGh0bWxGb3I9XCJ2aXNpdC1kZXRhaWwtb3duZXJcIj5cbiAgICAgICAge2xhYmVsfVxuICAgICAgPC9sYWJlbD5cbiAgICAgIDxpbnB1dFxuICAgICAgICBpZD1cInZpc2l0LWRldGFpbC1vd25lclwiXG4gICAgICAgIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbCBpbmQtcmVhZG9ubHktZmllbGQgY3Vyc29yLWRlZmF1bHRcIlxuICAgICAgICB2YWx1ZT17dmFsdWV9XG4gICAgICAgIHJlYWRPbmx5XG4gICAgICAgIGFyaWEtcmVhZG9ubHk9XCJ0cnVlXCJcbiAgICAgIC8+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBEZXRhaWxPd25lckZpZWxkO1xuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IERldGFpbEZvcm0gZnJvbSBcIi4vRGV0YWlsRm9ybS50c3hcIjtcclxuaW1wb3J0IFZpc2l0YXNQYWdlUHJvdmlkZXJzIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvVmlzaXRhc1BhZ2VQcm92aWRlcnMudHN4XCI7XG5pbXBvcnQgeyBtb3VudFJlYWN0SXNsYW5kLCBtb3VudFdoZW5Eb2N1bWVudFJlYWR5IH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3JlYWN0SXNsYW5kLnRzeFwiO1xuXG50eXBlIFByb3BzID0ge1xuICBjb21wYW55SWQ/OiBzdHJpbmc7XG4gIGF4VXNlcklkPzogc3RyaW5nO1xuICBwZXJtaXNzaW9uc1JldmlzaW9uPzogc3RyaW5nO1xufTtcblxuLy8gUGFnZSBlbnRyeSBmb3IgdGhlIHZpc2l0YXMgZGV0YWlsIGlzbGFuZC5cbmNvbnN0IERldGFpbFBhZ2UgPSAoeyBjb21wYW55SWQgPSBcIlwiLCBheFVzZXJJZCA9IFwiXCIsIHBlcm1pc3Npb25zUmV2aXNpb24gPSBcIlwiIH06IFByb3BzKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPFZpc2l0YXNQYWdlUHJvdmlkZXJzPlxuICAgICAgPERldGFpbEZvcm0gY29tcGFueUlkPXtjb21wYW55SWR9IGF4VXNlcklkPXtheFVzZXJJZH0gcGVybWlzc2lvbnNSZXZpc2lvbj17cGVybWlzc2lvbnNSZXZpc2lvbn0gLz5cbiAgICA8L1Zpc2l0YXNQYWdlUHJvdmlkZXJzPlxuICApO1xufTtcblxyXG5jb25zdCBtb3VudCA9ICgpID0+IHtcclxuICBjb25zdCByb290RWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpc2l0YS1kZXRhaWwtcm9vdFwiKTtcbiAgaWYgKCFyb290RWwpIHJldHVybjtcbiAgY29uc3QgY29tcGFueUlkID0gcm9vdEVsLmdldEF0dHJpYnV0ZShcImRhdGEtY29tcGFueS1pZFwiKSB8fCBcIlwiO1xuICBjb25zdCBheFVzZXJJZCA9IHJvb3RFbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWF4LXVzZXItaWRcIikgfHwgXCJcIjtcbiAgY29uc3QgcGVybWlzc2lvbnNSZXZpc2lvbiA9IHJvb3RFbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXBlcm1pc3Npb25zLXJldmlzaW9uXCIpIHx8IFwiXCI7XG5cbiAgbW91bnRSZWFjdElzbGFuZChcbiAgICByb290RWwsXG4gICAgPERldGFpbFBhZ2UgY29tcGFueUlkPXtjb21wYW55SWR9IGF4VXNlcklkPXtheFVzZXJJZH0gcGVybWlzc2lvbnNSZXZpc2lvbj17cGVybWlzc2lvbnNSZXZpc2lvbn0gLz5cbiAgKTtcbn07XG5cclxubW91bnRXaGVuRG9jdW1lbnRSZWFkeShtb3VudCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBEZXRhaWxQYWdlO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFBQSxnQkFBeUU7OztBQ0FsRSxJQUFNLG9CQUFvQixDQUFDLE9BQTJCO0FBQzNELE1BQUksQ0FBQyxHQUFJLFFBQU8sTUFBTTtBQUFBLEVBQUM7QUFDdkIsUUFBTSxTQUFTLENBQUMsVUFBaUIsTUFBTSxlQUFlO0FBQ3RELFFBQU0sU0FBUyxDQUFDLGVBQWUsZUFBZSxRQUFRLE9BQU8sT0FBTztBQUNwRSxTQUFPLFFBQVEsQ0FBQyxRQUFRLEdBQUcsaUJBQWlCLEtBQUssTUFBTSxDQUFDO0FBQ3hELFNBQU8sTUFBTTtBQUNYLFdBQU8sUUFB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QUFJLFdBQVcsSUFBSSxzQkFBc0IsR0FBRyxNQUFhO0FBQ3pGLFNBQ0UsNkNBQUMsZ0NBQ0MsdURBQUMsY0FBVyxXQUFzQixVQUFvQixxQkFBMEMsR0FDbEc7QUFFSjtBQUVBLElBQU0sUUFBUSxNQUFNO0FBQ2xCLFFBQU0sU0FBUyxTQUFTLGVBQWUsb0JBQW9CO0FBQzNELE1BQUksQ0FBQyxPQUFRO0FBQ2IsUUFBTSxZQUFZLE9BQU8sYUFBYSxpQkFBaUIsS0FBSztBQUM1RCxRQUFNLFdBQVcsT0FBTyxhQUFhLGlCQUFpQixLQUFLO0FBQzNELFFBQU0sc0JBQXNCLE9BQU8sYUFBYSwyQkFBMkIsS0FBSztBQUVoRjtBQUFBLElBQ0U7QUFBQSxJQUNBLDZDQUFDLGNBQVcsV0FBc0IsVUFBb0IscUJBQTBDO0FBQUEsRUFDbEc7QUFDRjtBQUVBLHVCQUF1QixLQUFLO0FBRTVCLElBQU8scUJBQVE7IiwKICAibmFtZXMiOiBbImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X2pzeF9ydW50aW1lIl0KfQo=
