import {
  ClientSearchCombobox_default
} from "./chunks/chunk-AC6HVXJM.js";
import {
  ActionButton_default,
  FilterButton_default,
  HistoryManualDatePicker_default,
  HistorySummary_default
} from "./chunks/chunk-DYUBZDCD.js";
import "./chunks/chunk-YMDESVRK.js";
import {
  CompactPagination_default,
  FloatingActionButton_default,
  useTimelineCardEffects
} from "./chunks/chunk-MYQREIJ7.js";
import "./chunks/chunk-HF2ANVLM.js";
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
} from "./chunks/chunk-EGSPAV7B.js";
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
} from "./chunks/chunk-63VW7TTG.js";
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
var ZH_MONTH_YEAR_FORMATTER = new Intl.DateTimeFormat("zh-CN", { year: "numeric", month: "long" });
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
    return ZH_MONTH_YEAR_FORMATTER.format(d);
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
  const canViewHistory = canAccess("VISITAS_GESTION", "View");
  const canCreateVisit = canAccess("VISITAS_GESTION", "Add");
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
    showFilters && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "filter-card filter-card--expanded p-2 sm:p-2.5 relative", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "gap-y-1.5 history-filter-stack flex flex-col", children: [
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
        className: "loader-box glass-panel shadow-card flex items-center gap-2 text-sm text-neutral-700",
        style: { display: isLoading ? "flex" : "none" },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("svg", { className: "ind-spinner size-5", viewBox: "0 0 20 20", role: "status", "aria-label": indT("History_Loading", "Loading"), children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("circle", { className: "ind-spinner__circle", cx: "10", cy: "10", r: "8", strokeWidth: "2" }) }),
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvaGlzdG9yaWFsL0hpc3RvcnlQYWdlLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9oaXN0b3JpYWwvSGlzdG9yeVRhYmxlLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9oaXN0b3JpYWwvdXNlSGlzdG9yeVBhZ2VMaXN0ZW5lcnMudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvaGlzdG9yaWFsL3VzZUhpc3RvcnlUaW1lbGluZUl0ZW1zLnRzIiwgIi4uL3JlYWN0L3NyYy9ob29rcy91c2VIaXN0b3J5QWN0aXZpdGllcy50cyIsICIuLi9yZWFjdC9zcmMvaG9va3MvdXNlSGlzdG9yeUZpbHRlckNhY2hlLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy92aXNpdGFzL2hpc3RvcmlhbC91c2VIaXN0b3J5RmlsdGVyc1N0YXRlLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBjbGFzc05hbWVzIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2NsYXNzTmFtZXMudHNcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB7IGNhbkFjY2Vzcywgc2hvd1Blcm1pc3Npb25Nb2RhbCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9wZXJtaXNzaW9ucy50c1wiO1xyXG5pbXBvcnQgQ2xpZW50U2VhcmNoQ29tYm9ib3ggZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvdmlzaXRhcy9DbGllbnRTZWFyY2hDb21ib2JveC50c3hcIjtcclxuaW1wb3J0IEhpc3RvcnlUYWJsZSBmcm9tIFwiLi9IaXN0b3J5VGFibGUudHN4XCI7XHJcbmltcG9ydCBIaXN0b3J5U3VtbWFyeSBmcm9tIFwiLi9IaXN0b3J5U3VtbWFyeS50c3hcIjtcclxuaW1wb3J0IEhpc3RvcnlNYW51YWxEYXRlUGlja2VyLCB7IEhpc3RvcnlNYW51YWxEYXlDZWxsIH0gZnJvbSBcIi4vSGlzdG9yeU1hbnVhbERhdGVQaWNrZXIudHN4XCI7XHJcbmltcG9ydCB7IHVzZUhpc3RvcnlQYWdlTGlzdGVuZXJzIH0gZnJvbSBcIi4vdXNlSGlzdG9yeVBhZ2VMaXN0ZW5lcnMudHNcIjtcclxuaW1wb3J0IHsgdXNlSGlzdG9yeVRpbWVsaW5lSXRlbXMgfSBmcm9tIFwiLi91c2VIaXN0b3J5VGltZWxpbmVJdGVtcy50c1wiO1xyXG5pbXBvcnQgRmxvYXRpbmdBY3Rpb25CdXR0b24gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9GbG9hdGluZ0FjdGlvbkJ1dHRvbi50c3hcIjtcclxuaW1wb3J0IENvbXBhY3RQYWdpbmF0aW9uIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvQ29tcGFjdFBhZ2luYXRpb24udHN4XCI7XHJcbmltcG9ydCBGaWx0ZXJCdXR0b24gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9GaWx0ZXJCdXR0b24udHN4XCI7XHJcbmltcG9ydCBBY3Rpb25CdXR0b24gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9BY3Rpb25CdXR0b24udHN4XCI7XHJcbmltcG9ydCB7IHVzZUhpc3RvcnlBY3Rpdml0aWVzIH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZUhpc3RvcnlBY3Rpdml0aWVzLnRzXCI7XHJcbmltcG9ydCB7IHVzZUhpc3RvcnlGaWx0ZXJDYWNoZSB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VIaXN0b3J5RmlsdGVyQ2FjaGUudHNcIjtcclxuaW1wb3J0IHsgdXNlSGlzdG9yeUZpbHRlcnNTdGF0ZSB9IGZyb20gXCIuL3VzZUhpc3RvcnlGaWx0ZXJzU3RhdGUudHNcIjtcclxuaW1wb3J0IHsgbW91bnRSZWFjdElzbGFuZCwgbW91bnRXaGVuRG9jdW1lbnRSZWFkeSB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9yZWFjdElzbGFuZC50c3hcIjtcclxuXHJcbnR5cGUgUHJvcHMgPSB7XHJcbiAgZGVmYXVsdEZyb21EYXRlPzogc3RyaW5nO1xyXG4gIGRlZmF1bHRUb0RhdGU/OiBzdHJpbmc7XHJcbn07XHJcblxyXG50eXBlIENhbGVuZGFyQ2VsbCA9IHtcclxuICBkYXRlOiBEYXRlIHwgbnVsbDtcclxuICBpc286IHN0cmluZztcclxuICBpc0VtcHR5OiBib29sZWFuO1xyXG59O1xyXG5cclxuY29uc3QgUEFHRV9TSVpFID0gNjtcclxuY29uc3QgUEFHRV9XSU5ET1cgPSA2O1xyXG5jb25zdCBOQVZfREVMQVlfTVMgPSAzMjA7XHJcbmNvbnN0IEZBQl9CQVNFX0JPVFRPTSA9IDMyO1xyXG5cclxuY29uc3Qgbm9ybWFsaXplVWlMb2NhbGUgPSAobG9jYWxlOiBzdHJpbmcpID0+IHtcclxuICBjb25zdCB2YWx1ZSA9IFN0cmluZyhsb2NhbGUgfHwgXCJcIikudHJpbSgpO1xyXG4gIGlmICghdmFsdWUpIHJldHVybiBcImVzLUVTXCI7XHJcbiAgaWYgKC9eemgtaGFucy9pLnRlc3QodmFsdWUpKSByZXR1cm4gXCJ6aC1DTlwiO1xyXG4gIHJldHVybiB2YWx1ZTtcclxufTtcclxuXHJcbmNvbnN0IGlzQmFzcXVlTG9jYWxlID0gKGxvY2FsZTogc3RyaW5nKSA9PiAvXmV1XFxiL2kudGVzdChTdHJpbmcobG9jYWxlIHx8IFwiXCIpKTtcclxuXHJcbmNvbnN0IEJBU1FVRV9NT05USFMgPSBbXHJcbiAgXCJ1cnRhcnJpbGFcIixcclxuICBcIm90c2FpbGFcIixcclxuICBcIm1hcnR4b2FcIixcclxuICBcImFwaXJpbGFcIixcclxuICBcIm1haWF0emFcIixcclxuICBcImVrYWluYVwiLFxyXG4gIFwidXp0YWlsYVwiLFxyXG4gIFwiYWJ1enR1YVwiLFxyXG4gIFwiaXJhaWxhXCIsXHJcbiAgXCJ1cnJpYVwiLFxyXG4gIFwiYXphcm9hXCIsXHJcbiAgXCJhYmVuZHVhXCIsXHJcbl07XHJcblxyXG5jb25zdCBCQVNRVUVfTU9OVEhTX1NIT1JUID0gW1xuICBcInVydFwiLFxyXG4gIFwib3RzXCIsXHJcbiAgXCJtYXJcIixcclxuICBcImFwaVwiLFxyXG4gIFwibWFpXCIsXHJcbiAgXCJla2FcIixcclxuICBcInV6dFwiLFxyXG4gIFwiYWJ1XCIsXHJcbiAgXCJpcmFcIixcclxuICBcInVyclwiLFxyXG4gIFwiYXphXCIsXHJcbiAgXCJhYmVcIixcbl07XG5cbmNvbnN0IFpIX01PTlRIX1lFQVJfRk9STUFUVEVSID0gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQoXCJ6aC1DTlwiLCB7IHllYXI6IFwibnVtZXJpY1wiLCBtb250aDogXCJsb25nXCIgfSk7XG5cbmNvbnN0IGdldFVpTG9jYWxlID0gKCkgPT4ge1xyXG4gIGNvbnN0IGZyb21IdG1sID0gdHlwZW9mIGRvY3VtZW50ICE9PSBcInVuZGVmaW5lZFwiID8gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmxhbmcgOiBcIlwiO1xyXG4gIGlmIChmcm9tSHRtbCAmJiBTdHJpbmcoZnJvbUh0bWwpLnRyaW0oKSkgcmV0dXJuIG5vcm1hbGl6ZVVpTG9jYWxlKGZyb21IdG1sKTtcclxuICByZXR1cm4gXCJlcy1FU1wiO1xyXG59O1xyXG5cclxuY29uc3QgcGFkID0gKG46IG51bWJlcikgPT4gbi50b1N0cmluZygpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcclxuXHJcbmNvbnN0IHRvSVNPID0gKGQ6IERhdGUpID0+IGAke2QuZ2V0RnVsbFllYXIoKX0tJHtwYWQoZC5nZXRNb250aCgpICsgMSl9LSR7cGFkKGQuZ2V0RGF0ZSgpKX1gO1xyXG5cclxuY29uc3Qgc3RhcnRPZkRheSA9IChkOiBEYXRlKSA9PiBuZXcgRGF0ZShkLmdldEZ1bGxZZWFyKCksIGQuZ2V0TW9udGgoKSwgZC5nZXREYXRlKCkpO1xyXG5cclxuY29uc3QgcGFyc2VJU08gPSAoczogc3RyaW5nKSA9PiB7XHJcbiAgaWYgKCFzKSByZXR1cm4gbnVsbDtcclxuICBjb25zdCBwYXJ0cyA9IHMuc3BsaXQoXCItXCIpLm1hcChOdW1iZXIpO1xyXG4gIGlmIChwYXJ0cy5sZW5ndGggIT09IDMpIHJldHVybiBudWxsO1xyXG4gIHJldHVybiBuZXcgRGF0ZShwYXJ0c1swXSwgcGFydHNbMV0gLSAxLCBwYXJ0c1syXSk7XHJcbn07XHJcblxyXG5jb25zdCBzYW1lRGF5ID0gKGE6IERhdGUgfCBudWxsLCBiOiBEYXRlIHwgbnVsbCkgPT4gISEoYSAmJiBiICYmIGEuZ2V0VGltZSgpID09PSBiLmdldFRpbWUoKSk7XHJcblxyXG5jb25zdCBpc0JlZm9yZSA9IChhOiBEYXRlIHwgbnVsbCwgYjogRGF0ZSB8IG51bGwpID0+ICEhKGEgJiYgYiAmJiBhLmdldFRpbWUoKSA8IGIuZ2V0VGltZSgpKTtcclxuXHJcbiAgY29uc3Qgbm9ybWFsaXplUmFuZ2UgPSAoZnJvbTogc3RyaW5nLCB0bzogc3RyaW5nKSA9PiB7XHJcbiAgICBpZiAoIWZyb20gfHwgIXRvKSByZXR1cm4geyBmcm9tLCB0byB9O1xyXG4gICAgY29uc3QgZnJvbURhdGUgPSBwYXJzZUlTTyhmcm9tKTtcclxuICAgIGNvbnN0IHRvRGF0ZSA9IHBhcnNlSVNPKHRvKTtcclxuICAgIGlmICghZnJvbURhdGUgfHwgIXRvRGF0ZSkgcmV0dXJuIHsgZnJvbSwgdG8gfTtcclxuICBpZiAoaXNCZWZvcmUodG9EYXRlLCBmcm9tRGF0ZSkpIHtcclxuICAgIHJldHVybiB7IGZyb206IHRvSVNPKHRvRGF0ZSksIHRvOiB0b0lTTyhmcm9tRGF0ZSkgfTtcclxuICB9XHJcbiAgcmV0dXJuIHsgZnJvbTogdG9JU08oZnJvbURhdGUpLCB0bzogdG9JU08odG9EYXRlKSB9O1xyXG59O1xyXG5cclxuICBjb25zdCBmb3JtYXREaXNwbGF5ID0gKGQ6IERhdGUsIGxvY2FsZTogc3RyaW5nKSA9PiB7XHJcbiAgaWYgKGlzQmFzcXVlTG9jYWxlKGxvY2FsZSkpIHtcclxuICAgIGNvbnN0IG1vbnRoID0gQkFTUVVFX01PTlRIU19TSE9SVFtkLmdldE1vbnRoKCldO1xyXG4gICAgcmV0dXJuIGAke2QuZ2V0RGF0ZSgpfSAke21vbnRofSAke2QuZ2V0RnVsbFllYXIoKX1gLnRvTG93ZXJDYXNlKCk7XHJcbiAgfVxyXG4gIHJldHVybiBkXHJcbiAgICAudG9Mb2NhbGVEYXRlU3RyaW5nKGxvY2FsZSwge1xyXG4gICAgICBkYXk6IFwibnVtZXJpY1wiLFxyXG4gICAgICBtb250aDogXCJzaG9ydFwiLFxyXG4gICAgICB5ZWFyOiBcIm51bWVyaWNcIixcclxuICAgIH0pXHJcbiAgICAucmVwbGFjZSgvXFwuL2csIFwiXCIpXHJcbiAgICAudG9Mb3dlckNhc2UoKTtcclxufTtcclxuXHJcbmNvbnN0IGZvcm1hdE1vbnRoTGFiZWwgPSAoZDogRGF0ZSwgbG9jYWxlOiBzdHJpbmcpID0+IHtcbiAgaWYgKC9eemgvaS50ZXN0KGxvY2FsZSkpIHtcbiAgICByZXR1cm4gWkhfTU9OVEhfWUVBUl9GT1JNQVRURVIuZm9ybWF0KGQpO1xuICB9XG4gIGlmIChpc0Jhc3F1ZUxvY2FsZShsb2NhbGUpKSB7XHJcbiAgICByZXR1cm4gYCR7QkFTUVVFX01PTlRIU1tkLmdldE1vbnRoKCldfSAke2QuZ2V0RnVsbFllYXIoKX1gO1xyXG4gIH1cclxuICBjb25zdCBtb250aE5hbWUgPSBkLnRvTG9jYWxlRGF0ZVN0cmluZyhsb2NhbGUsIHsgbW9udGg6IFwibG9uZ1wiIH0pO1xyXG4gIGNvbnN0IGNhcE1vbnRoTmFtZSA9IG1vbnRoTmFtZSAmJiAvW0EtWmEtel0vLnRlc3QobW9udGhOYW1lWzBdKVxyXG4gICAgPyBtb250aE5hbWVbMF0udG9Mb2NhbGVVcHBlckNhc2UobG9jYWxlKSArIG1vbnRoTmFtZS5zbGljZSgxKVxyXG4gICAgOiBtb250aE5hbWU7XHJcbiAgcmV0dXJuIGAke2NhcE1vbnRoTmFtZX0gJHtkLmdldEZ1bGxZZWFyKCl9YDtcclxufTtcclxuXHJcbmNvbnN0IHBhcnNlRGF0ZVZhbHVlID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcclxuICBpZiAoIXZhbHVlKSByZXR1cm4gbnVsbDtcclxuICBjb25zdCByYXcgPSBTdHJpbmcodmFsdWUpLnRyaW0oKTtcclxuICBpZiAoIXJhdykgcmV0dXJuIG51bGw7XHJcblxyXG4gIGNvbnN0IGRhdGVQYXJ0ID0gcmF3LnNwbGl0KFwiVFwiKVswXS5zcGxpdChcIiBcIilbMF07XHJcblxyXG4gIGlmICgvXlxcZHs0fS1cXGR7Mn0tXFxkezJ9JC8udGVzdChkYXRlUGFydCkpIHtcclxuICAgIGNvbnN0IFt5LCBtLCBkXSA9IGRhdGVQYXJ0LnNwbGl0KFwiLVwiKS5tYXAoTnVtYmVyKTtcclxuICAgIHJldHVybiBuZXcgRGF0ZSh5LCBtIC0gMSwgZCk7XHJcbiAgfVxyXG5cclxuICBpZiAoL15cXGR7Mn1bLi8tXVxcZHsyfVsuLy1dXFxkezR9JC8udGVzdChkYXRlUGFydCkpIHtcclxuICAgIGNvbnN0IHBhcnRzID0gZGF0ZVBhcnQuc3BsaXQoL1suLy1dLykubWFwKE51bWJlcik7XHJcbiAgICBjb25zdCBbZCwgbSwgeV0gPSBwYXJ0cztcclxuICAgIHJldHVybiBuZXcgRGF0ZSh5LCBtIC0gMSwgZCk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBwYXJzZWQgPSBuZXcgRGF0ZShyYXcpO1xyXG4gIHJldHVybiBOdW1iZXIuaXNOYU4ocGFyc2VkLmdldFRpbWUoKSkgPyBudWxsIDogcGFyc2VkO1xyXG59O1xyXG5cclxuY29uc3QgZm9ybWF0RGF0ZVBhcnRzID0gKHZhbHVlOiBzdHJpbmcsIGxvY2FsZTogc3RyaW5nKSA9PiB7XHJcbiAgaWYgKCF2YWx1ZSkgcmV0dXJuIHsgeWVhcjogXCJcIiwgbW9udGg6IFwiXCIsIGRheTogXCJcIiB9O1xyXG4gIGNvbnN0IGQgPSBwYXJzZURhdGVWYWx1ZSh2YWx1ZSk7XHJcbiAgaWYgKCFkKSByZXR1cm4geyB5ZWFyOiBcIlwiLCBtb250aDogXCJcIiwgZGF5OiBcIlwiIH07XHJcbiAgbGV0IG1vbnRoID0gXCJcIjtcclxuICBpZiAoaXNCYXNxdWVMb2NhbGUobG9jYWxlKSkge1xyXG4gICAgbW9udGggPSBCQVNRVUVfTU9OVEhTX1NIT1JUW2QuZ2V0TW9udGgoKV0gfHwgXCJcIjtcclxuICB9IGVsc2Uge1xyXG4gICAgbW9udGggPSBkLnRvTG9jYWxlRGF0ZVN0cmluZyhsb2NhbGUsIHsgbW9udGg6IFwic2hvcnRcIiB9KS5yZXBsYWNlKC9cXC4vZywgXCJcIik7XHJcbiAgfVxyXG4gIHJldHVybiB7XHJcbiAgICB5ZWFyOiBTdHJpbmcoZC5nZXRGdWxsWWVhcigpKSxcclxuICAgIG1vbnRoOiBtb250aC50b1VwcGVyQ2FzZSgpLFxyXG4gICAgZGF5OiBTdHJpbmcoZC5nZXREYXRlKCkpLnBhZFN0YXJ0KDIsIFwiMFwiKSxcclxuICB9O1xyXG59O1xyXG5cclxuY29uc3QgdG9UaXRsZUNhc2UgPSAodmFsdWU6IHN0cmluZywgbG9jYWxlOiBzdHJpbmcpID0+IHtcclxuICBpZiAoIXZhbHVlKSByZXR1cm4gXCJcIjtcclxuICBjb25zdCBsb3dlciA9IHZhbHVlLnRvTG9jYWxlTG93ZXJDYXNlKGxvY2FsZSk7XHJcbiAgdHJ5IHtcclxuICAgIHJldHVybiBsb3dlci5yZXBsYWNlKC8oXnxbXlxccHtMfV0pKFxccHtMfSkvZ3UsIChfbWF0Y2gsIHByZWZpeCwgY2gpID0+IGAke3ByZWZpeH0ke2NoLnRvTG9jYWxlVXBwZXJDYXNlKGxvY2FsZSl9YCk7XHJcbiAgfSBjYXRjaCB7XHJcbiAgICByZXR1cm4gbG93ZXIucmVwbGFjZSgvKF58W1xccy0vXSkoXFxTKS9nLCAoX21hdGNoLCBwcmVmaXgsIGNoKSA9PiBgJHtwcmVmaXh9JHtjaC50b0xvY2FsZVVwcGVyQ2FzZShsb2NhbGUpfWApO1xyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IHRvU2VudGVuY2VDYXNlID0gKHZhbHVlOiBzdHJpbmcsIGxvY2FsZTogc3RyaW5nKSA9PiB7XHJcbiAgaWYgKCF2YWx1ZSkgcmV0dXJuIFwiXCI7XHJcbiAgY29uc3QgdHJpbW1lZCA9IHZhbHVlLnRyaW0oKTtcclxuICBpZiAoIXRyaW1tZWQpIHJldHVybiB0cmltbWVkO1xyXG4gIGNvbnN0IGxvd2VyID0gdHJpbW1lZC50b0xvY2FsZUxvd2VyQ2FzZShsb2NhbGUpO1xyXG4gIHJldHVybiBsb3dlclswXS50b0xvY2FsZVVwcGVyQ2FzZShsb2NhbGUpICsgbG93ZXIuc2xpY2UoMSk7XHJcbn07XHJcblxyXG5jb25zdCBsb2dIaXN0b3J5ID0gKG1lc3NhZ2U6IHN0cmluZywgZGF0YT86IFJlY29yZDxzdHJpbmcsIHVua25vd24+KSA9PiB7XHJcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybjtcclxuICBjb25zdCBkZWJ1Z0ZsYWcgPSAod2luZG93IGFzIGFueSkuX19JTkRfREVCVUdfSElTVE9SWV9fO1xyXG4gIGlmIChkZWJ1Z0ZsYWcgIT09IHRydWUpIHJldHVybjtcclxuICBpZiAoZGF0YSkge1xyXG4gICAgY29uc29sZS5kZWJ1ZyhcIltIaXN0b3J5XVwiLCBtZXNzYWdlLCBkYXRhKTtcclxuICB9IGVsc2Uge1xyXG4gICAgY29uc29sZS5kZWJ1ZyhcIltIaXN0b3J5XVwiLCBtZXNzYWdlKTtcclxuICB9XHJcbn07XHJcblxyXG4vLyBIaXN0b3J5IHBhZ2Ugd2l0aCBSZWFjdCBzdGF0ZSArIGVmZmVjdHMgKG5vIGxlZ2FjeSBET00gbG9naWMpLlxyXG5leHBvcnQgY29uc3QgSGlzdG9yeVBhZ2UgPSAoeyBkZWZhdWx0RnJvbURhdGUgPSBcIlwiLCBkZWZhdWx0VG9EYXRlID0gXCJcIiB9OiBQcm9wcykgPT4ge1xyXG4gIGNvbnN0IGxvY2FsZSA9IHVzZU1lbW8oKCkgPT4gZ2V0VWlMb2NhbGUoKSwgW10pO1xyXG4gIGNvbnN0IGNhblZpZXdIaXN0b3J5ID0gY2FuQWNjZXNzKFwiVklTSVRBU19HRVNUSU9OXCIsIFwiVmlld1wiKTtcclxuICBjb25zdCBjYW5DcmVhdGVWaXNpdCA9IGNhbkFjY2VzcyhcIlZJU0lUQVNfR0VTVElPTlwiLCBcIkFkZFwiKTtcclxuICBjb25zdCBub0RhdGFUZXh0ID0gaW5kVChcIkNvbW1vbl9Ob0RhdGFcIiwgXCJObyBkYXRhXCIpO1xyXG5cclxuICBjb25zdCBhY3RpdmF0b3JSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBwb3BvdmVyUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XHJcblxyXG4gIGNvbnN0IHsgcmVhZENhY2hlZEZpbHRlciwgY2xlYXJGaWx0ZXJDYWNoZSwgY29uc3VtZVJldHVybkZsYWcsIHNhdmVDYWNoZWRGaWx0ZXIgfSA9IHVzZUhpc3RvcnlGaWx0ZXJDYWNoZSgpO1xyXG4gIGNvbnN0IHtcclxuICAgIHN0YXJ0RGF0ZSxcclxuICAgIGVuZERhdGUsXHJcbiAgICBob3ZlckRhdGUsXHJcbiAgICBzZWxlY3RpbmdTdGVwLFxyXG4gICAgY3VycmVudE1vbnRoLFxyXG4gICAgY3VycmVudFllYXIsXHJcbiAgICBpc09wZW4sXHJcbiAgICBzaG93TWFudWFsUGlja2VyUGFuZWwsXHJcbiAgICBhY3RpdmVRdWlja0ZpbHRlcixcclxuICAgIHNlbGVjdGVkQ2xpZW50LFxyXG4gICAgY2xpZW50UmVzZXRLZXksXHJcbiAgICBzaG93RmlsdGVycyxcclxuICAgIHNob3dNYW51YWxFcnJvcixcclxuICAgIGZyb21EYXRlVmFsdWUsXHJcbiAgICB0b0RhdGVWYWx1ZSxcclxuICAgIGFjY291bnROdW1WYWx1ZSxcclxuICAgIGhhc1Jlc3RvcmVkRmlsdGVyUmVmLFxyXG4gICAgZGlkSW5pdEZpbHRlclJlZixcclxuICAgIHNldEhvdmVyRGF0ZSxcclxuICAgIHNldFNlbGVjdGluZ1N0ZXAsXHJcbiAgICBzZXRDdXJyZW50TW9udGgsXHJcbiAgICBzZXRDdXJyZW50WWVhcixcclxuICAgIHNldElzT3BlbixcclxuICAgIHNldFNob3dGaWx0ZXJzLFxyXG4gICAgc2V0U2hvd01hbnVhbEVycm9yLFxyXG4gICAgdmFsaWRhdGVNYW51YWxSYW5nZSxcclxuICAgIGFwcGx5RGVmYXVsdFJhbmdlRnJvbVByb3BzLFxyXG4gICAgcmVzZXRIaXN0b3J5RmlsdGVycyxcclxuICAgIGFwcGx5Q2FjaGVkRmlsdGVyLFxyXG4gICAgaGFuZGxlU2VsZWN0LFxyXG4gICAgaGFuZGxlQ2xlYXJTdGF0ZSxcclxuICAgIG9wZW5Qb3BvdmVyLFxyXG4gICAgaGFuZGxlQWN0aXZhdG9yS2V5RG93bixcclxuICAgIGhhbmRsZVNlY3Rpb25LZXlEb3duLFxyXG4gICAgaGFuZGxlUXVpY2tGaWx0ZXIsXHJcbiAgICBoYW5kbGVDbGllbnRTZWxlY3RlZCxcclxuICB9ID0gdXNlSGlzdG9yeUZpbHRlcnNTdGF0ZSh7XHJcbiAgICBkZWZhdWx0RnJvbURhdGUsXHJcbiAgICBkZWZhdWx0VG9EYXRlLFxyXG4gICAgbG9nSGlzdG9yeSxcclxuICAgIHBhcnNlRGF0ZVZhbHVlLFxyXG4gICAgcGFyc2VJU08sXHJcbiAgICB0b0lTTyxcclxuICAgIHN0YXJ0T2ZEYXksXHJcbiAgICBpc0JlZm9yZSxcclxuICB9KTtcclxuXHJcbiAgY29uc3QgeyBpdGVtcywgdG90YWwsIGN1cnJlbnRQYWdlLCBpc0xvYWRpbmcsIGVycm9yTWVzc2FnZSwgbG9hZEFjdGl2aXRpZXMsIHJlc2V0QWN0aXZpdGllcywgcmV0cnlPbk5ldHdvcmtFcnJvclJlZiwgbGFzdFNpZ25hdHVyZVJlZiB9ID1cclxuICAgIHVzZUhpc3RvcnlBY3Rpdml0aWVzKHtcclxuICAgICAgZnJvbURhdGVWYWx1ZSxcclxuICAgICAgdG9EYXRlVmFsdWUsXHJcbiAgICAgIGFjY291bnROdW1WYWx1ZSxcclxuICAgICAgcGFnZVNpemU6IFBBR0VfU0laRSxcclxuICAgICAgbm9ybWFsaXplUmFuZ2UsXHJcbiAgICAgIG9uRm9yYmlkZGVuOiBzaG93UGVybWlzc2lvbk1vZGFsLFxyXG4gICAgICBvbkRlYnVnOiBsb2dIaXN0b3J5LFxyXG4gICAgfSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBsb2dIaXN0b3J5KFwiaW5pdFwiLCB7IGRlZmF1bHRGcm9tRGF0ZSwgZGVmYXVsdFRvRGF0ZSB9KTtcclxuICB9LCBbZGVmYXVsdEZyb21EYXRlLCBkZWZhdWx0VG9EYXRlXSk7XHJcblxyXG4gIGNvbnN0IGFwcGx5RmlsdGVycyA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKG9wdGlvbnM/OiB7IGNsb3NlUGFuZWw/OiBib29sZWFuOyBmb3JjZT86IGJvb2xlYW47IHBhZ2U/OiBudW1iZXIgfSkgPT4ge1xyXG4gICAgICBpZiAoIXZhbGlkYXRlTWFudWFsUmFuZ2UoKSkgcmV0dXJuO1xyXG4gICAgICBpZiAoIXN0YXJ0RGF0ZSB8fCAhZW5kRGF0ZSkgcmV0dXJuO1xyXG5cclxuICAgICAgY29uc3Qgbm9ybWFsaXplZCA9IG5vcm1hbGl6ZVJhbmdlKGZyb21EYXRlVmFsdWUsIHRvRGF0ZVZhbHVlKTtcclxuICAgICAgY29uc3QgcGFnZSA9IG9wdGlvbnM/LnBhZ2UgPz8gMTtcclxuICAgICAgY29uc3Qgc2lnbmF0dXJlID0gYCR7bm9ybWFsaXplZC5mcm9tfXwke25vcm1hbGl6ZWQudG99fCR7YWNjb3VudE51bVZhbHVlfXwke3BhZ2V9YDtcclxuXHJcbiAgICAgIGlmIChvcHRpb25zPy5mb3JjZSB8fCBsYXN0U2lnbmF0dXJlUmVmLmN1cnJlbnQgIT09IHNpZ25hdHVyZSkge1xyXG4gICAgICAgIGxvYWRBY3Rpdml0aWVzKHBhZ2UsIHsgZnJvbURhdGU6IG5vcm1hbGl6ZWQuZnJvbSwgdG9EYXRlOiBub3JtYWxpemVkLnRvLCBhY2NvdW50TnVtOiBhY2NvdW50TnVtVmFsdWUgfSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNldFNob3dNYW51YWxFcnJvcihmYWxzZSk7XHJcbiAgICAgIGlmIChvcHRpb25zPy5jbG9zZVBhbmVsKSB7XHJcbiAgICAgICAgc2V0SXNPcGVuKGZhbHNlKTtcclxuICAgICAgICBzZXRTaG93RmlsdGVycyhmYWxzZSk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBbYWNjb3VudE51bVZhbHVlLCBlbmREYXRlLCBmcm9tRGF0ZVZhbHVlLCBsb2FkQWN0aXZpdGllcywgc3RhcnREYXRlLCB0b0RhdGVWYWx1ZSwgdmFsaWRhdGVNYW51YWxSYW5nZV1cclxuICApO1xyXG5cclxuICBjb25zdCB0b3RhbFBhZ2VzID0gTWF0aC5jZWlsKCh0b3RhbCB8fCAwKSAvIFBBR0VfU0laRSk7XHJcblxyXG4gIHVzZUhpc3RvcnlQYWdlTGlzdGVuZXJzKHtcclxuICAgIGlzT3BlbixcclxuICAgIGFjdGl2YXRvclJlZixcclxuICAgIHBvcG92ZXJSZWYsXHJcbiAgICBoYXNSZXN0b3JlZEZpbHRlclJlZixcclxuICAgIHJldHJ5T25OZXR3b3JrRXJyb3JSZWYsXHJcbiAgICBjdXJyZW50UGFnZSxcclxuICAgIGxvZ0hpc3RvcnksXHJcbiAgICBjb25zdW1lUmV0dXJuRmxhZyxcclxuICAgIHJlYWRDYWNoZWRGaWx0ZXIsXHJcbiAgICBhcHBseUNhY2hlZEZpbHRlcixcclxuICAgIGxvYWRBY3Rpdml0aWVzLFxyXG4gICAgc2V0SXNPcGVuLFxyXG4gICAgc2V0SG92ZXJEYXRlLFxyXG4gICAgc2V0U2hvd0ZpbHRlcnMsXHJcbiAgICBhcHBseUZpbHRlcnMsXHJcbiAgfSk7XHJcblxyXG4gIC8vIFJlc3RvcmUgY2FjaGVkIGZpbHRlciBvbiBpbml0aWFsIG1vdW50IG9ubHkuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmIChkaWRJbml0RmlsdGVyUmVmLmN1cnJlbnQpIHJldHVybjtcclxuICAgIGRpZEluaXRGaWx0ZXJSZWYuY3VycmVudCA9IHRydWU7XHJcbiAgICBjb25zdCBjYWNoZWQgPSBjb25zdW1lUmV0dXJuRmxhZygpID8gcmVhZENhY2hlZEZpbHRlcigpIDogbnVsbDtcclxuICAgIGlmIChjYWNoZWQgJiYgY2FjaGVkLmZyb21EYXRlICYmIGNhY2hlZC50b0RhdGUpIHtcclxuICAgICAgbG9nSGlzdG9yeShcInJlc3RvcmVGaWx0ZXJcIiwgY2FjaGVkKTtcclxuICAgICAgY29uc3QgY2FjaGVkUmVxdWVzdCA9IGFwcGx5Q2FjaGVkRmlsdGVyKGNhY2hlZCk7XHJcbiAgICAgIGlmIChjYWNoZWRSZXF1ZXN0KSB7XHJcbiAgICAgICAgcmV0cnlPbk5ldHdvcmtFcnJvclJlZi5jdXJyZW50ID0gdHJ1ZTtcclxuICAgICAgICBsb2FkQWN0aXZpdGllcyhjYWNoZWRSZXF1ZXN0LnBhZ2UsIGNhY2hlZFJlcXVlc3Qub3ZlcnJpZGUpO1xyXG4gICAgICAgIHNldFNob3dGaWx0ZXJzKGZhbHNlKTtcclxuICAgICAgICBzZXRJc09wZW4oZmFsc2UpO1xyXG4gICAgICAgIGhhc1Jlc3RvcmVkRmlsdGVyUmVmLmN1cnJlbnQgPSB0cnVlO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGRlZmF1bHRSZXF1ZXN0ID0gYXBwbHlEZWZhdWx0UmFuZ2VGcm9tUHJvcHMoKTtcclxuICAgIGlmIChkZWZhdWx0UmVxdWVzdCkge1xyXG4gICAgICByZXRyeU9uTmV0d29ya0Vycm9yUmVmLmN1cnJlbnQgPSB0cnVlO1xyXG4gICAgICBsb2FkQWN0aXZpdGllcyhkZWZhdWx0UmVxdWVzdC5wYWdlLCBkZWZhdWx0UmVxdWVzdC5vdmVycmlkZSk7XHJcbiAgICAgIHNldFNob3dGaWx0ZXJzKGZhbHNlKTtcclxuICAgICAgc2V0SXNPcGVuKGZhbHNlKTtcclxuICAgICAgaGFzUmVzdG9yZWRGaWx0ZXJSZWYuY3VycmVudCA9IHRydWU7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICByZXNldEhpc3RvcnlGaWx0ZXJzKCk7XHJcbiAgICBjbGVhckZpbHRlckNhY2hlKCk7XHJcbiAgICByZXNldEFjdGl2aXRpZXMoKTtcclxuICAgIHNldFNob3dGaWx0ZXJzKHRydWUpO1xyXG4gICAgc2V0SXNPcGVuKGZhbHNlKTtcclxuICB9LCBbXHJcbiAgICBhcHBseUNhY2hlZEZpbHRlcixcclxuICAgIGFwcGx5RGVmYXVsdFJhbmdlRnJvbVByb3BzLFxyXG4gICAgY2xlYXJGaWx0ZXJDYWNoZSxcclxuICAgIGNvbnN1bWVSZXR1cm5GbGFnLFxyXG4gICAgZGlkSW5pdEZpbHRlclJlZixcclxuICAgIGhhc1Jlc3RvcmVkRmlsdGVyUmVmLFxyXG4gICAgbG9hZEFjdGl2aXRpZXMsXHJcbiAgICByZWFkQ2FjaGVkRmlsdGVyLFxyXG4gICAgcmVzZXRBY3Rpdml0aWVzLFxyXG4gICAgcmVzZXRIaXN0b3J5RmlsdGVycyxcclxuICAgIHJldHJ5T25OZXR3b3JrRXJyb3JSZWYsXHJcbiAgXSk7XHJcblxyXG4gIC8vIEtlZXAgdGhlIHBpY2tlciBzdGVwIGluIHN5bmMgd2l0aCBjdXJyZW50IHNlbGVjdGlvbi5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKHN0YXJ0RGF0ZSAmJiAhZW5kRGF0ZSAmJiBzZWxlY3RpbmdTdGVwID09PSBcInN0YXJ0XCIpIHtcclxuICAgICAgc2V0U2VsZWN0aW5nU3RlcChcImVuZFwiKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKCFzdGFydERhdGUgJiYgc2VsZWN0aW5nU3RlcCAhPT0gXCJzdGFydFwiKSB7XHJcbiAgICAgIHNldFNlbGVjdGluZ1N0ZXAoXCJzdGFydFwiKTtcclxuICAgIH1cclxuICB9LCBbc3RhcnREYXRlLCBlbmREYXRlLCBzZWxlY3RpbmdTdGVwXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUNsZWFyID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoZXZlbnQ6IFJlYWN0Lk1vdXNlRXZlbnQpID0+IHtcclxuICAgICAgaGFuZGxlQ2xlYXJTdGF0ZShldmVudCk7XHJcbiAgICAgIGNsZWFyRmlsdGVyQ2FjaGUoKTtcclxuICAgICAgcmVzZXRBY3Rpdml0aWVzKCk7XHJcbiAgICB9LFxyXG4gICAgW2NsZWFyRmlsdGVyQ2FjaGUsIGhhbmRsZUNsZWFyU3RhdGUsIHJlc2V0QWN0aXZpdGllc11cclxuICApO1xyXG5cclxuICBjb25zdCBoYW5kbGVSZXNldEZpbHRlcnMgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICByZXNldEhpc3RvcnlGaWx0ZXJzKCk7XHJcbiAgICBjbGVhckZpbHRlckNhY2hlKCk7XHJcbiAgICByZXNldEFjdGl2aXRpZXMoKTtcclxuICAgIHNldElzT3BlbihmYWxzZSk7XHJcbiAgICBzZXRTaG93RmlsdGVycyh0cnVlKTtcclxuICB9LCBbY2xlYXJGaWx0ZXJDYWNoZSwgcmVzZXRBY3Rpdml0aWVzLCByZXNldEhpc3RvcnlGaWx0ZXJzLCBzZXRJc09wZW4sIHNldFNob3dGaWx0ZXJzXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZU5hdmlnYXRlID0gdXNlQ2FsbGJhY2soXHJcbiAgICAobGlua0lkOiBzdHJpbmcpID0+IHtcclxuICAgICAgaWYgKCFjYW5WaWV3SGlzdG9yeSkge1xyXG4gICAgICAgIHNob3dQZXJtaXNzaW9uTW9kYWwoKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgc2F2ZUNhY2hlZEZpbHRlcih7XHJcbiAgICAgICAgICBmcm9tRGF0ZTogZnJvbURhdGVWYWx1ZSB8fCBcIlwiLFxyXG4gICAgICAgICAgdG9EYXRlOiB0b0RhdGVWYWx1ZSB8fCBcIlwiLFxyXG4gICAgICAgICAgcGFnZTogY3VycmVudFBhZ2UsXHJcbiAgICAgICAgICBjbGllbnRBY2NvdW50OiBzZWxlY3RlZENsaWVudD8udmFsdWUgfHwgXCJcIixcclxuICAgICAgICAgIGNsaWVudFRleHQ6IHNlbGVjdGVkQ2xpZW50Py50ZXh0IHx8IFwiXCIsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZW5jb2RlVVJJQ29tcG9uZW50KGxpbmtJZCk7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBgL1Zpc2l0YXMvRGV0YWxsZS8ke3RhcmdldH1gO1xyXG4gICAgICB9LCBOQVZfREVMQVlfTVMpO1xyXG4gICAgfSxcclxuICAgIFtjYW5WaWV3SGlzdG9yeSwgY3VycmVudFBhZ2UsIGZyb21EYXRlVmFsdWUsIHNhdmVDYWNoZWRGaWx0ZXIsIHRvRGF0ZVZhbHVlLCBzZWxlY3RlZENsaWVudF1cclxuICApO1xyXG5cclxuICBjb25zdCBjYWxlbmRhciA9IHVzZU1lbW8oKCkgPT4ge1xyXG4gICAgY29uc3QgZmlyc3REYXkgPSBuZXcgRGF0ZShjdXJyZW50WWVhciwgY3VycmVudE1vbnRoLCAxKTtcclxuICAgIGNvbnN0IGRheXNJbk1vbnRoID0gbmV3IERhdGUoY3VycmVudFllYXIsIGN1cnJlbnRNb250aCArIDEsIDApLmdldERhdGUoKTtcclxuICAgIGNvbnN0IG9mZnNldCA9IChmaXJzdERheS5nZXREYXkoKSArIDYpICUgNztcclxuICAgIGNvbnN0IGNlbGxzOiBDYWxlbmRhckNlbGxbXSA9IFtdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvZmZzZXQ7IGkrKykge1xyXG4gICAgICBjZWxscy5wdXNoKHsgZGF0ZTogbnVsbCwgaXNvOiBcIlwiLCBpc0VtcHR5OiB0cnVlIH0pO1xyXG4gICAgfVxyXG4gICAgZm9yIChsZXQgZCA9IDE7IGQgPD0gZGF5c0luTW9udGg7IGQrKykge1xyXG4gICAgICBjb25zdCBkYXRlT2JqID0gbmV3IERhdGUoY3VycmVudFllYXIsIGN1cnJlbnRNb250aCwgZCk7XHJcbiAgICAgIGNlbGxzLnB1c2goeyBkYXRlOiBkYXRlT2JqLCBpc286IHRvSVNPKGRhdGVPYmopLCBpc0VtcHR5OiBmYWxzZSB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiB7XHJcbiAgICAgIGNlbGxzLFxyXG4gICAgICBsYWJlbDogZm9ybWF0TW9udGhMYWJlbChmaXJzdERheSwgbG9jYWxlKSxcclxuICAgIH07XHJcbiAgfSwgW2N1cnJlbnRNb250aCwgY3VycmVudFllYXIsIGxvY2FsZV0pO1xyXG5cclxuICBjb25zdCBwcmV2aWV3RW5kID0gZW5kRGF0ZSB8fCAoc2VsZWN0aW5nU3RlcCA9PT0gXCJlbmRcIiA/IGhvdmVyRGF0ZSA6IG51bGwpO1xyXG5cclxuICBjb25zdCBoYW5kbGVQcmV2TW9udGggPSB1c2VDYWxsYmFjayhcclxuICAgIChldmVudDogUmVhY3QuTW91c2VFdmVudDxIVE1MQnV0dG9uRWxlbWVudD4pID0+IHtcclxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIHNldEN1cnJlbnRNb250aCgocHJldikgPT4ge1xyXG4gICAgICAgIGNvbnN0IG5leHQgPSBwcmV2IC0gMTtcclxuICAgICAgICBpZiAobmV4dCA8IDApIHtcclxuICAgICAgICAgIHNldEN1cnJlbnRZZWFyKCh5ZWFyKSA9PiB5ZWFyIC0gMSk7XHJcbiAgICAgICAgICByZXR1cm4gMTE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXh0O1xyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBbc2V0Q3VycmVudE1vbnRoLCBzZXRDdXJyZW50WWVhcl1cclxuICApO1xyXG5cclxuICBjb25zdCBoYW5kbGVOZXh0TW9udGggPSB1c2VDYWxsYmFjayhcclxuICAgIChldmVudDogUmVhY3QuTW91c2VFdmVudDxIVE1MQnV0dG9uRWxlbWVudD4pID0+IHtcclxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIHNldEN1cnJlbnRNb250aCgocHJldikgPT4ge1xyXG4gICAgICAgIGNvbnN0IG5leHQgPSBwcmV2ICsgMTtcclxuICAgICAgICBpZiAobmV4dCA+IDExKSB7XHJcbiAgICAgICAgICBzZXRDdXJyZW50WWVhcigoeWVhcikgPT4geWVhciArIDEpO1xyXG4gICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXh0O1xyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBbc2V0Q3VycmVudE1vbnRoLCBzZXRDdXJyZW50WWVhcl1cclxuICApO1xyXG5cclxuICBjb25zdCBoYW5kbGVHcmlkTW91c2VMZWF2ZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIHNldEhvdmVyRGF0ZShudWxsKTtcclxuICB9LCBbc2V0SG92ZXJEYXRlXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZU1hbnVhbERheUNsaWNrID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoY2VsbDogSGlzdG9yeU1hbnVhbERheUNlbGwpID0+IHtcclxuICAgICAgaWYgKCFjZWxsLmRhdGUpIHJldHVybjtcclxuICAgICAgbG9nSGlzdG9yeShcImRheUNsaWNrXCIsIHsgZGF0ZTogY2VsbC5pc28gfHwgXCJcIiwgZGlzYWJsZWQ6ICEhY2VsbC5kaXNhYmxlZCB9KTtcclxuICAgICAgaGFuZGxlU2VsZWN0KGNlbGwuZGF0ZSk7XHJcbiAgICB9LFxyXG4gICAgW2hhbmRsZVNlbGVjdF1cclxuICApO1xyXG5cclxuICBjb25zdCBoYW5kbGVNYW51YWxEYXlIb3ZlciA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKGNlbGw6IEhpc3RvcnlNYW51YWxEYXlDZWxsKSA9PiB7XHJcbiAgICAgIGlmICghY2VsbC5kYXRlKSByZXR1cm47XHJcbiAgICAgIGlmIChzZWxlY3RpbmdTdGVwID09PSBcImVuZFwiICYmIHN0YXJ0RGF0ZSkge1xyXG4gICAgICAgIHNldEhvdmVyRGF0ZShuZXcgRGF0ZShjZWxsLmRhdGUpKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFtzZWxlY3RpbmdTdGVwLCBzZXRIb3ZlckRhdGUsIHN0YXJ0RGF0ZV1cclxuICApO1xyXG5cclxuICBjb25zdCBtYW51YWxEYXlDZWxscyA9IHVzZU1lbW88SGlzdG9yeU1hbnVhbERheUNlbGxbXT4oKCkgPT4ge1xyXG4gICAgcmV0dXJuIGNhbGVuZGFyLmNlbGxzLm1hcCgoY2VsbCwgaWR4KSA9PiB7XHJcbiAgICAgIGlmIChjZWxsLmlzRW1wdHkpIHtcclxuICAgICAgICByZXR1cm4geyBrZXk6IGBlbXB0eS0ke2lkeH1gLCBpc0VtcHR5OiB0cnVlIH07XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGRhdGVPYmogPSBjZWxsLmRhdGUgYXMgRGF0ZTtcclxuICAgICAgY29uc3QgaXNTdGFydCA9IHNhbWVEYXkoZGF0ZU9iaiwgc3RhcnREYXRlKTtcclxuICAgICAgY29uc3QgaXNFbmQgPSBzYW1lRGF5KGRhdGVPYmosIGVuZERhdGUpO1xyXG4gICAgICBjb25zdCBpblJhbmdlID0gc3RhcnREYXRlICYmIHByZXZpZXdFbmQgJiYgaXNCZWZvcmUoc3RhcnREYXRlLCBkYXRlT2JqKSAmJiBpc0JlZm9yZShkYXRlT2JqLCBwcmV2aWV3RW5kKTtcclxuICAgICAgY29uc3QgaG92ZXJSYW5nZSA9IHN0YXJ0RGF0ZSAmJiAhZW5kRGF0ZSAmJiBob3ZlckRhdGUgJiYgaXNCZWZvcmUoc3RhcnREYXRlLCBkYXRlT2JqKSAmJiBpc0JlZm9yZShkYXRlT2JqLCBob3ZlckRhdGUpO1xyXG4gICAgICBjb25zdCBkaXNhYmxlZCA9IHNlbGVjdGluZ1N0ZXAgPT09IFwiZW5kXCIgJiYgISFzdGFydERhdGUgJiYgaXNCZWZvcmUoZGF0ZU9iaiwgc3RhcnREYXRlKTtcclxuICAgICAgY29uc3QgaXNUb2RheSA9IHNhbWVEYXkoZGF0ZU9iaiwgbmV3IERhdGUoKSk7XHJcblxyXG4gICAgICBjb25zdCBkYXlDbGFzcyA9IGNsYXNzTmFtZXMoXHJcbiAgICAgICAgXCJkcnAtZGF5XCIsXHJcbiAgICAgICAgaXNTdGFydCA/IFwic3RhcnQgcmFuZ2Utc3RhcnRcIiA6IFwiXCIsXHJcbiAgICAgICAgaXNFbmQgPyBcImVuZCByYW5nZS1lbmRcIiA6IFwiXCIsXHJcbiAgICAgICAgaW5SYW5nZSA/IFwiaW4tcmFuZ2VcIiA6IFwiXCIsXHJcbiAgICAgICAgaG92ZXJSYW5nZSA/IFwiaG92ZXItcmFuZ2VcIiA6IFwiXCIsXHJcbiAgICAgICAgZGlzYWJsZWQgPyBcImRpc2FibGVkXCIgOiBcIlwiLFxyXG4gICAgICAgIGlzVG9kYXkgPyBcInRvZGF5XCIgOiBcIlwiXHJcbiAgICAgICk7XHJcblxyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIGtleTogY2VsbC5pc28sXHJcbiAgICAgICAgaXNFbXB0eTogZmFsc2UsXHJcbiAgICAgICAgZGF0ZTogZGF0ZU9iaixcclxuICAgICAgICBpc286IGNlbGwuaXNvLFxyXG4gICAgICAgIGRheUxhYmVsOiBkYXRlT2JqLmdldERhdGUoKSxcclxuICAgICAgICBkYXlDbGFzcyxcclxuICAgICAgICBkaXNhYmxlZCxcclxuICAgICAgfTtcclxuICAgIH0pO1xyXG4gIH0sIFtjYWxlbmRhci5jZWxscywgZW5kRGF0ZSwgaG92ZXJEYXRlLCBwcmV2aWV3RW5kLCBzZWxlY3RpbmdTdGVwLCBzdGFydERhdGVdKTtcclxuXHJcbiAgY29uc3QgeyB0aW1lbGluZUl0ZW1zIH0gPSB1c2VIaXN0b3J5VGltZWxpbmVJdGVtcyh7XHJcbiAgICBpdGVtcyxcclxuICAgIGxvY2FsZSxcclxuICAgIG5vRGF0YVRleHQsXHJcbiAgICBsb2dIaXN0b3J5LFxyXG4gICAgdG9UaXRsZUNhc2UsXHJcbiAgICBmb3JtYXREYXRlUGFydHMsXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IGxhYmVsRnJvbSA9IHRvU2VudGVuY2VDYXNlKGluZFQoXCJIaXN0b3J5X0Zyb21cIiwgXCJGcm9tXCIpLCBsb2NhbGUpO1xyXG4gIGNvbnN0IGxhYmVsVG8gPSB0b1NlbnRlbmNlQ2FzZShpbmRUKFwiSGlzdG9yeV9Ub1wiLCBcIlRvXCIpLCBsb2NhbGUpO1xyXG4gIGNvbnN0IHN1bW1hcnlGcm9tID0gbGFiZWxGcm9tO1xyXG4gIGNvbnN0IHN1bW1hcnlUbyA9IGxhYmVsVG87XHJcbiAgY29uc3QgZmlsdGVyVGl0bGUgPSBpbmRUKFwiSGlzdG9yeV9GaWx0ZXJfRGF0ZVwiLCBcIkRhdGVcIik7XHJcbiAgY29uc3QgYWRkRGF0ZUxhYmVsID0gaW5kVChcIkhpc3RvcnlfQWRkRGF0ZVwiLCBcIkFkZCBkYXRlXCIpO1xyXG4gIGNvbnN0IGNsZWFyUmFuZ2VMYWJlbCA9IGluZFQoXCJIaXN0b3J5X0NsZWFyUmFuZ2VcIiwgXCJDbGVhciByYW5nZVwiKTtcclxuICBjb25zdCBwcmV2TW9udGhMYWJlbCA9IGluZFQoXCJIaXN0b3J5X1ByZXZNb250aFwiLCBcIlByZXZpb3VzIG1vbnRoXCIpO1xyXG4gIGNvbnN0IG5leHRNb250aExhYmVsID0gaW5kVChcIkhpc3RvcnlfTmV4dE1vbnRoXCIsIFwiTmV4dCBtb250aFwiKTtcclxuICBjb25zdCBzdGF0dXNTZWxlY3RTdGFydExhYmVsID0gaW5kVChcIkhpc3RvcnlfU3RhdHVzX1NlbGVjdFN0YXJ0XCIsIFwiU2VsZWN0IHN0YXJ0IGRhdGVcIik7XHJcbiAgY29uc3Qgc3RhdHVzU2VsZWN0RW5kTGFiZWwgPSBpbmRUKFwiSGlzdG9yeV9TdGF0dXNfU2VsZWN0RW5kXCIsIFwiU2VsZWN0IGVuZCBkYXRlXCIpO1xyXG4gIGNvbnN0IHdlZWtEYXlMYWJlbHMgPSB1c2VNZW1vKFxyXG4gICAgKCkgPT4gW1xyXG4gICAgICBpbmRUKFwiSGlzdG9yeV9EYXlfTW9uXCIsIFwiTW9uXCIpLFxyXG4gICAgICBpbmRUKFwiSGlzdG9yeV9EYXlfVHVlXCIsIFwiVHVlXCIpLFxyXG4gICAgICBpbmRUKFwiSGlzdG9yeV9EYXlfV2VkXCIsIFwiV2VkXCIpLFxyXG4gICAgICBpbmRUKFwiSGlzdG9yeV9EYXlfVGh1XCIsIFwiVGh1XCIpLFxyXG4gICAgICBpbmRUKFwiSGlzdG9yeV9EYXlfRnJpXCIsIFwiRnJpXCIpLFxyXG4gICAgICBpbmRUKFwiSGlzdG9yeV9EYXlfU2F0XCIsIFwiU2F0XCIpLFxyXG4gICAgICBpbmRUKFwiSGlzdG9yeV9EYXlfU3VuXCIsIFwiU3VuXCIpLFxyXG4gICAgXSxcclxuICAgIFtdXHJcbiAgKTtcclxuICBjb25zdCBjbGVhckxhYmVsID0gaW5kVChcIkhpc3RvcnlfRmlsdGVyX0NsZWFyXCIsIFwiQ2xlYXJcIik7XHJcbiAgY29uc3QgYXBwbHlMYWJlbCA9IGluZFQoXCJIaXN0b3J5X0ZpbHRlcl9BcHBseVwiLCBcIkFwcGx5XCIpO1xyXG4gIGNvbnN0IGNsaWVudExhYmVsID0gaW5kVChcIkhpc3RvcnlfRmlsdGVyX0NsaWVudFwiLCBcIkFjY291bnRcIik7XHJcbiAgY29uc3QgcXVpY2tDdXN0b21MYWJlbCA9IGluZFQoXCJIaXN0b3J5X1F1aWNrX0N1c3RvbVwiLCBcIkRhdGVcIik7XHJcbiAgY29uc3QgcXVpY2s3RGF5c0xhYmVsID0gaW5kVChcIkhpc3RvcnlfUXVpY2tfN0RheXNcIiwgXCI3IGRheXNcIik7XHJcbiAgY29uc3QgcXVpY2szMERheXNMYWJlbCA9IGluZFQoXCJIaXN0b3J5X1F1aWNrXzMwRGF5c1wiLCBcIjMwIGRheXNcIik7XHJcbiAgY29uc3QgcXVpY2s5MERheXNMYWJlbCA9IGluZFQoXCJIaXN0b3J5X1F1aWNrXzkwRGF5c1wiLCBcIjkwIGRheXNcIik7XHJcbiAgY29uc3QgcGFnZUZpcnN0TGFiZWwgPSBpbmRUKFwiSGlzdG9yeV9QYWdlX0ZpcnN0XCIsIFwiRmlyc3RcIik7XHJcbiAgY29uc3QgcGFnZVByZXZMYWJlbCA9IGluZFQoXCJIaXN0b3J5X1BhZ2VfUHJldlwiLCBcIlByZXZpb3VzXCIpO1xyXG4gIGNvbnN0IHBhZ2VOZXh0TGFiZWwgPSBpbmRUKFwiSGlzdG9yeV9QYWdlX05leHRcIiwgXCJOZXh0XCIpO1xyXG4gIGNvbnN0IHBhZ2VMYXN0TGFiZWwgPSBpbmRUKFwiSGlzdG9yeV9QYWdlX0xhc3RcIiwgXCJMYXN0XCIpO1xyXG4gIGNvbnN0IHF1aWNrRmlsdGVycyA9IHVzZU1lbW8oXHJcbiAgICAoKSA9PiBbXHJcbiAgICAgIHsgaWQ6IFwiY3VzdG9tXCIgYXMgY29uc3QsIGxhYmVsOiBxdWlja0N1c3RvbUxhYmVsIH0sXHJcbiAgICAgIHsgaWQ6IFwiZGF5cy03XCIgYXMgY29uc3QsIGxhYmVsOiBxdWljazdEYXlzTGFiZWwgfSxcclxuICAgICAgeyBpZDogXCJkYXlzLTMwXCIgYXMgY29uc3QsIGxhYmVsOiBxdWljazMwRGF5c0xhYmVsIH0sXHJcbiAgICAgIHsgaWQ6IFwiZGF5cy05MFwiIGFzIGNvbnN0LCBsYWJlbDogcXVpY2s5MERheXNMYWJlbCB9LFxyXG4gICAgXSxcclxuICAgIFtxdWljazMwRGF5c0xhYmVsLCBxdWljazdEYXlzTGFiZWwsIHF1aWNrOTBEYXlzTGFiZWwsIHF1aWNrQ3VzdG9tTGFiZWxdXHJcbiAgKTtcclxuICBjb25zdCBwYWdpbmF0aW9uTGFiZWxzID0gdXNlTWVtbyhcclxuICAgICgpID0+ICh7XHJcbiAgICAgIGZpcnN0OiBwYWdlRmlyc3RMYWJlbCxcclxuICAgICAgcHJldjogcGFnZVByZXZMYWJlbCxcclxuICAgICAgbmV4dDogcGFnZU5leHRMYWJlbCxcclxuICAgICAgbGFzdDogcGFnZUxhc3RMYWJlbCxcclxuICAgIH0pLFxyXG4gICAgW3BhZ2VGaXJzdExhYmVsLCBwYWdlTGFzdExhYmVsLCBwYWdlTmV4dExhYmVsLCBwYWdlUHJldkxhYmVsXVxyXG4gICk7XHJcbiAgY29uc3Qgc2hvd0ZpbHRlckFjdGlvbnMgPSBzaG93RmlsdGVycztcclxuICBjb25zdCBzaG93U3VtbWFyeSA9ICFzaG93RmlsdGVycyAmJiAhIXN0YXJ0RGF0ZSAmJiAhIWVuZERhdGU7XHJcbiAgY29uc3Qgc2hvd1Jlc3VsdHMgPSAhc2hvd0ZpbHRlcnM7XHJcbiAgY29uc3Qgc2hvd01hbnVhbFBpY2tlciA9IGFjdGl2ZVF1aWNrRmlsdGVyID09PSBcImN1c3RvbVwiICYmIHNob3dNYW51YWxQaWNrZXJQYW5lbDtcclxuICBjb25zdCBzaG93SW5saW5lU3VtbWFyeSA9ICEhc3RhcnREYXRlICYmICEhZW5kRGF0ZSAmJiAhc2hvd01hbnVhbFBpY2tlcjtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwibWF4LXctM3hsIG14LWF1dG8gcHgtMSBzbTpweC0yIHB0LTMgcGItNCBzcGFjZS15LTJcIj5cclxuICAgICAge3Nob3dTdW1tYXJ5ICYmIChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpbHRlci1jYXJkIGZpbHRlci1jYXJkLS1zdW1tYXJ5IHAtMyBzbTpwLTQgbXQtMSBtYi0zXCI+XHJcbiAgICAgICAgICA8SGlzdG9yeVN1bW1hcnlcclxuICAgICAgICAgICAgc3VtbWFyeUZyb21MYWJlbD17c3VtbWFyeUZyb219XHJcbiAgICAgICAgICAgIHN1bW1hcnlUb0xhYmVsPXtzdW1tYXJ5VG99XHJcbiAgICAgICAgICAgIGZyb21WYWx1ZT17c3RhcnREYXRlID8gZm9ybWF0RGlzcGxheShzdGFydERhdGUsIGxvY2FsZSkgOiBcIi0tXCJ9XHJcbiAgICAgICAgICAgIHRvVmFsdWU9e2VuZERhdGUgPyBmb3JtYXREaXNwbGF5KGVuZERhdGUsIGxvY2FsZSkgOiBcIi0tXCJ9XHJcbiAgICAgICAgICAgIGNsaWVudExhYmVsPXtjbGllbnRMYWJlbH1cclxuICAgICAgICAgICAgY2xpZW50VmFsdWU9e3NlbGVjdGVkQ2xpZW50Py50ZXh0IHx8IFwiXCJ9XHJcbiAgICAgICAgICAgIHNob3dDbGllbnQ9eyEhc2VsZWN0ZWRDbGllbnR9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApfVxyXG4gICAgICB7c2hvd0ZpbHRlcnMgJiYgKFxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpbHRlci1jYXJkIGZpbHRlci1jYXJkLS1leHBhbmRlZCBwLTIgc206cC0yLjUgcmVsYXRpdmVcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdhcC15LTEuNSBoaXN0b3J5LWZpbHRlci1zdGFjayBmbGV4IGZsZXgtY29sXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIGdhcC0yIGhpc3RvcnktcXVpY2stZmlsdGVyc1wiIGFyaWEtbGFiZWw9e2ZpbHRlclRpdGxlfT5cclxuICAgICAgICAgICAge3F1aWNrRmlsdGVycy5tYXAoKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICBjb25zdCBpc0FjdGl2ZSA9IGFjdGl2ZVF1aWNrRmlsdGVyID09PSBpdGVtLmlkO1xyXG4gICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8RmlsdGVyQnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgIGtleT17aXRlbS5pZH1cclxuICAgICAgICAgICAgICAgICAgbGFiZWw9e2l0ZW0ubGFiZWx9XHJcbiAgICAgICAgICAgICAgICAgIGFjdGl2ZT17aXNBY3RpdmV9XHJcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbFwiXHJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZVF1aWNrRmlsdGVyKGl0ZW0uaWQpfVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9KX1cclxuICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgIHtzaG93SW5saW5lU3VtbWFyeSAmJiAoXHJcbiAgICAgICAgICAgIDxIaXN0b3J5U3VtbWFyeVxyXG4gICAgICAgICAgICAgIHN1bW1hcnlGcm9tTGFiZWw9e3N1bW1hcnlGcm9tfVxyXG4gICAgICAgICAgICAgIHN1bW1hcnlUb0xhYmVsPXtzdW1tYXJ5VG99XHJcbiAgICAgICAgICAgICAgZnJvbVZhbHVlPXtzdGFydERhdGUgPyBmb3JtYXREaXNwbGF5KHN0YXJ0RGF0ZSwgbG9jYWxlKSA6IFwiLS1cIn1cclxuICAgICAgICAgICAgICB0b1ZhbHVlPXtlbmREYXRlID8gZm9ybWF0RGlzcGxheShlbmREYXRlLCBsb2NhbGUpIDogXCItLVwifVxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImdhcC15LTEgdGV4dC1bMTFweF0gcHgtMVwiXHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICApfVxyXG5cclxuICAgICAgICAgIHtzaG93TWFudWFsUGlja2VyICYmIChcclxuICAgICAgICAgICAgPEhpc3RvcnlNYW51YWxEYXRlUGlja2VyXHJcbiAgICAgICAgICAgICAgYWN0aXZhdG9yUmVmPXthY3RpdmF0b3JSZWZ9XHJcbiAgICAgICAgICAgICAgcG9wb3ZlclJlZj17cG9wb3ZlclJlZn1cclxuICAgICAgICAgICAgICBzaG93TWFudWFsRXJyb3I9e3Nob3dNYW51YWxFcnJvcn1cclxuICAgICAgICAgICAgICBzaG93U3RhcnRFcnJvcj17c2hvd01hbnVhbEVycm9yICYmICFzdGFydERhdGV9XHJcbiAgICAgICAgICAgICAgc2hvd0VuZEVycm9yPXtzaG93TWFudWFsRXJyb3IgJiYgIWVuZERhdGV9XHJcbiAgICAgICAgICAgICAgZmlsdGVyVGl0bGU9e2ZpbHRlclRpdGxlfVxyXG4gICAgICAgICAgICAgIGlzT3Blbj17aXNPcGVufVxyXG4gICAgICAgICAgICAgIHNlbGVjdGluZ1N0ZXA9e3NlbGVjdGluZ1N0ZXB9XHJcbiAgICAgICAgICAgICAgbGFiZWxGcm9tPXtsYWJlbEZyb219XHJcbiAgICAgICAgICAgICAgbGFiZWxUbz17bGFiZWxUb31cclxuICAgICAgICAgICAgICBzdGFydERhdGVUZXh0PXtzdGFydERhdGUgPyBmb3JtYXREaXNwbGF5KHN0YXJ0RGF0ZSwgbG9jYWxlKSA6IGFkZERhdGVMYWJlbH1cclxuICAgICAgICAgICAgICBlbmREYXRlVGV4dD17ZW5kRGF0ZSA/IGZvcm1hdERpc3BsYXkoZW5kRGF0ZSwgbG9jYWxlKSA6IGFkZERhdGVMYWJlbH1cclxuICAgICAgICAgICAgICBjbGVhclJhbmdlTGFiZWw9e2NsZWFyUmFuZ2VMYWJlbH1cclxuICAgICAgICAgICAgICBoYXNTZWxlY3RlZFJhbmdlPXshIXN0YXJ0RGF0ZSB8fCAhIWVuZERhdGV9XHJcbiAgICAgICAgICAgICAgbW9udGhMYWJlbD17Y2FsZW5kYXIubGFiZWx9XHJcbiAgICAgICAgICAgICAgd2Vla0RheUxhYmVscz17d2Vla0RheUxhYmVsc31cclxuICAgICAgICAgICAgICBzdGF0dXNUZXh0PXtzZWxlY3RpbmdTdGVwID09PSBcInN0YXJ0XCIgPyBzdGF0dXNTZWxlY3RTdGFydExhYmVsIDogc3RhdHVzU2VsZWN0RW5kTGFiZWx9XHJcbiAgICAgICAgICAgICAgZGF5Q2VsbHM9e21hbnVhbERheUNlbGxzfVxyXG4gICAgICAgICAgICAgIHByZXZNb250aExhYmVsPXtwcmV2TW9udGhMYWJlbH1cclxuICAgICAgICAgICAgICBuZXh0TW9udGhMYWJlbD17bmV4dE1vbnRoTGFiZWx9XHJcbiAgICAgICAgICAgICAgb25PcGVuUG9wb3Zlcj17b3BlblBvcG92ZXJ9XHJcbiAgICAgICAgICAgICAgb25BY3RpdmF0b3JLZXlEb3duPXtoYW5kbGVBY3RpdmF0b3JLZXlEb3dufVxyXG4gICAgICAgICAgICAgIG9uU2VjdGlvbktleURvd249e2hhbmRsZVNlY3Rpb25LZXlEb3dufVxyXG4gICAgICAgICAgICAgIG9uQ2xlYXI9e2hhbmRsZUNsZWFyfVxyXG4gICAgICAgICAgICAgIG9uUHJldk1vbnRoPXtoYW5kbGVQcmV2TW9udGh9XHJcbiAgICAgICAgICAgICAgb25OZXh0TW9udGg9e2hhbmRsZU5leHRNb250aH1cclxuICAgICAgICAgICAgICBvbkdyaWRNb3VzZUxlYXZlPXtoYW5kbGVHcmlkTW91c2VMZWF2ZX1cclxuICAgICAgICAgICAgICBvbkRheUNsaWNrPXtoYW5kbGVNYW51YWxEYXlDbGlja31cclxuICAgICAgICAgICAgICBvbkRheUhvdmVyPXtoYW5kbGVNYW51YWxEYXlIb3Zlcn1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICl9XHJcblxyXG4gICAgICAgICAgPENsaWVudFNlYXJjaENvbWJvYm94XHJcbiAgICAgICAgICAgIGtleT17Y2xpZW50UmVzZXRLZXl9XHJcbiAgICAgICAgICAgIHZhbHVlPXtzZWxlY3RlZENsaWVudH1cclxuICAgICAgICAgICAgb25TZWxlY3RlZD17aGFuZGxlQ2xpZW50U2VsZWN0ZWR9XHJcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiSGlzdG9yeV9GaWx0ZXJfQ2xpZW50XCIsIFwiQWNjb3VudFwiKX1cclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJIaXN0b3J5X0ZpbHRlcl9DbGllbnRcIiwgXCJBY2NvdW50XCIpfVxyXG4gICAgICAgICAgICB2YXJpYW50PVwiY29tcGFjdFwiXHJcbiAgICAgICAgICAgIHNob3dMYWJlbD17ZmFsc2V9XHJcbiAgICAgICAgICAgIGlkQmFzZT1cImhpc3RvcnktY2xpZW50XCJcclxuICAgICAgICAgICAgcG9ydGFsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcclxuICAgICAgICAgIC8+XHJcblxyXG4gICAgICAgICAge3Nob3dGaWx0ZXJBY3Rpb25zICYmIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC0xIGdyaWQgZ3JpZC1jb2xzLTIgZ2FwLTIgaGlzdG9yeS1maWx0ZXItYWN0aW9uc1wiPlxyXG4gICAgICAgICAgICAgIDxBY3Rpb25CdXR0b25cclxuICAgICAgICAgICAgICAgIGxhYmVsPXtjbGVhckxhYmVsfVxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsXCJcclxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZVJlc2V0RmlsdGVyc31cclxuICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgIDxBY3Rpb25CdXR0b25cclxuICAgICAgICAgICAgICAgIGxhYmVsPXthcHBseUxhYmVsfVxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsXCJcclxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcclxuICAgICAgICAgICAgICAgICAgYXBwbHlGaWx0ZXJzKHsgY2xvc2VQYW5lbDogdHJ1ZSwgcGFnZTogMSB9KTtcclxuICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICApfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgKX1cclxuXHJcbiAgICAgIDxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgaWQ9XCJmcm9tRGF0ZVwiIHZhbHVlPXtmcm9tRGF0ZVZhbHVlfSByZWFkT25seSAvPlxyXG4gICAgICA8aW5wdXQgdHlwZT1cImhpZGRlblwiIGlkPVwidG9EYXRlXCIgdmFsdWU9e3RvRGF0ZVZhbHVlfSByZWFkT25seSAvPlxyXG5cclxuICAgICAgPGRpdlxyXG4gICAgICAgIGlkPVwicmVzdWx0c0xvYWRlclwiXHJcbiAgICAgICAgY2xhc3NOYW1lPVwibG9hZGVyLWJveCBnbGFzcy1wYW5lbCBzaGFkb3ctY2FyZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0ZXh0LXNtIHRleHQtbmV1dHJhbC03MDBcIlxuICAgICAgICBzdHlsZT17eyBkaXNwbGF5OiBpc0xvYWRpbmcgPyBcImZsZXhcIiA6IFwibm9uZVwiIH19XHJcbiAgICAgID5cclxuICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cImluZC1zcGlubmVyIHNpemUtNVwiIHZpZXdCb3g9XCIwIDAgMjAgMjBcIiByb2xlPVwic3RhdHVzXCIgYXJpYS1sYWJlbD17aW5kVChcIkhpc3RvcnlfTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9PlxuICAgICAgICAgIDxjaXJjbGUgY2xhc3NOYW1lPVwiaW5kLXNwaW5uZXJfX2NpcmNsZVwiIGN4PVwiMTBcIiBjeT1cIjEwXCIgcj1cIjhcIiBzdHJva2VXaWR0aD1cIjJcIiAvPlxyXG4gICAgICAgIDwvc3ZnPlxyXG4gICAgICAgIHtpbmRUKFwiSGlzdG9yeV9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX1cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICB7c2hvd1Jlc3VsdHMgJiYgKFxyXG4gICAgICAgIDw+XHJcbiAgICAgICAgICA8SGlzdG9yeVRhYmxlXG4gICAgICAgICAgICBpdGVtcz17dGltZWxpbmVJdGVtc31cbiAgICAgICAgICAgIG5vRGF0YVRleHQ9e2luZFQoXCJIaXN0b3J5X05vRGF0YUluUmFuZ2VcIiwgXCJObyB2aXNpdHMgaW4gdGhpcyByYW5nZVwiKX1cbiAgICAgICAgICAgIGVycm9yTWVzc2FnZT17ZXJyb3JNZXNzYWdlfVxuICAgICAgICAgICAgb25OYXZpZ2F0ZT17aGFuZGxlTmF2aWdhdGV9XG4gICAgICAgICAgLz5cblxyXG4gICAgICAgICAgPENvbXBhY3RQYWdpbmF0aW9uXHJcbiAgICAgICAgICAgIHRvdGFsUGFnZXM9e3RvdGFsUGFnZXN9XHJcbiAgICAgICAgICAgIGN1cnJlbnRQYWdlPXtjdXJyZW50UGFnZX1cclxuICAgICAgICAgICAgcGFnZVdpbmRvdz17UEFHRV9XSU5ET1d9XHJcbiAgICAgICAgICAgIGxvYWRpbmc9e2lzTG9hZGluZ31cclxuICAgICAgICAgICAgb25QYWdlQ2hhbmdlPXsocGFnZSkgPT4gbG9hZEFjdGl2aXRpZXMocGFnZSl9XHJcbiAgICAgICAgICAgIGxhYmVscz17cGFnaW5hdGlvbkxhYmVsc31cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgPC8+XHJcbiAgICAgICl9XHJcbiAgICAgIHtjYW5DcmVhdGVWaXNpdCAmJiAoXHJcbiAgICAgICAgPEZsb2F0aW5nQWN0aW9uQnV0dG9uXHJcbiAgICAgICAgICByb3V0ZT1cIi9WaXNpdGFzL0NyZWF0ZT9mcmVzaD0xXCJcclxuICAgICAgICAgIGFyaWFMYWJlbD17aW5kVChcIkNvbW1vbl9DcmVhdGVcIiwgXCJDcmVhdGVcIil9XHJcbiAgICAgICAgICBzaXplPXs3Nn1cclxuICAgICAgICAgIHJpZ2h0PXsxNn1cclxuICAgICAgICAgIGJvdHRvbT17RkFCX0JBU0VfQk9UVE9NfVxyXG4gICAgICAgIC8+XHJcbiAgICAgICl9XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuLy8gTW91bnQgaGVscGVyIGZvciB0aGUgbGVnYWN5IFJhem9yIHZpZXcuXHJcbmV4cG9ydCBjb25zdCBtb3VudEhpc3RvcnlQYWdlID0gKHJvb3Q6IEhUTUxFbGVtZW50KSA9PiB7XHJcbiAgY29uc3QgZGVmYXVsdEZyb21EYXRlID0gcm9vdC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWRlZmF1bHQtZnJvbVwiKSB8fCBcIlwiO1xyXG4gIGNvbnN0IGRlZmF1bHRUb0RhdGUgPSByb290LmdldEF0dHJpYnV0ZShcImRhdGEtZGVmYXVsdC10b1wiKSB8fCBcIlwiO1xyXG5cclxuICBtb3VudFJlYWN0SXNsYW5kKHJvb3QsIDxIaXN0b3J5UGFnZSBkZWZhdWx0RnJvbURhdGU9e2RlZmF1bHRGcm9tRGF0ZX0gZGVmYXVsdFRvRGF0ZT17ZGVmYXVsdFRvRGF0ZX0gLz4pO1xyXG59O1xyXG5cclxuY29uc3QgbW91bnQgPSAoKSA9PiB7XHJcbiAgY29uc3Qgcm9vdEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2aXNpdGFzLWhpc3Rvcnktcm9vdFwiKTtcclxuICBpZiAoIXJvb3RFbCkgcmV0dXJuO1xyXG4gIG1vdW50SGlzdG9yeVBhZ2Uocm9vdEVsKTtcclxufTtcclxuXHJcbm1vdW50V2hlbkRvY3VtZW50UmVhZHkobW91bnQpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgSGlzdG9yeVBhZ2U7XHJcbiIsICJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2ssIHVzZVJlZiB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBjbGFzc05hbWVzIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2NsYXNzTmFtZXMudHNcIjtcclxuaW1wb3J0IHsgdXNlVGltZWxpbmVDYXJkRWZmZWN0cyB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VUaW1lbGluZUNhcmRFZmZlY3RzLnRzXCI7XHJcblxyXG5leHBvcnQgdHlwZSBUaW1lbGluZURhdGVQYXJ0cyA9IHtcclxuICB5ZWFyOiBzdHJpbmc7XHJcbiAgbW9udGg6IHN0cmluZztcclxuICBkYXk6IHN0cmluZztcclxufTtcclxuXHJcbmV4cG9ydCB0eXBlIFRpbWVsaW5lSXRlbSA9IHtcclxuICBpZDogc3RyaW5nO1xyXG4gIGFjdGl2aWRhZElkPzogc3RyaW5nO1xyXG4gIHJlY0lkPzogbnVtYmVyIHwgbnVsbDtcclxuICBuYW1lOiBzdHJpbmc7XHJcbiAgZGVzY3JpcHRpb246IHN0cmluZztcclxuICBmdWxsTmFtZTogc3RyaW5nO1xyXG4gIGZ1bGxEZXNjOiBzdHJpbmc7XHJcbiAgZGF0ZVBhcnRzOiBUaW1lbGluZURhdGVQYXJ0cztcclxuICBpc05vRGF0YTogYm9vbGVhbjtcclxufTtcclxuXHJcbnR5cGUgUHJvcHMgPSB7XHJcbiAgaXRlbXM6IFRpbWVsaW5lSXRlbVtdO1xyXG4gIG5vRGF0YVRleHQ6IHN0cmluZztcclxuICBlcnJvck1lc3NhZ2U6IHN0cmluZztcclxuICBvbk5hdmlnYXRlOiAobGlua0lkOiBzdHJpbmcpID0+IHZvaWQ7XHJcbn07XHJcblxyXG5jb25zdCBUQVBfTU9WRV9QWCA9IDE0O1xyXG5jb25zdCBIT0xEX1RPX1BSRVZJRVdfTVMgPSAxNjA7XHJcblxyXG50eXBlIFRhcEd1YXJkU3RhdGUgPSB7XHJcbiAgYWN0aXZlOiBib29sZWFuO1xyXG4gIHBvaW50ZXJJZDogbnVtYmVyIHwgbnVsbDtcclxuICBzdGFydFg6IG51bWJlcjtcclxuICBzdGFydFk6IG51bWJlcjtcclxuICBzdGFydFRpbWU6IG51bWJlcjtcclxuICBtb3ZlZDogYm9vbGVhbjtcclxuICBsaW5rSWQ6IHN0cmluZztcclxufTtcclxuXHJcbmNvbnN0IEhpc3RvcnlUYWJsZSA9ICh7IGl0ZW1zLCBub0RhdGFUZXh0LCBlcnJvck1lc3NhZ2UsIG9uTmF2aWdhdGUgfTogUHJvcHMpID0+IHtcclxuICBjb25zdCBjb250YWluZXJSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcclxuICBjb25zdCB0YXBHdWFyZFJlZiA9IHVzZVJlZjxUYXBHdWFyZFN0YXRlPih7XHJcbiAgICBhY3RpdmU6IGZhbHNlLFxyXG4gICAgcG9pbnRlcklkOiBudWxsLFxyXG4gICAgc3RhcnRYOiAwLFxyXG4gICAgc3RhcnRZOiAwLFxyXG4gICAgc3RhcnRUaW1lOiAwLFxyXG4gICAgbW92ZWQ6IGZhbHNlLFxyXG4gICAgbGlua0lkOiBcIlwiLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCByZXNvbHZlQ2xpY2thYmxlQ2FyZCA9IHVzZUNhbGxiYWNrKCh0YXJnZXQ6IEV2ZW50VGFyZ2V0IHwgbnVsbCkgPT4ge1xyXG4gICAgY29uc3Qgbm9kZSA9IHRhcmdldCBhcyBIVE1MRWxlbWVudCB8IG51bGw7XHJcbiAgICBpZiAoIW5vZGUgfHwgdHlwZW9mIG5vZGUuY2xvc2VzdCAhPT0gXCJmdW5jdGlvblwiKSByZXR1cm4gbnVsbDtcclxuICAgIGNvbnN0IGNhcmQgPSBub2RlLmNsb3Nlc3Q8SFRNTEVsZW1lbnQ+KFwiLnRpbWVsaW5lLWNhcmQtLWNsaWNrYWJsZVtkYXRhLWxpbmstaWRdXCIpO1xyXG4gICAgaWYgKCFjYXJkKSByZXR1cm4gbnVsbDtcclxuICAgIGlmICghY29udGFpbmVyUmVmLmN1cnJlbnQ/LmNvbnRhaW5zKGNhcmQpKSByZXR1cm4gbnVsbDtcclxuICAgIHJldHVybiBjYXJkO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgcmVzZXRUYXBHdWFyZCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIHRhcEd1YXJkUmVmLmN1cnJlbnQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB0YXBHdWFyZFJlZi5jdXJyZW50LnBvaW50ZXJJZCA9IG51bGw7XHJcbiAgICB0YXBHdWFyZFJlZi5jdXJyZW50Lm1vdmVkID0gZmFsc2U7XHJcbiAgICB0YXBHdWFyZFJlZi5jdXJyZW50LmxpbmtJZCA9IFwiXCI7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBoYW5kbGVQb2ludGVyRG93biA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKGV2ZW50OiBSZWFjdC5Qb2ludGVyRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB7XHJcbiAgICAgIGlmIChldmVudC5wb2ludGVyVHlwZSA9PT0gXCJtb3VzZVwiICYmIGV2ZW50LmJ1dHRvbiAhPT0gMCkgcmV0dXJuO1xyXG4gICAgICBjb25zdCBjYXJkID0gcmVzb2x2ZUNsaWNrYWJsZUNhcmQoZXZlbnQudGFyZ2V0KTtcclxuICAgICAgaWYgKCFjYXJkKSByZXR1cm47XHJcbiAgICAgIGNvbnN0IGxpbmtJZCA9IGNhcmQuZGF0YXNldC5saW5rSWQgfHwgXCJcIjtcclxuICAgICAgaWYgKCFsaW5rSWQpIHJldHVybjtcclxuXHJcbiAgICAgIHRhcEd1YXJkUmVmLmN1cnJlbnQuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgdGFwR3VhcmRSZWYuY3VycmVudC5wb2ludGVySWQgPSBldmVudC5wb2ludGVySWQ7XHJcbiAgICAgIHRhcEd1YXJkUmVmLmN1cnJlbnQuc3RhcnRYID0gZXZlbnQuY2xpZW50WDtcclxuICAgICAgdGFwR3VhcmRSZWYuY3VycmVudC5zdGFydFkgPSBldmVudC5jbGllbnRZO1xyXG4gICAgICB0YXBHdWFyZFJlZi5jdXJyZW50LnN0YXJ0VGltZSA9IERhdGUubm93KCk7XHJcbiAgICAgIHRhcEd1YXJkUmVmLmN1cnJlbnQubW92ZWQgPSBmYWxzZTtcclxuICAgICAgdGFwR3VhcmRSZWYuY3VycmVudC5saW5rSWQgPSBsaW5rSWQ7XHJcbiAgICB9LFxyXG4gICAgW3Jlc29sdmVDbGlja2FibGVDYXJkXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZVBvaW50ZXJNb3ZlID0gdXNlQ2FsbGJhY2soKGV2ZW50OiBSZWFjdC5Qb2ludGVyRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB7XHJcbiAgICBjb25zdCBzdGF0ZSA9IHRhcEd1YXJkUmVmLmN1cnJlbnQ7XHJcbiAgICBpZiAoIXN0YXRlLmFjdGl2ZSB8fCBldmVudC5wb2ludGVySWQgIT09IHN0YXRlLnBvaW50ZXJJZCkgcmV0dXJuO1xyXG4gICAgY29uc3QgZHggPSBNYXRoLmFicyhldmVudC5jbGllbnRYIC0gc3RhdGUuc3RhcnRYKTtcclxuICAgIGNvbnN0IGR5ID0gTWF0aC5hYnMoZXZlbnQuY2xpZW50WSAtIHN0YXRlLnN0YXJ0WSk7XHJcbiAgICBpZiAoZHggPiBUQVBfTU9WRV9QWCB8fCBkeSA+IFRBUF9NT1ZFX1BYKSB7XHJcbiAgICAgIHN0YXRlLm1vdmVkID0gdHJ1ZTtcclxuICAgIH1cclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZVBvaW50ZXJVcCA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKGV2ZW50OiBSZWFjdC5Qb2ludGVyRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB7XHJcbiAgICAgIGNvbnN0IHN0YXRlID0gdGFwR3VhcmRSZWYuY3VycmVudDtcclxuICAgICAgaWYgKCFzdGF0ZS5hY3RpdmUgfHwgZXZlbnQucG9pbnRlcklkICE9PSBzdGF0ZS5wb2ludGVySWQpIHJldHVybjtcclxuICAgICAgY29uc3QgbGlua0lkID0gc3RhdGUubGlua0lkO1xyXG4gICAgICBjb25zdCBoZWxkTXMgPSBEYXRlLm5vdygpIC0gc3RhdGUuc3RhcnRUaW1lO1xyXG4gICAgICBjb25zdCBzaG91bGRUYXAgPSAhc3RhdGUubW92ZWQgJiYgaGVsZE1zIDwgSE9MRF9UT19QUkVWSUVXX01TO1xyXG4gICAgICByZXNldFRhcEd1YXJkKCk7XHJcbiAgICAgIGlmIChzaG91bGRUYXAgJiYgbGlua0lkKSB7XHJcbiAgICAgICAgb25OYXZpZ2F0ZShsaW5rSWQpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgW29uTmF2aWdhdGUsIHJlc2V0VGFwR3VhcmRdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgYmxvY2tDbGlwYm9hcmRBY3Rpb24gPSB1c2VDYWxsYmFjayhcclxuICAgIChldmVudDogUmVhY3QuQ2xpcGJvYXJkRXZlbnQ8SFRNTERpdkVsZW1lbnQ+IHwgUmVhY3QuTW91c2VFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHtcclxuICAgICAgaWYgKCFyZXNvbHZlQ2xpY2thYmxlQ2FyZChldmVudC50YXJnZXQpKSByZXR1cm47XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9LFxyXG4gICAgW3Jlc29sdmVDbGlja2FibGVDYXJkXVxyXG4gICk7XHJcblxyXG4gIHVzZVRpbWVsaW5lQ2FyZEVmZmVjdHMoeyBjb250YWluZXJSZWYsIGVycm9yTWVzc2FnZSwgaXRlbXMsIHJlc29sdmVDbGlja2FibGVDYXJkIH0pO1xyXG5cclxuICBjb25zdCBoYXNJdGVtcyA9IGl0ZW1zLmxlbmd0aCA+IDA7XHJcbiAgY29uc3Qgc2hvd0VtcHR5ID0gIWVycm9yTWVzc2FnZSAmJiAhaGFzSXRlbXM7XHJcblxyXG4gIGNvbnN0IGNvbnRlbnQgPSBlcnJvck1lc3NhZ2UgPyAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtZGFuZ2VyXCI+e2Vycm9yTWVzc2FnZX08L2Rpdj5cclxuICApIDogaGFzSXRlbXMgPyAoXHJcbiAgICBpdGVtcy5tYXAoKGl0ZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgIGNvbnN0IGtleSA9IGl0ZW0uaWQgfHwgaXRlbS5yZWNJZD8udG9TdHJpbmcoKSB8fCBgdGltZWxpbmUtJHtpbmRleH1gO1xyXG4gICAgICBjb25zdCBpc0NsaWNrYWJsZSA9ICFpdGVtLmlzTm9EYXRhICYmICEhaXRlbS5pZDtcclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2IGtleT17a2V5fSBjbGFzc05hbWU9XCJ0aW1lbGluZS1pdGVtXCI+XHJcbiAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcclxuICAgICAgICAgICAgICBcInRpbWVsaW5lLWNhcmRcIixcclxuICAgICAgICAgICAgICBpdGVtLmlzTm9EYXRhID8gXCJ0aW1lbGluZS1jYXJkLS1ub2RhdGFcIiA6IFwiXCIsXHJcbiAgICAgICAgICAgICAgaXNDbGlja2FibGUgPyBcInRpbWVsaW5lLWNhcmQtLWNsaWNrYWJsZVwiIDogXCJcIlxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgICBkYXRhLWFjdGl2aWRhZGlkPXtpdGVtLmFjdGl2aWRhZElkIHx8IFwiXCJ9XHJcbiAgICAgICAgICAgIGRhdGEtcmVjaWQ9e2l0ZW0ucmVjSWQgIT0gbnVsbCA/IFN0cmluZyhpdGVtLnJlY0lkKSA6IFwiXCJ9XHJcbiAgICAgICAgICAgIGRhdGEtbGluay1pZD17aXNDbGlja2FibGUgPyBpdGVtLmlkIDogXCJcIn1cclxuICAgICAgICAgICAgcm9sZT17aXNDbGlja2FibGUgPyBcImJ1dHRvblwiIDogdW5kZWZpbmVkfVxyXG4gICAgICAgICAgICB0YWJJbmRleD17aXNDbGlja2FibGUgPyAwIDogdW5kZWZpbmVkfVxyXG4gICAgICAgICAgICBhcmlhLWxhYmVsPXtpc0NsaWNrYWJsZSA/IChpdGVtLmZ1bGxOYW1lIHx8IGl0ZW0ubmFtZSB8fCBub0RhdGFUZXh0KSA6IHVuZGVmaW5lZH1cclxuICAgICAgICAgICAgb25LZXlEb3duPXtpc0NsaWNrYWJsZVxyXG4gICAgICAgICAgICAgID8gKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQua2V5ID09PSBcIkVudGVyXCIgfHwgZXZlbnQua2V5ID09PSBcIiBcIikge1xyXG4gICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICBvbk5hdmlnYXRlKGl0ZW0uaWQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICA6IHVuZGVmaW5lZH1cclxuICAgICAgICAgID5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aW1lbGluZS1kYXRlLXBhbmVsIGZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0xIHB4LTMgcHktMyBiZy1zbGF0ZS01MCBib3JkZXItciBib3JkZXItc2xhdGUtMjAwIHRleHQtc2xhdGUtNjAwXCI+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdHJhY2tpbmctWzAuMmVtXSB0ZXh0LXNsYXRlLTUwMFwiPntpdGVtLmRhdGVQYXJ0cy55ZWFyfTwvZGl2PlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LXNlbWlib2xkIHVwcGVyY2FzZSB0cmFja2luZy1bMC4yZW1dIHRleHQtc2xhdGUtNTAwXCI+e2l0ZW0uZGF0ZVBhcnRzLm1vbnRofTwvZGl2PlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC0yeGwgZm9udC1zZW1pYm9sZCB0ZXh0LXByaW1hcnlcIj57aXRlbS5kYXRlUGFydHMuZGF5fTwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aW1lbGluZS1jYXJkX19jb250ZW50IGZsZXgtMSBweS0zIHB4LTRcIj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpbWVsaW5lLW5hbWVcIiBkYXRhLWZ1bGx0ZXh0PXtpdGVtLmZ1bGxOYW1lIHx8IGl0ZW0ubmFtZX0+e2l0ZW0ubmFtZX08L2Rpdj5cclxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0aW1lbGluZS1kZXNjLXRleHRcIiBkYXRhLWZ1bGx0ZXh0PXtpdGVtLmZ1bGxEZXNjIHx8IGl0ZW0uZGVzY3JpcHRpb259PntpdGVtLmRlc2NyaXB0aW9uIHx8IG5vRGF0YVRleHR9PC9wPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApO1xyXG4gICAgfSlcclxuICApIDogbnVsbDtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXZcclxuICAgICAgaWQ9XCJ0aW1lbGluZUNvbnRhaW5lclwiXHJcbiAgICAgIHJlZj17Y29udGFpbmVyUmVmfVxyXG4gICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXCJ0aW1lbGluZS1ib3hcIiwgc2hvd0VtcHR5ID8gXCJ0aW1lbGluZS1lbXB0eVwiIDogXCJcIil9XHJcbiAgICAgIGRhdGEtZW1wdHktdGV4dD17bm9EYXRhVGV4dH1cclxuICAgICAgb25Qb2ludGVyRG93bkNhcHR1cmU9e2hhbmRsZVBvaW50ZXJEb3dufVxyXG4gICAgICBvblBvaW50ZXJNb3ZlQ2FwdHVyZT17aGFuZGxlUG9pbnRlck1vdmV9XHJcbiAgICAgIG9uUG9pbnRlclVwQ2FwdHVyZT17aGFuZGxlUG9pbnRlclVwfVxyXG4gICAgICBvblBvaW50ZXJDYW5jZWxDYXB0dXJlPXtyZXNldFRhcEd1YXJkfVxyXG4gICAgICBvblBvaW50ZXJMZWF2ZT17cmVzZXRUYXBHdWFyZH1cclxuICAgICAgb25Db250ZXh0TWVudUNhcHR1cmU9e2Jsb2NrQ2xpcGJvYXJkQWN0aW9ufVxyXG4gICAgICBvbkNvcHlDYXB0dXJlPXtibG9ja0NsaXBib2FyZEFjdGlvbn1cclxuICAgICAgb25DdXRDYXB0dXJlPXtibG9ja0NsaXBib2FyZEFjdGlvbn1cclxuICAgICAgb25QYXN0ZUNhcHR1cmU9e2Jsb2NrQ2xpcGJvYXJkQWN0aW9ufVxyXG4gICAgPlxyXG4gICAgICB7Y29udGVudH1cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG5jb25zdCBNZW1vaXplZEhpc3RvcnlUYWJsZSA9IFJlYWN0Lm1lbW8oSGlzdG9yeVRhYmxlKTtcclxuTWVtb2l6ZWRIaXN0b3J5VGFibGUuZGlzcGxheU5hbWUgPSBcIkhpc3RvcnlUYWJsZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgTWVtb2l6ZWRIaXN0b3J5VGFibGU7XHJcbiIsICJcdUZFRkZpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0IH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB0eXBlIHsgSGlzdG9yeUNhY2hlZEZpbHRlciB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VIaXN0b3J5RmlsdGVyQ2FjaGUudHNcIjtcclxuaW1wb3J0IHsgc2V0VG9wYmFyQWN0aW9uR3JvdXBSZWFkeSB9IGZyb20gXCIuLi8uLi8uLi91dGlscy90b3BiYXJBY3Rpb25WaXNpYmlsaXR5LnRzXCI7XHJcbmltcG9ydCB0eXBlIHsgRmlsdGVyTG9hZFJlcXVlc3QsIExvYWRPdmVycmlkZSB9IGZyb20gXCIuL3VzZUhpc3RvcnlGaWx0ZXJzU3RhdGUudHNcIjtcclxuXHJcbnR5cGUgVXNlSGlzdG9yeVBhZ2VMaXN0ZW5lcnNBcmdzID0ge1xyXG4gIGlzT3BlbjogYm9vbGVhbjtcclxuICBhY3RpdmF0b3JSZWY6IFJlYWN0LlJlZk9iamVjdDxIVE1MRGl2RWxlbWVudCB8IG51bGw+O1xyXG4gIHBvcG92ZXJSZWY6IFJlYWN0LlJlZk9iamVjdDxIVE1MRGl2RWxlbWVudCB8IG51bGw+O1xyXG4gIGhhc1Jlc3RvcmVkRmlsdGVyUmVmOiBSZWFjdC5NdXRhYmxlUmVmT2JqZWN0PGJvb2xlYW4+O1xyXG4gIHJldHJ5T25OZXR3b3JrRXJyb3JSZWY6IFJlYWN0Lk11dGFibGVSZWZPYmplY3Q8Ym9vbGVhbj47XHJcbiAgY3VycmVudFBhZ2U6IG51bWJlcjtcclxuICBsb2dIaXN0b3J5OiAobWVzc2FnZTogc3RyaW5nLCBkYXRhPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pID0+IHZvaWQ7XHJcbiAgY29uc3VtZVJldHVybkZsYWc6ICgpID0+IGJvb2xlYW47XHJcbiAgcmVhZENhY2hlZEZpbHRlcjogKCkgPT4gSGlzdG9yeUNhY2hlZEZpbHRlciB8IG51bGw7XHJcbiAgYXBwbHlDYWNoZWRGaWx0ZXI6IChmaWx0ZXI6IEhpc3RvcnlDYWNoZWRGaWx0ZXIgfCBudWxsKSA9PiBGaWx0ZXJMb2FkUmVxdWVzdCB8IG51bGw7XHJcbiAgbG9hZEFjdGl2aXRpZXM6IChwYWdlOiBudW1iZXIsIG92ZXJyaWRlPzogTG9hZE92ZXJyaWRlKSA9PiB2b2lkO1xyXG4gIHNldElzT3BlbjogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248Ym9vbGVhbj4+O1xyXG4gIHNldEhvdmVyRGF0ZTogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248RGF0ZSB8IG51bGw+PjtcclxuICBzZXRTaG93RmlsdGVyczogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248Ym9vbGVhbj4+O1xyXG4gIGFwcGx5RmlsdGVyczogKG9wdGlvbnM/OiB7IGNsb3NlUGFuZWw/OiBib29sZWFuOyBmb3JjZT86IGJvb2xlYW47IHBhZ2U/OiBudW1iZXIgfSkgPT4gdm9pZDtcclxufTtcclxuXHJcbi8vIEhhbmRsZXMgZ2xvYmFsIGxpc3RlbmVycyB1c2VkIGJ5IHRoZSBoaXN0b3J5IHBhZ2UgZmlsdGVycyBhbmQgY2FsZW5kYXIgVUkuXHJcbmV4cG9ydCBjb25zdCB1c2VIaXN0b3J5UGFnZUxpc3RlbmVycyA9ICh7XHJcbiAgaXNPcGVuLFxyXG4gIGFjdGl2YXRvclJlZixcclxuICBwb3BvdmVyUmVmLFxyXG4gIGhhc1Jlc3RvcmVkRmlsdGVyUmVmLFxyXG4gIHJldHJ5T25OZXR3b3JrRXJyb3JSZWYsXHJcbiAgY3VycmVudFBhZ2UsXHJcbiAgbG9nSGlzdG9yeSxcclxuICBjb25zdW1lUmV0dXJuRmxhZyxcclxuICByZWFkQ2FjaGVkRmlsdGVyLFxyXG4gIGFwcGx5Q2FjaGVkRmlsdGVyLFxyXG4gIGxvYWRBY3Rpdml0aWVzLFxyXG4gIHNldElzT3BlbixcclxuICBzZXRIb3ZlckRhdGUsXHJcbiAgc2V0U2hvd0ZpbHRlcnMsXHJcbiAgYXBwbHlGaWx0ZXJzLFxyXG59OiBVc2VIaXN0b3J5UGFnZUxpc3RlbmVyc0FyZ3MpID0+IHtcclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgc2V0VG9wYmFyQWN0aW9uR3JvdXBSZWFkeShcImhpc3RvcnktbGlzdC1hY3Rpb25zXCIpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgLy8gQ2xvc2UgdGhlIG1hbnVhbCBwaWNrZXIgd2hlbiBjbGlja2luZyBvdXRzaWRlIG9mIHRoZSByYW5nZSBwaWNrZXIgVUkuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghaXNPcGVuKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgaGFuZGxlT3V0c2lkZSA9IChldmVudDogTW91c2VFdmVudCkgPT4ge1xyXG4gICAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQgYXMgTm9kZSB8IG51bGw7XHJcbiAgICAgIGlmICghdGFyZ2V0KSByZXR1cm47XHJcbiAgICAgIGlmIChwb3BvdmVyUmVmLmN1cnJlbnQ/LmNvbnRhaW5zKHRhcmdldCkpIHJldHVybjtcclxuICAgICAgaWYgKGFjdGl2YXRvclJlZi5jdXJyZW50Py5jb250YWlucyh0YXJnZXQpKSByZXR1cm47XHJcbiAgICAgIGxvZ0hpc3RvcnkoXCJjbG9zZVBvcG92ZXI6b3V0c2lkZVwiKTtcclxuICAgICAgc2V0SXNPcGVuKGZhbHNlKTtcclxuICAgICAgc2V0SG92ZXJEYXRlKG51bGwpO1xyXG4gICAgfTtcclxuXHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGhhbmRsZU91dHNpZGUpO1xyXG4gICAgcmV0dXJuICgpID0+IGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgaGFuZGxlT3V0c2lkZSk7XHJcbiAgfSwgW2FjdGl2YXRvclJlZiwgaXNPcGVuLCBsb2dIaXN0b3J5LCBwb3BvdmVyUmVmLCBzZXRIb3ZlckRhdGUsIHNldElzT3Blbl0pO1xyXG5cclxuICAvLyBSZS1hcHBseSBmaWx0ZXJzIGFmdGVyIGJyb3dzZXIgYmFjay9mb3J3YXJkIG5hdmlnYXRpb24gcmV0dXJucyB0byB0aGUgcGFnZS5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3Qgb25QYWdlU2hvdyA9ICgpID0+IHtcclxuICAgICAgaWYgKGhhc1Jlc3RvcmVkRmlsdGVyUmVmLmN1cnJlbnQpIHJldHVybjtcclxuICAgICAgaWYgKGNvbnN1bWVSZXR1cm5GbGFnKCkpIHtcclxuICAgICAgICBjb25zdCBjYWNoZWQgPSByZWFkQ2FjaGVkRmlsdGVyKCk7XHJcbiAgICAgICAgY29uc3QgY2FjaGVkUmVxdWVzdCA9IGFwcGx5Q2FjaGVkRmlsdGVyKGNhY2hlZCk7XHJcbiAgICAgICAgaWYgKGNhY2hlZFJlcXVlc3QpIHtcclxuICAgICAgICAgIHJldHJ5T25OZXR3b3JrRXJyb3JSZWYuY3VycmVudCA9IHRydWU7XHJcbiAgICAgICAgICBsb2FkQWN0aXZpdGllcyhjYWNoZWRSZXF1ZXN0LnBhZ2UsIGNhY2hlZFJlcXVlc3Qub3ZlcnJpZGUpO1xyXG4gICAgICAgICAgc2V0U2hvd0ZpbHRlcnMoZmFsc2UpO1xyXG4gICAgICAgICAgc2V0SXNPcGVuKGZhbHNlKTtcclxuICAgICAgICAgIGhhc1Jlc3RvcmVkRmlsdGVyUmVmLmN1cnJlbnQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInBhZ2VzaG93XCIsIG9uUGFnZVNob3cpO1xyXG4gICAgcmV0dXJuICgpID0+IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicGFnZXNob3dcIiwgb25QYWdlU2hvdyk7XHJcbiAgfSwgW1xyXG4gICAgYXBwbHlDYWNoZWRGaWx0ZXIsXHJcbiAgICBjb25zdW1lUmV0dXJuRmxhZyxcclxuICAgIGhhc1Jlc3RvcmVkRmlsdGVyUmVmLFxyXG4gICAgbG9hZEFjdGl2aXRpZXMsXHJcbiAgICByZWFkQ2FjaGVkRmlsdGVyLFxyXG4gICAgcmV0cnlPbk5ldHdvcmtFcnJvclJlZixcclxuICAgIHNldElzT3BlbixcclxuICAgIHNldFNob3dGaWx0ZXJzLFxyXG4gIF0pO1xyXG5cclxuICAvLyBXaXJlIHRvcGJhciBhY3Rpb25zIHRoYXQgdG9nZ2xlIGZpbHRlcnMgb3IgZm9yY2UgcmVmcmVzaCBvZiBjdXJyZW50IHBhZ2UuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IG9uVG9nZ2xlRmlsdGVycyA9ICgpID0+IHtcclxuICAgICAgc2V0U2hvd0ZpbHRlcnMoKHByZXYpID0+IHtcclxuICAgICAgICBjb25zdCBuZXh0ID0gIXByZXY7XHJcbiAgICAgICAgaWYgKCFuZXh0KSB7XHJcbiAgICAgICAgICBzZXRJc09wZW4oZmFsc2UpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oeyB0b3A6IDAsIGJlaGF2aW9yOiBcInNtb290aFwiIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV4dDtcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IG9uUmVmcmVzaCA9ICgpID0+IHtcclxuICAgICAgYXBwbHlGaWx0ZXJzKHsgcGFnZTogY3VycmVudFBhZ2UsIGZvcmNlOiB0cnVlLCBjbG9zZVBhbmVsOiB0cnVlIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImhpc3RvcnktdG9nZ2xlLWZpbHRlclwiLCBvblRvZ2dsZUZpbHRlcnMpO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJoaXN0b3J5LXJlZnJlc2hcIiwgb25SZWZyZXNoKTtcclxuXHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImhpc3RvcnktdG9nZ2xlLWZpbHRlclwiLCBvblRvZ2dsZUZpbHRlcnMpO1xyXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImhpc3RvcnktcmVmcmVzaFwiLCBvblJlZnJlc2gpO1xyXG4gICAgfTtcclxuICB9LCBbYXBwbHlGaWx0ZXJzLCBjdXJyZW50UGFnZSwgc2V0SXNPcGVuLCBzZXRTaG93RmlsdGVyc10pO1xyXG59O1xyXG4iLCAiXHVGRUZGaW1wb3J0IFJlYWN0LCB7IHVzZU1lbW8sIHVzZVJlZiB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgdHlwZSB7IFRpbWVsaW5lSXRlbSB9IGZyb20gXCIuL0hpc3RvcnlUYWJsZS50c3hcIjtcclxuXHJcbnR5cGUgQWN0aXZpdHlSZWNvcmQgPSBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPjtcclxuXHJcbnR5cGUgVXNlSGlzdG9yeVRpbWVsaW5lSXRlbXNBcmdzID0ge1xyXG4gIGl0ZW1zOiBBY3Rpdml0eVJlY29yZFtdO1xyXG4gIGxvY2FsZTogc3RyaW5nO1xyXG4gIG5vRGF0YVRleHQ6IHN0cmluZztcclxuICBsb2dIaXN0b3J5OiAobWVzc2FnZTogc3RyaW5nLCBkYXRhPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pID0+IHZvaWQ7XHJcbiAgdG9UaXRsZUNhc2U6ICh2YWx1ZTogc3RyaW5nLCBsb2NhbGU6IHN0cmluZykgPT4gc3RyaW5nO1xyXG4gIGZvcm1hdERhdGVQYXJ0czogKHZhbHVlOiBzdHJpbmcsIGxvY2FsZTogc3RyaW5nKSA9PiB7IHllYXI6IHN0cmluZzsgbW9udGg6IHN0cmluZzsgZGF5OiBzdHJpbmcgfTtcclxufTtcclxuXHJcbi8vIE1hcHMgcmF3IGhpc3RvcnkgcGF5bG9hZCBpdGVtcyBpbnRvIHRpbWVsaW5lIGNhcmRzIHVzZWQgYnkgSGlzdG9yeVRhYmxlLlxyXG5leHBvcnQgY29uc3QgdXNlSGlzdG9yeVRpbWVsaW5lSXRlbXMgPSAoe1xyXG4gIGl0ZW1zLFxyXG4gIGxvY2FsZSxcclxuICBub0RhdGFUZXh0LFxyXG4gIGxvZ0hpc3RvcnksXHJcbiAgdG9UaXRsZUNhc2UsXHJcbiAgZm9ybWF0RGF0ZVBhcnRzLFxyXG59OiBVc2VIaXN0b3J5VGltZWxpbmVJdGVtc0FyZ3MpID0+IHtcclxuICBjb25zdCBkZWJ1Z0xvZ2dlZFJlZiA9IHVzZVJlZigwKTtcclxuXHJcbiAgY29uc3QgdGltZWxpbmVJdGVtczogVGltZWxpbmVJdGVtW10gPSB1c2VNZW1vKCgpID0+IHtcclxuICAgIHJldHVybiBpdGVtcy5tYXAoKGVudHJ5KSA9PiB7XHJcbiAgICAgIGNvbnN0IGFjdGl2aWRhZElkUmF3ID0gKGVudHJ5LmFjdGl2aWRhZElkID8/IGVudHJ5LkFjdGl2aWRhZElkID8/IFwiXCIpLnRvU3RyaW5nKCkudHJpbSgpO1xyXG4gICAgICBjb25zdCBhY3RpdmlkYWRJZCA9IGFjdGl2aWRhZElkUmF3IHx8IFwiXCI7XHJcbiAgICAgIGNvbnN0IHJlY0lkUmF3ID0gZW50cnkucmVjSWQgPz8gZW50cnkuUmVjSWQgPz8gXCJcIjtcclxuICAgICAgY29uc3QgcmVjSWQgPSByZWNJZFJhdyAmJiAhTnVtYmVyLmlzTmFOKE51bWJlcihyZWNJZFJhdykpID8gTnVtYmVyKHJlY0lkUmF3KSA6IG51bGw7XHJcbiAgICAgIGxldCBsaW5rSWQgPSBhY3RpdmlkYWRJZCB8fCAocmVjSWQgPyByZWNJZC50b1N0cmluZygpIDogXCJcIik7XHJcblxyXG4gICAgICBpZiAoZGVidWdMb2dnZWRSZWYuY3VycmVudCA8IDUpIHtcclxuICAgICAgICBsb2dIaXN0b3J5KFwiYWN0aXZpdHkgaXRlbVwiLCB7IGFjdGl2aWRhZElkLCByZWNJZFJhdywgcmVjSWQgfSk7XHJcbiAgICAgICAgZGVidWdMb2dnZWRSZWYuY3VycmVudCArPSAxO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCByYXdOYW1lID0gKGVudHJ5Lm5hbWUgPz8gZW50cnkuTmFtZSA/PyBcIlwiKS50b1N0cmluZygpLnRyaW0oKTtcclxuICAgICAgY29uc3QgZnVsbE5hbWUgPSB0b1RpdGxlQ2FzZShyYXdOYW1lLCBsb2NhbGUpO1xyXG4gICAgICBjb25zdCBmZWNoYSA9IChlbnRyeS50cmFuc0RhdGUgPz8gZW50cnkuVHJhbnNEYXRlID8/IFwiXCIpLnRvU3RyaW5nKCk7XHJcbiAgICAgIGNvbnN0IHJhd0Rlc2MgPSAoZW50cnkuZGVzY3JpcHRpb24gPz8gZW50cnkuRGVzY3JpcHRpb24gPz8gXCJcIikudG9TdHJpbmcoKS50cmltKCk7XHJcbiAgICAgIGNvbnN0IGZ1bGxEZXNjID0gcmF3RGVzYztcclxuXHJcbiAgICAgIGNvbnN0IGlzTm9EYXRhQ2FyZCA9ICFyYXdOYW1lICYmICFyYXdEZXNjO1xyXG4gICAgICBpZiAoaXNOb0RhdGFDYXJkKSB7XHJcbiAgICAgICAgbGlua0lkID0gXCJcIjtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBpZDogbGlua0lkLFxyXG4gICAgICAgIGFjdGl2aWRhZElkLFxyXG4gICAgICAgIHJlY0lkLFxyXG4gICAgICAgIG5hbWU6IGZ1bGxOYW1lLFxyXG4gICAgICAgIGRlc2NyaXB0aW9uOiBmdWxsRGVzYyB8fCBub0RhdGFUZXh0LFxyXG4gICAgICAgIGZ1bGxOYW1lLFxyXG4gICAgICAgIGZ1bGxEZXNjLFxyXG4gICAgICAgIGRhdGVQYXJ0czogZm9ybWF0RGF0ZVBhcnRzKGZlY2hhLCBsb2NhbGUpLFxyXG4gICAgICAgIGlzTm9EYXRhOiBpc05vRGF0YUNhcmQsXHJcbiAgICAgIH07XHJcbiAgICB9KTtcclxuICB9LCBbZm9ybWF0RGF0ZVBhcnRzLCBpdGVtcywgbG9jYWxlLCBsb2dIaXN0b3J5LCBub0RhdGFUZXh0LCB0b1RpdGxlQ2FzZV0pO1xyXG5cclxuICByZXR1cm4geyB0aW1lbGluZUl0ZW1zIH07XHJcbn07XHJcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IEFwaUZldGNoRXJyb3IsIGZldGNoSnNvbiB9IGZyb20gXCIuLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5cclxuZXhwb3J0IHR5cGUgSGlzdG9yeUFjdGl2aXR5SXRlbSA9IHtcclxuICBhY3RpdmlkYWRJZD86IHN0cmluZyB8IG51bWJlcjtcclxuICBBY3RpdmlkYWRJZD86IHN0cmluZyB8IG51bWJlcjtcclxuICByZWNJZD86IHN0cmluZyB8IG51bWJlcjtcclxuICBSZWNJZD86IHN0cmluZyB8IG51bWJlcjtcclxuICBuYW1lPzogc3RyaW5nO1xyXG4gIE5hbWU/OiBzdHJpbmc7XHJcbiAgdHJhbnNEYXRlPzogc3RyaW5nO1xyXG4gIFRyYW5zRGF0ZT86IHN0cmluZztcclxuICBkZXNjcmlwdGlvbj86IHN0cmluZztcclxuICBEZXNjcmlwdGlvbj86IHN0cmluZztcclxufTtcclxuXHJcbnR5cGUgSGlzdG9yeVJlc3BvbnNlID0ge1xyXG4gIGl0ZW1zPzogSGlzdG9yeUFjdGl2aXR5SXRlbVtdO1xyXG4gIHRvdGFsPzogbnVtYmVyO1xyXG59O1xyXG5cclxudHlwZSBMb2FkT3ZlcnJpZGUgPSB7XHJcbiAgZnJvbURhdGU6IHN0cmluZztcclxuICB0b0RhdGU6IHN0cmluZztcclxuICBhY2NvdW50TnVtPzogc3RyaW5nO1xyXG59O1xyXG5cclxudHlwZSBVc2VIaXN0b3J5QWN0aXZpdGllc0FyZ3MgPSB7XHJcbiAgZnJvbURhdGVWYWx1ZTogc3RyaW5nO1xyXG4gIHRvRGF0ZVZhbHVlOiBzdHJpbmc7XHJcbiAgYWNjb3VudE51bVZhbHVlOiBzdHJpbmc7XHJcbiAgcGFnZVNpemU6IG51bWJlcjtcclxuICByZXRyeURlbGF5TXM/OiBudW1iZXI7XHJcbiAgbm9ybWFsaXplUmFuZ2U6IChmcm9tOiBzdHJpbmcsIHRvOiBzdHJpbmcpID0+IHsgZnJvbTogc3RyaW5nOyB0bzogc3RyaW5nIH07XHJcbiAgb25Gb3JiaWRkZW46ICgpID0+IHZvaWQ7XHJcbiAgb25EZWJ1Zz86IChtZXNzYWdlOiBzdHJpbmcsIGRhdGE/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPikgPT4gdm9pZDtcclxufTtcclxuXHJcbi8vIENlbnRyYWxpemVzIGhpc3RvcnkgZmV0Y2gvcmV0cnkgbG9naWMgdG8ga2VlcCBwYWdlIGNvbXBvbmVudHMgc21hbGxlci5cclxuZXhwb3J0IGNvbnN0IHVzZUhpc3RvcnlBY3Rpdml0aWVzID0gKHtcclxuICBmcm9tRGF0ZVZhbHVlLFxyXG4gIHRvRGF0ZVZhbHVlLFxyXG4gIGFjY291bnROdW1WYWx1ZSxcclxuICBwYWdlU2l6ZSxcclxuICByZXRyeURlbGF5TXMgPSA2MDAsXHJcbiAgbm9ybWFsaXplUmFuZ2UsXHJcbiAgb25Gb3JiaWRkZW4sXHJcbiAgb25EZWJ1ZyxcclxufTogVXNlSGlzdG9yeUFjdGl2aXRpZXNBcmdzKSA9PiB7XHJcbiAgY29uc3QgW2l0ZW1zLCBzZXRJdGVtc10gPSB1c2VTdGF0ZTxIaXN0b3J5QWN0aXZpdHlJdGVtW10+KFtdKTtcclxuICBjb25zdCBbdG90YWwsIHNldFRvdGFsXSA9IHVzZVN0YXRlKDApO1xyXG4gIGNvbnN0IFtjdXJyZW50UGFnZSwgc2V0Q3VycmVudFBhZ2VdID0gdXNlU3RhdGUoMSk7XHJcbiAgY29uc3QgW2lzTG9hZGluZywgc2V0SXNMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbZXJyb3JNZXNzYWdlLCBzZXRFcnJvck1lc3NhZ2VdID0gdXNlU3RhdGUoXCJcIik7XHJcblxyXG4gIGNvbnN0IHJldHJ5T25OZXR3b3JrRXJyb3JSZWYgPSB1c2VSZWYoZmFsc2UpO1xyXG4gIGNvbnN0IGFjdGl2ZUFib3J0UmVmID0gdXNlUmVmPEFib3J0Q29udHJvbGxlciB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IGFjdGl2ZVJlcXVlc3RJZFJlZiA9IHVzZVJlZigwKTtcclxuICBjb25zdCByZXRyeVRpbWVyUmVmID0gdXNlUmVmPG51bWJlciB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IGxhc3RTaWduYXR1cmVSZWYgPSB1c2VSZWYoXCJcIik7XHJcblxyXG4gIGNvbnN0IGNsZWFyUmV0cnlUaW1lciA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmIChyZXRyeVRpbWVyUmVmLmN1cnJlbnQpIHtcclxuICAgICAgY2xlYXJUaW1lb3V0KHJldHJ5VGltZXJSZWYuY3VycmVudCk7XHJcbiAgICAgIHJldHJ5VGltZXJSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICB9XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBhYm9ydEFjdGl2ZVJlcXVlc3QgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAoIWFjdGl2ZUFib3J0UmVmLmN1cnJlbnQpIHJldHVybjtcclxuICAgIHRyeSB7XHJcbiAgICAgIGFjdGl2ZUFib3J0UmVmLmN1cnJlbnQuYWJvcnQoKTtcclxuICAgIH0gY2F0Y2gge1xyXG4gICAgICAvLyBJZ25vcmUgYWJvcnQgZXJyb3JzLlxyXG4gICAgfVxyXG4gICAgYWN0aXZlQWJvcnRSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCByZXNldEFjdGl2aXRpZXMgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBjbGVhclJldHJ5VGltZXIoKTtcclxuICAgIGFib3J0QWN0aXZlUmVxdWVzdCgpO1xyXG4gICAgc2V0SXRlbXMoW10pO1xyXG4gICAgc2V0VG90YWwoMCk7XHJcbiAgICBzZXRFcnJvck1lc3NhZ2UoXCJcIik7XHJcbiAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xyXG4gIH0sIFthYm9ydEFjdGl2ZVJlcXVlc3QsIGNsZWFyUmV0cnlUaW1lcl0pO1xyXG5cclxuICBjb25zdCBsb2FkQWN0aXZpdGllcyA9IHVzZUNhbGxiYWNrKFxyXG4gICAgYXN5bmMgKHBhZ2U6IG51bWJlciwgb3ZlcnJpZGU/OiBMb2FkT3ZlcnJpZGUpID0+IHtcclxuICAgICAgY29uc3QgZnJvbURhdGVTdHIgPSBvdmVycmlkZT8uZnJvbURhdGUgPz8gZnJvbURhdGVWYWx1ZTtcclxuICAgICAgY29uc3QgdG9EYXRlU3RyID0gb3ZlcnJpZGU/LnRvRGF0ZSA/PyB0b0RhdGVWYWx1ZTtcclxuICAgICAgY29uc3QgYWNjb3VudE51bVN0ciA9IG92ZXJyaWRlPy5hY2NvdW50TnVtID8/IGFjY291bnROdW1WYWx1ZTtcclxuXHJcbiAgICAgIGlmICghZnJvbURhdGVTdHIgfHwgIXRvRGF0ZVN0cikge1xyXG4gICAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XHJcbiAgICAgICAgc2V0SXRlbXMoW10pO1xyXG4gICAgICAgIHNldFRvdGFsKDApO1xyXG4gICAgICAgIHNldEVycm9yTWVzc2FnZShcIlwiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNldEN1cnJlbnRQYWdlKHBhZ2UpO1xyXG4gICAgICBjbGVhclJldHJ5VGltZXIoKTtcclxuXHJcbiAgICAgIGNvbnN0IHJlcXVlc3RJZCA9ICsrYWN0aXZlUmVxdWVzdElkUmVmLmN1cnJlbnQ7XHJcbiAgICAgIGFib3J0QWN0aXZlUmVxdWVzdCgpO1xyXG5cclxuICAgICAgY29uc3QgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcclxuICAgICAgYWN0aXZlQWJvcnRSZWYuY3VycmVudCA9IGNvbnRyb2xsZXI7XHJcblxyXG4gICAgICBjb25zdCBub3JtYWxpemVkID0gbm9ybWFsaXplUmFuZ2UoZnJvbURhdGVTdHIsIHRvRGF0ZVN0cik7XHJcbiAgICAgIGNvbnN0IGZpbHRlclNpZ25hdHVyZSA9IGAke25vcm1hbGl6ZWQuZnJvbX18JHtub3JtYWxpemVkLnRvfXwke2FjY291bnROdW1TdHJ9fCR7cGFnZX1gO1xyXG4gICAgICBsYXN0U2lnbmF0dXJlUmVmLmN1cnJlbnQgPSBmaWx0ZXJTaWduYXR1cmU7XHJcblxyXG4gICAgICBzZXRJc0xvYWRpbmcodHJ1ZSk7XHJcbiAgICAgIHNldEl0ZW1zKFtdKTtcclxuICAgICAgc2V0VG90YWwoMCk7XHJcbiAgICAgIHNldEVycm9yTWVzc2FnZShcIlwiKTtcclxuXHJcbiAgICAgIGNvbnN0IHBheWxvYWQgPSB7XHJcbiAgICAgICAgZnJvbURhdGU6IG5vcm1hbGl6ZWQuZnJvbSxcclxuICAgICAgICB0b0RhdGU6IG5vcm1hbGl6ZWQudG8sXHJcbiAgICAgICAgYWNjb3VudE51bTogYWNjb3VudE51bVN0cixcclxuICAgICAgfTtcclxuXHJcbiAgICAgIG9uRGVidWc/LihcImxvYWRBY3Rpdml0aWVzOnJlcXVlc3RcIiwgeyBwYWdlLCBwYWdlU2l6ZSwgcGF5bG9hZCB9KTtcclxuXHJcbiAgICAgIGxldCBkYXRhOiBIaXN0b3J5UmVzcG9uc2U7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgZGF0YSA9IGF3YWl0IGZldGNoSnNvbjxIaXN0b3J5UmVzcG9uc2U+KGAvSGlzdG9yaWFsL0dldEFjdGl2aXRpZXM/cGFnZT0ke3BhZ2V9JnBhZ2VTaXplPSR7cGFnZVNpemV9YCwge1xyXG4gICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcclxuICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHBheWxvYWQpLFxyXG4gICAgICAgICAgc2lnbmFsOiBjb250cm9sbGVyLnNpZ25hbCxcclxuICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGNhdGNoIChlcnI6IGFueSkge1xyXG4gICAgICAgIGlmIChyZXF1ZXN0SWQgIT09IGFjdGl2ZVJlcXVlc3RJZFJlZi5jdXJyZW50KSByZXR1cm47XHJcbiAgICAgICAgaWYgKGVycj8ubmFtZSA9PT0gXCJBYm9ydEVycm9yXCIpIHtcclxuICAgICAgICAgIGFjdGl2ZUFib3J0UmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGVyciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IgJiYgZXJyLnN0YXR1cyA9PT0gNDAzKSB7XHJcbiAgICAgICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xyXG4gICAgICAgICAgYWN0aXZlQWJvcnRSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgICAgICBvbkZvcmJpZGRlbigpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgaXNOZXR3b3JrRXJyb3IgPSAhKGVyciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IpIHx8IHR5cGVvZiBlcnIuc3RhdHVzICE9PSBcIm51bWJlclwiO1xyXG4gICAgICAgIGlmIChpc05ldHdvcmtFcnJvciAmJiByZXRyeU9uTmV0d29ya0Vycm9yUmVmLmN1cnJlbnQpIHtcclxuICAgICAgICAgIHJldHJ5T25OZXR3b3JrRXJyb3JSZWYuY3VycmVudCA9IGZhbHNlO1xyXG4gICAgICAgICAgYWN0aXZlQWJvcnRSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgICAgICByZXRyeVRpbWVyUmVmLmN1cnJlbnQgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0SWQgIT09IGFjdGl2ZVJlcXVlc3RJZFJlZi5jdXJyZW50KSByZXR1cm47XHJcbiAgICAgICAgICAgIGlmIChsYXN0U2lnbmF0dXJlUmVmLmN1cnJlbnQgIT09IGZpbHRlclNpZ25hdHVyZSkgcmV0dXJuO1xyXG4gICAgICAgICAgICBsb2FkQWN0aXZpdGllcyhwYWdlLCB7XHJcbiAgICAgICAgICAgICAgZnJvbURhdGU6IGZyb21EYXRlU3RyLFxyXG4gICAgICAgICAgICAgIHRvRGF0ZTogdG9EYXRlU3RyLFxyXG4gICAgICAgICAgICAgIGFjY291bnROdW06IGFjY291bnROdW1TdHIsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSwgcmV0cnlEZWxheU1zKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcclxuICAgICAgICBzZXRFcnJvck1lc3NhZ2UoZXJyPy5tZXNzYWdlIHx8IGluZFQoXCJBcGlfUmVxdWVzdEZhaWxlZFwiLCBcIk5vIHNlIHB1ZG8gY29uZWN0YXIgY29uIGVsIHNlcnZpZG9yIChyZWQpLlwiKSk7XHJcbiAgICAgICAgYWN0aXZlQWJvcnRSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAocmVxdWVzdElkICE9PSBhY3RpdmVSZXF1ZXN0SWRSZWYuY3VycmVudCkgcmV0dXJuO1xyXG5cclxuICAgICAgb25EZWJ1Zz8uKFwibG9hZEFjdGl2aXRpZXM6cmVzcG9uc2VcIiwge1xyXG4gICAgICAgIHN0YXR1czogMjAwLFxyXG4gICAgICAgIHRvdGFsOiBkYXRhPy50b3RhbCA/PyAwLFxyXG4gICAgICAgIGNvdW50OiBBcnJheS5pc0FycmF5KGRhdGE/Lml0ZW1zKSA/IGRhdGEuaXRlbXMubGVuZ3RoIDogMCxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xyXG4gICAgICBzZXRJdGVtcyhkYXRhLml0ZW1zIHx8IFtdKTtcclxuICAgICAgc2V0VG90YWwoZGF0YS50b3RhbCB8fCAoZGF0YS5pdGVtcyB8fCBbXSkubGVuZ3RoKTtcclxuICAgICAgYWN0aXZlQWJvcnRSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICB9LFxyXG4gICAgW1xyXG4gICAgICBhYm9ydEFjdGl2ZVJlcXVlc3QsXHJcbiAgICAgIGFjY291bnROdW1WYWx1ZSxcclxuICAgICAgY2xlYXJSZXRyeVRpbWVyLFxyXG4gICAgICBmcm9tRGF0ZVZhbHVlLFxyXG4gICAgICBub3JtYWxpemVSYW5nZSxcclxuICAgICAgb25EZWJ1ZyxcclxuICAgICAgb25Gb3JiaWRkZW4sXHJcbiAgICAgIHBhZ2VTaXplLFxyXG4gICAgICByZXRyeURlbGF5TXMsXHJcbiAgICAgIHRvRGF0ZVZhbHVlLFxyXG4gICAgXVxyXG4gICk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBjbGVhclJldHJ5VGltZXIoKTtcclxuICAgICAgYWJvcnRBY3RpdmVSZXF1ZXN0KCk7XHJcbiAgICB9O1xyXG4gIH0sIFthYm9ydEFjdGl2ZVJlcXVlc3QsIGNsZWFyUmV0cnlUaW1lcl0pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgaXRlbXMsXHJcbiAgICB0b3RhbCxcclxuICAgIGN1cnJlbnRQYWdlLFxyXG4gICAgaXNMb2FkaW5nLFxyXG4gICAgZXJyb3JNZXNzYWdlLFxyXG4gICAgbG9hZEFjdGl2aXRpZXMsXHJcbiAgICByZXNldEFjdGl2aXRpZXMsXHJcbiAgICByZXRyeU9uTmV0d29ya0Vycm9yUmVmLFxyXG4gICAgbGFzdFNpZ25hdHVyZVJlZixcclxuICB9O1xyXG59O1xyXG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2sgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgSElTVE9SWV9GSUxURVJfS0VZLCBISVNUT1JZX1JFVFVSTl9GTEFHX0tFWSB9IGZyb20gXCIuLi91dGlscy92aXNpdGFzSGlzdG9yeS50c1wiO1xyXG5pbXBvcnQge1xyXG4gIGdldFNlc3Npb25Kc29uV2l0aEV4cGlyeSxcclxuICBnZXRTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5LFxyXG4gIHJlbW92ZVNlc3Npb25WYWx1ZVdpdGhFeHBpcnksXHJcbiAgc2V0U2Vzc2lvbkpzb25XaXRoRXhwaXJ5LFxyXG4gIHNldFNlc3Npb25WYWx1ZVdpdGhFeHBpcnksXHJcbn0gZnJvbSBcIi4uL3V0aWxzL3Nlc3Npb25FeHBpcnkudHNcIjtcclxuXHJcbmV4cG9ydCB0eXBlIEhpc3RvcnlDYWNoZWRGaWx0ZXIgPSB7XHJcbiAgZnJvbURhdGU6IHN0cmluZztcclxuICB0b0RhdGU6IHN0cmluZztcclxuICBwYWdlPzogbnVtYmVyO1xyXG4gIGNsaWVudEFjY291bnQ/OiBzdHJpbmc7XHJcbiAgY2xpZW50VGV4dD86IHN0cmluZztcclxufTtcclxuXHJcbmNvbnN0IEhJU1RPUllfQ0FDSEVfVFRMX01TID0gMTIgKiA2MCAqIDYwICogMTAwMDtcclxuXHJcbmNvbnN0IG5vcm1hbGl6ZUNhY2hlZEZpbHRlciA9ICh2YWx1ZTogSGlzdG9yeUNhY2hlZEZpbHRlciB8IG51bGwpOiBIaXN0b3J5Q2FjaGVkRmlsdGVyIHwgbnVsbCA9PiB7XHJcbiAgaWYgKCF2YWx1ZSB8fCB0eXBlb2YgdmFsdWUgIT09IFwib2JqZWN0XCIpIHJldHVybiBudWxsO1xyXG4gIHJldHVybiB7XHJcbiAgICBmcm9tRGF0ZTogdmFsdWUuZnJvbURhdGUgfHwgXCJcIixcclxuICAgIHRvRGF0ZTogdmFsdWUudG9EYXRlIHx8IFwiXCIsXHJcbiAgICBwYWdlOiB2YWx1ZS5wYWdlLFxyXG4gICAgY2xpZW50QWNjb3VudDogdmFsdWUuY2xpZW50QWNjb3VudCB8fCBcIlwiLFxyXG4gICAgY2xpZW50VGV4dDogdmFsdWUuY2xpZW50VGV4dCB8fCBcIlwiLFxyXG4gIH07XHJcbn07XHJcblxyXG4vLyBLZWVwcyBoaXN0b3J5IGZpbHRlciBjYWNoZSByZWFkcy93cml0ZXMgaW4gb25lIHBsYWNlLlxyXG5leHBvcnQgY29uc3QgdXNlSGlzdG9yeUZpbHRlckNhY2hlID0gKCkgPT4ge1xyXG4gIGNvbnN0IHJlYWRDYWNoZWRGaWx0ZXIgPSB1c2VDYWxsYmFjaygoKTogSGlzdG9yeUNhY2hlZEZpbHRlciB8IG51bGwgPT4ge1xyXG4gICAgY29uc3QgcGFyc2VkID0gZ2V0U2Vzc2lvbkpzb25XaXRoRXhwaXJ5PEhpc3RvcnlDYWNoZWRGaWx0ZXI+KEhJU1RPUllfRklMVEVSX0tFWSk7XHJcbiAgICByZXR1cm4gbm9ybWFsaXplQ2FjaGVkRmlsdGVyKHBhcnNlZCk7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBjbGVhckZpbHRlckNhY2hlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgcmVtb3ZlU2Vzc2lvblZhbHVlV2l0aEV4cGlyeShISVNUT1JZX0ZJTFRFUl9LRVkpO1xyXG4gICAgcmVtb3ZlU2Vzc2lvblZhbHVlV2l0aEV4cGlyeShISVNUT1JZX1JFVFVSTl9GTEFHX0tFWSk7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBjb25zdW1lUmV0dXJuRmxhZyA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGNvbnN0IHJhdyA9IGdldFNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoSElTVE9SWV9SRVRVUk5fRkxBR19LRVkpO1xyXG4gICAgaWYgKHJhdyA9PT0gXCIxXCIpIHtcclxuICAgICAgcmVtb3ZlU2Vzc2lvblZhbHVlV2l0aEV4cGlyeShISVNUT1JZX1JFVFVSTl9GTEFHX0tFWSk7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3Qgc2F2ZUNhY2hlZEZpbHRlciA9IHVzZUNhbGxiYWNrKChmaWx0ZXI6IEhpc3RvcnlDYWNoZWRGaWx0ZXIpID0+IHtcclxuICAgIHNldFNlc3Npb25Kc29uV2l0aEV4cGlyeShISVNUT1JZX0ZJTFRFUl9LRVksIGZpbHRlciwgSElTVE9SWV9DQUNIRV9UVExfTVMpO1xyXG4gICAgc2V0U2Vzc2lvblZhbHVlV2l0aEV4cGlyeShISVNUT1JZX1JFVFVSTl9GTEFHX0tFWSwgXCIxXCIsIEhJU1RPUllfQ0FDSEVfVFRMX01TKTtcclxuICB9LCBbXSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICByZWFkQ2FjaGVkRmlsdGVyLFxyXG4gICAgY2xlYXJGaWx0ZXJDYWNoZSxcclxuICAgIGNvbnN1bWVSZXR1cm5GbGFnLFxyXG4gICAgc2F2ZUNhY2hlZEZpbHRlcixcclxuICB9O1xyXG59O1xyXG4iLCAiXHVGRUZGaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrLCB1c2VNZW1vLCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB0eXBlIHsgTW91c2VFdmVudCBhcyBSZWFjdE1vdXNlRXZlbnQgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHR5cGUgeyBDbGllbnRPcHRpb24gfSBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy92aXNpdGFzL0NsaWVudFNlYXJjaENvbWJvYm94LnRzeFwiO1xyXG5pbXBvcnQgdHlwZSB7IEhpc3RvcnlDYWNoZWRGaWx0ZXIgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlSGlzdG9yeUZpbHRlckNhY2hlLnRzXCI7XHJcblxyXG5leHBvcnQgdHlwZSBRdWlja0ZpbHRlcklkID0gXCJjdXN0b21cIiB8IFwiZGF5cy03XCIgfCBcImRheXMtMzBcIiB8IFwiZGF5cy05MFwiO1xyXG5cclxuZXhwb3J0IHR5cGUgTG9hZE92ZXJyaWRlID0ge1xyXG4gIGZyb21EYXRlOiBzdHJpbmc7XHJcbiAgdG9EYXRlOiBzdHJpbmc7XHJcbiAgYWNjb3VudE51bT86IHN0cmluZztcclxufTtcclxuXHJcbmV4cG9ydCB0eXBlIEZpbHRlckxvYWRSZXF1ZXN0ID0ge1xyXG4gIHBhZ2U6IG51bWJlcjtcclxuICBvdmVycmlkZTogTG9hZE92ZXJyaWRlO1xyXG59O1xyXG5cclxuY29uc3QgSElTVE9SWV9RVUlDS19GSUxURVJfUkFOR0VTOiBBcnJheTx7XHJcbiAgaWQ6IEV4Y2x1ZGU8UXVpY2tGaWx0ZXJJZCwgXCJjdXN0b21cIj47XHJcbiAgZGF5c1RvU3VidHJhY3Q6IG51bWJlcjtcclxufT4gPSBbXHJcbiAgeyBpZDogXCJkYXlzLTdcIiwgZGF5c1RvU3VidHJhY3Q6IDYgfSxcclxuICB7IGlkOiBcImRheXMtMzBcIiwgZGF5c1RvU3VidHJhY3Q6IDI5IH0sXHJcbiAgeyBpZDogXCJkYXlzLTkwXCIsIGRheXNUb1N1YnRyYWN0OiA4OSB9LFxyXG5dO1xyXG5cclxudHlwZSBVc2VIaXN0b3J5RmlsdGVyc1N0YXRlQXJncyA9IHtcclxuICBkZWZhdWx0RnJvbURhdGU6IHN0cmluZztcclxuICBkZWZhdWx0VG9EYXRlOiBzdHJpbmc7XHJcbiAgbG9nSGlzdG9yeTogKG1lc3NhZ2U6IHN0cmluZywgZGF0YT86IFJlY29yZDxzdHJpbmcsIHVua25vd24+KSA9PiB2b2lkO1xyXG4gIHBhcnNlRGF0ZVZhbHVlOiAodmFsdWU6IHN0cmluZykgPT4gRGF0ZSB8IG51bGw7XHJcbiAgcGFyc2VJU086ICh2YWx1ZTogc3RyaW5nKSA9PiBEYXRlIHwgbnVsbDtcclxuICB0b0lTTzogKHZhbHVlOiBEYXRlKSA9PiBzdHJpbmc7XHJcbiAgc3RhcnRPZkRheTogKHZhbHVlOiBEYXRlKSA9PiBEYXRlO1xyXG4gIGlzQmVmb3JlOiAoYTogRGF0ZSB8IG51bGwsIGI6IERhdGUgfCBudWxsKSA9PiBib29sZWFuO1xyXG59O1xyXG5cclxuLy8gRW5jYXBzdWxhdGVzIGhpc3RvcnkgZmlsdGVyIHN0YXRlIGFuZCBkYXRlLXJhbmdlIG9yY2hlc3RyYXRpb24uXHJcbmV4cG9ydCBjb25zdCB1c2VIaXN0b3J5RmlsdGVyc1N0YXRlID0gKHtcclxuICBkZWZhdWx0RnJvbURhdGUsXHJcbiAgZGVmYXVsdFRvRGF0ZSxcclxuICBsb2dIaXN0b3J5LFxyXG4gIHBhcnNlRGF0ZVZhbHVlLFxyXG4gIHBhcnNlSVNPLFxyXG4gIHRvSVNPLFxyXG4gIHN0YXJ0T2ZEYXksXHJcbiAgaXNCZWZvcmUsXHJcbn06IFVzZUhpc3RvcnlGaWx0ZXJzU3RhdGVBcmdzKSA9PiB7XHJcbiAgY29uc3QgcmVzb2x2ZVF1aWNrRmlsdGVyRnJvbVJhbmdlID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoc3RhcnQ6IERhdGUgfCBudWxsLCBlbmQ6IERhdGUgfCBudWxsKTogUXVpY2tGaWx0ZXJJZCB8IG51bGwgPT4ge1xyXG4gICAgICBpZiAoIXN0YXJ0IHx8ICFlbmQpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3Qgbm9ybWFsaXplZFN0YXJ0ID0gc3RhcnRPZkRheShzdGFydCk7XHJcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRFbmQgPSBzdGFydE9mRGF5KGVuZCk7XHJcbiAgICAgIGNvbnN0IHRvZGF5ID0gc3RhcnRPZkRheShuZXcgRGF0ZSgpKTtcclxuICAgICAgaWYgKHRvSVNPKG5vcm1hbGl6ZWRFbmQpICE9PSB0b0lTTyh0b2RheSkpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgfVxyXG5cclxuICAgICAgZm9yIChjb25zdCBlbnRyeSBvZiBISVNUT1JZX1FVSUNLX0ZJTFRFUl9SQU5HRVMpIHtcclxuICAgICAgICBjb25zdCBjYW5kaWRhdGVTdGFydCA9IG5ldyBEYXRlKHRvZGF5KTtcclxuICAgICAgICBjYW5kaWRhdGVTdGFydC5zZXREYXRlKHRvZGF5LmdldERhdGUoKSAtIGVudHJ5LmRheXNUb1N1YnRyYWN0KTtcclxuICAgICAgICBpZiAodG9JU08obm9ybWFsaXplZFN0YXJ0KSA9PT0gdG9JU08oY2FuZGlkYXRlU3RhcnQpKSB7XHJcbiAgICAgICAgICByZXR1cm4gZW50cnkuaWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH0sXHJcbiAgICBbc3RhcnRPZkRheSwgdG9JU09dXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgW3N0YXJ0RGF0ZSwgc2V0U3RhcnREYXRlXSA9IHVzZVN0YXRlPERhdGUgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBbZW5kRGF0ZSwgc2V0RW5kRGF0ZV0gPSB1c2VTdGF0ZTxEYXRlIHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgW21hbnVhbFN0YXJ0RGF0ZSwgc2V0TWFudWFsU3RhcnREYXRlXSA9IHVzZVN0YXRlPERhdGUgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBbbWFudWFsRW5kRGF0ZSwgc2V0TWFudWFsRW5kRGF0ZV0gPSB1c2VTdGF0ZTxEYXRlIHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgW2hvdmVyRGF0ZSwgc2V0SG92ZXJEYXRlXSA9IHVzZVN0YXRlPERhdGUgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBbc2VsZWN0aW5nU3RlcCwgc2V0U2VsZWN0aW5nU3RlcF0gPSB1c2VTdGF0ZTxcInN0YXJ0XCIgfCBcImVuZFwiIHwgXCJkb25lXCI+KFwic3RhcnRcIik7XHJcbiAgY29uc3QgW2N1cnJlbnRNb250aCwgc2V0Q3VycmVudE1vbnRoXSA9IHVzZVN0YXRlKG5ldyBEYXRlKCkuZ2V0TW9udGgoKSk7XHJcbiAgY29uc3QgW2N1cnJlbnRZZWFyLCBzZXRDdXJyZW50WWVhcl0gPSB1c2VTdGF0ZShuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCkpO1xyXG4gIGNvbnN0IFtpc09wZW4sIHNldElzT3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW3Nob3dNYW51YWxQaWNrZXJQYW5lbCwgc2V0U2hvd01hbnVhbFBpY2tlclBhbmVsXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbYWN0aXZlUXVpY2tGaWx0ZXIsIHNldEFjdGl2ZVF1aWNrRmlsdGVyXSA9IHVzZVN0YXRlPFF1aWNrRmlsdGVySWQgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBbc2VsZWN0ZWRDbGllbnQsIHNldFNlbGVjdGVkQ2xpZW50XSA9IHVzZVN0YXRlPENsaWVudE9wdGlvbiB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IFtjbGllbnRSZXNldEtleSwgc2V0Q2xpZW50UmVzZXRLZXldID0gdXNlU3RhdGUoMCk7XHJcbiAgY29uc3QgW3Nob3dGaWx0ZXJzLCBzZXRTaG93RmlsdGVyc10gPSB1c2VTdGF0ZSh0cnVlKTtcclxuICBjb25zdCBbc2hvd01hbnVhbEVycm9yLCBzZXRTaG93TWFudWFsRXJyb3JdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG5cclxuICBjb25zdCBoYXNSZXN0b3JlZEZpbHRlclJlZiA9IHVzZVJlZihmYWxzZSk7XHJcbiAgY29uc3QgZGlkSW5pdEZpbHRlclJlZiA9IHVzZVJlZihmYWxzZSk7XHJcblxyXG4gIGNvbnN0IGZyb21EYXRlVmFsdWUgPSB1c2VNZW1vKCgpID0+IChzdGFydERhdGUgPyB0b0lTTyhzdGFydERhdGUpIDogXCJcIiksIFtzdGFydERhdGUsIHRvSVNPXSk7XHJcbiAgY29uc3QgdG9EYXRlVmFsdWUgPSB1c2VNZW1vKCgpID0+IChlbmREYXRlID8gdG9JU08oZW5kRGF0ZSkgOiBcIlwiKSwgW2VuZERhdGUsIHRvSVNPXSk7XHJcbiAgY29uc3QgYWNjb3VudE51bVZhbHVlID0gdXNlTWVtbygoKSA9PiAoc2VsZWN0ZWRDbGllbnQgPyBzZWxlY3RlZENsaWVudC52YWx1ZSA6IFwiXCIpLCBbc2VsZWN0ZWRDbGllbnRdKTtcclxuXHJcbiAgY29uc3QgdmFsaWRhdGVNYW51YWxSYW5nZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmIChhY3RpdmVRdWlja0ZpbHRlciA9PT0gXCJjdXN0b21cIiAmJiAoIXN0YXJ0RGF0ZSB8fCAhZW5kRGF0ZSkpIHtcclxuICAgICAgc2V0U2hvd01hbnVhbEVycm9yKHRydWUpO1xyXG4gICAgICBzZXRTZWxlY3RpbmdTdGVwKCFzdGFydERhdGUgPyBcInN0YXJ0XCIgOiBcImVuZFwiKTtcclxuICAgICAgc2V0U2hvd01hbnVhbFBpY2tlclBhbmVsKHRydWUpO1xyXG4gICAgICBzZXRJc09wZW4odHJ1ZSk7XHJcbiAgICAgIHNldFNob3dGaWx0ZXJzKHRydWUpO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9LCBbYWN0aXZlUXVpY2tGaWx0ZXIsIGVuZERhdGUsIHN0YXJ0RGF0ZV0pO1xyXG5cclxuICAvLyBBcHBsaWVzIGEgZGVmYXVsdCBkYXRlIHJhbmdlIGFuZCByZXR1cm5zIHRoZSBsb2FkIHBheWxvYWQgbmVlZGVkIGJ5IHRoZSBwYWdlLlxyXG4gIGNvbnN0IGFwcGx5RGVmYXVsdFJhbmdlRnJvbVByb3BzID0gdXNlQ2FsbGJhY2soKCk6IEZpbHRlckxvYWRSZXF1ZXN0IHwgbnVsbCA9PiB7XHJcbiAgICBpZiAoIWRlZmF1bHRGcm9tRGF0ZSB8fCAhZGVmYXVsdFRvRGF0ZSkgcmV0dXJuIG51bGw7XHJcbiAgICBjb25zdCBzdGFydFJhdyA9IHBhcnNlRGF0ZVZhbHVlKGRlZmF1bHRGcm9tRGF0ZSk7XHJcbiAgICBjb25zdCBlbmRSYXcgPSBwYXJzZURhdGVWYWx1ZShkZWZhdWx0VG9EYXRlKTtcclxuICAgIGlmICghc3RhcnRSYXcgfHwgIWVuZFJhdykgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgY29uc3Qgc3RhcnREYXkgPSBzdGFydE9mRGF5KHN0YXJ0UmF3KTtcclxuICAgIGNvbnN0IGVuZERheSA9IHN0YXJ0T2ZEYXkoZW5kUmF3KTtcclxuXHJcbiAgICBsZXQgc3RhcnQgPSBzdGFydERheTtcclxuICAgIGxldCBlbmQgPSBlbmREYXk7XHJcbiAgICBpZiAoaXNCZWZvcmUoZW5kLCBzdGFydCkpIHtcclxuICAgICAgY29uc3Qgc3dhcCA9IHN0YXJ0O1xyXG4gICAgICBzdGFydCA9IGVuZDtcclxuICAgICAgZW5kID0gc3dhcDtcclxuICAgIH1cclxuXHJcbiAgICBzZXRTdGFydERhdGUoc3RhcnQpO1xyXG4gICAgc2V0RW5kRGF0ZShlbmQpO1xyXG4gICAgc2V0U2VsZWN0aW5nU3RlcChcImRvbmVcIik7XHJcbiAgICBzZXRIb3ZlckRhdGUobnVsbCk7XHJcbiAgICBzZXRDdXJyZW50TW9udGgoc3RhcnQuZ2V0TW9udGgoKSk7XHJcbiAgICBzZXRDdXJyZW50WWVhcihzdGFydC5nZXRGdWxsWWVhcigpKTtcclxuICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKHJlc29sdmVRdWlja0ZpbHRlckZyb21SYW5nZShzdGFydCwgZW5kKSk7XHJcbiAgICBzZXRTZWxlY3RlZENsaWVudChudWxsKTtcclxuICAgIHNldElzT3BlbihmYWxzZSk7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgcGFnZTogMSxcclxuICAgICAgb3ZlcnJpZGU6IHtcclxuICAgICAgICBmcm9tRGF0ZTogdG9JU08oc3RhcnQpLFxyXG4gICAgICAgIHRvRGF0ZTogdG9JU08oZW5kKSxcclxuICAgICAgICBhY2NvdW50TnVtOiBcIlwiLFxyXG4gICAgICB9LFxyXG4gICAgfTtcclxuICB9LCBbZGVmYXVsdEZyb21EYXRlLCBkZWZhdWx0VG9EYXRlLCBpc0JlZm9yZSwgcGFyc2VEYXRlVmFsdWUsIHJlc29sdmVRdWlja0ZpbHRlckZyb21SYW5nZSwgc3RhcnRPZkRheSwgdG9JU09dKTtcclxuXHJcbiAgLy8gUmVzZXRzIGhpc3RvcnkgZmlsdGVycyBsb2NhbCBzdGF0ZSBvbmx5LlxyXG4gIGNvbnN0IHJlc2V0SGlzdG9yeUZpbHRlcnMgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBzZXRTdGFydERhdGUobnVsbCk7XHJcbiAgICBzZXRFbmREYXRlKG51bGwpO1xyXG4gICAgc2V0TWFudWFsU3RhcnREYXRlKG51bGwpO1xyXG4gICAgc2V0TWFudWFsRW5kRGF0ZShudWxsKTtcclxuICAgIHNldFNlbGVjdGluZ1N0ZXAoXCJzdGFydFwiKTtcclxuICAgIHNldEhvdmVyRGF0ZShudWxsKTtcclxuICAgIHNldEN1cnJlbnRNb250aChuZXcgRGF0ZSgpLmdldE1vbnRoKCkpO1xyXG4gICAgc2V0Q3VycmVudFllYXIobmV3IERhdGUoKS5nZXRGdWxsWWVhcigpKTtcclxuICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKG51bGwpO1xyXG4gICAgc2V0U2hvd01hbnVhbFBpY2tlclBhbmVsKGZhbHNlKTtcclxuICAgIHNldFNlbGVjdGVkQ2xpZW50KG51bGwpO1xyXG4gICAgc2V0Q2xpZW50UmVzZXRLZXkoKHByZXYpID0+IHByZXYgKyAxKTtcclxuICAgIHNldFNob3dNYW51YWxFcnJvcihmYWxzZSk7XHJcbiAgfSwgW10pO1xyXG5cclxuICAvLyBBcHBsaWVzIGNhY2hlZCBmaWx0ZXJzIGFuZCByZXR1cm5zIHRoZSBsb2FkIHBheWxvYWQgbmVlZGVkIGJ5IHRoZSBwYWdlLlxyXG4gIGNvbnN0IGFwcGx5Q2FjaGVkRmlsdGVyID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoZmlsdGVyOiBIaXN0b3J5Q2FjaGVkRmlsdGVyIHwgbnVsbCk6IEZpbHRlckxvYWRSZXF1ZXN0IHwgbnVsbCA9PiB7XHJcbiAgICAgIGlmICghZmlsdGVyIHx8ICFmaWx0ZXIuZnJvbURhdGUgfHwgIWZpbHRlci50b0RhdGUpIHJldHVybiBudWxsO1xyXG5cclxuICAgICAgY29uc3Qgc3RhcnQgPSBwYXJzZUlTTyhmaWx0ZXIuZnJvbURhdGUpO1xyXG4gICAgICBjb25zdCBlbmQgPSBwYXJzZUlTTyhmaWx0ZXIudG9EYXRlKTtcclxuICAgICAgc2V0U3RhcnREYXRlKHN0YXJ0KTtcclxuICAgICAgc2V0RW5kRGF0ZShlbmQpO1xyXG4gICAgICBzZXRTZWxlY3RpbmdTdGVwKGVuZCA/IFwiZG9uZVwiIDogXCJlbmRcIik7XHJcbiAgICAgIHNldEhvdmVyRGF0ZShudWxsKTtcclxuICAgICAgc2V0Q3VycmVudE1vbnRoKHN0YXJ0ID8gc3RhcnQuZ2V0TW9udGgoKSA6IG5ldyBEYXRlKCkuZ2V0TW9udGgoKSk7XHJcbiAgICAgIHNldEN1cnJlbnRZZWFyKHN0YXJ0ID8gc3RhcnQuZ2V0RnVsbFllYXIoKSA6IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKSk7XHJcbiAgICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKHJlc29sdmVRdWlja0ZpbHRlckZyb21SYW5nZShzdGFydCwgZW5kKSk7XHJcbiAgICAgIHNldFNob3dNYW51YWxQaWNrZXJQYW5lbChmYWxzZSk7XHJcbiAgICAgIHNldFNob3dNYW51YWxFcnJvcihmYWxzZSk7XHJcblxyXG4gICAgICBpZiAoZmlsdGVyLmNsaWVudEFjY291bnQpIHtcclxuICAgICAgICBzZXRTZWxlY3RlZENsaWVudCh7IHZhbHVlOiBmaWx0ZXIuY2xpZW50QWNjb3VudCwgdGV4dDogZmlsdGVyLmNsaWVudFRleHQgfHwgZmlsdGVyLmNsaWVudEFjY291bnQgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc2V0U2VsZWN0ZWRDbGllbnQobnVsbCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IHBhZ2VWYWwgPSBOdW1iZXIoZmlsdGVyLnBhZ2UpO1xyXG4gICAgICBjb25zdCBwYWdlVG9Mb2FkID0gTnVtYmVyLmlzRmluaXRlKHBhZ2VWYWwpICYmIHBhZ2VWYWwgPiAwID8gcGFnZVZhbCA6IDE7XHJcblxyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHBhZ2U6IHBhZ2VUb0xvYWQsXHJcbiAgICAgICAgb3ZlcnJpZGU6IHtcclxuICAgICAgICAgIGZyb21EYXRlOiBmaWx0ZXIuZnJvbURhdGUsXHJcbiAgICAgICAgICB0b0RhdGU6IGZpbHRlci50b0RhdGUsXHJcbiAgICAgICAgICBhY2NvdW50TnVtOiBmaWx0ZXIuY2xpZW50QWNjb3VudCB8fCBcIlwiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgW3BhcnNlSVNPLCByZXNvbHZlUXVpY2tGaWx0ZXJGcm9tUmFuZ2VdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlU2VsZWN0ID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoZGF0ZU9iajogRGF0ZSkgPT4ge1xyXG4gICAgICBsb2dIaXN0b3J5KFwiaGFuZGxlU2VsZWN0XCIsIHtcclxuICAgICAgICBjbGlja2VkOiB0b0lTTyhkYXRlT2JqKSxcclxuICAgICAgICBzdGFydDogZnJvbURhdGVWYWx1ZSxcclxuICAgICAgICBlbmQ6IHRvRGF0ZVZhbHVlLFxyXG4gICAgICAgIHNlbGVjdGluZ1N0ZXAsXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgc2V0U2hvd01hbnVhbEVycm9yKGZhbHNlKTtcclxuICAgICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIoXCJjdXN0b21cIik7XHJcbiAgICAgIHNldFNob3dNYW51YWxQaWNrZXJQYW5lbCh0cnVlKTtcclxuICAgICAgY29uc3QgaGFzU3RhcnQgPSAhIXN0YXJ0RGF0ZTtcclxuICAgICAgY29uc3QgaGFzRW5kID0gISFlbmREYXRlO1xyXG5cclxuICAgICAgaWYgKHNlbGVjdGluZ1N0ZXAgPT09IFwiZW5kXCIpIHtcclxuICAgICAgICBpZiAoIWhhc1N0YXJ0KSB7XHJcbiAgICAgICAgICBzZXRTdGFydERhdGUoZGF0ZU9iaik7XHJcbiAgICAgICAgICBzZXRFbmREYXRlKG51bGwpO1xyXG4gICAgICAgICAgc2V0U2VsZWN0aW5nU3RlcChcImVuZFwiKTtcclxuICAgICAgICAgIHNldEN1cnJlbnRNb250aChkYXRlT2JqLmdldE1vbnRoKCkpO1xyXG4gICAgICAgICAgc2V0Q3VycmVudFllYXIoZGF0ZU9iai5nZXRGdWxsWWVhcigpKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBuZXdTdGFydCA9IHN0YXJ0RGF0ZSBhcyBEYXRlO1xyXG4gICAgICAgIGxldCBuZXdFbmQgPSBkYXRlT2JqO1xyXG4gICAgICAgIGlmIChpc0JlZm9yZShuZXdFbmQsIG5ld1N0YXJ0KSkge1xyXG4gICAgICAgICAgY29uc3Qgc3dhcCA9IG5ld1N0YXJ0O1xyXG4gICAgICAgICAgbmV3U3RhcnQgPSBuZXdFbmQ7XHJcbiAgICAgICAgICBuZXdFbmQgPSBzd2FwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0U3RhcnREYXRlKG5ld1N0YXJ0KTtcclxuICAgICAgICBzZXRFbmREYXRlKG5ld0VuZCk7XHJcbiAgICAgICAgc2V0TWFudWFsU3RhcnREYXRlKG5ld1N0YXJ0KTtcclxuICAgICAgICBzZXRNYW51YWxFbmREYXRlKG5ld0VuZCk7XHJcbiAgICAgICAgc2V0U2VsZWN0aW5nU3RlcChcImRvbmVcIik7XHJcbiAgICAgICAgc2V0Q3VycmVudE1vbnRoKG5ld0VuZC5nZXRNb250aCgpKTtcclxuICAgICAgICBzZXRDdXJyZW50WWVhcihuZXdFbmQuZ2V0RnVsbFllYXIoKSk7XHJcbiAgICAgICAgc2V0SG92ZXJEYXRlKG51bGwpO1xyXG4gICAgICAgIHNldElzT3BlbihmYWxzZSk7XHJcbiAgICAgICAgc2V0U2hvd01hbnVhbFBpY2tlclBhbmVsKGZhbHNlKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IG5ld1N0YXJ0ID0gZGF0ZU9iajtcclxuICAgICAgaWYgKGhhc0VuZCAmJiBlbmREYXRlICYmIGlzQmVmb3JlKGVuZERhdGUsIG5ld1N0YXJ0KSkge1xyXG4gICAgICAgIHNldFN0YXJ0RGF0ZShuZXdTdGFydCk7XHJcbiAgICAgICAgc2V0RW5kRGF0ZShudWxsKTtcclxuICAgICAgICBzZXRTZWxlY3RpbmdTdGVwKFwiZW5kXCIpO1xyXG4gICAgICAgIHNldEN1cnJlbnRNb250aChuZXdTdGFydC5nZXRNb250aCgpKTtcclxuICAgICAgICBzZXRDdXJyZW50WWVhcihuZXdTdGFydC5nZXRGdWxsWWVhcigpKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNldFN0YXJ0RGF0ZShuZXdTdGFydCk7XHJcbiAgICAgIGlmIChoYXNFbmQgJiYgZW5kRGF0ZSkge1xyXG4gICAgICAgIHNldEVuZERhdGUoZW5kRGF0ZSk7XHJcbiAgICAgICAgc2V0TWFudWFsU3RhcnREYXRlKG5ld1N0YXJ0KTtcclxuICAgICAgICBzZXRNYW51YWxFbmREYXRlKGVuZERhdGUpO1xyXG4gICAgICAgIHNldFNlbGVjdGluZ1N0ZXAoXCJkb25lXCIpO1xyXG4gICAgICAgIHNldEhvdmVyRGF0ZShudWxsKTtcclxuICAgICAgICBzZXRJc09wZW4oZmFsc2UpO1xyXG4gICAgICAgIHNldFNob3dNYW51YWxQaWNrZXJQYW5lbChmYWxzZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc2V0RW5kRGF0ZShudWxsKTtcclxuICAgICAgICBzZXRTZWxlY3RpbmdTdGVwKFwiZW5kXCIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzZXRDdXJyZW50TW9udGgobmV3U3RhcnQuZ2V0TW9udGgoKSk7XHJcbiAgICAgIHNldEN1cnJlbnRZZWFyKG5ld1N0YXJ0LmdldEZ1bGxZZWFyKCkpO1xyXG4gICAgfSxcclxuICAgIFtlbmREYXRlLCBmcm9tRGF0ZVZhbHVlLCBpc0JlZm9yZSwgbG9nSGlzdG9yeSwgc2VsZWN0aW5nU3RlcCwgc3RhcnREYXRlLCB0b0RhdGVWYWx1ZSwgdG9JU09dXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQ2xlYXJTdGF0ZSA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKGV2ZW50OiBSZWFjdE1vdXNlRXZlbnQpID0+IHtcclxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIGxvZ0hpc3RvcnkoXCJjbGVhclJhbmdlXCIpO1xyXG4gICAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcihudWxsKTtcclxuICAgICAgc2V0U2hvd01hbnVhbEVycm9yKGZhbHNlKTtcclxuICAgICAgc2V0U2hvd01hbnVhbFBpY2tlclBhbmVsKGZhbHNlKTtcclxuICAgICAgcmVzZXRIaXN0b3J5RmlsdGVycygpO1xyXG4gICAgICBzZXRJc09wZW4oZmFsc2UpO1xyXG4gICAgICBzZXRTaG93RmlsdGVycyh0cnVlKTtcclxuICAgIH0sXHJcbiAgICBbbG9nSGlzdG9yeSwgcmVzZXRIaXN0b3J5RmlsdGVyc11cclxuICApO1xyXG5cclxuICBjb25zdCBvcGVuUG9wb3ZlciA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKHNlY3Rpb246IFwic3RhcnRcIiB8IFwiZW5kXCIpID0+IHtcclxuICAgICAgbG9nSGlzdG9yeShcIm9wZW5Qb3BvdmVyXCIsIHsgc2VjdGlvbiwgc3RhcnQ6IGZyb21EYXRlVmFsdWUsIGVuZDogdG9EYXRlVmFsdWUsIHNlbGVjdGluZ1N0ZXAgfSk7XHJcbiAgICAgIHNldFNob3dNYW51YWxFcnJvcihmYWxzZSk7XHJcbiAgICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKFwiY3VzdG9tXCIpO1xyXG4gICAgICBzZXRTaG93TWFudWFsUGlja2VyUGFuZWwodHJ1ZSk7XHJcblxyXG4gICAgICBpZiAoc2VjdGlvbiA9PT0gXCJlbmRcIiAmJiAhc3RhcnREYXRlKSB7XHJcbiAgICAgICAgc2V0U2VsZWN0aW5nU3RlcChcInN0YXJ0XCIpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNldFNlbGVjdGluZ1N0ZXAoc2VjdGlvbik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNldElzT3Blbih0cnVlKTtcclxuICAgIH0sXHJcbiAgICBbZnJvbURhdGVWYWx1ZSwgbG9nSGlzdG9yeSwgc2VsZWN0aW5nU3RlcCwgc3RhcnREYXRlLCB0b0RhdGVWYWx1ZV1cclxuICApO1xyXG5cclxuICBjb25zdCBoYW5kbGVBY3RpdmF0b3JLZXlEb3duID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoZXZlbnQ6IFJlYWN0LktleWJvYXJkRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB7XHJcbiAgICAgIGlmIChldmVudC5rZXkgIT09IFwiRW50ZXJcIiAmJiBldmVudC5rZXkgIT09IFwiIFwiKSByZXR1cm47XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIG9wZW5Qb3BvdmVyKFwic3RhcnRcIik7XHJcbiAgICB9LFxyXG4gICAgW29wZW5Qb3BvdmVyXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZVNlY3Rpb25LZXlEb3duID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoZXZlbnQ6IFJlYWN0LktleWJvYXJkRXZlbnQ8SFRNTERpdkVsZW1lbnQ+LCBzZWN0aW9uOiBcInN0YXJ0XCIgfCBcImVuZFwiKSA9PiB7XHJcbiAgICAgIGlmIChldmVudC5rZXkgIT09IFwiRW50ZXJcIiAmJiBldmVudC5rZXkgIT09IFwiIFwiKSByZXR1cm47XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICBvcGVuUG9wb3ZlcihzZWN0aW9uKTtcclxuICAgIH0sXHJcbiAgICBbb3BlblBvcG92ZXJdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgYXBwbHlRdWlja1JhbmdlID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoZmlsdGVySWQ6IFF1aWNrRmlsdGVySWQsIHN0YXJ0OiBEYXRlLCBlbmQ6IERhdGUpID0+IHtcclxuICAgICAgY29uc3Qgc3RhcnREYXkgPSBzdGFydE9mRGF5KHN0YXJ0KTtcclxuICAgICAgY29uc3QgZW5kRGF5ID0gc3RhcnRPZkRheShlbmQpO1xyXG4gICAgICBzZXRTdGFydERhdGUoc3RhcnREYXkpO1xyXG4gICAgICBzZXRFbmREYXRlKGVuZERheSk7XHJcbiAgICAgIHNldFNlbGVjdGluZ1N0ZXAoXCJkb25lXCIpO1xyXG4gICAgICBzZXRIb3ZlckRhdGUobnVsbCk7XHJcbiAgICAgIHNldEN1cnJlbnRNb250aChzdGFydERheS5nZXRNb250aCgpKTtcclxuICAgICAgc2V0Q3VycmVudFllYXIoc3RhcnREYXkuZ2V0RnVsbFllYXIoKSk7XHJcbiAgICAgIHNldElzT3BlbihmYWxzZSk7XHJcbiAgICAgIHNldFNob3dNYW51YWxQaWNrZXJQYW5lbChmYWxzZSk7XHJcbiAgICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKGZpbHRlcklkKTtcclxuICAgICAgc2V0U2hvd01hbnVhbEVycm9yKGZhbHNlKTtcclxuICAgIH0sXHJcbiAgICBbc3RhcnRPZkRheV1cclxuICApO1xyXG5cclxuICBjb25zdCBoYW5kbGVRdWlja0ZpbHRlciA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKGZpbHRlcklkOiBRdWlja0ZpbHRlcklkKSA9PiB7XHJcbiAgICAgIGNvbnN0IHRvZGF5ID0gc3RhcnRPZkRheShuZXcgRGF0ZSgpKTtcclxuXHJcbiAgICAgIGlmIChmaWx0ZXJJZCA9PT0gXCJjdXN0b21cIikge1xyXG4gICAgICAgIC8vIFRvZ2dsZSBtYW51YWwgcGFuZWwgb24gZXZlcnkgRGF0ZSBidXR0b24gY2xpY2suXHJcbiAgICAgICAgaWYgKHNob3dNYW51YWxQaWNrZXJQYW5lbCkge1xyXG4gICAgICAgICAgc2V0U2hvd01hbnVhbEVycm9yKGZhbHNlKTtcclxuICAgICAgICAgIHNldEhvdmVyRGF0ZShudWxsKTtcclxuICAgICAgICAgIHNldFNlbGVjdGluZ1N0ZXAoc3RhcnREYXRlICYmIGVuZERhdGUgPyBcImRvbmVcIiA6IHN0YXJ0RGF0ZSA/IFwiZW5kXCIgOiBcInN0YXJ0XCIpO1xyXG4gICAgICAgICAgc2V0SXNPcGVuKGZhbHNlKTtcclxuICAgICAgICAgIHNldFNob3dNYW51YWxQaWNrZXJQYW5lbChmYWxzZSk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBuZXh0U3RhcnQgPSBtYW51YWxTdGFydERhdGUgPyBuZXcgRGF0ZShtYW51YWxTdGFydERhdGUpIDogc3RhcnREYXRlID8gbmV3IERhdGUoc3RhcnREYXRlKSA6IG51bGw7XHJcbiAgICAgICAgY29uc3QgbmV4dEVuZCA9IG1hbnVhbEVuZERhdGUgPyBuZXcgRGF0ZShtYW51YWxFbmREYXRlKSA6IGVuZERhdGUgPyBuZXcgRGF0ZShlbmREYXRlKSA6IG51bGw7XHJcbiAgICAgICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIoXCJjdXN0b21cIik7XHJcbiAgICAgICAgc2V0U2hvd01hbnVhbFBpY2tlclBhbmVsKHRydWUpO1xyXG4gICAgICAgIHNldFN0YXJ0RGF0ZShuZXh0U3RhcnQpO1xyXG4gICAgICAgIHNldEVuZERhdGUobmV4dEVuZCk7XHJcblxyXG4gICAgICAgIGlmIChuZXh0U3RhcnQpIHtcclxuICAgICAgICAgIHNldEN1cnJlbnRNb250aChuZXh0U3RhcnQuZ2V0TW9udGgoKSk7XHJcbiAgICAgICAgICBzZXRDdXJyZW50WWVhcihuZXh0U3RhcnQuZ2V0RnVsbFllYXIoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBBbHdheXMgcmVvcGVuIHRoZSBtYW51YWwgY2FsZW5kYXIgd2hlbiB0aGUgY3VzdG9tIGRhdGUgcXVpY2sgZmlsdGVyIGlzIHByZXNzZWQuXHJcbiAgICAgICAgc2V0U2VsZWN0aW5nU3RlcChuZXh0U3RhcnQgJiYgIW5leHRFbmQgPyBcImVuZFwiIDogXCJzdGFydFwiKTtcclxuICAgICAgICBzZXRJc09wZW4odHJ1ZSk7XHJcbiAgICAgICAgc2V0SG92ZXJEYXRlKG51bGwpO1xyXG4gICAgICAgIHNldFNob3dNYW51YWxFcnJvcihmYWxzZSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoZmlsdGVySWQgPT09IFwiZGF5cy03XCIpIHtcclxuICAgICAgICBjb25zdCBzdGFydCA9IG5ldyBEYXRlKHRvZGF5KTtcclxuICAgICAgICBzdGFydC5zZXREYXRlKHRvZGF5LmdldERhdGUoKSAtIDYpO1xyXG4gICAgICAgIGFwcGx5UXVpY2tSYW5nZShmaWx0ZXJJZCwgc3RhcnQsIHRvZGF5KTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChmaWx0ZXJJZCA9PT0gXCJkYXlzLTMwXCIpIHtcclxuICAgICAgICBjb25zdCBzdGFydCA9IG5ldyBEYXRlKHRvZGF5KTtcclxuICAgICAgICBzdGFydC5zZXREYXRlKHRvZGF5LmdldERhdGUoKSAtIDI5KTtcclxuICAgICAgICBhcHBseVF1aWNrUmFuZ2UoZmlsdGVySWQsIHN0YXJ0LCB0b2RheSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoZmlsdGVySWQgPT09IFwiZGF5cy05MFwiKSB7XHJcbiAgICAgICAgY29uc3Qgc3RhcnQgPSBuZXcgRGF0ZSh0b2RheSk7XHJcbiAgICAgICAgc3RhcnQuc2V0RGF0ZSh0b2RheS5nZXREYXRlKCkgLSA4OSk7XHJcbiAgICAgICAgYXBwbHlRdWlja1JhbmdlKGZpbHRlcklkLCBzdGFydCwgdG9kYXkpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgW2FwcGx5UXVpY2tSYW5nZSwgZW5kRGF0ZSwgbWFudWFsRW5kRGF0ZSwgbWFudWFsU3RhcnREYXRlLCBzaG93TWFudWFsUGlja2VyUGFuZWwsIHN0YXJ0RGF0ZSwgc3RhcnRPZkRheV1cclxuICApO1xyXG5cclxuICBjb25zdCBoYW5kbGVDbGllbnRTZWxlY3RlZCA9IHVzZUNhbGxiYWNrKChjbGllbnQ6IENsaWVudE9wdGlvbiB8IG51bGwpID0+IHtcclxuICAgIHNldFNlbGVjdGVkQ2xpZW50KGNsaWVudCk7XHJcbiAgfSwgW10pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgc3RhcnREYXRlLFxyXG4gICAgZW5kRGF0ZSxcclxuICAgIG1hbnVhbFN0YXJ0RGF0ZSxcclxuICAgIG1hbnVhbEVuZERhdGUsXHJcbiAgICBob3ZlckRhdGUsXHJcbiAgICBzZWxlY3RpbmdTdGVwLFxyXG4gICAgY3VycmVudE1vbnRoLFxyXG4gICAgY3VycmVudFllYXIsXHJcbiAgICBpc09wZW4sXHJcbiAgICBzaG93TWFudWFsUGlja2VyUGFuZWwsXHJcbiAgICBhY3RpdmVRdWlja0ZpbHRlcixcclxuICAgIHNlbGVjdGVkQ2xpZW50LFxyXG4gICAgY2xpZW50UmVzZXRLZXksXHJcbiAgICBzaG93RmlsdGVycyxcclxuICAgIHNob3dNYW51YWxFcnJvcixcclxuICAgIGZyb21EYXRlVmFsdWUsXHJcbiAgICB0b0RhdGVWYWx1ZSxcclxuICAgIGFjY291bnROdW1WYWx1ZSxcclxuICAgIGhhc1Jlc3RvcmVkRmlsdGVyUmVmLFxyXG4gICAgZGlkSW5pdEZpbHRlclJlZixcclxuICAgIHNldFN0YXJ0RGF0ZSxcclxuICAgIHNldEVuZERhdGUsXHJcbiAgICBzZXRNYW51YWxTdGFydERhdGUsXHJcbiAgICBzZXRNYW51YWxFbmREYXRlLFxyXG4gICAgc2V0SG92ZXJEYXRlLFxyXG4gICAgc2V0U2VsZWN0aW5nU3RlcCxcclxuICAgIHNldEN1cnJlbnRNb250aCxcclxuICAgIHNldEN1cnJlbnRZZWFyLFxyXG4gICAgc2V0SXNPcGVuLFxyXG4gICAgc2V0U2hvd01hbnVhbFBpY2tlclBhbmVsLFxyXG4gICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIsXHJcbiAgICBzZXRTZWxlY3RlZENsaWVudCxcclxuICAgIHNldENsaWVudFJlc2V0S2V5LFxyXG4gICAgc2V0U2hvd0ZpbHRlcnMsXHJcbiAgICBzZXRTaG93TWFudWFsRXJyb3IsXHJcbiAgICB2YWxpZGF0ZU1hbnVhbFJhbmdlLFxyXG4gICAgYXBwbHlEZWZhdWx0UmFuZ2VGcm9tUHJvcHMsXHJcbiAgICByZXNldEhpc3RvcnlGaWx0ZXJzLFxyXG4gICAgYXBwbHlDYWNoZWRGaWx0ZXIsXHJcbiAgICBoYW5kbGVTZWxlY3QsXHJcbiAgICBoYW5kbGVDbGVhclN0YXRlLFxyXG4gICAgb3BlblBvcG92ZXIsXHJcbiAgICBoYW5kbGVBY3RpdmF0b3JLZXlEb3duLFxyXG4gICAgaGFuZGxlU2VjdGlvbktleURvd24sXHJcbiAgICBoYW5kbGVRdWlja0ZpbHRlcixcclxuICAgIGhhbmRsZUNsaWVudFNlbGVjdGVkLFxyXG4gIH07XHJcbn07XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUFBLGdCQUF5RTs7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TztBQUFBLFFBQ1AsUUFBUTtBQUFBO0FBQUEsSUFDVjtBQUFBLEtBRUo7QUFFSjtBQUdPLElBQU0sbUJBQW1CLENBQUMsU0FBc0I7QUFDckQsUUFBTSxrQkFBa0IsS0FBSyxhQUFhLG1CQUFtQixLQUFLO0FBQ2xFLFFBQU0sZ0JBQWdCLEtBQUssYUFBYSxpQkFBaUIsS0FBSztBQUU5RCxtQkFBaUIsTUFBTSw2Q0FBQyxlQUFZLGlCQUFrQyxlQUE4QixDQUFFO0FBQ3hHO0FBRUEsSUFBTSxRQUFRLE1BQU07QUFDbEIsUUFBTSxTQUFTLFNBQVMsZUFBZSxzQkFBc0I7QUFDN0QsTUFBSSxDQUFDLE9BQVE7QUFDYixtQkFBaUIsTUFBTTtBQUN6QjtBQUVBLHVCQUF1QixLQUFLO0FBRTVCLElBQU8sc0JBQVE7IiwKICAibmFtZXMiOiBbImltcG9ydF9yZWFjdCIsICJSZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAibG9nSGlzdG9yeSIsICJpbXBvcnRfcmVhY3QiLCAibG9nSGlzdG9yeSIsICJ0b1RpdGxlQ2FzZSIsICJmb3JtYXREYXRlUGFydHMiLCAiaW1wb3J0X3JlYWN0IiwgIm5vcm1hbGl6ZVJhbmdlIiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAibG9nSGlzdG9yeSIsICJwYXJzZURhdGVWYWx1ZSIsICJwYXJzZUlTTyIsICJ0b0lTTyIsICJzdGFydE9mRGF5IiwgImlzQmVmb3JlIiwgIm5ld1N0YXJ0IiwgImltcG9ydF9qc3hfcnVudGltZSJdCn0K
