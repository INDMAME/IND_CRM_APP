import {
  ClientSearchCombobox_default
} from "./chunks/chunk-OOFAVWSC.js";
import {
  ActionButton_default,
  FilterButton_default,
  HistoryManualDatePicker_default,
  HistorySummary_default
} from "./chunks/chunk-G7KGERNF.js";
import {
  getSessionJsonWithExpiry,
  getSessionValueWithExpiry,
  removeSessionValueWithExpiry,
  setSessionJsonWithExpiry,
  setSessionValueWithExpiry
} from "./chunks/chunk-7SKLSV7K.js";
import {
  FloatingActionButton_default
} from "./chunks/chunk-CCXORWXW.js";
import "./chunks/chunk-6HMZLOGF.js";
import {
  CompactPagination_default,
  useTimelineCardEffects
} from "./chunks/chunk-GQ2I6PU5.js";
import "./chunks/chunk-6YXFJB4W.js";
import {
  HISTORY_FILTER_KEY,
  HISTORY_RETURN_FLAG_KEY
} from "./chunks/chunk-K7MECJ5E.js";
import {
  ApiFetchError,
  canAccess,
  classNames,
  fetchJson,
  indT,
  showPermissionModal
} from "./chunks/chunk-PU3BESI6.js";
import {
  mountReactIsland,
  mountWhenDocumentReady,
  require_jsx_runtime,
  require_react
} from "./chunks/chunk-BWM3JLWG.js";
import {
  __toESM
} from "./chunks/chunk-45FWCHS2.js";

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
  paginationRef,
  hasRestoredFilterRef,
  retryOnNetworkErrorRef,
  currentPage,
  updateFabBottom,
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
    updateFabBottom();
    let observer = null;
    const paginationEl = paginationRef.current;
    if (paginationEl && typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(() => updateFabBottom());
      observer.observe(paginationEl);
    }
    window.addEventListener("resize", updateFabBottom);
    return () => {
      window.removeEventListener("resize", updateFabBottom);
      if (observer) observer.disconnect();
    };
  }, [paginationRef, updateFabBottom]);
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
    setActiveQuickFilter(null);
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
  }, [defaultFromDate, defaultToDate, isBefore2, parseDateValue2, startOfDay2, toISO2]);
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
      setActiveQuickFilter(null);
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
    [parseISO2]
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
var FAB_CLEARANCE = 24;
var FAB_GAP = 12;
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
  const paginationRef = (0, import_react7.useRef)(null);
  const [fabBottom, setFabBottom] = (0, import_react7.useState)(FAB_BASE_BOTTOM);
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
  const updateFabBottom = (0, import_react7.useCallback)(() => {
    if (!paginationRef.current || totalPages <= 1) {
      setFabBottom(FAB_BASE_BOTTOM);
      return;
    }
    const height = paginationRef.current.offsetHeight || 0;
    const next = Math.max(FAB_BASE_BOTTOM, height + FAB_CLEARANCE + FAB_GAP);
    setFabBottom((prev) => Math.abs(prev - next) < 1 ? prev : next);
  }, [totalPages]);
  useHistoryPageListeners({
    isOpen,
    activatorRef,
    popoverRef,
    paginationRef,
    hasRestoredFilterRef,
    retryOnNetworkErrorRef,
    currentPage,
    updateFabBottom,
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
  const clientLabel = indT("History_Filter_Client", "Client");
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
          label: indT("History_Filter_Client", "Client"),
          placeholder: indT("History_Filter_Client", "Client"),
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
          ref: paginationRef,
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
        bottom: fabBottom
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvaGlzdG9yaWFsL0hpc3RvcnlQYWdlLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9oaXN0b3JpYWwvSGlzdG9yeVRhYmxlLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9oaXN0b3JpYWwvdXNlSGlzdG9yeVBhZ2VMaXN0ZW5lcnMudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvaGlzdG9yaWFsL3VzZUhpc3RvcnlUaW1lbGluZUl0ZW1zLnRzIiwgIi4uL3JlYWN0L3NyYy9ob29rcy91c2VIaXN0b3J5QWN0aXZpdGllcy50cyIsICIuLi9yZWFjdC9zcmMvaG9va3MvdXNlSGlzdG9yeUZpbHRlckNhY2hlLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy92aXNpdGFzL2hpc3RvcmlhbC91c2VIaXN0b3J5RmlsdGVyc1N0YXRlLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgY2xhc3NOYW1lcyB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9jbGFzc05hbWVzLnRzXCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB7IGNhbkFjY2Vzcywgc2hvd1Blcm1pc3Npb25Nb2RhbCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9wZXJtaXNzaW9ucy50c1wiO1xuaW1wb3J0IENsaWVudFNlYXJjaENvbWJvYm94IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL3Zpc2l0YXMvQ2xpZW50U2VhcmNoQ29tYm9ib3gudHN4XCI7XG5pbXBvcnQgSGlzdG9yeVRhYmxlIGZyb20gXCIuL0hpc3RvcnlUYWJsZS50c3hcIjtcbmltcG9ydCBIaXN0b3J5U3VtbWFyeSBmcm9tIFwiLi9IaXN0b3J5U3VtbWFyeS50c3hcIjtcbmltcG9ydCBIaXN0b3J5TWFudWFsRGF0ZVBpY2tlciwgeyBIaXN0b3J5TWFudWFsRGF5Q2VsbCB9IGZyb20gXCIuL0hpc3RvcnlNYW51YWxEYXRlUGlja2VyLnRzeFwiO1xuaW1wb3J0IHsgdXNlSGlzdG9yeVBhZ2VMaXN0ZW5lcnMgfSBmcm9tIFwiLi91c2VIaXN0b3J5UGFnZUxpc3RlbmVycy50c1wiO1xuaW1wb3J0IHsgdXNlSGlzdG9yeVRpbWVsaW5lSXRlbXMgfSBmcm9tIFwiLi91c2VIaXN0b3J5VGltZWxpbmVJdGVtcy50c1wiO1xuaW1wb3J0IEZsb2F0aW5nQWN0aW9uQnV0dG9uIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvRmxvYXRpbmdBY3Rpb25CdXR0b24udHN4XCI7XG5pbXBvcnQgQ29tcGFjdFBhZ2luYXRpb24gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9Db21wYWN0UGFnaW5hdGlvbi50c3hcIjtcbmltcG9ydCBGaWx0ZXJCdXR0b24gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9GaWx0ZXJCdXR0b24udHN4XCI7XG5pbXBvcnQgQWN0aW9uQnV0dG9uIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvQWN0aW9uQnV0dG9uLnRzeFwiO1xuaW1wb3J0IHsgdXNlSGlzdG9yeUFjdGl2aXRpZXMgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlSGlzdG9yeUFjdGl2aXRpZXMudHNcIjtcbmltcG9ydCB7IHVzZUhpc3RvcnlGaWx0ZXJDYWNoZSB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VIaXN0b3J5RmlsdGVyQ2FjaGUudHNcIjtcbmltcG9ydCB7IHVzZUhpc3RvcnlGaWx0ZXJzU3RhdGUgfSBmcm9tIFwiLi91c2VIaXN0b3J5RmlsdGVyc1N0YXRlLnRzXCI7XG5pbXBvcnQgeyBtb3VudFJlYWN0SXNsYW5kLCBtb3VudFdoZW5Eb2N1bWVudFJlYWR5IH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3JlYWN0SXNsYW5kLnRzeFwiO1xuXHJcbnR5cGUgUHJvcHMgPSB7XHJcbiAgZGVmYXVsdEZyb21EYXRlPzogc3RyaW5nO1xyXG4gIGRlZmF1bHRUb0RhdGU/OiBzdHJpbmc7XHJcbn07XHJcblxyXG50eXBlIENhbGVuZGFyQ2VsbCA9IHtcbiAgZGF0ZTogRGF0ZSB8IG51bGw7XG4gIGlzbzogc3RyaW5nO1xuICBpc0VtcHR5OiBib29sZWFuO1xyXG59O1xyXG5cclxuY29uc3QgUEFHRV9TSVpFID0gNjtcbmNvbnN0IFBBR0VfV0lORE9XID0gNjtcbmNvbnN0IE5BVl9ERUxBWV9NUyA9IDMyMDtcbmNvbnN0IEZBQl9CQVNFX0JPVFRPTSA9IDMyO1xuY29uc3QgRkFCX0NMRUFSQU5DRSA9IDI0O1xuY29uc3QgRkFCX0dBUCA9IDEyO1xuXHJcbmNvbnN0IG5vcm1hbGl6ZVVpTG9jYWxlID0gKGxvY2FsZTogc3RyaW5nKSA9PiB7XHJcbiAgY29uc3QgdmFsdWUgPSBTdHJpbmcobG9jYWxlIHx8IFwiXCIpLnRyaW0oKTtcclxuICBpZiAoIXZhbHVlKSByZXR1cm4gXCJlcy1FU1wiO1xyXG4gIGlmICgvXnpoLWhhbnMvaS50ZXN0KHZhbHVlKSkgcmV0dXJuIFwiemgtQ05cIjtcclxuICByZXR1cm4gdmFsdWU7XHJcbn07XHJcblxyXG5jb25zdCBpc0Jhc3F1ZUxvY2FsZSA9IChsb2NhbGU6IHN0cmluZykgPT4gL15ldVxcYi9pLnRlc3QoU3RyaW5nKGxvY2FsZSB8fCBcIlwiKSk7XHJcblxyXG5jb25zdCBCQVNRVUVfTU9OVEhTID0gW1xyXG4gIFwidXJ0YXJyaWxhXCIsXHJcbiAgXCJvdHNhaWxhXCIsXHJcbiAgXCJtYXJ0eG9hXCIsXHJcbiAgXCJhcGlyaWxhXCIsXHJcbiAgXCJtYWlhdHphXCIsXHJcbiAgXCJla2FpbmFcIixcclxuICBcInV6dGFpbGFcIixcclxuICBcImFidXp0dWFcIixcclxuICBcImlyYWlsYVwiLFxyXG4gIFwidXJyaWFcIixcclxuICBcImF6YXJvYVwiLFxyXG4gIFwiYWJlbmR1YVwiLFxyXG5dO1xyXG5cclxuY29uc3QgQkFTUVVFX01PTlRIU19TSE9SVCA9IFtcclxuICBcInVydFwiLFxyXG4gIFwib3RzXCIsXHJcbiAgXCJtYXJcIixcclxuICBcImFwaVwiLFxyXG4gIFwibWFpXCIsXHJcbiAgXCJla2FcIixcclxuICBcInV6dFwiLFxyXG4gIFwiYWJ1XCIsXHJcbiAgXCJpcmFcIixcclxuICBcInVyclwiLFxyXG4gIFwiYXphXCIsXHJcbiAgXCJhYmVcIixcclxuXTtcclxuXHJcbmNvbnN0IGdldFVpTG9jYWxlID0gKCkgPT4ge1xyXG4gIGNvbnN0IGZyb21IdG1sID0gdHlwZW9mIGRvY3VtZW50ICE9PSBcInVuZGVmaW5lZFwiID8gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmxhbmcgOiBcIlwiO1xyXG4gIGlmIChmcm9tSHRtbCAmJiBTdHJpbmcoZnJvbUh0bWwpLnRyaW0oKSkgcmV0dXJuIG5vcm1hbGl6ZVVpTG9jYWxlKGZyb21IdG1sKTtcclxuICByZXR1cm4gXCJlcy1FU1wiO1xyXG59O1xyXG5cclxuY29uc3QgcGFkID0gKG46IG51bWJlcikgPT4gbi50b1N0cmluZygpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcclxuXHJcbmNvbnN0IHRvSVNPID0gKGQ6IERhdGUpID0+IGAke2QuZ2V0RnVsbFllYXIoKX0tJHtwYWQoZC5nZXRNb250aCgpICsgMSl9LSR7cGFkKGQuZ2V0RGF0ZSgpKX1gO1xyXG5cclxuY29uc3Qgc3RhcnRPZkRheSA9IChkOiBEYXRlKSA9PiBuZXcgRGF0ZShkLmdldEZ1bGxZZWFyKCksIGQuZ2V0TW9udGgoKSwgZC5nZXREYXRlKCkpO1xyXG5cclxuY29uc3QgcGFyc2VJU08gPSAoczogc3RyaW5nKSA9PiB7XHJcbiAgaWYgKCFzKSByZXR1cm4gbnVsbDtcclxuICBjb25zdCBwYXJ0cyA9IHMuc3BsaXQoXCItXCIpLm1hcChOdW1iZXIpO1xyXG4gIGlmIChwYXJ0cy5sZW5ndGggIT09IDMpIHJldHVybiBudWxsO1xyXG4gIHJldHVybiBuZXcgRGF0ZShwYXJ0c1swXSwgcGFydHNbMV0gLSAxLCBwYXJ0c1syXSk7XHJcbn07XHJcblxyXG5jb25zdCBzYW1lRGF5ID0gKGE6IERhdGUgfCBudWxsLCBiOiBEYXRlIHwgbnVsbCkgPT4gISEoYSAmJiBiICYmIGEuZ2V0VGltZSgpID09PSBiLmdldFRpbWUoKSk7XHJcblxyXG5jb25zdCBpc0JlZm9yZSA9IChhOiBEYXRlIHwgbnVsbCwgYjogRGF0ZSB8IG51bGwpID0+ICEhKGEgJiYgYiAmJiBhLmdldFRpbWUoKSA8IGIuZ2V0VGltZSgpKTtcclxuXHJcbiAgY29uc3Qgbm9ybWFsaXplUmFuZ2UgPSAoZnJvbTogc3RyaW5nLCB0bzogc3RyaW5nKSA9PiB7XHJcbiAgICBpZiAoIWZyb20gfHwgIXRvKSByZXR1cm4geyBmcm9tLCB0byB9O1xyXG4gICAgY29uc3QgZnJvbURhdGUgPSBwYXJzZUlTTyhmcm9tKTtcclxuICAgIGNvbnN0IHRvRGF0ZSA9IHBhcnNlSVNPKHRvKTtcclxuICAgIGlmICghZnJvbURhdGUgfHwgIXRvRGF0ZSkgcmV0dXJuIHsgZnJvbSwgdG8gfTtcclxuICBpZiAoaXNCZWZvcmUodG9EYXRlLCBmcm9tRGF0ZSkpIHtcclxuICAgIHJldHVybiB7IGZyb206IHRvSVNPKHRvRGF0ZSksIHRvOiB0b0lTTyhmcm9tRGF0ZSkgfTtcclxuICB9XHJcbiAgcmV0dXJuIHsgZnJvbTogdG9JU08oZnJvbURhdGUpLCB0bzogdG9JU08odG9EYXRlKSB9O1xyXG59O1xyXG5cclxuICBjb25zdCBmb3JtYXREaXNwbGF5ID0gKGQ6IERhdGUsIGxvY2FsZTogc3RyaW5nKSA9PiB7XHJcbiAgaWYgKGlzQmFzcXVlTG9jYWxlKGxvY2FsZSkpIHtcclxuICAgIGNvbnN0IG1vbnRoID0gQkFTUVVFX01PTlRIU19TSE9SVFtkLmdldE1vbnRoKCldO1xyXG4gICAgcmV0dXJuIGAke2QuZ2V0RGF0ZSgpfSAke21vbnRofSAke2QuZ2V0RnVsbFllYXIoKX1gLnRvTG93ZXJDYXNlKCk7XHJcbiAgfVxyXG4gIHJldHVybiBkXHJcbiAgICAudG9Mb2NhbGVEYXRlU3RyaW5nKGxvY2FsZSwge1xyXG4gICAgICBkYXk6IFwibnVtZXJpY1wiLFxyXG4gICAgICBtb250aDogXCJzaG9ydFwiLFxyXG4gICAgICB5ZWFyOiBcIm51bWVyaWNcIixcclxuICAgIH0pXHJcbiAgICAucmVwbGFjZSgvXFwuL2csIFwiXCIpXHJcbiAgICAudG9Mb3dlckNhc2UoKTtcclxufTtcclxuXHJcbmNvbnN0IGZvcm1hdE1vbnRoTGFiZWwgPSAoZDogRGF0ZSwgbG9jYWxlOiBzdHJpbmcpID0+IHtcclxuICBpZiAoL156aC9pLnRlc3QobG9jYWxlKSkge1xyXG4gICAgcmV0dXJuIG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KGxvY2FsZSwgeyB5ZWFyOiBcIm51bWVyaWNcIiwgbW9udGg6IFwibG9uZ1wiIH0pLmZvcm1hdChkKTtcclxuICB9XHJcbiAgaWYgKGlzQmFzcXVlTG9jYWxlKGxvY2FsZSkpIHtcclxuICAgIHJldHVybiBgJHtCQVNRVUVfTU9OVEhTW2QuZ2V0TW9udGgoKV19ICR7ZC5nZXRGdWxsWWVhcigpfWA7XHJcbiAgfVxyXG4gIGNvbnN0IG1vbnRoTmFtZSA9IGQudG9Mb2NhbGVEYXRlU3RyaW5nKGxvY2FsZSwgeyBtb250aDogXCJsb25nXCIgfSk7XHJcbiAgY29uc3QgY2FwTW9udGhOYW1lID0gbW9udGhOYW1lICYmIC9bQS1aYS16XS8udGVzdChtb250aE5hbWVbMF0pXHJcbiAgICA/IG1vbnRoTmFtZVswXS50b0xvY2FsZVVwcGVyQ2FzZShsb2NhbGUpICsgbW9udGhOYW1lLnNsaWNlKDEpXHJcbiAgICA6IG1vbnRoTmFtZTtcclxuICByZXR1cm4gYCR7Y2FwTW9udGhOYW1lfSAke2QuZ2V0RnVsbFllYXIoKX1gO1xyXG59O1xyXG5cclxuY29uc3QgcGFyc2VEYXRlVmFsdWUgPSAodmFsdWU6IHN0cmluZykgPT4ge1xyXG4gIGlmICghdmFsdWUpIHJldHVybiBudWxsO1xyXG4gIGNvbnN0IHJhdyA9IFN0cmluZyh2YWx1ZSkudHJpbSgpO1xyXG4gIGlmICghcmF3KSByZXR1cm4gbnVsbDtcclxuXHJcbiAgY29uc3QgZGF0ZVBhcnQgPSByYXcuc3BsaXQoXCJUXCIpWzBdLnNwbGl0KFwiIFwiKVswXTtcclxuXHJcbiAgaWYgKC9eXFxkezR9LVxcZHsyfS1cXGR7Mn0kLy50ZXN0KGRhdGVQYXJ0KSkge1xyXG4gICAgY29uc3QgW3ksIG0sIGRdID0gZGF0ZVBhcnQuc3BsaXQoXCItXCIpLm1hcChOdW1iZXIpO1xyXG4gICAgcmV0dXJuIG5ldyBEYXRlKHksIG0gLSAxLCBkKTtcclxuICB9XHJcblxyXG4gIGlmICgvXlxcZHsyfVsuLy1dXFxkezJ9Wy4vLV1cXGR7NH0kLy50ZXN0KGRhdGVQYXJ0KSkge1xyXG4gICAgY29uc3QgcGFydHMgPSBkYXRlUGFydC5zcGxpdCgvWy4vLV0vKS5tYXAoTnVtYmVyKTtcclxuICAgIGNvbnN0IFtkLCBtLCB5XSA9IHBhcnRzO1xyXG4gICAgcmV0dXJuIG5ldyBEYXRlKHksIG0gLSAxLCBkKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHBhcnNlZCA9IG5ldyBEYXRlKHJhdyk7XHJcbiAgcmV0dXJuIE51bWJlci5pc05hTihwYXJzZWQuZ2V0VGltZSgpKSA/IG51bGwgOiBwYXJzZWQ7XHJcbn07XHJcblxyXG5jb25zdCBmb3JtYXREYXRlUGFydHMgPSAodmFsdWU6IHN0cmluZywgbG9jYWxlOiBzdHJpbmcpID0+IHtcclxuICBpZiAoIXZhbHVlKSByZXR1cm4geyB5ZWFyOiBcIlwiLCBtb250aDogXCJcIiwgZGF5OiBcIlwiIH07XHJcbiAgY29uc3QgZCA9IHBhcnNlRGF0ZVZhbHVlKHZhbHVlKTtcclxuICBpZiAoIWQpIHJldHVybiB7IHllYXI6IFwiXCIsIG1vbnRoOiBcIlwiLCBkYXk6IFwiXCIgfTtcclxuICBsZXQgbW9udGggPSBcIlwiO1xyXG4gIGlmIChpc0Jhc3F1ZUxvY2FsZShsb2NhbGUpKSB7XHJcbiAgICBtb250aCA9IEJBU1FVRV9NT05USFNfU0hPUlRbZC5nZXRNb250aCgpXSB8fCBcIlwiO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBtb250aCA9IGQudG9Mb2NhbGVEYXRlU3RyaW5nKGxvY2FsZSwgeyBtb250aDogXCJzaG9ydFwiIH0pLnJlcGxhY2UoL1xcLi9nLCBcIlwiKTtcclxuICB9XHJcbiAgcmV0dXJuIHtcclxuICAgIHllYXI6IFN0cmluZyhkLmdldEZ1bGxZZWFyKCkpLFxyXG4gICAgbW9udGg6IG1vbnRoLnRvVXBwZXJDYXNlKCksXHJcbiAgICBkYXk6IFN0cmluZyhkLmdldERhdGUoKSkucGFkU3RhcnQoMiwgXCIwXCIpLFxyXG4gIH07XHJcbn07XHJcblxyXG5jb25zdCB0b1RpdGxlQ2FzZSA9ICh2YWx1ZTogc3RyaW5nLCBsb2NhbGU6IHN0cmluZykgPT4ge1xyXG4gIGlmICghdmFsdWUpIHJldHVybiBcIlwiO1xyXG4gIGNvbnN0IGxvd2VyID0gdmFsdWUudG9Mb2NhbGVMb3dlckNhc2UobG9jYWxlKTtcclxuICB0cnkge1xyXG4gICAgcmV0dXJuIGxvd2VyLnJlcGxhY2UoLyhefFteXFxwe0x9XSkoXFxwe0x9KS9ndSwgKF9tYXRjaCwgcHJlZml4LCBjaCkgPT4gYCR7cHJlZml4fSR7Y2gudG9Mb2NhbGVVcHBlckNhc2UobG9jYWxlKX1gKTtcclxuICB9IGNhdGNoIHtcclxuICAgIHJldHVybiBsb3dlci5yZXBsYWNlKC8oXnxbXFxzLS9dKShcXFMpL2csIChfbWF0Y2gsIHByZWZpeCwgY2gpID0+IGAke3ByZWZpeH0ke2NoLnRvTG9jYWxlVXBwZXJDYXNlKGxvY2FsZSl9YCk7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgdG9TZW50ZW5jZUNhc2UgPSAodmFsdWU6IHN0cmluZywgbG9jYWxlOiBzdHJpbmcpID0+IHtcclxuICBpZiAoIXZhbHVlKSByZXR1cm4gXCJcIjtcclxuICBjb25zdCB0cmltbWVkID0gdmFsdWUudHJpbSgpO1xyXG4gIGlmICghdHJpbW1lZCkgcmV0dXJuIHRyaW1tZWQ7XHJcbiAgY29uc3QgbG93ZXIgPSB0cmltbWVkLnRvTG9jYWxlTG93ZXJDYXNlKGxvY2FsZSk7XHJcbiAgcmV0dXJuIGxvd2VyWzBdLnRvTG9jYWxlVXBwZXJDYXNlKGxvY2FsZSkgKyBsb3dlci5zbGljZSgxKTtcclxufTtcclxuXHJcbmNvbnN0IGxvZ0hpc3RvcnkgPSAobWVzc2FnZTogc3RyaW5nLCBkYXRhPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pID0+IHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybjtcbiAgY29uc3QgZGVidWdGbGFnID0gKHdpbmRvdyBhcyBhbnkpLl9fSU5EX0RFQlVHX0hJU1RPUllfXztcbiAgaWYgKGRlYnVnRmxhZyAhPT0gdHJ1ZSkgcmV0dXJuO1xuICBpZiAoZGF0YSkge1xuICAgIGNvbnNvbGUuZGVidWcoXCJbSGlzdG9yeV1cIiwgbWVzc2FnZSwgZGF0YSk7XG4gIH0gZWxzZSB7XG4gICAgY29uc29sZS5kZWJ1ZyhcIltIaXN0b3J5XVwiLCBtZXNzYWdlKTtcclxuICB9XHJcbn07XHJcblxyXG4vLyBIaXN0b3J5IHBhZ2Ugd2l0aCBSZWFjdCBzdGF0ZSArIGVmZmVjdHMgKG5vIGxlZ2FjeSBET00gbG9naWMpLlxyXG5leHBvcnQgY29uc3QgSGlzdG9yeVBhZ2UgPSAoeyBkZWZhdWx0RnJvbURhdGUgPSBcIlwiLCBkZWZhdWx0VG9EYXRlID0gXCJcIiB9OiBQcm9wcykgPT4ge1xyXG4gIGNvbnN0IGxvY2FsZSA9IHVzZU1lbW8oKCkgPT4gZ2V0VWlMb2NhbGUoKSwgW10pO1xyXG4gIGNvbnN0IGNhblZpZXdIaXN0b3J5ID0gY2FuQWNjZXNzKFwiVklTSVRBU19ISVNUT1JJQUxcIiwgXCJWaWV3XCIpO1xyXG4gIGNvbnN0IGNhbkNyZWF0ZVZpc2l0ID0gY2FuQWNjZXNzKFwiVklTSVRBU19DUkVBQ0lPTlwiLCBcIkFkZFwiKTtcclxuICBjb25zdCBub0RhdGFUZXh0ID0gaW5kVChcIkNvbW1vbl9Ob0RhdGFcIiwgXCJObyBkYXRhXCIpO1xyXG5cclxuICBjb25zdCBhY3RpdmF0b3JSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgcG9wb3ZlclJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBwYWdpbmF0aW9uUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XG5cclxuICBjb25zdCBbZmFiQm90dG9tLCBzZXRGYWJCb3R0b21dID0gdXNlU3RhdGUoRkFCX0JBU0VfQk9UVE9NKTtcblxuICBjb25zdCB7IHJlYWRDYWNoZWRGaWx0ZXIsIGNsZWFyRmlsdGVyQ2FjaGUsIGNvbnN1bWVSZXR1cm5GbGFnLCBzYXZlQ2FjaGVkRmlsdGVyIH0gPSB1c2VIaXN0b3J5RmlsdGVyQ2FjaGUoKTtcbiAgY29uc3Qge1xuICAgIHN0YXJ0RGF0ZSxcbiAgICBlbmREYXRlLFxuICAgIGhvdmVyRGF0ZSxcbiAgICBzZWxlY3RpbmdTdGVwLFxuICAgIGN1cnJlbnRNb250aCxcbiAgICBjdXJyZW50WWVhcixcbiAgICBpc09wZW4sXG4gICAgc2hvd01hbnVhbFBpY2tlclBhbmVsLFxuICAgIGFjdGl2ZVF1aWNrRmlsdGVyLFxuICAgIHNlbGVjdGVkQ2xpZW50LFxuICAgIGNsaWVudFJlc2V0S2V5LFxuICAgIHNob3dGaWx0ZXJzLFxuICAgIHNob3dNYW51YWxFcnJvcixcbiAgICBmcm9tRGF0ZVZhbHVlLFxuICAgIHRvRGF0ZVZhbHVlLFxuICAgIGFjY291bnROdW1WYWx1ZSxcbiAgICBoYXNSZXN0b3JlZEZpbHRlclJlZixcbiAgICBkaWRJbml0RmlsdGVyUmVmLFxuICAgIHNldEhvdmVyRGF0ZSxcbiAgICBzZXRTZWxlY3RpbmdTdGVwLFxuICAgIHNldEN1cnJlbnRNb250aCxcbiAgICBzZXRDdXJyZW50WWVhcixcbiAgICBzZXRJc09wZW4sXG4gICAgc2V0U2hvd0ZpbHRlcnMsXG4gICAgc2V0U2hvd01hbnVhbEVycm9yLFxuICAgIHZhbGlkYXRlTWFudWFsUmFuZ2UsXG4gICAgYXBwbHlEZWZhdWx0UmFuZ2VGcm9tUHJvcHMsXG4gICAgcmVzZXRIaXN0b3J5RmlsdGVycyxcbiAgICBhcHBseUNhY2hlZEZpbHRlcixcbiAgICBoYW5kbGVTZWxlY3QsXG4gICAgaGFuZGxlQ2xlYXJTdGF0ZSxcbiAgICBvcGVuUG9wb3ZlcixcbiAgICBoYW5kbGVBY3RpdmF0b3JLZXlEb3duLFxuICAgIGhhbmRsZVNlY3Rpb25LZXlEb3duLFxuICAgIGhhbmRsZVF1aWNrRmlsdGVyLFxuICAgIGhhbmRsZUNsaWVudFNlbGVjdGVkLFxuICB9ID0gdXNlSGlzdG9yeUZpbHRlcnNTdGF0ZSh7XG4gICAgZGVmYXVsdEZyb21EYXRlLFxuICAgIGRlZmF1bHRUb0RhdGUsXG4gICAgbG9nSGlzdG9yeSxcbiAgICBwYXJzZURhdGVWYWx1ZSxcbiAgICBwYXJzZUlTTyxcbiAgICB0b0lTTyxcbiAgICBzdGFydE9mRGF5LFxuICAgIGlzQmVmb3JlLFxuICB9KTtcblxuICBjb25zdCB7IGl0ZW1zLCB0b3RhbCwgY3VycmVudFBhZ2UsIGlzTG9hZGluZywgZXJyb3JNZXNzYWdlLCBsb2FkQWN0aXZpdGllcywgcmVzZXRBY3Rpdml0aWVzLCByZXRyeU9uTmV0d29ya0Vycm9yUmVmLCBsYXN0U2lnbmF0dXJlUmVmIH0gPVxuICAgIHVzZUhpc3RvcnlBY3Rpdml0aWVzKHtcbiAgICAgIGZyb21EYXRlVmFsdWUsXG4gICAgICB0b0RhdGVWYWx1ZSxcbiAgICAgIGFjY291bnROdW1WYWx1ZSxcbiAgICAgIHBhZ2VTaXplOiBQQUdFX1NJWkUsXG4gICAgICBub3JtYWxpemVSYW5nZSxcbiAgICAgIG9uRm9yYmlkZGVuOiBzaG93UGVybWlzc2lvbk1vZGFsLFxuICAgICAgb25EZWJ1ZzogbG9nSGlzdG9yeSxcbiAgICB9KTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGxvZ0hpc3RvcnkoXCJpbml0XCIsIHsgZGVmYXVsdEZyb21EYXRlLCBkZWZhdWx0VG9EYXRlIH0pO1xuICB9LCBbZGVmYXVsdEZyb21EYXRlLCBkZWZhdWx0VG9EYXRlXSk7XG5cclxuICBjb25zdCBhcHBseUZpbHRlcnMgPSB1c2VDYWxsYmFjayhcbiAgICAob3B0aW9ucz86IHsgY2xvc2VQYW5lbD86IGJvb2xlYW47IGZvcmNlPzogYm9vbGVhbjsgcGFnZT86IG51bWJlciB9KSA9PiB7XHJcbiAgICAgIGlmICghdmFsaWRhdGVNYW51YWxSYW5nZSgpKSByZXR1cm47XHJcbiAgICAgIGlmICghc3RhcnREYXRlIHx8ICFlbmREYXRlKSByZXR1cm47XHJcblxyXG4gICAgICBjb25zdCBub3JtYWxpemVkID0gbm9ybWFsaXplUmFuZ2UoZnJvbURhdGVWYWx1ZSwgdG9EYXRlVmFsdWUpO1xyXG4gICAgICBjb25zdCBwYWdlID0gb3B0aW9ucz8ucGFnZSA/PyAxO1xyXG4gICAgICBjb25zdCBzaWduYXR1cmUgPSBgJHtub3JtYWxpemVkLmZyb219fCR7bm9ybWFsaXplZC50b318JHthY2NvdW50TnVtVmFsdWV9fCR7cGFnZX1gO1xyXG5cclxuICAgICAgaWYgKG9wdGlvbnM/LmZvcmNlIHx8IGxhc3RTaWduYXR1cmVSZWYuY3VycmVudCAhPT0gc2lnbmF0dXJlKSB7XHJcbiAgICAgICAgbG9hZEFjdGl2aXRpZXMocGFnZSwgeyBmcm9tRGF0ZTogbm9ybWFsaXplZC5mcm9tLCB0b0RhdGU6IG5vcm1hbGl6ZWQudG8sIGFjY291bnROdW06IGFjY291bnROdW1WYWx1ZSB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2V0U2hvd01hbnVhbEVycm9yKGZhbHNlKTtcclxuICAgICAgaWYgKG9wdGlvbnM/LmNsb3NlUGFuZWwpIHtcclxuICAgICAgICBzZXRJc09wZW4oZmFsc2UpO1xyXG4gICAgICAgIHNldFNob3dGaWx0ZXJzKGZhbHNlKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFthY2NvdW50TnVtVmFsdWUsIGVuZERhdGUsIGZyb21EYXRlVmFsdWUsIGxvYWRBY3Rpdml0aWVzLCBzdGFydERhdGUsIHRvRGF0ZVZhbHVlLCB2YWxpZGF0ZU1hbnVhbFJhbmdlXVxyXG4gICk7XG5cbiAgY29uc3QgdG90YWxQYWdlcyA9IE1hdGguY2VpbCgodG90YWwgfHwgMCkgLyBQQUdFX1NJWkUpO1xuXG4gIC8vIEtlZXAgdGhlIGZsb2F0aW5nIGFjdGlvbiBidXR0b24gY2xlYXIgb2YgcGFnaW5hdGlvbiBvbiBzbWFsbCBzY3JlZW5zLlxuICBjb25zdCB1cGRhdGVGYWJCb3R0b20gPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKCFwYWdpbmF0aW9uUmVmLmN1cnJlbnQgfHwgdG90YWxQYWdlcyA8PSAxKSB7XG4gICAgICBzZXRGYWJCb3R0b20oRkFCX0JBU0VfQk9UVE9NKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgaGVpZ2h0ID0gcGFnaW5hdGlvblJlZi5jdXJyZW50Lm9mZnNldEhlaWdodCB8fCAwO1xuICAgIGNvbnN0IG5leHQgPSBNYXRoLm1heChGQUJfQkFTRV9CT1RUT00sIGhlaWdodCArIEZBQl9DTEVBUkFOQ0UgKyBGQUJfR0FQKTtcbiAgICBzZXRGYWJCb3R0b20oKHByZXYpID0+IChNYXRoLmFicyhwcmV2IC0gbmV4dCkgPCAxID8gcHJldiA6IG5leHQpKTtcbiAgfSwgW3RvdGFsUGFnZXNdKTtcblxuICB1c2VIaXN0b3J5UGFnZUxpc3RlbmVycyh7XG4gICAgaXNPcGVuLFxuICAgIGFjdGl2YXRvclJlZixcbiAgICBwb3BvdmVyUmVmLFxuICAgIHBhZ2luYXRpb25SZWYsXG4gICAgaGFzUmVzdG9yZWRGaWx0ZXJSZWYsXG4gICAgcmV0cnlPbk5ldHdvcmtFcnJvclJlZixcbiAgICBjdXJyZW50UGFnZSxcbiAgICB1cGRhdGVGYWJCb3R0b20sXG4gICAgbG9nSGlzdG9yeSxcbiAgICBjb25zdW1lUmV0dXJuRmxhZyxcbiAgICByZWFkQ2FjaGVkRmlsdGVyLFxuICAgIGFwcGx5Q2FjaGVkRmlsdGVyLFxuICAgIGxvYWRBY3Rpdml0aWVzLFxuICAgIHNldElzT3BlbixcbiAgICBzZXRIb3ZlckRhdGUsXG4gICAgc2V0U2hvd0ZpbHRlcnMsXG4gICAgYXBwbHlGaWx0ZXJzLFxuICB9KTtcblxuICAvLyBSZXN0b3JlIGNhY2hlZCBmaWx0ZXIgb24gaW5pdGlhbCBtb3VudCBvbmx5LlxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChkaWRJbml0RmlsdGVyUmVmLmN1cnJlbnQpIHJldHVybjtcbiAgICBkaWRJbml0RmlsdGVyUmVmLmN1cnJlbnQgPSB0cnVlO1xuICAgIGNvbnN0IGNhY2hlZCA9IGNvbnN1bWVSZXR1cm5GbGFnKCkgPyByZWFkQ2FjaGVkRmlsdGVyKCkgOiBudWxsO1xuICAgIGlmIChjYWNoZWQgJiYgY2FjaGVkLmZyb21EYXRlICYmIGNhY2hlZC50b0RhdGUpIHtcbiAgICAgIGxvZ0hpc3RvcnkoXCJyZXN0b3JlRmlsdGVyXCIsIGNhY2hlZCk7XG4gICAgICBjb25zdCBjYWNoZWRSZXF1ZXN0ID0gYXBwbHlDYWNoZWRGaWx0ZXIoY2FjaGVkKTtcbiAgICAgIGlmIChjYWNoZWRSZXF1ZXN0KSB7XG4gICAgICAgIHJldHJ5T25OZXR3b3JrRXJyb3JSZWYuY3VycmVudCA9IHRydWU7XG4gICAgICAgIGxvYWRBY3Rpdml0aWVzKGNhY2hlZFJlcXVlc3QucGFnZSwgY2FjaGVkUmVxdWVzdC5vdmVycmlkZSk7XG4gICAgICAgIHNldFNob3dGaWx0ZXJzKGZhbHNlKTtcbiAgICAgICAgc2V0SXNPcGVuKGZhbHNlKTtcbiAgICAgICAgaGFzUmVzdG9yZWRGaWx0ZXJSZWYuY3VycmVudCA9IHRydWU7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBkZWZhdWx0UmVxdWVzdCA9IGFwcGx5RGVmYXVsdFJhbmdlRnJvbVByb3BzKCk7XG4gICAgaWYgKGRlZmF1bHRSZXF1ZXN0KSB7XG4gICAgICByZXRyeU9uTmV0d29ya0Vycm9yUmVmLmN1cnJlbnQgPSB0cnVlO1xuICAgICAgbG9hZEFjdGl2aXRpZXMoZGVmYXVsdFJlcXVlc3QucGFnZSwgZGVmYXVsdFJlcXVlc3Qub3ZlcnJpZGUpO1xuICAgICAgc2V0U2hvd0ZpbHRlcnMoZmFsc2UpO1xuICAgICAgc2V0SXNPcGVuKGZhbHNlKTtcbiAgICAgIGhhc1Jlc3RvcmVkRmlsdGVyUmVmLmN1cnJlbnQgPSB0cnVlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHJlc2V0SGlzdG9yeUZpbHRlcnMoKTtcbiAgICBjbGVhckZpbHRlckNhY2hlKCk7XG4gICAgcmVzZXRBY3Rpdml0aWVzKCk7XG4gICAgc2V0U2hvd0ZpbHRlcnModHJ1ZSk7XG4gICAgc2V0SXNPcGVuKGZhbHNlKTtcbiAgfSwgW1xuICAgIGFwcGx5Q2FjaGVkRmlsdGVyLFxuICAgIGFwcGx5RGVmYXVsdFJhbmdlRnJvbVByb3BzLFxuICAgIGNsZWFyRmlsdGVyQ2FjaGUsXG4gICAgY29uc3VtZVJldHVybkZsYWcsXG4gICAgZGlkSW5pdEZpbHRlclJlZixcbiAgICBoYXNSZXN0b3JlZEZpbHRlclJlZixcbiAgICBsb2FkQWN0aXZpdGllcyxcbiAgICByZWFkQ2FjaGVkRmlsdGVyLFxuICAgIHJlc2V0QWN0aXZpdGllcyxcbiAgICByZXNldEhpc3RvcnlGaWx0ZXJzLFxuICAgIHJldHJ5T25OZXR3b3JrRXJyb3JSZWYsXG4gIF0pO1xuXHJcbiAgLy8gS2VlcCB0aGUgcGlja2VyIHN0ZXAgaW4gc3luYyB3aXRoIGN1cnJlbnQgc2VsZWN0aW9uLlxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoc3RhcnREYXRlICYmICFlbmREYXRlICYmIHNlbGVjdGluZ1N0ZXAgPT09IFwic3RhcnRcIikge1xyXG4gICAgICBzZXRTZWxlY3RpbmdTdGVwKFwiZW5kXCIpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoIXN0YXJ0RGF0ZSAmJiBzZWxlY3RpbmdTdGVwICE9PSBcInN0YXJ0XCIpIHtcclxuICAgICAgc2V0U2VsZWN0aW5nU3RlcChcInN0YXJ0XCIpO1xyXG4gICAgfVxyXG4gIH0sIFtzdGFydERhdGUsIGVuZERhdGUsIHNlbGVjdGluZ1N0ZXBdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQ2xlYXIgPSB1c2VDYWxsYmFjayhcbiAgICAoZXZlbnQ6IFJlYWN0Lk1vdXNlRXZlbnQpID0+IHtcbiAgICAgIGhhbmRsZUNsZWFyU3RhdGUoZXZlbnQpO1xuICAgICAgY2xlYXJGaWx0ZXJDYWNoZSgpO1xuICAgICAgcmVzZXRBY3Rpdml0aWVzKCk7XG4gICAgfSxcbiAgICBbY2xlYXJGaWx0ZXJDYWNoZSwgaGFuZGxlQ2xlYXJTdGF0ZSwgcmVzZXRBY3Rpdml0aWVzXVxuICApO1xuXG4gIGNvbnN0IGhhbmRsZVJlc2V0RmlsdGVycyA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICByZXNldEhpc3RvcnlGaWx0ZXJzKCk7XG4gICAgY2xlYXJGaWx0ZXJDYWNoZSgpO1xuICAgIHJlc2V0QWN0aXZpdGllcygpO1xuICAgIHNldElzT3BlbihmYWxzZSk7XG4gICAgc2V0U2hvd0ZpbHRlcnModHJ1ZSk7XG4gIH0sIFtjbGVhckZpbHRlckNhY2hlLCByZXNldEFjdGl2aXRpZXMsIHJlc2V0SGlzdG9yeUZpbHRlcnMsIHNldElzT3Blbiwgc2V0U2hvd0ZpbHRlcnNdKTtcblxyXG4gIGNvbnN0IGhhbmRsZU5hdmlnYXRlID0gdXNlQ2FsbGJhY2soXG4gICAgKGxpbmtJZDogc3RyaW5nKSA9PiB7XG4gICAgICBpZiAoIWNhblZpZXdIaXN0b3J5KSB7XG4gICAgICAgIHNob3dQZXJtaXNzaW9uTW9kYWwoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHNhdmVDYWNoZWRGaWx0ZXIoe1xuICAgICAgICAgIGZyb21EYXRlOiBmcm9tRGF0ZVZhbHVlIHx8IFwiXCIsXG4gICAgICAgICAgdG9EYXRlOiB0b0RhdGVWYWx1ZSB8fCBcIlwiLFxuICAgICAgICAgIHBhZ2U6IGN1cnJlbnRQYWdlLFxuICAgICAgICAgIGNsaWVudEFjY291bnQ6IHNlbGVjdGVkQ2xpZW50Py52YWx1ZSB8fCBcIlwiLFxuICAgICAgICAgIGNsaWVudFRleHQ6IHNlbGVjdGVkQ2xpZW50Py50ZXh0IHx8IFwiXCIsXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCB0YXJnZXQgPSBlbmNvZGVVUklDb21wb25lbnQobGlua0lkKTtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBgL1Zpc2l0YXMvRGV0YWxsZS8ke3RhcmdldH1gO1xuICAgICAgfSwgTkFWX0RFTEFZX01TKTtcbiAgICB9LFxuICAgIFtjYW5WaWV3SGlzdG9yeSwgY3VycmVudFBhZ2UsIGZyb21EYXRlVmFsdWUsIHNhdmVDYWNoZWRGaWx0ZXIsIHRvRGF0ZVZhbHVlLCBzZWxlY3RlZENsaWVudF1cbiAgKTtcblxyXG4gIGNvbnN0IGNhbGVuZGFyID0gdXNlTWVtbygoKSA9PiB7XHJcbiAgICBjb25zdCBmaXJzdERheSA9IG5ldyBEYXRlKGN1cnJlbnRZZWFyLCBjdXJyZW50TW9udGgsIDEpO1xyXG4gICAgY29uc3QgZGF5c0luTW9udGggPSBuZXcgRGF0ZShjdXJyZW50WWVhciwgY3VycmVudE1vbnRoICsgMSwgMCkuZ2V0RGF0ZSgpO1xyXG4gICAgY29uc3Qgb2Zmc2V0ID0gKGZpcnN0RGF5LmdldERheSgpICsgNikgJSA3O1xyXG4gICAgY29uc3QgY2VsbHM6IENhbGVuZGFyQ2VsbFtdID0gW107XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9mZnNldDsgaSsrKSB7XHJcbiAgICAgIGNlbGxzLnB1c2goeyBkYXRlOiBudWxsLCBpc286IFwiXCIsIGlzRW1wdHk6IHRydWUgfSk7XHJcbiAgICB9XHJcbiAgICBmb3IgKGxldCBkID0gMTsgZCA8PSBkYXlzSW5Nb250aDsgZCsrKSB7XHJcbiAgICAgIGNvbnN0IGRhdGVPYmogPSBuZXcgRGF0ZShjdXJyZW50WWVhciwgY3VycmVudE1vbnRoLCBkKTtcclxuICAgICAgY2VsbHMucHVzaCh7IGRhdGU6IGRhdGVPYmosIGlzbzogdG9JU08oZGF0ZU9iaiksIGlzRW1wdHk6IGZhbHNlIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgY2VsbHMsXHJcbiAgICAgIGxhYmVsOiBmb3JtYXRNb250aExhYmVsKGZpcnN0RGF5LCBsb2NhbGUpLFxyXG4gICAgfTtcclxuICB9LCBbY3VycmVudE1vbnRoLCBjdXJyZW50WWVhciwgbG9jYWxlXSk7XHJcblxyXG4gIGNvbnN0IHByZXZpZXdFbmQgPSBlbmREYXRlIHx8IChzZWxlY3RpbmdTdGVwID09PSBcImVuZFwiID8gaG92ZXJEYXRlIDogbnVsbCk7XG5cbiAgY29uc3QgaGFuZGxlUHJldk1vbnRoID0gdXNlQ2FsbGJhY2soXG4gICAgKGV2ZW50OiBSZWFjdC5Nb3VzZUV2ZW50PEhUTUxCdXR0b25FbGVtZW50PikgPT4ge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBzZXRDdXJyZW50TW9udGgoKHByZXYpID0+IHtcbiAgICAgICAgY29uc3QgbmV4dCA9IHByZXYgLSAxO1xuICAgICAgICBpZiAobmV4dCA8IDApIHtcbiAgICAgICAgICBzZXRDdXJyZW50WWVhcigoeWVhcikgPT4geWVhciAtIDEpO1xuICAgICAgICAgIHJldHVybiAxMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgW3NldEN1cnJlbnRNb250aCwgc2V0Q3VycmVudFllYXJdXG4gICk7XG5cbiAgY29uc3QgaGFuZGxlTmV4dE1vbnRoID0gdXNlQ2FsbGJhY2soXG4gICAgKGV2ZW50OiBSZWFjdC5Nb3VzZUV2ZW50PEhUTUxCdXR0b25FbGVtZW50PikgPT4ge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBzZXRDdXJyZW50TW9udGgoKHByZXYpID0+IHtcbiAgICAgICAgY29uc3QgbmV4dCA9IHByZXYgKyAxO1xuICAgICAgICBpZiAobmV4dCA+IDExKSB7XG4gICAgICAgICAgc2V0Q3VycmVudFllYXIoKHllYXIpID0+IHllYXIgKyAxKTtcbiAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgW3NldEN1cnJlbnRNb250aCwgc2V0Q3VycmVudFllYXJdXG4gICk7XG5cbiAgY29uc3QgaGFuZGxlR3JpZE1vdXNlTGVhdmUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgc2V0SG92ZXJEYXRlKG51bGwpO1xuICB9LCBbc2V0SG92ZXJEYXRlXSk7XG5cbiAgY29uc3QgaGFuZGxlTWFudWFsRGF5Q2xpY2sgPSB1c2VDYWxsYmFjayhcbiAgICAoY2VsbDogSGlzdG9yeU1hbnVhbERheUNlbGwpID0+IHtcbiAgICAgIGlmICghY2VsbC5kYXRlKSByZXR1cm47XG4gICAgICBsb2dIaXN0b3J5KFwiZGF5Q2xpY2tcIiwgeyBkYXRlOiBjZWxsLmlzbyB8fCBcIlwiLCBkaXNhYmxlZDogISFjZWxsLmRpc2FibGVkIH0pO1xuICAgICAgaGFuZGxlU2VsZWN0KGNlbGwuZGF0ZSk7XG4gICAgfSxcbiAgICBbaGFuZGxlU2VsZWN0XVxuICApO1xuXG4gIGNvbnN0IGhhbmRsZU1hbnVhbERheUhvdmVyID0gdXNlQ2FsbGJhY2soXG4gICAgKGNlbGw6IEhpc3RvcnlNYW51YWxEYXlDZWxsKSA9PiB7XG4gICAgICBpZiAoIWNlbGwuZGF0ZSkgcmV0dXJuO1xuICAgICAgaWYgKHNlbGVjdGluZ1N0ZXAgPT09IFwiZW5kXCIgJiYgc3RhcnREYXRlKSB7XG4gICAgICAgIHNldEhvdmVyRGF0ZShuZXcgRGF0ZShjZWxsLmRhdGUpKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIFtzZWxlY3RpbmdTdGVwLCBzZXRIb3ZlckRhdGUsIHN0YXJ0RGF0ZV1cbiAgKTtcblxuICBjb25zdCBtYW51YWxEYXlDZWxscyA9IHVzZU1lbW88SGlzdG9yeU1hbnVhbERheUNlbGxbXT4oKCkgPT4ge1xuICAgIHJldHVybiBjYWxlbmRhci5jZWxscy5tYXAoKGNlbGwsIGlkeCkgPT4ge1xuICAgICAgaWYgKGNlbGwuaXNFbXB0eSkge1xuICAgICAgICByZXR1cm4geyBrZXk6IGBlbXB0eS0ke2lkeH1gLCBpc0VtcHR5OiB0cnVlIH07XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGRhdGVPYmogPSBjZWxsLmRhdGUgYXMgRGF0ZTtcbiAgICAgIGNvbnN0IGlzU3RhcnQgPSBzYW1lRGF5KGRhdGVPYmosIHN0YXJ0RGF0ZSk7XG4gICAgICBjb25zdCBpc0VuZCA9IHNhbWVEYXkoZGF0ZU9iaiwgZW5kRGF0ZSk7XG4gICAgICBjb25zdCBpblJhbmdlID0gc3RhcnREYXRlICYmIHByZXZpZXdFbmQgJiYgaXNCZWZvcmUoc3RhcnREYXRlLCBkYXRlT2JqKSAmJiBpc0JlZm9yZShkYXRlT2JqLCBwcmV2aWV3RW5kKTtcbiAgICAgIGNvbnN0IGhvdmVyUmFuZ2UgPSBzdGFydERhdGUgJiYgIWVuZERhdGUgJiYgaG92ZXJEYXRlICYmIGlzQmVmb3JlKHN0YXJ0RGF0ZSwgZGF0ZU9iaikgJiYgaXNCZWZvcmUoZGF0ZU9iaiwgaG92ZXJEYXRlKTtcbiAgICAgIGNvbnN0IGRpc2FibGVkID0gc2VsZWN0aW5nU3RlcCA9PT0gXCJlbmRcIiAmJiAhIXN0YXJ0RGF0ZSAmJiBpc0JlZm9yZShkYXRlT2JqLCBzdGFydERhdGUpO1xuICAgICAgY29uc3QgaXNUb2RheSA9IHNhbWVEYXkoZGF0ZU9iaiwgbmV3IERhdGUoKSk7XG5cbiAgICAgIGNvbnN0IGRheUNsYXNzID0gY2xhc3NOYW1lcyhcbiAgICAgICAgXCJkcnAtZGF5XCIsXG4gICAgICAgIGlzU3RhcnQgPyBcInN0YXJ0IHJhbmdlLXN0YXJ0XCIgOiBcIlwiLFxuICAgICAgICBpc0VuZCA/IFwiZW5kIHJhbmdlLWVuZFwiIDogXCJcIixcbiAgICAgICAgaW5SYW5nZSA/IFwiaW4tcmFuZ2VcIiA6IFwiXCIsXG4gICAgICAgIGhvdmVyUmFuZ2UgPyBcImhvdmVyLXJhbmdlXCIgOiBcIlwiLFxuICAgICAgICBkaXNhYmxlZCA/IFwiZGlzYWJsZWRcIiA6IFwiXCIsXG4gICAgICAgIGlzVG9kYXkgPyBcInRvZGF5XCIgOiBcIlwiXG4gICAgICApO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBrZXk6IGNlbGwuaXNvLFxuICAgICAgICBpc0VtcHR5OiBmYWxzZSxcbiAgICAgICAgZGF0ZTogZGF0ZU9iaixcbiAgICAgICAgaXNvOiBjZWxsLmlzbyxcbiAgICAgICAgZGF5TGFiZWw6IGRhdGVPYmouZ2V0RGF0ZSgpLFxuICAgICAgICBkYXlDbGFzcyxcbiAgICAgICAgZGlzYWJsZWQsXG4gICAgICB9O1xuICAgIH0pO1xuICB9LCBbY2FsZW5kYXIuY2VsbHMsIGVuZERhdGUsIGhvdmVyRGF0ZSwgcHJldmlld0VuZCwgc2VsZWN0aW5nU3RlcCwgc3RhcnREYXRlXSk7XG5cclxuICBjb25zdCB7IHRpbWVsaW5lSXRlbXMgfSA9IHVzZUhpc3RvcnlUaW1lbGluZUl0ZW1zKHtcbiAgICBpdGVtcyxcbiAgICBsb2NhbGUsXG4gICAgbm9EYXRhVGV4dCxcbiAgICBsb2dIaXN0b3J5LFxuICAgIHRvVGl0bGVDYXNlLFxuICAgIGZvcm1hdERhdGVQYXJ0cyxcbiAgfSk7XG5cclxuICBjb25zdCBsYWJlbEZyb20gPSB0b1NlbnRlbmNlQ2FzZShpbmRUKFwiSGlzdG9yeV9Gcm9tXCIsIFwiRnJvbVwiKSwgbG9jYWxlKTtcbiAgY29uc3QgbGFiZWxUbyA9IHRvU2VudGVuY2VDYXNlKGluZFQoXCJIaXN0b3J5X1RvXCIsIFwiVG9cIiksIGxvY2FsZSk7XG4gIGNvbnN0IHN1bW1hcnlGcm9tID0gbGFiZWxGcm9tO1xuICBjb25zdCBzdW1tYXJ5VG8gPSBsYWJlbFRvO1xuICBjb25zdCBmaWx0ZXJUaXRsZSA9IGluZFQoXCJIaXN0b3J5X0ZpbHRlcl9EYXRlXCIsIFwiRGF0ZVwiKTtcbiAgY29uc3QgYWRkRGF0ZUxhYmVsID0gaW5kVChcIkhpc3RvcnlfQWRkRGF0ZVwiLCBcIkFkZCBkYXRlXCIpO1xuICBjb25zdCBjbGVhclJhbmdlTGFiZWwgPSBpbmRUKFwiSGlzdG9yeV9DbGVhclJhbmdlXCIsIFwiQ2xlYXIgcmFuZ2VcIik7XG4gIGNvbnN0IHByZXZNb250aExhYmVsID0gaW5kVChcIkhpc3RvcnlfUHJldk1vbnRoXCIsIFwiUHJldmlvdXMgbW9udGhcIik7XG4gIGNvbnN0IG5leHRNb250aExhYmVsID0gaW5kVChcIkhpc3RvcnlfTmV4dE1vbnRoXCIsIFwiTmV4dCBtb250aFwiKTtcbiAgY29uc3Qgc3RhdHVzU2VsZWN0U3RhcnRMYWJlbCA9IGluZFQoXCJIaXN0b3J5X1N0YXR1c19TZWxlY3RTdGFydFwiLCBcIlNlbGVjdCBzdGFydCBkYXRlXCIpO1xuICBjb25zdCBzdGF0dXNTZWxlY3RFbmRMYWJlbCA9IGluZFQoXCJIaXN0b3J5X1N0YXR1c19TZWxlY3RFbmRcIiwgXCJTZWxlY3QgZW5kIGRhdGVcIik7XG4gIGNvbnN0IHdlZWtEYXlMYWJlbHMgPSB1c2VNZW1vKFxuICAgICgpID0+IFtcbiAgICAgIGluZFQoXCJIaXN0b3J5X0RheV9Nb25cIiwgXCJNb25cIiksXG4gICAgICBpbmRUKFwiSGlzdG9yeV9EYXlfVHVlXCIsIFwiVHVlXCIpLFxuICAgICAgaW5kVChcIkhpc3RvcnlfRGF5X1dlZFwiLCBcIldlZFwiKSxcbiAgICAgIGluZFQoXCJIaXN0b3J5X0RheV9UaHVcIiwgXCJUaHVcIiksXG4gICAgICBpbmRUKFwiSGlzdG9yeV9EYXlfRnJpXCIsIFwiRnJpXCIpLFxuICAgICAgaW5kVChcIkhpc3RvcnlfRGF5X1NhdFwiLCBcIlNhdFwiKSxcbiAgICAgIGluZFQoXCJIaXN0b3J5X0RheV9TdW5cIiwgXCJTdW5cIiksXG4gICAgXSxcbiAgICBbXVxuICApO1xuICBjb25zdCBjbGVhckxhYmVsID0gaW5kVChcIkhpc3RvcnlfRmlsdGVyX0NsZWFyXCIsIFwiQ2xlYXJcIik7XG4gIGNvbnN0IGFwcGx5TGFiZWwgPSBpbmRUKFwiSGlzdG9yeV9GaWx0ZXJfQXBwbHlcIiwgXCJBcHBseVwiKTtcbiAgY29uc3QgY2xpZW50TGFiZWwgPSBpbmRUKFwiSGlzdG9yeV9GaWx0ZXJfQ2xpZW50XCIsIFwiQ2xpZW50XCIpO1xyXG4gIGNvbnN0IHF1aWNrQ3VzdG9tTGFiZWwgPSBpbmRUKFwiSGlzdG9yeV9RdWlja19DdXN0b21cIiwgXCJEYXRlXCIpO1xuICBjb25zdCBxdWljazdEYXlzTGFiZWwgPSBpbmRUKFwiSGlzdG9yeV9RdWlja183RGF5c1wiLCBcIjcgZGF5c1wiKTtcbiAgY29uc3QgcXVpY2szMERheXNMYWJlbCA9IGluZFQoXCJIaXN0b3J5X1F1aWNrXzMwRGF5c1wiLCBcIjMwIGRheXNcIik7XG4gIGNvbnN0IHF1aWNrOTBEYXlzTGFiZWwgPSBpbmRUKFwiSGlzdG9yeV9RdWlja185MERheXNcIiwgXCI5MCBkYXlzXCIpO1xuICBjb25zdCBwYWdlRmlyc3RMYWJlbCA9IGluZFQoXCJIaXN0b3J5X1BhZ2VfRmlyc3RcIiwgXCJGaXJzdFwiKTtcbiAgY29uc3QgcGFnZVByZXZMYWJlbCA9IGluZFQoXCJIaXN0b3J5X1BhZ2VfUHJldlwiLCBcIlByZXZpb3VzXCIpO1xuICBjb25zdCBwYWdlTmV4dExhYmVsID0gaW5kVChcIkhpc3RvcnlfUGFnZV9OZXh0XCIsIFwiTmV4dFwiKTtcbiAgY29uc3QgcGFnZUxhc3RMYWJlbCA9IGluZFQoXCJIaXN0b3J5X1BhZ2VfTGFzdFwiLCBcIkxhc3RcIik7XG4gIGNvbnN0IHF1aWNrRmlsdGVycyA9IHVzZU1lbW8oXG4gICAgKCkgPT4gW1xuICAgICAgeyBpZDogXCJjdXN0b21cIiBhcyBjb25zdCwgbGFiZWw6IHF1aWNrQ3VzdG9tTGFiZWwgfSxcbiAgICAgIHsgaWQ6IFwiZGF5cy03XCIgYXMgY29uc3QsIGxhYmVsOiBxdWljazdEYXlzTGFiZWwgfSxcbiAgICAgIHsgaWQ6IFwiZGF5cy0zMFwiIGFzIGNvbnN0LCBsYWJlbDogcXVpY2szMERheXNMYWJlbCB9LFxuICAgICAgeyBpZDogXCJkYXlzLTkwXCIgYXMgY29uc3QsIGxhYmVsOiBxdWljazkwRGF5c0xhYmVsIH0sXG4gICAgXSxcbiAgICBbcXVpY2szMERheXNMYWJlbCwgcXVpY2s3RGF5c0xhYmVsLCBxdWljazkwRGF5c0xhYmVsLCBxdWlja0N1c3RvbUxhYmVsXVxuICApO1xuICBjb25zdCBwYWdpbmF0aW9uTGFiZWxzID0gdXNlTWVtbyhcbiAgICAoKSA9PiAoe1xuICAgICAgZmlyc3Q6IHBhZ2VGaXJzdExhYmVsLFxuICAgICAgcHJldjogcGFnZVByZXZMYWJlbCxcbiAgICAgIG5leHQ6IHBhZ2VOZXh0TGFiZWwsXG4gICAgICBsYXN0OiBwYWdlTGFzdExhYmVsLFxuICAgIH0pLFxuICAgIFtwYWdlRmlyc3RMYWJlbCwgcGFnZUxhc3RMYWJlbCwgcGFnZU5leHRMYWJlbCwgcGFnZVByZXZMYWJlbF1cbiAgKTtcbiAgY29uc3Qgc2hvd0ZpbHRlckFjdGlvbnMgPSBzaG93RmlsdGVycztcbiAgY29uc3Qgc2hvd1N1bW1hcnkgPSAhc2hvd0ZpbHRlcnMgJiYgISFzdGFydERhdGUgJiYgISFlbmREYXRlO1xuICBjb25zdCBzaG93UmVzdWx0cyA9ICFzaG93RmlsdGVycztcbiAgY29uc3Qgc2hvd01hbnVhbFBpY2tlciA9IGFjdGl2ZVF1aWNrRmlsdGVyID09PSBcImN1c3RvbVwiICYmIHNob3dNYW51YWxQaWNrZXJQYW5lbDtcbiAgY29uc3Qgc2hvd0lubGluZVN1bW1hcnkgPSAhIXN0YXJ0RGF0ZSAmJiAhIWVuZERhdGUgJiYgIXNob3dNYW51YWxQaWNrZXI7XG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJtYXgtdy0zeGwgbXgtYXV0byBweC0xIHNtOnB4LTIgcHQtMyBwYi00IHNwYWNlLXktMlwiPlxyXG4gICAgICB7c2hvd1N1bW1hcnkgJiYgKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpbHRlci1jYXJkIGZpbHRlci1jYXJkLS1zdW1tYXJ5IHAtMyBzbTpwLTQgbXQtMSBtYi0zXCI+XG4gICAgICAgICAgPEhpc3RvcnlTdW1tYXJ5XG4gICAgICAgICAgICBzdW1tYXJ5RnJvbUxhYmVsPXtzdW1tYXJ5RnJvbX1cbiAgICAgICAgICAgIHN1bW1hcnlUb0xhYmVsPXtzdW1tYXJ5VG99XG4gICAgICAgICAgICBmcm9tVmFsdWU9e3N0YXJ0RGF0ZSA/IGZvcm1hdERpc3BsYXkoc3RhcnREYXRlLCBsb2NhbGUpIDogXCItLVwifVxuICAgICAgICAgICAgdG9WYWx1ZT17ZW5kRGF0ZSA/IGZvcm1hdERpc3BsYXkoZW5kRGF0ZSwgbG9jYWxlKSA6IFwiLS1cIn1cbiAgICAgICAgICAgIGNsaWVudExhYmVsPXtjbGllbnRMYWJlbH1cbiAgICAgICAgICAgIGNsaWVudFZhbHVlPXtzZWxlY3RlZENsaWVudD8udGV4dCB8fCBcIlwifVxuICAgICAgICAgICAgc2hvd0NsaWVudD17ISFzZWxlY3RlZENsaWVudH1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG4gICAgICB7c2hvd0ZpbHRlcnMgJiYgKFxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpbHRlci1jYXJkIGZpbHRlci1jYXJkLS1leHBhbmRlZCBwLTIgc206cC0yLjUgcmVsYXRpdmVcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMS41IGhpc3RvcnktZmlsdGVyLXN0YWNrIGZsZXggZmxleC1jb2xcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBnYXAtMiBoaXN0b3J5LXF1aWNrLWZpbHRlcnNcIiBhcmlhLWxhYmVsPXtmaWx0ZXJUaXRsZX0+XG4gICAgICAgICAgICB7cXVpY2tGaWx0ZXJzLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBpc0FjdGl2ZSA9IGFjdGl2ZVF1aWNrRmlsdGVyID09PSBpdGVtLmlkO1xuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxGaWx0ZXJCdXR0b25cbiAgICAgICAgICAgICAgICAgIGtleT17aXRlbS5pZH1cbiAgICAgICAgICAgICAgICAgIGxhYmVsPXtpdGVtLmxhYmVsfVxuICAgICAgICAgICAgICAgICAgYWN0aXZlPXtpc0FjdGl2ZX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbFwiXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVRdWlja0ZpbHRlcihpdGVtLmlkKX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSl9XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7c2hvd0lubGluZVN1bW1hcnkgJiYgKFxuICAgICAgICAgICAgPEhpc3RvcnlTdW1tYXJ5XG4gICAgICAgICAgICAgIHN1bW1hcnlGcm9tTGFiZWw9e3N1bW1hcnlGcm9tfVxuICAgICAgICAgICAgICBzdW1tYXJ5VG9MYWJlbD17c3VtbWFyeVRvfVxuICAgICAgICAgICAgICBmcm9tVmFsdWU9e3N0YXJ0RGF0ZSA/IGZvcm1hdERpc3BsYXkoc3RhcnREYXRlLCBsb2NhbGUpIDogXCItLVwifVxuICAgICAgICAgICAgICB0b1ZhbHVlPXtlbmREYXRlID8gZm9ybWF0RGlzcGxheShlbmREYXRlLCBsb2NhbGUpIDogXCItLVwifVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJnYXAteS0xIHRleHQtWzExcHhdIHB4LTFcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApfVxuXG4gICAgICAgICAge3Nob3dNYW51YWxQaWNrZXIgJiYgKFxuICAgICAgICAgICAgPEhpc3RvcnlNYW51YWxEYXRlUGlja2VyXG4gICAgICAgICAgICAgIGFjdGl2YXRvclJlZj17YWN0aXZhdG9yUmVmfVxuICAgICAgICAgICAgICBwb3BvdmVyUmVmPXtwb3BvdmVyUmVmfVxuICAgICAgICAgICAgICBzaG93TWFudWFsRXJyb3I9e3Nob3dNYW51YWxFcnJvcn1cbiAgICAgICAgICAgICAgc2hvd1N0YXJ0RXJyb3I9e3Nob3dNYW51YWxFcnJvciAmJiAhc3RhcnREYXRlfVxuICAgICAgICAgICAgICBzaG93RW5kRXJyb3I9e3Nob3dNYW51YWxFcnJvciAmJiAhZW5kRGF0ZX1cbiAgICAgICAgICAgICAgZmlsdGVyVGl0bGU9e2ZpbHRlclRpdGxlfVxuICAgICAgICAgICAgICBpc09wZW49e2lzT3Blbn1cbiAgICAgICAgICAgICAgc2VsZWN0aW5nU3RlcD17c2VsZWN0aW5nU3RlcH1cbiAgICAgICAgICAgICAgbGFiZWxGcm9tPXtsYWJlbEZyb219XG4gICAgICAgICAgICAgIGxhYmVsVG89e2xhYmVsVG99XG4gICAgICAgICAgICAgIHN0YXJ0RGF0ZVRleHQ9e3N0YXJ0RGF0ZSA/IGZvcm1hdERpc3BsYXkoc3RhcnREYXRlLCBsb2NhbGUpIDogYWRkRGF0ZUxhYmVsfVxuICAgICAgICAgICAgICBlbmREYXRlVGV4dD17ZW5kRGF0ZSA/IGZvcm1hdERpc3BsYXkoZW5kRGF0ZSwgbG9jYWxlKSA6IGFkZERhdGVMYWJlbH1cbiAgICAgICAgICAgICAgY2xlYXJSYW5nZUxhYmVsPXtjbGVhclJhbmdlTGFiZWx9XG4gICAgICAgICAgICAgIGhhc1NlbGVjdGVkUmFuZ2U9eyEhc3RhcnREYXRlIHx8ICEhZW5kRGF0ZX1cbiAgICAgICAgICAgICAgbW9udGhMYWJlbD17Y2FsZW5kYXIubGFiZWx9XG4gICAgICAgICAgICAgIHdlZWtEYXlMYWJlbHM9e3dlZWtEYXlMYWJlbHN9XG4gICAgICAgICAgICAgIHN0YXR1c1RleHQ9e3NlbGVjdGluZ1N0ZXAgPT09IFwic3RhcnRcIiA/IHN0YXR1c1NlbGVjdFN0YXJ0TGFiZWwgOiBzdGF0dXNTZWxlY3RFbmRMYWJlbH1cbiAgICAgICAgICAgICAgZGF5Q2VsbHM9e21hbnVhbERheUNlbGxzfVxuICAgICAgICAgICAgICBwcmV2TW9udGhMYWJlbD17cHJldk1vbnRoTGFiZWx9XG4gICAgICAgICAgICAgIG5leHRNb250aExhYmVsPXtuZXh0TW9udGhMYWJlbH1cbiAgICAgICAgICAgICAgb25PcGVuUG9wb3Zlcj17b3BlblBvcG92ZXJ9XG4gICAgICAgICAgICAgIG9uQWN0aXZhdG9yS2V5RG93bj17aGFuZGxlQWN0aXZhdG9yS2V5RG93bn1cbiAgICAgICAgICAgICAgb25TZWN0aW9uS2V5RG93bj17aGFuZGxlU2VjdGlvbktleURvd259XG4gICAgICAgICAgICAgIG9uQ2xlYXI9e2hhbmRsZUNsZWFyfVxuICAgICAgICAgICAgICBvblByZXZNb250aD17aGFuZGxlUHJldk1vbnRofVxuICAgICAgICAgICAgICBvbk5leHRNb250aD17aGFuZGxlTmV4dE1vbnRofVxuICAgICAgICAgICAgICBvbkdyaWRNb3VzZUxlYXZlPXtoYW5kbGVHcmlkTW91c2VMZWF2ZX1cbiAgICAgICAgICAgICAgb25EYXlDbGljaz17aGFuZGxlTWFudWFsRGF5Q2xpY2t9XG4gICAgICAgICAgICAgIG9uRGF5SG92ZXI9e2hhbmRsZU1hbnVhbERheUhvdmVyfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApfVxuXHJcbiAgICAgICAgICA8Q2xpZW50U2VhcmNoQ29tYm9ib3hcclxuICAgICAgICAgICAga2V5PXtjbGllbnRSZXNldEtleX1cclxuICAgICAgICAgICAgdmFsdWU9e3NlbGVjdGVkQ2xpZW50fVxyXG4gICAgICAgICAgICBvblNlbGVjdGVkPXtoYW5kbGVDbGllbnRTZWxlY3RlZH1cclxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJIaXN0b3J5X0ZpbHRlcl9DbGllbnRcIiwgXCJDbGllbnRcIil9XHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiSGlzdG9yeV9GaWx0ZXJfQ2xpZW50XCIsIFwiQ2xpZW50XCIpfVxyXG4gICAgICAgICAgICB2YXJpYW50PVwiY29tcGFjdFwiXHJcbiAgICAgICAgICAgIHNob3dMYWJlbD17ZmFsc2V9XHJcbiAgICAgICAgICAgIGlkQmFzZT1cImhpc3RvcnktY2xpZW50XCJcclxuICAgICAgICAgICAgcG9ydGFsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcclxuICAgICAgICAgIC8+XHJcblxyXG4gICAgICAgICAge3Nob3dGaWx0ZXJBY3Rpb25zICYmIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC0xIGdyaWQgZ3JpZC1jb2xzLTIgZ2FwLTIgaGlzdG9yeS1maWx0ZXItYWN0aW9uc1wiPlxuICAgICAgICAgICAgICA8QWN0aW9uQnV0dG9uXG4gICAgICAgICAgICAgICAgbGFiZWw9e2NsZWFyTGFiZWx9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsXCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVSZXNldEZpbHRlcnN9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDxBY3Rpb25CdXR0b25cbiAgICAgICAgICAgICAgICBsYWJlbD17YXBwbHlMYWJlbH1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGxcIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgIGFwcGx5RmlsdGVycyh7IGNsb3NlUGFuZWw6IHRydWUsIHBhZ2U6IDEgfSk7XG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgKX1cclxuXHJcbiAgICAgIDxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgaWQ9XCJmcm9tRGF0ZVwiIHZhbHVlPXtmcm9tRGF0ZVZhbHVlfSByZWFkT25seSAvPlxyXG4gICAgICA8aW5wdXQgdHlwZT1cImhpZGRlblwiIGlkPVwidG9EYXRlXCIgdmFsdWU9e3RvRGF0ZVZhbHVlfSByZWFkT25seSAvPlxyXG5cclxuICAgICAgPGRpdlxyXG4gICAgICAgIGlkPVwicmVzdWx0c0xvYWRlclwiXHJcbiAgICAgICAgY2xhc3NOYW1lPVwibG9hZGVyLWJveCBnbGFzcy1wYW5lbCBzaGFkb3ctY2FyZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0ZXh0LXNtIHRleHQtc2xhdGUtNzAwXCJcclxuICAgICAgICBzdHlsZT17eyBkaXNwbGF5OiBpc0xvYWRpbmcgPyBcImZsZXhcIiA6IFwibm9uZVwiIH19XHJcbiAgICAgID5cclxuICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cImluZC1zcGlubmVyIGgtNSB3LTVcIiB2aWV3Qm94PVwiMCAwIDIwIDIwXCIgcm9sZT1cInN0YXR1c1wiIGFyaWEtbGFiZWw9e2luZFQoXCJIaXN0b3J5X0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfT5cclxuICAgICAgICAgIDxjaXJjbGUgY2xhc3NOYW1lPVwiaW5kLXNwaW5uZXJfX2NpcmNsZVwiIGN4PVwiMTBcIiBjeT1cIjEwXCIgcj1cIjhcIiBzdHJva2VXaWR0aD1cIjJcIiAvPlxyXG4gICAgICAgIDwvc3ZnPlxyXG4gICAgICAgIHtpbmRUKFwiSGlzdG9yeV9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX1cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICB7c2hvd1Jlc3VsdHMgJiYgKFxyXG4gICAgICAgIDw+XHJcbiAgICAgICAgICA8SGlzdG9yeVRhYmxlXHJcbiAgICAgICAgICAgIGl0ZW1zPXt0aW1lbGluZUl0ZW1zfVxyXG4gICAgICAgICAgICBub0RhdGFUZXh0PXtpbmRUKFwiSGlzdG9yeV9Ob0RhdGFJblJhbmdlXCIsIFwiTm8gdmlzaXRzIGluIHRoaXMgcmFuZ2VcIil9XHJcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZT17ZXJyb3JNZXNzYWdlfVxyXG4gICAgICAgICAgICBvbk5hdmlnYXRlPXtoYW5kbGVOYXZpZ2F0ZX1cclxuICAgICAgICAgIC8+XHJcblxyXG4gICAgICAgICAgPENvbXBhY3RQYWdpbmF0aW9uXG4gICAgICAgICAgICByZWY9e3BhZ2luYXRpb25SZWZ9XG4gICAgICAgICAgICB0b3RhbFBhZ2VzPXt0b3RhbFBhZ2VzfVxuICAgICAgICAgICAgY3VycmVudFBhZ2U9e2N1cnJlbnRQYWdlfVxuICAgICAgICAgICAgcGFnZVdpbmRvdz17UEFHRV9XSU5ET1d9XG4gICAgICAgICAgICBsb2FkaW5nPXtpc0xvYWRpbmd9XG4gICAgICAgICAgICBvblBhZ2VDaGFuZ2U9eyhwYWdlKSA9PiBsb2FkQWN0aXZpdGllcyhwYWdlKX1cbiAgICAgICAgICAgIGxhYmVscz17cGFnaW5hdGlvbkxhYmVsc31cbiAgICAgICAgICAvPlxuICAgICAgICA8Lz5cbiAgICAgICl9XG4gICAgICB7Y2FuQ3JlYXRlVmlzaXQgJiYgKFxyXG4gICAgICAgIDxGbG9hdGluZ0FjdGlvbkJ1dHRvblxuICAgICAgICAgIHJvdXRlPVwiL1Zpc2l0YXMvQ3JlYXRlP2ZyZXNoPTFcIlxuICAgICAgICAgIGFyaWFMYWJlbD17aW5kVChcIkNvbW1vbl9DcmVhdGVcIiwgXCJDcmVhdGVcIil9XG4gICAgICAgICAgc2l6ZT17NzZ9XG4gICAgICAgICAgcmlnaHQ9ezE2fVxuICAgICAgICAgIGJvdHRvbT17ZmFiQm90dG9tfVxuICAgICAgICAvPlxuICAgICAgKX1cbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuLy8gTW91bnQgaGVscGVyIGZvciB0aGUgbGVnYWN5IFJhem9yIHZpZXcuXG5leHBvcnQgY29uc3QgbW91bnRIaXN0b3J5UGFnZSA9IChyb290OiBIVE1MRWxlbWVudCkgPT4ge1xuICBjb25zdCBkZWZhdWx0RnJvbURhdGUgPSByb290LmdldEF0dHJpYnV0ZShcImRhdGEtZGVmYXVsdC1mcm9tXCIpIHx8IFwiXCI7XG4gIGNvbnN0IGRlZmF1bHRUb0RhdGUgPSByb290LmdldEF0dHJpYnV0ZShcImRhdGEtZGVmYXVsdC10b1wiKSB8fCBcIlwiO1xuXG4gIG1vdW50UmVhY3RJc2xhbmQocm9vdCwgPEhpc3RvcnlQYWdlIGRlZmF1bHRGcm9tRGF0ZT17ZGVmYXVsdEZyb21EYXRlfSBkZWZhdWx0VG9EYXRlPXtkZWZhdWx0VG9EYXRlfSAvPik7XG59O1xuXHJcbmNvbnN0IG1vdW50ID0gKCkgPT4ge1xuICBjb25zdCByb290RWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpc2l0YXMtaGlzdG9yeS1yb290XCIpO1xuICBpZiAoIXJvb3RFbCkgcmV0dXJuO1xuICBtb3VudEhpc3RvcnlQYWdlKHJvb3RFbCk7XG59O1xuXG5tb3VudFdoZW5Eb2N1bWVudFJlYWR5KG1vdW50KTtcblxuZXhwb3J0IGRlZmF1bHQgSGlzdG9yeVBhZ2U7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrLCB1c2VSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGNsYXNzTmFtZXMgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvY2xhc3NOYW1lcy50c1wiO1xuaW1wb3J0IHsgdXNlVGltZWxpbmVDYXJkRWZmZWN0cyB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VUaW1lbGluZUNhcmRFZmZlY3RzLnRzXCI7XG5cclxuZXhwb3J0IHR5cGUgVGltZWxpbmVEYXRlUGFydHMgPSB7XHJcbiAgeWVhcjogc3RyaW5nO1xyXG4gIG1vbnRoOiBzdHJpbmc7XHJcbiAgZGF5OiBzdHJpbmc7XHJcbn07XHJcblxyXG5leHBvcnQgdHlwZSBUaW1lbGluZUl0ZW0gPSB7XHJcbiAgaWQ6IHN0cmluZztcclxuICBhY3RpdmlkYWRJZD86IHN0cmluZztcclxuICByZWNJZD86IG51bWJlciB8IG51bGw7XHJcbiAgbmFtZTogc3RyaW5nO1xyXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgZnVsbE5hbWU6IHN0cmluZztcclxuICBmdWxsRGVzYzogc3RyaW5nO1xyXG4gIGRhdGVQYXJ0czogVGltZWxpbmVEYXRlUGFydHM7XHJcbiAgaXNOb0RhdGE6IGJvb2xlYW47XHJcbn07XHJcblxyXG50eXBlIFByb3BzID0ge1xyXG4gIGl0ZW1zOiBUaW1lbGluZUl0ZW1bXTtcclxuICBub0RhdGFUZXh0OiBzdHJpbmc7XHJcbiAgZXJyb3JNZXNzYWdlOiBzdHJpbmc7XHJcbiAgb25OYXZpZ2F0ZTogKGxpbmtJZDogc3RyaW5nKSA9PiB2b2lkO1xyXG59O1xyXG5cclxuY29uc3QgVEFQX01PVkVfUFggPSAxNDtcbmNvbnN0IEhPTERfVE9fUFJFVklFV19NUyA9IDE2MDtcblxyXG50eXBlIFRhcEd1YXJkU3RhdGUgPSB7XG4gIGFjdGl2ZTogYm9vbGVhbjtcbiAgcG9pbnRlcklkOiBudW1iZXIgfCBudWxsO1xuICBzdGFydFg6IG51bWJlcjtcbiAgc3RhcnRZOiBudW1iZXI7XG4gIHN0YXJ0VGltZTogbnVtYmVyO1xuICBtb3ZlZDogYm9vbGVhbjtcbiAgbGlua0lkOiBzdHJpbmc7XG59O1xuXHJcbmNvbnN0IEhpc3RvcnlUYWJsZSA9ICh7IGl0ZW1zLCBub0RhdGFUZXh0LCBlcnJvck1lc3NhZ2UsIG9uTmF2aWdhdGUgfTogUHJvcHMpID0+IHtcbiAgY29uc3QgY29udGFpbmVyUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IHRhcEd1YXJkUmVmID0gdXNlUmVmPFRhcEd1YXJkU3RhdGU+KHtcbiAgICBhY3RpdmU6IGZhbHNlLFxuICAgIHBvaW50ZXJJZDogbnVsbCxcbiAgICBzdGFydFg6IDAsXG4gICAgc3RhcnRZOiAwLFxuICAgIHN0YXJ0VGltZTogMCxcbiAgICBtb3ZlZDogZmFsc2UsXG4gICAgbGlua0lkOiBcIlwiLFxuICB9KTtcblxuICBjb25zdCByZXNvbHZlQ2xpY2thYmxlQ2FyZCA9IHVzZUNhbGxiYWNrKCh0YXJnZXQ6IEV2ZW50VGFyZ2V0IHwgbnVsbCkgPT4ge1xuICAgIGNvbnN0IG5vZGUgPSB0YXJnZXQgYXMgSFRNTEVsZW1lbnQgfCBudWxsO1xuICAgIGlmICghbm9kZSB8fCB0eXBlb2Ygbm9kZS5jbG9zZXN0ICE9PSBcImZ1bmN0aW9uXCIpIHJldHVybiBudWxsO1xuICAgIGNvbnN0IGNhcmQgPSBub2RlLmNsb3Nlc3Q8SFRNTEVsZW1lbnQ+KFwiLnRpbWVsaW5lLWNhcmQtLWNsaWNrYWJsZVtkYXRhLWxpbmstaWRdXCIpO1xuICAgIGlmICghY2FyZCkgcmV0dXJuIG51bGw7XG4gICAgaWYgKCFjb250YWluZXJSZWYuY3VycmVudD8uY29udGFpbnMoY2FyZCkpIHJldHVybiBudWxsO1xuICAgIHJldHVybiBjYXJkO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgcmVzZXRUYXBHdWFyZCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICB0YXBHdWFyZFJlZi5jdXJyZW50LmFjdGl2ZSA9IGZhbHNlO1xuICAgIHRhcEd1YXJkUmVmLmN1cnJlbnQucG9pbnRlcklkID0gbnVsbDtcbiAgICB0YXBHdWFyZFJlZi5jdXJyZW50Lm1vdmVkID0gZmFsc2U7XG4gICAgdGFwR3VhcmRSZWYuY3VycmVudC5saW5rSWQgPSBcIlwiO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgaGFuZGxlUG9pbnRlckRvd24gPSB1c2VDYWxsYmFjayhcbiAgICAoZXZlbnQ6IFJlYWN0LlBvaW50ZXJFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHtcbiAgICAgIGlmIChldmVudC5wb2ludGVyVHlwZSA9PT0gXCJtb3VzZVwiICYmIGV2ZW50LmJ1dHRvbiAhPT0gMCkgcmV0dXJuO1xuICAgICAgY29uc3QgY2FyZCA9IHJlc29sdmVDbGlja2FibGVDYXJkKGV2ZW50LnRhcmdldCk7XG4gICAgICBpZiAoIWNhcmQpIHJldHVybjtcbiAgICAgIGNvbnN0IGxpbmtJZCA9IGNhcmQuZGF0YXNldC5saW5rSWQgfHwgXCJcIjtcbiAgICAgIGlmICghbGlua0lkKSByZXR1cm47XG5cbiAgICAgIHRhcEd1YXJkUmVmLmN1cnJlbnQuYWN0aXZlID0gdHJ1ZTtcbiAgICAgIHRhcEd1YXJkUmVmLmN1cnJlbnQucG9pbnRlcklkID0gZXZlbnQucG9pbnRlcklkO1xuICAgICAgdGFwR3VhcmRSZWYuY3VycmVudC5zdGFydFggPSBldmVudC5jbGllbnRYO1xuICAgICAgdGFwR3VhcmRSZWYuY3VycmVudC5zdGFydFkgPSBldmVudC5jbGllbnRZO1xuICAgICAgdGFwR3VhcmRSZWYuY3VycmVudC5zdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgICAgdGFwR3VhcmRSZWYuY3VycmVudC5tb3ZlZCA9IGZhbHNlO1xuICAgICAgdGFwR3VhcmRSZWYuY3VycmVudC5saW5rSWQgPSBsaW5rSWQ7XG4gICAgfSxcbiAgICBbcmVzb2x2ZUNsaWNrYWJsZUNhcmRdXG4gICk7XG5cbiAgY29uc3QgaGFuZGxlUG9pbnRlck1vdmUgPSB1c2VDYWxsYmFjaygoZXZlbnQ6IFJlYWN0LlBvaW50ZXJFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHtcbiAgICBjb25zdCBzdGF0ZSA9IHRhcEd1YXJkUmVmLmN1cnJlbnQ7XG4gICAgaWYgKCFzdGF0ZS5hY3RpdmUgfHwgZXZlbnQucG9pbnRlcklkICE9PSBzdGF0ZS5wb2ludGVySWQpIHJldHVybjtcbiAgICBjb25zdCBkeCA9IE1hdGguYWJzKGV2ZW50LmNsaWVudFggLSBzdGF0ZS5zdGFydFgpO1xuICAgIGNvbnN0IGR5ID0gTWF0aC5hYnMoZXZlbnQuY2xpZW50WSAtIHN0YXRlLnN0YXJ0WSk7XG4gICAgaWYgKGR4ID4gVEFQX01PVkVfUFggfHwgZHkgPiBUQVBfTU9WRV9QWCkge1xuICAgICAgc3RhdGUubW92ZWQgPSB0cnVlO1xuICAgIH1cbiAgfSwgW10pO1xuXG4gIGNvbnN0IGhhbmRsZVBvaW50ZXJVcCA9IHVzZUNhbGxiYWNrKFxuICAgIChldmVudDogUmVhY3QuUG9pbnRlckV2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4ge1xuICAgICAgY29uc3Qgc3RhdGUgPSB0YXBHdWFyZFJlZi5jdXJyZW50O1xuICAgICAgaWYgKCFzdGF0ZS5hY3RpdmUgfHwgZXZlbnQucG9pbnRlcklkICE9PSBzdGF0ZS5wb2ludGVySWQpIHJldHVybjtcbiAgICAgIGNvbnN0IGxpbmtJZCA9IHN0YXRlLmxpbmtJZDtcbiAgICAgIGNvbnN0IGhlbGRNcyA9IERhdGUubm93KCkgLSBzdGF0ZS5zdGFydFRpbWU7XG4gICAgICBjb25zdCBzaG91bGRUYXAgPSAhc3RhdGUubW92ZWQgJiYgaGVsZE1zIDwgSE9MRF9UT19QUkVWSUVXX01TO1xuICAgICAgcmVzZXRUYXBHdWFyZCgpO1xuICAgICAgaWYgKHNob3VsZFRhcCAmJiBsaW5rSWQpIHtcbiAgICAgICAgb25OYXZpZ2F0ZShsaW5rSWQpO1xuICAgICAgfVxuICAgIH0sXG4gICAgW29uTmF2aWdhdGUsIHJlc2V0VGFwR3VhcmRdXG4gICk7XG5cbiAgY29uc3QgYmxvY2tDbGlwYm9hcmRBY3Rpb24gPSB1c2VDYWxsYmFjayhcbiAgICAoZXZlbnQ6IFJlYWN0LkNsaXBib2FyZEV2ZW50PEhUTUxEaXZFbGVtZW50PiB8IFJlYWN0Lk1vdXNlRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB7XG4gICAgICBpZiAoIXJlc29sdmVDbGlja2FibGVDYXJkKGV2ZW50LnRhcmdldCkpIHJldHVybjtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSxcbiAgICBbcmVzb2x2ZUNsaWNrYWJsZUNhcmRdXG4gICk7XG5cbiAgdXNlVGltZWxpbmVDYXJkRWZmZWN0cyh7IGNvbnRhaW5lclJlZiwgZXJyb3JNZXNzYWdlLCBpdGVtcywgcmVzb2x2ZUNsaWNrYWJsZUNhcmQgfSk7XG5cclxuICBjb25zdCBoYXNJdGVtcyA9IGl0ZW1zLmxlbmd0aCA+IDA7XHJcbiAgY29uc3Qgc2hvd0VtcHR5ID0gIWVycm9yTWVzc2FnZSAmJiAhaGFzSXRlbXM7XHJcblxyXG4gIGNvbnN0IGNvbnRlbnQgPSBlcnJvck1lc3NhZ2UgPyAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtZGFuZ2VyXCI+e2Vycm9yTWVzc2FnZX08L2Rpdj5cclxuICApIDogaGFzSXRlbXMgPyAoXHJcbiAgICBpdGVtcy5tYXAoKGl0ZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgIGNvbnN0IGtleSA9IGl0ZW0uaWQgfHwgaXRlbS5yZWNJZD8udG9TdHJpbmcoKSB8fCBgdGltZWxpbmUtJHtpbmRleH1gO1xyXG4gICAgICBjb25zdCBpc0NsaWNrYWJsZSA9ICFpdGVtLmlzTm9EYXRhICYmICEhaXRlbS5pZDtcclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2IGtleT17a2V5fSBjbGFzc05hbWU9XCJ0aW1lbGluZS1pdGVtXCI+XHJcbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICAgIFwidGltZWxpbmUtY2FyZFwiLFxuICAgICAgICAgICAgICBpdGVtLmlzTm9EYXRhID8gXCJ0aW1lbGluZS1jYXJkLS1ub2RhdGFcIiA6IFwiXCIsXG4gICAgICAgICAgICAgIGlzQ2xpY2thYmxlID8gXCJ0aW1lbGluZS1jYXJkLS1jbGlja2FibGVcIiA6IFwiXCJcbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICBkYXRhLWFjdGl2aWRhZGlkPXtpdGVtLmFjdGl2aWRhZElkIHx8IFwiXCJ9XG4gICAgICAgICAgICBkYXRhLXJlY2lkPXtpdGVtLnJlY0lkICE9IG51bGwgPyBTdHJpbmcoaXRlbS5yZWNJZCkgOiBcIlwifVxuICAgICAgICAgICAgZGF0YS1saW5rLWlkPXtpc0NsaWNrYWJsZSA/IGl0ZW0uaWQgOiBcIlwifVxuICAgICAgICAgICAgcm9sZT17aXNDbGlja2FibGUgPyBcImJ1dHRvblwiIDogdW5kZWZpbmVkfVxuICAgICAgICAgICAgdGFiSW5kZXg9e2lzQ2xpY2thYmxlID8gMCA6IHVuZGVmaW5lZH1cbiAgICAgICAgICAgIGFyaWEtbGFiZWw9e2lzQ2xpY2thYmxlID8gKGl0ZW0uZnVsbE5hbWUgfHwgaXRlbS5uYW1lIHx8IG5vRGF0YVRleHQpIDogdW5kZWZpbmVkfVxuICAgICAgICAgICAgb25LZXlEb3duPXtpc0NsaWNrYWJsZVxuICAgICAgICAgICAgICA/IChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChldmVudC5rZXkgPT09IFwiRW50ZXJcIiB8fCBldmVudC5rZXkgPT09IFwiIFwiKSB7XG4gICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgb25OYXZpZ2F0ZShpdGVtLmlkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgOiB1bmRlZmluZWR9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aW1lbGluZS1kYXRlLXBhbmVsIGZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0xIHB4LTMgcHktMyBiZy1zbGF0ZS01MCBib3JkZXItciBib3JkZXItc2xhdGUtMjAwIHRleHQtc2xhdGUtNjAwXCI+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdHJhY2tpbmctWzAuMmVtXSB0ZXh0LXNsYXRlLTUwMFwiPntpdGVtLmRhdGVQYXJ0cy55ZWFyfTwvZGl2PlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LXNlbWlib2xkIHVwcGVyY2FzZSB0cmFja2luZy1bMC4yZW1dIHRleHQtc2xhdGUtNTAwXCI+e2l0ZW0uZGF0ZVBhcnRzLm1vbnRofTwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtMnhsIGZvbnQtc2VtaWJvbGQgdGV4dC1wcmltYXJ5XCI+e2l0ZW0uZGF0ZVBhcnRzLmRheX08L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGltZWxpbmUtY2FyZF9fY29udGVudCBmbGV4LTEgcHktMyBweC00XCI+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aW1lbGluZS1uYW1lXCIgZGF0YS1mdWxsdGV4dD17aXRlbS5mdWxsTmFtZSB8fCBpdGVtLm5hbWV9PntpdGVtLm5hbWV9PC9kaXY+XHJcbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGltZWxpbmUtZGVzYy10ZXh0XCIgZGF0YS1mdWxsdGV4dD17aXRlbS5mdWxsRGVzYyB8fCBpdGVtLmRlc2NyaXB0aW9ufT57aXRlbS5kZXNjcmlwdGlvbiB8fCBub0RhdGFUZXh0fTwvcD5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgKTtcclxuICAgIH0pXHJcbiAgKSA6IG51bGw7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2XG4gICAgICBpZD1cInRpbWVsaW5lQ29udGFpbmVyXCJcbiAgICAgIHJlZj17Y29udGFpbmVyUmVmfVxuICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFwidGltZWxpbmUtYm94XCIsIHNob3dFbXB0eSA/IFwidGltZWxpbmUtZW1wdHlcIiA6IFwiXCIpfVxuICAgICAgZGF0YS1lbXB0eS10ZXh0PXtub0RhdGFUZXh0fVxuICAgICAgb25Qb2ludGVyRG93bkNhcHR1cmU9e2hhbmRsZVBvaW50ZXJEb3dufVxuICAgICAgb25Qb2ludGVyTW92ZUNhcHR1cmU9e2hhbmRsZVBvaW50ZXJNb3ZlfVxuICAgICAgb25Qb2ludGVyVXBDYXB0dXJlPXtoYW5kbGVQb2ludGVyVXB9XG4gICAgICBvblBvaW50ZXJDYW5jZWxDYXB0dXJlPXtyZXNldFRhcEd1YXJkfVxuICAgICAgb25Qb2ludGVyTGVhdmU9e3Jlc2V0VGFwR3VhcmR9XG4gICAgICBvbkNvbnRleHRNZW51Q2FwdHVyZT17YmxvY2tDbGlwYm9hcmRBY3Rpb259XG4gICAgICBvbkNvcHlDYXB0dXJlPXtibG9ja0NsaXBib2FyZEFjdGlvbn1cbiAgICAgIG9uQ3V0Q2FwdHVyZT17YmxvY2tDbGlwYm9hcmRBY3Rpb259XG4gICAgICBvblBhc3RlQ2FwdHVyZT17YmxvY2tDbGlwYm9hcmRBY3Rpb259XG4gICAgPlxuICAgICAge2NvbnRlbnR9XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5jb25zdCBNZW1vaXplZEhpc3RvcnlUYWJsZSA9IFJlYWN0Lm1lbW8oSGlzdG9yeVRhYmxlKTtcbk1lbW9pemVkSGlzdG9yeVRhYmxlLmRpc3BsYXlOYW1lID0gXCJIaXN0b3J5VGFibGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgTWVtb2l6ZWRIaXN0b3J5VGFibGU7XG4iLCAiXHVGRUZGaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHR5cGUgeyBIaXN0b3J5Q2FjaGVkRmlsdGVyIH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZUhpc3RvcnlGaWx0ZXJDYWNoZS50c1wiO1xuaW1wb3J0IHR5cGUgeyBGaWx0ZXJMb2FkUmVxdWVzdCwgTG9hZE92ZXJyaWRlIH0gZnJvbSBcIi4vdXNlSGlzdG9yeUZpbHRlcnNTdGF0ZS50c1wiO1xuXG50eXBlIFVzZUhpc3RvcnlQYWdlTGlzdGVuZXJzQXJncyA9IHtcbiAgaXNPcGVuOiBib29sZWFuO1xuICBhY3RpdmF0b3JSZWY6IFJlYWN0LlJlZk9iamVjdDxIVE1MRGl2RWxlbWVudCB8IG51bGw+O1xuICBwb3BvdmVyUmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTERpdkVsZW1lbnQgfCBudWxsPjtcbiAgcGFnaW5hdGlvblJlZjogUmVhY3QuUmVmT2JqZWN0PEhUTUxEaXZFbGVtZW50IHwgbnVsbD47XG4gIGhhc1Jlc3RvcmVkRmlsdGVyUmVmOiBSZWFjdC5NdXRhYmxlUmVmT2JqZWN0PGJvb2xlYW4+O1xuICByZXRyeU9uTmV0d29ya0Vycm9yUmVmOiBSZWFjdC5NdXRhYmxlUmVmT2JqZWN0PGJvb2xlYW4+O1xuICBjdXJyZW50UGFnZTogbnVtYmVyO1xuICB1cGRhdGVGYWJCb3R0b206ICgpID0+IHZvaWQ7XG4gIGxvZ0hpc3Rvcnk6IChtZXNzYWdlOiBzdHJpbmcsIGRhdGE/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPikgPT4gdm9pZDtcbiAgY29uc3VtZVJldHVybkZsYWc6ICgpID0+IGJvb2xlYW47XG4gIHJlYWRDYWNoZWRGaWx0ZXI6ICgpID0+IEhpc3RvcnlDYWNoZWRGaWx0ZXIgfCBudWxsO1xuICBhcHBseUNhY2hlZEZpbHRlcjogKGZpbHRlcjogSGlzdG9yeUNhY2hlZEZpbHRlciB8IG51bGwpID0+IEZpbHRlckxvYWRSZXF1ZXN0IHwgbnVsbDtcbiAgbG9hZEFjdGl2aXRpZXM6IChwYWdlOiBudW1iZXIsIG92ZXJyaWRlPzogTG9hZE92ZXJyaWRlKSA9PiB2b2lkO1xuICBzZXRJc09wZW46IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPGJvb2xlYW4+PjtcbiAgc2V0SG92ZXJEYXRlOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxEYXRlIHwgbnVsbD4+O1xuICBzZXRTaG93RmlsdGVyczogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248Ym9vbGVhbj4+O1xuICBhcHBseUZpbHRlcnM6IChvcHRpb25zPzogeyBjbG9zZVBhbmVsPzogYm9vbGVhbjsgZm9yY2U/OiBib29sZWFuOyBwYWdlPzogbnVtYmVyIH0pID0+IHZvaWQ7XG59O1xuXG4vLyBIYW5kbGVzIGdsb2JhbCBsaXN0ZW5lcnMgdXNlZCBieSB0aGUgaGlzdG9yeSBwYWdlIGZpbHRlcnMgYW5kIGNhbGVuZGFyIFVJLlxuZXhwb3J0IGNvbnN0IHVzZUhpc3RvcnlQYWdlTGlzdGVuZXJzID0gKHtcbiAgaXNPcGVuLFxuICBhY3RpdmF0b3JSZWYsXG4gIHBvcG92ZXJSZWYsXG4gIHBhZ2luYXRpb25SZWYsXG4gIGhhc1Jlc3RvcmVkRmlsdGVyUmVmLFxuICByZXRyeU9uTmV0d29ya0Vycm9yUmVmLFxuICBjdXJyZW50UGFnZSxcbiAgdXBkYXRlRmFiQm90dG9tLFxuICBsb2dIaXN0b3J5LFxuICBjb25zdW1lUmV0dXJuRmxhZyxcbiAgcmVhZENhY2hlZEZpbHRlcixcbiAgYXBwbHlDYWNoZWRGaWx0ZXIsXG4gIGxvYWRBY3Rpdml0aWVzLFxuICBzZXRJc09wZW4sXG4gIHNldEhvdmVyRGF0ZSxcbiAgc2V0U2hvd0ZpbHRlcnMsXG4gIGFwcGx5RmlsdGVycyxcbn06IFVzZUhpc3RvcnlQYWdlTGlzdGVuZXJzQXJncykgPT4ge1xuICAvLyBDbG9zZSB0aGUgbWFudWFsIHBpY2tlciB3aGVuIGNsaWNraW5nIG91dHNpZGUgb2YgdGhlIHJhbmdlIHBpY2tlciBVSS5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWlzT3BlbikgcmV0dXJuO1xuXG4gICAgY29uc3QgaGFuZGxlT3V0c2lkZSA9IChldmVudDogTW91c2VFdmVudCkgPT4ge1xuICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0IGFzIE5vZGUgfCBudWxsO1xuICAgICAgaWYgKCF0YXJnZXQpIHJldHVybjtcbiAgICAgIGlmIChwb3BvdmVyUmVmLmN1cnJlbnQ/LmNvbnRhaW5zKHRhcmdldCkpIHJldHVybjtcbiAgICAgIGlmIChhY3RpdmF0b3JSZWYuY3VycmVudD8uY29udGFpbnModGFyZ2V0KSkgcmV0dXJuO1xuICAgICAgbG9nSGlzdG9yeShcImNsb3NlUG9wb3ZlcjpvdXRzaWRlXCIpO1xuICAgICAgc2V0SXNPcGVuKGZhbHNlKTtcbiAgICAgIHNldEhvdmVyRGF0ZShudWxsKTtcbiAgICB9O1xuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBoYW5kbGVPdXRzaWRlKTtcbiAgICByZXR1cm4gKCkgPT4gZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBoYW5kbGVPdXRzaWRlKTtcbiAgfSwgW2FjdGl2YXRvclJlZiwgaXNPcGVuLCBsb2dIaXN0b3J5LCBwb3BvdmVyUmVmLCBzZXRIb3ZlckRhdGUsIHNldElzT3Blbl0pO1xuXG4gIC8vIFJlLWFwcGx5IGZpbHRlcnMgYWZ0ZXIgYnJvd3NlciBiYWNrL2ZvcndhcmQgbmF2aWdhdGlvbiByZXR1cm5zIHRvIHRoZSBwYWdlLlxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IG9uUGFnZVNob3cgPSAoKSA9PiB7XG4gICAgICBpZiAoaGFzUmVzdG9yZWRGaWx0ZXJSZWYuY3VycmVudCkgcmV0dXJuO1xuICAgICAgaWYgKGNvbnN1bWVSZXR1cm5GbGFnKCkpIHtcbiAgICAgICAgY29uc3QgY2FjaGVkID0gcmVhZENhY2hlZEZpbHRlcigpO1xuICAgICAgICBjb25zdCBjYWNoZWRSZXF1ZXN0ID0gYXBwbHlDYWNoZWRGaWx0ZXIoY2FjaGVkKTtcbiAgICAgICAgaWYgKGNhY2hlZFJlcXVlc3QpIHtcbiAgICAgICAgICByZXRyeU9uTmV0d29ya0Vycm9yUmVmLmN1cnJlbnQgPSB0cnVlO1xuICAgICAgICAgIGxvYWRBY3Rpdml0aWVzKGNhY2hlZFJlcXVlc3QucGFnZSwgY2FjaGVkUmVxdWVzdC5vdmVycmlkZSk7XG4gICAgICAgICAgc2V0U2hvd0ZpbHRlcnMoZmFsc2UpO1xuICAgICAgICAgIHNldElzT3BlbihmYWxzZSk7XG4gICAgICAgICAgaGFzUmVzdG9yZWRGaWx0ZXJSZWYuY3VycmVudCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwYWdlc2hvd1wiLCBvblBhZ2VTaG93KTtcbiAgICByZXR1cm4gKCkgPT4gd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwYWdlc2hvd1wiLCBvblBhZ2VTaG93KTtcbiAgfSwgW1xuICAgIGFwcGx5Q2FjaGVkRmlsdGVyLFxuICAgIGNvbnN1bWVSZXR1cm5GbGFnLFxuICAgIGhhc1Jlc3RvcmVkRmlsdGVyUmVmLFxuICAgIGxvYWRBY3Rpdml0aWVzLFxuICAgIHJlYWRDYWNoZWRGaWx0ZXIsXG4gICAgcmV0cnlPbk5ldHdvcmtFcnJvclJlZixcbiAgICBzZXRJc09wZW4sXG4gICAgc2V0U2hvd0ZpbHRlcnMsXG4gIF0pO1xuXG4gIC8vIEtlZXAgZmxvYXRpbmcgYWN0aW9uIGJ1dHRvbiBjbGVhciBvZiBwYWdpbmF0aW9uIGFuZCByZWFjdCB0byBsYXlvdXQgY2hhbmdlcy5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICB1cGRhdGVGYWJCb3R0b20oKTtcblxuICAgIGxldCBvYnNlcnZlcjogUmVzaXplT2JzZXJ2ZXIgfCBudWxsID0gbnVsbDtcbiAgICBjb25zdCBwYWdpbmF0aW9uRWwgPSBwYWdpbmF0aW9uUmVmLmN1cnJlbnQ7XG4gICAgaWYgKHBhZ2luYXRpb25FbCAmJiB0eXBlb2YgUmVzaXplT2JzZXJ2ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIG9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyKCgpID0+IHVwZGF0ZUZhYkJvdHRvbSgpKTtcbiAgICAgIG9ic2VydmVyLm9ic2VydmUocGFnaW5hdGlvbkVsKTtcbiAgICB9XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCB1cGRhdGVGYWJCb3R0b20pO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCB1cGRhdGVGYWJCb3R0b20pO1xuICAgICAgaWYgKG9ic2VydmVyKSBvYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgfTtcbiAgfSwgW3BhZ2luYXRpb25SZWYsIHVwZGF0ZUZhYkJvdHRvbV0pO1xuXG4gIC8vIFdpcmUgdG9wYmFyIGFjdGlvbnMgdGhhdCB0b2dnbGUgZmlsdGVycyBvciBmb3JjZSByZWZyZXNoIG9mIGN1cnJlbnQgcGFnZS5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBvblRvZ2dsZUZpbHRlcnMgPSAoKSA9PiB7XG4gICAgICBzZXRTaG93RmlsdGVycygocHJldikgPT4ge1xuICAgICAgICBjb25zdCBuZXh0ID0gIXByZXY7XG4gICAgICAgIGlmICghbmV4dCkge1xuICAgICAgICAgIHNldElzT3BlbihmYWxzZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd2luZG93LnNjcm9sbFRvKHsgdG9wOiAwLCBiZWhhdmlvcjogXCJzbW9vdGhcIiB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBjb25zdCBvblJlZnJlc2ggPSAoKSA9PiB7XG4gICAgICBhcHBseUZpbHRlcnMoeyBwYWdlOiBjdXJyZW50UGFnZSwgZm9yY2U6IHRydWUsIGNsb3NlUGFuZWw6IHRydWUgfSk7XG4gICAgfTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiaGlzdG9yeS10b2dnbGUtZmlsdGVyXCIsIG9uVG9nZ2xlRmlsdGVycyk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJoaXN0b3J5LXJlZnJlc2hcIiwgb25SZWZyZXNoKTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImhpc3RvcnktdG9nZ2xlLWZpbHRlclwiLCBvblRvZ2dsZUZpbHRlcnMpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJoaXN0b3J5LXJlZnJlc2hcIiwgb25SZWZyZXNoKTtcbiAgICB9O1xuICB9LCBbYXBwbHlGaWx0ZXJzLCBjdXJyZW50UGFnZSwgc2V0SXNPcGVuLCBzZXRTaG93RmlsdGVyc10pO1xufTtcclxuIiwgIlx1RkVGRmltcG9ydCBSZWFjdCwgeyB1c2VNZW1vLCB1c2VSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB0eXBlIHsgVGltZWxpbmVJdGVtIH0gZnJvbSBcIi4vSGlzdG9yeVRhYmxlLnRzeFwiO1xuXG50eXBlIEFjdGl2aXR5UmVjb3JkID0gUmVjb3JkPHN0cmluZywgdW5rbm93bj47XG5cbnR5cGUgVXNlSGlzdG9yeVRpbWVsaW5lSXRlbXNBcmdzID0ge1xuICBpdGVtczogQWN0aXZpdHlSZWNvcmRbXTtcbiAgbG9jYWxlOiBzdHJpbmc7XG4gIG5vRGF0YVRleHQ6IHN0cmluZztcbiAgbG9nSGlzdG9yeTogKG1lc3NhZ2U6IHN0cmluZywgZGF0YT86IFJlY29yZDxzdHJpbmcsIHVua25vd24+KSA9PiB2b2lkO1xuICB0b1RpdGxlQ2FzZTogKHZhbHVlOiBzdHJpbmcsIGxvY2FsZTogc3RyaW5nKSA9PiBzdHJpbmc7XG4gIGZvcm1hdERhdGVQYXJ0czogKHZhbHVlOiBzdHJpbmcsIGxvY2FsZTogc3RyaW5nKSA9PiB7IHllYXI6IHN0cmluZzsgbW9udGg6IHN0cmluZzsgZGF5OiBzdHJpbmcgfTtcbn07XG5cbi8vIE1hcHMgcmF3IGhpc3RvcnkgcGF5bG9hZCBpdGVtcyBpbnRvIHRpbWVsaW5lIGNhcmRzIHVzZWQgYnkgSGlzdG9yeVRhYmxlLlxuZXhwb3J0IGNvbnN0IHVzZUhpc3RvcnlUaW1lbGluZUl0ZW1zID0gKHtcbiAgaXRlbXMsXG4gIGxvY2FsZSxcbiAgbm9EYXRhVGV4dCxcbiAgbG9nSGlzdG9yeSxcbiAgdG9UaXRsZUNhc2UsXG4gIGZvcm1hdERhdGVQYXJ0cyxcbn06IFVzZUhpc3RvcnlUaW1lbGluZUl0ZW1zQXJncykgPT4ge1xuICBjb25zdCBkZWJ1Z0xvZ2dlZFJlZiA9IHVzZVJlZigwKTtcblxuICBjb25zdCB0aW1lbGluZUl0ZW1zOiBUaW1lbGluZUl0ZW1bXSA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIHJldHVybiBpdGVtcy5tYXAoKGVudHJ5KSA9PiB7XG4gICAgICBjb25zdCBhY3RpdmlkYWRJZFJhdyA9IChlbnRyeS5hY3RpdmlkYWRJZCA/PyBlbnRyeS5BY3RpdmlkYWRJZCA/PyBcIlwiKS50b1N0cmluZygpLnRyaW0oKTtcbiAgICAgIGNvbnN0IGFjdGl2aWRhZElkID0gYWN0aXZpZGFkSWRSYXcgfHwgXCJcIjtcbiAgICAgIGNvbnN0IHJlY0lkUmF3ID0gZW50cnkucmVjSWQgPz8gZW50cnkuUmVjSWQgPz8gXCJcIjtcbiAgICAgIGNvbnN0IHJlY0lkID0gcmVjSWRSYXcgJiYgIU51bWJlci5pc05hTihOdW1iZXIocmVjSWRSYXcpKSA/IE51bWJlcihyZWNJZFJhdykgOiBudWxsO1xuICAgICAgbGV0IGxpbmtJZCA9IGFjdGl2aWRhZElkIHx8IChyZWNJZCA/IHJlY0lkLnRvU3RyaW5nKCkgOiBcIlwiKTtcblxuICAgICAgaWYgKGRlYnVnTG9nZ2VkUmVmLmN1cnJlbnQgPCA1KSB7XG4gICAgICAgIGxvZ0hpc3RvcnkoXCJhY3Rpdml0eSBpdGVtXCIsIHsgYWN0aXZpZGFkSWQsIHJlY0lkUmF3LCByZWNJZCB9KTtcbiAgICAgICAgZGVidWdMb2dnZWRSZWYuY3VycmVudCArPSAxO1xuICAgICAgfVxuXG4gICAgICBjb25zdCByYXdOYW1lID0gKGVudHJ5Lm5hbWUgPz8gZW50cnkuTmFtZSA/PyBcIlwiKS50b1N0cmluZygpLnRyaW0oKTtcbiAgICAgIGNvbnN0IGZ1bGxOYW1lID0gdG9UaXRsZUNhc2UocmF3TmFtZSwgbG9jYWxlKTtcbiAgICAgIGNvbnN0IGZlY2hhID0gKGVudHJ5LnRyYW5zRGF0ZSA/PyBlbnRyeS5UcmFuc0RhdGUgPz8gXCJcIikudG9TdHJpbmcoKTtcbiAgICAgIGNvbnN0IHJhd0Rlc2MgPSAoZW50cnkuZGVzY3JpcHRpb24gPz8gZW50cnkuRGVzY3JpcHRpb24gPz8gXCJcIikudG9TdHJpbmcoKS50cmltKCk7XG4gICAgICBjb25zdCBmdWxsRGVzYyA9IHJhd0Rlc2M7XG5cbiAgICAgIGNvbnN0IGlzTm9EYXRhQ2FyZCA9ICFyYXdOYW1lICYmICFyYXdEZXNjO1xuICAgICAgaWYgKGlzTm9EYXRhQ2FyZCkge1xuICAgICAgICBsaW5rSWQgPSBcIlwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBpZDogbGlua0lkLFxuICAgICAgICBhY3RpdmlkYWRJZCxcbiAgICAgICAgcmVjSWQsXG4gICAgICAgIG5hbWU6IGZ1bGxOYW1lLFxuICAgICAgICBkZXNjcmlwdGlvbjogZnVsbERlc2MgfHwgbm9EYXRhVGV4dCxcbiAgICAgICAgZnVsbE5hbWUsXG4gICAgICAgIGZ1bGxEZXNjLFxuICAgICAgICBkYXRlUGFydHM6IGZvcm1hdERhdGVQYXJ0cyhmZWNoYSwgbG9jYWxlKSxcbiAgICAgICAgaXNOb0RhdGE6IGlzTm9EYXRhQ2FyZCxcbiAgICAgIH07XG4gICAgfSk7XG4gIH0sIFtmb3JtYXREYXRlUGFydHMsIGl0ZW1zLCBsb2NhbGUsIGxvZ0hpc3RvcnksIG5vRGF0YVRleHQsIHRvVGl0bGVDYXNlXSk7XG5cbiAgcmV0dXJuIHsgdGltZWxpbmVJdGVtcyB9O1xufTtcclxuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IEFwaUZldGNoRXJyb3IsIGZldGNoSnNvbiB9IGZyb20gXCIuLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uL3V0aWxzL2luZEkxOG4udHNcIjtcblxuZXhwb3J0IHR5cGUgSGlzdG9yeUFjdGl2aXR5SXRlbSA9IHtcbiAgYWN0aXZpZGFkSWQ/OiBzdHJpbmcgfCBudW1iZXI7XG4gIEFjdGl2aWRhZElkPzogc3RyaW5nIHwgbnVtYmVyO1xuICByZWNJZD86IHN0cmluZyB8IG51bWJlcjtcbiAgUmVjSWQ/OiBzdHJpbmcgfCBudW1iZXI7XG4gIG5hbWU/OiBzdHJpbmc7XG4gIE5hbWU/OiBzdHJpbmc7XG4gIHRyYW5zRGF0ZT86IHN0cmluZztcbiAgVHJhbnNEYXRlPzogc3RyaW5nO1xuICBkZXNjcmlwdGlvbj86IHN0cmluZztcbiAgRGVzY3JpcHRpb24/OiBzdHJpbmc7XG59O1xuXG50eXBlIEhpc3RvcnlSZXNwb25zZSA9IHtcbiAgaXRlbXM/OiBIaXN0b3J5QWN0aXZpdHlJdGVtW107XG4gIHRvdGFsPzogbnVtYmVyO1xufTtcblxudHlwZSBMb2FkT3ZlcnJpZGUgPSB7XG4gIGZyb21EYXRlOiBzdHJpbmc7XG4gIHRvRGF0ZTogc3RyaW5nO1xuICBhY2NvdW50TnVtPzogc3RyaW5nO1xufTtcblxudHlwZSBVc2VIaXN0b3J5QWN0aXZpdGllc0FyZ3MgPSB7XG4gIGZyb21EYXRlVmFsdWU6IHN0cmluZztcbiAgdG9EYXRlVmFsdWU6IHN0cmluZztcbiAgYWNjb3VudE51bVZhbHVlOiBzdHJpbmc7XG4gIHBhZ2VTaXplOiBudW1iZXI7XG4gIHJldHJ5RGVsYXlNcz86IG51bWJlcjtcbiAgbm9ybWFsaXplUmFuZ2U6IChmcm9tOiBzdHJpbmcsIHRvOiBzdHJpbmcpID0+IHsgZnJvbTogc3RyaW5nOyB0bzogc3RyaW5nIH07XG4gIG9uRm9yYmlkZGVuOiAoKSA9PiB2b2lkO1xuICBvbkRlYnVnPzogKG1lc3NhZ2U6IHN0cmluZywgZGF0YT86IFJlY29yZDxzdHJpbmcsIHVua25vd24+KSA9PiB2b2lkO1xufTtcblxuLy8gQ2VudHJhbGl6ZXMgaGlzdG9yeSBmZXRjaC9yZXRyeSBsb2dpYyB0byBrZWVwIHBhZ2UgY29tcG9uZW50cyBzbWFsbGVyLlxuZXhwb3J0IGNvbnN0IHVzZUhpc3RvcnlBY3Rpdml0aWVzID0gKHtcbiAgZnJvbURhdGVWYWx1ZSxcbiAgdG9EYXRlVmFsdWUsXG4gIGFjY291bnROdW1WYWx1ZSxcbiAgcGFnZVNpemUsXG4gIHJldHJ5RGVsYXlNcyA9IDYwMCxcbiAgbm9ybWFsaXplUmFuZ2UsXG4gIG9uRm9yYmlkZGVuLFxuICBvbkRlYnVnLFxufTogVXNlSGlzdG9yeUFjdGl2aXRpZXNBcmdzKSA9PiB7XG4gIGNvbnN0IFtpdGVtcywgc2V0SXRlbXNdID0gdXNlU3RhdGU8SGlzdG9yeUFjdGl2aXR5SXRlbVtdPihbXSk7XG4gIGNvbnN0IFt0b3RhbCwgc2V0VG90YWxdID0gdXNlU3RhdGUoMCk7XG4gIGNvbnN0IFtjdXJyZW50UGFnZSwgc2V0Q3VycmVudFBhZ2VdID0gdXNlU3RhdGUoMSk7XG4gIGNvbnN0IFtpc0xvYWRpbmcsIHNldElzTG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtlcnJvck1lc3NhZ2UsIHNldEVycm9yTWVzc2FnZV0gPSB1c2VTdGF0ZShcIlwiKTtcblxuICBjb25zdCByZXRyeU9uTmV0d29ya0Vycm9yUmVmID0gdXNlUmVmKGZhbHNlKTtcbiAgY29uc3QgYWN0aXZlQWJvcnRSZWYgPSB1c2VSZWY8QWJvcnRDb250cm9sbGVyIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IGFjdGl2ZVJlcXVlc3RJZFJlZiA9IHVzZVJlZigwKTtcbiAgY29uc3QgcmV0cnlUaW1lclJlZiA9IHVzZVJlZjxudW1iZXIgfCBudWxsPihudWxsKTtcbiAgY29uc3QgbGFzdFNpZ25hdHVyZVJlZiA9IHVzZVJlZihcIlwiKTtcblxuICBjb25zdCBjbGVhclJldHJ5VGltZXIgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKHJldHJ5VGltZXJSZWYuY3VycmVudCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHJldHJ5VGltZXJSZWYuY3VycmVudCk7XG4gICAgICByZXRyeVRpbWVyUmVmLmN1cnJlbnQgPSBudWxsO1xuICAgIH1cbiAgfSwgW10pO1xuXG4gIGNvbnN0IGFib3J0QWN0aXZlUmVxdWVzdCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoIWFjdGl2ZUFib3J0UmVmLmN1cnJlbnQpIHJldHVybjtcbiAgICB0cnkge1xuICAgICAgYWN0aXZlQWJvcnRSZWYuY3VycmVudC5hYm9ydCgpO1xuICAgIH0gY2F0Y2gge1xuICAgICAgLy8gSWdub3JlIGFib3J0IGVycm9ycy5cbiAgICB9XG4gICAgYWN0aXZlQWJvcnRSZWYuY3VycmVudCA9IG51bGw7XG4gIH0sIFtdKTtcblxuICBjb25zdCByZXNldEFjdGl2aXRpZXMgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgY2xlYXJSZXRyeVRpbWVyKCk7XG4gICAgYWJvcnRBY3RpdmVSZXF1ZXN0KCk7XG4gICAgc2V0SXRlbXMoW10pO1xuICAgIHNldFRvdGFsKDApO1xuICAgIHNldEVycm9yTWVzc2FnZShcIlwiKTtcbiAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xuICB9LCBbYWJvcnRBY3RpdmVSZXF1ZXN0LCBjbGVhclJldHJ5VGltZXJdKTtcblxuICBjb25zdCBsb2FkQWN0aXZpdGllcyA9IHVzZUNhbGxiYWNrKFxuICAgIGFzeW5jIChwYWdlOiBudW1iZXIsIG92ZXJyaWRlPzogTG9hZE92ZXJyaWRlKSA9PiB7XG4gICAgICBjb25zdCBmcm9tRGF0ZVN0ciA9IG92ZXJyaWRlPy5mcm9tRGF0ZSA/PyBmcm9tRGF0ZVZhbHVlO1xuICAgICAgY29uc3QgdG9EYXRlU3RyID0gb3ZlcnJpZGU/LnRvRGF0ZSA/PyB0b0RhdGVWYWx1ZTtcbiAgICAgIGNvbnN0IGFjY291bnROdW1TdHIgPSBvdmVycmlkZT8uYWNjb3VudE51bSA/PyBhY2NvdW50TnVtVmFsdWU7XG5cbiAgICAgIGlmICghZnJvbURhdGVTdHIgfHwgIXRvRGF0ZVN0cikge1xuICAgICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xuICAgICAgICBzZXRJdGVtcyhbXSk7XG4gICAgICAgIHNldFRvdGFsKDApO1xuICAgICAgICBzZXRFcnJvck1lc3NhZ2UoXCJcIik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgc2V0Q3VycmVudFBhZ2UocGFnZSk7XG4gICAgICBjbGVhclJldHJ5VGltZXIoKTtcblxuICAgICAgY29uc3QgcmVxdWVzdElkID0gKythY3RpdmVSZXF1ZXN0SWRSZWYuY3VycmVudDtcbiAgICAgIGFib3J0QWN0aXZlUmVxdWVzdCgpO1xuXG4gICAgICBjb25zdCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuICAgICAgYWN0aXZlQWJvcnRSZWYuY3VycmVudCA9IGNvbnRyb2xsZXI7XG5cbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSBub3JtYWxpemVSYW5nZShmcm9tRGF0ZVN0ciwgdG9EYXRlU3RyKTtcbiAgICAgIGNvbnN0IGZpbHRlclNpZ25hdHVyZSA9IGAke25vcm1hbGl6ZWQuZnJvbX18JHtub3JtYWxpemVkLnRvfXwke2FjY291bnROdW1TdHJ9fCR7cGFnZX1gO1xuICAgICAgbGFzdFNpZ25hdHVyZVJlZi5jdXJyZW50ID0gZmlsdGVyU2lnbmF0dXJlO1xuXG4gICAgICBzZXRJc0xvYWRpbmcodHJ1ZSk7XG4gICAgICBzZXRJdGVtcyhbXSk7XG4gICAgICBzZXRUb3RhbCgwKTtcbiAgICAgIHNldEVycm9yTWVzc2FnZShcIlwiKTtcblxuICAgICAgY29uc3QgcGF5bG9hZCA9IHtcbiAgICAgICAgZnJvbURhdGU6IG5vcm1hbGl6ZWQuZnJvbSxcbiAgICAgICAgdG9EYXRlOiBub3JtYWxpemVkLnRvLFxuICAgICAgICBhY2NvdW50TnVtOiBhY2NvdW50TnVtU3RyLFxuICAgICAgfTtcblxuICAgICAgb25EZWJ1Zz8uKFwibG9hZEFjdGl2aXRpZXM6cmVxdWVzdFwiLCB7IHBhZ2UsIHBhZ2VTaXplLCBwYXlsb2FkIH0pO1xuXG4gICAgICBsZXQgZGF0YTogSGlzdG9yeVJlc3BvbnNlO1xuICAgICAgdHJ5IHtcbiAgICAgICAgZGF0YSA9IGF3YWl0IGZldGNoSnNvbjxIaXN0b3J5UmVzcG9uc2U+KGAvSGlzdG9yaWFsL0dldEFjdGl2aXRpZXM/cGFnZT0ke3BhZ2V9JnBhZ2VTaXplPSR7cGFnZVNpemV9YCwge1xuICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxuICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHBheWxvYWQpLFxuICAgICAgICAgIHNpZ25hbDogY29udHJvbGxlci5zaWduYWwsXG4gICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXG4gICAgICAgIH0pO1xuICAgICAgfSBjYXRjaCAoZXJyOiBhbnkpIHtcbiAgICAgICAgaWYgKHJlcXVlc3RJZCAhPT0gYWN0aXZlUmVxdWVzdElkUmVmLmN1cnJlbnQpIHJldHVybjtcbiAgICAgICAgaWYgKGVycj8ubmFtZSA9PT0gXCJBYm9ydEVycm9yXCIpIHtcbiAgICAgICAgICBhY3RpdmVBYm9ydFJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZXJyIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvciAmJiBlcnIuc3RhdHVzID09PSA0MDMpIHtcbiAgICAgICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xuICAgICAgICAgIGFjdGl2ZUFib3J0UmVmLmN1cnJlbnQgPSBudWxsO1xuICAgICAgICAgIG9uRm9yYmlkZGVuKCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgaXNOZXR3b3JrRXJyb3IgPSAhKGVyciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IpIHx8IHR5cGVvZiBlcnIuc3RhdHVzICE9PSBcIm51bWJlclwiO1xuICAgICAgICBpZiAoaXNOZXR3b3JrRXJyb3IgJiYgcmV0cnlPbk5ldHdvcmtFcnJvclJlZi5jdXJyZW50KSB7XG4gICAgICAgICAgcmV0cnlPbk5ldHdvcmtFcnJvclJlZi5jdXJyZW50ID0gZmFsc2U7XG4gICAgICAgICAgYWN0aXZlQWJvcnRSZWYuY3VycmVudCA9IG51bGw7XG4gICAgICAgICAgcmV0cnlUaW1lclJlZi5jdXJyZW50ID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHJlcXVlc3RJZCAhPT0gYWN0aXZlUmVxdWVzdElkUmVmLmN1cnJlbnQpIHJldHVybjtcbiAgICAgICAgICAgIGlmIChsYXN0U2lnbmF0dXJlUmVmLmN1cnJlbnQgIT09IGZpbHRlclNpZ25hdHVyZSkgcmV0dXJuO1xuICAgICAgICAgICAgbG9hZEFjdGl2aXRpZXMocGFnZSwge1xuICAgICAgICAgICAgICBmcm9tRGF0ZTogZnJvbURhdGVTdHIsXG4gICAgICAgICAgICAgIHRvRGF0ZTogdG9EYXRlU3RyLFxuICAgICAgICAgICAgICBhY2NvdW50TnVtOiBhY2NvdW50TnVtU3RyLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSwgcmV0cnlEZWxheU1zKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKGVycj8ubWVzc2FnZSB8fCBpbmRUKFwiQXBpX1JlcXVlc3RGYWlsZWRcIiwgXCJObyBzZSBwdWRvIGNvbmVjdGFyIGNvbiBlbCBzZXJ2aWRvciAocmVkKS5cIikpO1xuICAgICAgICBhY3RpdmVBYm9ydFJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVxdWVzdElkICE9PSBhY3RpdmVSZXF1ZXN0SWRSZWYuY3VycmVudCkgcmV0dXJuO1xuXG4gICAgICBvbkRlYnVnPy4oXCJsb2FkQWN0aXZpdGllczpyZXNwb25zZVwiLCB7XG4gICAgICAgIHN0YXR1czogMjAwLFxuICAgICAgICB0b3RhbDogZGF0YT8udG90YWwgPz8gMCxcbiAgICAgICAgY291bnQ6IEFycmF5LmlzQXJyYXkoZGF0YT8uaXRlbXMpID8gZGF0YS5pdGVtcy5sZW5ndGggOiAwLFxuICAgICAgfSk7XG5cbiAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XG4gICAgICBzZXRJdGVtcyhkYXRhLml0ZW1zIHx8IFtdKTtcbiAgICAgIHNldFRvdGFsKGRhdGEudG90YWwgfHwgKGRhdGEuaXRlbXMgfHwgW10pLmxlbmd0aCk7XG4gICAgICBhY3RpdmVBYm9ydFJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICB9LFxuICAgIFtcbiAgICAgIGFib3J0QWN0aXZlUmVxdWVzdCxcbiAgICAgIGFjY291bnROdW1WYWx1ZSxcbiAgICAgIGNsZWFyUmV0cnlUaW1lcixcbiAgICAgIGZyb21EYXRlVmFsdWUsXG4gICAgICBub3JtYWxpemVSYW5nZSxcbiAgICAgIG9uRGVidWcsXG4gICAgICBvbkZvcmJpZGRlbixcbiAgICAgIHBhZ2VTaXplLFxuICAgICAgcmV0cnlEZWxheU1zLFxuICAgICAgdG9EYXRlVmFsdWUsXG4gICAgXVxuICApO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGNsZWFyUmV0cnlUaW1lcigpO1xuICAgICAgYWJvcnRBY3RpdmVSZXF1ZXN0KCk7XG4gICAgfTtcbiAgfSwgW2Fib3J0QWN0aXZlUmVxdWVzdCwgY2xlYXJSZXRyeVRpbWVyXSk7XG5cbiAgcmV0dXJuIHtcbiAgICBpdGVtcyxcbiAgICB0b3RhbCxcbiAgICBjdXJyZW50UGFnZSxcbiAgICBpc0xvYWRpbmcsXG4gICAgZXJyb3JNZXNzYWdlLFxuICAgIGxvYWRBY3Rpdml0aWVzLFxuICAgIHJlc2V0QWN0aXZpdGllcyxcbiAgICByZXRyeU9uTmV0d29ya0Vycm9yUmVmLFxuICAgIGxhc3RTaWduYXR1cmVSZWYsXG4gIH07XG59O1xuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBISVNUT1JZX0ZJTFRFUl9LRVksIEhJU1RPUllfUkVUVVJOX0ZMQUdfS0VZIH0gZnJvbSBcIi4uL3V0aWxzL3Zpc2l0YXNIaXN0b3J5LnRzXCI7XG5pbXBvcnQge1xuICBnZXRTZXNzaW9uSnNvbldpdGhFeHBpcnksXG4gIGdldFNlc3Npb25WYWx1ZVdpdGhFeHBpcnksXG4gIHJlbW92ZVNlc3Npb25WYWx1ZVdpdGhFeHBpcnksXG4gIHNldFNlc3Npb25Kc29uV2l0aEV4cGlyeSxcbiAgc2V0U2Vzc2lvblZhbHVlV2l0aEV4cGlyeSxcbn0gZnJvbSBcIi4uL3V0aWxzL3Nlc3Npb25FeHBpcnkudHNcIjtcblxuZXhwb3J0IHR5cGUgSGlzdG9yeUNhY2hlZEZpbHRlciA9IHtcbiAgZnJvbURhdGU6IHN0cmluZztcbiAgdG9EYXRlOiBzdHJpbmc7XG4gIHBhZ2U/OiBudW1iZXI7XG4gIGNsaWVudEFjY291bnQ/OiBzdHJpbmc7XG4gIGNsaWVudFRleHQ/OiBzdHJpbmc7XG59O1xuXG5jb25zdCBISVNUT1JZX0NBQ0hFX1RUTF9NUyA9IDEyICogNjAgKiA2MCAqIDEwMDA7XG5cbmNvbnN0IG5vcm1hbGl6ZUNhY2hlZEZpbHRlciA9ICh2YWx1ZTogSGlzdG9yeUNhY2hlZEZpbHRlciB8IG51bGwpOiBIaXN0b3J5Q2FjaGVkRmlsdGVyIHwgbnVsbCA9PiB7XG4gIGlmICghdmFsdWUgfHwgdHlwZW9mIHZhbHVlICE9PSBcIm9iamVjdFwiKSByZXR1cm4gbnVsbDtcbiAgcmV0dXJuIHtcbiAgICBmcm9tRGF0ZTogdmFsdWUuZnJvbURhdGUgfHwgXCJcIixcbiAgICB0b0RhdGU6IHZhbHVlLnRvRGF0ZSB8fCBcIlwiLFxuICAgIHBhZ2U6IHZhbHVlLnBhZ2UsXG4gICAgY2xpZW50QWNjb3VudDogdmFsdWUuY2xpZW50QWNjb3VudCB8fCBcIlwiLFxuICAgIGNsaWVudFRleHQ6IHZhbHVlLmNsaWVudFRleHQgfHwgXCJcIixcbiAgfTtcbn07XG5cbi8vIEtlZXBzIGhpc3RvcnkgZmlsdGVyIGNhY2hlIHJlYWRzL3dyaXRlcyBpbiBvbmUgcGxhY2UuXG5leHBvcnQgY29uc3QgdXNlSGlzdG9yeUZpbHRlckNhY2hlID0gKCkgPT4ge1xuICBjb25zdCByZWFkQ2FjaGVkRmlsdGVyID0gdXNlQ2FsbGJhY2soKCk6IEhpc3RvcnlDYWNoZWRGaWx0ZXIgfCBudWxsID0+IHtcbiAgICBjb25zdCBwYXJzZWQgPSBnZXRTZXNzaW9uSnNvbldpdGhFeHBpcnk8SGlzdG9yeUNhY2hlZEZpbHRlcj4oSElTVE9SWV9GSUxURVJfS0VZKTtcbiAgICByZXR1cm4gbm9ybWFsaXplQ2FjaGVkRmlsdGVyKHBhcnNlZCk7XG4gIH0sIFtdKTtcblxuICBjb25zdCBjbGVhckZpbHRlckNhY2hlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIHJlbW92ZVNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoSElTVE9SWV9GSUxURVJfS0VZKTtcbiAgICByZW1vdmVTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KEhJU1RPUllfUkVUVVJOX0ZMQUdfS0VZKTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IGNvbnN1bWVSZXR1cm5GbGFnID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGNvbnN0IHJhdyA9IGdldFNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoSElTVE9SWV9SRVRVUk5fRkxBR19LRVkpO1xuICAgIGlmIChyYXcgPT09IFwiMVwiKSB7XG4gICAgICByZW1vdmVTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KEhJU1RPUllfUkVUVVJOX0ZMQUdfS0VZKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH0sIFtdKTtcblxuICBjb25zdCBzYXZlQ2FjaGVkRmlsdGVyID0gdXNlQ2FsbGJhY2soKGZpbHRlcjogSGlzdG9yeUNhY2hlZEZpbHRlcikgPT4ge1xuICAgIHNldFNlc3Npb25Kc29uV2l0aEV4cGlyeShISVNUT1JZX0ZJTFRFUl9LRVksIGZpbHRlciwgSElTVE9SWV9DQUNIRV9UVExfTVMpO1xuICAgIHNldFNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoSElTVE9SWV9SRVRVUk5fRkxBR19LRVksIFwiMVwiLCBISVNUT1JZX0NBQ0hFX1RUTF9NUyk7XG4gIH0sIFtdKTtcblxuICByZXR1cm4ge1xuICAgIHJlYWRDYWNoZWRGaWx0ZXIsXG4gICAgY2xlYXJGaWx0ZXJDYWNoZSxcbiAgICBjb25zdW1lUmV0dXJuRmxhZyxcbiAgICBzYXZlQ2FjaGVkRmlsdGVyLFxuICB9O1xufTtcbiIsICJcdUZFRkZpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2ssIHVzZU1lbW8sIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB0eXBlIHsgTW91c2VFdmVudCBhcyBSZWFjdE1vdXNlRXZlbnQgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB0eXBlIHsgQ2xpZW50T3B0aW9uIH0gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvdmlzaXRhcy9DbGllbnRTZWFyY2hDb21ib2JveC50c3hcIjtcbmltcG9ydCB0eXBlIHsgSGlzdG9yeUNhY2hlZEZpbHRlciB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VIaXN0b3J5RmlsdGVyQ2FjaGUudHNcIjtcblxuZXhwb3J0IHR5cGUgUXVpY2tGaWx0ZXJJZCA9IFwiY3VzdG9tXCIgfCBcImRheXMtN1wiIHwgXCJkYXlzLTMwXCIgfCBcImRheXMtOTBcIjtcblxuZXhwb3J0IHR5cGUgTG9hZE92ZXJyaWRlID0ge1xuICBmcm9tRGF0ZTogc3RyaW5nO1xuICB0b0RhdGU6IHN0cmluZztcbiAgYWNjb3VudE51bT86IHN0cmluZztcbn07XG5cbmV4cG9ydCB0eXBlIEZpbHRlckxvYWRSZXF1ZXN0ID0ge1xuICBwYWdlOiBudW1iZXI7XG4gIG92ZXJyaWRlOiBMb2FkT3ZlcnJpZGU7XG59O1xuXG50eXBlIFVzZUhpc3RvcnlGaWx0ZXJzU3RhdGVBcmdzID0ge1xuICBkZWZhdWx0RnJvbURhdGU6IHN0cmluZztcbiAgZGVmYXVsdFRvRGF0ZTogc3RyaW5nO1xuICBsb2dIaXN0b3J5OiAobWVzc2FnZTogc3RyaW5nLCBkYXRhPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pID0+IHZvaWQ7XG4gIHBhcnNlRGF0ZVZhbHVlOiAodmFsdWU6IHN0cmluZykgPT4gRGF0ZSB8IG51bGw7XG4gIHBhcnNlSVNPOiAodmFsdWU6IHN0cmluZykgPT4gRGF0ZSB8IG51bGw7XG4gIHRvSVNPOiAodmFsdWU6IERhdGUpID0+IHN0cmluZztcbiAgc3RhcnRPZkRheTogKHZhbHVlOiBEYXRlKSA9PiBEYXRlO1xuICBpc0JlZm9yZTogKGE6IERhdGUgfCBudWxsLCBiOiBEYXRlIHwgbnVsbCkgPT4gYm9vbGVhbjtcbn07XG5cbi8vIEVuY2Fwc3VsYXRlcyBoaXN0b3J5IGZpbHRlciBzdGF0ZSBhbmQgZGF0ZS1yYW5nZSBvcmNoZXN0cmF0aW9uLlxuZXhwb3J0IGNvbnN0IHVzZUhpc3RvcnlGaWx0ZXJzU3RhdGUgPSAoe1xuICBkZWZhdWx0RnJvbURhdGUsXG4gIGRlZmF1bHRUb0RhdGUsXG4gIGxvZ0hpc3RvcnksXG4gIHBhcnNlRGF0ZVZhbHVlLFxuICBwYXJzZUlTTyxcbiAgdG9JU08sXG4gIHN0YXJ0T2ZEYXksXG4gIGlzQmVmb3JlLFxufTogVXNlSGlzdG9yeUZpbHRlcnNTdGF0ZUFyZ3MpID0+IHtcbiAgY29uc3QgW3N0YXJ0RGF0ZSwgc2V0U3RhcnREYXRlXSA9IHVzZVN0YXRlPERhdGUgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW2VuZERhdGUsIHNldEVuZERhdGVdID0gdXNlU3RhdGU8RGF0ZSB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbbWFudWFsU3RhcnREYXRlLCBzZXRNYW51YWxTdGFydERhdGVdID0gdXNlU3RhdGU8RGF0ZSB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbbWFudWFsRW5kRGF0ZSwgc2V0TWFudWFsRW5kRGF0ZV0gPSB1c2VTdGF0ZTxEYXRlIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtob3ZlckRhdGUsIHNldEhvdmVyRGF0ZV0gPSB1c2VTdGF0ZTxEYXRlIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtzZWxlY3RpbmdTdGVwLCBzZXRTZWxlY3RpbmdTdGVwXSA9IHVzZVN0YXRlPFwic3RhcnRcIiB8IFwiZW5kXCIgfCBcImRvbmVcIj4oXCJzdGFydFwiKTtcbiAgY29uc3QgW2N1cnJlbnRNb250aCwgc2V0Q3VycmVudE1vbnRoXSA9IHVzZVN0YXRlKG5ldyBEYXRlKCkuZ2V0TW9udGgoKSk7XG4gIGNvbnN0IFtjdXJyZW50WWVhciwgc2V0Q3VycmVudFllYXJdID0gdXNlU3RhdGUobmV3IERhdGUoKS5nZXRGdWxsWWVhcigpKTtcbiAgY29uc3QgW2lzT3Blbiwgc2V0SXNPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3Nob3dNYW51YWxQaWNrZXJQYW5lbCwgc2V0U2hvd01hbnVhbFBpY2tlclBhbmVsXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2FjdGl2ZVF1aWNrRmlsdGVyLCBzZXRBY3RpdmVRdWlja0ZpbHRlcl0gPSB1c2VTdGF0ZTxRdWlja0ZpbHRlcklkIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtzZWxlY3RlZENsaWVudCwgc2V0U2VsZWN0ZWRDbGllbnRdID0gdXNlU3RhdGU8Q2xpZW50T3B0aW9uIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtjbGllbnRSZXNldEtleSwgc2V0Q2xpZW50UmVzZXRLZXldID0gdXNlU3RhdGUoMCk7XG4gIGNvbnN0IFtzaG93RmlsdGVycywgc2V0U2hvd0ZpbHRlcnNdID0gdXNlU3RhdGUodHJ1ZSk7XG4gIGNvbnN0IFtzaG93TWFudWFsRXJyb3IsIHNldFNob3dNYW51YWxFcnJvcl0gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgY29uc3QgaGFzUmVzdG9yZWRGaWx0ZXJSZWYgPSB1c2VSZWYoZmFsc2UpO1xuICBjb25zdCBkaWRJbml0RmlsdGVyUmVmID0gdXNlUmVmKGZhbHNlKTtcblxuICBjb25zdCBmcm9tRGF0ZVZhbHVlID0gdXNlTWVtbygoKSA9PiAoc3RhcnREYXRlID8gdG9JU08oc3RhcnREYXRlKSA6IFwiXCIpLCBbc3RhcnREYXRlLCB0b0lTT10pO1xuICBjb25zdCB0b0RhdGVWYWx1ZSA9IHVzZU1lbW8oKCkgPT4gKGVuZERhdGUgPyB0b0lTTyhlbmREYXRlKSA6IFwiXCIpLCBbZW5kRGF0ZSwgdG9JU09dKTtcbiAgY29uc3QgYWNjb3VudE51bVZhbHVlID0gdXNlTWVtbygoKSA9PiAoc2VsZWN0ZWRDbGllbnQgPyBzZWxlY3RlZENsaWVudC52YWx1ZSA6IFwiXCIpLCBbc2VsZWN0ZWRDbGllbnRdKTtcblxuICBjb25zdCB2YWxpZGF0ZU1hbnVhbFJhbmdlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmIChhY3RpdmVRdWlja0ZpbHRlciA9PT0gXCJjdXN0b21cIiAmJiAoIXN0YXJ0RGF0ZSB8fCAhZW5kRGF0ZSkpIHtcbiAgICAgIHNldFNob3dNYW51YWxFcnJvcih0cnVlKTtcbiAgICAgIHNldFNlbGVjdGluZ1N0ZXAoIXN0YXJ0RGF0ZSA/IFwic3RhcnRcIiA6IFwiZW5kXCIpO1xuICAgICAgc2V0U2hvd01hbnVhbFBpY2tlclBhbmVsKHRydWUpO1xuICAgICAgc2V0SXNPcGVuKHRydWUpO1xuICAgICAgc2V0U2hvd0ZpbHRlcnModHJ1ZSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9LCBbYWN0aXZlUXVpY2tGaWx0ZXIsIGVuZERhdGUsIHN0YXJ0RGF0ZV0pO1xuXG4gIC8vIEFwcGxpZXMgYSBkZWZhdWx0IGRhdGUgcmFuZ2UgYW5kIHJldHVybnMgdGhlIGxvYWQgcGF5bG9hZCBuZWVkZWQgYnkgdGhlIHBhZ2UuXG4gIGNvbnN0IGFwcGx5RGVmYXVsdFJhbmdlRnJvbVByb3BzID0gdXNlQ2FsbGJhY2soKCk6IEZpbHRlckxvYWRSZXF1ZXN0IHwgbnVsbCA9PiB7XG4gICAgaWYgKCFkZWZhdWx0RnJvbURhdGUgfHwgIWRlZmF1bHRUb0RhdGUpIHJldHVybiBudWxsO1xuICAgIGNvbnN0IHN0YXJ0UmF3ID0gcGFyc2VEYXRlVmFsdWUoZGVmYXVsdEZyb21EYXRlKTtcbiAgICBjb25zdCBlbmRSYXcgPSBwYXJzZURhdGVWYWx1ZShkZWZhdWx0VG9EYXRlKTtcbiAgICBpZiAoIXN0YXJ0UmF3IHx8ICFlbmRSYXcpIHJldHVybiBudWxsO1xuXG4gICAgY29uc3Qgc3RhcnREYXkgPSBzdGFydE9mRGF5KHN0YXJ0UmF3KTtcbiAgICBjb25zdCBlbmREYXkgPSBzdGFydE9mRGF5KGVuZFJhdyk7XG5cbiAgICBsZXQgc3RhcnQgPSBzdGFydERheTtcbiAgICBsZXQgZW5kID0gZW5kRGF5O1xuICAgIGlmIChpc0JlZm9yZShlbmQsIHN0YXJ0KSkge1xuICAgICAgY29uc3Qgc3dhcCA9IHN0YXJ0O1xuICAgICAgc3RhcnQgPSBlbmQ7XG4gICAgICBlbmQgPSBzd2FwO1xuICAgIH1cblxuICAgIHNldFN0YXJ0RGF0ZShzdGFydCk7XG4gICAgc2V0RW5kRGF0ZShlbmQpO1xuICAgIHNldFNlbGVjdGluZ1N0ZXAoXCJkb25lXCIpO1xuICAgIHNldEhvdmVyRGF0ZShudWxsKTtcbiAgICBzZXRDdXJyZW50TW9udGgoc3RhcnQuZ2V0TW9udGgoKSk7XG4gICAgc2V0Q3VycmVudFllYXIoc3RhcnQuZ2V0RnVsbFllYXIoKSk7XG4gICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIobnVsbCk7XG4gICAgc2V0U2VsZWN0ZWRDbGllbnQobnVsbCk7XG4gICAgc2V0SXNPcGVuKGZhbHNlKTtcblxuICAgIHJldHVybiB7XG4gICAgICBwYWdlOiAxLFxuICAgICAgb3ZlcnJpZGU6IHtcbiAgICAgICAgZnJvbURhdGU6IHRvSVNPKHN0YXJ0KSxcbiAgICAgICAgdG9EYXRlOiB0b0lTTyhlbmQpLFxuICAgICAgICBhY2NvdW50TnVtOiBcIlwiLFxuICAgICAgfSxcbiAgICB9O1xuICB9LCBbZGVmYXVsdEZyb21EYXRlLCBkZWZhdWx0VG9EYXRlLCBpc0JlZm9yZSwgcGFyc2VEYXRlVmFsdWUsIHN0YXJ0T2ZEYXksIHRvSVNPXSk7XG5cbiAgLy8gUmVzZXRzIGhpc3RvcnkgZmlsdGVycyBsb2NhbCBzdGF0ZSBvbmx5LlxuICBjb25zdCByZXNldEhpc3RvcnlGaWx0ZXJzID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIHNldFN0YXJ0RGF0ZShudWxsKTtcbiAgICBzZXRFbmREYXRlKG51bGwpO1xuICAgIHNldE1hbnVhbFN0YXJ0RGF0ZShudWxsKTtcbiAgICBzZXRNYW51YWxFbmREYXRlKG51bGwpO1xuICAgIHNldFNlbGVjdGluZ1N0ZXAoXCJzdGFydFwiKTtcbiAgICBzZXRIb3ZlckRhdGUobnVsbCk7XG4gICAgc2V0Q3VycmVudE1vbnRoKG5ldyBEYXRlKCkuZ2V0TW9udGgoKSk7XG4gICAgc2V0Q3VycmVudFllYXIobmV3IERhdGUoKS5nZXRGdWxsWWVhcigpKTtcbiAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcihudWxsKTtcbiAgICBzZXRTaG93TWFudWFsUGlja2VyUGFuZWwoZmFsc2UpO1xuICAgIHNldFNlbGVjdGVkQ2xpZW50KG51bGwpO1xuICAgIHNldENsaWVudFJlc2V0S2V5KChwcmV2KSA9PiBwcmV2ICsgMSk7XG4gICAgc2V0U2hvd01hbnVhbEVycm9yKGZhbHNlKTtcbiAgfSwgW10pO1xuXG4gIC8vIEFwcGxpZXMgY2FjaGVkIGZpbHRlcnMgYW5kIHJldHVybnMgdGhlIGxvYWQgcGF5bG9hZCBuZWVkZWQgYnkgdGhlIHBhZ2UuXG4gIGNvbnN0IGFwcGx5Q2FjaGVkRmlsdGVyID0gdXNlQ2FsbGJhY2soXG4gICAgKGZpbHRlcjogSGlzdG9yeUNhY2hlZEZpbHRlciB8IG51bGwpOiBGaWx0ZXJMb2FkUmVxdWVzdCB8IG51bGwgPT4ge1xuICAgICAgaWYgKCFmaWx0ZXIgfHwgIWZpbHRlci5mcm9tRGF0ZSB8fCAhZmlsdGVyLnRvRGF0ZSkgcmV0dXJuIG51bGw7XG5cbiAgICAgIGNvbnN0IHN0YXJ0ID0gcGFyc2VJU08oZmlsdGVyLmZyb21EYXRlKTtcbiAgICAgIGNvbnN0IGVuZCA9IHBhcnNlSVNPKGZpbHRlci50b0RhdGUpO1xuICAgICAgc2V0U3RhcnREYXRlKHN0YXJ0KTtcbiAgICAgIHNldEVuZERhdGUoZW5kKTtcbiAgICAgIHNldFNlbGVjdGluZ1N0ZXAoZW5kID8gXCJkb25lXCIgOiBcImVuZFwiKTtcbiAgICAgIHNldEhvdmVyRGF0ZShudWxsKTtcbiAgICAgIHNldEN1cnJlbnRNb250aChzdGFydCA/IHN0YXJ0LmdldE1vbnRoKCkgOiBuZXcgRGF0ZSgpLmdldE1vbnRoKCkpO1xuICAgICAgc2V0Q3VycmVudFllYXIoc3RhcnQgPyBzdGFydC5nZXRGdWxsWWVhcigpIDogbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpKTtcbiAgICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKG51bGwpO1xuICAgICAgc2V0U2hvd01hbnVhbFBpY2tlclBhbmVsKGZhbHNlKTtcbiAgICAgIHNldFNob3dNYW51YWxFcnJvcihmYWxzZSk7XG5cbiAgICAgIGlmIChmaWx0ZXIuY2xpZW50QWNjb3VudCkge1xuICAgICAgICBzZXRTZWxlY3RlZENsaWVudCh7IHZhbHVlOiBmaWx0ZXIuY2xpZW50QWNjb3VudCwgdGV4dDogZmlsdGVyLmNsaWVudFRleHQgfHwgZmlsdGVyLmNsaWVudEFjY291bnQgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZXRTZWxlY3RlZENsaWVudChudWxsKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcGFnZVZhbCA9IE51bWJlcihmaWx0ZXIucGFnZSk7XG4gICAgICBjb25zdCBwYWdlVG9Mb2FkID0gTnVtYmVyLmlzRmluaXRlKHBhZ2VWYWwpICYmIHBhZ2VWYWwgPiAwID8gcGFnZVZhbCA6IDE7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHBhZ2U6IHBhZ2VUb0xvYWQsXG4gICAgICAgIG92ZXJyaWRlOiB7XG4gICAgICAgICAgZnJvbURhdGU6IGZpbHRlci5mcm9tRGF0ZSxcbiAgICAgICAgICB0b0RhdGU6IGZpbHRlci50b0RhdGUsXG4gICAgICAgICAgYWNjb3VudE51bTogZmlsdGVyLmNsaWVudEFjY291bnQgfHwgXCJcIixcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgfSxcbiAgICBbcGFyc2VJU09dXG4gICk7XG5cbiAgY29uc3QgaGFuZGxlU2VsZWN0ID0gdXNlQ2FsbGJhY2soXG4gICAgKGRhdGVPYmo6IERhdGUpID0+IHtcbiAgICAgIGxvZ0hpc3RvcnkoXCJoYW5kbGVTZWxlY3RcIiwge1xuICAgICAgICBjbGlja2VkOiB0b0lTTyhkYXRlT2JqKSxcbiAgICAgICAgc3RhcnQ6IGZyb21EYXRlVmFsdWUsXG4gICAgICAgIGVuZDogdG9EYXRlVmFsdWUsXG4gICAgICAgIHNlbGVjdGluZ1N0ZXAsXG4gICAgICB9KTtcblxuICAgICAgc2V0U2hvd01hbnVhbEVycm9yKGZhbHNlKTtcbiAgICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKFwiY3VzdG9tXCIpO1xuICAgICAgc2V0U2hvd01hbnVhbFBpY2tlclBhbmVsKHRydWUpO1xuICAgICAgY29uc3QgaGFzU3RhcnQgPSAhIXN0YXJ0RGF0ZTtcbiAgICAgIGNvbnN0IGhhc0VuZCA9ICEhZW5kRGF0ZTtcblxuICAgICAgaWYgKHNlbGVjdGluZ1N0ZXAgPT09IFwiZW5kXCIpIHtcbiAgICAgICAgaWYgKCFoYXNTdGFydCkge1xuICAgICAgICAgIHNldFN0YXJ0RGF0ZShkYXRlT2JqKTtcbiAgICAgICAgICBzZXRFbmREYXRlKG51bGwpO1xuICAgICAgICAgIHNldFNlbGVjdGluZ1N0ZXAoXCJlbmRcIik7XG4gICAgICAgICAgc2V0Q3VycmVudE1vbnRoKGRhdGVPYmouZ2V0TW9udGgoKSk7XG4gICAgICAgICAgc2V0Q3VycmVudFllYXIoZGF0ZU9iai5nZXRGdWxsWWVhcigpKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbmV3U3RhcnQgPSBzdGFydERhdGUgYXMgRGF0ZTtcbiAgICAgICAgbGV0IG5ld0VuZCA9IGRhdGVPYmo7XG4gICAgICAgIGlmIChpc0JlZm9yZShuZXdFbmQsIG5ld1N0YXJ0KSkge1xuICAgICAgICAgIGNvbnN0IHN3YXAgPSBuZXdTdGFydDtcbiAgICAgICAgICBuZXdTdGFydCA9IG5ld0VuZDtcbiAgICAgICAgICBuZXdFbmQgPSBzd2FwO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0U3RhcnREYXRlKG5ld1N0YXJ0KTtcbiAgICAgICAgc2V0RW5kRGF0ZShuZXdFbmQpO1xuICAgICAgICBzZXRNYW51YWxTdGFydERhdGUobmV3U3RhcnQpO1xuICAgICAgICBzZXRNYW51YWxFbmREYXRlKG5ld0VuZCk7XG4gICAgICAgIHNldFNlbGVjdGluZ1N0ZXAoXCJkb25lXCIpO1xuICAgICAgICBzZXRDdXJyZW50TW9udGgobmV3RW5kLmdldE1vbnRoKCkpO1xuICAgICAgICBzZXRDdXJyZW50WWVhcihuZXdFbmQuZ2V0RnVsbFllYXIoKSk7XG4gICAgICAgIHNldEhvdmVyRGF0ZShudWxsKTtcbiAgICAgICAgc2V0SXNPcGVuKGZhbHNlKTtcbiAgICAgICAgc2V0U2hvd01hbnVhbFBpY2tlclBhbmVsKGZhbHNlKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBuZXdTdGFydCA9IGRhdGVPYmo7XG4gICAgICBpZiAoaGFzRW5kICYmIGVuZERhdGUgJiYgaXNCZWZvcmUoZW5kRGF0ZSwgbmV3U3RhcnQpKSB7XG4gICAgICAgIHNldFN0YXJ0RGF0ZShuZXdTdGFydCk7XG4gICAgICAgIHNldEVuZERhdGUobnVsbCk7XG4gICAgICAgIHNldFNlbGVjdGluZ1N0ZXAoXCJlbmRcIik7XG4gICAgICAgIHNldEN1cnJlbnRNb250aChuZXdTdGFydC5nZXRNb250aCgpKTtcbiAgICAgICAgc2V0Q3VycmVudFllYXIobmV3U3RhcnQuZ2V0RnVsbFllYXIoKSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgc2V0U3RhcnREYXRlKG5ld1N0YXJ0KTtcbiAgICAgIGlmIChoYXNFbmQgJiYgZW5kRGF0ZSkge1xuICAgICAgICBzZXRFbmREYXRlKGVuZERhdGUpO1xuICAgICAgICBzZXRNYW51YWxTdGFydERhdGUobmV3U3RhcnQpO1xuICAgICAgICBzZXRNYW51YWxFbmREYXRlKGVuZERhdGUpO1xuICAgICAgICBzZXRTZWxlY3RpbmdTdGVwKFwiZG9uZVwiKTtcbiAgICAgICAgc2V0SG92ZXJEYXRlKG51bGwpO1xuICAgICAgICBzZXRJc09wZW4oZmFsc2UpO1xuICAgICAgICBzZXRTaG93TWFudWFsUGlja2VyUGFuZWwoZmFsc2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2V0RW5kRGF0ZShudWxsKTtcbiAgICAgICAgc2V0U2VsZWN0aW5nU3RlcChcImVuZFwiKTtcbiAgICAgIH1cblxuICAgICAgc2V0Q3VycmVudE1vbnRoKG5ld1N0YXJ0LmdldE1vbnRoKCkpO1xuICAgICAgc2V0Q3VycmVudFllYXIobmV3U3RhcnQuZ2V0RnVsbFllYXIoKSk7XG4gICAgfSxcbiAgICBbZW5kRGF0ZSwgZnJvbURhdGVWYWx1ZSwgaXNCZWZvcmUsIGxvZ0hpc3RvcnksIHNlbGVjdGluZ1N0ZXAsIHN0YXJ0RGF0ZSwgdG9EYXRlVmFsdWUsIHRvSVNPXVxuICApO1xuXG4gIGNvbnN0IGhhbmRsZUNsZWFyU3RhdGUgPSB1c2VDYWxsYmFjayhcbiAgICAoZXZlbnQ6IFJlYWN0TW91c2VFdmVudCkgPT4ge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBsb2dIaXN0b3J5KFwiY2xlYXJSYW5nZVwiKTtcbiAgICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKG51bGwpO1xuICAgICAgc2V0U2hvd01hbnVhbEVycm9yKGZhbHNlKTtcbiAgICAgIHNldFNob3dNYW51YWxQaWNrZXJQYW5lbChmYWxzZSk7XG4gICAgICByZXNldEhpc3RvcnlGaWx0ZXJzKCk7XG4gICAgICBzZXRJc09wZW4oZmFsc2UpO1xuICAgICAgc2V0U2hvd0ZpbHRlcnModHJ1ZSk7XG4gICAgfSxcbiAgICBbbG9nSGlzdG9yeSwgcmVzZXRIaXN0b3J5RmlsdGVyc11cbiAgKTtcblxuICBjb25zdCBvcGVuUG9wb3ZlciA9IHVzZUNhbGxiYWNrKFxuICAgIChzZWN0aW9uOiBcInN0YXJ0XCIgfCBcImVuZFwiKSA9PiB7XG4gICAgICBsb2dIaXN0b3J5KFwib3BlblBvcG92ZXJcIiwgeyBzZWN0aW9uLCBzdGFydDogZnJvbURhdGVWYWx1ZSwgZW5kOiB0b0RhdGVWYWx1ZSwgc2VsZWN0aW5nU3RlcCB9KTtcbiAgICAgIHNldFNob3dNYW51YWxFcnJvcihmYWxzZSk7XG4gICAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcihcImN1c3RvbVwiKTtcbiAgICAgIHNldFNob3dNYW51YWxQaWNrZXJQYW5lbCh0cnVlKTtcblxuICAgICAgaWYgKHNlY3Rpb24gPT09IFwiZW5kXCIgJiYgIXN0YXJ0RGF0ZSkge1xuICAgICAgICBzZXRTZWxlY3RpbmdTdGVwKFwic3RhcnRcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZXRTZWxlY3RpbmdTdGVwKHNlY3Rpb24pO1xuICAgICAgfVxuXG4gICAgICBzZXRJc09wZW4odHJ1ZSk7XG4gICAgfSxcbiAgICBbZnJvbURhdGVWYWx1ZSwgbG9nSGlzdG9yeSwgc2VsZWN0aW5nU3RlcCwgc3RhcnREYXRlLCB0b0RhdGVWYWx1ZV1cbiAgKTtcblxuICBjb25zdCBoYW5kbGVBY3RpdmF0b3JLZXlEb3duID0gdXNlQ2FsbGJhY2soXG4gICAgKGV2ZW50OiBSZWFjdC5LZXlib2FyZEV2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4ge1xuICAgICAgaWYgKGV2ZW50LmtleSAhPT0gXCJFbnRlclwiICYmIGV2ZW50LmtleSAhPT0gXCIgXCIpIHJldHVybjtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBvcGVuUG9wb3ZlcihcInN0YXJ0XCIpO1xuICAgIH0sXG4gICAgW29wZW5Qb3BvdmVyXVxuICApO1xuXG4gIGNvbnN0IGhhbmRsZVNlY3Rpb25LZXlEb3duID0gdXNlQ2FsbGJhY2soXG4gICAgKGV2ZW50OiBSZWFjdC5LZXlib2FyZEV2ZW50PEhUTUxEaXZFbGVtZW50Piwgc2VjdGlvbjogXCJzdGFydFwiIHwgXCJlbmRcIikgPT4ge1xuICAgICAgaWYgKGV2ZW50LmtleSAhPT0gXCJFbnRlclwiICYmIGV2ZW50LmtleSAhPT0gXCIgXCIpIHJldHVybjtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIG9wZW5Qb3BvdmVyKHNlY3Rpb24pO1xuICAgIH0sXG4gICAgW29wZW5Qb3BvdmVyXVxuICApO1xuXG4gIGNvbnN0IGFwcGx5UXVpY2tSYW5nZSA9IHVzZUNhbGxiYWNrKFxuICAgIChmaWx0ZXJJZDogUXVpY2tGaWx0ZXJJZCwgc3RhcnQ6IERhdGUsIGVuZDogRGF0ZSkgPT4ge1xuICAgICAgY29uc3Qgc3RhcnREYXkgPSBzdGFydE9mRGF5KHN0YXJ0KTtcbiAgICAgIGNvbnN0IGVuZERheSA9IHN0YXJ0T2ZEYXkoZW5kKTtcbiAgICAgIHNldFN0YXJ0RGF0ZShzdGFydERheSk7XG4gICAgICBzZXRFbmREYXRlKGVuZERheSk7XG4gICAgICBzZXRTZWxlY3RpbmdTdGVwKFwiZG9uZVwiKTtcbiAgICAgIHNldEhvdmVyRGF0ZShudWxsKTtcbiAgICAgIHNldEN1cnJlbnRNb250aChzdGFydERheS5nZXRNb250aCgpKTtcbiAgICAgIHNldEN1cnJlbnRZZWFyKHN0YXJ0RGF5LmdldEZ1bGxZZWFyKCkpO1xuICAgICAgc2V0SXNPcGVuKGZhbHNlKTtcbiAgICAgIHNldFNob3dNYW51YWxQaWNrZXJQYW5lbChmYWxzZSk7XG4gICAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcihmaWx0ZXJJZCk7XG4gICAgICBzZXRTaG93TWFudWFsRXJyb3IoZmFsc2UpO1xuICAgIH0sXG4gICAgW3N0YXJ0T2ZEYXldXG4gICk7XG5cbiAgY29uc3QgaGFuZGxlUXVpY2tGaWx0ZXIgPSB1c2VDYWxsYmFjayhcbiAgICAoZmlsdGVySWQ6IFF1aWNrRmlsdGVySWQpID0+IHtcbiAgICAgIGNvbnN0IHRvZGF5ID0gc3RhcnRPZkRheShuZXcgRGF0ZSgpKTtcblxuICAgICAgaWYgKGZpbHRlcklkID09PSBcImN1c3RvbVwiKSB7XG4gICAgICAgIC8vIFRvZ2dsZSBtYW51YWwgcGFuZWwgb24gZXZlcnkgRGF0ZSBidXR0b24gY2xpY2suXG4gICAgICAgIGlmIChzaG93TWFudWFsUGlja2VyUGFuZWwpIHtcbiAgICAgICAgICBzZXRTaG93TWFudWFsRXJyb3IoZmFsc2UpO1xuICAgICAgICAgIHNldEhvdmVyRGF0ZShudWxsKTtcbiAgICAgICAgICBzZXRTZWxlY3RpbmdTdGVwKHN0YXJ0RGF0ZSAmJiBlbmREYXRlID8gXCJkb25lXCIgOiBzdGFydERhdGUgPyBcImVuZFwiIDogXCJzdGFydFwiKTtcbiAgICAgICAgICBzZXRJc09wZW4oZmFsc2UpO1xuICAgICAgICAgIHNldFNob3dNYW51YWxQaWNrZXJQYW5lbChmYWxzZSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbmV4dFN0YXJ0ID0gbWFudWFsU3RhcnREYXRlID8gbmV3IERhdGUobWFudWFsU3RhcnREYXRlKSA6IHN0YXJ0RGF0ZSA/IG5ldyBEYXRlKHN0YXJ0RGF0ZSkgOiBudWxsO1xuICAgICAgICBjb25zdCBuZXh0RW5kID0gbWFudWFsRW5kRGF0ZSA/IG5ldyBEYXRlKG1hbnVhbEVuZERhdGUpIDogZW5kRGF0ZSA/IG5ldyBEYXRlKGVuZERhdGUpIDogbnVsbDtcbiAgICAgICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIoXCJjdXN0b21cIik7XG4gICAgICAgIHNldFNob3dNYW51YWxQaWNrZXJQYW5lbCh0cnVlKTtcbiAgICAgICAgc2V0U3RhcnREYXRlKG5leHRTdGFydCk7XG4gICAgICAgIHNldEVuZERhdGUobmV4dEVuZCk7XG5cbiAgICAgICAgaWYgKG5leHRTdGFydCkge1xuICAgICAgICAgIHNldEN1cnJlbnRNb250aChuZXh0U3RhcnQuZ2V0TW9udGgoKSk7XG4gICAgICAgICAgc2V0Q3VycmVudFllYXIobmV4dFN0YXJ0LmdldEZ1bGxZZWFyKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQWx3YXlzIHJlb3BlbiB0aGUgbWFudWFsIGNhbGVuZGFyIHdoZW4gdGhlIGN1c3RvbSBkYXRlIHF1aWNrIGZpbHRlciBpcyBwcmVzc2VkLlxuICAgICAgICBzZXRTZWxlY3RpbmdTdGVwKG5leHRTdGFydCAmJiAhbmV4dEVuZCA/IFwiZW5kXCIgOiBcInN0YXJ0XCIpO1xuICAgICAgICBzZXRJc09wZW4odHJ1ZSk7XG4gICAgICAgIHNldEhvdmVyRGF0ZShudWxsKTtcbiAgICAgICAgc2V0U2hvd01hbnVhbEVycm9yKGZhbHNlKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoZmlsdGVySWQgPT09IFwiZGF5cy03XCIpIHtcbiAgICAgICAgY29uc3Qgc3RhcnQgPSBuZXcgRGF0ZSh0b2RheSk7XG4gICAgICAgIHN0YXJ0LnNldERhdGUodG9kYXkuZ2V0RGF0ZSgpIC0gNik7XG4gICAgICAgIGFwcGx5UXVpY2tSYW5nZShmaWx0ZXJJZCwgc3RhcnQsIHRvZGF5KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoZmlsdGVySWQgPT09IFwiZGF5cy0zMFwiKSB7XG4gICAgICAgIGNvbnN0IHN0YXJ0ID0gbmV3IERhdGUodG9kYXkpO1xuICAgICAgICBzdGFydC5zZXREYXRlKHRvZGF5LmdldERhdGUoKSAtIDI5KTtcbiAgICAgICAgYXBwbHlRdWlja1JhbmdlKGZpbHRlcklkLCBzdGFydCwgdG9kYXkpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChmaWx0ZXJJZCA9PT0gXCJkYXlzLTkwXCIpIHtcbiAgICAgICAgY29uc3Qgc3RhcnQgPSBuZXcgRGF0ZSh0b2RheSk7XG4gICAgICAgIHN0YXJ0LnNldERhdGUodG9kYXkuZ2V0RGF0ZSgpIC0gODkpO1xuICAgICAgICBhcHBseVF1aWNrUmFuZ2UoZmlsdGVySWQsIHN0YXJ0LCB0b2RheSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBbYXBwbHlRdWlja1JhbmdlLCBlbmREYXRlLCBtYW51YWxFbmREYXRlLCBtYW51YWxTdGFydERhdGUsIHNob3dNYW51YWxQaWNrZXJQYW5lbCwgc3RhcnREYXRlLCBzdGFydE9mRGF5XVxuICApO1xuXG4gIGNvbnN0IGhhbmRsZUNsaWVudFNlbGVjdGVkID0gdXNlQ2FsbGJhY2soKGNsaWVudDogQ2xpZW50T3B0aW9uIHwgbnVsbCkgPT4ge1xuICAgIHNldFNlbGVjdGVkQ2xpZW50KGNsaWVudCk7XG4gIH0sIFtdKTtcblxuICByZXR1cm4ge1xuICAgIHN0YXJ0RGF0ZSxcbiAgICBlbmREYXRlLFxuICAgIG1hbnVhbFN0YXJ0RGF0ZSxcbiAgICBtYW51YWxFbmREYXRlLFxuICAgIGhvdmVyRGF0ZSxcbiAgICBzZWxlY3RpbmdTdGVwLFxuICAgIGN1cnJlbnRNb250aCxcbiAgICBjdXJyZW50WWVhcixcbiAgICBpc09wZW4sXG4gICAgc2hvd01hbnVhbFBpY2tlclBhbmVsLFxuICAgIGFjdGl2ZVF1aWNrRmlsdGVyLFxuICAgIHNlbGVjdGVkQ2xpZW50LFxuICAgIGNsaWVudFJlc2V0S2V5LFxuICAgIHNob3dGaWx0ZXJzLFxuICAgIHNob3dNYW51YWxFcnJvcixcbiAgICBmcm9tRGF0ZVZhbHVlLFxuICAgIHRvRGF0ZVZhbHVlLFxuICAgIGFjY291bnROdW1WYWx1ZSxcbiAgICBoYXNSZXN0b3JlZEZpbHRlclJlZixcbiAgICBkaWRJbml0RmlsdGVyUmVmLFxuICAgIHNldFN0YXJ0RGF0ZSxcbiAgICBzZXRFbmREYXRlLFxuICAgIHNldE1hbnVhbFN0YXJ0RGF0ZSxcbiAgICBzZXRNYW51YWxFbmREYXRlLFxuICAgIHNldEhvdmVyRGF0ZSxcbiAgICBzZXRTZWxlY3RpbmdTdGVwLFxuICAgIHNldEN1cnJlbnRNb250aCxcbiAgICBzZXRDdXJyZW50WWVhcixcbiAgICBzZXRJc09wZW4sXG4gICAgc2V0U2hvd01hbnVhbFBpY2tlclBhbmVsLFxuICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyLFxuICAgIHNldFNlbGVjdGVkQ2xpZW50LFxuICAgIHNldENsaWVudFJlc2V0S2V5LFxuICAgIHNldFNob3dGaWx0ZXJzLFxuICAgIHNldFNob3dNYW51YWxFcnJvcixcbiAgICB2YWxpZGF0ZU1hbnVhbFJhbmdlLFxuICAgIGFwcGx5RGVmYXVsdFJhbmdlRnJvbVByb3BzLFxuICAgIHJlc2V0SGlzdG9yeUZpbHRlcnMsXG4gICAgYXBwbHlDYWNoZWRGaWx0ZXIsXG4gICAgaGFuZGxlU2VsZWN0LFxuICAgIGhhbmRsZUNsZWFyU3RhdGUsXG4gICAgb3BlblBvcG92ZXIsXG4gICAgaGFuZGxlQWN0aXZhdG9yS2V5RG93bixcbiAgICBoYW5kbGVTZWN0aW9uS2V5RG93bixcbiAgICBoYW5kbGVRdWlja0ZpbHRlcixcbiAgICBoYW5kbGVDbGllbnRTZWxlY3RlZCxcbiAgfTtcbn07XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUFBLGdCQUF5RTs7O0FDQXpFLG1CQUEyQztBQWdJdkM7QUFuR0osSUFBTSxjQUFjO0FBQ3BCLElBQU0scUJBQXFCO0FBWTNCLElBQU0sZUFBZSxDQUFDLEVBQUUsT0FBTyxZQUFZLGNBQWMsV0FBVyxNQUFhO0FBQy9FLFFBQU0sbUJBQWUscUJBQThCLElBQUk7QUFDdkQsUUFBTSxrQkFBYyxxQkFBc0I7QUFBQSxJQUN4QyxRQUFRO0FBQUEsSUFDUixXQUFXO0FBQUEsSUFDWCxRQUFRO0FBQUEsSUFDUixRQUFRO0FBQUEsSUFDUixXQUFXO0FBQUEsSUFDWCxPQUFPO0FBQUEs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QU8sRUFBRSxTQUFTLFlBQVksU0FBUyxPQUFPO0FBQUEsUUFFOUM7QUFBQSx1REFBQyxTQUFJLFdBQVUsdUJBQXNCLFNBQVEsYUFBWSxNQUFLLFVBQVMsY0FBWSxLQUFLLG1CQUFtQixTQUFTLEdBQ2xILHVEQUFDLFlBQU8sV0FBVSx1QkFBc0IsSUFBRyxNQUFLLElBQUcsTUFBSyxHQUFFLEtBQUksYUFBWSxLQUFJLEdBQ2hGO0FBQUEsVUFDQyxLQUFLLG1CQUFtQixTQUFTO0FBQUE7QUFBQTtBQUFBLElBQ3BDO0FBQUEsSUFFQyxlQUNDLDhFQUNFO0FBQUE7QUFBQSxRQUFDO0FBQUE7QUFBQSxVQUNDLE9BQU87QUFBQSxVQUNQLFlBQVksS0FBSyx5QkFBeUIseUJBQXlCO0FBQUEsVUFDbkU7QUFBQSxVQUNBLFlBQVk7QUFBQTtBQUFBLE1BQ2Q7QUFBQSxNQUVBO0FBQUEsUUFBQztBQUFBO0FBQUEsVUFDQyxLQUFLO0FBQUEsVUFDTDtBQUFBLFVBQ0E7QUFBQSxVQUNBLFlBQVk7QUFBQSxVQUNaLFNBQVM7QUFBQSxVQUNULGNBQWMsQ0FBQyxTQUFTLGVBQWUsSUFBSTtBQUFBLFVBQzNDLFFBQVE7QUFBQTtBQUFBLE1BQ1Y7QUFBQSxPQUNGO0FBQUEsSUFFRCxrQkFDQztBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0MsT0FBTTtBQUFBLFFBQ04sV0FBVyxLQUFLLGlCQUFpQixRQUFRO0FBQUEsUUFDekMsTUFBTTtBQUFBLFFBQ04sT0FBTztBQUFBLFFBQ1AsUUFBUTtBQUFBO0FBQUEsSUFDVjtBQUFBLEtBRUo7QUFFSjtBQUdPLElBQU0sbUJBQW1CLENBQUMsU0FBc0I7QUFDckQsUUFBTSxrQkFBa0IsS0FBSyxhQUFhLG1CQUFtQixLQUFLO0FBQ2xFLFFBQU0sZ0JBQWdCLEtBQUssYUFBYSxpQkFBaUIsS0FBSztBQUU5RCxtQkFBaUIsTUFBTSw2Q0FBQyxlQUFZLGlCQUFrQyxlQUE4QixDQUFFO0FBQ3hHO0FBRUEsSUFBTSxRQUFRLE1BQU07QUFDbEIsUUFBTSxTQUFTLFNBQVMsZUFBZSxzQkFBc0I7QUFDN0QsTUFBSSxDQUFDLE9BQVE7QUFDYixtQkFBaUIsTUFBTTtBQUN6QjtBQUVBLHVCQUF1QixLQUFLO0FBRTVCLElBQU8sc0JBQVE7IiwKICAibmFtZXMiOiBbImltcG9ydF9yZWFjdCIsICJSZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAibG9nSGlzdG9yeSIsICJpbXBvcnRfcmVhY3QiLCAibG9nSGlzdG9yeSIsICJ0b1RpdGxlQ2FzZSIsICJmb3JtYXREYXRlUGFydHMiLCAiaW1wb3J0X3JlYWN0IiwgIm5vcm1hbGl6ZVJhbmdlIiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAibG9nSGlzdG9yeSIsICJwYXJzZURhdGVWYWx1ZSIsICJwYXJzZUlTTyIsICJ0b0lTTyIsICJzdGFydE9mRGF5IiwgImlzQmVmb3JlIiwgIm5ld1N0YXJ0IiwgImltcG9ydF9qc3hfcnVudGltZSJdCn0K
