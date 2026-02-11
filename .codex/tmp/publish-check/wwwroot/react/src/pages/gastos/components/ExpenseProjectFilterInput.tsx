import React, { useEffect, useMemo, useRef, useState } from "react";
import FloatingList from "../../../components/commons/FloatingList.tsx";
import { ChevronDownSvg, ChevronUpSvg } from "../../../components/commons/chevrons.tsx";
import { handleComboboxKeyDown } from "../../../hooks/useComboboxKeyboard.ts";
import { useOutsideClick } from "../../../hooks/useOutsideClick.ts";
import { fetchJson } from "../../../services/apiService.ts";
import { classNames } from "../../../utils/classNames.ts";
import { indT } from "../../../utils/indI18n.ts";

type ExpenseProjectFilterInputProps = {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
  disabled?: boolean;
};

type ProjectOption = {
  projId: string;
  text: string;
};

type ProjectDropdownResponse = {
  items?: Array<{ value?: string; text?: string }>;
};

const MIN_SEARCH_LEN = 2;
const SEARCH_PAGE_SIZE = 20;

const uniqueByProjectId = (items: ProjectOption[]): ProjectOption[] => {
  const map = new Map<string, ProjectOption>();
  for (const item of items) {
    const id = String(item.projId || "").trim();
    if (!id) continue;
    if (!map.has(id)) {
      map.set(id, {
        projId: id,
        text: String(item.text || "").trim(),
      });
    }
  }
  return Array.from(map.values());
};

// Shared project filter input with remote project suggestions.
const ExpenseProjectFilterInput = ({
  label,
  placeholder,
  value,
  onChange,
  readOnly = false,
  disabled = false,
}: ExpenseProjectFilterInputProps) => {
  const readOnlyMode = readOnly || disabled;
  const valueColor = readOnlyMode ? "#64748b" : "#00296be0";
  const [query, setQuery] = useState(value || "");
  const [options, setOptions] = useState<ProjectOption[]>([]);
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
    if (disabled || readOnly) return;

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

      try {
        const url = `/Gastos/GetProjectsForDropdown?term=${encodeURIComponent(term)}&page=1&pageSize=${SEARCH_PAGE_SIZE}`;
        const response = await fetchJson<ProjectDropdownResponse>(url, {
          signal: controller.signal,
          suppressPermissionModal: true,
        });

        const mapped = (Array.isArray(response?.items) ? response.items : []).map((item) => ({
          projId: String(item?.value || "").trim(),
          text: String(item?.text || "").trim(),
        }));
        const next = uniqueByProjectId(mapped);
        setOptions(next);
        setOpen(next.length > 0);
      } catch {
        setOptions([]);
        setOpen(false);
      } finally {
        if (abortRef.current === controller) {
          abortRef.current = null;
        }
        setLoading(false);
      }
    }, 250);

    return () => window.clearTimeout(timeoutId);
  }, [disabled, query, readOnly]);

  const filtered = useMemo(() => {
    if (!query.trim()) return options;
    const q = query.trim().toLowerCase();
    return options.filter((option) => {
      const id = option.projId.toLowerCase();
      const text = option.text.toLowerCase();
      return id.includes(q) || text.includes(q);
    });
  }, [options, query]);

  const selectOption = (option: ProjectOption) => {
    const nextValue = option.projId;
    setQuery(nextValue);
    onChange(nextValue);
    setOpen(false);
  };

  const listId = "expense-project-filter-options";
  const activeId = open && filtered[activeIndex]
    ? `expense-project-filter-opt-${filtered[activeIndex].projId}`
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
              if (nextValue.trim().length < MIN_SEARCH_LEN) {
                setOpen(false);
              }
            }}
            onFocus={() => {
              if (!readOnlyMode && filtered.length > 0) {
                setOpen(true);
              }
            }}
            onKeyDown={(event) =>
              handleComboboxKeyDown(event, {
                isOpen: open,
                setOpen,
                optionCount: filtered.length,
                setActiveIndex,
                onEnterWhenOpen: () => selectOption(filtered[activeIndex] ?? filtered[0]),
                onEnterWhenClosed: () => setOpen(filtered.length > 0),
                openOnArrow: true,
              })
            }
            placeholder={placeholder}
            readOnly={readOnly}
            disabled={disabled}
            role="combobox"
            aria-expanded={open}
            aria-controls={listId}
            aria-activedescendant={activeId}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-2 text-slate-500 hover:text-slate-600"
            onClick={() => {
              if (readOnlyMode) return;
              setOpen((prev) => !prev && filtered.length > 0);
            }}
            aria-label={open ? indT("Dropdown_HideOptions", "Hide options") : indT("Dropdown_ShowOptions", "Show options")}
            disabled={readOnlyMode}
          >
            {open ? <ChevronUpSvg className="h-5 w-5" /> : <ChevronDownSvg className="h-5 w-5" />}
          </button>
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
            {loading ? (
              <div className="px-4 py-2 text-sm text-slate-500">{indT("Common_Loading", "Loading")}</div>
            ) : filtered.length === 0 ? (
              <div className="px-4 py-2 text-sm text-slate-500">{indT("Common_NoData", "No data")}</div>
            ) : (
              filtered.map((option, index) => {
                const isActive = index === activeIndex;
                const optionId = option.projId || `${index}`;
                return (
                  <button
                    type="button"
                    key={optionId}
                    id={`expense-project-filter-opt-${optionId}`}
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
                      <span className="font-medium">{option.projId}</span>
                      <span className={classNames("text-xs", isActive ? "text-white/90" : "text-slate-500")}>
                        {option.text || "-"}
                      </span>
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

export default ExpenseProjectFilterInput;
