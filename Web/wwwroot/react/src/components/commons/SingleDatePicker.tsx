import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useFloatingPosition } from "../../hooks/useFloatingPosition.ts";
import { ChevronDownSvg, ChevronUpSvg } from "./chevrons.tsx";

// Single date picker matching the Historial DRP visual style.
// Returns an ISO string (yyyy-MM-dd) via onChange.

const IND_I18N = globalThis.__IND_I18N__ || {};
const indT = (key, fallback) => (IND_I18N && typeof IND_I18N[key] === "string" && IND_I18N[key]) || fallback || key;

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

const normalizeUiLocale = (locale) => {
  const value = String(locale || "").trim();
  if (!value) return "es-ES";
  if (/^zh-hans/i.test(value)) return "zh-CN";
  return value;
};

const getUiLocale = () => {
  const fromHtml = document?.documentElement?.lang;
  if (fromHtml && String(fromHtml).trim()) return normalizeUiLocale(fromHtml);
  return "es-ES";
};

const isBasqueLocale = (locale) => /^eu\b/i.test(String(locale || ""));
const BASQUE_MONTHS = [
  "urtarrila",
  "otsaila",
  "martxoa",
  "apirila",
  "maiatza",
  "ekaina",
  "uztaila",
  "abuztua",
  "iraila",
  "urria",
  "azaroa",
  "abendua"
];
const BASQUE_MONTHS_SHORT = [
  "urt",
  "ots",
  "mar",
  "api",
  "mai",
  "eka",
  "uzt",
  "abu",
  "ira",
  "urr",
  "aza",
  "abe"
];

const formatDisplay = (d) => {
  if (!d) return indT("History_AddDate", "Add date");
  const locale = getUiLocale();
  if (isBasqueLocale(locale)) {
    const month = BASQUE_MONTHS_SHORT[d.getMonth()];
    return `${d.getDate()} ${month} ${d.getFullYear()}`.toLowerCase();
  }
  return d
    .toLocaleDateString(locale, { day: "numeric", month: "short", year: "numeric" })
    .replace(/\./g, "")
    .toLowerCase();
};

export default function SingleDatePicker({ label, value, onChange, disabled = false, readOnly = false }) {
  const effectiveLabel = (label && String(label).trim()) ? label : indT("Visits_Detail_Date_Label", "Date");
  const selectedDate = useMemo(() => parseISO(value), [value]);
  const [open, setOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(
    selectedDate ? selectedDate.getMonth() : new Date().getMonth()
  );
  const [currentYear, setCurrentYear] = useState(
    selectedDate ? selectedDate.getFullYear() : new Date().getFullYear()
  );

  const containerRef = useRef(null);
  const popoverRef = useRef(null);
  const anchorRef = useRef(null);
  const readOnlyMode = readOnly || disabled;
  const isPopoverOpen = open && !readOnlyMode;
  const floatingStyle = useFloatingPosition(anchorRef, isPopoverOpen, {
    overlayRef: popoverRef,
    autoFitViewport: true,
  });

  useEffect(() => {
    if (selectedDate) {
      setCurrentMonth(selectedDate.getMonth());
      setCurrentYear(selectedDate.getFullYear());
    }
  }, [selectedDate?.getTime()]);

  useEffect(() => {
    const onDocClick = (ev) => {
      const target = ev.target;
      if (containerRef.current?.contains(target)) return;
      if (popoverRef.current?.contains(target)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("touchstart", onDocClick, { passive: true });
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("touchstart", onDocClick);
    };
  }, []);

  const firstDay = new Date(currentYear, currentMonth, 1);
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const offset = (firstDay.getDay() + 6) % 7; // Monday as 0

  const monthLabel = (() => {
    const locale = getUiLocale();
    if (/^zh/i.test(locale)) {
      return new Intl.DateTimeFormat(locale, { year: "numeric", month: "long" }).format(firstDay);
    }
    if (isBasqueLocale(locale)) {
      return `${BASQUE_MONTHS[currentMonth]} ${currentYear}`;
    }
    const raw = firstDay.toLocaleDateString(locale, { month: "long" });
    const first = raw.slice(0, 1);
    const rest = raw.slice(1);
    return `${first.toUpperCase()}${rest} ${currentYear}`;
  })();

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

  const valueColor = readOnlyMode ? "#64748b" : "#00296be0";
  const labelColor = "#00296be0";
  const containerClass = `space-y-2 ${disabled ? "pointer-events-none select-none" : ""}`.trim();
  const buttonClass = [
    "form-control",
    "flex items-center",
    "pr-10",
    readOnlyMode ? "ind-readonly-field" : "",
    readOnlyMode ? "cursor-not-allowed" : "cursor-pointer"
  ].filter(Boolean).join(" ");
  const popover =
    isPopoverOpen && typeof document !== "undefined"
      ? createPortal(
          <div
            ref={popoverRef}
            className="drp-popover"
            role="dialog"
            aria-modal="true"
            style={{
              position: "fixed",
              top: floatingStyle.top,
              left: floatingStyle.left,
              width: floatingStyle.width,
              maxHeight: floatingStyle.maxHeight,
              zIndex: 360000,
              overflowY: "auto",
              overscrollBehavior: "contain",
            }}
          >
            <div className="drp-head">
              <button type="button" className="drp-nav" aria-label={indT("History_PrevMonth", "Previous month")} onClick={() => goMonth(-1)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 30 30" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="drp-month">{monthLabel}</div>
              <button type="button" className="drp-nav" aria-label={indT("History_NextMonth", "Next month")} onClick={() => goMonth(1)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 30 30" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <div className="drp-weekdays">
              <span>{indT("History_Day_Mon", "Mo")}</span><span>{indT("History_Day_Tue", "Tu")}</span><span>{indT("History_Day_Wed", "We")}</span><span>{indT("History_Day_Thu", "Th")}</span><span>{indT("History_Day_Fri", "Fr")}</span><span>{indT("History_Day_Sat", "Sa")}</span><span>{indT("History_Day_Sun", "Su")}</span>
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
            <div className="drp-status">{indT("DatePicker_SelectDate", "Select date")}</div>
          </div>,
          document.body
        )
      : null;

  return (
    <div className={containerClass} ref={containerRef}>
      <label className="form-label font-semibold" style={{ color: labelColor }}>{String(effectiveLabel)}</label>
      <div ref={anchorRef} className="relative">
        <button
          type="button"
          className={buttonClass}
          onClick={() => {
            if (readOnlyMode) return;
            setOpen((v) => !v);
          }}
          onKeyDown={(e) => {
            if (readOnlyMode) return;
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setOpen((v) => !v);
            }
            if (e.key === "Escape") setOpen(false);
          }}
          aria-expanded={isPopoverOpen}
          aria-disabled={readOnlyMode ? "true" : undefined}
        >
          <span style={{ color: valueColor, fontWeight: 400 }}>{formatDisplay(selectedDate)}</span>
        </button>
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 text-slate-500 pointer-events-none">
          {isPopoverOpen ? <ChevronUpSvg className="h-5 w-5" /> : <ChevronDownSvg className="h-5 w-5" />}
        </span>
      </div>
      {popover}
    </div>
  );
}
