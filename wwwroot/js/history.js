import {
  ClientSearchCombobox_default
} from "./chunks/chunk-AW63WUOB.js";
import {
  ActionButton_default,
  FilterButton_default,
  HistoryManualDatePicker_default,
  HistorySummary_default
} from "./chunks/chunk-KUB6AHHP.js";
import {
  FloatingActionButton_default
} from "./chunks/chunk-LZSH3IN4.js";
import "./chunks/chunk-YMDESVRK.js";
import {
  CompactPagination_default,
  useTimelineCardEffects
} from "./chunks/chunk-EJOK676V.js";
import "./chunks/chunk-OSBLOXTE.js";
import {
  HISTORY_FILTER_KEY,
  HISTORY_RETURN_FLAG_KEY
} from "./chunks/chunk-CBDB7NMA.js";
import {
  setTopbarActionGroupReady
} from "./chunks/chunk-ZBKHPZJX.js";
import {
  canAccess,
  classNames,
  showPermissionModal
} from "./chunks/chunk-UNQYUM6B.js";
import {
  mountReactIsland,
  mountWhenDocumentReady,
  require_jsx_runtime,
  require_react
} from "./chunks/chunk-2NKOKBT5.js";
import {
  ApiFetchError,
  fetchJson,
  indT
} from "./chunks/chunk-PNIKV5DC.js";
import {
  getSessionJsonWithExpiry,
  getSessionValueWithExpiry,
  removeSessionValueWithExpiry,
  setSessionJsonWithExpiry,
  setSessionValueWithExpiry
} from "./chunks/chunk-6HGCHSZG.js";
import {
  __toESM
} from "./chunks/chunk-W7NC74ZX.js";

// Web/wwwroot/react/src/pages/visitas/historial/HistoryPage.tsx
var import_react7 = __toESM(require_react());

// Web/wwwroot/react/src/pages/visitas/historial/HistoryTable.tsx
var import_react = __toESM(require_react());
var import_jsx_runtime = __toESM(require_jsx_runtime());
var TAP_MOVE_PX = 14;
var HOLD_TO_PREVIEW_MS = 160;
var HistoryTable = ({ items, noDataText, errorMessage, onNavigate }) => {
  const containerRef = (0, import_react.useRef)(null);
  const tapGuardRef = (0, import_react.useRef)({
    active: false,
    pointerId: null,
    startX: 0,
    startY: 0,
    startTime: 0,
    moved: false,
    linkId: ""
  });
  const resolveClickableCard = (0, import_react.useCallback)((target) => {
    const node = target;
    if (!node || typeof node.closest !== "function") return null;
    const card = node.closest(".timeline-card--clickable[data-link-id]");
    if (!card) return null;
    if (!containerRef.current?.contains(card)) return null;
    return card;
  }, []);
  const resetTapGuard = (0, import_react.useCallback)(() => {
    tapGuardRef.current.active = false;
    tapGuardRef.current.pointerId = null;
    tapGuardRef.current.moved = false;
    tapGuardRef.current.linkId = "";
  }, []);
  const handlePointerDown = (0, import_react.useCallback)(
    (event) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      const card = resolveClickableCard(event.target);
      if (!card) return;
      const linkId = card.dataset.linkId || "";
      if (!linkId) return;
      tapGuardRef.current.active = true;
      tapGuardRef.current.pointerId = event.pointerId;
      tapGuardRef.current.startX = event.clientX;
      tapGuardRef.current.startY = event.clientY;
      tapGuardRef.current.startTime = Date.now();
      tapGuardRef.current.moved = false;
      tapGuardRef.current.linkId = linkId;
    },
    [resolveClickableCard]
  );
  const handlePointerMove = (0, import_react.useCallback)((event) => {
    const state = tapGuardRef.current;
    if (!state.active || event.pointerId !== state.pointerId) return;
    const dx = Math.abs(event.clientX - state.startX);
    const dy = Math.abs(event.clientY - state.startY);
    if (dx > TAP_MOVE_PX || dy > TAP_MOVE_PX) {
      state.moved = true;
    }
  }, []);
  const handlePointerUp = (0, import_react.useCallback)(
    (event) => {
      const state = tapGuardRef.current;
      if (!state.active || event.pointerId !== state.pointerId) return;
      const linkId = state.linkId;
      const heldMs = Date.now() - state.startTime;
      const shouldTap = !state.moved && heldMs < HOLD_TO_PREVIEW_MS;
      resetTapGuard();
      if (shouldTap && linkId) {
        onNavigate(linkId);
      }
    },
    [onNavigate, resetTapGuard]
  );
  const blockClipboardAction = (0, import_react.useCallback)(
    (event) => {
      if (!resolveClickableCard(event.target)) return;
      event.preventDefault();
    },
    [resolveClickableCard]
  );
  useTimelineCardEffects({ containerRef, errorMessage, items, resolveClickableCard });
  const hasItems = items.length > 0;
  const showEmpty = !errorMessage && !hasItems;
  const content = errorMessage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-danger", children: errorMessage }) : hasItems ? items.map((item, index) => {
    const key = item.id || item.recId?.toString() || `timeline-${index}`;
    const isClickable = !item.isNoData && !!item.id;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "timeline-item", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "div",
      {
        className: classNames(
          "timeline-card",
          item.isNoData ? "timeline-card--nodata" : "",
          isClickable ? "timeline-card--clickable" : ""
        ),
        "data-actividadid": item.actividadId || "",
        "data-recid": item.recId != null ? String(item.recId) : "",
        "data-link-id": isClickable ? item.id : "",
        role: isClickable ? "button" : void 0,
        tabIndex: isClickable ? 0 : void 0,
        "aria-label": isClickable ? item.fullName || item.name || noDataText : void 0,
        onKeyDown: isClickable ? (event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onNavigate(item.id);
          }
        } : void 0,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "timeline-date-panel flex flex-col items-center justify-center gap-1 px-3 py-3 bg-slate-50 border-r border-slate-200 text-slate-600", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-xs font-semibold tracking-[0.2em] text-slate-500", children: item.dateParts.year }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-xs font-semibold uppercase tracking-[0.2em] text-slate-500", children: item.dateParts.month }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-2xl font-semibold text-primary", children: item.dateParts.day })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "timeline-card__content flex-1 py-3 px-4", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "timeline-name", "data-fulltext": item.fullName || item.name, children: item.name }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "timeline-desc-text", "data-fulltext": item.fullDesc || item.description, children: item.description || noDataText })
          ] })
        ]
      }
    ) }, key);
  }) : null;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "div",
    {
      id: "timelineContainer",
      ref: containerRef,
      className: classNames("timeline-box", showEmpty ? "timeline-empty" : ""),
      "data-empty-text": noDataText,
      onPointerDownCapture: handlePointerDown,
      onPointerMoveCapture: handlePointerMove,
      onPointerUpCapture: handlePointerUp,
      onPointerCancelCapture: resetTapGuard,
      onPointerLeave: resetTapGuard,
      onContextMenuCapture: blockClipboardAction,
      onCopyCapture: blockClipboardAction,
      onCutCapture: blockClipboardAction,
      onPasteCapture: blockClipboardAction,
      children: content
    }
  );
};
var MemoizedHistoryTable = import_react.default.memo(HistoryTable);
MemoizedHistoryTable.displayName = "HistoryTable";
var HistoryTable_default = MemoizedHistoryTable;

// Web/wwwroot/react/src/pages/visitas/historial/useHistoryPageListeners.ts
var import_react2 = __toESM(require_react());
var useHistoryPageListeners = ({
  isOpen,
  activatorRef,
  popoverRef,
  hasRestoredFilterRef,
  retryOnNetworkErrorRef,
  currentPage,
  logHistory: logHistory2,
  consumeReturnFlag,
  readCachedFilter,
  applyCachedFilter,
  loadActivities,
  setIsOpen,
  setHoverDate,
  setShowFilters,
  applyFilters
}) => {
  (0, import_react2.useEffect)(() => {
    setTopbarActionGroupReady("history-list-actions");
  }, []);
  (0, import_react2.useEffect)(() => {
    if (!isOpen) return;
    const handleOutside = (event) => {
      const target = event.target;
      if (!target) return;
      if (popoverRef.current?.contains(target)) return;
      if (activatorRef.current?.contains(target)) return;
      logHistory2("closePopover:outside");
      setIsOpen(false);
      setHoverDate(null);
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [activatorRef, isOpen, logHistory2, popoverRef, setHoverDate, setIsOpen]);
  (0, import_react2.useEffect)(() => {
    const onPageShow = () => {
      if (hasRestoredFilterRef.current) return;
      if (consumeReturnFlag()) {
        const cached = readCachedFilter();
        const cachedRequest = applyCachedFilter(cached);
        if (cachedRequest) {
          retryOnNetworkErrorRef.current = true;
          loadActivities(cachedRequest.page, cachedRequest.override);
          setShowFilters(false);
          setIsOpen(false);
          hasRestoredFilterRef.current = true;
        }
      }
    };
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, [
    applyCachedFilter,
    consumeReturnFlag,
    hasRestoredFilterRef,
    loadActivities,
    readCachedFilter,
    retryOnNetworkErrorRef,
    setIsOpen,
    setShowFilters
  ]);
  (0, import_react2.useEffect)(() => {
    const onToggleFilters = () => {
      setShowFilters((prev) => {
        const next = !prev;
        if (!next) {
          setIsOpen(false);
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
        return next;
      });
    };
    const onRefresh = () => {
      applyFilters({ page: currentPage, force: true, closePanel: true });
    };
    window.addEventListener("history-toggle-filter", onToggleFilters);
    window.addEventListener("history-refresh", onRefresh);
    return () => {
      window.removeEventListener("history-toggle-filter", onToggleFilters);
      window.removeEventListener("history-refresh", onRefresh);
    };
  }, [applyFilters, currentPage, setIsOpen, setShowFilters]);
};

// Web/wwwroot/react/src/pages/visitas/historial/useHistoryTimelineItems.ts
var import_react3 = __toESM(require_react());
var useHistoryTimelineItems = ({
  items,
  locale,
  noDataText,
  logHistory: logHistory2,
  toTitleCase: toTitleCase2,
  formatDateParts: formatDateParts2
}) => {
  const debugLoggedRef = (0, import_react3.useRef)(0);
  const timelineItems = (0, import_react3.useMemo)(() => {
    return items.map((entry) => {
      const actividadIdRaw = (entry.actividadId ?? entry.ActividadId ?? "").toString().trim();
      const actividadId = actividadIdRaw || "";
      const recIdRaw = entry.recId ?? entry.RecId ?? "";
      const recId = recIdRaw && !Number.isNaN(Number(recIdRaw)) ? Number(recIdRaw) : null;
      let linkId = actividadId || (recId ? recId.toString() : "");
      if (debugLoggedRef.current < 5) {
        logHistory2("activity item", { actividadId, recIdRaw, recId });
        debugLoggedRef.current += 1;
      }
      const rawName = (entry.name ?? entry.Name ?? "").toString().trim();
      const fullName = toTitleCase2(rawName, locale);
      const fecha = (entry.transDate ?? entry.TransDate ?? "").toString();
      const rawDesc = (entry.description ?? entry.Description ?? "").toString().trim();
      const fullDesc = rawDesc;
      const isNoDataCard = !rawName && !rawDesc;
      if (isNoDataCard) {
        linkId = "";
      }
      return {
        id: linkId,
        actividadId,
        recId,
        name: fullName,
        description: fullDesc || noDataText,
        fullName,
        fullDesc,
        dateParts: formatDateParts2(fecha, locale),
        isNoData: isNoDataCard
      };
    });
  }, [formatDateParts2, items, locale, logHistory2, noDataText, toTitleCase2]);
  return { timelineItems };
};

// Web/wwwroot/react/src/hooks/useHistoryActivities.ts
var import_react4 = __toESM(require_react());
var useHistoryActivities = ({
  fromDateValue,
  toDateValue,
  accountNumValue,
  pageSize,
  retryDelayMs = 600,
  normalizeRange: normalizeRange2,
  onForbidden,
  onDebug
}) => {
  const [items, setItems] = (0, import_react4.useState)([]);
  const [total, setTotal] = (0, import_react4.useState)(0);
  const [currentPage, setCurrentPage] = (0, import_react4.useState)(1);
  const [isLoading, setIsLoading] = (0, import_react4.useState)(false);
  const [errorMessage, setErrorMessage] = (0, import_react4.useState)("");
  const retryOnNetworkErrorRef = (0, import_react4.useRef)(false);
  const activeAbortRef = (0, import_react4.useRef)(null);
  const activeRequestIdRef = (0, import_react4.useRef)(0);
  const retryTimerRef = (0, import_react4.useRef)(null);
  const lastSignatureRef = (0, import_react4.useRef)("");
  const clearRetryTimer = (0, import_react4.useCallback)(() => {
    if (retryTimerRef.current) {
      clearTimeout(retryTimerRef.current);
      retryTimerRef.current = null;
    }
  }, []);
  const abortActiveRequest = (0, import_react4.useCallback)(() => {
    if (!activeAbortRef.current) return;
    try {
      activeAbortRef.current.abort();
    } catch {
    }
    activeAbortRef.current = null;
  }, []);
  const resetActivities = (0, import_react4.useCallback)(() => {
    clearRetryTimer();
    abortActiveRequest();
    setItems([]);
    setTotal(0);
    setErrorMessage("");
    setIsLoading(false);
  }, [abortActiveRequest, clearRetryTimer]);
  const loadActivities = (0, import_react4.useCallback)(
    async (page, override) => {
      const fromDateStr = override?.fromDate ?? fromDateValue;
      const toDateStr = override?.toDate ?? toDateValue;
      const accountNumStr = override?.accountNum ?? accountNumValue;
      if (!fromDateStr || !toDateStr) {
        setIsLoading(false);
        setItems([]);
        setTotal(0);
        setErrorMessage("");
        return;
      }
      setCurrentPage(page);
      clearRetryTimer();
      const requestId = ++activeRequestIdRef.current;
      abortActiveRequest();
      const controller = new AbortController();
      activeAbortRef.current = controller;
      const normalized = normalizeRange2(fromDateStr, toDateStr);
      const filterSignature = `${normalized.from}|${normalized.to}|${accountNumStr}|${page}`;
      lastSignatureRef.current = filterSignature;
      setIsLoading(true);
      setItems([]);
      setTotal(0);
      setErrorMessage("");
      const payload = {
        fromDate: normalized.from,
        toDate: normalized.to,
        accountNum: accountNumStr
      };
      onDebug?.("loadActivities:request", { page, pageSize, payload });
      let data;
      try {
        data = await fetchJson(`/Historial/GetActivities?page=${page}&pageSize=${pageSize}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          signal: controller.signal,
          suppressPermissionModal: true
        });
      } catch (err) {
        if (requestId !== activeRequestIdRef.current) return;
        if (err?.name === "AbortError") {
          activeAbortRef.current = null;
          return;
        }
        if (err instanceof ApiFetchError && err.status === 403) {
          setIsLoading(false);
          activeAbortRef.current = null;
          onForbidden();
          return;
        }
        const isNetworkError = !(err instanceof ApiFetchError) || typeof err.status !== "number";
        if (isNetworkError && retryOnNetworkErrorRef.current) {
          retryOnNetworkErrorRef.current = false;
          activeAbortRef.current = null;
          retryTimerRef.current = window.setTimeout(() => {
            if (requestId !== activeRequestIdRef.current) return;
            if (lastSignatureRef.current !== filterSignature) return;
            loadActivities(page, {
              fromDate: fromDateStr,
              toDate: toDateStr,
              accountNum: accountNumStr
            });
          }, retryDelayMs);
          return;
        }
        setIsLoading(false);
        setErrorMessage(err?.message || indT("Api_RequestFailed", "No se pudo conectar con el servidor (red)."));
        activeAbortRef.current = null;
        return;
      }
      if (requestId !== activeRequestIdRef.current) return;
      onDebug?.("loadActivities:response", {
        status: 200,
        total: data?.total ?? 0,
        count: Array.isArray(data?.items) ? data.items.length : 0
      });
      setIsLoading(false);
      setItems(data.items || []);
      setTotal(data.total || (data.items || []).length);
      activeAbortRef.current = null;
    },
    [
      abortActiveRequest,
      accountNumValue,
      clearRetryTimer,
      fromDateValue,
      normalizeRange2,
      onDebug,
      onForbidden,
      pageSize,
      retryDelayMs,
      toDateValue
    ]
  );
  (0, import_react4.useEffect)(() => {
    return () => {
      clearRetryTimer();
      abortActiveRequest();
    };
  }, [abortActiveRequest, clearRetryTimer]);
  return {
    items,
    total,
    currentPage,
    isLoading,
    errorMessage,
    loadActivities,
    resetActivities,
    retryOnNetworkErrorRef,
    lastSignatureRef
  };
};

// Web/wwwroot/react/src/hooks/useHistoryFilterCache.ts
var import_react5 = __toESM(require_react());
var HISTORY_CACHE_TTL_MS = 12 * 60 * 60 * 1e3;
var normalizeCachedFilter = (value) => {
  if (!value || typeof value !== "object") return null;
  return {
    fromDate: value.fromDate || "",
    toDate: value.toDate || "",
    page: value.page,
    clientAccount: value.clientAccount || "",
    clientText: value.clientText || ""
  };
};
var useHistoryFilterCache = () => {
  const readCachedFilter = (0, import_react5.useCallback)(() => {
    const parsed = getSessionJsonWithExpiry(HISTORY_FILTER_KEY);
    return normalizeCachedFilter(parsed);
  }, []);
  const clearFilterCache = (0, import_react5.useCallback)(() => {
    removeSessionValueWithExpiry(HISTORY_FILTER_KEY);
    removeSessionValueWithExpiry(HISTORY_RETURN_FLAG_KEY);
  }, []);
  const consumeReturnFlag = (0, import_react5.useCallback)(() => {
    const raw = getSessionValueWithExpiry(HISTORY_RETURN_FLAG_KEY);
    if (raw === "1") {
      removeSessionValueWithExpiry(HISTORY_RETURN_FLAG_KEY);
      return true;
    }
    return false;
  }, []);
  const saveCachedFilter = (0, import_react5.useCallback)((filter) => {
    setSessionJsonWithExpiry(HISTORY_FILTER_KEY, filter, HISTORY_CACHE_TTL_MS);
    setSessionValueWithExpiry(HISTORY_RETURN_FLAG_KEY, "1", HISTORY_CACHE_TTL_MS);
  }, []);
  return {
    readCachedFilter,
    clearFilterCache,
    consumeReturnFlag,
    saveCachedFilter
  };
};

// Web/wwwroot/react/src/pages/visitas/historial/useHistoryFiltersState.ts
var import_react6 = __toESM(require_react());
var HISTORY_QUICK_FILTER_RANGES = [
  { id: "days-7", daysToSubtract: 6 },
  { id: "days-30", daysToSubtract: 29 },
  { id: "days-90", daysToSubtract: 89 }
];
var useHistoryFiltersState = ({
  defaultFromDate,
  defaultToDate,
  logHistory: logHistory2,
  parseDateValue: parseDateValue2,
  parseISO: parseISO2,
  toISO: toISO2,
  startOfDay: startOfDay2,
  isBefore: isBefore2
}) => {
  const resolveQuickFilterFromRange = (0, import_react6.useCallback)(
    (start, end) => {
      if (!start || !end) {
        return null;
      }
      const normalizedStart = startOfDay2(start);
      const normalizedEnd = startOfDay2(end);
      const today = startOfDay2(/* @__PURE__ */ new Date());
      if (toISO2(normalizedEnd) !== toISO2(today)) {
        return null;
      }
      for (const entry of HISTORY_QUICK_FILTER_RANGES) {
        const candidateStart = new Date(today);
        candidateStart.setDate(today.getDate() - entry.daysToSubtract);
        if (toISO2(normalizedStart) === toISO2(candidateStart)) {
          return entry.id;
        }
      }
      return null;
    },
    [startOfDay2, toISO2]
  );
  const [startDate, setStartDate] = (0, import_react6.useState)(null);
  const [endDate, setEndDate] = (0, import_react6.useState)(null);
  const [manualStartDate, setManualStartDate] = (0, import_react6.useState)(null);
  const [manualEndDate, setManualEndDate] = (0, import_react6.useState)(null);
  const [hoverDate, setHoverDate] = (0, import_react6.useState)(null);
  const [selectingStep, setSelectingStep] = (0, import_react6.useState)("start");
  const [currentMonth, setCurrentMonth] = (0, import_react6.useState)((/* @__PURE__ */ new Date()).getMonth());
  const [currentYear, setCurrentYear] = (0, import_react6.useState)((/* @__PURE__ */ new Date()).getFullYear());
  const [isOpen, setIsOpen] = (0, import_react6.useState)(false);
  const [showManualPickerPanel, setShowManualPickerPanel] = (0, import_react6.useState)(false);
  const [activeQuickFilter, setActiveQuickFilter] = (0, import_react6.useState)(null);
  const [selectedClient, setSelectedClient] = (0, import_react6.useState)(null);
  const [clientResetKey, setClientResetKey] = (0, import_react6.useState)(0);
  const [showFilters, setShowFilters] = (0, import_react6.useState)(true);
  const [showManualError, setShowManualError] = (0, import_react6.useState)(false);
  const hasRestoredFilterRef = (0, import_react6.useRef)(false);
  const didInitFilterRef = (0, import_react6.useRef)(false);
  const fromDateValue = (0, import_react6.useMemo)(() => startDate ? toISO2(startDate) : "", [startDate, toISO2]);
  const toDateValue = (0, import_react6.useMemo)(() => endDate ? toISO2(endDate) : "", [endDate, toISO2]);
  const accountNumValue = (0, import_react6.useMemo)(() => selectedClient ? selectedClient.value : "", [selectedClient]);
  const validateManualRange = (0, import_react6.useCallback)(() => {
    if (activeQuickFilter === "custom" && (!startDate || !endDate)) {
      setShowManualError(true);
      setSelectingStep(!startDate ? "start" : "end");
      setShowManualPickerPanel(true);
      setIsOpen(true);
      setShowFilters(true);
      return false;
    }
    return true;
  }, [activeQuickFilter, endDate, startDate]);
  const applyDefaultRangeFromProps = (0, import_react6.useCallback)(() => {
    if (!defaultFromDate || !defaultToDate) return null;
    const startRaw = parseDateValue2(defaultFromDate);
    const endRaw = parseDateValue2(defaultToDate);
    if (!startRaw || !endRaw) return null;
    const startDay = startOfDay2(startRaw);
    const endDay = startOfDay2(endRaw);
    let start = startDay;
    let end = endDay;
    if (isBefore2(end, start)) {
      const swap = start;
      start = end;
      end = swap;
    }
    setStartDate(start);
    setEndDate(end);
    setSelectingStep("done");
    setHoverDate(null);
    setCurrentMonth(start.getMonth());
    setCurrentYear(start.getFullYear());
    setActiveQuickFilter(resolveQuickFilterFromRange(start, end));
    setSelectedClient(null);
    setIsOpen(false);
    return {
      page: 1,
      override: {
        fromDate: toISO2(start),
        toDate: toISO2(end),
        accountNum: ""
      }
    };
  }, [defaultFromDate, defaultToDate, isBefore2, parseDateValue2, resolveQuickFilterFromRange, startOfDay2, toISO2]);
  const resetHistoryFilters = (0, import_react6.useCallback)(() => {
    setStartDate(null);
    setEndDate(null);
    setManualStartDate(null);
    setManualEndDate(null);
    setSelectingStep("start");
    setHoverDate(null);
    setCurrentMonth((/* @__PURE__ */ new Date()).getMonth());
    setCurrentYear((/* @__PURE__ */ new Date()).getFullYear());
    setActiveQuickFilter(null);
    setShowManualPickerPanel(false);
    setSelectedClient(null);
    setClientResetKey((prev) => prev + 1);
    setShowManualError(false);
  }, []);
  const applyCachedFilter = (0, import_react6.useCallback)(
    (filter) => {
      if (!filter || !filter.fromDate || !filter.toDate) return null;
      const start = parseISO2(filter.fromDate);
      const end = parseISO2(filter.toDate);
      setStartDate(start);
      setEndDate(end);
      setSelectingStep(end ? "done" : "end");
      setHoverDate(null);
      setCurrentMonth(start ? start.getMonth() : (/* @__PURE__ */ new Date()).getMonth());
      setCurrentYear(start ? start.getFullYear() : (/* @__PURE__ */ new Date()).getFullYear());
      setActiveQuickFilter(resolveQuickFilterFromRange(start, end));
      setShowManualPickerPanel(false);
      setShowManualError(false);
      if (filter.clientAccount) {
        setSelectedClient({ value: filter.clientAccount, text: filter.clientText || filter.clientAccount });
      } else {
        setSelectedClient(null);
      }
      const pageVal = Number(filter.page);
      const pageToLoad = Number.isFinite(pageVal) && pageVal > 0 ? pageVal : 1;
      return {
        page: pageToLoad,
        override: {
          fromDate: filter.fromDate,
          toDate: filter.toDate,
          accountNum: filter.clientAccount || ""
        }
      };
    },
    [parseISO2, resolveQuickFilterFromRange]
  );
  const handleSelect = (0, import_react6.useCallback)(
    (dateObj) => {
      logHistory2("handleSelect", {
        clicked: toISO2(dateObj),
        start: fromDateValue,
        end: toDateValue,
        selectingStep
      });
      setShowManualError(false);
      setActiveQuickFilter("custom");
      setShowManualPickerPanel(true);
      const hasStart = !!startDate;
      const hasEnd = !!endDate;
      if (selectingStep === "end") {
        if (!hasStart) {
          setStartDate(dateObj);
          setEndDate(null);
          setSelectingStep("end");
          setCurrentMonth(dateObj.getMonth());
          setCurrentYear(dateObj.getFullYear());
          return;
        }
        let newStart2 = startDate;
        let newEnd = dateObj;
        if (isBefore2(newEnd, newStart2)) {
          const swap = newStart2;
          newStart2 = newEnd;
          newEnd = swap;
        }
        setStartDate(newStart2);
        setEndDate(newEnd);
        setManualStartDate(newStart2);
        setManualEndDate(newEnd);
        setSelectingStep("done");
        setCurrentMonth(newEnd.getMonth());
        setCurrentYear(newEnd.getFullYear());
        setHoverDate(null);
        setIsOpen(false);
        setShowManualPickerPanel(false);
        return;
      }
      const newStart = dateObj;
      if (hasEnd && endDate && isBefore2(endDate, newStart)) {
        setStartDate(newStart);
        setEndDate(null);
        setSelectingStep("end");
        setCurrentMonth(newStart.getMonth());
        setCurrentYear(newStart.getFullYear());
        return;
      }
      setStartDate(newStart);
      if (hasEnd && endDate) {
        setEndDate(endDate);
        setManualStartDate(newStart);
        setManualEndDate(endDate);
        setSelectingStep("done");
        setHoverDate(null);
        setIsOpen(false);
        setShowManualPickerPanel(false);
      } else {
        setEndDate(null);
        setSelectingStep("end");
      }
      setCurrentMonth(newStart.getMonth());
      setCurrentYear(newStart.getFullYear());
    },
    [endDate, fromDateValue, isBefore2, logHistory2, selectingStep, startDate, toDateValue, toISO2]
  );
  const handleClearState = (0, import_react6.useCallback)(
    (event) => {
      event.stopPropagation();
      logHistory2("clearRange");
      setActiveQuickFilter(null);
      setShowManualError(false);
      setShowManualPickerPanel(false);
      resetHistoryFilters();
      setIsOpen(false);
      setShowFilters(true);
    },
    [logHistory2, resetHistoryFilters]
  );
  const openPopover = (0, import_react6.useCallback)(
    (section) => {
      logHistory2("openPopover", { section, start: fromDateValue, end: toDateValue, selectingStep });
      setShowManualError(false);
      setActiveQuickFilter("custom");
      setShowManualPickerPanel(true);
      if (section === "end" && !startDate) {
        setSelectingStep("start");
      } else {
        setSelectingStep(section);
      }
      setIsOpen(true);
    },
    [fromDateValue, logHistory2, selectingStep, startDate, toDateValue]
  );
  const handleActivatorKeyDown = (0, import_react6.useCallback)(
    (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      openPopover("start");
    },
    [openPopover]
  );
  const handleSectionKeyDown = (0, import_react6.useCallback)(
    (event, section) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      event.stopPropagation();
      openPopover(section);
    },
    [openPopover]
  );
  const applyQuickRange = (0, import_react6.useCallback)(
    (filterId, start, end) => {
      const startDay = startOfDay2(start);
      const endDay = startOfDay2(end);
      setStartDate(startDay);
      setEndDate(endDay);
      setSelectingStep("done");
      setHoverDate(null);
      setCurrentMonth(startDay.getMonth());
      setCurrentYear(startDay.getFullYear());
      setIsOpen(false);
      setShowManualPickerPanel(false);
      setActiveQuickFilter(filterId);
      setShowManualError(false);
    },
    [startOfDay2]
  );
  const handleQuickFilter = (0, import_react6.useCallback)(
    (filterId) => {
      const today = startOfDay2(/* @__PURE__ */ new Date());
      if (filterId === "custom") {
        if (showManualPickerPanel) {
          setShowManualError(false);
          setHoverDate(null);
          setSelectingStep(startDate && endDate ? "done" : startDate ? "end" : "start");
          setIsOpen(false);
          setShowManualPickerPanel(false);
          return;
        }
        const nextStart = manualStartDate ? new Date(manualStartDate) : startDate ? new Date(startDate) : null;
        const nextEnd = manualEndDate ? new Date(manualEndDate) : endDate ? new Date(endDate) : null;
        setActiveQuickFilter("custom");
        setShowManualPickerPanel(true);
        setStartDate(nextStart);
        setEndDate(nextEnd);
        if (nextStart) {
          setCurrentMonth(nextStart.getMonth());
          setCurrentYear(nextStart.getFullYear());
        }
        setSelectingStep(nextStart && !nextEnd ? "end" : "start");
        setIsOpen(true);
        setHoverDate(null);
        setShowManualError(false);
        return;
      }
      if (filterId === "days-7") {
        const start = new Date(today);
        start.setDate(today.getDate() - 6);
        applyQuickRange(filterId, start, today);
        return;
      }
      if (filterId === "days-30") {
        const start = new Date(today);
        start.setDate(today.getDate() - 29);
        applyQuickRange(filterId, start, today);
        return;
      }
      if (filterId === "days-90") {
        const start = new Date(today);
        start.setDate(today.getDate() - 89);
        applyQuickRange(filterId, start, today);
      }
    },
    [applyQuickRange, endDate, manualEndDate, manualStartDate, showManualPickerPanel, startDate, startOfDay2]
  );
  const handleClientSelected = (0, import_react6.useCallback)((client) => {
    setSelectedClient(client);
  }, []);
  return {
    startDate,
    endDate,
    manualStartDate,
    manualEndDate,
    hoverDate,
    selectingStep,
    currentMonth,
    currentYear,
    isOpen,
    showManualPickerPanel,
    activeQuickFilter,
    selectedClient,
    clientResetKey,
    showFilters,
    showManualError,
    fromDateValue,
    toDateValue,
    accountNumValue,
    hasRestoredFilterRef,
    didInitFilterRef,
    setStartDate,
    setEndDate,
    setManualStartDate,
    setManualEndDate,
    setHoverDate,
    setSelectingStep,
    setCurrentMonth,
    setCurrentYear,
    setIsOpen,
    setShowManualPickerPanel,
    setActiveQuickFilter,
    setSelectedClient,
    setClientResetKey,
    setShowFilters,
    setShowManualError,
    validateManualRange,
    applyDefaultRangeFromProps,
    resetHistoryFilters,
    applyCachedFilter,
    handleSelect,
    handleClearState,
    openPopover,
    handleActivatorKeyDown,
    handleSectionKeyDown,
    handleQuickFilter,
    handleClientSelected
  };
};

// Web/wwwroot/react/src/pages/visitas/historial/HistoryPage.tsx
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var PAGE_SIZE = 6;
var PAGE_WINDOW = 6;
var NAV_DELAY_MS = 320;
var FAB_BASE_BOTTOM = 32;
var normalizeUiLocale = (locale) => {
  const value = String(locale || "").trim();
  if (!value) return "es-ES";
  if (/^zh-hans/i.test(value)) return "zh-CN";
  return value;
};
var isBasqueLocale = (locale) => /^eu\b/i.test(String(locale || ""));
var BASQUE_MONTHS = [
  "urtarrila",
  "otsaila",
  "martxoa",
  "apirila",
  "maiatza",
  "ekaina",
  "uztaila",
  "abuztua",
  "iraila",
  "urria",
  "azaroa",
  "abendua"
];
var BASQUE_MONTHS_SHORT = [
  "urt",
  "ots",
  "mar",
  "api",
  "mai",
  "eka",
  "uzt",
  "abu",
  "ira",
  "urr",
  "aza",
  "abe"
];
var getUiLocale = () => {
  const fromHtml = typeof document !== "undefined" ? document.documentElement.lang : "";
  if (fromHtml && String(fromHtml).trim()) return normalizeUiLocale(fromHtml);
  return "es-ES";
};
var pad = (n) => n.toString().padStart(2, "0");
var toISO = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
var startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
var parseISO = (s) => {
  if (!s) return null;
  const parts = s.split("-").map(Number);
  if (parts.length !== 3) return null;
  return new Date(parts[0], parts[1] - 1, parts[2]);
};
var sameDay = (a, b) => !!(a && b && a.getTime() === b.getTime());
var isBefore = (a, b) => !!(a && b && a.getTime() < b.getTime());
var normalizeRange = (from, to) => {
  if (!from || !to) return { from, to };
  const fromDate = parseISO(from);
  const toDate = parseISO(to);
  if (!fromDate || !toDate) return { from, to };
  if (isBefore(toDate, fromDate)) {
    return { from: toISO(toDate), to: toISO(fromDate) };
  }
  return { from: toISO(fromDate), to: toISO(toDate) };
};
var formatDisplay = (d, locale) => {
  if (isBasqueLocale(locale)) {
    const month = BASQUE_MONTHS_SHORT[d.getMonth()];
    return `${d.getDate()} ${month} ${d.getFullYear()}`.toLowerCase();
  }
  return d.toLocaleDateString(locale, {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).replace(/\./g, "").toLowerCase();
};
var formatMonthLabel = (d, locale) => {
  if (/^zh/i.test(locale)) {
    return new Intl.DateTimeFormat(locale, { year: "numeric", month: "long" }).format(d);
  }
  if (isBasqueLocale(locale)) {
    return `${BASQUE_MONTHS[d.getMonth()]} ${d.getFullYear()}`;
  }
  const monthName = d.toLocaleDateString(locale, { month: "long" });
  const capMonthName = monthName && /[A-Za-z]/.test(monthName[0]) ? monthName[0].toLocaleUpperCase(locale) + monthName.slice(1) : monthName;
  return `${capMonthName} ${d.getFullYear()}`;
};
var parseDateValue = (value) => {
  if (!value) return null;
  const raw = String(value).trim();
  if (!raw) return null;
  const datePart = raw.split("T")[0].split(" ")[0];
  if (/^\d{4}-\d{2}-\d{2}$/.test(datePart)) {
    const [y, m, d] = datePart.split("-").map(Number);
    return new Date(y, m - 1, d);
  }
  if (/^\d{2}[./-]\d{2}[./-]\d{4}$/.test(datePart)) {
    const parts = datePart.split(/[./-]/).map(Number);
    const [d, m, y] = parts;
    return new Date(y, m - 1, d);
  }
  const parsed = new Date(raw);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};
var formatDateParts = (value, locale) => {
  if (!value) return { year: "", month: "", day: "" };
  const d = parseDateValue(value);
  if (!d) return { year: "", month: "", day: "" };
  let month = "";
  if (isBasqueLocale(locale)) {
    month = BASQUE_MONTHS_SHORT[d.getMonth()] || "";
  } else {
    month = d.toLocaleDateString(locale, { month: "short" }).replace(/\./g, "");
  }
  return {
    year: String(d.getFullYear()),
    month: month.toUpperCase(),
    day: String(d.getDate()).padStart(2, "0")
  };
};
var toTitleCase = (value, locale) => {
  if (!value) return "";
  const lower = value.toLocaleLowerCase(locale);
  try {
    return lower.replace(/(^|[^\p{L}])(\p{L})/gu, (_match, prefix, ch) => `${prefix}${ch.toLocaleUpperCase(locale)}`);
  } catch {
    return lower.replace(/(^|[\s-/])(\S)/g, (_match, prefix, ch) => `${prefix}${ch.toLocaleUpperCase(locale)}`);
  }
};
var toSentenceCase = (value, locale) => {
  if (!value) return "";
  const trimmed = value.trim();
  if (!trimmed) return trimmed;
  const lower = trimmed.toLocaleLowerCase(locale);
  return lower[0].toLocaleUpperCase(locale) + lower.slice(1);
};
var logHistory = (message, data) => {
  if (typeof window === "undefined") return;
  const debugFlag = window.__IND_DEBUG_HISTORY__;
  if (debugFlag !== true) return;
  if (data) {
    console.debug("[History]", message, data);
  } else {
    console.debug("[History]", message);
  }
};
var HistoryPage = ({ defaultFromDate = "", defaultToDate = "" }) => {
  const locale = (0, import_react7.useMemo)(() => getUiLocale(), []);
  const canViewHistory = canAccess("VISITAS_HISTORIAL", "View");
  const canCreateVisit = canAccess("VISITAS_CREACION", "Add");
  const noDataText = indT("Common_NoData", "No data");
  const activatorRef = (0, import_react7.useRef)(null);
  const popoverRef = (0, import_react7.useRef)(null);
  const { readCachedFilter, clearFilterCache, consumeReturnFlag, saveCachedFilter } = useHistoryFilterCache();
  const {
    startDate,
    endDate,
    hoverDate,
    selectingStep,
    currentMonth,
    currentYear,
    isOpen,
    showManualPickerPanel,
    activeQuickFilter,
    selectedClient,
    clientResetKey,
    showFilters,
    showManualError,
    fromDateValue,
    toDateValue,
    accountNumValue,
    hasRestoredFilterRef,
    didInitFilterRef,
    setHoverDate,
    setSelectingStep,
    setCurrentMonth,
    setCurrentYear,
    setIsOpen,
    setShowFilters,
    setShowManualError,
    validateManualRange,
    applyDefaultRangeFromProps,
    resetHistoryFilters,
    applyCachedFilter,
    handleSelect,
    handleClearState,
    openPopover,
    handleActivatorKeyDown,
    handleSectionKeyDown,
    handleQuickFilter,
    handleClientSelected
  } = useHistoryFiltersState({
    defaultFromDate,
    defaultToDate,
    logHistory,
    parseDateValue,
    parseISO,
    toISO,
    startOfDay,
    isBefore
  });
  const { items, total, currentPage, isLoading, errorMessage, loadActivities, resetActivities, retryOnNetworkErrorRef, lastSignatureRef } = useHistoryActivities({
    fromDateValue,
    toDateValue,
    accountNumValue,
    pageSize: PAGE_SIZE,
    normalizeRange,
    onForbidden: showPermissionModal,
    onDebug: logHistory
  });
  (0, import_react7.useEffect)(() => {
    logHistory("init", { defaultFromDate, defaultToDate });
  }, [defaultFromDate, defaultToDate]);
  const applyFilters = (0, import_react7.useCallback)(
    (options) => {
      if (!validateManualRange()) return;
      if (!startDate || !endDate) return;
      const normalized = normalizeRange(fromDateValue, toDateValue);
      const page = options?.page ?? 1;
      const signature = `${normalized.from}|${normalized.to}|${accountNumValue}|${page}`;
      if (options?.force || lastSignatureRef.current !== signature) {
        loadActivities(page, { fromDate: normalized.from, toDate: normalized.to, accountNum: accountNumValue });
      }
      setShowManualError(false);
      if (options?.closePanel) {
        setIsOpen(false);
        setShowFilters(false);
      }
    },
    [accountNumValue, endDate, fromDateValue, loadActivities, startDate, toDateValue, validateManualRange]
  );
  const totalPages = Math.ceil((total || 0) / PAGE_SIZE);
  useHistoryPageListeners({
    isOpen,
    activatorRef,
    popoverRef,
    hasRestoredFilterRef,
    retryOnNetworkErrorRef,
    currentPage,
    logHistory,
    consumeReturnFlag,
    readCachedFilter,
    applyCachedFilter,
    loadActivities,
    setIsOpen,
    setHoverDate,
    setShowFilters,
    applyFilters
  });
  (0, import_react7.useEffect)(() => {
    if (didInitFilterRef.current) return;
    didInitFilterRef.current = true;
    const cached = consumeReturnFlag() ? readCachedFilter() : null;
    if (cached && cached.fromDate && cached.toDate) {
      logHistory("restoreFilter", cached);
      const cachedRequest = applyCachedFilter(cached);
      if (cachedRequest) {
        retryOnNetworkErrorRef.current = true;
        loadActivities(cachedRequest.page, cachedRequest.override);
        setShowFilters(false);
        setIsOpen(false);
        hasRestoredFilterRef.current = true;
        return;
      }
    }
    const defaultRequest = applyDefaultRangeFromProps();
    if (defaultRequest) {
      retryOnNetworkErrorRef.current = true;
      loadActivities(defaultRequest.page, defaultRequest.override);
      setShowFilters(false);
      setIsOpen(false);
      hasRestoredFilterRef.current = true;
      return;
    }
    resetHistoryFilters();
    clearFilterCache();
    resetActivities();
    setShowFilters(true);
    setIsOpen(false);
  }, [
    applyCachedFilter,
    applyDefaultRangeFromProps,
    clearFilterCache,
    consumeReturnFlag,
    didInitFilterRef,
    hasRestoredFilterRef,
    loadActivities,
    readCachedFilter,
    resetActivities,
    resetHistoryFilters,
    retryOnNetworkErrorRef
  ]);
  (0, import_react7.useEffect)(() => {
    if (startDate && !endDate && selectingStep === "start") {
      setSelectingStep("end");
      return;
    }
    if (!startDate && selectingStep !== "start") {
      setSelectingStep("start");
    }
  }, [startDate, endDate, selectingStep]);
  const handleClear = (0, import_react7.useCallback)(
    (event) => {
      handleClearState(event);
      clearFilterCache();
      resetActivities();
    },
    [clearFilterCache, handleClearState, resetActivities]
  );
  const handleResetFilters = (0, import_react7.useCallback)(() => {
    resetHistoryFilters();
    clearFilterCache();
    resetActivities();
    setIsOpen(false);
    setShowFilters(true);
  }, [clearFilterCache, resetActivities, resetHistoryFilters, setIsOpen, setShowFilters]);
  const handleNavigate = (0, import_react7.useCallback)(
    (linkId) => {
      if (!canViewHistory) {
        showPermissionModal();
        return;
      }
      setTimeout(() => {
        saveCachedFilter({
          fromDate: fromDateValue || "",
          toDate: toDateValue || "",
          page: currentPage,
          clientAccount: selectedClient?.value || "",
          clientText: selectedClient?.text || ""
        });
        const target = encodeURIComponent(linkId);
        window.location.href = `/Visitas/Detalle/${target}`;
      }, NAV_DELAY_MS);
    },
    [canViewHistory, currentPage, fromDateValue, saveCachedFilter, toDateValue, selectedClient]
  );
  const calendar = (0, import_react7.useMemo)(() => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const offset = (firstDay.getDay() + 6) % 7;
    const cells = [];
    for (let i = 0; i < offset; i++) {
      cells.push({ date: null, iso: "", isEmpty: true });
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const dateObj = new Date(currentYear, currentMonth, d);
      cells.push({ date: dateObj, iso: toISO(dateObj), isEmpty: false });
    }
    return {
      cells,
      label: formatMonthLabel(firstDay, locale)
    };
  }, [currentMonth, currentYear, locale]);
  const previewEnd = endDate || (selectingStep === "end" ? hoverDate : null);
  const handlePrevMonth = (0, import_react7.useCallback)(
    (event) => {
      event.stopPropagation();
      setCurrentMonth((prev) => {
        const next = prev - 1;
        if (next < 0) {
          setCurrentYear((year) => year - 1);
          return 11;
        }
        return next;
      });
    },
    [setCurrentMonth, setCurrentYear]
  );
  const handleNextMonth = (0, import_react7.useCallback)(
    (event) => {
      event.stopPropagation();
      setCurrentMonth((prev) => {
        const next = prev + 1;
        if (next > 11) {
          setCurrentYear((year) => year + 1);
          return 0;
        }
        return next;
      });
    },
    [setCurrentMonth, setCurrentYear]
  );
  const handleGridMouseLeave = (0, import_react7.useCallback)(() => {
    setHoverDate(null);
  }, [setHoverDate]);
  const handleManualDayClick = (0, import_react7.useCallback)(
    (cell) => {
      if (!cell.date) return;
      logHistory("dayClick", { date: cell.iso || "", disabled: !!cell.disabled });
      handleSelect(cell.date);
    },
    [handleSelect]
  );
  const handleManualDayHover = (0, import_react7.useCallback)(
    (cell) => {
      if (!cell.date) return;
      if (selectingStep === "end" && startDate) {
        setHoverDate(new Date(cell.date));
      }
    },
    [selectingStep, setHoverDate, startDate]
  );
  const manualDayCells = (0, import_react7.useMemo)(() => {
    return calendar.cells.map((cell, idx) => {
      if (cell.isEmpty) {
        return { key: `empty-${idx}`, isEmpty: true };
      }
      const dateObj = cell.date;
      const isStart = sameDay(dateObj, startDate);
      const isEnd = sameDay(dateObj, endDate);
      const inRange = startDate && previewEnd && isBefore(startDate, dateObj) && isBefore(dateObj, previewEnd);
      const hoverRange = startDate && !endDate && hoverDate && isBefore(startDate, dateObj) && isBefore(dateObj, hoverDate);
      const disabled = selectingStep === "end" && !!startDate && isBefore(dateObj, startDate);
      const isToday = sameDay(dateObj, /* @__PURE__ */ new Date());
      const dayClass = classNames(
        "drp-day",
        isStart ? "start range-start" : "",
        isEnd ? "end range-end" : "",
        inRange ? "in-range" : "",
        hoverRange ? "hover-range" : "",
        disabled ? "disabled" : "",
        isToday ? "today" : ""
      );
      return {
        key: cell.iso,
        isEmpty: false,
        date: dateObj,
        iso: cell.iso,
        dayLabel: dateObj.getDate(),
        dayClass,
        disabled
      };
    });
  }, [calendar.cells, endDate, hoverDate, previewEnd, selectingStep, startDate]);
  const { timelineItems } = useHistoryTimelineItems({
    items,
    locale,
    noDataText,
    logHistory,
    toTitleCase,
    formatDateParts
  });
  const labelFrom = toSentenceCase(indT("History_From", "From"), locale);
  const labelTo = toSentenceCase(indT("History_To", "To"), locale);
  const summaryFrom = labelFrom;
  const summaryTo = labelTo;
  const filterTitle = indT("History_Filter_Date", "Date");
  const addDateLabel = indT("History_AddDate", "Add date");
  const clearRangeLabel = indT("History_ClearRange", "Clear range");
  const prevMonthLabel = indT("History_PrevMonth", "Previous month");
  const nextMonthLabel = indT("History_NextMonth", "Next month");
  const statusSelectStartLabel = indT("History_Status_SelectStart", "Select start date");
  const statusSelectEndLabel = indT("History_Status_SelectEnd", "Select end date");
  const weekDayLabels = (0, import_react7.useMemo)(
    () => [
      indT("History_Day_Mon", "Mon"),
      indT("History_Day_Tue", "Tue"),
      indT("History_Day_Wed", "Wed"),
      indT("History_Day_Thu", "Thu"),
      indT("History_Day_Fri", "Fri"),
      indT("History_Day_Sat", "Sat"),
      indT("History_Day_Sun", "Sun")
    ],
    []
  );
  const clearLabel = indT("History_Filter_Clear", "Clear");
  const applyLabel = indT("History_Filter_Apply", "Apply");
  const clientLabel = indT("History_Filter_Client", "Account");
  const quickCustomLabel = indT("History_Quick_Custom", "Date");
  const quick7DaysLabel = indT("History_Quick_7Days", "7 days");
  const quick30DaysLabel = indT("History_Quick_30Days", "30 days");
  const quick90DaysLabel = indT("History_Quick_90Days", "90 days");
  const pageFirstLabel = indT("History_Page_First", "First");
  const pagePrevLabel = indT("History_Page_Prev", "Previous");
  const pageNextLabel = indT("History_Page_Next", "Next");
  const pageLastLabel = indT("History_Page_Last", "Last");
  const quickFilters = (0, import_react7.useMemo)(
    () => [
      { id: "custom", label: quickCustomLabel },
      { id: "days-7", label: quick7DaysLabel },
      { id: "days-30", label: quick30DaysLabel },
      { id: "days-90", label: quick90DaysLabel }
    ],
    [quick30DaysLabel, quick7DaysLabel, quick90DaysLabel, quickCustomLabel]
  );
  const paginationLabels = (0, import_react7.useMemo)(
    () => ({
      first: pageFirstLabel,
      prev: pagePrevLabel,
      next: pageNextLabel,
      last: pageLastLabel
    }),
    [pageFirstLabel, pageLastLabel, pageNextLabel, pagePrevLabel]
  );
  const showFilterActions = showFilters;
  const showSummary = !showFilters && !!startDate && !!endDate;
  const showResults = !showFilters;
  const showManualPicker = activeQuickFilter === "custom" && showManualPickerPanel;
  const showInlineSummary = !!startDate && !!endDate && !showManualPicker;
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "max-w-3xl mx-auto px-1 sm:px-2 pt-3 pb-4 space-y-2", children: [
    showSummary && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "filter-card filter-card--summary p-3 sm:p-4 mt-1 mb-3", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      HistorySummary_default,
      {
        summaryFromLabel: summaryFrom,
        summaryToLabel: summaryTo,
        fromValue: startDate ? formatDisplay(startDate, locale) : "--",
        toValue: endDate ? formatDisplay(endDate, locale) : "--",
        clientLabel,
        clientValue: selectedClient?.text || "",
        showClient: !!selectedClient
      }
    ) }),
    showFilters && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "filter-card filter-card--expanded p-2 sm:p-2.5 relative", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "space-y-1.5 history-filter-stack flex flex-col", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "grid grid-cols-2 gap-2 history-quick-filters", "aria-label": filterTitle, children: quickFilters.map((item) => {
        const isActive = activeQuickFilter === item.id;
        return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          FilterButton_default,
          {
            label: item.label,
            active: isActive,
            className: "w-full",
            onClick: () => handleQuickFilter(item.id)
          },
          item.id
        );
      }) }),
      showInlineSummary && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        HistorySummary_default,
        {
          summaryFromLabel: summaryFrom,
          summaryToLabel: summaryTo,
          fromValue: startDate ? formatDisplay(startDate, locale) : "--",
          toValue: endDate ? formatDisplay(endDate, locale) : "--",
          className: "gap-y-1 text-[11px] px-1"
        }
      ),
      showManualPicker && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        HistoryManualDatePicker_default,
        {
          activatorRef,
          popoverRef,
          showManualError,
          showStartError: showManualError && !startDate,
          showEndError: showManualError && !endDate,
          filterTitle,
          isOpen,
          selectingStep,
          labelFrom,
          labelTo,
          startDateText: startDate ? formatDisplay(startDate, locale) : addDateLabel,
          endDateText: endDate ? formatDisplay(endDate, locale) : addDateLabel,
          clearRangeLabel,
          hasSelectedRange: !!startDate || !!endDate,
          monthLabel: calendar.label,
          weekDayLabels,
          statusText: selectingStep === "start" ? statusSelectStartLabel : statusSelectEndLabel,
          dayCells: manualDayCells,
          prevMonthLabel,
          nextMonthLabel,
          onOpenPopover: openPopover,
          onActivatorKeyDown: handleActivatorKeyDown,
          onSectionKeyDown: handleSectionKeyDown,
          onClear: handleClear,
          onPrevMonth: handlePrevMonth,
          onNextMonth: handleNextMonth,
          onGridMouseLeave: handleGridMouseLeave,
          onDayClick: handleManualDayClick,
          onDayHover: handleManualDayHover
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        ClientSearchCombobox_default,
        {
          value: selectedClient,
          onSelected: handleClientSelected,
          label: indT("History_Filter_Client", "Account"),
          placeholder: indT("History_Filter_Client", "Account"),
          variant: "compact",
          showLabel: false,
          idBase: "history-client",
          portalClassName: "visitas-typography"
        },
        clientResetKey
      ),
      showFilterActions && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "mt-1 grid grid-cols-2 gap-2 history-filter-actions", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          ActionButton_default,
          {
            label: clearLabel,
            className: "w-full",
            onClick: handleResetFilters
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          ActionButton_default,
          {
            label: applyLabel,
            className: "w-full",
            onClick: () => {
              applyFilters({ closePanel: true, page: 1 });
            }
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { type: "hidden", id: "fromDate", value: fromDateValue, readOnly: true }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { type: "hidden", id: "toDate", value: toDateValue, readOnly: true }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
      "div",
      {
        id: "resultsLoader",
        className: "loader-box glass-panel shadow-card flex items-center gap-2 text-sm text-slate-700",
        style: { display: isLoading ? "flex" : "none" },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("svg", { className: "ind-spinner h-5 w-5", viewBox: "0 0 20 20", role: "status", "aria-label": indT("History_Loading", "Loading"), children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("circle", { className: "ind-spinner__circle", cx: "10", cy: "10", r: "8", strokeWidth: "2" }) }),
          indT("History_Loading", "Loading")
        ]
      }
    ),
    showResults && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        HistoryTable_default,
        {
          items: timelineItems,
          noDataText: indT("History_NoDataInRange", "No visits in this range"),
          errorMessage,
          onNavigate: handleNavigate
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        CompactPagination_default,
        {
          totalPages,
          currentPage,
          pageWindow: PAGE_WINDOW,
          loading: isLoading,
          onPageChange: (page) => loadActivities(page),
          labels: paginationLabels
        }
      )
    ] }),
    canCreateVisit && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      FloatingActionButton_default,
      {
        route: "/Visitas/Create?fresh=1",
        ariaLabel: indT("Common_Create", "Create"),
        size: 76,
        right: 16,
        bottom: FAB_BASE_BOTTOM
      }
    )
  ] });
};
var mountHistoryPage = (root) => {
  const defaultFromDate = root.getAttribute("data-default-from") || "";
  const defaultToDate = root.getAttribute("data-default-to") || "";
  mountReactIsland(root, /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(HistoryPage, { defaultFromDate, defaultToDate }));
};
var mount = () => {
  const rootEl = document.getElementById("visitas-history-root");
  if (!rootEl) return;
  mountHistoryPage(rootEl);
};
mountWhenDocumentReady(mount);
var HistoryPage_default = HistoryPage;
export {
  HistoryPage,
  HistoryPage_default as default,
  mountHistoryPage
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvaGlzdG9yaWFsL0hpc3RvcnlQYWdlLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9oaXN0b3JpYWwvSGlzdG9yeVRhYmxlLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9oaXN0b3JpYWwvdXNlSGlzdG9yeVBhZ2VMaXN0ZW5lcnMudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvaGlzdG9yaWFsL3VzZUhpc3RvcnlUaW1lbGluZUl0ZW1zLnRzIiwgIi4uL3JlYWN0L3NyYy9ob29rcy91c2VIaXN0b3J5QWN0aXZpdGllcy50cyIsICIuLi9yZWFjdC9zcmMvaG9va3MvdXNlSGlzdG9yeUZpbHRlckNhY2hlLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy92aXNpdGFzL2hpc3RvcmlhbC91c2VIaXN0b3J5RmlsdGVyc1N0YXRlLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBjbGFzc05hbWVzIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2NsYXNzTmFtZXMudHNcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB7IGNhbkFjY2Vzcywgc2hvd1Blcm1pc3Npb25Nb2RhbCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9wZXJtaXNzaW9ucy50c1wiO1xyXG5pbXBvcnQgQ2xpZW50U2VhcmNoQ29tYm9ib3ggZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvdmlzaXRhcy9DbGllbnRTZWFyY2hDb21ib2JveC50c3hcIjtcclxuaW1wb3J0IEhpc3RvcnlUYWJsZSBmcm9tIFwiLi9IaXN0b3J5VGFibGUudHN4XCI7XHJcbmltcG9ydCBIaXN0b3J5U3VtbWFyeSBmcm9tIFwiLi9IaXN0b3J5U3VtbWFyeS50c3hcIjtcclxuaW1wb3J0IEhpc3RvcnlNYW51YWxEYXRlUGlja2VyLCB7IEhpc3RvcnlNYW51YWxEYXlDZWxsIH0gZnJvbSBcIi4vSGlzdG9yeU1hbnVhbERhdGVQaWNrZXIudHN4XCI7XHJcbmltcG9ydCB7IHVzZUhpc3RvcnlQYWdlTGlzdGVuZXJzIH0gZnJvbSBcIi4vdXNlSGlzdG9yeVBhZ2VMaXN0ZW5lcnMudHNcIjtcclxuaW1wb3J0IHsgdXNlSGlzdG9yeVRpbWVsaW5lSXRlbXMgfSBmcm9tIFwiLi91c2VIaXN0b3J5VGltZWxpbmVJdGVtcy50c1wiO1xyXG5pbXBvcnQgRmxvYXRpbmdBY3Rpb25CdXR0b24gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9GbG9hdGluZ0FjdGlvbkJ1dHRvbi50c3hcIjtcclxuaW1wb3J0IENvbXBhY3RQYWdpbmF0aW9uIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvQ29tcGFjdFBhZ2luYXRpb24udHN4XCI7XHJcbmltcG9ydCBGaWx0ZXJCdXR0b24gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9GaWx0ZXJCdXR0b24udHN4XCI7XHJcbmltcG9ydCBBY3Rpb25CdXR0b24gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9BY3Rpb25CdXR0b24udHN4XCI7XHJcbmltcG9ydCB7IHVzZUhpc3RvcnlBY3Rpdml0aWVzIH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZUhpc3RvcnlBY3Rpdml0aWVzLnRzXCI7XHJcbmltcG9ydCB7IHVzZUhpc3RvcnlGaWx0ZXJDYWNoZSB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VIaXN0b3J5RmlsdGVyQ2FjaGUudHNcIjtcclxuaW1wb3J0IHsgdXNlSGlzdG9yeUZpbHRlcnNTdGF0ZSB9IGZyb20gXCIuL3VzZUhpc3RvcnlGaWx0ZXJzU3RhdGUudHNcIjtcclxuaW1wb3J0IHsgbW91bnRSZWFjdElzbGFuZCwgbW91bnRXaGVuRG9jdW1lbnRSZWFkeSB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9yZWFjdElzbGFuZC50c3hcIjtcclxuXHJcbnR5cGUgUHJvcHMgPSB7XHJcbiAgZGVmYXVsdEZyb21EYXRlPzogc3RyaW5nO1xyXG4gIGRlZmF1bHRUb0RhdGU/OiBzdHJpbmc7XHJcbn07XHJcblxyXG50eXBlIENhbGVuZGFyQ2VsbCA9IHtcclxuICBkYXRlOiBEYXRlIHwgbnVsbDtcclxuICBpc286IHN0cmluZztcclxuICBpc0VtcHR5OiBib29sZWFuO1xyXG59O1xyXG5cclxuY29uc3QgUEFHRV9TSVpFID0gNjtcclxuY29uc3QgUEFHRV9XSU5ET1cgPSA2O1xyXG5jb25zdCBOQVZfREVMQVlfTVMgPSAzMjA7XHJcbmNvbnN0IEZBQl9CQVNFX0JPVFRPTSA9IDMyO1xyXG5cclxuY29uc3Qgbm9ybWFsaXplVWlMb2NhbGUgPSAobG9jYWxlOiBzdHJpbmcpID0+IHtcclxuICBjb25zdCB2YWx1ZSA9IFN0cmluZyhsb2NhbGUgfHwgXCJcIikudHJpbSgpO1xyXG4gIGlmICghdmFsdWUpIHJldHVybiBcImVzLUVTXCI7XHJcbiAgaWYgKC9eemgtaGFucy9pLnRlc3QodmFsdWUpKSByZXR1cm4gXCJ6aC1DTlwiO1xyXG4gIHJldHVybiB2YWx1ZTtcclxufTtcclxuXHJcbmNvbnN0IGlzQmFzcXVlTG9jYWxlID0gKGxvY2FsZTogc3RyaW5nKSA9PiAvXmV1XFxiL2kudGVzdChTdHJpbmcobG9jYWxlIHx8IFwiXCIpKTtcclxuXHJcbmNvbnN0IEJBU1FVRV9NT05USFMgPSBbXHJcbiAgXCJ1cnRhcnJpbGFcIixcclxuICBcIm90c2FpbGFcIixcclxuICBcIm1hcnR4b2FcIixcclxuICBcImFwaXJpbGFcIixcclxuICBcIm1haWF0emFcIixcclxuICBcImVrYWluYVwiLFxyXG4gIFwidXp0YWlsYVwiLFxyXG4gIFwiYWJ1enR1YVwiLFxyXG4gIFwiaXJhaWxhXCIsXHJcbiAgXCJ1cnJpYVwiLFxyXG4gIFwiYXphcm9hXCIsXHJcbiAgXCJhYmVuZHVhXCIsXHJcbl07XHJcblxyXG5jb25zdCBCQVNRVUVfTU9OVEhTX1NIT1JUID0gW1xyXG4gIFwidXJ0XCIsXHJcbiAgXCJvdHNcIixcclxuICBcIm1hclwiLFxyXG4gIFwiYXBpXCIsXHJcbiAgXCJtYWlcIixcclxuICBcImVrYVwiLFxyXG4gIFwidXp0XCIsXHJcbiAgXCJhYnVcIixcclxuICBcImlyYVwiLFxyXG4gIFwidXJyXCIsXHJcbiAgXCJhemFcIixcclxuICBcImFiZVwiLFxyXG5dO1xyXG5cclxuY29uc3QgZ2V0VWlMb2NhbGUgPSAoKSA9PiB7XHJcbiAgY29uc3QgZnJvbUh0bWwgPSB0eXBlb2YgZG9jdW1lbnQgIT09IFwidW5kZWZpbmVkXCIgPyBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQubGFuZyA6IFwiXCI7XHJcbiAgaWYgKGZyb21IdG1sICYmIFN0cmluZyhmcm9tSHRtbCkudHJpbSgpKSByZXR1cm4gbm9ybWFsaXplVWlMb2NhbGUoZnJvbUh0bWwpO1xyXG4gIHJldHVybiBcImVzLUVTXCI7XHJcbn07XHJcblxyXG5jb25zdCBwYWQgPSAobjogbnVtYmVyKSA9PiBuLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgXCIwXCIpO1xyXG5cclxuY29uc3QgdG9JU08gPSAoZDogRGF0ZSkgPT4gYCR7ZC5nZXRGdWxsWWVhcigpfS0ke3BhZChkLmdldE1vbnRoKCkgKyAxKX0tJHtwYWQoZC5nZXREYXRlKCkpfWA7XHJcblxyXG5jb25zdCBzdGFydE9mRGF5ID0gKGQ6IERhdGUpID0+IG5ldyBEYXRlKGQuZ2V0RnVsbFllYXIoKSwgZC5nZXRNb250aCgpLCBkLmdldERhdGUoKSk7XHJcblxyXG5jb25zdCBwYXJzZUlTTyA9IChzOiBzdHJpbmcpID0+IHtcclxuICBpZiAoIXMpIHJldHVybiBudWxsO1xyXG4gIGNvbnN0IHBhcnRzID0gcy5zcGxpdChcIi1cIikubWFwKE51bWJlcik7XHJcbiAgaWYgKHBhcnRzLmxlbmd0aCAhPT0gMykgcmV0dXJuIG51bGw7XHJcbiAgcmV0dXJuIG5ldyBEYXRlKHBhcnRzWzBdLCBwYXJ0c1sxXSAtIDEsIHBhcnRzWzJdKTtcclxufTtcclxuXHJcbmNvbnN0IHNhbWVEYXkgPSAoYTogRGF0ZSB8IG51bGwsIGI6IERhdGUgfCBudWxsKSA9PiAhIShhICYmIGIgJiYgYS5nZXRUaW1lKCkgPT09IGIuZ2V0VGltZSgpKTtcclxuXHJcbmNvbnN0IGlzQmVmb3JlID0gKGE6IERhdGUgfCBudWxsLCBiOiBEYXRlIHwgbnVsbCkgPT4gISEoYSAmJiBiICYmIGEuZ2V0VGltZSgpIDwgYi5nZXRUaW1lKCkpO1xyXG5cclxuICBjb25zdCBub3JtYWxpemVSYW5nZSA9IChmcm9tOiBzdHJpbmcsIHRvOiBzdHJpbmcpID0+IHtcclxuICAgIGlmICghZnJvbSB8fCAhdG8pIHJldHVybiB7IGZyb20sIHRvIH07XHJcbiAgICBjb25zdCBmcm9tRGF0ZSA9IHBhcnNlSVNPKGZyb20pO1xyXG4gICAgY29uc3QgdG9EYXRlID0gcGFyc2VJU08odG8pO1xyXG4gICAgaWYgKCFmcm9tRGF0ZSB8fCAhdG9EYXRlKSByZXR1cm4geyBmcm9tLCB0byB9O1xyXG4gIGlmIChpc0JlZm9yZSh0b0RhdGUsIGZyb21EYXRlKSkge1xyXG4gICAgcmV0dXJuIHsgZnJvbTogdG9JU08odG9EYXRlKSwgdG86IHRvSVNPKGZyb21EYXRlKSB9O1xyXG4gIH1cclxuICByZXR1cm4geyBmcm9tOiB0b0lTTyhmcm9tRGF0ZSksIHRvOiB0b0lTTyh0b0RhdGUpIH07XHJcbn07XHJcblxyXG4gIGNvbnN0IGZvcm1hdERpc3BsYXkgPSAoZDogRGF0ZSwgbG9jYWxlOiBzdHJpbmcpID0+IHtcclxuICBpZiAoaXNCYXNxdWVMb2NhbGUobG9jYWxlKSkge1xyXG4gICAgY29uc3QgbW9udGggPSBCQVNRVUVfTU9OVEhTX1NIT1JUW2QuZ2V0TW9udGgoKV07XHJcbiAgICByZXR1cm4gYCR7ZC5nZXREYXRlKCl9ICR7bW9udGh9ICR7ZC5nZXRGdWxsWWVhcigpfWAudG9Mb3dlckNhc2UoKTtcclxuICB9XHJcbiAgcmV0dXJuIGRcclxuICAgIC50b0xvY2FsZURhdGVTdHJpbmcobG9jYWxlLCB7XHJcbiAgICAgIGRheTogXCJudW1lcmljXCIsXHJcbiAgICAgIG1vbnRoOiBcInNob3J0XCIsXHJcbiAgICAgIHllYXI6IFwibnVtZXJpY1wiLFxyXG4gICAgfSlcclxuICAgIC5yZXBsYWNlKC9cXC4vZywgXCJcIilcclxuICAgIC50b0xvd2VyQ2FzZSgpO1xyXG59O1xyXG5cclxuY29uc3QgZm9ybWF0TW9udGhMYWJlbCA9IChkOiBEYXRlLCBsb2NhbGU6IHN0cmluZykgPT4ge1xyXG4gIGlmICgvXnpoL2kudGVzdChsb2NhbGUpKSB7XHJcbiAgICByZXR1cm4gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQobG9jYWxlLCB7IHllYXI6IFwibnVtZXJpY1wiLCBtb250aDogXCJsb25nXCIgfSkuZm9ybWF0KGQpO1xyXG4gIH1cclxuICBpZiAoaXNCYXNxdWVMb2NhbGUobG9jYWxlKSkge1xyXG4gICAgcmV0dXJuIGAke0JBU1FVRV9NT05USFNbZC5nZXRNb250aCgpXX0gJHtkLmdldEZ1bGxZZWFyKCl9YDtcclxuICB9XHJcbiAgY29uc3QgbW9udGhOYW1lID0gZC50b0xvY2FsZURhdGVTdHJpbmcobG9jYWxlLCB7IG1vbnRoOiBcImxvbmdcIiB9KTtcclxuICBjb25zdCBjYXBNb250aE5hbWUgPSBtb250aE5hbWUgJiYgL1tBLVphLXpdLy50ZXN0KG1vbnRoTmFtZVswXSlcclxuICAgID8gbW9udGhOYW1lWzBdLnRvTG9jYWxlVXBwZXJDYXNlKGxvY2FsZSkgKyBtb250aE5hbWUuc2xpY2UoMSlcclxuICAgIDogbW9udGhOYW1lO1xyXG4gIHJldHVybiBgJHtjYXBNb250aE5hbWV9ICR7ZC5nZXRGdWxsWWVhcigpfWA7XHJcbn07XHJcblxyXG5jb25zdCBwYXJzZURhdGVWYWx1ZSA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XHJcbiAgaWYgKCF2YWx1ZSkgcmV0dXJuIG51bGw7XHJcbiAgY29uc3QgcmF3ID0gU3RyaW5nKHZhbHVlKS50cmltKCk7XHJcbiAgaWYgKCFyYXcpIHJldHVybiBudWxsO1xyXG5cclxuICBjb25zdCBkYXRlUGFydCA9IHJhdy5zcGxpdChcIlRcIilbMF0uc3BsaXQoXCIgXCIpWzBdO1xyXG5cclxuICBpZiAoL15cXGR7NH0tXFxkezJ9LVxcZHsyfSQvLnRlc3QoZGF0ZVBhcnQpKSB7XHJcbiAgICBjb25zdCBbeSwgbSwgZF0gPSBkYXRlUGFydC5zcGxpdChcIi1cIikubWFwKE51bWJlcik7XHJcbiAgICByZXR1cm4gbmV3IERhdGUoeSwgbSAtIDEsIGQpO1xyXG4gIH1cclxuXHJcbiAgaWYgKC9eXFxkezJ9Wy4vLV1cXGR7Mn1bLi8tXVxcZHs0fSQvLnRlc3QoZGF0ZVBhcnQpKSB7XHJcbiAgICBjb25zdCBwYXJ0cyA9IGRhdGVQYXJ0LnNwbGl0KC9bLi8tXS8pLm1hcChOdW1iZXIpO1xyXG4gICAgY29uc3QgW2QsIG0sIHldID0gcGFydHM7XHJcbiAgICByZXR1cm4gbmV3IERhdGUoeSwgbSAtIDEsIGQpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgcGFyc2VkID0gbmV3IERhdGUocmF3KTtcclxuICByZXR1cm4gTnVtYmVyLmlzTmFOKHBhcnNlZC5nZXRUaW1lKCkpID8gbnVsbCA6IHBhcnNlZDtcclxufTtcclxuXHJcbmNvbnN0IGZvcm1hdERhdGVQYXJ0cyA9ICh2YWx1ZTogc3RyaW5nLCBsb2NhbGU6IHN0cmluZykgPT4ge1xyXG4gIGlmICghdmFsdWUpIHJldHVybiB7IHllYXI6IFwiXCIsIG1vbnRoOiBcIlwiLCBkYXk6IFwiXCIgfTtcclxuICBjb25zdCBkID0gcGFyc2VEYXRlVmFsdWUodmFsdWUpO1xyXG4gIGlmICghZCkgcmV0dXJuIHsgeWVhcjogXCJcIiwgbW9udGg6IFwiXCIsIGRheTogXCJcIiB9O1xyXG4gIGxldCBtb250aCA9IFwiXCI7XHJcbiAgaWYgKGlzQmFzcXVlTG9jYWxlKGxvY2FsZSkpIHtcclxuICAgIG1vbnRoID0gQkFTUVVFX01PTlRIU19TSE9SVFtkLmdldE1vbnRoKCldIHx8IFwiXCI7XHJcbiAgfSBlbHNlIHtcclxuICAgIG1vbnRoID0gZC50b0xvY2FsZURhdGVTdHJpbmcobG9jYWxlLCB7IG1vbnRoOiBcInNob3J0XCIgfSkucmVwbGFjZSgvXFwuL2csIFwiXCIpO1xyXG4gIH1cclxuICByZXR1cm4ge1xyXG4gICAgeWVhcjogU3RyaW5nKGQuZ2V0RnVsbFllYXIoKSksXHJcbiAgICBtb250aDogbW9udGgudG9VcHBlckNhc2UoKSxcclxuICAgIGRheTogU3RyaW5nKGQuZ2V0RGF0ZSgpKS5wYWRTdGFydCgyLCBcIjBcIiksXHJcbiAgfTtcclxufTtcclxuXHJcbmNvbnN0IHRvVGl0bGVDYXNlID0gKHZhbHVlOiBzdHJpbmcsIGxvY2FsZTogc3RyaW5nKSA9PiB7XHJcbiAgaWYgKCF2YWx1ZSkgcmV0dXJuIFwiXCI7XHJcbiAgY29uc3QgbG93ZXIgPSB2YWx1ZS50b0xvY2FsZUxvd2VyQ2FzZShsb2NhbGUpO1xyXG4gIHRyeSB7XHJcbiAgICByZXR1cm4gbG93ZXIucmVwbGFjZSgvKF58W15cXHB7TH1dKShcXHB7TH0pL2d1LCAoX21hdGNoLCBwcmVmaXgsIGNoKSA9PiBgJHtwcmVmaXh9JHtjaC50b0xvY2FsZVVwcGVyQ2FzZShsb2NhbGUpfWApO1xyXG4gIH0gY2F0Y2gge1xyXG4gICAgcmV0dXJuIGxvd2VyLnJlcGxhY2UoLyhefFtcXHMtL10pKFxcUykvZywgKF9tYXRjaCwgcHJlZml4LCBjaCkgPT4gYCR7cHJlZml4fSR7Y2gudG9Mb2NhbGVVcHBlckNhc2UobG9jYWxlKX1gKTtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCB0b1NlbnRlbmNlQ2FzZSA9ICh2YWx1ZTogc3RyaW5nLCBsb2NhbGU6IHN0cmluZykgPT4ge1xyXG4gIGlmICghdmFsdWUpIHJldHVybiBcIlwiO1xyXG4gIGNvbnN0IHRyaW1tZWQgPSB2YWx1ZS50cmltKCk7XHJcbiAgaWYgKCF0cmltbWVkKSByZXR1cm4gdHJpbW1lZDtcclxuICBjb25zdCBsb3dlciA9IHRyaW1tZWQudG9Mb2NhbGVMb3dlckNhc2UobG9jYWxlKTtcclxuICByZXR1cm4gbG93ZXJbMF0udG9Mb2NhbGVVcHBlckNhc2UobG9jYWxlKSArIGxvd2VyLnNsaWNlKDEpO1xyXG59O1xyXG5cclxuY29uc3QgbG9nSGlzdG9yeSA9IChtZXNzYWdlOiBzdHJpbmcsIGRhdGE/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPikgPT4ge1xyXG4gIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm47XHJcbiAgY29uc3QgZGVidWdGbGFnID0gKHdpbmRvdyBhcyBhbnkpLl9fSU5EX0RFQlVHX0hJU1RPUllfXztcclxuICBpZiAoZGVidWdGbGFnICE9PSB0cnVlKSByZXR1cm47XHJcbiAgaWYgKGRhdGEpIHtcclxuICAgIGNvbnNvbGUuZGVidWcoXCJbSGlzdG9yeV1cIiwgbWVzc2FnZSwgZGF0YSk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGNvbnNvbGUuZGVidWcoXCJbSGlzdG9yeV1cIiwgbWVzc2FnZSk7XHJcbiAgfVxyXG59O1xyXG5cclxuLy8gSGlzdG9yeSBwYWdlIHdpdGggUmVhY3Qgc3RhdGUgKyBlZmZlY3RzIChubyBsZWdhY3kgRE9NIGxvZ2ljKS5cclxuZXhwb3J0IGNvbnN0IEhpc3RvcnlQYWdlID0gKHsgZGVmYXVsdEZyb21EYXRlID0gXCJcIiwgZGVmYXVsdFRvRGF0ZSA9IFwiXCIgfTogUHJvcHMpID0+IHtcclxuICBjb25zdCBsb2NhbGUgPSB1c2VNZW1vKCgpID0+IGdldFVpTG9jYWxlKCksIFtdKTtcclxuICBjb25zdCBjYW5WaWV3SGlzdG9yeSA9IGNhbkFjY2VzcyhcIlZJU0lUQVNfSElTVE9SSUFMXCIsIFwiVmlld1wiKTtcclxuICBjb25zdCBjYW5DcmVhdGVWaXNpdCA9IGNhbkFjY2VzcyhcIlZJU0lUQVNfQ1JFQUNJT05cIiwgXCJBZGRcIik7XHJcbiAgY29uc3Qgbm9EYXRhVGV4dCA9IGluZFQoXCJDb21tb25fTm9EYXRhXCIsIFwiTm8gZGF0YVwiKTtcclxuXHJcbiAgY29uc3QgYWN0aXZhdG9yUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgcG9wb3ZlclJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xyXG5cclxuICBjb25zdCB7IHJlYWRDYWNoZWRGaWx0ZXIsIGNsZWFyRmlsdGVyQ2FjaGUsIGNvbnN1bWVSZXR1cm5GbGFnLCBzYXZlQ2FjaGVkRmlsdGVyIH0gPSB1c2VIaXN0b3J5RmlsdGVyQ2FjaGUoKTtcclxuICBjb25zdCB7XHJcbiAgICBzdGFydERhdGUsXHJcbiAgICBlbmREYXRlLFxyXG4gICAgaG92ZXJEYXRlLFxyXG4gICAgc2VsZWN0aW5nU3RlcCxcclxuICAgIGN1cnJlbnRNb250aCxcclxuICAgIGN1cnJlbnRZZWFyLFxyXG4gICAgaXNPcGVuLFxyXG4gICAgc2hvd01hbnVhbFBpY2tlclBhbmVsLFxyXG4gICAgYWN0aXZlUXVpY2tGaWx0ZXIsXHJcbiAgICBzZWxlY3RlZENsaWVudCxcclxuICAgIGNsaWVudFJlc2V0S2V5LFxyXG4gICAgc2hvd0ZpbHRlcnMsXHJcbiAgICBzaG93TWFudWFsRXJyb3IsXHJcbiAgICBmcm9tRGF0ZVZhbHVlLFxyXG4gICAgdG9EYXRlVmFsdWUsXHJcbiAgICBhY2NvdW50TnVtVmFsdWUsXHJcbiAgICBoYXNSZXN0b3JlZEZpbHRlclJlZixcclxuICAgIGRpZEluaXRGaWx0ZXJSZWYsXHJcbiAgICBzZXRIb3ZlckRhdGUsXHJcbiAgICBzZXRTZWxlY3RpbmdTdGVwLFxyXG4gICAgc2V0Q3VycmVudE1vbnRoLFxyXG4gICAgc2V0Q3VycmVudFllYXIsXHJcbiAgICBzZXRJc09wZW4sXHJcbiAgICBzZXRTaG93RmlsdGVycyxcclxuICAgIHNldFNob3dNYW51YWxFcnJvcixcclxuICAgIHZhbGlkYXRlTWFudWFsUmFuZ2UsXHJcbiAgICBhcHBseURlZmF1bHRSYW5nZUZyb21Qcm9wcyxcclxuICAgIHJlc2V0SGlzdG9yeUZpbHRlcnMsXHJcbiAgICBhcHBseUNhY2hlZEZpbHRlcixcclxuICAgIGhhbmRsZVNlbGVjdCxcclxuICAgIGhhbmRsZUNsZWFyU3RhdGUsXHJcbiAgICBvcGVuUG9wb3ZlcixcclxuICAgIGhhbmRsZUFjdGl2YXRvcktleURvd24sXHJcbiAgICBoYW5kbGVTZWN0aW9uS2V5RG93bixcclxuICAgIGhhbmRsZVF1aWNrRmlsdGVyLFxyXG4gICAgaGFuZGxlQ2xpZW50U2VsZWN0ZWQsXHJcbiAgfSA9IHVzZUhpc3RvcnlGaWx0ZXJzU3RhdGUoe1xyXG4gICAgZGVmYXVsdEZyb21EYXRlLFxyXG4gICAgZGVmYXVsdFRvRGF0ZSxcclxuICAgIGxvZ0hpc3RvcnksXHJcbiAgICBwYXJzZURhdGVWYWx1ZSxcclxuICAgIHBhcnNlSVNPLFxyXG4gICAgdG9JU08sXHJcbiAgICBzdGFydE9mRGF5LFxyXG4gICAgaXNCZWZvcmUsXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IHsgaXRlbXMsIHRvdGFsLCBjdXJyZW50UGFnZSwgaXNMb2FkaW5nLCBlcnJvck1lc3NhZ2UsIGxvYWRBY3Rpdml0aWVzLCByZXNldEFjdGl2aXRpZXMsIHJldHJ5T25OZXR3b3JrRXJyb3JSZWYsIGxhc3RTaWduYXR1cmVSZWYgfSA9XHJcbiAgICB1c2VIaXN0b3J5QWN0aXZpdGllcyh7XHJcbiAgICAgIGZyb21EYXRlVmFsdWUsXHJcbiAgICAgIHRvRGF0ZVZhbHVlLFxyXG4gICAgICBhY2NvdW50TnVtVmFsdWUsXHJcbiAgICAgIHBhZ2VTaXplOiBQQUdFX1NJWkUsXHJcbiAgICAgIG5vcm1hbGl6ZVJhbmdlLFxyXG4gICAgICBvbkZvcmJpZGRlbjogc2hvd1Blcm1pc3Npb25Nb2RhbCxcclxuICAgICAgb25EZWJ1ZzogbG9nSGlzdG9yeSxcclxuICAgIH0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgbG9nSGlzdG9yeShcImluaXRcIiwgeyBkZWZhdWx0RnJvbURhdGUsIGRlZmF1bHRUb0RhdGUgfSk7XHJcbiAgfSwgW2RlZmF1bHRGcm9tRGF0ZSwgZGVmYXVsdFRvRGF0ZV0pO1xyXG5cclxuICBjb25zdCBhcHBseUZpbHRlcnMgPSB1c2VDYWxsYmFjayhcclxuICAgIChvcHRpb25zPzogeyBjbG9zZVBhbmVsPzogYm9vbGVhbjsgZm9yY2U/OiBib29sZWFuOyBwYWdlPzogbnVtYmVyIH0pID0+IHtcclxuICAgICAgaWYgKCF2YWxpZGF0ZU1hbnVhbFJhbmdlKCkpIHJldHVybjtcclxuICAgICAgaWYgKCFzdGFydERhdGUgfHwgIWVuZERhdGUpIHJldHVybjtcclxuXHJcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSBub3JtYWxpemVSYW5nZShmcm9tRGF0ZVZhbHVlLCB0b0RhdGVWYWx1ZSk7XHJcbiAgICAgIGNvbnN0IHBhZ2UgPSBvcHRpb25zPy5wYWdlID8/IDE7XHJcbiAgICAgIGNvbnN0IHNpZ25hdHVyZSA9IGAke25vcm1hbGl6ZWQuZnJvbX18JHtub3JtYWxpemVkLnRvfXwke2FjY291bnROdW1WYWx1ZX18JHtwYWdlfWA7XHJcblxyXG4gICAgICBpZiAob3B0aW9ucz8uZm9yY2UgfHwgbGFzdFNpZ25hdHVyZVJlZi5jdXJyZW50ICE9PSBzaWduYXR1cmUpIHtcclxuICAgICAgICBsb2FkQWN0aXZpdGllcyhwYWdlLCB7IGZyb21EYXRlOiBub3JtYWxpemVkLmZyb20sIHRvRGF0ZTogbm9ybWFsaXplZC50bywgYWNjb3VudE51bTogYWNjb3VudE51bVZhbHVlIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzZXRTaG93TWFudWFsRXJyb3IoZmFsc2UpO1xyXG4gICAgICBpZiAob3B0aW9ucz8uY2xvc2VQYW5lbCkge1xyXG4gICAgICAgIHNldElzT3BlbihmYWxzZSk7XHJcbiAgICAgICAgc2V0U2hvd0ZpbHRlcnMoZmFsc2UpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgW2FjY291bnROdW1WYWx1ZSwgZW5kRGF0ZSwgZnJvbURhdGVWYWx1ZSwgbG9hZEFjdGl2aXRpZXMsIHN0YXJ0RGF0ZSwgdG9EYXRlVmFsdWUsIHZhbGlkYXRlTWFudWFsUmFuZ2VdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgdG90YWxQYWdlcyA9IE1hdGguY2VpbCgodG90YWwgfHwgMCkgLyBQQUdFX1NJWkUpO1xyXG5cclxuICB1c2VIaXN0b3J5UGFnZUxpc3RlbmVycyh7XHJcbiAgICBpc09wZW4sXHJcbiAgICBhY3RpdmF0b3JSZWYsXHJcbiAgICBwb3BvdmVyUmVmLFxyXG4gICAgaGFzUmVzdG9yZWRGaWx0ZXJSZWYsXHJcbiAgICByZXRyeU9uTmV0d29ya0Vycm9yUmVmLFxyXG4gICAgY3VycmVudFBhZ2UsXHJcbiAgICBsb2dIaXN0b3J5LFxyXG4gICAgY29uc3VtZVJldHVybkZsYWcsXHJcbiAgICByZWFkQ2FjaGVkRmlsdGVyLFxyXG4gICAgYXBwbHlDYWNoZWRGaWx0ZXIsXHJcbiAgICBsb2FkQWN0aXZpdGllcyxcclxuICAgIHNldElzT3BlbixcclxuICAgIHNldEhvdmVyRGF0ZSxcclxuICAgIHNldFNob3dGaWx0ZXJzLFxyXG4gICAgYXBwbHlGaWx0ZXJzLFxyXG4gIH0pO1xyXG5cclxuICAvLyBSZXN0b3JlIGNhY2hlZCBmaWx0ZXIgb24gaW5pdGlhbCBtb3VudCBvbmx5LlxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoZGlkSW5pdEZpbHRlclJlZi5jdXJyZW50KSByZXR1cm47XHJcbiAgICBkaWRJbml0RmlsdGVyUmVmLmN1cnJlbnQgPSB0cnVlO1xyXG4gICAgY29uc3QgY2FjaGVkID0gY29uc3VtZVJldHVybkZsYWcoKSA/IHJlYWRDYWNoZWRGaWx0ZXIoKSA6IG51bGw7XHJcbiAgICBpZiAoY2FjaGVkICYmIGNhY2hlZC5mcm9tRGF0ZSAmJiBjYWNoZWQudG9EYXRlKSB7XHJcbiAgICAgIGxvZ0hpc3RvcnkoXCJyZXN0b3JlRmlsdGVyXCIsIGNhY2hlZCk7XHJcbiAgICAgIGNvbnN0IGNhY2hlZFJlcXVlc3QgPSBhcHBseUNhY2hlZEZpbHRlcihjYWNoZWQpO1xyXG4gICAgICBpZiAoY2FjaGVkUmVxdWVzdCkge1xyXG4gICAgICAgIHJldHJ5T25OZXR3b3JrRXJyb3JSZWYuY3VycmVudCA9IHRydWU7XHJcbiAgICAgICAgbG9hZEFjdGl2aXRpZXMoY2FjaGVkUmVxdWVzdC5wYWdlLCBjYWNoZWRSZXF1ZXN0Lm92ZXJyaWRlKTtcclxuICAgICAgICBzZXRTaG93RmlsdGVycyhmYWxzZSk7XHJcbiAgICAgICAgc2V0SXNPcGVuKGZhbHNlKTtcclxuICAgICAgICBoYXNSZXN0b3JlZEZpbHRlclJlZi5jdXJyZW50ID0gdHJ1ZTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBkZWZhdWx0UmVxdWVzdCA9IGFwcGx5RGVmYXVsdFJhbmdlRnJvbVByb3BzKCk7XHJcbiAgICBpZiAoZGVmYXVsdFJlcXVlc3QpIHtcclxuICAgICAgcmV0cnlPbk5ldHdvcmtFcnJvclJlZi5jdXJyZW50ID0gdHJ1ZTtcclxuICAgICAgbG9hZEFjdGl2aXRpZXMoZGVmYXVsdFJlcXVlc3QucGFnZSwgZGVmYXVsdFJlcXVlc3Qub3ZlcnJpZGUpO1xyXG4gICAgICBzZXRTaG93RmlsdGVycyhmYWxzZSk7XHJcbiAgICAgIHNldElzT3BlbihmYWxzZSk7XHJcbiAgICAgIGhhc1Jlc3RvcmVkRmlsdGVyUmVmLmN1cnJlbnQgPSB0cnVlO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgcmVzZXRIaXN0b3J5RmlsdGVycygpO1xyXG4gICAgY2xlYXJGaWx0ZXJDYWNoZSgpO1xyXG4gICAgcmVzZXRBY3Rpdml0aWVzKCk7XHJcbiAgICBzZXRTaG93RmlsdGVycyh0cnVlKTtcclxuICAgIHNldElzT3BlbihmYWxzZSk7XHJcbiAgfSwgW1xyXG4gICAgYXBwbHlDYWNoZWRGaWx0ZXIsXHJcbiAgICBhcHBseURlZmF1bHRSYW5nZUZyb21Qcm9wcyxcclxuICAgIGNsZWFyRmlsdGVyQ2FjaGUsXHJcbiAgICBjb25zdW1lUmV0dXJuRmxhZyxcclxuICAgIGRpZEluaXRGaWx0ZXJSZWYsXHJcbiAgICBoYXNSZXN0b3JlZEZpbHRlclJlZixcclxuICAgIGxvYWRBY3Rpdml0aWVzLFxyXG4gICAgcmVhZENhY2hlZEZpbHRlcixcclxuICAgIHJlc2V0QWN0aXZpdGllcyxcclxuICAgIHJlc2V0SGlzdG9yeUZpbHRlcnMsXHJcbiAgICByZXRyeU9uTmV0d29ya0Vycm9yUmVmLFxyXG4gIF0pO1xyXG5cclxuICAvLyBLZWVwIHRoZSBwaWNrZXIgc3RlcCBpbiBzeW5jIHdpdGggY3VycmVudCBzZWxlY3Rpb24uXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmIChzdGFydERhdGUgJiYgIWVuZERhdGUgJiYgc2VsZWN0aW5nU3RlcCA9PT0gXCJzdGFydFwiKSB7XHJcbiAgICAgIHNldFNlbGVjdGluZ1N0ZXAoXCJlbmRcIik7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmICghc3RhcnREYXRlICYmIHNlbGVjdGluZ1N0ZXAgIT09IFwic3RhcnRcIikge1xyXG4gICAgICBzZXRTZWxlY3RpbmdTdGVwKFwic3RhcnRcIik7XHJcbiAgICB9XHJcbiAgfSwgW3N0YXJ0RGF0ZSwgZW5kRGF0ZSwgc2VsZWN0aW5nU3RlcF0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVDbGVhciA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKGV2ZW50OiBSZWFjdC5Nb3VzZUV2ZW50KSA9PiB7XHJcbiAgICAgIGhhbmRsZUNsZWFyU3RhdGUoZXZlbnQpO1xyXG4gICAgICBjbGVhckZpbHRlckNhY2hlKCk7XHJcbiAgICAgIHJlc2V0QWN0aXZpdGllcygpO1xyXG4gICAgfSxcclxuICAgIFtjbGVhckZpbHRlckNhY2hlLCBoYW5kbGVDbGVhclN0YXRlLCByZXNldEFjdGl2aXRpZXNdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlUmVzZXRGaWx0ZXJzID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgcmVzZXRIaXN0b3J5RmlsdGVycygpO1xyXG4gICAgY2xlYXJGaWx0ZXJDYWNoZSgpO1xyXG4gICAgcmVzZXRBY3Rpdml0aWVzKCk7XHJcbiAgICBzZXRJc09wZW4oZmFsc2UpO1xyXG4gICAgc2V0U2hvd0ZpbHRlcnModHJ1ZSk7XHJcbiAgfSwgW2NsZWFyRmlsdGVyQ2FjaGUsIHJlc2V0QWN0aXZpdGllcywgcmVzZXRIaXN0b3J5RmlsdGVycywgc2V0SXNPcGVuLCBzZXRTaG93RmlsdGVyc10pO1xyXG5cclxuICBjb25zdCBoYW5kbGVOYXZpZ2F0ZSA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKGxpbmtJZDogc3RyaW5nKSA9PiB7XHJcbiAgICAgIGlmICghY2FuVmlld0hpc3RvcnkpIHtcclxuICAgICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHNhdmVDYWNoZWRGaWx0ZXIoe1xyXG4gICAgICAgICAgZnJvbURhdGU6IGZyb21EYXRlVmFsdWUgfHwgXCJcIixcclxuICAgICAgICAgIHRvRGF0ZTogdG9EYXRlVmFsdWUgfHwgXCJcIixcclxuICAgICAgICAgIHBhZ2U6IGN1cnJlbnRQYWdlLFxyXG4gICAgICAgICAgY2xpZW50QWNjb3VudDogc2VsZWN0ZWRDbGllbnQ/LnZhbHVlIHx8IFwiXCIsXHJcbiAgICAgICAgICBjbGllbnRUZXh0OiBzZWxlY3RlZENsaWVudD8udGV4dCB8fCBcIlwiLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGVuY29kZVVSSUNvbXBvbmVudChsaW5rSWQpO1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYC9WaXNpdGFzL0RldGFsbGUvJHt0YXJnZXR9YDtcclxuICAgICAgfSwgTkFWX0RFTEFZX01TKTtcclxuICAgIH0sXHJcbiAgICBbY2FuVmlld0hpc3RvcnksIGN1cnJlbnRQYWdlLCBmcm9tRGF0ZVZhbHVlLCBzYXZlQ2FjaGVkRmlsdGVyLCB0b0RhdGVWYWx1ZSwgc2VsZWN0ZWRDbGllbnRdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgY2FsZW5kYXIgPSB1c2VNZW1vKCgpID0+IHtcclxuICAgIGNvbnN0IGZpcnN0RGF5ID0gbmV3IERhdGUoY3VycmVudFllYXIsIGN1cnJlbnRNb250aCwgMSk7XHJcbiAgICBjb25zdCBkYXlzSW5Nb250aCA9IG5ldyBEYXRlKGN1cnJlbnRZZWFyLCBjdXJyZW50TW9udGggKyAxLCAwKS5nZXREYXRlKCk7XHJcbiAgICBjb25zdCBvZmZzZXQgPSAoZmlyc3REYXkuZ2V0RGF5KCkgKyA2KSAlIDc7XHJcbiAgICBjb25zdCBjZWxsczogQ2FsZW5kYXJDZWxsW10gPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb2Zmc2V0OyBpKyspIHtcclxuICAgICAgY2VsbHMucHVzaCh7IGRhdGU6IG51bGwsIGlzbzogXCJcIiwgaXNFbXB0eTogdHJ1ZSB9KTtcclxuICAgIH1cclxuICAgIGZvciAobGV0IGQgPSAxOyBkIDw9IGRheXNJbk1vbnRoOyBkKyspIHtcclxuICAgICAgY29uc3QgZGF0ZU9iaiA9IG5ldyBEYXRlKGN1cnJlbnRZZWFyLCBjdXJyZW50TW9udGgsIGQpO1xyXG4gICAgICBjZWxscy5wdXNoKHsgZGF0ZTogZGF0ZU9iaiwgaXNvOiB0b0lTTyhkYXRlT2JqKSwgaXNFbXB0eTogZmFsc2UgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBjZWxscyxcclxuICAgICAgbGFiZWw6IGZvcm1hdE1vbnRoTGFiZWwoZmlyc3REYXksIGxvY2FsZSksXHJcbiAgICB9O1xyXG4gIH0sIFtjdXJyZW50TW9udGgsIGN1cnJlbnRZZWFyLCBsb2NhbGVdKTtcclxuXHJcbiAgY29uc3QgcHJldmlld0VuZCA9IGVuZERhdGUgfHwgKHNlbGVjdGluZ1N0ZXAgPT09IFwiZW5kXCIgPyBob3ZlckRhdGUgOiBudWxsKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlUHJldk1vbnRoID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoZXZlbnQ6IFJlYWN0Lk1vdXNlRXZlbnQ8SFRNTEJ1dHRvbkVsZW1lbnQ+KSA9PiB7XHJcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICBzZXRDdXJyZW50TW9udGgoKHByZXYpID0+IHtcclxuICAgICAgICBjb25zdCBuZXh0ID0gcHJldiAtIDE7XHJcbiAgICAgICAgaWYgKG5leHQgPCAwKSB7XHJcbiAgICAgICAgICBzZXRDdXJyZW50WWVhcigoeWVhcikgPT4geWVhciAtIDEpO1xyXG4gICAgICAgICAgcmV0dXJuIDExO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV4dDtcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgW3NldEN1cnJlbnRNb250aCwgc2V0Q3VycmVudFllYXJdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlTmV4dE1vbnRoID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoZXZlbnQ6IFJlYWN0Lk1vdXNlRXZlbnQ8SFRNTEJ1dHRvbkVsZW1lbnQ+KSA9PiB7XHJcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICBzZXRDdXJyZW50TW9udGgoKHByZXYpID0+IHtcclxuICAgICAgICBjb25zdCBuZXh0ID0gcHJldiArIDE7XHJcbiAgICAgICAgaWYgKG5leHQgPiAxMSkge1xyXG4gICAgICAgICAgc2V0Q3VycmVudFllYXIoKHllYXIpID0+IHllYXIgKyAxKTtcclxuICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV4dDtcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgW3NldEN1cnJlbnRNb250aCwgc2V0Q3VycmVudFllYXJdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlR3JpZE1vdXNlTGVhdmUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBzZXRIb3ZlckRhdGUobnVsbCk7XHJcbiAgfSwgW3NldEhvdmVyRGF0ZV0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVNYW51YWxEYXlDbGljayA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKGNlbGw6IEhpc3RvcnlNYW51YWxEYXlDZWxsKSA9PiB7XHJcbiAgICAgIGlmICghY2VsbC5kYXRlKSByZXR1cm47XHJcbiAgICAgIGxvZ0hpc3RvcnkoXCJkYXlDbGlja1wiLCB7IGRhdGU6IGNlbGwuaXNvIHx8IFwiXCIsIGRpc2FibGVkOiAhIWNlbGwuZGlzYWJsZWQgfSk7XHJcbiAgICAgIGhhbmRsZVNlbGVjdChjZWxsLmRhdGUpO1xyXG4gICAgfSxcclxuICAgIFtoYW5kbGVTZWxlY3RdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlTWFudWFsRGF5SG92ZXIgPSB1c2VDYWxsYmFjayhcclxuICAgIChjZWxsOiBIaXN0b3J5TWFudWFsRGF5Q2VsbCkgPT4ge1xyXG4gICAgICBpZiAoIWNlbGwuZGF0ZSkgcmV0dXJuO1xyXG4gICAgICBpZiAoc2VsZWN0aW5nU3RlcCA9PT0gXCJlbmRcIiAmJiBzdGFydERhdGUpIHtcclxuICAgICAgICBzZXRIb3ZlckRhdGUobmV3IERhdGUoY2VsbC5kYXRlKSk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBbc2VsZWN0aW5nU3RlcCwgc2V0SG92ZXJEYXRlLCBzdGFydERhdGVdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgbWFudWFsRGF5Q2VsbHMgPSB1c2VNZW1vPEhpc3RvcnlNYW51YWxEYXlDZWxsW10+KCgpID0+IHtcclxuICAgIHJldHVybiBjYWxlbmRhci5jZWxscy5tYXAoKGNlbGwsIGlkeCkgPT4ge1xyXG4gICAgICBpZiAoY2VsbC5pc0VtcHR5KSB7XHJcbiAgICAgICAgcmV0dXJuIHsga2V5OiBgZW1wdHktJHtpZHh9YCwgaXNFbXB0eTogdHJ1ZSB9O1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBkYXRlT2JqID0gY2VsbC5kYXRlIGFzIERhdGU7XHJcbiAgICAgIGNvbnN0IGlzU3RhcnQgPSBzYW1lRGF5KGRhdGVPYmosIHN0YXJ0RGF0ZSk7XHJcbiAgICAgIGNvbnN0IGlzRW5kID0gc2FtZURheShkYXRlT2JqLCBlbmREYXRlKTtcclxuICAgICAgY29uc3QgaW5SYW5nZSA9IHN0YXJ0RGF0ZSAmJiBwcmV2aWV3RW5kICYmIGlzQmVmb3JlKHN0YXJ0RGF0ZSwgZGF0ZU9iaikgJiYgaXNCZWZvcmUoZGF0ZU9iaiwgcHJldmlld0VuZCk7XHJcbiAgICAgIGNvbnN0IGhvdmVyUmFuZ2UgPSBzdGFydERhdGUgJiYgIWVuZERhdGUgJiYgaG92ZXJEYXRlICYmIGlzQmVmb3JlKHN0YXJ0RGF0ZSwgZGF0ZU9iaikgJiYgaXNCZWZvcmUoZGF0ZU9iaiwgaG92ZXJEYXRlKTtcclxuICAgICAgY29uc3QgZGlzYWJsZWQgPSBzZWxlY3RpbmdTdGVwID09PSBcImVuZFwiICYmICEhc3RhcnREYXRlICYmIGlzQmVmb3JlKGRhdGVPYmosIHN0YXJ0RGF0ZSk7XHJcbiAgICAgIGNvbnN0IGlzVG9kYXkgPSBzYW1lRGF5KGRhdGVPYmosIG5ldyBEYXRlKCkpO1xyXG5cclxuICAgICAgY29uc3QgZGF5Q2xhc3MgPSBjbGFzc05hbWVzKFxyXG4gICAgICAgIFwiZHJwLWRheVwiLFxyXG4gICAgICAgIGlzU3RhcnQgPyBcInN0YXJ0IHJhbmdlLXN0YXJ0XCIgOiBcIlwiLFxyXG4gICAgICAgIGlzRW5kID8gXCJlbmQgcmFuZ2UtZW5kXCIgOiBcIlwiLFxyXG4gICAgICAgIGluUmFuZ2UgPyBcImluLXJhbmdlXCIgOiBcIlwiLFxyXG4gICAgICAgIGhvdmVyUmFuZ2UgPyBcImhvdmVyLXJhbmdlXCIgOiBcIlwiLFxyXG4gICAgICAgIGRpc2FibGVkID8gXCJkaXNhYmxlZFwiIDogXCJcIixcclxuICAgICAgICBpc1RvZGF5ID8gXCJ0b2RheVwiIDogXCJcIlxyXG4gICAgICApO1xyXG5cclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBrZXk6IGNlbGwuaXNvLFxyXG4gICAgICAgIGlzRW1wdHk6IGZhbHNlLFxyXG4gICAgICAgIGRhdGU6IGRhdGVPYmosXHJcbiAgICAgICAgaXNvOiBjZWxsLmlzbyxcclxuICAgICAgICBkYXlMYWJlbDogZGF0ZU9iai5nZXREYXRlKCksXHJcbiAgICAgICAgZGF5Q2xhc3MsXHJcbiAgICAgICAgZGlzYWJsZWQsXHJcbiAgICAgIH07XHJcbiAgICB9KTtcclxuICB9LCBbY2FsZW5kYXIuY2VsbHMsIGVuZERhdGUsIGhvdmVyRGF0ZSwgcHJldmlld0VuZCwgc2VsZWN0aW5nU3RlcCwgc3RhcnREYXRlXSk7XHJcblxyXG4gIGNvbnN0IHsgdGltZWxpbmVJdGVtcyB9ID0gdXNlSGlzdG9yeVRpbWVsaW5lSXRlbXMoe1xyXG4gICAgaXRlbXMsXHJcbiAgICBsb2NhbGUsXHJcbiAgICBub0RhdGFUZXh0LFxyXG4gICAgbG9nSGlzdG9yeSxcclxuICAgIHRvVGl0bGVDYXNlLFxyXG4gICAgZm9ybWF0RGF0ZVBhcnRzLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBsYWJlbEZyb20gPSB0b1NlbnRlbmNlQ2FzZShpbmRUKFwiSGlzdG9yeV9Gcm9tXCIsIFwiRnJvbVwiKSwgbG9jYWxlKTtcclxuICBjb25zdCBsYWJlbFRvID0gdG9TZW50ZW5jZUNhc2UoaW5kVChcIkhpc3RvcnlfVG9cIiwgXCJUb1wiKSwgbG9jYWxlKTtcclxuICBjb25zdCBzdW1tYXJ5RnJvbSA9IGxhYmVsRnJvbTtcclxuICBjb25zdCBzdW1tYXJ5VG8gPSBsYWJlbFRvO1xyXG4gIGNvbnN0IGZpbHRlclRpdGxlID0gaW5kVChcIkhpc3RvcnlfRmlsdGVyX0RhdGVcIiwgXCJEYXRlXCIpO1xyXG4gIGNvbnN0IGFkZERhdGVMYWJlbCA9IGluZFQoXCJIaXN0b3J5X0FkZERhdGVcIiwgXCJBZGQgZGF0ZVwiKTtcclxuICBjb25zdCBjbGVhclJhbmdlTGFiZWwgPSBpbmRUKFwiSGlzdG9yeV9DbGVhclJhbmdlXCIsIFwiQ2xlYXIgcmFuZ2VcIik7XHJcbiAgY29uc3QgcHJldk1vbnRoTGFiZWwgPSBpbmRUKFwiSGlzdG9yeV9QcmV2TW9udGhcIiwgXCJQcmV2aW91cyBtb250aFwiKTtcclxuICBjb25zdCBuZXh0TW9udGhMYWJlbCA9IGluZFQoXCJIaXN0b3J5X05leHRNb250aFwiLCBcIk5leHQgbW9udGhcIik7XHJcbiAgY29uc3Qgc3RhdHVzU2VsZWN0U3RhcnRMYWJlbCA9IGluZFQoXCJIaXN0b3J5X1N0YXR1c19TZWxlY3RTdGFydFwiLCBcIlNlbGVjdCBzdGFydCBkYXRlXCIpO1xyXG4gIGNvbnN0IHN0YXR1c1NlbGVjdEVuZExhYmVsID0gaW5kVChcIkhpc3RvcnlfU3RhdHVzX1NlbGVjdEVuZFwiLCBcIlNlbGVjdCBlbmQgZGF0ZVwiKTtcclxuICBjb25zdCB3ZWVrRGF5TGFiZWxzID0gdXNlTWVtbyhcclxuICAgICgpID0+IFtcclxuICAgICAgaW5kVChcIkhpc3RvcnlfRGF5X01vblwiLCBcIk1vblwiKSxcclxuICAgICAgaW5kVChcIkhpc3RvcnlfRGF5X1R1ZVwiLCBcIlR1ZVwiKSxcclxuICAgICAgaW5kVChcIkhpc3RvcnlfRGF5X1dlZFwiLCBcIldlZFwiKSxcclxuICAgICAgaW5kVChcIkhpc3RvcnlfRGF5X1RodVwiLCBcIlRodVwiKSxcclxuICAgICAgaW5kVChcIkhpc3RvcnlfRGF5X0ZyaVwiLCBcIkZyaVwiKSxcclxuICAgICAgaW5kVChcIkhpc3RvcnlfRGF5X1NhdFwiLCBcIlNhdFwiKSxcclxuICAgICAgaW5kVChcIkhpc3RvcnlfRGF5X1N1blwiLCBcIlN1blwiKSxcclxuICAgIF0sXHJcbiAgICBbXVxyXG4gICk7XHJcbiAgY29uc3QgY2xlYXJMYWJlbCA9IGluZFQoXCJIaXN0b3J5X0ZpbHRlcl9DbGVhclwiLCBcIkNsZWFyXCIpO1xyXG4gIGNvbnN0IGFwcGx5TGFiZWwgPSBpbmRUKFwiSGlzdG9yeV9GaWx0ZXJfQXBwbHlcIiwgXCJBcHBseVwiKTtcclxuICBjb25zdCBjbGllbnRMYWJlbCA9IGluZFQoXCJIaXN0b3J5X0ZpbHRlcl9DbGllbnRcIiwgXCJBY2NvdW50XCIpO1xuICBjb25zdCBxdWlja0N1c3RvbUxhYmVsID0gaW5kVChcIkhpc3RvcnlfUXVpY2tfQ3VzdG9tXCIsIFwiRGF0ZVwiKTtcclxuICBjb25zdCBxdWljazdEYXlzTGFiZWwgPSBpbmRUKFwiSGlzdG9yeV9RdWlja183RGF5c1wiLCBcIjcgZGF5c1wiKTtcclxuICBjb25zdCBxdWljazMwRGF5c0xhYmVsID0gaW5kVChcIkhpc3RvcnlfUXVpY2tfMzBEYXlzXCIsIFwiMzAgZGF5c1wiKTtcclxuICBjb25zdCBxdWljazkwRGF5c0xhYmVsID0gaW5kVChcIkhpc3RvcnlfUXVpY2tfOTBEYXlzXCIsIFwiOTAgZGF5c1wiKTtcclxuICBjb25zdCBwYWdlRmlyc3RMYWJlbCA9IGluZFQoXCJIaXN0b3J5X1BhZ2VfRmlyc3RcIiwgXCJGaXJzdFwiKTtcclxuICBjb25zdCBwYWdlUHJldkxhYmVsID0gaW5kVChcIkhpc3RvcnlfUGFnZV9QcmV2XCIsIFwiUHJldmlvdXNcIik7XHJcbiAgY29uc3QgcGFnZU5leHRMYWJlbCA9IGluZFQoXCJIaXN0b3J5X1BhZ2VfTmV4dFwiLCBcIk5leHRcIik7XHJcbiAgY29uc3QgcGFnZUxhc3RMYWJlbCA9IGluZFQoXCJIaXN0b3J5X1BhZ2VfTGFzdFwiLCBcIkxhc3RcIik7XHJcbiAgY29uc3QgcXVpY2tGaWx0ZXJzID0gdXNlTWVtbyhcclxuICAgICgpID0+IFtcclxuICAgICAgeyBpZDogXCJjdXN0b21cIiBhcyBjb25zdCwgbGFiZWw6IHF1aWNrQ3VzdG9tTGFiZWwgfSxcclxuICAgICAgeyBpZDogXCJkYXlzLTdcIiBhcyBjb25zdCwgbGFiZWw6IHF1aWNrN0RheXNMYWJlbCB9LFxyXG4gICAgICB7IGlkOiBcImRheXMtMzBcIiBhcyBjb25zdCwgbGFiZWw6IHF1aWNrMzBEYXlzTGFiZWwgfSxcclxuICAgICAgeyBpZDogXCJkYXlzLTkwXCIgYXMgY29uc3QsIGxhYmVsOiBxdWljazkwRGF5c0xhYmVsIH0sXHJcbiAgICBdLFxyXG4gICAgW3F1aWNrMzBEYXlzTGFiZWwsIHF1aWNrN0RheXNMYWJlbCwgcXVpY2s5MERheXNMYWJlbCwgcXVpY2tDdXN0b21MYWJlbF1cclxuICApO1xyXG4gIGNvbnN0IHBhZ2luYXRpb25MYWJlbHMgPSB1c2VNZW1vKFxyXG4gICAgKCkgPT4gKHtcclxuICAgICAgZmlyc3Q6IHBhZ2VGaXJzdExhYmVsLFxyXG4gICAgICBwcmV2OiBwYWdlUHJldkxhYmVsLFxyXG4gICAgICBuZXh0OiBwYWdlTmV4dExhYmVsLFxyXG4gICAgICBsYXN0OiBwYWdlTGFzdExhYmVsLFxyXG4gICAgfSksXHJcbiAgICBbcGFnZUZpcnN0TGFiZWwsIHBhZ2VMYXN0TGFiZWwsIHBhZ2VOZXh0TGFiZWwsIHBhZ2VQcmV2TGFiZWxdXHJcbiAgKTtcclxuICBjb25zdCBzaG93RmlsdGVyQWN0aW9ucyA9IHNob3dGaWx0ZXJzO1xyXG4gIGNvbnN0IHNob3dTdW1tYXJ5ID0gIXNob3dGaWx0ZXJzICYmICEhc3RhcnREYXRlICYmICEhZW5kRGF0ZTtcclxuICBjb25zdCBzaG93UmVzdWx0cyA9ICFzaG93RmlsdGVycztcclxuICBjb25zdCBzaG93TWFudWFsUGlja2VyID0gYWN0aXZlUXVpY2tGaWx0ZXIgPT09IFwiY3VzdG9tXCIgJiYgc2hvd01hbnVhbFBpY2tlclBhbmVsO1xyXG4gIGNvbnN0IHNob3dJbmxpbmVTdW1tYXJ5ID0gISFzdGFydERhdGUgJiYgISFlbmREYXRlICYmICFzaG93TWFudWFsUGlja2VyO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJtYXgtdy0zeGwgbXgtYXV0byBweC0xIHNtOnB4LTIgcHQtMyBwYi00IHNwYWNlLXktMlwiPlxyXG4gICAgICB7c2hvd1N1bW1hcnkgJiYgKFxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmlsdGVyLWNhcmQgZmlsdGVyLWNhcmQtLXN1bW1hcnkgcC0zIHNtOnAtNCBtdC0xIG1iLTNcIj5cclxuICAgICAgICAgIDxIaXN0b3J5U3VtbWFyeVxyXG4gICAgICAgICAgICBzdW1tYXJ5RnJvbUxhYmVsPXtzdW1tYXJ5RnJvbX1cclxuICAgICAgICAgICAgc3VtbWFyeVRvTGFiZWw9e3N1bW1hcnlUb31cclxuICAgICAgICAgICAgZnJvbVZhbHVlPXtzdGFydERhdGUgPyBmb3JtYXREaXNwbGF5KHN0YXJ0RGF0ZSwgbG9jYWxlKSA6IFwiLS1cIn1cclxuICAgICAgICAgICAgdG9WYWx1ZT17ZW5kRGF0ZSA/IGZvcm1hdERpc3BsYXkoZW5kRGF0ZSwgbG9jYWxlKSA6IFwiLS1cIn1cclxuICAgICAgICAgICAgY2xpZW50TGFiZWw9e2NsaWVudExhYmVsfVxyXG4gICAgICAgICAgICBjbGllbnRWYWx1ZT17c2VsZWN0ZWRDbGllbnQ/LnRleHQgfHwgXCJcIn1cclxuICAgICAgICAgICAgc2hvd0NsaWVudD17ISFzZWxlY3RlZENsaWVudH1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICl9XHJcbiAgICAgIHtzaG93RmlsdGVycyAmJiAoXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmlsdGVyLWNhcmQgZmlsdGVyLWNhcmQtLWV4cGFuZGVkIHAtMiBzbTpwLTIuNSByZWxhdGl2ZVwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xLjUgaGlzdG9yeS1maWx0ZXItc3RhY2sgZmxleCBmbGV4LWNvbFwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIGdhcC0yIGhpc3RvcnktcXVpY2stZmlsdGVyc1wiIGFyaWEtbGFiZWw9e2ZpbHRlclRpdGxlfT5cclxuICAgICAgICAgICAge3F1aWNrRmlsdGVycy5tYXAoKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICBjb25zdCBpc0FjdGl2ZSA9IGFjdGl2ZVF1aWNrRmlsdGVyID09PSBpdGVtLmlkO1xyXG4gICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8RmlsdGVyQnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgIGtleT17aXRlbS5pZH1cclxuICAgICAgICAgICAgICAgICAgbGFiZWw9e2l0ZW0ubGFiZWx9XHJcbiAgICAgICAgICAgICAgICAgIGFjdGl2ZT17aXNBY3RpdmV9XHJcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbFwiXHJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZVF1aWNrRmlsdGVyKGl0ZW0uaWQpfVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9KX1cclxuICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgIHtzaG93SW5saW5lU3VtbWFyeSAmJiAoXHJcbiAgICAgICAgICAgIDxIaXN0b3J5U3VtbWFyeVxyXG4gICAgICAgICAgICAgIHN1bW1hcnlGcm9tTGFiZWw9e3N1bW1hcnlGcm9tfVxyXG4gICAgICAgICAgICAgIHN1bW1hcnlUb0xhYmVsPXtzdW1tYXJ5VG99XHJcbiAgICAgICAgICAgICAgZnJvbVZhbHVlPXtzdGFydERhdGUgPyBmb3JtYXREaXNwbGF5KHN0YXJ0RGF0ZSwgbG9jYWxlKSA6IFwiLS1cIn1cclxuICAgICAgICAgICAgICB0b1ZhbHVlPXtlbmREYXRlID8gZm9ybWF0RGlzcGxheShlbmREYXRlLCBsb2NhbGUpIDogXCItLVwifVxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImdhcC15LTEgdGV4dC1bMTFweF0gcHgtMVwiXHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICApfVxyXG5cclxuICAgICAgICAgIHtzaG93TWFudWFsUGlja2VyICYmIChcclxuICAgICAgICAgICAgPEhpc3RvcnlNYW51YWxEYXRlUGlja2VyXHJcbiAgICAgICAgICAgICAgYWN0aXZhdG9yUmVmPXthY3RpdmF0b3JSZWZ9XHJcbiAgICAgICAgICAgICAgcG9wb3ZlclJlZj17cG9wb3ZlclJlZn1cclxuICAgICAgICAgICAgICBzaG93TWFudWFsRXJyb3I9e3Nob3dNYW51YWxFcnJvcn1cclxuICAgICAgICAgICAgICBzaG93U3RhcnRFcnJvcj17c2hvd01hbnVhbEVycm9yICYmICFzdGFydERhdGV9XHJcbiAgICAgICAgICAgICAgc2hvd0VuZEVycm9yPXtzaG93TWFudWFsRXJyb3IgJiYgIWVuZERhdGV9XHJcbiAgICAgICAgICAgICAgZmlsdGVyVGl0bGU9e2ZpbHRlclRpdGxlfVxyXG4gICAgICAgICAgICAgIGlzT3Blbj17aXNPcGVufVxyXG4gICAgICAgICAgICAgIHNlbGVjdGluZ1N0ZXA9e3NlbGVjdGluZ1N0ZXB9XHJcbiAgICAgICAgICAgICAgbGFiZWxGcm9tPXtsYWJlbEZyb219XHJcbiAgICAgICAgICAgICAgbGFiZWxUbz17bGFiZWxUb31cclxuICAgICAgICAgICAgICBzdGFydERhdGVUZXh0PXtzdGFydERhdGUgPyBmb3JtYXREaXNwbGF5KHN0YXJ0RGF0ZSwgbG9jYWxlKSA6IGFkZERhdGVMYWJlbH1cclxuICAgICAgICAgICAgICBlbmREYXRlVGV4dD17ZW5kRGF0ZSA/IGZvcm1hdERpc3BsYXkoZW5kRGF0ZSwgbG9jYWxlKSA6IGFkZERhdGVMYWJlbH1cclxuICAgICAgICAgICAgICBjbGVhclJhbmdlTGFiZWw9e2NsZWFyUmFuZ2VMYWJlbH1cclxuICAgICAgICAgICAgICBoYXNTZWxlY3RlZFJhbmdlPXshIXN0YXJ0RGF0ZSB8fCAhIWVuZERhdGV9XHJcbiAgICAgICAgICAgICAgbW9udGhMYWJlbD17Y2FsZW5kYXIubGFiZWx9XHJcbiAgICAgICAgICAgICAgd2Vla0RheUxhYmVscz17d2Vla0RheUxhYmVsc31cclxuICAgICAgICAgICAgICBzdGF0dXNUZXh0PXtzZWxlY3RpbmdTdGVwID09PSBcInN0YXJ0XCIgPyBzdGF0dXNTZWxlY3RTdGFydExhYmVsIDogc3RhdHVzU2VsZWN0RW5kTGFiZWx9XHJcbiAgICAgICAgICAgICAgZGF5Q2VsbHM9e21hbnVhbERheUNlbGxzfVxyXG4gICAgICAgICAgICAgIHByZXZNb250aExhYmVsPXtwcmV2TW9udGhMYWJlbH1cclxuICAgICAgICAgICAgICBuZXh0TW9udGhMYWJlbD17bmV4dE1vbnRoTGFiZWx9XHJcbiAgICAgICAgICAgICAgb25PcGVuUG9wb3Zlcj17b3BlblBvcG92ZXJ9XHJcbiAgICAgICAgICAgICAgb25BY3RpdmF0b3JLZXlEb3duPXtoYW5kbGVBY3RpdmF0b3JLZXlEb3dufVxyXG4gICAgICAgICAgICAgIG9uU2VjdGlvbktleURvd249e2hhbmRsZVNlY3Rpb25LZXlEb3dufVxyXG4gICAgICAgICAgICAgIG9uQ2xlYXI9e2hhbmRsZUNsZWFyfVxyXG4gICAgICAgICAgICAgIG9uUHJldk1vbnRoPXtoYW5kbGVQcmV2TW9udGh9XHJcbiAgICAgICAgICAgICAgb25OZXh0TW9udGg9e2hhbmRsZU5leHRNb250aH1cclxuICAgICAgICAgICAgICBvbkdyaWRNb3VzZUxlYXZlPXtoYW5kbGVHcmlkTW91c2VMZWF2ZX1cclxuICAgICAgICAgICAgICBvbkRheUNsaWNrPXtoYW5kbGVNYW51YWxEYXlDbGlja31cclxuICAgICAgICAgICAgICBvbkRheUhvdmVyPXtoYW5kbGVNYW51YWxEYXlIb3Zlcn1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICl9XHJcblxyXG4gICAgICAgICAgPENsaWVudFNlYXJjaENvbWJvYm94XHJcbiAgICAgICAgICAgIGtleT17Y2xpZW50UmVzZXRLZXl9XHJcbiAgICAgICAgICAgIHZhbHVlPXtzZWxlY3RlZENsaWVudH1cclxuICAgICAgICAgICAgb25TZWxlY3RlZD17aGFuZGxlQ2xpZW50U2VsZWN0ZWR9XHJcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiSGlzdG9yeV9GaWx0ZXJfQ2xpZW50XCIsIFwiQWNjb3VudFwiKX1cbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiSGlzdG9yeV9GaWx0ZXJfQ2xpZW50XCIsIFwiQWNjb3VudFwiKX1cbiAgICAgICAgICAgIHZhcmlhbnQ9XCJjb21wYWN0XCJcclxuICAgICAgICAgICAgc2hvd0xhYmVsPXtmYWxzZX1cclxuICAgICAgICAgICAgaWRCYXNlPVwiaGlzdG9yeS1jbGllbnRcIlxyXG4gICAgICAgICAgICBwb3J0YWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxyXG4gICAgICAgICAgLz5cclxuXHJcbiAgICAgICAgICB7c2hvd0ZpbHRlckFjdGlvbnMgJiYgKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTEgZ3JpZCBncmlkLWNvbHMtMiBnYXAtMiBoaXN0b3J5LWZpbHRlci1hY3Rpb25zXCI+XHJcbiAgICAgICAgICAgICAgPEFjdGlvbkJ1dHRvblxyXG4gICAgICAgICAgICAgICAgbGFiZWw9e2NsZWFyTGFiZWx9XHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGxcIlxyXG4gICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlUmVzZXRGaWx0ZXJzfVxyXG4gICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgPEFjdGlvbkJ1dHRvblxyXG4gICAgICAgICAgICAgICAgbGFiZWw9e2FwcGx5TGFiZWx9XHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGxcIlxyXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICBhcHBseUZpbHRlcnMoeyBjbG9zZVBhbmVsOiB0cnVlLCBwYWdlOiAxIH0pO1xyXG4gICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICl9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICApfVxyXG5cclxuICAgICAgPGlucHV0IHR5cGU9XCJoaWRkZW5cIiBpZD1cImZyb21EYXRlXCIgdmFsdWU9e2Zyb21EYXRlVmFsdWV9IHJlYWRPbmx5IC8+XHJcbiAgICAgIDxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgaWQ9XCJ0b0RhdGVcIiB2YWx1ZT17dG9EYXRlVmFsdWV9IHJlYWRPbmx5IC8+XHJcblxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgaWQ9XCJyZXN1bHRzTG9hZGVyXCJcclxuICAgICAgICBjbGFzc05hbWU9XCJsb2FkZXItYm94IGdsYXNzLXBhbmVsIHNoYWRvdy1jYXJkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQtc20gdGV4dC1zbGF0ZS03MDBcIlxyXG4gICAgICAgIHN0eWxlPXt7IGRpc3BsYXk6IGlzTG9hZGluZyA/IFwiZmxleFwiIDogXCJub25lXCIgfX1cclxuICAgICAgPlxyXG4gICAgICAgIDxzdmcgY2xhc3NOYW1lPVwiaW5kLXNwaW5uZXIgaC01IHctNVwiIHZpZXdCb3g9XCIwIDAgMjAgMjBcIiByb2xlPVwic3RhdHVzXCIgYXJpYS1sYWJlbD17aW5kVChcIkhpc3RvcnlfTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9PlxyXG4gICAgICAgICAgPGNpcmNsZSBjbGFzc05hbWU9XCJpbmQtc3Bpbm5lcl9fY2lyY2xlXCIgY3g9XCIxMFwiIGN5PVwiMTBcIiByPVwiOFwiIHN0cm9rZVdpZHRoPVwiMlwiIC8+XHJcbiAgICAgICAgPC9zdmc+XHJcbiAgICAgICAge2luZFQoXCJIaXN0b3J5X0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfVxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIHtzaG93UmVzdWx0cyAmJiAoXHJcbiAgICAgICAgPD5cclxuICAgICAgICAgIDxIaXN0b3J5VGFibGVcclxuICAgICAgICAgICAgaXRlbXM9e3RpbWVsaW5lSXRlbXN9XHJcbiAgICAgICAgICAgIG5vRGF0YVRleHQ9e2luZFQoXCJIaXN0b3J5X05vRGF0YUluUmFuZ2VcIiwgXCJObyB2aXNpdHMgaW4gdGhpcyByYW5nZVwiKX1cclxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlPXtlcnJvck1lc3NhZ2V9XHJcbiAgICAgICAgICAgIG9uTmF2aWdhdGU9e2hhbmRsZU5hdmlnYXRlfVxyXG4gICAgICAgICAgLz5cclxuXHJcbiAgICAgICAgICA8Q29tcGFjdFBhZ2luYXRpb25cclxuICAgICAgICAgICAgdG90YWxQYWdlcz17dG90YWxQYWdlc31cclxuICAgICAgICAgICAgY3VycmVudFBhZ2U9e2N1cnJlbnRQYWdlfVxyXG4gICAgICAgICAgICBwYWdlV2luZG93PXtQQUdFX1dJTkRPV31cclxuICAgICAgICAgICAgbG9hZGluZz17aXNMb2FkaW5nfVxyXG4gICAgICAgICAgICBvblBhZ2VDaGFuZ2U9eyhwYWdlKSA9PiBsb2FkQWN0aXZpdGllcyhwYWdlKX1cclxuICAgICAgICAgICAgbGFiZWxzPXtwYWdpbmF0aW9uTGFiZWxzfVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICA8Lz5cclxuICAgICAgKX1cclxuICAgICAge2NhbkNyZWF0ZVZpc2l0ICYmIChcclxuICAgICAgICA8RmxvYXRpbmdBY3Rpb25CdXR0b25cclxuICAgICAgICAgIHJvdXRlPVwiL1Zpc2l0YXMvQ3JlYXRlP2ZyZXNoPTFcIlxyXG4gICAgICAgICAgYXJpYUxhYmVsPXtpbmRUKFwiQ29tbW9uX0NyZWF0ZVwiLCBcIkNyZWF0ZVwiKX1cclxuICAgICAgICAgIHNpemU9ezc2fVxyXG4gICAgICAgICAgcmlnaHQ9ezE2fVxyXG4gICAgICAgICAgYm90dG9tPXtGQUJfQkFTRV9CT1RUT019XHJcbiAgICAgICAgLz5cclxuICAgICAgKX1cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG4vLyBNb3VudCBoZWxwZXIgZm9yIHRoZSBsZWdhY3kgUmF6b3Igdmlldy5cclxuZXhwb3J0IGNvbnN0IG1vdW50SGlzdG9yeVBhZ2UgPSAocm9vdDogSFRNTEVsZW1lbnQpID0+IHtcclxuICBjb25zdCBkZWZhdWx0RnJvbURhdGUgPSByb290LmdldEF0dHJpYnV0ZShcImRhdGEtZGVmYXVsdC1mcm9tXCIpIHx8IFwiXCI7XHJcbiAgY29uc3QgZGVmYXVsdFRvRGF0ZSA9IHJvb3QuZ2V0QXR0cmlidXRlKFwiZGF0YS1kZWZhdWx0LXRvXCIpIHx8IFwiXCI7XHJcblxyXG4gIG1vdW50UmVhY3RJc2xhbmQocm9vdCwgPEhpc3RvcnlQYWdlIGRlZmF1bHRGcm9tRGF0ZT17ZGVmYXVsdEZyb21EYXRlfSBkZWZhdWx0VG9EYXRlPXtkZWZhdWx0VG9EYXRlfSAvPik7XHJcbn07XHJcblxyXG5jb25zdCBtb3VudCA9ICgpID0+IHtcclxuICBjb25zdCByb290RWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpc2l0YXMtaGlzdG9yeS1yb290XCIpO1xyXG4gIGlmICghcm9vdEVsKSByZXR1cm47XHJcbiAgbW91bnRIaXN0b3J5UGFnZShyb290RWwpO1xyXG59O1xyXG5cclxubW91bnRXaGVuRG9jdW1lbnRSZWFkeShtb3VudCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBIaXN0b3J5UGFnZTtcclxuIiwgImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjaywgdXNlUmVmIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IGNsYXNzTmFtZXMgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvY2xhc3NOYW1lcy50c1wiO1xyXG5pbXBvcnQgeyB1c2VUaW1lbGluZUNhcmRFZmZlY3RzIH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZVRpbWVsaW5lQ2FyZEVmZmVjdHMudHNcIjtcclxuXHJcbmV4cG9ydCB0eXBlIFRpbWVsaW5lRGF0ZVBhcnRzID0ge1xyXG4gIHllYXI6IHN0cmluZztcclxuICBtb250aDogc3RyaW5nO1xyXG4gIGRheTogc3RyaW5nO1xyXG59O1xyXG5cclxuZXhwb3J0IHR5cGUgVGltZWxpbmVJdGVtID0ge1xyXG4gIGlkOiBzdHJpbmc7XHJcbiAgYWN0aXZpZGFkSWQ/OiBzdHJpbmc7XHJcbiAgcmVjSWQ/OiBudW1iZXIgfCBudWxsO1xyXG4gIG5hbWU6IHN0cmluZztcclxuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xyXG4gIGZ1bGxOYW1lOiBzdHJpbmc7XHJcbiAgZnVsbERlc2M6IHN0cmluZztcclxuICBkYXRlUGFydHM6IFRpbWVsaW5lRGF0ZVBhcnRzO1xyXG4gIGlzTm9EYXRhOiBib29sZWFuO1xyXG59O1xyXG5cclxudHlwZSBQcm9wcyA9IHtcclxuICBpdGVtczogVGltZWxpbmVJdGVtW107XHJcbiAgbm9EYXRhVGV4dDogc3RyaW5nO1xyXG4gIGVycm9yTWVzc2FnZTogc3RyaW5nO1xyXG4gIG9uTmF2aWdhdGU6IChsaW5rSWQ6IHN0cmluZykgPT4gdm9pZDtcclxufTtcclxuXHJcbmNvbnN0IFRBUF9NT1ZFX1BYID0gMTQ7XHJcbmNvbnN0IEhPTERfVE9fUFJFVklFV19NUyA9IDE2MDtcclxuXHJcbnR5cGUgVGFwR3VhcmRTdGF0ZSA9IHtcclxuICBhY3RpdmU6IGJvb2xlYW47XHJcbiAgcG9pbnRlcklkOiBudW1iZXIgfCBudWxsO1xyXG4gIHN0YXJ0WDogbnVtYmVyO1xyXG4gIHN0YXJ0WTogbnVtYmVyO1xyXG4gIHN0YXJ0VGltZTogbnVtYmVyO1xyXG4gIG1vdmVkOiBib29sZWFuO1xyXG4gIGxpbmtJZDogc3RyaW5nO1xyXG59O1xyXG5cclxuY29uc3QgSGlzdG9yeVRhYmxlID0gKHsgaXRlbXMsIG5vRGF0YVRleHQsIGVycm9yTWVzc2FnZSwgb25OYXZpZ2F0ZSB9OiBQcm9wcykgPT4ge1xyXG4gIGNvbnN0IGNvbnRhaW5lclJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IHRhcEd1YXJkUmVmID0gdXNlUmVmPFRhcEd1YXJkU3RhdGU+KHtcclxuICAgIGFjdGl2ZTogZmFsc2UsXHJcbiAgICBwb2ludGVySWQ6IG51bGwsXHJcbiAgICBzdGFydFg6IDAsXHJcbiAgICBzdGFydFk6IDAsXHJcbiAgICBzdGFydFRpbWU6IDAsXHJcbiAgICBtb3ZlZDogZmFsc2UsXHJcbiAgICBsaW5rSWQ6IFwiXCIsXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IHJlc29sdmVDbGlja2FibGVDYXJkID0gdXNlQ2FsbGJhY2soKHRhcmdldDogRXZlbnRUYXJnZXQgfCBudWxsKSA9PiB7XHJcbiAgICBjb25zdCBub2RlID0gdGFyZ2V0IGFzIEhUTUxFbGVtZW50IHwgbnVsbDtcclxuICAgIGlmICghbm9kZSB8fCB0eXBlb2Ygbm9kZS5jbG9zZXN0ICE9PSBcImZ1bmN0aW9uXCIpIHJldHVybiBudWxsO1xyXG4gICAgY29uc3QgY2FyZCA9IG5vZGUuY2xvc2VzdDxIVE1MRWxlbWVudD4oXCIudGltZWxpbmUtY2FyZC0tY2xpY2thYmxlW2RhdGEtbGluay1pZF1cIik7XHJcbiAgICBpZiAoIWNhcmQpIHJldHVybiBudWxsO1xyXG4gICAgaWYgKCFjb250YWluZXJSZWYuY3VycmVudD8uY29udGFpbnMoY2FyZCkpIHJldHVybiBudWxsO1xyXG4gICAgcmV0dXJuIGNhcmQ7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCByZXNldFRhcEd1YXJkID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgdGFwR3VhcmRSZWYuY3VycmVudC5hY3RpdmUgPSBmYWxzZTtcclxuICAgIHRhcEd1YXJkUmVmLmN1cnJlbnQucG9pbnRlcklkID0gbnVsbDtcclxuICAgIHRhcEd1YXJkUmVmLmN1cnJlbnQubW92ZWQgPSBmYWxzZTtcclxuICAgIHRhcEd1YXJkUmVmLmN1cnJlbnQubGlua0lkID0gXCJcIjtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZVBvaW50ZXJEb3duID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoZXZlbnQ6IFJlYWN0LlBvaW50ZXJFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHtcclxuICAgICAgaWYgKGV2ZW50LnBvaW50ZXJUeXBlID09PSBcIm1vdXNlXCIgJiYgZXZlbnQuYnV0dG9uICE9PSAwKSByZXR1cm47XHJcbiAgICAgIGNvbnN0IGNhcmQgPSByZXNvbHZlQ2xpY2thYmxlQ2FyZChldmVudC50YXJnZXQpO1xyXG4gICAgICBpZiAoIWNhcmQpIHJldHVybjtcclxuICAgICAgY29uc3QgbGlua0lkID0gY2FyZC5kYXRhc2V0LmxpbmtJZCB8fCBcIlwiO1xyXG4gICAgICBpZiAoIWxpbmtJZCkgcmV0dXJuO1xyXG5cclxuICAgICAgdGFwR3VhcmRSZWYuY3VycmVudC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB0YXBHdWFyZFJlZi5jdXJyZW50LnBvaW50ZXJJZCA9IGV2ZW50LnBvaW50ZXJJZDtcclxuICAgICAgdGFwR3VhcmRSZWYuY3VycmVudC5zdGFydFggPSBldmVudC5jbGllbnRYO1xyXG4gICAgICB0YXBHdWFyZFJlZi5jdXJyZW50LnN0YXJ0WSA9IGV2ZW50LmNsaWVudFk7XHJcbiAgICAgIHRhcEd1YXJkUmVmLmN1cnJlbnQuc3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcclxuICAgICAgdGFwR3VhcmRSZWYuY3VycmVudC5tb3ZlZCA9IGZhbHNlO1xyXG4gICAgICB0YXBHdWFyZFJlZi5jdXJyZW50LmxpbmtJZCA9IGxpbmtJZDtcclxuICAgIH0sXHJcbiAgICBbcmVzb2x2ZUNsaWNrYWJsZUNhcmRdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlUG9pbnRlck1vdmUgPSB1c2VDYWxsYmFjaygoZXZlbnQ6IFJlYWN0LlBvaW50ZXJFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHtcclxuICAgIGNvbnN0IHN0YXRlID0gdGFwR3VhcmRSZWYuY3VycmVudDtcclxuICAgIGlmICghc3RhdGUuYWN0aXZlIHx8IGV2ZW50LnBvaW50ZXJJZCAhPT0gc3RhdGUucG9pbnRlcklkKSByZXR1cm47XHJcbiAgICBjb25zdCBkeCA9IE1hdGguYWJzKGV2ZW50LmNsaWVudFggLSBzdGF0ZS5zdGFydFgpO1xyXG4gICAgY29uc3QgZHkgPSBNYXRoLmFicyhldmVudC5jbGllbnRZIC0gc3RhdGUuc3RhcnRZKTtcclxuICAgIGlmIChkeCA+IFRBUF9NT1ZFX1BYIHx8IGR5ID4gVEFQX01PVkVfUFgpIHtcclxuICAgICAgc3RhdGUubW92ZWQgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlUG9pbnRlclVwID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoZXZlbnQ6IFJlYWN0LlBvaW50ZXJFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHtcclxuICAgICAgY29uc3Qgc3RhdGUgPSB0YXBHdWFyZFJlZi5jdXJyZW50O1xyXG4gICAgICBpZiAoIXN0YXRlLmFjdGl2ZSB8fCBldmVudC5wb2ludGVySWQgIT09IHN0YXRlLnBvaW50ZXJJZCkgcmV0dXJuO1xyXG4gICAgICBjb25zdCBsaW5rSWQgPSBzdGF0ZS5saW5rSWQ7XHJcbiAgICAgIGNvbnN0IGhlbGRNcyA9IERhdGUubm93KCkgLSBzdGF0ZS5zdGFydFRpbWU7XHJcbiAgICAgIGNvbnN0IHNob3VsZFRhcCA9ICFzdGF0ZS5tb3ZlZCAmJiBoZWxkTXMgPCBIT0xEX1RPX1BSRVZJRVdfTVM7XHJcbiAgICAgIHJlc2V0VGFwR3VhcmQoKTtcclxuICAgICAgaWYgKHNob3VsZFRhcCAmJiBsaW5rSWQpIHtcclxuICAgICAgICBvbk5hdmlnYXRlKGxpbmtJZCk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBbb25OYXZpZ2F0ZSwgcmVzZXRUYXBHdWFyZF1cclxuICApO1xyXG5cclxuICBjb25zdCBibG9ja0NsaXBib2FyZEFjdGlvbiA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKGV2ZW50OiBSZWFjdC5DbGlwYm9hcmRFdmVudDxIVE1MRGl2RWxlbWVudD4gfCBSZWFjdC5Nb3VzZUV2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4ge1xyXG4gICAgICBpZiAoIXJlc29sdmVDbGlja2FibGVDYXJkKGV2ZW50LnRhcmdldCkpIHJldHVybjtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIH0sXHJcbiAgICBbcmVzb2x2ZUNsaWNrYWJsZUNhcmRdXHJcbiAgKTtcclxuXHJcbiAgdXNlVGltZWxpbmVDYXJkRWZmZWN0cyh7IGNvbnRhaW5lclJlZiwgZXJyb3JNZXNzYWdlLCBpdGVtcywgcmVzb2x2ZUNsaWNrYWJsZUNhcmQgfSk7XHJcblxyXG4gIGNvbnN0IGhhc0l0ZW1zID0gaXRlbXMubGVuZ3RoID4gMDtcclxuICBjb25zdCBzaG93RW1wdHkgPSAhZXJyb3JNZXNzYWdlICYmICFoYXNJdGVtcztcclxuXHJcbiAgY29uc3QgY29udGVudCA9IGVycm9yTWVzc2FnZSA/IChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1kYW5nZXJcIj57ZXJyb3JNZXNzYWdlfTwvZGl2PlxyXG4gICkgOiBoYXNJdGVtcyA/IChcclxuICAgIGl0ZW1zLm1hcCgoaXRlbSwgaW5kZXgpID0+IHtcclxuICAgICAgY29uc3Qga2V5ID0gaXRlbS5pZCB8fCBpdGVtLnJlY0lkPy50b1N0cmluZygpIHx8IGB0aW1lbGluZS0ke2luZGV4fWA7XHJcbiAgICAgIGNvbnN0IGlzQ2xpY2thYmxlID0gIWl0ZW0uaXNOb0RhdGEgJiYgISFpdGVtLmlkO1xyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgIDxkaXYga2V5PXtrZXl9IGNsYXNzTmFtZT1cInRpbWVsaW5lLWl0ZW1cIj5cclxuICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxyXG4gICAgICAgICAgICAgIFwidGltZWxpbmUtY2FyZFwiLFxyXG4gICAgICAgICAgICAgIGl0ZW0uaXNOb0RhdGEgPyBcInRpbWVsaW5lLWNhcmQtLW5vZGF0YVwiIDogXCJcIixcclxuICAgICAgICAgICAgICBpc0NsaWNrYWJsZSA/IFwidGltZWxpbmUtY2FyZC0tY2xpY2thYmxlXCIgOiBcIlwiXHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgIGRhdGEtYWN0aXZpZGFkaWQ9e2l0ZW0uYWN0aXZpZGFkSWQgfHwgXCJcIn1cclxuICAgICAgICAgICAgZGF0YS1yZWNpZD17aXRlbS5yZWNJZCAhPSBudWxsID8gU3RyaW5nKGl0ZW0ucmVjSWQpIDogXCJcIn1cclxuICAgICAgICAgICAgZGF0YS1saW5rLWlkPXtpc0NsaWNrYWJsZSA/IGl0ZW0uaWQgOiBcIlwifVxyXG4gICAgICAgICAgICByb2xlPXtpc0NsaWNrYWJsZSA/IFwiYnV0dG9uXCIgOiB1bmRlZmluZWR9XHJcbiAgICAgICAgICAgIHRhYkluZGV4PXtpc0NsaWNrYWJsZSA/IDAgOiB1bmRlZmluZWR9XHJcbiAgICAgICAgICAgIGFyaWEtbGFiZWw9e2lzQ2xpY2thYmxlID8gKGl0ZW0uZnVsbE5hbWUgfHwgaXRlbS5uYW1lIHx8IG5vRGF0YVRleHQpIDogdW5kZWZpbmVkfVxyXG4gICAgICAgICAgICBvbktleURvd249e2lzQ2xpY2thYmxlXHJcbiAgICAgICAgICAgICAgPyAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChldmVudC5rZXkgPT09IFwiRW50ZXJcIiB8fCBldmVudC5rZXkgPT09IFwiIFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgIG9uTmF2aWdhdGUoaXRlbS5pZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIDogdW5kZWZpbmVkfVxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpbWVsaW5lLWRhdGUtcGFuZWwgZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTEgcHgtMyBweS0zIGJnLXNsYXRlLTUwIGJvcmRlci1yIGJvcmRlci1zbGF0ZS0yMDAgdGV4dC1zbGF0ZS02MDBcIj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1zZW1pYm9sZCB0cmFja2luZy1bMC4yZW1dIHRleHQtc2xhdGUtNTAwXCI+e2l0ZW0uZGF0ZVBhcnRzLnllYXJ9PC9kaXY+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdXBwZXJjYXNlIHRyYWNraW5nLVswLjJlbV0gdGV4dC1zbGF0ZS01MDBcIj57aXRlbS5kYXRlUGFydHMubW9udGh9PC9kaXY+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LTJ4bCBmb250LXNlbWlib2xkIHRleHQtcHJpbWFyeVwiPntpdGVtLmRhdGVQYXJ0cy5kYXl9PC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpbWVsaW5lLWNhcmRfX2NvbnRlbnQgZmxleC0xIHB5LTMgcHgtNFwiPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGltZWxpbmUtbmFtZVwiIGRhdGEtZnVsbHRleHQ9e2l0ZW0uZnVsbE5hbWUgfHwgaXRlbS5uYW1lfT57aXRlbS5uYW1lfTwvZGl2PlxyXG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRpbWVsaW5lLWRlc2MtdGV4dFwiIGRhdGEtZnVsbHRleHQ9e2l0ZW0uZnVsbERlc2MgfHwgaXRlbS5kZXNjcmlwdGlvbn0+e2l0ZW0uZGVzY3JpcHRpb24gfHwgbm9EYXRhVGV4dH08L3A+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICk7XHJcbiAgICB9KVxyXG4gICkgOiBudWxsO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdlxyXG4gICAgICBpZD1cInRpbWVsaW5lQ29udGFpbmVyXCJcclxuICAgICAgcmVmPXtjb250YWluZXJSZWZ9XHJcbiAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcInRpbWVsaW5lLWJveFwiLCBzaG93RW1wdHkgPyBcInRpbWVsaW5lLWVtcHR5XCIgOiBcIlwiKX1cclxuICAgICAgZGF0YS1lbXB0eS10ZXh0PXtub0RhdGFUZXh0fVxyXG4gICAgICBvblBvaW50ZXJEb3duQ2FwdHVyZT17aGFuZGxlUG9pbnRlckRvd259XHJcbiAgICAgIG9uUG9pbnRlck1vdmVDYXB0dXJlPXtoYW5kbGVQb2ludGVyTW92ZX1cclxuICAgICAgb25Qb2ludGVyVXBDYXB0dXJlPXtoYW5kbGVQb2ludGVyVXB9XHJcbiAgICAgIG9uUG9pbnRlckNhbmNlbENhcHR1cmU9e3Jlc2V0VGFwR3VhcmR9XHJcbiAgICAgIG9uUG9pbnRlckxlYXZlPXtyZXNldFRhcEd1YXJkfVxyXG4gICAgICBvbkNvbnRleHRNZW51Q2FwdHVyZT17YmxvY2tDbGlwYm9hcmRBY3Rpb259XHJcbiAgICAgIG9uQ29weUNhcHR1cmU9e2Jsb2NrQ2xpcGJvYXJkQWN0aW9ufVxyXG4gICAgICBvbkN1dENhcHR1cmU9e2Jsb2NrQ2xpcGJvYXJkQWN0aW9ufVxyXG4gICAgICBvblBhc3RlQ2FwdHVyZT17YmxvY2tDbGlwYm9hcmRBY3Rpb259XHJcbiAgICA+XHJcbiAgICAgIHtjb250ZW50fVxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbmNvbnN0IE1lbW9pemVkSGlzdG9yeVRhYmxlID0gUmVhY3QubWVtbyhIaXN0b3J5VGFibGUpO1xyXG5NZW1vaXplZEhpc3RvcnlUYWJsZS5kaXNwbGF5TmFtZSA9IFwiSGlzdG9yeVRhYmxlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNZW1vaXplZEhpc3RvcnlUYWJsZTtcclxuIiwgIlx1RkVGRmltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHR5cGUgeyBIaXN0b3J5Q2FjaGVkRmlsdGVyIH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZUhpc3RvcnlGaWx0ZXJDYWNoZS50c1wiO1xyXG5pbXBvcnQgeyBzZXRUb3BiYXJBY3Rpb25Hcm91cFJlYWR5IH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3RvcGJhckFjdGlvblZpc2liaWxpdHkudHNcIjtcclxuaW1wb3J0IHR5cGUgeyBGaWx0ZXJMb2FkUmVxdWVzdCwgTG9hZE92ZXJyaWRlIH0gZnJvbSBcIi4vdXNlSGlzdG9yeUZpbHRlcnNTdGF0ZS50c1wiO1xyXG5cclxudHlwZSBVc2VIaXN0b3J5UGFnZUxpc3RlbmVyc0FyZ3MgPSB7XHJcbiAgaXNPcGVuOiBib29sZWFuO1xyXG4gIGFjdGl2YXRvclJlZjogUmVhY3QuUmVmT2JqZWN0PEhUTUxEaXZFbGVtZW50IHwgbnVsbD47XHJcbiAgcG9wb3ZlclJlZjogUmVhY3QuUmVmT2JqZWN0PEhUTUxEaXZFbGVtZW50IHwgbnVsbD47XHJcbiAgaGFzUmVzdG9yZWRGaWx0ZXJSZWY6IFJlYWN0Lk11dGFibGVSZWZPYmplY3Q8Ym9vbGVhbj47XHJcbiAgcmV0cnlPbk5ldHdvcmtFcnJvclJlZjogUmVhY3QuTXV0YWJsZVJlZk9iamVjdDxib29sZWFuPjtcclxuICBjdXJyZW50UGFnZTogbnVtYmVyO1xyXG4gIGxvZ0hpc3Rvcnk6IChtZXNzYWdlOiBzdHJpbmcsIGRhdGE/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPikgPT4gdm9pZDtcclxuICBjb25zdW1lUmV0dXJuRmxhZzogKCkgPT4gYm9vbGVhbjtcclxuICByZWFkQ2FjaGVkRmlsdGVyOiAoKSA9PiBIaXN0b3J5Q2FjaGVkRmlsdGVyIHwgbnVsbDtcclxuICBhcHBseUNhY2hlZEZpbHRlcjogKGZpbHRlcjogSGlzdG9yeUNhY2hlZEZpbHRlciB8IG51bGwpID0+IEZpbHRlckxvYWRSZXF1ZXN0IHwgbnVsbDtcclxuICBsb2FkQWN0aXZpdGllczogKHBhZ2U6IG51bWJlciwgb3ZlcnJpZGU/OiBMb2FkT3ZlcnJpZGUpID0+IHZvaWQ7XHJcbiAgc2V0SXNPcGVuOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxib29sZWFuPj47XHJcbiAgc2V0SG92ZXJEYXRlOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxEYXRlIHwgbnVsbD4+O1xyXG4gIHNldFNob3dGaWx0ZXJzOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxib29sZWFuPj47XHJcbiAgYXBwbHlGaWx0ZXJzOiAob3B0aW9ucz86IHsgY2xvc2VQYW5lbD86IGJvb2xlYW47IGZvcmNlPzogYm9vbGVhbjsgcGFnZT86IG51bWJlciB9KSA9PiB2b2lkO1xyXG59O1xyXG5cclxuLy8gSGFuZGxlcyBnbG9iYWwgbGlzdGVuZXJzIHVzZWQgYnkgdGhlIGhpc3RvcnkgcGFnZSBmaWx0ZXJzIGFuZCBjYWxlbmRhciBVSS5cclxuZXhwb3J0IGNvbnN0IHVzZUhpc3RvcnlQYWdlTGlzdGVuZXJzID0gKHtcclxuICBpc09wZW4sXHJcbiAgYWN0aXZhdG9yUmVmLFxyXG4gIHBvcG92ZXJSZWYsXHJcbiAgaGFzUmVzdG9yZWRGaWx0ZXJSZWYsXHJcbiAgcmV0cnlPbk5ldHdvcmtFcnJvclJlZixcclxuICBjdXJyZW50UGFnZSxcclxuICBsb2dIaXN0b3J5LFxyXG4gIGNvbnN1bWVSZXR1cm5GbGFnLFxyXG4gIHJlYWRDYWNoZWRGaWx0ZXIsXHJcbiAgYXBwbHlDYWNoZWRGaWx0ZXIsXHJcbiAgbG9hZEFjdGl2aXRpZXMsXHJcbiAgc2V0SXNPcGVuLFxyXG4gIHNldEhvdmVyRGF0ZSxcclxuICBzZXRTaG93RmlsdGVycyxcclxuICBhcHBseUZpbHRlcnMsXHJcbn06IFVzZUhpc3RvcnlQYWdlTGlzdGVuZXJzQXJncykgPT4ge1xyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBzZXRUb3BiYXJBY3Rpb25Hcm91cFJlYWR5KFwiaGlzdG9yeS1saXN0LWFjdGlvbnNcIik7XHJcbiAgfSwgW10pO1xyXG5cclxuICAvLyBDbG9zZSB0aGUgbWFudWFsIHBpY2tlciB3aGVuIGNsaWNraW5nIG91dHNpZGUgb2YgdGhlIHJhbmdlIHBpY2tlciBVSS5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFpc09wZW4pIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBoYW5kbGVPdXRzaWRlID0gKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XHJcbiAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldCBhcyBOb2RlIHwgbnVsbDtcclxuICAgICAgaWYgKCF0YXJnZXQpIHJldHVybjtcclxuICAgICAgaWYgKHBvcG92ZXJSZWYuY3VycmVudD8uY29udGFpbnModGFyZ2V0KSkgcmV0dXJuO1xyXG4gICAgICBpZiAoYWN0aXZhdG9yUmVmLmN1cnJlbnQ/LmNvbnRhaW5zKHRhcmdldCkpIHJldHVybjtcclxuICAgICAgbG9nSGlzdG9yeShcImNsb3NlUG9wb3ZlcjpvdXRzaWRlXCIpO1xyXG4gICAgICBzZXRJc09wZW4oZmFsc2UpO1xyXG4gICAgICBzZXRIb3ZlckRhdGUobnVsbCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgaGFuZGxlT3V0c2lkZSk7XHJcbiAgICByZXR1cm4gKCkgPT4gZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBoYW5kbGVPdXRzaWRlKTtcclxuICB9LCBbYWN0aXZhdG9yUmVmLCBpc09wZW4sIGxvZ0hpc3RvcnksIHBvcG92ZXJSZWYsIHNldEhvdmVyRGF0ZSwgc2V0SXNPcGVuXSk7XHJcblxyXG4gIC8vIFJlLWFwcGx5IGZpbHRlcnMgYWZ0ZXIgYnJvd3NlciBiYWNrL2ZvcndhcmQgbmF2aWdhdGlvbiByZXR1cm5zIHRvIHRoZSBwYWdlLlxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBvblBhZ2VTaG93ID0gKCkgPT4ge1xyXG4gICAgICBpZiAoaGFzUmVzdG9yZWRGaWx0ZXJSZWYuY3VycmVudCkgcmV0dXJuO1xyXG4gICAgICBpZiAoY29uc3VtZVJldHVybkZsYWcoKSkge1xyXG4gICAgICAgIGNvbnN0IGNhY2hlZCA9IHJlYWRDYWNoZWRGaWx0ZXIoKTtcclxuICAgICAgICBjb25zdCBjYWNoZWRSZXF1ZXN0ID0gYXBwbHlDYWNoZWRGaWx0ZXIoY2FjaGVkKTtcclxuICAgICAgICBpZiAoY2FjaGVkUmVxdWVzdCkge1xyXG4gICAgICAgICAgcmV0cnlPbk5ldHdvcmtFcnJvclJlZi5jdXJyZW50ID0gdHJ1ZTtcclxuICAgICAgICAgIGxvYWRBY3Rpdml0aWVzKGNhY2hlZFJlcXVlc3QucGFnZSwgY2FjaGVkUmVxdWVzdC5vdmVycmlkZSk7XHJcbiAgICAgICAgICBzZXRTaG93RmlsdGVycyhmYWxzZSk7XHJcbiAgICAgICAgICBzZXRJc09wZW4oZmFsc2UpO1xyXG4gICAgICAgICAgaGFzUmVzdG9yZWRGaWx0ZXJSZWYuY3VycmVudCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicGFnZXNob3dcIiwgb25QYWdlU2hvdyk7XHJcbiAgICByZXR1cm4gKCkgPT4gd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwYWdlc2hvd1wiLCBvblBhZ2VTaG93KTtcclxuICB9LCBbXHJcbiAgICBhcHBseUNhY2hlZEZpbHRlcixcclxuICAgIGNvbnN1bWVSZXR1cm5GbGFnLFxyXG4gICAgaGFzUmVzdG9yZWRGaWx0ZXJSZWYsXHJcbiAgICBsb2FkQWN0aXZpdGllcyxcclxuICAgIHJlYWRDYWNoZWRGaWx0ZXIsXHJcbiAgICByZXRyeU9uTmV0d29ya0Vycm9yUmVmLFxyXG4gICAgc2V0SXNPcGVuLFxyXG4gICAgc2V0U2hvd0ZpbHRlcnMsXHJcbiAgXSk7XHJcblxyXG4gIC8vIFdpcmUgdG9wYmFyIGFjdGlvbnMgdGhhdCB0b2dnbGUgZmlsdGVycyBvciBmb3JjZSByZWZyZXNoIG9mIGN1cnJlbnQgcGFnZS5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3Qgb25Ub2dnbGVGaWx0ZXJzID0gKCkgPT4ge1xyXG4gICAgICBzZXRTaG93RmlsdGVycygocHJldikgPT4ge1xyXG4gICAgICAgIGNvbnN0IG5leHQgPSAhcHJldjtcclxuICAgICAgICBpZiAoIW5leHQpIHtcclxuICAgICAgICAgIHNldElzT3BlbihmYWxzZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbyh7IHRvcDogMCwgYmVoYXZpb3I6IFwic21vb3RoXCIgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXh0O1xyXG4gICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3Qgb25SZWZyZXNoID0gKCkgPT4ge1xyXG4gICAgICBhcHBseUZpbHRlcnMoeyBwYWdlOiBjdXJyZW50UGFnZSwgZm9yY2U6IHRydWUsIGNsb3NlUGFuZWw6IHRydWUgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiaGlzdG9yeS10b2dnbGUtZmlsdGVyXCIsIG9uVG9nZ2xlRmlsdGVycyk7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImhpc3RvcnktcmVmcmVzaFwiLCBvblJlZnJlc2gpO1xyXG5cclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwiaGlzdG9yeS10b2dnbGUtZmlsdGVyXCIsIG9uVG9nZ2xlRmlsdGVycyk7XHJcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwiaGlzdG9yeS1yZWZyZXNoXCIsIG9uUmVmcmVzaCk7XHJcbiAgICB9O1xyXG4gIH0sIFthcHBseUZpbHRlcnMsIGN1cnJlbnRQYWdlLCBzZXRJc09wZW4sIHNldFNob3dGaWx0ZXJzXSk7XHJcbn07XHJcbiIsICJcdUZFRkZpbXBvcnQgUmVhY3QsIHsgdXNlTWVtbywgdXNlUmVmIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB0eXBlIHsgVGltZWxpbmVJdGVtIH0gZnJvbSBcIi4vSGlzdG9yeVRhYmxlLnRzeFwiO1xyXG5cclxudHlwZSBBY3Rpdml0eVJlY29yZCA9IFJlY29yZDxzdHJpbmcsIHVua25vd24+O1xyXG5cclxudHlwZSBVc2VIaXN0b3J5VGltZWxpbmVJdGVtc0FyZ3MgPSB7XHJcbiAgaXRlbXM6IEFjdGl2aXR5UmVjb3JkW107XHJcbiAgbG9jYWxlOiBzdHJpbmc7XHJcbiAgbm9EYXRhVGV4dDogc3RyaW5nO1xyXG4gIGxvZ0hpc3Rvcnk6IChtZXNzYWdlOiBzdHJpbmcsIGRhdGE/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPikgPT4gdm9pZDtcclxuICB0b1RpdGxlQ2FzZTogKHZhbHVlOiBzdHJpbmcsIGxvY2FsZTogc3RyaW5nKSA9PiBzdHJpbmc7XHJcbiAgZm9ybWF0RGF0ZVBhcnRzOiAodmFsdWU6IHN0cmluZywgbG9jYWxlOiBzdHJpbmcpID0+IHsgeWVhcjogc3RyaW5nOyBtb250aDogc3RyaW5nOyBkYXk6IHN0cmluZyB9O1xyXG59O1xyXG5cclxuLy8gTWFwcyByYXcgaGlzdG9yeSBwYXlsb2FkIGl0ZW1zIGludG8gdGltZWxpbmUgY2FyZHMgdXNlZCBieSBIaXN0b3J5VGFibGUuXHJcbmV4cG9ydCBjb25zdCB1c2VIaXN0b3J5VGltZWxpbmVJdGVtcyA9ICh7XHJcbiAgaXRlbXMsXHJcbiAgbG9jYWxlLFxyXG4gIG5vRGF0YVRleHQsXHJcbiAgbG9nSGlzdG9yeSxcclxuICB0b1RpdGxlQ2FzZSxcclxuICBmb3JtYXREYXRlUGFydHMsXHJcbn06IFVzZUhpc3RvcnlUaW1lbGluZUl0ZW1zQXJncykgPT4ge1xyXG4gIGNvbnN0IGRlYnVnTG9nZ2VkUmVmID0gdXNlUmVmKDApO1xyXG5cclxuICBjb25zdCB0aW1lbGluZUl0ZW1zOiBUaW1lbGluZUl0ZW1bXSA9IHVzZU1lbW8oKCkgPT4ge1xyXG4gICAgcmV0dXJuIGl0ZW1zLm1hcCgoZW50cnkpID0+IHtcclxuICAgICAgY29uc3QgYWN0aXZpZGFkSWRSYXcgPSAoZW50cnkuYWN0aXZpZGFkSWQgPz8gZW50cnkuQWN0aXZpZGFkSWQgPz8gXCJcIikudG9TdHJpbmcoKS50cmltKCk7XHJcbiAgICAgIGNvbnN0IGFjdGl2aWRhZElkID0gYWN0aXZpZGFkSWRSYXcgfHwgXCJcIjtcclxuICAgICAgY29uc3QgcmVjSWRSYXcgPSBlbnRyeS5yZWNJZCA/PyBlbnRyeS5SZWNJZCA/PyBcIlwiO1xyXG4gICAgICBjb25zdCByZWNJZCA9IHJlY0lkUmF3ICYmICFOdW1iZXIuaXNOYU4oTnVtYmVyKHJlY0lkUmF3KSkgPyBOdW1iZXIocmVjSWRSYXcpIDogbnVsbDtcclxuICAgICAgbGV0IGxpbmtJZCA9IGFjdGl2aWRhZElkIHx8IChyZWNJZCA/IHJlY0lkLnRvU3RyaW5nKCkgOiBcIlwiKTtcclxuXHJcbiAgICAgIGlmIChkZWJ1Z0xvZ2dlZFJlZi5jdXJyZW50IDwgNSkge1xyXG4gICAgICAgIGxvZ0hpc3RvcnkoXCJhY3Rpdml0eSBpdGVtXCIsIHsgYWN0aXZpZGFkSWQsIHJlY0lkUmF3LCByZWNJZCB9KTtcclxuICAgICAgICBkZWJ1Z0xvZ2dlZFJlZi5jdXJyZW50ICs9IDE7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IHJhd05hbWUgPSAoZW50cnkubmFtZSA/PyBlbnRyeS5OYW1lID8/IFwiXCIpLnRvU3RyaW5nKCkudHJpbSgpO1xyXG4gICAgICBjb25zdCBmdWxsTmFtZSA9IHRvVGl0bGVDYXNlKHJhd05hbWUsIGxvY2FsZSk7XHJcbiAgICAgIGNvbnN0IGZlY2hhID0gKGVudHJ5LnRyYW5zRGF0ZSA/PyBlbnRyeS5UcmFuc0RhdGUgPz8gXCJcIikudG9TdHJpbmcoKTtcclxuICAgICAgY29uc3QgcmF3RGVzYyA9IChlbnRyeS5kZXNjcmlwdGlvbiA/PyBlbnRyeS5EZXNjcmlwdGlvbiA/PyBcIlwiKS50b1N0cmluZygpLnRyaW0oKTtcclxuICAgICAgY29uc3QgZnVsbERlc2MgPSByYXdEZXNjO1xyXG5cclxuICAgICAgY29uc3QgaXNOb0RhdGFDYXJkID0gIXJhd05hbWUgJiYgIXJhd0Rlc2M7XHJcbiAgICAgIGlmIChpc05vRGF0YUNhcmQpIHtcclxuICAgICAgICBsaW5rSWQgPSBcIlwiO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIGlkOiBsaW5rSWQsXHJcbiAgICAgICAgYWN0aXZpZGFkSWQsXHJcbiAgICAgICAgcmVjSWQsXHJcbiAgICAgICAgbmFtZTogZnVsbE5hbWUsXHJcbiAgICAgICAgZGVzY3JpcHRpb246IGZ1bGxEZXNjIHx8IG5vRGF0YVRleHQsXHJcbiAgICAgICAgZnVsbE5hbWUsXHJcbiAgICAgICAgZnVsbERlc2MsXHJcbiAgICAgICAgZGF0ZVBhcnRzOiBmb3JtYXREYXRlUGFydHMoZmVjaGEsIGxvY2FsZSksXHJcbiAgICAgICAgaXNOb0RhdGE6IGlzTm9EYXRhQ2FyZCxcclxuICAgICAgfTtcclxuICAgIH0pO1xyXG4gIH0sIFtmb3JtYXREYXRlUGFydHMsIGl0ZW1zLCBsb2NhbGUsIGxvZ0hpc3RvcnksIG5vRGF0YVRleHQsIHRvVGl0bGVDYXNlXSk7XHJcblxyXG4gIHJldHVybiB7IHRpbWVsaW5lSXRlbXMgfTtcclxufTtcclxuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgQXBpRmV0Y2hFcnJvciwgZmV0Y2hKc29uIH0gZnJvbSBcIi4uL3NlcnZpY2VzL2FwaVNlcnZpY2UudHNcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi91dGlscy9pbmRJMThuLnRzXCI7XHJcblxyXG5leHBvcnQgdHlwZSBIaXN0b3J5QWN0aXZpdHlJdGVtID0ge1xyXG4gIGFjdGl2aWRhZElkPzogc3RyaW5nIHwgbnVtYmVyO1xyXG4gIEFjdGl2aWRhZElkPzogc3RyaW5nIHwgbnVtYmVyO1xyXG4gIHJlY0lkPzogc3RyaW5nIHwgbnVtYmVyO1xyXG4gIFJlY0lkPzogc3RyaW5nIHwgbnVtYmVyO1xyXG4gIG5hbWU/OiBzdHJpbmc7XHJcbiAgTmFtZT86IHN0cmluZztcclxuICB0cmFuc0RhdGU/OiBzdHJpbmc7XHJcbiAgVHJhbnNEYXRlPzogc3RyaW5nO1xyXG4gIGRlc2NyaXB0aW9uPzogc3RyaW5nO1xyXG4gIERlc2NyaXB0aW9uPzogc3RyaW5nO1xyXG59O1xyXG5cclxudHlwZSBIaXN0b3J5UmVzcG9uc2UgPSB7XHJcbiAgaXRlbXM/OiBIaXN0b3J5QWN0aXZpdHlJdGVtW107XHJcbiAgdG90YWw/OiBudW1iZXI7XHJcbn07XHJcblxyXG50eXBlIExvYWRPdmVycmlkZSA9IHtcclxuICBmcm9tRGF0ZTogc3RyaW5nO1xyXG4gIHRvRGF0ZTogc3RyaW5nO1xyXG4gIGFjY291bnROdW0/OiBzdHJpbmc7XHJcbn07XHJcblxyXG50eXBlIFVzZUhpc3RvcnlBY3Rpdml0aWVzQXJncyA9IHtcclxuICBmcm9tRGF0ZVZhbHVlOiBzdHJpbmc7XHJcbiAgdG9EYXRlVmFsdWU6IHN0cmluZztcclxuICBhY2NvdW50TnVtVmFsdWU6IHN0cmluZztcclxuICBwYWdlU2l6ZTogbnVtYmVyO1xyXG4gIHJldHJ5RGVsYXlNcz86IG51bWJlcjtcclxuICBub3JtYWxpemVSYW5nZTogKGZyb206IHN0cmluZywgdG86IHN0cmluZykgPT4geyBmcm9tOiBzdHJpbmc7IHRvOiBzdHJpbmcgfTtcclxuICBvbkZvcmJpZGRlbjogKCkgPT4gdm9pZDtcclxuICBvbkRlYnVnPzogKG1lc3NhZ2U6IHN0cmluZywgZGF0YT86IFJlY29yZDxzdHJpbmcsIHVua25vd24+KSA9PiB2b2lkO1xyXG59O1xyXG5cclxuLy8gQ2VudHJhbGl6ZXMgaGlzdG9yeSBmZXRjaC9yZXRyeSBsb2dpYyB0byBrZWVwIHBhZ2UgY29tcG9uZW50cyBzbWFsbGVyLlxyXG5leHBvcnQgY29uc3QgdXNlSGlzdG9yeUFjdGl2aXRpZXMgPSAoe1xyXG4gIGZyb21EYXRlVmFsdWUsXHJcbiAgdG9EYXRlVmFsdWUsXHJcbiAgYWNjb3VudE51bVZhbHVlLFxyXG4gIHBhZ2VTaXplLFxyXG4gIHJldHJ5RGVsYXlNcyA9IDYwMCxcclxuICBub3JtYWxpemVSYW5nZSxcclxuICBvbkZvcmJpZGRlbixcclxuICBvbkRlYnVnLFxyXG59OiBVc2VIaXN0b3J5QWN0aXZpdGllc0FyZ3MpID0+IHtcclxuICBjb25zdCBbaXRlbXMsIHNldEl0ZW1zXSA9IHVzZVN0YXRlPEhpc3RvcnlBY3Rpdml0eUl0ZW1bXT4oW10pO1xyXG4gIGNvbnN0IFt0b3RhbCwgc2V0VG90YWxdID0gdXNlU3RhdGUoMCk7XHJcbiAgY29uc3QgW2N1cnJlbnRQYWdlLCBzZXRDdXJyZW50UGFnZV0gPSB1c2VTdGF0ZSgxKTtcclxuICBjb25zdCBbaXNMb2FkaW5nLCBzZXRJc0xvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtlcnJvck1lc3NhZ2UsIHNldEVycm9yTWVzc2FnZV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuXHJcbiAgY29uc3QgcmV0cnlPbk5ldHdvcmtFcnJvclJlZiA9IHVzZVJlZihmYWxzZSk7XHJcbiAgY29uc3QgYWN0aXZlQWJvcnRSZWYgPSB1c2VSZWY8QWJvcnRDb250cm9sbGVyIHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgYWN0aXZlUmVxdWVzdElkUmVmID0gdXNlUmVmKDApO1xyXG4gIGNvbnN0IHJldHJ5VGltZXJSZWYgPSB1c2VSZWY8bnVtYmVyIHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgbGFzdFNpZ25hdHVyZVJlZiA9IHVzZVJlZihcIlwiKTtcclxuXHJcbiAgY29uc3QgY2xlYXJSZXRyeVRpbWVyID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKHJldHJ5VGltZXJSZWYuY3VycmVudCkge1xyXG4gICAgICBjbGVhclRpbWVvdXQocmV0cnlUaW1lclJlZi5jdXJyZW50KTtcclxuICAgICAgcmV0cnlUaW1lclJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgIH1cclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IGFib3J0QWN0aXZlUmVxdWVzdCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmICghYWN0aXZlQWJvcnRSZWYuY3VycmVudCkgcmV0dXJuO1xyXG4gICAgdHJ5IHtcclxuICAgICAgYWN0aXZlQWJvcnRSZWYuY3VycmVudC5hYm9ydCgpO1xyXG4gICAgfSBjYXRjaCB7XHJcbiAgICAgIC8vIElnbm9yZSBhYm9ydCBlcnJvcnMuXHJcbiAgICB9XHJcbiAgICBhY3RpdmVBYm9ydFJlZi5jdXJyZW50ID0gbnVsbDtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IHJlc2V0QWN0aXZpdGllcyA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGNsZWFyUmV0cnlUaW1lcigpO1xyXG4gICAgYWJvcnRBY3RpdmVSZXF1ZXN0KCk7XHJcbiAgICBzZXRJdGVtcyhbXSk7XHJcbiAgICBzZXRUb3RhbCgwKTtcclxuICAgIHNldEVycm9yTWVzc2FnZShcIlwiKTtcclxuICAgIHNldElzTG9hZGluZyhmYWxzZSk7XHJcbiAgfSwgW2Fib3J0QWN0aXZlUmVxdWVzdCwgY2xlYXJSZXRyeVRpbWVyXSk7XHJcblxyXG4gIGNvbnN0IGxvYWRBY3Rpdml0aWVzID0gdXNlQ2FsbGJhY2soXHJcbiAgICBhc3luYyAocGFnZTogbnVtYmVyLCBvdmVycmlkZT86IExvYWRPdmVycmlkZSkgPT4ge1xyXG4gICAgICBjb25zdCBmcm9tRGF0ZVN0ciA9IG92ZXJyaWRlPy5mcm9tRGF0ZSA/PyBmcm9tRGF0ZVZhbHVlO1xyXG4gICAgICBjb25zdCB0b0RhdGVTdHIgPSBvdmVycmlkZT8udG9EYXRlID8/IHRvRGF0ZVZhbHVlO1xyXG4gICAgICBjb25zdCBhY2NvdW50TnVtU3RyID0gb3ZlcnJpZGU/LmFjY291bnROdW0gPz8gYWNjb3VudE51bVZhbHVlO1xyXG5cclxuICAgICAgaWYgKCFmcm9tRGF0ZVN0ciB8fCAhdG9EYXRlU3RyKSB7XHJcbiAgICAgICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcclxuICAgICAgICBzZXRJdGVtcyhbXSk7XHJcbiAgICAgICAgc2V0VG90YWwoMCk7XHJcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKFwiXCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2V0Q3VycmVudFBhZ2UocGFnZSk7XHJcbiAgICAgIGNsZWFyUmV0cnlUaW1lcigpO1xyXG5cclxuICAgICAgY29uc3QgcmVxdWVzdElkID0gKythY3RpdmVSZXF1ZXN0SWRSZWYuY3VycmVudDtcclxuICAgICAgYWJvcnRBY3RpdmVSZXF1ZXN0KCk7XHJcblxyXG4gICAgICBjb25zdCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xyXG4gICAgICBhY3RpdmVBYm9ydFJlZi5jdXJyZW50ID0gY29udHJvbGxlcjtcclxuXHJcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSBub3JtYWxpemVSYW5nZShmcm9tRGF0ZVN0ciwgdG9EYXRlU3RyKTtcclxuICAgICAgY29uc3QgZmlsdGVyU2lnbmF0dXJlID0gYCR7bm9ybWFsaXplZC5mcm9tfXwke25vcm1hbGl6ZWQudG99fCR7YWNjb3VudE51bVN0cn18JHtwYWdlfWA7XHJcbiAgICAgIGxhc3RTaWduYXR1cmVSZWYuY3VycmVudCA9IGZpbHRlclNpZ25hdHVyZTtcclxuXHJcbiAgICAgIHNldElzTG9hZGluZyh0cnVlKTtcclxuICAgICAgc2V0SXRlbXMoW10pO1xyXG4gICAgICBzZXRUb3RhbCgwKTtcclxuICAgICAgc2V0RXJyb3JNZXNzYWdlKFwiXCIpO1xyXG5cclxuICAgICAgY29uc3QgcGF5bG9hZCA9IHtcclxuICAgICAgICBmcm9tRGF0ZTogbm9ybWFsaXplZC5mcm9tLFxyXG4gICAgICAgIHRvRGF0ZTogbm9ybWFsaXplZC50byxcclxuICAgICAgICBhY2NvdW50TnVtOiBhY2NvdW50TnVtU3RyLFxyXG4gICAgICB9O1xyXG5cclxuICAgICAgb25EZWJ1Zz8uKFwibG9hZEFjdGl2aXRpZXM6cmVxdWVzdFwiLCB7IHBhZ2UsIHBhZ2VTaXplLCBwYXlsb2FkIH0pO1xyXG5cclxuICAgICAgbGV0IGRhdGE6IEhpc3RvcnlSZXNwb25zZTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBkYXRhID0gYXdhaXQgZmV0Y2hKc29uPEhpc3RvcnlSZXNwb25zZT4oYC9IaXN0b3JpYWwvR2V0QWN0aXZpdGllcz9wYWdlPSR7cGFnZX0mcGFnZVNpemU9JHtwYWdlU2l6ZX1gLCB7XHJcbiAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxyXG4gICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGF5bG9hZCksXHJcbiAgICAgICAgICBzaWduYWw6IGNvbnRyb2xsZXIuc2lnbmFsLFxyXG4gICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycjogYW55KSB7XHJcbiAgICAgICAgaWYgKHJlcXVlc3RJZCAhPT0gYWN0aXZlUmVxdWVzdElkUmVmLmN1cnJlbnQpIHJldHVybjtcclxuICAgICAgICBpZiAoZXJyPy5uYW1lID09PSBcIkFib3J0RXJyb3JcIikge1xyXG4gICAgICAgICAgYWN0aXZlQWJvcnRSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZXJyIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvciAmJiBlcnIuc3RhdHVzID09PSA0MDMpIHtcclxuICAgICAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XHJcbiAgICAgICAgICBhY3RpdmVBYm9ydFJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgICAgIG9uRm9yYmlkZGVuKCk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBpc05ldHdvcmtFcnJvciA9ICEoZXJyIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvcikgfHwgdHlwZW9mIGVyci5zdGF0dXMgIT09IFwibnVtYmVyXCI7XHJcbiAgICAgICAgaWYgKGlzTmV0d29ya0Vycm9yICYmIHJldHJ5T25OZXR3b3JrRXJyb3JSZWYuY3VycmVudCkge1xyXG4gICAgICAgICAgcmV0cnlPbk5ldHdvcmtFcnJvclJlZi5jdXJyZW50ID0gZmFsc2U7XHJcbiAgICAgICAgICBhY3RpdmVBYm9ydFJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgICAgIHJldHJ5VGltZXJSZWYuY3VycmVudCA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlcXVlc3RJZCAhPT0gYWN0aXZlUmVxdWVzdElkUmVmLmN1cnJlbnQpIHJldHVybjtcclxuICAgICAgICAgICAgaWYgKGxhc3RTaWduYXR1cmVSZWYuY3VycmVudCAhPT0gZmlsdGVyU2lnbmF0dXJlKSByZXR1cm47XHJcbiAgICAgICAgICAgIGxvYWRBY3Rpdml0aWVzKHBhZ2UsIHtcclxuICAgICAgICAgICAgICBmcm9tRGF0ZTogZnJvbURhdGVTdHIsXHJcbiAgICAgICAgICAgICAgdG9EYXRlOiB0b0RhdGVTdHIsXHJcbiAgICAgICAgICAgICAgYWNjb3VudE51bTogYWNjb3VudE51bVN0cixcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9LCByZXRyeURlbGF5TXMpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xyXG4gICAgICAgIHNldEVycm9yTWVzc2FnZShlcnI/Lm1lc3NhZ2UgfHwgaW5kVChcIkFwaV9SZXF1ZXN0RmFpbGVkXCIsIFwiTm8gc2UgcHVkbyBjb25lY3RhciBjb24gZWwgc2Vydmlkb3IgKHJlZCkuXCIpKTtcclxuICAgICAgICBhY3RpdmVBYm9ydFJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChyZXF1ZXN0SWQgIT09IGFjdGl2ZVJlcXVlc3RJZFJlZi5jdXJyZW50KSByZXR1cm47XHJcblxyXG4gICAgICBvbkRlYnVnPy4oXCJsb2FkQWN0aXZpdGllczpyZXNwb25zZVwiLCB7XHJcbiAgICAgICAgc3RhdHVzOiAyMDAsXHJcbiAgICAgICAgdG90YWw6IGRhdGE/LnRvdGFsID8/IDAsXHJcbiAgICAgICAgY291bnQ6IEFycmF5LmlzQXJyYXkoZGF0YT8uaXRlbXMpID8gZGF0YS5pdGVtcy5sZW5ndGggOiAwLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XHJcbiAgICAgIHNldEl0ZW1zKGRhdGEuaXRlbXMgfHwgW10pO1xyXG4gICAgICBzZXRUb3RhbChkYXRhLnRvdGFsIHx8IChkYXRhLml0ZW1zIHx8IFtdKS5sZW5ndGgpO1xyXG4gICAgICBhY3RpdmVBYm9ydFJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgIH0sXHJcbiAgICBbXHJcbiAgICAgIGFib3J0QWN0aXZlUmVxdWVzdCxcclxuICAgICAgYWNjb3VudE51bVZhbHVlLFxyXG4gICAgICBjbGVhclJldHJ5VGltZXIsXHJcbiAgICAgIGZyb21EYXRlVmFsdWUsXHJcbiAgICAgIG5vcm1hbGl6ZVJhbmdlLFxyXG4gICAgICBvbkRlYnVnLFxyXG4gICAgICBvbkZvcmJpZGRlbixcclxuICAgICAgcGFnZVNpemUsXHJcbiAgICAgIHJldHJ5RGVsYXlNcyxcclxuICAgICAgdG9EYXRlVmFsdWUsXHJcbiAgICBdXHJcbiAgKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIGNsZWFyUmV0cnlUaW1lcigpO1xyXG4gICAgICBhYm9ydEFjdGl2ZVJlcXVlc3QoKTtcclxuICAgIH07XHJcbiAgfSwgW2Fib3J0QWN0aXZlUmVxdWVzdCwgY2xlYXJSZXRyeVRpbWVyXSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBpdGVtcyxcclxuICAgIHRvdGFsLFxyXG4gICAgY3VycmVudFBhZ2UsXHJcbiAgICBpc0xvYWRpbmcsXHJcbiAgICBlcnJvck1lc3NhZ2UsXHJcbiAgICBsb2FkQWN0aXZpdGllcyxcclxuICAgIHJlc2V0QWN0aXZpdGllcyxcclxuICAgIHJldHJ5T25OZXR3b3JrRXJyb3JSZWYsXHJcbiAgICBsYXN0U2lnbmF0dXJlUmVmLFxyXG4gIH07XHJcbn07XHJcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjayB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBISVNUT1JZX0ZJTFRFUl9LRVksIEhJU1RPUllfUkVUVVJOX0ZMQUdfS0VZIH0gZnJvbSBcIi4uL3V0aWxzL3Zpc2l0YXNIaXN0b3J5LnRzXCI7XHJcbmltcG9ydCB7XHJcbiAgZ2V0U2Vzc2lvbkpzb25XaXRoRXhwaXJ5LFxyXG4gIGdldFNlc3Npb25WYWx1ZVdpdGhFeHBpcnksXHJcbiAgcmVtb3ZlU2Vzc2lvblZhbHVlV2l0aEV4cGlyeSxcclxuICBzZXRTZXNzaW9uSnNvbldpdGhFeHBpcnksXHJcbiAgc2V0U2Vzc2lvblZhbHVlV2l0aEV4cGlyeSxcclxufSBmcm9tIFwiLi4vdXRpbHMvc2Vzc2lvbkV4cGlyeS50c1wiO1xyXG5cclxuZXhwb3J0IHR5cGUgSGlzdG9yeUNhY2hlZEZpbHRlciA9IHtcclxuICBmcm9tRGF0ZTogc3RyaW5nO1xyXG4gIHRvRGF0ZTogc3RyaW5nO1xyXG4gIHBhZ2U/OiBudW1iZXI7XHJcbiAgY2xpZW50QWNjb3VudD86IHN0cmluZztcclxuICBjbGllbnRUZXh0Pzogc3RyaW5nO1xyXG59O1xyXG5cclxuY29uc3QgSElTVE9SWV9DQUNIRV9UVExfTVMgPSAxMiAqIDYwICogNjAgKiAxMDAwO1xyXG5cclxuY29uc3Qgbm9ybWFsaXplQ2FjaGVkRmlsdGVyID0gKHZhbHVlOiBIaXN0b3J5Q2FjaGVkRmlsdGVyIHwgbnVsbCk6IEhpc3RvcnlDYWNoZWRGaWx0ZXIgfCBudWxsID0+IHtcclxuICBpZiAoIXZhbHVlIHx8IHR5cGVvZiB2YWx1ZSAhPT0gXCJvYmplY3RcIikgcmV0dXJuIG51bGw7XHJcbiAgcmV0dXJuIHtcclxuICAgIGZyb21EYXRlOiB2YWx1ZS5mcm9tRGF0ZSB8fCBcIlwiLFxyXG4gICAgdG9EYXRlOiB2YWx1ZS50b0RhdGUgfHwgXCJcIixcclxuICAgIHBhZ2U6IHZhbHVlLnBhZ2UsXHJcbiAgICBjbGllbnRBY2NvdW50OiB2YWx1ZS5jbGllbnRBY2NvdW50IHx8IFwiXCIsXHJcbiAgICBjbGllbnRUZXh0OiB2YWx1ZS5jbGllbnRUZXh0IHx8IFwiXCIsXHJcbiAgfTtcclxufTtcclxuXHJcbi8vIEtlZXBzIGhpc3RvcnkgZmlsdGVyIGNhY2hlIHJlYWRzL3dyaXRlcyBpbiBvbmUgcGxhY2UuXHJcbmV4cG9ydCBjb25zdCB1c2VIaXN0b3J5RmlsdGVyQ2FjaGUgPSAoKSA9PiB7XHJcbiAgY29uc3QgcmVhZENhY2hlZEZpbHRlciA9IHVzZUNhbGxiYWNrKCgpOiBIaXN0b3J5Q2FjaGVkRmlsdGVyIHwgbnVsbCA9PiB7XHJcbiAgICBjb25zdCBwYXJzZWQgPSBnZXRTZXNzaW9uSnNvbldpdGhFeHBpcnk8SGlzdG9yeUNhY2hlZEZpbHRlcj4oSElTVE9SWV9GSUxURVJfS0VZKTtcclxuICAgIHJldHVybiBub3JtYWxpemVDYWNoZWRGaWx0ZXIocGFyc2VkKTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IGNsZWFyRmlsdGVyQ2FjaGUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICByZW1vdmVTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KEhJU1RPUllfRklMVEVSX0tFWSk7XHJcbiAgICByZW1vdmVTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KEhJU1RPUllfUkVUVVJOX0ZMQUdfS0VZKTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IGNvbnN1bWVSZXR1cm5GbGFnID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgY29uc3QgcmF3ID0gZ2V0U2Vzc2lvblZhbHVlV2l0aEV4cGlyeShISVNUT1JZX1JFVFVSTl9GTEFHX0tFWSk7XHJcbiAgICBpZiAocmF3ID09PSBcIjFcIikge1xyXG4gICAgICByZW1vdmVTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KEhJU1RPUllfUkVUVVJOX0ZMQUdfS0VZKTtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBzYXZlQ2FjaGVkRmlsdGVyID0gdXNlQ2FsbGJhY2soKGZpbHRlcjogSGlzdG9yeUNhY2hlZEZpbHRlcikgPT4ge1xyXG4gICAgc2V0U2Vzc2lvbkpzb25XaXRoRXhwaXJ5KEhJU1RPUllfRklMVEVSX0tFWSwgZmlsdGVyLCBISVNUT1JZX0NBQ0hFX1RUTF9NUyk7XHJcbiAgICBzZXRTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KEhJU1RPUllfUkVUVVJOX0ZMQUdfS0VZLCBcIjFcIiwgSElTVE9SWV9DQUNIRV9UVExfTVMpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHJlYWRDYWNoZWRGaWx0ZXIsXHJcbiAgICBjbGVhckZpbHRlckNhY2hlLFxyXG4gICAgY29uc3VtZVJldHVybkZsYWcsXHJcbiAgICBzYXZlQ2FjaGVkRmlsdGVyLFxyXG4gIH07XHJcbn07XHJcbiIsICJcdUZFRkZpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2ssIHVzZU1lbW8sIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHR5cGUgeyBNb3VzZUV2ZW50IGFzIFJlYWN0TW91c2VFdmVudCB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgdHlwZSB7IENsaWVudE9wdGlvbiB9IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL3Zpc2l0YXMvQ2xpZW50U2VhcmNoQ29tYm9ib3gudHN4XCI7XHJcbmltcG9ydCB0eXBlIHsgSGlzdG9yeUNhY2hlZEZpbHRlciB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VIaXN0b3J5RmlsdGVyQ2FjaGUudHNcIjtcclxuXHJcbmV4cG9ydCB0eXBlIFF1aWNrRmlsdGVySWQgPSBcImN1c3RvbVwiIHwgXCJkYXlzLTdcIiB8IFwiZGF5cy0zMFwiIHwgXCJkYXlzLTkwXCI7XHJcblxyXG5leHBvcnQgdHlwZSBMb2FkT3ZlcnJpZGUgPSB7XHJcbiAgZnJvbURhdGU6IHN0cmluZztcclxuICB0b0RhdGU6IHN0cmluZztcclxuICBhY2NvdW50TnVtPzogc3RyaW5nO1xyXG59O1xyXG5cclxuZXhwb3J0IHR5cGUgRmlsdGVyTG9hZFJlcXVlc3QgPSB7XG4gIHBhZ2U6IG51bWJlcjtcbiAgb3ZlcnJpZGU6IExvYWRPdmVycmlkZTtcbn07XG5cbmNvbnN0IEhJU1RPUllfUVVJQ0tfRklMVEVSX1JBTkdFUzogQXJyYXk8e1xuICBpZDogRXhjbHVkZTxRdWlja0ZpbHRlcklkLCBcImN1c3RvbVwiPjtcbiAgZGF5c1RvU3VidHJhY3Q6IG51bWJlcjtcbn0+ID0gW1xuICB7IGlkOiBcImRheXMtN1wiLCBkYXlzVG9TdWJ0cmFjdDogNiB9LFxuICB7IGlkOiBcImRheXMtMzBcIiwgZGF5c1RvU3VidHJhY3Q6IDI5IH0sXG4gIHsgaWQ6IFwiZGF5cy05MFwiLCBkYXlzVG9TdWJ0cmFjdDogODkgfSxcbl07XG5cclxudHlwZSBVc2VIaXN0b3J5RmlsdGVyc1N0YXRlQXJncyA9IHtcclxuICBkZWZhdWx0RnJvbURhdGU6IHN0cmluZztcclxuICBkZWZhdWx0VG9EYXRlOiBzdHJpbmc7XHJcbiAgbG9nSGlzdG9yeTogKG1lc3NhZ2U6IHN0cmluZywgZGF0YT86IFJlY29yZDxzdHJpbmcsIHVua25vd24+KSA9PiB2b2lkO1xyXG4gIHBhcnNlRGF0ZVZhbHVlOiAodmFsdWU6IHN0cmluZykgPT4gRGF0ZSB8IG51bGw7XHJcbiAgcGFyc2VJU086ICh2YWx1ZTogc3RyaW5nKSA9PiBEYXRlIHwgbnVsbDtcclxuICB0b0lTTzogKHZhbHVlOiBEYXRlKSA9PiBzdHJpbmc7XHJcbiAgc3RhcnRPZkRheTogKHZhbHVlOiBEYXRlKSA9PiBEYXRlO1xyXG4gIGlzQmVmb3JlOiAoYTogRGF0ZSB8IG51bGwsIGI6IERhdGUgfCBudWxsKSA9PiBib29sZWFuO1xyXG59O1xyXG5cclxuLy8gRW5jYXBzdWxhdGVzIGhpc3RvcnkgZmlsdGVyIHN0YXRlIGFuZCBkYXRlLXJhbmdlIG9yY2hlc3RyYXRpb24uXHJcbmV4cG9ydCBjb25zdCB1c2VIaXN0b3J5RmlsdGVyc1N0YXRlID0gKHtcclxuICBkZWZhdWx0RnJvbURhdGUsXHJcbiAgZGVmYXVsdFRvRGF0ZSxcclxuICBsb2dIaXN0b3J5LFxyXG4gIHBhcnNlRGF0ZVZhbHVlLFxyXG4gIHBhcnNlSVNPLFxyXG4gIHRvSVNPLFxyXG4gIHN0YXJ0T2ZEYXksXHJcbiAgaXNCZWZvcmUsXHJcbn06IFVzZUhpc3RvcnlGaWx0ZXJzU3RhdGVBcmdzKSA9PiB7XG4gIGNvbnN0IHJlc29sdmVRdWlja0ZpbHRlckZyb21SYW5nZSA9IHVzZUNhbGxiYWNrKFxuICAgIChzdGFydDogRGF0ZSB8IG51bGwsIGVuZDogRGF0ZSB8IG51bGwpOiBRdWlja0ZpbHRlcklkIHwgbnVsbCA9PiB7XG4gICAgICBpZiAoIXN0YXJ0IHx8ICFlbmQpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRTdGFydCA9IHN0YXJ0T2ZEYXkoc3RhcnQpO1xuICAgICAgY29uc3Qgbm9ybWFsaXplZEVuZCA9IHN0YXJ0T2ZEYXkoZW5kKTtcbiAgICAgIGNvbnN0IHRvZGF5ID0gc3RhcnRPZkRheShuZXcgRGF0ZSgpKTtcbiAgICAgIGlmICh0b0lTTyhub3JtYWxpemVkRW5kKSAhPT0gdG9JU08odG9kYXkpKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICBmb3IgKGNvbnN0IGVudHJ5IG9mIEhJU1RPUllfUVVJQ0tfRklMVEVSX1JBTkdFUykge1xuICAgICAgICBjb25zdCBjYW5kaWRhdGVTdGFydCA9IG5ldyBEYXRlKHRvZGF5KTtcbiAgICAgICAgY2FuZGlkYXRlU3RhcnQuc2V0RGF0ZSh0b2RheS5nZXREYXRlKCkgLSBlbnRyeS5kYXlzVG9TdWJ0cmFjdCk7XG4gICAgICAgIGlmICh0b0lTTyhub3JtYWxpemVkU3RhcnQpID09PSB0b0lTTyhjYW5kaWRhdGVTdGFydCkpIHtcbiAgICAgICAgICByZXR1cm4gZW50cnkuaWQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSxcbiAgICBbc3RhcnRPZkRheSwgdG9JU09dXG4gICk7XG5cbiAgY29uc3QgW3N0YXJ0RGF0ZSwgc2V0U3RhcnREYXRlXSA9IHVzZVN0YXRlPERhdGUgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW2VuZERhdGUsIHNldEVuZERhdGVdID0gdXNlU3RhdGU8RGF0ZSB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IFttYW51YWxTdGFydERhdGUsIHNldE1hbnVhbFN0YXJ0RGF0ZV0gPSB1c2VTdGF0ZTxEYXRlIHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgW21hbnVhbEVuZERhdGUsIHNldE1hbnVhbEVuZERhdGVdID0gdXNlU3RhdGU8RGF0ZSB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IFtob3ZlckRhdGUsIHNldEhvdmVyRGF0ZV0gPSB1c2VTdGF0ZTxEYXRlIHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgW3NlbGVjdGluZ1N0ZXAsIHNldFNlbGVjdGluZ1N0ZXBdID0gdXNlU3RhdGU8XCJzdGFydFwiIHwgXCJlbmRcIiB8IFwiZG9uZVwiPihcInN0YXJ0XCIpO1xyXG4gIGNvbnN0IFtjdXJyZW50TW9udGgsIHNldEN1cnJlbnRNb250aF0gPSB1c2VTdGF0ZShuZXcgRGF0ZSgpLmdldE1vbnRoKCkpO1xyXG4gIGNvbnN0IFtjdXJyZW50WWVhciwgc2V0Q3VycmVudFllYXJdID0gdXNlU3RhdGUobmV3IERhdGUoKS5nZXRGdWxsWWVhcigpKTtcclxuICBjb25zdCBbaXNPcGVuLCBzZXRJc09wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtzaG93TWFudWFsUGlja2VyUGFuZWwsIHNldFNob3dNYW51YWxQaWNrZXJQYW5lbF0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW2FjdGl2ZVF1aWNrRmlsdGVyLCBzZXRBY3RpdmVRdWlja0ZpbHRlcl0gPSB1c2VTdGF0ZTxRdWlja0ZpbHRlcklkIHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgW3NlbGVjdGVkQ2xpZW50LCBzZXRTZWxlY3RlZENsaWVudF0gPSB1c2VTdGF0ZTxDbGllbnRPcHRpb24gfCBudWxsPihudWxsKTtcclxuICBjb25zdCBbY2xpZW50UmVzZXRLZXksIHNldENsaWVudFJlc2V0S2V5XSA9IHVzZVN0YXRlKDApO1xyXG4gIGNvbnN0IFtzaG93RmlsdGVycywgc2V0U2hvd0ZpbHRlcnNdID0gdXNlU3RhdGUodHJ1ZSk7XHJcbiAgY29uc3QgW3Nob3dNYW51YWxFcnJvciwgc2V0U2hvd01hbnVhbEVycm9yXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuXHJcbiAgY29uc3QgaGFzUmVzdG9yZWRGaWx0ZXJSZWYgPSB1c2VSZWYoZmFsc2UpO1xyXG4gIGNvbnN0IGRpZEluaXRGaWx0ZXJSZWYgPSB1c2VSZWYoZmFsc2UpO1xyXG5cclxuICBjb25zdCBmcm9tRGF0ZVZhbHVlID0gdXNlTWVtbygoKSA9PiAoc3RhcnREYXRlID8gdG9JU08oc3RhcnREYXRlKSA6IFwiXCIpLCBbc3RhcnREYXRlLCB0b0lTT10pO1xyXG4gIGNvbnN0IHRvRGF0ZVZhbHVlID0gdXNlTWVtbygoKSA9PiAoZW5kRGF0ZSA/IHRvSVNPKGVuZERhdGUpIDogXCJcIiksIFtlbmREYXRlLCB0b0lTT10pO1xyXG4gIGNvbnN0IGFjY291bnROdW1WYWx1ZSA9IHVzZU1lbW8oKCkgPT4gKHNlbGVjdGVkQ2xpZW50ID8gc2VsZWN0ZWRDbGllbnQudmFsdWUgOiBcIlwiKSwgW3NlbGVjdGVkQ2xpZW50XSk7XHJcblxyXG4gIGNvbnN0IHZhbGlkYXRlTWFudWFsUmFuZ2UgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAoYWN0aXZlUXVpY2tGaWx0ZXIgPT09IFwiY3VzdG9tXCIgJiYgKCFzdGFydERhdGUgfHwgIWVuZERhdGUpKSB7XHJcbiAgICAgIHNldFNob3dNYW51YWxFcnJvcih0cnVlKTtcclxuICAgICAgc2V0U2VsZWN0aW5nU3RlcCghc3RhcnREYXRlID8gXCJzdGFydFwiIDogXCJlbmRcIik7XHJcbiAgICAgIHNldFNob3dNYW51YWxQaWNrZXJQYW5lbCh0cnVlKTtcclxuICAgICAgc2V0SXNPcGVuKHRydWUpO1xyXG4gICAgICBzZXRTaG93RmlsdGVycyh0cnVlKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfSwgW2FjdGl2ZVF1aWNrRmlsdGVyLCBlbmREYXRlLCBzdGFydERhdGVdKTtcclxuXHJcbiAgLy8gQXBwbGllcyBhIGRlZmF1bHQgZGF0ZSByYW5nZSBhbmQgcmV0dXJucyB0aGUgbG9hZCBwYXlsb2FkIG5lZWRlZCBieSB0aGUgcGFnZS5cclxuICBjb25zdCBhcHBseURlZmF1bHRSYW5nZUZyb21Qcm9wcyA9IHVzZUNhbGxiYWNrKCgpOiBGaWx0ZXJMb2FkUmVxdWVzdCB8IG51bGwgPT4ge1xyXG4gICAgaWYgKCFkZWZhdWx0RnJvbURhdGUgfHwgIWRlZmF1bHRUb0RhdGUpIHJldHVybiBudWxsO1xyXG4gICAgY29uc3Qgc3RhcnRSYXcgPSBwYXJzZURhdGVWYWx1ZShkZWZhdWx0RnJvbURhdGUpO1xyXG4gICAgY29uc3QgZW5kUmF3ID0gcGFyc2VEYXRlVmFsdWUoZGVmYXVsdFRvRGF0ZSk7XHJcbiAgICBpZiAoIXN0YXJ0UmF3IHx8ICFlbmRSYXcpIHJldHVybiBudWxsO1xyXG5cclxuICAgIGNvbnN0IHN0YXJ0RGF5ID0gc3RhcnRPZkRheShzdGFydFJhdyk7XHJcbiAgICBjb25zdCBlbmREYXkgPSBzdGFydE9mRGF5KGVuZFJhdyk7XHJcblxyXG4gICAgbGV0IHN0YXJ0ID0gc3RhcnREYXk7XHJcbiAgICBsZXQgZW5kID0gZW5kRGF5O1xyXG4gICAgaWYgKGlzQmVmb3JlKGVuZCwgc3RhcnQpKSB7XHJcbiAgICAgIGNvbnN0IHN3YXAgPSBzdGFydDtcclxuICAgICAgc3RhcnQgPSBlbmQ7XHJcbiAgICAgIGVuZCA9IHN3YXA7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0U3RhcnREYXRlKHN0YXJ0KTtcclxuICAgIHNldEVuZERhdGUoZW5kKTtcclxuICAgIHNldFNlbGVjdGluZ1N0ZXAoXCJkb25lXCIpO1xyXG4gICAgc2V0SG92ZXJEYXRlKG51bGwpO1xuICAgIHNldEN1cnJlbnRNb250aChzdGFydC5nZXRNb250aCgpKTtcbiAgICBzZXRDdXJyZW50WWVhcihzdGFydC5nZXRGdWxsWWVhcigpKTtcbiAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcihyZXNvbHZlUXVpY2tGaWx0ZXJGcm9tUmFuZ2Uoc3RhcnQsIGVuZCkpO1xuICAgIHNldFNlbGVjdGVkQ2xpZW50KG51bGwpO1xuICAgIHNldElzT3BlbihmYWxzZSk7XG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIHBhZ2U6IDEsXHJcbiAgICAgIG92ZXJyaWRlOiB7XHJcbiAgICAgICAgZnJvbURhdGU6IHRvSVNPKHN0YXJ0KSxcclxuICAgICAgICB0b0RhdGU6IHRvSVNPKGVuZCksXHJcbiAgICAgICAgYWNjb3VudE51bTogXCJcIixcclxuICAgICAgfSxcclxuICAgIH07XHJcbiAgfSwgW2RlZmF1bHRGcm9tRGF0ZSwgZGVmYXVsdFRvRGF0ZSwgaXNCZWZvcmUsIHBhcnNlRGF0ZVZhbHVlLCByZXNvbHZlUXVpY2tGaWx0ZXJGcm9tUmFuZ2UsIHN0YXJ0T2ZEYXksIHRvSVNPXSk7XG5cclxuICAvLyBSZXNldHMgaGlzdG9yeSBmaWx0ZXJzIGxvY2FsIHN0YXRlIG9ubHkuXHJcbiAgY29uc3QgcmVzZXRIaXN0b3J5RmlsdGVycyA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIHNldFN0YXJ0RGF0ZShudWxsKTtcclxuICAgIHNldEVuZERhdGUobnVsbCk7XHJcbiAgICBzZXRNYW51YWxTdGFydERhdGUobnVsbCk7XHJcbiAgICBzZXRNYW51YWxFbmREYXRlKG51bGwpO1xyXG4gICAgc2V0U2VsZWN0aW5nU3RlcChcInN0YXJ0XCIpO1xyXG4gICAgc2V0SG92ZXJEYXRlKG51bGwpO1xyXG4gICAgc2V0Q3VycmVudE1vbnRoKG5ldyBEYXRlKCkuZ2V0TW9udGgoKSk7XHJcbiAgICBzZXRDdXJyZW50WWVhcihuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCkpO1xyXG4gICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIobnVsbCk7XHJcbiAgICBzZXRTaG93TWFudWFsUGlja2VyUGFuZWwoZmFsc2UpO1xyXG4gICAgc2V0U2VsZWN0ZWRDbGllbnQobnVsbCk7XHJcbiAgICBzZXRDbGllbnRSZXNldEtleSgocHJldikgPT4gcHJldiArIDEpO1xyXG4gICAgc2V0U2hvd01hbnVhbEVycm9yKGZhbHNlKTtcclxuICB9LCBbXSk7XHJcblxyXG4gIC8vIEFwcGxpZXMgY2FjaGVkIGZpbHRlcnMgYW5kIHJldHVybnMgdGhlIGxvYWQgcGF5bG9hZCBuZWVkZWQgYnkgdGhlIHBhZ2UuXHJcbiAgY29uc3QgYXBwbHlDYWNoZWRGaWx0ZXIgPSB1c2VDYWxsYmFjayhcclxuICAgIChmaWx0ZXI6IEhpc3RvcnlDYWNoZWRGaWx0ZXIgfCBudWxsKTogRmlsdGVyTG9hZFJlcXVlc3QgfCBudWxsID0+IHtcclxuICAgICAgaWYgKCFmaWx0ZXIgfHwgIWZpbHRlci5mcm9tRGF0ZSB8fCAhZmlsdGVyLnRvRGF0ZSkgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgICBjb25zdCBzdGFydCA9IHBhcnNlSVNPKGZpbHRlci5mcm9tRGF0ZSk7XHJcbiAgICAgIGNvbnN0IGVuZCA9IHBhcnNlSVNPKGZpbHRlci50b0RhdGUpO1xyXG4gICAgICBzZXRTdGFydERhdGUoc3RhcnQpO1xyXG4gICAgICBzZXRFbmREYXRlKGVuZCk7XHJcbiAgICAgIHNldFNlbGVjdGluZ1N0ZXAoZW5kID8gXCJkb25lXCIgOiBcImVuZFwiKTtcbiAgICAgIHNldEhvdmVyRGF0ZShudWxsKTtcbiAgICAgIHNldEN1cnJlbnRNb250aChzdGFydCA/IHN0YXJ0LmdldE1vbnRoKCkgOiBuZXcgRGF0ZSgpLmdldE1vbnRoKCkpO1xuICAgICAgc2V0Q3VycmVudFllYXIoc3RhcnQgPyBzdGFydC5nZXRGdWxsWWVhcigpIDogbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpKTtcbiAgICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKHJlc29sdmVRdWlja0ZpbHRlckZyb21SYW5nZShzdGFydCwgZW5kKSk7XG4gICAgICBzZXRTaG93TWFudWFsUGlja2VyUGFuZWwoZmFsc2UpO1xuICAgICAgc2V0U2hvd01hbnVhbEVycm9yKGZhbHNlKTtcblxyXG4gICAgICBpZiAoZmlsdGVyLmNsaWVudEFjY291bnQpIHtcclxuICAgICAgICBzZXRTZWxlY3RlZENsaWVudCh7IHZhbHVlOiBmaWx0ZXIuY2xpZW50QWNjb3VudCwgdGV4dDogZmlsdGVyLmNsaWVudFRleHQgfHwgZmlsdGVyLmNsaWVudEFjY291bnQgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc2V0U2VsZWN0ZWRDbGllbnQobnVsbCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IHBhZ2VWYWwgPSBOdW1iZXIoZmlsdGVyLnBhZ2UpO1xyXG4gICAgICBjb25zdCBwYWdlVG9Mb2FkID0gTnVtYmVyLmlzRmluaXRlKHBhZ2VWYWwpICYmIHBhZ2VWYWwgPiAwID8gcGFnZVZhbCA6IDE7XHJcblxyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHBhZ2U6IHBhZ2VUb0xvYWQsXHJcbiAgICAgICAgb3ZlcnJpZGU6IHtcclxuICAgICAgICAgIGZyb21EYXRlOiBmaWx0ZXIuZnJvbURhdGUsXHJcbiAgICAgICAgICB0b0RhdGU6IGZpbHRlci50b0RhdGUsXHJcbiAgICAgICAgICBhY2NvdW50TnVtOiBmaWx0ZXIuY2xpZW50QWNjb3VudCB8fCBcIlwiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgW3BhcnNlSVNPLCByZXNvbHZlUXVpY2tGaWx0ZXJGcm9tUmFuZ2VdXG4gICk7XG5cclxuICBjb25zdCBoYW5kbGVTZWxlY3QgPSB1c2VDYWxsYmFjayhcclxuICAgIChkYXRlT2JqOiBEYXRlKSA9PiB7XHJcbiAgICAgIGxvZ0hpc3RvcnkoXCJoYW5kbGVTZWxlY3RcIiwge1xyXG4gICAgICAgIGNsaWNrZWQ6IHRvSVNPKGRhdGVPYmopLFxyXG4gICAgICAgIHN0YXJ0OiBmcm9tRGF0ZVZhbHVlLFxyXG4gICAgICAgIGVuZDogdG9EYXRlVmFsdWUsXHJcbiAgICAgICAgc2VsZWN0aW5nU3RlcCxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBzZXRTaG93TWFudWFsRXJyb3IoZmFsc2UpO1xyXG4gICAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcihcImN1c3RvbVwiKTtcclxuICAgICAgc2V0U2hvd01hbnVhbFBpY2tlclBhbmVsKHRydWUpO1xyXG4gICAgICBjb25zdCBoYXNTdGFydCA9ICEhc3RhcnREYXRlO1xyXG4gICAgICBjb25zdCBoYXNFbmQgPSAhIWVuZERhdGU7XHJcblxyXG4gICAgICBpZiAoc2VsZWN0aW5nU3RlcCA9PT0gXCJlbmRcIikge1xyXG4gICAgICAgIGlmICghaGFzU3RhcnQpIHtcclxuICAgICAgICAgIHNldFN0YXJ0RGF0ZShkYXRlT2JqKTtcclxuICAgICAgICAgIHNldEVuZERhdGUobnVsbCk7XHJcbiAgICAgICAgICBzZXRTZWxlY3RpbmdTdGVwKFwiZW5kXCIpO1xyXG4gICAgICAgICAgc2V0Q3VycmVudE1vbnRoKGRhdGVPYmouZ2V0TW9udGgoKSk7XHJcbiAgICAgICAgICBzZXRDdXJyZW50WWVhcihkYXRlT2JqLmdldEZ1bGxZZWFyKCkpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG5ld1N0YXJ0ID0gc3RhcnREYXRlIGFzIERhdGU7XHJcbiAgICAgICAgbGV0IG5ld0VuZCA9IGRhdGVPYmo7XHJcbiAgICAgICAgaWYgKGlzQmVmb3JlKG5ld0VuZCwgbmV3U3RhcnQpKSB7XHJcbiAgICAgICAgICBjb25zdCBzd2FwID0gbmV3U3RhcnQ7XHJcbiAgICAgICAgICBuZXdTdGFydCA9IG5ld0VuZDtcclxuICAgICAgICAgIG5ld0VuZCA9IHN3YXA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRTdGFydERhdGUobmV3U3RhcnQpO1xyXG4gICAgICAgIHNldEVuZERhdGUobmV3RW5kKTtcclxuICAgICAgICBzZXRNYW51YWxTdGFydERhdGUobmV3U3RhcnQpO1xyXG4gICAgICAgIHNldE1hbnVhbEVuZERhdGUobmV3RW5kKTtcclxuICAgICAgICBzZXRTZWxlY3RpbmdTdGVwKFwiZG9uZVwiKTtcclxuICAgICAgICBzZXRDdXJyZW50TW9udGgobmV3RW5kLmdldE1vbnRoKCkpO1xyXG4gICAgICAgIHNldEN1cnJlbnRZZWFyKG5ld0VuZC5nZXRGdWxsWWVhcigpKTtcclxuICAgICAgICBzZXRIb3ZlckRhdGUobnVsbCk7XHJcbiAgICAgICAgc2V0SXNPcGVuKGZhbHNlKTtcclxuICAgICAgICBzZXRTaG93TWFudWFsUGlja2VyUGFuZWwoZmFsc2UpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgbmV3U3RhcnQgPSBkYXRlT2JqO1xyXG4gICAgICBpZiAoaGFzRW5kICYmIGVuZERhdGUgJiYgaXNCZWZvcmUoZW5kRGF0ZSwgbmV3U3RhcnQpKSB7XHJcbiAgICAgICAgc2V0U3RhcnREYXRlKG5ld1N0YXJ0KTtcclxuICAgICAgICBzZXRFbmREYXRlKG51bGwpO1xyXG4gICAgICAgIHNldFNlbGVjdGluZ1N0ZXAoXCJlbmRcIik7XHJcbiAgICAgICAgc2V0Q3VycmVudE1vbnRoKG5ld1N0YXJ0LmdldE1vbnRoKCkpO1xyXG4gICAgICAgIHNldEN1cnJlbnRZZWFyKG5ld1N0YXJ0LmdldEZ1bGxZZWFyKCkpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2V0U3RhcnREYXRlKG5ld1N0YXJ0KTtcclxuICAgICAgaWYgKGhhc0VuZCAmJiBlbmREYXRlKSB7XHJcbiAgICAgICAgc2V0RW5kRGF0ZShlbmREYXRlKTtcclxuICAgICAgICBzZXRNYW51YWxTdGFydERhdGUobmV3U3RhcnQpO1xyXG4gICAgICAgIHNldE1hbnVhbEVuZERhdGUoZW5kRGF0ZSk7XHJcbiAgICAgICAgc2V0U2VsZWN0aW5nU3RlcChcImRvbmVcIik7XHJcbiAgICAgICAgc2V0SG92ZXJEYXRlKG51bGwpO1xyXG4gICAgICAgIHNldElzT3BlbihmYWxzZSk7XHJcbiAgICAgICAgc2V0U2hvd01hbnVhbFBpY2tlclBhbmVsKGZhbHNlKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzZXRFbmREYXRlKG51bGwpO1xyXG4gICAgICAgIHNldFNlbGVjdGluZ1N0ZXAoXCJlbmRcIik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNldEN1cnJlbnRNb250aChuZXdTdGFydC5nZXRNb250aCgpKTtcclxuICAgICAgc2V0Q3VycmVudFllYXIobmV3U3RhcnQuZ2V0RnVsbFllYXIoKSk7XHJcbiAgICB9LFxyXG4gICAgW2VuZERhdGUsIGZyb21EYXRlVmFsdWUsIGlzQmVmb3JlLCBsb2dIaXN0b3J5LCBzZWxlY3RpbmdTdGVwLCBzdGFydERhdGUsIHRvRGF0ZVZhbHVlLCB0b0lTT11cclxuICApO1xyXG5cclxuICBjb25zdCBoYW5kbGVDbGVhclN0YXRlID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoZXZlbnQ6IFJlYWN0TW91c2VFdmVudCkgPT4ge1xyXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgbG9nSGlzdG9yeShcImNsZWFyUmFuZ2VcIik7XHJcbiAgICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKG51bGwpO1xyXG4gICAgICBzZXRTaG93TWFudWFsRXJyb3IoZmFsc2UpO1xyXG4gICAgICBzZXRTaG93TWFudWFsUGlja2VyUGFuZWwoZmFsc2UpO1xyXG4gICAgICByZXNldEhpc3RvcnlGaWx0ZXJzKCk7XHJcbiAgICAgIHNldElzT3BlbihmYWxzZSk7XHJcbiAgICAgIHNldFNob3dGaWx0ZXJzKHRydWUpO1xyXG4gICAgfSxcclxuICAgIFtsb2dIaXN0b3J5LCByZXNldEhpc3RvcnlGaWx0ZXJzXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IG9wZW5Qb3BvdmVyID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoc2VjdGlvbjogXCJzdGFydFwiIHwgXCJlbmRcIikgPT4ge1xyXG4gICAgICBsb2dIaXN0b3J5KFwib3BlblBvcG92ZXJcIiwgeyBzZWN0aW9uLCBzdGFydDogZnJvbURhdGVWYWx1ZSwgZW5kOiB0b0RhdGVWYWx1ZSwgc2VsZWN0aW5nU3RlcCB9KTtcclxuICAgICAgc2V0U2hvd01hbnVhbEVycm9yKGZhbHNlKTtcclxuICAgICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIoXCJjdXN0b21cIik7XHJcbiAgICAgIHNldFNob3dNYW51YWxQaWNrZXJQYW5lbCh0cnVlKTtcclxuXHJcbiAgICAgIGlmIChzZWN0aW9uID09PSBcImVuZFwiICYmICFzdGFydERhdGUpIHtcclxuICAgICAgICBzZXRTZWxlY3RpbmdTdGVwKFwic3RhcnRcIik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc2V0U2VsZWN0aW5nU3RlcChzZWN0aW9uKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2V0SXNPcGVuKHRydWUpO1xyXG4gICAgfSxcclxuICAgIFtmcm9tRGF0ZVZhbHVlLCBsb2dIaXN0b3J5LCBzZWxlY3RpbmdTdGVwLCBzdGFydERhdGUsIHRvRGF0ZVZhbHVlXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUFjdGl2YXRvcktleURvd24gPSB1c2VDYWxsYmFjayhcclxuICAgIChldmVudDogUmVhY3QuS2V5Ym9hcmRFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHtcclxuICAgICAgaWYgKGV2ZW50LmtleSAhPT0gXCJFbnRlclwiICYmIGV2ZW50LmtleSAhPT0gXCIgXCIpIHJldHVybjtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgb3BlblBvcG92ZXIoXCJzdGFydFwiKTtcclxuICAgIH0sXHJcbiAgICBbb3BlblBvcG92ZXJdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlU2VjdGlvbktleURvd24gPSB1c2VDYWxsYmFjayhcclxuICAgIChldmVudDogUmVhY3QuS2V5Ym9hcmRFdmVudDxIVE1MRGl2RWxlbWVudD4sIHNlY3Rpb246IFwic3RhcnRcIiB8IFwiZW5kXCIpID0+IHtcclxuICAgICAgaWYgKGV2ZW50LmtleSAhPT0gXCJFbnRlclwiICYmIGV2ZW50LmtleSAhPT0gXCIgXCIpIHJldHVybjtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIG9wZW5Qb3BvdmVyKHNlY3Rpb24pO1xyXG4gICAgfSxcclxuICAgIFtvcGVuUG9wb3Zlcl1cclxuICApO1xyXG5cclxuICBjb25zdCBhcHBseVF1aWNrUmFuZ2UgPSB1c2VDYWxsYmFjayhcclxuICAgIChmaWx0ZXJJZDogUXVpY2tGaWx0ZXJJZCwgc3RhcnQ6IERhdGUsIGVuZDogRGF0ZSkgPT4ge1xyXG4gICAgICBjb25zdCBzdGFydERheSA9IHN0YXJ0T2ZEYXkoc3RhcnQpO1xyXG4gICAgICBjb25zdCBlbmREYXkgPSBzdGFydE9mRGF5KGVuZCk7XHJcbiAgICAgIHNldFN0YXJ0RGF0ZShzdGFydERheSk7XHJcbiAgICAgIHNldEVuZERhdGUoZW5kRGF5KTtcclxuICAgICAgc2V0U2VsZWN0aW5nU3RlcChcImRvbmVcIik7XHJcbiAgICAgIHNldEhvdmVyRGF0ZShudWxsKTtcclxuICAgICAgc2V0Q3VycmVudE1vbnRoKHN0YXJ0RGF5LmdldE1vbnRoKCkpO1xyXG4gICAgICBzZXRDdXJyZW50WWVhcihzdGFydERheS5nZXRGdWxsWWVhcigpKTtcclxuICAgICAgc2V0SXNPcGVuKGZhbHNlKTtcclxuICAgICAgc2V0U2hvd01hbnVhbFBpY2tlclBhbmVsKGZhbHNlKTtcclxuICAgICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIoZmlsdGVySWQpO1xyXG4gICAgICBzZXRTaG93TWFudWFsRXJyb3IoZmFsc2UpO1xyXG4gICAgfSxcclxuICAgIFtzdGFydE9mRGF5XVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZVF1aWNrRmlsdGVyID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoZmlsdGVySWQ6IFF1aWNrRmlsdGVySWQpID0+IHtcclxuICAgICAgY29uc3QgdG9kYXkgPSBzdGFydE9mRGF5KG5ldyBEYXRlKCkpO1xyXG5cclxuICAgICAgaWYgKGZpbHRlcklkID09PSBcImN1c3RvbVwiKSB7XHJcbiAgICAgICAgLy8gVG9nZ2xlIG1hbnVhbCBwYW5lbCBvbiBldmVyeSBEYXRlIGJ1dHRvbiBjbGljay5cclxuICAgICAgICBpZiAoc2hvd01hbnVhbFBpY2tlclBhbmVsKSB7XHJcbiAgICAgICAgICBzZXRTaG93TWFudWFsRXJyb3IoZmFsc2UpO1xyXG4gICAgICAgICAgc2V0SG92ZXJEYXRlKG51bGwpO1xyXG4gICAgICAgICAgc2V0U2VsZWN0aW5nU3RlcChzdGFydERhdGUgJiYgZW5kRGF0ZSA/IFwiZG9uZVwiIDogc3RhcnREYXRlID8gXCJlbmRcIiA6IFwic3RhcnRcIik7XHJcbiAgICAgICAgICBzZXRJc09wZW4oZmFsc2UpO1xyXG4gICAgICAgICAgc2V0U2hvd01hbnVhbFBpY2tlclBhbmVsKGZhbHNlKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IG5leHRTdGFydCA9IG1hbnVhbFN0YXJ0RGF0ZSA/IG5ldyBEYXRlKG1hbnVhbFN0YXJ0RGF0ZSkgOiBzdGFydERhdGUgPyBuZXcgRGF0ZShzdGFydERhdGUpIDogbnVsbDtcclxuICAgICAgICBjb25zdCBuZXh0RW5kID0gbWFudWFsRW5kRGF0ZSA/IG5ldyBEYXRlKG1hbnVhbEVuZERhdGUpIDogZW5kRGF0ZSA/IG5ldyBEYXRlKGVuZERhdGUpIDogbnVsbDtcclxuICAgICAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcihcImN1c3RvbVwiKTtcclxuICAgICAgICBzZXRTaG93TWFudWFsUGlja2VyUGFuZWwodHJ1ZSk7XHJcbiAgICAgICAgc2V0U3RhcnREYXRlKG5leHRTdGFydCk7XHJcbiAgICAgICAgc2V0RW5kRGF0ZShuZXh0RW5kKTtcclxuXHJcbiAgICAgICAgaWYgKG5leHRTdGFydCkge1xyXG4gICAgICAgICAgc2V0Q3VycmVudE1vbnRoKG5leHRTdGFydC5nZXRNb250aCgpKTtcclxuICAgICAgICAgIHNldEN1cnJlbnRZZWFyKG5leHRTdGFydC5nZXRGdWxsWWVhcigpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEFsd2F5cyByZW9wZW4gdGhlIG1hbnVhbCBjYWxlbmRhciB3aGVuIHRoZSBjdXN0b20gZGF0ZSBxdWljayBmaWx0ZXIgaXMgcHJlc3NlZC5cclxuICAgICAgICBzZXRTZWxlY3RpbmdTdGVwKG5leHRTdGFydCAmJiAhbmV4dEVuZCA/IFwiZW5kXCIgOiBcInN0YXJ0XCIpO1xyXG4gICAgICAgIHNldElzT3Blbih0cnVlKTtcclxuICAgICAgICBzZXRIb3ZlckRhdGUobnVsbCk7XHJcbiAgICAgICAgc2V0U2hvd01hbnVhbEVycm9yKGZhbHNlKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChmaWx0ZXJJZCA9PT0gXCJkYXlzLTdcIikge1xyXG4gICAgICAgIGNvbnN0IHN0YXJ0ID0gbmV3IERhdGUodG9kYXkpO1xyXG4gICAgICAgIHN0YXJ0LnNldERhdGUodG9kYXkuZ2V0RGF0ZSgpIC0gNik7XHJcbiAgICAgICAgYXBwbHlRdWlja1JhbmdlKGZpbHRlcklkLCBzdGFydCwgdG9kYXkpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGZpbHRlcklkID09PSBcImRheXMtMzBcIikge1xyXG4gICAgICAgIGNvbnN0IHN0YXJ0ID0gbmV3IERhdGUodG9kYXkpO1xyXG4gICAgICAgIHN0YXJ0LnNldERhdGUodG9kYXkuZ2V0RGF0ZSgpIC0gMjkpO1xyXG4gICAgICAgIGFwcGx5UXVpY2tSYW5nZShmaWx0ZXJJZCwgc3RhcnQsIHRvZGF5KTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChmaWx0ZXJJZCA9PT0gXCJkYXlzLTkwXCIpIHtcclxuICAgICAgICBjb25zdCBzdGFydCA9IG5ldyBEYXRlKHRvZGF5KTtcclxuICAgICAgICBzdGFydC5zZXREYXRlKHRvZGF5LmdldERhdGUoKSAtIDg5KTtcclxuICAgICAgICBhcHBseVF1aWNrUmFuZ2UoZmlsdGVySWQsIHN0YXJ0LCB0b2RheSk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBbYXBwbHlRdWlja1JhbmdlLCBlbmREYXRlLCBtYW51YWxFbmREYXRlLCBtYW51YWxTdGFydERhdGUsIHNob3dNYW51YWxQaWNrZXJQYW5lbCwgc3RhcnREYXRlLCBzdGFydE9mRGF5XVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUNsaWVudFNlbGVjdGVkID0gdXNlQ2FsbGJhY2soKGNsaWVudDogQ2xpZW50T3B0aW9uIHwgbnVsbCkgPT4ge1xyXG4gICAgc2V0U2VsZWN0ZWRDbGllbnQoY2xpZW50KTtcclxuICB9LCBbXSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBzdGFydERhdGUsXHJcbiAgICBlbmREYXRlLFxyXG4gICAgbWFudWFsU3RhcnREYXRlLFxyXG4gICAgbWFudWFsRW5kRGF0ZSxcclxuICAgIGhvdmVyRGF0ZSxcclxuICAgIHNlbGVjdGluZ1N0ZXAsXHJcbiAgICBjdXJyZW50TW9udGgsXHJcbiAgICBjdXJyZW50WWVhcixcclxuICAgIGlzT3BlbixcclxuICAgIHNob3dNYW51YWxQaWNrZXJQYW5lbCxcclxuICAgIGFjdGl2ZVF1aWNrRmlsdGVyLFxyXG4gICAgc2VsZWN0ZWRDbGllbnQsXHJcbiAgICBjbGllbnRSZXNldEtleSxcclxuICAgIHNob3dGaWx0ZXJzLFxyXG4gICAgc2hvd01hbnVhbEVycm9yLFxyXG4gICAgZnJvbURhdGVWYWx1ZSxcclxuICAgIHRvRGF0ZVZhbHVlLFxyXG4gICAgYWNjb3VudE51bVZhbHVlLFxyXG4gICAgaGFzUmVzdG9yZWRGaWx0ZXJSZWYsXHJcbiAgICBkaWRJbml0RmlsdGVyUmVmLFxyXG4gICAgc2V0U3RhcnREYXRlLFxyXG4gICAgc2V0RW5kRGF0ZSxcclxuICAgIHNldE1hbnVhbFN0YXJ0RGF0ZSxcclxuICAgIHNldE1hbnVhbEVuZERhdGUsXHJcbiAgICBzZXRIb3ZlckRhdGUsXHJcbiAgICBzZXRTZWxlY3RpbmdTdGVwLFxyXG4gICAgc2V0Q3VycmVudE1vbnRoLFxyXG4gICAgc2V0Q3VycmVudFllYXIsXHJcbiAgICBzZXRJc09wZW4sXHJcbiAgICBzZXRTaG93TWFudWFsUGlja2VyUGFuZWwsXHJcbiAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcixcclxuICAgIHNldFNlbGVjdGVkQ2xpZW50LFxyXG4gICAgc2V0Q2xpZW50UmVzZXRLZXksXHJcbiAgICBzZXRTaG93RmlsdGVycyxcclxuICAgIHNldFNob3dNYW51YWxFcnJvcixcclxuICAgIHZhbGlkYXRlTWFudWFsUmFuZ2UsXHJcbiAgICBhcHBseURlZmF1bHRSYW5nZUZyb21Qcm9wcyxcbiAgICByZXNldEhpc3RvcnlGaWx0ZXJzLFxuICAgIGFwcGx5Q2FjaGVkRmlsdGVyLFxuICAgIGhhbmRsZVNlbGVjdCxcclxuICAgIGhhbmRsZUNsZWFyU3RhdGUsXHJcbiAgICBvcGVuUG9wb3ZlcixcclxuICAgIGhhbmRsZUFjdGl2YXRvcktleURvd24sXHJcbiAgICBoYW5kbGVTZWN0aW9uS2V5RG93bixcclxuICAgIGhhbmRsZVF1aWNrRmlsdGVyLFxyXG4gICAgaGFuZGxlQ2xpZW50U2VsZWN0ZWQsXHJcbiAgfTtcclxufTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFBQSxnQkFBeUU7OztBQ0F6RSxtQkFBMkM7QUFnSXZDO0FBbkdKLElBQU0sY0FBYztBQUNwQixJQUFNLHFCQUFxQjtBQVkzQixJQUFNLGVBQWUsQ0FBQyxFQUFFLE9BQU8sWUFBWSxjQUFjLFdBQVcsTUFBYTtBQUMvRSxRQUFNLG1CQUFlLHFCQUE4QixJQUFJO0FBQ3ZELFFBQU0sa0JB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QUFNLDZDQUFDLGVBQVksaUJBQWtDLGVBQThCLENBQUU7QUFDeEc7QUFFQSxJQUFNLFFBQVEsTUFBTTtBQUNsQixRQUFNLFNBQVMsU0FBUyxlQUFlLHNCQUFzQjtBQUM3RCxNQUFJLENBQUMsT0FBUTtBQUNiLG1CQUFpQixNQUFNO0FBQ3pCO0FBRUEsdUJBQXVCLEtBQUs7QUFFNUIsSUFBTyxzQkFBUTsiLAogICJuYW1lcyI6IFsiaW1wb3J0X3JlYWN0IiwgIlJlYWN0IiwgImltcG9ydF9yZWFjdCIsICJsb2dIaXN0b3J5IiwgImltcG9ydF9yZWFjdCIsICJsb2dIaXN0b3J5IiwgInRvVGl0bGVDYXNlIiwgImZvcm1hdERhdGVQYXJ0cyIsICJpbXBvcnRfcmVhY3QiLCAibm9ybWFsaXplUmFuZ2UiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJsb2dIaXN0b3J5IiwgInBhcnNlRGF0ZVZhbHVlIiwgInBhcnNlSVNPIiwgInRvSVNPIiwgInN0YXJ0T2ZEYXkiLCAiaXNCZWZvcmUiLCAibmV3U3RhcnQiLCAiaW1wb3J0X2pzeF9ydW50aW1lIl0KfQo=
