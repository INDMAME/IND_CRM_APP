import {
  AppErrorBoundary_default,
  ConfirmModal,
  SingleDatePicker,
  VisitNarrativeFields_default,
  isOverflowing,
  navigateToTextEditorField,
  setPreviewAnchor,
  showPreviewTooltip,
  useConfirmDialog,
  useTapGuard,
  useTextEditorFields,
  useVisitas,
  wait
} from "./chunks/chunk-ABLOUBJU.js";
import {
  flashActionMark,
  setHistoryFilterForDate
} from "./chunks/chunk-K7MECJ5E.js";
import {
  SelectCombobox_default
} from "./chunks/chunk-BA7FE3CF.js";
import {
  Spinner_default
} from "./chunks/chunk-YSYVIEZS.js";
import {
  classNames
} from "./chunks/chunk-LKHWXI2V.js";
import {
  VisitasPageProviders_default
} from "./chunks/chunk-HGSHEZXJ.js";
import {
  canAccess,
  fetchJson,
  indT,
  showPermissionModal
} from "./chunks/chunk-V2CDSLX2.js";
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
      if (!res?.success || !res.data) {
        setStatus(res?.message || indT("Visits_Detail_LoadActivityFailed", "Failed to load activity details."));
        return;
      }
      const data = res.data;
      const rawDate = String(data.transDate ?? data.TransDate ?? "");
      setTransDate(normalizeDateToInput(rawDate));
      const rawVisitType = String(data.tipoVisita ?? data.TipoVisita ?? data.visitType ?? data.VisitType ?? "");
      setVisitType(matchOptionValue(visitTypes, rawVisitType) || defaultVisitType);
      const asistentesList = data.asistentes ?? data.Asistentes;
      const firstAsistente = Array.isArray(asistentesList) && asistentesList.length ? asistentesList[0] : null;
      const rawAsistenteTipo = String(
        data.asistenteTipo ?? data.AsistenteTipo ?? firstAsistente?.asistenteTipo ?? firstAsistente?.AsistenteTipo ?? ""
      );
      const normalizedAsistenteTipo = matchOptionValue(asistenteTipos, rawAsistenteTipo);
      setAsistenteTipo(normalizedAsistenteTipo || initialAsistente);
      setDescription(String(data.description ?? data.Description ?? ""));
      setComentarios(String(data.comentarios ?? data.Comentarios ?? ""));
      setAntecedentes(String(data.antecedentes ?? data.Antecedentes ?? ""));
      setConclusiones(String(data.conclusiones ?? data.Conclusiones ?? ""));
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
      if (!response.success) {
        throw new Error(response.message || indT("Visits_Detail_UpdateFailed", "Update failed."));
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
      if (!response.success) {
        throw new Error(response.message || indT("Visits_Detail_DeleteFailed", "Delete failed."));
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvZGV0YWlsL0RldGFpbEZvcm0udHN4IiwgIi4uL3JlYWN0L3NyYy91dGlscy9kb21HdWFyZHMudHMiLCAiLi4vcmVhY3Qvc3JjL3V0aWxzL3N0cmluZ3MudHMiLCAiLi4vcmVhY3Qvc3JjL2hvb2tzL3VzZURldGFpbEh5ZHJhdGlvbi50cyIsICIuLi9yZWFjdC9zcmMvaG9va3MvdXNlRGV0YWlsVG9wYmFyQWN0aW9ucy50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9kZXRhaWwvdXNlRGV0YWlsRWRpdFNlc3Npb24udHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvZGV0YWlsL3VzZURldGFpbE11dGF0aW9ucy50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9kZXRhaWwvRGV0YWlsUGFnZS50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZUNhbGxiYWNrLCB1c2VNZW1vIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgU2luZ2xlRGF0ZVBpY2tlciBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NpbmdsZURhdGVQaWNrZXIudHN4XCI7XG5pbXBvcnQgQ29uZmlybU1vZGFsIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvQ29uZmlybU1vZGFsLnRzeFwiO1xuaW1wb3J0IFNlbGVjdENvbWJvYm94IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvU2VsZWN0Q29tYm9ib3gudHN4XCI7XG5pbXBvcnQgQXBwRXJyb3JCb3VuZGFyeSBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0FwcEVycm9yQm91bmRhcnkudHN4XCI7XG5pbXBvcnQgeyB1c2VWaXNpdGFzIH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZVZpc2l0YXMudHNcIjtcbmltcG9ydCBTcGlubmVyIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvU3Bpbm5lci50c3hcIjtcbmltcG9ydCBWaXNpdE5hcnJhdGl2ZUZpZWxkcyBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy92aXNpdGFzL1Zpc2l0TmFycmF0aXZlRmllbGRzLnRzeFwiO1xuaW1wb3J0IHsgY2xhc3NOYW1lcyB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9jbGFzc05hbWVzLnRzXCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB7IGNhbkFjY2Vzcywgc2hvd1Blcm1pc3Npb25Nb2RhbCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9wZXJtaXNzaW9ucy50c1wiO1xuaW1wb3J0IHsgYmluZFJlYWRPbmx5R3VhcmQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvZG9tR3VhcmRzLnRzXCI7XG5pbXBvcnQgeyBoYXNWYWx1ZSB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9zdHJpbmdzLnRzXCI7XG5pbXBvcnQgeyBuYXZpZ2F0ZVRvVGV4dEVkaXRvckZpZWxkIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3RleHRFZGl0b3JOYXZpZ2F0aW9uLnRzXCI7XG5pbXBvcnQgeyBmbGFzaEFjdGlvbk1hcmsgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvdmlzaXRhc0hpc3RvcnkudHNcIjtcbmltcG9ydCB7IHNldFByZXZpZXdBbmNob3IsIHNob3dQcmV2aWV3VG9vbHRpcCwgaXNPdmVyZmxvd2luZyB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9wcmV2aWV3VG9vbHRpcC50c1wiO1xuaW1wb3J0IHsgdXNlVGFwR3VhcmQgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlVGFwR3VhcmQudHNcIjtcbmltcG9ydCB7IHVzZUNvbmZpcm1EaWFsb2cgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlQ29uZmlybURpYWxvZy50c1wiO1xuaW1wb3J0IHsgdXNlRGV0YWlsSHlkcmF0aW9uIH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZURldGFpbEh5ZHJhdGlvbi50c1wiO1xuaW1wb3J0IHsgdXNlRGV0YWlsVG9wYmFyQWN0aW9ucyB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VEZXRhaWxUb3BiYXJBY3Rpb25zLnRzXCI7XG5pbXBvcnQgeyB1c2VUZXh0RWRpdG9yRmllbGRzIH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZVRleHRFZGl0b3JGaWVsZHMudHNcIjtcbmltcG9ydCB7IHVzZURldGFpbEVkaXRTZXNzaW9uIH0gZnJvbSBcIi4vdXNlRGV0YWlsRWRpdFNlc3Npb24udHNcIjtcbmltcG9ydCB7IHVzZURldGFpbE11dGF0aW9ucyB9IGZyb20gXCIuL3VzZURldGFpbE11dGF0aW9ucy50c1wiO1xuXG5jb25zdCBFRElUT1JfUkVUVVJOX0ZMQUdfVFRMX01TID0gMiAqIDYwICogNjAgKiAxMDAwO1xuXG5jb25zdCBEZXRhaWxBcHAgPSAoKSA9PiB7XG4gIGNvbnN0IHsgdmlzaXRUeXBlcywgYXNpc3RlbnRlVGlwb3MgfSA9IHVzZVZpc2l0YXMoKTtcclxuICBjb25zdCBjYW5FZGl0SGlzdG9yeSA9IGNhbkFjY2VzcyhcIlZJU0lUQVNfSElTVE9SSUFMXCIsIFwiRWRpdFwiKTtcclxuICBjb25zdCBjYW5EZWxldGVIaXN0b3J5ID0gY2FuQWNjZXNzKFwiVklTSVRBU19ISVNUT1JJQUxcIiwgXCJGdWxsQWNjZXNzXCIpO1xyXG4gIHR5cGUgQWN0aXZpdHlEZXRhaWxQYXlsb2FkID0ge1xyXG4gICAgcmVjSWQ/OiBzdHJpbmcgfCBudW1iZXI7XHJcbiAgICBSZWNJZD86IHN0cmluZyB8IG51bWJlcjtcclxuICAgIHJlZlJlY0lkQWN0aXZpZGFkPzogc3RyaW5nIHwgbnVtYmVyO1xyXG4gICAgUmVmUmVjSWRBY3RpdmlkYWQ/OiBzdHJpbmcgfCBudW1iZXI7XHJcbiAgICBhY3RpdmlkYWRSZWNJZD86IHN0cmluZyB8IG51bWJlcjtcclxuICAgIEFjdGl2aWRhZFJlY0lkPzogc3RyaW5nIHwgbnVtYmVyO1xyXG4gICAgcmVhZE9ubHk/OiBib29sZWFuO1xyXG4gICAgYWxsb3dFZGl0PzogYm9vbGVhbjtcclxuICAgIGVkaXRNb2RlS2V5Pzogc3RyaW5nO1xyXG4gICAgW2tleTogc3RyaW5nXTogdW5rbm93bjtcclxuICB9O1xyXG5cclxuICBjb25zdCBkZXRhaWwgPSAod2luZG93Ll9fQUNUSVZJVFlfREVUQUlMX18gYXMgQWN0aXZpdHlEZXRhaWxQYXlsb2FkKSB8fCB7fTtcclxuXHJcbiAgY29uc3QgYWN0aXZpdHlSZWNJZCA9IFN0cmluZyhcclxuICAgIGRldGFpbC5yZWNJZCB8fFxyXG4gICAgICBkZXRhaWwuUmVjSWQgfHxcclxuICAgICAgZGV0YWlsLnJlZlJlY0lkQWN0aXZpZGFkIHx8XHJcbiAgICAgIGRldGFpbC5SZWZSZWNJZEFjdGl2aWRhZCB8fFxyXG4gICAgICBkZXRhaWwuYWN0aXZpZGFkUmVjSWQgfHxcclxuICAgICAgZGV0YWlsLkFjdGl2aWRhZFJlY0lkIHx8XHJcbiAgICAgIFwiXCJcclxuICApLnRyaW0oKTtcclxuXHJcbiAgY29uc3QgdGV4dEVkaXRvckJhc2VJZCA9IGFjdGl2aXR5UmVjSWQgPyBgVmlzaXRhLiR7YWN0aXZpdHlSZWNJZH1gIDogXCJWaXNpdGFcIjtcclxuICBjb25zdCBmaWVsZElkQ29tZW50YXJpb3MgPSBgJHt0ZXh0RWRpdG9yQmFzZUlkfS5Db21lbnRhcmlvc2A7XHJcbiAgY29uc3QgZmllbGRJZEFudGVjZWRlbnRlcyA9IGAke3RleHRFZGl0b3JCYXNlSWR9LkFudGVjZWRlbnRlc2A7XHJcbiAgY29uc3QgZmllbGRJZENvbmNsdXNpb25lcyA9IGAke3RleHRFZGl0b3JCYXNlSWR9LkNvbmNsdXNpb25lc2A7XHJcblxyXG4gIGNvbnN0IG5vcm1hbGl6ZURhdGVUb0lucHV0ID0gdXNlQ2FsbGJhY2soKHZhbHVlKSA9PiB7XHJcbiAgICBpZiAoIXZhbHVlKSByZXR1cm4gXCJcIjtcclxuICAgIGNvbnN0IHJhdyA9IFN0cmluZyh2YWx1ZSkudHJpbSgpO1xyXG4gICAgaWYgKCFyYXcpIHJldHVybiBcIlwiO1xyXG4gICAgLy8gQWxyZWFkeSB5eXl5LU1NLWRkXHJcbiAgICBpZiAoL15cXGR7NH0tXFxkezJ9LVxcZHsyfSQvLnRlc3QocmF3KSkgcmV0dXJuIHJhdztcclxuICAgIC8vIGRkLk1NLnl5eXkgb3IgZGQvTU0veXl5eVxyXG4gICAgaWYgKC9eXFxkezJ9Wy4vLV1cXGR7Mn1bLi8tXVxcZHs0fSQvLnRlc3QocmF3KSkge1xyXG4gICAgICBjb25zdCBwYXJ0cyA9IHJhdy5zcGxpdCgvWy4vLV0vKS5tYXAoKHApID0+IHBhcnNlSW50KHAsIDEwKSk7XHJcbiAgICAgIGlmIChwYXJ0cy5sZW5ndGggPT09IDMgJiYgIU51bWJlci5pc05hTihwYXJ0c1swXSkgJiYgIU51bWJlci5pc05hTihwYXJ0c1sxXSkgJiYgIU51bWJlci5pc05hTihwYXJ0c1syXSkpIHtcclxuICAgICAgICBjb25zdCBbZCwgbSwgeV0gPSBwYXJ0cztcclxuICAgICAgICBjb25zdCBtbSA9IFN0cmluZyhtKS5wYWRTdGFydCgyLCBcIjBcIik7XHJcbiAgICAgICAgY29uc3QgZGQgPSBTdHJpbmcoZCkucGFkU3RhcnQoMiwgXCIwXCIpO1xyXG4gICAgICAgIHJldHVybiBgJHt5fS0ke21tfS0ke2RkfWA7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbnN0IGR0ID0gbmV3IERhdGUocmF3KTtcclxuICAgIGlmICghTnVtYmVyLmlzTmFOKGR0LmdldFRpbWUoKSkpIHtcclxuICAgICAgY29uc3QgeXl5eSA9IGR0LmdldEZ1bGxZZWFyKCk7XHJcbiAgICAgIGNvbnN0IG1tID0gU3RyaW5nKGR0LmdldE1vbnRoKCkgKyAxKS5wYWRTdGFydCgyLCBcIjBcIik7XHJcbiAgICAgIGNvbnN0IGRkID0gU3RyaW5nKGR0LmdldERhdGUoKSkucGFkU3RhcnQoMiwgXCIwXCIpO1xyXG4gICAgICByZXR1cm4gYCR7eXl5eX0tJHttbX0tJHtkZH1gO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFwiXCI7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBtYXRjaE9wdGlvblZhbHVlID0gdXNlQ2FsbGJhY2soKG9wdGlvbnMsIHJhdykgPT4ge1xyXG4gICAgaWYgKHJhdyA9PSBudWxsKSByZXR1cm4gXCJcIjtcclxuICAgIGNvbnN0IHJhd1N0ciA9IFN0cmluZyhyYXcpLnRyaW0oKTtcclxuICAgIGlmICghcmF3U3RyKSByZXR1cm4gXCJcIjtcclxuXHJcbiAgICBjb25zdCBub3JtYWxpemVUZXh0ID0gKHMpID0+XHJcbiAgICAgIFN0cmluZyhzIHx8IFwiXCIpXHJcbiAgICAgICAgLnRvTG93ZXJDYXNlKClcclxuICAgICAgICAubm9ybWFsaXplKFwiTkZEXCIpXHJcbiAgICAgICAgLnJlcGxhY2UoL1tcXHUwMzAwLVxcdTAzNmZdL2csIFwiXCIpXHJcbiAgICAgICAgLnRyaW0oKTtcclxuXHJcbiAgICBjb25zdCByYXdOb3JtID0gbm9ybWFsaXplVGV4dChyYXdTdHIpO1xyXG4gICAgY29uc3QgYWx0Tm9ybSA9IHJhd05vcm0uZW5kc1dpdGgoXCJvXCIpID8gYCR7cmF3Tm9ybS5zbGljZSgwLCAtMSl9YWAgOiByYXdOb3JtO1xyXG5cclxuICAgIGNvbnN0IG1hdGNoID0gKG9wdGlvbnMgfHwgW10pLmZpbmQoKG8pID0+IHtcclxuICAgICAgY29uc3QgdmFsID0gU3RyaW5nKG8/LnZhbHVlID8/IG8/LlZhbHVlID8/IFwiXCIpLnRyaW0oKTtcclxuICAgICAgY29uc3QgdGV4dCA9IFN0cmluZyhvPy50ZXh0ID8/IG8/LlRleHQgPz8gXCJcIikudHJpbSgpO1xyXG4gICAgICBjb25zdCB0ZXh0Tm9ybSA9IG5vcm1hbGl6ZVRleHQodGV4dCk7XHJcbiAgICAgIHJldHVybiB2YWwgPT09IHJhd1N0ciB8fCB2YWwgPT09IHJhd05vcm0gfHwgdGV4dE5vcm0gPT09IHJhd05vcm0gfHwgdGV4dE5vcm0gPT09IGFsdE5vcm07XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBtYXRjaCA/IFN0cmluZyhtYXRjaC52YWx1ZSA/PyBtYXRjaC5WYWx1ZSA/PyByYXdTdHIpIDogcmF3U3RyO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgaW5pdGlhbFRyYW5zRGF0ZSA9IG5vcm1hbGl6ZURhdGVUb0lucHV0KFN0cmluZyhkZXRhaWwudHJhbnNEYXRlID8/IGRldGFpbC5UcmFuc0RhdGUgPz8gXCJcIikpO1xyXG4gIGNvbnN0IGRlZmF1bHRWaXNpdFR5cGUgPSBTdHJpbmcodmlzaXRUeXBlc1swXT8udmFsdWUgPz8gdmlzaXRUeXBlc1swXT8uVmFsdWUgPz8gXCJcIik7XG4gIGNvbnN0IHJhd0luaXRpYWxWaXNpdFR5cGUgPSBTdHJpbmcoXHJcbiAgICBkZXRhaWwudGlwb1Zpc2l0YSA/PyBkZXRhaWwuVGlwb1Zpc2l0YSA/PyBkZXRhaWwudmlzaXRUeXBlID8/IGRldGFpbC5WaXNpdFR5cGUgPz8gXCJcIlxyXG4gICk7XHJcbiAgY29uc3QgaW5pdGlhbFZpc2l0VHlwZSA9IG1hdGNoT3B0aW9uVmFsdWUodmlzaXRUeXBlcywgcmF3SW5pdGlhbFZpc2l0VHlwZSkgfHwgZGVmYXVsdFZpc2l0VHlwZTtcclxuICBjb25zdCByYXdJbml0aWFsQXNpc3RlbnRlID0gU3RyaW5nKFxyXG4gICAgZGV0YWlsLmFzaXN0ZW50ZVRpcG8gPz8gZGV0YWlsLkFzaXN0ZW50ZVRpcG8gPz8gKGFzaXN0ZW50ZVRpcG9zWzBdPy52YWx1ZSA/PyBhc2lzdGVudGVUaXBvc1swXT8uVmFsdWUgPz8gXCJcIilcclxuICApO1xyXG4gIGNvbnN0IGluaXRpYWxBc2lzdGVudGUgPSBtYXRjaE9wdGlvblZhbHVlKGFzaXN0ZW50ZVRpcG9zLCByYXdJbml0aWFsQXNpc3RlbnRlKSB8fCByYXdJbml0aWFsQXNpc3RlbnRlO1xyXG5cclxuICBjb25zdCBbdHJhbnNEYXRlLCBzZXRUcmFuc0RhdGVdID0gdXNlU3RhdGUoaW5pdGlhbFRyYW5zRGF0ZSk7XHJcbiAgY29uc3QgW3Zpc2l0VHlwZSwgc2V0VmlzaXRUeXBlXSA9IHVzZVN0YXRlKGluaXRpYWxWaXNpdFR5cGUpO1xyXG4gIGNvbnN0IFthc2lzdGVudGVUaXBvLCBzZXRBc2lzdGVudGVUaXBvXSA9IHVzZVN0YXRlKGluaXRpYWxBc2lzdGVudGUpO1xyXG4gIGNvbnN0IFtkZXNjcmlwdGlvbiwgc2V0RGVzY3JpcHRpb25dID0gdXNlU3RhdGUoU3RyaW5nKGRldGFpbC5kZXNjcmlwdGlvbiA/PyBkZXRhaWwuRGVzY3JpcHRpb24gPz8gXCJcIikpO1xyXG4gIGNvbnN0IFtjb21lbnRhcmlvcywgc2V0Q29tZW50YXJpb3NdID0gdXNlU3RhdGUoU3RyaW5nKGRldGFpbC5jb21lbnRhcmlvcyA/PyBkZXRhaWwuQ29tZW50YXJpb3MgPz8gXCJcIikpO1xyXG4gIGNvbnN0IFthbnRlY2VkZW50ZXMsIHNldEFudGVjZWRlbnRlc10gPSB1c2VTdGF0ZShTdHJpbmcoZGV0YWlsLmFudGVjZWRlbnRlcyA/PyBkZXRhaWwuQW50ZWNlZGVudGVzID8/IFwiXCIpKTtcclxuICBjb25zdCBbY29uY2x1c2lvbmVzLCBzZXRDb25jbHVzaW9uZXNdID0gdXNlU3RhdGUoU3RyaW5nKGRldGFpbC5jb25jbHVzaW9uZXMgPz8gZGV0YWlsLkNvbmNsdXNpb25lcyA/PyBcIlwiKSk7XHJcbiAgY29uc3QgW3N0YXR1cywgc2V0U3RhdHVzXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbYnVzeSwgc2V0QnVzeV0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtpc0VkaXRpbmcsIHNldElzRWRpdGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtpc0h5ZHJhdGluZywgc2V0SXNIeWRyYXRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbbW9kYWxFcnJvciwgc2V0TW9kYWxFcnJvcl0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgcmVhZE9ubHlTdXJmYWNlUmVmID0gdXNlUmVmKG51bGwpO1xuICBjb25zdCBlZGl0U25hcHNob3RSZWYgPSB1c2VSZWYobnVsbCk7XG5cclxuICBjb25zdCByZWNJZCA9IFN0cmluZyhkZXRhaWwucmVjSWQgPz8gZGV0YWlsLlJlY0lkID8/IFwiXCIpO1xyXG4gIGNvbnN0IGFjY291bnROdW0gPSBTdHJpbmcoZGV0YWlsLmFjY291bnROdW0gPz8gZGV0YWlsLkFjY291bnROdW0gPz8gXCJcIik7XHJcbiAgY29uc3QgYWN0aXZpZGFkSWQgPSBTdHJpbmcoZGV0YWlsLmFjdGl2aWRhZElkID8/IGRldGFpbC5BY3RpdmlkYWRJZCA/PyBcIlwiKTtcclxuXHJcbiAgY29uc3QgeyBlZGl0TW9kZUtleVJlZiwgc3luY0VkaXRNb2RlRmxhZywgY2xlYXJEcmFmdCwgYXBwbHlEcmFmdFZhbHVlcyB9ID0gdXNlRGV0YWlsRWRpdFNlc3Npb24oe1xuICAgIGFjdGl2aWRhZElkLFxuICAgIHJlY0lkLFxuICAgIGNhbkVkaXRIaXN0b3J5LFxuICAgIGlzRWRpdGluZyxcbiAgICBzZXRJc0VkaXRpbmcsXG4gICAgdHJhbnNEYXRlLFxuICAgIHZpc2l0VHlwZSxcbiAgICBhc2lzdGVudGVUaXBvLFxuICAgIGRlc2NyaXB0aW9uLFxuICAgIGNvbWVudGFyaW9zLFxuICAgIGFudGVjZWRlbnRlcyxcbiAgICBjb25jbHVzaW9uZXMsXG4gICAgc2V0VHJhbnNEYXRlLFxuICAgIHNldFZpc2l0VHlwZSxcbiAgICBzZXRBc2lzdGVudGVUaXBvLFxuICAgIHNldERlc2NyaXB0aW9uLFxuICAgIHNldENvbWVudGFyaW9zLFxuICAgIHNldEFudGVjZWRlbnRlcyxcbiAgICBzZXRDb25jbHVzaW9uZXMsXG4gIH0pO1xuXHJcbiAgY29uc3QgaGFzU2VydmVyRGV0YWlsID1cclxuICAgIGhhc1ZhbHVlKHJlY0lkKSAmJlxyXG4gICAgaGFzVmFsdWUoYWNjb3VudE51bSkgJiZcclxuICAgIGhhc1ZhbHVlKGRldGFpbC50cmFuc0RhdGUgfHwgZGV0YWlsLlRyYW5zRGF0ZSB8fCBcIlwiKTtcclxuXHJcbiAgY29uc3Qgc2hvdWxkSHlkcmF0ZSA9ICEhYWN0aXZpZGFkSWQgJiYgIWhhc1NlcnZlckRldGFpbDtcclxuXHJcbiAgY29uc3Qgb3BlblRleHRFZGl0b3IgPSB1c2VDYWxsYmFjayhcbiAgICAoXG4gICAgICBmaWVsZElkOiBzdHJpbmcsXG4gICAgICBmaWVsZExhYmVsOiBzdHJpbmcsXG4gICAgICBmaWVsZFZhbHVlOiBzdHJpbmcsXG4gICAgICBvcHRpb25zOiB7IGFsbG93RWRpdD86IGJvb2xlYW47IHJlYWRPbmx5PzogYm9vbGVhbjsgZWRpdE1vZGVLZXk/OiBzdHJpbmcgfSA9IHt9XG4gICAgKSA9PiB7XG4gICAgICBuYXZpZ2F0ZVRvVGV4dEVkaXRvckZpZWxkKHtcbiAgICAgICAgZmllbGRJZCxcbiAgICAgICAgZmllbGRMYWJlbCxcbiAgICAgICAgZmllbGRWYWx1ZSxcbiAgICAgICAgcmVhZE9ubHk6IG9wdGlvbnM/LnJlYWRPbmx5ID09PSB0cnVlLFxuICAgICAgICBhbGxvd0VkaXQ6IG9wdGlvbnM/LmFsbG93RWRpdCAhPT0gZmFsc2UsXG4gICAgICAgIGVkaXRNb2RlS2V5OiBvcHRpb25zPy5lZGl0TW9kZUtleSxcbiAgICAgICAgZWRpdE1vZGVSZXR1cm5UdGxNczogRURJVE9SX1JFVFVSTl9GTEFHX1RUTF9NUyxcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgW11cbiAgKTtcblxyXG4gIGNvbnN0IGhhbmRsZUNvbWVudGFyaW9zVGFwID0gdXNlQ2FsbGJhY2soKGV2ZW50KSA9PiB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgb3BlblRleHRFZGl0b3IoZmllbGRJZENvbWVudGFyaW9zLCBpbmRUKFwiVmlzaXRzX0ZpZWxkX0NvbW1lbnRzXCIsIFwiQ29tbWVudHNcIiksIGNvbWVudGFyaW9zLCB7XHJcbiAgICAgIHJlYWRPbmx5OiAhaXNFZGl0aW5nLFxyXG4gICAgICBhbGxvd0VkaXQ6IGNhbkVkaXRIaXN0b3J5LFxyXG4gICAgICBlZGl0TW9kZUtleTogZWRpdE1vZGVLZXlSZWYuY3VycmVudFxyXG4gICAgfSk7XHJcbiAgfSwgW2NvbWVudGFyaW9zLCBpc0VkaXRpbmcsIGNhbkVkaXRIaXN0b3J5LCBvcGVuVGV4dEVkaXRvcl0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVDb21lbnRhcmlvc0hvbGQgPSB1c2VDYWxsYmFjaygodGFyZ2V0LCBjbGllbnRZKSA9PiB7XHJcbiAgICBpZiAoIXRhcmdldCB8fCAhaXNPdmVyZmxvd2luZyh0YXJnZXQpKSByZXR1cm4gZmFsc2U7XHJcbiAgICBzZXRQcmV2aWV3QW5jaG9yKHRhcmdldCk7XHJcbiAgICByZXR1cm4gc2hvd1ByZXZpZXdUb29sdGlwKFN0cmluZyhjb21lbnRhcmlvcyB8fCBcIlwiKSwgY2xpZW50WSk7XHJcbiAgfSwgW2NvbWVudGFyaW9zXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUFudGVjZWRlbnRlc1RhcCA9IHVzZUNhbGxiYWNrKChldmVudCkgPT4ge1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIG9wZW5UZXh0RWRpdG9yKGZpZWxkSWRBbnRlY2VkZW50ZXMsIGluZFQoXCJWaXNpdHNfRmllbGRfQmFja2dyb3VuZFwiLCBcIkJhY2tncm91bmRcIiksIGFudGVjZWRlbnRlcywge1xyXG4gICAgICByZWFkT25seTogIWlzRWRpdGluZyxcclxuICAgICAgYWxsb3dFZGl0OiBjYW5FZGl0SGlzdG9yeSxcclxuICAgICAgZWRpdE1vZGVLZXk6IGVkaXRNb2RlS2V5UmVmLmN1cnJlbnRcclxuICAgIH0pO1xyXG4gIH0sIFthbnRlY2VkZW50ZXMsIGlzRWRpdGluZywgY2FuRWRpdEhpc3RvcnksIG9wZW5UZXh0RWRpdG9yXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUFudGVjZWRlbnRlc0hvbGQgPSB1c2VDYWxsYmFjaygodGFyZ2V0LCBjbGllbnRZKSA9PiB7XHJcbiAgICBpZiAoIXRhcmdldCB8fCAhaXNPdmVyZmxvd2luZyh0YXJnZXQpKSByZXR1cm4gZmFsc2U7XHJcbiAgICBzZXRQcmV2aWV3QW5jaG9yKHRhcmdldCk7XHJcbiAgICByZXR1cm4gc2hvd1ByZXZpZXdUb29sdGlwKFN0cmluZyhhbnRlY2VkZW50ZXMgfHwgXCJcIiksIGNsaWVudFkpO1xyXG4gIH0sIFthbnRlY2VkZW50ZXNdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQ29uY2x1c2lvbmVzVGFwID0gdXNlQ2FsbGJhY2soKGV2ZW50KSA9PiB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgb3BlblRleHRFZGl0b3IoZmllbGRJZENvbmNsdXNpb25lcywgaW5kVChcIlZpc2l0c19GaWVsZF9Db25jbHVzaW9uc1wiLCBcIkNvbmNsdXNpb25zXCIpLCBjb25jbHVzaW9uZXMsIHtcclxuICAgICAgcmVhZE9ubHk6ICFpc0VkaXRpbmcsXHJcbiAgICAgIGFsbG93RWRpdDogY2FuRWRpdEhpc3RvcnksXHJcbiAgICAgIGVkaXRNb2RlS2V5OiBlZGl0TW9kZUtleVJlZi5jdXJyZW50XHJcbiAgICB9KTtcclxuICB9LCBbY29uY2x1c2lvbmVzLCBpc0VkaXRpbmcsIGNhbkVkaXRIaXN0b3J5LCBvcGVuVGV4dEVkaXRvcl0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVDb25jbHVzaW9uZXNIb2xkID0gdXNlQ2FsbGJhY2soKHRhcmdldCwgY2xpZW50WSkgPT4ge1xyXG4gICAgaWYgKCF0YXJnZXQgfHwgIWlzT3ZlcmZsb3dpbmcodGFyZ2V0KSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgc2V0UHJldmlld0FuY2hvcih0YXJnZXQpO1xyXG4gICAgcmV0dXJuIHNob3dQcmV2aWV3VG9vbHRpcChTdHJpbmcoY29uY2x1c2lvbmVzIHx8IFwiXCIpLCBjbGllbnRZKTtcclxuICB9LCBbY29uY2x1c2lvbmVzXSk7XHJcblxyXG4gIGNvbnN0IGNvbWVudGFyaW9zVGFwID0gdXNlVGFwR3VhcmQoaGFuZGxlQ29tZW50YXJpb3NUYXAsIGhhbmRsZUNvbWVudGFyaW9zSG9sZCk7XHJcbiAgY29uc3QgYW50ZWNlZGVudGVzVGFwID0gdXNlVGFwR3VhcmQoaGFuZGxlQW50ZWNlZGVudGVzVGFwLCBoYW5kbGVBbnRlY2VkZW50ZXNIb2xkKTtcclxuICBjb25zdCBjb25jbHVzaW9uZXNUYXAgPSB1c2VUYXBHdWFyZChoYW5kbGVDb25jbHVzaW9uZXNUYXAsIGhhbmRsZUNvbmNsdXNpb25lc0hvbGQpO1xyXG5cclxuICBjb25zdCB0ZXh0RWRpdG9yQmluZGluZ3MgPSB1c2VNZW1vKFxuICAgICgpID0+IFtcbiAgICAgIHsgZmllbGRJZDogZmllbGRJZENvbWVudGFyaW9zLCBhcHBseVZhbHVlOiBzZXRDb21lbnRhcmlvcyB9LFxuICAgICAgeyBmaWVsZElkOiBmaWVsZElkQW50ZWNlZGVudGVzLCBhcHBseVZhbHVlOiBzZXRBbnRlY2VkZW50ZXMgfSxcbiAgICAgIHsgZmllbGRJZDogZmllbGRJZENvbmNsdXNpb25lcywgYXBwbHlWYWx1ZTogc2V0Q29uY2x1c2lvbmVzIH0sXG4gICAgXSxcbiAgICBbZmllbGRJZEFudGVjZWRlbnRlcywgZmllbGRJZENvbWVudGFyaW9zLCBmaWVsZElkQ29uY2x1c2lvbmVzXVxuICApO1xuXG4gIGNvbnN0IHsgYXBwbHlWYWx1ZXM6IGFwcGx5VGV4dEVkaXRvclZhbHVlcyB9ID0gdXNlVGV4dEVkaXRvckZpZWxkcyh0ZXh0RWRpdG9yQmluZGluZ3MsIHtcbiAgICBhcHBseU9uTW91bnQ6ICFhY3RpdmlkYWRJZCxcbiAgICBsaXN0ZW5QYWdlU2hvdzogdHJ1ZSxcbiAgfSk7XG5cclxuICBjb25zdCB7IG1vZGFsLCBvcGVuQ29uZmlybSwgY2xvc2VDb25maXJtLCBoYW5kbGVDb25maXJtIH0gPSB1c2VDb25maXJtRGlhbG9nKHtcclxuICAgIGRlZmF1bHRDb25maXJtVGV4dDogaW5kVChcIkNvbmZpcm1fWWVzXCIsIFwiT0tcIiksXHJcbiAgICBkZWZhdWx0Q2FuY2VsVGV4dDogaW5kVChcIkNvbmZpcm1fTm9cIiwgXCJDYW5jZWxcIilcclxuICB9KTtcclxuXHJcbiAgY29uc3QgaGFuZGxlTW9kYWxDb25maXJtID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgc2V0TW9kYWxFcnJvcihcIlwiKTtcclxuICAgIGF3YWl0IGhhbmRsZUNvbmZpcm0oe1xyXG4gICAgICBidXN5LFxyXG4gICAgICBvbkVycm9yOiAobXNnKSA9PiB7XHJcbiAgICAgICAgc2V0TW9kYWxFcnJvcihtc2cpO1xyXG4gICAgICAgIHNldFN0YXR1cyhtc2cpO1xyXG4gICAgICAgIGZsYXNoQWN0aW9uTWFyayhcImVycm9yUHJvY2Vzc1wiLCAxNTAwKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSwgW2J1c3ksIGhhbmRsZUNvbmZpcm1dKTtcclxuXHJcbiAgY29uc3QgbW9kYWxMb2FkaW5nVGV4dCA9IGluZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIik7XHJcbiAgY29uc3QgbW9kYWxDYW5jZWxUZXh0ID0gbW9kYWwuY2FuY2VsVGV4dCB8fCBpbmRUKFwiQ29uZmlybV9Ob1wiLCBcIkNhbmNlbFwiKTtcclxuICBjb25zdCBtb2RhbENvbmZpcm1UZXh0ID0gYnVzeVxyXG4gICAgPyBtb2RhbExvYWRpbmdUZXh0XHJcbiAgICA6ICghYnVzeSAmJiBtb2RhbEVycm9yID8gaW5kVChcIkNvbW1vbl9PS1wiLCBcIk9LXCIpIDogKG1vZGFsLmNvbmZpcm1UZXh0IHx8IGluZFQoXCJDb25maXJtX1llc1wiLCBcIk9LXCIpKSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZU1vZGFsQnV0dG9uQ29uZmlybSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoIWJ1c3kgJiYgbW9kYWxFcnJvcikge1xuICAgICAgY2xvc2VDb25maXJtKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGhhbmRsZU1vZGFsQ29uZmlybSgpO1xuICB9LCBbYnVzeSwgbW9kYWxFcnJvciwgY2xvc2VDb25maXJtLCBoYW5kbGVNb2RhbENvbmZpcm1dKTtcblxuICBjb25zdCBoYXNBY3RpdmVQcm9jZXNzID0gdXNlTWVtbygoKSA9PiBidXN5IHx8IGlzRWRpdGluZywgW2J1c3ksIGlzRWRpdGluZ10pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgd2luZG93Ll9faW5kU2V0TmF2aWdhdGlvbkd1YXJkPy4oaGFzQWN0aXZlUHJvY2Vzcyk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHdpbmRvdy5fX2luZENsZWFyTmF2aWdhdGlvbkd1YXJkPy4oKTtcbiAgICB9O1xuICB9LCBbaGFzQWN0aXZlUHJvY2Vzc10pO1xuXHJcbiAgdXNlRGV0YWlsSHlkcmF0aW9uKHtcbiAgICBhY3RpdmlkYWRJZCxcbiAgICBzaG91bGRIeWRyYXRlLFxuICAgIHZpc2l0VHlwZXMsXG4gICAgYXNpc3RlbnRlVGlwb3MsXG4gICAgZGVmYXVsdFZpc2l0VHlwZSxcbiAgICBpbml0aWFsQXNpc3RlbnRlLFxuICAgIG5vcm1hbGl6ZURhdGVUb0lucHV0LFxuICAgIG1hdGNoT3B0aW9uVmFsdWUsXG4gICAgYXBwbHlEcmFmdFZhbHVlcyxcbiAgICBhcHBseVRleHRFZGl0b3JWYWx1ZXMsXG4gICAgc2V0U3RhdHVzLFxuICAgIHNldElzSHlkcmF0aW5nLFxuICAgIHNldFRyYW5zRGF0ZSxcbiAgICBzZXRWaXNpdFR5cGUsXG4gICAgc2V0QXNpc3RlbnRlVGlwbyxcbiAgICBzZXREZXNjcmlwdGlvbixcbiAgICBzZXRDb21lbnRhcmlvcyxcbiAgICBzZXRBbnRlY2VkZW50ZXMsXG4gICAgc2V0Q29uY2x1c2lvbmVzLFxuICB9KTtcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgZWwgPSByZWFkT25seVN1cmZhY2VSZWYuY3VycmVudDtcbiAgICBpZiAoIWVsKSByZXR1cm47XG4gICAgaWYgKCFpc0VkaXRpbmcpIHtcbiAgICAgIGVsLmNsYXNzTGlzdC5hZGQoXCJpbmQtcmVhZG9ubHktc3VyZmFjZVwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShcImluZC1yZWFkb25seS1zdXJmYWNlXCIpO1xuICAgIH1cbiAgfSwgW2lzRWRpdGluZ10pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKGlzRWRpdGluZykge1xuICAgICAgaWYgKCFlZGl0U25hcHNob3RSZWYuY3VycmVudCkge1xuICAgICAgICBlZGl0U25hcHNob3RSZWYuY3VycmVudCA9IHtcbiAgICAgICAgICB0cmFuc0RhdGUsXG4gICAgICAgICAgdmlzaXRUeXBlLFxuICAgICAgICAgIGFzaXN0ZW50ZVRpcG8sXG4gICAgICAgICAgZGVzY3JpcHRpb24sXG4gICAgICAgICAgY29tZW50YXJpb3MsXG4gICAgICAgICAgYW50ZWNlZGVudGVzLFxuICAgICAgICAgIGNvbmNsdXNpb25lc1xuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBlZGl0U25hcHNob3RSZWYuY3VycmVudCA9IG51bGw7XG4gIH0sIFtpc0VkaXRpbmcsIHRyYW5zRGF0ZSwgdmlzaXRUeXBlLCBhc2lzdGVudGVUaXBvLCBkZXNjcmlwdGlvbiwgY29tZW50YXJpb3MsIGFudGVjZWRlbnRlcywgY29uY2x1c2lvbmVzXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoaXNFZGl0aW5nKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgIHJldHVybiBiaW5kUmVhZE9ubHlHdWFyZChyZWFkT25seVN1cmZhY2VSZWYuY3VycmVudCk7XG4gIH0sIFtpc0VkaXRpbmddKTtcblxuICBjb25zdCBoYW5kbGVFbmFibGVFZGl0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmICghY2FuRWRpdEhpc3RvcnkpIHtcbiAgICAgIHNob3dQZXJtaXNzaW9uTW9kYWwoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgc2V0SXNFZGl0aW5nKHRydWUpO1xuICAgIHN5bmNFZGl0TW9kZUZsYWcodHJ1ZSk7XG4gICAgc2V0U3RhdHVzKGluZFQoXCJWaXNpdHNfRGV0YWlsX0VkaXRpbmdFbmFibGVkXCIsIFwiRWRpdGluZyBlbmFibGVkXCIpKTtcbiAgfSwgW2NhbkVkaXRIaXN0b3J5LCBzeW5jRWRpdE1vZGVGbGFnXSk7XG5cbiAgY29uc3QgaGFuZGxlQ2FuY2VsRWRpdCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoIWlzRWRpdGluZykgcmV0dXJuO1xuICAgIHNldElzRWRpdGluZyhmYWxzZSk7XG4gICAgc3luY0VkaXRNb2RlRmxhZyhmYWxzZSk7XG4gICAgY2xlYXJEcmFmdCgpO1xuICAgIHNldFN0YXR1cyhpbmRUKFwiQ29tbW9uX0NhbmNlbFwiLCBcIkNhbmNlbFwiKSk7XG4gICAgd2luZG93Ll9faW5kQnlwYXNzTmF2aWdhdGlvbkd1YXJkT25jZT8uKCk7XG4gICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICB9LCBbaXNFZGl0aW5nLCBzeW5jRWRpdE1vZGVGbGFnLCBjbGVhckRyYWZ0XSk7XG5cclxuICBjb25zdCB7IGhhbmRsZVVwZGF0ZSwgaGFuZGxlRGVsZXRlIH0gPSB1c2VEZXRhaWxNdXRhdGlvbnMoe1xuICAgIGJ1c3ksXG4gICAgaXNFZGl0aW5nLFxuICAgIGNhbkVkaXRIaXN0b3J5LFxuICAgIGNhbkRlbGV0ZUhpc3RvcnksXG4gICAgcmVjSWQsXG4gICAgYWNjb3VudE51bSxcbiAgICB0cmFuc0RhdGUsXG4gICAgdmlzaXRUeXBlLFxuICAgIGFzaXN0ZW50ZVRpcG8sXG4gICAgZGVzY3JpcHRpb24sXG4gICAgY29tZW50YXJpb3MsXG4gICAgYW50ZWNlZGVudGVzLFxuICAgIGNvbmNsdXNpb25lcyxcbiAgICB2aXNpdFR5cGVzLFxuICAgIGFzaXN0ZW50ZVRpcG9zLFxuICAgIGRlZmF1bHRWaXNpdFR5cGUsXG4gICAgcmF3SW5pdGlhbFZpc2l0VHlwZSxcbiAgICByYXdJbml0aWFsQXNpc3RlbnRlLFxuICAgIG1hdGNoT3B0aW9uVmFsdWUsXG4gICAgY2xlYXJEcmFmdCxcbiAgICBzeW5jRWRpdE1vZGVGbGFnLFxuICAgIHNldE1vZGFsRXJyb3IsXG4gICAgc2V0QnVzeSxcbiAgICBzZXRTdGF0dXMsXG4gICAgc2V0SXNFZGl0aW5nLFxuICB9KTtcblxyXG4gIHVzZURldGFpbFRvcGJhckFjdGlvbnMoe1xuICAgIGJ1c3ksXG4gICAgbW9kYWxPcGVuOiBtb2RhbC5vcGVuLFxuICAgIGlzRWRpdGluZyxcbiAgICBjYW5FZGl0SGlzdG9yeSxcbiAgICBjYW5EZWxldGVIaXN0b3J5LFxuICAgIHRyYW5zRGF0ZSxcbiAgICBzZXRNb2RhbEVycm9yLFxuICAgIGhhbmRsZUVuYWJsZUVkaXQsXG4gICAgaGFuZGxlQ2FuY2VsRWRpdCxcbiAgICBoYW5kbGVVcGRhdGUsXG4gICAgaGFuZGxlRGVsZXRlLFxuICAgIG9wZW5Db25maXJtLFxuICAgIGNsb3NlQ29uZmlybSxcbiAgfSk7XG5cbiAgY29uc3QgZGVzY3JpcHRpb25MYWJlbCA9IGluZFQoXCJWaXNpdHNfRmllbGRfRGVzY3JpcHRpb25cIiwgXCJEZXNjcmlwdGlvblwiKTtcbiAgY29uc3QgY29tbWVudHNMYWJlbCA9IGluZFQoXCJWaXNpdHNfRmllbGRfQ29tbWVudHNcIiwgXCJDb21tZW50c1wiKTtcbiAgY29uc3QgYmFja2dyb3VuZExhYmVsID0gaW5kVChcIlZpc2l0c19GaWVsZF9CYWNrZ3JvdW5kXCIsIFwiQmFja2dyb3VuZFwiKTtcbiAgY29uc3QgY29uY2x1c2lvbnNMYWJlbCA9IGluZFQoXCJWaXNpdHNfRmllbGRfQ29uY2x1c2lvbnNcIiwgXCJDb25jbHVzaW9uc1wiKTtcbiAgY29uc3QgZGV0YWlsRGVzY3JpcHRpb25DbGFzc05hbWUgPSBjbGFzc05hbWVzKFxuICAgIFwiZm9ybS1jb250cm9sXCIsXG4gICAgaXNFZGl0aW5nID8gXCJib3JkZXItc2xhdGUtMjAwIHRleHQtc2xhdGUtOTAwXCIgOiBcImJvcmRlci1zbGF0ZS0yMDAgaW5kLXJlYWRvbmx5LWZpZWxkXCJcbiAgKTtcbiAgY29uc3QgZGV0YWlsUmVhZE9ubHlDbGFzc05hbWUgPSBjbGFzc05hbWVzKFwiZm9ybS1jb250cm9sIGN1cnNvci1wb2ludGVyXCIsICFpc0VkaXRpbmcgPyBcImluZC1yZWFkb25seS1maWVsZFwiIDogXCJcIik7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNFwiPlxyXG4gICAgICA8Q29uZmlybU1vZGFsXHJcbiAgICAgICAgb3Blbj17bW9kYWwub3Blbn1cclxuICAgICAgICB0aXRsZT17bW9kYWwudGl0bGV9XHJcbiAgICAgICAgbWVzc2FnZT17bW9kYWwubWVzc2FnZX1cclxuICAgICAgICBjb25maXJtVGV4dD17bW9kYWxDb25maXJtVGV4dH1cclxuICAgICAgICBjYW5jZWxUZXh0PXttb2RhbENhbmNlbFRleHR9XHJcbiAgICAgICAgbG9hZGluZ1RleHQ9e21vZGFsTG9hZGluZ1RleHR9XHJcbiAgICAgICAgc2hvd0NhbmNlbD17bW9kYWwuc2hvd0NhbmNlbH1cclxuICAgICAgICBzaG93Q29uZmlybT17bW9kYWwuc2hvd0NvbmZpcm19XHJcbiAgICAgICAgYnVzeT17YnVzeX1cclxuICAgICAgICBlcnJvcj17bW9kYWxFcnJvcn1cclxuICAgICAgICBzdGF0dXM9e3N0YXR1c31cclxuICAgICAgICBvbkNvbmZpcm09e2hhbmRsZU1vZGFsQnV0dG9uQ29uZmlybX1cclxuICAgICAgICBvbkNhbmNlbD17Y2xvc2VDb25maXJtfVxyXG4gICAgICAvPlxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgcmVmPXtyZWFkT25seVN1cmZhY2VSZWZ9XHJcbiAgICAgICAgY2xhc3NOYW1lPVwicmVsYXRpdmUgc2hhZG93LXhzIGdsYXNzLXBhbmVsIHAtNCBzcGFjZS15LTQgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgcm91bmRlZC0yeGxcIlxyXG4gICAgICA+XHJcbiAgICAgICAge2lzSHlkcmF0aW5nICYmIChcclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCB6LTEwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGJnLXdoaXRlLzcwIHJvdW5kZWQtMnhsXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC1zbSB0ZXh0LXNsYXRlLTYwMFwiPlxyXG4gICAgICAgICAgICAgIDxTcGlubmVyIHNpemU9XCJoLTUgdy01XCIgLz5cclxuICAgICAgICAgICAgICA8c3Bhbj57aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX08L3NwYW4+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKX1cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMiBnYXAtNCBwdC0xXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ2aXNpdGEtZmllbGQtdGV4dFwiPlxyXG4gICAgICAgICAgICA8U2luZ2xlRGF0ZVBpY2tlclxuICAgICAgICAgICAgICBsYWJlbD17aW5kVChcIlZpc2l0c19EZXRhaWxfRGF0ZV9MYWJlbFwiLCBcIkRhdGVcIil9XG4gICAgICAgICAgICAgIHZhbHVlPXt0cmFuc0RhdGV9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXtzZXRUcmFuc0RhdGV9XG4gICAgICAgICAgICAgIGRpc2FibGVkPXshaXNFZGl0aW5nfVxuICAgICAgICAgICAgICByZWFkT25seT17IWlzRWRpdGluZ31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPFNlbGVjdENvbWJvYm94XG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIlZpc2l0c19EZXRhaWxfVmlzaXRUeXBlX0xhYmVsXCIsIFwiVmlzaXQgdHlwZVwiKX1cbiAgICAgICAgICAgIG9wdGlvbnM9e3Zpc2l0VHlwZXN9XG4gICAgICAgICAgICB2YWx1ZT17dmlzaXRUeXBlfVxuICAgICAgICAgICAgb25DaGFuZ2U9e3NldFZpc2l0VHlwZX1cbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiVmlzaXRzX0RldGFpbF9WaXNpdFR5cGVfUGxhY2Vob2xkZXJcIiwgXCJTZWxlY3QgdHlwZVwiKX1cbiAgICAgICAgICAgIGRpc2FibGVkPXshaXNFZGl0aW5nfVxuICAgICAgICAgICAgcmVhZE9ubHk9eyFpc0VkaXRpbmd9XG4gICAgICAgICAgICB1c2VQb3J0YWw9e2ZhbHNlfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICA8VmlzaXROYXJyYXRpdmVGaWVsZHNcbiAgICAgICAgICBkZXNjcmlwdGlvbkxhYmVsPXtkZXNjcmlwdGlvbkxhYmVsfVxuICAgICAgICAgIGRlc2NyaXB0aW9uVmFsdWU9e2Rlc2NyaXB0aW9ufVxuICAgICAgICAgIGRlc2NyaXB0aW9uQ2xhc3NOYW1lPXtkZXRhaWxEZXNjcmlwdGlvbkNsYXNzTmFtZX1cbiAgICAgICAgICBkZXNjcmlwdGlvbkRpc2FibGVkPXshaXNFZGl0aW5nfVxuICAgICAgICAgIG9uRGVzY3JpcHRpb25DaGFuZ2U9e3NldERlc2NyaXB0aW9ufVxuICAgICAgICAgIHRhcEZpZWxkcz17W1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBpZDogXCJjb21lbnRhcmlvc1wiLFxuICAgICAgICAgICAgICBsYWJlbDogY29tbWVudHNMYWJlbCxcbiAgICAgICAgICAgICAgdmFsdWU6IGNvbWVudGFyaW9zLFxuICAgICAgICAgICAgICBjbGFzc05hbWU6IGRldGFpbFJlYWRPbmx5Q2xhc3NOYW1lLFxuICAgICAgICAgICAgICBwb2ludGVyQmluZGluZ3M6IGNvbWVudGFyaW9zVGFwLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgaWQ6IFwiYW50ZWNlZGVudGVzXCIsXG4gICAgICAgICAgICAgIGxhYmVsOiBiYWNrZ3JvdW5kTGFiZWwsXG4gICAgICAgICAgICAgIHZhbHVlOiBhbnRlY2VkZW50ZXMsXG4gICAgICAgICAgICAgIGNsYXNzTmFtZTogZGV0YWlsUmVhZE9ubHlDbGFzc05hbWUsXG4gICAgICAgICAgICAgIHBvaW50ZXJCaW5kaW5nczogYW50ZWNlZGVudGVzVGFwLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgaWQ6IFwiY29uY2x1c2lvbmVzXCIsXG4gICAgICAgICAgICAgIGxhYmVsOiBjb25jbHVzaW9uc0xhYmVsLFxuICAgICAgICAgICAgICB2YWx1ZTogY29uY2x1c2lvbmVzLFxuICAgICAgICAgICAgICBjbGFzc05hbWU6IGRldGFpbFJlYWRPbmx5Q2xhc3NOYW1lLFxuICAgICAgICAgICAgICBwb2ludGVyQmluZGluZ3M6IGNvbmNsdXNpb25lc1RhcCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXX1cbiAgICAgICAgLz5cblxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTMgdGV4dC1zbSB0ZXh0LXNsYXRlLTYwMFwiPlxyXG4gICAgICAgICAgPHNwYW4+e3N0YXR1c308L3NwYW4+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcblxuLy8gRGV0YWlsIFVJIHdyYXBwZWQgYnkgdGhlIGVycm9yIGJvdW5kYXJ5LlxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRGV0YWlsRm9ybSgpIHtcbiAgcmV0dXJuIChcbiAgICA8QXBwRXJyb3JCb3VuZGFyeSBmYWxsYmFja01lc3NhZ2U9e2luZFQoXCJWaXNpdHNfRGV0YWlsX0Vycm9yQm91bmRhcnlcIiwgXCJBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSByZW5kZXJpbmcgdGhlIGRldGFpbCBwYWdlLiBSZWxvYWQgYW5kIHRyeSBhZ2Fpbi5cIil9PlxuICAgICAgPERldGFpbEFwcCAvPlxuICAgIDwvQXBwRXJyb3JCb3VuZGFyeT5cbiAgKTtcbn1cbiIsICJleHBvcnQgY29uc3QgYmluZFJlYWRPbmx5R3VhcmQgPSAoZWw6IEhUTUxFbGVtZW50IHwgbnVsbCkgPT4ge1xuICBpZiAoIWVsKSByZXR1cm4gKCkgPT4ge307XG4gIGNvbnN0IGNhbmNlbCA9IChldmVudDogRXZlbnQpID0+IGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIGNvbnN0IGV2ZW50cyA9IFtcImNvbnRleHRtZW51XCIsIFwic2VsZWN0c3RhcnRcIiwgXCJjb3B5XCIsIFwiY3V0XCIsIFwicGFzdGVcIl07XG4gIGV2ZW50cy5mb3JFYWNoKChldnQpID0+IGVsLmFkZEV2ZW50TGlzdGVuZXIoZXZ0LCBjYW5jZWwpKTtcbiAgcmV0dXJuICgpID0+IHtcbiAgICBldmVudHMuZm9yRWFjaCgoZXZ0KSA9PiBlbC5yZW1vdmVFdmVudExpc3RlbmVyKGV2dCwgY2FuY2VsKSk7XG4gIH07XG59O1xuIiwgImV4cG9ydCBjb25zdCBoYXNWYWx1ZSA9ICh2YWx1ZTogdW5rbm93bikgPT4gU3RyaW5nKHZhbHVlIHx8IFwiXCIpLnRyaW0oKS5sZW5ndGggPiAwO1xuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGZldGNoSnNvbiB9IGZyb20gXCIuLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uL3V0aWxzL2luZEkxOG4udHNcIjtcblxudHlwZSBVc2VEZXRhaWxIeWRyYXRpb25BcmdzID0ge1xuICBhY3RpdmlkYWRJZDogc3RyaW5nO1xuICBzaG91bGRIeWRyYXRlOiBib29sZWFuO1xuICB2aXNpdFR5cGVzOiBhbnlbXTtcbiAgYXNpc3RlbnRlVGlwb3M6IGFueVtdO1xuICBkZWZhdWx0VmlzaXRUeXBlOiBzdHJpbmc7XG4gIGluaXRpYWxBc2lzdGVudGU6IHN0cmluZztcbiAgbm9ybWFsaXplRGF0ZVRvSW5wdXQ6ICh2YWx1ZTogc3RyaW5nKSA9PiBzdHJpbmc7XG4gIG1hdGNoT3B0aW9uVmFsdWU6IChvcHRpb25zOiBhbnlbXSwgcmF3OiB1bmtub3duKSA9PiBzdHJpbmc7XG4gIGFwcGx5RHJhZnRWYWx1ZXM6ICgpID0+IHZvaWQ7XG4gIGFwcGx5VGV4dEVkaXRvclZhbHVlczogKCkgPT4gdm9pZDtcbiAgc2V0U3RhdHVzOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgc2V0SXNIeWRyYXRpbmc6ICh2YWx1ZTogYm9vbGVhbikgPT4gdm9pZDtcbiAgc2V0VHJhbnNEYXRlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgc2V0VmlzaXRUeXBlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgc2V0QXNpc3RlbnRlVGlwbzogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHNldERlc2NyaXB0aW9uOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgc2V0Q29tZW50YXJpb3M6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBzZXRBbnRlY2VkZW50ZXM6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBzZXRDb25jbHVzaW9uZXM6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xufTtcblxuLy8gS2VlcHMgZGV0YWlsIGh5ZHJhdGlvbiBvcmNoZXN0cmF0aW9uIG91dHNpZGUgdGhlIHBhZ2UgY29tcG9uZW50LlxuZXhwb3J0IGNvbnN0IHVzZURldGFpbEh5ZHJhdGlvbiA9ICh7XG4gIGFjdGl2aWRhZElkLFxuICBzaG91bGRIeWRyYXRlLFxuICB2aXNpdFR5cGVzLFxuICBhc2lzdGVudGVUaXBvcyxcbiAgZGVmYXVsdFZpc2l0VHlwZSxcbiAgaW5pdGlhbEFzaXN0ZW50ZSxcbiAgbm9ybWFsaXplRGF0ZVRvSW5wdXQsXG4gIG1hdGNoT3B0aW9uVmFsdWUsXG4gIGFwcGx5RHJhZnRWYWx1ZXMsXG4gIGFwcGx5VGV4dEVkaXRvclZhbHVlcyxcbiAgc2V0U3RhdHVzLFxuICBzZXRJc0h5ZHJhdGluZyxcbiAgc2V0VHJhbnNEYXRlLFxuICBzZXRWaXNpdFR5cGUsXG4gIHNldEFzaXN0ZW50ZVRpcG8sXG4gIHNldERlc2NyaXB0aW9uLFxuICBzZXRDb21lbnRhcmlvcyxcbiAgc2V0QW50ZWNlZGVudGVzLFxuICBzZXRDb25jbHVzaW9uZXMsXG59OiBVc2VEZXRhaWxIeWRyYXRpb25BcmdzKSA9PiB7XG4gIGNvbnN0IGh5ZHJhdGVGcm9tQXBpID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xuICAgIGlmICghYWN0aXZpZGFkSWQpIHJldHVybjtcbiAgICBzZXRJc0h5ZHJhdGluZyh0cnVlKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2hKc29uKGAvVmlzaXRhcy9HZXRBY3Rpdml0eUJ5Q29kZT9jb2RlPSR7ZW5jb2RlVVJJQ29tcG9uZW50KGFjdGl2aWRhZElkKX1gKTtcbiAgICAgIGlmICghcmVzPy5zdWNjZXNzIHx8ICFyZXMuZGF0YSkge1xuICAgICAgICBzZXRTdGF0dXMocmVzPy5tZXNzYWdlIHx8IGluZFQoXCJWaXNpdHNfRGV0YWlsX0xvYWRBY3Rpdml0eUZhaWxlZFwiLCBcIkZhaWxlZCB0byBsb2FkIGFjdGl2aXR5IGRldGFpbHMuXCIpKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3QgZGF0YSA9IHJlcy5kYXRhO1xuICAgICAgY29uc3QgcmF3RGF0ZSA9IFN0cmluZyhkYXRhLnRyYW5zRGF0ZSA/PyBkYXRhLlRyYW5zRGF0ZSA/PyBcIlwiKTtcbiAgICAgIHNldFRyYW5zRGF0ZShub3JtYWxpemVEYXRlVG9JbnB1dChyYXdEYXRlKSk7XG5cbiAgICAgIGNvbnN0IHJhd1Zpc2l0VHlwZSA9IFN0cmluZyhkYXRhLnRpcG9WaXNpdGEgPz8gZGF0YS5UaXBvVmlzaXRhID8/IGRhdGEudmlzaXRUeXBlID8/IGRhdGEuVmlzaXRUeXBlID8/IFwiXCIpO1xuICAgICAgc2V0VmlzaXRUeXBlKG1hdGNoT3B0aW9uVmFsdWUodmlzaXRUeXBlcywgcmF3VmlzaXRUeXBlKSB8fCBkZWZhdWx0VmlzaXRUeXBlKTtcblxuICAgICAgY29uc3QgYXNpc3RlbnRlc0xpc3QgPSBkYXRhLmFzaXN0ZW50ZXMgPz8gZGF0YS5Bc2lzdGVudGVzO1xuICAgICAgY29uc3QgZmlyc3RBc2lzdGVudGUgPSBBcnJheS5pc0FycmF5KGFzaXN0ZW50ZXNMaXN0KSAmJiBhc2lzdGVudGVzTGlzdC5sZW5ndGggPyBhc2lzdGVudGVzTGlzdFswXSA6IG51bGw7XG4gICAgICBjb25zdCByYXdBc2lzdGVudGVUaXBvID0gU3RyaW5nKFxuICAgICAgICBkYXRhLmFzaXN0ZW50ZVRpcG8gPz8gZGF0YS5Bc2lzdGVudGVUaXBvID8/IGZpcnN0QXNpc3RlbnRlPy5hc2lzdGVudGVUaXBvID8/IGZpcnN0QXNpc3RlbnRlPy5Bc2lzdGVudGVUaXBvID8/IFwiXCJcbiAgICAgICk7XG4gICAgICBjb25zdCBub3JtYWxpemVkQXNpc3RlbnRlVGlwbyA9IG1hdGNoT3B0aW9uVmFsdWUoYXNpc3RlbnRlVGlwb3MsIHJhd0FzaXN0ZW50ZVRpcG8pO1xuICAgICAgc2V0QXNpc3RlbnRlVGlwbyhub3JtYWxpemVkQXNpc3RlbnRlVGlwbyB8fCBpbml0aWFsQXNpc3RlbnRlKTtcbiAgICAgIHNldERlc2NyaXB0aW9uKFN0cmluZyhkYXRhLmRlc2NyaXB0aW9uID8/IGRhdGEuRGVzY3JpcHRpb24gPz8gXCJcIikpO1xuICAgICAgc2V0Q29tZW50YXJpb3MoU3RyaW5nKGRhdGEuY29tZW50YXJpb3MgPz8gZGF0YS5Db21lbnRhcmlvcyA/PyBcIlwiKSk7XG4gICAgICBzZXRBbnRlY2VkZW50ZXMoU3RyaW5nKGRhdGEuYW50ZWNlZGVudGVzID8/IGRhdGEuQW50ZWNlZGVudGVzID8/IFwiXCIpKTtcbiAgICAgIHNldENvbmNsdXNpb25lcyhTdHJpbmcoZGF0YS5jb25jbHVzaW9uZXMgPz8gZGF0YS5Db25jbHVzaW9uZXMgPz8gXCJcIikpO1xuICAgIH0gY2F0Y2gge1xuICAgICAgLy8gS2VlcCBwcmV2aW91cyBVSSBiZWhhdmlvciBvbiBoeWRyYXRpb24gZXJyb3JzLlxuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRJc0h5ZHJhdGluZyhmYWxzZSk7XG4gICAgICBhcHBseURyYWZ0VmFsdWVzKCk7XG4gICAgICBhcHBseVRleHRFZGl0b3JWYWx1ZXMoKTtcbiAgICB9XG4gIH0sIFtcbiAgICBhY3RpdmlkYWRJZCxcbiAgICBhcHBseURyYWZ0VmFsdWVzLFxuICAgIGFwcGx5VGV4dEVkaXRvclZhbHVlcyxcbiAgICBhc2lzdGVudGVUaXBvcyxcbiAgICBkZWZhdWx0VmlzaXRUeXBlLFxuICAgIGluaXRpYWxBc2lzdGVudGUsXG4gICAgbWF0Y2hPcHRpb25WYWx1ZSxcbiAgICBub3JtYWxpemVEYXRlVG9JbnB1dCxcbiAgICBzZXRBbnRlY2VkZW50ZXMsXG4gICAgc2V0QXNpc3RlbnRlVGlwbyxcbiAgICBzZXRDb21lbnRhcmlvcyxcbiAgICBzZXRDb25jbHVzaW9uZXMsXG4gICAgc2V0RGVzY3JpcHRpb24sXG4gICAgc2V0SXNIeWRyYXRpbmcsXG4gICAgc2V0U3RhdHVzLFxuICAgIHNldFRyYW5zRGF0ZSxcbiAgICBzZXRWaXNpdFR5cGUsXG4gICAgdmlzaXRUeXBlcyxcbiAgXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoc2hvdWxkSHlkcmF0ZSkge1xuICAgICAgaHlkcmF0ZUZyb21BcGkoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgYXBwbHlEcmFmdFZhbHVlcygpO1xuICAgIGFwcGx5VGV4dEVkaXRvclZhbHVlcygpO1xuICB9LCBbYXBwbHlEcmFmdFZhbHVlcywgYXBwbHlUZXh0RWRpdG9yVmFsdWVzLCBoeWRyYXRlRnJvbUFwaSwgc2hvdWxkSHlkcmF0ZV0pO1xufTtcbiIsICJpbXBvcnQgeyB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHdhaXQgfSBmcm9tIFwiLi4vdXRpbHMvd2FpdC50c1wiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgeyBzaG93UGVybWlzc2lvbk1vZGFsIH0gZnJvbSBcIi4uL3V0aWxzL3Blcm1pc3Npb25zLnRzXCI7XG5pbXBvcnQgeyBzZXRIaXN0b3J5RmlsdGVyRm9yRGF0ZSwgZmxhc2hBY3Rpb25NYXJrIH0gZnJvbSBcIi4uL3V0aWxzL3Zpc2l0YXNIaXN0b3J5LnRzXCI7XG5cbnR5cGUgVXNlRGV0YWlsVG9wYmFyQWN0aW9uc0FyZ3MgPSB7XG4gIGJ1c3k6IGJvb2xlYW47XG4gIG1vZGFsT3BlbjogYm9vbGVhbjtcbiAgaXNFZGl0aW5nOiBib29sZWFuO1xuICBjYW5FZGl0SGlzdG9yeTogYm9vbGVhbjtcbiAgY2FuRGVsZXRlSGlzdG9yeTogYm9vbGVhbjtcbiAgdHJhbnNEYXRlOiBzdHJpbmc7XG4gIHNldE1vZGFsRXJyb3I6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBoYW5kbGVFbmFibGVFZGl0OiAoKSA9PiB2b2lkO1xuICBoYW5kbGVDYW5jZWxFZGl0OiAoKSA9PiB2b2lkO1xuICBoYW5kbGVVcGRhdGU6ICgpID0+IFByb21pc2U8Ym9vbGVhbj47XG4gIGhhbmRsZURlbGV0ZTogKCkgPT4gUHJvbWlzZTxib29sZWFuPjtcbiAgb3BlbkNvbmZpcm06IChvcHRzOiB7XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgY29uZmlybVRleHQ/OiBzdHJpbmc7XG4gICAgb25Db25maXJtPzogKCkgPT4gUHJvbWlzZTxib29sZWFuIHwgdm9pZD4gfCBib29sZWFuIHwgdm9pZDtcbiAgfSkgPT4gdm9pZDtcbiAgY2xvc2VDb25maXJtOiAoKSA9PiB2b2lkO1xufTtcblxuLy8gQ29vcmRpbmF0ZXMgdG9wYmFyIGljb24gdmlzaWJpbGl0eSBhbmQgYWN0aW9uIGV2ZW50cyBmb3IgZGV0YWlsIHBhZ2UuXG5leHBvcnQgY29uc3QgdXNlRGV0YWlsVG9wYmFyQWN0aW9ucyA9ICh7XG4gIGJ1c3ksXG4gIG1vZGFsT3BlbixcbiAgaXNFZGl0aW5nLFxuICBjYW5FZGl0SGlzdG9yeSxcbiAgY2FuRGVsZXRlSGlzdG9yeSxcbiAgdHJhbnNEYXRlLFxuICBzZXRNb2RhbEVycm9yLFxuICBoYW5kbGVFbmFibGVFZGl0LFxuICBoYW5kbGVDYW5jZWxFZGl0LFxuICBoYW5kbGVVcGRhdGUsXG4gIGhhbmRsZURlbGV0ZSxcbiAgb3BlbkNvbmZpcm0sXG4gIGNsb3NlQ29uZmlybSxcbn06IFVzZURldGFpbFRvcGJhckFjdGlvbnNBcmdzKSA9PiB7XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgZWRpdEljb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpc2l0RWRpdEljb25cIik7XG4gICAgY29uc3Qgc2F2ZUljb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpc2l0U2F2ZUljb25cIik7XG4gICAgY29uc3QgZGVsZXRlQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2aXNpdERlbGV0ZUJ0blwiKTtcbiAgICBjb25zdCBjYW5jZWxCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpc2l0Q2FuY2VsQnRuXCIpO1xuICAgIGlmICghZWRpdEljb24gfHwgIXNhdmVJY29uKSByZXR1cm47XG4gICAgaWYgKGlzRWRpdGluZykge1xuICAgICAgZWRpdEljb24uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgIHNhdmVJY29uLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gICAgICBpZiAoZGVsZXRlQnRuKSBkZWxldGVCdG4uY2xhc3NMaXN0LmFkZChcInRvcGJhci1oaWRkZW5cIik7XG4gICAgICBpZiAoY2FuY2VsQnRuKSBjYW5jZWxCdG4uY2xhc3NMaXN0LnJlbW92ZShcInRvcGJhci1oaWRkZW5cIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVkaXRJY29uLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gICAgICBzYXZlSWNvbi5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgaWYgKGRlbGV0ZUJ0bikgZGVsZXRlQnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJ0b3BiYXItaGlkZGVuXCIpO1xuICAgICAgaWYgKGNhbmNlbEJ0bikgY2FuY2VsQnRuLmNsYXNzTGlzdC5hZGQoXCJ0b3BiYXItaGlkZGVuXCIpO1xuICAgIH1cbiAgfSwgW2lzRWRpdGluZ10pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3Qgb25FZGl0ID0gKCkgPT4ge1xuICAgICAgaWYgKCFjYW5FZGl0SGlzdG9yeSkge1xuICAgICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChpc0VkaXRpbmcpIHtcbiAgICAgICAgaWYgKGJ1c3kgfHwgbW9kYWxPcGVuKSByZXR1cm47XG4gICAgICAgIHNldE1vZGFsRXJyb3IoXCJcIik7XG4gICAgICAgIG9wZW5Db25maXJtKHtcbiAgICAgICAgICB0aXRsZTogaW5kVChcIlZpc2l0c19EZXRhaWxfU2F2ZUNoYW5nZXNfVGl0bGVcIiwgXCJTYXZlIGNoYW5nZXNcIiksXG4gICAgICAgICAgbWVzc2FnZTogaW5kVChcIlZpc2l0c19EZXRhaWxfU2F2ZUNoYW5nZXNfQm9keVwiLCBcIkRvIHlvdSB3YW50IHRvIHNhdmUgY2hhbmdlcz9cIiksXG4gICAgICAgICAgY29uZmlybVRleHQ6IGluZFQoXCJDb21tb25fU2F2ZVwiLCBcIlNhdmVcIiksXG4gICAgICAgICAgb25Db25maXJtOiBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBvayA9IGF3YWl0IGhhbmRsZVVwZGF0ZSgpO1xuICAgICAgICAgICAgaWYgKG9rKSB7XG4gICAgICAgICAgICAgIGNsb3NlQ29uZmlybSgpO1xuICAgICAgICAgICAgICBzZXRIaXN0b3J5RmlsdGVyRm9yRGF0ZSh0cmFuc0RhdGUpO1xuICAgICAgICAgICAgICBhd2FpdCB3YWl0KDIwMCk7XG4gICAgICAgICAgICAgIGZsYXNoQWN0aW9uTWFyayhcIm9rUHJvY2Vzc1wiLCAxMjAwKTtcbiAgICAgICAgICAgICAgYXdhaXQgd2FpdCgxMjAwKTtcbiAgICAgICAgICAgICAgd2luZG93Ll9faW5kQnlwYXNzTmF2aWdhdGlvbkd1YXJkT25jZT8uKCk7XG4gICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvSGlzdG9yaWFsL0hpc3RvcnlcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBvaztcbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGhhbmRsZUVuYWJsZUVkaXQoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3Qgb25EZWxldGUgPSAoKSA9PiB7XG4gICAgICBpZiAoIWNhbkRlbGV0ZUhpc3RvcnkpIHtcbiAgICAgICAgc2hvd1Blcm1pc3Npb25Nb2RhbCgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoYnVzeSB8fCBtb2RhbE9wZW4pIHJldHVybjtcbiAgICAgIHNldE1vZGFsRXJyb3IoXCJcIik7XG4gICAgICBvcGVuQ29uZmlybSh7XG4gICAgICAgIHRpdGxlOiBpbmRUKFwiVmlzaXRzX0RldGFpbF9EZWxldGVBY3Rpdml0eV9UaXRsZVwiLCBcIkRlbGV0ZSBhY3Rpdml0eVwiKSxcbiAgICAgICAgbWVzc2FnZTogaW5kVChcIlZpc2l0c19EZXRhaWxfRGVsZXRlQWN0aXZpdHlfQm9keVwiLCBcIkRvIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGlzIGFjdGl2aXR5P1wiKSxcbiAgICAgICAgY29uZmlybVRleHQ6IGluZFQoXCJDb21tb25fRGVsZXRlXCIsIFwiRGVsZXRlXCIpLFxuICAgICAgICBvbkNvbmZpcm06IGFzeW5jICgpID0+IHtcbiAgICAgICAgICBjb25zdCBvayA9IGF3YWl0IGhhbmRsZURlbGV0ZSgpO1xuICAgICAgICAgIGlmIChvaykge1xuICAgICAgICAgICAgY2xvc2VDb25maXJtKCk7XG4gICAgICAgICAgICBzZXRIaXN0b3J5RmlsdGVyRm9yRGF0ZSh0cmFuc0RhdGUpO1xuICAgICAgICAgICAgYXdhaXQgd2FpdCgyMDApO1xuICAgICAgICAgICAgZmxhc2hBY3Rpb25NYXJrKFwib2tEZWxQcm9jZXNzXCIsIDEyMDApO1xuICAgICAgICAgICAgYXdhaXQgd2FpdCgxMjAwKTtcbiAgICAgICAgICAgIHdpbmRvdy5fX2luZEJ5cGFzc05hdmlnYXRpb25HdWFyZE9uY2U/LigpO1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9IaXN0b3JpYWwvSGlzdG9yeVwiO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gb2s7XG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgY29uc3Qgb25DYW5jZWxFZGl0ID0gKCkgPT4ge1xuICAgICAgaWYgKGJ1c3kgfHwgbW9kYWxPcGVuKSByZXR1cm47XG4gICAgICBoYW5kbGVDYW5jZWxFZGl0KCk7XG4gICAgfTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwidmlzaXQtZWRpdFwiLCBvbkVkaXQpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwidmlzaXQtZGVsZXRlXCIsIG9uRGVsZXRlKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInZpc2l0LWNhbmNlbC1lZGl0XCIsIG9uQ2FuY2VsRWRpdCk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwidmlzaXQtZWRpdFwiLCBvbkVkaXQpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ2aXNpdC1kZWxldGVcIiwgb25EZWxldGUpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ2aXNpdC1jYW5jZWwtZWRpdFwiLCBvbkNhbmNlbEVkaXQpO1xuICAgIH07XG4gIH0sIFtcbiAgICBidXN5LFxuICAgIGNhbkRlbGV0ZUhpc3RvcnksXG4gICAgY2FuRWRpdEhpc3RvcnksXG4gICAgY2xvc2VDb25maXJtLFxuICAgIGhhbmRsZUNhbmNlbEVkaXQsXG4gICAgaGFuZGxlRGVsZXRlLFxuICAgIGhhbmRsZUVuYWJsZUVkaXQsXG4gICAgaGFuZGxlVXBkYXRlLFxuICAgIGlzRWRpdGluZyxcbiAgICBtb2RhbE9wZW4sXG4gICAgb3BlbkNvbmZpcm0sXG4gICAgc2V0TW9kYWxFcnJvcixcbiAgICB0cmFuc0RhdGUsXG4gIF0pO1xufTtcbiIsICJcdUZFRkZpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBnZXRTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5LCByZW1vdmVTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5LCBzZXRTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5IH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3Nlc3Npb25FeHBpcnkudHNcIjtcblxuY29uc3QgRURJVF9NT0RFX1RUTF9NUyA9IDYgKiA2MCAqIDYwICogMTAwMDtcbmNvbnN0IERFVEFJTF9EUkFGVF9UVExfTVMgPSAyNCAqIDYwICogNjAgKiAxMDAwO1xuXG50eXBlIFVzZURldGFpbEVkaXRTZXNzaW9uQXJncyA9IHtcbiAgYWN0aXZpZGFkSWQ6IHN0cmluZztcbiAgcmVjSWQ6IHN0cmluZztcbiAgY2FuRWRpdEhpc3Rvcnk6IGJvb2xlYW47XG4gIGlzRWRpdGluZzogYm9vbGVhbjtcbiAgc2V0SXNFZGl0aW5nOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxib29sZWFuPj47XG4gIHRyYW5zRGF0ZTogc3RyaW5nO1xuICB2aXNpdFR5cGU6IHN0cmluZztcbiAgYXNpc3RlbnRlVGlwbzogc3RyaW5nO1xuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICBjb21lbnRhcmlvczogc3RyaW5nO1xuICBhbnRlY2VkZW50ZXM6IHN0cmluZztcbiAgY29uY2x1c2lvbmVzOiBzdHJpbmc7XG4gIHNldFRyYW5zRGF0ZTogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XG4gIHNldFZpc2l0VHlwZTogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XG4gIHNldEFzaXN0ZW50ZVRpcG86IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPHN0cmluZz4+O1xuICBzZXREZXNjcmlwdGlvbjogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XG4gIHNldENvbWVudGFyaW9zOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcbiAgc2V0QW50ZWNlZGVudGVzOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcbiAgc2V0Q29uY2x1c2lvbmVzOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+Pjtcbn07XG5cbnR5cGUgRGV0YWlsRHJhZnRWYWx1ZXMgPSB7XG4gIHRyYW5zRGF0ZTogc3RyaW5nO1xuICB2aXNpdFR5cGU6IHN0cmluZztcbiAgYXNpc3RlbnRlVGlwbzogc3RyaW5nO1xuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICBjb21lbnRhcmlvczogc3RyaW5nO1xuICBhbnRlY2VkZW50ZXM6IHN0cmluZztcbiAgY29uY2x1c2lvbmVzOiBzdHJpbmc7XG59O1xuXG4vLyBNYW5hZ2VzIGVkaXQtbW9kZSBzZXNzaW9uIGZsYWdzIGFuZCBkZXRhaWwgZHJhZnQgcGVyc2lzdGVuY2UuXG5leHBvcnQgY29uc3QgdXNlRGV0YWlsRWRpdFNlc3Npb24gPSAoe1xuICBhY3RpdmlkYWRJZCxcbiAgcmVjSWQsXG4gIGNhbkVkaXRIaXN0b3J5LFxuICBpc0VkaXRpbmcsXG4gIHNldElzRWRpdGluZyxcbiAgdHJhbnNEYXRlLFxuICB2aXNpdFR5cGUsXG4gIGFzaXN0ZW50ZVRpcG8sXG4gIGRlc2NyaXB0aW9uLFxuICBjb21lbnRhcmlvcyxcbiAgYW50ZWNlZGVudGVzLFxuICBjb25jbHVzaW9uZXMsXG4gIHNldFRyYW5zRGF0ZSxcbiAgc2V0VmlzaXRUeXBlLFxuICBzZXRBc2lzdGVudGVUaXBvLFxuICBzZXREZXNjcmlwdGlvbixcbiAgc2V0Q29tZW50YXJpb3MsXG4gIHNldEFudGVjZWRlbnRlcyxcbiAgc2V0Q29uY2x1c2lvbmVzLFxufTogVXNlRGV0YWlsRWRpdFNlc3Npb25BcmdzKSA9PiB7XG4gIGNvbnN0IGVkaXRNb2RlS2V5UmVmID0gdXNlUmVmKFwiXCIpO1xuICBjb25zdCBkcmFmdEtleVJlZiA9IHVzZVJlZihcIlwiKTtcbiAgY29uc3QgZHJhZnRQZXJzaXN0VGltZXJSZWYgPSB1c2VSZWY8bnVtYmVyIHwgbnVsbD4obnVsbCk7XG5cbiAgLy8gUGVyc2lzdCBlZGl0IG1vZGUgd2hpbGUgdXNlciBuYXZpZ2F0ZXMgdG8gdGhlIHRleHQgZWRpdG9yIGFuZCBiYWNrLlxuICBjb25zdCBzeW5jRWRpdE1vZGVGbGFnID0gdXNlQ2FsbGJhY2soKGVuYWJsZWQ6IGJvb2xlYW4pID0+IHtcbiAgICBjb25zdCBrZXkgPSBlZGl0TW9kZUtleVJlZi5jdXJyZW50O1xuICAgIGlmICgha2V5KSByZXR1cm47XG4gICAgaWYgKGVuYWJsZWQpIHtcbiAgICAgIHNldFNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoa2V5LCBcInRydWVcIiwgRURJVF9NT0RFX1RUTF9NUyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJlbW92ZVNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoa2V5KTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IHN5bmNFZGl0TW9kZU9uRW50cnkgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgY29uc3QgYmFzZUlkID0gYWN0aXZpZGFkSWQgfHwgcmVjSWQgfHwgXCJkZWZhdWx0XCI7XG4gICAgY29uc3Qga2V5ID0gYGluZF92aXNpdF9lZGl0XyR7YmFzZUlkfWA7XG4gICAgY29uc3QgcmV0dXJuS2V5ID0gYCR7a2V5fV9yZXR1cm5gO1xuICAgIGNvbnN0IGRyYWZ0S2V5ID0gYGluZF92aXNpdF9kcmFmdF8ke2Jhc2VJZH1gO1xuICAgIGVkaXRNb2RlS2V5UmVmLmN1cnJlbnQgPSBrZXk7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgYWxsb3dSZXN0b3JlID0gZ2V0U2Vzc2lvblZhbHVlV2l0aEV4cGlyeShyZXR1cm5LZXkpID09PSBcIjFcIjtcbiAgICAgIGlmIChhbGxvd1Jlc3RvcmUpIHtcbiAgICAgICAgcmVtb3ZlU2Vzc2lvblZhbHVlV2l0aEV4cGlyeShyZXR1cm5LZXkpO1xuICAgICAgfVxuXG4gICAgICBpZiAoY2FuRWRpdEhpc3RvcnkgJiYgYWxsb3dSZXN0b3JlICYmIGdldFNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoa2V5KSA9PT0gXCJ0cnVlXCIpIHtcbiAgICAgICAgc2V0SXNFZGl0aW5nKHRydWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2V0SXNFZGl0aW5nKGZhbHNlKTtcbiAgICAgICAgcmVtb3ZlU2Vzc2lvblZhbHVlV2l0aEV4cGlyeShrZXkpO1xuICAgICAgICByZW1vdmVTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KGRyYWZ0S2V5KTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFjYW5FZGl0SGlzdG9yeSkge1xuICAgICAgICByZW1vdmVTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KGtleSk7XG4gICAgICAgIHJlbW92ZVNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoZHJhZnRLZXkpO1xuICAgICAgfVxuICAgIH0gY2F0Y2gge1xuICAgICAgLyogaWdub3JlICovXG4gICAgfVxuICB9LCBbYWN0aXZpZGFkSWQsIGNhbkVkaXRIaXN0b3J5LCByZWNJZCwgc2V0SXNFZGl0aW5nXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBzeW5jRWRpdE1vZGVPbkVudHJ5KCk7XG4gIH0sIFtzeW5jRWRpdE1vZGVPbkVudHJ5XSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBvblBhZ2VTaG93ID0gKGV2ZW50OiBQYWdlVHJhbnNpdGlvbkV2ZW50KSA9PiB7XG4gICAgICBjb25zdCBuYXZFbnRyeSA9IHR5cGVvZiBwZXJmb3JtYW5jZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBwZXJmb3JtYW5jZS5nZXRFbnRyaWVzQnlUeXBlXG4gICAgICAgID8gKHBlcmZvcm1hbmNlLmdldEVudHJpZXNCeVR5cGUoXCJuYXZpZ2F0aW9uXCIpWzBdIGFzIFBlcmZvcm1hbmNlTmF2aWdhdGlvblRpbWluZyB8IHVuZGVmaW5lZClcbiAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgICBjb25zdCBpc0JhY2tGb3J3YXJkID0gbmF2RW50cnk/LnR5cGUgPT09IFwiYmFja19mb3J3YXJkXCI7XG4gICAgICBpZiAoZXZlbnQ/LnBlcnNpc3RlZCB8fCBpc0JhY2tGb3J3YXJkKSB7XG4gICAgICAgIHN5bmNFZGl0TW9kZU9uRW50cnkoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwYWdlc2hvd1wiLCBvblBhZ2VTaG93KTtcbiAgICByZXR1cm4gKCkgPT4gd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwYWdlc2hvd1wiLCBvblBhZ2VTaG93KTtcbiAgfSwgW3N5bmNFZGl0TW9kZU9uRW50cnldKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGtleSA9IGBpbmRfdmlzaXRfZHJhZnRfJHthY3RpdmlkYWRJZCB8fCByZWNJZCB8fCBcImRlZmF1bHRcIn1gO1xuICAgIGRyYWZ0S2V5UmVmLmN1cnJlbnQgPSBrZXk7XG4gIH0sIFthY3RpdmlkYWRJZCwgcmVjSWRdKTtcblxuICBjb25zdCBzYXZlRHJhZnQgPSB1c2VDYWxsYmFjaygoZHJhZnQ6IERldGFpbERyYWZ0VmFsdWVzKSA9PiB7XG4gICAgY29uc3Qga2V5ID0gZHJhZnRLZXlSZWYuY3VycmVudDtcbiAgICBpZiAoIWtleSkgcmV0dXJuO1xuICAgIHNldFNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoa2V5LCBKU09OLnN0cmluZ2lmeShkcmFmdCksIERFVEFJTF9EUkFGVF9UVExfTVMpO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgY2xlYXJEcmFmdCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBjb25zdCBrZXkgPSBkcmFmdEtleVJlZi5jdXJyZW50O1xuICAgIGlmICgha2V5KSByZXR1cm47XG4gICAgcmVtb3ZlU2Vzc2lvblZhbHVlV2l0aEV4cGlyeShrZXkpO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgYXBwbHlEcmFmdFZhbHVlcyA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBjb25zdCBrZXkgPSBkcmFmdEtleVJlZi5jdXJyZW50O1xuICAgIGlmICgha2V5KSByZXR1cm47XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcmF3ID0gZ2V0U2Vzc2lvblZhbHVlV2l0aEV4cGlyeShrZXkpO1xuICAgICAgaWYgKCFyYXcpIHJldHVybjtcbiAgICAgIGNvbnN0IGRyYWZ0ID0gSlNPTi5wYXJzZShyYXcpIGFzIFBhcnRpYWw8RGV0YWlsRHJhZnRWYWx1ZXM+O1xuICAgICAgaWYgKCFkcmFmdCB8fCB0eXBlb2YgZHJhZnQgIT09IFwib2JqZWN0XCIpIHJldHVybjtcblxuICAgICAgaWYgKGRyYWZ0LnRyYW5zRGF0ZSAhPT0gdW5kZWZpbmVkKSBzZXRUcmFuc0RhdGUoU3RyaW5nKGRyYWZ0LnRyYW5zRGF0ZSkpO1xuICAgICAgaWYgKGRyYWZ0LnZpc2l0VHlwZSAhPT0gdW5kZWZpbmVkKSBzZXRWaXNpdFR5cGUoU3RyaW5nKGRyYWZ0LnZpc2l0VHlwZSkpO1xuICAgICAgaWYgKGRyYWZ0LmFzaXN0ZW50ZVRpcG8gIT09IHVuZGVmaW5lZCkgc2V0QXNpc3RlbnRlVGlwbyhTdHJpbmcoZHJhZnQuYXNpc3RlbnRlVGlwbykpO1xuICAgICAgaWYgKGRyYWZ0LmRlc2NyaXB0aW9uICE9PSB1bmRlZmluZWQpIHNldERlc2NyaXB0aW9uKFN0cmluZyhkcmFmdC5kZXNjcmlwdGlvbikpO1xuICAgICAgaWYgKGRyYWZ0LmNvbWVudGFyaW9zICE9PSB1bmRlZmluZWQpIHNldENvbWVudGFyaW9zKFN0cmluZyhkcmFmdC5jb21lbnRhcmlvcykpO1xuICAgICAgaWYgKGRyYWZ0LmFudGVjZWRlbnRlcyAhPT0gdW5kZWZpbmVkKSBzZXRBbnRlY2VkZW50ZXMoU3RyaW5nKGRyYWZ0LmFudGVjZWRlbnRlcykpO1xuICAgICAgaWYgKGRyYWZ0LmNvbmNsdXNpb25lcyAhPT0gdW5kZWZpbmVkKSBzZXRDb25jbHVzaW9uZXMoU3RyaW5nKGRyYWZ0LmNvbmNsdXNpb25lcykpO1xuICAgIH0gY2F0Y2gge1xuICAgICAgLyogaWdub3JlICovXG4gICAgfVxuICB9LCBbc2V0QW50ZWNlZGVudGVzLCBzZXRBc2lzdGVudGVUaXBvLCBzZXRDb21lbnRhcmlvcywgc2V0Q29uY2x1c2lvbmVzLCBzZXREZXNjcmlwdGlvbiwgc2V0VHJhbnNEYXRlLCBzZXRWaXNpdFR5cGVdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghaXNFZGl0aW5nKSB7XG4gICAgICBpZiAoZHJhZnRQZXJzaXN0VGltZXJSZWYuY3VycmVudCkge1xuICAgICAgICBjbGVhclRpbWVvdXQoZHJhZnRQZXJzaXN0VGltZXJSZWYuY3VycmVudCk7XG4gICAgICAgIGRyYWZ0UGVyc2lzdFRpbWVyUmVmLmN1cnJlbnQgPSBudWxsO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChkcmFmdFBlcnNpc3RUaW1lclJlZi5jdXJyZW50KSB7XG4gICAgICBjbGVhclRpbWVvdXQoZHJhZnRQZXJzaXN0VGltZXJSZWYuY3VycmVudCk7XG4gICAgfVxuXG4gICAgZHJhZnRQZXJzaXN0VGltZXJSZWYuY3VycmVudCA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGRyYWZ0UGVyc2lzdFRpbWVyUmVmLmN1cnJlbnQgPSBudWxsO1xuICAgICAgc2F2ZURyYWZ0KHtcbiAgICAgICAgdHJhbnNEYXRlLFxuICAgICAgICB2aXNpdFR5cGUsXG4gICAgICAgIGFzaXN0ZW50ZVRpcG8sXG4gICAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgICBjb21lbnRhcmlvcyxcbiAgICAgICAgYW50ZWNlZGVudGVzLFxuICAgICAgICBjb25jbHVzaW9uZXMsXG4gICAgICB9KTtcbiAgICB9LCAxODApO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGlmIChkcmFmdFBlcnNpc3RUaW1lclJlZi5jdXJyZW50KSB7XG4gICAgICAgIGNsZWFyVGltZW91dChkcmFmdFBlcnNpc3RUaW1lclJlZi5jdXJyZW50KTtcbiAgICAgICAgZHJhZnRQZXJzaXN0VGltZXJSZWYuY3VycmVudCA9IG51bGw7XG4gICAgICB9XG4gICAgfTtcbiAgfSwgW2FudGVjZWRlbnRlcywgYXNpc3RlbnRlVGlwbywgY29tZW50YXJpb3MsIGNvbmNsdXNpb25lcywgZGVzY3JpcHRpb24sIGlzRWRpdGluZywgc2F2ZURyYWZ0LCB0cmFuc0RhdGUsIHZpc2l0VHlwZV0pO1xuXG4gIHJldHVybiB7XG4gICAgZWRpdE1vZGVLZXlSZWYsXG4gICAgc3luY0VkaXRNb2RlRmxhZyxcbiAgICBjbGVhckRyYWZ0LFxuICAgIGFwcGx5RHJhZnRWYWx1ZXMsXG4gIH07XG59O1xyXG4iLCAiXHVGRUZGaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBmZXRjaEpzb24gfSBmcm9tIFwiLi4vLi4vLi4vc2VydmljZXMvYXBpU2VydmljZS50c1wiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgeyBzaG93UGVybWlzc2lvbk1vZGFsIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3Blcm1pc3Npb25zLnRzXCI7XG5pbXBvcnQgeyBmbGFzaEFjdGlvbk1hcmsgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvdmlzaXRhc0hpc3RvcnkudHNcIjtcblxudHlwZSBPcHRpb25MaWtlID0ge1xuICB2YWx1ZT86IHN0cmluZyB8IG51bWJlcjtcbiAgVmFsdWU/OiBzdHJpbmcgfCBudW1iZXI7XG4gIHRleHQ/OiBzdHJpbmc7XG4gIFRleHQ/OiBzdHJpbmc7XG59O1xuXG50eXBlIFVzZURldGFpbE11dGF0aW9uc0FyZ3MgPSB7XG4gIGJ1c3k6IGJvb2xlYW47XG4gIGlzRWRpdGluZzogYm9vbGVhbjtcbiAgY2FuRWRpdEhpc3Rvcnk6IGJvb2xlYW47XG4gIGNhbkRlbGV0ZUhpc3Rvcnk6IGJvb2xlYW47XG4gIHJlY0lkOiBzdHJpbmc7XG4gIGFjY291bnROdW06IHN0cmluZztcbiAgdHJhbnNEYXRlOiBzdHJpbmc7XG4gIHZpc2l0VHlwZTogc3RyaW5nO1xuICBhc2lzdGVudGVUaXBvOiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIGNvbWVudGFyaW9zOiBzdHJpbmc7XG4gIGFudGVjZWRlbnRlczogc3RyaW5nO1xuICBjb25jbHVzaW9uZXM6IHN0cmluZztcbiAgdmlzaXRUeXBlczogT3B0aW9uTGlrZVtdO1xuICBhc2lzdGVudGVUaXBvczogT3B0aW9uTGlrZVtdO1xuICBkZWZhdWx0VmlzaXRUeXBlOiBzdHJpbmc7XG4gIHJhd0luaXRpYWxWaXNpdFR5cGU6IHN0cmluZztcbiAgcmF3SW5pdGlhbEFzaXN0ZW50ZTogc3RyaW5nO1xuICBtYXRjaE9wdGlvblZhbHVlOiAob3B0aW9uczogT3B0aW9uTGlrZVtdLCByYXc6IHVua25vd24pID0+IHN0cmluZztcbiAgY2xlYXJEcmFmdDogKCkgPT4gdm9pZDtcbiAgc3luY0VkaXRNb2RlRmxhZzogKGVuYWJsZWQ6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHNldE1vZGFsRXJyb3I6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPHN0cmluZz4+O1xuICBzZXRCdXN5OiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxib29sZWFuPj47XG4gIHNldFN0YXR1czogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XG4gIHNldElzRWRpdGluZzogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248Ym9vbGVhbj4+O1xufTtcblxuLy8gRW5jYXBzdWxhdGVzIHVwZGF0ZSBhbmQgZGVsZXRlIG11dGF0aW9ucyBmb3IgZGV0YWlsIGZvcm0gc3RhdGUuXG5leHBvcnQgY29uc3QgdXNlRGV0YWlsTXV0YXRpb25zID0gKHtcbiAgYnVzeSxcbiAgaXNFZGl0aW5nLFxuICBjYW5FZGl0SGlzdG9yeSxcbiAgY2FuRGVsZXRlSGlzdG9yeSxcbiAgcmVjSWQsXG4gIGFjY291bnROdW0sXG4gIHRyYW5zRGF0ZSxcbiAgdmlzaXRUeXBlLFxuICBhc2lzdGVudGVUaXBvLFxuICBkZXNjcmlwdGlvbixcbiAgY29tZW50YXJpb3MsXG4gIGFudGVjZWRlbnRlcyxcbiAgY29uY2x1c2lvbmVzLFxuICB2aXNpdFR5cGVzLFxuICBhc2lzdGVudGVUaXBvcyxcbiAgZGVmYXVsdFZpc2l0VHlwZSxcbiAgcmF3SW5pdGlhbFZpc2l0VHlwZSxcbiAgcmF3SW5pdGlhbEFzaXN0ZW50ZSxcbiAgbWF0Y2hPcHRpb25WYWx1ZSxcbiAgY2xlYXJEcmFmdCxcbiAgc3luY0VkaXRNb2RlRmxhZyxcbiAgc2V0TW9kYWxFcnJvcixcbiAgc2V0QnVzeSxcbiAgc2V0U3RhdHVzLFxuICBzZXRJc0VkaXRpbmcsXG59OiBVc2VEZXRhaWxNdXRhdGlvbnNBcmdzKSA9PiB7XG4gIGNvbnN0IGhhbmRsZVVwZGF0ZSA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcbiAgICBpZiAoYnVzeSB8fCAhaXNFZGl0aW5nKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKCFjYW5FZGl0SGlzdG9yeSkge1xuICAgICAgc2hvd1Blcm1pc3Npb25Nb2RhbCgpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHNldE1vZGFsRXJyb3IoXCJcIik7XG4gICAgc2V0QnVzeSh0cnVlKTtcbiAgICBzZXRTdGF0dXMoaW5kVChcIlZpc2l0c19EZXRhaWxfVXBkYXRpbmdcIiwgXCJVcGRhdGluZyBhY3Rpdml0eS4uLlwiKSk7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3Qgbm9ybWFsaXplZFZpc2l0VHlwZSA9XG4gICAgICAgIG1hdGNoT3B0aW9uVmFsdWUodmlzaXRUeXBlcywgdmlzaXRUeXBlKSB8fFxuICAgICAgICBtYXRjaE9wdGlvblZhbHVlKHZpc2l0VHlwZXMsIHJhd0luaXRpYWxWaXNpdFR5cGUpIHx8XG4gICAgICAgIGRlZmF1bHRWaXNpdFR5cGU7XG4gICAgICBjb25zdCBub3JtYWxpemVkQXNpc3RlbnRlVGlwbyA9XG4gICAgICAgIG1hdGNoT3B0aW9uVmFsdWUoYXNpc3RlbnRlVGlwb3MsIGFzaXN0ZW50ZVRpcG8pIHx8XG4gICAgICAgIG1hdGNoT3B0aW9uVmFsdWUoYXNpc3RlbnRlVGlwb3MsIHJhd0luaXRpYWxBc2lzdGVudGUpIHx8XG4gICAgICAgIHJhd0luaXRpYWxBc2lzdGVudGU7XG5cbiAgICAgIGNvbnN0IHBheWxvYWQgPSB7XG4gICAgICAgIGFjY291bnROdW0sXG4gICAgICAgIHZpc2l0VHlwZTogbm9ybWFsaXplZFZpc2l0VHlwZSxcbiAgICAgICAgYXNpc3RlbnRlVGlwbzogbm9ybWFsaXplZEFzaXN0ZW50ZVRpcG8sXG4gICAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgICB0cmFuc0RhdGUsXG4gICAgICAgIGNvbWVudGFyaW9zLFxuICAgICAgICBhbnRlY2VkZW50ZXMsXG4gICAgICAgIGNvbmNsdXNpb25lcyxcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IHNhZmVSZWNJZCA9IGVuY29kZVVSSUNvbXBvbmVudChyZWNJZCk7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbihgL1Zpc2l0YXMvVXBkYXRlQWN0aXZpdHkvJHtzYWZlUmVjSWR9YCwge1xuICAgICAgICBtZXRob2Q6IFwiUFVUXCIsXG4gICAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGF5bG9hZCksXG4gICAgICB9KTtcblxuICAgICAgaWYgKCFyZXNwb25zZS5zdWNjZXNzKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihyZXNwb25zZS5tZXNzYWdlIHx8IGluZFQoXCJWaXNpdHNfRGV0YWlsX1VwZGF0ZUZhaWxlZFwiLCBcIlVwZGF0ZSBmYWlsZWQuXCIpKTtcbiAgICAgIH1cblxuICAgICAgc2V0U3RhdHVzKGluZFQoXCJWaXNpdHNfRGV0YWlsX1VwZGF0ZWRcIiwgXCJBY3Rpdml0eSB1cGRhdGVkXCIpKTtcbiAgICAgIHNldElzRWRpdGluZyhmYWxzZSk7XG4gICAgICBzeW5jRWRpdE1vZGVGbGFnKGZhbHNlKTtcbiAgICAgIGNsZWFyRHJhZnQoKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zdCBtZXNzYWdlID0gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciAmJiBlcnJvci5tZXNzYWdlXG4gICAgICAgID8gZXJyb3IubWVzc2FnZVxuICAgICAgICA6IGluZFQoXCJWaXNpdHNfRGV0YWlsX1VwZGF0ZUVycm9yXCIsIFwiVXBkYXRlIGVycm9yLlwiKTtcbiAgICAgIHNldE1vZGFsRXJyb3IobWVzc2FnZSk7XG4gICAgICBzZXRTdGF0dXMobWVzc2FnZSk7XG4gICAgICBmbGFzaEFjdGlvbk1hcmsoXCJlcnJvclByb2Nlc3NcIiwgMTUwMCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldEJ1c3koZmFsc2UpO1xuICAgIH1cbiAgfSwgW1xuICAgIGFjY291bnROdW0sXG4gICAgYW50ZWNlZGVudGVzLFxuICAgIGFzaXN0ZW50ZVRpcG8sXG4gICAgYXNpc3RlbnRlVGlwb3MsXG4gICAgYnVzeSxcbiAgICBjYW5FZGl0SGlzdG9yeSxcbiAgICBjbGVhckRyYWZ0LFxuICAgIGNvbWVudGFyaW9zLFxuICAgIGNvbmNsdXNpb25lcyxcbiAgICBkZWZhdWx0VmlzaXRUeXBlLFxuICAgIGRlc2NyaXB0aW9uLFxuICAgIGlzRWRpdGluZyxcbiAgICBtYXRjaE9wdGlvblZhbHVlLFxuICAgIHJhd0luaXRpYWxBc2lzdGVudGUsXG4gICAgcmF3SW5pdGlhbFZpc2l0VHlwZSxcbiAgICByZWNJZCxcbiAgICBzZXRCdXN5LFxuICAgIHNldElzRWRpdGluZyxcbiAgICBzZXRNb2RhbEVycm9yLFxuICAgIHNldFN0YXR1cyxcbiAgICBzeW5jRWRpdE1vZGVGbGFnLFxuICAgIHRyYW5zRGF0ZSxcbiAgICB2aXNpdFR5cGUsXG4gICAgdmlzaXRUeXBlcyxcbiAgXSk7XG5cbiAgY29uc3QgaGFuZGxlRGVsZXRlID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xuICAgIGlmIChidXN5KSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKCFjYW5EZWxldGVIaXN0b3J5KSB7XG4gICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgc2V0TW9kYWxFcnJvcihcIlwiKTtcbiAgICBzZXRCdXN5KHRydWUpO1xuICAgIHNldFN0YXR1cyhpbmRUKFwiVmlzaXRzX0RldGFpbF9EZWxldGluZ1wiLCBcIkRlbGV0aW5nIGFjdGl2aXR5Li4uXCIpKTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCBzYWZlUmVjSWQgPSBlbmNvZGVVUklDb21wb25lbnQocmVjSWQpO1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb24oYC9WaXNpdGFzL0RlbGV0ZUFjdGl2aXR5LyR7c2FmZVJlY0lkfWAsIHsgbWV0aG9kOiBcIkRFTEVURVwiIH0pO1xuICAgICAgaWYgKCFyZXNwb25zZS5zdWNjZXNzKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihyZXNwb25zZS5tZXNzYWdlIHx8IGluZFQoXCJWaXNpdHNfRGV0YWlsX0RlbGV0ZUZhaWxlZFwiLCBcIkRlbGV0ZSBmYWlsZWQuXCIpKTtcbiAgICAgIH1cblxuICAgICAgc2V0U3RhdHVzKGluZFQoXCJWaXNpdHNfRGV0YWlsX0RlbGV0ZWRcIiwgXCJBY3Rpdml0eSBkZWxldGVkXCIpKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zdCBtZXNzYWdlID0gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciAmJiBlcnJvci5tZXNzYWdlXG4gICAgICAgID8gZXJyb3IubWVzc2FnZVxuICAgICAgICA6IGluZFQoXCJWaXNpdHNfRGV0YWlsX0RlbGV0ZUVycm9yXCIsIFwiRGVsZXRlIGVycm9yLlwiKTtcbiAgICAgIHNldE1vZGFsRXJyb3IobWVzc2FnZSk7XG4gICAgICBzZXRTdGF0dXMobWVzc2FnZSk7XG4gICAgICBmbGFzaEFjdGlvbk1hcmsoXCJlcnJvclByb2Nlc3NcIiwgMTUwMCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldEJ1c3koZmFsc2UpO1xuICAgIH1cbiAgfSwgW2J1c3ksIGNhbkRlbGV0ZUhpc3RvcnksIHJlY0lkLCBzZXRCdXN5LCBzZXRNb2RhbEVycm9yLCBzZXRTdGF0dXNdKTtcblxuICByZXR1cm4ge1xuICAgIGhhbmRsZVVwZGF0ZSxcbiAgICBoYW5kbGVEZWxldGUsXG4gIH07XG59O1xyXG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IERldGFpbEZvcm0gZnJvbSBcIi4vRGV0YWlsRm9ybS50c3hcIjtcbmltcG9ydCBWaXNpdGFzUGFnZVByb3ZpZGVycyBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1Zpc2l0YXNQYWdlUHJvdmlkZXJzLnRzeFwiO1xuaW1wb3J0IHsgbW91bnRSZWFjdElzbGFuZCwgbW91bnRXaGVuRG9jdW1lbnRSZWFkeSB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9yZWFjdElzbGFuZC50c3hcIjtcblxuLy8gUGFnZSBlbnRyeSBmb3IgdGhlIHZpc2l0YXMgZGV0YWlsIGlzbGFuZC5cbmNvbnN0IERldGFpbFBhZ2UgPSAoKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPFZpc2l0YXNQYWdlUHJvdmlkZXJzPlxuICAgICAgPERldGFpbEZvcm0gLz5cbiAgICA8L1Zpc2l0YXNQYWdlUHJvdmlkZXJzPlxuICApO1xufTtcblxuY29uc3QgbW91bnQgPSAoKSA9PiB7XG4gIGNvbnN0IHJvb3RFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlzaXRhLWRldGFpbC1yb290XCIpO1xuICBpZiAoIXJvb3RFbCkgcmV0dXJuO1xuXG4gIG1vdW50UmVhY3RJc2xhbmQocm9vdEVsLCA8RGV0YWlsUGFnZSAvPik7XG59O1xuXG5tb3VudFdoZW5Eb2N1bWVudFJlYWR5KG1vdW50KTtcblxuZXhwb3J0IGRlZmF1bHQgRGV0YWlsUGFnZTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUFBLGdCQUF5RTs7O0FDQWxFLElBQU0sb0JBQW9CLENBQUMsT0FBMkI7QUFDM0QsTUFBSSxDQUFDLEdBQUksUUFBTyxNQUFNO0FBQUEsRUFBQztBQUN2QixRQUFNLFNBQVMsQ0FBQyxVQUFpQixNQUFNLGVBQWU7QUFDdEQsUUFBTSxTQUFTLENBQUMsZUFBZSxlQUFlLFFBQVEsT0FBTyxPQUFPO0FBQ3BFLFNBQU8sUUFBUSxDQUFDLFFBQVEsR0FBRyxpQkFBaUIsS0FBSyxNQUFNLENBQUM7QUFDeEQsU0FBTyxNQUFNO0FBQ1gsV0FBTyxRQUFRLENBQUMsUUFBUSxHQUFHLG9CQUFvQixLQUFLLE1BQU0sQ0FBQztBQUFBLEVBQzdEO0FBQ0Y7OztBQ1JPLElBQU0sV0FBVyxDQUFDLFVBQW1CLE9BQU8sU0FBUyxFQUFFLEVBQUUsS0FBSyxFQUFFLFNBQVM7OztBQ0FoRixtQkFBdUM7QUEyQmhDLElBQU0scUJBQXFCLENBQUM7QUFBQSxFQUNqQztBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFD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QUFzQjtBQUFBLGNBQ3RCLHFCQUFxQixDQUFDO0FBQUEsY0FDdEIscUJBQXFCO0FBQUEsY0FDckIsV0FBVztBQUFBLGdCQUNUO0FBQUEsa0JBQ0UsSUFBSTtBQUFBLGtCQUNKLE9BQU87QUFBQSxrQkFDUCxPQUFPO0FBQUEsa0JBQ1AsV0FBVztBQUFBLGtCQUNYLGlCQUFpQjtBQUFBLGdCQUNuQjtBQUFBLGdCQUNBO0FBQUEsa0JBQ0UsSUFBSTtBQUFBLGtCQUNKLE9BQU87QUFBQSxrQkFDUCxPQUFPO0FBQUEsa0JBQ1AsV0FBVztBQUFBLGtCQUNYLGlCQUFpQjtBQUFBLGdCQUNuQjtBQUFBLGdCQUNBO0FBQUEsa0JBQ0UsSUFBSTtBQUFBLGtCQUNKLE9BQU87QUFBQSxrQkFDUCxPQUFPO0FBQUEsa0JBQ1AsV0FBVztBQUFBLGtCQUNYLGlCQUFpQjtBQUFBLGdCQUNuQjtBQUFBLGNBQ0Y7QUFBQTtBQUFBLFVBQ0Y7QUFBQSxVQUVBLDRDQUFDLFNBQUksV0FBVSxrREFDYixzREFBQyxVQUFNLGtCQUFPLEdBQ2hCO0FBQUE7QUFBQTtBQUFBLElBQ0Y7QUFBQSxLQUNGO0FBRUo7QUFHZSxTQUFSLGFBQThCO0FBQ25DLFNBQ0UsNENBQUMsNEJBQWlCLGlCQUFpQixLQUFLLCtCQUErQiwwRUFBMEUsR0FDL0ksc0RBQUMsYUFBVSxHQUNiO0FBRUo7OztBTzdmTSxJQUFBQyxzQkFBQTtBQUhOLElBQU0sYUFBYSxNQUFNO0FBQ3ZCLFNBQ0UsNkNBQUMsZ0NBQ0MsdURBQUMsY0FBVyxHQUNkO0FBRUo7QUFFQSxJQUFNLFFBQVEsTUFBTTtBQUNsQixRQUFNLFNBQVMsU0FBUyxlQUFlLG9CQUFvQjtBQUMzRCxNQUFJLENBQUMsT0FBUTtBQUViLG1CQUFpQixRQUFRLDZDQUFDLGNBQVcsQ0FBRTtBQUN6QztBQUVBLHVCQUF1QixLQUFLO0FBRTVCLElBQU8scUJBQVE7IiwKICAibmFtZXMiOiBbImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfanN4X3J1bnRpbWUiXQp9Cg==
