import {
  AppErrorBoundary_default,
  VisitNarrativeFields_default,
  navigateToTextEditorField,
  useTextEditorFields,
  useVisitas
} from "./chunks/chunk-RO4OJXQR.js";
import "./chunks/chunk-QO7GVWVB.js";
import {
  isOverflowing,
  setPreviewAnchor,
  showPreviewTooltip,
  useTapGuard
} from "./chunks/chunk-LNRXPS4I.js";
import {
  SingleDatePicker
} from "./chunks/chunk-AS4EE5L2.js";
import {
  SelectCombobox_default
} from "./chunks/chunk-YGPFKAYG.js";
import "./chunks/chunk-6YXFJB4W.js";
import {
  wait
} from "./chunks/chunk-KJ3UA2J6.js";
import {
  ConfirmModal,
  useConfirmDialog
} from "./chunks/chunk-JR3OAOOU.js";
import {
  flashActionMark,
  setHistoryFilterForDate
} from "./chunks/chunk-K7MECJ5E.js";
import {
  VisitasPageProviders_default
} from "./chunks/chunk-YRLD2CA7.js";
import "./chunks/chunk-KTF6MF2Z.js";
import {
  setTopbarActionGroupReady
} from "./chunks/chunk-6G7EOWHU.js";
import {
  Spinner_default,
  canAccess,
  classNames,
  indT,
  showPermissionModal
} from "./chunks/chunk-BYICIYT4.js";
import {
  mountReactIsland,
  mountWhenDocumentReady,
  require_jsx_runtime,
  require_react
} from "./chunks/chunk-BWM3JLWG.js";
import {
  fetchJson
} from "./chunks/chunk-IKHTGBEE.js";
import {
  getSessionValueWithExpiry,
  removeSessionValueWithExpiry,
  setSessionValueWithExpiry
} from "./chunks/chunk-7SKLSV7K.js";
import {
  __toESM
} from "./chunks/chunk-45FWCHS2.js";

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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvZGV0YWlsL0RldGFpbEZvcm0udHN4IiwgIi4uL3JlYWN0L3NyYy91dGlscy9kb21HdWFyZHMudHMiLCAiLi4vcmVhY3Qvc3JjL3V0aWxzL3N0cmluZ3MudHMiLCAiLi4vcmVhY3Qvc3JjL2hvb2tzL3VzZURldGFpbEh5ZHJhdGlvbi50cyIsICIuLi9yZWFjdC9zcmMvaG9va3MvdXNlRGV0YWlsVG9wYmFyQWN0aW9ucy50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9kZXRhaWwvdXNlRGV0YWlsRWRpdFNlc3Npb24udHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvZGV0YWlsL3VzZURldGFpbE11dGF0aW9ucy50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9kZXRhaWwvRGV0YWlsUGFnZS50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZUNhbGxiYWNrLCB1c2VNZW1vIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgU2luZ2xlRGF0ZVBpY2tlciBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NpbmdsZURhdGVQaWNrZXIudHN4XCI7XG5pbXBvcnQgQ29uZmlybU1vZGFsIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvQ29uZmlybU1vZGFsLnRzeFwiO1xuaW1wb3J0IFNlbGVjdENvbWJvYm94IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvU2VsZWN0Q29tYm9ib3gudHN4XCI7XG5pbXBvcnQgQXBwRXJyb3JCb3VuZGFyeSBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0FwcEVycm9yQm91bmRhcnkudHN4XCI7XG5pbXBvcnQgeyB1c2VWaXNpdGFzIH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZVZpc2l0YXMudHNcIjtcbmltcG9ydCBTcGlubmVyIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvU3Bpbm5lci50c3hcIjtcbmltcG9ydCBWaXNpdE5hcnJhdGl2ZUZpZWxkcyBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy92aXNpdGFzL1Zpc2l0TmFycmF0aXZlRmllbGRzLnRzeFwiO1xuaW1wb3J0IHsgY2xhc3NOYW1lcyB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9jbGFzc05hbWVzLnRzXCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB7IGNhbkFjY2Vzcywgc2hvd1Blcm1pc3Npb25Nb2RhbCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9wZXJtaXNzaW9ucy50c1wiO1xuaW1wb3J0IHsgYmluZFJlYWRPbmx5R3VhcmQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvZG9tR3VhcmRzLnRzXCI7XG5pbXBvcnQgeyBoYXNWYWx1ZSB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9zdHJpbmdzLnRzXCI7XG5pbXBvcnQgeyBuYXZpZ2F0ZVRvVGV4dEVkaXRvckZpZWxkIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3RleHRFZGl0b3JOYXZpZ2F0aW9uLnRzXCI7XG5pbXBvcnQgeyBmbGFzaEFjdGlvbk1hcmsgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvdmlzaXRhc0hpc3RvcnkudHNcIjtcbmltcG9ydCB7IHNldFByZXZpZXdBbmNob3IsIHNob3dQcmV2aWV3VG9vbHRpcCwgaXNPdmVyZmxvd2luZyB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9wcmV2aWV3VG9vbHRpcC50c1wiO1xuaW1wb3J0IHsgdXNlVGFwR3VhcmQgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlVGFwR3VhcmQudHNcIjtcbmltcG9ydCB7IHVzZUNvbmZpcm1EaWFsb2cgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlQ29uZmlybURpYWxvZy50c1wiO1xuaW1wb3J0IHsgdXNlRGV0YWlsSHlkcmF0aW9uIH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZURldGFpbEh5ZHJhdGlvbi50c1wiO1xuaW1wb3J0IHsgdXNlRGV0YWlsVG9wYmFyQWN0aW9ucyB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VEZXRhaWxUb3BiYXJBY3Rpb25zLnRzXCI7XG5pbXBvcnQgeyB1c2VUZXh0RWRpdG9yRmllbGRzIH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZVRleHRFZGl0b3JGaWVsZHMudHNcIjtcbmltcG9ydCB7IHVzZURldGFpbEVkaXRTZXNzaW9uIH0gZnJvbSBcIi4vdXNlRGV0YWlsRWRpdFNlc3Npb24udHNcIjtcbmltcG9ydCB7IHVzZURldGFpbE11dGF0aW9ucyB9IGZyb20gXCIuL3VzZURldGFpbE11dGF0aW9ucy50c1wiO1xuXG5jb25zdCBFRElUT1JfUkVUVVJOX0ZMQUdfVFRMX01TID0gMiAqIDYwICogNjAgKiAxMDAwO1xuXG5jb25zdCBEZXRhaWxBcHAgPSAoKSA9PiB7XG4gIGNvbnN0IHsgdmlzaXRUeXBlcywgYXNpc3RlbnRlVGlwb3MgfSA9IHVzZVZpc2l0YXMoKTtcclxuICBjb25zdCBjYW5FZGl0SGlzdG9yeSA9IGNhbkFjY2VzcyhcIlZJU0lUQVNfSElTVE9SSUFMXCIsIFwiRWRpdFwiKTtcclxuICBjb25zdCBjYW5EZWxldGVIaXN0b3J5ID0gY2FuQWNjZXNzKFwiVklTSVRBU19ISVNUT1JJQUxcIiwgXCJGdWxsQWNjZXNzXCIpO1xyXG4gIHR5cGUgQWN0aXZpdHlEZXRhaWxQYXlsb2FkID0ge1xyXG4gICAgcmVjSWQ/OiBzdHJpbmcgfCBudW1iZXI7XHJcbiAgICBSZWNJZD86IHN0cmluZyB8IG51bWJlcjtcclxuICAgIHJlZlJlY0lkQWN0aXZpZGFkPzogc3RyaW5nIHwgbnVtYmVyO1xyXG4gICAgUmVmUmVjSWRBY3RpdmlkYWQ/OiBzdHJpbmcgfCBudW1iZXI7XHJcbiAgICBhY3RpdmlkYWRSZWNJZD86IHN0cmluZyB8IG51bWJlcjtcclxuICAgIEFjdGl2aWRhZFJlY0lkPzogc3RyaW5nIHwgbnVtYmVyO1xyXG4gICAgcmVhZE9ubHk/OiBib29sZWFuO1xyXG4gICAgYWxsb3dFZGl0PzogYm9vbGVhbjtcclxuICAgIGVkaXRNb2RlS2V5Pzogc3RyaW5nO1xyXG4gICAgW2tleTogc3RyaW5nXTogdW5rbm93bjtcclxuICB9O1xyXG5cclxuICBjb25zdCBkZXRhaWwgPSAod2luZG93Ll9fQUNUSVZJVFlfREVUQUlMX18gYXMgQWN0aXZpdHlEZXRhaWxQYXlsb2FkKSB8fCB7fTtcblxuICBjb25zdCByZXNvbHZlQWN0aXZpdHlSZWNJZCA9IChwYXlsb2FkOiBBY3Rpdml0eURldGFpbFBheWxvYWQpOiBzdHJpbmcgPT4ge1xuICAgIGNvbnN0IGNhbmRpZGF0ZXMgPSBbXG4gICAgICBwYXlsb2FkLnJlY0lkLFxuICAgICAgcGF5bG9hZC5SZWNJZCxcbiAgICAgIHBheWxvYWQucmVmUmVjSWRBY3RpdmlkYWQsXG4gICAgICBwYXlsb2FkLlJlZlJlY0lkQWN0aXZpZGFkLFxuICAgICAgcGF5bG9hZC5hY3RpdmlkYWRSZWNJZCxcbiAgICAgIHBheWxvYWQuQWN0aXZpZGFkUmVjSWQsXG4gICAgXTtcblxuICAgIGZvciAoY29uc3QgY2FuZGlkYXRlIG9mIGNhbmRpZGF0ZXMpIHtcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSBTdHJpbmcoY2FuZGlkYXRlID8/IFwiXCIpLnRyaW0oKTtcbiAgICAgIGlmIChub3JtYWxpemVkKSB7XG4gICAgICAgIHJldHVybiBub3JtYWxpemVkO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBcIlwiO1xuICB9O1xuXG4gIGNvbnN0IGFjdGl2aXR5UmVjSWQgPSByZXNvbHZlQWN0aXZpdHlSZWNJZChkZXRhaWwpO1xuXHJcbiAgY29uc3QgdGV4dEVkaXRvckJhc2VJZCA9IGFjdGl2aXR5UmVjSWQgPyBgVmlzaXRhLiR7YWN0aXZpdHlSZWNJZH1gIDogXCJWaXNpdGFcIjtcclxuICBjb25zdCBmaWVsZElkQ29tZW50YXJpb3MgPSBgJHt0ZXh0RWRpdG9yQmFzZUlkfS5Db21lbnRhcmlvc2A7XHJcbiAgY29uc3QgZmllbGRJZEFudGVjZWRlbnRlcyA9IGAke3RleHRFZGl0b3JCYXNlSWR9LkFudGVjZWRlbnRlc2A7XHJcbiAgY29uc3QgZmllbGRJZENvbmNsdXNpb25lcyA9IGAke3RleHRFZGl0b3JCYXNlSWR9LkNvbmNsdXNpb25lc2A7XHJcblxyXG4gIGNvbnN0IG5vcm1hbGl6ZURhdGVUb0lucHV0ID0gdXNlQ2FsbGJhY2soKHZhbHVlKSA9PiB7XHJcbiAgICBpZiAoIXZhbHVlKSByZXR1cm4gXCJcIjtcclxuICAgIGNvbnN0IHJhdyA9IFN0cmluZyh2YWx1ZSkudHJpbSgpO1xyXG4gICAgaWYgKCFyYXcpIHJldHVybiBcIlwiO1xyXG4gICAgLy8gQWxyZWFkeSB5eXl5LU1NLWRkXHJcbiAgICBpZiAoL15cXGR7NH0tXFxkezJ9LVxcZHsyfSQvLnRlc3QocmF3KSkgcmV0dXJuIHJhdztcclxuICAgIC8vIGRkLk1NLnl5eXkgb3IgZGQvTU0veXl5eVxyXG4gICAgaWYgKC9eXFxkezJ9Wy4vLV1cXGR7Mn1bLi8tXVxcZHs0fSQvLnRlc3QocmF3KSkge1xyXG4gICAgICBjb25zdCBwYXJ0cyA9IHJhdy5zcGxpdCgvWy4vLV0vKS5tYXAoKHApID0+IHBhcnNlSW50KHAsIDEwKSk7XHJcbiAgICAgIGlmIChwYXJ0cy5sZW5ndGggPT09IDMgJiYgIU51bWJlci5pc05hTihwYXJ0c1swXSkgJiYgIU51bWJlci5pc05hTihwYXJ0c1sxXSkgJiYgIU51bWJlci5pc05hTihwYXJ0c1syXSkpIHtcclxuICAgICAgICBjb25zdCBbZCwgbSwgeV0gPSBwYXJ0cztcclxuICAgICAgICBjb25zdCBtbSA9IFN0cmluZyhtKS5wYWRTdGFydCgyLCBcIjBcIik7XHJcbiAgICAgICAgY29uc3QgZGQgPSBTdHJpbmcoZCkucGFkU3RhcnQoMiwgXCIwXCIpO1xyXG4gICAgICAgIHJldHVybiBgJHt5fS0ke21tfS0ke2RkfWA7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbnN0IGR0ID0gbmV3IERhdGUocmF3KTtcclxuICAgIGlmICghTnVtYmVyLmlzTmFOKGR0LmdldFRpbWUoKSkpIHtcclxuICAgICAgY29uc3QgeXl5eSA9IGR0LmdldEZ1bGxZZWFyKCk7XHJcbiAgICAgIGNvbnN0IG1tID0gU3RyaW5nKGR0LmdldE1vbnRoKCkgKyAxKS5wYWRTdGFydCgyLCBcIjBcIik7XHJcbiAgICAgIGNvbnN0IGRkID0gU3RyaW5nKGR0LmdldERhdGUoKSkucGFkU3RhcnQoMiwgXCIwXCIpO1xyXG4gICAgICByZXR1cm4gYCR7eXl5eX0tJHttbX0tJHtkZH1gO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFwiXCI7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBtYXRjaE9wdGlvblZhbHVlID0gdXNlQ2FsbGJhY2soKG9wdGlvbnMsIHJhdykgPT4ge1xyXG4gICAgaWYgKHJhdyA9PSBudWxsKSByZXR1cm4gXCJcIjtcclxuICAgIGNvbnN0IHJhd1N0ciA9IFN0cmluZyhyYXcpLnRyaW0oKTtcclxuICAgIGlmICghcmF3U3RyKSByZXR1cm4gXCJcIjtcclxuXHJcbiAgICBjb25zdCBub3JtYWxpemVUZXh0ID0gKHMpID0+XHJcbiAgICAgIFN0cmluZyhzIHx8IFwiXCIpXHJcbiAgICAgICAgLnRvTG93ZXJDYXNlKClcclxuICAgICAgICAubm9ybWFsaXplKFwiTkZEXCIpXHJcbiAgICAgICAgLnJlcGxhY2UoL1tcXHUwMzAwLVxcdTAzNmZdL2csIFwiXCIpXHJcbiAgICAgICAgLnRyaW0oKTtcclxuXHJcbiAgICBjb25zdCByYXdOb3JtID0gbm9ybWFsaXplVGV4dChyYXdTdHIpO1xyXG4gICAgY29uc3QgYWx0Tm9ybSA9IHJhd05vcm0uZW5kc1dpdGgoXCJvXCIpID8gYCR7cmF3Tm9ybS5zbGljZSgwLCAtMSl9YWAgOiByYXdOb3JtO1xyXG5cclxuICAgIGNvbnN0IG1hdGNoID0gKG9wdGlvbnMgfHwgW10pLmZpbmQoKG8pID0+IHtcclxuICAgICAgY29uc3QgdmFsID0gU3RyaW5nKG8/LnZhbHVlID8/IG8/LlZhbHVlID8/IFwiXCIpLnRyaW0oKTtcclxuICAgICAgY29uc3QgdGV4dCA9IFN0cmluZyhvPy50ZXh0ID8/IG8/LlRleHQgPz8gXCJcIikudHJpbSgpO1xyXG4gICAgICBjb25zdCB0ZXh0Tm9ybSA9IG5vcm1hbGl6ZVRleHQodGV4dCk7XHJcbiAgICAgIHJldHVybiB2YWwgPT09IHJhd1N0ciB8fCB2YWwgPT09IHJhd05vcm0gfHwgdGV4dE5vcm0gPT09IHJhd05vcm0gfHwgdGV4dE5vcm0gPT09IGFsdE5vcm07XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBtYXRjaCA/IFN0cmluZyhtYXRjaC52YWx1ZSA/PyBtYXRjaC5WYWx1ZSA/PyByYXdTdHIpIDogcmF3U3RyO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgaW5pdGlhbFRyYW5zRGF0ZSA9IG5vcm1hbGl6ZURhdGVUb0lucHV0KFN0cmluZyhkZXRhaWwudHJhbnNEYXRlID8/IGRldGFpbC5UcmFuc0RhdGUgPz8gXCJcIikpO1xyXG4gIGNvbnN0IGRlZmF1bHRWaXNpdFR5cGUgPSBTdHJpbmcodmlzaXRUeXBlc1swXT8udmFsdWUgPz8gdmlzaXRUeXBlc1swXT8uVmFsdWUgPz8gXCJcIik7XG4gIGNvbnN0IHJhd0luaXRpYWxWaXNpdFR5cGUgPSBTdHJpbmcoXHJcbiAgICBkZXRhaWwudGlwb1Zpc2l0YSA/PyBkZXRhaWwuVGlwb1Zpc2l0YSA/PyBkZXRhaWwudmlzaXRUeXBlID8/IGRldGFpbC5WaXNpdFR5cGUgPz8gXCJcIlxyXG4gICk7XHJcbiAgY29uc3QgaW5pdGlhbFZpc2l0VHlwZSA9IG1hdGNoT3B0aW9uVmFsdWUodmlzaXRUeXBlcywgcmF3SW5pdGlhbFZpc2l0VHlwZSkgfHwgZGVmYXVsdFZpc2l0VHlwZTtcclxuICBjb25zdCByYXdJbml0aWFsQXNpc3RlbnRlID0gU3RyaW5nKFxyXG4gICAgZGV0YWlsLmFzaXN0ZW50ZVRpcG8gPz8gZGV0YWlsLkFzaXN0ZW50ZVRpcG8gPz8gKGFzaXN0ZW50ZVRpcG9zWzBdPy52YWx1ZSA/PyBhc2lzdGVudGVUaXBvc1swXT8uVmFsdWUgPz8gXCJcIilcclxuICApO1xyXG4gIGNvbnN0IGluaXRpYWxBc2lzdGVudGUgPSBtYXRjaE9wdGlvblZhbHVlKGFzaXN0ZW50ZVRpcG9zLCByYXdJbml0aWFsQXNpc3RlbnRlKSB8fCByYXdJbml0aWFsQXNpc3RlbnRlO1xyXG5cclxuICBjb25zdCBbdHJhbnNEYXRlLCBzZXRUcmFuc0RhdGVdID0gdXNlU3RhdGUoaW5pdGlhbFRyYW5zRGF0ZSk7XHJcbiAgY29uc3QgW3Zpc2l0VHlwZSwgc2V0VmlzaXRUeXBlXSA9IHVzZVN0YXRlKGluaXRpYWxWaXNpdFR5cGUpO1xyXG4gIGNvbnN0IFthc2lzdGVudGVUaXBvLCBzZXRBc2lzdGVudGVUaXBvXSA9IHVzZVN0YXRlKGluaXRpYWxBc2lzdGVudGUpO1xyXG4gIGNvbnN0IFtkZXNjcmlwdGlvbiwgc2V0RGVzY3JpcHRpb25dID0gdXNlU3RhdGUoU3RyaW5nKGRldGFpbC5kZXNjcmlwdGlvbiA/PyBkZXRhaWwuRGVzY3JpcHRpb24gPz8gXCJcIikpO1xyXG4gIGNvbnN0IFtjb21lbnRhcmlvcywgc2V0Q29tZW50YXJpb3NdID0gdXNlU3RhdGUoU3RyaW5nKGRldGFpbC5jb21lbnRhcmlvcyA/PyBkZXRhaWwuQ29tZW50YXJpb3MgPz8gXCJcIikpO1xyXG4gIGNvbnN0IFthbnRlY2VkZW50ZXMsIHNldEFudGVjZWRlbnRlc10gPSB1c2VTdGF0ZShTdHJpbmcoZGV0YWlsLmFudGVjZWRlbnRlcyA/PyBkZXRhaWwuQW50ZWNlZGVudGVzID8/IFwiXCIpKTtcclxuICBjb25zdCBbY29uY2x1c2lvbmVzLCBzZXRDb25jbHVzaW9uZXNdID0gdXNlU3RhdGUoU3RyaW5nKGRldGFpbC5jb25jbHVzaW9uZXMgPz8gZGV0YWlsLkNvbmNsdXNpb25lcyA/PyBcIlwiKSk7XHJcbiAgY29uc3QgW3N0YXR1cywgc2V0U3RhdHVzXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbYnVzeSwgc2V0QnVzeV0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtpc0VkaXRpbmcsIHNldElzRWRpdGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtpc0h5ZHJhdGluZywgc2V0SXNIeWRyYXRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbbW9kYWxFcnJvciwgc2V0TW9kYWxFcnJvcl0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgcmVhZE9ubHlTdXJmYWNlUmVmID0gdXNlUmVmKG51bGwpO1xuICBjb25zdCBlZGl0U25hcHNob3RSZWYgPSB1c2VSZWYobnVsbCk7XG5cclxuICBjb25zdCByZWNJZCA9IGFjdGl2aXR5UmVjSWQ7XG4gIGNvbnN0IGFjY291bnROdW0gPSBTdHJpbmcoZGV0YWlsLmFjY291bnROdW0gPz8gZGV0YWlsLkFjY291bnROdW0gPz8gXCJcIik7XHJcbiAgY29uc3QgYWN0aXZpZGFkSWQgPSBTdHJpbmcoZGV0YWlsLmFjdGl2aWRhZElkID8/IGRldGFpbC5BY3RpdmlkYWRJZCA/PyBcIlwiKTtcclxuXHJcbiAgY29uc3QgeyBlZGl0TW9kZUtleVJlZiwgc3luY0VkaXRNb2RlRmxhZywgY2xlYXJEcmFmdCwgYXBwbHlEcmFmdFZhbHVlcyB9ID0gdXNlRGV0YWlsRWRpdFNlc3Npb24oe1xuICAgIGFjdGl2aWRhZElkLFxuICAgIHJlY0lkLFxuICAgIGNhbkVkaXRIaXN0b3J5LFxuICAgIGlzRWRpdGluZyxcbiAgICBzZXRJc0VkaXRpbmcsXG4gICAgdHJhbnNEYXRlLFxuICAgIHZpc2l0VHlwZSxcbiAgICBhc2lzdGVudGVUaXBvLFxuICAgIGRlc2NyaXB0aW9uLFxuICAgIGNvbWVudGFyaW9zLFxuICAgIGFudGVjZWRlbnRlcyxcbiAgICBjb25jbHVzaW9uZXMsXG4gICAgc2V0VHJhbnNEYXRlLFxuICAgIHNldFZpc2l0VHlwZSxcbiAgICBzZXRBc2lzdGVudGVUaXBvLFxuICAgIHNldERlc2NyaXB0aW9uLFxuICAgIHNldENvbWVudGFyaW9zLFxuICAgIHNldEFudGVjZWRlbnRlcyxcbiAgICBzZXRDb25jbHVzaW9uZXMsXG4gIH0pO1xuXHJcbiAgY29uc3QgaGFzU2VydmVyRGV0YWlsID1cclxuICAgIGhhc1ZhbHVlKHJlY0lkKSAmJlxyXG4gICAgaGFzVmFsdWUoYWNjb3VudE51bSkgJiZcclxuICAgIGhhc1ZhbHVlKGRldGFpbC50cmFuc0RhdGUgfHwgZGV0YWlsLlRyYW5zRGF0ZSB8fCBcIlwiKTtcclxuXHJcbiAgY29uc3Qgc2hvdWxkSHlkcmF0ZSA9ICEhYWN0aXZpZGFkSWQgJiYgIWhhc1NlcnZlckRldGFpbDtcclxuXHJcbiAgY29uc3Qgb3BlblRleHRFZGl0b3IgPSB1c2VDYWxsYmFjayhcbiAgICAoXG4gICAgICBmaWVsZElkOiBzdHJpbmcsXG4gICAgICBmaWVsZExhYmVsOiBzdHJpbmcsXG4gICAgICBmaWVsZFZhbHVlOiBzdHJpbmcsXG4gICAgICBvcHRpb25zOiB7IGFsbG93RWRpdD86IGJvb2xlYW47IHJlYWRPbmx5PzogYm9vbGVhbjsgZWRpdE1vZGVLZXk/OiBzdHJpbmcgfSA9IHt9XG4gICAgKSA9PiB7XG4gICAgICBuYXZpZ2F0ZVRvVGV4dEVkaXRvckZpZWxkKHtcbiAgICAgICAgZmllbGRJZCxcbiAgICAgICAgZmllbGRMYWJlbCxcbiAgICAgICAgZmllbGRWYWx1ZSxcbiAgICAgICAgcmVhZE9ubHk6IG9wdGlvbnM/LnJlYWRPbmx5ID09PSB0cnVlLFxuICAgICAgICBhbGxvd0VkaXQ6IG9wdGlvbnM/LmFsbG93RWRpdCAhPT0gZmFsc2UsXG4gICAgICAgIGVkaXRNb2RlS2V5OiBvcHRpb25zPy5lZGl0TW9kZUtleSxcbiAgICAgICAgZWRpdE1vZGVSZXR1cm5UdGxNczogRURJVE9SX1JFVFVSTl9GTEFHX1RUTF9NUyxcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgW11cbiAgKTtcblxyXG4gIGNvbnN0IGhhbmRsZUNvbWVudGFyaW9zVGFwID0gdXNlQ2FsbGJhY2soKGV2ZW50KSA9PiB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgb3BlblRleHRFZGl0b3IoZmllbGRJZENvbWVudGFyaW9zLCBpbmRUKFwiVmlzaXRzX0ZpZWxkX0NvbW1lbnRzXCIsIFwiQ29tbWVudHNcIiksIGNvbWVudGFyaW9zLCB7XHJcbiAgICAgIHJlYWRPbmx5OiAhaXNFZGl0aW5nLFxyXG4gICAgICBhbGxvd0VkaXQ6IGNhbkVkaXRIaXN0b3J5LFxyXG4gICAgICBlZGl0TW9kZUtleTogZWRpdE1vZGVLZXlSZWYuY3VycmVudFxyXG4gICAgfSk7XHJcbiAgfSwgW2NvbWVudGFyaW9zLCBpc0VkaXRpbmcsIGNhbkVkaXRIaXN0b3J5LCBvcGVuVGV4dEVkaXRvcl0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVDb21lbnRhcmlvc0hvbGQgPSB1c2VDYWxsYmFjaygodGFyZ2V0LCBjbGllbnRZKSA9PiB7XHJcbiAgICBpZiAoIXRhcmdldCB8fCAhaXNPdmVyZmxvd2luZyh0YXJnZXQpKSByZXR1cm4gZmFsc2U7XHJcbiAgICBzZXRQcmV2aWV3QW5jaG9yKHRhcmdldCk7XHJcbiAgICByZXR1cm4gc2hvd1ByZXZpZXdUb29sdGlwKFN0cmluZyhjb21lbnRhcmlvcyB8fCBcIlwiKSwgY2xpZW50WSk7XHJcbiAgfSwgW2NvbWVudGFyaW9zXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUFudGVjZWRlbnRlc1RhcCA9IHVzZUNhbGxiYWNrKChldmVudCkgPT4ge1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIG9wZW5UZXh0RWRpdG9yKGZpZWxkSWRBbnRlY2VkZW50ZXMsIGluZFQoXCJWaXNpdHNfRmllbGRfQmFja2dyb3VuZFwiLCBcIkJhY2tncm91bmRcIiksIGFudGVjZWRlbnRlcywge1xyXG4gICAgICByZWFkT25seTogIWlzRWRpdGluZyxcclxuICAgICAgYWxsb3dFZGl0OiBjYW5FZGl0SGlzdG9yeSxcclxuICAgICAgZWRpdE1vZGVLZXk6IGVkaXRNb2RlS2V5UmVmLmN1cnJlbnRcclxuICAgIH0pO1xyXG4gIH0sIFthbnRlY2VkZW50ZXMsIGlzRWRpdGluZywgY2FuRWRpdEhpc3RvcnksIG9wZW5UZXh0RWRpdG9yXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUFudGVjZWRlbnRlc0hvbGQgPSB1c2VDYWxsYmFjaygodGFyZ2V0LCBjbGllbnRZKSA9PiB7XHJcbiAgICBpZiAoIXRhcmdldCB8fCAhaXNPdmVyZmxvd2luZyh0YXJnZXQpKSByZXR1cm4gZmFsc2U7XHJcbiAgICBzZXRQcmV2aWV3QW5jaG9yKHRhcmdldCk7XHJcbiAgICByZXR1cm4gc2hvd1ByZXZpZXdUb29sdGlwKFN0cmluZyhhbnRlY2VkZW50ZXMgfHwgXCJcIiksIGNsaWVudFkpO1xyXG4gIH0sIFthbnRlY2VkZW50ZXNdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQ29uY2x1c2lvbmVzVGFwID0gdXNlQ2FsbGJhY2soKGV2ZW50KSA9PiB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgb3BlblRleHRFZGl0b3IoZmllbGRJZENvbmNsdXNpb25lcywgaW5kVChcIlZpc2l0c19GaWVsZF9Db25jbHVzaW9uc1wiLCBcIkNvbmNsdXNpb25zXCIpLCBjb25jbHVzaW9uZXMsIHtcclxuICAgICAgcmVhZE9ubHk6ICFpc0VkaXRpbmcsXHJcbiAgICAgIGFsbG93RWRpdDogY2FuRWRpdEhpc3RvcnksXHJcbiAgICAgIGVkaXRNb2RlS2V5OiBlZGl0TW9kZUtleVJlZi5jdXJyZW50XHJcbiAgICB9KTtcclxuICB9LCBbY29uY2x1c2lvbmVzLCBpc0VkaXRpbmcsIGNhbkVkaXRIaXN0b3J5LCBvcGVuVGV4dEVkaXRvcl0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVDb25jbHVzaW9uZXNIb2xkID0gdXNlQ2FsbGJhY2soKHRhcmdldCwgY2xpZW50WSkgPT4ge1xyXG4gICAgaWYgKCF0YXJnZXQgfHwgIWlzT3ZlcmZsb3dpbmcodGFyZ2V0KSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgc2V0UHJldmlld0FuY2hvcih0YXJnZXQpO1xyXG4gICAgcmV0dXJuIHNob3dQcmV2aWV3VG9vbHRpcChTdHJpbmcoY29uY2x1c2lvbmVzIHx8IFwiXCIpLCBjbGllbnRZKTtcclxuICB9LCBbY29uY2x1c2lvbmVzXSk7XHJcblxyXG4gIGNvbnN0IGNvbWVudGFyaW9zVGFwID0gdXNlVGFwR3VhcmQoaGFuZGxlQ29tZW50YXJpb3NUYXAsIGhhbmRsZUNvbWVudGFyaW9zSG9sZCk7XHJcbiAgY29uc3QgYW50ZWNlZGVudGVzVGFwID0gdXNlVGFwR3VhcmQoaGFuZGxlQW50ZWNlZGVudGVzVGFwLCBoYW5kbGVBbnRlY2VkZW50ZXNIb2xkKTtcclxuICBjb25zdCBjb25jbHVzaW9uZXNUYXAgPSB1c2VUYXBHdWFyZChoYW5kbGVDb25jbHVzaW9uZXNUYXAsIGhhbmRsZUNvbmNsdXNpb25lc0hvbGQpO1xyXG5cclxuICBjb25zdCB0ZXh0RWRpdG9yQmluZGluZ3MgPSB1c2VNZW1vKFxuICAgICgpID0+IFtcbiAgICAgIHsgZmllbGRJZDogZmllbGRJZENvbWVudGFyaW9zLCBhcHBseVZhbHVlOiBzZXRDb21lbnRhcmlvcyB9LFxuICAgICAgeyBmaWVsZElkOiBmaWVsZElkQW50ZWNlZGVudGVzLCBhcHBseVZhbHVlOiBzZXRBbnRlY2VkZW50ZXMgfSxcbiAgICAgIHsgZmllbGRJZDogZmllbGRJZENvbmNsdXNpb25lcywgYXBwbHlWYWx1ZTogc2V0Q29uY2x1c2lvbmVzIH0sXG4gICAgXSxcbiAgICBbZmllbGRJZEFudGVjZWRlbnRlcywgZmllbGRJZENvbWVudGFyaW9zLCBmaWVsZElkQ29uY2x1c2lvbmVzXVxuICApO1xuXG4gIGNvbnN0IHsgYXBwbHlWYWx1ZXM6IGFwcGx5VGV4dEVkaXRvclZhbHVlcyB9ID0gdXNlVGV4dEVkaXRvckZpZWxkcyh0ZXh0RWRpdG9yQmluZGluZ3MsIHtcbiAgICBhcHBseU9uTW91bnQ6ICFhY3RpdmlkYWRJZCxcbiAgICBsaXN0ZW5QYWdlU2hvdzogdHJ1ZSxcbiAgfSk7XG5cclxuICBjb25zdCB7IG1vZGFsLCBvcGVuQ29uZmlybSwgY2xvc2VDb25maXJtLCBoYW5kbGVDb25maXJtIH0gPSB1c2VDb25maXJtRGlhbG9nKHtcbiAgICBkZWZhdWx0Q29uZmlybVRleHQ6IGluZFQoXCJDb25maXJtX1llc1wiLCBcIkNvbmZpcm1fWWVzXCIpLFxuICAgIGRlZmF1bHRDYW5jZWxUZXh0OiBpbmRUKFwiQ29uZmlybV9Ob1wiLCBcIkNvbmZpcm1fTm9cIilcbiAgfSk7XG5cclxuICBjb25zdCBoYW5kbGVNb2RhbENvbmZpcm0gPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XHJcbiAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xyXG4gICAgYXdhaXQgaGFuZGxlQ29uZmlybSh7XHJcbiAgICAgIGJ1c3ksXHJcbiAgICAgIG9uRXJyb3I6IChtc2cpID0+IHtcclxuICAgICAgICBzZXRNb2RhbEVycm9yKG1zZyk7XHJcbiAgICAgICAgc2V0U3RhdHVzKG1zZyk7XHJcbiAgICAgICAgZmxhc2hBY3Rpb25NYXJrKFwiZXJyb3JQcm9jZXNzXCIsIDE1MDApO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9LCBbYnVzeSwgaGFuZGxlQ29uZmlybV0pO1xyXG5cclxuICBjb25zdCBtb2RhbExvYWRpbmdUZXh0ID0gaW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiQ29tbW9uX0xvYWRpbmdcIik7XG4gIGNvbnN0IG1vZGFsQ2FuY2VsVGV4dCA9IG1vZGFsLmNhbmNlbFRleHQgfHwgaW5kVChcIkNvbmZpcm1fTm9cIiwgXCJDb25maXJtX05vXCIpO1xuICBjb25zdCBtb2RhbENvbmZpcm1UZXh0ID0gYnVzeVxuICAgID8gbW9kYWxMb2FkaW5nVGV4dFxuICAgIDogKCFidXN5ICYmIG1vZGFsRXJyb3IgPyBpbmRUKFwiQ29tbW9uX09LXCIsIFwiQ29tbW9uX09LXCIpIDogKG1vZGFsLmNvbmZpcm1UZXh0IHx8IGluZFQoXCJDb25maXJtX1llc1wiLCBcIkNvbmZpcm1fWWVzXCIpKSk7XG5cclxuICBjb25zdCBoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm0gPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKCFidXN5ICYmIG1vZGFsRXJyb3IpIHtcbiAgICAgIGNsb3NlQ29uZmlybSgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBoYW5kbGVNb2RhbENvbmZpcm0oKTtcbiAgfSwgW2J1c3ksIG1vZGFsRXJyb3IsIGNsb3NlQ29uZmlybSwgaGFuZGxlTW9kYWxDb25maXJtXSk7XG5cbiAgY29uc3QgaGFzQWN0aXZlUHJvY2VzcyA9IHVzZU1lbW8oKCkgPT4gYnVzeSB8fCBpc0VkaXRpbmcsIFtidXN5LCBpc0VkaXRpbmddKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHdpbmRvdy5fX2luZFNldE5hdmlnYXRpb25HdWFyZD8uKGhhc0FjdGl2ZVByb2Nlc3MpO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB3aW5kb3cuX19pbmRDbGVhck5hdmlnYXRpb25HdWFyZD8uKCk7XG4gICAgfTtcbiAgfSwgW2hhc0FjdGl2ZVByb2Nlc3NdKTtcblxyXG4gIHVzZURldGFpbEh5ZHJhdGlvbih7XG4gICAgYWN0aXZpZGFkSWQsXG4gICAgc2hvdWxkSHlkcmF0ZSxcbiAgICB2aXNpdFR5cGVzLFxuICAgIGFzaXN0ZW50ZVRpcG9zLFxuICAgIGRlZmF1bHRWaXNpdFR5cGUsXG4gICAgaW5pdGlhbEFzaXN0ZW50ZSxcbiAgICBub3JtYWxpemVEYXRlVG9JbnB1dCxcbiAgICBtYXRjaE9wdGlvblZhbHVlLFxuICAgIGFwcGx5RHJhZnRWYWx1ZXMsXG4gICAgYXBwbHlUZXh0RWRpdG9yVmFsdWVzLFxuICAgIHNldFN0YXR1cyxcbiAgICBzZXRJc0h5ZHJhdGluZyxcbiAgICBzZXRUcmFuc0RhdGUsXG4gICAgc2V0VmlzaXRUeXBlLFxuICAgIHNldEFzaXN0ZW50ZVRpcG8sXG4gICAgc2V0RGVzY3JpcHRpb24sXG4gICAgc2V0Q29tZW50YXJpb3MsXG4gICAgc2V0QW50ZWNlZGVudGVzLFxuICAgIHNldENvbmNsdXNpb25lcyxcbiAgfSk7XG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGVsID0gcmVhZE9ubHlTdXJmYWNlUmVmLmN1cnJlbnQ7XG4gICAgaWYgKCFlbCkgcmV0dXJuO1xuICAgIGlmICghaXNFZGl0aW5nKSB7XG4gICAgICBlbC5jbGFzc0xpc3QuYWRkKFwiaW5kLXJlYWRvbmx5LXN1cmZhY2VcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoXCJpbmQtcmVhZG9ubHktc3VyZmFjZVwiKTtcbiAgICB9XG4gIH0sIFtpc0VkaXRpbmddKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChpc0VkaXRpbmcpIHtcbiAgICAgIGlmICghZWRpdFNuYXBzaG90UmVmLmN1cnJlbnQpIHtcbiAgICAgICAgZWRpdFNuYXBzaG90UmVmLmN1cnJlbnQgPSB7XG4gICAgICAgICAgdHJhbnNEYXRlLFxuICAgICAgICAgIHZpc2l0VHlwZSxcbiAgICAgICAgICBhc2lzdGVudGVUaXBvLFxuICAgICAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgICAgIGNvbWVudGFyaW9zLFxuICAgICAgICAgIGFudGVjZWRlbnRlcyxcbiAgICAgICAgICBjb25jbHVzaW9uZXNcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZWRpdFNuYXBzaG90UmVmLmN1cnJlbnQgPSBudWxsO1xuICB9LCBbaXNFZGl0aW5nLCB0cmFuc0RhdGUsIHZpc2l0VHlwZSwgYXNpc3RlbnRlVGlwbywgZGVzY3JpcHRpb24sIGNvbWVudGFyaW9zLCBhbnRlY2VkZW50ZXMsIGNvbmNsdXNpb25lc10pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKGlzRWRpdGluZykgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICByZXR1cm4gYmluZFJlYWRPbmx5R3VhcmQocmVhZE9ubHlTdXJmYWNlUmVmLmN1cnJlbnQpO1xuICB9LCBbaXNFZGl0aW5nXSk7XG5cbiAgY29uc3QgaGFuZGxlRW5hYmxlRWRpdCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoIWNhbkVkaXRIaXN0b3J5KSB7XG4gICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHNldElzRWRpdGluZyh0cnVlKTtcbiAgICBzeW5jRWRpdE1vZGVGbGFnKHRydWUpO1xuICAgIHNldFN0YXR1cyhpbmRUKFwiVmlzaXRzX0RldGFpbF9FZGl0aW5nRW5hYmxlZFwiLCBcIkVkaXRpbmcgZW5hYmxlZFwiKSk7XG4gIH0sIFtjYW5FZGl0SGlzdG9yeSwgc3luY0VkaXRNb2RlRmxhZ10pO1xuXG4gIGNvbnN0IGhhbmRsZUNhbmNlbEVkaXQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKCFpc0VkaXRpbmcpIHJldHVybjtcbiAgICBzZXRJc0VkaXRpbmcoZmFsc2UpO1xuICAgIHN5bmNFZGl0TW9kZUZsYWcoZmFsc2UpO1xuICAgIGNsZWFyRHJhZnQoKTtcbiAgICBzZXRTdGF0dXMoaW5kVChcIkNvbW1vbl9DYW5jZWxcIiwgXCJDYW5jZWxcIikpO1xuICAgIHdpbmRvdy5fX2luZEJ5cGFzc05hdmlnYXRpb25HdWFyZE9uY2U/LigpO1xuICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgfSwgW2lzRWRpdGluZywgc3luY0VkaXRNb2RlRmxhZywgY2xlYXJEcmFmdF0pO1xuXHJcbiAgY29uc3QgeyBoYW5kbGVVcGRhdGUsIGhhbmRsZURlbGV0ZSB9ID0gdXNlRGV0YWlsTXV0YXRpb25zKHtcbiAgICBidXN5LFxuICAgIGlzRWRpdGluZyxcbiAgICBjYW5FZGl0SGlzdG9yeSxcbiAgICBjYW5EZWxldGVIaXN0b3J5LFxuICAgIHJlY0lkLFxuICAgIGFjY291bnROdW0sXG4gICAgdHJhbnNEYXRlLFxuICAgIHZpc2l0VHlwZSxcbiAgICBhc2lzdGVudGVUaXBvLFxuICAgIGRlc2NyaXB0aW9uLFxuICAgIGNvbWVudGFyaW9zLFxuICAgIGFudGVjZWRlbnRlcyxcbiAgICBjb25jbHVzaW9uZXMsXG4gICAgdmlzaXRUeXBlcyxcbiAgICBhc2lzdGVudGVUaXBvcyxcbiAgICBkZWZhdWx0VmlzaXRUeXBlLFxuICAgIHJhd0luaXRpYWxWaXNpdFR5cGUsXG4gICAgcmF3SW5pdGlhbEFzaXN0ZW50ZSxcbiAgICBtYXRjaE9wdGlvblZhbHVlLFxuICAgIGNsZWFyRHJhZnQsXG4gICAgc3luY0VkaXRNb2RlRmxhZyxcbiAgICBzZXRNb2RhbEVycm9yLFxuICAgIHNldEJ1c3ksXG4gICAgc2V0U3RhdHVzLFxuICAgIHNldElzRWRpdGluZyxcbiAgfSk7XG5cclxuICB1c2VEZXRhaWxUb3BiYXJBY3Rpb25zKHtcbiAgICBidXN5LFxuICAgIG1vZGFsT3BlbjogbW9kYWwub3BlbixcbiAgICBpc0VkaXRpbmcsXG4gICAgY2FuRWRpdEhpc3RvcnksXG4gICAgY2FuRGVsZXRlSGlzdG9yeSxcbiAgICB0cmFuc0RhdGUsXG4gICAgc2V0TW9kYWxFcnJvcixcbiAgICBoYW5kbGVFbmFibGVFZGl0LFxuICAgIGhhbmRsZUNhbmNlbEVkaXQsXG4gICAgaGFuZGxlVXBkYXRlLFxuICAgIGhhbmRsZURlbGV0ZSxcbiAgICBvcGVuQ29uZmlybSxcbiAgICBjbG9zZUNvbmZpcm0sXG4gIH0pO1xuXG4gIGNvbnN0IGRlc2NyaXB0aW9uTGFiZWwgPSBpbmRUKFwiVmlzaXRzX0ZpZWxkX0Rlc2NyaXB0aW9uXCIsIFwiRGVzY3JpcHRpb25cIik7XG4gIGNvbnN0IGNvbW1lbnRzTGFiZWwgPSBpbmRUKFwiVmlzaXRzX0ZpZWxkX0NvbW1lbnRzXCIsIFwiQ29tbWVudHNcIik7XG4gIGNvbnN0IGJhY2tncm91bmRMYWJlbCA9IGluZFQoXCJWaXNpdHNfRmllbGRfQmFja2dyb3VuZFwiLCBcIkJhY2tncm91bmRcIik7XG4gIGNvbnN0IGNvbmNsdXNpb25zTGFiZWwgPSBpbmRUKFwiVmlzaXRzX0ZpZWxkX0NvbmNsdXNpb25zXCIsIFwiQ29uY2x1c2lvbnNcIik7XG4gIGNvbnN0IGRldGFpbERlc2NyaXB0aW9uQ2xhc3NOYW1lID0gY2xhc3NOYW1lcyhcbiAgICBcImZvcm0tY29udHJvbFwiLFxuICAgIGlzRWRpdGluZyA/IFwiYm9yZGVyLXNsYXRlLTIwMCB0ZXh0LXNsYXRlLTkwMFwiIDogXCJib3JkZXItc2xhdGUtMjAwIGluZC1yZWFkb25seS1maWVsZFwiXG4gICk7XG4gIGNvbnN0IGRldGFpbFJlYWRPbmx5Q2xhc3NOYW1lID0gY2xhc3NOYW1lcyhcImZvcm0tY29udHJvbCBjdXJzb3ItcG9pbnRlclwiLCAhaXNFZGl0aW5nID8gXCJpbmQtcmVhZG9ubHktZmllbGRcIiA6IFwiXCIpO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTRcIj5cclxuICAgICAgPENvbmZpcm1Nb2RhbFxyXG4gICAgICAgIG9wZW49e21vZGFsLm9wZW59XHJcbiAgICAgICAgdGl0bGU9e21vZGFsLnRpdGxlfVxyXG4gICAgICAgIG1lc3NhZ2U9e21vZGFsLm1lc3NhZ2V9XHJcbiAgICAgICAgY29uZmlybVRleHQ9e21vZGFsQ29uZmlybVRleHR9XHJcbiAgICAgICAgY2FuY2VsVGV4dD17bW9kYWxDYW5jZWxUZXh0fVxyXG4gICAgICAgIGxvYWRpbmdUZXh0PXttb2RhbExvYWRpbmdUZXh0fVxyXG4gICAgICAgIHNob3dDYW5jZWw9e21vZGFsLnNob3dDYW5jZWx9XHJcbiAgICAgICAgc2hvd0NvbmZpcm09e21vZGFsLnNob3dDb25maXJtfVxyXG4gICAgICAgIGJ1c3k9e2J1c3l9XHJcbiAgICAgICAgZXJyb3I9e21vZGFsRXJyb3J9XHJcbiAgICAgICAgc3RhdHVzPXtzdGF0dXN9XHJcbiAgICAgICAgb25Db25maXJtPXtoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm19XHJcbiAgICAgICAgb25DYW5jZWw9e2Nsb3NlQ29uZmlybX1cclxuICAgICAgLz5cclxuICAgICAgPGRpdlxyXG4gICAgICAgIHJlZj17cmVhZE9ubHlTdXJmYWNlUmVmfVxyXG4gICAgICAgIGNsYXNzTmFtZT1cInJlbGF0aXZlIHNoYWRvdy14cyBnbGFzcy1wYW5lbCBwLTQgc3BhY2UteS00IGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHJvdW5kZWQtMnhsXCJcclxuICAgICAgPlxyXG4gICAgICAgIHtpc0h5ZHJhdGluZyAmJiAoXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgei0xMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBiZy13aGl0ZS83MCByb3VuZGVkLTJ4bFwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQtc20gdGV4dC1zbGF0ZS02MDBcIj5cclxuICAgICAgICAgICAgICA8U3Bpbm5lciBzaXplPVwiaC01IHctNVwiIC8+XHJcbiAgICAgICAgICAgICAgPHNwYW4+e2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9PC9zcGFuPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICl9XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTIgZ2FwLTQgcHQtMVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidmlzaXRhLWZpZWxkLXRleHRcIj5cclxuICAgICAgICAgICAgPFNpbmdsZURhdGVQaWNrZXJcbiAgICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJWaXNpdHNfRGV0YWlsX0RhdGVfTGFiZWxcIiwgXCJEYXRlXCIpfVxuICAgICAgICAgICAgICB2YWx1ZT17dHJhbnNEYXRlfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17c2V0VHJhbnNEYXRlfVxuICAgICAgICAgICAgICBkaXNhYmxlZD17IWlzRWRpdGluZ31cbiAgICAgICAgICAgICAgcmVhZE9ubHk9eyFpc0VkaXRpbmd9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxTZWxlY3RDb21ib2JveFxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJWaXNpdHNfRGV0YWlsX1Zpc2l0VHlwZV9MYWJlbFwiLCBcIlZpc2l0IHR5cGVcIil9XG4gICAgICAgICAgICBvcHRpb25zPXt2aXNpdFR5cGVzfVxuICAgICAgICAgICAgdmFsdWU9e3Zpc2l0VHlwZX1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXtzZXRWaXNpdFR5cGV9XG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIlZpc2l0c19EZXRhaWxfVmlzaXRUeXBlX1BsYWNlaG9sZGVyXCIsIFwiU2VsZWN0IHR5cGVcIil9XG4gICAgICAgICAgICBkaXNhYmxlZD17IWlzRWRpdGluZ31cbiAgICAgICAgICAgIHJlYWRPbmx5PXshaXNFZGl0aW5nfVxuICAgICAgICAgICAgdXNlUG9ydGFsPXtmYWxzZX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgPFZpc2l0TmFycmF0aXZlRmllbGRzXG4gICAgICAgICAgZGVzY3JpcHRpb25MYWJlbD17ZGVzY3JpcHRpb25MYWJlbH1cbiAgICAgICAgICBkZXNjcmlwdGlvblZhbHVlPXtkZXNjcmlwdGlvbn1cbiAgICAgICAgICBkZXNjcmlwdGlvbkNsYXNzTmFtZT17ZGV0YWlsRGVzY3JpcHRpb25DbGFzc05hbWV9XG4gICAgICAgICAgZGVzY3JpcHRpb25EaXNhYmxlZD17IWlzRWRpdGluZ31cbiAgICAgICAgICBvbkRlc2NyaXB0aW9uQ2hhbmdlPXtzZXREZXNjcmlwdGlvbn1cbiAgICAgICAgICB0YXBGaWVsZHM9e1tcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgaWQ6IFwiY29tZW50YXJpb3NcIixcbiAgICAgICAgICAgICAgbGFiZWw6IGNvbW1lbnRzTGFiZWwsXG4gICAgICAgICAgICAgIHZhbHVlOiBjb21lbnRhcmlvcyxcbiAgICAgICAgICAgICAgY2xhc3NOYW1lOiBkZXRhaWxSZWFkT25seUNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgcG9pbnRlckJpbmRpbmdzOiBjb21lbnRhcmlvc1RhcCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGlkOiBcImFudGVjZWRlbnRlc1wiLFxuICAgICAgICAgICAgICBsYWJlbDogYmFja2dyb3VuZExhYmVsLFxuICAgICAgICAgICAgICB2YWx1ZTogYW50ZWNlZGVudGVzLFxuICAgICAgICAgICAgICBjbGFzc05hbWU6IGRldGFpbFJlYWRPbmx5Q2xhc3NOYW1lLFxuICAgICAgICAgICAgICBwb2ludGVyQmluZGluZ3M6IGFudGVjZWRlbnRlc1RhcCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGlkOiBcImNvbmNsdXNpb25lc1wiLFxuICAgICAgICAgICAgICBsYWJlbDogY29uY2x1c2lvbnNMYWJlbCxcbiAgICAgICAgICAgICAgdmFsdWU6IGNvbmNsdXNpb25lcyxcbiAgICAgICAgICAgICAgY2xhc3NOYW1lOiBkZXRhaWxSZWFkT25seUNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgcG9pbnRlckJpbmRpbmdzOiBjb25jbHVzaW9uZXNUYXAsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF19XG4gICAgICAgIC8+XG5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0zIHRleHQtc20gdGV4dC1zbGF0ZS02MDBcIj5cclxuICAgICAgICAgIDxzcGFuPntzdGF0dXN9PC9zcGFuPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XG5cbi8vIERldGFpbCBVSSB3cmFwcGVkIGJ5IHRoZSBlcnJvciBib3VuZGFyeS5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIERldGFpbEZvcm0oKSB7XG4gIHJldHVybiAoXG4gICAgPEFwcEVycm9yQm91bmRhcnkgZmFsbGJhY2tNZXNzYWdlPXtpbmRUKFwiVmlzaXRzX0RldGFpbF9FcnJvckJvdW5kYXJ5XCIsIFwiQW4gZXJyb3Igb2NjdXJyZWQgd2hpbGUgcmVuZGVyaW5nIHRoZSBkZXRhaWwgcGFnZS4gUmVsb2FkIGFuZCB0cnkgYWdhaW4uXCIpfT5cbiAgICAgIDxEZXRhaWxBcHAgLz5cbiAgICA8L0FwcEVycm9yQm91bmRhcnk+XG4gICk7XG59XG4iLCAiZXhwb3J0IGNvbnN0IGJpbmRSZWFkT25seUd1YXJkID0gKGVsOiBIVE1MRWxlbWVudCB8IG51bGwpID0+IHtcbiAgaWYgKCFlbCkgcmV0dXJuICgpID0+IHt9O1xuICBjb25zdCBjYW5jZWwgPSAoZXZlbnQ6IEV2ZW50KSA9PiBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICBjb25zdCBldmVudHMgPSBbXCJjb250ZXh0bWVudVwiLCBcInNlbGVjdHN0YXJ0XCIsIFwiY29weVwiLCBcImN1dFwiLCBcInBhc3RlXCJdO1xuICBldmVudHMuZm9yRWFjaCgoZXZ0KSA9PiBlbC5hZGRFdmVudExpc3RlbmVyKGV2dCwgY2FuY2VsKSk7XG4gIHJldHVybiAoKSA9PiB7XG4gICAgZXZlbnRzLmZvckVhY2goKGV2dCkgPT4gZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihldnQsIGNhbmNlbCkpO1xuICB9O1xufTtcbiIsICJleHBvcnQgY29uc3QgaGFzVmFsdWUgPSAodmFsdWU6IHVua25vd24pID0+IFN0cmluZyh2YWx1ZSB8fCBcIlwiKS50cmltKCkubGVuZ3RoID4gMDtcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBmZXRjaEpzb24gfSBmcm9tIFwiLi4vc2VydmljZXMvYXBpU2VydmljZS50c1wiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi91dGlscy9pbmRJMThuLnRzXCI7XG5cbnR5cGUgT3B0aW9uTGlrZSA9IHtcbiAgdmFsdWU/OiBzdHJpbmcgfCBudW1iZXI7XG4gIFZhbHVlPzogc3RyaW5nIHwgbnVtYmVyO1xuICB0ZXh0Pzogc3RyaW5nO1xuICBUZXh0Pzogc3RyaW5nO1xufTtcblxudHlwZSBBY3Rpdml0eURldGFpbFJlY29yZCA9IFJlY29yZDxzdHJpbmcsIHVua25vd24+O1xuXG50eXBlIEFjdGl2aXR5RGV0YWlsUmVzcG9uc2UgPSB7XG4gIHN1Y2Nlc3M/OiBib29sZWFuO1xuICBtZXNzYWdlPzogc3RyaW5nO1xuICBkYXRhPzogQWN0aXZpdHlEZXRhaWxSZWNvcmQgfCBudWxsO1xuICBTdWNjZXNzPzogYm9vbGVhbjtcbiAgTWVzc2FnZT86IHN0cmluZztcbiAgRGF0YT86IEFjdGl2aXR5RGV0YWlsUmVjb3JkIHwgbnVsbDtcbn07XG5cbmNvbnN0IGlzUmVzcG9uc2VTdWNjZXNzID0gKHJlc3BvbnNlOiBBY3Rpdml0eURldGFpbFJlc3BvbnNlKTogYm9vbGVhbiA9PiB7XG4gIHJldHVybiByZXNwb25zZS5zdWNjZXNzID09PSB0cnVlIHx8IHJlc3BvbnNlLlN1Y2Nlc3MgPT09IHRydWU7XG59O1xuXG5jb25zdCBnZXRSZXNwb25zZU1lc3NhZ2UgPSAocmVzcG9uc2U6IEFjdGl2aXR5RGV0YWlsUmVzcG9uc2UpOiBzdHJpbmcgPT4ge1xuICBjb25zdCByYXcgPSByZXNwb25zZS5tZXNzYWdlID8/IHJlc3BvbnNlLk1lc3NhZ2U7XG4gIHJldHVybiB0eXBlb2YgcmF3ID09PSBcInN0cmluZ1wiID8gcmF3LnRyaW0oKSA6IFwiXCI7XG59O1xuXG5jb25zdCBnZXRSZXNwb25zZURhdGEgPSAocmVzcG9uc2U6IEFjdGl2aXR5RGV0YWlsUmVzcG9uc2UpOiBBY3Rpdml0eURldGFpbFJlY29yZCB8IG51bGwgPT4ge1xuICBjb25zdCBkYXRhID0gcmVzcG9uc2UuZGF0YSA/PyByZXNwb25zZS5EYXRhO1xuICByZXR1cm4gZGF0YSAmJiB0eXBlb2YgZGF0YSA9PT0gXCJvYmplY3RcIiA/IGRhdGEgOiBudWxsO1xufTtcblxuY29uc3QgYXNSZWNvcmQgPSAodmFsdWU6IHVua25vd24pOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiB8IG51bGwgPT4ge1xuICBpZiAoIXZhbHVlIHx8IHR5cGVvZiB2YWx1ZSAhPT0gXCJvYmplY3RcIiB8fCBBcnJheS5pc0FycmF5KHZhbHVlKSkgcmV0dXJuIG51bGw7XG4gIHJldHVybiB2YWx1ZSBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPjtcbn07XG5cbnR5cGUgVXNlRGV0YWlsSHlkcmF0aW9uQXJncyA9IHtcbiAgYWN0aXZpZGFkSWQ6IHN0cmluZztcbiAgc2hvdWxkSHlkcmF0ZTogYm9vbGVhbjtcbiAgdmlzaXRUeXBlczogT3B0aW9uTGlrZVtdO1xuICBhc2lzdGVudGVUaXBvczogT3B0aW9uTGlrZVtdO1xuICBkZWZhdWx0VmlzaXRUeXBlOiBzdHJpbmc7XG4gIGluaXRpYWxBc2lzdGVudGU6IHN0cmluZztcbiAgbm9ybWFsaXplRGF0ZVRvSW5wdXQ6ICh2YWx1ZTogc3RyaW5nKSA9PiBzdHJpbmc7XG4gIG1hdGNoT3B0aW9uVmFsdWU6IChvcHRpb25zOiBPcHRpb25MaWtlW10sIHJhdzogdW5rbm93bikgPT4gc3RyaW5nO1xuICBhcHBseURyYWZ0VmFsdWVzOiAoKSA9PiB2b2lkO1xuICBhcHBseVRleHRFZGl0b3JWYWx1ZXM6ICgpID0+IHZvaWQ7XG4gIHNldFN0YXR1czogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHNldElzSHlkcmF0aW5nOiAodmFsdWU6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHNldFRyYW5zRGF0ZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHNldFZpc2l0VHlwZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHNldEFzaXN0ZW50ZVRpcG86ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBzZXREZXNjcmlwdGlvbjogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHNldENvbWVudGFyaW9zOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgc2V0QW50ZWNlZGVudGVzOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgc2V0Q29uY2x1c2lvbmVzOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbn07XG5cbi8vIEtlZXBzIGRldGFpbCBoeWRyYXRpb24gb3JjaGVzdHJhdGlvbiBvdXRzaWRlIHRoZSBwYWdlIGNvbXBvbmVudC5cbmV4cG9ydCBjb25zdCB1c2VEZXRhaWxIeWRyYXRpb24gPSAoe1xuICBhY3RpdmlkYWRJZCxcbiAgc2hvdWxkSHlkcmF0ZSxcbiAgdmlzaXRUeXBlcyxcbiAgYXNpc3RlbnRlVGlwb3MsXG4gIGRlZmF1bHRWaXNpdFR5cGUsXG4gIGluaXRpYWxBc2lzdGVudGUsXG4gIG5vcm1hbGl6ZURhdGVUb0lucHV0LFxuICBtYXRjaE9wdGlvblZhbHVlLFxuICBhcHBseURyYWZ0VmFsdWVzLFxuICBhcHBseVRleHRFZGl0b3JWYWx1ZXMsXG4gIHNldFN0YXR1cyxcbiAgc2V0SXNIeWRyYXRpbmcsXG4gIHNldFRyYW5zRGF0ZSxcbiAgc2V0VmlzaXRUeXBlLFxuICBzZXRBc2lzdGVudGVUaXBvLFxuICBzZXREZXNjcmlwdGlvbixcbiAgc2V0Q29tZW50YXJpb3MsXG4gIHNldEFudGVjZWRlbnRlcyxcbiAgc2V0Q29uY2x1c2lvbmVzLFxufTogVXNlRGV0YWlsSHlkcmF0aW9uQXJncykgPT4ge1xuICBjb25zdCBoeWRyYXRlRnJvbUFwaSA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcbiAgICBpZiAoIWFjdGl2aWRhZElkKSByZXR1cm47XG4gICAgc2V0SXNIeWRyYXRpbmcodHJ1ZSk7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoSnNvbjxBY3Rpdml0eURldGFpbFJlc3BvbnNlPihgL1Zpc2l0YXMvR2V0QWN0aXZpdHlCeUNvZGU/Y29kZT0ke2VuY29kZVVSSUNvbXBvbmVudChhY3RpdmlkYWRJZCl9YCk7XG4gICAgICBjb25zdCByZXNwb25zZURhdGEgPSBnZXRSZXNwb25zZURhdGEocmVzKTtcblxuICAgICAgaWYgKCFpc1Jlc3BvbnNlU3VjY2VzcyhyZXMpIHx8ICFyZXNwb25zZURhdGEpIHtcbiAgICAgICAgc2V0U3RhdHVzKGdldFJlc3BvbnNlTWVzc2FnZShyZXMpIHx8IGluZFQoXCJWaXNpdHNfRGV0YWlsX0xvYWRBY3Rpdml0eUZhaWxlZFwiLCBcIkZhaWxlZCB0byBsb2FkIGFjdGl2aXR5IGRldGFpbHMuXCIpKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCByYXdEYXRlID0gU3RyaW5nKHJlc3BvbnNlRGF0YS50cmFuc0RhdGUgPz8gcmVzcG9uc2VEYXRhLlRyYW5zRGF0ZSA/PyBcIlwiKTtcbiAgICAgIHNldFRyYW5zRGF0ZShub3JtYWxpemVEYXRlVG9JbnB1dChyYXdEYXRlKSk7XG5cbiAgICAgIGNvbnN0IHJhd1Zpc2l0VHlwZSA9IFN0cmluZyhcbiAgICAgICAgcmVzcG9uc2VEYXRhLnRpcG9WaXNpdGEgPz8gcmVzcG9uc2VEYXRhLlRpcG9WaXNpdGEgPz8gcmVzcG9uc2VEYXRhLnZpc2l0VHlwZSA/PyByZXNwb25zZURhdGEuVmlzaXRUeXBlID8/IFwiXCJcbiAgICAgICk7XG4gICAgICBzZXRWaXNpdFR5cGUobWF0Y2hPcHRpb25WYWx1ZSh2aXNpdFR5cGVzLCByYXdWaXNpdFR5cGUpIHx8IGRlZmF1bHRWaXNpdFR5cGUpO1xuXG4gICAgICBjb25zdCBhc2lzdGVudGVzTGlzdCA9IHJlc3BvbnNlRGF0YS5hc2lzdGVudGVzID8/IHJlc3BvbnNlRGF0YS5Bc2lzdGVudGVzO1xuICAgICAgY29uc3QgZmlyc3RBc2lzdGVudGUgPSBBcnJheS5pc0FycmF5KGFzaXN0ZW50ZXNMaXN0KSAmJiBhc2lzdGVudGVzTGlzdC5sZW5ndGggPyBhc1JlY29yZChhc2lzdGVudGVzTGlzdFswXSkgOiBudWxsO1xuICAgICAgY29uc3QgcmF3QXNpc3RlbnRlVGlwbyA9IFN0cmluZyhcbiAgICAgICAgcmVzcG9uc2VEYXRhLmFzaXN0ZW50ZVRpcG8gPz9cbiAgICAgICAgICByZXNwb25zZURhdGEuQXNpc3RlbnRlVGlwbyA/P1xuICAgICAgICAgIGZpcnN0QXNpc3RlbnRlPy5hc2lzdGVudGVUaXBvID8/XG4gICAgICAgICAgZmlyc3RBc2lzdGVudGU/LkFzaXN0ZW50ZVRpcG8gPz9cbiAgICAgICAgICBcIlwiXG4gICAgICApO1xuICAgICAgY29uc3Qgbm9ybWFsaXplZEFzaXN0ZW50ZVRpcG8gPSBtYXRjaE9wdGlvblZhbHVlKGFzaXN0ZW50ZVRpcG9zLCByYXdBc2lzdGVudGVUaXBvKTtcbiAgICAgIHNldEFzaXN0ZW50ZVRpcG8obm9ybWFsaXplZEFzaXN0ZW50ZVRpcG8gfHwgaW5pdGlhbEFzaXN0ZW50ZSk7XG4gICAgICBzZXREZXNjcmlwdGlvbihTdHJpbmcocmVzcG9uc2VEYXRhLmRlc2NyaXB0aW9uID8/IHJlc3BvbnNlRGF0YS5EZXNjcmlwdGlvbiA/PyBcIlwiKSk7XG4gICAgICBzZXRDb21lbnRhcmlvcyhTdHJpbmcocmVzcG9uc2VEYXRhLmNvbWVudGFyaW9zID8/IHJlc3BvbnNlRGF0YS5Db21lbnRhcmlvcyA/PyBcIlwiKSk7XG4gICAgICBzZXRBbnRlY2VkZW50ZXMoU3RyaW5nKHJlc3BvbnNlRGF0YS5hbnRlY2VkZW50ZXMgPz8gcmVzcG9uc2VEYXRhLkFudGVjZWRlbnRlcyA/PyBcIlwiKSk7XG4gICAgICBzZXRDb25jbHVzaW9uZXMoU3RyaW5nKHJlc3BvbnNlRGF0YS5jb25jbHVzaW9uZXMgPz8gcmVzcG9uc2VEYXRhLkNvbmNsdXNpb25lcyA/PyBcIlwiKSk7XG4gICAgfSBjYXRjaCB7XG4gICAgICAvLyBLZWVwIHByZXZpb3VzIFVJIGJlaGF2aW9yIG9uIGh5ZHJhdGlvbiBlcnJvcnMuXG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldElzSHlkcmF0aW5nKGZhbHNlKTtcbiAgICAgIGFwcGx5RHJhZnRWYWx1ZXMoKTtcbiAgICAgIGFwcGx5VGV4dEVkaXRvclZhbHVlcygpO1xuICAgIH1cbiAgfSwgW1xuICAgIGFjdGl2aWRhZElkLFxuICAgIGFwcGx5RHJhZnRWYWx1ZXMsXG4gICAgYXBwbHlUZXh0RWRpdG9yVmFsdWVzLFxuICAgIGFzaXN0ZW50ZVRpcG9zLFxuICAgIGRlZmF1bHRWaXNpdFR5cGUsXG4gICAgaW5pdGlhbEFzaXN0ZW50ZSxcbiAgICBtYXRjaE9wdGlvblZhbHVlLFxuICAgIG5vcm1hbGl6ZURhdGVUb0lucHV0LFxuICAgIHNldEFudGVjZWRlbnRlcyxcbiAgICBzZXRBc2lzdGVudGVUaXBvLFxuICAgIHNldENvbWVudGFyaW9zLFxuICAgIHNldENvbmNsdXNpb25lcyxcbiAgICBzZXREZXNjcmlwdGlvbixcbiAgICBzZXRJc0h5ZHJhdGluZyxcbiAgICBzZXRTdGF0dXMsXG4gICAgc2V0VHJhbnNEYXRlLFxuICAgIHNldFZpc2l0VHlwZSxcbiAgICB2aXNpdFR5cGVzLFxuICBdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChzaG91bGRIeWRyYXRlKSB7XG4gICAgICBoeWRyYXRlRnJvbUFwaSgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBhcHBseURyYWZ0VmFsdWVzKCk7XG4gICAgYXBwbHlUZXh0RWRpdG9yVmFsdWVzKCk7XG4gIH0sIFthcHBseURyYWZ0VmFsdWVzLCBhcHBseVRleHRFZGl0b3JWYWx1ZXMsIGh5ZHJhdGVGcm9tQXBpLCBzaG91bGRIeWRyYXRlXSk7XG59O1xuIiwgImltcG9ydCB7IHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgd2FpdCB9IGZyb20gXCIuLi91dGlscy93YWl0LnRzXCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB7IHNob3dQZXJtaXNzaW9uTW9kYWwgfSBmcm9tIFwiLi4vdXRpbHMvcGVybWlzc2lvbnMudHNcIjtcbmltcG9ydCB7IHNldEhpc3RvcnlGaWx0ZXJGb3JEYXRlLCBmbGFzaEFjdGlvbk1hcmsgfSBmcm9tIFwiLi4vdXRpbHMvdmlzaXRhc0hpc3RvcnkudHNcIjtcbmltcG9ydCB7IHNldFRvcGJhckFjdGlvbkdyb3VwUmVhZHkgfSBmcm9tIFwiLi4vdXRpbHMvdG9wYmFyQWN0aW9uVmlzaWJpbGl0eS50c1wiO1xuXG50eXBlIFVzZURldGFpbFRvcGJhckFjdGlvbnNBcmdzID0ge1xuICBidXN5OiBib29sZWFuO1xuICBtb2RhbE9wZW46IGJvb2xlYW47XG4gIGlzRWRpdGluZzogYm9vbGVhbjtcbiAgY2FuRWRpdEhpc3Rvcnk6IGJvb2xlYW47XG4gIGNhbkRlbGV0ZUhpc3Rvcnk6IGJvb2xlYW47XG4gIHRyYW5zRGF0ZTogc3RyaW5nO1xuICBzZXRNb2RhbEVycm9yOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgaGFuZGxlRW5hYmxlRWRpdDogKCkgPT4gdm9pZDtcbiAgaGFuZGxlQ2FuY2VsRWRpdDogKCkgPT4gdm9pZDtcbiAgaGFuZGxlVXBkYXRlOiAoKSA9PiBQcm9taXNlPGJvb2xlYW4+O1xuICBoYW5kbGVEZWxldGU6ICgpID0+IFByb21pc2U8Ym9vbGVhbj47XG4gIGFjdGlvbkdyb3VwSWQ/OiBzdHJpbmc7XG4gIHBlcm1pc3Npb25zUmVhZHk/OiBib29sZWFuO1xuICBvcGVuQ29uZmlybTogKG9wdHM6IHtcbiAgICB0aXRsZTogc3RyaW5nO1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICBjb25maXJtVGV4dD86IHN0cmluZztcbiAgICBvbkNvbmZpcm0/OiAoKSA9PiBQcm9taXNlPGJvb2xlYW4gfCB2b2lkPiB8IGJvb2xlYW4gfCB2b2lkO1xuICB9KSA9PiB2b2lkO1xuICBjbG9zZUNvbmZpcm06ICgpID0+IHZvaWQ7XG59O1xuXG4vLyBDb29yZGluYXRlcyB0b3BiYXIgaWNvbiB2aXNpYmlsaXR5IGFuZCBhY3Rpb24gZXZlbnRzIGZvciBkZXRhaWwgcGFnZS5cbmV4cG9ydCBjb25zdCB1c2VEZXRhaWxUb3BiYXJBY3Rpb25zID0gKHtcbiAgYnVzeSxcbiAgbW9kYWxPcGVuLFxuICBpc0VkaXRpbmcsXG4gIGNhbkVkaXRIaXN0b3J5LFxuICBjYW5EZWxldGVIaXN0b3J5LFxuICB0cmFuc0RhdGUsXG4gIHNldE1vZGFsRXJyb3IsXG4gIGhhbmRsZUVuYWJsZUVkaXQsXG4gIGhhbmRsZUNhbmNlbEVkaXQsXG4gIGhhbmRsZVVwZGF0ZSxcbiAgaGFuZGxlRGVsZXRlLFxuICBhY3Rpb25Hcm91cElkID0gXCJ2aXNpdC1kZXRhaWwtYWN0aW9uc1wiLFxuICBwZXJtaXNzaW9uc1JlYWR5ID0gdHJ1ZSxcbiAgb3BlbkNvbmZpcm0sXG4gIGNsb3NlQ29uZmlybSxcbn06IFVzZURldGFpbFRvcGJhckFjdGlvbnNBcmdzKSA9PiB7XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFwZXJtaXNzaW9uc1JlYWR5KSByZXR1cm47XG5cbiAgICBjb25zdCBlZGl0SWNvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlzaXRFZGl0SWNvblwiKTtcbiAgICBjb25zdCBzYXZlSWNvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlzaXRTYXZlSWNvblwiKTtcbiAgICBjb25zdCBkZWxldGVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpc2l0RGVsZXRlQnRuXCIpO1xuICAgIGNvbnN0IGNhbmNlbEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlzaXRDYW5jZWxCdG5cIik7XG4gICAgY29uc3QgZWRpdEJ0biA9IGVkaXRJY29uPy5jbG9zZXN0KFwiYnV0dG9uXCIpID8/IG51bGw7XG4gICAgaWYgKGlzRWRpdGluZykge1xuICAgICAgaWYgKGVkaXRCdG4pIGVkaXRCdG4uY2xhc3NMaXN0LnJlbW92ZShcInRvcGJhci1oaWRkZW5cIik7XG4gICAgICBpZiAoZWRpdEljb24pIGVkaXRJY29uLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICBpZiAoc2F2ZUljb24pIHNhdmVJY29uLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gICAgICBpZiAoZGVsZXRlQnRuKSBkZWxldGVCdG4uY2xhc3NMaXN0LmFkZChcInRvcGJhci1oaWRkZW5cIik7XG4gICAgICBpZiAoY2FuY2VsQnRuKSBjYW5jZWxCdG4uY2xhc3NMaXN0LnJlbW92ZShcInRvcGJhci1oaWRkZW5cIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChlZGl0QnRuKSBlZGl0QnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJ0b3BiYXItaGlkZGVuXCIpO1xuICAgICAgaWYgKGVkaXRJY29uKSBlZGl0SWNvbi5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICAgICAgaWYgKHNhdmVJY29uKSBzYXZlSWNvbi5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgaWYgKGRlbGV0ZUJ0bikgZGVsZXRlQnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJ0b3BiYXItaGlkZGVuXCIpO1xuICAgICAgaWYgKGNhbmNlbEJ0bikgY2FuY2VsQnRuLmNsYXNzTGlzdC5hZGQoXCJ0b3BiYXItaGlkZGVuXCIpO1xuICAgIH1cblxuICAgIHNldFRvcGJhckFjdGlvbkdyb3VwUmVhZHkoYWN0aW9uR3JvdXBJZCk7XG4gIH0sIFthY3Rpb25Hcm91cElkLCBpc0VkaXRpbmcsIHBlcm1pc3Npb25zUmVhZHldKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghcGVybWlzc2lvbnNSZWFkeSkgcmV0dXJuO1xuXG4gICAgY29uc3Qgb25FZGl0ID0gKCkgPT4ge1xuICAgICAgaWYgKCFjYW5FZGl0SGlzdG9yeSkge1xuICAgICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChpc0VkaXRpbmcpIHtcbiAgICAgICAgaWYgKGJ1c3kgfHwgbW9kYWxPcGVuKSByZXR1cm47XG4gICAgICAgIHNldE1vZGFsRXJyb3IoXCJcIik7XG4gICAgICAgIG9wZW5Db25maXJtKHtcbiAgICAgICAgICB0aXRsZTogaW5kVChcIlZpc2l0c19EZXRhaWxfU2F2ZUNoYW5nZXNfVGl0bGVcIiwgXCJWaXNpdHNfRGV0YWlsX1NhdmVDaGFuZ2VzX1RpdGxlXCIpLFxuICAgICAgICAgIG1lc3NhZ2U6IGluZFQoXCJWaXNpdHNfRGV0YWlsX1NhdmVDaGFuZ2VzX0JvZHlcIiwgXCJWaXNpdHNfRGV0YWlsX1NhdmVDaGFuZ2VzX0JvZHlcIiksXG4gICAgICAgICAgY29uZmlybVRleHQ6IGluZFQoXCJDb21tb25fU2F2ZVwiLCBcIkNvbW1vbl9TYXZlXCIpLFxuICAgICAgICAgIG9uQ29uZmlybTogYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgb2sgPSBhd2FpdCBoYW5kbGVVcGRhdGUoKTtcbiAgICAgICAgICAgIGlmIChvaykge1xuICAgICAgICAgICAgICBjbG9zZUNvbmZpcm0oKTtcbiAgICAgICAgICAgICAgc2V0SGlzdG9yeUZpbHRlckZvckRhdGUodHJhbnNEYXRlKTtcbiAgICAgICAgICAgICAgYXdhaXQgd2FpdCgyMDApO1xuICAgICAgICAgICAgICBmbGFzaEFjdGlvbk1hcmsoXCJva1Byb2Nlc3NcIiwgMTIwMCk7XG4gICAgICAgICAgICAgIGF3YWl0IHdhaXQoMTIwMCk7XG4gICAgICAgICAgICAgIHdpbmRvdy5fX2luZEJ5cGFzc05hdmlnYXRpb25HdWFyZE9uY2U/LigpO1xuICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL0hpc3RvcmlhbC9IaXN0b3J5XCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gb2s7XG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBoYW5kbGVFbmFibGVFZGl0KCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IG9uRGVsZXRlID0gKCkgPT4ge1xuICAgICAgaWYgKCFjYW5EZWxldGVIaXN0b3J5KSB7XG4gICAgICAgIHNob3dQZXJtaXNzaW9uTW9kYWwoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKGJ1c3kgfHwgbW9kYWxPcGVuKSByZXR1cm47XG4gICAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xuICAgICAgb3BlbkNvbmZpcm0oe1xuICAgICAgICB0aXRsZTogaW5kVChcIlZpc2l0c19EZXRhaWxfRGVsZXRlQWN0aXZpdHlfVGl0bGVcIiwgXCJWaXNpdHNfRGV0YWlsX0RlbGV0ZUFjdGl2aXR5X1RpdGxlXCIpLFxuICAgICAgICBtZXNzYWdlOiBpbmRUKFwiVmlzaXRzX0RldGFpbF9EZWxldGVBY3Rpdml0eV9Cb2R5XCIsIFwiVmlzaXRzX0RldGFpbF9EZWxldGVBY3Rpdml0eV9Cb2R5XCIpLFxuICAgICAgICBjb25maXJtVGV4dDogaW5kVChcIkNvbW1vbl9EZWxldGVcIiwgXCJDb21tb25fRGVsZXRlXCIpLFxuICAgICAgICBvbkNvbmZpcm06IGFzeW5jICgpID0+IHtcbiAgICAgICAgICBjb25zdCBvayA9IGF3YWl0IGhhbmRsZURlbGV0ZSgpO1xuICAgICAgICAgIGlmIChvaykge1xuICAgICAgICAgICAgY2xvc2VDb25maXJtKCk7XG4gICAgICAgICAgICBzZXRIaXN0b3J5RmlsdGVyRm9yRGF0ZSh0cmFuc0RhdGUpO1xuICAgICAgICAgICAgYXdhaXQgd2FpdCgyMDApO1xuICAgICAgICAgICAgZmxhc2hBY3Rpb25NYXJrKFwib2tEZWxQcm9jZXNzXCIsIDEyMDApO1xuICAgICAgICAgICAgYXdhaXQgd2FpdCgxMjAwKTtcbiAgICAgICAgICAgIHdpbmRvdy5fX2luZEJ5cGFzc05hdmlnYXRpb25HdWFyZE9uY2U/LigpO1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9IaXN0b3JpYWwvSGlzdG9yeVwiO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gb2s7XG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgY29uc3Qgb25DYW5jZWxFZGl0ID0gKCkgPT4ge1xuICAgICAgaWYgKGJ1c3kgfHwgbW9kYWxPcGVuKSByZXR1cm47XG4gICAgICBoYW5kbGVDYW5jZWxFZGl0KCk7XG4gICAgfTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwidmlzaXQtZWRpdFwiLCBvbkVkaXQpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwidmlzaXQtZGVsZXRlXCIsIG9uRGVsZXRlKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInZpc2l0LWNhbmNlbC1lZGl0XCIsIG9uQ2FuY2VsRWRpdCk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwidmlzaXQtZWRpdFwiLCBvbkVkaXQpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ2aXNpdC1kZWxldGVcIiwgb25EZWxldGUpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ2aXNpdC1jYW5jZWwtZWRpdFwiLCBvbkNhbmNlbEVkaXQpO1xuICAgIH07XG4gIH0sIFtcbiAgICBidXN5LFxuICAgIGNhbkRlbGV0ZUhpc3RvcnksXG4gICAgY2FuRWRpdEhpc3RvcnksXG4gICAgY2xvc2VDb25maXJtLFxuICAgIGhhbmRsZUNhbmNlbEVkaXQsXG4gICAgaGFuZGxlRGVsZXRlLFxuICAgIGhhbmRsZUVuYWJsZUVkaXQsXG4gICAgaGFuZGxlVXBkYXRlLFxuICAgIGlzRWRpdGluZyxcbiAgICBtb2RhbE9wZW4sXG4gICAgb3BlbkNvbmZpcm0sXG4gICAgcGVybWlzc2lvbnNSZWFkeSxcbiAgICBzZXRNb2RhbEVycm9yLFxuICAgIHRyYW5zRGF0ZSxcbiAgXSk7XG59O1xuIiwgIlx1RkVGRmltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGdldFNlc3Npb25WYWx1ZVdpdGhFeHBpcnksIHJlbW92ZVNlc3Npb25WYWx1ZVdpdGhFeHBpcnksIHNldFNlc3Npb25WYWx1ZVdpdGhFeHBpcnkgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvc2Vzc2lvbkV4cGlyeS50c1wiO1xuXG5jb25zdCBFRElUX01PREVfVFRMX01TID0gNiAqIDYwICogNjAgKiAxMDAwO1xuY29uc3QgREVUQUlMX0RSQUZUX1RUTF9NUyA9IDI0ICogNjAgKiA2MCAqIDEwMDA7XG5cbnR5cGUgVXNlRGV0YWlsRWRpdFNlc3Npb25BcmdzID0ge1xuICBhY3RpdmlkYWRJZDogc3RyaW5nO1xuICByZWNJZDogc3RyaW5nO1xuICBjYW5FZGl0SGlzdG9yeTogYm9vbGVhbjtcbiAgaXNFZGl0aW5nOiBib29sZWFuO1xuICBzZXRJc0VkaXRpbmc6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPGJvb2xlYW4+PjtcbiAgdHJhbnNEYXRlOiBzdHJpbmc7XG4gIHZpc2l0VHlwZTogc3RyaW5nO1xuICBhc2lzdGVudGVUaXBvOiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIGNvbWVudGFyaW9zOiBzdHJpbmc7XG4gIGFudGVjZWRlbnRlczogc3RyaW5nO1xuICBjb25jbHVzaW9uZXM6IHN0cmluZztcbiAgc2V0VHJhbnNEYXRlOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcbiAgc2V0VmlzaXRUeXBlOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcbiAgc2V0QXNpc3RlbnRlVGlwbzogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XG4gIHNldERlc2NyaXB0aW9uOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcbiAgc2V0Q29tZW50YXJpb3M6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPHN0cmluZz4+O1xuICBzZXRBbnRlY2VkZW50ZXM6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPHN0cmluZz4+O1xuICBzZXRDb25jbHVzaW9uZXM6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPHN0cmluZz4+O1xufTtcblxudHlwZSBEZXRhaWxEcmFmdFZhbHVlcyA9IHtcbiAgdHJhbnNEYXRlOiBzdHJpbmc7XG4gIHZpc2l0VHlwZTogc3RyaW5nO1xuICBhc2lzdGVudGVUaXBvOiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIGNvbWVudGFyaW9zOiBzdHJpbmc7XG4gIGFudGVjZWRlbnRlczogc3RyaW5nO1xuICBjb25jbHVzaW9uZXM6IHN0cmluZztcbn07XG5cbi8vIE1hbmFnZXMgZWRpdC1tb2RlIHNlc3Npb24gZmxhZ3MgYW5kIGRldGFpbCBkcmFmdCBwZXJzaXN0ZW5jZS5cbmV4cG9ydCBjb25zdCB1c2VEZXRhaWxFZGl0U2Vzc2lvbiA9ICh7XG4gIGFjdGl2aWRhZElkLFxuICByZWNJZCxcbiAgY2FuRWRpdEhpc3RvcnksXG4gIGlzRWRpdGluZyxcbiAgc2V0SXNFZGl0aW5nLFxuICB0cmFuc0RhdGUsXG4gIHZpc2l0VHlwZSxcbiAgYXNpc3RlbnRlVGlwbyxcbiAgZGVzY3JpcHRpb24sXG4gIGNvbWVudGFyaW9zLFxuICBhbnRlY2VkZW50ZXMsXG4gIGNvbmNsdXNpb25lcyxcbiAgc2V0VHJhbnNEYXRlLFxuICBzZXRWaXNpdFR5cGUsXG4gIHNldEFzaXN0ZW50ZVRpcG8sXG4gIHNldERlc2NyaXB0aW9uLFxuICBzZXRDb21lbnRhcmlvcyxcbiAgc2V0QW50ZWNlZGVudGVzLFxuICBzZXRDb25jbHVzaW9uZXMsXG59OiBVc2VEZXRhaWxFZGl0U2Vzc2lvbkFyZ3MpID0+IHtcbiAgY29uc3QgZWRpdE1vZGVLZXlSZWYgPSB1c2VSZWYoXCJcIik7XG4gIGNvbnN0IGRyYWZ0S2V5UmVmID0gdXNlUmVmKFwiXCIpO1xuICBjb25zdCBkcmFmdFBlcnNpc3RUaW1lclJlZiA9IHVzZVJlZjxudW1iZXIgfCBudWxsPihudWxsKTtcblxuICAvLyBQZXJzaXN0IGVkaXQgbW9kZSB3aGlsZSB1c2VyIG5hdmlnYXRlcyB0byB0aGUgdGV4dCBlZGl0b3IgYW5kIGJhY2suXG4gIGNvbnN0IHN5bmNFZGl0TW9kZUZsYWcgPSB1c2VDYWxsYmFjaygoZW5hYmxlZDogYm9vbGVhbikgPT4ge1xuICAgIGNvbnN0IGtleSA9IGVkaXRNb2RlS2V5UmVmLmN1cnJlbnQ7XG4gICAgaWYgKCFrZXkpIHJldHVybjtcbiAgICBpZiAoZW5hYmxlZCkge1xuICAgICAgc2V0U2Vzc2lvblZhbHVlV2l0aEV4cGlyeShrZXksIFwidHJ1ZVwiLCBFRElUX01PREVfVFRMX01TKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmVtb3ZlU2Vzc2lvblZhbHVlV2l0aEV4cGlyeShrZXkpO1xuICB9LCBbXSk7XG5cbiAgY29uc3Qgc3luY0VkaXRNb2RlT25FbnRyeSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBjb25zdCBiYXNlSWQgPSBhY3RpdmlkYWRJZCB8fCByZWNJZCB8fCBcImRlZmF1bHRcIjtcbiAgICBjb25zdCBrZXkgPSBgaW5kX3Zpc2l0X2VkaXRfJHtiYXNlSWR9YDtcbiAgICBjb25zdCByZXR1cm5LZXkgPSBgJHtrZXl9X3JldHVybmA7XG4gICAgY29uc3QgZHJhZnRLZXkgPSBgaW5kX3Zpc2l0X2RyYWZ0XyR7YmFzZUlkfWA7XG4gICAgZWRpdE1vZGVLZXlSZWYuY3VycmVudCA9IGtleTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCBhbGxvd1Jlc3RvcmUgPSBnZXRTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KHJldHVybktleSkgPT09IFwiMVwiO1xuICAgICAgaWYgKGFsbG93UmVzdG9yZSkge1xuICAgICAgICByZW1vdmVTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KHJldHVybktleSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChjYW5FZGl0SGlzdG9yeSAmJiBhbGxvd1Jlc3RvcmUgJiYgZ2V0U2Vzc2lvblZhbHVlV2l0aEV4cGlyeShrZXkpID09PSBcInRydWVcIikge1xuICAgICAgICBzZXRJc0VkaXRpbmcodHJ1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZXRJc0VkaXRpbmcoZmFsc2UpO1xuICAgICAgICByZW1vdmVTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KGtleSk7XG4gICAgICAgIHJlbW92ZVNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoZHJhZnRLZXkpO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWNhbkVkaXRIaXN0b3J5KSB7XG4gICAgICAgIHJlbW92ZVNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoa2V5KTtcbiAgICAgICAgcmVtb3ZlU2Vzc2lvblZhbHVlV2l0aEV4cGlyeShkcmFmdEtleSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCB7XG4gICAgICAvKiBpZ25vcmUgKi9cbiAgICB9XG4gIH0sIFthY3RpdmlkYWRJZCwgY2FuRWRpdEhpc3RvcnksIHJlY0lkLCBzZXRJc0VkaXRpbmddKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHN5bmNFZGl0TW9kZU9uRW50cnkoKTtcbiAgfSwgW3N5bmNFZGl0TW9kZU9uRW50cnldKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IG9uUGFnZVNob3cgPSAoZXZlbnQ6IFBhZ2VUcmFuc2l0aW9uRXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IG5hdkVudHJ5ID0gdHlwZW9mIHBlcmZvcm1hbmNlICE9PSBcInVuZGVmaW5lZFwiICYmIHBlcmZvcm1hbmNlLmdldEVudHJpZXNCeVR5cGVcbiAgICAgICAgPyAocGVyZm9ybWFuY2UuZ2V0RW50cmllc0J5VHlwZShcIm5hdmlnYXRpb25cIilbMF0gYXMgUGVyZm9ybWFuY2VOYXZpZ2F0aW9uVGltaW5nIHwgdW5kZWZpbmVkKVxuICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICAgIGNvbnN0IGlzQmFja0ZvcndhcmQgPSBuYXZFbnRyeT8udHlwZSA9PT0gXCJiYWNrX2ZvcndhcmRcIjtcbiAgICAgIGlmIChldmVudD8ucGVyc2lzdGVkIHx8IGlzQmFja0ZvcndhcmQpIHtcbiAgICAgICAgc3luY0VkaXRNb2RlT25FbnRyeSgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInBhZ2VzaG93XCIsIG9uUGFnZVNob3cpO1xuICAgIHJldHVybiAoKSA9PiB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInBhZ2VzaG93XCIsIG9uUGFnZVNob3cpO1xuICB9LCBbc3luY0VkaXRNb2RlT25FbnRyeV0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3Qga2V5ID0gYGluZF92aXNpdF9kcmFmdF8ke2FjdGl2aWRhZElkIHx8IHJlY0lkIHx8IFwiZGVmYXVsdFwifWA7XG4gICAgZHJhZnRLZXlSZWYuY3VycmVudCA9IGtleTtcbiAgfSwgW2FjdGl2aWRhZElkLCByZWNJZF0pO1xuXG4gIGNvbnN0IHNhdmVEcmFmdCA9IHVzZUNhbGxiYWNrKChkcmFmdDogRGV0YWlsRHJhZnRWYWx1ZXMpID0+IHtcbiAgICBjb25zdCBrZXkgPSBkcmFmdEtleVJlZi5jdXJyZW50O1xuICAgIGlmICgha2V5KSByZXR1cm47XG4gICAgc2V0U2Vzc2lvblZhbHVlV2l0aEV4cGlyeShrZXksIEpTT04uc3RyaW5naWZ5KGRyYWZ0KSwgREVUQUlMX0RSQUZUX1RUTF9NUyk7XG4gIH0sIFtdKTtcblxuICBjb25zdCBjbGVhckRyYWZ0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGNvbnN0IGtleSA9IGRyYWZ0S2V5UmVmLmN1cnJlbnQ7XG4gICAgaWYgKCFrZXkpIHJldHVybjtcbiAgICByZW1vdmVTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KGtleSk7XG4gIH0sIFtdKTtcblxuICBjb25zdCBhcHBseURyYWZ0VmFsdWVzID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGNvbnN0IGtleSA9IGRyYWZ0S2V5UmVmLmN1cnJlbnQ7XG4gICAgaWYgKCFrZXkpIHJldHVybjtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCByYXcgPSBnZXRTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KGtleSk7XG4gICAgICBpZiAoIXJhdykgcmV0dXJuO1xuICAgICAgY29uc3QgZHJhZnQgPSBKU09OLnBhcnNlKHJhdykgYXMgUGFydGlhbDxEZXRhaWxEcmFmdFZhbHVlcz47XG4gICAgICBpZiAoIWRyYWZ0IHx8IHR5cGVvZiBkcmFmdCAhPT0gXCJvYmplY3RcIikgcmV0dXJuO1xuXG4gICAgICBpZiAoZHJhZnQudHJhbnNEYXRlICE9PSB1bmRlZmluZWQpIHNldFRyYW5zRGF0ZShTdHJpbmcoZHJhZnQudHJhbnNEYXRlKSk7XG4gICAgICBpZiAoZHJhZnQudmlzaXRUeXBlICE9PSB1bmRlZmluZWQpIHNldFZpc2l0VHlwZShTdHJpbmcoZHJhZnQudmlzaXRUeXBlKSk7XG4gICAgICBpZiAoZHJhZnQuYXNpc3RlbnRlVGlwbyAhPT0gdW5kZWZpbmVkKSBzZXRBc2lzdGVudGVUaXBvKFN0cmluZyhkcmFmdC5hc2lzdGVudGVUaXBvKSk7XG4gICAgICBpZiAoZHJhZnQuZGVzY3JpcHRpb24gIT09IHVuZGVmaW5lZCkgc2V0RGVzY3JpcHRpb24oU3RyaW5nKGRyYWZ0LmRlc2NyaXB0aW9uKSk7XG4gICAgICBpZiAoZHJhZnQuY29tZW50YXJpb3MgIT09IHVuZGVmaW5lZCkgc2V0Q29tZW50YXJpb3MoU3RyaW5nKGRyYWZ0LmNvbWVudGFyaW9zKSk7XG4gICAgICBpZiAoZHJhZnQuYW50ZWNlZGVudGVzICE9PSB1bmRlZmluZWQpIHNldEFudGVjZWRlbnRlcyhTdHJpbmcoZHJhZnQuYW50ZWNlZGVudGVzKSk7XG4gICAgICBpZiAoZHJhZnQuY29uY2x1c2lvbmVzICE9PSB1bmRlZmluZWQpIHNldENvbmNsdXNpb25lcyhTdHJpbmcoZHJhZnQuY29uY2x1c2lvbmVzKSk7XG4gICAgfSBjYXRjaCB7XG4gICAgICAvKiBpZ25vcmUgKi9cbiAgICB9XG4gIH0sIFtzZXRBbnRlY2VkZW50ZXMsIHNldEFzaXN0ZW50ZVRpcG8sIHNldENvbWVudGFyaW9zLCBzZXRDb25jbHVzaW9uZXMsIHNldERlc2NyaXB0aW9uLCBzZXRUcmFuc0RhdGUsIHNldFZpc2l0VHlwZV0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFpc0VkaXRpbmcpIHtcbiAgICAgIGlmIChkcmFmdFBlcnNpc3RUaW1lclJlZi5jdXJyZW50KSB7XG4gICAgICAgIGNsZWFyVGltZW91dChkcmFmdFBlcnNpc3RUaW1lclJlZi5jdXJyZW50KTtcbiAgICAgICAgZHJhZnRQZXJzaXN0VGltZXJSZWYuY3VycmVudCA9IG51bGw7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGRyYWZ0UGVyc2lzdFRpbWVyUmVmLmN1cnJlbnQpIHtcbiAgICAgIGNsZWFyVGltZW91dChkcmFmdFBlcnNpc3RUaW1lclJlZi5jdXJyZW50KTtcbiAgICB9XG5cbiAgICBkcmFmdFBlcnNpc3RUaW1lclJlZi5jdXJyZW50ID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgZHJhZnRQZXJzaXN0VGltZXJSZWYuY3VycmVudCA9IG51bGw7XG4gICAgICBzYXZlRHJhZnQoe1xuICAgICAgICB0cmFuc0RhdGUsXG4gICAgICAgIHZpc2l0VHlwZSxcbiAgICAgICAgYXNpc3RlbnRlVGlwbyxcbiAgICAgICAgZGVzY3JpcHRpb24sXG4gICAgICAgIGNvbWVudGFyaW9zLFxuICAgICAgICBhbnRlY2VkZW50ZXMsXG4gICAgICAgIGNvbmNsdXNpb25lcyxcbiAgICAgIH0pO1xuICAgIH0sIDE4MCk7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgaWYgKGRyYWZ0UGVyc2lzdFRpbWVyUmVmLmN1cnJlbnQpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KGRyYWZ0UGVyc2lzdFRpbWVyUmVmLmN1cnJlbnQpO1xuICAgICAgICBkcmFmdFBlcnNpc3RUaW1lclJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9O1xuICB9LCBbYW50ZWNlZGVudGVzLCBhc2lzdGVudGVUaXBvLCBjb21lbnRhcmlvcywgY29uY2x1c2lvbmVzLCBkZXNjcmlwdGlvbiwgaXNFZGl0aW5nLCBzYXZlRHJhZnQsIHRyYW5zRGF0ZSwgdmlzaXRUeXBlXSk7XG5cbiAgcmV0dXJuIHtcbiAgICBlZGl0TW9kZUtleVJlZixcbiAgICBzeW5jRWRpdE1vZGVGbGFnLFxuICAgIGNsZWFyRHJhZnQsXG4gICAgYXBwbHlEcmFmdFZhbHVlcyxcbiAgfTtcbn07XHJcbiIsICJcdUZFRkZpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2sgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGZldGNoSnNvbiB9IGZyb20gXCIuLi8uLi8uLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB7IHNob3dQZXJtaXNzaW9uTW9kYWwgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvcGVybWlzc2lvbnMudHNcIjtcbmltcG9ydCB7IGZsYXNoQWN0aW9uTWFyayB9IGZyb20gXCIuLi8uLi8uLi91dGlscy92aXNpdGFzSGlzdG9yeS50c1wiO1xuXG50eXBlIE9wdGlvbkxpa2UgPSB7XG4gIHZhbHVlPzogc3RyaW5nIHwgbnVtYmVyO1xuICBWYWx1ZT86IHN0cmluZyB8IG51bWJlcjtcbiAgdGV4dD86IHN0cmluZztcbiAgVGV4dD86IHN0cmluZztcbn07XG5cbnR5cGUgVmlzaXRDb21tYW5kUmVzcG9uc2UgPSB7XG4gIHN1Y2Nlc3M/OiBib29sZWFuO1xuICBtZXNzYWdlPzogc3RyaW5nO1xuICBTdWNjZXNzPzogYm9vbGVhbjtcbiAgTWVzc2FnZT86IHN0cmluZztcbn07XG5cbmNvbnN0IGlzQ29tbWFuZFN1Y2Nlc3MgPSAocmVzcG9uc2U6IFZpc2l0Q29tbWFuZFJlc3BvbnNlKTogYm9vbGVhbiA9PiB7XG4gIHJldHVybiByZXNwb25zZS5zdWNjZXNzID09PSB0cnVlIHx8IHJlc3BvbnNlLlN1Y2Nlc3MgPT09IHRydWU7XG59O1xuXG5jb25zdCBnZXRDb21tYW5kTWVzc2FnZSA9IChyZXNwb25zZTogVmlzaXRDb21tYW5kUmVzcG9uc2UpOiBzdHJpbmcgPT4ge1xuICBjb25zdCByYXcgPSByZXNwb25zZS5tZXNzYWdlID8/IHJlc3BvbnNlLk1lc3NhZ2U7XG4gIHJldHVybiB0eXBlb2YgcmF3ID09PSBcInN0cmluZ1wiID8gcmF3LnRyaW0oKSA6IFwiXCI7XG59O1xuXG4vLyBLZWVwIHJlY0lkIGFzIGEgbm9ybWFsaXplZCBzaWduZWQgaW50ZWdlciBzdHJpbmcgdG8gYXZvaWQgbG9uZyBwcmVjaXNpb24gbG9zcyBpbiBKUyBudW1iZXJzLlxuY29uc3QgcmVzb2x2ZVNhZmVSZWNJZCA9IChyYXdSZWNJZDogc3RyaW5nKTogc3RyaW5nIHwgbnVsbCA9PiB7XG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSBTdHJpbmcocmF3UmVjSWQgPz8gXCJcIikudHJpbSgpO1xuICBpZiAoIW5vcm1hbGl6ZWQpIHJldHVybiBudWxsO1xuXG4gIGlmICghL14tP1xcZCskLy50ZXN0KG5vcm1hbGl6ZWQpKSByZXR1cm4gbnVsbDtcblxuICBjb25zdCBhYnNvbHV0ZURpZ2l0cyA9IG5vcm1hbGl6ZWQuc3RhcnRzV2l0aChcIi1cIikgPyBub3JtYWxpemVkLnNsaWNlKDEpIDogbm9ybWFsaXplZDtcbiAgaWYgKCFhYnNvbHV0ZURpZ2l0cyB8fCAvXjArJC8udGVzdChhYnNvbHV0ZURpZ2l0cykpIHJldHVybiBudWxsO1xuXG4gIHJldHVybiBub3JtYWxpemVkO1xufTtcblxuY29uc3Qgc2hvdWxkTG9nUmVjSWRJbkRldiA9ICgpOiBib29sZWFuID0+IHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIgfHwgIXdpbmRvdy5sb2NhdGlvbikgcmV0dXJuIGZhbHNlO1xuICBjb25zdCBob3N0ID0gU3RyaW5nKHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZSB8fCBcIlwiKS50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgcmV0dXJuIGhvc3QgPT09IFwibG9jYWxob3N0XCIgfHwgaG9zdCA9PT0gXCIxMjcuMC4wLjFcIiB8fCBob3N0LmVuZHNXaXRoKFwiLmxvY2FsXCIpO1xufTtcblxuY29uc3QgbG9nU2FmZVJlY0lkSW5EZXYgPSAob3BlcmF0aW9uOiBcInVwZGF0ZVwiIHwgXCJkZWxldGVcIiwgc2FmZVJlY0lkOiBzdHJpbmcpOiB2b2lkID0+IHtcbiAgaWYgKCFzaG91bGRMb2dSZWNJZEluRGV2KCkpIHJldHVybjtcbiAgY29uc29sZS5pbmZvKGBbdmlzaXRhcy1kZXRhaWxdICR7b3BlcmF0aW9ufSByZWNJZGAsIHNhZmVSZWNJZCk7XG59O1xuXG50eXBlIFVzZURldGFpbE11dGF0aW9uc0FyZ3MgPSB7XG4gIGJ1c3k6IGJvb2xlYW47XG4gIGlzRWRpdGluZzogYm9vbGVhbjtcbiAgY2FuRWRpdEhpc3Rvcnk6IGJvb2xlYW47XG4gIGNhbkRlbGV0ZUhpc3Rvcnk6IGJvb2xlYW47XG4gIHJlY0lkOiBzdHJpbmc7XG4gIGFjY291bnROdW06IHN0cmluZztcbiAgdHJhbnNEYXRlOiBzdHJpbmc7XG4gIHZpc2l0VHlwZTogc3RyaW5nO1xuICBhc2lzdGVudGVUaXBvOiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIGNvbWVudGFyaW9zOiBzdHJpbmc7XG4gIGFudGVjZWRlbnRlczogc3RyaW5nO1xuICBjb25jbHVzaW9uZXM6IHN0cmluZztcbiAgdmlzaXRUeXBlczogT3B0aW9uTGlrZVtdO1xuICBhc2lzdGVudGVUaXBvczogT3B0aW9uTGlrZVtdO1xuICBkZWZhdWx0VmlzaXRUeXBlOiBzdHJpbmc7XG4gIHJhd0luaXRpYWxWaXNpdFR5cGU6IHN0cmluZztcbiAgcmF3SW5pdGlhbEFzaXN0ZW50ZTogc3RyaW5nO1xuICBtYXRjaE9wdGlvblZhbHVlOiAob3B0aW9uczogT3B0aW9uTGlrZVtdLCByYXc6IHVua25vd24pID0+IHN0cmluZztcbiAgY2xlYXJEcmFmdDogKCkgPT4gdm9pZDtcbiAgc3luY0VkaXRNb2RlRmxhZzogKGVuYWJsZWQ6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHNldE1vZGFsRXJyb3I6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPHN0cmluZz4+O1xuICBzZXRCdXN5OiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxib29sZWFuPj47XG4gIHNldFN0YXR1czogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XG4gIHNldElzRWRpdGluZzogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248Ym9vbGVhbj4+O1xufTtcblxuLy8gRW5jYXBzdWxhdGVzIHVwZGF0ZSBhbmQgZGVsZXRlIG11dGF0aW9ucyBmb3IgZGV0YWlsIGZvcm0gc3RhdGUuXG5leHBvcnQgY29uc3QgdXNlRGV0YWlsTXV0YXRpb25zID0gKHtcbiAgYnVzeSxcbiAgaXNFZGl0aW5nLFxuICBjYW5FZGl0SGlzdG9yeSxcbiAgY2FuRGVsZXRlSGlzdG9yeSxcbiAgcmVjSWQsXG4gIGFjY291bnROdW0sXG4gIHRyYW5zRGF0ZSxcbiAgdmlzaXRUeXBlLFxuICBhc2lzdGVudGVUaXBvLFxuICBkZXNjcmlwdGlvbixcbiAgY29tZW50YXJpb3MsXG4gIGFudGVjZWRlbnRlcyxcbiAgY29uY2x1c2lvbmVzLFxuICB2aXNpdFR5cGVzLFxuICBhc2lzdGVudGVUaXBvcyxcbiAgZGVmYXVsdFZpc2l0VHlwZSxcbiAgcmF3SW5pdGlhbFZpc2l0VHlwZSxcbiAgcmF3SW5pdGlhbEFzaXN0ZW50ZSxcbiAgbWF0Y2hPcHRpb25WYWx1ZSxcbiAgY2xlYXJEcmFmdCxcbiAgc3luY0VkaXRNb2RlRmxhZyxcbiAgc2V0TW9kYWxFcnJvcixcbiAgc2V0QnVzeSxcbiAgc2V0U3RhdHVzLFxuICBzZXRJc0VkaXRpbmcsXG59OiBVc2VEZXRhaWxNdXRhdGlvbnNBcmdzKSA9PiB7XG4gIGNvbnN0IGhhbmRsZVVwZGF0ZSA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcbiAgICBpZiAoYnVzeSB8fCAhaXNFZGl0aW5nKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKCFjYW5FZGl0SGlzdG9yeSkge1xuICAgICAgc2hvd1Blcm1pc3Npb25Nb2RhbCgpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IHNhZmVSZWNJZFZhbHVlID0gcmVzb2x2ZVNhZmVSZWNJZChyZWNJZCk7XG4gICAgaWYgKHNhZmVSZWNJZFZhbHVlID09PSBudWxsKSB7XG4gICAgICBjb25zdCBtZXNzYWdlID0gaW5kVChcIlZpc2l0c19EZXRhaWxfSW52YWxpZFJlY0lkXCIsIFwiQ291bGQgbm90IHJlc29sdmUgYWN0aXZpdHkgaWRlbnRpZmllci4gUmVsb2FkIGFuZCB0cnkgYWdhaW4uXCIpO1xuICAgICAgc2V0TW9kYWxFcnJvcihtZXNzYWdlKTtcbiAgICAgIHNldFN0YXR1cyhtZXNzYWdlKTtcbiAgICAgIGZsYXNoQWN0aW9uTWFyayhcImVycm9yUHJvY2Vzc1wiLCAxNTAwKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xuICAgIHNldEJ1c3kodHJ1ZSk7XG4gICAgc2V0U3RhdHVzKGluZFQoXCJWaXNpdHNfRGV0YWlsX1VwZGF0aW5nXCIsIFwiVXBkYXRpbmcgYWN0aXZpdHkuLi5cIikpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRWaXNpdFR5cGUgPVxuICAgICAgICBtYXRjaE9wdGlvblZhbHVlKHZpc2l0VHlwZXMsIHZpc2l0VHlwZSkgfHxcbiAgICAgICAgbWF0Y2hPcHRpb25WYWx1ZSh2aXNpdFR5cGVzLCByYXdJbml0aWFsVmlzaXRUeXBlKSB8fFxuICAgICAgICBkZWZhdWx0VmlzaXRUeXBlO1xuICAgICAgY29uc3Qgbm9ybWFsaXplZEFzaXN0ZW50ZVRpcG8gPVxuICAgICAgICBtYXRjaE9wdGlvblZhbHVlKGFzaXN0ZW50ZVRpcG9zLCBhc2lzdGVudGVUaXBvKSB8fFxuICAgICAgICBtYXRjaE9wdGlvblZhbHVlKGFzaXN0ZW50ZVRpcG9zLCByYXdJbml0aWFsQXNpc3RlbnRlKSB8fFxuICAgICAgICByYXdJbml0aWFsQXNpc3RlbnRlO1xuXG4gICAgICBjb25zdCBwYXlsb2FkID0ge1xuICAgICAgICBhY2NvdW50TnVtLFxuICAgICAgICB2aXNpdFR5cGU6IG5vcm1hbGl6ZWRWaXNpdFR5cGUsXG4gICAgICAgIGFzaXN0ZW50ZVRpcG86IG5vcm1hbGl6ZWRBc2lzdGVudGVUaXBvLFxuICAgICAgICBkZXNjcmlwdGlvbixcbiAgICAgICAgdHJhbnNEYXRlLFxuICAgICAgICBjb21lbnRhcmlvcyxcbiAgICAgICAgYW50ZWNlZGVudGVzLFxuICAgICAgICBjb25jbHVzaW9uZXMsXG4gICAgICB9O1xuXG4gICAgICBsb2dTYWZlUmVjSWRJbkRldihcInVwZGF0ZVwiLCBzYWZlUmVjSWRWYWx1ZSk7XG4gICAgICBjb25zdCBzYWZlUmVjSWQgPSBlbmNvZGVVUklDb21wb25lbnQoc2FmZVJlY0lkVmFsdWUpO1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248VmlzaXRDb21tYW5kUmVzcG9uc2U+KGAvVmlzaXRhcy9VcGRhdGVBY3Rpdml0eS8ke3NhZmVSZWNJZH1gLCB7XG4gICAgICAgIG1ldGhvZDogXCJQVVRcIixcbiAgICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXlsb2FkKSxcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoIWlzQ29tbWFuZFN1Y2Nlc3MocmVzcG9uc2UpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihnZXRDb21tYW5kTWVzc2FnZShyZXNwb25zZSkgfHwgaW5kVChcIlZpc2l0c19EZXRhaWxfVXBkYXRlRmFpbGVkXCIsIFwiVXBkYXRlIGZhaWxlZC5cIikpO1xuICAgICAgfVxuXG4gICAgICBzZXRTdGF0dXMoaW5kVChcIlZpc2l0c19EZXRhaWxfVXBkYXRlZFwiLCBcIkFjdGl2aXR5IHVwZGF0ZWRcIikpO1xuICAgICAgc2V0SXNFZGl0aW5nKGZhbHNlKTtcbiAgICAgIHN5bmNFZGl0TW9kZUZsYWcoZmFsc2UpO1xuICAgICAgY2xlYXJEcmFmdCgpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBlcnJvciBpbnN0YW5jZW9mIEVycm9yICYmIGVycm9yLm1lc3NhZ2VcbiAgICAgICAgPyBlcnJvci5tZXNzYWdlXG4gICAgICAgIDogaW5kVChcIlZpc2l0c19EZXRhaWxfVXBkYXRlRXJyb3JcIiwgXCJVcGRhdGUgZXJyb3IuXCIpO1xuICAgICAgc2V0TW9kYWxFcnJvcihtZXNzYWdlKTtcbiAgICAgIHNldFN0YXR1cyhtZXNzYWdlKTtcbiAgICAgIGZsYXNoQWN0aW9uTWFyayhcImVycm9yUHJvY2Vzc1wiLCAxNTAwKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0QnVzeShmYWxzZSk7XG4gICAgfVxuICB9LCBbXG4gICAgYWNjb3VudE51bSxcbiAgICBhbnRlY2VkZW50ZXMsXG4gICAgYXNpc3RlbnRlVGlwbyxcbiAgICBhc2lzdGVudGVUaXBvcyxcbiAgICBidXN5LFxuICAgIGNhbkVkaXRIaXN0b3J5LFxuICAgIGNsZWFyRHJhZnQsXG4gICAgY29tZW50YXJpb3MsXG4gICAgY29uY2x1c2lvbmVzLFxuICAgIGRlZmF1bHRWaXNpdFR5cGUsXG4gICAgZGVzY3JpcHRpb24sXG4gICAgaXNFZGl0aW5nLFxuICAgIG1hdGNoT3B0aW9uVmFsdWUsXG4gICAgcmF3SW5pdGlhbEFzaXN0ZW50ZSxcbiAgICByYXdJbml0aWFsVmlzaXRUeXBlLFxuICAgIHJlY0lkLFxuICAgIHNldEJ1c3ksXG4gICAgc2V0SXNFZGl0aW5nLFxuICAgIHNldE1vZGFsRXJyb3IsXG4gICAgc2V0U3RhdHVzLFxuICAgIHN5bmNFZGl0TW9kZUZsYWcsXG4gICAgdHJhbnNEYXRlLFxuICAgIHZpc2l0VHlwZSxcbiAgICB2aXNpdFR5cGVzLFxuICBdKTtcblxuICBjb25zdCBoYW5kbGVEZWxldGUgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XG4gICAgaWYgKGJ1c3kpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoIWNhbkRlbGV0ZUhpc3RvcnkpIHtcbiAgICAgIHNob3dQZXJtaXNzaW9uTW9kYWwoKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBzYWZlUmVjSWRWYWx1ZSA9IHJlc29sdmVTYWZlUmVjSWQocmVjSWQpO1xuICAgIGlmIChzYWZlUmVjSWRWYWx1ZSA9PT0gbnVsbCkge1xuICAgICAgY29uc3QgbWVzc2FnZSA9IGluZFQoXCJWaXNpdHNfRGV0YWlsX0ludmFsaWRSZWNJZFwiLCBcIkNvdWxkIG5vdCByZXNvbHZlIGFjdGl2aXR5IGlkZW50aWZpZXIuIFJlbG9hZCBhbmQgdHJ5IGFnYWluLlwiKTtcbiAgICAgIHNldE1vZGFsRXJyb3IobWVzc2FnZSk7XG4gICAgICBzZXRTdGF0dXMobWVzc2FnZSk7XG4gICAgICBmbGFzaEFjdGlvbk1hcmsoXCJlcnJvclByb2Nlc3NcIiwgMTUwMCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgc2V0TW9kYWxFcnJvcihcIlwiKTtcbiAgICBzZXRCdXN5KHRydWUpO1xuICAgIHNldFN0YXR1cyhpbmRUKFwiVmlzaXRzX0RldGFpbF9EZWxldGluZ1wiLCBcIkRlbGV0aW5nIGFjdGl2aXR5Li4uXCIpKTtcblxuICAgIHRyeSB7XG4gICAgICBsb2dTYWZlUmVjSWRJbkRldihcImRlbGV0ZVwiLCBzYWZlUmVjSWRWYWx1ZSk7XG4gICAgICBjb25zdCBzYWZlUmVjSWQgPSBlbmNvZGVVUklDb21wb25lbnQoc2FmZVJlY0lkVmFsdWUpO1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248VmlzaXRDb21tYW5kUmVzcG9uc2U+KGAvVmlzaXRhcy9EZWxldGVBY3Rpdml0eS8ke3NhZmVSZWNJZH1gLCB7IG1ldGhvZDogXCJERUxFVEVcIiB9KTtcbiAgICAgIGlmICghaXNDb21tYW5kU3VjY2VzcyhyZXNwb25zZSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGdldENvbW1hbmRNZXNzYWdlKHJlc3BvbnNlKSB8fCBpbmRUKFwiVmlzaXRzX0RldGFpbF9EZWxldGVGYWlsZWRcIiwgXCJEZWxldGUgZmFpbGVkLlwiKSk7XG4gICAgICB9XG5cbiAgICAgIHNldFN0YXR1cyhpbmRUKFwiVmlzaXRzX0RldGFpbF9EZWxldGVkXCIsIFwiQWN0aXZpdHkgZGVsZXRlZFwiKSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc3QgbWVzc2FnZSA9IGVycm9yIGluc3RhbmNlb2YgRXJyb3IgJiYgZXJyb3IubWVzc2FnZVxuICAgICAgICA/IGVycm9yLm1lc3NhZ2VcbiAgICAgICAgOiBpbmRUKFwiVmlzaXRzX0RldGFpbF9EZWxldGVFcnJvclwiLCBcIkRlbGV0ZSBlcnJvci5cIik7XG4gICAgICBzZXRNb2RhbEVycm9yKG1lc3NhZ2UpO1xuICAgICAgc2V0U3RhdHVzKG1lc3NhZ2UpO1xuICAgICAgZmxhc2hBY3Rpb25NYXJrKFwiZXJyb3JQcm9jZXNzXCIsIDE1MDApO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRCdXN5KGZhbHNlKTtcbiAgICB9XG4gIH0sIFtidXN5LCBjYW5EZWxldGVIaXN0b3J5LCByZWNJZCwgc2V0QnVzeSwgc2V0TW9kYWxFcnJvciwgc2V0U3RhdHVzXSk7XG5cbiAgcmV0dXJuIHtcbiAgICBoYW5kbGVVcGRhdGUsXG4gICAgaGFuZGxlRGVsZXRlLFxuICB9O1xufTtcclxuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBEZXRhaWxGb3JtIGZyb20gXCIuL0RldGFpbEZvcm0udHN4XCI7XG5pbXBvcnQgVmlzaXRhc1BhZ2VQcm92aWRlcnMgZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9WaXNpdGFzUGFnZVByb3ZpZGVycy50c3hcIjtcbmltcG9ydCB7IG1vdW50UmVhY3RJc2xhbmQsIG1vdW50V2hlbkRvY3VtZW50UmVhZHkgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvcmVhY3RJc2xhbmQudHN4XCI7XG5cbi8vIFBhZ2UgZW50cnkgZm9yIHRoZSB2aXNpdGFzIGRldGFpbCBpc2xhbmQuXG5jb25zdCBEZXRhaWxQYWdlID0gKCkgPT4ge1xuICByZXR1cm4gKFxuICAgIDxWaXNpdGFzUGFnZVByb3ZpZGVycz5cbiAgICAgIDxEZXRhaWxGb3JtIC8+XG4gICAgPC9WaXNpdGFzUGFnZVByb3ZpZGVycz5cbiAgKTtcbn07XG5cbmNvbnN0IG1vdW50ID0gKCkgPT4ge1xuICBjb25zdCByb290RWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpc2l0YS1kZXRhaWwtcm9vdFwiKTtcbiAgaWYgKCFyb290RWwpIHJldHVybjtcblxuICBtb3VudFJlYWN0SXNsYW5kKHJvb3RFbCwgPERldGFpbFBhZ2UgLz4pO1xufTtcblxubW91bnRXaGVuRG9jdW1lbnRSZWFkeShtb3VudCk7XG5cbmV4cG9ydCBkZWZhdWx0IERldGFpbFBhZ2U7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUFBLGdCQUF5RTs7O0FDQWxFLElBQU0sb0JBQW9CLENBQUMsT0FBMkI7QUFDM0QsTUFBSSxDQUFDLEdBQUksUUFBTyxNQUFNO0FBQUEsRUFBQztBQUN2QixRQUFNLFNBQVMsQ0FBQyxVQUFpQixNQUFNLGVBQWU7QUFDdEQsUUFBTSxTQUFTLENBQUMsZUFBZSxlQUFlLFFBQVEsT0FBTyxPQUFPO0FBQ3BFLFNBQU8sUUFBUSxDQUFDLFFBQVEsR0FBRyxpQkFBaUIsS0FBSyxNQUFNLENBQUM7QUFDeEQsU0FBTyxNQUFNO0FBQ1gsV0FBTyxRQUFRLENBQUMsUUFBUSxHQUFHLG9CQUFvQixLQUFLLE1BQU0sQ0FBQztBQUFBLEVBQzdEO0FBQ0Y7OztBQ1JPLElBQU0sV0FBVyxD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QUE0QixNQUFNO0FBQUEsZ0JBQzlDLE9BQU87QUFBQSxnQkFDUCxVQUFVO0FBQUEsZ0JBQ1YsVUFBVSxDQUFDO0FBQUEsZ0JBQ1gsVUFBVSxDQUFDO0FBQUE7QUFBQSxZQUNiLEdBQ0Y7QUFBQSxZQUNBO0FBQUEsY0FBQztBQUFBO0FBQUEsZ0JBQ0MsT0FBTyxLQUFLLGlDQUFpQyxZQUFZO0FBQUEsZ0JBQ3pELFNBQVM7QUFBQSxnQkFDVCxPQUFPO0FBQUEsZ0JBQ1AsVUFBVTtBQUFBLGdCQUNWLGFBQWEsS0FBSyx1Q0FBdUMsYUFBYTtBQUFBLGdCQUN0RSxVQUFVLENBQUM7QUFBQSxnQkFDWCxVQUFVLENBQUM7QUFBQSxnQkFDWCxXQUFXO0FBQUE7QUFBQSxZQUNiO0FBQUEsYUFDRjtBQUFBLFVBRUE7QUFBQSxZQUFDO0FBQUE7QUFBQSxjQUNDO0FBQUEsY0FDQSxrQkFBa0I7QUFBQSxjQUNsQixzQkFBc0I7QUFBQSxjQUN0QixxQkFBcUIsQ0FBQztBQUFBLGNBQ3RCLHFCQUFxQjtBQUFBLGNBQ3JCLFdBQVc7QUFBQSxnQkFDVDtBQUFBLGtCQUNFLElBQUk7QUFBQSxrQkFDSixPQUFPO0FBQUEsa0JBQ1AsT0FBTztBQUFBLGtCQUNQLFdBQVc7QUFBQSxrQkFDWCxpQkFBaUI7QUFBQSxnQkFDbkI7QUFBQSxnQkFDQTtBQUFBLGtCQUNFLElBQUk7QUFBQSxrQkFDSixPQUFPO0FBQUEsa0JBQ1AsT0FBTztBQUFBLGtCQUNQLFdBQVc7QUFBQSxrQkFDWCxpQkFBaUI7QUFBQSxnQkFDbkI7QUFBQSxnQkFDQTtBQUFBLGtCQUNFLElBQUk7QUFBQSxrQkFDSixPQUFPO0FBQUEsa0JBQ1AsT0FBTztBQUFBLGtCQUNQLFdBQVc7QUFBQSxrQkFDWCxpQkFBaUI7QUFBQSxnQkFDbkI7QUFBQSxjQUNGO0FBQUE7QUFBQSxVQUNGO0FBQUEsVUFFQSw0Q0FBQyxTQUFJLFdBQVUsa0RBQ2Isc0RBQUMsVUFBTSxrQkFBTyxHQUNoQjtBQUFBO0FBQUE7QUFBQSxJQUNGO0FBQUEsS0FDRjtBQUVKO0FBR2UsU0FBUixhQUE4QjtBQUNuQyxTQUNFLDRDQUFDLDRCQUFpQixpQkFBaUIsS0FBSywrQkFBK0IsMEVBQTBFLEdBQy9JLHNEQUFDLGFBQVUsR0FDYjtBQUVKOzs7QU96Z0JNLElBQUFDLHNCQUFBO0FBSE4sSUFBTSxhQUFhLE1BQU07QUFDdkIsU0FDRSw2Q0FBQyxnQ0FDQyx1REFBQyxjQUFXLEdBQ2Q7QUFFSjtBQUVBLElBQU0sUUFBUSxNQUFNO0FBQ2xCLFFBQU0sU0FBUyxTQUFTLGVBQWUsb0JBQW9CO0FBQzNELE1BQUksQ0FBQyxPQUFRO0FBRWIsbUJBQWlCLFFBQVEsNkNBQUMsY0FBVyxDQUFFO0FBQ3pDO0FBRUEsdUJBQXVCLEtBQUs7QUFFNUIsSUFBTyxxQkFBUTsiLAogICJuYW1lcyI6IFsiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSJdCn0K
