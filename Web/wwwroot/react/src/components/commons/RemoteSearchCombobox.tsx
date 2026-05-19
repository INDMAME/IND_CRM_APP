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

type RemoteSearchOpenSearchMode = "current-value" | "empty-query";

type ExecuteSearchOptions = {
  clearValueOnNoResults?: boolean;
};

type RemoteSearchComboboxProps = {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onSearch: (term: string, signal: AbortSignal) => Promise<RemoteSearchOption[]>;
  onSearchPage?: (
    term: string,
    page: number,
    pageSize: number,
    signal: AbortSignal
  ) => Promise<{ items: RemoteSearchOption[]; total?: number }>;
  idBase: string;
  minSearchLength?: number;
  pageSize?: number;
  allowEmptySearch?: boolean;
  loadOnOpen?: boolean;
  openSearchMode?: RemoteSearchOpenSearchMode;
  infiniteScroll?: boolean;
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

// Generic remote-search combobox that supports manual search and optional paged loading on open.
const RemoteSearchCombobox = ({
  label,
  placeholder,
  value,
  onChange,
  onSearch,
  onSearchPage,
  idBase,
  minSearchLength = 2,
  pageSize = 20,
  allowEmptySearch = false,
  loadOnOpen = false,
  openSearchMode = "current-value",
  infiniteScroll = false,
  disabled = false,
  readOnly = false,
  showLabel = true,
  panelClassName = "visitas-typography",
}: RemoteSearchComboboxProps) => {
  const readOnlyMode = readOnly || disabled;
  const valueColor = readOnlyMode ? "#64748b" : "#00296be0";
  const [options, setOptions] = useState<RemoteSearchOption[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lastSearchedTerm, setLastSearchedTerm] = useState("");
  const [showNotFoundState, setShowNotFoundState] = useState(false);

  const abortRef = useRef<AbortController | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const currentPageRef = useRef(0);
  const hasMoreRef = useRef(false);
  const loadedSearchTermRef = useRef("");
  const loadingRef = useRef(false);
  const runLoadMoreRef = useRef<(() => Promise<void>) | null>(null);

  useOutsideClick([containerRef, listRef], () => {
    setShowNotFoundState(false);
    setOpen(false);
  });

  useEffect(() => {
    return () => {
      abortRef.current?.abort();
      abortRef.current = null;
    };
  }, []);

  useEffect(() => {
    loadingRef.current = loading;
  }, [loading]);

  const query = value || "";
  const loadedSearchTermKey = loadedSearchTermRef.current.trim().toLowerCase();
  const hasLoadedOpenSearchOptions =
    openSearchMode === "empty-query" && loadedSearchTermKey === "" && options.length > 0;
  const shouldShowLoadedOpenOptions = open && hasLoadedOpenSearchOptions;

  const filtered = useMemo(() => {
    if (shouldShowLoadedOpenOptions) return options;
    if (!query.trim()) return options;
    const q = query.trim().toLowerCase();
    return options.filter((option) => {
      const valueText = option.value.toLowerCase();
      const titleText = String(option.title || "").toLowerCase();
      const subtitleText = String(option.subtitle || "").toLowerCase();
      return valueText.includes(q) || titleText.includes(q) || subtitleText.includes(q);
    });
  }, [options, query, shouldShowLoadedOpenOptions]);
  const resolvedActiveIndex =
    filtered.length > 0 ? Math.min(Math.max(activeIndex, 0), filtered.length - 1) : 0;

  const canSearchTerm = useCallback(
    (term: string): boolean => {
      const trimmed = term.trim();
      if (!trimmed) return allowEmptySearch;
      return trimmed.length >= minSearchLength;
    },
    [allowEmptySearch, minSearchLength]
  );

  const executeSearch = useCallback(
    async (term: string, page: number, append: boolean, searchOptions: ExecuteSearchOptions = {}) => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;
      setLoading(true);
      if (!append) {
        setActiveIndex(0);
      }

      const normalizedTerm = term.trim();
      const termKey = normalizedTerm.toLowerCase();
      const clearValueOnNoResults = searchOptions.clearValueOnNoResults ?? true;
      try {
        if (onSearchPage) {
          const response = await onSearchPage(normalizedTerm, page, pageSize, controller.signal);
          const pageItems = uniqueByValue(Array.isArray(response?.items) ? response.items : []);
          if (!append && pageItems.length === 0) {
            setOptions([]);
            currentPageRef.current = 0;
            hasMoreRef.current = false;
            setLastSearchedTerm(termKey);
            loadedSearchTermRef.current = normalizedTerm;
            setShowNotFoundState(true);
            if (clearValueOnNoResults) {
              onChange("");
            }
            setOpen(true);
            return;
          }

          setOptions((previous) => (append ? uniqueByValue([...(previous || []), ...pageItems]) : pageItems));
          currentPageRef.current = page;
          setShowNotFoundState(false);

          const apiTotal = Number(response?.total);
          if (Number.isFinite(apiTotal) && apiTotal > 0) {
            hasMoreRef.current = page * pageSize < apiTotal;
          } else {
            hasMoreRef.current = pageItems.length >= pageSize;
          }
        } else {
          const response = await onSearch(normalizedTerm, controller.signal);
          const next = uniqueByValue(response || []);
          if (!append && next.length === 0) {
            setOptions([]);
            currentPageRef.current = 0;
            hasMoreRef.current = false;
            setLastSearchedTerm(termKey);
            loadedSearchTermRef.current = normalizedTerm;
            setShowNotFoundState(true);
            if (clearValueOnNoResults) {
              onChange("");
            }
            setOpen(true);
            return;
          }

          setOptions(next);
          currentPageRef.current = 1;
          hasMoreRef.current = false;
          setShowNotFoundState(false);
        }

        setLastSearchedTerm(termKey);
        loadedSearchTermRef.current = normalizedTerm;
        setOpen(true);
      } catch {
        if (!append) {
          setOptions([]);
          currentPageRef.current = 0;
          hasMoreRef.current = false;
        }
        setLastSearchedTerm(termKey);
        loadedSearchTermRef.current = normalizedTerm;
        setShowNotFoundState(false);
        setOpen(true);
      } finally {
        if (abortRef.current === controller) {
          abortRef.current = null;
        }
        setLoading(false);
      }
    },
    [onChange, onSearch, onSearchPage, pageSize]
  );

  const runSearch = useCallback(async () => {
    if (readOnlyMode || loading) return;
    const term = query.trim();
    const termKey = term.toLowerCase();

    if (!canSearchTerm(term)) {
      setOptions([]);
      currentPageRef.current = 0;
      hasMoreRef.current = false;
      setShowNotFoundState(false);
      setOpen(false);
      setLastSearchedTerm("");
      loadedSearchTermRef.current = "";
      return;
    }

    if (termKey === lastSearchedTerm && options.length > 0 && !onSearchPage) {
      setOpen(true);
      return;
    }

    await executeSearch(term, 1, false);
  }, [canSearchTerm, executeSearch, lastSearchedTerm, loading, onSearchPage, options.length, query, readOnlyMode]);

  const runOpenSearch = useCallback(async () => {
    if (readOnlyMode || loading || !loadOnOpen) return;

    const term = openSearchMode === "empty-query" ? "" : query.trim();
    if (!canSearchTerm(term)) {
      return;
    }

    await executeSearch(term, 1, false, {
      clearValueOnNoResults: openSearchMode !== "empty-query",
    });
  }, [canSearchTerm, executeSearch, loadOnOpen, loading, openSearchMode, query, readOnlyMode]);

  const runLoadMore = useCallback(async () => {
    if (readOnlyMode || loading || !onSearchPage || !infiniteScroll || !hasMoreRef.current) {
      return;
    }

    const term = openSearchMode === "empty-query" ? loadedSearchTermRef.current.trim() : query.trim();
    const termKey = term.toLowerCase();
    if (openSearchMode !== "empty-query" && termKey !== lastSearchedTerm) {
      return;
    }

    if (!canSearchTerm(term)) {
      return;
    }

    const nextPage = currentPageRef.current + 1;
    if (nextPage <= 1) {
      return;
    }

    await executeSearch(term, nextPage, true, { clearValueOnNoResults: false });
  }, [
    canSearchTerm,
    executeSearch,
    infiniteScroll,
    lastSearchedTerm,
    loading,
    onSearchPage,
    openSearchMode,
    query,
    readOnlyMode,
  ]);

  useEffect(() => {
    runLoadMoreRef.current = runLoadMore;
  }, [runLoadMore]);

  useEffect(() => {
    if (!open || !onSearchPage || !infiniteScroll) return;
    const scroller = listRef.current?.parentElement;
    if (!scroller) return;

    const onScroll = () => {
      if (loadingRef.current || !hasMoreRef.current) return;
      const threshold = 40;
      const isNearBottom = scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - threshold;
      if (isNearBottom) {
        void runLoadMoreRef.current?.();
      }
    };

    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      scroller.removeEventListener("scroll", onScroll);
    };
  }, [infiniteScroll, onSearchPage, open]);

  const selectOption = (option: RemoteSearchOption) => {
    const nextValue = String(option.value || "").trim();
    setShowNotFoundState(false);
    onChange(nextValue);
    setLastSearchedTerm(nextValue.toLowerCase());
    setOpen(false);
  };

  const queryKey = query.trim().toLowerCase();
  const showSearchIcon =
    !readOnlyMode &&
    !loading &&
    canSearchTerm(query) &&
    queryKey !== lastSearchedTerm;

  const listId = `${idBase}-options`;
  const activeId =
    open && filtered[resolvedActiveIndex] ? `${idBase}-opt-${filtered[resolvedActiveIndex].value}` : undefined;
  const showLoadingOnlyState = loading && filtered.length === 0;

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
            "relative w-full rounded-[var(--radius-xl)] bg-white text-left focus-within:border-primary focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-white sm:text-sm",
            readOnlyMode ? "ind-readonly-field" : ""
          )}
        >
          <input
            className={classNames(
              "w-full rounded-[var(--radius-xl)] border px-3 py-2 pr-20 text-sm sm:text-base leading-5 focus:outline-hidden focus:ring-2 disabled:bg-slate-100 disabled:text-slate-500 disabled:border-slate-200 disabled:cursor-not-allowed",
              "border-slate-200 focus:ring-primary focus:border-primary",
              readOnlyMode ? "ind-readonly-field" : "text-slate-900"
            )}
            style={{ color: valueColor }}
            value={query}
            onChange={(event) => {
              const nextValue = event.target.value;
              setActiveIndex(0);
              setShowNotFoundState(false);
              onChange(nextValue);
              if (nextValue.trim().toLowerCase() !== lastSearchedTerm) {
                setOpen(false);
              }
            }}
            onFocus={() => {
              if (!readOnlyMode && (filtered.length > 0 || hasLoadedOpenSearchOptions || showNotFoundState)) {
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
                    selectOption(filtered[resolvedActiveIndex] ?? filtered[0]);
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
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
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

                if (openSearchMode === "empty-query" && loadOnOpen) {
                  if (hasLoadedOpenSearchOptions || (loadedSearchTermKey === "" && showNotFoundState)) {
                    setOpen(true);
                    return;
                  }

                  void runOpenSearch();
                  return;
                }

                if (filtered.length > 0) {
                  setOpen(true);
                  return;
                }

                if (!query.trim() && loadOnOpen) {
                  void runOpenSearch();
                }
              }}
              aria-label={open ? indT("Dropdown_HideOptions", "Hide options") : indT("Dropdown_ShowOptions", "Show options")}
              disabled={readOnlyMode}
            >
              {open ? <ChevronUpSvg className="size-5" /> : <ChevronDownSvg className="size-5" />}
            </button>
          </div>
        </div>
        <FloatingList
          anchorRef={boxRef}
          open={open}
          zIndex={360000}
          maxHeightClass="max-h-72"
          role="listbox"
          roundedClass="rounded-[var(--radius-xl)]"
          panelClassName={panelClassName}
        >
          <div id={listId} ref={listRef}>
            {showLoadingOnlyState ? (
              <div className="px-4 py-2 text-sm text-slate-500">{indT("Common_Loading", "Loading")}</div>
            ) : showNotFoundState ? (
              <div className="px-4 py-2 text-sm text-slate-500">{indT("Common_NotFound", "Not found")}</div>
            ) : filtered.length === 0 ? (
              <div className="px-4 py-2 text-sm text-slate-500">{indT("Common_NoData", "No data")}</div>
            ) : (
              <>
                {filtered.map((option, index) => {
                  const isActive = index === resolvedActiveIndex;
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
                })}
                {loading ? (
                  <div className="px-4 py-2 text-xs text-slate-500 border-t border-slate-100">{indT("Common_Loading", "Loading")}</div>
                ) : null}
              </>
            )}
          </div>
        </FloatingList>
      </div>
    </div>
  );
};

export default RemoteSearchCombobox;
