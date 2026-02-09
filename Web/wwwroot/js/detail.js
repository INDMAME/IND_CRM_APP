import {
  AppErrorBoundary_default,
  ConfirmModal,
  SelectCombobox_default,
  SingleDatePicker,
  VisitNarrativeFields_default,
  VisitasPageProviders_default,
  isOverflowing,
  setPreviewAnchor,
  showPreviewTooltip,
  useConfirmDialog,
  useTapGuard,
  useTextEditorFields,
  useVisitas,
  wait
} from "./chunks/chunk-I2NQSFQW.js";
import {
  Spinner_default,
  canAccess,
  classNames,
  fetchJson,
  flashActionMark,
  indT,
  setHistoryFilterForDate,
  showPermissionModal
} from "./chunks/chunk-J3WMNRY4.js";
import {
  primeTextEditorValue,
  setTextEditorReturnUrl
} from "./chunks/chunk-QO7GVWVB.js";
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
      const safeId = String(fieldId || "").trim();
      const safeLabel = String(fieldLabel || "").trim();
      const readOnly = options?.readOnly === true;
      const allowEdit = options?.allowEdit !== false;
      const editModeKey = String(options?.editModeKey || "").trim();
      if (safeId) {
        primeTextEditorValue(safeId, String(fieldValue || ""));
      }
      const returnUrl = `${window.location.pathname}${window.location.search || ""}`;
      if (safeId) {
        setTextEditorReturnUrl(safeId, returnUrl);
      }
      if (editModeKey) {
        setSessionValueWithExpiry(`${editModeKey}_return`, "1", EDITOR_RETURN_FLAG_TTL_MS);
      }
      const url = `/TextEditorReact/EditField?fieldId=${encodeURIComponent(safeId || fieldId || "")}&fieldLabel=${encodeURIComponent(safeLabel || fieldLabel || "")}&returnUrl=${encodeURIComponent(returnUrl)}&readOnly=${readOnly ? "1" : "0"}&allowEdit=${allowEdit ? "1" : "0"}` + (editModeKey ? `&editModeKey=${encodeURIComponent(editModeKey)}` : "");
      window.__indBypassNavigationGuardOnce?.();
      window.location.href = url;
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvZGV0YWlsL0RldGFpbEZvcm0udHN4IiwgIi4uL3JlYWN0L3NyYy91dGlscy9kb21HdWFyZHMudHMiLCAiLi4vcmVhY3Qvc3JjL3V0aWxzL3N0cmluZ3MudHMiLCAiLi4vcmVhY3Qvc3JjL2hvb2tzL3VzZURldGFpbEh5ZHJhdGlvbi50cyIsICIuLi9yZWFjdC9zcmMvaG9va3MvdXNlRGV0YWlsVG9wYmFyQWN0aW9ucy50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9kZXRhaWwvdXNlRGV0YWlsRWRpdFNlc3Npb24udHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvZGV0YWlsL3VzZURldGFpbE11dGF0aW9ucy50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9kZXRhaWwvRGV0YWlsUGFnZS50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZUNhbGxiYWNrLCB1c2VNZW1vIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgU2luZ2xlRGF0ZVBpY2tlciBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NpbmdsZURhdGVQaWNrZXIudHN4XCI7XG5pbXBvcnQgQ29uZmlybU1vZGFsIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvQ29uZmlybU1vZGFsLnRzeFwiO1xuaW1wb3J0IFNlbGVjdENvbWJvYm94IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvU2VsZWN0Q29tYm9ib3gudHN4XCI7XG5pbXBvcnQgQXBwRXJyb3JCb3VuZGFyeSBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0FwcEVycm9yQm91bmRhcnkudHN4XCI7XG5pbXBvcnQgeyB1c2VWaXNpdGFzIH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZVZpc2l0YXMudHNcIjtcbmltcG9ydCBTcGlubmVyIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvU3Bpbm5lci50c3hcIjtcbmltcG9ydCBWaXNpdE5hcnJhdGl2ZUZpZWxkcyBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy92aXNpdGFzL1Zpc2l0TmFycmF0aXZlRmllbGRzLnRzeFwiO1xuaW1wb3J0IHsgY2xhc3NOYW1lcyB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9jbGFzc05hbWVzLnRzXCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB7IGNhbkFjY2Vzcywgc2hvd1Blcm1pc3Npb25Nb2RhbCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9wZXJtaXNzaW9ucy50c1wiO1xuaW1wb3J0IHsgYmluZFJlYWRPbmx5R3VhcmQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvZG9tR3VhcmRzLnRzXCI7XG5pbXBvcnQgeyBoYXNWYWx1ZSB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9zdHJpbmdzLnRzXCI7XG5pbXBvcnQgeyBwcmltZVRleHRFZGl0b3JWYWx1ZSwgc2V0VGV4dEVkaXRvclJldHVyblVybCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy90ZXh0RWRpdG9yLnRzXCI7XG5pbXBvcnQgeyBmbGFzaEFjdGlvbk1hcmsgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvdmlzaXRhc0hpc3RvcnkudHNcIjtcbmltcG9ydCB7IHNldFByZXZpZXdBbmNob3IsIHNob3dQcmV2aWV3VG9vbHRpcCwgaXNPdmVyZmxvd2luZyB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9wcmV2aWV3VG9vbHRpcC50c1wiO1xuaW1wb3J0IHsgdXNlVGFwR3VhcmQgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlVGFwR3VhcmQudHNcIjtcbmltcG9ydCB7IHVzZUNvbmZpcm1EaWFsb2cgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlQ29uZmlybURpYWxvZy50c1wiO1xuaW1wb3J0IHsgdXNlRGV0YWlsSHlkcmF0aW9uIH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZURldGFpbEh5ZHJhdGlvbi50c1wiO1xuaW1wb3J0IHsgdXNlRGV0YWlsVG9wYmFyQWN0aW9ucyB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VEZXRhaWxUb3BiYXJBY3Rpb25zLnRzXCI7XG5pbXBvcnQgeyB1c2VUZXh0RWRpdG9yRmllbGRzIH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZVRleHRFZGl0b3JGaWVsZHMudHNcIjtcbmltcG9ydCB7IHNldFNlc3Npb25WYWx1ZVdpdGhFeHBpcnkgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvc2Vzc2lvbkV4cGlyeS50c1wiO1xuaW1wb3J0IHsgdXNlRGV0YWlsRWRpdFNlc3Npb24gfSBmcm9tIFwiLi91c2VEZXRhaWxFZGl0U2Vzc2lvbi50c1wiO1xuaW1wb3J0IHsgdXNlRGV0YWlsTXV0YXRpb25zIH0gZnJvbSBcIi4vdXNlRGV0YWlsTXV0YXRpb25zLnRzXCI7XG5cbmNvbnN0IEVESVRPUl9SRVRVUk5fRkxBR19UVExfTVMgPSAyICogNjAgKiA2MCAqIDEwMDA7XG5cbmNvbnN0IERldGFpbEFwcCA9ICgpID0+IHtcbiAgY29uc3QgeyB2aXNpdFR5cGVzLCBhc2lzdGVudGVUaXBvcyB9ID0gdXNlVmlzaXRhcygpO1xyXG4gIGNvbnN0IGNhbkVkaXRIaXN0b3J5ID0gY2FuQWNjZXNzKFwiVklTSVRBU19ISVNUT1JJQUxcIiwgXCJFZGl0XCIpO1xyXG4gIGNvbnN0IGNhbkRlbGV0ZUhpc3RvcnkgPSBjYW5BY2Nlc3MoXCJWSVNJVEFTX0hJU1RPUklBTFwiLCBcIkZ1bGxBY2Nlc3NcIik7XHJcbiAgdHlwZSBBY3Rpdml0eURldGFpbFBheWxvYWQgPSB7XHJcbiAgICByZWNJZD86IHN0cmluZyB8IG51bWJlcjtcclxuICAgIFJlY0lkPzogc3RyaW5nIHwgbnVtYmVyO1xyXG4gICAgcmVmUmVjSWRBY3RpdmlkYWQ/OiBzdHJpbmcgfCBudW1iZXI7XHJcbiAgICBSZWZSZWNJZEFjdGl2aWRhZD86IHN0cmluZyB8IG51bWJlcjtcclxuICAgIGFjdGl2aWRhZFJlY0lkPzogc3RyaW5nIHwgbnVtYmVyO1xyXG4gICAgQWN0aXZpZGFkUmVjSWQ/OiBzdHJpbmcgfCBudW1iZXI7XHJcbiAgICByZWFkT25seT86IGJvb2xlYW47XHJcbiAgICBhbGxvd0VkaXQ/OiBib29sZWFuO1xyXG4gICAgZWRpdE1vZGVLZXk/OiBzdHJpbmc7XHJcbiAgICBba2V5OiBzdHJpbmddOiB1bmtub3duO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGRldGFpbCA9ICh3aW5kb3cuX19BQ1RJVklUWV9ERVRBSUxfXyBhcyBBY3Rpdml0eURldGFpbFBheWxvYWQpIHx8IHt9O1xyXG5cclxuICBjb25zdCBhY3Rpdml0eVJlY0lkID0gU3RyaW5nKFxyXG4gICAgZGV0YWlsLnJlY0lkIHx8XHJcbiAgICAgIGRldGFpbC5SZWNJZCB8fFxyXG4gICAgICBkZXRhaWwucmVmUmVjSWRBY3RpdmlkYWQgfHxcclxuICAgICAgZGV0YWlsLlJlZlJlY0lkQWN0aXZpZGFkIHx8XHJcbiAgICAgIGRldGFpbC5hY3RpdmlkYWRSZWNJZCB8fFxyXG4gICAgICBkZXRhaWwuQWN0aXZpZGFkUmVjSWQgfHxcclxuICAgICAgXCJcIlxyXG4gICkudHJpbSgpO1xyXG5cclxuICBjb25zdCB0ZXh0RWRpdG9yQmFzZUlkID0gYWN0aXZpdHlSZWNJZCA/IGBWaXNpdGEuJHthY3Rpdml0eVJlY0lkfWAgOiBcIlZpc2l0YVwiO1xyXG4gIGNvbnN0IGZpZWxkSWRDb21lbnRhcmlvcyA9IGAke3RleHRFZGl0b3JCYXNlSWR9LkNvbWVudGFyaW9zYDtcclxuICBjb25zdCBmaWVsZElkQW50ZWNlZGVudGVzID0gYCR7dGV4dEVkaXRvckJhc2VJZH0uQW50ZWNlZGVudGVzYDtcclxuICBjb25zdCBmaWVsZElkQ29uY2x1c2lvbmVzID0gYCR7dGV4dEVkaXRvckJhc2VJZH0uQ29uY2x1c2lvbmVzYDtcclxuXHJcbiAgY29uc3Qgbm9ybWFsaXplRGF0ZVRvSW5wdXQgPSB1c2VDYWxsYmFjaygodmFsdWUpID0+IHtcclxuICAgIGlmICghdmFsdWUpIHJldHVybiBcIlwiO1xyXG4gICAgY29uc3QgcmF3ID0gU3RyaW5nKHZhbHVlKS50cmltKCk7XHJcbiAgICBpZiAoIXJhdykgcmV0dXJuIFwiXCI7XHJcbiAgICAvLyBBbHJlYWR5IHl5eXktTU0tZGRcclxuICAgIGlmICgvXlxcZHs0fS1cXGR7Mn0tXFxkezJ9JC8udGVzdChyYXcpKSByZXR1cm4gcmF3O1xyXG4gICAgLy8gZGQuTU0ueXl5eSBvciBkZC9NTS95eXl5XHJcbiAgICBpZiAoL15cXGR7Mn1bLi8tXVxcZHsyfVsuLy1dXFxkezR9JC8udGVzdChyYXcpKSB7XHJcbiAgICAgIGNvbnN0IHBhcnRzID0gcmF3LnNwbGl0KC9bLi8tXS8pLm1hcCgocCkgPT4gcGFyc2VJbnQocCwgMTApKTtcclxuICAgICAgaWYgKHBhcnRzLmxlbmd0aCA9PT0gMyAmJiAhTnVtYmVyLmlzTmFOKHBhcnRzWzBdKSAmJiAhTnVtYmVyLmlzTmFOKHBhcnRzWzFdKSAmJiAhTnVtYmVyLmlzTmFOKHBhcnRzWzJdKSkge1xyXG4gICAgICAgIGNvbnN0IFtkLCBtLCB5XSA9IHBhcnRzO1xyXG4gICAgICAgIGNvbnN0IG1tID0gU3RyaW5nKG0pLnBhZFN0YXJ0KDIsIFwiMFwiKTtcclxuICAgICAgICBjb25zdCBkZCA9IFN0cmluZyhkKS5wYWRTdGFydCgyLCBcIjBcIik7XHJcbiAgICAgICAgcmV0dXJuIGAke3l9LSR7bW19LSR7ZGR9YDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgY29uc3QgZHQgPSBuZXcgRGF0ZShyYXcpO1xyXG4gICAgaWYgKCFOdW1iZXIuaXNOYU4oZHQuZ2V0VGltZSgpKSkge1xyXG4gICAgICBjb25zdCB5eXl5ID0gZHQuZ2V0RnVsbFllYXIoKTtcclxuICAgICAgY29uc3QgbW0gPSBTdHJpbmcoZHQuZ2V0TW9udGgoKSArIDEpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcclxuICAgICAgY29uc3QgZGQgPSBTdHJpbmcoZHQuZ2V0RGF0ZSgpKS5wYWRTdGFydCgyLCBcIjBcIik7XHJcbiAgICAgIHJldHVybiBgJHt5eXl5fS0ke21tfS0ke2RkfWA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gXCJcIjtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IG1hdGNoT3B0aW9uVmFsdWUgPSB1c2VDYWxsYmFjaygob3B0aW9ucywgcmF3KSA9PiB7XHJcbiAgICBpZiAocmF3ID09IG51bGwpIHJldHVybiBcIlwiO1xyXG4gICAgY29uc3QgcmF3U3RyID0gU3RyaW5nKHJhdykudHJpbSgpO1xyXG4gICAgaWYgKCFyYXdTdHIpIHJldHVybiBcIlwiO1xyXG5cclxuICAgIGNvbnN0IG5vcm1hbGl6ZVRleHQgPSAocykgPT5cclxuICAgICAgU3RyaW5nKHMgfHwgXCJcIilcclxuICAgICAgICAudG9Mb3dlckNhc2UoKVxyXG4gICAgICAgIC5ub3JtYWxpemUoXCJORkRcIilcclxuICAgICAgICAucmVwbGFjZSgvW1xcdTAzMDAtXFx1MDM2Zl0vZywgXCJcIilcclxuICAgICAgICAudHJpbSgpO1xyXG5cclxuICAgIGNvbnN0IHJhd05vcm0gPSBub3JtYWxpemVUZXh0KHJhd1N0cik7XHJcbiAgICBjb25zdCBhbHROb3JtID0gcmF3Tm9ybS5lbmRzV2l0aChcIm9cIikgPyBgJHtyYXdOb3JtLnNsaWNlKDAsIC0xKX1hYCA6IHJhd05vcm07XHJcblxyXG4gICAgY29uc3QgbWF0Y2ggPSAob3B0aW9ucyB8fCBbXSkuZmluZCgobykgPT4ge1xyXG4gICAgICBjb25zdCB2YWwgPSBTdHJpbmcobz8udmFsdWUgPz8gbz8uVmFsdWUgPz8gXCJcIikudHJpbSgpO1xyXG4gICAgICBjb25zdCB0ZXh0ID0gU3RyaW5nKG8/LnRleHQgPz8gbz8uVGV4dCA/PyBcIlwiKS50cmltKCk7XHJcbiAgICAgIGNvbnN0IHRleHROb3JtID0gbm9ybWFsaXplVGV4dCh0ZXh0KTtcclxuICAgICAgcmV0dXJuIHZhbCA9PT0gcmF3U3RyIHx8IHZhbCA9PT0gcmF3Tm9ybSB8fCB0ZXh0Tm9ybSA9PT0gcmF3Tm9ybSB8fCB0ZXh0Tm9ybSA9PT0gYWx0Tm9ybTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIG1hdGNoID8gU3RyaW5nKG1hdGNoLnZhbHVlID8/IG1hdGNoLlZhbHVlID8/IHJhd1N0cikgOiByYXdTdHI7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBpbml0aWFsVHJhbnNEYXRlID0gbm9ybWFsaXplRGF0ZVRvSW5wdXQoU3RyaW5nKGRldGFpbC50cmFuc0RhdGUgPz8gZGV0YWlsLlRyYW5zRGF0ZSA/PyBcIlwiKSk7XHJcbiAgY29uc3QgZGVmYXVsdFZpc2l0VHlwZSA9IFN0cmluZyh2aXNpdFR5cGVzWzBdPy52YWx1ZSA/PyB2aXNpdFR5cGVzWzBdPy5WYWx1ZSA/PyBcIlwiKTtcbiAgY29uc3QgcmF3SW5pdGlhbFZpc2l0VHlwZSA9IFN0cmluZyhcclxuICAgIGRldGFpbC50aXBvVmlzaXRhID8/IGRldGFpbC5UaXBvVmlzaXRhID8/IGRldGFpbC52aXNpdFR5cGUgPz8gZGV0YWlsLlZpc2l0VHlwZSA/PyBcIlwiXHJcbiAgKTtcclxuICBjb25zdCBpbml0aWFsVmlzaXRUeXBlID0gbWF0Y2hPcHRpb25WYWx1ZSh2aXNpdFR5cGVzLCByYXdJbml0aWFsVmlzaXRUeXBlKSB8fCBkZWZhdWx0VmlzaXRUeXBlO1xyXG4gIGNvbnN0IHJhd0luaXRpYWxBc2lzdGVudGUgPSBTdHJpbmcoXHJcbiAgICBkZXRhaWwuYXNpc3RlbnRlVGlwbyA/PyBkZXRhaWwuQXNpc3RlbnRlVGlwbyA/PyAoYXNpc3RlbnRlVGlwb3NbMF0/LnZhbHVlID8/IGFzaXN0ZW50ZVRpcG9zWzBdPy5WYWx1ZSA/PyBcIlwiKVxyXG4gICk7XHJcbiAgY29uc3QgaW5pdGlhbEFzaXN0ZW50ZSA9IG1hdGNoT3B0aW9uVmFsdWUoYXNpc3RlbnRlVGlwb3MsIHJhd0luaXRpYWxBc2lzdGVudGUpIHx8IHJhd0luaXRpYWxBc2lzdGVudGU7XHJcblxyXG4gIGNvbnN0IFt0cmFuc0RhdGUsIHNldFRyYW5zRGF0ZV0gPSB1c2VTdGF0ZShpbml0aWFsVHJhbnNEYXRlKTtcclxuICBjb25zdCBbdmlzaXRUeXBlLCBzZXRWaXNpdFR5cGVdID0gdXNlU3RhdGUoaW5pdGlhbFZpc2l0VHlwZSk7XHJcbiAgY29uc3QgW2FzaXN0ZW50ZVRpcG8sIHNldEFzaXN0ZW50ZVRpcG9dID0gdXNlU3RhdGUoaW5pdGlhbEFzaXN0ZW50ZSk7XHJcbiAgY29uc3QgW2Rlc2NyaXB0aW9uLCBzZXREZXNjcmlwdGlvbl0gPSB1c2VTdGF0ZShTdHJpbmcoZGV0YWlsLmRlc2NyaXB0aW9uID8/IGRldGFpbC5EZXNjcmlwdGlvbiA/PyBcIlwiKSk7XHJcbiAgY29uc3QgW2NvbWVudGFyaW9zLCBzZXRDb21lbnRhcmlvc10gPSB1c2VTdGF0ZShTdHJpbmcoZGV0YWlsLmNvbWVudGFyaW9zID8/IGRldGFpbC5Db21lbnRhcmlvcyA/PyBcIlwiKSk7XHJcbiAgY29uc3QgW2FudGVjZWRlbnRlcywgc2V0QW50ZWNlZGVudGVzXSA9IHVzZVN0YXRlKFN0cmluZyhkZXRhaWwuYW50ZWNlZGVudGVzID8/IGRldGFpbC5BbnRlY2VkZW50ZXMgPz8gXCJcIikpO1xyXG4gIGNvbnN0IFtjb25jbHVzaW9uZXMsIHNldENvbmNsdXNpb25lc10gPSB1c2VTdGF0ZShTdHJpbmcoZGV0YWlsLmNvbmNsdXNpb25lcyA/PyBkZXRhaWwuQ29uY2x1c2lvbmVzID8/IFwiXCIpKTtcclxuICBjb25zdCBbc3RhdHVzLCBzZXRTdGF0dXNdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtidXN5LCBzZXRCdXN5XSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2lzRWRpdGluZywgc2V0SXNFZGl0aW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2lzSHlkcmF0aW5nLCBzZXRJc0h5ZHJhdGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFttb2RhbEVycm9yLCBzZXRNb2RhbEVycm9yXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCByZWFkT25seVN1cmZhY2VSZWYgPSB1c2VSZWYobnVsbCk7XG4gIGNvbnN0IGVkaXRTbmFwc2hvdFJlZiA9IHVzZVJlZihudWxsKTtcblxyXG4gIGNvbnN0IHJlY0lkID0gU3RyaW5nKGRldGFpbC5yZWNJZCA/PyBkZXRhaWwuUmVjSWQgPz8gXCJcIik7XHJcbiAgY29uc3QgYWNjb3VudE51bSA9IFN0cmluZyhkZXRhaWwuYWNjb3VudE51bSA/PyBkZXRhaWwuQWNjb3VudE51bSA/PyBcIlwiKTtcclxuICBjb25zdCBhY3RpdmlkYWRJZCA9IFN0cmluZyhkZXRhaWwuYWN0aXZpZGFkSWQgPz8gZGV0YWlsLkFjdGl2aWRhZElkID8/IFwiXCIpO1xyXG5cclxuICBjb25zdCB7IGVkaXRNb2RlS2V5UmVmLCBzeW5jRWRpdE1vZGVGbGFnLCBjbGVhckRyYWZ0LCBhcHBseURyYWZ0VmFsdWVzIH0gPSB1c2VEZXRhaWxFZGl0U2Vzc2lvbih7XG4gICAgYWN0aXZpZGFkSWQsXG4gICAgcmVjSWQsXG4gICAgY2FuRWRpdEhpc3RvcnksXG4gICAgaXNFZGl0aW5nLFxuICAgIHNldElzRWRpdGluZyxcbiAgICB0cmFuc0RhdGUsXG4gICAgdmlzaXRUeXBlLFxuICAgIGFzaXN0ZW50ZVRpcG8sXG4gICAgZGVzY3JpcHRpb24sXG4gICAgY29tZW50YXJpb3MsXG4gICAgYW50ZWNlZGVudGVzLFxuICAgIGNvbmNsdXNpb25lcyxcbiAgICBzZXRUcmFuc0RhdGUsXG4gICAgc2V0VmlzaXRUeXBlLFxuICAgIHNldEFzaXN0ZW50ZVRpcG8sXG4gICAgc2V0RGVzY3JpcHRpb24sXG4gICAgc2V0Q29tZW50YXJpb3MsXG4gICAgc2V0QW50ZWNlZGVudGVzLFxuICAgIHNldENvbmNsdXNpb25lcyxcbiAgfSk7XG5cclxuICBjb25zdCBoYXNTZXJ2ZXJEZXRhaWwgPVxyXG4gICAgaGFzVmFsdWUocmVjSWQpICYmXHJcbiAgICBoYXNWYWx1ZShhY2NvdW50TnVtKSAmJlxyXG4gICAgaGFzVmFsdWUoZGV0YWlsLnRyYW5zRGF0ZSB8fCBkZXRhaWwuVHJhbnNEYXRlIHx8IFwiXCIpO1xyXG5cclxuICBjb25zdCBzaG91bGRIeWRyYXRlID0gISFhY3RpdmlkYWRJZCAmJiAhaGFzU2VydmVyRGV0YWlsO1xyXG5cclxuICBjb25zdCBvcGVuVGV4dEVkaXRvciA9IHVzZUNhbGxiYWNrKFxuICAgIChcbiAgICAgIGZpZWxkSWQ6IHN0cmluZyxcbiAgICAgIGZpZWxkTGFiZWw6IHN0cmluZyxcbiAgICAgIGZpZWxkVmFsdWU6IHN0cmluZyxcbiAgICAgIG9wdGlvbnM6IHsgYWxsb3dFZGl0PzogYm9vbGVhbjsgcmVhZE9ubHk/OiBib29sZWFuOyBlZGl0TW9kZUtleT86IHN0cmluZyB9ID0ge31cbiAgICApID0+IHtcbiAgICAgIGNvbnN0IHNhZmVJZCA9IFN0cmluZyhmaWVsZElkIHx8IFwiXCIpLnRyaW0oKTtcbiAgICAgIGNvbnN0IHNhZmVMYWJlbCA9IFN0cmluZyhmaWVsZExhYmVsIHx8IFwiXCIpLnRyaW0oKTtcbiAgICAgIGNvbnN0IHJlYWRPbmx5ID0gb3B0aW9ucz8ucmVhZE9ubHkgPT09IHRydWU7XG4gICAgICBjb25zdCBhbGxvd0VkaXQgPSBvcHRpb25zPy5hbGxvd0VkaXQgIT09IGZhbHNlO1xuICAgICAgY29uc3QgZWRpdE1vZGVLZXkgPSBTdHJpbmcob3B0aW9ucz8uZWRpdE1vZGVLZXkgfHwgXCJcIikudHJpbSgpO1xuICAgICAgaWYgKHNhZmVJZCkge1xuICAgICAgICAvLyBQcmltZSB0aGUgZWRpdG9yIHdpdGggdGhlIGN1cnJlbnQgdmFsdWUgd2l0aG91dCBwdXNoaW5nIGxhcmdlIHRleHQgaW50byB0aGUgVVJMLlxuICAgICAgICBwcmltZVRleHRFZGl0b3JWYWx1ZShzYWZlSWQsIFN0cmluZyhmaWVsZFZhbHVlIHx8IFwiXCIpKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcmV0dXJuVXJsID0gYCR7d2luZG93LmxvY2F0aW9uLnBhdGhuYW1lfSR7d2luZG93LmxvY2F0aW9uLnNlYXJjaCB8fCBcIlwifWA7XG4gICAgICBpZiAoc2FmZUlkKSB7XG4gICAgICAgIHNldFRleHRFZGl0b3JSZXR1cm5Vcmwoc2FmZUlkLCByZXR1cm5VcmwpO1xuICAgICAgfVxuICAgICAgaWYgKGVkaXRNb2RlS2V5KSB7XG4gICAgICAgIHNldFNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoYCR7ZWRpdE1vZGVLZXl9X3JldHVybmAsIFwiMVwiLCBFRElUT1JfUkVUVVJOX0ZMQUdfVFRMX01TKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHVybCA9XG4gICAgICAgIGAvVGV4dEVkaXRvclJlYWN0L0VkaXRGaWVsZD9maWVsZElkPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHNhZmVJZCB8fCBmaWVsZElkIHx8IFwiXCIpfWAgK1xuICAgICAgICBgJmZpZWxkTGFiZWw9JHtlbmNvZGVVUklDb21wb25lbnQoc2FmZUxhYmVsIHx8IGZpZWxkTGFiZWwgfHwgXCJcIil9YCArXG4gICAgICAgIGAmcmV0dXJuVXJsPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHJldHVyblVybCl9YCArXG4gICAgICAgIGAmcmVhZE9ubHk9JHtyZWFkT25seSA/IFwiMVwiIDogXCIwXCJ9YCArXG4gICAgICAgIGAmYWxsb3dFZGl0PSR7YWxsb3dFZGl0ID8gXCIxXCIgOiBcIjBcIn1gICtcbiAgICAgICAgKGVkaXRNb2RlS2V5ID8gYCZlZGl0TW9kZUtleT0ke2VuY29kZVVSSUNvbXBvbmVudChlZGl0TW9kZUtleSl9YCA6IFwiXCIpO1xuXG4gICAgICB3aW5kb3cuX19pbmRCeXBhc3NOYXZpZ2F0aW9uR3VhcmRPbmNlPy4oKTtcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gdXJsO1xuICAgIH0sXG4gICAgW11cbiAgKTtcblxyXG4gIGNvbnN0IGhhbmRsZUNvbWVudGFyaW9zVGFwID0gdXNlQ2FsbGJhY2soKGV2ZW50KSA9PiB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgb3BlblRleHRFZGl0b3IoZmllbGRJZENvbWVudGFyaW9zLCBpbmRUKFwiVmlzaXRzX0ZpZWxkX0NvbW1lbnRzXCIsIFwiQ29tbWVudHNcIiksIGNvbWVudGFyaW9zLCB7XHJcbiAgICAgIHJlYWRPbmx5OiAhaXNFZGl0aW5nLFxyXG4gICAgICBhbGxvd0VkaXQ6IGNhbkVkaXRIaXN0b3J5LFxyXG4gICAgICBlZGl0TW9kZUtleTogZWRpdE1vZGVLZXlSZWYuY3VycmVudFxyXG4gICAgfSk7XHJcbiAgfSwgW2NvbWVudGFyaW9zLCBpc0VkaXRpbmcsIGNhbkVkaXRIaXN0b3J5LCBvcGVuVGV4dEVkaXRvcl0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVDb21lbnRhcmlvc0hvbGQgPSB1c2VDYWxsYmFjaygodGFyZ2V0LCBjbGllbnRZKSA9PiB7XHJcbiAgICBpZiAoIXRhcmdldCB8fCAhaXNPdmVyZmxvd2luZyh0YXJnZXQpKSByZXR1cm4gZmFsc2U7XHJcbiAgICBzZXRQcmV2aWV3QW5jaG9yKHRhcmdldCk7XHJcbiAgICByZXR1cm4gc2hvd1ByZXZpZXdUb29sdGlwKFN0cmluZyhjb21lbnRhcmlvcyB8fCBcIlwiKSwgY2xpZW50WSk7XHJcbiAgfSwgW2NvbWVudGFyaW9zXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUFudGVjZWRlbnRlc1RhcCA9IHVzZUNhbGxiYWNrKChldmVudCkgPT4ge1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIG9wZW5UZXh0RWRpdG9yKGZpZWxkSWRBbnRlY2VkZW50ZXMsIGluZFQoXCJWaXNpdHNfRmllbGRfQmFja2dyb3VuZFwiLCBcIkJhY2tncm91bmRcIiksIGFudGVjZWRlbnRlcywge1xyXG4gICAgICByZWFkT25seTogIWlzRWRpdGluZyxcclxuICAgICAgYWxsb3dFZGl0OiBjYW5FZGl0SGlzdG9yeSxcclxuICAgICAgZWRpdE1vZGVLZXk6IGVkaXRNb2RlS2V5UmVmLmN1cnJlbnRcclxuICAgIH0pO1xyXG4gIH0sIFthbnRlY2VkZW50ZXMsIGlzRWRpdGluZywgY2FuRWRpdEhpc3RvcnksIG9wZW5UZXh0RWRpdG9yXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUFudGVjZWRlbnRlc0hvbGQgPSB1c2VDYWxsYmFjaygodGFyZ2V0LCBjbGllbnRZKSA9PiB7XHJcbiAgICBpZiAoIXRhcmdldCB8fCAhaXNPdmVyZmxvd2luZyh0YXJnZXQpKSByZXR1cm4gZmFsc2U7XHJcbiAgICBzZXRQcmV2aWV3QW5jaG9yKHRhcmdldCk7XHJcbiAgICByZXR1cm4gc2hvd1ByZXZpZXdUb29sdGlwKFN0cmluZyhhbnRlY2VkZW50ZXMgfHwgXCJcIiksIGNsaWVudFkpO1xyXG4gIH0sIFthbnRlY2VkZW50ZXNdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQ29uY2x1c2lvbmVzVGFwID0gdXNlQ2FsbGJhY2soKGV2ZW50KSA9PiB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgb3BlblRleHRFZGl0b3IoZmllbGRJZENvbmNsdXNpb25lcywgaW5kVChcIlZpc2l0c19GaWVsZF9Db25jbHVzaW9uc1wiLCBcIkNvbmNsdXNpb25zXCIpLCBjb25jbHVzaW9uZXMsIHtcclxuICAgICAgcmVhZE9ubHk6ICFpc0VkaXRpbmcsXHJcbiAgICAgIGFsbG93RWRpdDogY2FuRWRpdEhpc3RvcnksXHJcbiAgICAgIGVkaXRNb2RlS2V5OiBlZGl0TW9kZUtleVJlZi5jdXJyZW50XHJcbiAgICB9KTtcclxuICB9LCBbY29uY2x1c2lvbmVzLCBpc0VkaXRpbmcsIGNhbkVkaXRIaXN0b3J5LCBvcGVuVGV4dEVkaXRvcl0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVDb25jbHVzaW9uZXNIb2xkID0gdXNlQ2FsbGJhY2soKHRhcmdldCwgY2xpZW50WSkgPT4ge1xyXG4gICAgaWYgKCF0YXJnZXQgfHwgIWlzT3ZlcmZsb3dpbmcodGFyZ2V0KSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgc2V0UHJldmlld0FuY2hvcih0YXJnZXQpO1xyXG4gICAgcmV0dXJuIHNob3dQcmV2aWV3VG9vbHRpcChTdHJpbmcoY29uY2x1c2lvbmVzIHx8IFwiXCIpLCBjbGllbnRZKTtcclxuICB9LCBbY29uY2x1c2lvbmVzXSk7XHJcblxyXG4gIGNvbnN0IGNvbWVudGFyaW9zVGFwID0gdXNlVGFwR3VhcmQoaGFuZGxlQ29tZW50YXJpb3NUYXAsIGhhbmRsZUNvbWVudGFyaW9zSG9sZCk7XHJcbiAgY29uc3QgYW50ZWNlZGVudGVzVGFwID0gdXNlVGFwR3VhcmQoaGFuZGxlQW50ZWNlZGVudGVzVGFwLCBoYW5kbGVBbnRlY2VkZW50ZXNIb2xkKTtcclxuICBjb25zdCBjb25jbHVzaW9uZXNUYXAgPSB1c2VUYXBHdWFyZChoYW5kbGVDb25jbHVzaW9uZXNUYXAsIGhhbmRsZUNvbmNsdXNpb25lc0hvbGQpO1xyXG5cclxuICBjb25zdCB0ZXh0RWRpdG9yQmluZGluZ3MgPSB1c2VNZW1vKFxuICAgICgpID0+IFtcbiAgICAgIHsgZmllbGRJZDogZmllbGRJZENvbWVudGFyaW9zLCBhcHBseVZhbHVlOiBzZXRDb21lbnRhcmlvcyB9LFxuICAgICAgeyBmaWVsZElkOiBmaWVsZElkQW50ZWNlZGVudGVzLCBhcHBseVZhbHVlOiBzZXRBbnRlY2VkZW50ZXMgfSxcbiAgICAgIHsgZmllbGRJZDogZmllbGRJZENvbmNsdXNpb25lcywgYXBwbHlWYWx1ZTogc2V0Q29uY2x1c2lvbmVzIH0sXG4gICAgXSxcbiAgICBbZmllbGRJZEFudGVjZWRlbnRlcywgZmllbGRJZENvbWVudGFyaW9zLCBmaWVsZElkQ29uY2x1c2lvbmVzXVxuICApO1xuXG4gIGNvbnN0IHsgYXBwbHlWYWx1ZXM6IGFwcGx5VGV4dEVkaXRvclZhbHVlcyB9ID0gdXNlVGV4dEVkaXRvckZpZWxkcyh0ZXh0RWRpdG9yQmluZGluZ3MsIHtcbiAgICBhcHBseU9uTW91bnQ6ICFhY3RpdmlkYWRJZCxcbiAgICBsaXN0ZW5QYWdlU2hvdzogdHJ1ZSxcbiAgfSk7XG5cclxuICBjb25zdCB7IG1vZGFsLCBvcGVuQ29uZmlybSwgY2xvc2VDb25maXJtLCBoYW5kbGVDb25maXJtIH0gPSB1c2VDb25maXJtRGlhbG9nKHtcclxuICAgIGRlZmF1bHRDb25maXJtVGV4dDogaW5kVChcIkNvbmZpcm1fWWVzXCIsIFwiT0tcIiksXHJcbiAgICBkZWZhdWx0Q2FuY2VsVGV4dDogaW5kVChcIkNvbmZpcm1fTm9cIiwgXCJDYW5jZWxcIilcclxuICB9KTtcclxuXHJcbiAgY29uc3QgaGFuZGxlTW9kYWxDb25maXJtID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgc2V0TW9kYWxFcnJvcihcIlwiKTtcclxuICAgIGF3YWl0IGhhbmRsZUNvbmZpcm0oe1xyXG4gICAgICBidXN5LFxyXG4gICAgICBvbkVycm9yOiAobXNnKSA9PiB7XHJcbiAgICAgICAgc2V0TW9kYWxFcnJvcihtc2cpO1xyXG4gICAgICAgIHNldFN0YXR1cyhtc2cpO1xyXG4gICAgICAgIGZsYXNoQWN0aW9uTWFyayhcImVycm9yUHJvY2Vzc1wiLCAxNTAwKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSwgW2J1c3ksIGhhbmRsZUNvbmZpcm1dKTtcclxuXHJcbiAgY29uc3QgbW9kYWxMb2FkaW5nVGV4dCA9IGluZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIik7XHJcbiAgY29uc3QgbW9kYWxDYW5jZWxUZXh0ID0gbW9kYWwuY2FuY2VsVGV4dCB8fCBpbmRUKFwiQ29uZmlybV9Ob1wiLCBcIkNhbmNlbFwiKTtcclxuICBjb25zdCBtb2RhbENvbmZpcm1UZXh0ID0gYnVzeVxyXG4gICAgPyBtb2RhbExvYWRpbmdUZXh0XHJcbiAgICA6ICghYnVzeSAmJiBtb2RhbEVycm9yID8gaW5kVChcIkNvbW1vbl9PS1wiLCBcIk9LXCIpIDogKG1vZGFsLmNvbmZpcm1UZXh0IHx8IGluZFQoXCJDb25maXJtX1llc1wiLCBcIk9LXCIpKSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZU1vZGFsQnV0dG9uQ29uZmlybSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoIWJ1c3kgJiYgbW9kYWxFcnJvcikge1xuICAgICAgY2xvc2VDb25maXJtKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGhhbmRsZU1vZGFsQ29uZmlybSgpO1xuICB9LCBbYnVzeSwgbW9kYWxFcnJvciwgY2xvc2VDb25maXJtLCBoYW5kbGVNb2RhbENvbmZpcm1dKTtcblxuICBjb25zdCBoYXNBY3RpdmVQcm9jZXNzID0gdXNlTWVtbygoKSA9PiBidXN5IHx8IGlzRWRpdGluZywgW2J1c3ksIGlzRWRpdGluZ10pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgd2luZG93Ll9faW5kU2V0TmF2aWdhdGlvbkd1YXJkPy4oaGFzQWN0aXZlUHJvY2Vzcyk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHdpbmRvdy5fX2luZENsZWFyTmF2aWdhdGlvbkd1YXJkPy4oKTtcbiAgICB9O1xuICB9LCBbaGFzQWN0aXZlUHJvY2Vzc10pO1xuXHJcbiAgdXNlRGV0YWlsSHlkcmF0aW9uKHtcbiAgICBhY3RpdmlkYWRJZCxcbiAgICBzaG91bGRIeWRyYXRlLFxuICAgIHZpc2l0VHlwZXMsXG4gICAgYXNpc3RlbnRlVGlwb3MsXG4gICAgZGVmYXVsdFZpc2l0VHlwZSxcbiAgICBpbml0aWFsQXNpc3RlbnRlLFxuICAgIG5vcm1hbGl6ZURhdGVUb0lucHV0LFxuICAgIG1hdGNoT3B0aW9uVmFsdWUsXG4gICAgYXBwbHlEcmFmdFZhbHVlcyxcbiAgICBhcHBseVRleHRFZGl0b3JWYWx1ZXMsXG4gICAgc2V0U3RhdHVzLFxuICAgIHNldElzSHlkcmF0aW5nLFxuICAgIHNldFRyYW5zRGF0ZSxcbiAgICBzZXRWaXNpdFR5cGUsXG4gICAgc2V0QXNpc3RlbnRlVGlwbyxcbiAgICBzZXREZXNjcmlwdGlvbixcbiAgICBzZXRDb21lbnRhcmlvcyxcbiAgICBzZXRBbnRlY2VkZW50ZXMsXG4gICAgc2V0Q29uY2x1c2lvbmVzLFxuICB9KTtcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgZWwgPSByZWFkT25seVN1cmZhY2VSZWYuY3VycmVudDtcbiAgICBpZiAoIWVsKSByZXR1cm47XG4gICAgaWYgKCFpc0VkaXRpbmcpIHtcbiAgICAgIGVsLmNsYXNzTGlzdC5hZGQoXCJpbmQtcmVhZG9ubHktc3VyZmFjZVwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShcImluZC1yZWFkb25seS1zdXJmYWNlXCIpO1xuICAgIH1cbiAgfSwgW2lzRWRpdGluZ10pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKGlzRWRpdGluZykge1xuICAgICAgaWYgKCFlZGl0U25hcHNob3RSZWYuY3VycmVudCkge1xuICAgICAgICBlZGl0U25hcHNob3RSZWYuY3VycmVudCA9IHtcbiAgICAgICAgICB0cmFuc0RhdGUsXG4gICAgICAgICAgdmlzaXRUeXBlLFxuICAgICAgICAgIGFzaXN0ZW50ZVRpcG8sXG4gICAgICAgICAgZGVzY3JpcHRpb24sXG4gICAgICAgICAgY29tZW50YXJpb3MsXG4gICAgICAgICAgYW50ZWNlZGVudGVzLFxuICAgICAgICAgIGNvbmNsdXNpb25lc1xuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBlZGl0U25hcHNob3RSZWYuY3VycmVudCA9IG51bGw7XG4gIH0sIFtpc0VkaXRpbmcsIHRyYW5zRGF0ZSwgdmlzaXRUeXBlLCBhc2lzdGVudGVUaXBvLCBkZXNjcmlwdGlvbiwgY29tZW50YXJpb3MsIGFudGVjZWRlbnRlcywgY29uY2x1c2lvbmVzXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoaXNFZGl0aW5nKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgIHJldHVybiBiaW5kUmVhZE9ubHlHdWFyZChyZWFkT25seVN1cmZhY2VSZWYuY3VycmVudCk7XG4gIH0sIFtpc0VkaXRpbmddKTtcblxuICBjb25zdCBoYW5kbGVFbmFibGVFZGl0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmICghY2FuRWRpdEhpc3RvcnkpIHtcbiAgICAgIHNob3dQZXJtaXNzaW9uTW9kYWwoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgc2V0SXNFZGl0aW5nKHRydWUpO1xuICAgIHN5bmNFZGl0TW9kZUZsYWcodHJ1ZSk7XG4gICAgc2V0U3RhdHVzKGluZFQoXCJWaXNpdHNfRGV0YWlsX0VkaXRpbmdFbmFibGVkXCIsIFwiRWRpdGluZyBlbmFibGVkXCIpKTtcbiAgfSwgW2NhbkVkaXRIaXN0b3J5LCBzeW5jRWRpdE1vZGVGbGFnXSk7XG5cbiAgY29uc3QgaGFuZGxlQ2FuY2VsRWRpdCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoIWlzRWRpdGluZykgcmV0dXJuO1xuICAgIHNldElzRWRpdGluZyhmYWxzZSk7XG4gICAgc3luY0VkaXRNb2RlRmxhZyhmYWxzZSk7XG4gICAgY2xlYXJEcmFmdCgpO1xuICAgIHNldFN0YXR1cyhpbmRUKFwiQ29tbW9uX0NhbmNlbFwiLCBcIkNhbmNlbFwiKSk7XG4gICAgd2luZG93Ll9faW5kQnlwYXNzTmF2aWdhdGlvbkd1YXJkT25jZT8uKCk7XG4gICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICB9LCBbaXNFZGl0aW5nLCBzeW5jRWRpdE1vZGVGbGFnLCBjbGVhckRyYWZ0XSk7XG5cclxuICBjb25zdCB7IGhhbmRsZVVwZGF0ZSwgaGFuZGxlRGVsZXRlIH0gPSB1c2VEZXRhaWxNdXRhdGlvbnMoe1xuICAgIGJ1c3ksXG4gICAgaXNFZGl0aW5nLFxuICAgIGNhbkVkaXRIaXN0b3J5LFxuICAgIGNhbkRlbGV0ZUhpc3RvcnksXG4gICAgcmVjSWQsXG4gICAgYWNjb3VudE51bSxcbiAgICB0cmFuc0RhdGUsXG4gICAgdmlzaXRUeXBlLFxuICAgIGFzaXN0ZW50ZVRpcG8sXG4gICAgZGVzY3JpcHRpb24sXG4gICAgY29tZW50YXJpb3MsXG4gICAgYW50ZWNlZGVudGVzLFxuICAgIGNvbmNsdXNpb25lcyxcbiAgICB2aXNpdFR5cGVzLFxuICAgIGFzaXN0ZW50ZVRpcG9zLFxuICAgIGRlZmF1bHRWaXNpdFR5cGUsXG4gICAgcmF3SW5pdGlhbFZpc2l0VHlwZSxcbiAgICByYXdJbml0aWFsQXNpc3RlbnRlLFxuICAgIG1hdGNoT3B0aW9uVmFsdWUsXG4gICAgY2xlYXJEcmFmdCxcbiAgICBzeW5jRWRpdE1vZGVGbGFnLFxuICAgIHNldE1vZGFsRXJyb3IsXG4gICAgc2V0QnVzeSxcbiAgICBzZXRTdGF0dXMsXG4gICAgc2V0SXNFZGl0aW5nLFxuICB9KTtcblxyXG4gIHVzZURldGFpbFRvcGJhckFjdGlvbnMoe1xuICAgIGJ1c3ksXG4gICAgbW9kYWxPcGVuOiBtb2RhbC5vcGVuLFxuICAgIGlzRWRpdGluZyxcbiAgICBjYW5FZGl0SGlzdG9yeSxcbiAgICBjYW5EZWxldGVIaXN0b3J5LFxuICAgIHRyYW5zRGF0ZSxcbiAgICBzZXRNb2RhbEVycm9yLFxuICAgIGhhbmRsZUVuYWJsZUVkaXQsXG4gICAgaGFuZGxlQ2FuY2VsRWRpdCxcbiAgICBoYW5kbGVVcGRhdGUsXG4gICAgaGFuZGxlRGVsZXRlLFxuICAgIG9wZW5Db25maXJtLFxuICAgIGNsb3NlQ29uZmlybSxcbiAgfSk7XG5cbiAgY29uc3QgZGVzY3JpcHRpb25MYWJlbCA9IGluZFQoXCJWaXNpdHNfRmllbGRfRGVzY3JpcHRpb25cIiwgXCJEZXNjcmlwdGlvblwiKTtcbiAgY29uc3QgY29tbWVudHNMYWJlbCA9IGluZFQoXCJWaXNpdHNfRmllbGRfQ29tbWVudHNcIiwgXCJDb21tZW50c1wiKTtcbiAgY29uc3QgYmFja2dyb3VuZExhYmVsID0gaW5kVChcIlZpc2l0c19GaWVsZF9CYWNrZ3JvdW5kXCIsIFwiQmFja2dyb3VuZFwiKTtcbiAgY29uc3QgY29uY2x1c2lvbnNMYWJlbCA9IGluZFQoXCJWaXNpdHNfRmllbGRfQ29uY2x1c2lvbnNcIiwgXCJDb25jbHVzaW9uc1wiKTtcbiAgY29uc3QgZGV0YWlsRGVzY3JpcHRpb25DbGFzc05hbWUgPSBjbGFzc05hbWVzKFxuICAgIFwiZm9ybS1jb250cm9sXCIsXG4gICAgaXNFZGl0aW5nID8gXCJib3JkZXItc2xhdGUtMjAwIHRleHQtc2xhdGUtOTAwXCIgOiBcImJvcmRlci1zbGF0ZS0yMDAgaW5kLXJlYWRvbmx5LWZpZWxkXCJcbiAgKTtcbiAgY29uc3QgZGV0YWlsUmVhZE9ubHlDbGFzc05hbWUgPSBjbGFzc05hbWVzKFwiZm9ybS1jb250cm9sIGN1cnNvci1wb2ludGVyXCIsICFpc0VkaXRpbmcgPyBcImluZC1yZWFkb25seS1maWVsZFwiIDogXCJcIik7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNFwiPlxyXG4gICAgICA8Q29uZmlybU1vZGFsXHJcbiAgICAgICAgb3Blbj17bW9kYWwub3Blbn1cclxuICAgICAgICB0aXRsZT17bW9kYWwudGl0bGV9XHJcbiAgICAgICAgbWVzc2FnZT17bW9kYWwubWVzc2FnZX1cclxuICAgICAgICBjb25maXJtVGV4dD17bW9kYWxDb25maXJtVGV4dH1cclxuICAgICAgICBjYW5jZWxUZXh0PXttb2RhbENhbmNlbFRleHR9XHJcbiAgICAgICAgbG9hZGluZ1RleHQ9e21vZGFsTG9hZGluZ1RleHR9XHJcbiAgICAgICAgc2hvd0NhbmNlbD17bW9kYWwuc2hvd0NhbmNlbH1cclxuICAgICAgICBzaG93Q29uZmlybT17bW9kYWwuc2hvd0NvbmZpcm19XHJcbiAgICAgICAgYnVzeT17YnVzeX1cclxuICAgICAgICBlcnJvcj17bW9kYWxFcnJvcn1cclxuICAgICAgICBzdGF0dXM9e3N0YXR1c31cclxuICAgICAgICBvbkNvbmZpcm09e2hhbmRsZU1vZGFsQnV0dG9uQ29uZmlybX1cclxuICAgICAgICBvbkNhbmNlbD17Y2xvc2VDb25maXJtfVxyXG4gICAgICAvPlxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgcmVmPXtyZWFkT25seVN1cmZhY2VSZWZ9XHJcbiAgICAgICAgY2xhc3NOYW1lPVwicmVsYXRpdmUgc2hhZG93LXhzIGdsYXNzLXBhbmVsIHAtNCBzcGFjZS15LTQgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgcm91bmRlZC0yeGxcIlxyXG4gICAgICA+XHJcbiAgICAgICAge2lzSHlkcmF0aW5nICYmIChcclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCB6LTEwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGJnLXdoaXRlLzcwIHJvdW5kZWQtMnhsXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC1zbSB0ZXh0LXNsYXRlLTYwMFwiPlxyXG4gICAgICAgICAgICAgIDxTcGlubmVyIHNpemU9XCJoLTUgdy01XCIgLz5cclxuICAgICAgICAgICAgICA8c3Bhbj57aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX08L3NwYW4+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKX1cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMiBnYXAtNCBwdC0xXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ2aXNpdGEtZmllbGQtdGV4dFwiPlxyXG4gICAgICAgICAgICA8U2luZ2xlRGF0ZVBpY2tlclxuICAgICAgICAgICAgICBsYWJlbD17aW5kVChcIlZpc2l0c19EZXRhaWxfRGF0ZV9MYWJlbFwiLCBcIkRhdGVcIil9XG4gICAgICAgICAgICAgIHZhbHVlPXt0cmFuc0RhdGV9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXtzZXRUcmFuc0RhdGV9XG4gICAgICAgICAgICAgIGRpc2FibGVkPXshaXNFZGl0aW5nfVxuICAgICAgICAgICAgICByZWFkT25seT17IWlzRWRpdGluZ31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPFNlbGVjdENvbWJvYm94XG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIlZpc2l0c19EZXRhaWxfVmlzaXRUeXBlX0xhYmVsXCIsIFwiVmlzaXQgdHlwZVwiKX1cbiAgICAgICAgICAgIG9wdGlvbnM9e3Zpc2l0VHlwZXN9XG4gICAgICAgICAgICB2YWx1ZT17dmlzaXRUeXBlfVxuICAgICAgICAgICAgb25DaGFuZ2U9e3NldFZpc2l0VHlwZX1cbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiVmlzaXRzX0RldGFpbF9WaXNpdFR5cGVfUGxhY2Vob2xkZXJcIiwgXCJTZWxlY3QgdHlwZVwiKX1cbiAgICAgICAgICAgIGRpc2FibGVkPXshaXNFZGl0aW5nfVxuICAgICAgICAgICAgcmVhZE9ubHk9eyFpc0VkaXRpbmd9XG4gICAgICAgICAgICB1c2VQb3J0YWw9e2ZhbHNlfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICA8VmlzaXROYXJyYXRpdmVGaWVsZHNcbiAgICAgICAgICBkZXNjcmlwdGlvbkxhYmVsPXtkZXNjcmlwdGlvbkxhYmVsfVxuICAgICAgICAgIGRlc2NyaXB0aW9uVmFsdWU9e2Rlc2NyaXB0aW9ufVxuICAgICAgICAgIGRlc2NyaXB0aW9uQ2xhc3NOYW1lPXtkZXRhaWxEZXNjcmlwdGlvbkNsYXNzTmFtZX1cbiAgICAgICAgICBkZXNjcmlwdGlvbkRpc2FibGVkPXshaXNFZGl0aW5nfVxuICAgICAgICAgIG9uRGVzY3JpcHRpb25DaGFuZ2U9e3NldERlc2NyaXB0aW9ufVxuICAgICAgICAgIHRhcEZpZWxkcz17W1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBpZDogXCJjb21lbnRhcmlvc1wiLFxuICAgICAgICAgICAgICBsYWJlbDogY29tbWVudHNMYWJlbCxcbiAgICAgICAgICAgICAgdmFsdWU6IGNvbWVudGFyaW9zLFxuICAgICAgICAgICAgICBjbGFzc05hbWU6IGRldGFpbFJlYWRPbmx5Q2xhc3NOYW1lLFxuICAgICAgICAgICAgICBwb2ludGVyQmluZGluZ3M6IGNvbWVudGFyaW9zVGFwLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgaWQ6IFwiYW50ZWNlZGVudGVzXCIsXG4gICAgICAgICAgICAgIGxhYmVsOiBiYWNrZ3JvdW5kTGFiZWwsXG4gICAgICAgICAgICAgIHZhbHVlOiBhbnRlY2VkZW50ZXMsXG4gICAgICAgICAgICAgIGNsYXNzTmFtZTogZGV0YWlsUmVhZE9ubHlDbGFzc05hbWUsXG4gICAgICAgICAgICAgIHBvaW50ZXJCaW5kaW5nczogYW50ZWNlZGVudGVzVGFwLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgaWQ6IFwiY29uY2x1c2lvbmVzXCIsXG4gICAgICAgICAgICAgIGxhYmVsOiBjb25jbHVzaW9uc0xhYmVsLFxuICAgICAgICAgICAgICB2YWx1ZTogY29uY2x1c2lvbmVzLFxuICAgICAgICAgICAgICBjbGFzc05hbWU6IGRldGFpbFJlYWRPbmx5Q2xhc3NOYW1lLFxuICAgICAgICAgICAgICBwb2ludGVyQmluZGluZ3M6IGNvbmNsdXNpb25lc1RhcCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXX1cbiAgICAgICAgLz5cblxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTMgdGV4dC1zbSB0ZXh0LXNsYXRlLTYwMFwiPlxyXG4gICAgICAgICAgPHNwYW4+e3N0YXR1c308L3NwYW4+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcblxuLy8gRGV0YWlsIFVJIHdyYXBwZWQgYnkgdGhlIGVycm9yIGJvdW5kYXJ5LlxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRGV0YWlsRm9ybSgpIHtcbiAgcmV0dXJuIChcbiAgICA8QXBwRXJyb3JCb3VuZGFyeSBmYWxsYmFja01lc3NhZ2U9e2luZFQoXCJWaXNpdHNfRGV0YWlsX0Vycm9yQm91bmRhcnlcIiwgXCJBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSByZW5kZXJpbmcgdGhlIGRldGFpbCBwYWdlLiBSZWxvYWQgYW5kIHRyeSBhZ2Fpbi5cIil9PlxuICAgICAgPERldGFpbEFwcCAvPlxuICAgIDwvQXBwRXJyb3JCb3VuZGFyeT5cbiAgKTtcbn1cbiIsICJleHBvcnQgY29uc3QgYmluZFJlYWRPbmx5R3VhcmQgPSAoZWw6IEhUTUxFbGVtZW50IHwgbnVsbCkgPT4ge1xuICBpZiAoIWVsKSByZXR1cm4gKCkgPT4ge307XG4gIGNvbnN0IGNhbmNlbCA9IChldmVudDogRXZlbnQpID0+IGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIGNvbnN0IGV2ZW50cyA9IFtcImNvbnRleHRtZW51XCIsIFwic2VsZWN0c3RhcnRcIiwgXCJjb3B5XCIsIFwiY3V0XCIsIFwicGFzdGVcIl07XG4gIGV2ZW50cy5mb3JFYWNoKChldnQpID0+IGVsLmFkZEV2ZW50TGlzdGVuZXIoZXZ0LCBjYW5jZWwpKTtcbiAgcmV0dXJuICgpID0+IHtcbiAgICBldmVudHMuZm9yRWFjaCgoZXZ0KSA9PiBlbC5yZW1vdmVFdmVudExpc3RlbmVyKGV2dCwgY2FuY2VsKSk7XG4gIH07XG59O1xuIiwgImV4cG9ydCBjb25zdCBoYXNWYWx1ZSA9ICh2YWx1ZTogdW5rbm93bikgPT4gU3RyaW5nKHZhbHVlIHx8IFwiXCIpLnRyaW0oKS5sZW5ndGggPiAwO1xuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGZldGNoSnNvbiB9IGZyb20gXCIuLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uL3V0aWxzL2luZEkxOG4udHNcIjtcblxudHlwZSBVc2VEZXRhaWxIeWRyYXRpb25BcmdzID0ge1xuICBhY3RpdmlkYWRJZDogc3RyaW5nO1xuICBzaG91bGRIeWRyYXRlOiBib29sZWFuO1xuICB2aXNpdFR5cGVzOiBhbnlbXTtcbiAgYXNpc3RlbnRlVGlwb3M6IGFueVtdO1xuICBkZWZhdWx0VmlzaXRUeXBlOiBzdHJpbmc7XG4gIGluaXRpYWxBc2lzdGVudGU6IHN0cmluZztcbiAgbm9ybWFsaXplRGF0ZVRvSW5wdXQ6ICh2YWx1ZTogc3RyaW5nKSA9PiBzdHJpbmc7XG4gIG1hdGNoT3B0aW9uVmFsdWU6IChvcHRpb25zOiBhbnlbXSwgcmF3OiB1bmtub3duKSA9PiBzdHJpbmc7XG4gIGFwcGx5RHJhZnRWYWx1ZXM6ICgpID0+IHZvaWQ7XG4gIGFwcGx5VGV4dEVkaXRvclZhbHVlczogKCkgPT4gdm9pZDtcbiAgc2V0U3RhdHVzOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgc2V0SXNIeWRyYXRpbmc6ICh2YWx1ZTogYm9vbGVhbikgPT4gdm9pZDtcbiAgc2V0VHJhbnNEYXRlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgc2V0VmlzaXRUeXBlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgc2V0QXNpc3RlbnRlVGlwbzogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHNldERlc2NyaXB0aW9uOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgc2V0Q29tZW50YXJpb3M6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBzZXRBbnRlY2VkZW50ZXM6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBzZXRDb25jbHVzaW9uZXM6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xufTtcblxuLy8gS2VlcHMgZGV0YWlsIGh5ZHJhdGlvbiBvcmNoZXN0cmF0aW9uIG91dHNpZGUgdGhlIHBhZ2UgY29tcG9uZW50LlxuZXhwb3J0IGNvbnN0IHVzZURldGFpbEh5ZHJhdGlvbiA9ICh7XG4gIGFjdGl2aWRhZElkLFxuICBzaG91bGRIeWRyYXRlLFxuICB2aXNpdFR5cGVzLFxuICBhc2lzdGVudGVUaXBvcyxcbiAgZGVmYXVsdFZpc2l0VHlwZSxcbiAgaW5pdGlhbEFzaXN0ZW50ZSxcbiAgbm9ybWFsaXplRGF0ZVRvSW5wdXQsXG4gIG1hdGNoT3B0aW9uVmFsdWUsXG4gIGFwcGx5RHJhZnRWYWx1ZXMsXG4gIGFwcGx5VGV4dEVkaXRvclZhbHVlcyxcbiAgc2V0U3RhdHVzLFxuICBzZXRJc0h5ZHJhdGluZyxcbiAgc2V0VHJhbnNEYXRlLFxuICBzZXRWaXNpdFR5cGUsXG4gIHNldEFzaXN0ZW50ZVRpcG8sXG4gIHNldERlc2NyaXB0aW9uLFxuICBzZXRDb21lbnRhcmlvcyxcbiAgc2V0QW50ZWNlZGVudGVzLFxuICBzZXRDb25jbHVzaW9uZXMsXG59OiBVc2VEZXRhaWxIeWRyYXRpb25BcmdzKSA9PiB7XG4gIGNvbnN0IGh5ZHJhdGVGcm9tQXBpID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xuICAgIGlmICghYWN0aXZpZGFkSWQpIHJldHVybjtcbiAgICBzZXRJc0h5ZHJhdGluZyh0cnVlKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2hKc29uKGAvVmlzaXRhcy9HZXRBY3Rpdml0eUJ5Q29kZT9jb2RlPSR7ZW5jb2RlVVJJQ29tcG9uZW50KGFjdGl2aWRhZElkKX1gKTtcbiAgICAgIGlmICghcmVzPy5zdWNjZXNzIHx8ICFyZXMuZGF0YSkge1xuICAgICAgICBzZXRTdGF0dXMocmVzPy5tZXNzYWdlIHx8IGluZFQoXCJWaXNpdHNfRGV0YWlsX0xvYWRBY3Rpdml0eUZhaWxlZFwiLCBcIkZhaWxlZCB0byBsb2FkIGFjdGl2aXR5IGRldGFpbHMuXCIpKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3QgZGF0YSA9IHJlcy5kYXRhO1xuICAgICAgY29uc3QgcmF3RGF0ZSA9IFN0cmluZyhkYXRhLnRyYW5zRGF0ZSA/PyBkYXRhLlRyYW5zRGF0ZSA/PyBcIlwiKTtcbiAgICAgIHNldFRyYW5zRGF0ZShub3JtYWxpemVEYXRlVG9JbnB1dChyYXdEYXRlKSk7XG5cbiAgICAgIGNvbnN0IHJhd1Zpc2l0VHlwZSA9IFN0cmluZyhkYXRhLnRpcG9WaXNpdGEgPz8gZGF0YS5UaXBvVmlzaXRhID8/IGRhdGEudmlzaXRUeXBlID8/IGRhdGEuVmlzaXRUeXBlID8/IFwiXCIpO1xuICAgICAgc2V0VmlzaXRUeXBlKG1hdGNoT3B0aW9uVmFsdWUodmlzaXRUeXBlcywgcmF3VmlzaXRUeXBlKSB8fCBkZWZhdWx0VmlzaXRUeXBlKTtcblxuICAgICAgY29uc3QgYXNpc3RlbnRlc0xpc3QgPSBkYXRhLmFzaXN0ZW50ZXMgPz8gZGF0YS5Bc2lzdGVudGVzO1xuICAgICAgY29uc3QgZmlyc3RBc2lzdGVudGUgPSBBcnJheS5pc0FycmF5KGFzaXN0ZW50ZXNMaXN0KSAmJiBhc2lzdGVudGVzTGlzdC5sZW5ndGggPyBhc2lzdGVudGVzTGlzdFswXSA6IG51bGw7XG4gICAgICBjb25zdCByYXdBc2lzdGVudGVUaXBvID0gU3RyaW5nKFxuICAgICAgICBkYXRhLmFzaXN0ZW50ZVRpcG8gPz8gZGF0YS5Bc2lzdGVudGVUaXBvID8/IGZpcnN0QXNpc3RlbnRlPy5hc2lzdGVudGVUaXBvID8/IGZpcnN0QXNpc3RlbnRlPy5Bc2lzdGVudGVUaXBvID8/IFwiXCJcbiAgICAgICk7XG4gICAgICBjb25zdCBub3JtYWxpemVkQXNpc3RlbnRlVGlwbyA9IG1hdGNoT3B0aW9uVmFsdWUoYXNpc3RlbnRlVGlwb3MsIHJhd0FzaXN0ZW50ZVRpcG8pO1xuICAgICAgc2V0QXNpc3RlbnRlVGlwbyhub3JtYWxpemVkQXNpc3RlbnRlVGlwbyB8fCBpbml0aWFsQXNpc3RlbnRlKTtcbiAgICAgIHNldERlc2NyaXB0aW9uKFN0cmluZyhkYXRhLmRlc2NyaXB0aW9uID8/IGRhdGEuRGVzY3JpcHRpb24gPz8gXCJcIikpO1xuICAgICAgc2V0Q29tZW50YXJpb3MoU3RyaW5nKGRhdGEuY29tZW50YXJpb3MgPz8gZGF0YS5Db21lbnRhcmlvcyA/PyBcIlwiKSk7XG4gICAgICBzZXRBbnRlY2VkZW50ZXMoU3RyaW5nKGRhdGEuYW50ZWNlZGVudGVzID8/IGRhdGEuQW50ZWNlZGVudGVzID8/IFwiXCIpKTtcbiAgICAgIHNldENvbmNsdXNpb25lcyhTdHJpbmcoZGF0YS5jb25jbHVzaW9uZXMgPz8gZGF0YS5Db25jbHVzaW9uZXMgPz8gXCJcIikpO1xuICAgIH0gY2F0Y2gge1xuICAgICAgLy8gS2VlcCBwcmV2aW91cyBVSSBiZWhhdmlvciBvbiBoeWRyYXRpb24gZXJyb3JzLlxuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRJc0h5ZHJhdGluZyhmYWxzZSk7XG4gICAgICBhcHBseURyYWZ0VmFsdWVzKCk7XG4gICAgICBhcHBseVRleHRFZGl0b3JWYWx1ZXMoKTtcbiAgICB9XG4gIH0sIFtcbiAgICBhY3RpdmlkYWRJZCxcbiAgICBhcHBseURyYWZ0VmFsdWVzLFxuICAgIGFwcGx5VGV4dEVkaXRvclZhbHVlcyxcbiAgICBhc2lzdGVudGVUaXBvcyxcbiAgICBkZWZhdWx0VmlzaXRUeXBlLFxuICAgIGluaXRpYWxBc2lzdGVudGUsXG4gICAgbWF0Y2hPcHRpb25WYWx1ZSxcbiAgICBub3JtYWxpemVEYXRlVG9JbnB1dCxcbiAgICBzZXRBbnRlY2VkZW50ZXMsXG4gICAgc2V0QXNpc3RlbnRlVGlwbyxcbiAgICBzZXRDb21lbnRhcmlvcyxcbiAgICBzZXRDb25jbHVzaW9uZXMsXG4gICAgc2V0RGVzY3JpcHRpb24sXG4gICAgc2V0SXNIeWRyYXRpbmcsXG4gICAgc2V0U3RhdHVzLFxuICAgIHNldFRyYW5zRGF0ZSxcbiAgICBzZXRWaXNpdFR5cGUsXG4gICAgdmlzaXRUeXBlcyxcbiAgXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoc2hvdWxkSHlkcmF0ZSkge1xuICAgICAgaHlkcmF0ZUZyb21BcGkoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgYXBwbHlEcmFmdFZhbHVlcygpO1xuICAgIGFwcGx5VGV4dEVkaXRvclZhbHVlcygpO1xuICB9LCBbYXBwbHlEcmFmdFZhbHVlcywgYXBwbHlUZXh0RWRpdG9yVmFsdWVzLCBoeWRyYXRlRnJvbUFwaSwgc2hvdWxkSHlkcmF0ZV0pO1xufTtcbiIsICJpbXBvcnQgeyB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHdhaXQgfSBmcm9tIFwiLi4vdXRpbHMvd2FpdC50c1wiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgeyBzaG93UGVybWlzc2lvbk1vZGFsIH0gZnJvbSBcIi4uL3V0aWxzL3Blcm1pc3Npb25zLnRzXCI7XG5pbXBvcnQgeyBzZXRIaXN0b3J5RmlsdGVyRm9yRGF0ZSwgZmxhc2hBY3Rpb25NYXJrIH0gZnJvbSBcIi4uL3V0aWxzL3Zpc2l0YXNIaXN0b3J5LnRzXCI7XG5cbnR5cGUgVXNlRGV0YWlsVG9wYmFyQWN0aW9uc0FyZ3MgPSB7XG4gIGJ1c3k6IGJvb2xlYW47XG4gIG1vZGFsT3BlbjogYm9vbGVhbjtcbiAgaXNFZGl0aW5nOiBib29sZWFuO1xuICBjYW5FZGl0SGlzdG9yeTogYm9vbGVhbjtcbiAgY2FuRGVsZXRlSGlzdG9yeTogYm9vbGVhbjtcbiAgdHJhbnNEYXRlOiBzdHJpbmc7XG4gIHNldE1vZGFsRXJyb3I6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBoYW5kbGVFbmFibGVFZGl0OiAoKSA9PiB2b2lkO1xuICBoYW5kbGVDYW5jZWxFZGl0OiAoKSA9PiB2b2lkO1xuICBoYW5kbGVVcGRhdGU6ICgpID0+IFByb21pc2U8Ym9vbGVhbj47XG4gIGhhbmRsZURlbGV0ZTogKCkgPT4gUHJvbWlzZTxib29sZWFuPjtcbiAgb3BlbkNvbmZpcm06IChvcHRzOiB7XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgY29uZmlybVRleHQ/OiBzdHJpbmc7XG4gICAgb25Db25maXJtPzogKCkgPT4gUHJvbWlzZTxib29sZWFuIHwgdm9pZD4gfCBib29sZWFuIHwgdm9pZDtcbiAgfSkgPT4gdm9pZDtcbiAgY2xvc2VDb25maXJtOiAoKSA9PiB2b2lkO1xufTtcblxuLy8gQ29vcmRpbmF0ZXMgdG9wYmFyIGljb24gdmlzaWJpbGl0eSBhbmQgYWN0aW9uIGV2ZW50cyBmb3IgZGV0YWlsIHBhZ2UuXG5leHBvcnQgY29uc3QgdXNlRGV0YWlsVG9wYmFyQWN0aW9ucyA9ICh7XG4gIGJ1c3ksXG4gIG1vZGFsT3BlbixcbiAgaXNFZGl0aW5nLFxuICBjYW5FZGl0SGlzdG9yeSxcbiAgY2FuRGVsZXRlSGlzdG9yeSxcbiAgdHJhbnNEYXRlLFxuICBzZXRNb2RhbEVycm9yLFxuICBoYW5kbGVFbmFibGVFZGl0LFxuICBoYW5kbGVDYW5jZWxFZGl0LFxuICBoYW5kbGVVcGRhdGUsXG4gIGhhbmRsZURlbGV0ZSxcbiAgb3BlbkNvbmZpcm0sXG4gIGNsb3NlQ29uZmlybSxcbn06IFVzZURldGFpbFRvcGJhckFjdGlvbnNBcmdzKSA9PiB7XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgZWRpdEljb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpc2l0RWRpdEljb25cIik7XG4gICAgY29uc3Qgc2F2ZUljb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpc2l0U2F2ZUljb25cIik7XG4gICAgY29uc3QgZGVsZXRlQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2aXNpdERlbGV0ZUJ0blwiKTtcbiAgICBjb25zdCBjYW5jZWxCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpc2l0Q2FuY2VsQnRuXCIpO1xuICAgIGlmICghZWRpdEljb24gfHwgIXNhdmVJY29uKSByZXR1cm47XG4gICAgaWYgKGlzRWRpdGluZykge1xuICAgICAgZWRpdEljb24uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgIHNhdmVJY29uLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gICAgICBpZiAoZGVsZXRlQnRuKSBkZWxldGVCdG4uY2xhc3NMaXN0LmFkZChcInRvcGJhci1oaWRkZW5cIik7XG4gICAgICBpZiAoY2FuY2VsQnRuKSBjYW5jZWxCdG4uY2xhc3NMaXN0LnJlbW92ZShcInRvcGJhci1oaWRkZW5cIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVkaXRJY29uLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gICAgICBzYXZlSWNvbi5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgaWYgKGRlbGV0ZUJ0bikgZGVsZXRlQnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJ0b3BiYXItaGlkZGVuXCIpO1xuICAgICAgaWYgKGNhbmNlbEJ0bikgY2FuY2VsQnRuLmNsYXNzTGlzdC5hZGQoXCJ0b3BiYXItaGlkZGVuXCIpO1xuICAgIH1cbiAgfSwgW2lzRWRpdGluZ10pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3Qgb25FZGl0ID0gKCkgPT4ge1xuICAgICAgaWYgKCFjYW5FZGl0SGlzdG9yeSkge1xuICAgICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChpc0VkaXRpbmcpIHtcbiAgICAgICAgaWYgKGJ1c3kgfHwgbW9kYWxPcGVuKSByZXR1cm47XG4gICAgICAgIHNldE1vZGFsRXJyb3IoXCJcIik7XG4gICAgICAgIG9wZW5Db25maXJtKHtcbiAgICAgICAgICB0aXRsZTogaW5kVChcIlZpc2l0c19EZXRhaWxfU2F2ZUNoYW5nZXNfVGl0bGVcIiwgXCJTYXZlIGNoYW5nZXNcIiksXG4gICAgICAgICAgbWVzc2FnZTogaW5kVChcIlZpc2l0c19EZXRhaWxfU2F2ZUNoYW5nZXNfQm9keVwiLCBcIkRvIHlvdSB3YW50IHRvIHNhdmUgY2hhbmdlcz9cIiksXG4gICAgICAgICAgY29uZmlybVRleHQ6IGluZFQoXCJDb21tb25fU2F2ZVwiLCBcIlNhdmVcIiksXG4gICAgICAgICAgb25Db25maXJtOiBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBvayA9IGF3YWl0IGhhbmRsZVVwZGF0ZSgpO1xuICAgICAgICAgICAgaWYgKG9rKSB7XG4gICAgICAgICAgICAgIGNsb3NlQ29uZmlybSgpO1xuICAgICAgICAgICAgICBzZXRIaXN0b3J5RmlsdGVyRm9yRGF0ZSh0cmFuc0RhdGUpO1xuICAgICAgICAgICAgICBhd2FpdCB3YWl0KDIwMCk7XG4gICAgICAgICAgICAgIGZsYXNoQWN0aW9uTWFyayhcIm9rUHJvY2Vzc1wiLCAxMjAwKTtcbiAgICAgICAgICAgICAgYXdhaXQgd2FpdCgxMjAwKTtcbiAgICAgICAgICAgICAgd2luZG93Ll9faW5kQnlwYXNzTmF2aWdhdGlvbkd1YXJkT25jZT8uKCk7XG4gICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvSGlzdG9yaWFsL0hpc3RvcnlcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBvaztcbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGhhbmRsZUVuYWJsZUVkaXQoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3Qgb25EZWxldGUgPSAoKSA9PiB7XG4gICAgICBpZiAoIWNhbkRlbGV0ZUhpc3RvcnkpIHtcbiAgICAgICAgc2hvd1Blcm1pc3Npb25Nb2RhbCgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoYnVzeSB8fCBtb2RhbE9wZW4pIHJldHVybjtcbiAgICAgIHNldE1vZGFsRXJyb3IoXCJcIik7XG4gICAgICBvcGVuQ29uZmlybSh7XG4gICAgICAgIHRpdGxlOiBpbmRUKFwiVmlzaXRzX0RldGFpbF9EZWxldGVBY3Rpdml0eV9UaXRsZVwiLCBcIkRlbGV0ZSBhY3Rpdml0eVwiKSxcbiAgICAgICAgbWVzc2FnZTogaW5kVChcIlZpc2l0c19EZXRhaWxfRGVsZXRlQWN0aXZpdHlfQm9keVwiLCBcIkRvIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGlzIGFjdGl2aXR5P1wiKSxcbiAgICAgICAgY29uZmlybVRleHQ6IGluZFQoXCJDb21tb25fRGVsZXRlXCIsIFwiRGVsZXRlXCIpLFxuICAgICAgICBvbkNvbmZpcm06IGFzeW5jICgpID0+IHtcbiAgICAgICAgICBjb25zdCBvayA9IGF3YWl0IGhhbmRsZURlbGV0ZSgpO1xuICAgICAgICAgIGlmIChvaykge1xuICAgICAgICAgICAgY2xvc2VDb25maXJtKCk7XG4gICAgICAgICAgICBzZXRIaXN0b3J5RmlsdGVyRm9yRGF0ZSh0cmFuc0RhdGUpO1xuICAgICAgICAgICAgYXdhaXQgd2FpdCgyMDApO1xuICAgICAgICAgICAgZmxhc2hBY3Rpb25NYXJrKFwib2tEZWxQcm9jZXNzXCIsIDEyMDApO1xuICAgICAgICAgICAgYXdhaXQgd2FpdCgxMjAwKTtcbiAgICAgICAgICAgIHdpbmRvdy5fX2luZEJ5cGFzc05hdmlnYXRpb25HdWFyZE9uY2U/LigpO1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9IaXN0b3JpYWwvSGlzdG9yeVwiO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gb2s7XG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgY29uc3Qgb25DYW5jZWxFZGl0ID0gKCkgPT4ge1xuICAgICAgaWYgKGJ1c3kgfHwgbW9kYWxPcGVuKSByZXR1cm47XG4gICAgICBoYW5kbGVDYW5jZWxFZGl0KCk7XG4gICAgfTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwidmlzaXQtZWRpdFwiLCBvbkVkaXQpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwidmlzaXQtZGVsZXRlXCIsIG9uRGVsZXRlKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInZpc2l0LWNhbmNlbC1lZGl0XCIsIG9uQ2FuY2VsRWRpdCk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwidmlzaXQtZWRpdFwiLCBvbkVkaXQpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ2aXNpdC1kZWxldGVcIiwgb25EZWxldGUpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ2aXNpdC1jYW5jZWwtZWRpdFwiLCBvbkNhbmNlbEVkaXQpO1xuICAgIH07XG4gIH0sIFtcbiAgICBidXN5LFxuICAgIGNhbkRlbGV0ZUhpc3RvcnksXG4gICAgY2FuRWRpdEhpc3RvcnksXG4gICAgY2xvc2VDb25maXJtLFxuICAgIGhhbmRsZUNhbmNlbEVkaXQsXG4gICAgaGFuZGxlRGVsZXRlLFxuICAgIGhhbmRsZUVuYWJsZUVkaXQsXG4gICAgaGFuZGxlVXBkYXRlLFxuICAgIGlzRWRpdGluZyxcbiAgICBtb2RhbE9wZW4sXG4gICAgb3BlbkNvbmZpcm0sXG4gICAgc2V0TW9kYWxFcnJvcixcbiAgICB0cmFuc0RhdGUsXG4gIF0pO1xufTtcbiIsICJcdUZFRkZpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBnZXRTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5LCByZW1vdmVTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5LCBzZXRTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5IH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3Nlc3Npb25FeHBpcnkudHNcIjtcblxuY29uc3QgRURJVF9NT0RFX1RUTF9NUyA9IDYgKiA2MCAqIDYwICogMTAwMDtcbmNvbnN0IERFVEFJTF9EUkFGVF9UVExfTVMgPSAyNCAqIDYwICogNjAgKiAxMDAwO1xuXG50eXBlIFVzZURldGFpbEVkaXRTZXNzaW9uQXJncyA9IHtcbiAgYWN0aXZpZGFkSWQ6IHN0cmluZztcbiAgcmVjSWQ6IHN0cmluZztcbiAgY2FuRWRpdEhpc3Rvcnk6IGJvb2xlYW47XG4gIGlzRWRpdGluZzogYm9vbGVhbjtcbiAgc2V0SXNFZGl0aW5nOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxib29sZWFuPj47XG4gIHRyYW5zRGF0ZTogc3RyaW5nO1xuICB2aXNpdFR5cGU6IHN0cmluZztcbiAgYXNpc3RlbnRlVGlwbzogc3RyaW5nO1xuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICBjb21lbnRhcmlvczogc3RyaW5nO1xuICBhbnRlY2VkZW50ZXM6IHN0cmluZztcbiAgY29uY2x1c2lvbmVzOiBzdHJpbmc7XG4gIHNldFRyYW5zRGF0ZTogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XG4gIHNldFZpc2l0VHlwZTogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XG4gIHNldEFzaXN0ZW50ZVRpcG86IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPHN0cmluZz4+O1xuICBzZXREZXNjcmlwdGlvbjogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XG4gIHNldENvbWVudGFyaW9zOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcbiAgc2V0QW50ZWNlZGVudGVzOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcbiAgc2V0Q29uY2x1c2lvbmVzOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+Pjtcbn07XG5cbnR5cGUgRGV0YWlsRHJhZnRWYWx1ZXMgPSB7XG4gIHRyYW5zRGF0ZTogc3RyaW5nO1xuICB2aXNpdFR5cGU6IHN0cmluZztcbiAgYXNpc3RlbnRlVGlwbzogc3RyaW5nO1xuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICBjb21lbnRhcmlvczogc3RyaW5nO1xuICBhbnRlY2VkZW50ZXM6IHN0cmluZztcbiAgY29uY2x1c2lvbmVzOiBzdHJpbmc7XG59O1xuXG4vLyBNYW5hZ2VzIGVkaXQtbW9kZSBzZXNzaW9uIGZsYWdzIGFuZCBkZXRhaWwgZHJhZnQgcGVyc2lzdGVuY2UuXG5leHBvcnQgY29uc3QgdXNlRGV0YWlsRWRpdFNlc3Npb24gPSAoe1xuICBhY3RpdmlkYWRJZCxcbiAgcmVjSWQsXG4gIGNhbkVkaXRIaXN0b3J5LFxuICBpc0VkaXRpbmcsXG4gIHNldElzRWRpdGluZyxcbiAgdHJhbnNEYXRlLFxuICB2aXNpdFR5cGUsXG4gIGFzaXN0ZW50ZVRpcG8sXG4gIGRlc2NyaXB0aW9uLFxuICBjb21lbnRhcmlvcyxcbiAgYW50ZWNlZGVudGVzLFxuICBjb25jbHVzaW9uZXMsXG4gIHNldFRyYW5zRGF0ZSxcbiAgc2V0VmlzaXRUeXBlLFxuICBzZXRBc2lzdGVudGVUaXBvLFxuICBzZXREZXNjcmlwdGlvbixcbiAgc2V0Q29tZW50YXJpb3MsXG4gIHNldEFudGVjZWRlbnRlcyxcbiAgc2V0Q29uY2x1c2lvbmVzLFxufTogVXNlRGV0YWlsRWRpdFNlc3Npb25BcmdzKSA9PiB7XG4gIGNvbnN0IGVkaXRNb2RlS2V5UmVmID0gdXNlUmVmKFwiXCIpO1xuICBjb25zdCBkcmFmdEtleVJlZiA9IHVzZVJlZihcIlwiKTtcbiAgY29uc3QgZHJhZnRQZXJzaXN0VGltZXJSZWYgPSB1c2VSZWY8bnVtYmVyIHwgbnVsbD4obnVsbCk7XG5cbiAgLy8gUGVyc2lzdCBlZGl0IG1vZGUgd2hpbGUgdXNlciBuYXZpZ2F0ZXMgdG8gdGhlIHRleHQgZWRpdG9yIGFuZCBiYWNrLlxuICBjb25zdCBzeW5jRWRpdE1vZGVGbGFnID0gdXNlQ2FsbGJhY2soKGVuYWJsZWQ6IGJvb2xlYW4pID0+IHtcbiAgICBjb25zdCBrZXkgPSBlZGl0TW9kZUtleVJlZi5jdXJyZW50O1xuICAgIGlmICgha2V5KSByZXR1cm47XG4gICAgaWYgKGVuYWJsZWQpIHtcbiAgICAgIHNldFNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoa2V5LCBcInRydWVcIiwgRURJVF9NT0RFX1RUTF9NUyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJlbW92ZVNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoa2V5KTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IHN5bmNFZGl0TW9kZU9uRW50cnkgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgY29uc3QgYmFzZUlkID0gYWN0aXZpZGFkSWQgfHwgcmVjSWQgfHwgXCJkZWZhdWx0XCI7XG4gICAgY29uc3Qga2V5ID0gYGluZF92aXNpdF9lZGl0XyR7YmFzZUlkfWA7XG4gICAgY29uc3QgcmV0dXJuS2V5ID0gYCR7a2V5fV9yZXR1cm5gO1xuICAgIGNvbnN0IGRyYWZ0S2V5ID0gYGluZF92aXNpdF9kcmFmdF8ke2Jhc2VJZH1gO1xuICAgIGVkaXRNb2RlS2V5UmVmLmN1cnJlbnQgPSBrZXk7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgYWxsb3dSZXN0b3JlID0gZ2V0U2Vzc2lvblZhbHVlV2l0aEV4cGlyeShyZXR1cm5LZXkpID09PSBcIjFcIjtcbiAgICAgIGlmIChhbGxvd1Jlc3RvcmUpIHtcbiAgICAgICAgcmVtb3ZlU2Vzc2lvblZhbHVlV2l0aEV4cGlyeShyZXR1cm5LZXkpO1xuICAgICAgfVxuXG4gICAgICBpZiAoY2FuRWRpdEhpc3RvcnkgJiYgYWxsb3dSZXN0b3JlICYmIGdldFNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoa2V5KSA9PT0gXCJ0cnVlXCIpIHtcbiAgICAgICAgc2V0SXNFZGl0aW5nKHRydWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2V0SXNFZGl0aW5nKGZhbHNlKTtcbiAgICAgICAgcmVtb3ZlU2Vzc2lvblZhbHVlV2l0aEV4cGlyeShrZXkpO1xuICAgICAgICByZW1vdmVTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KGRyYWZ0S2V5KTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFjYW5FZGl0SGlzdG9yeSkge1xuICAgICAgICByZW1vdmVTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KGtleSk7XG4gICAgICAgIHJlbW92ZVNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoZHJhZnRLZXkpO1xuICAgICAgfVxuICAgIH0gY2F0Y2gge1xuICAgICAgLyogaWdub3JlICovXG4gICAgfVxuICB9LCBbYWN0aXZpZGFkSWQsIGNhbkVkaXRIaXN0b3J5LCByZWNJZCwgc2V0SXNFZGl0aW5nXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBzeW5jRWRpdE1vZGVPbkVudHJ5KCk7XG4gIH0sIFtzeW5jRWRpdE1vZGVPbkVudHJ5XSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBvblBhZ2VTaG93ID0gKGV2ZW50OiBQYWdlVHJhbnNpdGlvbkV2ZW50KSA9PiB7XG4gICAgICBjb25zdCBuYXZFbnRyeSA9IHR5cGVvZiBwZXJmb3JtYW5jZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBwZXJmb3JtYW5jZS5nZXRFbnRyaWVzQnlUeXBlXG4gICAgICAgID8gKHBlcmZvcm1hbmNlLmdldEVudHJpZXNCeVR5cGUoXCJuYXZpZ2F0aW9uXCIpWzBdIGFzIFBlcmZvcm1hbmNlTmF2aWdhdGlvblRpbWluZyB8IHVuZGVmaW5lZClcbiAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgICBjb25zdCBpc0JhY2tGb3J3YXJkID0gbmF2RW50cnk/LnR5cGUgPT09IFwiYmFja19mb3J3YXJkXCI7XG4gICAgICBpZiAoZXZlbnQ/LnBlcnNpc3RlZCB8fCBpc0JhY2tGb3J3YXJkKSB7XG4gICAgICAgIHN5bmNFZGl0TW9kZU9uRW50cnkoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwYWdlc2hvd1wiLCBvblBhZ2VTaG93KTtcbiAgICByZXR1cm4gKCkgPT4gd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwYWdlc2hvd1wiLCBvblBhZ2VTaG93KTtcbiAgfSwgW3N5bmNFZGl0TW9kZU9uRW50cnldKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGtleSA9IGBpbmRfdmlzaXRfZHJhZnRfJHthY3RpdmlkYWRJZCB8fCByZWNJZCB8fCBcImRlZmF1bHRcIn1gO1xuICAgIGRyYWZ0S2V5UmVmLmN1cnJlbnQgPSBrZXk7XG4gIH0sIFthY3RpdmlkYWRJZCwgcmVjSWRdKTtcblxuICBjb25zdCBzYXZlRHJhZnQgPSB1c2VDYWxsYmFjaygoZHJhZnQ6IERldGFpbERyYWZ0VmFsdWVzKSA9PiB7XG4gICAgY29uc3Qga2V5ID0gZHJhZnRLZXlSZWYuY3VycmVudDtcbiAgICBpZiAoIWtleSkgcmV0dXJuO1xuICAgIHNldFNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoa2V5LCBKU09OLnN0cmluZ2lmeShkcmFmdCksIERFVEFJTF9EUkFGVF9UVExfTVMpO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgY2xlYXJEcmFmdCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBjb25zdCBrZXkgPSBkcmFmdEtleVJlZi5jdXJyZW50O1xuICAgIGlmICgha2V5KSByZXR1cm47XG4gICAgcmVtb3ZlU2Vzc2lvblZhbHVlV2l0aEV4cGlyeShrZXkpO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgYXBwbHlEcmFmdFZhbHVlcyA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBjb25zdCBrZXkgPSBkcmFmdEtleVJlZi5jdXJyZW50O1xuICAgIGlmICgha2V5KSByZXR1cm47XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcmF3ID0gZ2V0U2Vzc2lvblZhbHVlV2l0aEV4cGlyeShrZXkpO1xuICAgICAgaWYgKCFyYXcpIHJldHVybjtcbiAgICAgIGNvbnN0IGRyYWZ0ID0gSlNPTi5wYXJzZShyYXcpIGFzIFBhcnRpYWw8RGV0YWlsRHJhZnRWYWx1ZXM+O1xuICAgICAgaWYgKCFkcmFmdCB8fCB0eXBlb2YgZHJhZnQgIT09IFwib2JqZWN0XCIpIHJldHVybjtcblxuICAgICAgaWYgKGRyYWZ0LnRyYW5zRGF0ZSAhPT0gdW5kZWZpbmVkKSBzZXRUcmFuc0RhdGUoU3RyaW5nKGRyYWZ0LnRyYW5zRGF0ZSkpO1xuICAgICAgaWYgKGRyYWZ0LnZpc2l0VHlwZSAhPT0gdW5kZWZpbmVkKSBzZXRWaXNpdFR5cGUoU3RyaW5nKGRyYWZ0LnZpc2l0VHlwZSkpO1xuICAgICAgaWYgKGRyYWZ0LmFzaXN0ZW50ZVRpcG8gIT09IHVuZGVmaW5lZCkgc2V0QXNpc3RlbnRlVGlwbyhTdHJpbmcoZHJhZnQuYXNpc3RlbnRlVGlwbykpO1xuICAgICAgaWYgKGRyYWZ0LmRlc2NyaXB0aW9uICE9PSB1bmRlZmluZWQpIHNldERlc2NyaXB0aW9uKFN0cmluZyhkcmFmdC5kZXNjcmlwdGlvbikpO1xuICAgICAgaWYgKGRyYWZ0LmNvbWVudGFyaW9zICE9PSB1bmRlZmluZWQpIHNldENvbWVudGFyaW9zKFN0cmluZyhkcmFmdC5jb21lbnRhcmlvcykpO1xuICAgICAgaWYgKGRyYWZ0LmFudGVjZWRlbnRlcyAhPT0gdW5kZWZpbmVkKSBzZXRBbnRlY2VkZW50ZXMoU3RyaW5nKGRyYWZ0LmFudGVjZWRlbnRlcykpO1xuICAgICAgaWYgKGRyYWZ0LmNvbmNsdXNpb25lcyAhPT0gdW5kZWZpbmVkKSBzZXRDb25jbHVzaW9uZXMoU3RyaW5nKGRyYWZ0LmNvbmNsdXNpb25lcykpO1xuICAgIH0gY2F0Y2gge1xuICAgICAgLyogaWdub3JlICovXG4gICAgfVxuICB9LCBbc2V0QW50ZWNlZGVudGVzLCBzZXRBc2lzdGVudGVUaXBvLCBzZXRDb21lbnRhcmlvcywgc2V0Q29uY2x1c2lvbmVzLCBzZXREZXNjcmlwdGlvbiwgc2V0VHJhbnNEYXRlLCBzZXRWaXNpdFR5cGVdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghaXNFZGl0aW5nKSB7XG4gICAgICBpZiAoZHJhZnRQZXJzaXN0VGltZXJSZWYuY3VycmVudCkge1xuICAgICAgICBjbGVhclRpbWVvdXQoZHJhZnRQZXJzaXN0VGltZXJSZWYuY3VycmVudCk7XG4gICAgICAgIGRyYWZ0UGVyc2lzdFRpbWVyUmVmLmN1cnJlbnQgPSBudWxsO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChkcmFmdFBlcnNpc3RUaW1lclJlZi5jdXJyZW50KSB7XG4gICAgICBjbGVhclRpbWVvdXQoZHJhZnRQZXJzaXN0VGltZXJSZWYuY3VycmVudCk7XG4gICAgfVxuXG4gICAgZHJhZnRQZXJzaXN0VGltZXJSZWYuY3VycmVudCA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGRyYWZ0UGVyc2lzdFRpbWVyUmVmLmN1cnJlbnQgPSBudWxsO1xuICAgICAgc2F2ZURyYWZ0KHtcbiAgICAgICAgdHJhbnNEYXRlLFxuICAgICAgICB2aXNpdFR5cGUsXG4gICAgICAgIGFzaXN0ZW50ZVRpcG8sXG4gICAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgICBjb21lbnRhcmlvcyxcbiAgICAgICAgYW50ZWNlZGVudGVzLFxuICAgICAgICBjb25jbHVzaW9uZXMsXG4gICAgICB9KTtcbiAgICB9LCAxODApO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGlmIChkcmFmdFBlcnNpc3RUaW1lclJlZi5jdXJyZW50KSB7XG4gICAgICAgIGNsZWFyVGltZW91dChkcmFmdFBlcnNpc3RUaW1lclJlZi5jdXJyZW50KTtcbiAgICAgICAgZHJhZnRQZXJzaXN0VGltZXJSZWYuY3VycmVudCA9IG51bGw7XG4gICAgICB9XG4gICAgfTtcbiAgfSwgW2FudGVjZWRlbnRlcywgYXNpc3RlbnRlVGlwbywgY29tZW50YXJpb3MsIGNvbmNsdXNpb25lcywgZGVzY3JpcHRpb24sIGlzRWRpdGluZywgc2F2ZURyYWZ0LCB0cmFuc0RhdGUsIHZpc2l0VHlwZV0pO1xuXG4gIHJldHVybiB7XG4gICAgZWRpdE1vZGVLZXlSZWYsXG4gICAgc3luY0VkaXRNb2RlRmxhZyxcbiAgICBjbGVhckRyYWZ0LFxuICAgIGFwcGx5RHJhZnRWYWx1ZXMsXG4gIH07XG59O1xyXG4iLCAiXHVGRUZGaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBmZXRjaEpzb24gfSBmcm9tIFwiLi4vLi4vLi4vc2VydmljZXMvYXBpU2VydmljZS50c1wiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgeyBzaG93UGVybWlzc2lvbk1vZGFsIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3Blcm1pc3Npb25zLnRzXCI7XG5pbXBvcnQgeyBmbGFzaEFjdGlvbk1hcmsgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvdmlzaXRhc0hpc3RvcnkudHNcIjtcblxudHlwZSBPcHRpb25MaWtlID0ge1xuICB2YWx1ZT86IHN0cmluZyB8IG51bWJlcjtcbiAgVmFsdWU/OiBzdHJpbmcgfCBudW1iZXI7XG4gIHRleHQ/OiBzdHJpbmc7XG4gIFRleHQ/OiBzdHJpbmc7XG59O1xuXG50eXBlIFVzZURldGFpbE11dGF0aW9uc0FyZ3MgPSB7XG4gIGJ1c3k6IGJvb2xlYW47XG4gIGlzRWRpdGluZzogYm9vbGVhbjtcbiAgY2FuRWRpdEhpc3Rvcnk6IGJvb2xlYW47XG4gIGNhbkRlbGV0ZUhpc3Rvcnk6IGJvb2xlYW47XG4gIHJlY0lkOiBzdHJpbmc7XG4gIGFjY291bnROdW06IHN0cmluZztcbiAgdHJhbnNEYXRlOiBzdHJpbmc7XG4gIHZpc2l0VHlwZTogc3RyaW5nO1xuICBhc2lzdGVudGVUaXBvOiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIGNvbWVudGFyaW9zOiBzdHJpbmc7XG4gIGFudGVjZWRlbnRlczogc3RyaW5nO1xuICBjb25jbHVzaW9uZXM6IHN0cmluZztcbiAgdmlzaXRUeXBlczogT3B0aW9uTGlrZVtdO1xuICBhc2lzdGVudGVUaXBvczogT3B0aW9uTGlrZVtdO1xuICBkZWZhdWx0VmlzaXRUeXBlOiBzdHJpbmc7XG4gIHJhd0luaXRpYWxWaXNpdFR5cGU6IHN0cmluZztcbiAgcmF3SW5pdGlhbEFzaXN0ZW50ZTogc3RyaW5nO1xuICBtYXRjaE9wdGlvblZhbHVlOiAob3B0aW9uczogT3B0aW9uTGlrZVtdLCByYXc6IHVua25vd24pID0+IHN0cmluZztcbiAgY2xlYXJEcmFmdDogKCkgPT4gdm9pZDtcbiAgc3luY0VkaXRNb2RlRmxhZzogKGVuYWJsZWQ6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHNldE1vZGFsRXJyb3I6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPHN0cmluZz4+O1xuICBzZXRCdXN5OiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxib29sZWFuPj47XG4gIHNldFN0YXR1czogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XG4gIHNldElzRWRpdGluZzogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248Ym9vbGVhbj4+O1xufTtcblxuLy8gRW5jYXBzdWxhdGVzIHVwZGF0ZSBhbmQgZGVsZXRlIG11dGF0aW9ucyBmb3IgZGV0YWlsIGZvcm0gc3RhdGUuXG5leHBvcnQgY29uc3QgdXNlRGV0YWlsTXV0YXRpb25zID0gKHtcbiAgYnVzeSxcbiAgaXNFZGl0aW5nLFxuICBjYW5FZGl0SGlzdG9yeSxcbiAgY2FuRGVsZXRlSGlzdG9yeSxcbiAgcmVjSWQsXG4gIGFjY291bnROdW0sXG4gIHRyYW5zRGF0ZSxcbiAgdmlzaXRUeXBlLFxuICBhc2lzdGVudGVUaXBvLFxuICBkZXNjcmlwdGlvbixcbiAgY29tZW50YXJpb3MsXG4gIGFudGVjZWRlbnRlcyxcbiAgY29uY2x1c2lvbmVzLFxuICB2aXNpdFR5cGVzLFxuICBhc2lzdGVudGVUaXBvcyxcbiAgZGVmYXVsdFZpc2l0VHlwZSxcbiAgcmF3SW5pdGlhbFZpc2l0VHlwZSxcbiAgcmF3SW5pdGlhbEFzaXN0ZW50ZSxcbiAgbWF0Y2hPcHRpb25WYWx1ZSxcbiAgY2xlYXJEcmFmdCxcbiAgc3luY0VkaXRNb2RlRmxhZyxcbiAgc2V0TW9kYWxFcnJvcixcbiAgc2V0QnVzeSxcbiAgc2V0U3RhdHVzLFxuICBzZXRJc0VkaXRpbmcsXG59OiBVc2VEZXRhaWxNdXRhdGlvbnNBcmdzKSA9PiB7XG4gIGNvbnN0IGhhbmRsZVVwZGF0ZSA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcbiAgICBpZiAoYnVzeSB8fCAhaXNFZGl0aW5nKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKCFjYW5FZGl0SGlzdG9yeSkge1xuICAgICAgc2hvd1Blcm1pc3Npb25Nb2RhbCgpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHNldE1vZGFsRXJyb3IoXCJcIik7XG4gICAgc2V0QnVzeSh0cnVlKTtcbiAgICBzZXRTdGF0dXMoaW5kVChcIlZpc2l0c19EZXRhaWxfVXBkYXRpbmdcIiwgXCJVcGRhdGluZyBhY3Rpdml0eS4uLlwiKSk7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3Qgbm9ybWFsaXplZFZpc2l0VHlwZSA9XG4gICAgICAgIG1hdGNoT3B0aW9uVmFsdWUodmlzaXRUeXBlcywgdmlzaXRUeXBlKSB8fFxuICAgICAgICBtYXRjaE9wdGlvblZhbHVlKHZpc2l0VHlwZXMsIHJhd0luaXRpYWxWaXNpdFR5cGUpIHx8XG4gICAgICAgIGRlZmF1bHRWaXNpdFR5cGU7XG4gICAgICBjb25zdCBub3JtYWxpemVkQXNpc3RlbnRlVGlwbyA9XG4gICAgICAgIG1hdGNoT3B0aW9uVmFsdWUoYXNpc3RlbnRlVGlwb3MsIGFzaXN0ZW50ZVRpcG8pIHx8XG4gICAgICAgIG1hdGNoT3B0aW9uVmFsdWUoYXNpc3RlbnRlVGlwb3MsIHJhd0luaXRpYWxBc2lzdGVudGUpIHx8XG4gICAgICAgIHJhd0luaXRpYWxBc2lzdGVudGU7XG5cbiAgICAgIGNvbnN0IHBheWxvYWQgPSB7XG4gICAgICAgIGFjY291bnROdW0sXG4gICAgICAgIHZpc2l0VHlwZTogbm9ybWFsaXplZFZpc2l0VHlwZSxcbiAgICAgICAgYXNpc3RlbnRlVGlwbzogbm9ybWFsaXplZEFzaXN0ZW50ZVRpcG8sXG4gICAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgICB0cmFuc0RhdGUsXG4gICAgICAgIGNvbWVudGFyaW9zLFxuICAgICAgICBhbnRlY2VkZW50ZXMsXG4gICAgICAgIGNvbmNsdXNpb25lcyxcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IHNhZmVSZWNJZCA9IGVuY29kZVVSSUNvbXBvbmVudChyZWNJZCk7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbihgL1Zpc2l0YXMvVXBkYXRlQWN0aXZpdHkvJHtzYWZlUmVjSWR9YCwge1xuICAgICAgICBtZXRob2Q6IFwiUFVUXCIsXG4gICAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGF5bG9hZCksXG4gICAgICB9KTtcblxuICAgICAgaWYgKCFyZXNwb25zZS5zdWNjZXNzKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihyZXNwb25zZS5tZXNzYWdlIHx8IGluZFQoXCJWaXNpdHNfRGV0YWlsX1VwZGF0ZUZhaWxlZFwiLCBcIlVwZGF0ZSBmYWlsZWQuXCIpKTtcbiAgICAgIH1cblxuICAgICAgc2V0U3RhdHVzKGluZFQoXCJWaXNpdHNfRGV0YWlsX1VwZGF0ZWRcIiwgXCJBY3Rpdml0eSB1cGRhdGVkXCIpKTtcbiAgICAgIHNldElzRWRpdGluZyhmYWxzZSk7XG4gICAgICBzeW5jRWRpdE1vZGVGbGFnKGZhbHNlKTtcbiAgICAgIGNsZWFyRHJhZnQoKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zdCBtZXNzYWdlID0gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciAmJiBlcnJvci5tZXNzYWdlXG4gICAgICAgID8gZXJyb3IubWVzc2FnZVxuICAgICAgICA6IGluZFQoXCJWaXNpdHNfRGV0YWlsX1VwZGF0ZUVycm9yXCIsIFwiVXBkYXRlIGVycm9yLlwiKTtcbiAgICAgIHNldE1vZGFsRXJyb3IobWVzc2FnZSk7XG4gICAgICBzZXRTdGF0dXMobWVzc2FnZSk7XG4gICAgICBmbGFzaEFjdGlvbk1hcmsoXCJlcnJvclByb2Nlc3NcIiwgMTUwMCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldEJ1c3koZmFsc2UpO1xuICAgIH1cbiAgfSwgW1xuICAgIGFjY291bnROdW0sXG4gICAgYW50ZWNlZGVudGVzLFxuICAgIGFzaXN0ZW50ZVRpcG8sXG4gICAgYXNpc3RlbnRlVGlwb3MsXG4gICAgYnVzeSxcbiAgICBjYW5FZGl0SGlzdG9yeSxcbiAgICBjbGVhckRyYWZ0LFxuICAgIGNvbWVudGFyaW9zLFxuICAgIGNvbmNsdXNpb25lcyxcbiAgICBkZWZhdWx0VmlzaXRUeXBlLFxuICAgIGRlc2NyaXB0aW9uLFxuICAgIGlzRWRpdGluZyxcbiAgICBtYXRjaE9wdGlvblZhbHVlLFxuICAgIHJhd0luaXRpYWxBc2lzdGVudGUsXG4gICAgcmF3SW5pdGlhbFZpc2l0VHlwZSxcbiAgICByZWNJZCxcbiAgICBzZXRCdXN5LFxuICAgIHNldElzRWRpdGluZyxcbiAgICBzZXRNb2RhbEVycm9yLFxuICAgIHNldFN0YXR1cyxcbiAgICBzeW5jRWRpdE1vZGVGbGFnLFxuICAgIHRyYW5zRGF0ZSxcbiAgICB2aXNpdFR5cGUsXG4gICAgdmlzaXRUeXBlcyxcbiAgXSk7XG5cbiAgY29uc3QgaGFuZGxlRGVsZXRlID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xuICAgIGlmIChidXN5KSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKCFjYW5EZWxldGVIaXN0b3J5KSB7XG4gICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgc2V0TW9kYWxFcnJvcihcIlwiKTtcbiAgICBzZXRCdXN5KHRydWUpO1xuICAgIHNldFN0YXR1cyhpbmRUKFwiVmlzaXRzX0RldGFpbF9EZWxldGluZ1wiLCBcIkRlbGV0aW5nIGFjdGl2aXR5Li4uXCIpKTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCBzYWZlUmVjSWQgPSBlbmNvZGVVUklDb21wb25lbnQocmVjSWQpO1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb24oYC9WaXNpdGFzL0RlbGV0ZUFjdGl2aXR5LyR7c2FmZVJlY0lkfWAsIHsgbWV0aG9kOiBcIkRFTEVURVwiIH0pO1xuICAgICAgaWYgKCFyZXNwb25zZS5zdWNjZXNzKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihyZXNwb25zZS5tZXNzYWdlIHx8IGluZFQoXCJWaXNpdHNfRGV0YWlsX0RlbGV0ZUZhaWxlZFwiLCBcIkRlbGV0ZSBmYWlsZWQuXCIpKTtcbiAgICAgIH1cblxuICAgICAgc2V0U3RhdHVzKGluZFQoXCJWaXNpdHNfRGV0YWlsX0RlbGV0ZWRcIiwgXCJBY3Rpdml0eSBkZWxldGVkXCIpKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zdCBtZXNzYWdlID0gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciAmJiBlcnJvci5tZXNzYWdlXG4gICAgICAgID8gZXJyb3IubWVzc2FnZVxuICAgICAgICA6IGluZFQoXCJWaXNpdHNfRGV0YWlsX0RlbGV0ZUVycm9yXCIsIFwiRGVsZXRlIGVycm9yLlwiKTtcbiAgICAgIHNldE1vZGFsRXJyb3IobWVzc2FnZSk7XG4gICAgICBzZXRTdGF0dXMobWVzc2FnZSk7XG4gICAgICBmbGFzaEFjdGlvbk1hcmsoXCJlcnJvclByb2Nlc3NcIiwgMTUwMCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldEJ1c3koZmFsc2UpO1xuICAgIH1cbiAgfSwgW2J1c3ksIGNhbkRlbGV0ZUhpc3RvcnksIHJlY0lkLCBzZXRCdXN5LCBzZXRNb2RhbEVycm9yLCBzZXRTdGF0dXNdKTtcblxuICByZXR1cm4ge1xuICAgIGhhbmRsZVVwZGF0ZSxcbiAgICBoYW5kbGVEZWxldGUsXG4gIH07XG59O1xyXG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IERldGFpbEZvcm0gZnJvbSBcIi4vRGV0YWlsRm9ybS50c3hcIjtcbmltcG9ydCBWaXNpdGFzUGFnZVByb3ZpZGVycyBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1Zpc2l0YXNQYWdlUHJvdmlkZXJzLnRzeFwiO1xuaW1wb3J0IHsgbW91bnRSZWFjdElzbGFuZCwgbW91bnRXaGVuRG9jdW1lbnRSZWFkeSB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9yZWFjdElzbGFuZC50c3hcIjtcblxuLy8gUGFnZSBlbnRyeSBmb3IgdGhlIHZpc2l0YXMgZGV0YWlsIGlzbGFuZC5cbmNvbnN0IERldGFpbFBhZ2UgPSAoKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPFZpc2l0YXNQYWdlUHJvdmlkZXJzPlxuICAgICAgPERldGFpbEZvcm0gLz5cbiAgICA8L1Zpc2l0YXNQYWdlUHJvdmlkZXJzPlxuICApO1xufTtcblxuY29uc3QgbW91bnQgPSAoKSA9PiB7XG4gIGNvbnN0IHJvb3RFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlzaXRhLWRldGFpbC1yb290XCIpO1xuICBpZiAoIXJvb3RFbCkgcmV0dXJuO1xuXG4gIG1vdW50UmVhY3RJc2xhbmQocm9vdEVsLCA8RGV0YWlsUGFnZSAvPik7XG59O1xuXG5tb3VudFdoZW5Eb2N1bWVudFJlYWR5KG1vdW50KTtcblxuZXhwb3J0IGRlZmF1bHQgRGV0YWlsUGFnZTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFBQSxnQkFBeUU7OztBQ0FsRSxJQUFNLG9CQUFvQixDQUFDLE9BQTJCO0FBQzNELE1BQUksQ0FBQyxHQUFJLFFBQU8sTUFBTTtBQUFBLEVBQUM7QUFDdkIsUUFBTSxTQUFTLENBQUMsVUFBaUIsTUFBTSxlQUFlO0FBQ3RELFFBQU0sU0FBUyxDQUFDLGVBQWUsZUFBZSxRQUFRLE9BQU8sT0FBTztBQUNwRSxTQUFPLFFBQVEsQ0FBQyxRQUFRLEdBQUcsaUJBQWlCLEtBQUssTUFBTSxDQUFDO0FBQ3hELFNBQU8sTUFBTTtBQUNYLFdBQU8sUUFBUSxDQUFDLFFBQVEsR0FBRyxvQkFBb0IsS0FBSyxNQUFNLENBQUM7QUFBQSxFQUM3RDtBQUNGOzs7QUNSTyxJQUFNLFdBQVcsQ0FBQyxVQUFtQixPQUFPLFNBQVMsRUFBRSxFQUFFLEtBQUssRUFBRSxTQUFTOzs7QUNBaEYs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a0JBQ1AsT0FBTztBQUFBLGtCQUNQLFdBQVc7QUFBQSxrQkFDWCxpQkFBaUI7QUFBQSxnQkFDbkI7QUFBQSxnQkFDQTtBQUFBLGtCQUNFLElBQUk7QUFBQSxrQkFDSixPQUFPO0FBQUEsa0JBQ1AsT0FBTztBQUFBLGtCQUNQLFdBQVc7QUFBQSxrQkFDWCxpQkFBaUI7QUFBQSxnQkFDbkI7QUFBQSxjQUNGO0FBQUE7QUFBQSxVQUNGO0FBQUEsVUFFQSw0Q0FBQyxTQUFJLFdBQVUsa0RBQ2Isc0RBQUMsVUFBTSxrQkFBTyxHQUNoQjtBQUFBO0FBQUE7QUFBQSxJQUNGO0FBQUEsS0FDRjtBQUVKO0FBR2UsU0FBUixhQUE4QjtBQUNuQyxTQUNFLDRDQUFDLDRCQUFpQixpQkFBaUIsS0FBSywrQkFBK0IsMEVBQTBFLEdBQy9JLHNEQUFDLGFBQVUsR0FDYjtBQUVKOzs7QU9oaEJNLElBQUFDLHNCQUFBO0FBSE4sSUFBTSxhQUFhLE1BQU07QUFDdkIsU0FDRSw2Q0FBQyxnQ0FDQyx1REFBQyxjQUFXLEdBQ2Q7QUFFSjtBQUVBLElBQU0sUUFBUSxNQUFNO0FBQ2xCLFFBQU0sU0FBUyxTQUFTLGVBQWUsb0JBQW9CO0FBQzNELE1BQUksQ0FBQyxPQUFRO0FBRWIsbUJBQWlCLFFBQVEsNkNBQUMsY0FBVyxDQUFFO0FBQ3pDO0FBRUEsdUJBQXVCLEtBQUs7QUFFNUIsSUFBTyxxQkFBUTsiLAogICJuYW1lcyI6IFsiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSJdCn0K
