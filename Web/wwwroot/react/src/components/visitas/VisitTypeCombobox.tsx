import React, { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDownSvg, ChevronUpSvg } from "../commons/chevrons.tsx";
import FloatingList from "../commons/FloatingList.tsx";
import { useOutsideClick } from "../../hooks/useOutsideClick.ts";
import { classNames } from "../../utils/classNames.ts";
import { indT } from "../../utils/indI18n.ts";

type Option = {
  value: string;
  text: string;
};

type RawOption = {
  value?: string;
  Value?: string;
  text?: string;
  Text?: string;
};

const normalizeOption = (opt?: RawOption | null): Option => {
  if (!opt) return { value: "", text: "" };
  return {
    value: String(opt.value ?? opt.Value ?? ""),
    text: String(opt.text ?? opt.Text ?? ""),
  };
};

// Searchable combobox that syncs with the legacy select element.
const VisitTypeCombobox = ({ options = [], targetId = "visitType" }: { options?: RawOption[]; targetId?: string }) => {
  const normalized = useMemo(() => options.map(normalizeOption), [options]);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Option>(() => normalized.find((x) => x.value) ?? { value: "", text: "" });
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  // Keep the underlying select (for existing JS) in sync.
  useEffect(() => {
    const select = document.getElementById(targetId) as HTMLSelectElement | null;
    if (select && selected) {
      select.value = selected.value;
      select.dispatchEvent(new Event("change"));
    }
  }, [selected, targetId]);

  const filtered = useMemo(() => {
    if (!query.trim()) return normalized;
    return normalized.filter((opt) => opt.text.toLowerCase().includes(query.toLowerCase()));
  }, [normalized, query]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query, normalized.length]);

  useEffect(() => {
    if (selected?.text) setQuery(selected.text);
  }, [selected]);

  useOutsideClick([containerRef, listRef], () => setOpen(false));

  const selectOption = (opt: Option) => {
    setSelected(opt);
    setQuery(opt.text);
    setOpen(false);
  };

  const onKeyDown = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open && (ev.key === "ArrowDown" || ev.key === "Enter")) {
      setOpen(true);
      return;
    }
    if (!filtered.length) return;
    if (ev.key === "ArrowDown") {
      ev.preventDefault();
      setActiveIndex((idx) => (idx + 1) % filtered.length);
    }
    if (ev.key === "ArrowUp") {
      ev.preventDefault();
      setActiveIndex((idx) => (idx - 1 + filtered.length) % filtered.length);
    }
    if (ev.key === "Enter") {
      ev.preventDefault();
      selectOption(filtered[activeIndex] ?? filtered[0]);
    }
    if (ev.key === "Escape") {
      setOpen(false);
    }
  };

  if (!normalized.length) return null;

  return (
    <div className="relative z-140000" ref={containerRef}>
      <div className="relative mt-1">
        <div
          ref={boxRef}
          className="relative w-full cursor-default rounded-md border border-slate-300 bg-white text-left shadow-xs focus-within:border-primary focus-within:ring-2 focus-within:ring-primary sm:text-sm"
        >
          <input
            className="w-full border-none bg-transparent py-2 pl-3 pr-10 text-sm leading-5 text-slate-900 placeholder:text-slate-400 focus:outline-hidden"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={onKeyDown}
            aria-label={indT("Visits_Detail_VisitType_Label", "Visit type")}
            role="combobox"
            aria-expanded={open}
            aria-controls="visit-type-options"
            aria-activedescendant={
              open && filtered[activeIndex] ? `visit-type-${filtered[activeIndex].value}` : undefined
            }
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-2 text-slate-500 hover:text-slate-600"
            onClick={() => setOpen((prev) => !prev)}
            aria-label={open ? indT("Dropdown_HideOptions", "Hide options") : indT("Dropdown_ShowOptions", "Show options")}
          >
            {open ? <ChevronUpSvg className="h-5 w-5" /> : <ChevronDownSvg className="h-5 w-5" />}
          </button>
        </div>
        <FloatingList anchorRef={boxRef} open={open} zIndex={360000}>
          <div ref={listRef} role="listbox" aria-label={indT("Visits_Detail_VisitType_Label", "Visit type")}
          >
            {filtered.length === 0 ? (
              <div className="relative cursor-default select-none px-4 py-2 text-slate-700">
                {indT("Dropdown_NoResults", "No results")}
              </div>
            ) : (
              filtered.map((opt, idx) => {
                const isActive = idx === activeIndex;
                const isSelected = selected?.value === opt.value;
                return (
                  <button
                    type="button"
                    key={opt.value}
                    id={`visit-type-${opt.value}`}
                    role="option"
                    aria-selected={isSelected}
                    className={classNames(
                      "relative flex w-full cursor-default select-none items-center py-2 pl-8 pr-3 text-left text-sm",
                      isActive ? "bg-primary text-white" : isSelected ? "bg-primary/10 text-primary" : "text-slate-900"
                    )}
                    onMouseEnter={() => setActiveIndex(idx)}
                    onClick={() => selectOption(opt)}
                  >
                    {isSelected && (
                      <span
                        className={classNames(
                          "absolute inset-y-0 left-0 flex items-center pl-2",
                          isActive ? "text-white" : "text-primary"
                        )}
                      ></span>
                    )}
                    <span className={classNames("block truncate pr-2", isSelected ? "font-medium" : "font-normal")}>
                      {opt.text}
                    </span>
                  </button>
                );
              })
            )}
          </div>
        </FloatingList>
      </div>
    </div>
  );
};

export default VisitTypeCombobox;
