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
} from "./chunks/chunk-T34EGLY4.js";
import {
  Spinner_default,
  canAccess,
  classNames,
  fetchJson,
  flashActionMark,
  indT,
  setHistoryFilterForDate,
  showPermissionModal
} from "./chunks/chunk-ISVBGEOF.js";
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
var import_react = __toESM(require_react());

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
  const normalizeDateToInput = (0, import_react.useCallback)((value) => {
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
  const matchOptionValue = (0, import_react.useCallback)((options, raw) => {
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
  const [transDate, setTransDate] = (0, import_react.useState)(initialTransDate);
  const [visitType, setVisitType] = (0, import_react.useState)(initialVisitType);
  const [asistenteTipo, setAsistenteTipo] = (0, import_react.useState)(initialAsistente);
  const [description, setDescription] = (0, import_react.useState)(String(detail.description ?? detail.Description ?? ""));
  const [comentarios, setComentarios] = (0, import_react.useState)(String(detail.comentarios ?? detail.Comentarios ?? ""));
  const [antecedentes, setAntecedentes] = (0, import_react.useState)(String(detail.antecedentes ?? detail.Antecedentes ?? ""));
  const [conclusiones, setConclusiones] = (0, import_react.useState)(String(detail.conclusiones ?? detail.Conclusiones ?? ""));
  const [status, setStatus] = (0, import_react.useState)("");
  const [busy, setBusy] = (0, import_react.useState)(false);
  const [isEditing, setIsEditing] = (0, import_react.useState)(false);
  const [isHydrating, setIsHydrating] = (0, import_react.useState)(false);
  const [modalError, setModalError] = (0, import_react.useState)("");
  const readOnlySurfaceRef = (0, import_react.useRef)(null);
  const editModeKeyRef = (0, import_react.useRef)("");
  const draftKeyRef = (0, import_react.useRef)("");
  const draftPersistTimerRef = (0, import_react.useRef)(null);
  const editSnapshotRef = (0, import_react.useRef)(null);
  const recId = String(detail.recId ?? detail.RecId ?? "");
  const accountNum = String(detail.accountNum ?? detail.AccountNum ?? "");
  const actividadId = String(detail.actividadId ?? detail.ActividadId ?? "");
  const syncEditModeFlag = (0, import_react.useCallback)((enabled) => {
    const key = editModeKeyRef.current;
    if (!key) return;
    try {
      if (enabled) sessionStorage.setItem(key, "true");
      else sessionStorage.removeItem(key);
    } catch {
    }
  }, []);
  const syncEditModeOnEntry = (0, import_react.useCallback)(() => {
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
  (0, import_react.useEffect)(() => {
    syncEditModeOnEntry();
  }, [syncEditModeOnEntry]);
  (0, import_react.useEffect)(() => {
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
  (0, import_react.useEffect)(() => {
    const key = `ind_visit_draft_${actividadId || recId || "default"}`;
    draftKeyRef.current = key;
  }, [actividadId, recId]);
  const saveDraft = (0, import_react.useCallback)((draft) => {
    const key = draftKeyRef.current;
    if (!key) return;
    try {
      sessionStorage.setItem(key, JSON.stringify(draft));
    } catch {
    }
  }, []);
  const clearDraft = (0, import_react.useCallback)(() => {
    const key = draftKeyRef.current;
    if (!key) return;
    try {
      sessionStorage.removeItem(key);
    } catch {
    }
  }, []);
  const applyDraftValues = (0, import_react.useCallback)(() => {
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
  (0, import_react.useEffect)(() => {
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
  const openTextEditor = (0, import_react.useCallback)(
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
      window.location.href = url;
    },
    []
  );
  const handleComentariosTap = (0, import_react.useCallback)((event) => {
    event.preventDefault();
    openTextEditor(fieldIdComentarios, indT("Visits_Field_Comments", "Comments"), comentarios, {
      readOnly: !isEditing,
      allowEdit: canEditHistory,
      editModeKey: editModeKeyRef.current
    });
  }, [comentarios, isEditing, canEditHistory, openTextEditor]);
  const handleComentariosHold = (0, import_react.useCallback)((target, clientY) => {
    if (!target || !isOverflowing(target)) return false;
    setPreviewAnchor(target);
    return showPreviewTooltip(String(comentarios || ""), clientY);
  }, [comentarios]);
  const handleAntecedentesTap = (0, import_react.useCallback)((event) => {
    event.preventDefault();
    openTextEditor(fieldIdAntecedentes, indT("Visits_Field_Background", "Background"), antecedentes, {
      readOnly: !isEditing,
      allowEdit: canEditHistory,
      editModeKey: editModeKeyRef.current
    });
  }, [antecedentes, isEditing, canEditHistory, openTextEditor]);
  const handleAntecedentesHold = (0, import_react.useCallback)((target, clientY) => {
    if (!target || !isOverflowing(target)) return false;
    setPreviewAnchor(target);
    return showPreviewTooltip(String(antecedentes || ""), clientY);
  }, [antecedentes]);
  const handleConclusionesTap = (0, import_react.useCallback)((event) => {
    event.preventDefault();
    openTextEditor(fieldIdConclusiones, indT("Visits_Field_Conclusions", "Conclusions"), conclusiones, {
      readOnly: !isEditing,
      allowEdit: canEditHistory,
      editModeKey: editModeKeyRef.current
    });
  }, [conclusiones, isEditing, canEditHistory, openTextEditor]);
  const handleConclusionesHold = (0, import_react.useCallback)((target, clientY) => {
    if (!target || !isOverflowing(target)) return false;
    setPreviewAnchor(target);
    return showPreviewTooltip(String(conclusiones || ""), clientY);
  }, [conclusiones]);
  const comentariosTap = useTapGuard(handleComentariosTap, handleComentariosHold);
  const antecedentesTap = useTapGuard(handleAntecedentesTap, handleAntecedentesHold);
  const conclusionesTap = useTapGuard(handleConclusionesTap, handleConclusionesHold);
  const applyTextEditorValues = (0, import_react.useCallback)(() => {
    const valComentarios = readAndClearTextEditorValue(fieldIdComentarios);
    if (valComentarios !== null) setComentarios(valComentarios);
    const valAntecedentes = readAndClearTextEditorValue(fieldIdAntecedentes);
    if (valAntecedentes !== null) setAntecedentes(valAntecedentes);
    const valConclusiones = readAndClearTextEditorValue(fieldIdConclusiones);
    if (valConclusiones !== null) setConclusiones(valConclusiones);
  }, [fieldIdComentarios, fieldIdAntecedentes, fieldIdConclusiones]);
  (0, import_react.useEffect)(() => {
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
  const handleModalConfirm = (0, import_react.useCallback)(async () => {
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
  const handleModalButtonConfirm = (0, import_react.useCallback)(() => {
    if (!busy && modalError) {
      closeConfirm();
      return;
    }
    handleModalConfirm();
  }, [busy, modalError, closeConfirm, handleModalConfirm]);
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
      const rawVisitType = String(
        data.tipoVisita ?? data.TipoVisita ?? data.visitType ?? data.VisitType ?? ""
      );
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
    asistenteTipos,
    visitTypes,
    matchOptionValue,
    normalizeDateToInput,
    initialAsistente,
    defaultVisitType,
    applyTextEditorValues,
    applyDraftValues
  ]);
  (0, import_react.useEffect)(() => {
    if (shouldHydrate) {
      hydrateFromApi();
    } else {
      applyDraftValues();
      applyTextEditorValues();
    }
  }, [detail, hydrateFromApi, shouldHydrate, applyTextEditorValues, applyDraftValues]);
  (0, import_react.useEffect)(() => {
    const el = readOnlySurfaceRef.current;
    if (!el) return;
    if (!isEditing) {
      el.classList.add("ind-readonly-surface");
    } else {
      el.classList.remove("ind-readonly-surface");
    }
  }, [isEditing]);
  (0, import_react.useEffect)(() => {
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
  (0, import_react.useEffect)(() => {
    if (isEditing) return void 0;
    return bindReadOnlyGuard(readOnlySurfaceRef.current);
  }, [isEditing]);
  (0, import_react.useEffect)(() => {
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
  const handleEnableEdit = (0, import_react.useCallback)(() => {
    if (!canEditHistory) {
      showPermissionModal();
      return;
    }
    setIsEditing(true);
    syncEditModeFlag(true);
    setStatus(indT("Visits_Detail_EditingEnabled", "Editing enabled"));
  }, [syncEditModeFlag]);
  const handleCancelEdit = (0, import_react.useCallback)(() => {
    if (!isEditing) return;
    setIsEditing(false);
    syncEditModeFlag(false);
    clearDraft();
    setStatus(indT("Common_Cancel", "Cancel"));
    window.location.reload();
  }, [isEditing, syncEditModeFlag, clearDraft]);
  const handleUpdate = (0, import_react.useCallback)(async () => {
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
  const handleDelete = (0, import_react.useCallback)(async () => {
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
  (0, import_react.useEffect)(() => {
    const onEdit = () => {
      if (!canEditHistory) {
        showPermissionModal();
        return;
      }
      if (isEditing) {
        if (busy || modal.open) return;
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
      if (busy || modal.open) return;
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
            window.location.href = "/Historial/History";
          }
          return ok;
        }
      });
    };
    const onCancelEdit = () => {
      if (busy || modal.open) return;
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
  }, [busy, modal.open, handleCancelEdit, handleDelete, handleEnableEdit, handleUpdate, isEditing, openConfirm, transDate]);
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
var ErrorBoundary = class extends import_react.default.Component {
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvZGV0YWlsL0RldGFpbFBhZ2UudHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy92aXNpdGFzL2RldGFpbC9EZXRhaWxGb3JtLnRzeCIsICIuLi9yZWFjdC9zcmMvdXRpbHMvZG9tR3VhcmRzLnRzIiwgIi4uL3JlYWN0L3NyYy91dGlscy9zdHJpbmdzLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBjcmVhdGVSb290IH0gZnJvbSBcInJlYWN0LWRvbS9jbGllbnRcIjtcbmltcG9ydCBEZXRhaWxGb3JtIGZyb20gXCIuL0RldGFpbEZvcm0udHN4XCI7XG5pbXBvcnQgeyBJMThuUHJvdmlkZXIgfSBmcm9tIFwiLi4vLi4vLi4vY29udGV4dC9JMThuQ29udGV4dC50c3hcIjtcbmltcG9ydCB7IEF1dGhQcm92aWRlciB9IGZyb20gXCIuLi8uLi8uLi9jb250ZXh0L0F1dGhDb250ZXh0LnRzeFwiO1xuXG50eXBlIEluZFJvb3RFbGVtZW50ID0gSFRNTEVsZW1lbnQgJiB7IF9faW5kUm9vdD86IGltcG9ydChcInJlYWN0LWRvbS9jbGllbnRcIikuUm9vdCB9O1xuXG4vLyBQYWdlIGVudHJ5IGZvciB0aGUgdmlzaXRhcyBkZXRhaWwgaXNsYW5kLlxuY29uc3QgRGV0YWlsUGFnZSA9ICgpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8STE4blByb3ZpZGVyPlxuICAgICAgPEF1dGhQcm92aWRlcj5cbiAgICAgICAgPERldGFpbEZvcm0gLz5cbiAgICAgIDwvQXV0aFByb3ZpZGVyPlxuICAgIDwvSTE4blByb3ZpZGVyPlxuICApO1xufTtcblxuY29uc3QgbW91bnQgPSAoKSA9PiB7XG4gIGNvbnN0IHJvb3RFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlzaXRhLWRldGFpbC1yb290XCIpIGFzIEluZFJvb3RFbGVtZW50IHwgbnVsbDtcbiAgaWYgKCFyb290RWwpIHJldHVybjtcblxuICBjb25zdCBlbGVtZW50ID0gPERldGFpbFBhZ2UgLz47XG5cbiAgaWYgKHJvb3RFbC5fX2luZFJvb3QpIHtcbiAgICByb290RWwuX19pbmRSb290LnJlbmRlcihlbGVtZW50KTtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCByb290ID0gY3JlYXRlUm9vdChyb290RWwpO1xuICByb290RWwuX19pbmRSb290ID0gcm9vdDtcbiAgcm9vdC5yZW5kZXIoZWxlbWVudCk7XG59O1xuXG5pZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gXCJjb21wbGV0ZVwiIHx8IGRvY3VtZW50LnJlYWR5U3RhdGUgPT09IFwiaW50ZXJhY3RpdmVcIikge1xuICBtb3VudCgpO1xufSBlbHNlIHtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgbW91bnQpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBEZXRhaWxQYWdlO1xuIiwgImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZUNhbGxiYWNrIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBTaW5nbGVEYXRlUGlja2VyIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvU2luZ2xlRGF0ZVBpY2tlci50c3hcIjtcclxuaW1wb3J0IENvbmZpcm1Nb2RhbCBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0NvbmZpcm1Nb2RhbC50c3hcIjtcclxuaW1wb3J0IFNlbGVjdENvbWJvYm94IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvU2VsZWN0Q29tYm9ib3gudHN4XCI7XHJcbmltcG9ydCB7IGZldGNoSnNvbiB9IGZyb20gXCIuLi8uLi8uLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XHJcbmltcG9ydCB7IHVzZVZpc2l0YXMgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlVmlzaXRhcy50c1wiO1xyXG5pbXBvcnQgU3Bpbm5lciBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NwaW5uZXIudHN4XCI7XHJcbmltcG9ydCB7IGNsYXNzTmFtZXMgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvY2xhc3NOYW1lcy50c1wiO1xyXG5pbXBvcnQgeyB3YWl0IH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3dhaXQudHNcIjtcclxuaW1wb3J0IHsgaW5kRm9ybWF0LCBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHsgY2FuQWNjZXNzLCBzaG93UGVybWlzc2lvbk1vZGFsIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3Blcm1pc3Npb25zLnRzXCI7XHJcbmltcG9ydCB7IGJpbmRSZWFkT25seUd1YXJkIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2RvbUd1YXJkcy50c1wiO1xyXG5pbXBvcnQgeyBoYXNWYWx1ZSB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9zdHJpbmdzLnRzXCI7XHJcbmltcG9ydCB7IHJlYWRBbmRDbGVhclRleHRFZGl0b3JWYWx1ZSwgVEVYVF9FRElUT1JfUFJFRklYIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3RleHRFZGl0b3IudHNcIjtcclxuaW1wb3J0IHsgc2V0SGlzdG9yeUZpbHRlckZvckRhdGUsIGZsYXNoQWN0aW9uTWFyayB9IGZyb20gXCIuLi8uLi8uLi91dGlscy92aXNpdGFzSGlzdG9yeS50c1wiO1xyXG5pbXBvcnQgeyBzZXRQcmV2aWV3QW5jaG9yLCBzaG93UHJldmlld1Rvb2x0aXAsIGlzT3ZlcmZsb3dpbmcgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvcHJldmlld1Rvb2x0aXAudHNcIjtcclxuaW1wb3J0IHsgdXNlVGFwR3VhcmQgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlVGFwR3VhcmQudHNcIjtcclxuaW1wb3J0IHsgdXNlQ29uZmlybURpYWxvZyB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VDb25maXJtRGlhbG9nLnRzXCI7XHJcblxyXG5jb25zdCBEZXRhaWxBcHAgPSAoKSA9PiB7XHJcbiAgY29uc3QgeyB2aXNpdFR5cGVzLCBhc2lzdGVudGVUaXBvcyB9ID0gdXNlVmlzaXRhcygpO1xyXG4gIGNvbnN0IGNhbkVkaXRIaXN0b3J5ID0gY2FuQWNjZXNzKFwiVklTSVRBU19ISVNUT1JJQUxcIiwgXCJFZGl0XCIpO1xyXG4gIGNvbnN0IGNhbkRlbGV0ZUhpc3RvcnkgPSBjYW5BY2Nlc3MoXCJWSVNJVEFTX0hJU1RPUklBTFwiLCBcIkZ1bGxBY2Nlc3NcIik7XHJcbiAgdHlwZSBBY3Rpdml0eURldGFpbFBheWxvYWQgPSB7XHJcbiAgICByZWNJZD86IHN0cmluZyB8IG51bWJlcjtcclxuICAgIFJlY0lkPzogc3RyaW5nIHwgbnVtYmVyO1xyXG4gICAgcmVmUmVjSWRBY3RpdmlkYWQ/OiBzdHJpbmcgfCBudW1iZXI7XHJcbiAgICBSZWZSZWNJZEFjdGl2aWRhZD86IHN0cmluZyB8IG51bWJlcjtcclxuICAgIGFjdGl2aWRhZFJlY0lkPzogc3RyaW5nIHwgbnVtYmVyO1xyXG4gICAgQWN0aXZpZGFkUmVjSWQ/OiBzdHJpbmcgfCBudW1iZXI7XHJcbiAgICByZWFkT25seT86IGJvb2xlYW47XHJcbiAgICBhbGxvd0VkaXQ/OiBib29sZWFuO1xyXG4gICAgZWRpdE1vZGVLZXk/OiBzdHJpbmc7XHJcbiAgICBba2V5OiBzdHJpbmddOiB1bmtub3duO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGRldGFpbCA9ICh3aW5kb3cuX19BQ1RJVklUWV9ERVRBSUxfXyBhcyBBY3Rpdml0eURldGFpbFBheWxvYWQpIHx8IHt9O1xyXG5cclxuICBjb25zdCBhY3Rpdml0eVJlY0lkID0gU3RyaW5nKFxyXG4gICAgZGV0YWlsLnJlY0lkIHx8XHJcbiAgICAgIGRldGFpbC5SZWNJZCB8fFxyXG4gICAgICBkZXRhaWwucmVmUmVjSWRBY3RpdmlkYWQgfHxcclxuICAgICAgZGV0YWlsLlJlZlJlY0lkQWN0aXZpZGFkIHx8XHJcbiAgICAgIGRldGFpbC5hY3RpdmlkYWRSZWNJZCB8fFxyXG4gICAgICBkZXRhaWwuQWN0aXZpZGFkUmVjSWQgfHxcclxuICAgICAgXCJcIlxyXG4gICkudHJpbSgpO1xyXG5cclxuICBjb25zdCB0ZXh0RWRpdG9yQmFzZUlkID0gYWN0aXZpdHlSZWNJZCA/IGBWaXNpdGEuJHthY3Rpdml0eVJlY0lkfWAgOiBcIlZpc2l0YVwiO1xyXG4gIGNvbnN0IGZpZWxkSWRDb21lbnRhcmlvcyA9IGAke3RleHRFZGl0b3JCYXNlSWR9LkNvbWVudGFyaW9zYDtcclxuICBjb25zdCBmaWVsZElkQW50ZWNlZGVudGVzID0gYCR7dGV4dEVkaXRvckJhc2VJZH0uQW50ZWNlZGVudGVzYDtcclxuICBjb25zdCBmaWVsZElkQ29uY2x1c2lvbmVzID0gYCR7dGV4dEVkaXRvckJhc2VJZH0uQ29uY2x1c2lvbmVzYDtcclxuXHJcbiAgY29uc3Qgbm9ybWFsaXplRGF0ZVRvSW5wdXQgPSB1c2VDYWxsYmFjaygodmFsdWUpID0+IHtcclxuICAgIGlmICghdmFsdWUpIHJldHVybiBcIlwiO1xyXG4gICAgY29uc3QgcmF3ID0gU3RyaW5nKHZhbHVlKS50cmltKCk7XHJcbiAgICBpZiAoIXJhdykgcmV0dXJuIFwiXCI7XHJcbiAgICAvLyBBbHJlYWR5IHl5eXktTU0tZGRcclxuICAgIGlmICgvXlxcZHs0fS1cXGR7Mn0tXFxkezJ9JC8udGVzdChyYXcpKSByZXR1cm4gcmF3O1xyXG4gICAgLy8gZGQuTU0ueXl5eSBvciBkZC9NTS95eXl5XHJcbiAgICBpZiAoL15cXGR7Mn1bLi8tXVxcZHsyfVsuLy1dXFxkezR9JC8udGVzdChyYXcpKSB7XHJcbiAgICAgIGNvbnN0IHBhcnRzID0gcmF3LnNwbGl0KC9bLi8tXS8pLm1hcCgocCkgPT4gcGFyc2VJbnQocCwgMTApKTtcclxuICAgICAgaWYgKHBhcnRzLmxlbmd0aCA9PT0gMyAmJiAhTnVtYmVyLmlzTmFOKHBhcnRzWzBdKSAmJiAhTnVtYmVyLmlzTmFOKHBhcnRzWzFdKSAmJiAhTnVtYmVyLmlzTmFOKHBhcnRzWzJdKSkge1xyXG4gICAgICAgIGNvbnN0IFtkLCBtLCB5XSA9IHBhcnRzO1xyXG4gICAgICAgIGNvbnN0IG1tID0gU3RyaW5nKG0pLnBhZFN0YXJ0KDIsIFwiMFwiKTtcclxuICAgICAgICBjb25zdCBkZCA9IFN0cmluZyhkKS5wYWRTdGFydCgyLCBcIjBcIik7XHJcbiAgICAgICAgcmV0dXJuIGAke3l9LSR7bW19LSR7ZGR9YDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgY29uc3QgZHQgPSBuZXcgRGF0ZShyYXcpO1xyXG4gICAgaWYgKCFOdW1iZXIuaXNOYU4oZHQuZ2V0VGltZSgpKSkge1xyXG4gICAgICBjb25zdCB5eXl5ID0gZHQuZ2V0RnVsbFllYXIoKTtcclxuICAgICAgY29uc3QgbW0gPSBTdHJpbmcoZHQuZ2V0TW9udGgoKSArIDEpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcclxuICAgICAgY29uc3QgZGQgPSBTdHJpbmcoZHQuZ2V0RGF0ZSgpKS5wYWRTdGFydCgyLCBcIjBcIik7XHJcbiAgICAgIHJldHVybiBgJHt5eXl5fS0ke21tfS0ke2RkfWA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gXCJcIjtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IG1hdGNoT3B0aW9uVmFsdWUgPSB1c2VDYWxsYmFjaygob3B0aW9ucywgcmF3KSA9PiB7XHJcbiAgICBpZiAocmF3ID09IG51bGwpIHJldHVybiBcIlwiO1xyXG4gICAgY29uc3QgcmF3U3RyID0gU3RyaW5nKHJhdykudHJpbSgpO1xyXG4gICAgaWYgKCFyYXdTdHIpIHJldHVybiBcIlwiO1xyXG5cclxuICAgIGNvbnN0IG5vcm1hbGl6ZVRleHQgPSAocykgPT5cclxuICAgICAgU3RyaW5nKHMgfHwgXCJcIilcclxuICAgICAgICAudG9Mb3dlckNhc2UoKVxyXG4gICAgICAgIC5ub3JtYWxpemUoXCJORkRcIilcclxuICAgICAgICAucmVwbGFjZSgvW1xcdTAzMDAtXFx1MDM2Zl0vZywgXCJcIilcclxuICAgICAgICAudHJpbSgpO1xyXG5cclxuICAgIGNvbnN0IHJhd05vcm0gPSBub3JtYWxpemVUZXh0KHJhd1N0cik7XHJcbiAgICBjb25zdCBhbHROb3JtID0gcmF3Tm9ybS5lbmRzV2l0aChcIm9cIikgPyBgJHtyYXdOb3JtLnNsaWNlKDAsIC0xKX1hYCA6IHJhd05vcm07XHJcblxyXG4gICAgY29uc3QgbWF0Y2ggPSAob3B0aW9ucyB8fCBbXSkuZmluZCgobykgPT4ge1xyXG4gICAgICBjb25zdCB2YWwgPSBTdHJpbmcobz8udmFsdWUgPz8gbz8uVmFsdWUgPz8gXCJcIikudHJpbSgpO1xyXG4gICAgICBjb25zdCB0ZXh0ID0gU3RyaW5nKG8/LnRleHQgPz8gbz8uVGV4dCA/PyBcIlwiKS50cmltKCk7XHJcbiAgICAgIGNvbnN0IHRleHROb3JtID0gbm9ybWFsaXplVGV4dCh0ZXh0KTtcclxuICAgICAgcmV0dXJuIHZhbCA9PT0gcmF3U3RyIHx8IHZhbCA9PT0gcmF3Tm9ybSB8fCB0ZXh0Tm9ybSA9PT0gcmF3Tm9ybSB8fCB0ZXh0Tm9ybSA9PT0gYWx0Tm9ybTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIG1hdGNoID8gU3RyaW5nKG1hdGNoLnZhbHVlID8/IG1hdGNoLlZhbHVlID8/IHJhd1N0cikgOiByYXdTdHI7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBpbml0aWFsVHJhbnNEYXRlID0gbm9ybWFsaXplRGF0ZVRvSW5wdXQoU3RyaW5nKGRldGFpbC50cmFuc0RhdGUgPz8gZGV0YWlsLlRyYW5zRGF0ZSA/PyBcIlwiKSk7XHJcbiAgY29uc3QgZGVmYXVsdFZpc2l0VHlwZSA9IHZpc2l0VHlwZXNbMF0/LnZhbHVlID8/IHZpc2l0VHlwZXNbMF0/LlZhbHVlID8/IFwiXCI7XHJcbiAgY29uc3QgcmF3SW5pdGlhbFZpc2l0VHlwZSA9IFN0cmluZyhcclxuICAgIGRldGFpbC50aXBvVmlzaXRhID8/IGRldGFpbC5UaXBvVmlzaXRhID8/IGRldGFpbC52aXNpdFR5cGUgPz8gZGV0YWlsLlZpc2l0VHlwZSA/PyBcIlwiXHJcbiAgKTtcclxuICBjb25zdCBpbml0aWFsVmlzaXRUeXBlID0gbWF0Y2hPcHRpb25WYWx1ZSh2aXNpdFR5cGVzLCByYXdJbml0aWFsVmlzaXRUeXBlKSB8fCBkZWZhdWx0VmlzaXRUeXBlO1xyXG4gIGNvbnN0IHJhd0luaXRpYWxBc2lzdGVudGUgPSBTdHJpbmcoXHJcbiAgICBkZXRhaWwuYXNpc3RlbnRlVGlwbyA/PyBkZXRhaWwuQXNpc3RlbnRlVGlwbyA/PyAoYXNpc3RlbnRlVGlwb3NbMF0/LnZhbHVlID8/IGFzaXN0ZW50ZVRpcG9zWzBdPy5WYWx1ZSA/PyBcIlwiKVxyXG4gICk7XHJcbiAgY29uc3QgaW5pdGlhbEFzaXN0ZW50ZSA9IG1hdGNoT3B0aW9uVmFsdWUoYXNpc3RlbnRlVGlwb3MsIHJhd0luaXRpYWxBc2lzdGVudGUpIHx8IHJhd0luaXRpYWxBc2lzdGVudGU7XHJcblxyXG4gIGNvbnN0IFt0cmFuc0RhdGUsIHNldFRyYW5zRGF0ZV0gPSB1c2VTdGF0ZShpbml0aWFsVHJhbnNEYXRlKTtcclxuICBjb25zdCBbdmlzaXRUeXBlLCBzZXRWaXNpdFR5cGVdID0gdXNlU3RhdGUoaW5pdGlhbFZpc2l0VHlwZSk7XHJcbiAgY29uc3QgW2FzaXN0ZW50ZVRpcG8sIHNldEFzaXN0ZW50ZVRpcG9dID0gdXNlU3RhdGUoaW5pdGlhbEFzaXN0ZW50ZSk7XHJcbiAgY29uc3QgW2Rlc2NyaXB0aW9uLCBzZXREZXNjcmlwdGlvbl0gPSB1c2VTdGF0ZShTdHJpbmcoZGV0YWlsLmRlc2NyaXB0aW9uID8/IGRldGFpbC5EZXNjcmlwdGlvbiA/PyBcIlwiKSk7XHJcbiAgY29uc3QgW2NvbWVudGFyaW9zLCBzZXRDb21lbnRhcmlvc10gPSB1c2VTdGF0ZShTdHJpbmcoZGV0YWlsLmNvbWVudGFyaW9zID8/IGRldGFpbC5Db21lbnRhcmlvcyA/PyBcIlwiKSk7XHJcbiAgY29uc3QgW2FudGVjZWRlbnRlcywgc2V0QW50ZWNlZGVudGVzXSA9IHVzZVN0YXRlKFN0cmluZyhkZXRhaWwuYW50ZWNlZGVudGVzID8/IGRldGFpbC5BbnRlY2VkZW50ZXMgPz8gXCJcIikpO1xyXG4gIGNvbnN0IFtjb25jbHVzaW9uZXMsIHNldENvbmNsdXNpb25lc10gPSB1c2VTdGF0ZShTdHJpbmcoZGV0YWlsLmNvbmNsdXNpb25lcyA/PyBkZXRhaWwuQ29uY2x1c2lvbmVzID8/IFwiXCIpKTtcclxuICBjb25zdCBbc3RhdHVzLCBzZXRTdGF0dXNdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtidXN5LCBzZXRCdXN5XSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2lzRWRpdGluZywgc2V0SXNFZGl0aW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2lzSHlkcmF0aW5nLCBzZXRJc0h5ZHJhdGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFttb2RhbEVycm9yLCBzZXRNb2RhbEVycm9yXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCByZWFkT25seVN1cmZhY2VSZWYgPSB1c2VSZWYobnVsbCk7XG4gIGNvbnN0IGVkaXRNb2RlS2V5UmVmID0gdXNlUmVmKFwiXCIpO1xuICBjb25zdCBkcmFmdEtleVJlZiA9IHVzZVJlZihcIlwiKTtcbiAgY29uc3QgZHJhZnRQZXJzaXN0VGltZXJSZWYgPSB1c2VSZWY8bnVtYmVyIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IGVkaXRTbmFwc2hvdFJlZiA9IHVzZVJlZihudWxsKTtcblxyXG4gIGNvbnN0IHJlY0lkID0gU3RyaW5nKGRldGFpbC5yZWNJZCA/PyBkZXRhaWwuUmVjSWQgPz8gXCJcIik7XHJcbiAgY29uc3QgYWNjb3VudE51bSA9IFN0cmluZyhkZXRhaWwuYWNjb3VudE51bSA/PyBkZXRhaWwuQWNjb3VudE51bSA/PyBcIlwiKTtcclxuICBjb25zdCBhY3RpdmlkYWRJZCA9IFN0cmluZyhkZXRhaWwuYWN0aXZpZGFkSWQgPz8gZGV0YWlsLkFjdGl2aWRhZElkID8/IFwiXCIpO1xyXG5cclxuICAvLyBQZXJzaXN0IGVkaXQgbW9kZSBhY3Jvc3MgbmF2aWdhdGlvbiB0byB0aGUgdGV4dCBlZGl0b3IuXHJcbiAgY29uc3Qgc3luY0VkaXRNb2RlRmxhZyA9IHVzZUNhbGxiYWNrKChlbmFibGVkKSA9PiB7XHJcbiAgICBjb25zdCBrZXkgPSBlZGl0TW9kZUtleVJlZi5jdXJyZW50O1xyXG4gICAgaWYgKCFrZXkpIHJldHVybjtcclxuICAgIHRyeSB7XHJcbiAgICAgIGlmIChlbmFibGVkKSBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKGtleSwgXCJ0cnVlXCIpO1xyXG4gICAgICBlbHNlIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KTtcclxuICAgIH0gY2F0Y2gge1xyXG4gICAgICAvKiBpZ25vcmUgKi9cclxuICAgIH1cclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IHN5bmNFZGl0TW9kZU9uRW50cnkgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgY29uc3QgYmFzZUlkID0gYWN0aXZpZGFkSWQgfHwgcmVjSWQgfHwgXCJkZWZhdWx0XCI7XG4gICAgY29uc3Qga2V5ID0gYGluZF92aXNpdF9lZGl0XyR7YmFzZUlkfWA7XG4gICAgY29uc3QgcmV0dXJuS2V5ID0gYCR7a2V5fV9yZXR1cm5gO1xuICAgIGNvbnN0IGRyYWZ0S2V5ID0gYGluZF92aXNpdF9kcmFmdF8ke2Jhc2VJZH1gO1xuICAgIGVkaXRNb2RlS2V5UmVmLmN1cnJlbnQgPSBrZXk7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGFsbG93UmVzdG9yZSA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0ocmV0dXJuS2V5KSA9PT0gXCIxXCI7XG4gICAgICBpZiAoYWxsb3dSZXN0b3JlKSB7XG4gICAgICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0ocmV0dXJuS2V5KTtcbiAgICAgIH1cbiAgICAgIGlmIChjYW5FZGl0SGlzdG9yeSAmJiBhbGxvd1Jlc3RvcmUgJiYgc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShrZXkpID09PSBcInRydWVcIikge1xuICAgICAgICBzZXRJc0VkaXRpbmcodHJ1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZXRJc0VkaXRpbmcoZmFsc2UpO1xuICAgICAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XG4gICAgICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oZHJhZnRLZXkpO1xuICAgICAgfVxuICAgICAgaWYgKCFjYW5FZGl0SGlzdG9yeSkge1xuICAgICAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XG4gICAgICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oZHJhZnRLZXkpO1xuICAgICAgfVxuICAgIH0gY2F0Y2gge1xuICAgICAgLyogaWdub3JlICovXG4gICAgfVxuICB9LCBbYWN0aXZpZGFkSWQsIHJlY0lkLCBjYW5FZGl0SGlzdG9yeV0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc3luY0VkaXRNb2RlT25FbnRyeSgpO1xuICB9LCBbc3luY0VkaXRNb2RlT25FbnRyeV0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3Qgb25QYWdlU2hvdyA9IChldmVudDogUGFnZVRyYW5zaXRpb25FdmVudCkgPT4ge1xuICAgICAgY29uc3QgbmF2RW50cnkgPSB0eXBlb2YgcGVyZm9ybWFuY2UgIT09IFwidW5kZWZpbmVkXCIgJiYgcGVyZm9ybWFuY2UuZ2V0RW50cmllc0J5VHlwZVxuICAgICAgICA/IChwZXJmb3JtYW5jZS5nZXRFbnRyaWVzQnlUeXBlKFwibmF2aWdhdGlvblwiKVswXSBhcyBQZXJmb3JtYW5jZU5hdmlnYXRpb25UaW1pbmcgfCB1bmRlZmluZWQpXG4gICAgICAgIDogdW5kZWZpbmVkO1xuICAgICAgY29uc3QgaXNCYWNrRm9yd2FyZCA9IG5hdkVudHJ5Py50eXBlID09PSBcImJhY2tfZm9yd2FyZFwiO1xuICAgICAgaWYgKGV2ZW50Py5wZXJzaXN0ZWQgfHwgaXNCYWNrRm9yd2FyZCkge1xuICAgICAgICBzeW5jRWRpdE1vZGVPbkVudHJ5KCk7XG4gICAgICB9XG4gICAgfTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInBhZ2VzaG93XCIsIG9uUGFnZVNob3cpO1xuICAgIHJldHVybiAoKSA9PiB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInBhZ2VzaG93XCIsIG9uUGFnZVNob3cpO1xuICB9LCBbc3luY0VkaXRNb2RlT25FbnRyeV0pO1xuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IGtleSA9IGBpbmRfdmlzaXRfZHJhZnRfJHthY3RpdmlkYWRJZCB8fCByZWNJZCB8fCBcImRlZmF1bHRcIn1gO1xyXG4gICAgZHJhZnRLZXlSZWYuY3VycmVudCA9IGtleTtcclxuICB9LCBbYWN0aXZpZGFkSWQsIHJlY0lkXSk7XHJcblxyXG4gIGNvbnN0IHNhdmVEcmFmdCA9IHVzZUNhbGxiYWNrKChkcmFmdCkgPT4ge1xyXG4gICAgY29uc3Qga2V5ID0gZHJhZnRLZXlSZWYuY3VycmVudDtcclxuICAgIGlmICgha2V5KSByZXR1cm47XHJcbiAgICB0cnkge1xyXG4gICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKGtleSwgSlNPTi5zdHJpbmdpZnkoZHJhZnQpKTtcclxuICAgIH0gY2F0Y2gge1xyXG4gICAgICAvKiBpZ25vcmUgKi9cclxuICAgIH1cclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IGNsZWFyRHJhZnQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBjb25zdCBrZXkgPSBkcmFmdEtleVJlZi5jdXJyZW50O1xyXG4gICAgaWYgKCFrZXkpIHJldHVybjtcclxuICAgIHRyeSB7XHJcbiAgICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KTtcclxuICAgIH0gY2F0Y2gge1xyXG4gICAgICAvKiBpZ25vcmUgKi9cclxuICAgIH1cclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IGFwcGx5RHJhZnRWYWx1ZXMgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBjb25zdCBrZXkgPSBkcmFmdEtleVJlZi5jdXJyZW50O1xyXG4gICAgaWYgKCFrZXkpIHJldHVybjtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHJhdyA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oa2V5KTtcclxuICAgICAgaWYgKCFyYXcpIHJldHVybjtcclxuICAgICAgY29uc3QgZHJhZnQgPSBKU09OLnBhcnNlKHJhdyk7XHJcbiAgICAgIGlmICghZHJhZnQgfHwgdHlwZW9mIGRyYWZ0ICE9PSBcIm9iamVjdFwiKSByZXR1cm47XHJcbiAgICAgIGlmIChkcmFmdC50cmFuc0RhdGUpIHNldFRyYW5zRGF0ZShTdHJpbmcoZHJhZnQudHJhbnNEYXRlKSk7XHJcbiAgICAgIGlmIChkcmFmdC52aXNpdFR5cGUgIT09IHVuZGVmaW5lZCkgc2V0VmlzaXRUeXBlKFN0cmluZyhkcmFmdC52aXNpdFR5cGUpKTtcclxuICAgICAgaWYgKGRyYWZ0LmFzaXN0ZW50ZVRpcG8gIT09IHVuZGVmaW5lZCkgc2V0QXNpc3RlbnRlVGlwbyhTdHJpbmcoZHJhZnQuYXNpc3RlbnRlVGlwbykpO1xyXG4gICAgICBpZiAoZHJhZnQuZGVzY3JpcHRpb24gIT09IHVuZGVmaW5lZCkgc2V0RGVzY3JpcHRpb24oU3RyaW5nKGRyYWZ0LmRlc2NyaXB0aW9uKSk7XHJcbiAgICAgIGlmIChkcmFmdC5jb21lbnRhcmlvcyAhPT0gdW5kZWZpbmVkKSBzZXRDb21lbnRhcmlvcyhTdHJpbmcoZHJhZnQuY29tZW50YXJpb3MpKTtcclxuICAgICAgaWYgKGRyYWZ0LmFudGVjZWRlbnRlcyAhPT0gdW5kZWZpbmVkKSBzZXRBbnRlY2VkZW50ZXMoU3RyaW5nKGRyYWZ0LmFudGVjZWRlbnRlcykpO1xyXG4gICAgICBpZiAoZHJhZnQuY29uY2x1c2lvbmVzICE9PSB1bmRlZmluZWQpIHNldENvbmNsdXNpb25lcyhTdHJpbmcoZHJhZnQuY29uY2x1c2lvbmVzKSk7XHJcbiAgICB9IGNhdGNoIHtcclxuICAgICAgLyogaWdub3JlICovXHJcbiAgICB9XHJcbiAgfSwgW10pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghaXNFZGl0aW5nKSB7XG4gICAgICBpZiAoZHJhZnRQZXJzaXN0VGltZXJSZWYuY3VycmVudCkge1xuICAgICAgICBjbGVhclRpbWVvdXQoZHJhZnRQZXJzaXN0VGltZXJSZWYuY3VycmVudCk7XG4gICAgICAgIGRyYWZ0UGVyc2lzdFRpbWVyUmVmLmN1cnJlbnQgPSBudWxsO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChkcmFmdFBlcnNpc3RUaW1lclJlZi5jdXJyZW50KSB7XG4gICAgICBjbGVhclRpbWVvdXQoZHJhZnRQZXJzaXN0VGltZXJSZWYuY3VycmVudCk7XG4gICAgfVxuXG4gICAgZHJhZnRQZXJzaXN0VGltZXJSZWYuY3VycmVudCA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGRyYWZ0UGVyc2lzdFRpbWVyUmVmLmN1cnJlbnQgPSBudWxsO1xuICAgICAgc2F2ZURyYWZ0KHtcbiAgICAgICAgdHJhbnNEYXRlLFxuICAgICAgICB2aXNpdFR5cGUsXG4gICAgICAgIGFzaXN0ZW50ZVRpcG8sXG4gICAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgICBjb21lbnRhcmlvcyxcbiAgICAgICAgYW50ZWNlZGVudGVzLFxuICAgICAgICBjb25jbHVzaW9uZXNcbiAgICAgIH0pO1xuICAgIH0sIDE4MCk7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgaWYgKGRyYWZ0UGVyc2lzdFRpbWVyUmVmLmN1cnJlbnQpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KGRyYWZ0UGVyc2lzdFRpbWVyUmVmLmN1cnJlbnQpO1xuICAgICAgICBkcmFmdFBlcnNpc3RUaW1lclJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9O1xuICB9LCBbdHJhbnNEYXRlLCB2aXNpdFR5cGUsIGFzaXN0ZW50ZVRpcG8sIGRlc2NyaXB0aW9uLCBjb21lbnRhcmlvcywgYW50ZWNlZGVudGVzLCBjb25jbHVzaW9uZXMsIGlzRWRpdGluZywgc2F2ZURyYWZ0XSk7XG5cclxuICBjb25zdCBoYXNTZXJ2ZXJEZXRhaWwgPVxyXG4gICAgaGFzVmFsdWUocmVjSWQpICYmXHJcbiAgICBoYXNWYWx1ZShhY2NvdW50TnVtKSAmJlxyXG4gICAgaGFzVmFsdWUoZGV0YWlsLnRyYW5zRGF0ZSB8fCBkZXRhaWwuVHJhbnNEYXRlIHx8IFwiXCIpO1xyXG5cclxuICBjb25zdCBzaG91bGRIeWRyYXRlID0gISFhY3RpdmlkYWRJZCAmJiAhaGFzU2VydmVyRGV0YWlsO1xyXG5cclxuICBjb25zdCBvcGVuVGV4dEVkaXRvciA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKFxyXG4gICAgICBmaWVsZElkOiBzdHJpbmcsXHJcbiAgICAgIGZpZWxkTGFiZWw6IHN0cmluZyxcclxuICAgICAgZmllbGRWYWx1ZTogc3RyaW5nLFxyXG4gICAgICBvcHRpb25zOiB7IGFsbG93RWRpdD86IGJvb2xlYW47IHJlYWRPbmx5PzogYm9vbGVhbjsgZWRpdE1vZGVLZXk/OiBzdHJpbmcgfSA9IHt9XHJcbiAgICApID0+IHtcclxuICAgIGNvbnN0IHNhZmVJZCA9IFN0cmluZyhmaWVsZElkIHx8IFwiXCIpLnRyaW0oKTtcclxuICAgIGNvbnN0IHNhZmVMYWJlbCA9IFN0cmluZyhmaWVsZExhYmVsIHx8IFwiXCIpLnRyaW0oKTtcbiAgICBjb25zdCByZWFkT25seSA9IG9wdGlvbnM/LnJlYWRPbmx5ID09PSB0cnVlO1xuICAgIGNvbnN0IGFsbG93RWRpdCA9IG9wdGlvbnM/LmFsbG93RWRpdCAhPT0gZmFsc2U7XG4gICAgY29uc3QgZWRpdE1vZGVLZXkgPSBTdHJpbmcob3B0aW9ucz8uZWRpdE1vZGVLZXkgfHwgXCJcIikudHJpbSgpO1xuICAgIGlmIChzYWZlSWQpIHtcclxuICAgICAgY29uc3Qga2V5ID0gYCR7VEVYVF9FRElUT1JfUFJFRklYfSR7c2FmZUlkfWA7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgLy8gUHJpbWUgdGhlIGVkaXRvciB3aXRoIHRoZSBjdXJyZW50IHZhbHVlIHdpdGhvdXQgcHVzaGluZyBsYXJnZSB0ZXh0IGludG8gdGhlIFVSTC5cclxuICAgICAgICBpZiAoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShrZXkpID09PSBudWxsKSB7XHJcbiAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKGtleSwgU3RyaW5nKGZpZWxkVmFsdWUgfHwgXCJcIikpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBjYXRjaCB7XHJcbiAgICAgICAgLyogaWdub3JlICovXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZXR1cm5VcmwgPSBgJHt3aW5kb3cubG9jYXRpb24ucGF0aG5hbWV9JHt3aW5kb3cubG9jYXRpb24uc2VhcmNoIHx8IFwiXCJ9YDtcclxuICAgIHRyeSB7XG4gICAgICBpZiAoc2FmZUlkKSB7XG4gICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oYCR7VEVYVF9FRElUT1JfUFJFRklYfSR7c2FmZUlkfV9yZXR1cm5VcmxgLCByZXR1cm5VcmwpO1xuICAgICAgfVxuICAgICAgaWYgKGVkaXRNb2RlS2V5KSB7XG4gICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oYCR7ZWRpdE1vZGVLZXl9X3JldHVybmAsIFwiMVwiKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIHtcbiAgICAgIC8qIGlnbm9yZSAqL1xuICAgIH1cbiAgICBjb25zdCB1cmwgPVxyXG4gICAgICBgL1RleHRFZGl0b3JSZWFjdC9FZGl0RmllbGQ/ZmllbGRJZD0ke2VuY29kZVVSSUNvbXBvbmVudChzYWZlSWQgfHwgZmllbGRJZCB8fCBcIlwiKX1gICtcclxuICAgICAgYCZmaWVsZExhYmVsPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHNhZmVMYWJlbCB8fCBmaWVsZExhYmVsIHx8IFwiXCIpfWAgK1xyXG4gICAgICBgJnJldHVyblVybD0ke2VuY29kZVVSSUNvbXBvbmVudChyZXR1cm5VcmwpfWAgK1xyXG4gICAgICBgJnJlYWRPbmx5PSR7cmVhZE9ubHkgPyBcIjFcIiA6IFwiMFwifWAgK1xyXG4gICAgICBgJmFsbG93RWRpdD0ke2FsbG93RWRpdCA/IFwiMVwiIDogXCIwXCJ9YCArXHJcbiAgICAgIChlZGl0TW9kZUtleSA/IGAmZWRpdE1vZGVLZXk9JHtlbmNvZGVVUklDb21wb25lbnQoZWRpdE1vZGVLZXkpfWAgOiBcIlwiKTtcclxuXHJcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHVybDtcclxuICAgIH0sXHJcbiAgICBbXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUNvbWVudGFyaW9zVGFwID0gdXNlQ2FsbGJhY2soKGV2ZW50KSA9PiB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgb3BlblRleHRFZGl0b3IoZmllbGRJZENvbWVudGFyaW9zLCBpbmRUKFwiVmlzaXRzX0ZpZWxkX0NvbW1lbnRzXCIsIFwiQ29tbWVudHNcIiksIGNvbWVudGFyaW9zLCB7XHJcbiAgICAgIHJlYWRPbmx5OiAhaXNFZGl0aW5nLFxyXG4gICAgICBhbGxvd0VkaXQ6IGNhbkVkaXRIaXN0b3J5LFxyXG4gICAgICBlZGl0TW9kZUtleTogZWRpdE1vZGVLZXlSZWYuY3VycmVudFxyXG4gICAgfSk7XHJcbiAgfSwgW2NvbWVudGFyaW9zLCBpc0VkaXRpbmcsIGNhbkVkaXRIaXN0b3J5LCBvcGVuVGV4dEVkaXRvcl0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVDb21lbnRhcmlvc0hvbGQgPSB1c2VDYWxsYmFjaygodGFyZ2V0LCBjbGllbnRZKSA9PiB7XHJcbiAgICBpZiAoIXRhcmdldCB8fCAhaXNPdmVyZmxvd2luZyh0YXJnZXQpKSByZXR1cm4gZmFsc2U7XHJcbiAgICBzZXRQcmV2aWV3QW5jaG9yKHRhcmdldCk7XHJcbiAgICByZXR1cm4gc2hvd1ByZXZpZXdUb29sdGlwKFN0cmluZyhjb21lbnRhcmlvcyB8fCBcIlwiKSwgY2xpZW50WSk7XHJcbiAgfSwgW2NvbWVudGFyaW9zXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUFudGVjZWRlbnRlc1RhcCA9IHVzZUNhbGxiYWNrKChldmVudCkgPT4ge1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIG9wZW5UZXh0RWRpdG9yKGZpZWxkSWRBbnRlY2VkZW50ZXMsIGluZFQoXCJWaXNpdHNfRmllbGRfQmFja2dyb3VuZFwiLCBcIkJhY2tncm91bmRcIiksIGFudGVjZWRlbnRlcywge1xyXG4gICAgICByZWFkT25seTogIWlzRWRpdGluZyxcclxuICAgICAgYWxsb3dFZGl0OiBjYW5FZGl0SGlzdG9yeSxcclxuICAgICAgZWRpdE1vZGVLZXk6IGVkaXRNb2RlS2V5UmVmLmN1cnJlbnRcclxuICAgIH0pO1xyXG4gIH0sIFthbnRlY2VkZW50ZXMsIGlzRWRpdGluZywgY2FuRWRpdEhpc3RvcnksIG9wZW5UZXh0RWRpdG9yXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUFudGVjZWRlbnRlc0hvbGQgPSB1c2VDYWxsYmFjaygodGFyZ2V0LCBjbGllbnRZKSA9PiB7XHJcbiAgICBpZiAoIXRhcmdldCB8fCAhaXNPdmVyZmxvd2luZyh0YXJnZXQpKSByZXR1cm4gZmFsc2U7XHJcbiAgICBzZXRQcmV2aWV3QW5jaG9yKHRhcmdldCk7XHJcbiAgICByZXR1cm4gc2hvd1ByZXZpZXdUb29sdGlwKFN0cmluZyhhbnRlY2VkZW50ZXMgfHwgXCJcIiksIGNsaWVudFkpO1xyXG4gIH0sIFthbnRlY2VkZW50ZXNdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQ29uY2x1c2lvbmVzVGFwID0gdXNlQ2FsbGJhY2soKGV2ZW50KSA9PiB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgb3BlblRleHRFZGl0b3IoZmllbGRJZENvbmNsdXNpb25lcywgaW5kVChcIlZpc2l0c19GaWVsZF9Db25jbHVzaW9uc1wiLCBcIkNvbmNsdXNpb25zXCIpLCBjb25jbHVzaW9uZXMsIHtcclxuICAgICAgcmVhZE9ubHk6ICFpc0VkaXRpbmcsXHJcbiAgICAgIGFsbG93RWRpdDogY2FuRWRpdEhpc3RvcnksXHJcbiAgICAgIGVkaXRNb2RlS2V5OiBlZGl0TW9kZUtleVJlZi5jdXJyZW50XHJcbiAgICB9KTtcclxuICB9LCBbY29uY2x1c2lvbmVzLCBpc0VkaXRpbmcsIGNhbkVkaXRIaXN0b3J5LCBvcGVuVGV4dEVkaXRvcl0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVDb25jbHVzaW9uZXNIb2xkID0gdXNlQ2FsbGJhY2soKHRhcmdldCwgY2xpZW50WSkgPT4ge1xyXG4gICAgaWYgKCF0YXJnZXQgfHwgIWlzT3ZlcmZsb3dpbmcodGFyZ2V0KSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgc2V0UHJldmlld0FuY2hvcih0YXJnZXQpO1xyXG4gICAgcmV0dXJuIHNob3dQcmV2aWV3VG9vbHRpcChTdHJpbmcoY29uY2x1c2lvbmVzIHx8IFwiXCIpLCBjbGllbnRZKTtcclxuICB9LCBbY29uY2x1c2lvbmVzXSk7XHJcblxyXG4gIGNvbnN0IGNvbWVudGFyaW9zVGFwID0gdXNlVGFwR3VhcmQoaGFuZGxlQ29tZW50YXJpb3NUYXAsIGhhbmRsZUNvbWVudGFyaW9zSG9sZCk7XHJcbiAgY29uc3QgYW50ZWNlZGVudGVzVGFwID0gdXNlVGFwR3VhcmQoaGFuZGxlQW50ZWNlZGVudGVzVGFwLCBoYW5kbGVBbnRlY2VkZW50ZXNIb2xkKTtcclxuICBjb25zdCBjb25jbHVzaW9uZXNUYXAgPSB1c2VUYXBHdWFyZChoYW5kbGVDb25jbHVzaW9uZXNUYXAsIGhhbmRsZUNvbmNsdXNpb25lc0hvbGQpO1xyXG5cclxuICBjb25zdCBhcHBseVRleHRFZGl0b3JWYWx1ZXMgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBjb25zdCB2YWxDb21lbnRhcmlvcyA9IHJlYWRBbmRDbGVhclRleHRFZGl0b3JWYWx1ZShmaWVsZElkQ29tZW50YXJpb3MpO1xyXG4gICAgaWYgKHZhbENvbWVudGFyaW9zICE9PSBudWxsKSBzZXRDb21lbnRhcmlvcyh2YWxDb21lbnRhcmlvcyk7XHJcblxyXG4gICAgY29uc3QgdmFsQW50ZWNlZGVudGVzID0gcmVhZEFuZENsZWFyVGV4dEVkaXRvclZhbHVlKGZpZWxkSWRBbnRlY2VkZW50ZXMpO1xyXG4gICAgaWYgKHZhbEFudGVjZWRlbnRlcyAhPT0gbnVsbCkgc2V0QW50ZWNlZGVudGVzKHZhbEFudGVjZWRlbnRlcyk7XHJcblxyXG4gICAgY29uc3QgdmFsQ29uY2x1c2lvbmVzID0gcmVhZEFuZENsZWFyVGV4dEVkaXRvclZhbHVlKGZpZWxkSWRDb25jbHVzaW9uZXMpO1xyXG4gICAgaWYgKHZhbENvbmNsdXNpb25lcyAhPT0gbnVsbCkgc2V0Q29uY2x1c2lvbmVzKHZhbENvbmNsdXNpb25lcyk7XHJcbiAgfSwgW2ZpZWxkSWRDb21lbnRhcmlvcywgZmllbGRJZEFudGVjZWRlbnRlcywgZmllbGRJZENvbmNsdXNpb25lc10pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFhY3RpdmlkYWRJZCkge1xyXG4gICAgICBhcHBseVRleHRFZGl0b3JWYWx1ZXMoKTtcclxuICAgIH1cclxuICAgIGNvbnN0IG9uUGFnZVNob3cgPSAoKSA9PiBhcHBseVRleHRFZGl0b3JWYWx1ZXMoKTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicGFnZXNob3dcIiwgb25QYWdlU2hvdyk7XHJcbiAgICByZXR1cm4gKCkgPT4gd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwYWdlc2hvd1wiLCBvblBhZ2VTaG93KTtcclxuICB9LCBbYWN0aXZpZGFkSWQsIGFwcGx5VGV4dEVkaXRvclZhbHVlc10pO1xyXG5cclxuICBjb25zdCB7IG1vZGFsLCBvcGVuQ29uZmlybSwgY2xvc2VDb25maXJtLCBoYW5kbGVDb25maXJtIH0gPSB1c2VDb25maXJtRGlhbG9nKHtcclxuICAgIGRlZmF1bHRDb25maXJtVGV4dDogaW5kVChcIkNvbmZpcm1fWWVzXCIsIFwiT0tcIiksXHJcbiAgICBkZWZhdWx0Q2FuY2VsVGV4dDogaW5kVChcIkNvbmZpcm1fTm9cIiwgXCJDYW5jZWxcIilcclxuICB9KTtcclxuXHJcbiAgY29uc3QgaGFuZGxlTW9kYWxDb25maXJtID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgc2V0TW9kYWxFcnJvcihcIlwiKTtcclxuICAgIGF3YWl0IGhhbmRsZUNvbmZpcm0oe1xyXG4gICAgICBidXN5LFxyXG4gICAgICBvbkVycm9yOiAobXNnKSA9PiB7XHJcbiAgICAgICAgc2V0TW9kYWxFcnJvcihtc2cpO1xyXG4gICAgICAgIHNldFN0YXR1cyhtc2cpO1xyXG4gICAgICAgIGZsYXNoQWN0aW9uTWFyayhcImVycm9yUHJvY2Vzc1wiLCAxNTAwKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSwgW2J1c3ksIGhhbmRsZUNvbmZpcm1dKTtcclxuXHJcbiAgY29uc3QgbW9kYWxMb2FkaW5nVGV4dCA9IGluZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIik7XHJcbiAgY29uc3QgbW9kYWxDYW5jZWxUZXh0ID0gbW9kYWwuY2FuY2VsVGV4dCB8fCBpbmRUKFwiQ29uZmlybV9Ob1wiLCBcIkNhbmNlbFwiKTtcclxuICBjb25zdCBtb2RhbENvbmZpcm1UZXh0ID0gYnVzeVxyXG4gICAgPyBtb2RhbExvYWRpbmdUZXh0XHJcbiAgICA6ICghYnVzeSAmJiBtb2RhbEVycm9yID8gaW5kVChcIkNvbW1vbl9PS1wiLCBcIk9LXCIpIDogKG1vZGFsLmNvbmZpcm1UZXh0IHx8IGluZFQoXCJDb25maXJtX1llc1wiLCBcIk9LXCIpKSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZU1vZGFsQnV0dG9uQ29uZmlybSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmICghYnVzeSAmJiBtb2RhbEVycm9yKSB7XHJcbiAgICAgIGNsb3NlQ29uZmlybSgpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBoYW5kbGVNb2RhbENvbmZpcm0oKTtcclxuICB9LCBbYnVzeSwgbW9kYWxFcnJvciwgY2xvc2VDb25maXJtLCBoYW5kbGVNb2RhbENvbmZpcm1dKTtcclxuXHJcbiAgLy8gaHlkcmF0ZSBkYXRhIGZyb20gc2VydmVyIGlmIGFueSBmaWVsZCBpcyBtaXNzaW5nXHJcbiAgY29uc3QgaHlkcmF0ZUZyb21BcGkgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XHJcbiAgICBpZiAoIWFjdGl2aWRhZElkKSByZXR1cm47XHJcbiAgICBzZXRJc0h5ZHJhdGluZyh0cnVlKTtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoSnNvbihgL1Zpc2l0YXMvR2V0QWN0aXZpdHlCeUNvZGU/Y29kZT0ke2VuY29kZVVSSUNvbXBvbmVudChhY3RpdmlkYWRJZCl9YCk7XHJcbiAgICAgIGlmICghcmVzPy5zdWNjZXNzIHx8ICFyZXMuZGF0YSkge1xyXG4gICAgICAgIHNldFN0YXR1cyhyZXM/Lm1lc3NhZ2UgfHwgaW5kVChcIlZpc2l0c19EZXRhaWxfTG9hZEFjdGl2aXR5RmFpbGVkXCIsIFwiRmFpbGVkIHRvIGxvYWQgYWN0aXZpdHkgZGV0YWlscy5cIikpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBkYXRhID0gcmVzLmRhdGE7XHJcbiAgICAgIGNvbnN0IHJhd0RhdGUgPSBTdHJpbmcoZGF0YS50cmFuc0RhdGUgPz8gZGF0YS5UcmFuc0RhdGUgPz8gXCJcIik7XHJcbiAgICAgIHNldFRyYW5zRGF0ZShub3JtYWxpemVEYXRlVG9JbnB1dChyYXdEYXRlKSk7XHJcbiAgICAgIGNvbnN0IHJhd1Zpc2l0VHlwZSA9IFN0cmluZyhcclxuICAgICAgICBkYXRhLnRpcG9WaXNpdGEgPz8gZGF0YS5UaXBvVmlzaXRhID8/IGRhdGEudmlzaXRUeXBlID8/IGRhdGEuVmlzaXRUeXBlID8/IFwiXCJcclxuICAgICAgKTtcclxuICAgICAgc2V0VmlzaXRUeXBlKG1hdGNoT3B0aW9uVmFsdWUodmlzaXRUeXBlcywgcmF3VmlzaXRUeXBlKSB8fCBkZWZhdWx0VmlzaXRUeXBlKTtcclxuXHJcbiAgICAgIGNvbnN0IGFzaXN0ZW50ZXNMaXN0ID0gZGF0YS5hc2lzdGVudGVzID8/IGRhdGEuQXNpc3RlbnRlcztcclxuICAgICAgY29uc3QgZmlyc3RBc2lzdGVudGUgPVxyXG4gICAgICAgIEFycmF5LmlzQXJyYXkoYXNpc3RlbnRlc0xpc3QpICYmIGFzaXN0ZW50ZXNMaXN0Lmxlbmd0aCA/IGFzaXN0ZW50ZXNMaXN0WzBdIDogbnVsbDtcclxuICAgICAgY29uc3QgcmF3QXNpc3RlbnRlVGlwbyA9IFN0cmluZyhcclxuICAgICAgICBkYXRhLmFzaXN0ZW50ZVRpcG8gPz9cclxuICAgICAgICAgIGRhdGEuQXNpc3RlbnRlVGlwbyA/P1xyXG4gICAgICAgICAgZmlyc3RBc2lzdGVudGU/LmFzaXN0ZW50ZVRpcG8gPz9cclxuICAgICAgICAgIGZpcnN0QXNpc3RlbnRlPy5Bc2lzdGVudGVUaXBvID8/XHJcbiAgICAgICAgICBcIlwiXHJcbiAgICAgICk7XHJcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRBc2lzdGVudGVUaXBvID0gbWF0Y2hPcHRpb25WYWx1ZShhc2lzdGVudGVUaXBvcywgcmF3QXNpc3RlbnRlVGlwbyk7XHJcbiAgICAgIHNldEFzaXN0ZW50ZVRpcG8obm9ybWFsaXplZEFzaXN0ZW50ZVRpcG8gfHwgaW5pdGlhbEFzaXN0ZW50ZSk7XHJcbiAgICAgIHNldERlc2NyaXB0aW9uKFN0cmluZyhkYXRhLmRlc2NyaXB0aW9uID8/IGRhdGEuRGVzY3JpcHRpb24gPz8gXCJcIikpO1xyXG4gICAgICBzZXRDb21lbnRhcmlvcyhTdHJpbmcoZGF0YS5jb21lbnRhcmlvcyA/PyBkYXRhLkNvbWVudGFyaW9zID8/IFwiXCIpKTtcclxuICAgICAgc2V0QW50ZWNlZGVudGVzKFN0cmluZyhkYXRhLmFudGVjZWRlbnRlcyA/PyBkYXRhLkFudGVjZWRlbnRlcyA/PyBcIlwiKSk7XHJcbiAgICAgIHNldENvbmNsdXNpb25lcyhTdHJpbmcoZGF0YS5jb25jbHVzaW9uZXMgPz8gZGF0YS5Db25jbHVzaW9uZXMgPz8gXCJcIikpO1xyXG4gICAgfSBjYXRjaCB7XHJcbiAgICB9IGZpbmFsbHkge1xyXG4gICAgICBzZXRJc0h5ZHJhdGluZyhmYWxzZSk7XHJcbiAgICAgIC8vIEFwcGx5IGFueSBwZW5kaW5nIGRyYWZ0IHZhbHVlcyBmaXJzdCwgdGhlbiBvdmVycmlkZSB3aXRoIHRleHQgZWRpdG9yIHZhbHVlcy5cclxuICAgICAgYXBwbHlEcmFmdFZhbHVlcygpO1xyXG4gICAgICBhcHBseVRleHRFZGl0b3JWYWx1ZXMoKTtcclxuICAgIH1cclxuICB9LCBbXHJcbiAgICBhY3RpdmlkYWRJZCxcclxuICAgIGFzaXN0ZW50ZVRpcG9zLFxyXG4gICAgdmlzaXRUeXBlcyxcclxuICAgIG1hdGNoT3B0aW9uVmFsdWUsXHJcbiAgICBub3JtYWxpemVEYXRlVG9JbnB1dCxcclxuICAgIGluaXRpYWxBc2lzdGVudGUsXHJcbiAgICBkZWZhdWx0VmlzaXRUeXBlLFxyXG4gICAgYXBwbHlUZXh0RWRpdG9yVmFsdWVzLFxyXG4gICAgYXBwbHlEcmFmdFZhbHVlc1xyXG4gIF0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKHNob3VsZEh5ZHJhdGUpIHtcclxuICAgICAgaHlkcmF0ZUZyb21BcGkoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGFwcGx5RHJhZnRWYWx1ZXMoKTtcclxuICAgICAgYXBwbHlUZXh0RWRpdG9yVmFsdWVzKCk7XHJcbiAgICB9XHJcbiAgfSwgW2RldGFpbCwgaHlkcmF0ZUZyb21BcGksIHNob3VsZEh5ZHJhdGUsIGFwcGx5VGV4dEVkaXRvclZhbHVlcywgYXBwbHlEcmFmdFZhbHVlc10pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGVsID0gcmVhZE9ubHlTdXJmYWNlUmVmLmN1cnJlbnQ7XG4gICAgaWYgKCFlbCkgcmV0dXJuO1xuICAgIGlmICghaXNFZGl0aW5nKSB7XG4gICAgICBlbC5jbGFzc0xpc3QuYWRkKFwiaW5kLXJlYWRvbmx5LXN1cmZhY2VcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoXCJpbmQtcmVhZG9ubHktc3VyZmFjZVwiKTtcbiAgICB9XG4gIH0sIFtpc0VkaXRpbmddKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChpc0VkaXRpbmcpIHtcbiAgICAgIGlmICghZWRpdFNuYXBzaG90UmVmLmN1cnJlbnQpIHtcbiAgICAgICAgZWRpdFNuYXBzaG90UmVmLmN1cnJlbnQgPSB7XG4gICAgICAgICAgdHJhbnNEYXRlLFxuICAgICAgICAgIHZpc2l0VHlwZSxcbiAgICAgICAgICBhc2lzdGVudGVUaXBvLFxuICAgICAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgICAgIGNvbWVudGFyaW9zLFxuICAgICAgICAgIGFudGVjZWRlbnRlcyxcbiAgICAgICAgICBjb25jbHVzaW9uZXNcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZWRpdFNuYXBzaG90UmVmLmN1cnJlbnQgPSBudWxsO1xuICB9LCBbaXNFZGl0aW5nLCB0cmFuc0RhdGUsIHZpc2l0VHlwZSwgYXNpc3RlbnRlVGlwbywgZGVzY3JpcHRpb24sIGNvbWVudGFyaW9zLCBhbnRlY2VkZW50ZXMsIGNvbmNsdXNpb25lc10pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKGlzRWRpdGluZykgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICByZXR1cm4gYmluZFJlYWRPbmx5R3VhcmQocmVhZE9ubHlTdXJmYWNlUmVmLmN1cnJlbnQpO1xuICB9LCBbaXNFZGl0aW5nXSk7XG5cbiAgLy8gVG9nZ2xlIHRvcGJhciBlZGl0L3NhdmUgaWNvbnMgYmFzZWQgb24gZWRpdGluZyBzdGF0ZS5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBlZGl0SWNvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlzaXRFZGl0SWNvblwiKTtcbiAgICBjb25zdCBzYXZlSWNvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlzaXRTYXZlSWNvblwiKTtcbiAgICBjb25zdCBkZWxldGVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpc2l0RGVsZXRlQnRuXCIpO1xuICAgIGNvbnN0IGNhbmNlbEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlzaXRDYW5jZWxCdG5cIik7XG4gICAgaWYgKCFlZGl0SWNvbiB8fCAhc2F2ZUljb24pIHJldHVybjtcbiAgICBpZiAoaXNFZGl0aW5nKSB7XG4gICAgICBlZGl0SWNvbi5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgc2F2ZUljb24uY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICAgIGlmIChkZWxldGVCdG4pIGRlbGV0ZUJ0bi5jbGFzc0xpc3QuYWRkKFwidG9wYmFyLWhpZGRlblwiKTtcbiAgICAgIGlmIChjYW5jZWxCdG4pIGNhbmNlbEJ0bi5jbGFzc0xpc3QucmVtb3ZlKFwidG9wYmFyLWhpZGRlblwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWRpdEljb24uY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICAgIHNhdmVJY29uLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICBpZiAoZGVsZXRlQnRuKSBkZWxldGVCdG4uY2xhc3NMaXN0LnJlbW92ZShcInRvcGJhci1oaWRkZW5cIik7XG4gICAgICBpZiAoY2FuY2VsQnRuKSBjYW5jZWxCdG4uY2xhc3NMaXN0LmFkZChcInRvcGJhci1oaWRkZW5cIik7XG4gICAgfVxuICB9LCBbaXNFZGl0aW5nXSk7XG5cclxuICBjb25zdCBoYW5kbGVFbmFibGVFZGl0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmICghY2FuRWRpdEhpc3RvcnkpIHtcbiAgICAgIHNob3dQZXJtaXNzaW9uTW9kYWwoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgc2V0SXNFZGl0aW5nKHRydWUpO1xuICAgIHN5bmNFZGl0TW9kZUZsYWcodHJ1ZSk7XG4gICAgc2V0U3RhdHVzKGluZFQoXCJWaXNpdHNfRGV0YWlsX0VkaXRpbmdFbmFibGVkXCIsIFwiRWRpdGluZyBlbmFibGVkXCIpKTtcbiAgfSwgW3N5bmNFZGl0TW9kZUZsYWddKTtcblxuICBjb25zdCBoYW5kbGVDYW5jZWxFZGl0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmICghaXNFZGl0aW5nKSByZXR1cm47XG4gICAgc2V0SXNFZGl0aW5nKGZhbHNlKTtcbiAgICBzeW5jRWRpdE1vZGVGbGFnKGZhbHNlKTtcbiAgICBjbGVhckRyYWZ0KCk7XG4gICAgc2V0U3RhdHVzKGluZFQoXCJDb21tb25fQ2FuY2VsXCIsIFwiQ2FuY2VsXCIpKTtcbiAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gIH0sIFtpc0VkaXRpbmcsIHN5bmNFZGl0TW9kZUZsYWcsIGNsZWFyRHJhZnRdKTtcblxyXG4gIGNvbnN0IGhhbmRsZVVwZGF0ZSA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcclxuICAgIGlmIChidXN5IHx8ICFpc0VkaXRpbmcpIHJldHVybiBmYWxzZTtcclxuICAgIGlmICghY2FuRWRpdEhpc3RvcnkpIHtcclxuICAgICAgc2hvd1Blcm1pc3Npb25Nb2RhbCgpO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xyXG4gICAgc2V0QnVzeSh0cnVlKTtcclxuICAgIHNldFN0YXR1cyhpbmRUKFwiVmlzaXRzX0RldGFpbF9VcGRhdGluZ1wiLCBcIlVwZGF0aW5nIGFjdGl2aXR5Li4uXCIpKTtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRWaXNpdFR5cGUgPVxyXG4gICAgICAgIG1hdGNoT3B0aW9uVmFsdWUodmlzaXRUeXBlcywgdmlzaXRUeXBlKSB8fFxyXG4gICAgICAgIG1hdGNoT3B0aW9uVmFsdWUodmlzaXRUeXBlcywgcmF3SW5pdGlhbFZpc2l0VHlwZSkgfHxcclxuICAgICAgICBkZWZhdWx0VmlzaXRUeXBlO1xyXG4gICAgICBjb25zdCBub3JtYWxpemVkQXNpc3RlbnRlVGlwbyA9XHJcbiAgICAgICAgbWF0Y2hPcHRpb25WYWx1ZShhc2lzdGVudGVUaXBvcywgYXNpc3RlbnRlVGlwbykgfHxcclxuICAgICAgICBtYXRjaE9wdGlvblZhbHVlKGFzaXN0ZW50ZVRpcG9zLCByYXdJbml0aWFsQXNpc3RlbnRlKSB8fFxyXG4gICAgICAgIHJhd0luaXRpYWxBc2lzdGVudGU7XHJcbiAgICAgIGNvbnN0IHBheWxvYWQgPSB7XHJcbiAgICAgICAgYWNjb3VudE51bTogYWNjb3VudE51bSxcclxuICAgICAgICB2aXNpdFR5cGU6IG5vcm1hbGl6ZWRWaXNpdFR5cGUsXHJcbiAgICAgICAgYXNpc3RlbnRlVGlwbzogbm9ybWFsaXplZEFzaXN0ZW50ZVRpcG8sXHJcbiAgICAgICAgZGVzY3JpcHRpb24sXHJcbiAgICAgICAgdHJhbnNEYXRlLFxyXG4gICAgICAgIGNvbWVudGFyaW9zLFxyXG4gICAgICAgIGFudGVjZWRlbnRlcyxcclxuICAgICAgICBjb25jbHVzaW9uZXNcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoSnNvbihgL1Zpc2l0YXMvVXBkYXRlQWN0aXZpdHkvJHtyZWNJZH1gLCB7XHJcbiAgICAgICAgbWV0aG9kOiBcIlBVVFwiLFxyXG4gICAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcclxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXlsb2FkKVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmICghcmVzLnN1Y2Nlc3MpIHRocm93IG5ldyBFcnJvcihyZXMubWVzc2FnZSB8fCBpbmRUKFwiVmlzaXRzX0RldGFpbF9VcGRhdGVGYWlsZWRcIiwgXCJVcGRhdGUgZmFpbGVkLlwiKSk7XHJcblxyXG4gICAgICBzZXRTdGF0dXMoaW5kVChcIlZpc2l0c19EZXRhaWxfVXBkYXRlZFwiLCBcIkFjdGl2aXR5IHVwZGF0ZWRcIikpO1xyXG4gICAgICBzZXRJc0VkaXRpbmcoZmFsc2UpO1xyXG4gICAgICBzeW5jRWRpdE1vZGVGbGFnKGZhbHNlKTtcclxuICAgICAgY2xlYXJEcmFmdCgpO1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBjb25zdCBtc2cgPSBlcnI/Lm1lc3NhZ2UgfHwgaW5kVChcIlZpc2l0c19EZXRhaWxfVXBkYXRlRXJyb3JcIiwgXCJVcGRhdGUgZXJyb3IuXCIpO1xyXG4gICAgICBzZXRNb2RhbEVycm9yKG1zZyk7XHJcbiAgICAgIHNldFN0YXR1cyhtc2cpO1xyXG4gICAgICBmbGFzaEFjdGlvbk1hcmsoXCJlcnJvclByb2Nlc3NcIiwgMTUwMCk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0gZmluYWxseSB7XHJcbiAgICAgIHNldEJ1c3koZmFsc2UpO1xyXG4gICAgfVxyXG4gIH0sIFthbnRlY2VkZW50ZXMsIGNvbWVudGFyaW9zLCBjb25jbHVzaW9uZXMsIGRlc2NyaXB0aW9uLCB0cmFuc0RhdGUsIHZpc2l0VHlwZSwgYXNpc3RlbnRlVGlwbywgdmlzaXRUeXBlcywgYXNpc3RlbnRlVGlwb3MsIG1hdGNoT3B0aW9uVmFsdWUsIGFjY291bnROdW0sIGJ1c3ksIGlzRWRpdGluZywgc3luY0VkaXRNb2RlRmxhZ10pO1xyXG5cclxuICBjb25zdCBoYW5kbGVEZWxldGUgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XHJcbiAgICBpZiAoYnVzeSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgaWYgKCFjYW5EZWxldGVIaXN0b3J5KSB7XHJcbiAgICAgIHNob3dQZXJtaXNzaW9uTW9kYWwoKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgc2V0TW9kYWxFcnJvcihcIlwiKTtcclxuICAgIHNldEJ1c3kodHJ1ZSk7XHJcbiAgICBzZXRTdGF0dXMoaW5kVChcIlZpc2l0c19EZXRhaWxfRGVsZXRpbmdcIiwgXCJEZWxldGluZyBhY3Rpdml0eS4uLlwiKSk7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaEpzb24oYC9WaXNpdGFzL0RlbGV0ZUFjdGl2aXR5LyR7cmVjSWR9YCwgeyBtZXRob2Q6IFwiREVMRVRFXCIgfSk7XHJcbiAgICAgIGlmICghcmVzLnN1Y2Nlc3MpIHRocm93IG5ldyBFcnJvcihyZXMubWVzc2FnZSB8fCBpbmRUKFwiVmlzaXRzX0RldGFpbF9EZWxldGVGYWlsZWRcIiwgXCJEZWxldGUgZmFpbGVkLlwiKSk7XHJcbiAgICAgIHNldFN0YXR1cyhpbmRUKFwiVmlzaXRzX0RldGFpbF9EZWxldGVkXCIsIFwiQWN0aXZpdHkgZGVsZXRlZFwiKSk7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGNvbnN0IG1zZyA9IGVycj8ubWVzc2FnZSB8fCBpbmRUKFwiVmlzaXRzX0RldGFpbF9EZWxldGVFcnJvclwiLCBcIkRlbGV0ZSBlcnJvci5cIik7XHJcbiAgICAgIHNldE1vZGFsRXJyb3IobXNnKTtcclxuICAgICAgc2V0U3RhdHVzKG1zZyk7XHJcbiAgICAgIGZsYXNoQWN0aW9uTWFyayhcImVycm9yUHJvY2Vzc1wiLCAxNTAwKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSBmaW5hbGx5IHtcclxuICAgICAgc2V0QnVzeShmYWxzZSk7XHJcbiAgICB9XHJcbiAgfSwgW2J1c3ksIHJlY0lkXSk7XHJcblxyXG4gIC8vIExpc3RlbiB0byB0b3BiYXIgaWNvbiBldmVudHNcclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3Qgb25FZGl0ID0gKCkgPT4ge1xyXG4gICAgICBpZiAoIWNhbkVkaXRIaXN0b3J5KSB7XHJcbiAgICAgICAgc2hvd1Blcm1pc3Npb25Nb2RhbCgpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBpZiAoaXNFZGl0aW5nKSB7XHJcbiAgICAgICAgaWYgKGJ1c3kgfHwgbW9kYWwub3BlbikgcmV0dXJuO1xyXG4gICAgICAgIHNldE1vZGFsRXJyb3IoXCJcIik7XHJcbiAgICAgICAgb3BlbkNvbmZpcm0oe1xyXG4gICAgICAgICAgdGl0bGU6IGluZFQoXCJWaXNpdHNfRGV0YWlsX1NhdmVDaGFuZ2VzX1RpdGxlXCIsIFwiU2F2ZSBjaGFuZ2VzXCIpLFxyXG4gICAgICAgICAgbWVzc2FnZTogaW5kVChcIlZpc2l0c19EZXRhaWxfU2F2ZUNoYW5nZXNfQm9keVwiLCBcIkRvIHlvdSB3YW50IHRvIHNhdmUgY2hhbmdlcz9cIiksXHJcbiAgICAgICAgICBjb25maXJtVGV4dDogaW5kVChcIkNvbW1vbl9TYXZlXCIsIFwiU2F2ZVwiKSxcclxuICAgICAgICAgIG9uQ29uZmlybTogYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBvayA9IGF3YWl0IGhhbmRsZVVwZGF0ZSgpO1xyXG4gICAgICAgICAgICBpZiAob2spIHtcclxuICAgICAgICAgICAgICBjbG9zZUNvbmZpcm0oKTtcclxuICAgICAgICAgICAgICBzZXRIaXN0b3J5RmlsdGVyRm9yRGF0ZSh0cmFuc0RhdGUpO1xyXG4gICAgICAgICAgICAgIGF3YWl0IHdhaXQoMjAwKTtcclxuICAgICAgICAgICAgICBmbGFzaEFjdGlvbk1hcmsoXCJva1Byb2Nlc3NcIiwgMTIwMCk7XHJcbiAgICAgICAgICAgICAgYXdhaXQgd2FpdCgxMjAwKTtcclxuICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL0hpc3RvcmlhbC9IaXN0b3J5XCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG9rO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGhhbmRsZUVuYWJsZUVkaXQoKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBvbkRlbGV0ZSA9ICgpID0+IHtcbiAgICAgIGlmICghY2FuRGVsZXRlSGlzdG9yeSkge1xuICAgICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChidXN5IHx8IG1vZGFsLm9wZW4pIHJldHVybjtcbiAgICAgIHNldE1vZGFsRXJyb3IoXCJcIik7XHJcbiAgICAgIG9wZW5Db25maXJtKHtcclxuICAgICAgICB0aXRsZTogaW5kVChcIlZpc2l0c19EZXRhaWxfRGVsZXRlQWN0aXZpdHlfVGl0bGVcIiwgXCJEZWxldGUgYWN0aXZpdHlcIiksXHJcbiAgICAgICAgbWVzc2FnZTogaW5kVChcIlZpc2l0c19EZXRhaWxfRGVsZXRlQWN0aXZpdHlfQm9keVwiLCBcIkRvIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGlzIGFjdGl2aXR5P1wiKSxcclxuICAgICAgICBjb25maXJtVGV4dDogaW5kVChcIkNvbW1vbl9EZWxldGVcIiwgXCJEZWxldGVcIiksXHJcbiAgICAgICAgb25Db25maXJtOiBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG9rID0gYXdhaXQgaGFuZGxlRGVsZXRlKCk7XHJcbiAgICAgICAgICAgIGlmIChvaykge1xyXG4gICAgICAgICAgICBjbG9zZUNvbmZpcm0oKTtcclxuICAgICAgICAgICAgc2V0SGlzdG9yeUZpbHRlckZvckRhdGUodHJhbnNEYXRlKTtcclxuICAgICAgICAgICAgYXdhaXQgd2FpdCgyMDApO1xyXG4gICAgICAgICAgICBmbGFzaEFjdGlvbk1hcmsoXCJva0RlbFByb2Nlc3NcIiwgMTIwMCk7XHJcbiAgICAgICAgICAgIGF3YWl0IHdhaXQoMTIwMCk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvSGlzdG9yaWFsL0hpc3RvcnlcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gb2s7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBjb25zdCBvbkNhbmNlbEVkaXQgPSAoKSA9PiB7XG4gICAgICBpZiAoYnVzeSB8fCBtb2RhbC5vcGVuKSByZXR1cm47XG4gICAgICBoYW5kbGVDYW5jZWxFZGl0KCk7XG4gICAgfTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInZpc2l0LWVkaXRcIiwgb25FZGl0KTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInZpc2l0LWRlbGV0ZVwiLCBvbkRlbGV0ZSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJ2aXNpdC1jYW5jZWwtZWRpdFwiLCBvbkNhbmNlbEVkaXQpO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInZpc2l0LWVkaXRcIiwgb25FZGl0KTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwidmlzaXQtZGVsZXRlXCIsIG9uRGVsZXRlKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwidmlzaXQtY2FuY2VsLWVkaXRcIiwgb25DYW5jZWxFZGl0KTtcbiAgICB9O1xuICB9LCBbYnVzeSwgbW9kYWwub3BlbiwgaGFuZGxlQ2FuY2VsRWRpdCwgaGFuZGxlRGVsZXRlLCBoYW5kbGVFbmFibGVFZGl0LCBoYW5kbGVVcGRhdGUsIGlzRWRpdGluZywgb3BlbkNvbmZpcm0sIHRyYW5zRGF0ZV0pO1xuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS00XCI+XHJcbiAgICAgIDxDb25maXJtTW9kYWxcclxuICAgICAgICBvcGVuPXttb2RhbC5vcGVufVxyXG4gICAgICAgIHRpdGxlPXttb2RhbC50aXRsZX1cclxuICAgICAgICBtZXNzYWdlPXttb2RhbC5tZXNzYWdlfVxyXG4gICAgICAgIGNvbmZpcm1UZXh0PXttb2RhbENvbmZpcm1UZXh0fVxyXG4gICAgICAgIGNhbmNlbFRleHQ9e21vZGFsQ2FuY2VsVGV4dH1cclxuICAgICAgICBsb2FkaW5nVGV4dD17bW9kYWxMb2FkaW5nVGV4dH1cclxuICAgICAgICBzaG93Q2FuY2VsPXttb2RhbC5zaG93Q2FuY2VsfVxyXG4gICAgICAgIHNob3dDb25maXJtPXttb2RhbC5zaG93Q29uZmlybX1cclxuICAgICAgICBidXN5PXtidXN5fVxyXG4gICAgICAgIGVycm9yPXttb2RhbEVycm9yfVxyXG4gICAgICAgIHN0YXR1cz17c3RhdHVzfVxyXG4gICAgICAgIG9uQ29uZmlybT17aGFuZGxlTW9kYWxCdXR0b25Db25maXJtfVxyXG4gICAgICAgIG9uQ2FuY2VsPXtjbG9zZUNvbmZpcm19XHJcbiAgICAgIC8+XHJcbiAgICAgIDxkaXZcclxuICAgICAgICByZWY9e3JlYWRPbmx5U3VyZmFjZVJlZn1cclxuICAgICAgICBjbGFzc05hbWU9XCJyZWxhdGl2ZSBzaGFkb3cteHMgZ2xhc3MtcGFuZWwgcC00IHNwYWNlLXktNCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCByb3VuZGVkLTJ4bFwiXHJcbiAgICAgID5cclxuICAgICAgICB7aXNIeWRyYXRpbmcgJiYgKFxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIHotMTAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgYmctd2hpdGUvNzAgcm91bmRlZC0yeGxcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0ZXh0LXNtIHRleHQtc2xhdGUtNjAwXCI+XHJcbiAgICAgICAgICAgICAgPFNwaW5uZXIgc2l6ZT1cImgtNSB3LTVcIiAvPlxyXG4gICAgICAgICAgICAgIDxzcGFuPntpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfTwvc3Bhbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApfVxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0yIGdhcC00IHB0LTFcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInZpc2l0YS1maWVsZC10ZXh0XCI+XHJcbiAgICAgICAgICAgIDxTaW5nbGVEYXRlUGlja2VyXG4gICAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiVmlzaXRzX0RldGFpbF9EYXRlX0xhYmVsXCIsIFwiRGF0ZVwiKX1cbiAgICAgICAgICAgICAgdmFsdWU9e3RyYW5zRGF0ZX1cbiAgICAgICAgICAgICAgb25DaGFuZ2U9e3NldFRyYW5zRGF0ZX1cbiAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFpc0VkaXRpbmd9XG4gICAgICAgICAgICAgIHJlYWRPbmx5PXshaXNFZGl0aW5nfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8U2VsZWN0Q29tYm9ib3hcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiVmlzaXRzX0RldGFpbF9WaXNpdFR5cGVfTGFiZWxcIiwgXCJWaXNpdCB0eXBlXCIpfVxuICAgICAgICAgICAgb3B0aW9ucz17dmlzaXRUeXBlc31cbiAgICAgICAgICAgIHZhbHVlPXt2aXNpdFR5cGV9XG4gICAgICAgICAgICBvbkNoYW5nZT17c2V0VmlzaXRUeXBlfVxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJWaXNpdHNfRGV0YWlsX1Zpc2l0VHlwZV9QbGFjZWhvbGRlclwiLCBcIlNlbGVjdCB0eXBlXCIpfVxuICAgICAgICAgICAgZGlzYWJsZWQ9eyFpc0VkaXRpbmd9XG4gICAgICAgICAgICByZWFkT25seT17IWlzRWRpdGluZ31cbiAgICAgICAgICAgIHVzZVBvcnRhbD17ZmFsc2V9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBnYXAtM1wiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cclxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZFwiPntpbmRUKFwiVmlzaXRzX0ZpZWxkX0Rlc2NyaXB0aW9uXCIsIFwiRGVzY3JpcHRpb25cIil9PC9sYWJlbD5cclxuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgIGlkPVwiZGVzY3JpcHRpb25cIlxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICAgICAgXCJmb3JtLWNvbnRyb2xcIixcbiAgICAgICAgICAgICAgICBpc0VkaXRpbmcgPyBcImJvcmRlci1zbGF0ZS0yMDAgdGV4dC1zbGF0ZS05MDBcIiA6IFwiYm9yZGVyLXNsYXRlLTIwMCBpbmQtcmVhZG9ubHktZmllbGRcIlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICBtYXhMZW5ndGg9ezIwMH1cbiAgICAgICAgICAgICAgdmFsdWU9e2Rlc2NyaXB0aW9ufVxuICAgICAgICAgICAgICBkaXNhYmxlZD17IWlzRWRpdGluZ31cbiAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXREZXNjcmlwdGlvbihlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cclxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZFwiPntpbmRUKFwiVmlzaXRzX0ZpZWxkX0NvbW1lbnRzXCIsIFwiQ29tbWVudHNcIil9PC9sYWJlbD5cclxuICAgICAgICAgICAgPHRleHRhcmVhXG4gICAgICAgICAgICAgIGlkPVwiY29tZW50YXJpb3NcIlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgICAgICAgICAgIFwiZm9ybS1jb250cm9sIGN1cnNvci1wb2ludGVyXCIsXG4gICAgICAgICAgICAgICAgICAhaXNFZGl0aW5nID8gXCJpbmQtcmVhZG9ubHktZmllbGRcIiA6IFwiXCJcbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICB2YWx1ZT17Y29tZW50YXJpb3N9XG4gICAgICAgICAgICAgIHJlYWRPbmx5XG4gICAgICAgICAgICAgIG9uUG9pbnRlckRvd249e2NvbWVudGFyaW9zVGFwLm9uUG9pbnRlckRvd259XHJcbiAgICAgICAgICAgICAgb25Qb2ludGVyTW92ZT17Y29tZW50YXJpb3NUYXAub25Qb2ludGVyTW92ZX1cclxuICAgICAgICAgICAgICBvblBvaW50ZXJVcD17Y29tZW50YXJpb3NUYXAub25Qb2ludGVyVXB9XHJcbiAgICAgICAgICAgICAgb25Qb2ludGVyQ2FuY2VsPXtjb21lbnRhcmlvc1RhcC5vblBvaW50ZXJDYW5jZWx9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yXCI+XHJcbiAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb3JtLWxhYmVsIGZvbnQtc2VtaWJvbGRcIj57aW5kVChcIlZpc2l0c19GaWVsZF9CYWNrZ3JvdW5kXCIsIFwiQmFja2dyb3VuZFwiKX08L2xhYmVsPlxyXG4gICAgICAgICAgICA8dGV4dGFyZWFcbiAgICAgICAgICAgICAgaWQ9XCJhbnRlY2VkZW50ZXNcIlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgICAgICAgICAgIFwiZm9ybS1jb250cm9sIGN1cnNvci1wb2ludGVyXCIsXG4gICAgICAgICAgICAgICAgICAhaXNFZGl0aW5nID8gXCJpbmQtcmVhZG9ubHktZmllbGRcIiA6IFwiXCJcbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICB2YWx1ZT17YW50ZWNlZGVudGVzfVxuICAgICAgICAgICAgICByZWFkT25seVxuICAgICAgICAgICAgICBvblBvaW50ZXJEb3duPXthbnRlY2VkZW50ZXNUYXAub25Qb2ludGVyRG93bn1cclxuICAgICAgICAgICAgICBvblBvaW50ZXJNb3ZlPXthbnRlY2VkZW50ZXNUYXAub25Qb2ludGVyTW92ZX1cclxuICAgICAgICAgICAgICBvblBvaW50ZXJVcD17YW50ZWNlZGVudGVzVGFwLm9uUG9pbnRlclVwfVxyXG4gICAgICAgICAgICAgIG9uUG9pbnRlckNhbmNlbD17YW50ZWNlZGVudGVzVGFwLm9uUG9pbnRlckNhbmNlbH1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cclxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZFwiPntpbmRUKFwiVmlzaXRzX0ZpZWxkX0NvbmNsdXNpb25zXCIsIFwiQ29uY2x1c2lvbnNcIil9PC9sYWJlbD5cclxuICAgICAgICAgICAgPHRleHRhcmVhXG4gICAgICAgICAgICAgIGlkPVwiY29uY2x1c2lvbmVzXCJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICAgICAgICBcImZvcm0tY29udHJvbCBjdXJzb3ItcG9pbnRlclwiLFxuICAgICAgICAgICAgICAgICAgIWlzRWRpdGluZyA/IFwiaW5kLXJlYWRvbmx5LWZpZWxkXCIgOiBcIlwiXG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgdmFsdWU9e2NvbmNsdXNpb25lc31cbiAgICAgICAgICAgICAgcmVhZE9ubHlcbiAgICAgICAgICAgICAgb25Qb2ludGVyRG93bj17Y29uY2x1c2lvbmVzVGFwLm9uUG9pbnRlckRvd259XHJcbiAgICAgICAgICAgICAgb25Qb2ludGVyTW92ZT17Y29uY2x1c2lvbmVzVGFwLm9uUG9pbnRlck1vdmV9XHJcbiAgICAgICAgICAgICAgb25Qb2ludGVyVXA9e2NvbmNsdXNpb25lc1RhcC5vblBvaW50ZXJVcH1cclxuICAgICAgICAgICAgICBvblBvaW50ZXJDYW5jZWw9e2NvbmNsdXNpb25lc1RhcC5vblBvaW50ZXJDYW5jZWx9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMyB0ZXh0LXNtIHRleHQtc2xhdGUtNjAwXCI+XHJcbiAgICAgICAgICA8c3Bhbj57c3RhdHVzfTwvc3Bhbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxudHlwZSBFcnJvckJvdW5kYXJ5U3RhdGUgPSB7IGhhc0Vycm9yOiBib29sZWFuIH07XHJcblxyXG5jbGFzcyBFcnJvckJvdW5kYXJ5IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PFJlYWN0LlByb3BzV2l0aENoaWxkcmVuPHt9PiwgRXJyb3JCb3VuZGFyeVN0YXRlPiB7XHJcbiAgY29uc3RydWN0b3IocHJvcHM6IFJlYWN0LlByb3BzV2l0aENoaWxkcmVuPHt9Pikge1xyXG4gICAgc3VwZXIocHJvcHMpO1xyXG4gICAgdGhpcy5zdGF0ZSA9IHsgaGFzRXJyb3I6IGZhbHNlIH07XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZ2V0RGVyaXZlZFN0YXRlRnJvbUVycm9yKCkge1xyXG4gICAgcmV0dXJuIHsgaGFzRXJyb3I6IHRydWUgfTtcclxuICB9XHJcblxyXG4gIGNvbXBvbmVudERpZENhdGNoKGVycm9yLCBpbmZvKSB7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICBpZiAodGhpcy5zdGF0ZS5oYXNFcnJvcikge1xyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IHJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci1yb3NlLTIwMCBiZy1yb3NlLTUwIHRleHQtcm9zZS03MDBcIj5cclxuICAgICAgICAgIHtpbmRUKFwiVmlzaXRzX0RldGFpbF9FcnJvckJvdW5kYXJ5XCIsIFwiQW4gZXJyb3Igb2NjdXJyZWQgd2hpbGUgcmVuZGVyaW5nIHRoZSBkZXRhaWwgcGFnZS4gUmVsb2FkIGFuZCB0cnkgYWdhaW4uXCIpfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMucHJvcHMuY2hpbGRyZW47XHJcbiAgfVxyXG59XHJcblxyXG4vLyBEZXRhaWwgVUkgd3JhcHBlZCBieSB0aGUgZXJyb3IgYm91bmRhcnkuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIERldGFpbEZvcm0oKSB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxFcnJvckJvdW5kYXJ5PlxyXG4gICAgICA8RGV0YWlsQXBwIC8+XHJcbiAgICA8L0Vycm9yQm91bmRhcnk+XHJcbiAgKTtcclxufVxyXG4iLCAiZXhwb3J0IGNvbnN0IGJpbmRSZWFkT25seUd1YXJkID0gKGVsOiBIVE1MRWxlbWVudCB8IG51bGwpID0+IHtcbiAgaWYgKCFlbCkgcmV0dXJuICgpID0+IHt9O1xuICBjb25zdCBjYW5jZWwgPSAoZXZlbnQ6IEV2ZW50KSA9PiBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICBjb25zdCBldmVudHMgPSBbXCJjb250ZXh0bWVudVwiLCBcInNlbGVjdHN0YXJ0XCIsIFwiY29weVwiLCBcImN1dFwiLCBcInBhc3RlXCJdO1xuICBldmVudHMuZm9yRWFjaCgoZXZ0KSA9PiBlbC5hZGRFdmVudExpc3RlbmVyKGV2dCwgY2FuY2VsKSk7XG4gIHJldHVybiAoKSA9PiB7XG4gICAgZXZlbnRzLmZvckVhY2goKGV2dCkgPT4gZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihldnQsIGNhbmNlbCkpO1xuICB9O1xufTtcbiIsICJleHBvcnQgY29uc3QgaGFzVmFsdWUgPSAodmFsdWU6IHVua25vd24pID0+IFN0cmluZyh2YWx1ZSB8fCBcIlwiKS50cmltKCkubGVuZ3RoID4gMDtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLG9CQUEyQjs7O0FDRDNCLG1CQUFnRTs7O0FDQXpELElBQU0sb0JBQW9CLENBQUMsT0FBMkI7QUFDM0QsTUFBSSxDQUFDLEdBQUksUUFBTyxNQUFNO0FBQUEsRUFBQztBQUN2QixRQUFNLFNBQVMsQ0FBQyxVQUFpQixNQUFNLGVBQWU7QUFDdEQsUUFBTSxTQUFTLENBQUMsZUFBZSxlQUFlLFFBQVEsT0FBTyxPQUFPO0FBQ3BFLFNBQU8sUUFBUSxDQUFDLFFBQVEsR0FBRyxpQkFBaUIsS0FBSyxNQUFNLENBQUM7QUFDeEQsU0FBTyxNQUFNO0FBQ1gsV0FBTyxRQUFRLENBQUMsUUFBUSxHQUFHLG9CQUFvQixLQUFLLE1BQU0sQ0FBQztBQUFBLEVBQzdEO0FBQ0Y7OztBQ1JPLElBQU0sV0FBVyxDQUFDLFVBQW1CLE9BQU8sU0FBUyxFQUFFLEVBQUUsS0FBSyxFQUFFLFNBQVM7OztBRndzQjFFO0FBcnJCTixJQUFNLFlBQVksTUFBTTtBQUN0QixRQUFNLEVBQUUsWUFBWSxlQUFlLElBQUksV0FBVztBQUNsRCxRQUFNLGlCQUFpQixVQUFVLHFCQUFxQixNQUFNO0FBQzVELFFBQU0sbUJBQW1CLFVBQVUscUJBQXFCLFlBQVk7QUFjcEUsUUFBTSxTQUFVLE9BQU8sdUJBQWlELENBQUM7QUFFekUsUUFBTSxnQkFBZ0I7QUFBQSxJQUNwQixPQUFPLFNBQ0wsT0FBTyxTQUNQLE9BQU8scUJBQ1AsT0FBTyxxQkFDUCxPQUFPLGtCQUNQLE9BQU8sa0JBQ1A7QUFBQSxFQUNKLEVBQUUsS0FBSztBQUVQLFFBQU0sbUJBQW1CLGdCQUFnQixVQUFVLGFBQWEsS0FBSztBQUNyRSxRQUFNLHFCQUFxQixHQUFHLGdCQUFnQjtBQUM5QyxRQUFNLHNCQUFzQixHQUFHLGdCQUFnQjtBQUMvQyxRQUFNLHNCQUFzQixHQUFHLGdCQUFnQjtBQUUvQyxRQUFNLDJCQUF1QiwwQkFBWSxDQUFDLFVBQVU7QUFDbEQsUUFBSSxDQUFDLE1BQU8sUUFBTztBQUNuQixVQUFNLE1BQU0sT0FBTyxLQUFLLEVBQUUsS0FBSztBQUMvQixRQUFJLENBQUMsSUFBSyxRQUFPO0FBRWpCLFFBQUksc0JBQXNCLEtBQUssR0FBRyxFQUFHLFFBQU87QUFFNUMsUUFBSSw4QkFBOEIsS0FBSyxHQUFHLEdBQUc7QUFDM0MsWUFBTSxRQUFRLElBQUksTUFBTSxPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQztBQUMzRCxVQUFJLE1BQU0sV0FBVyxLQUFLLENBQUMsT0FBTyxNQUFNLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLE1BQU0sTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sTUFBTSxNQUFNLENBQUMsQ0FBQyxHQUFHO0FBQ3ZHLGNBQU0sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJO0FBQ2xCLGNBQU0sS0FBSyxPQUFPLENBQUMsRUFBRSxTQUFTLEdBQUcsR0FBRztBQUNwQyxjQUFNLEtBQUssT0FBTyxDQUFDLEVBQUUsU0FBUyxHQUFHLEdBQUc7QUFDcEMsZUFBTyxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRTtBQUFBLE1BQ3pCO0FBQUEsSUFDRjtBQUNBLFVBQU0sS0FBSyxJQUFJLEtBQUssR0FBRztBQUN2QixRQUFJLENBQUMsT0FBTyxNQUFNLEdBQUcsUUFBUSxDQUFDLEdBQUc7QUFDL0IsWUFBTSxPQUFPLEdBQUcsWUFBWTtBQUM1QixZQUFNLEtBQUssT0FBTyxHQUFHLFNBQVMsSUFBSSxDQUFDLEVBQUUsU0FBUyxHQUFHLEdBQUc7QUFDcEQsWUFBTSxLQUFLLE9BQU8sR0FBRyxRQUFRLENBQUMsRUFBRSxTQUFTLEdBQUcsR0FBRztBQUMvQyxhQUFPLEdBQUcsSUFBSSxJQUFJLEVBQUUsSUFBSSxFQUFFO0FBQUEsSUFDNUI7QUFDQSxXQUFPO0FBQUEsRUFDVCxHQUFHLENBQUMsQ0FBQztBQUVMLFFBQU0sdUJBQW1CLDBCQUFZLENBQUMsU0FBUyxRQUFRO0FBQ3JELFFBQUksT0FBTyxLQUFNLFFBQU87QUFDeEIsVUFBTSxTQUFTLE9BQU8sR0FBRyxFQUFFLEtBQUs7QUFDaEMsUUFBSSxDQUFDLE9BQVEsUUFBTztBQUVwQixVQUFNLGdCQUFnQixDQUFDLE1BQ3JCLE9BQU8sS0FBSyxFQUFFLEVBQ1gsWUFBWSxFQUNaLFVBQVUsS0FBSyxFQUNmLFFBQVEsb0JBQW9CLEVBQUUsRUFDOUIsS0FBSztBQUVWLFVBQU0sVUFBVSxjQUFjLE1BQU07QUFDcEMsVUFBTSxVQUFVLFFBQVEsU0FBUyxHQUFHLElBQUksR0FBRyxRQUFRLE1BQU0sR0FBRyxFQUFFLENBQUMsTUFBTTtBQUVyRSxVQUFNLFNBQVMsV0FBVyxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU07QUFDeEMsWUFBTSxNQUFNLE9BQU8sR0FBRyxTQUFTLEdBQUcsU0FBUyxFQUFFLEVBQUUsS0FBSztBQUNwRCxZQUFNLE9BQU8sT0FBTyxHQUFHLFFBQVEsR0FBRyxRQUFRLEVBQUUsRUFBRSxLQUFLO0FBQ25ELFlBQU0sV0FBVyxjQUFjLElBQUk7QUFDbkMsYUFBTyxRQUFRLFVBQVUsUUFBUSxXQUFXLGFBQWEsV0FBVyxhQUFhO0FBQUEsSUFDbkYsQ0FBQztBQUNELFdBQU8sUUFBUSxPQUFPLE1BQU0sU0FBUyxNQUFNLFNBQVMsTUFBTSxJQUFJO0FBQUEsRUFDaEUsR0FBRyxDQUFDLENBQUM7QUFFTCxRQUFNLG1CQUFtQixxQkFBcUIsT0FBTyxPQUFPLGFBQWEsT0FBTyxhQUFhLEVBQUUsQ0FBQztBQUNoRyxRQUFNLG1CQUFtQixXQUFXLENBQUMsR0FBRyxTQUFTLFdBQVcsQ0FBQyxHQUFHLFNBQVM7QUFDekUsUUFBTSxzQkFBc0I7QUFBQSxJQUMxQixPQUFPLGNBQWMsT0FBTyxjQUFjLE9BQU8sYUFBYSxPQUFPLGFBQWE7QUFBQSxFQUNwRjtBQUNBLFFBQU0sbUJBQW1CLGlCQUFpQixZQUFZLG1CQUFtQixLQUFLO0FBQzlFLFFBQU0sc0JBQXNCO0FBQUEsSUFDMUIsT0FBTyxpQkFBaUIsT0FBTyxrQkFBa0IsZUFBZSxDQUFDLEdBQUcsU0FBUyxlQUFlLENBQUMsR0FBRyxTQUFTO0FBQUEsRUFDM0c7QUFDQSxRQUFNLG1CQUFtQixpQkFBaUIsZ0JBQWdCLG1CQUFtQixLQUFLO0FBRWxGLFFBQU0sQ0FBQyxXQUFXLFlBQVksUUFBSSx1QkFBUyxnQkFBZ0I7QUFDM0QsUUFBTSxDQUFDLFdBQVcsWUFBWSxRQUFJLHVCQUFTLGdCQUFnQjtBQUMzRCxRQUFNLENBQUMsZUFBZSxnQkFBZ0IsUUFBSSx1QkFBUyxnQkFBZ0I7QUFDbkUsUUFBTSxDQUFDLGFBQWEsY0FBYyxRQUFJLHVCQUFTLE9BQU8sT0FBTyxlQUFlLE9BQU8sZUFBZSxFQUFFLENBQUM7QUFDckcsUUFBTSxDQUFDLGFBQWEsY0FBYyxRQUFJLHVCQUFTLE9BQU8sT0FBTyxlQUFlLE9BQU8sZUFBZSxFQUFFLENBQUM7QUFDckcsUUFBTSxDQUFDLGNBQWMsZUFBZSxRQUFJLHVCQUFTLE9BQU8sT0FBTyxnQkFBZ0IsT0FBTyxnQkFBZ0IsRUFBRSxDQUFDO0FBQ3pHLFFBQU0sQ0FBQyxjQUFjLGVBQWUsUUFBSSx1QkFBUyxPQUFPLE9BQU8sZ0JBQWdCLE9BQU8sZ0JBQWdCLEVBQUUsQ0FBQztBQUN6RyxRQUFNLENBQUMsUUFBUSxTQUFTLFFBQUksdUJBQVMsRUFBRTtBQUN2QyxRQUFNLENBQUMsTUFBTSxPQUFPLFFBQUksdUJBQVMsS0FBSztBQUN0QyxRQUFNLENBQUMsV0FBVyxZQUFZLFFBQUksdUJBQVMsS0FBSztBQUNoRCxRQUFNLENBQUMsYUFBYSxjQUFjLFFBQUksdUJBQVMsS0FBSztBQUNwRCxRQUFNLENBQUMsWUFBWSxhQUFhLFFBQUksdUJBQVMsRUFBRTtBQUMvQyxRQUFNLHlCQUFxQixxQkFBTyxJQUFJO0FBQ3RDLFFBQU0scUJBQWlCLHFCQUFPLEVBQUU7QUFDaEMsUUFBTSxrQkFBYyxxQkFBTyxFQUFFO0FBQzdCLFFBQU0sMkJBQXVCLHFCQUFzQixJQUFJO0FBQ3ZELFFBQU0sc0JBQWtCLHFCQUFPLElBQUk7QUFFbkMsUUFBTSxRQUFRLE9BQU8sT0FBTyxTQUFTLE9BQU8sU0FBUyxFQUFFO0FBQ3ZELFFBQU0sYUFBYSxPQUFPLE9BQU8sY0FBYyxPQUFPLGNBQWMsRUFBRTtBQUN0RSxRQUFNLGNBQWMsT0FBTyxPQUFPLGVBQWUsT0FBTyxlQUFlLEVBQUU7QUFHekUsUUFBTSx1QkFBbUIsMEJBQVksQ0FBQyxZQUFZO0FBQ2hELFVBQU0sTUFBTSxlQUFlO0FBQzNCLFFBQUksQ0FBQyxJQUFLO0FBQ1YsUUFBSTtBQUNGLFVBQUksUUFBUyxnQkFBZSxRQUFRLEtBQUssTUFBTTtBQUFBLFVBQzFDLGdCQUFlLFdBQVcsR0FBRztBQUFBLElBQ3BDLFFBQVE7QUFBQSxJQUVSO0FBQUEsRUFDRixHQUFHLENBQUMsQ0FBQztBQUVMLFFBQU0sMEJBQXNCLDBCQUFZLE1BQU07QUFDNUMsVUFBTSxTQUFTLGVBQWUsU0FBUztBQUN2QyxVQUFNLE1BQU0sa0JBQWtCLE1BQU07QUFDcEMsVUFBTSxZQUFZLEdBQUcsR0FBRztBQUN4QixVQUFNLFdBQVcsbUJBQW1CLE1BQU07QUFDMUMsbUJBQWUsVUFBVTtBQUN6QixRQUFJO0FBQ0YsWUFBTSxlQUFlLGVBQWUsUUFBUSxTQUFTLE1BQU07QUFDM0QsVUFBSSxjQUFjO0FBQ2hCLHVCQUFlLFdBQVcsU0FBUztBQUFBLE1BQ3JDO0FBQ0EsVUFBSSxrQkFBa0IsZ0JBQWdCLGVBQWUsUUFBUSxHQUFHLE1BQU0sUUFBUTtBQUM1RSxxQkFBYSxJQUFJO0FBQUEsTUFDbkIsT0FBTztBQUNMLHFCQUFhLEtBQUs7QUFDbEIsdUJBQWUsV0FBVyxHQUFHO0FBQzdCLHVCQUFlLFdBQVcsUUFBUTtBQUFBLE1BQ3BDO0FBQ0EsVUFBSSxDQUFDLGdCQUFnQjtBQUNuQix1QkFBZSxXQUFXLEdBQUc7QUFDN0IsdUJBQWUsV0FBVyxRQUFRO0FBQUEsTUFDcEM7QUFBQSxJQUNGLFFBQVE7QUFBQSxJQUVSO0FBQUEsRUFDRixHQUFHLENBQUMsYUFBYSxPQUFPLGNBQWMsQ0FBQztBQUV2Qyw4QkFBVSxNQUFNO0FBQ2Qsd0JBQW9CO0FBQUEsRUFDdEIsR0FBRyxDQUFDLG1CQUFtQixDQUFDO0FBRXhCLDhCQUFVLE1BQU07QUFDZCxVQUFNLGFBQWEsQ0FBQyxVQUErQjtBQUNqRCxZQUFNLFdBQVcsT0FBTyxnQkFBZ0IsZUFBZSxZQUFZLG1CQUM5RCxZQUFZLGlCQUFpQixZQUFZLEVBQUUsQ0FBQyxJQUM3QztBQUNKLFlBQU0sZ0JBQWdCLFVBQVUsU0FBUztBQUN6QyxVQUFJLE9BQU8sYUFBYSxlQUFlO0FBQ3JDLDRCQUFvQjtBQUFBLE1BQ3RCO0FBQUEsSUFDRjtBQUNBLFdBQU8saUJBQWlCLFlBQVksVUFBVTtBQUM5QyxXQUFPLE1BQU0sT0FBTyxvQkFBb0IsWUFBWSxVQUFVO0FBQUEsRUFDaEUsR0FBRyxDQUFDLG1CQUFtQixDQUFDO0FBRXhCLDhCQUFVLE1BQU07QUFDZCxVQUFNLE1BQU0sbUJBQW1CLGVBQWUsU0FBUyxTQUFTO0FBQ2hFLGdCQUFZLFVBQVU7QUFBQSxFQUN4QixHQUFHLENBQUMsYUFBYSxLQUFLLENBQUM7QUFFdkIsUUFBTSxnQkFBWSwwQkFBWSxDQUFDLFVBQVU7QUFDdkMsVUFBTSxNQUFNLFlBQVk7QUFDeEIsUUFBSSxDQUFDLElBQUs7QUFDVixRQUFJO0FBQ0YscUJBQWUsUUFBUSxLQUFLLEtBQUssVUFBVSxLQUFLLENBQUM7QUFBQSxJQUNuRCxRQUFRO0FBQUEsSUFFUjtBQUFBLEVBQ0YsR0FBRyxDQUFDLENBQUM7QUFFTCxRQUFNLGlCQUFhLDBCQUFZLE1BQU07QUFDbkMsVUFBTSxNQUFNLFlBQVk7QUFDeEIsUUFBSSxDQUFDLElBQUs7QUFDVixRQUFJO0FBQ0YscUJBQWUsV0FBVyxHQUFHO0FBQUEsSUFDL0IsUUFBUTtBQUFBLElBRVI7QUFBQSxFQUNGLEdBQUcsQ0FBQyxDQUFDO0FBRUwsUUFBTSx1QkFBbUIsMEJBQVksTUFBTTtBQUN6QyxVQUFNLE1BQU0sWUFBWTtBQUN4QixRQUFJLENBQUMsSUFBSztBQUNWLFFBQUk7QUFDRixZQUFNLE1BQU0sZUFBZSxRQUFRLEdBQUc7QUFDdEMsVUFBSSxDQUFDLElBQUs7QUFDVixZQUFNLFFBQVEsS0FBSyxNQUFNLEdBQUc7QUFDNUIsVUFBSSxDQUFDLFNBQVMsT0FBTyxVQUFVLFNBQVU7QUFDekMsVUFBSSxNQUFNLFVBQVcsY0FBYSxPQUFPLE1BQU0sU0FBUyxDQUFDO0FBQ3pELFVBQUksTUFBTSxjQUFjLE9BQVcsY0FBYSxPQUFPLE1BQU0sU0FBUyxDQUFDO0FBQ3ZFLFVBQUksTUFBTSxrQkFBa0IsT0FBVyxrQkFBaUIsT0FBTyxNQUFNLGFBQWEsQ0FBQztBQUNuRixVQUFJLE1BQU0sZ0JBQWdCLE9BQVcsZ0JBQWUsT0FBTyxNQUFNLFdBQVcsQ0FBQztBQUM3RSxVQUFJLE1BQU0sZ0JBQWdCLE9BQVcsZ0JBQWUsT0FBTyxNQUFNLFdBQVcsQ0FBQztBQUM3RSxVQUFJLE1BQU0saUJBQWlCLE9BQVcsaUJBQWdCLE9BQU8sTUFBTSxZQUFZLENBQUM7QUFDaEYsVUFBSSxNQUFNLGlCQUFpQixPQUFXLGlCQUFnQixPQUFPLE1BQU0sWUFBWSxDQUFDO0FBQUEsSUFDbEYsUUFBUTtBQUFBLElBRVI7QUFBQSxFQUNGLEdBQUcsQ0FBQyxDQUFDO0FBRUwsOEJBQVUsTUFBTTtBQUNkLFFBQUksQ0FBQyxXQUFXO0FBQ2QsVUFBSSxxQkFBcUIsU0FBUztBQUNoQyxxQkFBYSxxQkFBcUIsT0FBTztBQUN6Qyw2QkFBcUIsVUFBVTtBQUFBLE1BQ2pDO0FBQ0E7QUFBQSxJQUNGO0FBRUEsUUFBSSxxQkFBcUIsU0FBUztBQUNoQyxtQkFBYSxxQkFBcUIsT0FBTztBQUFBLElBQzNDO0FBRUEseUJBQXFCLFVBQVUsT0FBTyxXQUFXLE1BQU07QUFDckQsMkJBQXFCLFVBQVU7QUFDL0IsZ0JBQVU7QUFBQSxRQUNSO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSCxHQUFHLEdBQUc7QUFFTixXQUFPLE1BQU07QUFDWCxVQUFJLHFCQUFxQixTQUFTO0FBQ2hDLHFCQUFhLHFCQUFxQixPQUFPO0FBQ3pDLDZCQUFxQixVQUFVO0FBQUEsTUFDakM7QUFBQSxJQUNGO0FBQUEsRUFDRixHQUFHLENBQUMsV0FBVyxXQUFXLGVBQWUsYUFBYSxhQUFhLGNBQWMsY0FBYyxXQUFXLFNBQVMsQ0FBQztBQUVwSCxRQUFNLGtCQUNKLFNBQVMsS0FBSyxLQUNkLFNBQVMsVUFBVSxLQUNuQixTQUFTLE9BQU8sYUFBYSxPQUFPLGFBQWEsRUFBRTtBQUVyRCxRQUFNLGdCQUFnQixDQUFDLENBQUMsZUFBZSxDQUFDO0FBRXhDLFFBQU0scUJBQWlCO0FBQUEsSUFDckIsQ0FDRSxTQUNBLFlBQ0EsWUFDQSxVQUE2RSxDQUFDLE1BQzNFO0FBQ0wsWUFBTSxTQUFTLE9BQU8sV0FBVyxFQUFFLEVBQUUsS0FBSztBQUMxQyxZQUFNLFlBQVksT0FBTyxjQUFjLEVBQUUsRUFBRSxLQUFLO0FBQ2hELFlBQU0sV0FBVyxTQUFTLGFBQWE7QUFDdkMsWUFBTSxZQUFZLFNBQVMsY0FBYztBQUN6QyxZQUFNLGNBQWMsT0FBTyxTQUFTLGVBQWUsRUFBRSxFQUFFLEtBQUs7QUFDNUQsVUFBSSxRQUFRO0FBQ1YsY0FBTSxNQUFNLEdBQUcsa0JBQWtCLEdBQUcsTUFBTTtBQUMxQyxZQUFJO0FBRUYsY0FBSSxlQUFlLFFBQVEsR0FBRyxNQUFNLE1BQU07QUFDeEMsMkJBQWUsUUFBUSxLQUFLLE9BQU8sY0FBYyxFQUFFLENBQUM7QUFBQSxVQUN0RDtBQUFBLFFBQ0YsUUFBUTtBQUFBLFFBRVI7QUFBQSxNQUNGO0FBRUEsWUFBTSxZQUFZLEdBQUcsT0FBTyxTQUFTLFFBQVEsR0FBRyxPQUFPLFNBQVMsVUFBVSxFQUFFO0FBQzVFLFVBQUk7QUFDRixZQUFJLFFBQVE7QUFDVix5QkFBZSxRQUFRLEdBQUcsa0JBQWtCLEdBQUcsTUFBTSxjQUFjLFNBQVM7QUFBQSxRQUM5RTtBQUNBLFlBQUksYUFBYTtBQUNmLHlCQUFlLFFBQVEsR0FBRyxXQUFXLFdBQVcsR0FBRztBQUFBLFFBQ3JEO0FBQUEsTUFDRixRQUFRO0FBQUEsTUFFUjtBQUNBLFlBQU0sTUFDSixzQ0FBc0MsbUJBQW1CLFVBQVUsV0FBVyxFQUFFLENBQUMsZUFDbEUsbUJBQW1CLGFBQWEsY0FBYyxFQUFFLENBQUMsY0FDbEQsbUJBQW1CLFNBQVMsQ0FBQyxhQUM5QixXQUFXLE1BQU0sR0FBRyxjQUNuQixZQUFZLE1BQU0sR0FBRyxNQUNsQyxjQUFjLGdCQUFnQixtQkFBbUIsV0FBVyxDQUFDLEtBQUs7QUFFckUsYUFBTyxTQUFTLE9BQU87QUFBQSxJQUN2QjtBQUFBLElBQ0EsQ0FBQztBQUFBLEVBQ0g7QUFFQSxRQUFNLDJCQUF1QiwwQkFBWSxDQUFDLFVBQVU7QUFDbEQsVUFBTSxlQUFlO0FBQ3JCLG1CQUFlLG9CQUFvQixLQUFLLHlCQUF5QixVQUFVLEdBQUcsYUFBYTtBQUFBLE1BQ3pGLFVBQVUsQ0FBQztBQUFBLE1BQ1gsV0FBVztBQUFBLE1BQ1gsYUFBYSxlQUFlO0FBQUEsSUFDOUIsQ0FBQztBQUFBLEVBQ0gsR0FBRyxDQUFDLGFBQWEsV0FBVyxnQkFBZ0IsY0FBYyxDQUFDO0FBRTNELFFBQU0sNEJBQXdCLDBCQUFZLENBQUMsUUFBUSxZQUFZO0FBQzdELFFBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxNQUFNLEVBQUcsUUFBTztBQUM5QyxxQkFBaUIsTUFBTTtBQUN2QixXQUFPLG1CQUFtQixPQUFPLGVBQWUsRUFBRSxHQUFHLE9BQU87QUFBQSxFQUM5RCxHQUFHLENBQUMsV0FBVyxDQUFDO0FBRWhCLFFBQU0sNEJBQXdCLDBCQUFZLENBQUMsVUFBVTtBQUNuRCxVQUFNLGVBQWU7QUFDckIsbUJBQWUscUJBQXFCLEtBQUssMkJBQTJCLFlBQVksR0FBRyxjQUFjO0FBQUEsTUFDL0YsVUFBVSxDQUFDO0FBQUEsTUFDWCxXQUFXO0FBQUEsTUFDWCxhQUFhLGVBQWU7QUFBQSxJQUM5QixDQUFDO0FBQUEsRUFDSCxHQUFHLENBQUMsY0FBYyxXQUFXLGdCQUFnQixjQUFjLENBQUM7QUFFNUQsUUFBTSw2QkFBeUIsMEJBQVksQ0FBQyxRQUFRLFlBQVk7QUFDOUQsUUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLE1BQU0sRUFBRyxRQUFPO0FBQzlDLHFCQUFpQixNQUFNO0FBQ3ZCLFdBQU8sbUJBQW1CLE9BQU8sZ0JBQWdCLEVBQUUsR0FBRyxPQUFPO0FBQUEsRUFDL0QsR0FBRyxDQUFDLFlBQVksQ0FBQztBQUVqQixRQUFNLDRCQUF3QiwwQkFBWSxDQUFDLFVBQVU7QUFDbkQsVUFBTSxlQUFlO0FBQ3JCLG1CQUFlLHFCQUFxQixLQUFLLDRCQUE0QixhQUFhLEdBQUcsY0FBYztBQUFBLE1BQ2pHLFVBQVUsQ0FBQztBQUFBLE1BQ1gsV0FBVztBQUFBLE1BQ1gsYUFBYSxlQUFlO0FBQUEsSUFDOUIsQ0FBQztBQUFBLEVBQ0gsR0FBRyxDQUFDLGNBQWMsV0FBVyxnQkFBZ0IsY0FBYyxDQUFDO0FBRTVELFFBQU0sNkJBQXlCLDBCQUFZLENBQUMsUUFBUSxZQUFZO0FBQzlELFFBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxNQUFNLEVBQUcsUUFBTztBQUM5QyxxQkFBaUIsTUFBTTtBQUN2QixXQUFPLG1CQUFtQixPQUFPLGdCQUFnQixFQUFFLEdBQUcsT0FBTztBQUFBLEVBQy9ELEdBQUcsQ0FBQyxZQUFZLENBQUM7QUFFakIsUUFBTSxpQkFBaUIsWUFBWSxzQkFBc0IscUJBQXFCO0FBQzlFLFFBQU0sa0JBQWtCLFlBQVksdUJBQXVCLHNCQUFzQjtBQUNqRixRQUFNLGtCQUFrQixZQUFZLHVCQUF1QixzQkFBc0I7QUFFakYsUUFBTSw0QkFBd0IsMEJBQVksTUFBTTtBQUM5QyxVQUFNLGlCQUFpQiw0QkFBNEIsa0JBQWtCO0FBQ3JFLFFBQUksbUJBQW1CLEtBQU0sZ0JBQWUsY0FBYztBQUUxRCxVQUFNLGtCQUFrQiw0QkFBNEIsbUJBQW1CO0FBQ3ZFLFFBQUksb0JBQW9CLEtBQU0saUJBQWdCLGVBQWU7QUFFN0QsVUFBTSxrQkFBa0IsNEJBQTRCLG1CQUFtQjtBQUN2RSxRQUFJLG9CQUFvQixLQUFNLGlCQUFnQixlQUFlO0FBQUEsRUFDL0QsR0FBRyxDQUFDLG9CQUFvQixxQkFBcUIsbUJBQW1CLENBQUM7QUFFakUsOEJBQVUsTUFBTTtBQUNkLFFBQUksQ0FBQyxhQUFhO0FBQ2hCLDRCQUFzQjtBQUFBLElBQ3hCO0FBQ0EsVUFBTSxhQUFhLE1BQU0sc0JBQXNCO0FBQy9DLFdBQU8saUJBQWlCLFlBQVksVUFBVTtBQUM5QyxXQUFPLE1BQU0sT0FBTyxvQkFBb0IsWUFBWSxVQUFVO0FBQUEsRUFDaEUsR0FBRyxDQUFDLGFBQWEscUJBQXFCLENBQUM7QUFFdkMsUUFBTSxFQUFFLE9BQU8sYUFBYSxjQUFjLGNBQWMsSUFBSSxpQkFBaUI7QUFBQSxJQUMzRSxvQkFBb0IsS0FBSyxlQUFlLElBQUk7QUFBQSxJQUM1QyxtQkFBbUIsS0FBSyxjQUFjLFFBQVE7QUFBQSxFQUNoRCxDQUFDO0FBRUQsUUFBTSx5QkFBcUIsMEJBQVksWUFBWTtBQUNqRCxrQkFBYyxFQUFFO0FBQ2hCLFVBQU0sY0FBYztBQUFBLE1BQ2xCO0FBQUEsTUFDQSxTQUFTLENBQUMsUUFBUTtBQUNoQixzQkFBYyxHQUFHO0FBQ2pCLGtCQUFVLEdBQUc7QUFDYix3QkFBZ0IsZ0JBQWdCLElBQUk7QUFBQSxNQUN0QztBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0gsR0FBRyxDQUFDLE1BQU0sYUFBYSxDQUFDO0FBRXhCLFFBQU0sbUJBQW1CLEtBQUssa0JBQWtCLFNBQVM7QUFDekQsUUFBTSxrQkFBa0IsTUFBTSxjQUFjLEtBQUssY0FBYyxRQUFRO0FBQ3ZFLFFBQU0sbUJBQW1CLE9BQ3JCLG1CQUNDLENBQUMsUUFBUSxhQUFhLEtBQUssYUFBYSxJQUFJLElBQUssTUFBTSxlQUFlLEtBQUssZUFBZSxJQUFJO0FBRW5HLFFBQU0sK0JBQTJCLDBCQUFZLE1BQU07QUFDakQsUUFBSSxDQUFDLFFBQVEsWUFBWTtBQUN2QixtQkFBYTtBQUNiO0FBQUEsSUFDRjtBQUNBLHVCQUFtQjtBQUFBLEVBQ3JCLEdBQUcsQ0FBQyxNQUFNLFlBQVksY0FBYyxrQkFBa0IsQ0FBQztBQUd2RCxRQUFNLHFCQUFpQiwwQkFBWSxZQUFZO0FBQzdDLFFBQUksQ0FBQyxZQUFhO0FBQ2xCLG1CQUFlLElBQUk7QUFDbkIsUUFBSTtBQUNGLFlBQU0sTUFBTSxNQUFNLFVBQVUsbUNBQW1DLG1CQUFtQixXQUFXLENBQUMsRUFBRTtBQUNoRyxVQUFJLENBQUMsS0FBSyxXQUFXLENBQUMsSUFBSSxNQUFNO0FBQzlCLGtCQUFVLEtBQUssV0FBVyxLQUFLLG9DQUFvQyxrQ0FBa0MsQ0FBQztBQUN0RztBQUFBLE1BQ0Y7QUFDQSxZQUFNLE9BQU8sSUFBSTtBQUNqQixZQUFNLFVBQVUsT0FBTyxLQUFLLGFBQWEsS0FBSyxhQUFhLEVBQUU7QUFDN0QsbUJBQWEscUJBQXFCLE9BQU8sQ0FBQztBQUMxQyxZQUFNLGVBQWU7QUFBQSxRQUNuQixLQUFLLGNBQWMsS0FBSyxjQUFjLEtBQUssYUFBYSxLQUFLLGFBQWE7QUFBQSxNQUM1RTtBQUNBLG1CQUFhLGlCQUFpQixZQUFZLFlBQVksS0FBSyxnQkFBZ0I7QUFFM0UsWUFBTSxpQkFBaUIsS0FBSyxjQUFjLEtBQUs7QUFDL0MsWUFBTSxpQkFDSixNQUFNLFFBQVEsY0FBYyxLQUFLLGVBQWUsU0FBUyxlQUFlLENBQUMsSUFBSTtBQUMvRSxZQUFNLG1CQUFtQjtBQUFBLFFBQ3ZCLEtBQUssaUJBQ0gsS0FBSyxpQkFDTCxnQkFBZ0IsaUJBQ2hCLGdCQUFnQixpQkFDaEI7QUFBQSxNQUNKO0FBQ0EsWUFBTSwwQkFBMEIsaUJBQWlCLGdCQUFnQixnQkFBZ0I7QUFDakYsdUJBQWlCLDJCQUEyQixnQkFBZ0I7QUFDNUQscUJBQWUsT0FBTyxLQUFLLGVBQWUsS0FBSyxlQUFlLEVBQUUsQ0FBQztBQUNqRSxxQkFBZSxPQUFPLEtBQUssZUFBZSxLQUFLLGVBQWUsRUFBRSxDQUFDO0FBQ2pFLHNCQUFnQixPQUFPLEtBQUssZ0JBQWdCLEtBQUssZ0JBQWdCLEVBQUUsQ0FBQztBQUNwRSxzQkFBZ0IsT0FBTyxLQUFLLGdCQUFnQixLQUFLLGdCQUFnQixFQUFFLENBQUM7QUFBQSxJQUN0RSxRQUFRO0FBQUEsSUFDUixVQUFFO0FBQ0EscUJBQWUsS0FBSztBQUVwQix1QkFBaUI7QUFDakIsNEJBQXNCO0FBQUEsSUFDeEI7QUFBQSxFQUNGLEdBQUc7QUFBQSxJQUNEO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGLENBQUM7QUFFRCw4QkFBVSxNQUFNO0FBQ2QsUUFBSSxlQUFlO0FBQ2pCLHFCQUFlO0FBQUEsSUFDakIsT0FBTztBQUNMLHVCQUFpQjtBQUNqQiw0QkFBc0I7QUFBQSxJQUN4QjtBQUFBLEVBQ0YsR0FBRyxDQUFDLFFBQVEsZ0JBQWdCLGVBQWUsdUJBQXVCLGdCQUFnQixDQUFDO0FBRW5GLDhCQUFVLE1BQU07QUFDZCxVQUFNLEtBQUssbUJBQW1CO0FBQzlCLFFBQUksQ0FBQyxHQUFJO0FBQ1QsUUFBSSxDQUFDLFdBQVc7QUFDZCxTQUFHLFVBQVUsSUFBSSxzQkFBc0I7QUFBQSxJQUN6QyxPQUFPO0FBQ0wsU0FBRyxVQUFVLE9BQU8sc0JBQXNCO0FBQUEsSUFDNUM7QUFBQSxFQUNGLEdBQUcsQ0FBQyxTQUFTLENBQUM7QUFFZCw4QkFBVSxNQUFNO0FBQ2QsUUFBSSxXQUFXO0FBQ2IsVUFBSSxDQUFDLGdCQUFnQixTQUFTO0FBQzVCLHdCQUFnQixVQUFVO0FBQUEsVUFDeEI7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUNBO0FBQUEsSUFDRjtBQUNBLG9CQUFnQixVQUFVO0FBQUEsRUFDNUIsR0FBRyxDQUFDLFdBQVcsV0FBVyxXQUFXLGVBQWUsYUFBYSxhQUFhLGNBQWMsWUFBWSxDQUFDO0FBRXpHLDhCQUFVLE1BQU07QUFDZCxRQUFJLFVBQVcsUUFBTztBQUN0QixXQUFPLGtCQUFrQixtQkFBbUIsT0FBTztBQUFBLEVBQ3JELEdBQUcsQ0FBQyxTQUFTLENBQUM7QUFHZCw4QkFBVSxNQUFNO0FBQ2QsVUFBTSxXQUFXLFNBQVMsZUFBZSxlQUFlO0FBQ3hELFVBQU0sV0FBVyxTQUFTLGVBQWUsZUFBZTtBQUN4RCxVQUFNLFlBQVksU0FBUyxlQUFlLGdCQUFnQjtBQUMxRCxVQUFNLFlBQVksU0FBUyxlQUFlLGdCQUFnQjtBQUMxRCxRQUFJLENBQUMsWUFBWSxDQUFDLFNBQVU7QUFDNUIsUUFBSSxXQUFXO0FBQ2IsZUFBUyxVQUFVLElBQUksUUFBUTtBQUMvQixlQUFTLFVBQVUsT0FBTyxRQUFRO0FBQ2xDLFVBQUksVUFBVyxXQUFVLFVBQVUsSUFBSSxlQUFlO0FBQ3RELFVBQUksVUFBVyxXQUFVLFVBQVUsT0FBTyxlQUFlO0FBQUEsSUFDM0QsT0FBTztBQUNMLGVBQVMsVUFBVSxPQUFPLFFBQVE7QUFDbEMsZUFBUyxVQUFVLElBQUksUUFBUTtBQUMvQixVQUFJLFVBQVcsV0FBVSxVQUFVLE9BQU8sZUFBZTtBQUN6RCxVQUFJLFVBQVcsV0FBVSxVQUFVLElBQUksZUFBZTtBQUFBLElBQ3hEO0FBQUEsRUFDRixHQUFHLENBQUMsU0FBUyxDQUFDO0FBRWQsUUFBTSx1QkFBbUIsMEJBQVksTUFBTTtBQUN6QyxRQUFJLENBQUMsZ0JBQWdCO0FBQ25CLDBCQUFvQjtBQUNwQjtBQUFBLElBQ0Y7QUFDQSxpQkFBYSxJQUFJO0FBQ2pCLHFCQUFpQixJQUFJO0FBQ3JCLGNBQVUsS0FBSyxnQ0FBZ0MsaUJBQWlCLENBQUM7QUFBQSxFQUNuRSxHQUFHLENBQUMsZ0JBQWdCLENBQUM7QUFFckIsUUFBTSx1QkFBbUIsMEJBQVksTUFBTTtBQUN6QyxRQUFJLENBQUMsVUFBVztBQUNoQixpQkFBYSxLQUFLO0FBQ2xCLHFCQUFpQixLQUFLO0FBQ3RCLGVBQVc7QUFDWCxjQUFVLEtBQUssaUJBQWlCLFFBQVEsQ0FBQztBQUN6QyxXQUFPLFNBQVMsT0FBTztBQUFBLEVBQ3pCLEdBQUcsQ0FBQyxXQUFXLGtCQUFrQixVQUFVLENBQUM7QUFFNUMsUUFBTSxtQkFBZSwwQkFBWSxZQUFZO0FBQzNDLFFBQUksUUFBUSxDQUFDLFVBQVcsUUFBTztBQUMvQixRQUFJLENBQUMsZ0JBQWdCO0FBQ25CLDBCQUFvQjtBQUNwQixhQUFPO0FBQUEsSUFDVDtBQUNBLGtCQUFjLEVBQUU7QUFDaEIsWUFBUSxJQUFJO0FBQ1osY0FBVSxLQUFLLDBCQUEwQixzQkFBc0IsQ0FBQztBQUNoRSxRQUFJO0FBQ0YsWUFBTSxzQkFDSixpQkFBaUIsWUFBWSxTQUFTLEtBQ3RDLGlCQUFpQixZQUFZLG1CQUFtQixLQUNoRDtBQUNGLFlBQU0sMEJBQ0osaUJBQWlCLGdCQUFnQixhQUFhLEtBQzlDLGlCQUFpQixnQkFBZ0IsbUJBQW1CLEtBQ3BEO0FBQ0YsWUFBTSxVQUFVO0FBQUEsUUFDZDtBQUFBLFFBQ0EsV0FBVztBQUFBLFFBQ1gsZUFBZTtBQUFBLFFBQ2Y7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFDRjtBQUVBLFlBQU0sTUFBTSxNQUFNLFVBQVUsMkJBQTJCLEtBQUssSUFBSTtBQUFBLFFBQzlELFFBQVE7QUFBQSxRQUNSLFNBQVMsRUFBRSxnQkFBZ0IsbUJBQW1CO0FBQUEsUUFDOUMsTUFBTSxLQUFLLFVBQVUsT0FBTztBQUFBLE1BQzlCLENBQUM7QUFFRCxVQUFJLENBQUMsSUFBSSxRQUFTLE9BQU0sSUFBSSxNQUFNLElBQUksV0FBVyxLQUFLLDhCQUE4QixnQkFBZ0IsQ0FBQztBQUVyRyxnQkFBVSxLQUFLLHlCQUF5QixrQkFBa0IsQ0FBQztBQUMzRCxtQkFBYSxLQUFLO0FBQ2xCLHVCQUFpQixLQUFLO0FBQ3RCLGlCQUFXO0FBQ1gsYUFBTztBQUFBLElBQ1QsU0FBUyxLQUFLO0FBQ1osWUFBTSxNQUFNLEtBQUssV0FBVyxLQUFLLDZCQUE2QixlQUFlO0FBQzdFLG9CQUFjLEdBQUc7QUFDakIsZ0JBQVUsR0FBRztBQUNiLHNCQUFnQixnQkFBZ0IsSUFBSTtBQUNwQyxhQUFPO0FBQUEsSUFDVCxVQUFFO0FBQ0EsY0FBUSxLQUFLO0FBQUEsSUFDZjtBQUFBLEVBQ0YsR0FBRyxDQUFDLGNBQWMsYUFBYSxjQUFjLGFBQWEsV0FBVyxXQUFXLGVBQWUsWUFBWSxnQkFBZ0Isa0JBQWtCLFlBQVksTUFBTSxXQUFXLGdCQUFnQixDQUFDO0FBRTNMLFFBQU0sbUJBQWUsMEJBQVksWUFBWTtBQUMzQyxRQUFJLEtBQU0sUUFBTztBQUNqQixRQUFJLENBQUMsa0JBQWtCO0FBQ3JCLDBCQUFvQjtBQUNwQixhQUFPO0FBQUEsSUFDVDtBQUNBLGtCQUFjLEVBQUU7QUFDaEIsWUFBUSxJQUFJO0FBQ1osY0FBVSxLQUFLLDBCQUEwQixzQkFBc0IsQ0FBQztBQUNoRSxRQUFJO0FBQ0YsWUFBTSxNQUFNLE1BQU0sVUFBVSwyQkFBMkIsS0FBSyxJQUFJLEVBQUUsUUFBUSxTQUFTLENBQUM7QUFDcEYsVUFBSSxDQUFDLElBQUksUUFBUyxPQUFNLElBQUksTUFBTSxJQUFJLFdBQVcsS0FBSyw4QkFBOEIsZ0JBQWdCLENBQUM7QUFDckcsZ0JBQVUsS0FBSyx5QkFBeUIsa0JBQWtCLENBQUM7QUFDM0QsYUFBTztBQUFBLElBQ1QsU0FBUyxLQUFLO0FBQ1osWUFBTSxNQUFNLEtBQUssV0FBVyxLQUFLLDZCQUE2QixlQUFlO0FBQzdFLG9CQUFjLEdBQUc7QUFDakIsZ0JBQVUsR0FBRztBQUNiLHNCQUFnQixnQkFBZ0IsSUFBSTtBQUNwQyxhQUFPO0FBQUEsSUFDVCxVQUFFO0FBQ0EsY0FBUSxLQUFLO0FBQUEsSUFDZjtBQUFBLEVBQ0YsR0FBRyxDQUFDLE1BQU0sS0FBSyxDQUFDO0FBR2hCLDhCQUFVLE1BQU07QUFDZCxVQUFNLFNBQVMsTUFBTTtBQUNuQixVQUFJLENBQUMsZ0JBQWdCO0FBQ25CLDRCQUFvQjtBQUNwQjtBQUFBLE1BQ0Y7QUFDQSxVQUFJLFdBQVc7QUFDYixZQUFJLFFBQVEsTUFBTSxLQUFNO0FBQ3hCLHNCQUFjLEVBQUU7QUFDaEIsb0JBQVk7QUFBQSxVQUNWLE9BQU8sS0FBSyxtQ0FBbUMsY0FBYztBQUFBLFVBQzdELFNBQVMsS0FBSyxrQ0FBa0MsOEJBQThCO0FBQUEsVUFDOUUsYUFBYSxLQUFLLGVBQWUsTUFBTTtBQUFBLFVBQ3ZDLFdBQVcsWUFBWTtBQUNyQixrQkFBTSxLQUFLLE1BQU0sYUFBYTtBQUM5QixnQkFBSSxJQUFJO0FBQ04sMkJBQWE7QUFDYixzQ0FBd0IsU0FBUztBQUNqQyxvQkFBTSxLQUFLLEdBQUc7QUFDZCw4QkFBZ0IsYUFBYSxJQUFJO0FBQ2pDLG9CQUFNLEtBQUssSUFBSTtBQUNmLHFCQUFPLFNBQVMsT0FBTztBQUFBLFlBQ3pCO0FBQ0EsbUJBQU87QUFBQSxVQUNUO0FBQUEsUUFDRixDQUFDO0FBQUEsTUFDSCxPQUFPO0FBQ0wseUJBQWlCO0FBQUEsTUFDbkI7QUFBQSxJQUNGO0FBRUEsVUFBTSxXQUFXLE1BQU07QUFDckIsVUFBSSxDQUFDLGtCQUFrQjtBQUNyQiw0QkFBb0I7QUFDcEI7QUFBQSxNQUNGO0FBQ0EsVUFBSSxRQUFRLE1BQU0sS0FBTTtBQUN4QixvQkFBYyxFQUFFO0FBQ2hCLGtCQUFZO0FBQUEsUUFDVixPQUFPLEtBQUssc0NBQXNDLGlCQUFpQjtBQUFBLFFBQ25FLFNBQVMsS0FBSyxxQ0FBcUMsc0NBQXNDO0FBQUEsUUFDekYsYUFBYSxLQUFLLGlCQUFpQixRQUFRO0FBQUEsUUFDM0MsV0FBVyxZQUFZO0FBQ25CLGdCQUFNLEtBQUssTUFBTSxhQUFhO0FBQzlCLGNBQUksSUFBSTtBQUNSLHlCQUFhO0FBQ2Isb0NBQXdCLFNBQVM7QUFDakMsa0JBQU0sS0FBSyxHQUFHO0FBQ2QsNEJBQWdCLGdCQUFnQixJQUFJO0FBQ3BDLGtCQUFNLEtBQUssSUFBSTtBQUNmLG1CQUFPLFNBQVMsT0FBTztBQUFBLFVBQ3ZCO0FBQ0EsaUJBQU87QUFBQSxRQUNUO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDTDtBQUNBLFVBQU0sZUFBZSxNQUFNO0FBQ3pCLFVBQUksUUFBUSxNQUFNLEtBQU07QUFDeEIsdUJBQWlCO0FBQUEsSUFDbkI7QUFDQSxXQUFPLGlCQUFpQixjQUFjLE1BQU07QUFDNUMsV0FBTyxpQkFBaUIsZ0JBQWdCLFFBQVE7QUFDaEQsV0FBTyxpQkFBaUIscUJBQXFCLFlBQVk7QUFDekQsV0FBTyxNQUFNO0FBQ1gsYUFBTyxvQkFBb0IsY0FBYyxNQUFNO0FBQy9DLGFBQU8sb0JBQW9CLGdCQUFnQixRQUFRO0FBQ25ELGFBQU8sb0JBQW9CLHFCQUFxQixZQUFZO0FBQUEsSUFDOUQ7QUFBQSxFQUNGLEdBQUcsQ0FBQyxNQUFNLE1BQU0sTUFBTSxrQkFBa0IsY0FBYyxrQkFBa0IsY0FBYyxXQUFXLGFBQWEsU0FBUyxDQUFDO0FBRXhILFNBQ0UsNkNBQUMsU0FBSSxXQUFVLGFBQ2I7QUFBQTtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0MsTUFBTSxNQUFNO0FBQUEsUUFDWixPQUFPLE1BQU07QUFBQSxRQUNiLFNBQVMsTUFBTTtBQUFBLFFBQ2YsYUFBYTtBQUFBLFFBQ2IsWUFBWTtBQUFBLFFBQ1osYUFBYTtBQUFBLFFBQ2IsWUFBWSxNQUFNO0FBQUEsUUFDbEIsYUFBYSxNQUFNO0FBQUEsUUFDbkI7QUFBQSxRQUNBLE9BQU87QUFBQSxRQUNQO0FBQUEsUUFDQSxXQUFXO0FBQUEsUUFDWCxVQUFVO0FBQUE7QUFBQSxJQUNaO0FBQUEsSUFDQTtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0MsS0FBSztBQUFBLFFBQ0wsV0FBVTtBQUFBLFFBRVQ7QUFBQSx5QkFDQyw0Q0FBQyxTQUFJLFdBQVUsa0ZBQ2IsdURBQUMsU0FBSSxXQUFVLGtEQUNiO0FBQUEsd0RBQUMsbUJBQVEsTUFBSyxXQUFVO0FBQUEsWUFDeEIsNENBQUMsVUFBTSxlQUFLLGtCQUFrQixTQUFTLEdBQUU7QUFBQSxhQUMzQyxHQUNGO0FBQUEsVUFFQSw2Q0FBQyxTQUFJLFdBQVUsOENBQ2Y7QUFBQSx3REFBQyxTQUFJLFdBQVUscUJBQ2I7QUFBQSxjQUFDO0FBQUE7QUFBQSxnQkFDQyxPQUFPLEtBQUssNEJBQTRCLE1BQU07QUFBQSxnQkFDOUMsT0FBTztBQUFBLGdCQUNQLFVBQVU7QUFBQSxnQkFDVixVQUFVLENBQUM7QUFBQSxnQkFDWCxVQUFVLENBQUM7QUFBQTtBQUFBLFlBQ2IsR0FDRjtBQUFBLFlBQ0E7QUFBQSxjQUFDO0FBQUE7QUFBQSxnQkFDQyxPQUFPLEtBQUssaUNBQWlDLFlBQVk7QUFBQSxnQkFDekQsU0FBUztBQUFBLGdCQUNULE9BQU87QUFBQSxnQkFDUCxVQUFVO0FBQUEsZ0JBQ1YsYUFBYSxLQUFLLHVDQUF1QyxhQUFhO0FBQUEsZ0JBQ3RFLFVBQVUsQ0FBQztBQUFBLGdCQUNYLFVBQVUsQ0FBQztBQUFBLGdCQUNYLFdBQVc7QUFBQTtBQUFBLFlBQ2I7QUFBQSxhQUNGO0FBQUEsVUFFQSw2Q0FBQyxTQUFJLFdBQVUsMEJBQ2I7QUFBQSx5REFBQyxTQUFJLFdBQVUsYUFDYjtBQUFBLDBEQUFDLFdBQU0sV0FBVSw0QkFBNEIsZUFBSyw0QkFBNEIsYUFBYSxHQUFFO0FBQUEsY0FDN0Y7QUFBQSxnQkFBQztBQUFBO0FBQUEsa0JBQ0MsSUFBRztBQUFBLGtCQUNILFdBQVc7QUFBQSxvQkFDVDtBQUFBLG9CQUNBLFlBQVksb0NBQW9DO0FBQUEsa0JBQ2xEO0FBQUEsa0JBQ0EsV0FBVztBQUFBLGtCQUNYLE9BQU87QUFBQSxrQkFDUCxVQUFVLENBQUM7QUFBQSxrQkFDWCxVQUFVLENBQUMsTUFBTSxlQUFlLEVBQUUsT0FBTyxLQUFLO0FBQUE7QUFBQSxjQUNoRDtBQUFBLGVBQ0Y7QUFBQSxZQUNBLDZDQUFDLFNBQUksV0FBVSxhQUNiO0FBQUEsMERBQUMsV0FBTSxXQUFVLDRCQUE0QixlQUFLLHlCQUF5QixVQUFVLEdBQUU7QUFBQSxjQUN2RjtBQUFBLGdCQUFDO0FBQUE7QUFBQSxrQkFDQyxJQUFHO0FBQUEsa0JBQ0QsV0FBVztBQUFBLG9CQUNUO0FBQUEsb0JBQ0EsQ0FBQyxZQUFZLHVCQUF1QjtBQUFBLGtCQUN0QztBQUFBLGtCQUNGLE9BQU87QUFBQSxrQkFDUCxVQUFRO0FBQUEsa0JBQ1IsZUFBZSxlQUFlO0FBQUEsa0JBQzlCLGVBQWUsZUFBZTtBQUFBLGtCQUM5QixhQUFhLGVBQWU7QUFBQSxrQkFDNUIsaUJBQWlCLGVBQWU7QUFBQTtBQUFBLGNBQ2xDO0FBQUEsZUFDRjtBQUFBLFlBQ0EsNkNBQUMsU0FBSSxXQUFVLGFBQ2I7QUFBQSwwREFBQyxXQUFNLFdBQVUsNEJBQTRCLGVBQUssMkJBQTJCLFlBQVksR0FBRTtBQUFBLGNBQzNGO0FBQUEsZ0JBQUM7QUFBQTtBQUFBLGtCQUNDLElBQUc7QUFBQSxrQkFDRCxXQUFXO0FBQUEsb0JBQ1Q7QUFBQSxvQkFDQSxDQUFDLFlBQVksdUJBQXVCO0FBQUEsa0JBQ3RDO0FBQUEsa0JBQ0YsT0FBTztBQUFBLGtCQUNQLFVBQVE7QUFBQSxrQkFDUixlQUFlLGdCQUFnQjtBQUFBLGtCQUMvQixlQUFlLGdCQUFnQjtBQUFBLGtCQUMvQixhQUFhLGdCQUFnQjtBQUFBLGtCQUM3QixpQkFBaUIsZ0JBQWdCO0FBQUE7QUFBQSxjQUNuQztBQUFBLGVBQ0Y7QUFBQSxZQUNBLDZDQUFDLFNBQUksV0FBVSxhQUNiO0FBQUEsMERBQUMsV0FBTSxXQUFVLDRCQUE0QixlQUFLLDRCQUE0QixhQUFhLEdBQUU7QUFBQSxjQUM3RjtBQUFBLGdCQUFDO0FBQUE7QUFBQSxrQkFDQyxJQUFHO0FBQUEsa0JBQ0QsV0FBVztBQUFBLG9CQUNUO0FBQUEsb0JBQ0EsQ0FBQyxZQUFZLHVCQUF1QjtBQUFBLGtCQUN0QztBQUFBLGtCQUNGLE9BQU87QUFBQSxrQkFDUCxVQUFRO0FBQUEsa0JBQ1IsZUFBZSxnQkFBZ0I7QUFBQSxrQkFDL0IsZUFBZSxnQkFBZ0I7QUFBQSxrQkFDL0IsYUFBYSxnQkFBZ0I7QUFBQSxrQkFDN0IsaUJBQWlCLGdCQUFnQjtBQUFBO0FBQUEsY0FDbkM7QUFBQSxlQUNGO0FBQUEsYUFDRjtBQUFBLFVBRUEsNENBQUMsU0FBSSxXQUFVLGtEQUNiLHNEQUFDLFVBQU0sa0JBQU8sR0FDaEI7QUFBQTtBQUFBO0FBQUEsSUFDRjtBQUFBLEtBQ0Y7QUFFSjtBQUlBLElBQU0sZ0JBQU4sY0FBNEIsYUFBQUEsUUFBTSxVQUEyRDtBQUFBLEVBQzNGLFlBQVksT0FBb0M7QUFDOUMsVUFBTSxLQUFLO0FBQ1gsU0FBSyxRQUFRLEVBQUUsVUFBVSxNQUFNO0FBQUEsRUFDakM7QUFBQSxFQUVBLE9BQU8sMkJBQTJCO0FBQ2hDLFdBQU8sRUFBRSxVQUFVLEtBQUs7QUFBQSxFQUMxQjtBQUFBLEVBRUEsa0JBQWtCLE9BQU8sTUFBTTtBQUFBLEVBQy9CO0FBQUEsRUFFQSxTQUFTO0FBQ1AsUUFBSSxLQUFLLE1BQU0sVUFBVTtBQUN2QixhQUNFLDRDQUFDLFNBQUksV0FBVSxrRUFDWixlQUFLLCtCQUErQiwwRUFBMEUsR0FDakg7QUFBQSxJQUVKO0FBQ0EsV0FBTyxLQUFLLE1BQU07QUFBQSxFQUNwQjtBQUNGO0FBR2UsU0FBUixhQUE4QjtBQUNuQyxTQUNFLDRDQUFDLGlCQUNDLHNEQUFDLGFBQVUsR0FDYjtBQUVKOzs7QUR2MUJRLElBQUFDLHNCQUFBO0FBSlIsSUFBTSxhQUFhLE1BQU07QUFDdkIsU0FDRSw2Q0FBQyxnQkFDQyx1REFBQyxnQkFDQyx1REFBQyxjQUFXLEdBQ2QsR0FDRjtBQUVKO0FBRUEsSUFBTSxRQUFRLE1BQU07QUFDbEIsUUFBTSxTQUFTLFNBQVMsZUFBZSxvQkFBb0I7QUFDM0QsTUFBSSxDQUFDLE9BQVE7QUFFYixRQUFNLFVBQVUsNkNBQUMsY0FBVztBQUU1QixNQUFJLE9BQU8sV0FBVztBQUNwQixXQUFPLFVBQVUsT0FBTyxPQUFPO0FBQy9CO0FBQUEsRUFDRjtBQUVBLFFBQU0sV0FBTywwQkFBVyxNQUFNO0FBQzlCLFNBQU8sWUFBWTtBQUNuQixPQUFLLE9BQU8sT0FBTztBQUNyQjtBQUVBLElBQUksU0FBUyxlQUFlLGNBQWMsU0FBUyxlQUFlLGVBQWU7QUFDL0UsUUFBTTtBQUNSLE9BQU87QUFDTCxXQUFTLGlCQUFpQixvQkFBb0IsS0FBSztBQUNyRDtBQUVBLElBQU8scUJBQVE7IiwKICAibmFtZXMiOiBbIlJlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSJdCn0K
