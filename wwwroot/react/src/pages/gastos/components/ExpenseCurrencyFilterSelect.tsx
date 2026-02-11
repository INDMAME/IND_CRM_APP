import React, { useEffect, useMemo, useRef, useState } from "react";
import FloatingList from "../../../components/commons/FloatingList.tsx";
import { ChevronDownSvg, ChevronUpSvg } from "../../../components/commons/chevrons.tsx";
import { handleComboboxKeyDown } from "../../../hooks/useComboboxKeyboard.ts";
import { useOutsideClick } from "../../../hooks/useOutsideClick.ts";
import { classNames } from "../../../utils/classNames.ts";
import { indT } from "../../../utils/indI18n.ts";
import { expenseCurrencyOptions } from "../constants/currencyCodes.ts";

type ExpenseCurrencyFilterSelectProps = {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
  disabled?: boolean;
  showLabel?: boolean;
};

// Shared fixed currency combobox with local instant search for expense filters.
const ExpenseCurrencyFilterSelect = ({
  label,
  placeholder,
  value,
  onChange,
  readOnly = false,
  disabled = false,
  showLabel = true,
}: ExpenseCurrencyFilterSelectProps) => {
  const readOnlyMode = readOnly || disabled;
  const valueColor = readOnlyMode ? "#64748b" : "#00296be0";
  const [query, setQuery] = useState(value || "");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  useOutsideClick([containerRef, listRef], () => setOpen(false));

  useEffect(() => {
    setQuery(value || "");
  }, [value]);

  const filtered = useMemo(() => {
    const term = query.trim().toUpperCase();
    if (!term) return expenseCurrencyOptions;
    return expenseCurrencyOptions.filter((option) => option.value.includes(term));
  }, [query]);

  useEffect(() => {
    setActiveIndex(0);
  }, [filtered.length, query]);

  const selectOption = (currencyCode: string) => {
    const nextValue = String(currencyCode || "").trim().toUpperCase();
    setQuery(nextValue);
    onChange(nextValue);
    setOpen(false);
  };

  const listId = "expense-currency-filter-options";
  const activeId = open && filtered[activeIndex]
    ? `expense-currency-filter-opt-${filtered[activeIndex].value}`
    : undefined;

  return (
    <div className="space-y-2" ref={containerRef}>
      {showLabel ? (
        <label className="form-label font-semibold" style={{ color: "#00296be0" }}>
          {label}
        </label>
      ) : null}
      <div className="relative">
        <div
          ref={boxRef}
          className={classNames(
            "relative w-full rounded-xl bg-white text-left focus-within:border-primary focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-white sm:text-sm",
            readOnlyMode ? "ind-readonly-field" : ""
          )}
        >
          <input
            className={classNames(
              "w-full rounded-xl border px-3 py-2 pr-10 text-sm sm:text-base leading-5 focus:outline-hidden focus:ring-2 disabled:bg-slate-100 disabled:text-slate-500 disabled:border-slate-200 disabled:cursor-not-allowed",
              "border-slate-200 focus:ring-primary focus:border-primary",
              readOnlyMode ? "ind-readonly-field" : "text-slate-900"
            )}
            style={{ color: valueColor }}
            value={query}
            onChange={(event) => {
              const nextValue = event.target.value.toUpperCase();
              setQuery(nextValue);

              const trimmed = nextValue.trim();
              if (!trimmed) {
                onChange("");
                setOpen(false);
                return;
              }

              const exact = expenseCurrencyOptions.find((option) => option.value === trimmed);
              if (exact) {
                onChange(exact.value);
              } else {
                onChange(trimmed);
              }
              setOpen(true);
            }}
            onFocus={() => {
              if (!readOnlyMode) {
                setOpen(true);
              }
            }}
            onKeyDown={(event) =>
              handleComboboxKeyDown(event, {
                isOpen: open,
                setOpen,
                optionCount: filtered.length,
                setActiveIndex,
                onEnterWhenOpen: () => selectOption(filtered[activeIndex]?.value || filtered[0]?.value || ""),
                onEnterWhenClosed: () => setOpen(filtered.length > 0),
                openOnArrow: true,
              })
            }
            placeholder={placeholder}
            readOnly={readOnly}
            disabled={disabled}
            aria-label={label}
            role="combobox"
            aria-expanded={open}
            aria-controls={listId}
            aria-activedescendant={activeId}
          />
          <div className="absolute inset-y-0 right-0 flex items-center gap-1 pr-2">
            <button
              type="button"
              className="flex items-center p-1.5 text-slate-500 hover:text-slate-600"
              onClick={() => {
                if (readOnlyMode) return;
                setOpen((previous) => !previous);
              }}
              aria-label={open ? indT("Dropdown_HideOptions", "Hide options") : indT("Dropdown_ShowOptions", "Show options")}
              disabled={readOnlyMode}
            >
              {open ? <ChevronUpSvg className="h-5 w-5" /> : <ChevronDownSvg className="h-5 w-5" />}
            </button>
          </div>
        </div>
        <FloatingList
          anchorRef={boxRef}
          open={open}
          zIndex={360000}
          maxHeightClass="max-h-72"
          role="listbox"
          roundedClass="rounded-xl"
          panelClassName="visitas-typography"
        >
          <div id={listId} ref={listRef}>
            {filtered.length === 0 ? (
              <div className="px-4 py-2 text-sm text-slate-500">{indT("Common_NoData", "No data")}</div>
            ) : (
              filtered.map((option, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    type="button"
                    key={option.value}
                    id={`expense-currency-filter-opt-${option.value}`}
                    role="option"
                    aria-selected={isActive}
                    className={classNames(
                      "relative flex w-full cursor-default select-none items-center py-2 px-3 text-left text-sm",
                      isActive ? "bg-primary text-white" : "text-slate-900"
                    )}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => selectOption(option.value)}
                  >
                    <span className="font-medium">{option.text}</span>
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

export default ExpenseCurrencyFilterSelect;

