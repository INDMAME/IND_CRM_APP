import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import FloatingList from "./FloatingList.tsx";
import Spinner from "./Spinner.tsx";
import { ChevronDownSvg, ChevronUpSvg } from "./chevrons.tsx";
import { handleComboboxKeyDown } from "../../hooks/useComboboxKeyboard.ts";
import { useOutsideClick } from "../../hooks/useOutsideClick.ts";
import { classNames } from "../../utils/classNames.ts";
import { indT } from "../../utils/indI18n.ts";

export type RemoteSearchOption = {
  value: string;
  title?: string;
  subtitle?: string;
};

type RemoteSearchComboboxProps = {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onSearch: (term: string, signal: AbortSignal) => Promise<RemoteSearchOption[]>;
  idBase: string;
  minSearchLength?: number;
  disabled?: boolean;
  readOnly?: boolean;
  showLabel?: boolean;
  panelClassName?: string;
};

const uniqueByValue = (items: RemoteSearchOption[]): RemoteSearchOption[] => {
  const map = new Map<string, RemoteSearchOption>();
  for (const item of items || []) {
    const key = String(item.value || "").trim();
    if (!key) continue;
    if (map.has(key)) continue;
    map.set(key, {
      value: key,
      title: String(item.title || "").trim(),
      subtitle: String(item.subtitle || "").trim(),
    });
  }
  return Array.from(map.values());
};

// Generic remote-search combobox that fetches options only on Enter or search icon.
const RemoteSearchCombobox = ({
  label,
  placeholder,
  value,
  onChange,
  onSearch,
  idBase,
  minSearchLength = 2,
  disabled = false,
  readOnly = false,
  showLabel = true,
  panelClassName = "visitas-typography",
}: RemoteSearchComboboxProps) => {
  const readOnlyMode = readOnly || disabled;
  const valueColor = readOnlyMode ? "#64748b" : "#00296be0";
  const [query, setQuery] = useState(value || "");
  const [options, setOptions] = useState<RemoteSearchOption[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lastSearchedTerm, setLastSearchedTerm] = useState("");

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

  const filtered = useMemo(() => {
    if (!query.trim()) return options;
    const q = query.trim().toLowerCase();
    return options.filter((option) => {
      const valueText = option.value.toLowerCase();
      const titleText = String(option.title || "").toLowerCase();
      const subtitleText = String(option.subtitle || "").toLowerCase();
      return valueText.includes(q) || titleText.includes(q) || subtitleText.includes(q);
    });
  }, [options, query]);

  useEffect(() => {
    setActiveIndex(0);
  }, [filtered.length, query]);

  const runSearch = useCallback(async () => {
    if (readOnlyMode || loading) return;
    const term = query.trim();
    const termKey = term.toLowerCase();

    if (term.length < minSearchLength) {
      setOptions([]);
      setOpen(false);
      setLastSearchedTerm("");
      return;
    }

    if (termKey === lastSearchedTerm && options.length > 0) {
      setOpen(true);
      return;
    }

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setLoading(true);

    try {
      const response = await onSearch(term, controller.signal);
      const next = uniqueByValue(response || []);
      setOptions(next);
      setLastSearchedTerm(termKey);
      setOpen(true);
    } catch {
      setOptions([]);
      setLastSearchedTerm(termKey);
      setOpen(true);
    } finally {
      if (abortRef.current === controller) {
        abortRef.current = null;
      }
      setLoading(false);
    }
  }, [lastSearchedTerm, loading, minSearchLength, onSearch, options.length, query, readOnlyMode]);

  const selectOption = (option: RemoteSearchOption) => {
    const nextValue = String(option.value || "").trim();
    setQuery(nextValue);
    onChange(nextValue);
    setLastSearchedTerm(nextValue.toLowerCase());
    setOpen(false);
  };

  const queryKey = query.trim().toLowerCase();
  const showSearchIcon =
    !readOnlyMode &&
    !loading &&
    queryKey.length >= minSearchLength &&
    queryKey !== lastSearchedTerm;

  const listId = `${idBase}-options`;
  const activeId = open && filtered[activeIndex] ? `${idBase}-opt-${filtered[activeIndex].value}` : undefined;

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
              "w-full rounded-xl border px-3 py-2 pr-20 text-sm sm:text-base leading-5 focus:outline-hidden focus:ring-2 disabled:bg-slate-100 disabled:text-slate-500 disabled:border-slate-200 disabled:cursor-not-allowed",
              "border-slate-200 focus:ring-primary focus:border-primary",
              readOnlyMode ? "ind-readonly-field" : "text-slate-900"
            )}
            style={{ color: valueColor }}
            value={query}
            onChange={(event) => {
              const nextValue = event.target.value;
              setQuery(nextValue);
              onChange(nextValue);
              if (nextValue.trim().toLowerCase() !== lastSearchedTerm) {
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
                onEnterWhenOpen: () => {
                  if (filtered.length > 0) {
                    selectOption(filtered[activeIndex] ?? filtered[0]);
                    return;
                  }
                  void runSearch();
                },
                onEnterWhenClosed: () => {
                  void runSearch();
                },
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
            {loading ? (
              <span className="flex items-center px-1.5" aria-hidden="true">
                <Spinner size="h-4 w-4" />
              </span>
            ) : null}

            {showSearchIcon ? (
              <button
                type="button"
                className="flex items-center p-1.5 text-slate-400 hover:text-slate-500"
                onClick={() => {
                  void runSearch();
                }}
                aria-label={indT("Common_Search", "Search")}
                disabled={readOnlyMode}
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
                if (readOnlyMode) return;
                if (open) {
                  setOpen(false);
                  return;
                }
                if (filtered.length > 0) {
                  setOpen(true);
                }
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
          panelClassName={panelClassName}
        >
          <div id={listId} ref={listRef}>
            {loading ? (
              <div className="px-4 py-2 text-sm text-slate-500">{indT("Common_Loading", "Loading")}</div>
            ) : filtered.length === 0 ? (
              <div className="px-4 py-2 text-sm text-slate-500">{indT("Common_NoData", "No data")}</div>
            ) : (
              filtered.map((option, index) => {
                const isActive = index === activeIndex;
                const optionId = option.value || `${index}`;
                return (
                  <button
                    type="button"
                    key={optionId}
                    id={`${idBase}-opt-${optionId}`}
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
                      <span className="font-medium">{option.title || option.value}</span>
                      {option.subtitle ? (
                        <span className={classNames("text-xs", isActive ? "text-white/90" : "text-slate-500")}>{option.subtitle}</span>
                      ) : null}
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

export default RemoteSearchCombobox;
