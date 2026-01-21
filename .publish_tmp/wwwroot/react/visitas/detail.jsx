import React, { useState, useEffect, useRef, useCallback } from "react";
import { createRoot } from "react-dom/client";
import { createPortal } from "react-dom";
import { ChevronDownSvg, ChevronUpSvg } from "./chevrons.jsx";
import SingleDatePicker from "./SingleDatePicker.jsx";

const classNames = (...classes) => classes.filter(Boolean).join(" ");
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const HISTORY_FILTER_KEY = "visitas_history_filter_v1";
const HISTORY_RETURN_FLAG_KEY = "visitas_history_return_v1";
const TEXT_EDITOR_PREFIX = "ind_texteditor_";
const TAP_MOVE_PX = 14;
const PREVIEW_HOLD_MS = 160;
const PREVIEW_MAX_HEIGHT_RATIO = 0.8;
const PREVIEW_BASE_FONT = 13;
const PREVIEW_MIN_FONT = 11;

const getCsrfToken = () => {
  const meta = document.querySelector('meta[name="csrf-token"]');
  return meta ? meta.getAttribute("content") : "";
};

const IND_I18N = globalThis.__IND_I18N__ || {};
const indT = (key, fallback) => (IND_I18N && typeof IND_I18N[key] === "string" && IND_I18N[key]) || fallback || key;
const PERM_I18N = globalThis.__IND_PERMISSION_I18N__ || {};
const MODULE_ACCESS = globalThis.__IND_MODULE_ACCESS__ || {};
const ACCESS_RIGHTS = { View: 1, Edit: 2, Add: 3, FullAccess: 4 };
const getModuleAccess = (code) => Number(MODULE_ACCESS && MODULE_ACCESS[code] != null ? MODULE_ACCESS[code] : 0);
const historyAccess = getModuleAccess("VISITAS_HISTORIAL");
const canEditHistory = historyAccess >= ACCESS_RIGHTS.Edit;
const canDeleteHistory = historyAccess >= ACCESS_RIGHTS.FullAccess;
const showPermissionModal = (opts) => {
  if (typeof window !== "undefined" && window.IND && typeof window.IND.showPermissionModal === "function") {
    window.IND.showPermissionModal(opts || {});
    return;
  }
  const fallback = PERM_I18N.message || indT("Auth_PermissionDenied_Body", "No tienes permisos para realizar esta accion.");
  alert(fallback);
};
const indFormat = (key, fallback, ...args) => {
  const template = indT(key, fallback);
  return String(template).replace(/\{(\d+)\}/g, (_, idx) => String(args[Number(idx)] ?? ""));
};

const hasValue = (value) => String(value || "").trim().length > 0;

const readAndClearTextEditorValue = (fieldId) => {
  const id = String(fieldId || "").trim();
  if (!id) return null;
  const key = `${TEXT_EDITOR_PREFIX}${id}`;
  try {
    const value = sessionStorage.getItem(key);
    if (value === null) return null;
    sessionStorage.removeItem(key);
    return value;
  } catch {
    return null;
  }
};

function ensurePreviewTooltip() {
  let tooltipEl = document.getElementById("indPreviewTooltip");
  if (tooltipEl) return tooltipEl;
  tooltipEl = document.createElement("div");
  tooltipEl.id = "indPreviewTooltip";
  tooltipEl.className = "ind-preview-tooltip";
  document.body.appendChild(tooltipEl);
  return tooltipEl;
}

let previewAnchor = null;
let previewCloseBound = false;

function ensurePreviewAutoClose() {
  if (previewCloseBound) return;
  previewCloseBound = true;
  document.addEventListener("pointerdown", (event) => {
    const tooltipEl = document.getElementById("indPreviewTooltip");
    if (!tooltipEl || !tooltipEl.classList.contains("visible")) return;
    if (previewAnchor && previewAnchor.contains(event.target)) return;
    hidePreviewTooltip();
  }, true);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") hidePreviewTooltip();
  });
}

function showPreviewTooltip(text, clientY) {
  if (!text) return false;
  const tooltipEl = ensurePreviewTooltip();
  tooltipEl.textContent = text;
  tooltipEl.classList.add("visible");
  previewAnchor = null;
  ensurePreviewAutoClose();

  const centerX = Math.round(window.innerWidth / 2);
  tooltipEl.style.left = `${centerX}px`;

  const margin = 12;
  tooltipEl.style.maxHeight = `${Math.round(window.innerHeight * PREVIEW_MAX_HEIGHT_RATIO)}px`;
  tooltipEl.style.overflowY = "auto";

  let fontSize = PREVIEW_BASE_FONT;
  tooltipEl.style.fontSize = `${fontSize}px`;
  let rect = tooltipEl.getBoundingClientRect();
  const maxHeight = window.innerHeight * PREVIEW_MAX_HEIGHT_RATIO;
  while (rect.height > maxHeight && fontSize > PREVIEW_MIN_FONT) {
    fontSize -= 1;
    tooltipEl.style.fontSize = `${fontSize}px`;
    rect = tooltipEl.getBoundingClientRect();
  }

  const centerY = Math.round((window.innerHeight - rect.height) / 2);
  let top = Number.isFinite(centerY) ? centerY : margin;
  const minTop = margin;
  const maxTop = Math.max(margin, window.innerHeight - rect.height - margin);
  if (top < minTop) top = minTop;
  if (top > maxTop) top = maxTop;
  tooltipEl.style.top = `${Math.round(top)}px`;
  return true;
}

function hidePreviewTooltip() {
  const tooltipEl = document.getElementById("indPreviewTooltip");
  if (!tooltipEl) return;
  tooltipEl.classList.remove("visible");
  previewAnchor = null;
}

function isOverflowing(el) {
  if (!el) return false;
  return el.scrollWidth > el.clientWidth + 1 || el.scrollHeight > el.clientHeight + 1;
}

function useTapGuard(onTap, onHoldStart) {
  const stateRef = React.useRef({
    active: false,
    pointerId: null,
    startX: 0,
    startY: 0,
    moved: false,
    held: false,
    target: null,
  });
  const holdTimerRef = React.useRef(null);

  const reset = React.useCallback(() => {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
    stateRef.current.active = false;
    stateRef.current.pointerId = null;
    stateRef.current.moved = false;
    stateRef.current.held = false;
    stateRef.current.target = null;
  }, []);

  const onPointerDown = React.useCallback((event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    stateRef.current.active = true;
    stateRef.current.pointerId = event.pointerId;
    stateRef.current.startX = event.clientX;
    stateRef.current.startY = event.clientY;
    stateRef.current.moved = false;
    stateRef.current.held = false;
    stateRef.current.target = event.currentTarget;

    if (onHoldStart) {
      if (holdTimerRef.current) {
        clearTimeout(holdTimerRef.current);
      }
      holdTimerRef.current = setTimeout(() => {
        const state = stateRef.current;
        if (!state.active || state.moved) return;
        const didShow = onHoldStart(state.target, state.startY);
        state.held = didShow === true;
      }, PREVIEW_HOLD_MS);
    }
  }, [onHoldStart]);

  const onPointerMove = React.useCallback((event) => {
    const state = stateRef.current;
    if (!state.active || state.pointerId !== event.pointerId) return;
    const dx = Math.abs(event.clientX - state.startX);
    const dy = Math.abs(event.clientY - state.startY);
    if (dx > TAP_MOVE_PX || dy > TAP_MOVE_PX) {
      state.moved = true;
      if (holdTimerRef.current) {
        clearTimeout(holdTimerRef.current);
        holdTimerRef.current = null;
      }
      if (state.held) hidePreviewTooltip();
    }
  }, []);

  const onPointerUp = React.useCallback((event) => {
    const state = stateRef.current;
    if (!state.active || state.pointerId !== event.pointerId) return;
    const shouldTap = !state.moved && !state.held;
    reset();
    if (shouldTap) onTap(event);
  }, [onTap, reset]);

  return {
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel: reset,
  };
}

// Block text selection and copy actions on read-only surfaces.
const bindReadOnlyGuard = (el) => {
  if (!el) return () => {};
  const cancel = (event) => event.preventDefault();
  const events = ["contextmenu", "selectstart", "copy", "cut", "paste"];
  events.forEach((evt) => el.addEventListener(evt, cancel));
  return () => {
    events.forEach((evt) => el.removeEventListener(evt, cancel));
  };
};

const isIsoDate = (value) => /^\d{4}-\d{2}-\d{2}$/.test(String(value || "").trim());

const hasHistoryFilterRange = () => {
  try {
    const raw = sessionStorage.getItem(HISTORY_FILTER_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    return !!(parsed && parsed.fromDate && parsed.toDate);
  } catch {
    return false;
  }
};

const markHistoryReturn = () => {
  try {
    sessionStorage.setItem(HISTORY_RETURN_FLAG_KEY, "1");
  } catch {
    /* ignore */
  }
};

const setHistoryFilterForDate = (isoDate) => {
  const value = String(isoDate || "").trim();
  if (!isIsoDate(value)) {
    if (hasHistoryFilterRange()) markHistoryReturn();
    return;
  }
  try {
    if (!hasHistoryFilterRange()) {
      sessionStorage.setItem(HISTORY_FILTER_KEY, JSON.stringify({ fromDate: value, toDate: value }));
    }
  } catch {
    /* ignore */
  }
  markHistoryReturn();
};

const flashActionMark = (type, durationMs) => {
  try {
    if (window.IND && typeof window.IND.flashActionMark === "function") {
      window.IND.flashActionMark({ type, durationMs });
    }
  } catch {
    /* ignore */
  }
};

async function fetchJson(url, options) {
  const csrfToken = getCsrfToken();
  const headers = {
    Accept: "application/json",
    ...(options?.headers || {}),
    ...(csrfToken ? { RequestVerificationToken: csrfToken } : {})
  };
  const merged = {
    credentials: "same-origin",
    ...options,
    headers
  };
  const res = await fetch(url, merged);
  const text = await res.text();
  if (!res.ok) {
    if (res.status === 403) {
      showPermissionModal();
      throw new Error(indT("Auth_PermissionDenied_Body", "No tienes permisos para realizar esta accion."));
    }
    try {
      const json = JSON.parse(text);
      const msg = json?.message;
      if (typeof msg === "string" && msg.trim()) {
        throw new Error(msg);
      }
    } catch {
      // ignore parse errors
    }
    throw new Error(indT("Api_RequestFailed", "Request failed. Please try again."));
  }
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(indT("Api_InvalidJson", "Invalid server response."));
  }
}

const Spinner = ({ size = "h-4 w-4", label }) => (
  <svg
    className={`ind-spinner ${size}`}
    viewBox="0 0 20 20"
    role="status"
    aria-label={label || indT("Common_Loading", "Loading")}
  >
    <circle className="ind-spinner__circle" cx="10" cy="10" r="8" strokeWidth="2" />
  </svg>
);

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
      <label className="text-sm font-semibold text-slate-700">{label}</label>
      <div className="relative">
        <div
          ref={boxRef}
          className="relative w-full cursor-default rounded-xl bg-white text-left focus-within:border-primary focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-white sm:text-sm"
        >
          <input
            className="w-full rounded-xl border border-slate-200 px-3 py-2 pr-10 text-sm leading-5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary disabled:bg-slate-100 disabled:text-slate-600 disabled:border-slate-200 disabled:cursor-not-allowed"
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
            className="absolute z-[360000] mt-1 w-full rounded-xl bg-white shadow-lg ring-1 ring-black/5 focus:outline-none max-h-72 overflow-auto"
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
  const visitTypes = window.__VISIT_TYPES__ || [];
  const asistenteTipos = window.__ASISTENTE_TIPOS__ || [];
  const detail = window.__ACTIVITY_DETAIL__ || {};

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

  const initialTransDate = normalizeDateToInput(detail.transDate || detail.TransDate || "");
  const defaultVisitType = visitTypes[0]?.value ?? visitTypes[0]?.Value ?? "";
  const rawInitialVisitType =
    detail.tipoVisita ||
    detail.TipoVisita ||
    detail.visitType ||
    detail.VisitType ||
    "";
  const initialVisitType = matchOptionValue(visitTypes, rawInitialVisitType) || defaultVisitType;
  const rawInitialAsistente =
    detail.asistenteTipo ||
    detail.AsistenteTipo ||
    ((asistenteTipos[0]?.value ?? asistenteTipos[0]?.Value) ?? "");
  const initialAsistente = matchOptionValue(asistenteTipos, rawInitialAsistente) || rawInitialAsistente;

  const [transDate, setTransDate] = useState(initialTransDate);
  const [visitType, setVisitType] = useState(initialVisitType);
  const [asistenteTipo, setAsistenteTipo] = useState(initialAsistente);
  const [description, setDescription] = useState(detail.description || detail.Description || "");
  const [comentarios, setComentarios] = useState(detail.comentarios || detail.Comentarios || "");
  const [antecedentes, setAntecedentes] = useState(detail.antecedentes || detail.Antecedentes || "");
  const [conclusiones, setConclusiones] = useState(detail.conclusiones || detail.Conclusiones || "");
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isHydrating, setIsHydrating] = useState(false);
  const modalConfirmInFlightRef = useRef(false);
  const [modalError, setModalError] = useState("");
  const readOnlySurfaceRef = useRef(null);
  const editModeKeyRef = useRef("");

  const recId = detail.recId || detail.RecId || "";
  const accountNum = detail.accountNum || detail.AccountNum || "";
  const userId = detail.userId || detail.UserId || "";
  const actividadId = detail.actividadId || detail.ActividadId || "";

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

  const hasServerDetail =
    hasValue(recId) &&
    hasValue(accountNum) &&
    hasValue(detail.transDate || detail.TransDate || "");

  const shouldHydrate = !!actividadId && !hasServerDetail;

  const openTextEditor = useCallback((fieldId, fieldLabel, fieldValue, options = {}) => {
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
  }, []);

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
    previewAnchor = target;
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
    previewAnchor = target;
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
    previewAnchor = target;
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

  const [modal, setModal] = useState({
    open: false,
    title: "",
    message: "",
    confirmText: indT("Confirm_Yes", "OK"),
    cancelText: indT("Confirm_No", "Cancel"),
    showCancel: true,
    showConfirm: true,
    onConfirm: null
  });

  const closeModal = useCallback(() => {
    setModal((m) => ({ ...m, open: false }));
  }, []);

  const openConfirmModal = useCallback((opts) => {
    setModalError("");
    setModal({
      open: true,
      title: opts?.title || "",
      message: opts?.message || "",
      confirmText: opts?.confirmText || indT("Confirm_Yes", "OK"),
      cancelText: indT("Confirm_No", "Cancel"),
      showCancel: true,
      showConfirm: true,
      onConfirm: opts?.onConfirm || null
    });
  }, []);

  const handleModalConfirm = useCallback(async () => {
    if (busy) return;
    const cb = modal.onConfirm;
    if (typeof cb !== "function") {
      closeModal();
      return;
    }
    if (modalConfirmInFlightRef.current) return;
    modalConfirmInFlightRef.current = true;
    setModalError("");
    try {
      const result = await cb();
      if (result !== false) {
        closeModal();
      }
    } catch (err) {
      console.error("Modal confirm failed:", err);
      const msg = err?.message || indT("Api_RequestFailed", "Request failed. Please try again.");
      setModalError(msg);
      setStatus(msg);
      flashActionMark("errorProcess", 1500);
    } finally {
      modalConfirmInFlightRef.current = false;
    }
  }, [busy, modal.onConfirm, closeModal]);

  // hydrate data from server if any field is missing
  const hydrateFromApi = useCallback(async () => {
    if (!actividadId) return;
    setIsHydrating(true);
    try {
      console.debug("Fetching activity by code", actividadId);
      const res = await fetchJson(`/Visitas/GetActivityByCode?code=${encodeURIComponent(actividadId)}`);
      if (!res?.success || !res.data) {
        console.error("GetActivityByCode sin datos", res);
        setStatus(res?.message || indT("Visits_Detail_LoadActivityFailed", "Failed to load activity details."));
        return;
      }
      const data = res.data;
      console.debug("API data", data);
      const rawDate = data.transDate || data.TransDate || "";
      setTransDate(normalizeDateToInput(rawDate));
      const rawVisitType =
        data.tipoVisita ||
        data.TipoVisita ||
        data.visitType ||
        data.VisitType ||
        "";
      setVisitType(matchOptionValue(visitTypes, rawVisitType) || defaultVisitType);

      const asistentesList = data.asistentes || data.Asistentes;
      const firstAsistente =
        Array.isArray(asistentesList) && asistentesList.length ? asistentesList[0] : null;
      const rawAsistenteTipo =
        data.asistenteTipo ||
        data.AsistenteTipo ||
        firstAsistente?.asistenteTipo ||
        firstAsistente?.AsistenteTipo ||
        "";
      const normalizedAsistenteTipo = matchOptionValue(asistenteTipos, rawAsistenteTipo);
      setAsistenteTipo(normalizedAsistenteTipo || initialAsistente);
      setDescription(data.description || data.Description || "");
      setComentarios(data.comentarios || data.Comentarios || "");
      setAntecedentes(data.antecedentes || data.Antecedentes || "");
      setConclusiones(data.conclusiones || data.Conclusiones || "");
    } catch (err) {
      console.warn("Failed to load activity by code", err);
    } finally {
      setIsHydrating(false);
      // Apply any pending values coming from the full-screen text editor.
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
    applyTextEditorValues
  ]);

  useEffect(() => {
    if (shouldHydrate) {
      hydrateFromApi();
    } else {
      applyTextEditorValues();
    }
    console.debug("Detalle actividad cargado", detail);
  }, [detail, hydrateFromApi, shouldHydrate, applyTextEditorValues]);

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
        userId,
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
  }, [antecedentes, comentarios, conclusiones, description, transDate, visitType, asistenteTipo, visitTypes, asistenteTipos, matchOptionValue, accountNum, userId, busy, isEditing, syncEditModeFlag]);

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
        openConfirmModal({
          title: indT("Visits_Detail_SaveChanges_Title", "Save changes"),
          message: indT("Visits_Detail_SaveChanges_Body", "Do you want to save changes?"),
          confirmText: indT("Common_Save", "Save"),
          onConfirm: async () => {
            const ok = await handleUpdate();
            if (ok) {
              closeModal();
              setBusy(true);
              setHistoryFilterForDate(transDate);
              flashActionMark("okProcess", 1500);
              await wait(1500);
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
      openConfirmModal({
        title: indT("Visits_Detail_DeleteActivity_Title", "Delete activity"),
        message: indT("Visits_Detail_DeleteActivity_Body", "Do you want to delete this activity?"),
        confirmText: indT("Common_Delete", "Delete"),
        onConfirm: async () => {
            const ok = await handleDelete();
            if (ok) {
            closeModal();
            setBusy(true);
            setHistoryFilterForDate(transDate);
            flashActionMark("okDelProcess", 1500);
            await wait(1500);
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
  }, [busy, modal.open, handleDelete, handleEnableEdit, handleUpdate, isEditing, openConfirmModal, transDate]);

  return (
    <div className="space-y-4">
      {modal.open &&
        createPortal(
          <div className="fixed inset-0 z-[600000] flex items-center justify-center bg-black/40 backdrop-blur-[1px] px-4">
            <div className="w-full max-w-sm rounded-2xl bg-white shadow-xl border border-slate-200 p-5 space-y-4">
              <div className="text-lg font-semibold text-slate-900">{modal.title}</div>
              <div className="text-sm text-slate-700 whitespace-pre-line">{modal.message}</div>
              {(busy || !!modalError) && (
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  {busy && <Spinner size="h-4 w-4" />}
                  <span className={modalError && !busy ? "text-rose-700" : ""}>
                    {busy ? (status || indT("Common_Loading", "Loading")) : modalError}
                  </span>
                </div>
              )}
              <div className="flex justify-end gap-2 pt-2">
                {modal.showCancel && (
                  <button
                    type="button"
                    className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 hover:border-primary hover:text-primary transition"
                    onClick={closeModal}
                    disabled={busy}
                  >
                    {modal.cancelText || indT("Confirm_No", "Cancel")}
                  </button>
                )}
                {modal.showConfirm && (
                  <button
                    type="button"
                    className="px-4 py-2 rounded-xl bg-primary text-white hover:bg-primary/90 transition"
                    onClick={!busy && !!modalError ? closeModal : handleModalConfirm}
                    disabled={busy}
                  >
                    {busy
                      ? indT("Common_Loading", "Loading")
                      : (!busy && !!modalError ? indT("Common_OK", "OK") : (modal.confirmText || indT("Confirm_Yes", "OK")))}
                  </button>
                )}
              </div>
            </div>
          </div>,
          document.body
        )}
      <div
        ref={readOnlySurfaceRef}
        className="relative shadow-sm glass-panel p-4 space-y-4 border border-slate-200 rounded-2xl"
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
          <SingleDatePicker
            label={indT("Visits_Detail_Date_Label", "Date")}
            value={transDate}
            onChange={setTransDate}
            disabled={!isEditing}
          />
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
            <label className="text-sm font-semibold text-slate-700">{indT("Visits_Field_Description", "Description")}</label>
          <input
              id="description"
              className={classNames(
                "w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary",
                isEditing ? "border-slate-200 text-slate-900" : "border-slate-200 bg-slate-100 text-slate-600"
              )}
              maxLength={200}
              value={description}
              disabled={!isEditing}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">{indT("Visits_Field_Comments", "Comments")}</label>
            <textarea
              id="comentarios"
              className={classNames(
                "w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary",
                "cursor-pointer",
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
            <label className="text-sm font-semibold text-slate-700">{indT("Visits_Field_Background", "Background")}</label>
            <textarea
              id="antecedentes"
              className={classNames(
                "w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary",
                "cursor-pointer",
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
            <label className="text-sm font-semibold text-slate-700">{indT("Visits_Field_Conclusions", "Conclusions")}</label>
            <textarea
              id="conclusiones"
              className={classNames(
                "w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary",
                "cursor-pointer",
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

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Visit detail render error:", error, info);
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

const mount = () => {
  const rootEl = document.getElementById("visita-detail-root");
  if (!rootEl) return;
  const root = createRoot(rootEl);
  root.render(
    <ErrorBoundary>
      <DetailApp />
    </ErrorBoundary>
  );
};

if (document.readyState === "complete" || document.readyState === "interactive") {
  mount();
} else {
  document.addEventListener("DOMContentLoaded", mount);
}
