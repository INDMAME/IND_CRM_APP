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
  formatVisibleVisitUserLabel,
  useVisibleVisitUsers
} from "./chunks/chunk-SMGDXP5D.js";
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
      if (editBtn) editBtn.classList.remove("topbar-hidden");
      if (editIcon) editIcon.classList.add("hidden");
      if (saveIcon) saveIcon.classList.remove("hidden");
      if (deleteBtn) deleteBtn.classList.add("topbar-hidden");
      if (cancelBtn) cancelBtn.classList.remove("topbar-hidden");
    } else {
      if (editBtn) editBtn.classList.remove("topbar-hidden");
      if (editIcon) editIcon.classList.remove("hidden");
      if (saveIcon) saveIcon.classList.add("hidden");
      if (deleteBtn) deleteBtn.classList.remove("topbar-hidden");
      if (cancelBtn) cancelBtn.classList.add("topbar-hidden");
    }
    setTopbarActionGroupReady(actionGroupId);
  }, [actionGroupId, isEditing, permissionsReady]);
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
  const { visibleVisitUsers, visibleUsersReady } = useVisibleVisitUsers({
    enabled: canViewHistory,
    companyId,
    axUserId,
    permissionsRevision,
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
    if (!detailOwnerAxUserId) return null;
    return visibleVisitUsers.find((user) => user.axUserId.toUpperCase() === detailOwnerAxUserId.toUpperCase()) || null;
  }, [detailOwnerAxUserId, visibleVisitUsers]);
  const detailOwnerText = visibleOwner ? formatVisibleVisitUserLabel(visibleOwner) : detailOwnerRawText || detailOwnerAxUserId;
  const showOwnerField = visibleUsersReady && visibleVisitUsers.length > 0;
  const { editModeKeyRef, syncEditModeFlag, clearDraft, applyDraftValues } = useDetailEditSession({
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
      allowEdit: canEditHistory,
      editModeKey: editModeKeyRef.current
    });
  }, [comentarios, isEditing, canEditHistory, openTextEditor]);
  const handleComentariosHold = (0, import_react5.useCallback)((target, clientY) => {
    if (!target || !isOverflowing(target)) return false;
    setPreviewAnchor(target);
    return showPreviewTooltip(String(comentarios || ""), clientY);
  }, [comentarios]);
  const handleAntecedentesTap = (0, import_react5.useCallback)((event) => {
    event.preventDefault();
    openTextEditor(fieldIdAntecedentes, indT("Visits_Field_Background", "Background"), antecedentes, {
      readOnly: !isEditing,
      allowEdit: canEditHistory,
      editModeKey: editModeKeyRef.current
    });
  }, [antecedentes, isEditing, canEditHistory, openTextEditor]);
  const handleAntecedentesHold = (0, import_react5.useCallback)((target, clientY) => {
    if (!target || !isOverflowing(target)) return false;
    setPreviewAnchor(target);
    return showPreviewTooltip(String(antecedentes || ""), clientY);
  }, [antecedentes]);
  const handleConclusionesTap = (0, import_react5.useCallback)((event) => {
    event.preventDefault();
    openTextEditor(fieldIdConclusiones, indT("Visits_Field_Conclusions", "Conclusions"), conclusiones, {
      readOnly: !isEditing,
      allowEdit: canEditHistory,
      editModeKey: editModeKeyRef.current
    });
  }, [conclusiones, isEditing, canEditHistory, openTextEditor]);
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
    if (!canEditHistory) {
      showPermissionModal();
      return;
    }
    setIsEditing(true);
    syncEditModeFlag(true);
    setStatus(indT("Visits_Detail_EditingEnabled", "Editing enabled"));
  }, [canEditHistory, syncEditModeFlag]);
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
  });
  useDetailTopbarActions({
    busy,
    modalOpen: modal.open,
    isEditing,
    canEditHistory,
    canDeleteHistory,
    transDate,
    setModalError,
    handleEnableEdit,
    handleCancelEdit,
    handleUpdate,
    handleDelete,
    openConfirm,
    closeConfirm
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvZGV0YWlsL0RldGFpbEZvcm0udHN4IiwgIi4uL3JlYWN0L3NyYy91dGlscy9kb21HdWFyZHMudHMiLCAiLi4vcmVhY3Qvc3JjL3V0aWxzL3N0cmluZ3MudHMiLCAiLi4vcmVhY3Qvc3JjL2hvb2tzL3VzZURldGFpbEh5ZHJhdGlvbi50cyIsICIuLi9yZWFjdC9zcmMvaG9va3MvdXNlRGV0YWlsVG9wYmFyQWN0aW9ucy50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9kZXRhaWwvdXNlRGV0YWlsRWRpdFNlc3Npb24udHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvZGV0YWlsL3VzZURldGFpbE11dGF0aW9ucy50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9kZXRhaWwvRGV0YWlsT3duZXJGaWVsZC50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvZGV0YWlsL0RldGFpbFBhZ2UudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCwgdXNlUmVmLCB1c2VDYWxsYmFjaywgdXNlTWVtbyB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgU2luZ2xlRGF0ZVBpY2tlciBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NpbmdsZURhdGVQaWNrZXIudHN4XCI7XHJcbmltcG9ydCBDb25maXJtTW9kYWwgZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9Db25maXJtTW9kYWwudHN4XCI7XHJcbmltcG9ydCBTZWxlY3RDb21ib2JveCBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NlbGVjdENvbWJvYm94LnRzeFwiO1xyXG5pbXBvcnQgQXBwRXJyb3JCb3VuZGFyeSBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0FwcEVycm9yQm91bmRhcnkudHN4XCI7XHJcbmltcG9ydCB7IHVzZVZpc2l0YXMgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlVmlzaXRhcy50c1wiO1xyXG5pbXBvcnQgU3Bpbm5lciBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NwaW5uZXIudHN4XCI7XHJcbmltcG9ydCBWaXNpdE5hcnJhdGl2ZUZpZWxkcyBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy92aXNpdGFzL1Zpc2l0TmFycmF0aXZlRmllbGRzLnRzeFwiO1xyXG5pbXBvcnQgeyBjbGFzc05hbWVzIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2NsYXNzTmFtZXMudHNcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB7IGNhbkFjY2Vzcywgc2hvd1Blcm1pc3Npb25Nb2RhbCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9wZXJtaXNzaW9ucy50c1wiO1xyXG5pbXBvcnQgeyBiaW5kUmVhZE9ubHlHdWFyZCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9kb21HdWFyZHMudHNcIjtcclxuaW1wb3J0IHsgaGFzVmFsdWUgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvc3RyaW5ncy50c1wiO1xyXG5pbXBvcnQgeyBuYXZpZ2F0ZVRvVGV4dEVkaXRvckZpZWxkIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3RleHRFZGl0b3JOYXZpZ2F0aW9uLnRzXCI7XHJcbmltcG9ydCB7IGZsYXNoQWN0aW9uTWFyayB9IGZyb20gXCIuLi8uLi8uLi91dGlscy92aXNpdGFzSGlzdG9yeS50c1wiO1xyXG5pbXBvcnQgeyBzZXRQcmV2aWV3QW5jaG9yLCBzaG93UHJldmlld1Rvb2x0aXAsIGlzT3ZlcmZsb3dpbmcgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvcHJldmlld1Rvb2x0aXAudHNcIjtcclxuaW1wb3J0IHsgdXNlVGFwR3VhcmQgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlVGFwR3VhcmQudHNcIjtcclxuaW1wb3J0IHsgdXNlQ29uZmlybURpYWxvZyB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VDb25maXJtRGlhbG9nLnRzXCI7XHJcbmltcG9ydCB7IHVzZURldGFpbEh5ZHJhdGlvbiB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VEZXRhaWxIeWRyYXRpb24udHNcIjtcclxuaW1wb3J0IHsgdXNlRGV0YWlsVG9wYmFyQWN0aW9ucyB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VEZXRhaWxUb3BiYXJBY3Rpb25zLnRzXCI7XHJcbmltcG9ydCB7IHVzZVRleHRFZGl0b3JGaWVsZHMgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlVGV4dEVkaXRvckZpZWxkcy50c1wiO1xuaW1wb3J0IHsgdXNlVmlzaWJsZVZpc2l0VXNlcnMgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlVmlzaWJsZVZpc2l0VXNlcnMudHNcIjtcbmltcG9ydCB7IHVzZURldGFpbEVkaXRTZXNzaW9uIH0gZnJvbSBcIi4vdXNlRGV0YWlsRWRpdFNlc3Npb24udHNcIjtcbmltcG9ydCB7IHVzZURldGFpbE11dGF0aW9ucyB9IGZyb20gXCIuL3VzZURldGFpbE11dGF0aW9ucy50c1wiO1xuaW1wb3J0IHsgZm9ybWF0VmlzaWJsZVZpc2l0VXNlckxhYmVsIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3Zpc2libGVWaXNpdFVzZXJzLnRzXCI7XG5pbXBvcnQgRGV0YWlsT3duZXJGaWVsZCBmcm9tIFwiLi9EZXRhaWxPd25lckZpZWxkLnRzeFwiO1xuXG5jb25zdCBFRElUT1JfUkVUVVJOX0ZMQUdfVFRMX01TID0gMiAqIDYwICogNjAgKiAxMDAwO1xuXG50eXBlIERldGFpbEZvcm1Qcm9wcyA9IHtcbiAgY29tcGFueUlkPzogc3RyaW5nO1xuICBheFVzZXJJZD86IHN0cmluZztcbiAgcGVybWlzc2lvbnNSZXZpc2lvbj86IHN0cmluZztcbn07XG5cbmNvbnN0IHNhZmVEZXRhaWxUZXh0ID0gKHZhbHVlOiB1bmtub3duKTogc3RyaW5nID0+IFN0cmluZyh2YWx1ZSA/PyBcIlwiKS50cmltKCk7XG5cbmNvbnN0IGZpcnN0RGV0YWlsVGV4dCA9ICguLi52YWx1ZXM6IHVua25vd25bXSk6IHN0cmluZyA9PiB7XG4gIGZvciAoY29uc3QgdmFsdWUgb2YgdmFsdWVzKSB7XG4gICAgY29uc3QgdGV4dCA9IHNhZmVEZXRhaWxUZXh0KHZhbHVlKTtcbiAgICBpZiAodGV4dCkgcmV0dXJuIHRleHQ7XG4gIH1cblxuICByZXR1cm4gXCJcIjtcbn07XG5cbmNvbnN0IERldGFpbEFwcCA9ICh7IGNvbXBhbnlJZCA9IFwiXCIsIGF4VXNlcklkID0gXCJcIiwgcGVybWlzc2lvbnNSZXZpc2lvbiA9IFwiXCIgfTogRGV0YWlsRm9ybVByb3BzKSA9PiB7XG4gIGNvbnN0IHsgdmlzaXRUeXBlcywgY29udGFjdE1ldGhvZHMsIGFzaXN0ZW50ZVRpcG9zIH0gPSB1c2VWaXNpdGFzKCk7XG4gIGNvbnN0IGNhblZpZXdIaXN0b3J5ID0gY2FuQWNjZXNzKFwiVklTSVRBU19HRVNUSU9OXCIsIFwiVmlld1wiKTtcbiAgY29uc3QgY2FuRWRpdEhpc3RvcnkgPSBjYW5BY2Nlc3MoXCJWSVNJVEFTX0dFU1RJT05cIiwgXCJFZGl0XCIpO1xuICBjb25zdCBjYW5EZWxldGVIaXN0b3J5ID0gY2FuQWNjZXNzKFwiVklTSVRBU19HRVNUSU9OXCIsIFwiRnVsbEFjY2Vzc1wiKTtcbiAgdHlwZSBBY3Rpdml0eURldGFpbFBheWxvYWQgPSB7XG4gICAgcmVjSWQ/OiBzdHJpbmcgfCBudW1iZXI7XHJcbiAgICBSZWNJZD86IHN0cmluZyB8IG51bWJlcjtcclxuICAgIHJlZlJlY0lkQWN0aXZpZGFkPzogc3RyaW5nIHwgbnVtYmVyO1xyXG4gICAgUmVmUmVjSWRBY3RpdmlkYWQ/OiBzdHJpbmcgfCBudW1iZXI7XHJcbiAgICBhY3RpdmlkYWRSZWNJZD86IHN0cmluZyB8IG51bWJlcjtcclxuICAgIEFjdGl2aWRhZFJlY0lkPzogc3RyaW5nIHwgbnVtYmVyO1xyXG4gICAgcmVhZE9ubHk/OiBib29sZWFuO1xuICAgIGFsbG93RWRpdD86IGJvb2xlYW47XG4gICAgZWRpdE1vZGVLZXk/OiBzdHJpbmc7XG4gICAgb3duZXJBeFVzZXJJZD86IHN0cmluZztcbiAgICBPd25lckF4VXNlcklkPzogc3RyaW5nO1xuICAgIG93bmVyTmFtZT86IHN0cmluZztcbiAgICBPd25lck5hbWU/OiBzdHJpbmc7XG4gICAgb3duZXJBbGlhcz86IHN0cmluZztcbiAgICBPd25lckFsaWFzPzogc3RyaW5nO1xuICAgIGNyZWF0ZWRCeVVzZXJJZD86IHN0cmluZztcbiAgICBDcmVhdGVkQnlVc2VySWQ/OiBzdHJpbmc7XG4gICAgdXNlcklkPzogc3RyaW5nO1xuICAgIFVzZXJJZD86IHN0cmluZztcbiAgICBpbmRDcmVhdGVkQnlVc2VySWQ/OiBzdHJpbmc7XG4gICAgSU5EQ3JlYXRlZEJ5VXNlcklkPzogc3RyaW5nO1xuICAgIFtrZXk6IHN0cmluZ106IHVua25vd247XG4gIH07XG5cbiAgY29uc3QgZGV0YWlsID0gKHdpbmRvdy5fX0FDVElWSVRZX0RFVEFJTF9fIGFzIEFjdGl2aXR5RGV0YWlsUGF5bG9hZCkgfHwge307XG4gIGNvbnN0IHsgdmlzaWJsZVZpc2l0VXNlcnMsIHZpc2libGVVc2Vyc1JlYWR5IH0gPSB1c2VWaXNpYmxlVmlzaXRVc2Vycyh7XG4gICAgZW5hYmxlZDogY2FuVmlld0hpc3RvcnksXG4gICAgY29tcGFueUlkLFxuICAgIGF4VXNlcklkLFxuICAgIHBlcm1pc3Npb25zUmV2aXNpb24sXG4gICAgb25Gb3JiaWRkZW46IHNob3dQZXJtaXNzaW9uTW9kYWwsXG4gIH0pO1xuXHJcbiAgY29uc3QgcmVzb2x2ZUFjdGl2aXR5UmVjSWQgPSAocGF5bG9hZDogQWN0aXZpdHlEZXRhaWxQYXlsb2FkKTogc3RyaW5nID0+IHtcclxuICAgIGNvbnN0IGNhbmRpZGF0ZXMgPSBbXHJcbiAgICAgIHBheWxvYWQucmVjSWQsXHJcbiAgICAgIHBheWxvYWQuUmVjSWQsXHJcbiAgICAgIHBheWxvYWQucmVmUmVjSWRBY3RpdmlkYWQsXHJcbiAgICAgIHBheWxvYWQuUmVmUmVjSWRBY3RpdmlkYWQsXHJcbiAgICAgIHBheWxvYWQuYWN0aXZpZGFkUmVjSWQsXHJcbiAgICAgIHBheWxvYWQuQWN0aXZpZGFkUmVjSWQsXHJcbiAgICBdO1xyXG5cclxuICAgIGZvciAoY29uc3QgY2FuZGlkYXRlIG9mIGNhbmRpZGF0ZXMpIHtcclxuICAgICAgY29uc3Qgbm9ybWFsaXplZCA9IFN0cmluZyhjYW5kaWRhdGUgPz8gXCJcIikudHJpbSgpO1xyXG4gICAgICBpZiAobm9ybWFsaXplZCkge1xyXG4gICAgICAgIHJldHVybiBub3JtYWxpemVkO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIFwiXCI7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgYWN0aXZpdHlSZWNJZCA9IHJlc29sdmVBY3Rpdml0eVJlY0lkKGRldGFpbCk7XHJcblxyXG4gIGNvbnN0IHRleHRFZGl0b3JCYXNlSWQgPSBhY3Rpdml0eVJlY0lkID8gYFZpc2l0YS4ke2FjdGl2aXR5UmVjSWR9YCA6IFwiVmlzaXRhXCI7XHJcbiAgY29uc3QgZmllbGRJZENvbWVudGFyaW9zID0gYCR7dGV4dEVkaXRvckJhc2VJZH0uQ29tZW50YXJpb3NgO1xyXG4gIGNvbnN0IGZpZWxkSWRBbnRlY2VkZW50ZXMgPSBgJHt0ZXh0RWRpdG9yQmFzZUlkfS5BbnRlY2VkZW50ZXNgO1xyXG4gIGNvbnN0IGZpZWxkSWRDb25jbHVzaW9uZXMgPSBgJHt0ZXh0RWRpdG9yQmFzZUlkfS5Db25jbHVzaW9uZXNgO1xyXG5cclxuICBjb25zdCBub3JtYWxpemVEYXRlVG9JbnB1dCA9IHVzZUNhbGxiYWNrKCh2YWx1ZSkgPT4ge1xyXG4gICAgaWYgKCF2YWx1ZSkgcmV0dXJuIFwiXCI7XHJcbiAgICBjb25zdCByYXcgPSBTdHJpbmcodmFsdWUpLnRyaW0oKTtcclxuICAgIGlmICghcmF3KSByZXR1cm4gXCJcIjtcclxuICAgIC8vIEFscmVhZHkgeXl5eS1NTS1kZFxyXG4gICAgaWYgKC9eXFxkezR9LVxcZHsyfS1cXGR7Mn0kLy50ZXN0KHJhdykpIHJldHVybiByYXc7XHJcbiAgICAvLyBkZC5NTS55eXl5IG9yIGRkL01NL3l5eXlcclxuICAgIGlmICgvXlxcZHsyfVsuLy1dXFxkezJ9Wy4vLV1cXGR7NH0kLy50ZXN0KHJhdykpIHtcclxuICAgICAgY29uc3QgcGFydHMgPSByYXcuc3BsaXQoL1suLy1dLykubWFwKChwKSA9PiBwYXJzZUludChwLCAxMCkpO1xyXG4gICAgICBpZiAocGFydHMubGVuZ3RoID09PSAzICYmICFOdW1iZXIuaXNOYU4ocGFydHNbMF0pICYmICFOdW1iZXIuaXNOYU4ocGFydHNbMV0pICYmICFOdW1iZXIuaXNOYU4ocGFydHNbMl0pKSB7XHJcbiAgICAgICAgY29uc3QgW2QsIG0sIHldID0gcGFydHM7XHJcbiAgICAgICAgY29uc3QgbW0gPSBTdHJpbmcobSkucGFkU3RhcnQoMiwgXCIwXCIpO1xyXG4gICAgICAgIGNvbnN0IGRkID0gU3RyaW5nKGQpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcclxuICAgICAgICByZXR1cm4gYCR7eX0tJHttbX0tJHtkZH1gO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBjb25zdCBkdCA9IG5ldyBEYXRlKHJhdyk7XHJcbiAgICBpZiAoIU51bWJlci5pc05hTihkdC5nZXRUaW1lKCkpKSB7XHJcbiAgICAgIGNvbnN0IHl5eXkgPSBkdC5nZXRGdWxsWWVhcigpO1xyXG4gICAgICBjb25zdCBtbSA9IFN0cmluZyhkdC5nZXRNb250aCgpICsgMSkucGFkU3RhcnQoMiwgXCIwXCIpO1xyXG4gICAgICBjb25zdCBkZCA9IFN0cmluZyhkdC5nZXREYXRlKCkpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcclxuICAgICAgcmV0dXJuIGAke3l5eXl9LSR7bW19LSR7ZGR9YDtcclxuICAgIH1cclxuICAgIHJldHVybiBcIlwiO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgbWF0Y2hPcHRpb25WYWx1ZSA9IHVzZUNhbGxiYWNrKChvcHRpb25zLCByYXcpID0+IHtcclxuICAgIGlmIChyYXcgPT0gbnVsbCkgcmV0dXJuIFwiXCI7XHJcbiAgICBjb25zdCByYXdTdHIgPSBTdHJpbmcocmF3KS50cmltKCk7XHJcbiAgICBpZiAoIXJhd1N0cikgcmV0dXJuIFwiXCI7XHJcblxyXG4gICAgY29uc3Qgbm9ybWFsaXplVGV4dCA9IChzKSA9PlxyXG4gICAgICBTdHJpbmcocyB8fCBcIlwiKVxyXG4gICAgICAgIC50b0xvd2VyQ2FzZSgpXHJcbiAgICAgICAgLm5vcm1hbGl6ZShcIk5GRFwiKVxyXG4gICAgICAgIC5yZXBsYWNlKC9bXFx1MDMwMC1cXHUwMzZmXS9nLCBcIlwiKVxyXG4gICAgICAgIC50cmltKCk7XHJcblxyXG4gICAgY29uc3QgcmF3Tm9ybSA9IG5vcm1hbGl6ZVRleHQocmF3U3RyKTtcclxuICAgIGNvbnN0IGFsdE5vcm0gPSByYXdOb3JtLmVuZHNXaXRoKFwib1wiKSA/IGAke3Jhd05vcm0uc2xpY2UoMCwgLTEpfWFgIDogcmF3Tm9ybTtcclxuXHJcbiAgICBjb25zdCBtYXRjaCA9IChvcHRpb25zIHx8IFtdKS5maW5kKChvKSA9PiB7XHJcbiAgICAgIGNvbnN0IHZhbCA9IFN0cmluZyhvPy52YWx1ZSA/PyBvPy5WYWx1ZSA/PyBcIlwiKS50cmltKCk7XHJcbiAgICAgIGNvbnN0IHRleHQgPSBTdHJpbmcobz8udGV4dCA/PyBvPy5UZXh0ID8/IFwiXCIpLnRyaW0oKTtcclxuICAgICAgY29uc3QgdGV4dE5vcm0gPSBub3JtYWxpemVUZXh0KHRleHQpO1xyXG4gICAgICByZXR1cm4gdmFsID09PSByYXdTdHIgfHwgdmFsID09PSByYXdOb3JtIHx8IHRleHROb3JtID09PSByYXdOb3JtIHx8IHRleHROb3JtID09PSBhbHROb3JtO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gbWF0Y2ggPyBTdHJpbmcobWF0Y2gudmFsdWUgPz8gbWF0Y2guVmFsdWUgPz8gcmF3U3RyKSA6IHJhd1N0cjtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IGluaXRpYWxUcmFuc0RhdGUgPSBub3JtYWxpemVEYXRlVG9JbnB1dChTdHJpbmcoZGV0YWlsLnRyYW5zRGF0ZSA/PyBkZXRhaWwuVHJhbnNEYXRlID8/IFwiXCIpKTtcclxuICBjb25zdCBkZWZhdWx0VmlzaXRUeXBlID0gU3RyaW5nKHZpc2l0VHlwZXNbMF0/LnZhbHVlID8/IHZpc2l0VHlwZXNbMF0/LlZhbHVlID8/IFwiXCIpO1xyXG4gIGNvbnN0IHJhd0luaXRpYWxWaXNpdFR5cGUgPSBTdHJpbmcoXHJcbiAgICBkZXRhaWwudGlwb1Zpc2l0YSA/PyBkZXRhaWwuVGlwb1Zpc2l0YSA/PyBkZXRhaWwudmlzaXRUeXBlID8/IGRldGFpbC5WaXNpdFR5cGUgPz8gXCJcIlxyXG4gICk7XHJcbiAgY29uc3QgaW5pdGlhbFZpc2l0VHlwZSA9IG1hdGNoT3B0aW9uVmFsdWUodmlzaXRUeXBlcywgcmF3SW5pdGlhbFZpc2l0VHlwZSkgfHwgZGVmYXVsdFZpc2l0VHlwZTtcclxuICBjb25zdCByYXdJbml0aWFsQ29udGFjdE1ldGhvZCA9IFN0cmluZyhcclxuICAgIGRldGFpbC5jb250YWN0TWV0aG9kID8/IGRldGFpbC5Db250YWN0TWV0aG9kID8/IFwiXCJcclxuICApO1xyXG4gIGNvbnN0IGluaXRpYWxDb250YWN0TWV0aG9kID0gbWF0Y2hPcHRpb25WYWx1ZShjb250YWN0TWV0aG9kcywgcmF3SW5pdGlhbENvbnRhY3RNZXRob2QpO1xyXG4gIGNvbnN0IHJhd0luaXRpYWxBc2lzdGVudGUgPSBTdHJpbmcoXHJcbiAgICBkZXRhaWwuYXNpc3RlbnRlVGlwbyA/PyBkZXRhaWwuQXNpc3RlbnRlVGlwbyA/PyAoYXNpc3RlbnRlVGlwb3NbMF0/LnZhbHVlID8/IGFzaXN0ZW50ZVRpcG9zWzBdPy5WYWx1ZSA/PyBcIlwiKVxyXG4gICk7XHJcbiAgY29uc3QgaW5pdGlhbEFzaXN0ZW50ZSA9IG1hdGNoT3B0aW9uVmFsdWUoYXNpc3RlbnRlVGlwb3MsIHJhd0luaXRpYWxBc2lzdGVudGUpIHx8IHJhd0luaXRpYWxBc2lzdGVudGU7XHJcblxyXG4gIGNvbnN0IFt0cmFuc0RhdGUsIHNldFRyYW5zRGF0ZV0gPSB1c2VTdGF0ZShpbml0aWFsVHJhbnNEYXRlKTtcclxuICBjb25zdCBbdmlzaXRUeXBlLCBzZXRWaXNpdFR5cGVdID0gdXNlU3RhdGUoaW5pdGlhbFZpc2l0VHlwZSk7XHJcbiAgY29uc3QgW2NvbnRhY3RNZXRob2QsIHNldENvbnRhY3RNZXRob2RdID0gdXNlU3RhdGUoaW5pdGlhbENvbnRhY3RNZXRob2QpO1xyXG4gIGNvbnN0IFthc2lzdGVudGVUaXBvLCBzZXRBc2lzdGVudGVUaXBvXSA9IHVzZVN0YXRlKGluaXRpYWxBc2lzdGVudGUpO1xyXG4gIGNvbnN0IFtkZXNjcmlwdGlvbiwgc2V0RGVzY3JpcHRpb25dID0gdXNlU3RhdGUoU3RyaW5nKGRldGFpbC5kZXNjcmlwdGlvbiA/PyBkZXRhaWwuRGVzY3JpcHRpb24gPz8gXCJcIikpO1xyXG4gIGNvbnN0IFtjb21lbnRhcmlvcywgc2V0Q29tZW50YXJpb3NdID0gdXNlU3RhdGUoU3RyaW5nKGRldGFpbC5jb21lbnRhcmlvcyA/PyBkZXRhaWwuQ29tZW50YXJpb3MgPz8gXCJcIikpO1xyXG4gIGNvbnN0IFthbnRlY2VkZW50ZXMsIHNldEFudGVjZWRlbnRlc10gPSB1c2VTdGF0ZShTdHJpbmcoZGV0YWlsLmFudGVjZWRlbnRlcyA/PyBkZXRhaWwuQW50ZWNlZGVudGVzID8/IFwiXCIpKTtcclxuICBjb25zdCBbY29uY2x1c2lvbmVzLCBzZXRDb25jbHVzaW9uZXNdID0gdXNlU3RhdGUoU3RyaW5nKGRldGFpbC5jb25jbHVzaW9uZXMgPz8gZGV0YWlsLkNvbmNsdXNpb25lcyA/PyBcIlwiKSk7XHJcbiAgY29uc3QgW3N0YXR1cywgc2V0U3RhdHVzXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtidXN5LCBzZXRCdXN5XSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbaXNFZGl0aW5nLCBzZXRJc0VkaXRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtpc0h5ZHJhdGluZywgc2V0SXNIeWRyYXRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFttb2RhbEVycm9yLCBzZXRNb2RhbEVycm9yXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IHJlYWRPbmx5U3VyZmFjZVJlZiA9IHVzZVJlZihudWxsKTtcclxuICBjb25zdCBlZGl0U25hcHNob3RSZWYgPSB1c2VSZWYobnVsbCk7XHJcblxyXG4gIGNvbnN0IHJlY0lkID0gYWN0aXZpdHlSZWNJZDtcbiAgY29uc3QgYWNjb3VudE51bSA9IFN0cmluZyhkZXRhaWwuYWNjb3VudE51bSA/PyBkZXRhaWwuQWNjb3VudE51bSA/PyBcIlwiKTtcbiAgY29uc3QgYWN0aXZpZGFkSWQgPSBTdHJpbmcoZGV0YWlsLmFjdGl2aWRhZElkID8/IGRldGFpbC5BY3RpdmlkYWRJZCA/PyBcIlwiKTtcbiAgY29uc3QgZGV0YWlsT3duZXJBeFVzZXJJZCA9IGZpcnN0RGV0YWlsVGV4dChcbiAgICBkZXRhaWwub3duZXJBeFVzZXJJZCxcbiAgICBkZXRhaWwuT3duZXJBeFVzZXJJZCxcbiAgICBkZXRhaWwuaW5kQ3JlYXRlZEJ5VXNlcklkLFxuICAgIGRldGFpbC5JTkRDcmVhdGVkQnlVc2VySWQsXG4gICAgZGV0YWlsLmNyZWF0ZWRCeVVzZXJJZCxcbiAgICBkZXRhaWwuQ3JlYXRlZEJ5VXNlcklkLFxuICAgIGRldGFpbC51c2VySWQsXG4gICAgZGV0YWlsLlVzZXJJZFxuICApO1xuICBjb25zdCBkZXRhaWxPd25lclJhd1RleHQgPSBmaXJzdERldGFpbFRleHQoZGV0YWlsLm93bmVyTmFtZSwgZGV0YWlsLk93bmVyTmFtZSwgZGV0YWlsLm93bmVyQWxpYXMsIGRldGFpbC5Pd25lckFsaWFzKTtcbiAgY29uc3QgdmlzaWJsZU93bmVyID0gdXNlTWVtbygoKSA9PiB7XG4gICAgaWYgKCFkZXRhaWxPd25lckF4VXNlcklkKSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gKFxuICAgICAgdmlzaWJsZVZpc2l0VXNlcnMuZmluZCgodXNlcikgPT4gdXNlci5heFVzZXJJZC50b1VwcGVyQ2FzZSgpID09PSBkZXRhaWxPd25lckF4VXNlcklkLnRvVXBwZXJDYXNlKCkpIHx8IG51bGxcbiAgICApO1xuICB9LCBbZGV0YWlsT3duZXJBeFVzZXJJZCwgdmlzaWJsZVZpc2l0VXNlcnNdKTtcbiAgY29uc3QgZGV0YWlsT3duZXJUZXh0ID0gdmlzaWJsZU93bmVyID8gZm9ybWF0VmlzaWJsZVZpc2l0VXNlckxhYmVsKHZpc2libGVPd25lcikgOiBkZXRhaWxPd25lclJhd1RleHQgfHwgZGV0YWlsT3duZXJBeFVzZXJJZDtcbiAgY29uc3Qgc2hvd093bmVyRmllbGQgPSB2aXNpYmxlVXNlcnNSZWFkeSAmJiB2aXNpYmxlVmlzaXRVc2Vycy5sZW5ndGggPiAwO1xuXHJcbiAgY29uc3QgeyBlZGl0TW9kZUtleVJlZiwgc3luY0VkaXRNb2RlRmxhZywgY2xlYXJEcmFmdCwgYXBwbHlEcmFmdFZhbHVlcyB9ID0gdXNlRGV0YWlsRWRpdFNlc3Npb24oe1xyXG4gICAgYWN0aXZpZGFkSWQsXHJcbiAgICByZWNJZCxcclxuICAgIGNhbkVkaXRIaXN0b3J5LFxyXG4gICAgaXNFZGl0aW5nLFxyXG4gICAgc2V0SXNFZGl0aW5nLFxyXG4gICAgdHJhbnNEYXRlLFxyXG4gICAgdmlzaXRUeXBlLFxyXG4gICAgY29udGFjdE1ldGhvZCxcclxuICAgIGFzaXN0ZW50ZVRpcG8sXHJcbiAgICBkZXNjcmlwdGlvbixcclxuICAgIGNvbWVudGFyaW9zLFxyXG4gICAgYW50ZWNlZGVudGVzLFxyXG4gICAgY29uY2x1c2lvbmVzLFxyXG4gICAgc2V0VHJhbnNEYXRlLFxyXG4gICAgc2V0VmlzaXRUeXBlLFxyXG4gICAgc2V0Q29udGFjdE1ldGhvZCxcclxuICAgIHNldEFzaXN0ZW50ZVRpcG8sXHJcbiAgICBzZXREZXNjcmlwdGlvbixcclxuICAgIHNldENvbWVudGFyaW9zLFxyXG4gICAgc2V0QW50ZWNlZGVudGVzLFxyXG4gICAgc2V0Q29uY2x1c2lvbmVzLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBoYXNTZXJ2ZXJEZXRhaWwgPVxyXG4gICAgaGFzVmFsdWUocmVjSWQpICYmXHJcbiAgICBoYXNWYWx1ZShhY2NvdW50TnVtKSAmJlxyXG4gICAgaGFzVmFsdWUoZGV0YWlsLnRyYW5zRGF0ZSB8fCBkZXRhaWwuVHJhbnNEYXRlIHx8IFwiXCIpO1xyXG5cclxuICBjb25zdCBzaG91bGRIeWRyYXRlID0gISFhY3RpdmlkYWRJZCAmJiAhaGFzU2VydmVyRGV0YWlsO1xyXG5cclxuICBjb25zdCBvcGVuVGV4dEVkaXRvciA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKFxyXG4gICAgICBmaWVsZElkOiBzdHJpbmcsXHJcbiAgICAgIGZpZWxkTGFiZWw6IHN0cmluZyxcclxuICAgICAgZmllbGRWYWx1ZTogc3RyaW5nLFxyXG4gICAgICBvcHRpb25zOiB7IGFsbG93RWRpdD86IGJvb2xlYW47IHJlYWRPbmx5PzogYm9vbGVhbjsgZWRpdE1vZGVLZXk/OiBzdHJpbmcgfSA9IHt9XHJcbiAgICApID0+IHtcclxuICAgICAgbmF2aWdhdGVUb1RleHRFZGl0b3JGaWVsZCh7XHJcbiAgICAgICAgZmllbGRJZCxcclxuICAgICAgICBmaWVsZExhYmVsLFxyXG4gICAgICAgIGZpZWxkVmFsdWUsXHJcbiAgICAgICAgcmVhZE9ubHk6IG9wdGlvbnM/LnJlYWRPbmx5ID09PSB0cnVlLFxyXG4gICAgICAgIGFsbG93RWRpdDogb3B0aW9ucz8uYWxsb3dFZGl0ICE9PSBmYWxzZSxcclxuICAgICAgICBlZGl0TW9kZUtleTogb3B0aW9ucz8uZWRpdE1vZGVLZXksXHJcbiAgICAgICAgZWRpdE1vZGVSZXR1cm5UdGxNczogRURJVE9SX1JFVFVSTl9GTEFHX1RUTF9NUyxcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgW11cclxuICApO1xyXG5cclxuICBjb25zdCBoYW5kbGVDb21lbnRhcmlvc1RhcCA9IHVzZUNhbGxiYWNrKChldmVudCkgPT4ge1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIG9wZW5UZXh0RWRpdG9yKGZpZWxkSWRDb21lbnRhcmlvcywgaW5kVChcIlZpc2l0c19GaWVsZF9Db21tZW50c1wiLCBcIkNvbW1lbnRzXCIpLCBjb21lbnRhcmlvcywge1xyXG4gICAgICByZWFkT25seTogIWlzRWRpdGluZyxcclxuICAgICAgYWxsb3dFZGl0OiBjYW5FZGl0SGlzdG9yeSxcclxuICAgICAgZWRpdE1vZGVLZXk6IGVkaXRNb2RlS2V5UmVmLmN1cnJlbnRcclxuICAgIH0pO1xyXG4gIH0sIFtjb21lbnRhcmlvcywgaXNFZGl0aW5nLCBjYW5FZGl0SGlzdG9yeSwgb3BlblRleHRFZGl0b3JdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQ29tZW50YXJpb3NIb2xkID0gdXNlQ2FsbGJhY2soKHRhcmdldCwgY2xpZW50WSkgPT4ge1xyXG4gICAgaWYgKCF0YXJnZXQgfHwgIWlzT3ZlcmZsb3dpbmcodGFyZ2V0KSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgc2V0UHJldmlld0FuY2hvcih0YXJnZXQpO1xyXG4gICAgcmV0dXJuIHNob3dQcmV2aWV3VG9vbHRpcChTdHJpbmcoY29tZW50YXJpb3MgfHwgXCJcIiksIGNsaWVudFkpO1xyXG4gIH0sIFtjb21lbnRhcmlvc10pO1xyXG5cclxuICBjb25zdCBoYW5kbGVBbnRlY2VkZW50ZXNUYXAgPSB1c2VDYWxsYmFjaygoZXZlbnQpID0+IHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBvcGVuVGV4dEVkaXRvcihmaWVsZElkQW50ZWNlZGVudGVzLCBpbmRUKFwiVmlzaXRzX0ZpZWxkX0JhY2tncm91bmRcIiwgXCJCYWNrZ3JvdW5kXCIpLCBhbnRlY2VkZW50ZXMsIHtcclxuICAgICAgcmVhZE9ubHk6ICFpc0VkaXRpbmcsXHJcbiAgICAgIGFsbG93RWRpdDogY2FuRWRpdEhpc3RvcnksXHJcbiAgICAgIGVkaXRNb2RlS2V5OiBlZGl0TW9kZUtleVJlZi5jdXJyZW50XHJcbiAgICB9KTtcclxuICB9LCBbYW50ZWNlZGVudGVzLCBpc0VkaXRpbmcsIGNhbkVkaXRIaXN0b3J5LCBvcGVuVGV4dEVkaXRvcl0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVBbnRlY2VkZW50ZXNIb2xkID0gdXNlQ2FsbGJhY2soKHRhcmdldCwgY2xpZW50WSkgPT4ge1xyXG4gICAgaWYgKCF0YXJnZXQgfHwgIWlzT3ZlcmZsb3dpbmcodGFyZ2V0KSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgc2V0UHJldmlld0FuY2hvcih0YXJnZXQpO1xyXG4gICAgcmV0dXJuIHNob3dQcmV2aWV3VG9vbHRpcChTdHJpbmcoYW50ZWNlZGVudGVzIHx8IFwiXCIpLCBjbGllbnRZKTtcclxuICB9LCBbYW50ZWNlZGVudGVzXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUNvbmNsdXNpb25lc1RhcCA9IHVzZUNhbGxiYWNrKChldmVudCkgPT4ge1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIG9wZW5UZXh0RWRpdG9yKGZpZWxkSWRDb25jbHVzaW9uZXMsIGluZFQoXCJWaXNpdHNfRmllbGRfQ29uY2x1c2lvbnNcIiwgXCJDb25jbHVzaW9uc1wiKSwgY29uY2x1c2lvbmVzLCB7XHJcbiAgICAgIHJlYWRPbmx5OiAhaXNFZGl0aW5nLFxyXG4gICAgICBhbGxvd0VkaXQ6IGNhbkVkaXRIaXN0b3J5LFxyXG4gICAgICBlZGl0TW9kZUtleTogZWRpdE1vZGVLZXlSZWYuY3VycmVudFxyXG4gICAgfSk7XHJcbiAgfSwgW2NvbmNsdXNpb25lcywgaXNFZGl0aW5nLCBjYW5FZGl0SGlzdG9yeSwgb3BlblRleHRFZGl0b3JdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQ29uY2x1c2lvbmVzSG9sZCA9IHVzZUNhbGxiYWNrKCh0YXJnZXQsIGNsaWVudFkpID0+IHtcclxuICAgIGlmICghdGFyZ2V0IHx8ICFpc092ZXJmbG93aW5nKHRhcmdldCkpIHJldHVybiBmYWxzZTtcclxuICAgIHNldFByZXZpZXdBbmNob3IodGFyZ2V0KTtcclxuICAgIHJldHVybiBzaG93UHJldmlld1Rvb2x0aXAoU3RyaW5nKGNvbmNsdXNpb25lcyB8fCBcIlwiKSwgY2xpZW50WSk7XHJcbiAgfSwgW2NvbmNsdXNpb25lc10pO1xyXG5cclxuICBjb25zdCBjb21lbnRhcmlvc1RhcCA9IHVzZVRhcEd1YXJkKGhhbmRsZUNvbWVudGFyaW9zVGFwLCBoYW5kbGVDb21lbnRhcmlvc0hvbGQpO1xyXG4gIGNvbnN0IGFudGVjZWRlbnRlc1RhcCA9IHVzZVRhcEd1YXJkKGhhbmRsZUFudGVjZWRlbnRlc1RhcCwgaGFuZGxlQW50ZWNlZGVudGVzSG9sZCk7XHJcbiAgY29uc3QgY29uY2x1c2lvbmVzVGFwID0gdXNlVGFwR3VhcmQoaGFuZGxlQ29uY2x1c2lvbmVzVGFwLCBoYW5kbGVDb25jbHVzaW9uZXNIb2xkKTtcclxuXHJcbiAgY29uc3QgdGV4dEVkaXRvckJpbmRpbmdzID0gdXNlTWVtbyhcclxuICAgICgpID0+IFtcclxuICAgICAgeyBmaWVsZElkOiBmaWVsZElkQ29tZW50YXJpb3MsIGFwcGx5VmFsdWU6IHNldENvbWVudGFyaW9zIH0sXHJcbiAgICAgIHsgZmllbGRJZDogZmllbGRJZEFudGVjZWRlbnRlcywgYXBwbHlWYWx1ZTogc2V0QW50ZWNlZGVudGVzIH0sXHJcbiAgICAgIHsgZmllbGRJZDogZmllbGRJZENvbmNsdXNpb25lcywgYXBwbHlWYWx1ZTogc2V0Q29uY2x1c2lvbmVzIH0sXHJcbiAgICBdLFxyXG4gICAgW2ZpZWxkSWRBbnRlY2VkZW50ZXMsIGZpZWxkSWRDb21lbnRhcmlvcywgZmllbGRJZENvbmNsdXNpb25lc11cclxuICApO1xyXG5cclxuICBjb25zdCB7IGFwcGx5VmFsdWVzOiBhcHBseVRleHRFZGl0b3JWYWx1ZXMgfSA9IHVzZVRleHRFZGl0b3JGaWVsZHModGV4dEVkaXRvckJpbmRpbmdzLCB7XHJcbiAgICBhcHBseU9uTW91bnQ6ICFhY3RpdmlkYWRJZCxcclxuICAgIGxpc3RlblBhZ2VTaG93OiB0cnVlLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCB7IG1vZGFsLCBvcGVuQ29uZmlybSwgY2xvc2VDb25maXJtLCBoYW5kbGVDb25maXJtIH0gPSB1c2VDb25maXJtRGlhbG9nKHtcclxuICAgIGRlZmF1bHRDb25maXJtVGV4dDogaW5kVChcIkNvbmZpcm1fWWVzXCIsIFwiQ29uZmlybV9ZZXNcIiksXHJcbiAgICBkZWZhdWx0Q2FuY2VsVGV4dDogaW5kVChcIkNvbmZpcm1fTm9cIiwgXCJDb25maXJtX05vXCIpXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZU1vZGFsQ29uZmlybSA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcclxuICAgIHNldE1vZGFsRXJyb3IoXCJcIik7XHJcbiAgICBhd2FpdCBoYW5kbGVDb25maXJtKHtcclxuICAgICAgYnVzeSxcclxuICAgICAgb25FcnJvcjogKG1zZykgPT4ge1xyXG4gICAgICAgIHNldE1vZGFsRXJyb3IobXNnKTtcclxuICAgICAgICBzZXRTdGF0dXMobXNnKTtcclxuICAgICAgICBmbGFzaEFjdGlvbk1hcmsoXCJlcnJvclByb2Nlc3NcIiwgMTUwMCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0sIFtidXN5LCBoYW5kbGVDb25maXJtXSk7XHJcblxyXG4gIGNvbnN0IG1vZGFsTG9hZGluZ1RleHQgPSBpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJDb21tb25fTG9hZGluZ1wiKTtcclxuICBjb25zdCBtb2RhbENhbmNlbFRleHQgPSBtb2RhbC5jYW5jZWxUZXh0IHx8IGluZFQoXCJDb25maXJtX05vXCIsIFwiQ29uZmlybV9Ob1wiKTtcclxuICBjb25zdCBtb2RhbENvbmZpcm1UZXh0ID0gYnVzeVxyXG4gICAgPyBtb2RhbExvYWRpbmdUZXh0XHJcbiAgICA6ICghYnVzeSAmJiBtb2RhbEVycm9yID8gaW5kVChcIkNvbW1vbl9PS1wiLCBcIkNvbW1vbl9PS1wiKSA6IChtb2RhbC5jb25maXJtVGV4dCB8fCBpbmRUKFwiQ29uZmlybV9ZZXNcIiwgXCJDb25maXJtX1llc1wiKSkpO1xyXG5cclxuICBjb25zdCBoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm0gPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAoIWJ1c3kgJiYgbW9kYWxFcnJvcikge1xyXG4gICAgICBjbG9zZUNvbmZpcm0oKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaGFuZGxlTW9kYWxDb25maXJtKCk7XHJcbiAgfSwgW2J1c3ksIG1vZGFsRXJyb3IsIGNsb3NlQ29uZmlybSwgaGFuZGxlTW9kYWxDb25maXJtXSk7XHJcblxyXG4gIGNvbnN0IGhhc0FjdGl2ZVByb2Nlc3MgPSB1c2VNZW1vKCgpID0+IGJ1c3kgfHwgaXNFZGl0aW5nLCBbYnVzeSwgaXNFZGl0aW5nXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICB3aW5kb3cuX19pbmRTZXROYXZpZ2F0aW9uR3VhcmQ/LihoYXNBY3RpdmVQcm9jZXNzKTtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIHdpbmRvdy5fX2luZENsZWFyTmF2aWdhdGlvbkd1YXJkPy4oKTtcclxuICAgIH07XHJcbiAgfSwgW2hhc0FjdGl2ZVByb2Nlc3NdKTtcclxuXHJcbiAgdXNlRGV0YWlsSHlkcmF0aW9uKHtcclxuICAgIGFjdGl2aWRhZElkLFxyXG4gICAgc2hvdWxkSHlkcmF0ZSxcclxuICAgIHZpc2l0VHlwZXMsXHJcbiAgICBjb250YWN0TWV0aG9kcyxcclxuICAgIGFzaXN0ZW50ZVRpcG9zLFxyXG4gICAgZGVmYXVsdFZpc2l0VHlwZSxcclxuICAgIGluaXRpYWxBc2lzdGVudGUsXHJcbiAgICBub3JtYWxpemVEYXRlVG9JbnB1dCxcclxuICAgIG1hdGNoT3B0aW9uVmFsdWUsXHJcbiAgICBhcHBseURyYWZ0VmFsdWVzLFxyXG4gICAgYXBwbHlUZXh0RWRpdG9yVmFsdWVzLFxyXG4gICAgc2V0U3RhdHVzLFxyXG4gICAgc2V0SXNIeWRyYXRpbmcsXHJcbiAgICBzZXRUcmFuc0RhdGUsXHJcbiAgICBzZXRWaXNpdFR5cGUsXHJcbiAgICBzZXRDb250YWN0TWV0aG9kLFxyXG4gICAgc2V0QXNpc3RlbnRlVGlwbyxcclxuICAgIHNldERlc2NyaXB0aW9uLFxyXG4gICAgc2V0Q29tZW50YXJpb3MsXHJcbiAgICBzZXRBbnRlY2VkZW50ZXMsXHJcbiAgICBzZXRDb25jbHVzaW9uZXMsXHJcbiAgfSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBlbCA9IHJlYWRPbmx5U3VyZmFjZVJlZi5jdXJyZW50O1xyXG4gICAgaWYgKCFlbCkgcmV0dXJuO1xyXG4gICAgaWYgKCFpc0VkaXRpbmcpIHtcclxuICAgICAgZWwuY2xhc3NMaXN0LmFkZChcImluZC1yZWFkb25seS1zdXJmYWNlXCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShcImluZC1yZWFkb25seS1zdXJmYWNlXCIpO1xyXG4gICAgfVxyXG4gIH0sIFtpc0VkaXRpbmddKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmIChpc0VkaXRpbmcpIHtcclxuICAgICAgaWYgKCFlZGl0U25hcHNob3RSZWYuY3VycmVudCkge1xyXG4gICAgICAgIGVkaXRTbmFwc2hvdFJlZi5jdXJyZW50ID0ge1xyXG4gICAgICAgICAgdHJhbnNEYXRlLFxyXG4gICAgICAgICAgdmlzaXRUeXBlLFxyXG4gICAgICAgICAgY29udGFjdE1ldGhvZCxcclxuICAgICAgICAgIGFzaXN0ZW50ZVRpcG8sXHJcbiAgICAgICAgICBkZXNjcmlwdGlvbixcclxuICAgICAgICAgIGNvbWVudGFyaW9zLFxyXG4gICAgICAgICAgYW50ZWNlZGVudGVzLFxyXG4gICAgICAgICAgY29uY2x1c2lvbmVzXHJcbiAgICAgICAgfTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBlZGl0U25hcHNob3RSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgfSwgW2lzRWRpdGluZywgdHJhbnNEYXRlLCB2aXNpdFR5cGUsIGNvbnRhY3RNZXRob2QsIGFzaXN0ZW50ZVRpcG8sIGRlc2NyaXB0aW9uLCBjb21lbnRhcmlvcywgYW50ZWNlZGVudGVzLCBjb25jbHVzaW9uZXNdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmIChpc0VkaXRpbmcpIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICByZXR1cm4gYmluZFJlYWRPbmx5R3VhcmQocmVhZE9ubHlTdXJmYWNlUmVmLmN1cnJlbnQpO1xyXG4gIH0sIFtpc0VkaXRpbmddKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlRW5hYmxlRWRpdCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmICghY2FuRWRpdEhpc3RvcnkpIHtcclxuICAgICAgc2hvd1Blcm1pc3Npb25Nb2RhbCgpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBzZXRJc0VkaXRpbmcodHJ1ZSk7XHJcbiAgICBzeW5jRWRpdE1vZGVGbGFnKHRydWUpO1xyXG4gICAgc2V0U3RhdHVzKGluZFQoXCJWaXNpdHNfRGV0YWlsX0VkaXRpbmdFbmFibGVkXCIsIFwiRWRpdGluZyBlbmFibGVkXCIpKTtcclxuICB9LCBbY2FuRWRpdEhpc3RvcnksIHN5bmNFZGl0TW9kZUZsYWddKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQ2FuY2VsRWRpdCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmICghaXNFZGl0aW5nKSByZXR1cm47XHJcbiAgICBzZXRJc0VkaXRpbmcoZmFsc2UpO1xyXG4gICAgc3luY0VkaXRNb2RlRmxhZyhmYWxzZSk7XHJcbiAgICBjbGVhckRyYWZ0KCk7XHJcbiAgICBzZXRTdGF0dXMoaW5kVChcIkNvbW1vbl9DYW5jZWxcIiwgXCJDYW5jZWxcIikpO1xyXG4gICAgd2luZG93Ll9faW5kQnlwYXNzTmF2aWdhdGlvbkd1YXJkT25jZT8uKCk7XHJcbiAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgfSwgW2lzRWRpdGluZywgc3luY0VkaXRNb2RlRmxhZywgY2xlYXJEcmFmdF0pO1xyXG5cclxuICBjb25zdCB7IGhhbmRsZVVwZGF0ZSwgaGFuZGxlRGVsZXRlIH0gPSB1c2VEZXRhaWxNdXRhdGlvbnMoe1xyXG4gICAgYnVzeSxcclxuICAgIGlzRWRpdGluZyxcclxuICAgIGNhbkVkaXRIaXN0b3J5LFxyXG4gICAgY2FuRGVsZXRlSGlzdG9yeSxcclxuICAgIHJlY0lkLFxyXG4gICAgYWNjb3VudE51bSxcclxuICAgIHRyYW5zRGF0ZSxcclxuICAgIHZpc2l0VHlwZSxcclxuICAgIGNvbnRhY3RNZXRob2QsXHJcbiAgICBhc2lzdGVudGVUaXBvLFxyXG4gICAgZGVzY3JpcHRpb24sXHJcbiAgICBjb21lbnRhcmlvcyxcclxuICAgIGFudGVjZWRlbnRlcyxcclxuICAgIGNvbmNsdXNpb25lcyxcclxuICAgIHZpc2l0VHlwZXMsXHJcbiAgICBjb250YWN0TWV0aG9kcyxcclxuICAgIGFzaXN0ZW50ZVRpcG9zLFxyXG4gICAgZGVmYXVsdFZpc2l0VHlwZSxcclxuICAgIHJhd0luaXRpYWxWaXNpdFR5cGUsXHJcbiAgICByYXdJbml0aWFsQ29udGFjdE1ldGhvZCxcclxuICAgIHJhd0luaXRpYWxBc2lzdGVudGUsXHJcbiAgICBtYXRjaE9wdGlvblZhbHVlLFxyXG4gICAgY2xlYXJEcmFmdCxcclxuICAgIHN5bmNFZGl0TW9kZUZsYWcsXHJcbiAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgc2V0QnVzeSxcclxuICAgIHNldFN0YXR1cyxcclxuICAgIHNldElzRWRpdGluZyxcclxuICB9KTtcclxuXHJcbiAgdXNlRGV0YWlsVG9wYmFyQWN0aW9ucyh7XHJcbiAgICBidXN5LFxyXG4gICAgbW9kYWxPcGVuOiBtb2RhbC5vcGVuLFxyXG4gICAgaXNFZGl0aW5nLFxyXG4gICAgY2FuRWRpdEhpc3RvcnksXHJcbiAgICBjYW5EZWxldGVIaXN0b3J5LFxyXG4gICAgdHJhbnNEYXRlLFxyXG4gICAgc2V0TW9kYWxFcnJvcixcclxuICAgIGhhbmRsZUVuYWJsZUVkaXQsXHJcbiAgICBoYW5kbGVDYW5jZWxFZGl0LFxyXG4gICAgaGFuZGxlVXBkYXRlLFxyXG4gICAgaGFuZGxlRGVsZXRlLFxyXG4gICAgb3BlbkNvbmZpcm0sXHJcbiAgICBjbG9zZUNvbmZpcm0sXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IGRlc2NyaXB0aW9uTGFiZWwgPSBpbmRUKFwiVmlzaXRzX0ZpZWxkX0Rlc2NyaXB0aW9uXCIsIFwiRGVzY3JpcHRpb25cIik7XHJcbiAgY29uc3QgY29tbWVudHNMYWJlbCA9IGluZFQoXCJWaXNpdHNfRmllbGRfQ29tbWVudHNcIiwgXCJDb21tZW50c1wiKTtcclxuICBjb25zdCBiYWNrZ3JvdW5kTGFiZWwgPSBpbmRUKFwiVmlzaXRzX0ZpZWxkX0JhY2tncm91bmRcIiwgXCJCYWNrZ3JvdW5kXCIpO1xyXG4gIGNvbnN0IGNvbmNsdXNpb25zTGFiZWwgPSBpbmRUKFwiVmlzaXRzX0ZpZWxkX0NvbmNsdXNpb25zXCIsIFwiQ29uY2x1c2lvbnNcIik7XHJcbiAgY29uc3QgZGV0YWlsRGVzY3JpcHRpb25DbGFzc05hbWUgPSBjbGFzc05hbWVzKFxyXG4gICAgXCJmb3JtLWNvbnRyb2xcIixcclxuICAgIGlzRWRpdGluZyA/IFwiYm9yZGVyLW5ldXRyYWwtMjAwIHRleHQtbmV1dHJhbC05MDBcIiA6IFwiYm9yZGVyLW5ldXRyYWwtMjAwIGluZC1yZWFkb25seS1maWVsZFwiXHJcbiAgKTtcclxuICBjb25zdCBkZXRhaWxSZWFkT25seUNsYXNzTmFtZSA9IGNsYXNzTmFtZXMoXCJmb3JtLWNvbnRyb2wgY3Vyc29yLXBvaW50ZXJcIiwgIWlzRWRpdGluZyA/IFwiaW5kLXJlYWRvbmx5LWZpZWxkXCIgOiBcIlwiKTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS00XCI+XHJcbiAgICAgIDxDb25maXJtTW9kYWxcclxuICAgICAgICBvcGVuPXttb2RhbC5vcGVufVxyXG4gICAgICAgIHRpdGxlPXttb2RhbC50aXRsZX1cclxuICAgICAgICBtZXNzYWdlPXttb2RhbC5tZXNzYWdlfVxyXG4gICAgICAgIGNvbmZpcm1UZXh0PXttb2RhbENvbmZpcm1UZXh0fVxyXG4gICAgICAgIGNhbmNlbFRleHQ9e21vZGFsQ2FuY2VsVGV4dH1cclxuICAgICAgICBsb2FkaW5nVGV4dD17bW9kYWxMb2FkaW5nVGV4dH1cclxuICAgICAgICBzaG93Q2FuY2VsPXttb2RhbC5zaG93Q2FuY2VsfVxyXG4gICAgICAgIHNob3dDb25maXJtPXttb2RhbC5zaG93Q29uZmlybX1cclxuICAgICAgICBidXN5PXtidXN5fVxyXG4gICAgICAgIGVycm9yPXttb2RhbEVycm9yfVxyXG4gICAgICAgIHN0YXR1cz17c3RhdHVzfVxyXG4gICAgICAgIG9uQ29uZmlybT17aGFuZGxlTW9kYWxCdXR0b25Db25maXJtfVxyXG4gICAgICAgIG9uQ2FuY2VsPXtjbG9zZUNvbmZpcm19XHJcbiAgICAgIC8+XHJcbiAgICAgIDxkaXZcclxuICAgICAgICByZWY9e3JlYWRPbmx5U3VyZmFjZVJlZn1cclxuICAgICAgICBjbGFzc05hbWU9XCJyZWxhdGl2ZSBzaGFkb3cteHMgZ2xhc3MtcGFuZWwgcC00IHNwYWNlLXktNCBib3JkZXIgYm9yZGVyLW5ldXRyYWwtMjAwIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldXCJcclxuICAgICAgPlxyXG4gICAgICAgIHtpc0h5ZHJhdGluZyAmJiAoXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgei0xMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBiZy13aGl0ZS83MCByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXVwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQtc20gdGV4dC1uZXV0cmFsLTYwMFwiPlxyXG4gICAgICAgICAgICAgIDxTcGlubmVyIHNpemU9XCJzaXplLTVcIiAvPlxyXG4gICAgICAgICAgICAgIDxzcGFuPntpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfTwvc3Bhbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApfVxyXG4gICAgICAgIHtzaG93T3duZXJGaWVsZCAmJiAoXG4gICAgICAgICAgPERldGFpbE93bmVyRmllbGQgbGFiZWw9e2luZFQoXCJWaXNpdHNfRGV0YWlsX093bmVyX0xhYmVsXCIsIFwiT3duZXJcIil9IHZhbHVlPXtkZXRhaWxPd25lclRleHR9IC8+XG4gICAgICAgICl9XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0zIGdhcC00IHB0LTFcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInZpc2l0YS1maWVsZC10ZXh0XCI+XHJcbiAgICAgICAgICAgIDxTaW5nbGVEYXRlUGlja2VyXHJcbiAgICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJWaXNpdHNfRGV0YWlsX0RhdGVfTGFiZWxcIiwgXCJEYXRlXCIpfVxyXG4gICAgICAgICAgICAgIHZhbHVlPXt0cmFuc0RhdGV9XHJcbiAgICAgICAgICAgICAgb25DaGFuZ2U9e3NldFRyYW5zRGF0ZX1cclxuICAgICAgICAgICAgICBkaXNhYmxlZD17IWlzRWRpdGluZ31cclxuICAgICAgICAgICAgICByZWFkT25seT17IWlzRWRpdGluZ31cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPFNlbGVjdENvbWJvYm94XHJcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiVmlzaXRzX0RldGFpbF9WaXNpdFR5cGVfTGFiZWxcIiwgXCJWaXNpdCB0eXBlXCIpfVxyXG4gICAgICAgICAgICBvcHRpb25zPXt2aXNpdFR5cGVzfVxyXG4gICAgICAgICAgICB2YWx1ZT17dmlzaXRUeXBlfVxyXG4gICAgICAgICAgICBvbkNoYW5nZT17c2V0VmlzaXRUeXBlfVxyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIlZpc2l0c19EZXRhaWxfVmlzaXRUeXBlX1BsYWNlaG9sZGVyXCIsIFwiU2VsZWN0IHR5cGVcIil9XHJcbiAgICAgICAgICAgIGRpc2FibGVkPXshaXNFZGl0aW5nfVxyXG4gICAgICAgICAgICByZWFkT25seT17IWlzRWRpdGluZ31cclxuICAgICAgICAgICAgdXNlUG9ydGFsPXtmYWxzZX1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8U2VsZWN0Q29tYm9ib3hcclxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJWaXNpdHNfRGV0YWlsX0NvbnRhY3RNZXRob2RfTGFiZWxcIiwgXCJDb250YWN0IG1ldGhvZFwiKX1cclxuICAgICAgICAgICAgb3B0aW9ucz17Y29udGFjdE1ldGhvZHN9XHJcbiAgICAgICAgICAgIHZhbHVlPXtjb250YWN0TWV0aG9kfVxyXG4gICAgICAgICAgICBvbkNoYW5nZT17c2V0Q29udGFjdE1ldGhvZH1cclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJWaXNpdHNfRGV0YWlsX0NvbnRhY3RNZXRob2RfUGxhY2Vob2xkZXJcIiwgXCJTZWxlY3QgbWV0aG9kXCIpfVxyXG4gICAgICAgICAgICBkaXNhYmxlZD17IWlzRWRpdGluZ31cclxuICAgICAgICAgICAgcmVhZE9ubHk9eyFpc0VkaXRpbmd9XHJcbiAgICAgICAgICAgIHVzZVBvcnRhbD17ZmFsc2V9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICA8VmlzaXROYXJyYXRpdmVGaWVsZHNcclxuICAgICAgICAgIGRlc2NyaXB0aW9uTGFiZWw9e2Rlc2NyaXB0aW9uTGFiZWx9XHJcbiAgICAgICAgICBkZXNjcmlwdGlvblZhbHVlPXtkZXNjcmlwdGlvbn1cclxuICAgICAgICAgIGRlc2NyaXB0aW9uQ2xhc3NOYW1lPXtkZXRhaWxEZXNjcmlwdGlvbkNsYXNzTmFtZX1cclxuICAgICAgICAgIGRlc2NyaXB0aW9uRGlzYWJsZWQ9eyFpc0VkaXRpbmd9XHJcbiAgICAgICAgICBvbkRlc2NyaXB0aW9uQ2hhbmdlPXtzZXREZXNjcmlwdGlvbn1cclxuICAgICAgICAgIHRhcEZpZWxkcz17W1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgaWQ6IFwiY29tZW50YXJpb3NcIixcclxuICAgICAgICAgICAgICBsYWJlbDogY29tbWVudHNMYWJlbCxcclxuICAgICAgICAgICAgICB2YWx1ZTogY29tZW50YXJpb3MsXHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lOiBkZXRhaWxSZWFkT25seUNsYXNzTmFtZSxcclxuICAgICAgICAgICAgICBwb2ludGVyQmluZGluZ3M6IGNvbWVudGFyaW9zVGFwLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgaWQ6IFwiYW50ZWNlZGVudGVzXCIsXHJcbiAgICAgICAgICAgICAgbGFiZWw6IGJhY2tncm91bmRMYWJlbCxcclxuICAgICAgICAgICAgICB2YWx1ZTogYW50ZWNlZGVudGVzLFxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZTogZGV0YWlsUmVhZE9ubHlDbGFzc05hbWUsXHJcbiAgICAgICAgICAgICAgcG9pbnRlckJpbmRpbmdzOiBhbnRlY2VkZW50ZXNUYXAsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBpZDogXCJjb25jbHVzaW9uZXNcIixcclxuICAgICAgICAgICAgICBsYWJlbDogY29uY2x1c2lvbnNMYWJlbCxcclxuICAgICAgICAgICAgICB2YWx1ZTogY29uY2x1c2lvbmVzLFxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZTogZGV0YWlsUmVhZE9ubHlDbGFzc05hbWUsXHJcbiAgICAgICAgICAgICAgcG9pbnRlckJpbmRpbmdzOiBjb25jbHVzaW9uZXNUYXAsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICBdfVxyXG4gICAgICAgIC8+XHJcblxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTMgdGV4dC1zbSB0ZXh0LW5ldXRyYWwtNjAwXCI+XHJcbiAgICAgICAgICA8c3Bhbj57c3RhdHVzfTwvc3Bhbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuLy8gRGV0YWlsIFVJIHdyYXBwZWQgYnkgdGhlIGVycm9yIGJvdW5kYXJ5LlxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRGV0YWlsRm9ybShwcm9wczogRGV0YWlsRm9ybVByb3BzKSB7XG4gIHJldHVybiAoXG4gICAgPEFwcEVycm9yQm91bmRhcnkgZmFsbGJhY2tNZXNzYWdlPXtpbmRUKFwiVmlzaXRzX0RldGFpbF9FcnJvckJvdW5kYXJ5XCIsIFwiQW4gZXJyb3Igb2NjdXJyZWQgd2hpbGUgcmVuZGVyaW5nIHRoZSBkZXRhaWwgcGFnZS4gUmVsb2FkIGFuZCB0cnkgYWdhaW4uXCIpfT5cbiAgICAgIDxEZXRhaWxBcHAgey4uLnByb3BzfSAvPlxuICAgIDwvQXBwRXJyb3JCb3VuZGFyeT5cbiAgKTtcbn1cbiIsICJleHBvcnQgY29uc3QgYmluZFJlYWRPbmx5R3VhcmQgPSAoZWw6IEhUTUxFbGVtZW50IHwgbnVsbCkgPT4ge1xyXG4gIGlmICghZWwpIHJldHVybiAoKSA9PiB7fTtcclxuICBjb25zdCBjYW5jZWwgPSAoZXZlbnQ6IEV2ZW50KSA9PiBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIGNvbnN0IGV2ZW50cyA9IFtcImNvbnRleHRtZW51XCIsIFwic2VsZWN0c3RhcnRcIiwgXCJjb3B5XCIsIFwiY3V0XCIsIFwicGFzdGVcIl07XHJcbiAgZXZlbnRzLmZvckVhY2goKGV2dCkgPT4gZWwuYWRkRXZlbnRMaXN0ZW5lcihldnQsIGNhbmNlbCkpO1xyXG4gIHJldHVybiAoKSA9PiB7XHJcbiAgICBldmVudHMuZm9yRWFjaCgoZXZ0KSA9PiBlbC5yZW1vdmVFdmVudExpc3RlbmVyKGV2dCwgY2FuY2VsKSk7XHJcbiAgfTtcclxufTtcclxuIiwgImV4cG9ydCBjb25zdCBoYXNWYWx1ZSA9ICh2YWx1ZTogdW5rbm93bikgPT4gU3RyaW5nKHZhbHVlIHx8IFwiXCIpLnRyaW0oKS5sZW5ndGggPiAwO1xyXG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBmZXRjaEpzb24gfSBmcm9tIFwiLi4vc2VydmljZXMvYXBpU2VydmljZS50c1wiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuXHJcbnR5cGUgT3B0aW9uTGlrZSA9IHtcclxuICB2YWx1ZT86IHN0cmluZyB8IG51bWJlcjtcclxuICBWYWx1ZT86IHN0cmluZyB8IG51bWJlcjtcclxuICB0ZXh0Pzogc3RyaW5nO1xyXG4gIFRleHQ/OiBzdHJpbmc7XHJcbn07XHJcblxyXG50eXBlIEFjdGl2aXR5RGV0YWlsUmVjb3JkID0gUmVjb3JkPHN0cmluZywgdW5rbm93bj47XHJcblxyXG50eXBlIEFjdGl2aXR5RGV0YWlsUmVzcG9uc2UgPSB7XHJcbiAgc3VjY2Vzcz86IGJvb2xlYW47XHJcbiAgbWVzc2FnZT86IHN0cmluZztcclxuICBkYXRhPzogQWN0aXZpdHlEZXRhaWxSZWNvcmQgfCBudWxsO1xyXG4gIFN1Y2Nlc3M/OiBib29sZWFuO1xyXG4gIE1lc3NhZ2U/OiBzdHJpbmc7XHJcbiAgRGF0YT86IEFjdGl2aXR5RGV0YWlsUmVjb3JkIHwgbnVsbDtcclxufTtcclxuXHJcbmNvbnN0IGlzUmVzcG9uc2VTdWNjZXNzID0gKHJlc3BvbnNlOiBBY3Rpdml0eURldGFpbFJlc3BvbnNlKTogYm9vbGVhbiA9PiB7XHJcbiAgcmV0dXJuIHJlc3BvbnNlLnN1Y2Nlc3MgPT09IHRydWUgfHwgcmVzcG9uc2UuU3VjY2VzcyA9PT0gdHJ1ZTtcclxufTtcclxuXHJcbmNvbnN0IGdldFJlc3BvbnNlTWVzc2FnZSA9IChyZXNwb25zZTogQWN0aXZpdHlEZXRhaWxSZXNwb25zZSk6IHN0cmluZyA9PiB7XHJcbiAgY29uc3QgcmF3ID0gcmVzcG9uc2UubWVzc2FnZSA/PyByZXNwb25zZS5NZXNzYWdlO1xyXG4gIHJldHVybiB0eXBlb2YgcmF3ID09PSBcInN0cmluZ1wiID8gcmF3LnRyaW0oKSA6IFwiXCI7XHJcbn07XHJcblxyXG5jb25zdCBnZXRSZXNwb25zZURhdGEgPSAocmVzcG9uc2U6IEFjdGl2aXR5RGV0YWlsUmVzcG9uc2UpOiBBY3Rpdml0eURldGFpbFJlY29yZCB8IG51bGwgPT4ge1xyXG4gIGNvbnN0IGRhdGEgPSByZXNwb25zZS5kYXRhID8/IHJlc3BvbnNlLkRhdGE7XHJcbiAgcmV0dXJuIGRhdGEgJiYgdHlwZW9mIGRhdGEgPT09IFwib2JqZWN0XCIgPyBkYXRhIDogbnVsbDtcclxufTtcclxuXHJcbmNvbnN0IGFzUmVjb3JkID0gKHZhbHVlOiB1bmtub3duKTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4gfCBudWxsID0+IHtcclxuICBpZiAoIXZhbHVlIHx8IHR5cGVvZiB2YWx1ZSAhPT0gXCJvYmplY3RcIiB8fCBBcnJheS5pc0FycmF5KHZhbHVlKSkgcmV0dXJuIG51bGw7XHJcbiAgcmV0dXJuIHZhbHVlIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+O1xyXG59O1xyXG5cclxudHlwZSBVc2VEZXRhaWxIeWRyYXRpb25BcmdzID0ge1xyXG4gIGFjdGl2aWRhZElkOiBzdHJpbmc7XHJcbiAgc2hvdWxkSHlkcmF0ZTogYm9vbGVhbjtcclxuICB2aXNpdFR5cGVzOiBPcHRpb25MaWtlW107XHJcbiAgY29udGFjdE1ldGhvZHM6IE9wdGlvbkxpa2VbXTtcclxuICBhc2lzdGVudGVUaXBvczogT3B0aW9uTGlrZVtdO1xyXG4gIGRlZmF1bHRWaXNpdFR5cGU6IHN0cmluZztcclxuICBpbml0aWFsQXNpc3RlbnRlOiBzdHJpbmc7XHJcbiAgbm9ybWFsaXplRGF0ZVRvSW5wdXQ6ICh2YWx1ZTogc3RyaW5nKSA9PiBzdHJpbmc7XHJcbiAgbWF0Y2hPcHRpb25WYWx1ZTogKG9wdGlvbnM6IE9wdGlvbkxpa2VbXSwgcmF3OiB1bmtub3duKSA9PiBzdHJpbmc7XHJcbiAgYXBwbHlEcmFmdFZhbHVlczogKCkgPT4gdm9pZDtcclxuICBhcHBseVRleHRFZGl0b3JWYWx1ZXM6ICgpID0+IHZvaWQ7XHJcbiAgc2V0U3RhdHVzOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBzZXRJc0h5ZHJhdGluZzogKHZhbHVlOiBib29sZWFuKSA9PiB2b2lkO1xyXG4gIHNldFRyYW5zRGF0ZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgc2V0VmlzaXRUeXBlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBzZXRDb250YWN0TWV0aG9kOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBzZXRBc2lzdGVudGVUaXBvOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBzZXREZXNjcmlwdGlvbjogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgc2V0Q29tZW50YXJpb3M6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIHNldEFudGVjZWRlbnRlczogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgc2V0Q29uY2x1c2lvbmVzOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxufTtcclxuXHJcbi8vIEtlZXBzIGRldGFpbCBoeWRyYXRpb24gb3JjaGVzdHJhdGlvbiBvdXRzaWRlIHRoZSBwYWdlIGNvbXBvbmVudC5cclxuZXhwb3J0IGNvbnN0IHVzZURldGFpbEh5ZHJhdGlvbiA9ICh7XHJcbiAgYWN0aXZpZGFkSWQsXHJcbiAgc2hvdWxkSHlkcmF0ZSxcclxuICB2aXNpdFR5cGVzLFxyXG4gIGNvbnRhY3RNZXRob2RzLFxyXG4gIGFzaXN0ZW50ZVRpcG9zLFxyXG4gIGRlZmF1bHRWaXNpdFR5cGUsXHJcbiAgaW5pdGlhbEFzaXN0ZW50ZSxcclxuICBub3JtYWxpemVEYXRlVG9JbnB1dCxcclxuICBtYXRjaE9wdGlvblZhbHVlLFxyXG4gIGFwcGx5RHJhZnRWYWx1ZXMsXHJcbiAgYXBwbHlUZXh0RWRpdG9yVmFsdWVzLFxyXG4gIHNldFN0YXR1cyxcclxuICBzZXRJc0h5ZHJhdGluZyxcclxuICBzZXRUcmFuc0RhdGUsXHJcbiAgc2V0VmlzaXRUeXBlLFxyXG4gIHNldENvbnRhY3RNZXRob2QsXHJcbiAgc2V0QXNpc3RlbnRlVGlwbyxcclxuICBzZXREZXNjcmlwdGlvbixcclxuICBzZXRDb21lbnRhcmlvcyxcclxuICBzZXRBbnRlY2VkZW50ZXMsXHJcbiAgc2V0Q29uY2x1c2lvbmVzLFxyXG59OiBVc2VEZXRhaWxIeWRyYXRpb25BcmdzKSA9PiB7XHJcbiAgY29uc3QgaHlkcmF0ZUZyb21BcGkgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XHJcbiAgICBpZiAoIWFjdGl2aWRhZElkKSByZXR1cm47XHJcbiAgICBzZXRJc0h5ZHJhdGluZyh0cnVlKTtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoSnNvbjxBY3Rpdml0eURldGFpbFJlc3BvbnNlPihgL1Zpc2l0YXMvR2V0QWN0aXZpdHlCeUNvZGU/Y29kZT0ke2VuY29kZVVSSUNvbXBvbmVudChhY3RpdmlkYWRJZCl9YCk7XHJcbiAgICAgIGNvbnN0IHJlc3BvbnNlRGF0YSA9IGdldFJlc3BvbnNlRGF0YShyZXMpO1xyXG5cclxuICAgICAgaWYgKCFpc1Jlc3BvbnNlU3VjY2VzcyhyZXMpIHx8ICFyZXNwb25zZURhdGEpIHtcclxuICAgICAgICBzZXRTdGF0dXMoZ2V0UmVzcG9uc2VNZXNzYWdlKHJlcykgfHwgaW5kVChcIlZpc2l0c19EZXRhaWxfTG9hZEFjdGl2aXR5RmFpbGVkXCIsIFwiRmFpbGVkIHRvIGxvYWQgYWN0aXZpdHkgZGV0YWlscy5cIikpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgcmF3RGF0ZSA9IFN0cmluZyhyZXNwb25zZURhdGEudHJhbnNEYXRlID8/IHJlc3BvbnNlRGF0YS5UcmFuc0RhdGUgPz8gXCJcIik7XHJcbiAgICAgIHNldFRyYW5zRGF0ZShub3JtYWxpemVEYXRlVG9JbnB1dChyYXdEYXRlKSk7XHJcblxyXG4gICAgICBjb25zdCByYXdWaXNpdFR5cGUgPSBTdHJpbmcoXHJcbiAgICAgICAgcmVzcG9uc2VEYXRhLnRpcG9WaXNpdGEgPz8gcmVzcG9uc2VEYXRhLlRpcG9WaXNpdGEgPz8gcmVzcG9uc2VEYXRhLnZpc2l0VHlwZSA/PyByZXNwb25zZURhdGEuVmlzaXRUeXBlID8/IFwiXCJcclxuICAgICAgKTtcclxuICAgICAgc2V0VmlzaXRUeXBlKG1hdGNoT3B0aW9uVmFsdWUodmlzaXRUeXBlcywgcmF3VmlzaXRUeXBlKSB8fCBkZWZhdWx0VmlzaXRUeXBlKTtcclxuXHJcbiAgICAgIGNvbnN0IHJhd0NvbnRhY3RNZXRob2QgPSBTdHJpbmcoXHJcbiAgICAgICAgcmVzcG9uc2VEYXRhLmNvbnRhY3RNZXRob2QgPz8gcmVzcG9uc2VEYXRhLkNvbnRhY3RNZXRob2QgPz8gXCJcIlxyXG4gICAgICApO1xyXG4gICAgICBzZXRDb250YWN0TWV0aG9kKG1hdGNoT3B0aW9uVmFsdWUoY29udGFjdE1ldGhvZHMsIHJhd0NvbnRhY3RNZXRob2QpKTtcclxuXHJcbiAgICAgIGNvbnN0IGFzaXN0ZW50ZXNMaXN0ID0gcmVzcG9uc2VEYXRhLmFzaXN0ZW50ZXMgPz8gcmVzcG9uc2VEYXRhLkFzaXN0ZW50ZXM7XHJcbiAgICAgIGNvbnN0IGZpcnN0QXNpc3RlbnRlID0gQXJyYXkuaXNBcnJheShhc2lzdGVudGVzTGlzdCkgJiYgYXNpc3RlbnRlc0xpc3QubGVuZ3RoID8gYXNSZWNvcmQoYXNpc3RlbnRlc0xpc3RbMF0pIDogbnVsbDtcclxuICAgICAgY29uc3QgcmF3QXNpc3RlbnRlVGlwbyA9IFN0cmluZyhcclxuICAgICAgICByZXNwb25zZURhdGEuYXNpc3RlbnRlVGlwbyA/P1xyXG4gICAgICAgICAgcmVzcG9uc2VEYXRhLkFzaXN0ZW50ZVRpcG8gPz9cclxuICAgICAgICAgIGZpcnN0QXNpc3RlbnRlPy5hc2lzdGVudGVUaXBvID8/XHJcbiAgICAgICAgICBmaXJzdEFzaXN0ZW50ZT8uQXNpc3RlbnRlVGlwbyA/P1xyXG4gICAgICAgICAgXCJcIlxyXG4gICAgICApO1xyXG4gICAgICBjb25zdCBub3JtYWxpemVkQXNpc3RlbnRlVGlwbyA9IG1hdGNoT3B0aW9uVmFsdWUoYXNpc3RlbnRlVGlwb3MsIHJhd0FzaXN0ZW50ZVRpcG8pO1xyXG4gICAgICBzZXRBc2lzdGVudGVUaXBvKG5vcm1hbGl6ZWRBc2lzdGVudGVUaXBvIHx8IGluaXRpYWxBc2lzdGVudGUpO1xyXG4gICAgICBzZXREZXNjcmlwdGlvbihTdHJpbmcocmVzcG9uc2VEYXRhLmRlc2NyaXB0aW9uID8/IHJlc3BvbnNlRGF0YS5EZXNjcmlwdGlvbiA/PyBcIlwiKSk7XHJcbiAgICAgIHNldENvbWVudGFyaW9zKFN0cmluZyhyZXNwb25zZURhdGEuY29tZW50YXJpb3MgPz8gcmVzcG9uc2VEYXRhLkNvbWVudGFyaW9zID8/IFwiXCIpKTtcclxuICAgICAgc2V0QW50ZWNlZGVudGVzKFN0cmluZyhyZXNwb25zZURhdGEuYW50ZWNlZGVudGVzID8/IHJlc3BvbnNlRGF0YS5BbnRlY2VkZW50ZXMgPz8gXCJcIikpO1xyXG4gICAgICBzZXRDb25jbHVzaW9uZXMoU3RyaW5nKHJlc3BvbnNlRGF0YS5jb25jbHVzaW9uZXMgPz8gcmVzcG9uc2VEYXRhLkNvbmNsdXNpb25lcyA/PyBcIlwiKSk7XHJcbiAgICB9IGNhdGNoIHtcclxuICAgICAgLy8gS2VlcCBwcmV2aW91cyBVSSBiZWhhdmlvciBvbiBoeWRyYXRpb24gZXJyb3JzLlxyXG4gICAgfSBmaW5hbGx5IHtcclxuICAgICAgc2V0SXNIeWRyYXRpbmcoZmFsc2UpO1xyXG4gICAgICBhcHBseURyYWZ0VmFsdWVzKCk7XHJcbiAgICAgIGFwcGx5VGV4dEVkaXRvclZhbHVlcygpO1xyXG4gICAgfVxyXG4gIH0sIFtcclxuICAgIGFjdGl2aWRhZElkLFxyXG4gICAgYXBwbHlEcmFmdFZhbHVlcyxcclxuICAgIGFwcGx5VGV4dEVkaXRvclZhbHVlcyxcclxuICAgIGFzaXN0ZW50ZVRpcG9zLFxyXG4gICAgY29udGFjdE1ldGhvZHMsXHJcbiAgICBkZWZhdWx0VmlzaXRUeXBlLFxyXG4gICAgaW5pdGlhbEFzaXN0ZW50ZSxcclxuICAgIG1hdGNoT3B0aW9uVmFsdWUsXHJcbiAgICBub3JtYWxpemVEYXRlVG9JbnB1dCxcclxuICAgIHNldEFudGVjZWRlbnRlcyxcclxuICAgIHNldEFzaXN0ZW50ZVRpcG8sXHJcbiAgICBzZXRDb21lbnRhcmlvcyxcclxuICAgIHNldENvbmNsdXNpb25lcyxcclxuICAgIHNldERlc2NyaXB0aW9uLFxyXG4gICAgc2V0SXNIeWRyYXRpbmcsXHJcbiAgICBzZXRTdGF0dXMsXHJcbiAgICBzZXRUcmFuc0RhdGUsXHJcbiAgICBzZXRWaXNpdFR5cGUsXHJcbiAgICBzZXRDb250YWN0TWV0aG9kLFxyXG4gICAgdmlzaXRUeXBlcyxcclxuICBdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmIChzaG91bGRIeWRyYXRlKSB7XHJcbiAgICAgIGh5ZHJhdGVGcm9tQXBpKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGFwcGx5RHJhZnRWYWx1ZXMoKTtcclxuICAgIGFwcGx5VGV4dEVkaXRvclZhbHVlcygpO1xyXG4gIH0sIFthcHBseURyYWZ0VmFsdWVzLCBhcHBseVRleHRFZGl0b3JWYWx1ZXMsIGh5ZHJhdGVGcm9tQXBpLCBzaG91bGRIeWRyYXRlXSk7XHJcbn07XHJcbiIsICJpbXBvcnQgeyB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgd2FpdCB9IGZyb20gXCIuLi91dGlscy93YWl0LnRzXCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgeyBzaG93UGVybWlzc2lvbk1vZGFsIH0gZnJvbSBcIi4uL3V0aWxzL3Blcm1pc3Npb25zLnRzXCI7XHJcbmltcG9ydCB7IHNldEhpc3RvcnlGaWx0ZXJGb3JEYXRlLCBmbGFzaEFjdGlvbk1hcmsgfSBmcm9tIFwiLi4vdXRpbHMvdmlzaXRhc0hpc3RvcnkudHNcIjtcclxuaW1wb3J0IHsgc2V0VG9wYmFyQWN0aW9uR3JvdXBSZWFkeSB9IGZyb20gXCIuLi91dGlscy90b3BiYXJBY3Rpb25WaXNpYmlsaXR5LnRzXCI7XHJcblxyXG50eXBlIFVzZURldGFpbFRvcGJhckFjdGlvbnNBcmdzID0ge1xyXG4gIGJ1c3k6IGJvb2xlYW47XHJcbiAgbW9kYWxPcGVuOiBib29sZWFuO1xyXG4gIGlzRWRpdGluZzogYm9vbGVhbjtcclxuICBjYW5FZGl0SGlzdG9yeTogYm9vbGVhbjtcclxuICBjYW5EZWxldGVIaXN0b3J5OiBib29sZWFuO1xyXG4gIHRyYW5zRGF0ZTogc3RyaW5nO1xyXG4gIHNldE1vZGFsRXJyb3I6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIGhhbmRsZUVuYWJsZUVkaXQ6ICgpID0+IHZvaWQ7XHJcbiAgaGFuZGxlQ2FuY2VsRWRpdDogKCkgPT4gdm9pZDtcclxuICBoYW5kbGVVcGRhdGU6ICgpID0+IFByb21pc2U8Ym9vbGVhbj47XHJcbiAgaGFuZGxlRGVsZXRlOiAoKSA9PiBQcm9taXNlPGJvb2xlYW4+O1xyXG4gIGFjdGlvbkdyb3VwSWQ/OiBzdHJpbmc7XHJcbiAgcGVybWlzc2lvbnNSZWFkeT86IGJvb2xlYW47XHJcbiAgb3BlbkNvbmZpcm06IChvcHRzOiB7XHJcbiAgICB0aXRsZTogc3RyaW5nO1xyXG4gICAgbWVzc2FnZTogc3RyaW5nO1xyXG4gICAgY29uZmlybVRleHQ/OiBzdHJpbmc7XHJcbiAgICBvbkNvbmZpcm0/OiAoKSA9PiBQcm9taXNlPGJvb2xlYW4gfCB2b2lkPiB8IGJvb2xlYW4gfCB2b2lkO1xyXG4gIH0pID0+IHZvaWQ7XHJcbiAgY2xvc2VDb25maXJtOiAoKSA9PiB2b2lkO1xyXG59O1xyXG5cclxuLy8gQ29vcmRpbmF0ZXMgdG9wYmFyIGljb24gdmlzaWJpbGl0eSBhbmQgYWN0aW9uIGV2ZW50cyBmb3IgZGV0YWlsIHBhZ2UuXHJcbmV4cG9ydCBjb25zdCB1c2VEZXRhaWxUb3BiYXJBY3Rpb25zID0gKHtcclxuICBidXN5LFxyXG4gIG1vZGFsT3BlbixcclxuICBpc0VkaXRpbmcsXHJcbiAgY2FuRWRpdEhpc3RvcnksXHJcbiAgY2FuRGVsZXRlSGlzdG9yeSxcclxuICB0cmFuc0RhdGUsXHJcbiAgc2V0TW9kYWxFcnJvcixcclxuICBoYW5kbGVFbmFibGVFZGl0LFxyXG4gIGhhbmRsZUNhbmNlbEVkaXQsXHJcbiAgaGFuZGxlVXBkYXRlLFxyXG4gIGhhbmRsZURlbGV0ZSxcclxuICBhY3Rpb25Hcm91cElkID0gXCJ2aXNpdC1kZXRhaWwtYWN0aW9uc1wiLFxyXG4gIHBlcm1pc3Npb25zUmVhZHkgPSB0cnVlLFxyXG4gIG9wZW5Db25maXJtLFxyXG4gIGNsb3NlQ29uZmlybSxcclxufTogVXNlRGV0YWlsVG9wYmFyQWN0aW9uc0FyZ3MpID0+IHtcclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFwZXJtaXNzaW9uc1JlYWR5KSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgZWRpdEljb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpc2l0RWRpdEljb25cIik7XHJcbiAgICBjb25zdCBzYXZlSWNvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlzaXRTYXZlSWNvblwiKTtcclxuICAgIGNvbnN0IGRlbGV0ZUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlzaXREZWxldGVCdG5cIik7XHJcbiAgICBjb25zdCBjYW5jZWxCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpc2l0Q2FuY2VsQnRuXCIpO1xyXG4gICAgY29uc3QgZWRpdEJ0biA9IGVkaXRJY29uPy5jbG9zZXN0KFwiYnV0dG9uXCIpID8/IG51bGw7XHJcbiAgICBpZiAoaXNFZGl0aW5nKSB7XHJcbiAgICAgIGlmIChlZGl0QnRuKSBlZGl0QnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJ0b3BiYXItaGlkZGVuXCIpO1xyXG4gICAgICBpZiAoZWRpdEljb24pIGVkaXRJY29uLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XHJcbiAgICAgIGlmIChzYXZlSWNvbikgc2F2ZUljb24uY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcclxuICAgICAgaWYgKGRlbGV0ZUJ0bikgZGVsZXRlQnRuLmNsYXNzTGlzdC5hZGQoXCJ0b3BiYXItaGlkZGVuXCIpO1xyXG4gICAgICBpZiAoY2FuY2VsQnRuKSBjYW5jZWxCdG4uY2xhc3NMaXN0LnJlbW92ZShcInRvcGJhci1oaWRkZW5cIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoZWRpdEJ0bikgZWRpdEJ0bi5jbGFzc0xpc3QucmVtb3ZlKFwidG9wYmFyLWhpZGRlblwiKTtcclxuICAgICAgaWYgKGVkaXRJY29uKSBlZGl0SWNvbi5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xyXG4gICAgICBpZiAoc2F2ZUljb24pIHNhdmVJY29uLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XHJcbiAgICAgIGlmIChkZWxldGVCdG4pIGRlbGV0ZUJ0bi5jbGFzc0xpc3QucmVtb3ZlKFwidG9wYmFyLWhpZGRlblwiKTtcclxuICAgICAgaWYgKGNhbmNlbEJ0bikgY2FuY2VsQnRuLmNsYXNzTGlzdC5hZGQoXCJ0b3BiYXItaGlkZGVuXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFRvcGJhckFjdGlvbkdyb3VwUmVhZHkoYWN0aW9uR3JvdXBJZCk7XHJcbiAgfSwgW2FjdGlvbkdyb3VwSWQsIGlzRWRpdGluZywgcGVybWlzc2lvbnNSZWFkeV0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFwZXJtaXNzaW9uc1JlYWR5KSByZXR1cm47XHJcblxyXG4gICAgY29uc3Qgb25FZGl0ID0gKCkgPT4ge1xyXG4gICAgICBpZiAoIWNhbkVkaXRIaXN0b3J5KSB7XHJcbiAgICAgICAgc2hvd1Blcm1pc3Npb25Nb2RhbCgpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBpZiAoaXNFZGl0aW5nKSB7XHJcbiAgICAgICAgaWYgKGJ1c3kgfHwgbW9kYWxPcGVuKSByZXR1cm47XHJcbiAgICAgICAgc2V0TW9kYWxFcnJvcihcIlwiKTtcclxuICAgICAgICBvcGVuQ29uZmlybSh7XHJcbiAgICAgICAgICB0aXRsZTogaW5kVChcIlZpc2l0c19EZXRhaWxfU2F2ZUNoYW5nZXNfVGl0bGVcIiwgXCJWaXNpdHNfRGV0YWlsX1NhdmVDaGFuZ2VzX1RpdGxlXCIpLFxyXG4gICAgICAgICAgbWVzc2FnZTogaW5kVChcIlZpc2l0c19EZXRhaWxfU2F2ZUNoYW5nZXNfQm9keVwiLCBcIlZpc2l0c19EZXRhaWxfU2F2ZUNoYW5nZXNfQm9keVwiKSxcclxuICAgICAgICAgIGNvbmZpcm1UZXh0OiBpbmRUKFwiQ29tbW9uX1NhdmVcIiwgXCJDb21tb25fU2F2ZVwiKSxcclxuICAgICAgICAgIG9uQ29uZmlybTogYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBvayA9IGF3YWl0IGhhbmRsZVVwZGF0ZSgpO1xyXG4gICAgICAgICAgICBpZiAob2spIHtcclxuICAgICAgICAgICAgICBjbG9zZUNvbmZpcm0oKTtcclxuICAgICAgICAgICAgICBzZXRIaXN0b3J5RmlsdGVyRm9yRGF0ZSh0cmFuc0RhdGUpO1xyXG4gICAgICAgICAgICAgIGF3YWl0IHdhaXQoMjAwKTtcclxuICAgICAgICAgICAgICBmbGFzaEFjdGlvbk1hcmsoXCJva1Byb2Nlc3NcIiwgMTIwMCk7XHJcbiAgICAgICAgICAgICAgYXdhaXQgd2FpdCgxMjAwKTtcclxuICAgICAgICAgICAgICB3aW5kb3cuX19pbmRCeXBhc3NOYXZpZ2F0aW9uR3VhcmRPbmNlPy4oKTtcclxuICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL0hpc3RvcmlhbC9IaXN0b3J5XCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG9rO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBoYW5kbGVFbmFibGVFZGl0KCk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgY29uc3Qgb25EZWxldGUgPSAoKSA9PiB7XHJcbiAgICAgIGlmICghY2FuRGVsZXRlSGlzdG9yeSkge1xyXG4gICAgICAgIHNob3dQZXJtaXNzaW9uTW9kYWwoKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGJ1c3kgfHwgbW9kYWxPcGVuKSByZXR1cm47XHJcbiAgICAgIHNldE1vZGFsRXJyb3IoXCJcIik7XHJcbiAgICAgIG9wZW5Db25maXJtKHtcclxuICAgICAgICB0aXRsZTogaW5kVChcIlZpc2l0c19EZXRhaWxfRGVsZXRlQWN0aXZpdHlfVGl0bGVcIiwgXCJWaXNpdHNfRGV0YWlsX0RlbGV0ZUFjdGl2aXR5X1RpdGxlXCIpLFxyXG4gICAgICAgIG1lc3NhZ2U6IGluZFQoXCJWaXNpdHNfRGV0YWlsX0RlbGV0ZUFjdGl2aXR5X0JvZHlcIiwgXCJWaXNpdHNfRGV0YWlsX0RlbGV0ZUFjdGl2aXR5X0JvZHlcIiksXHJcbiAgICAgICAgY29uZmlybVRleHQ6IGluZFQoXCJDb21tb25fRGVsZXRlXCIsIFwiQ29tbW9uX0RlbGV0ZVwiKSxcclxuICAgICAgICBvbkNvbmZpcm06IGFzeW5jICgpID0+IHtcclxuICAgICAgICAgIGNvbnN0IG9rID0gYXdhaXQgaGFuZGxlRGVsZXRlKCk7XHJcbiAgICAgICAgICBpZiAob2spIHtcclxuICAgICAgICAgICAgY2xvc2VDb25maXJtKCk7XHJcbiAgICAgICAgICAgIHNldEhpc3RvcnlGaWx0ZXJGb3JEYXRlKHRyYW5zRGF0ZSk7XHJcbiAgICAgICAgICAgIGF3YWl0IHdhaXQoMjAwKTtcclxuICAgICAgICAgICAgZmxhc2hBY3Rpb25NYXJrKFwib2tEZWxQcm9jZXNzXCIsIDEyMDApO1xyXG4gICAgICAgICAgICBhd2FpdCB3YWl0KDEyMDApO1xyXG4gICAgICAgICAgICB3aW5kb3cuX19pbmRCeXBhc3NOYXZpZ2F0aW9uR3VhcmRPbmNlPy4oKTtcclxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9IaXN0b3JpYWwvSGlzdG9yeVwiO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIG9rO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBvbkNhbmNlbEVkaXQgPSAoKSA9PiB7XHJcbiAgICAgIGlmIChidXN5IHx8IG1vZGFsT3BlbikgcmV0dXJuO1xyXG4gICAgICBoYW5kbGVDYW5jZWxFZGl0KCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwidmlzaXQtZWRpdFwiLCBvbkVkaXQpO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJ2aXNpdC1kZWxldGVcIiwgb25EZWxldGUpO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJ2aXNpdC1jYW5jZWwtZWRpdFwiLCBvbkNhbmNlbEVkaXQpO1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ2aXNpdC1lZGl0XCIsIG9uRWRpdCk7XHJcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwidmlzaXQtZGVsZXRlXCIsIG9uRGVsZXRlKTtcclxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ2aXNpdC1jYW5jZWwtZWRpdFwiLCBvbkNhbmNlbEVkaXQpO1xyXG4gICAgfTtcclxuICB9LCBbXHJcbiAgICBidXN5LFxyXG4gICAgY2FuRGVsZXRlSGlzdG9yeSxcclxuICAgIGNhbkVkaXRIaXN0b3J5LFxyXG4gICAgY2xvc2VDb25maXJtLFxyXG4gICAgaGFuZGxlQ2FuY2VsRWRpdCxcclxuICAgIGhhbmRsZURlbGV0ZSxcclxuICAgIGhhbmRsZUVuYWJsZUVkaXQsXHJcbiAgICBoYW5kbGVVcGRhdGUsXHJcbiAgICBpc0VkaXRpbmcsXHJcbiAgICBtb2RhbE9wZW4sXHJcbiAgICBvcGVuQ29uZmlybSxcclxuICAgIHBlcm1pc3Npb25zUmVhZHksXHJcbiAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgdHJhbnNEYXRlLFxyXG4gIF0pO1xyXG59O1xyXG4iLCAiXHVGRUZGaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZVJlZiB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBnZXRTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5LCByZW1vdmVTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5LCBzZXRTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5IH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3Nlc3Npb25FeHBpcnkudHNcIjtcclxuXHJcbmNvbnN0IEVESVRfTU9ERV9UVExfTVMgPSA2ICogNjAgKiA2MCAqIDEwMDA7XHJcbmNvbnN0IERFVEFJTF9EUkFGVF9UVExfTVMgPSAyNCAqIDYwICogNjAgKiAxMDAwO1xyXG5cclxudHlwZSBVc2VEZXRhaWxFZGl0U2Vzc2lvbkFyZ3MgPSB7XHJcbiAgYWN0aXZpZGFkSWQ6IHN0cmluZztcclxuICByZWNJZDogc3RyaW5nO1xyXG4gIGNhbkVkaXRIaXN0b3J5OiBib29sZWFuO1xyXG4gIGlzRWRpdGluZzogYm9vbGVhbjtcclxuICBzZXRJc0VkaXRpbmc6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPGJvb2xlYW4+PjtcbiAgdHJhbnNEYXRlOiBzdHJpbmc7XG4gIHZpc2l0VHlwZTogc3RyaW5nO1xuICBjb250YWN0TWV0aG9kOiBzdHJpbmc7XG4gIGFzaXN0ZW50ZVRpcG86IHN0cmluZztcbiAgZGVzY3JpcHRpb246IHN0cmluZztcclxuICBjb21lbnRhcmlvczogc3RyaW5nO1xyXG4gIGFudGVjZWRlbnRlczogc3RyaW5nO1xyXG4gIGNvbmNsdXNpb25lczogc3RyaW5nO1xyXG4gIHNldFRyYW5zRGF0ZTogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XG4gIHNldFZpc2l0VHlwZTogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XG4gIHNldENvbnRhY3RNZXRob2Q6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPHN0cmluZz4+O1xuICBzZXRBc2lzdGVudGVUaXBvOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcbiAgc2V0RGVzY3JpcHRpb246IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPHN0cmluZz4+O1xyXG4gIHNldENvbWVudGFyaW9zOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcclxuICBzZXRBbnRlY2VkZW50ZXM6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPHN0cmluZz4+O1xyXG4gIHNldENvbmNsdXNpb25lczogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XHJcbn07XHJcblxyXG50eXBlIERldGFpbERyYWZ0VmFsdWVzID0ge1xyXG4gIHRyYW5zRGF0ZTogc3RyaW5nO1xuICB2aXNpdFR5cGU6IHN0cmluZztcbiAgY29udGFjdE1ldGhvZDogc3RyaW5nO1xuICBhc2lzdGVudGVUaXBvOiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgY29tZW50YXJpb3M6IHN0cmluZztcclxuICBhbnRlY2VkZW50ZXM6IHN0cmluZztcclxuICBjb25jbHVzaW9uZXM6IHN0cmluZztcclxufTtcclxuXHJcbi8vIE1hbmFnZXMgZWRpdC1tb2RlIHNlc3Npb24gZmxhZ3MgYW5kIGRldGFpbCBkcmFmdCBwZXJzaXN0ZW5jZS5cclxuZXhwb3J0IGNvbnN0IHVzZURldGFpbEVkaXRTZXNzaW9uID0gKHtcclxuICBhY3RpdmlkYWRJZCxcclxuICByZWNJZCxcclxuICBjYW5FZGl0SGlzdG9yeSxcclxuICBpc0VkaXRpbmcsXHJcbiAgc2V0SXNFZGl0aW5nLFxyXG4gIHRyYW5zRGF0ZSxcbiAgdmlzaXRUeXBlLFxuICBjb250YWN0TWV0aG9kLFxuICBhc2lzdGVudGVUaXBvLFxuICBkZXNjcmlwdGlvbixcclxuICBjb21lbnRhcmlvcyxcclxuICBhbnRlY2VkZW50ZXMsXHJcbiAgY29uY2x1c2lvbmVzLFxyXG4gIHNldFRyYW5zRGF0ZSxcbiAgc2V0VmlzaXRUeXBlLFxuICBzZXRDb250YWN0TWV0aG9kLFxuICBzZXRBc2lzdGVudGVUaXBvLFxuICBzZXREZXNjcmlwdGlvbixcclxuICBzZXRDb21lbnRhcmlvcyxcclxuICBzZXRBbnRlY2VkZW50ZXMsXHJcbiAgc2V0Q29uY2x1c2lvbmVzLFxyXG59OiBVc2VEZXRhaWxFZGl0U2Vzc2lvbkFyZ3MpID0+IHtcclxuICBjb25zdCBlZGl0TW9kZUtleVJlZiA9IHVzZVJlZihcIlwiKTtcclxuICBjb25zdCBkcmFmdEtleVJlZiA9IHVzZVJlZihcIlwiKTtcclxuICBjb25zdCBkcmFmdFBlcnNpc3RUaW1lclJlZiA9IHVzZVJlZjxudW1iZXIgfCBudWxsPihudWxsKTtcclxuXHJcbiAgLy8gUGVyc2lzdCBlZGl0IG1vZGUgd2hpbGUgdXNlciBuYXZpZ2F0ZXMgdG8gdGhlIHRleHQgZWRpdG9yIGFuZCBiYWNrLlxyXG4gIGNvbnN0IHN5bmNFZGl0TW9kZUZsYWcgPSB1c2VDYWxsYmFjaygoZW5hYmxlZDogYm9vbGVhbikgPT4ge1xyXG4gICAgY29uc3Qga2V5ID0gZWRpdE1vZGVLZXlSZWYuY3VycmVudDtcclxuICAgIGlmICgha2V5KSByZXR1cm47XHJcbiAgICBpZiAoZW5hYmxlZCkge1xyXG4gICAgICBzZXRTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KGtleSwgXCJ0cnVlXCIsIEVESVRfTU9ERV9UVExfTVMpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICByZW1vdmVTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KGtleSk7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBzeW5jRWRpdE1vZGVPbkVudHJ5ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgY29uc3QgYmFzZUlkID0gYWN0aXZpZGFkSWQgfHwgcmVjSWQgfHwgXCJkZWZhdWx0XCI7XHJcbiAgICBjb25zdCBrZXkgPSBgaW5kX3Zpc2l0X2VkaXRfJHtiYXNlSWR9YDtcclxuICAgIGNvbnN0IHJldHVybktleSA9IGAke2tleX1fcmV0dXJuYDtcclxuICAgIGNvbnN0IGRyYWZ0S2V5ID0gYGluZF92aXNpdF9kcmFmdF8ke2Jhc2VJZH1gO1xyXG4gICAgZWRpdE1vZGVLZXlSZWYuY3VycmVudCA9IGtleTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBhbGxvd1Jlc3RvcmUgPSBnZXRTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KHJldHVybktleSkgPT09IFwiMVwiO1xyXG4gICAgICBpZiAoYWxsb3dSZXN0b3JlKSB7XHJcbiAgICAgICAgcmVtb3ZlU2Vzc2lvblZhbHVlV2l0aEV4cGlyeShyZXR1cm5LZXkpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoY2FuRWRpdEhpc3RvcnkgJiYgYWxsb3dSZXN0b3JlICYmIGdldFNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoa2V5KSA9PT0gXCJ0cnVlXCIpIHtcclxuICAgICAgICBzZXRJc0VkaXRpbmcodHJ1ZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc2V0SXNFZGl0aW5nKGZhbHNlKTtcclxuICAgICAgICByZW1vdmVTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KGtleSk7XHJcbiAgICAgICAgcmVtb3ZlU2Vzc2lvblZhbHVlV2l0aEV4cGlyeShkcmFmdEtleSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICghY2FuRWRpdEhpc3RvcnkpIHtcclxuICAgICAgICByZW1vdmVTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KGtleSk7XHJcbiAgICAgICAgcmVtb3ZlU2Vzc2lvblZhbHVlV2l0aEV4cGlyeShkcmFmdEtleSk7XHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2gge1xyXG4gICAgICAvKiBpZ25vcmUgKi9cclxuICAgIH1cclxuICB9LCBbYWN0aXZpZGFkSWQsIGNhbkVkaXRIaXN0b3J5LCByZWNJZCwgc2V0SXNFZGl0aW5nXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBzeW5jRWRpdE1vZGVPbkVudHJ5KCk7XHJcbiAgfSwgW3N5bmNFZGl0TW9kZU9uRW50cnldKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IG9uUGFnZVNob3cgPSAoZXZlbnQ6IFBhZ2VUcmFuc2l0aW9uRXZlbnQpID0+IHtcclxuICAgICAgY29uc3QgbmF2RW50cnkgPSB0eXBlb2YgcGVyZm9ybWFuY2UgIT09IFwidW5kZWZpbmVkXCIgJiYgcGVyZm9ybWFuY2UuZ2V0RW50cmllc0J5VHlwZVxyXG4gICAgICAgID8gKHBlcmZvcm1hbmNlLmdldEVudHJpZXNCeVR5cGUoXCJuYXZpZ2F0aW9uXCIpWzBdIGFzIFBlcmZvcm1hbmNlTmF2aWdhdGlvblRpbWluZyB8IHVuZGVmaW5lZClcclxuICAgICAgICA6IHVuZGVmaW5lZDtcclxuICAgICAgY29uc3QgaXNCYWNrRm9yd2FyZCA9IG5hdkVudHJ5Py50eXBlID09PSBcImJhY2tfZm9yd2FyZFwiO1xyXG4gICAgICBpZiAoZXZlbnQ/LnBlcnNpc3RlZCB8fCBpc0JhY2tGb3J3YXJkKSB7XHJcbiAgICAgICAgc3luY0VkaXRNb2RlT25FbnRyeSgpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicGFnZXNob3dcIiwgb25QYWdlU2hvdyk7XHJcbiAgICByZXR1cm4gKCkgPT4gd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwYWdlc2hvd1wiLCBvblBhZ2VTaG93KTtcclxuICB9LCBbc3luY0VkaXRNb2RlT25FbnRyeV0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3Qga2V5ID0gYGluZF92aXNpdF9kcmFmdF8ke2FjdGl2aWRhZElkIHx8IHJlY0lkIHx8IFwiZGVmYXVsdFwifWA7XHJcbiAgICBkcmFmdEtleVJlZi5jdXJyZW50ID0ga2V5O1xyXG4gIH0sIFthY3RpdmlkYWRJZCwgcmVjSWRdKTtcclxuXHJcbiAgY29uc3Qgc2F2ZURyYWZ0ID0gdXNlQ2FsbGJhY2soKGRyYWZ0OiBEZXRhaWxEcmFmdFZhbHVlcykgPT4ge1xyXG4gICAgY29uc3Qga2V5ID0gZHJhZnRLZXlSZWYuY3VycmVudDtcclxuICAgIGlmICgha2V5KSByZXR1cm47XHJcbiAgICBzZXRTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KGtleSwgSlNPTi5zdHJpbmdpZnkoZHJhZnQpLCBERVRBSUxfRFJBRlRfVFRMX01TKTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IGNsZWFyRHJhZnQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBjb25zdCBrZXkgPSBkcmFmdEtleVJlZi5jdXJyZW50O1xyXG4gICAgaWYgKCFrZXkpIHJldHVybjtcclxuICAgIHJlbW92ZVNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoa2V5KTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IGFwcGx5RHJhZnRWYWx1ZXMgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBjb25zdCBrZXkgPSBkcmFmdEtleVJlZi5jdXJyZW50O1xyXG4gICAgaWYgKCFrZXkpIHJldHVybjtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCByYXcgPSBnZXRTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KGtleSk7XHJcbiAgICAgIGlmICghcmF3KSByZXR1cm47XHJcbiAgICAgIGNvbnN0IGRyYWZ0ID0gSlNPTi5wYXJzZShyYXcpIGFzIFBhcnRpYWw8RGV0YWlsRHJhZnRWYWx1ZXM+O1xyXG4gICAgICBpZiAoIWRyYWZ0IHx8IHR5cGVvZiBkcmFmdCAhPT0gXCJvYmplY3RcIikgcmV0dXJuO1xyXG5cclxuICAgICAgaWYgKGRyYWZ0LnRyYW5zRGF0ZSAhPT0gdW5kZWZpbmVkKSBzZXRUcmFuc0RhdGUoU3RyaW5nKGRyYWZ0LnRyYW5zRGF0ZSkpO1xuICAgICAgaWYgKGRyYWZ0LnZpc2l0VHlwZSAhPT0gdW5kZWZpbmVkKSBzZXRWaXNpdFR5cGUoU3RyaW5nKGRyYWZ0LnZpc2l0VHlwZSkpO1xuICAgICAgaWYgKGRyYWZ0LmNvbnRhY3RNZXRob2QgIT09IHVuZGVmaW5lZCkgc2V0Q29udGFjdE1ldGhvZChTdHJpbmcoZHJhZnQuY29udGFjdE1ldGhvZCkpO1xuICAgICAgaWYgKGRyYWZ0LmFzaXN0ZW50ZVRpcG8gIT09IHVuZGVmaW5lZCkgc2V0QXNpc3RlbnRlVGlwbyhTdHJpbmcoZHJhZnQuYXNpc3RlbnRlVGlwbykpO1xuICAgICAgaWYgKGRyYWZ0LmRlc2NyaXB0aW9uICE9PSB1bmRlZmluZWQpIHNldERlc2NyaXB0aW9uKFN0cmluZyhkcmFmdC5kZXNjcmlwdGlvbikpO1xyXG4gICAgICBpZiAoZHJhZnQuY29tZW50YXJpb3MgIT09IHVuZGVmaW5lZCkgc2V0Q29tZW50YXJpb3MoU3RyaW5nKGRyYWZ0LmNvbWVudGFyaW9zKSk7XHJcbiAgICAgIGlmIChkcmFmdC5hbnRlY2VkZW50ZXMgIT09IHVuZGVmaW5lZCkgc2V0QW50ZWNlZGVudGVzKFN0cmluZyhkcmFmdC5hbnRlY2VkZW50ZXMpKTtcclxuICAgICAgaWYgKGRyYWZ0LmNvbmNsdXNpb25lcyAhPT0gdW5kZWZpbmVkKSBzZXRDb25jbHVzaW9uZXMoU3RyaW5nKGRyYWZ0LmNvbmNsdXNpb25lcykpO1xyXG4gICAgfSBjYXRjaCB7XHJcbiAgICAgIC8qIGlnbm9yZSAqL1xyXG4gICAgfVxyXG4gIH0sIFtzZXRBbnRlY2VkZW50ZXMsIHNldEFzaXN0ZW50ZVRpcG8sIHNldENvbWVudGFyaW9zLCBzZXRDb25jbHVzaW9uZXMsIHNldENvbnRhY3RNZXRob2QsIHNldERlc2NyaXB0aW9uLCBzZXRUcmFuc0RhdGUsIHNldFZpc2l0VHlwZV0pO1xuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghaXNFZGl0aW5nKSB7XHJcbiAgICAgIGlmIChkcmFmdFBlcnNpc3RUaW1lclJlZi5jdXJyZW50KSB7XHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KGRyYWZ0UGVyc2lzdFRpbWVyUmVmLmN1cnJlbnQpO1xyXG4gICAgICAgIGRyYWZ0UGVyc2lzdFRpbWVyUmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZHJhZnRQZXJzaXN0VGltZXJSZWYuY3VycmVudCkge1xyXG4gICAgICBjbGVhclRpbWVvdXQoZHJhZnRQZXJzaXN0VGltZXJSZWYuY3VycmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhZnRQZXJzaXN0VGltZXJSZWYuY3VycmVudCA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgZHJhZnRQZXJzaXN0VGltZXJSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgIHNhdmVEcmFmdCh7XHJcbiAgICAgICAgdHJhbnNEYXRlLFxuICAgICAgICB2aXNpdFR5cGUsXG4gICAgICAgIGNvbnRhY3RNZXRob2QsXG4gICAgICAgIGFzaXN0ZW50ZVRpcG8sXG4gICAgICAgIGRlc2NyaXB0aW9uLFxyXG4gICAgICAgIGNvbWVudGFyaW9zLFxyXG4gICAgICAgIGFudGVjZWRlbnRlcyxcclxuICAgICAgICBjb25jbHVzaW9uZXMsXHJcbiAgICAgIH0pO1xyXG4gICAgfSwgMTgwKTtcclxuXHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBpZiAoZHJhZnRQZXJzaXN0VGltZXJSZWYuY3VycmVudCkge1xyXG4gICAgICAgIGNsZWFyVGltZW91dChkcmFmdFBlcnNpc3RUaW1lclJlZi5jdXJyZW50KTtcclxuICAgICAgICBkcmFmdFBlcnNpc3RUaW1lclJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9LCBbYW50ZWNlZGVudGVzLCBhc2lzdGVudGVUaXBvLCBjb21lbnRhcmlvcywgY29uY2x1c2lvbmVzLCBjb250YWN0TWV0aG9kLCBkZXNjcmlwdGlvbiwgaXNFZGl0aW5nLCBzYXZlRHJhZnQsIHRyYW5zRGF0ZSwgdmlzaXRUeXBlXSk7XG5cclxuICByZXR1cm4ge1xyXG4gICAgZWRpdE1vZGVLZXlSZWYsXHJcbiAgICBzeW5jRWRpdE1vZGVGbGFnLFxyXG4gICAgY2xlYXJEcmFmdCxcclxuICAgIGFwcGx5RHJhZnRWYWx1ZXMsXHJcbiAgfTtcclxufTtcclxuIiwgIlx1RkVGRmltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjayB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBmZXRjaEpzb24gfSBmcm9tIFwiLi4vLi4vLi4vc2VydmljZXMvYXBpU2VydmljZS50c1wiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHsgc2hvd1Blcm1pc3Npb25Nb2RhbCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9wZXJtaXNzaW9ucy50c1wiO1xyXG5pbXBvcnQgeyBmbGFzaEFjdGlvbk1hcmsgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvdmlzaXRhc0hpc3RvcnkudHNcIjtcclxuXHJcbnR5cGUgT3B0aW9uTGlrZSA9IHtcclxuICB2YWx1ZT86IHN0cmluZyB8IG51bWJlcjtcclxuICBWYWx1ZT86IHN0cmluZyB8IG51bWJlcjtcclxuICB0ZXh0Pzogc3RyaW5nO1xyXG4gIFRleHQ/OiBzdHJpbmc7XHJcbn07XHJcblxyXG50eXBlIFZpc2l0Q29tbWFuZFJlc3BvbnNlID0ge1xyXG4gIHN1Y2Nlc3M/OiBib29sZWFuO1xyXG4gIG1lc3NhZ2U/OiBzdHJpbmc7XHJcbiAgU3VjY2Vzcz86IGJvb2xlYW47XHJcbiAgTWVzc2FnZT86IHN0cmluZztcclxufTtcclxuXHJcbmNvbnN0IGlzQ29tbWFuZFN1Y2Nlc3MgPSAocmVzcG9uc2U6IFZpc2l0Q29tbWFuZFJlc3BvbnNlKTogYm9vbGVhbiA9PiB7XHJcbiAgcmV0dXJuIHJlc3BvbnNlLnN1Y2Nlc3MgPT09IHRydWUgfHwgcmVzcG9uc2UuU3VjY2VzcyA9PT0gdHJ1ZTtcclxufTtcclxuXHJcbmNvbnN0IGdldENvbW1hbmRNZXNzYWdlID0gKHJlc3BvbnNlOiBWaXNpdENvbW1hbmRSZXNwb25zZSk6IHN0cmluZyA9PiB7XHJcbiAgY29uc3QgcmF3ID0gcmVzcG9uc2UubWVzc2FnZSA/PyByZXNwb25zZS5NZXNzYWdlO1xyXG4gIHJldHVybiB0eXBlb2YgcmF3ID09PSBcInN0cmluZ1wiID8gcmF3LnRyaW0oKSA6IFwiXCI7XHJcbn07XHJcblxyXG4vLyBLZWVwIHJlY0lkIGFzIGEgbm9ybWFsaXplZCBzaWduZWQgaW50ZWdlciBzdHJpbmcgdG8gYXZvaWQgbG9uZyBwcmVjaXNpb24gbG9zcyBpbiBKUyBudW1iZXJzLlxyXG5jb25zdCByZXNvbHZlU2FmZVJlY0lkID0gKHJhd1JlY0lkOiBzdHJpbmcpOiBzdHJpbmcgfCBudWxsID0+IHtcclxuICBjb25zdCBub3JtYWxpemVkID0gU3RyaW5nKHJhd1JlY0lkID8/IFwiXCIpLnRyaW0oKTtcclxuICBpZiAoIW5vcm1hbGl6ZWQpIHJldHVybiBudWxsO1xyXG5cclxuICBpZiAoIS9eLT9cXGQrJC8udGVzdChub3JtYWxpemVkKSkgcmV0dXJuIG51bGw7XHJcblxyXG4gIGNvbnN0IGFic29sdXRlRGlnaXRzID0gbm9ybWFsaXplZC5zdGFydHNXaXRoKFwiLVwiKSA/IG5vcm1hbGl6ZWQuc2xpY2UoMSkgOiBub3JtYWxpemVkO1xyXG4gIGlmICghYWJzb2x1dGVEaWdpdHMgfHwgL14wKyQvLnRlc3QoYWJzb2x1dGVEaWdpdHMpKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgcmV0dXJuIG5vcm1hbGl6ZWQ7XHJcbn07XHJcblxyXG5jb25zdCBzaG91bGRMb2dSZWNJZEluRGV2ID0gKCk6IGJvb2xlYW4gPT4ge1xyXG4gIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiIHx8ICF3aW5kb3cubG9jYXRpb24pIHJldHVybiBmYWxzZTtcclxuICBjb25zdCBob3N0ID0gU3RyaW5nKHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZSB8fCBcIlwiKS50cmltKCkudG9Mb3dlckNhc2UoKTtcclxuICByZXR1cm4gaG9zdCA9PT0gXCJsb2NhbGhvc3RcIiB8fCBob3N0ID09PSBcIjEyNy4wLjAuMVwiIHx8IGhvc3QuZW5kc1dpdGgoXCIubG9jYWxcIik7XHJcbn07XHJcblxyXG5jb25zdCBsb2dTYWZlUmVjSWRJbkRldiA9IChvcGVyYXRpb246IFwidXBkYXRlXCIgfCBcImRlbGV0ZVwiLCBzYWZlUmVjSWQ6IHN0cmluZyk6IHZvaWQgPT4ge1xyXG4gIGlmICghc2hvdWxkTG9nUmVjSWRJbkRldigpKSByZXR1cm47XHJcbiAgY29uc29sZS5pbmZvKGBbdmlzaXRhcy1kZXRhaWxdICR7b3BlcmF0aW9ufSByZWNJZGAsIHNhZmVSZWNJZCk7XHJcbn07XHJcblxyXG50eXBlIFVzZURldGFpbE11dGF0aW9uc0FyZ3MgPSB7XHJcbiAgYnVzeTogYm9vbGVhbjtcclxuICBpc0VkaXRpbmc6IGJvb2xlYW47XHJcbiAgY2FuRWRpdEhpc3Rvcnk6IGJvb2xlYW47XHJcbiAgY2FuRGVsZXRlSGlzdG9yeTogYm9vbGVhbjtcclxuICByZWNJZDogc3RyaW5nO1xyXG4gIGFjY291bnROdW06IHN0cmluZztcclxuICB0cmFuc0RhdGU6IHN0cmluZztcclxuICB2aXNpdFR5cGU6IHN0cmluZztcclxuICBjb250YWN0TWV0aG9kOiBzdHJpbmc7XHJcbiAgYXNpc3RlbnRlVGlwbzogc3RyaW5nO1xyXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgY29tZW50YXJpb3M6IHN0cmluZztcclxuICBhbnRlY2VkZW50ZXM6IHN0cmluZztcclxuICBjb25jbHVzaW9uZXM6IHN0cmluZztcclxuICB2aXNpdFR5cGVzOiBPcHRpb25MaWtlW107XHJcbiAgY29udGFjdE1ldGhvZHM6IE9wdGlvbkxpa2VbXTtcclxuICBhc2lzdGVudGVUaXBvczogT3B0aW9uTGlrZVtdO1xyXG4gIGRlZmF1bHRWaXNpdFR5cGU6IHN0cmluZztcclxuICByYXdJbml0aWFsVmlzaXRUeXBlOiBzdHJpbmc7XHJcbiAgcmF3SW5pdGlhbENvbnRhY3RNZXRob2Q6IHN0cmluZztcclxuICByYXdJbml0aWFsQXNpc3RlbnRlOiBzdHJpbmc7XHJcbiAgbWF0Y2hPcHRpb25WYWx1ZTogKG9wdGlvbnM6IE9wdGlvbkxpa2VbXSwgcmF3OiB1bmtub3duKSA9PiBzdHJpbmc7XHJcbiAgY2xlYXJEcmFmdDogKCkgPT4gdm9pZDtcclxuICBzeW5jRWRpdE1vZGVGbGFnOiAoZW5hYmxlZDogYm9vbGVhbikgPT4gdm9pZDtcclxuICBzZXRNb2RhbEVycm9yOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcclxuICBzZXRCdXN5OiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxib29sZWFuPj47XHJcbiAgc2V0U3RhdHVzOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcclxuICBzZXRJc0VkaXRpbmc6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPGJvb2xlYW4+PjtcclxufTtcclxuXHJcbi8vIEVuY2Fwc3VsYXRlcyB1cGRhdGUgYW5kIGRlbGV0ZSBtdXRhdGlvbnMgZm9yIGRldGFpbCBmb3JtIHN0YXRlLlxyXG5leHBvcnQgY29uc3QgdXNlRGV0YWlsTXV0YXRpb25zID0gKHtcclxuICBidXN5LFxyXG4gIGlzRWRpdGluZyxcclxuICBjYW5FZGl0SGlzdG9yeSxcclxuICBjYW5EZWxldGVIaXN0b3J5LFxyXG4gIHJlY0lkLFxyXG4gIGFjY291bnROdW0sXHJcbiAgdHJhbnNEYXRlLFxyXG4gIHZpc2l0VHlwZSxcclxuICBjb250YWN0TWV0aG9kLFxyXG4gIGFzaXN0ZW50ZVRpcG8sXHJcbiAgZGVzY3JpcHRpb24sXHJcbiAgY29tZW50YXJpb3MsXHJcbiAgYW50ZWNlZGVudGVzLFxyXG4gIGNvbmNsdXNpb25lcyxcclxuICB2aXNpdFR5cGVzLFxyXG4gIGNvbnRhY3RNZXRob2RzLFxyXG4gIGFzaXN0ZW50ZVRpcG9zLFxyXG4gIGRlZmF1bHRWaXNpdFR5cGUsXHJcbiAgcmF3SW5pdGlhbFZpc2l0VHlwZSxcclxuICByYXdJbml0aWFsQ29udGFjdE1ldGhvZCxcclxuICByYXdJbml0aWFsQXNpc3RlbnRlLFxyXG4gIG1hdGNoT3B0aW9uVmFsdWUsXHJcbiAgY2xlYXJEcmFmdCxcclxuICBzeW5jRWRpdE1vZGVGbGFnLFxyXG4gIHNldE1vZGFsRXJyb3IsXHJcbiAgc2V0QnVzeSxcclxuICBzZXRTdGF0dXMsXHJcbiAgc2V0SXNFZGl0aW5nLFxyXG59OiBVc2VEZXRhaWxNdXRhdGlvbnNBcmdzKSA9PiB7XHJcbiAgY29uc3QgaGFuZGxlVXBkYXRlID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgaWYgKGJ1c3kgfHwgIWlzRWRpdGluZykgcmV0dXJuIGZhbHNlO1xyXG4gICAgaWYgKCFjYW5FZGl0SGlzdG9yeSkge1xyXG4gICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzYWZlUmVjSWRWYWx1ZSA9IHJlc29sdmVTYWZlUmVjSWQocmVjSWQpO1xyXG4gICAgaWYgKHNhZmVSZWNJZFZhbHVlID09PSBudWxsKSB7XHJcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBpbmRUKFwiVmlzaXRzX0RldGFpbF9JbnZhbGlkUmVjSWRcIiwgXCJDb3VsZCBub3QgcmVzb2x2ZSBhY3Rpdml0eSBpZGVudGlmaWVyLiBSZWxvYWQgYW5kIHRyeSBhZ2Fpbi5cIik7XHJcbiAgICAgIHNldE1vZGFsRXJyb3IobWVzc2FnZSk7XHJcbiAgICAgIHNldFN0YXR1cyhtZXNzYWdlKTtcclxuICAgICAgZmxhc2hBY3Rpb25NYXJrKFwiZXJyb3JQcm9jZXNzXCIsIDE1MDApO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0TW9kYWxFcnJvcihcIlwiKTtcclxuICAgIHNldEJ1c3kodHJ1ZSk7XHJcbiAgICBzZXRTdGF0dXMoaW5kVChcIlZpc2l0c19EZXRhaWxfVXBkYXRpbmdcIiwgXCJVcGRhdGluZyBhY3Rpdml0eS4uLlwiKSk7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3Qgbm9ybWFsaXplZFZpc2l0VHlwZSA9XHJcbiAgICAgICAgbWF0Y2hPcHRpb25WYWx1ZSh2aXNpdFR5cGVzLCB2aXNpdFR5cGUpIHx8XHJcbiAgICAgICAgbWF0Y2hPcHRpb25WYWx1ZSh2aXNpdFR5cGVzLCByYXdJbml0aWFsVmlzaXRUeXBlKSB8fFxyXG4gICAgICAgIGRlZmF1bHRWaXNpdFR5cGU7XHJcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRBc2lzdGVudGVUaXBvID1cclxuICAgICAgICBtYXRjaE9wdGlvblZhbHVlKGFzaXN0ZW50ZVRpcG9zLCBhc2lzdGVudGVUaXBvKSB8fFxyXG4gICAgICAgIG1hdGNoT3B0aW9uVmFsdWUoYXNpc3RlbnRlVGlwb3MsIHJhd0luaXRpYWxBc2lzdGVudGUpIHx8XHJcbiAgICAgICAgcmF3SW5pdGlhbEFzaXN0ZW50ZTtcclxuICAgICAgY29uc3Qgbm9ybWFsaXplZENvbnRhY3RNZXRob2QgPVxyXG4gICAgICAgIG1hdGNoT3B0aW9uVmFsdWUoY29udGFjdE1ldGhvZHMsIGNvbnRhY3RNZXRob2QpIHx8XHJcbiAgICAgICAgbWF0Y2hPcHRpb25WYWx1ZShjb250YWN0TWV0aG9kcywgcmF3SW5pdGlhbENvbnRhY3RNZXRob2QpO1xyXG4gICAgICBjb25zdCBjb250YWN0TWV0aG9kVmFsdWUgPSBOdW1iZXIobm9ybWFsaXplZENvbnRhY3RNZXRob2QpO1xyXG5cclxuICAgICAgY29uc3QgcGF5bG9hZCA9IHtcclxuICAgICAgICBhY2NvdW50TnVtLFxyXG4gICAgICAgIHZpc2l0VHlwZTogbm9ybWFsaXplZFZpc2l0VHlwZSxcclxuICAgICAgICBjb250YWN0TWV0aG9kOiBOdW1iZXIuaXNGaW5pdGUoY29udGFjdE1ldGhvZFZhbHVlKSA/IGNvbnRhY3RNZXRob2RWYWx1ZSA6IG51bGwsXHJcbiAgICAgICAgYXNpc3RlbnRlVGlwbzogbm9ybWFsaXplZEFzaXN0ZW50ZVRpcG8sXHJcbiAgICAgICAgZGVzY3JpcHRpb24sXHJcbiAgICAgICAgdHJhbnNEYXRlLFxyXG4gICAgICAgIGNvbWVudGFyaW9zLFxyXG4gICAgICAgIGFudGVjZWRlbnRlcyxcclxuICAgICAgICBjb25jbHVzaW9uZXMsXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBsb2dTYWZlUmVjSWRJbkRldihcInVwZGF0ZVwiLCBzYWZlUmVjSWRWYWx1ZSk7XHJcbiAgICAgIGNvbnN0IHNhZmVSZWNJZCA9IGVuY29kZVVSSUNvbXBvbmVudChzYWZlUmVjSWRWYWx1ZSk7XHJcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPFZpc2l0Q29tbWFuZFJlc3BvbnNlPihgL1Zpc2l0YXMvVXBkYXRlQWN0aXZpdHkvJHtzYWZlUmVjSWR9YCwge1xyXG4gICAgICAgIG1ldGhvZDogXCJQVVRcIixcclxuICAgICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXHJcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGF5bG9hZCksXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgaWYgKCFpc0NvbW1hbmRTdWNjZXNzKHJlc3BvbnNlKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihnZXRDb21tYW5kTWVzc2FnZShyZXNwb25zZSkgfHwgaW5kVChcIlZpc2l0c19EZXRhaWxfVXBkYXRlRmFpbGVkXCIsIFwiVXBkYXRlIGZhaWxlZC5cIikpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzZXRTdGF0dXMoaW5kVChcIlZpc2l0c19EZXRhaWxfVXBkYXRlZFwiLCBcIkFjdGl2aXR5IHVwZGF0ZWRcIikpO1xyXG4gICAgICBzZXRJc0VkaXRpbmcoZmFsc2UpO1xyXG4gICAgICBzeW5jRWRpdE1vZGVGbGFnKGZhbHNlKTtcclxuICAgICAgY2xlYXJEcmFmdCgpO1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBlcnJvciBpbnN0YW5jZW9mIEVycm9yICYmIGVycm9yLm1lc3NhZ2VcclxuICAgICAgICA/IGVycm9yLm1lc3NhZ2VcclxuICAgICAgICA6IGluZFQoXCJWaXNpdHNfRGV0YWlsX1VwZGF0ZUVycm9yXCIsIFwiVXBkYXRlIGVycm9yLlwiKTtcclxuICAgICAgc2V0TW9kYWxFcnJvcihtZXNzYWdlKTtcclxuICAgICAgc2V0U3RhdHVzKG1lc3NhZ2UpO1xyXG4gICAgICBmbGFzaEFjdGlvbk1hcmsoXCJlcnJvclByb2Nlc3NcIiwgMTUwMCk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0gZmluYWxseSB7XHJcbiAgICAgIHNldEJ1c3koZmFsc2UpO1xyXG4gICAgfVxyXG4gIH0sIFtcclxuICAgIGFjY291bnROdW0sXHJcbiAgICBhbnRlY2VkZW50ZXMsXHJcbiAgICBhc2lzdGVudGVUaXBvLFxyXG4gICAgYXNpc3RlbnRlVGlwb3MsXHJcbiAgICBidXN5LFxyXG4gICAgY2FuRWRpdEhpc3RvcnksXHJcbiAgICBjbGVhckRyYWZ0LFxyXG4gICAgY29tZW50YXJpb3MsXHJcbiAgICBjb25jbHVzaW9uZXMsXHJcbiAgICBjb250YWN0TWV0aG9kLFxyXG4gICAgY29udGFjdE1ldGhvZHMsXHJcbiAgICBkZWZhdWx0VmlzaXRUeXBlLFxyXG4gICAgZGVzY3JpcHRpb24sXHJcbiAgICBpc0VkaXRpbmcsXHJcbiAgICBtYXRjaE9wdGlvblZhbHVlLFxyXG4gICAgcmF3SW5pdGlhbEFzaXN0ZW50ZSxcclxuICAgIHJhd0luaXRpYWxDb250YWN0TWV0aG9kLFxyXG4gICAgcmF3SW5pdGlhbFZpc2l0VHlwZSxcclxuICAgIHJlY0lkLFxyXG4gICAgc2V0QnVzeSxcclxuICAgIHNldElzRWRpdGluZyxcclxuICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICBzZXRTdGF0dXMsXHJcbiAgICBzeW5jRWRpdE1vZGVGbGFnLFxyXG4gICAgdHJhbnNEYXRlLFxyXG4gICAgdmlzaXRUeXBlLFxyXG4gICAgdmlzaXRUeXBlcyxcclxuICBdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlRGVsZXRlID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgaWYgKGJ1c3kpIHJldHVybiBmYWxzZTtcclxuICAgIGlmICghY2FuRGVsZXRlSGlzdG9yeSkge1xyXG4gICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzYWZlUmVjSWRWYWx1ZSA9IHJlc29sdmVTYWZlUmVjSWQocmVjSWQpO1xyXG4gICAgaWYgKHNhZmVSZWNJZFZhbHVlID09PSBudWxsKSB7XHJcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBpbmRUKFwiVmlzaXRzX0RldGFpbF9JbnZhbGlkUmVjSWRcIiwgXCJDb3VsZCBub3QgcmVzb2x2ZSBhY3Rpdml0eSBpZGVudGlmaWVyLiBSZWxvYWQgYW5kIHRyeSBhZ2Fpbi5cIik7XHJcbiAgICAgIHNldE1vZGFsRXJyb3IobWVzc2FnZSk7XHJcbiAgICAgIHNldFN0YXR1cyhtZXNzYWdlKTtcclxuICAgICAgZmxhc2hBY3Rpb25NYXJrKFwiZXJyb3JQcm9jZXNzXCIsIDE1MDApO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0TW9kYWxFcnJvcihcIlwiKTtcclxuICAgIHNldEJ1c3kodHJ1ZSk7XHJcbiAgICBzZXRTdGF0dXMoaW5kVChcIlZpc2l0c19EZXRhaWxfRGVsZXRpbmdcIiwgXCJEZWxldGluZyBhY3Rpdml0eS4uLlwiKSk7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgbG9nU2FmZVJlY0lkSW5EZXYoXCJkZWxldGVcIiwgc2FmZVJlY0lkVmFsdWUpO1xyXG4gICAgICBjb25zdCBzYWZlUmVjSWQgPSBlbmNvZGVVUklDb21wb25lbnQoc2FmZVJlY0lkVmFsdWUpO1xyXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxWaXNpdENvbW1hbmRSZXNwb25zZT4oYC9WaXNpdGFzL0RlbGV0ZUFjdGl2aXR5LyR7c2FmZVJlY0lkfWAsIHsgbWV0aG9kOiBcIkRFTEVURVwiIH0pO1xyXG4gICAgICBpZiAoIWlzQ29tbWFuZFN1Y2Nlc3MocmVzcG9uc2UpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGdldENvbW1hbmRNZXNzYWdlKHJlc3BvbnNlKSB8fCBpbmRUKFwiVmlzaXRzX0RldGFpbF9EZWxldGVGYWlsZWRcIiwgXCJEZWxldGUgZmFpbGVkLlwiKSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNldFN0YXR1cyhpbmRUKFwiVmlzaXRzX0RldGFpbF9EZWxldGVkXCIsIFwiQWN0aXZpdHkgZGVsZXRlZFwiKSk7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc3QgbWVzc2FnZSA9IGVycm9yIGluc3RhbmNlb2YgRXJyb3IgJiYgZXJyb3IubWVzc2FnZVxyXG4gICAgICAgID8gZXJyb3IubWVzc2FnZVxyXG4gICAgICAgIDogaW5kVChcIlZpc2l0c19EZXRhaWxfRGVsZXRlRXJyb3JcIiwgXCJEZWxldGUgZXJyb3IuXCIpO1xyXG4gICAgICBzZXRNb2RhbEVycm9yKG1lc3NhZ2UpO1xyXG4gICAgICBzZXRTdGF0dXMobWVzc2FnZSk7XHJcbiAgICAgIGZsYXNoQWN0aW9uTWFyayhcImVycm9yUHJvY2Vzc1wiLCAxNTAwKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSBmaW5hbGx5IHtcclxuICAgICAgc2V0QnVzeShmYWxzZSk7XHJcbiAgICB9XHJcbiAgfSwgW2J1c3ksIGNhbkRlbGV0ZUhpc3RvcnksIHJlY0lkLCBzZXRCdXN5LCBzZXRNb2RhbEVycm9yLCBzZXRTdGF0dXNdKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGhhbmRsZVVwZGF0ZSxcclxuICAgIGhhbmRsZURlbGV0ZSxcclxuICB9O1xyXG59O1xyXG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuXG50eXBlIFByb3BzID0ge1xuICBsYWJlbDogc3RyaW5nO1xuICB2YWx1ZTogc3RyaW5nO1xufTtcblxuLy8gUmVhZC1vbmx5IG93bmVyIGZpZWxkIHNob3duIG9ubHkgd2hlbiB2aXNpYmlsaXR5IGNvbmZpcm1zIGEgbWFuYWdlciBjb250ZXh0LlxuY29uc3QgRGV0YWlsT3duZXJGaWVsZCA9ICh7IGxhYmVsLCB2YWx1ZSB9OiBQcm9wcykgPT4ge1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwidmlzaXRhLWZpZWxkLXRleHRcIj5cbiAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb3JtLWxhYmVsIGZvbnQtc2VtaWJvbGRcIiBodG1sRm9yPVwidmlzaXQtZGV0YWlsLW93bmVyXCI+XG4gICAgICAgIHtsYWJlbH1cbiAgICAgIDwvbGFiZWw+XG4gICAgICA8aW5wdXRcbiAgICAgICAgaWQ9XCJ2aXNpdC1kZXRhaWwtb3duZXJcIlxuICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2wgaW5kLXJlYWRvbmx5LWZpZWxkIGN1cnNvci1kZWZhdWx0XCJcbiAgICAgICAgdmFsdWU9e3ZhbHVlfVxuICAgICAgICByZWFkT25seVxuICAgICAgICBhcmlhLXJlYWRvbmx5PVwidHJ1ZVwiXG4gICAgICAvPlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRGV0YWlsT3duZXJGaWVsZDtcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBEZXRhaWxGb3JtIGZyb20gXCIuL0RldGFpbEZvcm0udHN4XCI7XHJcbmltcG9ydCBWaXNpdGFzUGFnZVByb3ZpZGVycyBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1Zpc2l0YXNQYWdlUHJvdmlkZXJzLnRzeFwiO1xuaW1wb3J0IHsgbW91bnRSZWFjdElzbGFuZCwgbW91bnRXaGVuRG9jdW1lbnRSZWFkeSB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9yZWFjdElzbGFuZC50c3hcIjtcblxudHlwZSBQcm9wcyA9IHtcbiAgY29tcGFueUlkPzogc3RyaW5nO1xuICBheFVzZXJJZD86IHN0cmluZztcbiAgcGVybWlzc2lvbnNSZXZpc2lvbj86IHN0cmluZztcbn07XG5cbi8vIFBhZ2UgZW50cnkgZm9yIHRoZSB2aXNpdGFzIGRldGFpbCBpc2xhbmQuXG5jb25zdCBEZXRhaWxQYWdlID0gKHsgY29tcGFueUlkID0gXCJcIiwgYXhVc2VySWQgPSBcIlwiLCBwZXJtaXNzaW9uc1JldmlzaW9uID0gXCJcIiB9OiBQcm9wcykgPT4ge1xuICByZXR1cm4gKFxuICAgIDxWaXNpdGFzUGFnZVByb3ZpZGVycz5cbiAgICAgIDxEZXRhaWxGb3JtIGNvbXBhbnlJZD17Y29tcGFueUlkfSBheFVzZXJJZD17YXhVc2VySWR9IHBlcm1pc3Npb25zUmV2aXNpb249e3Blcm1pc3Npb25zUmV2aXNpb259IC8+XG4gICAgPC9WaXNpdGFzUGFnZVByb3ZpZGVycz5cbiAgKTtcbn07XG5cclxuY29uc3QgbW91bnQgPSAoKSA9PiB7XHJcbiAgY29uc3Qgcm9vdEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2aXNpdGEtZGV0YWlsLXJvb3RcIik7XG4gIGlmICghcm9vdEVsKSByZXR1cm47XG4gIGNvbnN0IGNvbXBhbnlJZCA9IHJvb3RFbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNvbXBhbnktaWRcIikgfHwgXCJcIjtcbiAgY29uc3QgYXhVc2VySWQgPSByb290RWwuZ2V0QXR0cmlidXRlKFwiZGF0YS1heC11c2VyLWlkXCIpIHx8IFwiXCI7XG4gIGNvbnN0IHBlcm1pc3Npb25zUmV2aXNpb24gPSByb290RWwuZ2V0QXR0cmlidXRlKFwiZGF0YS1wZXJtaXNzaW9ucy1yZXZpc2lvblwiKSB8fCBcIlwiO1xuXG4gIG1vdW50UmVhY3RJc2xhbmQoXG4gICAgcm9vdEVsLFxuICAgIDxEZXRhaWxQYWdlIGNvbXBhbnlJZD17Y29tcGFueUlkfSBheFVzZXJJZD17YXhVc2VySWR9IHBlcm1pc3Npb25zUmV2aXNpb249e3Blcm1pc3Npb25zUmV2aXNpb259IC8+XG4gICk7XG59O1xuXHJcbm1vdW50V2hlbkRvY3VtZW50UmVhZHkobW91bnQpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRGV0YWlsUGFnZTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFBQSxnQkFBeUU7OztBQ0FsRSxJQUFNLG9CQUFvQixDQUFDLE9BQTJCO0FBQzNELE1BQUksQ0FBQyxHQUFJLFFBQU8sTUFBTTtBQUFBLEVBQUM7QUFDdkIsUUFBTSxTQUFTLENBQUMsVUFBaUIsTUFBTSxlQUFlO0FBQ3RELFFBQU0sU0FBUyxDQUFDLGVBQWUsZUFBZSxRQUFRLE9BQU8sT0FBTztBQUNwRSxTQUFPLFFBQVEsQ0FBQyxRQUFRLEdBQUcsaUJBQWlCLEtBQUssTUFBTSxDQUFDO0FBQ3hELFNBQU8sTUFBTTtBQUNYLFdBQU8sUUFBUSxDQUFDLFFBQVEsR0FBRyxvQkFBb0IsS0FBSyxNQUFNLENBQUM7QUFBQSxFQUM3RDtBQUNGOzs7QUNSTyxJQUFNLFdBQVcsQ0FBQyxVQUFtQixPQUFPLFNB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V0FBVztBQUFBLGtCQUNYLGlCQUFpQjtBQUFBLGdCQUNuQjtBQUFBLGdCQUNBO0FBQUEsa0JBQ0UsSUFBSTtBQUFBLGtCQUNKLE9BQU87QUFBQSxrQkFDUCxPQUFPO0FBQUEsa0JBQ1AsV0FBVztBQUFBLGtCQUNYLGlCQUFpQjtBQUFBLGdCQUNuQjtBQUFBLGNBQ0Y7QUFBQTtBQUFBLFVBQ0Y7QUFBQSxVQUVBLDZDQUFDLFNBQUksV0FBVSxvREFDYix1REFBQyxVQUFNLGtCQUFPLEdBQ2hCO0FBQUE7QUFBQTtBQUFBLElBQ0Y7QUFBQSxLQUNGO0FBRUo7QUFHZSxTQUFSLFdBQTRCLE9BQXdCO0FBQ3pELFNBQ0UsNkNBQUMsNEJBQWlCLGlCQUFpQixLQUFLLCtCQUErQiwwRUFBMEUsR0FDL0ksdURBQUMsYUFBVyxHQUFHLE9BQU8sR0FDeEI7QUFFSjs7O0FRemxCTSxJQUFBQyxzQkFBQTtBQUhOLElBQU0sYUFBYSxDQUFDLEVBQUUsWUFBWSxJQUFJLFdBQVcsSUFBSSxzQkFBc0IsR0FBRyxNQUFhO0FBQ3pGLFNBQ0UsNkNBQUMsZ0NBQ0MsdURBQUMsY0FBVyxXQUFzQixVQUFvQixxQkFBMEMsR0FDbEc7QUFFSjtBQUVBLElBQU0sUUFBUSxNQUFNO0FBQ2xCLFFBQU0sU0FBUyxTQUFTLGVBQWUsb0JBQW9CO0FBQzNELE1BQUksQ0FBQyxPQUFRO0FBQ2IsUUFBTSxZQUFZLE9BQU8sYUFBYSxpQkFBaUIsS0FBSztBQUM1RCxRQUFNLFdBQVcsT0FBTyxhQUFhLGlCQUFpQixLQUFLO0FBQzNELFFBQU0sc0JBQXNCLE9BQU8sYUFBYSwyQkFBMkIsS0FBSztBQUVoRjtBQUFBLElBQ0U7QUFBQSxJQUNBLDZDQUFDLGNBQVcsV0FBc0IsVUFBb0IscUJBQTBDO0FBQUEsRUFDbEc7QUFDRjtBQUVBLHVCQUF1QixLQUFLO0FBRTVCLElBQU8scUJBQVE7IiwKICAibmFtZXMiOiBbImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X2pzeF9ydW50aW1lIl0KfQo=
