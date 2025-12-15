import React, { useState, useEffect, useRef, useCallback } from "react";
import { createRoot } from "react-dom/client";
import { createPortal } from "react-dom";
import { ChevronDownSvg, ChevronUpSvg } from "./chevrons.jsx";
import SingleDatePicker from "./SingleDatePicker.jsx";

const classNames = (...classes) => classes.filter(Boolean).join(" ");
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const HISTORY_FILTER_KEY = "visitas_history_filter_v1";

const isIsoDate = (value) => /^\d{4}-\d{2}-\d{2}$/.test(String(value || "").trim());

const setHistoryFilterForDate = (isoDate) => {
  const value = String(isoDate || "").trim();
  if (!isIsoDate(value)) return;
  try {
    sessionStorage.setItem(HISTORY_FILTER_KEY, JSON.stringify({ fromDate: value, toDate: value }));
  } catch {
    /* ignore */
  }
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
  const merged = {
    credentials: "same-origin",
    headers: { Accept: "application/json", ...(options?.headers || {}) },
    ...options
  };
  const res = await fetch(url, merged);
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}: ${text}`);
  }
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(`Invalid JSON from ${url}: ${text}`);
  }
}

const Spinner = ({ size = "h-4 w-4" }) => (
  <div
    className={`${size} border-2 border-primary border-t-transparent rounded-full animate-spin`}
    role="status"
    aria-label="Cargando"
  />
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
            className="w-full rounded-xl border border-slate-200 px-3 py-2 pr-10 text-sm leading-5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
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
            aria-label={open ? "Ocultar opciones" : "Mostrar opciones"}
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
            {filtered.length === 0 && <div className="px-4 py-2 text-sm text-slate-500">Sin resultados</div>}
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
  const rawInitialVisitType = detail.tipoVisita || detail.TipoVisita || "";
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

  const [modal, setModal] = useState({
    open: false,
    title: "",
    message: "",
    confirmText: "Aceptar",
    cancelText: "Cancelar",
    showCancel: true,
    showConfirm: true,
    onConfirm: null
  });

  const closeModal = useCallback(() => {
    setModal((m) => ({ ...m, open: false }));
  }, []);

  const openConfirmModal = useCallback((opts) => {
    setModal({
      open: true,
      title: opts?.title || "",
      message: opts?.message || "",
      confirmText: opts?.confirmText || "Confirmar",
      cancelText: "Cancelar",
      showCancel: true,
      showConfirm: true,
      onConfirm: opts?.onConfirm || null
    });
  }, []);

  const handleModalConfirm = useCallback(async () => {
    const cb = modal.onConfirm;
    closeModal();
    if (typeof cb === "function") {
      await cb();
    }
  }, [modal.onConfirm, closeModal]);

  const recId = detail.recId || detail.RecId || "";
  const accountNum = detail.accountNum || detail.AccountNum || "";
  const userId = detail.userId || detail.UserId || "";
  const actividadId = detail.actividadId || detail.ActividadId || "";

  // hydrate data from server if any field is missing
  const hydrateFromApi = useCallback(async () => {
    if (!actividadId) return;
    try {
      console.debug("Fetching activity by code", actividadId);
      const res = await fetchJson(`/Visitas/GetActivityByCode?code=${encodeURIComponent(actividadId)}`);
      if (!res?.success || !res.data) {
        console.error("GetActivityByCode sin datos", res);
        setStatus(res?.message || "No se pudo obtener datos de la actividad.");
        return;
      }
      const data = res.data;
      console.debug("API data", data);
      const rawDate = data.transDate || data.TransDate || "";
      setTransDate(normalizeDateToInput(rawDate));
      const rawVisitType = data.tipoVisita || data.TipoVisita || "";
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
      console.warn("No se pudieron cargar datos del API por código", err);
    }
  }, [actividadId, asistenteTipos, visitTypes, matchOptionValue, normalizeDateToInput, initialAsistente]);

  useEffect(() => {
    hydrateFromApi();
    console.debug("Detalle actividad cargado", detail);
  }, [detail, hydrateFromApi]);

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
    setIsEditing(true);
    setStatus("Edición habilitada");
  }, []);

  const handleUpdate = useCallback(async () => {
    if (busy || !isEditing) return false;
    setBusy(true);
    setStatus("Actualizando actividad...");
    try {
      const normalizedVisitType = matchOptionValue(visitTypes, visitType);
      const normalizedAsistenteTipo = matchOptionValue(asistenteTipos, asistenteTipo);
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

      if (!res.success) throw new Error(res.message || "No se pudo actualizar");

      setStatus("Actividad actualizada");
      setIsEditing(false);
      return true;
    } catch (err) {
      setStatus(err.message || "Error al actualizar");
      return false;
    } finally {
      setBusy(false);
    }
  }, [antecedentes, comentarios, conclusiones, description, transDate, visitType, asistenteTipo, visitTypes, asistenteTipos, matchOptionValue, accountNum, userId, busy, isEditing]);

  const handleDelete = useCallback(async () => {
    if (busy) return false;
    setBusy(true);
    setStatus("Eliminando actividad...");
    try {
      const res = await fetchJson(`/Visitas/DeleteActivity/${recId}`, { method: "DELETE" });
      if (!res.success) throw new Error(res.message || "No se pudo eliminar");
      setStatus("Actividad eliminada");
      return true;
    } catch (err) {
      setStatus(err.message || "Error al eliminar");
      return false;
    } finally {
      setBusy(false);
    }
  }, [busy, recId]);

  // Listen to topbar icon events
  useEffect(() => {
    const onEdit = () => {
      if (isEditing) {
        openConfirmModal({
          title: "Guardar cambios",
          message: "Deseas guardar los cambios de la actividad?",
          confirmText: "Guardar",
          onConfirm: async () => {
            const ok = await handleUpdate();
            if (ok) {
              setHistoryFilterForDate(transDate);
              flashActionMark("okProcess", 1500);
              await wait(1500);
              window.location.href = "/Historial/History";
            }
          }
        });
      } else {
        handleEnableEdit();
      }
    };

    const onDelete = () => {
      openConfirmModal({
        title: "Eliminar actividad",
        message: "Deseas eliminar esta actividad? Esta accion no se puede deshacer.",
        confirmText: "Eliminar",
        onConfirm: async () => {
            const ok = await handleDelete();
            if (ok) {
            setHistoryFilterForDate(transDate);
            flashActionMark("okDelProcess", 1500);
            await wait(1500);
            window.location.href = "/Historial/History";
            }
          }
        });
    };
    window.addEventListener("visit-edit", onEdit);
    window.addEventListener("visit-delete", onDelete);
    return () => {
      window.removeEventListener("visit-edit", onEdit);
      window.removeEventListener("visit-delete", onDelete);
    };
  }, [handleDelete, handleEnableEdit, handleUpdate, isEditing, openConfirmModal]);

  return (
    <div className="space-y-4">
      {modal.open &&
        createPortal(
          <div className="fixed inset-0 z-[600000] flex items-center justify-center bg-black/40 backdrop-blur-[1px] px-4">
            <div className="w-full max-w-sm rounded-2xl bg-white shadow-xl border border-slate-200 p-5 space-y-4">
              <div className="text-lg font-semibold text-slate-900">{modal.title}</div>
              <div className="text-sm text-slate-700 whitespace-pre-line">{modal.message}</div>
              <div className="flex justify-end gap-2 pt-2">
                {modal.showCancel && (
                  <button
                    type="button"
                    className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 hover:border-primary hover:text-primary transition"
                    onClick={closeModal}
                  >
                    {modal.cancelText || "Cancelar"}
                  </button>
                )}
                {modal.showConfirm && (
                  <button
                    type="button"
                    className="px-4 py-2 rounded-xl bg-primary text-white hover:bg-primary/90 transition"
                    onClick={handleModalConfirm}
                  >
                    {modal.confirmText || "Aceptar"}
                  </button>
                )}
              </div>
            </div>
          </div>,
          document.body
        )}
      <div className="shadow-sm glass-panel p-4 space-y-4 border border-slate-200 rounded-2xl">
        <div className="text-base font-semibold text-slate-900 border-b border-slate-200 pb-3">
          Datos de la visita
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SingleDatePicker
            label="Fecha"
            value={transDate}
            onChange={setTransDate}
            disabled={!isEditing}
          />
          <SelectCombobox
            label="Tipo de visita"
            options={visitTypes}
            value={visitType}
            onChange={setVisitType}
            placeholder="Selecciona tipo"
            disabled={!isEditing}
          />
        </div>

        <div className="grid grid-cols-1 gap-3">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Descripción</label>
            <input
              id="description"
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              maxLength={200}
              value={description}
              disabled={!isEditing}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Comentarios</label>
            <textarea
              id="comentarios"
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              value={comentarios}
              disabled={!isEditing}
              onChange={(e) => setComentarios(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Antecedentes</label>
            <textarea
              id="antecedentes"
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              value={antecedentes}
              disabled={!isEditing}
              onChange={(e) => setAntecedentes(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Conclusiones</label>
            <textarea
              id="conclusiones"
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              value={conclusiones}
              disabled={!isEditing}
              onChange={(e) => setConclusiones(e.target.value)}
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
    console.error("Detalle visita error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 rounded-xl border border-rose-200 bg-rose-50 text-rose-700">
          Ocurrió un error al mostrar la página de detalle. Recarga e intenta de nuevo.
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
