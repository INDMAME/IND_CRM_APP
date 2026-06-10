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
} from "./chunks/chunk-6O3W47V5.js";
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
} from "./chunks/chunk-FZJKOUY3.js";
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvZGV0YWlsL0RldGFpbEZvcm0udHN4IiwgIi4uL3JlYWN0L3NyYy91dGlscy9kb21HdWFyZHMudHMiLCAiLi4vcmVhY3Qvc3JjL3V0aWxzL3N0cmluZ3MudHMiLCAiLi4vcmVhY3Qvc3JjL2hvb2tzL3VzZURldGFpbEh5ZHJhdGlvbi50cyIsICIuLi9yZWFjdC9zcmMvaG9va3MvdXNlRGV0YWlsVG9wYmFyQWN0aW9ucy50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9kZXRhaWwvdXNlRGV0YWlsRWRpdFNlc3Npb24udHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvZGV0YWlsL3VzZURldGFpbE11dGF0aW9ucy50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9kZXRhaWwvRGV0YWlsT3duZXJGaWVsZC50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvZGV0YWlsL0RldGFpbFBhZ2UudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCwgdXNlUmVmLCB1c2VDYWxsYmFjaywgdXNlTWVtbyB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgU2luZ2xlRGF0ZVBpY2tlciBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NpbmdsZURhdGVQaWNrZXIudHN4XCI7XHJcbmltcG9ydCBDb25maXJtTW9kYWwgZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9Db25maXJtTW9kYWwudHN4XCI7XHJcbmltcG9ydCBTZWxlY3RDb21ib2JveCBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NlbGVjdENvbWJvYm94LnRzeFwiO1xyXG5pbXBvcnQgQXBwRXJyb3JCb3VuZGFyeSBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0FwcEVycm9yQm91bmRhcnkudHN4XCI7XHJcbmltcG9ydCB7IHVzZVZpc2l0YXMgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlVmlzaXRhcy50c1wiO1xyXG5pbXBvcnQgU3Bpbm5lciBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NwaW5uZXIudHN4XCI7XHJcbmltcG9ydCBWaXNpdE5hcnJhdGl2ZUZpZWxkcyBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy92aXNpdGFzL1Zpc2l0TmFycmF0aXZlRmllbGRzLnRzeFwiO1xyXG5pbXBvcnQgeyBjbGFzc05hbWVzIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2NsYXNzTmFtZXMudHNcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB7IGNhbkFjY2Vzcywgc2hvd1Blcm1pc3Npb25Nb2RhbCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9wZXJtaXNzaW9ucy50c1wiO1xyXG5pbXBvcnQgeyBiaW5kUmVhZE9ubHlHdWFyZCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9kb21HdWFyZHMudHNcIjtcclxuaW1wb3J0IHsgaGFzVmFsdWUgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvc3RyaW5ncy50c1wiO1xyXG5pbXBvcnQgeyBuYXZpZ2F0ZVRvVGV4dEVkaXRvckZpZWxkIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3RleHRFZGl0b3JOYXZpZ2F0aW9uLnRzXCI7XHJcbmltcG9ydCB7IGZsYXNoQWN0aW9uTWFyayB9IGZyb20gXCIuLi8uLi8uLi91dGlscy92aXNpdGFzSGlzdG9yeS50c1wiO1xyXG5pbXBvcnQgeyBzZXRQcmV2aWV3QW5jaG9yLCBzaG93UHJldmlld1Rvb2x0aXAsIGlzT3ZlcmZsb3dpbmcgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvcHJldmlld1Rvb2x0aXAudHNcIjtcclxuaW1wb3J0IHsgdXNlVGFwR3VhcmQgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlVGFwR3VhcmQudHNcIjtcclxuaW1wb3J0IHsgdXNlQ29uZmlybURpYWxvZyB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VDb25maXJtRGlhbG9nLnRzXCI7XHJcbmltcG9ydCB7IHVzZURldGFpbEh5ZHJhdGlvbiB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VEZXRhaWxIeWRyYXRpb24udHNcIjtcbmltcG9ydCB7IHVzZURldGFpbFRvcGJhckFjdGlvbnMgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlRGV0YWlsVG9wYmFyQWN0aW9ucy50c1wiO1xuaW1wb3J0IHsgdXNlVGV4dEVkaXRvckZpZWxkcyB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VUZXh0RWRpdG9yRmllbGRzLnRzXCI7XG5pbXBvcnQgeyB1c2VNb2R1bGVEYXRhVmlzaWJpbGl0eSB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VNb2R1bGVEYXRhVmlzaWJpbGl0eS50c1wiO1xuaW1wb3J0IHsgdXNlRGV0YWlsRWRpdFNlc3Npb24gfSBmcm9tIFwiLi91c2VEZXRhaWxFZGl0U2Vzc2lvbi50c1wiO1xuaW1wb3J0IHsgdXNlRGV0YWlsTXV0YXRpb25zIH0gZnJvbSBcIi4vdXNlRGV0YWlsTXV0YXRpb25zLnRzXCI7XG5pbXBvcnQge1xuICBjYW5NdXRhdGVPd25lcixcbiAgZm9ybWF0TW9kdWxlVmlzaWJsZVVzZXJMYWJlbCxcbiAgZ2V0VmlzaWJsZVVzZXJGb3JPd25lcixcbiAgaGFzTXV0YXRpb25Qb2xpY3ksXG4gIG5vcm1hbGl6ZU93bmVyQXhVc2VySWQsXG59IGZyb20gXCIuLi8uLi8uLi91dGlscy9tb2R1bGVEYXRhVmlzaWJpbGl0eS50c1wiO1xuaW1wb3J0IERldGFpbE93bmVyRmllbGQgZnJvbSBcIi4vRGV0YWlsT3duZXJGaWVsZC50c3hcIjtcblxuY29uc3QgRURJVE9SX1JFVFVSTl9GTEFHX1RUTF9NUyA9IDIgKiA2MCAqIDYwICogMTAwMDtcbmNvbnN0IEFQUF9DT0RFID0gXCJDUk1cIjtcbmNvbnN0IE1PRFVMRV9DT0RFID0gXCJWSVNJVEFTX0dFU1RJT05cIjtcblxudHlwZSBEZXRhaWxGb3JtUHJvcHMgPSB7XG4gIGNvbXBhbnlJZD86IHN0cmluZztcbiAgYXhVc2VySWQ/OiBzdHJpbmc7XG4gIHBlcm1pc3Npb25zUmV2aXNpb24/OiBzdHJpbmc7XG59O1xuXG5jb25zdCBzYWZlRGV0YWlsVGV4dCA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZyA9PiBTdHJpbmcodmFsdWUgPz8gXCJcIikudHJpbSgpO1xuXG5jb25zdCBmaXJzdERldGFpbFRleHQgPSAoLi4udmFsdWVzOiB1bmtub3duW10pOiBzdHJpbmcgPT4ge1xuICBmb3IgKGNvbnN0IHZhbHVlIG9mIHZhbHVlcykge1xuICAgIGNvbnN0IHRleHQgPSBzYWZlRGV0YWlsVGV4dCh2YWx1ZSk7XG4gICAgaWYgKHRleHQpIHJldHVybiB0ZXh0O1xuICB9XG5cbiAgcmV0dXJuIFwiXCI7XG59O1xuXG5jb25zdCBEZXRhaWxBcHAgPSAoeyBjb21wYW55SWQgPSBcIlwiLCBheFVzZXJJZCA9IFwiXCIsIHBlcm1pc3Npb25zUmV2aXNpb24gPSBcIlwiIH06IERldGFpbEZvcm1Qcm9wcykgPT4ge1xuICBjb25zdCB7IHZpc2l0VHlwZXMsIGNvbnRhY3RNZXRob2RzLCBhc2lzdGVudGVUaXBvcyB9ID0gdXNlVmlzaXRhcygpO1xuICBjb25zdCBjYW5WaWV3SGlzdG9yeSA9IGNhbkFjY2VzcyhcIlZJU0lUQVNfR0VTVElPTlwiLCBcIlZpZXdcIik7XG4gIGNvbnN0IGNhbkVkaXRIaXN0b3J5ID0gY2FuQWNjZXNzKFwiVklTSVRBU19HRVNUSU9OXCIsIFwiRWRpdFwiKTtcbiAgY29uc3QgY2FuRGVsZXRlSGlzdG9yeSA9IGNhbkFjY2VzcyhcIlZJU0lUQVNfR0VTVElPTlwiLCBcIkZ1bGxBY2Nlc3NcIik7XG4gIHR5cGUgQWN0aXZpdHlEZXRhaWxQYXlsb2FkID0ge1xuICAgIHJlY0lkPzogc3RyaW5nIHwgbnVtYmVyO1xyXG4gICAgUmVjSWQ/OiBzdHJpbmcgfCBudW1iZXI7XHJcbiAgICByZWZSZWNJZEFjdGl2aWRhZD86IHN0cmluZyB8IG51bWJlcjtcclxuICAgIFJlZlJlY0lkQWN0aXZpZGFkPzogc3RyaW5nIHwgbnVtYmVyO1xyXG4gICAgYWN0aXZpZGFkUmVjSWQ/OiBzdHJpbmcgfCBudW1iZXI7XHJcbiAgICBBY3RpdmlkYWRSZWNJZD86IHN0cmluZyB8IG51bWJlcjtcclxuICAgIHJlYWRPbmx5PzogYm9vbGVhbjtcbiAgICBhbGxvd0VkaXQ/OiBib29sZWFuO1xuICAgIGVkaXRNb2RlS2V5Pzogc3RyaW5nO1xuICAgIG93bmVyQXhVc2VySWQ/OiBzdHJpbmc7XG4gICAgT3duZXJBeFVzZXJJZD86IHN0cmluZztcbiAgICBvd25lck5hbWU/OiBzdHJpbmc7XG4gICAgT3duZXJOYW1lPzogc3RyaW5nO1xuICAgIG93bmVyQWxpYXM/OiBzdHJpbmc7XG4gICAgT3duZXJBbGlhcz86IHN0cmluZztcbiAgICBjcmVhdGVkQnlVc2VySWQ/OiBzdHJpbmc7XG4gICAgQ3JlYXRlZEJ5VXNlcklkPzogc3RyaW5nO1xuICAgIHVzZXJJZD86IHN0cmluZztcbiAgICBVc2VySWQ/OiBzdHJpbmc7XG4gICAgaW5kQ3JlYXRlZEJ5VXNlcklkPzogc3RyaW5nO1xuICAgIElORENyZWF0ZWRCeVVzZXJJZD86IHN0cmluZztcbiAgICBba2V5OiBzdHJpbmddOiB1bmtub3duO1xuICB9O1xuXG4gIGNvbnN0IGRldGFpbCA9ICh3aW5kb3cuX19BQ1RJVklUWV9ERVRBSUxfXyBhcyBBY3Rpdml0eURldGFpbFBheWxvYWQpIHx8IHt9O1xuICBjb25zdCB7IHZpc2libGVVc2VyQnlPd25lckF4VXNlcklkLCB2aXNpYmxlVXNlcnNSZWFkeSB9ID0gdXNlTW9kdWxlRGF0YVZpc2liaWxpdHkoe1xuICAgIGVuYWJsZWQ6IGNhblZpZXdIaXN0b3J5IHx8IGNhbkVkaXRIaXN0b3J5IHx8IGNhbkRlbGV0ZUhpc3RvcnksXG4gICAgY29tcGFueUlkLFxuICAgIGF4VXNlcklkLFxuICAgIHBlcm1pc3Npb25zUmV2aXNpb24sXG4gICAgYXBwQ29kZTogQVBQX0NPREUsXG4gICAgbW9kdWxlQ29kZTogTU9EVUxFX0NPREUsXG4gICAgcHJlbG9hZGVkVXNlcnM6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cuX19JTkRfVklTSUJMRV9WSVNJVF9VU0VSU19fIDogdW5kZWZpbmVkLFxuICAgIG9uRm9yYmlkZGVuOiBzaG93UGVybWlzc2lvbk1vZGFsLFxuICB9KTtcblxyXG4gIGNvbnN0IHJlc29sdmVBY3Rpdml0eVJlY0lkID0gKHBheWxvYWQ6IEFjdGl2aXR5RGV0YWlsUGF5bG9hZCk6IHN0cmluZyA9PiB7XHJcbiAgICBjb25zdCBjYW5kaWRhdGVzID0gW1xyXG4gICAgICBwYXlsb2FkLnJlY0lkLFxyXG4gICAgICBwYXlsb2FkLlJlY0lkLFxyXG4gICAgICBwYXlsb2FkLnJlZlJlY0lkQWN0aXZpZGFkLFxyXG4gICAgICBwYXlsb2FkLlJlZlJlY0lkQWN0aXZpZGFkLFxyXG4gICAgICBwYXlsb2FkLmFjdGl2aWRhZFJlY0lkLFxyXG4gICAgICBwYXlsb2FkLkFjdGl2aWRhZFJlY0lkLFxyXG4gICAgXTtcclxuXHJcbiAgICBmb3IgKGNvbnN0IGNhbmRpZGF0ZSBvZiBjYW5kaWRhdGVzKSB7XHJcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSBTdHJpbmcoY2FuZGlkYXRlID8/IFwiXCIpLnRyaW0oKTtcclxuICAgICAgaWYgKG5vcm1hbGl6ZWQpIHtcclxuICAgICAgICByZXR1cm4gbm9ybWFsaXplZDtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBcIlwiO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGFjdGl2aXR5UmVjSWQgPSByZXNvbHZlQWN0aXZpdHlSZWNJZChkZXRhaWwpO1xyXG5cclxuICBjb25zdCB0ZXh0RWRpdG9yQmFzZUlkID0gYWN0aXZpdHlSZWNJZCA/IGBWaXNpdGEuJHthY3Rpdml0eVJlY0lkfWAgOiBcIlZpc2l0YVwiO1xyXG4gIGNvbnN0IGZpZWxkSWRDb21lbnRhcmlvcyA9IGAke3RleHRFZGl0b3JCYXNlSWR9LkNvbWVudGFyaW9zYDtcclxuICBjb25zdCBmaWVsZElkQW50ZWNlZGVudGVzID0gYCR7dGV4dEVkaXRvckJhc2VJZH0uQW50ZWNlZGVudGVzYDtcclxuICBjb25zdCBmaWVsZElkQ29uY2x1c2lvbmVzID0gYCR7dGV4dEVkaXRvckJhc2VJZH0uQ29uY2x1c2lvbmVzYDtcclxuXHJcbiAgY29uc3Qgbm9ybWFsaXplRGF0ZVRvSW5wdXQgPSB1c2VDYWxsYmFjaygodmFsdWUpID0+IHtcclxuICAgIGlmICghdmFsdWUpIHJldHVybiBcIlwiO1xyXG4gICAgY29uc3QgcmF3ID0gU3RyaW5nKHZhbHVlKS50cmltKCk7XHJcbiAgICBpZiAoIXJhdykgcmV0dXJuIFwiXCI7XHJcbiAgICAvLyBBbHJlYWR5IHl5eXktTU0tZGRcclxuICAgIGlmICgvXlxcZHs0fS1cXGR7Mn0tXFxkezJ9JC8udGVzdChyYXcpKSByZXR1cm4gcmF3O1xyXG4gICAgLy8gZGQuTU0ueXl5eSBvciBkZC9NTS95eXl5XHJcbiAgICBpZiAoL15cXGR7Mn1bLi8tXVxcZHsyfVsuLy1dXFxkezR9JC8udGVzdChyYXcpKSB7XHJcbiAgICAgIGNvbnN0IHBhcnRzID0gcmF3LnNwbGl0KC9bLi8tXS8pLm1hcCgocCkgPT4gcGFyc2VJbnQocCwgMTApKTtcclxuICAgICAgaWYgKHBhcnRzLmxlbmd0aCA9PT0gMyAmJiAhTnVtYmVyLmlzTmFOKHBhcnRzWzBdKSAmJiAhTnVtYmVyLmlzTmFOKHBhcnRzWzFdKSAmJiAhTnVtYmVyLmlzTmFOKHBhcnRzWzJdKSkge1xyXG4gICAgICAgIGNvbnN0IFtkLCBtLCB5XSA9IHBhcnRzO1xyXG4gICAgICAgIGNvbnN0IG1tID0gU3RyaW5nKG0pLnBhZFN0YXJ0KDIsIFwiMFwiKTtcclxuICAgICAgICBjb25zdCBkZCA9IFN0cmluZyhkKS5wYWRTdGFydCgyLCBcIjBcIik7XHJcbiAgICAgICAgcmV0dXJuIGAke3l9LSR7bW19LSR7ZGR9YDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgY29uc3QgZHQgPSBuZXcgRGF0ZShyYXcpO1xyXG4gICAgaWYgKCFOdW1iZXIuaXNOYU4oZHQuZ2V0VGltZSgpKSkge1xyXG4gICAgICBjb25zdCB5eXl5ID0gZHQuZ2V0RnVsbFllYXIoKTtcclxuICAgICAgY29uc3QgbW0gPSBTdHJpbmcoZHQuZ2V0TW9udGgoKSArIDEpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcclxuICAgICAgY29uc3QgZGQgPSBTdHJpbmcoZHQuZ2V0RGF0ZSgpKS5wYWRTdGFydCgyLCBcIjBcIik7XHJcbiAgICAgIHJldHVybiBgJHt5eXl5fS0ke21tfS0ke2RkfWA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gXCJcIjtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IG1hdGNoT3B0aW9uVmFsdWUgPSB1c2VDYWxsYmFjaygob3B0aW9ucywgcmF3KSA9PiB7XHJcbiAgICBpZiAocmF3ID09IG51bGwpIHJldHVybiBcIlwiO1xyXG4gICAgY29uc3QgcmF3U3RyID0gU3RyaW5nKHJhdykudHJpbSgpO1xyXG4gICAgaWYgKCFyYXdTdHIpIHJldHVybiBcIlwiO1xyXG5cclxuICAgIGNvbnN0IG5vcm1hbGl6ZVRleHQgPSAocykgPT5cclxuICAgICAgU3RyaW5nKHMgfHwgXCJcIilcclxuICAgICAgICAudG9Mb3dlckNhc2UoKVxyXG4gICAgICAgIC5ub3JtYWxpemUoXCJORkRcIilcclxuICAgICAgICAucmVwbGFjZSgvW1xcdTAzMDAtXFx1MDM2Zl0vZywgXCJcIilcclxuICAgICAgICAudHJpbSgpO1xyXG5cclxuICAgIGNvbnN0IHJhd05vcm0gPSBub3JtYWxpemVUZXh0KHJhd1N0cik7XHJcbiAgICBjb25zdCBhbHROb3JtID0gcmF3Tm9ybS5lbmRzV2l0aChcIm9cIikgPyBgJHtyYXdOb3JtLnNsaWNlKDAsIC0xKX1hYCA6IHJhd05vcm07XHJcblxyXG4gICAgY29uc3QgbWF0Y2ggPSAob3B0aW9ucyB8fCBbXSkuZmluZCgobykgPT4ge1xyXG4gICAgICBjb25zdCB2YWwgPSBTdHJpbmcobz8udmFsdWUgPz8gbz8uVmFsdWUgPz8gXCJcIikudHJpbSgpO1xyXG4gICAgICBjb25zdCB0ZXh0ID0gU3RyaW5nKG8/LnRleHQgPz8gbz8uVGV4dCA/PyBcIlwiKS50cmltKCk7XHJcbiAgICAgIGNvbnN0IHRleHROb3JtID0gbm9ybWFsaXplVGV4dCh0ZXh0KTtcclxuICAgICAgcmV0dXJuIHZhbCA9PT0gcmF3U3RyIHx8IHZhbCA9PT0gcmF3Tm9ybSB8fCB0ZXh0Tm9ybSA9PT0gcmF3Tm9ybSB8fCB0ZXh0Tm9ybSA9PT0gYWx0Tm9ybTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIG1hdGNoID8gU3RyaW5nKG1hdGNoLnZhbHVlID8/IG1hdGNoLlZhbHVlID8/IHJhd1N0cikgOiByYXdTdHI7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBpbml0aWFsVHJhbnNEYXRlID0gbm9ybWFsaXplRGF0ZVRvSW5wdXQoU3RyaW5nKGRldGFpbC50cmFuc0RhdGUgPz8gZGV0YWlsLlRyYW5zRGF0ZSA/PyBcIlwiKSk7XHJcbiAgY29uc3QgZGVmYXVsdFZpc2l0VHlwZSA9IFN0cmluZyh2aXNpdFR5cGVzWzBdPy52YWx1ZSA/PyB2aXNpdFR5cGVzWzBdPy5WYWx1ZSA/PyBcIlwiKTtcclxuICBjb25zdCByYXdJbml0aWFsVmlzaXRUeXBlID0gU3RyaW5nKFxyXG4gICAgZGV0YWlsLnRpcG9WaXNpdGEgPz8gZGV0YWlsLlRpcG9WaXNpdGEgPz8gZGV0YWlsLnZpc2l0VHlwZSA/PyBkZXRhaWwuVmlzaXRUeXBlID8/IFwiXCJcclxuICApO1xyXG4gIGNvbnN0IGluaXRpYWxWaXNpdFR5cGUgPSBtYXRjaE9wdGlvblZhbHVlKHZpc2l0VHlwZXMsIHJhd0luaXRpYWxWaXNpdFR5cGUpIHx8IGRlZmF1bHRWaXNpdFR5cGU7XHJcbiAgY29uc3QgcmF3SW5pdGlhbENvbnRhY3RNZXRob2QgPSBTdHJpbmcoXHJcbiAgICBkZXRhaWwuY29udGFjdE1ldGhvZCA/PyBkZXRhaWwuQ29udGFjdE1ldGhvZCA/PyBcIlwiXHJcbiAgKTtcclxuICBjb25zdCBpbml0aWFsQ29udGFjdE1ldGhvZCA9IG1hdGNoT3B0aW9uVmFsdWUoY29udGFjdE1ldGhvZHMsIHJhd0luaXRpYWxDb250YWN0TWV0aG9kKTtcclxuICBjb25zdCByYXdJbml0aWFsQXNpc3RlbnRlID0gU3RyaW5nKFxyXG4gICAgZGV0YWlsLmFzaXN0ZW50ZVRpcG8gPz8gZGV0YWlsLkFzaXN0ZW50ZVRpcG8gPz8gKGFzaXN0ZW50ZVRpcG9zWzBdPy52YWx1ZSA/PyBhc2lzdGVudGVUaXBvc1swXT8uVmFsdWUgPz8gXCJcIilcclxuICApO1xyXG4gIGNvbnN0IGluaXRpYWxBc2lzdGVudGUgPSBtYXRjaE9wdGlvblZhbHVlKGFzaXN0ZW50ZVRpcG9zLCByYXdJbml0aWFsQXNpc3RlbnRlKSB8fCByYXdJbml0aWFsQXNpc3RlbnRlO1xyXG5cclxuICBjb25zdCBbdHJhbnNEYXRlLCBzZXRUcmFuc0RhdGVdID0gdXNlU3RhdGUoaW5pdGlhbFRyYW5zRGF0ZSk7XHJcbiAgY29uc3QgW3Zpc2l0VHlwZSwgc2V0VmlzaXRUeXBlXSA9IHVzZVN0YXRlKGluaXRpYWxWaXNpdFR5cGUpO1xyXG4gIGNvbnN0IFtjb250YWN0TWV0aG9kLCBzZXRDb250YWN0TWV0aG9kXSA9IHVzZVN0YXRlKGluaXRpYWxDb250YWN0TWV0aG9kKTtcclxuICBjb25zdCBbYXNpc3RlbnRlVGlwbywgc2V0QXNpc3RlbnRlVGlwb10gPSB1c2VTdGF0ZShpbml0aWFsQXNpc3RlbnRlKTtcclxuICBjb25zdCBbZGVzY3JpcHRpb24sIHNldERlc2NyaXB0aW9uXSA9IHVzZVN0YXRlKFN0cmluZyhkZXRhaWwuZGVzY3JpcHRpb24gPz8gZGV0YWlsLkRlc2NyaXB0aW9uID8/IFwiXCIpKTtcclxuICBjb25zdCBbY29tZW50YXJpb3MsIHNldENvbWVudGFyaW9zXSA9IHVzZVN0YXRlKFN0cmluZyhkZXRhaWwuY29tZW50YXJpb3MgPz8gZGV0YWlsLkNvbWVudGFyaW9zID8/IFwiXCIpKTtcclxuICBjb25zdCBbYW50ZWNlZGVudGVzLCBzZXRBbnRlY2VkZW50ZXNdID0gdXNlU3RhdGUoU3RyaW5nKGRldGFpbC5hbnRlY2VkZW50ZXMgPz8gZGV0YWlsLkFudGVjZWRlbnRlcyA/PyBcIlwiKSk7XHJcbiAgY29uc3QgW2NvbmNsdXNpb25lcywgc2V0Q29uY2x1c2lvbmVzXSA9IHVzZVN0YXRlKFN0cmluZyhkZXRhaWwuY29uY2x1c2lvbmVzID8/IGRldGFpbC5Db25jbHVzaW9uZXMgPz8gXCJcIikpO1xyXG4gIGNvbnN0IFtzdGF0dXMsIHNldFN0YXR1c10gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbYnVzeSwgc2V0QnVzeV0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW2lzRWRpdGluZywgc2V0SXNFZGl0aW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbaXNIeWRyYXRpbmcsIHNldElzSHlkcmF0aW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbbW9kYWxFcnJvciwgc2V0TW9kYWxFcnJvcl0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCByZWFkT25seVN1cmZhY2VSZWYgPSB1c2VSZWYobnVsbCk7XHJcbiAgY29uc3QgZWRpdFNuYXBzaG90UmVmID0gdXNlUmVmKG51bGwpO1xyXG5cclxuICBjb25zdCByZWNJZCA9IGFjdGl2aXR5UmVjSWQ7XG4gIGNvbnN0IGFjY291bnROdW0gPSBTdHJpbmcoZGV0YWlsLmFjY291bnROdW0gPz8gZGV0YWlsLkFjY291bnROdW0gPz8gXCJcIik7XG4gIGNvbnN0IGFjdGl2aWRhZElkID0gU3RyaW5nKGRldGFpbC5hY3RpdmlkYWRJZCA/PyBkZXRhaWwuQWN0aXZpZGFkSWQgPz8gXCJcIik7XG4gIC8vIFN0cmljdCByZWNvcmQtbGV2ZWwgVUkgZ2F0aW5nIG5lZWRzIHRoZSBkZXRhaWwgQVBJIHRvIHJldHVybiBPd25lckF4VXNlcklkLlxuICAvLyBMZWdhY3kgZmFsbGJhY2tzIGtlZXAgZXhpc3RpbmcgcmVjb3JkcyB1c2FibGUgd2hpbGUgQVgvQVBJIHJlbWFpbnMgdGhlIGZpbmFsIGVuZm9yY2VtZW50IHBvaW50LlxuICBjb25zdCBkZXRhaWxPd25lckF4VXNlcklkID0gZmlyc3REZXRhaWxUZXh0KFxuICAgIGRldGFpbC5vd25lckF4VXNlcklkLFxuICAgIGRldGFpbC5Pd25lckF4VXNlcklkLFxuICAgIGRldGFpbC5pbmRDcmVhdGVkQnlVc2VySWQsXG4gICAgZGV0YWlsLklORENyZWF0ZWRCeVVzZXJJZCxcbiAgICBkZXRhaWwuY3JlYXRlZEJ5VXNlcklkLFxuICAgIGRldGFpbC5DcmVhdGVkQnlVc2VySWQsXG4gICAgZGV0YWlsLnVzZXJJZCxcbiAgICBkZXRhaWwuVXNlcklkXG4gICk7XG4gIGNvbnN0IGRldGFpbE93bmVyUmF3VGV4dCA9IGZpcnN0RGV0YWlsVGV4dChkZXRhaWwub3duZXJOYW1lLCBkZXRhaWwuT3duZXJOYW1lLCBkZXRhaWwub3duZXJBbGlhcywgZGV0YWlsLk93bmVyQWxpYXMpO1xuICBjb25zdCB2aXNpYmxlT3duZXIgPSB1c2VNZW1vKCgpID0+IHtcbiAgICByZXR1cm4gZ2V0VmlzaWJsZVVzZXJGb3JPd25lcih2aXNpYmxlVXNlckJ5T3duZXJBeFVzZXJJZCwgZGV0YWlsT3duZXJBeFVzZXJJZCk7XG4gIH0sIFtkZXRhaWxPd25lckF4VXNlcklkLCB2aXNpYmxlVXNlckJ5T3duZXJBeFVzZXJJZF0pO1xuICBjb25zdCBkZXRhaWxPd25lclRleHQgPSB2aXNpYmxlT3duZXIgPyBmb3JtYXRNb2R1bGVWaXNpYmxlVXNlckxhYmVsKHZpc2libGVPd25lcikgOiBkZXRhaWxPd25lclJhd1RleHQgfHwgZGV0YWlsT3duZXJBeFVzZXJJZDtcbiAgY29uc3QgaXNDdXJyZW50T3duZXIgPVxuICAgICEhZGV0YWlsT3duZXJBeFVzZXJJZCAmJiBub3JtYWxpemVPd25lckF4VXNlcklkKGRldGFpbE93bmVyQXhVc2VySWQpID09PSBub3JtYWxpemVPd25lckF4VXNlcklkKGF4VXNlcklkKTtcbiAgY29uc3Qgc2hvd093bmVyRmllbGQgPSB2aXNpYmxlVXNlcnNSZWFkeSAmJiAhIXZpc2libGVPd25lciAmJiAhaXNDdXJyZW50T3duZXI7XG4gIC8vIE9ubHkgaGlkZSBhY3Rpb25zIHdoZW4gdGhlIGVuZHBvaW50IHJldHVybmVkIGEgcmVzb2x2ZWQgbXV0YXRpb24gcG9saWN5IGZvciB0aGUgb3duZXIuXG4gIGNvbnN0IG93bmVyQ2FuTXV0YXRlID0gIXZpc2libGVVc2Vyc1JlYWR5IHx8ICFoYXNNdXRhdGlvblBvbGljeSh2aXNpYmxlT3duZXIpXG4gICAgPyB0cnVlXG4gICAgOiBjYW5NdXRhdGVPd25lcih2aXNpYmxlVXNlckJ5T3duZXJBeFVzZXJJZCwgZGV0YWlsT3duZXJBeFVzZXJJZCk7XG4gIGNvbnN0IGNhbkVkaXRWaXNpdCA9IGNhbkVkaXRIaXN0b3J5ICYmIG93bmVyQ2FuTXV0YXRlO1xuICBjb25zdCBjYW5EZWxldGVWaXNpdCA9IGNhbkRlbGV0ZUhpc3RvcnkgJiYgb3duZXJDYW5NdXRhdGU7XG5cbiAgY29uc3QgeyBlZGl0TW9kZUtleVJlZiwgc3luY0VkaXRNb2RlRmxhZywgY2xlYXJEcmFmdCwgYXBwbHlEcmFmdFZhbHVlcyB9ID0gdXNlRGV0YWlsRWRpdFNlc3Npb24oe1xuICAgIGFjdGl2aWRhZElkLFxuICAgIHJlY0lkLFxuICAgIGNhbkVkaXRIaXN0b3J5OiBjYW5FZGl0VmlzaXQsXG4gICAgaXNFZGl0aW5nLFxyXG4gICAgc2V0SXNFZGl0aW5nLFxyXG4gICAgdHJhbnNEYXRlLFxyXG4gICAgdmlzaXRUeXBlLFxyXG4gICAgY29udGFjdE1ldGhvZCxcclxuICAgIGFzaXN0ZW50ZVRpcG8sXHJcbiAgICBkZXNjcmlwdGlvbixcclxuICAgIGNvbWVudGFyaW9zLFxyXG4gICAgYW50ZWNlZGVudGVzLFxyXG4gICAgY29uY2x1c2lvbmVzLFxyXG4gICAgc2V0VHJhbnNEYXRlLFxyXG4gICAgc2V0VmlzaXRUeXBlLFxyXG4gICAgc2V0Q29udGFjdE1ldGhvZCxcclxuICAgIHNldEFzaXN0ZW50ZVRpcG8sXHJcbiAgICBzZXREZXNjcmlwdGlvbixcclxuICAgIHNldENvbWVudGFyaW9zLFxyXG4gICAgc2V0QW50ZWNlZGVudGVzLFxyXG4gICAgc2V0Q29uY2x1c2lvbmVzLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBoYXNTZXJ2ZXJEZXRhaWwgPVxyXG4gICAgaGFzVmFsdWUocmVjSWQpICYmXHJcbiAgICBoYXNWYWx1ZShhY2NvdW50TnVtKSAmJlxyXG4gICAgaGFzVmFsdWUoZGV0YWlsLnRyYW5zRGF0ZSB8fCBkZXRhaWwuVHJhbnNEYXRlIHx8IFwiXCIpO1xyXG5cclxuICBjb25zdCBzaG91bGRIeWRyYXRlID0gISFhY3RpdmlkYWRJZCAmJiAhaGFzU2VydmVyRGV0YWlsO1xyXG5cclxuICBjb25zdCBvcGVuVGV4dEVkaXRvciA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKFxyXG4gICAgICBmaWVsZElkOiBzdHJpbmcsXHJcbiAgICAgIGZpZWxkTGFiZWw6IHN0cmluZyxcclxuICAgICAgZmllbGRWYWx1ZTogc3RyaW5nLFxyXG4gICAgICBvcHRpb25zOiB7IGFsbG93RWRpdD86IGJvb2xlYW47IHJlYWRPbmx5PzogYm9vbGVhbjsgZWRpdE1vZGVLZXk/OiBzdHJpbmcgfSA9IHt9XHJcbiAgICApID0+IHtcclxuICAgICAgbmF2aWdhdGVUb1RleHRFZGl0b3JGaWVsZCh7XHJcbiAgICAgICAgZmllbGRJZCxcclxuICAgICAgICBmaWVsZExhYmVsLFxyXG4gICAgICAgIGZpZWxkVmFsdWUsXHJcbiAgICAgICAgcmVhZE9ubHk6IG9wdGlvbnM/LnJlYWRPbmx5ID09PSB0cnVlLFxyXG4gICAgICAgIGFsbG93RWRpdDogb3B0aW9ucz8uYWxsb3dFZGl0ICE9PSBmYWxzZSxcclxuICAgICAgICBlZGl0TW9kZUtleTogb3B0aW9ucz8uZWRpdE1vZGVLZXksXHJcbiAgICAgICAgZWRpdE1vZGVSZXR1cm5UdGxNczogRURJVE9SX1JFVFVSTl9GTEFHX1RUTF9NUyxcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgW11cclxuICApO1xyXG5cclxuICBjb25zdCBoYW5kbGVDb21lbnRhcmlvc1RhcCA9IHVzZUNhbGxiYWNrKChldmVudCkgPT4ge1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIG9wZW5UZXh0RWRpdG9yKGZpZWxkSWRDb21lbnRhcmlvcywgaW5kVChcIlZpc2l0c19GaWVsZF9Db21tZW50c1wiLCBcIkNvbW1lbnRzXCIpLCBjb21lbnRhcmlvcywge1xuICAgICAgcmVhZE9ubHk6ICFpc0VkaXRpbmcsXG4gICAgICBhbGxvd0VkaXQ6IGNhbkVkaXRWaXNpdCxcbiAgICAgIGVkaXRNb2RlS2V5OiBlZGl0TW9kZUtleVJlZi5jdXJyZW50XG4gICAgfSk7XG4gIH0sIFtjb21lbnRhcmlvcywgZWRpdE1vZGVLZXlSZWYsIGZpZWxkSWRDb21lbnRhcmlvcywgaXNFZGl0aW5nLCBjYW5FZGl0VmlzaXQsIG9wZW5UZXh0RWRpdG9yXSk7XG5cclxuICBjb25zdCBoYW5kbGVDb21lbnRhcmlvc0hvbGQgPSB1c2VDYWxsYmFjaygodGFyZ2V0LCBjbGllbnRZKSA9PiB7XHJcbiAgICBpZiAoIXRhcmdldCB8fCAhaXNPdmVyZmxvd2luZyh0YXJnZXQpKSByZXR1cm4gZmFsc2U7XHJcbiAgICBzZXRQcmV2aWV3QW5jaG9yKHRhcmdldCk7XHJcbiAgICByZXR1cm4gc2hvd1ByZXZpZXdUb29sdGlwKFN0cmluZyhjb21lbnRhcmlvcyB8fCBcIlwiKSwgY2xpZW50WSk7XHJcbiAgfSwgW2NvbWVudGFyaW9zXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUFudGVjZWRlbnRlc1RhcCA9IHVzZUNhbGxiYWNrKChldmVudCkgPT4ge1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIG9wZW5UZXh0RWRpdG9yKGZpZWxkSWRBbnRlY2VkZW50ZXMsIGluZFQoXCJWaXNpdHNfRmllbGRfQmFja2dyb3VuZFwiLCBcIkJhY2tncm91bmRcIiksIGFudGVjZWRlbnRlcywge1xuICAgICAgcmVhZE9ubHk6ICFpc0VkaXRpbmcsXG4gICAgICBhbGxvd0VkaXQ6IGNhbkVkaXRWaXNpdCxcbiAgICAgIGVkaXRNb2RlS2V5OiBlZGl0TW9kZUtleVJlZi5jdXJyZW50XG4gICAgfSk7XG4gIH0sIFthbnRlY2VkZW50ZXMsIGVkaXRNb2RlS2V5UmVmLCBmaWVsZElkQW50ZWNlZGVudGVzLCBpc0VkaXRpbmcsIGNhbkVkaXRWaXNpdCwgb3BlblRleHRFZGl0b3JdKTtcblxyXG4gIGNvbnN0IGhhbmRsZUFudGVjZWRlbnRlc0hvbGQgPSB1c2VDYWxsYmFjaygodGFyZ2V0LCBjbGllbnRZKSA9PiB7XHJcbiAgICBpZiAoIXRhcmdldCB8fCAhaXNPdmVyZmxvd2luZyh0YXJnZXQpKSByZXR1cm4gZmFsc2U7XHJcbiAgICBzZXRQcmV2aWV3QW5jaG9yKHRhcmdldCk7XHJcbiAgICByZXR1cm4gc2hvd1ByZXZpZXdUb29sdGlwKFN0cmluZyhhbnRlY2VkZW50ZXMgfHwgXCJcIiksIGNsaWVudFkpO1xyXG4gIH0sIFthbnRlY2VkZW50ZXNdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQ29uY2x1c2lvbmVzVGFwID0gdXNlQ2FsbGJhY2soKGV2ZW50KSA9PiB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgb3BlblRleHRFZGl0b3IoZmllbGRJZENvbmNsdXNpb25lcywgaW5kVChcIlZpc2l0c19GaWVsZF9Db25jbHVzaW9uc1wiLCBcIkNvbmNsdXNpb25zXCIpLCBjb25jbHVzaW9uZXMsIHtcbiAgICAgIHJlYWRPbmx5OiAhaXNFZGl0aW5nLFxuICAgICAgYWxsb3dFZGl0OiBjYW5FZGl0VmlzaXQsXG4gICAgICBlZGl0TW9kZUtleTogZWRpdE1vZGVLZXlSZWYuY3VycmVudFxuICAgIH0pO1xuICB9LCBbY29uY2x1c2lvbmVzLCBlZGl0TW9kZUtleVJlZiwgZmllbGRJZENvbmNsdXNpb25lcywgaXNFZGl0aW5nLCBjYW5FZGl0VmlzaXQsIG9wZW5UZXh0RWRpdG9yXSk7XG5cclxuICBjb25zdCBoYW5kbGVDb25jbHVzaW9uZXNIb2xkID0gdXNlQ2FsbGJhY2soKHRhcmdldCwgY2xpZW50WSkgPT4ge1xyXG4gICAgaWYgKCF0YXJnZXQgfHwgIWlzT3ZlcmZsb3dpbmcodGFyZ2V0KSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgc2V0UHJldmlld0FuY2hvcih0YXJnZXQpO1xyXG4gICAgcmV0dXJuIHNob3dQcmV2aWV3VG9vbHRpcChTdHJpbmcoY29uY2x1c2lvbmVzIHx8IFwiXCIpLCBjbGllbnRZKTtcclxuICB9LCBbY29uY2x1c2lvbmVzXSk7XHJcblxyXG4gIGNvbnN0IGNvbWVudGFyaW9zVGFwID0gdXNlVGFwR3VhcmQoaGFuZGxlQ29tZW50YXJpb3NUYXAsIGhhbmRsZUNvbWVudGFyaW9zSG9sZCk7XHJcbiAgY29uc3QgYW50ZWNlZGVudGVzVGFwID0gdXNlVGFwR3VhcmQoaGFuZGxlQW50ZWNlZGVudGVzVGFwLCBoYW5kbGVBbnRlY2VkZW50ZXNIb2xkKTtcclxuICBjb25zdCBjb25jbHVzaW9uZXNUYXAgPSB1c2VUYXBHdWFyZChoYW5kbGVDb25jbHVzaW9uZXNUYXAsIGhhbmRsZUNvbmNsdXNpb25lc0hvbGQpO1xyXG5cclxuICBjb25zdCB0ZXh0RWRpdG9yQmluZGluZ3MgPSB1c2VNZW1vKFxyXG4gICAgKCkgPT4gW1xyXG4gICAgICB7IGZpZWxkSWQ6IGZpZWxkSWRDb21lbnRhcmlvcywgYXBwbHlWYWx1ZTogc2V0Q29tZW50YXJpb3MgfSxcclxuICAgICAgeyBmaWVsZElkOiBmaWVsZElkQW50ZWNlZGVudGVzLCBhcHBseVZhbHVlOiBzZXRBbnRlY2VkZW50ZXMgfSxcclxuICAgICAgeyBmaWVsZElkOiBmaWVsZElkQ29uY2x1c2lvbmVzLCBhcHBseVZhbHVlOiBzZXRDb25jbHVzaW9uZXMgfSxcclxuICAgIF0sXHJcbiAgICBbZmllbGRJZEFudGVjZWRlbnRlcywgZmllbGRJZENvbWVudGFyaW9zLCBmaWVsZElkQ29uY2x1c2lvbmVzXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IHsgYXBwbHlWYWx1ZXM6IGFwcGx5VGV4dEVkaXRvclZhbHVlcyB9ID0gdXNlVGV4dEVkaXRvckZpZWxkcyh0ZXh0RWRpdG9yQmluZGluZ3MsIHtcclxuICAgIGFwcGx5T25Nb3VudDogIWFjdGl2aWRhZElkLFxyXG4gICAgbGlzdGVuUGFnZVNob3c6IHRydWUsXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IHsgbW9kYWwsIG9wZW5Db25maXJtLCBjbG9zZUNvbmZpcm0sIGhhbmRsZUNvbmZpcm0gfSA9IHVzZUNvbmZpcm1EaWFsb2coe1xyXG4gICAgZGVmYXVsdENvbmZpcm1UZXh0OiBpbmRUKFwiQ29uZmlybV9ZZXNcIiwgXCJDb25maXJtX1llc1wiKSxcclxuICAgIGRlZmF1bHRDYW5jZWxUZXh0OiBpbmRUKFwiQ29uZmlybV9Ob1wiLCBcIkNvbmZpcm1fTm9cIilcclxuICB9KTtcclxuXHJcbiAgY29uc3QgaGFuZGxlTW9kYWxDb25maXJtID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgc2V0TW9kYWxFcnJvcihcIlwiKTtcclxuICAgIGF3YWl0IGhhbmRsZUNvbmZpcm0oe1xyXG4gICAgICBidXN5LFxyXG4gICAgICBvbkVycm9yOiAobXNnKSA9PiB7XHJcbiAgICAgICAgc2V0TW9kYWxFcnJvcihtc2cpO1xyXG4gICAgICAgIHNldFN0YXR1cyhtc2cpO1xyXG4gICAgICAgIGZsYXNoQWN0aW9uTWFyayhcImVycm9yUHJvY2Vzc1wiLCAxNTAwKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSwgW2J1c3ksIGhhbmRsZUNvbmZpcm1dKTtcclxuXHJcbiAgY29uc3QgbW9kYWxMb2FkaW5nVGV4dCA9IGluZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkNvbW1vbl9Mb2FkaW5nXCIpO1xyXG4gIGNvbnN0IG1vZGFsQ2FuY2VsVGV4dCA9IG1vZGFsLmNhbmNlbFRleHQgfHwgaW5kVChcIkNvbmZpcm1fTm9cIiwgXCJDb25maXJtX05vXCIpO1xyXG4gIGNvbnN0IG1vZGFsQ29uZmlybVRleHQgPSBidXN5XHJcbiAgICA/IG1vZGFsTG9hZGluZ1RleHRcclxuICAgIDogKCFidXN5ICYmIG1vZGFsRXJyb3IgPyBpbmRUKFwiQ29tbW9uX09LXCIsIFwiQ29tbW9uX09LXCIpIDogKG1vZGFsLmNvbmZpcm1UZXh0IHx8IGluZFQoXCJDb25maXJtX1llc1wiLCBcIkNvbmZpcm1fWWVzXCIpKSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZU1vZGFsQnV0dG9uQ29uZmlybSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmICghYnVzeSAmJiBtb2RhbEVycm9yKSB7XHJcbiAgICAgIGNsb3NlQ29uZmlybSgpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBoYW5kbGVNb2RhbENvbmZpcm0oKTtcclxuICB9LCBbYnVzeSwgbW9kYWxFcnJvciwgY2xvc2VDb25maXJtLCBoYW5kbGVNb2RhbENvbmZpcm1dKTtcclxuXHJcbiAgY29uc3QgaGFzQWN0aXZlUHJvY2VzcyA9IHVzZU1lbW8oKCkgPT4gYnVzeSB8fCBpc0VkaXRpbmcsIFtidXN5LCBpc0VkaXRpbmddKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIHdpbmRvdy5fX2luZFNldE5hdmlnYXRpb25HdWFyZD8uKGhhc0FjdGl2ZVByb2Nlc3MpO1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgd2luZG93Ll9faW5kQ2xlYXJOYXZpZ2F0aW9uR3VhcmQ/LigpO1xyXG4gICAgfTtcclxuICB9LCBbaGFzQWN0aXZlUHJvY2Vzc10pO1xyXG5cclxuICB1c2VEZXRhaWxIeWRyYXRpb24oe1xyXG4gICAgYWN0aXZpZGFkSWQsXHJcbiAgICBzaG91bGRIeWRyYXRlLFxyXG4gICAgdmlzaXRUeXBlcyxcclxuICAgIGNvbnRhY3RNZXRob2RzLFxyXG4gICAgYXNpc3RlbnRlVGlwb3MsXHJcbiAgICBkZWZhdWx0VmlzaXRUeXBlLFxyXG4gICAgaW5pdGlhbEFzaXN0ZW50ZSxcclxuICAgIG5vcm1hbGl6ZURhdGVUb0lucHV0LFxyXG4gICAgbWF0Y2hPcHRpb25WYWx1ZSxcclxuICAgIGFwcGx5RHJhZnRWYWx1ZXMsXHJcbiAgICBhcHBseVRleHRFZGl0b3JWYWx1ZXMsXHJcbiAgICBzZXRTdGF0dXMsXHJcbiAgICBzZXRJc0h5ZHJhdGluZyxcclxuICAgIHNldFRyYW5zRGF0ZSxcclxuICAgIHNldFZpc2l0VHlwZSxcclxuICAgIHNldENvbnRhY3RNZXRob2QsXHJcbiAgICBzZXRBc2lzdGVudGVUaXBvLFxyXG4gICAgc2V0RGVzY3JpcHRpb24sXHJcbiAgICBzZXRDb21lbnRhcmlvcyxcclxuICAgIHNldEFudGVjZWRlbnRlcyxcclxuICAgIHNldENvbmNsdXNpb25lcyxcclxuICB9KTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IGVsID0gcmVhZE9ubHlTdXJmYWNlUmVmLmN1cnJlbnQ7XHJcbiAgICBpZiAoIWVsKSByZXR1cm47XHJcbiAgICBpZiAoIWlzRWRpdGluZykge1xyXG4gICAgICBlbC5jbGFzc0xpc3QuYWRkKFwiaW5kLXJlYWRvbmx5LXN1cmZhY2VcIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiaW5kLXJlYWRvbmx5LXN1cmZhY2VcIik7XHJcbiAgICB9XHJcbiAgfSwgW2lzRWRpdGluZ10pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKGlzRWRpdGluZykge1xyXG4gICAgICBpZiAoIWVkaXRTbmFwc2hvdFJlZi5jdXJyZW50KSB7XHJcbiAgICAgICAgZWRpdFNuYXBzaG90UmVmLmN1cnJlbnQgPSB7XHJcbiAgICAgICAgICB0cmFuc0RhdGUsXHJcbiAgICAgICAgICB2aXNpdFR5cGUsXHJcbiAgICAgICAgICBjb250YWN0TWV0aG9kLFxyXG4gICAgICAgICAgYXNpc3RlbnRlVGlwbyxcclxuICAgICAgICAgIGRlc2NyaXB0aW9uLFxyXG4gICAgICAgICAgY29tZW50YXJpb3MsXHJcbiAgICAgICAgICBhbnRlY2VkZW50ZXMsXHJcbiAgICAgICAgICBjb25jbHVzaW9uZXNcclxuICAgICAgICB9O1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGVkaXRTbmFwc2hvdFJlZi5jdXJyZW50ID0gbnVsbDtcclxuICB9LCBbaXNFZGl0aW5nLCB0cmFuc0RhdGUsIHZpc2l0VHlwZSwgY29udGFjdE1ldGhvZCwgYXNpc3RlbnRlVGlwbywgZGVzY3JpcHRpb24sIGNvbWVudGFyaW9zLCBhbnRlY2VkZW50ZXMsIGNvbmNsdXNpb25lc10pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKGlzRWRpdGluZykgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIHJldHVybiBiaW5kUmVhZE9ubHlHdWFyZChyZWFkT25seVN1cmZhY2VSZWYuY3VycmVudCk7XHJcbiAgfSwgW2lzRWRpdGluZ10pO1xyXG5cclxuICBjb25zdCBoYW5kbGVFbmFibGVFZGl0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmICghY2FuRWRpdFZpc2l0KSB7XG4gICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHNldElzRWRpdGluZyh0cnVlKTtcbiAgICBzeW5jRWRpdE1vZGVGbGFnKHRydWUpO1xuICAgIHNldFN0YXR1cyhpbmRUKFwiVmlzaXRzX0RldGFpbF9FZGl0aW5nRW5hYmxlZFwiLCBcIkVkaXRpbmcgZW5hYmxlZFwiKSk7XG4gIH0sIFtjYW5FZGl0VmlzaXQsIHN5bmNFZGl0TW9kZUZsYWddKTtcblxyXG4gIGNvbnN0IGhhbmRsZUNhbmNlbEVkaXQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAoIWlzRWRpdGluZykgcmV0dXJuO1xyXG4gICAgc2V0SXNFZGl0aW5nKGZhbHNlKTtcclxuICAgIHN5bmNFZGl0TW9kZUZsYWcoZmFsc2UpO1xyXG4gICAgY2xlYXJEcmFmdCgpO1xyXG4gICAgc2V0U3RhdHVzKGluZFQoXCJDb21tb25fQ2FuY2VsXCIsIFwiQ2FuY2VsXCIpKTtcclxuICAgIHdpbmRvdy5fX2luZEJ5cGFzc05hdmlnYXRpb25HdWFyZE9uY2U/LigpO1xyXG4gICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gIH0sIFtpc0VkaXRpbmcsIHN5bmNFZGl0TW9kZUZsYWcsIGNsZWFyRHJhZnRdKTtcclxuXHJcbiAgY29uc3QgeyBoYW5kbGVVcGRhdGUsIGhhbmRsZURlbGV0ZSB9ID0gdXNlRGV0YWlsTXV0YXRpb25zKHtcclxuICAgIGJ1c3ksXG4gICAgaXNFZGl0aW5nLFxuICAgIGNhbkVkaXRIaXN0b3J5OiBjYW5FZGl0VmlzaXQsXG4gICAgY2FuRGVsZXRlSGlzdG9yeTogY2FuRGVsZXRlVmlzaXQsXG4gICAgcmVjSWQsXHJcbiAgICBhY2NvdW50TnVtLFxyXG4gICAgdHJhbnNEYXRlLFxyXG4gICAgdmlzaXRUeXBlLFxyXG4gICAgY29udGFjdE1ldGhvZCxcclxuICAgIGFzaXN0ZW50ZVRpcG8sXHJcbiAgICBkZXNjcmlwdGlvbixcclxuICAgIGNvbWVudGFyaW9zLFxyXG4gICAgYW50ZWNlZGVudGVzLFxyXG4gICAgY29uY2x1c2lvbmVzLFxyXG4gICAgdmlzaXRUeXBlcyxcclxuICAgIGNvbnRhY3RNZXRob2RzLFxyXG4gICAgYXNpc3RlbnRlVGlwb3MsXHJcbiAgICBkZWZhdWx0VmlzaXRUeXBlLFxyXG4gICAgcmF3SW5pdGlhbFZpc2l0VHlwZSxcclxuICAgIHJhd0luaXRpYWxDb250YWN0TWV0aG9kLFxyXG4gICAgcmF3SW5pdGlhbEFzaXN0ZW50ZSxcclxuICAgIG1hdGNoT3B0aW9uVmFsdWUsXHJcbiAgICBjbGVhckRyYWZ0LFxyXG4gICAgc3luY0VkaXRNb2RlRmxhZyxcclxuICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICBzZXRCdXN5LFxyXG4gICAgc2V0U3RhdHVzLFxyXG4gICAgc2V0SXNFZGl0aW5nLFxyXG4gIH0pO1xyXG5cclxuICB1c2VEZXRhaWxUb3BiYXJBY3Rpb25zKHtcclxuICAgIGJ1c3ksXHJcbiAgICBtb2RhbE9wZW46IG1vZGFsLm9wZW4sXG4gICAgaXNFZGl0aW5nLFxuICAgIGNhbkVkaXRIaXN0b3J5OiBjYW5FZGl0VmlzaXQsXG4gICAgY2FuRGVsZXRlSGlzdG9yeTogY2FuRGVsZXRlVmlzaXQsXG4gICAgdHJhbnNEYXRlLFxuICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICBoYW5kbGVFbmFibGVFZGl0LFxyXG4gICAgaGFuZGxlQ2FuY2VsRWRpdCxcclxuICAgIGhhbmRsZVVwZGF0ZSxcclxuICAgIGhhbmRsZURlbGV0ZSxcclxuICAgIG9wZW5Db25maXJtLFxuICAgIGNsb3NlQ29uZmlybSxcbiAgICBwZXJtaXNzaW9uc1JlYWR5OiB2aXNpYmxlVXNlcnNSZWFkeSxcbiAgfSk7XG5cclxuICBjb25zdCBkZXNjcmlwdGlvbkxhYmVsID0gaW5kVChcIlZpc2l0c19GaWVsZF9EZXNjcmlwdGlvblwiLCBcIkRlc2NyaXB0aW9uXCIpO1xyXG4gIGNvbnN0IGNvbW1lbnRzTGFiZWwgPSBpbmRUKFwiVmlzaXRzX0ZpZWxkX0NvbW1lbnRzXCIsIFwiQ29tbWVudHNcIik7XHJcbiAgY29uc3QgYmFja2dyb3VuZExhYmVsID0gaW5kVChcIlZpc2l0c19GaWVsZF9CYWNrZ3JvdW5kXCIsIFwiQmFja2dyb3VuZFwiKTtcclxuICBjb25zdCBjb25jbHVzaW9uc0xhYmVsID0gaW5kVChcIlZpc2l0c19GaWVsZF9Db25jbHVzaW9uc1wiLCBcIkNvbmNsdXNpb25zXCIpO1xyXG4gIGNvbnN0IGRldGFpbERlc2NyaXB0aW9uQ2xhc3NOYW1lID0gY2xhc3NOYW1lcyhcclxuICAgIFwiZm9ybS1jb250cm9sXCIsXHJcbiAgICBpc0VkaXRpbmcgPyBcImJvcmRlci1uZXV0cmFsLTIwMCB0ZXh0LW5ldXRyYWwtOTAwXCIgOiBcImJvcmRlci1uZXV0cmFsLTIwMCBpbmQtcmVhZG9ubHktZmllbGRcIlxyXG4gICk7XHJcbiAgY29uc3QgZGV0YWlsUmVhZE9ubHlDbGFzc05hbWUgPSBjbGFzc05hbWVzKFwiZm9ybS1jb250cm9sIGN1cnNvci1wb2ludGVyXCIsICFpc0VkaXRpbmcgPyBcImluZC1yZWFkb25seS1maWVsZFwiIDogXCJcIik7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNFwiPlxyXG4gICAgICA8Q29uZmlybU1vZGFsXHJcbiAgICAgICAgb3Blbj17bW9kYWwub3Blbn1cclxuICAgICAgICB0aXRsZT17bW9kYWwudGl0bGV9XHJcbiAgICAgICAgbWVzc2FnZT17bW9kYWwubWVzc2FnZX1cclxuICAgICAgICBjb25maXJtVGV4dD17bW9kYWxDb25maXJtVGV4dH1cclxuICAgICAgICBjYW5jZWxUZXh0PXttb2RhbENhbmNlbFRleHR9XHJcbiAgICAgICAgbG9hZGluZ1RleHQ9e21vZGFsTG9hZGluZ1RleHR9XHJcbiAgICAgICAgc2hvd0NhbmNlbD17bW9kYWwuc2hvd0NhbmNlbH1cclxuICAgICAgICBzaG93Q29uZmlybT17bW9kYWwuc2hvd0NvbmZpcm19XHJcbiAgICAgICAgYnVzeT17YnVzeX1cclxuICAgICAgICBlcnJvcj17bW9kYWxFcnJvcn1cclxuICAgICAgICBzdGF0dXM9e3N0YXR1c31cclxuICAgICAgICBvbkNvbmZpcm09e2hhbmRsZU1vZGFsQnV0dG9uQ29uZmlybX1cclxuICAgICAgICBvbkNhbmNlbD17Y2xvc2VDb25maXJtfVxyXG4gICAgICAvPlxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgcmVmPXtyZWFkT25seVN1cmZhY2VSZWZ9XHJcbiAgICAgICAgY2xhc3NOYW1lPVwicmVsYXRpdmUgc2hhZG93LXhzIGdsYXNzLXBhbmVsIHAtNCBzcGFjZS15LTQgYm9yZGVyIGJvcmRlci1uZXV0cmFsLTIwMCByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXVwiXHJcbiAgICAgID5cclxuICAgICAgICB7aXNIeWRyYXRpbmcgJiYgKFxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIHotMTAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgYmctd2hpdGUvNzAgcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV1cIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0ZXh0LXNtIHRleHQtbmV1dHJhbC02MDBcIj5cclxuICAgICAgICAgICAgICA8U3Bpbm5lciBzaXplPVwic2l6ZS01XCIgLz5cclxuICAgICAgICAgICAgICA8c3Bhbj57aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX08L3NwYW4+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKX1cclxuICAgICAgICB7c2hvd093bmVyRmllbGQgJiYgKFxuICAgICAgICAgIDxEZXRhaWxPd25lckZpZWxkIGxhYmVsPXtpbmRUKFwiVmlzaXRzX0RldGFpbF9Pd25lcl9MYWJlbFwiLCBcIk93bmVyXCIpfSB2YWx1ZT17ZGV0YWlsT3duZXJUZXh0fSAvPlxuICAgICAgICApfVxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMyBnYXAtNCBwdC0xXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ2aXNpdGEtZmllbGQtdGV4dFwiPlxyXG4gICAgICAgICAgICA8U2luZ2xlRGF0ZVBpY2tlclxyXG4gICAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiVmlzaXRzX0RldGFpbF9EYXRlX0xhYmVsXCIsIFwiRGF0ZVwiKX1cclxuICAgICAgICAgICAgICB2YWx1ZT17dHJhbnNEYXRlfVxyXG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXtzZXRUcmFuc0RhdGV9XHJcbiAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFpc0VkaXRpbmd9XHJcbiAgICAgICAgICAgICAgcmVhZE9ubHk9eyFpc0VkaXRpbmd9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxTZWxlY3RDb21ib2JveFxyXG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIlZpc2l0c19EZXRhaWxfVmlzaXRUeXBlX0xhYmVsXCIsIFwiVmlzaXQgdHlwZVwiKX1cclxuICAgICAgICAgICAgb3B0aW9ucz17dmlzaXRUeXBlc31cclxuICAgICAgICAgICAgdmFsdWU9e3Zpc2l0VHlwZX1cclxuICAgICAgICAgICAgb25DaGFuZ2U9e3NldFZpc2l0VHlwZX1cclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJWaXNpdHNfRGV0YWlsX1Zpc2l0VHlwZV9QbGFjZWhvbGRlclwiLCBcIlNlbGVjdCB0eXBlXCIpfVxyXG4gICAgICAgICAgICBkaXNhYmxlZD17IWlzRWRpdGluZ31cclxuICAgICAgICAgICAgcmVhZE9ubHk9eyFpc0VkaXRpbmd9XHJcbiAgICAgICAgICAgIHVzZVBvcnRhbD17ZmFsc2V9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICAgPFNlbGVjdENvbWJvYm94XHJcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiVmlzaXRzX0RldGFpbF9Db250YWN0TWV0aG9kX0xhYmVsXCIsIFwiQ29udGFjdCBtZXRob2RcIil9XHJcbiAgICAgICAgICAgIG9wdGlvbnM9e2NvbnRhY3RNZXRob2RzfVxyXG4gICAgICAgICAgICB2YWx1ZT17Y29udGFjdE1ldGhvZH1cclxuICAgICAgICAgICAgb25DaGFuZ2U9e3NldENvbnRhY3RNZXRob2R9XHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiVmlzaXRzX0RldGFpbF9Db250YWN0TWV0aG9kX1BsYWNlaG9sZGVyXCIsIFwiU2VsZWN0IG1ldGhvZFwiKX1cclxuICAgICAgICAgICAgZGlzYWJsZWQ9eyFpc0VkaXRpbmd9XHJcbiAgICAgICAgICAgIHJlYWRPbmx5PXshaXNFZGl0aW5nfVxyXG4gICAgICAgICAgICB1c2VQb3J0YWw9e2ZhbHNlfVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgPFZpc2l0TmFycmF0aXZlRmllbGRzXHJcbiAgICAgICAgICBkZXNjcmlwdGlvbkxhYmVsPXtkZXNjcmlwdGlvbkxhYmVsfVxyXG4gICAgICAgICAgZGVzY3JpcHRpb25WYWx1ZT17ZGVzY3JpcHRpb259XHJcbiAgICAgICAgICBkZXNjcmlwdGlvbkNsYXNzTmFtZT17ZGV0YWlsRGVzY3JpcHRpb25DbGFzc05hbWV9XHJcbiAgICAgICAgICBkZXNjcmlwdGlvbkRpc2FibGVkPXshaXNFZGl0aW5nfVxyXG4gICAgICAgICAgb25EZXNjcmlwdGlvbkNoYW5nZT17c2V0RGVzY3JpcHRpb259XHJcbiAgICAgICAgICB0YXBGaWVsZHM9e1tcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIGlkOiBcImNvbWVudGFyaW9zXCIsXHJcbiAgICAgICAgICAgICAgbGFiZWw6IGNvbW1lbnRzTGFiZWwsXHJcbiAgICAgICAgICAgICAgdmFsdWU6IGNvbWVudGFyaW9zLFxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZTogZGV0YWlsUmVhZE9ubHlDbGFzc05hbWUsXHJcbiAgICAgICAgICAgICAgcG9pbnRlckJpbmRpbmdzOiBjb21lbnRhcmlvc1RhcCxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIGlkOiBcImFudGVjZWRlbnRlc1wiLFxyXG4gICAgICAgICAgICAgIGxhYmVsOiBiYWNrZ3JvdW5kTGFiZWwsXHJcbiAgICAgICAgICAgICAgdmFsdWU6IGFudGVjZWRlbnRlcyxcclxuICAgICAgICAgICAgICBjbGFzc05hbWU6IGRldGFpbFJlYWRPbmx5Q2xhc3NOYW1lLFxyXG4gICAgICAgICAgICAgIHBvaW50ZXJCaW5kaW5nczogYW50ZWNlZGVudGVzVGFwLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgaWQ6IFwiY29uY2x1c2lvbmVzXCIsXHJcbiAgICAgICAgICAgICAgbGFiZWw6IGNvbmNsdXNpb25zTGFiZWwsXHJcbiAgICAgICAgICAgICAgdmFsdWU6IGNvbmNsdXNpb25lcyxcclxuICAgICAgICAgICAgICBjbGFzc05hbWU6IGRldGFpbFJlYWRPbmx5Q2xhc3NOYW1lLFxyXG4gICAgICAgICAgICAgIHBvaW50ZXJCaW5kaW5nczogY29uY2x1c2lvbmVzVGFwLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgXX1cclxuICAgICAgICAvPlxyXG5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0zIHRleHQtc20gdGV4dC1uZXV0cmFsLTYwMFwiPlxyXG4gICAgICAgICAgPHNwYW4+e3N0YXR1c308L3NwYW4+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbi8vIERldGFpbCBVSSB3cmFwcGVkIGJ5IHRoZSBlcnJvciBib3VuZGFyeS5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIERldGFpbEZvcm0ocHJvcHM6IERldGFpbEZvcm1Qcm9wcykge1xuICByZXR1cm4gKFxuICAgIDxBcHBFcnJvckJvdW5kYXJ5IGZhbGxiYWNrTWVzc2FnZT17aW5kVChcIlZpc2l0c19EZXRhaWxfRXJyb3JCb3VuZGFyeVwiLCBcIkFuIGVycm9yIG9jY3VycmVkIHdoaWxlIHJlbmRlcmluZyB0aGUgZGV0YWlsIHBhZ2UuIFJlbG9hZCBhbmQgdHJ5IGFnYWluLlwiKX0+XG4gICAgICA8RGV0YWlsQXBwIHsuLi5wcm9wc30gLz5cbiAgICA8L0FwcEVycm9yQm91bmRhcnk+XG4gICk7XG59XG4iLCAiZXhwb3J0IGNvbnN0IGJpbmRSZWFkT25seUd1YXJkID0gKGVsOiBIVE1MRWxlbWVudCB8IG51bGwpID0+IHtcclxuICBpZiAoIWVsKSByZXR1cm4gKCkgPT4ge307XHJcbiAgY29uc3QgY2FuY2VsID0gKGV2ZW50OiBFdmVudCkgPT4gZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICBjb25zdCBldmVudHMgPSBbXCJjb250ZXh0bWVudVwiLCBcInNlbGVjdHN0YXJ0XCIsIFwiY29weVwiLCBcImN1dFwiLCBcInBhc3RlXCJdO1xyXG4gIGV2ZW50cy5mb3JFYWNoKChldnQpID0+IGVsLmFkZEV2ZW50TGlzdGVuZXIoZXZ0LCBjYW5jZWwpKTtcclxuICByZXR1cm4gKCkgPT4ge1xyXG4gICAgZXZlbnRzLmZvckVhY2goKGV2dCkgPT4gZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihldnQsIGNhbmNlbCkpO1xyXG4gIH07XHJcbn07XHJcbiIsICJleHBvcnQgY29uc3QgaGFzVmFsdWUgPSAodmFsdWU6IHVua25vd24pID0+IFN0cmluZyh2YWx1ZSB8fCBcIlwiKS50cmltKCkubGVuZ3RoID4gMDtcclxuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgZmV0Y2hKc29uIH0gZnJvbSBcIi4uL3NlcnZpY2VzL2FwaVNlcnZpY2UudHNcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi91dGlscy9pbmRJMThuLnRzXCI7XHJcblxyXG50eXBlIE9wdGlvbkxpa2UgPSB7XHJcbiAgdmFsdWU/OiBzdHJpbmcgfCBudW1iZXI7XHJcbiAgVmFsdWU/OiBzdHJpbmcgfCBudW1iZXI7XHJcbiAgdGV4dD86IHN0cmluZztcclxuICBUZXh0Pzogc3RyaW5nO1xyXG59O1xyXG5cclxudHlwZSBBY3Rpdml0eURldGFpbFJlY29yZCA9IFJlY29yZDxzdHJpbmcsIHVua25vd24+O1xyXG5cclxudHlwZSBBY3Rpdml0eURldGFpbFJlc3BvbnNlID0ge1xyXG4gIHN1Y2Nlc3M/OiBib29sZWFuO1xyXG4gIG1lc3NhZ2U/OiBzdHJpbmc7XHJcbiAgZGF0YT86IEFjdGl2aXR5RGV0YWlsUmVjb3JkIHwgbnVsbDtcclxuICBTdWNjZXNzPzogYm9vbGVhbjtcclxuICBNZXNzYWdlPzogc3RyaW5nO1xyXG4gIERhdGE/OiBBY3Rpdml0eURldGFpbFJlY29yZCB8IG51bGw7XHJcbn07XHJcblxyXG5jb25zdCBpc1Jlc3BvbnNlU3VjY2VzcyA9IChyZXNwb25zZTogQWN0aXZpdHlEZXRhaWxSZXNwb25zZSk6IGJvb2xlYW4gPT4ge1xyXG4gIHJldHVybiByZXNwb25zZS5zdWNjZXNzID09PSB0cnVlIHx8IHJlc3BvbnNlLlN1Y2Nlc3MgPT09IHRydWU7XHJcbn07XHJcblxyXG5jb25zdCBnZXRSZXNwb25zZU1lc3NhZ2UgPSAocmVzcG9uc2U6IEFjdGl2aXR5RGV0YWlsUmVzcG9uc2UpOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IHJhdyA9IHJlc3BvbnNlLm1lc3NhZ2UgPz8gcmVzcG9uc2UuTWVzc2FnZTtcclxuICByZXR1cm4gdHlwZW9mIHJhdyA9PT0gXCJzdHJpbmdcIiA/IHJhdy50cmltKCkgOiBcIlwiO1xyXG59O1xyXG5cclxuY29uc3QgZ2V0UmVzcG9uc2VEYXRhID0gKHJlc3BvbnNlOiBBY3Rpdml0eURldGFpbFJlc3BvbnNlKTogQWN0aXZpdHlEZXRhaWxSZWNvcmQgfCBudWxsID0+IHtcclxuICBjb25zdCBkYXRhID0gcmVzcG9uc2UuZGF0YSA/PyByZXNwb25zZS5EYXRhO1xyXG4gIHJldHVybiBkYXRhICYmIHR5cGVvZiBkYXRhID09PSBcIm9iamVjdFwiID8gZGF0YSA6IG51bGw7XHJcbn07XHJcblxyXG5jb25zdCBhc1JlY29yZCA9ICh2YWx1ZTogdW5rbm93bik6IFJlY29yZDxzdHJpbmcsIHVua25vd24+IHwgbnVsbCA9PiB7XHJcbiAgaWYgKCF2YWx1ZSB8fCB0eXBlb2YgdmFsdWUgIT09IFwib2JqZWN0XCIgfHwgQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHJldHVybiBudWxsO1xyXG4gIHJldHVybiB2YWx1ZSBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPjtcclxufTtcclxuXHJcbnR5cGUgVXNlRGV0YWlsSHlkcmF0aW9uQXJncyA9IHtcclxuICBhY3RpdmlkYWRJZDogc3RyaW5nO1xyXG4gIHNob3VsZEh5ZHJhdGU6IGJvb2xlYW47XHJcbiAgdmlzaXRUeXBlczogT3B0aW9uTGlrZVtdO1xyXG4gIGNvbnRhY3RNZXRob2RzOiBPcHRpb25MaWtlW107XHJcbiAgYXNpc3RlbnRlVGlwb3M6IE9wdGlvbkxpa2VbXTtcclxuICBkZWZhdWx0VmlzaXRUeXBlOiBzdHJpbmc7XHJcbiAgaW5pdGlhbEFzaXN0ZW50ZTogc3RyaW5nO1xyXG4gIG5vcm1hbGl6ZURhdGVUb0lucHV0OiAodmFsdWU6IHN0cmluZykgPT4gc3RyaW5nO1xyXG4gIG1hdGNoT3B0aW9uVmFsdWU6IChvcHRpb25zOiBPcHRpb25MaWtlW10sIHJhdzogdW5rbm93bikgPT4gc3RyaW5nO1xyXG4gIGFwcGx5RHJhZnRWYWx1ZXM6ICgpID0+IHZvaWQ7XHJcbiAgYXBwbHlUZXh0RWRpdG9yVmFsdWVzOiAoKSA9PiB2b2lkO1xyXG4gIHNldFN0YXR1czogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgc2V0SXNIeWRyYXRpbmc6ICh2YWx1ZTogYm9vbGVhbikgPT4gdm9pZDtcclxuICBzZXRUcmFuc0RhdGU6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIHNldFZpc2l0VHlwZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgc2V0Q29udGFjdE1ldGhvZDogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgc2V0QXNpc3RlbnRlVGlwbzogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgc2V0RGVzY3JpcHRpb246ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIHNldENvbWVudGFyaW9zOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBzZXRBbnRlY2VkZW50ZXM6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIHNldENvbmNsdXNpb25lczogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbn07XHJcblxyXG4vLyBLZWVwcyBkZXRhaWwgaHlkcmF0aW9uIG9yY2hlc3RyYXRpb24gb3V0c2lkZSB0aGUgcGFnZSBjb21wb25lbnQuXHJcbmV4cG9ydCBjb25zdCB1c2VEZXRhaWxIeWRyYXRpb24gPSAoe1xyXG4gIGFjdGl2aWRhZElkLFxyXG4gIHNob3VsZEh5ZHJhdGUsXHJcbiAgdmlzaXRUeXBlcyxcclxuICBjb250YWN0TWV0aG9kcyxcclxuICBhc2lzdGVudGVUaXBvcyxcclxuICBkZWZhdWx0VmlzaXRUeXBlLFxyXG4gIGluaXRpYWxBc2lzdGVudGUsXHJcbiAgbm9ybWFsaXplRGF0ZVRvSW5wdXQsXHJcbiAgbWF0Y2hPcHRpb25WYWx1ZSxcclxuICBhcHBseURyYWZ0VmFsdWVzLFxyXG4gIGFwcGx5VGV4dEVkaXRvclZhbHVlcyxcclxuICBzZXRTdGF0dXMsXHJcbiAgc2V0SXNIeWRyYXRpbmcsXHJcbiAgc2V0VHJhbnNEYXRlLFxyXG4gIHNldFZpc2l0VHlwZSxcclxuICBzZXRDb250YWN0TWV0aG9kLFxyXG4gIHNldEFzaXN0ZW50ZVRpcG8sXHJcbiAgc2V0RGVzY3JpcHRpb24sXHJcbiAgc2V0Q29tZW50YXJpb3MsXHJcbiAgc2V0QW50ZWNlZGVudGVzLFxyXG4gIHNldENvbmNsdXNpb25lcyxcclxufTogVXNlRGV0YWlsSHlkcmF0aW9uQXJncykgPT4ge1xyXG4gIGNvbnN0IGh5ZHJhdGVGcm9tQXBpID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgaWYgKCFhY3RpdmlkYWRJZCkgcmV0dXJuO1xyXG4gICAgc2V0SXNIeWRyYXRpbmcodHJ1ZSk7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaEpzb248QWN0aXZpdHlEZXRhaWxSZXNwb25zZT4oYC9WaXNpdGFzL0dldEFjdGl2aXR5QnlDb2RlP2NvZGU9JHtlbmNvZGVVUklDb21wb25lbnQoYWN0aXZpZGFkSWQpfWApO1xyXG4gICAgICBjb25zdCByZXNwb25zZURhdGEgPSBnZXRSZXNwb25zZURhdGEocmVzKTtcclxuXHJcbiAgICAgIGlmICghaXNSZXNwb25zZVN1Y2Nlc3MocmVzKSB8fCAhcmVzcG9uc2VEYXRhKSB7XHJcbiAgICAgICAgc2V0U3RhdHVzKGdldFJlc3BvbnNlTWVzc2FnZShyZXMpIHx8IGluZFQoXCJWaXNpdHNfRGV0YWlsX0xvYWRBY3Rpdml0eUZhaWxlZFwiLCBcIkZhaWxlZCB0byBsb2FkIGFjdGl2aXR5IGRldGFpbHMuXCIpKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IHJhd0RhdGUgPSBTdHJpbmcocmVzcG9uc2VEYXRhLnRyYW5zRGF0ZSA/PyByZXNwb25zZURhdGEuVHJhbnNEYXRlID8/IFwiXCIpO1xyXG4gICAgICBzZXRUcmFuc0RhdGUobm9ybWFsaXplRGF0ZVRvSW5wdXQocmF3RGF0ZSkpO1xyXG5cclxuICAgICAgY29uc3QgcmF3VmlzaXRUeXBlID0gU3RyaW5nKFxyXG4gICAgICAgIHJlc3BvbnNlRGF0YS50aXBvVmlzaXRhID8/IHJlc3BvbnNlRGF0YS5UaXBvVmlzaXRhID8/IHJlc3BvbnNlRGF0YS52aXNpdFR5cGUgPz8gcmVzcG9uc2VEYXRhLlZpc2l0VHlwZSA/PyBcIlwiXHJcbiAgICAgICk7XHJcbiAgICAgIHNldFZpc2l0VHlwZShtYXRjaE9wdGlvblZhbHVlKHZpc2l0VHlwZXMsIHJhd1Zpc2l0VHlwZSkgfHwgZGVmYXVsdFZpc2l0VHlwZSk7XHJcblxyXG4gICAgICBjb25zdCByYXdDb250YWN0TWV0aG9kID0gU3RyaW5nKFxyXG4gICAgICAgIHJlc3BvbnNlRGF0YS5jb250YWN0TWV0aG9kID8/IHJlc3BvbnNlRGF0YS5Db250YWN0TWV0aG9kID8/IFwiXCJcclxuICAgICAgKTtcclxuICAgICAgc2V0Q29udGFjdE1ldGhvZChtYXRjaE9wdGlvblZhbHVlKGNvbnRhY3RNZXRob2RzLCByYXdDb250YWN0TWV0aG9kKSk7XHJcblxyXG4gICAgICBjb25zdCBhc2lzdGVudGVzTGlzdCA9IHJlc3BvbnNlRGF0YS5hc2lzdGVudGVzID8/IHJlc3BvbnNlRGF0YS5Bc2lzdGVudGVzO1xyXG4gICAgICBjb25zdCBmaXJzdEFzaXN0ZW50ZSA9IEFycmF5LmlzQXJyYXkoYXNpc3RlbnRlc0xpc3QpICYmIGFzaXN0ZW50ZXNMaXN0Lmxlbmd0aCA/IGFzUmVjb3JkKGFzaXN0ZW50ZXNMaXN0WzBdKSA6IG51bGw7XHJcbiAgICAgIGNvbnN0IHJhd0FzaXN0ZW50ZVRpcG8gPSBTdHJpbmcoXHJcbiAgICAgICAgcmVzcG9uc2VEYXRhLmFzaXN0ZW50ZVRpcG8gPz9cclxuICAgICAgICAgIHJlc3BvbnNlRGF0YS5Bc2lzdGVudGVUaXBvID8/XHJcbiAgICAgICAgICBmaXJzdEFzaXN0ZW50ZT8uYXNpc3RlbnRlVGlwbyA/P1xyXG4gICAgICAgICAgZmlyc3RBc2lzdGVudGU/LkFzaXN0ZW50ZVRpcG8gPz9cclxuICAgICAgICAgIFwiXCJcclxuICAgICAgKTtcclxuICAgICAgY29uc3Qgbm9ybWFsaXplZEFzaXN0ZW50ZVRpcG8gPSBtYXRjaE9wdGlvblZhbHVlKGFzaXN0ZW50ZVRpcG9zLCByYXdBc2lzdGVudGVUaXBvKTtcclxuICAgICAgc2V0QXNpc3RlbnRlVGlwbyhub3JtYWxpemVkQXNpc3RlbnRlVGlwbyB8fCBpbml0aWFsQXNpc3RlbnRlKTtcclxuICAgICAgc2V0RGVzY3JpcHRpb24oU3RyaW5nKHJlc3BvbnNlRGF0YS5kZXNjcmlwdGlvbiA/PyByZXNwb25zZURhdGEuRGVzY3JpcHRpb24gPz8gXCJcIikpO1xyXG4gICAgICBzZXRDb21lbnRhcmlvcyhTdHJpbmcocmVzcG9uc2VEYXRhLmNvbWVudGFyaW9zID8/IHJlc3BvbnNlRGF0YS5Db21lbnRhcmlvcyA/PyBcIlwiKSk7XHJcbiAgICAgIHNldEFudGVjZWRlbnRlcyhTdHJpbmcocmVzcG9uc2VEYXRhLmFudGVjZWRlbnRlcyA/PyByZXNwb25zZURhdGEuQW50ZWNlZGVudGVzID8/IFwiXCIpKTtcclxuICAgICAgc2V0Q29uY2x1c2lvbmVzKFN0cmluZyhyZXNwb25zZURhdGEuY29uY2x1c2lvbmVzID8/IHJlc3BvbnNlRGF0YS5Db25jbHVzaW9uZXMgPz8gXCJcIikpO1xyXG4gICAgfSBjYXRjaCB7XHJcbiAgICAgIC8vIEtlZXAgcHJldmlvdXMgVUkgYmVoYXZpb3Igb24gaHlkcmF0aW9uIGVycm9ycy5cclxuICAgIH0gZmluYWxseSB7XHJcbiAgICAgIHNldElzSHlkcmF0aW5nKGZhbHNlKTtcclxuICAgICAgYXBwbHlEcmFmdFZhbHVlcygpO1xyXG4gICAgICBhcHBseVRleHRFZGl0b3JWYWx1ZXMoKTtcclxuICAgIH1cclxuICB9LCBbXHJcbiAgICBhY3RpdmlkYWRJZCxcclxuICAgIGFwcGx5RHJhZnRWYWx1ZXMsXHJcbiAgICBhcHBseVRleHRFZGl0b3JWYWx1ZXMsXHJcbiAgICBhc2lzdGVudGVUaXBvcyxcclxuICAgIGNvbnRhY3RNZXRob2RzLFxyXG4gICAgZGVmYXVsdFZpc2l0VHlwZSxcclxuICAgIGluaXRpYWxBc2lzdGVudGUsXHJcbiAgICBtYXRjaE9wdGlvblZhbHVlLFxyXG4gICAgbm9ybWFsaXplRGF0ZVRvSW5wdXQsXHJcbiAgICBzZXRBbnRlY2VkZW50ZXMsXHJcbiAgICBzZXRBc2lzdGVudGVUaXBvLFxyXG4gICAgc2V0Q29tZW50YXJpb3MsXHJcbiAgICBzZXRDb25jbHVzaW9uZXMsXHJcbiAgICBzZXREZXNjcmlwdGlvbixcclxuICAgIHNldElzSHlkcmF0aW5nLFxyXG4gICAgc2V0U3RhdHVzLFxyXG4gICAgc2V0VHJhbnNEYXRlLFxyXG4gICAgc2V0VmlzaXRUeXBlLFxyXG4gICAgc2V0Q29udGFjdE1ldGhvZCxcclxuICAgIHZpc2l0VHlwZXMsXHJcbiAgXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoc2hvdWxkSHlkcmF0ZSkge1xyXG4gICAgICBoeWRyYXRlRnJvbUFwaSgpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBhcHBseURyYWZ0VmFsdWVzKCk7XHJcbiAgICBhcHBseVRleHRFZGl0b3JWYWx1ZXMoKTtcclxuICB9LCBbYXBwbHlEcmFmdFZhbHVlcywgYXBwbHlUZXh0RWRpdG9yVmFsdWVzLCBoeWRyYXRlRnJvbUFwaSwgc2hvdWxkSHlkcmF0ZV0pO1xyXG59O1xyXG4iLCAiaW1wb3J0IHsgdXNlRWZmZWN0IH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IHdhaXQgfSBmcm9tIFwiLi4vdXRpbHMvd2FpdC50c1wiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHsgc2hvd1Blcm1pc3Npb25Nb2RhbCB9IGZyb20gXCIuLi91dGlscy9wZXJtaXNzaW9ucy50c1wiO1xyXG5pbXBvcnQgeyBzZXRIaXN0b3J5RmlsdGVyRm9yRGF0ZSwgZmxhc2hBY3Rpb25NYXJrIH0gZnJvbSBcIi4uL3V0aWxzL3Zpc2l0YXNIaXN0b3J5LnRzXCI7XHJcbmltcG9ydCB7IHNldFRvcGJhckFjdGlvbkdyb3VwUmVhZHkgfSBmcm9tIFwiLi4vdXRpbHMvdG9wYmFyQWN0aW9uVmlzaWJpbGl0eS50c1wiO1xyXG5cclxudHlwZSBVc2VEZXRhaWxUb3BiYXJBY3Rpb25zQXJncyA9IHtcclxuICBidXN5OiBib29sZWFuO1xyXG4gIG1vZGFsT3BlbjogYm9vbGVhbjtcclxuICBpc0VkaXRpbmc6IGJvb2xlYW47XHJcbiAgY2FuRWRpdEhpc3Rvcnk6IGJvb2xlYW47XHJcbiAgY2FuRGVsZXRlSGlzdG9yeTogYm9vbGVhbjtcclxuICB0cmFuc0RhdGU6IHN0cmluZztcclxuICBzZXRNb2RhbEVycm9yOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBoYW5kbGVFbmFibGVFZGl0OiAoKSA9PiB2b2lkO1xyXG4gIGhhbmRsZUNhbmNlbEVkaXQ6ICgpID0+IHZvaWQ7XHJcbiAgaGFuZGxlVXBkYXRlOiAoKSA9PiBQcm9taXNlPGJvb2xlYW4+O1xyXG4gIGhhbmRsZURlbGV0ZTogKCkgPT4gUHJvbWlzZTxib29sZWFuPjtcclxuICBhY3Rpb25Hcm91cElkPzogc3RyaW5nO1xyXG4gIHBlcm1pc3Npb25zUmVhZHk/OiBib29sZWFuO1xyXG4gIG9wZW5Db25maXJtOiAob3B0czoge1xyXG4gICAgdGl0bGU6IHN0cmluZztcclxuICAgIG1lc3NhZ2U6IHN0cmluZztcclxuICAgIGNvbmZpcm1UZXh0Pzogc3RyaW5nO1xyXG4gICAgb25Db25maXJtPzogKCkgPT4gUHJvbWlzZTxib29sZWFuIHwgdm9pZD4gfCBib29sZWFuIHwgdm9pZDtcclxuICB9KSA9PiB2b2lkO1xyXG4gIGNsb3NlQ29uZmlybTogKCkgPT4gdm9pZDtcclxufTtcclxuXHJcbi8vIENvb3JkaW5hdGVzIHRvcGJhciBpY29uIHZpc2liaWxpdHkgYW5kIGFjdGlvbiBldmVudHMgZm9yIGRldGFpbCBwYWdlLlxyXG5leHBvcnQgY29uc3QgdXNlRGV0YWlsVG9wYmFyQWN0aW9ucyA9ICh7XHJcbiAgYnVzeSxcclxuICBtb2RhbE9wZW4sXHJcbiAgaXNFZGl0aW5nLFxyXG4gIGNhbkVkaXRIaXN0b3J5LFxyXG4gIGNhbkRlbGV0ZUhpc3RvcnksXHJcbiAgdHJhbnNEYXRlLFxyXG4gIHNldE1vZGFsRXJyb3IsXHJcbiAgaGFuZGxlRW5hYmxlRWRpdCxcclxuICBoYW5kbGVDYW5jZWxFZGl0LFxyXG4gIGhhbmRsZVVwZGF0ZSxcclxuICBoYW5kbGVEZWxldGUsXHJcbiAgYWN0aW9uR3JvdXBJZCA9IFwidmlzaXQtZGV0YWlsLWFjdGlvbnNcIixcclxuICBwZXJtaXNzaW9uc1JlYWR5ID0gdHJ1ZSxcclxuICBvcGVuQ29uZmlybSxcclxuICBjbG9zZUNvbmZpcm0sXHJcbn06IFVzZURldGFpbFRvcGJhckFjdGlvbnNBcmdzKSA9PiB7XHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghcGVybWlzc2lvbnNSZWFkeSkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IGVkaXRJY29uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2aXNpdEVkaXRJY29uXCIpO1xyXG4gICAgY29uc3Qgc2F2ZUljb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpc2l0U2F2ZUljb25cIik7XG4gICAgY29uc3QgZGVsZXRlQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2aXNpdERlbGV0ZUJ0blwiKTtcbiAgICBjb25zdCBjYW5jZWxCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpc2l0Q2FuY2VsQnRuXCIpO1xuICAgIGNvbnN0IGVkaXRCdG4gPSBlZGl0SWNvbj8uY2xvc2VzdChcImJ1dHRvblwiKSA/PyBudWxsO1xuICAgIGlmIChpc0VkaXRpbmcpIHtcbiAgICAgIGlmIChlZGl0QnRuKSBlZGl0QnRuLmNsYXNzTGlzdC50b2dnbGUoXCJ0b3BiYXItaGlkZGVuXCIsICFjYW5FZGl0SGlzdG9yeSk7XG4gICAgICBpZiAoZWRpdEljb24pIGVkaXRJY29uLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICBpZiAoc2F2ZUljb24pIHNhdmVJY29uLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gICAgICBpZiAoZGVsZXRlQnRuKSBkZWxldGVCdG4uY2xhc3NMaXN0LmFkZChcInRvcGJhci1oaWRkZW5cIik7XG4gICAgICBpZiAoY2FuY2VsQnRuKSBjYW5jZWxCdG4uY2xhc3NMaXN0LnJlbW92ZShcInRvcGJhci1oaWRkZW5cIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChlZGl0QnRuKSBlZGl0QnRuLmNsYXNzTGlzdC50b2dnbGUoXCJ0b3BiYXItaGlkZGVuXCIsICFjYW5FZGl0SGlzdG9yeSk7XG4gICAgICBpZiAoZWRpdEljb24pIGVkaXRJY29uLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gICAgICBpZiAoc2F2ZUljb24pIHNhdmVJY29uLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICBpZiAoZGVsZXRlQnRuKSBkZWxldGVCdG4uY2xhc3NMaXN0LnRvZ2dsZShcInRvcGJhci1oaWRkZW5cIiwgIWNhbkRlbGV0ZUhpc3RvcnkpO1xuICAgICAgaWYgKGNhbmNlbEJ0bikgY2FuY2VsQnRuLmNsYXNzTGlzdC5hZGQoXCJ0b3BiYXItaGlkZGVuXCIpO1xuICAgIH1cblxuICAgIHNldFRvcGJhckFjdGlvbkdyb3VwUmVhZHkoYWN0aW9uR3JvdXBJZCk7XG4gIH0sIFthY3Rpb25Hcm91cElkLCBjYW5EZWxldGVIaXN0b3J5LCBjYW5FZGl0SGlzdG9yeSwgaXNFZGl0aW5nLCBwZXJtaXNzaW9uc1JlYWR5XSk7XG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFwZXJtaXNzaW9uc1JlYWR5KSByZXR1cm47XHJcblxyXG4gICAgY29uc3Qgb25FZGl0ID0gKCkgPT4ge1xyXG4gICAgICBpZiAoIWNhbkVkaXRIaXN0b3J5KSB7XHJcbiAgICAgICAgc2hvd1Blcm1pc3Npb25Nb2RhbCgpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBpZiAoaXNFZGl0aW5nKSB7XHJcbiAgICAgICAgaWYgKGJ1c3kgfHwgbW9kYWxPcGVuKSByZXR1cm47XHJcbiAgICAgICAgc2V0TW9kYWxFcnJvcihcIlwiKTtcclxuICAgICAgICBvcGVuQ29uZmlybSh7XHJcbiAgICAgICAgICB0aXRsZTogaW5kVChcIlZpc2l0c19EZXRhaWxfU2F2ZUNoYW5nZXNfVGl0bGVcIiwgXCJWaXNpdHNfRGV0YWlsX1NhdmVDaGFuZ2VzX1RpdGxlXCIpLFxyXG4gICAgICAgICAgbWVzc2FnZTogaW5kVChcIlZpc2l0c19EZXRhaWxfU2F2ZUNoYW5nZXNfQm9keVwiLCBcIlZpc2l0c19EZXRhaWxfU2F2ZUNoYW5nZXNfQm9keVwiKSxcclxuICAgICAgICAgIGNvbmZpcm1UZXh0OiBpbmRUKFwiQ29tbW9uX1NhdmVcIiwgXCJDb21tb25fU2F2ZVwiKSxcclxuICAgICAgICAgIG9uQ29uZmlybTogYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBvayA9IGF3YWl0IGhhbmRsZVVwZGF0ZSgpO1xyXG4gICAgICAgICAgICBpZiAob2spIHtcclxuICAgICAgICAgICAgICBjbG9zZUNvbmZpcm0oKTtcclxuICAgICAgICAgICAgICBzZXRIaXN0b3J5RmlsdGVyRm9yRGF0ZSh0cmFuc0RhdGUpO1xyXG4gICAgICAgICAgICAgIGF3YWl0IHdhaXQoMjAwKTtcclxuICAgICAgICAgICAgICBmbGFzaEFjdGlvbk1hcmsoXCJva1Byb2Nlc3NcIiwgMTIwMCk7XHJcbiAgICAgICAgICAgICAgYXdhaXQgd2FpdCgxMjAwKTtcclxuICAgICAgICAgICAgICB3aW5kb3cuX19pbmRCeXBhc3NOYXZpZ2F0aW9uR3VhcmRPbmNlPy4oKTtcclxuICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL0hpc3RvcmlhbC9IaXN0b3J5XCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG9rO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBoYW5kbGVFbmFibGVFZGl0KCk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgY29uc3Qgb25EZWxldGUgPSAoKSA9PiB7XHJcbiAgICAgIGlmICghY2FuRGVsZXRlSGlzdG9yeSkge1xyXG4gICAgICAgIHNob3dQZXJtaXNzaW9uTW9kYWwoKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGJ1c3kgfHwgbW9kYWxPcGVuKSByZXR1cm47XHJcbiAgICAgIHNldE1vZGFsRXJyb3IoXCJcIik7XHJcbiAgICAgIG9wZW5Db25maXJtKHtcclxuICAgICAgICB0aXRsZTogaW5kVChcIlZpc2l0c19EZXRhaWxfRGVsZXRlQWN0aXZpdHlfVGl0bGVcIiwgXCJWaXNpdHNfRGV0YWlsX0RlbGV0ZUFjdGl2aXR5X1RpdGxlXCIpLFxyXG4gICAgICAgIG1lc3NhZ2U6IGluZFQoXCJWaXNpdHNfRGV0YWlsX0RlbGV0ZUFjdGl2aXR5X0JvZHlcIiwgXCJWaXNpdHNfRGV0YWlsX0RlbGV0ZUFjdGl2aXR5X0JvZHlcIiksXHJcbiAgICAgICAgY29uZmlybVRleHQ6IGluZFQoXCJDb21tb25fRGVsZXRlXCIsIFwiQ29tbW9uX0RlbGV0ZVwiKSxcclxuICAgICAgICBvbkNvbmZpcm06IGFzeW5jICgpID0+IHtcclxuICAgICAgICAgIGNvbnN0IG9rID0gYXdhaXQgaGFuZGxlRGVsZXRlKCk7XHJcbiAgICAgICAgICBpZiAob2spIHtcclxuICAgICAgICAgICAgY2xvc2VDb25maXJtKCk7XHJcbiAgICAgICAgICAgIHNldEhpc3RvcnlGaWx0ZXJGb3JEYXRlKHRyYW5zRGF0ZSk7XHJcbiAgICAgICAgICAgIGF3YWl0IHdhaXQoMjAwKTtcclxuICAgICAgICAgICAgZmxhc2hBY3Rpb25NYXJrKFwib2tEZWxQcm9jZXNzXCIsIDEyMDApO1xyXG4gICAgICAgICAgICBhd2FpdCB3YWl0KDEyMDApO1xyXG4gICAgICAgICAgICB3aW5kb3cuX19pbmRCeXBhc3NOYXZpZ2F0aW9uR3VhcmRPbmNlPy4oKTtcclxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9IaXN0b3JpYWwvSGlzdG9yeVwiO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIG9rO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBvbkNhbmNlbEVkaXQgPSAoKSA9PiB7XHJcbiAgICAgIGlmIChidXN5IHx8IG1vZGFsT3BlbikgcmV0dXJuO1xyXG4gICAgICBoYW5kbGVDYW5jZWxFZGl0KCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwidmlzaXQtZWRpdFwiLCBvbkVkaXQpO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJ2aXNpdC1kZWxldGVcIiwgb25EZWxldGUpO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJ2aXNpdC1jYW5jZWwtZWRpdFwiLCBvbkNhbmNlbEVkaXQpO1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ2aXNpdC1lZGl0XCIsIG9uRWRpdCk7XHJcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwidmlzaXQtZGVsZXRlXCIsIG9uRGVsZXRlKTtcclxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ2aXNpdC1jYW5jZWwtZWRpdFwiLCBvbkNhbmNlbEVkaXQpO1xyXG4gICAgfTtcclxuICB9LCBbXHJcbiAgICBidXN5LFxyXG4gICAgY2FuRGVsZXRlSGlzdG9yeSxcclxuICAgIGNhbkVkaXRIaXN0b3J5LFxyXG4gICAgY2xvc2VDb25maXJtLFxyXG4gICAgaGFuZGxlQ2FuY2VsRWRpdCxcclxuICAgIGhhbmRsZURlbGV0ZSxcclxuICAgIGhhbmRsZUVuYWJsZUVkaXQsXHJcbiAgICBoYW5kbGVVcGRhdGUsXHJcbiAgICBpc0VkaXRpbmcsXHJcbiAgICBtb2RhbE9wZW4sXHJcbiAgICBvcGVuQ29uZmlybSxcclxuICAgIHBlcm1pc3Npb25zUmVhZHksXHJcbiAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgdHJhbnNEYXRlLFxyXG4gIF0pO1xyXG59O1xyXG4iLCAiXHVGRUZGaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZVJlZiB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBnZXRTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5LCByZW1vdmVTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5LCBzZXRTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5IH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3Nlc3Npb25FeHBpcnkudHNcIjtcclxuXHJcbmNvbnN0IEVESVRfTU9ERV9UVExfTVMgPSA2ICogNjAgKiA2MCAqIDEwMDA7XHJcbmNvbnN0IERFVEFJTF9EUkFGVF9UVExfTVMgPSAyNCAqIDYwICogNjAgKiAxMDAwO1xyXG5cclxudHlwZSBVc2VEZXRhaWxFZGl0U2Vzc2lvbkFyZ3MgPSB7XHJcbiAgYWN0aXZpZGFkSWQ6IHN0cmluZztcclxuICByZWNJZDogc3RyaW5nO1xyXG4gIGNhbkVkaXRIaXN0b3J5OiBib29sZWFuO1xyXG4gIGlzRWRpdGluZzogYm9vbGVhbjtcclxuICBzZXRJc0VkaXRpbmc6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPGJvb2xlYW4+PjtcbiAgdHJhbnNEYXRlOiBzdHJpbmc7XG4gIHZpc2l0VHlwZTogc3RyaW5nO1xuICBjb250YWN0TWV0aG9kOiBzdHJpbmc7XG4gIGFzaXN0ZW50ZVRpcG86IHN0cmluZztcbiAgZGVzY3JpcHRpb246IHN0cmluZztcclxuICBjb21lbnRhcmlvczogc3RyaW5nO1xyXG4gIGFudGVjZWRlbnRlczogc3RyaW5nO1xyXG4gIGNvbmNsdXNpb25lczogc3RyaW5nO1xyXG4gIHNldFRyYW5zRGF0ZTogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XG4gIHNldFZpc2l0VHlwZTogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XG4gIHNldENvbnRhY3RNZXRob2Q6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPHN0cmluZz4+O1xuICBzZXRBc2lzdGVudGVUaXBvOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcbiAgc2V0RGVzY3JpcHRpb246IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPHN0cmluZz4+O1xyXG4gIHNldENvbWVudGFyaW9zOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcclxuICBzZXRBbnRlY2VkZW50ZXM6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPHN0cmluZz4+O1xyXG4gIHNldENvbmNsdXNpb25lczogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XHJcbn07XHJcblxyXG50eXBlIERldGFpbERyYWZ0VmFsdWVzID0ge1xyXG4gIHRyYW5zRGF0ZTogc3RyaW5nO1xuICB2aXNpdFR5cGU6IHN0cmluZztcbiAgY29udGFjdE1ldGhvZDogc3RyaW5nO1xuICBhc2lzdGVudGVUaXBvOiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgY29tZW50YXJpb3M6IHN0cmluZztcclxuICBhbnRlY2VkZW50ZXM6IHN0cmluZztcclxuICBjb25jbHVzaW9uZXM6IHN0cmluZztcclxufTtcclxuXHJcbi8vIE1hbmFnZXMgZWRpdC1tb2RlIHNlc3Npb24gZmxhZ3MgYW5kIGRldGFpbCBkcmFmdCBwZXJzaXN0ZW5jZS5cclxuZXhwb3J0IGNvbnN0IHVzZURldGFpbEVkaXRTZXNzaW9uID0gKHtcclxuICBhY3RpdmlkYWRJZCxcclxuICByZWNJZCxcclxuICBjYW5FZGl0SGlzdG9yeSxcclxuICBpc0VkaXRpbmcsXHJcbiAgc2V0SXNFZGl0aW5nLFxyXG4gIHRyYW5zRGF0ZSxcbiAgdmlzaXRUeXBlLFxuICBjb250YWN0TWV0aG9kLFxuICBhc2lzdGVudGVUaXBvLFxuICBkZXNjcmlwdGlvbixcclxuICBjb21lbnRhcmlvcyxcclxuICBhbnRlY2VkZW50ZXMsXHJcbiAgY29uY2x1c2lvbmVzLFxyXG4gIHNldFRyYW5zRGF0ZSxcbiAgc2V0VmlzaXRUeXBlLFxuICBzZXRDb250YWN0TWV0aG9kLFxuICBzZXRBc2lzdGVudGVUaXBvLFxuICBzZXREZXNjcmlwdGlvbixcclxuICBzZXRDb21lbnRhcmlvcyxcclxuICBzZXRBbnRlY2VkZW50ZXMsXHJcbiAgc2V0Q29uY2x1c2lvbmVzLFxyXG59OiBVc2VEZXRhaWxFZGl0U2Vzc2lvbkFyZ3MpID0+IHtcclxuICBjb25zdCBlZGl0TW9kZUtleVJlZiA9IHVzZVJlZihcIlwiKTtcclxuICBjb25zdCBkcmFmdEtleVJlZiA9IHVzZVJlZihcIlwiKTtcclxuICBjb25zdCBkcmFmdFBlcnNpc3RUaW1lclJlZiA9IHVzZVJlZjxudW1iZXIgfCBudWxsPihudWxsKTtcclxuXHJcbiAgLy8gUGVyc2lzdCBlZGl0IG1vZGUgd2hpbGUgdXNlciBuYXZpZ2F0ZXMgdG8gdGhlIHRleHQgZWRpdG9yIGFuZCBiYWNrLlxyXG4gIGNvbnN0IHN5bmNFZGl0TW9kZUZsYWcgPSB1c2VDYWxsYmFjaygoZW5hYmxlZDogYm9vbGVhbikgPT4ge1xyXG4gICAgY29uc3Qga2V5ID0gZWRpdE1vZGVLZXlSZWYuY3VycmVudDtcclxuICAgIGlmICgha2V5KSByZXR1cm47XHJcbiAgICBpZiAoZW5hYmxlZCkge1xyXG4gICAgICBzZXRTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KGtleSwgXCJ0cnVlXCIsIEVESVRfTU9ERV9UVExfTVMpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICByZW1vdmVTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KGtleSk7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBzeW5jRWRpdE1vZGVPbkVudHJ5ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgY29uc3QgYmFzZUlkID0gYWN0aXZpZGFkSWQgfHwgcmVjSWQgfHwgXCJkZWZhdWx0XCI7XHJcbiAgICBjb25zdCBrZXkgPSBgaW5kX3Zpc2l0X2VkaXRfJHtiYXNlSWR9YDtcclxuICAgIGNvbnN0IHJldHVybktleSA9IGAke2tleX1fcmV0dXJuYDtcclxuICAgIGNvbnN0IGRyYWZ0S2V5ID0gYGluZF92aXNpdF9kcmFmdF8ke2Jhc2VJZH1gO1xyXG4gICAgZWRpdE1vZGVLZXlSZWYuY3VycmVudCA9IGtleTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBhbGxvd1Jlc3RvcmUgPSBnZXRTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KHJldHVybktleSkgPT09IFwiMVwiO1xyXG4gICAgICBpZiAoYWxsb3dSZXN0b3JlKSB7XHJcbiAgICAgICAgcmVtb3ZlU2Vzc2lvblZhbHVlV2l0aEV4cGlyeShyZXR1cm5LZXkpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoY2FuRWRpdEhpc3RvcnkgJiYgYWxsb3dSZXN0b3JlICYmIGdldFNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoa2V5KSA9PT0gXCJ0cnVlXCIpIHtcclxuICAgICAgICBzZXRJc0VkaXRpbmcodHJ1ZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc2V0SXNFZGl0aW5nKGZhbHNlKTtcclxuICAgICAgICByZW1vdmVTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KGtleSk7XHJcbiAgICAgICAgcmVtb3ZlU2Vzc2lvblZhbHVlV2l0aEV4cGlyeShkcmFmdEtleSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICghY2FuRWRpdEhpc3RvcnkpIHtcclxuICAgICAgICByZW1vdmVTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KGtleSk7XHJcbiAgICAgICAgcmVtb3ZlU2Vzc2lvblZhbHVlV2l0aEV4cGlyeShkcmFmdEtleSk7XHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2gge1xyXG4gICAgICAvKiBpZ25vcmUgKi9cclxuICAgIH1cclxuICB9LCBbYWN0aXZpZGFkSWQsIGNhbkVkaXRIaXN0b3J5LCByZWNJZCwgc2V0SXNFZGl0aW5nXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBzeW5jRWRpdE1vZGVPbkVudHJ5KCk7XHJcbiAgfSwgW3N5bmNFZGl0TW9kZU9uRW50cnldKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IG9uUGFnZVNob3cgPSAoZXZlbnQ6IFBhZ2VUcmFuc2l0aW9uRXZlbnQpID0+IHtcclxuICAgICAgY29uc3QgbmF2RW50cnkgPSB0eXBlb2YgcGVyZm9ybWFuY2UgIT09IFwidW5kZWZpbmVkXCIgJiYgcGVyZm9ybWFuY2UuZ2V0RW50cmllc0J5VHlwZVxyXG4gICAgICAgID8gKHBlcmZvcm1hbmNlLmdldEVudHJpZXNCeVR5cGUoXCJuYXZpZ2F0aW9uXCIpWzBdIGFzIFBlcmZvcm1hbmNlTmF2aWdhdGlvblRpbWluZyB8IHVuZGVmaW5lZClcclxuICAgICAgICA6IHVuZGVmaW5lZDtcclxuICAgICAgY29uc3QgaXNCYWNrRm9yd2FyZCA9IG5hdkVudHJ5Py50eXBlID09PSBcImJhY2tfZm9yd2FyZFwiO1xyXG4gICAgICBpZiAoZXZlbnQ/LnBlcnNpc3RlZCB8fCBpc0JhY2tGb3J3YXJkKSB7XHJcbiAgICAgICAgc3luY0VkaXRNb2RlT25FbnRyeSgpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicGFnZXNob3dcIiwgb25QYWdlU2hvdyk7XHJcbiAgICByZXR1cm4gKCkgPT4gd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwYWdlc2hvd1wiLCBvblBhZ2VTaG93KTtcclxuICB9LCBbc3luY0VkaXRNb2RlT25FbnRyeV0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3Qga2V5ID0gYGluZF92aXNpdF9kcmFmdF8ke2FjdGl2aWRhZElkIHx8IHJlY0lkIHx8IFwiZGVmYXVsdFwifWA7XHJcbiAgICBkcmFmdEtleVJlZi5jdXJyZW50ID0ga2V5O1xyXG4gIH0sIFthY3RpdmlkYWRJZCwgcmVjSWRdKTtcclxuXHJcbiAgY29uc3Qgc2F2ZURyYWZ0ID0gdXNlQ2FsbGJhY2soKGRyYWZ0OiBEZXRhaWxEcmFmdFZhbHVlcykgPT4ge1xyXG4gICAgY29uc3Qga2V5ID0gZHJhZnRLZXlSZWYuY3VycmVudDtcclxuICAgIGlmICgha2V5KSByZXR1cm47XHJcbiAgICBzZXRTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KGtleSwgSlNPTi5zdHJpbmdpZnkoZHJhZnQpLCBERVRBSUxfRFJBRlRfVFRMX01TKTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IGNsZWFyRHJhZnQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBjb25zdCBrZXkgPSBkcmFmdEtleVJlZi5jdXJyZW50O1xyXG4gICAgaWYgKCFrZXkpIHJldHVybjtcclxuICAgIHJlbW92ZVNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoa2V5KTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IGFwcGx5RHJhZnRWYWx1ZXMgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBjb25zdCBrZXkgPSBkcmFmdEtleVJlZi5jdXJyZW50O1xyXG4gICAgaWYgKCFrZXkpIHJldHVybjtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCByYXcgPSBnZXRTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KGtleSk7XHJcbiAgICAgIGlmICghcmF3KSByZXR1cm47XHJcbiAgICAgIGNvbnN0IGRyYWZ0ID0gSlNPTi5wYXJzZShyYXcpIGFzIFBhcnRpYWw8RGV0YWlsRHJhZnRWYWx1ZXM+O1xyXG4gICAgICBpZiAoIWRyYWZ0IHx8IHR5cGVvZiBkcmFmdCAhPT0gXCJvYmplY3RcIikgcmV0dXJuO1xyXG5cclxuICAgICAgaWYgKGRyYWZ0LnRyYW5zRGF0ZSAhPT0gdW5kZWZpbmVkKSBzZXRUcmFuc0RhdGUoU3RyaW5nKGRyYWZ0LnRyYW5zRGF0ZSkpO1xuICAgICAgaWYgKGRyYWZ0LnZpc2l0VHlwZSAhPT0gdW5kZWZpbmVkKSBzZXRWaXNpdFR5cGUoU3RyaW5nKGRyYWZ0LnZpc2l0VHlwZSkpO1xuICAgICAgaWYgKGRyYWZ0LmNvbnRhY3RNZXRob2QgIT09IHVuZGVmaW5lZCkgc2V0Q29udGFjdE1ldGhvZChTdHJpbmcoZHJhZnQuY29udGFjdE1ldGhvZCkpO1xuICAgICAgaWYgKGRyYWZ0LmFzaXN0ZW50ZVRpcG8gIT09IHVuZGVmaW5lZCkgc2V0QXNpc3RlbnRlVGlwbyhTdHJpbmcoZHJhZnQuYXNpc3RlbnRlVGlwbykpO1xuICAgICAgaWYgKGRyYWZ0LmRlc2NyaXB0aW9uICE9PSB1bmRlZmluZWQpIHNldERlc2NyaXB0aW9uKFN0cmluZyhkcmFmdC5kZXNjcmlwdGlvbikpO1xyXG4gICAgICBpZiAoZHJhZnQuY29tZW50YXJpb3MgIT09IHVuZGVmaW5lZCkgc2V0Q29tZW50YXJpb3MoU3RyaW5nKGRyYWZ0LmNvbWVudGFyaW9zKSk7XHJcbiAgICAgIGlmIChkcmFmdC5hbnRlY2VkZW50ZXMgIT09IHVuZGVmaW5lZCkgc2V0QW50ZWNlZGVudGVzKFN0cmluZyhkcmFmdC5hbnRlY2VkZW50ZXMpKTtcclxuICAgICAgaWYgKGRyYWZ0LmNvbmNsdXNpb25lcyAhPT0gdW5kZWZpbmVkKSBzZXRDb25jbHVzaW9uZXMoU3RyaW5nKGRyYWZ0LmNvbmNsdXNpb25lcykpO1xyXG4gICAgfSBjYXRjaCB7XHJcbiAgICAgIC8qIGlnbm9yZSAqL1xyXG4gICAgfVxyXG4gIH0sIFtzZXRBbnRlY2VkZW50ZXMsIHNldEFzaXN0ZW50ZVRpcG8sIHNldENvbWVudGFyaW9zLCBzZXRDb25jbHVzaW9uZXMsIHNldENvbnRhY3RNZXRob2QsIHNldERlc2NyaXB0aW9uLCBzZXRUcmFuc0RhdGUsIHNldFZpc2l0VHlwZV0pO1xuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghaXNFZGl0aW5nKSB7XHJcbiAgICAgIGlmIChkcmFmdFBlcnNpc3RUaW1lclJlZi5jdXJyZW50KSB7XHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KGRyYWZ0UGVyc2lzdFRpbWVyUmVmLmN1cnJlbnQpO1xyXG4gICAgICAgIGRyYWZ0UGVyc2lzdFRpbWVyUmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZHJhZnRQZXJzaXN0VGltZXJSZWYuY3VycmVudCkge1xyXG4gICAgICBjbGVhclRpbWVvdXQoZHJhZnRQZXJzaXN0VGltZXJSZWYuY3VycmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhZnRQZXJzaXN0VGltZXJSZWYuY3VycmVudCA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgZHJhZnRQZXJzaXN0VGltZXJSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgIHNhdmVEcmFmdCh7XHJcbiAgICAgICAgdHJhbnNEYXRlLFxuICAgICAgICB2aXNpdFR5cGUsXG4gICAgICAgIGNvbnRhY3RNZXRob2QsXG4gICAgICAgIGFzaXN0ZW50ZVRpcG8sXG4gICAgICAgIGRlc2NyaXB0aW9uLFxyXG4gICAgICAgIGNvbWVudGFyaW9zLFxyXG4gICAgICAgIGFudGVjZWRlbnRlcyxcclxuICAgICAgICBjb25jbHVzaW9uZXMsXHJcbiAgICAgIH0pO1xyXG4gICAgfSwgMTgwKTtcclxuXHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBpZiAoZHJhZnRQZXJzaXN0VGltZXJSZWYuY3VycmVudCkge1xyXG4gICAgICAgIGNsZWFyVGltZW91dChkcmFmdFBlcnNpc3RUaW1lclJlZi5jdXJyZW50KTtcclxuICAgICAgICBkcmFmdFBlcnNpc3RUaW1lclJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9LCBbYW50ZWNlZGVudGVzLCBhc2lzdGVudGVUaXBvLCBjb21lbnRhcmlvcywgY29uY2x1c2lvbmVzLCBjb250YWN0TWV0aG9kLCBkZXNjcmlwdGlvbiwgaXNFZGl0aW5nLCBzYXZlRHJhZnQsIHRyYW5zRGF0ZSwgdmlzaXRUeXBlXSk7XG5cclxuICByZXR1cm4ge1xyXG4gICAgZWRpdE1vZGVLZXlSZWYsXHJcbiAgICBzeW5jRWRpdE1vZGVGbGFnLFxyXG4gICAgY2xlYXJEcmFmdCxcclxuICAgIGFwcGx5RHJhZnRWYWx1ZXMsXHJcbiAgfTtcclxufTtcclxuIiwgIlx1RkVGRmltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjayB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBmZXRjaEpzb24gfSBmcm9tIFwiLi4vLi4vLi4vc2VydmljZXMvYXBpU2VydmljZS50c1wiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHsgc2hvd1Blcm1pc3Npb25Nb2RhbCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9wZXJtaXNzaW9ucy50c1wiO1xyXG5pbXBvcnQgeyBmbGFzaEFjdGlvbk1hcmsgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvdmlzaXRhc0hpc3RvcnkudHNcIjtcclxuXHJcbnR5cGUgT3B0aW9uTGlrZSA9IHtcclxuICB2YWx1ZT86IHN0cmluZyB8IG51bWJlcjtcclxuICBWYWx1ZT86IHN0cmluZyB8IG51bWJlcjtcclxuICB0ZXh0Pzogc3RyaW5nO1xyXG4gIFRleHQ/OiBzdHJpbmc7XHJcbn07XHJcblxyXG50eXBlIFZpc2l0Q29tbWFuZFJlc3BvbnNlID0ge1xyXG4gIHN1Y2Nlc3M/OiBib29sZWFuO1xyXG4gIG1lc3NhZ2U/OiBzdHJpbmc7XHJcbiAgU3VjY2Vzcz86IGJvb2xlYW47XHJcbiAgTWVzc2FnZT86IHN0cmluZztcclxufTtcclxuXHJcbmNvbnN0IGlzQ29tbWFuZFN1Y2Nlc3MgPSAocmVzcG9uc2U6IFZpc2l0Q29tbWFuZFJlc3BvbnNlKTogYm9vbGVhbiA9PiB7XHJcbiAgcmV0dXJuIHJlc3BvbnNlLnN1Y2Nlc3MgPT09IHRydWUgfHwgcmVzcG9uc2UuU3VjY2VzcyA9PT0gdHJ1ZTtcclxufTtcclxuXHJcbmNvbnN0IGdldENvbW1hbmRNZXNzYWdlID0gKHJlc3BvbnNlOiBWaXNpdENvbW1hbmRSZXNwb25zZSk6IHN0cmluZyA9PiB7XHJcbiAgY29uc3QgcmF3ID0gcmVzcG9uc2UubWVzc2FnZSA/PyByZXNwb25zZS5NZXNzYWdlO1xyXG4gIHJldHVybiB0eXBlb2YgcmF3ID09PSBcInN0cmluZ1wiID8gcmF3LnRyaW0oKSA6IFwiXCI7XHJcbn07XHJcblxyXG4vLyBLZWVwIHJlY0lkIGFzIGEgbm9ybWFsaXplZCBzaWduZWQgaW50ZWdlciBzdHJpbmcgdG8gYXZvaWQgbG9uZyBwcmVjaXNpb24gbG9zcyBpbiBKUyBudW1iZXJzLlxyXG5jb25zdCByZXNvbHZlU2FmZVJlY0lkID0gKHJhd1JlY0lkOiBzdHJpbmcpOiBzdHJpbmcgfCBudWxsID0+IHtcclxuICBjb25zdCBub3JtYWxpemVkID0gU3RyaW5nKHJhd1JlY0lkID8/IFwiXCIpLnRyaW0oKTtcclxuICBpZiAoIW5vcm1hbGl6ZWQpIHJldHVybiBudWxsO1xyXG5cclxuICBpZiAoIS9eLT9cXGQrJC8udGVzdChub3JtYWxpemVkKSkgcmV0dXJuIG51bGw7XHJcblxyXG4gIGNvbnN0IGFic29sdXRlRGlnaXRzID0gbm9ybWFsaXplZC5zdGFydHNXaXRoKFwiLVwiKSA/IG5vcm1hbGl6ZWQuc2xpY2UoMSkgOiBub3JtYWxpemVkO1xyXG4gIGlmICghYWJzb2x1dGVEaWdpdHMgfHwgL14wKyQvLnRlc3QoYWJzb2x1dGVEaWdpdHMpKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgcmV0dXJuIG5vcm1hbGl6ZWQ7XHJcbn07XHJcblxyXG5jb25zdCBzaG91bGRMb2dSZWNJZEluRGV2ID0gKCk6IGJvb2xlYW4gPT4ge1xyXG4gIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiIHx8ICF3aW5kb3cubG9jYXRpb24pIHJldHVybiBmYWxzZTtcclxuICBjb25zdCBob3N0ID0gU3RyaW5nKHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZSB8fCBcIlwiKS50cmltKCkudG9Mb3dlckNhc2UoKTtcclxuICByZXR1cm4gaG9zdCA9PT0gXCJsb2NhbGhvc3RcIiB8fCBob3N0ID09PSBcIjEyNy4wLjAuMVwiIHx8IGhvc3QuZW5kc1dpdGgoXCIubG9jYWxcIik7XHJcbn07XHJcblxyXG5jb25zdCBsb2dTYWZlUmVjSWRJbkRldiA9IChvcGVyYXRpb246IFwidXBkYXRlXCIgfCBcImRlbGV0ZVwiLCBzYWZlUmVjSWQ6IHN0cmluZyk6IHZvaWQgPT4ge1xyXG4gIGlmICghc2hvdWxkTG9nUmVjSWRJbkRldigpKSByZXR1cm47XHJcbiAgY29uc29sZS5pbmZvKGBbdmlzaXRhcy1kZXRhaWxdICR7b3BlcmF0aW9ufSByZWNJZGAsIHNhZmVSZWNJZCk7XHJcbn07XHJcblxyXG50eXBlIFVzZURldGFpbE11dGF0aW9uc0FyZ3MgPSB7XHJcbiAgYnVzeTogYm9vbGVhbjtcclxuICBpc0VkaXRpbmc6IGJvb2xlYW47XHJcbiAgY2FuRWRpdEhpc3Rvcnk6IGJvb2xlYW47XHJcbiAgY2FuRGVsZXRlSGlzdG9yeTogYm9vbGVhbjtcclxuICByZWNJZDogc3RyaW5nO1xyXG4gIGFjY291bnROdW06IHN0cmluZztcclxuICB0cmFuc0RhdGU6IHN0cmluZztcclxuICB2aXNpdFR5cGU6IHN0cmluZztcclxuICBjb250YWN0TWV0aG9kOiBzdHJpbmc7XHJcbiAgYXNpc3RlbnRlVGlwbzogc3RyaW5nO1xyXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgY29tZW50YXJpb3M6IHN0cmluZztcclxuICBhbnRlY2VkZW50ZXM6IHN0cmluZztcclxuICBjb25jbHVzaW9uZXM6IHN0cmluZztcclxuICB2aXNpdFR5cGVzOiBPcHRpb25MaWtlW107XHJcbiAgY29udGFjdE1ldGhvZHM6IE9wdGlvbkxpa2VbXTtcclxuICBhc2lzdGVudGVUaXBvczogT3B0aW9uTGlrZVtdO1xyXG4gIGRlZmF1bHRWaXNpdFR5cGU6IHN0cmluZztcclxuICByYXdJbml0aWFsVmlzaXRUeXBlOiBzdHJpbmc7XHJcbiAgcmF3SW5pdGlhbENvbnRhY3RNZXRob2Q6IHN0cmluZztcclxuICByYXdJbml0aWFsQXNpc3RlbnRlOiBzdHJpbmc7XHJcbiAgbWF0Y2hPcHRpb25WYWx1ZTogKG9wdGlvbnM6IE9wdGlvbkxpa2VbXSwgcmF3OiB1bmtub3duKSA9PiBzdHJpbmc7XHJcbiAgY2xlYXJEcmFmdDogKCkgPT4gdm9pZDtcclxuICBzeW5jRWRpdE1vZGVGbGFnOiAoZW5hYmxlZDogYm9vbGVhbikgPT4gdm9pZDtcclxuICBzZXRNb2RhbEVycm9yOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcclxuICBzZXRCdXN5OiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxib29sZWFuPj47XHJcbiAgc2V0U3RhdHVzOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcclxuICBzZXRJc0VkaXRpbmc6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPGJvb2xlYW4+PjtcclxufTtcclxuXHJcbi8vIEVuY2Fwc3VsYXRlcyB1cGRhdGUgYW5kIGRlbGV0ZSBtdXRhdGlvbnMgZm9yIGRldGFpbCBmb3JtIHN0YXRlLlxyXG5leHBvcnQgY29uc3QgdXNlRGV0YWlsTXV0YXRpb25zID0gKHtcclxuICBidXN5LFxyXG4gIGlzRWRpdGluZyxcclxuICBjYW5FZGl0SGlzdG9yeSxcclxuICBjYW5EZWxldGVIaXN0b3J5LFxyXG4gIHJlY0lkLFxyXG4gIGFjY291bnROdW0sXHJcbiAgdHJhbnNEYXRlLFxyXG4gIHZpc2l0VHlwZSxcclxuICBjb250YWN0TWV0aG9kLFxyXG4gIGFzaXN0ZW50ZVRpcG8sXHJcbiAgZGVzY3JpcHRpb24sXHJcbiAgY29tZW50YXJpb3MsXHJcbiAgYW50ZWNlZGVudGVzLFxyXG4gIGNvbmNsdXNpb25lcyxcclxuICB2aXNpdFR5cGVzLFxyXG4gIGNvbnRhY3RNZXRob2RzLFxyXG4gIGFzaXN0ZW50ZVRpcG9zLFxyXG4gIGRlZmF1bHRWaXNpdFR5cGUsXHJcbiAgcmF3SW5pdGlhbFZpc2l0VHlwZSxcclxuICByYXdJbml0aWFsQ29udGFjdE1ldGhvZCxcclxuICByYXdJbml0aWFsQXNpc3RlbnRlLFxyXG4gIG1hdGNoT3B0aW9uVmFsdWUsXHJcbiAgY2xlYXJEcmFmdCxcclxuICBzeW5jRWRpdE1vZGVGbGFnLFxyXG4gIHNldE1vZGFsRXJyb3IsXHJcbiAgc2V0QnVzeSxcclxuICBzZXRTdGF0dXMsXHJcbiAgc2V0SXNFZGl0aW5nLFxyXG59OiBVc2VEZXRhaWxNdXRhdGlvbnNBcmdzKSA9PiB7XHJcbiAgY29uc3QgaGFuZGxlVXBkYXRlID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgaWYgKGJ1c3kgfHwgIWlzRWRpdGluZykgcmV0dXJuIGZhbHNlO1xyXG4gICAgaWYgKCFjYW5FZGl0SGlzdG9yeSkge1xyXG4gICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzYWZlUmVjSWRWYWx1ZSA9IHJlc29sdmVTYWZlUmVjSWQocmVjSWQpO1xyXG4gICAgaWYgKHNhZmVSZWNJZFZhbHVlID09PSBudWxsKSB7XHJcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBpbmRUKFwiVmlzaXRzX0RldGFpbF9JbnZhbGlkUmVjSWRcIiwgXCJDb3VsZCBub3QgcmVzb2x2ZSBhY3Rpdml0eSBpZGVudGlmaWVyLiBSZWxvYWQgYW5kIHRyeSBhZ2Fpbi5cIik7XHJcbiAgICAgIHNldE1vZGFsRXJyb3IobWVzc2FnZSk7XHJcbiAgICAgIHNldFN0YXR1cyhtZXNzYWdlKTtcclxuICAgICAgZmxhc2hBY3Rpb25NYXJrKFwiZXJyb3JQcm9jZXNzXCIsIDE1MDApO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0TW9kYWxFcnJvcihcIlwiKTtcclxuICAgIHNldEJ1c3kodHJ1ZSk7XHJcbiAgICBzZXRTdGF0dXMoaW5kVChcIlZpc2l0c19EZXRhaWxfVXBkYXRpbmdcIiwgXCJVcGRhdGluZyBhY3Rpdml0eS4uLlwiKSk7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3Qgbm9ybWFsaXplZFZpc2l0VHlwZSA9XHJcbiAgICAgICAgbWF0Y2hPcHRpb25WYWx1ZSh2aXNpdFR5cGVzLCB2aXNpdFR5cGUpIHx8XHJcbiAgICAgICAgbWF0Y2hPcHRpb25WYWx1ZSh2aXNpdFR5cGVzLCByYXdJbml0aWFsVmlzaXRUeXBlKSB8fFxyXG4gICAgICAgIGRlZmF1bHRWaXNpdFR5cGU7XHJcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRBc2lzdGVudGVUaXBvID1cclxuICAgICAgICBtYXRjaE9wdGlvblZhbHVlKGFzaXN0ZW50ZVRpcG9zLCBhc2lzdGVudGVUaXBvKSB8fFxyXG4gICAgICAgIG1hdGNoT3B0aW9uVmFsdWUoYXNpc3RlbnRlVGlwb3MsIHJhd0luaXRpYWxBc2lzdGVudGUpIHx8XHJcbiAgICAgICAgcmF3SW5pdGlhbEFzaXN0ZW50ZTtcclxuICAgICAgY29uc3Qgbm9ybWFsaXplZENvbnRhY3RNZXRob2QgPVxyXG4gICAgICAgIG1hdGNoT3B0aW9uVmFsdWUoY29udGFjdE1ldGhvZHMsIGNvbnRhY3RNZXRob2QpIHx8XHJcbiAgICAgICAgbWF0Y2hPcHRpb25WYWx1ZShjb250YWN0TWV0aG9kcywgcmF3SW5pdGlhbENvbnRhY3RNZXRob2QpO1xyXG4gICAgICBjb25zdCBjb250YWN0TWV0aG9kVmFsdWUgPSBOdW1iZXIobm9ybWFsaXplZENvbnRhY3RNZXRob2QpO1xyXG5cclxuICAgICAgY29uc3QgcGF5bG9hZCA9IHtcclxuICAgICAgICBhY2NvdW50TnVtLFxyXG4gICAgICAgIHZpc2l0VHlwZTogbm9ybWFsaXplZFZpc2l0VHlwZSxcclxuICAgICAgICBjb250YWN0TWV0aG9kOiBOdW1iZXIuaXNGaW5pdGUoY29udGFjdE1ldGhvZFZhbHVlKSA/IGNvbnRhY3RNZXRob2RWYWx1ZSA6IG51bGwsXHJcbiAgICAgICAgYXNpc3RlbnRlVGlwbzogbm9ybWFsaXplZEFzaXN0ZW50ZVRpcG8sXHJcbiAgICAgICAgZGVzY3JpcHRpb24sXHJcbiAgICAgICAgdHJhbnNEYXRlLFxyXG4gICAgICAgIGNvbWVudGFyaW9zLFxyXG4gICAgICAgIGFudGVjZWRlbnRlcyxcclxuICAgICAgICBjb25jbHVzaW9uZXMsXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBsb2dTYWZlUmVjSWRJbkRldihcInVwZGF0ZVwiLCBzYWZlUmVjSWRWYWx1ZSk7XHJcbiAgICAgIGNvbnN0IHNhZmVSZWNJZCA9IGVuY29kZVVSSUNvbXBvbmVudChzYWZlUmVjSWRWYWx1ZSk7XHJcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPFZpc2l0Q29tbWFuZFJlc3BvbnNlPihgL1Zpc2l0YXMvVXBkYXRlQWN0aXZpdHkvJHtzYWZlUmVjSWR9YCwge1xyXG4gICAgICAgIG1ldGhvZDogXCJQVVRcIixcclxuICAgICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXHJcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGF5bG9hZCksXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgaWYgKCFpc0NvbW1hbmRTdWNjZXNzKHJlc3BvbnNlKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihnZXRDb21tYW5kTWVzc2FnZShyZXNwb25zZSkgfHwgaW5kVChcIlZpc2l0c19EZXRhaWxfVXBkYXRlRmFpbGVkXCIsIFwiVXBkYXRlIGZhaWxlZC5cIikpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzZXRTdGF0dXMoaW5kVChcIlZpc2l0c19EZXRhaWxfVXBkYXRlZFwiLCBcIkFjdGl2aXR5IHVwZGF0ZWRcIikpO1xyXG4gICAgICBzZXRJc0VkaXRpbmcoZmFsc2UpO1xyXG4gICAgICBzeW5jRWRpdE1vZGVGbGFnKGZhbHNlKTtcclxuICAgICAgY2xlYXJEcmFmdCgpO1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBlcnJvciBpbnN0YW5jZW9mIEVycm9yICYmIGVycm9yLm1lc3NhZ2VcclxuICAgICAgICA/IGVycm9yLm1lc3NhZ2VcclxuICAgICAgICA6IGluZFQoXCJWaXNpdHNfRGV0YWlsX1VwZGF0ZUVycm9yXCIsIFwiVXBkYXRlIGVycm9yLlwiKTtcclxuICAgICAgc2V0TW9kYWxFcnJvcihtZXNzYWdlKTtcclxuICAgICAgc2V0U3RhdHVzKG1lc3NhZ2UpO1xyXG4gICAgICBmbGFzaEFjdGlvbk1hcmsoXCJlcnJvclByb2Nlc3NcIiwgMTUwMCk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0gZmluYWxseSB7XHJcbiAgICAgIHNldEJ1c3koZmFsc2UpO1xyXG4gICAgfVxyXG4gIH0sIFtcclxuICAgIGFjY291bnROdW0sXHJcbiAgICBhbnRlY2VkZW50ZXMsXHJcbiAgICBhc2lzdGVudGVUaXBvLFxyXG4gICAgYXNpc3RlbnRlVGlwb3MsXHJcbiAgICBidXN5LFxyXG4gICAgY2FuRWRpdEhpc3RvcnksXHJcbiAgICBjbGVhckRyYWZ0LFxyXG4gICAgY29tZW50YXJpb3MsXHJcbiAgICBjb25jbHVzaW9uZXMsXHJcbiAgICBjb250YWN0TWV0aG9kLFxyXG4gICAgY29udGFjdE1ldGhvZHMsXHJcbiAgICBkZWZhdWx0VmlzaXRUeXBlLFxyXG4gICAgZGVzY3JpcHRpb24sXHJcbiAgICBpc0VkaXRpbmcsXHJcbiAgICBtYXRjaE9wdGlvblZhbHVlLFxyXG4gICAgcmF3SW5pdGlhbEFzaXN0ZW50ZSxcclxuICAgIHJhd0luaXRpYWxDb250YWN0TWV0aG9kLFxyXG4gICAgcmF3SW5pdGlhbFZpc2l0VHlwZSxcclxuICAgIHJlY0lkLFxyXG4gICAgc2V0QnVzeSxcclxuICAgIHNldElzRWRpdGluZyxcclxuICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICBzZXRTdGF0dXMsXHJcbiAgICBzeW5jRWRpdE1vZGVGbGFnLFxyXG4gICAgdHJhbnNEYXRlLFxyXG4gICAgdmlzaXRUeXBlLFxyXG4gICAgdmlzaXRUeXBlcyxcclxuICBdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlRGVsZXRlID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgaWYgKGJ1c3kpIHJldHVybiBmYWxzZTtcclxuICAgIGlmICghY2FuRGVsZXRlSGlzdG9yeSkge1xyXG4gICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzYWZlUmVjSWRWYWx1ZSA9IHJlc29sdmVTYWZlUmVjSWQocmVjSWQpO1xyXG4gICAgaWYgKHNhZmVSZWNJZFZhbHVlID09PSBudWxsKSB7XHJcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBpbmRUKFwiVmlzaXRzX0RldGFpbF9JbnZhbGlkUmVjSWRcIiwgXCJDb3VsZCBub3QgcmVzb2x2ZSBhY3Rpdml0eSBpZGVudGlmaWVyLiBSZWxvYWQgYW5kIHRyeSBhZ2Fpbi5cIik7XHJcbiAgICAgIHNldE1vZGFsRXJyb3IobWVzc2FnZSk7XHJcbiAgICAgIHNldFN0YXR1cyhtZXNzYWdlKTtcclxuICAgICAgZmxhc2hBY3Rpb25NYXJrKFwiZXJyb3JQcm9jZXNzXCIsIDE1MDApO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0TW9kYWxFcnJvcihcIlwiKTtcclxuICAgIHNldEJ1c3kodHJ1ZSk7XHJcbiAgICBzZXRTdGF0dXMoaW5kVChcIlZpc2l0c19EZXRhaWxfRGVsZXRpbmdcIiwgXCJEZWxldGluZyBhY3Rpdml0eS4uLlwiKSk7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgbG9nU2FmZVJlY0lkSW5EZXYoXCJkZWxldGVcIiwgc2FmZVJlY0lkVmFsdWUpO1xyXG4gICAgICBjb25zdCBzYWZlUmVjSWQgPSBlbmNvZGVVUklDb21wb25lbnQoc2FmZVJlY0lkVmFsdWUpO1xyXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxWaXNpdENvbW1hbmRSZXNwb25zZT4oYC9WaXNpdGFzL0RlbGV0ZUFjdGl2aXR5LyR7c2FmZVJlY0lkfWAsIHsgbWV0aG9kOiBcIkRFTEVURVwiIH0pO1xyXG4gICAgICBpZiAoIWlzQ29tbWFuZFN1Y2Nlc3MocmVzcG9uc2UpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGdldENvbW1hbmRNZXNzYWdlKHJlc3BvbnNlKSB8fCBpbmRUKFwiVmlzaXRzX0RldGFpbF9EZWxldGVGYWlsZWRcIiwgXCJEZWxldGUgZmFpbGVkLlwiKSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNldFN0YXR1cyhpbmRUKFwiVmlzaXRzX0RldGFpbF9EZWxldGVkXCIsIFwiQWN0aXZpdHkgZGVsZXRlZFwiKSk7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc3QgbWVzc2FnZSA9IGVycm9yIGluc3RhbmNlb2YgRXJyb3IgJiYgZXJyb3IubWVzc2FnZVxyXG4gICAgICAgID8gZXJyb3IubWVzc2FnZVxyXG4gICAgICAgIDogaW5kVChcIlZpc2l0c19EZXRhaWxfRGVsZXRlRXJyb3JcIiwgXCJEZWxldGUgZXJyb3IuXCIpO1xyXG4gICAgICBzZXRNb2RhbEVycm9yKG1lc3NhZ2UpO1xyXG4gICAgICBzZXRTdGF0dXMobWVzc2FnZSk7XHJcbiAgICAgIGZsYXNoQWN0aW9uTWFyayhcImVycm9yUHJvY2Vzc1wiLCAxNTAwKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSBmaW5hbGx5IHtcclxuICAgICAgc2V0QnVzeShmYWxzZSk7XHJcbiAgICB9XHJcbiAgfSwgW2J1c3ksIGNhbkRlbGV0ZUhpc3RvcnksIHJlY0lkLCBzZXRCdXN5LCBzZXRNb2RhbEVycm9yLCBzZXRTdGF0dXNdKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGhhbmRsZVVwZGF0ZSxcclxuICAgIGhhbmRsZURlbGV0ZSxcclxuICB9O1xyXG59O1xyXG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuXG50eXBlIFByb3BzID0ge1xuICBsYWJlbDogc3RyaW5nO1xuICB2YWx1ZTogc3RyaW5nO1xufTtcblxuLy8gUmVhZC1vbmx5IG93bmVyIGZpZWxkIHNob3duIG9ubHkgd2hlbiB2aXNpYmlsaXR5IGNvbmZpcm1zIGEgbWFuYWdlciBjb250ZXh0LlxuY29uc3QgRGV0YWlsT3duZXJGaWVsZCA9ICh7IGxhYmVsLCB2YWx1ZSB9OiBQcm9wcykgPT4ge1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwidmlzaXRhLWZpZWxkLXRleHRcIj5cbiAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb3JtLWxhYmVsIGZvbnQtc2VtaWJvbGRcIiBodG1sRm9yPVwidmlzaXQtZGV0YWlsLW93bmVyXCI+XG4gICAgICAgIHtsYWJlbH1cbiAgICAgIDwvbGFiZWw+XG4gICAgICA8aW5wdXRcbiAgICAgICAgaWQ9XCJ2aXNpdC1kZXRhaWwtb3duZXJcIlxuICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2wgaW5kLXJlYWRvbmx5LWZpZWxkIGN1cnNvci1kZWZhdWx0XCJcbiAgICAgICAgdmFsdWU9e3ZhbHVlfVxuICAgICAgICByZWFkT25seVxuICAgICAgICBhcmlhLXJlYWRvbmx5PVwidHJ1ZVwiXG4gICAgICAvPlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRGV0YWlsT3duZXJGaWVsZDtcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBEZXRhaWxGb3JtIGZyb20gXCIuL0RldGFpbEZvcm0udHN4XCI7XHJcbmltcG9ydCBWaXNpdGFzUGFnZVByb3ZpZGVycyBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1Zpc2l0YXNQYWdlUHJvdmlkZXJzLnRzeFwiO1xuaW1wb3J0IHsgbW91bnRSZWFjdElzbGFuZCwgbW91bnRXaGVuRG9jdW1lbnRSZWFkeSB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9yZWFjdElzbGFuZC50c3hcIjtcblxudHlwZSBQcm9wcyA9IHtcbiAgY29tcGFueUlkPzogc3RyaW5nO1xuICBheFVzZXJJZD86IHN0cmluZztcbiAgcGVybWlzc2lvbnNSZXZpc2lvbj86IHN0cmluZztcbn07XG5cbi8vIFBhZ2UgZW50cnkgZm9yIHRoZSB2aXNpdGFzIGRldGFpbCBpc2xhbmQuXG5jb25zdCBEZXRhaWxQYWdlID0gKHsgY29tcGFueUlkID0gXCJcIiwgYXhVc2VySWQgPSBcIlwiLCBwZXJtaXNzaW9uc1JldmlzaW9uID0gXCJcIiB9OiBQcm9wcykgPT4ge1xuICByZXR1cm4gKFxuICAgIDxWaXNpdGFzUGFnZVByb3ZpZGVycz5cbiAgICAgIDxEZXRhaWxGb3JtIGNvbXBhbnlJZD17Y29tcGFueUlkfSBheFVzZXJJZD17YXhVc2VySWR9IHBlcm1pc3Npb25zUmV2aXNpb249e3Blcm1pc3Npb25zUmV2aXNpb259IC8+XG4gICAgPC9WaXNpdGFzUGFnZVByb3ZpZGVycz5cbiAgKTtcbn07XG5cclxuY29uc3QgbW91bnQgPSAoKSA9PiB7XHJcbiAgY29uc3Qgcm9vdEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2aXNpdGEtZGV0YWlsLXJvb3RcIik7XG4gIGlmICghcm9vdEVsKSByZXR1cm47XG4gIGNvbnN0IGNvbXBhbnlJZCA9IHJvb3RFbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNvbXBhbnktaWRcIikgfHwgXCJcIjtcbiAgY29uc3QgYXhVc2VySWQgPSByb290RWwuZ2V0QXR0cmlidXRlKFwiZGF0YS1heC11c2VyLWlkXCIpIHx8IFwiXCI7XG4gIGNvbnN0IHBlcm1pc3Npb25zUmV2aXNpb24gPSByb290RWwuZ2V0QXR0cmlidXRlKFwiZGF0YS1wZXJtaXNzaW9ucy1yZXZpc2lvblwiKSB8fCBcIlwiO1xuXG4gIG1vdW50UmVhY3RJc2xhbmQoXG4gICAgcm9vdEVsLFxuICAgIDxEZXRhaWxQYWdlIGNvbXBhbnlJZD17Y29tcGFueUlkfSBheFVzZXJJZD17YXhVc2VySWR9IHBlcm1pc3Npb25zUmV2aXNpb249e3Blcm1pc3Npb25zUmV2aXNpb259IC8+XG4gICk7XG59O1xuXHJcbm1vdW50V2hlbkRvY3VtZW50UmVhZHkobW91bnQpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRGV0YWlsUGFnZTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBQUEsZ0JBQXlFOzs7QUNBbEUsSUFBTSxvQkFBb0IsQ0FBQyxPQUEyQjtBQUMzRCxNQUFJLENBQUMsR0FBSSxR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QSxJQUNGO0FBQUEsS0FDRjtBQUVKO0FBR2UsU0FBUixXQUE0QixPQUF3QjtBQUN6RCxTQUNFLDZDQUFDLDRCQUFpQixpQkFBaUIsS0FBSywrQkFBK0IsMEVBQTBFLEdBQy9JLHVEQUFDLGFBQVcsR0FBRyxPQUFPLEdBQ3hCO0FBRUo7OztBUTVtQk0sSUFBQUMsc0JBQUE7QUFITixJQUFNLGFBQWEsQ0FBQyxFQUFFLFlBQVksSUFBSSxXQUFXLElBQUksc0JBQXNCLEdBQUcsTUFBYTtBQUN6RixTQUNFLDZDQUFDLGdDQUNDLHVEQUFDLGNBQVcsV0FBc0IsVUFBb0IscUJBQTBDLEdBQ2xHO0FBRUo7QUFFQSxJQUFNLFFBQVEsTUFBTTtBQUNsQixRQUFNLFNBQVMsU0FBUyxlQUFlLG9CQUFvQjtBQUMzRCxNQUFJLENBQUMsT0FBUTtBQUNiLFFBQU0sWUFBWSxPQUFPLGFBQWEsaUJBQWlCLEtBQUs7QUFDNUQsUUFBTSxXQUFXLE9BQU8sYUFBYSxpQkFBaUIsS0FBSztBQUMzRCxRQUFNLHNCQUFzQixPQUFPLGFBQWEsMkJBQTJCLEtBQUs7QUFFaEY7QUFBQSxJQUNFO0FBQUEsSUFDQSw2Q0FBQyxjQUFXLFdBQXNCLFVBQW9CLHFCQUEwQztBQUFBLEVBQ2xHO0FBQ0Y7QUFFQSx1QkFBdUIsS0FBSztBQUU1QixJQUFPLHFCQUFROyIsCiAgIm5hbWVzIjogWyJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9qc3hfcnVudGltZSJdCn0K
