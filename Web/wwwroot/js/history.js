import {
  ClientSearchCombobox_default
} from "./chunks/chunk-A2ZWLU76.js";
import {
  formatModuleVisibleUserLabel,
  getVisibleUserForOwner,
  useModuleDataVisibility
} from "./chunks/chunk-6O3W47V5.js";
import {
  ActionButton_default,
  FilterButton_default,
  HistoryManualDatePicker_default,
  HistorySummary_default
} from "./chunks/chunk-IE7PMQKQ.js";
import {
  CompactPagination_default,
  FloatingActionButton_default,
  useTimelineCardEffects
} from "./chunks/chunk-2YXSM2RQ.js";
import "./chunks/chunk-YMDESVRK.js";
import {
  ChevronDownSvg
} from "./chunks/chunk-XB6OXILH.js";
import {
  HISTORY_FILTER_KEY,
  HISTORY_RETURN_FLAG_KEY
} from "./chunks/chunk-CBDB7NMA.js";
import {
  setTopbarActionGroupReady
} from "./chunks/chunk-ZBKHPZJX.js";
import "./chunks/chunk-DY2B5JHI.js";
import {
  Spinner_default,
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
var import_react14 = __toESM(require_react());

// Web/wwwroot/react/src/pages/visitas/historial/VisibleVisitOwnerSelect.tsx
var import_jsx_runtime = __toESM(require_jsx_runtime());
var VisibleVisitOwnerSelect = ({
  users,
  selectedOwnerAxUserId,
  loading,
  errorMessage,
  label,
  allLabel,
  noUsersLabel,
  loadingLabel,
  onChange
}) => {
  const hasVisibleUsers = users.length > 0;
  const disabled = loading || !hasVisibleUsers;
  const selectedUserExists = users.some((user) => user.axUserId.toUpperCase() === selectedOwnerAxUserId.toUpperCase());
  const selectValue = hasVisibleUsers && selectedUserExists ? selectedOwnerAxUserId : "";
  const statusText = loading ? loadingLabel : errorMessage;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "space-y-1", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "sr-only", htmlFor: "history-visible-owner", children: label }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "relative", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "select",
        {
          id: "history-visible-owner",
          className: classNames(
            "w-full appearance-none rounded-[var(--radius-xl)] border border-slate-200 bg-white px-3 py-2 pr-10 text-sm sm:text-base leading-5 text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-primary focus:border-primary",
            disabled ? "cursor-not-allowed text-slate-500" : ""
          ),
          value: hasVisibleUsers ? selectValue : "",
          onChange: (event) => onChange(event.target.value),
          disabled,
          "aria-label": label,
          "aria-busy": loading,
          children: hasVisibleUsers ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "", children: allLabel }),
            users.map((user) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: user.axUserId, children: formatModuleVisibleUserLabel(user) }, user.axUserId))
          ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "", children: noUsersLabel })
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500", children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner_default, { size: "h-4 w-4", label: loadingLabel }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDownSvg, { className: "h-5 w-5" }) })
    ] }),
    statusText && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-full flex justify-end", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: classNames("text-xs tech-info", errorMessage ? "text-amber-700" : "text-slate-500"), children: statusText }) })
  ] });
};
var VisibleVisitOwnerSelect_default = VisibleVisitOwnerSelect;

// Web/wwwroot/react/src/pages/visitas/historial/HistoryFilterPanel.tsx
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var HistoryFilterPanel = ({
  activatorRef,
  popoverRef,
  quickFilters,
  activeQuickFilter,
  showInlineSummary,
  showManualPicker,
  summaryFromLabel,
  summaryToLabel,
  fromValue,
  toValue,
  ownerLabel,
  ownerValue,
  filterTitle,
  showManualError,
  showStartError,
  showEndError,
  isOpen,
  selectingStep,
  labelFrom,
  labelTo,
  startDateText,
  endDateText,
  clearRangeLabel,
  hasSelectedRange,
  monthLabel,
  weekDayLabels,
  statusText,
  dayCells,
  prevMonthLabel,
  nextMonthLabel,
  clientResetKey,
  selectedClient,
  clientLabel,
  visibleVisitUsers,
  selectedOwnerAxUserId,
  visibleUsersLoading,
  visibleUsersError,
  ownerAllLabel,
  ownerNoUsersLabel,
  ownerLoadingLabel,
  showFilterActions,
  clearLabel,
  applyLabel,
  onQuickFilter,
  onOpenPopover,
  onActivatorKeyDown,
  onSectionKeyDown,
  onClearDate,
  onPrevMonth,
  onNextMonth,
  onGridMouseLeave,
  onDayClick,
  onDayHover,
  onClientSelected,
  onOwnerChange,
  onResetFilters,
  onApplyFilters
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "filter-card filter-card--expanded p-2 sm:p-2.5 relative", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "gap-y-1.5 history-filter-stack flex flex-col", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "grid grid-cols-2 gap-2 history-quick-filters", "aria-label": filterTitle, children: quickFilters.map((item) => {
      const isActive = activeQuickFilter === item.id;
      return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        FilterButton_default,
        {
          label: item.label,
          active: isActive,
          className: "w-full",
          onClick: () => onQuickFilter(item.id)
        },
        item.id
      );
    }) }),
    showInlineSummary && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      HistorySummary_default,
      {
        summaryFromLabel,
        summaryToLabel,
        fromValue,
        toValue,
        ownerLabel,
        ownerValue,
        showOwner: !!ownerValue,
        className: "gap-y-1 text-[11px] px-1"
      }
    ),
    showManualPicker && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      HistoryManualDatePicker_default,
      {
        activatorRef,
        popoverRef,
        showManualError,
        showStartError,
        showEndError,
        filterTitle,
        isOpen,
        selectingStep,
        labelFrom,
        labelTo,
        startDateText,
        endDateText,
        clearRangeLabel,
        hasSelectedRange,
        monthLabel,
        weekDayLabels,
        statusText,
        dayCells,
        prevMonthLabel,
        nextMonthLabel,
        onOpenPopover,
        onActivatorKeyDown,
        onSectionKeyDown,
        onClear: onClearDate,
        onPrevMonth,
        onNextMonth,
        onGridMouseLeave,
        onDayClick,
        onDayHover
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      VisibleVisitOwnerSelect_default,
      {
        users: visibleVisitUsers,
        selectedOwnerAxUserId,
        loading: visibleUsersLoading,
        errorMessage: visibleUsersError,
        label: ownerLabel,
        allLabel: ownerAllLabel,
        noUsersLabel: ownerNoUsersLabel,
        loadingLabel: ownerLoadingLabel,
        onChange: onOwnerChange
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      ClientSearchCombobox_default,
      {
        value: selectedClient,
        onSelected: onClientSelected,
        label: clientLabel,
        placeholder: clientLabel,
        variant: "compact",
        showLabel: false,
        idBase: "history-client",
        portalClassName: "visitas-typography"
      },
      clientResetKey
    ),
    showFilterActions && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "mt-1 grid grid-cols-2 gap-2 history-filter-actions", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ActionButton_default, { label: clearLabel, className: "w-full", onClick: onResetFilters }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ActionButton_default, { label: applyLabel, className: "w-full", onClick: onApplyFilters })
    ] })
  ] }) });
};
var HistoryFilterPanel_default = HistoryFilterPanel;

// Web/wwwroot/react/src/pages/visitas/historial/HistoryTable.tsx
var import_react = __toESM(require_react());
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
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
  const content = errorMessage ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "text-danger", children: errorMessage }) : hasItems ? items.map((item, index) => {
    const key = item.id || item.recId?.toString() || `timeline-${index}`;
    const isClickable = !item.isNoData && !!item.id;
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "timeline-item", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
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
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "timeline-date-panel flex flex-col items-center justify-center gap-1 px-3 py-3 bg-slate-50 border-r border-slate-200 text-slate-600", children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "text-xs font-semibold tracking-[0.2em] text-slate-500", children: item.dateParts.year }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "text-xs font-semibold uppercase tracking-[0.2em] text-slate-500", children: item.dateParts.month }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "text-2xl font-semibold text-primary", children: item.dateParts.day })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "timeline-card__content flex-1 py-3 px-4", children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "timeline-name", "data-fulltext": item.fullName || item.name, children: item.name }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "timeline-desc-text", "data-fulltext": item.fullDesc || item.description, children: item.description || noDataText })
          ] })
        ]
      }
    ) }, key);
  }) : null;
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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

// Web/wwwroot/react/src/pages/visitas/historial/HistoryResultsSection.tsx
var import_jsx_runtime4 = __toESM(require_jsx_runtime());
var HistoryResultsSection = ({
  showResults,
  isLoading,
  loadingLabel,
  timelineItems,
  noDataText,
  errorMessage,
  totalPages,
  currentPage,
  pageWindow,
  paginationLabels,
  onNavigate,
  onPageChange
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
      "div",
      {
        id: "resultsLoader",
        className: "loader-box glass-panel shadow-card flex items-center gap-2 text-sm text-neutral-700",
        style: { display: isLoading ? "flex" : "none" },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("svg", { className: "ind-spinner size-5", viewBox: "0 0 20 20", role: "status", "aria-label": loadingLabel, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("circle", { className: "ind-spinner__circle", cx: "10", cy: "10", r: "8", strokeWidth: "2" }) }),
          loadingLabel
        ]
      }
    ),
    showResults && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        HistoryTable_default,
        {
          items: timelineItems,
          noDataText,
          errorMessage,
          onNavigate
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        CompactPagination_default,
        {
          totalPages,
          currentPage,
          pageWindow,
          loading: isLoading,
          onPageChange,
          labels: paginationLabels
        }
      )
    ] })
  ] });
};
var HistoryResultsSection_default = HistoryResultsSection;

// Web/wwwroot/react/src/pages/visitas/historial/useHistoryCalendarPicker.ts
var import_react2 = __toESM(require_react());
var sameDay = (a, b) => !!(a && b && a.getTime() === b.getTime());
var useHistoryCalendarPicker = ({
  currentMonth,
  currentYear,
  locale,
  startDate,
  endDate,
  hoverDate,
  selectingStep,
  setCurrentMonth,
  setCurrentYear,
  setHoverDate,
  handleSelect,
  logHistory: logHistory2,
  toISO: toISO2,
  isBefore: isBefore2,
  formatMonthLabel: formatMonthLabel2
}) => {
  const calendar = (0, import_react2.useMemo)(() => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const offset = (firstDay.getDay() + 6) % 7;
    const cells = [];
    for (let i = 0; i < offset; i++) {
      cells.push({ date: null, iso: "", isEmpty: true });
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const dateObj = new Date(currentYear, currentMonth, d);
      cells.push({ date: dateObj, iso: toISO2(dateObj), isEmpty: false });
    }
    return {
      cells,
      label: formatMonthLabel2(firstDay, locale)
    };
  }, [currentMonth, currentYear, formatMonthLabel2, locale, toISO2]);
  const previewEnd = endDate || (selectingStep === "end" ? hoverDate : null);
  const handlePrevMonth = (0, import_react2.useCallback)(
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
  const handleNextMonth = (0, import_react2.useCallback)(
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
  const handleGridMouseLeave = (0, import_react2.useCallback)(() => {
    setHoverDate(null);
  }, [setHoverDate]);
  const handleManualDayClick = (0, import_react2.useCallback)(
    (cell) => {
      if (!cell.date) return;
      logHistory2("dayClick", { date: cell.iso || "", disabled: !!cell.disabled });
      handleSelect(cell.date);
    },
    [handleSelect, logHistory2]
  );
  const handleManualDayHover = (0, import_react2.useCallback)(
    (cell) => {
      if (!cell.date) return;
      if (selectingStep === "end" && startDate) {
        setHoverDate(new Date(cell.date));
      }
    },
    [selectingStep, setHoverDate, startDate]
  );
  const manualDayCells = (0, import_react2.useMemo)(() => {
    return calendar.cells.map((cell, idx) => {
      if (cell.isEmpty) {
        return { key: `empty-${idx}`, isEmpty: true };
      }
      const dateObj = cell.date;
      const isStart = sameDay(dateObj, startDate);
      const isEnd = sameDay(dateObj, endDate);
      const inRange = startDate && previewEnd && isBefore2(startDate, dateObj) && isBefore2(dateObj, previewEnd);
      const hoverRange = startDate && !endDate && hoverDate && isBefore2(startDate, dateObj) && isBefore2(dateObj, hoverDate);
      const disabled = selectingStep === "end" && !!startDate && isBefore2(dateObj, startDate);
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
  }, [calendar.cells, endDate, hoverDate, isBefore2, previewEnd, selectingStep, startDate]);
  return {
    calendarLabel: calendar.label,
    manualDayCells,
    handlePrevMonth,
    handleNextMonth,
    handleGridMouseLeave,
    handleManualDayClick,
    handleManualDayHover
  };
};

// Web/wwwroot/react/src/pages/visitas/historial/useHistoryFilterActions.ts
var import_react3 = __toESM(require_react());
var useHistoryFilterActions = ({
  startDate,
  endDate,
  fromDateValue,
  toDateValue,
  accountNumValue,
  ownerAxUserIdValue,
  lastSignatureRef,
  validateManualRange,
  normalizeRange: normalizeRange2,
  loadActivities,
  handleClearState,
  clearFilterCache,
  resetActivities,
  resetHistoryFilters,
  setIsOpen,
  setShowFilters,
  setShowManualError
}) => {
  const applyFilters = (0, import_react3.useCallback)(
    (options) => {
      if (!validateManualRange()) return;
      if (!startDate || !endDate) return;
      const normalized = normalizeRange2(fromDateValue, toDateValue);
      const page = options?.page ?? 1;
      const signature = `${normalized.from}|${normalized.to}|${accountNumValue}|${ownerAxUserIdValue}|${page}`;
      if (options?.force || lastSignatureRef.current !== signature) {
        loadActivities(page, {
          fromDate: normalized.from,
          toDate: normalized.to,
          accountNum: accountNumValue,
          ownerAxUserId: ownerAxUserIdValue
        });
      }
      setShowManualError(false);
      if (options?.closePanel) {
        setIsOpen(false);
        setShowFilters(false);
      }
    },
    [
      accountNumValue,
      endDate,
      fromDateValue,
      lastSignatureRef,
      loadActivities,
      ownerAxUserIdValue,
      setIsOpen,
      setShowFilters,
      setShowManualError,
      startDate,
      toDateValue,
      validateManualRange,
      normalizeRange2
    ]
  );
  const handleClear = (0, import_react3.useCallback)(
    (event) => {
      handleClearState(event);
      clearFilterCache();
      resetActivities();
    },
    [clearFilterCache, handleClearState, resetActivities]
  );
  const handleResetFilters = (0, import_react3.useCallback)(() => {
    resetHistoryFilters();
    clearFilterCache();
    resetActivities();
    setIsOpen(false);
    setShowFilters(true);
  }, [clearFilterCache, resetActivities, resetHistoryFilters, setIsOpen, setShowFilters]);
  return {
    applyFilters,
    handleClear,
    handleResetFilters
  };
};

// Web/wwwroot/react/src/pages/visitas/historial/useHistoryInitialLoad.ts
var import_react4 = __toESM(require_react());
var useHistoryInitialLoad = ({
  defaultFromDate,
  defaultToDate,
  didInitFilterRef,
  hasRestoredFilterRef,
  retryOnNetworkErrorRef,
  consumeReturnFlag,
  readCachedFilter,
  applyCachedFilter,
  applyDefaultRangeFromProps,
  loadActivities,
  resetActivities,
  resetHistoryFilters,
  clearFilterCache,
  setShowFilters,
  setIsOpen,
  logHistory: logHistory2
}) => {
  (0, import_react4.useEffect)(() => {
    logHistory2("init", { defaultFromDate, defaultToDate });
  }, [defaultFromDate, defaultToDate, logHistory2]);
  (0, import_react4.useEffect)(() => {
    if (didInitFilterRef.current) return;
    didInitFilterRef.current = true;
    const cached = consumeReturnFlag() ? readCachedFilter() : null;
    if (cached && cached.fromDate && cached.toDate) {
      logHistory2("restoreFilter", cached);
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
    retryOnNetworkErrorRef,
    setIsOpen,
    setShowFilters,
    logHistory2
  ]);
};

// Web/wwwroot/react/src/pages/visitas/historial/useHistoryLabels.ts
var import_react5 = __toESM(require_react());
var toSentenceCase = (value, locale) => {
  if (!value) return "";
  const trimmed = value.trim();
  if (!trimmed) return trimmed;
  const lower = trimmed.toLocaleLowerCase(locale);
  return lower[0].toLocaleUpperCase(locale) + lower.slice(1);
};
var useHistoryLabels = (locale) => {
  const labelFrom = toSentenceCase(indT("History_From", "From"), locale);
  const labelTo = toSentenceCase(indT("History_To", "To"), locale);
  const quickCustomLabel = indT("History_Quick_Custom", "Date");
  const quick7DaysLabel = indT("History_Quick_7Days", "7 days");
  const quick30DaysLabel = indT("History_Quick_30Days", "30 days");
  const quick90DaysLabel = indT("History_Quick_90Days", "90 days");
  const pageFirstLabel = indT("History_Page_First", "First");
  const pagePrevLabel = indT("History_Page_Prev", "Previous");
  const pageNextLabel = indT("History_Page_Next", "Next");
  const pageLastLabel = indT("History_Page_Last", "Last");
  const weekDayLabels = (0, import_react5.useMemo)(
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
  const quickFilters = (0, import_react5.useMemo)(
    () => [
      { id: "custom", label: quickCustomLabel },
      { id: "days-7", label: quick7DaysLabel },
      { id: "days-30", label: quick30DaysLabel },
      { id: "days-90", label: quick90DaysLabel }
    ],
    [quick30DaysLabel, quick7DaysLabel, quick90DaysLabel, quickCustomLabel]
  );
  const paginationLabels = (0, import_react5.useMemo)(
    () => ({
      first: pageFirstLabel,
      prev: pagePrevLabel,
      next: pageNextLabel,
      last: pageLastLabel
    }),
    [pageFirstLabel, pageLastLabel, pageNextLabel, pagePrevLabel]
  );
  return {
    labelFrom,
    labelTo,
    summaryFrom: labelFrom,
    summaryTo: labelTo,
    filterTitle: indT("History_Filter_Date", "Date"),
    addDateLabel: indT("History_AddDate", "Add date"),
    clearRangeLabel: indT("History_ClearRange", "Clear range"),
    prevMonthLabel: indT("History_PrevMonth", "Previous month"),
    nextMonthLabel: indT("History_NextMonth", "Next month"),
    statusSelectStartLabel: indT("History_Status_SelectStart", "Select start date"),
    statusSelectEndLabel: indT("History_Status_SelectEnd", "Select end date"),
    clearLabel: indT("History_Filter_Clear", "Clear"),
    applyLabel: indT("History_Filter_Apply", "Apply"),
    clientLabel: indT("History_Filter_Client", "Account"),
    ownerLabel: indT("History_Filter_Owner", "Owner"),
    ownerAllLabel: indT("History_Filter_Owner_All", "All visible users"),
    ownerNoUsersLabel: indT("History_Filter_Owner_None", "No visible users"),
    ownerLoadingLabel: indT("History_Filter_Owner_Loading", "Loading visible users"),
    loadingLabel: indT("History_Loading", "Loading"),
    noVisitsInRangeLabel: indT("History_NoDataInRange", "No visits in this range"),
    createLabel: indT("Common_Create", "Create"),
    weekDayLabels,
    quickFilters,
    paginationLabels
  };
};

// Web/wwwroot/react/src/pages/visitas/historial/useHistoryNavigation.ts
var import_react6 = __toESM(require_react());
var useHistoryNavigation = ({
  canViewHistory,
  currentPage,
  fromDateValue,
  toDateValue,
  selectedClient,
  ownerAxUserId,
  ownerText,
  navDelayMs,
  saveCachedFilter,
  onForbidden
}) => {
  return (0, import_react6.useCallback)(
    (linkId) => {
      if (!canViewHistory) {
        onForbidden();
        return;
      }
      setTimeout(() => {
        saveCachedFilter({
          fromDate: fromDateValue || "",
          toDate: toDateValue || "",
          page: currentPage,
          clientAccount: selectedClient?.value || "",
          clientText: selectedClient?.text || "",
          ownerAxUserId,
          ownerText
        });
        const target = encodeURIComponent(linkId);
        window.location.href = `/Visitas/Detalle/${target}`;
      }, navDelayMs);
    },
    [
      canViewHistory,
      currentPage,
      fromDateValue,
      navDelayMs,
      onForbidden,
      ownerAxUserId,
      ownerText,
      saveCachedFilter,
      selectedClient,
      toDateValue
    ]
  );
};

// Web/wwwroot/react/src/pages/visitas/historial/useHistoryPageListeners.ts
var import_react7 = __toESM(require_react());
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
  (0, import_react7.useEffect)(() => {
    setTopbarActionGroupReady("history-list-actions");
  }, []);
  (0, import_react7.useEffect)(() => {
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
  (0, import_react7.useEffect)(() => {
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
  (0, import_react7.useEffect)(() => {
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

// Web/wwwroot/react/src/pages/visitas/historial/useHistoryPickerStepSync.ts
var import_react8 = __toESM(require_react());
var useHistoryPickerStepSync = ({ startDate, endDate, selectingStep, setSelectingStep }) => {
  (0, import_react8.useEffect)(() => {
    if (startDate && !endDate && selectingStep === "start") {
      setSelectingStep("end");
      return;
    }
    if (!startDate && selectingStep !== "start") {
      setSelectingStep("start");
    }
  }, [startDate, endDate, selectingStep, setSelectingStep]);
};

// Web/wwwroot/react/src/pages/visitas/historial/useHistoryTimelineItems.ts
var import_react9 = __toESM(require_react());
var useHistoryTimelineItems = ({
  items,
  locale,
  noDataText,
  logHistory: logHistory2,
  toTitleCase: toTitleCase2,
  formatDateParts: formatDateParts2
}) => {
  const debugLoggedRef = (0, import_react9.useRef)(0);
  const timelineItems = (0, import_react9.useMemo)(() => {
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

// Web/wwwroot/react/src/pages/visitas/historial/useHistoryVisibleOwner.ts
var import_react10 = __toESM(require_react());
var APP_CODE = "CRM";
var MODULE_CODE = "VISITAS_GESTION";
var useHistoryVisibleOwner = ({
  enabled,
  companyId,
  axUserId,
  permissionsRevision,
  selectedOwnerAxUserId,
  onDebug
}) => {
  const {
    visibleUsers,
    visibleUserByOwnerAxUserId,
    visibleUsersLoading,
    visibleUsersError,
    visibleUsersReady
  } = useModuleDataVisibility({
    enabled,
    companyId,
    axUserId,
    permissionsRevision,
    appCode: APP_CODE,
    moduleCode: MODULE_CODE,
    preloadedUsers: typeof window !== "undefined" ? window.__IND_VISIBLE_VISIT_USERS__ : void 0,
    onForbidden: showPermissionModal,
    onDebug
  });
  const selectedOwner = (0, import_react10.useMemo)(() => {
    return getVisibleUserForOwner(visibleUserByOwnerAxUserId, selectedOwnerAxUserId);
  }, [selectedOwnerAxUserId, visibleUserByOwnerAxUserId]);
  return {
    visibleVisitUsers: visibleUsers,
    visibleUsersLoading,
    visibleUsersError,
    visibleUsersReady,
    selectedOwnerText: selectedOwner ? formatModuleVisibleUserLabel(selectedOwner) : "",
    effectiveSelectedOwnerAxUserId: selectedOwner?.axUserId || ""
  };
};

// Web/wwwroot/react/src/hooks/useHistoryActivities.ts
var import_react11 = __toESM(require_react());
var useHistoryActivities = ({
  fromDateValue,
  toDateValue,
  accountNumValue,
  ownerAxUserIdValue = "",
  pageSize,
  retryDelayMs = 600,
  normalizeRange: normalizeRange2,
  onForbidden,
  onDebug
}) => {
  const [items, setItems] = (0, import_react11.useState)([]);
  const [total, setTotal] = (0, import_react11.useState)(0);
  const [currentPage, setCurrentPage] = (0, import_react11.useState)(1);
  const [isLoading, setIsLoading] = (0, import_react11.useState)(false);
  const [errorMessage, setErrorMessage] = (0, import_react11.useState)("");
  const retryOnNetworkErrorRef = (0, import_react11.useRef)(false);
  const activeAbortRef = (0, import_react11.useRef)(null);
  const activeRequestIdRef = (0, import_react11.useRef)(0);
  const retryTimerRef = (0, import_react11.useRef)(null);
  const lastSignatureRef = (0, import_react11.useRef)("");
  const clearRetryTimer = (0, import_react11.useCallback)(() => {
    if (retryTimerRef.current) {
      clearTimeout(retryTimerRef.current);
      retryTimerRef.current = null;
    }
  }, []);
  const abortActiveRequest = (0, import_react11.useCallback)(() => {
    if (!activeAbortRef.current) return;
    try {
      activeAbortRef.current.abort();
    } catch {
    }
    activeAbortRef.current = null;
  }, []);
  const resetActivities = (0, import_react11.useCallback)(() => {
    clearRetryTimer();
    abortActiveRequest();
    setItems([]);
    setTotal(0);
    setErrorMessage("");
    setIsLoading(false);
  }, [abortActiveRequest, clearRetryTimer]);
  const loadActivities = (0, import_react11.useCallback)(
    async (page, override) => {
      const fromDateStr = override?.fromDate ?? fromDateValue;
      const toDateStr = override?.toDate ?? toDateValue;
      const accountNumStr = override?.accountNum ?? accountNumValue;
      const ownerAxUserIdStr = override?.ownerAxUserId ?? ownerAxUserIdValue;
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
      const normalizedOwnerAxUserId = ownerAxUserIdStr.trim();
      const filterSignature = `${normalized.from}|${normalized.to}|${accountNumStr}|${normalizedOwnerAxUserId}|${page}`;
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
      if (normalizedOwnerAxUserId) {
        payload.ownerAxUserId = normalizedOwnerAxUserId;
      }
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
              accountNum: accountNumStr,
              ownerAxUserId: normalizedOwnerAxUserId
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
      ownerAxUserIdValue,
      pageSize,
      retryDelayMs,
      toDateValue
    ]
  );
  (0, import_react11.useEffect)(() => {
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
var import_react12 = __toESM(require_react());
var HISTORY_CACHE_TTL_MS = 12 * 60 * 60 * 1e3;
var normalizeCachedFilter = (value) => {
  if (!value || typeof value !== "object") return null;
  return {
    fromDate: value.fromDate || "",
    toDate: value.toDate || "",
    page: value.page,
    clientAccount: value.clientAccount || "",
    clientText: value.clientText || "",
    ownerAxUserId: value.ownerAxUserId || "",
    ownerText: value.ownerText || ""
  };
};
var useHistoryFilterCache = () => {
  const readCachedFilter = (0, import_react12.useCallback)(() => {
    const parsed = getSessionJsonWithExpiry(HISTORY_FILTER_KEY);
    return normalizeCachedFilter(parsed);
  }, []);
  const clearFilterCache = (0, import_react12.useCallback)(() => {
    removeSessionValueWithExpiry(HISTORY_FILTER_KEY);
    removeSessionValueWithExpiry(HISTORY_RETURN_FLAG_KEY);
  }, []);
  const consumeReturnFlag = (0, import_react12.useCallback)(() => {
    const raw = getSessionValueWithExpiry(HISTORY_RETURN_FLAG_KEY);
    if (raw === "1") {
      removeSessionValueWithExpiry(HISTORY_RETURN_FLAG_KEY);
      return true;
    }
    return false;
  }, []);
  const saveCachedFilter = (0, import_react12.useCallback)((filter) => {
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
var import_react13 = __toESM(require_react());
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
  const resolveQuickFilterFromRange = (0, import_react13.useCallback)(
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
  const [startDate, setStartDate] = (0, import_react13.useState)(null);
  const [endDate, setEndDate] = (0, import_react13.useState)(null);
  const [manualStartDate, setManualStartDate] = (0, import_react13.useState)(null);
  const [manualEndDate, setManualEndDate] = (0, import_react13.useState)(null);
  const [hoverDate, setHoverDate] = (0, import_react13.useState)(null);
  const [selectingStep, setSelectingStep] = (0, import_react13.useState)("start");
  const [currentMonth, setCurrentMonth] = (0, import_react13.useState)((/* @__PURE__ */ new Date()).getMonth());
  const [currentYear, setCurrentYear] = (0, import_react13.useState)((/* @__PURE__ */ new Date()).getFullYear());
  const [isOpen, setIsOpen] = (0, import_react13.useState)(false);
  const [showManualPickerPanel, setShowManualPickerPanel] = (0, import_react13.useState)(false);
  const [activeQuickFilter, setActiveQuickFilter] = (0, import_react13.useState)(null);
  const [selectedClient, setSelectedClient] = (0, import_react13.useState)(null);
  const [selectedOwnerAxUserId, setSelectedOwnerAxUserId] = (0, import_react13.useState)("");
  const [clientResetKey, setClientResetKey] = (0, import_react13.useState)(0);
  const [showFilters, setShowFilters] = (0, import_react13.useState)(true);
  const [showManualError, setShowManualError] = (0, import_react13.useState)(false);
  const hasRestoredFilterRef = (0, import_react13.useRef)(false);
  const didInitFilterRef = (0, import_react13.useRef)(false);
  const fromDateValue = (0, import_react13.useMemo)(() => startDate ? toISO2(startDate) : "", [startDate, toISO2]);
  const toDateValue = (0, import_react13.useMemo)(() => endDate ? toISO2(endDate) : "", [endDate, toISO2]);
  const accountNumValue = (0, import_react13.useMemo)(() => selectedClient ? selectedClient.value : "", [selectedClient]);
  const validateManualRange = (0, import_react13.useCallback)(() => {
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
  const applyDefaultRangeFromProps = (0, import_react13.useCallback)(() => {
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
    setSelectedOwnerAxUserId("");
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
  const resetHistoryFilters = (0, import_react13.useCallback)(() => {
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
    setSelectedOwnerAxUserId("");
    setClientResetKey((prev) => prev + 1);
    setShowManualError(false);
  }, []);
  const applyCachedFilter = (0, import_react13.useCallback)(
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
      setSelectedOwnerAxUserId(filter.ownerAxUserId || "");
      const pageVal = Number(filter.page);
      const pageToLoad = Number.isFinite(pageVal) && pageVal > 0 ? pageVal : 1;
      return {
        page: pageToLoad,
        override: {
          fromDate: filter.fromDate,
          toDate: filter.toDate,
          accountNum: filter.clientAccount || "",
          ownerAxUserId: filter.ownerAxUserId || ""
        }
      };
    },
    [parseISO2, resolveQuickFilterFromRange]
  );
  const handleSelect = (0, import_react13.useCallback)(
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
  const handleClearState = (0, import_react13.useCallback)(
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
  const openPopover = (0, import_react13.useCallback)(
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
  const handleActivatorKeyDown = (0, import_react13.useCallback)(
    (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      openPopover("start");
    },
    [openPopover]
  );
  const handleSectionKeyDown = (0, import_react13.useCallback)(
    (event, section) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      event.stopPropagation();
      openPopover(section);
    },
    [openPopover]
  );
  const applyQuickRange = (0, import_react13.useCallback)(
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
  const handleQuickFilter = (0, import_react13.useCallback)(
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
  const handleClientSelected = (0, import_react13.useCallback)((client) => {
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
    selectedOwnerAxUserId,
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
    setSelectedOwnerAxUserId,
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
var import_jsx_runtime5 = __toESM(require_jsx_runtime());
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
var HistoryPage = ({
  defaultFromDate = "",
  defaultToDate = "",
  companyId = "",
  axUserId = "",
  permissionsRevision = ""
}) => {
  const locale = (0, import_react14.useMemo)(() => getUiLocale(), []);
  const canViewHistory = canAccess("VISITAS_GESTION", "View");
  const canCreateVisit = canAccess("VISITAS_GESTION", "Add");
  const noDataText = indT("Common_NoData", "No data");
  const activatorRef = (0, import_react14.useRef)(null);
  const popoverRef = (0, import_react14.useRef)(null);
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
    selectedOwnerAxUserId,
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
    setSelectedOwnerAxUserId,
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
  const { visibleVisitUsers, visibleUsersLoading, visibleUsersError, selectedOwnerText, effectiveSelectedOwnerAxUserId } = useHistoryVisibleOwner({
    enabled: canViewHistory,
    companyId,
    axUserId,
    permissionsRevision,
    selectedOwnerAxUserId,
    onDebug: logHistory
  });
  const { items, total, currentPage, isLoading, errorMessage, loadActivities, resetActivities, retryOnNetworkErrorRef, lastSignatureRef } = useHistoryActivities({
    fromDateValue,
    toDateValue,
    accountNumValue,
    ownerAxUserIdValue: effectiveSelectedOwnerAxUserId,
    pageSize: PAGE_SIZE,
    normalizeRange,
    onForbidden: showPermissionModal,
    onDebug: logHistory
  });
  const { applyFilters, handleClear, handleResetFilters } = useHistoryFilterActions({
    startDate,
    endDate,
    fromDateValue,
    toDateValue,
    accountNumValue,
    ownerAxUserIdValue: effectiveSelectedOwnerAxUserId,
    lastSignatureRef,
    validateManualRange,
    normalizeRange,
    loadActivities,
    handleClearState,
    clearFilterCache,
    resetActivities,
    resetHistoryFilters,
    setIsOpen,
    setShowFilters,
    setShowManualError
  });
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
  useHistoryInitialLoad({
    defaultFromDate,
    defaultToDate,
    didInitFilterRef,
    hasRestoredFilterRef,
    retryOnNetworkErrorRef,
    consumeReturnFlag,
    readCachedFilter,
    applyCachedFilter,
    applyDefaultRangeFromProps,
    loadActivities,
    resetActivities,
    resetHistoryFilters,
    clearFilterCache,
    setShowFilters,
    setIsOpen,
    logHistory
  });
  useHistoryPickerStepSync({ startDate, endDate, selectingStep, setSelectingStep });
  const handleNavigate = useHistoryNavigation({
    canViewHistory,
    currentPage,
    fromDateValue,
    toDateValue,
    selectedClient,
    ownerAxUserId: effectiveSelectedOwnerAxUserId,
    ownerText: selectedOwnerText,
    navDelayMs: NAV_DELAY_MS,
    saveCachedFilter,
    onForbidden: showPermissionModal
  });
  const {
    calendarLabel,
    manualDayCells,
    handlePrevMonth,
    handleNextMonth,
    handleGridMouseLeave,
    handleManualDayClick,
    handleManualDayHover
  } = useHistoryCalendarPicker({
    currentMonth,
    currentYear,
    locale,
    startDate,
    endDate,
    hoverDate,
    selectingStep,
    setCurrentMonth,
    setCurrentYear,
    setHoverDate,
    handleSelect,
    logHistory,
    toISO,
    isBefore,
    formatMonthLabel
  });
  const { timelineItems } = useHistoryTimelineItems({
    items,
    locale,
    noDataText,
    logHistory,
    toTitleCase,
    formatDateParts
  });
  const {
    labelFrom,
    labelTo,
    summaryFrom,
    summaryTo,
    filterTitle,
    addDateLabel,
    clearRangeLabel,
    prevMonthLabel,
    nextMonthLabel,
    statusSelectStartLabel,
    statusSelectEndLabel,
    weekDayLabels,
    clearLabel,
    applyLabel,
    clientLabel,
    ownerLabel,
    ownerAllLabel,
    ownerNoUsersLabel,
    ownerLoadingLabel,
    loadingLabel,
    noVisitsInRangeLabel,
    createLabel,
    quickFilters,
    paginationLabels
  } = useHistoryLabels(locale);
  const showFilterActions = showFilters;
  const showSummary = !showFilters && !!startDate && !!endDate;
  const showResults = !showFilters;
  const showManualPicker = activeQuickFilter === "custom" && showManualPickerPanel;
  const showInlineSummary = !!startDate && !!endDate && !showManualPicker;
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "max-w-3xl mx-auto px-1 sm:px-2 pt-3 pb-4 space-y-2", children: [
    showSummary && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "filter-card filter-card--summary p-3 sm:p-4 mt-1 mb-3", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
      HistorySummary_default,
      {
        summaryFromLabel: summaryFrom,
        summaryToLabel: summaryTo,
        fromValue: startDate ? formatDisplay(startDate, locale) : "--",
        toValue: endDate ? formatDisplay(endDate, locale) : "--",
        clientLabel,
        clientValue: selectedClient?.text || "",
        showClient: !!selectedClient,
        ownerLabel,
        ownerValue: selectedOwnerText,
        showOwner: !!selectedOwnerText
      }
    ) }),
    showFilters && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
      HistoryFilterPanel_default,
      {
        activatorRef,
        popoverRef,
        quickFilters,
        activeQuickFilter,
        showInlineSummary,
        showManualPicker,
        summaryFromLabel: summaryFrom,
        summaryToLabel: summaryTo,
        fromValue: startDate ? formatDisplay(startDate, locale) : "--",
        toValue: endDate ? formatDisplay(endDate, locale) : "--",
        ownerLabel,
        ownerValue: selectedOwnerText,
        filterTitle,
        showManualError,
        showStartError: showManualError && !startDate,
        showEndError: showManualError && !endDate,
        isOpen,
        selectingStep,
        labelFrom,
        labelTo,
        startDateText: startDate ? formatDisplay(startDate, locale) : addDateLabel,
        endDateText: endDate ? formatDisplay(endDate, locale) : addDateLabel,
        clearRangeLabel,
        hasSelectedRange: !!startDate || !!endDate,
        monthLabel: calendarLabel,
        weekDayLabels,
        statusText: selectingStep === "start" ? statusSelectStartLabel : statusSelectEndLabel,
        dayCells: manualDayCells,
        prevMonthLabel,
        nextMonthLabel,
        clientResetKey,
        selectedClient,
        clientLabel,
        visibleVisitUsers,
        selectedOwnerAxUserId,
        visibleUsersLoading,
        visibleUsersError,
        ownerAllLabel,
        ownerNoUsersLabel,
        ownerLoadingLabel,
        showFilterActions,
        clearLabel,
        applyLabel,
        onQuickFilter: handleQuickFilter,
        onOpenPopover: openPopover,
        onActivatorKeyDown: handleActivatorKeyDown,
        onSectionKeyDown: handleSectionKeyDown,
        onClearDate: handleClear,
        onPrevMonth: handlePrevMonth,
        onNextMonth: handleNextMonth,
        onGridMouseLeave: handleGridMouseLeave,
        onDayClick: handleManualDayClick,
        onDayHover: handleManualDayHover,
        onClientSelected: handleClientSelected,
        onOwnerChange: setSelectedOwnerAxUserId,
        onResetFilters: handleResetFilters,
        onApplyFilters: () => {
          applyFilters({ closePanel: true, page: 1 });
        }
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("input", { type: "hidden", id: "fromDate", value: fromDateValue, readOnly: true }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("input", { type: "hidden", id: "toDate", value: toDateValue, readOnly: true }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
      HistoryResultsSection_default,
      {
        showResults,
        isLoading,
        loadingLabel,
        timelineItems,
        noDataText: noVisitsInRangeLabel,
        errorMessage,
        totalPages,
        currentPage,
        pageWindow: PAGE_WINDOW,
        paginationLabels,
        onNavigate: handleNavigate,
        onPageChange: loadActivities
      }
    ),
    canCreateVisit && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
      FloatingActionButton_default,
      {
        route: "/Visitas/Create?fresh=1",
        ariaLabel: createLabel,
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
  const companyId = root.getAttribute("data-company-id") || "";
  const axUserId = root.getAttribute("data-ax-user-id") || "";
  const permissionsRevision = root.getAttribute("data-permissions-revision") || "";
  mountReactIsland(
    root,
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
      HistoryPage,
      {
        defaultFromDate,
        defaultToDate,
        companyId,
        axUserId,
        permissionsRevision
      }
    )
  );
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvaGlzdG9yaWFsL0hpc3RvcnlQYWdlLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9oaXN0b3JpYWwvVmlzaWJsZVZpc2l0T3duZXJTZWxlY3QudHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy92aXNpdGFzL2hpc3RvcmlhbC9IaXN0b3J5RmlsdGVyUGFuZWwudHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy92aXNpdGFzL2hpc3RvcmlhbC9IaXN0b3J5VGFibGUudHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy92aXNpdGFzL2hpc3RvcmlhbC9IaXN0b3J5UmVzdWx0c1NlY3Rpb24udHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy92aXNpdGFzL2hpc3RvcmlhbC91c2VIaXN0b3J5Q2FsZW5kYXJQaWNrZXIudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvaGlzdG9yaWFsL3VzZUhpc3RvcnlGaWx0ZXJBY3Rpb25zLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy92aXNpdGFzL2hpc3RvcmlhbC91c2VIaXN0b3J5SW5pdGlhbExvYWQudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvaGlzdG9yaWFsL3VzZUhpc3RvcnlMYWJlbHMudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvaGlzdG9yaWFsL3VzZUhpc3RvcnlOYXZpZ2F0aW9uLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy92aXNpdGFzL2hpc3RvcmlhbC91c2VIaXN0b3J5UGFnZUxpc3RlbmVycy50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9oaXN0b3JpYWwvdXNlSGlzdG9yeVBpY2tlclN0ZXBTeW5jLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy92aXNpdGFzL2hpc3RvcmlhbC91c2VIaXN0b3J5VGltZWxpbmVJdGVtcy50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9oaXN0b3JpYWwvdXNlSGlzdG9yeVZpc2libGVPd25lci50cyIsICIuLi9yZWFjdC9zcmMvaG9va3MvdXNlSGlzdG9yeUFjdGl2aXRpZXMudHMiLCAiLi4vcmVhY3Qvc3JjL2hvb2tzL3VzZUhpc3RvcnlGaWx0ZXJDYWNoZS50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9oaXN0b3JpYWwvdXNlSGlzdG9yeUZpbHRlcnNTdGF0ZS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IFJlYWN0LCB7IHVzZU1lbW8sIHVzZVJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgeyBjYW5BY2Nlc3MsIHNob3dQZXJtaXNzaW9uTW9kYWwgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvcGVybWlzc2lvbnMudHNcIjtcbmltcG9ydCBIaXN0b3J5U3VtbWFyeSBmcm9tIFwiLi9IaXN0b3J5U3VtbWFyeS50c3hcIjtcbmltcG9ydCBIaXN0b3J5RmlsdGVyUGFuZWwgZnJvbSBcIi4vSGlzdG9yeUZpbHRlclBhbmVsLnRzeFwiO1xuaW1wb3J0IEhpc3RvcnlSZXN1bHRzU2VjdGlvbiBmcm9tIFwiLi9IaXN0b3J5UmVzdWx0c1NlY3Rpb24udHN4XCI7XG5pbXBvcnQgeyB1c2VIaXN0b3J5Q2FsZW5kYXJQaWNrZXIgfSBmcm9tIFwiLi91c2VIaXN0b3J5Q2FsZW5kYXJQaWNrZXIudHNcIjtcbmltcG9ydCB7IHVzZUhpc3RvcnlGaWx0ZXJBY3Rpb25zIH0gZnJvbSBcIi4vdXNlSGlzdG9yeUZpbHRlckFjdGlvbnMudHNcIjtcbmltcG9ydCB7IHVzZUhpc3RvcnlJbml0aWFsTG9hZCB9IGZyb20gXCIuL3VzZUhpc3RvcnlJbml0aWFsTG9hZC50c1wiO1xuaW1wb3J0IHsgdXNlSGlzdG9yeUxhYmVscyB9IGZyb20gXCIuL3VzZUhpc3RvcnlMYWJlbHMudHNcIjtcbmltcG9ydCB7IHVzZUhpc3RvcnlOYXZpZ2F0aW9uIH0gZnJvbSBcIi4vdXNlSGlzdG9yeU5hdmlnYXRpb24udHNcIjtcbmltcG9ydCB7IHVzZUhpc3RvcnlQYWdlTGlzdGVuZXJzIH0gZnJvbSBcIi4vdXNlSGlzdG9yeVBhZ2VMaXN0ZW5lcnMudHNcIjtcbmltcG9ydCB7IHVzZUhpc3RvcnlQaWNrZXJTdGVwU3luYyB9IGZyb20gXCIuL3VzZUhpc3RvcnlQaWNrZXJTdGVwU3luYy50c1wiO1xuaW1wb3J0IHsgdXNlSGlzdG9yeVRpbWVsaW5lSXRlbXMgfSBmcm9tIFwiLi91c2VIaXN0b3J5VGltZWxpbmVJdGVtcy50c1wiO1xuaW1wb3J0IHsgdXNlSGlzdG9yeVZpc2libGVPd25lciB9IGZyb20gXCIuL3VzZUhpc3RvcnlWaXNpYmxlT3duZXIudHNcIjtcbmltcG9ydCBGbG9hdGluZ0FjdGlvbkJ1dHRvbiBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0Zsb2F0aW5nQWN0aW9uQnV0dG9uLnRzeFwiO1xuaW1wb3J0IHsgdXNlSGlzdG9yeUFjdGl2aXRpZXMgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlSGlzdG9yeUFjdGl2aXRpZXMudHNcIjtcbmltcG9ydCB7IHVzZUhpc3RvcnlGaWx0ZXJDYWNoZSB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VIaXN0b3J5RmlsdGVyQ2FjaGUudHNcIjtcbmltcG9ydCB7IHVzZUhpc3RvcnlGaWx0ZXJzU3RhdGUgfSBmcm9tIFwiLi91c2VIaXN0b3J5RmlsdGVyc1N0YXRlLnRzXCI7XG5pbXBvcnQgeyBtb3VudFJlYWN0SXNsYW5kLCBtb3VudFdoZW5Eb2N1bWVudFJlYWR5IH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3JlYWN0SXNsYW5kLnRzeFwiO1xuXG50eXBlIFByb3BzID0ge1xuICBkZWZhdWx0RnJvbURhdGU/OiBzdHJpbmc7XG4gIGRlZmF1bHRUb0RhdGU/OiBzdHJpbmc7XG4gIGNvbXBhbnlJZD86IHN0cmluZztcbiAgYXhVc2VySWQ/OiBzdHJpbmc7XG4gIHBlcm1pc3Npb25zUmV2aXNpb24/OiBzdHJpbmc7XG59O1xuXHJcbmNvbnN0IFBBR0VfU0laRSA9IDY7XG5jb25zdCBQQUdFX1dJTkRPVyA9IDY7XHJcbmNvbnN0IE5BVl9ERUxBWV9NUyA9IDMyMDtcclxuY29uc3QgRkFCX0JBU0VfQk9UVE9NID0gMzI7XHJcblxyXG5jb25zdCBub3JtYWxpemVVaUxvY2FsZSA9IChsb2NhbGU6IHN0cmluZykgPT4ge1xyXG4gIGNvbnN0IHZhbHVlID0gU3RyaW5nKGxvY2FsZSB8fCBcIlwiKS50cmltKCk7XHJcbiAgaWYgKCF2YWx1ZSkgcmV0dXJuIFwiZXMtRVNcIjtcclxuICBpZiAoL156aC1oYW5zL2kudGVzdCh2YWx1ZSkpIHJldHVybiBcInpoLUNOXCI7XHJcbiAgcmV0dXJuIHZhbHVlO1xyXG59O1xyXG5cclxuY29uc3QgaXNCYXNxdWVMb2NhbGUgPSAobG9jYWxlOiBzdHJpbmcpID0+IC9eZXVcXGIvaS50ZXN0KFN0cmluZyhsb2NhbGUgfHwgXCJcIikpO1xyXG5cclxuY29uc3QgQkFTUVVFX01PTlRIUyA9IFtcclxuICBcInVydGFycmlsYVwiLFxyXG4gIFwib3RzYWlsYVwiLFxyXG4gIFwibWFydHhvYVwiLFxyXG4gIFwiYXBpcmlsYVwiLFxyXG4gIFwibWFpYXR6YVwiLFxyXG4gIFwiZWthaW5hXCIsXHJcbiAgXCJ1enRhaWxhXCIsXHJcbiAgXCJhYnV6dHVhXCIsXHJcbiAgXCJpcmFpbGFcIixcclxuICBcInVycmlhXCIsXHJcbiAgXCJhemFyb2FcIixcclxuICBcImFiZW5kdWFcIixcclxuXTtcclxuXHJcbmNvbnN0IEJBU1FVRV9NT05USFNfU0hPUlQgPSBbXG4gIFwidXJ0XCIsXHJcbiAgXCJvdHNcIixcclxuICBcIm1hclwiLFxyXG4gIFwiYXBpXCIsXHJcbiAgXCJtYWlcIixcclxuICBcImVrYVwiLFxyXG4gIFwidXp0XCIsXHJcbiAgXCJhYnVcIixcclxuICBcImlyYVwiLFxyXG4gIFwidXJyXCIsXHJcbiAgXCJhemFcIixcclxuICBcImFiZVwiLFxuXTtcblxuY29uc3QgWkhfTU9OVEhfWUVBUl9GT1JNQVRURVIgPSBuZXcgSW50bC5EYXRlVGltZUZvcm1hdChcInpoLUNOXCIsIHsgeWVhcjogXCJudW1lcmljXCIsIG1vbnRoOiBcImxvbmdcIiB9KTtcblxuY29uc3QgZ2V0VWlMb2NhbGUgPSAoKSA9PiB7XHJcbiAgY29uc3QgZnJvbUh0bWwgPSB0eXBlb2YgZG9jdW1lbnQgIT09IFwidW5kZWZpbmVkXCIgPyBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQubGFuZyA6IFwiXCI7XHJcbiAgaWYgKGZyb21IdG1sICYmIFN0cmluZyhmcm9tSHRtbCkudHJpbSgpKSByZXR1cm4gbm9ybWFsaXplVWlMb2NhbGUoZnJvbUh0bWwpO1xyXG4gIHJldHVybiBcImVzLUVTXCI7XHJcbn07XHJcblxyXG5jb25zdCBwYWQgPSAobjogbnVtYmVyKSA9PiBuLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgXCIwXCIpO1xyXG5cclxuY29uc3QgdG9JU08gPSAoZDogRGF0ZSkgPT4gYCR7ZC5nZXRGdWxsWWVhcigpfS0ke3BhZChkLmdldE1vbnRoKCkgKyAxKX0tJHtwYWQoZC5nZXREYXRlKCkpfWA7XHJcblxyXG5jb25zdCBzdGFydE9mRGF5ID0gKGQ6IERhdGUpID0+IG5ldyBEYXRlKGQuZ2V0RnVsbFllYXIoKSwgZC5nZXRNb250aCgpLCBkLmdldERhdGUoKSk7XHJcblxyXG5jb25zdCBwYXJzZUlTTyA9IChzOiBzdHJpbmcpID0+IHtcclxuICBpZiAoIXMpIHJldHVybiBudWxsO1xyXG4gIGNvbnN0IHBhcnRzID0gcy5zcGxpdChcIi1cIikubWFwKE51bWJlcik7XHJcbiAgaWYgKHBhcnRzLmxlbmd0aCAhPT0gMykgcmV0dXJuIG51bGw7XHJcbiAgcmV0dXJuIG5ldyBEYXRlKHBhcnRzWzBdLCBwYXJ0c1sxXSAtIDEsIHBhcnRzWzJdKTtcclxufTtcclxuXHJcbmNvbnN0IGlzQmVmb3JlID0gKGE6IERhdGUgfCBudWxsLCBiOiBEYXRlIHwgbnVsbCkgPT4gISEoYSAmJiBiICYmIGEuZ2V0VGltZSgpIDwgYi5nZXRUaW1lKCkpO1xuXG5jb25zdCBub3JtYWxpemVSYW5nZSA9IChmcm9tOiBzdHJpbmcsIHRvOiBzdHJpbmcpID0+IHtcbiAgaWYgKCFmcm9tIHx8ICF0bykgcmV0dXJuIHsgZnJvbSwgdG8gfTtcbiAgY29uc3QgZnJvbURhdGUgPSBwYXJzZUlTTyhmcm9tKTtcbiAgY29uc3QgdG9EYXRlID0gcGFyc2VJU08odG8pO1xuICBpZiAoIWZyb21EYXRlIHx8ICF0b0RhdGUpIHJldHVybiB7IGZyb20sIHRvIH07XG4gIGlmIChpc0JlZm9yZSh0b0RhdGUsIGZyb21EYXRlKSkge1xuICAgIHJldHVybiB7IGZyb206IHRvSVNPKHRvRGF0ZSksIHRvOiB0b0lTTyhmcm9tRGF0ZSkgfTtcbiAgfVxuICByZXR1cm4geyBmcm9tOiB0b0lTTyhmcm9tRGF0ZSksIHRvOiB0b0lTTyh0b0RhdGUpIH07XG59O1xuXG5jb25zdCBmb3JtYXREaXNwbGF5ID0gKGQ6IERhdGUsIGxvY2FsZTogc3RyaW5nKSA9PiB7XG4gIGlmIChpc0Jhc3F1ZUxvY2FsZShsb2NhbGUpKSB7XG4gICAgY29uc3QgbW9udGggPSBCQVNRVUVfTU9OVEhTX1NIT1JUW2QuZ2V0TW9udGgoKV07XG4gICAgcmV0dXJuIGAke2QuZ2V0RGF0ZSgpfSAke21vbnRofSAke2QuZ2V0RnVsbFllYXIoKX1gLnRvTG93ZXJDYXNlKCk7XG4gIH1cclxuICByZXR1cm4gZFxyXG4gICAgLnRvTG9jYWxlRGF0ZVN0cmluZyhsb2NhbGUsIHtcclxuICAgICAgZGF5OiBcIm51bWVyaWNcIixcclxuICAgICAgbW9udGg6IFwic2hvcnRcIixcclxuICAgICAgeWVhcjogXCJudW1lcmljXCIsXHJcbiAgICB9KVxyXG4gICAgLnJlcGxhY2UoL1xcLi9nLCBcIlwiKVxyXG4gICAgLnRvTG93ZXJDYXNlKCk7XHJcbn07XHJcblxyXG5jb25zdCBmb3JtYXRNb250aExhYmVsID0gKGQ6IERhdGUsIGxvY2FsZTogc3RyaW5nKSA9PiB7XG4gIGlmICgvXnpoL2kudGVzdChsb2NhbGUpKSB7XG4gICAgcmV0dXJuIFpIX01PTlRIX1lFQVJfRk9STUFUVEVSLmZvcm1hdChkKTtcbiAgfVxuICBpZiAoaXNCYXNxdWVMb2NhbGUobG9jYWxlKSkge1xyXG4gICAgcmV0dXJuIGAke0JBU1FVRV9NT05USFNbZC5nZXRNb250aCgpXX0gJHtkLmdldEZ1bGxZZWFyKCl9YDtcclxuICB9XHJcbiAgY29uc3QgbW9udGhOYW1lID0gZC50b0xvY2FsZURhdGVTdHJpbmcobG9jYWxlLCB7IG1vbnRoOiBcImxvbmdcIiB9KTtcclxuICBjb25zdCBjYXBNb250aE5hbWUgPSBtb250aE5hbWUgJiYgL1tBLVphLXpdLy50ZXN0KG1vbnRoTmFtZVswXSlcclxuICAgID8gbW9udGhOYW1lWzBdLnRvTG9jYWxlVXBwZXJDYXNlKGxvY2FsZSkgKyBtb250aE5hbWUuc2xpY2UoMSlcclxuICAgIDogbW9udGhOYW1lO1xyXG4gIHJldHVybiBgJHtjYXBNb250aE5hbWV9ICR7ZC5nZXRGdWxsWWVhcigpfWA7XHJcbn07XHJcblxyXG5jb25zdCBwYXJzZURhdGVWYWx1ZSA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XHJcbiAgaWYgKCF2YWx1ZSkgcmV0dXJuIG51bGw7XHJcbiAgY29uc3QgcmF3ID0gU3RyaW5nKHZhbHVlKS50cmltKCk7XHJcbiAgaWYgKCFyYXcpIHJldHVybiBudWxsO1xyXG5cclxuICBjb25zdCBkYXRlUGFydCA9IHJhdy5zcGxpdChcIlRcIilbMF0uc3BsaXQoXCIgXCIpWzBdO1xyXG5cclxuICBpZiAoL15cXGR7NH0tXFxkezJ9LVxcZHsyfSQvLnRlc3QoZGF0ZVBhcnQpKSB7XHJcbiAgICBjb25zdCBbeSwgbSwgZF0gPSBkYXRlUGFydC5zcGxpdChcIi1cIikubWFwKE51bWJlcik7XHJcbiAgICByZXR1cm4gbmV3IERhdGUoeSwgbSAtIDEsIGQpO1xyXG4gIH1cclxuXHJcbiAgaWYgKC9eXFxkezJ9Wy4vLV1cXGR7Mn1bLi8tXVxcZHs0fSQvLnRlc3QoZGF0ZVBhcnQpKSB7XHJcbiAgICBjb25zdCBwYXJ0cyA9IGRhdGVQYXJ0LnNwbGl0KC9bLi8tXS8pLm1hcChOdW1iZXIpO1xyXG4gICAgY29uc3QgW2QsIG0sIHldID0gcGFydHM7XHJcbiAgICByZXR1cm4gbmV3IERhdGUoeSwgbSAtIDEsIGQpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgcGFyc2VkID0gbmV3IERhdGUocmF3KTtcclxuICByZXR1cm4gTnVtYmVyLmlzTmFOKHBhcnNlZC5nZXRUaW1lKCkpID8gbnVsbCA6IHBhcnNlZDtcclxufTtcclxuXHJcbmNvbnN0IGZvcm1hdERhdGVQYXJ0cyA9ICh2YWx1ZTogc3RyaW5nLCBsb2NhbGU6IHN0cmluZykgPT4ge1xyXG4gIGlmICghdmFsdWUpIHJldHVybiB7IHllYXI6IFwiXCIsIG1vbnRoOiBcIlwiLCBkYXk6IFwiXCIgfTtcclxuICBjb25zdCBkID0gcGFyc2VEYXRlVmFsdWUodmFsdWUpO1xyXG4gIGlmICghZCkgcmV0dXJuIHsgeWVhcjogXCJcIiwgbW9udGg6IFwiXCIsIGRheTogXCJcIiB9O1xyXG4gIGxldCBtb250aCA9IFwiXCI7XHJcbiAgaWYgKGlzQmFzcXVlTG9jYWxlKGxvY2FsZSkpIHtcclxuICAgIG1vbnRoID0gQkFTUVVFX01PTlRIU19TSE9SVFtkLmdldE1vbnRoKCldIHx8IFwiXCI7XHJcbiAgfSBlbHNlIHtcclxuICAgIG1vbnRoID0gZC50b0xvY2FsZURhdGVTdHJpbmcobG9jYWxlLCB7IG1vbnRoOiBcInNob3J0XCIgfSkucmVwbGFjZSgvXFwuL2csIFwiXCIpO1xyXG4gIH1cclxuICByZXR1cm4ge1xyXG4gICAgeWVhcjogU3RyaW5nKGQuZ2V0RnVsbFllYXIoKSksXHJcbiAgICBtb250aDogbW9udGgudG9VcHBlckNhc2UoKSxcclxuICAgIGRheTogU3RyaW5nKGQuZ2V0RGF0ZSgpKS5wYWRTdGFydCgyLCBcIjBcIiksXHJcbiAgfTtcclxufTtcclxuXHJcbmNvbnN0IHRvVGl0bGVDYXNlID0gKHZhbHVlOiBzdHJpbmcsIGxvY2FsZTogc3RyaW5nKSA9PiB7XHJcbiAgaWYgKCF2YWx1ZSkgcmV0dXJuIFwiXCI7XHJcbiAgY29uc3QgbG93ZXIgPSB2YWx1ZS50b0xvY2FsZUxvd2VyQ2FzZShsb2NhbGUpO1xyXG4gIHRyeSB7XHJcbiAgICByZXR1cm4gbG93ZXIucmVwbGFjZSgvKF58W15cXHB7TH1dKShcXHB7TH0pL2d1LCAoX21hdGNoLCBwcmVmaXgsIGNoKSA9PiBgJHtwcmVmaXh9JHtjaC50b0xvY2FsZVVwcGVyQ2FzZShsb2NhbGUpfWApO1xyXG4gIH0gY2F0Y2gge1xyXG4gICAgcmV0dXJuIGxvd2VyLnJlcGxhY2UoLyhefFtcXHMtL10pKFxcUykvZywgKF9tYXRjaCwgcHJlZml4LCBjaCkgPT4gYCR7cHJlZml4fSR7Y2gudG9Mb2NhbGVVcHBlckNhc2UobG9jYWxlKX1gKTtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBsb2dIaXN0b3J5ID0gKG1lc3NhZ2U6IHN0cmluZywgZGF0YT86IFJlY29yZDxzdHJpbmcsIHVua25vd24+KSA9PiB7XG4gIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm47XHJcbiAgY29uc3QgZGVidWdGbGFnID0gKHdpbmRvdyBhcyBhbnkpLl9fSU5EX0RFQlVHX0hJU1RPUllfXztcclxuICBpZiAoZGVidWdGbGFnICE9PSB0cnVlKSByZXR1cm47XHJcbiAgaWYgKGRhdGEpIHtcclxuICAgIGNvbnNvbGUuZGVidWcoXCJbSGlzdG9yeV1cIiwgbWVzc2FnZSwgZGF0YSk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGNvbnNvbGUuZGVidWcoXCJbSGlzdG9yeV1cIiwgbWVzc2FnZSk7XHJcbiAgfVxyXG59O1xyXG5cclxuLy8gSGlzdG9yeSBwYWdlIHdpdGggUmVhY3Qgc3RhdGUgKyBlZmZlY3RzIChubyBsZWdhY3kgRE9NIGxvZ2ljKS5cclxuZXhwb3J0IGNvbnN0IEhpc3RvcnlQYWdlID0gKHtcbiAgZGVmYXVsdEZyb21EYXRlID0gXCJcIixcbiAgZGVmYXVsdFRvRGF0ZSA9IFwiXCIsXG4gIGNvbXBhbnlJZCA9IFwiXCIsXG4gIGF4VXNlcklkID0gXCJcIixcbiAgcGVybWlzc2lvbnNSZXZpc2lvbiA9IFwiXCIsXG59OiBQcm9wcykgPT4ge1xuICBjb25zdCBsb2NhbGUgPSB1c2VNZW1vKCgpID0+IGdldFVpTG9jYWxlKCksIFtdKTtcbiAgY29uc3QgY2FuVmlld0hpc3RvcnkgPSBjYW5BY2Nlc3MoXCJWSVNJVEFTX0dFU1RJT05cIiwgXCJWaWV3XCIpO1xuICBjb25zdCBjYW5DcmVhdGVWaXNpdCA9IGNhbkFjY2VzcyhcIlZJU0lUQVNfR0VTVElPTlwiLCBcIkFkZFwiKTtcbiAgY29uc3Qgbm9EYXRhVGV4dCA9IGluZFQoXCJDb21tb25fTm9EYXRhXCIsIFwiTm8gZGF0YVwiKTtcblxuICBjb25zdCBhY3RpdmF0b3JSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgcG9wb3ZlclJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xuXHJcbiAgY29uc3QgeyByZWFkQ2FjaGVkRmlsdGVyLCBjbGVhckZpbHRlckNhY2hlLCBjb25zdW1lUmV0dXJuRmxhZywgc2F2ZUNhY2hlZEZpbHRlciB9ID0gdXNlSGlzdG9yeUZpbHRlckNhY2hlKCk7XHJcbiAgY29uc3Qge1xuICAgIHN0YXJ0RGF0ZSwgZW5kRGF0ZSwgaG92ZXJEYXRlLCBzZWxlY3RpbmdTdGVwLCBjdXJyZW50TW9udGgsIGN1cnJlbnRZZWFyLCBpc09wZW4sIHNob3dNYW51YWxQaWNrZXJQYW5lbCxcbiAgICBhY3RpdmVRdWlja0ZpbHRlciwgc2VsZWN0ZWRDbGllbnQsIHNlbGVjdGVkT3duZXJBeFVzZXJJZCwgY2xpZW50UmVzZXRLZXksIHNob3dGaWx0ZXJzLCBzaG93TWFudWFsRXJyb3IsXG4gICAgZnJvbURhdGVWYWx1ZSwgdG9EYXRlVmFsdWUsIGFjY291bnROdW1WYWx1ZSwgaGFzUmVzdG9yZWRGaWx0ZXJSZWYsIGRpZEluaXRGaWx0ZXJSZWYsXG4gICAgc2V0SG92ZXJEYXRlLCBzZXRTZWxlY3RpbmdTdGVwLCBzZXRDdXJyZW50TW9udGgsIHNldEN1cnJlbnRZZWFyLCBzZXRJc09wZW4sIHNldFNob3dGaWx0ZXJzLCBzZXRTaG93TWFudWFsRXJyb3IsXG4gICAgc2V0U2VsZWN0ZWRPd25lckF4VXNlcklkLCB2YWxpZGF0ZU1hbnVhbFJhbmdlLCBhcHBseURlZmF1bHRSYW5nZUZyb21Qcm9wcywgcmVzZXRIaXN0b3J5RmlsdGVycywgYXBwbHlDYWNoZWRGaWx0ZXIsXG4gICAgaGFuZGxlU2VsZWN0LCBoYW5kbGVDbGVhclN0YXRlLCBvcGVuUG9wb3ZlciwgaGFuZGxlQWN0aXZhdG9yS2V5RG93biwgaGFuZGxlU2VjdGlvbktleURvd24sIGhhbmRsZVF1aWNrRmlsdGVyLFxuICAgIGhhbmRsZUNsaWVudFNlbGVjdGVkLFxuICB9ID0gdXNlSGlzdG9yeUZpbHRlcnNTdGF0ZSh7XG4gICAgZGVmYXVsdEZyb21EYXRlLFxuICAgIGRlZmF1bHRUb0RhdGUsXG4gICAgbG9nSGlzdG9yeSxcbiAgICBwYXJzZURhdGVWYWx1ZSxcbiAgICBwYXJzZUlTTyxcclxuICAgIHRvSVNPLFxyXG4gICAgc3RhcnRPZkRheSxcclxuICAgIGlzQmVmb3JlLFxuICB9KTtcblxuICBjb25zdCB7IHZpc2libGVWaXNpdFVzZXJzLCB2aXNpYmxlVXNlcnNMb2FkaW5nLCB2aXNpYmxlVXNlcnNFcnJvciwgc2VsZWN0ZWRPd25lclRleHQsIGVmZmVjdGl2ZVNlbGVjdGVkT3duZXJBeFVzZXJJZCB9ID1cbiAgICB1c2VIaXN0b3J5VmlzaWJsZU93bmVyKHtcbiAgICAgIGVuYWJsZWQ6IGNhblZpZXdIaXN0b3J5LFxuICAgICAgY29tcGFueUlkLFxuICAgICAgYXhVc2VySWQsXG4gICAgICBwZXJtaXNzaW9uc1JldmlzaW9uLFxuICAgICAgc2VsZWN0ZWRPd25lckF4VXNlcklkLFxuICAgICAgb25EZWJ1ZzogbG9nSGlzdG9yeSxcbiAgICB9KTtcblxuICBjb25zdCB7IGl0ZW1zLCB0b3RhbCwgY3VycmVudFBhZ2UsIGlzTG9hZGluZywgZXJyb3JNZXNzYWdlLCBsb2FkQWN0aXZpdGllcywgcmVzZXRBY3Rpdml0aWVzLCByZXRyeU9uTmV0d29ya0Vycm9yUmVmLCBsYXN0U2lnbmF0dXJlUmVmIH0gPVxuICAgIHVzZUhpc3RvcnlBY3Rpdml0aWVzKHtcbiAgICAgIGZyb21EYXRlVmFsdWUsXG4gICAgICB0b0RhdGVWYWx1ZSxcbiAgICAgIGFjY291bnROdW1WYWx1ZSxcbiAgICAgIG93bmVyQXhVc2VySWRWYWx1ZTogZWZmZWN0aXZlU2VsZWN0ZWRPd25lckF4VXNlcklkLFxuICAgICAgcGFnZVNpemU6IFBBR0VfU0laRSxcbiAgICAgIG5vcm1hbGl6ZVJhbmdlLFxuICAgICAgb25Gb3JiaWRkZW46IHNob3dQZXJtaXNzaW9uTW9kYWwsXG4gICAgICBvbkRlYnVnOiBsb2dIaXN0b3J5LFxuICAgIH0pO1xuXHJcbiAgY29uc3QgeyBhcHBseUZpbHRlcnMsIGhhbmRsZUNsZWFyLCBoYW5kbGVSZXNldEZpbHRlcnMgfSA9IHVzZUhpc3RvcnlGaWx0ZXJBY3Rpb25zKHtcbiAgICBzdGFydERhdGUsXG4gICAgZW5kRGF0ZSxcbiAgICBmcm9tRGF0ZVZhbHVlLFxuICAgIHRvRGF0ZVZhbHVlLFxuICAgIGFjY291bnROdW1WYWx1ZSxcbiAgICBvd25lckF4VXNlcklkVmFsdWU6IGVmZmVjdGl2ZVNlbGVjdGVkT3duZXJBeFVzZXJJZCxcbiAgICBsYXN0U2lnbmF0dXJlUmVmLFxuICAgIHZhbGlkYXRlTWFudWFsUmFuZ2UsXG4gICAgbm9ybWFsaXplUmFuZ2UsXG4gICAgbG9hZEFjdGl2aXRpZXMsXG4gICAgaGFuZGxlQ2xlYXJTdGF0ZSxcbiAgICBjbGVhckZpbHRlckNhY2hlLFxuICAgIHJlc2V0QWN0aXZpdGllcyxcbiAgICByZXNldEhpc3RvcnlGaWx0ZXJzLFxuICAgIHNldElzT3BlbixcbiAgICBzZXRTaG93RmlsdGVycyxcbiAgICBzZXRTaG93TWFudWFsRXJyb3IsXG4gIH0pO1xuXHJcbiAgY29uc3QgdG90YWxQYWdlcyA9IE1hdGguY2VpbCgodG90YWwgfHwgMCkgLyBQQUdFX1NJWkUpO1xyXG5cclxuICB1c2VIaXN0b3J5UGFnZUxpc3RlbmVycyh7XG4gICAgaXNPcGVuLFxyXG4gICAgYWN0aXZhdG9yUmVmLFxyXG4gICAgcG9wb3ZlclJlZixcclxuICAgIGhhc1Jlc3RvcmVkRmlsdGVyUmVmLFxyXG4gICAgcmV0cnlPbk5ldHdvcmtFcnJvclJlZixcclxuICAgIGN1cnJlbnRQYWdlLFxyXG4gICAgbG9nSGlzdG9yeSxcclxuICAgIGNvbnN1bWVSZXR1cm5GbGFnLFxyXG4gICAgcmVhZENhY2hlZEZpbHRlcixcclxuICAgIGFwcGx5Q2FjaGVkRmlsdGVyLFxyXG4gICAgbG9hZEFjdGl2aXRpZXMsXHJcbiAgICBzZXRJc09wZW4sXHJcbiAgICBzZXRIb3ZlckRhdGUsXHJcbiAgICBzZXRTaG93RmlsdGVycyxcclxuICAgIGFwcGx5RmlsdGVycyxcbiAgfSk7XG5cbiAgdXNlSGlzdG9yeUluaXRpYWxMb2FkKHtcbiAgICBkZWZhdWx0RnJvbURhdGUsXG4gICAgZGVmYXVsdFRvRGF0ZSxcbiAgICBkaWRJbml0RmlsdGVyUmVmLFxuICAgIGhhc1Jlc3RvcmVkRmlsdGVyUmVmLFxuICAgIHJldHJ5T25OZXR3b3JrRXJyb3JSZWYsXG4gICAgY29uc3VtZVJldHVybkZsYWcsXG4gICAgcmVhZENhY2hlZEZpbHRlcixcbiAgICBhcHBseUNhY2hlZEZpbHRlcixcbiAgICBhcHBseURlZmF1bHRSYW5nZUZyb21Qcm9wcyxcbiAgICBsb2FkQWN0aXZpdGllcyxcbiAgICByZXNldEFjdGl2aXRpZXMsXG4gICAgcmVzZXRIaXN0b3J5RmlsdGVycyxcbiAgICBjbGVhckZpbHRlckNhY2hlLFxuICAgIHNldFNob3dGaWx0ZXJzLFxuICAgIHNldElzT3BlbixcbiAgICBsb2dIaXN0b3J5LFxuICB9KTtcblxyXG4gIHVzZUhpc3RvcnlQaWNrZXJTdGVwU3luYyh7IHN0YXJ0RGF0ZSwgZW5kRGF0ZSwgc2VsZWN0aW5nU3RlcCwgc2V0U2VsZWN0aW5nU3RlcCB9KTtcblxyXG4gIGNvbnN0IGhhbmRsZU5hdmlnYXRlID0gdXNlSGlzdG9yeU5hdmlnYXRpb24oe1xuICAgIGNhblZpZXdIaXN0b3J5LFxuICAgIGN1cnJlbnRQYWdlLFxuICAgIGZyb21EYXRlVmFsdWUsXG4gICAgdG9EYXRlVmFsdWUsXG4gICAgc2VsZWN0ZWRDbGllbnQsXG4gICAgb3duZXJBeFVzZXJJZDogZWZmZWN0aXZlU2VsZWN0ZWRPd25lckF4VXNlcklkLFxuICAgIG93bmVyVGV4dDogc2VsZWN0ZWRPd25lclRleHQsXG4gICAgbmF2RGVsYXlNczogTkFWX0RFTEFZX01TLFxuICAgIHNhdmVDYWNoZWRGaWx0ZXIsXG4gICAgb25Gb3JiaWRkZW46IHNob3dQZXJtaXNzaW9uTW9kYWwsXG4gIH0pO1xuXHJcbiAgY29uc3Qge1xuICAgIGNhbGVuZGFyTGFiZWwsIG1hbnVhbERheUNlbGxzLCBoYW5kbGVQcmV2TW9udGgsIGhhbmRsZU5leHRNb250aCxcbiAgICBoYW5kbGVHcmlkTW91c2VMZWF2ZSwgaGFuZGxlTWFudWFsRGF5Q2xpY2ssIGhhbmRsZU1hbnVhbERheUhvdmVyLFxuICB9ID0gdXNlSGlzdG9yeUNhbGVuZGFyUGlja2VyKHtcbiAgICBjdXJyZW50TW9udGgsXG4gICAgY3VycmVudFllYXIsXG4gICAgbG9jYWxlLFxuICAgIHN0YXJ0RGF0ZSxcbiAgICBlbmREYXRlLFxuICAgIGhvdmVyRGF0ZSxcbiAgICBzZWxlY3RpbmdTdGVwLFxuICAgIHNldEN1cnJlbnRNb250aCxcbiAgICBzZXRDdXJyZW50WWVhcixcbiAgICBzZXRIb3ZlckRhdGUsXG4gICAgaGFuZGxlU2VsZWN0LFxuICAgIGxvZ0hpc3RvcnksXG4gICAgdG9JU08sXG4gICAgaXNCZWZvcmUsXG4gICAgZm9ybWF0TW9udGhMYWJlbCxcbiAgfSk7XG5cclxuICBjb25zdCB7IHRpbWVsaW5lSXRlbXMgfSA9IHVzZUhpc3RvcnlUaW1lbGluZUl0ZW1zKHtcclxuICAgIGl0ZW1zLFxyXG4gICAgbG9jYWxlLFxyXG4gICAgbm9EYXRhVGV4dCxcclxuICAgIGxvZ0hpc3RvcnksXHJcbiAgICB0b1RpdGxlQ2FzZSxcclxuICAgIGZvcm1hdERhdGVQYXJ0cyxcclxuICB9KTtcclxuXHJcbiAgY29uc3Qge1xuICAgIGxhYmVsRnJvbSwgbGFiZWxUbywgc3VtbWFyeUZyb20sIHN1bW1hcnlUbywgZmlsdGVyVGl0bGUsIGFkZERhdGVMYWJlbCwgY2xlYXJSYW5nZUxhYmVsLFxuICAgIHByZXZNb250aExhYmVsLCBuZXh0TW9udGhMYWJlbCwgc3RhdHVzU2VsZWN0U3RhcnRMYWJlbCwgc3RhdHVzU2VsZWN0RW5kTGFiZWwsIHdlZWtEYXlMYWJlbHMsXG4gICAgY2xlYXJMYWJlbCwgYXBwbHlMYWJlbCwgY2xpZW50TGFiZWwsIG93bmVyTGFiZWwsIG93bmVyQWxsTGFiZWwsIG93bmVyTm9Vc2Vyc0xhYmVsLCBvd25lckxvYWRpbmdMYWJlbCxcbiAgICBsb2FkaW5nTGFiZWwsIG5vVmlzaXRzSW5SYW5nZUxhYmVsLCBjcmVhdGVMYWJlbCwgcXVpY2tGaWx0ZXJzLCBwYWdpbmF0aW9uTGFiZWxzLFxuICB9ID0gdXNlSGlzdG9yeUxhYmVscyhsb2NhbGUpO1xuICBjb25zdCBzaG93RmlsdGVyQWN0aW9ucyA9IHNob3dGaWx0ZXJzO1xyXG4gIGNvbnN0IHNob3dTdW1tYXJ5ID0gIXNob3dGaWx0ZXJzICYmICEhc3RhcnREYXRlICYmICEhZW5kRGF0ZTtcclxuICBjb25zdCBzaG93UmVzdWx0cyA9ICFzaG93RmlsdGVycztcclxuICBjb25zdCBzaG93TWFudWFsUGlja2VyID0gYWN0aXZlUXVpY2tGaWx0ZXIgPT09IFwiY3VzdG9tXCIgJiYgc2hvd01hbnVhbFBpY2tlclBhbmVsO1xyXG4gIGNvbnN0IHNob3dJbmxpbmVTdW1tYXJ5ID0gISFzdGFydERhdGUgJiYgISFlbmREYXRlICYmICFzaG93TWFudWFsUGlja2VyO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJtYXgtdy0zeGwgbXgtYXV0byBweC0xIHNtOnB4LTIgcHQtMyBwYi00IHNwYWNlLXktMlwiPlxyXG4gICAgICB7c2hvd1N1bW1hcnkgJiYgKFxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmlsdGVyLWNhcmQgZmlsdGVyLWNhcmQtLXN1bW1hcnkgcC0zIHNtOnAtNCBtdC0xIG1iLTNcIj5cclxuICAgICAgICAgIDxIaXN0b3J5U3VtbWFyeVxyXG4gICAgICAgICAgICBzdW1tYXJ5RnJvbUxhYmVsPXtzdW1tYXJ5RnJvbX1cclxuICAgICAgICAgICAgc3VtbWFyeVRvTGFiZWw9e3N1bW1hcnlUb31cclxuICAgICAgICAgICAgZnJvbVZhbHVlPXtzdGFydERhdGUgPyBmb3JtYXREaXNwbGF5KHN0YXJ0RGF0ZSwgbG9jYWxlKSA6IFwiLS1cIn1cclxuICAgICAgICAgICAgdG9WYWx1ZT17ZW5kRGF0ZSA/IGZvcm1hdERpc3BsYXkoZW5kRGF0ZSwgbG9jYWxlKSA6IFwiLS1cIn1cclxuICAgICAgICAgICAgY2xpZW50TGFiZWw9e2NsaWVudExhYmVsfVxuICAgICAgICAgICAgY2xpZW50VmFsdWU9e3NlbGVjdGVkQ2xpZW50Py50ZXh0IHx8IFwiXCJ9XG4gICAgICAgICAgICBzaG93Q2xpZW50PXshIXNlbGVjdGVkQ2xpZW50fVxuICAgICAgICAgICAgb3duZXJMYWJlbD17b3duZXJMYWJlbH1cbiAgICAgICAgICAgIG93bmVyVmFsdWU9e3NlbGVjdGVkT3duZXJUZXh0fVxuICAgICAgICAgICAgc2hvd093bmVyPXshIXNlbGVjdGVkT3duZXJUZXh0fVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cbiAgICAgIHtzaG93RmlsdGVycyAmJiAoXG4gICAgICAgIDxIaXN0b3J5RmlsdGVyUGFuZWxcbiAgICAgICAgICBhY3RpdmF0b3JSZWY9e2FjdGl2YXRvclJlZn1cbiAgICAgICAgICBwb3BvdmVyUmVmPXtwb3BvdmVyUmVmfVxuICAgICAgICAgIHF1aWNrRmlsdGVycz17cXVpY2tGaWx0ZXJzfVxuICAgICAgICAgIGFjdGl2ZVF1aWNrRmlsdGVyPXthY3RpdmVRdWlja0ZpbHRlcn1cbiAgICAgICAgICBzaG93SW5saW5lU3VtbWFyeT17c2hvd0lubGluZVN1bW1hcnl9XG4gICAgICAgICAgc2hvd01hbnVhbFBpY2tlcj17c2hvd01hbnVhbFBpY2tlcn1cbiAgICAgICAgICBzdW1tYXJ5RnJvbUxhYmVsPXtzdW1tYXJ5RnJvbX1cbiAgICAgICAgICBzdW1tYXJ5VG9MYWJlbD17c3VtbWFyeVRvfVxuICAgICAgICAgIGZyb21WYWx1ZT17c3RhcnREYXRlID8gZm9ybWF0RGlzcGxheShzdGFydERhdGUsIGxvY2FsZSkgOiBcIi0tXCJ9XG4gICAgICAgICAgdG9WYWx1ZT17ZW5kRGF0ZSA/IGZvcm1hdERpc3BsYXkoZW5kRGF0ZSwgbG9jYWxlKSA6IFwiLS1cIn1cbiAgICAgICAgICBvd25lckxhYmVsPXtvd25lckxhYmVsfVxuICAgICAgICAgIG93bmVyVmFsdWU9e3NlbGVjdGVkT3duZXJUZXh0fVxuICAgICAgICAgIGZpbHRlclRpdGxlPXtmaWx0ZXJUaXRsZX1cbiAgICAgICAgICBzaG93TWFudWFsRXJyb3I9e3Nob3dNYW51YWxFcnJvcn1cbiAgICAgICAgICBzaG93U3RhcnRFcnJvcj17c2hvd01hbnVhbEVycm9yICYmICFzdGFydERhdGV9XG4gICAgICAgICAgc2hvd0VuZEVycm9yPXtzaG93TWFudWFsRXJyb3IgJiYgIWVuZERhdGV9XG4gICAgICAgICAgaXNPcGVuPXtpc09wZW59XG4gICAgICAgICAgc2VsZWN0aW5nU3RlcD17c2VsZWN0aW5nU3RlcH1cbiAgICAgICAgICBsYWJlbEZyb209e2xhYmVsRnJvbX1cbiAgICAgICAgICBsYWJlbFRvPXtsYWJlbFRvfVxuICAgICAgICAgIHN0YXJ0RGF0ZVRleHQ9e3N0YXJ0RGF0ZSA/IGZvcm1hdERpc3BsYXkoc3RhcnREYXRlLCBsb2NhbGUpIDogYWRkRGF0ZUxhYmVsfVxuICAgICAgICAgIGVuZERhdGVUZXh0PXtlbmREYXRlID8gZm9ybWF0RGlzcGxheShlbmREYXRlLCBsb2NhbGUpIDogYWRkRGF0ZUxhYmVsfVxuICAgICAgICAgIGNsZWFyUmFuZ2VMYWJlbD17Y2xlYXJSYW5nZUxhYmVsfVxuICAgICAgICAgIGhhc1NlbGVjdGVkUmFuZ2U9eyEhc3RhcnREYXRlIHx8ICEhZW5kRGF0ZX1cbiAgICAgICAgICBtb250aExhYmVsPXtjYWxlbmRhckxhYmVsfVxuICAgICAgICAgIHdlZWtEYXlMYWJlbHM9e3dlZWtEYXlMYWJlbHN9XG4gICAgICAgICAgc3RhdHVzVGV4dD17c2VsZWN0aW5nU3RlcCA9PT0gXCJzdGFydFwiID8gc3RhdHVzU2VsZWN0U3RhcnRMYWJlbCA6IHN0YXR1c1NlbGVjdEVuZExhYmVsfVxuICAgICAgICAgIGRheUNlbGxzPXttYW51YWxEYXlDZWxsc31cbiAgICAgICAgICBwcmV2TW9udGhMYWJlbD17cHJldk1vbnRoTGFiZWx9XG4gICAgICAgICAgbmV4dE1vbnRoTGFiZWw9e25leHRNb250aExhYmVsfVxuICAgICAgICAgIGNsaWVudFJlc2V0S2V5PXtjbGllbnRSZXNldEtleX1cbiAgICAgICAgICBzZWxlY3RlZENsaWVudD17c2VsZWN0ZWRDbGllbnR9XG4gICAgICAgICAgY2xpZW50TGFiZWw9e2NsaWVudExhYmVsfVxuICAgICAgICAgIHZpc2libGVWaXNpdFVzZXJzPXt2aXNpYmxlVmlzaXRVc2Vyc31cbiAgICAgICAgICBzZWxlY3RlZE93bmVyQXhVc2VySWQ9e3NlbGVjdGVkT3duZXJBeFVzZXJJZH1cbiAgICAgICAgICB2aXNpYmxlVXNlcnNMb2FkaW5nPXt2aXNpYmxlVXNlcnNMb2FkaW5nfVxuICAgICAgICAgIHZpc2libGVVc2Vyc0Vycm9yPXt2aXNpYmxlVXNlcnNFcnJvcn1cbiAgICAgICAgICBvd25lckFsbExhYmVsPXtvd25lckFsbExhYmVsfVxuICAgICAgICAgIG93bmVyTm9Vc2Vyc0xhYmVsPXtvd25lck5vVXNlcnNMYWJlbH1cbiAgICAgICAgICBvd25lckxvYWRpbmdMYWJlbD17b3duZXJMb2FkaW5nTGFiZWx9XG4gICAgICAgICAgc2hvd0ZpbHRlckFjdGlvbnM9e3Nob3dGaWx0ZXJBY3Rpb25zfVxuICAgICAgICAgIGNsZWFyTGFiZWw9e2NsZWFyTGFiZWx9XG4gICAgICAgICAgYXBwbHlMYWJlbD17YXBwbHlMYWJlbH1cbiAgICAgICAgICBvblF1aWNrRmlsdGVyPXtoYW5kbGVRdWlja0ZpbHRlcn1cbiAgICAgICAgICBvbk9wZW5Qb3BvdmVyPXtvcGVuUG9wb3Zlcn1cbiAgICAgICAgICBvbkFjdGl2YXRvcktleURvd249e2hhbmRsZUFjdGl2YXRvcktleURvd259XG4gICAgICAgICAgb25TZWN0aW9uS2V5RG93bj17aGFuZGxlU2VjdGlvbktleURvd259XG4gICAgICAgICAgb25DbGVhckRhdGU9e2hhbmRsZUNsZWFyfVxuICAgICAgICAgIG9uUHJldk1vbnRoPXtoYW5kbGVQcmV2TW9udGh9XG4gICAgICAgICAgb25OZXh0TW9udGg9e2hhbmRsZU5leHRNb250aH1cbiAgICAgICAgICBvbkdyaWRNb3VzZUxlYXZlPXtoYW5kbGVHcmlkTW91c2VMZWF2ZX1cbiAgICAgICAgICBvbkRheUNsaWNrPXtoYW5kbGVNYW51YWxEYXlDbGlja31cbiAgICAgICAgICBvbkRheUhvdmVyPXtoYW5kbGVNYW51YWxEYXlIb3Zlcn1cbiAgICAgICAgICBvbkNsaWVudFNlbGVjdGVkPXtoYW5kbGVDbGllbnRTZWxlY3RlZH1cbiAgICAgICAgICBvbk93bmVyQ2hhbmdlPXtzZXRTZWxlY3RlZE93bmVyQXhVc2VySWR9XG4gICAgICAgICAgb25SZXNldEZpbHRlcnM9e2hhbmRsZVJlc2V0RmlsdGVyc31cbiAgICAgICAgICBvbkFwcGx5RmlsdGVycz17KCkgPT4ge1xuICAgICAgICAgICAgYXBwbHlGaWx0ZXJzKHsgY2xvc2VQYW5lbDogdHJ1ZSwgcGFnZTogMSB9KTtcbiAgICAgICAgICB9fVxuICAgICAgICAvPlxuICAgICAgKX1cblxyXG4gICAgICA8aW5wdXQgdHlwZT1cImhpZGRlblwiIGlkPVwiZnJvbURhdGVcIiB2YWx1ZT17ZnJvbURhdGVWYWx1ZX0gcmVhZE9ubHkgLz5cclxuICAgICAgPGlucHV0IHR5cGU9XCJoaWRkZW5cIiBpZD1cInRvRGF0ZVwiIHZhbHVlPXt0b0RhdGVWYWx1ZX0gcmVhZE9ubHkgLz5cclxuXHJcbiAgICAgIDxIaXN0b3J5UmVzdWx0c1NlY3Rpb25cbiAgICAgICAgc2hvd1Jlc3VsdHM9e3Nob3dSZXN1bHRzfVxuICAgICAgICBpc0xvYWRpbmc9e2lzTG9hZGluZ31cbiAgICAgICAgbG9hZGluZ0xhYmVsPXtsb2FkaW5nTGFiZWx9XG4gICAgICAgIHRpbWVsaW5lSXRlbXM9e3RpbWVsaW5lSXRlbXN9XG4gICAgICAgIG5vRGF0YVRleHQ9e25vVmlzaXRzSW5SYW5nZUxhYmVsfVxuICAgICAgICBlcnJvck1lc3NhZ2U9e2Vycm9yTWVzc2FnZX1cbiAgICAgICAgdG90YWxQYWdlcz17dG90YWxQYWdlc31cbiAgICAgICAgY3VycmVudFBhZ2U9e2N1cnJlbnRQYWdlfVxuICAgICAgICBwYWdlV2luZG93PXtQQUdFX1dJTkRPV31cbiAgICAgICAgcGFnaW5hdGlvbkxhYmVscz17cGFnaW5hdGlvbkxhYmVsc31cbiAgICAgICAgb25OYXZpZ2F0ZT17aGFuZGxlTmF2aWdhdGV9XG4gICAgICAgIG9uUGFnZUNoYW5nZT17bG9hZEFjdGl2aXRpZXN9XG4gICAgICAvPlxuICAgICAge2NhbkNyZWF0ZVZpc2l0ICYmIChcbiAgICAgICAgPEZsb2F0aW5nQWN0aW9uQnV0dG9uXG4gICAgICAgICAgcm91dGU9XCIvVmlzaXRhcy9DcmVhdGU/ZnJlc2g9MVwiXG4gICAgICAgICAgYXJpYUxhYmVsPXtjcmVhdGVMYWJlbH1cbiAgICAgICAgICBzaXplPXs3Nn1cbiAgICAgICAgICByaWdodD17MTZ9XG4gICAgICAgICAgYm90dG9tPXtGQUJfQkFTRV9CT1RUT019XHJcbiAgICAgICAgLz5cclxuICAgICAgKX1cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG4vLyBNb3VudCBoZWxwZXIgZm9yIHRoZSBsZWdhY3kgUmF6b3Igdmlldy5cclxuZXhwb3J0IGNvbnN0IG1vdW50SGlzdG9yeVBhZ2UgPSAocm9vdDogSFRNTEVsZW1lbnQpID0+IHtcbiAgY29uc3QgZGVmYXVsdEZyb21EYXRlID0gcm9vdC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWRlZmF1bHQtZnJvbVwiKSB8fCBcIlwiO1xuICBjb25zdCBkZWZhdWx0VG9EYXRlID0gcm9vdC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWRlZmF1bHQtdG9cIikgfHwgXCJcIjtcbiAgY29uc3QgY29tcGFueUlkID0gcm9vdC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNvbXBhbnktaWRcIikgfHwgXCJcIjtcbiAgY29uc3QgYXhVc2VySWQgPSByb290LmdldEF0dHJpYnV0ZShcImRhdGEtYXgtdXNlci1pZFwiKSB8fCBcIlwiO1xuICBjb25zdCBwZXJtaXNzaW9uc1JldmlzaW9uID0gcm9vdC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXBlcm1pc3Npb25zLXJldmlzaW9uXCIpIHx8IFwiXCI7XG5cbiAgbW91bnRSZWFjdElzbGFuZChcbiAgICByb290LFxuICAgIDxIaXN0b3J5UGFnZVxuICAgICAgZGVmYXVsdEZyb21EYXRlPXtkZWZhdWx0RnJvbURhdGV9XG4gICAgICBkZWZhdWx0VG9EYXRlPXtkZWZhdWx0VG9EYXRlfVxuICAgICAgY29tcGFueUlkPXtjb21wYW55SWR9XG4gICAgICBheFVzZXJJZD17YXhVc2VySWR9XG4gICAgICBwZXJtaXNzaW9uc1JldmlzaW9uPXtwZXJtaXNzaW9uc1JldmlzaW9ufVxuICAgIC8+XG4gICk7XG59O1xuXHJcbmNvbnN0IG1vdW50ID0gKCkgPT4ge1xyXG4gIGNvbnN0IHJvb3RFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlzaXRhcy1oaXN0b3J5LXJvb3RcIik7XHJcbiAgaWYgKCFyb290RWwpIHJldHVybjtcclxuICBtb3VudEhpc3RvcnlQYWdlKHJvb3RFbCk7XHJcbn07XHJcblxyXG5tb3VudFdoZW5Eb2N1bWVudFJlYWR5KG1vdW50KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEhpc3RvcnlQYWdlO1xyXG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFNwaW5uZXIgZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9TcGlubmVyLnRzeFwiO1xuaW1wb3J0IHsgQ2hldnJvbkRvd25TdmcgfSBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL2NoZXZyb25zLnRzeFwiO1xuaW1wb3J0IHsgY2xhc3NOYW1lcyB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9jbGFzc05hbWVzLnRzXCI7XG5pbXBvcnQgeyBmb3JtYXRNb2R1bGVWaXNpYmxlVXNlckxhYmVsLCB0eXBlIE1vZHVsZURhdGFWaXNpYmlsaXR5VmlzaWJsZVVzZXIgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvbW9kdWxlRGF0YVZpc2liaWxpdHkudHNcIjtcblxudHlwZSBQcm9wcyA9IHtcbiAgdXNlcnM6IE1vZHVsZURhdGFWaXNpYmlsaXR5VmlzaWJsZVVzZXJbXTtcbiAgc2VsZWN0ZWRPd25lckF4VXNlcklkOiBzdHJpbmc7XG4gIGxvYWRpbmc6IGJvb2xlYW47XG4gIGVycm9yTWVzc2FnZTogc3RyaW5nO1xuICBsYWJlbDogc3RyaW5nO1xuICBhbGxMYWJlbDogc3RyaW5nO1xuICBub1VzZXJzTGFiZWw6IHN0cmluZztcbiAgbG9hZGluZ0xhYmVsOiBzdHJpbmc7XG4gIG9uQ2hhbmdlOiAob3duZXJBeFVzZXJJZDogc3RyaW5nKSA9PiB2b2lkO1xufTtcblxuLy8gRml4ZWQgZW51bSBzZWxlY3QgZm9yIHZpc2libGUgdmlzaXQgb3duZXIgZmlsdGVyaW5nLlxuY29uc3QgVmlzaWJsZVZpc2l0T3duZXJTZWxlY3QgPSAoe1xuICB1c2VycyxcbiAgc2VsZWN0ZWRPd25lckF4VXNlcklkLFxuICBsb2FkaW5nLFxuICBlcnJvck1lc3NhZ2UsXG4gIGxhYmVsLFxuICBhbGxMYWJlbCxcbiAgbm9Vc2Vyc0xhYmVsLFxuICBsb2FkaW5nTGFiZWwsXG4gIG9uQ2hhbmdlLFxufTogUHJvcHMpID0+IHtcbiAgY29uc3QgaGFzVmlzaWJsZVVzZXJzID0gdXNlcnMubGVuZ3RoID4gMDtcbiAgY29uc3QgZGlzYWJsZWQgPSBsb2FkaW5nIHx8ICFoYXNWaXNpYmxlVXNlcnM7XG4gIGNvbnN0IHNlbGVjdGVkVXNlckV4aXN0cyA9IHVzZXJzLnNvbWUoKHVzZXIpID0+IHVzZXIuYXhVc2VySWQudG9VcHBlckNhc2UoKSA9PT0gc2VsZWN0ZWRPd25lckF4VXNlcklkLnRvVXBwZXJDYXNlKCkpO1xuICBjb25zdCBzZWxlY3RWYWx1ZSA9IGhhc1Zpc2libGVVc2VycyAmJiBzZWxlY3RlZFVzZXJFeGlzdHMgPyBzZWxlY3RlZE93bmVyQXhVc2VySWQgOiBcIlwiO1xuICBjb25zdCBzdGF0dXNUZXh0ID0gbG9hZGluZyA/IGxvYWRpbmdMYWJlbCA6IGVycm9yTWVzc2FnZTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xXCI+XG4gICAgICA8bGFiZWwgY2xhc3NOYW1lPVwic3Itb25seVwiIGh0bWxGb3I9XCJoaXN0b3J5LXZpc2libGUtb3duZXJcIj5cbiAgICAgICAge2xhYmVsfVxuICAgICAgPC9sYWJlbD5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmVcIj5cbiAgICAgICAgPHNlbGVjdFxuICAgICAgICAgIGlkPVwiaGlzdG9yeS12aXNpYmxlLW93bmVyXCJcbiAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICBcInctZnVsbCBhcHBlYXJhbmNlLW5vbmUgcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgYmctd2hpdGUgcHgtMyBweS0yIHByLTEwIHRleHQtc20gc206dGV4dC1iYXNlIGxlYWRpbmctNSB0ZXh0LXNsYXRlLTkwMCBmb2N1czpvdXRsaW5lLWhpZGRlbiBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1wcmltYXJ5IGZvY3VzOmJvcmRlci1wcmltYXJ5XCIsXG4gICAgICAgICAgICBkaXNhYmxlZCA/IFwiY3Vyc29yLW5vdC1hbGxvd2VkIHRleHQtc2xhdGUtNTAwXCIgOiBcIlwiXG4gICAgICAgICAgKX1cbiAgICAgICAgICB2YWx1ZT17aGFzVmlzaWJsZVVzZXJzID8gc2VsZWN0VmFsdWUgOiBcIlwifVxuICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IG9uQ2hhbmdlKGV2ZW50LnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgIGFyaWEtbGFiZWw9e2xhYmVsfVxuICAgICAgICAgIGFyaWEtYnVzeT17bG9hZGluZ31cbiAgICAgICAgPlxuICAgICAgICAgIHtoYXNWaXNpYmxlVXNlcnMgPyAoXG4gICAgICAgICAgICA8PlxuICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiXCI+e2FsbExhYmVsfTwvb3B0aW9uPlxuICAgICAgICAgICAgICB7dXNlcnMubWFwKCh1c2VyKSA9PiAoXG4gICAgICAgICAgICAgICAgPG9wdGlvbiBrZXk9e3VzZXIuYXhVc2VySWR9IHZhbHVlPXt1c2VyLmF4VXNlcklkfT5cbiAgICAgICAgICAgICAgICAgIHtmb3JtYXRNb2R1bGVWaXNpYmxlVXNlckxhYmVsKHVzZXIpfVxuICAgICAgICAgICAgICAgIDwvb3B0aW9uPlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvPlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiXCI+e25vVXNlcnNMYWJlbH08L29wdGlvbj5cbiAgICAgICAgICApfVxuICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicG9pbnRlci1ldmVudHMtbm9uZSBhYnNvbHV0ZSBpbnNldC15LTAgcmlnaHQtMCBmbGV4IGl0ZW1zLWNlbnRlciBwci0zIHRleHQtc2xhdGUtNTAwXCI+XG4gICAgICAgICAge2xvYWRpbmcgPyA8U3Bpbm5lciBzaXplPVwiaC00IHctNFwiIGxhYmVsPXtsb2FkaW5nTGFiZWx9IC8+IDogPENoZXZyb25Eb3duU3ZnIGNsYXNzTmFtZT1cImgtNSB3LTVcIiAvPn1cbiAgICAgICAgPC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgICB7c3RhdHVzVGV4dCAmJiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsIGZsZXgganVzdGlmeS1lbmRcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXCJ0ZXh0LXhzIHRlY2gtaW5mb1wiLCBlcnJvck1lc3NhZ2UgPyBcInRleHQtYW1iZXItNzAwXCIgOiBcInRleHQtc2xhdGUtNTAwXCIpfT57c3RhdHVzVGV4dH08L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFZpc2libGVWaXNpdE93bmVyU2VsZWN0O1xuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBBY3Rpb25CdXR0b24gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9BY3Rpb25CdXR0b24udHN4XCI7XG5pbXBvcnQgRmlsdGVyQnV0dG9uIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvRmlsdGVyQnV0dG9uLnRzeFwiO1xuaW1wb3J0IENsaWVudFNlYXJjaENvbWJvYm94LCB7IHR5cGUgQ2xpZW50T3B0aW9uIH0gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvdmlzaXRhcy9DbGllbnRTZWFyY2hDb21ib2JveC50c3hcIjtcbmltcG9ydCBIaXN0b3J5TWFudWFsRGF0ZVBpY2tlciwgeyB0eXBlIEhpc3RvcnlNYW51YWxEYXlDZWxsIH0gZnJvbSBcIi4vSGlzdG9yeU1hbnVhbERhdGVQaWNrZXIudHN4XCI7XG5pbXBvcnQgSGlzdG9yeVN1bW1hcnkgZnJvbSBcIi4vSGlzdG9yeVN1bW1hcnkudHN4XCI7XG5pbXBvcnQgVmlzaWJsZVZpc2l0T3duZXJTZWxlY3QgZnJvbSBcIi4vVmlzaWJsZVZpc2l0T3duZXJTZWxlY3QudHN4XCI7XG5pbXBvcnQgdHlwZSB7IFF1aWNrRmlsdGVySWQgfSBmcm9tIFwiLi91c2VIaXN0b3J5RmlsdGVyc1N0YXRlLnRzXCI7XG5pbXBvcnQgdHlwZSB7IE1vZHVsZURhdGFWaXNpYmlsaXR5VmlzaWJsZVVzZXIgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvbW9kdWxlRGF0YVZpc2liaWxpdHkudHNcIjtcblxudHlwZSBRdWlja0ZpbHRlck9wdGlvbiA9IHtcbiAgaWQ6IFF1aWNrRmlsdGVySWQ7XG4gIGxhYmVsOiBzdHJpbmc7XG59O1xuXG50eXBlIFByb3BzID0ge1xuICBhY3RpdmF0b3JSZWY6IFJlYWN0LlJlZk9iamVjdDxIVE1MRGl2RWxlbWVudCB8IG51bGw+O1xuICBwb3BvdmVyUmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTERpdkVsZW1lbnQgfCBudWxsPjtcbiAgcXVpY2tGaWx0ZXJzOiBRdWlja0ZpbHRlck9wdGlvbltdO1xuICBhY3RpdmVRdWlja0ZpbHRlcjogUXVpY2tGaWx0ZXJJZCB8IG51bGw7XG4gIHNob3dJbmxpbmVTdW1tYXJ5OiBib29sZWFuO1xuICBzaG93TWFudWFsUGlja2VyOiBib29sZWFuO1xuICBzdW1tYXJ5RnJvbUxhYmVsOiBzdHJpbmc7XG4gIHN1bW1hcnlUb0xhYmVsOiBzdHJpbmc7XG4gIGZyb21WYWx1ZTogc3RyaW5nO1xuICB0b1ZhbHVlOiBzdHJpbmc7XG4gIG93bmVyTGFiZWw6IHN0cmluZztcbiAgb3duZXJWYWx1ZTogc3RyaW5nO1xuICBmaWx0ZXJUaXRsZTogc3RyaW5nO1xuICBzaG93TWFudWFsRXJyb3I6IGJvb2xlYW47XG4gIHNob3dTdGFydEVycm9yOiBib29sZWFuO1xuICBzaG93RW5kRXJyb3I6IGJvb2xlYW47XG4gIGlzT3BlbjogYm9vbGVhbjtcbiAgc2VsZWN0aW5nU3RlcDogXCJzdGFydFwiIHwgXCJlbmRcIiB8IFwiZG9uZVwiO1xuICBsYWJlbEZyb206IHN0cmluZztcbiAgbGFiZWxUbzogc3RyaW5nO1xuICBzdGFydERhdGVUZXh0OiBzdHJpbmc7XG4gIGVuZERhdGVUZXh0OiBzdHJpbmc7XG4gIGNsZWFyUmFuZ2VMYWJlbDogc3RyaW5nO1xuICBoYXNTZWxlY3RlZFJhbmdlOiBib29sZWFuO1xuICBtb250aExhYmVsOiBzdHJpbmc7XG4gIHdlZWtEYXlMYWJlbHM6IHN0cmluZ1tdO1xuICBzdGF0dXNUZXh0OiBzdHJpbmc7XG4gIGRheUNlbGxzOiBIaXN0b3J5TWFudWFsRGF5Q2VsbFtdO1xuICBwcmV2TW9udGhMYWJlbDogc3RyaW5nO1xuICBuZXh0TW9udGhMYWJlbDogc3RyaW5nO1xuICBjbGllbnRSZXNldEtleTogbnVtYmVyO1xuICBzZWxlY3RlZENsaWVudDogQ2xpZW50T3B0aW9uIHwgbnVsbDtcbiAgY2xpZW50TGFiZWw6IHN0cmluZztcbiAgdmlzaWJsZVZpc2l0VXNlcnM6IE1vZHVsZURhdGFWaXNpYmlsaXR5VmlzaWJsZVVzZXJbXTtcbiAgc2VsZWN0ZWRPd25lckF4VXNlcklkOiBzdHJpbmc7XG4gIHZpc2libGVVc2Vyc0xvYWRpbmc6IGJvb2xlYW47XG4gIHZpc2libGVVc2Vyc0Vycm9yOiBzdHJpbmc7XG4gIG93bmVyQWxsTGFiZWw6IHN0cmluZztcbiAgb3duZXJOb1VzZXJzTGFiZWw6IHN0cmluZztcbiAgb3duZXJMb2FkaW5nTGFiZWw6IHN0cmluZztcbiAgc2hvd0ZpbHRlckFjdGlvbnM6IGJvb2xlYW47XG4gIGNsZWFyTGFiZWw6IHN0cmluZztcbiAgYXBwbHlMYWJlbDogc3RyaW5nO1xuICBvblF1aWNrRmlsdGVyOiAoZmlsdGVySWQ6IFF1aWNrRmlsdGVySWQpID0+IHZvaWQ7XG4gIG9uT3BlblBvcG92ZXI6IChzZWN0aW9uOiBcInN0YXJ0XCIgfCBcImVuZFwiKSA9PiB2b2lkO1xuICBvbkFjdGl2YXRvcktleURvd246IChldmVudDogUmVhY3QuS2V5Ym9hcmRFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHZvaWQ7XG4gIG9uU2VjdGlvbktleURvd246IChldmVudDogUmVhY3QuS2V5Ym9hcmRFdmVudDxIVE1MRGl2RWxlbWVudD4sIHNlY3Rpb246IFwic3RhcnRcIiB8IFwiZW5kXCIpID0+IHZvaWQ7XG4gIG9uQ2xlYXJEYXRlOiAoZXZlbnQ6IFJlYWN0Lk1vdXNlRXZlbnQpID0+IHZvaWQ7XG4gIG9uUHJldk1vbnRoOiAoZXZlbnQ6IFJlYWN0Lk1vdXNlRXZlbnQ8SFRNTEJ1dHRvbkVsZW1lbnQ+KSA9PiB2b2lkO1xuICBvbk5leHRNb250aDogKGV2ZW50OiBSZWFjdC5Nb3VzZUV2ZW50PEhUTUxCdXR0b25FbGVtZW50PikgPT4gdm9pZDtcbiAgb25HcmlkTW91c2VMZWF2ZTogKCkgPT4gdm9pZDtcbiAgb25EYXlDbGljazogKGRheTogSGlzdG9yeU1hbnVhbERheUNlbGwpID0+IHZvaWQ7XG4gIG9uRGF5SG92ZXI6IChkYXk6IEhpc3RvcnlNYW51YWxEYXlDZWxsKSA9PiB2b2lkO1xuICBvbkNsaWVudFNlbGVjdGVkOiAoY2xpZW50OiBDbGllbnRPcHRpb24gfCBudWxsKSA9PiB2b2lkO1xuICBvbk93bmVyQ2hhbmdlOiAob3duZXJBeFVzZXJJZDogc3RyaW5nKSA9PiB2b2lkO1xuICBvblJlc2V0RmlsdGVyczogKCkgPT4gdm9pZDtcbiAgb25BcHBseUZpbHRlcnM6ICgpID0+IHZvaWQ7XG59O1xuXG4vLyBSZW5kZXJzIGhpc3RvcnkgZmlsdGVyIGNvbnRyb2xzIHdoaWxlIHRoZSBwYWdlIGNvbnRhaW5lciBvd25zIHN0YXRlIGFuZCBkYXRhIGxvYWRpbmcuXG5jb25zdCBIaXN0b3J5RmlsdGVyUGFuZWwgPSAoe1xuICBhY3RpdmF0b3JSZWYsXG4gIHBvcG92ZXJSZWYsXG4gIHF1aWNrRmlsdGVycyxcbiAgYWN0aXZlUXVpY2tGaWx0ZXIsXG4gIHNob3dJbmxpbmVTdW1tYXJ5LFxuICBzaG93TWFudWFsUGlja2VyLFxuICBzdW1tYXJ5RnJvbUxhYmVsLFxuICBzdW1tYXJ5VG9MYWJlbCxcbiAgZnJvbVZhbHVlLFxuICB0b1ZhbHVlLFxuICBvd25lckxhYmVsLFxuICBvd25lclZhbHVlLFxuICBmaWx0ZXJUaXRsZSxcbiAgc2hvd01hbnVhbEVycm9yLFxuICBzaG93U3RhcnRFcnJvcixcbiAgc2hvd0VuZEVycm9yLFxuICBpc09wZW4sXG4gIHNlbGVjdGluZ1N0ZXAsXG4gIGxhYmVsRnJvbSxcbiAgbGFiZWxUbyxcbiAgc3RhcnREYXRlVGV4dCxcbiAgZW5kRGF0ZVRleHQsXG4gIGNsZWFyUmFuZ2VMYWJlbCxcbiAgaGFzU2VsZWN0ZWRSYW5nZSxcbiAgbW9udGhMYWJlbCxcbiAgd2Vla0RheUxhYmVscyxcbiAgc3RhdHVzVGV4dCxcbiAgZGF5Q2VsbHMsXG4gIHByZXZNb250aExhYmVsLFxuICBuZXh0TW9udGhMYWJlbCxcbiAgY2xpZW50UmVzZXRLZXksXG4gIHNlbGVjdGVkQ2xpZW50LFxuICBjbGllbnRMYWJlbCxcbiAgdmlzaWJsZVZpc2l0VXNlcnMsXG4gIHNlbGVjdGVkT3duZXJBeFVzZXJJZCxcbiAgdmlzaWJsZVVzZXJzTG9hZGluZyxcbiAgdmlzaWJsZVVzZXJzRXJyb3IsXG4gIG93bmVyQWxsTGFiZWwsXG4gIG93bmVyTm9Vc2Vyc0xhYmVsLFxuICBvd25lckxvYWRpbmdMYWJlbCxcbiAgc2hvd0ZpbHRlckFjdGlvbnMsXG4gIGNsZWFyTGFiZWwsXG4gIGFwcGx5TGFiZWwsXG4gIG9uUXVpY2tGaWx0ZXIsXG4gIG9uT3BlblBvcG92ZXIsXG4gIG9uQWN0aXZhdG9yS2V5RG93bixcbiAgb25TZWN0aW9uS2V5RG93bixcbiAgb25DbGVhckRhdGUsXG4gIG9uUHJldk1vbnRoLFxuICBvbk5leHRNb250aCxcbiAgb25HcmlkTW91c2VMZWF2ZSxcbiAgb25EYXlDbGljayxcbiAgb25EYXlIb3ZlcixcbiAgb25DbGllbnRTZWxlY3RlZCxcbiAgb25Pd25lckNoYW5nZSxcbiAgb25SZXNldEZpbHRlcnMsXG4gIG9uQXBwbHlGaWx0ZXJzLFxufTogUHJvcHMpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImZpbHRlci1jYXJkIGZpbHRlci1jYXJkLS1leHBhbmRlZCBwLTIgc206cC0yLjUgcmVsYXRpdmVcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ2FwLXktMS41IGhpc3RvcnktZmlsdGVyLXN0YWNrIGZsZXggZmxleC1jb2xcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIGdhcC0yIGhpc3RvcnktcXVpY2stZmlsdGVyc1wiIGFyaWEtbGFiZWw9e2ZpbHRlclRpdGxlfT5cbiAgICAgICAgICB7cXVpY2tGaWx0ZXJzLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaXNBY3RpdmUgPSBhY3RpdmVRdWlja0ZpbHRlciA9PT0gaXRlbS5pZDtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgIDxGaWx0ZXJCdXR0b25cbiAgICAgICAgICAgICAgICBrZXk9e2l0ZW0uaWR9XG4gICAgICAgICAgICAgICAgbGFiZWw9e2l0ZW0ubGFiZWx9XG4gICAgICAgICAgICAgICAgYWN0aXZlPXtpc0FjdGl2ZX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGxcIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG9uUXVpY2tGaWx0ZXIoaXRlbS5pZCl9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0pfVxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7c2hvd0lubGluZVN1bW1hcnkgJiYgKFxuICAgICAgICAgIDxIaXN0b3J5U3VtbWFyeVxuICAgICAgICAgICAgc3VtbWFyeUZyb21MYWJlbD17c3VtbWFyeUZyb21MYWJlbH1cbiAgICAgICAgICAgIHN1bW1hcnlUb0xhYmVsPXtzdW1tYXJ5VG9MYWJlbH1cbiAgICAgICAgICAgIGZyb21WYWx1ZT17ZnJvbVZhbHVlfVxuICAgICAgICAgICAgdG9WYWx1ZT17dG9WYWx1ZX1cbiAgICAgICAgICAgIG93bmVyTGFiZWw9e293bmVyTGFiZWx9XG4gICAgICAgICAgICBvd25lclZhbHVlPXtvd25lclZhbHVlfVxuICAgICAgICAgICAgc2hvd093bmVyPXshIW93bmVyVmFsdWV9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJnYXAteS0xIHRleHQtWzExcHhdIHB4LTFcIlxuICAgICAgICAgIC8+XG4gICAgICAgICl9XG5cbiAgICAgICAge3Nob3dNYW51YWxQaWNrZXIgJiYgKFxuICAgICAgICAgIDxIaXN0b3J5TWFudWFsRGF0ZVBpY2tlclxuICAgICAgICAgICAgYWN0aXZhdG9yUmVmPXthY3RpdmF0b3JSZWZ9XG4gICAgICAgICAgICBwb3BvdmVyUmVmPXtwb3BvdmVyUmVmfVxuICAgICAgICAgICAgc2hvd01hbnVhbEVycm9yPXtzaG93TWFudWFsRXJyb3J9XG4gICAgICAgICAgICBzaG93U3RhcnRFcnJvcj17c2hvd1N0YXJ0RXJyb3J9XG4gICAgICAgICAgICBzaG93RW5kRXJyb3I9e3Nob3dFbmRFcnJvcn1cbiAgICAgICAgICAgIGZpbHRlclRpdGxlPXtmaWx0ZXJUaXRsZX1cbiAgICAgICAgICAgIGlzT3Blbj17aXNPcGVufVxuICAgICAgICAgICAgc2VsZWN0aW5nU3RlcD17c2VsZWN0aW5nU3RlcH1cbiAgICAgICAgICAgIGxhYmVsRnJvbT17bGFiZWxGcm9tfVxuICAgICAgICAgICAgbGFiZWxUbz17bGFiZWxUb31cbiAgICAgICAgICAgIHN0YXJ0RGF0ZVRleHQ9e3N0YXJ0RGF0ZVRleHR9XG4gICAgICAgICAgICBlbmREYXRlVGV4dD17ZW5kRGF0ZVRleHR9XG4gICAgICAgICAgICBjbGVhclJhbmdlTGFiZWw9e2NsZWFyUmFuZ2VMYWJlbH1cbiAgICAgICAgICAgIGhhc1NlbGVjdGVkUmFuZ2U9e2hhc1NlbGVjdGVkUmFuZ2V9XG4gICAgICAgICAgICBtb250aExhYmVsPXttb250aExhYmVsfVxuICAgICAgICAgICAgd2Vla0RheUxhYmVscz17d2Vla0RheUxhYmVsc31cbiAgICAgICAgICAgIHN0YXR1c1RleHQ9e3N0YXR1c1RleHR9XG4gICAgICAgICAgICBkYXlDZWxscz17ZGF5Q2VsbHN9XG4gICAgICAgICAgICBwcmV2TW9udGhMYWJlbD17cHJldk1vbnRoTGFiZWx9XG4gICAgICAgICAgICBuZXh0TW9udGhMYWJlbD17bmV4dE1vbnRoTGFiZWx9XG4gICAgICAgICAgICBvbk9wZW5Qb3BvdmVyPXtvbk9wZW5Qb3BvdmVyfVxuICAgICAgICAgICAgb25BY3RpdmF0b3JLZXlEb3duPXtvbkFjdGl2YXRvcktleURvd259XG4gICAgICAgICAgICBvblNlY3Rpb25LZXlEb3duPXtvblNlY3Rpb25LZXlEb3dufVxuICAgICAgICAgICAgb25DbGVhcj17b25DbGVhckRhdGV9XG4gICAgICAgICAgICBvblByZXZNb250aD17b25QcmV2TW9udGh9XG4gICAgICAgICAgICBvbk5leHRNb250aD17b25OZXh0TW9udGh9XG4gICAgICAgICAgICBvbkdyaWRNb3VzZUxlYXZlPXtvbkdyaWRNb3VzZUxlYXZlfVxuICAgICAgICAgICAgb25EYXlDbGljaz17b25EYXlDbGlja31cbiAgICAgICAgICAgIG9uRGF5SG92ZXI9e29uRGF5SG92ZXJ9XG4gICAgICAgICAgLz5cbiAgICAgICAgKX1cblxuICAgICAgICA8VmlzaWJsZVZpc2l0T3duZXJTZWxlY3RcbiAgICAgICAgICB1c2Vycz17dmlzaWJsZVZpc2l0VXNlcnN9XG4gICAgICAgICAgc2VsZWN0ZWRPd25lckF4VXNlcklkPXtzZWxlY3RlZE93bmVyQXhVc2VySWR9XG4gICAgICAgICAgbG9hZGluZz17dmlzaWJsZVVzZXJzTG9hZGluZ31cbiAgICAgICAgICBlcnJvck1lc3NhZ2U9e3Zpc2libGVVc2Vyc0Vycm9yfVxuICAgICAgICAgIGxhYmVsPXtvd25lckxhYmVsfVxuICAgICAgICAgIGFsbExhYmVsPXtvd25lckFsbExhYmVsfVxuICAgICAgICAgIG5vVXNlcnNMYWJlbD17b3duZXJOb1VzZXJzTGFiZWx9XG4gICAgICAgICAgbG9hZGluZ0xhYmVsPXtvd25lckxvYWRpbmdMYWJlbH1cbiAgICAgICAgICBvbkNoYW5nZT17b25Pd25lckNoYW5nZX1cbiAgICAgICAgLz5cblxuICAgICAgICA8Q2xpZW50U2VhcmNoQ29tYm9ib3hcbiAgICAgICAgICBrZXk9e2NsaWVudFJlc2V0S2V5fVxuICAgICAgICAgIHZhbHVlPXtzZWxlY3RlZENsaWVudH1cbiAgICAgICAgICBvblNlbGVjdGVkPXtvbkNsaWVudFNlbGVjdGVkfVxuICAgICAgICAgIGxhYmVsPXtjbGllbnRMYWJlbH1cbiAgICAgICAgICBwbGFjZWhvbGRlcj17Y2xpZW50TGFiZWx9XG4gICAgICAgICAgdmFyaWFudD1cImNvbXBhY3RcIlxuICAgICAgICAgIHNob3dMYWJlbD17ZmFsc2V9XG4gICAgICAgICAgaWRCYXNlPVwiaGlzdG9yeS1jbGllbnRcIlxuICAgICAgICAgIHBvcnRhbENsYXNzTmFtZT1cInZpc2l0YXMtdHlwb2dyYXBoeVwiXG4gICAgICAgIC8+XG5cbiAgICAgICAge3Nob3dGaWx0ZXJBY3Rpb25zICYmIChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTEgZ3JpZCBncmlkLWNvbHMtMiBnYXAtMiBoaXN0b3J5LWZpbHRlci1hY3Rpb25zXCI+XG4gICAgICAgICAgICA8QWN0aW9uQnV0dG9uIGxhYmVsPXtjbGVhckxhYmVsfSBjbGFzc05hbWU9XCJ3LWZ1bGxcIiBvbkNsaWNrPXtvblJlc2V0RmlsdGVyc30gLz5cbiAgICAgICAgICAgIDxBY3Rpb25CdXR0b24gbGFiZWw9e2FwcGx5TGFiZWx9IGNsYXNzTmFtZT1cInctZnVsbFwiIG9uQ2xpY2s9e29uQXBwbHlGaWx0ZXJzfSAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBIaXN0b3J5RmlsdGVyUGFuZWw7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrLCB1c2VSZWYgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgY2xhc3NOYW1lcyB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9jbGFzc05hbWVzLnRzXCI7XHJcbmltcG9ydCB7IHVzZVRpbWVsaW5lQ2FyZEVmZmVjdHMgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlVGltZWxpbmVDYXJkRWZmZWN0cy50c1wiO1xyXG5cclxuZXhwb3J0IHR5cGUgVGltZWxpbmVEYXRlUGFydHMgPSB7XHJcbiAgeWVhcjogc3RyaW5nO1xyXG4gIG1vbnRoOiBzdHJpbmc7XHJcbiAgZGF5OiBzdHJpbmc7XHJcbn07XHJcblxyXG5leHBvcnQgdHlwZSBUaW1lbGluZUl0ZW0gPSB7XHJcbiAgaWQ6IHN0cmluZztcclxuICBhY3RpdmlkYWRJZD86IHN0cmluZztcclxuICByZWNJZD86IG51bWJlciB8IG51bGw7XHJcbiAgbmFtZTogc3RyaW5nO1xyXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgZnVsbE5hbWU6IHN0cmluZztcclxuICBmdWxsRGVzYzogc3RyaW5nO1xyXG4gIGRhdGVQYXJ0czogVGltZWxpbmVEYXRlUGFydHM7XHJcbiAgaXNOb0RhdGE6IGJvb2xlYW47XHJcbn07XHJcblxyXG50eXBlIFByb3BzID0ge1xyXG4gIGl0ZW1zOiBUaW1lbGluZUl0ZW1bXTtcclxuICBub0RhdGFUZXh0OiBzdHJpbmc7XHJcbiAgZXJyb3JNZXNzYWdlOiBzdHJpbmc7XHJcbiAgb25OYXZpZ2F0ZTogKGxpbmtJZDogc3RyaW5nKSA9PiB2b2lkO1xyXG59O1xyXG5cclxuY29uc3QgVEFQX01PVkVfUFggPSAxNDtcclxuY29uc3QgSE9MRF9UT19QUkVWSUVXX01TID0gMTYwO1xyXG5cclxudHlwZSBUYXBHdWFyZFN0YXRlID0ge1xyXG4gIGFjdGl2ZTogYm9vbGVhbjtcclxuICBwb2ludGVySWQ6IG51bWJlciB8IG51bGw7XHJcbiAgc3RhcnRYOiBudW1iZXI7XHJcbiAgc3RhcnRZOiBudW1iZXI7XHJcbiAgc3RhcnRUaW1lOiBudW1iZXI7XHJcbiAgbW92ZWQ6IGJvb2xlYW47XHJcbiAgbGlua0lkOiBzdHJpbmc7XHJcbn07XHJcblxyXG5jb25zdCBIaXN0b3J5VGFibGUgPSAoeyBpdGVtcywgbm9EYXRhVGV4dCwgZXJyb3JNZXNzYWdlLCBvbk5hdmlnYXRlIH06IFByb3BzKSA9PiB7XHJcbiAgY29uc3QgY29udGFpbmVyUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgdGFwR3VhcmRSZWYgPSB1c2VSZWY8VGFwR3VhcmRTdGF0ZT4oe1xyXG4gICAgYWN0aXZlOiBmYWxzZSxcclxuICAgIHBvaW50ZXJJZDogbnVsbCxcclxuICAgIHN0YXJ0WDogMCxcclxuICAgIHN0YXJ0WTogMCxcclxuICAgIHN0YXJ0VGltZTogMCxcclxuICAgIG1vdmVkOiBmYWxzZSxcclxuICAgIGxpbmtJZDogXCJcIixcclxuICB9KTtcclxuXHJcbiAgY29uc3QgcmVzb2x2ZUNsaWNrYWJsZUNhcmQgPSB1c2VDYWxsYmFjaygodGFyZ2V0OiBFdmVudFRhcmdldCB8IG51bGwpID0+IHtcclxuICAgIGNvbnN0IG5vZGUgPSB0YXJnZXQgYXMgSFRNTEVsZW1lbnQgfCBudWxsO1xyXG4gICAgaWYgKCFub2RlIHx8IHR5cGVvZiBub2RlLmNsb3Nlc3QgIT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIG51bGw7XHJcbiAgICBjb25zdCBjYXJkID0gbm9kZS5jbG9zZXN0PEhUTUxFbGVtZW50PihcIi50aW1lbGluZS1jYXJkLS1jbGlja2FibGVbZGF0YS1saW5rLWlkXVwiKTtcclxuICAgIGlmICghY2FyZCkgcmV0dXJuIG51bGw7XHJcbiAgICBpZiAoIWNvbnRhaW5lclJlZi5jdXJyZW50Py5jb250YWlucyhjYXJkKSkgcmV0dXJuIG51bGw7XHJcbiAgICByZXR1cm4gY2FyZDtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IHJlc2V0VGFwR3VhcmQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICB0YXBHdWFyZFJlZi5jdXJyZW50LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgdGFwR3VhcmRSZWYuY3VycmVudC5wb2ludGVySWQgPSBudWxsO1xyXG4gICAgdGFwR3VhcmRSZWYuY3VycmVudC5tb3ZlZCA9IGZhbHNlO1xyXG4gICAgdGFwR3VhcmRSZWYuY3VycmVudC5saW5rSWQgPSBcIlwiO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlUG9pbnRlckRvd24gPSB1c2VDYWxsYmFjayhcclxuICAgIChldmVudDogUmVhY3QuUG9pbnRlckV2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4ge1xyXG4gICAgICBpZiAoZXZlbnQucG9pbnRlclR5cGUgPT09IFwibW91c2VcIiAmJiBldmVudC5idXR0b24gIT09IDApIHJldHVybjtcclxuICAgICAgY29uc3QgY2FyZCA9IHJlc29sdmVDbGlja2FibGVDYXJkKGV2ZW50LnRhcmdldCk7XHJcbiAgICAgIGlmICghY2FyZCkgcmV0dXJuO1xyXG4gICAgICBjb25zdCBsaW5rSWQgPSBjYXJkLmRhdGFzZXQubGlua0lkIHx8IFwiXCI7XHJcbiAgICAgIGlmICghbGlua0lkKSByZXR1cm47XHJcblxyXG4gICAgICB0YXBHdWFyZFJlZi5jdXJyZW50LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIHRhcEd1YXJkUmVmLmN1cnJlbnQucG9pbnRlcklkID0gZXZlbnQucG9pbnRlcklkO1xyXG4gICAgICB0YXBHdWFyZFJlZi5jdXJyZW50LnN0YXJ0WCA9IGV2ZW50LmNsaWVudFg7XHJcbiAgICAgIHRhcEd1YXJkUmVmLmN1cnJlbnQuc3RhcnRZID0gZXZlbnQuY2xpZW50WTtcclxuICAgICAgdGFwR3VhcmRSZWYuY3VycmVudC5zdGFydFRpbWUgPSBEYXRlLm5vdygpO1xyXG4gICAgICB0YXBHdWFyZFJlZi5jdXJyZW50Lm1vdmVkID0gZmFsc2U7XHJcbiAgICAgIHRhcEd1YXJkUmVmLmN1cnJlbnQubGlua0lkID0gbGlua0lkO1xyXG4gICAgfSxcclxuICAgIFtyZXNvbHZlQ2xpY2thYmxlQ2FyZF1cclxuICApO1xyXG5cclxuICBjb25zdCBoYW5kbGVQb2ludGVyTW92ZSA9IHVzZUNhbGxiYWNrKChldmVudDogUmVhY3QuUG9pbnRlckV2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4ge1xyXG4gICAgY29uc3Qgc3RhdGUgPSB0YXBHdWFyZFJlZi5jdXJyZW50O1xyXG4gICAgaWYgKCFzdGF0ZS5hY3RpdmUgfHwgZXZlbnQucG9pbnRlcklkICE9PSBzdGF0ZS5wb2ludGVySWQpIHJldHVybjtcclxuICAgIGNvbnN0IGR4ID0gTWF0aC5hYnMoZXZlbnQuY2xpZW50WCAtIHN0YXRlLnN0YXJ0WCk7XHJcbiAgICBjb25zdCBkeSA9IE1hdGguYWJzKGV2ZW50LmNsaWVudFkgLSBzdGF0ZS5zdGFydFkpO1xyXG4gICAgaWYgKGR4ID4gVEFQX01PVkVfUFggfHwgZHkgPiBUQVBfTU9WRV9QWCkge1xyXG4gICAgICBzdGF0ZS5tb3ZlZCA9IHRydWU7XHJcbiAgICB9XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBoYW5kbGVQb2ludGVyVXAgPSB1c2VDYWxsYmFjayhcclxuICAgIChldmVudDogUmVhY3QuUG9pbnRlckV2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4ge1xyXG4gICAgICBjb25zdCBzdGF0ZSA9IHRhcEd1YXJkUmVmLmN1cnJlbnQ7XHJcbiAgICAgIGlmICghc3RhdGUuYWN0aXZlIHx8IGV2ZW50LnBvaW50ZXJJZCAhPT0gc3RhdGUucG9pbnRlcklkKSByZXR1cm47XHJcbiAgICAgIGNvbnN0IGxpbmtJZCA9IHN0YXRlLmxpbmtJZDtcclxuICAgICAgY29uc3QgaGVsZE1zID0gRGF0ZS5ub3coKSAtIHN0YXRlLnN0YXJ0VGltZTtcclxuICAgICAgY29uc3Qgc2hvdWxkVGFwID0gIXN0YXRlLm1vdmVkICYmIGhlbGRNcyA8IEhPTERfVE9fUFJFVklFV19NUztcclxuICAgICAgcmVzZXRUYXBHdWFyZCgpO1xyXG4gICAgICBpZiAoc2hvdWxkVGFwICYmIGxpbmtJZCkge1xyXG4gICAgICAgIG9uTmF2aWdhdGUobGlua0lkKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFtvbk5hdmlnYXRlLCByZXNldFRhcEd1YXJkXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGJsb2NrQ2xpcGJvYXJkQWN0aW9uID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoZXZlbnQ6IFJlYWN0LkNsaXBib2FyZEV2ZW50PEhUTUxEaXZFbGVtZW50PiB8IFJlYWN0Lk1vdXNlRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB7XHJcbiAgICAgIGlmICghcmVzb2x2ZUNsaWNrYWJsZUNhcmQoZXZlbnQudGFyZ2V0KSkgcmV0dXJuO1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfSxcclxuICAgIFtyZXNvbHZlQ2xpY2thYmxlQ2FyZF1cclxuICApO1xyXG5cclxuICB1c2VUaW1lbGluZUNhcmRFZmZlY3RzKHsgY29udGFpbmVyUmVmLCBlcnJvck1lc3NhZ2UsIGl0ZW1zLCByZXNvbHZlQ2xpY2thYmxlQ2FyZCB9KTtcclxuXHJcbiAgY29uc3QgaGFzSXRlbXMgPSBpdGVtcy5sZW5ndGggPiAwO1xyXG4gIGNvbnN0IHNob3dFbXB0eSA9ICFlcnJvck1lc3NhZ2UgJiYgIWhhc0l0ZW1zO1xyXG5cclxuICBjb25zdCBjb250ZW50ID0gZXJyb3JNZXNzYWdlID8gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWRhbmdlclwiPntlcnJvck1lc3NhZ2V9PC9kaXY+XHJcbiAgKSA6IGhhc0l0ZW1zID8gKFxyXG4gICAgaXRlbXMubWFwKChpdGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICBjb25zdCBrZXkgPSBpdGVtLmlkIHx8IGl0ZW0ucmVjSWQ/LnRvU3RyaW5nKCkgfHwgYHRpbWVsaW5lLSR7aW5kZXh9YDtcclxuICAgICAgY29uc3QgaXNDbGlja2FibGUgPSAhaXRlbS5pc05vRGF0YSAmJiAhIWl0ZW0uaWQ7XHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdiBrZXk9e2tleX0gY2xhc3NOYW1lPVwidGltZWxpbmUtaXRlbVwiPlxyXG4gICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXHJcbiAgICAgICAgICAgICAgXCJ0aW1lbGluZS1jYXJkXCIsXHJcbiAgICAgICAgICAgICAgaXRlbS5pc05vRGF0YSA/IFwidGltZWxpbmUtY2FyZC0tbm9kYXRhXCIgOiBcIlwiLFxyXG4gICAgICAgICAgICAgIGlzQ2xpY2thYmxlID8gXCJ0aW1lbGluZS1jYXJkLS1jbGlja2FibGVcIiA6IFwiXCJcclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgZGF0YS1hY3RpdmlkYWRpZD17aXRlbS5hY3RpdmlkYWRJZCB8fCBcIlwifVxyXG4gICAgICAgICAgICBkYXRhLXJlY2lkPXtpdGVtLnJlY0lkICE9IG51bGwgPyBTdHJpbmcoaXRlbS5yZWNJZCkgOiBcIlwifVxyXG4gICAgICAgICAgICBkYXRhLWxpbmstaWQ9e2lzQ2xpY2thYmxlID8gaXRlbS5pZCA6IFwiXCJ9XHJcbiAgICAgICAgICAgIHJvbGU9e2lzQ2xpY2thYmxlID8gXCJidXR0b25cIiA6IHVuZGVmaW5lZH1cclxuICAgICAgICAgICAgdGFiSW5kZXg9e2lzQ2xpY2thYmxlID8gMCA6IHVuZGVmaW5lZH1cclxuICAgICAgICAgICAgYXJpYS1sYWJlbD17aXNDbGlja2FibGUgPyAoaXRlbS5mdWxsTmFtZSB8fCBpdGVtLm5hbWUgfHwgbm9EYXRhVGV4dCkgOiB1bmRlZmluZWR9XHJcbiAgICAgICAgICAgIG9uS2V5RG93bj17aXNDbGlja2FibGVcclxuICAgICAgICAgICAgICA/IChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gXCJFbnRlclwiIHx8IGV2ZW50LmtleSA9PT0gXCIgXCIpIHtcclxuICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgb25OYXZpZ2F0ZShpdGVtLmlkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgOiB1bmRlZmluZWR9XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGltZWxpbmUtZGF0ZS1wYW5lbCBmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMSBweC0zIHB5LTMgYmctc2xhdGUtNTAgYm9yZGVyLXIgYm9yZGVyLXNsYXRlLTIwMCB0ZXh0LXNsYXRlLTYwMFwiPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LXNlbWlib2xkIHRyYWNraW5nLVswLjJlbV0gdGV4dC1zbGF0ZS01MDBcIj57aXRlbS5kYXRlUGFydHMueWVhcn08L2Rpdj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1zZW1pYm9sZCB1cHBlcmNhc2UgdHJhY2tpbmctWzAuMmVtXSB0ZXh0LXNsYXRlLTUwMFwiPntpdGVtLmRhdGVQYXJ0cy5tb250aH08L2Rpdj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtMnhsIGZvbnQtc2VtaWJvbGQgdGV4dC1wcmltYXJ5XCI+e2l0ZW0uZGF0ZVBhcnRzLmRheX08L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGltZWxpbmUtY2FyZF9fY29udGVudCBmbGV4LTEgcHktMyBweC00XCI+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aW1lbGluZS1uYW1lXCIgZGF0YS1mdWxsdGV4dD17aXRlbS5mdWxsTmFtZSB8fCBpdGVtLm5hbWV9PntpdGVtLm5hbWV9PC9kaXY+XHJcbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGltZWxpbmUtZGVzYy10ZXh0XCIgZGF0YS1mdWxsdGV4dD17aXRlbS5mdWxsRGVzYyB8fCBpdGVtLmRlc2NyaXB0aW9ufT57aXRlbS5kZXNjcmlwdGlvbiB8fCBub0RhdGFUZXh0fTwvcD5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgKTtcclxuICAgIH0pXHJcbiAgKSA6IG51bGw7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2XHJcbiAgICAgIGlkPVwidGltZWxpbmVDb250YWluZXJcIlxyXG4gICAgICByZWY9e2NvbnRhaW5lclJlZn1cclxuICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFwidGltZWxpbmUtYm94XCIsIHNob3dFbXB0eSA/IFwidGltZWxpbmUtZW1wdHlcIiA6IFwiXCIpfVxyXG4gICAgICBkYXRhLWVtcHR5LXRleHQ9e25vRGF0YVRleHR9XHJcbiAgICAgIG9uUG9pbnRlckRvd25DYXB0dXJlPXtoYW5kbGVQb2ludGVyRG93bn1cclxuICAgICAgb25Qb2ludGVyTW92ZUNhcHR1cmU9e2hhbmRsZVBvaW50ZXJNb3ZlfVxyXG4gICAgICBvblBvaW50ZXJVcENhcHR1cmU9e2hhbmRsZVBvaW50ZXJVcH1cclxuICAgICAgb25Qb2ludGVyQ2FuY2VsQ2FwdHVyZT17cmVzZXRUYXBHdWFyZH1cclxuICAgICAgb25Qb2ludGVyTGVhdmU9e3Jlc2V0VGFwR3VhcmR9XHJcbiAgICAgIG9uQ29udGV4dE1lbnVDYXB0dXJlPXtibG9ja0NsaXBib2FyZEFjdGlvbn1cclxuICAgICAgb25Db3B5Q2FwdHVyZT17YmxvY2tDbGlwYm9hcmRBY3Rpb259XHJcbiAgICAgIG9uQ3V0Q2FwdHVyZT17YmxvY2tDbGlwYm9hcmRBY3Rpb259XHJcbiAgICAgIG9uUGFzdGVDYXB0dXJlPXtibG9ja0NsaXBib2FyZEFjdGlvbn1cclxuICAgID5cclxuICAgICAge2NvbnRlbnR9XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuY29uc3QgTWVtb2l6ZWRIaXN0b3J5VGFibGUgPSBSZWFjdC5tZW1vKEhpc3RvcnlUYWJsZSk7XHJcbk1lbW9pemVkSGlzdG9yeVRhYmxlLmRpc3BsYXlOYW1lID0gXCJIaXN0b3J5VGFibGVcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1lbW9pemVkSGlzdG9yeVRhYmxlO1xyXG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IENvbXBhY3RQYWdpbmF0aW9uIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvQ29tcGFjdFBhZ2luYXRpb24udHN4XCI7XG5pbXBvcnQgSGlzdG9yeVRhYmxlLCB7IHR5cGUgVGltZWxpbmVJdGVtIH0gZnJvbSBcIi4vSGlzdG9yeVRhYmxlLnRzeFwiO1xuXG50eXBlIFBhZ2luYXRpb25MYWJlbHMgPSB7XG4gIGZpcnN0OiBzdHJpbmc7XG4gIHByZXY6IHN0cmluZztcbiAgbmV4dDogc3RyaW5nO1xuICBsYXN0OiBzdHJpbmc7XG59O1xuXG50eXBlIFByb3BzID0ge1xuICBzaG93UmVzdWx0czogYm9vbGVhbjtcbiAgaXNMb2FkaW5nOiBib29sZWFuO1xuICBsb2FkaW5nTGFiZWw6IHN0cmluZztcbiAgdGltZWxpbmVJdGVtczogVGltZWxpbmVJdGVtW107XG4gIG5vRGF0YVRleHQ6IHN0cmluZztcbiAgZXJyb3JNZXNzYWdlOiBzdHJpbmc7XG4gIHRvdGFsUGFnZXM6IG51bWJlcjtcbiAgY3VycmVudFBhZ2U6IG51bWJlcjtcbiAgcGFnZVdpbmRvdzogbnVtYmVyO1xuICBwYWdpbmF0aW9uTGFiZWxzOiBQYWdpbmF0aW9uTGFiZWxzO1xuICBvbk5hdmlnYXRlOiAobGlua0lkOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uUGFnZUNoYW5nZTogKHBhZ2U6IG51bWJlcikgPT4gdm9pZDtcbn07XG5cbi8vIFJlbmRlcnMgaGlzdG9yeSBsb2FkaW5nLCB0YWJsZSBhbmQgcGFnaW5hdGlvbiBhcyBhIGZvY3VzZWQgcmVzdWx0IHNlY3Rpb24uXG5jb25zdCBIaXN0b3J5UmVzdWx0c1NlY3Rpb24gPSAoe1xuICBzaG93UmVzdWx0cyxcbiAgaXNMb2FkaW5nLFxuICBsb2FkaW5nTGFiZWwsXG4gIHRpbWVsaW5lSXRlbXMsXG4gIG5vRGF0YVRleHQsXG4gIGVycm9yTWVzc2FnZSxcbiAgdG90YWxQYWdlcyxcbiAgY3VycmVudFBhZ2UsXG4gIHBhZ2VXaW5kb3csXG4gIHBhZ2luYXRpb25MYWJlbHMsXG4gIG9uTmF2aWdhdGUsXG4gIG9uUGFnZUNoYW5nZSxcbn06IFByb3BzKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxkaXZcbiAgICAgICAgaWQ9XCJyZXN1bHRzTG9hZGVyXCJcbiAgICAgICAgY2xhc3NOYW1lPVwibG9hZGVyLWJveCBnbGFzcy1wYW5lbCBzaGFkb3ctY2FyZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0ZXh0LXNtIHRleHQtbmV1dHJhbC03MDBcIlxuICAgICAgICBzdHlsZT17eyBkaXNwbGF5OiBpc0xvYWRpbmcgPyBcImZsZXhcIiA6IFwibm9uZVwiIH19XG4gICAgICA+XG4gICAgICAgIDxzdmcgY2xhc3NOYW1lPVwiaW5kLXNwaW5uZXIgc2l6ZS01XCIgdmlld0JveD1cIjAgMCAyMCAyMFwiIHJvbGU9XCJzdGF0dXNcIiBhcmlhLWxhYmVsPXtsb2FkaW5nTGFiZWx9PlxuICAgICAgICAgIDxjaXJjbGUgY2xhc3NOYW1lPVwiaW5kLXNwaW5uZXJfX2NpcmNsZVwiIGN4PVwiMTBcIiBjeT1cIjEwXCIgcj1cIjhcIiBzdHJva2VXaWR0aD1cIjJcIiAvPlxuICAgICAgICA8L3N2Zz5cbiAgICAgICAge2xvYWRpbmdMYWJlbH1cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7c2hvd1Jlc3VsdHMgJiYgKFxuICAgICAgICA8PlxuICAgICAgICAgIDxIaXN0b3J5VGFibGVcbiAgICAgICAgICAgIGl0ZW1zPXt0aW1lbGluZUl0ZW1zfVxuICAgICAgICAgICAgbm9EYXRhVGV4dD17bm9EYXRhVGV4dH1cbiAgICAgICAgICAgIGVycm9yTWVzc2FnZT17ZXJyb3JNZXNzYWdlfVxuICAgICAgICAgICAgb25OYXZpZ2F0ZT17b25OYXZpZ2F0ZX1cbiAgICAgICAgICAvPlxuXG4gICAgICAgICAgPENvbXBhY3RQYWdpbmF0aW9uXG4gICAgICAgICAgICB0b3RhbFBhZ2VzPXt0b3RhbFBhZ2VzfVxuICAgICAgICAgICAgY3VycmVudFBhZ2U9e2N1cnJlbnRQYWdlfVxuICAgICAgICAgICAgcGFnZVdpbmRvdz17cGFnZVdpbmRvd31cbiAgICAgICAgICAgIGxvYWRpbmc9e2lzTG9hZGluZ31cbiAgICAgICAgICAgIG9uUGFnZUNoYW5nZT17b25QYWdlQ2hhbmdlfVxuICAgICAgICAgICAgbGFiZWxzPXtwYWdpbmF0aW9uTGFiZWxzfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvPlxuICAgICAgKX1cbiAgICA8Lz5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEhpc3RvcnlSZXN1bHRzU2VjdGlvbjtcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlTWVtbywgdHlwZSBEaXNwYXRjaCwgdHlwZSBNb3VzZUV2ZW50IGFzIFJlYWN0TW91c2VFdmVudCwgdHlwZSBTZXRTdGF0ZUFjdGlvbiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgY2xhc3NOYW1lcyB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9jbGFzc05hbWVzLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEhpc3RvcnlNYW51YWxEYXlDZWxsIH0gZnJvbSBcIi4vSGlzdG9yeU1hbnVhbERhdGVQaWNrZXIudHN4XCI7XG5cbnR5cGUgQ2FsZW5kYXJDZWxsID0ge1xuICBkYXRlOiBEYXRlIHwgbnVsbDtcbiAgaXNvOiBzdHJpbmc7XG4gIGlzRW1wdHk6IGJvb2xlYW47XG59O1xuXG50eXBlIEFyZ3MgPSB7XG4gIGN1cnJlbnRNb250aDogbnVtYmVyO1xuICBjdXJyZW50WWVhcjogbnVtYmVyO1xuICBsb2NhbGU6IHN0cmluZztcbiAgc3RhcnREYXRlOiBEYXRlIHwgbnVsbDtcbiAgZW5kRGF0ZTogRGF0ZSB8IG51bGw7XG4gIGhvdmVyRGF0ZTogRGF0ZSB8IG51bGw7XG4gIHNlbGVjdGluZ1N0ZXA6IFwic3RhcnRcIiB8IFwiZW5kXCIgfCBcImRvbmVcIjtcbiAgc2V0Q3VycmVudE1vbnRoOiBEaXNwYXRjaDxTZXRTdGF0ZUFjdGlvbjxudW1iZXI+PjtcbiAgc2V0Q3VycmVudFllYXI6IERpc3BhdGNoPFNldFN0YXRlQWN0aW9uPG51bWJlcj4+O1xuICBzZXRIb3ZlckRhdGU6IERpc3BhdGNoPFNldFN0YXRlQWN0aW9uPERhdGUgfCBudWxsPj47XG4gIGhhbmRsZVNlbGVjdDogKGRhdGVPYmo6IERhdGUpID0+IHZvaWQ7XG4gIGxvZ0hpc3Rvcnk6IChtZXNzYWdlOiBzdHJpbmcsIGRhdGE/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPikgPT4gdm9pZDtcbiAgdG9JU086ICh2YWx1ZTogRGF0ZSkgPT4gc3RyaW5nO1xuICBpc0JlZm9yZTogKGE6IERhdGUgfCBudWxsLCBiOiBEYXRlIHwgbnVsbCkgPT4gYm9vbGVhbjtcbiAgZm9ybWF0TW9udGhMYWJlbDogKHZhbHVlOiBEYXRlLCBsb2NhbGU6IHN0cmluZykgPT4gc3RyaW5nO1xufTtcblxuY29uc3Qgc2FtZURheSA9IChhOiBEYXRlIHwgbnVsbCwgYjogRGF0ZSB8IG51bGwpID0+ICEhKGEgJiYgYiAmJiBhLmdldFRpbWUoKSA9PT0gYi5nZXRUaW1lKCkpO1xuXG4vLyBPd25zIGNhbGVuZGFyIG1vbnRoIG5hdmlnYXRpb24gYW5kIGRheS1jZWxsIGRlcml2YXRpb24gZm9yIHRoZSBoaXN0b3J5IHBpY2tlci5cbmV4cG9ydCBjb25zdCB1c2VIaXN0b3J5Q2FsZW5kYXJQaWNrZXIgPSAoe1xuICBjdXJyZW50TW9udGgsXG4gIGN1cnJlbnRZZWFyLFxuICBsb2NhbGUsXG4gIHN0YXJ0RGF0ZSxcbiAgZW5kRGF0ZSxcbiAgaG92ZXJEYXRlLFxuICBzZWxlY3RpbmdTdGVwLFxuICBzZXRDdXJyZW50TW9udGgsXG4gIHNldEN1cnJlbnRZZWFyLFxuICBzZXRIb3ZlckRhdGUsXG4gIGhhbmRsZVNlbGVjdCxcbiAgbG9nSGlzdG9yeSxcbiAgdG9JU08sXG4gIGlzQmVmb3JlLFxuICBmb3JtYXRNb250aExhYmVsLFxufTogQXJncykgPT4ge1xuICBjb25zdCBjYWxlbmRhciA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIGNvbnN0IGZpcnN0RGF5ID0gbmV3IERhdGUoY3VycmVudFllYXIsIGN1cnJlbnRNb250aCwgMSk7XG4gICAgY29uc3QgZGF5c0luTW9udGggPSBuZXcgRGF0ZShjdXJyZW50WWVhciwgY3VycmVudE1vbnRoICsgMSwgMCkuZ2V0RGF0ZSgpO1xuICAgIGNvbnN0IG9mZnNldCA9IChmaXJzdERheS5nZXREYXkoKSArIDYpICUgNztcbiAgICBjb25zdCBjZWxsczogQ2FsZW5kYXJDZWxsW10gPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9mZnNldDsgaSsrKSB7XG4gICAgICBjZWxscy5wdXNoKHsgZGF0ZTogbnVsbCwgaXNvOiBcIlwiLCBpc0VtcHR5OiB0cnVlIH0pO1xuICAgIH1cbiAgICBmb3IgKGxldCBkID0gMTsgZCA8PSBkYXlzSW5Nb250aDsgZCsrKSB7XG4gICAgICBjb25zdCBkYXRlT2JqID0gbmV3IERhdGUoY3VycmVudFllYXIsIGN1cnJlbnRNb250aCwgZCk7XG4gICAgICBjZWxscy5wdXNoKHsgZGF0ZTogZGF0ZU9iaiwgaXNvOiB0b0lTTyhkYXRlT2JqKSwgaXNFbXB0eTogZmFsc2UgfSk7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBjZWxscyxcbiAgICAgIGxhYmVsOiBmb3JtYXRNb250aExhYmVsKGZpcnN0RGF5LCBsb2NhbGUpLFxuICAgIH07XG4gIH0sIFtjdXJyZW50TW9udGgsIGN1cnJlbnRZZWFyLCBmb3JtYXRNb250aExhYmVsLCBsb2NhbGUsIHRvSVNPXSk7XG5cbiAgY29uc3QgcHJldmlld0VuZCA9IGVuZERhdGUgfHwgKHNlbGVjdGluZ1N0ZXAgPT09IFwiZW5kXCIgPyBob3ZlckRhdGUgOiBudWxsKTtcblxuICBjb25zdCBoYW5kbGVQcmV2TW9udGggPSB1c2VDYWxsYmFjayhcbiAgICAoZXZlbnQ6IFJlYWN0TW91c2VFdmVudDxIVE1MQnV0dG9uRWxlbWVudD4pID0+IHtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgc2V0Q3VycmVudE1vbnRoKChwcmV2KSA9PiB7XG4gICAgICAgIGNvbnN0IG5leHQgPSBwcmV2IC0gMTtcbiAgICAgICAgaWYgKG5leHQgPCAwKSB7XG4gICAgICAgICAgc2V0Q3VycmVudFllYXIoKHllYXIpID0+IHllYXIgLSAxKTtcbiAgICAgICAgICByZXR1cm4gMTE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICB9KTtcbiAgICB9LFxuICAgIFtzZXRDdXJyZW50TW9udGgsIHNldEN1cnJlbnRZZWFyXVxuICApO1xuXG4gIGNvbnN0IGhhbmRsZU5leHRNb250aCA9IHVzZUNhbGxiYWNrKFxuICAgIChldmVudDogUmVhY3RNb3VzZUV2ZW50PEhUTUxCdXR0b25FbGVtZW50PikgPT4ge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBzZXRDdXJyZW50TW9udGgoKHByZXYpID0+IHtcbiAgICAgICAgY29uc3QgbmV4dCA9IHByZXYgKyAxO1xuICAgICAgICBpZiAobmV4dCA+IDExKSB7XG4gICAgICAgICAgc2V0Q3VycmVudFllYXIoKHllYXIpID0+IHllYXIgKyAxKTtcbiAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgW3NldEN1cnJlbnRNb250aCwgc2V0Q3VycmVudFllYXJdXG4gICk7XG5cbiAgY29uc3QgaGFuZGxlR3JpZE1vdXNlTGVhdmUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgc2V0SG92ZXJEYXRlKG51bGwpO1xuICB9LCBbc2V0SG92ZXJEYXRlXSk7XG5cbiAgY29uc3QgaGFuZGxlTWFudWFsRGF5Q2xpY2sgPSB1c2VDYWxsYmFjayhcbiAgICAoY2VsbDogSGlzdG9yeU1hbnVhbERheUNlbGwpID0+IHtcbiAgICAgIGlmICghY2VsbC5kYXRlKSByZXR1cm47XG4gICAgICBsb2dIaXN0b3J5KFwiZGF5Q2xpY2tcIiwgeyBkYXRlOiBjZWxsLmlzbyB8fCBcIlwiLCBkaXNhYmxlZDogISFjZWxsLmRpc2FibGVkIH0pO1xuICAgICAgaGFuZGxlU2VsZWN0KGNlbGwuZGF0ZSk7XG4gICAgfSxcbiAgICBbaGFuZGxlU2VsZWN0LCBsb2dIaXN0b3J5XVxuICApO1xuXG4gIGNvbnN0IGhhbmRsZU1hbnVhbERheUhvdmVyID0gdXNlQ2FsbGJhY2soXG4gICAgKGNlbGw6IEhpc3RvcnlNYW51YWxEYXlDZWxsKSA9PiB7XG4gICAgICBpZiAoIWNlbGwuZGF0ZSkgcmV0dXJuO1xuICAgICAgaWYgKHNlbGVjdGluZ1N0ZXAgPT09IFwiZW5kXCIgJiYgc3RhcnREYXRlKSB7XG4gICAgICAgIHNldEhvdmVyRGF0ZShuZXcgRGF0ZShjZWxsLmRhdGUpKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIFtzZWxlY3RpbmdTdGVwLCBzZXRIb3ZlckRhdGUsIHN0YXJ0RGF0ZV1cbiAgKTtcblxuICBjb25zdCBtYW51YWxEYXlDZWxscyA9IHVzZU1lbW88SGlzdG9yeU1hbnVhbERheUNlbGxbXT4oKCkgPT4ge1xuICAgIHJldHVybiBjYWxlbmRhci5jZWxscy5tYXAoKGNlbGwsIGlkeCkgPT4ge1xuICAgICAgaWYgKGNlbGwuaXNFbXB0eSkge1xuICAgICAgICByZXR1cm4geyBrZXk6IGBlbXB0eS0ke2lkeH1gLCBpc0VtcHR5OiB0cnVlIH07XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGRhdGVPYmogPSBjZWxsLmRhdGUgYXMgRGF0ZTtcbiAgICAgIGNvbnN0IGlzU3RhcnQgPSBzYW1lRGF5KGRhdGVPYmosIHN0YXJ0RGF0ZSk7XG4gICAgICBjb25zdCBpc0VuZCA9IHNhbWVEYXkoZGF0ZU9iaiwgZW5kRGF0ZSk7XG4gICAgICBjb25zdCBpblJhbmdlID0gc3RhcnREYXRlICYmIHByZXZpZXdFbmQgJiYgaXNCZWZvcmUoc3RhcnREYXRlLCBkYXRlT2JqKSAmJiBpc0JlZm9yZShkYXRlT2JqLCBwcmV2aWV3RW5kKTtcbiAgICAgIGNvbnN0IGhvdmVyUmFuZ2UgPSBzdGFydERhdGUgJiYgIWVuZERhdGUgJiYgaG92ZXJEYXRlICYmIGlzQmVmb3JlKHN0YXJ0RGF0ZSwgZGF0ZU9iaikgJiYgaXNCZWZvcmUoZGF0ZU9iaiwgaG92ZXJEYXRlKTtcbiAgICAgIGNvbnN0IGRpc2FibGVkID0gc2VsZWN0aW5nU3RlcCA9PT0gXCJlbmRcIiAmJiAhIXN0YXJ0RGF0ZSAmJiBpc0JlZm9yZShkYXRlT2JqLCBzdGFydERhdGUpO1xuICAgICAgY29uc3QgaXNUb2RheSA9IHNhbWVEYXkoZGF0ZU9iaiwgbmV3IERhdGUoKSk7XG5cbiAgICAgIGNvbnN0IGRheUNsYXNzID0gY2xhc3NOYW1lcyhcbiAgICAgICAgXCJkcnAtZGF5XCIsXG4gICAgICAgIGlzU3RhcnQgPyBcInN0YXJ0IHJhbmdlLXN0YXJ0XCIgOiBcIlwiLFxuICAgICAgICBpc0VuZCA/IFwiZW5kIHJhbmdlLWVuZFwiIDogXCJcIixcbiAgICAgICAgaW5SYW5nZSA/IFwiaW4tcmFuZ2VcIiA6IFwiXCIsXG4gICAgICAgIGhvdmVyUmFuZ2UgPyBcImhvdmVyLXJhbmdlXCIgOiBcIlwiLFxuICAgICAgICBkaXNhYmxlZCA/IFwiZGlzYWJsZWRcIiA6IFwiXCIsXG4gICAgICAgIGlzVG9kYXkgPyBcInRvZGF5XCIgOiBcIlwiXG4gICAgICApO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBrZXk6IGNlbGwuaXNvLFxuICAgICAgICBpc0VtcHR5OiBmYWxzZSxcbiAgICAgICAgZGF0ZTogZGF0ZU9iaixcbiAgICAgICAgaXNvOiBjZWxsLmlzbyxcbiAgICAgICAgZGF5TGFiZWw6IGRhdGVPYmouZ2V0RGF0ZSgpLFxuICAgICAgICBkYXlDbGFzcyxcbiAgICAgICAgZGlzYWJsZWQsXG4gICAgICB9O1xuICAgIH0pO1xuICB9LCBbY2FsZW5kYXIuY2VsbHMsIGVuZERhdGUsIGhvdmVyRGF0ZSwgaXNCZWZvcmUsIHByZXZpZXdFbmQsIHNlbGVjdGluZ1N0ZXAsIHN0YXJ0RGF0ZV0pO1xuXG4gIHJldHVybiB7XG4gICAgY2FsZW5kYXJMYWJlbDogY2FsZW5kYXIubGFiZWwsXG4gICAgbWFudWFsRGF5Q2VsbHMsXG4gICAgaGFuZGxlUHJldk1vbnRoLFxuICAgIGhhbmRsZU5leHRNb250aCxcbiAgICBoYW5kbGVHcmlkTW91c2VMZWF2ZSxcbiAgICBoYW5kbGVNYW51YWxEYXlDbGljayxcbiAgICBoYW5kbGVNYW51YWxEYXlIb3ZlcixcbiAgfTtcbn07XG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHR5cGUgRGlzcGF0Y2gsIHR5cGUgTW91c2VFdmVudCBhcyBSZWFjdE1vdXNlRXZlbnQsIHR5cGUgU2V0U3RhdGVBY3Rpb24gfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB0eXBlIHsgTG9hZE92ZXJyaWRlIH0gZnJvbSBcIi4vdXNlSGlzdG9yeUZpbHRlcnNTdGF0ZS50c1wiO1xuXG50eXBlIEFwcGx5T3B0aW9ucyA9IHtcbiAgY2xvc2VQYW5lbD86IGJvb2xlYW47XG4gIGZvcmNlPzogYm9vbGVhbjtcbiAgcGFnZT86IG51bWJlcjtcbn07XG5cbnR5cGUgU3RyaW5nUmVmID0ge1xuICBjdXJyZW50OiBzdHJpbmc7XG59O1xuXG50eXBlIEFyZ3MgPSB7XG4gIHN0YXJ0RGF0ZTogRGF0ZSB8IG51bGw7XG4gIGVuZERhdGU6IERhdGUgfCBudWxsO1xuICBmcm9tRGF0ZVZhbHVlOiBzdHJpbmc7XG4gIHRvRGF0ZVZhbHVlOiBzdHJpbmc7XG4gIGFjY291bnROdW1WYWx1ZTogc3RyaW5nO1xuICBvd25lckF4VXNlcklkVmFsdWU6IHN0cmluZztcbiAgbGFzdFNpZ25hdHVyZVJlZjogU3RyaW5nUmVmO1xuICB2YWxpZGF0ZU1hbnVhbFJhbmdlOiAoKSA9PiBib29sZWFuO1xuICBub3JtYWxpemVSYW5nZTogKGZyb206IHN0cmluZywgdG86IHN0cmluZykgPT4geyBmcm9tOiBzdHJpbmc7IHRvOiBzdHJpbmcgfTtcbiAgbG9hZEFjdGl2aXRpZXM6IChwYWdlOiBudW1iZXIsIG92ZXJyaWRlPzogTG9hZE92ZXJyaWRlKSA9PiB2b2lkO1xuICBoYW5kbGVDbGVhclN0YXRlOiAoZXZlbnQ6IFJlYWN0TW91c2VFdmVudCkgPT4gdm9pZDtcbiAgY2xlYXJGaWx0ZXJDYWNoZTogKCkgPT4gdm9pZDtcbiAgcmVzZXRBY3Rpdml0aWVzOiAoKSA9PiB2b2lkO1xuICByZXNldEhpc3RvcnlGaWx0ZXJzOiAoKSA9PiB2b2lkO1xuICBzZXRJc09wZW46IERpc3BhdGNoPFNldFN0YXRlQWN0aW9uPGJvb2xlYW4+PjtcbiAgc2V0U2hvd0ZpbHRlcnM6IERpc3BhdGNoPFNldFN0YXRlQWN0aW9uPGJvb2xlYW4+PjtcbiAgc2V0U2hvd01hbnVhbEVycm9yOiBEaXNwYXRjaDxTZXRTdGF0ZUFjdGlvbjxib29sZWFuPj47XG59O1xuXG4vLyBLZWVwcyBmaWx0ZXIgYXBwbHkvcmVzZXQgYmVoYXZpb3IgdG9nZXRoZXIgYW5kIG91dCBvZiB0aGUgcGFnZSByZW5kZXIgY29udGFpbmVyLlxuZXhwb3J0IGNvbnN0IHVzZUhpc3RvcnlGaWx0ZXJBY3Rpb25zID0gKHtcbiAgc3RhcnREYXRlLFxuICBlbmREYXRlLFxuICBmcm9tRGF0ZVZhbHVlLFxuICB0b0RhdGVWYWx1ZSxcbiAgYWNjb3VudE51bVZhbHVlLFxuICBvd25lckF4VXNlcklkVmFsdWUsXG4gIGxhc3RTaWduYXR1cmVSZWYsXG4gIHZhbGlkYXRlTWFudWFsUmFuZ2UsXG4gIG5vcm1hbGl6ZVJhbmdlLFxuICBsb2FkQWN0aXZpdGllcyxcbiAgaGFuZGxlQ2xlYXJTdGF0ZSxcbiAgY2xlYXJGaWx0ZXJDYWNoZSxcbiAgcmVzZXRBY3Rpdml0aWVzLFxuICByZXNldEhpc3RvcnlGaWx0ZXJzLFxuICBzZXRJc09wZW4sXG4gIHNldFNob3dGaWx0ZXJzLFxuICBzZXRTaG93TWFudWFsRXJyb3IsXG59OiBBcmdzKSA9PiB7XG4gIGNvbnN0IGFwcGx5RmlsdGVycyA9IHVzZUNhbGxiYWNrKFxuICAgIChvcHRpb25zPzogQXBwbHlPcHRpb25zKSA9PiB7XG4gICAgICBpZiAoIXZhbGlkYXRlTWFudWFsUmFuZ2UoKSkgcmV0dXJuO1xuICAgICAgaWYgKCFzdGFydERhdGUgfHwgIWVuZERhdGUpIHJldHVybjtcblxuICAgICAgY29uc3Qgbm9ybWFsaXplZCA9IG5vcm1hbGl6ZVJhbmdlKGZyb21EYXRlVmFsdWUsIHRvRGF0ZVZhbHVlKTtcbiAgICAgIGNvbnN0IHBhZ2UgPSBvcHRpb25zPy5wYWdlID8/IDE7XG4gICAgICBjb25zdCBzaWduYXR1cmUgPSBgJHtub3JtYWxpemVkLmZyb219fCR7bm9ybWFsaXplZC50b318JHthY2NvdW50TnVtVmFsdWV9fCR7b3duZXJBeFVzZXJJZFZhbHVlfXwke3BhZ2V9YDtcblxuICAgICAgaWYgKG9wdGlvbnM/LmZvcmNlIHx8IGxhc3RTaWduYXR1cmVSZWYuY3VycmVudCAhPT0gc2lnbmF0dXJlKSB7XG4gICAgICAgIGxvYWRBY3Rpdml0aWVzKHBhZ2UsIHtcbiAgICAgICAgICBmcm9tRGF0ZTogbm9ybWFsaXplZC5mcm9tLFxuICAgICAgICAgIHRvRGF0ZTogbm9ybWFsaXplZC50byxcbiAgICAgICAgICBhY2NvdW50TnVtOiBhY2NvdW50TnVtVmFsdWUsXG4gICAgICAgICAgb3duZXJBeFVzZXJJZDogb3duZXJBeFVzZXJJZFZhbHVlLFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgc2V0U2hvd01hbnVhbEVycm9yKGZhbHNlKTtcbiAgICAgIGlmIChvcHRpb25zPy5jbG9zZVBhbmVsKSB7XG4gICAgICAgIHNldElzT3BlbihmYWxzZSk7XG4gICAgICAgIHNldFNob3dGaWx0ZXJzKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIFtcbiAgICAgIGFjY291bnROdW1WYWx1ZSxcbiAgICAgIGVuZERhdGUsXG4gICAgICBmcm9tRGF0ZVZhbHVlLFxuICAgICAgbGFzdFNpZ25hdHVyZVJlZixcbiAgICAgIGxvYWRBY3Rpdml0aWVzLFxuICAgICAgb3duZXJBeFVzZXJJZFZhbHVlLFxuICAgICAgc2V0SXNPcGVuLFxuICAgICAgc2V0U2hvd0ZpbHRlcnMsXG4gICAgICBzZXRTaG93TWFudWFsRXJyb3IsXG4gICAgICBzdGFydERhdGUsXG4gICAgICB0b0RhdGVWYWx1ZSxcbiAgICAgIHZhbGlkYXRlTWFudWFsUmFuZ2UsXG4gICAgICBub3JtYWxpemVSYW5nZSxcbiAgICBdXG4gICk7XG5cbiAgY29uc3QgaGFuZGxlQ2xlYXIgPSB1c2VDYWxsYmFjayhcbiAgICAoZXZlbnQ6IFJlYWN0TW91c2VFdmVudCkgPT4ge1xuICAgICAgaGFuZGxlQ2xlYXJTdGF0ZShldmVudCk7XG4gICAgICBjbGVhckZpbHRlckNhY2hlKCk7XG4gICAgICByZXNldEFjdGl2aXRpZXMoKTtcbiAgICB9LFxuICAgIFtjbGVhckZpbHRlckNhY2hlLCBoYW5kbGVDbGVhclN0YXRlLCByZXNldEFjdGl2aXRpZXNdXG4gICk7XG5cbiAgY29uc3QgaGFuZGxlUmVzZXRGaWx0ZXJzID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIHJlc2V0SGlzdG9yeUZpbHRlcnMoKTtcbiAgICBjbGVhckZpbHRlckNhY2hlKCk7XG4gICAgcmVzZXRBY3Rpdml0aWVzKCk7XG4gICAgc2V0SXNPcGVuKGZhbHNlKTtcbiAgICBzZXRTaG93RmlsdGVycyh0cnVlKTtcbiAgfSwgW2NsZWFyRmlsdGVyQ2FjaGUsIHJlc2V0QWN0aXZpdGllcywgcmVzZXRIaXN0b3J5RmlsdGVycywgc2V0SXNPcGVuLCBzZXRTaG93RmlsdGVyc10pO1xuXG4gIHJldHVybiB7XG4gICAgYXBwbHlGaWx0ZXJzLFxuICAgIGhhbmRsZUNsZWFyLFxuICAgIGhhbmRsZVJlc2V0RmlsdGVycyxcbiAgfTtcbn07XG4iLCAiaW1wb3J0IHsgdXNlRWZmZWN0LCB0eXBlIERpc3BhdGNoLCB0eXBlIFNldFN0YXRlQWN0aW9uIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgdHlwZSB7IEhpc3RvcnlDYWNoZWRGaWx0ZXIgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlSGlzdG9yeUZpbHRlckNhY2hlLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEZpbHRlckxvYWRSZXF1ZXN0LCBMb2FkT3ZlcnJpZGUgfSBmcm9tIFwiLi91c2VIaXN0b3J5RmlsdGVyc1N0YXRlLnRzXCI7XG5cbnR5cGUgQm9vbGVhblJlZiA9IHtcbiAgY3VycmVudDogYm9vbGVhbjtcbn07XG5cbnR5cGUgQXJncyA9IHtcbiAgZGVmYXVsdEZyb21EYXRlOiBzdHJpbmc7XG4gIGRlZmF1bHRUb0RhdGU6IHN0cmluZztcbiAgZGlkSW5pdEZpbHRlclJlZjogQm9vbGVhblJlZjtcbiAgaGFzUmVzdG9yZWRGaWx0ZXJSZWY6IEJvb2xlYW5SZWY7XG4gIHJldHJ5T25OZXR3b3JrRXJyb3JSZWY6IEJvb2xlYW5SZWY7XG4gIGNvbnN1bWVSZXR1cm5GbGFnOiAoKSA9PiBib29sZWFuO1xuICByZWFkQ2FjaGVkRmlsdGVyOiAoKSA9PiBIaXN0b3J5Q2FjaGVkRmlsdGVyIHwgbnVsbDtcbiAgYXBwbHlDYWNoZWRGaWx0ZXI6IChmaWx0ZXI6IEhpc3RvcnlDYWNoZWRGaWx0ZXIgfCBudWxsKSA9PiBGaWx0ZXJMb2FkUmVxdWVzdCB8IG51bGw7XG4gIGFwcGx5RGVmYXVsdFJhbmdlRnJvbVByb3BzOiAoKSA9PiBGaWx0ZXJMb2FkUmVxdWVzdCB8IG51bGw7XG4gIGxvYWRBY3Rpdml0aWVzOiAocGFnZTogbnVtYmVyLCBvdmVycmlkZT86IExvYWRPdmVycmlkZSkgPT4gdm9pZDtcbiAgcmVzZXRBY3Rpdml0aWVzOiAoKSA9PiB2b2lkO1xuICByZXNldEhpc3RvcnlGaWx0ZXJzOiAoKSA9PiB2b2lkO1xuICBjbGVhckZpbHRlckNhY2hlOiAoKSA9PiB2b2lkO1xuICBzZXRTaG93RmlsdGVyczogRGlzcGF0Y2g8U2V0U3RhdGVBY3Rpb248Ym9vbGVhbj4+O1xuICBzZXRJc09wZW46IERpc3BhdGNoPFNldFN0YXRlQWN0aW9uPGJvb2xlYW4+PjtcbiAgbG9nSGlzdG9yeTogKG1lc3NhZ2U6IHN0cmluZywgZGF0YT86IFJlY29yZDxzdHJpbmcsIHVua25vd24+KSA9PiB2b2lkO1xufTtcblxuLy8gUmVzdG9yZXMgdGhlIGhpc3RvcnkgZmlsdGVycyBvbmNlIG9uIG1vdW50IGFuZCBzdGFydHMgdGhlIGZpcnN0IGFjdGl2aXR5IGxvYWQuXG5leHBvcnQgY29uc3QgdXNlSGlzdG9yeUluaXRpYWxMb2FkID0gKHtcbiAgZGVmYXVsdEZyb21EYXRlLFxuICBkZWZhdWx0VG9EYXRlLFxuICBkaWRJbml0RmlsdGVyUmVmLFxuICBoYXNSZXN0b3JlZEZpbHRlclJlZixcbiAgcmV0cnlPbk5ldHdvcmtFcnJvclJlZixcbiAgY29uc3VtZVJldHVybkZsYWcsXG4gIHJlYWRDYWNoZWRGaWx0ZXIsXG4gIGFwcGx5Q2FjaGVkRmlsdGVyLFxuICBhcHBseURlZmF1bHRSYW5nZUZyb21Qcm9wcyxcbiAgbG9hZEFjdGl2aXRpZXMsXG4gIHJlc2V0QWN0aXZpdGllcyxcbiAgcmVzZXRIaXN0b3J5RmlsdGVycyxcbiAgY2xlYXJGaWx0ZXJDYWNoZSxcbiAgc2V0U2hvd0ZpbHRlcnMsXG4gIHNldElzT3BlbixcbiAgbG9nSGlzdG9yeSxcbn06IEFyZ3MpID0+IHtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBsb2dIaXN0b3J5KFwiaW5pdFwiLCB7IGRlZmF1bHRGcm9tRGF0ZSwgZGVmYXVsdFRvRGF0ZSB9KTtcbiAgfSwgW2RlZmF1bHRGcm9tRGF0ZSwgZGVmYXVsdFRvRGF0ZSwgbG9nSGlzdG9yeV0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKGRpZEluaXRGaWx0ZXJSZWYuY3VycmVudCkgcmV0dXJuO1xuICAgIGRpZEluaXRGaWx0ZXJSZWYuY3VycmVudCA9IHRydWU7XG4gICAgY29uc3QgY2FjaGVkID0gY29uc3VtZVJldHVybkZsYWcoKSA/IHJlYWRDYWNoZWRGaWx0ZXIoKSA6IG51bGw7XG4gICAgaWYgKGNhY2hlZCAmJiBjYWNoZWQuZnJvbURhdGUgJiYgY2FjaGVkLnRvRGF0ZSkge1xuICAgICAgbG9nSGlzdG9yeShcInJlc3RvcmVGaWx0ZXJcIiwgY2FjaGVkKTtcbiAgICAgIGNvbnN0IGNhY2hlZFJlcXVlc3QgPSBhcHBseUNhY2hlZEZpbHRlcihjYWNoZWQpO1xuICAgICAgaWYgKGNhY2hlZFJlcXVlc3QpIHtcbiAgICAgICAgcmV0cnlPbk5ldHdvcmtFcnJvclJlZi5jdXJyZW50ID0gdHJ1ZTtcbiAgICAgICAgbG9hZEFjdGl2aXRpZXMoY2FjaGVkUmVxdWVzdC5wYWdlLCBjYWNoZWRSZXF1ZXN0Lm92ZXJyaWRlKTtcbiAgICAgICAgc2V0U2hvd0ZpbHRlcnMoZmFsc2UpO1xuICAgICAgICBzZXRJc09wZW4oZmFsc2UpO1xuICAgICAgICBoYXNSZXN0b3JlZEZpbHRlclJlZi5jdXJyZW50ID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGRlZmF1bHRSZXF1ZXN0ID0gYXBwbHlEZWZhdWx0UmFuZ2VGcm9tUHJvcHMoKTtcbiAgICBpZiAoZGVmYXVsdFJlcXVlc3QpIHtcbiAgICAgIHJldHJ5T25OZXR3b3JrRXJyb3JSZWYuY3VycmVudCA9IHRydWU7XG4gICAgICBsb2FkQWN0aXZpdGllcyhkZWZhdWx0UmVxdWVzdC5wYWdlLCBkZWZhdWx0UmVxdWVzdC5vdmVycmlkZSk7XG4gICAgICBzZXRTaG93RmlsdGVycyhmYWxzZSk7XG4gICAgICBzZXRJc09wZW4oZmFsc2UpO1xuICAgICAgaGFzUmVzdG9yZWRGaWx0ZXJSZWYuY3VycmVudCA9IHRydWU7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcmVzZXRIaXN0b3J5RmlsdGVycygpO1xuICAgIGNsZWFyRmlsdGVyQ2FjaGUoKTtcbiAgICByZXNldEFjdGl2aXRpZXMoKTtcbiAgICBzZXRTaG93RmlsdGVycyh0cnVlKTtcbiAgICBzZXRJc09wZW4oZmFsc2UpO1xuICB9LCBbXG4gICAgYXBwbHlDYWNoZWRGaWx0ZXIsXG4gICAgYXBwbHlEZWZhdWx0UmFuZ2VGcm9tUHJvcHMsXG4gICAgY2xlYXJGaWx0ZXJDYWNoZSxcbiAgICBjb25zdW1lUmV0dXJuRmxhZyxcbiAgICBkaWRJbml0RmlsdGVyUmVmLFxuICAgIGhhc1Jlc3RvcmVkRmlsdGVyUmVmLFxuICAgIGxvYWRBY3Rpdml0aWVzLFxuICAgIHJlYWRDYWNoZWRGaWx0ZXIsXG4gICAgcmVzZXRBY3Rpdml0aWVzLFxuICAgIHJlc2V0SGlzdG9yeUZpbHRlcnMsXG4gICAgcmV0cnlPbk5ldHdvcmtFcnJvclJlZixcbiAgICBzZXRJc09wZW4sXG4gICAgc2V0U2hvd0ZpbHRlcnMsXG4gICAgbG9nSGlzdG9yeSxcbiAgXSk7XG59O1xuIiwgImltcG9ydCB7IHVzZU1lbW8gfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuXG5jb25zdCB0b1NlbnRlbmNlQ2FzZSA9ICh2YWx1ZTogc3RyaW5nLCBsb2NhbGU6IHN0cmluZykgPT4ge1xuICBpZiAoIXZhbHVlKSByZXR1cm4gXCJcIjtcbiAgY29uc3QgdHJpbW1lZCA9IHZhbHVlLnRyaW0oKTtcbiAgaWYgKCF0cmltbWVkKSByZXR1cm4gdHJpbW1lZDtcbiAgY29uc3QgbG93ZXIgPSB0cmltbWVkLnRvTG9jYWxlTG93ZXJDYXNlKGxvY2FsZSk7XG4gIHJldHVybiBsb3dlclswXS50b0xvY2FsZVVwcGVyQ2FzZShsb2NhbGUpICsgbG93ZXIuc2xpY2UoMSk7XG59O1xuXG4vLyBHcm91cHMgbG9jYWxpemVkIGhpc3RvcnkgbGFiZWxzIGFuZCBmaXhlZCBvcHRpb24gbGlzdHMgZm9yIHRoZSBwYWdlLlxuZXhwb3J0IGNvbnN0IHVzZUhpc3RvcnlMYWJlbHMgPSAobG9jYWxlOiBzdHJpbmcpID0+IHtcbiAgY29uc3QgbGFiZWxGcm9tID0gdG9TZW50ZW5jZUNhc2UoaW5kVChcIkhpc3RvcnlfRnJvbVwiLCBcIkZyb21cIiksIGxvY2FsZSk7XG4gIGNvbnN0IGxhYmVsVG8gPSB0b1NlbnRlbmNlQ2FzZShpbmRUKFwiSGlzdG9yeV9Ub1wiLCBcIlRvXCIpLCBsb2NhbGUpO1xuICBjb25zdCBxdWlja0N1c3RvbUxhYmVsID0gaW5kVChcIkhpc3RvcnlfUXVpY2tfQ3VzdG9tXCIsIFwiRGF0ZVwiKTtcbiAgY29uc3QgcXVpY2s3RGF5c0xhYmVsID0gaW5kVChcIkhpc3RvcnlfUXVpY2tfN0RheXNcIiwgXCI3IGRheXNcIik7XG4gIGNvbnN0IHF1aWNrMzBEYXlzTGFiZWwgPSBpbmRUKFwiSGlzdG9yeV9RdWlja18zMERheXNcIiwgXCIzMCBkYXlzXCIpO1xuICBjb25zdCBxdWljazkwRGF5c0xhYmVsID0gaW5kVChcIkhpc3RvcnlfUXVpY2tfOTBEYXlzXCIsIFwiOTAgZGF5c1wiKTtcbiAgY29uc3QgcGFnZUZpcnN0TGFiZWwgPSBpbmRUKFwiSGlzdG9yeV9QYWdlX0ZpcnN0XCIsIFwiRmlyc3RcIik7XG4gIGNvbnN0IHBhZ2VQcmV2TGFiZWwgPSBpbmRUKFwiSGlzdG9yeV9QYWdlX1ByZXZcIiwgXCJQcmV2aW91c1wiKTtcbiAgY29uc3QgcGFnZU5leHRMYWJlbCA9IGluZFQoXCJIaXN0b3J5X1BhZ2VfTmV4dFwiLCBcIk5leHRcIik7XG4gIGNvbnN0IHBhZ2VMYXN0TGFiZWwgPSBpbmRUKFwiSGlzdG9yeV9QYWdlX0xhc3RcIiwgXCJMYXN0XCIpO1xuXG4gIGNvbnN0IHdlZWtEYXlMYWJlbHMgPSB1c2VNZW1vKFxuICAgICgpID0+IFtcbiAgICAgIGluZFQoXCJIaXN0b3J5X0RheV9Nb25cIiwgXCJNb25cIiksXG4gICAgICBpbmRUKFwiSGlzdG9yeV9EYXlfVHVlXCIsIFwiVHVlXCIpLFxuICAgICAgaW5kVChcIkhpc3RvcnlfRGF5X1dlZFwiLCBcIldlZFwiKSxcbiAgICAgIGluZFQoXCJIaXN0b3J5X0RheV9UaHVcIiwgXCJUaHVcIiksXG4gICAgICBpbmRUKFwiSGlzdG9yeV9EYXlfRnJpXCIsIFwiRnJpXCIpLFxuICAgICAgaW5kVChcIkhpc3RvcnlfRGF5X1NhdFwiLCBcIlNhdFwiKSxcbiAgICAgIGluZFQoXCJIaXN0b3J5X0RheV9TdW5cIiwgXCJTdW5cIiksXG4gICAgXSxcbiAgICBbXVxuICApO1xuXG4gIGNvbnN0IHF1aWNrRmlsdGVycyA9IHVzZU1lbW8oXG4gICAgKCkgPT4gW1xuICAgICAgeyBpZDogXCJjdXN0b21cIiBhcyBjb25zdCwgbGFiZWw6IHF1aWNrQ3VzdG9tTGFiZWwgfSxcbiAgICAgIHsgaWQ6IFwiZGF5cy03XCIgYXMgY29uc3QsIGxhYmVsOiBxdWljazdEYXlzTGFiZWwgfSxcbiAgICAgIHsgaWQ6IFwiZGF5cy0zMFwiIGFzIGNvbnN0LCBsYWJlbDogcXVpY2szMERheXNMYWJlbCB9LFxuICAgICAgeyBpZDogXCJkYXlzLTkwXCIgYXMgY29uc3QsIGxhYmVsOiBxdWljazkwRGF5c0xhYmVsIH0sXG4gICAgXSxcbiAgICBbcXVpY2szMERheXNMYWJlbCwgcXVpY2s3RGF5c0xhYmVsLCBxdWljazkwRGF5c0xhYmVsLCBxdWlja0N1c3RvbUxhYmVsXVxuICApO1xuXG4gIGNvbnN0IHBhZ2luYXRpb25MYWJlbHMgPSB1c2VNZW1vKFxuICAgICgpID0+ICh7XG4gICAgICBmaXJzdDogcGFnZUZpcnN0TGFiZWwsXG4gICAgICBwcmV2OiBwYWdlUHJldkxhYmVsLFxuICAgICAgbmV4dDogcGFnZU5leHRMYWJlbCxcbiAgICAgIGxhc3Q6IHBhZ2VMYXN0TGFiZWwsXG4gICAgfSksXG4gICAgW3BhZ2VGaXJzdExhYmVsLCBwYWdlTGFzdExhYmVsLCBwYWdlTmV4dExhYmVsLCBwYWdlUHJldkxhYmVsXVxuICApO1xuXG4gIHJldHVybiB7XG4gICAgbGFiZWxGcm9tLFxuICAgIGxhYmVsVG8sXG4gICAgc3VtbWFyeUZyb206IGxhYmVsRnJvbSxcbiAgICBzdW1tYXJ5VG86IGxhYmVsVG8sXG4gICAgZmlsdGVyVGl0bGU6IGluZFQoXCJIaXN0b3J5X0ZpbHRlcl9EYXRlXCIsIFwiRGF0ZVwiKSxcbiAgICBhZGREYXRlTGFiZWw6IGluZFQoXCJIaXN0b3J5X0FkZERhdGVcIiwgXCJBZGQgZGF0ZVwiKSxcbiAgICBjbGVhclJhbmdlTGFiZWw6IGluZFQoXCJIaXN0b3J5X0NsZWFyUmFuZ2VcIiwgXCJDbGVhciByYW5nZVwiKSxcbiAgICBwcmV2TW9udGhMYWJlbDogaW5kVChcIkhpc3RvcnlfUHJldk1vbnRoXCIsIFwiUHJldmlvdXMgbW9udGhcIiksXG4gICAgbmV4dE1vbnRoTGFiZWw6IGluZFQoXCJIaXN0b3J5X05leHRNb250aFwiLCBcIk5leHQgbW9udGhcIiksXG4gICAgc3RhdHVzU2VsZWN0U3RhcnRMYWJlbDogaW5kVChcIkhpc3RvcnlfU3RhdHVzX1NlbGVjdFN0YXJ0XCIsIFwiU2VsZWN0IHN0YXJ0IGRhdGVcIiksXG4gICAgc3RhdHVzU2VsZWN0RW5kTGFiZWw6IGluZFQoXCJIaXN0b3J5X1N0YXR1c19TZWxlY3RFbmRcIiwgXCJTZWxlY3QgZW5kIGRhdGVcIiksXG4gICAgY2xlYXJMYWJlbDogaW5kVChcIkhpc3RvcnlfRmlsdGVyX0NsZWFyXCIsIFwiQ2xlYXJcIiksXG4gICAgYXBwbHlMYWJlbDogaW5kVChcIkhpc3RvcnlfRmlsdGVyX0FwcGx5XCIsIFwiQXBwbHlcIiksXG4gICAgY2xpZW50TGFiZWw6IGluZFQoXCJIaXN0b3J5X0ZpbHRlcl9DbGllbnRcIiwgXCJBY2NvdW50XCIpLFxuICAgIG93bmVyTGFiZWw6IGluZFQoXCJIaXN0b3J5X0ZpbHRlcl9Pd25lclwiLCBcIk93bmVyXCIpLFxuICAgIG93bmVyQWxsTGFiZWw6IGluZFQoXCJIaXN0b3J5X0ZpbHRlcl9Pd25lcl9BbGxcIiwgXCJBbGwgdmlzaWJsZSB1c2Vyc1wiKSxcbiAgICBvd25lck5vVXNlcnNMYWJlbDogaW5kVChcIkhpc3RvcnlfRmlsdGVyX093bmVyX05vbmVcIiwgXCJObyB2aXNpYmxlIHVzZXJzXCIpLFxuICAgIG93bmVyTG9hZGluZ0xhYmVsOiBpbmRUKFwiSGlzdG9yeV9GaWx0ZXJfT3duZXJfTG9hZGluZ1wiLCBcIkxvYWRpbmcgdmlzaWJsZSB1c2Vyc1wiKSxcbiAgICBsb2FkaW5nTGFiZWw6IGluZFQoXCJIaXN0b3J5X0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpLFxuICAgIG5vVmlzaXRzSW5SYW5nZUxhYmVsOiBpbmRUKFwiSGlzdG9yeV9Ob0RhdGFJblJhbmdlXCIsIFwiTm8gdmlzaXRzIGluIHRoaXMgcmFuZ2VcIiksXG4gICAgY3JlYXRlTGFiZWw6IGluZFQoXCJDb21tb25fQ3JlYXRlXCIsIFwiQ3JlYXRlXCIpLFxuICAgIHdlZWtEYXlMYWJlbHMsXG4gICAgcXVpY2tGaWx0ZXJzLFxuICAgIHBhZ2luYXRpb25MYWJlbHMsXG4gIH07XG59O1xuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgdHlwZSB7IENsaWVudE9wdGlvbiB9IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL3Zpc2l0YXMvQ2xpZW50U2VhcmNoQ29tYm9ib3gudHN4XCI7XG5pbXBvcnQgdHlwZSB7IEhpc3RvcnlDYWNoZWRGaWx0ZXIgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlSGlzdG9yeUZpbHRlckNhY2hlLnRzXCI7XG5cbnR5cGUgQXJncyA9IHtcbiAgY2FuVmlld0hpc3Rvcnk6IGJvb2xlYW47XG4gIGN1cnJlbnRQYWdlOiBudW1iZXI7XG4gIGZyb21EYXRlVmFsdWU6IHN0cmluZztcbiAgdG9EYXRlVmFsdWU6IHN0cmluZztcbiAgc2VsZWN0ZWRDbGllbnQ6IENsaWVudE9wdGlvbiB8IG51bGw7XG4gIG93bmVyQXhVc2VySWQ6IHN0cmluZztcbiAgb3duZXJUZXh0OiBzdHJpbmc7XG4gIG5hdkRlbGF5TXM6IG51bWJlcjtcbiAgc2F2ZUNhY2hlZEZpbHRlcjogKGZpbHRlcjogSGlzdG9yeUNhY2hlZEZpbHRlcikgPT4gdm9pZDtcbiAgb25Gb3JiaWRkZW46ICgpID0+IHZvaWQ7XG59O1xuXG4vLyBDcmVhdGVzIHRoZSBkZXRhaWwgbmF2aWdhdGlvbiBoYW5kbGVyIGFuZCBwZXJzaXN0cyB0aGUgY3VycmVudCBoaXN0b3J5IGZpbHRlci5cbmV4cG9ydCBjb25zdCB1c2VIaXN0b3J5TmF2aWdhdGlvbiA9ICh7XG4gIGNhblZpZXdIaXN0b3J5LFxuICBjdXJyZW50UGFnZSxcbiAgZnJvbURhdGVWYWx1ZSxcbiAgdG9EYXRlVmFsdWUsXG4gIHNlbGVjdGVkQ2xpZW50LFxuICBvd25lckF4VXNlcklkLFxuICBvd25lclRleHQsXG4gIG5hdkRlbGF5TXMsXG4gIHNhdmVDYWNoZWRGaWx0ZXIsXG4gIG9uRm9yYmlkZGVuLFxufTogQXJncykgPT4ge1xuICByZXR1cm4gdXNlQ2FsbGJhY2soXG4gICAgKGxpbmtJZDogc3RyaW5nKSA9PiB7XG4gICAgICBpZiAoIWNhblZpZXdIaXN0b3J5KSB7XG4gICAgICAgIG9uRm9yYmlkZGVuKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBzYXZlQ2FjaGVkRmlsdGVyKHtcbiAgICAgICAgICBmcm9tRGF0ZTogZnJvbURhdGVWYWx1ZSB8fCBcIlwiLFxuICAgICAgICAgIHRvRGF0ZTogdG9EYXRlVmFsdWUgfHwgXCJcIixcbiAgICAgICAgICBwYWdlOiBjdXJyZW50UGFnZSxcbiAgICAgICAgICBjbGllbnRBY2NvdW50OiBzZWxlY3RlZENsaWVudD8udmFsdWUgfHwgXCJcIixcbiAgICAgICAgICBjbGllbnRUZXh0OiBzZWxlY3RlZENsaWVudD8udGV4dCB8fCBcIlwiLFxuICAgICAgICAgIG93bmVyQXhVc2VySWQsXG4gICAgICAgICAgb3duZXJUZXh0LFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZW5jb2RlVVJJQ29tcG9uZW50KGxpbmtJZCk7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYC9WaXNpdGFzL0RldGFsbGUvJHt0YXJnZXR9YDtcbiAgICAgIH0sIG5hdkRlbGF5TXMpO1xuICAgIH0sXG4gICAgW1xuICAgICAgY2FuVmlld0hpc3RvcnksXG4gICAgICBjdXJyZW50UGFnZSxcbiAgICAgIGZyb21EYXRlVmFsdWUsXG4gICAgICBuYXZEZWxheU1zLFxuICAgICAgb25Gb3JiaWRkZW4sXG4gICAgICBvd25lckF4VXNlcklkLFxuICAgICAgb3duZXJUZXh0LFxuICAgICAgc2F2ZUNhY2hlZEZpbHRlcixcbiAgICAgIHNlbGVjdGVkQ2xpZW50LFxuICAgICAgdG9EYXRlVmFsdWUsXG4gICAgXVxuICApO1xufTtcbiIsICJcdUZFRkZpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0IH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB0eXBlIHsgSGlzdG9yeUNhY2hlZEZpbHRlciB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VIaXN0b3J5RmlsdGVyQ2FjaGUudHNcIjtcclxuaW1wb3J0IHsgc2V0VG9wYmFyQWN0aW9uR3JvdXBSZWFkeSB9IGZyb20gXCIuLi8uLi8uLi91dGlscy90b3BiYXJBY3Rpb25WaXNpYmlsaXR5LnRzXCI7XHJcbmltcG9ydCB0eXBlIHsgRmlsdGVyTG9hZFJlcXVlc3QsIExvYWRPdmVycmlkZSB9IGZyb20gXCIuL3VzZUhpc3RvcnlGaWx0ZXJzU3RhdGUudHNcIjtcclxuXHJcbnR5cGUgVXNlSGlzdG9yeVBhZ2VMaXN0ZW5lcnNBcmdzID0ge1xyXG4gIGlzT3BlbjogYm9vbGVhbjtcclxuICBhY3RpdmF0b3JSZWY6IFJlYWN0LlJlZk9iamVjdDxIVE1MRGl2RWxlbWVudCB8IG51bGw+O1xyXG4gIHBvcG92ZXJSZWY6IFJlYWN0LlJlZk9iamVjdDxIVE1MRGl2RWxlbWVudCB8IG51bGw+O1xyXG4gIGhhc1Jlc3RvcmVkRmlsdGVyUmVmOiBSZWFjdC5NdXRhYmxlUmVmT2JqZWN0PGJvb2xlYW4+O1xyXG4gIHJldHJ5T25OZXR3b3JrRXJyb3JSZWY6IFJlYWN0Lk11dGFibGVSZWZPYmplY3Q8Ym9vbGVhbj47XHJcbiAgY3VycmVudFBhZ2U6IG51bWJlcjtcclxuICBsb2dIaXN0b3J5OiAobWVzc2FnZTogc3RyaW5nLCBkYXRhPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pID0+IHZvaWQ7XHJcbiAgY29uc3VtZVJldHVybkZsYWc6ICgpID0+IGJvb2xlYW47XHJcbiAgcmVhZENhY2hlZEZpbHRlcjogKCkgPT4gSGlzdG9yeUNhY2hlZEZpbHRlciB8IG51bGw7XHJcbiAgYXBwbHlDYWNoZWRGaWx0ZXI6IChmaWx0ZXI6IEhpc3RvcnlDYWNoZWRGaWx0ZXIgfCBudWxsKSA9PiBGaWx0ZXJMb2FkUmVxdWVzdCB8IG51bGw7XHJcbiAgbG9hZEFjdGl2aXRpZXM6IChwYWdlOiBudW1iZXIsIG92ZXJyaWRlPzogTG9hZE92ZXJyaWRlKSA9PiB2b2lkO1xyXG4gIHNldElzT3BlbjogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248Ym9vbGVhbj4+O1xyXG4gIHNldEhvdmVyRGF0ZTogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248RGF0ZSB8IG51bGw+PjtcclxuICBzZXRTaG93RmlsdGVyczogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248Ym9vbGVhbj4+O1xyXG4gIGFwcGx5RmlsdGVyczogKG9wdGlvbnM/OiB7IGNsb3NlUGFuZWw/OiBib29sZWFuOyBmb3JjZT86IGJvb2xlYW47IHBhZ2U/OiBudW1iZXIgfSkgPT4gdm9pZDtcclxufTtcclxuXHJcbi8vIEhhbmRsZXMgZ2xvYmFsIGxpc3RlbmVycyB1c2VkIGJ5IHRoZSBoaXN0b3J5IHBhZ2UgZmlsdGVycyBhbmQgY2FsZW5kYXIgVUkuXHJcbmV4cG9ydCBjb25zdCB1c2VIaXN0b3J5UGFnZUxpc3RlbmVycyA9ICh7XHJcbiAgaXNPcGVuLFxyXG4gIGFjdGl2YXRvclJlZixcclxuICBwb3BvdmVyUmVmLFxyXG4gIGhhc1Jlc3RvcmVkRmlsdGVyUmVmLFxyXG4gIHJldHJ5T25OZXR3b3JrRXJyb3JSZWYsXHJcbiAgY3VycmVudFBhZ2UsXHJcbiAgbG9nSGlzdG9yeSxcclxuICBjb25zdW1lUmV0dXJuRmxhZyxcclxuICByZWFkQ2FjaGVkRmlsdGVyLFxyXG4gIGFwcGx5Q2FjaGVkRmlsdGVyLFxyXG4gIGxvYWRBY3Rpdml0aWVzLFxyXG4gIHNldElzT3BlbixcclxuICBzZXRIb3ZlckRhdGUsXHJcbiAgc2V0U2hvd0ZpbHRlcnMsXHJcbiAgYXBwbHlGaWx0ZXJzLFxyXG59OiBVc2VIaXN0b3J5UGFnZUxpc3RlbmVyc0FyZ3MpID0+IHtcclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgc2V0VG9wYmFyQWN0aW9uR3JvdXBSZWFkeShcImhpc3RvcnktbGlzdC1hY3Rpb25zXCIpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgLy8gQ2xvc2UgdGhlIG1hbnVhbCBwaWNrZXIgd2hlbiBjbGlja2luZyBvdXRzaWRlIG9mIHRoZSByYW5nZSBwaWNrZXIgVUkuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghaXNPcGVuKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgaGFuZGxlT3V0c2lkZSA9IChldmVudDogTW91c2VFdmVudCkgPT4ge1xyXG4gICAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQgYXMgTm9kZSB8IG51bGw7XHJcbiAgICAgIGlmICghdGFyZ2V0KSByZXR1cm47XHJcbiAgICAgIGlmIChwb3BvdmVyUmVmLmN1cnJlbnQ/LmNvbnRhaW5zKHRhcmdldCkpIHJldHVybjtcclxuICAgICAgaWYgKGFjdGl2YXRvclJlZi5jdXJyZW50Py5jb250YWlucyh0YXJnZXQpKSByZXR1cm47XHJcbiAgICAgIGxvZ0hpc3RvcnkoXCJjbG9zZVBvcG92ZXI6b3V0c2lkZVwiKTtcclxuICAgICAgc2V0SXNPcGVuKGZhbHNlKTtcclxuICAgICAgc2V0SG92ZXJEYXRlKG51bGwpO1xyXG4gICAgfTtcclxuXHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGhhbmRsZU91dHNpZGUpO1xyXG4gICAgcmV0dXJuICgpID0+IGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgaGFuZGxlT3V0c2lkZSk7XHJcbiAgfSwgW2FjdGl2YXRvclJlZiwgaXNPcGVuLCBsb2dIaXN0b3J5LCBwb3BvdmVyUmVmLCBzZXRIb3ZlckRhdGUsIHNldElzT3Blbl0pO1xyXG5cclxuICAvLyBSZS1hcHBseSBmaWx0ZXJzIGFmdGVyIGJyb3dzZXIgYmFjay9mb3J3YXJkIG5hdmlnYXRpb24gcmV0dXJucyB0byB0aGUgcGFnZS5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3Qgb25QYWdlU2hvdyA9ICgpID0+IHtcclxuICAgICAgaWYgKGhhc1Jlc3RvcmVkRmlsdGVyUmVmLmN1cnJlbnQpIHJldHVybjtcclxuICAgICAgaWYgKGNvbnN1bWVSZXR1cm5GbGFnKCkpIHtcclxuICAgICAgICBjb25zdCBjYWNoZWQgPSByZWFkQ2FjaGVkRmlsdGVyKCk7XHJcbiAgICAgICAgY29uc3QgY2FjaGVkUmVxdWVzdCA9IGFwcGx5Q2FjaGVkRmlsdGVyKGNhY2hlZCk7XHJcbiAgICAgICAgaWYgKGNhY2hlZFJlcXVlc3QpIHtcclxuICAgICAgICAgIHJldHJ5T25OZXR3b3JrRXJyb3JSZWYuY3VycmVudCA9IHRydWU7XHJcbiAgICAgICAgICBsb2FkQWN0aXZpdGllcyhjYWNoZWRSZXF1ZXN0LnBhZ2UsIGNhY2hlZFJlcXVlc3Qub3ZlcnJpZGUpO1xyXG4gICAgICAgICAgc2V0U2hvd0ZpbHRlcnMoZmFsc2UpO1xyXG4gICAgICAgICAgc2V0SXNPcGVuKGZhbHNlKTtcclxuICAgICAgICAgIGhhc1Jlc3RvcmVkRmlsdGVyUmVmLmN1cnJlbnQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInBhZ2VzaG93XCIsIG9uUGFnZVNob3cpO1xyXG4gICAgcmV0dXJuICgpID0+IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicGFnZXNob3dcIiwgb25QYWdlU2hvdyk7XHJcbiAgfSwgW1xyXG4gICAgYXBwbHlDYWNoZWRGaWx0ZXIsXHJcbiAgICBjb25zdW1lUmV0dXJuRmxhZyxcclxuICAgIGhhc1Jlc3RvcmVkRmlsdGVyUmVmLFxyXG4gICAgbG9hZEFjdGl2aXRpZXMsXHJcbiAgICByZWFkQ2FjaGVkRmlsdGVyLFxyXG4gICAgcmV0cnlPbk5ldHdvcmtFcnJvclJlZixcclxuICAgIHNldElzT3BlbixcclxuICAgIHNldFNob3dGaWx0ZXJzLFxyXG4gIF0pO1xyXG5cclxuICAvLyBXaXJlIHRvcGJhciBhY3Rpb25zIHRoYXQgdG9nZ2xlIGZpbHRlcnMgb3IgZm9yY2UgcmVmcmVzaCBvZiBjdXJyZW50IHBhZ2UuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IG9uVG9nZ2xlRmlsdGVycyA9ICgpID0+IHtcclxuICAgICAgc2V0U2hvd0ZpbHRlcnMoKHByZXYpID0+IHtcclxuICAgICAgICBjb25zdCBuZXh0ID0gIXByZXY7XHJcbiAgICAgICAgaWYgKCFuZXh0KSB7XHJcbiAgICAgICAgICBzZXRJc09wZW4oZmFsc2UpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oeyB0b3A6IDAsIGJlaGF2aW9yOiBcInNtb290aFwiIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV4dDtcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IG9uUmVmcmVzaCA9ICgpID0+IHtcclxuICAgICAgYXBwbHlGaWx0ZXJzKHsgcGFnZTogY3VycmVudFBhZ2UsIGZvcmNlOiB0cnVlLCBjbG9zZVBhbmVsOiB0cnVlIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImhpc3RvcnktdG9nZ2xlLWZpbHRlclwiLCBvblRvZ2dsZUZpbHRlcnMpO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJoaXN0b3J5LXJlZnJlc2hcIiwgb25SZWZyZXNoKTtcclxuXHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImhpc3RvcnktdG9nZ2xlLWZpbHRlclwiLCBvblRvZ2dsZUZpbHRlcnMpO1xyXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImhpc3RvcnktcmVmcmVzaFwiLCBvblJlZnJlc2gpO1xyXG4gICAgfTtcclxuICB9LCBbYXBwbHlGaWx0ZXJzLCBjdXJyZW50UGFnZSwgc2V0SXNPcGVuLCBzZXRTaG93RmlsdGVyc10pO1xyXG59O1xyXG4iLCAiaW1wb3J0IHsgdXNlRWZmZWN0LCB0eXBlIERpc3BhdGNoLCB0eXBlIFNldFN0YXRlQWN0aW9uIH0gZnJvbSBcInJlYWN0XCI7XG5cbnR5cGUgQXJncyA9IHtcbiAgc3RhcnREYXRlOiBEYXRlIHwgbnVsbDtcbiAgZW5kRGF0ZTogRGF0ZSB8IG51bGw7XG4gIHNlbGVjdGluZ1N0ZXA6IFwic3RhcnRcIiB8IFwiZW5kXCIgfCBcImRvbmVcIjtcbiAgc2V0U2VsZWN0aW5nU3RlcDogRGlzcGF0Y2g8U2V0U3RhdGVBY3Rpb248XCJzdGFydFwiIHwgXCJlbmRcIiB8IFwiZG9uZVwiPj47XG59O1xuXG4vLyBLZWVwcyB0aGUgbWFudWFsIGRhdGUgcGlja2VyIHN0ZXAgYWxpZ25lZCB3aXRoIHRoZSBzZWxlY3RlZCByYW5nZS5cbmV4cG9ydCBjb25zdCB1c2VIaXN0b3J5UGlja2VyU3RlcFN5bmMgPSAoeyBzdGFydERhdGUsIGVuZERhdGUsIHNlbGVjdGluZ1N0ZXAsIHNldFNlbGVjdGluZ1N0ZXAgfTogQXJncykgPT4ge1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChzdGFydERhdGUgJiYgIWVuZERhdGUgJiYgc2VsZWN0aW5nU3RlcCA9PT0gXCJzdGFydFwiKSB7XG4gICAgICBzZXRTZWxlY3RpbmdTdGVwKFwiZW5kXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIXN0YXJ0RGF0ZSAmJiBzZWxlY3RpbmdTdGVwICE9PSBcInN0YXJ0XCIpIHtcbiAgICAgIHNldFNlbGVjdGluZ1N0ZXAoXCJzdGFydFwiKTtcbiAgICB9XG4gIH0sIFtzdGFydERhdGUsIGVuZERhdGUsIHNlbGVjdGluZ1N0ZXAsIHNldFNlbGVjdGluZ1N0ZXBdKTtcbn07XG4iLCAiXHVGRUZGaW1wb3J0IFJlYWN0LCB7IHVzZU1lbW8sIHVzZVJlZiB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgdHlwZSB7IFRpbWVsaW5lSXRlbSB9IGZyb20gXCIuL0hpc3RvcnlUYWJsZS50c3hcIjtcclxuXHJcbnR5cGUgQWN0aXZpdHlSZWNvcmQgPSBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPjtcclxuXHJcbnR5cGUgVXNlSGlzdG9yeVRpbWVsaW5lSXRlbXNBcmdzID0ge1xyXG4gIGl0ZW1zOiBBY3Rpdml0eVJlY29yZFtdO1xyXG4gIGxvY2FsZTogc3RyaW5nO1xyXG4gIG5vRGF0YVRleHQ6IHN0cmluZztcclxuICBsb2dIaXN0b3J5OiAobWVzc2FnZTogc3RyaW5nLCBkYXRhPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pID0+IHZvaWQ7XHJcbiAgdG9UaXRsZUNhc2U6ICh2YWx1ZTogc3RyaW5nLCBsb2NhbGU6IHN0cmluZykgPT4gc3RyaW5nO1xyXG4gIGZvcm1hdERhdGVQYXJ0czogKHZhbHVlOiBzdHJpbmcsIGxvY2FsZTogc3RyaW5nKSA9PiB7IHllYXI6IHN0cmluZzsgbW9udGg6IHN0cmluZzsgZGF5OiBzdHJpbmcgfTtcclxufTtcclxuXHJcbi8vIE1hcHMgcmF3IGhpc3RvcnkgcGF5bG9hZCBpdGVtcyBpbnRvIHRpbWVsaW5lIGNhcmRzIHVzZWQgYnkgSGlzdG9yeVRhYmxlLlxyXG5leHBvcnQgY29uc3QgdXNlSGlzdG9yeVRpbWVsaW5lSXRlbXMgPSAoe1xyXG4gIGl0ZW1zLFxyXG4gIGxvY2FsZSxcclxuICBub0RhdGFUZXh0LFxyXG4gIGxvZ0hpc3RvcnksXHJcbiAgdG9UaXRsZUNhc2UsXHJcbiAgZm9ybWF0RGF0ZVBhcnRzLFxyXG59OiBVc2VIaXN0b3J5VGltZWxpbmVJdGVtc0FyZ3MpID0+IHtcclxuICBjb25zdCBkZWJ1Z0xvZ2dlZFJlZiA9IHVzZVJlZigwKTtcclxuXHJcbiAgY29uc3QgdGltZWxpbmVJdGVtczogVGltZWxpbmVJdGVtW10gPSB1c2VNZW1vKCgpID0+IHtcclxuICAgIHJldHVybiBpdGVtcy5tYXAoKGVudHJ5KSA9PiB7XHJcbiAgICAgIGNvbnN0IGFjdGl2aWRhZElkUmF3ID0gKGVudHJ5LmFjdGl2aWRhZElkID8/IGVudHJ5LkFjdGl2aWRhZElkID8/IFwiXCIpLnRvU3RyaW5nKCkudHJpbSgpO1xyXG4gICAgICBjb25zdCBhY3RpdmlkYWRJZCA9IGFjdGl2aWRhZElkUmF3IHx8IFwiXCI7XHJcbiAgICAgIGNvbnN0IHJlY0lkUmF3ID0gZW50cnkucmVjSWQgPz8gZW50cnkuUmVjSWQgPz8gXCJcIjtcclxuICAgICAgY29uc3QgcmVjSWQgPSByZWNJZFJhdyAmJiAhTnVtYmVyLmlzTmFOKE51bWJlcihyZWNJZFJhdykpID8gTnVtYmVyKHJlY0lkUmF3KSA6IG51bGw7XHJcbiAgICAgIGxldCBsaW5rSWQgPSBhY3RpdmlkYWRJZCB8fCAocmVjSWQgPyByZWNJZC50b1N0cmluZygpIDogXCJcIik7XHJcblxyXG4gICAgICBpZiAoZGVidWdMb2dnZWRSZWYuY3VycmVudCA8IDUpIHtcclxuICAgICAgICBsb2dIaXN0b3J5KFwiYWN0aXZpdHkgaXRlbVwiLCB7IGFjdGl2aWRhZElkLCByZWNJZFJhdywgcmVjSWQgfSk7XHJcbiAgICAgICAgZGVidWdMb2dnZWRSZWYuY3VycmVudCArPSAxO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCByYXdOYW1lID0gKGVudHJ5Lm5hbWUgPz8gZW50cnkuTmFtZSA/PyBcIlwiKS50b1N0cmluZygpLnRyaW0oKTtcclxuICAgICAgY29uc3QgZnVsbE5hbWUgPSB0b1RpdGxlQ2FzZShyYXdOYW1lLCBsb2NhbGUpO1xyXG4gICAgICBjb25zdCBmZWNoYSA9IChlbnRyeS50cmFuc0RhdGUgPz8gZW50cnkuVHJhbnNEYXRlID8/IFwiXCIpLnRvU3RyaW5nKCk7XHJcbiAgICAgIGNvbnN0IHJhd0Rlc2MgPSAoZW50cnkuZGVzY3JpcHRpb24gPz8gZW50cnkuRGVzY3JpcHRpb24gPz8gXCJcIikudG9TdHJpbmcoKS50cmltKCk7XHJcbiAgICAgIGNvbnN0IGZ1bGxEZXNjID0gcmF3RGVzYztcclxuXHJcbiAgICAgIGNvbnN0IGlzTm9EYXRhQ2FyZCA9ICFyYXdOYW1lICYmICFyYXdEZXNjO1xyXG4gICAgICBpZiAoaXNOb0RhdGFDYXJkKSB7XHJcbiAgICAgICAgbGlua0lkID0gXCJcIjtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBpZDogbGlua0lkLFxyXG4gICAgICAgIGFjdGl2aWRhZElkLFxyXG4gICAgICAgIHJlY0lkLFxyXG4gICAgICAgIG5hbWU6IGZ1bGxOYW1lLFxyXG4gICAgICAgIGRlc2NyaXB0aW9uOiBmdWxsRGVzYyB8fCBub0RhdGFUZXh0LFxyXG4gICAgICAgIGZ1bGxOYW1lLFxyXG4gICAgICAgIGZ1bGxEZXNjLFxyXG4gICAgICAgIGRhdGVQYXJ0czogZm9ybWF0RGF0ZVBhcnRzKGZlY2hhLCBsb2NhbGUpLFxyXG4gICAgICAgIGlzTm9EYXRhOiBpc05vRGF0YUNhcmQsXHJcbiAgICAgIH07XHJcbiAgICB9KTtcclxuICB9LCBbZm9ybWF0RGF0ZVBhcnRzLCBpdGVtcywgbG9jYWxlLCBsb2dIaXN0b3J5LCBub0RhdGFUZXh0LCB0b1RpdGxlQ2FzZV0pO1xyXG5cclxuICByZXR1cm4geyB0aW1lbGluZUl0ZW1zIH07XHJcbn07XHJcbiIsICJpbXBvcnQgeyB1c2VNZW1vIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBzaG93UGVybWlzc2lvbk1vZGFsIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3Blcm1pc3Npb25zLnRzXCI7XG5pbXBvcnQgeyB1c2VNb2R1bGVEYXRhVmlzaWJpbGl0eSB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VNb2R1bGVEYXRhVmlzaWJpbGl0eS50c1wiO1xuaW1wb3J0IHsgZm9ybWF0TW9kdWxlVmlzaWJsZVVzZXJMYWJlbCwgZ2V0VmlzaWJsZVVzZXJGb3JPd25lciB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9tb2R1bGVEYXRhVmlzaWJpbGl0eS50c1wiO1xuXG50eXBlIEFyZ3MgPSB7XG4gIGVuYWJsZWQ6IGJvb2xlYW47XG4gIGNvbXBhbnlJZDogc3RyaW5nO1xuICBheFVzZXJJZDogc3RyaW5nO1xuICBwZXJtaXNzaW9uc1JldmlzaW9uOiBzdHJpbmc7XG4gIHNlbGVjdGVkT3duZXJBeFVzZXJJZDogc3RyaW5nO1xuICBvbkRlYnVnOiAobWVzc2FnZTogc3RyaW5nLCBkYXRhPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pID0+IHZvaWQ7XG59O1xuXG5jb25zdCBBUFBfQ09ERSA9IFwiQ1JNXCI7XG5jb25zdCBNT0RVTEVfQ09ERSA9IFwiVklTSVRBU19HRVNUSU9OXCI7XG5cbi8vIExvYWRzIHZpc2libGUgdmlzaXQgb3duZXJzIGFuZCByZXNvbHZlcyB0aGUgY3VycmVudGx5IHNlbGVjdGVkIG93bmVyIHNhZmVseS5cbmV4cG9ydCBjb25zdCB1c2VIaXN0b3J5VmlzaWJsZU93bmVyID0gKHtcbiAgZW5hYmxlZCxcbiAgY29tcGFueUlkLFxuICBheFVzZXJJZCxcbiAgcGVybWlzc2lvbnNSZXZpc2lvbixcbiAgc2VsZWN0ZWRPd25lckF4VXNlcklkLFxuICBvbkRlYnVnLFxufTogQXJncykgPT4ge1xuICBjb25zdCB7XG4gICAgdmlzaWJsZVVzZXJzLFxuICAgIHZpc2libGVVc2VyQnlPd25lckF4VXNlcklkLFxuICAgIHZpc2libGVVc2Vyc0xvYWRpbmcsXG4gICAgdmlzaWJsZVVzZXJzRXJyb3IsXG4gICAgdmlzaWJsZVVzZXJzUmVhZHksXG4gIH0gPSB1c2VNb2R1bGVEYXRhVmlzaWJpbGl0eSh7XG4gICAgZW5hYmxlZCxcbiAgICBjb21wYW55SWQsXG4gICAgYXhVc2VySWQsXG4gICAgcGVybWlzc2lvbnNSZXZpc2lvbixcbiAgICBhcHBDb2RlOiBBUFBfQ09ERSxcbiAgICBtb2R1bGVDb2RlOiBNT0RVTEVfQ09ERSxcbiAgICBwcmVsb2FkZWRVc2VyczogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdy5fX0lORF9WSVNJQkxFX1ZJU0lUX1VTRVJTX18gOiB1bmRlZmluZWQsXG4gICAgb25Gb3JiaWRkZW46IHNob3dQZXJtaXNzaW9uTW9kYWwsXG4gICAgb25EZWJ1ZyxcbiAgfSk7XG5cbiAgY29uc3Qgc2VsZWN0ZWRPd25lciA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIHJldHVybiBnZXRWaXNpYmxlVXNlckZvck93bmVyKHZpc2libGVVc2VyQnlPd25lckF4VXNlcklkLCBzZWxlY3RlZE93bmVyQXhVc2VySWQpO1xuICB9LCBbc2VsZWN0ZWRPd25lckF4VXNlcklkLCB2aXNpYmxlVXNlckJ5T3duZXJBeFVzZXJJZF0pO1xuXG4gIHJldHVybiB7XG4gICAgdmlzaWJsZVZpc2l0VXNlcnM6IHZpc2libGVVc2VycyxcbiAgICB2aXNpYmxlVXNlcnNMb2FkaW5nLFxuICAgIHZpc2libGVVc2Vyc0Vycm9yLFxuICAgIHZpc2libGVVc2Vyc1JlYWR5LFxuICAgIHNlbGVjdGVkT3duZXJUZXh0OiBzZWxlY3RlZE93bmVyID8gZm9ybWF0TW9kdWxlVmlzaWJsZVVzZXJMYWJlbChzZWxlY3RlZE93bmVyKSA6IFwiXCIsXG4gICAgZWZmZWN0aXZlU2VsZWN0ZWRPd25lckF4VXNlcklkOiBzZWxlY3RlZE93bmVyPy5heFVzZXJJZCB8fCBcIlwiLFxuICB9O1xufTtcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IEFwaUZldGNoRXJyb3IsIGZldGNoSnNvbiB9IGZyb20gXCIuLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5cclxuZXhwb3J0IHR5cGUgSGlzdG9yeUFjdGl2aXR5SXRlbSA9IHtcclxuICBhY3RpdmlkYWRJZD86IHN0cmluZyB8IG51bWJlcjtcclxuICBBY3RpdmlkYWRJZD86IHN0cmluZyB8IG51bWJlcjtcclxuICByZWNJZD86IHN0cmluZyB8IG51bWJlcjtcclxuICBSZWNJZD86IHN0cmluZyB8IG51bWJlcjtcclxuICBuYW1lPzogc3RyaW5nO1xyXG4gIE5hbWU/OiBzdHJpbmc7XHJcbiAgdHJhbnNEYXRlPzogc3RyaW5nO1xyXG4gIFRyYW5zRGF0ZT86IHN0cmluZztcclxuICBkZXNjcmlwdGlvbj86IHN0cmluZztcclxuICBEZXNjcmlwdGlvbj86IHN0cmluZztcclxufTtcclxuXHJcbnR5cGUgSGlzdG9yeVJlc3BvbnNlID0ge1xyXG4gIGl0ZW1zPzogSGlzdG9yeUFjdGl2aXR5SXRlbVtdO1xyXG4gIHRvdGFsPzogbnVtYmVyO1xyXG59O1xyXG5cclxudHlwZSBMb2FkT3ZlcnJpZGUgPSB7XG4gIGZyb21EYXRlOiBzdHJpbmc7XG4gIHRvRGF0ZTogc3RyaW5nO1xuICBhY2NvdW50TnVtPzogc3RyaW5nO1xuICBvd25lckF4VXNlcklkPzogc3RyaW5nO1xufTtcblxyXG50eXBlIFVzZUhpc3RvcnlBY3Rpdml0aWVzQXJncyA9IHtcclxuICBmcm9tRGF0ZVZhbHVlOiBzdHJpbmc7XG4gIHRvRGF0ZVZhbHVlOiBzdHJpbmc7XG4gIGFjY291bnROdW1WYWx1ZTogc3RyaW5nO1xuICBvd25lckF4VXNlcklkVmFsdWU/OiBzdHJpbmc7XG4gIHBhZ2VTaXplOiBudW1iZXI7XG4gIHJldHJ5RGVsYXlNcz86IG51bWJlcjtcclxuICBub3JtYWxpemVSYW5nZTogKGZyb206IHN0cmluZywgdG86IHN0cmluZykgPT4geyBmcm9tOiBzdHJpbmc7IHRvOiBzdHJpbmcgfTtcclxuICBvbkZvcmJpZGRlbjogKCkgPT4gdm9pZDtcclxuICBvbkRlYnVnPzogKG1lc3NhZ2U6IHN0cmluZywgZGF0YT86IFJlY29yZDxzdHJpbmcsIHVua25vd24+KSA9PiB2b2lkO1xyXG59O1xyXG5cclxuLy8gQ2VudHJhbGl6ZXMgaGlzdG9yeSBmZXRjaC9yZXRyeSBsb2dpYyB0byBrZWVwIHBhZ2UgY29tcG9uZW50cyBzbWFsbGVyLlxyXG5leHBvcnQgY29uc3QgdXNlSGlzdG9yeUFjdGl2aXRpZXMgPSAoe1xyXG4gIGZyb21EYXRlVmFsdWUsXG4gIHRvRGF0ZVZhbHVlLFxuICBhY2NvdW50TnVtVmFsdWUsXG4gIG93bmVyQXhVc2VySWRWYWx1ZSA9IFwiXCIsXG4gIHBhZ2VTaXplLFxuICByZXRyeURlbGF5TXMgPSA2MDAsXHJcbiAgbm9ybWFsaXplUmFuZ2UsXHJcbiAgb25Gb3JiaWRkZW4sXHJcbiAgb25EZWJ1ZyxcclxufTogVXNlSGlzdG9yeUFjdGl2aXRpZXNBcmdzKSA9PiB7XHJcbiAgY29uc3QgW2l0ZW1zLCBzZXRJdGVtc10gPSB1c2VTdGF0ZTxIaXN0b3J5QWN0aXZpdHlJdGVtW10+KFtdKTtcclxuICBjb25zdCBbdG90YWwsIHNldFRvdGFsXSA9IHVzZVN0YXRlKDApO1xyXG4gIGNvbnN0IFtjdXJyZW50UGFnZSwgc2V0Q3VycmVudFBhZ2VdID0gdXNlU3RhdGUoMSk7XHJcbiAgY29uc3QgW2lzTG9hZGluZywgc2V0SXNMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbZXJyb3JNZXNzYWdlLCBzZXRFcnJvck1lc3NhZ2VdID0gdXNlU3RhdGUoXCJcIik7XHJcblxyXG4gIGNvbnN0IHJldHJ5T25OZXR3b3JrRXJyb3JSZWYgPSB1c2VSZWYoZmFsc2UpO1xyXG4gIGNvbnN0IGFjdGl2ZUFib3J0UmVmID0gdXNlUmVmPEFib3J0Q29udHJvbGxlciB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IGFjdGl2ZVJlcXVlc3RJZFJlZiA9IHVzZVJlZigwKTtcclxuICBjb25zdCByZXRyeVRpbWVyUmVmID0gdXNlUmVmPG51bWJlciB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IGxhc3RTaWduYXR1cmVSZWYgPSB1c2VSZWYoXCJcIik7XHJcblxyXG4gIGNvbnN0IGNsZWFyUmV0cnlUaW1lciA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmIChyZXRyeVRpbWVyUmVmLmN1cnJlbnQpIHtcclxuICAgICAgY2xlYXJUaW1lb3V0KHJldHJ5VGltZXJSZWYuY3VycmVudCk7XHJcbiAgICAgIHJldHJ5VGltZXJSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICB9XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBhYm9ydEFjdGl2ZVJlcXVlc3QgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAoIWFjdGl2ZUFib3J0UmVmLmN1cnJlbnQpIHJldHVybjtcclxuICAgIHRyeSB7XHJcbiAgICAgIGFjdGl2ZUFib3J0UmVmLmN1cnJlbnQuYWJvcnQoKTtcclxuICAgIH0gY2F0Y2gge1xyXG4gICAgICAvLyBJZ25vcmUgYWJvcnQgZXJyb3JzLlxyXG4gICAgfVxyXG4gICAgYWN0aXZlQWJvcnRSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCByZXNldEFjdGl2aXRpZXMgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBjbGVhclJldHJ5VGltZXIoKTtcclxuICAgIGFib3J0QWN0aXZlUmVxdWVzdCgpO1xyXG4gICAgc2V0SXRlbXMoW10pO1xyXG4gICAgc2V0VG90YWwoMCk7XHJcbiAgICBzZXRFcnJvck1lc3NhZ2UoXCJcIik7XHJcbiAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xyXG4gIH0sIFthYm9ydEFjdGl2ZVJlcXVlc3QsIGNsZWFyUmV0cnlUaW1lcl0pO1xyXG5cclxuICBjb25zdCBsb2FkQWN0aXZpdGllcyA9IHVzZUNhbGxiYWNrKFxyXG4gICAgYXN5bmMgKHBhZ2U6IG51bWJlciwgb3ZlcnJpZGU/OiBMb2FkT3ZlcnJpZGUpID0+IHtcclxuICAgICAgY29uc3QgZnJvbURhdGVTdHIgPSBvdmVycmlkZT8uZnJvbURhdGUgPz8gZnJvbURhdGVWYWx1ZTtcbiAgICAgIGNvbnN0IHRvRGF0ZVN0ciA9IG92ZXJyaWRlPy50b0RhdGUgPz8gdG9EYXRlVmFsdWU7XG4gICAgICBjb25zdCBhY2NvdW50TnVtU3RyID0gb3ZlcnJpZGU/LmFjY291bnROdW0gPz8gYWNjb3VudE51bVZhbHVlO1xuICAgICAgY29uc3Qgb3duZXJBeFVzZXJJZFN0ciA9IG92ZXJyaWRlPy5vd25lckF4VXNlcklkID8/IG93bmVyQXhVc2VySWRWYWx1ZTtcblxyXG4gICAgICBpZiAoIWZyb21EYXRlU3RyIHx8ICF0b0RhdGVTdHIpIHtcclxuICAgICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xyXG4gICAgICAgIHNldEl0ZW1zKFtdKTtcclxuICAgICAgICBzZXRUb3RhbCgwKTtcclxuICAgICAgICBzZXRFcnJvck1lc3NhZ2UoXCJcIik7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzZXRDdXJyZW50UGFnZShwYWdlKTtcclxuICAgICAgY2xlYXJSZXRyeVRpbWVyKCk7XHJcblxyXG4gICAgICBjb25zdCByZXF1ZXN0SWQgPSArK2FjdGl2ZVJlcXVlc3RJZFJlZi5jdXJyZW50O1xyXG4gICAgICBhYm9ydEFjdGl2ZVJlcXVlc3QoKTtcclxuXHJcbiAgICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XHJcbiAgICAgIGFjdGl2ZUFib3J0UmVmLmN1cnJlbnQgPSBjb250cm9sbGVyO1xyXG5cclxuICAgICAgY29uc3Qgbm9ybWFsaXplZCA9IG5vcm1hbGl6ZVJhbmdlKGZyb21EYXRlU3RyLCB0b0RhdGVTdHIpO1xyXG4gICAgICBjb25zdCBub3JtYWxpemVkT3duZXJBeFVzZXJJZCA9IG93bmVyQXhVc2VySWRTdHIudHJpbSgpO1xuICAgICAgY29uc3QgZmlsdGVyU2lnbmF0dXJlID0gYCR7bm9ybWFsaXplZC5mcm9tfXwke25vcm1hbGl6ZWQudG99fCR7YWNjb3VudE51bVN0cn18JHtub3JtYWxpemVkT3duZXJBeFVzZXJJZH18JHtwYWdlfWA7XG4gICAgICBsYXN0U2lnbmF0dXJlUmVmLmN1cnJlbnQgPSBmaWx0ZXJTaWduYXR1cmU7XG5cclxuICAgICAgc2V0SXNMb2FkaW5nKHRydWUpO1xyXG4gICAgICBzZXRJdGVtcyhbXSk7XHJcbiAgICAgIHNldFRvdGFsKDApO1xyXG4gICAgICBzZXRFcnJvck1lc3NhZ2UoXCJcIik7XHJcblxyXG4gICAgICBjb25zdCBwYXlsb2FkOiB7XG4gICAgICAgIGZyb21EYXRlOiBzdHJpbmc7XG4gICAgICAgIHRvRGF0ZTogc3RyaW5nO1xuICAgICAgICBhY2NvdW50TnVtOiBzdHJpbmc7XG4gICAgICAgIG93bmVyQXhVc2VySWQ/OiBzdHJpbmc7XG4gICAgICB9ID0ge1xuICAgICAgICBmcm9tRGF0ZTogbm9ybWFsaXplZC5mcm9tLFxuICAgICAgICB0b0RhdGU6IG5vcm1hbGl6ZWQudG8sXG4gICAgICAgIGFjY291bnROdW06IGFjY291bnROdW1TdHIsXG4gICAgICB9O1xuICAgICAgaWYgKG5vcm1hbGl6ZWRPd25lckF4VXNlcklkKSB7XG4gICAgICAgIHBheWxvYWQub3duZXJBeFVzZXJJZCA9IG5vcm1hbGl6ZWRPd25lckF4VXNlcklkO1xuICAgICAgfVxuXHJcbiAgICAgIG9uRGVidWc/LihcImxvYWRBY3Rpdml0aWVzOnJlcXVlc3RcIiwgeyBwYWdlLCBwYWdlU2l6ZSwgcGF5bG9hZCB9KTtcclxuXHJcbiAgICAgIGxldCBkYXRhOiBIaXN0b3J5UmVzcG9uc2U7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgZGF0YSA9IGF3YWl0IGZldGNoSnNvbjxIaXN0b3J5UmVzcG9uc2U+KGAvSGlzdG9yaWFsL0dldEFjdGl2aXRpZXM/cGFnZT0ke3BhZ2V9JnBhZ2VTaXplPSR7cGFnZVNpemV9YCwge1xyXG4gICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcclxuICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHBheWxvYWQpLFxyXG4gICAgICAgICAgc2lnbmFsOiBjb250cm9sbGVyLnNpZ25hbCxcclxuICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGNhdGNoIChlcnI6IGFueSkge1xyXG4gICAgICAgIGlmIChyZXF1ZXN0SWQgIT09IGFjdGl2ZVJlcXVlc3RJZFJlZi5jdXJyZW50KSByZXR1cm47XHJcbiAgICAgICAgaWYgKGVycj8ubmFtZSA9PT0gXCJBYm9ydEVycm9yXCIpIHtcclxuICAgICAgICAgIGFjdGl2ZUFib3J0UmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGVyciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IgJiYgZXJyLnN0YXR1cyA9PT0gNDAzKSB7XHJcbiAgICAgICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xyXG4gICAgICAgICAgYWN0aXZlQWJvcnRSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgICAgICBvbkZvcmJpZGRlbigpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgaXNOZXR3b3JrRXJyb3IgPSAhKGVyciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IpIHx8IHR5cGVvZiBlcnIuc3RhdHVzICE9PSBcIm51bWJlclwiO1xyXG4gICAgICAgIGlmIChpc05ldHdvcmtFcnJvciAmJiByZXRyeU9uTmV0d29ya0Vycm9yUmVmLmN1cnJlbnQpIHtcclxuICAgICAgICAgIHJldHJ5T25OZXR3b3JrRXJyb3JSZWYuY3VycmVudCA9IGZhbHNlO1xyXG4gICAgICAgICAgYWN0aXZlQWJvcnRSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgICAgICByZXRyeVRpbWVyUmVmLmN1cnJlbnQgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0SWQgIT09IGFjdGl2ZVJlcXVlc3RJZFJlZi5jdXJyZW50KSByZXR1cm47XHJcbiAgICAgICAgICAgIGlmIChsYXN0U2lnbmF0dXJlUmVmLmN1cnJlbnQgIT09IGZpbHRlclNpZ25hdHVyZSkgcmV0dXJuO1xyXG4gICAgICAgICAgICBsb2FkQWN0aXZpdGllcyhwYWdlLCB7XHJcbiAgICAgICAgICAgICAgZnJvbURhdGU6IGZyb21EYXRlU3RyLFxuICAgICAgICAgICAgICB0b0RhdGU6IHRvRGF0ZVN0cixcbiAgICAgICAgICAgICAgYWNjb3VudE51bTogYWNjb3VudE51bVN0cixcbiAgICAgICAgICAgICAgb3duZXJBeFVzZXJJZDogbm9ybWFsaXplZE93bmVyQXhVc2VySWQsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LCByZXRyeURlbGF5TXMpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xyXG4gICAgICAgIHNldEVycm9yTWVzc2FnZShlcnI/Lm1lc3NhZ2UgfHwgaW5kVChcIkFwaV9SZXF1ZXN0RmFpbGVkXCIsIFwiTm8gc2UgcHVkbyBjb25lY3RhciBjb24gZWwgc2Vydmlkb3IgKHJlZCkuXCIpKTtcclxuICAgICAgICBhY3RpdmVBYm9ydFJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChyZXF1ZXN0SWQgIT09IGFjdGl2ZVJlcXVlc3RJZFJlZi5jdXJyZW50KSByZXR1cm47XHJcblxyXG4gICAgICBvbkRlYnVnPy4oXCJsb2FkQWN0aXZpdGllczpyZXNwb25zZVwiLCB7XHJcbiAgICAgICAgc3RhdHVzOiAyMDAsXHJcbiAgICAgICAgdG90YWw6IGRhdGE/LnRvdGFsID8/IDAsXHJcbiAgICAgICAgY291bnQ6IEFycmF5LmlzQXJyYXkoZGF0YT8uaXRlbXMpID8gZGF0YS5pdGVtcy5sZW5ndGggOiAwLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XHJcbiAgICAgIHNldEl0ZW1zKGRhdGEuaXRlbXMgfHwgW10pO1xyXG4gICAgICBzZXRUb3RhbChkYXRhLnRvdGFsIHx8IChkYXRhLml0ZW1zIHx8IFtdKS5sZW5ndGgpO1xyXG4gICAgICBhY3RpdmVBYm9ydFJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgIH0sXHJcbiAgICBbXHJcbiAgICAgIGFib3J0QWN0aXZlUmVxdWVzdCxcclxuICAgICAgYWNjb3VudE51bVZhbHVlLFxuICAgICAgY2xlYXJSZXRyeVRpbWVyLFxuICAgICAgZnJvbURhdGVWYWx1ZSxcbiAgICAgIG5vcm1hbGl6ZVJhbmdlLFxuICAgICAgb25EZWJ1ZyxcbiAgICAgIG9uRm9yYmlkZGVuLFxuICAgICAgb3duZXJBeFVzZXJJZFZhbHVlLFxuICAgICAgcGFnZVNpemUsXG4gICAgICByZXRyeURlbGF5TXMsXG4gICAgICB0b0RhdGVWYWx1ZSxcbiAgICBdXHJcbiAgKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIGNsZWFyUmV0cnlUaW1lcigpO1xyXG4gICAgICBhYm9ydEFjdGl2ZVJlcXVlc3QoKTtcclxuICAgIH07XHJcbiAgfSwgW2Fib3J0QWN0aXZlUmVxdWVzdCwgY2xlYXJSZXRyeVRpbWVyXSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBpdGVtcyxcclxuICAgIHRvdGFsLFxyXG4gICAgY3VycmVudFBhZ2UsXHJcbiAgICBpc0xvYWRpbmcsXHJcbiAgICBlcnJvck1lc3NhZ2UsXHJcbiAgICBsb2FkQWN0aXZpdGllcyxcclxuICAgIHJlc2V0QWN0aXZpdGllcyxcclxuICAgIHJldHJ5T25OZXR3b3JrRXJyb3JSZWYsXHJcbiAgICBsYXN0U2lnbmF0dXJlUmVmLFxyXG4gIH07XHJcbn07XHJcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjayB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBISVNUT1JZX0ZJTFRFUl9LRVksIEhJU1RPUllfUkVUVVJOX0ZMQUdfS0VZIH0gZnJvbSBcIi4uL3V0aWxzL3Zpc2l0YXNIaXN0b3J5LnRzXCI7XHJcbmltcG9ydCB7XHJcbiAgZ2V0U2Vzc2lvbkpzb25XaXRoRXhwaXJ5LFxyXG4gIGdldFNlc3Npb25WYWx1ZVdpdGhFeHBpcnksXHJcbiAgcmVtb3ZlU2Vzc2lvblZhbHVlV2l0aEV4cGlyeSxcclxuICBzZXRTZXNzaW9uSnNvbldpdGhFeHBpcnksXHJcbiAgc2V0U2Vzc2lvblZhbHVlV2l0aEV4cGlyeSxcclxufSBmcm9tIFwiLi4vdXRpbHMvc2Vzc2lvbkV4cGlyeS50c1wiO1xyXG5cclxuZXhwb3J0IHR5cGUgSGlzdG9yeUNhY2hlZEZpbHRlciA9IHtcbiAgZnJvbURhdGU6IHN0cmluZztcbiAgdG9EYXRlOiBzdHJpbmc7XG4gIHBhZ2U/OiBudW1iZXI7XG4gIGNsaWVudEFjY291bnQ/OiBzdHJpbmc7XG4gIGNsaWVudFRleHQ/OiBzdHJpbmc7XG4gIG93bmVyQXhVc2VySWQ/OiBzdHJpbmc7XG4gIG93bmVyVGV4dD86IHN0cmluZztcbn07XG5cclxuY29uc3QgSElTVE9SWV9DQUNIRV9UVExfTVMgPSAxMiAqIDYwICogNjAgKiAxMDAwO1xyXG5cclxuY29uc3Qgbm9ybWFsaXplQ2FjaGVkRmlsdGVyID0gKHZhbHVlOiBIaXN0b3J5Q2FjaGVkRmlsdGVyIHwgbnVsbCk6IEhpc3RvcnlDYWNoZWRGaWx0ZXIgfCBudWxsID0+IHtcclxuICBpZiAoIXZhbHVlIHx8IHR5cGVvZiB2YWx1ZSAhPT0gXCJvYmplY3RcIikgcmV0dXJuIG51bGw7XHJcbiAgcmV0dXJuIHtcclxuICAgIGZyb21EYXRlOiB2YWx1ZS5mcm9tRGF0ZSB8fCBcIlwiLFxyXG4gICAgdG9EYXRlOiB2YWx1ZS50b0RhdGUgfHwgXCJcIixcclxuICAgIHBhZ2U6IHZhbHVlLnBhZ2UsXG4gICAgY2xpZW50QWNjb3VudDogdmFsdWUuY2xpZW50QWNjb3VudCB8fCBcIlwiLFxuICAgIGNsaWVudFRleHQ6IHZhbHVlLmNsaWVudFRleHQgfHwgXCJcIixcbiAgICBvd25lckF4VXNlcklkOiB2YWx1ZS5vd25lckF4VXNlcklkIHx8IFwiXCIsXG4gICAgb3duZXJUZXh0OiB2YWx1ZS5vd25lclRleHQgfHwgXCJcIixcbiAgfTtcbn07XG5cclxuLy8gS2VlcHMgaGlzdG9yeSBmaWx0ZXIgY2FjaGUgcmVhZHMvd3JpdGVzIGluIG9uZSBwbGFjZS5cclxuZXhwb3J0IGNvbnN0IHVzZUhpc3RvcnlGaWx0ZXJDYWNoZSA9ICgpID0+IHtcclxuICBjb25zdCByZWFkQ2FjaGVkRmlsdGVyID0gdXNlQ2FsbGJhY2soKCk6IEhpc3RvcnlDYWNoZWRGaWx0ZXIgfCBudWxsID0+IHtcclxuICAgIGNvbnN0IHBhcnNlZCA9IGdldFNlc3Npb25Kc29uV2l0aEV4cGlyeTxIaXN0b3J5Q2FjaGVkRmlsdGVyPihISVNUT1JZX0ZJTFRFUl9LRVkpO1xyXG4gICAgcmV0dXJuIG5vcm1hbGl6ZUNhY2hlZEZpbHRlcihwYXJzZWQpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgY2xlYXJGaWx0ZXJDYWNoZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIHJlbW92ZVNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoSElTVE9SWV9GSUxURVJfS0VZKTtcclxuICAgIHJlbW92ZVNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoSElTVE9SWV9SRVRVUk5fRkxBR19LRVkpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgY29uc3VtZVJldHVybkZsYWcgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBjb25zdCByYXcgPSBnZXRTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KEhJU1RPUllfUkVUVVJOX0ZMQUdfS0VZKTtcclxuICAgIGlmIChyYXcgPT09IFwiMVwiKSB7XHJcbiAgICAgIHJlbW92ZVNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoSElTVE9SWV9SRVRVUk5fRkxBR19LRVkpO1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IHNhdmVDYWNoZWRGaWx0ZXIgPSB1c2VDYWxsYmFjaygoZmlsdGVyOiBIaXN0b3J5Q2FjaGVkRmlsdGVyKSA9PiB7XHJcbiAgICBzZXRTZXNzaW9uSnNvbldpdGhFeHBpcnkoSElTVE9SWV9GSUxURVJfS0VZLCBmaWx0ZXIsIEhJU1RPUllfQ0FDSEVfVFRMX01TKTtcclxuICAgIHNldFNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoSElTVE9SWV9SRVRVUk5fRkxBR19LRVksIFwiMVwiLCBISVNUT1JZX0NBQ0hFX1RUTF9NUyk7XHJcbiAgfSwgW10pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgcmVhZENhY2hlZEZpbHRlcixcclxuICAgIGNsZWFyRmlsdGVyQ2FjaGUsXHJcbiAgICBjb25zdW1lUmV0dXJuRmxhZyxcclxuICAgIHNhdmVDYWNoZWRGaWx0ZXIsXHJcbiAgfTtcclxufTtcclxuIiwgIlx1RkVGRmltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjaywgdXNlTWVtbywgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgdHlwZSB7IE1vdXNlRXZlbnQgYXMgUmVhY3RNb3VzZUV2ZW50IH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB0eXBlIHsgQ2xpZW50T3B0aW9uIH0gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvdmlzaXRhcy9DbGllbnRTZWFyY2hDb21ib2JveC50c3hcIjtcclxuaW1wb3J0IHR5cGUgeyBIaXN0b3J5Q2FjaGVkRmlsdGVyIH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZUhpc3RvcnlGaWx0ZXJDYWNoZS50c1wiO1xyXG5cclxuZXhwb3J0IHR5cGUgUXVpY2tGaWx0ZXJJZCA9IFwiY3VzdG9tXCIgfCBcImRheXMtN1wiIHwgXCJkYXlzLTMwXCIgfCBcImRheXMtOTBcIjtcclxuXHJcbmV4cG9ydCB0eXBlIExvYWRPdmVycmlkZSA9IHtcbiAgZnJvbURhdGU6IHN0cmluZztcbiAgdG9EYXRlOiBzdHJpbmc7XG4gIGFjY291bnROdW0/OiBzdHJpbmc7XG4gIG93bmVyQXhVc2VySWQ/OiBzdHJpbmc7XG59O1xuXHJcbmV4cG9ydCB0eXBlIEZpbHRlckxvYWRSZXF1ZXN0ID0ge1xyXG4gIHBhZ2U6IG51bWJlcjtcclxuICBvdmVycmlkZTogTG9hZE92ZXJyaWRlO1xyXG59O1xyXG5cclxuY29uc3QgSElTVE9SWV9RVUlDS19GSUxURVJfUkFOR0VTOiBBcnJheTx7XHJcbiAgaWQ6IEV4Y2x1ZGU8UXVpY2tGaWx0ZXJJZCwgXCJjdXN0b21cIj47XHJcbiAgZGF5c1RvU3VidHJhY3Q6IG51bWJlcjtcclxufT4gPSBbXHJcbiAgeyBpZDogXCJkYXlzLTdcIiwgZGF5c1RvU3VidHJhY3Q6IDYgfSxcclxuICB7IGlkOiBcImRheXMtMzBcIiwgZGF5c1RvU3VidHJhY3Q6IDI5IH0sXHJcbiAgeyBpZDogXCJkYXlzLTkwXCIsIGRheXNUb1N1YnRyYWN0OiA4OSB9LFxyXG5dO1xyXG5cclxudHlwZSBVc2VIaXN0b3J5RmlsdGVyc1N0YXRlQXJncyA9IHtcclxuICBkZWZhdWx0RnJvbURhdGU6IHN0cmluZztcclxuICBkZWZhdWx0VG9EYXRlOiBzdHJpbmc7XHJcbiAgbG9nSGlzdG9yeTogKG1lc3NhZ2U6IHN0cmluZywgZGF0YT86IFJlY29yZDxzdHJpbmcsIHVua25vd24+KSA9PiB2b2lkO1xyXG4gIHBhcnNlRGF0ZVZhbHVlOiAodmFsdWU6IHN0cmluZykgPT4gRGF0ZSB8IG51bGw7XHJcbiAgcGFyc2VJU086ICh2YWx1ZTogc3RyaW5nKSA9PiBEYXRlIHwgbnVsbDtcclxuICB0b0lTTzogKHZhbHVlOiBEYXRlKSA9PiBzdHJpbmc7XHJcbiAgc3RhcnRPZkRheTogKHZhbHVlOiBEYXRlKSA9PiBEYXRlO1xyXG4gIGlzQmVmb3JlOiAoYTogRGF0ZSB8IG51bGwsIGI6IERhdGUgfCBudWxsKSA9PiBib29sZWFuO1xyXG59O1xyXG5cclxuLy8gRW5jYXBzdWxhdGVzIGhpc3RvcnkgZmlsdGVyIHN0YXRlIGFuZCBkYXRlLXJhbmdlIG9yY2hlc3RyYXRpb24uXHJcbmV4cG9ydCBjb25zdCB1c2VIaXN0b3J5RmlsdGVyc1N0YXRlID0gKHtcclxuICBkZWZhdWx0RnJvbURhdGUsXHJcbiAgZGVmYXVsdFRvRGF0ZSxcclxuICBsb2dIaXN0b3J5LFxyXG4gIHBhcnNlRGF0ZVZhbHVlLFxyXG4gIHBhcnNlSVNPLFxyXG4gIHRvSVNPLFxyXG4gIHN0YXJ0T2ZEYXksXHJcbiAgaXNCZWZvcmUsXHJcbn06IFVzZUhpc3RvcnlGaWx0ZXJzU3RhdGVBcmdzKSA9PiB7XHJcbiAgY29uc3QgcmVzb2x2ZVF1aWNrRmlsdGVyRnJvbVJhbmdlID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoc3RhcnQ6IERhdGUgfCBudWxsLCBlbmQ6IERhdGUgfCBudWxsKTogUXVpY2tGaWx0ZXJJZCB8IG51bGwgPT4ge1xyXG4gICAgICBpZiAoIXN0YXJ0IHx8ICFlbmQpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3Qgbm9ybWFsaXplZFN0YXJ0ID0gc3RhcnRPZkRheShzdGFydCk7XHJcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRFbmQgPSBzdGFydE9mRGF5KGVuZCk7XHJcbiAgICAgIGNvbnN0IHRvZGF5ID0gc3RhcnRPZkRheShuZXcgRGF0ZSgpKTtcclxuICAgICAgaWYgKHRvSVNPKG5vcm1hbGl6ZWRFbmQpICE9PSB0b0lTTyh0b2RheSkpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgfVxyXG5cclxuICAgICAgZm9yIChjb25zdCBlbnRyeSBvZiBISVNUT1JZX1FVSUNLX0ZJTFRFUl9SQU5HRVMpIHtcclxuICAgICAgICBjb25zdCBjYW5kaWRhdGVTdGFydCA9IG5ldyBEYXRlKHRvZGF5KTtcclxuICAgICAgICBjYW5kaWRhdGVTdGFydC5zZXREYXRlKHRvZGF5LmdldERhdGUoKSAtIGVudHJ5LmRheXNUb1N1YnRyYWN0KTtcclxuICAgICAgICBpZiAodG9JU08obm9ybWFsaXplZFN0YXJ0KSA9PT0gdG9JU08oY2FuZGlkYXRlU3RhcnQpKSB7XHJcbiAgICAgICAgICByZXR1cm4gZW50cnkuaWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH0sXHJcbiAgICBbc3RhcnRPZkRheSwgdG9JU09dXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgW3N0YXJ0RGF0ZSwgc2V0U3RhcnREYXRlXSA9IHVzZVN0YXRlPERhdGUgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBbZW5kRGF0ZSwgc2V0RW5kRGF0ZV0gPSB1c2VTdGF0ZTxEYXRlIHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgW21hbnVhbFN0YXJ0RGF0ZSwgc2V0TWFudWFsU3RhcnREYXRlXSA9IHVzZVN0YXRlPERhdGUgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBbbWFudWFsRW5kRGF0ZSwgc2V0TWFudWFsRW5kRGF0ZV0gPSB1c2VTdGF0ZTxEYXRlIHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgW2hvdmVyRGF0ZSwgc2V0SG92ZXJEYXRlXSA9IHVzZVN0YXRlPERhdGUgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBbc2VsZWN0aW5nU3RlcCwgc2V0U2VsZWN0aW5nU3RlcF0gPSB1c2VTdGF0ZTxcInN0YXJ0XCIgfCBcImVuZFwiIHwgXCJkb25lXCI+KFwic3RhcnRcIik7XHJcbiAgY29uc3QgW2N1cnJlbnRNb250aCwgc2V0Q3VycmVudE1vbnRoXSA9IHVzZVN0YXRlKG5ldyBEYXRlKCkuZ2V0TW9udGgoKSk7XHJcbiAgY29uc3QgW2N1cnJlbnRZZWFyLCBzZXRDdXJyZW50WWVhcl0gPSB1c2VTdGF0ZShuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCkpO1xyXG4gIGNvbnN0IFtpc09wZW4sIHNldElzT3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW3Nob3dNYW51YWxQaWNrZXJQYW5lbCwgc2V0U2hvd01hbnVhbFBpY2tlclBhbmVsXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbYWN0aXZlUXVpY2tGaWx0ZXIsIHNldEFjdGl2ZVF1aWNrRmlsdGVyXSA9IHVzZVN0YXRlPFF1aWNrRmlsdGVySWQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW3NlbGVjdGVkQ2xpZW50LCBzZXRTZWxlY3RlZENsaWVudF0gPSB1c2VTdGF0ZTxDbGllbnRPcHRpb24gfCBudWxsPihudWxsKTtcbiAgY29uc3QgW3NlbGVjdGVkT3duZXJBeFVzZXJJZCwgc2V0U2VsZWN0ZWRPd25lckF4VXNlcklkXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbY2xpZW50UmVzZXRLZXksIHNldENsaWVudFJlc2V0S2V5XSA9IHVzZVN0YXRlKDApO1xuICBjb25zdCBbc2hvd0ZpbHRlcnMsIHNldFNob3dGaWx0ZXJzXSA9IHVzZVN0YXRlKHRydWUpO1xyXG4gIGNvbnN0IFtzaG93TWFudWFsRXJyb3IsIHNldFNob3dNYW51YWxFcnJvcl0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcblxyXG4gIGNvbnN0IGhhc1Jlc3RvcmVkRmlsdGVyUmVmID0gdXNlUmVmKGZhbHNlKTtcclxuICBjb25zdCBkaWRJbml0RmlsdGVyUmVmID0gdXNlUmVmKGZhbHNlKTtcclxuXHJcbiAgY29uc3QgZnJvbURhdGVWYWx1ZSA9IHVzZU1lbW8oKCkgPT4gKHN0YXJ0RGF0ZSA/IHRvSVNPKHN0YXJ0RGF0ZSkgOiBcIlwiKSwgW3N0YXJ0RGF0ZSwgdG9JU09dKTtcclxuICBjb25zdCB0b0RhdGVWYWx1ZSA9IHVzZU1lbW8oKCkgPT4gKGVuZERhdGUgPyB0b0lTTyhlbmREYXRlKSA6IFwiXCIpLCBbZW5kRGF0ZSwgdG9JU09dKTtcclxuICBjb25zdCBhY2NvdW50TnVtVmFsdWUgPSB1c2VNZW1vKCgpID0+IChzZWxlY3RlZENsaWVudCA/IHNlbGVjdGVkQ2xpZW50LnZhbHVlIDogXCJcIiksIFtzZWxlY3RlZENsaWVudF0pO1xyXG5cclxuICBjb25zdCB2YWxpZGF0ZU1hbnVhbFJhbmdlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKGFjdGl2ZVF1aWNrRmlsdGVyID09PSBcImN1c3RvbVwiICYmICghc3RhcnREYXRlIHx8ICFlbmREYXRlKSkge1xyXG4gICAgICBzZXRTaG93TWFudWFsRXJyb3IodHJ1ZSk7XHJcbiAgICAgIHNldFNlbGVjdGluZ1N0ZXAoIXN0YXJ0RGF0ZSA/IFwic3RhcnRcIiA6IFwiZW5kXCIpO1xyXG4gICAgICBzZXRTaG93TWFudWFsUGlja2VyUGFuZWwodHJ1ZSk7XHJcbiAgICAgIHNldElzT3Blbih0cnVlKTtcclxuICAgICAgc2V0U2hvd0ZpbHRlcnModHJ1ZSk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH0sIFthY3RpdmVRdWlja0ZpbHRlciwgZW5kRGF0ZSwgc3RhcnREYXRlXSk7XHJcblxyXG4gIC8vIEFwcGxpZXMgYSBkZWZhdWx0IGRhdGUgcmFuZ2UgYW5kIHJldHVybnMgdGhlIGxvYWQgcGF5bG9hZCBuZWVkZWQgYnkgdGhlIHBhZ2UuXHJcbiAgY29uc3QgYXBwbHlEZWZhdWx0UmFuZ2VGcm9tUHJvcHMgPSB1c2VDYWxsYmFjaygoKTogRmlsdGVyTG9hZFJlcXVlc3QgfCBudWxsID0+IHtcclxuICAgIGlmICghZGVmYXVsdEZyb21EYXRlIHx8ICFkZWZhdWx0VG9EYXRlKSByZXR1cm4gbnVsbDtcclxuICAgIGNvbnN0IHN0YXJ0UmF3ID0gcGFyc2VEYXRlVmFsdWUoZGVmYXVsdEZyb21EYXRlKTtcclxuICAgIGNvbnN0IGVuZFJhdyA9IHBhcnNlRGF0ZVZhbHVlKGRlZmF1bHRUb0RhdGUpO1xyXG4gICAgaWYgKCFzdGFydFJhdyB8fCAhZW5kUmF3KSByZXR1cm4gbnVsbDtcclxuXHJcbiAgICBjb25zdCBzdGFydERheSA9IHN0YXJ0T2ZEYXkoc3RhcnRSYXcpO1xyXG4gICAgY29uc3QgZW5kRGF5ID0gc3RhcnRPZkRheShlbmRSYXcpO1xyXG5cclxuICAgIGxldCBzdGFydCA9IHN0YXJ0RGF5O1xyXG4gICAgbGV0IGVuZCA9IGVuZERheTtcclxuICAgIGlmIChpc0JlZm9yZShlbmQsIHN0YXJ0KSkge1xyXG4gICAgICBjb25zdCBzd2FwID0gc3RhcnQ7XHJcbiAgICAgIHN0YXJ0ID0gZW5kO1xyXG4gICAgICBlbmQgPSBzd2FwO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFN0YXJ0RGF0ZShzdGFydCk7XHJcbiAgICBzZXRFbmREYXRlKGVuZCk7XHJcbiAgICBzZXRTZWxlY3RpbmdTdGVwKFwiZG9uZVwiKTtcclxuICAgIHNldEhvdmVyRGF0ZShudWxsKTtcclxuICAgIHNldEN1cnJlbnRNb250aChzdGFydC5nZXRNb250aCgpKTtcclxuICAgIHNldEN1cnJlbnRZZWFyKHN0YXJ0LmdldEZ1bGxZZWFyKCkpO1xyXG4gICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIocmVzb2x2ZVF1aWNrRmlsdGVyRnJvbVJhbmdlKHN0YXJ0LCBlbmQpKTtcbiAgICBzZXRTZWxlY3RlZENsaWVudChudWxsKTtcbiAgICBzZXRTZWxlY3RlZE93bmVyQXhVc2VySWQoXCJcIik7XG4gICAgc2V0SXNPcGVuKGZhbHNlKTtcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgcGFnZTogMSxcclxuICAgICAgb3ZlcnJpZGU6IHtcclxuICAgICAgICBmcm9tRGF0ZTogdG9JU08oc3RhcnQpLFxyXG4gICAgICAgIHRvRGF0ZTogdG9JU08oZW5kKSxcclxuICAgICAgICBhY2NvdW50TnVtOiBcIlwiLFxyXG4gICAgICB9LFxyXG4gICAgfTtcclxuICB9LCBbZGVmYXVsdEZyb21EYXRlLCBkZWZhdWx0VG9EYXRlLCBpc0JlZm9yZSwgcGFyc2VEYXRlVmFsdWUsIHJlc29sdmVRdWlja0ZpbHRlckZyb21SYW5nZSwgc3RhcnRPZkRheSwgdG9JU09dKTtcclxuXHJcbiAgLy8gUmVzZXRzIGhpc3RvcnkgZmlsdGVycyBsb2NhbCBzdGF0ZSBvbmx5LlxyXG4gIGNvbnN0IHJlc2V0SGlzdG9yeUZpbHRlcnMgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBzZXRTdGFydERhdGUobnVsbCk7XHJcbiAgICBzZXRFbmREYXRlKG51bGwpO1xyXG4gICAgc2V0TWFudWFsU3RhcnREYXRlKG51bGwpO1xyXG4gICAgc2V0TWFudWFsRW5kRGF0ZShudWxsKTtcclxuICAgIHNldFNlbGVjdGluZ1N0ZXAoXCJzdGFydFwiKTtcclxuICAgIHNldEhvdmVyRGF0ZShudWxsKTtcclxuICAgIHNldEN1cnJlbnRNb250aChuZXcgRGF0ZSgpLmdldE1vbnRoKCkpO1xyXG4gICAgc2V0Q3VycmVudFllYXIobmV3IERhdGUoKS5nZXRGdWxsWWVhcigpKTtcclxuICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKG51bGwpO1xuICAgIHNldFNob3dNYW51YWxQaWNrZXJQYW5lbChmYWxzZSk7XG4gICAgc2V0U2VsZWN0ZWRDbGllbnQobnVsbCk7XG4gICAgc2V0U2VsZWN0ZWRPd25lckF4VXNlcklkKFwiXCIpO1xuICAgIHNldENsaWVudFJlc2V0S2V5KChwcmV2KSA9PiBwcmV2ICsgMSk7XG4gICAgc2V0U2hvd01hbnVhbEVycm9yKGZhbHNlKTtcclxuICB9LCBbXSk7XHJcblxyXG4gIC8vIEFwcGxpZXMgY2FjaGVkIGZpbHRlcnMgYW5kIHJldHVybnMgdGhlIGxvYWQgcGF5bG9hZCBuZWVkZWQgYnkgdGhlIHBhZ2UuXHJcbiAgY29uc3QgYXBwbHlDYWNoZWRGaWx0ZXIgPSB1c2VDYWxsYmFjayhcclxuICAgIChmaWx0ZXI6IEhpc3RvcnlDYWNoZWRGaWx0ZXIgfCBudWxsKTogRmlsdGVyTG9hZFJlcXVlc3QgfCBudWxsID0+IHtcclxuICAgICAgaWYgKCFmaWx0ZXIgfHwgIWZpbHRlci5mcm9tRGF0ZSB8fCAhZmlsdGVyLnRvRGF0ZSkgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgICBjb25zdCBzdGFydCA9IHBhcnNlSVNPKGZpbHRlci5mcm9tRGF0ZSk7XHJcbiAgICAgIGNvbnN0IGVuZCA9IHBhcnNlSVNPKGZpbHRlci50b0RhdGUpO1xyXG4gICAgICBzZXRTdGFydERhdGUoc3RhcnQpO1xyXG4gICAgICBzZXRFbmREYXRlKGVuZCk7XHJcbiAgICAgIHNldFNlbGVjdGluZ1N0ZXAoZW5kID8gXCJkb25lXCIgOiBcImVuZFwiKTtcclxuICAgICAgc2V0SG92ZXJEYXRlKG51bGwpO1xyXG4gICAgICBzZXRDdXJyZW50TW9udGgoc3RhcnQgPyBzdGFydC5nZXRNb250aCgpIDogbmV3IERhdGUoKS5nZXRNb250aCgpKTtcclxuICAgICAgc2V0Q3VycmVudFllYXIoc3RhcnQgPyBzdGFydC5nZXRGdWxsWWVhcigpIDogbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpKTtcclxuICAgICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIocmVzb2x2ZVF1aWNrRmlsdGVyRnJvbVJhbmdlKHN0YXJ0LCBlbmQpKTtcclxuICAgICAgc2V0U2hvd01hbnVhbFBpY2tlclBhbmVsKGZhbHNlKTtcclxuICAgICAgc2V0U2hvd01hbnVhbEVycm9yKGZhbHNlKTtcclxuXHJcbiAgICAgIGlmIChmaWx0ZXIuY2xpZW50QWNjb3VudCkge1xuICAgICAgICBzZXRTZWxlY3RlZENsaWVudCh7IHZhbHVlOiBmaWx0ZXIuY2xpZW50QWNjb3VudCwgdGV4dDogZmlsdGVyLmNsaWVudFRleHQgfHwgZmlsdGVyLmNsaWVudEFjY291bnQgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZXRTZWxlY3RlZENsaWVudChudWxsKTtcbiAgICAgIH1cbiAgICAgIHNldFNlbGVjdGVkT3duZXJBeFVzZXJJZChmaWx0ZXIub3duZXJBeFVzZXJJZCB8fCBcIlwiKTtcblxyXG4gICAgICBjb25zdCBwYWdlVmFsID0gTnVtYmVyKGZpbHRlci5wYWdlKTtcclxuICAgICAgY29uc3QgcGFnZVRvTG9hZCA9IE51bWJlci5pc0Zpbml0ZShwYWdlVmFsKSAmJiBwYWdlVmFsID4gMCA/IHBhZ2VWYWwgOiAxO1xyXG5cclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBwYWdlOiBwYWdlVG9Mb2FkLFxyXG4gICAgICAgIG92ZXJyaWRlOiB7XG4gICAgICAgICAgZnJvbURhdGU6IGZpbHRlci5mcm9tRGF0ZSxcbiAgICAgICAgICB0b0RhdGU6IGZpbHRlci50b0RhdGUsXG4gICAgICAgICAgYWNjb3VudE51bTogZmlsdGVyLmNsaWVudEFjY291bnQgfHwgXCJcIixcbiAgICAgICAgICBvd25lckF4VXNlcklkOiBmaWx0ZXIub3duZXJBeFVzZXJJZCB8fCBcIlwiLFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICB9LFxyXG4gICAgW3BhcnNlSVNPLCByZXNvbHZlUXVpY2tGaWx0ZXJGcm9tUmFuZ2VdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlU2VsZWN0ID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoZGF0ZU9iajogRGF0ZSkgPT4ge1xyXG4gICAgICBsb2dIaXN0b3J5KFwiaGFuZGxlU2VsZWN0XCIsIHtcclxuICAgICAgICBjbGlja2VkOiB0b0lTTyhkYXRlT2JqKSxcclxuICAgICAgICBzdGFydDogZnJvbURhdGVWYWx1ZSxcclxuICAgICAgICBlbmQ6IHRvRGF0ZVZhbHVlLFxyXG4gICAgICAgIHNlbGVjdGluZ1N0ZXAsXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgc2V0U2hvd01hbnVhbEVycm9yKGZhbHNlKTtcclxuICAgICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIoXCJjdXN0b21cIik7XHJcbiAgICAgIHNldFNob3dNYW51YWxQaWNrZXJQYW5lbCh0cnVlKTtcclxuICAgICAgY29uc3QgaGFzU3RhcnQgPSAhIXN0YXJ0RGF0ZTtcclxuICAgICAgY29uc3QgaGFzRW5kID0gISFlbmREYXRlO1xyXG5cclxuICAgICAgaWYgKHNlbGVjdGluZ1N0ZXAgPT09IFwiZW5kXCIpIHtcclxuICAgICAgICBpZiAoIWhhc1N0YXJ0KSB7XHJcbiAgICAgICAgICBzZXRTdGFydERhdGUoZGF0ZU9iaik7XHJcbiAgICAgICAgICBzZXRFbmREYXRlKG51bGwpO1xyXG4gICAgICAgICAgc2V0U2VsZWN0aW5nU3RlcChcImVuZFwiKTtcclxuICAgICAgICAgIHNldEN1cnJlbnRNb250aChkYXRlT2JqLmdldE1vbnRoKCkpO1xyXG4gICAgICAgICAgc2V0Q3VycmVudFllYXIoZGF0ZU9iai5nZXRGdWxsWWVhcigpKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBuZXdTdGFydCA9IHN0YXJ0RGF0ZSBhcyBEYXRlO1xyXG4gICAgICAgIGxldCBuZXdFbmQgPSBkYXRlT2JqO1xyXG4gICAgICAgIGlmIChpc0JlZm9yZShuZXdFbmQsIG5ld1N0YXJ0KSkge1xyXG4gICAgICAgICAgY29uc3Qgc3dhcCA9IG5ld1N0YXJ0O1xyXG4gICAgICAgICAgbmV3U3RhcnQgPSBuZXdFbmQ7XHJcbiAgICAgICAgICBuZXdFbmQgPSBzd2FwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0U3RhcnREYXRlKG5ld1N0YXJ0KTtcclxuICAgICAgICBzZXRFbmREYXRlKG5ld0VuZCk7XHJcbiAgICAgICAgc2V0TWFudWFsU3RhcnREYXRlKG5ld1N0YXJ0KTtcclxuICAgICAgICBzZXRNYW51YWxFbmREYXRlKG5ld0VuZCk7XHJcbiAgICAgICAgc2V0U2VsZWN0aW5nU3RlcChcImRvbmVcIik7XHJcbiAgICAgICAgc2V0Q3VycmVudE1vbnRoKG5ld0VuZC5nZXRNb250aCgpKTtcclxuICAgICAgICBzZXRDdXJyZW50WWVhcihuZXdFbmQuZ2V0RnVsbFllYXIoKSk7XHJcbiAgICAgICAgc2V0SG92ZXJEYXRlKG51bGwpO1xyXG4gICAgICAgIHNldElzT3BlbihmYWxzZSk7XHJcbiAgICAgICAgc2V0U2hvd01hbnVhbFBpY2tlclBhbmVsKGZhbHNlKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IG5ld1N0YXJ0ID0gZGF0ZU9iajtcclxuICAgICAgaWYgKGhhc0VuZCAmJiBlbmREYXRlICYmIGlzQmVmb3JlKGVuZERhdGUsIG5ld1N0YXJ0KSkge1xyXG4gICAgICAgIHNldFN0YXJ0RGF0ZShuZXdTdGFydCk7XHJcbiAgICAgICAgc2V0RW5kRGF0ZShudWxsKTtcclxuICAgICAgICBzZXRTZWxlY3RpbmdTdGVwKFwiZW5kXCIpO1xyXG4gICAgICAgIHNldEN1cnJlbnRNb250aChuZXdTdGFydC5nZXRNb250aCgpKTtcclxuICAgICAgICBzZXRDdXJyZW50WWVhcihuZXdTdGFydC5nZXRGdWxsWWVhcigpKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNldFN0YXJ0RGF0ZShuZXdTdGFydCk7XHJcbiAgICAgIGlmIChoYXNFbmQgJiYgZW5kRGF0ZSkge1xyXG4gICAgICAgIHNldEVuZERhdGUoZW5kRGF0ZSk7XHJcbiAgICAgICAgc2V0TWFudWFsU3RhcnREYXRlKG5ld1N0YXJ0KTtcclxuICAgICAgICBzZXRNYW51YWxFbmREYXRlKGVuZERhdGUpO1xyXG4gICAgICAgIHNldFNlbGVjdGluZ1N0ZXAoXCJkb25lXCIpO1xyXG4gICAgICAgIHNldEhvdmVyRGF0ZShudWxsKTtcclxuICAgICAgICBzZXRJc09wZW4oZmFsc2UpO1xyXG4gICAgICAgIHNldFNob3dNYW51YWxQaWNrZXJQYW5lbChmYWxzZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc2V0RW5kRGF0ZShudWxsKTtcclxuICAgICAgICBzZXRTZWxlY3RpbmdTdGVwKFwiZW5kXCIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzZXRDdXJyZW50TW9udGgobmV3U3RhcnQuZ2V0TW9udGgoKSk7XHJcbiAgICAgIHNldEN1cnJlbnRZZWFyKG5ld1N0YXJ0LmdldEZ1bGxZZWFyKCkpO1xyXG4gICAgfSxcclxuICAgIFtlbmREYXRlLCBmcm9tRGF0ZVZhbHVlLCBpc0JlZm9yZSwgbG9nSGlzdG9yeSwgc2VsZWN0aW5nU3RlcCwgc3RhcnREYXRlLCB0b0RhdGVWYWx1ZSwgdG9JU09dXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQ2xlYXJTdGF0ZSA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKGV2ZW50OiBSZWFjdE1vdXNlRXZlbnQpID0+IHtcclxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIGxvZ0hpc3RvcnkoXCJjbGVhclJhbmdlXCIpO1xyXG4gICAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcihudWxsKTtcclxuICAgICAgc2V0U2hvd01hbnVhbEVycm9yKGZhbHNlKTtcclxuICAgICAgc2V0U2hvd01hbnVhbFBpY2tlclBhbmVsKGZhbHNlKTtcclxuICAgICAgcmVzZXRIaXN0b3J5RmlsdGVycygpO1xyXG4gICAgICBzZXRJc09wZW4oZmFsc2UpO1xyXG4gICAgICBzZXRTaG93RmlsdGVycyh0cnVlKTtcclxuICAgIH0sXHJcbiAgICBbbG9nSGlzdG9yeSwgcmVzZXRIaXN0b3J5RmlsdGVyc11cclxuICApO1xyXG5cclxuICBjb25zdCBvcGVuUG9wb3ZlciA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKHNlY3Rpb246IFwic3RhcnRcIiB8IFwiZW5kXCIpID0+IHtcclxuICAgICAgbG9nSGlzdG9yeShcIm9wZW5Qb3BvdmVyXCIsIHsgc2VjdGlvbiwgc3RhcnQ6IGZyb21EYXRlVmFsdWUsIGVuZDogdG9EYXRlVmFsdWUsIHNlbGVjdGluZ1N0ZXAgfSk7XHJcbiAgICAgIHNldFNob3dNYW51YWxFcnJvcihmYWxzZSk7XHJcbiAgICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKFwiY3VzdG9tXCIpO1xyXG4gICAgICBzZXRTaG93TWFudWFsUGlja2VyUGFuZWwodHJ1ZSk7XHJcblxyXG4gICAgICBpZiAoc2VjdGlvbiA9PT0gXCJlbmRcIiAmJiAhc3RhcnREYXRlKSB7XHJcbiAgICAgICAgc2V0U2VsZWN0aW5nU3RlcChcInN0YXJ0XCIpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNldFNlbGVjdGluZ1N0ZXAoc2VjdGlvbik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNldElzT3Blbih0cnVlKTtcclxuICAgIH0sXHJcbiAgICBbZnJvbURhdGVWYWx1ZSwgbG9nSGlzdG9yeSwgc2VsZWN0aW5nU3RlcCwgc3RhcnREYXRlLCB0b0RhdGVWYWx1ZV1cclxuICApO1xyXG5cclxuICBjb25zdCBoYW5kbGVBY3RpdmF0b3JLZXlEb3duID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoZXZlbnQ6IFJlYWN0LktleWJvYXJkRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB7XHJcbiAgICAgIGlmIChldmVudC5rZXkgIT09IFwiRW50ZXJcIiAmJiBldmVudC5rZXkgIT09IFwiIFwiKSByZXR1cm47XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIG9wZW5Qb3BvdmVyKFwic3RhcnRcIik7XHJcbiAgICB9LFxyXG4gICAgW29wZW5Qb3BvdmVyXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZVNlY3Rpb25LZXlEb3duID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoZXZlbnQ6IFJlYWN0LktleWJvYXJkRXZlbnQ8SFRNTERpdkVsZW1lbnQ+LCBzZWN0aW9uOiBcInN0YXJ0XCIgfCBcImVuZFwiKSA9PiB7XHJcbiAgICAgIGlmIChldmVudC5rZXkgIT09IFwiRW50ZXJcIiAmJiBldmVudC5rZXkgIT09IFwiIFwiKSByZXR1cm47XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICBvcGVuUG9wb3ZlcihzZWN0aW9uKTtcclxuICAgIH0sXHJcbiAgICBbb3BlblBvcG92ZXJdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgYXBwbHlRdWlja1JhbmdlID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoZmlsdGVySWQ6IFF1aWNrRmlsdGVySWQsIHN0YXJ0OiBEYXRlLCBlbmQ6IERhdGUpID0+IHtcclxuICAgICAgY29uc3Qgc3RhcnREYXkgPSBzdGFydE9mRGF5KHN0YXJ0KTtcclxuICAgICAgY29uc3QgZW5kRGF5ID0gc3RhcnRPZkRheShlbmQpO1xyXG4gICAgICBzZXRTdGFydERhdGUoc3RhcnREYXkpO1xyXG4gICAgICBzZXRFbmREYXRlKGVuZERheSk7XHJcbiAgICAgIHNldFNlbGVjdGluZ1N0ZXAoXCJkb25lXCIpO1xyXG4gICAgICBzZXRIb3ZlckRhdGUobnVsbCk7XHJcbiAgICAgIHNldEN1cnJlbnRNb250aChzdGFydERheS5nZXRNb250aCgpKTtcclxuICAgICAgc2V0Q3VycmVudFllYXIoc3RhcnREYXkuZ2V0RnVsbFllYXIoKSk7XHJcbiAgICAgIHNldElzT3BlbihmYWxzZSk7XHJcbiAgICAgIHNldFNob3dNYW51YWxQaWNrZXJQYW5lbChmYWxzZSk7XHJcbiAgICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKGZpbHRlcklkKTtcclxuICAgICAgc2V0U2hvd01hbnVhbEVycm9yKGZhbHNlKTtcclxuICAgIH0sXHJcbiAgICBbc3RhcnRPZkRheV1cclxuICApO1xyXG5cclxuICBjb25zdCBoYW5kbGVRdWlja0ZpbHRlciA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKGZpbHRlcklkOiBRdWlja0ZpbHRlcklkKSA9PiB7XHJcbiAgICAgIGNvbnN0IHRvZGF5ID0gc3RhcnRPZkRheShuZXcgRGF0ZSgpKTtcclxuXHJcbiAgICAgIGlmIChmaWx0ZXJJZCA9PT0gXCJjdXN0b21cIikge1xyXG4gICAgICAgIC8vIFRvZ2dsZSBtYW51YWwgcGFuZWwgb24gZXZlcnkgRGF0ZSBidXR0b24gY2xpY2suXHJcbiAgICAgICAgaWYgKHNob3dNYW51YWxQaWNrZXJQYW5lbCkge1xyXG4gICAgICAgICAgc2V0U2hvd01hbnVhbEVycm9yKGZhbHNlKTtcclxuICAgICAgICAgIHNldEhvdmVyRGF0ZShudWxsKTtcclxuICAgICAgICAgIHNldFNlbGVjdGluZ1N0ZXAoc3RhcnREYXRlICYmIGVuZERhdGUgPyBcImRvbmVcIiA6IHN0YXJ0RGF0ZSA/IFwiZW5kXCIgOiBcInN0YXJ0XCIpO1xyXG4gICAgICAgICAgc2V0SXNPcGVuKGZhbHNlKTtcclxuICAgICAgICAgIHNldFNob3dNYW51YWxQaWNrZXJQYW5lbChmYWxzZSk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBuZXh0U3RhcnQgPSBtYW51YWxTdGFydERhdGUgPyBuZXcgRGF0ZShtYW51YWxTdGFydERhdGUpIDogc3RhcnREYXRlID8gbmV3IERhdGUoc3RhcnREYXRlKSA6IG51bGw7XHJcbiAgICAgICAgY29uc3QgbmV4dEVuZCA9IG1hbnVhbEVuZERhdGUgPyBuZXcgRGF0ZShtYW51YWxFbmREYXRlKSA6IGVuZERhdGUgPyBuZXcgRGF0ZShlbmREYXRlKSA6IG51bGw7XHJcbiAgICAgICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIoXCJjdXN0b21cIik7XHJcbiAgICAgICAgc2V0U2hvd01hbnVhbFBpY2tlclBhbmVsKHRydWUpO1xyXG4gICAgICAgIHNldFN0YXJ0RGF0ZShuZXh0U3RhcnQpO1xyXG4gICAgICAgIHNldEVuZERhdGUobmV4dEVuZCk7XHJcblxyXG4gICAgICAgIGlmIChuZXh0U3RhcnQpIHtcclxuICAgICAgICAgIHNldEN1cnJlbnRNb250aChuZXh0U3RhcnQuZ2V0TW9udGgoKSk7XHJcbiAgICAgICAgICBzZXRDdXJyZW50WWVhcihuZXh0U3RhcnQuZ2V0RnVsbFllYXIoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBBbHdheXMgcmVvcGVuIHRoZSBtYW51YWwgY2FsZW5kYXIgd2hlbiB0aGUgY3VzdG9tIGRhdGUgcXVpY2sgZmlsdGVyIGlzIHByZXNzZWQuXHJcbiAgICAgICAgc2V0U2VsZWN0aW5nU3RlcChuZXh0U3RhcnQgJiYgIW5leHRFbmQgPyBcImVuZFwiIDogXCJzdGFydFwiKTtcclxuICAgICAgICBzZXRJc09wZW4odHJ1ZSk7XHJcbiAgICAgICAgc2V0SG92ZXJEYXRlKG51bGwpO1xyXG4gICAgICAgIHNldFNob3dNYW51YWxFcnJvcihmYWxzZSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoZmlsdGVySWQgPT09IFwiZGF5cy03XCIpIHtcclxuICAgICAgICBjb25zdCBzdGFydCA9IG5ldyBEYXRlKHRvZGF5KTtcclxuICAgICAgICBzdGFydC5zZXREYXRlKHRvZGF5LmdldERhdGUoKSAtIDYpO1xyXG4gICAgICAgIGFwcGx5UXVpY2tSYW5nZShmaWx0ZXJJZCwgc3RhcnQsIHRvZGF5KTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChmaWx0ZXJJZCA9PT0gXCJkYXlzLTMwXCIpIHtcclxuICAgICAgICBjb25zdCBzdGFydCA9IG5ldyBEYXRlKHRvZGF5KTtcclxuICAgICAgICBzdGFydC5zZXREYXRlKHRvZGF5LmdldERhdGUoKSAtIDI5KTtcclxuICAgICAgICBhcHBseVF1aWNrUmFuZ2UoZmlsdGVySWQsIHN0YXJ0LCB0b2RheSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoZmlsdGVySWQgPT09IFwiZGF5cy05MFwiKSB7XHJcbiAgICAgICAgY29uc3Qgc3RhcnQgPSBuZXcgRGF0ZSh0b2RheSk7XHJcbiAgICAgICAgc3RhcnQuc2V0RGF0ZSh0b2RheS5nZXREYXRlKCkgLSA4OSk7XHJcbiAgICAgICAgYXBwbHlRdWlja1JhbmdlKGZpbHRlcklkLCBzdGFydCwgdG9kYXkpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgW2FwcGx5UXVpY2tSYW5nZSwgZW5kRGF0ZSwgbWFudWFsRW5kRGF0ZSwgbWFudWFsU3RhcnREYXRlLCBzaG93TWFudWFsUGlja2VyUGFuZWwsIHN0YXJ0RGF0ZSwgc3RhcnRPZkRheV1cclxuICApO1xyXG5cclxuICBjb25zdCBoYW5kbGVDbGllbnRTZWxlY3RlZCA9IHVzZUNhbGxiYWNrKChjbGllbnQ6IENsaWVudE9wdGlvbiB8IG51bGwpID0+IHtcclxuICAgIHNldFNlbGVjdGVkQ2xpZW50KGNsaWVudCk7XHJcbiAgfSwgW10pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgc3RhcnREYXRlLFxyXG4gICAgZW5kRGF0ZSxcclxuICAgIG1hbnVhbFN0YXJ0RGF0ZSxcclxuICAgIG1hbnVhbEVuZERhdGUsXHJcbiAgICBob3ZlckRhdGUsXHJcbiAgICBzZWxlY3RpbmdTdGVwLFxyXG4gICAgY3VycmVudE1vbnRoLFxyXG4gICAgY3VycmVudFllYXIsXHJcbiAgICBpc09wZW4sXHJcbiAgICBzaG93TWFudWFsUGlja2VyUGFuZWwsXHJcbiAgICBhY3RpdmVRdWlja0ZpbHRlcixcclxuICAgIHNlbGVjdGVkQ2xpZW50LFxuICAgIHNlbGVjdGVkT3duZXJBeFVzZXJJZCxcbiAgICBjbGllbnRSZXNldEtleSxcbiAgICBzaG93RmlsdGVycyxcclxuICAgIHNob3dNYW51YWxFcnJvcixcclxuICAgIGZyb21EYXRlVmFsdWUsXHJcbiAgICB0b0RhdGVWYWx1ZSxcclxuICAgIGFjY291bnROdW1WYWx1ZSxcclxuICAgIGhhc1Jlc3RvcmVkRmlsdGVyUmVmLFxyXG4gICAgZGlkSW5pdEZpbHRlclJlZixcclxuICAgIHNldFN0YXJ0RGF0ZSxcclxuICAgIHNldEVuZERhdGUsXHJcbiAgICBzZXRNYW51YWxTdGFydERhdGUsXHJcbiAgICBzZXRNYW51YWxFbmREYXRlLFxyXG4gICAgc2V0SG92ZXJEYXRlLFxyXG4gICAgc2V0U2VsZWN0aW5nU3RlcCxcclxuICAgIHNldEN1cnJlbnRNb250aCxcclxuICAgIHNldEN1cnJlbnRZZWFyLFxyXG4gICAgc2V0SXNPcGVuLFxyXG4gICAgc2V0U2hvd01hbnVhbFBpY2tlclBhbmVsLFxyXG4gICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIsXHJcbiAgICBzZXRTZWxlY3RlZENsaWVudCxcbiAgICBzZXRTZWxlY3RlZE93bmVyQXhVc2VySWQsXG4gICAgc2V0Q2xpZW50UmVzZXRLZXksXG4gICAgc2V0U2hvd0ZpbHRlcnMsXHJcbiAgICBzZXRTaG93TWFudWFsRXJyb3IsXHJcbiAgICB2YWxpZGF0ZU1hbnVhbFJhbmdlLFxyXG4gICAgYXBwbHlEZWZhdWx0UmFuZ2VGcm9tUHJvcHMsXHJcbiAgICByZXNldEhpc3RvcnlGaWx0ZXJzLFxyXG4gICAgYXBwbHlDYWNoZWRGaWx0ZXIsXHJcbiAgICBoYW5kbGVTZWxlY3QsXHJcbiAgICBoYW5kbGVDbGVhclN0YXRlLFxyXG4gICAgb3BlblBvcG92ZXIsXHJcbiAgICBoYW5kbGVBY3RpdmF0b3JLZXlEb3duLFxyXG4gICAgaGFuZGxlU2VjdGlvbktleURvd24sXHJcbiAgICBoYW5kbGVRdWlja0ZpbHRlcixcclxuICAgIGhhbmRsZUNsaWVudFNlbGVjdGVkLFxyXG4gIH07XHJcbn07XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUFBLGlCQUF1Qzs7O0FDc0NqQztBQW5CTixJQUFNLDBCQUEwQixDQUFDO0FBQUEsRUFDL0I7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUNGLE1BQWE7QUFDWCxRQUFNLGtCQUFrQixNQUFNLFNBQVM7QUFDdkMsUUFBTSxXQUFXLFdBQVcsQ0FBQztBQUM3QixRQUFNLHFCQUFxQixNQUFNLEtBQUssQ0FBQyxTQUFTLEtBQUssU0FBUyxZQUFZLE1BQU0sc0JBQXNCLFlBQVksQ0FBQztBQUNuSCxRQUFNLGNBQWMsbUJBQW1CLHFCQUFxQix3QkFBd0I7QUFDcEYsUUFBTSxhQUFhLFVBQVUsZUFBZTtBQUU1QyxTQUNFLDZDQUFDLFNBQUksV0FBVSxhQUNiO0FBQUEsZ0RBQUMsV0FBTSxXQUFVLFdBQVUsU0FBUSx5QkFDaEMsaUJBQ0g7QUFBQSxJQUNBLDZDQUFDLFNBQUksV0FBVSxZQUNi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ImltcG9ydF9yZWFjdCIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgIlJlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfcmVhY3QiLCAibG9nSGlzdG9yeSIsICJ0b0lTTyIsICJpc0JlZm9yZSIsICJmb3JtYXRNb250aExhYmVsIiwgImltcG9ydF9yZWFjdCIsICJub3JtYWxpemVSYW5nZSIsICJpbXBvcnRfcmVhY3QiLCAibG9nSGlzdG9yeSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJsb2dIaXN0b3J5IiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAibG9nSGlzdG9yeSIsICJ0b1RpdGxlQ2FzZSIsICJmb3JtYXREYXRlUGFydHMiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJub3JtYWxpemVSYW5nZSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImxvZ0hpc3RvcnkiLCAicGFyc2VEYXRlVmFsdWUiLCAicGFyc2VJU08iLCAidG9JU08iLCAic3RhcnRPZkRheSIsICJpc0JlZm9yZSIsICJuZXdTdGFydCIsICJpbXBvcnRfanN4X3J1bnRpbWUiXQp9Cg==
