import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import SingleDatePicker from "../../../components/commons/SingleDatePicker.tsx";
import ConfirmModal from "../../../components/commons/ConfirmModal.tsx";
import SelectCombobox from "../../../components/commons/SelectCombobox.tsx";
import { fetchJson } from "../../../services/apiService.ts";
import { useVisitas } from "../../../hooks/useVisitas.ts";
import Spinner from "../../../components/commons/Spinner.tsx";
import { classNames } from "../../../utils/classNames.ts";
import { wait } from "../../../utils/wait.ts";
import { indFormat, indT } from "../../../utils/indI18n.ts";
import { canAccess, showPermissionModal } from "../../../utils/permissions.ts";
import { bindReadOnlyGuard } from "../../../utils/domGuards.ts";
import { hasValue } from "../../../utils/strings.ts";
import { readAndClearTextEditorValue, TEXT_EDITOR_PREFIX } from "../../../utils/textEditor.ts";
import { setHistoryFilterForDate, flashActionMark } from "../../../utils/visitasHistory.ts";
import { setPreviewAnchor, showPreviewTooltip, isOverflowing } from "../../../utils/previewTooltip.ts";
import { useTapGuard } from "../../../hooks/useTapGuard.ts";
import { useConfirmDialog } from "../../../hooks/useConfirmDialog.ts";

const DetailApp = () => {
  const { visitTypes, asistenteTipos } = useVisitas();
  const canEditHistory = canAccess("VISITAS_HISTORIAL", "Edit");
  const canDeleteHistory = canAccess("VISITAS_HISTORIAL", "FullAccess");
  type ActivityDetailPayload = {
    recId?: string | number;
    RecId?: string | number;
    refRecIdActividad?: string | number;
    RefRecIdActividad?: string | number;
    actividadRecId?: string | number;
    ActividadRecId?: string | number;
    readOnly?: boolean;
    allowEdit?: boolean;
    editModeKey?: string;
    [key: string]: unknown;
  };

  const detail = (window.__ACTIVITY_DETAIL__ as ActivityDetailPayload) || {};

  const activityRecId = String(
    detail.recId ||
      detail.RecId ||
      detail.refRecIdActividad ||
      detail.RefRecIdActividad ||
      detail.actividadRecId ||
      detail.ActividadRecId ||
      ""
  ).trim();

  const textEditorBaseId = activityRecId ? `Visita.${activityRecId}` : "Visita";
  const fieldIdComentarios = `${textEditorBaseId}.Comentarios`;
  const fieldIdAntecedentes = `${textEditorBaseId}.Antecedentes`;
  const fieldIdConclusiones = `${textEditorBaseId}.Conclusiones`;

  const normalizeDateToInput = useCallback((value) => {
    if (!value) return "";
    const raw = String(value).trim();
    if (!raw) return "";
    // Already yyyy-MM-dd
    if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;
    // dd.MM.yyyy or dd/MM/yyyy
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

  const matchOptionValue = useCallback((options, raw) => {
    if (raw == null) return "";
    const rawStr = String(raw).trim();
    if (!rawStr) return "";

    const normalizeText = (s) =>
      String(s || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();

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

  const [transDate, setTransDate] = useState(initialTransDate);
  const [visitType, setVisitType] = useState(initialVisitType);
  const [asistenteTipo, setAsistenteTipo] = useState(initialAsistente);
  const [description, setDescription] = useState(String(detail.description ?? detail.Description ?? ""));
  const [comentarios, setComentarios] = useState(String(detail.comentarios ?? detail.Comentarios ?? ""));
  const [antecedentes, setAntecedentes] = useState(String(detail.antecedentes ?? detail.Antecedentes ?? ""));
  const [conclusiones, setConclusiones] = useState(String(detail.conclusiones ?? detail.Conclusiones ?? ""));
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isHydrating, setIsHydrating] = useState(false);
  const [modalError, setModalError] = useState("");
  const readOnlySurfaceRef = useRef(null);
  const editModeKeyRef = useRef("");
  const draftKeyRef = useRef("");
  const draftPersistTimerRef = useRef<number | null>(null);
  const editSnapshotRef = useRef(null);

  const recId = String(detail.recId ?? detail.RecId ?? "");
  const accountNum = String(detail.accountNum ?? detail.AccountNum ?? "");
  const actividadId = String(detail.actividadId ?? detail.ActividadId ?? "");

  // Persist edit mode across navigation to the text editor.
  const syncEditModeFlag = useCallback((enabled) => {
    const key = editModeKeyRef.current;
    if (!key) return;
    try {
      if (enabled) sessionStorage.setItem(key, "true");
      else sessionStorage.removeItem(key);
    } catch {
      /* ignore */
    }
  }, []);

  const syncEditModeOnEntry = useCallback(() => {
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
      /* ignore */
    }
  }, [actividadId, recId, canEditHistory]);

  useEffect(() => {
    syncEditModeOnEntry();
  }, [syncEditModeOnEntry]);

  useEffect(() => {
    const onPageShow = (event: PageTransitionEvent) => {
      const navEntry = typeof performance !== "undefined" && performance.getEntriesByType
        ? (performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined)
        : undefined;
      const isBackForward = navEntry?.type === "back_forward";
      if (event?.persisted || isBackForward) {
        syncEditModeOnEntry();
      }
    };
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, [syncEditModeOnEntry]);

  useEffect(() => {
    const key = `ind_visit_draft_${actividadId || recId || "default"}`;
    draftKeyRef.current = key;
  }, [actividadId, recId]);

  const saveDraft = useCallback((draft) => {
    const key = draftKeyRef.current;
    if (!key) return;
    try {
      sessionStorage.setItem(key, JSON.stringify(draft));
    } catch {
      /* ignore */
    }
  }, []);

  const clearDraft = useCallback(() => {
    const key = draftKeyRef.current;
    if (!key) return;
    try {
      sessionStorage.removeItem(key);
    } catch {
      /* ignore */
    }
  }, []);

  const applyDraftValues = useCallback(() => {
    const key = draftKeyRef.current;
    if (!key) return;
    try {
      const raw = sessionStorage.getItem(key);
      if (!raw) return;
      const draft = JSON.parse(raw);
      if (!draft || typeof draft !== "object") return;
      if (draft.transDate) setTransDate(String(draft.transDate));
      if (draft.visitType !== undefined) setVisitType(String(draft.visitType));
      if (draft.asistenteTipo !== undefined) setAsistenteTipo(String(draft.asistenteTipo));
      if (draft.description !== undefined) setDescription(String(draft.description));
      if (draft.comentarios !== undefined) setComentarios(String(draft.comentarios));
      if (draft.antecedentes !== undefined) setAntecedentes(String(draft.antecedentes));
      if (draft.conclusiones !== undefined) setConclusiones(String(draft.conclusiones));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
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

  const hasServerDetail =
    hasValue(recId) &&
    hasValue(accountNum) &&
    hasValue(detail.transDate || detail.TransDate || "");

  const shouldHydrate = !!actividadId && !hasServerDetail;

  const openTextEditor = useCallback(
    (
      fieldId: string,
      fieldLabel: string,
      fieldValue: string,
      options: { allowEdit?: boolean; readOnly?: boolean; editModeKey?: string } = {}
    ) => {
    const safeId = String(fieldId || "").trim();
    const safeLabel = String(fieldLabel || "").trim();
    const readOnly = options?.readOnly === true;
    const allowEdit = options?.allowEdit !== false;
    const editModeKey = String(options?.editModeKey || "").trim();
    if (safeId) {
      const key = `${TEXT_EDITOR_PREFIX}${safeId}`;
      try {
        // Prime the editor with the current value without pushing large text into the URL.
        if (sessionStorage.getItem(key) === null) {
          sessionStorage.setItem(key, String(fieldValue || ""));
        }
      } catch {
        /* ignore */
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
      /* ignore */
    }
    const url =
      `/TextEditorReact/EditField?fieldId=${encodeURIComponent(safeId || fieldId || "")}` +
      `&fieldLabel=${encodeURIComponent(safeLabel || fieldLabel || "")}` +
      `&returnUrl=${encodeURIComponent(returnUrl)}` +
      `&readOnly=${readOnly ? "1" : "0"}` +
      `&allowEdit=${allowEdit ? "1" : "0"}` +
      (editModeKey ? `&editModeKey=${encodeURIComponent(editModeKey)}` : "");

    window.__indBypassNavigationGuardOnce?.();
    window.location.href = url;
    },
    []
  );

  const handleComentariosTap = useCallback((event) => {
    event.preventDefault();
    openTextEditor(fieldIdComentarios, indT("Visits_Field_Comments", "Comments"), comentarios, {
      readOnly: !isEditing,
      allowEdit: canEditHistory,
      editModeKey: editModeKeyRef.current
    });
  }, [comentarios, isEditing, canEditHistory, openTextEditor]);

  const handleComentariosHold = useCallback((target, clientY) => {
    if (!target || !isOverflowing(target)) return false;
    setPreviewAnchor(target);
    return showPreviewTooltip(String(comentarios || ""), clientY);
  }, [comentarios]);

  const handleAntecedentesTap = useCallback((event) => {
    event.preventDefault();
    openTextEditor(fieldIdAntecedentes, indT("Visits_Field_Background", "Background"), antecedentes, {
      readOnly: !isEditing,
      allowEdit: canEditHistory,
      editModeKey: editModeKeyRef.current
    });
  }, [antecedentes, isEditing, canEditHistory, openTextEditor]);

  const handleAntecedentesHold = useCallback((target, clientY) => {
    if (!target || !isOverflowing(target)) return false;
    setPreviewAnchor(target);
    return showPreviewTooltip(String(antecedentes || ""), clientY);
  }, [antecedentes]);

  const handleConclusionesTap = useCallback((event) => {
    event.preventDefault();
    openTextEditor(fieldIdConclusiones, indT("Visits_Field_Conclusions", "Conclusions"), conclusiones, {
      readOnly: !isEditing,
      allowEdit: canEditHistory,
      editModeKey: editModeKeyRef.current
    });
  }, [conclusiones, isEditing, canEditHistory, openTextEditor]);

  const handleConclusionesHold = useCallback((target, clientY) => {
    if (!target || !isOverflowing(target)) return false;
    setPreviewAnchor(target);
    return showPreviewTooltip(String(conclusiones || ""), clientY);
  }, [conclusiones]);

  const comentariosTap = useTapGuard(handleComentariosTap, handleComentariosHold);
  const antecedentesTap = useTapGuard(handleAntecedentesTap, handleAntecedentesHold);
  const conclusionesTap = useTapGuard(handleConclusionesTap, handleConclusionesHold);

  const applyTextEditorValues = useCallback(() => {
    const valComentarios = readAndClearTextEditorValue(fieldIdComentarios);
    if (valComentarios !== null) setComentarios(valComentarios);

    const valAntecedentes = readAndClearTextEditorValue(fieldIdAntecedentes);
    if (valAntecedentes !== null) setAntecedentes(valAntecedentes);

    const valConclusiones = readAndClearTextEditorValue(fieldIdConclusiones);
    if (valConclusiones !== null) setConclusiones(valConclusiones);
  }, [fieldIdComentarios, fieldIdAntecedentes, fieldIdConclusiones]);

  useEffect(() => {
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

  const handleModalConfirm = useCallback(async () => {
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
  const modalConfirmText = busy
    ? modalLoadingText
    : (!busy && modalError ? indT("Common_OK", "OK") : (modal.confirmText || indT("Confirm_Yes", "OK")));

  const handleModalButtonConfirm = useCallback(() => {
    if (!busy && modalError) {
      closeConfirm();
      return;
    }
    handleModalConfirm();
  }, [busy, modalError, closeConfirm, handleModalConfirm]);

  const hasActiveProcess = useMemo(() => busy || isEditing, [busy, isEditing]);

  useEffect(() => {
    window.__indSetNavigationGuard?.(hasActiveProcess);
    return () => {
      window.__indClearNavigationGuard?.();
    };
  }, [hasActiveProcess]);

  // hydrate data from server if any field is missing
  const hydrateFromApi = useCallback(async () => {
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
      const firstAsistente =
        Array.isArray(asistentesList) && asistentesList.length ? asistentesList[0] : null;
      const rawAsistenteTipo = String(
        data.asistenteTipo ??
          data.AsistenteTipo ??
          firstAsistente?.asistenteTipo ??
          firstAsistente?.AsistenteTipo ??
          ""
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
      // Apply any pending draft values first, then override with text editor values.
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

  useEffect(() => {
    if (shouldHydrate) {
      hydrateFromApi();
    } else {
      applyDraftValues();
      applyTextEditorValues();
    }
  }, [detail, hydrateFromApi, shouldHydrate, applyTextEditorValues, applyDraftValues]);

  useEffect(() => {
    const el = readOnlySurfaceRef.current;
    if (!el) return;
    if (!isEditing) {
      el.classList.add("ind-readonly-surface");
    } else {
      el.classList.remove("ind-readonly-surface");
    }
  }, [isEditing]);

  useEffect(() => {
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

  useEffect(() => {
    if (isEditing) return undefined;
    return bindReadOnlyGuard(readOnlySurfaceRef.current);
  }, [isEditing]);

  // Toggle topbar edit/save icons based on editing state.
  useEffect(() => {
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

  const handleEnableEdit = useCallback(() => {
    if (!canEditHistory) {
      showPermissionModal();
      return;
    }
    setIsEditing(true);
    syncEditModeFlag(true);
    setStatus(indT("Visits_Detail_EditingEnabled", "Editing enabled"));
  }, [syncEditModeFlag]);

  const handleCancelEdit = useCallback(() => {
    if (!isEditing) return;
    setIsEditing(false);
    syncEditModeFlag(false);
    clearDraft();
    setStatus(indT("Common_Cancel", "Cancel"));
    window.__indBypassNavigationGuardOnce?.();
    window.location.reload();
  }, [isEditing, syncEditModeFlag, clearDraft]);

  const handleUpdate = useCallback(async () => {
    if (busy || !isEditing) return false;
    if (!canEditHistory) {
      showPermissionModal();
      return false;
    }
    setModalError("");
    setBusy(true);
    setStatus(indT("Visits_Detail_Updating", "Updating activity..."));
    try {
      const normalizedVisitType =
        matchOptionValue(visitTypes, visitType) ||
        matchOptionValue(visitTypes, rawInitialVisitType) ||
        defaultVisitType;
      const normalizedAsistenteTipo =
        matchOptionValue(asistenteTipos, asistenteTipo) ||
        matchOptionValue(asistenteTipos, rawInitialAsistente) ||
        rawInitialAsistente;
      const payload = {
        accountNum: accountNum,
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

  const handleDelete = useCallback(async () => {
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

  // Listen to topbar icon events
  useEffect(() => {
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

  return (
    <div className="space-y-4">
      <ConfirmModal
        open={modal.open}
        title={modal.title}
        message={modal.message}
        confirmText={modalConfirmText}
        cancelText={modalCancelText}
        loadingText={modalLoadingText}
        showCancel={modal.showCancel}
        showConfirm={modal.showConfirm}
        busy={busy}
        error={modalError}
        status={status}
        onConfirm={handleModalButtonConfirm}
        onCancel={closeConfirm}
      />
      <div
        ref={readOnlySurfaceRef}
        className="relative shadow-xs glass-panel p-4 space-y-4 border border-slate-200 rounded-2xl"
      >
        {isHydrating && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70 rounded-2xl">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Spinner size="h-5 w-5" />
              <span>{indT("Common_Loading", "Loading")}</span>
            </div>
          </div>
        )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <div className="visita-field-text">
            <SingleDatePicker
              label={indT("Visits_Detail_Date_Label", "Date")}
              value={transDate}
              onChange={setTransDate}
              disabled={!isEditing}
              readOnly={!isEditing}
            />
          </div>
          <SelectCombobox
            label={indT("Visits_Detail_VisitType_Label", "Visit type")}
            options={visitTypes}
            value={visitType}
            onChange={setVisitType}
            placeholder={indT("Visits_Detail_VisitType_Placeholder", "Select type")}
            disabled={!isEditing}
            readOnly={!isEditing}
            usePortal={false}
          />
        </div>

        <div className="grid grid-cols-1 gap-3">
          <div className="space-y-2">
            <label className="form-label font-semibold">{indT("Visits_Field_Description", "Description")}</label>
            <input
              id="description"
              className={classNames(
                "form-control",
                isEditing ? "border-slate-200 text-slate-900" : "border-slate-200 ind-readonly-field"
              )}
              maxLength={200}
              value={description}
              disabled={!isEditing}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="form-label font-semibold">{indT("Visits_Field_Comments", "Comments")}</label>
            <textarea
              id="comentarios"
                className={classNames(
                  "form-control cursor-pointer",
                  !isEditing ? "ind-readonly-field" : ""
                )}
              value={comentarios}
              readOnly
              onPointerDown={comentariosTap.onPointerDown}
              onPointerMove={comentariosTap.onPointerMove}
              onPointerUp={comentariosTap.onPointerUp}
              onPointerCancel={comentariosTap.onPointerCancel}
            />
          </div>
          <div className="space-y-2">
            <label className="form-label font-semibold">{indT("Visits_Field_Background", "Background")}</label>
            <textarea
              id="antecedentes"
                className={classNames(
                  "form-control cursor-pointer",
                  !isEditing ? "ind-readonly-field" : ""
                )}
              value={antecedentes}
              readOnly
              onPointerDown={antecedentesTap.onPointerDown}
              onPointerMove={antecedentesTap.onPointerMove}
              onPointerUp={antecedentesTap.onPointerUp}
              onPointerCancel={antecedentesTap.onPointerCancel}
            />
          </div>
          <div className="space-y-2">
            <label className="form-label font-semibold">{indT("Visits_Field_Conclusions", "Conclusions")}</label>
            <textarea
              id="conclusiones"
                className={classNames(
                  "form-control cursor-pointer",
                  !isEditing ? "ind-readonly-field" : ""
                )}
              value={conclusiones}
              readOnly
              onPointerDown={conclusionesTap.onPointerDown}
              onPointerMove={conclusionesTap.onPointerMove}
              onPointerUp={conclusionesTap.onPointerUp}
              onPointerCancel={conclusionesTap.onPointerCancel}
            />
          </div>
        </div>

        <div className="flex items-center gap-3 text-sm text-slate-600">
          <span>{status}</span>
        </div>
      </div>
    </div>
  );
};

type ErrorBoundaryState = { hasError: boolean };

class ErrorBoundary extends React.Component<React.PropsWithChildren<{}>, ErrorBoundaryState> {
  constructor(props: React.PropsWithChildren<{}>) {
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
      return (
        <div className="p-4 rounded-xl border border-rose-200 bg-rose-50 text-rose-700">
          {indT("Visits_Detail_ErrorBoundary", "An error occurred while rendering the detail page. Reload and try again.")}
        </div>
      );
    }
    return this.props.children;
  }
}

// Detail UI wrapped by the error boundary.
export default function DetailForm() {
  return (
    <ErrorBoundary>
      <DetailApp />
    </ErrorBoundary>
  );
}
