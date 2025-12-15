import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

// Single date picker matching the Historial DRP visual style.
// Returns an ISO string (yyyy-MM-dd) via onChange.

const pad = (n) => String(n).padStart(2, "0");
const toISO = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

const parseISO = (s) => {
  if (!s) return null;
  const raw = String(s).trim();
  if (!raw) return null;
  const parts = raw.split("-");
  if (parts.length === 3) {
    const [y, m, d] = parts.map(Number);
    if (!Number.isNaN(y) && !Number.isNaN(m) && !Number.isNaN(d)) {
      return new Date(y, m - 1, d);
    }
  }
  return null;
};

const formatDisplay = (d) =>
  d
    ? d
        .toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" })
        .replace(/\./g, "")
        .toLowerCase()
    : "Anadir fecha";

export default function SingleDatePicker({ label = "Fecha", value, onChange, disabled = false }) {
  const selectedDate = useMemo(() => parseISO(value), [value]);
  const [open, setOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(
    selectedDate ? selectedDate.getMonth() : new Date().getMonth()
  );
  const [currentYear, setCurrentYear] = useState(
    selectedDate ? selectedDate.getFullYear() : new Date().getFullYear()
  );

  const containerRef = useRef(null);

  useEffect(() => {
    if (selectedDate) {
      setCurrentMonth(selectedDate.getMonth());
      setCurrentYear(selectedDate.getFullYear());
    }
  }, [selectedDate?.getTime()]);

  useEffect(() => {
    const onDocClick = (ev) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(ev.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("touchstart", onDocClick);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("touchstart", onDocClick);
    };
  }, []);

  const firstDay = new Date(currentYear, currentMonth, 1);
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const offset = (firstDay.getDay() + 6) % 7; // Monday as 0

  const monthLabel = firstDay
    .toLocaleDateString("es-ES", { month: "long" })
    .replace(/^\w/, (c) => c.toUpperCase());

  const sameDay = (a, b) =>
    a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

  const handleSelect = useCallback(
    (dateObj) => {
      if (disabled) return;
      const iso = toISO(dateObj);
      onChange?.(iso);
      setOpen(false);
    },
    [disabled, onChange]
  );

  const goMonth = (inc) => {
    if (disabled) return;
    let m = currentMonth + inc;
    let y = currentYear;
    if (m > 11) {
      m = 0;
      y += 1;
    } else if (m < 0) {
      m = 11;
      y -= 1;
    }
    setCurrentMonth(m);
    setCurrentYear(y);
  };

  return (
    <div className={`relative ${disabled ? "opacity-70 pointer-events-none select-none" : ""}`} ref={containerRef}>
      <div
        className="drp"
        role="button"
        tabIndex={0}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen((v) => !v);
          }
          if (e.key === "Escape") setOpen(false);
        }}
        aria-expanded={open}
      >
        <div className={`drp-section ${open ? "active" : ""}`}>
          <div className="drp-label">{label.toUpperCase()}</div>
          <div className="drp-value">
            <span>{formatDisplay(selectedDate)}</span>
          </div>
        </div>
      </div>

      {open && (
        <div className="drp-popover" role="dialog" aria-modal="true">
          <div className="drp-head">
            <button type="button" className="drp-nav" aria-label="Mes anterior" onClick={() => goMonth(-1)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 30 30" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="drp-month">{monthLabel} {currentYear}</div>
            <button type="button" className="drp-nav" aria-label="Mes siguiente" onClick={() => goMonth(1)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 30 30" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <div className="drp-weekdays">
            <span>Lu</span><span>Ma</span><span>Mi</span><span>Ju</span><span>Vi</span><span>Sa</span><span>Do</span>
          </div>
          <div className="drp-grid">
            {Array.from({ length: offset }).map((_, i) => (
              <button key={`e-${i}`} className="drp-day empty" disabled type="button" />
            ))}
            {Array.from({ length: daysInMonth }).map((_, idx) => {
              const day = idx + 1;
              const dateObj = new Date(currentYear, currentMonth, day);
              const isSelected = sameDay(dateObj, selectedDate);
              const isToday = sameDay(dateObj, new Date());
              const cls = [
                "drp-day",
                isSelected ? "start range-start" : "",
                isToday ? "today" : ""
              ].join(" ");
              return (
                <button
                  key={toISO(dateObj)}
                  type="button"
                  className={cls}
                  onClick={() => handleSelect(dateObj)}
                >
                  {day}
                </button>
              );
            })}
          </div>
          <div className="drp-status">Selecciona la fecha</div>
        </div>
      )}
    </div>
  );
}

