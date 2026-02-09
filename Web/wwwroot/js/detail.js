import {
  AuthProvider,
  ConfirmModal,
  I18nProvider,
  SelectCombobox_default,
  SingleDatePicker,
  TEXT_EDITOR_PREFIX,
  isOverflowing,
  readAndClearTextEditorValue,
  setPreviewAnchor,
  showPreviewTooltip,
  useConfirmDialog,
  useTapGuard,
  useVisitas,
  wait
} from "./chunks/chunk-ARDMAVJR.js";
import {
  Spinner_default,
  canAccess,
  classNames,
  fetchJson,
  flashActionMark,
  indT,
  setHistoryFilterForDate,
  showPermissionModal
} from "./chunks/chunk-BPRI7LXP.js";
import {
  require_client,
  require_jsx_runtime,
  require_react
} from "./chunks/chunk-RGGEM6AY.js";
import {
  __toESM
} from "./chunks/chunk-45FWCHS2.js";

// Web/wwwroot/react/src/pages/visitas/detail/DetailPage.tsx
var import_client = __toESM(require_client());

// Web/wwwroot/react/src/pages/visitas/detail/DetailForm.tsx
var import_react3 = __toESM(require_react());

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

// Web/wwwroot/react/src/pages/visitas/detail/DetailForm.tsx
var import_jsx_runtime = __toESM(require_jsx_runtime());
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
  const normalizeDateToInput = (0, import_react3.useCallback)((value) => {
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
  const matchOptionValue = (0, import_react3.useCallback)((options, raw) => {
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
  const defaultVisitType = visitTypes[0]?.value ?? visitTypes[0]?.Value ?? "";
  const rawInitialVisitType = String(
    detail.tipoVisita ?? detail.TipoVisita ?? detail.visitType ?? detail.VisitType ?? ""
  );
  const initialVisitType = matchOptionValue(visitTypes, rawInitialVisitType) || defaultVisitType;
  const rawInitialAsistente = String(
    detail.asistenteTipo ?? detail.AsistenteTipo ?? (asistenteTipos[0]?.value ?? asistenteTipos[0]?.Value ?? "")
  );
  const initialAsistente = matchOptionValue(asistenteTipos, rawInitialAsistente) || rawInitialAsistente;
  const [transDate, setTransDate] = (0, import_react3.useState)(initialTransDate);
  const [visitType, setVisitType] = (0, import_react3.useState)(initialVisitType);
  const [asistenteTipo, setAsistenteTipo] = (0, import_react3.useState)(initialAsistente);
  const [description, setDescription] = (0, import_react3.useState)(String(detail.description ?? detail.Description ?? ""));
  const [comentarios, setComentarios] = (0, import_react3.useState)(String(detail.comentarios ?? detail.Comentarios ?? ""));
  const [antecedentes, setAntecedentes] = (0, import_react3.useState)(String(detail.antecedentes ?? detail.Antecedentes ?? ""));
  const [conclusiones, setConclusiones] = (0, import_react3.useState)(String(detail.conclusiones ?? detail.Conclusiones ?? ""));
  const [status, setStatus] = (0, import_react3.useState)("");
  const [busy, setBusy] = (0, import_react3.useState)(false);
  const [isEditing, setIsEditing] = (0, import_react3.useState)(false);
  const [isHydrating, setIsHydrating] = (0, import_react3.useState)(false);
  const [modalError, setModalError] = (0, import_react3.useState)("");
  const readOnlySurfaceRef = (0, import_react3.useRef)(null);
  const editModeKeyRef = (0, import_react3.useRef)("");
  const draftKeyRef = (0, import_react3.useRef)("");
  const draftPersistTimerRef = (0, import_react3.useRef)(null);
  const editSnapshotRef = (0, import_react3.useRef)(null);
  const recId = String(detail.recId ?? detail.RecId ?? "");
  const accountNum = String(detail.accountNum ?? detail.AccountNum ?? "");
  const actividadId = String(detail.actividadId ?? detail.ActividadId ?? "");
  const syncEditModeFlag = (0, import_react3.useCallback)((enabled) => {
    const key = editModeKeyRef.current;
    if (!key) return;
    try {
      if (enabled) sessionStorage.setItem(key, "true");
      else sessionStorage.removeItem(key);
    } catch {
    }
  }, []);
  const syncEditModeOnEntry = (0, import_react3.useCallback)(() => {
    const baseId = actividadId || recId || "default";
    const key = `ind_visit_edit_${baseId}`;
    const returnKey = `${key}_return`;
    const draftKey = `ind_visit_draft_${baseId}`;
    editModeKeyRef.current = key;
    try {
      const allowRestore = sessionStorage.getItem(returnKey) === "1";
      if (allowRestore) {
        sessionStorage.removeItem(returnKey);
      }
      if (canEditHistory && allowRestore && sessionStorage.getItem(key) === "true") {
        setIsEditing(true);
      } else {
        setIsEditing(false);
        sessionStorage.removeItem(key);
        sessionStorage.removeItem(draftKey);
      }
      if (!canEditHistory) {
        sessionStorage.removeItem(key);
        sessionStorage.removeItem(draftKey);
      }
    } catch {
    }
  }, [actividadId, recId, canEditHistory]);
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
    try {
      sessionStorage.setItem(key, JSON.stringify(draft));
    } catch {
    }
  }, []);
  const clearDraft = (0, import_react3.useCallback)(() => {
    const key = draftKeyRef.current;
    if (!key) return;
    try {
      sessionStorage.removeItem(key);
    } catch {
    }
  }, []);
  const applyDraftValues = (0, import_react3.useCallback)(() => {
    const key = draftKeyRef.current;
    if (!key) return;
    try {
      const raw = sessionStorage.getItem(key);
      if (!raw) return;
      const draft = JSON.parse(raw);
      if (!draft || typeof draft !== "object") return;
      if (draft.transDate) setTransDate(String(draft.transDate));
      if (draft.visitType !== void 0) setVisitType(String(draft.visitType));
      if (draft.asistenteTipo !== void 0) setAsistenteTipo(String(draft.asistenteTipo));
      if (draft.description !== void 0) setDescription(String(draft.description));
      if (draft.comentarios !== void 0) setComentarios(String(draft.comentarios));
      if (draft.antecedentes !== void 0) setAntecedentes(String(draft.antecedentes));
      if (draft.conclusiones !== void 0) setConclusiones(String(draft.conclusiones));
    } catch {
    }
  }, []);
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
  }, [transDate, visitType, asistenteTipo, description, comentarios, antecedentes, conclusiones, isEditing, saveDraft]);
  const hasServerDetail = hasValue(recId) && hasValue(accountNum) && hasValue(detail.transDate || detail.TransDate || "");
  const shouldHydrate = !!actividadId && !hasServerDetail;
  const openTextEditor = (0, import_react3.useCallback)(
    (fieldId, fieldLabel, fieldValue, options = {}) => {
      const safeId = String(fieldId || "").trim();
      const safeLabel = String(fieldLabel || "").trim();
      const readOnly = options?.readOnly === true;
      const allowEdit = options?.allowEdit !== false;
      const editModeKey = String(options?.editModeKey || "").trim();
      if (safeId) {
        const key = `${TEXT_EDITOR_PREFIX}${safeId}`;
        try {
          if (sessionStorage.getItem(key) === null) {
            sessionStorage.setItem(key, String(fieldValue || ""));
          }
        } catch {
        }
      }
      const returnUrl = `${window.location.pathname}${window.location.search || ""}`;
      try {
        if (safeId) {
          sessionStorage.setItem(`${TEXT_EDITOR_PREFIX}${safeId}_returnUrl`, returnUrl);
        }
        if (editModeKey) {
          sessionStorage.setItem(`${editModeKey}_return`, "1");
        }
      } catch {
      }
      const url = `/TextEditorReact/EditField?fieldId=${encodeURIComponent(safeId || fieldId || "")}&fieldLabel=${encodeURIComponent(safeLabel || fieldLabel || "")}&returnUrl=${encodeURIComponent(returnUrl)}&readOnly=${readOnly ? "1" : "0"}&allowEdit=${allowEdit ? "1" : "0"}` + (editModeKey ? `&editModeKey=${encodeURIComponent(editModeKey)}` : "");
      window.__indBypassNavigationGuardOnce?.();
      window.location.href = url;
    },
    []
  );
  const handleComentariosTap = (0, import_react3.useCallback)((event) => {
    event.preventDefault();
    openTextEditor(fieldIdComentarios, indT("Visits_Field_Comments", "Comments"), comentarios, {
      readOnly: !isEditing,
      allowEdit: canEditHistory,
      editModeKey: editModeKeyRef.current
    });
  }, [comentarios, isEditing, canEditHistory, openTextEditor]);
  const handleComentariosHold = (0, import_react3.useCallback)((target, clientY) => {
    if (!target || !isOverflowing(target)) return false;
    setPreviewAnchor(target);
    return showPreviewTooltip(String(comentarios || ""), clientY);
  }, [comentarios]);
  const handleAntecedentesTap = (0, import_react3.useCallback)((event) => {
    event.preventDefault();
    openTextEditor(fieldIdAntecedentes, indT("Visits_Field_Background", "Background"), antecedentes, {
      readOnly: !isEditing,
      allowEdit: canEditHistory,
      editModeKey: editModeKeyRef.current
    });
  }, [antecedentes, isEditing, canEditHistory, openTextEditor]);
  const handleAntecedentesHold = (0, import_react3.useCallback)((target, clientY) => {
    if (!target || !isOverflowing(target)) return false;
    setPreviewAnchor(target);
    return showPreviewTooltip(String(antecedentes || ""), clientY);
  }, [antecedentes]);
  const handleConclusionesTap = (0, import_react3.useCallback)((event) => {
    event.preventDefault();
    openTextEditor(fieldIdConclusiones, indT("Visits_Field_Conclusions", "Conclusions"), conclusiones, {
      readOnly: !isEditing,
      allowEdit: canEditHistory,
      editModeKey: editModeKeyRef.current
    });
  }, [conclusiones, isEditing, canEditHistory, openTextEditor]);
  const handleConclusionesHold = (0, import_react3.useCallback)((target, clientY) => {
    if (!target || !isOverflowing(target)) return false;
    setPreviewAnchor(target);
    return showPreviewTooltip(String(conclusiones || ""), clientY);
  }, [conclusiones]);
  const comentariosTap = useTapGuard(handleComentariosTap, handleComentariosHold);
  const antecedentesTap = useTapGuard(handleAntecedentesTap, handleAntecedentesHold);
  const conclusionesTap = useTapGuard(handleConclusionesTap, handleConclusionesHold);
  const applyTextEditorValues = (0, import_react3.useCallback)(() => {
    const valComentarios = readAndClearTextEditorValue(fieldIdComentarios);
    if (valComentarios !== null) setComentarios(valComentarios);
    const valAntecedentes = readAndClearTextEditorValue(fieldIdAntecedentes);
    if (valAntecedentes !== null) setAntecedentes(valAntecedentes);
    const valConclusiones = readAndClearTextEditorValue(fieldIdConclusiones);
    if (valConclusiones !== null) setConclusiones(valConclusiones);
  }, [fieldIdComentarios, fieldIdAntecedentes, fieldIdConclusiones]);
  (0, import_react3.useEffect)(() => {
    if (!actividadId) {
      applyTextEditorValues();
    }
    const onPageShow = () => applyTextEditorValues();
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, [actividadId, applyTextEditorValues]);
  const { modal, openConfirm, closeConfirm, handleConfirm } = useConfirmDialog({
    defaultConfirmText: indT("Confirm_Yes", "OK"),
    defaultCancelText: indT("Confirm_No", "Cancel")
  });
  const handleModalConfirm = (0, import_react3.useCallback)(async () => {
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
  const handleModalButtonConfirm = (0, import_react3.useCallback)(() => {
    if (!busy && modalError) {
      closeConfirm();
      return;
    }
    handleModalConfirm();
  }, [busy, modalError, closeConfirm, handleModalConfirm]);
  const hasActiveProcess = (0, import_react3.useMemo)(() => busy || isEditing, [busy, isEditing]);
  (0, import_react3.useEffect)(() => {
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
  (0, import_react3.useEffect)(() => {
    const el = readOnlySurfaceRef.current;
    if (!el) return;
    if (!isEditing) {
      el.classList.add("ind-readonly-surface");
    } else {
      el.classList.remove("ind-readonly-surface");
    }
  }, [isEditing]);
  (0, import_react3.useEffect)(() => {
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
  (0, import_react3.useEffect)(() => {
    if (isEditing) return void 0;
    return bindReadOnlyGuard(readOnlySurfaceRef.current);
  }, [isEditing]);
  const handleEnableEdit = (0, import_react3.useCallback)(() => {
    if (!canEditHistory) {
      showPermissionModal();
      return;
    }
    setIsEditing(true);
    syncEditModeFlag(true);
    setStatus(indT("Visits_Detail_EditingEnabled", "Editing enabled"));
  }, [syncEditModeFlag]);
  const handleCancelEdit = (0, import_react3.useCallback)(() => {
    if (!isEditing) return;
    setIsEditing(false);
    syncEditModeFlag(false);
    clearDraft();
    setStatus(indT("Common_Cancel", "Cancel"));
    window.__indBypassNavigationGuardOnce?.();
    window.location.reload();
  }, [isEditing, syncEditModeFlag, clearDraft]);
  const handleUpdate = (0, import_react3.useCallback)(async () => {
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
      const res = await fetchJson(`/Visitas/UpdateActivity/${recId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.success) throw new Error(res.message || indT("Visits_Detail_UpdateFailed", "Update failed."));
      setStatus(indT("Visits_Detail_Updated", "Activity updated"));
      setIsEditing(false);
      syncEditModeFlag(false);
      clearDraft();
      return true;
    } catch (err) {
      const msg = err?.message || indT("Visits_Detail_UpdateError", "Update error.");
      setModalError(msg);
      setStatus(msg);
      flashActionMark("errorProcess", 1500);
      return false;
    } finally {
      setBusy(false);
    }
  }, [antecedentes, comentarios, conclusiones, description, transDate, visitType, asistenteTipo, visitTypes, asistenteTipos, matchOptionValue, accountNum, busy, isEditing, syncEditModeFlag]);
  const handleDelete = (0, import_react3.useCallback)(async () => {
    if (busy) return false;
    if (!canDeleteHistory) {
      showPermissionModal();
      return false;
    }
    setModalError("");
    setBusy(true);
    setStatus(indT("Visits_Detail_Deleting", "Deleting activity..."));
    try {
      const res = await fetchJson(`/Visitas/DeleteActivity/${recId}`, { method: "DELETE" });
      if (!res.success) throw new Error(res.message || indT("Visits_Detail_DeleteFailed", "Delete failed."));
      setStatus(indT("Visits_Detail_Deleted", "Activity deleted"));
      return true;
    } catch (err) {
      const msg = err?.message || indT("Visits_Detail_DeleteError", "Delete error.");
      setModalError(msg);
      setStatus(msg);
      flashActionMark("errorProcess", 1500);
      return false;
    } finally {
      setBusy(false);
    }
  }, [busy, recId]);
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
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "grid grid-cols-1 gap-3", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "space-y-2", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "form-label font-semibold", children: indT("Visits_Field_Description", "Description") }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "input",
                {
                  id: "description",
                  className: classNames(
                    "form-control",
                    isEditing ? "border-slate-200 text-slate-900" : "border-slate-200 ind-readonly-field"
                  ),
                  maxLength: 200,
                  value: description,
                  disabled: !isEditing,
                  onChange: (e) => setDescription(e.target.value)
                }
              )
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "space-y-2", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "form-label font-semibold", children: indT("Visits_Field_Comments", "Comments") }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "textarea",
                {
                  id: "comentarios",
                  className: classNames(
                    "form-control cursor-pointer",
                    !isEditing ? "ind-readonly-field" : ""
                  ),
                  value: comentarios,
                  readOnly: true,
                  onPointerDown: comentariosTap.onPointerDown,
                  onPointerMove: comentariosTap.onPointerMove,
                  onPointerUp: comentariosTap.onPointerUp,
                  onPointerCancel: comentariosTap.onPointerCancel
                }
              )
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "space-y-2", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "form-label font-semibold", children: indT("Visits_Field_Background", "Background") }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "textarea",
                {
                  id: "antecedentes",
                  className: classNames(
                    "form-control cursor-pointer",
                    !isEditing ? "ind-readonly-field" : ""
                  ),
                  value: antecedentes,
                  readOnly: true,
                  onPointerDown: antecedentesTap.onPointerDown,
                  onPointerMove: antecedentesTap.onPointerMove,
                  onPointerUp: antecedentesTap.onPointerUp,
                  onPointerCancel: antecedentesTap.onPointerCancel
                }
              )
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "space-y-2", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "form-label font-semibold", children: indT("Visits_Field_Conclusions", "Conclusions") }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "textarea",
                {
                  id: "conclusiones",
                  className: classNames(
                    "form-control cursor-pointer",
                    !isEditing ? "ind-readonly-field" : ""
                  ),
                  value: conclusiones,
                  readOnly: true,
                  onPointerDown: conclusionesTap.onPointerDown,
                  onPointerMove: conclusionesTap.onPointerMove,
                  onPointerUp: conclusionesTap.onPointerUp,
                  onPointerCancel: conclusionesTap.onPointerCancel
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex items-center gap-3 text-sm text-slate-600", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: status }) })
        ]
      }
    )
  ] });
};
var ErrorBoundary = class extends import_react3.default.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
  }
  render() {
    if (this.state.hasError) {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "p-4 rounded-xl border border-rose-200 bg-rose-50 text-rose-700", children: indT("Visits_Detail_ErrorBoundary", "An error occurred while rendering the detail page. Reload and try again.") });
    }
    return this.props.children;
  }
};
function DetailForm() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorBoundary, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailApp, {}) });
}

// Web/wwwroot/react/src/pages/visitas/detail/DetailPage.tsx
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var DetailPage = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(I18nProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(DetailForm, {}) }) });
};
var mount = () => {
  const rootEl = document.getElementById("visita-detail-root");
  if (!rootEl) return;
  const element = /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(DetailPage, {});
  if (rootEl.__indRoot) {
    rootEl.__indRoot.render(element);
    return;
  }
  const root = (0, import_client.createRoot)(rootEl);
  rootEl.__indRoot = root;
  root.render(element);
};
if (document.readyState === "complete" || document.readyState === "interactive") {
  mount();
} else {
  document.addEventListener("DOMContentLoaded", mount);
}
var DetailPage_default = DetailPage;
export {
  DetailPage_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvZGV0YWlsL0RldGFpbFBhZ2UudHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy92aXNpdGFzL2RldGFpbC9EZXRhaWxGb3JtLnRzeCIsICIuLi9yZWFjdC9zcmMvdXRpbHMvZG9tR3VhcmRzLnRzIiwgIi4uL3JlYWN0L3NyYy91dGlscy9zdHJpbmdzLnRzIiwgIi4uL3JlYWN0L3NyYy9ob29rcy91c2VEZXRhaWxIeWRyYXRpb24udHMiLCAiLi4vcmVhY3Qvc3JjL2hvb2tzL3VzZURldGFpbFRvcGJhckFjdGlvbnMudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGNyZWF0ZVJvb3QgfSBmcm9tIFwicmVhY3QtZG9tL2NsaWVudFwiO1xuaW1wb3J0IERldGFpbEZvcm0gZnJvbSBcIi4vRGV0YWlsRm9ybS50c3hcIjtcbmltcG9ydCB7IEkxOG5Qcm92aWRlciB9IGZyb20gXCIuLi8uLi8uLi9jb250ZXh0L0kxOG5Db250ZXh0LnRzeFwiO1xuaW1wb3J0IHsgQXV0aFByb3ZpZGVyIH0gZnJvbSBcIi4uLy4uLy4uL2NvbnRleHQvQXV0aENvbnRleHQudHN4XCI7XG5cbnR5cGUgSW5kUm9vdEVsZW1lbnQgPSBIVE1MRWxlbWVudCAmIHsgX19pbmRSb290PzogaW1wb3J0KFwicmVhY3QtZG9tL2NsaWVudFwiKS5Sb290IH07XG5cbi8vIFBhZ2UgZW50cnkgZm9yIHRoZSB2aXNpdGFzIGRldGFpbCBpc2xhbmQuXG5jb25zdCBEZXRhaWxQYWdlID0gKCkgPT4ge1xuICByZXR1cm4gKFxuICAgIDxJMThuUHJvdmlkZXI+XG4gICAgICA8QXV0aFByb3ZpZGVyPlxuICAgICAgICA8RGV0YWlsRm9ybSAvPlxuICAgICAgPC9BdXRoUHJvdmlkZXI+XG4gICAgPC9JMThuUHJvdmlkZXI+XG4gICk7XG59O1xuXG5jb25zdCBtb3VudCA9ICgpID0+IHtcbiAgY29uc3Qgcm9vdEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2aXNpdGEtZGV0YWlsLXJvb3RcIikgYXMgSW5kUm9vdEVsZW1lbnQgfCBudWxsO1xuICBpZiAoIXJvb3RFbCkgcmV0dXJuO1xuXG4gIGNvbnN0IGVsZW1lbnQgPSA8RGV0YWlsUGFnZSAvPjtcblxuICBpZiAocm9vdEVsLl9faW5kUm9vdCkge1xuICAgIHJvb3RFbC5fX2luZFJvb3QucmVuZGVyKGVsZW1lbnQpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHJvb3QgPSBjcmVhdGVSb290KHJvb3RFbCk7XG4gIHJvb3RFbC5fX2luZFJvb3QgPSByb290O1xuICByb290LnJlbmRlcihlbGVtZW50KTtcbn07XG5cbmlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSBcImNvbXBsZXRlXCIgfHwgZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gXCJpbnRlcmFjdGl2ZVwiKSB7XG4gIG1vdW50KCk7XG59IGVsc2Uge1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBtb3VudCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IERldGFpbFBhZ2U7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QsIHVzZVJlZiwgdXNlQ2FsbGJhY2ssIHVzZU1lbW8gfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBTaW5nbGVEYXRlUGlja2VyIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvU2luZ2xlRGF0ZVBpY2tlci50c3hcIjtcclxuaW1wb3J0IENvbmZpcm1Nb2RhbCBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0NvbmZpcm1Nb2RhbC50c3hcIjtcclxuaW1wb3J0IFNlbGVjdENvbWJvYm94IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvU2VsZWN0Q29tYm9ib3gudHN4XCI7XG5pbXBvcnQgeyBmZXRjaEpzb24gfSBmcm9tIFwiLi4vLi4vLi4vc2VydmljZXMvYXBpU2VydmljZS50c1wiO1xuaW1wb3J0IHsgdXNlVmlzaXRhcyB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VWaXNpdGFzLnRzXCI7XG5pbXBvcnQgU3Bpbm5lciBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NwaW5uZXIudHN4XCI7XG5pbXBvcnQgeyBjbGFzc05hbWVzIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2NsYXNzTmFtZXMudHNcIjtcbmltcG9ydCB7IGluZEZvcm1hdCwgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgeyBjYW5BY2Nlc3MsIHNob3dQZXJtaXNzaW9uTW9kYWwgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvcGVybWlzc2lvbnMudHNcIjtcbmltcG9ydCB7IGJpbmRSZWFkT25seUd1YXJkIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2RvbUd1YXJkcy50c1wiO1xuaW1wb3J0IHsgaGFzVmFsdWUgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvc3RyaW5ncy50c1wiO1xuaW1wb3J0IHsgcmVhZEFuZENsZWFyVGV4dEVkaXRvclZhbHVlLCBURVhUX0VESVRPUl9QUkVGSVggfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvdGV4dEVkaXRvci50c1wiO1xuaW1wb3J0IHsgZmxhc2hBY3Rpb25NYXJrIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3Zpc2l0YXNIaXN0b3J5LnRzXCI7XG5pbXBvcnQgeyBzZXRQcmV2aWV3QW5jaG9yLCBzaG93UHJldmlld1Rvb2x0aXAsIGlzT3ZlcmZsb3dpbmcgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvcHJldmlld1Rvb2x0aXAudHNcIjtcbmltcG9ydCB7IHVzZVRhcEd1YXJkIH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZVRhcEd1YXJkLnRzXCI7XG5pbXBvcnQgeyB1c2VDb25maXJtRGlhbG9nIH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZUNvbmZpcm1EaWFsb2cudHNcIjtcbmltcG9ydCB7IHVzZURldGFpbEh5ZHJhdGlvbiB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VEZXRhaWxIeWRyYXRpb24udHNcIjtcbmltcG9ydCB7IHVzZURldGFpbFRvcGJhckFjdGlvbnMgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlRGV0YWlsVG9wYmFyQWN0aW9ucy50c1wiO1xuXHJcbmNvbnN0IERldGFpbEFwcCA9ICgpID0+IHtcclxuICBjb25zdCB7IHZpc2l0VHlwZXMsIGFzaXN0ZW50ZVRpcG9zIH0gPSB1c2VWaXNpdGFzKCk7XHJcbiAgY29uc3QgY2FuRWRpdEhpc3RvcnkgPSBjYW5BY2Nlc3MoXCJWSVNJVEFTX0hJU1RPUklBTFwiLCBcIkVkaXRcIik7XHJcbiAgY29uc3QgY2FuRGVsZXRlSGlzdG9yeSA9IGNhbkFjY2VzcyhcIlZJU0lUQVNfSElTVE9SSUFMXCIsIFwiRnVsbEFjY2Vzc1wiKTtcclxuICB0eXBlIEFjdGl2aXR5RGV0YWlsUGF5bG9hZCA9IHtcclxuICAgIHJlY0lkPzogc3RyaW5nIHwgbnVtYmVyO1xyXG4gICAgUmVjSWQ/OiBzdHJpbmcgfCBudW1iZXI7XHJcbiAgICByZWZSZWNJZEFjdGl2aWRhZD86IHN0cmluZyB8IG51bWJlcjtcclxuICAgIFJlZlJlY0lkQWN0aXZpZGFkPzogc3RyaW5nIHwgbnVtYmVyO1xyXG4gICAgYWN0aXZpZGFkUmVjSWQ/OiBzdHJpbmcgfCBudW1iZXI7XHJcbiAgICBBY3RpdmlkYWRSZWNJZD86IHN0cmluZyB8IG51bWJlcjtcclxuICAgIHJlYWRPbmx5PzogYm9vbGVhbjtcclxuICAgIGFsbG93RWRpdD86IGJvb2xlYW47XHJcbiAgICBlZGl0TW9kZUtleT86IHN0cmluZztcclxuICAgIFtrZXk6IHN0cmluZ106IHVua25vd247XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgZGV0YWlsID0gKHdpbmRvdy5fX0FDVElWSVRZX0RFVEFJTF9fIGFzIEFjdGl2aXR5RGV0YWlsUGF5bG9hZCkgfHwge307XHJcblxyXG4gIGNvbnN0IGFjdGl2aXR5UmVjSWQgPSBTdHJpbmcoXHJcbiAgICBkZXRhaWwucmVjSWQgfHxcclxuICAgICAgZGV0YWlsLlJlY0lkIHx8XHJcbiAgICAgIGRldGFpbC5yZWZSZWNJZEFjdGl2aWRhZCB8fFxyXG4gICAgICBkZXRhaWwuUmVmUmVjSWRBY3RpdmlkYWQgfHxcclxuICAgICAgZGV0YWlsLmFjdGl2aWRhZFJlY0lkIHx8XHJcbiAgICAgIGRldGFpbC5BY3RpdmlkYWRSZWNJZCB8fFxyXG4gICAgICBcIlwiXHJcbiAgKS50cmltKCk7XHJcblxyXG4gIGNvbnN0IHRleHRFZGl0b3JCYXNlSWQgPSBhY3Rpdml0eVJlY0lkID8gYFZpc2l0YS4ke2FjdGl2aXR5UmVjSWR9YCA6IFwiVmlzaXRhXCI7XHJcbiAgY29uc3QgZmllbGRJZENvbWVudGFyaW9zID0gYCR7dGV4dEVkaXRvckJhc2VJZH0uQ29tZW50YXJpb3NgO1xyXG4gIGNvbnN0IGZpZWxkSWRBbnRlY2VkZW50ZXMgPSBgJHt0ZXh0RWRpdG9yQmFzZUlkfS5BbnRlY2VkZW50ZXNgO1xyXG4gIGNvbnN0IGZpZWxkSWRDb25jbHVzaW9uZXMgPSBgJHt0ZXh0RWRpdG9yQmFzZUlkfS5Db25jbHVzaW9uZXNgO1xyXG5cclxuICBjb25zdCBub3JtYWxpemVEYXRlVG9JbnB1dCA9IHVzZUNhbGxiYWNrKCh2YWx1ZSkgPT4ge1xyXG4gICAgaWYgKCF2YWx1ZSkgcmV0dXJuIFwiXCI7XHJcbiAgICBjb25zdCByYXcgPSBTdHJpbmcodmFsdWUpLnRyaW0oKTtcclxuICAgIGlmICghcmF3KSByZXR1cm4gXCJcIjtcclxuICAgIC8vIEFscmVhZHkgeXl5eS1NTS1kZFxyXG4gICAgaWYgKC9eXFxkezR9LVxcZHsyfS1cXGR7Mn0kLy50ZXN0KHJhdykpIHJldHVybiByYXc7XHJcbiAgICAvLyBkZC5NTS55eXl5IG9yIGRkL01NL3l5eXlcclxuICAgIGlmICgvXlxcZHsyfVsuLy1dXFxkezJ9Wy4vLV1cXGR7NH0kLy50ZXN0KHJhdykpIHtcclxuICAgICAgY29uc3QgcGFydHMgPSByYXcuc3BsaXQoL1suLy1dLykubWFwKChwKSA9PiBwYXJzZUludChwLCAxMCkpO1xyXG4gICAgICBpZiAocGFydHMubGVuZ3RoID09PSAzICYmICFOdW1iZXIuaXNOYU4ocGFydHNbMF0pICYmICFOdW1iZXIuaXNOYU4ocGFydHNbMV0pICYmICFOdW1iZXIuaXNOYU4ocGFydHNbMl0pKSB7XHJcbiAgICAgICAgY29uc3QgW2QsIG0sIHldID0gcGFydHM7XHJcbiAgICAgICAgY29uc3QgbW0gPSBTdHJpbmcobSkucGFkU3RhcnQoMiwgXCIwXCIpO1xyXG4gICAgICAgIGNvbnN0IGRkID0gU3RyaW5nKGQpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcclxuICAgICAgICByZXR1cm4gYCR7eX0tJHttbX0tJHtkZH1gO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBjb25zdCBkdCA9IG5ldyBEYXRlKHJhdyk7XHJcbiAgICBpZiAoIU51bWJlci5pc05hTihkdC5nZXRUaW1lKCkpKSB7XHJcbiAgICAgIGNvbnN0IHl5eXkgPSBkdC5nZXRGdWxsWWVhcigpO1xyXG4gICAgICBjb25zdCBtbSA9IFN0cmluZyhkdC5nZXRNb250aCgpICsgMSkucGFkU3RhcnQoMiwgXCIwXCIpO1xyXG4gICAgICBjb25zdCBkZCA9IFN0cmluZyhkdC5nZXREYXRlKCkpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcclxuICAgICAgcmV0dXJuIGAke3l5eXl9LSR7bW19LSR7ZGR9YDtcclxuICAgIH1cclxuICAgIHJldHVybiBcIlwiO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgbWF0Y2hPcHRpb25WYWx1ZSA9IHVzZUNhbGxiYWNrKChvcHRpb25zLCByYXcpID0+IHtcclxuICAgIGlmIChyYXcgPT0gbnVsbCkgcmV0dXJuIFwiXCI7XHJcbiAgICBjb25zdCByYXdTdHIgPSBTdHJpbmcocmF3KS50cmltKCk7XHJcbiAgICBpZiAoIXJhd1N0cikgcmV0dXJuIFwiXCI7XHJcblxyXG4gICAgY29uc3Qgbm9ybWFsaXplVGV4dCA9IChzKSA9PlxyXG4gICAgICBTdHJpbmcocyB8fCBcIlwiKVxyXG4gICAgICAgIC50b0xvd2VyQ2FzZSgpXHJcbiAgICAgICAgLm5vcm1hbGl6ZShcIk5GRFwiKVxyXG4gICAgICAgIC5yZXBsYWNlKC9bXFx1MDMwMC1cXHUwMzZmXS9nLCBcIlwiKVxyXG4gICAgICAgIC50cmltKCk7XHJcblxyXG4gICAgY29uc3QgcmF3Tm9ybSA9IG5vcm1hbGl6ZVRleHQocmF3U3RyKTtcclxuICAgIGNvbnN0IGFsdE5vcm0gPSByYXdOb3JtLmVuZHNXaXRoKFwib1wiKSA/IGAke3Jhd05vcm0uc2xpY2UoMCwgLTEpfWFgIDogcmF3Tm9ybTtcclxuXHJcbiAgICBjb25zdCBtYXRjaCA9IChvcHRpb25zIHx8IFtdKS5maW5kKChvKSA9PiB7XHJcbiAgICAgIGNvbnN0IHZhbCA9IFN0cmluZyhvPy52YWx1ZSA/PyBvPy5WYWx1ZSA/PyBcIlwiKS50cmltKCk7XHJcbiAgICAgIGNvbnN0IHRleHQgPSBTdHJpbmcobz8udGV4dCA/PyBvPy5UZXh0ID8/IFwiXCIpLnRyaW0oKTtcclxuICAgICAgY29uc3QgdGV4dE5vcm0gPSBub3JtYWxpemVUZXh0KHRleHQpO1xyXG4gICAgICByZXR1cm4gdmFsID09PSByYXdTdHIgfHwgdmFsID09PSByYXdOb3JtIHx8IHRleHROb3JtID09PSByYXdOb3JtIHx8IHRleHROb3JtID09PSBhbHROb3JtO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gbWF0Y2ggPyBTdHJpbmcobWF0Y2gudmFsdWUgPz8gbWF0Y2guVmFsdWUgPz8gcmF3U3RyKSA6IHJhd1N0cjtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IGluaXRpYWxUcmFuc0RhdGUgPSBub3JtYWxpemVEYXRlVG9JbnB1dChTdHJpbmcoZGV0YWlsLnRyYW5zRGF0ZSA/PyBkZXRhaWwuVHJhbnNEYXRlID8/IFwiXCIpKTtcclxuICBjb25zdCBkZWZhdWx0VmlzaXRUeXBlID0gdmlzaXRUeXBlc1swXT8udmFsdWUgPz8gdmlzaXRUeXBlc1swXT8uVmFsdWUgPz8gXCJcIjtcclxuICBjb25zdCByYXdJbml0aWFsVmlzaXRUeXBlID0gU3RyaW5nKFxyXG4gICAgZGV0YWlsLnRpcG9WaXNpdGEgPz8gZGV0YWlsLlRpcG9WaXNpdGEgPz8gZGV0YWlsLnZpc2l0VHlwZSA/PyBkZXRhaWwuVmlzaXRUeXBlID8/IFwiXCJcclxuICApO1xyXG4gIGNvbnN0IGluaXRpYWxWaXNpdFR5cGUgPSBtYXRjaE9wdGlvblZhbHVlKHZpc2l0VHlwZXMsIHJhd0luaXRpYWxWaXNpdFR5cGUpIHx8IGRlZmF1bHRWaXNpdFR5cGU7XHJcbiAgY29uc3QgcmF3SW5pdGlhbEFzaXN0ZW50ZSA9IFN0cmluZyhcclxuICAgIGRldGFpbC5hc2lzdGVudGVUaXBvID8/IGRldGFpbC5Bc2lzdGVudGVUaXBvID8/IChhc2lzdGVudGVUaXBvc1swXT8udmFsdWUgPz8gYXNpc3RlbnRlVGlwb3NbMF0/LlZhbHVlID8/IFwiXCIpXHJcbiAgKTtcclxuICBjb25zdCBpbml0aWFsQXNpc3RlbnRlID0gbWF0Y2hPcHRpb25WYWx1ZShhc2lzdGVudGVUaXBvcywgcmF3SW5pdGlhbEFzaXN0ZW50ZSkgfHwgcmF3SW5pdGlhbEFzaXN0ZW50ZTtcclxuXHJcbiAgY29uc3QgW3RyYW5zRGF0ZSwgc2V0VHJhbnNEYXRlXSA9IHVzZVN0YXRlKGluaXRpYWxUcmFuc0RhdGUpO1xyXG4gIGNvbnN0IFt2aXNpdFR5cGUsIHNldFZpc2l0VHlwZV0gPSB1c2VTdGF0ZShpbml0aWFsVmlzaXRUeXBlKTtcclxuICBjb25zdCBbYXNpc3RlbnRlVGlwbywgc2V0QXNpc3RlbnRlVGlwb10gPSB1c2VTdGF0ZShpbml0aWFsQXNpc3RlbnRlKTtcclxuICBjb25zdCBbZGVzY3JpcHRpb24sIHNldERlc2NyaXB0aW9uXSA9IHVzZVN0YXRlKFN0cmluZyhkZXRhaWwuZGVzY3JpcHRpb24gPz8gZGV0YWlsLkRlc2NyaXB0aW9uID8/IFwiXCIpKTtcclxuICBjb25zdCBbY29tZW50YXJpb3MsIHNldENvbWVudGFyaW9zXSA9IHVzZVN0YXRlKFN0cmluZyhkZXRhaWwuY29tZW50YXJpb3MgPz8gZGV0YWlsLkNvbWVudGFyaW9zID8/IFwiXCIpKTtcclxuICBjb25zdCBbYW50ZWNlZGVudGVzLCBzZXRBbnRlY2VkZW50ZXNdID0gdXNlU3RhdGUoU3RyaW5nKGRldGFpbC5hbnRlY2VkZW50ZXMgPz8gZGV0YWlsLkFudGVjZWRlbnRlcyA/PyBcIlwiKSk7XHJcbiAgY29uc3QgW2NvbmNsdXNpb25lcywgc2V0Q29uY2x1c2lvbmVzXSA9IHVzZVN0YXRlKFN0cmluZyhkZXRhaWwuY29uY2x1c2lvbmVzID8/IGRldGFpbC5Db25jbHVzaW9uZXMgPz8gXCJcIikpO1xyXG4gIGNvbnN0IFtzdGF0dXMsIHNldFN0YXR1c10gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2J1c3ksIHNldEJ1c3ldID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbaXNFZGl0aW5nLCBzZXRJc0VkaXRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbaXNIeWRyYXRpbmcsIHNldElzSHlkcmF0aW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW21vZGFsRXJyb3IsIHNldE1vZGFsRXJyb3JdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IHJlYWRPbmx5U3VyZmFjZVJlZiA9IHVzZVJlZihudWxsKTtcbiAgY29uc3QgZWRpdE1vZGVLZXlSZWYgPSB1c2VSZWYoXCJcIik7XG4gIGNvbnN0IGRyYWZ0S2V5UmVmID0gdXNlUmVmKFwiXCIpO1xuICBjb25zdCBkcmFmdFBlcnNpc3RUaW1lclJlZiA9IHVzZVJlZjxudW1iZXIgfCBudWxsPihudWxsKTtcbiAgY29uc3QgZWRpdFNuYXBzaG90UmVmID0gdXNlUmVmKG51bGwpO1xuXHJcbiAgY29uc3QgcmVjSWQgPSBTdHJpbmcoZGV0YWlsLnJlY0lkID8/IGRldGFpbC5SZWNJZCA/PyBcIlwiKTtcclxuICBjb25zdCBhY2NvdW50TnVtID0gU3RyaW5nKGRldGFpbC5hY2NvdW50TnVtID8/IGRldGFpbC5BY2NvdW50TnVtID8/IFwiXCIpO1xyXG4gIGNvbnN0IGFjdGl2aWRhZElkID0gU3RyaW5nKGRldGFpbC5hY3RpdmlkYWRJZCA/PyBkZXRhaWwuQWN0aXZpZGFkSWQgPz8gXCJcIik7XHJcblxyXG4gIC8vIFBlcnNpc3QgZWRpdCBtb2RlIGFjcm9zcyBuYXZpZ2F0aW9uIHRvIHRoZSB0ZXh0IGVkaXRvci5cclxuICBjb25zdCBzeW5jRWRpdE1vZGVGbGFnID0gdXNlQ2FsbGJhY2soKGVuYWJsZWQpID0+IHtcclxuICAgIGNvbnN0IGtleSA9IGVkaXRNb2RlS2V5UmVmLmN1cnJlbnQ7XHJcbiAgICBpZiAoIWtleSkgcmV0dXJuO1xyXG4gICAgdHJ5IHtcclxuICAgICAgaWYgKGVuYWJsZWQpIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oa2V5LCBcInRydWVcIik7XHJcbiAgICAgIGVsc2Ugc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xyXG4gICAgfSBjYXRjaCB7XHJcbiAgICAgIC8qIGlnbm9yZSAqL1xyXG4gICAgfVxyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3Qgc3luY0VkaXRNb2RlT25FbnRyeSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBjb25zdCBiYXNlSWQgPSBhY3RpdmlkYWRJZCB8fCByZWNJZCB8fCBcImRlZmF1bHRcIjtcbiAgICBjb25zdCBrZXkgPSBgaW5kX3Zpc2l0X2VkaXRfJHtiYXNlSWR9YDtcbiAgICBjb25zdCByZXR1cm5LZXkgPSBgJHtrZXl9X3JldHVybmA7XG4gICAgY29uc3QgZHJhZnRLZXkgPSBgaW5kX3Zpc2l0X2RyYWZ0XyR7YmFzZUlkfWA7XG4gICAgZWRpdE1vZGVLZXlSZWYuY3VycmVudCA9IGtleTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgYWxsb3dSZXN0b3JlID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShyZXR1cm5LZXkpID09PSBcIjFcIjtcbiAgICAgIGlmIChhbGxvd1Jlc3RvcmUpIHtcbiAgICAgICAgc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbShyZXR1cm5LZXkpO1xuICAgICAgfVxuICAgICAgaWYgKGNhbkVkaXRIaXN0b3J5ICYmIGFsbG93UmVzdG9yZSAmJiBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGtleSkgPT09IFwidHJ1ZVwiKSB7XG4gICAgICAgIHNldElzRWRpdGluZyh0cnVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNldElzRWRpdGluZyhmYWxzZSk7XG4gICAgICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KTtcbiAgICAgICAgc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbShkcmFmdEtleSk7XG4gICAgICB9XG4gICAgICBpZiAoIWNhbkVkaXRIaXN0b3J5KSB7XG4gICAgICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KTtcbiAgICAgICAgc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbShkcmFmdEtleSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCB7XG4gICAgICAvKiBpZ25vcmUgKi9cbiAgICB9XG4gIH0sIFthY3RpdmlkYWRJZCwgcmVjSWQsIGNhbkVkaXRIaXN0b3J5XSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBzeW5jRWRpdE1vZGVPbkVudHJ5KCk7XG4gIH0sIFtzeW5jRWRpdE1vZGVPbkVudHJ5XSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBvblBhZ2VTaG93ID0gKGV2ZW50OiBQYWdlVHJhbnNpdGlvbkV2ZW50KSA9PiB7XG4gICAgICBjb25zdCBuYXZFbnRyeSA9IHR5cGVvZiBwZXJmb3JtYW5jZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBwZXJmb3JtYW5jZS5nZXRFbnRyaWVzQnlUeXBlXG4gICAgICAgID8gKHBlcmZvcm1hbmNlLmdldEVudHJpZXNCeVR5cGUoXCJuYXZpZ2F0aW9uXCIpWzBdIGFzIFBlcmZvcm1hbmNlTmF2aWdhdGlvblRpbWluZyB8IHVuZGVmaW5lZClcbiAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgICBjb25zdCBpc0JhY2tGb3J3YXJkID0gbmF2RW50cnk/LnR5cGUgPT09IFwiYmFja19mb3J3YXJkXCI7XG4gICAgICBpZiAoZXZlbnQ/LnBlcnNpc3RlZCB8fCBpc0JhY2tGb3J3YXJkKSB7XG4gICAgICAgIHN5bmNFZGl0TW9kZU9uRW50cnkoKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicGFnZXNob3dcIiwgb25QYWdlU2hvdyk7XG4gICAgcmV0dXJuICgpID0+IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicGFnZXNob3dcIiwgb25QYWdlU2hvdyk7XG4gIH0sIFtzeW5jRWRpdE1vZGVPbkVudHJ5XSk7XG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3Qga2V5ID0gYGluZF92aXNpdF9kcmFmdF8ke2FjdGl2aWRhZElkIHx8IHJlY0lkIHx8IFwiZGVmYXVsdFwifWA7XHJcbiAgICBkcmFmdEtleVJlZi5jdXJyZW50ID0ga2V5O1xyXG4gIH0sIFthY3RpdmlkYWRJZCwgcmVjSWRdKTtcclxuXHJcbiAgY29uc3Qgc2F2ZURyYWZ0ID0gdXNlQ2FsbGJhY2soKGRyYWZ0KSA9PiB7XHJcbiAgICBjb25zdCBrZXkgPSBkcmFmdEtleVJlZi5jdXJyZW50O1xyXG4gICAgaWYgKCFrZXkpIHJldHVybjtcclxuICAgIHRyeSB7XHJcbiAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oa2V5LCBKU09OLnN0cmluZ2lmeShkcmFmdCkpO1xyXG4gICAgfSBjYXRjaCB7XHJcbiAgICAgIC8qIGlnbm9yZSAqL1xyXG4gICAgfVxyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgY2xlYXJEcmFmdCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGNvbnN0IGtleSA9IGRyYWZ0S2V5UmVmLmN1cnJlbnQ7XHJcbiAgICBpZiAoIWtleSkgcmV0dXJuO1xyXG4gICAgdHJ5IHtcclxuICAgICAgc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xyXG4gICAgfSBjYXRjaCB7XHJcbiAgICAgIC8qIGlnbm9yZSAqL1xyXG4gICAgfVxyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgYXBwbHlEcmFmdFZhbHVlcyA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGNvbnN0IGtleSA9IGRyYWZ0S2V5UmVmLmN1cnJlbnQ7XHJcbiAgICBpZiAoIWtleSkgcmV0dXJuO1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcmF3ID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShrZXkpO1xyXG4gICAgICBpZiAoIXJhdykgcmV0dXJuO1xyXG4gICAgICBjb25zdCBkcmFmdCA9IEpTT04ucGFyc2UocmF3KTtcclxuICAgICAgaWYgKCFkcmFmdCB8fCB0eXBlb2YgZHJhZnQgIT09IFwib2JqZWN0XCIpIHJldHVybjtcclxuICAgICAgaWYgKGRyYWZ0LnRyYW5zRGF0ZSkgc2V0VHJhbnNEYXRlKFN0cmluZyhkcmFmdC50cmFuc0RhdGUpKTtcclxuICAgICAgaWYgKGRyYWZ0LnZpc2l0VHlwZSAhPT0gdW5kZWZpbmVkKSBzZXRWaXNpdFR5cGUoU3RyaW5nKGRyYWZ0LnZpc2l0VHlwZSkpO1xyXG4gICAgICBpZiAoZHJhZnQuYXNpc3RlbnRlVGlwbyAhPT0gdW5kZWZpbmVkKSBzZXRBc2lzdGVudGVUaXBvKFN0cmluZyhkcmFmdC5hc2lzdGVudGVUaXBvKSk7XHJcbiAgICAgIGlmIChkcmFmdC5kZXNjcmlwdGlvbiAhPT0gdW5kZWZpbmVkKSBzZXREZXNjcmlwdGlvbihTdHJpbmcoZHJhZnQuZGVzY3JpcHRpb24pKTtcclxuICAgICAgaWYgKGRyYWZ0LmNvbWVudGFyaW9zICE9PSB1bmRlZmluZWQpIHNldENvbWVudGFyaW9zKFN0cmluZyhkcmFmdC5jb21lbnRhcmlvcykpO1xyXG4gICAgICBpZiAoZHJhZnQuYW50ZWNlZGVudGVzICE9PSB1bmRlZmluZWQpIHNldEFudGVjZWRlbnRlcyhTdHJpbmcoZHJhZnQuYW50ZWNlZGVudGVzKSk7XHJcbiAgICAgIGlmIChkcmFmdC5jb25jbHVzaW9uZXMgIT09IHVuZGVmaW5lZCkgc2V0Q29uY2x1c2lvbmVzKFN0cmluZyhkcmFmdC5jb25jbHVzaW9uZXMpKTtcclxuICAgIH0gY2F0Y2gge1xyXG4gICAgICAvKiBpZ25vcmUgKi9cclxuICAgIH1cclxuICB9LCBbXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFpc0VkaXRpbmcpIHtcbiAgICAgIGlmIChkcmFmdFBlcnNpc3RUaW1lclJlZi5jdXJyZW50KSB7XG4gICAgICAgIGNsZWFyVGltZW91dChkcmFmdFBlcnNpc3RUaW1lclJlZi5jdXJyZW50KTtcbiAgICAgICAgZHJhZnRQZXJzaXN0VGltZXJSZWYuY3VycmVudCA9IG51bGw7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGRyYWZ0UGVyc2lzdFRpbWVyUmVmLmN1cnJlbnQpIHtcbiAgICAgIGNsZWFyVGltZW91dChkcmFmdFBlcnNpc3RUaW1lclJlZi5jdXJyZW50KTtcbiAgICB9XG5cbiAgICBkcmFmdFBlcnNpc3RUaW1lclJlZi5jdXJyZW50ID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgZHJhZnRQZXJzaXN0VGltZXJSZWYuY3VycmVudCA9IG51bGw7XG4gICAgICBzYXZlRHJhZnQoe1xuICAgICAgICB0cmFuc0RhdGUsXG4gICAgICAgIHZpc2l0VHlwZSxcbiAgICAgICAgYXNpc3RlbnRlVGlwbyxcbiAgICAgICAgZGVzY3JpcHRpb24sXG4gICAgICAgIGNvbWVudGFyaW9zLFxuICAgICAgICBhbnRlY2VkZW50ZXMsXG4gICAgICAgIGNvbmNsdXNpb25lc1xuICAgICAgfSk7XG4gICAgfSwgMTgwKTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBpZiAoZHJhZnRQZXJzaXN0VGltZXJSZWYuY3VycmVudCkge1xuICAgICAgICBjbGVhclRpbWVvdXQoZHJhZnRQZXJzaXN0VGltZXJSZWYuY3VycmVudCk7XG4gICAgICAgIGRyYWZ0UGVyc2lzdFRpbWVyUmVmLmN1cnJlbnQgPSBudWxsO1xuICAgICAgfVxuICAgIH07XG4gIH0sIFt0cmFuc0RhdGUsIHZpc2l0VHlwZSwgYXNpc3RlbnRlVGlwbywgZGVzY3JpcHRpb24sIGNvbWVudGFyaW9zLCBhbnRlY2VkZW50ZXMsIGNvbmNsdXNpb25lcywgaXNFZGl0aW5nLCBzYXZlRHJhZnRdKTtcblxyXG4gIGNvbnN0IGhhc1NlcnZlckRldGFpbCA9XHJcbiAgICBoYXNWYWx1ZShyZWNJZCkgJiZcclxuICAgIGhhc1ZhbHVlKGFjY291bnROdW0pICYmXHJcbiAgICBoYXNWYWx1ZShkZXRhaWwudHJhbnNEYXRlIHx8IGRldGFpbC5UcmFuc0RhdGUgfHwgXCJcIik7XHJcblxyXG4gIGNvbnN0IHNob3VsZEh5ZHJhdGUgPSAhIWFjdGl2aWRhZElkICYmICFoYXNTZXJ2ZXJEZXRhaWw7XHJcblxyXG4gIGNvbnN0IG9wZW5UZXh0RWRpdG9yID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoXHJcbiAgICAgIGZpZWxkSWQ6IHN0cmluZyxcclxuICAgICAgZmllbGRMYWJlbDogc3RyaW5nLFxyXG4gICAgICBmaWVsZFZhbHVlOiBzdHJpbmcsXHJcbiAgICAgIG9wdGlvbnM6IHsgYWxsb3dFZGl0PzogYm9vbGVhbjsgcmVhZE9ubHk/OiBib29sZWFuOyBlZGl0TW9kZUtleT86IHN0cmluZyB9ID0ge31cclxuICAgICkgPT4ge1xyXG4gICAgY29uc3Qgc2FmZUlkID0gU3RyaW5nKGZpZWxkSWQgfHwgXCJcIikudHJpbSgpO1xyXG4gICAgY29uc3Qgc2FmZUxhYmVsID0gU3RyaW5nKGZpZWxkTGFiZWwgfHwgXCJcIikudHJpbSgpO1xuICAgIGNvbnN0IHJlYWRPbmx5ID0gb3B0aW9ucz8ucmVhZE9ubHkgPT09IHRydWU7XG4gICAgY29uc3QgYWxsb3dFZGl0ID0gb3B0aW9ucz8uYWxsb3dFZGl0ICE9PSBmYWxzZTtcbiAgICBjb25zdCBlZGl0TW9kZUtleSA9IFN0cmluZyhvcHRpb25zPy5lZGl0TW9kZUtleSB8fCBcIlwiKS50cmltKCk7XG4gICAgaWYgKHNhZmVJZCkge1xyXG4gICAgICBjb25zdCBrZXkgPSBgJHtURVhUX0VESVRPUl9QUkVGSVh9JHtzYWZlSWR9YDtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICAvLyBQcmltZSB0aGUgZWRpdG9yIHdpdGggdGhlIGN1cnJlbnQgdmFsdWUgd2l0aG91dCBwdXNoaW5nIGxhcmdlIHRleHQgaW50byB0aGUgVVJMLlxyXG4gICAgICAgIGlmIChzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGtleSkgPT09IG51bGwpIHtcclxuICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oa2V5LCBTdHJpbmcoZmllbGRWYWx1ZSB8fCBcIlwiKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGNhdGNoIHtcclxuICAgICAgICAvKiBpZ25vcmUgKi9cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHJldHVyblVybCA9IGAke3dpbmRvdy5sb2NhdGlvbi5wYXRobmFtZX0ke3dpbmRvdy5sb2NhdGlvbi5zZWFyY2ggfHwgXCJcIn1gO1xyXG4gICAgdHJ5IHtcbiAgICAgIGlmIChzYWZlSWQpIHtcbiAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShgJHtURVhUX0VESVRPUl9QUkVGSVh9JHtzYWZlSWR9X3JldHVyblVybGAsIHJldHVyblVybCk7XG4gICAgICB9XG4gICAgICBpZiAoZWRpdE1vZGVLZXkpIHtcbiAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShgJHtlZGl0TW9kZUtleX1fcmV0dXJuYCwgXCIxXCIpO1xuICAgICAgfVxuICAgIH0gY2F0Y2gge1xuICAgICAgLyogaWdub3JlICovXG4gICAgfVxuICAgIGNvbnN0IHVybCA9XG4gICAgICBgL1RleHRFZGl0b3JSZWFjdC9FZGl0RmllbGQ/ZmllbGRJZD0ke2VuY29kZVVSSUNvbXBvbmVudChzYWZlSWQgfHwgZmllbGRJZCB8fCBcIlwiKX1gICtcbiAgICAgIGAmZmllbGRMYWJlbD0ke2VuY29kZVVSSUNvbXBvbmVudChzYWZlTGFiZWwgfHwgZmllbGRMYWJlbCB8fCBcIlwiKX1gICtcbiAgICAgIGAmcmV0dXJuVXJsPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHJldHVyblVybCl9YCArXG4gICAgICBgJnJlYWRPbmx5PSR7cmVhZE9ubHkgPyBcIjFcIiA6IFwiMFwifWAgK1xuICAgICAgYCZhbGxvd0VkaXQ9JHthbGxvd0VkaXQgPyBcIjFcIiA6IFwiMFwifWAgK1xuICAgICAgKGVkaXRNb2RlS2V5ID8gYCZlZGl0TW9kZUtleT0ke2VuY29kZVVSSUNvbXBvbmVudChlZGl0TW9kZUtleSl9YCA6IFwiXCIpO1xuXG4gICAgd2luZG93Ll9faW5kQnlwYXNzTmF2aWdhdGlvbkd1YXJkT25jZT8uKCk7XG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSB1cmw7XG4gICAgfSxcbiAgICBbXVxuICApO1xuXHJcbiAgY29uc3QgaGFuZGxlQ29tZW50YXJpb3NUYXAgPSB1c2VDYWxsYmFjaygoZXZlbnQpID0+IHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBvcGVuVGV4dEVkaXRvcihmaWVsZElkQ29tZW50YXJpb3MsIGluZFQoXCJWaXNpdHNfRmllbGRfQ29tbWVudHNcIiwgXCJDb21tZW50c1wiKSwgY29tZW50YXJpb3MsIHtcclxuICAgICAgcmVhZE9ubHk6ICFpc0VkaXRpbmcsXHJcbiAgICAgIGFsbG93RWRpdDogY2FuRWRpdEhpc3RvcnksXHJcbiAgICAgIGVkaXRNb2RlS2V5OiBlZGl0TW9kZUtleVJlZi5jdXJyZW50XHJcbiAgICB9KTtcclxuICB9LCBbY29tZW50YXJpb3MsIGlzRWRpdGluZywgY2FuRWRpdEhpc3RvcnksIG9wZW5UZXh0RWRpdG9yXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUNvbWVudGFyaW9zSG9sZCA9IHVzZUNhbGxiYWNrKCh0YXJnZXQsIGNsaWVudFkpID0+IHtcclxuICAgIGlmICghdGFyZ2V0IHx8ICFpc092ZXJmbG93aW5nKHRhcmdldCkpIHJldHVybiBmYWxzZTtcclxuICAgIHNldFByZXZpZXdBbmNob3IodGFyZ2V0KTtcclxuICAgIHJldHVybiBzaG93UHJldmlld1Rvb2x0aXAoU3RyaW5nKGNvbWVudGFyaW9zIHx8IFwiXCIpLCBjbGllbnRZKTtcclxuICB9LCBbY29tZW50YXJpb3NdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQW50ZWNlZGVudGVzVGFwID0gdXNlQ2FsbGJhY2soKGV2ZW50KSA9PiB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgb3BlblRleHRFZGl0b3IoZmllbGRJZEFudGVjZWRlbnRlcywgaW5kVChcIlZpc2l0c19GaWVsZF9CYWNrZ3JvdW5kXCIsIFwiQmFja2dyb3VuZFwiKSwgYW50ZWNlZGVudGVzLCB7XHJcbiAgICAgIHJlYWRPbmx5OiAhaXNFZGl0aW5nLFxyXG4gICAgICBhbGxvd0VkaXQ6IGNhbkVkaXRIaXN0b3J5LFxyXG4gICAgICBlZGl0TW9kZUtleTogZWRpdE1vZGVLZXlSZWYuY3VycmVudFxyXG4gICAgfSk7XHJcbiAgfSwgW2FudGVjZWRlbnRlcywgaXNFZGl0aW5nLCBjYW5FZGl0SGlzdG9yeSwgb3BlblRleHRFZGl0b3JdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQW50ZWNlZGVudGVzSG9sZCA9IHVzZUNhbGxiYWNrKCh0YXJnZXQsIGNsaWVudFkpID0+IHtcclxuICAgIGlmICghdGFyZ2V0IHx8ICFpc092ZXJmbG93aW5nKHRhcmdldCkpIHJldHVybiBmYWxzZTtcclxuICAgIHNldFByZXZpZXdBbmNob3IodGFyZ2V0KTtcclxuICAgIHJldHVybiBzaG93UHJldmlld1Rvb2x0aXAoU3RyaW5nKGFudGVjZWRlbnRlcyB8fCBcIlwiKSwgY2xpZW50WSk7XHJcbiAgfSwgW2FudGVjZWRlbnRlc10pO1xyXG5cclxuICBjb25zdCBoYW5kbGVDb25jbHVzaW9uZXNUYXAgPSB1c2VDYWxsYmFjaygoZXZlbnQpID0+IHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBvcGVuVGV4dEVkaXRvcihmaWVsZElkQ29uY2x1c2lvbmVzLCBpbmRUKFwiVmlzaXRzX0ZpZWxkX0NvbmNsdXNpb25zXCIsIFwiQ29uY2x1c2lvbnNcIiksIGNvbmNsdXNpb25lcywge1xyXG4gICAgICByZWFkT25seTogIWlzRWRpdGluZyxcclxuICAgICAgYWxsb3dFZGl0OiBjYW5FZGl0SGlzdG9yeSxcclxuICAgICAgZWRpdE1vZGVLZXk6IGVkaXRNb2RlS2V5UmVmLmN1cnJlbnRcclxuICAgIH0pO1xyXG4gIH0sIFtjb25jbHVzaW9uZXMsIGlzRWRpdGluZywgY2FuRWRpdEhpc3RvcnksIG9wZW5UZXh0RWRpdG9yXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUNvbmNsdXNpb25lc0hvbGQgPSB1c2VDYWxsYmFjaygodGFyZ2V0LCBjbGllbnRZKSA9PiB7XHJcbiAgICBpZiAoIXRhcmdldCB8fCAhaXNPdmVyZmxvd2luZyh0YXJnZXQpKSByZXR1cm4gZmFsc2U7XHJcbiAgICBzZXRQcmV2aWV3QW5jaG9yKHRhcmdldCk7XHJcbiAgICByZXR1cm4gc2hvd1ByZXZpZXdUb29sdGlwKFN0cmluZyhjb25jbHVzaW9uZXMgfHwgXCJcIiksIGNsaWVudFkpO1xyXG4gIH0sIFtjb25jbHVzaW9uZXNdKTtcclxuXHJcbiAgY29uc3QgY29tZW50YXJpb3NUYXAgPSB1c2VUYXBHdWFyZChoYW5kbGVDb21lbnRhcmlvc1RhcCwgaGFuZGxlQ29tZW50YXJpb3NIb2xkKTtcclxuICBjb25zdCBhbnRlY2VkZW50ZXNUYXAgPSB1c2VUYXBHdWFyZChoYW5kbGVBbnRlY2VkZW50ZXNUYXAsIGhhbmRsZUFudGVjZWRlbnRlc0hvbGQpO1xyXG4gIGNvbnN0IGNvbmNsdXNpb25lc1RhcCA9IHVzZVRhcEd1YXJkKGhhbmRsZUNvbmNsdXNpb25lc1RhcCwgaGFuZGxlQ29uY2x1c2lvbmVzSG9sZCk7XHJcblxyXG4gIGNvbnN0IGFwcGx5VGV4dEVkaXRvclZhbHVlcyA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGNvbnN0IHZhbENvbWVudGFyaW9zID0gcmVhZEFuZENsZWFyVGV4dEVkaXRvclZhbHVlKGZpZWxkSWRDb21lbnRhcmlvcyk7XHJcbiAgICBpZiAodmFsQ29tZW50YXJpb3MgIT09IG51bGwpIHNldENvbWVudGFyaW9zKHZhbENvbWVudGFyaW9zKTtcclxuXHJcbiAgICBjb25zdCB2YWxBbnRlY2VkZW50ZXMgPSByZWFkQW5kQ2xlYXJUZXh0RWRpdG9yVmFsdWUoZmllbGRJZEFudGVjZWRlbnRlcyk7XHJcbiAgICBpZiAodmFsQW50ZWNlZGVudGVzICE9PSBudWxsKSBzZXRBbnRlY2VkZW50ZXModmFsQW50ZWNlZGVudGVzKTtcclxuXHJcbiAgICBjb25zdCB2YWxDb25jbHVzaW9uZXMgPSByZWFkQW5kQ2xlYXJUZXh0RWRpdG9yVmFsdWUoZmllbGRJZENvbmNsdXNpb25lcyk7XHJcbiAgICBpZiAodmFsQ29uY2x1c2lvbmVzICE9PSBudWxsKSBzZXRDb25jbHVzaW9uZXModmFsQ29uY2x1c2lvbmVzKTtcclxuICB9LCBbZmllbGRJZENvbWVudGFyaW9zLCBmaWVsZElkQW50ZWNlZGVudGVzLCBmaWVsZElkQ29uY2x1c2lvbmVzXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIWFjdGl2aWRhZElkKSB7XHJcbiAgICAgIGFwcGx5VGV4dEVkaXRvclZhbHVlcygpO1xyXG4gICAgfVxyXG4gICAgY29uc3Qgb25QYWdlU2hvdyA9ICgpID0+IGFwcGx5VGV4dEVkaXRvclZhbHVlcygpO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwYWdlc2hvd1wiLCBvblBhZ2VTaG93KTtcclxuICAgIHJldHVybiAoKSA9PiB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInBhZ2VzaG93XCIsIG9uUGFnZVNob3cpO1xyXG4gIH0sIFthY3RpdmlkYWRJZCwgYXBwbHlUZXh0RWRpdG9yVmFsdWVzXSk7XHJcblxyXG4gIGNvbnN0IHsgbW9kYWwsIG9wZW5Db25maXJtLCBjbG9zZUNvbmZpcm0sIGhhbmRsZUNvbmZpcm0gfSA9IHVzZUNvbmZpcm1EaWFsb2coe1xyXG4gICAgZGVmYXVsdENvbmZpcm1UZXh0OiBpbmRUKFwiQ29uZmlybV9ZZXNcIiwgXCJPS1wiKSxcclxuICAgIGRlZmF1bHRDYW5jZWxUZXh0OiBpbmRUKFwiQ29uZmlybV9Ob1wiLCBcIkNhbmNlbFwiKVxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVNb2RhbENvbmZpcm0gPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XHJcbiAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xyXG4gICAgYXdhaXQgaGFuZGxlQ29uZmlybSh7XHJcbiAgICAgIGJ1c3ksXHJcbiAgICAgIG9uRXJyb3I6IChtc2cpID0+IHtcclxuICAgICAgICBzZXRNb2RhbEVycm9yKG1zZyk7XHJcbiAgICAgICAgc2V0U3RhdHVzKG1zZyk7XHJcbiAgICAgICAgZmxhc2hBY3Rpb25NYXJrKFwiZXJyb3JQcm9jZXNzXCIsIDE1MDApO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9LCBbYnVzeSwgaGFuZGxlQ29uZmlybV0pO1xyXG5cclxuICBjb25zdCBtb2RhbExvYWRpbmdUZXh0ID0gaW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKTtcclxuICBjb25zdCBtb2RhbENhbmNlbFRleHQgPSBtb2RhbC5jYW5jZWxUZXh0IHx8IGluZFQoXCJDb25maXJtX05vXCIsIFwiQ2FuY2VsXCIpO1xyXG4gIGNvbnN0IG1vZGFsQ29uZmlybVRleHQgPSBidXN5XHJcbiAgICA/IG1vZGFsTG9hZGluZ1RleHRcclxuICAgIDogKCFidXN5ICYmIG1vZGFsRXJyb3IgPyBpbmRUKFwiQ29tbW9uX09LXCIsIFwiT0tcIikgOiAobW9kYWwuY29uZmlybVRleHQgfHwgaW5kVChcIkNvbmZpcm1fWWVzXCIsIFwiT0tcIikpKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlTW9kYWxCdXR0b25Db25maXJtID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmICghYnVzeSAmJiBtb2RhbEVycm9yKSB7XG4gICAgICBjbG9zZUNvbmZpcm0oKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaGFuZGxlTW9kYWxDb25maXJtKCk7XG4gIH0sIFtidXN5LCBtb2RhbEVycm9yLCBjbG9zZUNvbmZpcm0sIGhhbmRsZU1vZGFsQ29uZmlybV0pO1xuXG4gIGNvbnN0IGhhc0FjdGl2ZVByb2Nlc3MgPSB1c2VNZW1vKCgpID0+IGJ1c3kgfHwgaXNFZGl0aW5nLCBbYnVzeSwgaXNFZGl0aW5nXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICB3aW5kb3cuX19pbmRTZXROYXZpZ2F0aW9uR3VhcmQ/LihoYXNBY3RpdmVQcm9jZXNzKTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgd2luZG93Ll9faW5kQ2xlYXJOYXZpZ2F0aW9uR3VhcmQ/LigpO1xuICAgIH07XG4gIH0sIFtoYXNBY3RpdmVQcm9jZXNzXSk7XG5cclxuICB1c2VEZXRhaWxIeWRyYXRpb24oe1xuICAgIGFjdGl2aWRhZElkLFxuICAgIHNob3VsZEh5ZHJhdGUsXG4gICAgdmlzaXRUeXBlcyxcbiAgICBhc2lzdGVudGVUaXBvcyxcbiAgICBkZWZhdWx0VmlzaXRUeXBlLFxuICAgIGluaXRpYWxBc2lzdGVudGUsXG4gICAgbm9ybWFsaXplRGF0ZVRvSW5wdXQsXG4gICAgbWF0Y2hPcHRpb25WYWx1ZSxcbiAgICBhcHBseURyYWZ0VmFsdWVzLFxuICAgIGFwcGx5VGV4dEVkaXRvclZhbHVlcyxcbiAgICBzZXRTdGF0dXMsXG4gICAgc2V0SXNIeWRyYXRpbmcsXG4gICAgc2V0VHJhbnNEYXRlLFxuICAgIHNldFZpc2l0VHlwZSxcbiAgICBzZXRBc2lzdGVudGVUaXBvLFxuICAgIHNldERlc2NyaXB0aW9uLFxuICAgIHNldENvbWVudGFyaW9zLFxuICAgIHNldEFudGVjZWRlbnRlcyxcbiAgICBzZXRDb25jbHVzaW9uZXMsXG4gIH0pO1xuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBlbCA9IHJlYWRPbmx5U3VyZmFjZVJlZi5jdXJyZW50O1xuICAgIGlmICghZWwpIHJldHVybjtcbiAgICBpZiAoIWlzRWRpdGluZykge1xuICAgICAgZWwuY2xhc3NMaXN0LmFkZChcImluZC1yZWFkb25seS1zdXJmYWNlXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiaW5kLXJlYWRvbmx5LXN1cmZhY2VcIik7XG4gICAgfVxuICB9LCBbaXNFZGl0aW5nXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoaXNFZGl0aW5nKSB7XG4gICAgICBpZiAoIWVkaXRTbmFwc2hvdFJlZi5jdXJyZW50KSB7XG4gICAgICAgIGVkaXRTbmFwc2hvdFJlZi5jdXJyZW50ID0ge1xuICAgICAgICAgIHRyYW5zRGF0ZSxcbiAgICAgICAgICB2aXNpdFR5cGUsXG4gICAgICAgICAgYXNpc3RlbnRlVGlwbyxcbiAgICAgICAgICBkZXNjcmlwdGlvbixcbiAgICAgICAgICBjb21lbnRhcmlvcyxcbiAgICAgICAgICBhbnRlY2VkZW50ZXMsXG4gICAgICAgICAgY29uY2x1c2lvbmVzXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGVkaXRTbmFwc2hvdFJlZi5jdXJyZW50ID0gbnVsbDtcbiAgfSwgW2lzRWRpdGluZywgdHJhbnNEYXRlLCB2aXNpdFR5cGUsIGFzaXN0ZW50ZVRpcG8sIGRlc2NyaXB0aW9uLCBjb21lbnRhcmlvcywgYW50ZWNlZGVudGVzLCBjb25jbHVzaW9uZXNdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChpc0VkaXRpbmcpIHJldHVybiB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIGJpbmRSZWFkT25seUd1YXJkKHJlYWRPbmx5U3VyZmFjZVJlZi5jdXJyZW50KTtcbiAgfSwgW2lzRWRpdGluZ10pO1xuXG4gIGNvbnN0IGhhbmRsZUVuYWJsZUVkaXQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKCFjYW5FZGl0SGlzdG9yeSkge1xuICAgICAgc2hvd1Blcm1pc3Npb25Nb2RhbCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzZXRJc0VkaXRpbmcodHJ1ZSk7XG4gICAgc3luY0VkaXRNb2RlRmxhZyh0cnVlKTtcbiAgICBzZXRTdGF0dXMoaW5kVChcIlZpc2l0c19EZXRhaWxfRWRpdGluZ0VuYWJsZWRcIiwgXCJFZGl0aW5nIGVuYWJsZWRcIikpO1xuICB9LCBbc3luY0VkaXRNb2RlRmxhZ10pO1xuXG4gIGNvbnN0IGhhbmRsZUNhbmNlbEVkaXQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKCFpc0VkaXRpbmcpIHJldHVybjtcbiAgICBzZXRJc0VkaXRpbmcoZmFsc2UpO1xuICAgIHN5bmNFZGl0TW9kZUZsYWcoZmFsc2UpO1xuICAgIGNsZWFyRHJhZnQoKTtcbiAgICBzZXRTdGF0dXMoaW5kVChcIkNvbW1vbl9DYW5jZWxcIiwgXCJDYW5jZWxcIikpO1xuICAgIHdpbmRvdy5fX2luZEJ5cGFzc05hdmlnYXRpb25HdWFyZE9uY2U/LigpO1xuICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgfSwgW2lzRWRpdGluZywgc3luY0VkaXRNb2RlRmxhZywgY2xlYXJEcmFmdF0pO1xuXHJcbiAgY29uc3QgaGFuZGxlVXBkYXRlID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgaWYgKGJ1c3kgfHwgIWlzRWRpdGluZykgcmV0dXJuIGZhbHNlO1xyXG4gICAgaWYgKCFjYW5FZGl0SGlzdG9yeSkge1xyXG4gICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHNldE1vZGFsRXJyb3IoXCJcIik7XHJcbiAgICBzZXRCdXN5KHRydWUpO1xyXG4gICAgc2V0U3RhdHVzKGluZFQoXCJWaXNpdHNfRGV0YWlsX1VwZGF0aW5nXCIsIFwiVXBkYXRpbmcgYWN0aXZpdHkuLi5cIikpO1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3Qgbm9ybWFsaXplZFZpc2l0VHlwZSA9XHJcbiAgICAgICAgbWF0Y2hPcHRpb25WYWx1ZSh2aXNpdFR5cGVzLCB2aXNpdFR5cGUpIHx8XHJcbiAgICAgICAgbWF0Y2hPcHRpb25WYWx1ZSh2aXNpdFR5cGVzLCByYXdJbml0aWFsVmlzaXRUeXBlKSB8fFxyXG4gICAgICAgIGRlZmF1bHRWaXNpdFR5cGU7XHJcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRBc2lzdGVudGVUaXBvID1cclxuICAgICAgICBtYXRjaE9wdGlvblZhbHVlKGFzaXN0ZW50ZVRpcG9zLCBhc2lzdGVudGVUaXBvKSB8fFxyXG4gICAgICAgIG1hdGNoT3B0aW9uVmFsdWUoYXNpc3RlbnRlVGlwb3MsIHJhd0luaXRpYWxBc2lzdGVudGUpIHx8XHJcbiAgICAgICAgcmF3SW5pdGlhbEFzaXN0ZW50ZTtcclxuICAgICAgY29uc3QgcGF5bG9hZCA9IHtcclxuICAgICAgICBhY2NvdW50TnVtOiBhY2NvdW50TnVtLFxyXG4gICAgICAgIHZpc2l0VHlwZTogbm9ybWFsaXplZFZpc2l0VHlwZSxcclxuICAgICAgICBhc2lzdGVudGVUaXBvOiBub3JtYWxpemVkQXNpc3RlbnRlVGlwbyxcclxuICAgICAgICBkZXNjcmlwdGlvbixcclxuICAgICAgICB0cmFuc0RhdGUsXHJcbiAgICAgICAgY29tZW50YXJpb3MsXHJcbiAgICAgICAgYW50ZWNlZGVudGVzLFxyXG4gICAgICAgIGNvbmNsdXNpb25lc1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2hKc29uKGAvVmlzaXRhcy9VcGRhdGVBY3Rpdml0eS8ke3JlY0lkfWAsIHtcclxuICAgICAgICBtZXRob2Q6IFwiUFVUXCIsXHJcbiAgICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxyXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHBheWxvYWQpXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgaWYgKCFyZXMuc3VjY2VzcykgdGhyb3cgbmV3IEVycm9yKHJlcy5tZXNzYWdlIHx8IGluZFQoXCJWaXNpdHNfRGV0YWlsX1VwZGF0ZUZhaWxlZFwiLCBcIlVwZGF0ZSBmYWlsZWQuXCIpKTtcclxuXHJcbiAgICAgIHNldFN0YXR1cyhpbmRUKFwiVmlzaXRzX0RldGFpbF9VcGRhdGVkXCIsIFwiQWN0aXZpdHkgdXBkYXRlZFwiKSk7XHJcbiAgICAgIHNldElzRWRpdGluZyhmYWxzZSk7XHJcbiAgICAgIHN5bmNFZGl0TW9kZUZsYWcoZmFsc2UpO1xyXG4gICAgICBjbGVhckRyYWZ0KCk7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGNvbnN0IG1zZyA9IGVycj8ubWVzc2FnZSB8fCBpbmRUKFwiVmlzaXRzX0RldGFpbF9VcGRhdGVFcnJvclwiLCBcIlVwZGF0ZSBlcnJvci5cIik7XHJcbiAgICAgIHNldE1vZGFsRXJyb3IobXNnKTtcclxuICAgICAgc2V0U3RhdHVzKG1zZyk7XHJcbiAgICAgIGZsYXNoQWN0aW9uTWFyayhcImVycm9yUHJvY2Vzc1wiLCAxNTAwKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSBmaW5hbGx5IHtcclxuICAgICAgc2V0QnVzeShmYWxzZSk7XHJcbiAgICB9XHJcbiAgfSwgW2FudGVjZWRlbnRlcywgY29tZW50YXJpb3MsIGNvbmNsdXNpb25lcywgZGVzY3JpcHRpb24sIHRyYW5zRGF0ZSwgdmlzaXRUeXBlLCBhc2lzdGVudGVUaXBvLCB2aXNpdFR5cGVzLCBhc2lzdGVudGVUaXBvcywgbWF0Y2hPcHRpb25WYWx1ZSwgYWNjb3VudE51bSwgYnVzeSwgaXNFZGl0aW5nLCBzeW5jRWRpdE1vZGVGbGFnXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZURlbGV0ZSA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcclxuICAgIGlmIChidXN5KSByZXR1cm4gZmFsc2U7XHJcbiAgICBpZiAoIWNhbkRlbGV0ZUhpc3RvcnkpIHtcclxuICAgICAgc2hvd1Blcm1pc3Npb25Nb2RhbCgpO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xyXG4gICAgc2V0QnVzeSh0cnVlKTtcclxuICAgIHNldFN0YXR1cyhpbmRUKFwiVmlzaXRzX0RldGFpbF9EZWxldGluZ1wiLCBcIkRlbGV0aW5nIGFjdGl2aXR5Li4uXCIpKTtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoSnNvbihgL1Zpc2l0YXMvRGVsZXRlQWN0aXZpdHkvJHtyZWNJZH1gLCB7IG1ldGhvZDogXCJERUxFVEVcIiB9KTtcclxuICAgICAgaWYgKCFyZXMuc3VjY2VzcykgdGhyb3cgbmV3IEVycm9yKHJlcy5tZXNzYWdlIHx8IGluZFQoXCJWaXNpdHNfRGV0YWlsX0RlbGV0ZUZhaWxlZFwiLCBcIkRlbGV0ZSBmYWlsZWQuXCIpKTtcclxuICAgICAgc2V0U3RhdHVzKGluZFQoXCJWaXNpdHNfRGV0YWlsX0RlbGV0ZWRcIiwgXCJBY3Rpdml0eSBkZWxldGVkXCIpKTtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgY29uc3QgbXNnID0gZXJyPy5tZXNzYWdlIHx8IGluZFQoXCJWaXNpdHNfRGV0YWlsX0RlbGV0ZUVycm9yXCIsIFwiRGVsZXRlIGVycm9yLlwiKTtcclxuICAgICAgc2V0TW9kYWxFcnJvcihtc2cpO1xyXG4gICAgICBzZXRTdGF0dXMobXNnKTtcclxuICAgICAgZmxhc2hBY3Rpb25NYXJrKFwiZXJyb3JQcm9jZXNzXCIsIDE1MDApO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9IGZpbmFsbHkge1xyXG4gICAgICBzZXRCdXN5KGZhbHNlKTtcclxuICAgIH1cclxuICB9LCBbYnVzeSwgcmVjSWRdKTtcclxuXHJcbiAgdXNlRGV0YWlsVG9wYmFyQWN0aW9ucyh7XG4gICAgYnVzeSxcbiAgICBtb2RhbE9wZW46IG1vZGFsLm9wZW4sXG4gICAgaXNFZGl0aW5nLFxuICAgIGNhbkVkaXRIaXN0b3J5LFxuICAgIGNhbkRlbGV0ZUhpc3RvcnksXG4gICAgdHJhbnNEYXRlLFxuICAgIHNldE1vZGFsRXJyb3IsXG4gICAgaGFuZGxlRW5hYmxlRWRpdCxcbiAgICBoYW5kbGVDYW5jZWxFZGl0LFxuICAgIGhhbmRsZVVwZGF0ZSxcbiAgICBoYW5kbGVEZWxldGUsXG4gICAgb3BlbkNvbmZpcm0sXG4gICAgY2xvc2VDb25maXJtLFxuICB9KTtcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNFwiPlxyXG4gICAgICA8Q29uZmlybU1vZGFsXHJcbiAgICAgICAgb3Blbj17bW9kYWwub3Blbn1cclxuICAgICAgICB0aXRsZT17bW9kYWwudGl0bGV9XHJcbiAgICAgICAgbWVzc2FnZT17bW9kYWwubWVzc2FnZX1cclxuICAgICAgICBjb25maXJtVGV4dD17bW9kYWxDb25maXJtVGV4dH1cclxuICAgICAgICBjYW5jZWxUZXh0PXttb2RhbENhbmNlbFRleHR9XHJcbiAgICAgICAgbG9hZGluZ1RleHQ9e21vZGFsTG9hZGluZ1RleHR9XHJcbiAgICAgICAgc2hvd0NhbmNlbD17bW9kYWwuc2hvd0NhbmNlbH1cclxuICAgICAgICBzaG93Q29uZmlybT17bW9kYWwuc2hvd0NvbmZpcm19XHJcbiAgICAgICAgYnVzeT17YnVzeX1cclxuICAgICAgICBlcnJvcj17bW9kYWxFcnJvcn1cclxuICAgICAgICBzdGF0dXM9e3N0YXR1c31cclxuICAgICAgICBvbkNvbmZpcm09e2hhbmRsZU1vZGFsQnV0dG9uQ29uZmlybX1cclxuICAgICAgICBvbkNhbmNlbD17Y2xvc2VDb25maXJtfVxyXG4gICAgICAvPlxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgcmVmPXtyZWFkT25seVN1cmZhY2VSZWZ9XHJcbiAgICAgICAgY2xhc3NOYW1lPVwicmVsYXRpdmUgc2hhZG93LXhzIGdsYXNzLXBhbmVsIHAtNCBzcGFjZS15LTQgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgcm91bmRlZC0yeGxcIlxyXG4gICAgICA+XHJcbiAgICAgICAge2lzSHlkcmF0aW5nICYmIChcclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCB6LTEwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGJnLXdoaXRlLzcwIHJvdW5kZWQtMnhsXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC1zbSB0ZXh0LXNsYXRlLTYwMFwiPlxyXG4gICAgICAgICAgICAgIDxTcGlubmVyIHNpemU9XCJoLTUgdy01XCIgLz5cclxuICAgICAgICAgICAgICA8c3Bhbj57aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX08L3NwYW4+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKX1cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMiBnYXAtNCBwdC0xXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ2aXNpdGEtZmllbGQtdGV4dFwiPlxyXG4gICAgICAgICAgICA8U2luZ2xlRGF0ZVBpY2tlclxuICAgICAgICAgICAgICBsYWJlbD17aW5kVChcIlZpc2l0c19EZXRhaWxfRGF0ZV9MYWJlbFwiLCBcIkRhdGVcIil9XG4gICAgICAgICAgICAgIHZhbHVlPXt0cmFuc0RhdGV9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXtzZXRUcmFuc0RhdGV9XG4gICAgICAgICAgICAgIGRpc2FibGVkPXshaXNFZGl0aW5nfVxuICAgICAgICAgICAgICByZWFkT25seT17IWlzRWRpdGluZ31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPFNlbGVjdENvbWJvYm94XG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIlZpc2l0c19EZXRhaWxfVmlzaXRUeXBlX0xhYmVsXCIsIFwiVmlzaXQgdHlwZVwiKX1cbiAgICAgICAgICAgIG9wdGlvbnM9e3Zpc2l0VHlwZXN9XG4gICAgICAgICAgICB2YWx1ZT17dmlzaXRUeXBlfVxuICAgICAgICAgICAgb25DaGFuZ2U9e3NldFZpc2l0VHlwZX1cbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiVmlzaXRzX0RldGFpbF9WaXNpdFR5cGVfUGxhY2Vob2xkZXJcIiwgXCJTZWxlY3QgdHlwZVwiKX1cbiAgICAgICAgICAgIGRpc2FibGVkPXshaXNFZGl0aW5nfVxuICAgICAgICAgICAgcmVhZE9ubHk9eyFpc0VkaXRpbmd9XG4gICAgICAgICAgICB1c2VQb3J0YWw9e2ZhbHNlfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgZ2FwLTNcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yXCI+XHJcbiAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb3JtLWxhYmVsIGZvbnQtc2VtaWJvbGRcIj57aW5kVChcIlZpc2l0c19GaWVsZF9EZXNjcmlwdGlvblwiLCBcIkRlc2NyaXB0aW9uXCIpfTwvbGFiZWw+XHJcbiAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICBpZD1cImRlc2NyaXB0aW9uXCJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAgICAgICAgIFwiZm9ybS1jb250cm9sXCIsXG4gICAgICAgICAgICAgICAgaXNFZGl0aW5nID8gXCJib3JkZXItc2xhdGUtMjAwIHRleHQtc2xhdGUtOTAwXCIgOiBcImJvcmRlci1zbGF0ZS0yMDAgaW5kLXJlYWRvbmx5LWZpZWxkXCJcbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgbWF4TGVuZ3RoPXsyMDB9XG4gICAgICAgICAgICAgIHZhbHVlPXtkZXNjcmlwdGlvbn1cbiAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFpc0VkaXRpbmd9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0RGVzY3JpcHRpb24oZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yXCI+XHJcbiAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb3JtLWxhYmVsIGZvbnQtc2VtaWJvbGRcIj57aW5kVChcIlZpc2l0c19GaWVsZF9Db21tZW50c1wiLCBcIkNvbW1lbnRzXCIpfTwvbGFiZWw+XHJcbiAgICAgICAgICAgIDx0ZXh0YXJlYVxuICAgICAgICAgICAgICBpZD1cImNvbWVudGFyaW9zXCJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICAgICAgICBcImZvcm0tY29udHJvbCBjdXJzb3ItcG9pbnRlclwiLFxuICAgICAgICAgICAgICAgICAgIWlzRWRpdGluZyA/IFwiaW5kLXJlYWRvbmx5LWZpZWxkXCIgOiBcIlwiXG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgdmFsdWU9e2NvbWVudGFyaW9zfVxuICAgICAgICAgICAgICByZWFkT25seVxuICAgICAgICAgICAgICBvblBvaW50ZXJEb3duPXtjb21lbnRhcmlvc1RhcC5vblBvaW50ZXJEb3dufVxyXG4gICAgICAgICAgICAgIG9uUG9pbnRlck1vdmU9e2NvbWVudGFyaW9zVGFwLm9uUG9pbnRlck1vdmV9XHJcbiAgICAgICAgICAgICAgb25Qb2ludGVyVXA9e2NvbWVudGFyaW9zVGFwLm9uUG9pbnRlclVwfVxyXG4gICAgICAgICAgICAgIG9uUG9pbnRlckNhbmNlbD17Y29tZW50YXJpb3NUYXAub25Qb2ludGVyQ2FuY2VsfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMlwiPlxyXG4gICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZm9ybS1sYWJlbCBmb250LXNlbWlib2xkXCI+e2luZFQoXCJWaXNpdHNfRmllbGRfQmFja2dyb3VuZFwiLCBcIkJhY2tncm91bmRcIil9PC9sYWJlbD5cclxuICAgICAgICAgICAgPHRleHRhcmVhXG4gICAgICAgICAgICAgIGlkPVwiYW50ZWNlZGVudGVzXCJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICAgICAgICBcImZvcm0tY29udHJvbCBjdXJzb3ItcG9pbnRlclwiLFxuICAgICAgICAgICAgICAgICAgIWlzRWRpdGluZyA/IFwiaW5kLXJlYWRvbmx5LWZpZWxkXCIgOiBcIlwiXG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgdmFsdWU9e2FudGVjZWRlbnRlc31cbiAgICAgICAgICAgICAgcmVhZE9ubHlcbiAgICAgICAgICAgICAgb25Qb2ludGVyRG93bj17YW50ZWNlZGVudGVzVGFwLm9uUG9pbnRlckRvd259XHJcbiAgICAgICAgICAgICAgb25Qb2ludGVyTW92ZT17YW50ZWNlZGVudGVzVGFwLm9uUG9pbnRlck1vdmV9XHJcbiAgICAgICAgICAgICAgb25Qb2ludGVyVXA9e2FudGVjZWRlbnRlc1RhcC5vblBvaW50ZXJVcH1cclxuICAgICAgICAgICAgICBvblBvaW50ZXJDYW5jZWw9e2FudGVjZWRlbnRlc1RhcC5vblBvaW50ZXJDYW5jZWx9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yXCI+XHJcbiAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb3JtLWxhYmVsIGZvbnQtc2VtaWJvbGRcIj57aW5kVChcIlZpc2l0c19GaWVsZF9Db25jbHVzaW9uc1wiLCBcIkNvbmNsdXNpb25zXCIpfTwvbGFiZWw+XHJcbiAgICAgICAgICAgIDx0ZXh0YXJlYVxuICAgICAgICAgICAgICBpZD1cImNvbmNsdXNpb25lc1wiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAgICAgICAgICAgXCJmb3JtLWNvbnRyb2wgY3Vyc29yLXBvaW50ZXJcIixcbiAgICAgICAgICAgICAgICAgICFpc0VkaXRpbmcgPyBcImluZC1yZWFkb25seS1maWVsZFwiIDogXCJcIlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIHZhbHVlPXtjb25jbHVzaW9uZXN9XG4gICAgICAgICAgICAgIHJlYWRPbmx5XG4gICAgICAgICAgICAgIG9uUG9pbnRlckRvd249e2NvbmNsdXNpb25lc1RhcC5vblBvaW50ZXJEb3dufVxyXG4gICAgICAgICAgICAgIG9uUG9pbnRlck1vdmU9e2NvbmNsdXNpb25lc1RhcC5vblBvaW50ZXJNb3ZlfVxyXG4gICAgICAgICAgICAgIG9uUG9pbnRlclVwPXtjb25jbHVzaW9uZXNUYXAub25Qb2ludGVyVXB9XHJcbiAgICAgICAgICAgICAgb25Qb2ludGVyQ2FuY2VsPXtjb25jbHVzaW9uZXNUYXAub25Qb2ludGVyQ2FuY2VsfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTMgdGV4dC1zbSB0ZXh0LXNsYXRlLTYwMFwiPlxyXG4gICAgICAgICAgPHNwYW4+e3N0YXR1c308L3NwYW4+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbnR5cGUgRXJyb3JCb3VuZGFyeVN0YXRlID0geyBoYXNFcnJvcjogYm9vbGVhbiB9O1xyXG5cclxuY2xhc3MgRXJyb3JCb3VuZGFyeSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxSZWFjdC5Qcm9wc1dpdGhDaGlsZHJlbjx7fT4sIEVycm9yQm91bmRhcnlTdGF0ZT4ge1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzOiBSZWFjdC5Qcm9wc1dpdGhDaGlsZHJlbjx7fT4pIHtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuICAgIHRoaXMuc3RhdGUgPSB7IGhhc0Vycm9yOiBmYWxzZSB9O1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGdldERlcml2ZWRTdGF0ZUZyb21FcnJvcigpIHtcclxuICAgIHJldHVybiB7IGhhc0Vycm9yOiB0cnVlIH07XHJcbiAgfVxyXG5cclxuICBjb21wb25lbnREaWRDYXRjaChlcnJvciwgaW5mbykge1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgaWYgKHRoaXMuc3RhdGUuaGFzRXJyb3IpIHtcclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNCByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItcm9zZS0yMDAgYmctcm9zZS01MCB0ZXh0LXJvc2UtNzAwXCI+XHJcbiAgICAgICAgICB7aW5kVChcIlZpc2l0c19EZXRhaWxfRXJyb3JCb3VuZGFyeVwiLCBcIkFuIGVycm9yIG9jY3VycmVkIHdoaWxlIHJlbmRlcmluZyB0aGUgZGV0YWlsIHBhZ2UuIFJlbG9hZCBhbmQgdHJ5IGFnYWluLlwiKX1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLnByb3BzLmNoaWxkcmVuO1xyXG4gIH1cclxufVxyXG5cclxuLy8gRGV0YWlsIFVJIHdyYXBwZWQgYnkgdGhlIGVycm9yIGJvdW5kYXJ5LlxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBEZXRhaWxGb3JtKCkge1xyXG4gIHJldHVybiAoXHJcbiAgICA8RXJyb3JCb3VuZGFyeT5cclxuICAgICAgPERldGFpbEFwcCAvPlxyXG4gICAgPC9FcnJvckJvdW5kYXJ5PlxyXG4gICk7XHJcbn1cclxuIiwgImV4cG9ydCBjb25zdCBiaW5kUmVhZE9ubHlHdWFyZCA9IChlbDogSFRNTEVsZW1lbnQgfCBudWxsKSA9PiB7XG4gIGlmICghZWwpIHJldHVybiAoKSA9PiB7fTtcbiAgY29uc3QgY2FuY2VsID0gKGV2ZW50OiBFdmVudCkgPT4gZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgY29uc3QgZXZlbnRzID0gW1wiY29udGV4dG1lbnVcIiwgXCJzZWxlY3RzdGFydFwiLCBcImNvcHlcIiwgXCJjdXRcIiwgXCJwYXN0ZVwiXTtcbiAgZXZlbnRzLmZvckVhY2goKGV2dCkgPT4gZWwuYWRkRXZlbnRMaXN0ZW5lcihldnQsIGNhbmNlbCkpO1xuICByZXR1cm4gKCkgPT4ge1xuICAgIGV2ZW50cy5mb3JFYWNoKChldnQpID0+IGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0LCBjYW5jZWwpKTtcbiAgfTtcbn07XG4iLCAiZXhwb3J0IGNvbnN0IGhhc1ZhbHVlID0gKHZhbHVlOiB1bmtub3duKSA9PiBTdHJpbmcodmFsdWUgfHwgXCJcIikudHJpbSgpLmxlbmd0aCA+IDA7XG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgZmV0Y2hKc29uIH0gZnJvbSBcIi4uL3NlcnZpY2VzL2FwaVNlcnZpY2UudHNcIjtcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuXG50eXBlIFVzZURldGFpbEh5ZHJhdGlvbkFyZ3MgPSB7XG4gIGFjdGl2aWRhZElkOiBzdHJpbmc7XG4gIHNob3VsZEh5ZHJhdGU6IGJvb2xlYW47XG4gIHZpc2l0VHlwZXM6IGFueVtdO1xuICBhc2lzdGVudGVUaXBvczogYW55W107XG4gIGRlZmF1bHRWaXNpdFR5cGU6IHN0cmluZztcbiAgaW5pdGlhbEFzaXN0ZW50ZTogc3RyaW5nO1xuICBub3JtYWxpemVEYXRlVG9JbnB1dDogKHZhbHVlOiBzdHJpbmcpID0+IHN0cmluZztcbiAgbWF0Y2hPcHRpb25WYWx1ZTogKG9wdGlvbnM6IGFueVtdLCByYXc6IHVua25vd24pID0+IHN0cmluZztcbiAgYXBwbHlEcmFmdFZhbHVlczogKCkgPT4gdm9pZDtcbiAgYXBwbHlUZXh0RWRpdG9yVmFsdWVzOiAoKSA9PiB2b2lkO1xuICBzZXRTdGF0dXM6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBzZXRJc0h5ZHJhdGluZzogKHZhbHVlOiBib29sZWFuKSA9PiB2b2lkO1xuICBzZXRUcmFuc0RhdGU6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBzZXRWaXNpdFR5cGU6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBzZXRBc2lzdGVudGVUaXBvOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgc2V0RGVzY3JpcHRpb246ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBzZXRDb21lbnRhcmlvczogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHNldEFudGVjZWRlbnRlczogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHNldENvbmNsdXNpb25lczogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG59O1xuXG4vLyBLZWVwcyBkZXRhaWwgaHlkcmF0aW9uIG9yY2hlc3RyYXRpb24gb3V0c2lkZSB0aGUgcGFnZSBjb21wb25lbnQuXG5leHBvcnQgY29uc3QgdXNlRGV0YWlsSHlkcmF0aW9uID0gKHtcbiAgYWN0aXZpZGFkSWQsXG4gIHNob3VsZEh5ZHJhdGUsXG4gIHZpc2l0VHlwZXMsXG4gIGFzaXN0ZW50ZVRpcG9zLFxuICBkZWZhdWx0VmlzaXRUeXBlLFxuICBpbml0aWFsQXNpc3RlbnRlLFxuICBub3JtYWxpemVEYXRlVG9JbnB1dCxcbiAgbWF0Y2hPcHRpb25WYWx1ZSxcbiAgYXBwbHlEcmFmdFZhbHVlcyxcbiAgYXBwbHlUZXh0RWRpdG9yVmFsdWVzLFxuICBzZXRTdGF0dXMsXG4gIHNldElzSHlkcmF0aW5nLFxuICBzZXRUcmFuc0RhdGUsXG4gIHNldFZpc2l0VHlwZSxcbiAgc2V0QXNpc3RlbnRlVGlwbyxcbiAgc2V0RGVzY3JpcHRpb24sXG4gIHNldENvbWVudGFyaW9zLFxuICBzZXRBbnRlY2VkZW50ZXMsXG4gIHNldENvbmNsdXNpb25lcyxcbn06IFVzZURldGFpbEh5ZHJhdGlvbkFyZ3MpID0+IHtcbiAgY29uc3QgaHlkcmF0ZUZyb21BcGkgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XG4gICAgaWYgKCFhY3RpdmlkYWRJZCkgcmV0dXJuO1xuICAgIHNldElzSHlkcmF0aW5nKHRydWUpO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaEpzb24oYC9WaXNpdGFzL0dldEFjdGl2aXR5QnlDb2RlP2NvZGU9JHtlbmNvZGVVUklDb21wb25lbnQoYWN0aXZpZGFkSWQpfWApO1xuICAgICAgaWYgKCFyZXM/LnN1Y2Nlc3MgfHwgIXJlcy5kYXRhKSB7XG4gICAgICAgIHNldFN0YXR1cyhyZXM/Lm1lc3NhZ2UgfHwgaW5kVChcIlZpc2l0c19EZXRhaWxfTG9hZEFjdGl2aXR5RmFpbGVkXCIsIFwiRmFpbGVkIHRvIGxvYWQgYWN0aXZpdHkgZGV0YWlscy5cIikpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBkYXRhID0gcmVzLmRhdGE7XG4gICAgICBjb25zdCByYXdEYXRlID0gU3RyaW5nKGRhdGEudHJhbnNEYXRlID8/IGRhdGEuVHJhbnNEYXRlID8/IFwiXCIpO1xuICAgICAgc2V0VHJhbnNEYXRlKG5vcm1hbGl6ZURhdGVUb0lucHV0KHJhd0RhdGUpKTtcblxuICAgICAgY29uc3QgcmF3VmlzaXRUeXBlID0gU3RyaW5nKGRhdGEudGlwb1Zpc2l0YSA/PyBkYXRhLlRpcG9WaXNpdGEgPz8gZGF0YS52aXNpdFR5cGUgPz8gZGF0YS5WaXNpdFR5cGUgPz8gXCJcIik7XG4gICAgICBzZXRWaXNpdFR5cGUobWF0Y2hPcHRpb25WYWx1ZSh2aXNpdFR5cGVzLCByYXdWaXNpdFR5cGUpIHx8IGRlZmF1bHRWaXNpdFR5cGUpO1xuXG4gICAgICBjb25zdCBhc2lzdGVudGVzTGlzdCA9IGRhdGEuYXNpc3RlbnRlcyA/PyBkYXRhLkFzaXN0ZW50ZXM7XG4gICAgICBjb25zdCBmaXJzdEFzaXN0ZW50ZSA9IEFycmF5LmlzQXJyYXkoYXNpc3RlbnRlc0xpc3QpICYmIGFzaXN0ZW50ZXNMaXN0Lmxlbmd0aCA/IGFzaXN0ZW50ZXNMaXN0WzBdIDogbnVsbDtcbiAgICAgIGNvbnN0IHJhd0FzaXN0ZW50ZVRpcG8gPSBTdHJpbmcoXG4gICAgICAgIGRhdGEuYXNpc3RlbnRlVGlwbyA/PyBkYXRhLkFzaXN0ZW50ZVRpcG8gPz8gZmlyc3RBc2lzdGVudGU/LmFzaXN0ZW50ZVRpcG8gPz8gZmlyc3RBc2lzdGVudGU/LkFzaXN0ZW50ZVRpcG8gPz8gXCJcIlxuICAgICAgKTtcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRBc2lzdGVudGVUaXBvID0gbWF0Y2hPcHRpb25WYWx1ZShhc2lzdGVudGVUaXBvcywgcmF3QXNpc3RlbnRlVGlwbyk7XG4gICAgICBzZXRBc2lzdGVudGVUaXBvKG5vcm1hbGl6ZWRBc2lzdGVudGVUaXBvIHx8IGluaXRpYWxBc2lzdGVudGUpO1xuICAgICAgc2V0RGVzY3JpcHRpb24oU3RyaW5nKGRhdGEuZGVzY3JpcHRpb24gPz8gZGF0YS5EZXNjcmlwdGlvbiA/PyBcIlwiKSk7XG4gICAgICBzZXRDb21lbnRhcmlvcyhTdHJpbmcoZGF0YS5jb21lbnRhcmlvcyA/PyBkYXRhLkNvbWVudGFyaW9zID8/IFwiXCIpKTtcbiAgICAgIHNldEFudGVjZWRlbnRlcyhTdHJpbmcoZGF0YS5hbnRlY2VkZW50ZXMgPz8gZGF0YS5BbnRlY2VkZW50ZXMgPz8gXCJcIikpO1xuICAgICAgc2V0Q29uY2x1c2lvbmVzKFN0cmluZyhkYXRhLmNvbmNsdXNpb25lcyA/PyBkYXRhLkNvbmNsdXNpb25lcyA/PyBcIlwiKSk7XG4gICAgfSBjYXRjaCB7XG4gICAgICAvLyBLZWVwIHByZXZpb3VzIFVJIGJlaGF2aW9yIG9uIGh5ZHJhdGlvbiBlcnJvcnMuXG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldElzSHlkcmF0aW5nKGZhbHNlKTtcbiAgICAgIGFwcGx5RHJhZnRWYWx1ZXMoKTtcbiAgICAgIGFwcGx5VGV4dEVkaXRvclZhbHVlcygpO1xuICAgIH1cbiAgfSwgW1xuICAgIGFjdGl2aWRhZElkLFxuICAgIGFwcGx5RHJhZnRWYWx1ZXMsXG4gICAgYXBwbHlUZXh0RWRpdG9yVmFsdWVzLFxuICAgIGFzaXN0ZW50ZVRpcG9zLFxuICAgIGRlZmF1bHRWaXNpdFR5cGUsXG4gICAgaW5pdGlhbEFzaXN0ZW50ZSxcbiAgICBtYXRjaE9wdGlvblZhbHVlLFxuICAgIG5vcm1hbGl6ZURhdGVUb0lucHV0LFxuICAgIHNldEFudGVjZWRlbnRlcyxcbiAgICBzZXRBc2lzdGVudGVUaXBvLFxuICAgIHNldENvbWVudGFyaW9zLFxuICAgIHNldENvbmNsdXNpb25lcyxcbiAgICBzZXREZXNjcmlwdGlvbixcbiAgICBzZXRJc0h5ZHJhdGluZyxcbiAgICBzZXRTdGF0dXMsXG4gICAgc2V0VHJhbnNEYXRlLFxuICAgIHNldFZpc2l0VHlwZSxcbiAgICB2aXNpdFR5cGVzLFxuICBdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChzaG91bGRIeWRyYXRlKSB7XG4gICAgICBoeWRyYXRlRnJvbUFwaSgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBhcHBseURyYWZ0VmFsdWVzKCk7XG4gICAgYXBwbHlUZXh0RWRpdG9yVmFsdWVzKCk7XG4gIH0sIFthcHBseURyYWZ0VmFsdWVzLCBhcHBseVRleHRFZGl0b3JWYWx1ZXMsIGh5ZHJhdGVGcm9tQXBpLCBzaG91bGRIeWRyYXRlXSk7XG59O1xuIiwgImltcG9ydCB7IHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgd2FpdCB9IGZyb20gXCIuLi91dGlscy93YWl0LnRzXCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB7IHNob3dQZXJtaXNzaW9uTW9kYWwgfSBmcm9tIFwiLi4vdXRpbHMvcGVybWlzc2lvbnMudHNcIjtcbmltcG9ydCB7IHNldEhpc3RvcnlGaWx0ZXJGb3JEYXRlLCBmbGFzaEFjdGlvbk1hcmsgfSBmcm9tIFwiLi4vdXRpbHMvdmlzaXRhc0hpc3RvcnkudHNcIjtcblxudHlwZSBVc2VEZXRhaWxUb3BiYXJBY3Rpb25zQXJncyA9IHtcbiAgYnVzeTogYm9vbGVhbjtcbiAgbW9kYWxPcGVuOiBib29sZWFuO1xuICBpc0VkaXRpbmc6IGJvb2xlYW47XG4gIGNhbkVkaXRIaXN0b3J5OiBib29sZWFuO1xuICBjYW5EZWxldGVIaXN0b3J5OiBib29sZWFuO1xuICB0cmFuc0RhdGU6IHN0cmluZztcbiAgc2V0TW9kYWxFcnJvcjogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIGhhbmRsZUVuYWJsZUVkaXQ6ICgpID0+IHZvaWQ7XG4gIGhhbmRsZUNhbmNlbEVkaXQ6ICgpID0+IHZvaWQ7XG4gIGhhbmRsZVVwZGF0ZTogKCkgPT4gUHJvbWlzZTxib29sZWFuPjtcbiAgaGFuZGxlRGVsZXRlOiAoKSA9PiBQcm9taXNlPGJvb2xlYW4+O1xuICBvcGVuQ29uZmlybTogKG9wdHM6IHtcbiAgICB0aXRsZTogc3RyaW5nO1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICBjb25maXJtVGV4dD86IHN0cmluZztcbiAgICBvbkNvbmZpcm0/OiAoKSA9PiBQcm9taXNlPGJvb2xlYW4gfCB2b2lkPiB8IGJvb2xlYW4gfCB2b2lkO1xuICB9KSA9PiB2b2lkO1xuICBjbG9zZUNvbmZpcm06ICgpID0+IHZvaWQ7XG59O1xuXG4vLyBDb29yZGluYXRlcyB0b3BiYXIgaWNvbiB2aXNpYmlsaXR5IGFuZCBhY3Rpb24gZXZlbnRzIGZvciBkZXRhaWwgcGFnZS5cbmV4cG9ydCBjb25zdCB1c2VEZXRhaWxUb3BiYXJBY3Rpb25zID0gKHtcbiAgYnVzeSxcbiAgbW9kYWxPcGVuLFxuICBpc0VkaXRpbmcsXG4gIGNhbkVkaXRIaXN0b3J5LFxuICBjYW5EZWxldGVIaXN0b3J5LFxuICB0cmFuc0RhdGUsXG4gIHNldE1vZGFsRXJyb3IsXG4gIGhhbmRsZUVuYWJsZUVkaXQsXG4gIGhhbmRsZUNhbmNlbEVkaXQsXG4gIGhhbmRsZVVwZGF0ZSxcbiAgaGFuZGxlRGVsZXRlLFxuICBvcGVuQ29uZmlybSxcbiAgY2xvc2VDb25maXJtLFxufTogVXNlRGV0YWlsVG9wYmFyQWN0aW9uc0FyZ3MpID0+IHtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBlZGl0SWNvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlzaXRFZGl0SWNvblwiKTtcbiAgICBjb25zdCBzYXZlSWNvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlzaXRTYXZlSWNvblwiKTtcbiAgICBjb25zdCBkZWxldGVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpc2l0RGVsZXRlQnRuXCIpO1xuICAgIGNvbnN0IGNhbmNlbEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlzaXRDYW5jZWxCdG5cIik7XG4gICAgaWYgKCFlZGl0SWNvbiB8fCAhc2F2ZUljb24pIHJldHVybjtcbiAgICBpZiAoaXNFZGl0aW5nKSB7XG4gICAgICBlZGl0SWNvbi5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgc2F2ZUljb24uY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICAgIGlmIChkZWxldGVCdG4pIGRlbGV0ZUJ0bi5jbGFzc0xpc3QuYWRkKFwidG9wYmFyLWhpZGRlblwiKTtcbiAgICAgIGlmIChjYW5jZWxCdG4pIGNhbmNlbEJ0bi5jbGFzc0xpc3QucmVtb3ZlKFwidG9wYmFyLWhpZGRlblwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWRpdEljb24uY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICAgIHNhdmVJY29uLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICBpZiAoZGVsZXRlQnRuKSBkZWxldGVCdG4uY2xhc3NMaXN0LnJlbW92ZShcInRvcGJhci1oaWRkZW5cIik7XG4gICAgICBpZiAoY2FuY2VsQnRuKSBjYW5jZWxCdG4uY2xhc3NMaXN0LmFkZChcInRvcGJhci1oaWRkZW5cIik7XG4gICAgfVxuICB9LCBbaXNFZGl0aW5nXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBvbkVkaXQgPSAoKSA9PiB7XG4gICAgICBpZiAoIWNhbkVkaXRIaXN0b3J5KSB7XG4gICAgICAgIHNob3dQZXJtaXNzaW9uTW9kYWwoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKGlzRWRpdGluZykge1xuICAgICAgICBpZiAoYnVzeSB8fCBtb2RhbE9wZW4pIHJldHVybjtcbiAgICAgICAgc2V0TW9kYWxFcnJvcihcIlwiKTtcbiAgICAgICAgb3BlbkNvbmZpcm0oe1xuICAgICAgICAgIHRpdGxlOiBpbmRUKFwiVmlzaXRzX0RldGFpbF9TYXZlQ2hhbmdlc19UaXRsZVwiLCBcIlNhdmUgY2hhbmdlc1wiKSxcbiAgICAgICAgICBtZXNzYWdlOiBpbmRUKFwiVmlzaXRzX0RldGFpbF9TYXZlQ2hhbmdlc19Cb2R5XCIsIFwiRG8geW91IHdhbnQgdG8gc2F2ZSBjaGFuZ2VzP1wiKSxcbiAgICAgICAgICBjb25maXJtVGV4dDogaW5kVChcIkNvbW1vbl9TYXZlXCIsIFwiU2F2ZVwiKSxcbiAgICAgICAgICBvbkNvbmZpcm06IGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG9rID0gYXdhaXQgaGFuZGxlVXBkYXRlKCk7XG4gICAgICAgICAgICBpZiAob2spIHtcbiAgICAgICAgICAgICAgY2xvc2VDb25maXJtKCk7XG4gICAgICAgICAgICAgIHNldEhpc3RvcnlGaWx0ZXJGb3JEYXRlKHRyYW5zRGF0ZSk7XG4gICAgICAgICAgICAgIGF3YWl0IHdhaXQoMjAwKTtcbiAgICAgICAgICAgICAgZmxhc2hBY3Rpb25NYXJrKFwib2tQcm9jZXNzXCIsIDEyMDApO1xuICAgICAgICAgICAgICBhd2FpdCB3YWl0KDEyMDApO1xuICAgICAgICAgICAgICB3aW5kb3cuX19pbmRCeXBhc3NOYXZpZ2F0aW9uR3VhcmRPbmNlPy4oKTtcbiAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9IaXN0b3JpYWwvSGlzdG9yeVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG9rO1xuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaGFuZGxlRW5hYmxlRWRpdCgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBvbkRlbGV0ZSA9ICgpID0+IHtcbiAgICAgIGlmICghY2FuRGVsZXRlSGlzdG9yeSkge1xuICAgICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChidXN5IHx8IG1vZGFsT3BlbikgcmV0dXJuO1xuICAgICAgc2V0TW9kYWxFcnJvcihcIlwiKTtcbiAgICAgIG9wZW5Db25maXJtKHtcbiAgICAgICAgdGl0bGU6IGluZFQoXCJWaXNpdHNfRGV0YWlsX0RlbGV0ZUFjdGl2aXR5X1RpdGxlXCIsIFwiRGVsZXRlIGFjdGl2aXR5XCIpLFxuICAgICAgICBtZXNzYWdlOiBpbmRUKFwiVmlzaXRzX0RldGFpbF9EZWxldGVBY3Rpdml0eV9Cb2R5XCIsIFwiRG8geW91IHdhbnQgdG8gZGVsZXRlIHRoaXMgYWN0aXZpdHk/XCIpLFxuICAgICAgICBjb25maXJtVGV4dDogaW5kVChcIkNvbW1vbl9EZWxldGVcIiwgXCJEZWxldGVcIiksXG4gICAgICAgIG9uQ29uZmlybTogYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IG9rID0gYXdhaXQgaGFuZGxlRGVsZXRlKCk7XG4gICAgICAgICAgaWYgKG9rKSB7XG4gICAgICAgICAgICBjbG9zZUNvbmZpcm0oKTtcbiAgICAgICAgICAgIHNldEhpc3RvcnlGaWx0ZXJGb3JEYXRlKHRyYW5zRGF0ZSk7XG4gICAgICAgICAgICBhd2FpdCB3YWl0KDIwMCk7XG4gICAgICAgICAgICBmbGFzaEFjdGlvbk1hcmsoXCJva0RlbFByb2Nlc3NcIiwgMTIwMCk7XG4gICAgICAgICAgICBhd2FpdCB3YWl0KDEyMDApO1xuICAgICAgICAgICAgd2luZG93Ll9faW5kQnlwYXNzTmF2aWdhdGlvbkd1YXJkT25jZT8uKCk7XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL0hpc3RvcmlhbC9IaXN0b3J5XCI7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBvaztcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBjb25zdCBvbkNhbmNlbEVkaXQgPSAoKSA9PiB7XG4gICAgICBpZiAoYnVzeSB8fCBtb2RhbE9wZW4pIHJldHVybjtcbiAgICAgIGhhbmRsZUNhbmNlbEVkaXQoKTtcbiAgICB9O1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJ2aXNpdC1lZGl0XCIsIG9uRWRpdCk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJ2aXNpdC1kZWxldGVcIiwgb25EZWxldGUpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwidmlzaXQtY2FuY2VsLWVkaXRcIiwgb25DYW5jZWxFZGl0KTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ2aXNpdC1lZGl0XCIsIG9uRWRpdCk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInZpc2l0LWRlbGV0ZVwiLCBvbkRlbGV0ZSk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInZpc2l0LWNhbmNlbC1lZGl0XCIsIG9uQ2FuY2VsRWRpdCk7XG4gICAgfTtcbiAgfSwgW1xuICAgIGJ1c3ksXG4gICAgY2FuRGVsZXRlSGlzdG9yeSxcbiAgICBjYW5FZGl0SGlzdG9yeSxcbiAgICBjbG9zZUNvbmZpcm0sXG4gICAgaGFuZGxlQ2FuY2VsRWRpdCxcbiAgICBoYW5kbGVEZWxldGUsXG4gICAgaGFuZGxlRW5hYmxlRWRpdCxcbiAgICBoYW5kbGVVcGRhdGUsXG4gICAgaXNFZGl0aW5nLFxuICAgIG1vZGFsT3BlbixcbiAgICBvcGVuQ29uZmlybSxcbiAgICBzZXRNb2RhbEVycm9yLFxuICAgIHRyYW5zRGF0ZSxcbiAgXSk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esb0JBQTJCOzs7QUNEM0IsSUFBQUEsZ0JBQXlFOzs7QUNBbEUsSUFBTSxvQkFBb0IsQ0FBQyxPQUEyQjtBQUMzRCxNQUFJLENBQUMsR0FBSSxRQUFPLE1BQU07QUFBQSxFQUFDO0FBQ3ZCLFFBQU0sU0FBUyxDQUFDLFVBQWlCLE1BQU0sZUFBZTtBQUN0RCxRQUFNLFNBQVMsQ0FBQyxlQUFlLGVBQWUsUUFBUSxPQUFPLE9BQU87QUFDcEUsU0FBTyxRQUFRLENBQUMsUUFBUSxHQUFHLGlCQUFpQixLQUFLLE1BQU0sQ0FBQztBQUN4RCxTQUFPLE1BQU07QUFDWCxXQUFPLFFBQVEsQ0FBQyxRQUFRLEdBQUcsb0JBQW9CLEtBQUssTUFBTSxDQUFDO0FBQUEsRUFDN0Q7QUFDRjs7O0FDUk8sSUFBTSxXQUFXLENBQUMsVUFBbUIsT0FBTyxTQUFTLEVBQUUsRUFBRSxLQUFLLEVBQUUsU0FBUzs7O0FDQWhGLG1CQUF1QztBQTJCaEMsSUFBTSxxQkFBcUIsQ0FBQztBQUFBLEVBQ2pDO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0YsTUFB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QUFBQSxrQkFDQyxJQUFHO0FBQUEsa0JBQ0QsV0FBVztBQUFBLG9CQUNUO0FBQUEsb0JBQ0EsQ0FBQyxZQUFZLHVCQUF1QjtBQUFBLGtCQUN0QztBQUFBLGtCQUNGLE9BQU87QUFBQSxrQkFDUCxVQUFRO0FBQUEsa0JBQ1IsZUFBZSxnQkFBZ0I7QUFBQSxrQkFDL0IsZUFBZSxnQkFBZ0I7QUFBQSxrQkFDL0IsYUFBYSxnQkFBZ0I7QUFBQSxrQkFDN0IsaUJBQWlCLGdCQUFnQjtBQUFBO0FBQUEsY0FDbkM7QUFBQSxlQUNGO0FBQUEsYUFDRjtBQUFBLFVBRUEsNENBQUMsU0FBSSxXQUFVLGtEQUNiLHNEQUFDLFVBQU0sa0JBQU8sR0FDaEI7QUFBQTtBQUFBO0FBQUEsSUFDRjtBQUFBLEtBQ0Y7QUFFSjtBQUlBLElBQU0sZ0JBQU4sY0FBNEIsY0FBQUMsUUFBTSxVQUEyRDtBQUFBLEVBQzNGLFlBQVksT0FBb0M7QUFDOUMsVUFBTSxLQUFLO0FBQ1gsU0FBSyxRQUFRLEVBQUUsVUFBVSxNQUFNO0FBQUEsRUFDakM7QUFBQSxFQUVBLE9BQU8sMkJBQTJCO0FBQ2hDLFdBQU8sRUFBRSxVQUFVLEtBQUs7QUFBQSxFQUMxQjtBQUFBLEVBRUEsa0JBQWtCLE9BQU8sTUFBTTtBQUFBLEVBQy9CO0FBQUEsRUFFQSxTQUFTO0FBQ1AsUUFBSSxLQUFLLE1BQU0sVUFBVTtBQUN2QixhQUNFLDRDQUFDLFNBQUksV0FBVSxrRUFDWixlQUFLLCtCQUErQiwwRUFBMEUsR0FDakg7QUFBQSxJQUVKO0FBQ0EsV0FBTyxLQUFLLE1BQU07QUFBQSxFQUNwQjtBQUNGO0FBR2UsU0FBUixhQUE4QjtBQUNuQyxTQUNFLDRDQUFDLGlCQUNDLHNEQUFDLGFBQVUsR0FDYjtBQUVKOzs7QURodkJRLElBQUFDLHNCQUFBO0FBSlIsSUFBTSxhQUFhLE1BQU07QUFDdkIsU0FDRSw2Q0FBQyxnQkFDQyx1REFBQyxnQkFDQyx1REFBQyxjQUFXLEdBQ2QsR0FDRjtBQUVKO0FBRUEsSUFBTSxRQUFRLE1BQU07QUFDbEIsUUFBTSxTQUFTLFNBQVMsZUFBZSxvQkFBb0I7QUFDM0QsTUFBSSxDQUFDLE9BQVE7QUFFYixRQUFNLFVBQVUsNkNBQUMsY0FBVztBQUU1QixNQUFJLE9BQU8sV0FBVztBQUNwQixXQUFPLFVBQVUsT0FBTyxPQUFPO0FBQy9CO0FBQUEsRUFDRjtBQUVBLFFBQU0sV0FBTywwQkFBVyxNQUFNO0FBQzlCLFNBQU8sWUFBWTtBQUNuQixPQUFLLE9BQU8sT0FBTztBQUNyQjtBQUVBLElBQUksU0FBUyxlQUFlLGNBQWMsU0FBUyxlQUFlLGVBQWU7QUFDL0UsUUFBTTtBQUNSLE9BQU87QUFDTCxXQUFTLGlCQUFpQixvQkFBb0IsS0FBSztBQUNyRDtBQUVBLElBQU8scUJBQVE7IiwKICAibmFtZXMiOiBbImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiUmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIl0KfQo=
