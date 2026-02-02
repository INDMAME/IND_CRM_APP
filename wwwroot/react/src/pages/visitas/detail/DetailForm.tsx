import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChevronDownSvg, ChevronUpSvg } from "../../../components/commons/chevrons.tsx";
import SingleDatePicker from "../../../components/commons/SingleDatePicker.tsx";
import ConfirmModal from "../../../components/commons/ConfirmModal.tsx";
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

function SelectCombobox({ label, options, value, onChange, placeholder, disabled = false }) {
  const data = React.useMemo(() => {
    return options.map((o) => {
      if (Array.isArray(o)) {
        return { value: o[0] ?? "", text: o[1] ?? "" };
      }
      return { value: o?.value ?? o?.Value ?? "", text: o?.text ?? o?.Text ?? "" };
    });
  }, [options]);

  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(
    data.find((d) => String(d.value) === String(value)) || data[0] || { value: "", text: "" }
  );
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const boxRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    setSelected(data.find((d) => String(d.value) === String(value)) || data[0] || { value: "", text: "" });
  }, [value, data]);

  useEffect(() => {
    const clickHandler = (ev) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(ev.target)) setOpen(false);
    };
    document.addEventListener("mousedown", clickHandler);
    document.addEventListener("touchstart", clickHandler);
    return () => {
      document.removeEventListener("mousedown", clickHandler);
      document.removeEventListener("touchstart", clickHandler);
    };
  }, []);

  const filtered = React.useMemo(() => {
    if (!query.trim()) return data;
    const f = data.filter((o) => o.text.toLowerCase().includes(query.toLowerCase()));
    return f.length ? f : data;
  }, [data, query]);

  useEffect(() => setActiveIndex(0), [filtered.length, query]);

  const selectOption = (opt) => {
    setSelected(opt);
    setQuery("");
    setOpen(false);
    onChange(opt?.value || "");
  };

  const handleKeyDown = (ev) => {
    if (disabled) return;
    if (ev.key === "ArrowDown") {
      ev.preventDefault();
      setOpen(true);
      if (filtered.length) setActiveIndex((idx) => (idx + 1) % filtered.length);
      return;
    }
    if (ev.key === "ArrowUp") {
      ev.preventDefault();
      setOpen(true);
      if (filtered.length) setActiveIndex((idx) => (idx - 1 + filtered.length) % filtered.length);
      return;
    }
    if (ev.key === "Enter") {
      ev.preventDefault();
      if (open && filtered.length) {
        selectOption(filtered[activeIndex] ?? filtered[0]);
      } else {
        setOpen(true);
      }
    }
    if (ev.key === "Escape") setOpen(false);
  };

  return (
    <div
      className={`space-y-2 ${disabled ? "opacity-70 pointer-events-none select-none" : ""}`}
      ref={containerRef}
    >
      <label className="form-label font-semibold">{label}</label>
      <div className="relative">
        <div
          ref={boxRef}
          className="relative w-full cursor-default rounded-xl bg-white text-left focus-within:border-primary focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-white sm:text-sm"
        >
          <input
            className="w-full rounded-xl border border-slate-200 px-3 py-2 pr-10 text-sm sm:text-base leading-5 text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-primary focus:border-primary disabled:bg-slate-100 disabled:text-slate-600 disabled:border-slate-200 disabled:cursor-not-allowed"
            value={query || selected?.text || ""}
            disabled={disabled}
            onChange={(event) => {
              const val = event.target.value;
              setQuery(val);
              setOpen(true);
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => setOpen(true)}
            placeholder={placeholder}
            role="combobox"
            aria-expanded={open}
            aria-controls={`select-options-${label}`}
            aria-activedescendant={
              open && filtered[activeIndex] ? `select-opt-${label}-${filtered[activeIndex].value}` : undefined
            }
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-2 text-slate-500 hover:text-slate-600"
            onClick={() => {
              if (disabled) return;
              setOpen((prev) => !prev);
            }}
            aria-label={open ? indT("Dropdown_HideOptions", "Hide options") : indT("Dropdown_ShowOptions", "Show options")}
            disabled={disabled}
          >
            {open ? <ChevronUpSvg className="h-5 w-5" /> : <ChevronDownSvg className="h-5 w-5" />}
          </button>
        </div>
        {open && !disabled && (
          <div
            className="absolute z-360000 mt-1 w-full rounded-xl bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden max-h-72 overflow-auto"
            role="listbox"
            id={`select-options-${label}`}
            ref={listRef}
          >
            {filtered.length === 0 && <div className="px-4 py-2 text-sm text-slate-500">{indT("Dropdown_NoResults", "No results")}</div>}
            {filtered.map((opt, idx) => {
              const sel = selected?.value === opt.value;
              const isActive = idx === activeIndex;
              return (
                <button
                  type="button"
                  key={opt.value}
                  id={`select-opt-${label}-${opt.value}`}
                  role="option"
                  aria-selected={sel}
                  className={classNames(
                    "relative flex w-full cursor-default select-none items-center py-2 pr-3 text-left text-sm type-option",
                    isActive ? "bg-primary text-white" : "text-slate-900"
                  )}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onClick={() => selectOption(opt)}
                >
                  {sel && (
                    <span
                      className={classNames(
                        "absolute inset-y-0 left-0 flex items-center pl-2",
                        isActive ? "text-white" : "text-primary"
                      )}
                    ></span>
                  )}
                  <span className={classNames("block truncate", sel ? "font-medium" : "font-normal")}>{opt.text}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

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

  useEffect(() => {
    const key = `ind_visit_edit_${actividadId || recId || "default"}`;
    editModeKeyRef.current = key;
    try {
      if (canEditHistory && sessionStorage.getItem(key) === "true") {
        setIsEditing(true);
      }
      if (!canEditHistory) {
        sessionStorage.removeItem(key);
      }
    } catch {
      /* ignore */
    }
  }, [actividadId, recId, canEditHistory]);

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
    if (isEditing) {
      saveDraft({
        transDate,
        visitType,
        asistenteTipo,
        description,
        comentarios,
        antecedentes,
        conclusiones
      });
    }
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
    if (isEditing) return undefined;
    return bindReadOnlyGuard(readOnlySurfaceRef.current);
  }, [isEditing]);

  // Toggle topbar edit/save icons based on editing state.
  useEffect(() => {
    const editIcon = document.getElementById("visitEditIcon");
    const saveIcon = document.getElementById("visitSaveIcon");
    if (!editIcon || !saveIcon) return;
    if (isEditing) {
      editIcon.classList.add("hidden");
      saveIcon.classList.remove("hidden");
    } else {
      editIcon.classList.remove("hidden");
      saveIcon.classList.add("hidden");
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
    window.addEventListener("visit-edit", onEdit);
    window.addEventListener("visit-delete", onDelete);
    return () => {
      window.removeEventListener("visit-edit", onEdit);
      window.removeEventListener("visit-delete", onDelete);
    };
  }, [busy, modal.open, handleDelete, handleEnableEdit, handleUpdate, isEditing, openConfirm, transDate]);

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
        <div className="text-base font-semibold text-slate-900 border-b border-slate-200 pb-3">
          {indT("Visits_Detail_VisitData_Title", "Visit details")}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="visita-field-text">
            <SingleDatePicker
              label={indT("Visits_Detail_Date_Label", "Date")}
              value={transDate}
              onChange={setTransDate}
              disabled={!isEditing}
            />
          </div>
          <SelectCombobox
            label={indT("Visits_Detail_VisitType_Label", "Visit type")}
            options={visitTypes}
            value={visitType}
            onChange={setVisitType}
            placeholder={indT("Visits_Detail_VisitType_Placeholder", "Select type")}
            disabled={!isEditing}
          />
        </div>

        <div className="grid grid-cols-1 gap-3">
          <div className="space-y-2">
            <label className="form-label font-semibold">{indT("Visits_Field_Description", "Description")}</label>
            <input
              id="description"
              className={classNames(
                "form-control",
                isEditing ? "border-slate-200 text-slate-900" : "border-slate-200 bg-slate-100 text-slate-600"
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
                  !isEditing ? "bg-slate-100 text-slate-600" : ""
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
                  !isEditing ? "bg-slate-100 text-slate-600" : ""
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
                  !isEditing ? "bg-slate-100 text-slate-600" : ""
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
