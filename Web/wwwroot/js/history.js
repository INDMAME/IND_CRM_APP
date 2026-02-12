import {
  ClientSearchCombobox_default
} from "./chunks/chunk-NVVYYUMR.js";
import {
  ActionButton_default,
  FilterButton_default,
  HistoryManualDatePicker_default,
  HistorySummary_default
} from "./chunks/chunk-BPJ5F64S.js";
import {
  CompactPagination_default,
  useTimelineCardEffects
} from "./chunks/chunk-TJCFPVBB.js";
import "./chunks/chunk-6HMZLOGF.js";
import {
  HISTORY_FILTER_KEY,
  HISTORY_RETURN_FLAG_KEY
} from "./chunks/chunk-K7MECJ5E.js";
import {
  FloatingActionButton_default
} from "./chunks/chunk-3H4F5G6V.js";
import {
  ApiFetchError,
  canAccess,
  classNames,
  fetchJson,
  indT,
  showPermissionModal
} from "./chunks/chunk-FICWEV5U.js";
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
          setIsOpen(false);
          setShowManualPickerPanel(false);
          return;
        }
        const nextStart = manualStartDate ? new Date(manualStartDate) : null;
        const nextEnd = manualEndDate ? new Date(manualEndDate) : null;
        setActiveQuickFilter("custom");
        setShowManualPickerPanel(true);
        setStartDate(nextStart);
        setEndDate(nextEnd);
        if (nextStart) {
          setCurrentMonth(nextStart.getMonth());
          setCurrentYear(nextStart.getFullYear());
        }
        if (nextStart && nextEnd) {
          setSelectingStep("done");
          setIsOpen(false);
        } else {
          setSelectingStep(nextStart && !nextEnd ? "end" : "start");
          setIsOpen(true);
        }
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
    [applyQuickRange, manualEndDate, manualStartDate, showManualPickerPanel, startOfDay2]
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
  const manualRangeReady = !!manualStartDate && !!manualEndDate;
  const showInlineSummary = !!startDate && !!endDate && !isOpen && (activeQuickFilter !== "custom" || manualRangeReady);
  const showManualPicker = activeQuickFilter === "custom" && showManualPickerPanel;
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvaGlzdG9yaWFsL0hpc3RvcnlQYWdlLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9oaXN0b3JpYWwvSGlzdG9yeVRhYmxlLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9oaXN0b3JpYWwvdXNlSGlzdG9yeVBhZ2VMaXN0ZW5lcnMudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvaGlzdG9yaWFsL3VzZUhpc3RvcnlUaW1lbGluZUl0ZW1zLnRzIiwgIi4uL3JlYWN0L3NyYy9ob29rcy91c2VIaXN0b3J5QWN0aXZpdGllcy50cyIsICIuLi9yZWFjdC9zcmMvaG9va3MvdXNlSGlzdG9yeUZpbHRlckNhY2hlLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy92aXNpdGFzL2hpc3RvcmlhbC91c2VIaXN0b3J5RmlsdGVyc1N0YXRlLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgY2xhc3NOYW1lcyB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9jbGFzc05hbWVzLnRzXCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB7IGNhbkFjY2Vzcywgc2hvd1Blcm1pc3Npb25Nb2RhbCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9wZXJtaXNzaW9ucy50c1wiO1xuaW1wb3J0IENsaWVudFNlYXJjaENvbWJvYm94IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL3Zpc2l0YXMvQ2xpZW50U2VhcmNoQ29tYm9ib3gudHN4XCI7XG5pbXBvcnQgSGlzdG9yeVRhYmxlIGZyb20gXCIuL0hpc3RvcnlUYWJsZS50c3hcIjtcbmltcG9ydCBIaXN0b3J5U3VtbWFyeSBmcm9tIFwiLi9IaXN0b3J5U3VtbWFyeS50c3hcIjtcbmltcG9ydCBIaXN0b3J5TWFudWFsRGF0ZVBpY2tlciwgeyBIaXN0b3J5TWFudWFsRGF5Q2VsbCB9IGZyb20gXCIuL0hpc3RvcnlNYW51YWxEYXRlUGlja2VyLnRzeFwiO1xuaW1wb3J0IHsgdXNlSGlzdG9yeVBhZ2VMaXN0ZW5lcnMgfSBmcm9tIFwiLi91c2VIaXN0b3J5UGFnZUxpc3RlbmVycy50c1wiO1xuaW1wb3J0IHsgdXNlSGlzdG9yeVRpbWVsaW5lSXRlbXMgfSBmcm9tIFwiLi91c2VIaXN0b3J5VGltZWxpbmVJdGVtcy50c1wiO1xuaW1wb3J0IEZsb2F0aW5nQWN0aW9uQnV0dG9uIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvRmxvYXRpbmdBY3Rpb25CdXR0b24udHN4XCI7XG5pbXBvcnQgQ29tcGFjdFBhZ2luYXRpb24gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9Db21wYWN0UGFnaW5hdGlvbi50c3hcIjtcbmltcG9ydCBGaWx0ZXJCdXR0b24gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9GaWx0ZXJCdXR0b24udHN4XCI7XG5pbXBvcnQgQWN0aW9uQnV0dG9uIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvQWN0aW9uQnV0dG9uLnRzeFwiO1xuaW1wb3J0IHsgdXNlSGlzdG9yeUFjdGl2aXRpZXMgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlSGlzdG9yeUFjdGl2aXRpZXMudHNcIjtcbmltcG9ydCB7IHVzZUhpc3RvcnlGaWx0ZXJDYWNoZSB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VIaXN0b3J5RmlsdGVyQ2FjaGUudHNcIjtcbmltcG9ydCB7IHVzZUhpc3RvcnlGaWx0ZXJzU3RhdGUgfSBmcm9tIFwiLi91c2VIaXN0b3J5RmlsdGVyc1N0YXRlLnRzXCI7XG5pbXBvcnQgeyBtb3VudFJlYWN0SXNsYW5kLCBtb3VudFdoZW5Eb2N1bWVudFJlYWR5IH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3JlYWN0SXNsYW5kLnRzeFwiO1xuXHJcbnR5cGUgUHJvcHMgPSB7XHJcbiAgZGVmYXVsdEZyb21EYXRlPzogc3RyaW5nO1xyXG4gIGRlZmF1bHRUb0RhdGU/OiBzdHJpbmc7XHJcbn07XHJcblxyXG50eXBlIENhbGVuZGFyQ2VsbCA9IHtcbiAgZGF0ZTogRGF0ZSB8IG51bGw7XG4gIGlzbzogc3RyaW5nO1xuICBpc0VtcHR5OiBib29sZWFuO1xyXG59O1xyXG5cclxuY29uc3QgUEFHRV9TSVpFID0gNjtcbmNvbnN0IFBBR0VfV0lORE9XID0gNjtcbmNvbnN0IE5BVl9ERUxBWV9NUyA9IDMyMDtcbmNvbnN0IEZBQl9CQVNFX0JPVFRPTSA9IDMyO1xuY29uc3QgRkFCX0NMRUFSQU5DRSA9IDI0O1xuY29uc3QgRkFCX0dBUCA9IDEyO1xuXHJcbmNvbnN0IG5vcm1hbGl6ZVVpTG9jYWxlID0gKGxvY2FsZTogc3RyaW5nKSA9PiB7XHJcbiAgY29uc3QgdmFsdWUgPSBTdHJpbmcobG9jYWxlIHx8IFwiXCIpLnRyaW0oKTtcclxuICBpZiAoIXZhbHVlKSByZXR1cm4gXCJlcy1FU1wiO1xyXG4gIGlmICgvXnpoLWhhbnMvaS50ZXN0KHZhbHVlKSkgcmV0dXJuIFwiemgtQ05cIjtcclxuICByZXR1cm4gdmFsdWU7XHJcbn07XHJcblxyXG5jb25zdCBpc0Jhc3F1ZUxvY2FsZSA9IChsb2NhbGU6IHN0cmluZykgPT4gL15ldVxcYi9pLnRlc3QoU3RyaW5nKGxvY2FsZSB8fCBcIlwiKSk7XHJcblxyXG5jb25zdCBCQVNRVUVfTU9OVEhTID0gW1xyXG4gIFwidXJ0YXJyaWxhXCIsXHJcbiAgXCJvdHNhaWxhXCIsXHJcbiAgXCJtYXJ0eG9hXCIsXHJcbiAgXCJhcGlyaWxhXCIsXHJcbiAgXCJtYWlhdHphXCIsXHJcbiAgXCJla2FpbmFcIixcclxuICBcInV6dGFpbGFcIixcclxuICBcImFidXp0dWFcIixcclxuICBcImlyYWlsYVwiLFxyXG4gIFwidXJyaWFcIixcclxuICBcImF6YXJvYVwiLFxyXG4gIFwiYWJlbmR1YVwiLFxyXG5dO1xyXG5cclxuY29uc3QgQkFTUVVFX01PTlRIU19TSE9SVCA9IFtcclxuICBcInVydFwiLFxyXG4gIFwib3RzXCIsXHJcbiAgXCJtYXJcIixcclxuICBcImFwaVwiLFxyXG4gIFwibWFpXCIsXHJcbiAgXCJla2FcIixcclxuICBcInV6dFwiLFxyXG4gIFwiYWJ1XCIsXHJcbiAgXCJpcmFcIixcclxuICBcInVyclwiLFxyXG4gIFwiYXphXCIsXHJcbiAgXCJhYmVcIixcclxuXTtcclxuXHJcbmNvbnN0IGdldFVpTG9jYWxlID0gKCkgPT4ge1xyXG4gIGNvbnN0IGZyb21IdG1sID0gdHlwZW9mIGRvY3VtZW50ICE9PSBcInVuZGVmaW5lZFwiID8gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmxhbmcgOiBcIlwiO1xyXG4gIGlmIChmcm9tSHRtbCAmJiBTdHJpbmcoZnJvbUh0bWwpLnRyaW0oKSkgcmV0dXJuIG5vcm1hbGl6ZVVpTG9jYWxlKGZyb21IdG1sKTtcclxuICByZXR1cm4gXCJlcy1FU1wiO1xyXG59O1xyXG5cclxuY29uc3QgcGFkID0gKG46IG51bWJlcikgPT4gbi50b1N0cmluZygpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcclxuXHJcbmNvbnN0IHRvSVNPID0gKGQ6IERhdGUpID0+IGAke2QuZ2V0RnVsbFllYXIoKX0tJHtwYWQoZC5nZXRNb250aCgpICsgMSl9LSR7cGFkKGQuZ2V0RGF0ZSgpKX1gO1xyXG5cclxuY29uc3Qgc3RhcnRPZkRheSA9IChkOiBEYXRlKSA9PiBuZXcgRGF0ZShkLmdldEZ1bGxZZWFyKCksIGQuZ2V0TW9udGgoKSwgZC5nZXREYXRlKCkpO1xyXG5cclxuY29uc3QgcGFyc2VJU08gPSAoczogc3RyaW5nKSA9PiB7XHJcbiAgaWYgKCFzKSByZXR1cm4gbnVsbDtcclxuICBjb25zdCBwYXJ0cyA9IHMuc3BsaXQoXCItXCIpLm1hcChOdW1iZXIpO1xyXG4gIGlmIChwYXJ0cy5sZW5ndGggIT09IDMpIHJldHVybiBudWxsO1xyXG4gIHJldHVybiBuZXcgRGF0ZShwYXJ0c1swXSwgcGFydHNbMV0gLSAxLCBwYXJ0c1syXSk7XHJcbn07XHJcblxyXG5jb25zdCBzYW1lRGF5ID0gKGE6IERhdGUgfCBudWxsLCBiOiBEYXRlIHwgbnVsbCkgPT4gISEoYSAmJiBiICYmIGEuZ2V0VGltZSgpID09PSBiLmdldFRpbWUoKSk7XHJcblxyXG5jb25zdCBpc0JlZm9yZSA9IChhOiBEYXRlIHwgbnVsbCwgYjogRGF0ZSB8IG51bGwpID0+ICEhKGEgJiYgYiAmJiBhLmdldFRpbWUoKSA8IGIuZ2V0VGltZSgpKTtcclxuXHJcbiAgY29uc3Qgbm9ybWFsaXplUmFuZ2UgPSAoZnJvbTogc3RyaW5nLCB0bzogc3RyaW5nKSA9PiB7XHJcbiAgICBpZiAoIWZyb20gfHwgIXRvKSByZXR1cm4geyBmcm9tLCB0byB9O1xyXG4gICAgY29uc3QgZnJvbURhdGUgPSBwYXJzZUlTTyhmcm9tKTtcclxuICAgIGNvbnN0IHRvRGF0ZSA9IHBhcnNlSVNPKHRvKTtcclxuICAgIGlmICghZnJvbURhdGUgfHwgIXRvRGF0ZSkgcmV0dXJuIHsgZnJvbSwgdG8gfTtcclxuICBpZiAoaXNCZWZvcmUodG9EYXRlLCBmcm9tRGF0ZSkpIHtcclxuICAgIHJldHVybiB7IGZyb206IHRvSVNPKHRvRGF0ZSksIHRvOiB0b0lTTyhmcm9tRGF0ZSkgfTtcclxuICB9XHJcbiAgcmV0dXJuIHsgZnJvbTogdG9JU08oZnJvbURhdGUpLCB0bzogdG9JU08odG9EYXRlKSB9O1xyXG59O1xyXG5cclxuICBjb25zdCBmb3JtYXREaXNwbGF5ID0gKGQ6IERhdGUsIGxvY2FsZTogc3RyaW5nKSA9PiB7XHJcbiAgaWYgKGlzQmFzcXVlTG9jYWxlKGxvY2FsZSkpIHtcclxuICAgIGNvbnN0IG1vbnRoID0gQkFTUVVFX01PTlRIU19TSE9SVFtkLmdldE1vbnRoKCldO1xyXG4gICAgcmV0dXJuIGAke2QuZ2V0RGF0ZSgpfSAke21vbnRofSAke2QuZ2V0RnVsbFllYXIoKX1gLnRvTG93ZXJDYXNlKCk7XHJcbiAgfVxyXG4gIHJldHVybiBkXHJcbiAgICAudG9Mb2NhbGVEYXRlU3RyaW5nKGxvY2FsZSwge1xyXG4gICAgICBkYXk6IFwibnVtZXJpY1wiLFxyXG4gICAgICBtb250aDogXCJzaG9ydFwiLFxyXG4gICAgICB5ZWFyOiBcIm51bWVyaWNcIixcclxuICAgIH0pXHJcbiAgICAucmVwbGFjZSgvXFwuL2csIFwiXCIpXHJcbiAgICAudG9Mb3dlckNhc2UoKTtcclxufTtcclxuXHJcbmNvbnN0IGZvcm1hdE1vbnRoTGFiZWwgPSAoZDogRGF0ZSwgbG9jYWxlOiBzdHJpbmcpID0+IHtcclxuICBpZiAoL156aC9pLnRlc3QobG9jYWxlKSkge1xyXG4gICAgcmV0dXJuIG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KGxvY2FsZSwgeyB5ZWFyOiBcIm51bWVyaWNcIiwgbW9udGg6IFwibG9uZ1wiIH0pLmZvcm1hdChkKTtcclxuICB9XHJcbiAgaWYgKGlzQmFzcXVlTG9jYWxlKGxvY2FsZSkpIHtcclxuICAgIHJldHVybiBgJHtCQVNRVUVfTU9OVEhTW2QuZ2V0TW9udGgoKV19ICR7ZC5nZXRGdWxsWWVhcigpfWA7XHJcbiAgfVxyXG4gIGNvbnN0IG1vbnRoTmFtZSA9IGQudG9Mb2NhbGVEYXRlU3RyaW5nKGxvY2FsZSwgeyBtb250aDogXCJsb25nXCIgfSk7XHJcbiAgY29uc3QgY2FwTW9udGhOYW1lID0gbW9udGhOYW1lICYmIC9bQS1aYS16XS8udGVzdChtb250aE5hbWVbMF0pXHJcbiAgICA/IG1vbnRoTmFtZVswXS50b0xvY2FsZVVwcGVyQ2FzZShsb2NhbGUpICsgbW9udGhOYW1lLnNsaWNlKDEpXHJcbiAgICA6IG1vbnRoTmFtZTtcclxuICByZXR1cm4gYCR7Y2FwTW9udGhOYW1lfSAke2QuZ2V0RnVsbFllYXIoKX1gO1xyXG59O1xyXG5cclxuY29uc3QgcGFyc2VEYXRlVmFsdWUgPSAodmFsdWU6IHN0cmluZykgPT4ge1xyXG4gIGlmICghdmFsdWUpIHJldHVybiBudWxsO1xyXG4gIGNvbnN0IHJhdyA9IFN0cmluZyh2YWx1ZSkudHJpbSgpO1xyXG4gIGlmICghcmF3KSByZXR1cm4gbnVsbDtcclxuXHJcbiAgY29uc3QgZGF0ZVBhcnQgPSByYXcuc3BsaXQoXCJUXCIpWzBdLnNwbGl0KFwiIFwiKVswXTtcclxuXHJcbiAgaWYgKC9eXFxkezR9LVxcZHsyfS1cXGR7Mn0kLy50ZXN0KGRhdGVQYXJ0KSkge1xyXG4gICAgY29uc3QgW3ksIG0sIGRdID0gZGF0ZVBhcnQuc3BsaXQoXCItXCIpLm1hcChOdW1iZXIpO1xyXG4gICAgcmV0dXJuIG5ldyBEYXRlKHksIG0gLSAxLCBkKTtcclxuICB9XHJcblxyXG4gIGlmICgvXlxcZHsyfVsuLy1dXFxkezJ9Wy4vLV1cXGR7NH0kLy50ZXN0KGRhdGVQYXJ0KSkge1xyXG4gICAgY29uc3QgcGFydHMgPSBkYXRlUGFydC5zcGxpdCgvWy4vLV0vKS5tYXAoTnVtYmVyKTtcclxuICAgIGNvbnN0IFtkLCBtLCB5XSA9IHBhcnRzO1xyXG4gICAgcmV0dXJuIG5ldyBEYXRlKHksIG0gLSAxLCBkKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHBhcnNlZCA9IG5ldyBEYXRlKHJhdyk7XHJcbiAgcmV0dXJuIE51bWJlci5pc05hTihwYXJzZWQuZ2V0VGltZSgpKSA/IG51bGwgOiBwYXJzZWQ7XHJcbn07XHJcblxyXG5jb25zdCBmb3JtYXREYXRlUGFydHMgPSAodmFsdWU6IHN0cmluZywgbG9jYWxlOiBzdHJpbmcpID0+IHtcclxuICBpZiAoIXZhbHVlKSByZXR1cm4geyB5ZWFyOiBcIlwiLCBtb250aDogXCJcIiwgZGF5OiBcIlwiIH07XHJcbiAgY29uc3QgZCA9IHBhcnNlRGF0ZVZhbHVlKHZhbHVlKTtcclxuICBpZiAoIWQpIHJldHVybiB7IHllYXI6IFwiXCIsIG1vbnRoOiBcIlwiLCBkYXk6IFwiXCIgfTtcclxuICBsZXQgbW9udGggPSBcIlwiO1xyXG4gIGlmIChpc0Jhc3F1ZUxvY2FsZShsb2NhbGUpKSB7XHJcbiAgICBtb250aCA9IEJBU1FVRV9NT05USFNfU0hPUlRbZC5nZXRNb250aCgpXSB8fCBcIlwiO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBtb250aCA9IGQudG9Mb2NhbGVEYXRlU3RyaW5nKGxvY2FsZSwgeyBtb250aDogXCJzaG9ydFwiIH0pLnJlcGxhY2UoL1xcLi9nLCBcIlwiKTtcclxuICB9XHJcbiAgcmV0dXJuIHtcclxuICAgIHllYXI6IFN0cmluZyhkLmdldEZ1bGxZZWFyKCkpLFxyXG4gICAgbW9udGg6IG1vbnRoLnRvVXBwZXJDYXNlKCksXHJcbiAgICBkYXk6IFN0cmluZyhkLmdldERhdGUoKSkucGFkU3RhcnQoMiwgXCIwXCIpLFxyXG4gIH07XHJcbn07XHJcblxyXG5jb25zdCB0b1RpdGxlQ2FzZSA9ICh2YWx1ZTogc3RyaW5nLCBsb2NhbGU6IHN0cmluZykgPT4ge1xyXG4gIGlmICghdmFsdWUpIHJldHVybiBcIlwiO1xyXG4gIGNvbnN0IGxvd2VyID0gdmFsdWUudG9Mb2NhbGVMb3dlckNhc2UobG9jYWxlKTtcclxuICB0cnkge1xyXG4gICAgcmV0dXJuIGxvd2VyLnJlcGxhY2UoLyhefFteXFxwe0x9XSkoXFxwe0x9KS9ndSwgKF9tYXRjaCwgcHJlZml4LCBjaCkgPT4gYCR7cHJlZml4fSR7Y2gudG9Mb2NhbGVVcHBlckNhc2UobG9jYWxlKX1gKTtcclxuICB9IGNhdGNoIHtcclxuICAgIHJldHVybiBsb3dlci5yZXBsYWNlKC8oXnxbXFxzLS9dKShcXFMpL2csIChfbWF0Y2gsIHByZWZpeCwgY2gpID0+IGAke3ByZWZpeH0ke2NoLnRvTG9jYWxlVXBwZXJDYXNlKGxvY2FsZSl9YCk7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgdG9TZW50ZW5jZUNhc2UgPSAodmFsdWU6IHN0cmluZywgbG9jYWxlOiBzdHJpbmcpID0+IHtcclxuICBpZiAoIXZhbHVlKSByZXR1cm4gXCJcIjtcclxuICBjb25zdCB0cmltbWVkID0gdmFsdWUudHJpbSgpO1xyXG4gIGlmICghdHJpbW1lZCkgcmV0dXJuIHRyaW1tZWQ7XHJcbiAgY29uc3QgbG93ZXIgPSB0cmltbWVkLnRvTG9jYWxlTG93ZXJDYXNlKGxvY2FsZSk7XHJcbiAgcmV0dXJuIGxvd2VyWzBdLnRvTG9jYWxlVXBwZXJDYXNlKGxvY2FsZSkgKyBsb3dlci5zbGljZSgxKTtcclxufTtcclxuXHJcbmNvbnN0IGxvZ0hpc3RvcnkgPSAobWVzc2FnZTogc3RyaW5nLCBkYXRhPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pID0+IHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybjtcbiAgY29uc3QgZGVidWdGbGFnID0gKHdpbmRvdyBhcyBhbnkpLl9fSU5EX0RFQlVHX0hJU1RPUllfXztcbiAgaWYgKGRlYnVnRmxhZyAhPT0gdHJ1ZSkgcmV0dXJuO1xuICBpZiAoZGF0YSkge1xuICAgIGNvbnNvbGUuZGVidWcoXCJbSGlzdG9yeV1cIiwgbWVzc2FnZSwgZGF0YSk7XG4gIH0gZWxzZSB7XG4gICAgY29uc29sZS5kZWJ1ZyhcIltIaXN0b3J5XVwiLCBtZXNzYWdlKTtcclxuICB9XHJcbn07XHJcblxyXG4vLyBIaXN0b3J5IHBhZ2Ugd2l0aCBSZWFjdCBzdGF0ZSArIGVmZmVjdHMgKG5vIGxlZ2FjeSBET00gbG9naWMpLlxyXG5leHBvcnQgY29uc3QgSGlzdG9yeVBhZ2UgPSAoeyBkZWZhdWx0RnJvbURhdGUgPSBcIlwiLCBkZWZhdWx0VG9EYXRlID0gXCJcIiB9OiBQcm9wcykgPT4ge1xyXG4gIGNvbnN0IGxvY2FsZSA9IHVzZU1lbW8oKCkgPT4gZ2V0VWlMb2NhbGUoKSwgW10pO1xyXG4gIGNvbnN0IGNhblZpZXdIaXN0b3J5ID0gY2FuQWNjZXNzKFwiVklTSVRBU19ISVNUT1JJQUxcIiwgXCJWaWV3XCIpO1xyXG4gIGNvbnN0IGNhbkNyZWF0ZVZpc2l0ID0gY2FuQWNjZXNzKFwiVklTSVRBU19DUkVBQ0lPTlwiLCBcIkFkZFwiKTtcclxuICBjb25zdCBub0RhdGFUZXh0ID0gaW5kVChcIkNvbW1vbl9Ob0RhdGFcIiwgXCJObyBkYXRhXCIpO1xyXG5cclxuICBjb25zdCBhY3RpdmF0b3JSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgcG9wb3ZlclJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBwYWdpbmF0aW9uUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XG5cclxuICBjb25zdCBbZmFiQm90dG9tLCBzZXRGYWJCb3R0b21dID0gdXNlU3RhdGUoRkFCX0JBU0VfQk9UVE9NKTtcblxuICBjb25zdCB7IHJlYWRDYWNoZWRGaWx0ZXIsIGNsZWFyRmlsdGVyQ2FjaGUsIGNvbnN1bWVSZXR1cm5GbGFnLCBzYXZlQ2FjaGVkRmlsdGVyIH0gPSB1c2VIaXN0b3J5RmlsdGVyQ2FjaGUoKTtcbiAgY29uc3Qge1xuICAgIHN0YXJ0RGF0ZSxcbiAgICBlbmREYXRlLFxuICAgIG1hbnVhbFN0YXJ0RGF0ZSxcbiAgICBtYW51YWxFbmREYXRlLFxuICAgIGhvdmVyRGF0ZSxcbiAgICBzZWxlY3RpbmdTdGVwLFxuICAgIGN1cnJlbnRNb250aCxcbiAgICBjdXJyZW50WWVhcixcbiAgICBpc09wZW4sXG4gICAgc2hvd01hbnVhbFBpY2tlclBhbmVsLFxuICAgIGFjdGl2ZVF1aWNrRmlsdGVyLFxuICAgIHNlbGVjdGVkQ2xpZW50LFxuICAgIGNsaWVudFJlc2V0S2V5LFxuICAgIHNob3dGaWx0ZXJzLFxuICAgIHNob3dNYW51YWxFcnJvcixcbiAgICBmcm9tRGF0ZVZhbHVlLFxuICAgIHRvRGF0ZVZhbHVlLFxuICAgIGFjY291bnROdW1WYWx1ZSxcbiAgICBoYXNSZXN0b3JlZEZpbHRlclJlZixcbiAgICBkaWRJbml0RmlsdGVyUmVmLFxuICAgIHNldEhvdmVyRGF0ZSxcbiAgICBzZXRTZWxlY3RpbmdTdGVwLFxuICAgIHNldEN1cnJlbnRNb250aCxcbiAgICBzZXRDdXJyZW50WWVhcixcbiAgICBzZXRJc09wZW4sXG4gICAgc2V0U2hvd0ZpbHRlcnMsXG4gICAgc2V0U2hvd01hbnVhbEVycm9yLFxuICAgIHZhbGlkYXRlTWFudWFsUmFuZ2UsXG4gICAgYXBwbHlEZWZhdWx0UmFuZ2VGcm9tUHJvcHMsXG4gICAgcmVzZXRIaXN0b3J5RmlsdGVycyxcbiAgICBhcHBseUNhY2hlZEZpbHRlcixcbiAgICBoYW5kbGVTZWxlY3QsXG4gICAgaGFuZGxlQ2xlYXJTdGF0ZSxcbiAgICBvcGVuUG9wb3ZlcixcbiAgICBoYW5kbGVBY3RpdmF0b3JLZXlEb3duLFxuICAgIGhhbmRsZVNlY3Rpb25LZXlEb3duLFxuICAgIGhhbmRsZVF1aWNrRmlsdGVyLFxuICAgIGhhbmRsZUNsaWVudFNlbGVjdGVkLFxuICB9ID0gdXNlSGlzdG9yeUZpbHRlcnNTdGF0ZSh7XG4gICAgZGVmYXVsdEZyb21EYXRlLFxuICAgIGRlZmF1bHRUb0RhdGUsXG4gICAgbG9nSGlzdG9yeSxcbiAgICBwYXJzZURhdGVWYWx1ZSxcbiAgICBwYXJzZUlTTyxcbiAgICB0b0lTTyxcbiAgICBzdGFydE9mRGF5LFxuICAgIGlzQmVmb3JlLFxuICB9KTtcblxuICBjb25zdCB7IGl0ZW1zLCB0b3RhbCwgY3VycmVudFBhZ2UsIGlzTG9hZGluZywgZXJyb3JNZXNzYWdlLCBsb2FkQWN0aXZpdGllcywgcmVzZXRBY3Rpdml0aWVzLCByZXRyeU9uTmV0d29ya0Vycm9yUmVmLCBsYXN0U2lnbmF0dXJlUmVmIH0gPVxuICAgIHVzZUhpc3RvcnlBY3Rpdml0aWVzKHtcbiAgICAgIGZyb21EYXRlVmFsdWUsXG4gICAgICB0b0RhdGVWYWx1ZSxcbiAgICAgIGFjY291bnROdW1WYWx1ZSxcbiAgICAgIHBhZ2VTaXplOiBQQUdFX1NJWkUsXG4gICAgICBub3JtYWxpemVSYW5nZSxcbiAgICAgIG9uRm9yYmlkZGVuOiBzaG93UGVybWlzc2lvbk1vZGFsLFxuICAgICAgb25EZWJ1ZzogbG9nSGlzdG9yeSxcbiAgICB9KTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGxvZ0hpc3RvcnkoXCJpbml0XCIsIHsgZGVmYXVsdEZyb21EYXRlLCBkZWZhdWx0VG9EYXRlIH0pO1xuICB9LCBbZGVmYXVsdEZyb21EYXRlLCBkZWZhdWx0VG9EYXRlXSk7XG5cclxuICBjb25zdCBhcHBseUZpbHRlcnMgPSB1c2VDYWxsYmFjayhcbiAgICAob3B0aW9ucz86IHsgY2xvc2VQYW5lbD86IGJvb2xlYW47IGZvcmNlPzogYm9vbGVhbjsgcGFnZT86IG51bWJlciB9KSA9PiB7XHJcbiAgICAgIGlmICghdmFsaWRhdGVNYW51YWxSYW5nZSgpKSByZXR1cm47XHJcbiAgICAgIGlmICghc3RhcnREYXRlIHx8ICFlbmREYXRlKSByZXR1cm47XHJcblxyXG4gICAgICBjb25zdCBub3JtYWxpemVkID0gbm9ybWFsaXplUmFuZ2UoZnJvbURhdGVWYWx1ZSwgdG9EYXRlVmFsdWUpO1xyXG4gICAgICBjb25zdCBwYWdlID0gb3B0aW9ucz8ucGFnZSA/PyAxO1xyXG4gICAgICBjb25zdCBzaWduYXR1cmUgPSBgJHtub3JtYWxpemVkLmZyb219fCR7bm9ybWFsaXplZC50b318JHthY2NvdW50TnVtVmFsdWV9fCR7cGFnZX1gO1xyXG5cclxuICAgICAgaWYgKG9wdGlvbnM/LmZvcmNlIHx8IGxhc3RTaWduYXR1cmVSZWYuY3VycmVudCAhPT0gc2lnbmF0dXJlKSB7XHJcbiAgICAgICAgbG9hZEFjdGl2aXRpZXMocGFnZSwgeyBmcm9tRGF0ZTogbm9ybWFsaXplZC5mcm9tLCB0b0RhdGU6IG5vcm1hbGl6ZWQudG8sIGFjY291bnROdW06IGFjY291bnROdW1WYWx1ZSB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2V0U2hvd01hbnVhbEVycm9yKGZhbHNlKTtcclxuICAgICAgaWYgKG9wdGlvbnM/LmNsb3NlUGFuZWwpIHtcclxuICAgICAgICBzZXRJc09wZW4oZmFsc2UpO1xyXG4gICAgICAgIHNldFNob3dGaWx0ZXJzKGZhbHNlKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFthY2NvdW50TnVtVmFsdWUsIGVuZERhdGUsIGZyb21EYXRlVmFsdWUsIGxvYWRBY3Rpdml0aWVzLCBzdGFydERhdGUsIHRvRGF0ZVZhbHVlLCB2YWxpZGF0ZU1hbnVhbFJhbmdlXVxyXG4gICk7XG5cbiAgY29uc3QgdG90YWxQYWdlcyA9IE1hdGguY2VpbCgodG90YWwgfHwgMCkgLyBQQUdFX1NJWkUpO1xuXG4gIC8vIEtlZXAgdGhlIGZsb2F0aW5nIGFjdGlvbiBidXR0b24gY2xlYXIgb2YgcGFnaW5hdGlvbiBvbiBzbWFsbCBzY3JlZW5zLlxuICBjb25zdCB1cGRhdGVGYWJCb3R0b20gPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKCFwYWdpbmF0aW9uUmVmLmN1cnJlbnQgfHwgdG90YWxQYWdlcyA8PSAxKSB7XG4gICAgICBzZXRGYWJCb3R0b20oRkFCX0JBU0VfQk9UVE9NKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgaGVpZ2h0ID0gcGFnaW5hdGlvblJlZi5jdXJyZW50Lm9mZnNldEhlaWdodCB8fCAwO1xuICAgIGNvbnN0IG5leHQgPSBNYXRoLm1heChGQUJfQkFTRV9CT1RUT00sIGhlaWdodCArIEZBQl9DTEVBUkFOQ0UgKyBGQUJfR0FQKTtcbiAgICBzZXRGYWJCb3R0b20oKHByZXYpID0+IChNYXRoLmFicyhwcmV2IC0gbmV4dCkgPCAxID8gcHJldiA6IG5leHQpKTtcbiAgfSwgW3RvdGFsUGFnZXNdKTtcblxuICB1c2VIaXN0b3J5UGFnZUxpc3RlbmVycyh7XG4gICAgaXNPcGVuLFxuICAgIGFjdGl2YXRvclJlZixcbiAgICBwb3BvdmVyUmVmLFxuICAgIHBhZ2luYXRpb25SZWYsXG4gICAgaGFzUmVzdG9yZWRGaWx0ZXJSZWYsXG4gICAgcmV0cnlPbk5ldHdvcmtFcnJvclJlZixcbiAgICBjdXJyZW50UGFnZSxcbiAgICB1cGRhdGVGYWJCb3R0b20sXG4gICAgbG9nSGlzdG9yeSxcbiAgICBjb25zdW1lUmV0dXJuRmxhZyxcbiAgICByZWFkQ2FjaGVkRmlsdGVyLFxuICAgIGFwcGx5Q2FjaGVkRmlsdGVyLFxuICAgIGxvYWRBY3Rpdml0aWVzLFxuICAgIHNldElzT3BlbixcbiAgICBzZXRIb3ZlckRhdGUsXG4gICAgc2V0U2hvd0ZpbHRlcnMsXG4gICAgYXBwbHlGaWx0ZXJzLFxuICB9KTtcblxuICAvLyBSZXN0b3JlIGNhY2hlZCBmaWx0ZXIgb24gaW5pdGlhbCBtb3VudCBvbmx5LlxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChkaWRJbml0RmlsdGVyUmVmLmN1cnJlbnQpIHJldHVybjtcbiAgICBkaWRJbml0RmlsdGVyUmVmLmN1cnJlbnQgPSB0cnVlO1xuICAgIGNvbnN0IGNhY2hlZCA9IGNvbnN1bWVSZXR1cm5GbGFnKCkgPyByZWFkQ2FjaGVkRmlsdGVyKCkgOiBudWxsO1xuICAgIGlmIChjYWNoZWQgJiYgY2FjaGVkLmZyb21EYXRlICYmIGNhY2hlZC50b0RhdGUpIHtcbiAgICAgIGxvZ0hpc3RvcnkoXCJyZXN0b3JlRmlsdGVyXCIsIGNhY2hlZCk7XG4gICAgICBjb25zdCBjYWNoZWRSZXF1ZXN0ID0gYXBwbHlDYWNoZWRGaWx0ZXIoY2FjaGVkKTtcbiAgICAgIGlmIChjYWNoZWRSZXF1ZXN0KSB7XG4gICAgICAgIHJldHJ5T25OZXR3b3JrRXJyb3JSZWYuY3VycmVudCA9IHRydWU7XG4gICAgICAgIGxvYWRBY3Rpdml0aWVzKGNhY2hlZFJlcXVlc3QucGFnZSwgY2FjaGVkUmVxdWVzdC5vdmVycmlkZSk7XG4gICAgICAgIHNldFNob3dGaWx0ZXJzKGZhbHNlKTtcbiAgICAgICAgc2V0SXNPcGVuKGZhbHNlKTtcbiAgICAgICAgaGFzUmVzdG9yZWRGaWx0ZXJSZWYuY3VycmVudCA9IHRydWU7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBkZWZhdWx0UmVxdWVzdCA9IGFwcGx5RGVmYXVsdFJhbmdlRnJvbVByb3BzKCk7XG4gICAgaWYgKGRlZmF1bHRSZXF1ZXN0KSB7XG4gICAgICByZXRyeU9uTmV0d29ya0Vycm9yUmVmLmN1cnJlbnQgPSB0cnVlO1xuICAgICAgbG9hZEFjdGl2aXRpZXMoZGVmYXVsdFJlcXVlc3QucGFnZSwgZGVmYXVsdFJlcXVlc3Qub3ZlcnJpZGUpO1xuICAgICAgc2V0U2hvd0ZpbHRlcnMoZmFsc2UpO1xuICAgICAgc2V0SXNPcGVuKGZhbHNlKTtcbiAgICAgIGhhc1Jlc3RvcmVkRmlsdGVyUmVmLmN1cnJlbnQgPSB0cnVlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHJlc2V0SGlzdG9yeUZpbHRlcnMoKTtcbiAgICBjbGVhckZpbHRlckNhY2hlKCk7XG4gICAgcmVzZXRBY3Rpdml0aWVzKCk7XG4gICAgc2V0U2hvd0ZpbHRlcnModHJ1ZSk7XG4gICAgc2V0SXNPcGVuKGZhbHNlKTtcbiAgfSwgW1xuICAgIGFwcGx5Q2FjaGVkRmlsdGVyLFxuICAgIGFwcGx5RGVmYXVsdFJhbmdlRnJvbVByb3BzLFxuICAgIGNsZWFyRmlsdGVyQ2FjaGUsXG4gICAgY29uc3VtZVJldHVybkZsYWcsXG4gICAgZGlkSW5pdEZpbHRlclJlZixcbiAgICBoYXNSZXN0b3JlZEZpbHRlclJlZixcbiAgICBsb2FkQWN0aXZpdGllcyxcbiAgICByZWFkQ2FjaGVkRmlsdGVyLFxuICAgIHJlc2V0QWN0aXZpdGllcyxcbiAgICByZXNldEhpc3RvcnlGaWx0ZXJzLFxuICAgIHJldHJ5T25OZXR3b3JrRXJyb3JSZWYsXG4gIF0pO1xuXHJcbiAgLy8gS2VlcCB0aGUgcGlja2VyIHN0ZXAgaW4gc3luYyB3aXRoIGN1cnJlbnQgc2VsZWN0aW9uLlxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoc3RhcnREYXRlICYmICFlbmREYXRlICYmIHNlbGVjdGluZ1N0ZXAgPT09IFwic3RhcnRcIikge1xyXG4gICAgICBzZXRTZWxlY3RpbmdTdGVwKFwiZW5kXCIpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoIXN0YXJ0RGF0ZSAmJiBzZWxlY3RpbmdTdGVwICE9PSBcInN0YXJ0XCIpIHtcclxuICAgICAgc2V0U2VsZWN0aW5nU3RlcChcInN0YXJ0XCIpO1xyXG4gICAgfVxyXG4gIH0sIFtzdGFydERhdGUsIGVuZERhdGUsIHNlbGVjdGluZ1N0ZXBdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQ2xlYXIgPSB1c2VDYWxsYmFjayhcbiAgICAoZXZlbnQ6IFJlYWN0Lk1vdXNlRXZlbnQpID0+IHtcbiAgICAgIGhhbmRsZUNsZWFyU3RhdGUoZXZlbnQpO1xuICAgICAgY2xlYXJGaWx0ZXJDYWNoZSgpO1xuICAgICAgcmVzZXRBY3Rpdml0aWVzKCk7XG4gICAgfSxcbiAgICBbY2xlYXJGaWx0ZXJDYWNoZSwgaGFuZGxlQ2xlYXJTdGF0ZSwgcmVzZXRBY3Rpdml0aWVzXVxuICApO1xuXG4gIGNvbnN0IGhhbmRsZVJlc2V0RmlsdGVycyA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICByZXNldEhpc3RvcnlGaWx0ZXJzKCk7XG4gICAgY2xlYXJGaWx0ZXJDYWNoZSgpO1xuICAgIHJlc2V0QWN0aXZpdGllcygpO1xuICAgIHNldElzT3BlbihmYWxzZSk7XG4gICAgc2V0U2hvd0ZpbHRlcnModHJ1ZSk7XG4gIH0sIFtjbGVhckZpbHRlckNhY2hlLCByZXNldEFjdGl2aXRpZXMsIHJlc2V0SGlzdG9yeUZpbHRlcnMsIHNldElzT3Blbiwgc2V0U2hvd0ZpbHRlcnNdKTtcblxyXG4gIGNvbnN0IGhhbmRsZU5hdmlnYXRlID0gdXNlQ2FsbGJhY2soXG4gICAgKGxpbmtJZDogc3RyaW5nKSA9PiB7XG4gICAgICBpZiAoIWNhblZpZXdIaXN0b3J5KSB7XG4gICAgICAgIHNob3dQZXJtaXNzaW9uTW9kYWwoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHNhdmVDYWNoZWRGaWx0ZXIoe1xuICAgICAgICAgIGZyb21EYXRlOiBmcm9tRGF0ZVZhbHVlIHx8IFwiXCIsXG4gICAgICAgICAgdG9EYXRlOiB0b0RhdGVWYWx1ZSB8fCBcIlwiLFxuICAgICAgICAgIHBhZ2U6IGN1cnJlbnRQYWdlLFxuICAgICAgICAgIGNsaWVudEFjY291bnQ6IHNlbGVjdGVkQ2xpZW50Py52YWx1ZSB8fCBcIlwiLFxuICAgICAgICAgIGNsaWVudFRleHQ6IHNlbGVjdGVkQ2xpZW50Py50ZXh0IHx8IFwiXCIsXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCB0YXJnZXQgPSBlbmNvZGVVUklDb21wb25lbnQobGlua0lkKTtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBgL1Zpc2l0YXMvRGV0YWxsZS8ke3RhcmdldH1gO1xuICAgICAgfSwgTkFWX0RFTEFZX01TKTtcbiAgICB9LFxuICAgIFtjYW5WaWV3SGlzdG9yeSwgY3VycmVudFBhZ2UsIGZyb21EYXRlVmFsdWUsIHNhdmVDYWNoZWRGaWx0ZXIsIHRvRGF0ZVZhbHVlLCBzZWxlY3RlZENsaWVudF1cbiAgKTtcblxyXG4gIGNvbnN0IGNhbGVuZGFyID0gdXNlTWVtbygoKSA9PiB7XHJcbiAgICBjb25zdCBmaXJzdERheSA9IG5ldyBEYXRlKGN1cnJlbnRZZWFyLCBjdXJyZW50TW9udGgsIDEpO1xyXG4gICAgY29uc3QgZGF5c0luTW9udGggPSBuZXcgRGF0ZShjdXJyZW50WWVhciwgY3VycmVudE1vbnRoICsgMSwgMCkuZ2V0RGF0ZSgpO1xyXG4gICAgY29uc3Qgb2Zmc2V0ID0gKGZpcnN0RGF5LmdldERheSgpICsgNikgJSA3O1xyXG4gICAgY29uc3QgY2VsbHM6IENhbGVuZGFyQ2VsbFtdID0gW107XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9mZnNldDsgaSsrKSB7XHJcbiAgICAgIGNlbGxzLnB1c2goeyBkYXRlOiBudWxsLCBpc286IFwiXCIsIGlzRW1wdHk6IHRydWUgfSk7XHJcbiAgICB9XHJcbiAgICBmb3IgKGxldCBkID0gMTsgZCA8PSBkYXlzSW5Nb250aDsgZCsrKSB7XHJcbiAgICAgIGNvbnN0IGRhdGVPYmogPSBuZXcgRGF0ZShjdXJyZW50WWVhciwgY3VycmVudE1vbnRoLCBkKTtcclxuICAgICAgY2VsbHMucHVzaCh7IGRhdGU6IGRhdGVPYmosIGlzbzogdG9JU08oZGF0ZU9iaiksIGlzRW1wdHk6IGZhbHNlIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgY2VsbHMsXHJcbiAgICAgIGxhYmVsOiBmb3JtYXRNb250aExhYmVsKGZpcnN0RGF5LCBsb2NhbGUpLFxyXG4gICAgfTtcclxuICB9LCBbY3VycmVudE1vbnRoLCBjdXJyZW50WWVhciwgbG9jYWxlXSk7XHJcblxyXG4gIGNvbnN0IHByZXZpZXdFbmQgPSBlbmREYXRlIHx8IChzZWxlY3RpbmdTdGVwID09PSBcImVuZFwiID8gaG92ZXJEYXRlIDogbnVsbCk7XG5cbiAgY29uc3QgaGFuZGxlUHJldk1vbnRoID0gdXNlQ2FsbGJhY2soXG4gICAgKGV2ZW50OiBSZWFjdC5Nb3VzZUV2ZW50PEhUTUxCdXR0b25FbGVtZW50PikgPT4ge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBzZXRDdXJyZW50TW9udGgoKHByZXYpID0+IHtcbiAgICAgICAgY29uc3QgbmV4dCA9IHByZXYgLSAxO1xuICAgICAgICBpZiAobmV4dCA8IDApIHtcbiAgICAgICAgICBzZXRDdXJyZW50WWVhcigoeWVhcikgPT4geWVhciAtIDEpO1xuICAgICAgICAgIHJldHVybiAxMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgW3NldEN1cnJlbnRNb250aCwgc2V0Q3VycmVudFllYXJdXG4gICk7XG5cbiAgY29uc3QgaGFuZGxlTmV4dE1vbnRoID0gdXNlQ2FsbGJhY2soXG4gICAgKGV2ZW50OiBSZWFjdC5Nb3VzZUV2ZW50PEhUTUxCdXR0b25FbGVtZW50PikgPT4ge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBzZXRDdXJyZW50TW9udGgoKHByZXYpID0+IHtcbiAgICAgICAgY29uc3QgbmV4dCA9IHByZXYgKyAxO1xuICAgICAgICBpZiAobmV4dCA+IDExKSB7XG4gICAgICAgICAgc2V0Q3VycmVudFllYXIoKHllYXIpID0+IHllYXIgKyAxKTtcbiAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgW3NldEN1cnJlbnRNb250aCwgc2V0Q3VycmVudFllYXJdXG4gICk7XG5cbiAgY29uc3QgaGFuZGxlR3JpZE1vdXNlTGVhdmUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgc2V0SG92ZXJEYXRlKG51bGwpO1xuICB9LCBbc2V0SG92ZXJEYXRlXSk7XG5cbiAgY29uc3QgaGFuZGxlTWFudWFsRGF5Q2xpY2sgPSB1c2VDYWxsYmFjayhcbiAgICAoY2VsbDogSGlzdG9yeU1hbnVhbERheUNlbGwpID0+IHtcbiAgICAgIGlmICghY2VsbC5kYXRlKSByZXR1cm47XG4gICAgICBsb2dIaXN0b3J5KFwiZGF5Q2xpY2tcIiwgeyBkYXRlOiBjZWxsLmlzbyB8fCBcIlwiLCBkaXNhYmxlZDogISFjZWxsLmRpc2FibGVkIH0pO1xuICAgICAgaGFuZGxlU2VsZWN0KGNlbGwuZGF0ZSk7XG4gICAgfSxcbiAgICBbaGFuZGxlU2VsZWN0XVxuICApO1xuXG4gIGNvbnN0IGhhbmRsZU1hbnVhbERheUhvdmVyID0gdXNlQ2FsbGJhY2soXG4gICAgKGNlbGw6IEhpc3RvcnlNYW51YWxEYXlDZWxsKSA9PiB7XG4gICAgICBpZiAoIWNlbGwuZGF0ZSkgcmV0dXJuO1xuICAgICAgaWYgKHNlbGVjdGluZ1N0ZXAgPT09IFwiZW5kXCIgJiYgc3RhcnREYXRlKSB7XG4gICAgICAgIHNldEhvdmVyRGF0ZShuZXcgRGF0ZShjZWxsLmRhdGUpKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIFtzZWxlY3RpbmdTdGVwLCBzZXRIb3ZlckRhdGUsIHN0YXJ0RGF0ZV1cbiAgKTtcblxuICBjb25zdCBtYW51YWxEYXlDZWxscyA9IHVzZU1lbW88SGlzdG9yeU1hbnVhbERheUNlbGxbXT4oKCkgPT4ge1xuICAgIHJldHVybiBjYWxlbmRhci5jZWxscy5tYXAoKGNlbGwsIGlkeCkgPT4ge1xuICAgICAgaWYgKGNlbGwuaXNFbXB0eSkge1xuICAgICAgICByZXR1cm4geyBrZXk6IGBlbXB0eS0ke2lkeH1gLCBpc0VtcHR5OiB0cnVlIH07XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGRhdGVPYmogPSBjZWxsLmRhdGUgYXMgRGF0ZTtcbiAgICAgIGNvbnN0IGlzU3RhcnQgPSBzYW1lRGF5KGRhdGVPYmosIHN0YXJ0RGF0ZSk7XG4gICAgICBjb25zdCBpc0VuZCA9IHNhbWVEYXkoZGF0ZU9iaiwgZW5kRGF0ZSk7XG4gICAgICBjb25zdCBpblJhbmdlID0gc3RhcnREYXRlICYmIHByZXZpZXdFbmQgJiYgaXNCZWZvcmUoc3RhcnREYXRlLCBkYXRlT2JqKSAmJiBpc0JlZm9yZShkYXRlT2JqLCBwcmV2aWV3RW5kKTtcbiAgICAgIGNvbnN0IGhvdmVyUmFuZ2UgPSBzdGFydERhdGUgJiYgIWVuZERhdGUgJiYgaG92ZXJEYXRlICYmIGlzQmVmb3JlKHN0YXJ0RGF0ZSwgZGF0ZU9iaikgJiYgaXNCZWZvcmUoZGF0ZU9iaiwgaG92ZXJEYXRlKTtcbiAgICAgIGNvbnN0IGRpc2FibGVkID0gc2VsZWN0aW5nU3RlcCA9PT0gXCJlbmRcIiAmJiAhIXN0YXJ0RGF0ZSAmJiBpc0JlZm9yZShkYXRlT2JqLCBzdGFydERhdGUpO1xuICAgICAgY29uc3QgaXNUb2RheSA9IHNhbWVEYXkoZGF0ZU9iaiwgbmV3IERhdGUoKSk7XG5cbiAgICAgIGNvbnN0IGRheUNsYXNzID0gY2xhc3NOYW1lcyhcbiAgICAgICAgXCJkcnAtZGF5XCIsXG4gICAgICAgIGlzU3RhcnQgPyBcInN0YXJ0IHJhbmdlLXN0YXJ0XCIgOiBcIlwiLFxuICAgICAgICBpc0VuZCA/IFwiZW5kIHJhbmdlLWVuZFwiIDogXCJcIixcbiAgICAgICAgaW5SYW5nZSA/IFwiaW4tcmFuZ2VcIiA6IFwiXCIsXG4gICAgICAgIGhvdmVyUmFuZ2UgPyBcImhvdmVyLXJhbmdlXCIgOiBcIlwiLFxuICAgICAgICBkaXNhYmxlZCA/IFwiZGlzYWJsZWRcIiA6IFwiXCIsXG4gICAgICAgIGlzVG9kYXkgPyBcInRvZGF5XCIgOiBcIlwiXG4gICAgICApO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBrZXk6IGNlbGwuaXNvLFxuICAgICAgICBpc0VtcHR5OiBmYWxzZSxcbiAgICAgICAgZGF0ZTogZGF0ZU9iaixcbiAgICAgICAgaXNvOiBjZWxsLmlzbyxcbiAgICAgICAgZGF5TGFiZWw6IGRhdGVPYmouZ2V0RGF0ZSgpLFxuICAgICAgICBkYXlDbGFzcyxcbiAgICAgICAgZGlzYWJsZWQsXG4gICAgICB9O1xuICAgIH0pO1xuICB9LCBbY2FsZW5kYXIuY2VsbHMsIGVuZERhdGUsIGhvdmVyRGF0ZSwgcHJldmlld0VuZCwgc2VsZWN0aW5nU3RlcCwgc3RhcnREYXRlXSk7XG5cclxuICBjb25zdCB7IHRpbWVsaW5lSXRlbXMgfSA9IHVzZUhpc3RvcnlUaW1lbGluZUl0ZW1zKHtcbiAgICBpdGVtcyxcbiAgICBsb2NhbGUsXG4gICAgbm9EYXRhVGV4dCxcbiAgICBsb2dIaXN0b3J5LFxuICAgIHRvVGl0bGVDYXNlLFxuICAgIGZvcm1hdERhdGVQYXJ0cyxcbiAgfSk7XG5cclxuICBjb25zdCBsYWJlbEZyb20gPSB0b1NlbnRlbmNlQ2FzZShpbmRUKFwiSGlzdG9yeV9Gcm9tXCIsIFwiRnJvbVwiKSwgbG9jYWxlKTtcbiAgY29uc3QgbGFiZWxUbyA9IHRvU2VudGVuY2VDYXNlKGluZFQoXCJIaXN0b3J5X1RvXCIsIFwiVG9cIiksIGxvY2FsZSk7XG4gIGNvbnN0IHN1bW1hcnlGcm9tID0gbGFiZWxGcm9tO1xuICBjb25zdCBzdW1tYXJ5VG8gPSBsYWJlbFRvO1xuICBjb25zdCBmaWx0ZXJUaXRsZSA9IGluZFQoXCJIaXN0b3J5X0ZpbHRlcl9EYXRlXCIsIFwiRGF0ZVwiKTtcbiAgY29uc3QgYWRkRGF0ZUxhYmVsID0gaW5kVChcIkhpc3RvcnlfQWRkRGF0ZVwiLCBcIkFkZCBkYXRlXCIpO1xuICBjb25zdCBjbGVhclJhbmdlTGFiZWwgPSBpbmRUKFwiSGlzdG9yeV9DbGVhclJhbmdlXCIsIFwiQ2xlYXIgcmFuZ2VcIik7XG4gIGNvbnN0IHByZXZNb250aExhYmVsID0gaW5kVChcIkhpc3RvcnlfUHJldk1vbnRoXCIsIFwiUHJldmlvdXMgbW9udGhcIik7XG4gIGNvbnN0IG5leHRNb250aExhYmVsID0gaW5kVChcIkhpc3RvcnlfTmV4dE1vbnRoXCIsIFwiTmV4dCBtb250aFwiKTtcbiAgY29uc3Qgc3RhdHVzU2VsZWN0U3RhcnRMYWJlbCA9IGluZFQoXCJIaXN0b3J5X1N0YXR1c19TZWxlY3RTdGFydFwiLCBcIlNlbGVjdCBzdGFydCBkYXRlXCIpO1xuICBjb25zdCBzdGF0dXNTZWxlY3RFbmRMYWJlbCA9IGluZFQoXCJIaXN0b3J5X1N0YXR1c19TZWxlY3RFbmRcIiwgXCJTZWxlY3QgZW5kIGRhdGVcIik7XG4gIGNvbnN0IHdlZWtEYXlMYWJlbHMgPSB1c2VNZW1vKFxuICAgICgpID0+IFtcbiAgICAgIGluZFQoXCJIaXN0b3J5X0RheV9Nb25cIiwgXCJNb25cIiksXG4gICAgICBpbmRUKFwiSGlzdG9yeV9EYXlfVHVlXCIsIFwiVHVlXCIpLFxuICAgICAgaW5kVChcIkhpc3RvcnlfRGF5X1dlZFwiLCBcIldlZFwiKSxcbiAgICAgIGluZFQoXCJIaXN0b3J5X0RheV9UaHVcIiwgXCJUaHVcIiksXG4gICAgICBpbmRUKFwiSGlzdG9yeV9EYXlfRnJpXCIsIFwiRnJpXCIpLFxuICAgICAgaW5kVChcIkhpc3RvcnlfRGF5X1NhdFwiLCBcIlNhdFwiKSxcbiAgICAgIGluZFQoXCJIaXN0b3J5X0RheV9TdW5cIiwgXCJTdW5cIiksXG4gICAgXSxcbiAgICBbXVxuICApO1xuICBjb25zdCBjbGVhckxhYmVsID0gaW5kVChcIkhpc3RvcnlfRmlsdGVyX0NsZWFyXCIsIFwiQ2xlYXJcIik7XG4gIGNvbnN0IGFwcGx5TGFiZWwgPSBpbmRUKFwiSGlzdG9yeV9GaWx0ZXJfQXBwbHlcIiwgXCJBcHBseVwiKTtcbiAgY29uc3QgY2xpZW50TGFiZWwgPSBpbmRUKFwiSGlzdG9yeV9GaWx0ZXJfQ2xpZW50XCIsIFwiQ2xpZW50XCIpO1xyXG4gIGNvbnN0IHF1aWNrQ3VzdG9tTGFiZWwgPSBpbmRUKFwiSGlzdG9yeV9RdWlja19DdXN0b21cIiwgXCJEYXRlXCIpO1xuICBjb25zdCBxdWljazdEYXlzTGFiZWwgPSBpbmRUKFwiSGlzdG9yeV9RdWlja183RGF5c1wiLCBcIjcgZGF5c1wiKTtcbiAgY29uc3QgcXVpY2szMERheXNMYWJlbCA9IGluZFQoXCJIaXN0b3J5X1F1aWNrXzMwRGF5c1wiLCBcIjMwIGRheXNcIik7XG4gIGNvbnN0IHF1aWNrOTBEYXlzTGFiZWwgPSBpbmRUKFwiSGlzdG9yeV9RdWlja185MERheXNcIiwgXCI5MCBkYXlzXCIpO1xuICBjb25zdCBwYWdlRmlyc3RMYWJlbCA9IGluZFQoXCJIaXN0b3J5X1BhZ2VfRmlyc3RcIiwgXCJGaXJzdFwiKTtcbiAgY29uc3QgcGFnZVByZXZMYWJlbCA9IGluZFQoXCJIaXN0b3J5X1BhZ2VfUHJldlwiLCBcIlByZXZpb3VzXCIpO1xuICBjb25zdCBwYWdlTmV4dExhYmVsID0gaW5kVChcIkhpc3RvcnlfUGFnZV9OZXh0XCIsIFwiTmV4dFwiKTtcbiAgY29uc3QgcGFnZUxhc3RMYWJlbCA9IGluZFQoXCJIaXN0b3J5X1BhZ2VfTGFzdFwiLCBcIkxhc3RcIik7XG4gIGNvbnN0IHF1aWNrRmlsdGVycyA9IHVzZU1lbW8oXG4gICAgKCkgPT4gW1xuICAgICAgeyBpZDogXCJjdXN0b21cIiBhcyBjb25zdCwgbGFiZWw6IHF1aWNrQ3VzdG9tTGFiZWwgfSxcbiAgICAgIHsgaWQ6IFwiZGF5cy03XCIgYXMgY29uc3QsIGxhYmVsOiBxdWljazdEYXlzTGFiZWwgfSxcbiAgICAgIHsgaWQ6IFwiZGF5cy0zMFwiIGFzIGNvbnN0LCBsYWJlbDogcXVpY2szMERheXNMYWJlbCB9LFxuICAgICAgeyBpZDogXCJkYXlzLTkwXCIgYXMgY29uc3QsIGxhYmVsOiBxdWljazkwRGF5c0xhYmVsIH0sXG4gICAgXSxcbiAgICBbcXVpY2szMERheXNMYWJlbCwgcXVpY2s3RGF5c0xhYmVsLCBxdWljazkwRGF5c0xhYmVsLCBxdWlja0N1c3RvbUxhYmVsXVxuICApO1xuICBjb25zdCBwYWdpbmF0aW9uTGFiZWxzID0gdXNlTWVtbyhcbiAgICAoKSA9PiAoe1xuICAgICAgZmlyc3Q6IHBhZ2VGaXJzdExhYmVsLFxuICAgICAgcHJldjogcGFnZVByZXZMYWJlbCxcbiAgICAgIG5leHQ6IHBhZ2VOZXh0TGFiZWwsXG4gICAgICBsYXN0OiBwYWdlTGFzdExhYmVsLFxuICAgIH0pLFxuICAgIFtwYWdlRmlyc3RMYWJlbCwgcGFnZUxhc3RMYWJlbCwgcGFnZU5leHRMYWJlbCwgcGFnZVByZXZMYWJlbF1cbiAgKTtcbiAgY29uc3Qgc2hvd0ZpbHRlckFjdGlvbnMgPSBzaG93RmlsdGVycztcbiAgY29uc3Qgc2hvd1N1bW1hcnkgPSAhc2hvd0ZpbHRlcnMgJiYgISFzdGFydERhdGUgJiYgISFlbmREYXRlO1xuICBjb25zdCBzaG93UmVzdWx0cyA9ICFzaG93RmlsdGVycztcbiAgY29uc3QgbWFudWFsUmFuZ2VSZWFkeSA9ICEhbWFudWFsU3RhcnREYXRlICYmICEhbWFudWFsRW5kRGF0ZTtcbiAgY29uc3Qgc2hvd0lubGluZVN1bW1hcnkgPVxuICAgICEhc3RhcnREYXRlICYmXG4gICAgISFlbmREYXRlICYmXG4gICAgIWlzT3BlbiAmJlxuICAgIChhY3RpdmVRdWlja0ZpbHRlciAhPT0gXCJjdXN0b21cIiB8fCBtYW51YWxSYW5nZVJlYWR5KTtcbiAgY29uc3Qgc2hvd01hbnVhbFBpY2tlciA9IGFjdGl2ZVF1aWNrRmlsdGVyID09PSBcImN1c3RvbVwiICYmIHNob3dNYW51YWxQaWNrZXJQYW5lbDtcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cIm1heC13LTN4bCBteC1hdXRvIHB4LTEgc206cHgtMiBwdC0zIHBiLTQgc3BhY2UteS0yXCI+XHJcbiAgICAgIHtzaG93U3VtbWFyeSAmJiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmlsdGVyLWNhcmQgZmlsdGVyLWNhcmQtLXN1bW1hcnkgcC0zIHNtOnAtNCBtdC0xIG1iLTNcIj5cbiAgICAgICAgICA8SGlzdG9yeVN1bW1hcnlcbiAgICAgICAgICAgIHN1bW1hcnlGcm9tTGFiZWw9e3N1bW1hcnlGcm9tfVxuICAgICAgICAgICAgc3VtbWFyeVRvTGFiZWw9e3N1bW1hcnlUb31cbiAgICAgICAgICAgIGZyb21WYWx1ZT17c3RhcnREYXRlID8gZm9ybWF0RGlzcGxheShzdGFydERhdGUsIGxvY2FsZSkgOiBcIi0tXCJ9XG4gICAgICAgICAgICB0b1ZhbHVlPXtlbmREYXRlID8gZm9ybWF0RGlzcGxheShlbmREYXRlLCBsb2NhbGUpIDogXCItLVwifVxuICAgICAgICAgICAgY2xpZW50TGFiZWw9e2NsaWVudExhYmVsfVxuICAgICAgICAgICAgY2xpZW50VmFsdWU9e3NlbGVjdGVkQ2xpZW50Py50ZXh0IHx8IFwiXCJ9XG4gICAgICAgICAgICBzaG93Q2xpZW50PXshIXNlbGVjdGVkQ2xpZW50fVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cbiAgICAgIHtzaG93RmlsdGVycyAmJiAoXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmlsdGVyLWNhcmQgZmlsdGVyLWNhcmQtLWV4cGFuZGVkIHAtMiBzbTpwLTIuNSByZWxhdGl2ZVwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xLjUgaGlzdG9yeS1maWx0ZXItc3RhY2sgZmxleCBmbGV4LWNvbFwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIGdhcC0yIGhpc3RvcnktcXVpY2stZmlsdGVyc1wiIGFyaWEtbGFiZWw9e2ZpbHRlclRpdGxlfT5cbiAgICAgICAgICAgIHtxdWlja0ZpbHRlcnMubWFwKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGlzQWN0aXZlID0gYWN0aXZlUXVpY2tGaWx0ZXIgPT09IGl0ZW0uaWQ7XG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPEZpbHRlckJ1dHRvblxuICAgICAgICAgICAgICAgICAga2V5PXtpdGVtLmlkfVxuICAgICAgICAgICAgICAgICAgbGFiZWw9e2l0ZW0ubGFiZWx9XG4gICAgICAgICAgICAgICAgICBhY3RpdmU9e2lzQWN0aXZlfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsXCJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZVF1aWNrRmlsdGVyKGl0ZW0uaWQpfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KX1cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHtzaG93SW5saW5lU3VtbWFyeSAmJiAoXG4gICAgICAgICAgICA8SGlzdG9yeVN1bW1hcnlcbiAgICAgICAgICAgICAgc3VtbWFyeUZyb21MYWJlbD17c3VtbWFyeUZyb219XG4gICAgICAgICAgICAgIHN1bW1hcnlUb0xhYmVsPXtzdW1tYXJ5VG99XG4gICAgICAgICAgICAgIGZyb21WYWx1ZT17c3RhcnREYXRlID8gZm9ybWF0RGlzcGxheShzdGFydERhdGUsIGxvY2FsZSkgOiBcIi0tXCJ9XG4gICAgICAgICAgICAgIHRvVmFsdWU9e2VuZERhdGUgPyBmb3JtYXREaXNwbGF5KGVuZERhdGUsIGxvY2FsZSkgOiBcIi0tXCJ9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImdhcC15LTEgdGV4dC1bMTFweF0gcHgtMVwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgICl9XG5cbiAgICAgICAgICB7c2hvd01hbnVhbFBpY2tlciAmJiAoXG4gICAgICAgICAgICA8SGlzdG9yeU1hbnVhbERhdGVQaWNrZXJcbiAgICAgICAgICAgICAgYWN0aXZhdG9yUmVmPXthY3RpdmF0b3JSZWZ9XG4gICAgICAgICAgICAgIHBvcG92ZXJSZWY9e3BvcG92ZXJSZWZ9XG4gICAgICAgICAgICAgIHNob3dNYW51YWxFcnJvcj17c2hvd01hbnVhbEVycm9yfVxuICAgICAgICAgICAgICBzaG93U3RhcnRFcnJvcj17c2hvd01hbnVhbEVycm9yICYmICFzdGFydERhdGV9XG4gICAgICAgICAgICAgIHNob3dFbmRFcnJvcj17c2hvd01hbnVhbEVycm9yICYmICFlbmREYXRlfVxuICAgICAgICAgICAgICBmaWx0ZXJUaXRsZT17ZmlsdGVyVGl0bGV9XG4gICAgICAgICAgICAgIGlzT3Blbj17aXNPcGVufVxuICAgICAgICAgICAgICBzZWxlY3RpbmdTdGVwPXtzZWxlY3RpbmdTdGVwfVxuICAgICAgICAgICAgICBsYWJlbEZyb209e2xhYmVsRnJvbX1cbiAgICAgICAgICAgICAgbGFiZWxUbz17bGFiZWxUb31cbiAgICAgICAgICAgICAgc3RhcnREYXRlVGV4dD17c3RhcnREYXRlID8gZm9ybWF0RGlzcGxheShzdGFydERhdGUsIGxvY2FsZSkgOiBhZGREYXRlTGFiZWx9XG4gICAgICAgICAgICAgIGVuZERhdGVUZXh0PXtlbmREYXRlID8gZm9ybWF0RGlzcGxheShlbmREYXRlLCBsb2NhbGUpIDogYWRkRGF0ZUxhYmVsfVxuICAgICAgICAgICAgICBjbGVhclJhbmdlTGFiZWw9e2NsZWFyUmFuZ2VMYWJlbH1cbiAgICAgICAgICAgICAgaGFzU2VsZWN0ZWRSYW5nZT17ISFzdGFydERhdGUgfHwgISFlbmREYXRlfVxuICAgICAgICAgICAgICBtb250aExhYmVsPXtjYWxlbmRhci5sYWJlbH1cbiAgICAgICAgICAgICAgd2Vla0RheUxhYmVscz17d2Vla0RheUxhYmVsc31cbiAgICAgICAgICAgICAgc3RhdHVzVGV4dD17c2VsZWN0aW5nU3RlcCA9PT0gXCJzdGFydFwiID8gc3RhdHVzU2VsZWN0U3RhcnRMYWJlbCA6IHN0YXR1c1NlbGVjdEVuZExhYmVsfVxuICAgICAgICAgICAgICBkYXlDZWxscz17bWFudWFsRGF5Q2VsbHN9XG4gICAgICAgICAgICAgIHByZXZNb250aExhYmVsPXtwcmV2TW9udGhMYWJlbH1cbiAgICAgICAgICAgICAgbmV4dE1vbnRoTGFiZWw9e25leHRNb250aExhYmVsfVxuICAgICAgICAgICAgICBvbk9wZW5Qb3BvdmVyPXtvcGVuUG9wb3Zlcn1cbiAgICAgICAgICAgICAgb25BY3RpdmF0b3JLZXlEb3duPXtoYW5kbGVBY3RpdmF0b3JLZXlEb3dufVxuICAgICAgICAgICAgICBvblNlY3Rpb25LZXlEb3duPXtoYW5kbGVTZWN0aW9uS2V5RG93bn1cbiAgICAgICAgICAgICAgb25DbGVhcj17aGFuZGxlQ2xlYXJ9XG4gICAgICAgICAgICAgIG9uUHJldk1vbnRoPXtoYW5kbGVQcmV2TW9udGh9XG4gICAgICAgICAgICAgIG9uTmV4dE1vbnRoPXtoYW5kbGVOZXh0TW9udGh9XG4gICAgICAgICAgICAgIG9uR3JpZE1vdXNlTGVhdmU9e2hhbmRsZUdyaWRNb3VzZUxlYXZlfVxuICAgICAgICAgICAgICBvbkRheUNsaWNrPXtoYW5kbGVNYW51YWxEYXlDbGlja31cbiAgICAgICAgICAgICAgb25EYXlIb3Zlcj17aGFuZGxlTWFudWFsRGF5SG92ZXJ9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICl9XG5cclxuICAgICAgICAgIDxDbGllbnRTZWFyY2hDb21ib2JveFxyXG4gICAgICAgICAgICBrZXk9e2NsaWVudFJlc2V0S2V5fVxyXG4gICAgICAgICAgICB2YWx1ZT17c2VsZWN0ZWRDbGllbnR9XHJcbiAgICAgICAgICAgIG9uU2VsZWN0ZWQ9e2hhbmRsZUNsaWVudFNlbGVjdGVkfVxyXG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIkhpc3RvcnlfRmlsdGVyX0NsaWVudFwiLCBcIkNsaWVudFwiKX1cclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJIaXN0b3J5X0ZpbHRlcl9DbGllbnRcIiwgXCJDbGllbnRcIil9XHJcbiAgICAgICAgICAgIHZhcmlhbnQ9XCJjb21wYWN0XCJcclxuICAgICAgICAgICAgc2hvd0xhYmVsPXtmYWxzZX1cclxuICAgICAgICAgICAgaWRCYXNlPVwiaGlzdG9yeS1jbGllbnRcIlxyXG4gICAgICAgICAgICBwb3J0YWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxyXG4gICAgICAgICAgLz5cclxuXHJcbiAgICAgICAgICB7c2hvd0ZpbHRlckFjdGlvbnMgJiYgKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTEgZ3JpZCBncmlkLWNvbHMtMiBnYXAtMiBoaXN0b3J5LWZpbHRlci1hY3Rpb25zXCI+XG4gICAgICAgICAgICAgIDxBY3Rpb25CdXR0b25cbiAgICAgICAgICAgICAgICBsYWJlbD17Y2xlYXJMYWJlbH1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGxcIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZVJlc2V0RmlsdGVyc31cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPEFjdGlvbkJ1dHRvblxuICAgICAgICAgICAgICAgIGxhYmVsPXthcHBseUxhYmVsfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbFwiXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgYXBwbHlGaWx0ZXJzKHsgY2xvc2VQYW5lbDogdHJ1ZSwgcGFnZTogMSB9KTtcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICApfVxyXG5cclxuICAgICAgPGlucHV0IHR5cGU9XCJoaWRkZW5cIiBpZD1cImZyb21EYXRlXCIgdmFsdWU9e2Zyb21EYXRlVmFsdWV9IHJlYWRPbmx5IC8+XHJcbiAgICAgIDxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgaWQ9XCJ0b0RhdGVcIiB2YWx1ZT17dG9EYXRlVmFsdWV9IHJlYWRPbmx5IC8+XHJcblxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgaWQ9XCJyZXN1bHRzTG9hZGVyXCJcclxuICAgICAgICBjbGFzc05hbWU9XCJsb2FkZXItYm94IGdsYXNzLXBhbmVsIHNoYWRvdy1jYXJkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQtc20gdGV4dC1zbGF0ZS03MDBcIlxyXG4gICAgICAgIHN0eWxlPXt7IGRpc3BsYXk6IGlzTG9hZGluZyA/IFwiZmxleFwiIDogXCJub25lXCIgfX1cclxuICAgICAgPlxyXG4gICAgICAgIDxzdmcgY2xhc3NOYW1lPVwiaW5kLXNwaW5uZXIgaC01IHctNVwiIHZpZXdCb3g9XCIwIDAgMjAgMjBcIiByb2xlPVwic3RhdHVzXCIgYXJpYS1sYWJlbD17aW5kVChcIkhpc3RvcnlfTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9PlxyXG4gICAgICAgICAgPGNpcmNsZSBjbGFzc05hbWU9XCJpbmQtc3Bpbm5lcl9fY2lyY2xlXCIgY3g9XCIxMFwiIGN5PVwiMTBcIiByPVwiOFwiIHN0cm9rZVdpZHRoPVwiMlwiIC8+XHJcbiAgICAgICAgPC9zdmc+XHJcbiAgICAgICAge2luZFQoXCJIaXN0b3J5X0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfVxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIHtzaG93UmVzdWx0cyAmJiAoXHJcbiAgICAgICAgPD5cclxuICAgICAgICAgIDxIaXN0b3J5VGFibGVcclxuICAgICAgICAgICAgaXRlbXM9e3RpbWVsaW5lSXRlbXN9XHJcbiAgICAgICAgICAgIG5vRGF0YVRleHQ9e2luZFQoXCJIaXN0b3J5X05vRGF0YUluUmFuZ2VcIiwgXCJObyB2aXNpdHMgaW4gdGhpcyByYW5nZVwiKX1cclxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlPXtlcnJvck1lc3NhZ2V9XHJcbiAgICAgICAgICAgIG9uTmF2aWdhdGU9e2hhbmRsZU5hdmlnYXRlfVxyXG4gICAgICAgICAgLz5cclxuXHJcbiAgICAgICAgICA8Q29tcGFjdFBhZ2luYXRpb25cbiAgICAgICAgICAgIHJlZj17cGFnaW5hdGlvblJlZn1cbiAgICAgICAgICAgIHRvdGFsUGFnZXM9e3RvdGFsUGFnZXN9XG4gICAgICAgICAgICBjdXJyZW50UGFnZT17Y3VycmVudFBhZ2V9XG4gICAgICAgICAgICBwYWdlV2luZG93PXtQQUdFX1dJTkRPV31cbiAgICAgICAgICAgIG9uUGFnZUNoYW5nZT17KHBhZ2UpID0+IGxvYWRBY3Rpdml0aWVzKHBhZ2UpfVxuICAgICAgICAgICAgbGFiZWxzPXtwYWdpbmF0aW9uTGFiZWxzfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvPlxuICAgICAgKX1cbiAgICAgIHtjYW5DcmVhdGVWaXNpdCAmJiAoXHJcbiAgICAgICAgPEZsb2F0aW5nQWN0aW9uQnV0dG9uXG4gICAgICAgICAgcm91dGU9XCIvVmlzaXRhcy9DcmVhdGU/ZnJlc2g9MVwiXG4gICAgICAgICAgYXJpYUxhYmVsPXtpbmRUKFwiQ29tbW9uX0NyZWF0ZVwiLCBcIkNyZWF0ZVwiKX1cbiAgICAgICAgICBzaXplPXs3Nn1cbiAgICAgICAgICByaWdodD17MTZ9XG4gICAgICAgICAgYm90dG9tPXtmYWJCb3R0b219XG4gICAgICAgIC8+XG4gICAgICApfVxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG4vLyBNb3VudCBoZWxwZXIgZm9yIHRoZSBsZWdhY3kgUmF6b3Igdmlldy5cbmV4cG9ydCBjb25zdCBtb3VudEhpc3RvcnlQYWdlID0gKHJvb3Q6IEhUTUxFbGVtZW50KSA9PiB7XG4gIGNvbnN0IGRlZmF1bHRGcm9tRGF0ZSA9IHJvb3QuZ2V0QXR0cmlidXRlKFwiZGF0YS1kZWZhdWx0LWZyb21cIikgfHwgXCJcIjtcbiAgY29uc3QgZGVmYXVsdFRvRGF0ZSA9IHJvb3QuZ2V0QXR0cmlidXRlKFwiZGF0YS1kZWZhdWx0LXRvXCIpIHx8IFwiXCI7XG5cbiAgbW91bnRSZWFjdElzbGFuZChyb290LCA8SGlzdG9yeVBhZ2UgZGVmYXVsdEZyb21EYXRlPXtkZWZhdWx0RnJvbURhdGV9IGRlZmF1bHRUb0RhdGU9e2RlZmF1bHRUb0RhdGV9IC8+KTtcbn07XG5cclxuY29uc3QgbW91bnQgPSAoKSA9PiB7XG4gIGNvbnN0IHJvb3RFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlzaXRhcy1oaXN0b3J5LXJvb3RcIik7XG4gIGlmICghcm9vdEVsKSByZXR1cm47XG4gIG1vdW50SGlzdG9yeVBhZ2Uocm9vdEVsKTtcbn07XG5cbm1vdW50V2hlbkRvY3VtZW50UmVhZHkobW91bnQpO1xuXG5leHBvcnQgZGVmYXVsdCBIaXN0b3J5UGFnZTtcbiIsICJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2ssIHVzZVJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgY2xhc3NOYW1lcyB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9jbGFzc05hbWVzLnRzXCI7XG5pbXBvcnQgeyB1c2VUaW1lbGluZUNhcmRFZmZlY3RzIH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZVRpbWVsaW5lQ2FyZEVmZmVjdHMudHNcIjtcblxyXG5leHBvcnQgdHlwZSBUaW1lbGluZURhdGVQYXJ0cyA9IHtcclxuICB5ZWFyOiBzdHJpbmc7XHJcbiAgbW9udGg6IHN0cmluZztcclxuICBkYXk6IHN0cmluZztcclxufTtcclxuXHJcbmV4cG9ydCB0eXBlIFRpbWVsaW5lSXRlbSA9IHtcclxuICBpZDogc3RyaW5nO1xyXG4gIGFjdGl2aWRhZElkPzogc3RyaW5nO1xyXG4gIHJlY0lkPzogbnVtYmVyIHwgbnVsbDtcclxuICBuYW1lOiBzdHJpbmc7XHJcbiAgZGVzY3JpcHRpb246IHN0cmluZztcclxuICBmdWxsTmFtZTogc3RyaW5nO1xyXG4gIGZ1bGxEZXNjOiBzdHJpbmc7XHJcbiAgZGF0ZVBhcnRzOiBUaW1lbGluZURhdGVQYXJ0cztcclxuICBpc05vRGF0YTogYm9vbGVhbjtcclxufTtcclxuXHJcbnR5cGUgUHJvcHMgPSB7XHJcbiAgaXRlbXM6IFRpbWVsaW5lSXRlbVtdO1xyXG4gIG5vRGF0YVRleHQ6IHN0cmluZztcclxuICBlcnJvck1lc3NhZ2U6IHN0cmluZztcclxuICBvbk5hdmlnYXRlOiAobGlua0lkOiBzdHJpbmcpID0+IHZvaWQ7XHJcbn07XHJcblxyXG5jb25zdCBUQVBfTU9WRV9QWCA9IDE0O1xuY29uc3QgSE9MRF9UT19QUkVWSUVXX01TID0gMTYwO1xuXHJcbnR5cGUgVGFwR3VhcmRTdGF0ZSA9IHtcbiAgYWN0aXZlOiBib29sZWFuO1xuICBwb2ludGVySWQ6IG51bWJlciB8IG51bGw7XG4gIHN0YXJ0WDogbnVtYmVyO1xuICBzdGFydFk6IG51bWJlcjtcbiAgc3RhcnRUaW1lOiBudW1iZXI7XG4gIG1vdmVkOiBib29sZWFuO1xuICBsaW5rSWQ6IHN0cmluZztcbn07XG5cclxuY29uc3QgSGlzdG9yeVRhYmxlID0gKHsgaXRlbXMsIG5vRGF0YVRleHQsIGVycm9yTWVzc2FnZSwgb25OYXZpZ2F0ZSB9OiBQcm9wcykgPT4ge1xuICBjb25zdCBjb250YWluZXJSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgdGFwR3VhcmRSZWYgPSB1c2VSZWY8VGFwR3VhcmRTdGF0ZT4oe1xuICAgIGFjdGl2ZTogZmFsc2UsXG4gICAgcG9pbnRlcklkOiBudWxsLFxuICAgIHN0YXJ0WDogMCxcbiAgICBzdGFydFk6IDAsXG4gICAgc3RhcnRUaW1lOiAwLFxuICAgIG1vdmVkOiBmYWxzZSxcbiAgICBsaW5rSWQ6IFwiXCIsXG4gIH0pO1xuXG4gIGNvbnN0IHJlc29sdmVDbGlja2FibGVDYXJkID0gdXNlQ2FsbGJhY2soKHRhcmdldDogRXZlbnRUYXJnZXQgfCBudWxsKSA9PiB7XG4gICAgY29uc3Qgbm9kZSA9IHRhcmdldCBhcyBIVE1MRWxlbWVudCB8IG51bGw7XG4gICAgaWYgKCFub2RlIHx8IHR5cGVvZiBub2RlLmNsb3Nlc3QgIT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIG51bGw7XG4gICAgY29uc3QgY2FyZCA9IG5vZGUuY2xvc2VzdDxIVE1MRWxlbWVudD4oXCIudGltZWxpbmUtY2FyZC0tY2xpY2thYmxlW2RhdGEtbGluay1pZF1cIik7XG4gICAgaWYgKCFjYXJkKSByZXR1cm4gbnVsbDtcbiAgICBpZiAoIWNvbnRhaW5lclJlZi5jdXJyZW50Py5jb250YWlucyhjYXJkKSkgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuIGNhcmQ7XG4gIH0sIFtdKTtcblxuICBjb25zdCByZXNldFRhcEd1YXJkID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIHRhcEd1YXJkUmVmLmN1cnJlbnQuYWN0aXZlID0gZmFsc2U7XG4gICAgdGFwR3VhcmRSZWYuY3VycmVudC5wb2ludGVySWQgPSBudWxsO1xuICAgIHRhcEd1YXJkUmVmLmN1cnJlbnQubW92ZWQgPSBmYWxzZTtcbiAgICB0YXBHdWFyZFJlZi5jdXJyZW50LmxpbmtJZCA9IFwiXCI7XG4gIH0sIFtdKTtcblxuICBjb25zdCBoYW5kbGVQb2ludGVyRG93biA9IHVzZUNhbGxiYWNrKFxuICAgIChldmVudDogUmVhY3QuUG9pbnRlckV2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4ge1xuICAgICAgaWYgKGV2ZW50LnBvaW50ZXJUeXBlID09PSBcIm1vdXNlXCIgJiYgZXZlbnQuYnV0dG9uICE9PSAwKSByZXR1cm47XG4gICAgICBjb25zdCBjYXJkID0gcmVzb2x2ZUNsaWNrYWJsZUNhcmQoZXZlbnQudGFyZ2V0KTtcbiAgICAgIGlmICghY2FyZCkgcmV0dXJuO1xuICAgICAgY29uc3QgbGlua0lkID0gY2FyZC5kYXRhc2V0LmxpbmtJZCB8fCBcIlwiO1xuICAgICAgaWYgKCFsaW5rSWQpIHJldHVybjtcblxuICAgICAgdGFwR3VhcmRSZWYuY3VycmVudC5hY3RpdmUgPSB0cnVlO1xuICAgICAgdGFwR3VhcmRSZWYuY3VycmVudC5wb2ludGVySWQgPSBldmVudC5wb2ludGVySWQ7XG4gICAgICB0YXBHdWFyZFJlZi5jdXJyZW50LnN0YXJ0WCA9IGV2ZW50LmNsaWVudFg7XG4gICAgICB0YXBHdWFyZFJlZi5jdXJyZW50LnN0YXJ0WSA9IGV2ZW50LmNsaWVudFk7XG4gICAgICB0YXBHdWFyZFJlZi5jdXJyZW50LnN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgICB0YXBHdWFyZFJlZi5jdXJyZW50Lm1vdmVkID0gZmFsc2U7XG4gICAgICB0YXBHdWFyZFJlZi5jdXJyZW50LmxpbmtJZCA9IGxpbmtJZDtcbiAgICB9LFxuICAgIFtyZXNvbHZlQ2xpY2thYmxlQ2FyZF1cbiAgKTtcblxuICBjb25zdCBoYW5kbGVQb2ludGVyTW92ZSA9IHVzZUNhbGxiYWNrKChldmVudDogUmVhY3QuUG9pbnRlckV2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4ge1xuICAgIGNvbnN0IHN0YXRlID0gdGFwR3VhcmRSZWYuY3VycmVudDtcbiAgICBpZiAoIXN0YXRlLmFjdGl2ZSB8fCBldmVudC5wb2ludGVySWQgIT09IHN0YXRlLnBvaW50ZXJJZCkgcmV0dXJuO1xuICAgIGNvbnN0IGR4ID0gTWF0aC5hYnMoZXZlbnQuY2xpZW50WCAtIHN0YXRlLnN0YXJ0WCk7XG4gICAgY29uc3QgZHkgPSBNYXRoLmFicyhldmVudC5jbGllbnRZIC0gc3RhdGUuc3RhcnRZKTtcbiAgICBpZiAoZHggPiBUQVBfTU9WRV9QWCB8fCBkeSA+IFRBUF9NT1ZFX1BYKSB7XG4gICAgICBzdGF0ZS5tb3ZlZCA9IHRydWU7XG4gICAgfVxuICB9LCBbXSk7XG5cbiAgY29uc3QgaGFuZGxlUG9pbnRlclVwID0gdXNlQ2FsbGJhY2soXG4gICAgKGV2ZW50OiBSZWFjdC5Qb2ludGVyRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB7XG4gICAgICBjb25zdCBzdGF0ZSA9IHRhcEd1YXJkUmVmLmN1cnJlbnQ7XG4gICAgICBpZiAoIXN0YXRlLmFjdGl2ZSB8fCBldmVudC5wb2ludGVySWQgIT09IHN0YXRlLnBvaW50ZXJJZCkgcmV0dXJuO1xuICAgICAgY29uc3QgbGlua0lkID0gc3RhdGUubGlua0lkO1xuICAgICAgY29uc3QgaGVsZE1zID0gRGF0ZS5ub3coKSAtIHN0YXRlLnN0YXJ0VGltZTtcbiAgICAgIGNvbnN0IHNob3VsZFRhcCA9ICFzdGF0ZS5tb3ZlZCAmJiBoZWxkTXMgPCBIT0xEX1RPX1BSRVZJRVdfTVM7XG4gICAgICByZXNldFRhcEd1YXJkKCk7XG4gICAgICBpZiAoc2hvdWxkVGFwICYmIGxpbmtJZCkge1xuICAgICAgICBvbk5hdmlnYXRlKGxpbmtJZCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBbb25OYXZpZ2F0ZSwgcmVzZXRUYXBHdWFyZF1cbiAgKTtcblxuICBjb25zdCBibG9ja0NsaXBib2FyZEFjdGlvbiA9IHVzZUNhbGxiYWNrKFxuICAgIChldmVudDogUmVhY3QuQ2xpcGJvYXJkRXZlbnQ8SFRNTERpdkVsZW1lbnQ+IHwgUmVhY3QuTW91c2VFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHtcbiAgICAgIGlmICghcmVzb2x2ZUNsaWNrYWJsZUNhcmQoZXZlbnQudGFyZ2V0KSkgcmV0dXJuO1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9LFxuICAgIFtyZXNvbHZlQ2xpY2thYmxlQ2FyZF1cbiAgKTtcblxuICB1c2VUaW1lbGluZUNhcmRFZmZlY3RzKHsgY29udGFpbmVyUmVmLCBlcnJvck1lc3NhZ2UsIGl0ZW1zLCByZXNvbHZlQ2xpY2thYmxlQ2FyZCB9KTtcblxyXG4gIGNvbnN0IGhhc0l0ZW1zID0gaXRlbXMubGVuZ3RoID4gMDtcclxuICBjb25zdCBzaG93RW1wdHkgPSAhZXJyb3JNZXNzYWdlICYmICFoYXNJdGVtcztcclxuXHJcbiAgY29uc3QgY29udGVudCA9IGVycm9yTWVzc2FnZSA/IChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1kYW5nZXJcIj57ZXJyb3JNZXNzYWdlfTwvZGl2PlxyXG4gICkgOiBoYXNJdGVtcyA/IChcclxuICAgIGl0ZW1zLm1hcCgoaXRlbSwgaW5kZXgpID0+IHtcclxuICAgICAgY29uc3Qga2V5ID0gaXRlbS5pZCB8fCBpdGVtLnJlY0lkPy50b1N0cmluZygpIHx8IGB0aW1lbGluZS0ke2luZGV4fWA7XHJcbiAgICAgIGNvbnN0IGlzQ2xpY2thYmxlID0gIWl0ZW0uaXNOb0RhdGEgJiYgISFpdGVtLmlkO1xyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgIDxkaXYga2V5PXtrZXl9IGNsYXNzTmFtZT1cInRpbWVsaW5lLWl0ZW1cIj5cclxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgICAgICAgXCJ0aW1lbGluZS1jYXJkXCIsXG4gICAgICAgICAgICAgIGl0ZW0uaXNOb0RhdGEgPyBcInRpbWVsaW5lLWNhcmQtLW5vZGF0YVwiIDogXCJcIixcbiAgICAgICAgICAgICAgaXNDbGlja2FibGUgPyBcInRpbWVsaW5lLWNhcmQtLWNsaWNrYWJsZVwiIDogXCJcIlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIGRhdGEtYWN0aXZpZGFkaWQ9e2l0ZW0uYWN0aXZpZGFkSWQgfHwgXCJcIn1cbiAgICAgICAgICAgIGRhdGEtcmVjaWQ9e2l0ZW0ucmVjSWQgIT0gbnVsbCA/IFN0cmluZyhpdGVtLnJlY0lkKSA6IFwiXCJ9XG4gICAgICAgICAgICBkYXRhLWxpbmstaWQ9e2lzQ2xpY2thYmxlID8gaXRlbS5pZCA6IFwiXCJ9XG4gICAgICAgICAgICByb2xlPXtpc0NsaWNrYWJsZSA/IFwiYnV0dG9uXCIgOiB1bmRlZmluZWR9XG4gICAgICAgICAgICB0YWJJbmRleD17aXNDbGlja2FibGUgPyAwIDogdW5kZWZpbmVkfVxuICAgICAgICAgICAgYXJpYS1sYWJlbD17aXNDbGlja2FibGUgPyAoaXRlbS5mdWxsTmFtZSB8fCBpdGVtLm5hbWUgfHwgbm9EYXRhVGV4dCkgOiB1bmRlZmluZWR9XG4gICAgICAgICAgICBvbktleURvd249e2lzQ2xpY2thYmxlXG4gICAgICAgICAgICAgID8gKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gXCJFbnRlclwiIHx8IGV2ZW50LmtleSA9PT0gXCIgXCIpIHtcbiAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICBvbk5hdmlnYXRlKGl0ZW0uaWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICA6IHVuZGVmaW5lZH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpbWVsaW5lLWRhdGUtcGFuZWwgZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTEgcHgtMyBweS0zIGJnLXNsYXRlLTUwIGJvcmRlci1yIGJvcmRlci1zbGF0ZS0yMDAgdGV4dC1zbGF0ZS02MDBcIj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1zZW1pYm9sZCB0cmFja2luZy1bMC4yZW1dIHRleHQtc2xhdGUtNTAwXCI+e2l0ZW0uZGF0ZVBhcnRzLnllYXJ9PC9kaXY+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdXBwZXJjYXNlIHRyYWNraW5nLVswLjJlbV0gdGV4dC1zbGF0ZS01MDBcIj57aXRlbS5kYXRlUGFydHMubW9udGh9PC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC0yeGwgZm9udC1zZW1pYm9sZCB0ZXh0LXByaW1hcnlcIj57aXRlbS5kYXRlUGFydHMuZGF5fTwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aW1lbGluZS1jYXJkX19jb250ZW50IGZsZXgtMSBweS0zIHB4LTRcIj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpbWVsaW5lLW5hbWVcIiBkYXRhLWZ1bGx0ZXh0PXtpdGVtLmZ1bGxOYW1lIHx8IGl0ZW0ubmFtZX0+e2l0ZW0ubmFtZX08L2Rpdj5cclxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0aW1lbGluZS1kZXNjLXRleHRcIiBkYXRhLWZ1bGx0ZXh0PXtpdGVtLmZ1bGxEZXNjIHx8IGl0ZW0uZGVzY3JpcHRpb259PntpdGVtLmRlc2NyaXB0aW9uIHx8IG5vRGF0YVRleHR9PC9wPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApO1xyXG4gICAgfSlcclxuICApIDogbnVsbDtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXZcbiAgICAgIGlkPVwidGltZWxpbmVDb250YWluZXJcIlxuICAgICAgcmVmPXtjb250YWluZXJSZWZ9XG4gICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXCJ0aW1lbGluZS1ib3hcIiwgc2hvd0VtcHR5ID8gXCJ0aW1lbGluZS1lbXB0eVwiIDogXCJcIil9XG4gICAgICBkYXRhLWVtcHR5LXRleHQ9e25vRGF0YVRleHR9XG4gICAgICBvblBvaW50ZXJEb3duQ2FwdHVyZT17aGFuZGxlUG9pbnRlckRvd259XG4gICAgICBvblBvaW50ZXJNb3ZlQ2FwdHVyZT17aGFuZGxlUG9pbnRlck1vdmV9XG4gICAgICBvblBvaW50ZXJVcENhcHR1cmU9e2hhbmRsZVBvaW50ZXJVcH1cbiAgICAgIG9uUG9pbnRlckNhbmNlbENhcHR1cmU9e3Jlc2V0VGFwR3VhcmR9XG4gICAgICBvblBvaW50ZXJMZWF2ZT17cmVzZXRUYXBHdWFyZH1cbiAgICAgIG9uQ29udGV4dE1lbnVDYXB0dXJlPXtibG9ja0NsaXBib2FyZEFjdGlvbn1cbiAgICAgIG9uQ29weUNhcHR1cmU9e2Jsb2NrQ2xpcGJvYXJkQWN0aW9ufVxuICAgICAgb25DdXRDYXB0dXJlPXtibG9ja0NsaXBib2FyZEFjdGlvbn1cbiAgICAgIG9uUGFzdGVDYXB0dXJlPXtibG9ja0NsaXBib2FyZEFjdGlvbn1cbiAgICA+XG4gICAgICB7Y29udGVudH1cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmNvbnN0IE1lbW9pemVkSGlzdG9yeVRhYmxlID0gUmVhY3QubWVtbyhIaXN0b3J5VGFibGUpO1xuTWVtb2l6ZWRIaXN0b3J5VGFibGUuZGlzcGxheU5hbWUgPSBcIkhpc3RvcnlUYWJsZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBNZW1vaXplZEhpc3RvcnlUYWJsZTtcbiIsICJcdUZFRkZpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgdHlwZSB7IEhpc3RvcnlDYWNoZWRGaWx0ZXIgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlSGlzdG9yeUZpbHRlckNhY2hlLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEZpbHRlckxvYWRSZXF1ZXN0LCBMb2FkT3ZlcnJpZGUgfSBmcm9tIFwiLi91c2VIaXN0b3J5RmlsdGVyc1N0YXRlLnRzXCI7XG5cbnR5cGUgVXNlSGlzdG9yeVBhZ2VMaXN0ZW5lcnNBcmdzID0ge1xuICBpc09wZW46IGJvb2xlYW47XG4gIGFjdGl2YXRvclJlZjogUmVhY3QuUmVmT2JqZWN0PEhUTUxEaXZFbGVtZW50IHwgbnVsbD47XG4gIHBvcG92ZXJSZWY6IFJlYWN0LlJlZk9iamVjdDxIVE1MRGl2RWxlbWVudCB8IG51bGw+O1xuICBwYWdpbmF0aW9uUmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTERpdkVsZW1lbnQgfCBudWxsPjtcbiAgaGFzUmVzdG9yZWRGaWx0ZXJSZWY6IFJlYWN0Lk11dGFibGVSZWZPYmplY3Q8Ym9vbGVhbj47XG4gIHJldHJ5T25OZXR3b3JrRXJyb3JSZWY6IFJlYWN0Lk11dGFibGVSZWZPYmplY3Q8Ym9vbGVhbj47XG4gIGN1cnJlbnRQYWdlOiBudW1iZXI7XG4gIHVwZGF0ZUZhYkJvdHRvbTogKCkgPT4gdm9pZDtcbiAgbG9nSGlzdG9yeTogKG1lc3NhZ2U6IHN0cmluZywgZGF0YT86IFJlY29yZDxzdHJpbmcsIHVua25vd24+KSA9PiB2b2lkO1xuICBjb25zdW1lUmV0dXJuRmxhZzogKCkgPT4gYm9vbGVhbjtcbiAgcmVhZENhY2hlZEZpbHRlcjogKCkgPT4gSGlzdG9yeUNhY2hlZEZpbHRlciB8IG51bGw7XG4gIGFwcGx5Q2FjaGVkRmlsdGVyOiAoZmlsdGVyOiBIaXN0b3J5Q2FjaGVkRmlsdGVyIHwgbnVsbCkgPT4gRmlsdGVyTG9hZFJlcXVlc3QgfCBudWxsO1xuICBsb2FkQWN0aXZpdGllczogKHBhZ2U6IG51bWJlciwgb3ZlcnJpZGU/OiBMb2FkT3ZlcnJpZGUpID0+IHZvaWQ7XG4gIHNldElzT3BlbjogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248Ym9vbGVhbj4+O1xuICBzZXRIb3ZlckRhdGU6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPERhdGUgfCBudWxsPj47XG4gIHNldFNob3dGaWx0ZXJzOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxib29sZWFuPj47XG4gIGFwcGx5RmlsdGVyczogKG9wdGlvbnM/OiB7IGNsb3NlUGFuZWw/OiBib29sZWFuOyBmb3JjZT86IGJvb2xlYW47IHBhZ2U/OiBudW1iZXIgfSkgPT4gdm9pZDtcbn07XG5cbi8vIEhhbmRsZXMgZ2xvYmFsIGxpc3RlbmVycyB1c2VkIGJ5IHRoZSBoaXN0b3J5IHBhZ2UgZmlsdGVycyBhbmQgY2FsZW5kYXIgVUkuXG5leHBvcnQgY29uc3QgdXNlSGlzdG9yeVBhZ2VMaXN0ZW5lcnMgPSAoe1xuICBpc09wZW4sXG4gIGFjdGl2YXRvclJlZixcbiAgcG9wb3ZlclJlZixcbiAgcGFnaW5hdGlvblJlZixcbiAgaGFzUmVzdG9yZWRGaWx0ZXJSZWYsXG4gIHJldHJ5T25OZXR3b3JrRXJyb3JSZWYsXG4gIGN1cnJlbnRQYWdlLFxuICB1cGRhdGVGYWJCb3R0b20sXG4gIGxvZ0hpc3RvcnksXG4gIGNvbnN1bWVSZXR1cm5GbGFnLFxuICByZWFkQ2FjaGVkRmlsdGVyLFxuICBhcHBseUNhY2hlZEZpbHRlcixcbiAgbG9hZEFjdGl2aXRpZXMsXG4gIHNldElzT3BlbixcbiAgc2V0SG92ZXJEYXRlLFxuICBzZXRTaG93RmlsdGVycyxcbiAgYXBwbHlGaWx0ZXJzLFxufTogVXNlSGlzdG9yeVBhZ2VMaXN0ZW5lcnNBcmdzKSA9PiB7XG4gIC8vIENsb3NlIHRoZSBtYW51YWwgcGlja2VyIHdoZW4gY2xpY2tpbmcgb3V0c2lkZSBvZiB0aGUgcmFuZ2UgcGlja2VyIFVJLlxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghaXNPcGVuKSByZXR1cm47XG5cbiAgICBjb25zdCBoYW5kbGVPdXRzaWRlID0gKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQgYXMgTm9kZSB8IG51bGw7XG4gICAgICBpZiAoIXRhcmdldCkgcmV0dXJuO1xuICAgICAgaWYgKHBvcG92ZXJSZWYuY3VycmVudD8uY29udGFpbnModGFyZ2V0KSkgcmV0dXJuO1xuICAgICAgaWYgKGFjdGl2YXRvclJlZi5jdXJyZW50Py5jb250YWlucyh0YXJnZXQpKSByZXR1cm47XG4gICAgICBsb2dIaXN0b3J5KFwiY2xvc2VQb3BvdmVyOm91dHNpZGVcIik7XG4gICAgICBzZXRJc09wZW4oZmFsc2UpO1xuICAgICAgc2V0SG92ZXJEYXRlKG51bGwpO1xuICAgIH07XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGhhbmRsZU91dHNpZGUpO1xuICAgIHJldHVybiAoKSA9PiBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGhhbmRsZU91dHNpZGUpO1xuICB9LCBbYWN0aXZhdG9yUmVmLCBpc09wZW4sIGxvZ0hpc3RvcnksIHBvcG92ZXJSZWYsIHNldEhvdmVyRGF0ZSwgc2V0SXNPcGVuXSk7XG5cbiAgLy8gUmUtYXBwbHkgZmlsdGVycyBhZnRlciBicm93c2VyIGJhY2svZm9yd2FyZCBuYXZpZ2F0aW9uIHJldHVybnMgdG8gdGhlIHBhZ2UuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3Qgb25QYWdlU2hvdyA9ICgpID0+IHtcbiAgICAgIGlmIChoYXNSZXN0b3JlZEZpbHRlclJlZi5jdXJyZW50KSByZXR1cm47XG4gICAgICBpZiAoY29uc3VtZVJldHVybkZsYWcoKSkge1xuICAgICAgICBjb25zdCBjYWNoZWQgPSByZWFkQ2FjaGVkRmlsdGVyKCk7XG4gICAgICAgIGNvbnN0IGNhY2hlZFJlcXVlc3QgPSBhcHBseUNhY2hlZEZpbHRlcihjYWNoZWQpO1xuICAgICAgICBpZiAoY2FjaGVkUmVxdWVzdCkge1xuICAgICAgICAgIHJldHJ5T25OZXR3b3JrRXJyb3JSZWYuY3VycmVudCA9IHRydWU7XG4gICAgICAgICAgbG9hZEFjdGl2aXRpZXMoY2FjaGVkUmVxdWVzdC5wYWdlLCBjYWNoZWRSZXF1ZXN0Lm92ZXJyaWRlKTtcbiAgICAgICAgICBzZXRTaG93RmlsdGVycyhmYWxzZSk7XG4gICAgICAgICAgc2V0SXNPcGVuKGZhbHNlKTtcbiAgICAgICAgICBoYXNSZXN0b3JlZEZpbHRlclJlZi5jdXJyZW50ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInBhZ2VzaG93XCIsIG9uUGFnZVNob3cpO1xuICAgIHJldHVybiAoKSA9PiB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInBhZ2VzaG93XCIsIG9uUGFnZVNob3cpO1xuICB9LCBbXG4gICAgYXBwbHlDYWNoZWRGaWx0ZXIsXG4gICAgY29uc3VtZVJldHVybkZsYWcsXG4gICAgaGFzUmVzdG9yZWRGaWx0ZXJSZWYsXG4gICAgbG9hZEFjdGl2aXRpZXMsXG4gICAgcmVhZENhY2hlZEZpbHRlcixcbiAgICByZXRyeU9uTmV0d29ya0Vycm9yUmVmLFxuICAgIHNldElzT3BlbixcbiAgICBzZXRTaG93RmlsdGVycyxcbiAgXSk7XG5cbiAgLy8gS2VlcCBmbG9hdGluZyBhY3Rpb24gYnV0dG9uIGNsZWFyIG9mIHBhZ2luYXRpb24gYW5kIHJlYWN0IHRvIGxheW91dCBjaGFuZ2VzLlxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHVwZGF0ZUZhYkJvdHRvbSgpO1xuXG4gICAgbGV0IG9ic2VydmVyOiBSZXNpemVPYnNlcnZlciB8IG51bGwgPSBudWxsO1xuICAgIGNvbnN0IHBhZ2luYXRpb25FbCA9IHBhZ2luYXRpb25SZWYuY3VycmVudDtcbiAgICBpZiAocGFnaW5hdGlvbkVsICYmIHR5cGVvZiBSZXNpemVPYnNlcnZlciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgb2JzZXJ2ZXIgPSBuZXcgUmVzaXplT2JzZXJ2ZXIoKCkgPT4gdXBkYXRlRmFiQm90dG9tKCkpO1xuICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShwYWdpbmF0aW9uRWwpO1xuICAgIH1cblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHVwZGF0ZUZhYkJvdHRvbSk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHVwZGF0ZUZhYkJvdHRvbSk7XG4gICAgICBpZiAob2JzZXJ2ZXIpIG9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICB9O1xuICB9LCBbcGFnaW5hdGlvblJlZiwgdXBkYXRlRmFiQm90dG9tXSk7XG5cbiAgLy8gV2lyZSB0b3BiYXIgYWN0aW9ucyB0aGF0IHRvZ2dsZSBmaWx0ZXJzIG9yIGZvcmNlIHJlZnJlc2ggb2YgY3VycmVudCBwYWdlLlxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IG9uVG9nZ2xlRmlsdGVycyA9ICgpID0+IHtcbiAgICAgIHNldFNob3dGaWx0ZXJzKChwcmV2KSA9PiB7XG4gICAgICAgIGNvbnN0IG5leHQgPSAhcHJldjtcbiAgICAgICAgaWYgKCFuZXh0KSB7XG4gICAgICAgICAgc2V0SXNPcGVuKGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBjb25zdCBvblJlZnJlc2ggPSAoKSA9PiB7XG4gICAgICBhcHBseUZpbHRlcnMoeyBwYWdlOiBjdXJyZW50UGFnZSwgZm9yY2U6IHRydWUsIGNsb3NlUGFuZWw6IHRydWUgfSk7XG4gICAgfTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiaGlzdG9yeS10b2dnbGUtZmlsdGVyXCIsIG9uVG9nZ2xlRmlsdGVycyk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJoaXN0b3J5LXJlZnJlc2hcIiwgb25SZWZyZXNoKTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImhpc3RvcnktdG9nZ2xlLWZpbHRlclwiLCBvblRvZ2dsZUZpbHRlcnMpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJoaXN0b3J5LXJlZnJlc2hcIiwgb25SZWZyZXNoKTtcbiAgICB9O1xuICB9LCBbYXBwbHlGaWx0ZXJzLCBjdXJyZW50UGFnZSwgc2V0SXNPcGVuLCBzZXRTaG93RmlsdGVyc10pO1xufTtcclxuIiwgIlx1RkVGRmltcG9ydCBSZWFjdCwgeyB1c2VNZW1vLCB1c2VSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB0eXBlIHsgVGltZWxpbmVJdGVtIH0gZnJvbSBcIi4vSGlzdG9yeVRhYmxlLnRzeFwiO1xuXG50eXBlIEFjdGl2aXR5UmVjb3JkID0gUmVjb3JkPHN0cmluZywgdW5rbm93bj47XG5cbnR5cGUgVXNlSGlzdG9yeVRpbWVsaW5lSXRlbXNBcmdzID0ge1xuICBpdGVtczogQWN0aXZpdHlSZWNvcmRbXTtcbiAgbG9jYWxlOiBzdHJpbmc7XG4gIG5vRGF0YVRleHQ6IHN0cmluZztcbiAgbG9nSGlzdG9yeTogKG1lc3NhZ2U6IHN0cmluZywgZGF0YT86IFJlY29yZDxzdHJpbmcsIHVua25vd24+KSA9PiB2b2lkO1xuICB0b1RpdGxlQ2FzZTogKHZhbHVlOiBzdHJpbmcsIGxvY2FsZTogc3RyaW5nKSA9PiBzdHJpbmc7XG4gIGZvcm1hdERhdGVQYXJ0czogKHZhbHVlOiBzdHJpbmcsIGxvY2FsZTogc3RyaW5nKSA9PiB7IHllYXI6IHN0cmluZzsgbW9udGg6IHN0cmluZzsgZGF5OiBzdHJpbmcgfTtcbn07XG5cbi8vIE1hcHMgcmF3IGhpc3RvcnkgcGF5bG9hZCBpdGVtcyBpbnRvIHRpbWVsaW5lIGNhcmRzIHVzZWQgYnkgSGlzdG9yeVRhYmxlLlxuZXhwb3J0IGNvbnN0IHVzZUhpc3RvcnlUaW1lbGluZUl0ZW1zID0gKHtcbiAgaXRlbXMsXG4gIGxvY2FsZSxcbiAgbm9EYXRhVGV4dCxcbiAgbG9nSGlzdG9yeSxcbiAgdG9UaXRsZUNhc2UsXG4gIGZvcm1hdERhdGVQYXJ0cyxcbn06IFVzZUhpc3RvcnlUaW1lbGluZUl0ZW1zQXJncykgPT4ge1xuICBjb25zdCBkZWJ1Z0xvZ2dlZFJlZiA9IHVzZVJlZigwKTtcblxuICBjb25zdCB0aW1lbGluZUl0ZW1zOiBUaW1lbGluZUl0ZW1bXSA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIHJldHVybiBpdGVtcy5tYXAoKGVudHJ5KSA9PiB7XG4gICAgICBjb25zdCBhY3RpdmlkYWRJZFJhdyA9IChlbnRyeS5hY3RpdmlkYWRJZCA/PyBlbnRyeS5BY3RpdmlkYWRJZCA/PyBcIlwiKS50b1N0cmluZygpLnRyaW0oKTtcbiAgICAgIGNvbnN0IGFjdGl2aWRhZElkID0gYWN0aXZpZGFkSWRSYXcgfHwgXCJcIjtcbiAgICAgIGNvbnN0IHJlY0lkUmF3ID0gZW50cnkucmVjSWQgPz8gZW50cnkuUmVjSWQgPz8gXCJcIjtcbiAgICAgIGNvbnN0IHJlY0lkID0gcmVjSWRSYXcgJiYgIU51bWJlci5pc05hTihOdW1iZXIocmVjSWRSYXcpKSA/IE51bWJlcihyZWNJZFJhdykgOiBudWxsO1xuICAgICAgbGV0IGxpbmtJZCA9IGFjdGl2aWRhZElkIHx8IChyZWNJZCA/IHJlY0lkLnRvU3RyaW5nKCkgOiBcIlwiKTtcblxuICAgICAgaWYgKGRlYnVnTG9nZ2VkUmVmLmN1cnJlbnQgPCA1KSB7XG4gICAgICAgIGxvZ0hpc3RvcnkoXCJhY3Rpdml0eSBpdGVtXCIsIHsgYWN0aXZpZGFkSWQsIHJlY0lkUmF3LCByZWNJZCB9KTtcbiAgICAgICAgZGVidWdMb2dnZWRSZWYuY3VycmVudCArPSAxO1xuICAgICAgfVxuXG4gICAgICBjb25zdCByYXdOYW1lID0gKGVudHJ5Lm5hbWUgPz8gZW50cnkuTmFtZSA/PyBcIlwiKS50b1N0cmluZygpLnRyaW0oKTtcbiAgICAgIGNvbnN0IGZ1bGxOYW1lID0gdG9UaXRsZUNhc2UocmF3TmFtZSwgbG9jYWxlKTtcbiAgICAgIGNvbnN0IGZlY2hhID0gKGVudHJ5LnRyYW5zRGF0ZSA/PyBlbnRyeS5UcmFuc0RhdGUgPz8gXCJcIikudG9TdHJpbmcoKTtcbiAgICAgIGNvbnN0IHJhd0Rlc2MgPSAoZW50cnkuZGVzY3JpcHRpb24gPz8gZW50cnkuRGVzY3JpcHRpb24gPz8gXCJcIikudG9TdHJpbmcoKS50cmltKCk7XG4gICAgICBjb25zdCBmdWxsRGVzYyA9IHJhd0Rlc2M7XG5cbiAgICAgIGNvbnN0IGlzTm9EYXRhQ2FyZCA9ICFyYXdOYW1lICYmICFyYXdEZXNjO1xuICAgICAgaWYgKGlzTm9EYXRhQ2FyZCkge1xuICAgICAgICBsaW5rSWQgPSBcIlwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBpZDogbGlua0lkLFxuICAgICAgICBhY3RpdmlkYWRJZCxcbiAgICAgICAgcmVjSWQsXG4gICAgICAgIG5hbWU6IGZ1bGxOYW1lLFxuICAgICAgICBkZXNjcmlwdGlvbjogZnVsbERlc2MgfHwgbm9EYXRhVGV4dCxcbiAgICAgICAgZnVsbE5hbWUsXG4gICAgICAgIGZ1bGxEZXNjLFxuICAgICAgICBkYXRlUGFydHM6IGZvcm1hdERhdGVQYXJ0cyhmZWNoYSwgbG9jYWxlKSxcbiAgICAgICAgaXNOb0RhdGE6IGlzTm9EYXRhQ2FyZCxcbiAgICAgIH07XG4gICAgfSk7XG4gIH0sIFtmb3JtYXREYXRlUGFydHMsIGl0ZW1zLCBsb2NhbGUsIGxvZ0hpc3RvcnksIG5vRGF0YVRleHQsIHRvVGl0bGVDYXNlXSk7XG5cbiAgcmV0dXJuIHsgdGltZWxpbmVJdGVtcyB9O1xufTtcclxuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IEFwaUZldGNoRXJyb3IsIGZldGNoSnNvbiB9IGZyb20gXCIuLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uL3V0aWxzL2luZEkxOG4udHNcIjtcblxuZXhwb3J0IHR5cGUgSGlzdG9yeUFjdGl2aXR5SXRlbSA9IHtcbiAgYWN0aXZpZGFkSWQ/OiBzdHJpbmcgfCBudW1iZXI7XG4gIEFjdGl2aWRhZElkPzogc3RyaW5nIHwgbnVtYmVyO1xuICByZWNJZD86IHN0cmluZyB8IG51bWJlcjtcbiAgUmVjSWQ/OiBzdHJpbmcgfCBudW1iZXI7XG4gIG5hbWU/OiBzdHJpbmc7XG4gIE5hbWU/OiBzdHJpbmc7XG4gIHRyYW5zRGF0ZT86IHN0cmluZztcbiAgVHJhbnNEYXRlPzogc3RyaW5nO1xuICBkZXNjcmlwdGlvbj86IHN0cmluZztcbiAgRGVzY3JpcHRpb24/OiBzdHJpbmc7XG59O1xuXG50eXBlIEhpc3RvcnlSZXNwb25zZSA9IHtcbiAgaXRlbXM/OiBIaXN0b3J5QWN0aXZpdHlJdGVtW107XG4gIHRvdGFsPzogbnVtYmVyO1xufTtcblxudHlwZSBMb2FkT3ZlcnJpZGUgPSB7XG4gIGZyb21EYXRlOiBzdHJpbmc7XG4gIHRvRGF0ZTogc3RyaW5nO1xuICBhY2NvdW50TnVtPzogc3RyaW5nO1xufTtcblxudHlwZSBVc2VIaXN0b3J5QWN0aXZpdGllc0FyZ3MgPSB7XG4gIGZyb21EYXRlVmFsdWU6IHN0cmluZztcbiAgdG9EYXRlVmFsdWU6IHN0cmluZztcbiAgYWNjb3VudE51bVZhbHVlOiBzdHJpbmc7XG4gIHBhZ2VTaXplOiBudW1iZXI7XG4gIHJldHJ5RGVsYXlNcz86IG51bWJlcjtcbiAgbm9ybWFsaXplUmFuZ2U6IChmcm9tOiBzdHJpbmcsIHRvOiBzdHJpbmcpID0+IHsgZnJvbTogc3RyaW5nOyB0bzogc3RyaW5nIH07XG4gIG9uRm9yYmlkZGVuOiAoKSA9PiB2b2lkO1xuICBvbkRlYnVnPzogKG1lc3NhZ2U6IHN0cmluZywgZGF0YT86IFJlY29yZDxzdHJpbmcsIHVua25vd24+KSA9PiB2b2lkO1xufTtcblxuLy8gQ2VudHJhbGl6ZXMgaGlzdG9yeSBmZXRjaC9yZXRyeSBsb2dpYyB0byBrZWVwIHBhZ2UgY29tcG9uZW50cyBzbWFsbGVyLlxuZXhwb3J0IGNvbnN0IHVzZUhpc3RvcnlBY3Rpdml0aWVzID0gKHtcbiAgZnJvbURhdGVWYWx1ZSxcbiAgdG9EYXRlVmFsdWUsXG4gIGFjY291bnROdW1WYWx1ZSxcbiAgcGFnZVNpemUsXG4gIHJldHJ5RGVsYXlNcyA9IDYwMCxcbiAgbm9ybWFsaXplUmFuZ2UsXG4gIG9uRm9yYmlkZGVuLFxuICBvbkRlYnVnLFxufTogVXNlSGlzdG9yeUFjdGl2aXRpZXNBcmdzKSA9PiB7XG4gIGNvbnN0IFtpdGVtcywgc2V0SXRlbXNdID0gdXNlU3RhdGU8SGlzdG9yeUFjdGl2aXR5SXRlbVtdPihbXSk7XG4gIGNvbnN0IFt0b3RhbCwgc2V0VG90YWxdID0gdXNlU3RhdGUoMCk7XG4gIGNvbnN0IFtjdXJyZW50UGFnZSwgc2V0Q3VycmVudFBhZ2VdID0gdXNlU3RhdGUoMSk7XG4gIGNvbnN0IFtpc0xvYWRpbmcsIHNldElzTG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtlcnJvck1lc3NhZ2UsIHNldEVycm9yTWVzc2FnZV0gPSB1c2VTdGF0ZShcIlwiKTtcblxuICBjb25zdCByZXRyeU9uTmV0d29ya0Vycm9yUmVmID0gdXNlUmVmKGZhbHNlKTtcbiAgY29uc3QgYWN0aXZlQWJvcnRSZWYgPSB1c2VSZWY8QWJvcnRDb250cm9sbGVyIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IGFjdGl2ZVJlcXVlc3RJZFJlZiA9IHVzZVJlZigwKTtcbiAgY29uc3QgcmV0cnlUaW1lclJlZiA9IHVzZVJlZjxudW1iZXIgfCBudWxsPihudWxsKTtcbiAgY29uc3QgbGFzdFNpZ25hdHVyZVJlZiA9IHVzZVJlZihcIlwiKTtcblxuICBjb25zdCBjbGVhclJldHJ5VGltZXIgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKHJldHJ5VGltZXJSZWYuY3VycmVudCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHJldHJ5VGltZXJSZWYuY3VycmVudCk7XG4gICAgICByZXRyeVRpbWVyUmVmLmN1cnJlbnQgPSBudWxsO1xuICAgIH1cbiAgfSwgW10pO1xuXG4gIGNvbnN0IGFib3J0QWN0aXZlUmVxdWVzdCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoIWFjdGl2ZUFib3J0UmVmLmN1cnJlbnQpIHJldHVybjtcbiAgICB0cnkge1xuICAgICAgYWN0aXZlQWJvcnRSZWYuY3VycmVudC5hYm9ydCgpO1xuICAgIH0gY2F0Y2gge1xuICAgICAgLy8gSWdub3JlIGFib3J0IGVycm9ycy5cbiAgICB9XG4gICAgYWN0aXZlQWJvcnRSZWYuY3VycmVudCA9IG51bGw7XG4gIH0sIFtdKTtcblxuICBjb25zdCByZXNldEFjdGl2aXRpZXMgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgY2xlYXJSZXRyeVRpbWVyKCk7XG4gICAgYWJvcnRBY3RpdmVSZXF1ZXN0KCk7XG4gICAgc2V0SXRlbXMoW10pO1xuICAgIHNldFRvdGFsKDApO1xuICAgIHNldEVycm9yTWVzc2FnZShcIlwiKTtcbiAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xuICB9LCBbYWJvcnRBY3RpdmVSZXF1ZXN0LCBjbGVhclJldHJ5VGltZXJdKTtcblxuICBjb25zdCBsb2FkQWN0aXZpdGllcyA9IHVzZUNhbGxiYWNrKFxuICAgIGFzeW5jIChwYWdlOiBudW1iZXIsIG92ZXJyaWRlPzogTG9hZE92ZXJyaWRlKSA9PiB7XG4gICAgICBjb25zdCBmcm9tRGF0ZVN0ciA9IG92ZXJyaWRlPy5mcm9tRGF0ZSA/PyBmcm9tRGF0ZVZhbHVlO1xuICAgICAgY29uc3QgdG9EYXRlU3RyID0gb3ZlcnJpZGU/LnRvRGF0ZSA/PyB0b0RhdGVWYWx1ZTtcbiAgICAgIGNvbnN0IGFjY291bnROdW1TdHIgPSBvdmVycmlkZT8uYWNjb3VudE51bSA/PyBhY2NvdW50TnVtVmFsdWU7XG5cbiAgICAgIGlmICghZnJvbURhdGVTdHIgfHwgIXRvRGF0ZVN0cikge1xuICAgICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xuICAgICAgICBzZXRJdGVtcyhbXSk7XG4gICAgICAgIHNldFRvdGFsKDApO1xuICAgICAgICBzZXRFcnJvck1lc3NhZ2UoXCJcIik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgc2V0Q3VycmVudFBhZ2UocGFnZSk7XG4gICAgICBjbGVhclJldHJ5VGltZXIoKTtcblxuICAgICAgY29uc3QgcmVxdWVzdElkID0gKythY3RpdmVSZXF1ZXN0SWRSZWYuY3VycmVudDtcbiAgICAgIGFib3J0QWN0aXZlUmVxdWVzdCgpO1xuXG4gICAgICBjb25zdCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuICAgICAgYWN0aXZlQWJvcnRSZWYuY3VycmVudCA9IGNvbnRyb2xsZXI7XG5cbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSBub3JtYWxpemVSYW5nZShmcm9tRGF0ZVN0ciwgdG9EYXRlU3RyKTtcbiAgICAgIGNvbnN0IGZpbHRlclNpZ25hdHVyZSA9IGAke25vcm1hbGl6ZWQuZnJvbX18JHtub3JtYWxpemVkLnRvfXwke2FjY291bnROdW1TdHJ9fCR7cGFnZX1gO1xuICAgICAgbGFzdFNpZ25hdHVyZVJlZi5jdXJyZW50ID0gZmlsdGVyU2lnbmF0dXJlO1xuXG4gICAgICBzZXRJc0xvYWRpbmcodHJ1ZSk7XG4gICAgICBzZXRJdGVtcyhbXSk7XG4gICAgICBzZXRUb3RhbCgwKTtcbiAgICAgIHNldEVycm9yTWVzc2FnZShcIlwiKTtcblxuICAgICAgY29uc3QgcGF5bG9hZCA9IHtcbiAgICAgICAgZnJvbURhdGU6IG5vcm1hbGl6ZWQuZnJvbSxcbiAgICAgICAgdG9EYXRlOiBub3JtYWxpemVkLnRvLFxuICAgICAgICBhY2NvdW50TnVtOiBhY2NvdW50TnVtU3RyLFxuICAgICAgfTtcblxuICAgICAgb25EZWJ1Zz8uKFwibG9hZEFjdGl2aXRpZXM6cmVxdWVzdFwiLCB7IHBhZ2UsIHBhZ2VTaXplLCBwYXlsb2FkIH0pO1xuXG4gICAgICBsZXQgZGF0YTogSGlzdG9yeVJlc3BvbnNlO1xuICAgICAgdHJ5IHtcbiAgICAgICAgZGF0YSA9IGF3YWl0IGZldGNoSnNvbjxIaXN0b3J5UmVzcG9uc2U+KGAvSGlzdG9yaWFsL0dldEFjdGl2aXRpZXM/cGFnZT0ke3BhZ2V9JnBhZ2VTaXplPSR7cGFnZVNpemV9YCwge1xuICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxuICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHBheWxvYWQpLFxuICAgICAgICAgIHNpZ25hbDogY29udHJvbGxlci5zaWduYWwsXG4gICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXG4gICAgICAgIH0pO1xuICAgICAgfSBjYXRjaCAoZXJyOiBhbnkpIHtcbiAgICAgICAgaWYgKHJlcXVlc3RJZCAhPT0gYWN0aXZlUmVxdWVzdElkUmVmLmN1cnJlbnQpIHJldHVybjtcbiAgICAgICAgaWYgKGVycj8ubmFtZSA9PT0gXCJBYm9ydEVycm9yXCIpIHtcbiAgICAgICAgICBhY3RpdmVBYm9ydFJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZXJyIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvciAmJiBlcnIuc3RhdHVzID09PSA0MDMpIHtcbiAgICAgICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xuICAgICAgICAgIGFjdGl2ZUFib3J0UmVmLmN1cnJlbnQgPSBudWxsO1xuICAgICAgICAgIG9uRm9yYmlkZGVuKCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgaXNOZXR3b3JrRXJyb3IgPSAhKGVyciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IpIHx8IHR5cGVvZiBlcnIuc3RhdHVzICE9PSBcIm51bWJlclwiO1xuICAgICAgICBpZiAoaXNOZXR3b3JrRXJyb3IgJiYgcmV0cnlPbk5ldHdvcmtFcnJvclJlZi5jdXJyZW50KSB7XG4gICAgICAgICAgcmV0cnlPbk5ldHdvcmtFcnJvclJlZi5jdXJyZW50ID0gZmFsc2U7XG4gICAgICAgICAgYWN0aXZlQWJvcnRSZWYuY3VycmVudCA9IG51bGw7XG4gICAgICAgICAgcmV0cnlUaW1lclJlZi5jdXJyZW50ID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHJlcXVlc3RJZCAhPT0gYWN0aXZlUmVxdWVzdElkUmVmLmN1cnJlbnQpIHJldHVybjtcbiAgICAgICAgICAgIGlmIChsYXN0U2lnbmF0dXJlUmVmLmN1cnJlbnQgIT09IGZpbHRlclNpZ25hdHVyZSkgcmV0dXJuO1xuICAgICAgICAgICAgbG9hZEFjdGl2aXRpZXMocGFnZSwge1xuICAgICAgICAgICAgICBmcm9tRGF0ZTogZnJvbURhdGVTdHIsXG4gICAgICAgICAgICAgIHRvRGF0ZTogdG9EYXRlU3RyLFxuICAgICAgICAgICAgICBhY2NvdW50TnVtOiBhY2NvdW50TnVtU3RyLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSwgcmV0cnlEZWxheU1zKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKGVycj8ubWVzc2FnZSB8fCBpbmRUKFwiQXBpX1JlcXVlc3RGYWlsZWRcIiwgXCJObyBzZSBwdWRvIGNvbmVjdGFyIGNvbiBlbCBzZXJ2aWRvciAocmVkKS5cIikpO1xuICAgICAgICBhY3RpdmVBYm9ydFJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVxdWVzdElkICE9PSBhY3RpdmVSZXF1ZXN0SWRSZWYuY3VycmVudCkgcmV0dXJuO1xuXG4gICAgICBvbkRlYnVnPy4oXCJsb2FkQWN0aXZpdGllczpyZXNwb25zZVwiLCB7XG4gICAgICAgIHN0YXR1czogMjAwLFxuICAgICAgICB0b3RhbDogZGF0YT8udG90YWwgPz8gMCxcbiAgICAgICAgY291bnQ6IEFycmF5LmlzQXJyYXkoZGF0YT8uaXRlbXMpID8gZGF0YS5pdGVtcy5sZW5ndGggOiAwLFxuICAgICAgfSk7XG5cbiAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XG4gICAgICBzZXRJdGVtcyhkYXRhLml0ZW1zIHx8IFtdKTtcbiAgICAgIHNldFRvdGFsKGRhdGEudG90YWwgfHwgKGRhdGEuaXRlbXMgfHwgW10pLmxlbmd0aCk7XG4gICAgICBhY3RpdmVBYm9ydFJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICB9LFxuICAgIFtcbiAgICAgIGFib3J0QWN0aXZlUmVxdWVzdCxcbiAgICAgIGFjY291bnROdW1WYWx1ZSxcbiAgICAgIGNsZWFyUmV0cnlUaW1lcixcbiAgICAgIGZyb21EYXRlVmFsdWUsXG4gICAgICBub3JtYWxpemVSYW5nZSxcbiAgICAgIG9uRGVidWcsXG4gICAgICBvbkZvcmJpZGRlbixcbiAgICAgIHBhZ2VTaXplLFxuICAgICAgcmV0cnlEZWxheU1zLFxuICAgICAgdG9EYXRlVmFsdWUsXG4gICAgXVxuICApO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGNsZWFyUmV0cnlUaW1lcigpO1xuICAgICAgYWJvcnRBY3RpdmVSZXF1ZXN0KCk7XG4gICAgfTtcbiAgfSwgW2Fib3J0QWN0aXZlUmVxdWVzdCwgY2xlYXJSZXRyeVRpbWVyXSk7XG5cbiAgcmV0dXJuIHtcbiAgICBpdGVtcyxcbiAgICB0b3RhbCxcbiAgICBjdXJyZW50UGFnZSxcbiAgICBpc0xvYWRpbmcsXG4gICAgZXJyb3JNZXNzYWdlLFxuICAgIGxvYWRBY3Rpdml0aWVzLFxuICAgIHJlc2V0QWN0aXZpdGllcyxcbiAgICByZXRyeU9uTmV0d29ya0Vycm9yUmVmLFxuICAgIGxhc3RTaWduYXR1cmVSZWYsXG4gIH07XG59O1xuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBISVNUT1JZX0ZJTFRFUl9LRVksIEhJU1RPUllfUkVUVVJOX0ZMQUdfS0VZIH0gZnJvbSBcIi4uL3V0aWxzL3Zpc2l0YXNIaXN0b3J5LnRzXCI7XG5pbXBvcnQge1xuICBnZXRTZXNzaW9uSnNvbldpdGhFeHBpcnksXG4gIGdldFNlc3Npb25WYWx1ZVdpdGhFeHBpcnksXG4gIHJlbW92ZVNlc3Npb25WYWx1ZVdpdGhFeHBpcnksXG4gIHNldFNlc3Npb25Kc29uV2l0aEV4cGlyeSxcbiAgc2V0U2Vzc2lvblZhbHVlV2l0aEV4cGlyeSxcbn0gZnJvbSBcIi4uL3V0aWxzL3Nlc3Npb25FeHBpcnkudHNcIjtcblxuZXhwb3J0IHR5cGUgSGlzdG9yeUNhY2hlZEZpbHRlciA9IHtcbiAgZnJvbURhdGU6IHN0cmluZztcbiAgdG9EYXRlOiBzdHJpbmc7XG4gIHBhZ2U/OiBudW1iZXI7XG4gIGNsaWVudEFjY291bnQ/OiBzdHJpbmc7XG4gIGNsaWVudFRleHQ/OiBzdHJpbmc7XG59O1xuXG5jb25zdCBISVNUT1JZX0NBQ0hFX1RUTF9NUyA9IDEyICogNjAgKiA2MCAqIDEwMDA7XG5cbmNvbnN0IG5vcm1hbGl6ZUNhY2hlZEZpbHRlciA9ICh2YWx1ZTogSGlzdG9yeUNhY2hlZEZpbHRlciB8IG51bGwpOiBIaXN0b3J5Q2FjaGVkRmlsdGVyIHwgbnVsbCA9PiB7XG4gIGlmICghdmFsdWUgfHwgdHlwZW9mIHZhbHVlICE9PSBcIm9iamVjdFwiKSByZXR1cm4gbnVsbDtcbiAgcmV0dXJuIHtcbiAgICBmcm9tRGF0ZTogdmFsdWUuZnJvbURhdGUgfHwgXCJcIixcbiAgICB0b0RhdGU6IHZhbHVlLnRvRGF0ZSB8fCBcIlwiLFxuICAgIHBhZ2U6IHZhbHVlLnBhZ2UsXG4gICAgY2xpZW50QWNjb3VudDogdmFsdWUuY2xpZW50QWNjb3VudCB8fCBcIlwiLFxuICAgIGNsaWVudFRleHQ6IHZhbHVlLmNsaWVudFRleHQgfHwgXCJcIixcbiAgfTtcbn07XG5cbi8vIEtlZXBzIGhpc3RvcnkgZmlsdGVyIGNhY2hlIHJlYWRzL3dyaXRlcyBpbiBvbmUgcGxhY2UuXG5leHBvcnQgY29uc3QgdXNlSGlzdG9yeUZpbHRlckNhY2hlID0gKCkgPT4ge1xuICBjb25zdCByZWFkQ2FjaGVkRmlsdGVyID0gdXNlQ2FsbGJhY2soKCk6IEhpc3RvcnlDYWNoZWRGaWx0ZXIgfCBudWxsID0+IHtcbiAgICBjb25zdCBwYXJzZWQgPSBnZXRTZXNzaW9uSnNvbldpdGhFeHBpcnk8SGlzdG9yeUNhY2hlZEZpbHRlcj4oSElTVE9SWV9GSUxURVJfS0VZKTtcbiAgICByZXR1cm4gbm9ybWFsaXplQ2FjaGVkRmlsdGVyKHBhcnNlZCk7XG4gIH0sIFtdKTtcblxuICBjb25zdCBjbGVhckZpbHRlckNhY2hlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIHJlbW92ZVNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoSElTVE9SWV9GSUxURVJfS0VZKTtcbiAgICByZW1vdmVTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KEhJU1RPUllfUkVUVVJOX0ZMQUdfS0VZKTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IGNvbnN1bWVSZXR1cm5GbGFnID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGNvbnN0IHJhdyA9IGdldFNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoSElTVE9SWV9SRVRVUk5fRkxBR19LRVkpO1xuICAgIGlmIChyYXcgPT09IFwiMVwiKSB7XG4gICAgICByZW1vdmVTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KEhJU1RPUllfUkVUVVJOX0ZMQUdfS0VZKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH0sIFtdKTtcblxuICBjb25zdCBzYXZlQ2FjaGVkRmlsdGVyID0gdXNlQ2FsbGJhY2soKGZpbHRlcjogSGlzdG9yeUNhY2hlZEZpbHRlcikgPT4ge1xuICAgIHNldFNlc3Npb25Kc29uV2l0aEV4cGlyeShISVNUT1JZX0ZJTFRFUl9LRVksIGZpbHRlciwgSElTVE9SWV9DQUNIRV9UVExfTVMpO1xuICAgIHNldFNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoSElTVE9SWV9SRVRVUk5fRkxBR19LRVksIFwiMVwiLCBISVNUT1JZX0NBQ0hFX1RUTF9NUyk7XG4gIH0sIFtdKTtcblxuICByZXR1cm4ge1xuICAgIHJlYWRDYWNoZWRGaWx0ZXIsXG4gICAgY2xlYXJGaWx0ZXJDYWNoZSxcbiAgICBjb25zdW1lUmV0dXJuRmxhZyxcbiAgICBzYXZlQ2FjaGVkRmlsdGVyLFxuICB9O1xufTtcbiIsICJcdUZFRkZpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2ssIHVzZU1lbW8sIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB0eXBlIHsgTW91c2VFdmVudCBhcyBSZWFjdE1vdXNlRXZlbnQgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB0eXBlIHsgQ2xpZW50T3B0aW9uIH0gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvdmlzaXRhcy9DbGllbnRTZWFyY2hDb21ib2JveC50c3hcIjtcbmltcG9ydCB0eXBlIHsgSGlzdG9yeUNhY2hlZEZpbHRlciB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VIaXN0b3J5RmlsdGVyQ2FjaGUudHNcIjtcblxuZXhwb3J0IHR5cGUgUXVpY2tGaWx0ZXJJZCA9IFwiY3VzdG9tXCIgfCBcImRheXMtN1wiIHwgXCJkYXlzLTMwXCIgfCBcImRheXMtOTBcIjtcblxuZXhwb3J0IHR5cGUgTG9hZE92ZXJyaWRlID0ge1xuICBmcm9tRGF0ZTogc3RyaW5nO1xuICB0b0RhdGU6IHN0cmluZztcbiAgYWNjb3VudE51bT86IHN0cmluZztcbn07XG5cbmV4cG9ydCB0eXBlIEZpbHRlckxvYWRSZXF1ZXN0ID0ge1xuICBwYWdlOiBudW1iZXI7XG4gIG92ZXJyaWRlOiBMb2FkT3ZlcnJpZGU7XG59O1xuXG50eXBlIFVzZUhpc3RvcnlGaWx0ZXJzU3RhdGVBcmdzID0ge1xuICBkZWZhdWx0RnJvbURhdGU6IHN0cmluZztcbiAgZGVmYXVsdFRvRGF0ZTogc3RyaW5nO1xuICBsb2dIaXN0b3J5OiAobWVzc2FnZTogc3RyaW5nLCBkYXRhPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pID0+IHZvaWQ7XG4gIHBhcnNlRGF0ZVZhbHVlOiAodmFsdWU6IHN0cmluZykgPT4gRGF0ZSB8IG51bGw7XG4gIHBhcnNlSVNPOiAodmFsdWU6IHN0cmluZykgPT4gRGF0ZSB8IG51bGw7XG4gIHRvSVNPOiAodmFsdWU6IERhdGUpID0+IHN0cmluZztcbiAgc3RhcnRPZkRheTogKHZhbHVlOiBEYXRlKSA9PiBEYXRlO1xuICBpc0JlZm9yZTogKGE6IERhdGUgfCBudWxsLCBiOiBEYXRlIHwgbnVsbCkgPT4gYm9vbGVhbjtcbn07XG5cbi8vIEVuY2Fwc3VsYXRlcyBoaXN0b3J5IGZpbHRlciBzdGF0ZSBhbmQgZGF0ZS1yYW5nZSBvcmNoZXN0cmF0aW9uLlxuZXhwb3J0IGNvbnN0IHVzZUhpc3RvcnlGaWx0ZXJzU3RhdGUgPSAoe1xuICBkZWZhdWx0RnJvbURhdGUsXG4gIGRlZmF1bHRUb0RhdGUsXG4gIGxvZ0hpc3RvcnksXG4gIHBhcnNlRGF0ZVZhbHVlLFxuICBwYXJzZUlTTyxcbiAgdG9JU08sXG4gIHN0YXJ0T2ZEYXksXG4gIGlzQmVmb3JlLFxufTogVXNlSGlzdG9yeUZpbHRlcnNTdGF0ZUFyZ3MpID0+IHtcbiAgY29uc3QgW3N0YXJ0RGF0ZSwgc2V0U3RhcnREYXRlXSA9IHVzZVN0YXRlPERhdGUgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW2VuZERhdGUsIHNldEVuZERhdGVdID0gdXNlU3RhdGU8RGF0ZSB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbbWFudWFsU3RhcnREYXRlLCBzZXRNYW51YWxTdGFydERhdGVdID0gdXNlU3RhdGU8RGF0ZSB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbbWFudWFsRW5kRGF0ZSwgc2V0TWFudWFsRW5kRGF0ZV0gPSB1c2VTdGF0ZTxEYXRlIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtob3ZlckRhdGUsIHNldEhvdmVyRGF0ZV0gPSB1c2VTdGF0ZTxEYXRlIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtzZWxlY3RpbmdTdGVwLCBzZXRTZWxlY3RpbmdTdGVwXSA9IHVzZVN0YXRlPFwic3RhcnRcIiB8IFwiZW5kXCIgfCBcImRvbmVcIj4oXCJzdGFydFwiKTtcbiAgY29uc3QgW2N1cnJlbnRNb250aCwgc2V0Q3VycmVudE1vbnRoXSA9IHVzZVN0YXRlKG5ldyBEYXRlKCkuZ2V0TW9udGgoKSk7XG4gIGNvbnN0IFtjdXJyZW50WWVhciwgc2V0Q3VycmVudFllYXJdID0gdXNlU3RhdGUobmV3IERhdGUoKS5nZXRGdWxsWWVhcigpKTtcbiAgY29uc3QgW2lzT3Blbiwgc2V0SXNPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3Nob3dNYW51YWxQaWNrZXJQYW5lbCwgc2V0U2hvd01hbnVhbFBpY2tlclBhbmVsXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2FjdGl2ZVF1aWNrRmlsdGVyLCBzZXRBY3RpdmVRdWlja0ZpbHRlcl0gPSB1c2VTdGF0ZTxRdWlja0ZpbHRlcklkIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtzZWxlY3RlZENsaWVudCwgc2V0U2VsZWN0ZWRDbGllbnRdID0gdXNlU3RhdGU8Q2xpZW50T3B0aW9uIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtjbGllbnRSZXNldEtleSwgc2V0Q2xpZW50UmVzZXRLZXldID0gdXNlU3RhdGUoMCk7XG4gIGNvbnN0IFtzaG93RmlsdGVycywgc2V0U2hvd0ZpbHRlcnNdID0gdXNlU3RhdGUodHJ1ZSk7XG4gIGNvbnN0IFtzaG93TWFudWFsRXJyb3IsIHNldFNob3dNYW51YWxFcnJvcl0gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgY29uc3QgaGFzUmVzdG9yZWRGaWx0ZXJSZWYgPSB1c2VSZWYoZmFsc2UpO1xuICBjb25zdCBkaWRJbml0RmlsdGVyUmVmID0gdXNlUmVmKGZhbHNlKTtcblxuICBjb25zdCBmcm9tRGF0ZVZhbHVlID0gdXNlTWVtbygoKSA9PiAoc3RhcnREYXRlID8gdG9JU08oc3RhcnREYXRlKSA6IFwiXCIpLCBbc3RhcnREYXRlLCB0b0lTT10pO1xuICBjb25zdCB0b0RhdGVWYWx1ZSA9IHVzZU1lbW8oKCkgPT4gKGVuZERhdGUgPyB0b0lTTyhlbmREYXRlKSA6IFwiXCIpLCBbZW5kRGF0ZSwgdG9JU09dKTtcbiAgY29uc3QgYWNjb3VudE51bVZhbHVlID0gdXNlTWVtbygoKSA9PiAoc2VsZWN0ZWRDbGllbnQgPyBzZWxlY3RlZENsaWVudC52YWx1ZSA6IFwiXCIpLCBbc2VsZWN0ZWRDbGllbnRdKTtcblxuICBjb25zdCB2YWxpZGF0ZU1hbnVhbFJhbmdlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmIChhY3RpdmVRdWlja0ZpbHRlciA9PT0gXCJjdXN0b21cIiAmJiAoIXN0YXJ0RGF0ZSB8fCAhZW5kRGF0ZSkpIHtcbiAgICAgIHNldFNob3dNYW51YWxFcnJvcih0cnVlKTtcbiAgICAgIHNldFNlbGVjdGluZ1N0ZXAoIXN0YXJ0RGF0ZSA/IFwic3RhcnRcIiA6IFwiZW5kXCIpO1xuICAgICAgc2V0U2hvd01hbnVhbFBpY2tlclBhbmVsKHRydWUpO1xuICAgICAgc2V0SXNPcGVuKHRydWUpO1xuICAgICAgc2V0U2hvd0ZpbHRlcnModHJ1ZSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9LCBbYWN0aXZlUXVpY2tGaWx0ZXIsIGVuZERhdGUsIHN0YXJ0RGF0ZV0pO1xuXG4gIC8vIEFwcGxpZXMgYSBkZWZhdWx0IGRhdGUgcmFuZ2UgYW5kIHJldHVybnMgdGhlIGxvYWQgcGF5bG9hZCBuZWVkZWQgYnkgdGhlIHBhZ2UuXG4gIGNvbnN0IGFwcGx5RGVmYXVsdFJhbmdlRnJvbVByb3BzID0gdXNlQ2FsbGJhY2soKCk6IEZpbHRlckxvYWRSZXF1ZXN0IHwgbnVsbCA9PiB7XG4gICAgaWYgKCFkZWZhdWx0RnJvbURhdGUgfHwgIWRlZmF1bHRUb0RhdGUpIHJldHVybiBudWxsO1xuICAgIGNvbnN0IHN0YXJ0UmF3ID0gcGFyc2VEYXRlVmFsdWUoZGVmYXVsdEZyb21EYXRlKTtcbiAgICBjb25zdCBlbmRSYXcgPSBwYXJzZURhdGVWYWx1ZShkZWZhdWx0VG9EYXRlKTtcbiAgICBpZiAoIXN0YXJ0UmF3IHx8ICFlbmRSYXcpIHJldHVybiBudWxsO1xuXG4gICAgY29uc3Qgc3RhcnREYXkgPSBzdGFydE9mRGF5KHN0YXJ0UmF3KTtcbiAgICBjb25zdCBlbmREYXkgPSBzdGFydE9mRGF5KGVuZFJhdyk7XG5cbiAgICBsZXQgc3RhcnQgPSBzdGFydERheTtcbiAgICBsZXQgZW5kID0gZW5kRGF5O1xuICAgIGlmIChpc0JlZm9yZShlbmQsIHN0YXJ0KSkge1xuICAgICAgY29uc3Qgc3dhcCA9IHN0YXJ0O1xuICAgICAgc3RhcnQgPSBlbmQ7XG4gICAgICBlbmQgPSBzd2FwO1xuICAgIH1cblxuICAgIHNldFN0YXJ0RGF0ZShzdGFydCk7XG4gICAgc2V0RW5kRGF0ZShlbmQpO1xuICAgIHNldFNlbGVjdGluZ1N0ZXAoXCJkb25lXCIpO1xuICAgIHNldEhvdmVyRGF0ZShudWxsKTtcbiAgICBzZXRDdXJyZW50TW9udGgoc3RhcnQuZ2V0TW9udGgoKSk7XG4gICAgc2V0Q3VycmVudFllYXIoc3RhcnQuZ2V0RnVsbFllYXIoKSk7XG4gICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIobnVsbCk7XG4gICAgc2V0U2VsZWN0ZWRDbGllbnQobnVsbCk7XG4gICAgc2V0SXNPcGVuKGZhbHNlKTtcblxuICAgIHJldHVybiB7XG4gICAgICBwYWdlOiAxLFxuICAgICAgb3ZlcnJpZGU6IHtcbiAgICAgICAgZnJvbURhdGU6IHRvSVNPKHN0YXJ0KSxcbiAgICAgICAgdG9EYXRlOiB0b0lTTyhlbmQpLFxuICAgICAgICBhY2NvdW50TnVtOiBcIlwiLFxuICAgICAgfSxcbiAgICB9O1xuICB9LCBbZGVmYXVsdEZyb21EYXRlLCBkZWZhdWx0VG9EYXRlLCBpc0JlZm9yZSwgcGFyc2VEYXRlVmFsdWUsIHN0YXJ0T2ZEYXksIHRvSVNPXSk7XG5cbiAgLy8gUmVzZXRzIGhpc3RvcnkgZmlsdGVycyBsb2NhbCBzdGF0ZSBvbmx5LlxuICBjb25zdCByZXNldEhpc3RvcnlGaWx0ZXJzID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIHNldFN0YXJ0RGF0ZShudWxsKTtcbiAgICBzZXRFbmREYXRlKG51bGwpO1xuICAgIHNldE1hbnVhbFN0YXJ0RGF0ZShudWxsKTtcbiAgICBzZXRNYW51YWxFbmREYXRlKG51bGwpO1xuICAgIHNldFNlbGVjdGluZ1N0ZXAoXCJzdGFydFwiKTtcbiAgICBzZXRIb3ZlckRhdGUobnVsbCk7XG4gICAgc2V0Q3VycmVudE1vbnRoKG5ldyBEYXRlKCkuZ2V0TW9udGgoKSk7XG4gICAgc2V0Q3VycmVudFllYXIobmV3IERhdGUoKS5nZXRGdWxsWWVhcigpKTtcbiAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcihudWxsKTtcbiAgICBzZXRTaG93TWFudWFsUGlja2VyUGFuZWwoZmFsc2UpO1xuICAgIHNldFNlbGVjdGVkQ2xpZW50KG51bGwpO1xuICAgIHNldENsaWVudFJlc2V0S2V5KChwcmV2KSA9PiBwcmV2ICsgMSk7XG4gICAgc2V0U2hvd01hbnVhbEVycm9yKGZhbHNlKTtcbiAgfSwgW10pO1xuXG4gIC8vIEFwcGxpZXMgY2FjaGVkIGZpbHRlcnMgYW5kIHJldHVybnMgdGhlIGxvYWQgcGF5bG9hZCBuZWVkZWQgYnkgdGhlIHBhZ2UuXG4gIGNvbnN0IGFwcGx5Q2FjaGVkRmlsdGVyID0gdXNlQ2FsbGJhY2soXG4gICAgKGZpbHRlcjogSGlzdG9yeUNhY2hlZEZpbHRlciB8IG51bGwpOiBGaWx0ZXJMb2FkUmVxdWVzdCB8IG51bGwgPT4ge1xuICAgICAgaWYgKCFmaWx0ZXIgfHwgIWZpbHRlci5mcm9tRGF0ZSB8fCAhZmlsdGVyLnRvRGF0ZSkgcmV0dXJuIG51bGw7XG5cbiAgICAgIGNvbnN0IHN0YXJ0ID0gcGFyc2VJU08oZmlsdGVyLmZyb21EYXRlKTtcbiAgICAgIGNvbnN0IGVuZCA9IHBhcnNlSVNPKGZpbHRlci50b0RhdGUpO1xuICAgICAgc2V0U3RhcnREYXRlKHN0YXJ0KTtcbiAgICAgIHNldEVuZERhdGUoZW5kKTtcbiAgICAgIHNldFNlbGVjdGluZ1N0ZXAoZW5kID8gXCJkb25lXCIgOiBcImVuZFwiKTtcbiAgICAgIHNldEhvdmVyRGF0ZShudWxsKTtcbiAgICAgIHNldEN1cnJlbnRNb250aChzdGFydCA/IHN0YXJ0LmdldE1vbnRoKCkgOiBuZXcgRGF0ZSgpLmdldE1vbnRoKCkpO1xuICAgICAgc2V0Q3VycmVudFllYXIoc3RhcnQgPyBzdGFydC5nZXRGdWxsWWVhcigpIDogbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpKTtcbiAgICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKG51bGwpO1xuICAgICAgc2V0U2hvd01hbnVhbFBpY2tlclBhbmVsKGZhbHNlKTtcbiAgICAgIHNldFNob3dNYW51YWxFcnJvcihmYWxzZSk7XG5cbiAgICAgIGlmIChmaWx0ZXIuY2xpZW50QWNjb3VudCkge1xuICAgICAgICBzZXRTZWxlY3RlZENsaWVudCh7IHZhbHVlOiBmaWx0ZXIuY2xpZW50QWNjb3VudCwgdGV4dDogZmlsdGVyLmNsaWVudFRleHQgfHwgZmlsdGVyLmNsaWVudEFjY291bnQgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZXRTZWxlY3RlZENsaWVudChudWxsKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcGFnZVZhbCA9IE51bWJlcihmaWx0ZXIucGFnZSk7XG4gICAgICBjb25zdCBwYWdlVG9Mb2FkID0gTnVtYmVyLmlzRmluaXRlKHBhZ2VWYWwpICYmIHBhZ2VWYWwgPiAwID8gcGFnZVZhbCA6IDE7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHBhZ2U6IHBhZ2VUb0xvYWQsXG4gICAgICAgIG92ZXJyaWRlOiB7XG4gICAgICAgICAgZnJvbURhdGU6IGZpbHRlci5mcm9tRGF0ZSxcbiAgICAgICAgICB0b0RhdGU6IGZpbHRlci50b0RhdGUsXG4gICAgICAgICAgYWNjb3VudE51bTogZmlsdGVyLmNsaWVudEFjY291bnQgfHwgXCJcIixcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgfSxcbiAgICBbcGFyc2VJU09dXG4gICk7XG5cbiAgY29uc3QgaGFuZGxlU2VsZWN0ID0gdXNlQ2FsbGJhY2soXG4gICAgKGRhdGVPYmo6IERhdGUpID0+IHtcbiAgICAgIGxvZ0hpc3RvcnkoXCJoYW5kbGVTZWxlY3RcIiwge1xuICAgICAgICBjbGlja2VkOiB0b0lTTyhkYXRlT2JqKSxcbiAgICAgICAgc3RhcnQ6IGZyb21EYXRlVmFsdWUsXG4gICAgICAgIGVuZDogdG9EYXRlVmFsdWUsXG4gICAgICAgIHNlbGVjdGluZ1N0ZXAsXG4gICAgICB9KTtcblxuICAgICAgc2V0U2hvd01hbnVhbEVycm9yKGZhbHNlKTtcbiAgICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKFwiY3VzdG9tXCIpO1xuICAgICAgc2V0U2hvd01hbnVhbFBpY2tlclBhbmVsKHRydWUpO1xuICAgICAgY29uc3QgaGFzU3RhcnQgPSAhIXN0YXJ0RGF0ZTtcbiAgICAgIGNvbnN0IGhhc0VuZCA9ICEhZW5kRGF0ZTtcblxuICAgICAgaWYgKHNlbGVjdGluZ1N0ZXAgPT09IFwiZW5kXCIpIHtcbiAgICAgICAgaWYgKCFoYXNTdGFydCkge1xuICAgICAgICAgIHNldFN0YXJ0RGF0ZShkYXRlT2JqKTtcbiAgICAgICAgICBzZXRFbmREYXRlKG51bGwpO1xuICAgICAgICAgIHNldFNlbGVjdGluZ1N0ZXAoXCJlbmRcIik7XG4gICAgICAgICAgc2V0Q3VycmVudE1vbnRoKGRhdGVPYmouZ2V0TW9udGgoKSk7XG4gICAgICAgICAgc2V0Q3VycmVudFllYXIoZGF0ZU9iai5nZXRGdWxsWWVhcigpKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbmV3U3RhcnQgPSBzdGFydERhdGUgYXMgRGF0ZTtcbiAgICAgICAgbGV0IG5ld0VuZCA9IGRhdGVPYmo7XG4gICAgICAgIGlmIChpc0JlZm9yZShuZXdFbmQsIG5ld1N0YXJ0KSkge1xuICAgICAgICAgIGNvbnN0IHN3YXAgPSBuZXdTdGFydDtcbiAgICAgICAgICBuZXdTdGFydCA9IG5ld0VuZDtcbiAgICAgICAgICBuZXdFbmQgPSBzd2FwO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0U3RhcnREYXRlKG5ld1N0YXJ0KTtcbiAgICAgICAgc2V0RW5kRGF0ZShuZXdFbmQpO1xuICAgICAgICBzZXRNYW51YWxTdGFydERhdGUobmV3U3RhcnQpO1xuICAgICAgICBzZXRNYW51YWxFbmREYXRlKG5ld0VuZCk7XG4gICAgICAgIHNldFNlbGVjdGluZ1N0ZXAoXCJkb25lXCIpO1xuICAgICAgICBzZXRDdXJyZW50TW9udGgobmV3RW5kLmdldE1vbnRoKCkpO1xuICAgICAgICBzZXRDdXJyZW50WWVhcihuZXdFbmQuZ2V0RnVsbFllYXIoKSk7XG4gICAgICAgIHNldEhvdmVyRGF0ZShudWxsKTtcbiAgICAgICAgc2V0SXNPcGVuKGZhbHNlKTtcbiAgICAgICAgc2V0U2hvd01hbnVhbFBpY2tlclBhbmVsKGZhbHNlKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBuZXdTdGFydCA9IGRhdGVPYmo7XG4gICAgICBpZiAoaGFzRW5kICYmIGVuZERhdGUgJiYgaXNCZWZvcmUoZW5kRGF0ZSwgbmV3U3RhcnQpKSB7XG4gICAgICAgIHNldFN0YXJ0RGF0ZShuZXdTdGFydCk7XG4gICAgICAgIHNldEVuZERhdGUobnVsbCk7XG4gICAgICAgIHNldFNlbGVjdGluZ1N0ZXAoXCJlbmRcIik7XG4gICAgICAgIHNldEN1cnJlbnRNb250aChuZXdTdGFydC5nZXRNb250aCgpKTtcbiAgICAgICAgc2V0Q3VycmVudFllYXIobmV3U3RhcnQuZ2V0RnVsbFllYXIoKSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgc2V0U3RhcnREYXRlKG5ld1N0YXJ0KTtcbiAgICAgIGlmIChoYXNFbmQgJiYgZW5kRGF0ZSkge1xuICAgICAgICBzZXRFbmREYXRlKGVuZERhdGUpO1xuICAgICAgICBzZXRNYW51YWxTdGFydERhdGUobmV3U3RhcnQpO1xuICAgICAgICBzZXRNYW51YWxFbmREYXRlKGVuZERhdGUpO1xuICAgICAgICBzZXRTZWxlY3RpbmdTdGVwKFwiZG9uZVwiKTtcbiAgICAgICAgc2V0SG92ZXJEYXRlKG51bGwpO1xuICAgICAgICBzZXRJc09wZW4oZmFsc2UpO1xuICAgICAgICBzZXRTaG93TWFudWFsUGlja2VyUGFuZWwoZmFsc2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2V0RW5kRGF0ZShudWxsKTtcbiAgICAgICAgc2V0U2VsZWN0aW5nU3RlcChcImVuZFwiKTtcbiAgICAgIH1cblxuICAgICAgc2V0Q3VycmVudE1vbnRoKG5ld1N0YXJ0LmdldE1vbnRoKCkpO1xuICAgICAgc2V0Q3VycmVudFllYXIobmV3U3RhcnQuZ2V0RnVsbFllYXIoKSk7XG4gICAgfSxcbiAgICBbZW5kRGF0ZSwgZnJvbURhdGVWYWx1ZSwgaXNCZWZvcmUsIGxvZ0hpc3RvcnksIHNlbGVjdGluZ1N0ZXAsIHN0YXJ0RGF0ZSwgdG9EYXRlVmFsdWUsIHRvSVNPXVxuICApO1xuXG4gIGNvbnN0IGhhbmRsZUNsZWFyU3RhdGUgPSB1c2VDYWxsYmFjayhcbiAgICAoZXZlbnQ6IFJlYWN0TW91c2VFdmVudCkgPT4ge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBsb2dIaXN0b3J5KFwiY2xlYXJSYW5nZVwiKTtcbiAgICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKG51bGwpO1xuICAgICAgc2V0U2hvd01hbnVhbEVycm9yKGZhbHNlKTtcbiAgICAgIHNldFNob3dNYW51YWxQaWNrZXJQYW5lbChmYWxzZSk7XG4gICAgICByZXNldEhpc3RvcnlGaWx0ZXJzKCk7XG4gICAgICBzZXRJc09wZW4oZmFsc2UpO1xuICAgICAgc2V0U2hvd0ZpbHRlcnModHJ1ZSk7XG4gICAgfSxcbiAgICBbbG9nSGlzdG9yeSwgcmVzZXRIaXN0b3J5RmlsdGVyc11cbiAgKTtcblxuICBjb25zdCBvcGVuUG9wb3ZlciA9IHVzZUNhbGxiYWNrKFxuICAgIChzZWN0aW9uOiBcInN0YXJ0XCIgfCBcImVuZFwiKSA9PiB7XG4gICAgICBsb2dIaXN0b3J5KFwib3BlblBvcG92ZXJcIiwgeyBzZWN0aW9uLCBzdGFydDogZnJvbURhdGVWYWx1ZSwgZW5kOiB0b0RhdGVWYWx1ZSwgc2VsZWN0aW5nU3RlcCB9KTtcbiAgICAgIHNldFNob3dNYW51YWxFcnJvcihmYWxzZSk7XG4gICAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcihcImN1c3RvbVwiKTtcbiAgICAgIHNldFNob3dNYW51YWxQaWNrZXJQYW5lbCh0cnVlKTtcblxuICAgICAgaWYgKHNlY3Rpb24gPT09IFwiZW5kXCIgJiYgIXN0YXJ0RGF0ZSkge1xuICAgICAgICBzZXRTZWxlY3RpbmdTdGVwKFwic3RhcnRcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZXRTZWxlY3RpbmdTdGVwKHNlY3Rpb24pO1xuICAgICAgfVxuXG4gICAgICBzZXRJc09wZW4odHJ1ZSk7XG4gICAgfSxcbiAgICBbZnJvbURhdGVWYWx1ZSwgbG9nSGlzdG9yeSwgc2VsZWN0aW5nU3RlcCwgc3RhcnREYXRlLCB0b0RhdGVWYWx1ZV1cbiAgKTtcblxuICBjb25zdCBoYW5kbGVBY3RpdmF0b3JLZXlEb3duID0gdXNlQ2FsbGJhY2soXG4gICAgKGV2ZW50OiBSZWFjdC5LZXlib2FyZEV2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4ge1xuICAgICAgaWYgKGV2ZW50LmtleSAhPT0gXCJFbnRlclwiICYmIGV2ZW50LmtleSAhPT0gXCIgXCIpIHJldHVybjtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBvcGVuUG9wb3ZlcihcInN0YXJ0XCIpO1xuICAgIH0sXG4gICAgW29wZW5Qb3BvdmVyXVxuICApO1xuXG4gIGNvbnN0IGhhbmRsZVNlY3Rpb25LZXlEb3duID0gdXNlQ2FsbGJhY2soXG4gICAgKGV2ZW50OiBSZWFjdC5LZXlib2FyZEV2ZW50PEhUTUxEaXZFbGVtZW50Piwgc2VjdGlvbjogXCJzdGFydFwiIHwgXCJlbmRcIikgPT4ge1xuICAgICAgaWYgKGV2ZW50LmtleSAhPT0gXCJFbnRlclwiICYmIGV2ZW50LmtleSAhPT0gXCIgXCIpIHJldHVybjtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIG9wZW5Qb3BvdmVyKHNlY3Rpb24pO1xuICAgIH0sXG4gICAgW29wZW5Qb3BvdmVyXVxuICApO1xuXG4gIGNvbnN0IGFwcGx5UXVpY2tSYW5nZSA9IHVzZUNhbGxiYWNrKFxuICAgIChmaWx0ZXJJZDogUXVpY2tGaWx0ZXJJZCwgc3RhcnQ6IERhdGUsIGVuZDogRGF0ZSkgPT4ge1xuICAgICAgY29uc3Qgc3RhcnREYXkgPSBzdGFydE9mRGF5KHN0YXJ0KTtcbiAgICAgIGNvbnN0IGVuZERheSA9IHN0YXJ0T2ZEYXkoZW5kKTtcbiAgICAgIHNldFN0YXJ0RGF0ZShzdGFydERheSk7XG4gICAgICBzZXRFbmREYXRlKGVuZERheSk7XG4gICAgICBzZXRTZWxlY3RpbmdTdGVwKFwiZG9uZVwiKTtcbiAgICAgIHNldEhvdmVyRGF0ZShudWxsKTtcbiAgICAgIHNldEN1cnJlbnRNb250aChzdGFydERheS5nZXRNb250aCgpKTtcbiAgICAgIHNldEN1cnJlbnRZZWFyKHN0YXJ0RGF5LmdldEZ1bGxZZWFyKCkpO1xuICAgICAgc2V0SXNPcGVuKGZhbHNlKTtcbiAgICAgIHNldFNob3dNYW51YWxQaWNrZXJQYW5lbChmYWxzZSk7XG4gICAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcihmaWx0ZXJJZCk7XG4gICAgICBzZXRTaG93TWFudWFsRXJyb3IoZmFsc2UpO1xuICAgIH0sXG4gICAgW3N0YXJ0T2ZEYXldXG4gICk7XG5cbiAgY29uc3QgaGFuZGxlUXVpY2tGaWx0ZXIgPSB1c2VDYWxsYmFjayhcbiAgICAoZmlsdGVySWQ6IFF1aWNrRmlsdGVySWQpID0+IHtcbiAgICAgIGNvbnN0IHRvZGF5ID0gc3RhcnRPZkRheShuZXcgRGF0ZSgpKTtcblxuICAgICAgaWYgKGZpbHRlcklkID09PSBcImN1c3RvbVwiKSB7XG4gICAgICAgIGlmIChzaG93TWFudWFsUGlja2VyUGFuZWwpIHtcbiAgICAgICAgICBzZXRTaG93TWFudWFsRXJyb3IoZmFsc2UpO1xuICAgICAgICAgIHNldEhvdmVyRGF0ZShudWxsKTtcbiAgICAgICAgICBzZXRJc09wZW4oZmFsc2UpO1xuICAgICAgICAgIHNldFNob3dNYW51YWxQaWNrZXJQYW5lbChmYWxzZSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbmV4dFN0YXJ0ID0gbWFudWFsU3RhcnREYXRlID8gbmV3IERhdGUobWFudWFsU3RhcnREYXRlKSA6IG51bGw7XG4gICAgICAgIGNvbnN0IG5leHRFbmQgPSBtYW51YWxFbmREYXRlID8gbmV3IERhdGUobWFudWFsRW5kRGF0ZSkgOiBudWxsO1xuICAgICAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcihcImN1c3RvbVwiKTtcbiAgICAgICAgc2V0U2hvd01hbnVhbFBpY2tlclBhbmVsKHRydWUpO1xuICAgICAgICBzZXRTdGFydERhdGUobmV4dFN0YXJ0KTtcbiAgICAgICAgc2V0RW5kRGF0ZShuZXh0RW5kKTtcblxuICAgICAgICBpZiAobmV4dFN0YXJ0KSB7XG4gICAgICAgICAgc2V0Q3VycmVudE1vbnRoKG5leHRTdGFydC5nZXRNb250aCgpKTtcbiAgICAgICAgICBzZXRDdXJyZW50WWVhcihuZXh0U3RhcnQuZ2V0RnVsbFllYXIoKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobmV4dFN0YXJ0ICYmIG5leHRFbmQpIHtcbiAgICAgICAgICBzZXRTZWxlY3RpbmdTdGVwKFwiZG9uZVwiKTtcbiAgICAgICAgICBzZXRJc09wZW4oZmFsc2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNldFNlbGVjdGluZ1N0ZXAobmV4dFN0YXJ0ICYmICFuZXh0RW5kID8gXCJlbmRcIiA6IFwic3RhcnRcIik7XG4gICAgICAgICAgc2V0SXNPcGVuKHRydWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0SG92ZXJEYXRlKG51bGwpO1xuICAgICAgICBzZXRTaG93TWFudWFsRXJyb3IoZmFsc2UpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChmaWx0ZXJJZCA9PT0gXCJkYXlzLTdcIikge1xuICAgICAgICBjb25zdCBzdGFydCA9IG5ldyBEYXRlKHRvZGF5KTtcbiAgICAgICAgc3RhcnQuc2V0RGF0ZSh0b2RheS5nZXREYXRlKCkgLSA2KTtcbiAgICAgICAgYXBwbHlRdWlja1JhbmdlKGZpbHRlcklkLCBzdGFydCwgdG9kYXkpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChmaWx0ZXJJZCA9PT0gXCJkYXlzLTMwXCIpIHtcbiAgICAgICAgY29uc3Qgc3RhcnQgPSBuZXcgRGF0ZSh0b2RheSk7XG4gICAgICAgIHN0YXJ0LnNldERhdGUodG9kYXkuZ2V0RGF0ZSgpIC0gMjkpO1xuICAgICAgICBhcHBseVF1aWNrUmFuZ2UoZmlsdGVySWQsIHN0YXJ0LCB0b2RheSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKGZpbHRlcklkID09PSBcImRheXMtOTBcIikge1xuICAgICAgICBjb25zdCBzdGFydCA9IG5ldyBEYXRlKHRvZGF5KTtcbiAgICAgICAgc3RhcnQuc2V0RGF0ZSh0b2RheS5nZXREYXRlKCkgLSA4OSk7XG4gICAgICAgIGFwcGx5UXVpY2tSYW5nZShmaWx0ZXJJZCwgc3RhcnQsIHRvZGF5KTtcbiAgICAgIH1cbiAgICB9LFxuICAgIFthcHBseVF1aWNrUmFuZ2UsIG1hbnVhbEVuZERhdGUsIG1hbnVhbFN0YXJ0RGF0ZSwgc2hvd01hbnVhbFBpY2tlclBhbmVsLCBzdGFydE9mRGF5XVxuICApO1xuXG4gIGNvbnN0IGhhbmRsZUNsaWVudFNlbGVjdGVkID0gdXNlQ2FsbGJhY2soKGNsaWVudDogQ2xpZW50T3B0aW9uIHwgbnVsbCkgPT4ge1xuICAgIHNldFNlbGVjdGVkQ2xpZW50KGNsaWVudCk7XG4gIH0sIFtdKTtcblxuICByZXR1cm4ge1xuICAgIHN0YXJ0RGF0ZSxcbiAgICBlbmREYXRlLFxuICAgIG1hbnVhbFN0YXJ0RGF0ZSxcbiAgICBtYW51YWxFbmREYXRlLFxuICAgIGhvdmVyRGF0ZSxcbiAgICBzZWxlY3RpbmdTdGVwLFxuICAgIGN1cnJlbnRNb250aCxcbiAgICBjdXJyZW50WWVhcixcbiAgICBpc09wZW4sXG4gICAgc2hvd01hbnVhbFBpY2tlclBhbmVsLFxuICAgIGFjdGl2ZVF1aWNrRmlsdGVyLFxuICAgIHNlbGVjdGVkQ2xpZW50LFxuICAgIGNsaWVudFJlc2V0S2V5LFxuICAgIHNob3dGaWx0ZXJzLFxuICAgIHNob3dNYW51YWxFcnJvcixcbiAgICBmcm9tRGF0ZVZhbHVlLFxuICAgIHRvRGF0ZVZhbHVlLFxuICAgIGFjY291bnROdW1WYWx1ZSxcbiAgICBoYXNSZXN0b3JlZEZpbHRlclJlZixcbiAgICBkaWRJbml0RmlsdGVyUmVmLFxuICAgIHNldFN0YXJ0RGF0ZSxcbiAgICBzZXRFbmREYXRlLFxuICAgIHNldE1hbnVhbFN0YXJ0RGF0ZSxcbiAgICBzZXRNYW51YWxFbmREYXRlLFxuICAgIHNldEhvdmVyRGF0ZSxcbiAgICBzZXRTZWxlY3RpbmdTdGVwLFxuICAgIHNldEN1cnJlbnRNb250aCxcbiAgICBzZXRDdXJyZW50WWVhcixcbiAgICBzZXRJc09wZW4sXG4gICAgc2V0U2hvd01hbnVhbFBpY2tlclBhbmVsLFxuICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyLFxuICAgIHNldFNlbGVjdGVkQ2xpZW50LFxuICAgIHNldENsaWVudFJlc2V0S2V5LFxuICAgIHNldFNob3dGaWx0ZXJzLFxuICAgIHNldFNob3dNYW51YWxFcnJvcixcbiAgICB2YWxpZGF0ZU1hbnVhbFJhbmdlLFxuICAgIGFwcGx5RGVmYXVsdFJhbmdlRnJvbVByb3BzLFxuICAgIHJlc2V0SGlzdG9yeUZpbHRlcnMsXG4gICAgYXBwbHlDYWNoZWRGaWx0ZXIsXG4gICAgaGFuZGxlU2VsZWN0LFxuICAgIGhhbmRsZUNsZWFyU3RhdGUsXG4gICAgb3BlblBvcG92ZXIsXG4gICAgaGFuZGxlQWN0aXZhdG9yS2V5RG93bixcbiAgICBoYW5kbGVTZWN0aW9uS2V5RG93bixcbiAgICBoYW5kbGVRdWlja0ZpbHRlcixcbiAgICBoYW5kbGVDbGllbnRTZWxlY3RlZCxcbiAgfTtcbn07XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBQUEsZ0JBQXlFOzs7QUNBekUsbUJBQTJDO0FBZ0l2QztBQW5HSixJQUFNLGNBQWM7QUFDcEIsSUFBTSxxQkFBcUI7QUFZM0IsSUFBTSxlQUFlLENBQUMsRUFBRSxPQUFPLFlBQVksY0FBYyxXQUFXLE1BQWE7QUFDL0UsUUFBTSxtQkFBZSxxQkFBOEIsSUFBSTtBQUN2RCxRQUFNLGtCQUFjLHFCQUFzQjtBQUFBLElBQ3hDLFFBQVE7QUFBQSxJQUNSLFdBQVc7QUFBQSxJQUNYLFFBQVE7QUFBQSxJQUNSLFFBQVE7QUFBQSxJQUNSLFdBQVc7QUFBQSxJQUNYLE9BQU87QUFBQSxJQUNQLFFBQVE7QUFBQSxFQUNWLENBQUM7QUFFRCxRQUFNLDJCQUF1QiwwQkFBWSxDQUFDLFdBQStCO0FBQ3ZFLFVBQU0sT0FBTztBQUNiLFFBQUksQ0FBQyxRQUFRLE9BQU8sS0FBSyxZQUFZLFdBQVksUUFBTztBQUN4RCxVQUFN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QkFBc0IsSUFBRyxNQUFLLElBQUcsTUFBSyxHQUFFLEtBQUksYUFBWSxLQUFJLEdBQ2hGO0FBQUEsVUFDQyxLQUFLLG1CQUFtQixTQUFTO0FBQUE7QUFBQTtBQUFBLElBQ3BDO0FBQUEsSUFFQyxlQUNDLDhFQUNFO0FBQUE7QUFBQSxRQUFDO0FBQUE7QUFBQSxVQUNDLE9BQU87QUFBQSxVQUNQLFlBQVksS0FBSyx5QkFBeUIseUJBQXlCO0FBQUEsVUFDbkU7QUFBQSxVQUNBLFlBQVk7QUFBQTtBQUFBLE1BQ2Q7QUFBQSxNQUVBO0FBQUEsUUFBQztBQUFBO0FBQUEsVUFDQyxLQUFLO0FBQUEsVUFDTDtBQUFBLFVBQ0E7QUFBQSxVQUNBLFlBQVk7QUFBQSxVQUNaLGNBQWMsQ0FBQyxTQUFTLGVBQWUsSUFBSTtBQUFBLFVBQzNDLFFBQVE7QUFBQTtBQUFBLE1BQ1Y7QUFBQSxPQUNGO0FBQUEsSUFFRCxrQkFDQztBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0MsT0FBTTtBQUFBLFFBQ04sV0FBVyxLQUFLLGlCQUFpQixRQUFRO0FBQUEsUUFDekMsTUFBTTtBQUFBLFFBQ04sT0FBTztBQUFBLFFBQ1AsUUFBUTtBQUFBO0FBQUEsSUFDVjtBQUFBLEtBRUo7QUFFSjtBQUdPLElBQU0sbUJBQW1CLENBQUMsU0FBc0I7QUFDckQsUUFBTSxrQkFBa0IsS0FBSyxhQUFhLG1CQUFtQixLQUFLO0FBQ2xFLFFBQU0sZ0JBQWdCLEtBQUssYUFBYSxpQkFBaUIsS0FBSztBQUU5RCxtQkFBaUIsTUFBTSw2Q0FBQyxlQUFZLGlCQUFrQyxlQUE4QixDQUFFO0FBQ3hHO0FBRUEsSUFBTSxRQUFRLE1BQU07QUFDbEIsUUFBTSxTQUFTLFNBQVMsZUFBZSxzQkFBc0I7QUFDN0QsTUFBSSxDQUFDLE9BQVE7QUFDYixtQkFBaUIsTUFBTTtBQUN6QjtBQUVBLHVCQUF1QixLQUFLO0FBRTVCLElBQU8sc0JBQVE7IiwKICAibmFtZXMiOiBbImltcG9ydF9yZWFjdCIsICJSZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAibG9nSGlzdG9yeSIsICJpbXBvcnRfcmVhY3QiLCAibG9nSGlzdG9yeSIsICJ0b1RpdGxlQ2FzZSIsICJmb3JtYXREYXRlUGFydHMiLCAiaW1wb3J0X3JlYWN0IiwgIm5vcm1hbGl6ZVJhbmdlIiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAibG9nSGlzdG9yeSIsICJwYXJzZURhdGVWYWx1ZSIsICJwYXJzZUlTTyIsICJ0b0lTTyIsICJzdGFydE9mRGF5IiwgImlzQmVmb3JlIiwgIm5ld1N0YXJ0IiwgImltcG9ydF9qc3hfcnVudGltZSJdCn0K
