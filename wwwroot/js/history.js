import {
  ClientSearchCombobox_default
} from "./chunks/chunk-WMKHB4BB.js";
import {
  ActionButton_default,
  FilterButton_default,
  HistoryManualDatePicker_default,
  HistorySummary_default
} from "./chunks/chunk-73XGBZGC.js";
import {
  CompactPagination_default,
  useTimelineCardEffects
} from "./chunks/chunk-KMD2MNHM.js";
import {
  HISTORY_FILTER_KEY,
  HISTORY_RETURN_FLAG_KEY
} from "./chunks/chunk-K7MECJ5E.js";
import {
  FloatingActionButton_default
} from "./chunks/chunk-3H4F5G6V.js";
import "./chunks/chunk-6HMZLOGF.js";
import {
  ApiFetchError,
  canAccess,
  classNames,
  fetchJson,
  indT,
  showPermissionModal
} from "./chunks/chunk-CEAHDJRV.js";
import {
  getSessionJsonWithExpiry,
  getSessionValueWithExpiry,
  removeSessionValueWithExpiry,
  setSessionJsonWithExpiry,
  setSessionValueWithExpiry
} from "./chunks/chunk-7SKLSV7K.js";
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvaGlzdG9yaWFsL0hpc3RvcnlQYWdlLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9oaXN0b3JpYWwvSGlzdG9yeVRhYmxlLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9oaXN0b3JpYWwvdXNlSGlzdG9yeVBhZ2VMaXN0ZW5lcnMudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvaGlzdG9yaWFsL3VzZUhpc3RvcnlUaW1lbGluZUl0ZW1zLnRzIiwgIi4uL3JlYWN0L3NyYy9ob29rcy91c2VIaXN0b3J5QWN0aXZpdGllcy50cyIsICIuLi9yZWFjdC9zcmMvaG9va3MvdXNlSGlzdG9yeUZpbHRlckNhY2hlLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy92aXNpdGFzL2hpc3RvcmlhbC91c2VIaXN0b3J5RmlsdGVyc1N0YXRlLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgY2xhc3NOYW1lcyB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9jbGFzc05hbWVzLnRzXCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB7IGNhbkFjY2Vzcywgc2hvd1Blcm1pc3Npb25Nb2RhbCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9wZXJtaXNzaW9ucy50c1wiO1xuaW1wb3J0IENsaWVudFNlYXJjaENvbWJvYm94IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL3Zpc2l0YXMvQ2xpZW50U2VhcmNoQ29tYm9ib3gudHN4XCI7XG5pbXBvcnQgSGlzdG9yeVRhYmxlIGZyb20gXCIuL0hpc3RvcnlUYWJsZS50c3hcIjtcbmltcG9ydCBIaXN0b3J5U3VtbWFyeSBmcm9tIFwiLi9IaXN0b3J5U3VtbWFyeS50c3hcIjtcbmltcG9ydCBIaXN0b3J5TWFudWFsRGF0ZVBpY2tlciwgeyBIaXN0b3J5TWFudWFsRGF5Q2VsbCB9IGZyb20gXCIuL0hpc3RvcnlNYW51YWxEYXRlUGlja2VyLnRzeFwiO1xuaW1wb3J0IHsgdXNlSGlzdG9yeVBhZ2VMaXN0ZW5lcnMgfSBmcm9tIFwiLi91c2VIaXN0b3J5UGFnZUxpc3RlbmVycy50c1wiO1xuaW1wb3J0IHsgdXNlSGlzdG9yeVRpbWVsaW5lSXRlbXMgfSBmcm9tIFwiLi91c2VIaXN0b3J5VGltZWxpbmVJdGVtcy50c1wiO1xuaW1wb3J0IEZsb2F0aW5nQWN0aW9uQnV0dG9uIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvRmxvYXRpbmdBY3Rpb25CdXR0b24udHN4XCI7XG5pbXBvcnQgQ29tcGFjdFBhZ2luYXRpb24gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9Db21wYWN0UGFnaW5hdGlvbi50c3hcIjtcbmltcG9ydCBGaWx0ZXJCdXR0b24gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9GaWx0ZXJCdXR0b24udHN4XCI7XG5pbXBvcnQgQWN0aW9uQnV0dG9uIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvQWN0aW9uQnV0dG9uLnRzeFwiO1xuaW1wb3J0IHsgdXNlSGlzdG9yeUFjdGl2aXRpZXMgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlSGlzdG9yeUFjdGl2aXRpZXMudHNcIjtcbmltcG9ydCB7IHVzZUhpc3RvcnlGaWx0ZXJDYWNoZSB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VIaXN0b3J5RmlsdGVyQ2FjaGUudHNcIjtcbmltcG9ydCB7IHVzZUhpc3RvcnlGaWx0ZXJzU3RhdGUgfSBmcm9tIFwiLi91c2VIaXN0b3J5RmlsdGVyc1N0YXRlLnRzXCI7XG5pbXBvcnQgeyBtb3VudFJlYWN0SXNsYW5kLCBtb3VudFdoZW5Eb2N1bWVudFJlYWR5IH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3JlYWN0SXNsYW5kLnRzeFwiO1xuXHJcbnR5cGUgUHJvcHMgPSB7XHJcbiAgZGVmYXVsdEZyb21EYXRlPzogc3RyaW5nO1xyXG4gIGRlZmF1bHRUb0RhdGU/OiBzdHJpbmc7XHJcbn07XHJcblxyXG50eXBlIENhbGVuZGFyQ2VsbCA9IHtcbiAgZGF0ZTogRGF0ZSB8IG51bGw7XG4gIGlzbzogc3RyaW5nO1xuICBpc0VtcHR5OiBib29sZWFuO1xyXG59O1xyXG5cclxuY29uc3QgUEFHRV9TSVpFID0gNjtcbmNvbnN0IFBBR0VfV0lORE9XID0gNjtcbmNvbnN0IE5BVl9ERUxBWV9NUyA9IDMyMDtcbmNvbnN0IEZBQl9CQVNFX0JPVFRPTSA9IDMyO1xuY29uc3QgRkFCX0NMRUFSQU5DRSA9IDI0O1xuY29uc3QgRkFCX0dBUCA9IDEyO1xuXHJcbmNvbnN0IG5vcm1hbGl6ZVVpTG9jYWxlID0gKGxvY2FsZTogc3RyaW5nKSA9PiB7XHJcbiAgY29uc3QgdmFsdWUgPSBTdHJpbmcobG9jYWxlIHx8IFwiXCIpLnRyaW0oKTtcclxuICBpZiAoIXZhbHVlKSByZXR1cm4gXCJlcy1FU1wiO1xyXG4gIGlmICgvXnpoLWhhbnMvaS50ZXN0KHZhbHVlKSkgcmV0dXJuIFwiemgtQ05cIjtcclxuICByZXR1cm4gdmFsdWU7XHJcbn07XHJcblxyXG5jb25zdCBpc0Jhc3F1ZUxvY2FsZSA9IChsb2NhbGU6IHN0cmluZykgPT4gL15ldVxcYi9pLnRlc3QoU3RyaW5nKGxvY2FsZSB8fCBcIlwiKSk7XHJcblxyXG5jb25zdCBCQVNRVUVfTU9OVEhTID0gW1xyXG4gIFwidXJ0YXJyaWxhXCIsXHJcbiAgXCJvdHNhaWxhXCIsXHJcbiAgXCJtYXJ0eG9hXCIsXHJcbiAgXCJhcGlyaWxhXCIsXHJcbiAgXCJtYWlhdHphXCIsXHJcbiAgXCJla2FpbmFcIixcclxuICBcInV6dGFpbGFcIixcclxuICBcImFidXp0dWFcIixcclxuICBcImlyYWlsYVwiLFxyXG4gIFwidXJyaWFcIixcclxuICBcImF6YXJvYVwiLFxyXG4gIFwiYWJlbmR1YVwiLFxyXG5dO1xyXG5cclxuY29uc3QgQkFTUVVFX01PTlRIU19TSE9SVCA9IFtcclxuICBcInVydFwiLFxyXG4gIFwib3RzXCIsXHJcbiAgXCJtYXJcIixcclxuICBcImFwaVwiLFxyXG4gIFwibWFpXCIsXHJcbiAgXCJla2FcIixcclxuICBcInV6dFwiLFxyXG4gIFwiYWJ1XCIsXHJcbiAgXCJpcmFcIixcclxuICBcInVyclwiLFxyXG4gIFwiYXphXCIsXHJcbiAgXCJhYmVcIixcclxuXTtcclxuXHJcbmNvbnN0IGdldFVpTG9jYWxlID0gKCkgPT4ge1xyXG4gIGNvbnN0IGZyb21IdG1sID0gdHlwZW9mIGRvY3VtZW50ICE9PSBcInVuZGVmaW5lZFwiID8gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmxhbmcgOiBcIlwiO1xyXG4gIGlmIChmcm9tSHRtbCAmJiBTdHJpbmcoZnJvbUh0bWwpLnRyaW0oKSkgcmV0dXJuIG5vcm1hbGl6ZVVpTG9jYWxlKGZyb21IdG1sKTtcclxuICByZXR1cm4gXCJlcy1FU1wiO1xyXG59O1xyXG5cclxuY29uc3QgcGFkID0gKG46IG51bWJlcikgPT4gbi50b1N0cmluZygpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcclxuXHJcbmNvbnN0IHRvSVNPID0gKGQ6IERhdGUpID0+IGAke2QuZ2V0RnVsbFllYXIoKX0tJHtwYWQoZC5nZXRNb250aCgpICsgMSl9LSR7cGFkKGQuZ2V0RGF0ZSgpKX1gO1xyXG5cclxuY29uc3Qgc3RhcnRPZkRheSA9IChkOiBEYXRlKSA9PiBuZXcgRGF0ZShkLmdldEZ1bGxZZWFyKCksIGQuZ2V0TW9udGgoKSwgZC5nZXREYXRlKCkpO1xyXG5cclxuY29uc3QgcGFyc2VJU08gPSAoczogc3RyaW5nKSA9PiB7XHJcbiAgaWYgKCFzKSByZXR1cm4gbnVsbDtcclxuICBjb25zdCBwYXJ0cyA9IHMuc3BsaXQoXCItXCIpLm1hcChOdW1iZXIpO1xyXG4gIGlmIChwYXJ0cy5sZW5ndGggIT09IDMpIHJldHVybiBudWxsO1xyXG4gIHJldHVybiBuZXcgRGF0ZShwYXJ0c1swXSwgcGFydHNbMV0gLSAxLCBwYXJ0c1syXSk7XHJcbn07XHJcblxyXG5jb25zdCBzYW1lRGF5ID0gKGE6IERhdGUgfCBudWxsLCBiOiBEYXRlIHwgbnVsbCkgPT4gISEoYSAmJiBiICYmIGEuZ2V0VGltZSgpID09PSBiLmdldFRpbWUoKSk7XHJcblxyXG5jb25zdCBpc0JlZm9yZSA9IChhOiBEYXRlIHwgbnVsbCwgYjogRGF0ZSB8IG51bGwpID0+ICEhKGEgJiYgYiAmJiBhLmdldFRpbWUoKSA8IGIuZ2V0VGltZSgpKTtcclxuXHJcbiAgY29uc3Qgbm9ybWFsaXplUmFuZ2UgPSAoZnJvbTogc3RyaW5nLCB0bzogc3RyaW5nKSA9PiB7XHJcbiAgICBpZiAoIWZyb20gfHwgIXRvKSByZXR1cm4geyBmcm9tLCB0byB9O1xyXG4gICAgY29uc3QgZnJvbURhdGUgPSBwYXJzZUlTTyhmcm9tKTtcclxuICAgIGNvbnN0IHRvRGF0ZSA9IHBhcnNlSVNPKHRvKTtcclxuICAgIGlmICghZnJvbURhdGUgfHwgIXRvRGF0ZSkgcmV0dXJuIHsgZnJvbSwgdG8gfTtcclxuICBpZiAoaXNCZWZvcmUodG9EYXRlLCBmcm9tRGF0ZSkpIHtcclxuICAgIHJldHVybiB7IGZyb206IHRvSVNPKHRvRGF0ZSksIHRvOiB0b0lTTyhmcm9tRGF0ZSkgfTtcclxuICB9XHJcbiAgcmV0dXJuIHsgZnJvbTogdG9JU08oZnJvbURhdGUpLCB0bzogdG9JU08odG9EYXRlKSB9O1xyXG59O1xyXG5cclxuICBjb25zdCBmb3JtYXREaXNwbGF5ID0gKGQ6IERhdGUsIGxvY2FsZTogc3RyaW5nKSA9PiB7XHJcbiAgaWYgKGlzQmFzcXVlTG9jYWxlKGxvY2FsZSkpIHtcclxuICAgIGNvbnN0IG1vbnRoID0gQkFTUVVFX01PTlRIU19TSE9SVFtkLmdldE1vbnRoKCldO1xyXG4gICAgcmV0dXJuIGAke2QuZ2V0RGF0ZSgpfSAke21vbnRofSAke2QuZ2V0RnVsbFllYXIoKX1gLnRvTG93ZXJDYXNlKCk7XHJcbiAgfVxyXG4gIHJldHVybiBkXHJcbiAgICAudG9Mb2NhbGVEYXRlU3RyaW5nKGxvY2FsZSwge1xyXG4gICAgICBkYXk6IFwibnVtZXJpY1wiLFxyXG4gICAgICBtb250aDogXCJzaG9ydFwiLFxyXG4gICAgICB5ZWFyOiBcIm51bWVyaWNcIixcclxuICAgIH0pXHJcbiAgICAucmVwbGFjZSgvXFwuL2csIFwiXCIpXHJcbiAgICAudG9Mb3dlckNhc2UoKTtcclxufTtcclxuXHJcbmNvbnN0IGZvcm1hdE1vbnRoTGFiZWwgPSAoZDogRGF0ZSwgbG9jYWxlOiBzdHJpbmcpID0+IHtcclxuICBpZiAoL156aC9pLnRlc3QobG9jYWxlKSkge1xyXG4gICAgcmV0dXJuIG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KGxvY2FsZSwgeyB5ZWFyOiBcIm51bWVyaWNcIiwgbW9udGg6IFwibG9uZ1wiIH0pLmZvcm1hdChkKTtcclxuICB9XHJcbiAgaWYgKGlzQmFzcXVlTG9jYWxlKGxvY2FsZSkpIHtcclxuICAgIHJldHVybiBgJHtCQVNRVUVfTU9OVEhTW2QuZ2V0TW9udGgoKV19ICR7ZC5nZXRGdWxsWWVhcigpfWA7XHJcbiAgfVxyXG4gIGNvbnN0IG1vbnRoTmFtZSA9IGQudG9Mb2NhbGVEYXRlU3RyaW5nKGxvY2FsZSwgeyBtb250aDogXCJsb25nXCIgfSk7XHJcbiAgY29uc3QgY2FwTW9udGhOYW1lID0gbW9udGhOYW1lICYmIC9bQS1aYS16XS8udGVzdChtb250aE5hbWVbMF0pXHJcbiAgICA/IG1vbnRoTmFtZVswXS50b0xvY2FsZVVwcGVyQ2FzZShsb2NhbGUpICsgbW9udGhOYW1lLnNsaWNlKDEpXHJcbiAgICA6IG1vbnRoTmFtZTtcclxuICByZXR1cm4gYCR7Y2FwTW9udGhOYW1lfSAke2QuZ2V0RnVsbFllYXIoKX1gO1xyXG59O1xyXG5cclxuY29uc3QgcGFyc2VEYXRlVmFsdWUgPSAodmFsdWU6IHN0cmluZykgPT4ge1xyXG4gIGlmICghdmFsdWUpIHJldHVybiBudWxsO1xyXG4gIGNvbnN0IHJhdyA9IFN0cmluZyh2YWx1ZSkudHJpbSgpO1xyXG4gIGlmICghcmF3KSByZXR1cm4gbnVsbDtcclxuXHJcbiAgY29uc3QgZGF0ZVBhcnQgPSByYXcuc3BsaXQoXCJUXCIpWzBdLnNwbGl0KFwiIFwiKVswXTtcclxuXHJcbiAgaWYgKC9eXFxkezR9LVxcZHsyfS1cXGR7Mn0kLy50ZXN0KGRhdGVQYXJ0KSkge1xyXG4gICAgY29uc3QgW3ksIG0sIGRdID0gZGF0ZVBhcnQuc3BsaXQoXCItXCIpLm1hcChOdW1iZXIpO1xyXG4gICAgcmV0dXJuIG5ldyBEYXRlKHksIG0gLSAxLCBkKTtcclxuICB9XHJcblxyXG4gIGlmICgvXlxcZHsyfVsuLy1dXFxkezJ9Wy4vLV1cXGR7NH0kLy50ZXN0KGRhdGVQYXJ0KSkge1xyXG4gICAgY29uc3QgcGFydHMgPSBkYXRlUGFydC5zcGxpdCgvWy4vLV0vKS5tYXAoTnVtYmVyKTtcclxuICAgIGNvbnN0IFtkLCBtLCB5XSA9IHBhcnRzO1xyXG4gICAgcmV0dXJuIG5ldyBEYXRlKHksIG0gLSAxLCBkKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHBhcnNlZCA9IG5ldyBEYXRlKHJhdyk7XHJcbiAgcmV0dXJuIE51bWJlci5pc05hTihwYXJzZWQuZ2V0VGltZSgpKSA/IG51bGwgOiBwYXJzZWQ7XHJcbn07XHJcblxyXG5jb25zdCBmb3JtYXREYXRlUGFydHMgPSAodmFsdWU6IHN0cmluZywgbG9jYWxlOiBzdHJpbmcpID0+IHtcclxuICBpZiAoIXZhbHVlKSByZXR1cm4geyB5ZWFyOiBcIlwiLCBtb250aDogXCJcIiwgZGF5OiBcIlwiIH07XHJcbiAgY29uc3QgZCA9IHBhcnNlRGF0ZVZhbHVlKHZhbHVlKTtcclxuICBpZiAoIWQpIHJldHVybiB7IHllYXI6IFwiXCIsIG1vbnRoOiBcIlwiLCBkYXk6IFwiXCIgfTtcclxuICBsZXQgbW9udGggPSBcIlwiO1xyXG4gIGlmIChpc0Jhc3F1ZUxvY2FsZShsb2NhbGUpKSB7XHJcbiAgICBtb250aCA9IEJBU1FVRV9NT05USFNfU0hPUlRbZC5nZXRNb250aCgpXSB8fCBcIlwiO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBtb250aCA9IGQudG9Mb2NhbGVEYXRlU3RyaW5nKGxvY2FsZSwgeyBtb250aDogXCJzaG9ydFwiIH0pLnJlcGxhY2UoL1xcLi9nLCBcIlwiKTtcclxuICB9XHJcbiAgcmV0dXJuIHtcclxuICAgIHllYXI6IFN0cmluZyhkLmdldEZ1bGxZZWFyKCkpLFxyXG4gICAgbW9udGg6IG1vbnRoLnRvVXBwZXJDYXNlKCksXHJcbiAgICBkYXk6IFN0cmluZyhkLmdldERhdGUoKSkucGFkU3RhcnQoMiwgXCIwXCIpLFxyXG4gIH07XHJcbn07XHJcblxyXG5jb25zdCB0b1RpdGxlQ2FzZSA9ICh2YWx1ZTogc3RyaW5nLCBsb2NhbGU6IHN0cmluZykgPT4ge1xyXG4gIGlmICghdmFsdWUpIHJldHVybiBcIlwiO1xyXG4gIGNvbnN0IGxvd2VyID0gdmFsdWUudG9Mb2NhbGVMb3dlckNhc2UobG9jYWxlKTtcclxuICB0cnkge1xyXG4gICAgcmV0dXJuIGxvd2VyLnJlcGxhY2UoLyhefFteXFxwe0x9XSkoXFxwe0x9KS9ndSwgKF9tYXRjaCwgcHJlZml4LCBjaCkgPT4gYCR7cHJlZml4fSR7Y2gudG9Mb2NhbGVVcHBlckNhc2UobG9jYWxlKX1gKTtcclxuICB9IGNhdGNoIHtcclxuICAgIHJldHVybiBsb3dlci5yZXBsYWNlKC8oXnxbXFxzLS9dKShcXFMpL2csIChfbWF0Y2gsIHByZWZpeCwgY2gpID0+IGAke3ByZWZpeH0ke2NoLnRvTG9jYWxlVXBwZXJDYXNlKGxvY2FsZSl9YCk7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgdG9TZW50ZW5jZUNhc2UgPSAodmFsdWU6IHN0cmluZywgbG9jYWxlOiBzdHJpbmcpID0+IHtcclxuICBpZiAoIXZhbHVlKSByZXR1cm4gXCJcIjtcclxuICBjb25zdCB0cmltbWVkID0gdmFsdWUudHJpbSgpO1xyXG4gIGlmICghdHJpbW1lZCkgcmV0dXJuIHRyaW1tZWQ7XHJcbiAgY29uc3QgbG93ZXIgPSB0cmltbWVkLnRvTG9jYWxlTG93ZXJDYXNlKGxvY2FsZSk7XHJcbiAgcmV0dXJuIGxvd2VyWzBdLnRvTG9jYWxlVXBwZXJDYXNlKGxvY2FsZSkgKyBsb3dlci5zbGljZSgxKTtcclxufTtcclxuXHJcbmNvbnN0IGxvZ0hpc3RvcnkgPSAobWVzc2FnZTogc3RyaW5nLCBkYXRhPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pID0+IHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybjtcbiAgY29uc3QgZGVidWdGbGFnID0gKHdpbmRvdyBhcyBhbnkpLl9fSU5EX0RFQlVHX0hJU1RPUllfXztcbiAgaWYgKGRlYnVnRmxhZyAhPT0gdHJ1ZSkgcmV0dXJuO1xuICBpZiAoZGF0YSkge1xuICAgIGNvbnNvbGUuZGVidWcoXCJbSGlzdG9yeV1cIiwgbWVzc2FnZSwgZGF0YSk7XG4gIH0gZWxzZSB7XG4gICAgY29uc29sZS5kZWJ1ZyhcIltIaXN0b3J5XVwiLCBtZXNzYWdlKTtcclxuICB9XHJcbn07XHJcblxyXG4vLyBIaXN0b3J5IHBhZ2Ugd2l0aCBSZWFjdCBzdGF0ZSArIGVmZmVjdHMgKG5vIGxlZ2FjeSBET00gbG9naWMpLlxyXG5leHBvcnQgY29uc3QgSGlzdG9yeVBhZ2UgPSAoeyBkZWZhdWx0RnJvbURhdGUgPSBcIlwiLCBkZWZhdWx0VG9EYXRlID0gXCJcIiB9OiBQcm9wcykgPT4ge1xyXG4gIGNvbnN0IGxvY2FsZSA9IHVzZU1lbW8oKCkgPT4gZ2V0VWlMb2NhbGUoKSwgW10pO1xyXG4gIGNvbnN0IGNhblZpZXdIaXN0b3J5ID0gY2FuQWNjZXNzKFwiVklTSVRBU19ISVNUT1JJQUxcIiwgXCJWaWV3XCIpO1xyXG4gIGNvbnN0IGNhbkNyZWF0ZVZpc2l0ID0gY2FuQWNjZXNzKFwiVklTSVRBU19DUkVBQ0lPTlwiLCBcIkFkZFwiKTtcclxuICBjb25zdCBub0RhdGFUZXh0ID0gaW5kVChcIkNvbW1vbl9Ob0RhdGFcIiwgXCJObyBkYXRhXCIpO1xyXG5cclxuICBjb25zdCBhY3RpdmF0b3JSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgcG9wb3ZlclJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBwYWdpbmF0aW9uUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XG5cclxuICBjb25zdCBbZmFiQm90dG9tLCBzZXRGYWJCb3R0b21dID0gdXNlU3RhdGUoRkFCX0JBU0VfQk9UVE9NKTtcblxuICBjb25zdCB7IHJlYWRDYWNoZWRGaWx0ZXIsIGNsZWFyRmlsdGVyQ2FjaGUsIGNvbnN1bWVSZXR1cm5GbGFnLCBzYXZlQ2FjaGVkRmlsdGVyIH0gPSB1c2VIaXN0b3J5RmlsdGVyQ2FjaGUoKTtcbiAgY29uc3Qge1xuICAgIHN0YXJ0RGF0ZSxcbiAgICBlbmREYXRlLFxuICAgIGhvdmVyRGF0ZSxcbiAgICBzZWxlY3RpbmdTdGVwLFxuICAgIGN1cnJlbnRNb250aCxcbiAgICBjdXJyZW50WWVhcixcbiAgICBpc09wZW4sXG4gICAgc2hvd01hbnVhbFBpY2tlclBhbmVsLFxuICAgIGFjdGl2ZVF1aWNrRmlsdGVyLFxuICAgIHNlbGVjdGVkQ2xpZW50LFxuICAgIGNsaWVudFJlc2V0S2V5LFxuICAgIHNob3dGaWx0ZXJzLFxuICAgIHNob3dNYW51YWxFcnJvcixcbiAgICBmcm9tRGF0ZVZhbHVlLFxuICAgIHRvRGF0ZVZhbHVlLFxuICAgIGFjY291bnROdW1WYWx1ZSxcbiAgICBoYXNSZXN0b3JlZEZpbHRlclJlZixcbiAgICBkaWRJbml0RmlsdGVyUmVmLFxuICAgIHNldEhvdmVyRGF0ZSxcbiAgICBzZXRTZWxlY3RpbmdTdGVwLFxuICAgIHNldEN1cnJlbnRNb250aCxcbiAgICBzZXRDdXJyZW50WWVhcixcbiAgICBzZXRJc09wZW4sXG4gICAgc2V0U2hvd0ZpbHRlcnMsXG4gICAgc2V0U2hvd01hbnVhbEVycm9yLFxuICAgIHZhbGlkYXRlTWFudWFsUmFuZ2UsXG4gICAgYXBwbHlEZWZhdWx0UmFuZ2VGcm9tUHJvcHMsXG4gICAgcmVzZXRIaXN0b3J5RmlsdGVycyxcbiAgICBhcHBseUNhY2hlZEZpbHRlcixcbiAgICBoYW5kbGVTZWxlY3QsXG4gICAgaGFuZGxlQ2xlYXJTdGF0ZSxcbiAgICBvcGVuUG9wb3ZlcixcbiAgICBoYW5kbGVBY3RpdmF0b3JLZXlEb3duLFxuICAgIGhhbmRsZVNlY3Rpb25LZXlEb3duLFxuICAgIGhhbmRsZVF1aWNrRmlsdGVyLFxuICAgIGhhbmRsZUNsaWVudFNlbGVjdGVkLFxuICB9ID0gdXNlSGlzdG9yeUZpbHRlcnNTdGF0ZSh7XG4gICAgZGVmYXVsdEZyb21EYXRlLFxuICAgIGRlZmF1bHRUb0RhdGUsXG4gICAgbG9nSGlzdG9yeSxcbiAgICBwYXJzZURhdGVWYWx1ZSxcbiAgICBwYXJzZUlTTyxcbiAgICB0b0lTTyxcbiAgICBzdGFydE9mRGF5LFxuICAgIGlzQmVmb3JlLFxuICB9KTtcblxuICBjb25zdCB7IGl0ZW1zLCB0b3RhbCwgY3VycmVudFBhZ2UsIGlzTG9hZGluZywgZXJyb3JNZXNzYWdlLCBsb2FkQWN0aXZpdGllcywgcmVzZXRBY3Rpdml0aWVzLCByZXRyeU9uTmV0d29ya0Vycm9yUmVmLCBsYXN0U2lnbmF0dXJlUmVmIH0gPVxuICAgIHVzZUhpc3RvcnlBY3Rpdml0aWVzKHtcbiAgICAgIGZyb21EYXRlVmFsdWUsXG4gICAgICB0b0RhdGVWYWx1ZSxcbiAgICAgIGFjY291bnROdW1WYWx1ZSxcbiAgICAgIHBhZ2VTaXplOiBQQUdFX1NJWkUsXG4gICAgICBub3JtYWxpemVSYW5nZSxcbiAgICAgIG9uRm9yYmlkZGVuOiBzaG93UGVybWlzc2lvbk1vZGFsLFxuICAgICAgb25EZWJ1ZzogbG9nSGlzdG9yeSxcbiAgICB9KTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGxvZ0hpc3RvcnkoXCJpbml0XCIsIHsgZGVmYXVsdEZyb21EYXRlLCBkZWZhdWx0VG9EYXRlIH0pO1xuICB9LCBbZGVmYXVsdEZyb21EYXRlLCBkZWZhdWx0VG9EYXRlXSk7XG5cclxuICBjb25zdCBhcHBseUZpbHRlcnMgPSB1c2VDYWxsYmFjayhcbiAgICAob3B0aW9ucz86IHsgY2xvc2VQYW5lbD86IGJvb2xlYW47IGZvcmNlPzogYm9vbGVhbjsgcGFnZT86IG51bWJlciB9KSA9PiB7XHJcbiAgICAgIGlmICghdmFsaWRhdGVNYW51YWxSYW5nZSgpKSByZXR1cm47XHJcbiAgICAgIGlmICghc3RhcnREYXRlIHx8ICFlbmREYXRlKSByZXR1cm47XHJcblxyXG4gICAgICBjb25zdCBub3JtYWxpemVkID0gbm9ybWFsaXplUmFuZ2UoZnJvbURhdGVWYWx1ZSwgdG9EYXRlVmFsdWUpO1xyXG4gICAgICBjb25zdCBwYWdlID0gb3B0aW9ucz8ucGFnZSA/PyAxO1xyXG4gICAgICBjb25zdCBzaWduYXR1cmUgPSBgJHtub3JtYWxpemVkLmZyb219fCR7bm9ybWFsaXplZC50b318JHthY2NvdW50TnVtVmFsdWV9fCR7cGFnZX1gO1xyXG5cclxuICAgICAgaWYgKG9wdGlvbnM/LmZvcmNlIHx8IGxhc3RTaWduYXR1cmVSZWYuY3VycmVudCAhPT0gc2lnbmF0dXJlKSB7XHJcbiAgICAgICAgbG9hZEFjdGl2aXRpZXMocGFnZSwgeyBmcm9tRGF0ZTogbm9ybWFsaXplZC5mcm9tLCB0b0RhdGU6IG5vcm1hbGl6ZWQudG8sIGFjY291bnROdW06IGFjY291bnROdW1WYWx1ZSB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2V0U2hvd01hbnVhbEVycm9yKGZhbHNlKTtcclxuICAgICAgaWYgKG9wdGlvbnM/LmNsb3NlUGFuZWwpIHtcclxuICAgICAgICBzZXRJc09wZW4oZmFsc2UpO1xyXG4gICAgICAgIHNldFNob3dGaWx0ZXJzKGZhbHNlKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFthY2NvdW50TnVtVmFsdWUsIGVuZERhdGUsIGZyb21EYXRlVmFsdWUsIGxvYWRBY3Rpdml0aWVzLCBzdGFydERhdGUsIHRvRGF0ZVZhbHVlLCB2YWxpZGF0ZU1hbnVhbFJhbmdlXVxyXG4gICk7XG5cbiAgY29uc3QgdG90YWxQYWdlcyA9IE1hdGguY2VpbCgodG90YWwgfHwgMCkgLyBQQUdFX1NJWkUpO1xuXG4gIC8vIEtlZXAgdGhlIGZsb2F0aW5nIGFjdGlvbiBidXR0b24gY2xlYXIgb2YgcGFnaW5hdGlvbiBvbiBzbWFsbCBzY3JlZW5zLlxuICBjb25zdCB1cGRhdGVGYWJCb3R0b20gPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKCFwYWdpbmF0aW9uUmVmLmN1cnJlbnQgfHwgdG90YWxQYWdlcyA8PSAxKSB7XG4gICAgICBzZXRGYWJCb3R0b20oRkFCX0JBU0VfQk9UVE9NKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgaGVpZ2h0ID0gcGFnaW5hdGlvblJlZi5jdXJyZW50Lm9mZnNldEhlaWdodCB8fCAwO1xuICAgIGNvbnN0IG5leHQgPSBNYXRoLm1heChGQUJfQkFTRV9CT1RUT00sIGhlaWdodCArIEZBQl9DTEVBUkFOQ0UgKyBGQUJfR0FQKTtcbiAgICBzZXRGYWJCb3R0b20oKHByZXYpID0+IChNYXRoLmFicyhwcmV2IC0gbmV4dCkgPCAxID8gcHJldiA6IG5leHQpKTtcbiAgfSwgW3RvdGFsUGFnZXNdKTtcblxuICB1c2VIaXN0b3J5UGFnZUxpc3RlbmVycyh7XG4gICAgaXNPcGVuLFxuICAgIGFjdGl2YXRvclJlZixcbiAgICBwb3BvdmVyUmVmLFxuICAgIHBhZ2luYXRpb25SZWYsXG4gICAgaGFzUmVzdG9yZWRGaWx0ZXJSZWYsXG4gICAgcmV0cnlPbk5ldHdvcmtFcnJvclJlZixcbiAgICBjdXJyZW50UGFnZSxcbiAgICB1cGRhdGVGYWJCb3R0b20sXG4gICAgbG9nSGlzdG9yeSxcbiAgICBjb25zdW1lUmV0dXJuRmxhZyxcbiAgICByZWFkQ2FjaGVkRmlsdGVyLFxuICAgIGFwcGx5Q2FjaGVkRmlsdGVyLFxuICAgIGxvYWRBY3Rpdml0aWVzLFxuICAgIHNldElzT3BlbixcbiAgICBzZXRIb3ZlckRhdGUsXG4gICAgc2V0U2hvd0ZpbHRlcnMsXG4gICAgYXBwbHlGaWx0ZXJzLFxuICB9KTtcblxuICAvLyBSZXN0b3JlIGNhY2hlZCBmaWx0ZXIgb24gaW5pdGlhbCBtb3VudCBvbmx5LlxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChkaWRJbml0RmlsdGVyUmVmLmN1cnJlbnQpIHJldHVybjtcbiAgICBkaWRJbml0RmlsdGVyUmVmLmN1cnJlbnQgPSB0cnVlO1xuICAgIGNvbnN0IGNhY2hlZCA9IGNvbnN1bWVSZXR1cm5GbGFnKCkgPyByZWFkQ2FjaGVkRmlsdGVyKCkgOiBudWxsO1xuICAgIGlmIChjYWNoZWQgJiYgY2FjaGVkLmZyb21EYXRlICYmIGNhY2hlZC50b0RhdGUpIHtcbiAgICAgIGxvZ0hpc3RvcnkoXCJyZXN0b3JlRmlsdGVyXCIsIGNhY2hlZCk7XG4gICAgICBjb25zdCBjYWNoZWRSZXF1ZXN0ID0gYXBwbHlDYWNoZWRGaWx0ZXIoY2FjaGVkKTtcbiAgICAgIGlmIChjYWNoZWRSZXF1ZXN0KSB7XG4gICAgICAgIHJldHJ5T25OZXR3b3JrRXJyb3JSZWYuY3VycmVudCA9IHRydWU7XG4gICAgICAgIGxvYWRBY3Rpdml0aWVzKGNhY2hlZFJlcXVlc3QucGFnZSwgY2FjaGVkUmVxdWVzdC5vdmVycmlkZSk7XG4gICAgICAgIHNldFNob3dGaWx0ZXJzKGZhbHNlKTtcbiAgICAgICAgc2V0SXNPcGVuKGZhbHNlKTtcbiAgICAgICAgaGFzUmVzdG9yZWRGaWx0ZXJSZWYuY3VycmVudCA9IHRydWU7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBkZWZhdWx0UmVxdWVzdCA9IGFwcGx5RGVmYXVsdFJhbmdlRnJvbVByb3BzKCk7XG4gICAgaWYgKGRlZmF1bHRSZXF1ZXN0KSB7XG4gICAgICByZXRyeU9uTmV0d29ya0Vycm9yUmVmLmN1cnJlbnQgPSB0cnVlO1xuICAgICAgbG9hZEFjdGl2aXRpZXMoZGVmYXVsdFJlcXVlc3QucGFnZSwgZGVmYXVsdFJlcXVlc3Qub3ZlcnJpZGUpO1xuICAgICAgc2V0U2hvd0ZpbHRlcnMoZmFsc2UpO1xuICAgICAgc2V0SXNPcGVuKGZhbHNlKTtcbiAgICAgIGhhc1Jlc3RvcmVkRmlsdGVyUmVmLmN1cnJlbnQgPSB0cnVlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHJlc2V0SGlzdG9yeUZpbHRlcnMoKTtcbiAgICBjbGVhckZpbHRlckNhY2hlKCk7XG4gICAgcmVzZXRBY3Rpdml0aWVzKCk7XG4gICAgc2V0U2hvd0ZpbHRlcnModHJ1ZSk7XG4gICAgc2V0SXNPcGVuKGZhbHNlKTtcbiAgfSwgW1xuICAgIGFwcGx5Q2FjaGVkRmlsdGVyLFxuICAgIGFwcGx5RGVmYXVsdFJhbmdlRnJvbVByb3BzLFxuICAgIGNsZWFyRmlsdGVyQ2FjaGUsXG4gICAgY29uc3VtZVJldHVybkZsYWcsXG4gICAgZGlkSW5pdEZpbHRlclJlZixcbiAgICBoYXNSZXN0b3JlZEZpbHRlclJlZixcbiAgICBsb2FkQWN0aXZpdGllcyxcbiAgICByZWFkQ2FjaGVkRmlsdGVyLFxuICAgIHJlc2V0QWN0aXZpdGllcyxcbiAgICByZXNldEhpc3RvcnlGaWx0ZXJzLFxuICAgIHJldHJ5T25OZXR3b3JrRXJyb3JSZWYsXG4gIF0pO1xuXHJcbiAgLy8gS2VlcCB0aGUgcGlja2VyIHN0ZXAgaW4gc3luYyB3aXRoIGN1cnJlbnQgc2VsZWN0aW9uLlxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoc3RhcnREYXRlICYmICFlbmREYXRlICYmIHNlbGVjdGluZ1N0ZXAgPT09IFwic3RhcnRcIikge1xyXG4gICAgICBzZXRTZWxlY3RpbmdTdGVwKFwiZW5kXCIpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoIXN0YXJ0RGF0ZSAmJiBzZWxlY3RpbmdTdGVwICE9PSBcInN0YXJ0XCIpIHtcclxuICAgICAgc2V0U2VsZWN0aW5nU3RlcChcInN0YXJ0XCIpO1xyXG4gICAgfVxyXG4gIH0sIFtzdGFydERhdGUsIGVuZERhdGUsIHNlbGVjdGluZ1N0ZXBdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQ2xlYXIgPSB1c2VDYWxsYmFjayhcbiAgICAoZXZlbnQ6IFJlYWN0Lk1vdXNlRXZlbnQpID0+IHtcbiAgICAgIGhhbmRsZUNsZWFyU3RhdGUoZXZlbnQpO1xuICAgICAgY2xlYXJGaWx0ZXJDYWNoZSgpO1xuICAgICAgcmVzZXRBY3Rpdml0aWVzKCk7XG4gICAgfSxcbiAgICBbY2xlYXJGaWx0ZXJDYWNoZSwgaGFuZGxlQ2xlYXJTdGF0ZSwgcmVzZXRBY3Rpdml0aWVzXVxuICApO1xuXG4gIGNvbnN0IGhhbmRsZVJlc2V0RmlsdGVycyA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICByZXNldEhpc3RvcnlGaWx0ZXJzKCk7XG4gICAgY2xlYXJGaWx0ZXJDYWNoZSgpO1xuICAgIHJlc2V0QWN0aXZpdGllcygpO1xuICAgIHNldElzT3BlbihmYWxzZSk7XG4gICAgc2V0U2hvd0ZpbHRlcnModHJ1ZSk7XG4gIH0sIFtjbGVhckZpbHRlckNhY2hlLCByZXNldEFjdGl2aXRpZXMsIHJlc2V0SGlzdG9yeUZpbHRlcnMsIHNldElzT3Blbiwgc2V0U2hvd0ZpbHRlcnNdKTtcblxyXG4gIGNvbnN0IGhhbmRsZU5hdmlnYXRlID0gdXNlQ2FsbGJhY2soXG4gICAgKGxpbmtJZDogc3RyaW5nKSA9PiB7XG4gICAgICBpZiAoIWNhblZpZXdIaXN0b3J5KSB7XG4gICAgICAgIHNob3dQZXJtaXNzaW9uTW9kYWwoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHNhdmVDYWNoZWRGaWx0ZXIoe1xuICAgICAgICAgIGZyb21EYXRlOiBmcm9tRGF0ZVZhbHVlIHx8IFwiXCIsXG4gICAgICAgICAgdG9EYXRlOiB0b0RhdGVWYWx1ZSB8fCBcIlwiLFxuICAgICAgICAgIHBhZ2U6IGN1cnJlbnRQYWdlLFxuICAgICAgICAgIGNsaWVudEFjY291bnQ6IHNlbGVjdGVkQ2xpZW50Py52YWx1ZSB8fCBcIlwiLFxuICAgICAgICAgIGNsaWVudFRleHQ6IHNlbGVjdGVkQ2xpZW50Py50ZXh0IHx8IFwiXCIsXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCB0YXJnZXQgPSBlbmNvZGVVUklDb21wb25lbnQobGlua0lkKTtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBgL1Zpc2l0YXMvRGV0YWxsZS8ke3RhcmdldH1gO1xuICAgICAgfSwgTkFWX0RFTEFZX01TKTtcbiAgICB9LFxuICAgIFtjYW5WaWV3SGlzdG9yeSwgY3VycmVudFBhZ2UsIGZyb21EYXRlVmFsdWUsIHNhdmVDYWNoZWRGaWx0ZXIsIHRvRGF0ZVZhbHVlLCBzZWxlY3RlZENsaWVudF1cbiAgKTtcblxyXG4gIGNvbnN0IGNhbGVuZGFyID0gdXNlTWVtbygoKSA9PiB7XHJcbiAgICBjb25zdCBmaXJzdERheSA9IG5ldyBEYXRlKGN1cnJlbnRZZWFyLCBjdXJyZW50TW9udGgsIDEpO1xyXG4gICAgY29uc3QgZGF5c0luTW9udGggPSBuZXcgRGF0ZShjdXJyZW50WWVhciwgY3VycmVudE1vbnRoICsgMSwgMCkuZ2V0RGF0ZSgpO1xyXG4gICAgY29uc3Qgb2Zmc2V0ID0gKGZpcnN0RGF5LmdldERheSgpICsgNikgJSA3O1xyXG4gICAgY29uc3QgY2VsbHM6IENhbGVuZGFyQ2VsbFtdID0gW107XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9mZnNldDsgaSsrKSB7XHJcbiAgICAgIGNlbGxzLnB1c2goeyBkYXRlOiBudWxsLCBpc286IFwiXCIsIGlzRW1wdHk6IHRydWUgfSk7XHJcbiAgICB9XHJcbiAgICBmb3IgKGxldCBkID0gMTsgZCA8PSBkYXlzSW5Nb250aDsgZCsrKSB7XHJcbiAgICAgIGNvbnN0IGRhdGVPYmogPSBuZXcgRGF0ZShjdXJyZW50WWVhciwgY3VycmVudE1vbnRoLCBkKTtcclxuICAgICAgY2VsbHMucHVzaCh7IGRhdGU6IGRhdGVPYmosIGlzbzogdG9JU08oZGF0ZU9iaiksIGlzRW1wdHk6IGZhbHNlIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgY2VsbHMsXHJcbiAgICAgIGxhYmVsOiBmb3JtYXRNb250aExhYmVsKGZpcnN0RGF5LCBsb2NhbGUpLFxyXG4gICAgfTtcclxuICB9LCBbY3VycmVudE1vbnRoLCBjdXJyZW50WWVhciwgbG9jYWxlXSk7XHJcblxyXG4gIGNvbnN0IHByZXZpZXdFbmQgPSBlbmREYXRlIHx8IChzZWxlY3RpbmdTdGVwID09PSBcImVuZFwiID8gaG92ZXJEYXRlIDogbnVsbCk7XG5cbiAgY29uc3QgaGFuZGxlUHJldk1vbnRoID0gdXNlQ2FsbGJhY2soXG4gICAgKGV2ZW50OiBSZWFjdC5Nb3VzZUV2ZW50PEhUTUxCdXR0b25FbGVtZW50PikgPT4ge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBzZXRDdXJyZW50TW9udGgoKHByZXYpID0+IHtcbiAgICAgICAgY29uc3QgbmV4dCA9IHByZXYgLSAxO1xuICAgICAgICBpZiAobmV4dCA8IDApIHtcbiAgICAgICAgICBzZXRDdXJyZW50WWVhcigoeWVhcikgPT4geWVhciAtIDEpO1xuICAgICAgICAgIHJldHVybiAxMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgW3NldEN1cnJlbnRNb250aCwgc2V0Q3VycmVudFllYXJdXG4gICk7XG5cbiAgY29uc3QgaGFuZGxlTmV4dE1vbnRoID0gdXNlQ2FsbGJhY2soXG4gICAgKGV2ZW50OiBSZWFjdC5Nb3VzZUV2ZW50PEhUTUxCdXR0b25FbGVtZW50PikgPT4ge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBzZXRDdXJyZW50TW9udGgoKHByZXYpID0+IHtcbiAgICAgICAgY29uc3QgbmV4dCA9IHByZXYgKyAxO1xuICAgICAgICBpZiAobmV4dCA+IDExKSB7XG4gICAgICAgICAgc2V0Q3VycmVudFllYXIoKHllYXIpID0+IHllYXIgKyAxKTtcbiAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgW3NldEN1cnJlbnRNb250aCwgc2V0Q3VycmVudFllYXJdXG4gICk7XG5cbiAgY29uc3QgaGFuZGxlR3JpZE1vdXNlTGVhdmUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgc2V0SG92ZXJEYXRlKG51bGwpO1xuICB9LCBbc2V0SG92ZXJEYXRlXSk7XG5cbiAgY29uc3QgaGFuZGxlTWFudWFsRGF5Q2xpY2sgPSB1c2VDYWxsYmFjayhcbiAgICAoY2VsbDogSGlzdG9yeU1hbnVhbERheUNlbGwpID0+IHtcbiAgICAgIGlmICghY2VsbC5kYXRlKSByZXR1cm47XG4gICAgICBsb2dIaXN0b3J5KFwiZGF5Q2xpY2tcIiwgeyBkYXRlOiBjZWxsLmlzbyB8fCBcIlwiLCBkaXNhYmxlZDogISFjZWxsLmRpc2FibGVkIH0pO1xuICAgICAgaGFuZGxlU2VsZWN0KGNlbGwuZGF0ZSk7XG4gICAgfSxcbiAgICBbaGFuZGxlU2VsZWN0XVxuICApO1xuXG4gIGNvbnN0IGhhbmRsZU1hbnVhbERheUhvdmVyID0gdXNlQ2FsbGJhY2soXG4gICAgKGNlbGw6IEhpc3RvcnlNYW51YWxEYXlDZWxsKSA9PiB7XG4gICAgICBpZiAoIWNlbGwuZGF0ZSkgcmV0dXJuO1xuICAgICAgaWYgKHNlbGVjdGluZ1N0ZXAgPT09IFwiZW5kXCIgJiYgc3RhcnREYXRlKSB7XG4gICAgICAgIHNldEhvdmVyRGF0ZShuZXcgRGF0ZShjZWxsLmRhdGUpKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIFtzZWxlY3RpbmdTdGVwLCBzZXRIb3ZlckRhdGUsIHN0YXJ0RGF0ZV1cbiAgKTtcblxuICBjb25zdCBtYW51YWxEYXlDZWxscyA9IHVzZU1lbW88SGlzdG9yeU1hbnVhbERheUNlbGxbXT4oKCkgPT4ge1xuICAgIHJldHVybiBjYWxlbmRhci5jZWxscy5tYXAoKGNlbGwsIGlkeCkgPT4ge1xuICAgICAgaWYgKGNlbGwuaXNFbXB0eSkge1xuICAgICAgICByZXR1cm4geyBrZXk6IGBlbXB0eS0ke2lkeH1gLCBpc0VtcHR5OiB0cnVlIH07XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGRhdGVPYmogPSBjZWxsLmRhdGUgYXMgRGF0ZTtcbiAgICAgIGNvbnN0IGlzU3RhcnQgPSBzYW1lRGF5KGRhdGVPYmosIHN0YXJ0RGF0ZSk7XG4gICAgICBjb25zdCBpc0VuZCA9IHNhbWVEYXkoZGF0ZU9iaiwgZW5kRGF0ZSk7XG4gICAgICBjb25zdCBpblJhbmdlID0gc3RhcnREYXRlICYmIHByZXZpZXdFbmQgJiYgaXNCZWZvcmUoc3RhcnREYXRlLCBkYXRlT2JqKSAmJiBpc0JlZm9yZShkYXRlT2JqLCBwcmV2aWV3RW5kKTtcbiAgICAgIGNvbnN0IGhvdmVyUmFuZ2UgPSBzdGFydERhdGUgJiYgIWVuZERhdGUgJiYgaG92ZXJEYXRlICYmIGlzQmVmb3JlKHN0YXJ0RGF0ZSwgZGF0ZU9iaikgJiYgaXNCZWZvcmUoZGF0ZU9iaiwgaG92ZXJEYXRlKTtcbiAgICAgIGNvbnN0IGRpc2FibGVkID0gc2VsZWN0aW5nU3RlcCA9PT0gXCJlbmRcIiAmJiAhIXN0YXJ0RGF0ZSAmJiBpc0JlZm9yZShkYXRlT2JqLCBzdGFydERhdGUpO1xuICAgICAgY29uc3QgaXNUb2RheSA9IHNhbWVEYXkoZGF0ZU9iaiwgbmV3IERhdGUoKSk7XG5cbiAgICAgIGNvbnN0IGRheUNsYXNzID0gY2xhc3NOYW1lcyhcbiAgICAgICAgXCJkcnAtZGF5XCIsXG4gICAgICAgIGlzU3RhcnQgPyBcInN0YXJ0IHJhbmdlLXN0YXJ0XCIgOiBcIlwiLFxuICAgICAgICBpc0VuZCA/IFwiZW5kIHJhbmdlLWVuZFwiIDogXCJcIixcbiAgICAgICAgaW5SYW5nZSA/IFwiaW4tcmFuZ2VcIiA6IFwiXCIsXG4gICAgICAgIGhvdmVyUmFuZ2UgPyBcImhvdmVyLXJhbmdlXCIgOiBcIlwiLFxuICAgICAgICBkaXNhYmxlZCA/IFwiZGlzYWJsZWRcIiA6IFwiXCIsXG4gICAgICAgIGlzVG9kYXkgPyBcInRvZGF5XCIgOiBcIlwiXG4gICAgICApO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBrZXk6IGNlbGwuaXNvLFxuICAgICAgICBpc0VtcHR5OiBmYWxzZSxcbiAgICAgICAgZGF0ZTogZGF0ZU9iaixcbiAgICAgICAgaXNvOiBjZWxsLmlzbyxcbiAgICAgICAgZGF5TGFiZWw6IGRhdGVPYmouZ2V0RGF0ZSgpLFxuICAgICAgICBkYXlDbGFzcyxcbiAgICAgICAgZGlzYWJsZWQsXG4gICAgICB9O1xuICAgIH0pO1xuICB9LCBbY2FsZW5kYXIuY2VsbHMsIGVuZERhdGUsIGhvdmVyRGF0ZSwgcHJldmlld0VuZCwgc2VsZWN0aW5nU3RlcCwgc3RhcnREYXRlXSk7XG5cclxuICBjb25zdCB7IHRpbWVsaW5lSXRlbXMgfSA9IHVzZUhpc3RvcnlUaW1lbGluZUl0ZW1zKHtcbiAgICBpdGVtcyxcbiAgICBsb2NhbGUsXG4gICAgbm9EYXRhVGV4dCxcbiAgICBsb2dIaXN0b3J5LFxuICAgIHRvVGl0bGVDYXNlLFxuICAgIGZvcm1hdERhdGVQYXJ0cyxcbiAgfSk7XG5cclxuICBjb25zdCBsYWJlbEZyb20gPSB0b1NlbnRlbmNlQ2FzZShpbmRUKFwiSGlzdG9yeV9Gcm9tXCIsIFwiRnJvbVwiKSwgbG9jYWxlKTtcbiAgY29uc3QgbGFiZWxUbyA9IHRvU2VudGVuY2VDYXNlKGluZFQoXCJIaXN0b3J5X1RvXCIsIFwiVG9cIiksIGxvY2FsZSk7XG4gIGNvbnN0IHN1bW1hcnlGcm9tID0gbGFiZWxGcm9tO1xuICBjb25zdCBzdW1tYXJ5VG8gPSBsYWJlbFRvO1xuICBjb25zdCBmaWx0ZXJUaXRsZSA9IGluZFQoXCJIaXN0b3J5X0ZpbHRlcl9EYXRlXCIsIFwiRGF0ZVwiKTtcbiAgY29uc3QgYWRkRGF0ZUxhYmVsID0gaW5kVChcIkhpc3RvcnlfQWRkRGF0ZVwiLCBcIkFkZCBkYXRlXCIpO1xuICBjb25zdCBjbGVhclJhbmdlTGFiZWwgPSBpbmRUKFwiSGlzdG9yeV9DbGVhclJhbmdlXCIsIFwiQ2xlYXIgcmFuZ2VcIik7XG4gIGNvbnN0IHByZXZNb250aExhYmVsID0gaW5kVChcIkhpc3RvcnlfUHJldk1vbnRoXCIsIFwiUHJldmlvdXMgbW9udGhcIik7XG4gIGNvbnN0IG5leHRNb250aExhYmVsID0gaW5kVChcIkhpc3RvcnlfTmV4dE1vbnRoXCIsIFwiTmV4dCBtb250aFwiKTtcbiAgY29uc3Qgc3RhdHVzU2VsZWN0U3RhcnRMYWJlbCA9IGluZFQoXCJIaXN0b3J5X1N0YXR1c19TZWxlY3RTdGFydFwiLCBcIlNlbGVjdCBzdGFydCBkYXRlXCIpO1xuICBjb25zdCBzdGF0dXNTZWxlY3RFbmRMYWJlbCA9IGluZFQoXCJIaXN0b3J5X1N0YXR1c19TZWxlY3RFbmRcIiwgXCJTZWxlY3QgZW5kIGRhdGVcIik7XG4gIGNvbnN0IHdlZWtEYXlMYWJlbHMgPSB1c2VNZW1vKFxuICAgICgpID0+IFtcbiAgICAgIGluZFQoXCJIaXN0b3J5X0RheV9Nb25cIiwgXCJNb25cIiksXG4gICAgICBpbmRUKFwiSGlzdG9yeV9EYXlfVHVlXCIsIFwiVHVlXCIpLFxuICAgICAgaW5kVChcIkhpc3RvcnlfRGF5X1dlZFwiLCBcIldlZFwiKSxcbiAgICAgIGluZFQoXCJIaXN0b3J5X0RheV9UaHVcIiwgXCJUaHVcIiksXG4gICAgICBpbmRUKFwiSGlzdG9yeV9EYXlfRnJpXCIsIFwiRnJpXCIpLFxuICAgICAgaW5kVChcIkhpc3RvcnlfRGF5X1NhdFwiLCBcIlNhdFwiKSxcbiAgICAgIGluZFQoXCJIaXN0b3J5X0RheV9TdW5cIiwgXCJTdW5cIiksXG4gICAgXSxcbiAgICBbXVxuICApO1xuICBjb25zdCBjbGVhckxhYmVsID0gaW5kVChcIkhpc3RvcnlfRmlsdGVyX0NsZWFyXCIsIFwiQ2xlYXJcIik7XG4gIGNvbnN0IGFwcGx5TGFiZWwgPSBpbmRUKFwiSGlzdG9yeV9GaWx0ZXJfQXBwbHlcIiwgXCJBcHBseVwiKTtcbiAgY29uc3QgY2xpZW50TGFiZWwgPSBpbmRUKFwiSGlzdG9yeV9GaWx0ZXJfQ2xpZW50XCIsIFwiQ2xpZW50XCIpO1xyXG4gIGNvbnN0IHF1aWNrQ3VzdG9tTGFiZWwgPSBpbmRUKFwiSGlzdG9yeV9RdWlja19DdXN0b21cIiwgXCJEYXRlXCIpO1xuICBjb25zdCBxdWljazdEYXlzTGFiZWwgPSBpbmRUKFwiSGlzdG9yeV9RdWlja183RGF5c1wiLCBcIjcgZGF5c1wiKTtcbiAgY29uc3QgcXVpY2szMERheXNMYWJlbCA9IGluZFQoXCJIaXN0b3J5X1F1aWNrXzMwRGF5c1wiLCBcIjMwIGRheXNcIik7XG4gIGNvbnN0IHF1aWNrOTBEYXlzTGFiZWwgPSBpbmRUKFwiSGlzdG9yeV9RdWlja185MERheXNcIiwgXCI5MCBkYXlzXCIpO1xuICBjb25zdCBwYWdlRmlyc3RMYWJlbCA9IGluZFQoXCJIaXN0b3J5X1BhZ2VfRmlyc3RcIiwgXCJGaXJzdFwiKTtcbiAgY29uc3QgcGFnZVByZXZMYWJlbCA9IGluZFQoXCJIaXN0b3J5X1BhZ2VfUHJldlwiLCBcIlByZXZpb3VzXCIpO1xuICBjb25zdCBwYWdlTmV4dExhYmVsID0gaW5kVChcIkhpc3RvcnlfUGFnZV9OZXh0XCIsIFwiTmV4dFwiKTtcbiAgY29uc3QgcGFnZUxhc3RMYWJlbCA9IGluZFQoXCJIaXN0b3J5X1BhZ2VfTGFzdFwiLCBcIkxhc3RcIik7XG4gIGNvbnN0IHF1aWNrRmlsdGVycyA9IHVzZU1lbW8oXG4gICAgKCkgPT4gW1xuICAgICAgeyBpZDogXCJjdXN0b21cIiBhcyBjb25zdCwgbGFiZWw6IHF1aWNrQ3VzdG9tTGFiZWwgfSxcbiAgICAgIHsgaWQ6IFwiZGF5cy03XCIgYXMgY29uc3QsIGxhYmVsOiBxdWljazdEYXlzTGFiZWwgfSxcbiAgICAgIHsgaWQ6IFwiZGF5cy0zMFwiIGFzIGNvbnN0LCBsYWJlbDogcXVpY2szMERheXNMYWJlbCB9LFxuICAgICAgeyBpZDogXCJkYXlzLTkwXCIgYXMgY29uc3QsIGxhYmVsOiBxdWljazkwRGF5c0xhYmVsIH0sXG4gICAgXSxcbiAgICBbcXVpY2szMERheXNMYWJlbCwgcXVpY2s3RGF5c0xhYmVsLCBxdWljazkwRGF5c0xhYmVsLCBxdWlja0N1c3RvbUxhYmVsXVxuICApO1xuICBjb25zdCBwYWdpbmF0aW9uTGFiZWxzID0gdXNlTWVtbyhcbiAgICAoKSA9PiAoe1xuICAgICAgZmlyc3Q6IHBhZ2VGaXJzdExhYmVsLFxuICAgICAgcHJldjogcGFnZVByZXZMYWJlbCxcbiAgICAgIG5leHQ6IHBhZ2VOZXh0TGFiZWwsXG4gICAgICBsYXN0OiBwYWdlTGFzdExhYmVsLFxuICAgIH0pLFxuICAgIFtwYWdlRmlyc3RMYWJlbCwgcGFnZUxhc3RMYWJlbCwgcGFnZU5leHRMYWJlbCwgcGFnZVByZXZMYWJlbF1cbiAgKTtcbiAgY29uc3Qgc2hvd0ZpbHRlckFjdGlvbnMgPSBzaG93RmlsdGVycztcbiAgY29uc3Qgc2hvd1N1bW1hcnkgPSAhc2hvd0ZpbHRlcnMgJiYgISFzdGFydERhdGUgJiYgISFlbmREYXRlO1xuICBjb25zdCBzaG93UmVzdWx0cyA9ICFzaG93RmlsdGVycztcbiAgY29uc3Qgc2hvd01hbnVhbFBpY2tlciA9IGFjdGl2ZVF1aWNrRmlsdGVyID09PSBcImN1c3RvbVwiICYmIHNob3dNYW51YWxQaWNrZXJQYW5lbDtcbiAgY29uc3Qgc2hvd0lubGluZVN1bW1hcnkgPSAhIXN0YXJ0RGF0ZSAmJiAhIWVuZERhdGUgJiYgIXNob3dNYW51YWxQaWNrZXI7XG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJtYXgtdy0zeGwgbXgtYXV0byBweC0xIHNtOnB4LTIgcHQtMyBwYi00IHNwYWNlLXktMlwiPlxyXG4gICAgICB7c2hvd1N1bW1hcnkgJiYgKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpbHRlci1jYXJkIGZpbHRlci1jYXJkLS1zdW1tYXJ5IHAtMyBzbTpwLTQgbXQtMSBtYi0zXCI+XG4gICAgICAgICAgPEhpc3RvcnlTdW1tYXJ5XG4gICAgICAgICAgICBzdW1tYXJ5RnJvbUxhYmVsPXtzdW1tYXJ5RnJvbX1cbiAgICAgICAgICAgIHN1bW1hcnlUb0xhYmVsPXtzdW1tYXJ5VG99XG4gICAgICAgICAgICBmcm9tVmFsdWU9e3N0YXJ0RGF0ZSA/IGZvcm1hdERpc3BsYXkoc3RhcnREYXRlLCBsb2NhbGUpIDogXCItLVwifVxuICAgICAgICAgICAgdG9WYWx1ZT17ZW5kRGF0ZSA/IGZvcm1hdERpc3BsYXkoZW5kRGF0ZSwgbG9jYWxlKSA6IFwiLS1cIn1cbiAgICAgICAgICAgIGNsaWVudExhYmVsPXtjbGllbnRMYWJlbH1cbiAgICAgICAgICAgIGNsaWVudFZhbHVlPXtzZWxlY3RlZENsaWVudD8udGV4dCB8fCBcIlwifVxuICAgICAgICAgICAgc2hvd0NsaWVudD17ISFzZWxlY3RlZENsaWVudH1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG4gICAgICB7c2hvd0ZpbHRlcnMgJiYgKFxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpbHRlci1jYXJkIGZpbHRlci1jYXJkLS1leHBhbmRlZCBwLTIgc206cC0yLjUgcmVsYXRpdmVcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMS41IGhpc3RvcnktZmlsdGVyLXN0YWNrIGZsZXggZmxleC1jb2xcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBnYXAtMiBoaXN0b3J5LXF1aWNrLWZpbHRlcnNcIiBhcmlhLWxhYmVsPXtmaWx0ZXJUaXRsZX0+XG4gICAgICAgICAgICB7cXVpY2tGaWx0ZXJzLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBpc0FjdGl2ZSA9IGFjdGl2ZVF1aWNrRmlsdGVyID09PSBpdGVtLmlkO1xuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxGaWx0ZXJCdXR0b25cbiAgICAgICAgICAgICAgICAgIGtleT17aXRlbS5pZH1cbiAgICAgICAgICAgICAgICAgIGxhYmVsPXtpdGVtLmxhYmVsfVxuICAgICAgICAgICAgICAgICAgYWN0aXZlPXtpc0FjdGl2ZX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbFwiXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVRdWlja0ZpbHRlcihpdGVtLmlkKX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSl9XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7c2hvd0lubGluZVN1bW1hcnkgJiYgKFxuICAgICAgICAgICAgPEhpc3RvcnlTdW1tYXJ5XG4gICAgICAgICAgICAgIHN1bW1hcnlGcm9tTGFiZWw9e3N1bW1hcnlGcm9tfVxuICAgICAgICAgICAgICBzdW1tYXJ5VG9MYWJlbD17c3VtbWFyeVRvfVxuICAgICAgICAgICAgICBmcm9tVmFsdWU9e3N0YXJ0RGF0ZSA/IGZvcm1hdERpc3BsYXkoc3RhcnREYXRlLCBsb2NhbGUpIDogXCItLVwifVxuICAgICAgICAgICAgICB0b1ZhbHVlPXtlbmREYXRlID8gZm9ybWF0RGlzcGxheShlbmREYXRlLCBsb2NhbGUpIDogXCItLVwifVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJnYXAteS0xIHRleHQtWzExcHhdIHB4LTFcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApfVxuXG4gICAgICAgICAge3Nob3dNYW51YWxQaWNrZXIgJiYgKFxuICAgICAgICAgICAgPEhpc3RvcnlNYW51YWxEYXRlUGlja2VyXG4gICAgICAgICAgICAgIGFjdGl2YXRvclJlZj17YWN0aXZhdG9yUmVmfVxuICAgICAgICAgICAgICBwb3BvdmVyUmVmPXtwb3BvdmVyUmVmfVxuICAgICAgICAgICAgICBzaG93TWFudWFsRXJyb3I9e3Nob3dNYW51YWxFcnJvcn1cbiAgICAgICAgICAgICAgc2hvd1N0YXJ0RXJyb3I9e3Nob3dNYW51YWxFcnJvciAmJiAhc3RhcnREYXRlfVxuICAgICAgICAgICAgICBzaG93RW5kRXJyb3I9e3Nob3dNYW51YWxFcnJvciAmJiAhZW5kRGF0ZX1cbiAgICAgICAgICAgICAgZmlsdGVyVGl0bGU9e2ZpbHRlclRpdGxlfVxuICAgICAgICAgICAgICBpc09wZW49e2lzT3Blbn1cbiAgICAgICAgICAgICAgc2VsZWN0aW5nU3RlcD17c2VsZWN0aW5nU3RlcH1cbiAgICAgICAgICAgICAgbGFiZWxGcm9tPXtsYWJlbEZyb219XG4gICAgICAgICAgICAgIGxhYmVsVG89e2xhYmVsVG99XG4gICAgICAgICAgICAgIHN0YXJ0RGF0ZVRleHQ9e3N0YXJ0RGF0ZSA/IGZvcm1hdERpc3BsYXkoc3RhcnREYXRlLCBsb2NhbGUpIDogYWRkRGF0ZUxhYmVsfVxuICAgICAgICAgICAgICBlbmREYXRlVGV4dD17ZW5kRGF0ZSA/IGZvcm1hdERpc3BsYXkoZW5kRGF0ZSwgbG9jYWxlKSA6IGFkZERhdGVMYWJlbH1cbiAgICAgICAgICAgICAgY2xlYXJSYW5nZUxhYmVsPXtjbGVhclJhbmdlTGFiZWx9XG4gICAgICAgICAgICAgIGhhc1NlbGVjdGVkUmFuZ2U9eyEhc3RhcnREYXRlIHx8ICEhZW5kRGF0ZX1cbiAgICAgICAgICAgICAgbW9udGhMYWJlbD17Y2FsZW5kYXIubGFiZWx9XG4gICAgICAgICAgICAgIHdlZWtEYXlMYWJlbHM9e3dlZWtEYXlMYWJlbHN9XG4gICAgICAgICAgICAgIHN0YXR1c1RleHQ9e3NlbGVjdGluZ1N0ZXAgPT09IFwic3RhcnRcIiA/IHN0YXR1c1NlbGVjdFN0YXJ0TGFiZWwgOiBzdGF0dXNTZWxlY3RFbmRMYWJlbH1cbiAgICAgICAgICAgICAgZGF5Q2VsbHM9e21hbnVhbERheUNlbGxzfVxuICAgICAgICAgICAgICBwcmV2TW9udGhMYWJlbD17cHJldk1vbnRoTGFiZWx9XG4gICAgICAgICAgICAgIG5leHRNb250aExhYmVsPXtuZXh0TW9udGhMYWJlbH1cbiAgICAgICAgICAgICAgb25PcGVuUG9wb3Zlcj17b3BlblBvcG92ZXJ9XG4gICAgICAgICAgICAgIG9uQWN0aXZhdG9yS2V5RG93bj17aGFuZGxlQWN0aXZhdG9yS2V5RG93bn1cbiAgICAgICAgICAgICAgb25TZWN0aW9uS2V5RG93bj17aGFuZGxlU2VjdGlvbktleURvd259XG4gICAgICAgICAgICAgIG9uQ2xlYXI9e2hhbmRsZUNsZWFyfVxuICAgICAgICAgICAgICBvblByZXZNb250aD17aGFuZGxlUHJldk1vbnRofVxuICAgICAgICAgICAgICBvbk5leHRNb250aD17aGFuZGxlTmV4dE1vbnRofVxuICAgICAgICAgICAgICBvbkdyaWRNb3VzZUxlYXZlPXtoYW5kbGVHcmlkTW91c2VMZWF2ZX1cbiAgICAgICAgICAgICAgb25EYXlDbGljaz17aGFuZGxlTWFudWFsRGF5Q2xpY2t9XG4gICAgICAgICAgICAgIG9uRGF5SG92ZXI9e2hhbmRsZU1hbnVhbERheUhvdmVyfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApfVxuXHJcbiAgICAgICAgICA8Q2xpZW50U2VhcmNoQ29tYm9ib3hcclxuICAgICAgICAgICAga2V5PXtjbGllbnRSZXNldEtleX1cclxuICAgICAgICAgICAgdmFsdWU9e3NlbGVjdGVkQ2xpZW50fVxyXG4gICAgICAgICAgICBvblNlbGVjdGVkPXtoYW5kbGVDbGllbnRTZWxlY3RlZH1cclxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJIaXN0b3J5X0ZpbHRlcl9DbGllbnRcIiwgXCJDbGllbnRcIil9XHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiSGlzdG9yeV9GaWx0ZXJfQ2xpZW50XCIsIFwiQ2xpZW50XCIpfVxyXG4gICAgICAgICAgICB2YXJpYW50PVwiY29tcGFjdFwiXHJcbiAgICAgICAgICAgIHNob3dMYWJlbD17ZmFsc2V9XHJcbiAgICAgICAgICAgIGlkQmFzZT1cImhpc3RvcnktY2xpZW50XCJcclxuICAgICAgICAgICAgcG9ydGFsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcclxuICAgICAgICAgIC8+XHJcblxyXG4gICAgICAgICAge3Nob3dGaWx0ZXJBY3Rpb25zICYmIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC0xIGdyaWQgZ3JpZC1jb2xzLTIgZ2FwLTIgaGlzdG9yeS1maWx0ZXItYWN0aW9uc1wiPlxuICAgICAgICAgICAgICA8QWN0aW9uQnV0dG9uXG4gICAgICAgICAgICAgICAgbGFiZWw9e2NsZWFyTGFiZWx9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsXCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVSZXNldEZpbHRlcnN9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDxBY3Rpb25CdXR0b25cbiAgICAgICAgICAgICAgICBsYWJlbD17YXBwbHlMYWJlbH1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGxcIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgIGFwcGx5RmlsdGVycyh7IGNsb3NlUGFuZWw6IHRydWUsIHBhZ2U6IDEgfSk7XG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgKX1cclxuXHJcbiAgICAgIDxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgaWQ9XCJmcm9tRGF0ZVwiIHZhbHVlPXtmcm9tRGF0ZVZhbHVlfSByZWFkT25seSAvPlxyXG4gICAgICA8aW5wdXQgdHlwZT1cImhpZGRlblwiIGlkPVwidG9EYXRlXCIgdmFsdWU9e3RvRGF0ZVZhbHVlfSByZWFkT25seSAvPlxyXG5cclxuICAgICAgPGRpdlxyXG4gICAgICAgIGlkPVwicmVzdWx0c0xvYWRlclwiXHJcbiAgICAgICAgY2xhc3NOYW1lPVwibG9hZGVyLWJveCBnbGFzcy1wYW5lbCBzaGFkb3ctY2FyZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0ZXh0LXNtIHRleHQtc2xhdGUtNzAwXCJcclxuICAgICAgICBzdHlsZT17eyBkaXNwbGF5OiBpc0xvYWRpbmcgPyBcImZsZXhcIiA6IFwibm9uZVwiIH19XHJcbiAgICAgID5cclxuICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cImluZC1zcGlubmVyIGgtNSB3LTVcIiB2aWV3Qm94PVwiMCAwIDIwIDIwXCIgcm9sZT1cInN0YXR1c1wiIGFyaWEtbGFiZWw9e2luZFQoXCJIaXN0b3J5X0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfT5cclxuICAgICAgICAgIDxjaXJjbGUgY2xhc3NOYW1lPVwiaW5kLXNwaW5uZXJfX2NpcmNsZVwiIGN4PVwiMTBcIiBjeT1cIjEwXCIgcj1cIjhcIiBzdHJva2VXaWR0aD1cIjJcIiAvPlxyXG4gICAgICAgIDwvc3ZnPlxyXG4gICAgICAgIHtpbmRUKFwiSGlzdG9yeV9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX1cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICB7c2hvd1Jlc3VsdHMgJiYgKFxyXG4gICAgICAgIDw+XHJcbiAgICAgICAgICA8SGlzdG9yeVRhYmxlXHJcbiAgICAgICAgICAgIGl0ZW1zPXt0aW1lbGluZUl0ZW1zfVxyXG4gICAgICAgICAgICBub0RhdGFUZXh0PXtpbmRUKFwiSGlzdG9yeV9Ob0RhdGFJblJhbmdlXCIsIFwiTm8gdmlzaXRzIGluIHRoaXMgcmFuZ2VcIil9XHJcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZT17ZXJyb3JNZXNzYWdlfVxyXG4gICAgICAgICAgICBvbk5hdmlnYXRlPXtoYW5kbGVOYXZpZ2F0ZX1cclxuICAgICAgICAgIC8+XHJcblxyXG4gICAgICAgICAgPENvbXBhY3RQYWdpbmF0aW9uXG4gICAgICAgICAgICByZWY9e3BhZ2luYXRpb25SZWZ9XG4gICAgICAgICAgICB0b3RhbFBhZ2VzPXt0b3RhbFBhZ2VzfVxuICAgICAgICAgICAgY3VycmVudFBhZ2U9e2N1cnJlbnRQYWdlfVxuICAgICAgICAgICAgcGFnZVdpbmRvdz17UEFHRV9XSU5ET1d9XG4gICAgICAgICAgICBvblBhZ2VDaGFuZ2U9eyhwYWdlKSA9PiBsb2FkQWN0aXZpdGllcyhwYWdlKX1cbiAgICAgICAgICAgIGxhYmVscz17cGFnaW5hdGlvbkxhYmVsc31cbiAgICAgICAgICAvPlxuICAgICAgICA8Lz5cbiAgICAgICl9XG4gICAgICB7Y2FuQ3JlYXRlVmlzaXQgJiYgKFxyXG4gICAgICAgIDxGbG9hdGluZ0FjdGlvbkJ1dHRvblxuICAgICAgICAgIHJvdXRlPVwiL1Zpc2l0YXMvQ3JlYXRlP2ZyZXNoPTFcIlxuICAgICAgICAgIGFyaWFMYWJlbD17aW5kVChcIkNvbW1vbl9DcmVhdGVcIiwgXCJDcmVhdGVcIil9XG4gICAgICAgICAgc2l6ZT17NzZ9XG4gICAgICAgICAgcmlnaHQ9ezE2fVxuICAgICAgICAgIGJvdHRvbT17ZmFiQm90dG9tfVxuICAgICAgICAvPlxuICAgICAgKX1cbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuLy8gTW91bnQgaGVscGVyIGZvciB0aGUgbGVnYWN5IFJhem9yIHZpZXcuXG5leHBvcnQgY29uc3QgbW91bnRIaXN0b3J5UGFnZSA9IChyb290OiBIVE1MRWxlbWVudCkgPT4ge1xuICBjb25zdCBkZWZhdWx0RnJvbURhdGUgPSByb290LmdldEF0dHJpYnV0ZShcImRhdGEtZGVmYXVsdC1mcm9tXCIpIHx8IFwiXCI7XG4gIGNvbnN0IGRlZmF1bHRUb0RhdGUgPSByb290LmdldEF0dHJpYnV0ZShcImRhdGEtZGVmYXVsdC10b1wiKSB8fCBcIlwiO1xuXG4gIG1vdW50UmVhY3RJc2xhbmQocm9vdCwgPEhpc3RvcnlQYWdlIGRlZmF1bHRGcm9tRGF0ZT17ZGVmYXVsdEZyb21EYXRlfSBkZWZhdWx0VG9EYXRlPXtkZWZhdWx0VG9EYXRlfSAvPik7XG59O1xuXHJcbmNvbnN0IG1vdW50ID0gKCkgPT4ge1xuICBjb25zdCByb290RWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpc2l0YXMtaGlzdG9yeS1yb290XCIpO1xuICBpZiAoIXJvb3RFbCkgcmV0dXJuO1xuICBtb3VudEhpc3RvcnlQYWdlKHJvb3RFbCk7XG59O1xuXG5tb3VudFdoZW5Eb2N1bWVudFJlYWR5KG1vdW50KTtcblxuZXhwb3J0IGRlZmF1bHQgSGlzdG9yeVBhZ2U7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrLCB1c2VSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGNsYXNzTmFtZXMgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvY2xhc3NOYW1lcy50c1wiO1xuaW1wb3J0IHsgdXNlVGltZWxpbmVDYXJkRWZmZWN0cyB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VUaW1lbGluZUNhcmRFZmZlY3RzLnRzXCI7XG5cclxuZXhwb3J0IHR5cGUgVGltZWxpbmVEYXRlUGFydHMgPSB7XHJcbiAgeWVhcjogc3RyaW5nO1xyXG4gIG1vbnRoOiBzdHJpbmc7XHJcbiAgZGF5OiBzdHJpbmc7XHJcbn07XHJcblxyXG5leHBvcnQgdHlwZSBUaW1lbGluZUl0ZW0gPSB7XHJcbiAgaWQ6IHN0cmluZztcclxuICBhY3RpdmlkYWRJZD86IHN0cmluZztcclxuICByZWNJZD86IG51bWJlciB8IG51bGw7XHJcbiAgbmFtZTogc3RyaW5nO1xyXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgZnVsbE5hbWU6IHN0cmluZztcclxuICBmdWxsRGVzYzogc3RyaW5nO1xyXG4gIGRhdGVQYXJ0czogVGltZWxpbmVEYXRlUGFydHM7XHJcbiAgaXNOb0RhdGE6IGJvb2xlYW47XHJcbn07XHJcblxyXG50eXBlIFByb3BzID0ge1xyXG4gIGl0ZW1zOiBUaW1lbGluZUl0ZW1bXTtcclxuICBub0RhdGFUZXh0OiBzdHJpbmc7XHJcbiAgZXJyb3JNZXNzYWdlOiBzdHJpbmc7XHJcbiAgb25OYXZpZ2F0ZTogKGxpbmtJZDogc3RyaW5nKSA9PiB2b2lkO1xyXG59O1xyXG5cclxuY29uc3QgVEFQX01PVkVfUFggPSAxNDtcbmNvbnN0IEhPTERfVE9fUFJFVklFV19NUyA9IDE2MDtcblxyXG50eXBlIFRhcEd1YXJkU3RhdGUgPSB7XG4gIGFjdGl2ZTogYm9vbGVhbjtcbiAgcG9pbnRlcklkOiBudW1iZXIgfCBudWxsO1xuICBzdGFydFg6IG51bWJlcjtcbiAgc3RhcnRZOiBudW1iZXI7XG4gIHN0YXJ0VGltZTogbnVtYmVyO1xuICBtb3ZlZDogYm9vbGVhbjtcbiAgbGlua0lkOiBzdHJpbmc7XG59O1xuXHJcbmNvbnN0IEhpc3RvcnlUYWJsZSA9ICh7IGl0ZW1zLCBub0RhdGFUZXh0LCBlcnJvck1lc3NhZ2UsIG9uTmF2aWdhdGUgfTogUHJvcHMpID0+IHtcbiAgY29uc3QgY29udGFpbmVyUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IHRhcEd1YXJkUmVmID0gdXNlUmVmPFRhcEd1YXJkU3RhdGU+KHtcbiAgICBhY3RpdmU6IGZhbHNlLFxuICAgIHBvaW50ZXJJZDogbnVsbCxcbiAgICBzdGFydFg6IDAsXG4gICAgc3RhcnRZOiAwLFxuICAgIHN0YXJ0VGltZTogMCxcbiAgICBtb3ZlZDogZmFsc2UsXG4gICAgbGlua0lkOiBcIlwiLFxuICB9KTtcblxuICBjb25zdCByZXNvbHZlQ2xpY2thYmxlQ2FyZCA9IHVzZUNhbGxiYWNrKCh0YXJnZXQ6IEV2ZW50VGFyZ2V0IHwgbnVsbCkgPT4ge1xuICAgIGNvbnN0IG5vZGUgPSB0YXJnZXQgYXMgSFRNTEVsZW1lbnQgfCBudWxsO1xuICAgIGlmICghbm9kZSB8fCB0eXBlb2Ygbm9kZS5jbG9zZXN0ICE9PSBcImZ1bmN0aW9uXCIpIHJldHVybiBudWxsO1xuICAgIGNvbnN0IGNhcmQgPSBub2RlLmNsb3Nlc3Q8SFRNTEVsZW1lbnQ+KFwiLnRpbWVsaW5lLWNhcmQtLWNsaWNrYWJsZVtkYXRhLWxpbmstaWRdXCIpO1xuICAgIGlmICghY2FyZCkgcmV0dXJuIG51bGw7XG4gICAgaWYgKCFjb250YWluZXJSZWYuY3VycmVudD8uY29udGFpbnMoY2FyZCkpIHJldHVybiBudWxsO1xuICAgIHJldHVybiBjYXJkO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgcmVzZXRUYXBHdWFyZCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICB0YXBHdWFyZFJlZi5jdXJyZW50LmFjdGl2ZSA9IGZhbHNlO1xuICAgIHRhcEd1YXJkUmVmLmN1cnJlbnQucG9pbnRlcklkID0gbnVsbDtcbiAgICB0YXBHdWFyZFJlZi5jdXJyZW50Lm1vdmVkID0gZmFsc2U7XG4gICAgdGFwR3VhcmRSZWYuY3VycmVudC5saW5rSWQgPSBcIlwiO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgaGFuZGxlUG9pbnRlckRvd24gPSB1c2VDYWxsYmFjayhcbiAgICAoZXZlbnQ6IFJlYWN0LlBvaW50ZXJFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHtcbiAgICAgIGlmIChldmVudC5wb2ludGVyVHlwZSA9PT0gXCJtb3VzZVwiICYmIGV2ZW50LmJ1dHRvbiAhPT0gMCkgcmV0dXJuO1xuICAgICAgY29uc3QgY2FyZCA9IHJlc29sdmVDbGlja2FibGVDYXJkKGV2ZW50LnRhcmdldCk7XG4gICAgICBpZiAoIWNhcmQpIHJldHVybjtcbiAgICAgIGNvbnN0IGxpbmtJZCA9IGNhcmQuZGF0YXNldC5saW5rSWQgfHwgXCJcIjtcbiAgICAgIGlmICghbGlua0lkKSByZXR1cm47XG5cbiAgICAgIHRhcEd1YXJkUmVmLmN1cnJlbnQuYWN0aXZlID0gdHJ1ZTtcbiAgICAgIHRhcEd1YXJkUmVmLmN1cnJlbnQucG9pbnRlcklkID0gZXZlbnQucG9pbnRlcklkO1xuICAgICAgdGFwR3VhcmRSZWYuY3VycmVudC5zdGFydFggPSBldmVudC5jbGllbnRYO1xuICAgICAgdGFwR3VhcmRSZWYuY3VycmVudC5zdGFydFkgPSBldmVudC5jbGllbnRZO1xuICAgICAgdGFwR3VhcmRSZWYuY3VycmVudC5zdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgICAgdGFwR3VhcmRSZWYuY3VycmVudC5tb3ZlZCA9IGZhbHNlO1xuICAgICAgdGFwR3VhcmRSZWYuY3VycmVudC5saW5rSWQgPSBsaW5rSWQ7XG4gICAgfSxcbiAgICBbcmVzb2x2ZUNsaWNrYWJsZUNhcmRdXG4gICk7XG5cbiAgY29uc3QgaGFuZGxlUG9pbnRlck1vdmUgPSB1c2VDYWxsYmFjaygoZXZlbnQ6IFJlYWN0LlBvaW50ZXJFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHtcbiAgICBjb25zdCBzdGF0ZSA9IHRhcEd1YXJkUmVmLmN1cnJlbnQ7XG4gICAgaWYgKCFzdGF0ZS5hY3RpdmUgfHwgZXZlbnQucG9pbnRlcklkICE9PSBzdGF0ZS5wb2ludGVySWQpIHJldHVybjtcbiAgICBjb25zdCBkeCA9IE1hdGguYWJzKGV2ZW50LmNsaWVudFggLSBzdGF0ZS5zdGFydFgpO1xuICAgIGNvbnN0IGR5ID0gTWF0aC5hYnMoZXZlbnQuY2xpZW50WSAtIHN0YXRlLnN0YXJ0WSk7XG4gICAgaWYgKGR4ID4gVEFQX01PVkVfUFggfHwgZHkgPiBUQVBfTU9WRV9QWCkge1xuICAgICAgc3RhdGUubW92ZWQgPSB0cnVlO1xuICAgIH1cbiAgfSwgW10pO1xuXG4gIGNvbnN0IGhhbmRsZVBvaW50ZXJVcCA9IHVzZUNhbGxiYWNrKFxuICAgIChldmVudDogUmVhY3QuUG9pbnRlckV2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4ge1xuICAgICAgY29uc3Qgc3RhdGUgPSB0YXBHdWFyZFJlZi5jdXJyZW50O1xuICAgICAgaWYgKCFzdGF0ZS5hY3RpdmUgfHwgZXZlbnQucG9pbnRlcklkICE9PSBzdGF0ZS5wb2ludGVySWQpIHJldHVybjtcbiAgICAgIGNvbnN0IGxpbmtJZCA9IHN0YXRlLmxpbmtJZDtcbiAgICAgIGNvbnN0IGhlbGRNcyA9IERhdGUubm93KCkgLSBzdGF0ZS5zdGFydFRpbWU7XG4gICAgICBjb25zdCBzaG91bGRUYXAgPSAhc3RhdGUubW92ZWQgJiYgaGVsZE1zIDwgSE9MRF9UT19QUkVWSUVXX01TO1xuICAgICAgcmVzZXRUYXBHdWFyZCgpO1xuICAgICAgaWYgKHNob3VsZFRhcCAmJiBsaW5rSWQpIHtcbiAgICAgICAgb25OYXZpZ2F0ZShsaW5rSWQpO1xuICAgICAgfVxuICAgIH0sXG4gICAgW29uTmF2aWdhdGUsIHJlc2V0VGFwR3VhcmRdXG4gICk7XG5cbiAgY29uc3QgYmxvY2tDbGlwYm9hcmRBY3Rpb24gPSB1c2VDYWxsYmFjayhcbiAgICAoZXZlbnQ6IFJlYWN0LkNsaXBib2FyZEV2ZW50PEhUTUxEaXZFbGVtZW50PiB8IFJlYWN0Lk1vdXNlRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB7XG4gICAgICBpZiAoIXJlc29sdmVDbGlja2FibGVDYXJkKGV2ZW50LnRhcmdldCkpIHJldHVybjtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSxcbiAgICBbcmVzb2x2ZUNsaWNrYWJsZUNhcmRdXG4gICk7XG5cbiAgdXNlVGltZWxpbmVDYXJkRWZmZWN0cyh7IGNvbnRhaW5lclJlZiwgZXJyb3JNZXNzYWdlLCBpdGVtcywgcmVzb2x2ZUNsaWNrYWJsZUNhcmQgfSk7XG5cclxuICBjb25zdCBoYXNJdGVtcyA9IGl0ZW1zLmxlbmd0aCA+IDA7XHJcbiAgY29uc3Qgc2hvd0VtcHR5ID0gIWVycm9yTWVzc2FnZSAmJiAhaGFzSXRlbXM7XHJcblxyXG4gIGNvbnN0IGNvbnRlbnQgPSBlcnJvck1lc3NhZ2UgPyAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtZGFuZ2VyXCI+e2Vycm9yTWVzc2FnZX08L2Rpdj5cclxuICApIDogaGFzSXRlbXMgPyAoXHJcbiAgICBpdGVtcy5tYXAoKGl0ZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgIGNvbnN0IGtleSA9IGl0ZW0uaWQgfHwgaXRlbS5yZWNJZD8udG9TdHJpbmcoKSB8fCBgdGltZWxpbmUtJHtpbmRleH1gO1xyXG4gICAgICBjb25zdCBpc0NsaWNrYWJsZSA9ICFpdGVtLmlzTm9EYXRhICYmICEhaXRlbS5pZDtcclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2IGtleT17a2V5fSBjbGFzc05hbWU9XCJ0aW1lbGluZS1pdGVtXCI+XHJcbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICAgIFwidGltZWxpbmUtY2FyZFwiLFxuICAgICAgICAgICAgICBpdGVtLmlzTm9EYXRhID8gXCJ0aW1lbGluZS1jYXJkLS1ub2RhdGFcIiA6IFwiXCIsXG4gICAgICAgICAgICAgIGlzQ2xpY2thYmxlID8gXCJ0aW1lbGluZS1jYXJkLS1jbGlja2FibGVcIiA6IFwiXCJcbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICBkYXRhLWFjdGl2aWRhZGlkPXtpdGVtLmFjdGl2aWRhZElkIHx8IFwiXCJ9XG4gICAgICAgICAgICBkYXRhLXJlY2lkPXtpdGVtLnJlY0lkICE9IG51bGwgPyBTdHJpbmcoaXRlbS5yZWNJZCkgOiBcIlwifVxuICAgICAgICAgICAgZGF0YS1saW5rLWlkPXtpc0NsaWNrYWJsZSA/IGl0ZW0uaWQgOiBcIlwifVxuICAgICAgICAgICAgcm9sZT17aXNDbGlja2FibGUgPyBcImJ1dHRvblwiIDogdW5kZWZpbmVkfVxuICAgICAgICAgICAgdGFiSW5kZXg9e2lzQ2xpY2thYmxlID8gMCA6IHVuZGVmaW5lZH1cbiAgICAgICAgICAgIGFyaWEtbGFiZWw9e2lzQ2xpY2thYmxlID8gKGl0ZW0uZnVsbE5hbWUgfHwgaXRlbS5uYW1lIHx8IG5vRGF0YVRleHQpIDogdW5kZWZpbmVkfVxuICAgICAgICAgICAgb25LZXlEb3duPXtpc0NsaWNrYWJsZVxuICAgICAgICAgICAgICA/IChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChldmVudC5rZXkgPT09IFwiRW50ZXJcIiB8fCBldmVudC5rZXkgPT09IFwiIFwiKSB7XG4gICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgb25OYXZpZ2F0ZShpdGVtLmlkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgOiB1bmRlZmluZWR9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aW1lbGluZS1kYXRlLXBhbmVsIGZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0xIHB4LTMgcHktMyBiZy1zbGF0ZS01MCBib3JkZXItciBib3JkZXItc2xhdGUtMjAwIHRleHQtc2xhdGUtNjAwXCI+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdHJhY2tpbmctWzAuMmVtXSB0ZXh0LXNsYXRlLTUwMFwiPntpdGVtLmRhdGVQYXJ0cy55ZWFyfTwvZGl2PlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LXNlbWlib2xkIHVwcGVyY2FzZSB0cmFja2luZy1bMC4yZW1dIHRleHQtc2xhdGUtNTAwXCI+e2l0ZW0uZGF0ZVBhcnRzLm1vbnRofTwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtMnhsIGZvbnQtc2VtaWJvbGQgdGV4dC1wcmltYXJ5XCI+e2l0ZW0uZGF0ZVBhcnRzLmRheX08L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGltZWxpbmUtY2FyZF9fY29udGVudCBmbGV4LTEgcHktMyBweC00XCI+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aW1lbGluZS1uYW1lXCIgZGF0YS1mdWxsdGV4dD17aXRlbS5mdWxsTmFtZSB8fCBpdGVtLm5hbWV9PntpdGVtLm5hbWV9PC9kaXY+XHJcbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGltZWxpbmUtZGVzYy10ZXh0XCIgZGF0YS1mdWxsdGV4dD17aXRlbS5mdWxsRGVzYyB8fCBpdGVtLmRlc2NyaXB0aW9ufT57aXRlbS5kZXNjcmlwdGlvbiB8fCBub0RhdGFUZXh0fTwvcD5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgKTtcclxuICAgIH0pXHJcbiAgKSA6IG51bGw7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2XG4gICAgICBpZD1cInRpbWVsaW5lQ29udGFpbmVyXCJcbiAgICAgIHJlZj17Y29udGFpbmVyUmVmfVxuICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFwidGltZWxpbmUtYm94XCIsIHNob3dFbXB0eSA/IFwidGltZWxpbmUtZW1wdHlcIiA6IFwiXCIpfVxuICAgICAgZGF0YS1lbXB0eS10ZXh0PXtub0RhdGFUZXh0fVxuICAgICAgb25Qb2ludGVyRG93bkNhcHR1cmU9e2hhbmRsZVBvaW50ZXJEb3dufVxuICAgICAgb25Qb2ludGVyTW92ZUNhcHR1cmU9e2hhbmRsZVBvaW50ZXJNb3ZlfVxuICAgICAgb25Qb2ludGVyVXBDYXB0dXJlPXtoYW5kbGVQb2ludGVyVXB9XG4gICAgICBvblBvaW50ZXJDYW5jZWxDYXB0dXJlPXtyZXNldFRhcEd1YXJkfVxuICAgICAgb25Qb2ludGVyTGVhdmU9e3Jlc2V0VGFwR3VhcmR9XG4gICAgICBvbkNvbnRleHRNZW51Q2FwdHVyZT17YmxvY2tDbGlwYm9hcmRBY3Rpb259XG4gICAgICBvbkNvcHlDYXB0dXJlPXtibG9ja0NsaXBib2FyZEFjdGlvbn1cbiAgICAgIG9uQ3V0Q2FwdHVyZT17YmxvY2tDbGlwYm9hcmRBY3Rpb259XG4gICAgICBvblBhc3RlQ2FwdHVyZT17YmxvY2tDbGlwYm9hcmRBY3Rpb259XG4gICAgPlxuICAgICAge2NvbnRlbnR9XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5jb25zdCBNZW1vaXplZEhpc3RvcnlUYWJsZSA9IFJlYWN0Lm1lbW8oSGlzdG9yeVRhYmxlKTtcbk1lbW9pemVkSGlzdG9yeVRhYmxlLmRpc3BsYXlOYW1lID0gXCJIaXN0b3J5VGFibGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgTWVtb2l6ZWRIaXN0b3J5VGFibGU7XG4iLCAiXHVGRUZGaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHR5cGUgeyBIaXN0b3J5Q2FjaGVkRmlsdGVyIH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZUhpc3RvcnlGaWx0ZXJDYWNoZS50c1wiO1xuaW1wb3J0IHR5cGUgeyBGaWx0ZXJMb2FkUmVxdWVzdCwgTG9hZE92ZXJyaWRlIH0gZnJvbSBcIi4vdXNlSGlzdG9yeUZpbHRlcnNTdGF0ZS50c1wiO1xuXG50eXBlIFVzZUhpc3RvcnlQYWdlTGlzdGVuZXJzQXJncyA9IHtcbiAgaXNPcGVuOiBib29sZWFuO1xuICBhY3RpdmF0b3JSZWY6IFJlYWN0LlJlZk9iamVjdDxIVE1MRGl2RWxlbWVudCB8IG51bGw+O1xuICBwb3BvdmVyUmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTERpdkVsZW1lbnQgfCBudWxsPjtcbiAgcGFnaW5hdGlvblJlZjogUmVhY3QuUmVmT2JqZWN0PEhUTUxEaXZFbGVtZW50IHwgbnVsbD47XG4gIGhhc1Jlc3RvcmVkRmlsdGVyUmVmOiBSZWFjdC5NdXRhYmxlUmVmT2JqZWN0PGJvb2xlYW4+O1xuICByZXRyeU9uTmV0d29ya0Vycm9yUmVmOiBSZWFjdC5NdXRhYmxlUmVmT2JqZWN0PGJvb2xlYW4+O1xuICBjdXJyZW50UGFnZTogbnVtYmVyO1xuICB1cGRhdGVGYWJCb3R0b206ICgpID0+IHZvaWQ7XG4gIGxvZ0hpc3Rvcnk6IChtZXNzYWdlOiBzdHJpbmcsIGRhdGE/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPikgPT4gdm9pZDtcbiAgY29uc3VtZVJldHVybkZsYWc6ICgpID0+IGJvb2xlYW47XG4gIHJlYWRDYWNoZWRGaWx0ZXI6ICgpID0+IEhpc3RvcnlDYWNoZWRGaWx0ZXIgfCBudWxsO1xuICBhcHBseUNhY2hlZEZpbHRlcjogKGZpbHRlcjogSGlzdG9yeUNhY2hlZEZpbHRlciB8IG51bGwpID0+IEZpbHRlckxvYWRSZXF1ZXN0IHwgbnVsbDtcbiAgbG9hZEFjdGl2aXRpZXM6IChwYWdlOiBudW1iZXIsIG92ZXJyaWRlPzogTG9hZE92ZXJyaWRlKSA9PiB2b2lkO1xuICBzZXRJc09wZW46IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPGJvb2xlYW4+PjtcbiAgc2V0SG92ZXJEYXRlOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxEYXRlIHwgbnVsbD4+O1xuICBzZXRTaG93RmlsdGVyczogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248Ym9vbGVhbj4+O1xuICBhcHBseUZpbHRlcnM6IChvcHRpb25zPzogeyBjbG9zZVBhbmVsPzogYm9vbGVhbjsgZm9yY2U/OiBib29sZWFuOyBwYWdlPzogbnVtYmVyIH0pID0+IHZvaWQ7XG59O1xuXG4vLyBIYW5kbGVzIGdsb2JhbCBsaXN0ZW5lcnMgdXNlZCBieSB0aGUgaGlzdG9yeSBwYWdlIGZpbHRlcnMgYW5kIGNhbGVuZGFyIFVJLlxuZXhwb3J0IGNvbnN0IHVzZUhpc3RvcnlQYWdlTGlzdGVuZXJzID0gKHtcbiAgaXNPcGVuLFxuICBhY3RpdmF0b3JSZWYsXG4gIHBvcG92ZXJSZWYsXG4gIHBhZ2luYXRpb25SZWYsXG4gIGhhc1Jlc3RvcmVkRmlsdGVyUmVmLFxuICByZXRyeU9uTmV0d29ya0Vycm9yUmVmLFxuICBjdXJyZW50UGFnZSxcbiAgdXBkYXRlRmFiQm90dG9tLFxuICBsb2dIaXN0b3J5LFxuICBjb25zdW1lUmV0dXJuRmxhZyxcbiAgcmVhZENhY2hlZEZpbHRlcixcbiAgYXBwbHlDYWNoZWRGaWx0ZXIsXG4gIGxvYWRBY3Rpdml0aWVzLFxuICBzZXRJc09wZW4sXG4gIHNldEhvdmVyRGF0ZSxcbiAgc2V0U2hvd0ZpbHRlcnMsXG4gIGFwcGx5RmlsdGVycyxcbn06IFVzZUhpc3RvcnlQYWdlTGlzdGVuZXJzQXJncykgPT4ge1xuICAvLyBDbG9zZSB0aGUgbWFudWFsIHBpY2tlciB3aGVuIGNsaWNraW5nIG91dHNpZGUgb2YgdGhlIHJhbmdlIHBpY2tlciBVSS5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWlzT3BlbikgcmV0dXJuO1xuXG4gICAgY29uc3QgaGFuZGxlT3V0c2lkZSA9IChldmVudDogTW91c2VFdmVudCkgPT4ge1xuICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0IGFzIE5vZGUgfCBudWxsO1xuICAgICAgaWYgKCF0YXJnZXQpIHJldHVybjtcbiAgICAgIGlmIChwb3BvdmVyUmVmLmN1cnJlbnQ/LmNvbnRhaW5zKHRhcmdldCkpIHJldHVybjtcbiAgICAgIGlmIChhY3RpdmF0b3JSZWYuY3VycmVudD8uY29udGFpbnModGFyZ2V0KSkgcmV0dXJuO1xuICAgICAgbG9nSGlzdG9yeShcImNsb3NlUG9wb3ZlcjpvdXRzaWRlXCIpO1xuICAgICAgc2V0SXNPcGVuKGZhbHNlKTtcbiAgICAgIHNldEhvdmVyRGF0ZShudWxsKTtcbiAgICB9O1xuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBoYW5kbGVPdXRzaWRlKTtcbiAgICByZXR1cm4gKCkgPT4gZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBoYW5kbGVPdXRzaWRlKTtcbiAgfSwgW2FjdGl2YXRvclJlZiwgaXNPcGVuLCBsb2dIaXN0b3J5LCBwb3BvdmVyUmVmLCBzZXRIb3ZlckRhdGUsIHNldElzT3Blbl0pO1xuXG4gIC8vIFJlLWFwcGx5IGZpbHRlcnMgYWZ0ZXIgYnJvd3NlciBiYWNrL2ZvcndhcmQgbmF2aWdhdGlvbiByZXR1cm5zIHRvIHRoZSBwYWdlLlxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IG9uUGFnZVNob3cgPSAoKSA9PiB7XG4gICAgICBpZiAoaGFzUmVzdG9yZWRGaWx0ZXJSZWYuY3VycmVudCkgcmV0dXJuO1xuICAgICAgaWYgKGNvbnN1bWVSZXR1cm5GbGFnKCkpIHtcbiAgICAgICAgY29uc3QgY2FjaGVkID0gcmVhZENhY2hlZEZpbHRlcigpO1xuICAgICAgICBjb25zdCBjYWNoZWRSZXF1ZXN0ID0gYXBwbHlDYWNoZWRGaWx0ZXIoY2FjaGVkKTtcbiAgICAgICAgaWYgKGNhY2hlZFJlcXVlc3QpIHtcbiAgICAgICAgICByZXRyeU9uTmV0d29ya0Vycm9yUmVmLmN1cnJlbnQgPSB0cnVlO1xuICAgICAgICAgIGxvYWRBY3Rpdml0aWVzKGNhY2hlZFJlcXVlc3QucGFnZSwgY2FjaGVkUmVxdWVzdC5vdmVycmlkZSk7XG4gICAgICAgICAgc2V0U2hvd0ZpbHRlcnMoZmFsc2UpO1xuICAgICAgICAgIHNldElzT3BlbihmYWxzZSk7XG4gICAgICAgICAgaGFzUmVzdG9yZWRGaWx0ZXJSZWYuY3VycmVudCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwYWdlc2hvd1wiLCBvblBhZ2VTaG93KTtcbiAgICByZXR1cm4gKCkgPT4gd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwYWdlc2hvd1wiLCBvblBhZ2VTaG93KTtcbiAgfSwgW1xuICAgIGFwcGx5Q2FjaGVkRmlsdGVyLFxuICAgIGNvbnN1bWVSZXR1cm5GbGFnLFxuICAgIGhhc1Jlc3RvcmVkRmlsdGVyUmVmLFxuICAgIGxvYWRBY3Rpdml0aWVzLFxuICAgIHJlYWRDYWNoZWRGaWx0ZXIsXG4gICAgcmV0cnlPbk5ldHdvcmtFcnJvclJlZixcbiAgICBzZXRJc09wZW4sXG4gICAgc2V0U2hvd0ZpbHRlcnMsXG4gIF0pO1xuXG4gIC8vIEtlZXAgZmxvYXRpbmcgYWN0aW9uIGJ1dHRvbiBjbGVhciBvZiBwYWdpbmF0aW9uIGFuZCByZWFjdCB0byBsYXlvdXQgY2hhbmdlcy5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICB1cGRhdGVGYWJCb3R0b20oKTtcblxuICAgIGxldCBvYnNlcnZlcjogUmVzaXplT2JzZXJ2ZXIgfCBudWxsID0gbnVsbDtcbiAgICBjb25zdCBwYWdpbmF0aW9uRWwgPSBwYWdpbmF0aW9uUmVmLmN1cnJlbnQ7XG4gICAgaWYgKHBhZ2luYXRpb25FbCAmJiB0eXBlb2YgUmVzaXplT2JzZXJ2ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIG9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyKCgpID0+IHVwZGF0ZUZhYkJvdHRvbSgpKTtcbiAgICAgIG9ic2VydmVyLm9ic2VydmUocGFnaW5hdGlvbkVsKTtcbiAgICB9XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCB1cGRhdGVGYWJCb3R0b20pO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCB1cGRhdGVGYWJCb3R0b20pO1xuICAgICAgaWYgKG9ic2VydmVyKSBvYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgfTtcbiAgfSwgW3BhZ2luYXRpb25SZWYsIHVwZGF0ZUZhYkJvdHRvbV0pO1xuXG4gIC8vIFdpcmUgdG9wYmFyIGFjdGlvbnMgdGhhdCB0b2dnbGUgZmlsdGVycyBvciBmb3JjZSByZWZyZXNoIG9mIGN1cnJlbnQgcGFnZS5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBvblRvZ2dsZUZpbHRlcnMgPSAoKSA9PiB7XG4gICAgICBzZXRTaG93RmlsdGVycygocHJldikgPT4ge1xuICAgICAgICBjb25zdCBuZXh0ID0gIXByZXY7XG4gICAgICAgIGlmICghbmV4dCkge1xuICAgICAgICAgIHNldElzT3BlbihmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgY29uc3Qgb25SZWZyZXNoID0gKCkgPT4ge1xuICAgICAgYXBwbHlGaWx0ZXJzKHsgcGFnZTogY3VycmVudFBhZ2UsIGZvcmNlOiB0cnVlLCBjbG9zZVBhbmVsOiB0cnVlIH0pO1xuICAgIH07XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImhpc3RvcnktdG9nZ2xlLWZpbHRlclwiLCBvblRvZ2dsZUZpbHRlcnMpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiaGlzdG9yeS1yZWZyZXNoXCIsIG9uUmVmcmVzaCk7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJoaXN0b3J5LXRvZ2dsZS1maWx0ZXJcIiwgb25Ub2dnbGVGaWx0ZXJzKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwiaGlzdG9yeS1yZWZyZXNoXCIsIG9uUmVmcmVzaCk7XG4gICAgfTtcbiAgfSwgW2FwcGx5RmlsdGVycywgY3VycmVudFBhZ2UsIHNldElzT3Blbiwgc2V0U2hvd0ZpbHRlcnNdKTtcbn07XHJcbiIsICJcdUZFRkZpbXBvcnQgUmVhY3QsIHsgdXNlTWVtbywgdXNlUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgdHlwZSB7IFRpbWVsaW5lSXRlbSB9IGZyb20gXCIuL0hpc3RvcnlUYWJsZS50c3hcIjtcblxudHlwZSBBY3Rpdml0eVJlY29yZCA9IFJlY29yZDxzdHJpbmcsIHVua25vd24+O1xuXG50eXBlIFVzZUhpc3RvcnlUaW1lbGluZUl0ZW1zQXJncyA9IHtcbiAgaXRlbXM6IEFjdGl2aXR5UmVjb3JkW107XG4gIGxvY2FsZTogc3RyaW5nO1xuICBub0RhdGFUZXh0OiBzdHJpbmc7XG4gIGxvZ0hpc3Rvcnk6IChtZXNzYWdlOiBzdHJpbmcsIGRhdGE/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPikgPT4gdm9pZDtcbiAgdG9UaXRsZUNhc2U6ICh2YWx1ZTogc3RyaW5nLCBsb2NhbGU6IHN0cmluZykgPT4gc3RyaW5nO1xuICBmb3JtYXREYXRlUGFydHM6ICh2YWx1ZTogc3RyaW5nLCBsb2NhbGU6IHN0cmluZykgPT4geyB5ZWFyOiBzdHJpbmc7IG1vbnRoOiBzdHJpbmc7IGRheTogc3RyaW5nIH07XG59O1xuXG4vLyBNYXBzIHJhdyBoaXN0b3J5IHBheWxvYWQgaXRlbXMgaW50byB0aW1lbGluZSBjYXJkcyB1c2VkIGJ5IEhpc3RvcnlUYWJsZS5cbmV4cG9ydCBjb25zdCB1c2VIaXN0b3J5VGltZWxpbmVJdGVtcyA9ICh7XG4gIGl0ZW1zLFxuICBsb2NhbGUsXG4gIG5vRGF0YVRleHQsXG4gIGxvZ0hpc3RvcnksXG4gIHRvVGl0bGVDYXNlLFxuICBmb3JtYXREYXRlUGFydHMsXG59OiBVc2VIaXN0b3J5VGltZWxpbmVJdGVtc0FyZ3MpID0+IHtcbiAgY29uc3QgZGVidWdMb2dnZWRSZWYgPSB1c2VSZWYoMCk7XG5cbiAgY29uc3QgdGltZWxpbmVJdGVtczogVGltZWxpbmVJdGVtW10gPSB1c2VNZW1vKCgpID0+IHtcbiAgICByZXR1cm4gaXRlbXMubWFwKChlbnRyeSkgPT4ge1xuICAgICAgY29uc3QgYWN0aXZpZGFkSWRSYXcgPSAoZW50cnkuYWN0aXZpZGFkSWQgPz8gZW50cnkuQWN0aXZpZGFkSWQgPz8gXCJcIikudG9TdHJpbmcoKS50cmltKCk7XG4gICAgICBjb25zdCBhY3RpdmlkYWRJZCA9IGFjdGl2aWRhZElkUmF3IHx8IFwiXCI7XG4gICAgICBjb25zdCByZWNJZFJhdyA9IGVudHJ5LnJlY0lkID8/IGVudHJ5LlJlY0lkID8/IFwiXCI7XG4gICAgICBjb25zdCByZWNJZCA9IHJlY0lkUmF3ICYmICFOdW1iZXIuaXNOYU4oTnVtYmVyKHJlY0lkUmF3KSkgPyBOdW1iZXIocmVjSWRSYXcpIDogbnVsbDtcbiAgICAgIGxldCBsaW5rSWQgPSBhY3RpdmlkYWRJZCB8fCAocmVjSWQgPyByZWNJZC50b1N0cmluZygpIDogXCJcIik7XG5cbiAgICAgIGlmIChkZWJ1Z0xvZ2dlZFJlZi5jdXJyZW50IDwgNSkge1xuICAgICAgICBsb2dIaXN0b3J5KFwiYWN0aXZpdHkgaXRlbVwiLCB7IGFjdGl2aWRhZElkLCByZWNJZFJhdywgcmVjSWQgfSk7XG4gICAgICAgIGRlYnVnTG9nZ2VkUmVmLmN1cnJlbnQgKz0gMTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcmF3TmFtZSA9IChlbnRyeS5uYW1lID8/IGVudHJ5Lk5hbWUgPz8gXCJcIikudG9TdHJpbmcoKS50cmltKCk7XG4gICAgICBjb25zdCBmdWxsTmFtZSA9IHRvVGl0bGVDYXNlKHJhd05hbWUsIGxvY2FsZSk7XG4gICAgICBjb25zdCBmZWNoYSA9IChlbnRyeS50cmFuc0RhdGUgPz8gZW50cnkuVHJhbnNEYXRlID8/IFwiXCIpLnRvU3RyaW5nKCk7XG4gICAgICBjb25zdCByYXdEZXNjID0gKGVudHJ5LmRlc2NyaXB0aW9uID8/IGVudHJ5LkRlc2NyaXB0aW9uID8/IFwiXCIpLnRvU3RyaW5nKCkudHJpbSgpO1xuICAgICAgY29uc3QgZnVsbERlc2MgPSByYXdEZXNjO1xuXG4gICAgICBjb25zdCBpc05vRGF0YUNhcmQgPSAhcmF3TmFtZSAmJiAhcmF3RGVzYztcbiAgICAgIGlmIChpc05vRGF0YUNhcmQpIHtcbiAgICAgICAgbGlua0lkID0gXCJcIjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaWQ6IGxpbmtJZCxcbiAgICAgICAgYWN0aXZpZGFkSWQsXG4gICAgICAgIHJlY0lkLFxuICAgICAgICBuYW1lOiBmdWxsTmFtZSxcbiAgICAgICAgZGVzY3JpcHRpb246IGZ1bGxEZXNjIHx8IG5vRGF0YVRleHQsXG4gICAgICAgIGZ1bGxOYW1lLFxuICAgICAgICBmdWxsRGVzYyxcbiAgICAgICAgZGF0ZVBhcnRzOiBmb3JtYXREYXRlUGFydHMoZmVjaGEsIGxvY2FsZSksXG4gICAgICAgIGlzTm9EYXRhOiBpc05vRGF0YUNhcmQsXG4gICAgICB9O1xuICAgIH0pO1xuICB9LCBbZm9ybWF0RGF0ZVBhcnRzLCBpdGVtcywgbG9jYWxlLCBsb2dIaXN0b3J5LCBub0RhdGFUZXh0LCB0b1RpdGxlQ2FzZV0pO1xuXG4gIHJldHVybiB7IHRpbWVsaW5lSXRlbXMgfTtcbn07XHJcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBBcGlGZXRjaEVycm9yLCBmZXRjaEpzb24gfSBmcm9tIFwiLi4vc2VydmljZXMvYXBpU2VydmljZS50c1wiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi91dGlscy9pbmRJMThuLnRzXCI7XG5cbmV4cG9ydCB0eXBlIEhpc3RvcnlBY3Rpdml0eUl0ZW0gPSB7XG4gIGFjdGl2aWRhZElkPzogc3RyaW5nIHwgbnVtYmVyO1xuICBBY3RpdmlkYWRJZD86IHN0cmluZyB8IG51bWJlcjtcbiAgcmVjSWQ/OiBzdHJpbmcgfCBudW1iZXI7XG4gIFJlY0lkPzogc3RyaW5nIHwgbnVtYmVyO1xuICBuYW1lPzogc3RyaW5nO1xuICBOYW1lPzogc3RyaW5nO1xuICB0cmFuc0RhdGU/OiBzdHJpbmc7XG4gIFRyYW5zRGF0ZT86IHN0cmluZztcbiAgZGVzY3JpcHRpb24/OiBzdHJpbmc7XG4gIERlc2NyaXB0aW9uPzogc3RyaW5nO1xufTtcblxudHlwZSBIaXN0b3J5UmVzcG9uc2UgPSB7XG4gIGl0ZW1zPzogSGlzdG9yeUFjdGl2aXR5SXRlbVtdO1xuICB0b3RhbD86IG51bWJlcjtcbn07XG5cbnR5cGUgTG9hZE92ZXJyaWRlID0ge1xuICBmcm9tRGF0ZTogc3RyaW5nO1xuICB0b0RhdGU6IHN0cmluZztcbiAgYWNjb3VudE51bT86IHN0cmluZztcbn07XG5cbnR5cGUgVXNlSGlzdG9yeUFjdGl2aXRpZXNBcmdzID0ge1xuICBmcm9tRGF0ZVZhbHVlOiBzdHJpbmc7XG4gIHRvRGF0ZVZhbHVlOiBzdHJpbmc7XG4gIGFjY291bnROdW1WYWx1ZTogc3RyaW5nO1xuICBwYWdlU2l6ZTogbnVtYmVyO1xuICByZXRyeURlbGF5TXM/OiBudW1iZXI7XG4gIG5vcm1hbGl6ZVJhbmdlOiAoZnJvbTogc3RyaW5nLCB0bzogc3RyaW5nKSA9PiB7IGZyb206IHN0cmluZzsgdG86IHN0cmluZyB9O1xuICBvbkZvcmJpZGRlbjogKCkgPT4gdm9pZDtcbiAgb25EZWJ1Zz86IChtZXNzYWdlOiBzdHJpbmcsIGRhdGE/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPikgPT4gdm9pZDtcbn07XG5cbi8vIENlbnRyYWxpemVzIGhpc3RvcnkgZmV0Y2gvcmV0cnkgbG9naWMgdG8ga2VlcCBwYWdlIGNvbXBvbmVudHMgc21hbGxlci5cbmV4cG9ydCBjb25zdCB1c2VIaXN0b3J5QWN0aXZpdGllcyA9ICh7XG4gIGZyb21EYXRlVmFsdWUsXG4gIHRvRGF0ZVZhbHVlLFxuICBhY2NvdW50TnVtVmFsdWUsXG4gIHBhZ2VTaXplLFxuICByZXRyeURlbGF5TXMgPSA2MDAsXG4gIG5vcm1hbGl6ZVJhbmdlLFxuICBvbkZvcmJpZGRlbixcbiAgb25EZWJ1Zyxcbn06IFVzZUhpc3RvcnlBY3Rpdml0aWVzQXJncykgPT4ge1xuICBjb25zdCBbaXRlbXMsIHNldEl0ZW1zXSA9IHVzZVN0YXRlPEhpc3RvcnlBY3Rpdml0eUl0ZW1bXT4oW10pO1xuICBjb25zdCBbdG90YWwsIHNldFRvdGFsXSA9IHVzZVN0YXRlKDApO1xuICBjb25zdCBbY3VycmVudFBhZ2UsIHNldEN1cnJlbnRQYWdlXSA9IHVzZVN0YXRlKDEpO1xuICBjb25zdCBbaXNMb2FkaW5nLCBzZXRJc0xvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbZXJyb3JNZXNzYWdlLCBzZXRFcnJvck1lc3NhZ2VdID0gdXNlU3RhdGUoXCJcIik7XG5cbiAgY29uc3QgcmV0cnlPbk5ldHdvcmtFcnJvclJlZiA9IHVzZVJlZihmYWxzZSk7XG4gIGNvbnN0IGFjdGl2ZUFib3J0UmVmID0gdXNlUmVmPEFib3J0Q29udHJvbGxlciB8IG51bGw+KG51bGwpO1xuICBjb25zdCBhY3RpdmVSZXF1ZXN0SWRSZWYgPSB1c2VSZWYoMCk7XG4gIGNvbnN0IHJldHJ5VGltZXJSZWYgPSB1c2VSZWY8bnVtYmVyIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IGxhc3RTaWduYXR1cmVSZWYgPSB1c2VSZWYoXCJcIik7XG5cbiAgY29uc3QgY2xlYXJSZXRyeVRpbWVyID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmIChyZXRyeVRpbWVyUmVmLmN1cnJlbnQpIHtcbiAgICAgIGNsZWFyVGltZW91dChyZXRyeVRpbWVyUmVmLmN1cnJlbnQpO1xuICAgICAgcmV0cnlUaW1lclJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICB9XG4gIH0sIFtdKTtcblxuICBjb25zdCBhYm9ydEFjdGl2ZVJlcXVlc3QgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKCFhY3RpdmVBYm9ydFJlZi5jdXJyZW50KSByZXR1cm47XG4gICAgdHJ5IHtcbiAgICAgIGFjdGl2ZUFib3J0UmVmLmN1cnJlbnQuYWJvcnQoKTtcbiAgICB9IGNhdGNoIHtcbiAgICAgIC8vIElnbm9yZSBhYm9ydCBlcnJvcnMuXG4gICAgfVxuICAgIGFjdGl2ZUFib3J0UmVmLmN1cnJlbnQgPSBudWxsO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgcmVzZXRBY3Rpdml0aWVzID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGNsZWFyUmV0cnlUaW1lcigpO1xuICAgIGFib3J0QWN0aXZlUmVxdWVzdCgpO1xuICAgIHNldEl0ZW1zKFtdKTtcbiAgICBzZXRUb3RhbCgwKTtcbiAgICBzZXRFcnJvck1lc3NhZ2UoXCJcIik7XG4gICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcbiAgfSwgW2Fib3J0QWN0aXZlUmVxdWVzdCwgY2xlYXJSZXRyeVRpbWVyXSk7XG5cbiAgY29uc3QgbG9hZEFjdGl2aXRpZXMgPSB1c2VDYWxsYmFjayhcbiAgICBhc3luYyAocGFnZTogbnVtYmVyLCBvdmVycmlkZT86IExvYWRPdmVycmlkZSkgPT4ge1xuICAgICAgY29uc3QgZnJvbURhdGVTdHIgPSBvdmVycmlkZT8uZnJvbURhdGUgPz8gZnJvbURhdGVWYWx1ZTtcbiAgICAgIGNvbnN0IHRvRGF0ZVN0ciA9IG92ZXJyaWRlPy50b0RhdGUgPz8gdG9EYXRlVmFsdWU7XG4gICAgICBjb25zdCBhY2NvdW50TnVtU3RyID0gb3ZlcnJpZGU/LmFjY291bnROdW0gPz8gYWNjb3VudE51bVZhbHVlO1xuXG4gICAgICBpZiAoIWZyb21EYXRlU3RyIHx8ICF0b0RhdGVTdHIpIHtcbiAgICAgICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgc2V0SXRlbXMoW10pO1xuICAgICAgICBzZXRUb3RhbCgwKTtcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKFwiXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHNldEN1cnJlbnRQYWdlKHBhZ2UpO1xuICAgICAgY2xlYXJSZXRyeVRpbWVyKCk7XG5cbiAgICAgIGNvbnN0IHJlcXVlc3RJZCA9ICsrYWN0aXZlUmVxdWVzdElkUmVmLmN1cnJlbnQ7XG4gICAgICBhYm9ydEFjdGl2ZVJlcXVlc3QoKTtcblxuICAgICAgY29uc3QgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcbiAgICAgIGFjdGl2ZUFib3J0UmVmLmN1cnJlbnQgPSBjb250cm9sbGVyO1xuXG4gICAgICBjb25zdCBub3JtYWxpemVkID0gbm9ybWFsaXplUmFuZ2UoZnJvbURhdGVTdHIsIHRvRGF0ZVN0cik7XG4gICAgICBjb25zdCBmaWx0ZXJTaWduYXR1cmUgPSBgJHtub3JtYWxpemVkLmZyb219fCR7bm9ybWFsaXplZC50b318JHthY2NvdW50TnVtU3RyfXwke3BhZ2V9YDtcbiAgICAgIGxhc3RTaWduYXR1cmVSZWYuY3VycmVudCA9IGZpbHRlclNpZ25hdHVyZTtcblxuICAgICAgc2V0SXNMb2FkaW5nKHRydWUpO1xuICAgICAgc2V0SXRlbXMoW10pO1xuICAgICAgc2V0VG90YWwoMCk7XG4gICAgICBzZXRFcnJvck1lc3NhZ2UoXCJcIik7XG5cbiAgICAgIGNvbnN0IHBheWxvYWQgPSB7XG4gICAgICAgIGZyb21EYXRlOiBub3JtYWxpemVkLmZyb20sXG4gICAgICAgIHRvRGF0ZTogbm9ybWFsaXplZC50byxcbiAgICAgICAgYWNjb3VudE51bTogYWNjb3VudE51bVN0cixcbiAgICAgIH07XG5cbiAgICAgIG9uRGVidWc/LihcImxvYWRBY3Rpdml0aWVzOnJlcXVlc3RcIiwgeyBwYWdlLCBwYWdlU2l6ZSwgcGF5bG9hZCB9KTtcblxuICAgICAgbGV0IGRhdGE6IEhpc3RvcnlSZXNwb25zZTtcbiAgICAgIHRyeSB7XG4gICAgICAgIGRhdGEgPSBhd2FpdCBmZXRjaEpzb248SGlzdG9yeVJlc3BvbnNlPihgL0hpc3RvcmlhbC9HZXRBY3Rpdml0aWVzP3BhZ2U9JHtwYWdlfSZwYWdlU2l6ZT0ke3BhZ2VTaXplfWAsIHtcbiAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcbiAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXlsb2FkKSxcbiAgICAgICAgICBzaWduYWw6IGNvbnRyb2xsZXIuc2lnbmFsLFxuICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxuICAgICAgICB9KTtcbiAgICAgIH0gY2F0Y2ggKGVycjogYW55KSB7XG4gICAgICAgIGlmIChyZXF1ZXN0SWQgIT09IGFjdGl2ZVJlcXVlc3RJZFJlZi5jdXJyZW50KSByZXR1cm47XG4gICAgICAgIGlmIChlcnI/Lm5hbWUgPT09IFwiQWJvcnRFcnJvclwiKSB7XG4gICAgICAgICAgYWN0aXZlQWJvcnRSZWYuY3VycmVudCA9IG51bGw7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVyciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IgJiYgZXJyLnN0YXR1cyA9PT0gNDAzKSB7XG4gICAgICAgICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgICBhY3RpdmVBYm9ydFJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICAgICAgICBvbkZvcmJpZGRlbigpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGlzTmV0d29ya0Vycm9yID0gIShlcnIgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yKSB8fCB0eXBlb2YgZXJyLnN0YXR1cyAhPT0gXCJudW1iZXJcIjtcbiAgICAgICAgaWYgKGlzTmV0d29ya0Vycm9yICYmIHJldHJ5T25OZXR3b3JrRXJyb3JSZWYuY3VycmVudCkge1xuICAgICAgICAgIHJldHJ5T25OZXR3b3JrRXJyb3JSZWYuY3VycmVudCA9IGZhbHNlO1xuICAgICAgICAgIGFjdGl2ZUFib3J0UmVmLmN1cnJlbnQgPSBudWxsO1xuICAgICAgICAgIHJldHJ5VGltZXJSZWYuY3VycmVudCA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0SWQgIT09IGFjdGl2ZVJlcXVlc3RJZFJlZi5jdXJyZW50KSByZXR1cm47XG4gICAgICAgICAgICBpZiAobGFzdFNpZ25hdHVyZVJlZi5jdXJyZW50ICE9PSBmaWx0ZXJTaWduYXR1cmUpIHJldHVybjtcbiAgICAgICAgICAgIGxvYWRBY3Rpdml0aWVzKHBhZ2UsIHtcbiAgICAgICAgICAgICAgZnJvbURhdGU6IGZyb21EYXRlU3RyLFxuICAgICAgICAgICAgICB0b0RhdGU6IHRvRGF0ZVN0cixcbiAgICAgICAgICAgICAgYWNjb3VudE51bTogYWNjb3VudE51bVN0cixcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sIHJldHJ5RGVsYXlNcyk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XG4gICAgICAgIHNldEVycm9yTWVzc2FnZShlcnI/Lm1lc3NhZ2UgfHwgaW5kVChcIkFwaV9SZXF1ZXN0RmFpbGVkXCIsIFwiTm8gc2UgcHVkbyBjb25lY3RhciBjb24gZWwgc2Vydmlkb3IgKHJlZCkuXCIpKTtcbiAgICAgICAgYWN0aXZlQWJvcnRSZWYuY3VycmVudCA9IG51bGw7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHJlcXVlc3RJZCAhPT0gYWN0aXZlUmVxdWVzdElkUmVmLmN1cnJlbnQpIHJldHVybjtcblxuICAgICAgb25EZWJ1Zz8uKFwibG9hZEFjdGl2aXRpZXM6cmVzcG9uc2VcIiwge1xuICAgICAgICBzdGF0dXM6IDIwMCxcbiAgICAgICAgdG90YWw6IGRhdGE/LnRvdGFsID8/IDAsXG4gICAgICAgIGNvdW50OiBBcnJheS5pc0FycmF5KGRhdGE/Lml0ZW1zKSA/IGRhdGEuaXRlbXMubGVuZ3RoIDogMCxcbiAgICAgIH0pO1xuXG4gICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xuICAgICAgc2V0SXRlbXMoZGF0YS5pdGVtcyB8fCBbXSk7XG4gICAgICBzZXRUb3RhbChkYXRhLnRvdGFsIHx8IChkYXRhLml0ZW1zIHx8IFtdKS5sZW5ndGgpO1xuICAgICAgYWN0aXZlQWJvcnRSZWYuY3VycmVudCA9IG51bGw7XG4gICAgfSxcbiAgICBbXG4gICAgICBhYm9ydEFjdGl2ZVJlcXVlc3QsXG4gICAgICBhY2NvdW50TnVtVmFsdWUsXG4gICAgICBjbGVhclJldHJ5VGltZXIsXG4gICAgICBmcm9tRGF0ZVZhbHVlLFxuICAgICAgbm9ybWFsaXplUmFuZ2UsXG4gICAgICBvbkRlYnVnLFxuICAgICAgb25Gb3JiaWRkZW4sXG4gICAgICBwYWdlU2l6ZSxcbiAgICAgIHJldHJ5RGVsYXlNcyxcbiAgICAgIHRvRGF0ZVZhbHVlLFxuICAgIF1cbiAgKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjbGVhclJldHJ5VGltZXIoKTtcbiAgICAgIGFib3J0QWN0aXZlUmVxdWVzdCgpO1xuICAgIH07XG4gIH0sIFthYm9ydEFjdGl2ZVJlcXVlc3QsIGNsZWFyUmV0cnlUaW1lcl0pO1xuXG4gIHJldHVybiB7XG4gICAgaXRlbXMsXG4gICAgdG90YWwsXG4gICAgY3VycmVudFBhZ2UsXG4gICAgaXNMb2FkaW5nLFxuICAgIGVycm9yTWVzc2FnZSxcbiAgICBsb2FkQWN0aXZpdGllcyxcbiAgICByZXNldEFjdGl2aXRpZXMsXG4gICAgcmV0cnlPbk5ldHdvcmtFcnJvclJlZixcbiAgICBsYXN0U2lnbmF0dXJlUmVmLFxuICB9O1xufTtcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjayB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgSElTVE9SWV9GSUxURVJfS0VZLCBISVNUT1JZX1JFVFVSTl9GTEFHX0tFWSB9IGZyb20gXCIuLi91dGlscy92aXNpdGFzSGlzdG9yeS50c1wiO1xuaW1wb3J0IHtcbiAgZ2V0U2Vzc2lvbkpzb25XaXRoRXhwaXJ5LFxuICBnZXRTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5LFxuICByZW1vdmVTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5LFxuICBzZXRTZXNzaW9uSnNvbldpdGhFeHBpcnksXG4gIHNldFNlc3Npb25WYWx1ZVdpdGhFeHBpcnksXG59IGZyb20gXCIuLi91dGlscy9zZXNzaW9uRXhwaXJ5LnRzXCI7XG5cbmV4cG9ydCB0eXBlIEhpc3RvcnlDYWNoZWRGaWx0ZXIgPSB7XG4gIGZyb21EYXRlOiBzdHJpbmc7XG4gIHRvRGF0ZTogc3RyaW5nO1xuICBwYWdlPzogbnVtYmVyO1xuICBjbGllbnRBY2NvdW50Pzogc3RyaW5nO1xuICBjbGllbnRUZXh0Pzogc3RyaW5nO1xufTtcblxuY29uc3QgSElTVE9SWV9DQUNIRV9UVExfTVMgPSAxMiAqIDYwICogNjAgKiAxMDAwO1xuXG5jb25zdCBub3JtYWxpemVDYWNoZWRGaWx0ZXIgPSAodmFsdWU6IEhpc3RvcnlDYWNoZWRGaWx0ZXIgfCBudWxsKTogSGlzdG9yeUNhY2hlZEZpbHRlciB8IG51bGwgPT4ge1xuICBpZiAoIXZhbHVlIHx8IHR5cGVvZiB2YWx1ZSAhPT0gXCJvYmplY3RcIikgcmV0dXJuIG51bGw7XG4gIHJldHVybiB7XG4gICAgZnJvbURhdGU6IHZhbHVlLmZyb21EYXRlIHx8IFwiXCIsXG4gICAgdG9EYXRlOiB2YWx1ZS50b0RhdGUgfHwgXCJcIixcbiAgICBwYWdlOiB2YWx1ZS5wYWdlLFxuICAgIGNsaWVudEFjY291bnQ6IHZhbHVlLmNsaWVudEFjY291bnQgfHwgXCJcIixcbiAgICBjbGllbnRUZXh0OiB2YWx1ZS5jbGllbnRUZXh0IHx8IFwiXCIsXG4gIH07XG59O1xuXG4vLyBLZWVwcyBoaXN0b3J5IGZpbHRlciBjYWNoZSByZWFkcy93cml0ZXMgaW4gb25lIHBsYWNlLlxuZXhwb3J0IGNvbnN0IHVzZUhpc3RvcnlGaWx0ZXJDYWNoZSA9ICgpID0+IHtcbiAgY29uc3QgcmVhZENhY2hlZEZpbHRlciA9IHVzZUNhbGxiYWNrKCgpOiBIaXN0b3J5Q2FjaGVkRmlsdGVyIHwgbnVsbCA9PiB7XG4gICAgY29uc3QgcGFyc2VkID0gZ2V0U2Vzc2lvbkpzb25XaXRoRXhwaXJ5PEhpc3RvcnlDYWNoZWRGaWx0ZXI+KEhJU1RPUllfRklMVEVSX0tFWSk7XG4gICAgcmV0dXJuIG5vcm1hbGl6ZUNhY2hlZEZpbHRlcihwYXJzZWQpO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgY2xlYXJGaWx0ZXJDYWNoZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICByZW1vdmVTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KEhJU1RPUllfRklMVEVSX0tFWSk7XG4gICAgcmVtb3ZlU2Vzc2lvblZhbHVlV2l0aEV4cGlyeShISVNUT1JZX1JFVFVSTl9GTEFHX0tFWSk7XG4gIH0sIFtdKTtcblxuICBjb25zdCBjb25zdW1lUmV0dXJuRmxhZyA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBjb25zdCByYXcgPSBnZXRTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KEhJU1RPUllfUkVUVVJOX0ZMQUdfS0VZKTtcbiAgICBpZiAocmF3ID09PSBcIjFcIikge1xuICAgICAgcmVtb3ZlU2Vzc2lvblZhbHVlV2l0aEV4cGlyeShISVNUT1JZX1JFVFVSTl9GTEFHX0tFWSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9LCBbXSk7XG5cbiAgY29uc3Qgc2F2ZUNhY2hlZEZpbHRlciA9IHVzZUNhbGxiYWNrKChmaWx0ZXI6IEhpc3RvcnlDYWNoZWRGaWx0ZXIpID0+IHtcbiAgICBzZXRTZXNzaW9uSnNvbldpdGhFeHBpcnkoSElTVE9SWV9GSUxURVJfS0VZLCBmaWx0ZXIsIEhJU1RPUllfQ0FDSEVfVFRMX01TKTtcbiAgICBzZXRTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KEhJU1RPUllfUkVUVVJOX0ZMQUdfS0VZLCBcIjFcIiwgSElTVE9SWV9DQUNIRV9UVExfTVMpO1xuICB9LCBbXSk7XG5cbiAgcmV0dXJuIHtcbiAgICByZWFkQ2FjaGVkRmlsdGVyLFxuICAgIGNsZWFyRmlsdGVyQ2FjaGUsXG4gICAgY29uc3VtZVJldHVybkZsYWcsXG4gICAgc2F2ZUNhY2hlZEZpbHRlcixcbiAgfTtcbn07XG4iLCAiXHVGRUZGaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrLCB1c2VNZW1vLCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgdHlwZSB7IE1vdXNlRXZlbnQgYXMgUmVhY3RNb3VzZUV2ZW50IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgdHlwZSB7IENsaWVudE9wdGlvbiB9IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL3Zpc2l0YXMvQ2xpZW50U2VhcmNoQ29tYm9ib3gudHN4XCI7XG5pbXBvcnQgdHlwZSB7IEhpc3RvcnlDYWNoZWRGaWx0ZXIgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlSGlzdG9yeUZpbHRlckNhY2hlLnRzXCI7XG5cbmV4cG9ydCB0eXBlIFF1aWNrRmlsdGVySWQgPSBcImN1c3RvbVwiIHwgXCJkYXlzLTdcIiB8IFwiZGF5cy0zMFwiIHwgXCJkYXlzLTkwXCI7XG5cbmV4cG9ydCB0eXBlIExvYWRPdmVycmlkZSA9IHtcbiAgZnJvbURhdGU6IHN0cmluZztcbiAgdG9EYXRlOiBzdHJpbmc7XG4gIGFjY291bnROdW0/OiBzdHJpbmc7XG59O1xuXG5leHBvcnQgdHlwZSBGaWx0ZXJMb2FkUmVxdWVzdCA9IHtcbiAgcGFnZTogbnVtYmVyO1xuICBvdmVycmlkZTogTG9hZE92ZXJyaWRlO1xufTtcblxudHlwZSBVc2VIaXN0b3J5RmlsdGVyc1N0YXRlQXJncyA9IHtcbiAgZGVmYXVsdEZyb21EYXRlOiBzdHJpbmc7XG4gIGRlZmF1bHRUb0RhdGU6IHN0cmluZztcbiAgbG9nSGlzdG9yeTogKG1lc3NhZ2U6IHN0cmluZywgZGF0YT86IFJlY29yZDxzdHJpbmcsIHVua25vd24+KSA9PiB2b2lkO1xuICBwYXJzZURhdGVWYWx1ZTogKHZhbHVlOiBzdHJpbmcpID0+IERhdGUgfCBudWxsO1xuICBwYXJzZUlTTzogKHZhbHVlOiBzdHJpbmcpID0+IERhdGUgfCBudWxsO1xuICB0b0lTTzogKHZhbHVlOiBEYXRlKSA9PiBzdHJpbmc7XG4gIHN0YXJ0T2ZEYXk6ICh2YWx1ZTogRGF0ZSkgPT4gRGF0ZTtcbiAgaXNCZWZvcmU6IChhOiBEYXRlIHwgbnVsbCwgYjogRGF0ZSB8IG51bGwpID0+IGJvb2xlYW47XG59O1xuXG4vLyBFbmNhcHN1bGF0ZXMgaGlzdG9yeSBmaWx0ZXIgc3RhdGUgYW5kIGRhdGUtcmFuZ2Ugb3JjaGVzdHJhdGlvbi5cbmV4cG9ydCBjb25zdCB1c2VIaXN0b3J5RmlsdGVyc1N0YXRlID0gKHtcbiAgZGVmYXVsdEZyb21EYXRlLFxuICBkZWZhdWx0VG9EYXRlLFxuICBsb2dIaXN0b3J5LFxuICBwYXJzZURhdGVWYWx1ZSxcbiAgcGFyc2VJU08sXG4gIHRvSVNPLFxuICBzdGFydE9mRGF5LFxuICBpc0JlZm9yZSxcbn06IFVzZUhpc3RvcnlGaWx0ZXJzU3RhdGVBcmdzKSA9PiB7XG4gIGNvbnN0IFtzdGFydERhdGUsIHNldFN0YXJ0RGF0ZV0gPSB1c2VTdGF0ZTxEYXRlIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtlbmREYXRlLCBzZXRFbmREYXRlXSA9IHVzZVN0YXRlPERhdGUgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW21hbnVhbFN0YXJ0RGF0ZSwgc2V0TWFudWFsU3RhcnREYXRlXSA9IHVzZVN0YXRlPERhdGUgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW21hbnVhbEVuZERhdGUsIHNldE1hbnVhbEVuZERhdGVdID0gdXNlU3RhdGU8RGF0ZSB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbaG92ZXJEYXRlLCBzZXRIb3ZlckRhdGVdID0gdXNlU3RhdGU8RGF0ZSB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbc2VsZWN0aW5nU3RlcCwgc2V0U2VsZWN0aW5nU3RlcF0gPSB1c2VTdGF0ZTxcInN0YXJ0XCIgfCBcImVuZFwiIHwgXCJkb25lXCI+KFwic3RhcnRcIik7XG4gIGNvbnN0IFtjdXJyZW50TW9udGgsIHNldEN1cnJlbnRNb250aF0gPSB1c2VTdGF0ZShuZXcgRGF0ZSgpLmdldE1vbnRoKCkpO1xuICBjb25zdCBbY3VycmVudFllYXIsIHNldEN1cnJlbnRZZWFyXSA9IHVzZVN0YXRlKG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKSk7XG4gIGNvbnN0IFtpc09wZW4sIHNldElzT3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtzaG93TWFudWFsUGlja2VyUGFuZWwsIHNldFNob3dNYW51YWxQaWNrZXJQYW5lbF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFthY3RpdmVRdWlja0ZpbHRlciwgc2V0QWN0aXZlUXVpY2tGaWx0ZXJdID0gdXNlU3RhdGU8UXVpY2tGaWx0ZXJJZCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbc2VsZWN0ZWRDbGllbnQsIHNldFNlbGVjdGVkQ2xpZW50XSA9IHVzZVN0YXRlPENsaWVudE9wdGlvbiB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbY2xpZW50UmVzZXRLZXksIHNldENsaWVudFJlc2V0S2V5XSA9IHVzZVN0YXRlKDApO1xuICBjb25zdCBbc2hvd0ZpbHRlcnMsIHNldFNob3dGaWx0ZXJzXSA9IHVzZVN0YXRlKHRydWUpO1xuICBjb25zdCBbc2hvd01hbnVhbEVycm9yLCBzZXRTaG93TWFudWFsRXJyb3JdID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIGNvbnN0IGhhc1Jlc3RvcmVkRmlsdGVyUmVmID0gdXNlUmVmKGZhbHNlKTtcbiAgY29uc3QgZGlkSW5pdEZpbHRlclJlZiA9IHVzZVJlZihmYWxzZSk7XG5cbiAgY29uc3QgZnJvbURhdGVWYWx1ZSA9IHVzZU1lbW8oKCkgPT4gKHN0YXJ0RGF0ZSA/IHRvSVNPKHN0YXJ0RGF0ZSkgOiBcIlwiKSwgW3N0YXJ0RGF0ZSwgdG9JU09dKTtcbiAgY29uc3QgdG9EYXRlVmFsdWUgPSB1c2VNZW1vKCgpID0+IChlbmREYXRlID8gdG9JU08oZW5kRGF0ZSkgOiBcIlwiKSwgW2VuZERhdGUsIHRvSVNPXSk7XG4gIGNvbnN0IGFjY291bnROdW1WYWx1ZSA9IHVzZU1lbW8oKCkgPT4gKHNlbGVjdGVkQ2xpZW50ID8gc2VsZWN0ZWRDbGllbnQudmFsdWUgOiBcIlwiKSwgW3NlbGVjdGVkQ2xpZW50XSk7XG5cbiAgY29uc3QgdmFsaWRhdGVNYW51YWxSYW5nZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoYWN0aXZlUXVpY2tGaWx0ZXIgPT09IFwiY3VzdG9tXCIgJiYgKCFzdGFydERhdGUgfHwgIWVuZERhdGUpKSB7XG4gICAgICBzZXRTaG93TWFudWFsRXJyb3IodHJ1ZSk7XG4gICAgICBzZXRTZWxlY3RpbmdTdGVwKCFzdGFydERhdGUgPyBcInN0YXJ0XCIgOiBcImVuZFwiKTtcbiAgICAgIHNldFNob3dNYW51YWxQaWNrZXJQYW5lbCh0cnVlKTtcbiAgICAgIHNldElzT3Blbih0cnVlKTtcbiAgICAgIHNldFNob3dGaWx0ZXJzKHRydWUpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSwgW2FjdGl2ZVF1aWNrRmlsdGVyLCBlbmREYXRlLCBzdGFydERhdGVdKTtcblxuICAvLyBBcHBsaWVzIGEgZGVmYXVsdCBkYXRlIHJhbmdlIGFuZCByZXR1cm5zIHRoZSBsb2FkIHBheWxvYWQgbmVlZGVkIGJ5IHRoZSBwYWdlLlxuICBjb25zdCBhcHBseURlZmF1bHRSYW5nZUZyb21Qcm9wcyA9IHVzZUNhbGxiYWNrKCgpOiBGaWx0ZXJMb2FkUmVxdWVzdCB8IG51bGwgPT4ge1xuICAgIGlmICghZGVmYXVsdEZyb21EYXRlIHx8ICFkZWZhdWx0VG9EYXRlKSByZXR1cm4gbnVsbDtcbiAgICBjb25zdCBzdGFydFJhdyA9IHBhcnNlRGF0ZVZhbHVlKGRlZmF1bHRGcm9tRGF0ZSk7XG4gICAgY29uc3QgZW5kUmF3ID0gcGFyc2VEYXRlVmFsdWUoZGVmYXVsdFRvRGF0ZSk7XG4gICAgaWYgKCFzdGFydFJhdyB8fCAhZW5kUmF3KSByZXR1cm4gbnVsbDtcblxuICAgIGNvbnN0IHN0YXJ0RGF5ID0gc3RhcnRPZkRheShzdGFydFJhdyk7XG4gICAgY29uc3QgZW5kRGF5ID0gc3RhcnRPZkRheShlbmRSYXcpO1xuXG4gICAgbGV0IHN0YXJ0ID0gc3RhcnREYXk7XG4gICAgbGV0IGVuZCA9IGVuZERheTtcbiAgICBpZiAoaXNCZWZvcmUoZW5kLCBzdGFydCkpIHtcbiAgICAgIGNvbnN0IHN3YXAgPSBzdGFydDtcbiAgICAgIHN0YXJ0ID0gZW5kO1xuICAgICAgZW5kID0gc3dhcDtcbiAgICB9XG5cbiAgICBzZXRTdGFydERhdGUoc3RhcnQpO1xuICAgIHNldEVuZERhdGUoZW5kKTtcbiAgICBzZXRTZWxlY3RpbmdTdGVwKFwiZG9uZVwiKTtcbiAgICBzZXRIb3ZlckRhdGUobnVsbCk7XG4gICAgc2V0Q3VycmVudE1vbnRoKHN0YXJ0LmdldE1vbnRoKCkpO1xuICAgIHNldEN1cnJlbnRZZWFyKHN0YXJ0LmdldEZ1bGxZZWFyKCkpO1xuICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKG51bGwpO1xuICAgIHNldFNlbGVjdGVkQ2xpZW50KG51bGwpO1xuICAgIHNldElzT3BlbihmYWxzZSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgcGFnZTogMSxcbiAgICAgIG92ZXJyaWRlOiB7XG4gICAgICAgIGZyb21EYXRlOiB0b0lTTyhzdGFydCksXG4gICAgICAgIHRvRGF0ZTogdG9JU08oZW5kKSxcbiAgICAgICAgYWNjb3VudE51bTogXCJcIixcbiAgICAgIH0sXG4gICAgfTtcbiAgfSwgW2RlZmF1bHRGcm9tRGF0ZSwgZGVmYXVsdFRvRGF0ZSwgaXNCZWZvcmUsIHBhcnNlRGF0ZVZhbHVlLCBzdGFydE9mRGF5LCB0b0lTT10pO1xuXG4gIC8vIFJlc2V0cyBoaXN0b3J5IGZpbHRlcnMgbG9jYWwgc3RhdGUgb25seS5cbiAgY29uc3QgcmVzZXRIaXN0b3J5RmlsdGVycyA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBzZXRTdGFydERhdGUobnVsbCk7XG4gICAgc2V0RW5kRGF0ZShudWxsKTtcbiAgICBzZXRNYW51YWxTdGFydERhdGUobnVsbCk7XG4gICAgc2V0TWFudWFsRW5kRGF0ZShudWxsKTtcbiAgICBzZXRTZWxlY3RpbmdTdGVwKFwic3RhcnRcIik7XG4gICAgc2V0SG92ZXJEYXRlKG51bGwpO1xuICAgIHNldEN1cnJlbnRNb250aChuZXcgRGF0ZSgpLmdldE1vbnRoKCkpO1xuICAgIHNldEN1cnJlbnRZZWFyKG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKSk7XG4gICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIobnVsbCk7XG4gICAgc2V0U2hvd01hbnVhbFBpY2tlclBhbmVsKGZhbHNlKTtcbiAgICBzZXRTZWxlY3RlZENsaWVudChudWxsKTtcbiAgICBzZXRDbGllbnRSZXNldEtleSgocHJldikgPT4gcHJldiArIDEpO1xuICAgIHNldFNob3dNYW51YWxFcnJvcihmYWxzZSk7XG4gIH0sIFtdKTtcblxuICAvLyBBcHBsaWVzIGNhY2hlZCBmaWx0ZXJzIGFuZCByZXR1cm5zIHRoZSBsb2FkIHBheWxvYWQgbmVlZGVkIGJ5IHRoZSBwYWdlLlxuICBjb25zdCBhcHBseUNhY2hlZEZpbHRlciA9IHVzZUNhbGxiYWNrKFxuICAgIChmaWx0ZXI6IEhpc3RvcnlDYWNoZWRGaWx0ZXIgfCBudWxsKTogRmlsdGVyTG9hZFJlcXVlc3QgfCBudWxsID0+IHtcbiAgICAgIGlmICghZmlsdGVyIHx8ICFmaWx0ZXIuZnJvbURhdGUgfHwgIWZpbHRlci50b0RhdGUpIHJldHVybiBudWxsO1xuXG4gICAgICBjb25zdCBzdGFydCA9IHBhcnNlSVNPKGZpbHRlci5mcm9tRGF0ZSk7XG4gICAgICBjb25zdCBlbmQgPSBwYXJzZUlTTyhmaWx0ZXIudG9EYXRlKTtcbiAgICAgIHNldFN0YXJ0RGF0ZShzdGFydCk7XG4gICAgICBzZXRFbmREYXRlKGVuZCk7XG4gICAgICBzZXRTZWxlY3RpbmdTdGVwKGVuZCA/IFwiZG9uZVwiIDogXCJlbmRcIik7XG4gICAgICBzZXRIb3ZlckRhdGUobnVsbCk7XG4gICAgICBzZXRDdXJyZW50TW9udGgoc3RhcnQgPyBzdGFydC5nZXRNb250aCgpIDogbmV3IERhdGUoKS5nZXRNb250aCgpKTtcbiAgICAgIHNldEN1cnJlbnRZZWFyKHN0YXJ0ID8gc3RhcnQuZ2V0RnVsbFllYXIoKSA6IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKSk7XG4gICAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcihudWxsKTtcbiAgICAgIHNldFNob3dNYW51YWxQaWNrZXJQYW5lbChmYWxzZSk7XG4gICAgICBzZXRTaG93TWFudWFsRXJyb3IoZmFsc2UpO1xuXG4gICAgICBpZiAoZmlsdGVyLmNsaWVudEFjY291bnQpIHtcbiAgICAgICAgc2V0U2VsZWN0ZWRDbGllbnQoeyB2YWx1ZTogZmlsdGVyLmNsaWVudEFjY291bnQsIHRleHQ6IGZpbHRlci5jbGllbnRUZXh0IHx8IGZpbHRlci5jbGllbnRBY2NvdW50IH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2V0U2VsZWN0ZWRDbGllbnQobnVsbCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHBhZ2VWYWwgPSBOdW1iZXIoZmlsdGVyLnBhZ2UpO1xuICAgICAgY29uc3QgcGFnZVRvTG9hZCA9IE51bWJlci5pc0Zpbml0ZShwYWdlVmFsKSAmJiBwYWdlVmFsID4gMCA/IHBhZ2VWYWwgOiAxO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBwYWdlOiBwYWdlVG9Mb2FkLFxuICAgICAgICBvdmVycmlkZToge1xuICAgICAgICAgIGZyb21EYXRlOiBmaWx0ZXIuZnJvbURhdGUsXG4gICAgICAgICAgdG9EYXRlOiBmaWx0ZXIudG9EYXRlLFxuICAgICAgICAgIGFjY291bnROdW06IGZpbHRlci5jbGllbnRBY2NvdW50IHx8IFwiXCIsXG4gICAgICAgIH0sXG4gICAgICB9O1xuICAgIH0sXG4gICAgW3BhcnNlSVNPXVxuICApO1xuXG4gIGNvbnN0IGhhbmRsZVNlbGVjdCA9IHVzZUNhbGxiYWNrKFxuICAgIChkYXRlT2JqOiBEYXRlKSA9PiB7XG4gICAgICBsb2dIaXN0b3J5KFwiaGFuZGxlU2VsZWN0XCIsIHtcbiAgICAgICAgY2xpY2tlZDogdG9JU08oZGF0ZU9iaiksXG4gICAgICAgIHN0YXJ0OiBmcm9tRGF0ZVZhbHVlLFxuICAgICAgICBlbmQ6IHRvRGF0ZVZhbHVlLFxuICAgICAgICBzZWxlY3RpbmdTdGVwLFxuICAgICAgfSk7XG5cbiAgICAgIHNldFNob3dNYW51YWxFcnJvcihmYWxzZSk7XG4gICAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcihcImN1c3RvbVwiKTtcbiAgICAgIHNldFNob3dNYW51YWxQaWNrZXJQYW5lbCh0cnVlKTtcbiAgICAgIGNvbnN0IGhhc1N0YXJ0ID0gISFzdGFydERhdGU7XG4gICAgICBjb25zdCBoYXNFbmQgPSAhIWVuZERhdGU7XG5cbiAgICAgIGlmIChzZWxlY3RpbmdTdGVwID09PSBcImVuZFwiKSB7XG4gICAgICAgIGlmICghaGFzU3RhcnQpIHtcbiAgICAgICAgICBzZXRTdGFydERhdGUoZGF0ZU9iaik7XG4gICAgICAgICAgc2V0RW5kRGF0ZShudWxsKTtcbiAgICAgICAgICBzZXRTZWxlY3RpbmdTdGVwKFwiZW5kXCIpO1xuICAgICAgICAgIHNldEN1cnJlbnRNb250aChkYXRlT2JqLmdldE1vbnRoKCkpO1xuICAgICAgICAgIHNldEN1cnJlbnRZZWFyKGRhdGVPYmouZ2V0RnVsbFllYXIoKSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG5ld1N0YXJ0ID0gc3RhcnREYXRlIGFzIERhdGU7XG4gICAgICAgIGxldCBuZXdFbmQgPSBkYXRlT2JqO1xuICAgICAgICBpZiAoaXNCZWZvcmUobmV3RW5kLCBuZXdTdGFydCkpIHtcbiAgICAgICAgICBjb25zdCBzd2FwID0gbmV3U3RhcnQ7XG4gICAgICAgICAgbmV3U3RhcnQgPSBuZXdFbmQ7XG4gICAgICAgICAgbmV3RW5kID0gc3dhcDtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldFN0YXJ0RGF0ZShuZXdTdGFydCk7XG4gICAgICAgIHNldEVuZERhdGUobmV3RW5kKTtcbiAgICAgICAgc2V0TWFudWFsU3RhcnREYXRlKG5ld1N0YXJ0KTtcbiAgICAgICAgc2V0TWFudWFsRW5kRGF0ZShuZXdFbmQpO1xuICAgICAgICBzZXRTZWxlY3RpbmdTdGVwKFwiZG9uZVwiKTtcbiAgICAgICAgc2V0Q3VycmVudE1vbnRoKG5ld0VuZC5nZXRNb250aCgpKTtcbiAgICAgICAgc2V0Q3VycmVudFllYXIobmV3RW5kLmdldEZ1bGxZZWFyKCkpO1xuICAgICAgICBzZXRIb3ZlckRhdGUobnVsbCk7XG4gICAgICAgIHNldElzT3BlbihmYWxzZSk7XG4gICAgICAgIHNldFNob3dNYW51YWxQaWNrZXJQYW5lbChmYWxzZSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbmV3U3RhcnQgPSBkYXRlT2JqO1xuICAgICAgaWYgKGhhc0VuZCAmJiBlbmREYXRlICYmIGlzQmVmb3JlKGVuZERhdGUsIG5ld1N0YXJ0KSkge1xuICAgICAgICBzZXRTdGFydERhdGUobmV3U3RhcnQpO1xuICAgICAgICBzZXRFbmREYXRlKG51bGwpO1xuICAgICAgICBzZXRTZWxlY3RpbmdTdGVwKFwiZW5kXCIpO1xuICAgICAgICBzZXRDdXJyZW50TW9udGgobmV3U3RhcnQuZ2V0TW9udGgoKSk7XG4gICAgICAgIHNldEN1cnJlbnRZZWFyKG5ld1N0YXJ0LmdldEZ1bGxZZWFyKCkpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHNldFN0YXJ0RGF0ZShuZXdTdGFydCk7XG4gICAgICBpZiAoaGFzRW5kICYmIGVuZERhdGUpIHtcbiAgICAgICAgc2V0RW5kRGF0ZShlbmREYXRlKTtcbiAgICAgICAgc2V0TWFudWFsU3RhcnREYXRlKG5ld1N0YXJ0KTtcbiAgICAgICAgc2V0TWFudWFsRW5kRGF0ZShlbmREYXRlKTtcbiAgICAgICAgc2V0U2VsZWN0aW5nU3RlcChcImRvbmVcIik7XG4gICAgICAgIHNldEhvdmVyRGF0ZShudWxsKTtcbiAgICAgICAgc2V0SXNPcGVuKGZhbHNlKTtcbiAgICAgICAgc2V0U2hvd01hbnVhbFBpY2tlclBhbmVsKGZhbHNlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNldEVuZERhdGUobnVsbCk7XG4gICAgICAgIHNldFNlbGVjdGluZ1N0ZXAoXCJlbmRcIik7XG4gICAgICB9XG5cbiAgICAgIHNldEN1cnJlbnRNb250aChuZXdTdGFydC5nZXRNb250aCgpKTtcbiAgICAgIHNldEN1cnJlbnRZZWFyKG5ld1N0YXJ0LmdldEZ1bGxZZWFyKCkpO1xuICAgIH0sXG4gICAgW2VuZERhdGUsIGZyb21EYXRlVmFsdWUsIGlzQmVmb3JlLCBsb2dIaXN0b3J5LCBzZWxlY3RpbmdTdGVwLCBzdGFydERhdGUsIHRvRGF0ZVZhbHVlLCB0b0lTT11cbiAgKTtcblxuICBjb25zdCBoYW5kbGVDbGVhclN0YXRlID0gdXNlQ2FsbGJhY2soXG4gICAgKGV2ZW50OiBSZWFjdE1vdXNlRXZlbnQpID0+IHtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgbG9nSGlzdG9yeShcImNsZWFyUmFuZ2VcIik7XG4gICAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcihudWxsKTtcbiAgICAgIHNldFNob3dNYW51YWxFcnJvcihmYWxzZSk7XG4gICAgICBzZXRTaG93TWFudWFsUGlja2VyUGFuZWwoZmFsc2UpO1xuICAgICAgcmVzZXRIaXN0b3J5RmlsdGVycygpO1xuICAgICAgc2V0SXNPcGVuKGZhbHNlKTtcbiAgICAgIHNldFNob3dGaWx0ZXJzKHRydWUpO1xuICAgIH0sXG4gICAgW2xvZ0hpc3RvcnksIHJlc2V0SGlzdG9yeUZpbHRlcnNdXG4gICk7XG5cbiAgY29uc3Qgb3BlblBvcG92ZXIgPSB1c2VDYWxsYmFjayhcbiAgICAoc2VjdGlvbjogXCJzdGFydFwiIHwgXCJlbmRcIikgPT4ge1xuICAgICAgbG9nSGlzdG9yeShcIm9wZW5Qb3BvdmVyXCIsIHsgc2VjdGlvbiwgc3RhcnQ6IGZyb21EYXRlVmFsdWUsIGVuZDogdG9EYXRlVmFsdWUsIHNlbGVjdGluZ1N0ZXAgfSk7XG4gICAgICBzZXRTaG93TWFudWFsRXJyb3IoZmFsc2UpO1xuICAgICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIoXCJjdXN0b21cIik7XG4gICAgICBzZXRTaG93TWFudWFsUGlja2VyUGFuZWwodHJ1ZSk7XG5cbiAgICAgIGlmIChzZWN0aW9uID09PSBcImVuZFwiICYmICFzdGFydERhdGUpIHtcbiAgICAgICAgc2V0U2VsZWN0aW5nU3RlcChcInN0YXJ0XCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2V0U2VsZWN0aW5nU3RlcChzZWN0aW9uKTtcbiAgICAgIH1cblxuICAgICAgc2V0SXNPcGVuKHRydWUpO1xuICAgIH0sXG4gICAgW2Zyb21EYXRlVmFsdWUsIGxvZ0hpc3RvcnksIHNlbGVjdGluZ1N0ZXAsIHN0YXJ0RGF0ZSwgdG9EYXRlVmFsdWVdXG4gICk7XG5cbiAgY29uc3QgaGFuZGxlQWN0aXZhdG9yS2V5RG93biA9IHVzZUNhbGxiYWNrKFxuICAgIChldmVudDogUmVhY3QuS2V5Ym9hcmRFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHtcbiAgICAgIGlmIChldmVudC5rZXkgIT09IFwiRW50ZXJcIiAmJiBldmVudC5rZXkgIT09IFwiIFwiKSByZXR1cm47XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgb3BlblBvcG92ZXIoXCJzdGFydFwiKTtcbiAgICB9LFxuICAgIFtvcGVuUG9wb3Zlcl1cbiAgKTtcblxuICBjb25zdCBoYW5kbGVTZWN0aW9uS2V5RG93biA9IHVzZUNhbGxiYWNrKFxuICAgIChldmVudDogUmVhY3QuS2V5Ym9hcmRFdmVudDxIVE1MRGl2RWxlbWVudD4sIHNlY3Rpb246IFwic3RhcnRcIiB8IFwiZW5kXCIpID0+IHtcbiAgICAgIGlmIChldmVudC5rZXkgIT09IFwiRW50ZXJcIiAmJiBldmVudC5rZXkgIT09IFwiIFwiKSByZXR1cm47XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBvcGVuUG9wb3ZlcihzZWN0aW9uKTtcbiAgICB9LFxuICAgIFtvcGVuUG9wb3Zlcl1cbiAgKTtcblxuICBjb25zdCBhcHBseVF1aWNrUmFuZ2UgPSB1c2VDYWxsYmFjayhcbiAgICAoZmlsdGVySWQ6IFF1aWNrRmlsdGVySWQsIHN0YXJ0OiBEYXRlLCBlbmQ6IERhdGUpID0+IHtcbiAgICAgIGNvbnN0IHN0YXJ0RGF5ID0gc3RhcnRPZkRheShzdGFydCk7XG4gICAgICBjb25zdCBlbmREYXkgPSBzdGFydE9mRGF5KGVuZCk7XG4gICAgICBzZXRTdGFydERhdGUoc3RhcnREYXkpO1xuICAgICAgc2V0RW5kRGF0ZShlbmREYXkpO1xuICAgICAgc2V0U2VsZWN0aW5nU3RlcChcImRvbmVcIik7XG4gICAgICBzZXRIb3ZlckRhdGUobnVsbCk7XG4gICAgICBzZXRDdXJyZW50TW9udGgoc3RhcnREYXkuZ2V0TW9udGgoKSk7XG4gICAgICBzZXRDdXJyZW50WWVhcihzdGFydERheS5nZXRGdWxsWWVhcigpKTtcbiAgICAgIHNldElzT3BlbihmYWxzZSk7XG4gICAgICBzZXRTaG93TWFudWFsUGlja2VyUGFuZWwoZmFsc2UpO1xuICAgICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIoZmlsdGVySWQpO1xuICAgICAgc2V0U2hvd01hbnVhbEVycm9yKGZhbHNlKTtcbiAgICB9LFxuICAgIFtzdGFydE9mRGF5XVxuICApO1xuXG4gIGNvbnN0IGhhbmRsZVF1aWNrRmlsdGVyID0gdXNlQ2FsbGJhY2soXG4gICAgKGZpbHRlcklkOiBRdWlja0ZpbHRlcklkKSA9PiB7XG4gICAgICBjb25zdCB0b2RheSA9IHN0YXJ0T2ZEYXkobmV3IERhdGUoKSk7XG5cbiAgICAgIGlmIChmaWx0ZXJJZCA9PT0gXCJjdXN0b21cIikge1xuICAgICAgICAvLyBUb2dnbGUgbWFudWFsIHBhbmVsIG9uIGV2ZXJ5IERhdGUgYnV0dG9uIGNsaWNrLlxuICAgICAgICBpZiAoc2hvd01hbnVhbFBpY2tlclBhbmVsKSB7XG4gICAgICAgICAgc2V0U2hvd01hbnVhbEVycm9yKGZhbHNlKTtcbiAgICAgICAgICBzZXRIb3ZlckRhdGUobnVsbCk7XG4gICAgICAgICAgc2V0U2VsZWN0aW5nU3RlcChzdGFydERhdGUgJiYgZW5kRGF0ZSA/IFwiZG9uZVwiIDogc3RhcnREYXRlID8gXCJlbmRcIiA6IFwic3RhcnRcIik7XG4gICAgICAgICAgc2V0SXNPcGVuKGZhbHNlKTtcbiAgICAgICAgICBzZXRTaG93TWFudWFsUGlja2VyUGFuZWwoZmFsc2UpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG5leHRTdGFydCA9IG1hbnVhbFN0YXJ0RGF0ZSA/IG5ldyBEYXRlKG1hbnVhbFN0YXJ0RGF0ZSkgOiBzdGFydERhdGUgPyBuZXcgRGF0ZShzdGFydERhdGUpIDogbnVsbDtcbiAgICAgICAgY29uc3QgbmV4dEVuZCA9IG1hbnVhbEVuZERhdGUgPyBuZXcgRGF0ZShtYW51YWxFbmREYXRlKSA6IGVuZERhdGUgPyBuZXcgRGF0ZShlbmREYXRlKSA6IG51bGw7XG4gICAgICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKFwiY3VzdG9tXCIpO1xuICAgICAgICBzZXRTaG93TWFudWFsUGlja2VyUGFuZWwodHJ1ZSk7XG4gICAgICAgIHNldFN0YXJ0RGF0ZShuZXh0U3RhcnQpO1xuICAgICAgICBzZXRFbmREYXRlKG5leHRFbmQpO1xuXG4gICAgICAgIGlmIChuZXh0U3RhcnQpIHtcbiAgICAgICAgICBzZXRDdXJyZW50TW9udGgobmV4dFN0YXJ0LmdldE1vbnRoKCkpO1xuICAgICAgICAgIHNldEN1cnJlbnRZZWFyKG5leHRTdGFydC5nZXRGdWxsWWVhcigpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFsd2F5cyByZW9wZW4gdGhlIG1hbnVhbCBjYWxlbmRhciB3aGVuIHRoZSBjdXN0b20gZGF0ZSBxdWljayBmaWx0ZXIgaXMgcHJlc3NlZC5cbiAgICAgICAgc2V0U2VsZWN0aW5nU3RlcChuZXh0U3RhcnQgJiYgIW5leHRFbmQgPyBcImVuZFwiIDogXCJzdGFydFwiKTtcbiAgICAgICAgc2V0SXNPcGVuKHRydWUpO1xuICAgICAgICBzZXRIb3ZlckRhdGUobnVsbCk7XG4gICAgICAgIHNldFNob3dNYW51YWxFcnJvcihmYWxzZSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKGZpbHRlcklkID09PSBcImRheXMtN1wiKSB7XG4gICAgICAgIGNvbnN0IHN0YXJ0ID0gbmV3IERhdGUodG9kYXkpO1xuICAgICAgICBzdGFydC5zZXREYXRlKHRvZGF5LmdldERhdGUoKSAtIDYpO1xuICAgICAgICBhcHBseVF1aWNrUmFuZ2UoZmlsdGVySWQsIHN0YXJ0LCB0b2RheSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKGZpbHRlcklkID09PSBcImRheXMtMzBcIikge1xuICAgICAgICBjb25zdCBzdGFydCA9IG5ldyBEYXRlKHRvZGF5KTtcbiAgICAgICAgc3RhcnQuc2V0RGF0ZSh0b2RheS5nZXREYXRlKCkgLSAyOSk7XG4gICAgICAgIGFwcGx5UXVpY2tSYW5nZShmaWx0ZXJJZCwgc3RhcnQsIHRvZGF5KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoZmlsdGVySWQgPT09IFwiZGF5cy05MFwiKSB7XG4gICAgICAgIGNvbnN0IHN0YXJ0ID0gbmV3IERhdGUodG9kYXkpO1xuICAgICAgICBzdGFydC5zZXREYXRlKHRvZGF5LmdldERhdGUoKSAtIDg5KTtcbiAgICAgICAgYXBwbHlRdWlja1JhbmdlKGZpbHRlcklkLCBzdGFydCwgdG9kYXkpO1xuICAgICAgfVxuICAgIH0sXG4gICAgW2FwcGx5UXVpY2tSYW5nZSwgZW5kRGF0ZSwgbWFudWFsRW5kRGF0ZSwgbWFudWFsU3RhcnREYXRlLCBzaG93TWFudWFsUGlja2VyUGFuZWwsIHN0YXJ0RGF0ZSwgc3RhcnRPZkRheV1cbiAgKTtcblxuICBjb25zdCBoYW5kbGVDbGllbnRTZWxlY3RlZCA9IHVzZUNhbGxiYWNrKChjbGllbnQ6IENsaWVudE9wdGlvbiB8IG51bGwpID0+IHtcbiAgICBzZXRTZWxlY3RlZENsaWVudChjbGllbnQpO1xuICB9LCBbXSk7XG5cbiAgcmV0dXJuIHtcbiAgICBzdGFydERhdGUsXG4gICAgZW5kRGF0ZSxcbiAgICBtYW51YWxTdGFydERhdGUsXG4gICAgbWFudWFsRW5kRGF0ZSxcbiAgICBob3ZlckRhdGUsXG4gICAgc2VsZWN0aW5nU3RlcCxcbiAgICBjdXJyZW50TW9udGgsXG4gICAgY3VycmVudFllYXIsXG4gICAgaXNPcGVuLFxuICAgIHNob3dNYW51YWxQaWNrZXJQYW5lbCxcbiAgICBhY3RpdmVRdWlja0ZpbHRlcixcbiAgICBzZWxlY3RlZENsaWVudCxcbiAgICBjbGllbnRSZXNldEtleSxcbiAgICBzaG93RmlsdGVycyxcbiAgICBzaG93TWFudWFsRXJyb3IsXG4gICAgZnJvbURhdGVWYWx1ZSxcbiAgICB0b0RhdGVWYWx1ZSxcbiAgICBhY2NvdW50TnVtVmFsdWUsXG4gICAgaGFzUmVzdG9yZWRGaWx0ZXJSZWYsXG4gICAgZGlkSW5pdEZpbHRlclJlZixcbiAgICBzZXRTdGFydERhdGUsXG4gICAgc2V0RW5kRGF0ZSxcbiAgICBzZXRNYW51YWxTdGFydERhdGUsXG4gICAgc2V0TWFudWFsRW5kRGF0ZSxcbiAgICBzZXRIb3ZlckRhdGUsXG4gICAgc2V0U2VsZWN0aW5nU3RlcCxcbiAgICBzZXRDdXJyZW50TW9udGgsXG4gICAgc2V0Q3VycmVudFllYXIsXG4gICAgc2V0SXNPcGVuLFxuICAgIHNldFNob3dNYW51YWxQaWNrZXJQYW5lbCxcbiAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcixcbiAgICBzZXRTZWxlY3RlZENsaWVudCxcbiAgICBzZXRDbGllbnRSZXNldEtleSxcbiAgICBzZXRTaG93RmlsdGVycyxcbiAgICBzZXRTaG93TWFudWFsRXJyb3IsXG4gICAgdmFsaWRhdGVNYW51YWxSYW5nZSxcbiAgICBhcHBseURlZmF1bHRSYW5nZUZyb21Qcm9wcyxcbiAgICByZXNldEhpc3RvcnlGaWx0ZXJzLFxuICAgIGFwcGx5Q2FjaGVkRmlsdGVyLFxuICAgIGhhbmRsZVNlbGVjdCxcbiAgICBoYW5kbGVDbGVhclN0YXRlLFxuICAgIG9wZW5Qb3BvdmVyLFxuICAgIGhhbmRsZUFjdGl2YXRvcktleURvd24sXG4gICAgaGFuZGxlU2VjdGlvbktleURvd24sXG4gICAgaGFuZGxlUXVpY2tGaWx0ZXIsXG4gICAgaGFuZGxlQ2xpZW50U2VsZWN0ZWQsXG4gIH07XG59O1xyXG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUFBLGdCQUF5RTs7O0FDQXpFLG1CQUEyQztBQWdJdkM7QUFuR0osSUFBTSxjQUFjO0FBQ3BCLElBQU0scUJBQXFCO0FBWTNCLElBQU0sZUFBZSxDQUFDLEVBQUUsT0FBTyxZQUFZLGNBQWMsV0FBVyxNQUFhO0FBQy9FLFFBQU0sbUJBQWUscUJBQThCLElBQUk7QUFDdkQsUUFBTSxrQkFBYyxxQkFBc0I7QUFBQSxJQUN4QyxRQUFRO0FBQUEsSUFDUixXQUFXO0FBQUEsSUFDWCxRQUFRO0FBQUEsSUFDUixRQUFRO0FBQUEsSUFDUixXQUFXO0FBQUEsSUFDWCxPQUFPO0FBQUEsSUFDUCxRQUFRO0FBQUEsRUFDVixDQUFDO0FBRUQsUUFBTSwyQkFBdUIsMEJBQVksQ0FBQyxXQUErQjtBQUN2RSxVQUFNLE9BQU87QUFDYixRQUFJLENBQUMsUUFBUSxPQUFPLEtBQUssWUFBWSxXQUFZ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SSxHQUNoRjtBQUFBLFVBQ0MsS0FBSyxtQkFBbUIsU0FBUztBQUFBO0FBQUE7QUFBQSxJQUNwQztBQUFBLElBRUMsZUFDQyw4RUFDRTtBQUFBO0FBQUEsUUFBQztBQUFBO0FBQUEsVUFDQyxPQUFPO0FBQUEsVUFDUCxZQUFZLEtBQUsseUJBQXlCLHlCQUF5QjtBQUFBLFVBQ25FO0FBQUEsVUFDQSxZQUFZO0FBQUE7QUFBQSxNQUNkO0FBQUEsTUFFQTtBQUFBLFFBQUM7QUFBQTtBQUFBLFVBQ0MsS0FBSztBQUFBLFVBQ0w7QUFBQSxVQUNBO0FBQUEsVUFDQSxZQUFZO0FBQUEsVUFDWixjQUFjLENBQUMsU0FBUyxlQUFlLElBQUk7QUFBQSxVQUMzQyxRQUFRO0FBQUE7QUFBQSxNQUNWO0FBQUEsT0FDRjtBQUFBLElBRUQsa0JBQ0M7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLE9BQU07QUFBQSxRQUNOLFdBQVcsS0FBSyxpQkFBaUIsUUFBUTtBQUFBLFFBQ3pDLE1BQU07QUFBQSxRQUNOLE9BQU87QUFBQSxRQUNQLFFBQVE7QUFBQTtBQUFBLElBQ1Y7QUFBQSxLQUVKO0FBRUo7QUFHTyxJQUFNLG1CQUFtQixDQUFDLFNBQXNCO0FBQ3JELFFBQU0sa0JBQWtCLEtBQUssYUFBYSxtQkFBbUIsS0FBSztBQUNsRSxRQUFNLGdCQUFnQixLQUFLLGFBQWEsaUJBQWlCLEtBQUs7QUFFOUQsbUJBQWlCLE1BQU0sNkNBQUMsZUFBWSxpQkFBa0MsZUFBOEIsQ0FBRTtBQUN4RztBQUVBLElBQU0sUUFBUSxNQUFNO0FBQ2xCLFFBQU0sU0FBUyxTQUFTLGVBQWUsc0JBQXNCO0FBQzdELE1BQUksQ0FBQyxPQUFRO0FBQ2IsbUJBQWlCLE1BQU07QUFDekI7QUFFQSx1QkFBdUIsS0FBSztBQUU1QixJQUFPLHNCQUFROyIsCiAgIm5hbWVzIjogWyJpbXBvcnRfcmVhY3QiLCAiUmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImxvZ0hpc3RvcnkiLCAiaW1wb3J0X3JlYWN0IiwgImxvZ0hpc3RvcnkiLCAidG9UaXRsZUNhc2UiLCAiZm9ybWF0RGF0ZVBhcnRzIiwgImltcG9ydF9yZWFjdCIsICJub3JtYWxpemVSYW5nZSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImxvZ0hpc3RvcnkiLCAicGFyc2VEYXRlVmFsdWUiLCAicGFyc2VJU08iLCAidG9JU08iLCAic3RhcnRPZkRheSIsICJpc0JlZm9yZSIsICJuZXdTdGFydCIsICJpbXBvcnRfanN4X3J1bnRpbWUiXQp9Cg==
