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
  SingleDatePicker
} from "./chunks/chunk-UWXS5GXW.js";
import {
  SelectCombobox_default
} from "./chunks/chunk-JXIHF6W4.js";
import "./chunks/chunk-CGLQ74CG.js";
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
  setTopbarActionGroupReady
} from "./chunks/chunk-ZBKHPZJX.js";
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
  indT
} from "./chunks/chunk-5TAE4PEJ.js";
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
  asistenteTipo,
  description,
  comentarios,
  antecedentes,
  conclusiones,
  setTransDate,
  setVisitType,
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
      if (draft.asistenteTipo !== void 0) setAsistenteTipo(String(draft.asistenteTipo));
      if (draft.description !== void 0) setDescription(String(draft.description));
      if (draft.comentarios !== void 0) setComentarios(String(draft.comentarios));
      if (draft.antecedentes !== void 0) setAntecedentes(String(draft.antecedentes));
      if (draft.conclusiones !== void 0) setConclusiones(String(draft.conclusiones));
    } catch {
    }
  }, [setAntecedentes, setAsistenteTipo, setComentarios, setConclusiones, setDescription, setTransDate, setVisitType]);
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
  }, [antecedentes, asistenteTipo, comentarios, conclusiones, description, isEditing, saveDraft, transDate, visitType]);
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
  asistenteTipo,
  description,
  comentarios,
  antecedentes,
  conclusiones,
  visitTypes,
  asistenteTipos,
  defaultVisitType,
  rawInitialVisitType,
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
      const payload = {
        accountNum,
        visitType: normalizedVisitType,
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
    defaultVisitType,
    description,
    isEditing,
    matchOptionValue,
    rawInitialAsistente,
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
  const { visitTypes, asistenteTipos } = useVisitas();
  const canEditHistory = canAccess("VISITAS_HISTORIAL", "Edit");
  const canDeleteHistory = canAccess("VISITAS_HISTORIAL", "FullAccess");
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
  const rawInitialAsistente = String(
    detail.asistenteTipo ?? detail.AsistenteTipo ?? (asistenteTipos[0]?.value ?? asistenteTipos[0]?.Value ?? "")
  );
  const initialAsistente = matchOptionValue(asistenteTipos, rawInitialAsistente) || rawInitialAsistente;
  const [transDate, setTransDate] = (0, import_react5.useState)(initialTransDate);
  const [visitType, setVisitType] = (0, import_react5.useState)(initialVisitType);
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
    asistenteTipo,
    description,
    comentarios,
    antecedentes,
    conclusiones,
    setTransDate,
    setVisitType,
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
  }, [isEditing, transDate, visitType, asistenteTipo, description, comentarios, antecedentes, conclusiones]);
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
    asistenteTipo,
    description,
    comentarios,
    antecedentes,
    conclusiones,
    visitTypes,
    asistenteTipos,
    defaultVisitType,
    rawInitialVisitType,
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
    isEditing ? "border-slate-200 text-slate-900" : "border-slate-200 ind-readonly-field"
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
        className: "relative shadow-xs glass-panel p-4 space-y-4 border border-slate-200 rounded-2xl",
        children: [
          isHydrating && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 z-10 flex items-center justify-center bg-white/70 rounded-2xl", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center gap-2 text-sm text-slate-600", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner_default, { size: "h-5 w-5" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: indT("Common_Loading", "Loading") })
          ] }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 pt-1", children: [
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
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex items-center gap-3 text-sm text-slate-600", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: status }) })
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvZGV0YWlsL0RldGFpbEZvcm0udHN4IiwgIi4uL3JlYWN0L3NyYy91dGlscy9kb21HdWFyZHMudHMiLCAiLi4vcmVhY3Qvc3JjL3V0aWxzL3N0cmluZ3MudHMiLCAiLi4vcmVhY3Qvc3JjL2hvb2tzL3VzZURldGFpbEh5ZHJhdGlvbi50cyIsICIuLi9yZWFjdC9zcmMvaG9va3MvdXNlRGV0YWlsVG9wYmFyQWN0aW9ucy50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9kZXRhaWwvdXNlRGV0YWlsRWRpdFNlc3Npb24udHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvZGV0YWlsL3VzZURldGFpbE11dGF0aW9ucy50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9kZXRhaWwvRGV0YWlsUGFnZS50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZUNhbGxiYWNrLCB1c2VNZW1vIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBTaW5nbGVEYXRlUGlja2VyIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvU2luZ2xlRGF0ZVBpY2tlci50c3hcIjtcclxuaW1wb3J0IENvbmZpcm1Nb2RhbCBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0NvbmZpcm1Nb2RhbC50c3hcIjtcclxuaW1wb3J0IFNlbGVjdENvbWJvYm94IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvU2VsZWN0Q29tYm9ib3gudHN4XCI7XHJcbmltcG9ydCBBcHBFcnJvckJvdW5kYXJ5IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvQXBwRXJyb3JCb3VuZGFyeS50c3hcIjtcclxuaW1wb3J0IHsgdXNlVmlzaXRhcyB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VWaXNpdGFzLnRzXCI7XHJcbmltcG9ydCBTcGlubmVyIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvU3Bpbm5lci50c3hcIjtcclxuaW1wb3J0IFZpc2l0TmFycmF0aXZlRmllbGRzIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL3Zpc2l0YXMvVmlzaXROYXJyYXRpdmVGaWVsZHMudHN4XCI7XHJcbmltcG9ydCB7IGNsYXNzTmFtZXMgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvY2xhc3NOYW1lcy50c1wiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHsgY2FuQWNjZXNzLCBzaG93UGVybWlzc2lvbk1vZGFsIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3Blcm1pc3Npb25zLnRzXCI7XHJcbmltcG9ydCB7IGJpbmRSZWFkT25seUd1YXJkIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2RvbUd1YXJkcy50c1wiO1xyXG5pbXBvcnQgeyBoYXNWYWx1ZSB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9zdHJpbmdzLnRzXCI7XHJcbmltcG9ydCB7IG5hdmlnYXRlVG9UZXh0RWRpdG9yRmllbGQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvdGV4dEVkaXRvck5hdmlnYXRpb24udHNcIjtcclxuaW1wb3J0IHsgZmxhc2hBY3Rpb25NYXJrIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3Zpc2l0YXNIaXN0b3J5LnRzXCI7XHJcbmltcG9ydCB7IHNldFByZXZpZXdBbmNob3IsIHNob3dQcmV2aWV3VG9vbHRpcCwgaXNPdmVyZmxvd2luZyB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9wcmV2aWV3VG9vbHRpcC50c1wiO1xyXG5pbXBvcnQgeyB1c2VUYXBHdWFyZCB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VUYXBHdWFyZC50c1wiO1xyXG5pbXBvcnQgeyB1c2VDb25maXJtRGlhbG9nIH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZUNvbmZpcm1EaWFsb2cudHNcIjtcclxuaW1wb3J0IHsgdXNlRGV0YWlsSHlkcmF0aW9uIH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZURldGFpbEh5ZHJhdGlvbi50c1wiO1xyXG5pbXBvcnQgeyB1c2VEZXRhaWxUb3BiYXJBY3Rpb25zIH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZURldGFpbFRvcGJhckFjdGlvbnMudHNcIjtcclxuaW1wb3J0IHsgdXNlVGV4dEVkaXRvckZpZWxkcyB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VUZXh0RWRpdG9yRmllbGRzLnRzXCI7XHJcbmltcG9ydCB7IHVzZURldGFpbEVkaXRTZXNzaW9uIH0gZnJvbSBcIi4vdXNlRGV0YWlsRWRpdFNlc3Npb24udHNcIjtcclxuaW1wb3J0IHsgdXNlRGV0YWlsTXV0YXRpb25zIH0gZnJvbSBcIi4vdXNlRGV0YWlsTXV0YXRpb25zLnRzXCI7XHJcblxyXG5jb25zdCBFRElUT1JfUkVUVVJOX0ZMQUdfVFRMX01TID0gMiAqIDYwICogNjAgKiAxMDAwO1xyXG5cclxuY29uc3QgRGV0YWlsQXBwID0gKCkgPT4ge1xyXG4gIGNvbnN0IHsgdmlzaXRUeXBlcywgYXNpc3RlbnRlVGlwb3MgfSA9IHVzZVZpc2l0YXMoKTtcclxuICBjb25zdCBjYW5FZGl0SGlzdG9yeSA9IGNhbkFjY2VzcyhcIlZJU0lUQVNfSElTVE9SSUFMXCIsIFwiRWRpdFwiKTtcclxuICBjb25zdCBjYW5EZWxldGVIaXN0b3J5ID0gY2FuQWNjZXNzKFwiVklTSVRBU19ISVNUT1JJQUxcIiwgXCJGdWxsQWNjZXNzXCIpO1xyXG4gIHR5cGUgQWN0aXZpdHlEZXRhaWxQYXlsb2FkID0ge1xyXG4gICAgcmVjSWQ/OiBzdHJpbmcgfCBudW1iZXI7XHJcbiAgICBSZWNJZD86IHN0cmluZyB8IG51bWJlcjtcclxuICAgIHJlZlJlY0lkQWN0aXZpZGFkPzogc3RyaW5nIHwgbnVtYmVyO1xyXG4gICAgUmVmUmVjSWRBY3RpdmlkYWQ/OiBzdHJpbmcgfCBudW1iZXI7XHJcbiAgICBhY3RpdmlkYWRSZWNJZD86IHN0cmluZyB8IG51bWJlcjtcclxuICAgIEFjdGl2aWRhZFJlY0lkPzogc3RyaW5nIHwgbnVtYmVyO1xyXG4gICAgcmVhZE9ubHk/OiBib29sZWFuO1xyXG4gICAgYWxsb3dFZGl0PzogYm9vbGVhbjtcclxuICAgIGVkaXRNb2RlS2V5Pzogc3RyaW5nO1xyXG4gICAgW2tleTogc3RyaW5nXTogdW5rbm93bjtcclxuICB9O1xyXG5cclxuICBjb25zdCBkZXRhaWwgPSAod2luZG93Ll9fQUNUSVZJVFlfREVUQUlMX18gYXMgQWN0aXZpdHlEZXRhaWxQYXlsb2FkKSB8fCB7fTtcclxuXHJcbiAgY29uc3QgcmVzb2x2ZUFjdGl2aXR5UmVjSWQgPSAocGF5bG9hZDogQWN0aXZpdHlEZXRhaWxQYXlsb2FkKTogc3RyaW5nID0+IHtcclxuICAgIGNvbnN0IGNhbmRpZGF0ZXMgPSBbXHJcbiAgICAgIHBheWxvYWQucmVjSWQsXHJcbiAgICAgIHBheWxvYWQuUmVjSWQsXHJcbiAgICAgIHBheWxvYWQucmVmUmVjSWRBY3RpdmlkYWQsXHJcbiAgICAgIHBheWxvYWQuUmVmUmVjSWRBY3RpdmlkYWQsXHJcbiAgICAgIHBheWxvYWQuYWN0aXZpZGFkUmVjSWQsXHJcbiAgICAgIHBheWxvYWQuQWN0aXZpZGFkUmVjSWQsXHJcbiAgICBdO1xyXG5cclxuICAgIGZvciAoY29uc3QgY2FuZGlkYXRlIG9mIGNhbmRpZGF0ZXMpIHtcclxuICAgICAgY29uc3Qgbm9ybWFsaXplZCA9IFN0cmluZyhjYW5kaWRhdGUgPz8gXCJcIikudHJpbSgpO1xyXG4gICAgICBpZiAobm9ybWFsaXplZCkge1xyXG4gICAgICAgIHJldHVybiBub3JtYWxpemVkO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIFwiXCI7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgYWN0aXZpdHlSZWNJZCA9IHJlc29sdmVBY3Rpdml0eVJlY0lkKGRldGFpbCk7XHJcblxyXG4gIGNvbnN0IHRleHRFZGl0b3JCYXNlSWQgPSBhY3Rpdml0eVJlY0lkID8gYFZpc2l0YS4ke2FjdGl2aXR5UmVjSWR9YCA6IFwiVmlzaXRhXCI7XHJcbiAgY29uc3QgZmllbGRJZENvbWVudGFyaW9zID0gYCR7dGV4dEVkaXRvckJhc2VJZH0uQ29tZW50YXJpb3NgO1xyXG4gIGNvbnN0IGZpZWxkSWRBbnRlY2VkZW50ZXMgPSBgJHt0ZXh0RWRpdG9yQmFzZUlkfS5BbnRlY2VkZW50ZXNgO1xyXG4gIGNvbnN0IGZpZWxkSWRDb25jbHVzaW9uZXMgPSBgJHt0ZXh0RWRpdG9yQmFzZUlkfS5Db25jbHVzaW9uZXNgO1xyXG5cclxuICBjb25zdCBub3JtYWxpemVEYXRlVG9JbnB1dCA9IHVzZUNhbGxiYWNrKCh2YWx1ZSkgPT4ge1xyXG4gICAgaWYgKCF2YWx1ZSkgcmV0dXJuIFwiXCI7XHJcbiAgICBjb25zdCByYXcgPSBTdHJpbmcodmFsdWUpLnRyaW0oKTtcclxuICAgIGlmICghcmF3KSByZXR1cm4gXCJcIjtcclxuICAgIC8vIEFscmVhZHkgeXl5eS1NTS1kZFxyXG4gICAgaWYgKC9eXFxkezR9LVxcZHsyfS1cXGR7Mn0kLy50ZXN0KHJhdykpIHJldHVybiByYXc7XHJcbiAgICAvLyBkZC5NTS55eXl5IG9yIGRkL01NL3l5eXlcclxuICAgIGlmICgvXlxcZHsyfVsuLy1dXFxkezJ9Wy4vLV1cXGR7NH0kLy50ZXN0KHJhdykpIHtcclxuICAgICAgY29uc3QgcGFydHMgPSByYXcuc3BsaXQoL1suLy1dLykubWFwKChwKSA9PiBwYXJzZUludChwLCAxMCkpO1xyXG4gICAgICBpZiAocGFydHMubGVuZ3RoID09PSAzICYmICFOdW1iZXIuaXNOYU4ocGFydHNbMF0pICYmICFOdW1iZXIuaXNOYU4ocGFydHNbMV0pICYmICFOdW1iZXIuaXNOYU4ocGFydHNbMl0pKSB7XHJcbiAgICAgICAgY29uc3QgW2QsIG0sIHldID0gcGFydHM7XHJcbiAgICAgICAgY29uc3QgbW0gPSBTdHJpbmcobSkucGFkU3RhcnQoMiwgXCIwXCIpO1xyXG4gICAgICAgIGNvbnN0IGRkID0gU3RyaW5nKGQpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcclxuICAgICAgICByZXR1cm4gYCR7eX0tJHttbX0tJHtkZH1gO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBjb25zdCBkdCA9IG5ldyBEYXRlKHJhdyk7XHJcbiAgICBpZiAoIU51bWJlci5pc05hTihkdC5nZXRUaW1lKCkpKSB7XHJcbiAgICAgIGNvbnN0IHl5eXkgPSBkdC5nZXRGdWxsWWVhcigpO1xyXG4gICAgICBjb25zdCBtbSA9IFN0cmluZyhkdC5nZXRNb250aCgpICsgMSkucGFkU3RhcnQoMiwgXCIwXCIpO1xyXG4gICAgICBjb25zdCBkZCA9IFN0cmluZyhkdC5nZXREYXRlKCkpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcclxuICAgICAgcmV0dXJuIGAke3l5eXl9LSR7bW19LSR7ZGR9YDtcclxuICAgIH1cclxuICAgIHJldHVybiBcIlwiO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgbWF0Y2hPcHRpb25WYWx1ZSA9IHVzZUNhbGxiYWNrKChvcHRpb25zLCByYXcpID0+IHtcclxuICAgIGlmIChyYXcgPT0gbnVsbCkgcmV0dXJuIFwiXCI7XHJcbiAgICBjb25zdCByYXdTdHIgPSBTdHJpbmcocmF3KS50cmltKCk7XHJcbiAgICBpZiAoIXJhd1N0cikgcmV0dXJuIFwiXCI7XHJcblxyXG4gICAgY29uc3Qgbm9ybWFsaXplVGV4dCA9IChzKSA9PlxyXG4gICAgICBTdHJpbmcocyB8fCBcIlwiKVxyXG4gICAgICAgIC50b0xvd2VyQ2FzZSgpXHJcbiAgICAgICAgLm5vcm1hbGl6ZShcIk5GRFwiKVxyXG4gICAgICAgIC5yZXBsYWNlKC9bXFx1MDMwMC1cXHUwMzZmXS9nLCBcIlwiKVxyXG4gICAgICAgIC50cmltKCk7XHJcblxyXG4gICAgY29uc3QgcmF3Tm9ybSA9IG5vcm1hbGl6ZVRleHQocmF3U3RyKTtcclxuICAgIGNvbnN0IGFsdE5vcm0gPSByYXdOb3JtLmVuZHNXaXRoKFwib1wiKSA/IGAke3Jhd05vcm0uc2xpY2UoMCwgLTEpfWFgIDogcmF3Tm9ybTtcclxuXHJcbiAgICBjb25zdCBtYXRjaCA9IChvcHRpb25zIHx8IFtdKS5maW5kKChvKSA9PiB7XHJcbiAgICAgIGNvbnN0IHZhbCA9IFN0cmluZyhvPy52YWx1ZSA/PyBvPy5WYWx1ZSA/PyBcIlwiKS50cmltKCk7XHJcbiAgICAgIGNvbnN0IHRleHQgPSBTdHJpbmcobz8udGV4dCA/PyBvPy5UZXh0ID8/IFwiXCIpLnRyaW0oKTtcclxuICAgICAgY29uc3QgdGV4dE5vcm0gPSBub3JtYWxpemVUZXh0KHRleHQpO1xyXG4gICAgICByZXR1cm4gdmFsID09PSByYXdTdHIgfHwgdmFsID09PSByYXdOb3JtIHx8IHRleHROb3JtID09PSByYXdOb3JtIHx8IHRleHROb3JtID09PSBhbHROb3JtO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gbWF0Y2ggPyBTdHJpbmcobWF0Y2gudmFsdWUgPz8gbWF0Y2guVmFsdWUgPz8gcmF3U3RyKSA6IHJhd1N0cjtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IGluaXRpYWxUcmFuc0RhdGUgPSBub3JtYWxpemVEYXRlVG9JbnB1dChTdHJpbmcoZGV0YWlsLnRyYW5zRGF0ZSA/PyBkZXRhaWwuVHJhbnNEYXRlID8/IFwiXCIpKTtcclxuICBjb25zdCBkZWZhdWx0VmlzaXRUeXBlID0gU3RyaW5nKHZpc2l0VHlwZXNbMF0/LnZhbHVlID8/IHZpc2l0VHlwZXNbMF0/LlZhbHVlID8/IFwiXCIpO1xyXG4gIGNvbnN0IHJhd0luaXRpYWxWaXNpdFR5cGUgPSBTdHJpbmcoXHJcbiAgICBkZXRhaWwudGlwb1Zpc2l0YSA/PyBkZXRhaWwuVGlwb1Zpc2l0YSA/PyBkZXRhaWwudmlzaXRUeXBlID8/IGRldGFpbC5WaXNpdFR5cGUgPz8gXCJcIlxyXG4gICk7XHJcbiAgY29uc3QgaW5pdGlhbFZpc2l0VHlwZSA9IG1hdGNoT3B0aW9uVmFsdWUodmlzaXRUeXBlcywgcmF3SW5pdGlhbFZpc2l0VHlwZSkgfHwgZGVmYXVsdFZpc2l0VHlwZTtcclxuICBjb25zdCByYXdJbml0aWFsQXNpc3RlbnRlID0gU3RyaW5nKFxyXG4gICAgZGV0YWlsLmFzaXN0ZW50ZVRpcG8gPz8gZGV0YWlsLkFzaXN0ZW50ZVRpcG8gPz8gKGFzaXN0ZW50ZVRpcG9zWzBdPy52YWx1ZSA/PyBhc2lzdGVudGVUaXBvc1swXT8uVmFsdWUgPz8gXCJcIilcclxuICApO1xyXG4gIGNvbnN0IGluaXRpYWxBc2lzdGVudGUgPSBtYXRjaE9wdGlvblZhbHVlKGFzaXN0ZW50ZVRpcG9zLCByYXdJbml0aWFsQXNpc3RlbnRlKSB8fCByYXdJbml0aWFsQXNpc3RlbnRlO1xyXG5cclxuICBjb25zdCBbdHJhbnNEYXRlLCBzZXRUcmFuc0RhdGVdID0gdXNlU3RhdGUoaW5pdGlhbFRyYW5zRGF0ZSk7XHJcbiAgY29uc3QgW3Zpc2l0VHlwZSwgc2V0VmlzaXRUeXBlXSA9IHVzZVN0YXRlKGluaXRpYWxWaXNpdFR5cGUpO1xyXG4gIGNvbnN0IFthc2lzdGVudGVUaXBvLCBzZXRBc2lzdGVudGVUaXBvXSA9IHVzZVN0YXRlKGluaXRpYWxBc2lzdGVudGUpO1xyXG4gIGNvbnN0IFtkZXNjcmlwdGlvbiwgc2V0RGVzY3JpcHRpb25dID0gdXNlU3RhdGUoU3RyaW5nKGRldGFpbC5kZXNjcmlwdGlvbiA/PyBkZXRhaWwuRGVzY3JpcHRpb24gPz8gXCJcIikpO1xyXG4gIGNvbnN0IFtjb21lbnRhcmlvcywgc2V0Q29tZW50YXJpb3NdID0gdXNlU3RhdGUoU3RyaW5nKGRldGFpbC5jb21lbnRhcmlvcyA/PyBkZXRhaWwuQ29tZW50YXJpb3MgPz8gXCJcIikpO1xyXG4gIGNvbnN0IFthbnRlY2VkZW50ZXMsIHNldEFudGVjZWRlbnRlc10gPSB1c2VTdGF0ZShTdHJpbmcoZGV0YWlsLmFudGVjZWRlbnRlcyA/PyBkZXRhaWwuQW50ZWNlZGVudGVzID8/IFwiXCIpKTtcclxuICBjb25zdCBbY29uY2x1c2lvbmVzLCBzZXRDb25jbHVzaW9uZXNdID0gdXNlU3RhdGUoU3RyaW5nKGRldGFpbC5jb25jbHVzaW9uZXMgPz8gZGV0YWlsLkNvbmNsdXNpb25lcyA/PyBcIlwiKSk7XHJcbiAgY29uc3QgW3N0YXR1cywgc2V0U3RhdHVzXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtidXN5LCBzZXRCdXN5XSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbaXNFZGl0aW5nLCBzZXRJc0VkaXRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtpc0h5ZHJhdGluZywgc2V0SXNIeWRyYXRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFttb2RhbEVycm9yLCBzZXRNb2RhbEVycm9yXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IHJlYWRPbmx5U3VyZmFjZVJlZiA9IHVzZVJlZihudWxsKTtcclxuICBjb25zdCBlZGl0U25hcHNob3RSZWYgPSB1c2VSZWYobnVsbCk7XHJcblxyXG4gIGNvbnN0IHJlY0lkID0gYWN0aXZpdHlSZWNJZDtcclxuICBjb25zdCBhY2NvdW50TnVtID0gU3RyaW5nKGRldGFpbC5hY2NvdW50TnVtID8/IGRldGFpbC5BY2NvdW50TnVtID8/IFwiXCIpO1xyXG4gIGNvbnN0IGFjdGl2aWRhZElkID0gU3RyaW5nKGRldGFpbC5hY3RpdmlkYWRJZCA/PyBkZXRhaWwuQWN0aXZpZGFkSWQgPz8gXCJcIik7XHJcblxyXG4gIGNvbnN0IHsgZWRpdE1vZGVLZXlSZWYsIHN5bmNFZGl0TW9kZUZsYWcsIGNsZWFyRHJhZnQsIGFwcGx5RHJhZnRWYWx1ZXMgfSA9IHVzZURldGFpbEVkaXRTZXNzaW9uKHtcclxuICAgIGFjdGl2aWRhZElkLFxyXG4gICAgcmVjSWQsXHJcbiAgICBjYW5FZGl0SGlzdG9yeSxcclxuICAgIGlzRWRpdGluZyxcclxuICAgIHNldElzRWRpdGluZyxcclxuICAgIHRyYW5zRGF0ZSxcclxuICAgIHZpc2l0VHlwZSxcclxuICAgIGFzaXN0ZW50ZVRpcG8sXHJcbiAgICBkZXNjcmlwdGlvbixcclxuICAgIGNvbWVudGFyaW9zLFxyXG4gICAgYW50ZWNlZGVudGVzLFxyXG4gICAgY29uY2x1c2lvbmVzLFxyXG4gICAgc2V0VHJhbnNEYXRlLFxyXG4gICAgc2V0VmlzaXRUeXBlLFxyXG4gICAgc2V0QXNpc3RlbnRlVGlwbyxcclxuICAgIHNldERlc2NyaXB0aW9uLFxyXG4gICAgc2V0Q29tZW50YXJpb3MsXHJcbiAgICBzZXRBbnRlY2VkZW50ZXMsXHJcbiAgICBzZXRDb25jbHVzaW9uZXMsXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IGhhc1NlcnZlckRldGFpbCA9XHJcbiAgICBoYXNWYWx1ZShyZWNJZCkgJiZcclxuICAgIGhhc1ZhbHVlKGFjY291bnROdW0pICYmXHJcbiAgICBoYXNWYWx1ZShkZXRhaWwudHJhbnNEYXRlIHx8IGRldGFpbC5UcmFuc0RhdGUgfHwgXCJcIik7XHJcblxyXG4gIGNvbnN0IHNob3VsZEh5ZHJhdGUgPSAhIWFjdGl2aWRhZElkICYmICFoYXNTZXJ2ZXJEZXRhaWw7XHJcblxyXG4gIGNvbnN0IG9wZW5UZXh0RWRpdG9yID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoXHJcbiAgICAgIGZpZWxkSWQ6IHN0cmluZyxcclxuICAgICAgZmllbGRMYWJlbDogc3RyaW5nLFxyXG4gICAgICBmaWVsZFZhbHVlOiBzdHJpbmcsXHJcbiAgICAgIG9wdGlvbnM6IHsgYWxsb3dFZGl0PzogYm9vbGVhbjsgcmVhZE9ubHk/OiBib29sZWFuOyBlZGl0TW9kZUtleT86IHN0cmluZyB9ID0ge31cclxuICAgICkgPT4ge1xyXG4gICAgICBuYXZpZ2F0ZVRvVGV4dEVkaXRvckZpZWxkKHtcclxuICAgICAgICBmaWVsZElkLFxyXG4gICAgICAgIGZpZWxkTGFiZWwsXHJcbiAgICAgICAgZmllbGRWYWx1ZSxcclxuICAgICAgICByZWFkT25seTogb3B0aW9ucz8ucmVhZE9ubHkgPT09IHRydWUsXHJcbiAgICAgICAgYWxsb3dFZGl0OiBvcHRpb25zPy5hbGxvd0VkaXQgIT09IGZhbHNlLFxyXG4gICAgICAgIGVkaXRNb2RlS2V5OiBvcHRpb25zPy5lZGl0TW9kZUtleSxcclxuICAgICAgICBlZGl0TW9kZVJldHVyblR0bE1zOiBFRElUT1JfUkVUVVJOX0ZMQUdfVFRMX01TLFxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBbXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUNvbWVudGFyaW9zVGFwID0gdXNlQ2FsbGJhY2soKGV2ZW50KSA9PiB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgb3BlblRleHRFZGl0b3IoZmllbGRJZENvbWVudGFyaW9zLCBpbmRUKFwiVmlzaXRzX0ZpZWxkX0NvbW1lbnRzXCIsIFwiQ29tbWVudHNcIiksIGNvbWVudGFyaW9zLCB7XHJcbiAgICAgIHJlYWRPbmx5OiAhaXNFZGl0aW5nLFxyXG4gICAgICBhbGxvd0VkaXQ6IGNhbkVkaXRIaXN0b3J5LFxyXG4gICAgICBlZGl0TW9kZUtleTogZWRpdE1vZGVLZXlSZWYuY3VycmVudFxyXG4gICAgfSk7XHJcbiAgfSwgW2NvbWVudGFyaW9zLCBpc0VkaXRpbmcsIGNhbkVkaXRIaXN0b3J5LCBvcGVuVGV4dEVkaXRvcl0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVDb21lbnRhcmlvc0hvbGQgPSB1c2VDYWxsYmFjaygodGFyZ2V0LCBjbGllbnRZKSA9PiB7XHJcbiAgICBpZiAoIXRhcmdldCB8fCAhaXNPdmVyZmxvd2luZyh0YXJnZXQpKSByZXR1cm4gZmFsc2U7XHJcbiAgICBzZXRQcmV2aWV3QW5jaG9yKHRhcmdldCk7XHJcbiAgICByZXR1cm4gc2hvd1ByZXZpZXdUb29sdGlwKFN0cmluZyhjb21lbnRhcmlvcyB8fCBcIlwiKSwgY2xpZW50WSk7XHJcbiAgfSwgW2NvbWVudGFyaW9zXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUFudGVjZWRlbnRlc1RhcCA9IHVzZUNhbGxiYWNrKChldmVudCkgPT4ge1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIG9wZW5UZXh0RWRpdG9yKGZpZWxkSWRBbnRlY2VkZW50ZXMsIGluZFQoXCJWaXNpdHNfRmllbGRfQmFja2dyb3VuZFwiLCBcIkJhY2tncm91bmRcIiksIGFudGVjZWRlbnRlcywge1xyXG4gICAgICByZWFkT25seTogIWlzRWRpdGluZyxcclxuICAgICAgYWxsb3dFZGl0OiBjYW5FZGl0SGlzdG9yeSxcclxuICAgICAgZWRpdE1vZGVLZXk6IGVkaXRNb2RlS2V5UmVmLmN1cnJlbnRcclxuICAgIH0pO1xyXG4gIH0sIFthbnRlY2VkZW50ZXMsIGlzRWRpdGluZywgY2FuRWRpdEhpc3RvcnksIG9wZW5UZXh0RWRpdG9yXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUFudGVjZWRlbnRlc0hvbGQgPSB1c2VDYWxsYmFjaygodGFyZ2V0LCBjbGllbnRZKSA9PiB7XHJcbiAgICBpZiAoIXRhcmdldCB8fCAhaXNPdmVyZmxvd2luZyh0YXJnZXQpKSByZXR1cm4gZmFsc2U7XHJcbiAgICBzZXRQcmV2aWV3QW5jaG9yKHRhcmdldCk7XHJcbiAgICByZXR1cm4gc2hvd1ByZXZpZXdUb29sdGlwKFN0cmluZyhhbnRlY2VkZW50ZXMgfHwgXCJcIiksIGNsaWVudFkpO1xyXG4gIH0sIFthbnRlY2VkZW50ZXNdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQ29uY2x1c2lvbmVzVGFwID0gdXNlQ2FsbGJhY2soKGV2ZW50KSA9PiB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgb3BlblRleHRFZGl0b3IoZmllbGRJZENvbmNsdXNpb25lcywgaW5kVChcIlZpc2l0c19GaWVsZF9Db25jbHVzaW9uc1wiLCBcIkNvbmNsdXNpb25zXCIpLCBjb25jbHVzaW9uZXMsIHtcclxuICAgICAgcmVhZE9ubHk6ICFpc0VkaXRpbmcsXHJcbiAgICAgIGFsbG93RWRpdDogY2FuRWRpdEhpc3RvcnksXHJcbiAgICAgIGVkaXRNb2RlS2V5OiBlZGl0TW9kZUtleVJlZi5jdXJyZW50XHJcbiAgICB9KTtcclxuICB9LCBbY29uY2x1c2lvbmVzLCBpc0VkaXRpbmcsIGNhbkVkaXRIaXN0b3J5LCBvcGVuVGV4dEVkaXRvcl0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVDb25jbHVzaW9uZXNIb2xkID0gdXNlQ2FsbGJhY2soKHRhcmdldCwgY2xpZW50WSkgPT4ge1xyXG4gICAgaWYgKCF0YXJnZXQgfHwgIWlzT3ZlcmZsb3dpbmcodGFyZ2V0KSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgc2V0UHJldmlld0FuY2hvcih0YXJnZXQpO1xyXG4gICAgcmV0dXJuIHNob3dQcmV2aWV3VG9vbHRpcChTdHJpbmcoY29uY2x1c2lvbmVzIHx8IFwiXCIpLCBjbGllbnRZKTtcclxuICB9LCBbY29uY2x1c2lvbmVzXSk7XHJcblxyXG4gIGNvbnN0IGNvbWVudGFyaW9zVGFwID0gdXNlVGFwR3VhcmQoaGFuZGxlQ29tZW50YXJpb3NUYXAsIGhhbmRsZUNvbWVudGFyaW9zSG9sZCk7XHJcbiAgY29uc3QgYW50ZWNlZGVudGVzVGFwID0gdXNlVGFwR3VhcmQoaGFuZGxlQW50ZWNlZGVudGVzVGFwLCBoYW5kbGVBbnRlY2VkZW50ZXNIb2xkKTtcclxuICBjb25zdCBjb25jbHVzaW9uZXNUYXAgPSB1c2VUYXBHdWFyZChoYW5kbGVDb25jbHVzaW9uZXNUYXAsIGhhbmRsZUNvbmNsdXNpb25lc0hvbGQpO1xyXG5cclxuICBjb25zdCB0ZXh0RWRpdG9yQmluZGluZ3MgPSB1c2VNZW1vKFxyXG4gICAgKCkgPT4gW1xyXG4gICAgICB7IGZpZWxkSWQ6IGZpZWxkSWRDb21lbnRhcmlvcywgYXBwbHlWYWx1ZTogc2V0Q29tZW50YXJpb3MgfSxcclxuICAgICAgeyBmaWVsZElkOiBmaWVsZElkQW50ZWNlZGVudGVzLCBhcHBseVZhbHVlOiBzZXRBbnRlY2VkZW50ZXMgfSxcclxuICAgICAgeyBmaWVsZElkOiBmaWVsZElkQ29uY2x1c2lvbmVzLCBhcHBseVZhbHVlOiBzZXRDb25jbHVzaW9uZXMgfSxcclxuICAgIF0sXHJcbiAgICBbZmllbGRJZEFudGVjZWRlbnRlcywgZmllbGRJZENvbWVudGFyaW9zLCBmaWVsZElkQ29uY2x1c2lvbmVzXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IHsgYXBwbHlWYWx1ZXM6IGFwcGx5VGV4dEVkaXRvclZhbHVlcyB9ID0gdXNlVGV4dEVkaXRvckZpZWxkcyh0ZXh0RWRpdG9yQmluZGluZ3MsIHtcclxuICAgIGFwcGx5T25Nb3VudDogIWFjdGl2aWRhZElkLFxyXG4gICAgbGlzdGVuUGFnZVNob3c6IHRydWUsXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IHsgbW9kYWwsIG9wZW5Db25maXJtLCBjbG9zZUNvbmZpcm0sIGhhbmRsZUNvbmZpcm0gfSA9IHVzZUNvbmZpcm1EaWFsb2coe1xyXG4gICAgZGVmYXVsdENvbmZpcm1UZXh0OiBpbmRUKFwiQ29uZmlybV9ZZXNcIiwgXCJDb25maXJtX1llc1wiKSxcclxuICAgIGRlZmF1bHRDYW5jZWxUZXh0OiBpbmRUKFwiQ29uZmlybV9Ob1wiLCBcIkNvbmZpcm1fTm9cIilcclxuICB9KTtcclxuXHJcbiAgY29uc3QgaGFuZGxlTW9kYWxDb25maXJtID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgc2V0TW9kYWxFcnJvcihcIlwiKTtcclxuICAgIGF3YWl0IGhhbmRsZUNvbmZpcm0oe1xyXG4gICAgICBidXN5LFxyXG4gICAgICBvbkVycm9yOiAobXNnKSA9PiB7XHJcbiAgICAgICAgc2V0TW9kYWxFcnJvcihtc2cpO1xyXG4gICAgICAgIHNldFN0YXR1cyhtc2cpO1xyXG4gICAgICAgIGZsYXNoQWN0aW9uTWFyayhcImVycm9yUHJvY2Vzc1wiLCAxNTAwKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSwgW2J1c3ksIGhhbmRsZUNvbmZpcm1dKTtcclxuXHJcbiAgY29uc3QgbW9kYWxMb2FkaW5nVGV4dCA9IGluZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkNvbW1vbl9Mb2FkaW5nXCIpO1xyXG4gIGNvbnN0IG1vZGFsQ2FuY2VsVGV4dCA9IG1vZGFsLmNhbmNlbFRleHQgfHwgaW5kVChcIkNvbmZpcm1fTm9cIiwgXCJDb25maXJtX05vXCIpO1xyXG4gIGNvbnN0IG1vZGFsQ29uZmlybVRleHQgPSBidXN5XHJcbiAgICA/IG1vZGFsTG9hZGluZ1RleHRcclxuICAgIDogKCFidXN5ICYmIG1vZGFsRXJyb3IgPyBpbmRUKFwiQ29tbW9uX09LXCIsIFwiQ29tbW9uX09LXCIpIDogKG1vZGFsLmNvbmZpcm1UZXh0IHx8IGluZFQoXCJDb25maXJtX1llc1wiLCBcIkNvbmZpcm1fWWVzXCIpKSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZU1vZGFsQnV0dG9uQ29uZmlybSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmICghYnVzeSAmJiBtb2RhbEVycm9yKSB7XHJcbiAgICAgIGNsb3NlQ29uZmlybSgpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBoYW5kbGVNb2RhbENvbmZpcm0oKTtcclxuICB9LCBbYnVzeSwgbW9kYWxFcnJvciwgY2xvc2VDb25maXJtLCBoYW5kbGVNb2RhbENvbmZpcm1dKTtcclxuXHJcbiAgY29uc3QgaGFzQWN0aXZlUHJvY2VzcyA9IHVzZU1lbW8oKCkgPT4gYnVzeSB8fCBpc0VkaXRpbmcsIFtidXN5LCBpc0VkaXRpbmddKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIHdpbmRvdy5fX2luZFNldE5hdmlnYXRpb25HdWFyZD8uKGhhc0FjdGl2ZVByb2Nlc3MpO1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgd2luZG93Ll9faW5kQ2xlYXJOYXZpZ2F0aW9uR3VhcmQ/LigpO1xyXG4gICAgfTtcclxuICB9LCBbaGFzQWN0aXZlUHJvY2Vzc10pO1xyXG5cclxuICB1c2VEZXRhaWxIeWRyYXRpb24oe1xyXG4gICAgYWN0aXZpZGFkSWQsXHJcbiAgICBzaG91bGRIeWRyYXRlLFxyXG4gICAgdmlzaXRUeXBlcyxcclxuICAgIGFzaXN0ZW50ZVRpcG9zLFxyXG4gICAgZGVmYXVsdFZpc2l0VHlwZSxcclxuICAgIGluaXRpYWxBc2lzdGVudGUsXHJcbiAgICBub3JtYWxpemVEYXRlVG9JbnB1dCxcclxuICAgIG1hdGNoT3B0aW9uVmFsdWUsXHJcbiAgICBhcHBseURyYWZ0VmFsdWVzLFxyXG4gICAgYXBwbHlUZXh0RWRpdG9yVmFsdWVzLFxyXG4gICAgc2V0U3RhdHVzLFxyXG4gICAgc2V0SXNIeWRyYXRpbmcsXHJcbiAgICBzZXRUcmFuc0RhdGUsXHJcbiAgICBzZXRWaXNpdFR5cGUsXHJcbiAgICBzZXRBc2lzdGVudGVUaXBvLFxyXG4gICAgc2V0RGVzY3JpcHRpb24sXHJcbiAgICBzZXRDb21lbnRhcmlvcyxcclxuICAgIHNldEFudGVjZWRlbnRlcyxcclxuICAgIHNldENvbmNsdXNpb25lcyxcclxuICB9KTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IGVsID0gcmVhZE9ubHlTdXJmYWNlUmVmLmN1cnJlbnQ7XHJcbiAgICBpZiAoIWVsKSByZXR1cm47XHJcbiAgICBpZiAoIWlzRWRpdGluZykge1xyXG4gICAgICBlbC5jbGFzc0xpc3QuYWRkKFwiaW5kLXJlYWRvbmx5LXN1cmZhY2VcIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiaW5kLXJlYWRvbmx5LXN1cmZhY2VcIik7XHJcbiAgICB9XHJcbiAgfSwgW2lzRWRpdGluZ10pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKGlzRWRpdGluZykge1xyXG4gICAgICBpZiAoIWVkaXRTbmFwc2hvdFJlZi5jdXJyZW50KSB7XHJcbiAgICAgICAgZWRpdFNuYXBzaG90UmVmLmN1cnJlbnQgPSB7XHJcbiAgICAgICAgICB0cmFuc0RhdGUsXHJcbiAgICAgICAgICB2aXNpdFR5cGUsXHJcbiAgICAgICAgICBhc2lzdGVudGVUaXBvLFxyXG4gICAgICAgICAgZGVzY3JpcHRpb24sXHJcbiAgICAgICAgICBjb21lbnRhcmlvcyxcclxuICAgICAgICAgIGFudGVjZWRlbnRlcyxcclxuICAgICAgICAgIGNvbmNsdXNpb25lc1xyXG4gICAgICAgIH07XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgZWRpdFNuYXBzaG90UmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gIH0sIFtpc0VkaXRpbmcsIHRyYW5zRGF0ZSwgdmlzaXRUeXBlLCBhc2lzdGVudGVUaXBvLCBkZXNjcmlwdGlvbiwgY29tZW50YXJpb3MsIGFudGVjZWRlbnRlcywgY29uY2x1c2lvbmVzXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoaXNFZGl0aW5nKSByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgcmV0dXJuIGJpbmRSZWFkT25seUd1YXJkKHJlYWRPbmx5U3VyZmFjZVJlZi5jdXJyZW50KTtcclxuICB9LCBbaXNFZGl0aW5nXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUVuYWJsZUVkaXQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAoIWNhbkVkaXRIaXN0b3J5KSB7XHJcbiAgICAgIHNob3dQZXJtaXNzaW9uTW9kYWwoKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgc2V0SXNFZGl0aW5nKHRydWUpO1xyXG4gICAgc3luY0VkaXRNb2RlRmxhZyh0cnVlKTtcclxuICAgIHNldFN0YXR1cyhpbmRUKFwiVmlzaXRzX0RldGFpbF9FZGl0aW5nRW5hYmxlZFwiLCBcIkVkaXRpbmcgZW5hYmxlZFwiKSk7XHJcbiAgfSwgW2NhbkVkaXRIaXN0b3J5LCBzeW5jRWRpdE1vZGVGbGFnXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUNhbmNlbEVkaXQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAoIWlzRWRpdGluZykgcmV0dXJuO1xyXG4gICAgc2V0SXNFZGl0aW5nKGZhbHNlKTtcclxuICAgIHN5bmNFZGl0TW9kZUZsYWcoZmFsc2UpO1xyXG4gICAgY2xlYXJEcmFmdCgpO1xyXG4gICAgc2V0U3RhdHVzKGluZFQoXCJDb21tb25fQ2FuY2VsXCIsIFwiQ2FuY2VsXCIpKTtcclxuICAgIHdpbmRvdy5fX2luZEJ5cGFzc05hdmlnYXRpb25HdWFyZE9uY2U/LigpO1xyXG4gICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gIH0sIFtpc0VkaXRpbmcsIHN5bmNFZGl0TW9kZUZsYWcsIGNsZWFyRHJhZnRdKTtcclxuXHJcbiAgY29uc3QgeyBoYW5kbGVVcGRhdGUsIGhhbmRsZURlbGV0ZSB9ID0gdXNlRGV0YWlsTXV0YXRpb25zKHtcclxuICAgIGJ1c3ksXHJcbiAgICBpc0VkaXRpbmcsXHJcbiAgICBjYW5FZGl0SGlzdG9yeSxcclxuICAgIGNhbkRlbGV0ZUhpc3RvcnksXHJcbiAgICByZWNJZCxcclxuICAgIGFjY291bnROdW0sXHJcbiAgICB0cmFuc0RhdGUsXHJcbiAgICB2aXNpdFR5cGUsXHJcbiAgICBhc2lzdGVudGVUaXBvLFxyXG4gICAgZGVzY3JpcHRpb24sXHJcbiAgICBjb21lbnRhcmlvcyxcclxuICAgIGFudGVjZWRlbnRlcyxcclxuICAgIGNvbmNsdXNpb25lcyxcclxuICAgIHZpc2l0VHlwZXMsXHJcbiAgICBhc2lzdGVudGVUaXBvcyxcclxuICAgIGRlZmF1bHRWaXNpdFR5cGUsXHJcbiAgICByYXdJbml0aWFsVmlzaXRUeXBlLFxyXG4gICAgcmF3SW5pdGlhbEFzaXN0ZW50ZSxcclxuICAgIG1hdGNoT3B0aW9uVmFsdWUsXHJcbiAgICBjbGVhckRyYWZ0LFxyXG4gICAgc3luY0VkaXRNb2RlRmxhZyxcclxuICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICBzZXRCdXN5LFxyXG4gICAgc2V0U3RhdHVzLFxyXG4gICAgc2V0SXNFZGl0aW5nLFxyXG4gIH0pO1xyXG5cclxuICB1c2VEZXRhaWxUb3BiYXJBY3Rpb25zKHtcclxuICAgIGJ1c3ksXHJcbiAgICBtb2RhbE9wZW46IG1vZGFsLm9wZW4sXHJcbiAgICBpc0VkaXRpbmcsXHJcbiAgICBjYW5FZGl0SGlzdG9yeSxcclxuICAgIGNhbkRlbGV0ZUhpc3RvcnksXHJcbiAgICB0cmFuc0RhdGUsXHJcbiAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgaGFuZGxlRW5hYmxlRWRpdCxcclxuICAgIGhhbmRsZUNhbmNlbEVkaXQsXHJcbiAgICBoYW5kbGVVcGRhdGUsXHJcbiAgICBoYW5kbGVEZWxldGUsXHJcbiAgICBvcGVuQ29uZmlybSxcclxuICAgIGNsb3NlQ29uZmlybSxcclxuICB9KTtcclxuXHJcbiAgY29uc3QgZGVzY3JpcHRpb25MYWJlbCA9IGluZFQoXCJWaXNpdHNfRmllbGRfRGVzY3JpcHRpb25cIiwgXCJEZXNjcmlwdGlvblwiKTtcclxuICBjb25zdCBjb21tZW50c0xhYmVsID0gaW5kVChcIlZpc2l0c19GaWVsZF9Db21tZW50c1wiLCBcIkNvbW1lbnRzXCIpO1xyXG4gIGNvbnN0IGJhY2tncm91bmRMYWJlbCA9IGluZFQoXCJWaXNpdHNfRmllbGRfQmFja2dyb3VuZFwiLCBcIkJhY2tncm91bmRcIik7XHJcbiAgY29uc3QgY29uY2x1c2lvbnNMYWJlbCA9IGluZFQoXCJWaXNpdHNfRmllbGRfQ29uY2x1c2lvbnNcIiwgXCJDb25jbHVzaW9uc1wiKTtcclxuICBjb25zdCBkZXRhaWxEZXNjcmlwdGlvbkNsYXNzTmFtZSA9IGNsYXNzTmFtZXMoXHJcbiAgICBcImZvcm0tY29udHJvbFwiLFxyXG4gICAgaXNFZGl0aW5nID8gXCJib3JkZXItc2xhdGUtMjAwIHRleHQtc2xhdGUtOTAwXCIgOiBcImJvcmRlci1zbGF0ZS0yMDAgaW5kLXJlYWRvbmx5LWZpZWxkXCJcclxuICApO1xyXG4gIGNvbnN0IGRldGFpbFJlYWRPbmx5Q2xhc3NOYW1lID0gY2xhc3NOYW1lcyhcImZvcm0tY29udHJvbCBjdXJzb3ItcG9pbnRlclwiLCAhaXNFZGl0aW5nID8gXCJpbmQtcmVhZG9ubHktZmllbGRcIiA6IFwiXCIpO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTRcIj5cclxuICAgICAgPENvbmZpcm1Nb2RhbFxyXG4gICAgICAgIG9wZW49e21vZGFsLm9wZW59XHJcbiAgICAgICAgdGl0bGU9e21vZGFsLnRpdGxlfVxyXG4gICAgICAgIG1lc3NhZ2U9e21vZGFsLm1lc3NhZ2V9XHJcbiAgICAgICAgY29uZmlybVRleHQ9e21vZGFsQ29uZmlybVRleHR9XHJcbiAgICAgICAgY2FuY2VsVGV4dD17bW9kYWxDYW5jZWxUZXh0fVxyXG4gICAgICAgIGxvYWRpbmdUZXh0PXttb2RhbExvYWRpbmdUZXh0fVxyXG4gICAgICAgIHNob3dDYW5jZWw9e21vZGFsLnNob3dDYW5jZWx9XHJcbiAgICAgICAgc2hvd0NvbmZpcm09e21vZGFsLnNob3dDb25maXJtfVxyXG4gICAgICAgIGJ1c3k9e2J1c3l9XHJcbiAgICAgICAgZXJyb3I9e21vZGFsRXJyb3J9XHJcbiAgICAgICAgc3RhdHVzPXtzdGF0dXN9XHJcbiAgICAgICAgb25Db25maXJtPXtoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm19XHJcbiAgICAgICAgb25DYW5jZWw9e2Nsb3NlQ29uZmlybX1cclxuICAgICAgLz5cclxuICAgICAgPGRpdlxyXG4gICAgICAgIHJlZj17cmVhZE9ubHlTdXJmYWNlUmVmfVxyXG4gICAgICAgIGNsYXNzTmFtZT1cInJlbGF0aXZlIHNoYWRvdy14cyBnbGFzcy1wYW5lbCBwLTQgc3BhY2UteS00IGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHJvdW5kZWQtMnhsXCJcclxuICAgICAgPlxyXG4gICAgICAgIHtpc0h5ZHJhdGluZyAmJiAoXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgei0xMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBiZy13aGl0ZS83MCByb3VuZGVkLTJ4bFwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQtc20gdGV4dC1zbGF0ZS02MDBcIj5cclxuICAgICAgICAgICAgICA8U3Bpbm5lciBzaXplPVwiaC01IHctNVwiIC8+XHJcbiAgICAgICAgICAgICAgPHNwYW4+e2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9PC9zcGFuPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICl9XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTIgZ2FwLTQgcHQtMVwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ2aXNpdGEtZmllbGQtdGV4dFwiPlxyXG4gICAgICAgICAgICA8U2luZ2xlRGF0ZVBpY2tlclxyXG4gICAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiVmlzaXRzX0RldGFpbF9EYXRlX0xhYmVsXCIsIFwiRGF0ZVwiKX1cclxuICAgICAgICAgICAgICB2YWx1ZT17dHJhbnNEYXRlfVxyXG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXtzZXRUcmFuc0RhdGV9XHJcbiAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFpc0VkaXRpbmd9XHJcbiAgICAgICAgICAgICAgcmVhZE9ubHk9eyFpc0VkaXRpbmd9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxTZWxlY3RDb21ib2JveFxyXG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIlZpc2l0c19EZXRhaWxfVmlzaXRUeXBlX0xhYmVsXCIsIFwiVmlzaXQgdHlwZVwiKX1cclxuICAgICAgICAgICAgb3B0aW9ucz17dmlzaXRUeXBlc31cclxuICAgICAgICAgICAgdmFsdWU9e3Zpc2l0VHlwZX1cclxuICAgICAgICAgICAgb25DaGFuZ2U9e3NldFZpc2l0VHlwZX1cclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJWaXNpdHNfRGV0YWlsX1Zpc2l0VHlwZV9QbGFjZWhvbGRlclwiLCBcIlNlbGVjdCB0eXBlXCIpfVxyXG4gICAgICAgICAgICBkaXNhYmxlZD17IWlzRWRpdGluZ31cclxuICAgICAgICAgICAgcmVhZE9ubHk9eyFpc0VkaXRpbmd9XHJcbiAgICAgICAgICAgIHVzZVBvcnRhbD17ZmFsc2V9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICA8VmlzaXROYXJyYXRpdmVGaWVsZHNcclxuICAgICAgICAgIGRlc2NyaXB0aW9uTGFiZWw9e2Rlc2NyaXB0aW9uTGFiZWx9XHJcbiAgICAgICAgICBkZXNjcmlwdGlvblZhbHVlPXtkZXNjcmlwdGlvbn1cclxuICAgICAgICAgIGRlc2NyaXB0aW9uQ2xhc3NOYW1lPXtkZXRhaWxEZXNjcmlwdGlvbkNsYXNzTmFtZX1cclxuICAgICAgICAgIGRlc2NyaXB0aW9uRGlzYWJsZWQ9eyFpc0VkaXRpbmd9XHJcbiAgICAgICAgICBvbkRlc2NyaXB0aW9uQ2hhbmdlPXtzZXREZXNjcmlwdGlvbn1cclxuICAgICAgICAgIHRhcEZpZWxkcz17W1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgaWQ6IFwiY29tZW50YXJpb3NcIixcclxuICAgICAgICAgICAgICBsYWJlbDogY29tbWVudHNMYWJlbCxcclxuICAgICAgICAgICAgICB2YWx1ZTogY29tZW50YXJpb3MsXHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lOiBkZXRhaWxSZWFkT25seUNsYXNzTmFtZSxcclxuICAgICAgICAgICAgICBwb2ludGVyQmluZGluZ3M6IGNvbWVudGFyaW9zVGFwLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgaWQ6IFwiYW50ZWNlZGVudGVzXCIsXHJcbiAgICAgICAgICAgICAgbGFiZWw6IGJhY2tncm91bmRMYWJlbCxcclxuICAgICAgICAgICAgICB2YWx1ZTogYW50ZWNlZGVudGVzLFxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZTogZGV0YWlsUmVhZE9ubHlDbGFzc05hbWUsXHJcbiAgICAgICAgICAgICAgcG9pbnRlckJpbmRpbmdzOiBhbnRlY2VkZW50ZXNUYXAsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBpZDogXCJjb25jbHVzaW9uZXNcIixcclxuICAgICAgICAgICAgICBsYWJlbDogY29uY2x1c2lvbnNMYWJlbCxcclxuICAgICAgICAgICAgICB2YWx1ZTogY29uY2x1c2lvbmVzLFxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZTogZGV0YWlsUmVhZE9ubHlDbGFzc05hbWUsXHJcbiAgICAgICAgICAgICAgcG9pbnRlckJpbmRpbmdzOiBjb25jbHVzaW9uZXNUYXAsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICBdfVxyXG4gICAgICAgIC8+XHJcblxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTMgdGV4dC1zbSB0ZXh0LXNsYXRlLTYwMFwiPlxyXG4gICAgICAgICAgPHNwYW4+e3N0YXR1c308L3NwYW4+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbi8vIERldGFpbCBVSSB3cmFwcGVkIGJ5IHRoZSBlcnJvciBib3VuZGFyeS5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRGV0YWlsRm9ybSgpIHtcclxuICByZXR1cm4gKFxyXG4gICAgPEFwcEVycm9yQm91bmRhcnkgZmFsbGJhY2tNZXNzYWdlPXtpbmRUKFwiVmlzaXRzX0RldGFpbF9FcnJvckJvdW5kYXJ5XCIsIFwiQW4gZXJyb3Igb2NjdXJyZWQgd2hpbGUgcmVuZGVyaW5nIHRoZSBkZXRhaWwgcGFnZS4gUmVsb2FkIGFuZCB0cnkgYWdhaW4uXCIpfT5cclxuICAgICAgPERldGFpbEFwcCAvPlxyXG4gICAgPC9BcHBFcnJvckJvdW5kYXJ5PlxyXG4gICk7XHJcbn1cclxuIiwgImV4cG9ydCBjb25zdCBiaW5kUmVhZE9ubHlHdWFyZCA9IChlbDogSFRNTEVsZW1lbnQgfCBudWxsKSA9PiB7XHJcbiAgaWYgKCFlbCkgcmV0dXJuICgpID0+IHt9O1xyXG4gIGNvbnN0IGNhbmNlbCA9IChldmVudDogRXZlbnQpID0+IGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgY29uc3QgZXZlbnRzID0gW1wiY29udGV4dG1lbnVcIiwgXCJzZWxlY3RzdGFydFwiLCBcImNvcHlcIiwgXCJjdXRcIiwgXCJwYXN0ZVwiXTtcclxuICBldmVudHMuZm9yRWFjaCgoZXZ0KSA9PiBlbC5hZGRFdmVudExpc3RlbmVyKGV2dCwgY2FuY2VsKSk7XHJcbiAgcmV0dXJuICgpID0+IHtcclxuICAgIGV2ZW50cy5mb3JFYWNoKChldnQpID0+IGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0LCBjYW5jZWwpKTtcclxuICB9O1xyXG59O1xyXG4iLCAiZXhwb3J0IGNvbnN0IGhhc1ZhbHVlID0gKHZhbHVlOiB1bmtub3duKSA9PiBTdHJpbmcodmFsdWUgfHwgXCJcIikudHJpbSgpLmxlbmd0aCA+IDA7XHJcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0IH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IGZldGNoSnNvbiB9IGZyb20gXCIuLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5cclxudHlwZSBPcHRpb25MaWtlID0ge1xyXG4gIHZhbHVlPzogc3RyaW5nIHwgbnVtYmVyO1xyXG4gIFZhbHVlPzogc3RyaW5nIHwgbnVtYmVyO1xyXG4gIHRleHQ/OiBzdHJpbmc7XHJcbiAgVGV4dD86IHN0cmluZztcclxufTtcclxuXHJcbnR5cGUgQWN0aXZpdHlEZXRhaWxSZWNvcmQgPSBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPjtcclxuXHJcbnR5cGUgQWN0aXZpdHlEZXRhaWxSZXNwb25zZSA9IHtcclxuICBzdWNjZXNzPzogYm9vbGVhbjtcclxuICBtZXNzYWdlPzogc3RyaW5nO1xyXG4gIGRhdGE/OiBBY3Rpdml0eURldGFpbFJlY29yZCB8IG51bGw7XHJcbiAgU3VjY2Vzcz86IGJvb2xlYW47XHJcbiAgTWVzc2FnZT86IHN0cmluZztcclxuICBEYXRhPzogQWN0aXZpdHlEZXRhaWxSZWNvcmQgfCBudWxsO1xyXG59O1xyXG5cclxuY29uc3QgaXNSZXNwb25zZVN1Y2Nlc3MgPSAocmVzcG9uc2U6IEFjdGl2aXR5RGV0YWlsUmVzcG9uc2UpOiBib29sZWFuID0+IHtcclxuICByZXR1cm4gcmVzcG9uc2Uuc3VjY2VzcyA9PT0gdHJ1ZSB8fCByZXNwb25zZS5TdWNjZXNzID09PSB0cnVlO1xyXG59O1xyXG5cclxuY29uc3QgZ2V0UmVzcG9uc2VNZXNzYWdlID0gKHJlc3BvbnNlOiBBY3Rpdml0eURldGFpbFJlc3BvbnNlKTogc3RyaW5nID0+IHtcclxuICBjb25zdCByYXcgPSByZXNwb25zZS5tZXNzYWdlID8/IHJlc3BvbnNlLk1lc3NhZ2U7XHJcbiAgcmV0dXJuIHR5cGVvZiByYXcgPT09IFwic3RyaW5nXCIgPyByYXcudHJpbSgpIDogXCJcIjtcclxufTtcclxuXHJcbmNvbnN0IGdldFJlc3BvbnNlRGF0YSA9IChyZXNwb25zZTogQWN0aXZpdHlEZXRhaWxSZXNwb25zZSk6IEFjdGl2aXR5RGV0YWlsUmVjb3JkIHwgbnVsbCA9PiB7XHJcbiAgY29uc3QgZGF0YSA9IHJlc3BvbnNlLmRhdGEgPz8gcmVzcG9uc2UuRGF0YTtcclxuICByZXR1cm4gZGF0YSAmJiB0eXBlb2YgZGF0YSA9PT0gXCJvYmplY3RcIiA/IGRhdGEgOiBudWxsO1xyXG59O1xyXG5cclxuY29uc3QgYXNSZWNvcmQgPSAodmFsdWU6IHVua25vd24pOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiB8IG51bGwgPT4ge1xyXG4gIGlmICghdmFsdWUgfHwgdHlwZW9mIHZhbHVlICE9PSBcIm9iamVjdFwiIHx8IEFycmF5LmlzQXJyYXkodmFsdWUpKSByZXR1cm4gbnVsbDtcclxuICByZXR1cm4gdmFsdWUgYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj47XHJcbn07XHJcblxyXG50eXBlIFVzZURldGFpbEh5ZHJhdGlvbkFyZ3MgPSB7XHJcbiAgYWN0aXZpZGFkSWQ6IHN0cmluZztcclxuICBzaG91bGRIeWRyYXRlOiBib29sZWFuO1xyXG4gIHZpc2l0VHlwZXM6IE9wdGlvbkxpa2VbXTtcclxuICBhc2lzdGVudGVUaXBvczogT3B0aW9uTGlrZVtdO1xyXG4gIGRlZmF1bHRWaXNpdFR5cGU6IHN0cmluZztcclxuICBpbml0aWFsQXNpc3RlbnRlOiBzdHJpbmc7XHJcbiAgbm9ybWFsaXplRGF0ZVRvSW5wdXQ6ICh2YWx1ZTogc3RyaW5nKSA9PiBzdHJpbmc7XHJcbiAgbWF0Y2hPcHRpb25WYWx1ZTogKG9wdGlvbnM6IE9wdGlvbkxpa2VbXSwgcmF3OiB1bmtub3duKSA9PiBzdHJpbmc7XHJcbiAgYXBwbHlEcmFmdFZhbHVlczogKCkgPT4gdm9pZDtcclxuICBhcHBseVRleHRFZGl0b3JWYWx1ZXM6ICgpID0+IHZvaWQ7XHJcbiAgc2V0U3RhdHVzOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBzZXRJc0h5ZHJhdGluZzogKHZhbHVlOiBib29sZWFuKSA9PiB2b2lkO1xyXG4gIHNldFRyYW5zRGF0ZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgc2V0VmlzaXRUeXBlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBzZXRBc2lzdGVudGVUaXBvOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBzZXREZXNjcmlwdGlvbjogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgc2V0Q29tZW50YXJpb3M6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIHNldEFudGVjZWRlbnRlczogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgc2V0Q29uY2x1c2lvbmVzOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxufTtcclxuXHJcbi8vIEtlZXBzIGRldGFpbCBoeWRyYXRpb24gb3JjaGVzdHJhdGlvbiBvdXRzaWRlIHRoZSBwYWdlIGNvbXBvbmVudC5cclxuZXhwb3J0IGNvbnN0IHVzZURldGFpbEh5ZHJhdGlvbiA9ICh7XHJcbiAgYWN0aXZpZGFkSWQsXHJcbiAgc2hvdWxkSHlkcmF0ZSxcclxuICB2aXNpdFR5cGVzLFxyXG4gIGFzaXN0ZW50ZVRpcG9zLFxyXG4gIGRlZmF1bHRWaXNpdFR5cGUsXHJcbiAgaW5pdGlhbEFzaXN0ZW50ZSxcclxuICBub3JtYWxpemVEYXRlVG9JbnB1dCxcclxuICBtYXRjaE9wdGlvblZhbHVlLFxyXG4gIGFwcGx5RHJhZnRWYWx1ZXMsXHJcbiAgYXBwbHlUZXh0RWRpdG9yVmFsdWVzLFxyXG4gIHNldFN0YXR1cyxcclxuICBzZXRJc0h5ZHJhdGluZyxcclxuICBzZXRUcmFuc0RhdGUsXHJcbiAgc2V0VmlzaXRUeXBlLFxyXG4gIHNldEFzaXN0ZW50ZVRpcG8sXHJcbiAgc2V0RGVzY3JpcHRpb24sXHJcbiAgc2V0Q29tZW50YXJpb3MsXHJcbiAgc2V0QW50ZWNlZGVudGVzLFxyXG4gIHNldENvbmNsdXNpb25lcyxcclxufTogVXNlRGV0YWlsSHlkcmF0aW9uQXJncykgPT4ge1xyXG4gIGNvbnN0IGh5ZHJhdGVGcm9tQXBpID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgaWYgKCFhY3RpdmlkYWRJZCkgcmV0dXJuO1xyXG4gICAgc2V0SXNIeWRyYXRpbmcodHJ1ZSk7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaEpzb248QWN0aXZpdHlEZXRhaWxSZXNwb25zZT4oYC9WaXNpdGFzL0dldEFjdGl2aXR5QnlDb2RlP2NvZGU9JHtlbmNvZGVVUklDb21wb25lbnQoYWN0aXZpZGFkSWQpfWApO1xyXG4gICAgICBjb25zdCByZXNwb25zZURhdGEgPSBnZXRSZXNwb25zZURhdGEocmVzKTtcclxuXHJcbiAgICAgIGlmICghaXNSZXNwb25zZVN1Y2Nlc3MocmVzKSB8fCAhcmVzcG9uc2VEYXRhKSB7XHJcbiAgICAgICAgc2V0U3RhdHVzKGdldFJlc3BvbnNlTWVzc2FnZShyZXMpIHx8IGluZFQoXCJWaXNpdHNfRGV0YWlsX0xvYWRBY3Rpdml0eUZhaWxlZFwiLCBcIkZhaWxlZCB0byBsb2FkIGFjdGl2aXR5IGRldGFpbHMuXCIpKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IHJhd0RhdGUgPSBTdHJpbmcocmVzcG9uc2VEYXRhLnRyYW5zRGF0ZSA/PyByZXNwb25zZURhdGEuVHJhbnNEYXRlID8/IFwiXCIpO1xyXG4gICAgICBzZXRUcmFuc0RhdGUobm9ybWFsaXplRGF0ZVRvSW5wdXQocmF3RGF0ZSkpO1xyXG5cclxuICAgICAgY29uc3QgcmF3VmlzaXRUeXBlID0gU3RyaW5nKFxyXG4gICAgICAgIHJlc3BvbnNlRGF0YS50aXBvVmlzaXRhID8/IHJlc3BvbnNlRGF0YS5UaXBvVmlzaXRhID8/IHJlc3BvbnNlRGF0YS52aXNpdFR5cGUgPz8gcmVzcG9uc2VEYXRhLlZpc2l0VHlwZSA/PyBcIlwiXHJcbiAgICAgICk7XHJcbiAgICAgIHNldFZpc2l0VHlwZShtYXRjaE9wdGlvblZhbHVlKHZpc2l0VHlwZXMsIHJhd1Zpc2l0VHlwZSkgfHwgZGVmYXVsdFZpc2l0VHlwZSk7XHJcblxyXG4gICAgICBjb25zdCBhc2lzdGVudGVzTGlzdCA9IHJlc3BvbnNlRGF0YS5hc2lzdGVudGVzID8/IHJlc3BvbnNlRGF0YS5Bc2lzdGVudGVzO1xyXG4gICAgICBjb25zdCBmaXJzdEFzaXN0ZW50ZSA9IEFycmF5LmlzQXJyYXkoYXNpc3RlbnRlc0xpc3QpICYmIGFzaXN0ZW50ZXNMaXN0Lmxlbmd0aCA/IGFzUmVjb3JkKGFzaXN0ZW50ZXNMaXN0WzBdKSA6IG51bGw7XHJcbiAgICAgIGNvbnN0IHJhd0FzaXN0ZW50ZVRpcG8gPSBTdHJpbmcoXHJcbiAgICAgICAgcmVzcG9uc2VEYXRhLmFzaXN0ZW50ZVRpcG8gPz9cclxuICAgICAgICAgIHJlc3BvbnNlRGF0YS5Bc2lzdGVudGVUaXBvID8/XHJcbiAgICAgICAgICBmaXJzdEFzaXN0ZW50ZT8uYXNpc3RlbnRlVGlwbyA/P1xyXG4gICAgICAgICAgZmlyc3RBc2lzdGVudGU/LkFzaXN0ZW50ZVRpcG8gPz9cclxuICAgICAgICAgIFwiXCJcclxuICAgICAgKTtcclxuICAgICAgY29uc3Qgbm9ybWFsaXplZEFzaXN0ZW50ZVRpcG8gPSBtYXRjaE9wdGlvblZhbHVlKGFzaXN0ZW50ZVRpcG9zLCByYXdBc2lzdGVudGVUaXBvKTtcclxuICAgICAgc2V0QXNpc3RlbnRlVGlwbyhub3JtYWxpemVkQXNpc3RlbnRlVGlwbyB8fCBpbml0aWFsQXNpc3RlbnRlKTtcclxuICAgICAgc2V0RGVzY3JpcHRpb24oU3RyaW5nKHJlc3BvbnNlRGF0YS5kZXNjcmlwdGlvbiA/PyByZXNwb25zZURhdGEuRGVzY3JpcHRpb24gPz8gXCJcIikpO1xyXG4gICAgICBzZXRDb21lbnRhcmlvcyhTdHJpbmcocmVzcG9uc2VEYXRhLmNvbWVudGFyaW9zID8/IHJlc3BvbnNlRGF0YS5Db21lbnRhcmlvcyA/PyBcIlwiKSk7XHJcbiAgICAgIHNldEFudGVjZWRlbnRlcyhTdHJpbmcocmVzcG9uc2VEYXRhLmFudGVjZWRlbnRlcyA/PyByZXNwb25zZURhdGEuQW50ZWNlZGVudGVzID8/IFwiXCIpKTtcclxuICAgICAgc2V0Q29uY2x1c2lvbmVzKFN0cmluZyhyZXNwb25zZURhdGEuY29uY2x1c2lvbmVzID8/IHJlc3BvbnNlRGF0YS5Db25jbHVzaW9uZXMgPz8gXCJcIikpO1xyXG4gICAgfSBjYXRjaCB7XHJcbiAgICAgIC8vIEtlZXAgcHJldmlvdXMgVUkgYmVoYXZpb3Igb24gaHlkcmF0aW9uIGVycm9ycy5cclxuICAgIH0gZmluYWxseSB7XHJcbiAgICAgIHNldElzSHlkcmF0aW5nKGZhbHNlKTtcclxuICAgICAgYXBwbHlEcmFmdFZhbHVlcygpO1xyXG4gICAgICBhcHBseVRleHRFZGl0b3JWYWx1ZXMoKTtcclxuICAgIH1cclxuICB9LCBbXHJcbiAgICBhY3RpdmlkYWRJZCxcclxuICAgIGFwcGx5RHJhZnRWYWx1ZXMsXHJcbiAgICBhcHBseVRleHRFZGl0b3JWYWx1ZXMsXHJcbiAgICBhc2lzdGVudGVUaXBvcyxcclxuICAgIGRlZmF1bHRWaXNpdFR5cGUsXHJcbiAgICBpbml0aWFsQXNpc3RlbnRlLFxyXG4gICAgbWF0Y2hPcHRpb25WYWx1ZSxcclxuICAgIG5vcm1hbGl6ZURhdGVUb0lucHV0LFxyXG4gICAgc2V0QW50ZWNlZGVudGVzLFxyXG4gICAgc2V0QXNpc3RlbnRlVGlwbyxcclxuICAgIHNldENvbWVudGFyaW9zLFxyXG4gICAgc2V0Q29uY2x1c2lvbmVzLFxyXG4gICAgc2V0RGVzY3JpcHRpb24sXHJcbiAgICBzZXRJc0h5ZHJhdGluZyxcclxuICAgIHNldFN0YXR1cyxcclxuICAgIHNldFRyYW5zRGF0ZSxcclxuICAgIHNldFZpc2l0VHlwZSxcclxuICAgIHZpc2l0VHlwZXMsXHJcbiAgXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoc2hvdWxkSHlkcmF0ZSkge1xyXG4gICAgICBoeWRyYXRlRnJvbUFwaSgpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBhcHBseURyYWZ0VmFsdWVzKCk7XHJcbiAgICBhcHBseVRleHRFZGl0b3JWYWx1ZXMoKTtcclxuICB9LCBbYXBwbHlEcmFmdFZhbHVlcywgYXBwbHlUZXh0RWRpdG9yVmFsdWVzLCBoeWRyYXRlRnJvbUFwaSwgc2hvdWxkSHlkcmF0ZV0pO1xyXG59O1xyXG4iLCAiaW1wb3J0IHsgdXNlRWZmZWN0IH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IHdhaXQgfSBmcm9tIFwiLi4vdXRpbHMvd2FpdC50c1wiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHsgc2hvd1Blcm1pc3Npb25Nb2RhbCB9IGZyb20gXCIuLi91dGlscy9wZXJtaXNzaW9ucy50c1wiO1xyXG5pbXBvcnQgeyBzZXRIaXN0b3J5RmlsdGVyRm9yRGF0ZSwgZmxhc2hBY3Rpb25NYXJrIH0gZnJvbSBcIi4uL3V0aWxzL3Zpc2l0YXNIaXN0b3J5LnRzXCI7XHJcbmltcG9ydCB7IHNldFRvcGJhckFjdGlvbkdyb3VwUmVhZHkgfSBmcm9tIFwiLi4vdXRpbHMvdG9wYmFyQWN0aW9uVmlzaWJpbGl0eS50c1wiO1xyXG5cclxudHlwZSBVc2VEZXRhaWxUb3BiYXJBY3Rpb25zQXJncyA9IHtcclxuICBidXN5OiBib29sZWFuO1xyXG4gIG1vZGFsT3BlbjogYm9vbGVhbjtcclxuICBpc0VkaXRpbmc6IGJvb2xlYW47XHJcbiAgY2FuRWRpdEhpc3Rvcnk6IGJvb2xlYW47XHJcbiAgY2FuRGVsZXRlSGlzdG9yeTogYm9vbGVhbjtcclxuICB0cmFuc0RhdGU6IHN0cmluZztcclxuICBzZXRNb2RhbEVycm9yOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBoYW5kbGVFbmFibGVFZGl0OiAoKSA9PiB2b2lkO1xyXG4gIGhhbmRsZUNhbmNlbEVkaXQ6ICgpID0+IHZvaWQ7XHJcbiAgaGFuZGxlVXBkYXRlOiAoKSA9PiBQcm9taXNlPGJvb2xlYW4+O1xyXG4gIGhhbmRsZURlbGV0ZTogKCkgPT4gUHJvbWlzZTxib29sZWFuPjtcclxuICBhY3Rpb25Hcm91cElkPzogc3RyaW5nO1xyXG4gIHBlcm1pc3Npb25zUmVhZHk/OiBib29sZWFuO1xyXG4gIG9wZW5Db25maXJtOiAob3B0czoge1xyXG4gICAgdGl0bGU6IHN0cmluZztcclxuICAgIG1lc3NhZ2U6IHN0cmluZztcclxuICAgIGNvbmZpcm1UZXh0Pzogc3RyaW5nO1xyXG4gICAgb25Db25maXJtPzogKCkgPT4gUHJvbWlzZTxib29sZWFuIHwgdm9pZD4gfCBib29sZWFuIHwgdm9pZDtcclxuICB9KSA9PiB2b2lkO1xyXG4gIGNsb3NlQ29uZmlybTogKCkgPT4gdm9pZDtcclxufTtcclxuXHJcbi8vIENvb3JkaW5hdGVzIHRvcGJhciBpY29uIHZpc2liaWxpdHkgYW5kIGFjdGlvbiBldmVudHMgZm9yIGRldGFpbCBwYWdlLlxyXG5leHBvcnQgY29uc3QgdXNlRGV0YWlsVG9wYmFyQWN0aW9ucyA9ICh7XHJcbiAgYnVzeSxcclxuICBtb2RhbE9wZW4sXHJcbiAgaXNFZGl0aW5nLFxyXG4gIGNhbkVkaXRIaXN0b3J5LFxyXG4gIGNhbkRlbGV0ZUhpc3RvcnksXHJcbiAgdHJhbnNEYXRlLFxyXG4gIHNldE1vZGFsRXJyb3IsXHJcbiAgaGFuZGxlRW5hYmxlRWRpdCxcclxuICBoYW5kbGVDYW5jZWxFZGl0LFxyXG4gIGhhbmRsZVVwZGF0ZSxcclxuICBoYW5kbGVEZWxldGUsXHJcbiAgYWN0aW9uR3JvdXBJZCA9IFwidmlzaXQtZGV0YWlsLWFjdGlvbnNcIixcclxuICBwZXJtaXNzaW9uc1JlYWR5ID0gdHJ1ZSxcclxuICBvcGVuQ29uZmlybSxcclxuICBjbG9zZUNvbmZpcm0sXHJcbn06IFVzZURldGFpbFRvcGJhckFjdGlvbnNBcmdzKSA9PiB7XHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghcGVybWlzc2lvbnNSZWFkeSkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IGVkaXRJY29uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2aXNpdEVkaXRJY29uXCIpO1xyXG4gICAgY29uc3Qgc2F2ZUljb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpc2l0U2F2ZUljb25cIik7XHJcbiAgICBjb25zdCBkZWxldGVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpc2l0RGVsZXRlQnRuXCIpO1xyXG4gICAgY29uc3QgY2FuY2VsQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2aXNpdENhbmNlbEJ0blwiKTtcclxuICAgIGNvbnN0IGVkaXRCdG4gPSBlZGl0SWNvbj8uY2xvc2VzdChcImJ1dHRvblwiKSA/PyBudWxsO1xyXG4gICAgaWYgKGlzRWRpdGluZykge1xyXG4gICAgICBpZiAoZWRpdEJ0bikgZWRpdEJ0bi5jbGFzc0xpc3QucmVtb3ZlKFwidG9wYmFyLWhpZGRlblwiKTtcclxuICAgICAgaWYgKGVkaXRJY29uKSBlZGl0SWNvbi5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xyXG4gICAgICBpZiAoc2F2ZUljb24pIHNhdmVJY29uLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XHJcbiAgICAgIGlmIChkZWxldGVCdG4pIGRlbGV0ZUJ0bi5jbGFzc0xpc3QuYWRkKFwidG9wYmFyLWhpZGRlblwiKTtcclxuICAgICAgaWYgKGNhbmNlbEJ0bikgY2FuY2VsQnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJ0b3BiYXItaGlkZGVuXCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKGVkaXRCdG4pIGVkaXRCdG4uY2xhc3NMaXN0LnJlbW92ZShcInRvcGJhci1oaWRkZW5cIik7XHJcbiAgICAgIGlmIChlZGl0SWNvbikgZWRpdEljb24uY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcclxuICAgICAgaWYgKHNhdmVJY29uKSBzYXZlSWNvbi5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xyXG4gICAgICBpZiAoZGVsZXRlQnRuKSBkZWxldGVCdG4uY2xhc3NMaXN0LnJlbW92ZShcInRvcGJhci1oaWRkZW5cIik7XHJcbiAgICAgIGlmIChjYW5jZWxCdG4pIGNhbmNlbEJ0bi5jbGFzc0xpc3QuYWRkKFwidG9wYmFyLWhpZGRlblwiKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRUb3BiYXJBY3Rpb25Hcm91cFJlYWR5KGFjdGlvbkdyb3VwSWQpO1xyXG4gIH0sIFthY3Rpb25Hcm91cElkLCBpc0VkaXRpbmcsIHBlcm1pc3Npb25zUmVhZHldKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghcGVybWlzc2lvbnNSZWFkeSkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IG9uRWRpdCA9ICgpID0+IHtcclxuICAgICAgaWYgKCFjYW5FZGl0SGlzdG9yeSkge1xyXG4gICAgICAgIHNob3dQZXJtaXNzaW9uTW9kYWwoKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGlzRWRpdGluZykge1xyXG4gICAgICAgIGlmIChidXN5IHx8IG1vZGFsT3BlbikgcmV0dXJuO1xyXG4gICAgICAgIHNldE1vZGFsRXJyb3IoXCJcIik7XHJcbiAgICAgICAgb3BlbkNvbmZpcm0oe1xyXG4gICAgICAgICAgdGl0bGU6IGluZFQoXCJWaXNpdHNfRGV0YWlsX1NhdmVDaGFuZ2VzX1RpdGxlXCIsIFwiVmlzaXRzX0RldGFpbF9TYXZlQ2hhbmdlc19UaXRsZVwiKSxcclxuICAgICAgICAgIG1lc3NhZ2U6IGluZFQoXCJWaXNpdHNfRGV0YWlsX1NhdmVDaGFuZ2VzX0JvZHlcIiwgXCJWaXNpdHNfRGV0YWlsX1NhdmVDaGFuZ2VzX0JvZHlcIiksXHJcbiAgICAgICAgICBjb25maXJtVGV4dDogaW5kVChcIkNvbW1vbl9TYXZlXCIsIFwiQ29tbW9uX1NhdmVcIiksXHJcbiAgICAgICAgICBvbkNvbmZpcm06IGFzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgb2sgPSBhd2FpdCBoYW5kbGVVcGRhdGUoKTtcclxuICAgICAgICAgICAgaWYgKG9rKSB7XHJcbiAgICAgICAgICAgICAgY2xvc2VDb25maXJtKCk7XHJcbiAgICAgICAgICAgICAgc2V0SGlzdG9yeUZpbHRlckZvckRhdGUodHJhbnNEYXRlKTtcclxuICAgICAgICAgICAgICBhd2FpdCB3YWl0KDIwMCk7XHJcbiAgICAgICAgICAgICAgZmxhc2hBY3Rpb25NYXJrKFwib2tQcm9jZXNzXCIsIDEyMDApO1xyXG4gICAgICAgICAgICAgIGF3YWl0IHdhaXQoMTIwMCk7XHJcbiAgICAgICAgICAgICAgd2luZG93Ll9faW5kQnlwYXNzTmF2aWdhdGlvbkd1YXJkT25jZT8uKCk7XHJcbiAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9IaXN0b3JpYWwvSGlzdG9yeVwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBvaztcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaGFuZGxlRW5hYmxlRWRpdCgpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IG9uRGVsZXRlID0gKCkgPT4ge1xyXG4gICAgICBpZiAoIWNhbkRlbGV0ZUhpc3RvcnkpIHtcclxuICAgICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChidXN5IHx8IG1vZGFsT3BlbikgcmV0dXJuO1xyXG4gICAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xyXG4gICAgICBvcGVuQ29uZmlybSh7XHJcbiAgICAgICAgdGl0bGU6IGluZFQoXCJWaXNpdHNfRGV0YWlsX0RlbGV0ZUFjdGl2aXR5X1RpdGxlXCIsIFwiVmlzaXRzX0RldGFpbF9EZWxldGVBY3Rpdml0eV9UaXRsZVwiKSxcclxuICAgICAgICBtZXNzYWdlOiBpbmRUKFwiVmlzaXRzX0RldGFpbF9EZWxldGVBY3Rpdml0eV9Cb2R5XCIsIFwiVmlzaXRzX0RldGFpbF9EZWxldGVBY3Rpdml0eV9Cb2R5XCIpLFxyXG4gICAgICAgIGNvbmZpcm1UZXh0OiBpbmRUKFwiQ29tbW9uX0RlbGV0ZVwiLCBcIkNvbW1vbl9EZWxldGVcIiksXHJcbiAgICAgICAgb25Db25maXJtOiBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBvayA9IGF3YWl0IGhhbmRsZURlbGV0ZSgpO1xyXG4gICAgICAgICAgaWYgKG9rKSB7XHJcbiAgICAgICAgICAgIGNsb3NlQ29uZmlybSgpO1xyXG4gICAgICAgICAgICBzZXRIaXN0b3J5RmlsdGVyRm9yRGF0ZSh0cmFuc0RhdGUpO1xyXG4gICAgICAgICAgICBhd2FpdCB3YWl0KDIwMCk7XHJcbiAgICAgICAgICAgIGZsYXNoQWN0aW9uTWFyayhcIm9rRGVsUHJvY2Vzc1wiLCAxMjAwKTtcclxuICAgICAgICAgICAgYXdhaXQgd2FpdCgxMjAwKTtcclxuICAgICAgICAgICAgd2luZG93Ll9faW5kQnlwYXNzTmF2aWdhdGlvbkd1YXJkT25jZT8uKCk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvSGlzdG9yaWFsL0hpc3RvcnlcIjtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBvaztcclxuICAgICAgICB9LFxyXG4gICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3Qgb25DYW5jZWxFZGl0ID0gKCkgPT4ge1xyXG4gICAgICBpZiAoYnVzeSB8fCBtb2RhbE9wZW4pIHJldHVybjtcclxuICAgICAgaGFuZGxlQ2FuY2VsRWRpdCgpO1xyXG4gICAgfTtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInZpc2l0LWVkaXRcIiwgb25FZGl0KTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwidmlzaXQtZGVsZXRlXCIsIG9uRGVsZXRlKTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwidmlzaXQtY2FuY2VsLWVkaXRcIiwgb25DYW5jZWxFZGl0KTtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwidmlzaXQtZWRpdFwiLCBvbkVkaXQpO1xyXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInZpc2l0LWRlbGV0ZVwiLCBvbkRlbGV0ZSk7XHJcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwidmlzaXQtY2FuY2VsLWVkaXRcIiwgb25DYW5jZWxFZGl0KTtcclxuICAgIH07XHJcbiAgfSwgW1xyXG4gICAgYnVzeSxcclxuICAgIGNhbkRlbGV0ZUhpc3RvcnksXHJcbiAgICBjYW5FZGl0SGlzdG9yeSxcclxuICAgIGNsb3NlQ29uZmlybSxcclxuICAgIGhhbmRsZUNhbmNlbEVkaXQsXHJcbiAgICBoYW5kbGVEZWxldGUsXHJcbiAgICBoYW5kbGVFbmFibGVFZGl0LFxyXG4gICAgaGFuZGxlVXBkYXRlLFxyXG4gICAgaXNFZGl0aW5nLFxyXG4gICAgbW9kYWxPcGVuLFxyXG4gICAgb3BlbkNvbmZpcm0sXHJcbiAgICBwZXJtaXNzaW9uc1JlYWR5LFxyXG4gICAgc2V0TW9kYWxFcnJvcixcclxuICAgIHRyYW5zRGF0ZSxcclxuICBdKTtcclxufTtcclxuIiwgIlx1RkVGRmltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VSZWYgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgZ2V0U2Vzc2lvblZhbHVlV2l0aEV4cGlyeSwgcmVtb3ZlU2Vzc2lvblZhbHVlV2l0aEV4cGlyeSwgc2V0U2Vzc2lvblZhbHVlV2l0aEV4cGlyeSB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9zZXNzaW9uRXhwaXJ5LnRzXCI7XHJcblxyXG5jb25zdCBFRElUX01PREVfVFRMX01TID0gNiAqIDYwICogNjAgKiAxMDAwO1xyXG5jb25zdCBERVRBSUxfRFJBRlRfVFRMX01TID0gMjQgKiA2MCAqIDYwICogMTAwMDtcclxuXHJcbnR5cGUgVXNlRGV0YWlsRWRpdFNlc3Npb25BcmdzID0ge1xyXG4gIGFjdGl2aWRhZElkOiBzdHJpbmc7XHJcbiAgcmVjSWQ6IHN0cmluZztcclxuICBjYW5FZGl0SGlzdG9yeTogYm9vbGVhbjtcclxuICBpc0VkaXRpbmc6IGJvb2xlYW47XHJcbiAgc2V0SXNFZGl0aW5nOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxib29sZWFuPj47XHJcbiAgdHJhbnNEYXRlOiBzdHJpbmc7XHJcbiAgdmlzaXRUeXBlOiBzdHJpbmc7XHJcbiAgYXNpc3RlbnRlVGlwbzogc3RyaW5nO1xyXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgY29tZW50YXJpb3M6IHN0cmluZztcclxuICBhbnRlY2VkZW50ZXM6IHN0cmluZztcclxuICBjb25jbHVzaW9uZXM6IHN0cmluZztcclxuICBzZXRUcmFuc0RhdGU6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPHN0cmluZz4+O1xyXG4gIHNldFZpc2l0VHlwZTogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XHJcbiAgc2V0QXNpc3RlbnRlVGlwbzogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XHJcbiAgc2V0RGVzY3JpcHRpb246IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPHN0cmluZz4+O1xyXG4gIHNldENvbWVudGFyaW9zOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcclxuICBzZXRBbnRlY2VkZW50ZXM6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPHN0cmluZz4+O1xyXG4gIHNldENvbmNsdXNpb25lczogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XHJcbn07XHJcblxyXG50eXBlIERldGFpbERyYWZ0VmFsdWVzID0ge1xyXG4gIHRyYW5zRGF0ZTogc3RyaW5nO1xyXG4gIHZpc2l0VHlwZTogc3RyaW5nO1xyXG4gIGFzaXN0ZW50ZVRpcG86IHN0cmluZztcclxuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xyXG4gIGNvbWVudGFyaW9zOiBzdHJpbmc7XHJcbiAgYW50ZWNlZGVudGVzOiBzdHJpbmc7XHJcbiAgY29uY2x1c2lvbmVzOiBzdHJpbmc7XHJcbn07XHJcblxyXG4vLyBNYW5hZ2VzIGVkaXQtbW9kZSBzZXNzaW9uIGZsYWdzIGFuZCBkZXRhaWwgZHJhZnQgcGVyc2lzdGVuY2UuXHJcbmV4cG9ydCBjb25zdCB1c2VEZXRhaWxFZGl0U2Vzc2lvbiA9ICh7XHJcbiAgYWN0aXZpZGFkSWQsXHJcbiAgcmVjSWQsXHJcbiAgY2FuRWRpdEhpc3RvcnksXHJcbiAgaXNFZGl0aW5nLFxyXG4gIHNldElzRWRpdGluZyxcclxuICB0cmFuc0RhdGUsXHJcbiAgdmlzaXRUeXBlLFxyXG4gIGFzaXN0ZW50ZVRpcG8sXHJcbiAgZGVzY3JpcHRpb24sXHJcbiAgY29tZW50YXJpb3MsXHJcbiAgYW50ZWNlZGVudGVzLFxyXG4gIGNvbmNsdXNpb25lcyxcclxuICBzZXRUcmFuc0RhdGUsXHJcbiAgc2V0VmlzaXRUeXBlLFxyXG4gIHNldEFzaXN0ZW50ZVRpcG8sXHJcbiAgc2V0RGVzY3JpcHRpb24sXHJcbiAgc2V0Q29tZW50YXJpb3MsXHJcbiAgc2V0QW50ZWNlZGVudGVzLFxyXG4gIHNldENvbmNsdXNpb25lcyxcclxufTogVXNlRGV0YWlsRWRpdFNlc3Npb25BcmdzKSA9PiB7XHJcbiAgY29uc3QgZWRpdE1vZGVLZXlSZWYgPSB1c2VSZWYoXCJcIik7XHJcbiAgY29uc3QgZHJhZnRLZXlSZWYgPSB1c2VSZWYoXCJcIik7XHJcbiAgY29uc3QgZHJhZnRQZXJzaXN0VGltZXJSZWYgPSB1c2VSZWY8bnVtYmVyIHwgbnVsbD4obnVsbCk7XHJcblxyXG4gIC8vIFBlcnNpc3QgZWRpdCBtb2RlIHdoaWxlIHVzZXIgbmF2aWdhdGVzIHRvIHRoZSB0ZXh0IGVkaXRvciBhbmQgYmFjay5cclxuICBjb25zdCBzeW5jRWRpdE1vZGVGbGFnID0gdXNlQ2FsbGJhY2soKGVuYWJsZWQ6IGJvb2xlYW4pID0+IHtcclxuICAgIGNvbnN0IGtleSA9IGVkaXRNb2RlS2V5UmVmLmN1cnJlbnQ7XHJcbiAgICBpZiAoIWtleSkgcmV0dXJuO1xyXG4gICAgaWYgKGVuYWJsZWQpIHtcclxuICAgICAgc2V0U2Vzc2lvblZhbHVlV2l0aEV4cGlyeShrZXksIFwidHJ1ZVwiLCBFRElUX01PREVfVFRMX01TKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgcmVtb3ZlU2Vzc2lvblZhbHVlV2l0aEV4cGlyeShrZXkpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3Qgc3luY0VkaXRNb2RlT25FbnRyeSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGNvbnN0IGJhc2VJZCA9IGFjdGl2aWRhZElkIHx8IHJlY0lkIHx8IFwiZGVmYXVsdFwiO1xyXG4gICAgY29uc3Qga2V5ID0gYGluZF92aXNpdF9lZGl0XyR7YmFzZUlkfWA7XHJcbiAgICBjb25zdCByZXR1cm5LZXkgPSBgJHtrZXl9X3JldHVybmA7XHJcbiAgICBjb25zdCBkcmFmdEtleSA9IGBpbmRfdmlzaXRfZHJhZnRfJHtiYXNlSWR9YDtcclxuICAgIGVkaXRNb2RlS2V5UmVmLmN1cnJlbnQgPSBrZXk7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgYWxsb3dSZXN0b3JlID0gZ2V0U2Vzc2lvblZhbHVlV2l0aEV4cGlyeShyZXR1cm5LZXkpID09PSBcIjFcIjtcclxuICAgICAgaWYgKGFsbG93UmVzdG9yZSkge1xyXG4gICAgICAgIHJlbW92ZVNlc3Npb25WYWx1ZVdpdGhFeHBpcnkocmV0dXJuS2V5KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGNhbkVkaXRIaXN0b3J5ICYmIGFsbG93UmVzdG9yZSAmJiBnZXRTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KGtleSkgPT09IFwidHJ1ZVwiKSB7XHJcbiAgICAgICAgc2V0SXNFZGl0aW5nKHRydWUpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNldElzRWRpdGluZyhmYWxzZSk7XHJcbiAgICAgICAgcmVtb3ZlU2Vzc2lvblZhbHVlV2l0aEV4cGlyeShrZXkpO1xyXG4gICAgICAgIHJlbW92ZVNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoZHJhZnRLZXkpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIWNhbkVkaXRIaXN0b3J5KSB7XHJcbiAgICAgICAgcmVtb3ZlU2Vzc2lvblZhbHVlV2l0aEV4cGlyeShrZXkpO1xyXG4gICAgICAgIHJlbW92ZVNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoZHJhZnRLZXkpO1xyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIHtcclxuICAgICAgLyogaWdub3JlICovXHJcbiAgICB9XHJcbiAgfSwgW2FjdGl2aWRhZElkLCBjYW5FZGl0SGlzdG9yeSwgcmVjSWQsIHNldElzRWRpdGluZ10pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgc3luY0VkaXRNb2RlT25FbnRyeSgpO1xyXG4gIH0sIFtzeW5jRWRpdE1vZGVPbkVudHJ5XSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBvblBhZ2VTaG93ID0gKGV2ZW50OiBQYWdlVHJhbnNpdGlvbkV2ZW50KSA9PiB7XHJcbiAgICAgIGNvbnN0IG5hdkVudHJ5ID0gdHlwZW9mIHBlcmZvcm1hbmNlICE9PSBcInVuZGVmaW5lZFwiICYmIHBlcmZvcm1hbmNlLmdldEVudHJpZXNCeVR5cGVcclxuICAgICAgICA/IChwZXJmb3JtYW5jZS5nZXRFbnRyaWVzQnlUeXBlKFwibmF2aWdhdGlvblwiKVswXSBhcyBQZXJmb3JtYW5jZU5hdmlnYXRpb25UaW1pbmcgfCB1bmRlZmluZWQpXHJcbiAgICAgICAgOiB1bmRlZmluZWQ7XHJcbiAgICAgIGNvbnN0IGlzQmFja0ZvcndhcmQgPSBuYXZFbnRyeT8udHlwZSA9PT0gXCJiYWNrX2ZvcndhcmRcIjtcclxuICAgICAgaWYgKGV2ZW50Py5wZXJzaXN0ZWQgfHwgaXNCYWNrRm9yd2FyZCkge1xyXG4gICAgICAgIHN5bmNFZGl0TW9kZU9uRW50cnkoKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInBhZ2VzaG93XCIsIG9uUGFnZVNob3cpO1xyXG4gICAgcmV0dXJuICgpID0+IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicGFnZXNob3dcIiwgb25QYWdlU2hvdyk7XHJcbiAgfSwgW3N5bmNFZGl0TW9kZU9uRW50cnldKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IGtleSA9IGBpbmRfdmlzaXRfZHJhZnRfJHthY3RpdmlkYWRJZCB8fCByZWNJZCB8fCBcImRlZmF1bHRcIn1gO1xyXG4gICAgZHJhZnRLZXlSZWYuY3VycmVudCA9IGtleTtcclxuICB9LCBbYWN0aXZpZGFkSWQsIHJlY0lkXSk7XHJcblxyXG4gIGNvbnN0IHNhdmVEcmFmdCA9IHVzZUNhbGxiYWNrKChkcmFmdDogRGV0YWlsRHJhZnRWYWx1ZXMpID0+IHtcclxuICAgIGNvbnN0IGtleSA9IGRyYWZ0S2V5UmVmLmN1cnJlbnQ7XHJcbiAgICBpZiAoIWtleSkgcmV0dXJuO1xyXG4gICAgc2V0U2Vzc2lvblZhbHVlV2l0aEV4cGlyeShrZXksIEpTT04uc3RyaW5naWZ5KGRyYWZ0KSwgREVUQUlMX0RSQUZUX1RUTF9NUyk7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBjbGVhckRyYWZ0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgY29uc3Qga2V5ID0gZHJhZnRLZXlSZWYuY3VycmVudDtcclxuICAgIGlmICgha2V5KSByZXR1cm47XHJcbiAgICByZW1vdmVTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KGtleSk7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBhcHBseURyYWZ0VmFsdWVzID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgY29uc3Qga2V5ID0gZHJhZnRLZXlSZWYuY3VycmVudDtcclxuICAgIGlmICgha2V5KSByZXR1cm47XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcmF3ID0gZ2V0U2Vzc2lvblZhbHVlV2l0aEV4cGlyeShrZXkpO1xyXG4gICAgICBpZiAoIXJhdykgcmV0dXJuO1xyXG4gICAgICBjb25zdCBkcmFmdCA9IEpTT04ucGFyc2UocmF3KSBhcyBQYXJ0aWFsPERldGFpbERyYWZ0VmFsdWVzPjtcclxuICAgICAgaWYgKCFkcmFmdCB8fCB0eXBlb2YgZHJhZnQgIT09IFwib2JqZWN0XCIpIHJldHVybjtcclxuXHJcbiAgICAgIGlmIChkcmFmdC50cmFuc0RhdGUgIT09IHVuZGVmaW5lZCkgc2V0VHJhbnNEYXRlKFN0cmluZyhkcmFmdC50cmFuc0RhdGUpKTtcclxuICAgICAgaWYgKGRyYWZ0LnZpc2l0VHlwZSAhPT0gdW5kZWZpbmVkKSBzZXRWaXNpdFR5cGUoU3RyaW5nKGRyYWZ0LnZpc2l0VHlwZSkpO1xyXG4gICAgICBpZiAoZHJhZnQuYXNpc3RlbnRlVGlwbyAhPT0gdW5kZWZpbmVkKSBzZXRBc2lzdGVudGVUaXBvKFN0cmluZyhkcmFmdC5hc2lzdGVudGVUaXBvKSk7XHJcbiAgICAgIGlmIChkcmFmdC5kZXNjcmlwdGlvbiAhPT0gdW5kZWZpbmVkKSBzZXREZXNjcmlwdGlvbihTdHJpbmcoZHJhZnQuZGVzY3JpcHRpb24pKTtcclxuICAgICAgaWYgKGRyYWZ0LmNvbWVudGFyaW9zICE9PSB1bmRlZmluZWQpIHNldENvbWVudGFyaW9zKFN0cmluZyhkcmFmdC5jb21lbnRhcmlvcykpO1xyXG4gICAgICBpZiAoZHJhZnQuYW50ZWNlZGVudGVzICE9PSB1bmRlZmluZWQpIHNldEFudGVjZWRlbnRlcyhTdHJpbmcoZHJhZnQuYW50ZWNlZGVudGVzKSk7XHJcbiAgICAgIGlmIChkcmFmdC5jb25jbHVzaW9uZXMgIT09IHVuZGVmaW5lZCkgc2V0Q29uY2x1c2lvbmVzKFN0cmluZyhkcmFmdC5jb25jbHVzaW9uZXMpKTtcclxuICAgIH0gY2F0Y2gge1xyXG4gICAgICAvKiBpZ25vcmUgKi9cclxuICAgIH1cclxuICB9LCBbc2V0QW50ZWNlZGVudGVzLCBzZXRBc2lzdGVudGVUaXBvLCBzZXRDb21lbnRhcmlvcywgc2V0Q29uY2x1c2lvbmVzLCBzZXREZXNjcmlwdGlvbiwgc2V0VHJhbnNEYXRlLCBzZXRWaXNpdFR5cGVdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghaXNFZGl0aW5nKSB7XHJcbiAgICAgIGlmIChkcmFmdFBlcnNpc3RUaW1lclJlZi5jdXJyZW50KSB7XHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KGRyYWZ0UGVyc2lzdFRpbWVyUmVmLmN1cnJlbnQpO1xyXG4gICAgICAgIGRyYWZ0UGVyc2lzdFRpbWVyUmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZHJhZnRQZXJzaXN0VGltZXJSZWYuY3VycmVudCkge1xyXG4gICAgICBjbGVhclRpbWVvdXQoZHJhZnRQZXJzaXN0VGltZXJSZWYuY3VycmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhZnRQZXJzaXN0VGltZXJSZWYuY3VycmVudCA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgZHJhZnRQZXJzaXN0VGltZXJSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgIHNhdmVEcmFmdCh7XHJcbiAgICAgICAgdHJhbnNEYXRlLFxyXG4gICAgICAgIHZpc2l0VHlwZSxcclxuICAgICAgICBhc2lzdGVudGVUaXBvLFxyXG4gICAgICAgIGRlc2NyaXB0aW9uLFxyXG4gICAgICAgIGNvbWVudGFyaW9zLFxyXG4gICAgICAgIGFudGVjZWRlbnRlcyxcclxuICAgICAgICBjb25jbHVzaW9uZXMsXHJcbiAgICAgIH0pO1xyXG4gICAgfSwgMTgwKTtcclxuXHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBpZiAoZHJhZnRQZXJzaXN0VGltZXJSZWYuY3VycmVudCkge1xyXG4gICAgICAgIGNsZWFyVGltZW91dChkcmFmdFBlcnNpc3RUaW1lclJlZi5jdXJyZW50KTtcclxuICAgICAgICBkcmFmdFBlcnNpc3RUaW1lclJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9LCBbYW50ZWNlZGVudGVzLCBhc2lzdGVudGVUaXBvLCBjb21lbnRhcmlvcywgY29uY2x1c2lvbmVzLCBkZXNjcmlwdGlvbiwgaXNFZGl0aW5nLCBzYXZlRHJhZnQsIHRyYW5zRGF0ZSwgdmlzaXRUeXBlXSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBlZGl0TW9kZUtleVJlZixcclxuICAgIHN5bmNFZGl0TW9kZUZsYWcsXHJcbiAgICBjbGVhckRyYWZ0LFxyXG4gICAgYXBwbHlEcmFmdFZhbHVlcyxcclxuICB9O1xyXG59O1xyXG4iLCAiXHVGRUZGaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IGZldGNoSnNvbiB9IGZyb20gXCIuLi8uLi8uLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgeyBzaG93UGVybWlzc2lvbk1vZGFsIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3Blcm1pc3Npb25zLnRzXCI7XHJcbmltcG9ydCB7IGZsYXNoQWN0aW9uTWFyayB9IGZyb20gXCIuLi8uLi8uLi91dGlscy92aXNpdGFzSGlzdG9yeS50c1wiO1xyXG5cclxudHlwZSBPcHRpb25MaWtlID0ge1xyXG4gIHZhbHVlPzogc3RyaW5nIHwgbnVtYmVyO1xyXG4gIFZhbHVlPzogc3RyaW5nIHwgbnVtYmVyO1xyXG4gIHRleHQ/OiBzdHJpbmc7XHJcbiAgVGV4dD86IHN0cmluZztcclxufTtcclxuXHJcbnR5cGUgVmlzaXRDb21tYW5kUmVzcG9uc2UgPSB7XHJcbiAgc3VjY2Vzcz86IGJvb2xlYW47XHJcbiAgbWVzc2FnZT86IHN0cmluZztcclxuICBTdWNjZXNzPzogYm9vbGVhbjtcclxuICBNZXNzYWdlPzogc3RyaW5nO1xyXG59O1xyXG5cclxuY29uc3QgaXNDb21tYW5kU3VjY2VzcyA9IChyZXNwb25zZTogVmlzaXRDb21tYW5kUmVzcG9uc2UpOiBib29sZWFuID0+IHtcclxuICByZXR1cm4gcmVzcG9uc2Uuc3VjY2VzcyA9PT0gdHJ1ZSB8fCByZXNwb25zZS5TdWNjZXNzID09PSB0cnVlO1xyXG59O1xyXG5cclxuY29uc3QgZ2V0Q29tbWFuZE1lc3NhZ2UgPSAocmVzcG9uc2U6IFZpc2l0Q29tbWFuZFJlc3BvbnNlKTogc3RyaW5nID0+IHtcclxuICBjb25zdCByYXcgPSByZXNwb25zZS5tZXNzYWdlID8/IHJlc3BvbnNlLk1lc3NhZ2U7XHJcbiAgcmV0dXJuIHR5cGVvZiByYXcgPT09IFwic3RyaW5nXCIgPyByYXcudHJpbSgpIDogXCJcIjtcclxufTtcclxuXHJcbi8vIEtlZXAgcmVjSWQgYXMgYSBub3JtYWxpemVkIHNpZ25lZCBpbnRlZ2VyIHN0cmluZyB0byBhdm9pZCBsb25nIHByZWNpc2lvbiBsb3NzIGluIEpTIG51bWJlcnMuXHJcbmNvbnN0IHJlc29sdmVTYWZlUmVjSWQgPSAocmF3UmVjSWQ6IHN0cmluZyk6IHN0cmluZyB8IG51bGwgPT4ge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSBTdHJpbmcocmF3UmVjSWQgPz8gXCJcIikudHJpbSgpO1xyXG4gIGlmICghbm9ybWFsaXplZCkgcmV0dXJuIG51bGw7XHJcblxyXG4gIGlmICghL14tP1xcZCskLy50ZXN0KG5vcm1hbGl6ZWQpKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgY29uc3QgYWJzb2x1dGVEaWdpdHMgPSBub3JtYWxpemVkLnN0YXJ0c1dpdGgoXCItXCIpID8gbm9ybWFsaXplZC5zbGljZSgxKSA6IG5vcm1hbGl6ZWQ7XHJcbiAgaWYgKCFhYnNvbHV0ZURpZ2l0cyB8fCAvXjArJC8udGVzdChhYnNvbHV0ZURpZ2l0cykpIHJldHVybiBudWxsO1xyXG5cclxuICByZXR1cm4gbm9ybWFsaXplZDtcclxufTtcclxuXHJcbmNvbnN0IHNob3VsZExvZ1JlY0lkSW5EZXYgPSAoKTogYm9vbGVhbiA9PiB7XHJcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIgfHwgIXdpbmRvdy5sb2NhdGlvbikgcmV0dXJuIGZhbHNlO1xyXG4gIGNvbnN0IGhvc3QgPSBTdHJpbmcod2luZG93LmxvY2F0aW9uLmhvc3RuYW1lIHx8IFwiXCIpLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xyXG4gIHJldHVybiBob3N0ID09PSBcImxvY2FsaG9zdFwiIHx8IGhvc3QgPT09IFwiMTI3LjAuMC4xXCIgfHwgaG9zdC5lbmRzV2l0aChcIi5sb2NhbFwiKTtcclxufTtcclxuXHJcbmNvbnN0IGxvZ1NhZmVSZWNJZEluRGV2ID0gKG9wZXJhdGlvbjogXCJ1cGRhdGVcIiB8IFwiZGVsZXRlXCIsIHNhZmVSZWNJZDogc3RyaW5nKTogdm9pZCA9PiB7XHJcbiAgaWYgKCFzaG91bGRMb2dSZWNJZEluRGV2KCkpIHJldHVybjtcclxuICBjb25zb2xlLmluZm8oYFt2aXNpdGFzLWRldGFpbF0gJHtvcGVyYXRpb259IHJlY0lkYCwgc2FmZVJlY0lkKTtcclxufTtcclxuXHJcbnR5cGUgVXNlRGV0YWlsTXV0YXRpb25zQXJncyA9IHtcclxuICBidXN5OiBib29sZWFuO1xyXG4gIGlzRWRpdGluZzogYm9vbGVhbjtcclxuICBjYW5FZGl0SGlzdG9yeTogYm9vbGVhbjtcclxuICBjYW5EZWxldGVIaXN0b3J5OiBib29sZWFuO1xyXG4gIHJlY0lkOiBzdHJpbmc7XHJcbiAgYWNjb3VudE51bTogc3RyaW5nO1xyXG4gIHRyYW5zRGF0ZTogc3RyaW5nO1xyXG4gIHZpc2l0VHlwZTogc3RyaW5nO1xyXG4gIGFzaXN0ZW50ZVRpcG86IHN0cmluZztcclxuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xyXG4gIGNvbWVudGFyaW9zOiBzdHJpbmc7XHJcbiAgYW50ZWNlZGVudGVzOiBzdHJpbmc7XHJcbiAgY29uY2x1c2lvbmVzOiBzdHJpbmc7XHJcbiAgdmlzaXRUeXBlczogT3B0aW9uTGlrZVtdO1xyXG4gIGFzaXN0ZW50ZVRpcG9zOiBPcHRpb25MaWtlW107XHJcbiAgZGVmYXVsdFZpc2l0VHlwZTogc3RyaW5nO1xyXG4gIHJhd0luaXRpYWxWaXNpdFR5cGU6IHN0cmluZztcclxuICByYXdJbml0aWFsQXNpc3RlbnRlOiBzdHJpbmc7XHJcbiAgbWF0Y2hPcHRpb25WYWx1ZTogKG9wdGlvbnM6IE9wdGlvbkxpa2VbXSwgcmF3OiB1bmtub3duKSA9PiBzdHJpbmc7XHJcbiAgY2xlYXJEcmFmdDogKCkgPT4gdm9pZDtcclxuICBzeW5jRWRpdE1vZGVGbGFnOiAoZW5hYmxlZDogYm9vbGVhbikgPT4gdm9pZDtcclxuICBzZXRNb2RhbEVycm9yOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcclxuICBzZXRCdXN5OiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxib29sZWFuPj47XHJcbiAgc2V0U3RhdHVzOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcclxuICBzZXRJc0VkaXRpbmc6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPGJvb2xlYW4+PjtcclxufTtcclxuXHJcbi8vIEVuY2Fwc3VsYXRlcyB1cGRhdGUgYW5kIGRlbGV0ZSBtdXRhdGlvbnMgZm9yIGRldGFpbCBmb3JtIHN0YXRlLlxyXG5leHBvcnQgY29uc3QgdXNlRGV0YWlsTXV0YXRpb25zID0gKHtcclxuICBidXN5LFxyXG4gIGlzRWRpdGluZyxcclxuICBjYW5FZGl0SGlzdG9yeSxcclxuICBjYW5EZWxldGVIaXN0b3J5LFxyXG4gIHJlY0lkLFxyXG4gIGFjY291bnROdW0sXHJcbiAgdHJhbnNEYXRlLFxyXG4gIHZpc2l0VHlwZSxcclxuICBhc2lzdGVudGVUaXBvLFxyXG4gIGRlc2NyaXB0aW9uLFxyXG4gIGNvbWVudGFyaW9zLFxyXG4gIGFudGVjZWRlbnRlcyxcclxuICBjb25jbHVzaW9uZXMsXHJcbiAgdmlzaXRUeXBlcyxcclxuICBhc2lzdGVudGVUaXBvcyxcclxuICBkZWZhdWx0VmlzaXRUeXBlLFxyXG4gIHJhd0luaXRpYWxWaXNpdFR5cGUsXHJcbiAgcmF3SW5pdGlhbEFzaXN0ZW50ZSxcclxuICBtYXRjaE9wdGlvblZhbHVlLFxyXG4gIGNsZWFyRHJhZnQsXHJcbiAgc3luY0VkaXRNb2RlRmxhZyxcclxuICBzZXRNb2RhbEVycm9yLFxyXG4gIHNldEJ1c3ksXHJcbiAgc2V0U3RhdHVzLFxyXG4gIHNldElzRWRpdGluZyxcclxufTogVXNlRGV0YWlsTXV0YXRpb25zQXJncykgPT4ge1xyXG4gIGNvbnN0IGhhbmRsZVVwZGF0ZSA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcclxuICAgIGlmIChidXN5IHx8ICFpc0VkaXRpbmcpIHJldHVybiBmYWxzZTtcclxuICAgIGlmICghY2FuRWRpdEhpc3RvcnkpIHtcclxuICAgICAgc2hvd1Blcm1pc3Npb25Nb2RhbCgpO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc2FmZVJlY0lkVmFsdWUgPSByZXNvbHZlU2FmZVJlY0lkKHJlY0lkKTtcclxuICAgIGlmIChzYWZlUmVjSWRWYWx1ZSA9PT0gbnVsbCkge1xyXG4gICAgICBjb25zdCBtZXNzYWdlID0gaW5kVChcIlZpc2l0c19EZXRhaWxfSW52YWxpZFJlY0lkXCIsIFwiQ291bGQgbm90IHJlc29sdmUgYWN0aXZpdHkgaWRlbnRpZmllci4gUmVsb2FkIGFuZCB0cnkgYWdhaW4uXCIpO1xyXG4gICAgICBzZXRNb2RhbEVycm9yKG1lc3NhZ2UpO1xyXG4gICAgICBzZXRTdGF0dXMobWVzc2FnZSk7XHJcbiAgICAgIGZsYXNoQWN0aW9uTWFyayhcImVycm9yUHJvY2Vzc1wiLCAxNTAwKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldE1vZGFsRXJyb3IoXCJcIik7XHJcbiAgICBzZXRCdXN5KHRydWUpO1xyXG4gICAgc2V0U3RhdHVzKGluZFQoXCJWaXNpdHNfRGV0YWlsX1VwZGF0aW5nXCIsIFwiVXBkYXRpbmcgYWN0aXZpdHkuLi5cIikpO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRWaXNpdFR5cGUgPVxyXG4gICAgICAgIG1hdGNoT3B0aW9uVmFsdWUodmlzaXRUeXBlcywgdmlzaXRUeXBlKSB8fFxyXG4gICAgICAgIG1hdGNoT3B0aW9uVmFsdWUodmlzaXRUeXBlcywgcmF3SW5pdGlhbFZpc2l0VHlwZSkgfHxcclxuICAgICAgICBkZWZhdWx0VmlzaXRUeXBlO1xyXG4gICAgICBjb25zdCBub3JtYWxpemVkQXNpc3RlbnRlVGlwbyA9XHJcbiAgICAgICAgbWF0Y2hPcHRpb25WYWx1ZShhc2lzdGVudGVUaXBvcywgYXNpc3RlbnRlVGlwbykgfHxcclxuICAgICAgICBtYXRjaE9wdGlvblZhbHVlKGFzaXN0ZW50ZVRpcG9zLCByYXdJbml0aWFsQXNpc3RlbnRlKSB8fFxyXG4gICAgICAgIHJhd0luaXRpYWxBc2lzdGVudGU7XHJcblxyXG4gICAgICBjb25zdCBwYXlsb2FkID0ge1xyXG4gICAgICAgIGFjY291bnROdW0sXHJcbiAgICAgICAgdmlzaXRUeXBlOiBub3JtYWxpemVkVmlzaXRUeXBlLFxyXG4gICAgICAgIGFzaXN0ZW50ZVRpcG86IG5vcm1hbGl6ZWRBc2lzdGVudGVUaXBvLFxyXG4gICAgICAgIGRlc2NyaXB0aW9uLFxyXG4gICAgICAgIHRyYW5zRGF0ZSxcclxuICAgICAgICBjb21lbnRhcmlvcyxcclxuICAgICAgICBhbnRlY2VkZW50ZXMsXHJcbiAgICAgICAgY29uY2x1c2lvbmVzLFxyXG4gICAgICB9O1xyXG5cclxuICAgICAgbG9nU2FmZVJlY0lkSW5EZXYoXCJ1cGRhdGVcIiwgc2FmZVJlY0lkVmFsdWUpO1xyXG4gICAgICBjb25zdCBzYWZlUmVjSWQgPSBlbmNvZGVVUklDb21wb25lbnQoc2FmZVJlY0lkVmFsdWUpO1xyXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxWaXNpdENvbW1hbmRSZXNwb25zZT4oYC9WaXNpdGFzL1VwZGF0ZUFjdGl2aXR5LyR7c2FmZVJlY0lkfWAsIHtcclxuICAgICAgICBtZXRob2Q6IFwiUFVUXCIsXHJcbiAgICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxyXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHBheWxvYWQpLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmICghaXNDb21tYW5kU3VjY2VzcyhyZXNwb25zZSkpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZ2V0Q29tbWFuZE1lc3NhZ2UocmVzcG9uc2UpIHx8IGluZFQoXCJWaXNpdHNfRGV0YWlsX1VwZGF0ZUZhaWxlZFwiLCBcIlVwZGF0ZSBmYWlsZWQuXCIpKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2V0U3RhdHVzKGluZFQoXCJWaXNpdHNfRGV0YWlsX1VwZGF0ZWRcIiwgXCJBY3Rpdml0eSB1cGRhdGVkXCIpKTtcclxuICAgICAgc2V0SXNFZGl0aW5nKGZhbHNlKTtcclxuICAgICAgc3luY0VkaXRNb2RlRmxhZyhmYWxzZSk7XHJcbiAgICAgIGNsZWFyRHJhZnQoKTtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zdCBtZXNzYWdlID0gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciAmJiBlcnJvci5tZXNzYWdlXHJcbiAgICAgICAgPyBlcnJvci5tZXNzYWdlXHJcbiAgICAgICAgOiBpbmRUKFwiVmlzaXRzX0RldGFpbF9VcGRhdGVFcnJvclwiLCBcIlVwZGF0ZSBlcnJvci5cIik7XHJcbiAgICAgIHNldE1vZGFsRXJyb3IobWVzc2FnZSk7XHJcbiAgICAgIHNldFN0YXR1cyhtZXNzYWdlKTtcclxuICAgICAgZmxhc2hBY3Rpb25NYXJrKFwiZXJyb3JQcm9jZXNzXCIsIDE1MDApO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9IGZpbmFsbHkge1xyXG4gICAgICBzZXRCdXN5KGZhbHNlKTtcclxuICAgIH1cclxuICB9LCBbXHJcbiAgICBhY2NvdW50TnVtLFxyXG4gICAgYW50ZWNlZGVudGVzLFxyXG4gICAgYXNpc3RlbnRlVGlwbyxcclxuICAgIGFzaXN0ZW50ZVRpcG9zLFxyXG4gICAgYnVzeSxcclxuICAgIGNhbkVkaXRIaXN0b3J5LFxyXG4gICAgY2xlYXJEcmFmdCxcclxuICAgIGNvbWVudGFyaW9zLFxyXG4gICAgY29uY2x1c2lvbmVzLFxyXG4gICAgZGVmYXVsdFZpc2l0VHlwZSxcclxuICAgIGRlc2NyaXB0aW9uLFxyXG4gICAgaXNFZGl0aW5nLFxyXG4gICAgbWF0Y2hPcHRpb25WYWx1ZSxcclxuICAgIHJhd0luaXRpYWxBc2lzdGVudGUsXHJcbiAgICByYXdJbml0aWFsVmlzaXRUeXBlLFxyXG4gICAgcmVjSWQsXHJcbiAgICBzZXRCdXN5LFxyXG4gICAgc2V0SXNFZGl0aW5nLFxyXG4gICAgc2V0TW9kYWxFcnJvcixcclxuICAgIHNldFN0YXR1cyxcclxuICAgIHN5bmNFZGl0TW9kZUZsYWcsXHJcbiAgICB0cmFuc0RhdGUsXHJcbiAgICB2aXNpdFR5cGUsXHJcbiAgICB2aXNpdFR5cGVzLFxyXG4gIF0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVEZWxldGUgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XHJcbiAgICBpZiAoYnVzeSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgaWYgKCFjYW5EZWxldGVIaXN0b3J5KSB7XHJcbiAgICAgIHNob3dQZXJtaXNzaW9uTW9kYWwoKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHNhZmVSZWNJZFZhbHVlID0gcmVzb2x2ZVNhZmVSZWNJZChyZWNJZCk7XHJcbiAgICBpZiAoc2FmZVJlY0lkVmFsdWUgPT09IG51bGwpIHtcclxuICAgICAgY29uc3QgbWVzc2FnZSA9IGluZFQoXCJWaXNpdHNfRGV0YWlsX0ludmFsaWRSZWNJZFwiLCBcIkNvdWxkIG5vdCByZXNvbHZlIGFjdGl2aXR5IGlkZW50aWZpZXIuIFJlbG9hZCBhbmQgdHJ5IGFnYWluLlwiKTtcclxuICAgICAgc2V0TW9kYWxFcnJvcihtZXNzYWdlKTtcclxuICAgICAgc2V0U3RhdHVzKG1lc3NhZ2UpO1xyXG4gICAgICBmbGFzaEFjdGlvbk1hcmsoXCJlcnJvclByb2Nlc3NcIiwgMTUwMCk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xyXG4gICAgc2V0QnVzeSh0cnVlKTtcclxuICAgIHNldFN0YXR1cyhpbmRUKFwiVmlzaXRzX0RldGFpbF9EZWxldGluZ1wiLCBcIkRlbGV0aW5nIGFjdGl2aXR5Li4uXCIpKTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBsb2dTYWZlUmVjSWRJbkRldihcImRlbGV0ZVwiLCBzYWZlUmVjSWRWYWx1ZSk7XHJcbiAgICAgIGNvbnN0IHNhZmVSZWNJZCA9IGVuY29kZVVSSUNvbXBvbmVudChzYWZlUmVjSWRWYWx1ZSk7XHJcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPFZpc2l0Q29tbWFuZFJlc3BvbnNlPihgL1Zpc2l0YXMvRGVsZXRlQWN0aXZpdHkvJHtzYWZlUmVjSWR9YCwgeyBtZXRob2Q6IFwiREVMRVRFXCIgfSk7XHJcbiAgICAgIGlmICghaXNDb21tYW5kU3VjY2VzcyhyZXNwb25zZSkpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZ2V0Q29tbWFuZE1lc3NhZ2UocmVzcG9uc2UpIHx8IGluZFQoXCJWaXNpdHNfRGV0YWlsX0RlbGV0ZUZhaWxlZFwiLCBcIkRlbGV0ZSBmYWlsZWQuXCIpKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2V0U3RhdHVzKGluZFQoXCJWaXNpdHNfRGV0YWlsX0RlbGV0ZWRcIiwgXCJBY3Rpdml0eSBkZWxldGVkXCIpKTtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zdCBtZXNzYWdlID0gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciAmJiBlcnJvci5tZXNzYWdlXHJcbiAgICAgICAgPyBlcnJvci5tZXNzYWdlXHJcbiAgICAgICAgOiBpbmRUKFwiVmlzaXRzX0RldGFpbF9EZWxldGVFcnJvclwiLCBcIkRlbGV0ZSBlcnJvci5cIik7XHJcbiAgICAgIHNldE1vZGFsRXJyb3IobWVzc2FnZSk7XHJcbiAgICAgIHNldFN0YXR1cyhtZXNzYWdlKTtcclxuICAgICAgZmxhc2hBY3Rpb25NYXJrKFwiZXJyb3JQcm9jZXNzXCIsIDE1MDApO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9IGZpbmFsbHkge1xyXG4gICAgICBzZXRCdXN5KGZhbHNlKTtcclxuICAgIH1cclxuICB9LCBbYnVzeSwgY2FuRGVsZXRlSGlzdG9yeSwgcmVjSWQsIHNldEJ1c3ksIHNldE1vZGFsRXJyb3IsIHNldFN0YXR1c10pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgaGFuZGxlVXBkYXRlLFxyXG4gICAgaGFuZGxlRGVsZXRlLFxyXG4gIH07XHJcbn07XHJcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBEZXRhaWxGb3JtIGZyb20gXCIuL0RldGFpbEZvcm0udHN4XCI7XHJcbmltcG9ydCBWaXNpdGFzUGFnZVByb3ZpZGVycyBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1Zpc2l0YXNQYWdlUHJvdmlkZXJzLnRzeFwiO1xyXG5pbXBvcnQgeyBtb3VudFJlYWN0SXNsYW5kLCBtb3VudFdoZW5Eb2N1bWVudFJlYWR5IH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3JlYWN0SXNsYW5kLnRzeFwiO1xyXG5cclxuLy8gUGFnZSBlbnRyeSBmb3IgdGhlIHZpc2l0YXMgZGV0YWlsIGlzbGFuZC5cclxuY29uc3QgRGV0YWlsUGFnZSA9ICgpID0+IHtcclxuICByZXR1cm4gKFxyXG4gICAgPFZpc2l0YXNQYWdlUHJvdmlkZXJzPlxyXG4gICAgICA8RGV0YWlsRm9ybSAvPlxyXG4gICAgPC9WaXNpdGFzUGFnZVByb3ZpZGVycz5cclxuICApO1xyXG59O1xyXG5cclxuY29uc3QgbW91bnQgPSAoKSA9PiB7XHJcbiAgY29uc3Qgcm9vdEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2aXNpdGEtZGV0YWlsLXJvb3RcIik7XHJcbiAgaWYgKCFyb290RWwpIHJldHVybjtcclxuXHJcbiAgbW91bnRSZWFjdElzbGFuZChyb290RWwsIDxEZXRhaWxQYWdlIC8+KTtcclxufTtcclxuXHJcbm1vdW50V2hlbkRvY3VtZW50UmVhZHkobW91bnQpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRGV0YWlsUGFnZTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBQUEsZ0JBQXlFOzs7QUNBbEUsSUFBTSxvQkFBb0IsQ0FBQyxPQUEyQjtBQUMzRCxNQUFJLENBQUMsR0FBSSxRQUFPLE1BQU07QUFBQSxFQUFDO0FBQ3ZCLFFBQU0sU0FBUyxDQUFDLFVBQWlCLE1BQU0sZUFBZTtBQUN0RCxRQUFNLFNBQVMsQ0FBQyxlQUFlLGVBQWUsUUFBUSxPQUFPLE9BQU87QUFDcEUsU0FBTyxRQUFRLENBQUMsUUFBUSxHQUFHLGlCQUFpQixLQUFLLE1BQU0sQ0FBQztBQUN4RCxTQUFPLE1BQU07QUFDWCxXQUFPLFFBQVEsQ0FBQyxRQUFRLEdBQUcsb0JBQW9CLEtBQUssTUFBTSxDQUFDO0FBQUEsRUFDN0Q7QUFDRjs7O0FDUk8sSUFBTSxXQUFXLENBQUMsVUFBbUIsT0FBTyxTQUFTLEVBQUUsRUFBRSxLQUFLLEVBQUUsU0FBUzs7O0FDQWhGLG1CQUF1QztBQXNCdkMsSUFBTSxvQkFBb0IsQ0FBQyxhQUE4QztBQUN2RSxTQUFPLFNBQVMsWUFBWSxRQUFRLFNBQVMsWUFBWTtBQUMzRDtBQUVBLElBQU0scUJBQXFCLENBQUMsYUFBNkM7QUFDdkUsUUFBTSxNQUFNLFNBQVMsV0FBVyxTQUFTO0FBQ3pDLFNBQU8sT0FBTyxRQUFRLFdBQVcsSUFBSSxLQUFLLElBQUk7QUFDaEQ7QUFFQSxJQUFNLGtCQUFrQixDQUFDLGFBQWtFO0FBQ3pGLFFBQU0sT0FBTyxTQUFTLFFBQVEsU0FBUztBQUN2QyxTQUFPLFFBQVEsT0FBTyxTQUFTLFdBQVcsT0FBTztBQUNuRDtBQUVBLElBQU0sV0FBVyxDQUFDLFVBQW1EO0FBQ25FLE1BQUksQ0FBQyxTQUFTLE9BQU8sVUFBVSxZQUFZLE1BQU0sUUFBUSxLQUFLLEVBQUcsUUFBTztBQUN4RSxTQUFPO0FBQ1Q7QUF5Qk8sSUFBTSxxQkFBcUIsQ0FBQztBQUFBLEVBQ2pDO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0YsTUFBOEI7QUFDNUIsUUFBTSxxQkFBaUIsMEJBQVksWUFBWTtBQUM3QyxRQUFJLENBQUMsWUFBYTtBQUNsQixtQkFBZSxJQUFJO0FBQ25CLFFBQUk7QUFDRixZQUFNLE1BQU0sTUFBTSxVQUFrQyxtQ0FBbUMsbUJBQW1CLFdBQVcsQ0FBQyxFQUFFO0FBQ3hILFlBQU0sZUFBZSxnQkFBZ0IsR0FBRztBQUV4QyxVQUFJLENBQUMsa0JBQWtCLEdBQUcsS0FBSyxDQUFDLGNBQWM7QUFDNUMsa0JBQVUsbUJBQW1CLEdBQUcsS0FBSyxLQUFLLG9DQUFvQyxrQ0FBa0MsQ0FBQztBQUNqSDtBQUFBLE1BQ0Y7QUFFQSxZQUFNLFVBQVUsT0FBTyxhQUFhLGFBQWEsYUFBYSxhQUFhLEVBQUU7QUFDN0UsbUJBQWEscUJBQXFCLE9BQU8sQ0FBQztBQUUxQyxZQUFNLGVBQWU7QUFBQSxRQUNuQixhQUFhLGNBQWMsYUFBYSxjQUFjLGFBQWEsYUFBYSxhQUFhLGFBQWE7QUFBQSxNQUM1RztBQUNBLG1CQUFhLGlCQUFpQixZQUFZLFlBQVksS0FBSyxnQkFBZ0I7QUFFM0UsWUFBTSxpQkFBaUIsYUFBYSxjQUFjLGFBQWE7QUFDL0QsWUFBTSxpQkFBaUIsTUFBTSxRQUFRLGNBQWMsS0FBSyxlQUFlLFNBQVMsU0FBUyxlQUFlLENBQUMsQ0FBQyxJQUFJO0FBQzlHLFlBQU0sbUJBQW1CO0FBQUEsUUFDdkIsYUFBYSxpQkFDWCxhQUFhLGlCQUNiLGdCQUFnQixpQkFDaEIsZ0JBQWdCLGlCQUNoQjtBQUFBLE1BQ0o7QUFDQSxZQUFNLDBCQUEwQixpQkFBaUIsZ0JBQWdCLGdCQUFnQjtBQUNqRix1QkFBaUIsMkJBQTJCLGdCQUFnQjtBQUM1RCxxQkFBZSxPQUFPLGFBQWEsZUFBZSxhQUFhLGVBQWUsRUFBRSxDQUFDO0FBQ2pGLHFCQUFlLE9BQU8sYUFBYSxlQUFlLGFBQWEsZUFBZSxFQUFFLENBQUM7QUFDakYsc0JBQWdCLE9BQU8sYUFBYSxnQkFBZ0IsYUFBYSxnQkFBZ0IsRUFBRSxDQUFDO0FBQ3BGLHNCQUFnQixPQUFPLGFBQWEsZ0JBQWdCLGFBQWEsZ0JBQWdCLEVBQUUsQ0FBQztBQUFBLElBQ3RGLFFBQVE7QUFBQSxJQUVSLFVBQUU7QUFDQSxxQkFBZSxLQUFLO0FBQ3BCLHVCQUFpQjtBQUNqQiw0QkFBc0I7QUFBQSxJQUN4QjtBQUFBLEVBQ0YsR0FBRztBQUFBLElBQ0Q7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0YsQ0FBQztBQUVELDhCQUFVLE1BQU07QUFDZCxRQUFJLGVBQWU7QUFDakIscUJBQWU7QUFDZjtBQUFBLElBQ0Y7QUFDQSxxQkFBaUI7QUFDakIsMEJBQXNCO0FBQUEsRUFDeEIsR0FBRyxDQUFDLGtCQUFrQix1QkFBdUIsZ0JBQWdCLGFBQWEsQ0FBQztBQUM3RTs7O0FDNUpBLElBQUFDLGdCQUEwQjtBQStCbkIsSUFBTSx5QkFBeUIsQ0FBQztBQUFBLEVBQ3JDO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0EsZ0JBQWdCO0FBQUEsRUFDaEIsbUJBQW1CO0FBQUEsRUFDbkI7QUFBQSxFQUNBO0FBQ0YsTUFBa0M7QUFDaEMsK0JBQVUsTUFBTTtBQUNkLFFBQUksQ0FBQyxpQkFBa0I7QUFFdkIsVUFBTSxXQUFXLFNBQVMsZUFBZSxlQUFlO0FBQ3hELFVBQU0sV0FBVyxTQUFTLGVBQWUsZUFBZTtBQUN4RCxVQUFNLFlBQVksU0FBUyxlQUFlLGdCQUFnQjtBQUMxRCxVQUFNLFlBQVksU0FBUyxlQUFlLGdCQUFnQjtBQUMxRCxVQUFNLFVBQVUsVUFBVSxRQUFRLFFBQVEsS0FBSztBQUMvQyxRQUFJLFdBQVc7QUFDYixVQUFJLFFBQVMsU0FBUSxVQUFVLE9BQU8sZUFBZTtBQUNyRCxVQUFJLFNBQVUsVUFBUyxVQUFVLElBQUksUUFBUTtBQUM3QyxVQUFJLFNBQVUsVUFBUyxVQUFVLE9BQU8sUUFBUTtBQUNoRCxVQUFJLFVBQVcsV0FBVSxVQUFVLElBQUksZUFBZTtBQUN0RCxVQUFJLFVBQVcsV0FBVSxVQUFVLE9BQU8sZUFBZTtBQUFBLElBQzNELE9BQU87QUFDTCxVQUFJLFFBQVMsU0FBUSxVQUFVLE9BQU8sZUFBZTtBQUNyRCxVQUFJLFNBQVUsVUFBUyxVQUFVLE9BQU8sUUFBUTtBQUNoRCxVQUFJLFNBQVUsVUFBUyxVQUFVLElBQUksUUFBUTtBQUM3QyxVQUFJLFVBQVcsV0FBVSxVQUFVLE9BQU8sZUFBZTtBQUN6RCxVQUFJLFVBQVcsV0FBVSxVQUFVLElBQUksZUFBZTtBQUFBLElBQ3hEO0FBRUEsOEJBQTBCLGFBQWE7QUFBQSxFQUN6QyxHQUFHLENBQUMsZUFBZSxXQUFXLGdCQUFnQixDQUFDO0FBRS9DLCtCQUFVLE1BQU07QUFDZCxRQUFJLENBQUMsaUJBQWtCO0FBRXZCLFVBQU0sU0FBUyxNQUFNO0FBQ25CLFVBQUksQ0FBQyxnQkFBZ0I7QUFDbkIsNEJBQW9CO0FBQ3BCO0FBQUEsTUFDRjtBQUNBLFVBQUksV0FBVztBQUNiLFlBQUksUUFBUSxVQUFXO0FBQ3ZCLHNCQUFjLEVBQUU7QUFDaEIsb0JBQVk7QUFBQSxVQUNWLE9BQU8sS0FBSyxtQ0FBbUMsaUNBQWlDO0FBQUEsVUFDaEYsU0FBUyxLQUFLLGtDQUFrQyxnQ0FBZ0M7QUFBQSxVQUNoRixhQUFhLEtBQUssZUFBZSxhQUFhO0FBQUEsVUFDOUMsV0FBVyxZQUFZO0FBQ3JCLGtCQUFNLEtBQUssTUFBTSxhQUFhO0FBQzlCLGdCQUFJLElBQUk7QUFDTiwyQkFBYTtBQUNiLHNDQUF3QixTQUFTO0FBQ2pDLG9CQUFNLEtBQUssR0FBRztBQUNkLDhCQUFnQixhQUFhLElBQUk7QUFDakMsb0JBQU0sS0FBSyxJQUFJO0FBQ2YscUJBQU8saUNBQWlDO0FBQ3hDLHFCQUFPLFNBQVMsT0FBTztBQUFBLFlBQ3pCO0FBQ0EsbUJBQU87QUFBQSxVQUNUO0FBQUEsUUFDRixDQUFDO0FBQUEsTUFDSCxPQUFPO0FBQ0wseUJBQWlCO0FBQUEsTUFDbkI7QUFBQSxJQUNGO0FBRUEsVUFBTSxXQUFXLE1BQU07QUFDckIsVUFBSSxDQUFDLGtCQUFrQjtBQUNyQiw0QkFBb0I7QUFDcEI7QUFBQSxNQUNGO0FBQ0EsVUFBSSxRQUFRLFVBQVc7QUFDdkIsb0JBQWMsRUFBRTtBQUNoQixrQkFBWTtBQUFBLFFBQ1YsT0FBTyxLQUFLLHNDQUFzQyxvQ0FBb0M7QUFBQSxRQUN0RixTQUFTLEtBQUsscUNBQXFDLG1DQUFtQztBQUFBLFFBQ3RGLGFBQWEsS0FBSyxpQkFBaUIsZUFBZTtBQUFBLFFBQ2xELFdBQVcsWUFBWTtBQUNyQixnQkFBTSxLQUFLLE1BQU0sYUFBYTtBQUM5QixjQUFJLElBQUk7QUFDTix5QkFBYTtBQUNiLG9DQUF3QixTQUFTO0FBQ2pDLGtCQUFNLEtBQUssR0FBRztBQUNkLDRCQUFnQixnQkFBZ0IsSUFBSTtBQUNwQyxrQkFBTSxLQUFLLElBQUk7QUFDZixtQkFBTyxpQ0FBaUM7QUFDeEMsbUJBQU8sU0FBUyxPQUFPO0FBQUEsVUFDekI7QUFDQSxpQkFBTztBQUFBLFFBQ1Q7QUFBQSxNQUNGLENBQUM7QUFBQSxJQUNIO0FBRUEsVUFBTSxlQUFlLE1BQU07QUFDekIsVUFBSSxRQUFRLFVBQVc7QUFDdkIsdUJBQWlCO0FBQUEsSUFDbkI7QUFFQSxXQUFPLGlCQUFpQixjQUFjLE1BQU07QUFDNUMsV0FBTyxpQkFBaUIsZ0JBQWdCLFFBQVE7QUFDaEQsV0FBTyxpQkFBaUIscUJBQXFCLFlBQVk7QUFDekQsV0FBTyxNQUFNO0FBQ1gsYUFBTyxvQkFBb0IsY0FBYyxNQUFNO0FBQy9DLGFBQU8sb0JBQW9CLGdCQUFnQixRQUFRO0FBQ25ELGFBQU8sb0JBQW9CLHFCQUFxQixZQUFZO0FBQUEsSUFDOUQ7QUFBQSxFQUNGLEdBQUc7QUFBQSxJQUNEO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0YsQ0FBQztBQUNIOzs7QUNuS0MsSUFBQUMsZ0JBQXNEO0FBR3ZELElBQU0sbUJBQW1CLElBQUksS0FBSyxLQUFLO0FBQ3ZDLElBQU0sc0JBQXNCLEtBQUssS0FBSyxLQUFLO0FBbUNwQyxJQUFNLHVCQUF1QixDQUFDO0FBQUEsRUFDbkM7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRixNQUFnQztBQUM5QixRQUFNLHFCQUFpQixzQkFBTyxFQUFFO0FBQ2hDLFFBQU0sa0JBQWMsc0JBQU8sRUFBRTtBQUM3QixRQUFNLDJCQUF1QixzQkFBc0IsSUFBSTtBQUd2RCxRQUFNLHVCQUFtQiwyQkFBWSxDQUFDLFlBQXFCO0FBQ3pELFVBQU0sTUFBTSxlQUFlO0FBQzNCLFFBQUksQ0FBQyxJQUFLO0FBQ1YsUUFBSSxTQUFTO0FBQ1gsZ0NBQTBCLEtBQUssUUFBUSxnQkFBZ0I7QUFDdkQ7QUFBQSxJQUNGO0FBQ0EsaUNBQTZCLEdBQUc7QUFBQSxFQUNsQyxHQUFHLENBQUMsQ0FBQztBQUVMLFFBQU0sMEJBQXNCLDJCQUFZLE1BQU07QUFDNUMsVUFBTSxTQUFTLGVBQWUsU0FBUztBQUN2QyxVQUFNLE1BQU0sa0JBQWtCLE1BQU07QUFDcEMsVUFBTSxZQUFZLEdBQUcsR0FBRztBQUN4QixVQUFNLFdBQVcsbUJBQW1CLE1BQU07QUFDMUMsbUJBQWUsVUFBVTtBQUV6QixRQUFJO0FBQ0YsWUFBTSxlQUFlLDBCQUEwQixTQUFTLE1BQU07QUFDOUQsVUFBSSxjQUFjO0FBQ2hCLHFDQUE2QixTQUFTO0FBQUEsTUFDeEM7QUFFQSxVQUFJLGtCQUFrQixnQkFBZ0IsMEJBQTBCLEdBQUcsTUFBTSxRQUFRO0FBQy9FLHFCQUFhLElBQUk7QUFBQSxNQUNuQixPQUFPO0FBQ0wscUJBQWEsS0FBSztBQUNsQixxQ0FBNkIsR0FBRztBQUNoQyxxQ0FBNkIsUUFBUTtBQUFBLE1BQ3ZDO0FBRUEsVUFBSSxDQUFDLGdCQUFnQjtBQUNuQixxQ0FBNkIsR0FBRztBQUNoQyxxQ0FBNkIsUUFBUTtBQUFBLE1BQ3ZDO0FBQUEsSUFDRixRQUFRO0FBQUEsSUFFUjtBQUFBLEVBQ0YsR0FBRyxDQUFDLGFBQWEsZ0JBQWdCLE9BQU8sWUFBWSxDQUFDO0FBRXJELCtCQUFVLE1BQU07QUFDZCx3QkFBb0I7QUFBQSxFQUN0QixHQUFHLENBQUMsbUJBQW1CLENBQUM7QUFFeEIsK0JBQVUsTUFBTTtBQUNkLFVBQU0sYUFBYSxDQUFDLFVBQStCO0FBQ2pELFlBQU0sV0FBVyxPQUFPLGdCQUFnQixlQUFlLFlBQVksbUJBQzlELFlBQVksaUJBQWlCLFlBQVksRUFBRSxDQUFDLElBQzdDO0FBQ0osWUFBTSxnQkFBZ0IsVUFBVSxTQUFTO0FBQ3pDLFVBQUksT0FBTyxhQUFhLGVBQWU7QUFDckMsNEJBQW9CO0FBQUEsTUFDdEI7QUFBQSxJQUNGO0FBRUEsV0FBTyxpQkFBaUIsWUFBWSxVQUFVO0FBQzlDLFdBQU8sTUFBTSxPQUFPLG9CQUFvQixZQUFZLFVBQVU7QUFBQSxFQUNoRSxHQUFHLENBQUMsbUJBQW1CLENBQUM7QUFFeEIsK0JBQVUsTUFBTTtBQUNkLFVBQU0sTUFBTSxtQkFBbUIsZUFBZSxTQUFTLFNBQVM7QUFDaEUsZ0JBQVksVUFBVTtBQUFBLEVBQ3hCLEdBQUcsQ0FBQyxhQUFhLEtBQUssQ0FBQztBQUV2QixRQUFNLGdCQUFZLDJCQUFZLENBQUMsVUFBNkI7QUFDMUQsVUFBTSxNQUFNLFlBQVk7QUFDeEIsUUFBSSxDQUFDLElBQUs7QUFDViw4QkFBMEIsS0FBSyxLQUFLLFVBQVUsS0FBSyxHQUFHLG1CQUFtQjtBQUFBLEVBQzNFLEdBQUcsQ0FBQyxDQUFDO0FBRUwsUUFBTSxpQkFBYSwyQkFBWSxNQUFNO0FBQ25DLFVBQU0sTUFBTSxZQUFZO0FBQ3hCLFFBQUksQ0FBQyxJQUFLO0FBQ1YsaUNBQTZCLEdBQUc7QUFBQSxFQUNsQyxHQUFHLENBQUMsQ0FBQztBQUVMLFFBQU0sdUJBQW1CLDJCQUFZLE1BQU07QUFDekMsVUFBTSxNQUFNLFlBQVk7QUFDeEIsUUFBSSxDQUFDLElBQUs7QUFFVixRQUFJO0FBQ0YsWUFBTSxNQUFNLDBCQUEwQixHQUFHO0FBQ3pDLFVBQUksQ0FBQyxJQUFLO0FBQ1YsWUFBTSxRQUFRLEtBQUssTUFBTSxHQUFHO0FBQzVCLFVBQUksQ0FBQyxTQUFTLE9BQU8sVUFBVSxTQUFVO0FBRXpDLFVBQUksTUFBTSxjQUFjLE9BQVcsY0FBYSxPQUFPLE1BQU0sU0FBUyxDQUFDO0FBQ3ZFLFVBQUksTUFBTSxjQUFjLE9BQVcsY0FBYSxPQUFPLE1BQU0sU0FBUyxDQUFDO0FBQ3ZFLFVBQUksTUFBTSxrQkFBa0IsT0FBVyxrQkFBaUIsT0FBTyxNQUFNLGFBQWEsQ0FBQztBQUNuRixVQUFJLE1BQU0sZ0JBQWdCLE9BQVcsZ0JBQWUsT0FBTyxNQUFNLFdBQVcsQ0FBQztBQUM3RSxVQUFJLE1BQU0sZ0JBQWdCLE9BQVcsZ0JBQWUsT0FBTyxNQUFNLFdBQVcsQ0FBQztBQUM3RSxVQUFJLE1BQU0saUJBQWlCLE9BQVcsaUJBQWdCLE9BQU8sTUFBTSxZQUFZLENBQUM7QUFDaEYsVUFBSSxNQUFNLGlCQUFpQixPQUFXLGlCQUFnQixPQUFPLE1BQU0sWUFBWSxDQUFDO0FBQUEsSUFDbEYsUUFBUTtBQUFBLElBRVI7QUFBQSxFQUNGLEdBQUcsQ0FBQyxpQkFBaUIsa0JBQWtCLGdCQUFnQixpQkFBaUIsZ0JBQWdCLGNBQWMsWUFBWSxDQUFDO0FBRW5ILCtCQUFVLE1BQU07QUFDZCxRQUFJLENBQUMsV0FBVztBQUNkLFVBQUkscUJBQXFCLFNBQVM7QUFDaEMscUJBQWEscUJBQXFCLE9BQU87QUFDekMsNkJBQXFCLFVBQVU7QUFBQSxNQUNqQztBQUNBO0FBQUEsSUFDRjtBQUVBLFFBQUkscUJBQXFCLFNBQVM7QUFDaEMsbUJBQWEscUJBQXFCLE9BQU87QUFBQSxJQUMzQztBQUVBLHlCQUFxQixVQUFVLE9BQU8sV0FBVyxNQUFNO0FBQ3JELDJCQUFxQixVQUFVO0FBQy9CLGdCQUFVO0FBQUEsUUFDUjtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQ0YsQ0FBQztBQUFBLElBQ0gsR0FBRyxHQUFHO0FBRU4sV0FBTyxNQUFNO0FBQ1gsVUFBSSxxQkFBcUIsU0FBUztBQUNoQyxxQkFBYSxxQkFBcUIsT0FBTztBQUN6Qyw2QkFBcUIsVUFBVTtBQUFBLE1BQ2pDO0FBQUEsSUFDRjtBQUFBLEVBQ0YsR0FBRyxDQUFDLGNBQWMsZUFBZSxhQUFhLGNBQWMsYUFBYSxXQUFXLFdBQVcsV0FBVyxTQUFTLENBQUM7QUFFcEgsU0FBTztBQUFBLElBQ0w7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQ0Y7OztBQzNNQyxJQUFBQyxnQkFBbUM7QUFvQnBDLElBQU0sbUJBQW1CLENBQUMsYUFBNEM7QUFDcEUsU0FBTyxTQUFTLFlBQVksUUFBUSxTQUFTLFlBQVk7QUFDM0Q7QUFFQSxJQUFNLG9CQUFvQixDQUFDLGFBQTJDO0FBQ3BFLFFBQU0sTUFBTSxTQUFTLFdBQVcsU0FBUztBQUN6QyxTQUFPLE9BQU8sUUFBUSxXQUFXLElBQUksS0FBSyxJQUFJO0FBQ2hEO0FBR0EsSUFBTSxtQkFBbUIsQ0FBQyxhQUFvQztBQUM1RCxRQUFNLGFBQWEsT0FBTyxZQUFZLEVBQUUsRUFBRSxLQUFLO0FBQy9DLE1BQUksQ0FBQyxXQUFZLFFBQU87QUFFeEIsTUFBSSxDQUFDLFVBQVUsS0FBSyxVQUFVLEVBQUcsUUFBTztBQUV4QyxRQUFNLGlCQUFpQixXQUFXLFdBQVcsR0FBRyxJQUFJLFdBQVcsTUFBTSxDQUFDLElBQUk7QUFDMUUsTUFBSSxDQUFDLGtCQUFrQixPQUFPLEtBQUssY0FBYyxFQUFHLFFBQU87QUFFM0QsU0FBTztBQUNUO0FBRUEsSUFBTSxzQkFBc0IsTUFBZTtBQUN6QyxNQUFJLE9BQU8sV0FBVyxlQUFlLENBQUMsT0FBTyxTQUFVLFFBQU87QUFDOUQsUUFBTSxPQUFPLE9BQU8sT0FBTyxTQUFTLFlBQVksRUFBRSxFQUFFLEtBQUssRUFBRSxZQUFZO0FBQ3ZFLFNBQU8sU0FBUyxlQUFlLFNBQVMsZUFBZSxLQUFLLFNBQVMsUUFBUTtBQUMvRTtBQUVBLElBQU0sb0JBQW9CLENBQUMsV0FBZ0MsY0FBNEI7QUFDckYsTUFBSSxDQUFDLG9CQUFvQixFQUFHO0FBQzVCLFVBQVEsS0FBSyxvQkFBb0IsU0FBUyxVQUFVLFNBQVM7QUFDL0Q7QUErQk8sSUFBTSxxQkFBcUIsQ0FBQztBQUFBLEVBQ2pDO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0YsTUFBOEI7QUFDNUIsUUFBTSxtQkFBZSwyQkFBWSxZQUFZO0FBQzNDLFFBQUksUUFBUSxDQUFDLFVBQVcsUUFBTztBQUMvQixRQUFJLENBQUMsZ0JBQWdCO0FBQ25CLDBCQUFvQjtBQUNwQixhQUFPO0FBQUEsSUFDVDtBQUVBLFVBQU0saUJBQWlCLGlCQUFpQixLQUFLO0FBQzdDLFFBQUksbUJBQW1CLE1BQU07QUFDM0IsWUFBTSxVQUFVLEtBQUssOEJBQThCLDhEQUE4RDtBQUNqSCxvQkFBYyxPQUFPO0FBQ3JCLGdCQUFVLE9BQU87QUFDakIsc0JBQWdCLGdCQUFnQixJQUFJO0FBQ3BDLGFBQU87QUFBQSxJQUNUO0FBRUEsa0JBQWMsRUFBRTtBQUNoQixZQUFRLElBQUk7QUFDWixjQUFVLEtBQUssMEJBQTBCLHNCQUFzQixDQUFDO0FBRWhFLFFBQUk7QUFDRixZQUFNLHNCQUNKLGlCQUFpQixZQUFZLFNBQVMsS0FDdEMsaUJBQWlCLFlBQVksbUJBQW1CLEtBQ2hEO0FBQ0YsWUFBTSwwQkFDSixpQkFBaUIsZ0JBQWdCLGFBQWEsS0FDOUMsaUJBQWlCLGdCQUFnQixtQkFBbUIsS0FDcEQ7QUFFRixZQUFNLFVBQVU7QUFBQSxRQUNkO0FBQUEsUUFDQSxXQUFXO0FBQUEsUUFDWCxlQUFlO0FBQUEsUUFDZjtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBRUEsd0JBQWtCLFVBQVUsY0FBYztBQUMxQyxZQUFNLFlBQVksbUJBQW1CLGNBQWM7QUFDbkQsWUFBTSxXQUFXLE1BQU0sVUFBZ0MsMkJBQTJCLFNBQVMsSUFBSTtBQUFBLFFBQzdGLFFBQVE7QUFBQSxRQUNSLFNBQVMsRUFBRSxnQkFBZ0IsbUJBQW1CO0FBQUEsUUFDOUMsTUFBTSxLQUFLLFVBQVUsT0FBTztBQUFBLE1BQzlCLENBQUM7QUFFRCxVQUFJLENBQUMsaUJBQWlCLFFBQVEsR0FBRztBQUMvQixjQUFNLElBQUksTUFBTSxrQkFBa0IsUUFBUSxLQUFLLEtBQUssOEJBQThCLGdCQUFnQixDQUFDO0FBQUEsTUFDckc7QUFFQSxnQkFBVSxLQUFLLHlCQUF5QixrQkFBa0IsQ0FBQztBQUMzRCxtQkFBYSxLQUFLO0FBQ2xCLHVCQUFpQixLQUFLO0FBQ3RCLGlCQUFXO0FBQ1gsYUFBTztBQUFBLElBQ1QsU0FBUyxPQUFPO0FBQ2QsWUFBTSxVQUFVLGlCQUFpQixTQUFTLE1BQU0sVUFDNUMsTUFBTSxVQUNOLEtBQUssNkJBQTZCLGVBQWU7QUFDckQsb0JBQWMsT0FBTztBQUNyQixnQkFBVSxPQUFPO0FBQ2pCLHNCQUFnQixnQkFBZ0IsSUFBSTtBQUNwQyxhQUFPO0FBQUEsSUFDVCxVQUFFO0FBQ0EsY0FBUSxLQUFLO0FBQUEsSUFDZjtBQUFBLEVBQ0YsR0FBRztBQUFBLElBQ0Q7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0YsQ0FBQztBQUVELFFBQU0sbUJBQWUsMkJBQVksWUFBWTtBQUMzQyxRQUFJLEtBQU0sUUFBTztBQUNqQixRQUFJLENBQUMsa0JBQWtCO0FBQ3JCLDBCQUFvQjtBQUNwQixhQUFPO0FBQUEsSUFDVDtBQUVBLFVBQU0saUJBQWlCLGlCQUFpQixLQUFLO0FBQzdDLFFBQUksbUJBQW1CLE1BQU07QUFDM0IsWUFBTSxVQUFVLEtBQUssOEJBQThCLDhEQUE4RDtBQUNqSCxvQkFBYyxPQUFPO0FBQ3JCLGdCQUFVLE9BQU87QUFDakIsc0JBQWdCLGdCQUFnQixJQUFJO0FBQ3BDLGFBQU87QUFBQSxJQUNUO0FBRUEsa0JBQWMsRUFBRTtBQUNoQixZQUFRLElBQUk7QUFDWixjQUFVLEtBQUssMEJBQTBCLHNCQUFzQixDQUFDO0FBRWhFLFFBQUk7QUFDRix3QkFBa0IsVUFBVSxjQUFjO0FBQzFDLFlBQU0sWUFBWSxtQkFBbUIsY0FBYztBQUNuRCxZQUFNLFdBQVcsTUFBTSxVQUFnQywyQkFBMkIsU0FBUyxJQUFJLEVBQUUsUUFBUSxTQUFTLENBQUM7QUFDbkgsVUFBSSxDQUFDLGlCQUFpQixRQUFRLEdBQUc7QUFDL0IsY0FBTSxJQUFJLE1BQU0sa0JBQWtCLFFBQVEsS0FBSyxLQUFLLDhCQUE4QixnQkFBZ0IsQ0FBQztBQUFBLE1BQ3JHO0FBRUEsZ0JBQVUsS0FBSyx5QkFBeUIsa0JBQWtCLENBQUM7QUFDM0QsYUFBTztBQUFBLElBQ1QsU0FBUyxPQUFPO0FBQ2QsWUFBTSxVQUFVLGlCQUFpQixTQUFTLE1BQU0sVUFDNUMsTUFBTSxVQUNOLEtBQUssNkJBQTZCLGVBQWU7QUFDckQsb0JBQWMsT0FBTztBQUNyQixnQkFBVSxPQUFPO0FBQ2pCLHNCQUFnQixnQkFBZ0IsSUFBSTtBQUNwQyxhQUFPO0FBQUEsSUFDVCxVQUFFO0FBQ0EsY0FBUSxLQUFLO0FBQUEsSUFDZjtBQUFBLEVBQ0YsR0FBRyxDQUFDLE1BQU0sa0JBQWtCLE9BQU8sU0FBUyxlQUFlLFNBQVMsQ0FBQztBQUVyRSxTQUFPO0FBQUEsSUFDTDtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQ0Y7OztBTnVMTTtBQTNaTixJQUFNLDRCQUE0QixJQUFJLEtBQUssS0FBSztBQUVoRCxJQUFNLFlBQVksTUFBTTtBQUN0QixRQUFNLEVBQUUsWUFBWSxlQUFlLElBQUksV0FBVztBQUNsRCxRQUFNLGlCQUFpQixVQUFVLHFCQUFxQixNQUFNO0FBQzVELFFBQU0sbUJBQW1CLFVBQVUscUJBQXFCLFlBQVk7QUFjcEUsUUFBTSxTQUFVLE9BQU8sdUJBQWlELENBQUM7QUFFekUsUUFBTSx1QkFBdUIsQ0FBQyxZQUEyQztBQUN2RSxVQUFNLGFBQWE7QUFBQSxNQUNqQixRQUFRO0FBQUEsTUFDUixRQUFRO0FBQUEsTUFDUixRQUFRO0FBQUEsTUFDUixRQUFRO0FBQUEsTUFDUixRQUFRO0FBQUEsTUFDUixRQUFRO0FBQUEsSUFDVjtBQUVBLGVBQVcsYUFBYSxZQUFZO0FBQ2xDLFlBQU0sYUFBYSxPQUFPLGFBQWEsRUFBRSxFQUFFLEtBQUs7QUFDaEQsVUFBSSxZQUFZO0FBQ2QsZUFBTztBQUFBLE1BQ1Q7QUFBQSxJQUNGO0FBRUEsV0FBTztBQUFBLEVBQ1Q7QUFFQSxRQUFNLGdCQUFnQixxQkFBcUIsTUFBTTtBQUVqRCxRQUFNLG1CQUFtQixnQkFBZ0IsVUFBVSxhQUFhLEtBQUs7QUFDckUsUUFBTSxxQkFBcUIsR0FBRyxnQkFBZ0I7QUFDOUMsUUFBTSxzQkFBc0IsR0FBRyxnQkFBZ0I7QUFDL0MsUUFBTSxzQkFBc0IsR0FBRyxnQkFBZ0I7QUFFL0MsUUFBTSwyQkFBdUIsMkJBQVksQ0FBQyxVQUFVO0FBQ2xELFFBQUksQ0FBQyxNQUFPLFFBQU87QUFDbkIsVUFBTSxNQUFNLE9BQU8sS0FBSyxFQUFFLEtBQUs7QUFDL0IsUUFBSSxDQUFDLElBQUssUUFBTztBQUVqQixRQUFJLHNCQUFzQixLQUFLLEdBQUcsRUFBRyxRQUFPO0FBRTVDLFFBQUksOEJBQThCLEtBQUssR0FBRyxHQUFHO0FBQzNDLFlBQU0sUUFBUSxJQUFJLE1BQU0sT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNLFNBQVMsR0FBRyxFQUFFLENBQUM7QUFDM0QsVUFBSSxNQUFNLFdBQVcsS0FBSyxDQUFDLE9BQU8sTUFBTSxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxNQUFNLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLE1BQU0sTUFBTSxDQUFDLENBQUMsR0FBRztBQUN2RyxjQUFNLENBQUMsR0FBRyxHQUFHLENBQUMsSUFBSTtBQUNsQixjQUFNLEtBQUssT0FBTyxDQUFDLEVBQUUsU0FBUyxHQUFHLEdBQUc7QUFDcEMsY0FBTSxLQUFLLE9BQU8sQ0FBQyxFQUFFLFNBQVMsR0FBRyxHQUFHO0FBQ3BDLGVBQU8sR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUU7QUFBQSxNQUN6QjtBQUFBLElBQ0Y7QUFDQSxVQUFNLEtBQUssSUFBSSxLQUFLLEdBQUc7QUFDdkIsUUFBSSxDQUFDLE9BQU8sTUFBTSxHQUFHLFFBQVEsQ0FBQyxHQUFHO0FBQy9CLFlBQU0sT0FBTyxHQUFHLFlBQVk7QUFDNUIsWUFBTSxLQUFLLE9BQU8sR0FBRyxTQUFTLElBQUksQ0FBQyxFQUFFLFNBQVMsR0FBRyxHQUFHO0FBQ3BELFlBQU0sS0FBSyxPQUFPLEdBQUcsUUFBUSxDQUFDLEVBQUUsU0FBUyxHQUFHLEdBQUc7QUFDL0MsYUFBTyxHQUFHLElBQUksSUFBSSxFQUFFLElBQUksRUFBRTtBQUFBLElBQzVCO0FBQ0EsV0FBTztBQUFBLEVBQ1QsR0FBRyxDQUFDLENBQUM7QUFFTCxRQUFNLHVCQUFtQiwyQkFBWSxDQUFDLFNBQVMsUUFBUTtBQUNyRCxRQUFJLE9BQU8sS0FBTSxRQUFPO0FBQ3hCLFVBQU0sU0FBUyxPQUFPLEdBQUcsRUFBRSxLQUFLO0FBQ2hDLFFBQUksQ0FBQyxPQUFRLFFBQU87QUFFcEIsVUFBTSxnQkFBZ0IsQ0FBQyxNQUNyQixPQUFPLEtBQUssRUFBRSxFQUNYLFlBQVksRUFDWixVQUFVLEtBQUssRUFDZixRQUFRLG9CQUFvQixFQUFFLEVBQzlCLEtBQUs7QUFFVixVQUFNLFVBQVUsY0FBYyxNQUFNO0FBQ3BDLFVBQU0sVUFBVSxRQUFRLFNBQVMsR0FBRyxJQUFJLEdBQUcsUUFBUSxNQUFNLEdBQUcsRUFBRSxDQUFDLE1BQU07QUFFckUsVUFBTSxTQUFTLFdBQVcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNO0FBQ3hDLFlBQU0sTUFBTSxPQUFPLEdBQUcsU0FBUyxHQUFHLFNBQVMsRUFBRSxFQUFFLEtBQUs7QUFDcEQsWUFBTSxPQUFPLE9BQU8sR0FBRyxRQUFRLEdBQUcsUUFBUSxFQUFFLEVBQUUsS0FBSztBQUNuRCxZQUFNLFdBQVcsY0FBYyxJQUFJO0FBQ25DLGFBQU8sUUFBUSxVQUFVLFFBQVEsV0FBVyxhQUFhLFdBQVcsYUFBYTtBQUFBLElBQ25GLENBQUM7QUFDRCxXQUFPLFFBQVEsT0FBTyxNQUFNLFNBQVMsTUFBTSxTQUFTLE1BQU0sSUFBSTtBQUFBLEVBQ2hFLEdBQUcsQ0FBQyxDQUFDO0FBRUwsUUFBTSxtQkFBbUIscUJBQXFCLE9BQU8sT0FBTyxhQUFhLE9BQU8sYUFBYSxFQUFFLENBQUM7QUFDaEcsUUFBTSxtQkFBbUIsT0FBTyxXQUFXLENBQUMsR0FBRyxTQUFTLFdBQVcsQ0FBQyxHQUFHLFNBQVMsRUFBRTtBQUNsRixRQUFNLHNCQUFzQjtBQUFBLElBQzFCLE9BQU8sY0FBYyxPQUFPLGNBQWMsT0FBTyxhQUFhLE9BQU8sYUFBYTtBQUFBLEVBQ3BGO0FBQ0EsUUFBTSxtQkFBbUIsaUJBQWlCLFlBQVksbUJBQW1CLEtBQUs7QUFDOUUsUUFBTSxzQkFBc0I7QUFBQSxJQUMxQixPQUFPLGlCQUFpQixPQUFPLGtCQUFrQixlQUFlLENBQUMsR0FBRyxTQUFTLGVBQWUsQ0FBQyxHQUFHLFNBQVM7QUFBQSxFQUMzRztBQUNBLFFBQU0sbUJBQW1CLGlCQUFpQixnQkFBZ0IsbUJBQW1CLEtBQUs7QUFFbEYsUUFBTSxDQUFDLFdBQVcsWUFBWSxRQUFJLHdCQUFTLGdCQUFnQjtBQUMzRCxRQUFNLENBQUMsV0FBVyxZQUFZLFFBQUksd0JBQVMsZ0JBQWdCO0FBQzNELFFBQU0sQ0FBQyxlQUFlLGdCQUFnQixRQUFJLHdCQUFTLGdCQUFnQjtBQUNuRSxRQUFNLENBQUMsYUFBYSxjQUFjLFFBQUksd0JBQVMsT0FBTyxPQUFPLGVBQWUsT0FBTyxlQUFlLEVBQUUsQ0FBQztBQUNyRyxRQUFNLENBQUMsYUFBYSxjQUFjLFFBQUksd0JBQVMsT0FBTyxPQUFPLGVBQWUsT0FBTyxlQUFlLEVBQUUsQ0FBQztBQUNyRyxRQUFNLENBQUMsY0FBYyxlQUFlLFFBQUksd0JBQVMsT0FBTyxPQUFPLGdCQUFnQixPQUFPLGdCQUFnQixFQUFFLENBQUM7QUFDekcsUUFBTSxDQUFDLGNBQWMsZUFBZSxRQUFJLHdCQUFTLE9BQU8sT0FBTyxnQkFBZ0IsT0FBTyxnQkFBZ0IsRUFBRSxDQUFDO0FBQ3pHLFFBQU0sQ0FBQyxRQUFRLFNBQVMsUUFBSSx3QkFBUyxFQUFFO0FBQ3ZDLFFBQU0sQ0FBQyxNQUFNLE9BQU8sUUFBSSx3QkFBUyxLQUFLO0FBQ3RDLFFBQU0sQ0FBQyxXQUFXLFlBQVksUUFBSSx3QkFBUyxLQUFLO0FBQ2hELFFBQU0sQ0FBQyxhQUFhLGNBQWMsUUFBSSx3QkFBUyxLQUFLO0FBQ3BELFFBQU0sQ0FBQyxZQUFZLGFBQWEsUUFBSSx3QkFBUyxFQUFFO0FBQy9DLFFBQU0seUJBQXFCLHNCQUFPLElBQUk7QUFDdEMsUUFBTSxzQkFBa0Isc0JBQU8sSUFBSTtBQUVuQyxRQUFNLFFBQVE7QUFDZCxRQUFNLGFBQWEsT0FBTyxPQUFPLGNBQWMsT0FBTyxjQUFjLEVBQUU7QUFDdEUsUUFBTSxjQUFjLE9BQU8sT0FBTyxlQUFlLE9BQU8sZUFBZSxFQUFFO0FBRXpFLFFBQU0sRUFBRSxnQkFBZ0Isa0JBQWtCLFlBQVksaUJBQWlCLElBQUkscUJBQXFCO0FBQUEsSUFDOUY7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGLENBQUM7QUFFRCxRQUFNLGtCQUNKLFNBQVMsS0FBSyxLQUNkLFNBQVMsVUFBVSxLQUNuQixTQUFTLE9BQU8sYUFBYSxPQUFPLGFBQWEsRUFBRTtBQUVyRCxRQUFNLGdCQUFnQixDQUFDLENBQUMsZUFBZSxDQUFDO0FBRXhDLFFBQU0scUJBQWlCO0FBQUEsSUFDckIsQ0FDRSxTQUNBLFlBQ0EsWUFDQSxVQUE2RSxDQUFDLE1BQzNFO0FBQ0gsZ0NBQTBCO0FBQUEsUUFDeEI7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0EsVUFBVSxTQUFTLGFBQWE7QUFBQSxRQUNoQyxXQUFXLFNBQVMsY0FBYztBQUFBLFFBQ2xDLGFBQWEsU0FBUztBQUFBLFFBQ3RCLHFCQUFxQjtBQUFBLE1BQ3ZCLENBQUM7QUFBQSxJQUNIO0FBQUEsSUFDQSxDQUFDO0FBQUEsRUFDSDtBQUVBLFFBQU0sMkJBQXVCLDJCQUFZLENBQUMsVUFBVTtBQUNsRCxVQUFNLGVBQWU7QUFDckIsbUJBQWUsb0JBQW9CLEtBQUsseUJBQXlCLFVBQVUsR0FBRyxhQUFhO0FBQUEsTUFDekYsVUFBVSxDQUFDO0FBQUEsTUFDWCxXQUFXO0FBQUEsTUFDWCxhQUFhLGVBQWU7QUFBQSxJQUM5QixDQUFDO0FBQUEsRUFDSCxHQUFHLENBQUMsYUFBYSxXQUFXLGdCQUFnQixjQUFjLENBQUM7QUFFM0QsUUFBTSw0QkFBd0IsMkJBQVksQ0FBQyxRQUFRLFlBQVk7QUFDN0QsUUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLE1BQU0sRUFBRyxRQUFPO0FBQzlDLHFCQUFpQixNQUFNO0FBQ3ZCLFdBQU8sbUJBQW1CLE9BQU8sZUFBZSxFQUFFLEdBQUcsT0FBTztBQUFBLEVBQzlELEdBQUcsQ0FBQyxXQUFXLENBQUM7QUFFaEIsUUFBTSw0QkFBd0IsMkJBQVksQ0FBQyxVQUFVO0FBQ25ELFVBQU0sZUFBZTtBQUNyQixtQkFBZSxxQkFBcUIsS0FBSywyQkFBMkIsWUFBWSxHQUFHLGNBQWM7QUFBQSxNQUMvRixVQUFVLENBQUM7QUFBQSxNQUNYLFdBQVc7QUFBQSxNQUNYLGFBQWEsZUFBZTtBQUFBLElBQzlCLENBQUM7QUFBQSxFQUNILEdBQUcsQ0FBQyxjQUFjLFdBQVcsZ0JBQWdCLGNBQWMsQ0FBQztBQUU1RCxRQUFNLDZCQUF5QiwyQkFBWSxDQUFDLFFBQVEsWUFBWTtBQUM5RCxRQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsTUFBTSxFQUFHLFFBQU87QUFDOUMscUJBQWlCLE1BQU07QUFDdkIsV0FBTyxtQkFBbUIsT0FBTyxnQkFBZ0IsRUFBRSxHQUFHLE9BQU87QUFBQSxFQUMvRCxHQUFHLENBQUMsWUFBWSxDQUFDO0FBRWpCLFFBQU0sNEJBQXdCLDJCQUFZLENBQUMsVUFBVTtBQUNuRCxVQUFNLGVBQWU7QUFDckIsbUJBQWUscUJBQXFCLEtBQUssNEJBQTRCLGFBQWEsR0FBRyxjQUFjO0FBQUEsTUFDakcsVUFBVSxDQUFDO0FBQUEsTUFDWCxXQUFXO0FBQUEsTUFDWCxhQUFhLGVBQWU7QUFBQSxJQUM5QixDQUFDO0FBQUEsRUFDSCxHQUFHLENBQUMsY0FBYyxXQUFXLGdCQUFnQixjQUFjLENBQUM7QUFFNUQsUUFBTSw2QkFBeUIsMkJBQVksQ0FBQyxRQUFRLFlBQVk7QUFDOUQsUUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLE1BQU0sRUFBRyxRQUFPO0FBQzlDLHFCQUFpQixNQUFNO0FBQ3ZCLFdBQU8sbUJBQW1CLE9BQU8sZ0JBQWdCLEVBQUUsR0FBRyxPQUFPO0FBQUEsRUFDL0QsR0FBRyxDQUFDLFlBQVksQ0FBQztBQUVqQixRQUFNLGlCQUFpQixZQUFZLHNCQUFzQixxQkFBcUI7QUFDOUUsUUFBTSxrQkFBa0IsWUFBWSx1QkFBdUIsc0JBQXNCO0FBQ2pGLFFBQU0sa0JBQWtCLFlBQVksdUJBQXVCLHNCQUFzQjtBQUVqRixRQUFNLHlCQUFxQjtBQUFBLElBQ3pCLE1BQU07QUFBQSxNQUNKLEVBQUUsU0FBUyxvQkFBb0IsWUFBWSxlQUFlO0FBQUEsTUFDMUQsRUFBRSxTQUFTLHFCQUFxQixZQUFZLGdCQUFnQjtBQUFBLE1BQzVELEVBQUUsU0FBUyxxQkFBcUIsWUFBWSxnQkFBZ0I7QUFBQSxJQUM5RDtBQUFBLElBQ0EsQ0FBQyxxQkFBcUIsb0JBQW9CLG1CQUFtQjtBQUFBLEVBQy9EO0FBRUEsUUFBTSxFQUFFLGFBQWEsc0JBQXNCLElBQUksb0JBQW9CLG9CQUFvQjtBQUFBLElBQ3JGLGNBQWMsQ0FBQztBQUFBLElBQ2YsZ0JBQWdCO0FBQUEsRUFDbEIsQ0FBQztBQUVELFFBQU0sRUFBRSxPQUFPLGFBQWEsY0FBYyxjQUFjLElBQUksaUJBQWlCO0FBQUEsSUFDM0Usb0JBQW9CLEtBQUssZUFBZSxhQUFhO0FBQUEsSUFDckQsbUJBQW1CLEtBQUssY0FBYyxZQUFZO0FBQUEsRUFDcEQsQ0FBQztBQUVELFFBQU0seUJBQXFCLDJCQUFZLFlBQVk7QUFDakQsa0JBQWMsRUFBRTtBQUNoQixVQUFNLGNBQWM7QUFBQSxNQUNsQjtBQUFBLE1BQ0EsU0FBUyxDQUFDLFFBQVE7QUFDaEIsc0JBQWMsR0FBRztBQUNqQixrQkFBVSxHQUFHO0FBQ2Isd0JBQWdCLGdCQUFnQixJQUFJO0FBQUEsTUFDdEM7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNILEdBQUcsQ0FBQyxNQUFNLGFBQWEsQ0FBQztBQUV4QixRQUFNLG1CQUFtQixLQUFLLGtCQUFrQixnQkFBZ0I7QUFDaEUsUUFBTSxrQkFBa0IsTUFBTSxjQUFjLEtBQUssY0FBYyxZQUFZO0FBQzNFLFFBQU0sbUJBQW1CLE9BQ3JCLG1CQUNDLENBQUMsUUFBUSxhQUFhLEtBQUssYUFBYSxXQUFXLElBQUssTUFBTSxlQUFlLEtBQUssZUFBZSxhQUFhO0FBRW5ILFFBQU0sK0JBQTJCLDJCQUFZLE1BQU07QUFDakQsUUFBSSxDQUFDLFFBQVEsWUFBWTtBQUN2QixtQkFBYTtBQUNiO0FBQUEsSUFDRjtBQUNBLHVCQUFtQjtBQUFBLEVBQ3JCLEdBQUcsQ0FBQyxNQUFNLFlBQVksY0FBYyxrQkFBa0IsQ0FBQztBQUV2RCxRQUFNLHVCQUFtQix1QkFBUSxNQUFNLFFBQVEsV0FBVyxDQUFDLE1BQU0sU0FBUyxDQUFDO0FBRTNFLCtCQUFVLE1BQU07QUFDZCxXQUFPLDBCQUEwQixnQkFBZ0I7QUFDakQsV0FBTyxNQUFNO0FBQ1gsYUFBTyw0QkFBNEI7QUFBQSxJQUNyQztBQUFBLEVBQ0YsR0FBRyxDQUFDLGdCQUFnQixDQUFDO0FBRXJCLHFCQUFtQjtBQUFBLElBQ2pCO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRixDQUFDO0FBRUQsK0JBQVUsTUFBTTtBQUNkLFVBQU0sS0FBSyxtQkFBbUI7QUFDOUIsUUFBSSxDQUFDLEdBQUk7QUFDVCxRQUFJLENBQUMsV0FBVztBQUNkLFNBQUcsVUFBVSxJQUFJLHNCQUFzQjtBQUFBLElBQ3pDLE9BQU87QUFDTCxTQUFHLFVBQVUsT0FBTyxzQkFBc0I7QUFBQSxJQUM1QztBQUFBLEVBQ0YsR0FBRyxDQUFDLFNBQVMsQ0FBQztBQUVkLCtCQUFVLE1BQU07QUFDZCxRQUFJLFdBQVc7QUFDYixVQUFJLENBQUMsZ0JBQWdCLFNBQVM7QUFDNUIsd0JBQWdCLFVBQVU7QUFBQSxVQUN4QjtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQ0E7QUFBQSxJQUNGO0FBQ0Esb0JBQWdCLFVBQVU7QUFBQSxFQUM1QixHQUFHLENBQUMsV0FBVyxXQUFXLFdBQVcsZUFBZSxhQUFhLGFBQWEsY0FBYyxZQUFZLENBQUM7QUFFekcsK0JBQVUsTUFBTTtBQUNkLFFBQUksVUFBVyxRQUFPO0FBQ3RCLFdBQU8sa0JBQWtCLG1CQUFtQixPQUFPO0FBQUEsRUFDckQsR0FBRyxDQUFDLFNBQVMsQ0FBQztBQUVkLFFBQU0sdUJBQW1CLDJCQUFZLE1BQU07QUFDekMsUUFBSSxDQUFDLGdCQUFnQjtBQUNuQiwwQkFBb0I7QUFDcEI7QUFBQSxJQUNGO0FBQ0EsaUJBQWEsSUFBSTtBQUNqQixxQkFBaUIsSUFBSTtBQUNyQixjQUFVLEtBQUssZ0NBQWdDLGlCQUFpQixDQUFDO0FBQUEsRUFDbkUsR0FBRyxDQUFDLGdCQUFnQixnQkFBZ0IsQ0FBQztBQUVyQyxRQUFNLHVCQUFtQiwyQkFBWSxNQUFNO0FBQ3pDLFFBQUksQ0FBQyxVQUFXO0FBQ2hCLGlCQUFhLEtBQUs7QUFDbEIscUJBQWlCLEtBQUs7QUFDdEIsZUFBVztBQUNYLGNBQVUsS0FBSyxpQkFBaUIsUUFBUSxDQUFDO0FBQ3pDLFdBQU8saUNBQWlDO0FBQ3hDLFdBQU8sU0FBUyxPQUFPO0FBQUEsRUFDekIsR0FBRyxDQUFDLFdBQVcsa0JBQWtCLFVBQVUsQ0FBQztBQUU1QyxRQUFNLEVBQUUsY0FBYyxhQUFhLElBQUksbUJBQW1CO0FBQUEsSUFDeEQ7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGLENBQUM7QUFFRCx5QkFBdUI7QUFBQSxJQUNyQjtBQUFBLElBQ0EsV0FBVyxNQUFNO0FBQUEsSUFDakI7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRixDQUFDO0FBRUQsUUFBTSxtQkFBbUIsS0FBSyw0QkFBNEIsYUFBYTtBQUN2RSxRQUFNLGdCQUFnQixLQUFLLHlCQUF5QixVQUFVO0FBQzlELFFBQU0sa0JBQWtCLEtBQUssMkJBQTJCLFlBQVk7QUFDcEUsUUFBTSxtQkFBbUIsS0FBSyw0QkFBNEIsYUFBYTtBQUN2RSxRQUFNLDZCQUE2QjtBQUFBLElBQ2pDO0FBQUEsSUFDQSxZQUFZLG9DQUFvQztBQUFBLEVBQ2xEO0FBQ0EsUUFBTSwwQkFBMEIsV0FBVywrQkFBK0IsQ0FBQyxZQUFZLHVCQUF1QixFQUFFO0FBRWhILFNBQ0UsNkNBQUMsU0FBSSxXQUFVLGFBQ2I7QUFBQTtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0MsTUFBTSxNQUFNO0FBQUEsUUFDWixPQUFPLE1BQU07QUFBQSxRQUNiLFNBQVMsTUFBTTtBQUFBLFFBQ2YsYUFBYTtBQUFBLFFBQ2IsWUFBWTtBQUFBLFFBQ1osYUFBYTtBQUFBLFFBQ2IsWUFBWSxNQUFNO0FBQUEsUUFDbEIsYUFBYSxNQUFNO0FBQUEsUUFDbkI7QUFBQSxRQUNBLE9BQU87QUFBQSxRQUNQO0FBQUEsUUFDQSxXQUFXO0FBQUEsUUFDWCxVQUFVO0FBQUE7QUFBQSxJQUNaO0FBQUEsSUFDQTtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0MsS0FBSztBQUFBLFFBQ0wsV0FBVTtBQUFBLFFBRVQ7QUFBQSx5QkFDQyw0Q0FBQyxTQUFJLFdBQVUsa0ZBQ2IsdURBQUMsU0FBSSxXQUFVLGtEQUNiO0FBQUEsd0RBQUMsbUJBQVEsTUFBSyxXQUFVO0FBQUEsWUFDeEIsNENBQUMsVUFBTSxlQUFLLGtCQUFrQixTQUFTLEdBQUU7QUFBQSxhQUMzQyxHQUNGO0FBQUEsVUFFQSw2Q0FBQyxTQUFJLFdBQVUsOENBQ2Y7QUFBQSx3REFBQyxTQUFJLFdBQVUscUJBQ2I7QUFBQSxjQUFDO0FBQUE7QUFBQSxnQkFDQyxPQUFPLEtBQUssNEJBQTRCLE1BQU07QUFBQSxnQkFDOUMsT0FBTztBQUFBLGdCQUNQLFVBQVU7QUFBQSxnQkFDVixVQUFVLENBQUM7QUFBQSxnQkFDWCxVQUFVLENBQUM7QUFBQTtBQUFBLFlBQ2IsR0FDRjtBQUFBLFlBQ0E7QUFBQSxjQUFDO0FBQUE7QUFBQSxnQkFDQyxPQUFPLEtBQUssaUNBQWlDLFlBQVk7QUFBQSxnQkFDekQsU0FBUztBQUFBLGdCQUNULE9BQU87QUFBQSxnQkFDUCxVQUFVO0FBQUEsZ0JBQ1YsYUFBYSxLQUFLLHVDQUF1QyxhQUFhO0FBQUEsZ0JBQ3RFLFVBQVUsQ0FBQztBQUFBLGdCQUNYLFVBQVUsQ0FBQztBQUFBLGdCQUNYLFdBQVc7QUFBQTtBQUFBLFlBQ2I7QUFBQSxhQUNGO0FBQUEsVUFFQTtBQUFBLFlBQUM7QUFBQTtBQUFBLGNBQ0M7QUFBQSxjQUNBLGtCQUFrQjtBQUFBLGNBQ2xCLHNCQUFzQjtBQUFBLGNBQ3RCLHFCQUFxQixDQUFDO0FBQUEsY0FDdEIscUJBQXFCO0FBQUEsY0FDckIsV0FBVztBQUFBLGdCQUNUO0FBQUEsa0JBQ0UsSUFBSTtBQUFBLGtCQUNKLE9BQU87QUFBQSxrQkFDUCxPQUFPO0FBQUEsa0JBQ1AsV0FBVztBQUFBLGtCQUNYLGlCQUFpQjtBQUFBLGdCQUNuQjtBQUFBLGdCQUNBO0FBQUEsa0JBQ0UsSUFBSTtBQUFBLGtCQUNKLE9BQU87QUFBQSxrQkFDUCxPQUFPO0FBQUEsa0JBQ1AsV0FBVztBQUFBLGtCQUNYLGlCQUFpQjtBQUFBLGdCQUNuQjtBQUFBLGdCQUNBO0FBQUEsa0JBQ0UsSUFBSTtBQUFBLGtCQUNKLE9BQU87QUFBQSxrQkFDUCxPQUFPO0FBQUEsa0JBQ1AsV0FBVztBQUFBLGtCQUNYLGlCQUFpQjtBQUFBLGdCQUNuQjtBQUFBLGNBQ0Y7QUFBQTtBQUFBLFVBQ0Y7QUFBQSxVQUVBLDRDQUFDLFNBQUksV0FBVSxrREFDYixzREFBQyxVQUFNLGtCQUFPLEdBQ2hCO0FBQUE7QUFBQTtBQUFBLElBQ0Y7QUFBQSxLQUNGO0FBRUo7QUFHZSxTQUFSLGFBQThCO0FBQ25DLFNBQ0UsNENBQUMsNEJBQWlCLGlCQUFpQixLQUFLLCtCQUErQiwwRUFBMEUsR0FDL0ksc0RBQUMsYUFBVSxHQUNiO0FBRUo7OztBT3pnQk0sSUFBQUMsc0JBQUE7QUFITixJQUFNLGFBQWEsTUFBTTtBQUN2QixTQUNFLDZDQUFDLGdDQUNDLHVEQUFDLGNBQVcsR0FDZDtBQUVKO0FBRUEsSUFBTSxRQUFRLE1BQU07QUFDbEIsUUFBTSxTQUFTLFNBQVMsZUFBZSxvQkFBb0I7QUFDM0QsTUFBSSxDQUFDLE9BQVE7QUFFYixtQkFBaUIsUUFBUSw2Q0FBQyxjQUFXLENBQUU7QUFDekM7QUFFQSx1QkFBdUIsS0FBSztBQUU1QixJQUFPLHFCQUFROyIsCiAgIm5hbWVzIjogWyJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIl0KfQo=
