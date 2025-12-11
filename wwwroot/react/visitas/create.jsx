import React, { useEffect, useMemo, useState, useRef, useLayoutEffect } from "react";
import { createRoot } from "react-dom/client";
import { createPortal } from "react-dom";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/20/solid";

const classNames = (...classes) => classes.filter(Boolean).join(" ");

const Spinner = ({ size = "h-4 w-4" }) => (
  <div
    className={`${size} border-2 border-primary border-t-transparent rounded-full animate-spin`}
    role="status"
    aria-label="Cargando"
  />
);

function useFloatingPosition(targetRef, open) {
  const [style, setStyle] = useState({ top: 0, left: 0, width: 0 });

  useLayoutEffect(() => {
    if (!open || !targetRef.current) return;
    const update = () => {
      const rect = targetRef.current.getBoundingClientRect();
      setStyle({
        top: rect.bottom + 6,
        left: rect.left,
        width: rect.width,
      });
    };
    update();
    const onScroll = () => open && update();
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", update);
    };
  }, [open, targetRef]);

  return style;
}

function FloatingList({ anchorRef, open, zIndex = 300000, maxHeightClass = "max-h-72", roundedClass = "rounded-md", children, role }) {
  const style = useFloatingPosition(anchorRef, open);
  if (!open) return null;
  return createPortal(
    <div
      style={{
        position: "fixed",
        top: style.top,
        left: style.left,
        width: style.width,
        zIndex,
      }}
    >
      <div
        role={role}
        className={`w-full overflow-auto ${roundedClass} bg-white py-1 text-sm shadow-lg ring-1 ring-black/5 focus:outline-none ${maxHeightClass}`}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}

function useOutsideClick(refs, onClose) {
  useEffect(() => {
    const list = Array.isArray(refs) ? refs : [refs];
    const handler = (ev) => {
      const isInside = list.some((r) => r?.current && r.current.contains(ev.target));
      if (isInside) return;
      onClose();
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [onClose, refs]);
}

// Simple bounded cache (keeps at most 10 entries to avoid unbounded growth)
function makeCache(limit = 10) {
  const map = new Map();
  return {
    get: (k) => map.get(k),
    set: (k, v) => {
      if (map.has(k)) map.delete(k);
      map.set(k, v);
      if (map.size > limit) {
        const first = map.keys().next().value;
        map.delete(first);
      }
    },
    has: (k) => map.has(k),
    clear: () => map.clear(),
  };
}

async function fetchJson(url, options) {
  const res = await fetch(url, options);
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`${res.status} ${res.statusText}: ${t}`);
  }
  return res.json();
}

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function useTopbar(step, canGoNext, onNext, onPrev) {
  useEffect(() => {
    const forward = document.getElementById("globalForwardBtn");
    const back = document.getElementById("globalBackBtn");

    if (forward) {
      const showForward = step === 1 && canGoNext;
      forward.style.visibility = showForward ? "visible" : "hidden";
      forward.disabled = !showForward;
      forward.onclick = showForward ? () => onNext() : null;
    }
    if (back) {
      const showBack = step === 2;
      back.style.visibility = showBack ? "visible" : "hidden";
      back.disabled = !showBack;
      back.onclick = showBack ? () => onPrev() : null;
    }
  }, [step, canGoNext, onNext, onPrev]);
}

const clientCache = makeCache(10);
const contactsCache = makeCache(10);
const VISIT_DRAFT_KEY = "visitas_draft";
const CONTACTS_STORAGE_KEY = "visitas_contacts_cache_v1";
const CONTACTS_SELECTION_KEY = "visitas_contacts_selected_v1";

const readStorage = (key) => {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
};

const writeStorage = (key, data) => {
  try {
    sessionStorage.setItem(key, JSON.stringify(data));
  } catch {
    /* ignore quota issues */
  }
};

const getCachedContacts = (account) => {
  if (!account) return null;
  if (contactsCache.has(account)) return contactsCache.get(account);
  const store = readStorage(CONTACTS_STORAGE_KEY);
  if (store[account]) {
    contactsCache.set(account, store[account]);
    return store[account];
  }
  return null;
};

const setCachedContacts = (account, items) => {
  if (!account) return;
  contactsCache.set(account, items);
  const store = readStorage(CONTACTS_STORAGE_KEY);
  store[account] = items;
  writeStorage(CONTACTS_STORAGE_KEY, store);
};

const getStoredSelection = (account) => {
  if (!account) return [];
  const store = readStorage(CONTACTS_SELECTION_KEY);
  return Array.isArray(store[account]) ? store[account] : [];
};

const setStoredSelection = (account, items) => {
  if (!account) return;
  const store = readStorage(CONTACTS_SELECTION_KEY);
  store[account] = items;
  writeStorage(CONTACTS_SELECTION_KEY, store);
};

const clearStoredSelection = (account) => {
  if (!account) return;
  const store = readStorage(CONTACTS_SELECTION_KEY);
  if (store[account]) {
    delete store[account];
    writeStorage(CONTACTS_SELECTION_KEY, store);
  }
};

function ClientCombobox({ onSelected, value = null }) {
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState([]);
  const [fetchedQuery, setFetchedQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [status, setStatus] = useState("Escribe al menos 4 caracteres");
  const [selected, setSelected] = useState(value);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [blocking, setBlocking] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef(null);
  const containerRef = useRef(null);
  const boxRef = useRef(null);
  const abortRef = useRef(null);

  useOutsideClick([containerRef, listRef], () => setOpen(false));

  // Keep local selection in sync with parent (restores draft)
  useEffect(() => {
    if (!value) return;
    setSelected(value);
    setQuery(value.text || "");
  }, [value]);

  const filtered = useMemo(() => {
    if (!query.trim()) return options;
    const q = query.trim().toLowerCase();
    // If the current query differs from the last fetched query, keep showing the last options while the new request arrives.
    if (fetchedQuery && q !== fetchedQuery) return options;
    const match = options.filter((o) => o.text.toLowerCase().includes(q));
    // If API devolvio items pero el filtro queda vacio (caso mayus/minus/espacios), muestra los items en lugar de "Sin coincidencias".
    return match.length > 0 ? match : options;
  }, [options, query, fetchedQuery]);

  useEffect(() => {
    setActiveIndex(0);
  }, [filtered.length, query]);

  const cancelPending = () => {
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
  };

  const search = async () => {
    const currentQuery = query.trim().toLowerCase();
    if (currentQuery.length < 4) {
      setStatus("Escribe al menos 4 caracteres");
      setOptions([]);
      setHasMore(false);
      setFetchedQuery("");
      return;
    }
    cancelPending();
    setPage(1);
    setHasMore(true);
    setOpen(true);
    if (clientCache.has(query.trim().toLowerCase())) {
      const cached = clientCache.get(query.trim().toLowerCase());
      setOptions(cached);
      setStatus(cached.length ? `${cached.length} cliente(s) (cache)` : "Sin resultados");
      return;
    }
    setLoading(true);
    setBlocking(true);
    setStatus("Buscando...");
    const controller = new AbortController();
    abortRef.current = controller;
    try {
      const url = `/Visitas/GetAccountsForDropdown?term=${encodeURIComponent(query)}&page=1&pageSize=10`;
      const data = await fetchJson(url, { signal: controller.signal });
      const items = (data.items || []).map((o) => {
        // API puede devolver objetos o arrays. Arrays: [accountNum, desc1, desc2, id]
        if (Array.isArray(o)) {
          const code = o[0] || "";
          const desc = (o[2] || o[1] || "").toString();
          const text = code && desc ? `${desc} (${code})` : desc || code;
          return {
            value: code,
            text,
            cargo: "",
            empresa: o[2] || "",
          };
        }
        const code = o.accountNum || o.AccountNum || "";
        const desc = o.nombreComercial || o.NombreComercial || o.razonSocial || o.RazonSocial || "";
        const text = code && desc ? `${desc} (${code})` : desc || code;
        return {
          value: code,
          text,
        };
      });
      setFetchedQuery(currentQuery);
      clientCache.set(query.trim().toLowerCase(), items);
      setOptions(items);
      setStatus(items.length ? `${items.length} cliente(s)` : "Sin resultados");
      setHasMore(items.length === 10);
    } catch (err) {
      if (err?.name === "AbortError") {
        setStatus("B�squeda cancelada");
      } else if (String(err?.message || "").toLowerCase().includes("timeout")) {
        setStatus("La b�squeda tard� demasiado. Escribe m�s caracteres para acotar.");
      } else {
        setStatus("Error al cargar clientes");
      }
    } finally {
      abortRef.current = null;
      setLoading(false);
      setBlocking(false);
    }
  };

  const loadMore = React.useCallback(async () => {
    if (loadingMore || loading || !hasMore || query.trim().length < 4) return;
    setLoadingMore(true);
    setBlocking(true);
    const controller = new AbortController();
    abortRef.current = controller;
    try {
      const nextPage = page + 1;
      const url = `/Visitas/GetAccountsForDropdown?term=${encodeURIComponent(query)}&page=${nextPage}&pageSize=10`;
      const data = await fetchJson(url, { signal: controller.signal });
      const items = (data.items || []).map((o) => {
        if (Array.isArray(o)) {
          const code = o[0] || "";
          const desc = (o[2] || o[1] || "").toString();
          const text = code && desc ? `${desc} (${code})` : desc || code;
          return {
            value: code,
            text,
            cargo: "",
            empresa: o[2] || "",
          };
        }
        const code = o.accountNum || o.AccountNum || "";
        const desc = o.nombreComercial || o.NombreComercial || o.razonSocial || o.RazonSocial || "";
        const text = code && desc ? `${desc} (${code})` : desc || code;
        return {
          value: code,
          text,
        };
      });
      setOptions((prev) => [...prev, ...items]);
      setPage(nextPage);
      setHasMore(items.length === 10);
    } finally {
      abortRef.current = null;
      setLoadingMore(false);
      setBlocking(false);
    }
  }, [loadingMore, loading, hasMore, query, page]);

  useEffect(() => {
    // auto-search only when explicitly requested
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => {
    if (selected) onSelected(selected);
  }, [selected, onSelected]);

  useEffect(() => {
    if (!open || !listRef.current) return;
    const el = listRef.current;
    const onScroll = () => {
      if (el.scrollTop + el.clientHeight >= el.scrollHeight - 8) loadMore();
    };
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, [open, loadMore]);

  const selectOption = (opt) => {
    setSelected(opt);
    setQuery(opt.text);
    // Do not trigger search on select; selection is final
    setOpen(false);
  };

  const handleKeyDown = (ev) => {
    if (ev.key === "ArrowDown") {
      ev.preventDefault();
      if (!open) setOpen(true);
      if (filtered.length) setActiveIndex((idx) => (idx + 1) % filtered.length);
      return;
    }
    if (ev.key === "ArrowUp") {
      ev.preventDefault();
      if (!open) setOpen(true);
      if (filtered.length) setActiveIndex((idx) => (idx - 1 + filtered.length) % filtered.length);
      return;
    }
    if (ev.key === "Enter") {
      ev.preventDefault();
      if (open && filtered.length) {
        selectOption(filtered[activeIndex] ?? filtered[0]);
      } else {
        search();
      }
    }
    if (ev.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div className="space-y-2" ref={containerRef}>
      <label className="text-sm font-semibold text-slate-700">Buscar cliente</label>
      <div className="relative">
        <div
          ref={boxRef}
          className="relative w-full cursor-default rounded-xl border-slate-300 bg-white text-left shadow-sm focus-within:border-primary focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-0 sm:text-sm"
        >
          <input
            className="w-full rounded-xl border border-slate-200 px-3 py-2 pr-10 text-sm leading-5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            value={query}
            onChange={(event) => {
              const val = event.target.value;
              setQuery(val);
              setFetchedQuery("");
              cancelPending();
              setOptions([]);
              setHasMore(false);
              setStatus(val.trim().length < 4 ? "Escribe al menos 4 caracteres" : "Presiona Enter o la flecha para buscar");
              setOpen(true);
            }}
            onKeyDown={(e) => {
              handleKeyDown(e);
              if (e.key === "Enter") {
                e.preventDefault();
                if (query.trim().length >= 4) {
                  search();
                } else {
                  setStatus("Escribe al menos 4 caracteres");
                }
              }
            }}
            onFocus={() => setOpen(true)}
            placeholder="Escribe al menos 4 caracteres..."
            readOnly={loading || blocking}
            aria-busy={loading || blocking}
            role="combobox"
            aria-expanded={open}
            aria-controls="client-options"
            aria-activedescendant={
              open && filtered[activeIndex] ? `client-opt-${filtered[activeIndex].value}` : undefined
            }
          />
          {(loading || blocking) && (
            <span className="absolute inset-y-0 right-9 flex items-center">
              <Spinner />
            </span>
          )}
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-2 text-slate-500 hover:text-slate-600"
            onClick={() => { if (loading || blocking) return; if (open) { setOpen(false); } else { if (query.trim().length >= 4) { search(); } else { setStatus("Escribe al menos 4 caracteres"); } setOpen(true); } }}
            disabled={loading || blocking}
            aria-label="Mostrar opciones de cliente"
          >
            <ChevronDownIcon className="h-4 w-4" />
          </button>
        </div>
        <FloatingList anchorRef={boxRef} open={open} zIndex={400000} maxHeightClass="max-h-72" role="listbox" roundedClass="rounded-xl">
          <div ref={listRef} id="client-options">
            {loading && (
              <div className="flex items-center gap-2 px-4 py-2 text-sm text-slate-500">
                <Spinner size="h-4 w-4" />
                Buscando...
              </div>
            )}
            {!loading && options.length === 0 && (
              <div className="px-4 py-2 text-sm text-slate-500">Sin resultados</div>
            )}
            {!loading && options.length > 0 && filtered.length === 0 && (
              <div className="px-4 py-2 text-sm text-slate-500">Sin coincidencias</div>
            )}
            {!loading &&
              filtered.map((opt, idx) => {
                const isActive = idx === activeIndex;
                const sel = selected?.value === opt.value;
                return (
                  <button
                    type="button"
                    key={opt.value}
                    id={`client-opt-${opt.value}`}
                    role="option"
                    aria-selected={sel}
                    className={classNames(
                      "relative flex w-full cursor-default select-none items-start py-2 px-3 text-left text-sm",
                      isActive ? "bg-primary text-white" : sel ? "bg-primary/10 text-primary" : "text-slate-900"
                    )}
                    onMouseEnter={() => setActiveIndex(idx)}
                    onClick={() => selectOption(opt)}
                  >
                    <div className="flex flex-col space-y-0.5">
                      <span className={classNames("block truncate uppercase text-[13px]", sel ? "font-semibold" : "font-normal")}>
                        {opt.text}
                      </span>
                      <span className="block truncate uppercase text-[11px] text-slate-600">
                        {opt.cargo}
                      </span>
                      <span className="block truncate uppercase text-[11px] text-slate-500">
                        {opt.empresa}
                      </span>
                    </div>
                  </button>
                );
              })}
          </div>
          {blocking && (
            <div className="absolute inset-0 z-[70000] bg-white/70 backdrop-blur-[1px] flex items-center justify-center rounded-xl">
              <div className="h-6 w-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </FloatingList>
      </div>
      <div className="w-full flex justify-end">
        <span className="text-xs text-slate-500 tech-info">{status}</span>
      </div>
    </div>
  );
}

function ContactsCombobox({ accountNum, value = [], onChange }) {
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(value);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [status, setStatus] = useState("Seleccione un cliente primero");
  const [hasLoaded, setHasLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [blocking, setBlocking] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef(null);
  const boxRef = useRef(null);
  const abortRef = useRef(null);
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const lastAccountRef = useRef(accountNum || "");

  useOutsideClick([containerRef, listRef], () => setOpen(false));

  const isSameSelection = (a = [], b = []) => {
    if (a.length !== b.length) return false;
    const as = a.map((x) => String(x.value)).sort();
    const bs = b.map((x) => String(x.value)).sort();
    return as.every((v, i) => v === bs[i]);
  };

  // Sincroniza selección interna con la prop (restauración de draft/cache)
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

  const primeFromCache = () => {
    const cached = getCachedContacts(accountNum);
    if (cached) {
      setOptions(cached);
      setHasLoaded(true);
      setHasMore(cached.length === 10);
      setStatus(cached.length ? `${cached.length} contacto(s) (cache)` : "Sin contactos");
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
    setPage(1);
    setHasMore(true);

    if (!accountNum) {
      setOptions([]);
      setSelected([]);
      onChange([]);
      setStatus("Seleccione un cliente primero");
      setHasLoaded(false);
      clearStoredSelection(lastAccountRef.current);
      lastAccountRef.current = "";
      return;
    }

    const changed = lastAccountRef.current && lastAccountRef.current !== accountNum;
    if (changed) {
      setSelected([]);
      onChange([]);
      clearStoredSelection(lastAccountRef.current);
    }

    const usedCache = primeFromCache();
    if (!usedCache) {
      setOptions([]);
      setHasLoaded(false);
      setStatus("Presiona la flecha para cargar contactos");
    }

    const storedSelection = getStoredSelection(accountNum);
    if (storedSelection.length && !value?.length) {
      setSelected(storedSelection);
      onChange(storedSelection);
    }

    lastAccountRef.current = accountNum;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountNum]);

  useEffect(() => {
    onChange(selected);
    if (accountNum) setStoredSelection(accountNum, selected);
  }, [selected, onChange, accountNum]);

  const mapContacts = (items = []) =>
    items.map((c) => ({
      value: c.recId || c.RecId || "",
      text: (c.name || c.Name || "").toString().trim().toUpperCase(),
      cargo: (c.cargo || c.Cargo || "").toString().trim().toUpperCase(),
      empresa: (c.empresa || c.Empresa || "").toString().trim().toUpperCase(),
    }));

  const load = async (pageToLoad = 1, append = false) => {
    if (!accountNum) return;
    if (loading || loadingMore) return;
    cancelPending();

    if (!append) {
      setLoading(true);
      setBlocking(true);
      if (pageToLoad === 1) setStatus("Cargando contactos...");
    } else {
      setLoadingMore(true);
      setBlocking(true);
    }

    const controller = new AbortController();
    abortRef.current = controller;
    try {
      const res = await fetchJson(
        `/Visitas/GetContactsForDropdown?accountNum=${encodeURIComponent(accountNum)}&page=${pageToLoad}&pageSize=10`,
        { signal: controller.signal }
      );
      const mapped = mapContacts(res.items || []);
      setOptions((prev) => {
        const next = append ? [...prev, ...mapped] : mapped;
        setCachedContacts(accountNum, next);
        return next;
      });
      setHasLoaded(true);
      setHasMore(mapped.length === 10);
      setPage(pageToLoad);
      setStatus(mapped.length ? `${mapped.length} contacto(s)` : "Sin contactos");
    } catch {
      setStatus("Error al cargar contactos");
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
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, [open, loadMoreContacts]);

  const filtered = useMemo(() => {
    if (!query.trim()) return options;
    const f = options.filter(
      (o) =>
        o.text.toLowerCase().includes(query.toLowerCase()) ||
        o.cargo.toLowerCase().includes(query.toLowerCase()) ||
        o.empresa.toLowerCase().includes(query.toLowerCase())
    );
    return f.length ? f : options;
  }, [options, query]);

  useEffect(() => {
    setActiveIndex(0);
  }, [filtered.length, query]);

  const toggleOption = (opt) => {
    setSelected((prev) => {
      const exists = prev.some((p) => p.value === opt.value);
      if (exists) return prev.filter((p) => p.value !== opt.value);
      return [...prev, opt];
    });
  };

  const handleKeyDown = (ev) => {
    if (ev.key === "ArrowDown") {
      ev.preventDefault();
      setOpen(true);
      ensureLoaded();
      if (filtered.length) setActiveIndex((idx) => (idx + 1) % filtered.length);
      return;
    }
    if (ev.key === "ArrowUp") {
      ev.preventDefault();
      setOpen(true);
      ensureLoaded();
      if (filtered.length) setActiveIndex((idx) => (idx - 1 + filtered.length) % filtered.length);
      return;
    }
    if (ev.key === "Enter") {
      ev.preventDefault();
      if (open && filtered.length) {
        toggleOption(filtered[activeIndex] ?? filtered[0]);
      } else if (accountNum) {
        ensureLoaded();
        setOpen(true);
      }
    }
    if (ev.key === "Escape") setOpen(false);
  };

  return (
    <div className="space-y-2" ref={containerRef}>
      <label className="text-sm font-semibold text-slate-700">Buscar contacto (selección múltiple)</label>
      <div className="relative">
        <div
          ref={boxRef}
          className="relative w-full cursor-default rounded-xl border-slate-300 bg-white text-left shadow-sm focus-within:border-primary focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-0 sm:text-sm"
        >
          <div className="flex flex-wrap gap-1 px-3 py-2 min-h-[40px]">
            {selected.map((c) => (
              <span
                key={c.value}
                className="flex items-center gap-1 rounded-full bg-primary/10 text-primary px-2 py-1 text-xs"
              >
                {c.text}
                <button
                  type="button"
                  onClick={() => setSelected(selected.filter((s) => s.value !== c.value))}
                  className="text-primary hover:text-primary/70"
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
              </span>
            ))}
            <input
              className="flex-1 min-w-[120px] bg-transparent text-sm leading-5 text-slate-900 border-none outline-none px-1 py-1 focus:ring-0 focus:border-transparent"
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={selected.length ? "" : "Escribe para filtrar..."}
              ref={inputRef}
              readOnly={!accountNum}
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
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-2 text-slate-500 hover:text-slate-600"
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
            <ChevronDownIcon className="h-4 w-4" />
          </button>
        </div>
        <FloatingList anchorRef={boxRef} open={open} zIndex={380000} maxHeightClass="max-h-72" role="listbox" roundedClass="rounded-xl">
          <div ref={listRef} aria-multiselectable="true">
            {loading && (
              <div className="flex items-center gap-2 px-4 py-2 text-sm text-slate-500">
                <Spinner size="h-4 w-4" />
                Cargando...
              </div>
            )}
            {!loading && options.length === 0 && (
              <div className="px-4 py-2 text-sm text-slate-500">
                {hasLoaded ? "Sin contactos" : "Seleccione un cliente primero"}
              </div>
            )}
            {!loading && options.length > 0 && filtered.length === 0 && (
              <div className="px-4 py-2 text-sm text-slate-500">Sin coincidencias</div>
            )}
            {!loading &&
              filtered.map((opt, idx) => {
                const sel = selected.some((s) => s.value === opt.value);
                const isActive = idx === activeIndex;
                return (
                  <button
                    type="button"
                    key={opt.value}
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
                      <span className={classNames("block truncate", sel ? "font-medium" : "font-normal")}>
                        {opt.text}
                      </span>
                      <span className="block text-xs text-slate-600 truncate">{opt.cargo}</span>
                      <span className="block text-xs text-slate-500 truncate">{opt.empresa}</span>
                    </div>
                  </button>
                );
              })}
          </div>
          {blocking && (
            <div className="absolute inset-0 z-[70000] bg-white/70 backdrop-blur-[1px] flex items-center justify-center rounded-xl">
              <div className="h-6 w-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </FloatingList>
      </div>
      <div className="w-full flex justify-end">
        <span className="text-xs text-slate-500 tech-info">{status}</span>
      </div>
    </div>
  );
}

function SelectCombobox({ label, options, value, onChange, placeholder }) {
  const data = useMemo(() => {
    return options.map((o) => {
      if (Array.isArray(o)) {
        return { value: o[0] ?? "", text: o[1] ?? "" };
      }
      return { value: o?.value ?? o?.Value ?? "", text: o?.text ?? o?.Text ?? "" };
    });
  }, [options]);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(
    data.find((d) => String(d.value) === String(value)) || data[0] || { value: "", text: "" }
  );
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const boxRef = useRef(null);
  const listRef = useRef(null);

  useOutsideClick([containerRef, listRef], () => setOpen(false));

  // Muestra la lista completa al abrir; solo filtra cuando el usuario escribe.
  useEffect(() => {
    setQuery("");
  }, [selected]);

  useEffect(() => {
    onChange(selected?.value || "");
  }, [selected, onChange]);

  const filtered = useMemo(() => {
    if (!query.trim()) return data;
    const f = data.filter((o) => o.text.toLowerCase().includes(query.toLowerCase()));
    return f.length ? f : data;
  }, [data, query]);

  useEffect(() => {
    setActiveIndex(0);
  }, [filtered.length, query]);

  const selectOption = (opt) => {
    setSelected(opt);
    setQuery("");
    // Do not trigger search on select; selection is final
    setOpen(false);
  };

  const handleKeyDown = (ev) => {
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
      if (open && filtered.length) {
        selectOption(filtered[activeIndex] ?? filtered[0]);
      } else {
        setOpen(true);
      }
    }
    if (ev.key === "Escape") setOpen(false);
  };

  return (
    <div className="space-y-2" ref={containerRef}>
      <label className="text-sm font-semibold text-slate-700">{label}</label>
      <div className="relative">
        <div
          ref={boxRef}
          className="relative w-full cursor-default rounded-xl bg-white text-left focus-within:border-primary focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-white sm:text-sm"
        >
          <input
            className="w-full rounded-xl border border-slate-200 px-3 py-2 pr-10 text-sm leading-5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            value={query || selected?.text || ""}
            onChange={(event) => {
              const val = event.target.value;
              setQuery(val);
              setOpen(true);
            }}
            onKeyDown={(e) => {
              handleKeyDown(e);
            }}
            onFocus={() => setOpen(true)}
            placeholder={placeholder}
            role="combobox"
            aria-expanded={open}
            aria-controls={`select-options-${label}`}
            aria-activedescendant={
              open && filtered[activeIndex] ? `select-opt-${label}-${filtered[activeIndex].value}` : undefined
            }
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-2 text-slate-500 hover:text-slate-600"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Mostrar opciones"
          >
            <ChevronDownIcon className="h-4 w-4" />
          </button>
        </div>
        <FloatingList anchorRef={boxRef} open={open} zIndex={360000} maxHeightClass="max-h-72" role="listbox" roundedClass="rounded-xl">
          <div id={`select-options-${label}`} ref={listRef} role="listbox" aria-label={label}>
            {filtered.length === 0 && (
              <div className="px-4 py-2 text-sm text-slate-500">Sin resultados</div>
            )}
            {filtered.map((opt, idx) => {
              const sel = selected?.value === opt.value;
              const isActive = idx === activeIndex;
              return (
                <button
                  type="button"
                  key={opt.value}
                  id={`select-opt-${label}-${opt.value}`}
                  role="option"
                  aria-selected={sel}
                  className={classNames(
                    "relative flex w-full cursor-default select-none items-center py-2 pr-3 text-left text-sm type-option",
                    isActive ? "bg-primary text-white" : "text-slate-900"
                  )}
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
                  <span className={classNames("block truncate", sel ? "font-medium" : "font-normal")}>
                    {opt.text}
                  </span>
                </button>
              );
            })}
          </div>
        </FloatingList>
      </div>
    </div>
  );
}

function VisitasApp() {
  const visitTypes = window.__VISIT_TYPES__ || [];
  const asistenteTipos = window.__ASISTENTE_TIPOS__ || [];
  const axUser = window.__AX_USER__ || "";

  const [step, setStep] = useState(1);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const todayString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const defaultVisitType = visitTypes[0]?.value ?? visitTypes[0]?.Value ?? "";
  const defaultAsistenteTipo = asistenteTipos[0]?.value ?? asistenteTipos[0]?.Value ?? "";

  const [visitType, setVisitType] = useState(defaultVisitType);
  const [asistenteTipo, setAsistenteTipo] = useState(defaultAsistenteTipo);
  const [transDate, setTransDate] = useState(() => todayString());
  const [description, setDescription] = useState("");
  const [comentarios, setComentarios] = useState("");
  const [antecedentes, setAntecedentes] = useState("");
  const [conclusiones, setConclusiones] = useState("");
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  // Clear contactos solo si el cliente cambia (evita limpiar al restaurar/vuelta de paso 2)
  const prevClientRef = useRef(null);
  useEffect(() => {
    const current = selectedClient?.value;
    if (prevClientRef.current && prevClientRef.current !== current) {
      setSelectedContacts([]);
    }
    prevClientRef.current = current;
  }, [selectedClient?.value]);

  const lastClientRef = useRef(null);

  // Si se cambia de cliente tras haber seleccionado contactos, resetea todo el formulario.
  useEffect(() => {
    const current = selectedClient?.value;
    if (!current) return;

    if (lastClientRef.current && lastClientRef.current !== current) {
      setStep(1);
      setSelectedContacts([]);
      setVisitType(defaultVisitType);
      setAsistenteTipo(defaultAsistenteTipo);
      setTransDate(todayString());
      setDescription("");
      setComentarios("");
      setAntecedentes("");
      setConclusiones("");
      setStatus("");
      setBusy(false);
    }
    lastClientRef.current = current;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedClient?.value]);

  // Persist draft in sessionStorage
  useEffect(() => {
    const draft = {
      selectedClient,
      selectedContacts,
      visitType,
      asistenteTipo,
      transDate,
      description,
      comentarios,
      antecedentes,
      conclusiones,
      step,
    };
    try {
      sessionStorage.setItem(VISIT_DRAFT_KEY, JSON.stringify(draft));
    } catch {
      /* ignore quota errors */
    }
  }, [
    selectedClient,
    selectedContacts,
    visitType,
    asistenteTipo,
    transDate,
    description,
    comentarios,
    antecedentes,
    conclusiones,
    step,
  ]);

  // Restore draft on mount
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(VISIT_DRAFT_KEY);
      if (!raw) return;
      const draft = JSON.parse(raw);
      if (draft?.selectedClient?.value) setSelectedClient(draft.selectedClient);
      if (Array.isArray(draft?.selectedContacts)) setSelectedContacts(draft.selectedContacts);
      if (draft?.visitType !== undefined) setVisitType(draft.visitType);
      if (draft?.asistenteTipo !== undefined) setAsistenteTipo(draft.asistenteTipo);
      if (draft?.transDate) setTransDate(draft.transDate);
      if (draft?.description !== undefined) setDescription(draft.description);
      if (draft?.comentarios !== undefined) setComentarios(draft.comentarios);
      if (draft?.antecedentes !== undefined) setAntecedentes(draft.antecedentes);
      if (draft?.conclusiones !== undefined) setConclusiones(draft.conclusiones);
      if (draft?.step === 2) setStep(2);
    } catch {
      /* ignore parse issues */
    }
  }, []);

  // Guarda la selección por cliente en storage para restaurar al volver
  useEffect(() => {
    if (selectedClient?.value) {
      setStoredSelection(selectedClient.value, selectedContacts);
    }
  }, [selectedClient?.value, selectedContacts]);

  const canGoNext = !!selectedClient && selectedContacts.length > 0;

  useTopbar(
    step,
    canGoNext,
    () => {
      if (step === 1 && canGoNext) setStep(2);
      if (step === 2) handleSubmit();
    },
    () => setStep(1)
  );

  const handleSubmit = async () => {
    if (busy) return;
    if (!selectedClient) {
      setStatus("Selecciona un cliente.");
      return;
    }
    if (!selectedContacts.length) {
      setStatus("Selecciona al menos un contacto.");
      return;
    }
    setBusy(true);
      const toast = document.createElement("div");
      toast.id = "visita-toast";
      toast.className =
        "fixed inset-0 z-[120000] flex items-center justify-center bg-black/30 backdrop-blur-[1px]";
      const box = document.createElement("div");
      box.className =
        "rounded-2xl bg-white px-6 py-4 shadow-2xl text-center space-y-2 min-w-[240px] border border-slate-100";
      const title = document.createElement("div");
      title.id = "visita-toast-title";
      title.className = "text-sm font-semibold text-primary";
      title.textContent = "Procesando...";
      const subtitle = document.createElement("div");
      subtitle.id = "visita-toast-sub";
      subtitle.className = "text-xs text-slate-600";
      subtitle.textContent = "Creando actividad...";
      box.appendChild(title);
      box.appendChild(subtitle);
      toast.appendChild(box);
      document.body.appendChild(toast);

      setStatus("Creando actividad...");
      const toastTitle = () => document.getElementById("visita-toast-title");
      const toastSub = () => document.getElementById("visita-toast-sub");
      const updateToast = (t, s) => {
        const titleEl = toastTitle();
        const subEl = toastSub();
        if (t && titleEl) titleEl.textContent = t;
        if (s && subEl) subEl.textContent = s;
      };
      updateToast("Procesando...", "Creando actividad...");
      await wait(250);

    try {
      const payloadActivity = {
        accountNum: selectedClient.value,
        visitType,
        userId: axUser,
        description,
        transDate,
        comentarios,
        antecedentes,
        conclusiones,
      };

      const resAct = await fetchJson("/Visitas/CreateActivity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payloadActivity),
      });

      if (!resAct.success) throw new Error(resAct.message || "Fallo al crear actividad");

      const recIdActividad = (resAct.message || "").trim();
      let created = 0;

      for (const c of selectedContacts) {
        const msg = `Creando visita para ${c.text}...`;
        setStatus(msg);
        updateToast("Procesando visitas...", msg);
        await wait(180);
        const payloadVisita = {
          refRecIdActividad: recIdActividad,
          asistenteTipo,
          asistenteId: c.text,
          contactoRecId: c.value,
        };
        const resVis = await fetchJson("/Visitas/CreateVisitaAsistente", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payloadVisita),
        });
        if (!resVis.success) throw new Error(resVis.message || "Fallo al crear visita");
        created++;
      }

      const finalMsg =
        created > 1
          ? `Visita creada con ${created} contacto(s)`
          : "Visita creada correctamente";
      setStatus(finalMsg + ". Redirigiendo...");
      updateToast(finalMsg, "Redirigiendo...");
      try {
        sessionStorage.removeItem(VISIT_DRAFT_KEY);
      } catch {
        /* ignore */
      }
      await wait(400);
      setTimeout(() => {
        document.body.removeChild(toast);
        window.location.href = "/Home/Index";
      }, 1000);
    } catch (e) {
      setStatus(e.message || "Error al crear la visita");
      setBusy(false);
      const existing = document.getElementById("visita-toast");
      if (existing) existing.remove();
    }
  };

  return (
    <div className="space-y-4">
      {step === 1 && (
        <div className="space-y-6">
          <ClientCombobox onSelected={setSelectedClient} value={selectedClient} />

          <div className="space-y-3">
            <ContactsCombobox
              accountNum={selectedClient?.value}
              value={selectedContacts}
              onChange={setSelectedContacts}
            />
            {selectedContacts.length > 0 && (
              <div className="text-xs text-slate-600">
                {selectedContacts.length} contacto(s) seleccionado(s)
              </div>
            )}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="shadow-sm glass-panel p-4 space-y-4 border border-slate-200 rounded-2xl">
          <div className="text-base font-semibold text-slate-900 border-b border-slate-200 pb-3">
            Datos de la visita
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Fecha</label>
              <input
                id="transDate"
                type="date"
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                value={transDate}
                onChange={(e) => setTransDate(e.target.value)}
              />
            </div>
            <SelectCombobox
              label="Tipo de visita"
              options={visitTypes}
              value={visitType}
              onChange={setVisitType}
              placeholder="Selecciona tipo"
            />
            <SelectCombobox
              label="Tipo asistente"
              options={asistenteTipos}
              value={asistenteTipo}
              onChange={setAsistenteTipo}
              placeholder="Selecciona asistente"
            />
          </div>

          <div className="grid grid-cols-1 gap-3">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Descripción</label>
              <input
                id="description"
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                maxLength={200}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Comentarios</label>
              <textarea
                id="comentarios"
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                value={comentarios}
                onChange={(e) => setComentarios(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Antecedentes</label>
              <textarea
                id="antecedentes"
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                value={antecedentes}
                onChange={(e) => setAntecedentes(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Conclusiones</label>
              <textarea
                id="conclusiones"
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                value={conclusiones}
                onChange={(e) => setConclusiones(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="primary-btn"
              disabled={busy}
              onClick={handleSubmit}
            >
              {busy ? "Creando..." : "Crear visita"}
            </button>
            <span className="text-sm text-slate-500">{status}</span>
          </div>
        </div>
      )}
    </div>
  );
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Log for diagnostics; prevents the UI from going blank.
    console.error("Visitas app error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 rounded-xl border border-rose-200 bg-rose-50 text-rose-700">
          Ocurrió un error al mostrar la página de visitas. Recarga y vuelve a intentar.
        </div>
      );
    }
    return this.props.children;
  }
}

const mount = () => {
  const rootEl = document.getElementById("visitas-app-root");
  if (!rootEl) return;
  const root = createRoot(rootEl);
  root.render(
    <ErrorBoundary>
      <VisitasApp />
    </ErrorBoundary>
  );
};

if (document.readyState === "complete" || document.readyState === "interactive") {
  mount();
} else {
  document.addEventListener("DOMContentLoaded", mount);
}
