import React, { useEffect, useMemo, useState, useRef, useLayoutEffect } from "react";
import { createRoot } from "react-dom/client";
import { createPortal } from "react-dom";
import { XMarkIcon } from "@heroicons/react/20/solid";
import SingleDatePicker from "./SingleDatePicker.jsx";
import { ChevronDownSvg, ChevronUpSvg } from "./chevrons.jsx";

const classNames = (...classes) => classes.filter(Boolean).join(" ");

const IND_I18N = globalThis.__IND_I18N__ || {};
const indT = (key, fallback) => (IND_I18N && typeof IND_I18N[key] === "string" && IND_I18N[key]) || fallback || key;
const PERM_I18N = globalThis.__IND_PERMISSION_I18N__ || {};
const MODULE_ACCESS = globalThis.__IND_MODULE_ACCESS__ || {};
const CURRENT_COMPANY = String(globalThis.__IND_SELECTED_COMPANY__ || "").trim().toUpperCase();
const COMPANY_STORAGE_SUFFIX = CURRENT_COMPANY ? `_${CURRENT_COMPANY}` : "";
const ACCESS_RIGHTS = { View: 1, Edit: 2, Add: 3, FullAccess: 4 };
const getModuleAccess = (code) => Number(MODULE_ACCESS && MODULE_ACCESS[code] != null ? MODULE_ACCESS[code] : 0);
const canCreateVisit = getModuleAccess("VISITAS_CREACION") >= ACCESS_RIGHTS.Add;
const canRollbackDelete = getModuleAccess("VISITAS_HISTORIAL") >= ACCESS_RIGHTS.FullAccess;
const showPermissionModal = (opts) => {
  if (typeof window !== "undefined" && window.IND && typeof window.IND.showPermissionModal === "function") {
    window.IND.showPermissionModal(opts || {});
    return;
  }
  const fallback = PERM_I18N.message || indT("Auth_PermissionDenied_Body", "No tienes permisos para realizar esta accion.");
  alert(fallback);
};
const indFormat = (key, fallback, ...args) => {
  const template = indT(key, fallback);
  return String(template).replace(/\{(\d+)\}/g, (_, idx) => String(args[Number(idx)] ?? ""));
};

// Optional global overlay spinner for cache-heavy flows.
const showGlobalSpinner = (message) => {
  try {
    if (typeof window !== "undefined" && typeof window.__indShowGlobalSpinner === "function") {
      window.__indShowGlobalSpinner(message);
    }
  } catch {
    /* ignore */
  }
};

const hideGlobalSpinner = () => {
  try {
    if (typeof window !== "undefined" && typeof window.__indHideGlobalSpinner === "function") {
      window.__indHideGlobalSpinner();
    }
  } catch {
    /* ignore */
  }
};

function indExtractId(value) {
  if (value === null || value === undefined) return "";
  if (typeof value === "string" || typeof value === "number") return String(value).trim();
  if (typeof value === "object") {
    const candidate = value.recId ?? value.RecId ?? value.id ?? value.Id ?? value.value ?? value.Value;
    if (typeof candidate === "string" || typeof candidate === "number") return String(candidate).trim();
  }
  return "";
}

function indExtractNumericId(value, depth = 0) {
  if (depth > 3) return "";
  if (value === null || value === undefined) return "";
  if (typeof value === "number" && Number.isFinite(value)) return String(Math.trunc(value));
  if (typeof value === "string") {
    const raw = value.trim();
    if (!raw) return "";
    if (/^\d+$/.test(raw)) return raw;
    const m = raw.match(/(\d{3,})/);
    return m ? m[1] : "";
  }
  if (typeof value !== "object") return "";
  if (Array.isArray(value)) {
    for (const item of value) {
      const found = indExtractNumericId(item, depth + 1);
      if (found) return found;
    }
    return "";
  }

  const keys = [
    "recId",
    "RecId",
    "refRecIdActividad",
    "RefRecIdActividad",
    "actividadRecId",
    "ActividadRecId",
    "id",
    "Id",
    "value",
    "Value",
    "result",
    "Result",
    "data",
    "Data",
    "message",
    "Message"
  ];

  for (const k of keys) {
    if (Object.prototype.hasOwnProperty.call(value, k)) {
      const found = indExtractNumericId(value[k], depth + 1);
      if (found) return found;
    }
  }

  for (const v of Object.values(value)) {
    const found = indExtractNumericId(v, depth + 1);
    if (found) return found;
  }

  return "";
}

function indExtractSignedId(value, depth = 0) {
  if (depth > 3) return "";
  if (value === null || value === undefined) return "";
  if (typeof value === "number" && Number.isFinite(value)) return String(Math.trunc(value));
  if (typeof value === "string") {
    const raw = value.trim();
    if (!raw) return "";
    const match = raw.match(/-?\d{3,}/);
    return match ? match[0] : "";
  }
  if (typeof value !== "object") return "";
  if (Array.isArray(value)) {
    for (const item of value) {
      const found = indExtractSignedId(item, depth + 1);
      if (found) return found;
    }
    return "";
  }

  const keys = [
    "recId",
    "RecId",
    "refRecIdActividad",
    "RefRecIdActividad",
    "actividadRecId",
    "ActividadRecId",
    "message",
    "Message",
    "result",
    "Result",
    "data",
    "Data"
  ];

  for (const k of keys) {
    if (Object.prototype.hasOwnProperty.call(value, k)) {
      const found = indExtractSignedId(value[k], depth + 1);
      if (found) return found;
    }
  }

  for (const v of Object.values(value)) {
    const found = indExtractSignedId(v, depth + 1);
    if (found) return found;
  }

  return "";
}

// Filters placeholder rows like "Sin datos." returned by the API.
function isNoDataText(value) {
  const raw = String(value || "").trim().toLowerCase();
  if (!raw) return false;
  const normalized = raw.replace(/[^a-z0-9]+/g, "");
  return normalized === "sindatos" || normalized === "nodata";
}

function isNoDataRow(row) {
  if (row === null || row === undefined) return true;
  if (Array.isArray(row)) {
    return row.length === 1 && isNoDataText(row[0]);
  }
  if (typeof row === "string") {
    return isNoDataText(row);
  }
  if (typeof row === "object") {
    const values = Object.values(row);
    if (!values.length) return true;
    return values.some((v) => typeof v === "string" && isNoDataText(v));
  }
  return false;
}

function mapAccountItem(item) {
  if (isNoDataRow(item)) return null;
  if (Array.isArray(item)) {
    const code = (item[0] || "").toString().trim();
    const desc = (item[2] || item[1] || "").toString().trim();
    if (!code || isNoDataText(code) || isNoDataText(desc)) return null;
    const text = desc ? `${desc} (${code})` : code;
    return {
      value: code,
      text,
      cargo: "",
      empresa: item[2] || "",
    };
  }
  if (item && typeof item === "object") {
    const code = (item.accountNum || item.AccountNum || "").toString().trim();
    const desc = (item.nombreComercial || item.NombreComercial || item.razonSocial || item.RazonSocial || "")
      .toString()
      .trim();
    if (!code || isNoDataText(code) || isNoDataText(desc)) return null;
    const text = desc ? `${desc} (${code})` : code;
    return { value: code, text };
  }
  return null;
}

const Spinner = ({ size = "h-4 w-4", label }) => (
  <svg
    className={`ind-spinner ${size}`}
    viewBox="0 0 20 20"
    role="status"
    aria-label={label || indT("Common_Loading", "Loading")}
  >
    <circle className="ind-spinner__circle" cx="10" cy="10" r="8" strokeWidth="2" />
  </svg>
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
        className={`w-full overflow-auto ${roundedClass} bg-white py-1 text-sm shadow-lg ring-1 ring-black/5 focus:outline-hidden ${maxHeightClass}`}
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
  const { suppressPermissionModal, ...fetchOptions } = options || {};
  const csrfToken = getCsrfToken();
  const headers = {
    Accept: "application/json",
    ...(fetchOptions?.headers || {}),
    ...(csrfToken ? { RequestVerificationToken: csrfToken } : {}),
  };
  const merged = {
    credentials: "same-origin",
    ...fetchOptions,
    headers,
  };
  const res = await fetch(url, merged);
  const text = await res.text();
  if (!res.ok) {
    if (res.status === 403) {
      if (!suppressPermissionModal) {
        showPermissionModal();
      }
      throw new Error(indT("Auth_PermissionDenied_Body", "No tienes permisos para realizar esta accion."));
    }
    // Prefer upstream API message when provided.
    try {
      const json = JSON.parse(text);
      const msg = json?.message;
      if (typeof msg === "string" && msg.trim()) {
        throw new Error(msg);
      }
    } catch {
      // ignore parse errors
    }
    throw new Error(indT("Api_RequestFailed", "Request failed. Please try again."));
  }
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(indT("Api_InvalidJson", "Invalid server response."));
  }
}

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function useTopbar(step, canGoNext, onNext, onPrev, busy = false, canSubmitStep2 = true, canAccess = true) {
  useEffect(() => {
    const forward = document.getElementById("globalForwardBtn");
    const back = document.getElementById("globalBackBtn");
    const forwardIcon = document.getElementById("globalForwardIcon");
    const createIcon = document.getElementById("globalCreateIcon");

    if (forward) {
      const isStep2 = step === 2;
      const showForward = canAccess && (isStep2 || (step === 1 && canGoNext));
      forward.style.visibility = showForward ? "visible" : "hidden";
      forward.disabled = !showForward || busy;
      forward.onclick = showForward ? () => onNext() : null;
      forward.setAttribute(
        "aria-label",
        isStep2 ? indT("Common_Create", "Create") : indT("Common_Next", "Next")
      );
      forward.setAttribute("aria-disabled", isStep2 && !canSubmitStep2 ? "true" : "false");
      forward.classList.toggle("opacity-50", isStep2 && !canSubmitStep2);
      forward.classList.toggle("cursor-not-allowed", isStep2 && !canSubmitStep2);

      if (forwardIcon && createIcon) {
        if (isStep2) {
          forwardIcon.classList.add("hidden");
          createIcon.classList.remove("hidden");
        } else {
          forwardIcon.classList.remove("hidden");
          createIcon.classList.add("hidden");
        }
      }
    }
    if (back) {
      const showBack = canAccess && step === 2;
      back.style.visibility = showBack ? "visible" : "hidden";
      back.disabled = !showBack || busy;
      back.onclick = showBack ? () => onPrev() : null;
    }
  }, [step, canGoNext, onNext, onPrev, busy, canSubmitStep2]);
}

const clientCache = makeCache(10);
const contactsCache = makeCache(10);
const cacheKeyWithCompany = (key) => `${CURRENT_COMPANY || "DEFAULT"}::${key}`;
// Keep drafts and caches scoped per company to avoid mixing data.
const VISIT_DRAFT_KEY = `visitas_draft${COMPANY_STORAGE_SUFFIX}`;
const CONTACTS_STORAGE_KEY = `visitas_contacts_cache_v1${COMPANY_STORAGE_SUFFIX}`;
const CONTACTS_SELECTION_KEY = `visitas_contacts_selected_v1${COMPANY_STORAGE_SUFFIX}`;
const CREATE_FRESH_PARAM = "fresh";
const HISTORY_FILTER_KEY = "visitas_history_filter_v1";
const TEXT_EDITOR_PREFIX = "ind_texteditor_";
const TAP_MOVE_PX = 14;
const PREVIEW_HOLD_MS = 160;
const PREVIEW_MAX_HEIGHT_RATIO = 0.8;
const PREVIEW_BASE_FONT = 13;
const PREVIEW_MIN_FONT = 11;

const getCsrfToken = () => {
  const meta = document.querySelector('meta[name="csrf-token"]');
  return meta ? meta.getAttribute("content") : "";
};

const readAndClearTextEditorValue = (fieldId) => {
  const id = String(fieldId || "").trim();
  if (!id) return null;
  const key = `${TEXT_EDITOR_PREFIX}${id}`;
  try {
    const value = sessionStorage.getItem(key);
    if (value === null) return null;
    sessionStorage.removeItem(key);
    return value;
  } catch {
    return null;
  }
};

const clearCreateSelectionCache = () => {
  try {
    sessionStorage.removeItem(VISIT_DRAFT_KEY);
    sessionStorage.removeItem(CONTACTS_STORAGE_KEY);
    sessionStorage.removeItem(CONTACTS_SELECTION_KEY);
  } catch {
    /* ignore */
  }
};

const stripFreshParam = () => {
  if (typeof window === "undefined") return;
  try {
    const url = new URL(window.location.href);
    if (!url.searchParams.has(CREATE_FRESH_PARAM)) return;
    url.searchParams.delete(CREATE_FRESH_PARAM);
    const next = `${url.pathname}${url.search}${url.hash}`;
    window.history.replaceState({}, "", next);
  } catch {
    /* ignore */
  }
};

function ensurePreviewTooltip() {
  let tooltipEl = document.getElementById("indPreviewTooltip");
  if (tooltipEl) return tooltipEl;
  tooltipEl = document.createElement("div");
  tooltipEl.id = "indPreviewTooltip";
  tooltipEl.className = "ind-preview-tooltip";
  document.body.appendChild(tooltipEl);
  return tooltipEl;
}

let previewAnchor = null;
let previewCloseBound = false;

function ensurePreviewAutoClose() {
  if (previewCloseBound) return;
  previewCloseBound = true;
  document.addEventListener("pointerdown", (event) => {
    const tooltipEl = document.getElementById("indPreviewTooltip");
    if (!tooltipEl || !tooltipEl.classList.contains("visible")) return;
    if (previewAnchor && previewAnchor.contains(event.target)) return;
    hidePreviewTooltip();
  }, true);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") hidePreviewTooltip();
  });
}

function showPreviewTooltip(text, clientY) {
  if (!text) return false;
  const tooltipEl = ensurePreviewTooltip();
  tooltipEl.textContent = text;
  tooltipEl.classList.add("visible");
  previewAnchor = null;
  ensurePreviewAutoClose();

  const centerX = Math.round(window.innerWidth / 2);
  tooltipEl.style.left = `${centerX}px`;

  const margin = 12;
  tooltipEl.style.maxHeight = `${Math.round(window.innerHeight * PREVIEW_MAX_HEIGHT_RATIO)}px`;
  tooltipEl.style.overflowY = "auto";

  let fontSize = PREVIEW_BASE_FONT;
  tooltipEl.style.fontSize = `${fontSize}px`;
  let rect = tooltipEl.getBoundingClientRect();
  const maxHeight = window.innerHeight * PREVIEW_MAX_HEIGHT_RATIO;
  while (rect.height > maxHeight && fontSize > PREVIEW_MIN_FONT) {
    fontSize -= 1;
    tooltipEl.style.fontSize = `${fontSize}px`;
    rect = tooltipEl.getBoundingClientRect();
  }

  const centerY = Math.round((window.innerHeight - rect.height) / 2);
  let top = Number.isFinite(centerY) ? centerY : margin;
  const minTop = margin;
  const maxTop = Math.max(margin, window.innerHeight - rect.height - margin);
  if (top < minTop) top = minTop;
  if (top > maxTop) top = maxTop;
  tooltipEl.style.top = `${Math.round(top)}px`;
  return true;
}

function hidePreviewTooltip() {
  const tooltipEl = document.getElementById("indPreviewTooltip");
  if (!tooltipEl) return;
  tooltipEl.classList.remove("visible");
  previewAnchor = null;
}

function isOverflowing(el) {
  if (!el) return false;
  return el.scrollWidth > el.clientWidth + 1 || el.scrollHeight > el.clientHeight + 1;
}

function useTapGuard(onTap, onHoldStart) {
  const stateRef = React.useRef({
    active: false,
    pointerId: null,
    startX: 0,
    startY: 0,
    moved: false,
    held: false,
    target: null,
  });
  const holdTimerRef = React.useRef(null);

  const reset = React.useCallback(() => {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
    stateRef.current.active = false;
    stateRef.current.pointerId = null;
    stateRef.current.moved = false;
    stateRef.current.held = false;
    stateRef.current.target = null;
  }, []);

  const onPointerDown = React.useCallback((event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    stateRef.current.active = true;
    stateRef.current.pointerId = event.pointerId;
    stateRef.current.startX = event.clientX;
    stateRef.current.startY = event.clientY;
    stateRef.current.moved = false;
    stateRef.current.held = false;
    stateRef.current.target = event.currentTarget;

    if (onHoldStart) {
      if (holdTimerRef.current) {
        clearTimeout(holdTimerRef.current);
      }
      holdTimerRef.current = setTimeout(() => {
        const state = stateRef.current;
        if (!state.active || state.moved) return;
        const didShow = onHoldStart(state.target, state.startY);
        state.held = didShow === true;
      }, PREVIEW_HOLD_MS);
    }
  }, [onHoldStart]);

  const onPointerMove = React.useCallback((event) => {
    const state = stateRef.current;
    if (!state.active || state.pointerId !== event.pointerId) return;
    const dx = Math.abs(event.clientX - state.startX);
    const dy = Math.abs(event.clientY - state.startY);
    if (dx > TAP_MOVE_PX || dy > TAP_MOVE_PX) {
      state.moved = true;
      if (holdTimerRef.current) {
        clearTimeout(holdTimerRef.current);
        holdTimerRef.current = null;
      }
      if (state.held) hidePreviewTooltip();
    }
  }, []);

  const onPointerUp = React.useCallback((event) => {
    const state = stateRef.current;
    if (!state.active || state.pointerId !== event.pointerId) return;
    const shouldTap = !state.moved && !state.held;
    reset();
    if (shouldTap) onTap(event);
  }, [onTap, reset]);

  return {
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel: reset,
  };
}

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
  const cacheKey = cacheKeyWithCompany(account);
  if (contactsCache.has(cacheKey)) return contactsCache.get(cacheKey);
  const store = readStorage(CONTACTS_STORAGE_KEY);
  if (store[account]) {
    contactsCache.set(cacheKey, store[account]);
    return store[account];
  }
  return null;
};

const setCachedContacts = (account, items) => {
  if (!account) return;
  contactsCache.set(cacheKeyWithCompany(account), items);
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

const isIsoDate = (value) => /^\d{4}-\d{2}-\d{2}$/.test(String(value || "").trim());

const setHistoryFilterForDate = (isoDate) => {
  const value = String(isoDate || "").trim();
  if (!isIsoDate(value)) return;
  try {
    sessionStorage.setItem(HISTORY_FILTER_KEY, JSON.stringify({ fromDate: value, toDate: value }));
  } catch {
    /* ignore */
  }
};

const flashActionMark = (type, durationMs) => {
  try {
    if (window.IND && typeof window.IND.flashActionMark === "function") {
      window.IND.flashActionMark({ type, durationMs });
    }
  } catch {
    /* ignore */
  }
};

function ClientCombobox({ onSelected, value = null }) {
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState([]);
  const [fetchedQuery, setFetchedQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [status, setStatus] = useState(indFormat("Visits_Create_MinChars", "Type at least {0} characters.", 4));
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
    // If the API returned items but the local filter produces an empty list, keep showing items instead of "No matches".
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
      setStatus(indFormat("Visits_Create_MinChars", "Type at least {0} characters.", 4));
      setOptions([]);
      setHasMore(false);
      return;
    }
    cancelPending();
    setPage(1);
    setHasMore(true);
    setOpen(false);
    const cacheKey = cacheKeyWithCompany(query.trim().toLowerCase());
    if (clientCache.has(cacheKey)) {
      const cached = clientCache.get(cacheKey);
      setFetchedQuery(currentQuery);
      setOptions(cached);
      setStatus(
        cached.length
          ? indFormat("Visits_Create_ClientCountCache", "{0} clients (cache)", cached.length)
          : indT("Visits_Create_NoResults", "No results")
      );
      setHasMore(cached.length === 10);
      setOpen(true);
      return;
    }
    setLoading(true);
    setBlocking(true);
    setStatus(indT("Visits_Create_Searching", "Searching..."));
    const controller = new AbortController();
    abortRef.current = controller;
    let shouldOpenOnFinish = false;
    try {
      const url = `/Visitas/GetAccountsForDropdown?term=${encodeURIComponent(query)}&page=1&pageSize=10`;
      const data = await fetchJson(url, { signal: controller.signal });
      const items = (data.items || []).map(mapAccountItem).filter(Boolean);
      setFetchedQuery(currentQuery);
      clientCache.set(cacheKeyWithCompany(query.trim().toLowerCase()), items);
      setOptions(items);
      setStatus(items.length ? indFormat("Visits_Create_ClientCount", "{0} clients", items.length) : indT("Visits_Create_NoResults", "No results"));
      setHasMore(items.length === 10);
      shouldOpenOnFinish = true;
    } catch (err) {
      if (err?.name === "AbortError") {
        setStatus(indT("Visits_Create_SearchCanceled", "Search canceled."));
      } else if (String(err?.message || "").toLowerCase().includes("timeout")) {
        setStatus(indT("Visits_Create_SearchTimeout", "The search took too long. Type more characters to narrow down."));
      } else {
        setStatus(indT("Visits_Create_LoadClientsError", "Failed to load clients."));
      }
    } finally {
      abortRef.current = null;
      setLoading(false);
      setBlocking(false);
      if (shouldOpenOnFinish) setOpen(true);
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
      const items = (data.items || []).map(mapAccountItem).filter(Boolean);
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

  const requestSearchOrOpen = () => {
    if (loading || blocking) return;
    const trimmed = query.trim();
    if (trimmed.length < 4) {
      cancelPending();
      setOptions([]);
      setHasMore(false);
      setStatus(indFormat("Visits_Create_MinChars", "Type at least {0} characters.", 4));
      setOpen(true);
      return;
    }

    const qKey = trimmed.toLowerCase();
    const isSelectionDisplay = !!selected && query === (selected.text || "");
    const shouldSearch = !isSelectionDisplay && qKey !== fetchedQuery;

    if (shouldSearch) {
      search();
      return;
    }

    setOpen(true);
  };

  const handleKeyDown = (ev) => {
    if (ev.key === "ArrowDown") {
      if (!open) return;
      ev.preventDefault();
      if (filtered.length) setActiveIndex((idx) => (idx + 1) % filtered.length);
      return;
    }
    if (ev.key === "ArrowUp") {
      if (!open) return;
      ev.preventDefault();
      if (filtered.length) setActiveIndex((idx) => (idx - 1 + filtered.length) % filtered.length);
      return;
    }
    if (ev.key === "Enter") {
      ev.preventDefault();
      if (open && filtered.length) {
        selectOption(filtered[activeIndex] ?? filtered[0]);
      } else {
        requestSearchOrOpen();
      }
    }
    if (ev.key === "Escape") {
      setOpen(false);
    }
  };

  const queryKey = query.trim().toLowerCase();
  const isSelectionDisplay = !!selected && query === (selected.text || "");
  const showSearchIcon =
    !loading && !blocking && !isSelectionDisplay && queryKey.length >= 4 && (fetchedQuery === "" || queryKey !== fetchedQuery);

  return (
    <div className="space-y-2" ref={containerRef}>
      <label className="text-sm font-semibold text-slate-700">{indT("Visits_Create_SearchClient", "Search client")}</label>
      <div className="relative">
        <div
          ref={boxRef}
          className="relative w-full cursor-default rounded-xl border-slate-300 bg-white text-left shadow-xs focus-within:border-primary focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-0 sm:text-sm"
        >
          <input
            className="w-full rounded-xl border border-slate-200 px-3 py-2 pr-24 text-sm leading-5 text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-primary focus:border-primary"
            value={query}
            onChange={(event) => {
              const val = event.target.value;
              setQuery(val);
              if (selected && val !== (selected.text || "")) {
                setSelected(null);
                onSelected?.(null);
              }
              cancelPending();
              setFetchedQuery("");
              setOptions([]);
              setHasMore(false);
              setStatus(
                val.trim().length < 4
                  ? indFormat("Visits_Create_MinChars", "Type at least {0} characters.", 4)
                  : indT("Visits_Create_PressSearchHint", "Press search, Enter or ArrowDown to search.")
              );
              setOpen(false);
            }}
            onKeyDown={handleKeyDown}
            placeholder={indFormat("Visits_Create_ClientPlaceholder", "Type at least {0} characters...", 4)}
            readOnly={loading || blocking}
            aria-busy={loading || blocking}
            role="combobox"
            aria-expanded={open}
            aria-controls="client-options"
            aria-activedescendant={
              open && filtered[activeIndex] ? `client-opt-${filtered[activeIndex].value}` : undefined
            }
          />

          <div className="absolute inset-y-0 right-0 flex items-center gap-1 pr-2">
            {(loading || blocking) && (
              <span className="flex items-center px-2" aria-hidden="true">
                <Spinner />
              </span>
            )}

            {showSearchIcon && (
              <button
                type="button"
                className="flex items-center p-1.5 text-slate-400 hover:text-slate-500"
                onClick={requestSearchOrOpen}
                aria-label={indT("Visits_Create_SearchClient", "Search client")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </button>
            )}

            <button
              type="button"
              className="flex items-center p-1.5 text-slate-500 hover:text-slate-600"
              onClick={() => {
                if (loading || blocking) return;
                if (open) {
                  setOpen(false);
                  return;
                }
                requestSearchOrOpen();
              }}
              disabled={loading || blocking}
              aria-label={
                open
                  ? indT("Visits_Create_HideClientOptions", "Hide client options")
                  : indT("Visits_Create_ShowClientOptions", "Show client options")
              }
            >
              {open ? <ChevronUpSvg className="h-5 w-5" /> : <ChevronDownSvg className="h-5 w-5" />}
            </button>
          </div>
        </div>
        <FloatingList anchorRef={boxRef} open={open} zIndex={400000} maxHeightClass="max-h-72" role="listbox" roundedClass="rounded-xl">
          <div ref={listRef} id="client-options">
            {options.length === 0 && (
              <div className="px-4 py-2 text-sm text-slate-500">
                {query.trim().length < 4
                  ? indFormat("Visits_Create_MinChars", "Type at least {0} characters.", 4)
                  : indT("Visits_Create_NoResults", "No results")}
              </div>
            )}
            {!loading && options.length > 0 && filtered.length === 0 && (
              <div className="px-4 py-2 text-sm text-slate-500">{indT("Visits_Create_NoMatches", "No matches")}</div>
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
  const [status, setStatus] = useState(indT("Visits_Create_SelectClientFirst", "Select a client first."));
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

  const primeFromCache = () => {
    const cached = getCachedContacts(accountNum);
    if (cached) {
      setOptions(cached);
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
    setPage(1);
    setHasMore(true);

    if (!accountNum) {
      setOptions([]);
      setSelected([]);
      onChange([]);
      setStatus(indT("Visits_Create_SelectClientFirst", "Select a client first."));
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
      setStatus(indT("Visits_Create_PressArrowToLoadContacts", "Press ArrowDown to load contacts."));
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
    items
      .map((c) => {
        if (isNoDataRow(c)) return null;
        if (Array.isArray(c)) return null;
        const recId = (c.recId || c.RecId || "").toString().trim();
        const name = (c.name || c.Name || "").toString().trim();
        const cargo = (c.cargo || c.Cargo || "").toString().trim();
        const empresa = (c.empresa || c.Empresa || "").toString().trim();
        if (!recId || isNoDataText(name)) return null;
        return {
          value: recId,
          text: name.toUpperCase(),
          cargo: cargo.toUpperCase(),
          empresa: empresa.toUpperCase(),
        };
      })
      .filter(Boolean);

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
    el.addEventListener("scroll", onScroll);
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
    const f = availableOptions.filter(
      (o) => o.text.toLowerCase().includes(q) || o.cargo.toLowerCase().includes(q) || o.empresa.toLowerCase().includes(q)
    );
    return f.length ? f : availableOptions;
  }, [availableOptions, query]);

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
      <label className="text-sm font-semibold text-slate-700">{indT("Visits_Create_SearchContact", "Search contact")}</label>
      <div className="relative">
        <div
          ref={boxRef}
          className="relative w-full cursor-default rounded-xl border-slate-300 bg-white text-left shadow-xs focus-within:border-primary focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-0 sm:text-sm"
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
                    onClick={() => setSelected((prev) => prev.filter((s) => s.value !== c.value))}
                    className="text-primary hover:text-primary/70"
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </button>
              </span>
            ))}
            <input
              className="flex-1 min-w-[120px] bg-transparent text-sm leading-5 text-slate-900 border-none outline-hidden px-1 py-1 focus:ring-0 focus:border-transparent"
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={selected.length ? "" : indT("Visits_Create_FilterPlaceholder", "Type to filter...")}
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
            {open ? <ChevronUpSvg className="h-5 w-5" /> : <ChevronDownSvg className="h-5 w-5" />}
          </button>
        </div>
        <FloatingList anchorRef={boxRef} open={open} zIndex={380000} maxHeightClass="max-h-72" role="listbox" roundedClass="rounded-xl">
          <div ref={listRef} aria-multiselectable="true">
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
                {query.trim() ? indT("Visits_Create_NoMatches", "No matches") : indT("Visits_Create_NoMoreContacts", "No more contacts available")}
              </div>
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
                      <span className={classNames("block truncate", sel ? "font-medium" : "font-normal")}>{opt.text}</span>
                      <span className="block text-xs text-slate-600 truncate">{opt.cargo}</span>
                    </div>
                  </button>
                );
              })}
          </div>
          {blocking && (
            <div className="absolute inset-0 z-70000 bg-white/70 backdrop-blur-[1px] flex items-center justify-center rounded-xl">
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
}

function SelectCombobox({ label, options, value, onChange, placeholder, invalid = false }) {
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

  useEffect(() => {
    setSelected(data.find((d) => String(d.value) === String(value)) || data[0] || { value: "", text: "" });
  }, [value, data]);

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
      <label className={classNames("text-sm font-semibold", invalid ? "text-rose-700" : "text-slate-700")}>
        {label}
      </label>
      <div className="relative">
        <div
          ref={boxRef}
          className="relative w-full cursor-default rounded-xl bg-white text-left focus-within:border-primary focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-white sm:text-sm"
        >
          <input
            className={classNames(
              "w-full rounded-xl border px-3 py-2 pr-10 text-sm leading-5 text-slate-900 focus:outline-hidden focus:ring-2",
              invalid
                ? "border-rose-400 bg-rose-50 focus:ring-rose-200 focus:border-rose-400"
                : "border-slate-200 focus:ring-primary focus:border-primary"
            )}
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
            aria-label={open ? indT("Dropdown_HideOptions", "Hide options") : indT("Dropdown_ShowOptions", "Show options")}
          >
            {open ? <ChevronUpSvg className="h-5 w-5" /> : <ChevronDownSvg className="h-5 w-5" />}
          </button>
        </div>
        <FloatingList anchorRef={boxRef} open={open} zIndex={360000} maxHeightClass="max-h-72" role="listbox" roundedClass="rounded-xl">
          <div id={`select-options-${label}`} ref={listRef} role="listbox" aria-label={label}>
            {filtered.length === 0 && (
              <div className="px-4 py-2 text-sm text-slate-500">{indT("Dropdown_NoResults", "No results")}</div>
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

  const fieldIdComentarios = "Visita.Create.Comentarios";
  const fieldIdAntecedentes = "Visita.Create.Antecedentes";
  const fieldIdConclusiones = "Visita.Create.Conclusiones";

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
  const defaultAsistenteTipo = asistenteTipos[0]?.value ?? asistenteTipos[0]?.Value ?? "0";

  const [visitType, setVisitType] = useState(defaultVisitType);
  const [transDate, setTransDate] = useState(() => todayString());
  const [description, setDescription] = useState("");
  const [comentarios, setComentarios] = useState("");
  const [antecedentes, setAntecedentes] = useState("");
  const [conclusiones, setConclusiones] = useState("");
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [showRequired, setShowRequired] = useState(false);
  const modalConfirmInFlightRef = useRef(false);
  const draftRestoredRef = useRef(false);
  const [modalError, setModalError] = useState("");

  const [modal, setModal] = useState({
    open: false,
    title: "",
    message: "",
    confirmText: indT("Confirm_Yes", "OK"),
    cancelText: indT("Confirm_No", "Cancel"),
    onConfirm: null,
  });

  const closeModal = React.useCallback(() => {
    setModal((m) => ({ ...m, open: false }));
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search || "");
    const isFresh = params.get(CREATE_FRESH_PARAM) === "1";
    if (isFresh) {
      clearCreateSelectionCache();
      stripFreshParam();
    }
  }, []);

  const openConfirmModal = React.useCallback((opts) => {
    setModalError("");
    setModal({
      open: true,
      title: opts?.title || "",
      message: opts?.message || "",
      confirmText: opts?.confirmText || indT("Confirm_Yes", "OK"),
      cancelText: indT("Confirm_No", "Cancel"),
      onConfirm: opts?.onConfirm || null,
    });
  }, []);

  const handleModalConfirm = React.useCallback(async () => {
    if (busy) return;
    const cb = modal.onConfirm;
    if (typeof cb !== "function") {
      closeModal();
      return;
    }
    if (modalConfirmInFlightRef.current) return;
    modalConfirmInFlightRef.current = true;
    setModalError("");
    try {
      const result = await cb();
      if (result !== false) {
        closeModal();
      }
    } catch (err) {
      console.error("Modal confirm failed:", err);
      const msg = err?.message || indT("Api_RequestFailed", "Request failed. Please try again.");
      setModalError(msg);
      setStatus(msg);
    } finally {
      modalConfirmInFlightRef.current = false;
    }
  }, [busy, modal.onConfirm, closeModal]);

  // Build a draft snapshot for sessionStorage.
  const buildDraft = React.useCallback(
    () => ({
      selectedClient,
      selectedContacts,
      visitType,
      transDate,
      description,
      comentarios,
      antecedentes,
      conclusiones,
      step,
    }),
    [selectedClient, selectedContacts, visitType, transDate, description, comentarios, antecedentes, conclusiones, step]
  );

  // Store the draft before leaving the page to keep step 2 on return.
  const persistDraftNow = React.useCallback(() => {
    const draft = buildDraft();
    try {
      sessionStorage.setItem(VISIT_DRAFT_KEY, JSON.stringify(draft));
    } catch {
      /* ignore quota errors */
    }
  }, [buildDraft]);

  // Opens the full-screen text editor for a multiline field.
  const openTextEditor = React.useCallback((fieldId, fieldLabel, fieldValue, options = {}) => {
    const safeId = String(fieldId || "").trim();
    const safeLabel = String(fieldLabel || "").trim();
    const allowEdit = options?.allowEdit !== false;
    if (!safeId || !safeLabel) return;

    try {
      const key = `${TEXT_EDITOR_PREFIX}${safeId}`;
      // Prime the editor with the current value without pushing large text into the URL.
      if (sessionStorage.getItem(key) === null) {
        sessionStorage.setItem(key, String(fieldValue || ""));
      }
    } catch {
      /* ignore */
    }

    persistDraftNow();
    const returnUrl = `${window.location.pathname}${window.location.search || ""}`;
    try {
      sessionStorage.setItem(`${TEXT_EDITOR_PREFIX}${safeId}_returnUrl`, returnUrl);
    } catch {
      /* ignore */
    }
    const url =
      `/TextEditorReact/EditField?fieldId=${encodeURIComponent(safeId)}` +
      `&fieldLabel=${encodeURIComponent(safeLabel)}` +
      `&returnUrl=${encodeURIComponent(returnUrl)}` +
      `&allowEdit=${allowEdit ? "1" : "0"}`;

    window.location.href = url;
  }, [persistDraftNow]);

  const handleComentariosTap = React.useCallback((event) => {
    if (busy) return;
    event.preventDefault();
    openTextEditor(fieldIdComentarios, indT("Visits_Field_Comments", "Comments"), comentarios);
  }, [busy, comentarios, openTextEditor]);

  const handleComentariosHold = React.useCallback((target, clientY) => {
    if (!target || !isOverflowing(target)) return false;
    previewAnchor = target;
    return showPreviewTooltip(String(comentarios || ""), clientY);
  }, [comentarios]);

  const handleAntecedentesTap = React.useCallback((event) => {
    if (busy) return;
    event.preventDefault();
    openTextEditor(fieldIdAntecedentes, indT("Visits_Field_Background", "Background"), antecedentes);
  }, [busy, antecedentes, openTextEditor]);

  const handleAntecedentesHold = React.useCallback((target, clientY) => {
    if (!target || !isOverflowing(target)) return false;
    previewAnchor = target;
    return showPreviewTooltip(String(antecedentes || ""), clientY);
  }, [antecedentes]);

  const handleConclusionesTap = React.useCallback((event) => {
    if (busy) return;
    event.preventDefault();
    openTextEditor(fieldIdConclusiones, indT("Visits_Field_Conclusions", "Conclusions"), conclusiones);
  }, [busy, conclusiones, openTextEditor]);

  const handleConclusionesHold = React.useCallback((target, clientY) => {
    if (!target || !isOverflowing(target)) return false;
    previewAnchor = target;
    return showPreviewTooltip(String(conclusiones || ""), clientY);
  }, [conclusiones]);

  const comentariosTap = useTapGuard(handleComentariosTap, handleComentariosHold);
  const antecedentesTap = useTapGuard(handleAntecedentesTap, handleAntecedentesHold);
  const conclusionesTap = useTapGuard(handleConclusionesTap, handleConclusionesHold);

  const applyTextEditorValues = React.useCallback(() => {
    const valComentarios = readAndClearTextEditorValue(fieldIdComentarios);
    if (valComentarios !== null) setComentarios(valComentarios);

    const valAntecedentes = readAndClearTextEditorValue(fieldIdAntecedentes);
    if (valAntecedentes !== null) setAntecedentes(valAntecedentes);

    const valConclusiones = readAndClearTextEditorValue(fieldIdConclusiones);
    if (valConclusiones !== null) setConclusiones(valConclusiones);
  }, [fieldIdComentarios, fieldIdAntecedentes, fieldIdConclusiones]);

  // Clear contacts only when the client changes (avoid clearing on restore/step 2 return).
  const prevClientRef = useRef(null);
  useEffect(() => {
    const current = selectedClient?.value;
    if (prevClientRef.current && prevClientRef.current !== current) {
      setSelectedContacts([]);
    }
    prevClientRef.current = current;
  }, [selectedClient?.value]);

  const lastClientRef = useRef(null);

  // If the client changes after selecting contacts, reset the entire form.
  useEffect(() => {
    const current = selectedClient?.value;
    if (!current) return;

    if (lastClientRef.current && lastClientRef.current !== current) {
      setStep(1);
      setSelectedContacts([]);
      setVisitType(defaultVisitType);
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

  // Persist draft in sessionStorage (skip until we restored any saved draft).
  useEffect(() => {
    if (!draftRestoredRef.current) return;
    const draft = buildDraft();
    try {
      sessionStorage.setItem(VISIT_DRAFT_KEY, JSON.stringify(draft));
    } catch {
      /* ignore quota errors */
    }
  }, [buildDraft]);

  // Restore draft on mount
  useEffect(() => {
    let shouldShow = false;
    try {
      shouldShow = !!(
        sessionStorage.getItem(VISIT_DRAFT_KEY) ||
        sessionStorage.getItem(CONTACTS_STORAGE_KEY) ||
        sessionStorage.getItem(CONTACTS_SELECTION_KEY)
      );
    } catch {
      /* ignore storage access */
    }
    if (shouldShow) {
      showGlobalSpinner(indT("Common_Loading", "Loading"));
    }
    try {
      const raw = sessionStorage.getItem(VISIT_DRAFT_KEY);
      if (raw) {
        const draft = JSON.parse(raw);
        if (draft?.selectedClient?.value) setSelectedClient(draft.selectedClient);
        if (Array.isArray(draft?.selectedContacts)) setSelectedContacts(draft.selectedContacts);
        if (draft?.visitType !== undefined) setVisitType(draft.visitType);
        if (draft?.transDate) setTransDate(draft.transDate);
        if (draft?.description !== undefined) setDescription(draft.description);
        if (draft?.comentarios !== undefined) setComentarios(draft.comentarios);
        if (draft?.antecedentes !== undefined) setAntecedentes(draft.antecedentes);
        if (draft?.conclusiones !== undefined) setConclusiones(draft.conclusiones);
        if (draft?.step === 2) setStep(2);
      }
    } catch {
      /* ignore parse issues */
    } finally {
      if (shouldShow) {
        hideGlobalSpinner();
      }
    }
    draftRestoredRef.current = true;
  }, []);

  // Apply pending values coming from the full-screen text editor.
  useEffect(() => {
    applyTextEditorValues();
    const onPageShow = () => applyTextEditorValues();
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, [applyTextEditorValues]);

  // Store selection per client to restore on return.
  useEffect(() => {
    if (selectedClient?.value) {
      setStoredSelection(selectedClient.value, selectedContacts);
    }
  }, [selectedClient?.value, selectedContacts]);

  const canGoNext = !!selectedClient && selectedContacts.length > 0;
  const canCreate =
    !!selectedClient &&
    selectedContacts.length > 0 &&
    String(visitType || "").trim() !== "" &&
    String(visitType) !== "0" &&
    description.trim().length > 0 &&
    comentarios.trim().length > 0;

  useTopbar(
    step,
    canGoNext,
    () => {
      if (!canCreateVisit) {
        showPermissionModal();
        return;
      }
      if (step === 1 && canGoNext) setStep(2);
      if (step === 2) handleSubmit();
    },
    () => setStep(1),
    busy,
    canCreate,
    canCreateVisit
  );

  const doCreate = async () => {
    if (busy) return false;
    if (!canCreateVisit) {
      showPermissionModal();
      return false;
    }
    setModalError("");
    if (!selectedClient) {
      setStatus(indT("Visits_Create_SelectClientRequired", "Select a client."));
      return false;
    }
    if (!selectedContacts.length) {
      setStatus(indT("Visits_Create_SelectContactRequired", "Select at least one contact."));
      return false;
    }
    if (String(visitType || "") === "" || String(visitType) === "0" || !description.trim() || !comentarios.trim()) {
      setShowRequired(true);
      setStatus(indT("Visits_Create_CompleteRequired", "Complete required fields."));
      return false;
    }
    setBusy(true);
    setStatus(indT("Visits_Create_CreatingActivity", "Creating activity..."));

    let createdRecId = "";
    try {
      const payloadActivity = {
        accountNum: selectedClient.value,
        visitType,
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

      if (!resAct.success) throw new Error(resAct.message || indT("Visits_Create_CreateActivityFailed", "Failed to create activity."));

      const recIdActividad =
        indExtractSignedId(resAct.data) ||
        indExtractSignedId(resAct.message) ||
        indExtractSignedId(indExtractId(resAct.data) || indExtractId(resAct.message));
      if (!recIdActividad) throw new Error(indT("Visits_Create_CreateActivityFailed", "Failed to create activity."));
      createdRecId = String(recIdActividad);

      for (let idx = 0; idx < selectedContacts.length; idx++) {
        const c = selectedContacts[idx];
        setStatus(indFormat("Visits_Create_CreatingVisitFor", "Creating visit for {0}...", c.text));
        const payloadVisita = {
          refRecIdActividad: recIdActividad,
          asistenteTipo: defaultAsistenteTipo,
          asistenteId: c.text,
          contactoRecId: c.value,
        };
        const resVis = await fetchJson("/Visitas/CreateVisitaAsistente", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payloadVisita),
        });
        if (!resVis.success) throw new Error(resVis.message || indT("Visits_Create_CreateVisitFailed", "Failed to create visit."));
      }

      try {
        sessionStorage.removeItem(VISIT_DRAFT_KEY);
      } catch {
        /* ignore */
      }

      setHistoryFilterForDate(transDate);
      closeModal();
      flashActionMark("okProcess", 1500);
      await wait(1500);
      window.location.href = "/Historial/History";
      return true;
    } catch (e) {
      if (createdRecId && canRollbackDelete) {
        try {
          setStatus(indT("Visits_Create_Rollback", "Rolling back activity..."));
          await fetchJson(`/Visitas/DeleteActivity/${encodeURIComponent(createdRecId)}`, {
            method: "DELETE",
            suppressPermissionModal: true,
          });
        } catch (cleanupErr) {
          console.error("Rollback delete activity failed:", cleanupErr);
        }
      }
      const msg = e.message || indT("Visits_Create_CreateVisitError", "Failed to create the visit.");
      setModalError(msg);
      setStatus(msg);
      flashActionMark("errorProcess", 1500);
      setBusy(false);
      return false;
    }
  };

  const handleSubmit = () => {
    if (busy) return;
    if (!canCreateVisit) {
      showPermissionModal();
      return;
    }
    if (modal.open) return;
    if (!selectedClient) {
      setStatus(indT("Visits_Create_SelectClientRequired", "Select a client."));
      return;
    }
    if (!selectedContacts.length) {
      setStatus(indT("Visits_Create_SelectContactRequired", "Select at least one contact."));
      return;
    }
    if (String(visitType || "") === "" || String(visitType) === "0" || !description.trim() || !comentarios.trim()) {
      setShowRequired(true);
      setStatus(indT("Visits_Create_CompleteRequired", "Complete required fields."));
      return;
    }
    openConfirmModal({
      title: indT("Visits_Create_ConfirmCreate_Title", "Confirm create"),
      message: indT("Visits_Create_ConfirmCreate_Body", "Do you want to create this visit?"),
      confirmText: indT("Confirm_Yes", "OK"),
      onConfirm: doCreate,
    });
  };

  useEffect(() => {
    if (step === 1) {
      setShowRequired(false);
      closeModal();
    }
  }, [step, closeModal]);

  const visitTypeInvalid = showRequired && (String(visitType || "") === "" || String(visitType) === "0");
  const descriptionInvalid = showRequired && description.trim().length === 0;
  const comentariosInvalid = showRequired && comentarios.trim().length === 0;

  return (
    <div className="space-y-4">
      {modal.open &&
        createPortal(
          <div className="fixed inset-0 z-600000 flex items-center justify-center bg-black/40 backdrop-blur-[1px] px-4">
            <div className="w-full max-w-sm rounded-2xl bg-white shadow-xl border border-slate-200 p-5 space-y-4">
               <div className="text-lg font-semibold text-slate-900">{modal.title}</div>
               <div className="text-sm text-slate-700 whitespace-pre-line">{modal.message}</div>
              {(busy || !!modalError) && (
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  {busy && <Spinner size="h-4 w-4" />}
                  <span className={modalError && !busy ? "text-rose-700" : ""}>
                    {busy ? (status || indT("Common_Loading", "Loading")) : modalError}
                  </span>
                </div>
              )}
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 hover:border-primary hover:text-primary transition"
                  onClick={closeModal}
                  disabled={busy}
                >
                  {modal.cancelText || indT("Confirm_No", "Cancel")}
                </button>
                <button
                  type="button"
                  className="px-4 py-2 rounded-xl bg-primary text-white hover:bg-primary/90 transition"
                  onClick={!busy && !!modalError ? closeModal : handleModalConfirm}
                  disabled={busy}
                >
                  {busy
                    ? indT("Common_Loading", "Loading")
                    : (!busy && !!modalError ? indT("Common_OK", "OK") : (modal.confirmText || indT("Confirm_Yes", "OK")))}
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
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
                {indFormat("Visits_Create_SelectedContactsCount", "{0} selected contact(s)", selectedContacts.length)}
              </div>
            )}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="shadow-xs glass-panel p-4 space-y-4 border border-slate-200 rounded-2xl">
          <div className="text-base font-semibold text-slate-900 border-b border-slate-200 pb-3">
            {indT("Visits_Create_VisitData_Title", "Visit details")}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SingleDatePicker label={indT("Visits_Detail_Date_Label", "Date")} value={transDate} onChange={setTransDate} />
            <SelectCombobox
              label={indT("Visits_Detail_VisitType_Label", "Visit type")}
              options={visitTypes}
              value={visitType}
              onChange={setVisitType}
              placeholder={indT("Visits_Detail_VisitType_Placeholder", "Select type")}
              invalid={visitTypeInvalid}
            />
          </div>

          <div className="grid grid-cols-1 gap-3">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">{indT("Visits_Field_Description", "Description")}</label>
              <input
                id="description"
                className={classNames(
                  "w-full rounded-xl border px-3 py-2 text-slate-900 focus:outline-hidden focus:ring-2",
                  descriptionInvalid
                    ? "border-rose-400 bg-rose-50 focus:ring-rose-200 focus:border-rose-400"
                    : "border-slate-200 focus:ring-primary focus:border-primary"
                )}
                maxLength={200}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">{indT("Visits_Field_Comments", "Comments")}</label>
              <textarea
                id="comentarios"
                className={classNames(
                  "w-full cursor-pointer rounded-xl border px-3 py-2 text-slate-900 focus:outline-hidden focus:ring-2",
                  comentariosInvalid
                    ? "border-rose-400 bg-rose-50 focus:ring-rose-200 focus:border-rose-400"
                    : "border-slate-200 focus:ring-primary focus:border-primary"
                )}
                value={comentarios}
                readOnly
                onPointerDown={comentariosTap.onPointerDown}
                onPointerMove={comentariosTap.onPointerMove}
                onPointerUp={comentariosTap.onPointerUp}
                onPointerCancel={comentariosTap.onPointerCancel}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">{indT("Visits_Field_Background", "Background")}</label>
              <textarea
                id="antecedentes"
                className="w-full cursor-pointer rounded-xl border border-slate-200 px-3 py-2 text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-primary focus:border-primary"
                value={antecedentes}
                readOnly
                onPointerDown={antecedentesTap.onPointerDown}
                onPointerMove={antecedentesTap.onPointerMove}
                onPointerUp={antecedentesTap.onPointerUp}
                onPointerCancel={antecedentesTap.onPointerCancel}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">{indT("Visits_Field_Conclusions", "Conclusions")}</label>
              <textarea
                id="conclusiones"
                className="w-full cursor-pointer rounded-xl border border-slate-200 px-3 py-2 text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-primary focus:border-primary"
                value={conclusiones}
                readOnly
                onPointerDown={conclusionesTap.onPointerDown}
                onPointerMove={conclusionesTap.onPointerMove}
                onPointerUp={conclusionesTap.onPointerUp}
                onPointerCancel={conclusionesTap.onPointerCancel}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
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
          {indT("Visits_Create_ErrorBoundary", "An error occurred while rendering the visits page. Reload and try again.")}
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
