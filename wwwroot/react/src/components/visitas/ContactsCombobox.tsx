import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import FloatingList from "../commons/FloatingList.tsx";
import Spinner from "../commons/Spinner.tsx";
import {
  SELECT_FIELD_ACTION_BUTTON_CLASS_NAME,
  SELECT_FIELD_ACTIONS_CLASS_NAME,
  SelectChevron,
} from "../commons/chevrons.tsx";
import { fetchJson } from "../../services/apiService.ts";
import { handleComboboxKeyDown } from "../../hooks/useComboboxKeyboard.ts";
import { useOutsideClick } from "../../hooks/useOutsideClick.ts";
import { classNames } from "../../utils/classNames.ts";
import { indFormat, indT } from "../../utils/indI18n.ts";
import { isNoDataRow, isNoDataText } from "../../utils/noData.ts";
import { getCachedContacts, setCachedContacts, getStoredSelection, setStoredSelection, clearStoredSelection } from "../../utils/visitasStorage.ts";

type ContactOption = {
  value: string;
  text: string;
  cargo: string;
  empresa: string;
};

type ContactsDropdownResponse = {
  items?: unknown[];
  Items?: unknown[];
};

type ContactsComboboxProps = {
  accountNum?: string;
  value?: ContactOption[];
  onChange: (value: ContactOption[]) => void;
  portalClassName?: string;
  panelClassName?: string;
};

// Multi-select contacts combobox tied to the selected client.
const ContactsCombobox = ({ accountNum, value = [], onChange, portalClassName, panelClassName }: ContactsComboboxProps) => {
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState<ContactOption[]>([]);
  const [selected, setSelected] = useState<ContactOption[]>(value);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [status, setStatus] = useState(indT("Visits_Create_SelectClientFirst", "Select a client first."));
  const [hasLoaded, setHasLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [blocking, setBlocking] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showNotFoundState, setShowNotFoundState] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const lastAccountRef = useRef(accountNum || "");
  const onChangeRef = useRef(onChange);
  const idBase = useId();
  const inputId = `${idBase}-contacts-input`;
  const listId = `${idBase}-contacts-options`;

  useOutsideClick([containerRef, listRef], () => {
    setOpen(false);
    setShowNotFoundState(false);
    if (query.trim()) {
      setQuery("");
    }
  });

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  const isSameSelection = (a: ContactOption[] = [], b: ContactOption[] = []) => {
    if (a.length !== b.length) return false;
    const as = a.map((x) => String(x.value)).sort();
    const bs = b.map((x) => String(x.value)).sort();
    return as.every((v, i) => v === bs[i]);
  };

  // Sync internal selection with the prop (draft/cache restore).
  useEffect(() => {
    if (!isSameSelection(value || [], selected)) {
      setSelected(value || []);
    }
  }, [value]);

  const cancelPending = () => {
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (abortRef.current) {
        abortRef.current.abort();
        abortRef.current = null;
      }
    };
  }, []);

  const primeFromCache = () => {
    const cached = getCachedContacts(accountNum) as ContactOption[] | null;
    if (cached) {
      setOptions(cached);
      setShowNotFoundState(false);
      setHasLoaded(true);
      setHasMore(cached.length === 10);
      setStatus(
        cached.length
          ? indFormat("Visits_Create_ContactCountCache", "{0} contacts (cache)", cached.length)
          : indT("Visits_Create_NoContacts", "No contacts")
      );
      return true;
    }
    return false;
  };

  useEffect(() => {
    cancelPending();
    setQuery("");
    setOpen(false);
    setLoading(false);
    setBlocking(false);
    setLoadingMore(false);
    setActiveIndex(0);
    setShowNotFoundState(false);
    setPage(1);
    setHasMore(true);

    if (!accountNum) {
      setOptions([]);
      setSelected([]);
      onChangeRef.current([]);
      setStatus(indT("Visits_Create_SelectClientFirst", "Select a client first."));
      setHasLoaded(false);
      clearStoredSelection(lastAccountRef.current);
      lastAccountRef.current = "";
      return;
    }

    const changed = lastAccountRef.current && lastAccountRef.current !== accountNum;
    if (changed) {
      setSelected([]);
      onChangeRef.current([]);
      clearStoredSelection(lastAccountRef.current);
    }

    const usedCache = primeFromCache();
    if (!usedCache) {
      setOptions([]);
      setHasLoaded(false);
      setStatus(indT("Visits_Create_PressArrowToLoadContacts", "Press ArrowDown to load contacts."));
    }

    const storedSelection = getStoredSelection(accountNum) as ContactOption[];
    if (storedSelection.length && !value?.length) {
      setSelected(storedSelection);
      onChangeRef.current(storedSelection);
    }

    lastAccountRef.current = accountNum;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountNum]);

  useEffect(() => {
    onChangeRef.current(selected);
    if (accountNum) setStoredSelection(accountNum, selected);
  }, [selected, accountNum]);

  const toText = (value: unknown): string => {
    if (value === null || value === undefined) return "";
    return String(value).trim();
  };

  const asObjectRecord = (value: unknown): Record<string, unknown> | null => {
    if (!value || typeof value !== "object" || Array.isArray(value)) return null;
    return value as Record<string, unknown>;
  };

  const mapContacts = (items: unknown[] = []) =>
    items
      .map((entry) => {
        if (isNoDataRow(entry)) return null;
        const record = asObjectRecord(entry);
        if (!record) return null;

        const recId = toText(record.recId ?? record.RecId);
        const name = toText(record.name ?? record.Name);
        const cargo = toText(record.cargo ?? record.Cargo);
        const empresa = toText(record.empresa ?? record.Empresa);

        if (!recId || isNoDataText(name)) return null;

        return {
          value: recId,
          text: name.toUpperCase(),
          cargo: cargo.toUpperCase(),
          empresa: empresa.toUpperCase(),
        } as ContactOption;
      })
      .filter(Boolean) as ContactOption[];

  const load = async (pageToLoad = 1, append = false) => {
    if (!accountNum) return;
    if (loading || loadingMore) return;
    cancelPending();

    if (!append) {
      setLoading(true);
      setBlocking(true);
      if (pageToLoad === 1) setStatus(indT("Visits_Create_LoadingContacts", "Loading contacts..."));
    } else {
      setLoadingMore(true);
      setBlocking(true);
    }

    const controller = new AbortController();
    abortRef.current = controller;
    try {
      const res = await fetchJson<ContactsDropdownResponse>(
        `/Visitas/GetContactsForDropdown?accountNum=${encodeURIComponent(accountNum)}&page=${pageToLoad}&pageSize=10`,
        { signal: controller.signal }
      );
      const rawItems = Array.isArray(res.items) ? res.items : Array.isArray(res.Items) ? res.Items : [];
      const mapped = mapContacts(rawItems);
      setOptions((prev) => {
        const next = append ? [...prev, ...mapped] : mapped;
        setCachedContacts(accountNum, next);
        return next;
      });
      setShowNotFoundState(false);
      setHasLoaded(true);
      setHasMore(mapped.length === 10);
      setPage(pageToLoad);
      setStatus(mapped.length ? indFormat("Visits_Create_ContactCount", "{0} contacts", mapped.length) : indT("Visits_Create_NoContacts", "No contacts"));
    } catch {
      setStatus(indT("Visits_Create_LoadContactsError", "Failed to load contacts."));
    } finally {
      abortRef.current = null;
      setLoading(false);
      setLoadingMore(false);
      setBlocking(false);
    }
  };

  const ensureLoaded = () => {
    if (!accountNum) return;
    if (hasLoaded && options.length) return;
    if (primeFromCache()) return;
    load(1, false);
  };

  const loadMoreContacts = React.useCallback(() => {
    if (!accountNum || !hasMore || loadingMore || loading) return;
    load(page + 1, true);
  }, [accountNum, hasMore, loadingMore, loading, page]);

  useEffect(() => {
    if (!open || !listRef.current) return;
    const el = listRef.current;
    const onScroll = () => {
      if (el.scrollTop + el.clientHeight >= el.scrollHeight - 8) loadMoreContacts();
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [open, loadMoreContacts]);

  const selectedValues = useMemo(() => {
    return new Set((selected || []).map((s) => String(s.value)));
  }, [selected]);

  const availableOptions = useMemo(() => {
    // Hide already selected contacts from the dropdown list.
    return (options || []).filter((o) => !selectedValues.has(String(o.value)));
  }, [options, selectedValues]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return availableOptions;
    return availableOptions.filter(
      (o) => o.text.toLowerCase().includes(q) || o.cargo.toLowerCase().includes(q) || o.empresa.toLowerCase().includes(q)
    );
  }, [availableOptions, query]);
  const shouldShowNotFoundRow = showNotFoundState || (!!query.trim() && filtered.length === 0);
  const resolvedActiveIndex =
    filtered.length > 0 ? Math.min(Math.max(activeIndex, 0), filtered.length - 1) : 0;
  const activeId =
    open && filtered[resolvedActiveIndex] ? `${idBase}-contact-opt-${filtered[resolvedActiveIndex].value}` : undefined;

  const toggleOption = (opt: ContactOption) => {
    setSelected((prev) => {
      const exists = prev.some((p) => p.value === opt.value);
      if (exists) return prev.filter((p) => p.value !== opt.value);
      return [...prev, opt];
    });
    setShowNotFoundState(false);
    setQuery("");
  };

  const handleKeyDown = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    handleComboboxKeyDown(ev, {
      isOpen: open,
      setOpen,
      optionCount: filtered.length,
      setActiveIndex,
      openOnArrow: true,
      onArrowNavigate: ensureLoaded,
      onEnterWhenOpen: () => {
        if (filtered.length > 0) {
          toggleOption(filtered[resolvedActiveIndex] ?? filtered[0]);
          return;
        }

        if (query.trim()) {
          setQuery("");
          setShowNotFoundState(true);
          setOpen(true);
        }
      },
      onEnterWhenClosed: accountNum
        ? () => {
            ensureLoaded();
            setOpen(true);
          }
        : undefined,
    });
  };

  return (
    <div className="space-y-2" ref={containerRef}>
      <label className="form-label font-semibold" htmlFor={inputId}>
        {indT("Visits_Create_SearchContact", "Search contact")}
      </label>
      <div className="relative">
          <div
            ref={boxRef}
            className="relative w-full cursor-default rounded-[var(--radius-xl)] border-slate-300 bg-white text-left shadow-xs focus-within:border-primary focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-0 sm:text-sm"
          >
          <div className="flex flex-wrap gap-1 px-3 py-2 min-h-10">
            {selected.map((c) => (
              <span
                key={c.value}
                className="flex items-center gap-1 rounded-[var(--radius-xl)] bg-primary/10 text-slate-700 px-2 py-1 text-xs"
              >
                {c.text}
                <button
                  type="button"
                  onClick={() => setSelected((prev) => prev.filter((s) => s.value !== c.value))}
                  className="text-slate-700 hover:text-slate-700/80"
                  aria-label={indT("Common_Delete", "Delete")}
                  title={indT("Common_Delete", "Delete")}
                >
                  <XMarkIcon className="h-4 w-4" aria-hidden="true" />
                </button>
              </span>
            ))}
            <input
              id={inputId}
              name={`${idBase}-contacts-query`}
              className="flex-1 min-w-30 bg-transparent text-sm sm:text-base leading-5 text-slate-900 border-none outline-hidden px-1 py-1 focus:ring-0 focus:border-transparent"
              onChange={(event) => {
                setActiveIndex(0);
                setShowNotFoundState(false);
                setQuery(event.target.value);
              }}
              onKeyDown={handleKeyDown}
              placeholder={selected.length ? "" : indT("Visits_Create_FilterPlaceholder", "Type to filter...")}
              autoComplete="off"
              ref={inputRef}
              readOnly={!accountNum}
              role="combobox"
              aria-expanded={open}
              aria-controls={listId}
              aria-activedescendant={activeId}
              aria-autocomplete="list"
              aria-label={indT("Visits_Create_SearchContact", "Search contact")}
              onFocus={() => {
                ensureLoaded();
                setOpen(true);
              }}
            />
            {(loading || blocking) && (
              <span className="absolute inset-y-0 right-9 flex items-center">
                <Spinner />
              </span>
            )}
          </div>
          <div className={SELECT_FIELD_ACTIONS_CLASS_NAME}>
            <button
              type="button"
              className={`${SELECT_FIELD_ACTION_BUTTON_CLASS_NAME} text-slate-500 hover:text-slate-600`}
              aria-label={open ? indT("Dropdown_HideOptions", "Hide options") : indT("Dropdown_ShowOptions", "Show options")}
              aria-expanded={open}
              onClick={() => {
                if (!accountNum) return;
                if (open) {
                  setOpen(false);
                } else {
                  ensureLoaded();
                  setOpen(true);
                }
              }}
            >
              <SelectChevron open={open} />
            </button>
          </div>
        </div>
          <FloatingList
            anchorRef={boxRef}
            open={open}
            zIndex={380000}
            maxHeightClass="max-h-72"
            role="listbox"
            roundedClass="rounded-[var(--radius-xl)]"
            portalClassName={portalClassName}
            panelClassName={panelClassName}
          >
          <div ref={listRef} id={listId} aria-multiselectable="true">
            {loading && (
              <div className="flex items-center gap-2 px-4 py-2 text-sm text-slate-500">
                <Spinner size="h-4 w-4" />
                {indT("Common_Loading", "Loading")}
              </div>
            )}
            {!loading && options.length === 0 && (
              <div className="px-4 py-2 text-sm text-slate-500">
                {hasLoaded ? indT("Visits_Create_NoContacts", "No contacts") : indT("Visits_Create_SelectClientFirst", "Select a client first.")}
              </div>
            )}
            {!loading && options.length > 0 && filtered.length === 0 && (
              <div className="px-4 py-2 text-sm text-slate-500">
                {shouldShowNotFoundRow
                  ? indT("Common_NotFound", "Not found")
                  : indT("Visits_Create_NoMoreContacts", "No more contacts available")}
              </div>
            )}
            {!loading &&
              filtered.map((opt, idx) => {
                const sel = selected.some((s) => s.value === opt.value);
                const isActive = idx === resolvedActiveIndex;
                return (
                  <button
                    type="button"
                    key={opt.value}
                    id={`${idBase}-contact-opt-${opt.value}`}
                    role="option"
                    aria-selected={sel}
                    className={classNames(
                      "relative flex w-full cursor-default select-none items-start py-2 px-3 text-left text-sm",
                      isActive ? "bg-primary text-white" : sel ? "bg-primary/10 text-primary" : "text-slate-900"
                    )}
                    onMouseEnter={() => setActiveIndex(idx)}
                    onClick={() => toggleOption(opt)}
                  >
                    <div className="relative flex flex-col gap-0.5 pr-2">
                      <span className={classNames("block truncate", sel ? "font-medium" : "font-normal")}>{opt.text}</span>
                      <span className="block text-xs text-slate-600 truncate">{opt.cargo}</span>
                    </div>
                  </button>
                );
              })}
          </div>
            {blocking && (
              <div className="absolute inset-0 z-70000 bg-white/70 backdrop-blur-[1px] flex items-center justify-center rounded-[var(--radius-xl)]">
                <Spinner size="h-6 w-6" />
              </div>
            )}
          </FloatingList>
      </div>
      <div className="w-full flex justify-end">
        <span className="text-xs text-slate-500 tech-info">{status}</span>
      </div>
    </div>
  );
};

export default ContactsCombobox;
