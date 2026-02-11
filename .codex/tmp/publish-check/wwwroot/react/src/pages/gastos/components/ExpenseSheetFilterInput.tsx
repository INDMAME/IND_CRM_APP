import React, { useEffect, useMemo, useRef, useState } from "react";
import FloatingList from "../../../components/commons/FloatingList.tsx";
import { ChevronDownSvg, ChevronUpSvg } from "../../../components/commons/chevrons.tsx";
import { handleComboboxKeyDown } from "../../../hooks/useComboboxKeyboard.ts";
import { useOutsideClick } from "../../../hooks/useOutsideClick.ts";
import { ApiFetchError, fetchJson } from "../../../services/apiService.ts";
import { classNames } from "../../../utils/classNames.ts";
import { indT } from "../../../utils/indI18n.ts";
import type { ExpenseSheetListRequest, ExpenseSheetListResponse } from "../expenseTypes.ts";

type ExpenseSheetOption = {
  hojaGastosId: string;
  description: string;
};

type ExpenseSheetFilterInputProps = {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  enableRemoteSuggestions?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
};

const MIN_SEARCH_LEN = 2;
const SEARCH_PAGE_SIZE = 15;

const uniqueBySheetId = (items: ExpenseSheetOption[]): ExpenseSheetOption[] => {
  const map = new Map<string, ExpenseSheetOption>();
  for (const item of items) {
    const id = String(item.hojaGastosId || "").trim();
    if (!id) continue;
    if (!map.has(id)) {
      map.set(id, {
        hojaGastosId: id,
        description: String(item.description || "").trim(),
      });
    }
  }
  return Array.from(map.values());
};

// Shared expense sheet filter input with upstream list suggestions.
const ExpenseSheetFilterInput = ({
  label,
  placeholder,
  value,
  onChange,
  enableRemoteSuggestions = true,
  disabled = false,
  readOnly = false,
}: ExpenseSheetFilterInputProps) => {
  const readOnlyMode = readOnly || disabled;
  const remoteSuggestionsEnabled = enableRemoteSuggestions && !readOnlyMode;
  const valueColor = readOnlyMode ? "#64748b" : "#00296be0";

  const [query, setQuery] = useState(value);
  const [options, setOptions] = useState<ExpenseSheetOption[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const abortRef = useRef<AbortController | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  useOutsideClick([containerRef, listRef], () => setOpen(false));

  useEffect(() => {
    setQuery(value || "");
  }, [value]);

  useEffect(() => {
    return () => {
      abortRef.current?.abort();
      abortRef.current = null;
    };
  }, []);

  useEffect(() => {
    setActiveIndex(0);
  }, [options.length, query]);

  useEffect(() => {
    if (!remoteSuggestionsEnabled) {
      setOptions([]);
      setOpen(false);
      setLoading(false);
      abortRef.current?.abort();
      abortRef.current = null;
      return;
    }

    const term = query.trim();
    if (term.length < MIN_SEARCH_LEN) {
      setOptions([]);
      setOpen(false);
      setLoading(false);
      abortRef.current?.abort();
      abortRef.current = null;
      return;
    }

    const timeoutId = window.setTimeout(async () => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;
      setLoading(true);

      const payload: ExpenseSheetListRequest = {
        filter: term,
        fromDate: "",
        toDate: "",
        projectId: "",
        hojaGastosId: term,
        currencyCode: "",
        page: 1,
        pageSize: SEARCH_PAGE_SIZE,
      };

      try {
        const response = await fetchJson<ExpenseSheetListResponse>("/Gastos/ListExpenseSheets", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          suppressPermissionModal: true,
          signal: controller.signal,
        });

        const mapped = (Array.isArray(response?.items) ? response.items : []).map((item) => ({
          hojaGastosId: String(item?.hojaGastosId || "").trim(),
          description: String(item?.description || "").trim(),
        }));
        const next = uniqueBySheetId(mapped);
        setOptions(next);
        setOpen(next.length > 0);
      } catch (error) {
        if (error instanceof ApiFetchError && error.status === 403) {
          setOpen(false);
        }
        setOptions([]);
      } finally {
        if (abortRef.current === controller) {
          abortRef.current = null;
        }
        setLoading(false);
      }
    }, 250);

    return () => window.clearTimeout(timeoutId);
  }, [query, remoteSuggestionsEnabled]);

  const filtered = useMemo(() => {
    if (!query.trim()) return options;
    const q = query.trim().toLowerCase();
    return options.filter((option) => {
      const id = option.hojaGastosId.toLowerCase();
      const description = option.description.toLowerCase();
      return id.includes(q) || description.includes(q);
    });
  }, [options, query]);

  const selectOption = (option: ExpenseSheetOption) => {
    const nextValue = option.hojaGastosId;
    setQuery(nextValue);
    onChange(nextValue);
    setOpen(false);
  };

  const listId = "expense-sheet-filter-options";
  const activeId = open && filtered[activeIndex]
    ? `expense-sheet-filter-opt-${filtered[activeIndex].hojaGastosId}`
    : undefined;

  return (
    <div className="space-y-2" ref={containerRef}>
      <label className="form-label font-semibold" style={{ color: "#00296be0" }}>
        {label}
      </label>
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
              const nextValue = event.target.value;
              setQuery(nextValue);
              onChange(nextValue);
              if (!remoteSuggestionsEnabled || nextValue.trim().length < MIN_SEARCH_LEN) {
                setOpen(false);
              }
            }}
            onFocus={() => {
              if (remoteSuggestionsEnabled && filtered.length > 0) {
                setOpen(true);
              }
            }}
            onKeyDown={
              remoteSuggestionsEnabled
                ? (event) =>
                    handleComboboxKeyDown(event, {
                      isOpen: open,
                      setOpen,
                      optionCount: filtered.length,
                      setActiveIndex,
                      onEnterWhenOpen: () => selectOption(filtered[activeIndex] ?? filtered[0]),
                      onEnterWhenClosed: () => setOpen(filtered.length > 0),
                      openOnArrow: true,
                    })
                : undefined
            }
            placeholder={placeholder}
            readOnly={readOnly}
            disabled={disabled}
            role={remoteSuggestionsEnabled ? "combobox" : undefined}
            aria-expanded={remoteSuggestionsEnabled ? open : undefined}
            aria-controls={remoteSuggestionsEnabled ? listId : undefined}
            aria-activedescendant={remoteSuggestionsEnabled ? activeId : undefined}
          />
          {remoteSuggestionsEnabled ? (
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-2 text-slate-500 hover:text-slate-600"
              onClick={() => {
                if (disabled) return;
                setOpen((prev) => !prev && filtered.length > 0);
              }}
              aria-label={open ? indT("Dropdown_HideOptions", "Hide options") : indT("Dropdown_ShowOptions", "Show options")}
              disabled={disabled}
            >
              {open ? <ChevronUpSvg className="h-5 w-5" /> : <ChevronDownSvg className="h-5 w-5" />}
            </button>
          ) : null}
        </div>
        {remoteSuggestionsEnabled ? (
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
              {loading ? (
                <div className="px-4 py-2 text-sm text-slate-500">{indT("Common_Loading", "Loading")}</div>
              ) : filtered.length === 0 ? (
                <div className="px-4 py-2 text-sm text-slate-500">{indT("Common_NoData", "No data")}</div>
              ) : (
                filtered.map((option, index) => {
                  const isActive = index === activeIndex;
                  const optionId = option.hojaGastosId || `${index}`;
                  return (
                    <button
                      type="button"
                      key={optionId}
                      id={`expense-sheet-filter-opt-${optionId}`}
                      role="option"
                      aria-selected={isActive}
                      className={classNames(
                        "relative flex w-full cursor-default select-none items-start py-2 px-3 text-left text-sm",
                        isActive ? "bg-primary text-white" : "text-slate-900"
                      )}
                      onMouseEnter={() => setActiveIndex(index)}
                      onClick={() => selectOption(option)}
                    >
                      <span className="flex flex-col">
                        <span className="font-medium">{option.hojaGastosId}</span>
                        <span className={classNames("text-xs", isActive ? "text-white/90" : "text-slate-500")}>
                          {option.description || "-"}
                        </span>
                      </span>
                    </button>
                  );
                })
              )}
            </div>
          </FloatingList>
        ) : null}
      </div>
    </div>
  );
};

export default ExpenseSheetFilterInput;
