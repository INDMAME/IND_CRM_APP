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
      window.__indBypassNavigationGuardOnce?.();
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
  const hasActiveProcess = (0, import_react.useMemo)(() => busy || isEditing, [busy, isEditing]);
  (0, import_react.useEffect)(() => {
    window.__indSetNavigationGuard?.(hasActiveProcess);
    return () => {
      window.__indClearNavigationGuard?.();
    };
  }, [hasActiveProcess]);
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
    window.__indBypassNavigationGuardOnce?.();
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
            window.__indBypassNavigationGuardOnce?.();
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvZGV0YWlsL0RldGFpbFBhZ2UudHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy92aXNpdGFzL2RldGFpbC9EZXRhaWxGb3JtLnRzeCIsICIuLi9yZWFjdC9zcmMvdXRpbHMvZG9tR3VhcmRzLnRzIiwgIi4uL3JlYWN0L3NyYy91dGlscy9zdHJpbmdzLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBjcmVhdGVSb290IH0gZnJvbSBcInJlYWN0LWRvbS9jbGllbnRcIjtcbmltcG9ydCBEZXRhaWxGb3JtIGZyb20gXCIuL0RldGFpbEZvcm0udHN4XCI7XG5pbXBvcnQgeyBJMThuUHJvdmlkZXIgfSBmcm9tIFwiLi4vLi4vLi4vY29udGV4dC9JMThuQ29udGV4dC50c3hcIjtcbmltcG9ydCB7IEF1dGhQcm92aWRlciB9IGZyb20gXCIuLi8uLi8uLi9jb250ZXh0L0F1dGhDb250ZXh0LnRzeFwiO1xuXG50eXBlIEluZFJvb3RFbGVtZW50ID0gSFRNTEVsZW1lbnQgJiB7IF9faW5kUm9vdD86IGltcG9ydChcInJlYWN0LWRvbS9jbGllbnRcIikuUm9vdCB9O1xuXG4vLyBQYWdlIGVudHJ5IGZvciB0aGUgdmlzaXRhcyBkZXRhaWwgaXNsYW5kLlxuY29uc3QgRGV0YWlsUGFnZSA9ICgpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8STE4blByb3ZpZGVyPlxuICAgICAgPEF1dGhQcm92aWRlcj5cbiAgICAgICAgPERldGFpbEZvcm0gLz5cbiAgICAgIDwvQXV0aFByb3ZpZGVyPlxuICAgIDwvSTE4blByb3ZpZGVyPlxuICApO1xufTtcblxuY29uc3QgbW91bnQgPSAoKSA9PiB7XG4gIGNvbnN0IHJvb3RFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlzaXRhLWRldGFpbC1yb290XCIpIGFzIEluZFJvb3RFbGVtZW50IHwgbnVsbDtcbiAgaWYgKCFyb290RWwpIHJldHVybjtcblxuICBjb25zdCBlbGVtZW50ID0gPERldGFpbFBhZ2UgLz47XG5cbiAgaWYgKHJvb3RFbC5fX2luZFJvb3QpIHtcbiAgICByb290RWwuX19pbmRSb290LnJlbmRlcihlbGVtZW50KTtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCByb290ID0gY3JlYXRlUm9vdChyb290RWwpO1xuICByb290RWwuX19pbmRSb290ID0gcm9vdDtcbiAgcm9vdC5yZW5kZXIoZWxlbWVudCk7XG59O1xuXG5pZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gXCJjb21wbGV0ZVwiIHx8IGRvY3VtZW50LnJlYWR5U3RhdGUgPT09IFwiaW50ZXJhY3RpdmVcIikge1xuICBtb3VudCgpO1xufSBlbHNlIHtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgbW91bnQpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBEZXRhaWxQYWdlO1xuIiwgImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZUNhbGxiYWNrLCB1c2VNZW1vIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgU2luZ2xlRGF0ZVBpY2tlciBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NpbmdsZURhdGVQaWNrZXIudHN4XCI7XHJcbmltcG9ydCBDb25maXJtTW9kYWwgZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9Db25maXJtTW9kYWwudHN4XCI7XHJcbmltcG9ydCBTZWxlY3RDb21ib2JveCBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NlbGVjdENvbWJvYm94LnRzeFwiO1xyXG5pbXBvcnQgeyBmZXRjaEpzb24gfSBmcm9tIFwiLi4vLi4vLi4vc2VydmljZXMvYXBpU2VydmljZS50c1wiO1xyXG5pbXBvcnQgeyB1c2VWaXNpdGFzIH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZVZpc2l0YXMudHNcIjtcclxuaW1wb3J0IFNwaW5uZXIgZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9TcGlubmVyLnRzeFwiO1xyXG5pbXBvcnQgeyBjbGFzc05hbWVzIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2NsYXNzTmFtZXMudHNcIjtcclxuaW1wb3J0IHsgd2FpdCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy93YWl0LnRzXCI7XHJcbmltcG9ydCB7IGluZEZvcm1hdCwgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB7IGNhbkFjY2Vzcywgc2hvd1Blcm1pc3Npb25Nb2RhbCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9wZXJtaXNzaW9ucy50c1wiO1xyXG5pbXBvcnQgeyBiaW5kUmVhZE9ubHlHdWFyZCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9kb21HdWFyZHMudHNcIjtcclxuaW1wb3J0IHsgaGFzVmFsdWUgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvc3RyaW5ncy50c1wiO1xyXG5pbXBvcnQgeyByZWFkQW5kQ2xlYXJUZXh0RWRpdG9yVmFsdWUsIFRFWFRfRURJVE9SX1BSRUZJWCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy90ZXh0RWRpdG9yLnRzXCI7XHJcbmltcG9ydCB7IHNldEhpc3RvcnlGaWx0ZXJGb3JEYXRlLCBmbGFzaEFjdGlvbk1hcmsgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvdmlzaXRhc0hpc3RvcnkudHNcIjtcclxuaW1wb3J0IHsgc2V0UHJldmlld0FuY2hvciwgc2hvd1ByZXZpZXdUb29sdGlwLCBpc092ZXJmbG93aW5nIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3ByZXZpZXdUb29sdGlwLnRzXCI7XHJcbmltcG9ydCB7IHVzZVRhcEd1YXJkIH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZVRhcEd1YXJkLnRzXCI7XHJcbmltcG9ydCB7IHVzZUNvbmZpcm1EaWFsb2cgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlQ29uZmlybURpYWxvZy50c1wiO1xyXG5cclxuY29uc3QgRGV0YWlsQXBwID0gKCkgPT4ge1xyXG4gIGNvbnN0IHsgdmlzaXRUeXBlcywgYXNpc3RlbnRlVGlwb3MgfSA9IHVzZVZpc2l0YXMoKTtcclxuICBjb25zdCBjYW5FZGl0SGlzdG9yeSA9IGNhbkFjY2VzcyhcIlZJU0lUQVNfSElTVE9SSUFMXCIsIFwiRWRpdFwiKTtcclxuICBjb25zdCBjYW5EZWxldGVIaXN0b3J5ID0gY2FuQWNjZXNzKFwiVklTSVRBU19ISVNUT1JJQUxcIiwgXCJGdWxsQWNjZXNzXCIpO1xyXG4gIHR5cGUgQWN0aXZpdHlEZXRhaWxQYXlsb2FkID0ge1xyXG4gICAgcmVjSWQ/OiBzdHJpbmcgfCBudW1iZXI7XHJcbiAgICBSZWNJZD86IHN0cmluZyB8IG51bWJlcjtcclxuICAgIHJlZlJlY0lkQWN0aXZpZGFkPzogc3RyaW5nIHwgbnVtYmVyO1xyXG4gICAgUmVmUmVjSWRBY3RpdmlkYWQ/OiBzdHJpbmcgfCBudW1iZXI7XHJcbiAgICBhY3RpdmlkYWRSZWNJZD86IHN0cmluZyB8IG51bWJlcjtcclxuICAgIEFjdGl2aWRhZFJlY0lkPzogc3RyaW5nIHwgbnVtYmVyO1xyXG4gICAgcmVhZE9ubHk/OiBib29sZWFuO1xyXG4gICAgYWxsb3dFZGl0PzogYm9vbGVhbjtcclxuICAgIGVkaXRNb2RlS2V5Pzogc3RyaW5nO1xyXG4gICAgW2tleTogc3RyaW5nXTogdW5rbm93bjtcclxuICB9O1xyXG5cclxuICBjb25zdCBkZXRhaWwgPSAod2luZG93Ll9fQUNUSVZJVFlfREVUQUlMX18gYXMgQWN0aXZpdHlEZXRhaWxQYXlsb2FkKSB8fCB7fTtcclxuXHJcbiAgY29uc3QgYWN0aXZpdHlSZWNJZCA9IFN0cmluZyhcclxuICAgIGRldGFpbC5yZWNJZCB8fFxyXG4gICAgICBkZXRhaWwuUmVjSWQgfHxcclxuICAgICAgZGV0YWlsLnJlZlJlY0lkQWN0aXZpZGFkIHx8XHJcbiAgICAgIGRldGFpbC5SZWZSZWNJZEFjdGl2aWRhZCB8fFxyXG4gICAgICBkZXRhaWwuYWN0aXZpZGFkUmVjSWQgfHxcclxuICAgICAgZGV0YWlsLkFjdGl2aWRhZFJlY0lkIHx8XHJcbiAgICAgIFwiXCJcclxuICApLnRyaW0oKTtcclxuXHJcbiAgY29uc3QgdGV4dEVkaXRvckJhc2VJZCA9IGFjdGl2aXR5UmVjSWQgPyBgVmlzaXRhLiR7YWN0aXZpdHlSZWNJZH1gIDogXCJWaXNpdGFcIjtcclxuICBjb25zdCBmaWVsZElkQ29tZW50YXJpb3MgPSBgJHt0ZXh0RWRpdG9yQmFzZUlkfS5Db21lbnRhcmlvc2A7XHJcbiAgY29uc3QgZmllbGRJZEFudGVjZWRlbnRlcyA9IGAke3RleHRFZGl0b3JCYXNlSWR9LkFudGVjZWRlbnRlc2A7XHJcbiAgY29uc3QgZmllbGRJZENvbmNsdXNpb25lcyA9IGAke3RleHRFZGl0b3JCYXNlSWR9LkNvbmNsdXNpb25lc2A7XHJcblxyXG4gIGNvbnN0IG5vcm1hbGl6ZURhdGVUb0lucHV0ID0gdXNlQ2FsbGJhY2soKHZhbHVlKSA9PiB7XHJcbiAgICBpZiAoIXZhbHVlKSByZXR1cm4gXCJcIjtcclxuICAgIGNvbnN0IHJhdyA9IFN0cmluZyh2YWx1ZSkudHJpbSgpO1xyXG4gICAgaWYgKCFyYXcpIHJldHVybiBcIlwiO1xyXG4gICAgLy8gQWxyZWFkeSB5eXl5LU1NLWRkXHJcbiAgICBpZiAoL15cXGR7NH0tXFxkezJ9LVxcZHsyfSQvLnRlc3QocmF3KSkgcmV0dXJuIHJhdztcclxuICAgIC8vIGRkLk1NLnl5eXkgb3IgZGQvTU0veXl5eVxyXG4gICAgaWYgKC9eXFxkezJ9Wy4vLV1cXGR7Mn1bLi8tXVxcZHs0fSQvLnRlc3QocmF3KSkge1xyXG4gICAgICBjb25zdCBwYXJ0cyA9IHJhdy5zcGxpdCgvWy4vLV0vKS5tYXAoKHApID0+IHBhcnNlSW50KHAsIDEwKSk7XHJcbiAgICAgIGlmIChwYXJ0cy5sZW5ndGggPT09IDMgJiYgIU51bWJlci5pc05hTihwYXJ0c1swXSkgJiYgIU51bWJlci5pc05hTihwYXJ0c1sxXSkgJiYgIU51bWJlci5pc05hTihwYXJ0c1syXSkpIHtcclxuICAgICAgICBjb25zdCBbZCwgbSwgeV0gPSBwYXJ0cztcclxuICAgICAgICBjb25zdCBtbSA9IFN0cmluZyhtKS5wYWRTdGFydCgyLCBcIjBcIik7XHJcbiAgICAgICAgY29uc3QgZGQgPSBTdHJpbmcoZCkucGFkU3RhcnQoMiwgXCIwXCIpO1xyXG4gICAgICAgIHJldHVybiBgJHt5fS0ke21tfS0ke2RkfWA7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbnN0IGR0ID0gbmV3IERhdGUocmF3KTtcclxuICAgIGlmICghTnVtYmVyLmlzTmFOKGR0LmdldFRpbWUoKSkpIHtcclxuICAgICAgY29uc3QgeXl5eSA9IGR0LmdldEZ1bGxZZWFyKCk7XHJcbiAgICAgIGNvbnN0IG1tID0gU3RyaW5nKGR0LmdldE1vbnRoKCkgKyAxKS5wYWRTdGFydCgyLCBcIjBcIik7XHJcbiAgICAgIGNvbnN0IGRkID0gU3RyaW5nKGR0LmdldERhdGUoKSkucGFkU3RhcnQoMiwgXCIwXCIpO1xyXG4gICAgICByZXR1cm4gYCR7eXl5eX0tJHttbX0tJHtkZH1gO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFwiXCI7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBtYXRjaE9wdGlvblZhbHVlID0gdXNlQ2FsbGJhY2soKG9wdGlvbnMsIHJhdykgPT4ge1xyXG4gICAgaWYgKHJhdyA9PSBudWxsKSByZXR1cm4gXCJcIjtcclxuICAgIGNvbnN0IHJhd1N0ciA9IFN0cmluZyhyYXcpLnRyaW0oKTtcclxuICAgIGlmICghcmF3U3RyKSByZXR1cm4gXCJcIjtcclxuXHJcbiAgICBjb25zdCBub3JtYWxpemVUZXh0ID0gKHMpID0+XHJcbiAgICAgIFN0cmluZyhzIHx8IFwiXCIpXHJcbiAgICAgICAgLnRvTG93ZXJDYXNlKClcclxuICAgICAgICAubm9ybWFsaXplKFwiTkZEXCIpXHJcbiAgICAgICAgLnJlcGxhY2UoL1tcXHUwMzAwLVxcdTAzNmZdL2csIFwiXCIpXHJcbiAgICAgICAgLnRyaW0oKTtcclxuXHJcbiAgICBjb25zdCByYXdOb3JtID0gbm9ybWFsaXplVGV4dChyYXdTdHIpO1xyXG4gICAgY29uc3QgYWx0Tm9ybSA9IHJhd05vcm0uZW5kc1dpdGgoXCJvXCIpID8gYCR7cmF3Tm9ybS5zbGljZSgwLCAtMSl9YWAgOiByYXdOb3JtO1xyXG5cclxuICAgIGNvbnN0IG1hdGNoID0gKG9wdGlvbnMgfHwgW10pLmZpbmQoKG8pID0+IHtcclxuICAgICAgY29uc3QgdmFsID0gU3RyaW5nKG8/LnZhbHVlID8/IG8/LlZhbHVlID8/IFwiXCIpLnRyaW0oKTtcclxuICAgICAgY29uc3QgdGV4dCA9IFN0cmluZyhvPy50ZXh0ID8/IG8/LlRleHQgPz8gXCJcIikudHJpbSgpO1xyXG4gICAgICBjb25zdCB0ZXh0Tm9ybSA9IG5vcm1hbGl6ZVRleHQodGV4dCk7XHJcbiAgICAgIHJldHVybiB2YWwgPT09IHJhd1N0ciB8fCB2YWwgPT09IHJhd05vcm0gfHwgdGV4dE5vcm0gPT09IHJhd05vcm0gfHwgdGV4dE5vcm0gPT09IGFsdE5vcm07XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBtYXRjaCA/IFN0cmluZyhtYXRjaC52YWx1ZSA/PyBtYXRjaC5WYWx1ZSA/PyByYXdTdHIpIDogcmF3U3RyO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgaW5pdGlhbFRyYW5zRGF0ZSA9IG5vcm1hbGl6ZURhdGVUb0lucHV0KFN0cmluZyhkZXRhaWwudHJhbnNEYXRlID8/IGRldGFpbC5UcmFuc0RhdGUgPz8gXCJcIikpO1xyXG4gIGNvbnN0IGRlZmF1bHRWaXNpdFR5cGUgPSB2aXNpdFR5cGVzWzBdPy52YWx1ZSA/PyB2aXNpdFR5cGVzWzBdPy5WYWx1ZSA/PyBcIlwiO1xyXG4gIGNvbnN0IHJhd0luaXRpYWxWaXNpdFR5cGUgPSBTdHJpbmcoXHJcbiAgICBkZXRhaWwudGlwb1Zpc2l0YSA/PyBkZXRhaWwuVGlwb1Zpc2l0YSA/PyBkZXRhaWwudmlzaXRUeXBlID8/IGRldGFpbC5WaXNpdFR5cGUgPz8gXCJcIlxyXG4gICk7XHJcbiAgY29uc3QgaW5pdGlhbFZpc2l0VHlwZSA9IG1hdGNoT3B0aW9uVmFsdWUodmlzaXRUeXBlcywgcmF3SW5pdGlhbFZpc2l0VHlwZSkgfHwgZGVmYXVsdFZpc2l0VHlwZTtcclxuICBjb25zdCByYXdJbml0aWFsQXNpc3RlbnRlID0gU3RyaW5nKFxyXG4gICAgZGV0YWlsLmFzaXN0ZW50ZVRpcG8gPz8gZGV0YWlsLkFzaXN0ZW50ZVRpcG8gPz8gKGFzaXN0ZW50ZVRpcG9zWzBdPy52YWx1ZSA/PyBhc2lzdGVudGVUaXBvc1swXT8uVmFsdWUgPz8gXCJcIilcclxuICApO1xyXG4gIGNvbnN0IGluaXRpYWxBc2lzdGVudGUgPSBtYXRjaE9wdGlvblZhbHVlKGFzaXN0ZW50ZVRpcG9zLCByYXdJbml0aWFsQXNpc3RlbnRlKSB8fCByYXdJbml0aWFsQXNpc3RlbnRlO1xyXG5cclxuICBjb25zdCBbdHJhbnNEYXRlLCBzZXRUcmFuc0RhdGVdID0gdXNlU3RhdGUoaW5pdGlhbFRyYW5zRGF0ZSk7XHJcbiAgY29uc3QgW3Zpc2l0VHlwZSwgc2V0VmlzaXRUeXBlXSA9IHVzZVN0YXRlKGluaXRpYWxWaXNpdFR5cGUpO1xyXG4gIGNvbnN0IFthc2lzdGVudGVUaXBvLCBzZXRBc2lzdGVudGVUaXBvXSA9IHVzZVN0YXRlKGluaXRpYWxBc2lzdGVudGUpO1xyXG4gIGNvbnN0IFtkZXNjcmlwdGlvbiwgc2V0RGVzY3JpcHRpb25dID0gdXNlU3RhdGUoU3RyaW5nKGRldGFpbC5kZXNjcmlwdGlvbiA/PyBkZXRhaWwuRGVzY3JpcHRpb24gPz8gXCJcIikpO1xyXG4gIGNvbnN0IFtjb21lbnRhcmlvcywgc2V0Q29tZW50YXJpb3NdID0gdXNlU3RhdGUoU3RyaW5nKGRldGFpbC5jb21lbnRhcmlvcyA/PyBkZXRhaWwuQ29tZW50YXJpb3MgPz8gXCJcIikpO1xyXG4gIGNvbnN0IFthbnRlY2VkZW50ZXMsIHNldEFudGVjZWRlbnRlc10gPSB1c2VTdGF0ZShTdHJpbmcoZGV0YWlsLmFudGVjZWRlbnRlcyA/PyBkZXRhaWwuQW50ZWNlZGVudGVzID8/IFwiXCIpKTtcclxuICBjb25zdCBbY29uY2x1c2lvbmVzLCBzZXRDb25jbHVzaW9uZXNdID0gdXNlU3RhdGUoU3RyaW5nKGRldGFpbC5jb25jbHVzaW9uZXMgPz8gZGV0YWlsLkNvbmNsdXNpb25lcyA/PyBcIlwiKSk7XHJcbiAgY29uc3QgW3N0YXR1cywgc2V0U3RhdHVzXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbYnVzeSwgc2V0QnVzeV0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtpc0VkaXRpbmcsIHNldElzRWRpdGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtpc0h5ZHJhdGluZywgc2V0SXNIeWRyYXRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbbW9kYWxFcnJvciwgc2V0TW9kYWxFcnJvcl0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgcmVhZE9ubHlTdXJmYWNlUmVmID0gdXNlUmVmKG51bGwpO1xuICBjb25zdCBlZGl0TW9kZUtleVJlZiA9IHVzZVJlZihcIlwiKTtcbiAgY29uc3QgZHJhZnRLZXlSZWYgPSB1c2VSZWYoXCJcIik7XG4gIGNvbnN0IGRyYWZ0UGVyc2lzdFRpbWVyUmVmID0gdXNlUmVmPG51bWJlciB8IG51bGw+KG51bGwpO1xuICBjb25zdCBlZGl0U25hcHNob3RSZWYgPSB1c2VSZWYobnVsbCk7XG5cclxuICBjb25zdCByZWNJZCA9IFN0cmluZyhkZXRhaWwucmVjSWQgPz8gZGV0YWlsLlJlY0lkID8/IFwiXCIpO1xyXG4gIGNvbnN0IGFjY291bnROdW0gPSBTdHJpbmcoZGV0YWlsLmFjY291bnROdW0gPz8gZGV0YWlsLkFjY291bnROdW0gPz8gXCJcIik7XHJcbiAgY29uc3QgYWN0aXZpZGFkSWQgPSBTdHJpbmcoZGV0YWlsLmFjdGl2aWRhZElkID8/IGRldGFpbC5BY3RpdmlkYWRJZCA/PyBcIlwiKTtcclxuXHJcbiAgLy8gUGVyc2lzdCBlZGl0IG1vZGUgYWNyb3NzIG5hdmlnYXRpb24gdG8gdGhlIHRleHQgZWRpdG9yLlxyXG4gIGNvbnN0IHN5bmNFZGl0TW9kZUZsYWcgPSB1c2VDYWxsYmFjaygoZW5hYmxlZCkgPT4ge1xyXG4gICAgY29uc3Qga2V5ID0gZWRpdE1vZGVLZXlSZWYuY3VycmVudDtcclxuICAgIGlmICgha2V5KSByZXR1cm47XHJcbiAgICB0cnkge1xyXG4gICAgICBpZiAoZW5hYmxlZCkgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShrZXksIFwidHJ1ZVwiKTtcclxuICAgICAgZWxzZSBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XHJcbiAgICB9IGNhdGNoIHtcclxuICAgICAgLyogaWdub3JlICovXHJcbiAgICB9XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBzeW5jRWRpdE1vZGVPbkVudHJ5ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGNvbnN0IGJhc2VJZCA9IGFjdGl2aWRhZElkIHx8IHJlY0lkIHx8IFwiZGVmYXVsdFwiO1xuICAgIGNvbnN0IGtleSA9IGBpbmRfdmlzaXRfZWRpdF8ke2Jhc2VJZH1gO1xuICAgIGNvbnN0IHJldHVybktleSA9IGAke2tleX1fcmV0dXJuYDtcbiAgICBjb25zdCBkcmFmdEtleSA9IGBpbmRfdmlzaXRfZHJhZnRfJHtiYXNlSWR9YDtcbiAgICBlZGl0TW9kZUtleVJlZi5jdXJyZW50ID0ga2V5O1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBhbGxvd1Jlc3RvcmUgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKHJldHVybktleSkgPT09IFwiMVwiO1xuICAgICAgaWYgKGFsbG93UmVzdG9yZSkge1xuICAgICAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKHJldHVybktleSk7XG4gICAgICB9XG4gICAgICBpZiAoY2FuRWRpdEhpc3RvcnkgJiYgYWxsb3dSZXN0b3JlICYmIHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oa2V5KSA9PT0gXCJ0cnVlXCIpIHtcbiAgICAgICAgc2V0SXNFZGl0aW5nKHRydWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2V0SXNFZGl0aW5nKGZhbHNlKTtcbiAgICAgICAgc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xuICAgICAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKGRyYWZ0S2V5KTtcbiAgICAgIH1cbiAgICAgIGlmICghY2FuRWRpdEhpc3RvcnkpIHtcbiAgICAgICAgc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xuICAgICAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKGRyYWZ0S2V5KTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIHtcbiAgICAgIC8qIGlnbm9yZSAqL1xuICAgIH1cbiAgfSwgW2FjdGl2aWRhZElkLCByZWNJZCwgY2FuRWRpdEhpc3RvcnldKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHN5bmNFZGl0TW9kZU9uRW50cnkoKTtcbiAgfSwgW3N5bmNFZGl0TW9kZU9uRW50cnldKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IG9uUGFnZVNob3cgPSAoZXZlbnQ6IFBhZ2VUcmFuc2l0aW9uRXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IG5hdkVudHJ5ID0gdHlwZW9mIHBlcmZvcm1hbmNlICE9PSBcInVuZGVmaW5lZFwiICYmIHBlcmZvcm1hbmNlLmdldEVudHJpZXNCeVR5cGVcbiAgICAgICAgPyAocGVyZm9ybWFuY2UuZ2V0RW50cmllc0J5VHlwZShcIm5hdmlnYXRpb25cIilbMF0gYXMgUGVyZm9ybWFuY2VOYXZpZ2F0aW9uVGltaW5nIHwgdW5kZWZpbmVkKVxuICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICAgIGNvbnN0IGlzQmFja0ZvcndhcmQgPSBuYXZFbnRyeT8udHlwZSA9PT0gXCJiYWNrX2ZvcndhcmRcIjtcbiAgICAgIGlmIChldmVudD8ucGVyc2lzdGVkIHx8IGlzQmFja0ZvcndhcmQpIHtcbiAgICAgICAgc3luY0VkaXRNb2RlT25FbnRyeSgpO1xuICAgICAgfVxuICAgIH07XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwYWdlc2hvd1wiLCBvblBhZ2VTaG93KTtcbiAgICByZXR1cm4gKCkgPT4gd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwYWdlc2hvd1wiLCBvblBhZ2VTaG93KTtcbiAgfSwgW3N5bmNFZGl0TW9kZU9uRW50cnldKTtcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBrZXkgPSBgaW5kX3Zpc2l0X2RyYWZ0XyR7YWN0aXZpZGFkSWQgfHwgcmVjSWQgfHwgXCJkZWZhdWx0XCJ9YDtcclxuICAgIGRyYWZ0S2V5UmVmLmN1cnJlbnQgPSBrZXk7XHJcbiAgfSwgW2FjdGl2aWRhZElkLCByZWNJZF0pO1xyXG5cclxuICBjb25zdCBzYXZlRHJhZnQgPSB1c2VDYWxsYmFjaygoZHJhZnQpID0+IHtcclxuICAgIGNvbnN0IGtleSA9IGRyYWZ0S2V5UmVmLmN1cnJlbnQ7XHJcbiAgICBpZiAoIWtleSkgcmV0dXJuO1xyXG4gICAgdHJ5IHtcclxuICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShrZXksIEpTT04uc3RyaW5naWZ5KGRyYWZ0KSk7XHJcbiAgICB9IGNhdGNoIHtcclxuICAgICAgLyogaWdub3JlICovXHJcbiAgICB9XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBjbGVhckRyYWZ0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgY29uc3Qga2V5ID0gZHJhZnRLZXlSZWYuY3VycmVudDtcclxuICAgIGlmICgha2V5KSByZXR1cm47XHJcbiAgICB0cnkge1xyXG4gICAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XHJcbiAgICB9IGNhdGNoIHtcclxuICAgICAgLyogaWdub3JlICovXHJcbiAgICB9XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBhcHBseURyYWZ0VmFsdWVzID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgY29uc3Qga2V5ID0gZHJhZnRLZXlSZWYuY3VycmVudDtcclxuICAgIGlmICgha2V5KSByZXR1cm47XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCByYXcgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGtleSk7XHJcbiAgICAgIGlmICghcmF3KSByZXR1cm47XHJcbiAgICAgIGNvbnN0IGRyYWZ0ID0gSlNPTi5wYXJzZShyYXcpO1xyXG4gICAgICBpZiAoIWRyYWZ0IHx8IHR5cGVvZiBkcmFmdCAhPT0gXCJvYmplY3RcIikgcmV0dXJuO1xyXG4gICAgICBpZiAoZHJhZnQudHJhbnNEYXRlKSBzZXRUcmFuc0RhdGUoU3RyaW5nKGRyYWZ0LnRyYW5zRGF0ZSkpO1xyXG4gICAgICBpZiAoZHJhZnQudmlzaXRUeXBlICE9PSB1bmRlZmluZWQpIHNldFZpc2l0VHlwZShTdHJpbmcoZHJhZnQudmlzaXRUeXBlKSk7XHJcbiAgICAgIGlmIChkcmFmdC5hc2lzdGVudGVUaXBvICE9PSB1bmRlZmluZWQpIHNldEFzaXN0ZW50ZVRpcG8oU3RyaW5nKGRyYWZ0LmFzaXN0ZW50ZVRpcG8pKTtcclxuICAgICAgaWYgKGRyYWZ0LmRlc2NyaXB0aW9uICE9PSB1bmRlZmluZWQpIHNldERlc2NyaXB0aW9uKFN0cmluZyhkcmFmdC5kZXNjcmlwdGlvbikpO1xyXG4gICAgICBpZiAoZHJhZnQuY29tZW50YXJpb3MgIT09IHVuZGVmaW5lZCkgc2V0Q29tZW50YXJpb3MoU3RyaW5nKGRyYWZ0LmNvbWVudGFyaW9zKSk7XHJcbiAgICAgIGlmIChkcmFmdC5hbnRlY2VkZW50ZXMgIT09IHVuZGVmaW5lZCkgc2V0QW50ZWNlZGVudGVzKFN0cmluZyhkcmFmdC5hbnRlY2VkZW50ZXMpKTtcclxuICAgICAgaWYgKGRyYWZ0LmNvbmNsdXNpb25lcyAhPT0gdW5kZWZpbmVkKSBzZXRDb25jbHVzaW9uZXMoU3RyaW5nKGRyYWZ0LmNvbmNsdXNpb25lcykpO1xyXG4gICAgfSBjYXRjaCB7XHJcbiAgICAgIC8qIGlnbm9yZSAqL1xyXG4gICAgfVxyXG4gIH0sIFtdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWlzRWRpdGluZykge1xuICAgICAgaWYgKGRyYWZ0UGVyc2lzdFRpbWVyUmVmLmN1cnJlbnQpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KGRyYWZ0UGVyc2lzdFRpbWVyUmVmLmN1cnJlbnQpO1xuICAgICAgICBkcmFmdFBlcnNpc3RUaW1lclJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoZHJhZnRQZXJzaXN0VGltZXJSZWYuY3VycmVudCkge1xuICAgICAgY2xlYXJUaW1lb3V0KGRyYWZ0UGVyc2lzdFRpbWVyUmVmLmN1cnJlbnQpO1xuICAgIH1cblxuICAgIGRyYWZ0UGVyc2lzdFRpbWVyUmVmLmN1cnJlbnQgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBkcmFmdFBlcnNpc3RUaW1lclJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICAgIHNhdmVEcmFmdCh7XG4gICAgICAgIHRyYW5zRGF0ZSxcbiAgICAgICAgdmlzaXRUeXBlLFxuICAgICAgICBhc2lzdGVudGVUaXBvLFxuICAgICAgICBkZXNjcmlwdGlvbixcbiAgICAgICAgY29tZW50YXJpb3MsXG4gICAgICAgIGFudGVjZWRlbnRlcyxcbiAgICAgICAgY29uY2x1c2lvbmVzXG4gICAgICB9KTtcbiAgICB9LCAxODApO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGlmIChkcmFmdFBlcnNpc3RUaW1lclJlZi5jdXJyZW50KSB7XG4gICAgICAgIGNsZWFyVGltZW91dChkcmFmdFBlcnNpc3RUaW1lclJlZi5jdXJyZW50KTtcbiAgICAgICAgZHJhZnRQZXJzaXN0VGltZXJSZWYuY3VycmVudCA9IG51bGw7XG4gICAgICB9XG4gICAgfTtcbiAgfSwgW3RyYW5zRGF0ZSwgdmlzaXRUeXBlLCBhc2lzdGVudGVUaXBvLCBkZXNjcmlwdGlvbiwgY29tZW50YXJpb3MsIGFudGVjZWRlbnRlcywgY29uY2x1c2lvbmVzLCBpc0VkaXRpbmcsIHNhdmVEcmFmdF0pO1xuXHJcbiAgY29uc3QgaGFzU2VydmVyRGV0YWlsID1cclxuICAgIGhhc1ZhbHVlKHJlY0lkKSAmJlxyXG4gICAgaGFzVmFsdWUoYWNjb3VudE51bSkgJiZcclxuICAgIGhhc1ZhbHVlKGRldGFpbC50cmFuc0RhdGUgfHwgZGV0YWlsLlRyYW5zRGF0ZSB8fCBcIlwiKTtcclxuXHJcbiAgY29uc3Qgc2hvdWxkSHlkcmF0ZSA9ICEhYWN0aXZpZGFkSWQgJiYgIWhhc1NlcnZlckRldGFpbDtcclxuXHJcbiAgY29uc3Qgb3BlblRleHRFZGl0b3IgPSB1c2VDYWxsYmFjayhcclxuICAgIChcclxuICAgICAgZmllbGRJZDogc3RyaW5nLFxyXG4gICAgICBmaWVsZExhYmVsOiBzdHJpbmcsXHJcbiAgICAgIGZpZWxkVmFsdWU6IHN0cmluZyxcclxuICAgICAgb3B0aW9uczogeyBhbGxvd0VkaXQ/OiBib29sZWFuOyByZWFkT25seT86IGJvb2xlYW47IGVkaXRNb2RlS2V5Pzogc3RyaW5nIH0gPSB7fVxyXG4gICAgKSA9PiB7XHJcbiAgICBjb25zdCBzYWZlSWQgPSBTdHJpbmcoZmllbGRJZCB8fCBcIlwiKS50cmltKCk7XHJcbiAgICBjb25zdCBzYWZlTGFiZWwgPSBTdHJpbmcoZmllbGRMYWJlbCB8fCBcIlwiKS50cmltKCk7XG4gICAgY29uc3QgcmVhZE9ubHkgPSBvcHRpb25zPy5yZWFkT25seSA9PT0gdHJ1ZTtcbiAgICBjb25zdCBhbGxvd0VkaXQgPSBvcHRpb25zPy5hbGxvd0VkaXQgIT09IGZhbHNlO1xuICAgIGNvbnN0IGVkaXRNb2RlS2V5ID0gU3RyaW5nKG9wdGlvbnM/LmVkaXRNb2RlS2V5IHx8IFwiXCIpLnRyaW0oKTtcbiAgICBpZiAoc2FmZUlkKSB7XHJcbiAgICAgIGNvbnN0IGtleSA9IGAke1RFWFRfRURJVE9SX1BSRUZJWH0ke3NhZmVJZH1gO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIC8vIFByaW1lIHRoZSBlZGl0b3Igd2l0aCB0aGUgY3VycmVudCB2YWx1ZSB3aXRob3V0IHB1c2hpbmcgbGFyZ2UgdGV4dCBpbnRvIHRoZSBVUkwuXHJcbiAgICAgICAgaWYgKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oa2V5KSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShrZXksIFN0cmluZyhmaWVsZFZhbHVlIHx8IFwiXCIpKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gY2F0Y2gge1xyXG4gICAgICAgIC8qIGlnbm9yZSAqL1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmV0dXJuVXJsID0gYCR7d2luZG93LmxvY2F0aW9uLnBhdGhuYW1lfSR7d2luZG93LmxvY2F0aW9uLnNlYXJjaCB8fCBcIlwifWA7XHJcbiAgICB0cnkge1xuICAgICAgaWYgKHNhZmVJZCkge1xuICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKGAke1RFWFRfRURJVE9SX1BSRUZJWH0ke3NhZmVJZH1fcmV0dXJuVXJsYCwgcmV0dXJuVXJsKTtcbiAgICAgIH1cbiAgICAgIGlmIChlZGl0TW9kZUtleSkge1xuICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKGAke2VkaXRNb2RlS2V5fV9yZXR1cm5gLCBcIjFcIik7XG4gICAgICB9XG4gICAgfSBjYXRjaCB7XG4gICAgICAvKiBpZ25vcmUgKi9cbiAgICB9XG4gICAgY29uc3QgdXJsID1cbiAgICAgIGAvVGV4dEVkaXRvclJlYWN0L0VkaXRGaWVsZD9maWVsZElkPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHNhZmVJZCB8fCBmaWVsZElkIHx8IFwiXCIpfWAgK1xuICAgICAgYCZmaWVsZExhYmVsPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHNhZmVMYWJlbCB8fCBmaWVsZExhYmVsIHx8IFwiXCIpfWAgK1xuICAgICAgYCZyZXR1cm5Vcmw9JHtlbmNvZGVVUklDb21wb25lbnQocmV0dXJuVXJsKX1gICtcbiAgICAgIGAmcmVhZE9ubHk9JHtyZWFkT25seSA/IFwiMVwiIDogXCIwXCJ9YCArXG4gICAgICBgJmFsbG93RWRpdD0ke2FsbG93RWRpdCA/IFwiMVwiIDogXCIwXCJ9YCArXG4gICAgICAoZWRpdE1vZGVLZXkgPyBgJmVkaXRNb2RlS2V5PSR7ZW5jb2RlVVJJQ29tcG9uZW50KGVkaXRNb2RlS2V5KX1gIDogXCJcIik7XG5cbiAgICB3aW5kb3cuX19pbmRCeXBhc3NOYXZpZ2F0aW9uR3VhcmRPbmNlPy4oKTtcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHVybDtcbiAgICB9LFxuICAgIFtdXG4gICk7XG5cclxuICBjb25zdCBoYW5kbGVDb21lbnRhcmlvc1RhcCA9IHVzZUNhbGxiYWNrKChldmVudCkgPT4ge1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIG9wZW5UZXh0RWRpdG9yKGZpZWxkSWRDb21lbnRhcmlvcywgaW5kVChcIlZpc2l0c19GaWVsZF9Db21tZW50c1wiLCBcIkNvbW1lbnRzXCIpLCBjb21lbnRhcmlvcywge1xyXG4gICAgICByZWFkT25seTogIWlzRWRpdGluZyxcclxuICAgICAgYWxsb3dFZGl0OiBjYW5FZGl0SGlzdG9yeSxcclxuICAgICAgZWRpdE1vZGVLZXk6IGVkaXRNb2RlS2V5UmVmLmN1cnJlbnRcclxuICAgIH0pO1xyXG4gIH0sIFtjb21lbnRhcmlvcywgaXNFZGl0aW5nLCBjYW5FZGl0SGlzdG9yeSwgb3BlblRleHRFZGl0b3JdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQ29tZW50YXJpb3NIb2xkID0gdXNlQ2FsbGJhY2soKHRhcmdldCwgY2xpZW50WSkgPT4ge1xyXG4gICAgaWYgKCF0YXJnZXQgfHwgIWlzT3ZlcmZsb3dpbmcodGFyZ2V0KSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgc2V0UHJldmlld0FuY2hvcih0YXJnZXQpO1xyXG4gICAgcmV0dXJuIHNob3dQcmV2aWV3VG9vbHRpcChTdHJpbmcoY29tZW50YXJpb3MgfHwgXCJcIiksIGNsaWVudFkpO1xyXG4gIH0sIFtjb21lbnRhcmlvc10pO1xyXG5cclxuICBjb25zdCBoYW5kbGVBbnRlY2VkZW50ZXNUYXAgPSB1c2VDYWxsYmFjaygoZXZlbnQpID0+IHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBvcGVuVGV4dEVkaXRvcihmaWVsZElkQW50ZWNlZGVudGVzLCBpbmRUKFwiVmlzaXRzX0ZpZWxkX0JhY2tncm91bmRcIiwgXCJCYWNrZ3JvdW5kXCIpLCBhbnRlY2VkZW50ZXMsIHtcclxuICAgICAgcmVhZE9ubHk6ICFpc0VkaXRpbmcsXHJcbiAgICAgIGFsbG93RWRpdDogY2FuRWRpdEhpc3RvcnksXHJcbiAgICAgIGVkaXRNb2RlS2V5OiBlZGl0TW9kZUtleVJlZi5jdXJyZW50XHJcbiAgICB9KTtcclxuICB9LCBbYW50ZWNlZGVudGVzLCBpc0VkaXRpbmcsIGNhbkVkaXRIaXN0b3J5LCBvcGVuVGV4dEVkaXRvcl0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVBbnRlY2VkZW50ZXNIb2xkID0gdXNlQ2FsbGJhY2soKHRhcmdldCwgY2xpZW50WSkgPT4ge1xyXG4gICAgaWYgKCF0YXJnZXQgfHwgIWlzT3ZlcmZsb3dpbmcodGFyZ2V0KSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgc2V0UHJldmlld0FuY2hvcih0YXJnZXQpO1xyXG4gICAgcmV0dXJuIHNob3dQcmV2aWV3VG9vbHRpcChTdHJpbmcoYW50ZWNlZGVudGVzIHx8IFwiXCIpLCBjbGllbnRZKTtcclxuICB9LCBbYW50ZWNlZGVudGVzXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUNvbmNsdXNpb25lc1RhcCA9IHVzZUNhbGxiYWNrKChldmVudCkgPT4ge1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIG9wZW5UZXh0RWRpdG9yKGZpZWxkSWRDb25jbHVzaW9uZXMsIGluZFQoXCJWaXNpdHNfRmllbGRfQ29uY2x1c2lvbnNcIiwgXCJDb25jbHVzaW9uc1wiKSwgY29uY2x1c2lvbmVzLCB7XHJcbiAgICAgIHJlYWRPbmx5OiAhaXNFZGl0aW5nLFxyXG4gICAgICBhbGxvd0VkaXQ6IGNhbkVkaXRIaXN0b3J5LFxyXG4gICAgICBlZGl0TW9kZUtleTogZWRpdE1vZGVLZXlSZWYuY3VycmVudFxyXG4gICAgfSk7XHJcbiAgfSwgW2NvbmNsdXNpb25lcywgaXNFZGl0aW5nLCBjYW5FZGl0SGlzdG9yeSwgb3BlblRleHRFZGl0b3JdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQ29uY2x1c2lvbmVzSG9sZCA9IHVzZUNhbGxiYWNrKCh0YXJnZXQsIGNsaWVudFkpID0+IHtcclxuICAgIGlmICghdGFyZ2V0IHx8ICFpc092ZXJmbG93aW5nKHRhcmdldCkpIHJldHVybiBmYWxzZTtcclxuICAgIHNldFByZXZpZXdBbmNob3IodGFyZ2V0KTtcclxuICAgIHJldHVybiBzaG93UHJldmlld1Rvb2x0aXAoU3RyaW5nKGNvbmNsdXNpb25lcyB8fCBcIlwiKSwgY2xpZW50WSk7XHJcbiAgfSwgW2NvbmNsdXNpb25lc10pO1xyXG5cclxuICBjb25zdCBjb21lbnRhcmlvc1RhcCA9IHVzZVRhcEd1YXJkKGhhbmRsZUNvbWVudGFyaW9zVGFwLCBoYW5kbGVDb21lbnRhcmlvc0hvbGQpO1xyXG4gIGNvbnN0IGFudGVjZWRlbnRlc1RhcCA9IHVzZVRhcEd1YXJkKGhhbmRsZUFudGVjZWRlbnRlc1RhcCwgaGFuZGxlQW50ZWNlZGVudGVzSG9sZCk7XHJcbiAgY29uc3QgY29uY2x1c2lvbmVzVGFwID0gdXNlVGFwR3VhcmQoaGFuZGxlQ29uY2x1c2lvbmVzVGFwLCBoYW5kbGVDb25jbHVzaW9uZXNIb2xkKTtcclxuXHJcbiAgY29uc3QgYXBwbHlUZXh0RWRpdG9yVmFsdWVzID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgY29uc3QgdmFsQ29tZW50YXJpb3MgPSByZWFkQW5kQ2xlYXJUZXh0RWRpdG9yVmFsdWUoZmllbGRJZENvbWVudGFyaW9zKTtcclxuICAgIGlmICh2YWxDb21lbnRhcmlvcyAhPT0gbnVsbCkgc2V0Q29tZW50YXJpb3ModmFsQ29tZW50YXJpb3MpO1xyXG5cclxuICAgIGNvbnN0IHZhbEFudGVjZWRlbnRlcyA9IHJlYWRBbmRDbGVhclRleHRFZGl0b3JWYWx1ZShmaWVsZElkQW50ZWNlZGVudGVzKTtcclxuICAgIGlmICh2YWxBbnRlY2VkZW50ZXMgIT09IG51bGwpIHNldEFudGVjZWRlbnRlcyh2YWxBbnRlY2VkZW50ZXMpO1xyXG5cclxuICAgIGNvbnN0IHZhbENvbmNsdXNpb25lcyA9IHJlYWRBbmRDbGVhclRleHRFZGl0b3JWYWx1ZShmaWVsZElkQ29uY2x1c2lvbmVzKTtcclxuICAgIGlmICh2YWxDb25jbHVzaW9uZXMgIT09IG51bGwpIHNldENvbmNsdXNpb25lcyh2YWxDb25jbHVzaW9uZXMpO1xyXG4gIH0sIFtmaWVsZElkQ29tZW50YXJpb3MsIGZpZWxkSWRBbnRlY2VkZW50ZXMsIGZpZWxkSWRDb25jbHVzaW9uZXNdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghYWN0aXZpZGFkSWQpIHtcclxuICAgICAgYXBwbHlUZXh0RWRpdG9yVmFsdWVzKCk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBvblBhZ2VTaG93ID0gKCkgPT4gYXBwbHlUZXh0RWRpdG9yVmFsdWVzKCk7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInBhZ2VzaG93XCIsIG9uUGFnZVNob3cpO1xyXG4gICAgcmV0dXJuICgpID0+IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicGFnZXNob3dcIiwgb25QYWdlU2hvdyk7XHJcbiAgfSwgW2FjdGl2aWRhZElkLCBhcHBseVRleHRFZGl0b3JWYWx1ZXNdKTtcclxuXHJcbiAgY29uc3QgeyBtb2RhbCwgb3BlbkNvbmZpcm0sIGNsb3NlQ29uZmlybSwgaGFuZGxlQ29uZmlybSB9ID0gdXNlQ29uZmlybURpYWxvZyh7XHJcbiAgICBkZWZhdWx0Q29uZmlybVRleHQ6IGluZFQoXCJDb25maXJtX1llc1wiLCBcIk9LXCIpLFxyXG4gICAgZGVmYXVsdENhbmNlbFRleHQ6IGluZFQoXCJDb25maXJtX05vXCIsIFwiQ2FuY2VsXCIpXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZU1vZGFsQ29uZmlybSA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcclxuICAgIHNldE1vZGFsRXJyb3IoXCJcIik7XHJcbiAgICBhd2FpdCBoYW5kbGVDb25maXJtKHtcclxuICAgICAgYnVzeSxcclxuICAgICAgb25FcnJvcjogKG1zZykgPT4ge1xyXG4gICAgICAgIHNldE1vZGFsRXJyb3IobXNnKTtcclxuICAgICAgICBzZXRTdGF0dXMobXNnKTtcclxuICAgICAgICBmbGFzaEFjdGlvbk1hcmsoXCJlcnJvclByb2Nlc3NcIiwgMTUwMCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0sIFtidXN5LCBoYW5kbGVDb25maXJtXSk7XHJcblxyXG4gIGNvbnN0IG1vZGFsTG9hZGluZ1RleHQgPSBpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpO1xyXG4gIGNvbnN0IG1vZGFsQ2FuY2VsVGV4dCA9IG1vZGFsLmNhbmNlbFRleHQgfHwgaW5kVChcIkNvbmZpcm1fTm9cIiwgXCJDYW5jZWxcIik7XHJcbiAgY29uc3QgbW9kYWxDb25maXJtVGV4dCA9IGJ1c3lcclxuICAgID8gbW9kYWxMb2FkaW5nVGV4dFxyXG4gICAgOiAoIWJ1c3kgJiYgbW9kYWxFcnJvciA/IGluZFQoXCJDb21tb25fT0tcIiwgXCJPS1wiKSA6IChtb2RhbC5jb25maXJtVGV4dCB8fCBpbmRUKFwiQ29uZmlybV9ZZXNcIiwgXCJPS1wiKSkpO1xyXG5cclxuICBjb25zdCBoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm0gPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKCFidXN5ICYmIG1vZGFsRXJyb3IpIHtcbiAgICAgIGNsb3NlQ29uZmlybSgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBoYW5kbGVNb2RhbENvbmZpcm0oKTtcbiAgfSwgW2J1c3ksIG1vZGFsRXJyb3IsIGNsb3NlQ29uZmlybSwgaGFuZGxlTW9kYWxDb25maXJtXSk7XG5cbiAgY29uc3QgaGFzQWN0aXZlUHJvY2VzcyA9IHVzZU1lbW8oKCkgPT4gYnVzeSB8fCBpc0VkaXRpbmcsIFtidXN5LCBpc0VkaXRpbmddKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHdpbmRvdy5fX2luZFNldE5hdmlnYXRpb25HdWFyZD8uKGhhc0FjdGl2ZVByb2Nlc3MpO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB3aW5kb3cuX19pbmRDbGVhck5hdmlnYXRpb25HdWFyZD8uKCk7XG4gICAgfTtcbiAgfSwgW2hhc0FjdGl2ZVByb2Nlc3NdKTtcblxyXG4gIC8vIGh5ZHJhdGUgZGF0YSBmcm9tIHNlcnZlciBpZiBhbnkgZmllbGQgaXMgbWlzc2luZ1xyXG4gIGNvbnN0IGh5ZHJhdGVGcm9tQXBpID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgaWYgKCFhY3RpdmlkYWRJZCkgcmV0dXJuO1xyXG4gICAgc2V0SXNIeWRyYXRpbmcodHJ1ZSk7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaEpzb24oYC9WaXNpdGFzL0dldEFjdGl2aXR5QnlDb2RlP2NvZGU9JHtlbmNvZGVVUklDb21wb25lbnQoYWN0aXZpZGFkSWQpfWApO1xyXG4gICAgICBpZiAoIXJlcz8uc3VjY2VzcyB8fCAhcmVzLmRhdGEpIHtcclxuICAgICAgICBzZXRTdGF0dXMocmVzPy5tZXNzYWdlIHx8IGluZFQoXCJWaXNpdHNfRGV0YWlsX0xvYWRBY3Rpdml0eUZhaWxlZFwiLCBcIkZhaWxlZCB0byBsb2FkIGFjdGl2aXR5IGRldGFpbHMuXCIpKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgZGF0YSA9IHJlcy5kYXRhO1xyXG4gICAgICBjb25zdCByYXdEYXRlID0gU3RyaW5nKGRhdGEudHJhbnNEYXRlID8/IGRhdGEuVHJhbnNEYXRlID8/IFwiXCIpO1xyXG4gICAgICBzZXRUcmFuc0RhdGUobm9ybWFsaXplRGF0ZVRvSW5wdXQocmF3RGF0ZSkpO1xyXG4gICAgICBjb25zdCByYXdWaXNpdFR5cGUgPSBTdHJpbmcoXHJcbiAgICAgICAgZGF0YS50aXBvVmlzaXRhID8/IGRhdGEuVGlwb1Zpc2l0YSA/PyBkYXRhLnZpc2l0VHlwZSA/PyBkYXRhLlZpc2l0VHlwZSA/PyBcIlwiXHJcbiAgICAgICk7XHJcbiAgICAgIHNldFZpc2l0VHlwZShtYXRjaE9wdGlvblZhbHVlKHZpc2l0VHlwZXMsIHJhd1Zpc2l0VHlwZSkgfHwgZGVmYXVsdFZpc2l0VHlwZSk7XHJcblxyXG4gICAgICBjb25zdCBhc2lzdGVudGVzTGlzdCA9IGRhdGEuYXNpc3RlbnRlcyA/PyBkYXRhLkFzaXN0ZW50ZXM7XHJcbiAgICAgIGNvbnN0IGZpcnN0QXNpc3RlbnRlID1cclxuICAgICAgICBBcnJheS5pc0FycmF5KGFzaXN0ZW50ZXNMaXN0KSAmJiBhc2lzdGVudGVzTGlzdC5sZW5ndGggPyBhc2lzdGVudGVzTGlzdFswXSA6IG51bGw7XHJcbiAgICAgIGNvbnN0IHJhd0FzaXN0ZW50ZVRpcG8gPSBTdHJpbmcoXHJcbiAgICAgICAgZGF0YS5hc2lzdGVudGVUaXBvID8/XHJcbiAgICAgICAgICBkYXRhLkFzaXN0ZW50ZVRpcG8gPz9cclxuICAgICAgICAgIGZpcnN0QXNpc3RlbnRlPy5hc2lzdGVudGVUaXBvID8/XHJcbiAgICAgICAgICBmaXJzdEFzaXN0ZW50ZT8uQXNpc3RlbnRlVGlwbyA/P1xyXG4gICAgICAgICAgXCJcIlxyXG4gICAgICApO1xyXG4gICAgICBjb25zdCBub3JtYWxpemVkQXNpc3RlbnRlVGlwbyA9IG1hdGNoT3B0aW9uVmFsdWUoYXNpc3RlbnRlVGlwb3MsIHJhd0FzaXN0ZW50ZVRpcG8pO1xyXG4gICAgICBzZXRBc2lzdGVudGVUaXBvKG5vcm1hbGl6ZWRBc2lzdGVudGVUaXBvIHx8IGluaXRpYWxBc2lzdGVudGUpO1xyXG4gICAgICBzZXREZXNjcmlwdGlvbihTdHJpbmcoZGF0YS5kZXNjcmlwdGlvbiA/PyBkYXRhLkRlc2NyaXB0aW9uID8/IFwiXCIpKTtcclxuICAgICAgc2V0Q29tZW50YXJpb3MoU3RyaW5nKGRhdGEuY29tZW50YXJpb3MgPz8gZGF0YS5Db21lbnRhcmlvcyA/PyBcIlwiKSk7XHJcbiAgICAgIHNldEFudGVjZWRlbnRlcyhTdHJpbmcoZGF0YS5hbnRlY2VkZW50ZXMgPz8gZGF0YS5BbnRlY2VkZW50ZXMgPz8gXCJcIikpO1xyXG4gICAgICBzZXRDb25jbHVzaW9uZXMoU3RyaW5nKGRhdGEuY29uY2x1c2lvbmVzID8/IGRhdGEuQ29uY2x1c2lvbmVzID8/IFwiXCIpKTtcclxuICAgIH0gY2F0Y2gge1xyXG4gICAgfSBmaW5hbGx5IHtcclxuICAgICAgc2V0SXNIeWRyYXRpbmcoZmFsc2UpO1xyXG4gICAgICAvLyBBcHBseSBhbnkgcGVuZGluZyBkcmFmdCB2YWx1ZXMgZmlyc3QsIHRoZW4gb3ZlcnJpZGUgd2l0aCB0ZXh0IGVkaXRvciB2YWx1ZXMuXHJcbiAgICAgIGFwcGx5RHJhZnRWYWx1ZXMoKTtcclxuICAgICAgYXBwbHlUZXh0RWRpdG9yVmFsdWVzKCk7XHJcbiAgICB9XHJcbiAgfSwgW1xyXG4gICAgYWN0aXZpZGFkSWQsXHJcbiAgICBhc2lzdGVudGVUaXBvcyxcclxuICAgIHZpc2l0VHlwZXMsXHJcbiAgICBtYXRjaE9wdGlvblZhbHVlLFxyXG4gICAgbm9ybWFsaXplRGF0ZVRvSW5wdXQsXHJcbiAgICBpbml0aWFsQXNpc3RlbnRlLFxyXG4gICAgZGVmYXVsdFZpc2l0VHlwZSxcclxuICAgIGFwcGx5VGV4dEVkaXRvclZhbHVlcyxcclxuICAgIGFwcGx5RHJhZnRWYWx1ZXNcclxuICBdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmIChzaG91bGRIeWRyYXRlKSB7XHJcbiAgICAgIGh5ZHJhdGVGcm9tQXBpKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBhcHBseURyYWZ0VmFsdWVzKCk7XHJcbiAgICAgIGFwcGx5VGV4dEVkaXRvclZhbHVlcygpO1xyXG4gICAgfVxyXG4gIH0sIFtkZXRhaWwsIGh5ZHJhdGVGcm9tQXBpLCBzaG91bGRIeWRyYXRlLCBhcHBseVRleHRFZGl0b3JWYWx1ZXMsIGFwcGx5RHJhZnRWYWx1ZXNdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBlbCA9IHJlYWRPbmx5U3VyZmFjZVJlZi5jdXJyZW50O1xuICAgIGlmICghZWwpIHJldHVybjtcbiAgICBpZiAoIWlzRWRpdGluZykge1xuICAgICAgZWwuY2xhc3NMaXN0LmFkZChcImluZC1yZWFkb25seS1zdXJmYWNlXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiaW5kLXJlYWRvbmx5LXN1cmZhY2VcIik7XG4gICAgfVxuICB9LCBbaXNFZGl0aW5nXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoaXNFZGl0aW5nKSB7XG4gICAgICBpZiAoIWVkaXRTbmFwc2hvdFJlZi5jdXJyZW50KSB7XG4gICAgICAgIGVkaXRTbmFwc2hvdFJlZi5jdXJyZW50ID0ge1xuICAgICAgICAgIHRyYW5zRGF0ZSxcbiAgICAgICAgICB2aXNpdFR5cGUsXG4gICAgICAgICAgYXNpc3RlbnRlVGlwbyxcbiAgICAgICAgICBkZXNjcmlwdGlvbixcbiAgICAgICAgICBjb21lbnRhcmlvcyxcbiAgICAgICAgICBhbnRlY2VkZW50ZXMsXG4gICAgICAgICAgY29uY2x1c2lvbmVzXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGVkaXRTbmFwc2hvdFJlZi5jdXJyZW50ID0gbnVsbDtcbiAgfSwgW2lzRWRpdGluZywgdHJhbnNEYXRlLCB2aXNpdFR5cGUsIGFzaXN0ZW50ZVRpcG8sIGRlc2NyaXB0aW9uLCBjb21lbnRhcmlvcywgYW50ZWNlZGVudGVzLCBjb25jbHVzaW9uZXNdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChpc0VkaXRpbmcpIHJldHVybiB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIGJpbmRSZWFkT25seUd1YXJkKHJlYWRPbmx5U3VyZmFjZVJlZi5jdXJyZW50KTtcbiAgfSwgW2lzRWRpdGluZ10pO1xuXG4gIC8vIFRvZ2dsZSB0b3BiYXIgZWRpdC9zYXZlIGljb25zIGJhc2VkIG9uIGVkaXRpbmcgc3RhdGUuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgZWRpdEljb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpc2l0RWRpdEljb25cIik7XG4gICAgY29uc3Qgc2F2ZUljb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpc2l0U2F2ZUljb25cIik7XG4gICAgY29uc3QgZGVsZXRlQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2aXNpdERlbGV0ZUJ0blwiKTtcbiAgICBjb25zdCBjYW5jZWxCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpc2l0Q2FuY2VsQnRuXCIpO1xuICAgIGlmICghZWRpdEljb24gfHwgIXNhdmVJY29uKSByZXR1cm47XG4gICAgaWYgKGlzRWRpdGluZykge1xuICAgICAgZWRpdEljb24uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgIHNhdmVJY29uLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gICAgICBpZiAoZGVsZXRlQnRuKSBkZWxldGVCdG4uY2xhc3NMaXN0LmFkZChcInRvcGJhci1oaWRkZW5cIik7XG4gICAgICBpZiAoY2FuY2VsQnRuKSBjYW5jZWxCdG4uY2xhc3NMaXN0LnJlbW92ZShcInRvcGJhci1oaWRkZW5cIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVkaXRJY29uLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gICAgICBzYXZlSWNvbi5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgaWYgKGRlbGV0ZUJ0bikgZGVsZXRlQnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJ0b3BiYXItaGlkZGVuXCIpO1xuICAgICAgaWYgKGNhbmNlbEJ0bikgY2FuY2VsQnRuLmNsYXNzTGlzdC5hZGQoXCJ0b3BiYXItaGlkZGVuXCIpO1xuICAgIH1cbiAgfSwgW2lzRWRpdGluZ10pO1xuXHJcbiAgY29uc3QgaGFuZGxlRW5hYmxlRWRpdCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoIWNhbkVkaXRIaXN0b3J5KSB7XG4gICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHNldElzRWRpdGluZyh0cnVlKTtcbiAgICBzeW5jRWRpdE1vZGVGbGFnKHRydWUpO1xuICAgIHNldFN0YXR1cyhpbmRUKFwiVmlzaXRzX0RldGFpbF9FZGl0aW5nRW5hYmxlZFwiLCBcIkVkaXRpbmcgZW5hYmxlZFwiKSk7XG4gIH0sIFtzeW5jRWRpdE1vZGVGbGFnXSk7XG5cbiAgY29uc3QgaGFuZGxlQ2FuY2VsRWRpdCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoIWlzRWRpdGluZykgcmV0dXJuO1xuICAgIHNldElzRWRpdGluZyhmYWxzZSk7XG4gICAgc3luY0VkaXRNb2RlRmxhZyhmYWxzZSk7XG4gICAgY2xlYXJEcmFmdCgpO1xuICAgIHNldFN0YXR1cyhpbmRUKFwiQ29tbW9uX0NhbmNlbFwiLCBcIkNhbmNlbFwiKSk7XG4gICAgd2luZG93Ll9faW5kQnlwYXNzTmF2aWdhdGlvbkd1YXJkT25jZT8uKCk7XG4gICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICB9LCBbaXNFZGl0aW5nLCBzeW5jRWRpdE1vZGVGbGFnLCBjbGVhckRyYWZ0XSk7XG5cclxuICBjb25zdCBoYW5kbGVVcGRhdGUgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XHJcbiAgICBpZiAoYnVzeSB8fCAhaXNFZGl0aW5nKSByZXR1cm4gZmFsc2U7XHJcbiAgICBpZiAoIWNhbkVkaXRIaXN0b3J5KSB7XHJcbiAgICAgIHNob3dQZXJtaXNzaW9uTW9kYWwoKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgc2V0TW9kYWxFcnJvcihcIlwiKTtcclxuICAgIHNldEJ1c3kodHJ1ZSk7XHJcbiAgICBzZXRTdGF0dXMoaW5kVChcIlZpc2l0c19EZXRhaWxfVXBkYXRpbmdcIiwgXCJVcGRhdGluZyBhY3Rpdml0eS4uLlwiKSk7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBub3JtYWxpemVkVmlzaXRUeXBlID1cclxuICAgICAgICBtYXRjaE9wdGlvblZhbHVlKHZpc2l0VHlwZXMsIHZpc2l0VHlwZSkgfHxcclxuICAgICAgICBtYXRjaE9wdGlvblZhbHVlKHZpc2l0VHlwZXMsIHJhd0luaXRpYWxWaXNpdFR5cGUpIHx8XHJcbiAgICAgICAgZGVmYXVsdFZpc2l0VHlwZTtcclxuICAgICAgY29uc3Qgbm9ybWFsaXplZEFzaXN0ZW50ZVRpcG8gPVxyXG4gICAgICAgIG1hdGNoT3B0aW9uVmFsdWUoYXNpc3RlbnRlVGlwb3MsIGFzaXN0ZW50ZVRpcG8pIHx8XHJcbiAgICAgICAgbWF0Y2hPcHRpb25WYWx1ZShhc2lzdGVudGVUaXBvcywgcmF3SW5pdGlhbEFzaXN0ZW50ZSkgfHxcclxuICAgICAgICByYXdJbml0aWFsQXNpc3RlbnRlO1xyXG4gICAgICBjb25zdCBwYXlsb2FkID0ge1xyXG4gICAgICAgIGFjY291bnROdW06IGFjY291bnROdW0sXHJcbiAgICAgICAgdmlzaXRUeXBlOiBub3JtYWxpemVkVmlzaXRUeXBlLFxyXG4gICAgICAgIGFzaXN0ZW50ZVRpcG86IG5vcm1hbGl6ZWRBc2lzdGVudGVUaXBvLFxyXG4gICAgICAgIGRlc2NyaXB0aW9uLFxyXG4gICAgICAgIHRyYW5zRGF0ZSxcclxuICAgICAgICBjb21lbnRhcmlvcyxcclxuICAgICAgICBhbnRlY2VkZW50ZXMsXHJcbiAgICAgICAgY29uY2x1c2lvbmVzXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaEpzb24oYC9WaXNpdGFzL1VwZGF0ZUFjdGl2aXR5LyR7cmVjSWR9YCwge1xyXG4gICAgICAgIG1ldGhvZDogXCJQVVRcIixcclxuICAgICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXHJcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGF5bG9hZClcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpZiAoIXJlcy5zdWNjZXNzKSB0aHJvdyBuZXcgRXJyb3IocmVzLm1lc3NhZ2UgfHwgaW5kVChcIlZpc2l0c19EZXRhaWxfVXBkYXRlRmFpbGVkXCIsIFwiVXBkYXRlIGZhaWxlZC5cIikpO1xyXG5cclxuICAgICAgc2V0U3RhdHVzKGluZFQoXCJWaXNpdHNfRGV0YWlsX1VwZGF0ZWRcIiwgXCJBY3Rpdml0eSB1cGRhdGVkXCIpKTtcclxuICAgICAgc2V0SXNFZGl0aW5nKGZhbHNlKTtcclxuICAgICAgc3luY0VkaXRNb2RlRmxhZyhmYWxzZSk7XHJcbiAgICAgIGNsZWFyRHJhZnQoKTtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgY29uc3QgbXNnID0gZXJyPy5tZXNzYWdlIHx8IGluZFQoXCJWaXNpdHNfRGV0YWlsX1VwZGF0ZUVycm9yXCIsIFwiVXBkYXRlIGVycm9yLlwiKTtcclxuICAgICAgc2V0TW9kYWxFcnJvcihtc2cpO1xyXG4gICAgICBzZXRTdGF0dXMobXNnKTtcclxuICAgICAgZmxhc2hBY3Rpb25NYXJrKFwiZXJyb3JQcm9jZXNzXCIsIDE1MDApO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9IGZpbmFsbHkge1xyXG4gICAgICBzZXRCdXN5KGZhbHNlKTtcclxuICAgIH1cclxuICB9LCBbYW50ZWNlZGVudGVzLCBjb21lbnRhcmlvcywgY29uY2x1c2lvbmVzLCBkZXNjcmlwdGlvbiwgdHJhbnNEYXRlLCB2aXNpdFR5cGUsIGFzaXN0ZW50ZVRpcG8sIHZpc2l0VHlwZXMsIGFzaXN0ZW50ZVRpcG9zLCBtYXRjaE9wdGlvblZhbHVlLCBhY2NvdW50TnVtLCBidXN5LCBpc0VkaXRpbmcsIHN5bmNFZGl0TW9kZUZsYWddKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlRGVsZXRlID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgaWYgKGJ1c3kpIHJldHVybiBmYWxzZTtcclxuICAgIGlmICghY2FuRGVsZXRlSGlzdG9yeSkge1xyXG4gICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHNldE1vZGFsRXJyb3IoXCJcIik7XHJcbiAgICBzZXRCdXN5KHRydWUpO1xyXG4gICAgc2V0U3RhdHVzKGluZFQoXCJWaXNpdHNfRGV0YWlsX0RlbGV0aW5nXCIsIFwiRGVsZXRpbmcgYWN0aXZpdHkuLi5cIikpO1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2hKc29uKGAvVmlzaXRhcy9EZWxldGVBY3Rpdml0eS8ke3JlY0lkfWAsIHsgbWV0aG9kOiBcIkRFTEVURVwiIH0pO1xyXG4gICAgICBpZiAoIXJlcy5zdWNjZXNzKSB0aHJvdyBuZXcgRXJyb3IocmVzLm1lc3NhZ2UgfHwgaW5kVChcIlZpc2l0c19EZXRhaWxfRGVsZXRlRmFpbGVkXCIsIFwiRGVsZXRlIGZhaWxlZC5cIikpO1xyXG4gICAgICBzZXRTdGF0dXMoaW5kVChcIlZpc2l0c19EZXRhaWxfRGVsZXRlZFwiLCBcIkFjdGl2aXR5IGRlbGV0ZWRcIikpO1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBjb25zdCBtc2cgPSBlcnI/Lm1lc3NhZ2UgfHwgaW5kVChcIlZpc2l0c19EZXRhaWxfRGVsZXRlRXJyb3JcIiwgXCJEZWxldGUgZXJyb3IuXCIpO1xyXG4gICAgICBzZXRNb2RhbEVycm9yKG1zZyk7XHJcbiAgICAgIHNldFN0YXR1cyhtc2cpO1xyXG4gICAgICBmbGFzaEFjdGlvbk1hcmsoXCJlcnJvclByb2Nlc3NcIiwgMTUwMCk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0gZmluYWxseSB7XHJcbiAgICAgIHNldEJ1c3koZmFsc2UpO1xyXG4gICAgfVxyXG4gIH0sIFtidXN5LCByZWNJZF0pO1xyXG5cclxuICAvLyBMaXN0ZW4gdG8gdG9wYmFyIGljb24gZXZlbnRzXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IG9uRWRpdCA9ICgpID0+IHtcclxuICAgICAgaWYgKCFjYW5FZGl0SGlzdG9yeSkge1xyXG4gICAgICAgIHNob3dQZXJtaXNzaW9uTW9kYWwoKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGlzRWRpdGluZykge1xyXG4gICAgICAgIGlmIChidXN5IHx8IG1vZGFsLm9wZW4pIHJldHVybjtcclxuICAgICAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xyXG4gICAgICAgIG9wZW5Db25maXJtKHtcclxuICAgICAgICAgIHRpdGxlOiBpbmRUKFwiVmlzaXRzX0RldGFpbF9TYXZlQ2hhbmdlc19UaXRsZVwiLCBcIlNhdmUgY2hhbmdlc1wiKSxcclxuICAgICAgICAgIG1lc3NhZ2U6IGluZFQoXCJWaXNpdHNfRGV0YWlsX1NhdmVDaGFuZ2VzX0JvZHlcIiwgXCJEbyB5b3Ugd2FudCB0byBzYXZlIGNoYW5nZXM/XCIpLFxyXG4gICAgICAgICAgY29uZmlybVRleHQ6IGluZFQoXCJDb21tb25fU2F2ZVwiLCBcIlNhdmVcIiksXHJcbiAgICAgICAgICBvbkNvbmZpcm06IGFzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgb2sgPSBhd2FpdCBoYW5kbGVVcGRhdGUoKTtcclxuICAgICAgICAgICAgaWYgKG9rKSB7XHJcbiAgICAgICAgICAgICAgY2xvc2VDb25maXJtKCk7XG4gICAgICAgICAgICAgIHNldEhpc3RvcnlGaWx0ZXJGb3JEYXRlKHRyYW5zRGF0ZSk7XG4gICAgICAgICAgICAgIGF3YWl0IHdhaXQoMjAwKTtcbiAgICAgICAgICAgICAgZmxhc2hBY3Rpb25NYXJrKFwib2tQcm9jZXNzXCIsIDEyMDApO1xuICAgICAgICAgICAgICBhd2FpdCB3YWl0KDEyMDApO1xuICAgICAgICAgICAgICB3aW5kb3cuX19pbmRCeXBhc3NOYXZpZ2F0aW9uR3VhcmRPbmNlPy4oKTtcbiAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9IaXN0b3JpYWwvSGlzdG9yeVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG9rO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaGFuZGxlRW5hYmxlRWRpdCgpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IG9uRGVsZXRlID0gKCkgPT4ge1xuICAgICAgaWYgKCFjYW5EZWxldGVIaXN0b3J5KSB7XG4gICAgICAgIHNob3dQZXJtaXNzaW9uTW9kYWwoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKGJ1c3kgfHwgbW9kYWwub3BlbikgcmV0dXJuO1xuICAgICAgc2V0TW9kYWxFcnJvcihcIlwiKTtcclxuICAgICAgb3BlbkNvbmZpcm0oe1xyXG4gICAgICAgIHRpdGxlOiBpbmRUKFwiVmlzaXRzX0RldGFpbF9EZWxldGVBY3Rpdml0eV9UaXRsZVwiLCBcIkRlbGV0ZSBhY3Rpdml0eVwiKSxcclxuICAgICAgICBtZXNzYWdlOiBpbmRUKFwiVmlzaXRzX0RldGFpbF9EZWxldGVBY3Rpdml0eV9Cb2R5XCIsIFwiRG8geW91IHdhbnQgdG8gZGVsZXRlIHRoaXMgYWN0aXZpdHk/XCIpLFxyXG4gICAgICAgIGNvbmZpcm1UZXh0OiBpbmRUKFwiQ29tbW9uX0RlbGV0ZVwiLCBcIkRlbGV0ZVwiKSxcclxuICAgICAgICBvbkNvbmZpcm06IGFzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgb2sgPSBhd2FpdCBoYW5kbGVEZWxldGUoKTtcclxuICAgICAgICAgICAgaWYgKG9rKSB7XHJcbiAgICAgICAgICAgIGNsb3NlQ29uZmlybSgpO1xuICAgICAgICAgICAgc2V0SGlzdG9yeUZpbHRlckZvckRhdGUodHJhbnNEYXRlKTtcbiAgICAgICAgICAgIGF3YWl0IHdhaXQoMjAwKTtcbiAgICAgICAgICAgIGZsYXNoQWN0aW9uTWFyayhcIm9rRGVsUHJvY2Vzc1wiLCAxMjAwKTtcbiAgICAgICAgICAgIGF3YWl0IHdhaXQoMTIwMCk7XG4gICAgICAgICAgICB3aW5kb3cuX19pbmRCeXBhc3NOYXZpZ2F0aW9uR3VhcmRPbmNlPy4oKTtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvSGlzdG9yaWFsL0hpc3RvcnlcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBvaztcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgY29uc3Qgb25DYW5jZWxFZGl0ID0gKCkgPT4ge1xuICAgICAgaWYgKGJ1c3kgfHwgbW9kYWwub3BlbikgcmV0dXJuO1xuICAgICAgaGFuZGxlQ2FuY2VsRWRpdCgpO1xuICAgIH07XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJ2aXNpdC1lZGl0XCIsIG9uRWRpdCk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJ2aXNpdC1kZWxldGVcIiwgb25EZWxldGUpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwidmlzaXQtY2FuY2VsLWVkaXRcIiwgb25DYW5jZWxFZGl0KTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ2aXNpdC1lZGl0XCIsIG9uRWRpdCk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInZpc2l0LWRlbGV0ZVwiLCBvbkRlbGV0ZSk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInZpc2l0LWNhbmNlbC1lZGl0XCIsIG9uQ2FuY2VsRWRpdCk7XG4gICAgfTtcbiAgfSwgW2J1c3ksIG1vZGFsLm9wZW4sIGhhbmRsZUNhbmNlbEVkaXQsIGhhbmRsZURlbGV0ZSwgaGFuZGxlRW5hYmxlRWRpdCwgaGFuZGxlVXBkYXRlLCBpc0VkaXRpbmcsIG9wZW5Db25maXJtLCB0cmFuc0RhdGVdKTtcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNFwiPlxyXG4gICAgICA8Q29uZmlybU1vZGFsXHJcbiAgICAgICAgb3Blbj17bW9kYWwub3Blbn1cclxuICAgICAgICB0aXRsZT17bW9kYWwudGl0bGV9XHJcbiAgICAgICAgbWVzc2FnZT17bW9kYWwubWVzc2FnZX1cclxuICAgICAgICBjb25maXJtVGV4dD17bW9kYWxDb25maXJtVGV4dH1cclxuICAgICAgICBjYW5jZWxUZXh0PXttb2RhbENhbmNlbFRleHR9XHJcbiAgICAgICAgbG9hZGluZ1RleHQ9e21vZGFsTG9hZGluZ1RleHR9XHJcbiAgICAgICAgc2hvd0NhbmNlbD17bW9kYWwuc2hvd0NhbmNlbH1cclxuICAgICAgICBzaG93Q29uZmlybT17bW9kYWwuc2hvd0NvbmZpcm19XHJcbiAgICAgICAgYnVzeT17YnVzeX1cclxuICAgICAgICBlcnJvcj17bW9kYWxFcnJvcn1cclxuICAgICAgICBzdGF0dXM9e3N0YXR1c31cclxuICAgICAgICBvbkNvbmZpcm09e2hhbmRsZU1vZGFsQnV0dG9uQ29uZmlybX1cclxuICAgICAgICBvbkNhbmNlbD17Y2xvc2VDb25maXJtfVxyXG4gICAgICAvPlxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgcmVmPXtyZWFkT25seVN1cmZhY2VSZWZ9XHJcbiAgICAgICAgY2xhc3NOYW1lPVwicmVsYXRpdmUgc2hhZG93LXhzIGdsYXNzLXBhbmVsIHAtNCBzcGFjZS15LTQgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgcm91bmRlZC0yeGxcIlxyXG4gICAgICA+XHJcbiAgICAgICAge2lzSHlkcmF0aW5nICYmIChcclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCB6LTEwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGJnLXdoaXRlLzcwIHJvdW5kZWQtMnhsXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC1zbSB0ZXh0LXNsYXRlLTYwMFwiPlxyXG4gICAgICAgICAgICAgIDxTcGlubmVyIHNpemU9XCJoLTUgdy01XCIgLz5cclxuICAgICAgICAgICAgICA8c3Bhbj57aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX08L3NwYW4+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKX1cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMiBnYXAtNCBwdC0xXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ2aXNpdGEtZmllbGQtdGV4dFwiPlxyXG4gICAgICAgICAgICA8U2luZ2xlRGF0ZVBpY2tlclxuICAgICAgICAgICAgICBsYWJlbD17aW5kVChcIlZpc2l0c19EZXRhaWxfRGF0ZV9MYWJlbFwiLCBcIkRhdGVcIil9XG4gICAgICAgICAgICAgIHZhbHVlPXt0cmFuc0RhdGV9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXtzZXRUcmFuc0RhdGV9XG4gICAgICAgICAgICAgIGRpc2FibGVkPXshaXNFZGl0aW5nfVxuICAgICAgICAgICAgICByZWFkT25seT17IWlzRWRpdGluZ31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPFNlbGVjdENvbWJvYm94XG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIlZpc2l0c19EZXRhaWxfVmlzaXRUeXBlX0xhYmVsXCIsIFwiVmlzaXQgdHlwZVwiKX1cbiAgICAgICAgICAgIG9wdGlvbnM9e3Zpc2l0VHlwZXN9XG4gICAgICAgICAgICB2YWx1ZT17dmlzaXRUeXBlfVxuICAgICAgICAgICAgb25DaGFuZ2U9e3NldFZpc2l0VHlwZX1cbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiVmlzaXRzX0RldGFpbF9WaXNpdFR5cGVfUGxhY2Vob2xkZXJcIiwgXCJTZWxlY3QgdHlwZVwiKX1cbiAgICAgICAgICAgIGRpc2FibGVkPXshaXNFZGl0aW5nfVxuICAgICAgICAgICAgcmVhZE9ubHk9eyFpc0VkaXRpbmd9XG4gICAgICAgICAgICB1c2VQb3J0YWw9e2ZhbHNlfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgZ2FwLTNcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yXCI+XHJcbiAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb3JtLWxhYmVsIGZvbnQtc2VtaWJvbGRcIj57aW5kVChcIlZpc2l0c19GaWVsZF9EZXNjcmlwdGlvblwiLCBcIkRlc2NyaXB0aW9uXCIpfTwvbGFiZWw+XHJcbiAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICBpZD1cImRlc2NyaXB0aW9uXCJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAgICAgICAgIFwiZm9ybS1jb250cm9sXCIsXG4gICAgICAgICAgICAgICAgaXNFZGl0aW5nID8gXCJib3JkZXItc2xhdGUtMjAwIHRleHQtc2xhdGUtOTAwXCIgOiBcImJvcmRlci1zbGF0ZS0yMDAgaW5kLXJlYWRvbmx5LWZpZWxkXCJcbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgbWF4TGVuZ3RoPXsyMDB9XG4gICAgICAgICAgICAgIHZhbHVlPXtkZXNjcmlwdGlvbn1cbiAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFpc0VkaXRpbmd9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0RGVzY3JpcHRpb24oZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yXCI+XHJcbiAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb3JtLWxhYmVsIGZvbnQtc2VtaWJvbGRcIj57aW5kVChcIlZpc2l0c19GaWVsZF9Db21tZW50c1wiLCBcIkNvbW1lbnRzXCIpfTwvbGFiZWw+XHJcbiAgICAgICAgICAgIDx0ZXh0YXJlYVxuICAgICAgICAgICAgICBpZD1cImNvbWVudGFyaW9zXCJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICAgICAgICBcImZvcm0tY29udHJvbCBjdXJzb3ItcG9pbnRlclwiLFxuICAgICAgICAgICAgICAgICAgIWlzRWRpdGluZyA/IFwiaW5kLXJlYWRvbmx5LWZpZWxkXCIgOiBcIlwiXG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgdmFsdWU9e2NvbWVudGFyaW9zfVxuICAgICAgICAgICAgICByZWFkT25seVxuICAgICAgICAgICAgICBvblBvaW50ZXJEb3duPXtjb21lbnRhcmlvc1RhcC5vblBvaW50ZXJEb3dufVxyXG4gICAgICAgICAgICAgIG9uUG9pbnRlck1vdmU9e2NvbWVudGFyaW9zVGFwLm9uUG9pbnRlck1vdmV9XHJcbiAgICAgICAgICAgICAgb25Qb2ludGVyVXA9e2NvbWVudGFyaW9zVGFwLm9uUG9pbnRlclVwfVxyXG4gICAgICAgICAgICAgIG9uUG9pbnRlckNhbmNlbD17Y29tZW50YXJpb3NUYXAub25Qb2ludGVyQ2FuY2VsfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMlwiPlxyXG4gICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZm9ybS1sYWJlbCBmb250LXNlbWlib2xkXCI+e2luZFQoXCJWaXNpdHNfRmllbGRfQmFja2dyb3VuZFwiLCBcIkJhY2tncm91bmRcIil9PC9sYWJlbD5cclxuICAgICAgICAgICAgPHRleHRhcmVhXG4gICAgICAgICAgICAgIGlkPVwiYW50ZWNlZGVudGVzXCJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICAgICAgICBcImZvcm0tY29udHJvbCBjdXJzb3ItcG9pbnRlclwiLFxuICAgICAgICAgICAgICAgICAgIWlzRWRpdGluZyA/IFwiaW5kLXJlYWRvbmx5LWZpZWxkXCIgOiBcIlwiXG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgdmFsdWU9e2FudGVjZWRlbnRlc31cbiAgICAgICAgICAgICAgcmVhZE9ubHlcbiAgICAgICAgICAgICAgb25Qb2ludGVyRG93bj17YW50ZWNlZGVudGVzVGFwLm9uUG9pbnRlckRvd259XHJcbiAgICAgICAgICAgICAgb25Qb2ludGVyTW92ZT17YW50ZWNlZGVudGVzVGFwLm9uUG9pbnRlck1vdmV9XHJcbiAgICAgICAgICAgICAgb25Qb2ludGVyVXA9e2FudGVjZWRlbnRlc1RhcC5vblBvaW50ZXJVcH1cclxuICAgICAgICAgICAgICBvblBvaW50ZXJDYW5jZWw9e2FudGVjZWRlbnRlc1RhcC5vblBvaW50ZXJDYW5jZWx9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yXCI+XHJcbiAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb3JtLWxhYmVsIGZvbnQtc2VtaWJvbGRcIj57aW5kVChcIlZpc2l0c19GaWVsZF9Db25jbHVzaW9uc1wiLCBcIkNvbmNsdXNpb25zXCIpfTwvbGFiZWw+XHJcbiAgICAgICAgICAgIDx0ZXh0YXJlYVxuICAgICAgICAgICAgICBpZD1cImNvbmNsdXNpb25lc1wiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAgICAgICAgICAgXCJmb3JtLWNvbnRyb2wgY3Vyc29yLXBvaW50ZXJcIixcbiAgICAgICAgICAgICAgICAgICFpc0VkaXRpbmcgPyBcImluZC1yZWFkb25seS1maWVsZFwiIDogXCJcIlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIHZhbHVlPXtjb25jbHVzaW9uZXN9XG4gICAgICAgICAgICAgIHJlYWRPbmx5XG4gICAgICAgICAgICAgIG9uUG9pbnRlckRvd249e2NvbmNsdXNpb25lc1RhcC5vblBvaW50ZXJEb3dufVxyXG4gICAgICAgICAgICAgIG9uUG9pbnRlck1vdmU9e2NvbmNsdXNpb25lc1RhcC5vblBvaW50ZXJNb3ZlfVxyXG4gICAgICAgICAgICAgIG9uUG9pbnRlclVwPXtjb25jbHVzaW9uZXNUYXAub25Qb2ludGVyVXB9XHJcbiAgICAgICAgICAgICAgb25Qb2ludGVyQ2FuY2VsPXtjb25jbHVzaW9uZXNUYXAub25Qb2ludGVyQ2FuY2VsfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTMgdGV4dC1zbSB0ZXh0LXNsYXRlLTYwMFwiPlxyXG4gICAgICAgICAgPHNwYW4+e3N0YXR1c308L3NwYW4+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbnR5cGUgRXJyb3JCb3VuZGFyeVN0YXRlID0geyBoYXNFcnJvcjogYm9vbGVhbiB9O1xyXG5cclxuY2xhc3MgRXJyb3JCb3VuZGFyeSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxSZWFjdC5Qcm9wc1dpdGhDaGlsZHJlbjx7fT4sIEVycm9yQm91bmRhcnlTdGF0ZT4ge1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzOiBSZWFjdC5Qcm9wc1dpdGhDaGlsZHJlbjx7fT4pIHtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuICAgIHRoaXMuc3RhdGUgPSB7IGhhc0Vycm9yOiBmYWxzZSB9O1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGdldERlcml2ZWRTdGF0ZUZyb21FcnJvcigpIHtcclxuICAgIHJldHVybiB7IGhhc0Vycm9yOiB0cnVlIH07XHJcbiAgfVxyXG5cclxuICBjb21wb25lbnREaWRDYXRjaChlcnJvciwgaW5mbykge1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgaWYgKHRoaXMuc3RhdGUuaGFzRXJyb3IpIHtcclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNCByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItcm9zZS0yMDAgYmctcm9zZS01MCB0ZXh0LXJvc2UtNzAwXCI+XHJcbiAgICAgICAgICB7aW5kVChcIlZpc2l0c19EZXRhaWxfRXJyb3JCb3VuZGFyeVwiLCBcIkFuIGVycm9yIG9jY3VycmVkIHdoaWxlIHJlbmRlcmluZyB0aGUgZGV0YWlsIHBhZ2UuIFJlbG9hZCBhbmQgdHJ5IGFnYWluLlwiKX1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLnByb3BzLmNoaWxkcmVuO1xyXG4gIH1cclxufVxyXG5cclxuLy8gRGV0YWlsIFVJIHdyYXBwZWQgYnkgdGhlIGVycm9yIGJvdW5kYXJ5LlxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBEZXRhaWxGb3JtKCkge1xyXG4gIHJldHVybiAoXHJcbiAgICA8RXJyb3JCb3VuZGFyeT5cclxuICAgICAgPERldGFpbEFwcCAvPlxyXG4gICAgPC9FcnJvckJvdW5kYXJ5PlxyXG4gICk7XHJcbn1cclxuIiwgImV4cG9ydCBjb25zdCBiaW5kUmVhZE9ubHlHdWFyZCA9IChlbDogSFRNTEVsZW1lbnQgfCBudWxsKSA9PiB7XG4gIGlmICghZWwpIHJldHVybiAoKSA9PiB7fTtcbiAgY29uc3QgY2FuY2VsID0gKGV2ZW50OiBFdmVudCkgPT4gZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgY29uc3QgZXZlbnRzID0gW1wiY29udGV4dG1lbnVcIiwgXCJzZWxlY3RzdGFydFwiLCBcImNvcHlcIiwgXCJjdXRcIiwgXCJwYXN0ZVwiXTtcbiAgZXZlbnRzLmZvckVhY2goKGV2dCkgPT4gZWwuYWRkRXZlbnRMaXN0ZW5lcihldnQsIGNhbmNlbCkpO1xuICByZXR1cm4gKCkgPT4ge1xuICAgIGV2ZW50cy5mb3JFYWNoKChldnQpID0+IGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0LCBjYW5jZWwpKTtcbiAgfTtcbn07XG4iLCAiZXhwb3J0IGNvbnN0IGhhc1ZhbHVlID0gKHZhbHVlOiB1bmtub3duKSA9PiBTdHJpbmcodmFsdWUgfHwgXCJcIikudHJpbSgpLmxlbmd0aCA+IDA7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxvQkFBMkI7OztBQ0QzQixtQkFBeUU7OztBQ0FsRSxJQUFNLG9CQUFvQixDQUFDLE9BQTJCO0FBQzNELE1BQUksQ0FBQyxHQUFJLFFBQU8sTUFBTTtBQUFBLEVBQUM7QUFDdkIsUUFBTSxTQUFTLENBQUMsVUFBaUIsTUFBTSxlQUFlO0FBQ3RELFFBQU0sU0FBUyxDQUFDLGVBQWUsZUFBZSxRQUFRLE9BQU8sT0FBTztBQUNwRSxTQUFPLFFBQVEsQ0FBQyxRQUFRLEdBQUcsaUJBQWlCLEtBQUssTUFBTSxDQUFDO0FBQ3hELFNBQU8sTUFBTTtBQUNYLFdBQU8sUUFBUSxDQUFDLFFBQVEsR0FBRyxvQkFBb0IsS0FBSyxNQUFNLENBQUM7QUFBQSxFQUM3RDtBQUNGOzs7QUNSTyxJQUFNLFdBQVcsQ0FBQyxVQUFtQixPQUFPLFNBQVMsRUFBRSxFQUFFLEtBQUssRUFBRSxTQUFTOzs7QUZxdEIxRTtBQWxzQk4sSUFBTSxZQUFZLE1BQU07QUFDdEIsUUFBTSxFQUFFLFlBQVksZUFBZSxJQUFJLFdBQVc7QUFDbEQsUUFBTSxpQkFB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QixTQUNFLDZDQUFDLGdCQUNDLHVEQUFDLGdCQUNDLHVEQUFDLGNBQVcsR0FDZCxHQUNGO0FBRUo7QUFFQSxJQUFNLFFBQVEsTUFBTTtBQUNsQixRQUFNLFNBQVMsU0FBUyxlQUFlLG9CQUFvQjtBQUMzRCxNQUFJLENBQUMsT0FBUTtBQUViLFFBQU0sVUFBVSw2Q0FBQyxjQUFXO0FBRTVCLE1BQUksT0FBTyxXQUFXO0FBQ3BCLFdBQU8sVUFBVSxPQUFPLE9BQU87QUFDL0I7QUFBQSxFQUNGO0FBRUEsUUFBTSxXQUFPLDBCQUFXLE1BQU07QUFDOUIsU0FBTyxZQUFZO0FBQ25CLE9BQUssT0FBTyxPQUFPO0FBQ3JCO0FBRUEsSUFBSSxTQUFTLGVBQWUsY0FBYyxTQUFTLGVBQWUsZUFBZTtBQUMvRSxRQUFNO0FBQ1IsT0FBTztBQUNMLFdBQVMsaUJBQWlCLG9CQUFvQixLQUFLO0FBQ3JEO0FBRUEsSUFBTyxxQkFBUTsiLAogICJuYW1lcyI6IFsiUmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIl0KfQo=
