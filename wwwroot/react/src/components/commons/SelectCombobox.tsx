import React, { useEffect, useMemo, useRef, useState } from "react";
import FloatingList from "./FloatingList.tsx";
import { ChevronDownSvg, ChevronUpSvg } from "./chevrons.tsx";
import { useOutsideClick } from "../../hooks/useOutsideClick.ts";
import { classNames } from "../../utils/classNames.ts";
import { indT } from "../../utils/indI18n.ts";

type RawOption =
  | {
      value?: string | number;
      Value?: string | number;
      text?: string;
      Text?: string;
      icon?: React.ReactNode;
      Icon?: React.ReactNode;
    }
  | [string | number, string];

type NormalizedOption = {
  value: string | number;
  text: string;
  icon?: React.ReactNode;
};

type SelectComboboxProps = {
  label: string;
  options: RawOption[];
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  invalid?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  usePortal?: boolean;
  emitOnValueChange?: boolean;
  idBase?: string;
  portalClassName?: string;
  panelClassName?: string;
  showSearchButton?: boolean;
  allowTextInput?: boolean;
  showLabel?: boolean;
  selectedTextMode?: "text" | "value";
  dropdownExpandPx?: number;
  dropdownMinWidthPx?: number;
  dropdownMaxHeightClass?: string;
  selectedIconClassName?: string;
  optionIconClassName?: string;
  allowOptionHorizontalScroll?: boolean;
  lockDropdownWidthOnFirstOpen?: boolean;
  disableDefaultOptionPadding?: boolean;
  optionLeftPaddingClassName?: string;
  optionTextClassName?: string;
  optionDefaultClassName?: string;
  optionActiveClassName?: string;
  optionSelectedClassName?: string;
  selectedInputPaddingClassName?: string;
  panelStyle?: React.CSSProperties;
  clearOnEmptyInput?: boolean;
};

// Reusable select combobox with optional portal rendering for the list.
const SelectCombobox = ({
  label,
  options,
  value,
  onChange,
  placeholder,
  invalid = false,
  disabled = false,
  readOnly = false,
  usePortal = true,
  emitOnValueChange = false,
  idBase,
  portalClassName,
  panelClassName,
  showSearchButton = false,
  allowTextInput = true,
  showLabel = true,
  selectedTextMode = "text",
  dropdownExpandPx = 0,
  dropdownMinWidthPx = 0,
  dropdownMaxHeightClass = "max-h-72",
  selectedIconClassName = "h-4 w-4",
  optionIconClassName = "h-4 w-4",
  allowOptionHorizontalScroll = false,
  lockDropdownWidthOnFirstOpen = false,
  disableDefaultOptionPadding = false,
  optionLeftPaddingClassName = "",
  optionTextClassName = "",
  optionDefaultClassName = "text-slate-900",
  optionActiveClassName = "bg-primary text-white",
  optionSelectedClassName = "bg-primary text-white",
  selectedInputPaddingClassName = "pl-9",
  panelStyle,
  clearOnEmptyInput = false,
}: SelectComboboxProps) => {
  const readOnlyMode = readOnly || disabled;
  const valueColor = readOnlyMode ? "#64748b" : "#00296be0";
  const data = useMemo(() => {
    return (options || []).map<NormalizedOption>((o) => {
      if (Array.isArray(o)) {
        return { value: o[0] ?? "", text: o[1] ?? "" };
      }
      return {
        value: o?.value ?? o?.Value ?? "",
        text: o?.text ?? o?.Text ?? "",
        icon: o?.icon ?? o?.Icon,
      };
    });
  }, [options]);

  const [query, setQuery] = useState<string | null>(null);
  const [selected, setSelected] = useState(
    data.find((d) => String(d.value) === String(value)) || { value: "", text: "" }
  );
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const initialDropdownWidthRef = useRef<number | null>(null);

  useOutsideClick([containerRef, listRef], () => setOpen(false));

  useEffect(() => {
    setSelected(data.find((d) => String(d.value) === String(value)) || { value: "", text: "" });
  }, [value, data]);

  useEffect(() => {
    // Reset typed search text after external value changes.
    setQuery(null);
  }, [selected]);

  useEffect(() => {
    if (!emitOnValueChange) return;
    onChange(selected?.value ? String(selected.value) : "");
  }, [emitOnValueChange, onChange, selected]);

  const filtered = useMemo(() => {
    if (!query || !query.trim()) return data;
    const f = data.filter((o) => {
      const optionValue = String(o.value ?? "").trim();
      if (!optionValue) {
        return false;
      }
      return o.text.toLowerCase().includes(query.toLowerCase());
    });
    return f.length ? f : data;
  }, [data, query]);

  useEffect(() => {
    setActiveIndex(0);
  }, [filtered.length, query]);

  const selectOption = (opt: NormalizedOption) => {
    setSelected(opt);
    setQuery(null);
    setOpen(false);
    if (!emitOnValueChange) {
      onChange(opt?.value ? String(opt.value) : "");
    }
  };

  const handleKeyDown = (ev: React.KeyboardEvent<HTMLInputElement>) => {
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
      if (clearOnEmptyInput && query !== null && !query.trim()) {
        setOpen(false);
        return;
      }
      if (open && filtered.length) {
        selectOption(filtered[activeIndex] ?? filtered[0]);
      } else {
        setOpen(true);
      }
    }
    if (ev.key === "Escape") setOpen(false);
  };

  const safeId = String(idBase || label || "select");
  const listId = `select-options-${safeId}`;
  const activeId = open && filtered[activeIndex] ? `select-opt-${safeId}-${filtered[activeIndex].value}` : undefined;
  const listOpen = open && !disabled;
  const selectedValue = String(selected?.value ?? "").trim();
  const selectedDisplayText = selectedTextMode === "value" ? selectedValue : selected?.text || "";
  const displayValue = query !== null ? query : (selectedValue ? selectedDisplayText : "");
  const showSelectedIcon = query === null && !!selectedValue && !!selected?.icon;
  const normalizedDropdownExpandPx = Number.isFinite(dropdownExpandPx) ? Math.max(0, dropdownExpandPx) : 0;
  const normalizedDropdownMinWidthPx = Number.isFinite(dropdownMinWidthPx) ? Math.max(0, dropdownMinWidthPx) : 0;

  useEffect(() => {
    if (!lockDropdownWidthOnFirstOpen) return;
    if (!listOpen) return;
    if (initialDropdownWidthRef.current !== null) return;

    const width = boxRef.current?.getBoundingClientRect().width;
    if (!Number.isFinite(width) || !width || width <= 0) return;
    initialDropdownWidthRef.current = width;
  }, [listOpen, lockDropdownWidthOnFirstOpen]);

  const measuredAnchorWidth = boxRef.current?.getBoundingClientRect().width;
  const normalizedMeasuredAnchorWidth =
    Number.isFinite(measuredAnchorWidth) && measuredAnchorWidth && measuredAnchorWidth > 0 ? measuredAnchorWidth : null;
  const fixedDropdownBaseWidth = lockDropdownWidthOnFirstOpen
    ? initialDropdownWidthRef.current ?? normalizedMeasuredAnchorWidth
    : normalizedMeasuredAnchorWidth;
  const fixedDropdownExpandedWidth =
    fixedDropdownBaseWidth !== null && Number.isFinite(fixedDropdownBaseWidth)
      ? fixedDropdownBaseWidth + normalizedDropdownExpandPx
      : null;
  const resolvedDropdownWidthPx =
    fixedDropdownExpandedWidth !== null
      ? Math.max(fixedDropdownExpandedWidth, normalizedDropdownMinWidthPx || 0)
      : null;
  const inlineDropdownStyle: React.CSSProperties | undefined =
    resolvedDropdownWidthPx !== null && resolvedDropdownWidthPx > 0
      ? {
          width: `${resolvedDropdownWidthPx}px`,
          ...(normalizedDropdownMinWidthPx > 0 ? { minWidth: `${normalizedDropdownMinWidthPx}px` } : {}),
        }
      : normalizedDropdownExpandPx > 0
        ? {
            width: `calc(100% + ${normalizedDropdownExpandPx}px)`,
            ...(normalizedDropdownMinWidthPx > 0 ? { minWidth: `${normalizedDropdownMinWidthPx}px` } : {}),
          }
        : normalizedDropdownMinWidthPx > 0
          ? { minWidth: `${normalizedDropdownMinWidthPx}px` }
        : undefined;

  const listBody = (
    <div id={listId} ref={listRef} role="listbox" aria-label={label}>
      {filtered.length === 0 && <div className="px-4 py-2 text-sm text-slate-500">{indT("Dropdown_NoResults", "No results")}</div>}
      {filtered.map((opt, idx) => {
        const sel = selected?.value === opt.value;
        const isActive = idx === activeIndex;
        const optionStateClassName = sel ? optionSelectedClassName : isActive ? optionActiveClassName : optionDefaultClassName;
        return (
          <button
            type="button"
            key={String(opt.value)}
            id={`select-opt-${safeId}-${opt.value}`}
            role="option"
            aria-selected={sel}
            className={classNames(
              "relative flex w-full cursor-default select-none items-center py-2 pr-3 text-left text-sm",
              optionLeftPaddingClassName,
              disableDefaultOptionPadding ? "" : "type-option",
              optionStateClassName
            )}
            style={
              allowOptionHorizontalScroll
                ? { overflowX: "auto", overflowY: "hidden", WebkitOverflowScrolling: "touch" }
                : undefined
            }
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
            <span
              className={classNames(
                allowOptionHorizontalScroll ? "inline-flex items-center gap-2" : "flex min-w-0 items-center gap-2",
                sel ? "font-medium" : "font-normal"
              )}
              style={allowOptionHorizontalScroll ? { minWidth: "max-content" } : undefined}
            >
              {opt.icon ? (
                <span
                  className={classNames(
                    "inline-flex shrink-0 items-center justify-center",
                    optionIconClassName,
                    isActive ? "text-white" : "text-slate-500"
                  )}
                >
                  {opt.icon}
                </span>
              ) : null}
              <span
                className={classNames(allowOptionHorizontalScroll ? "block" : "block truncate", optionTextClassName)}
                style={allowOptionHorizontalScroll ? { whiteSpace: "nowrap" } : undefined}
              >
                {opt.text}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );

  return (
    <div
      className={classNames("space-y-2", disabled ? "pointer-events-none select-none" : "")}
      ref={containerRef}
    >
      {showLabel ? <label className={classNames("form-label font-semibold", invalid ? "text-rose-700" : "")}>{label}</label> : null}
      <div className="relative">
        <div
          ref={boxRef}
          className={classNames(
            "relative w-full cursor-default rounded-xl bg-white text-left focus-within:border-primary focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-white sm:text-sm",
            readOnlyMode ? "ind-readonly-field" : ""
          )}
          style={readOnlyMode ? { color: valueColor } : undefined}
        >
          <input
            className={classNames(
              "w-full rounded-xl border py-2 text-sm sm:text-base leading-5 focus:outline-hidden focus:ring-2 disabled:bg-slate-100 disabled:text-slate-500 disabled:border-slate-200 disabled:cursor-not-allowed",
              showSelectedIcon ? selectedInputPaddingClassName : "pl-3",
              showSearchButton ? "pr-20" : "pr-10",
              invalid
                ? "border-rose-400 bg-rose-50 focus:ring-rose-200 focus:border-rose-400"
                : "border-slate-200 focus:ring-primary focus:border-primary",
              readOnlyMode ? "ind-readonly-field" : "text-slate-900"
            )}
            style={readOnlyMode ? { color: valueColor } : undefined}
            value={displayValue}
            disabled={disabled}
            onChange={(event) => {
              if (!allowTextInput) return;
              const val = event.target.value;
              setQuery(val);
              if (clearOnEmptyInput && !val.trim()) {
                setSelected({ value: "", text: "" });
                setOpen(false);
                if (!emitOnValueChange) {
                  onChange("");
                }
                return;
              }
              setOpen(true);
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              if (!disabled) setOpen(true);
            }}
            placeholder={placeholder}
            readOnly={readOnlyMode || !allowTextInput}
            aria-label={label}
            role="combobox"
            aria-expanded={listOpen}
            aria-controls={listId}
            aria-activedescendant={activeId}
          />
          {showSelectedIcon ? (
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
              <span className={classNames("inline-flex items-center justify-center", selectedIconClassName)}>{selected.icon}</span>
            </span>
          ) : null}
          <div className="absolute inset-y-0 right-0 flex items-center gap-1 pr-2">
            {showSearchButton ? (
              <button
                type="button"
                className="flex items-center p-1.5 text-slate-400 hover:text-slate-500"
                onClick={() => {
                  if (disabled) return;
                  setOpen(true);
                }}
                aria-label={indT("Common_Search", "Search")}
                disabled={disabled}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </button>
            ) : null}
            <button
              type="button"
              className="flex items-center p-1.5 text-slate-500 hover:text-slate-600"
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
        </div>
        {usePortal ? (
          <FloatingList
            anchorRef={boxRef}
            open={listOpen}
            zIndex={360000}
            fixedWidthPx={resolvedDropdownWidthPx ?? undefined}
            panelStyle={panelStyle}
            maxHeightClass={dropdownMaxHeightClass}
            role="listbox"
            roundedClass="rounded-xl"
            portalClassName={portalClassName}
            panelClassName={panelClassName}
          >
            {listBody}
          </FloatingList>
        ) : (
          listOpen && (
            <div
              className={`absolute z-360000 mt-1 w-full rounded-xl bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden ${dropdownMaxHeightClass} overflow-auto ${panelClassName || ""}`}
              style={{ ...inlineDropdownStyle, ...(panelStyle || {}) }}
            >
              {listBody}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default SelectCombobox;
