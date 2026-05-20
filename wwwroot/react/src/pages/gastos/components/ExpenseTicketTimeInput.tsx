import React, { useEffect, useMemo, useRef, useState } from "react";
import FloatingList from "../../../components/commons/FloatingList.tsx";
import { ChevronDownSvg, ChevronUpSvg } from "../../../components/commons/chevrons.tsx";
import { useOutsideClick } from "../../../hooks/useOutsideClick.ts";
import { classNames } from "../../../utils/classNames.ts";

type TimePart = "hour" | "minute" | "second";

type ExpenseTicketTimeInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  readOnly?: boolean;
};

type TimeColumnProps = {
  part: TimePart;
  values: string[];
  selectedValue: string;
  label: string;
  onSelect: (part: TimePart, value: string) => void;
};

const HOURS = Array.from({ length: 24 }, (_, index) => String(index).padStart(2, "0"));
const MINUTES_SECONDS = Array.from({ length: 60 }, (_, index) => String(index).padStart(2, "0"));

const sanitizeTimeText = (value: string): string => {
  return String(value || "")
    .replace(/\./g, ":")
    .replace(/[^\d:]/g, "")
    .slice(0, 8);
};

const normalizeTimeText = (value: string): string | null => {
  const raw = sanitizeTimeText(value).trim();
  if (!raw) return "";

  const fromParts = raw.includes(":") ? raw.split(":") : [];
  if (fromParts.length > 0) {
    if (fromParts.length < 2 || fromParts.length > 3) return null;
    const [hourText, minuteText, secondText = "00"] = fromParts;
    if (!hourText || !minuteText || (fromParts.length === 3 && !secondText)) return null;
    const hour = Number(hourText);
    const minute = Number(minuteText);
    const second = Number(secondText);
    if (!Number.isInteger(hour) || !Number.isInteger(minute) || !Number.isInteger(second)) return null;
    if (hour < 0 || hour > 23 || minute < 0 || minute > 59 || second < 0 || second > 59) return null;
    return [hour, minute, second].map((entry) => String(entry).padStart(2, "0")).join(":");
  }

  if (!/^\d{4}(\d{2})?$/.test(raw)) return null;
  const hour = Number(raw.slice(0, 2));
  const minute = Number(raw.slice(2, 4));
  const second = raw.length === 6 ? Number(raw.slice(4, 6)) : 0;
  if (hour > 23 || minute > 59 || second > 59) return null;
  return [hour, minute, second].map((entry) => String(entry).padStart(2, "0")).join(":");
};

const getTimeParts = (value: string): Record<TimePart, string> => {
  const normalized = normalizeTimeText(value);
  if (!normalized) {
    return { hour: "00", minute: "00", second: "00" };
  }

  const [hour = "00", minute = "00", second = "00"] = normalized.split(":");
  return { hour, minute, second };
};

// Time option column used by the ticket time dropdown.
const TimeColumn = ({ part, values, selectedValue, label, onSelect }: TimeColumnProps) => (
  <div className="max-h-64 overflow-y-auto py-1" role="presentation">
    {values.map((optionValue) => {
      const selected = selectedValue === optionValue;
      return (
        <button
          type="button"
          key={`${part}-${optionValue}`}
          role="option"
          aria-selected={selected}
          className={classNames(
            "flex h-9 w-full items-center justify-center px-2 text-sm font-semibold transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary/35",
            selected ? "bg-primary text-white" : "text-[#00296be0] hover:bg-primary/10 hover:text-primary"
          )}
          data-selected-time-part={selected ? "true" : undefined}
          onClick={() => onSelect(part, optionValue)}
          aria-label={`${label} ${optionValue}`}
        >
          {optionValue}
        </button>
      );
    })}
  </div>
);

// Ticket time input with an app-controlled dropdown so colors and placement follow the shared UI standard.
const ExpenseTicketTimeInput = ({
  label,
  value,
  onChange,
  disabled = false,
  readOnly = false,
}: ExpenseTicketTimeInputProps) => {
  const readOnlyMode = readOnly || disabled;
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const valueColor = readOnlyMode ? "#64748b" : "#00296be0";
  const currentParts = useMemo(() => getTimeParts(value), [value]);
  const listId = "expense-ticket-time-options";
  const isOpen = open && !readOnlyMode;

  useOutsideClick([containerRef, listRef], () => {
    setOpen(false);
  });

  useEffect(() => {
    if (!isOpen) return;

    const frame = window.requestAnimationFrame(() => {
      const selectedOptions = listRef.current?.querySelectorAll('[data-selected-time-part="true"]');
      selectedOptions?.forEach((entry) => {
        entry.scrollIntoView({ block: "nearest" });
      });
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [currentParts.hour, currentParts.minute, currentParts.second, isOpen]);

  const commitTextValue = (rawValue: string) => {
    const normalized = normalizeTimeText(rawValue);
    onChange(normalized === null ? "" : normalized);
  };

  const updatePart = (part: TimePart, nextValue: string) => {
    const nextParts = { ...currentParts, [part]: nextValue };
    onChange(`${nextParts.hour}:${nextParts.minute}:${nextParts.second}`);
  };

  return (
    <div className={classNames("space-y-1.5", disabled ? "pointer-events-none select-none" : "")} ref={containerRef}>
      <label className="form-label font-semibold" style={{ color: "#00296be0" }}>
        {label}
      </label>
      <div ref={anchorRef} className="relative">
        <input
          className={classNames("form-control pr-10", readOnlyMode ? "ind-readonly-field" : "")}
          type="text"
          inputMode="numeric"
          value={value}
          onChange={(event) => onChange(sanitizeTimeText(event.target.value))}
          onBlur={(event) => commitTextValue(event.target.value)}
          onFocus={() => {
            if (!readOnlyMode) setOpen(true);
          }}
          onKeyDown={(event) => {
            if (readOnlyMode) return;
            if (event.key === "ArrowDown") {
              event.preventDefault();
              setOpen(true);
            }
            if (event.key === "Enter") {
              commitTextValue(event.currentTarget.value);
              setOpen(false);
            }
            if (event.key === "Escape") {
              setOpen(false);
            }
          }}
          readOnly={readOnlyMode}
          disabled={disabled}
          aria-label={label}
          aria-expanded={isOpen}
          aria-controls={listId}
          style={{ color: valueColor }}
        />
        <button
          type="button"
          className={classNames(
            "absolute inset-y-0 right-0 flex items-center px-2 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary/35",
            readOnlyMode ? "cursor-not-allowed text-slate-400" : "text-slate-500 hover:text-primary"
          )}
          onClick={() => {
            if (readOnlyMode) return;
            setOpen((previous) => !previous);
          }}
          disabled={readOnlyMode}
          aria-label={label}
        >
          {isOpen ? <ChevronUpSvg className="size-5" /> : <ChevronDownSvg className="size-5" />}
        </button>
        <FloatingList
          anchorRef={anchorRef}
          open={isOpen}
          zIndex={360000}
          maxHeightClass="max-h-80"
          role="listbox"
          roundedClass="rounded-[var(--radius-xl)]"
          panelClassName="visitas-typography"
        >
          <div id={listId} ref={listRef} className="grid grid-cols-3 divide-x divide-slate-100" role="group" aria-label={label}>
            <TimeColumn part="hour" values={HOURS} selectedValue={currentParts.hour} label={label} onSelect={updatePart} />
            <TimeColumn part="minute" values={MINUTES_SECONDS} selectedValue={currentParts.minute} label={label} onSelect={updatePart} />
            <TimeColumn part="second" values={MINUTES_SECONDS} selectedValue={currentParts.second} label={label} onSelect={updatePart} />
          </div>
        </FloatingList>
      </div>
    </div>
  );
};

export default ExpenseTicketTimeInput;
