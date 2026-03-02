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
import {
  SingleDatePicker
} from "./chunks/chunk-BUCWWYD3.js";
import {
  ConfirmModal,
  useConfirmDialog,
  wait
} from "./chunks/chunk-BHDPGFB4.js";
import {
  flashActionMark,
  setHistoryFilterForDate
} from "./chunks/chunk-K7MECJ5E.js";
import {
  SelectCombobox_default,
  VisitasPageProviders_default
} from "./chunks/chunk-SSLPNLGX.js";
import {
  Spinner_default,
  canAccess,
  classNames,
  fetchJson,
  indT,
  showPermissionModal
} from "./chunks/chunk-CEAHDJRV.js";
import "./chunks/chunk-QO7GVWVB.js";
import {
  getSessionValueWithExpiry,
  removeSessionValueWithExpiry,
  setSessionValueWithExpiry
} from "./chunks/chunk-7SKLSV7K.js";
import {
  mountReactIsland,
  mountWhenDocumentReady,
  require_jsx_runtime,
  require_react
} from "./chunks/chunk-BWM3JLWG.js";
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
  openConfirm,
  closeConfirm
}) => {
  (0, import_react2.useEffect)(() => {
    const editIcon = document.getElementById("visitEditIcon");
    const saveIcon = document.getElementById("visitSaveIcon");
    const deleteBtn = document.getElementById("visitDeleteBtn");
    const cancelBtn = document.getElementById("visitCancelBtn");
    if (!editIcon || !saveIcon) return;
    if (isEditing) {
      editIcon.classList.add("hidden");
      saveIcon.classList.remove("hidden");
      if (deleteBtn) deleteBtn.classList.add("topbar-hidden");
      if (cancelBtn) cancelBtn.classList.remove("topbar-hidden");
    } else {
      editIcon.classList.remove("hidden");
      saveIcon.classList.add("hidden");
      if (deleteBtn) deleteBtn.classList.remove("topbar-hidden");
      if (cancelBtn) cancelBtn.classList.add("topbar-hidden");
    }
  }, [isEditing]);
  (0, import_react2.useEffect)(() => {
    const onEdit = () => {
      if (!canEditHistory) {
        showPermissionModal();
        return;
      }
      if (isEditing) {
        if (busy || modalOpen) return;
        setModalError("");
        openConfirm({
          title: indT("Visits_Detail_SaveChanges_Title", "Save changes"),
          message: indT("Visits_Detail_SaveChanges_Body", "Do you want to save changes?"),
          confirmText: indT("Common_Save", "Save"),
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
        title: indT("Visits_Detail_DeleteActivity_Title", "Delete activity"),
        message: indT("Visits_Detail_DeleteActivity_Body", "Do you want to delete this activity?"),
        confirmText: indT("Common_Delete", "Delete"),
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
      const safeRecId = encodeURIComponent(recId);
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
    setModalError("");
    setBusy(true);
    setStatus(indT("Visits_Detail_Deleting", "Deleting activity..."));
    try {
      const safeRecId = encodeURIComponent(recId);
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
  const activityRecId = String(
    detail.recId || detail.RecId || detail.refRecIdActividad || detail.RefRecIdActividad || detail.actividadRecId || detail.ActividadRecId || ""
  ).trim();
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
  const recId = String(detail.recId ?? detail.RecId ?? "");
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
    defaultConfirmText: indT("Confirm_Yes", "OK"),
    defaultCancelText: indT("Confirm_No", "Cancel")
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
  const modalLoadingText = indT("Common_Loading", "Loading");
  const modalCancelText = modal.cancelText || indT("Confirm_No", "Cancel");
  const modalConfirmText = busy ? modalLoadingText : !busy && modalError ? indT("Common_OK", "OK") : modal.confirmText || indT("Confirm_Yes", "OK");
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvZGV0YWlsL0RldGFpbEZvcm0udHN4IiwgIi4uL3JlYWN0L3NyYy91dGlscy9kb21HdWFyZHMudHMiLCAiLi4vcmVhY3Qvc3JjL3V0aWxzL3N0cmluZ3MudHMiLCAiLi4vcmVhY3Qvc3JjL2hvb2tzL3VzZURldGFpbEh5ZHJhdGlvbi50cyIsICIuLi9yZWFjdC9zcmMvaG9va3MvdXNlRGV0YWlsVG9wYmFyQWN0aW9ucy50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9kZXRhaWwvdXNlRGV0YWlsRWRpdFNlc3Npb24udHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvZGV0YWlsL3VzZURldGFpbE11dGF0aW9ucy50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9kZXRhaWwvRGV0YWlsUGFnZS50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZUNhbGxiYWNrLCB1c2VNZW1vIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgU2luZ2xlRGF0ZVBpY2tlciBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NpbmdsZURhdGVQaWNrZXIudHN4XCI7XG5pbXBvcnQgQ29uZmlybU1vZGFsIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvQ29uZmlybU1vZGFsLnRzeFwiO1xuaW1wb3J0IFNlbGVjdENvbWJvYm94IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvU2VsZWN0Q29tYm9ib3gudHN4XCI7XG5pbXBvcnQgQXBwRXJyb3JCb3VuZGFyeSBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0FwcEVycm9yQm91bmRhcnkudHN4XCI7XG5pbXBvcnQgeyB1c2VWaXNpdGFzIH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZVZpc2l0YXMudHNcIjtcbmltcG9ydCBTcGlubmVyIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvU3Bpbm5lci50c3hcIjtcbmltcG9ydCBWaXNpdE5hcnJhdGl2ZUZpZWxkcyBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy92aXNpdGFzL1Zpc2l0TmFycmF0aXZlRmllbGRzLnRzeFwiO1xuaW1wb3J0IHsgY2xhc3NOYW1lcyB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9jbGFzc05hbWVzLnRzXCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB7IGNhbkFjY2Vzcywgc2hvd1Blcm1pc3Npb25Nb2RhbCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9wZXJtaXNzaW9ucy50c1wiO1xuaW1wb3J0IHsgYmluZFJlYWRPbmx5R3VhcmQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvZG9tR3VhcmRzLnRzXCI7XG5pbXBvcnQgeyBoYXNWYWx1ZSB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9zdHJpbmdzLnRzXCI7XG5pbXBvcnQgeyBuYXZpZ2F0ZVRvVGV4dEVkaXRvckZpZWxkIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3RleHRFZGl0b3JOYXZpZ2F0aW9uLnRzXCI7XG5pbXBvcnQgeyBmbGFzaEFjdGlvbk1hcmsgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvdmlzaXRhc0hpc3RvcnkudHNcIjtcbmltcG9ydCB7IHNldFByZXZpZXdBbmNob3IsIHNob3dQcmV2aWV3VG9vbHRpcCwgaXNPdmVyZmxvd2luZyB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9wcmV2aWV3VG9vbHRpcC50c1wiO1xuaW1wb3J0IHsgdXNlVGFwR3VhcmQgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlVGFwR3VhcmQudHNcIjtcbmltcG9ydCB7IHVzZUNvbmZpcm1EaWFsb2cgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlQ29uZmlybURpYWxvZy50c1wiO1xuaW1wb3J0IHsgdXNlRGV0YWlsSHlkcmF0aW9uIH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZURldGFpbEh5ZHJhdGlvbi50c1wiO1xuaW1wb3J0IHsgdXNlRGV0YWlsVG9wYmFyQWN0aW9ucyB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VEZXRhaWxUb3BiYXJBY3Rpb25zLnRzXCI7XG5pbXBvcnQgeyB1c2VUZXh0RWRpdG9yRmllbGRzIH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZVRleHRFZGl0b3JGaWVsZHMudHNcIjtcbmltcG9ydCB7IHVzZURldGFpbEVkaXRTZXNzaW9uIH0gZnJvbSBcIi4vdXNlRGV0YWlsRWRpdFNlc3Npb24udHNcIjtcbmltcG9ydCB7IHVzZURldGFpbE11dGF0aW9ucyB9IGZyb20gXCIuL3VzZURldGFpbE11dGF0aW9ucy50c1wiO1xuXG5jb25zdCBFRElUT1JfUkVUVVJOX0ZMQUdfVFRMX01TID0gMiAqIDYwICogNjAgKiAxMDAwO1xuXG5jb25zdCBEZXRhaWxBcHAgPSAoKSA9PiB7XG4gIGNvbnN0IHsgdmlzaXRUeXBlcywgYXNpc3RlbnRlVGlwb3MgfSA9IHVzZVZpc2l0YXMoKTtcclxuICBjb25zdCBjYW5FZGl0SGlzdG9yeSA9IGNhbkFjY2VzcyhcIlZJU0lUQVNfSElTVE9SSUFMXCIsIFwiRWRpdFwiKTtcclxuICBjb25zdCBjYW5EZWxldGVIaXN0b3J5ID0gY2FuQWNjZXNzKFwiVklTSVRBU19ISVNUT1JJQUxcIiwgXCJGdWxsQWNjZXNzXCIpO1xyXG4gIHR5cGUgQWN0aXZpdHlEZXRhaWxQYXlsb2FkID0ge1xyXG4gICAgcmVjSWQ/OiBzdHJpbmcgfCBudW1iZXI7XHJcbiAgICBSZWNJZD86IHN0cmluZyB8IG51bWJlcjtcclxuICAgIHJlZlJlY0lkQWN0aXZpZGFkPzogc3RyaW5nIHwgbnVtYmVyO1xyXG4gICAgUmVmUmVjSWRBY3RpdmlkYWQ/OiBzdHJpbmcgfCBudW1iZXI7XHJcbiAgICBhY3RpdmlkYWRSZWNJZD86IHN0cmluZyB8IG51bWJlcjtcclxuICAgIEFjdGl2aWRhZFJlY0lkPzogc3RyaW5nIHwgbnVtYmVyO1xyXG4gICAgcmVhZE9ubHk/OiBib29sZWFuO1xyXG4gICAgYWxsb3dFZGl0PzogYm9vbGVhbjtcclxuICAgIGVkaXRNb2RlS2V5Pzogc3RyaW5nO1xyXG4gICAgW2tleTogc3RyaW5nXTogdW5rbm93bjtcclxuICB9O1xyXG5cclxuICBjb25zdCBkZXRhaWwgPSAod2luZG93Ll9fQUNUSVZJVFlfREVUQUlMX18gYXMgQWN0aXZpdHlEZXRhaWxQYXlsb2FkKSB8fCB7fTtcclxuXHJcbiAgY29uc3QgYWN0aXZpdHlSZWNJZCA9IFN0cmluZyhcclxuICAgIGRldGFpbC5yZWNJZCB8fFxyXG4gICAgICBkZXRhaWwuUmVjSWQgfHxcclxuICAgICAgZGV0YWlsLnJlZlJlY0lkQWN0aXZpZGFkIHx8XHJcbiAgICAgIGRldGFpbC5SZWZSZWNJZEFjdGl2aWRhZCB8fFxyXG4gICAgICBkZXRhaWwuYWN0aXZpZGFkUmVjSWQgfHxcclxuICAgICAgZGV0YWlsLkFjdGl2aWRhZFJlY0lkIHx8XHJcbiAgICAgIFwiXCJcclxuICApLnRyaW0oKTtcclxuXHJcbiAgY29uc3QgdGV4dEVkaXRvckJhc2VJZCA9IGFjdGl2aXR5UmVjSWQgPyBgVmlzaXRhLiR7YWN0aXZpdHlSZWNJZH1gIDogXCJWaXNpdGFcIjtcclxuICBjb25zdCBmaWVsZElkQ29tZW50YXJpb3MgPSBgJHt0ZXh0RWRpdG9yQmFzZUlkfS5Db21lbnRhcmlvc2A7XHJcbiAgY29uc3QgZmllbGRJZEFudGVjZWRlbnRlcyA9IGAke3RleHRFZGl0b3JCYXNlSWR9LkFudGVjZWRlbnRlc2A7XHJcbiAgY29uc3QgZmllbGRJZENvbmNsdXNpb25lcyA9IGAke3RleHRFZGl0b3JCYXNlSWR9LkNvbmNsdXNpb25lc2A7XHJcblxyXG4gIGNvbnN0IG5vcm1hbGl6ZURhdGVUb0lucHV0ID0gdXNlQ2FsbGJhY2soKHZhbHVlKSA9PiB7XHJcbiAgICBpZiAoIXZhbHVlKSByZXR1cm4gXCJcIjtcclxuICAgIGNvbnN0IHJhdyA9IFN0cmluZyh2YWx1ZSkudHJpbSgpO1xyXG4gICAgaWYgKCFyYXcpIHJldHVybiBcIlwiO1xyXG4gICAgLy8gQWxyZWFkeSB5eXl5LU1NLWRkXHJcbiAgICBpZiAoL15cXGR7NH0tXFxkezJ9LVxcZHsyfSQvLnRlc3QocmF3KSkgcmV0dXJuIHJhdztcclxuICAgIC8vIGRkLk1NLnl5eXkgb3IgZGQvTU0veXl5eVxyXG4gICAgaWYgKC9eXFxkezJ9Wy4vLV1cXGR7Mn1bLi8tXVxcZHs0fSQvLnRlc3QocmF3KSkge1xyXG4gICAgICBjb25zdCBwYXJ0cyA9IHJhdy5zcGxpdCgvWy4vLV0vKS5tYXAoKHApID0+IHBhcnNlSW50KHAsIDEwKSk7XHJcbiAgICAgIGlmIChwYXJ0cy5sZW5ndGggPT09IDMgJiYgIU51bWJlci5pc05hTihwYXJ0c1swXSkgJiYgIU51bWJlci5pc05hTihwYXJ0c1sxXSkgJiYgIU51bWJlci5pc05hTihwYXJ0c1syXSkpIHtcclxuICAgICAgICBjb25zdCBbZCwgbSwgeV0gPSBwYXJ0cztcclxuICAgICAgICBjb25zdCBtbSA9IFN0cmluZyhtKS5wYWRTdGFydCgyLCBcIjBcIik7XHJcbiAgICAgICAgY29uc3QgZGQgPSBTdHJpbmcoZCkucGFkU3RhcnQoMiwgXCIwXCIpO1xyXG4gICAgICAgIHJldHVybiBgJHt5fS0ke21tfS0ke2RkfWA7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbnN0IGR0ID0gbmV3IERhdGUocmF3KTtcclxuICAgIGlmICghTnVtYmVyLmlzTmFOKGR0LmdldFRpbWUoKSkpIHtcclxuICAgICAgY29uc3QgeXl5eSA9IGR0LmdldEZ1bGxZZWFyKCk7XHJcbiAgICAgIGNvbnN0IG1tID0gU3RyaW5nKGR0LmdldE1vbnRoKCkgKyAxKS5wYWRTdGFydCgyLCBcIjBcIik7XHJcbiAgICAgIGNvbnN0IGRkID0gU3RyaW5nKGR0LmdldERhdGUoKSkucGFkU3RhcnQoMiwgXCIwXCIpO1xyXG4gICAgICByZXR1cm4gYCR7eXl5eX0tJHttbX0tJHtkZH1gO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFwiXCI7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBtYXRjaE9wdGlvblZhbHVlID0gdXNlQ2FsbGJhY2soKG9wdGlvbnMsIHJhdykgPT4ge1xyXG4gICAgaWYgKHJhdyA9PSBudWxsKSByZXR1cm4gXCJcIjtcclxuICAgIGNvbnN0IHJhd1N0ciA9IFN0cmluZyhyYXcpLnRyaW0oKTtcclxuICAgIGlmICghcmF3U3RyKSByZXR1cm4gXCJcIjtcclxuXHJcbiAgICBjb25zdCBub3JtYWxpemVUZXh0ID0gKHMpID0+XHJcbiAgICAgIFN0cmluZyhzIHx8IFwiXCIpXHJcbiAgICAgICAgLnRvTG93ZXJDYXNlKClcclxuICAgICAgICAubm9ybWFsaXplKFwiTkZEXCIpXHJcbiAgICAgICAgLnJlcGxhY2UoL1tcXHUwMzAwLVxcdTAzNmZdL2csIFwiXCIpXHJcbiAgICAgICAgLnRyaW0oKTtcclxuXHJcbiAgICBjb25zdCByYXdOb3JtID0gbm9ybWFsaXplVGV4dChyYXdTdHIpO1xyXG4gICAgY29uc3QgYWx0Tm9ybSA9IHJhd05vcm0uZW5kc1dpdGgoXCJvXCIpID8gYCR7cmF3Tm9ybS5zbGljZSgwLCAtMSl9YWAgOiByYXdOb3JtO1xyXG5cclxuICAgIGNvbnN0IG1hdGNoID0gKG9wdGlvbnMgfHwgW10pLmZpbmQoKG8pID0+IHtcclxuICAgICAgY29uc3QgdmFsID0gU3RyaW5nKG8/LnZhbHVlID8/IG8/LlZhbHVlID8/IFwiXCIpLnRyaW0oKTtcclxuICAgICAgY29uc3QgdGV4dCA9IFN0cmluZyhvPy50ZXh0ID8/IG8/LlRleHQgPz8gXCJcIikudHJpbSgpO1xyXG4gICAgICBjb25zdCB0ZXh0Tm9ybSA9IG5vcm1hbGl6ZVRleHQodGV4dCk7XHJcbiAgICAgIHJldHVybiB2YWwgPT09IHJhd1N0ciB8fCB2YWwgPT09IHJhd05vcm0gfHwgdGV4dE5vcm0gPT09IHJhd05vcm0gfHwgdGV4dE5vcm0gPT09IGFsdE5vcm07XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBtYXRjaCA/IFN0cmluZyhtYXRjaC52YWx1ZSA/PyBtYXRjaC5WYWx1ZSA/PyByYXdTdHIpIDogcmF3U3RyO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgaW5pdGlhbFRyYW5zRGF0ZSA9IG5vcm1hbGl6ZURhdGVUb0lucHV0KFN0cmluZyhkZXRhaWwudHJhbnNEYXRlID8/IGRldGFpbC5UcmFuc0RhdGUgPz8gXCJcIikpO1xyXG4gIGNvbnN0IGRlZmF1bHRWaXNpdFR5cGUgPSBTdHJpbmcodmlzaXRUeXBlc1swXT8udmFsdWUgPz8gdmlzaXRUeXBlc1swXT8uVmFsdWUgPz8gXCJcIik7XG4gIGNvbnN0IHJhd0luaXRpYWxWaXNpdFR5cGUgPSBTdHJpbmcoXHJcbiAgICBkZXRhaWwudGlwb1Zpc2l0YSA/PyBkZXRhaWwuVGlwb1Zpc2l0YSA/PyBkZXRhaWwudmlzaXRUeXBlID8/IGRldGFpbC5WaXNpdFR5cGUgPz8gXCJcIlxyXG4gICk7XHJcbiAgY29uc3QgaW5pdGlhbFZpc2l0VHlwZSA9IG1hdGNoT3B0aW9uVmFsdWUodmlzaXRUeXBlcywgcmF3SW5pdGlhbFZpc2l0VHlwZSkgfHwgZGVmYXVsdFZpc2l0VHlwZTtcclxuICBjb25zdCByYXdJbml0aWFsQXNpc3RlbnRlID0gU3RyaW5nKFxyXG4gICAgZGV0YWlsLmFzaXN0ZW50ZVRpcG8gPz8gZGV0YWlsLkFzaXN0ZW50ZVRpcG8gPz8gKGFzaXN0ZW50ZVRpcG9zWzBdPy52YWx1ZSA/PyBhc2lzdGVudGVUaXBvc1swXT8uVmFsdWUgPz8gXCJcIilcclxuICApO1xyXG4gIGNvbnN0IGluaXRpYWxBc2lzdGVudGUgPSBtYXRjaE9wdGlvblZhbHVlKGFzaXN0ZW50ZVRpcG9zLCByYXdJbml0aWFsQXNpc3RlbnRlKSB8fCByYXdJbml0aWFsQXNpc3RlbnRlO1xyXG5cclxuICBjb25zdCBbdHJhbnNEYXRlLCBzZXRUcmFuc0RhdGVdID0gdXNlU3RhdGUoaW5pdGlhbFRyYW5zRGF0ZSk7XHJcbiAgY29uc3QgW3Zpc2l0VHlwZSwgc2V0VmlzaXRUeXBlXSA9IHVzZVN0YXRlKGluaXRpYWxWaXNpdFR5cGUpO1xyXG4gIGNvbnN0IFthc2lzdGVudGVUaXBvLCBzZXRBc2lzdGVudGVUaXBvXSA9IHVzZVN0YXRlKGluaXRpYWxBc2lzdGVudGUpO1xyXG4gIGNvbnN0IFtkZXNjcmlwdGlvbiwgc2V0RGVzY3JpcHRpb25dID0gdXNlU3RhdGUoU3RyaW5nKGRldGFpbC5kZXNjcmlwdGlvbiA/PyBkZXRhaWwuRGVzY3JpcHRpb24gPz8gXCJcIikpO1xyXG4gIGNvbnN0IFtjb21lbnRhcmlvcywgc2V0Q29tZW50YXJpb3NdID0gdXNlU3RhdGUoU3RyaW5nKGRldGFpbC5jb21lbnRhcmlvcyA/PyBkZXRhaWwuQ29tZW50YXJpb3MgPz8gXCJcIikpO1xyXG4gIGNvbnN0IFthbnRlY2VkZW50ZXMsIHNldEFudGVjZWRlbnRlc10gPSB1c2VTdGF0ZShTdHJpbmcoZGV0YWlsLmFudGVjZWRlbnRlcyA/PyBkZXRhaWwuQW50ZWNlZGVudGVzID8/IFwiXCIpKTtcclxuICBjb25zdCBbY29uY2x1c2lvbmVzLCBzZXRDb25jbHVzaW9uZXNdID0gdXNlU3RhdGUoU3RyaW5nKGRldGFpbC5jb25jbHVzaW9uZXMgPz8gZGV0YWlsLkNvbmNsdXNpb25lcyA/PyBcIlwiKSk7XHJcbiAgY29uc3QgW3N0YXR1cywgc2V0U3RhdHVzXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbYnVzeSwgc2V0QnVzeV0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtpc0VkaXRpbmcsIHNldElzRWRpdGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtpc0h5ZHJhdGluZywgc2V0SXNIeWRyYXRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbbW9kYWxFcnJvciwgc2V0TW9kYWxFcnJvcl0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgcmVhZE9ubHlTdXJmYWNlUmVmID0gdXNlUmVmKG51bGwpO1xuICBjb25zdCBlZGl0U25hcHNob3RSZWYgPSB1c2VSZWYobnVsbCk7XG5cclxuICBjb25zdCByZWNJZCA9IFN0cmluZyhkZXRhaWwucmVjSWQgPz8gZGV0YWlsLlJlY0lkID8/IFwiXCIpO1xyXG4gIGNvbnN0IGFjY291bnROdW0gPSBTdHJpbmcoZGV0YWlsLmFjY291bnROdW0gPz8gZGV0YWlsLkFjY291bnROdW0gPz8gXCJcIik7XHJcbiAgY29uc3QgYWN0aXZpZGFkSWQgPSBTdHJpbmcoZGV0YWlsLmFjdGl2aWRhZElkID8/IGRldGFpbC5BY3RpdmlkYWRJZCA/PyBcIlwiKTtcclxuXHJcbiAgY29uc3QgeyBlZGl0TW9kZUtleVJlZiwgc3luY0VkaXRNb2RlRmxhZywgY2xlYXJEcmFmdCwgYXBwbHlEcmFmdFZhbHVlcyB9ID0gdXNlRGV0YWlsRWRpdFNlc3Npb24oe1xuICAgIGFjdGl2aWRhZElkLFxuICAgIHJlY0lkLFxuICAgIGNhbkVkaXRIaXN0b3J5LFxuICAgIGlzRWRpdGluZyxcbiAgICBzZXRJc0VkaXRpbmcsXG4gICAgdHJhbnNEYXRlLFxuICAgIHZpc2l0VHlwZSxcbiAgICBhc2lzdGVudGVUaXBvLFxuICAgIGRlc2NyaXB0aW9uLFxuICAgIGNvbWVudGFyaW9zLFxuICAgIGFudGVjZWRlbnRlcyxcbiAgICBjb25jbHVzaW9uZXMsXG4gICAgc2V0VHJhbnNEYXRlLFxuICAgIHNldFZpc2l0VHlwZSxcbiAgICBzZXRBc2lzdGVudGVUaXBvLFxuICAgIHNldERlc2NyaXB0aW9uLFxuICAgIHNldENvbWVudGFyaW9zLFxuICAgIHNldEFudGVjZWRlbnRlcyxcbiAgICBzZXRDb25jbHVzaW9uZXMsXG4gIH0pO1xuXHJcbiAgY29uc3QgaGFzU2VydmVyRGV0YWlsID1cclxuICAgIGhhc1ZhbHVlKHJlY0lkKSAmJlxyXG4gICAgaGFzVmFsdWUoYWNjb3VudE51bSkgJiZcclxuICAgIGhhc1ZhbHVlKGRldGFpbC50cmFuc0RhdGUgfHwgZGV0YWlsLlRyYW5zRGF0ZSB8fCBcIlwiKTtcclxuXHJcbiAgY29uc3Qgc2hvdWxkSHlkcmF0ZSA9ICEhYWN0aXZpZGFkSWQgJiYgIWhhc1NlcnZlckRldGFpbDtcclxuXHJcbiAgY29uc3Qgb3BlblRleHRFZGl0b3IgPSB1c2VDYWxsYmFjayhcbiAgICAoXG4gICAgICBmaWVsZElkOiBzdHJpbmcsXG4gICAgICBmaWVsZExhYmVsOiBzdHJpbmcsXG4gICAgICBmaWVsZFZhbHVlOiBzdHJpbmcsXG4gICAgICBvcHRpb25zOiB7IGFsbG93RWRpdD86IGJvb2xlYW47IHJlYWRPbmx5PzogYm9vbGVhbjsgZWRpdE1vZGVLZXk/OiBzdHJpbmcgfSA9IHt9XG4gICAgKSA9PiB7XG4gICAgICBuYXZpZ2F0ZVRvVGV4dEVkaXRvckZpZWxkKHtcbiAgICAgICAgZmllbGRJZCxcbiAgICAgICAgZmllbGRMYWJlbCxcbiAgICAgICAgZmllbGRWYWx1ZSxcbiAgICAgICAgcmVhZE9ubHk6IG9wdGlvbnM/LnJlYWRPbmx5ID09PSB0cnVlLFxuICAgICAgICBhbGxvd0VkaXQ6IG9wdGlvbnM/LmFsbG93RWRpdCAhPT0gZmFsc2UsXG4gICAgICAgIGVkaXRNb2RlS2V5OiBvcHRpb25zPy5lZGl0TW9kZUtleSxcbiAgICAgICAgZWRpdE1vZGVSZXR1cm5UdGxNczogRURJVE9SX1JFVFVSTl9GTEFHX1RUTF9NUyxcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgW11cbiAgKTtcblxyXG4gIGNvbnN0IGhhbmRsZUNvbWVudGFyaW9zVGFwID0gdXNlQ2FsbGJhY2soKGV2ZW50KSA9PiB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgb3BlblRleHRFZGl0b3IoZmllbGRJZENvbWVudGFyaW9zLCBpbmRUKFwiVmlzaXRzX0ZpZWxkX0NvbW1lbnRzXCIsIFwiQ29tbWVudHNcIiksIGNvbWVudGFyaW9zLCB7XHJcbiAgICAgIHJlYWRPbmx5OiAhaXNFZGl0aW5nLFxyXG4gICAgICBhbGxvd0VkaXQ6IGNhbkVkaXRIaXN0b3J5LFxyXG4gICAgICBlZGl0TW9kZUtleTogZWRpdE1vZGVLZXlSZWYuY3VycmVudFxyXG4gICAgfSk7XHJcbiAgfSwgW2NvbWVudGFyaW9zLCBpc0VkaXRpbmcsIGNhbkVkaXRIaXN0b3J5LCBvcGVuVGV4dEVkaXRvcl0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVDb21lbnRhcmlvc0hvbGQgPSB1c2VDYWxsYmFjaygodGFyZ2V0LCBjbGllbnRZKSA9PiB7XHJcbiAgICBpZiAoIXRhcmdldCB8fCAhaXNPdmVyZmxvd2luZyh0YXJnZXQpKSByZXR1cm4gZmFsc2U7XHJcbiAgICBzZXRQcmV2aWV3QW5jaG9yKHRhcmdldCk7XHJcbiAgICByZXR1cm4gc2hvd1ByZXZpZXdUb29sdGlwKFN0cmluZyhjb21lbnRhcmlvcyB8fCBcIlwiKSwgY2xpZW50WSk7XHJcbiAgfSwgW2NvbWVudGFyaW9zXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUFudGVjZWRlbnRlc1RhcCA9IHVzZUNhbGxiYWNrKChldmVudCkgPT4ge1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIG9wZW5UZXh0RWRpdG9yKGZpZWxkSWRBbnRlY2VkZW50ZXMsIGluZFQoXCJWaXNpdHNfRmllbGRfQmFja2dyb3VuZFwiLCBcIkJhY2tncm91bmRcIiksIGFudGVjZWRlbnRlcywge1xyXG4gICAgICByZWFkT25seTogIWlzRWRpdGluZyxcclxuICAgICAgYWxsb3dFZGl0OiBjYW5FZGl0SGlzdG9yeSxcclxuICAgICAgZWRpdE1vZGVLZXk6IGVkaXRNb2RlS2V5UmVmLmN1cnJlbnRcclxuICAgIH0pO1xyXG4gIH0sIFthbnRlY2VkZW50ZXMsIGlzRWRpdGluZywgY2FuRWRpdEhpc3RvcnksIG9wZW5UZXh0RWRpdG9yXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUFudGVjZWRlbnRlc0hvbGQgPSB1c2VDYWxsYmFjaygodGFyZ2V0LCBjbGllbnRZKSA9PiB7XHJcbiAgICBpZiAoIXRhcmdldCB8fCAhaXNPdmVyZmxvd2luZyh0YXJnZXQpKSByZXR1cm4gZmFsc2U7XHJcbiAgICBzZXRQcmV2aWV3QW5jaG9yKHRhcmdldCk7XHJcbiAgICByZXR1cm4gc2hvd1ByZXZpZXdUb29sdGlwKFN0cmluZyhhbnRlY2VkZW50ZXMgfHwgXCJcIiksIGNsaWVudFkpO1xyXG4gIH0sIFthbnRlY2VkZW50ZXNdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQ29uY2x1c2lvbmVzVGFwID0gdXNlQ2FsbGJhY2soKGV2ZW50KSA9PiB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgb3BlblRleHRFZGl0b3IoZmllbGRJZENvbmNsdXNpb25lcywgaW5kVChcIlZpc2l0c19GaWVsZF9Db25jbHVzaW9uc1wiLCBcIkNvbmNsdXNpb25zXCIpLCBjb25jbHVzaW9uZXMsIHtcclxuICAgICAgcmVhZE9ubHk6ICFpc0VkaXRpbmcsXHJcbiAgICAgIGFsbG93RWRpdDogY2FuRWRpdEhpc3RvcnksXHJcbiAgICAgIGVkaXRNb2RlS2V5OiBlZGl0TW9kZUtleVJlZi5jdXJyZW50XHJcbiAgICB9KTtcclxuICB9LCBbY29uY2x1c2lvbmVzLCBpc0VkaXRpbmcsIGNhbkVkaXRIaXN0b3J5LCBvcGVuVGV4dEVkaXRvcl0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVDb25jbHVzaW9uZXNIb2xkID0gdXNlQ2FsbGJhY2soKHRhcmdldCwgY2xpZW50WSkgPT4ge1xyXG4gICAgaWYgKCF0YXJnZXQgfHwgIWlzT3ZlcmZsb3dpbmcodGFyZ2V0KSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgc2V0UHJldmlld0FuY2hvcih0YXJnZXQpO1xyXG4gICAgcmV0dXJuIHNob3dQcmV2aWV3VG9vbHRpcChTdHJpbmcoY29uY2x1c2lvbmVzIHx8IFwiXCIpLCBjbGllbnRZKTtcclxuICB9LCBbY29uY2x1c2lvbmVzXSk7XHJcblxyXG4gIGNvbnN0IGNvbWVudGFyaW9zVGFwID0gdXNlVGFwR3VhcmQoaGFuZGxlQ29tZW50YXJpb3NUYXAsIGhhbmRsZUNvbWVudGFyaW9zSG9sZCk7XHJcbiAgY29uc3QgYW50ZWNlZGVudGVzVGFwID0gdXNlVGFwR3VhcmQoaGFuZGxlQW50ZWNlZGVudGVzVGFwLCBoYW5kbGVBbnRlY2VkZW50ZXNIb2xkKTtcclxuICBjb25zdCBjb25jbHVzaW9uZXNUYXAgPSB1c2VUYXBHdWFyZChoYW5kbGVDb25jbHVzaW9uZXNUYXAsIGhhbmRsZUNvbmNsdXNpb25lc0hvbGQpO1xyXG5cclxuICBjb25zdCB0ZXh0RWRpdG9yQmluZGluZ3MgPSB1c2VNZW1vKFxuICAgICgpID0+IFtcbiAgICAgIHsgZmllbGRJZDogZmllbGRJZENvbWVudGFyaW9zLCBhcHBseVZhbHVlOiBzZXRDb21lbnRhcmlvcyB9LFxuICAgICAgeyBmaWVsZElkOiBmaWVsZElkQW50ZWNlZGVudGVzLCBhcHBseVZhbHVlOiBzZXRBbnRlY2VkZW50ZXMgfSxcbiAgICAgIHsgZmllbGRJZDogZmllbGRJZENvbmNsdXNpb25lcywgYXBwbHlWYWx1ZTogc2V0Q29uY2x1c2lvbmVzIH0sXG4gICAgXSxcbiAgICBbZmllbGRJZEFudGVjZWRlbnRlcywgZmllbGRJZENvbWVudGFyaW9zLCBmaWVsZElkQ29uY2x1c2lvbmVzXVxuICApO1xuXG4gIGNvbnN0IHsgYXBwbHlWYWx1ZXM6IGFwcGx5VGV4dEVkaXRvclZhbHVlcyB9ID0gdXNlVGV4dEVkaXRvckZpZWxkcyh0ZXh0RWRpdG9yQmluZGluZ3MsIHtcbiAgICBhcHBseU9uTW91bnQ6ICFhY3RpdmlkYWRJZCxcbiAgICBsaXN0ZW5QYWdlU2hvdzogdHJ1ZSxcbiAgfSk7XG5cclxuICBjb25zdCB7IG1vZGFsLCBvcGVuQ29uZmlybSwgY2xvc2VDb25maXJtLCBoYW5kbGVDb25maXJtIH0gPSB1c2VDb25maXJtRGlhbG9nKHtcclxuICAgIGRlZmF1bHRDb25maXJtVGV4dDogaW5kVChcIkNvbmZpcm1fWWVzXCIsIFwiT0tcIiksXHJcbiAgICBkZWZhdWx0Q2FuY2VsVGV4dDogaW5kVChcIkNvbmZpcm1fTm9cIiwgXCJDYW5jZWxcIilcclxuICB9KTtcclxuXHJcbiAgY29uc3QgaGFuZGxlTW9kYWxDb25maXJtID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgc2V0TW9kYWxFcnJvcihcIlwiKTtcclxuICAgIGF3YWl0IGhhbmRsZUNvbmZpcm0oe1xyXG4gICAgICBidXN5LFxyXG4gICAgICBvbkVycm9yOiAobXNnKSA9PiB7XHJcbiAgICAgICAgc2V0TW9kYWxFcnJvcihtc2cpO1xyXG4gICAgICAgIHNldFN0YXR1cyhtc2cpO1xyXG4gICAgICAgIGZsYXNoQWN0aW9uTWFyayhcImVycm9yUHJvY2Vzc1wiLCAxNTAwKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSwgW2J1c3ksIGhhbmRsZUNvbmZpcm1dKTtcclxuXHJcbiAgY29uc3QgbW9kYWxMb2FkaW5nVGV4dCA9IGluZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIik7XHJcbiAgY29uc3QgbW9kYWxDYW5jZWxUZXh0ID0gbW9kYWwuY2FuY2VsVGV4dCB8fCBpbmRUKFwiQ29uZmlybV9Ob1wiLCBcIkNhbmNlbFwiKTtcclxuICBjb25zdCBtb2RhbENvbmZpcm1UZXh0ID0gYnVzeVxyXG4gICAgPyBtb2RhbExvYWRpbmdUZXh0XHJcbiAgICA6ICghYnVzeSAmJiBtb2RhbEVycm9yID8gaW5kVChcIkNvbW1vbl9PS1wiLCBcIk9LXCIpIDogKG1vZGFsLmNvbmZpcm1UZXh0IHx8IGluZFQoXCJDb25maXJtX1llc1wiLCBcIk9LXCIpKSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZU1vZGFsQnV0dG9uQ29uZmlybSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoIWJ1c3kgJiYgbW9kYWxFcnJvcikge1xuICAgICAgY2xvc2VDb25maXJtKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGhhbmRsZU1vZGFsQ29uZmlybSgpO1xuICB9LCBbYnVzeSwgbW9kYWxFcnJvciwgY2xvc2VDb25maXJtLCBoYW5kbGVNb2RhbENvbmZpcm1dKTtcblxuICBjb25zdCBoYXNBY3RpdmVQcm9jZXNzID0gdXNlTWVtbygoKSA9PiBidXN5IHx8IGlzRWRpdGluZywgW2J1c3ksIGlzRWRpdGluZ10pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgd2luZG93Ll9faW5kU2V0TmF2aWdhdGlvbkd1YXJkPy4oaGFzQWN0aXZlUHJvY2Vzcyk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHdpbmRvdy5fX2luZENsZWFyTmF2aWdhdGlvbkd1YXJkPy4oKTtcbiAgICB9O1xuICB9LCBbaGFzQWN0aXZlUHJvY2Vzc10pO1xuXHJcbiAgdXNlRGV0YWlsSHlkcmF0aW9uKHtcbiAgICBhY3RpdmlkYWRJZCxcbiAgICBzaG91bGRIeWRyYXRlLFxuICAgIHZpc2l0VHlwZXMsXG4gICAgYXNpc3RlbnRlVGlwb3MsXG4gICAgZGVmYXVsdFZpc2l0VHlwZSxcbiAgICBpbml0aWFsQXNpc3RlbnRlLFxuICAgIG5vcm1hbGl6ZURhdGVUb0lucHV0LFxuICAgIG1hdGNoT3B0aW9uVmFsdWUsXG4gICAgYXBwbHlEcmFmdFZhbHVlcyxcbiAgICBhcHBseVRleHRFZGl0b3JWYWx1ZXMsXG4gICAgc2V0U3RhdHVzLFxuICAgIHNldElzSHlkcmF0aW5nLFxuICAgIHNldFRyYW5zRGF0ZSxcbiAgICBzZXRWaXNpdFR5cGUsXG4gICAgc2V0QXNpc3RlbnRlVGlwbyxcbiAgICBzZXREZXNjcmlwdGlvbixcbiAgICBzZXRDb21lbnRhcmlvcyxcbiAgICBzZXRBbnRlY2VkZW50ZXMsXG4gICAgc2V0Q29uY2x1c2lvbmVzLFxuICB9KTtcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgZWwgPSByZWFkT25seVN1cmZhY2VSZWYuY3VycmVudDtcbiAgICBpZiAoIWVsKSByZXR1cm47XG4gICAgaWYgKCFpc0VkaXRpbmcpIHtcbiAgICAgIGVsLmNsYXNzTGlzdC5hZGQoXCJpbmQtcmVhZG9ubHktc3VyZmFjZVwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShcImluZC1yZWFkb25seS1zdXJmYWNlXCIpO1xuICAgIH1cbiAgfSwgW2lzRWRpdGluZ10pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKGlzRWRpdGluZykge1xuICAgICAgaWYgKCFlZGl0U25hcHNob3RSZWYuY3VycmVudCkge1xuICAgICAgICBlZGl0U25hcHNob3RSZWYuY3VycmVudCA9IHtcbiAgICAgICAgICB0cmFuc0RhdGUsXG4gICAgICAgICAgdmlzaXRUeXBlLFxuICAgICAgICAgIGFzaXN0ZW50ZVRpcG8sXG4gICAgICAgICAgZGVzY3JpcHRpb24sXG4gICAgICAgICAgY29tZW50YXJpb3MsXG4gICAgICAgICAgYW50ZWNlZGVudGVzLFxuICAgICAgICAgIGNvbmNsdXNpb25lc1xuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBlZGl0U25hcHNob3RSZWYuY3VycmVudCA9IG51bGw7XG4gIH0sIFtpc0VkaXRpbmcsIHRyYW5zRGF0ZSwgdmlzaXRUeXBlLCBhc2lzdGVudGVUaXBvLCBkZXNjcmlwdGlvbiwgY29tZW50YXJpb3MsIGFudGVjZWRlbnRlcywgY29uY2x1c2lvbmVzXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoaXNFZGl0aW5nKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgIHJldHVybiBiaW5kUmVhZE9ubHlHdWFyZChyZWFkT25seVN1cmZhY2VSZWYuY3VycmVudCk7XG4gIH0sIFtpc0VkaXRpbmddKTtcblxuICBjb25zdCBoYW5kbGVFbmFibGVFZGl0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmICghY2FuRWRpdEhpc3RvcnkpIHtcbiAgICAgIHNob3dQZXJtaXNzaW9uTW9kYWwoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgc2V0SXNFZGl0aW5nKHRydWUpO1xuICAgIHN5bmNFZGl0TW9kZUZsYWcodHJ1ZSk7XG4gICAgc2V0U3RhdHVzKGluZFQoXCJWaXNpdHNfRGV0YWlsX0VkaXRpbmdFbmFibGVkXCIsIFwiRWRpdGluZyBlbmFibGVkXCIpKTtcbiAgfSwgW2NhbkVkaXRIaXN0b3J5LCBzeW5jRWRpdE1vZGVGbGFnXSk7XG5cbiAgY29uc3QgaGFuZGxlQ2FuY2VsRWRpdCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoIWlzRWRpdGluZykgcmV0dXJuO1xuICAgIHNldElzRWRpdGluZyhmYWxzZSk7XG4gICAgc3luY0VkaXRNb2RlRmxhZyhmYWxzZSk7XG4gICAgY2xlYXJEcmFmdCgpO1xuICAgIHNldFN0YXR1cyhpbmRUKFwiQ29tbW9uX0NhbmNlbFwiLCBcIkNhbmNlbFwiKSk7XG4gICAgd2luZG93Ll9faW5kQnlwYXNzTmF2aWdhdGlvbkd1YXJkT25jZT8uKCk7XG4gICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICB9LCBbaXNFZGl0aW5nLCBzeW5jRWRpdE1vZGVGbGFnLCBjbGVhckRyYWZ0XSk7XG5cclxuICBjb25zdCB7IGhhbmRsZVVwZGF0ZSwgaGFuZGxlRGVsZXRlIH0gPSB1c2VEZXRhaWxNdXRhdGlvbnMoe1xuICAgIGJ1c3ksXG4gICAgaXNFZGl0aW5nLFxuICAgIGNhbkVkaXRIaXN0b3J5LFxuICAgIGNhbkRlbGV0ZUhpc3RvcnksXG4gICAgcmVjSWQsXG4gICAgYWNjb3VudE51bSxcbiAgICB0cmFuc0RhdGUsXG4gICAgdmlzaXRUeXBlLFxuICAgIGFzaXN0ZW50ZVRpcG8sXG4gICAgZGVzY3JpcHRpb24sXG4gICAgY29tZW50YXJpb3MsXG4gICAgYW50ZWNlZGVudGVzLFxuICAgIGNvbmNsdXNpb25lcyxcbiAgICB2aXNpdFR5cGVzLFxuICAgIGFzaXN0ZW50ZVRpcG9zLFxuICAgIGRlZmF1bHRWaXNpdFR5cGUsXG4gICAgcmF3SW5pdGlhbFZpc2l0VHlwZSxcbiAgICByYXdJbml0aWFsQXNpc3RlbnRlLFxuICAgIG1hdGNoT3B0aW9uVmFsdWUsXG4gICAgY2xlYXJEcmFmdCxcbiAgICBzeW5jRWRpdE1vZGVGbGFnLFxuICAgIHNldE1vZGFsRXJyb3IsXG4gICAgc2V0QnVzeSxcbiAgICBzZXRTdGF0dXMsXG4gICAgc2V0SXNFZGl0aW5nLFxuICB9KTtcblxyXG4gIHVzZURldGFpbFRvcGJhckFjdGlvbnMoe1xuICAgIGJ1c3ksXG4gICAgbW9kYWxPcGVuOiBtb2RhbC5vcGVuLFxuICAgIGlzRWRpdGluZyxcbiAgICBjYW5FZGl0SGlzdG9yeSxcbiAgICBjYW5EZWxldGVIaXN0b3J5LFxuICAgIHRyYW5zRGF0ZSxcbiAgICBzZXRNb2RhbEVycm9yLFxuICAgIGhhbmRsZUVuYWJsZUVkaXQsXG4gICAgaGFuZGxlQ2FuY2VsRWRpdCxcbiAgICBoYW5kbGVVcGRhdGUsXG4gICAgaGFuZGxlRGVsZXRlLFxuICAgIG9wZW5Db25maXJtLFxuICAgIGNsb3NlQ29uZmlybSxcbiAgfSk7XG5cbiAgY29uc3QgZGVzY3JpcHRpb25MYWJlbCA9IGluZFQoXCJWaXNpdHNfRmllbGRfRGVzY3JpcHRpb25cIiwgXCJEZXNjcmlwdGlvblwiKTtcbiAgY29uc3QgY29tbWVudHNMYWJlbCA9IGluZFQoXCJWaXNpdHNfRmllbGRfQ29tbWVudHNcIiwgXCJDb21tZW50c1wiKTtcbiAgY29uc3QgYmFja2dyb3VuZExhYmVsID0gaW5kVChcIlZpc2l0c19GaWVsZF9CYWNrZ3JvdW5kXCIsIFwiQmFja2dyb3VuZFwiKTtcbiAgY29uc3QgY29uY2x1c2lvbnNMYWJlbCA9IGluZFQoXCJWaXNpdHNfRmllbGRfQ29uY2x1c2lvbnNcIiwgXCJDb25jbHVzaW9uc1wiKTtcbiAgY29uc3QgZGV0YWlsRGVzY3JpcHRpb25DbGFzc05hbWUgPSBjbGFzc05hbWVzKFxuICAgIFwiZm9ybS1jb250cm9sXCIsXG4gICAgaXNFZGl0aW5nID8gXCJib3JkZXItc2xhdGUtMjAwIHRleHQtc2xhdGUtOTAwXCIgOiBcImJvcmRlci1zbGF0ZS0yMDAgaW5kLXJlYWRvbmx5LWZpZWxkXCJcbiAgKTtcbiAgY29uc3QgZGV0YWlsUmVhZE9ubHlDbGFzc05hbWUgPSBjbGFzc05hbWVzKFwiZm9ybS1jb250cm9sIGN1cnNvci1wb2ludGVyXCIsICFpc0VkaXRpbmcgPyBcImluZC1yZWFkb25seS1maWVsZFwiIDogXCJcIik7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNFwiPlxyXG4gICAgICA8Q29uZmlybU1vZGFsXHJcbiAgICAgICAgb3Blbj17bW9kYWwub3Blbn1cclxuICAgICAgICB0aXRsZT17bW9kYWwudGl0bGV9XHJcbiAgICAgICAgbWVzc2FnZT17bW9kYWwubWVzc2FnZX1cclxuICAgICAgICBjb25maXJtVGV4dD17bW9kYWxDb25maXJtVGV4dH1cclxuICAgICAgICBjYW5jZWxUZXh0PXttb2RhbENhbmNlbFRleHR9XHJcbiAgICAgICAgbG9hZGluZ1RleHQ9e21vZGFsTG9hZGluZ1RleHR9XHJcbiAgICAgICAgc2hvd0NhbmNlbD17bW9kYWwuc2hvd0NhbmNlbH1cclxuICAgICAgICBzaG93Q29uZmlybT17bW9kYWwuc2hvd0NvbmZpcm19XHJcbiAgICAgICAgYnVzeT17YnVzeX1cclxuICAgICAgICBlcnJvcj17bW9kYWxFcnJvcn1cclxuICAgICAgICBzdGF0dXM9e3N0YXR1c31cclxuICAgICAgICBvbkNvbmZpcm09e2hhbmRsZU1vZGFsQnV0dG9uQ29uZmlybX1cclxuICAgICAgICBvbkNhbmNlbD17Y2xvc2VDb25maXJtfVxyXG4gICAgICAvPlxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgcmVmPXtyZWFkT25seVN1cmZhY2VSZWZ9XHJcbiAgICAgICAgY2xhc3NOYW1lPVwicmVsYXRpdmUgc2hhZG93LXhzIGdsYXNzLXBhbmVsIHAtNCBzcGFjZS15LTQgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgcm91bmRlZC0yeGxcIlxyXG4gICAgICA+XHJcbiAgICAgICAge2lzSHlkcmF0aW5nICYmIChcclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCB6LTEwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGJnLXdoaXRlLzcwIHJvdW5kZWQtMnhsXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC1zbSB0ZXh0LXNsYXRlLTYwMFwiPlxyXG4gICAgICAgICAgICAgIDxTcGlubmVyIHNpemU9XCJoLTUgdy01XCIgLz5cclxuICAgICAgICAgICAgICA8c3Bhbj57aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX08L3NwYW4+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKX1cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMiBnYXAtNCBwdC0xXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ2aXNpdGEtZmllbGQtdGV4dFwiPlxyXG4gICAgICAgICAgICA8U2luZ2xlRGF0ZVBpY2tlclxuICAgICAgICAgICAgICBsYWJlbD17aW5kVChcIlZpc2l0c19EZXRhaWxfRGF0ZV9MYWJlbFwiLCBcIkRhdGVcIil9XG4gICAgICAgICAgICAgIHZhbHVlPXt0cmFuc0RhdGV9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXtzZXRUcmFuc0RhdGV9XG4gICAgICAgICAgICAgIGRpc2FibGVkPXshaXNFZGl0aW5nfVxuICAgICAgICAgICAgICByZWFkT25seT17IWlzRWRpdGluZ31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPFNlbGVjdENvbWJvYm94XG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIlZpc2l0c19EZXRhaWxfVmlzaXRUeXBlX0xhYmVsXCIsIFwiVmlzaXQgdHlwZVwiKX1cbiAgICAgICAgICAgIG9wdGlvbnM9e3Zpc2l0VHlwZXN9XG4gICAgICAgICAgICB2YWx1ZT17dmlzaXRUeXBlfVxuICAgICAgICAgICAgb25DaGFuZ2U9e3NldFZpc2l0VHlwZX1cbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiVmlzaXRzX0RldGFpbF9WaXNpdFR5cGVfUGxhY2Vob2xkZXJcIiwgXCJTZWxlY3QgdHlwZVwiKX1cbiAgICAgICAgICAgIGRpc2FibGVkPXshaXNFZGl0aW5nfVxuICAgICAgICAgICAgcmVhZE9ubHk9eyFpc0VkaXRpbmd9XG4gICAgICAgICAgICB1c2VQb3J0YWw9e2ZhbHNlfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICA8VmlzaXROYXJyYXRpdmVGaWVsZHNcbiAgICAgICAgICBkZXNjcmlwdGlvbkxhYmVsPXtkZXNjcmlwdGlvbkxhYmVsfVxuICAgICAgICAgIGRlc2NyaXB0aW9uVmFsdWU9e2Rlc2NyaXB0aW9ufVxuICAgICAgICAgIGRlc2NyaXB0aW9uQ2xhc3NOYW1lPXtkZXRhaWxEZXNjcmlwdGlvbkNsYXNzTmFtZX1cbiAgICAgICAgICBkZXNjcmlwdGlvbkRpc2FibGVkPXshaXNFZGl0aW5nfVxuICAgICAgICAgIG9uRGVzY3JpcHRpb25DaGFuZ2U9e3NldERlc2NyaXB0aW9ufVxuICAgICAgICAgIHRhcEZpZWxkcz17W1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBpZDogXCJjb21lbnRhcmlvc1wiLFxuICAgICAgICAgICAgICBsYWJlbDogY29tbWVudHNMYWJlbCxcbiAgICAgICAgICAgICAgdmFsdWU6IGNvbWVudGFyaW9zLFxuICAgICAgICAgICAgICBjbGFzc05hbWU6IGRldGFpbFJlYWRPbmx5Q2xhc3NOYW1lLFxuICAgICAgICAgICAgICBwb2ludGVyQmluZGluZ3M6IGNvbWVudGFyaW9zVGFwLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgaWQ6IFwiYW50ZWNlZGVudGVzXCIsXG4gICAgICAgICAgICAgIGxhYmVsOiBiYWNrZ3JvdW5kTGFiZWwsXG4gICAgICAgICAgICAgIHZhbHVlOiBhbnRlY2VkZW50ZXMsXG4gICAgICAgICAgICAgIGNsYXNzTmFtZTogZGV0YWlsUmVhZE9ubHlDbGFzc05hbWUsXG4gICAgICAgICAgICAgIHBvaW50ZXJCaW5kaW5nczogYW50ZWNlZGVudGVzVGFwLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgaWQ6IFwiY29uY2x1c2lvbmVzXCIsXG4gICAgICAgICAgICAgIGxhYmVsOiBjb25jbHVzaW9uc0xhYmVsLFxuICAgICAgICAgICAgICB2YWx1ZTogY29uY2x1c2lvbmVzLFxuICAgICAgICAgICAgICBjbGFzc05hbWU6IGRldGFpbFJlYWRPbmx5Q2xhc3NOYW1lLFxuICAgICAgICAgICAgICBwb2ludGVyQmluZGluZ3M6IGNvbmNsdXNpb25lc1RhcCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXX1cbiAgICAgICAgLz5cblxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTMgdGV4dC1zbSB0ZXh0LXNsYXRlLTYwMFwiPlxyXG4gICAgICAgICAgPHNwYW4+e3N0YXR1c308L3NwYW4+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcblxuLy8gRGV0YWlsIFVJIHdyYXBwZWQgYnkgdGhlIGVycm9yIGJvdW5kYXJ5LlxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRGV0YWlsRm9ybSgpIHtcbiAgcmV0dXJuIChcbiAgICA8QXBwRXJyb3JCb3VuZGFyeSBmYWxsYmFja01lc3NhZ2U9e2luZFQoXCJWaXNpdHNfRGV0YWlsX0Vycm9yQm91bmRhcnlcIiwgXCJBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSByZW5kZXJpbmcgdGhlIGRldGFpbCBwYWdlLiBSZWxvYWQgYW5kIHRyeSBhZ2Fpbi5cIil9PlxuICAgICAgPERldGFpbEFwcCAvPlxuICAgIDwvQXBwRXJyb3JCb3VuZGFyeT5cbiAgKTtcbn1cbiIsICJleHBvcnQgY29uc3QgYmluZFJlYWRPbmx5R3VhcmQgPSAoZWw6IEhUTUxFbGVtZW50IHwgbnVsbCkgPT4ge1xuICBpZiAoIWVsKSByZXR1cm4gKCkgPT4ge307XG4gIGNvbnN0IGNhbmNlbCA9IChldmVudDogRXZlbnQpID0+IGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIGNvbnN0IGV2ZW50cyA9IFtcImNvbnRleHRtZW51XCIsIFwic2VsZWN0c3RhcnRcIiwgXCJjb3B5XCIsIFwiY3V0XCIsIFwicGFzdGVcIl07XG4gIGV2ZW50cy5mb3JFYWNoKChldnQpID0+IGVsLmFkZEV2ZW50TGlzdGVuZXIoZXZ0LCBjYW5jZWwpKTtcbiAgcmV0dXJuICgpID0+IHtcbiAgICBldmVudHMuZm9yRWFjaCgoZXZ0KSA9PiBlbC5yZW1vdmVFdmVudExpc3RlbmVyKGV2dCwgY2FuY2VsKSk7XG4gIH07XG59O1xuIiwgImV4cG9ydCBjb25zdCBoYXNWYWx1ZSA9ICh2YWx1ZTogdW5rbm93bikgPT4gU3RyaW5nKHZhbHVlIHx8IFwiXCIpLnRyaW0oKS5sZW5ndGggPiAwO1xuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGZldGNoSnNvbiB9IGZyb20gXCIuLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uL3V0aWxzL2luZEkxOG4udHNcIjtcblxudHlwZSBPcHRpb25MaWtlID0ge1xuICB2YWx1ZT86IHN0cmluZyB8IG51bWJlcjtcbiAgVmFsdWU/OiBzdHJpbmcgfCBudW1iZXI7XG4gIHRleHQ/OiBzdHJpbmc7XG4gIFRleHQ/OiBzdHJpbmc7XG59O1xuXG50eXBlIEFjdGl2aXR5RGV0YWlsUmVjb3JkID0gUmVjb3JkPHN0cmluZywgdW5rbm93bj47XG5cbnR5cGUgQWN0aXZpdHlEZXRhaWxSZXNwb25zZSA9IHtcbiAgc3VjY2Vzcz86IGJvb2xlYW47XG4gIG1lc3NhZ2U/OiBzdHJpbmc7XG4gIGRhdGE/OiBBY3Rpdml0eURldGFpbFJlY29yZCB8IG51bGw7XG4gIFN1Y2Nlc3M/OiBib29sZWFuO1xuICBNZXNzYWdlPzogc3RyaW5nO1xuICBEYXRhPzogQWN0aXZpdHlEZXRhaWxSZWNvcmQgfCBudWxsO1xufTtcblxuY29uc3QgaXNSZXNwb25zZVN1Y2Nlc3MgPSAocmVzcG9uc2U6IEFjdGl2aXR5RGV0YWlsUmVzcG9uc2UpOiBib29sZWFuID0+IHtcbiAgcmV0dXJuIHJlc3BvbnNlLnN1Y2Nlc3MgPT09IHRydWUgfHwgcmVzcG9uc2UuU3VjY2VzcyA9PT0gdHJ1ZTtcbn07XG5cbmNvbnN0IGdldFJlc3BvbnNlTWVzc2FnZSA9IChyZXNwb25zZTogQWN0aXZpdHlEZXRhaWxSZXNwb25zZSk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IHJhdyA9IHJlc3BvbnNlLm1lc3NhZ2UgPz8gcmVzcG9uc2UuTWVzc2FnZTtcbiAgcmV0dXJuIHR5cGVvZiByYXcgPT09IFwic3RyaW5nXCIgPyByYXcudHJpbSgpIDogXCJcIjtcbn07XG5cbmNvbnN0IGdldFJlc3BvbnNlRGF0YSA9IChyZXNwb25zZTogQWN0aXZpdHlEZXRhaWxSZXNwb25zZSk6IEFjdGl2aXR5RGV0YWlsUmVjb3JkIHwgbnVsbCA9PiB7XG4gIGNvbnN0IGRhdGEgPSByZXNwb25zZS5kYXRhID8/IHJlc3BvbnNlLkRhdGE7XG4gIHJldHVybiBkYXRhICYmIHR5cGVvZiBkYXRhID09PSBcIm9iamVjdFwiID8gZGF0YSA6IG51bGw7XG59O1xuXG5jb25zdCBhc1JlY29yZCA9ICh2YWx1ZTogdW5rbm93bik6IFJlY29yZDxzdHJpbmcsIHVua25vd24+IHwgbnVsbCA9PiB7XG4gIGlmICghdmFsdWUgfHwgdHlwZW9mIHZhbHVlICE9PSBcIm9iamVjdFwiIHx8IEFycmF5LmlzQXJyYXkodmFsdWUpKSByZXR1cm4gbnVsbDtcbiAgcmV0dXJuIHZhbHVlIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+O1xufTtcblxudHlwZSBVc2VEZXRhaWxIeWRyYXRpb25BcmdzID0ge1xuICBhY3RpdmlkYWRJZDogc3RyaW5nO1xuICBzaG91bGRIeWRyYXRlOiBib29sZWFuO1xuICB2aXNpdFR5cGVzOiBPcHRpb25MaWtlW107XG4gIGFzaXN0ZW50ZVRpcG9zOiBPcHRpb25MaWtlW107XG4gIGRlZmF1bHRWaXNpdFR5cGU6IHN0cmluZztcbiAgaW5pdGlhbEFzaXN0ZW50ZTogc3RyaW5nO1xuICBub3JtYWxpemVEYXRlVG9JbnB1dDogKHZhbHVlOiBzdHJpbmcpID0+IHN0cmluZztcbiAgbWF0Y2hPcHRpb25WYWx1ZTogKG9wdGlvbnM6IE9wdGlvbkxpa2VbXSwgcmF3OiB1bmtub3duKSA9PiBzdHJpbmc7XG4gIGFwcGx5RHJhZnRWYWx1ZXM6ICgpID0+IHZvaWQ7XG4gIGFwcGx5VGV4dEVkaXRvclZhbHVlczogKCkgPT4gdm9pZDtcbiAgc2V0U3RhdHVzOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgc2V0SXNIeWRyYXRpbmc6ICh2YWx1ZTogYm9vbGVhbikgPT4gdm9pZDtcbiAgc2V0VHJhbnNEYXRlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgc2V0VmlzaXRUeXBlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgc2V0QXNpc3RlbnRlVGlwbzogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHNldERlc2NyaXB0aW9uOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgc2V0Q29tZW50YXJpb3M6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBzZXRBbnRlY2VkZW50ZXM6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBzZXRDb25jbHVzaW9uZXM6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xufTtcblxuLy8gS2VlcHMgZGV0YWlsIGh5ZHJhdGlvbiBvcmNoZXN0cmF0aW9uIG91dHNpZGUgdGhlIHBhZ2UgY29tcG9uZW50LlxuZXhwb3J0IGNvbnN0IHVzZURldGFpbEh5ZHJhdGlvbiA9ICh7XG4gIGFjdGl2aWRhZElkLFxuICBzaG91bGRIeWRyYXRlLFxuICB2aXNpdFR5cGVzLFxuICBhc2lzdGVudGVUaXBvcyxcbiAgZGVmYXVsdFZpc2l0VHlwZSxcbiAgaW5pdGlhbEFzaXN0ZW50ZSxcbiAgbm9ybWFsaXplRGF0ZVRvSW5wdXQsXG4gIG1hdGNoT3B0aW9uVmFsdWUsXG4gIGFwcGx5RHJhZnRWYWx1ZXMsXG4gIGFwcGx5VGV4dEVkaXRvclZhbHVlcyxcbiAgc2V0U3RhdHVzLFxuICBzZXRJc0h5ZHJhdGluZyxcbiAgc2V0VHJhbnNEYXRlLFxuICBzZXRWaXNpdFR5cGUsXG4gIHNldEFzaXN0ZW50ZVRpcG8sXG4gIHNldERlc2NyaXB0aW9uLFxuICBzZXRDb21lbnRhcmlvcyxcbiAgc2V0QW50ZWNlZGVudGVzLFxuICBzZXRDb25jbHVzaW9uZXMsXG59OiBVc2VEZXRhaWxIeWRyYXRpb25BcmdzKSA9PiB7XG4gIGNvbnN0IGh5ZHJhdGVGcm9tQXBpID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xuICAgIGlmICghYWN0aXZpZGFkSWQpIHJldHVybjtcbiAgICBzZXRJc0h5ZHJhdGluZyh0cnVlKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2hKc29uPEFjdGl2aXR5RGV0YWlsUmVzcG9uc2U+KGAvVmlzaXRhcy9HZXRBY3Rpdml0eUJ5Q29kZT9jb2RlPSR7ZW5jb2RlVVJJQ29tcG9uZW50KGFjdGl2aWRhZElkKX1gKTtcbiAgICAgIGNvbnN0IHJlc3BvbnNlRGF0YSA9IGdldFJlc3BvbnNlRGF0YShyZXMpO1xuXG4gICAgICBpZiAoIWlzUmVzcG9uc2VTdWNjZXNzKHJlcykgfHwgIXJlc3BvbnNlRGF0YSkge1xuICAgICAgICBzZXRTdGF0dXMoZ2V0UmVzcG9uc2VNZXNzYWdlKHJlcykgfHwgaW5kVChcIlZpc2l0c19EZXRhaWxfTG9hZEFjdGl2aXR5RmFpbGVkXCIsIFwiRmFpbGVkIHRvIGxvYWQgYWN0aXZpdHkgZGV0YWlscy5cIikpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJhd0RhdGUgPSBTdHJpbmcocmVzcG9uc2VEYXRhLnRyYW5zRGF0ZSA/PyByZXNwb25zZURhdGEuVHJhbnNEYXRlID8/IFwiXCIpO1xuICAgICAgc2V0VHJhbnNEYXRlKG5vcm1hbGl6ZURhdGVUb0lucHV0KHJhd0RhdGUpKTtcblxuICAgICAgY29uc3QgcmF3VmlzaXRUeXBlID0gU3RyaW5nKFxuICAgICAgICByZXNwb25zZURhdGEudGlwb1Zpc2l0YSA/PyByZXNwb25zZURhdGEuVGlwb1Zpc2l0YSA/PyByZXNwb25zZURhdGEudmlzaXRUeXBlID8/IHJlc3BvbnNlRGF0YS5WaXNpdFR5cGUgPz8gXCJcIlxuICAgICAgKTtcbiAgICAgIHNldFZpc2l0VHlwZShtYXRjaE9wdGlvblZhbHVlKHZpc2l0VHlwZXMsIHJhd1Zpc2l0VHlwZSkgfHwgZGVmYXVsdFZpc2l0VHlwZSk7XG5cbiAgICAgIGNvbnN0IGFzaXN0ZW50ZXNMaXN0ID0gcmVzcG9uc2VEYXRhLmFzaXN0ZW50ZXMgPz8gcmVzcG9uc2VEYXRhLkFzaXN0ZW50ZXM7XG4gICAgICBjb25zdCBmaXJzdEFzaXN0ZW50ZSA9IEFycmF5LmlzQXJyYXkoYXNpc3RlbnRlc0xpc3QpICYmIGFzaXN0ZW50ZXNMaXN0Lmxlbmd0aCA/IGFzUmVjb3JkKGFzaXN0ZW50ZXNMaXN0WzBdKSA6IG51bGw7XG4gICAgICBjb25zdCByYXdBc2lzdGVudGVUaXBvID0gU3RyaW5nKFxuICAgICAgICByZXNwb25zZURhdGEuYXNpc3RlbnRlVGlwbyA/P1xuICAgICAgICAgIHJlc3BvbnNlRGF0YS5Bc2lzdGVudGVUaXBvID8/XG4gICAgICAgICAgZmlyc3RBc2lzdGVudGU/LmFzaXN0ZW50ZVRpcG8gPz9cbiAgICAgICAgICBmaXJzdEFzaXN0ZW50ZT8uQXNpc3RlbnRlVGlwbyA/P1xuICAgICAgICAgIFwiXCJcbiAgICAgICk7XG4gICAgICBjb25zdCBub3JtYWxpemVkQXNpc3RlbnRlVGlwbyA9IG1hdGNoT3B0aW9uVmFsdWUoYXNpc3RlbnRlVGlwb3MsIHJhd0FzaXN0ZW50ZVRpcG8pO1xuICAgICAgc2V0QXNpc3RlbnRlVGlwbyhub3JtYWxpemVkQXNpc3RlbnRlVGlwbyB8fCBpbml0aWFsQXNpc3RlbnRlKTtcbiAgICAgIHNldERlc2NyaXB0aW9uKFN0cmluZyhyZXNwb25zZURhdGEuZGVzY3JpcHRpb24gPz8gcmVzcG9uc2VEYXRhLkRlc2NyaXB0aW9uID8/IFwiXCIpKTtcbiAgICAgIHNldENvbWVudGFyaW9zKFN0cmluZyhyZXNwb25zZURhdGEuY29tZW50YXJpb3MgPz8gcmVzcG9uc2VEYXRhLkNvbWVudGFyaW9zID8/IFwiXCIpKTtcbiAgICAgIHNldEFudGVjZWRlbnRlcyhTdHJpbmcocmVzcG9uc2VEYXRhLmFudGVjZWRlbnRlcyA/PyByZXNwb25zZURhdGEuQW50ZWNlZGVudGVzID8/IFwiXCIpKTtcbiAgICAgIHNldENvbmNsdXNpb25lcyhTdHJpbmcocmVzcG9uc2VEYXRhLmNvbmNsdXNpb25lcyA/PyByZXNwb25zZURhdGEuQ29uY2x1c2lvbmVzID8/IFwiXCIpKTtcbiAgICB9IGNhdGNoIHtcbiAgICAgIC8vIEtlZXAgcHJldmlvdXMgVUkgYmVoYXZpb3Igb24gaHlkcmF0aW9uIGVycm9ycy5cbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0SXNIeWRyYXRpbmcoZmFsc2UpO1xuICAgICAgYXBwbHlEcmFmdFZhbHVlcygpO1xuICAgICAgYXBwbHlUZXh0RWRpdG9yVmFsdWVzKCk7XG4gICAgfVxuICB9LCBbXG4gICAgYWN0aXZpZGFkSWQsXG4gICAgYXBwbHlEcmFmdFZhbHVlcyxcbiAgICBhcHBseVRleHRFZGl0b3JWYWx1ZXMsXG4gICAgYXNpc3RlbnRlVGlwb3MsXG4gICAgZGVmYXVsdFZpc2l0VHlwZSxcbiAgICBpbml0aWFsQXNpc3RlbnRlLFxuICAgIG1hdGNoT3B0aW9uVmFsdWUsXG4gICAgbm9ybWFsaXplRGF0ZVRvSW5wdXQsXG4gICAgc2V0QW50ZWNlZGVudGVzLFxuICAgIHNldEFzaXN0ZW50ZVRpcG8sXG4gICAgc2V0Q29tZW50YXJpb3MsXG4gICAgc2V0Q29uY2x1c2lvbmVzLFxuICAgIHNldERlc2NyaXB0aW9uLFxuICAgIHNldElzSHlkcmF0aW5nLFxuICAgIHNldFN0YXR1cyxcbiAgICBzZXRUcmFuc0RhdGUsXG4gICAgc2V0VmlzaXRUeXBlLFxuICAgIHZpc2l0VHlwZXMsXG4gIF0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKHNob3VsZEh5ZHJhdGUpIHtcbiAgICAgIGh5ZHJhdGVGcm9tQXBpKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGFwcGx5RHJhZnRWYWx1ZXMoKTtcbiAgICBhcHBseVRleHRFZGl0b3JWYWx1ZXMoKTtcbiAgfSwgW2FwcGx5RHJhZnRWYWx1ZXMsIGFwcGx5VGV4dEVkaXRvclZhbHVlcywgaHlkcmF0ZUZyb21BcGksIHNob3VsZEh5ZHJhdGVdKTtcbn07XG4iLCAiaW1wb3J0IHsgdXNlRWZmZWN0IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyB3YWl0IH0gZnJvbSBcIi4uL3V0aWxzL3dhaXQudHNcIjtcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuaW1wb3J0IHsgc2hvd1Blcm1pc3Npb25Nb2RhbCB9IGZyb20gXCIuLi91dGlscy9wZXJtaXNzaW9ucy50c1wiO1xuaW1wb3J0IHsgc2V0SGlzdG9yeUZpbHRlckZvckRhdGUsIGZsYXNoQWN0aW9uTWFyayB9IGZyb20gXCIuLi91dGlscy92aXNpdGFzSGlzdG9yeS50c1wiO1xuXG50eXBlIFVzZURldGFpbFRvcGJhckFjdGlvbnNBcmdzID0ge1xuICBidXN5OiBib29sZWFuO1xuICBtb2RhbE9wZW46IGJvb2xlYW47XG4gIGlzRWRpdGluZzogYm9vbGVhbjtcbiAgY2FuRWRpdEhpc3Rvcnk6IGJvb2xlYW47XG4gIGNhbkRlbGV0ZUhpc3Rvcnk6IGJvb2xlYW47XG4gIHRyYW5zRGF0ZTogc3RyaW5nO1xuICBzZXRNb2RhbEVycm9yOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgaGFuZGxlRW5hYmxlRWRpdDogKCkgPT4gdm9pZDtcbiAgaGFuZGxlQ2FuY2VsRWRpdDogKCkgPT4gdm9pZDtcbiAgaGFuZGxlVXBkYXRlOiAoKSA9PiBQcm9taXNlPGJvb2xlYW4+O1xuICBoYW5kbGVEZWxldGU6ICgpID0+IFByb21pc2U8Ym9vbGVhbj47XG4gIG9wZW5Db25maXJtOiAob3B0czoge1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgbWVzc2FnZTogc3RyaW5nO1xuICAgIGNvbmZpcm1UZXh0Pzogc3RyaW5nO1xuICAgIG9uQ29uZmlybT86ICgpID0+IFByb21pc2U8Ym9vbGVhbiB8IHZvaWQ+IHwgYm9vbGVhbiB8IHZvaWQ7XG4gIH0pID0+IHZvaWQ7XG4gIGNsb3NlQ29uZmlybTogKCkgPT4gdm9pZDtcbn07XG5cbi8vIENvb3JkaW5hdGVzIHRvcGJhciBpY29uIHZpc2liaWxpdHkgYW5kIGFjdGlvbiBldmVudHMgZm9yIGRldGFpbCBwYWdlLlxuZXhwb3J0IGNvbnN0IHVzZURldGFpbFRvcGJhckFjdGlvbnMgPSAoe1xuICBidXN5LFxuICBtb2RhbE9wZW4sXG4gIGlzRWRpdGluZyxcbiAgY2FuRWRpdEhpc3RvcnksXG4gIGNhbkRlbGV0ZUhpc3RvcnksXG4gIHRyYW5zRGF0ZSxcbiAgc2V0TW9kYWxFcnJvcixcbiAgaGFuZGxlRW5hYmxlRWRpdCxcbiAgaGFuZGxlQ2FuY2VsRWRpdCxcbiAgaGFuZGxlVXBkYXRlLFxuICBoYW5kbGVEZWxldGUsXG4gIG9wZW5Db25maXJtLFxuICBjbG9zZUNvbmZpcm0sXG59OiBVc2VEZXRhaWxUb3BiYXJBY3Rpb25zQXJncykgPT4ge1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGVkaXRJY29uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2aXNpdEVkaXRJY29uXCIpO1xuICAgIGNvbnN0IHNhdmVJY29uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2aXNpdFNhdmVJY29uXCIpO1xuICAgIGNvbnN0IGRlbGV0ZUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlzaXREZWxldGVCdG5cIik7XG4gICAgY29uc3QgY2FuY2VsQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2aXNpdENhbmNlbEJ0blwiKTtcbiAgICBpZiAoIWVkaXRJY29uIHx8ICFzYXZlSWNvbikgcmV0dXJuO1xuICAgIGlmIChpc0VkaXRpbmcpIHtcbiAgICAgIGVkaXRJY29uLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICBzYXZlSWNvbi5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICAgICAgaWYgKGRlbGV0ZUJ0bikgZGVsZXRlQnRuLmNsYXNzTGlzdC5hZGQoXCJ0b3BiYXItaGlkZGVuXCIpO1xuICAgICAgaWYgKGNhbmNlbEJ0bikgY2FuY2VsQnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJ0b3BiYXItaGlkZGVuXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlZGl0SWNvbi5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICAgICAgc2F2ZUljb24uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgIGlmIChkZWxldGVCdG4pIGRlbGV0ZUJ0bi5jbGFzc0xpc3QucmVtb3ZlKFwidG9wYmFyLWhpZGRlblwiKTtcbiAgICAgIGlmIChjYW5jZWxCdG4pIGNhbmNlbEJ0bi5jbGFzc0xpc3QuYWRkKFwidG9wYmFyLWhpZGRlblwiKTtcbiAgICB9XG4gIH0sIFtpc0VkaXRpbmddKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IG9uRWRpdCA9ICgpID0+IHtcbiAgICAgIGlmICghY2FuRWRpdEhpc3RvcnkpIHtcbiAgICAgICAgc2hvd1Blcm1pc3Npb25Nb2RhbCgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoaXNFZGl0aW5nKSB7XG4gICAgICAgIGlmIChidXN5IHx8IG1vZGFsT3BlbikgcmV0dXJuO1xuICAgICAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xuICAgICAgICBvcGVuQ29uZmlybSh7XG4gICAgICAgICAgdGl0bGU6IGluZFQoXCJWaXNpdHNfRGV0YWlsX1NhdmVDaGFuZ2VzX1RpdGxlXCIsIFwiU2F2ZSBjaGFuZ2VzXCIpLFxuICAgICAgICAgIG1lc3NhZ2U6IGluZFQoXCJWaXNpdHNfRGV0YWlsX1NhdmVDaGFuZ2VzX0JvZHlcIiwgXCJEbyB5b3Ugd2FudCB0byBzYXZlIGNoYW5nZXM/XCIpLFxuICAgICAgICAgIGNvbmZpcm1UZXh0OiBpbmRUKFwiQ29tbW9uX1NhdmVcIiwgXCJTYXZlXCIpLFxuICAgICAgICAgIG9uQ29uZmlybTogYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgb2sgPSBhd2FpdCBoYW5kbGVVcGRhdGUoKTtcbiAgICAgICAgICAgIGlmIChvaykge1xuICAgICAgICAgICAgICBjbG9zZUNvbmZpcm0oKTtcbiAgICAgICAgICAgICAgc2V0SGlzdG9yeUZpbHRlckZvckRhdGUodHJhbnNEYXRlKTtcbiAgICAgICAgICAgICAgYXdhaXQgd2FpdCgyMDApO1xuICAgICAgICAgICAgICBmbGFzaEFjdGlvbk1hcmsoXCJva1Byb2Nlc3NcIiwgMTIwMCk7XG4gICAgICAgICAgICAgIGF3YWl0IHdhaXQoMTIwMCk7XG4gICAgICAgICAgICAgIHdpbmRvdy5fX2luZEJ5cGFzc05hdmlnYXRpb25HdWFyZE9uY2U/LigpO1xuICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL0hpc3RvcmlhbC9IaXN0b3J5XCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gb2s7XG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBoYW5kbGVFbmFibGVFZGl0KCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IG9uRGVsZXRlID0gKCkgPT4ge1xuICAgICAgaWYgKCFjYW5EZWxldGVIaXN0b3J5KSB7XG4gICAgICAgIHNob3dQZXJtaXNzaW9uTW9kYWwoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKGJ1c3kgfHwgbW9kYWxPcGVuKSByZXR1cm47XG4gICAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xuICAgICAgb3BlbkNvbmZpcm0oe1xuICAgICAgICB0aXRsZTogaW5kVChcIlZpc2l0c19EZXRhaWxfRGVsZXRlQWN0aXZpdHlfVGl0bGVcIiwgXCJEZWxldGUgYWN0aXZpdHlcIiksXG4gICAgICAgIG1lc3NhZ2U6IGluZFQoXCJWaXNpdHNfRGV0YWlsX0RlbGV0ZUFjdGl2aXR5X0JvZHlcIiwgXCJEbyB5b3Ugd2FudCB0byBkZWxldGUgdGhpcyBhY3Rpdml0eT9cIiksXG4gICAgICAgIGNvbmZpcm1UZXh0OiBpbmRUKFwiQ29tbW9uX0RlbGV0ZVwiLCBcIkRlbGV0ZVwiKSxcbiAgICAgICAgb25Db25maXJtOiBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgY29uc3Qgb2sgPSBhd2FpdCBoYW5kbGVEZWxldGUoKTtcbiAgICAgICAgICBpZiAob2spIHtcbiAgICAgICAgICAgIGNsb3NlQ29uZmlybSgpO1xuICAgICAgICAgICAgc2V0SGlzdG9yeUZpbHRlckZvckRhdGUodHJhbnNEYXRlKTtcbiAgICAgICAgICAgIGF3YWl0IHdhaXQoMjAwKTtcbiAgICAgICAgICAgIGZsYXNoQWN0aW9uTWFyayhcIm9rRGVsUHJvY2Vzc1wiLCAxMjAwKTtcbiAgICAgICAgICAgIGF3YWl0IHdhaXQoMTIwMCk7XG4gICAgICAgICAgICB3aW5kb3cuX19pbmRCeXBhc3NOYXZpZ2F0aW9uR3VhcmRPbmNlPy4oKTtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvSGlzdG9yaWFsL0hpc3RvcnlcIjtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG9rO1xuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIGNvbnN0IG9uQ2FuY2VsRWRpdCA9ICgpID0+IHtcbiAgICAgIGlmIChidXN5IHx8IG1vZGFsT3BlbikgcmV0dXJuO1xuICAgICAgaGFuZGxlQ2FuY2VsRWRpdCgpO1xuICAgIH07XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInZpc2l0LWVkaXRcIiwgb25FZGl0KTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInZpc2l0LWRlbGV0ZVwiLCBvbkRlbGV0ZSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJ2aXNpdC1jYW5jZWwtZWRpdFwiLCBvbkNhbmNlbEVkaXQpO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInZpc2l0LWVkaXRcIiwgb25FZGl0KTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwidmlzaXQtZGVsZXRlXCIsIG9uRGVsZXRlKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwidmlzaXQtY2FuY2VsLWVkaXRcIiwgb25DYW5jZWxFZGl0KTtcbiAgICB9O1xuICB9LCBbXG4gICAgYnVzeSxcbiAgICBjYW5EZWxldGVIaXN0b3J5LFxuICAgIGNhbkVkaXRIaXN0b3J5LFxuICAgIGNsb3NlQ29uZmlybSxcbiAgICBoYW5kbGVDYW5jZWxFZGl0LFxuICAgIGhhbmRsZURlbGV0ZSxcbiAgICBoYW5kbGVFbmFibGVFZGl0LFxuICAgIGhhbmRsZVVwZGF0ZSxcbiAgICBpc0VkaXRpbmcsXG4gICAgbW9kYWxPcGVuLFxuICAgIG9wZW5Db25maXJtLFxuICAgIHNldE1vZGFsRXJyb3IsXG4gICAgdHJhbnNEYXRlLFxuICBdKTtcbn07XG4iLCAiXHVGRUZGaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZVJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgZ2V0U2Vzc2lvblZhbHVlV2l0aEV4cGlyeSwgcmVtb3ZlU2Vzc2lvblZhbHVlV2l0aEV4cGlyeSwgc2V0U2Vzc2lvblZhbHVlV2l0aEV4cGlyeSB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9zZXNzaW9uRXhwaXJ5LnRzXCI7XG5cbmNvbnN0IEVESVRfTU9ERV9UVExfTVMgPSA2ICogNjAgKiA2MCAqIDEwMDA7XG5jb25zdCBERVRBSUxfRFJBRlRfVFRMX01TID0gMjQgKiA2MCAqIDYwICogMTAwMDtcblxudHlwZSBVc2VEZXRhaWxFZGl0U2Vzc2lvbkFyZ3MgPSB7XG4gIGFjdGl2aWRhZElkOiBzdHJpbmc7XG4gIHJlY0lkOiBzdHJpbmc7XG4gIGNhbkVkaXRIaXN0b3J5OiBib29sZWFuO1xuICBpc0VkaXRpbmc6IGJvb2xlYW47XG4gIHNldElzRWRpdGluZzogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248Ym9vbGVhbj4+O1xuICB0cmFuc0RhdGU6IHN0cmluZztcbiAgdmlzaXRUeXBlOiBzdHJpbmc7XG4gIGFzaXN0ZW50ZVRpcG86IHN0cmluZztcbiAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgY29tZW50YXJpb3M6IHN0cmluZztcbiAgYW50ZWNlZGVudGVzOiBzdHJpbmc7XG4gIGNvbmNsdXNpb25lczogc3RyaW5nO1xuICBzZXRUcmFuc0RhdGU6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPHN0cmluZz4+O1xuICBzZXRWaXNpdFR5cGU6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPHN0cmluZz4+O1xuICBzZXRBc2lzdGVudGVUaXBvOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcbiAgc2V0RGVzY3JpcHRpb246IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPHN0cmluZz4+O1xuICBzZXRDb21lbnRhcmlvczogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XG4gIHNldEFudGVjZWRlbnRlczogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XG4gIHNldENvbmNsdXNpb25lczogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XG59O1xuXG50eXBlIERldGFpbERyYWZ0VmFsdWVzID0ge1xuICB0cmFuc0RhdGU6IHN0cmluZztcbiAgdmlzaXRUeXBlOiBzdHJpbmc7XG4gIGFzaXN0ZW50ZVRpcG86IHN0cmluZztcbiAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgY29tZW50YXJpb3M6IHN0cmluZztcbiAgYW50ZWNlZGVudGVzOiBzdHJpbmc7XG4gIGNvbmNsdXNpb25lczogc3RyaW5nO1xufTtcblxuLy8gTWFuYWdlcyBlZGl0LW1vZGUgc2Vzc2lvbiBmbGFncyBhbmQgZGV0YWlsIGRyYWZ0IHBlcnNpc3RlbmNlLlxuZXhwb3J0IGNvbnN0IHVzZURldGFpbEVkaXRTZXNzaW9uID0gKHtcbiAgYWN0aXZpZGFkSWQsXG4gIHJlY0lkLFxuICBjYW5FZGl0SGlzdG9yeSxcbiAgaXNFZGl0aW5nLFxuICBzZXRJc0VkaXRpbmcsXG4gIHRyYW5zRGF0ZSxcbiAgdmlzaXRUeXBlLFxuICBhc2lzdGVudGVUaXBvLFxuICBkZXNjcmlwdGlvbixcbiAgY29tZW50YXJpb3MsXG4gIGFudGVjZWRlbnRlcyxcbiAgY29uY2x1c2lvbmVzLFxuICBzZXRUcmFuc0RhdGUsXG4gIHNldFZpc2l0VHlwZSxcbiAgc2V0QXNpc3RlbnRlVGlwbyxcbiAgc2V0RGVzY3JpcHRpb24sXG4gIHNldENvbWVudGFyaW9zLFxuICBzZXRBbnRlY2VkZW50ZXMsXG4gIHNldENvbmNsdXNpb25lcyxcbn06IFVzZURldGFpbEVkaXRTZXNzaW9uQXJncykgPT4ge1xuICBjb25zdCBlZGl0TW9kZUtleVJlZiA9IHVzZVJlZihcIlwiKTtcbiAgY29uc3QgZHJhZnRLZXlSZWYgPSB1c2VSZWYoXCJcIik7XG4gIGNvbnN0IGRyYWZ0UGVyc2lzdFRpbWVyUmVmID0gdXNlUmVmPG51bWJlciB8IG51bGw+KG51bGwpO1xuXG4gIC8vIFBlcnNpc3QgZWRpdCBtb2RlIHdoaWxlIHVzZXIgbmF2aWdhdGVzIHRvIHRoZSB0ZXh0IGVkaXRvciBhbmQgYmFjay5cbiAgY29uc3Qgc3luY0VkaXRNb2RlRmxhZyA9IHVzZUNhbGxiYWNrKChlbmFibGVkOiBib29sZWFuKSA9PiB7XG4gICAgY29uc3Qga2V5ID0gZWRpdE1vZGVLZXlSZWYuY3VycmVudDtcbiAgICBpZiAoIWtleSkgcmV0dXJuO1xuICAgIGlmIChlbmFibGVkKSB7XG4gICAgICBzZXRTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KGtleSwgXCJ0cnVlXCIsIEVESVRfTU9ERV9UVExfTVMpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZW1vdmVTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KGtleSk7XG4gIH0sIFtdKTtcblxuICBjb25zdCBzeW5jRWRpdE1vZGVPbkVudHJ5ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGNvbnN0IGJhc2VJZCA9IGFjdGl2aWRhZElkIHx8IHJlY0lkIHx8IFwiZGVmYXVsdFwiO1xuICAgIGNvbnN0IGtleSA9IGBpbmRfdmlzaXRfZWRpdF8ke2Jhc2VJZH1gO1xuICAgIGNvbnN0IHJldHVybktleSA9IGAke2tleX1fcmV0dXJuYDtcbiAgICBjb25zdCBkcmFmdEtleSA9IGBpbmRfdmlzaXRfZHJhZnRfJHtiYXNlSWR9YDtcbiAgICBlZGl0TW9kZUtleVJlZi5jdXJyZW50ID0ga2V5O1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGFsbG93UmVzdG9yZSA9IGdldFNlc3Npb25WYWx1ZVdpdGhFeHBpcnkocmV0dXJuS2V5KSA9PT0gXCIxXCI7XG4gICAgICBpZiAoYWxsb3dSZXN0b3JlKSB7XG4gICAgICAgIHJlbW92ZVNlc3Npb25WYWx1ZVdpdGhFeHBpcnkocmV0dXJuS2V5KTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNhbkVkaXRIaXN0b3J5ICYmIGFsbG93UmVzdG9yZSAmJiBnZXRTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KGtleSkgPT09IFwidHJ1ZVwiKSB7XG4gICAgICAgIHNldElzRWRpdGluZyh0cnVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNldElzRWRpdGluZyhmYWxzZSk7XG4gICAgICAgIHJlbW92ZVNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoa2V5KTtcbiAgICAgICAgcmVtb3ZlU2Vzc2lvblZhbHVlV2l0aEV4cGlyeShkcmFmdEtleSk7XG4gICAgICB9XG5cbiAgICAgIGlmICghY2FuRWRpdEhpc3RvcnkpIHtcbiAgICAgICAgcmVtb3ZlU2Vzc2lvblZhbHVlV2l0aEV4cGlyeShrZXkpO1xuICAgICAgICByZW1vdmVTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KGRyYWZ0S2V5KTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIHtcbiAgICAgIC8qIGlnbm9yZSAqL1xuICAgIH1cbiAgfSwgW2FjdGl2aWRhZElkLCBjYW5FZGl0SGlzdG9yeSwgcmVjSWQsIHNldElzRWRpdGluZ10pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc3luY0VkaXRNb2RlT25FbnRyeSgpO1xuICB9LCBbc3luY0VkaXRNb2RlT25FbnRyeV0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3Qgb25QYWdlU2hvdyA9IChldmVudDogUGFnZVRyYW5zaXRpb25FdmVudCkgPT4ge1xuICAgICAgY29uc3QgbmF2RW50cnkgPSB0eXBlb2YgcGVyZm9ybWFuY2UgIT09IFwidW5kZWZpbmVkXCIgJiYgcGVyZm9ybWFuY2UuZ2V0RW50cmllc0J5VHlwZVxuICAgICAgICA/IChwZXJmb3JtYW5jZS5nZXRFbnRyaWVzQnlUeXBlKFwibmF2aWdhdGlvblwiKVswXSBhcyBQZXJmb3JtYW5jZU5hdmlnYXRpb25UaW1pbmcgfCB1bmRlZmluZWQpXG4gICAgICAgIDogdW5kZWZpbmVkO1xuICAgICAgY29uc3QgaXNCYWNrRm9yd2FyZCA9IG5hdkVudHJ5Py50eXBlID09PSBcImJhY2tfZm9yd2FyZFwiO1xuICAgICAgaWYgKGV2ZW50Py5wZXJzaXN0ZWQgfHwgaXNCYWNrRm9yd2FyZCkge1xuICAgICAgICBzeW5jRWRpdE1vZGVPbkVudHJ5KCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicGFnZXNob3dcIiwgb25QYWdlU2hvdyk7XG4gICAgcmV0dXJuICgpID0+IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicGFnZXNob3dcIiwgb25QYWdlU2hvdyk7XG4gIH0sIFtzeW5jRWRpdE1vZGVPbkVudHJ5XSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBrZXkgPSBgaW5kX3Zpc2l0X2RyYWZ0XyR7YWN0aXZpZGFkSWQgfHwgcmVjSWQgfHwgXCJkZWZhdWx0XCJ9YDtcbiAgICBkcmFmdEtleVJlZi5jdXJyZW50ID0ga2V5O1xuICB9LCBbYWN0aXZpZGFkSWQsIHJlY0lkXSk7XG5cbiAgY29uc3Qgc2F2ZURyYWZ0ID0gdXNlQ2FsbGJhY2soKGRyYWZ0OiBEZXRhaWxEcmFmdFZhbHVlcykgPT4ge1xuICAgIGNvbnN0IGtleSA9IGRyYWZ0S2V5UmVmLmN1cnJlbnQ7XG4gICAgaWYgKCFrZXkpIHJldHVybjtcbiAgICBzZXRTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KGtleSwgSlNPTi5zdHJpbmdpZnkoZHJhZnQpLCBERVRBSUxfRFJBRlRfVFRMX01TKTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IGNsZWFyRHJhZnQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgY29uc3Qga2V5ID0gZHJhZnRLZXlSZWYuY3VycmVudDtcbiAgICBpZiAoIWtleSkgcmV0dXJuO1xuICAgIHJlbW92ZVNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoa2V5KTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IGFwcGx5RHJhZnRWYWx1ZXMgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgY29uc3Qga2V5ID0gZHJhZnRLZXlSZWYuY3VycmVudDtcbiAgICBpZiAoIWtleSkgcmV0dXJuO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJhdyA9IGdldFNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoa2V5KTtcbiAgICAgIGlmICghcmF3KSByZXR1cm47XG4gICAgICBjb25zdCBkcmFmdCA9IEpTT04ucGFyc2UocmF3KSBhcyBQYXJ0aWFsPERldGFpbERyYWZ0VmFsdWVzPjtcbiAgICAgIGlmICghZHJhZnQgfHwgdHlwZW9mIGRyYWZ0ICE9PSBcIm9iamVjdFwiKSByZXR1cm47XG5cbiAgICAgIGlmIChkcmFmdC50cmFuc0RhdGUgIT09IHVuZGVmaW5lZCkgc2V0VHJhbnNEYXRlKFN0cmluZyhkcmFmdC50cmFuc0RhdGUpKTtcbiAgICAgIGlmIChkcmFmdC52aXNpdFR5cGUgIT09IHVuZGVmaW5lZCkgc2V0VmlzaXRUeXBlKFN0cmluZyhkcmFmdC52aXNpdFR5cGUpKTtcbiAgICAgIGlmIChkcmFmdC5hc2lzdGVudGVUaXBvICE9PSB1bmRlZmluZWQpIHNldEFzaXN0ZW50ZVRpcG8oU3RyaW5nKGRyYWZ0LmFzaXN0ZW50ZVRpcG8pKTtcbiAgICAgIGlmIChkcmFmdC5kZXNjcmlwdGlvbiAhPT0gdW5kZWZpbmVkKSBzZXREZXNjcmlwdGlvbihTdHJpbmcoZHJhZnQuZGVzY3JpcHRpb24pKTtcbiAgICAgIGlmIChkcmFmdC5jb21lbnRhcmlvcyAhPT0gdW5kZWZpbmVkKSBzZXRDb21lbnRhcmlvcyhTdHJpbmcoZHJhZnQuY29tZW50YXJpb3MpKTtcbiAgICAgIGlmIChkcmFmdC5hbnRlY2VkZW50ZXMgIT09IHVuZGVmaW5lZCkgc2V0QW50ZWNlZGVudGVzKFN0cmluZyhkcmFmdC5hbnRlY2VkZW50ZXMpKTtcbiAgICAgIGlmIChkcmFmdC5jb25jbHVzaW9uZXMgIT09IHVuZGVmaW5lZCkgc2V0Q29uY2x1c2lvbmVzKFN0cmluZyhkcmFmdC5jb25jbHVzaW9uZXMpKTtcbiAgICB9IGNhdGNoIHtcbiAgICAgIC8qIGlnbm9yZSAqL1xuICAgIH1cbiAgfSwgW3NldEFudGVjZWRlbnRlcywgc2V0QXNpc3RlbnRlVGlwbywgc2V0Q29tZW50YXJpb3MsIHNldENvbmNsdXNpb25lcywgc2V0RGVzY3JpcHRpb24sIHNldFRyYW5zRGF0ZSwgc2V0VmlzaXRUeXBlXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWlzRWRpdGluZykge1xuICAgICAgaWYgKGRyYWZ0UGVyc2lzdFRpbWVyUmVmLmN1cnJlbnQpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KGRyYWZ0UGVyc2lzdFRpbWVyUmVmLmN1cnJlbnQpO1xuICAgICAgICBkcmFmdFBlcnNpc3RUaW1lclJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoZHJhZnRQZXJzaXN0VGltZXJSZWYuY3VycmVudCkge1xuICAgICAgY2xlYXJUaW1lb3V0KGRyYWZ0UGVyc2lzdFRpbWVyUmVmLmN1cnJlbnQpO1xuICAgIH1cblxuICAgIGRyYWZ0UGVyc2lzdFRpbWVyUmVmLmN1cnJlbnQgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBkcmFmdFBlcnNpc3RUaW1lclJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICAgIHNhdmVEcmFmdCh7XG4gICAgICAgIHRyYW5zRGF0ZSxcbiAgICAgICAgdmlzaXRUeXBlLFxuICAgICAgICBhc2lzdGVudGVUaXBvLFxuICAgICAgICBkZXNjcmlwdGlvbixcbiAgICAgICAgY29tZW50YXJpb3MsXG4gICAgICAgIGFudGVjZWRlbnRlcyxcbiAgICAgICAgY29uY2x1c2lvbmVzLFxuICAgICAgfSk7XG4gICAgfSwgMTgwKTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBpZiAoZHJhZnRQZXJzaXN0VGltZXJSZWYuY3VycmVudCkge1xuICAgICAgICBjbGVhclRpbWVvdXQoZHJhZnRQZXJzaXN0VGltZXJSZWYuY3VycmVudCk7XG4gICAgICAgIGRyYWZ0UGVyc2lzdFRpbWVyUmVmLmN1cnJlbnQgPSBudWxsO1xuICAgICAgfVxuICAgIH07XG4gIH0sIFthbnRlY2VkZW50ZXMsIGFzaXN0ZW50ZVRpcG8sIGNvbWVudGFyaW9zLCBjb25jbHVzaW9uZXMsIGRlc2NyaXB0aW9uLCBpc0VkaXRpbmcsIHNhdmVEcmFmdCwgdHJhbnNEYXRlLCB2aXNpdFR5cGVdKTtcblxuICByZXR1cm4ge1xuICAgIGVkaXRNb2RlS2V5UmVmLFxuICAgIHN5bmNFZGl0TW9kZUZsYWcsXG4gICAgY2xlYXJEcmFmdCxcbiAgICBhcHBseURyYWZ0VmFsdWVzLFxuICB9O1xufTtcclxuIiwgIlx1RkVGRmltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjayB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgZmV0Y2hKc29uIH0gZnJvbSBcIi4uLy4uLy4uL3NlcnZpY2VzL2FwaVNlcnZpY2UudHNcIjtcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuaW1wb3J0IHsgc2hvd1Blcm1pc3Npb25Nb2RhbCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9wZXJtaXNzaW9ucy50c1wiO1xuaW1wb3J0IHsgZmxhc2hBY3Rpb25NYXJrIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3Zpc2l0YXNIaXN0b3J5LnRzXCI7XG5cbnR5cGUgT3B0aW9uTGlrZSA9IHtcbiAgdmFsdWU/OiBzdHJpbmcgfCBudW1iZXI7XG4gIFZhbHVlPzogc3RyaW5nIHwgbnVtYmVyO1xuICB0ZXh0Pzogc3RyaW5nO1xuICBUZXh0Pzogc3RyaW5nO1xufTtcblxudHlwZSBWaXNpdENvbW1hbmRSZXNwb25zZSA9IHtcbiAgc3VjY2Vzcz86IGJvb2xlYW47XG4gIG1lc3NhZ2U/OiBzdHJpbmc7XG4gIFN1Y2Nlc3M/OiBib29sZWFuO1xuICBNZXNzYWdlPzogc3RyaW5nO1xufTtcblxuY29uc3QgaXNDb21tYW5kU3VjY2VzcyA9IChyZXNwb25zZTogVmlzaXRDb21tYW5kUmVzcG9uc2UpOiBib29sZWFuID0+IHtcbiAgcmV0dXJuIHJlc3BvbnNlLnN1Y2Nlc3MgPT09IHRydWUgfHwgcmVzcG9uc2UuU3VjY2VzcyA9PT0gdHJ1ZTtcbn07XG5cbmNvbnN0IGdldENvbW1hbmRNZXNzYWdlID0gKHJlc3BvbnNlOiBWaXNpdENvbW1hbmRSZXNwb25zZSk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IHJhdyA9IHJlc3BvbnNlLm1lc3NhZ2UgPz8gcmVzcG9uc2UuTWVzc2FnZTtcbiAgcmV0dXJuIHR5cGVvZiByYXcgPT09IFwic3RyaW5nXCIgPyByYXcudHJpbSgpIDogXCJcIjtcbn07XG5cbnR5cGUgVXNlRGV0YWlsTXV0YXRpb25zQXJncyA9IHtcbiAgYnVzeTogYm9vbGVhbjtcbiAgaXNFZGl0aW5nOiBib29sZWFuO1xuICBjYW5FZGl0SGlzdG9yeTogYm9vbGVhbjtcbiAgY2FuRGVsZXRlSGlzdG9yeTogYm9vbGVhbjtcbiAgcmVjSWQ6IHN0cmluZztcbiAgYWNjb3VudE51bTogc3RyaW5nO1xuICB0cmFuc0RhdGU6IHN0cmluZztcbiAgdmlzaXRUeXBlOiBzdHJpbmc7XG4gIGFzaXN0ZW50ZVRpcG86IHN0cmluZztcbiAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgY29tZW50YXJpb3M6IHN0cmluZztcbiAgYW50ZWNlZGVudGVzOiBzdHJpbmc7XG4gIGNvbmNsdXNpb25lczogc3RyaW5nO1xuICB2aXNpdFR5cGVzOiBPcHRpb25MaWtlW107XG4gIGFzaXN0ZW50ZVRpcG9zOiBPcHRpb25MaWtlW107XG4gIGRlZmF1bHRWaXNpdFR5cGU6IHN0cmluZztcbiAgcmF3SW5pdGlhbFZpc2l0VHlwZTogc3RyaW5nO1xuICByYXdJbml0aWFsQXNpc3RlbnRlOiBzdHJpbmc7XG4gIG1hdGNoT3B0aW9uVmFsdWU6IChvcHRpb25zOiBPcHRpb25MaWtlW10sIHJhdzogdW5rbm93bikgPT4gc3RyaW5nO1xuICBjbGVhckRyYWZ0OiAoKSA9PiB2b2lkO1xuICBzeW5jRWRpdE1vZGVGbGFnOiAoZW5hYmxlZDogYm9vbGVhbikgPT4gdm9pZDtcbiAgc2V0TW9kYWxFcnJvcjogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XG4gIHNldEJ1c3k6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPGJvb2xlYW4+PjtcbiAgc2V0U3RhdHVzOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcbiAgc2V0SXNFZGl0aW5nOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxib29sZWFuPj47XG59O1xuXG4vLyBFbmNhcHN1bGF0ZXMgdXBkYXRlIGFuZCBkZWxldGUgbXV0YXRpb25zIGZvciBkZXRhaWwgZm9ybSBzdGF0ZS5cbmV4cG9ydCBjb25zdCB1c2VEZXRhaWxNdXRhdGlvbnMgPSAoe1xuICBidXN5LFxuICBpc0VkaXRpbmcsXG4gIGNhbkVkaXRIaXN0b3J5LFxuICBjYW5EZWxldGVIaXN0b3J5LFxuICByZWNJZCxcbiAgYWNjb3VudE51bSxcbiAgdHJhbnNEYXRlLFxuICB2aXNpdFR5cGUsXG4gIGFzaXN0ZW50ZVRpcG8sXG4gIGRlc2NyaXB0aW9uLFxuICBjb21lbnRhcmlvcyxcbiAgYW50ZWNlZGVudGVzLFxuICBjb25jbHVzaW9uZXMsXG4gIHZpc2l0VHlwZXMsXG4gIGFzaXN0ZW50ZVRpcG9zLFxuICBkZWZhdWx0VmlzaXRUeXBlLFxuICByYXdJbml0aWFsVmlzaXRUeXBlLFxuICByYXdJbml0aWFsQXNpc3RlbnRlLFxuICBtYXRjaE9wdGlvblZhbHVlLFxuICBjbGVhckRyYWZ0LFxuICBzeW5jRWRpdE1vZGVGbGFnLFxuICBzZXRNb2RhbEVycm9yLFxuICBzZXRCdXN5LFxuICBzZXRTdGF0dXMsXG4gIHNldElzRWRpdGluZyxcbn06IFVzZURldGFpbE11dGF0aW9uc0FyZ3MpID0+IHtcbiAgY29uc3QgaGFuZGxlVXBkYXRlID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xuICAgIGlmIChidXN5IHx8ICFpc0VkaXRpbmcpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoIWNhbkVkaXRIaXN0b3J5KSB7XG4gICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgc2V0TW9kYWxFcnJvcihcIlwiKTtcbiAgICBzZXRCdXN5KHRydWUpO1xuICAgIHNldFN0YXR1cyhpbmRUKFwiVmlzaXRzX0RldGFpbF9VcGRhdGluZ1wiLCBcIlVwZGF0aW5nIGFjdGl2aXR5Li4uXCIpKTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCBub3JtYWxpemVkVmlzaXRUeXBlID1cbiAgICAgICAgbWF0Y2hPcHRpb25WYWx1ZSh2aXNpdFR5cGVzLCB2aXNpdFR5cGUpIHx8XG4gICAgICAgIG1hdGNoT3B0aW9uVmFsdWUodmlzaXRUeXBlcywgcmF3SW5pdGlhbFZpc2l0VHlwZSkgfHxcbiAgICAgICAgZGVmYXVsdFZpc2l0VHlwZTtcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRBc2lzdGVudGVUaXBvID1cbiAgICAgICAgbWF0Y2hPcHRpb25WYWx1ZShhc2lzdGVudGVUaXBvcywgYXNpc3RlbnRlVGlwbykgfHxcbiAgICAgICAgbWF0Y2hPcHRpb25WYWx1ZShhc2lzdGVudGVUaXBvcywgcmF3SW5pdGlhbEFzaXN0ZW50ZSkgfHxcbiAgICAgICAgcmF3SW5pdGlhbEFzaXN0ZW50ZTtcblxuICAgICAgY29uc3QgcGF5bG9hZCA9IHtcbiAgICAgICAgYWNjb3VudE51bSxcbiAgICAgICAgdmlzaXRUeXBlOiBub3JtYWxpemVkVmlzaXRUeXBlLFxuICAgICAgICBhc2lzdGVudGVUaXBvOiBub3JtYWxpemVkQXNpc3RlbnRlVGlwbyxcbiAgICAgICAgZGVzY3JpcHRpb24sXG4gICAgICAgIHRyYW5zRGF0ZSxcbiAgICAgICAgY29tZW50YXJpb3MsXG4gICAgICAgIGFudGVjZWRlbnRlcyxcbiAgICAgICAgY29uY2x1c2lvbmVzLFxuICAgICAgfTtcblxuICAgICAgY29uc3Qgc2FmZVJlY0lkID0gZW5jb2RlVVJJQ29tcG9uZW50KHJlY0lkKTtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPFZpc2l0Q29tbWFuZFJlc3BvbnNlPihgL1Zpc2l0YXMvVXBkYXRlQWN0aXZpdHkvJHtzYWZlUmVjSWR9YCwge1xuICAgICAgICBtZXRob2Q6IFwiUFVUXCIsXG4gICAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGF5bG9hZCksXG4gICAgICB9KTtcblxuICAgICAgaWYgKCFpc0NvbW1hbmRTdWNjZXNzKHJlc3BvbnNlKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZ2V0Q29tbWFuZE1lc3NhZ2UocmVzcG9uc2UpIHx8IGluZFQoXCJWaXNpdHNfRGV0YWlsX1VwZGF0ZUZhaWxlZFwiLCBcIlVwZGF0ZSBmYWlsZWQuXCIpKTtcbiAgICAgIH1cblxuICAgICAgc2V0U3RhdHVzKGluZFQoXCJWaXNpdHNfRGV0YWlsX1VwZGF0ZWRcIiwgXCJBY3Rpdml0eSB1cGRhdGVkXCIpKTtcbiAgICAgIHNldElzRWRpdGluZyhmYWxzZSk7XG4gICAgICBzeW5jRWRpdE1vZGVGbGFnKGZhbHNlKTtcbiAgICAgIGNsZWFyRHJhZnQoKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zdCBtZXNzYWdlID0gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciAmJiBlcnJvci5tZXNzYWdlXG4gICAgICAgID8gZXJyb3IubWVzc2FnZVxuICAgICAgICA6IGluZFQoXCJWaXNpdHNfRGV0YWlsX1VwZGF0ZUVycm9yXCIsIFwiVXBkYXRlIGVycm9yLlwiKTtcbiAgICAgIHNldE1vZGFsRXJyb3IobWVzc2FnZSk7XG4gICAgICBzZXRTdGF0dXMobWVzc2FnZSk7XG4gICAgICBmbGFzaEFjdGlvbk1hcmsoXCJlcnJvclByb2Nlc3NcIiwgMTUwMCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldEJ1c3koZmFsc2UpO1xuICAgIH1cbiAgfSwgW1xuICAgIGFjY291bnROdW0sXG4gICAgYW50ZWNlZGVudGVzLFxuICAgIGFzaXN0ZW50ZVRpcG8sXG4gICAgYXNpc3RlbnRlVGlwb3MsXG4gICAgYnVzeSxcbiAgICBjYW5FZGl0SGlzdG9yeSxcbiAgICBjbGVhckRyYWZ0LFxuICAgIGNvbWVudGFyaW9zLFxuICAgIGNvbmNsdXNpb25lcyxcbiAgICBkZWZhdWx0VmlzaXRUeXBlLFxuICAgIGRlc2NyaXB0aW9uLFxuICAgIGlzRWRpdGluZyxcbiAgICBtYXRjaE9wdGlvblZhbHVlLFxuICAgIHJhd0luaXRpYWxBc2lzdGVudGUsXG4gICAgcmF3SW5pdGlhbFZpc2l0VHlwZSxcbiAgICByZWNJZCxcbiAgICBzZXRCdXN5LFxuICAgIHNldElzRWRpdGluZyxcbiAgICBzZXRNb2RhbEVycm9yLFxuICAgIHNldFN0YXR1cyxcbiAgICBzeW5jRWRpdE1vZGVGbGFnLFxuICAgIHRyYW5zRGF0ZSxcbiAgICB2aXNpdFR5cGUsXG4gICAgdmlzaXRUeXBlcyxcbiAgXSk7XG5cbiAgY29uc3QgaGFuZGxlRGVsZXRlID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xuICAgIGlmIChidXN5KSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKCFjYW5EZWxldGVIaXN0b3J5KSB7XG4gICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgc2V0TW9kYWxFcnJvcihcIlwiKTtcbiAgICBzZXRCdXN5KHRydWUpO1xuICAgIHNldFN0YXR1cyhpbmRUKFwiVmlzaXRzX0RldGFpbF9EZWxldGluZ1wiLCBcIkRlbGV0aW5nIGFjdGl2aXR5Li4uXCIpKTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCBzYWZlUmVjSWQgPSBlbmNvZGVVUklDb21wb25lbnQocmVjSWQpO1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248VmlzaXRDb21tYW5kUmVzcG9uc2U+KGAvVmlzaXRhcy9EZWxldGVBY3Rpdml0eS8ke3NhZmVSZWNJZH1gLCB7IG1ldGhvZDogXCJERUxFVEVcIiB9KTtcbiAgICAgIGlmICghaXNDb21tYW5kU3VjY2VzcyhyZXNwb25zZSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGdldENvbW1hbmRNZXNzYWdlKHJlc3BvbnNlKSB8fCBpbmRUKFwiVmlzaXRzX0RldGFpbF9EZWxldGVGYWlsZWRcIiwgXCJEZWxldGUgZmFpbGVkLlwiKSk7XG4gICAgICB9XG5cbiAgICAgIHNldFN0YXR1cyhpbmRUKFwiVmlzaXRzX0RldGFpbF9EZWxldGVkXCIsIFwiQWN0aXZpdHkgZGVsZXRlZFwiKSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc3QgbWVzc2FnZSA9IGVycm9yIGluc3RhbmNlb2YgRXJyb3IgJiYgZXJyb3IubWVzc2FnZVxuICAgICAgICA/IGVycm9yLm1lc3NhZ2VcbiAgICAgICAgOiBpbmRUKFwiVmlzaXRzX0RldGFpbF9EZWxldGVFcnJvclwiLCBcIkRlbGV0ZSBlcnJvci5cIik7XG4gICAgICBzZXRNb2RhbEVycm9yKG1lc3NhZ2UpO1xuICAgICAgc2V0U3RhdHVzKG1lc3NhZ2UpO1xuICAgICAgZmxhc2hBY3Rpb25NYXJrKFwiZXJyb3JQcm9jZXNzXCIsIDE1MDApO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRCdXN5KGZhbHNlKTtcbiAgICB9XG4gIH0sIFtidXN5LCBjYW5EZWxldGVIaXN0b3J5LCByZWNJZCwgc2V0QnVzeSwgc2V0TW9kYWxFcnJvciwgc2V0U3RhdHVzXSk7XG5cbiAgcmV0dXJuIHtcbiAgICBoYW5kbGVVcGRhdGUsXG4gICAgaGFuZGxlRGVsZXRlLFxuICB9O1xufTtcclxuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBEZXRhaWxGb3JtIGZyb20gXCIuL0RldGFpbEZvcm0udHN4XCI7XG5pbXBvcnQgVmlzaXRhc1BhZ2VQcm92aWRlcnMgZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9WaXNpdGFzUGFnZVByb3ZpZGVycy50c3hcIjtcbmltcG9ydCB7IG1vdW50UmVhY3RJc2xhbmQsIG1vdW50V2hlbkRvY3VtZW50UmVhZHkgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvcmVhY3RJc2xhbmQudHN4XCI7XG5cbi8vIFBhZ2UgZW50cnkgZm9yIHRoZSB2aXNpdGFzIGRldGFpbCBpc2xhbmQuXG5jb25zdCBEZXRhaWxQYWdlID0gKCkgPT4ge1xuICByZXR1cm4gKFxuICAgIDxWaXNpdGFzUGFnZVByb3ZpZGVycz5cbiAgICAgIDxEZXRhaWxGb3JtIC8+XG4gICAgPC9WaXNpdGFzUGFnZVByb3ZpZGVycz5cbiAgKTtcbn07XG5cbmNvbnN0IG1vdW50ID0gKCkgPT4ge1xuICBjb25zdCByb290RWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpc2l0YS1kZXRhaWwtcm9vdFwiKTtcbiAgaWYgKCFyb290RWwpIHJldHVybjtcblxuICBtb3VudFJlYWN0SXNsYW5kKHJvb3RFbCwgPERldGFpbFBhZ2UgLz4pO1xufTtcblxubW91bnRXaGVuRG9jdW1lbnRSZWFkeShtb3VudCk7XG5cbmV4cG9ydCBkZWZhdWx0IERldGFpbFBhZ2U7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBQUEsZ0JBQXlFOzs7QUNBbEUsSUFBTSxvQkFBb0IsQ0FBQyxPQUEyQjtBQUMzRCxNQUFJLENBQUMsR0FBSSxRQUFPLE1BQU07QUFBQSxFQUFDO0FBQ3ZCLFFBQU0sU0FBUyxDQUFDLFVBQWlCLE1BQU0sZUFBZTtBQUN0RCxRQUFNLFNBQVMsQ0FBQyxlQUFlLGVBQWUsUUFBUSxPQUFPLE9BQU87QUFDcEUsU0FBTyxRQUFRLENBQUMsUUFBUSxHQUFHLGlCQUFpQixLQUFLLE1BQU0sQ0FBQztBQUN4RCxTQUFPLE1BQU07QUFDWCxXQUFPLFFBQVEsQ0FBQyxRQUFRLEdBQUcsb0JBQW9CLEtBQUssTUFBTSxDQUFDO0FBQUEsRUFDN0Q7QUFDRjs7O0FDUk8sSUFBTSxXQUFXLENBQUMsVUFBbUIsT0FBTyxTQUFTLEVBQUUsRUFBRSxLQUFLLEVBQUUsU0FBUzs7O0FDQWhGLG1CQUF1QztB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QkFDSixPQUFPO0FBQUEsa0JBQ1AsT0FBTztBQUFBLGtCQUNQLFdBQVc7QUFBQSxrQkFDWCxpQkFBaUI7QUFBQSxnQkFDbkI7QUFBQSxnQkFDQTtBQUFBLGtCQUNFLElBQUk7QUFBQSxrQkFDSixPQUFPO0FBQUEsa0JBQ1AsT0FBTztBQUFBLGtCQUNQLFdBQVc7QUFBQSxrQkFDWCxpQkFBaUI7QUFBQSxnQkFDbkI7QUFBQSxnQkFDQTtBQUFBLGtCQUNFLElBQUk7QUFBQSxrQkFDSixPQUFPO0FBQUEsa0JBQ1AsT0FBTztBQUFBLGtCQUNQLFdBQVc7QUFBQSxrQkFDWCxpQkFBaUI7QUFBQSxnQkFDbkI7QUFBQSxjQUNGO0FBQUE7QUFBQSxVQUNGO0FBQUEsVUFFQSw0Q0FBQyxTQUFJLFdBQVUsa0RBQ2Isc0RBQUMsVUFBTSxrQkFBTyxHQUNoQjtBQUFBO0FBQUE7QUFBQSxJQUNGO0FBQUEsS0FDRjtBQUVKO0FBR2UsU0FBUixhQUE4QjtBQUNuQyxTQUNFLDRDQUFDLDRCQUFpQixpQkFBaUIsS0FBSywrQkFBK0IsMEVBQTBFLEdBQy9JLHNEQUFDLGFBQVUsR0FDYjtBQUVKOzs7QU83Zk0sSUFBQUMsc0JBQUE7QUFITixJQUFNLGFBQWEsTUFBTTtBQUN2QixTQUNFLDZDQUFDLGdDQUNDLHVEQUFDLGNBQVcsR0FDZDtBQUVKO0FBRUEsSUFBTSxRQUFRLE1BQU07QUFDbEIsUUFBTSxTQUFTLFNBQVMsZUFBZSxvQkFBb0I7QUFDM0QsTUFBSSxDQUFDLE9BQVE7QUFFYixtQkFBaUIsUUFBUSw2Q0FBQyxjQUFXLENBQUU7QUFDekM7QUFFQSx1QkFBdUIsS0FBSztBQUU1QixJQUFPLHFCQUFROyIsCiAgIm5hbWVzIjogWyJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIl0KfQo=
