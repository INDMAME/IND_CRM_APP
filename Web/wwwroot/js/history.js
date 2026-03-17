import {
  ClientSearchCombobox_default
} from "./chunks/chunk-H3VTOUQC.js";
import {
  ActionButton_default,
  FilterButton_default,
  HistoryManualDatePicker_default,
  HistorySummary_default
} from "./chunks/chunk-7Z3NMBR5.js";
import {
  FloatingActionButton_default
} from "./chunks/chunk-QGBVJNF4.js";
import "./chunks/chunk-6HMZLOGF.js";
import {
  CompactPagination_default,
  useTimelineCardEffects
} from "./chunks/chunk-FRQBPU47.js";
import "./chunks/chunk-AXUPQW6N.js";
import {
  HISTORY_FILTER_KEY,
  HISTORY_RETURN_FLAG_KEY
} from "./chunks/chunk-K7MECJ5E.js";
import {
  setTopbarActionGroupReady
} from "./chunks/chunk-6G7EOWHU.js";
import {
  canAccess,
  classNames,
  indT,
  showPermissionModal
} from "./chunks/chunk-BYICIYT4.js";
import {
  mountReactIsland,
  mountWhenDocumentReady,
  require_jsx_runtime,
  require_react
} from "./chunks/chunk-BWM3JLWG.js";
import {
  ApiFetchError,
  fetchJson
} from "./chunks/chunk-IKHTGBEE.js";
import {
  getSessionJsonWithExpiry,
  getSessionValueWithExpiry,
  removeSessionValueWithExpiry,
  setSessionJsonWithExpiry,
  setSessionValueWithExpiry
} from "./chunks/chunk-7SKLSV7K.js";
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvaGlzdG9yaWFsL0hpc3RvcnlQYWdlLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9oaXN0b3JpYWwvSGlzdG9yeVRhYmxlLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9oaXN0b3JpYWwvdXNlSGlzdG9yeVBhZ2VMaXN0ZW5lcnMudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvaGlzdG9yaWFsL3VzZUhpc3RvcnlUaW1lbGluZUl0ZW1zLnRzIiwgIi4uL3JlYWN0L3NyYy9ob29rcy91c2VIaXN0b3J5QWN0aXZpdGllcy50cyIsICIuLi9yZWFjdC9zcmMvaG9va3MvdXNlSGlzdG9yeUZpbHRlckNhY2hlLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy92aXNpdGFzL2hpc3RvcmlhbC91c2VIaXN0b3J5RmlsdGVyc1N0YXRlLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgY2xhc3NOYW1lcyB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9jbGFzc05hbWVzLnRzXCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB7IGNhbkFjY2Vzcywgc2hvd1Blcm1pc3Npb25Nb2RhbCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9wZXJtaXNzaW9ucy50c1wiO1xuaW1wb3J0IENsaWVudFNlYXJjaENvbWJvYm94IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL3Zpc2l0YXMvQ2xpZW50U2VhcmNoQ29tYm9ib3gudHN4XCI7XG5pbXBvcnQgSGlzdG9yeVRhYmxlIGZyb20gXCIuL0hpc3RvcnlUYWJsZS50c3hcIjtcbmltcG9ydCBIaXN0b3J5U3VtbWFyeSBmcm9tIFwiLi9IaXN0b3J5U3VtbWFyeS50c3hcIjtcbmltcG9ydCBIaXN0b3J5TWFudWFsRGF0ZVBpY2tlciwgeyBIaXN0b3J5TWFudWFsRGF5Q2VsbCB9IGZyb20gXCIuL0hpc3RvcnlNYW51YWxEYXRlUGlja2VyLnRzeFwiO1xuaW1wb3J0IHsgdXNlSGlzdG9yeVBhZ2VMaXN0ZW5lcnMgfSBmcm9tIFwiLi91c2VIaXN0b3J5UGFnZUxpc3RlbmVycy50c1wiO1xuaW1wb3J0IHsgdXNlSGlzdG9yeVRpbWVsaW5lSXRlbXMgfSBmcm9tIFwiLi91c2VIaXN0b3J5VGltZWxpbmVJdGVtcy50c1wiO1xuaW1wb3J0IEZsb2F0aW5nQWN0aW9uQnV0dG9uIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvRmxvYXRpbmdBY3Rpb25CdXR0b24udHN4XCI7XG5pbXBvcnQgQ29tcGFjdFBhZ2luYXRpb24gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9Db21wYWN0UGFnaW5hdGlvbi50c3hcIjtcbmltcG9ydCBGaWx0ZXJCdXR0b24gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9GaWx0ZXJCdXR0b24udHN4XCI7XG5pbXBvcnQgQWN0aW9uQnV0dG9uIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvQWN0aW9uQnV0dG9uLnRzeFwiO1xuaW1wb3J0IHsgdXNlSGlzdG9yeUFjdGl2aXRpZXMgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlSGlzdG9yeUFjdGl2aXRpZXMudHNcIjtcbmltcG9ydCB7IHVzZUhpc3RvcnlGaWx0ZXJDYWNoZSB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VIaXN0b3J5RmlsdGVyQ2FjaGUudHNcIjtcbmltcG9ydCB7IHVzZUhpc3RvcnlGaWx0ZXJzU3RhdGUgfSBmcm9tIFwiLi91c2VIaXN0b3J5RmlsdGVyc1N0YXRlLnRzXCI7XG5pbXBvcnQgeyBtb3VudFJlYWN0SXNsYW5kLCBtb3VudFdoZW5Eb2N1bWVudFJlYWR5IH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3JlYWN0SXNsYW5kLnRzeFwiO1xuXHJcbnR5cGUgUHJvcHMgPSB7XHJcbiAgZGVmYXVsdEZyb21EYXRlPzogc3RyaW5nO1xyXG4gIGRlZmF1bHRUb0RhdGU/OiBzdHJpbmc7XHJcbn07XHJcblxyXG50eXBlIENhbGVuZGFyQ2VsbCA9IHtcbiAgZGF0ZTogRGF0ZSB8IG51bGw7XG4gIGlzbzogc3RyaW5nO1xuICBpc0VtcHR5OiBib29sZWFuO1xyXG59O1xyXG5cclxuY29uc3QgUEFHRV9TSVpFID0gNjtcbmNvbnN0IFBBR0VfV0lORE9XID0gNjtcbmNvbnN0IE5BVl9ERUxBWV9NUyA9IDMyMDtcbmNvbnN0IEZBQl9CQVNFX0JPVFRPTSA9IDMyO1xuXHJcbmNvbnN0IG5vcm1hbGl6ZVVpTG9jYWxlID0gKGxvY2FsZTogc3RyaW5nKSA9PiB7XHJcbiAgY29uc3QgdmFsdWUgPSBTdHJpbmcobG9jYWxlIHx8IFwiXCIpLnRyaW0oKTtcclxuICBpZiAoIXZhbHVlKSByZXR1cm4gXCJlcy1FU1wiO1xyXG4gIGlmICgvXnpoLWhhbnMvaS50ZXN0KHZhbHVlKSkgcmV0dXJuIFwiemgtQ05cIjtcclxuICByZXR1cm4gdmFsdWU7XHJcbn07XHJcblxyXG5jb25zdCBpc0Jhc3F1ZUxvY2FsZSA9IChsb2NhbGU6IHN0cmluZykgPT4gL15ldVxcYi9pLnRlc3QoU3RyaW5nKGxvY2FsZSB8fCBcIlwiKSk7XHJcblxyXG5jb25zdCBCQVNRVUVfTU9OVEhTID0gW1xyXG4gIFwidXJ0YXJyaWxhXCIsXHJcbiAgXCJvdHNhaWxhXCIsXHJcbiAgXCJtYXJ0eG9hXCIsXHJcbiAgXCJhcGlyaWxhXCIsXHJcbiAgXCJtYWlhdHphXCIsXHJcbiAgXCJla2FpbmFcIixcclxuICBcInV6dGFpbGFcIixcclxuICBcImFidXp0dWFcIixcclxuICBcImlyYWlsYVwiLFxyXG4gIFwidXJyaWFcIixcclxuICBcImF6YXJvYVwiLFxyXG4gIFwiYWJlbmR1YVwiLFxyXG5dO1xyXG5cclxuY29uc3QgQkFTUVVFX01PTlRIU19TSE9SVCA9IFtcclxuICBcInVydFwiLFxyXG4gIFwib3RzXCIsXHJcbiAgXCJtYXJcIixcclxuICBcImFwaVwiLFxyXG4gIFwibWFpXCIsXHJcbiAgXCJla2FcIixcclxuICBcInV6dFwiLFxyXG4gIFwiYWJ1XCIsXHJcbiAgXCJpcmFcIixcclxuICBcInVyclwiLFxyXG4gIFwiYXphXCIsXHJcbiAgXCJhYmVcIixcclxuXTtcclxuXHJcbmNvbnN0IGdldFVpTG9jYWxlID0gKCkgPT4ge1xyXG4gIGNvbnN0IGZyb21IdG1sID0gdHlwZW9mIGRvY3VtZW50ICE9PSBcInVuZGVmaW5lZFwiID8gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmxhbmcgOiBcIlwiO1xyXG4gIGlmIChmcm9tSHRtbCAmJiBTdHJpbmcoZnJvbUh0bWwpLnRyaW0oKSkgcmV0dXJuIG5vcm1hbGl6ZVVpTG9jYWxlKGZyb21IdG1sKTtcclxuICByZXR1cm4gXCJlcy1FU1wiO1xyXG59O1xyXG5cclxuY29uc3QgcGFkID0gKG46IG51bWJlcikgPT4gbi50b1N0cmluZygpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcclxuXHJcbmNvbnN0IHRvSVNPID0gKGQ6IERhdGUpID0+IGAke2QuZ2V0RnVsbFllYXIoKX0tJHtwYWQoZC5nZXRNb250aCgpICsgMSl9LSR7cGFkKGQuZ2V0RGF0ZSgpKX1gO1xyXG5cclxuY29uc3Qgc3RhcnRPZkRheSA9IChkOiBEYXRlKSA9PiBuZXcgRGF0ZShkLmdldEZ1bGxZZWFyKCksIGQuZ2V0TW9udGgoKSwgZC5nZXREYXRlKCkpO1xyXG5cclxuY29uc3QgcGFyc2VJU08gPSAoczogc3RyaW5nKSA9PiB7XHJcbiAgaWYgKCFzKSByZXR1cm4gbnVsbDtcclxuICBjb25zdCBwYXJ0cyA9IHMuc3BsaXQoXCItXCIpLm1hcChOdW1iZXIpO1xyXG4gIGlmIChwYXJ0cy5sZW5ndGggIT09IDMpIHJldHVybiBudWxsO1xyXG4gIHJldHVybiBuZXcgRGF0ZShwYXJ0c1swXSwgcGFydHNbMV0gLSAxLCBwYXJ0c1syXSk7XHJcbn07XHJcblxyXG5jb25zdCBzYW1lRGF5ID0gKGE6IERhdGUgfCBudWxsLCBiOiBEYXRlIHwgbnVsbCkgPT4gISEoYSAmJiBiICYmIGEuZ2V0VGltZSgpID09PSBiLmdldFRpbWUoKSk7XHJcblxyXG5jb25zdCBpc0JlZm9yZSA9IChhOiBEYXRlIHwgbnVsbCwgYjogRGF0ZSB8IG51bGwpID0+ICEhKGEgJiYgYiAmJiBhLmdldFRpbWUoKSA8IGIuZ2V0VGltZSgpKTtcclxuXHJcbiAgY29uc3Qgbm9ybWFsaXplUmFuZ2UgPSAoZnJvbTogc3RyaW5nLCB0bzogc3RyaW5nKSA9PiB7XHJcbiAgICBpZiAoIWZyb20gfHwgIXRvKSByZXR1cm4geyBmcm9tLCB0byB9O1xyXG4gICAgY29uc3QgZnJvbURhdGUgPSBwYXJzZUlTTyhmcm9tKTtcclxuICAgIGNvbnN0IHRvRGF0ZSA9IHBhcnNlSVNPKHRvKTtcclxuICAgIGlmICghZnJvbURhdGUgfHwgIXRvRGF0ZSkgcmV0dXJuIHsgZnJvbSwgdG8gfTtcclxuICBpZiAoaXNCZWZvcmUodG9EYXRlLCBmcm9tRGF0ZSkpIHtcclxuICAgIHJldHVybiB7IGZyb206IHRvSVNPKHRvRGF0ZSksIHRvOiB0b0lTTyhmcm9tRGF0ZSkgfTtcclxuICB9XHJcbiAgcmV0dXJuIHsgZnJvbTogdG9JU08oZnJvbURhdGUpLCB0bzogdG9JU08odG9EYXRlKSB9O1xyXG59O1xyXG5cclxuICBjb25zdCBmb3JtYXREaXNwbGF5ID0gKGQ6IERhdGUsIGxvY2FsZTogc3RyaW5nKSA9PiB7XHJcbiAgaWYgKGlzQmFzcXVlTG9jYWxlKGxvY2FsZSkpIHtcclxuICAgIGNvbnN0IG1vbnRoID0gQkFTUVVFX01PTlRIU19TSE9SVFtkLmdldE1vbnRoKCldO1xyXG4gICAgcmV0dXJuIGAke2QuZ2V0RGF0ZSgpfSAke21vbnRofSAke2QuZ2V0RnVsbFllYXIoKX1gLnRvTG93ZXJDYXNlKCk7XHJcbiAgfVxyXG4gIHJldHVybiBkXHJcbiAgICAudG9Mb2NhbGVEYXRlU3RyaW5nKGxvY2FsZSwge1xyXG4gICAgICBkYXk6IFwibnVtZXJpY1wiLFxyXG4gICAgICBtb250aDogXCJzaG9ydFwiLFxyXG4gICAgICB5ZWFyOiBcIm51bWVyaWNcIixcclxuICAgIH0pXHJcbiAgICAucmVwbGFjZSgvXFwuL2csIFwiXCIpXHJcbiAgICAudG9Mb3dlckNhc2UoKTtcclxufTtcclxuXHJcbmNvbnN0IGZvcm1hdE1vbnRoTGFiZWwgPSAoZDogRGF0ZSwgbG9jYWxlOiBzdHJpbmcpID0+IHtcclxuICBpZiAoL156aC9pLnRlc3QobG9jYWxlKSkge1xyXG4gICAgcmV0dXJuIG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KGxvY2FsZSwgeyB5ZWFyOiBcIm51bWVyaWNcIiwgbW9udGg6IFwibG9uZ1wiIH0pLmZvcm1hdChkKTtcclxuICB9XHJcbiAgaWYgKGlzQmFzcXVlTG9jYWxlKGxvY2FsZSkpIHtcclxuICAgIHJldHVybiBgJHtCQVNRVUVfTU9OVEhTW2QuZ2V0TW9udGgoKV19ICR7ZC5nZXRGdWxsWWVhcigpfWA7XHJcbiAgfVxyXG4gIGNvbnN0IG1vbnRoTmFtZSA9IGQudG9Mb2NhbGVEYXRlU3RyaW5nKGxvY2FsZSwgeyBtb250aDogXCJsb25nXCIgfSk7XHJcbiAgY29uc3QgY2FwTW9udGhOYW1lID0gbW9udGhOYW1lICYmIC9bQS1aYS16XS8udGVzdChtb250aE5hbWVbMF0pXHJcbiAgICA/IG1vbnRoTmFtZVswXS50b0xvY2FsZVVwcGVyQ2FzZShsb2NhbGUpICsgbW9udGhOYW1lLnNsaWNlKDEpXHJcbiAgICA6IG1vbnRoTmFtZTtcclxuICByZXR1cm4gYCR7Y2FwTW9udGhOYW1lfSAke2QuZ2V0RnVsbFllYXIoKX1gO1xyXG59O1xyXG5cclxuY29uc3QgcGFyc2VEYXRlVmFsdWUgPSAodmFsdWU6IHN0cmluZykgPT4ge1xyXG4gIGlmICghdmFsdWUpIHJldHVybiBudWxsO1xyXG4gIGNvbnN0IHJhdyA9IFN0cmluZyh2YWx1ZSkudHJpbSgpO1xyXG4gIGlmICghcmF3KSByZXR1cm4gbnVsbDtcclxuXHJcbiAgY29uc3QgZGF0ZVBhcnQgPSByYXcuc3BsaXQoXCJUXCIpWzBdLnNwbGl0KFwiIFwiKVswXTtcclxuXHJcbiAgaWYgKC9eXFxkezR9LVxcZHsyfS1cXGR7Mn0kLy50ZXN0KGRhdGVQYXJ0KSkge1xyXG4gICAgY29uc3QgW3ksIG0sIGRdID0gZGF0ZVBhcnQuc3BsaXQoXCItXCIpLm1hcChOdW1iZXIpO1xyXG4gICAgcmV0dXJuIG5ldyBEYXRlKHksIG0gLSAxLCBkKTtcclxuICB9XHJcblxyXG4gIGlmICgvXlxcZHsyfVsuLy1dXFxkezJ9Wy4vLV1cXGR7NH0kLy50ZXN0KGRhdGVQYXJ0KSkge1xyXG4gICAgY29uc3QgcGFydHMgPSBkYXRlUGFydC5zcGxpdCgvWy4vLV0vKS5tYXAoTnVtYmVyKTtcclxuICAgIGNvbnN0IFtkLCBtLCB5XSA9IHBhcnRzO1xyXG4gICAgcmV0dXJuIG5ldyBEYXRlKHksIG0gLSAxLCBkKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHBhcnNlZCA9IG5ldyBEYXRlKHJhdyk7XHJcbiAgcmV0dXJuIE51bWJlci5pc05hTihwYXJzZWQuZ2V0VGltZSgpKSA/IG51bGwgOiBwYXJzZWQ7XHJcbn07XHJcblxyXG5jb25zdCBmb3JtYXREYXRlUGFydHMgPSAodmFsdWU6IHN0cmluZywgbG9jYWxlOiBzdHJpbmcpID0+IHtcclxuICBpZiAoIXZhbHVlKSByZXR1cm4geyB5ZWFyOiBcIlwiLCBtb250aDogXCJcIiwgZGF5OiBcIlwiIH07XHJcbiAgY29uc3QgZCA9IHBhcnNlRGF0ZVZhbHVlKHZhbHVlKTtcclxuICBpZiAoIWQpIHJldHVybiB7IHllYXI6IFwiXCIsIG1vbnRoOiBcIlwiLCBkYXk6IFwiXCIgfTtcclxuICBsZXQgbW9udGggPSBcIlwiO1xyXG4gIGlmIChpc0Jhc3F1ZUxvY2FsZShsb2NhbGUpKSB7XHJcbiAgICBtb250aCA9IEJBU1FVRV9NT05USFNfU0hPUlRbZC5nZXRNb250aCgpXSB8fCBcIlwiO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBtb250aCA9IGQudG9Mb2NhbGVEYXRlU3RyaW5nKGxvY2FsZSwgeyBtb250aDogXCJzaG9ydFwiIH0pLnJlcGxhY2UoL1xcLi9nLCBcIlwiKTtcclxuICB9XHJcbiAgcmV0dXJuIHtcclxuICAgIHllYXI6IFN0cmluZyhkLmdldEZ1bGxZZWFyKCkpLFxyXG4gICAgbW9udGg6IG1vbnRoLnRvVXBwZXJDYXNlKCksXHJcbiAgICBkYXk6IFN0cmluZyhkLmdldERhdGUoKSkucGFkU3RhcnQoMiwgXCIwXCIpLFxyXG4gIH07XHJcbn07XHJcblxyXG5jb25zdCB0b1RpdGxlQ2FzZSA9ICh2YWx1ZTogc3RyaW5nLCBsb2NhbGU6IHN0cmluZykgPT4ge1xyXG4gIGlmICghdmFsdWUpIHJldHVybiBcIlwiO1xyXG4gIGNvbnN0IGxvd2VyID0gdmFsdWUudG9Mb2NhbGVMb3dlckNhc2UobG9jYWxlKTtcclxuICB0cnkge1xyXG4gICAgcmV0dXJuIGxvd2VyLnJlcGxhY2UoLyhefFteXFxwe0x9XSkoXFxwe0x9KS9ndSwgKF9tYXRjaCwgcHJlZml4LCBjaCkgPT4gYCR7cHJlZml4fSR7Y2gudG9Mb2NhbGVVcHBlckNhc2UobG9jYWxlKX1gKTtcclxuICB9IGNhdGNoIHtcclxuICAgIHJldHVybiBsb3dlci5yZXBsYWNlKC8oXnxbXFxzLS9dKShcXFMpL2csIChfbWF0Y2gsIHByZWZpeCwgY2gpID0+IGAke3ByZWZpeH0ke2NoLnRvTG9jYWxlVXBwZXJDYXNlKGxvY2FsZSl9YCk7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgdG9TZW50ZW5jZUNhc2UgPSAodmFsdWU6IHN0cmluZywgbG9jYWxlOiBzdHJpbmcpID0+IHtcclxuICBpZiAoIXZhbHVlKSByZXR1cm4gXCJcIjtcclxuICBjb25zdCB0cmltbWVkID0gdmFsdWUudHJpbSgpO1xyXG4gIGlmICghdHJpbW1lZCkgcmV0dXJuIHRyaW1tZWQ7XHJcbiAgY29uc3QgbG93ZXIgPSB0cmltbWVkLnRvTG9jYWxlTG93ZXJDYXNlKGxvY2FsZSk7XHJcbiAgcmV0dXJuIGxvd2VyWzBdLnRvTG9jYWxlVXBwZXJDYXNlKGxvY2FsZSkgKyBsb3dlci5zbGljZSgxKTtcclxufTtcclxuXHJcbmNvbnN0IGxvZ0hpc3RvcnkgPSAobWVzc2FnZTogc3RyaW5nLCBkYXRhPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pID0+IHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybjtcbiAgY29uc3QgZGVidWdGbGFnID0gKHdpbmRvdyBhcyBhbnkpLl9fSU5EX0RFQlVHX0hJU1RPUllfXztcbiAgaWYgKGRlYnVnRmxhZyAhPT0gdHJ1ZSkgcmV0dXJuO1xuICBpZiAoZGF0YSkge1xuICAgIGNvbnNvbGUuZGVidWcoXCJbSGlzdG9yeV1cIiwgbWVzc2FnZSwgZGF0YSk7XG4gIH0gZWxzZSB7XG4gICAgY29uc29sZS5kZWJ1ZyhcIltIaXN0b3J5XVwiLCBtZXNzYWdlKTtcclxuICB9XHJcbn07XHJcblxyXG4vLyBIaXN0b3J5IHBhZ2Ugd2l0aCBSZWFjdCBzdGF0ZSArIGVmZmVjdHMgKG5vIGxlZ2FjeSBET00gbG9naWMpLlxyXG5leHBvcnQgY29uc3QgSGlzdG9yeVBhZ2UgPSAoeyBkZWZhdWx0RnJvbURhdGUgPSBcIlwiLCBkZWZhdWx0VG9EYXRlID0gXCJcIiB9OiBQcm9wcykgPT4ge1xyXG4gIGNvbnN0IGxvY2FsZSA9IHVzZU1lbW8oKCkgPT4gZ2V0VWlMb2NhbGUoKSwgW10pO1xyXG4gIGNvbnN0IGNhblZpZXdIaXN0b3J5ID0gY2FuQWNjZXNzKFwiVklTSVRBU19ISVNUT1JJQUxcIiwgXCJWaWV3XCIpO1xyXG4gIGNvbnN0IGNhbkNyZWF0ZVZpc2l0ID0gY2FuQWNjZXNzKFwiVklTSVRBU19DUkVBQ0lPTlwiLCBcIkFkZFwiKTtcclxuICBjb25zdCBub0RhdGFUZXh0ID0gaW5kVChcIkNvbW1vbl9Ob0RhdGFcIiwgXCJObyBkYXRhXCIpO1xyXG5cclxuICBjb25zdCBhY3RpdmF0b3JSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgcG9wb3ZlclJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xuXG4gIGNvbnN0IHsgcmVhZENhY2hlZEZpbHRlciwgY2xlYXJGaWx0ZXJDYWNoZSwgY29uc3VtZVJldHVybkZsYWcsIHNhdmVDYWNoZWRGaWx0ZXIgfSA9IHVzZUhpc3RvcnlGaWx0ZXJDYWNoZSgpO1xuICBjb25zdCB7XG4gICAgc3RhcnREYXRlLFxuICAgIGVuZERhdGUsXG4gICAgaG92ZXJEYXRlLFxuICAgIHNlbGVjdGluZ1N0ZXAsXG4gICAgY3VycmVudE1vbnRoLFxuICAgIGN1cnJlbnRZZWFyLFxuICAgIGlzT3BlbixcbiAgICBzaG93TWFudWFsUGlja2VyUGFuZWwsXG4gICAgYWN0aXZlUXVpY2tGaWx0ZXIsXG4gICAgc2VsZWN0ZWRDbGllbnQsXG4gICAgY2xpZW50UmVzZXRLZXksXG4gICAgc2hvd0ZpbHRlcnMsXG4gICAgc2hvd01hbnVhbEVycm9yLFxuICAgIGZyb21EYXRlVmFsdWUsXG4gICAgdG9EYXRlVmFsdWUsXG4gICAgYWNjb3VudE51bVZhbHVlLFxuICAgIGhhc1Jlc3RvcmVkRmlsdGVyUmVmLFxuICAgIGRpZEluaXRGaWx0ZXJSZWYsXG4gICAgc2V0SG92ZXJEYXRlLFxuICAgIHNldFNlbGVjdGluZ1N0ZXAsXG4gICAgc2V0Q3VycmVudE1vbnRoLFxuICAgIHNldEN1cnJlbnRZZWFyLFxuICAgIHNldElzT3BlbixcbiAgICBzZXRTaG93RmlsdGVycyxcbiAgICBzZXRTaG93TWFudWFsRXJyb3IsXG4gICAgdmFsaWRhdGVNYW51YWxSYW5nZSxcbiAgICBhcHBseURlZmF1bHRSYW5nZUZyb21Qcm9wcyxcbiAgICByZXNldEhpc3RvcnlGaWx0ZXJzLFxuICAgIGFwcGx5Q2FjaGVkRmlsdGVyLFxuICAgIGhhbmRsZVNlbGVjdCxcbiAgICBoYW5kbGVDbGVhclN0YXRlLFxuICAgIG9wZW5Qb3BvdmVyLFxuICAgIGhhbmRsZUFjdGl2YXRvcktleURvd24sXG4gICAgaGFuZGxlU2VjdGlvbktleURvd24sXG4gICAgaGFuZGxlUXVpY2tGaWx0ZXIsXG4gICAgaGFuZGxlQ2xpZW50U2VsZWN0ZWQsXG4gIH0gPSB1c2VIaXN0b3J5RmlsdGVyc1N0YXRlKHtcbiAgICBkZWZhdWx0RnJvbURhdGUsXG4gICAgZGVmYXVsdFRvRGF0ZSxcbiAgICBsb2dIaXN0b3J5LFxuICAgIHBhcnNlRGF0ZVZhbHVlLFxuICAgIHBhcnNlSVNPLFxuICAgIHRvSVNPLFxuICAgIHN0YXJ0T2ZEYXksXG4gICAgaXNCZWZvcmUsXG4gIH0pO1xuXG4gIGNvbnN0IHsgaXRlbXMsIHRvdGFsLCBjdXJyZW50UGFnZSwgaXNMb2FkaW5nLCBlcnJvck1lc3NhZ2UsIGxvYWRBY3Rpdml0aWVzLCByZXNldEFjdGl2aXRpZXMsIHJldHJ5T25OZXR3b3JrRXJyb3JSZWYsIGxhc3RTaWduYXR1cmVSZWYgfSA9XG4gICAgdXNlSGlzdG9yeUFjdGl2aXRpZXMoe1xuICAgICAgZnJvbURhdGVWYWx1ZSxcbiAgICAgIHRvRGF0ZVZhbHVlLFxuICAgICAgYWNjb3VudE51bVZhbHVlLFxuICAgICAgcGFnZVNpemU6IFBBR0VfU0laRSxcbiAgICAgIG5vcm1hbGl6ZVJhbmdlLFxuICAgICAgb25Gb3JiaWRkZW46IHNob3dQZXJtaXNzaW9uTW9kYWwsXG4gICAgICBvbkRlYnVnOiBsb2dIaXN0b3J5LFxuICAgIH0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgbG9nSGlzdG9yeShcImluaXRcIiwgeyBkZWZhdWx0RnJvbURhdGUsIGRlZmF1bHRUb0RhdGUgfSk7XG4gIH0sIFtkZWZhdWx0RnJvbURhdGUsIGRlZmF1bHRUb0RhdGVdKTtcblxyXG4gIGNvbnN0IGFwcGx5RmlsdGVycyA9IHVzZUNhbGxiYWNrKFxuICAgIChvcHRpb25zPzogeyBjbG9zZVBhbmVsPzogYm9vbGVhbjsgZm9yY2U/OiBib29sZWFuOyBwYWdlPzogbnVtYmVyIH0pID0+IHtcclxuICAgICAgaWYgKCF2YWxpZGF0ZU1hbnVhbFJhbmdlKCkpIHJldHVybjtcclxuICAgICAgaWYgKCFzdGFydERhdGUgfHwgIWVuZERhdGUpIHJldHVybjtcclxuXHJcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSBub3JtYWxpemVSYW5nZShmcm9tRGF0ZVZhbHVlLCB0b0RhdGVWYWx1ZSk7XHJcbiAgICAgIGNvbnN0IHBhZ2UgPSBvcHRpb25zPy5wYWdlID8/IDE7XHJcbiAgICAgIGNvbnN0IHNpZ25hdHVyZSA9IGAke25vcm1hbGl6ZWQuZnJvbX18JHtub3JtYWxpemVkLnRvfXwke2FjY291bnROdW1WYWx1ZX18JHtwYWdlfWA7XHJcblxyXG4gICAgICBpZiAob3B0aW9ucz8uZm9yY2UgfHwgbGFzdFNpZ25hdHVyZVJlZi5jdXJyZW50ICE9PSBzaWduYXR1cmUpIHtcclxuICAgICAgICBsb2FkQWN0aXZpdGllcyhwYWdlLCB7IGZyb21EYXRlOiBub3JtYWxpemVkLmZyb20sIHRvRGF0ZTogbm9ybWFsaXplZC50bywgYWNjb3VudE51bTogYWNjb3VudE51bVZhbHVlIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzZXRTaG93TWFudWFsRXJyb3IoZmFsc2UpO1xyXG4gICAgICBpZiAob3B0aW9ucz8uY2xvc2VQYW5lbCkge1xyXG4gICAgICAgIHNldElzT3BlbihmYWxzZSk7XHJcbiAgICAgICAgc2V0U2hvd0ZpbHRlcnMoZmFsc2UpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgW2FjY291bnROdW1WYWx1ZSwgZW5kRGF0ZSwgZnJvbURhdGVWYWx1ZSwgbG9hZEFjdGl2aXRpZXMsIHN0YXJ0RGF0ZSwgdG9EYXRlVmFsdWUsIHZhbGlkYXRlTWFudWFsUmFuZ2VdXHJcbiAgKTtcblxuICBjb25zdCB0b3RhbFBhZ2VzID0gTWF0aC5jZWlsKCh0b3RhbCB8fCAwKSAvIFBBR0VfU0laRSk7XG5cbiAgdXNlSGlzdG9yeVBhZ2VMaXN0ZW5lcnMoe1xuICAgIGlzT3BlbixcbiAgICBhY3RpdmF0b3JSZWYsXG4gICAgcG9wb3ZlclJlZixcbiAgICBoYXNSZXN0b3JlZEZpbHRlclJlZixcbiAgICByZXRyeU9uTmV0d29ya0Vycm9yUmVmLFxuICAgIGN1cnJlbnRQYWdlLFxuICAgIGxvZ0hpc3RvcnksXG4gICAgY29uc3VtZVJldHVybkZsYWcsXG4gICAgcmVhZENhY2hlZEZpbHRlcixcbiAgICBhcHBseUNhY2hlZEZpbHRlcixcbiAgICBsb2FkQWN0aXZpdGllcyxcbiAgICBzZXRJc09wZW4sXG4gICAgc2V0SG92ZXJEYXRlLFxuICAgIHNldFNob3dGaWx0ZXJzLFxuICAgIGFwcGx5RmlsdGVycyxcbiAgfSk7XG5cbiAgLy8gUmVzdG9yZSBjYWNoZWQgZmlsdGVyIG9uIGluaXRpYWwgbW91bnQgb25seS5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoZGlkSW5pdEZpbHRlclJlZi5jdXJyZW50KSByZXR1cm47XG4gICAgZGlkSW5pdEZpbHRlclJlZi5jdXJyZW50ID0gdHJ1ZTtcbiAgICBjb25zdCBjYWNoZWQgPSBjb25zdW1lUmV0dXJuRmxhZygpID8gcmVhZENhY2hlZEZpbHRlcigpIDogbnVsbDtcbiAgICBpZiAoY2FjaGVkICYmIGNhY2hlZC5mcm9tRGF0ZSAmJiBjYWNoZWQudG9EYXRlKSB7XG4gICAgICBsb2dIaXN0b3J5KFwicmVzdG9yZUZpbHRlclwiLCBjYWNoZWQpO1xuICAgICAgY29uc3QgY2FjaGVkUmVxdWVzdCA9IGFwcGx5Q2FjaGVkRmlsdGVyKGNhY2hlZCk7XG4gICAgICBpZiAoY2FjaGVkUmVxdWVzdCkge1xuICAgICAgICByZXRyeU9uTmV0d29ya0Vycm9yUmVmLmN1cnJlbnQgPSB0cnVlO1xuICAgICAgICBsb2FkQWN0aXZpdGllcyhjYWNoZWRSZXF1ZXN0LnBhZ2UsIGNhY2hlZFJlcXVlc3Qub3ZlcnJpZGUpO1xuICAgICAgICBzZXRTaG93RmlsdGVycyhmYWxzZSk7XG4gICAgICAgIHNldElzT3BlbihmYWxzZSk7XG4gICAgICAgIGhhc1Jlc3RvcmVkRmlsdGVyUmVmLmN1cnJlbnQgPSB0cnVlO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgZGVmYXVsdFJlcXVlc3QgPSBhcHBseURlZmF1bHRSYW5nZUZyb21Qcm9wcygpO1xuICAgIGlmIChkZWZhdWx0UmVxdWVzdCkge1xuICAgICAgcmV0cnlPbk5ldHdvcmtFcnJvclJlZi5jdXJyZW50ID0gdHJ1ZTtcbiAgICAgIGxvYWRBY3Rpdml0aWVzKGRlZmF1bHRSZXF1ZXN0LnBhZ2UsIGRlZmF1bHRSZXF1ZXN0Lm92ZXJyaWRlKTtcbiAgICAgIHNldFNob3dGaWx0ZXJzKGZhbHNlKTtcbiAgICAgIHNldElzT3BlbihmYWxzZSk7XG4gICAgICBoYXNSZXN0b3JlZEZpbHRlclJlZi5jdXJyZW50ID0gdHJ1ZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICByZXNldEhpc3RvcnlGaWx0ZXJzKCk7XG4gICAgY2xlYXJGaWx0ZXJDYWNoZSgpO1xuICAgIHJlc2V0QWN0aXZpdGllcygpO1xuICAgIHNldFNob3dGaWx0ZXJzKHRydWUpO1xuICAgIHNldElzT3BlbihmYWxzZSk7XG4gIH0sIFtcbiAgICBhcHBseUNhY2hlZEZpbHRlcixcbiAgICBhcHBseURlZmF1bHRSYW5nZUZyb21Qcm9wcyxcbiAgICBjbGVhckZpbHRlckNhY2hlLFxuICAgIGNvbnN1bWVSZXR1cm5GbGFnLFxuICAgIGRpZEluaXRGaWx0ZXJSZWYsXG4gICAgaGFzUmVzdG9yZWRGaWx0ZXJSZWYsXG4gICAgbG9hZEFjdGl2aXRpZXMsXG4gICAgcmVhZENhY2hlZEZpbHRlcixcbiAgICByZXNldEFjdGl2aXRpZXMsXG4gICAgcmVzZXRIaXN0b3J5RmlsdGVycyxcbiAgICByZXRyeU9uTmV0d29ya0Vycm9yUmVmLFxuICBdKTtcblxyXG4gIC8vIEtlZXAgdGhlIHBpY2tlciBzdGVwIGluIHN5bmMgd2l0aCBjdXJyZW50IHNlbGVjdGlvbi5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKHN0YXJ0RGF0ZSAmJiAhZW5kRGF0ZSAmJiBzZWxlY3RpbmdTdGVwID09PSBcInN0YXJ0XCIpIHtcclxuICAgICAgc2V0U2VsZWN0aW5nU3RlcChcImVuZFwiKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKCFzdGFydERhdGUgJiYgc2VsZWN0aW5nU3RlcCAhPT0gXCJzdGFydFwiKSB7XHJcbiAgICAgIHNldFNlbGVjdGluZ1N0ZXAoXCJzdGFydFwiKTtcclxuICAgIH1cclxuICB9LCBbc3RhcnREYXRlLCBlbmREYXRlLCBzZWxlY3RpbmdTdGVwXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUNsZWFyID0gdXNlQ2FsbGJhY2soXG4gICAgKGV2ZW50OiBSZWFjdC5Nb3VzZUV2ZW50KSA9PiB7XG4gICAgICBoYW5kbGVDbGVhclN0YXRlKGV2ZW50KTtcbiAgICAgIGNsZWFyRmlsdGVyQ2FjaGUoKTtcbiAgICAgIHJlc2V0QWN0aXZpdGllcygpO1xuICAgIH0sXG4gICAgW2NsZWFyRmlsdGVyQ2FjaGUsIGhhbmRsZUNsZWFyU3RhdGUsIHJlc2V0QWN0aXZpdGllc11cbiAgKTtcblxuICBjb25zdCBoYW5kbGVSZXNldEZpbHRlcnMgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgcmVzZXRIaXN0b3J5RmlsdGVycygpO1xuICAgIGNsZWFyRmlsdGVyQ2FjaGUoKTtcbiAgICByZXNldEFjdGl2aXRpZXMoKTtcbiAgICBzZXRJc09wZW4oZmFsc2UpO1xuICAgIHNldFNob3dGaWx0ZXJzKHRydWUpO1xuICB9LCBbY2xlYXJGaWx0ZXJDYWNoZSwgcmVzZXRBY3Rpdml0aWVzLCByZXNldEhpc3RvcnlGaWx0ZXJzLCBzZXRJc09wZW4sIHNldFNob3dGaWx0ZXJzXSk7XG5cclxuICBjb25zdCBoYW5kbGVOYXZpZ2F0ZSA9IHVzZUNhbGxiYWNrKFxuICAgIChsaW5rSWQ6IHN0cmluZykgPT4ge1xuICAgICAgaWYgKCFjYW5WaWV3SGlzdG9yeSkge1xuICAgICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBzYXZlQ2FjaGVkRmlsdGVyKHtcbiAgICAgICAgICBmcm9tRGF0ZTogZnJvbURhdGVWYWx1ZSB8fCBcIlwiLFxuICAgICAgICAgIHRvRGF0ZTogdG9EYXRlVmFsdWUgfHwgXCJcIixcbiAgICAgICAgICBwYWdlOiBjdXJyZW50UGFnZSxcbiAgICAgICAgICBjbGllbnRBY2NvdW50OiBzZWxlY3RlZENsaWVudD8udmFsdWUgfHwgXCJcIixcbiAgICAgICAgICBjbGllbnRUZXh0OiBzZWxlY3RlZENsaWVudD8udGV4dCB8fCBcIlwiLFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZW5jb2RlVVJJQ29tcG9uZW50KGxpbmtJZCk7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYC9WaXNpdGFzL0RldGFsbGUvJHt0YXJnZXR9YDtcbiAgICAgIH0sIE5BVl9ERUxBWV9NUyk7XG4gICAgfSxcbiAgICBbY2FuVmlld0hpc3RvcnksIGN1cnJlbnRQYWdlLCBmcm9tRGF0ZVZhbHVlLCBzYXZlQ2FjaGVkRmlsdGVyLCB0b0RhdGVWYWx1ZSwgc2VsZWN0ZWRDbGllbnRdXG4gICk7XG5cclxuICBjb25zdCBjYWxlbmRhciA9IHVzZU1lbW8oKCkgPT4ge1xyXG4gICAgY29uc3QgZmlyc3REYXkgPSBuZXcgRGF0ZShjdXJyZW50WWVhciwgY3VycmVudE1vbnRoLCAxKTtcclxuICAgIGNvbnN0IGRheXNJbk1vbnRoID0gbmV3IERhdGUoY3VycmVudFllYXIsIGN1cnJlbnRNb250aCArIDEsIDApLmdldERhdGUoKTtcclxuICAgIGNvbnN0IG9mZnNldCA9IChmaXJzdERheS5nZXREYXkoKSArIDYpICUgNztcclxuICAgIGNvbnN0IGNlbGxzOiBDYWxlbmRhckNlbGxbXSA9IFtdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvZmZzZXQ7IGkrKykge1xyXG4gICAgICBjZWxscy5wdXNoKHsgZGF0ZTogbnVsbCwgaXNvOiBcIlwiLCBpc0VtcHR5OiB0cnVlIH0pO1xyXG4gICAgfVxyXG4gICAgZm9yIChsZXQgZCA9IDE7IGQgPD0gZGF5c0luTW9udGg7IGQrKykge1xyXG4gICAgICBjb25zdCBkYXRlT2JqID0gbmV3IERhdGUoY3VycmVudFllYXIsIGN1cnJlbnRNb250aCwgZCk7XHJcbiAgICAgIGNlbGxzLnB1c2goeyBkYXRlOiBkYXRlT2JqLCBpc286IHRvSVNPKGRhdGVPYmopLCBpc0VtcHR5OiBmYWxzZSB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiB7XHJcbiAgICAgIGNlbGxzLFxyXG4gICAgICBsYWJlbDogZm9ybWF0TW9udGhMYWJlbChmaXJzdERheSwgbG9jYWxlKSxcclxuICAgIH07XHJcbiAgfSwgW2N1cnJlbnRNb250aCwgY3VycmVudFllYXIsIGxvY2FsZV0pO1xyXG5cclxuICBjb25zdCBwcmV2aWV3RW5kID0gZW5kRGF0ZSB8fCAoc2VsZWN0aW5nU3RlcCA9PT0gXCJlbmRcIiA/IGhvdmVyRGF0ZSA6IG51bGwpO1xuXG4gIGNvbnN0IGhhbmRsZVByZXZNb250aCA9IHVzZUNhbGxiYWNrKFxuICAgIChldmVudDogUmVhY3QuTW91c2VFdmVudDxIVE1MQnV0dG9uRWxlbWVudD4pID0+IHtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgc2V0Q3VycmVudE1vbnRoKChwcmV2KSA9PiB7XG4gICAgICAgIGNvbnN0IG5leHQgPSBwcmV2IC0gMTtcbiAgICAgICAgaWYgKG5leHQgPCAwKSB7XG4gICAgICAgICAgc2V0Q3VycmVudFllYXIoKHllYXIpID0+IHllYXIgLSAxKTtcbiAgICAgICAgICByZXR1cm4gMTE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICB9KTtcbiAgICB9LFxuICAgIFtzZXRDdXJyZW50TW9udGgsIHNldEN1cnJlbnRZZWFyXVxuICApO1xuXG4gIGNvbnN0IGhhbmRsZU5leHRNb250aCA9IHVzZUNhbGxiYWNrKFxuICAgIChldmVudDogUmVhY3QuTW91c2VFdmVudDxIVE1MQnV0dG9uRWxlbWVudD4pID0+IHtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgc2V0Q3VycmVudE1vbnRoKChwcmV2KSA9PiB7XG4gICAgICAgIGNvbnN0IG5leHQgPSBwcmV2ICsgMTtcbiAgICAgICAgaWYgKG5leHQgPiAxMSkge1xuICAgICAgICAgIHNldEN1cnJlbnRZZWFyKCh5ZWFyKSA9PiB5ZWFyICsgMSk7XG4gICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICB9KTtcbiAgICB9LFxuICAgIFtzZXRDdXJyZW50TW9udGgsIHNldEN1cnJlbnRZZWFyXVxuICApO1xuXG4gIGNvbnN0IGhhbmRsZUdyaWRNb3VzZUxlYXZlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIHNldEhvdmVyRGF0ZShudWxsKTtcbiAgfSwgW3NldEhvdmVyRGF0ZV0pO1xuXG4gIGNvbnN0IGhhbmRsZU1hbnVhbERheUNsaWNrID0gdXNlQ2FsbGJhY2soXG4gICAgKGNlbGw6IEhpc3RvcnlNYW51YWxEYXlDZWxsKSA9PiB7XG4gICAgICBpZiAoIWNlbGwuZGF0ZSkgcmV0dXJuO1xuICAgICAgbG9nSGlzdG9yeShcImRheUNsaWNrXCIsIHsgZGF0ZTogY2VsbC5pc28gfHwgXCJcIiwgZGlzYWJsZWQ6ICEhY2VsbC5kaXNhYmxlZCB9KTtcbiAgICAgIGhhbmRsZVNlbGVjdChjZWxsLmRhdGUpO1xuICAgIH0sXG4gICAgW2hhbmRsZVNlbGVjdF1cbiAgKTtcblxuICBjb25zdCBoYW5kbGVNYW51YWxEYXlIb3ZlciA9IHVzZUNhbGxiYWNrKFxuICAgIChjZWxsOiBIaXN0b3J5TWFudWFsRGF5Q2VsbCkgPT4ge1xuICAgICAgaWYgKCFjZWxsLmRhdGUpIHJldHVybjtcbiAgICAgIGlmIChzZWxlY3RpbmdTdGVwID09PSBcImVuZFwiICYmIHN0YXJ0RGF0ZSkge1xuICAgICAgICBzZXRIb3ZlckRhdGUobmV3IERhdGUoY2VsbC5kYXRlKSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBbc2VsZWN0aW5nU3RlcCwgc2V0SG92ZXJEYXRlLCBzdGFydERhdGVdXG4gICk7XG5cbiAgY29uc3QgbWFudWFsRGF5Q2VsbHMgPSB1c2VNZW1vPEhpc3RvcnlNYW51YWxEYXlDZWxsW10+KCgpID0+IHtcbiAgICByZXR1cm4gY2FsZW5kYXIuY2VsbHMubWFwKChjZWxsLCBpZHgpID0+IHtcbiAgICAgIGlmIChjZWxsLmlzRW1wdHkpIHtcbiAgICAgICAgcmV0dXJuIHsga2V5OiBgZW1wdHktJHtpZHh9YCwgaXNFbXB0eTogdHJ1ZSB9O1xuICAgICAgfVxuXG4gICAgICBjb25zdCBkYXRlT2JqID0gY2VsbC5kYXRlIGFzIERhdGU7XG4gICAgICBjb25zdCBpc1N0YXJ0ID0gc2FtZURheShkYXRlT2JqLCBzdGFydERhdGUpO1xuICAgICAgY29uc3QgaXNFbmQgPSBzYW1lRGF5KGRhdGVPYmosIGVuZERhdGUpO1xuICAgICAgY29uc3QgaW5SYW5nZSA9IHN0YXJ0RGF0ZSAmJiBwcmV2aWV3RW5kICYmIGlzQmVmb3JlKHN0YXJ0RGF0ZSwgZGF0ZU9iaikgJiYgaXNCZWZvcmUoZGF0ZU9iaiwgcHJldmlld0VuZCk7XG4gICAgICBjb25zdCBob3ZlclJhbmdlID0gc3RhcnREYXRlICYmICFlbmREYXRlICYmIGhvdmVyRGF0ZSAmJiBpc0JlZm9yZShzdGFydERhdGUsIGRhdGVPYmopICYmIGlzQmVmb3JlKGRhdGVPYmosIGhvdmVyRGF0ZSk7XG4gICAgICBjb25zdCBkaXNhYmxlZCA9IHNlbGVjdGluZ1N0ZXAgPT09IFwiZW5kXCIgJiYgISFzdGFydERhdGUgJiYgaXNCZWZvcmUoZGF0ZU9iaiwgc3RhcnREYXRlKTtcbiAgICAgIGNvbnN0IGlzVG9kYXkgPSBzYW1lRGF5KGRhdGVPYmosIG5ldyBEYXRlKCkpO1xuXG4gICAgICBjb25zdCBkYXlDbGFzcyA9IGNsYXNzTmFtZXMoXG4gICAgICAgIFwiZHJwLWRheVwiLFxuICAgICAgICBpc1N0YXJ0ID8gXCJzdGFydCByYW5nZS1zdGFydFwiIDogXCJcIixcbiAgICAgICAgaXNFbmQgPyBcImVuZCByYW5nZS1lbmRcIiA6IFwiXCIsXG4gICAgICAgIGluUmFuZ2UgPyBcImluLXJhbmdlXCIgOiBcIlwiLFxuICAgICAgICBob3ZlclJhbmdlID8gXCJob3Zlci1yYW5nZVwiIDogXCJcIixcbiAgICAgICAgZGlzYWJsZWQgPyBcImRpc2FibGVkXCIgOiBcIlwiLFxuICAgICAgICBpc1RvZGF5ID8gXCJ0b2RheVwiIDogXCJcIlxuICAgICAgKTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAga2V5OiBjZWxsLmlzbyxcbiAgICAgICAgaXNFbXB0eTogZmFsc2UsXG4gICAgICAgIGRhdGU6IGRhdGVPYmosXG4gICAgICAgIGlzbzogY2VsbC5pc28sXG4gICAgICAgIGRheUxhYmVsOiBkYXRlT2JqLmdldERhdGUoKSxcbiAgICAgICAgZGF5Q2xhc3MsXG4gICAgICAgIGRpc2FibGVkLFxuICAgICAgfTtcbiAgICB9KTtcbiAgfSwgW2NhbGVuZGFyLmNlbGxzLCBlbmREYXRlLCBob3ZlckRhdGUsIHByZXZpZXdFbmQsIHNlbGVjdGluZ1N0ZXAsIHN0YXJ0RGF0ZV0pO1xuXHJcbiAgY29uc3QgeyB0aW1lbGluZUl0ZW1zIH0gPSB1c2VIaXN0b3J5VGltZWxpbmVJdGVtcyh7XG4gICAgaXRlbXMsXG4gICAgbG9jYWxlLFxuICAgIG5vRGF0YVRleHQsXG4gICAgbG9nSGlzdG9yeSxcbiAgICB0b1RpdGxlQ2FzZSxcbiAgICBmb3JtYXREYXRlUGFydHMsXG4gIH0pO1xuXHJcbiAgY29uc3QgbGFiZWxGcm9tID0gdG9TZW50ZW5jZUNhc2UoaW5kVChcIkhpc3RvcnlfRnJvbVwiLCBcIkZyb21cIiksIGxvY2FsZSk7XG4gIGNvbnN0IGxhYmVsVG8gPSB0b1NlbnRlbmNlQ2FzZShpbmRUKFwiSGlzdG9yeV9Ub1wiLCBcIlRvXCIpLCBsb2NhbGUpO1xuICBjb25zdCBzdW1tYXJ5RnJvbSA9IGxhYmVsRnJvbTtcbiAgY29uc3Qgc3VtbWFyeVRvID0gbGFiZWxUbztcbiAgY29uc3QgZmlsdGVyVGl0bGUgPSBpbmRUKFwiSGlzdG9yeV9GaWx0ZXJfRGF0ZVwiLCBcIkRhdGVcIik7XG4gIGNvbnN0IGFkZERhdGVMYWJlbCA9IGluZFQoXCJIaXN0b3J5X0FkZERhdGVcIiwgXCJBZGQgZGF0ZVwiKTtcbiAgY29uc3QgY2xlYXJSYW5nZUxhYmVsID0gaW5kVChcIkhpc3RvcnlfQ2xlYXJSYW5nZVwiLCBcIkNsZWFyIHJhbmdlXCIpO1xuICBjb25zdCBwcmV2TW9udGhMYWJlbCA9IGluZFQoXCJIaXN0b3J5X1ByZXZNb250aFwiLCBcIlByZXZpb3VzIG1vbnRoXCIpO1xuICBjb25zdCBuZXh0TW9udGhMYWJlbCA9IGluZFQoXCJIaXN0b3J5X05leHRNb250aFwiLCBcIk5leHQgbW9udGhcIik7XG4gIGNvbnN0IHN0YXR1c1NlbGVjdFN0YXJ0TGFiZWwgPSBpbmRUKFwiSGlzdG9yeV9TdGF0dXNfU2VsZWN0U3RhcnRcIiwgXCJTZWxlY3Qgc3RhcnQgZGF0ZVwiKTtcbiAgY29uc3Qgc3RhdHVzU2VsZWN0RW5kTGFiZWwgPSBpbmRUKFwiSGlzdG9yeV9TdGF0dXNfU2VsZWN0RW5kXCIsIFwiU2VsZWN0IGVuZCBkYXRlXCIpO1xuICBjb25zdCB3ZWVrRGF5TGFiZWxzID0gdXNlTWVtbyhcbiAgICAoKSA9PiBbXG4gICAgICBpbmRUKFwiSGlzdG9yeV9EYXlfTW9uXCIsIFwiTW9uXCIpLFxuICAgICAgaW5kVChcIkhpc3RvcnlfRGF5X1R1ZVwiLCBcIlR1ZVwiKSxcbiAgICAgIGluZFQoXCJIaXN0b3J5X0RheV9XZWRcIiwgXCJXZWRcIiksXG4gICAgICBpbmRUKFwiSGlzdG9yeV9EYXlfVGh1XCIsIFwiVGh1XCIpLFxuICAgICAgaW5kVChcIkhpc3RvcnlfRGF5X0ZyaVwiLCBcIkZyaVwiKSxcbiAgICAgIGluZFQoXCJIaXN0b3J5X0RheV9TYXRcIiwgXCJTYXRcIiksXG4gICAgICBpbmRUKFwiSGlzdG9yeV9EYXlfU3VuXCIsIFwiU3VuXCIpLFxuICAgIF0sXG4gICAgW11cbiAgKTtcbiAgY29uc3QgY2xlYXJMYWJlbCA9IGluZFQoXCJIaXN0b3J5X0ZpbHRlcl9DbGVhclwiLCBcIkNsZWFyXCIpO1xuICBjb25zdCBhcHBseUxhYmVsID0gaW5kVChcIkhpc3RvcnlfRmlsdGVyX0FwcGx5XCIsIFwiQXBwbHlcIik7XG4gIGNvbnN0IGNsaWVudExhYmVsID0gaW5kVChcIkhpc3RvcnlfRmlsdGVyX0NsaWVudFwiLCBcIkNsaWVudFwiKTtcclxuICBjb25zdCBxdWlja0N1c3RvbUxhYmVsID0gaW5kVChcIkhpc3RvcnlfUXVpY2tfQ3VzdG9tXCIsIFwiRGF0ZVwiKTtcbiAgY29uc3QgcXVpY2s3RGF5c0xhYmVsID0gaW5kVChcIkhpc3RvcnlfUXVpY2tfN0RheXNcIiwgXCI3IGRheXNcIik7XG4gIGNvbnN0IHF1aWNrMzBEYXlzTGFiZWwgPSBpbmRUKFwiSGlzdG9yeV9RdWlja18zMERheXNcIiwgXCIzMCBkYXlzXCIpO1xuICBjb25zdCBxdWljazkwRGF5c0xhYmVsID0gaW5kVChcIkhpc3RvcnlfUXVpY2tfOTBEYXlzXCIsIFwiOTAgZGF5c1wiKTtcbiAgY29uc3QgcGFnZUZpcnN0TGFiZWwgPSBpbmRUKFwiSGlzdG9yeV9QYWdlX0ZpcnN0XCIsIFwiRmlyc3RcIik7XG4gIGNvbnN0IHBhZ2VQcmV2TGFiZWwgPSBpbmRUKFwiSGlzdG9yeV9QYWdlX1ByZXZcIiwgXCJQcmV2aW91c1wiKTtcbiAgY29uc3QgcGFnZU5leHRMYWJlbCA9IGluZFQoXCJIaXN0b3J5X1BhZ2VfTmV4dFwiLCBcIk5leHRcIik7XG4gIGNvbnN0IHBhZ2VMYXN0TGFiZWwgPSBpbmRUKFwiSGlzdG9yeV9QYWdlX0xhc3RcIiwgXCJMYXN0XCIpO1xuICBjb25zdCBxdWlja0ZpbHRlcnMgPSB1c2VNZW1vKFxuICAgICgpID0+IFtcbiAgICAgIHsgaWQ6IFwiY3VzdG9tXCIgYXMgY29uc3QsIGxhYmVsOiBxdWlja0N1c3RvbUxhYmVsIH0sXG4gICAgICB7IGlkOiBcImRheXMtN1wiIGFzIGNvbnN0LCBsYWJlbDogcXVpY2s3RGF5c0xhYmVsIH0sXG4gICAgICB7IGlkOiBcImRheXMtMzBcIiBhcyBjb25zdCwgbGFiZWw6IHF1aWNrMzBEYXlzTGFiZWwgfSxcbiAgICAgIHsgaWQ6IFwiZGF5cy05MFwiIGFzIGNvbnN0LCBsYWJlbDogcXVpY2s5MERheXNMYWJlbCB9LFxuICAgIF0sXG4gICAgW3F1aWNrMzBEYXlzTGFiZWwsIHF1aWNrN0RheXNMYWJlbCwgcXVpY2s5MERheXNMYWJlbCwgcXVpY2tDdXN0b21MYWJlbF1cbiAgKTtcbiAgY29uc3QgcGFnaW5hdGlvbkxhYmVscyA9IHVzZU1lbW8oXG4gICAgKCkgPT4gKHtcbiAgICAgIGZpcnN0OiBwYWdlRmlyc3RMYWJlbCxcbiAgICAgIHByZXY6IHBhZ2VQcmV2TGFiZWwsXG4gICAgICBuZXh0OiBwYWdlTmV4dExhYmVsLFxuICAgICAgbGFzdDogcGFnZUxhc3RMYWJlbCxcbiAgICB9KSxcbiAgICBbcGFnZUZpcnN0TGFiZWwsIHBhZ2VMYXN0TGFiZWwsIHBhZ2VOZXh0TGFiZWwsIHBhZ2VQcmV2TGFiZWxdXG4gICk7XG4gIGNvbnN0IHNob3dGaWx0ZXJBY3Rpb25zID0gc2hvd0ZpbHRlcnM7XG4gIGNvbnN0IHNob3dTdW1tYXJ5ID0gIXNob3dGaWx0ZXJzICYmICEhc3RhcnREYXRlICYmICEhZW5kRGF0ZTtcbiAgY29uc3Qgc2hvd1Jlc3VsdHMgPSAhc2hvd0ZpbHRlcnM7XG4gIGNvbnN0IHNob3dNYW51YWxQaWNrZXIgPSBhY3RpdmVRdWlja0ZpbHRlciA9PT0gXCJjdXN0b21cIiAmJiBzaG93TWFudWFsUGlja2VyUGFuZWw7XG4gIGNvbnN0IHNob3dJbmxpbmVTdW1tYXJ5ID0gISFzdGFydERhdGUgJiYgISFlbmREYXRlICYmICFzaG93TWFudWFsUGlja2VyO1xuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwibWF4LXctM3hsIG14LWF1dG8gcHgtMSBzbTpweC0yIHB0LTMgcGItNCBzcGFjZS15LTJcIj5cclxuICAgICAge3Nob3dTdW1tYXJ5ICYmIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaWx0ZXItY2FyZCBmaWx0ZXItY2FyZC0tc3VtbWFyeSBwLTMgc206cC00IG10LTEgbWItM1wiPlxuICAgICAgICAgIDxIaXN0b3J5U3VtbWFyeVxuICAgICAgICAgICAgc3VtbWFyeUZyb21MYWJlbD17c3VtbWFyeUZyb219XG4gICAgICAgICAgICBzdW1tYXJ5VG9MYWJlbD17c3VtbWFyeVRvfVxuICAgICAgICAgICAgZnJvbVZhbHVlPXtzdGFydERhdGUgPyBmb3JtYXREaXNwbGF5KHN0YXJ0RGF0ZSwgbG9jYWxlKSA6IFwiLS1cIn1cbiAgICAgICAgICAgIHRvVmFsdWU9e2VuZERhdGUgPyBmb3JtYXREaXNwbGF5KGVuZERhdGUsIGxvY2FsZSkgOiBcIi0tXCJ9XG4gICAgICAgICAgICBjbGllbnRMYWJlbD17Y2xpZW50TGFiZWx9XG4gICAgICAgICAgICBjbGllbnRWYWx1ZT17c2VsZWN0ZWRDbGllbnQ/LnRleHQgfHwgXCJcIn1cbiAgICAgICAgICAgIHNob3dDbGllbnQ9eyEhc2VsZWN0ZWRDbGllbnR9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuICAgICAge3Nob3dGaWx0ZXJzICYmIChcclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaWx0ZXItY2FyZCBmaWx0ZXItY2FyZC0tZXhwYW5kZWQgcC0yIHNtOnAtMi41IHJlbGF0aXZlXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTEuNSBoaXN0b3J5LWZpbHRlci1zdGFjayBmbGV4IGZsZXgtY29sXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgZ2FwLTIgaGlzdG9yeS1xdWljay1maWx0ZXJzXCIgYXJpYS1sYWJlbD17ZmlsdGVyVGl0bGV9PlxuICAgICAgICAgICAge3F1aWNrRmlsdGVycy5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgaXNBY3RpdmUgPSBhY3RpdmVRdWlja0ZpbHRlciA9PT0gaXRlbS5pZDtcbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8RmlsdGVyQnV0dG9uXG4gICAgICAgICAgICAgICAgICBrZXk9e2l0ZW0uaWR9XG4gICAgICAgICAgICAgICAgICBsYWJlbD17aXRlbS5sYWJlbH1cbiAgICAgICAgICAgICAgICAgIGFjdGl2ZT17aXNBY3RpdmV9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGxcIlxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlUXVpY2tGaWx0ZXIoaXRlbS5pZCl9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pfVxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAge3Nob3dJbmxpbmVTdW1tYXJ5ICYmIChcbiAgICAgICAgICAgIDxIaXN0b3J5U3VtbWFyeVxuICAgICAgICAgICAgICBzdW1tYXJ5RnJvbUxhYmVsPXtzdW1tYXJ5RnJvbX1cbiAgICAgICAgICAgICAgc3VtbWFyeVRvTGFiZWw9e3N1bW1hcnlUb31cbiAgICAgICAgICAgICAgZnJvbVZhbHVlPXtzdGFydERhdGUgPyBmb3JtYXREaXNwbGF5KHN0YXJ0RGF0ZSwgbG9jYWxlKSA6IFwiLS1cIn1cbiAgICAgICAgICAgICAgdG9WYWx1ZT17ZW5kRGF0ZSA/IGZvcm1hdERpc3BsYXkoZW5kRGF0ZSwgbG9jYWxlKSA6IFwiLS1cIn1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZ2FwLXktMSB0ZXh0LVsxMXB4XSBweC0xXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKX1cblxuICAgICAgICAgIHtzaG93TWFudWFsUGlja2VyICYmIChcbiAgICAgICAgICAgIDxIaXN0b3J5TWFudWFsRGF0ZVBpY2tlclxuICAgICAgICAgICAgICBhY3RpdmF0b3JSZWY9e2FjdGl2YXRvclJlZn1cbiAgICAgICAgICAgICAgcG9wb3ZlclJlZj17cG9wb3ZlclJlZn1cbiAgICAgICAgICAgICAgc2hvd01hbnVhbEVycm9yPXtzaG93TWFudWFsRXJyb3J9XG4gICAgICAgICAgICAgIHNob3dTdGFydEVycm9yPXtzaG93TWFudWFsRXJyb3IgJiYgIXN0YXJ0RGF0ZX1cbiAgICAgICAgICAgICAgc2hvd0VuZEVycm9yPXtzaG93TWFudWFsRXJyb3IgJiYgIWVuZERhdGV9XG4gICAgICAgICAgICAgIGZpbHRlclRpdGxlPXtmaWx0ZXJUaXRsZX1cbiAgICAgICAgICAgICAgaXNPcGVuPXtpc09wZW59XG4gICAgICAgICAgICAgIHNlbGVjdGluZ1N0ZXA9e3NlbGVjdGluZ1N0ZXB9XG4gICAgICAgICAgICAgIGxhYmVsRnJvbT17bGFiZWxGcm9tfVxuICAgICAgICAgICAgICBsYWJlbFRvPXtsYWJlbFRvfVxuICAgICAgICAgICAgICBzdGFydERhdGVUZXh0PXtzdGFydERhdGUgPyBmb3JtYXREaXNwbGF5KHN0YXJ0RGF0ZSwgbG9jYWxlKSA6IGFkZERhdGVMYWJlbH1cbiAgICAgICAgICAgICAgZW5kRGF0ZVRleHQ9e2VuZERhdGUgPyBmb3JtYXREaXNwbGF5KGVuZERhdGUsIGxvY2FsZSkgOiBhZGREYXRlTGFiZWx9XG4gICAgICAgICAgICAgIGNsZWFyUmFuZ2VMYWJlbD17Y2xlYXJSYW5nZUxhYmVsfVxuICAgICAgICAgICAgICBoYXNTZWxlY3RlZFJhbmdlPXshIXN0YXJ0RGF0ZSB8fCAhIWVuZERhdGV9XG4gICAgICAgICAgICAgIG1vbnRoTGFiZWw9e2NhbGVuZGFyLmxhYmVsfVxuICAgICAgICAgICAgICB3ZWVrRGF5TGFiZWxzPXt3ZWVrRGF5TGFiZWxzfVxuICAgICAgICAgICAgICBzdGF0dXNUZXh0PXtzZWxlY3RpbmdTdGVwID09PSBcInN0YXJ0XCIgPyBzdGF0dXNTZWxlY3RTdGFydExhYmVsIDogc3RhdHVzU2VsZWN0RW5kTGFiZWx9XG4gICAgICAgICAgICAgIGRheUNlbGxzPXttYW51YWxEYXlDZWxsc31cbiAgICAgICAgICAgICAgcHJldk1vbnRoTGFiZWw9e3ByZXZNb250aExhYmVsfVxuICAgICAgICAgICAgICBuZXh0TW9udGhMYWJlbD17bmV4dE1vbnRoTGFiZWx9XG4gICAgICAgICAgICAgIG9uT3BlblBvcG92ZXI9e29wZW5Qb3BvdmVyfVxuICAgICAgICAgICAgICBvbkFjdGl2YXRvcktleURvd249e2hhbmRsZUFjdGl2YXRvcktleURvd259XG4gICAgICAgICAgICAgIG9uU2VjdGlvbktleURvd249e2hhbmRsZVNlY3Rpb25LZXlEb3dufVxuICAgICAgICAgICAgICBvbkNsZWFyPXtoYW5kbGVDbGVhcn1cbiAgICAgICAgICAgICAgb25QcmV2TW9udGg9e2hhbmRsZVByZXZNb250aH1cbiAgICAgICAgICAgICAgb25OZXh0TW9udGg9e2hhbmRsZU5leHRNb250aH1cbiAgICAgICAgICAgICAgb25HcmlkTW91c2VMZWF2ZT17aGFuZGxlR3JpZE1vdXNlTGVhdmV9XG4gICAgICAgICAgICAgIG9uRGF5Q2xpY2s9e2hhbmRsZU1hbnVhbERheUNsaWNrfVxuICAgICAgICAgICAgICBvbkRheUhvdmVyPXtoYW5kbGVNYW51YWxEYXlIb3Zlcn1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKX1cblxyXG4gICAgICAgICAgPENsaWVudFNlYXJjaENvbWJvYm94XHJcbiAgICAgICAgICAgIGtleT17Y2xpZW50UmVzZXRLZXl9XHJcbiAgICAgICAgICAgIHZhbHVlPXtzZWxlY3RlZENsaWVudH1cclxuICAgICAgICAgICAgb25TZWxlY3RlZD17aGFuZGxlQ2xpZW50U2VsZWN0ZWR9XHJcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiSGlzdG9yeV9GaWx0ZXJfQ2xpZW50XCIsIFwiQ2xpZW50XCIpfVxyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIkhpc3RvcnlfRmlsdGVyX0NsaWVudFwiLCBcIkNsaWVudFwiKX1cclxuICAgICAgICAgICAgdmFyaWFudD1cImNvbXBhY3RcIlxyXG4gICAgICAgICAgICBzaG93TGFiZWw9e2ZhbHNlfVxyXG4gICAgICAgICAgICBpZEJhc2U9XCJoaXN0b3J5LWNsaWVudFwiXHJcbiAgICAgICAgICAgIHBvcnRhbENsYXNzTmFtZT1cInZpc2l0YXMtdHlwb2dyYXBoeVwiXHJcbiAgICAgICAgICAvPlxyXG5cclxuICAgICAgICAgIHtzaG93RmlsdGVyQWN0aW9ucyAmJiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtMSBncmlkIGdyaWQtY29scy0yIGdhcC0yIGhpc3RvcnktZmlsdGVyLWFjdGlvbnNcIj5cbiAgICAgICAgICAgICAgPEFjdGlvbkJ1dHRvblxuICAgICAgICAgICAgICAgIGxhYmVsPXtjbGVhckxhYmVsfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbFwiXG4gICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlUmVzZXRGaWx0ZXJzfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8QWN0aW9uQnV0dG9uXG4gICAgICAgICAgICAgICAgbGFiZWw9e2FwcGx5TGFiZWx9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsXCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICBhcHBseUZpbHRlcnMoeyBjbG9zZVBhbmVsOiB0cnVlLCBwYWdlOiAxIH0pO1xuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApfVxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgICl9XHJcblxyXG4gICAgICA8aW5wdXQgdHlwZT1cImhpZGRlblwiIGlkPVwiZnJvbURhdGVcIiB2YWx1ZT17ZnJvbURhdGVWYWx1ZX0gcmVhZE9ubHkgLz5cclxuICAgICAgPGlucHV0IHR5cGU9XCJoaWRkZW5cIiBpZD1cInRvRGF0ZVwiIHZhbHVlPXt0b0RhdGVWYWx1ZX0gcmVhZE9ubHkgLz5cclxuXHJcbiAgICAgIDxkaXZcclxuICAgICAgICBpZD1cInJlc3VsdHNMb2FkZXJcIlxyXG4gICAgICAgIGNsYXNzTmFtZT1cImxvYWRlci1ib3ggZ2xhc3MtcGFuZWwgc2hhZG93LWNhcmQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC1zbSB0ZXh0LXNsYXRlLTcwMFwiXHJcbiAgICAgICAgc3R5bGU9e3sgZGlzcGxheTogaXNMb2FkaW5nID8gXCJmbGV4XCIgOiBcIm5vbmVcIiB9fVxyXG4gICAgICA+XHJcbiAgICAgICAgPHN2ZyBjbGFzc05hbWU9XCJpbmQtc3Bpbm5lciBoLTUgdy01XCIgdmlld0JveD1cIjAgMCAyMCAyMFwiIHJvbGU9XCJzdGF0dXNcIiBhcmlhLWxhYmVsPXtpbmRUKFwiSGlzdG9yeV9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX0+XHJcbiAgICAgICAgICA8Y2lyY2xlIGNsYXNzTmFtZT1cImluZC1zcGlubmVyX19jaXJjbGVcIiBjeD1cIjEwXCIgY3k9XCIxMFwiIHI9XCI4XCIgc3Ryb2tlV2lkdGg9XCIyXCIgLz5cclxuICAgICAgICA8L3N2Zz5cclxuICAgICAgICB7aW5kVChcIkhpc3RvcnlfTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAge3Nob3dSZXN1bHRzICYmIChcclxuICAgICAgICA8PlxyXG4gICAgICAgICAgPEhpc3RvcnlUYWJsZVxyXG4gICAgICAgICAgICBpdGVtcz17dGltZWxpbmVJdGVtc31cclxuICAgICAgICAgICAgbm9EYXRhVGV4dD17aW5kVChcIkhpc3RvcnlfTm9EYXRhSW5SYW5nZVwiLCBcIk5vIHZpc2l0cyBpbiB0aGlzIHJhbmdlXCIpfVxyXG4gICAgICAgICAgICBlcnJvck1lc3NhZ2U9e2Vycm9yTWVzc2FnZX1cclxuICAgICAgICAgICAgb25OYXZpZ2F0ZT17aGFuZGxlTmF2aWdhdGV9XHJcbiAgICAgICAgICAvPlxyXG5cclxuICAgICAgICAgIDxDb21wYWN0UGFnaW5hdGlvblxuICAgICAgICAgICAgdG90YWxQYWdlcz17dG90YWxQYWdlc31cbiAgICAgICAgICAgIGN1cnJlbnRQYWdlPXtjdXJyZW50UGFnZX1cbiAgICAgICAgICAgIHBhZ2VXaW5kb3c9e1BBR0VfV0lORE9XfVxuICAgICAgICAgICAgbG9hZGluZz17aXNMb2FkaW5nfVxuICAgICAgICAgICAgb25QYWdlQ2hhbmdlPXsocGFnZSkgPT4gbG9hZEFjdGl2aXRpZXMocGFnZSl9XG4gICAgICAgICAgICBsYWJlbHM9e3BhZ2luYXRpb25MYWJlbHN9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC8+XG4gICAgICApfVxuICAgICAge2NhbkNyZWF0ZVZpc2l0ICYmIChcclxuICAgICAgICA8RmxvYXRpbmdBY3Rpb25CdXR0b25cbiAgICAgICAgICByb3V0ZT1cIi9WaXNpdGFzL0NyZWF0ZT9mcmVzaD0xXCJcbiAgICAgICAgICBhcmlhTGFiZWw9e2luZFQoXCJDb21tb25fQ3JlYXRlXCIsIFwiQ3JlYXRlXCIpfVxuICAgICAgICAgIHNpemU9ezc2fVxuICAgICAgICAgIHJpZ2h0PXsxNn1cbiAgICAgICAgICBib3R0b209e0ZBQl9CQVNFX0JPVFRPTX1cbiAgICAgICAgLz5cbiAgICAgICl9XG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbi8vIE1vdW50IGhlbHBlciBmb3IgdGhlIGxlZ2FjeSBSYXpvciB2aWV3LlxuZXhwb3J0IGNvbnN0IG1vdW50SGlzdG9yeVBhZ2UgPSAocm9vdDogSFRNTEVsZW1lbnQpID0+IHtcbiAgY29uc3QgZGVmYXVsdEZyb21EYXRlID0gcm9vdC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWRlZmF1bHQtZnJvbVwiKSB8fCBcIlwiO1xuICBjb25zdCBkZWZhdWx0VG9EYXRlID0gcm9vdC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWRlZmF1bHQtdG9cIikgfHwgXCJcIjtcblxuICBtb3VudFJlYWN0SXNsYW5kKHJvb3QsIDxIaXN0b3J5UGFnZSBkZWZhdWx0RnJvbURhdGU9e2RlZmF1bHRGcm9tRGF0ZX0gZGVmYXVsdFRvRGF0ZT17ZGVmYXVsdFRvRGF0ZX0gLz4pO1xufTtcblxyXG5jb25zdCBtb3VudCA9ICgpID0+IHtcbiAgY29uc3Qgcm9vdEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2aXNpdGFzLWhpc3Rvcnktcm9vdFwiKTtcbiAgaWYgKCFyb290RWwpIHJldHVybjtcbiAgbW91bnRIaXN0b3J5UGFnZShyb290RWwpO1xufTtcblxubW91bnRXaGVuRG9jdW1lbnRSZWFkeShtb3VudCk7XG5cbmV4cG9ydCBkZWZhdWx0IEhpc3RvcnlQYWdlO1xuIiwgImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjaywgdXNlUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBjbGFzc05hbWVzIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2NsYXNzTmFtZXMudHNcIjtcbmltcG9ydCB7IHVzZVRpbWVsaW5lQ2FyZEVmZmVjdHMgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlVGltZWxpbmVDYXJkRWZmZWN0cy50c1wiO1xuXHJcbmV4cG9ydCB0eXBlIFRpbWVsaW5lRGF0ZVBhcnRzID0ge1xyXG4gIHllYXI6IHN0cmluZztcclxuICBtb250aDogc3RyaW5nO1xyXG4gIGRheTogc3RyaW5nO1xyXG59O1xyXG5cclxuZXhwb3J0IHR5cGUgVGltZWxpbmVJdGVtID0ge1xyXG4gIGlkOiBzdHJpbmc7XHJcbiAgYWN0aXZpZGFkSWQ/OiBzdHJpbmc7XHJcbiAgcmVjSWQ/OiBudW1iZXIgfCBudWxsO1xyXG4gIG5hbWU6IHN0cmluZztcclxuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xyXG4gIGZ1bGxOYW1lOiBzdHJpbmc7XHJcbiAgZnVsbERlc2M6IHN0cmluZztcclxuICBkYXRlUGFydHM6IFRpbWVsaW5lRGF0ZVBhcnRzO1xyXG4gIGlzTm9EYXRhOiBib29sZWFuO1xyXG59O1xyXG5cclxudHlwZSBQcm9wcyA9IHtcclxuICBpdGVtczogVGltZWxpbmVJdGVtW107XHJcbiAgbm9EYXRhVGV4dDogc3RyaW5nO1xyXG4gIGVycm9yTWVzc2FnZTogc3RyaW5nO1xyXG4gIG9uTmF2aWdhdGU6IChsaW5rSWQ6IHN0cmluZykgPT4gdm9pZDtcclxufTtcclxuXHJcbmNvbnN0IFRBUF9NT1ZFX1BYID0gMTQ7XG5jb25zdCBIT0xEX1RPX1BSRVZJRVdfTVMgPSAxNjA7XG5cclxudHlwZSBUYXBHdWFyZFN0YXRlID0ge1xuICBhY3RpdmU6IGJvb2xlYW47XG4gIHBvaW50ZXJJZDogbnVtYmVyIHwgbnVsbDtcbiAgc3RhcnRYOiBudW1iZXI7XG4gIHN0YXJ0WTogbnVtYmVyO1xuICBzdGFydFRpbWU6IG51bWJlcjtcbiAgbW92ZWQ6IGJvb2xlYW47XG4gIGxpbmtJZDogc3RyaW5nO1xufTtcblxyXG5jb25zdCBIaXN0b3J5VGFibGUgPSAoeyBpdGVtcywgbm9EYXRhVGV4dCwgZXJyb3JNZXNzYWdlLCBvbk5hdmlnYXRlIH06IFByb3BzKSA9PiB7XG4gIGNvbnN0IGNvbnRhaW5lclJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xuICBjb25zdCB0YXBHdWFyZFJlZiA9IHVzZVJlZjxUYXBHdWFyZFN0YXRlPih7XG4gICAgYWN0aXZlOiBmYWxzZSxcbiAgICBwb2ludGVySWQ6IG51bGwsXG4gICAgc3RhcnRYOiAwLFxuICAgIHN0YXJ0WTogMCxcbiAgICBzdGFydFRpbWU6IDAsXG4gICAgbW92ZWQ6IGZhbHNlLFxuICAgIGxpbmtJZDogXCJcIixcbiAgfSk7XG5cbiAgY29uc3QgcmVzb2x2ZUNsaWNrYWJsZUNhcmQgPSB1c2VDYWxsYmFjaygodGFyZ2V0OiBFdmVudFRhcmdldCB8IG51bGwpID0+IHtcbiAgICBjb25zdCBub2RlID0gdGFyZ2V0IGFzIEhUTUxFbGVtZW50IHwgbnVsbDtcbiAgICBpZiAoIW5vZGUgfHwgdHlwZW9mIG5vZGUuY2xvc2VzdCAhPT0gXCJmdW5jdGlvblwiKSByZXR1cm4gbnVsbDtcbiAgICBjb25zdCBjYXJkID0gbm9kZS5jbG9zZXN0PEhUTUxFbGVtZW50PihcIi50aW1lbGluZS1jYXJkLS1jbGlja2FibGVbZGF0YS1saW5rLWlkXVwiKTtcbiAgICBpZiAoIWNhcmQpIHJldHVybiBudWxsO1xuICAgIGlmICghY29udGFpbmVyUmVmLmN1cnJlbnQ/LmNvbnRhaW5zKGNhcmQpKSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gY2FyZDtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IHJlc2V0VGFwR3VhcmQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgdGFwR3VhcmRSZWYuY3VycmVudC5hY3RpdmUgPSBmYWxzZTtcbiAgICB0YXBHdWFyZFJlZi5jdXJyZW50LnBvaW50ZXJJZCA9IG51bGw7XG4gICAgdGFwR3VhcmRSZWYuY3VycmVudC5tb3ZlZCA9IGZhbHNlO1xuICAgIHRhcEd1YXJkUmVmLmN1cnJlbnQubGlua0lkID0gXCJcIjtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IGhhbmRsZVBvaW50ZXJEb3duID0gdXNlQ2FsbGJhY2soXG4gICAgKGV2ZW50OiBSZWFjdC5Qb2ludGVyRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB7XG4gICAgICBpZiAoZXZlbnQucG9pbnRlclR5cGUgPT09IFwibW91c2VcIiAmJiBldmVudC5idXR0b24gIT09IDApIHJldHVybjtcbiAgICAgIGNvbnN0IGNhcmQgPSByZXNvbHZlQ2xpY2thYmxlQ2FyZChldmVudC50YXJnZXQpO1xuICAgICAgaWYgKCFjYXJkKSByZXR1cm47XG4gICAgICBjb25zdCBsaW5rSWQgPSBjYXJkLmRhdGFzZXQubGlua0lkIHx8IFwiXCI7XG4gICAgICBpZiAoIWxpbmtJZCkgcmV0dXJuO1xuXG4gICAgICB0YXBHdWFyZFJlZi5jdXJyZW50LmFjdGl2ZSA9IHRydWU7XG4gICAgICB0YXBHdWFyZFJlZi5jdXJyZW50LnBvaW50ZXJJZCA9IGV2ZW50LnBvaW50ZXJJZDtcbiAgICAgIHRhcEd1YXJkUmVmLmN1cnJlbnQuc3RhcnRYID0gZXZlbnQuY2xpZW50WDtcbiAgICAgIHRhcEd1YXJkUmVmLmN1cnJlbnQuc3RhcnRZID0gZXZlbnQuY2xpZW50WTtcbiAgICAgIHRhcEd1YXJkUmVmLmN1cnJlbnQuc3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICAgIHRhcEd1YXJkUmVmLmN1cnJlbnQubW92ZWQgPSBmYWxzZTtcbiAgICAgIHRhcEd1YXJkUmVmLmN1cnJlbnQubGlua0lkID0gbGlua0lkO1xuICAgIH0sXG4gICAgW3Jlc29sdmVDbGlja2FibGVDYXJkXVxuICApO1xuXG4gIGNvbnN0IGhhbmRsZVBvaW50ZXJNb3ZlID0gdXNlQ2FsbGJhY2soKGV2ZW50OiBSZWFjdC5Qb2ludGVyRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB7XG4gICAgY29uc3Qgc3RhdGUgPSB0YXBHdWFyZFJlZi5jdXJyZW50O1xuICAgIGlmICghc3RhdGUuYWN0aXZlIHx8IGV2ZW50LnBvaW50ZXJJZCAhPT0gc3RhdGUucG9pbnRlcklkKSByZXR1cm47XG4gICAgY29uc3QgZHggPSBNYXRoLmFicyhldmVudC5jbGllbnRYIC0gc3RhdGUuc3RhcnRYKTtcbiAgICBjb25zdCBkeSA9IE1hdGguYWJzKGV2ZW50LmNsaWVudFkgLSBzdGF0ZS5zdGFydFkpO1xuICAgIGlmIChkeCA+IFRBUF9NT1ZFX1BYIHx8IGR5ID4gVEFQX01PVkVfUFgpIHtcbiAgICAgIHN0YXRlLm1vdmVkID0gdHJ1ZTtcbiAgICB9XG4gIH0sIFtdKTtcblxuICBjb25zdCBoYW5kbGVQb2ludGVyVXAgPSB1c2VDYWxsYmFjayhcbiAgICAoZXZlbnQ6IFJlYWN0LlBvaW50ZXJFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHtcbiAgICAgIGNvbnN0IHN0YXRlID0gdGFwR3VhcmRSZWYuY3VycmVudDtcbiAgICAgIGlmICghc3RhdGUuYWN0aXZlIHx8IGV2ZW50LnBvaW50ZXJJZCAhPT0gc3RhdGUucG9pbnRlcklkKSByZXR1cm47XG4gICAgICBjb25zdCBsaW5rSWQgPSBzdGF0ZS5saW5rSWQ7XG4gICAgICBjb25zdCBoZWxkTXMgPSBEYXRlLm5vdygpIC0gc3RhdGUuc3RhcnRUaW1lO1xuICAgICAgY29uc3Qgc2hvdWxkVGFwID0gIXN0YXRlLm1vdmVkICYmIGhlbGRNcyA8IEhPTERfVE9fUFJFVklFV19NUztcbiAgICAgIHJlc2V0VGFwR3VhcmQoKTtcbiAgICAgIGlmIChzaG91bGRUYXAgJiYgbGlua0lkKSB7XG4gICAgICAgIG9uTmF2aWdhdGUobGlua0lkKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIFtvbk5hdmlnYXRlLCByZXNldFRhcEd1YXJkXVxuICApO1xuXG4gIGNvbnN0IGJsb2NrQ2xpcGJvYXJkQWN0aW9uID0gdXNlQ2FsbGJhY2soXG4gICAgKGV2ZW50OiBSZWFjdC5DbGlwYm9hcmRFdmVudDxIVE1MRGl2RWxlbWVudD4gfCBSZWFjdC5Nb3VzZUV2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4ge1xuICAgICAgaWYgKCFyZXNvbHZlQ2xpY2thYmxlQ2FyZChldmVudC50YXJnZXQpKSByZXR1cm47XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0sXG4gICAgW3Jlc29sdmVDbGlja2FibGVDYXJkXVxuICApO1xuXG4gIHVzZVRpbWVsaW5lQ2FyZEVmZmVjdHMoeyBjb250YWluZXJSZWYsIGVycm9yTWVzc2FnZSwgaXRlbXMsIHJlc29sdmVDbGlja2FibGVDYXJkIH0pO1xuXHJcbiAgY29uc3QgaGFzSXRlbXMgPSBpdGVtcy5sZW5ndGggPiAwO1xyXG4gIGNvbnN0IHNob3dFbXB0eSA9ICFlcnJvck1lc3NhZ2UgJiYgIWhhc0l0ZW1zO1xyXG5cclxuICBjb25zdCBjb250ZW50ID0gZXJyb3JNZXNzYWdlID8gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWRhbmdlclwiPntlcnJvck1lc3NhZ2V9PC9kaXY+XHJcbiAgKSA6IGhhc0l0ZW1zID8gKFxyXG4gICAgaXRlbXMubWFwKChpdGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICBjb25zdCBrZXkgPSBpdGVtLmlkIHx8IGl0ZW0ucmVjSWQ/LnRvU3RyaW5nKCkgfHwgYHRpbWVsaW5lLSR7aW5kZXh9YDtcclxuICAgICAgY29uc3QgaXNDbGlja2FibGUgPSAhaXRlbS5pc05vRGF0YSAmJiAhIWl0ZW0uaWQ7XHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdiBrZXk9e2tleX0gY2xhc3NOYW1lPVwidGltZWxpbmUtaXRlbVwiPlxyXG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAgICAgICBcInRpbWVsaW5lLWNhcmRcIixcbiAgICAgICAgICAgICAgaXRlbS5pc05vRGF0YSA/IFwidGltZWxpbmUtY2FyZC0tbm9kYXRhXCIgOiBcIlwiLFxuICAgICAgICAgICAgICBpc0NsaWNrYWJsZSA/IFwidGltZWxpbmUtY2FyZC0tY2xpY2thYmxlXCIgOiBcIlwiXG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgZGF0YS1hY3RpdmlkYWRpZD17aXRlbS5hY3RpdmlkYWRJZCB8fCBcIlwifVxuICAgICAgICAgICAgZGF0YS1yZWNpZD17aXRlbS5yZWNJZCAhPSBudWxsID8gU3RyaW5nKGl0ZW0ucmVjSWQpIDogXCJcIn1cbiAgICAgICAgICAgIGRhdGEtbGluay1pZD17aXNDbGlja2FibGUgPyBpdGVtLmlkIDogXCJcIn1cbiAgICAgICAgICAgIHJvbGU9e2lzQ2xpY2thYmxlID8gXCJidXR0b25cIiA6IHVuZGVmaW5lZH1cbiAgICAgICAgICAgIHRhYkluZGV4PXtpc0NsaWNrYWJsZSA/IDAgOiB1bmRlZmluZWR9XG4gICAgICAgICAgICBhcmlhLWxhYmVsPXtpc0NsaWNrYWJsZSA/IChpdGVtLmZ1bGxOYW1lIHx8IGl0ZW0ubmFtZSB8fCBub0RhdGFUZXh0KSA6IHVuZGVmaW5lZH1cbiAgICAgICAgICAgIG9uS2V5RG93bj17aXNDbGlja2FibGVcbiAgICAgICAgICAgICAgPyAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQua2V5ID09PSBcIkVudGVyXCIgfHwgZXZlbnQua2V5ID09PSBcIiBcIikge1xuICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgIG9uTmF2aWdhdGUoaXRlbS5pZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIDogdW5kZWZpbmVkfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGltZWxpbmUtZGF0ZS1wYW5lbCBmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMSBweC0zIHB5LTMgYmctc2xhdGUtNTAgYm9yZGVyLXIgYm9yZGVyLXNsYXRlLTIwMCB0ZXh0LXNsYXRlLTYwMFwiPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LXNlbWlib2xkIHRyYWNraW5nLVswLjJlbV0gdGV4dC1zbGF0ZS01MDBcIj57aXRlbS5kYXRlUGFydHMueWVhcn08L2Rpdj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1zZW1pYm9sZCB1cHBlcmNhc2UgdHJhY2tpbmctWzAuMmVtXSB0ZXh0LXNsYXRlLTUwMFwiPntpdGVtLmRhdGVQYXJ0cy5tb250aH08L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LTJ4bCBmb250LXNlbWlib2xkIHRleHQtcHJpbWFyeVwiPntpdGVtLmRhdGVQYXJ0cy5kYXl9PC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpbWVsaW5lLWNhcmRfX2NvbnRlbnQgZmxleC0xIHB5LTMgcHgtNFwiPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGltZWxpbmUtbmFtZVwiIGRhdGEtZnVsbHRleHQ9e2l0ZW0uZnVsbE5hbWUgfHwgaXRlbS5uYW1lfT57aXRlbS5uYW1lfTwvZGl2PlxyXG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRpbWVsaW5lLWRlc2MtdGV4dFwiIGRhdGEtZnVsbHRleHQ9e2l0ZW0uZnVsbERlc2MgfHwgaXRlbS5kZXNjcmlwdGlvbn0+e2l0ZW0uZGVzY3JpcHRpb24gfHwgbm9EYXRhVGV4dH08L3A+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICk7XHJcbiAgICB9KVxyXG4gICkgOiBudWxsO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdlxuICAgICAgaWQ9XCJ0aW1lbGluZUNvbnRhaW5lclwiXG4gICAgICByZWY9e2NvbnRhaW5lclJlZn1cbiAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcInRpbWVsaW5lLWJveFwiLCBzaG93RW1wdHkgPyBcInRpbWVsaW5lLWVtcHR5XCIgOiBcIlwiKX1cbiAgICAgIGRhdGEtZW1wdHktdGV4dD17bm9EYXRhVGV4dH1cbiAgICAgIG9uUG9pbnRlckRvd25DYXB0dXJlPXtoYW5kbGVQb2ludGVyRG93bn1cbiAgICAgIG9uUG9pbnRlck1vdmVDYXB0dXJlPXtoYW5kbGVQb2ludGVyTW92ZX1cbiAgICAgIG9uUG9pbnRlclVwQ2FwdHVyZT17aGFuZGxlUG9pbnRlclVwfVxuICAgICAgb25Qb2ludGVyQ2FuY2VsQ2FwdHVyZT17cmVzZXRUYXBHdWFyZH1cbiAgICAgIG9uUG9pbnRlckxlYXZlPXtyZXNldFRhcEd1YXJkfVxuICAgICAgb25Db250ZXh0TWVudUNhcHR1cmU9e2Jsb2NrQ2xpcGJvYXJkQWN0aW9ufVxuICAgICAgb25Db3B5Q2FwdHVyZT17YmxvY2tDbGlwYm9hcmRBY3Rpb259XG4gICAgICBvbkN1dENhcHR1cmU9e2Jsb2NrQ2xpcGJvYXJkQWN0aW9ufVxuICAgICAgb25QYXN0ZUNhcHR1cmU9e2Jsb2NrQ2xpcGJvYXJkQWN0aW9ufVxuICAgID5cbiAgICAgIHtjb250ZW50fVxuICAgIDwvZGl2PlxuICApO1xufTtcblxuY29uc3QgTWVtb2l6ZWRIaXN0b3J5VGFibGUgPSBSZWFjdC5tZW1vKEhpc3RvcnlUYWJsZSk7XG5NZW1vaXplZEhpc3RvcnlUYWJsZS5kaXNwbGF5TmFtZSA9IFwiSGlzdG9yeVRhYmxlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IE1lbW9pemVkSGlzdG9yeVRhYmxlO1xuIiwgIlx1RkVGRmltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB0eXBlIHsgSGlzdG9yeUNhY2hlZEZpbHRlciB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VIaXN0b3J5RmlsdGVyQ2FjaGUudHNcIjtcbmltcG9ydCB7IHNldFRvcGJhckFjdGlvbkdyb3VwUmVhZHkgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvdG9wYmFyQWN0aW9uVmlzaWJpbGl0eS50c1wiO1xuaW1wb3J0IHR5cGUgeyBGaWx0ZXJMb2FkUmVxdWVzdCwgTG9hZE92ZXJyaWRlIH0gZnJvbSBcIi4vdXNlSGlzdG9yeUZpbHRlcnNTdGF0ZS50c1wiO1xuXG50eXBlIFVzZUhpc3RvcnlQYWdlTGlzdGVuZXJzQXJncyA9IHtcbiAgaXNPcGVuOiBib29sZWFuO1xuICBhY3RpdmF0b3JSZWY6IFJlYWN0LlJlZk9iamVjdDxIVE1MRGl2RWxlbWVudCB8IG51bGw+O1xuICBwb3BvdmVyUmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTERpdkVsZW1lbnQgfCBudWxsPjtcbiAgaGFzUmVzdG9yZWRGaWx0ZXJSZWY6IFJlYWN0Lk11dGFibGVSZWZPYmplY3Q8Ym9vbGVhbj47XG4gIHJldHJ5T25OZXR3b3JrRXJyb3JSZWY6IFJlYWN0Lk11dGFibGVSZWZPYmplY3Q8Ym9vbGVhbj47XG4gIGN1cnJlbnRQYWdlOiBudW1iZXI7XG4gIGxvZ0hpc3Rvcnk6IChtZXNzYWdlOiBzdHJpbmcsIGRhdGE/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPikgPT4gdm9pZDtcbiAgY29uc3VtZVJldHVybkZsYWc6ICgpID0+IGJvb2xlYW47XG4gIHJlYWRDYWNoZWRGaWx0ZXI6ICgpID0+IEhpc3RvcnlDYWNoZWRGaWx0ZXIgfCBudWxsO1xuICBhcHBseUNhY2hlZEZpbHRlcjogKGZpbHRlcjogSGlzdG9yeUNhY2hlZEZpbHRlciB8IG51bGwpID0+IEZpbHRlckxvYWRSZXF1ZXN0IHwgbnVsbDtcbiAgbG9hZEFjdGl2aXRpZXM6IChwYWdlOiBudW1iZXIsIG92ZXJyaWRlPzogTG9hZE92ZXJyaWRlKSA9PiB2b2lkO1xuICBzZXRJc09wZW46IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPGJvb2xlYW4+PjtcbiAgc2V0SG92ZXJEYXRlOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxEYXRlIHwgbnVsbD4+O1xuICBzZXRTaG93RmlsdGVyczogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248Ym9vbGVhbj4+O1xuICBhcHBseUZpbHRlcnM6IChvcHRpb25zPzogeyBjbG9zZVBhbmVsPzogYm9vbGVhbjsgZm9yY2U/OiBib29sZWFuOyBwYWdlPzogbnVtYmVyIH0pID0+IHZvaWQ7XG59O1xuXG4vLyBIYW5kbGVzIGdsb2JhbCBsaXN0ZW5lcnMgdXNlZCBieSB0aGUgaGlzdG9yeSBwYWdlIGZpbHRlcnMgYW5kIGNhbGVuZGFyIFVJLlxuZXhwb3J0IGNvbnN0IHVzZUhpc3RvcnlQYWdlTGlzdGVuZXJzID0gKHtcbiAgaXNPcGVuLFxuICBhY3RpdmF0b3JSZWYsXG4gIHBvcG92ZXJSZWYsXG4gIGhhc1Jlc3RvcmVkRmlsdGVyUmVmLFxuICByZXRyeU9uTmV0d29ya0Vycm9yUmVmLFxuICBjdXJyZW50UGFnZSxcbiAgbG9nSGlzdG9yeSxcbiAgY29uc3VtZVJldHVybkZsYWcsXG4gIHJlYWRDYWNoZWRGaWx0ZXIsXG4gIGFwcGx5Q2FjaGVkRmlsdGVyLFxuICBsb2FkQWN0aXZpdGllcyxcbiAgc2V0SXNPcGVuLFxuICBzZXRIb3ZlckRhdGUsXG4gIHNldFNob3dGaWx0ZXJzLFxuICBhcHBseUZpbHRlcnMsXG59OiBVc2VIaXN0b3J5UGFnZUxpc3RlbmVyc0FyZ3MpID0+IHtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBzZXRUb3BiYXJBY3Rpb25Hcm91cFJlYWR5KFwiaGlzdG9yeS1saXN0LWFjdGlvbnNcIik7XG4gIH0sIFtdKTtcblxuICAvLyBDbG9zZSB0aGUgbWFudWFsIHBpY2tlciB3aGVuIGNsaWNraW5nIG91dHNpZGUgb2YgdGhlIHJhbmdlIHBpY2tlciBVSS5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWlzT3BlbikgcmV0dXJuO1xuXG4gICAgY29uc3QgaGFuZGxlT3V0c2lkZSA9IChldmVudDogTW91c2VFdmVudCkgPT4ge1xuICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0IGFzIE5vZGUgfCBudWxsO1xuICAgICAgaWYgKCF0YXJnZXQpIHJldHVybjtcbiAgICAgIGlmIChwb3BvdmVyUmVmLmN1cnJlbnQ/LmNvbnRhaW5zKHRhcmdldCkpIHJldHVybjtcbiAgICAgIGlmIChhY3RpdmF0b3JSZWYuY3VycmVudD8uY29udGFpbnModGFyZ2V0KSkgcmV0dXJuO1xuICAgICAgbG9nSGlzdG9yeShcImNsb3NlUG9wb3ZlcjpvdXRzaWRlXCIpO1xuICAgICAgc2V0SXNPcGVuKGZhbHNlKTtcbiAgICAgIHNldEhvdmVyRGF0ZShudWxsKTtcbiAgICB9O1xuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBoYW5kbGVPdXRzaWRlKTtcbiAgICByZXR1cm4gKCkgPT4gZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBoYW5kbGVPdXRzaWRlKTtcbiAgfSwgW2FjdGl2YXRvclJlZiwgaXNPcGVuLCBsb2dIaXN0b3J5LCBwb3BvdmVyUmVmLCBzZXRIb3ZlckRhdGUsIHNldElzT3Blbl0pO1xuXG4gIC8vIFJlLWFwcGx5IGZpbHRlcnMgYWZ0ZXIgYnJvd3NlciBiYWNrL2ZvcndhcmQgbmF2aWdhdGlvbiByZXR1cm5zIHRvIHRoZSBwYWdlLlxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IG9uUGFnZVNob3cgPSAoKSA9PiB7XG4gICAgICBpZiAoaGFzUmVzdG9yZWRGaWx0ZXJSZWYuY3VycmVudCkgcmV0dXJuO1xuICAgICAgaWYgKGNvbnN1bWVSZXR1cm5GbGFnKCkpIHtcbiAgICAgICAgY29uc3QgY2FjaGVkID0gcmVhZENhY2hlZEZpbHRlcigpO1xuICAgICAgICBjb25zdCBjYWNoZWRSZXF1ZXN0ID0gYXBwbHlDYWNoZWRGaWx0ZXIoY2FjaGVkKTtcbiAgICAgICAgaWYgKGNhY2hlZFJlcXVlc3QpIHtcbiAgICAgICAgICByZXRyeU9uTmV0d29ya0Vycm9yUmVmLmN1cnJlbnQgPSB0cnVlO1xuICAgICAgICAgIGxvYWRBY3Rpdml0aWVzKGNhY2hlZFJlcXVlc3QucGFnZSwgY2FjaGVkUmVxdWVzdC5vdmVycmlkZSk7XG4gICAgICAgICAgc2V0U2hvd0ZpbHRlcnMoZmFsc2UpO1xuICAgICAgICAgIHNldElzT3BlbihmYWxzZSk7XG4gICAgICAgICAgaGFzUmVzdG9yZWRGaWx0ZXJSZWYuY3VycmVudCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwYWdlc2hvd1wiLCBvblBhZ2VTaG93KTtcbiAgICByZXR1cm4gKCkgPT4gd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwYWdlc2hvd1wiLCBvblBhZ2VTaG93KTtcbiAgfSwgW1xuICAgIGFwcGx5Q2FjaGVkRmlsdGVyLFxuICAgIGNvbnN1bWVSZXR1cm5GbGFnLFxuICAgIGhhc1Jlc3RvcmVkRmlsdGVyUmVmLFxuICAgIGxvYWRBY3Rpdml0aWVzLFxuICAgIHJlYWRDYWNoZWRGaWx0ZXIsXG4gICAgcmV0cnlPbk5ldHdvcmtFcnJvclJlZixcbiAgICBzZXRJc09wZW4sXG4gICAgc2V0U2hvd0ZpbHRlcnMsXG4gIF0pO1xuXG4gIC8vIFdpcmUgdG9wYmFyIGFjdGlvbnMgdGhhdCB0b2dnbGUgZmlsdGVycyBvciBmb3JjZSByZWZyZXNoIG9mIGN1cnJlbnQgcGFnZS5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBvblRvZ2dsZUZpbHRlcnMgPSAoKSA9PiB7XG4gICAgICBzZXRTaG93RmlsdGVycygocHJldikgPT4ge1xuICAgICAgICBjb25zdCBuZXh0ID0gIXByZXY7XG4gICAgICAgIGlmICghbmV4dCkge1xuICAgICAgICAgIHNldElzT3BlbihmYWxzZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd2luZG93LnNjcm9sbFRvKHsgdG9wOiAwLCBiZWhhdmlvcjogXCJzbW9vdGhcIiB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBjb25zdCBvblJlZnJlc2ggPSAoKSA9PiB7XG4gICAgICBhcHBseUZpbHRlcnMoeyBwYWdlOiBjdXJyZW50UGFnZSwgZm9yY2U6IHRydWUsIGNsb3NlUGFuZWw6IHRydWUgfSk7XG4gICAgfTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiaGlzdG9yeS10b2dnbGUtZmlsdGVyXCIsIG9uVG9nZ2xlRmlsdGVycyk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJoaXN0b3J5LXJlZnJlc2hcIiwgb25SZWZyZXNoKTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImhpc3RvcnktdG9nZ2xlLWZpbHRlclwiLCBvblRvZ2dsZUZpbHRlcnMpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJoaXN0b3J5LXJlZnJlc2hcIiwgb25SZWZyZXNoKTtcbiAgICB9O1xuICB9LCBbYXBwbHlGaWx0ZXJzLCBjdXJyZW50UGFnZSwgc2V0SXNPcGVuLCBzZXRTaG93RmlsdGVyc10pO1xufTtcclxuIiwgIlx1RkVGRmltcG9ydCBSZWFjdCwgeyB1c2VNZW1vLCB1c2VSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB0eXBlIHsgVGltZWxpbmVJdGVtIH0gZnJvbSBcIi4vSGlzdG9yeVRhYmxlLnRzeFwiO1xuXG50eXBlIEFjdGl2aXR5UmVjb3JkID0gUmVjb3JkPHN0cmluZywgdW5rbm93bj47XG5cbnR5cGUgVXNlSGlzdG9yeVRpbWVsaW5lSXRlbXNBcmdzID0ge1xuICBpdGVtczogQWN0aXZpdHlSZWNvcmRbXTtcbiAgbG9jYWxlOiBzdHJpbmc7XG4gIG5vRGF0YVRleHQ6IHN0cmluZztcbiAgbG9nSGlzdG9yeTogKG1lc3NhZ2U6IHN0cmluZywgZGF0YT86IFJlY29yZDxzdHJpbmcsIHVua25vd24+KSA9PiB2b2lkO1xuICB0b1RpdGxlQ2FzZTogKHZhbHVlOiBzdHJpbmcsIGxvY2FsZTogc3RyaW5nKSA9PiBzdHJpbmc7XG4gIGZvcm1hdERhdGVQYXJ0czogKHZhbHVlOiBzdHJpbmcsIGxvY2FsZTogc3RyaW5nKSA9PiB7IHllYXI6IHN0cmluZzsgbW9udGg6IHN0cmluZzsgZGF5OiBzdHJpbmcgfTtcbn07XG5cbi8vIE1hcHMgcmF3IGhpc3RvcnkgcGF5bG9hZCBpdGVtcyBpbnRvIHRpbWVsaW5lIGNhcmRzIHVzZWQgYnkgSGlzdG9yeVRhYmxlLlxuZXhwb3J0IGNvbnN0IHVzZUhpc3RvcnlUaW1lbGluZUl0ZW1zID0gKHtcbiAgaXRlbXMsXG4gIGxvY2FsZSxcbiAgbm9EYXRhVGV4dCxcbiAgbG9nSGlzdG9yeSxcbiAgdG9UaXRsZUNhc2UsXG4gIGZvcm1hdERhdGVQYXJ0cyxcbn06IFVzZUhpc3RvcnlUaW1lbGluZUl0ZW1zQXJncykgPT4ge1xuICBjb25zdCBkZWJ1Z0xvZ2dlZFJlZiA9IHVzZVJlZigwKTtcblxuICBjb25zdCB0aW1lbGluZUl0ZW1zOiBUaW1lbGluZUl0ZW1bXSA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIHJldHVybiBpdGVtcy5tYXAoKGVudHJ5KSA9PiB7XG4gICAgICBjb25zdCBhY3RpdmlkYWRJZFJhdyA9IChlbnRyeS5hY3RpdmlkYWRJZCA/PyBlbnRyeS5BY3RpdmlkYWRJZCA/PyBcIlwiKS50b1N0cmluZygpLnRyaW0oKTtcbiAgICAgIGNvbnN0IGFjdGl2aWRhZElkID0gYWN0aXZpZGFkSWRSYXcgfHwgXCJcIjtcbiAgICAgIGNvbnN0IHJlY0lkUmF3ID0gZW50cnkucmVjSWQgPz8gZW50cnkuUmVjSWQgPz8gXCJcIjtcbiAgICAgIGNvbnN0IHJlY0lkID0gcmVjSWRSYXcgJiYgIU51bWJlci5pc05hTihOdW1iZXIocmVjSWRSYXcpKSA/IE51bWJlcihyZWNJZFJhdykgOiBudWxsO1xuICAgICAgbGV0IGxpbmtJZCA9IGFjdGl2aWRhZElkIHx8IChyZWNJZCA/IHJlY0lkLnRvU3RyaW5nKCkgOiBcIlwiKTtcblxuICAgICAgaWYgKGRlYnVnTG9nZ2VkUmVmLmN1cnJlbnQgPCA1KSB7XG4gICAgICAgIGxvZ0hpc3RvcnkoXCJhY3Rpdml0eSBpdGVtXCIsIHsgYWN0aXZpZGFkSWQsIHJlY0lkUmF3LCByZWNJZCB9KTtcbiAgICAgICAgZGVidWdMb2dnZWRSZWYuY3VycmVudCArPSAxO1xuICAgICAgfVxuXG4gICAgICBjb25zdCByYXdOYW1lID0gKGVudHJ5Lm5hbWUgPz8gZW50cnkuTmFtZSA/PyBcIlwiKS50b1N0cmluZygpLnRyaW0oKTtcbiAgICAgIGNvbnN0IGZ1bGxOYW1lID0gdG9UaXRsZUNhc2UocmF3TmFtZSwgbG9jYWxlKTtcbiAgICAgIGNvbnN0IGZlY2hhID0gKGVudHJ5LnRyYW5zRGF0ZSA/PyBlbnRyeS5UcmFuc0RhdGUgPz8gXCJcIikudG9TdHJpbmcoKTtcbiAgICAgIGNvbnN0IHJhd0Rlc2MgPSAoZW50cnkuZGVzY3JpcHRpb24gPz8gZW50cnkuRGVzY3JpcHRpb24gPz8gXCJcIikudG9TdHJpbmcoKS50cmltKCk7XG4gICAgICBjb25zdCBmdWxsRGVzYyA9IHJhd0Rlc2M7XG5cbiAgICAgIGNvbnN0IGlzTm9EYXRhQ2FyZCA9ICFyYXdOYW1lICYmICFyYXdEZXNjO1xuICAgICAgaWYgKGlzTm9EYXRhQ2FyZCkge1xuICAgICAgICBsaW5rSWQgPSBcIlwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBpZDogbGlua0lkLFxuICAgICAgICBhY3RpdmlkYWRJZCxcbiAgICAgICAgcmVjSWQsXG4gICAgICAgIG5hbWU6IGZ1bGxOYW1lLFxuICAgICAgICBkZXNjcmlwdGlvbjogZnVsbERlc2MgfHwgbm9EYXRhVGV4dCxcbiAgICAgICAgZnVsbE5hbWUsXG4gICAgICAgIGZ1bGxEZXNjLFxuICAgICAgICBkYXRlUGFydHM6IGZvcm1hdERhdGVQYXJ0cyhmZWNoYSwgbG9jYWxlKSxcbiAgICAgICAgaXNOb0RhdGE6IGlzTm9EYXRhQ2FyZCxcbiAgICAgIH07XG4gICAgfSk7XG4gIH0sIFtmb3JtYXREYXRlUGFydHMsIGl0ZW1zLCBsb2NhbGUsIGxvZ0hpc3RvcnksIG5vRGF0YVRleHQsIHRvVGl0bGVDYXNlXSk7XG5cbiAgcmV0dXJuIHsgdGltZWxpbmVJdGVtcyB9O1xufTtcclxuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IEFwaUZldGNoRXJyb3IsIGZldGNoSnNvbiB9IGZyb20gXCIuLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uL3V0aWxzL2luZEkxOG4udHNcIjtcblxuZXhwb3J0IHR5cGUgSGlzdG9yeUFjdGl2aXR5SXRlbSA9IHtcbiAgYWN0aXZpZGFkSWQ/OiBzdHJpbmcgfCBudW1iZXI7XG4gIEFjdGl2aWRhZElkPzogc3RyaW5nIHwgbnVtYmVyO1xuICByZWNJZD86IHN0cmluZyB8IG51bWJlcjtcbiAgUmVjSWQ/OiBzdHJpbmcgfCBudW1iZXI7XG4gIG5hbWU/OiBzdHJpbmc7XG4gIE5hbWU/OiBzdHJpbmc7XG4gIHRyYW5zRGF0ZT86IHN0cmluZztcbiAgVHJhbnNEYXRlPzogc3RyaW5nO1xuICBkZXNjcmlwdGlvbj86IHN0cmluZztcbiAgRGVzY3JpcHRpb24/OiBzdHJpbmc7XG59O1xuXG50eXBlIEhpc3RvcnlSZXNwb25zZSA9IHtcbiAgaXRlbXM/OiBIaXN0b3J5QWN0aXZpdHlJdGVtW107XG4gIHRvdGFsPzogbnVtYmVyO1xufTtcblxudHlwZSBMb2FkT3ZlcnJpZGUgPSB7XG4gIGZyb21EYXRlOiBzdHJpbmc7XG4gIHRvRGF0ZTogc3RyaW5nO1xuICBhY2NvdW50TnVtPzogc3RyaW5nO1xufTtcblxudHlwZSBVc2VIaXN0b3J5QWN0aXZpdGllc0FyZ3MgPSB7XG4gIGZyb21EYXRlVmFsdWU6IHN0cmluZztcbiAgdG9EYXRlVmFsdWU6IHN0cmluZztcbiAgYWNjb3VudE51bVZhbHVlOiBzdHJpbmc7XG4gIHBhZ2VTaXplOiBudW1iZXI7XG4gIHJldHJ5RGVsYXlNcz86IG51bWJlcjtcbiAgbm9ybWFsaXplUmFuZ2U6IChmcm9tOiBzdHJpbmcsIHRvOiBzdHJpbmcpID0+IHsgZnJvbTogc3RyaW5nOyB0bzogc3RyaW5nIH07XG4gIG9uRm9yYmlkZGVuOiAoKSA9PiB2b2lkO1xuICBvbkRlYnVnPzogKG1lc3NhZ2U6IHN0cmluZywgZGF0YT86IFJlY29yZDxzdHJpbmcsIHVua25vd24+KSA9PiB2b2lkO1xufTtcblxuLy8gQ2VudHJhbGl6ZXMgaGlzdG9yeSBmZXRjaC9yZXRyeSBsb2dpYyB0byBrZWVwIHBhZ2UgY29tcG9uZW50cyBzbWFsbGVyLlxuZXhwb3J0IGNvbnN0IHVzZUhpc3RvcnlBY3Rpdml0aWVzID0gKHtcbiAgZnJvbURhdGVWYWx1ZSxcbiAgdG9EYXRlVmFsdWUsXG4gIGFjY291bnROdW1WYWx1ZSxcbiAgcGFnZVNpemUsXG4gIHJldHJ5RGVsYXlNcyA9IDYwMCxcbiAgbm9ybWFsaXplUmFuZ2UsXG4gIG9uRm9yYmlkZGVuLFxuICBvbkRlYnVnLFxufTogVXNlSGlzdG9yeUFjdGl2aXRpZXNBcmdzKSA9PiB7XG4gIGNvbnN0IFtpdGVtcywgc2V0SXRlbXNdID0gdXNlU3RhdGU8SGlzdG9yeUFjdGl2aXR5SXRlbVtdPihbXSk7XG4gIGNvbnN0IFt0b3RhbCwgc2V0VG90YWxdID0gdXNlU3RhdGUoMCk7XG4gIGNvbnN0IFtjdXJyZW50UGFnZSwgc2V0Q3VycmVudFBhZ2VdID0gdXNlU3RhdGUoMSk7XG4gIGNvbnN0IFtpc0xvYWRpbmcsIHNldElzTG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtlcnJvck1lc3NhZ2UsIHNldEVycm9yTWVzc2FnZV0gPSB1c2VTdGF0ZShcIlwiKTtcblxuICBjb25zdCByZXRyeU9uTmV0d29ya0Vycm9yUmVmID0gdXNlUmVmKGZhbHNlKTtcbiAgY29uc3QgYWN0aXZlQWJvcnRSZWYgPSB1c2VSZWY8QWJvcnRDb250cm9sbGVyIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IGFjdGl2ZVJlcXVlc3RJZFJlZiA9IHVzZVJlZigwKTtcbiAgY29uc3QgcmV0cnlUaW1lclJlZiA9IHVzZVJlZjxudW1iZXIgfCBudWxsPihudWxsKTtcbiAgY29uc3QgbGFzdFNpZ25hdHVyZVJlZiA9IHVzZVJlZihcIlwiKTtcblxuICBjb25zdCBjbGVhclJldHJ5VGltZXIgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKHJldHJ5VGltZXJSZWYuY3VycmVudCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHJldHJ5VGltZXJSZWYuY3VycmVudCk7XG4gICAgICByZXRyeVRpbWVyUmVmLmN1cnJlbnQgPSBudWxsO1xuICAgIH1cbiAgfSwgW10pO1xuXG4gIGNvbnN0IGFib3J0QWN0aXZlUmVxdWVzdCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoIWFjdGl2ZUFib3J0UmVmLmN1cnJlbnQpIHJldHVybjtcbiAgICB0cnkge1xuICAgICAgYWN0aXZlQWJvcnRSZWYuY3VycmVudC5hYm9ydCgpO1xuICAgIH0gY2F0Y2gge1xuICAgICAgLy8gSWdub3JlIGFib3J0IGVycm9ycy5cbiAgICB9XG4gICAgYWN0aXZlQWJvcnRSZWYuY3VycmVudCA9IG51bGw7XG4gIH0sIFtdKTtcblxuICBjb25zdCByZXNldEFjdGl2aXRpZXMgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgY2xlYXJSZXRyeVRpbWVyKCk7XG4gICAgYWJvcnRBY3RpdmVSZXF1ZXN0KCk7XG4gICAgc2V0SXRlbXMoW10pO1xuICAgIHNldFRvdGFsKDApO1xuICAgIHNldEVycm9yTWVzc2FnZShcIlwiKTtcbiAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xuICB9LCBbYWJvcnRBY3RpdmVSZXF1ZXN0LCBjbGVhclJldHJ5VGltZXJdKTtcblxuICBjb25zdCBsb2FkQWN0aXZpdGllcyA9IHVzZUNhbGxiYWNrKFxuICAgIGFzeW5jIChwYWdlOiBudW1iZXIsIG92ZXJyaWRlPzogTG9hZE92ZXJyaWRlKSA9PiB7XG4gICAgICBjb25zdCBmcm9tRGF0ZVN0ciA9IG92ZXJyaWRlPy5mcm9tRGF0ZSA/PyBmcm9tRGF0ZVZhbHVlO1xuICAgICAgY29uc3QgdG9EYXRlU3RyID0gb3ZlcnJpZGU/LnRvRGF0ZSA/PyB0b0RhdGVWYWx1ZTtcbiAgICAgIGNvbnN0IGFjY291bnROdW1TdHIgPSBvdmVycmlkZT8uYWNjb3VudE51bSA/PyBhY2NvdW50TnVtVmFsdWU7XG5cbiAgICAgIGlmICghZnJvbURhdGVTdHIgfHwgIXRvRGF0ZVN0cikge1xuICAgICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xuICAgICAgICBzZXRJdGVtcyhbXSk7XG4gICAgICAgIHNldFRvdGFsKDApO1xuICAgICAgICBzZXRFcnJvck1lc3NhZ2UoXCJcIik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgc2V0Q3VycmVudFBhZ2UocGFnZSk7XG4gICAgICBjbGVhclJldHJ5VGltZXIoKTtcblxuICAgICAgY29uc3QgcmVxdWVzdElkID0gKythY3RpdmVSZXF1ZXN0SWRSZWYuY3VycmVudDtcbiAgICAgIGFib3J0QWN0aXZlUmVxdWVzdCgpO1xuXG4gICAgICBjb25zdCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuICAgICAgYWN0aXZlQWJvcnRSZWYuY3VycmVudCA9IGNvbnRyb2xsZXI7XG5cbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSBub3JtYWxpemVSYW5nZShmcm9tRGF0ZVN0ciwgdG9EYXRlU3RyKTtcbiAgICAgIGNvbnN0IGZpbHRlclNpZ25hdHVyZSA9IGAke25vcm1hbGl6ZWQuZnJvbX18JHtub3JtYWxpemVkLnRvfXwke2FjY291bnROdW1TdHJ9fCR7cGFnZX1gO1xuICAgICAgbGFzdFNpZ25hdHVyZVJlZi5jdXJyZW50ID0gZmlsdGVyU2lnbmF0dXJlO1xuXG4gICAgICBzZXRJc0xvYWRpbmcodHJ1ZSk7XG4gICAgICBzZXRJdGVtcyhbXSk7XG4gICAgICBzZXRUb3RhbCgwKTtcbiAgICAgIHNldEVycm9yTWVzc2FnZShcIlwiKTtcblxuICAgICAgY29uc3QgcGF5bG9hZCA9IHtcbiAgICAgICAgZnJvbURhdGU6IG5vcm1hbGl6ZWQuZnJvbSxcbiAgICAgICAgdG9EYXRlOiBub3JtYWxpemVkLnRvLFxuICAgICAgICBhY2NvdW50TnVtOiBhY2NvdW50TnVtU3RyLFxuICAgICAgfTtcblxuICAgICAgb25EZWJ1Zz8uKFwibG9hZEFjdGl2aXRpZXM6cmVxdWVzdFwiLCB7IHBhZ2UsIHBhZ2VTaXplLCBwYXlsb2FkIH0pO1xuXG4gICAgICBsZXQgZGF0YTogSGlzdG9yeVJlc3BvbnNlO1xuICAgICAgdHJ5IHtcbiAgICAgICAgZGF0YSA9IGF3YWl0IGZldGNoSnNvbjxIaXN0b3J5UmVzcG9uc2U+KGAvSGlzdG9yaWFsL0dldEFjdGl2aXRpZXM/cGFnZT0ke3BhZ2V9JnBhZ2VTaXplPSR7cGFnZVNpemV9YCwge1xuICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxuICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHBheWxvYWQpLFxuICAgICAgICAgIHNpZ25hbDogY29udHJvbGxlci5zaWduYWwsXG4gICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXG4gICAgICAgIH0pO1xuICAgICAgfSBjYXRjaCAoZXJyOiBhbnkpIHtcbiAgICAgICAgaWYgKHJlcXVlc3RJZCAhPT0gYWN0aXZlUmVxdWVzdElkUmVmLmN1cnJlbnQpIHJldHVybjtcbiAgICAgICAgaWYgKGVycj8ubmFtZSA9PT0gXCJBYm9ydEVycm9yXCIpIHtcbiAgICAgICAgICBhY3RpdmVBYm9ydFJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZXJyIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvciAmJiBlcnIuc3RhdHVzID09PSA0MDMpIHtcbiAgICAgICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xuICAgICAgICAgIGFjdGl2ZUFib3J0UmVmLmN1cnJlbnQgPSBudWxsO1xuICAgICAgICAgIG9uRm9yYmlkZGVuKCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgaXNOZXR3b3JrRXJyb3IgPSAhKGVyciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IpIHx8IHR5cGVvZiBlcnIuc3RhdHVzICE9PSBcIm51bWJlclwiO1xuICAgICAgICBpZiAoaXNOZXR3b3JrRXJyb3IgJiYgcmV0cnlPbk5ldHdvcmtFcnJvclJlZi5jdXJyZW50KSB7XG4gICAgICAgICAgcmV0cnlPbk5ldHdvcmtFcnJvclJlZi5jdXJyZW50ID0gZmFsc2U7XG4gICAgICAgICAgYWN0aXZlQWJvcnRSZWYuY3VycmVudCA9IG51bGw7XG4gICAgICAgICAgcmV0cnlUaW1lclJlZi5jdXJyZW50ID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHJlcXVlc3RJZCAhPT0gYWN0aXZlUmVxdWVzdElkUmVmLmN1cnJlbnQpIHJldHVybjtcbiAgICAgICAgICAgIGlmIChsYXN0U2lnbmF0dXJlUmVmLmN1cnJlbnQgIT09IGZpbHRlclNpZ25hdHVyZSkgcmV0dXJuO1xuICAgICAgICAgICAgbG9hZEFjdGl2aXRpZXMocGFnZSwge1xuICAgICAgICAgICAgICBmcm9tRGF0ZTogZnJvbURhdGVTdHIsXG4gICAgICAgICAgICAgIHRvRGF0ZTogdG9EYXRlU3RyLFxuICAgICAgICAgICAgICBhY2NvdW50TnVtOiBhY2NvdW50TnVtU3RyLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSwgcmV0cnlEZWxheU1zKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKGVycj8ubWVzc2FnZSB8fCBpbmRUKFwiQXBpX1JlcXVlc3RGYWlsZWRcIiwgXCJObyBzZSBwdWRvIGNvbmVjdGFyIGNvbiBlbCBzZXJ2aWRvciAocmVkKS5cIikpO1xuICAgICAgICBhY3RpdmVBYm9ydFJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVxdWVzdElkICE9PSBhY3RpdmVSZXF1ZXN0SWRSZWYuY3VycmVudCkgcmV0dXJuO1xuXG4gICAgICBvbkRlYnVnPy4oXCJsb2FkQWN0aXZpdGllczpyZXNwb25zZVwiLCB7XG4gICAgICAgIHN0YXR1czogMjAwLFxuICAgICAgICB0b3RhbDogZGF0YT8udG90YWwgPz8gMCxcbiAgICAgICAgY291bnQ6IEFycmF5LmlzQXJyYXkoZGF0YT8uaXRlbXMpID8gZGF0YS5pdGVtcy5sZW5ndGggOiAwLFxuICAgICAgfSk7XG5cbiAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XG4gICAgICBzZXRJdGVtcyhkYXRhLml0ZW1zIHx8IFtdKTtcbiAgICAgIHNldFRvdGFsKGRhdGEudG90YWwgfHwgKGRhdGEuaXRlbXMgfHwgW10pLmxlbmd0aCk7XG4gICAgICBhY3RpdmVBYm9ydFJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICB9LFxuICAgIFtcbiAgICAgIGFib3J0QWN0aXZlUmVxdWVzdCxcbiAgICAgIGFjY291bnROdW1WYWx1ZSxcbiAgICAgIGNsZWFyUmV0cnlUaW1lcixcbiAgICAgIGZyb21EYXRlVmFsdWUsXG4gICAgICBub3JtYWxpemVSYW5nZSxcbiAgICAgIG9uRGVidWcsXG4gICAgICBvbkZvcmJpZGRlbixcbiAgICAgIHBhZ2VTaXplLFxuICAgICAgcmV0cnlEZWxheU1zLFxuICAgICAgdG9EYXRlVmFsdWUsXG4gICAgXVxuICApO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGNsZWFyUmV0cnlUaW1lcigpO1xuICAgICAgYWJvcnRBY3RpdmVSZXF1ZXN0KCk7XG4gICAgfTtcbiAgfSwgW2Fib3J0QWN0aXZlUmVxdWVzdCwgY2xlYXJSZXRyeVRpbWVyXSk7XG5cbiAgcmV0dXJuIHtcbiAgICBpdGVtcyxcbiAgICB0b3RhbCxcbiAgICBjdXJyZW50UGFnZSxcbiAgICBpc0xvYWRpbmcsXG4gICAgZXJyb3JNZXNzYWdlLFxuICAgIGxvYWRBY3Rpdml0aWVzLFxuICAgIHJlc2V0QWN0aXZpdGllcyxcbiAgICByZXRyeU9uTmV0d29ya0Vycm9yUmVmLFxuICAgIGxhc3RTaWduYXR1cmVSZWYsXG4gIH07XG59O1xuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBISVNUT1JZX0ZJTFRFUl9LRVksIEhJU1RPUllfUkVUVVJOX0ZMQUdfS0VZIH0gZnJvbSBcIi4uL3V0aWxzL3Zpc2l0YXNIaXN0b3J5LnRzXCI7XG5pbXBvcnQge1xuICBnZXRTZXNzaW9uSnNvbldpdGhFeHBpcnksXG4gIGdldFNlc3Npb25WYWx1ZVdpdGhFeHBpcnksXG4gIHJlbW92ZVNlc3Npb25WYWx1ZVdpdGhFeHBpcnksXG4gIHNldFNlc3Npb25Kc29uV2l0aEV4cGlyeSxcbiAgc2V0U2Vzc2lvblZhbHVlV2l0aEV4cGlyeSxcbn0gZnJvbSBcIi4uL3V0aWxzL3Nlc3Npb25FeHBpcnkudHNcIjtcblxuZXhwb3J0IHR5cGUgSGlzdG9yeUNhY2hlZEZpbHRlciA9IHtcbiAgZnJvbURhdGU6IHN0cmluZztcbiAgdG9EYXRlOiBzdHJpbmc7XG4gIHBhZ2U/OiBudW1iZXI7XG4gIGNsaWVudEFjY291bnQ/OiBzdHJpbmc7XG4gIGNsaWVudFRleHQ/OiBzdHJpbmc7XG59O1xuXG5jb25zdCBISVNUT1JZX0NBQ0hFX1RUTF9NUyA9IDEyICogNjAgKiA2MCAqIDEwMDA7XG5cbmNvbnN0IG5vcm1hbGl6ZUNhY2hlZEZpbHRlciA9ICh2YWx1ZTogSGlzdG9yeUNhY2hlZEZpbHRlciB8IG51bGwpOiBIaXN0b3J5Q2FjaGVkRmlsdGVyIHwgbnVsbCA9PiB7XG4gIGlmICghdmFsdWUgfHwgdHlwZW9mIHZhbHVlICE9PSBcIm9iamVjdFwiKSByZXR1cm4gbnVsbDtcbiAgcmV0dXJuIHtcbiAgICBmcm9tRGF0ZTogdmFsdWUuZnJvbURhdGUgfHwgXCJcIixcbiAgICB0b0RhdGU6IHZhbHVlLnRvRGF0ZSB8fCBcIlwiLFxuICAgIHBhZ2U6IHZhbHVlLnBhZ2UsXG4gICAgY2xpZW50QWNjb3VudDogdmFsdWUuY2xpZW50QWNjb3VudCB8fCBcIlwiLFxuICAgIGNsaWVudFRleHQ6IHZhbHVlLmNsaWVudFRleHQgfHwgXCJcIixcbiAgfTtcbn07XG5cbi8vIEtlZXBzIGhpc3RvcnkgZmlsdGVyIGNhY2hlIHJlYWRzL3dyaXRlcyBpbiBvbmUgcGxhY2UuXG5leHBvcnQgY29uc3QgdXNlSGlzdG9yeUZpbHRlckNhY2hlID0gKCkgPT4ge1xuICBjb25zdCByZWFkQ2FjaGVkRmlsdGVyID0gdXNlQ2FsbGJhY2soKCk6IEhpc3RvcnlDYWNoZWRGaWx0ZXIgfCBudWxsID0+IHtcbiAgICBjb25zdCBwYXJzZWQgPSBnZXRTZXNzaW9uSnNvbldpdGhFeHBpcnk8SGlzdG9yeUNhY2hlZEZpbHRlcj4oSElTVE9SWV9GSUxURVJfS0VZKTtcbiAgICByZXR1cm4gbm9ybWFsaXplQ2FjaGVkRmlsdGVyKHBhcnNlZCk7XG4gIH0sIFtdKTtcblxuICBjb25zdCBjbGVhckZpbHRlckNhY2hlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIHJlbW92ZVNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoSElTVE9SWV9GSUxURVJfS0VZKTtcbiAgICByZW1vdmVTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KEhJU1RPUllfUkVUVVJOX0ZMQUdfS0VZKTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IGNvbnN1bWVSZXR1cm5GbGFnID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGNvbnN0IHJhdyA9IGdldFNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoSElTVE9SWV9SRVRVUk5fRkxBR19LRVkpO1xuICAgIGlmIChyYXcgPT09IFwiMVwiKSB7XG4gICAgICByZW1vdmVTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KEhJU1RPUllfUkVUVVJOX0ZMQUdfS0VZKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH0sIFtdKTtcblxuICBjb25zdCBzYXZlQ2FjaGVkRmlsdGVyID0gdXNlQ2FsbGJhY2soKGZpbHRlcjogSGlzdG9yeUNhY2hlZEZpbHRlcikgPT4ge1xuICAgIHNldFNlc3Npb25Kc29uV2l0aEV4cGlyeShISVNUT1JZX0ZJTFRFUl9LRVksIGZpbHRlciwgSElTVE9SWV9DQUNIRV9UVExfTVMpO1xuICAgIHNldFNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoSElTVE9SWV9SRVRVUk5fRkxBR19LRVksIFwiMVwiLCBISVNUT1JZX0NBQ0hFX1RUTF9NUyk7XG4gIH0sIFtdKTtcblxuICByZXR1cm4ge1xuICAgIHJlYWRDYWNoZWRGaWx0ZXIsXG4gICAgY2xlYXJGaWx0ZXJDYWNoZSxcbiAgICBjb25zdW1lUmV0dXJuRmxhZyxcbiAgICBzYXZlQ2FjaGVkRmlsdGVyLFxuICB9O1xufTtcbiIsICJcdUZFRkZpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2ssIHVzZU1lbW8sIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB0eXBlIHsgTW91c2VFdmVudCBhcyBSZWFjdE1vdXNlRXZlbnQgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB0eXBlIHsgQ2xpZW50T3B0aW9uIH0gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvdmlzaXRhcy9DbGllbnRTZWFyY2hDb21ib2JveC50c3hcIjtcbmltcG9ydCB0eXBlIHsgSGlzdG9yeUNhY2hlZEZpbHRlciB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VIaXN0b3J5RmlsdGVyQ2FjaGUudHNcIjtcblxuZXhwb3J0IHR5cGUgUXVpY2tGaWx0ZXJJZCA9IFwiY3VzdG9tXCIgfCBcImRheXMtN1wiIHwgXCJkYXlzLTMwXCIgfCBcImRheXMtOTBcIjtcblxuZXhwb3J0IHR5cGUgTG9hZE92ZXJyaWRlID0ge1xuICBmcm9tRGF0ZTogc3RyaW5nO1xuICB0b0RhdGU6IHN0cmluZztcbiAgYWNjb3VudE51bT86IHN0cmluZztcbn07XG5cbmV4cG9ydCB0eXBlIEZpbHRlckxvYWRSZXF1ZXN0ID0ge1xuICBwYWdlOiBudW1iZXI7XG4gIG92ZXJyaWRlOiBMb2FkT3ZlcnJpZGU7XG59O1xuXG50eXBlIFVzZUhpc3RvcnlGaWx0ZXJzU3RhdGVBcmdzID0ge1xuICBkZWZhdWx0RnJvbURhdGU6IHN0cmluZztcbiAgZGVmYXVsdFRvRGF0ZTogc3RyaW5nO1xuICBsb2dIaXN0b3J5OiAobWVzc2FnZTogc3RyaW5nLCBkYXRhPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pID0+IHZvaWQ7XG4gIHBhcnNlRGF0ZVZhbHVlOiAodmFsdWU6IHN0cmluZykgPT4gRGF0ZSB8IG51bGw7XG4gIHBhcnNlSVNPOiAodmFsdWU6IHN0cmluZykgPT4gRGF0ZSB8IG51bGw7XG4gIHRvSVNPOiAodmFsdWU6IERhdGUpID0+IHN0cmluZztcbiAgc3RhcnRPZkRheTogKHZhbHVlOiBEYXRlKSA9PiBEYXRlO1xuICBpc0JlZm9yZTogKGE6IERhdGUgfCBudWxsLCBiOiBEYXRlIHwgbnVsbCkgPT4gYm9vbGVhbjtcbn07XG5cbi8vIEVuY2Fwc3VsYXRlcyBoaXN0b3J5IGZpbHRlciBzdGF0ZSBhbmQgZGF0ZS1yYW5nZSBvcmNoZXN0cmF0aW9uLlxuZXhwb3J0IGNvbnN0IHVzZUhpc3RvcnlGaWx0ZXJzU3RhdGUgPSAoe1xuICBkZWZhdWx0RnJvbURhdGUsXG4gIGRlZmF1bHRUb0RhdGUsXG4gIGxvZ0hpc3RvcnksXG4gIHBhcnNlRGF0ZVZhbHVlLFxuICBwYXJzZUlTTyxcbiAgdG9JU08sXG4gIHN0YXJ0T2ZEYXksXG4gIGlzQmVmb3JlLFxufTogVXNlSGlzdG9yeUZpbHRlcnNTdGF0ZUFyZ3MpID0+IHtcbiAgY29uc3QgW3N0YXJ0RGF0ZSwgc2V0U3RhcnREYXRlXSA9IHVzZVN0YXRlPERhdGUgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW2VuZERhdGUsIHNldEVuZERhdGVdID0gdXNlU3RhdGU8RGF0ZSB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbbWFudWFsU3RhcnREYXRlLCBzZXRNYW51YWxTdGFydERhdGVdID0gdXNlU3RhdGU8RGF0ZSB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbbWFudWFsRW5kRGF0ZSwgc2V0TWFudWFsRW5kRGF0ZV0gPSB1c2VTdGF0ZTxEYXRlIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtob3ZlckRhdGUsIHNldEhvdmVyRGF0ZV0gPSB1c2VTdGF0ZTxEYXRlIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtzZWxlY3RpbmdTdGVwLCBzZXRTZWxlY3RpbmdTdGVwXSA9IHVzZVN0YXRlPFwic3RhcnRcIiB8IFwiZW5kXCIgfCBcImRvbmVcIj4oXCJzdGFydFwiKTtcbiAgY29uc3QgW2N1cnJlbnRNb250aCwgc2V0Q3VycmVudE1vbnRoXSA9IHVzZVN0YXRlKG5ldyBEYXRlKCkuZ2V0TW9udGgoKSk7XG4gIGNvbnN0IFtjdXJyZW50WWVhciwgc2V0Q3VycmVudFllYXJdID0gdXNlU3RhdGUobmV3IERhdGUoKS5nZXRGdWxsWWVhcigpKTtcbiAgY29uc3QgW2lzT3Blbiwgc2V0SXNPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3Nob3dNYW51YWxQaWNrZXJQYW5lbCwgc2V0U2hvd01hbnVhbFBpY2tlclBhbmVsXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2FjdGl2ZVF1aWNrRmlsdGVyLCBzZXRBY3RpdmVRdWlja0ZpbHRlcl0gPSB1c2VTdGF0ZTxRdWlja0ZpbHRlcklkIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtzZWxlY3RlZENsaWVudCwgc2V0U2VsZWN0ZWRDbGllbnRdID0gdXNlU3RhdGU8Q2xpZW50T3B0aW9uIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtjbGllbnRSZXNldEtleSwgc2V0Q2xpZW50UmVzZXRLZXldID0gdXNlU3RhdGUoMCk7XG4gIGNvbnN0IFtzaG93RmlsdGVycywgc2V0U2hvd0ZpbHRlcnNdID0gdXNlU3RhdGUodHJ1ZSk7XG4gIGNvbnN0IFtzaG93TWFudWFsRXJyb3IsIHNldFNob3dNYW51YWxFcnJvcl0gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgY29uc3QgaGFzUmVzdG9yZWRGaWx0ZXJSZWYgPSB1c2VSZWYoZmFsc2UpO1xuICBjb25zdCBkaWRJbml0RmlsdGVyUmVmID0gdXNlUmVmKGZhbHNlKTtcblxuICBjb25zdCBmcm9tRGF0ZVZhbHVlID0gdXNlTWVtbygoKSA9PiAoc3RhcnREYXRlID8gdG9JU08oc3RhcnREYXRlKSA6IFwiXCIpLCBbc3RhcnREYXRlLCB0b0lTT10pO1xuICBjb25zdCB0b0RhdGVWYWx1ZSA9IHVzZU1lbW8oKCkgPT4gKGVuZERhdGUgPyB0b0lTTyhlbmREYXRlKSA6IFwiXCIpLCBbZW5kRGF0ZSwgdG9JU09dKTtcbiAgY29uc3QgYWNjb3VudE51bVZhbHVlID0gdXNlTWVtbygoKSA9PiAoc2VsZWN0ZWRDbGllbnQgPyBzZWxlY3RlZENsaWVudC52YWx1ZSA6IFwiXCIpLCBbc2VsZWN0ZWRDbGllbnRdKTtcblxuICBjb25zdCB2YWxpZGF0ZU1hbnVhbFJhbmdlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmIChhY3RpdmVRdWlja0ZpbHRlciA9PT0gXCJjdXN0b21cIiAmJiAoIXN0YXJ0RGF0ZSB8fCAhZW5kRGF0ZSkpIHtcbiAgICAgIHNldFNob3dNYW51YWxFcnJvcih0cnVlKTtcbiAgICAgIHNldFNlbGVjdGluZ1N0ZXAoIXN0YXJ0RGF0ZSA/IFwic3RhcnRcIiA6IFwiZW5kXCIpO1xuICAgICAgc2V0U2hvd01hbnVhbFBpY2tlclBhbmVsKHRydWUpO1xuICAgICAgc2V0SXNPcGVuKHRydWUpO1xuICAgICAgc2V0U2hvd0ZpbHRlcnModHJ1ZSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9LCBbYWN0aXZlUXVpY2tGaWx0ZXIsIGVuZERhdGUsIHN0YXJ0RGF0ZV0pO1xuXG4gIC8vIEFwcGxpZXMgYSBkZWZhdWx0IGRhdGUgcmFuZ2UgYW5kIHJldHVybnMgdGhlIGxvYWQgcGF5bG9hZCBuZWVkZWQgYnkgdGhlIHBhZ2UuXG4gIGNvbnN0IGFwcGx5RGVmYXVsdFJhbmdlRnJvbVByb3BzID0gdXNlQ2FsbGJhY2soKCk6IEZpbHRlckxvYWRSZXF1ZXN0IHwgbnVsbCA9PiB7XG4gICAgaWYgKCFkZWZhdWx0RnJvbURhdGUgfHwgIWRlZmF1bHRUb0RhdGUpIHJldHVybiBudWxsO1xuICAgIGNvbnN0IHN0YXJ0UmF3ID0gcGFyc2VEYXRlVmFsdWUoZGVmYXVsdEZyb21EYXRlKTtcbiAgICBjb25zdCBlbmRSYXcgPSBwYXJzZURhdGVWYWx1ZShkZWZhdWx0VG9EYXRlKTtcbiAgICBpZiAoIXN0YXJ0UmF3IHx8ICFlbmRSYXcpIHJldHVybiBudWxsO1xuXG4gICAgY29uc3Qgc3RhcnREYXkgPSBzdGFydE9mRGF5KHN0YXJ0UmF3KTtcbiAgICBjb25zdCBlbmREYXkgPSBzdGFydE9mRGF5KGVuZFJhdyk7XG5cbiAgICBsZXQgc3RhcnQgPSBzdGFydERheTtcbiAgICBsZXQgZW5kID0gZW5kRGF5O1xuICAgIGlmIChpc0JlZm9yZShlbmQsIHN0YXJ0KSkge1xuICAgICAgY29uc3Qgc3dhcCA9IHN0YXJ0O1xuICAgICAgc3RhcnQgPSBlbmQ7XG4gICAgICBlbmQgPSBzd2FwO1xuICAgIH1cblxuICAgIHNldFN0YXJ0RGF0ZShzdGFydCk7XG4gICAgc2V0RW5kRGF0ZShlbmQpO1xuICAgIHNldFNlbGVjdGluZ1N0ZXAoXCJkb25lXCIpO1xuICAgIHNldEhvdmVyRGF0ZShudWxsKTtcbiAgICBzZXRDdXJyZW50TW9udGgoc3RhcnQuZ2V0TW9udGgoKSk7XG4gICAgc2V0Q3VycmVudFllYXIoc3RhcnQuZ2V0RnVsbFllYXIoKSk7XG4gICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIobnVsbCk7XG4gICAgc2V0U2VsZWN0ZWRDbGllbnQobnVsbCk7XG4gICAgc2V0SXNPcGVuKGZhbHNlKTtcblxuICAgIHJldHVybiB7XG4gICAgICBwYWdlOiAxLFxuICAgICAgb3ZlcnJpZGU6IHtcbiAgICAgICAgZnJvbURhdGU6IHRvSVNPKHN0YXJ0KSxcbiAgICAgICAgdG9EYXRlOiB0b0lTTyhlbmQpLFxuICAgICAgICBhY2NvdW50TnVtOiBcIlwiLFxuICAgICAgfSxcbiAgICB9O1xuICB9LCBbZGVmYXVsdEZyb21EYXRlLCBkZWZhdWx0VG9EYXRlLCBpc0JlZm9yZSwgcGFyc2VEYXRlVmFsdWUsIHN0YXJ0T2ZEYXksIHRvSVNPXSk7XG5cbiAgLy8gUmVzZXRzIGhpc3RvcnkgZmlsdGVycyBsb2NhbCBzdGF0ZSBvbmx5LlxuICBjb25zdCByZXNldEhpc3RvcnlGaWx0ZXJzID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIHNldFN0YXJ0RGF0ZShudWxsKTtcbiAgICBzZXRFbmREYXRlKG51bGwpO1xuICAgIHNldE1hbnVhbFN0YXJ0RGF0ZShudWxsKTtcbiAgICBzZXRNYW51YWxFbmREYXRlKG51bGwpO1xuICAgIHNldFNlbGVjdGluZ1N0ZXAoXCJzdGFydFwiKTtcbiAgICBzZXRIb3ZlckRhdGUobnVsbCk7XG4gICAgc2V0Q3VycmVudE1vbnRoKG5ldyBEYXRlKCkuZ2V0TW9udGgoKSk7XG4gICAgc2V0Q3VycmVudFllYXIobmV3IERhdGUoKS5nZXRGdWxsWWVhcigpKTtcbiAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcihudWxsKTtcbiAgICBzZXRTaG93TWFudWFsUGlja2VyUGFuZWwoZmFsc2UpO1xuICAgIHNldFNlbGVjdGVkQ2xpZW50KG51bGwpO1xuICAgIHNldENsaWVudFJlc2V0S2V5KChwcmV2KSA9PiBwcmV2ICsgMSk7XG4gICAgc2V0U2hvd01hbnVhbEVycm9yKGZhbHNlKTtcbiAgfSwgW10pO1xuXG4gIC8vIEFwcGxpZXMgY2FjaGVkIGZpbHRlcnMgYW5kIHJldHVybnMgdGhlIGxvYWQgcGF5bG9hZCBuZWVkZWQgYnkgdGhlIHBhZ2UuXG4gIGNvbnN0IGFwcGx5Q2FjaGVkRmlsdGVyID0gdXNlQ2FsbGJhY2soXG4gICAgKGZpbHRlcjogSGlzdG9yeUNhY2hlZEZpbHRlciB8IG51bGwpOiBGaWx0ZXJMb2FkUmVxdWVzdCB8IG51bGwgPT4ge1xuICAgICAgaWYgKCFmaWx0ZXIgfHwgIWZpbHRlci5mcm9tRGF0ZSB8fCAhZmlsdGVyLnRvRGF0ZSkgcmV0dXJuIG51bGw7XG5cbiAgICAgIGNvbnN0IHN0YXJ0ID0gcGFyc2VJU08oZmlsdGVyLmZyb21EYXRlKTtcbiAgICAgIGNvbnN0IGVuZCA9IHBhcnNlSVNPKGZpbHRlci50b0RhdGUpO1xuICAgICAgc2V0U3RhcnREYXRlKHN0YXJ0KTtcbiAgICAgIHNldEVuZERhdGUoZW5kKTtcbiAgICAgIHNldFNlbGVjdGluZ1N0ZXAoZW5kID8gXCJkb25lXCIgOiBcImVuZFwiKTtcbiAgICAgIHNldEhvdmVyRGF0ZShudWxsKTtcbiAgICAgIHNldEN1cnJlbnRNb250aChzdGFydCA/IHN0YXJ0LmdldE1vbnRoKCkgOiBuZXcgRGF0ZSgpLmdldE1vbnRoKCkpO1xuICAgICAgc2V0Q3VycmVudFllYXIoc3RhcnQgPyBzdGFydC5nZXRGdWxsWWVhcigpIDogbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpKTtcbiAgICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKG51bGwpO1xuICAgICAgc2V0U2hvd01hbnVhbFBpY2tlclBhbmVsKGZhbHNlKTtcbiAgICAgIHNldFNob3dNYW51YWxFcnJvcihmYWxzZSk7XG5cbiAgICAgIGlmIChmaWx0ZXIuY2xpZW50QWNjb3VudCkge1xuICAgICAgICBzZXRTZWxlY3RlZENsaWVudCh7IHZhbHVlOiBmaWx0ZXIuY2xpZW50QWNjb3VudCwgdGV4dDogZmlsdGVyLmNsaWVudFRleHQgfHwgZmlsdGVyLmNsaWVudEFjY291bnQgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZXRTZWxlY3RlZENsaWVudChudWxsKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcGFnZVZhbCA9IE51bWJlcihmaWx0ZXIucGFnZSk7XG4gICAgICBjb25zdCBwYWdlVG9Mb2FkID0gTnVtYmVyLmlzRmluaXRlKHBhZ2VWYWwpICYmIHBhZ2VWYWwgPiAwID8gcGFnZVZhbCA6IDE7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHBhZ2U6IHBhZ2VUb0xvYWQsXG4gICAgICAgIG92ZXJyaWRlOiB7XG4gICAgICAgICAgZnJvbURhdGU6IGZpbHRlci5mcm9tRGF0ZSxcbiAgICAgICAgICB0b0RhdGU6IGZpbHRlci50b0RhdGUsXG4gICAgICAgICAgYWNjb3VudE51bTogZmlsdGVyLmNsaWVudEFjY291bnQgfHwgXCJcIixcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgfSxcbiAgICBbcGFyc2VJU09dXG4gICk7XG5cbiAgY29uc3QgaGFuZGxlU2VsZWN0ID0gdXNlQ2FsbGJhY2soXG4gICAgKGRhdGVPYmo6IERhdGUpID0+IHtcbiAgICAgIGxvZ0hpc3RvcnkoXCJoYW5kbGVTZWxlY3RcIiwge1xuICAgICAgICBjbGlja2VkOiB0b0lTTyhkYXRlT2JqKSxcbiAgICAgICAgc3RhcnQ6IGZyb21EYXRlVmFsdWUsXG4gICAgICAgIGVuZDogdG9EYXRlVmFsdWUsXG4gICAgICAgIHNlbGVjdGluZ1N0ZXAsXG4gICAgICB9KTtcblxuICAgICAgc2V0U2hvd01hbnVhbEVycm9yKGZhbHNlKTtcbiAgICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKFwiY3VzdG9tXCIpO1xuICAgICAgc2V0U2hvd01hbnVhbFBpY2tlclBhbmVsKHRydWUpO1xuICAgICAgY29uc3QgaGFzU3RhcnQgPSAhIXN0YXJ0RGF0ZTtcbiAgICAgIGNvbnN0IGhhc0VuZCA9ICEhZW5kRGF0ZTtcblxuICAgICAgaWYgKHNlbGVjdGluZ1N0ZXAgPT09IFwiZW5kXCIpIHtcbiAgICAgICAgaWYgKCFoYXNTdGFydCkge1xuICAgICAgICAgIHNldFN0YXJ0RGF0ZShkYXRlT2JqKTtcbiAgICAgICAgICBzZXRFbmREYXRlKG51bGwpO1xuICAgICAgICAgIHNldFNlbGVjdGluZ1N0ZXAoXCJlbmRcIik7XG4gICAgICAgICAgc2V0Q3VycmVudE1vbnRoKGRhdGVPYmouZ2V0TW9udGgoKSk7XG4gICAgICAgICAgc2V0Q3VycmVudFllYXIoZGF0ZU9iai5nZXRGdWxsWWVhcigpKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbmV3U3RhcnQgPSBzdGFydERhdGUgYXMgRGF0ZTtcbiAgICAgICAgbGV0IG5ld0VuZCA9IGRhdGVPYmo7XG4gICAgICAgIGlmIChpc0JlZm9yZShuZXdFbmQsIG5ld1N0YXJ0KSkge1xuICAgICAgICAgIGNvbnN0IHN3YXAgPSBuZXdTdGFydDtcbiAgICAgICAgICBuZXdTdGFydCA9IG5ld0VuZDtcbiAgICAgICAgICBuZXdFbmQgPSBzd2FwO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0U3RhcnREYXRlKG5ld1N0YXJ0KTtcbiAgICAgICAgc2V0RW5kRGF0ZShuZXdFbmQpO1xuICAgICAgICBzZXRNYW51YWxTdGFydERhdGUobmV3U3RhcnQpO1xuICAgICAgICBzZXRNYW51YWxFbmREYXRlKG5ld0VuZCk7XG4gICAgICAgIHNldFNlbGVjdGluZ1N0ZXAoXCJkb25lXCIpO1xuICAgICAgICBzZXRDdXJyZW50TW9udGgobmV3RW5kLmdldE1vbnRoKCkpO1xuICAgICAgICBzZXRDdXJyZW50WWVhcihuZXdFbmQuZ2V0RnVsbFllYXIoKSk7XG4gICAgICAgIHNldEhvdmVyRGF0ZShudWxsKTtcbiAgICAgICAgc2V0SXNPcGVuKGZhbHNlKTtcbiAgICAgICAgc2V0U2hvd01hbnVhbFBpY2tlclBhbmVsKGZhbHNlKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBuZXdTdGFydCA9IGRhdGVPYmo7XG4gICAgICBpZiAoaGFzRW5kICYmIGVuZERhdGUgJiYgaXNCZWZvcmUoZW5kRGF0ZSwgbmV3U3RhcnQpKSB7XG4gICAgICAgIHNldFN0YXJ0RGF0ZShuZXdTdGFydCk7XG4gICAgICAgIHNldEVuZERhdGUobnVsbCk7XG4gICAgICAgIHNldFNlbGVjdGluZ1N0ZXAoXCJlbmRcIik7XG4gICAgICAgIHNldEN1cnJlbnRNb250aChuZXdTdGFydC5nZXRNb250aCgpKTtcbiAgICAgICAgc2V0Q3VycmVudFllYXIobmV3U3RhcnQuZ2V0RnVsbFllYXIoKSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgc2V0U3RhcnREYXRlKG5ld1N0YXJ0KTtcbiAgICAgIGlmIChoYXNFbmQgJiYgZW5kRGF0ZSkge1xuICAgICAgICBzZXRFbmREYXRlKGVuZERhdGUpO1xuICAgICAgICBzZXRNYW51YWxTdGFydERhdGUobmV3U3RhcnQpO1xuICAgICAgICBzZXRNYW51YWxFbmREYXRlKGVuZERhdGUpO1xuICAgICAgICBzZXRTZWxlY3RpbmdTdGVwKFwiZG9uZVwiKTtcbiAgICAgICAgc2V0SG92ZXJEYXRlKG51bGwpO1xuICAgICAgICBzZXRJc09wZW4oZmFsc2UpO1xuICAgICAgICBzZXRTaG93TWFudWFsUGlja2VyUGFuZWwoZmFsc2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2V0RW5kRGF0ZShudWxsKTtcbiAgICAgICAgc2V0U2VsZWN0aW5nU3RlcChcImVuZFwiKTtcbiAgICAgIH1cblxuICAgICAgc2V0Q3VycmVudE1vbnRoKG5ld1N0YXJ0LmdldE1vbnRoKCkpO1xuICAgICAgc2V0Q3VycmVudFllYXIobmV3U3RhcnQuZ2V0RnVsbFllYXIoKSk7XG4gICAgfSxcbiAgICBbZW5kRGF0ZSwgZnJvbURhdGVWYWx1ZSwgaXNCZWZvcmUsIGxvZ0hpc3RvcnksIHNlbGVjdGluZ1N0ZXAsIHN0YXJ0RGF0ZSwgdG9EYXRlVmFsdWUsIHRvSVNPXVxuICApO1xuXG4gIGNvbnN0IGhhbmRsZUNsZWFyU3RhdGUgPSB1c2VDYWxsYmFjayhcbiAgICAoZXZlbnQ6IFJlYWN0TW91c2VFdmVudCkgPT4ge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBsb2dIaXN0b3J5KFwiY2xlYXJSYW5nZVwiKTtcbiAgICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKG51bGwpO1xuICAgICAgc2V0U2hvd01hbnVhbEVycm9yKGZhbHNlKTtcbiAgICAgIHNldFNob3dNYW51YWxQaWNrZXJQYW5lbChmYWxzZSk7XG4gICAgICByZXNldEhpc3RvcnlGaWx0ZXJzKCk7XG4gICAgICBzZXRJc09wZW4oZmFsc2UpO1xuICAgICAgc2V0U2hvd0ZpbHRlcnModHJ1ZSk7XG4gICAgfSxcbiAgICBbbG9nSGlzdG9yeSwgcmVzZXRIaXN0b3J5RmlsdGVyc11cbiAgKTtcblxuICBjb25zdCBvcGVuUG9wb3ZlciA9IHVzZUNhbGxiYWNrKFxuICAgIChzZWN0aW9uOiBcInN0YXJ0XCIgfCBcImVuZFwiKSA9PiB7XG4gICAgICBsb2dIaXN0b3J5KFwib3BlblBvcG92ZXJcIiwgeyBzZWN0aW9uLCBzdGFydDogZnJvbURhdGVWYWx1ZSwgZW5kOiB0b0RhdGVWYWx1ZSwgc2VsZWN0aW5nU3RlcCB9KTtcbiAgICAgIHNldFNob3dNYW51YWxFcnJvcihmYWxzZSk7XG4gICAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcihcImN1c3RvbVwiKTtcbiAgICAgIHNldFNob3dNYW51YWxQaWNrZXJQYW5lbCh0cnVlKTtcblxuICAgICAgaWYgKHNlY3Rpb24gPT09IFwiZW5kXCIgJiYgIXN0YXJ0RGF0ZSkge1xuICAgICAgICBzZXRTZWxlY3RpbmdTdGVwKFwic3RhcnRcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZXRTZWxlY3RpbmdTdGVwKHNlY3Rpb24pO1xuICAgICAgfVxuXG4gICAgICBzZXRJc09wZW4odHJ1ZSk7XG4gICAgfSxcbiAgICBbZnJvbURhdGVWYWx1ZSwgbG9nSGlzdG9yeSwgc2VsZWN0aW5nU3RlcCwgc3RhcnREYXRlLCB0b0RhdGVWYWx1ZV1cbiAgKTtcblxuICBjb25zdCBoYW5kbGVBY3RpdmF0b3JLZXlEb3duID0gdXNlQ2FsbGJhY2soXG4gICAgKGV2ZW50OiBSZWFjdC5LZXlib2FyZEV2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4ge1xuICAgICAgaWYgKGV2ZW50LmtleSAhPT0gXCJFbnRlclwiICYmIGV2ZW50LmtleSAhPT0gXCIgXCIpIHJldHVybjtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBvcGVuUG9wb3ZlcihcInN0YXJ0XCIpO1xuICAgIH0sXG4gICAgW29wZW5Qb3BvdmVyXVxuICApO1xuXG4gIGNvbnN0IGhhbmRsZVNlY3Rpb25LZXlEb3duID0gdXNlQ2FsbGJhY2soXG4gICAgKGV2ZW50OiBSZWFjdC5LZXlib2FyZEV2ZW50PEhUTUxEaXZFbGVtZW50Piwgc2VjdGlvbjogXCJzdGFydFwiIHwgXCJlbmRcIikgPT4ge1xuICAgICAgaWYgKGV2ZW50LmtleSAhPT0gXCJFbnRlclwiICYmIGV2ZW50LmtleSAhPT0gXCIgXCIpIHJldHVybjtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIG9wZW5Qb3BvdmVyKHNlY3Rpb24pO1xuICAgIH0sXG4gICAgW29wZW5Qb3BvdmVyXVxuICApO1xuXG4gIGNvbnN0IGFwcGx5UXVpY2tSYW5nZSA9IHVzZUNhbGxiYWNrKFxuICAgIChmaWx0ZXJJZDogUXVpY2tGaWx0ZXJJZCwgc3RhcnQ6IERhdGUsIGVuZDogRGF0ZSkgPT4ge1xuICAgICAgY29uc3Qgc3RhcnREYXkgPSBzdGFydE9mRGF5KHN0YXJ0KTtcbiAgICAgIGNvbnN0IGVuZERheSA9IHN0YXJ0T2ZEYXkoZW5kKTtcbiAgICAgIHNldFN0YXJ0RGF0ZShzdGFydERheSk7XG4gICAgICBzZXRFbmREYXRlKGVuZERheSk7XG4gICAgICBzZXRTZWxlY3RpbmdTdGVwKFwiZG9uZVwiKTtcbiAgICAgIHNldEhvdmVyRGF0ZShudWxsKTtcbiAgICAgIHNldEN1cnJlbnRNb250aChzdGFydERheS5nZXRNb250aCgpKTtcbiAgICAgIHNldEN1cnJlbnRZZWFyKHN0YXJ0RGF5LmdldEZ1bGxZZWFyKCkpO1xuICAgICAgc2V0SXNPcGVuKGZhbHNlKTtcbiAgICAgIHNldFNob3dNYW51YWxQaWNrZXJQYW5lbChmYWxzZSk7XG4gICAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcihmaWx0ZXJJZCk7XG4gICAgICBzZXRTaG93TWFudWFsRXJyb3IoZmFsc2UpO1xuICAgIH0sXG4gICAgW3N0YXJ0T2ZEYXldXG4gICk7XG5cbiAgY29uc3QgaGFuZGxlUXVpY2tGaWx0ZXIgPSB1c2VDYWxsYmFjayhcbiAgICAoZmlsdGVySWQ6IFF1aWNrRmlsdGVySWQpID0+IHtcbiAgICAgIGNvbnN0IHRvZGF5ID0gc3RhcnRPZkRheShuZXcgRGF0ZSgpKTtcblxuICAgICAgaWYgKGZpbHRlcklkID09PSBcImN1c3RvbVwiKSB7XG4gICAgICAgIC8vIFRvZ2dsZSBtYW51YWwgcGFuZWwgb24gZXZlcnkgRGF0ZSBidXR0b24gY2xpY2suXG4gICAgICAgIGlmIChzaG93TWFudWFsUGlja2VyUGFuZWwpIHtcbiAgICAgICAgICBzZXRTaG93TWFudWFsRXJyb3IoZmFsc2UpO1xuICAgICAgICAgIHNldEhvdmVyRGF0ZShudWxsKTtcbiAgICAgICAgICBzZXRTZWxlY3RpbmdTdGVwKHN0YXJ0RGF0ZSAmJiBlbmREYXRlID8gXCJkb25lXCIgOiBzdGFydERhdGUgPyBcImVuZFwiIDogXCJzdGFydFwiKTtcbiAgICAgICAgICBzZXRJc09wZW4oZmFsc2UpO1xuICAgICAgICAgIHNldFNob3dNYW51YWxQaWNrZXJQYW5lbChmYWxzZSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbmV4dFN0YXJ0ID0gbWFudWFsU3RhcnREYXRlID8gbmV3IERhdGUobWFudWFsU3RhcnREYXRlKSA6IHN0YXJ0RGF0ZSA/IG5ldyBEYXRlKHN0YXJ0RGF0ZSkgOiBudWxsO1xuICAgICAgICBjb25zdCBuZXh0RW5kID0gbWFudWFsRW5kRGF0ZSA/IG5ldyBEYXRlKG1hbnVhbEVuZERhdGUpIDogZW5kRGF0ZSA/IG5ldyBEYXRlKGVuZERhdGUpIDogbnVsbDtcbiAgICAgICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIoXCJjdXN0b21cIik7XG4gICAgICAgIHNldFNob3dNYW51YWxQaWNrZXJQYW5lbCh0cnVlKTtcbiAgICAgICAgc2V0U3RhcnREYXRlKG5leHRTdGFydCk7XG4gICAgICAgIHNldEVuZERhdGUobmV4dEVuZCk7XG5cbiAgICAgICAgaWYgKG5leHRTdGFydCkge1xuICAgICAgICAgIHNldEN1cnJlbnRNb250aChuZXh0U3RhcnQuZ2V0TW9udGgoKSk7XG4gICAgICAgICAgc2V0Q3VycmVudFllYXIobmV4dFN0YXJ0LmdldEZ1bGxZZWFyKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQWx3YXlzIHJlb3BlbiB0aGUgbWFudWFsIGNhbGVuZGFyIHdoZW4gdGhlIGN1c3RvbSBkYXRlIHF1aWNrIGZpbHRlciBpcyBwcmVzc2VkLlxuICAgICAgICBzZXRTZWxlY3RpbmdTdGVwKG5leHRTdGFydCAmJiAhbmV4dEVuZCA/IFwiZW5kXCIgOiBcInN0YXJ0XCIpO1xuICAgICAgICBzZXRJc09wZW4odHJ1ZSk7XG4gICAgICAgIHNldEhvdmVyRGF0ZShudWxsKTtcbiAgICAgICAgc2V0U2hvd01hbnVhbEVycm9yKGZhbHNlKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoZmlsdGVySWQgPT09IFwiZGF5cy03XCIpIHtcbiAgICAgICAgY29uc3Qgc3RhcnQgPSBuZXcgRGF0ZSh0b2RheSk7XG4gICAgICAgIHN0YXJ0LnNldERhdGUodG9kYXkuZ2V0RGF0ZSgpIC0gNik7XG4gICAgICAgIGFwcGx5UXVpY2tSYW5nZShmaWx0ZXJJZCwgc3RhcnQsIHRvZGF5KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoZmlsdGVySWQgPT09IFwiZGF5cy0zMFwiKSB7XG4gICAgICAgIGNvbnN0IHN0YXJ0ID0gbmV3IERhdGUodG9kYXkpO1xuICAgICAgICBzdGFydC5zZXREYXRlKHRvZGF5LmdldERhdGUoKSAtIDI5KTtcbiAgICAgICAgYXBwbHlRdWlja1JhbmdlKGZpbHRlcklkLCBzdGFydCwgdG9kYXkpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChmaWx0ZXJJZCA9PT0gXCJkYXlzLTkwXCIpIHtcbiAgICAgICAgY29uc3Qgc3RhcnQgPSBuZXcgRGF0ZSh0b2RheSk7XG4gICAgICAgIHN0YXJ0LnNldERhdGUodG9kYXkuZ2V0RGF0ZSgpIC0gODkpO1xuICAgICAgICBhcHBseVF1aWNrUmFuZ2UoZmlsdGVySWQsIHN0YXJ0LCB0b2RheSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBbYXBwbHlRdWlja1JhbmdlLCBlbmREYXRlLCBtYW51YWxFbmREYXRlLCBtYW51YWxTdGFydERhdGUsIHNob3dNYW51YWxQaWNrZXJQYW5lbCwgc3RhcnREYXRlLCBzdGFydE9mRGF5XVxuICApO1xuXG4gIGNvbnN0IGhhbmRsZUNsaWVudFNlbGVjdGVkID0gdXNlQ2FsbGJhY2soKGNsaWVudDogQ2xpZW50T3B0aW9uIHwgbnVsbCkgPT4ge1xuICAgIHNldFNlbGVjdGVkQ2xpZW50KGNsaWVudCk7XG4gIH0sIFtdKTtcblxuICByZXR1cm4ge1xuICAgIHN0YXJ0RGF0ZSxcbiAgICBlbmREYXRlLFxuICAgIG1hbnVhbFN0YXJ0RGF0ZSxcbiAgICBtYW51YWxFbmREYXRlLFxuICAgIGhvdmVyRGF0ZSxcbiAgICBzZWxlY3RpbmdTdGVwLFxuICAgIGN1cnJlbnRNb250aCxcbiAgICBjdXJyZW50WWVhcixcbiAgICBpc09wZW4sXG4gICAgc2hvd01hbnVhbFBpY2tlclBhbmVsLFxuICAgIGFjdGl2ZVF1aWNrRmlsdGVyLFxuICAgIHNlbGVjdGVkQ2xpZW50LFxuICAgIGNsaWVudFJlc2V0S2V5LFxuICAgIHNob3dGaWx0ZXJzLFxuICAgIHNob3dNYW51YWxFcnJvcixcbiAgICBmcm9tRGF0ZVZhbHVlLFxuICAgIHRvRGF0ZVZhbHVlLFxuICAgIGFjY291bnROdW1WYWx1ZSxcbiAgICBoYXNSZXN0b3JlZEZpbHRlclJlZixcbiAgICBkaWRJbml0RmlsdGVyUmVmLFxuICAgIHNldFN0YXJ0RGF0ZSxcbiAgICBzZXRFbmREYXRlLFxuICAgIHNldE1hbnVhbFN0YXJ0RGF0ZSxcbiAgICBzZXRNYW51YWxFbmREYXRlLFxuICAgIHNldEhvdmVyRGF0ZSxcbiAgICBzZXRTZWxlY3RpbmdTdGVwLFxuICAgIHNldEN1cnJlbnRNb250aCxcbiAgICBzZXRDdXJyZW50WWVhcixcbiAgICBzZXRJc09wZW4sXG4gICAgc2V0U2hvd01hbnVhbFBpY2tlclBhbmVsLFxuICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyLFxuICAgIHNldFNlbGVjdGVkQ2xpZW50LFxuICAgIHNldENsaWVudFJlc2V0S2V5LFxuICAgIHNldFNob3dGaWx0ZXJzLFxuICAgIHNldFNob3dNYW51YWxFcnJvcixcbiAgICB2YWxpZGF0ZU1hbnVhbFJhbmdlLFxuICAgIGFwcGx5RGVmYXVsdFJhbmdlRnJvbVByb3BzLFxuICAgIHJlc2V0SGlzdG9yeUZpbHRlcnMsXG4gICAgYXBwbHlDYWNoZWRGaWx0ZXIsXG4gICAgaGFuZGxlU2VsZWN0LFxuICAgIGhhbmRsZUNsZWFyU3RhdGUsXG4gICAgb3BlblBvcG92ZXIsXG4gICAgaGFuZGxlQWN0aXZhdG9yS2V5RG93bixcbiAgICBoYW5kbGVTZWN0aW9uS2V5RG93bixcbiAgICBoYW5kbGVRdWlja0ZpbHRlcixcbiAgICBoYW5kbGVDbGllbnRTZWxlY3RlZCxcbiAgfTtcbn07XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBQUEsZ0JBQXlFOzs7QUNBekUsbUJBQTJDO0FBZ0l2QztBQW5HSixJQUFNLGNBQWM7QUFDcEIsSUFBTSxxQkFBcUI7QUFZM0IsSUFBTSxlQUFlLENBQUMsRUFBRSxPQUFPLFlBQVksY0FBYyxXQUFXLE1BQWE7QUFDL0UsUUFBTSxtQkFBZSxxQkFBOEIsSUFBSTtBQUN2RCxRQUFNLGtCQUFjLHFCQUFzQjtBQUFBLElBQ3hDLFFBQVE7QUFBQSxJQUNSLFdBQVc7QUFBQSxJQUNYLFFBQVE7QUFBQSxJQUNSLFFBQVE7QUFBQSxJQUNSLFdBQVc7QUFBQSxJQUNYLE9BQU87QUFBQSxJQUNQLFFBQVE7QUFBQSxFQUNWLENBQUM7QUFFRCxRQUFNLDJCQUF1QiwwQkFBWSxDQUFDLFdBQStCO0FBQ3ZFLFVBQU0sT0FBTztBQUNiLFFBQUksQ0FBQyxRQUFRLE9BQU8sS0FBSyxZQUFZLFdBQVksUUFBTztBQUN4RCxVQUFNLE9BQU8sS0FBSyxRQUFxQix5Q0FBeUM7QUFDaEYsUUFBSSxDQUFDLEtBQU0sUUFBTztBQUNsQixRQUFJLENBQUMsYUFBYSxTQUFTLFNBQVMsSUFBSSxFQUFHLFFBQU87QUFDbEQsV0FBTztBQUFBLEVBQ1QsR0FBRyxDQUFDLENBQUM7QUFFTCxRQUFNLG9CQUFnQiwwQkFBWSxNQUFNO0FBQ3RDLGdCQUFZLFFBQVEsU0FBUztBQUM3QixnQkFBWSxRQUFRLFlBQVk7QUFDaEMsZ0JBQVksUUFBUSxRQUFRO0FBQzVCLGdCQUFZLFFBQVEsU0FBUztBQUFBLEVBQy9CLEdBQUcsQ0FBQyxDQUFDO0FB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R0FDaEY7QUFBQSxVQUNDLEtBQUssbUJBQW1CLFNBQVM7QUFBQTtBQUFBO0FBQUEsSUFDcEM7QUFBQSxJQUVDLGVBQ0MsOEVBQ0U7QUFBQTtBQUFBLFFBQUM7QUFBQTtBQUFBLFVBQ0MsT0FBTztBQUFBLFVBQ1AsWUFBWSxLQUFLLHlCQUF5Qix5QkFBeUI7QUFBQSxVQUNuRTtBQUFBLFVBQ0EsWUFBWTtBQUFBO0FBQUEsTUFDZDtBQUFBLE1BRUE7QUFBQSxRQUFDO0FBQUE7QUFBQSxVQUNDO0FBQUEsVUFDQTtBQUFBLFVBQ0EsWUFBWTtBQUFBLFVBQ1osU0FBUztBQUFBLFVBQ1QsY0FBYyxDQUFDLFNBQVMsZUFBZSxJQUFJO0FBQUEsVUFDM0MsUUFBUTtBQUFBO0FBQUEsTUFDVjtBQUFBLE9BQ0Y7QUFBQSxJQUVELGtCQUNDO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQyxPQUFNO0FBQUEsUUFDTixXQUFXLEtBQUssaUJBQWlCLFFBQVE7QUFBQSxRQUN6QyxNQUFNO0FBQUEsUUFDTixPQUFPO0FBQUEsUUFDUCxRQUFRO0FBQUE7QUFBQSxJQUNWO0FBQUEsS0FFSjtBQUVKO0FBR08sSUFBTSxtQkFBbUIsQ0FBQyxTQUFzQjtBQUNyRCxRQUFNLGtCQUFrQixLQUFLLGFBQWEsbUJBQW1CLEtBQUs7QUFDbEUsUUFBTSxnQkFBZ0IsS0FBSyxhQUFhLGlCQUFpQixLQUFLO0FBRTlELG1CQUFpQixNQUFNLDZDQUFDLGVBQVksaUJBQWtDLGVBQThCLENBQUU7QUFDeEc7QUFFQSxJQUFNLFFBQVEsTUFBTTtBQUNsQixRQUFNLFNBQVMsU0FBUyxlQUFlLHNCQUFzQjtBQUM3RCxNQUFJLENBQUMsT0FBUTtBQUNiLG1CQUFpQixNQUFNO0FBQ3pCO0FBRUEsdUJBQXVCLEtBQUs7QUFFNUIsSUFBTyxzQkFBUTsiLAogICJuYW1lcyI6IFsiaW1wb3J0X3JlYWN0IiwgIlJlYWN0IiwgImltcG9ydF9yZWFjdCIsICJsb2dIaXN0b3J5IiwgImltcG9ydF9yZWFjdCIsICJsb2dIaXN0b3J5IiwgInRvVGl0bGVDYXNlIiwgImZvcm1hdERhdGVQYXJ0cyIsICJpbXBvcnRfcmVhY3QiLCAibm9ybWFsaXplUmFuZ2UiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJsb2dIaXN0b3J5IiwgInBhcnNlRGF0ZVZhbHVlIiwgInBhcnNlSVNPIiwgInRvSVNPIiwgInN0YXJ0T2ZEYXkiLCAiaXNCZWZvcmUiLCAibmV3U3RhcnQiLCAiaW1wb3J0X2pzeF9ydW50aW1lIl0KfQo=
