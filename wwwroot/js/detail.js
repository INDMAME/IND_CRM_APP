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
import "./chunks/chunk-FBLVVGLA.js";
import {
  SingleDatePicker
} from "./chunks/chunk-3RR6MY4O.js";
import {
  SelectCombobox_default
} from "./chunks/chunk-6TVWMV24.js";
import "./chunks/chunk-HF2ANVLM.js";
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
} from "./chunks/chunk-XUQXOD2Z.js";
import "./chunks/chunk-SRZDJTMJ.js";
import {
  setTopbarActionGroupReady
} from "./chunks/chunk-ZBKHPZJX.js";
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
  defaultContactMethod,
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
      setContactMethod(matchOptionValue(contactMethods, rawContactMethod) || defaultContactMethod);
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
    defaultContactMethod,
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
  defaultContactMethod,
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
      const normalizedContactMethod = matchOptionValue(contactMethods, contactMethod) || matchOptionValue(contactMethods, rawInitialContactMethod) || defaultContactMethod;
      const payload = {
        accountNum,
        visitType: normalizedVisitType,
        contactMethod: Number(normalizedContactMethod || 0),
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
    defaultContactMethod,
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

// Web/wwwroot/react/src/pages/visitas/detail/DetailForm.tsx
var import_jsx_runtime = __toESM(require_jsx_runtime());
var EDITOR_RETURN_FLAG_TTL_MS = 2 * 60 * 60 * 1e3;
var DetailApp = () => {
  const { visitTypes, contactMethods, asistenteTipos } = useVisitas();
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
  const defaultContactMethod = String(contactMethods[0]?.value ?? contactMethods[0]?.Value ?? "0");
  const rawInitialContactMethod = String(
    detail.contactMethod ?? detail.ContactMethod ?? ""
  );
  const initialContactMethod = matchOptionValue(contactMethods, rawInitialContactMethod) || defaultContactMethod;
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
    defaultContactMethod,
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
    defaultContactMethod,
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "space-y-4", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "div",
      {
        ref: readOnlySurfaceRef,
        className: "relative shadow-xs glass-panel p-4 space-y-4 border border-neutral-200 rounded-[var(--radius-xl)]",
        children: [
          isHydrating && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 z-10 flex items-center justify-center bg-white/70 rounded-[var(--radius-xl)]", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center gap-2 text-sm text-neutral-600", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner_default, { size: "size-5" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: indT("Common_Loading", "Loading") })
          ] }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 pt-1", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "visita-field-text", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              SingleDatePicker,
              {
                label: indT("Visits_Detail_Date_Label", "Date"),
                value: transDate,
                onChange: setTransDate,
                disabled: !isEditing,
                readOnly: !isEditing
              }
            ) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex items-center gap-3 text-sm text-neutral-600", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: status }) })
        ]
      }
    )
  ] });
};
function DetailForm() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppErrorBoundary_default, { fallbackMessage: indT("Visits_Detail_ErrorBoundary", "An error occurred while rendering the detail page. Reload and try again."), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailApp, {}) });
}

// Web/wwwroot/react/src/pages/visitas/detail/DetailPage.tsx
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var DetailPage = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(VisitasPageProviders_default, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(DetailForm, {}) });
};
var mount = () => {
  const rootEl = document.getElementById("visita-detail-root");
  if (!rootEl) return;
  mountReactIsland(rootEl, /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(DetailPage, {}));
};
mountWhenDocumentReady(mount);
var DetailPage_default = DetailPage;
export {
  DetailPage_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvZGV0YWlsL0RldGFpbEZvcm0udHN4IiwgIi4uL3JlYWN0L3NyYy91dGlscy9kb21HdWFyZHMudHMiLCAiLi4vcmVhY3Qvc3JjL3V0aWxzL3N0cmluZ3MudHMiLCAiLi4vcmVhY3Qvc3JjL2hvb2tzL3VzZURldGFpbEh5ZHJhdGlvbi50cyIsICIuLi9yZWFjdC9zcmMvaG9va3MvdXNlRGV0YWlsVG9wYmFyQWN0aW9ucy50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9kZXRhaWwvdXNlRGV0YWlsRWRpdFNlc3Npb24udHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvZGV0YWlsL3VzZURldGFpbE11dGF0aW9ucy50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9kZXRhaWwvRGV0YWlsUGFnZS50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZUNhbGxiYWNrLCB1c2VNZW1vIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBTaW5nbGVEYXRlUGlja2VyIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvU2luZ2xlRGF0ZVBpY2tlci50c3hcIjtcclxuaW1wb3J0IENvbmZpcm1Nb2RhbCBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0NvbmZpcm1Nb2RhbC50c3hcIjtcclxuaW1wb3J0IFNlbGVjdENvbWJvYm94IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvU2VsZWN0Q29tYm9ib3gudHN4XCI7XHJcbmltcG9ydCBBcHBFcnJvckJvdW5kYXJ5IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvQXBwRXJyb3JCb3VuZGFyeS50c3hcIjtcclxuaW1wb3J0IHsgdXNlVmlzaXRhcyB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VWaXNpdGFzLnRzXCI7XHJcbmltcG9ydCBTcGlubmVyIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvU3Bpbm5lci50c3hcIjtcclxuaW1wb3J0IFZpc2l0TmFycmF0aXZlRmllbGRzIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL3Zpc2l0YXMvVmlzaXROYXJyYXRpdmVGaWVsZHMudHN4XCI7XHJcbmltcG9ydCB7IGNsYXNzTmFtZXMgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvY2xhc3NOYW1lcy50c1wiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHsgY2FuQWNjZXNzLCBzaG93UGVybWlzc2lvbk1vZGFsIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3Blcm1pc3Npb25zLnRzXCI7XHJcbmltcG9ydCB7IGJpbmRSZWFkT25seUd1YXJkIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2RvbUd1YXJkcy50c1wiO1xyXG5pbXBvcnQgeyBoYXNWYWx1ZSB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9zdHJpbmdzLnRzXCI7XHJcbmltcG9ydCB7IG5hdmlnYXRlVG9UZXh0RWRpdG9yRmllbGQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvdGV4dEVkaXRvck5hdmlnYXRpb24udHNcIjtcclxuaW1wb3J0IHsgZmxhc2hBY3Rpb25NYXJrIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3Zpc2l0YXNIaXN0b3J5LnRzXCI7XHJcbmltcG9ydCB7IHNldFByZXZpZXdBbmNob3IsIHNob3dQcmV2aWV3VG9vbHRpcCwgaXNPdmVyZmxvd2luZyB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9wcmV2aWV3VG9vbHRpcC50c1wiO1xyXG5pbXBvcnQgeyB1c2VUYXBHdWFyZCB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VUYXBHdWFyZC50c1wiO1xyXG5pbXBvcnQgeyB1c2VDb25maXJtRGlhbG9nIH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZUNvbmZpcm1EaWFsb2cudHNcIjtcclxuaW1wb3J0IHsgdXNlRGV0YWlsSHlkcmF0aW9uIH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZURldGFpbEh5ZHJhdGlvbi50c1wiO1xyXG5pbXBvcnQgeyB1c2VEZXRhaWxUb3BiYXJBY3Rpb25zIH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZURldGFpbFRvcGJhckFjdGlvbnMudHNcIjtcclxuaW1wb3J0IHsgdXNlVGV4dEVkaXRvckZpZWxkcyB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VUZXh0RWRpdG9yRmllbGRzLnRzXCI7XHJcbmltcG9ydCB7IHVzZURldGFpbEVkaXRTZXNzaW9uIH0gZnJvbSBcIi4vdXNlRGV0YWlsRWRpdFNlc3Npb24udHNcIjtcclxuaW1wb3J0IHsgdXNlRGV0YWlsTXV0YXRpb25zIH0gZnJvbSBcIi4vdXNlRGV0YWlsTXV0YXRpb25zLnRzXCI7XHJcblxyXG5jb25zdCBFRElUT1JfUkVUVVJOX0ZMQUdfVFRMX01TID0gMiAqIDYwICogNjAgKiAxMDAwO1xyXG5cclxuY29uc3QgRGV0YWlsQXBwID0gKCkgPT4ge1xyXG4gIGNvbnN0IHsgdmlzaXRUeXBlcywgY29udGFjdE1ldGhvZHMsIGFzaXN0ZW50ZVRpcG9zIH0gPSB1c2VWaXNpdGFzKCk7XG4gIGNvbnN0IGNhbkVkaXRIaXN0b3J5ID0gY2FuQWNjZXNzKFwiVklTSVRBU19HRVNUSU9OXCIsIFwiRWRpdFwiKTtcclxuICBjb25zdCBjYW5EZWxldGVIaXN0b3J5ID0gY2FuQWNjZXNzKFwiVklTSVRBU19HRVNUSU9OXCIsIFwiRnVsbEFjY2Vzc1wiKTtcclxuICB0eXBlIEFjdGl2aXR5RGV0YWlsUGF5bG9hZCA9IHtcclxuICAgIHJlY0lkPzogc3RyaW5nIHwgbnVtYmVyO1xyXG4gICAgUmVjSWQ/OiBzdHJpbmcgfCBudW1iZXI7XHJcbiAgICByZWZSZWNJZEFjdGl2aWRhZD86IHN0cmluZyB8IG51bWJlcjtcclxuICAgIFJlZlJlY0lkQWN0aXZpZGFkPzogc3RyaW5nIHwgbnVtYmVyO1xyXG4gICAgYWN0aXZpZGFkUmVjSWQ/OiBzdHJpbmcgfCBudW1iZXI7XHJcbiAgICBBY3RpdmlkYWRSZWNJZD86IHN0cmluZyB8IG51bWJlcjtcclxuICAgIHJlYWRPbmx5PzogYm9vbGVhbjtcclxuICAgIGFsbG93RWRpdD86IGJvb2xlYW47XHJcbiAgICBlZGl0TW9kZUtleT86IHN0cmluZztcclxuICAgIFtrZXk6IHN0cmluZ106IHVua25vd247XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgZGV0YWlsID0gKHdpbmRvdy5fX0FDVElWSVRZX0RFVEFJTF9fIGFzIEFjdGl2aXR5RGV0YWlsUGF5bG9hZCkgfHwge307XHJcblxyXG4gIGNvbnN0IHJlc29sdmVBY3Rpdml0eVJlY0lkID0gKHBheWxvYWQ6IEFjdGl2aXR5RGV0YWlsUGF5bG9hZCk6IHN0cmluZyA9PiB7XHJcbiAgICBjb25zdCBjYW5kaWRhdGVzID0gW1xyXG4gICAgICBwYXlsb2FkLnJlY0lkLFxyXG4gICAgICBwYXlsb2FkLlJlY0lkLFxyXG4gICAgICBwYXlsb2FkLnJlZlJlY0lkQWN0aXZpZGFkLFxyXG4gICAgICBwYXlsb2FkLlJlZlJlY0lkQWN0aXZpZGFkLFxyXG4gICAgICBwYXlsb2FkLmFjdGl2aWRhZFJlY0lkLFxyXG4gICAgICBwYXlsb2FkLkFjdGl2aWRhZFJlY0lkLFxyXG4gICAgXTtcclxuXHJcbiAgICBmb3IgKGNvbnN0IGNhbmRpZGF0ZSBvZiBjYW5kaWRhdGVzKSB7XHJcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSBTdHJpbmcoY2FuZGlkYXRlID8/IFwiXCIpLnRyaW0oKTtcclxuICAgICAgaWYgKG5vcm1hbGl6ZWQpIHtcclxuICAgICAgICByZXR1cm4gbm9ybWFsaXplZDtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBcIlwiO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGFjdGl2aXR5UmVjSWQgPSByZXNvbHZlQWN0aXZpdHlSZWNJZChkZXRhaWwpO1xyXG5cclxuICBjb25zdCB0ZXh0RWRpdG9yQmFzZUlkID0gYWN0aXZpdHlSZWNJZCA/IGBWaXNpdGEuJHthY3Rpdml0eVJlY0lkfWAgOiBcIlZpc2l0YVwiO1xyXG4gIGNvbnN0IGZpZWxkSWRDb21lbnRhcmlvcyA9IGAke3RleHRFZGl0b3JCYXNlSWR9LkNvbWVudGFyaW9zYDtcclxuICBjb25zdCBmaWVsZElkQW50ZWNlZGVudGVzID0gYCR7dGV4dEVkaXRvckJhc2VJZH0uQW50ZWNlZGVudGVzYDtcclxuICBjb25zdCBmaWVsZElkQ29uY2x1c2lvbmVzID0gYCR7dGV4dEVkaXRvckJhc2VJZH0uQ29uY2x1c2lvbmVzYDtcclxuXHJcbiAgY29uc3Qgbm9ybWFsaXplRGF0ZVRvSW5wdXQgPSB1c2VDYWxsYmFjaygodmFsdWUpID0+IHtcclxuICAgIGlmICghdmFsdWUpIHJldHVybiBcIlwiO1xyXG4gICAgY29uc3QgcmF3ID0gU3RyaW5nKHZhbHVlKS50cmltKCk7XHJcbiAgICBpZiAoIXJhdykgcmV0dXJuIFwiXCI7XHJcbiAgICAvLyBBbHJlYWR5IHl5eXktTU0tZGRcclxuICAgIGlmICgvXlxcZHs0fS1cXGR7Mn0tXFxkezJ9JC8udGVzdChyYXcpKSByZXR1cm4gcmF3O1xyXG4gICAgLy8gZGQuTU0ueXl5eSBvciBkZC9NTS95eXl5XHJcbiAgICBpZiAoL15cXGR7Mn1bLi8tXVxcZHsyfVsuLy1dXFxkezR9JC8udGVzdChyYXcpKSB7XHJcbiAgICAgIGNvbnN0IHBhcnRzID0gcmF3LnNwbGl0KC9bLi8tXS8pLm1hcCgocCkgPT4gcGFyc2VJbnQocCwgMTApKTtcclxuICAgICAgaWYgKHBhcnRzLmxlbmd0aCA9PT0gMyAmJiAhTnVtYmVyLmlzTmFOKHBhcnRzWzBdKSAmJiAhTnVtYmVyLmlzTmFOKHBhcnRzWzFdKSAmJiAhTnVtYmVyLmlzTmFOKHBhcnRzWzJdKSkge1xyXG4gICAgICAgIGNvbnN0IFtkLCBtLCB5XSA9IHBhcnRzO1xyXG4gICAgICAgIGNvbnN0IG1tID0gU3RyaW5nKG0pLnBhZFN0YXJ0KDIsIFwiMFwiKTtcclxuICAgICAgICBjb25zdCBkZCA9IFN0cmluZyhkKS5wYWRTdGFydCgyLCBcIjBcIik7XHJcbiAgICAgICAgcmV0dXJuIGAke3l9LSR7bW19LSR7ZGR9YDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgY29uc3QgZHQgPSBuZXcgRGF0ZShyYXcpO1xyXG4gICAgaWYgKCFOdW1iZXIuaXNOYU4oZHQuZ2V0VGltZSgpKSkge1xyXG4gICAgICBjb25zdCB5eXl5ID0gZHQuZ2V0RnVsbFllYXIoKTtcclxuICAgICAgY29uc3QgbW0gPSBTdHJpbmcoZHQuZ2V0TW9udGgoKSArIDEpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcclxuICAgICAgY29uc3QgZGQgPSBTdHJpbmcoZHQuZ2V0RGF0ZSgpKS5wYWRTdGFydCgyLCBcIjBcIik7XHJcbiAgICAgIHJldHVybiBgJHt5eXl5fS0ke21tfS0ke2RkfWA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gXCJcIjtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IG1hdGNoT3B0aW9uVmFsdWUgPSB1c2VDYWxsYmFjaygob3B0aW9ucywgcmF3KSA9PiB7XHJcbiAgICBpZiAocmF3ID09IG51bGwpIHJldHVybiBcIlwiO1xyXG4gICAgY29uc3QgcmF3U3RyID0gU3RyaW5nKHJhdykudHJpbSgpO1xyXG4gICAgaWYgKCFyYXdTdHIpIHJldHVybiBcIlwiO1xyXG5cclxuICAgIGNvbnN0IG5vcm1hbGl6ZVRleHQgPSAocykgPT5cclxuICAgICAgU3RyaW5nKHMgfHwgXCJcIilcclxuICAgICAgICAudG9Mb3dlckNhc2UoKVxyXG4gICAgICAgIC5ub3JtYWxpemUoXCJORkRcIilcclxuICAgICAgICAucmVwbGFjZSgvW1xcdTAzMDAtXFx1MDM2Zl0vZywgXCJcIilcclxuICAgICAgICAudHJpbSgpO1xyXG5cclxuICAgIGNvbnN0IHJhd05vcm0gPSBub3JtYWxpemVUZXh0KHJhd1N0cik7XHJcbiAgICBjb25zdCBhbHROb3JtID0gcmF3Tm9ybS5lbmRzV2l0aChcIm9cIikgPyBgJHtyYXdOb3JtLnNsaWNlKDAsIC0xKX1hYCA6IHJhd05vcm07XHJcblxyXG4gICAgY29uc3QgbWF0Y2ggPSAob3B0aW9ucyB8fCBbXSkuZmluZCgobykgPT4ge1xyXG4gICAgICBjb25zdCB2YWwgPSBTdHJpbmcobz8udmFsdWUgPz8gbz8uVmFsdWUgPz8gXCJcIikudHJpbSgpO1xyXG4gICAgICBjb25zdCB0ZXh0ID0gU3RyaW5nKG8/LnRleHQgPz8gbz8uVGV4dCA/PyBcIlwiKS50cmltKCk7XHJcbiAgICAgIGNvbnN0IHRleHROb3JtID0gbm9ybWFsaXplVGV4dCh0ZXh0KTtcclxuICAgICAgcmV0dXJuIHZhbCA9PT0gcmF3U3RyIHx8IHZhbCA9PT0gcmF3Tm9ybSB8fCB0ZXh0Tm9ybSA9PT0gcmF3Tm9ybSB8fCB0ZXh0Tm9ybSA9PT0gYWx0Tm9ybTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIG1hdGNoID8gU3RyaW5nKG1hdGNoLnZhbHVlID8/IG1hdGNoLlZhbHVlID8/IHJhd1N0cikgOiByYXdTdHI7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBpbml0aWFsVHJhbnNEYXRlID0gbm9ybWFsaXplRGF0ZVRvSW5wdXQoU3RyaW5nKGRldGFpbC50cmFuc0RhdGUgPz8gZGV0YWlsLlRyYW5zRGF0ZSA/PyBcIlwiKSk7XHJcbiAgY29uc3QgZGVmYXVsdFZpc2l0VHlwZSA9IFN0cmluZyh2aXNpdFR5cGVzWzBdPy52YWx1ZSA/PyB2aXNpdFR5cGVzWzBdPy5WYWx1ZSA/PyBcIlwiKTtcclxuICBjb25zdCByYXdJbml0aWFsVmlzaXRUeXBlID0gU3RyaW5nKFxyXG4gICAgZGV0YWlsLnRpcG9WaXNpdGEgPz8gZGV0YWlsLlRpcG9WaXNpdGEgPz8gZGV0YWlsLnZpc2l0VHlwZSA/PyBkZXRhaWwuVmlzaXRUeXBlID8/IFwiXCJcclxuICApO1xyXG4gIGNvbnN0IGluaXRpYWxWaXNpdFR5cGUgPSBtYXRjaE9wdGlvblZhbHVlKHZpc2l0VHlwZXMsIHJhd0luaXRpYWxWaXNpdFR5cGUpIHx8IGRlZmF1bHRWaXNpdFR5cGU7XG4gIGNvbnN0IGRlZmF1bHRDb250YWN0TWV0aG9kID0gU3RyaW5nKGNvbnRhY3RNZXRob2RzWzBdPy52YWx1ZSA/PyBjb250YWN0TWV0aG9kc1swXT8uVmFsdWUgPz8gXCIwXCIpO1xuICBjb25zdCByYXdJbml0aWFsQ29udGFjdE1ldGhvZCA9IFN0cmluZyhcbiAgICBkZXRhaWwuY29udGFjdE1ldGhvZCA/PyBkZXRhaWwuQ29udGFjdE1ldGhvZCA/PyBcIlwiXG4gICk7XG4gIGNvbnN0IGluaXRpYWxDb250YWN0TWV0aG9kID0gbWF0Y2hPcHRpb25WYWx1ZShjb250YWN0TWV0aG9kcywgcmF3SW5pdGlhbENvbnRhY3RNZXRob2QpIHx8IGRlZmF1bHRDb250YWN0TWV0aG9kO1xuICBjb25zdCByYXdJbml0aWFsQXNpc3RlbnRlID0gU3RyaW5nKFxuICAgIGRldGFpbC5hc2lzdGVudGVUaXBvID8/IGRldGFpbC5Bc2lzdGVudGVUaXBvID8/IChhc2lzdGVudGVUaXBvc1swXT8udmFsdWUgPz8gYXNpc3RlbnRlVGlwb3NbMF0/LlZhbHVlID8/IFwiXCIpXHJcbiAgKTtcclxuICBjb25zdCBpbml0aWFsQXNpc3RlbnRlID0gbWF0Y2hPcHRpb25WYWx1ZShhc2lzdGVudGVUaXBvcywgcmF3SW5pdGlhbEFzaXN0ZW50ZSkgfHwgcmF3SW5pdGlhbEFzaXN0ZW50ZTtcclxuXHJcbiAgY29uc3QgW3RyYW5zRGF0ZSwgc2V0VHJhbnNEYXRlXSA9IHVzZVN0YXRlKGluaXRpYWxUcmFuc0RhdGUpO1xuICBjb25zdCBbdmlzaXRUeXBlLCBzZXRWaXNpdFR5cGVdID0gdXNlU3RhdGUoaW5pdGlhbFZpc2l0VHlwZSk7XG4gIGNvbnN0IFtjb250YWN0TWV0aG9kLCBzZXRDb250YWN0TWV0aG9kXSA9IHVzZVN0YXRlKGluaXRpYWxDb250YWN0TWV0aG9kKTtcbiAgY29uc3QgW2FzaXN0ZW50ZVRpcG8sIHNldEFzaXN0ZW50ZVRpcG9dID0gdXNlU3RhdGUoaW5pdGlhbEFzaXN0ZW50ZSk7XG4gIGNvbnN0IFtkZXNjcmlwdGlvbiwgc2V0RGVzY3JpcHRpb25dID0gdXNlU3RhdGUoU3RyaW5nKGRldGFpbC5kZXNjcmlwdGlvbiA/PyBkZXRhaWwuRGVzY3JpcHRpb24gPz8gXCJcIikpO1xyXG4gIGNvbnN0IFtjb21lbnRhcmlvcywgc2V0Q29tZW50YXJpb3NdID0gdXNlU3RhdGUoU3RyaW5nKGRldGFpbC5jb21lbnRhcmlvcyA/PyBkZXRhaWwuQ29tZW50YXJpb3MgPz8gXCJcIikpO1xyXG4gIGNvbnN0IFthbnRlY2VkZW50ZXMsIHNldEFudGVjZWRlbnRlc10gPSB1c2VTdGF0ZShTdHJpbmcoZGV0YWlsLmFudGVjZWRlbnRlcyA/PyBkZXRhaWwuQW50ZWNlZGVudGVzID8/IFwiXCIpKTtcclxuICBjb25zdCBbY29uY2x1c2lvbmVzLCBzZXRDb25jbHVzaW9uZXNdID0gdXNlU3RhdGUoU3RyaW5nKGRldGFpbC5jb25jbHVzaW9uZXMgPz8gZGV0YWlsLkNvbmNsdXNpb25lcyA/PyBcIlwiKSk7XHJcbiAgY29uc3QgW3N0YXR1cywgc2V0U3RhdHVzXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtidXN5LCBzZXRCdXN5XSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbaXNFZGl0aW5nLCBzZXRJc0VkaXRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtpc0h5ZHJhdGluZywgc2V0SXNIeWRyYXRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFttb2RhbEVycm9yLCBzZXRNb2RhbEVycm9yXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IHJlYWRPbmx5U3VyZmFjZVJlZiA9IHVzZVJlZihudWxsKTtcclxuICBjb25zdCBlZGl0U25hcHNob3RSZWYgPSB1c2VSZWYobnVsbCk7XHJcblxyXG4gIGNvbnN0IHJlY0lkID0gYWN0aXZpdHlSZWNJZDtcclxuICBjb25zdCBhY2NvdW50TnVtID0gU3RyaW5nKGRldGFpbC5hY2NvdW50TnVtID8/IGRldGFpbC5BY2NvdW50TnVtID8/IFwiXCIpO1xyXG4gIGNvbnN0IGFjdGl2aWRhZElkID0gU3RyaW5nKGRldGFpbC5hY3RpdmlkYWRJZCA/PyBkZXRhaWwuQWN0aXZpZGFkSWQgPz8gXCJcIik7XHJcblxyXG4gIGNvbnN0IHsgZWRpdE1vZGVLZXlSZWYsIHN5bmNFZGl0TW9kZUZsYWcsIGNsZWFyRHJhZnQsIGFwcGx5RHJhZnRWYWx1ZXMgfSA9IHVzZURldGFpbEVkaXRTZXNzaW9uKHtcclxuICAgIGFjdGl2aWRhZElkLFxyXG4gICAgcmVjSWQsXHJcbiAgICBjYW5FZGl0SGlzdG9yeSxcclxuICAgIGlzRWRpdGluZyxcclxuICAgIHNldElzRWRpdGluZyxcbiAgICB0cmFuc0RhdGUsXG4gICAgdmlzaXRUeXBlLFxuICAgIGNvbnRhY3RNZXRob2QsXG4gICAgYXNpc3RlbnRlVGlwbyxcbiAgICBkZXNjcmlwdGlvbixcclxuICAgIGNvbWVudGFyaW9zLFxyXG4gICAgYW50ZWNlZGVudGVzLFxyXG4gICAgY29uY2x1c2lvbmVzLFxyXG4gICAgc2V0VHJhbnNEYXRlLFxuICAgIHNldFZpc2l0VHlwZSxcbiAgICBzZXRDb250YWN0TWV0aG9kLFxuICAgIHNldEFzaXN0ZW50ZVRpcG8sXG4gICAgc2V0RGVzY3JpcHRpb24sXHJcbiAgICBzZXRDb21lbnRhcmlvcyxcclxuICAgIHNldEFudGVjZWRlbnRlcyxcclxuICAgIHNldENvbmNsdXNpb25lcyxcclxuICB9KTtcclxuXHJcbiAgY29uc3QgaGFzU2VydmVyRGV0YWlsID1cclxuICAgIGhhc1ZhbHVlKHJlY0lkKSAmJlxyXG4gICAgaGFzVmFsdWUoYWNjb3VudE51bSkgJiZcclxuICAgIGhhc1ZhbHVlKGRldGFpbC50cmFuc0RhdGUgfHwgZGV0YWlsLlRyYW5zRGF0ZSB8fCBcIlwiKTtcclxuXHJcbiAgY29uc3Qgc2hvdWxkSHlkcmF0ZSA9ICEhYWN0aXZpZGFkSWQgJiYgIWhhc1NlcnZlckRldGFpbDtcclxuXHJcbiAgY29uc3Qgb3BlblRleHRFZGl0b3IgPSB1c2VDYWxsYmFjayhcclxuICAgIChcclxuICAgICAgZmllbGRJZDogc3RyaW5nLFxyXG4gICAgICBmaWVsZExhYmVsOiBzdHJpbmcsXHJcbiAgICAgIGZpZWxkVmFsdWU6IHN0cmluZyxcclxuICAgICAgb3B0aW9uczogeyBhbGxvd0VkaXQ/OiBib29sZWFuOyByZWFkT25seT86IGJvb2xlYW47IGVkaXRNb2RlS2V5Pzogc3RyaW5nIH0gPSB7fVxyXG4gICAgKSA9PiB7XHJcbiAgICAgIG5hdmlnYXRlVG9UZXh0RWRpdG9yRmllbGQoe1xyXG4gICAgICAgIGZpZWxkSWQsXHJcbiAgICAgICAgZmllbGRMYWJlbCxcclxuICAgICAgICBmaWVsZFZhbHVlLFxyXG4gICAgICAgIHJlYWRPbmx5OiBvcHRpb25zPy5yZWFkT25seSA9PT0gdHJ1ZSxcclxuICAgICAgICBhbGxvd0VkaXQ6IG9wdGlvbnM/LmFsbG93RWRpdCAhPT0gZmFsc2UsXHJcbiAgICAgICAgZWRpdE1vZGVLZXk6IG9wdGlvbnM/LmVkaXRNb2RlS2V5LFxyXG4gICAgICAgIGVkaXRNb2RlUmV0dXJuVHRsTXM6IEVESVRPUl9SRVRVUk5fRkxBR19UVExfTVMsXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIFtdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQ29tZW50YXJpb3NUYXAgPSB1c2VDYWxsYmFjaygoZXZlbnQpID0+IHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBvcGVuVGV4dEVkaXRvcihmaWVsZElkQ29tZW50YXJpb3MsIGluZFQoXCJWaXNpdHNfRmllbGRfQ29tbWVudHNcIiwgXCJDb21tZW50c1wiKSwgY29tZW50YXJpb3MsIHtcclxuICAgICAgcmVhZE9ubHk6ICFpc0VkaXRpbmcsXHJcbiAgICAgIGFsbG93RWRpdDogY2FuRWRpdEhpc3RvcnksXHJcbiAgICAgIGVkaXRNb2RlS2V5OiBlZGl0TW9kZUtleVJlZi5jdXJyZW50XHJcbiAgICB9KTtcclxuICB9LCBbY29tZW50YXJpb3MsIGlzRWRpdGluZywgY2FuRWRpdEhpc3RvcnksIG9wZW5UZXh0RWRpdG9yXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUNvbWVudGFyaW9zSG9sZCA9IHVzZUNhbGxiYWNrKCh0YXJnZXQsIGNsaWVudFkpID0+IHtcclxuICAgIGlmICghdGFyZ2V0IHx8ICFpc092ZXJmbG93aW5nKHRhcmdldCkpIHJldHVybiBmYWxzZTtcclxuICAgIHNldFByZXZpZXdBbmNob3IodGFyZ2V0KTtcclxuICAgIHJldHVybiBzaG93UHJldmlld1Rvb2x0aXAoU3RyaW5nKGNvbWVudGFyaW9zIHx8IFwiXCIpLCBjbGllbnRZKTtcclxuICB9LCBbY29tZW50YXJpb3NdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQW50ZWNlZGVudGVzVGFwID0gdXNlQ2FsbGJhY2soKGV2ZW50KSA9PiB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgb3BlblRleHRFZGl0b3IoZmllbGRJZEFudGVjZWRlbnRlcywgaW5kVChcIlZpc2l0c19GaWVsZF9CYWNrZ3JvdW5kXCIsIFwiQmFja2dyb3VuZFwiKSwgYW50ZWNlZGVudGVzLCB7XHJcbiAgICAgIHJlYWRPbmx5OiAhaXNFZGl0aW5nLFxyXG4gICAgICBhbGxvd0VkaXQ6IGNhbkVkaXRIaXN0b3J5LFxyXG4gICAgICBlZGl0TW9kZUtleTogZWRpdE1vZGVLZXlSZWYuY3VycmVudFxyXG4gICAgfSk7XHJcbiAgfSwgW2FudGVjZWRlbnRlcywgaXNFZGl0aW5nLCBjYW5FZGl0SGlzdG9yeSwgb3BlblRleHRFZGl0b3JdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQW50ZWNlZGVudGVzSG9sZCA9IHVzZUNhbGxiYWNrKCh0YXJnZXQsIGNsaWVudFkpID0+IHtcclxuICAgIGlmICghdGFyZ2V0IHx8ICFpc092ZXJmbG93aW5nKHRhcmdldCkpIHJldHVybiBmYWxzZTtcclxuICAgIHNldFByZXZpZXdBbmNob3IodGFyZ2V0KTtcclxuICAgIHJldHVybiBzaG93UHJldmlld1Rvb2x0aXAoU3RyaW5nKGFudGVjZWRlbnRlcyB8fCBcIlwiKSwgY2xpZW50WSk7XHJcbiAgfSwgW2FudGVjZWRlbnRlc10pO1xyXG5cclxuICBjb25zdCBoYW5kbGVDb25jbHVzaW9uZXNUYXAgPSB1c2VDYWxsYmFjaygoZXZlbnQpID0+IHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBvcGVuVGV4dEVkaXRvcihmaWVsZElkQ29uY2x1c2lvbmVzLCBpbmRUKFwiVmlzaXRzX0ZpZWxkX0NvbmNsdXNpb25zXCIsIFwiQ29uY2x1c2lvbnNcIiksIGNvbmNsdXNpb25lcywge1xyXG4gICAgICByZWFkT25seTogIWlzRWRpdGluZyxcclxuICAgICAgYWxsb3dFZGl0OiBjYW5FZGl0SGlzdG9yeSxcclxuICAgICAgZWRpdE1vZGVLZXk6IGVkaXRNb2RlS2V5UmVmLmN1cnJlbnRcclxuICAgIH0pO1xyXG4gIH0sIFtjb25jbHVzaW9uZXMsIGlzRWRpdGluZywgY2FuRWRpdEhpc3RvcnksIG9wZW5UZXh0RWRpdG9yXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUNvbmNsdXNpb25lc0hvbGQgPSB1c2VDYWxsYmFjaygodGFyZ2V0LCBjbGllbnRZKSA9PiB7XHJcbiAgICBpZiAoIXRhcmdldCB8fCAhaXNPdmVyZmxvd2luZyh0YXJnZXQpKSByZXR1cm4gZmFsc2U7XHJcbiAgICBzZXRQcmV2aWV3QW5jaG9yKHRhcmdldCk7XHJcbiAgICByZXR1cm4gc2hvd1ByZXZpZXdUb29sdGlwKFN0cmluZyhjb25jbHVzaW9uZXMgfHwgXCJcIiksIGNsaWVudFkpO1xyXG4gIH0sIFtjb25jbHVzaW9uZXNdKTtcclxuXHJcbiAgY29uc3QgY29tZW50YXJpb3NUYXAgPSB1c2VUYXBHdWFyZChoYW5kbGVDb21lbnRhcmlvc1RhcCwgaGFuZGxlQ29tZW50YXJpb3NIb2xkKTtcclxuICBjb25zdCBhbnRlY2VkZW50ZXNUYXAgPSB1c2VUYXBHdWFyZChoYW5kbGVBbnRlY2VkZW50ZXNUYXAsIGhhbmRsZUFudGVjZWRlbnRlc0hvbGQpO1xyXG4gIGNvbnN0IGNvbmNsdXNpb25lc1RhcCA9IHVzZVRhcEd1YXJkKGhhbmRsZUNvbmNsdXNpb25lc1RhcCwgaGFuZGxlQ29uY2x1c2lvbmVzSG9sZCk7XHJcblxyXG4gIGNvbnN0IHRleHRFZGl0b3JCaW5kaW5ncyA9IHVzZU1lbW8oXHJcbiAgICAoKSA9PiBbXHJcbiAgICAgIHsgZmllbGRJZDogZmllbGRJZENvbWVudGFyaW9zLCBhcHBseVZhbHVlOiBzZXRDb21lbnRhcmlvcyB9LFxyXG4gICAgICB7IGZpZWxkSWQ6IGZpZWxkSWRBbnRlY2VkZW50ZXMsIGFwcGx5VmFsdWU6IHNldEFudGVjZWRlbnRlcyB9LFxyXG4gICAgICB7IGZpZWxkSWQ6IGZpZWxkSWRDb25jbHVzaW9uZXMsIGFwcGx5VmFsdWU6IHNldENvbmNsdXNpb25lcyB9LFxyXG4gICAgXSxcclxuICAgIFtmaWVsZElkQW50ZWNlZGVudGVzLCBmaWVsZElkQ29tZW50YXJpb3MsIGZpZWxkSWRDb25jbHVzaW9uZXNdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgeyBhcHBseVZhbHVlczogYXBwbHlUZXh0RWRpdG9yVmFsdWVzIH0gPSB1c2VUZXh0RWRpdG9yRmllbGRzKHRleHRFZGl0b3JCaW5kaW5ncywge1xyXG4gICAgYXBwbHlPbk1vdW50OiAhYWN0aXZpZGFkSWQsXHJcbiAgICBsaXN0ZW5QYWdlU2hvdzogdHJ1ZSxcclxuICB9KTtcclxuXHJcbiAgY29uc3QgeyBtb2RhbCwgb3BlbkNvbmZpcm0sIGNsb3NlQ29uZmlybSwgaGFuZGxlQ29uZmlybSB9ID0gdXNlQ29uZmlybURpYWxvZyh7XHJcbiAgICBkZWZhdWx0Q29uZmlybVRleHQ6IGluZFQoXCJDb25maXJtX1llc1wiLCBcIkNvbmZpcm1fWWVzXCIpLFxyXG4gICAgZGVmYXVsdENhbmNlbFRleHQ6IGluZFQoXCJDb25maXJtX05vXCIsIFwiQ29uZmlybV9Ob1wiKVxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVNb2RhbENvbmZpcm0gPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XHJcbiAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xyXG4gICAgYXdhaXQgaGFuZGxlQ29uZmlybSh7XHJcbiAgICAgIGJ1c3ksXHJcbiAgICAgIG9uRXJyb3I6IChtc2cpID0+IHtcclxuICAgICAgICBzZXRNb2RhbEVycm9yKG1zZyk7XHJcbiAgICAgICAgc2V0U3RhdHVzKG1zZyk7XHJcbiAgICAgICAgZmxhc2hBY3Rpb25NYXJrKFwiZXJyb3JQcm9jZXNzXCIsIDE1MDApO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9LCBbYnVzeSwgaGFuZGxlQ29uZmlybV0pO1xyXG5cclxuICBjb25zdCBtb2RhbExvYWRpbmdUZXh0ID0gaW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiQ29tbW9uX0xvYWRpbmdcIik7XHJcbiAgY29uc3QgbW9kYWxDYW5jZWxUZXh0ID0gbW9kYWwuY2FuY2VsVGV4dCB8fCBpbmRUKFwiQ29uZmlybV9Ob1wiLCBcIkNvbmZpcm1fTm9cIik7XHJcbiAgY29uc3QgbW9kYWxDb25maXJtVGV4dCA9IGJ1c3lcclxuICAgID8gbW9kYWxMb2FkaW5nVGV4dFxyXG4gICAgOiAoIWJ1c3kgJiYgbW9kYWxFcnJvciA/IGluZFQoXCJDb21tb25fT0tcIiwgXCJDb21tb25fT0tcIikgOiAobW9kYWwuY29uZmlybVRleHQgfHwgaW5kVChcIkNvbmZpcm1fWWVzXCIsIFwiQ29uZmlybV9ZZXNcIikpKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlTW9kYWxCdXR0b25Db25maXJtID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKCFidXN5ICYmIG1vZGFsRXJyb3IpIHtcclxuICAgICAgY2xvc2VDb25maXJtKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGhhbmRsZU1vZGFsQ29uZmlybSgpO1xyXG4gIH0sIFtidXN5LCBtb2RhbEVycm9yLCBjbG9zZUNvbmZpcm0sIGhhbmRsZU1vZGFsQ29uZmlybV0pO1xyXG5cclxuICBjb25zdCBoYXNBY3RpdmVQcm9jZXNzID0gdXNlTWVtbygoKSA9PiBidXN5IHx8IGlzRWRpdGluZywgW2J1c3ksIGlzRWRpdGluZ10pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgd2luZG93Ll9faW5kU2V0TmF2aWdhdGlvbkd1YXJkPy4oaGFzQWN0aXZlUHJvY2Vzcyk7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICB3aW5kb3cuX19pbmRDbGVhck5hdmlnYXRpb25HdWFyZD8uKCk7XHJcbiAgICB9O1xyXG4gIH0sIFtoYXNBY3RpdmVQcm9jZXNzXSk7XHJcblxyXG4gIHVzZURldGFpbEh5ZHJhdGlvbih7XHJcbiAgICBhY3RpdmlkYWRJZCxcclxuICAgIHNob3VsZEh5ZHJhdGUsXG4gICAgdmlzaXRUeXBlcyxcbiAgICBjb250YWN0TWV0aG9kcyxcbiAgICBhc2lzdGVudGVUaXBvcyxcbiAgICBkZWZhdWx0VmlzaXRUeXBlLFxuICAgIGRlZmF1bHRDb250YWN0TWV0aG9kLFxuICAgIGluaXRpYWxBc2lzdGVudGUsXG4gICAgbm9ybWFsaXplRGF0ZVRvSW5wdXQsXHJcbiAgICBtYXRjaE9wdGlvblZhbHVlLFxyXG4gICAgYXBwbHlEcmFmdFZhbHVlcyxcclxuICAgIGFwcGx5VGV4dEVkaXRvclZhbHVlcyxcclxuICAgIHNldFN0YXR1cyxcclxuICAgIHNldElzSHlkcmF0aW5nLFxyXG4gICAgc2V0VHJhbnNEYXRlLFxuICAgIHNldFZpc2l0VHlwZSxcbiAgICBzZXRDb250YWN0TWV0aG9kLFxuICAgIHNldEFzaXN0ZW50ZVRpcG8sXG4gICAgc2V0RGVzY3JpcHRpb24sXHJcbiAgICBzZXRDb21lbnRhcmlvcyxcclxuICAgIHNldEFudGVjZWRlbnRlcyxcclxuICAgIHNldENvbmNsdXNpb25lcyxcclxuICB9KTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IGVsID0gcmVhZE9ubHlTdXJmYWNlUmVmLmN1cnJlbnQ7XHJcbiAgICBpZiAoIWVsKSByZXR1cm47XHJcbiAgICBpZiAoIWlzRWRpdGluZykge1xyXG4gICAgICBlbC5jbGFzc0xpc3QuYWRkKFwiaW5kLXJlYWRvbmx5LXN1cmZhY2VcIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiaW5kLXJlYWRvbmx5LXN1cmZhY2VcIik7XHJcbiAgICB9XHJcbiAgfSwgW2lzRWRpdGluZ10pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKGlzRWRpdGluZykge1xyXG4gICAgICBpZiAoIWVkaXRTbmFwc2hvdFJlZi5jdXJyZW50KSB7XHJcbiAgICAgICAgZWRpdFNuYXBzaG90UmVmLmN1cnJlbnQgPSB7XG4gICAgICAgICAgdHJhbnNEYXRlLFxuICAgICAgICAgIHZpc2l0VHlwZSxcbiAgICAgICAgICBjb250YWN0TWV0aG9kLFxuICAgICAgICAgIGFzaXN0ZW50ZVRpcG8sXG4gICAgICAgICAgZGVzY3JpcHRpb24sXHJcbiAgICAgICAgICBjb21lbnRhcmlvcyxcclxuICAgICAgICAgIGFudGVjZWRlbnRlcyxcclxuICAgICAgICAgIGNvbmNsdXNpb25lc1xyXG4gICAgICAgIH07XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgZWRpdFNuYXBzaG90UmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gIH0sIFtpc0VkaXRpbmcsIHRyYW5zRGF0ZSwgdmlzaXRUeXBlLCBjb250YWN0TWV0aG9kLCBhc2lzdGVudGVUaXBvLCBkZXNjcmlwdGlvbiwgY29tZW50YXJpb3MsIGFudGVjZWRlbnRlcywgY29uY2x1c2lvbmVzXSk7XG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKGlzRWRpdGluZykgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIHJldHVybiBiaW5kUmVhZE9ubHlHdWFyZChyZWFkT25seVN1cmZhY2VSZWYuY3VycmVudCk7XHJcbiAgfSwgW2lzRWRpdGluZ10pO1xyXG5cclxuICBjb25zdCBoYW5kbGVFbmFibGVFZGl0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKCFjYW5FZGl0SGlzdG9yeSkge1xyXG4gICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHNldElzRWRpdGluZyh0cnVlKTtcclxuICAgIHN5bmNFZGl0TW9kZUZsYWcodHJ1ZSk7XHJcbiAgICBzZXRTdGF0dXMoaW5kVChcIlZpc2l0c19EZXRhaWxfRWRpdGluZ0VuYWJsZWRcIiwgXCJFZGl0aW5nIGVuYWJsZWRcIikpO1xyXG4gIH0sIFtjYW5FZGl0SGlzdG9yeSwgc3luY0VkaXRNb2RlRmxhZ10pO1xyXG5cclxuICBjb25zdCBoYW5kbGVDYW5jZWxFZGl0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKCFpc0VkaXRpbmcpIHJldHVybjtcclxuICAgIHNldElzRWRpdGluZyhmYWxzZSk7XHJcbiAgICBzeW5jRWRpdE1vZGVGbGFnKGZhbHNlKTtcclxuICAgIGNsZWFyRHJhZnQoKTtcclxuICAgIHNldFN0YXR1cyhpbmRUKFwiQ29tbW9uX0NhbmNlbFwiLCBcIkNhbmNlbFwiKSk7XHJcbiAgICB3aW5kb3cuX19pbmRCeXBhc3NOYXZpZ2F0aW9uR3VhcmRPbmNlPy4oKTtcclxuICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcclxuICB9LCBbaXNFZGl0aW5nLCBzeW5jRWRpdE1vZGVGbGFnLCBjbGVhckRyYWZ0XSk7XHJcblxyXG4gIGNvbnN0IHsgaGFuZGxlVXBkYXRlLCBoYW5kbGVEZWxldGUgfSA9IHVzZURldGFpbE11dGF0aW9ucyh7XHJcbiAgICBidXN5LFxyXG4gICAgaXNFZGl0aW5nLFxyXG4gICAgY2FuRWRpdEhpc3RvcnksXHJcbiAgICBjYW5EZWxldGVIaXN0b3J5LFxyXG4gICAgcmVjSWQsXHJcbiAgICBhY2NvdW50TnVtLFxyXG4gICAgdHJhbnNEYXRlLFxuICAgIHZpc2l0VHlwZSxcbiAgICBjb250YWN0TWV0aG9kLFxuICAgIGFzaXN0ZW50ZVRpcG8sXG4gICAgZGVzY3JpcHRpb24sXHJcbiAgICBjb21lbnRhcmlvcyxcclxuICAgIGFudGVjZWRlbnRlcyxcclxuICAgIGNvbmNsdXNpb25lcyxcbiAgICB2aXNpdFR5cGVzLFxuICAgIGNvbnRhY3RNZXRob2RzLFxuICAgIGFzaXN0ZW50ZVRpcG9zLFxuICAgIGRlZmF1bHRWaXNpdFR5cGUsXG4gICAgZGVmYXVsdENvbnRhY3RNZXRob2QsXG4gICAgcmF3SW5pdGlhbFZpc2l0VHlwZSxcbiAgICByYXdJbml0aWFsQ29udGFjdE1ldGhvZCxcbiAgICByYXdJbml0aWFsQXNpc3RlbnRlLFxuICAgIG1hdGNoT3B0aW9uVmFsdWUsXHJcbiAgICBjbGVhckRyYWZ0LFxyXG4gICAgc3luY0VkaXRNb2RlRmxhZyxcclxuICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICBzZXRCdXN5LFxyXG4gICAgc2V0U3RhdHVzLFxyXG4gICAgc2V0SXNFZGl0aW5nLFxyXG4gIH0pO1xyXG5cclxuICB1c2VEZXRhaWxUb3BiYXJBY3Rpb25zKHtcclxuICAgIGJ1c3ksXHJcbiAgICBtb2RhbE9wZW46IG1vZGFsLm9wZW4sXHJcbiAgICBpc0VkaXRpbmcsXHJcbiAgICBjYW5FZGl0SGlzdG9yeSxcclxuICAgIGNhbkRlbGV0ZUhpc3RvcnksXHJcbiAgICB0cmFuc0RhdGUsXHJcbiAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgaGFuZGxlRW5hYmxlRWRpdCxcclxuICAgIGhhbmRsZUNhbmNlbEVkaXQsXHJcbiAgICBoYW5kbGVVcGRhdGUsXHJcbiAgICBoYW5kbGVEZWxldGUsXHJcbiAgICBvcGVuQ29uZmlybSxcclxuICAgIGNsb3NlQ29uZmlybSxcclxuICB9KTtcclxuXHJcbiAgY29uc3QgZGVzY3JpcHRpb25MYWJlbCA9IGluZFQoXCJWaXNpdHNfRmllbGRfRGVzY3JpcHRpb25cIiwgXCJEZXNjcmlwdGlvblwiKTtcclxuICBjb25zdCBjb21tZW50c0xhYmVsID0gaW5kVChcIlZpc2l0c19GaWVsZF9Db21tZW50c1wiLCBcIkNvbW1lbnRzXCIpO1xyXG4gIGNvbnN0IGJhY2tncm91bmRMYWJlbCA9IGluZFQoXCJWaXNpdHNfRmllbGRfQmFja2dyb3VuZFwiLCBcIkJhY2tncm91bmRcIik7XHJcbiAgY29uc3QgY29uY2x1c2lvbnNMYWJlbCA9IGluZFQoXCJWaXNpdHNfRmllbGRfQ29uY2x1c2lvbnNcIiwgXCJDb25jbHVzaW9uc1wiKTtcclxuICBjb25zdCBkZXRhaWxEZXNjcmlwdGlvbkNsYXNzTmFtZSA9IGNsYXNzTmFtZXMoXHJcbiAgICBcImZvcm0tY29udHJvbFwiLFxyXG4gICAgaXNFZGl0aW5nID8gXCJib3JkZXItbmV1dHJhbC0yMDAgdGV4dC1uZXV0cmFsLTkwMFwiIDogXCJib3JkZXItbmV1dHJhbC0yMDAgaW5kLXJlYWRvbmx5LWZpZWxkXCJcbiAgKTtcclxuICBjb25zdCBkZXRhaWxSZWFkT25seUNsYXNzTmFtZSA9IGNsYXNzTmFtZXMoXCJmb3JtLWNvbnRyb2wgY3Vyc29yLXBvaW50ZXJcIiwgIWlzRWRpdGluZyA/IFwiaW5kLXJlYWRvbmx5LWZpZWxkXCIgOiBcIlwiKTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS00XCI+XHJcbiAgICAgIDxDb25maXJtTW9kYWxcclxuICAgICAgICBvcGVuPXttb2RhbC5vcGVufVxyXG4gICAgICAgIHRpdGxlPXttb2RhbC50aXRsZX1cclxuICAgICAgICBtZXNzYWdlPXttb2RhbC5tZXNzYWdlfVxyXG4gICAgICAgIGNvbmZpcm1UZXh0PXttb2RhbENvbmZpcm1UZXh0fVxyXG4gICAgICAgIGNhbmNlbFRleHQ9e21vZGFsQ2FuY2VsVGV4dH1cclxuICAgICAgICBsb2FkaW5nVGV4dD17bW9kYWxMb2FkaW5nVGV4dH1cclxuICAgICAgICBzaG93Q2FuY2VsPXttb2RhbC5zaG93Q2FuY2VsfVxyXG4gICAgICAgIHNob3dDb25maXJtPXttb2RhbC5zaG93Q29uZmlybX1cclxuICAgICAgICBidXN5PXtidXN5fVxyXG4gICAgICAgIGVycm9yPXttb2RhbEVycm9yfVxyXG4gICAgICAgIHN0YXR1cz17c3RhdHVzfVxyXG4gICAgICAgIG9uQ29uZmlybT17aGFuZGxlTW9kYWxCdXR0b25Db25maXJtfVxyXG4gICAgICAgIG9uQ2FuY2VsPXtjbG9zZUNvbmZpcm19XHJcbiAgICAgIC8+XHJcbiAgICAgIDxkaXZcclxuICAgICAgICByZWY9e3JlYWRPbmx5U3VyZmFjZVJlZn1cclxuICAgICAgICBjbGFzc05hbWU9XCJyZWxhdGl2ZSBzaGFkb3cteHMgZ2xhc3MtcGFuZWwgcC00IHNwYWNlLXktNCBib3JkZXIgYm9yZGVyLW5ldXRyYWwtMjAwIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldXCJcbiAgICAgID5cclxuICAgICAgICB7aXNIeWRyYXRpbmcgJiYgKFxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIHotMTAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgYmctd2hpdGUvNzAgcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV1cIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0ZXh0LXNtIHRleHQtbmV1dHJhbC02MDBcIj5cbiAgICAgICAgICAgICAgPFNwaW5uZXIgc2l6ZT1cInNpemUtNVwiIC8+XG4gICAgICAgICAgICAgIDxzcGFuPntpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfTwvc3Bhbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApfVxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0zIGdhcC00IHB0LTFcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInZpc2l0YS1maWVsZC10ZXh0XCI+XHJcbiAgICAgICAgICAgIDxTaW5nbGVEYXRlUGlja2VyXHJcbiAgICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJWaXNpdHNfRGV0YWlsX0RhdGVfTGFiZWxcIiwgXCJEYXRlXCIpfVxyXG4gICAgICAgICAgICAgIHZhbHVlPXt0cmFuc0RhdGV9XHJcbiAgICAgICAgICAgICAgb25DaGFuZ2U9e3NldFRyYW5zRGF0ZX1cclxuICAgICAgICAgICAgICBkaXNhYmxlZD17IWlzRWRpdGluZ31cclxuICAgICAgICAgICAgICByZWFkT25seT17IWlzRWRpdGluZ31cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPFNlbGVjdENvbWJvYm94XHJcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiVmlzaXRzX0RldGFpbF9WaXNpdFR5cGVfTGFiZWxcIiwgXCJWaXNpdCB0eXBlXCIpfVxyXG4gICAgICAgICAgICBvcHRpb25zPXt2aXNpdFR5cGVzfVxyXG4gICAgICAgICAgICB2YWx1ZT17dmlzaXRUeXBlfVxyXG4gICAgICAgICAgICBvbkNoYW5nZT17c2V0VmlzaXRUeXBlfVxyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIlZpc2l0c19EZXRhaWxfVmlzaXRUeXBlX1BsYWNlaG9sZGVyXCIsIFwiU2VsZWN0IHR5cGVcIil9XHJcbiAgICAgICAgICAgIGRpc2FibGVkPXshaXNFZGl0aW5nfVxyXG4gICAgICAgICAgICByZWFkT25seT17IWlzRWRpdGluZ31cbiAgICAgICAgICAgIHVzZVBvcnRhbD17ZmFsc2V9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8U2VsZWN0Q29tYm9ib3hcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiVmlzaXRzX0RldGFpbF9Db250YWN0TWV0aG9kX0xhYmVsXCIsIFwiQ29udGFjdCBtZXRob2RcIil9XG4gICAgICAgICAgICBvcHRpb25zPXtjb250YWN0TWV0aG9kc31cbiAgICAgICAgICAgIHZhbHVlPXtjb250YWN0TWV0aG9kfVxuICAgICAgICAgICAgb25DaGFuZ2U9e3NldENvbnRhY3RNZXRob2R9XG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIlZpc2l0c19EZXRhaWxfQ29udGFjdE1ldGhvZF9QbGFjZWhvbGRlclwiLCBcIlNlbGVjdCBtZXRob2RcIil9XG4gICAgICAgICAgICBkaXNhYmxlZD17IWlzRWRpdGluZ31cbiAgICAgICAgICAgIHJlYWRPbmx5PXshaXNFZGl0aW5nfVxuICAgICAgICAgICAgdXNlUG9ydGFsPXtmYWxzZX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cblxyXG4gICAgICAgIDxWaXNpdE5hcnJhdGl2ZUZpZWxkc1xyXG4gICAgICAgICAgZGVzY3JpcHRpb25MYWJlbD17ZGVzY3JpcHRpb25MYWJlbH1cclxuICAgICAgICAgIGRlc2NyaXB0aW9uVmFsdWU9e2Rlc2NyaXB0aW9ufVxyXG4gICAgICAgICAgZGVzY3JpcHRpb25DbGFzc05hbWU9e2RldGFpbERlc2NyaXB0aW9uQ2xhc3NOYW1lfVxyXG4gICAgICAgICAgZGVzY3JpcHRpb25EaXNhYmxlZD17IWlzRWRpdGluZ31cclxuICAgICAgICAgIG9uRGVzY3JpcHRpb25DaGFuZ2U9e3NldERlc2NyaXB0aW9ufVxyXG4gICAgICAgICAgdGFwRmllbGRzPXtbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBpZDogXCJjb21lbnRhcmlvc1wiLFxyXG4gICAgICAgICAgICAgIGxhYmVsOiBjb21tZW50c0xhYmVsLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiBjb21lbnRhcmlvcyxcclxuICAgICAgICAgICAgICBjbGFzc05hbWU6IGRldGFpbFJlYWRPbmx5Q2xhc3NOYW1lLFxyXG4gICAgICAgICAgICAgIHBvaW50ZXJCaW5kaW5nczogY29tZW50YXJpb3NUYXAsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBpZDogXCJhbnRlY2VkZW50ZXNcIixcclxuICAgICAgICAgICAgICBsYWJlbDogYmFja2dyb3VuZExhYmVsLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiBhbnRlY2VkZW50ZXMsXHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lOiBkZXRhaWxSZWFkT25seUNsYXNzTmFtZSxcclxuICAgICAgICAgICAgICBwb2ludGVyQmluZGluZ3M6IGFudGVjZWRlbnRlc1RhcCxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIGlkOiBcImNvbmNsdXNpb25lc1wiLFxyXG4gICAgICAgICAgICAgIGxhYmVsOiBjb25jbHVzaW9uc0xhYmVsLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiBjb25jbHVzaW9uZXMsXHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lOiBkZXRhaWxSZWFkT25seUNsYXNzTmFtZSxcclxuICAgICAgICAgICAgICBwb2ludGVyQmluZGluZ3M6IGNvbmNsdXNpb25lc1RhcCxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIF19XHJcbiAgICAgICAgLz5cclxuXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMyB0ZXh0LXNtIHRleHQtbmV1dHJhbC02MDBcIj5cbiAgICAgICAgICA8c3Bhbj57c3RhdHVzfTwvc3Bhbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuLy8gRGV0YWlsIFVJIHdyYXBwZWQgYnkgdGhlIGVycm9yIGJvdW5kYXJ5LlxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBEZXRhaWxGb3JtKCkge1xyXG4gIHJldHVybiAoXHJcbiAgICA8QXBwRXJyb3JCb3VuZGFyeSBmYWxsYmFja01lc3NhZ2U9e2luZFQoXCJWaXNpdHNfRGV0YWlsX0Vycm9yQm91bmRhcnlcIiwgXCJBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSByZW5kZXJpbmcgdGhlIGRldGFpbCBwYWdlLiBSZWxvYWQgYW5kIHRyeSBhZ2Fpbi5cIil9PlxyXG4gICAgICA8RGV0YWlsQXBwIC8+XHJcbiAgICA8L0FwcEVycm9yQm91bmRhcnk+XHJcbiAgKTtcclxufVxyXG4iLCAiZXhwb3J0IGNvbnN0IGJpbmRSZWFkT25seUd1YXJkID0gKGVsOiBIVE1MRWxlbWVudCB8IG51bGwpID0+IHtcclxuICBpZiAoIWVsKSByZXR1cm4gKCkgPT4ge307XHJcbiAgY29uc3QgY2FuY2VsID0gKGV2ZW50OiBFdmVudCkgPT4gZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICBjb25zdCBldmVudHMgPSBbXCJjb250ZXh0bWVudVwiLCBcInNlbGVjdHN0YXJ0XCIsIFwiY29weVwiLCBcImN1dFwiLCBcInBhc3RlXCJdO1xyXG4gIGV2ZW50cy5mb3JFYWNoKChldnQpID0+IGVsLmFkZEV2ZW50TGlzdGVuZXIoZXZ0LCBjYW5jZWwpKTtcclxuICByZXR1cm4gKCkgPT4ge1xyXG4gICAgZXZlbnRzLmZvckVhY2goKGV2dCkgPT4gZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihldnQsIGNhbmNlbCkpO1xyXG4gIH07XHJcbn07XHJcbiIsICJleHBvcnQgY29uc3QgaGFzVmFsdWUgPSAodmFsdWU6IHVua25vd24pID0+IFN0cmluZyh2YWx1ZSB8fCBcIlwiKS50cmltKCkubGVuZ3RoID4gMDtcclxuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgZmV0Y2hKc29uIH0gZnJvbSBcIi4uL3NlcnZpY2VzL2FwaVNlcnZpY2UudHNcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi91dGlscy9pbmRJMThuLnRzXCI7XHJcblxyXG50eXBlIE9wdGlvbkxpa2UgPSB7XHJcbiAgdmFsdWU/OiBzdHJpbmcgfCBudW1iZXI7XHJcbiAgVmFsdWU/OiBzdHJpbmcgfCBudW1iZXI7XHJcbiAgdGV4dD86IHN0cmluZztcclxuICBUZXh0Pzogc3RyaW5nO1xyXG59O1xyXG5cclxudHlwZSBBY3Rpdml0eURldGFpbFJlY29yZCA9IFJlY29yZDxzdHJpbmcsIHVua25vd24+O1xyXG5cclxudHlwZSBBY3Rpdml0eURldGFpbFJlc3BvbnNlID0ge1xyXG4gIHN1Y2Nlc3M/OiBib29sZWFuO1xyXG4gIG1lc3NhZ2U/OiBzdHJpbmc7XHJcbiAgZGF0YT86IEFjdGl2aXR5RGV0YWlsUmVjb3JkIHwgbnVsbDtcclxuICBTdWNjZXNzPzogYm9vbGVhbjtcclxuICBNZXNzYWdlPzogc3RyaW5nO1xyXG4gIERhdGE/OiBBY3Rpdml0eURldGFpbFJlY29yZCB8IG51bGw7XHJcbn07XHJcblxyXG5jb25zdCBpc1Jlc3BvbnNlU3VjY2VzcyA9IChyZXNwb25zZTogQWN0aXZpdHlEZXRhaWxSZXNwb25zZSk6IGJvb2xlYW4gPT4ge1xyXG4gIHJldHVybiByZXNwb25zZS5zdWNjZXNzID09PSB0cnVlIHx8IHJlc3BvbnNlLlN1Y2Nlc3MgPT09IHRydWU7XHJcbn07XHJcblxyXG5jb25zdCBnZXRSZXNwb25zZU1lc3NhZ2UgPSAocmVzcG9uc2U6IEFjdGl2aXR5RGV0YWlsUmVzcG9uc2UpOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IHJhdyA9IHJlc3BvbnNlLm1lc3NhZ2UgPz8gcmVzcG9uc2UuTWVzc2FnZTtcclxuICByZXR1cm4gdHlwZW9mIHJhdyA9PT0gXCJzdHJpbmdcIiA/IHJhdy50cmltKCkgOiBcIlwiO1xyXG59O1xyXG5cclxuY29uc3QgZ2V0UmVzcG9uc2VEYXRhID0gKHJlc3BvbnNlOiBBY3Rpdml0eURldGFpbFJlc3BvbnNlKTogQWN0aXZpdHlEZXRhaWxSZWNvcmQgfCBudWxsID0+IHtcclxuICBjb25zdCBkYXRhID0gcmVzcG9uc2UuZGF0YSA/PyByZXNwb25zZS5EYXRhO1xyXG4gIHJldHVybiBkYXRhICYmIHR5cGVvZiBkYXRhID09PSBcIm9iamVjdFwiID8gZGF0YSA6IG51bGw7XHJcbn07XHJcblxyXG5jb25zdCBhc1JlY29yZCA9ICh2YWx1ZTogdW5rbm93bik6IFJlY29yZDxzdHJpbmcsIHVua25vd24+IHwgbnVsbCA9PiB7XHJcbiAgaWYgKCF2YWx1ZSB8fCB0eXBlb2YgdmFsdWUgIT09IFwib2JqZWN0XCIgfHwgQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHJldHVybiBudWxsO1xyXG4gIHJldHVybiB2YWx1ZSBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPjtcclxufTtcclxuXHJcbnR5cGUgVXNlRGV0YWlsSHlkcmF0aW9uQXJncyA9IHtcclxuICBhY3RpdmlkYWRJZDogc3RyaW5nO1xyXG4gIHNob3VsZEh5ZHJhdGU6IGJvb2xlYW47XHJcbiAgdmlzaXRUeXBlczogT3B0aW9uTGlrZVtdO1xuICBjb250YWN0TWV0aG9kczogT3B0aW9uTGlrZVtdO1xuICBhc2lzdGVudGVUaXBvczogT3B0aW9uTGlrZVtdO1xuICBkZWZhdWx0VmlzaXRUeXBlOiBzdHJpbmc7XG4gIGRlZmF1bHRDb250YWN0TWV0aG9kOiBzdHJpbmc7XG4gIGluaXRpYWxBc2lzdGVudGU6IHN0cmluZztcbiAgbm9ybWFsaXplRGF0ZVRvSW5wdXQ6ICh2YWx1ZTogc3RyaW5nKSA9PiBzdHJpbmc7XHJcbiAgbWF0Y2hPcHRpb25WYWx1ZTogKG9wdGlvbnM6IE9wdGlvbkxpa2VbXSwgcmF3OiB1bmtub3duKSA9PiBzdHJpbmc7XHJcbiAgYXBwbHlEcmFmdFZhbHVlczogKCkgPT4gdm9pZDtcclxuICBhcHBseVRleHRFZGl0b3JWYWx1ZXM6ICgpID0+IHZvaWQ7XHJcbiAgc2V0U3RhdHVzOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBzZXRJc0h5ZHJhdGluZzogKHZhbHVlOiBib29sZWFuKSA9PiB2b2lkO1xyXG4gIHNldFRyYW5zRGF0ZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHNldFZpc2l0VHlwZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHNldENvbnRhY3RNZXRob2Q6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBzZXRBc2lzdGVudGVUaXBvOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgc2V0RGVzY3JpcHRpb246ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIHNldENvbWVudGFyaW9zOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBzZXRBbnRlY2VkZW50ZXM6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIHNldENvbmNsdXNpb25lczogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbn07XHJcblxyXG4vLyBLZWVwcyBkZXRhaWwgaHlkcmF0aW9uIG9yY2hlc3RyYXRpb24gb3V0c2lkZSB0aGUgcGFnZSBjb21wb25lbnQuXHJcbmV4cG9ydCBjb25zdCB1c2VEZXRhaWxIeWRyYXRpb24gPSAoe1xyXG4gIGFjdGl2aWRhZElkLFxyXG4gIHNob3VsZEh5ZHJhdGUsXHJcbiAgdmlzaXRUeXBlcyxcbiAgY29udGFjdE1ldGhvZHMsXG4gIGFzaXN0ZW50ZVRpcG9zLFxuICBkZWZhdWx0VmlzaXRUeXBlLFxuICBkZWZhdWx0Q29udGFjdE1ldGhvZCxcbiAgaW5pdGlhbEFzaXN0ZW50ZSxcbiAgbm9ybWFsaXplRGF0ZVRvSW5wdXQsXHJcbiAgbWF0Y2hPcHRpb25WYWx1ZSxcclxuICBhcHBseURyYWZ0VmFsdWVzLFxyXG4gIGFwcGx5VGV4dEVkaXRvclZhbHVlcyxcclxuICBzZXRTdGF0dXMsXHJcbiAgc2V0SXNIeWRyYXRpbmcsXHJcbiAgc2V0VHJhbnNEYXRlLFxuICBzZXRWaXNpdFR5cGUsXG4gIHNldENvbnRhY3RNZXRob2QsXG4gIHNldEFzaXN0ZW50ZVRpcG8sXG4gIHNldERlc2NyaXB0aW9uLFxyXG4gIHNldENvbWVudGFyaW9zLFxyXG4gIHNldEFudGVjZWRlbnRlcyxcclxuICBzZXRDb25jbHVzaW9uZXMsXHJcbn06IFVzZURldGFpbEh5ZHJhdGlvbkFyZ3MpID0+IHtcclxuICBjb25zdCBoeWRyYXRlRnJvbUFwaSA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcclxuICAgIGlmICghYWN0aXZpZGFkSWQpIHJldHVybjtcclxuICAgIHNldElzSHlkcmF0aW5nKHRydWUpO1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2hKc29uPEFjdGl2aXR5RGV0YWlsUmVzcG9uc2U+KGAvVmlzaXRhcy9HZXRBY3Rpdml0eUJ5Q29kZT9jb2RlPSR7ZW5jb2RlVVJJQ29tcG9uZW50KGFjdGl2aWRhZElkKX1gKTtcclxuICAgICAgY29uc3QgcmVzcG9uc2VEYXRhID0gZ2V0UmVzcG9uc2VEYXRhKHJlcyk7XHJcblxyXG4gICAgICBpZiAoIWlzUmVzcG9uc2VTdWNjZXNzKHJlcykgfHwgIXJlc3BvbnNlRGF0YSkge1xyXG4gICAgICAgIHNldFN0YXR1cyhnZXRSZXNwb25zZU1lc3NhZ2UocmVzKSB8fCBpbmRUKFwiVmlzaXRzX0RldGFpbF9Mb2FkQWN0aXZpdHlGYWlsZWRcIiwgXCJGYWlsZWQgdG8gbG9hZCBhY3Rpdml0eSBkZXRhaWxzLlwiKSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCByYXdEYXRlID0gU3RyaW5nKHJlc3BvbnNlRGF0YS50cmFuc0RhdGUgPz8gcmVzcG9uc2VEYXRhLlRyYW5zRGF0ZSA/PyBcIlwiKTtcclxuICAgICAgc2V0VHJhbnNEYXRlKG5vcm1hbGl6ZURhdGVUb0lucHV0KHJhd0RhdGUpKTtcclxuXHJcbiAgICAgIGNvbnN0IHJhd1Zpc2l0VHlwZSA9IFN0cmluZyhcclxuICAgICAgICByZXNwb25zZURhdGEudGlwb1Zpc2l0YSA/PyByZXNwb25zZURhdGEuVGlwb1Zpc2l0YSA/PyByZXNwb25zZURhdGEudmlzaXRUeXBlID8/IHJlc3BvbnNlRGF0YS5WaXNpdFR5cGUgPz8gXCJcIlxyXG4gICAgICApO1xyXG4gICAgICBzZXRWaXNpdFR5cGUobWF0Y2hPcHRpb25WYWx1ZSh2aXNpdFR5cGVzLCByYXdWaXNpdFR5cGUpIHx8IGRlZmF1bHRWaXNpdFR5cGUpO1xuXG4gICAgICBjb25zdCByYXdDb250YWN0TWV0aG9kID0gU3RyaW5nKFxuICAgICAgICByZXNwb25zZURhdGEuY29udGFjdE1ldGhvZCA/PyByZXNwb25zZURhdGEuQ29udGFjdE1ldGhvZCA/PyBcIlwiXG4gICAgICApO1xuICAgICAgc2V0Q29udGFjdE1ldGhvZChtYXRjaE9wdGlvblZhbHVlKGNvbnRhY3RNZXRob2RzLCByYXdDb250YWN0TWV0aG9kKSB8fCBkZWZhdWx0Q29udGFjdE1ldGhvZCk7XG5cbiAgICAgIGNvbnN0IGFzaXN0ZW50ZXNMaXN0ID0gcmVzcG9uc2VEYXRhLmFzaXN0ZW50ZXMgPz8gcmVzcG9uc2VEYXRhLkFzaXN0ZW50ZXM7XG4gICAgICBjb25zdCBmaXJzdEFzaXN0ZW50ZSA9IEFycmF5LmlzQXJyYXkoYXNpc3RlbnRlc0xpc3QpICYmIGFzaXN0ZW50ZXNMaXN0Lmxlbmd0aCA/IGFzUmVjb3JkKGFzaXN0ZW50ZXNMaXN0WzBdKSA6IG51bGw7XHJcbiAgICAgIGNvbnN0IHJhd0FzaXN0ZW50ZVRpcG8gPSBTdHJpbmcoXHJcbiAgICAgICAgcmVzcG9uc2VEYXRhLmFzaXN0ZW50ZVRpcG8gPz9cclxuICAgICAgICAgIHJlc3BvbnNlRGF0YS5Bc2lzdGVudGVUaXBvID8/XHJcbiAgICAgICAgICBmaXJzdEFzaXN0ZW50ZT8uYXNpc3RlbnRlVGlwbyA/P1xyXG4gICAgICAgICAgZmlyc3RBc2lzdGVudGU/LkFzaXN0ZW50ZVRpcG8gPz9cclxuICAgICAgICAgIFwiXCJcclxuICAgICAgKTtcclxuICAgICAgY29uc3Qgbm9ybWFsaXplZEFzaXN0ZW50ZVRpcG8gPSBtYXRjaE9wdGlvblZhbHVlKGFzaXN0ZW50ZVRpcG9zLCByYXdBc2lzdGVudGVUaXBvKTtcclxuICAgICAgc2V0QXNpc3RlbnRlVGlwbyhub3JtYWxpemVkQXNpc3RlbnRlVGlwbyB8fCBpbml0aWFsQXNpc3RlbnRlKTtcclxuICAgICAgc2V0RGVzY3JpcHRpb24oU3RyaW5nKHJlc3BvbnNlRGF0YS5kZXNjcmlwdGlvbiA/PyByZXNwb25zZURhdGEuRGVzY3JpcHRpb24gPz8gXCJcIikpO1xyXG4gICAgICBzZXRDb21lbnRhcmlvcyhTdHJpbmcocmVzcG9uc2VEYXRhLmNvbWVudGFyaW9zID8/IHJlc3BvbnNlRGF0YS5Db21lbnRhcmlvcyA/PyBcIlwiKSk7XHJcbiAgICAgIHNldEFudGVjZWRlbnRlcyhTdHJpbmcocmVzcG9uc2VEYXRhLmFudGVjZWRlbnRlcyA/PyByZXNwb25zZURhdGEuQW50ZWNlZGVudGVzID8/IFwiXCIpKTtcclxuICAgICAgc2V0Q29uY2x1c2lvbmVzKFN0cmluZyhyZXNwb25zZURhdGEuY29uY2x1c2lvbmVzID8/IHJlc3BvbnNlRGF0YS5Db25jbHVzaW9uZXMgPz8gXCJcIikpO1xyXG4gICAgfSBjYXRjaCB7XHJcbiAgICAgIC8vIEtlZXAgcHJldmlvdXMgVUkgYmVoYXZpb3Igb24gaHlkcmF0aW9uIGVycm9ycy5cclxuICAgIH0gZmluYWxseSB7XHJcbiAgICAgIHNldElzSHlkcmF0aW5nKGZhbHNlKTtcclxuICAgICAgYXBwbHlEcmFmdFZhbHVlcygpO1xyXG4gICAgICBhcHBseVRleHRFZGl0b3JWYWx1ZXMoKTtcclxuICAgIH1cclxuICB9LCBbXHJcbiAgICBhY3RpdmlkYWRJZCxcclxuICAgIGFwcGx5RHJhZnRWYWx1ZXMsXG4gICAgYXBwbHlUZXh0RWRpdG9yVmFsdWVzLFxuICAgIGFzaXN0ZW50ZVRpcG9zLFxuICAgIGNvbnRhY3RNZXRob2RzLFxuICAgIGRlZmF1bHRDb250YWN0TWV0aG9kLFxuICAgIGRlZmF1bHRWaXNpdFR5cGUsXG4gICAgaW5pdGlhbEFzaXN0ZW50ZSxcclxuICAgIG1hdGNoT3B0aW9uVmFsdWUsXHJcbiAgICBub3JtYWxpemVEYXRlVG9JbnB1dCxcclxuICAgIHNldEFudGVjZWRlbnRlcyxcclxuICAgIHNldEFzaXN0ZW50ZVRpcG8sXHJcbiAgICBzZXRDb21lbnRhcmlvcyxcclxuICAgIHNldENvbmNsdXNpb25lcyxcclxuICAgIHNldERlc2NyaXB0aW9uLFxyXG4gICAgc2V0SXNIeWRyYXRpbmcsXHJcbiAgICBzZXRTdGF0dXMsXHJcbiAgICBzZXRUcmFuc0RhdGUsXG4gICAgc2V0VmlzaXRUeXBlLFxuICAgIHNldENvbnRhY3RNZXRob2QsXG4gICAgdmlzaXRUeXBlcyxcbiAgXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoc2hvdWxkSHlkcmF0ZSkge1xyXG4gICAgICBoeWRyYXRlRnJvbUFwaSgpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBhcHBseURyYWZ0VmFsdWVzKCk7XHJcbiAgICBhcHBseVRleHRFZGl0b3JWYWx1ZXMoKTtcclxuICB9LCBbYXBwbHlEcmFmdFZhbHVlcywgYXBwbHlUZXh0RWRpdG9yVmFsdWVzLCBoeWRyYXRlRnJvbUFwaSwgc2hvdWxkSHlkcmF0ZV0pO1xyXG59O1xyXG4iLCAiaW1wb3J0IHsgdXNlRWZmZWN0IH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IHdhaXQgfSBmcm9tIFwiLi4vdXRpbHMvd2FpdC50c1wiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHsgc2hvd1Blcm1pc3Npb25Nb2RhbCB9IGZyb20gXCIuLi91dGlscy9wZXJtaXNzaW9ucy50c1wiO1xyXG5pbXBvcnQgeyBzZXRIaXN0b3J5RmlsdGVyRm9yRGF0ZSwgZmxhc2hBY3Rpb25NYXJrIH0gZnJvbSBcIi4uL3V0aWxzL3Zpc2l0YXNIaXN0b3J5LnRzXCI7XHJcbmltcG9ydCB7IHNldFRvcGJhckFjdGlvbkdyb3VwUmVhZHkgfSBmcm9tIFwiLi4vdXRpbHMvdG9wYmFyQWN0aW9uVmlzaWJpbGl0eS50c1wiO1xyXG5cclxudHlwZSBVc2VEZXRhaWxUb3BiYXJBY3Rpb25zQXJncyA9IHtcclxuICBidXN5OiBib29sZWFuO1xyXG4gIG1vZGFsT3BlbjogYm9vbGVhbjtcclxuICBpc0VkaXRpbmc6IGJvb2xlYW47XHJcbiAgY2FuRWRpdEhpc3Rvcnk6IGJvb2xlYW47XHJcbiAgY2FuRGVsZXRlSGlzdG9yeTogYm9vbGVhbjtcclxuICB0cmFuc0RhdGU6IHN0cmluZztcclxuICBzZXRNb2RhbEVycm9yOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBoYW5kbGVFbmFibGVFZGl0OiAoKSA9PiB2b2lkO1xyXG4gIGhhbmRsZUNhbmNlbEVkaXQ6ICgpID0+IHZvaWQ7XHJcbiAgaGFuZGxlVXBkYXRlOiAoKSA9PiBQcm9taXNlPGJvb2xlYW4+O1xyXG4gIGhhbmRsZURlbGV0ZTogKCkgPT4gUHJvbWlzZTxib29sZWFuPjtcclxuICBhY3Rpb25Hcm91cElkPzogc3RyaW5nO1xyXG4gIHBlcm1pc3Npb25zUmVhZHk/OiBib29sZWFuO1xyXG4gIG9wZW5Db25maXJtOiAob3B0czoge1xyXG4gICAgdGl0bGU6IHN0cmluZztcclxuICAgIG1lc3NhZ2U6IHN0cmluZztcclxuICAgIGNvbmZpcm1UZXh0Pzogc3RyaW5nO1xyXG4gICAgb25Db25maXJtPzogKCkgPT4gUHJvbWlzZTxib29sZWFuIHwgdm9pZD4gfCBib29sZWFuIHwgdm9pZDtcclxuICB9KSA9PiB2b2lkO1xyXG4gIGNsb3NlQ29uZmlybTogKCkgPT4gdm9pZDtcclxufTtcclxuXHJcbi8vIENvb3JkaW5hdGVzIHRvcGJhciBpY29uIHZpc2liaWxpdHkgYW5kIGFjdGlvbiBldmVudHMgZm9yIGRldGFpbCBwYWdlLlxyXG5leHBvcnQgY29uc3QgdXNlRGV0YWlsVG9wYmFyQWN0aW9ucyA9ICh7XHJcbiAgYnVzeSxcclxuICBtb2RhbE9wZW4sXHJcbiAgaXNFZGl0aW5nLFxyXG4gIGNhbkVkaXRIaXN0b3J5LFxyXG4gIGNhbkRlbGV0ZUhpc3RvcnksXHJcbiAgdHJhbnNEYXRlLFxyXG4gIHNldE1vZGFsRXJyb3IsXHJcbiAgaGFuZGxlRW5hYmxlRWRpdCxcclxuICBoYW5kbGVDYW5jZWxFZGl0LFxyXG4gIGhhbmRsZVVwZGF0ZSxcclxuICBoYW5kbGVEZWxldGUsXHJcbiAgYWN0aW9uR3JvdXBJZCA9IFwidmlzaXQtZGV0YWlsLWFjdGlvbnNcIixcclxuICBwZXJtaXNzaW9uc1JlYWR5ID0gdHJ1ZSxcclxuICBvcGVuQ29uZmlybSxcclxuICBjbG9zZUNvbmZpcm0sXHJcbn06IFVzZURldGFpbFRvcGJhckFjdGlvbnNBcmdzKSA9PiB7XHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghcGVybWlzc2lvbnNSZWFkeSkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IGVkaXRJY29uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2aXNpdEVkaXRJY29uXCIpO1xyXG4gICAgY29uc3Qgc2F2ZUljb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpc2l0U2F2ZUljb25cIik7XHJcbiAgICBjb25zdCBkZWxldGVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpc2l0RGVsZXRlQnRuXCIpO1xyXG4gICAgY29uc3QgY2FuY2VsQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2aXNpdENhbmNlbEJ0blwiKTtcclxuICAgIGNvbnN0IGVkaXRCdG4gPSBlZGl0SWNvbj8uY2xvc2VzdChcImJ1dHRvblwiKSA/PyBudWxsO1xyXG4gICAgaWYgKGlzRWRpdGluZykge1xyXG4gICAgICBpZiAoZWRpdEJ0bikgZWRpdEJ0bi5jbGFzc0xpc3QucmVtb3ZlKFwidG9wYmFyLWhpZGRlblwiKTtcclxuICAgICAgaWYgKGVkaXRJY29uKSBlZGl0SWNvbi5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xyXG4gICAgICBpZiAoc2F2ZUljb24pIHNhdmVJY29uLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XHJcbiAgICAgIGlmIChkZWxldGVCdG4pIGRlbGV0ZUJ0bi5jbGFzc0xpc3QuYWRkKFwidG9wYmFyLWhpZGRlblwiKTtcclxuICAgICAgaWYgKGNhbmNlbEJ0bikgY2FuY2VsQnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJ0b3BiYXItaGlkZGVuXCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKGVkaXRCdG4pIGVkaXRCdG4uY2xhc3NMaXN0LnJlbW92ZShcInRvcGJhci1oaWRkZW5cIik7XHJcbiAgICAgIGlmIChlZGl0SWNvbikgZWRpdEljb24uY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcclxuICAgICAgaWYgKHNhdmVJY29uKSBzYXZlSWNvbi5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xyXG4gICAgICBpZiAoZGVsZXRlQnRuKSBkZWxldGVCdG4uY2xhc3NMaXN0LnJlbW92ZShcInRvcGJhci1oaWRkZW5cIik7XHJcbiAgICAgIGlmIChjYW5jZWxCdG4pIGNhbmNlbEJ0bi5jbGFzc0xpc3QuYWRkKFwidG9wYmFyLWhpZGRlblwiKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRUb3BiYXJBY3Rpb25Hcm91cFJlYWR5KGFjdGlvbkdyb3VwSWQpO1xyXG4gIH0sIFthY3Rpb25Hcm91cElkLCBpc0VkaXRpbmcsIHBlcm1pc3Npb25zUmVhZHldKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghcGVybWlzc2lvbnNSZWFkeSkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IG9uRWRpdCA9ICgpID0+IHtcclxuICAgICAgaWYgKCFjYW5FZGl0SGlzdG9yeSkge1xyXG4gICAgICAgIHNob3dQZXJtaXNzaW9uTW9kYWwoKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGlzRWRpdGluZykge1xyXG4gICAgICAgIGlmIChidXN5IHx8IG1vZGFsT3BlbikgcmV0dXJuO1xyXG4gICAgICAgIHNldE1vZGFsRXJyb3IoXCJcIik7XHJcbiAgICAgICAgb3BlbkNvbmZpcm0oe1xyXG4gICAgICAgICAgdGl0bGU6IGluZFQoXCJWaXNpdHNfRGV0YWlsX1NhdmVDaGFuZ2VzX1RpdGxlXCIsIFwiVmlzaXRzX0RldGFpbF9TYXZlQ2hhbmdlc19UaXRsZVwiKSxcclxuICAgICAgICAgIG1lc3NhZ2U6IGluZFQoXCJWaXNpdHNfRGV0YWlsX1NhdmVDaGFuZ2VzX0JvZHlcIiwgXCJWaXNpdHNfRGV0YWlsX1NhdmVDaGFuZ2VzX0JvZHlcIiksXHJcbiAgICAgICAgICBjb25maXJtVGV4dDogaW5kVChcIkNvbW1vbl9TYXZlXCIsIFwiQ29tbW9uX1NhdmVcIiksXHJcbiAgICAgICAgICBvbkNvbmZpcm06IGFzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgb2sgPSBhd2FpdCBoYW5kbGVVcGRhdGUoKTtcclxuICAgICAgICAgICAgaWYgKG9rKSB7XHJcbiAgICAgICAgICAgICAgY2xvc2VDb25maXJtKCk7XHJcbiAgICAgICAgICAgICAgc2V0SGlzdG9yeUZpbHRlckZvckRhdGUodHJhbnNEYXRlKTtcclxuICAgICAgICAgICAgICBhd2FpdCB3YWl0KDIwMCk7XHJcbiAgICAgICAgICAgICAgZmxhc2hBY3Rpb25NYXJrKFwib2tQcm9jZXNzXCIsIDEyMDApO1xyXG4gICAgICAgICAgICAgIGF3YWl0IHdhaXQoMTIwMCk7XHJcbiAgICAgICAgICAgICAgd2luZG93Ll9faW5kQnlwYXNzTmF2aWdhdGlvbkd1YXJkT25jZT8uKCk7XHJcbiAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9IaXN0b3JpYWwvSGlzdG9yeVwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBvaztcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaGFuZGxlRW5hYmxlRWRpdCgpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IG9uRGVsZXRlID0gKCkgPT4ge1xyXG4gICAgICBpZiAoIWNhbkRlbGV0ZUhpc3RvcnkpIHtcclxuICAgICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChidXN5IHx8IG1vZGFsT3BlbikgcmV0dXJuO1xyXG4gICAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xyXG4gICAgICBvcGVuQ29uZmlybSh7XHJcbiAgICAgICAgdGl0bGU6IGluZFQoXCJWaXNpdHNfRGV0YWlsX0RlbGV0ZUFjdGl2aXR5X1RpdGxlXCIsIFwiVmlzaXRzX0RldGFpbF9EZWxldGVBY3Rpdml0eV9UaXRsZVwiKSxcclxuICAgICAgICBtZXNzYWdlOiBpbmRUKFwiVmlzaXRzX0RldGFpbF9EZWxldGVBY3Rpdml0eV9Cb2R5XCIsIFwiVmlzaXRzX0RldGFpbF9EZWxldGVBY3Rpdml0eV9Cb2R5XCIpLFxyXG4gICAgICAgIGNvbmZpcm1UZXh0OiBpbmRUKFwiQ29tbW9uX0RlbGV0ZVwiLCBcIkNvbW1vbl9EZWxldGVcIiksXHJcbiAgICAgICAgb25Db25maXJtOiBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBvayA9IGF3YWl0IGhhbmRsZURlbGV0ZSgpO1xyXG4gICAgICAgICAgaWYgKG9rKSB7XHJcbiAgICAgICAgICAgIGNsb3NlQ29uZmlybSgpO1xyXG4gICAgICAgICAgICBzZXRIaXN0b3J5RmlsdGVyRm9yRGF0ZSh0cmFuc0RhdGUpO1xyXG4gICAgICAgICAgICBhd2FpdCB3YWl0KDIwMCk7XHJcbiAgICAgICAgICAgIGZsYXNoQWN0aW9uTWFyayhcIm9rRGVsUHJvY2Vzc1wiLCAxMjAwKTtcclxuICAgICAgICAgICAgYXdhaXQgd2FpdCgxMjAwKTtcclxuICAgICAgICAgICAgd2luZG93Ll9faW5kQnlwYXNzTmF2aWdhdGlvbkd1YXJkT25jZT8uKCk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvSGlzdG9yaWFsL0hpc3RvcnlcIjtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBvaztcclxuICAgICAgICB9LFxyXG4gICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3Qgb25DYW5jZWxFZGl0ID0gKCkgPT4ge1xyXG4gICAgICBpZiAoYnVzeSB8fCBtb2RhbE9wZW4pIHJldHVybjtcclxuICAgICAgaGFuZGxlQ2FuY2VsRWRpdCgpO1xyXG4gICAgfTtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInZpc2l0LWVkaXRcIiwgb25FZGl0KTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwidmlzaXQtZGVsZXRlXCIsIG9uRGVsZXRlKTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwidmlzaXQtY2FuY2VsLWVkaXRcIiwgb25DYW5jZWxFZGl0KTtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwidmlzaXQtZWRpdFwiLCBvbkVkaXQpO1xyXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInZpc2l0LWRlbGV0ZVwiLCBvbkRlbGV0ZSk7XHJcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwidmlzaXQtY2FuY2VsLWVkaXRcIiwgb25DYW5jZWxFZGl0KTtcclxuICAgIH07XHJcbiAgfSwgW1xyXG4gICAgYnVzeSxcclxuICAgIGNhbkRlbGV0ZUhpc3RvcnksXHJcbiAgICBjYW5FZGl0SGlzdG9yeSxcclxuICAgIGNsb3NlQ29uZmlybSxcclxuICAgIGhhbmRsZUNhbmNlbEVkaXQsXHJcbiAgICBoYW5kbGVEZWxldGUsXHJcbiAgICBoYW5kbGVFbmFibGVFZGl0LFxyXG4gICAgaGFuZGxlVXBkYXRlLFxyXG4gICAgaXNFZGl0aW5nLFxyXG4gICAgbW9kYWxPcGVuLFxyXG4gICAgb3BlbkNvbmZpcm0sXHJcbiAgICBwZXJtaXNzaW9uc1JlYWR5LFxyXG4gICAgc2V0TW9kYWxFcnJvcixcclxuICAgIHRyYW5zRGF0ZSxcclxuICBdKTtcclxufTtcclxuIiwgIlx1RkVGRmltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VSZWYgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgZ2V0U2Vzc2lvblZhbHVlV2l0aEV4cGlyeSwgcmVtb3ZlU2Vzc2lvblZhbHVlV2l0aEV4cGlyeSwgc2V0U2Vzc2lvblZhbHVlV2l0aEV4cGlyeSB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9zZXNzaW9uRXhwaXJ5LnRzXCI7XHJcblxyXG5jb25zdCBFRElUX01PREVfVFRMX01TID0gNiAqIDYwICogNjAgKiAxMDAwO1xyXG5jb25zdCBERVRBSUxfRFJBRlRfVFRMX01TID0gMjQgKiA2MCAqIDYwICogMTAwMDtcclxuXHJcbnR5cGUgVXNlRGV0YWlsRWRpdFNlc3Npb25BcmdzID0ge1xyXG4gIGFjdGl2aWRhZElkOiBzdHJpbmc7XHJcbiAgcmVjSWQ6IHN0cmluZztcclxuICBjYW5FZGl0SGlzdG9yeTogYm9vbGVhbjtcclxuICBpc0VkaXRpbmc6IGJvb2xlYW47XHJcbiAgc2V0SXNFZGl0aW5nOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxib29sZWFuPj47XG4gIHRyYW5zRGF0ZTogc3RyaW5nO1xuICB2aXNpdFR5cGU6IHN0cmluZztcbiAgY29udGFjdE1ldGhvZDogc3RyaW5nO1xuICBhc2lzdGVudGVUaXBvOiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgY29tZW50YXJpb3M6IHN0cmluZztcclxuICBhbnRlY2VkZW50ZXM6IHN0cmluZztcclxuICBjb25jbHVzaW9uZXM6IHN0cmluZztcclxuICBzZXRUcmFuc0RhdGU6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPHN0cmluZz4+O1xuICBzZXRWaXNpdFR5cGU6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPHN0cmluZz4+O1xuICBzZXRDb250YWN0TWV0aG9kOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcbiAgc2V0QXNpc3RlbnRlVGlwbzogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XG4gIHNldERlc2NyaXB0aW9uOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcclxuICBzZXRDb21lbnRhcmlvczogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XHJcbiAgc2V0QW50ZWNlZGVudGVzOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcclxuICBzZXRDb25jbHVzaW9uZXM6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPHN0cmluZz4+O1xyXG59O1xyXG5cclxudHlwZSBEZXRhaWxEcmFmdFZhbHVlcyA9IHtcclxuICB0cmFuc0RhdGU6IHN0cmluZztcbiAgdmlzaXRUeXBlOiBzdHJpbmc7XG4gIGNvbnRhY3RNZXRob2Q6IHN0cmluZztcbiAgYXNpc3RlbnRlVGlwbzogc3RyaW5nO1xuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xyXG4gIGNvbWVudGFyaW9zOiBzdHJpbmc7XHJcbiAgYW50ZWNlZGVudGVzOiBzdHJpbmc7XHJcbiAgY29uY2x1c2lvbmVzOiBzdHJpbmc7XHJcbn07XHJcblxyXG4vLyBNYW5hZ2VzIGVkaXQtbW9kZSBzZXNzaW9uIGZsYWdzIGFuZCBkZXRhaWwgZHJhZnQgcGVyc2lzdGVuY2UuXHJcbmV4cG9ydCBjb25zdCB1c2VEZXRhaWxFZGl0U2Vzc2lvbiA9ICh7XHJcbiAgYWN0aXZpZGFkSWQsXHJcbiAgcmVjSWQsXHJcbiAgY2FuRWRpdEhpc3RvcnksXHJcbiAgaXNFZGl0aW5nLFxyXG4gIHNldElzRWRpdGluZyxcclxuICB0cmFuc0RhdGUsXG4gIHZpc2l0VHlwZSxcbiAgY29udGFjdE1ldGhvZCxcbiAgYXNpc3RlbnRlVGlwbyxcbiAgZGVzY3JpcHRpb24sXHJcbiAgY29tZW50YXJpb3MsXHJcbiAgYW50ZWNlZGVudGVzLFxyXG4gIGNvbmNsdXNpb25lcyxcclxuICBzZXRUcmFuc0RhdGUsXG4gIHNldFZpc2l0VHlwZSxcbiAgc2V0Q29udGFjdE1ldGhvZCxcbiAgc2V0QXNpc3RlbnRlVGlwbyxcbiAgc2V0RGVzY3JpcHRpb24sXHJcbiAgc2V0Q29tZW50YXJpb3MsXHJcbiAgc2V0QW50ZWNlZGVudGVzLFxyXG4gIHNldENvbmNsdXNpb25lcyxcclxufTogVXNlRGV0YWlsRWRpdFNlc3Npb25BcmdzKSA9PiB7XHJcbiAgY29uc3QgZWRpdE1vZGVLZXlSZWYgPSB1c2VSZWYoXCJcIik7XHJcbiAgY29uc3QgZHJhZnRLZXlSZWYgPSB1c2VSZWYoXCJcIik7XHJcbiAgY29uc3QgZHJhZnRQZXJzaXN0VGltZXJSZWYgPSB1c2VSZWY8bnVtYmVyIHwgbnVsbD4obnVsbCk7XHJcblxyXG4gIC8vIFBlcnNpc3QgZWRpdCBtb2RlIHdoaWxlIHVzZXIgbmF2aWdhdGVzIHRvIHRoZSB0ZXh0IGVkaXRvciBhbmQgYmFjay5cclxuICBjb25zdCBzeW5jRWRpdE1vZGVGbGFnID0gdXNlQ2FsbGJhY2soKGVuYWJsZWQ6IGJvb2xlYW4pID0+IHtcclxuICAgIGNvbnN0IGtleSA9IGVkaXRNb2RlS2V5UmVmLmN1cnJlbnQ7XHJcbiAgICBpZiAoIWtleSkgcmV0dXJuO1xyXG4gICAgaWYgKGVuYWJsZWQpIHtcclxuICAgICAgc2V0U2Vzc2lvblZhbHVlV2l0aEV4cGlyeShrZXksIFwidHJ1ZVwiLCBFRElUX01PREVfVFRMX01TKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgcmVtb3ZlU2Vzc2lvblZhbHVlV2l0aEV4cGlyeShrZXkpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3Qgc3luY0VkaXRNb2RlT25FbnRyeSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGNvbnN0IGJhc2VJZCA9IGFjdGl2aWRhZElkIHx8IHJlY0lkIHx8IFwiZGVmYXVsdFwiO1xyXG4gICAgY29uc3Qga2V5ID0gYGluZF92aXNpdF9lZGl0XyR7YmFzZUlkfWA7XHJcbiAgICBjb25zdCByZXR1cm5LZXkgPSBgJHtrZXl9X3JldHVybmA7XHJcbiAgICBjb25zdCBkcmFmdEtleSA9IGBpbmRfdmlzaXRfZHJhZnRfJHtiYXNlSWR9YDtcclxuICAgIGVkaXRNb2RlS2V5UmVmLmN1cnJlbnQgPSBrZXk7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgYWxsb3dSZXN0b3JlID0gZ2V0U2Vzc2lvblZhbHVlV2l0aEV4cGlyeShyZXR1cm5LZXkpID09PSBcIjFcIjtcclxuICAgICAgaWYgKGFsbG93UmVzdG9yZSkge1xyXG4gICAgICAgIHJlbW92ZVNlc3Npb25WYWx1ZVdpdGhFeHBpcnkocmV0dXJuS2V5KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGNhbkVkaXRIaXN0b3J5ICYmIGFsbG93UmVzdG9yZSAmJiBnZXRTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KGtleSkgPT09IFwidHJ1ZVwiKSB7XHJcbiAgICAgICAgc2V0SXNFZGl0aW5nKHRydWUpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNldElzRWRpdGluZyhmYWxzZSk7XHJcbiAgICAgICAgcmVtb3ZlU2Vzc2lvblZhbHVlV2l0aEV4cGlyeShrZXkpO1xyXG4gICAgICAgIHJlbW92ZVNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoZHJhZnRLZXkpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIWNhbkVkaXRIaXN0b3J5KSB7XHJcbiAgICAgICAgcmVtb3ZlU2Vzc2lvblZhbHVlV2l0aEV4cGlyeShrZXkpO1xyXG4gICAgICAgIHJlbW92ZVNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoZHJhZnRLZXkpO1xyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIHtcclxuICAgICAgLyogaWdub3JlICovXHJcbiAgICB9XHJcbiAgfSwgW2FjdGl2aWRhZElkLCBjYW5FZGl0SGlzdG9yeSwgcmVjSWQsIHNldElzRWRpdGluZ10pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgc3luY0VkaXRNb2RlT25FbnRyeSgpO1xyXG4gIH0sIFtzeW5jRWRpdE1vZGVPbkVudHJ5XSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBvblBhZ2VTaG93ID0gKGV2ZW50OiBQYWdlVHJhbnNpdGlvbkV2ZW50KSA9PiB7XHJcbiAgICAgIGNvbnN0IG5hdkVudHJ5ID0gdHlwZW9mIHBlcmZvcm1hbmNlICE9PSBcInVuZGVmaW5lZFwiICYmIHBlcmZvcm1hbmNlLmdldEVudHJpZXNCeVR5cGVcclxuICAgICAgICA/IChwZXJmb3JtYW5jZS5nZXRFbnRyaWVzQnlUeXBlKFwibmF2aWdhdGlvblwiKVswXSBhcyBQZXJmb3JtYW5jZU5hdmlnYXRpb25UaW1pbmcgfCB1bmRlZmluZWQpXHJcbiAgICAgICAgOiB1bmRlZmluZWQ7XHJcbiAgICAgIGNvbnN0IGlzQmFja0ZvcndhcmQgPSBuYXZFbnRyeT8udHlwZSA9PT0gXCJiYWNrX2ZvcndhcmRcIjtcclxuICAgICAgaWYgKGV2ZW50Py5wZXJzaXN0ZWQgfHwgaXNCYWNrRm9yd2FyZCkge1xyXG4gICAgICAgIHN5bmNFZGl0TW9kZU9uRW50cnkoKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInBhZ2VzaG93XCIsIG9uUGFnZVNob3cpO1xyXG4gICAgcmV0dXJuICgpID0+IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicGFnZXNob3dcIiwgb25QYWdlU2hvdyk7XHJcbiAgfSwgW3N5bmNFZGl0TW9kZU9uRW50cnldKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IGtleSA9IGBpbmRfdmlzaXRfZHJhZnRfJHthY3RpdmlkYWRJZCB8fCByZWNJZCB8fCBcImRlZmF1bHRcIn1gO1xyXG4gICAgZHJhZnRLZXlSZWYuY3VycmVudCA9IGtleTtcclxuICB9LCBbYWN0aXZpZGFkSWQsIHJlY0lkXSk7XHJcblxyXG4gIGNvbnN0IHNhdmVEcmFmdCA9IHVzZUNhbGxiYWNrKChkcmFmdDogRGV0YWlsRHJhZnRWYWx1ZXMpID0+IHtcclxuICAgIGNvbnN0IGtleSA9IGRyYWZ0S2V5UmVmLmN1cnJlbnQ7XHJcbiAgICBpZiAoIWtleSkgcmV0dXJuO1xyXG4gICAgc2V0U2Vzc2lvblZhbHVlV2l0aEV4cGlyeShrZXksIEpTT04uc3RyaW5naWZ5KGRyYWZ0KSwgREVUQUlMX0RSQUZUX1RUTF9NUyk7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBjbGVhckRyYWZ0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgY29uc3Qga2V5ID0gZHJhZnRLZXlSZWYuY3VycmVudDtcclxuICAgIGlmICgha2V5KSByZXR1cm47XHJcbiAgICByZW1vdmVTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KGtleSk7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBhcHBseURyYWZ0VmFsdWVzID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgY29uc3Qga2V5ID0gZHJhZnRLZXlSZWYuY3VycmVudDtcclxuICAgIGlmICgha2V5KSByZXR1cm47XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcmF3ID0gZ2V0U2Vzc2lvblZhbHVlV2l0aEV4cGlyeShrZXkpO1xyXG4gICAgICBpZiAoIXJhdykgcmV0dXJuO1xyXG4gICAgICBjb25zdCBkcmFmdCA9IEpTT04ucGFyc2UocmF3KSBhcyBQYXJ0aWFsPERldGFpbERyYWZ0VmFsdWVzPjtcclxuICAgICAgaWYgKCFkcmFmdCB8fCB0eXBlb2YgZHJhZnQgIT09IFwib2JqZWN0XCIpIHJldHVybjtcclxuXHJcbiAgICAgIGlmIChkcmFmdC50cmFuc0RhdGUgIT09IHVuZGVmaW5lZCkgc2V0VHJhbnNEYXRlKFN0cmluZyhkcmFmdC50cmFuc0RhdGUpKTtcbiAgICAgIGlmIChkcmFmdC52aXNpdFR5cGUgIT09IHVuZGVmaW5lZCkgc2V0VmlzaXRUeXBlKFN0cmluZyhkcmFmdC52aXNpdFR5cGUpKTtcbiAgICAgIGlmIChkcmFmdC5jb250YWN0TWV0aG9kICE9PSB1bmRlZmluZWQpIHNldENvbnRhY3RNZXRob2QoU3RyaW5nKGRyYWZ0LmNvbnRhY3RNZXRob2QpKTtcbiAgICAgIGlmIChkcmFmdC5hc2lzdGVudGVUaXBvICE9PSB1bmRlZmluZWQpIHNldEFzaXN0ZW50ZVRpcG8oU3RyaW5nKGRyYWZ0LmFzaXN0ZW50ZVRpcG8pKTtcbiAgICAgIGlmIChkcmFmdC5kZXNjcmlwdGlvbiAhPT0gdW5kZWZpbmVkKSBzZXREZXNjcmlwdGlvbihTdHJpbmcoZHJhZnQuZGVzY3JpcHRpb24pKTtcclxuICAgICAgaWYgKGRyYWZ0LmNvbWVudGFyaW9zICE9PSB1bmRlZmluZWQpIHNldENvbWVudGFyaW9zKFN0cmluZyhkcmFmdC5jb21lbnRhcmlvcykpO1xyXG4gICAgICBpZiAoZHJhZnQuYW50ZWNlZGVudGVzICE9PSB1bmRlZmluZWQpIHNldEFudGVjZWRlbnRlcyhTdHJpbmcoZHJhZnQuYW50ZWNlZGVudGVzKSk7XHJcbiAgICAgIGlmIChkcmFmdC5jb25jbHVzaW9uZXMgIT09IHVuZGVmaW5lZCkgc2V0Q29uY2x1c2lvbmVzKFN0cmluZyhkcmFmdC5jb25jbHVzaW9uZXMpKTtcclxuICAgIH0gY2F0Y2gge1xyXG4gICAgICAvKiBpZ25vcmUgKi9cclxuICAgIH1cclxuICB9LCBbc2V0QW50ZWNlZGVudGVzLCBzZXRBc2lzdGVudGVUaXBvLCBzZXRDb21lbnRhcmlvcywgc2V0Q29uY2x1c2lvbmVzLCBzZXRDb250YWN0TWV0aG9kLCBzZXREZXNjcmlwdGlvbiwgc2V0VHJhbnNEYXRlLCBzZXRWaXNpdFR5cGVdKTtcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIWlzRWRpdGluZykge1xyXG4gICAgICBpZiAoZHJhZnRQZXJzaXN0VGltZXJSZWYuY3VycmVudCkge1xyXG4gICAgICAgIGNsZWFyVGltZW91dChkcmFmdFBlcnNpc3RUaW1lclJlZi5jdXJyZW50KTtcclxuICAgICAgICBkcmFmdFBlcnNpc3RUaW1lclJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGRyYWZ0UGVyc2lzdFRpbWVyUmVmLmN1cnJlbnQpIHtcclxuICAgICAgY2xlYXJUaW1lb3V0KGRyYWZ0UGVyc2lzdFRpbWVyUmVmLmN1cnJlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYWZ0UGVyc2lzdFRpbWVyUmVmLmN1cnJlbnQgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIGRyYWZ0UGVyc2lzdFRpbWVyUmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICBzYXZlRHJhZnQoe1xyXG4gICAgICAgIHRyYW5zRGF0ZSxcbiAgICAgICAgdmlzaXRUeXBlLFxuICAgICAgICBjb250YWN0TWV0aG9kLFxuICAgICAgICBhc2lzdGVudGVUaXBvLFxuICAgICAgICBkZXNjcmlwdGlvbixcclxuICAgICAgICBjb21lbnRhcmlvcyxcclxuICAgICAgICBhbnRlY2VkZW50ZXMsXHJcbiAgICAgICAgY29uY2x1c2lvbmVzLFxyXG4gICAgICB9KTtcclxuICAgIH0sIDE4MCk7XHJcblxyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgaWYgKGRyYWZ0UGVyc2lzdFRpbWVyUmVmLmN1cnJlbnQpIHtcclxuICAgICAgICBjbGVhclRpbWVvdXQoZHJhZnRQZXJzaXN0VGltZXJSZWYuY3VycmVudCk7XHJcbiAgICAgICAgZHJhZnRQZXJzaXN0VGltZXJSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfSwgW2FudGVjZWRlbnRlcywgYXNpc3RlbnRlVGlwbywgY29tZW50YXJpb3MsIGNvbmNsdXNpb25lcywgY29udGFjdE1ldGhvZCwgZGVzY3JpcHRpb24sIGlzRWRpdGluZywgc2F2ZURyYWZ0LCB0cmFuc0RhdGUsIHZpc2l0VHlwZV0pO1xuXHJcbiAgcmV0dXJuIHtcclxuICAgIGVkaXRNb2RlS2V5UmVmLFxyXG4gICAgc3luY0VkaXRNb2RlRmxhZyxcclxuICAgIGNsZWFyRHJhZnQsXHJcbiAgICBhcHBseURyYWZ0VmFsdWVzLFxyXG4gIH07XHJcbn07XHJcbiIsICJcdUZFRkZpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2sgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgZmV0Y2hKc29uIH0gZnJvbSBcIi4uLy4uLy4uL3NlcnZpY2VzL2FwaVNlcnZpY2UudHNcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB7IHNob3dQZXJtaXNzaW9uTW9kYWwgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvcGVybWlzc2lvbnMudHNcIjtcclxuaW1wb3J0IHsgZmxhc2hBY3Rpb25NYXJrIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3Zpc2l0YXNIaXN0b3J5LnRzXCI7XHJcblxyXG50eXBlIE9wdGlvbkxpa2UgPSB7XHJcbiAgdmFsdWU/OiBzdHJpbmcgfCBudW1iZXI7XHJcbiAgVmFsdWU/OiBzdHJpbmcgfCBudW1iZXI7XHJcbiAgdGV4dD86IHN0cmluZztcclxuICBUZXh0Pzogc3RyaW5nO1xyXG59O1xyXG5cclxudHlwZSBWaXNpdENvbW1hbmRSZXNwb25zZSA9IHtcclxuICBzdWNjZXNzPzogYm9vbGVhbjtcclxuICBtZXNzYWdlPzogc3RyaW5nO1xyXG4gIFN1Y2Nlc3M/OiBib29sZWFuO1xyXG4gIE1lc3NhZ2U/OiBzdHJpbmc7XHJcbn07XHJcblxyXG5jb25zdCBpc0NvbW1hbmRTdWNjZXNzID0gKHJlc3BvbnNlOiBWaXNpdENvbW1hbmRSZXNwb25zZSk6IGJvb2xlYW4gPT4ge1xyXG4gIHJldHVybiByZXNwb25zZS5zdWNjZXNzID09PSB0cnVlIHx8IHJlc3BvbnNlLlN1Y2Nlc3MgPT09IHRydWU7XHJcbn07XHJcblxyXG5jb25zdCBnZXRDb21tYW5kTWVzc2FnZSA9IChyZXNwb25zZTogVmlzaXRDb21tYW5kUmVzcG9uc2UpOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IHJhdyA9IHJlc3BvbnNlLm1lc3NhZ2UgPz8gcmVzcG9uc2UuTWVzc2FnZTtcclxuICByZXR1cm4gdHlwZW9mIHJhdyA9PT0gXCJzdHJpbmdcIiA/IHJhdy50cmltKCkgOiBcIlwiO1xyXG59O1xyXG5cclxuLy8gS2VlcCByZWNJZCBhcyBhIG5vcm1hbGl6ZWQgc2lnbmVkIGludGVnZXIgc3RyaW5nIHRvIGF2b2lkIGxvbmcgcHJlY2lzaW9uIGxvc3MgaW4gSlMgbnVtYmVycy5cclxuY29uc3QgcmVzb2x2ZVNhZmVSZWNJZCA9IChyYXdSZWNJZDogc3RyaW5nKTogc3RyaW5nIHwgbnVsbCA9PiB7XHJcbiAgY29uc3Qgbm9ybWFsaXplZCA9IFN0cmluZyhyYXdSZWNJZCA/PyBcIlwiKS50cmltKCk7XHJcbiAgaWYgKCFub3JtYWxpemVkKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgaWYgKCEvXi0/XFxkKyQvLnRlc3Qobm9ybWFsaXplZCkpIHJldHVybiBudWxsO1xyXG5cclxuICBjb25zdCBhYnNvbHV0ZURpZ2l0cyA9IG5vcm1hbGl6ZWQuc3RhcnRzV2l0aChcIi1cIikgPyBub3JtYWxpemVkLnNsaWNlKDEpIDogbm9ybWFsaXplZDtcclxuICBpZiAoIWFic29sdXRlRGlnaXRzIHx8IC9eMCskLy50ZXN0KGFic29sdXRlRGlnaXRzKSkgcmV0dXJuIG51bGw7XHJcblxyXG4gIHJldHVybiBub3JtYWxpemVkO1xyXG59O1xyXG5cclxuY29uc3Qgc2hvdWxkTG9nUmVjSWRJbkRldiA9ICgpOiBib29sZWFuID0+IHtcclxuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhd2luZG93LmxvY2F0aW9uKSByZXR1cm4gZmFsc2U7XHJcbiAgY29uc3QgaG9zdCA9IFN0cmluZyh3aW5kb3cubG9jYXRpb24uaG9zdG5hbWUgfHwgXCJcIikudHJpbSgpLnRvTG93ZXJDYXNlKCk7XHJcbiAgcmV0dXJuIGhvc3QgPT09IFwibG9jYWxob3N0XCIgfHwgaG9zdCA9PT0gXCIxMjcuMC4wLjFcIiB8fCBob3N0LmVuZHNXaXRoKFwiLmxvY2FsXCIpO1xyXG59O1xyXG5cclxuY29uc3QgbG9nU2FmZVJlY0lkSW5EZXYgPSAob3BlcmF0aW9uOiBcInVwZGF0ZVwiIHwgXCJkZWxldGVcIiwgc2FmZVJlY0lkOiBzdHJpbmcpOiB2b2lkID0+IHtcclxuICBpZiAoIXNob3VsZExvZ1JlY0lkSW5EZXYoKSkgcmV0dXJuO1xyXG4gIGNvbnNvbGUuaW5mbyhgW3Zpc2l0YXMtZGV0YWlsXSAke29wZXJhdGlvbn0gcmVjSWRgLCBzYWZlUmVjSWQpO1xyXG59O1xyXG5cclxudHlwZSBVc2VEZXRhaWxNdXRhdGlvbnNBcmdzID0ge1xyXG4gIGJ1c3k6IGJvb2xlYW47XHJcbiAgaXNFZGl0aW5nOiBib29sZWFuO1xyXG4gIGNhbkVkaXRIaXN0b3J5OiBib29sZWFuO1xyXG4gIGNhbkRlbGV0ZUhpc3Rvcnk6IGJvb2xlYW47XHJcbiAgcmVjSWQ6IHN0cmluZztcclxuICBhY2NvdW50TnVtOiBzdHJpbmc7XG4gIHRyYW5zRGF0ZTogc3RyaW5nO1xuICB2aXNpdFR5cGU6IHN0cmluZztcbiAgY29udGFjdE1ldGhvZDogc3RyaW5nO1xuICBhc2lzdGVudGVUaXBvOiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgY29tZW50YXJpb3M6IHN0cmluZztcclxuICBhbnRlY2VkZW50ZXM6IHN0cmluZztcclxuICBjb25jbHVzaW9uZXM6IHN0cmluZztcclxuICB2aXNpdFR5cGVzOiBPcHRpb25MaWtlW107XG4gIGNvbnRhY3RNZXRob2RzOiBPcHRpb25MaWtlW107XG4gIGFzaXN0ZW50ZVRpcG9zOiBPcHRpb25MaWtlW107XG4gIGRlZmF1bHRWaXNpdFR5cGU6IHN0cmluZztcbiAgZGVmYXVsdENvbnRhY3RNZXRob2Q6IHN0cmluZztcbiAgcmF3SW5pdGlhbFZpc2l0VHlwZTogc3RyaW5nO1xuICByYXdJbml0aWFsQ29udGFjdE1ldGhvZDogc3RyaW5nO1xuICByYXdJbml0aWFsQXNpc3RlbnRlOiBzdHJpbmc7XG4gIG1hdGNoT3B0aW9uVmFsdWU6IChvcHRpb25zOiBPcHRpb25MaWtlW10sIHJhdzogdW5rbm93bikgPT4gc3RyaW5nO1xyXG4gIGNsZWFyRHJhZnQ6ICgpID0+IHZvaWQ7XHJcbiAgc3luY0VkaXRNb2RlRmxhZzogKGVuYWJsZWQ6IGJvb2xlYW4pID0+IHZvaWQ7XHJcbiAgc2V0TW9kYWxFcnJvcjogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XHJcbiAgc2V0QnVzeTogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248Ym9vbGVhbj4+O1xyXG4gIHNldFN0YXR1czogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XHJcbiAgc2V0SXNFZGl0aW5nOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxib29sZWFuPj47XHJcbn07XHJcblxyXG4vLyBFbmNhcHN1bGF0ZXMgdXBkYXRlIGFuZCBkZWxldGUgbXV0YXRpb25zIGZvciBkZXRhaWwgZm9ybSBzdGF0ZS5cclxuZXhwb3J0IGNvbnN0IHVzZURldGFpbE11dGF0aW9ucyA9ICh7XHJcbiAgYnVzeSxcclxuICBpc0VkaXRpbmcsXHJcbiAgY2FuRWRpdEhpc3RvcnksXHJcbiAgY2FuRGVsZXRlSGlzdG9yeSxcclxuICByZWNJZCxcclxuICBhY2NvdW50TnVtLFxuICB0cmFuc0RhdGUsXG4gIHZpc2l0VHlwZSxcbiAgY29udGFjdE1ldGhvZCxcbiAgYXNpc3RlbnRlVGlwbyxcbiAgZGVzY3JpcHRpb24sXHJcbiAgY29tZW50YXJpb3MsXHJcbiAgYW50ZWNlZGVudGVzLFxyXG4gIGNvbmNsdXNpb25lcyxcclxuICB2aXNpdFR5cGVzLFxuICBjb250YWN0TWV0aG9kcyxcbiAgYXNpc3RlbnRlVGlwb3MsXG4gIGRlZmF1bHRWaXNpdFR5cGUsXG4gIGRlZmF1bHRDb250YWN0TWV0aG9kLFxuICByYXdJbml0aWFsVmlzaXRUeXBlLFxuICByYXdJbml0aWFsQ29udGFjdE1ldGhvZCxcbiAgcmF3SW5pdGlhbEFzaXN0ZW50ZSxcbiAgbWF0Y2hPcHRpb25WYWx1ZSxcclxuICBjbGVhckRyYWZ0LFxyXG4gIHN5bmNFZGl0TW9kZUZsYWcsXHJcbiAgc2V0TW9kYWxFcnJvcixcclxuICBzZXRCdXN5LFxyXG4gIHNldFN0YXR1cyxcclxuICBzZXRJc0VkaXRpbmcsXHJcbn06IFVzZURldGFpbE11dGF0aW9uc0FyZ3MpID0+IHtcclxuICBjb25zdCBoYW5kbGVVcGRhdGUgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XHJcbiAgICBpZiAoYnVzeSB8fCAhaXNFZGl0aW5nKSByZXR1cm4gZmFsc2U7XHJcbiAgICBpZiAoIWNhbkVkaXRIaXN0b3J5KSB7XHJcbiAgICAgIHNob3dQZXJtaXNzaW9uTW9kYWwoKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHNhZmVSZWNJZFZhbHVlID0gcmVzb2x2ZVNhZmVSZWNJZChyZWNJZCk7XHJcbiAgICBpZiAoc2FmZVJlY0lkVmFsdWUgPT09IG51bGwpIHtcclxuICAgICAgY29uc3QgbWVzc2FnZSA9IGluZFQoXCJWaXNpdHNfRGV0YWlsX0ludmFsaWRSZWNJZFwiLCBcIkNvdWxkIG5vdCByZXNvbHZlIGFjdGl2aXR5IGlkZW50aWZpZXIuIFJlbG9hZCBhbmQgdHJ5IGFnYWluLlwiKTtcclxuICAgICAgc2V0TW9kYWxFcnJvcihtZXNzYWdlKTtcclxuICAgICAgc2V0U3RhdHVzKG1lc3NhZ2UpO1xyXG4gICAgICBmbGFzaEFjdGlvbk1hcmsoXCJlcnJvclByb2Nlc3NcIiwgMTUwMCk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xyXG4gICAgc2V0QnVzeSh0cnVlKTtcclxuICAgIHNldFN0YXR1cyhpbmRUKFwiVmlzaXRzX0RldGFpbF9VcGRhdGluZ1wiLCBcIlVwZGF0aW5nIGFjdGl2aXR5Li4uXCIpKTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBub3JtYWxpemVkVmlzaXRUeXBlID1cclxuICAgICAgICBtYXRjaE9wdGlvblZhbHVlKHZpc2l0VHlwZXMsIHZpc2l0VHlwZSkgfHxcclxuICAgICAgICBtYXRjaE9wdGlvblZhbHVlKHZpc2l0VHlwZXMsIHJhd0luaXRpYWxWaXNpdFR5cGUpIHx8XHJcbiAgICAgICAgZGVmYXVsdFZpc2l0VHlwZTtcclxuICAgICAgY29uc3Qgbm9ybWFsaXplZEFzaXN0ZW50ZVRpcG8gPVxuICAgICAgICBtYXRjaE9wdGlvblZhbHVlKGFzaXN0ZW50ZVRpcG9zLCBhc2lzdGVudGVUaXBvKSB8fFxuICAgICAgICBtYXRjaE9wdGlvblZhbHVlKGFzaXN0ZW50ZVRpcG9zLCByYXdJbml0aWFsQXNpc3RlbnRlKSB8fFxuICAgICAgICByYXdJbml0aWFsQXNpc3RlbnRlO1xuICAgICAgY29uc3Qgbm9ybWFsaXplZENvbnRhY3RNZXRob2QgPVxuICAgICAgICBtYXRjaE9wdGlvblZhbHVlKGNvbnRhY3RNZXRob2RzLCBjb250YWN0TWV0aG9kKSB8fFxuICAgICAgICBtYXRjaE9wdGlvblZhbHVlKGNvbnRhY3RNZXRob2RzLCByYXdJbml0aWFsQ29udGFjdE1ldGhvZCkgfHxcbiAgICAgICAgZGVmYXVsdENvbnRhY3RNZXRob2Q7XG5cbiAgICAgIGNvbnN0IHBheWxvYWQgPSB7XG4gICAgICAgIGFjY291bnROdW0sXG4gICAgICAgIHZpc2l0VHlwZTogbm9ybWFsaXplZFZpc2l0VHlwZSxcbiAgICAgICAgY29udGFjdE1ldGhvZDogTnVtYmVyKG5vcm1hbGl6ZWRDb250YWN0TWV0aG9kIHx8IDApLFxuICAgICAgICBhc2lzdGVudGVUaXBvOiBub3JtYWxpemVkQXNpc3RlbnRlVGlwbyxcbiAgICAgICAgZGVzY3JpcHRpb24sXHJcbiAgICAgICAgdHJhbnNEYXRlLFxyXG4gICAgICAgIGNvbWVudGFyaW9zLFxyXG4gICAgICAgIGFudGVjZWRlbnRlcyxcclxuICAgICAgICBjb25jbHVzaW9uZXMsXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBsb2dTYWZlUmVjSWRJbkRldihcInVwZGF0ZVwiLCBzYWZlUmVjSWRWYWx1ZSk7XHJcbiAgICAgIGNvbnN0IHNhZmVSZWNJZCA9IGVuY29kZVVSSUNvbXBvbmVudChzYWZlUmVjSWRWYWx1ZSk7XHJcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPFZpc2l0Q29tbWFuZFJlc3BvbnNlPihgL1Zpc2l0YXMvVXBkYXRlQWN0aXZpdHkvJHtzYWZlUmVjSWR9YCwge1xyXG4gICAgICAgIG1ldGhvZDogXCJQVVRcIixcclxuICAgICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXHJcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGF5bG9hZCksXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgaWYgKCFpc0NvbW1hbmRTdWNjZXNzKHJlc3BvbnNlKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihnZXRDb21tYW5kTWVzc2FnZShyZXNwb25zZSkgfHwgaW5kVChcIlZpc2l0c19EZXRhaWxfVXBkYXRlRmFpbGVkXCIsIFwiVXBkYXRlIGZhaWxlZC5cIikpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzZXRTdGF0dXMoaW5kVChcIlZpc2l0c19EZXRhaWxfVXBkYXRlZFwiLCBcIkFjdGl2aXR5IHVwZGF0ZWRcIikpO1xyXG4gICAgICBzZXRJc0VkaXRpbmcoZmFsc2UpO1xyXG4gICAgICBzeW5jRWRpdE1vZGVGbGFnKGZhbHNlKTtcclxuICAgICAgY2xlYXJEcmFmdCgpO1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBlcnJvciBpbnN0YW5jZW9mIEVycm9yICYmIGVycm9yLm1lc3NhZ2VcclxuICAgICAgICA/IGVycm9yLm1lc3NhZ2VcclxuICAgICAgICA6IGluZFQoXCJWaXNpdHNfRGV0YWlsX1VwZGF0ZUVycm9yXCIsIFwiVXBkYXRlIGVycm9yLlwiKTtcclxuICAgICAgc2V0TW9kYWxFcnJvcihtZXNzYWdlKTtcclxuICAgICAgc2V0U3RhdHVzKG1lc3NhZ2UpO1xyXG4gICAgICBmbGFzaEFjdGlvbk1hcmsoXCJlcnJvclByb2Nlc3NcIiwgMTUwMCk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0gZmluYWxseSB7XHJcbiAgICAgIHNldEJ1c3koZmFsc2UpO1xyXG4gICAgfVxyXG4gIH0sIFtcclxuICAgIGFjY291bnROdW0sXHJcbiAgICBhbnRlY2VkZW50ZXMsXHJcbiAgICBhc2lzdGVudGVUaXBvLFxyXG4gICAgYXNpc3RlbnRlVGlwb3MsXHJcbiAgICBidXN5LFxyXG4gICAgY2FuRWRpdEhpc3RvcnksXHJcbiAgICBjbGVhckRyYWZ0LFxyXG4gICAgY29tZW50YXJpb3MsXG4gICAgY29uY2x1c2lvbmVzLFxuICAgIGNvbnRhY3RNZXRob2QsXG4gICAgY29udGFjdE1ldGhvZHMsXG4gICAgZGVmYXVsdENvbnRhY3RNZXRob2QsXG4gICAgZGVmYXVsdFZpc2l0VHlwZSxcbiAgICBkZXNjcmlwdGlvbixcclxuICAgIGlzRWRpdGluZyxcclxuICAgIG1hdGNoT3B0aW9uVmFsdWUsXHJcbiAgICByYXdJbml0aWFsQXNpc3RlbnRlLFxuICAgIHJhd0luaXRpYWxDb250YWN0TWV0aG9kLFxuICAgIHJhd0luaXRpYWxWaXNpdFR5cGUsXG4gICAgcmVjSWQsXHJcbiAgICBzZXRCdXN5LFxyXG4gICAgc2V0SXNFZGl0aW5nLFxyXG4gICAgc2V0TW9kYWxFcnJvcixcclxuICAgIHNldFN0YXR1cyxcclxuICAgIHN5bmNFZGl0TW9kZUZsYWcsXHJcbiAgICB0cmFuc0RhdGUsXHJcbiAgICB2aXNpdFR5cGUsXHJcbiAgICB2aXNpdFR5cGVzLFxyXG4gIF0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVEZWxldGUgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XHJcbiAgICBpZiAoYnVzeSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgaWYgKCFjYW5EZWxldGVIaXN0b3J5KSB7XHJcbiAgICAgIHNob3dQZXJtaXNzaW9uTW9kYWwoKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHNhZmVSZWNJZFZhbHVlID0gcmVzb2x2ZVNhZmVSZWNJZChyZWNJZCk7XHJcbiAgICBpZiAoc2FmZVJlY0lkVmFsdWUgPT09IG51bGwpIHtcclxuICAgICAgY29uc3QgbWVzc2FnZSA9IGluZFQoXCJWaXNpdHNfRGV0YWlsX0ludmFsaWRSZWNJZFwiLCBcIkNvdWxkIG5vdCByZXNvbHZlIGFjdGl2aXR5IGlkZW50aWZpZXIuIFJlbG9hZCBhbmQgdHJ5IGFnYWluLlwiKTtcclxuICAgICAgc2V0TW9kYWxFcnJvcihtZXNzYWdlKTtcclxuICAgICAgc2V0U3RhdHVzKG1lc3NhZ2UpO1xyXG4gICAgICBmbGFzaEFjdGlvbk1hcmsoXCJlcnJvclByb2Nlc3NcIiwgMTUwMCk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xyXG4gICAgc2V0QnVzeSh0cnVlKTtcclxuICAgIHNldFN0YXR1cyhpbmRUKFwiVmlzaXRzX0RldGFpbF9EZWxldGluZ1wiLCBcIkRlbGV0aW5nIGFjdGl2aXR5Li4uXCIpKTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBsb2dTYWZlUmVjSWRJbkRldihcImRlbGV0ZVwiLCBzYWZlUmVjSWRWYWx1ZSk7XHJcbiAgICAgIGNvbnN0IHNhZmVSZWNJZCA9IGVuY29kZVVSSUNvbXBvbmVudChzYWZlUmVjSWRWYWx1ZSk7XHJcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPFZpc2l0Q29tbWFuZFJlc3BvbnNlPihgL1Zpc2l0YXMvRGVsZXRlQWN0aXZpdHkvJHtzYWZlUmVjSWR9YCwgeyBtZXRob2Q6IFwiREVMRVRFXCIgfSk7XHJcbiAgICAgIGlmICghaXNDb21tYW5kU3VjY2VzcyhyZXNwb25zZSkpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZ2V0Q29tbWFuZE1lc3NhZ2UocmVzcG9uc2UpIHx8IGluZFQoXCJWaXNpdHNfRGV0YWlsX0RlbGV0ZUZhaWxlZFwiLCBcIkRlbGV0ZSBmYWlsZWQuXCIpKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2V0U3RhdHVzKGluZFQoXCJWaXNpdHNfRGV0YWlsX0RlbGV0ZWRcIiwgXCJBY3Rpdml0eSBkZWxldGVkXCIpKTtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zdCBtZXNzYWdlID0gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciAmJiBlcnJvci5tZXNzYWdlXHJcbiAgICAgICAgPyBlcnJvci5tZXNzYWdlXHJcbiAgICAgICAgOiBpbmRUKFwiVmlzaXRzX0RldGFpbF9EZWxldGVFcnJvclwiLCBcIkRlbGV0ZSBlcnJvci5cIik7XHJcbiAgICAgIHNldE1vZGFsRXJyb3IobWVzc2FnZSk7XHJcbiAgICAgIHNldFN0YXR1cyhtZXNzYWdlKTtcclxuICAgICAgZmxhc2hBY3Rpb25NYXJrKFwiZXJyb3JQcm9jZXNzXCIsIDE1MDApO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9IGZpbmFsbHkge1xyXG4gICAgICBzZXRCdXN5KGZhbHNlKTtcclxuICAgIH1cclxuICB9LCBbYnVzeSwgY2FuRGVsZXRlSGlzdG9yeSwgcmVjSWQsIHNldEJ1c3ksIHNldE1vZGFsRXJyb3IsIHNldFN0YXR1c10pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgaGFuZGxlVXBkYXRlLFxyXG4gICAgaGFuZGxlRGVsZXRlLFxyXG4gIH07XHJcbn07XHJcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBEZXRhaWxGb3JtIGZyb20gXCIuL0RldGFpbEZvcm0udHN4XCI7XHJcbmltcG9ydCBWaXNpdGFzUGFnZVByb3ZpZGVycyBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1Zpc2l0YXNQYWdlUHJvdmlkZXJzLnRzeFwiO1xyXG5pbXBvcnQgeyBtb3VudFJlYWN0SXNsYW5kLCBtb3VudFdoZW5Eb2N1bWVudFJlYWR5IH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3JlYWN0SXNsYW5kLnRzeFwiO1xyXG5cclxuLy8gUGFnZSBlbnRyeSBmb3IgdGhlIHZpc2l0YXMgZGV0YWlsIGlzbGFuZC5cclxuY29uc3QgRGV0YWlsUGFnZSA9ICgpID0+IHtcclxuICByZXR1cm4gKFxyXG4gICAgPFZpc2l0YXNQYWdlUHJvdmlkZXJzPlxyXG4gICAgICA8RGV0YWlsRm9ybSAvPlxyXG4gICAgPC9WaXNpdGFzUGFnZVByb3ZpZGVycz5cclxuICApO1xyXG59O1xyXG5cclxuY29uc3QgbW91bnQgPSAoKSA9PiB7XHJcbiAgY29uc3Qgcm9vdEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2aXNpdGEtZGV0YWlsLXJvb3RcIik7XHJcbiAgaWYgKCFyb290RWwpIHJldHVybjtcclxuXHJcbiAgbW91bnRSZWFjdElzbGFuZChyb290RWwsIDxEZXRhaWxQYWdlIC8+KTtcclxufTtcclxuXHJcbm1vdW50V2hlbkRvY3VtZW50UmVhZHkobW91bnQpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRGV0YWlsUGFnZTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBQUEsZ0JBQXlFOzs7QUNBbEUsSUFBTSxvQkFBb0IsQ0FBQyxPQUEyQjtBQUMzRCxNQUFJLENBQUMsR0FBSSxRQUFPLE1BQU07QUFBQSxFQUFDO0FBQ3ZCLFFBQU0sU0FBUyxDQUFDLFVBQWlCLE1BQU0sZUFBZTtBQUN0RCxRQUFNLFNBQVMsQ0FBQyxlQUFlLGVBQWUsUUFBUSxPQUFPLE9BQU87QUFDcEUsU0FBTyxRQUFRLENBQUMsUUFBUSxHQUFHLGlCQUFpQixLQUFLLE1BQU0sQ0FBQztBQUN4RCxTQUFPLE1BQU07QUFDWCxXQUFPLFFBQVEsQ0FBQyxRQUFRLEdBQUcsb0JBQW9CLEtBQUssTUFBTSxDQUFDO0FBQUEsRUFDN0Q7QUFD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QTtBQUFBLFVBQ0Y7QUFBQSxVQUVBLDRDQUFDLFNBQUksV0FBVSxvREFDYixzREFBQyxVQUFNLGtCQUFPLEdBQ2hCO0FBQUE7QUFBQTtBQUFBLElBQ0Y7QUFBQSxLQUNGO0FBRUo7QUFHZSxTQUFSLGFBQThCO0FBQ25DLFNBQ0UsNENBQUMsNEJBQWlCLGlCQUFpQixLQUFLLCtCQUErQiwwRUFBMEUsR0FDL0ksc0RBQUMsYUFBVSxHQUNiO0FBRUo7OztBT25pQk0sSUFBQUMsc0JBQUE7QUFITixJQUFNLGFBQWEsTUFBTTtBQUN2QixTQUNFLDZDQUFDLGdDQUNDLHVEQUFDLGNBQVcsR0FDZDtBQUVKO0FBRUEsSUFBTSxRQUFRLE1BQU07QUFDbEIsUUFBTSxTQUFTLFNBQVMsZUFBZSxvQkFBb0I7QUFDM0QsTUFBSSxDQUFDLE9BQVE7QUFFYixtQkFBaUIsUUFBUSw2Q0FBQyxjQUFXLENBQUU7QUFDekM7QUFFQSx1QkFBdUIsS0FBSztBQUU1QixJQUFPLHFCQUFROyIsCiAgIm5hbWVzIjogWyJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIl0KfQo=
