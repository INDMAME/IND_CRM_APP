import {
  ClientSearchCombobox_default
} from "./chunks/chunk-A2ZWLU76.js";
import {
  formatVisibleVisitUserLabel,
  useVisibleVisitUsers
} from "./chunks/chunk-SMGDXP5D.js";
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
  currentOwnerAxUserId,
  selectedOwnerAxUserId,
  loading,
  errorMessage,
  label,
  allLabel,
  noUsersLabel,
  loadingLabel,
  onChange
}) => {
  const hasSubordinates = users.length > 0;
  const disabled = loading || !hasSubordinates;
  const selectedUserExists = users.some((user) => user.axUserId.toUpperCase() === selectedOwnerAxUserId.toUpperCase());
  const selectValue = hasSubordinates && selectedUserExists ? selectedOwnerAxUserId : "";
  const currentOwnerLabel = String(currentOwnerAxUserId || "").trim() || noUsersLabel;
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
          value: hasSubordinates ? selectValue : currentOwnerLabel,
          onChange: (event) => onChange(event.target.value),
          disabled,
          "aria-label": label,
          "aria-busy": loading,
          children: hasSubordinates ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "", children: allLabel }),
            users.map((user) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: user.axUserId, children: formatVisibleVisitUserLabel(user) }, user.axUserId))
          ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: currentOwnerLabel, children: currentOwnerLabel })
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
  currentOwnerAxUserId,
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
        currentOwnerAxUserId,
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
    ownerAllLabel: indT("History_Filter_Owner_All", "All my subordinates"),
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
var useHistoryVisibleOwner = ({
  enabled,
  companyId,
  axUserId,
  permissionsRevision,
  selectedOwnerAxUserId,
  onDebug
}) => {
  const { visibleVisitUsers, visibleUsersLoading, visibleUsersError, visibleUsersReady } = useVisibleVisitUsers({
    enabled,
    companyId,
    axUserId,
    permissionsRevision,
    onForbidden: showPermissionModal,
    onDebug
  });
  const currentAxUserId = axUserId.trim();
  const hasVisibleSubordinates = visibleUsersReady && visibleVisitUsers.length > 0;
  const selectedOwner = (0, import_react10.useMemo)(() => {
    if (!selectedOwnerAxUserId || !hasVisibleSubordinates) return null;
    return visibleVisitUsers.find((user) => user.axUserId.toUpperCase() === selectedOwnerAxUserId.toUpperCase()) || null;
  }, [hasVisibleSubordinates, selectedOwnerAxUserId, visibleVisitUsers]);
  const fallbackOwnerText = !hasVisibleSubordinates && visibleUsersReady && currentAxUserId ? currentAxUserId : "";
  return {
    visibleVisitUsers,
    visibleUsersLoading,
    visibleUsersError,
    visibleUsersReady,
    selectedOwnerText: selectedOwner ? formatVisibleVisitUserLabel(selectedOwner) : fallbackOwnerText,
    effectiveSelectedOwnerAxUserId: selectedOwner?.axUserId || fallbackOwnerText
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
        currentOwnerAxUserId: axUserId,
        selectedOwnerAxUserId: effectiveSelectedOwnerAxUserId,
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvaGlzdG9yaWFsL0hpc3RvcnlQYWdlLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9oaXN0b3JpYWwvVmlzaWJsZVZpc2l0T3duZXJTZWxlY3QudHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy92aXNpdGFzL2hpc3RvcmlhbC9IaXN0b3J5RmlsdGVyUGFuZWwudHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy92aXNpdGFzL2hpc3RvcmlhbC9IaXN0b3J5VGFibGUudHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy92aXNpdGFzL2hpc3RvcmlhbC9IaXN0b3J5UmVzdWx0c1NlY3Rpb24udHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy92aXNpdGFzL2hpc3RvcmlhbC91c2VIaXN0b3J5Q2FsZW5kYXJQaWNrZXIudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvaGlzdG9yaWFsL3VzZUhpc3RvcnlGaWx0ZXJBY3Rpb25zLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy92aXNpdGFzL2hpc3RvcmlhbC91c2VIaXN0b3J5SW5pdGlhbExvYWQudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvaGlzdG9yaWFsL3VzZUhpc3RvcnlMYWJlbHMudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvaGlzdG9yaWFsL3VzZUhpc3RvcnlOYXZpZ2F0aW9uLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy92aXNpdGFzL2hpc3RvcmlhbC91c2VIaXN0b3J5UGFnZUxpc3RlbmVycy50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9oaXN0b3JpYWwvdXNlSGlzdG9yeVBpY2tlclN0ZXBTeW5jLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy92aXNpdGFzL2hpc3RvcmlhbC91c2VIaXN0b3J5VGltZWxpbmVJdGVtcy50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9oaXN0b3JpYWwvdXNlSGlzdG9yeVZpc2libGVPd25lci50cyIsICIuLi9yZWFjdC9zcmMvaG9va3MvdXNlSGlzdG9yeUFjdGl2aXRpZXMudHMiLCAiLi4vcmVhY3Qvc3JjL2hvb2tzL3VzZUhpc3RvcnlGaWx0ZXJDYWNoZS50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9oaXN0b3JpYWwvdXNlSGlzdG9yeUZpbHRlcnNTdGF0ZS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IFJlYWN0LCB7IHVzZU1lbW8sIHVzZVJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgeyBjYW5BY2Nlc3MsIHNob3dQZXJtaXNzaW9uTW9kYWwgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvcGVybWlzc2lvbnMudHNcIjtcbmltcG9ydCBIaXN0b3J5U3VtbWFyeSBmcm9tIFwiLi9IaXN0b3J5U3VtbWFyeS50c3hcIjtcbmltcG9ydCBIaXN0b3J5RmlsdGVyUGFuZWwgZnJvbSBcIi4vSGlzdG9yeUZpbHRlclBhbmVsLnRzeFwiO1xuaW1wb3J0IEhpc3RvcnlSZXN1bHRzU2VjdGlvbiBmcm9tIFwiLi9IaXN0b3J5UmVzdWx0c1NlY3Rpb24udHN4XCI7XG5pbXBvcnQgeyB1c2VIaXN0b3J5Q2FsZW5kYXJQaWNrZXIgfSBmcm9tIFwiLi91c2VIaXN0b3J5Q2FsZW5kYXJQaWNrZXIudHNcIjtcbmltcG9ydCB7IHVzZUhpc3RvcnlGaWx0ZXJBY3Rpb25zIH0gZnJvbSBcIi4vdXNlSGlzdG9yeUZpbHRlckFjdGlvbnMudHNcIjtcbmltcG9ydCB7IHVzZUhpc3RvcnlJbml0aWFsTG9hZCB9IGZyb20gXCIuL3VzZUhpc3RvcnlJbml0aWFsTG9hZC50c1wiO1xuaW1wb3J0IHsgdXNlSGlzdG9yeUxhYmVscyB9IGZyb20gXCIuL3VzZUhpc3RvcnlMYWJlbHMudHNcIjtcbmltcG9ydCB7IHVzZUhpc3RvcnlOYXZpZ2F0aW9uIH0gZnJvbSBcIi4vdXNlSGlzdG9yeU5hdmlnYXRpb24udHNcIjtcbmltcG9ydCB7IHVzZUhpc3RvcnlQYWdlTGlzdGVuZXJzIH0gZnJvbSBcIi4vdXNlSGlzdG9yeVBhZ2VMaXN0ZW5lcnMudHNcIjtcbmltcG9ydCB7IHVzZUhpc3RvcnlQaWNrZXJTdGVwU3luYyB9IGZyb20gXCIuL3VzZUhpc3RvcnlQaWNrZXJTdGVwU3luYy50c1wiO1xuaW1wb3J0IHsgdXNlSGlzdG9yeVRpbWVsaW5lSXRlbXMgfSBmcm9tIFwiLi91c2VIaXN0b3J5VGltZWxpbmVJdGVtcy50c1wiO1xuaW1wb3J0IHsgdXNlSGlzdG9yeVZpc2libGVPd25lciB9IGZyb20gXCIuL3VzZUhpc3RvcnlWaXNpYmxlT3duZXIudHNcIjtcbmltcG9ydCBGbG9hdGluZ0FjdGlvbkJ1dHRvbiBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0Zsb2F0aW5nQWN0aW9uQnV0dG9uLnRzeFwiO1xuaW1wb3J0IHsgdXNlSGlzdG9yeUFjdGl2aXRpZXMgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlSGlzdG9yeUFjdGl2aXRpZXMudHNcIjtcbmltcG9ydCB7IHVzZUhpc3RvcnlGaWx0ZXJDYWNoZSB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VIaXN0b3J5RmlsdGVyQ2FjaGUudHNcIjtcbmltcG9ydCB7IHVzZUhpc3RvcnlGaWx0ZXJzU3RhdGUgfSBmcm9tIFwiLi91c2VIaXN0b3J5RmlsdGVyc1N0YXRlLnRzXCI7XG5pbXBvcnQgeyBtb3VudFJlYWN0SXNsYW5kLCBtb3VudFdoZW5Eb2N1bWVudFJlYWR5IH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3JlYWN0SXNsYW5kLnRzeFwiO1xuXG50eXBlIFByb3BzID0ge1xuICBkZWZhdWx0RnJvbURhdGU/OiBzdHJpbmc7XG4gIGRlZmF1bHRUb0RhdGU/OiBzdHJpbmc7XG4gIGNvbXBhbnlJZD86IHN0cmluZztcbiAgYXhVc2VySWQ/OiBzdHJpbmc7XG4gIHBlcm1pc3Npb25zUmV2aXNpb24/OiBzdHJpbmc7XG59O1xuXHJcbmNvbnN0IFBBR0VfU0laRSA9IDY7XG5jb25zdCBQQUdFX1dJTkRPVyA9IDY7XHJcbmNvbnN0IE5BVl9ERUxBWV9NUyA9IDMyMDtcclxuY29uc3QgRkFCX0JBU0VfQk9UVE9NID0gMzI7XHJcblxyXG5jb25zdCBub3JtYWxpemVVaUxvY2FsZSA9IChsb2NhbGU6IHN0cmluZykgPT4ge1xyXG4gIGNvbnN0IHZhbHVlID0gU3RyaW5nKGxvY2FsZSB8fCBcIlwiKS50cmltKCk7XHJcbiAgaWYgKCF2YWx1ZSkgcmV0dXJuIFwiZXMtRVNcIjtcclxuICBpZiAoL156aC1oYW5zL2kudGVzdCh2YWx1ZSkpIHJldHVybiBcInpoLUNOXCI7XHJcbiAgcmV0dXJuIHZhbHVlO1xyXG59O1xyXG5cclxuY29uc3QgaXNCYXNxdWVMb2NhbGUgPSAobG9jYWxlOiBzdHJpbmcpID0+IC9eZXVcXGIvaS50ZXN0KFN0cmluZyhsb2NhbGUgfHwgXCJcIikpO1xyXG5cclxuY29uc3QgQkFTUVVFX01PTlRIUyA9IFtcclxuICBcInVydGFycmlsYVwiLFxyXG4gIFwib3RzYWlsYVwiLFxyXG4gIFwibWFydHhvYVwiLFxyXG4gIFwiYXBpcmlsYVwiLFxyXG4gIFwibWFpYXR6YVwiLFxyXG4gIFwiZWthaW5hXCIsXHJcbiAgXCJ1enRhaWxhXCIsXHJcbiAgXCJhYnV6dHVhXCIsXHJcbiAgXCJpcmFpbGFcIixcclxuICBcInVycmlhXCIsXHJcbiAgXCJhemFyb2FcIixcclxuICBcImFiZW5kdWFcIixcclxuXTtcclxuXHJcbmNvbnN0IEJBU1FVRV9NT05USFNfU0hPUlQgPSBbXG4gIFwidXJ0XCIsXHJcbiAgXCJvdHNcIixcclxuICBcIm1hclwiLFxyXG4gIFwiYXBpXCIsXHJcbiAgXCJtYWlcIixcclxuICBcImVrYVwiLFxyXG4gIFwidXp0XCIsXHJcbiAgXCJhYnVcIixcclxuICBcImlyYVwiLFxyXG4gIFwidXJyXCIsXHJcbiAgXCJhemFcIixcclxuICBcImFiZVwiLFxuXTtcblxuY29uc3QgWkhfTU9OVEhfWUVBUl9GT1JNQVRURVIgPSBuZXcgSW50bC5EYXRlVGltZUZvcm1hdChcInpoLUNOXCIsIHsgeWVhcjogXCJudW1lcmljXCIsIG1vbnRoOiBcImxvbmdcIiB9KTtcblxuY29uc3QgZ2V0VWlMb2NhbGUgPSAoKSA9PiB7XHJcbiAgY29uc3QgZnJvbUh0bWwgPSB0eXBlb2YgZG9jdW1lbnQgIT09IFwidW5kZWZpbmVkXCIgPyBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQubGFuZyA6IFwiXCI7XHJcbiAgaWYgKGZyb21IdG1sICYmIFN0cmluZyhmcm9tSHRtbCkudHJpbSgpKSByZXR1cm4gbm9ybWFsaXplVWlMb2NhbGUoZnJvbUh0bWwpO1xyXG4gIHJldHVybiBcImVzLUVTXCI7XHJcbn07XHJcblxyXG5jb25zdCBwYWQgPSAobjogbnVtYmVyKSA9PiBuLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgXCIwXCIpO1xyXG5cclxuY29uc3QgdG9JU08gPSAoZDogRGF0ZSkgPT4gYCR7ZC5nZXRGdWxsWWVhcigpfS0ke3BhZChkLmdldE1vbnRoKCkgKyAxKX0tJHtwYWQoZC5nZXREYXRlKCkpfWA7XHJcblxyXG5jb25zdCBzdGFydE9mRGF5ID0gKGQ6IERhdGUpID0+IG5ldyBEYXRlKGQuZ2V0RnVsbFllYXIoKSwgZC5nZXRNb250aCgpLCBkLmdldERhdGUoKSk7XHJcblxyXG5jb25zdCBwYXJzZUlTTyA9IChzOiBzdHJpbmcpID0+IHtcclxuICBpZiAoIXMpIHJldHVybiBudWxsO1xyXG4gIGNvbnN0IHBhcnRzID0gcy5zcGxpdChcIi1cIikubWFwKE51bWJlcik7XHJcbiAgaWYgKHBhcnRzLmxlbmd0aCAhPT0gMykgcmV0dXJuIG51bGw7XHJcbiAgcmV0dXJuIG5ldyBEYXRlKHBhcnRzWzBdLCBwYXJ0c1sxXSAtIDEsIHBhcnRzWzJdKTtcclxufTtcclxuXHJcbmNvbnN0IGlzQmVmb3JlID0gKGE6IERhdGUgfCBudWxsLCBiOiBEYXRlIHwgbnVsbCkgPT4gISEoYSAmJiBiICYmIGEuZ2V0VGltZSgpIDwgYi5nZXRUaW1lKCkpO1xuXG5jb25zdCBub3JtYWxpemVSYW5nZSA9IChmcm9tOiBzdHJpbmcsIHRvOiBzdHJpbmcpID0+IHtcbiAgaWYgKCFmcm9tIHx8ICF0bykgcmV0dXJuIHsgZnJvbSwgdG8gfTtcbiAgY29uc3QgZnJvbURhdGUgPSBwYXJzZUlTTyhmcm9tKTtcbiAgY29uc3QgdG9EYXRlID0gcGFyc2VJU08odG8pO1xuICBpZiAoIWZyb21EYXRlIHx8ICF0b0RhdGUpIHJldHVybiB7IGZyb20sIHRvIH07XG4gIGlmIChpc0JlZm9yZSh0b0RhdGUsIGZyb21EYXRlKSkge1xuICAgIHJldHVybiB7IGZyb206IHRvSVNPKHRvRGF0ZSksIHRvOiB0b0lTTyhmcm9tRGF0ZSkgfTtcbiAgfVxuICByZXR1cm4geyBmcm9tOiB0b0lTTyhmcm9tRGF0ZSksIHRvOiB0b0lTTyh0b0RhdGUpIH07XG59O1xuXG5jb25zdCBmb3JtYXREaXNwbGF5ID0gKGQ6IERhdGUsIGxvY2FsZTogc3RyaW5nKSA9PiB7XG4gIGlmIChpc0Jhc3F1ZUxvY2FsZShsb2NhbGUpKSB7XG4gICAgY29uc3QgbW9udGggPSBCQVNRVUVfTU9OVEhTX1NIT1JUW2QuZ2V0TW9udGgoKV07XG4gICAgcmV0dXJuIGAke2QuZ2V0RGF0ZSgpfSAke21vbnRofSAke2QuZ2V0RnVsbFllYXIoKX1gLnRvTG93ZXJDYXNlKCk7XG4gIH1cclxuICByZXR1cm4gZFxyXG4gICAgLnRvTG9jYWxlRGF0ZVN0cmluZyhsb2NhbGUsIHtcclxuICAgICAgZGF5OiBcIm51bWVyaWNcIixcclxuICAgICAgbW9udGg6IFwic2hvcnRcIixcclxuICAgICAgeWVhcjogXCJudW1lcmljXCIsXHJcbiAgICB9KVxyXG4gICAgLnJlcGxhY2UoL1xcLi9nLCBcIlwiKVxyXG4gICAgLnRvTG93ZXJDYXNlKCk7XHJcbn07XHJcblxyXG5jb25zdCBmb3JtYXRNb250aExhYmVsID0gKGQ6IERhdGUsIGxvY2FsZTogc3RyaW5nKSA9PiB7XG4gIGlmICgvXnpoL2kudGVzdChsb2NhbGUpKSB7XG4gICAgcmV0dXJuIFpIX01PTlRIX1lFQVJfRk9STUFUVEVSLmZvcm1hdChkKTtcbiAgfVxuICBpZiAoaXNCYXNxdWVMb2NhbGUobG9jYWxlKSkge1xyXG4gICAgcmV0dXJuIGAke0JBU1FVRV9NT05USFNbZC5nZXRNb250aCgpXX0gJHtkLmdldEZ1bGxZZWFyKCl9YDtcclxuICB9XHJcbiAgY29uc3QgbW9udGhOYW1lID0gZC50b0xvY2FsZURhdGVTdHJpbmcobG9jYWxlLCB7IG1vbnRoOiBcImxvbmdcIiB9KTtcclxuICBjb25zdCBjYXBNb250aE5hbWUgPSBtb250aE5hbWUgJiYgL1tBLVphLXpdLy50ZXN0KG1vbnRoTmFtZVswXSlcclxuICAgID8gbW9udGhOYW1lWzBdLnRvTG9jYWxlVXBwZXJDYXNlKGxvY2FsZSkgKyBtb250aE5hbWUuc2xpY2UoMSlcclxuICAgIDogbW9udGhOYW1lO1xyXG4gIHJldHVybiBgJHtjYXBNb250aE5hbWV9ICR7ZC5nZXRGdWxsWWVhcigpfWA7XHJcbn07XHJcblxyXG5jb25zdCBwYXJzZURhdGVWYWx1ZSA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XHJcbiAgaWYgKCF2YWx1ZSkgcmV0dXJuIG51bGw7XHJcbiAgY29uc3QgcmF3ID0gU3RyaW5nKHZhbHVlKS50cmltKCk7XHJcbiAgaWYgKCFyYXcpIHJldHVybiBudWxsO1xyXG5cclxuICBjb25zdCBkYXRlUGFydCA9IHJhdy5zcGxpdChcIlRcIilbMF0uc3BsaXQoXCIgXCIpWzBdO1xyXG5cclxuICBpZiAoL15cXGR7NH0tXFxkezJ9LVxcZHsyfSQvLnRlc3QoZGF0ZVBhcnQpKSB7XHJcbiAgICBjb25zdCBbeSwgbSwgZF0gPSBkYXRlUGFydC5zcGxpdChcIi1cIikubWFwKE51bWJlcik7XHJcbiAgICByZXR1cm4gbmV3IERhdGUoeSwgbSAtIDEsIGQpO1xyXG4gIH1cclxuXHJcbiAgaWYgKC9eXFxkezJ9Wy4vLV1cXGR7Mn1bLi8tXVxcZHs0fSQvLnRlc3QoZGF0ZVBhcnQpKSB7XHJcbiAgICBjb25zdCBwYXJ0cyA9IGRhdGVQYXJ0LnNwbGl0KC9bLi8tXS8pLm1hcChOdW1iZXIpO1xyXG4gICAgY29uc3QgW2QsIG0sIHldID0gcGFydHM7XHJcbiAgICByZXR1cm4gbmV3IERhdGUoeSwgbSAtIDEsIGQpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgcGFyc2VkID0gbmV3IERhdGUocmF3KTtcclxuICByZXR1cm4gTnVtYmVyLmlzTmFOKHBhcnNlZC5nZXRUaW1lKCkpID8gbnVsbCA6IHBhcnNlZDtcclxufTtcclxuXHJcbmNvbnN0IGZvcm1hdERhdGVQYXJ0cyA9ICh2YWx1ZTogc3RyaW5nLCBsb2NhbGU6IHN0cmluZykgPT4ge1xyXG4gIGlmICghdmFsdWUpIHJldHVybiB7IHllYXI6IFwiXCIsIG1vbnRoOiBcIlwiLCBkYXk6IFwiXCIgfTtcclxuICBjb25zdCBkID0gcGFyc2VEYXRlVmFsdWUodmFsdWUpO1xyXG4gIGlmICghZCkgcmV0dXJuIHsgeWVhcjogXCJcIiwgbW9udGg6IFwiXCIsIGRheTogXCJcIiB9O1xyXG4gIGxldCBtb250aCA9IFwiXCI7XHJcbiAgaWYgKGlzQmFzcXVlTG9jYWxlKGxvY2FsZSkpIHtcclxuICAgIG1vbnRoID0gQkFTUVVFX01PTlRIU19TSE9SVFtkLmdldE1vbnRoKCldIHx8IFwiXCI7XHJcbiAgfSBlbHNlIHtcclxuICAgIG1vbnRoID0gZC50b0xvY2FsZURhdGVTdHJpbmcobG9jYWxlLCB7IG1vbnRoOiBcInNob3J0XCIgfSkucmVwbGFjZSgvXFwuL2csIFwiXCIpO1xyXG4gIH1cclxuICByZXR1cm4ge1xyXG4gICAgeWVhcjogU3RyaW5nKGQuZ2V0RnVsbFllYXIoKSksXHJcbiAgICBtb250aDogbW9udGgudG9VcHBlckNhc2UoKSxcclxuICAgIGRheTogU3RyaW5nKGQuZ2V0RGF0ZSgpKS5wYWRTdGFydCgyLCBcIjBcIiksXHJcbiAgfTtcclxufTtcclxuXHJcbmNvbnN0IHRvVGl0bGVDYXNlID0gKHZhbHVlOiBzdHJpbmcsIGxvY2FsZTogc3RyaW5nKSA9PiB7XHJcbiAgaWYgKCF2YWx1ZSkgcmV0dXJuIFwiXCI7XHJcbiAgY29uc3QgbG93ZXIgPSB2YWx1ZS50b0xvY2FsZUxvd2VyQ2FzZShsb2NhbGUpO1xyXG4gIHRyeSB7XHJcbiAgICByZXR1cm4gbG93ZXIucmVwbGFjZSgvKF58W15cXHB7TH1dKShcXHB7TH0pL2d1LCAoX21hdGNoLCBwcmVmaXgsIGNoKSA9PiBgJHtwcmVmaXh9JHtjaC50b0xvY2FsZVVwcGVyQ2FzZShsb2NhbGUpfWApO1xyXG4gIH0gY2F0Y2gge1xyXG4gICAgcmV0dXJuIGxvd2VyLnJlcGxhY2UoLyhefFtcXHMtL10pKFxcUykvZywgKF9tYXRjaCwgcHJlZml4LCBjaCkgPT4gYCR7cHJlZml4fSR7Y2gudG9Mb2NhbGVVcHBlckNhc2UobG9jYWxlKX1gKTtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBsb2dIaXN0b3J5ID0gKG1lc3NhZ2U6IHN0cmluZywgZGF0YT86IFJlY29yZDxzdHJpbmcsIHVua25vd24+KSA9PiB7XG4gIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm47XHJcbiAgY29uc3QgZGVidWdGbGFnID0gKHdpbmRvdyBhcyBhbnkpLl9fSU5EX0RFQlVHX0hJU1RPUllfXztcclxuICBpZiAoZGVidWdGbGFnICE9PSB0cnVlKSByZXR1cm47XHJcbiAgaWYgKGRhdGEpIHtcclxuICAgIGNvbnNvbGUuZGVidWcoXCJbSGlzdG9yeV1cIiwgbWVzc2FnZSwgZGF0YSk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGNvbnNvbGUuZGVidWcoXCJbSGlzdG9yeV1cIiwgbWVzc2FnZSk7XHJcbiAgfVxyXG59O1xyXG5cclxuLy8gSGlzdG9yeSBwYWdlIHdpdGggUmVhY3Qgc3RhdGUgKyBlZmZlY3RzIChubyBsZWdhY3kgRE9NIGxvZ2ljKS5cclxuZXhwb3J0IGNvbnN0IEhpc3RvcnlQYWdlID0gKHtcbiAgZGVmYXVsdEZyb21EYXRlID0gXCJcIixcbiAgZGVmYXVsdFRvRGF0ZSA9IFwiXCIsXG4gIGNvbXBhbnlJZCA9IFwiXCIsXG4gIGF4VXNlcklkID0gXCJcIixcbiAgcGVybWlzc2lvbnNSZXZpc2lvbiA9IFwiXCIsXG59OiBQcm9wcykgPT4ge1xuICBjb25zdCBsb2NhbGUgPSB1c2VNZW1vKCgpID0+IGdldFVpTG9jYWxlKCksIFtdKTtcbiAgY29uc3QgY2FuVmlld0hpc3RvcnkgPSBjYW5BY2Nlc3MoXCJWSVNJVEFTX0dFU1RJT05cIiwgXCJWaWV3XCIpO1xuICBjb25zdCBjYW5DcmVhdGVWaXNpdCA9IGNhbkFjY2VzcyhcIlZJU0lUQVNfR0VTVElPTlwiLCBcIkFkZFwiKTtcbiAgY29uc3Qgbm9EYXRhVGV4dCA9IGluZFQoXCJDb21tb25fTm9EYXRhXCIsIFwiTm8gZGF0YVwiKTtcblxuICBjb25zdCBhY3RpdmF0b3JSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgcG9wb3ZlclJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xuXHJcbiAgY29uc3QgeyByZWFkQ2FjaGVkRmlsdGVyLCBjbGVhckZpbHRlckNhY2hlLCBjb25zdW1lUmV0dXJuRmxhZywgc2F2ZUNhY2hlZEZpbHRlciB9ID0gdXNlSGlzdG9yeUZpbHRlckNhY2hlKCk7XHJcbiAgY29uc3Qge1xuICAgIHN0YXJ0RGF0ZSwgZW5kRGF0ZSwgaG92ZXJEYXRlLCBzZWxlY3RpbmdTdGVwLCBjdXJyZW50TW9udGgsIGN1cnJlbnRZZWFyLCBpc09wZW4sIHNob3dNYW51YWxQaWNrZXJQYW5lbCxcbiAgICBhY3RpdmVRdWlja0ZpbHRlciwgc2VsZWN0ZWRDbGllbnQsIHNlbGVjdGVkT3duZXJBeFVzZXJJZCwgY2xpZW50UmVzZXRLZXksIHNob3dGaWx0ZXJzLCBzaG93TWFudWFsRXJyb3IsXG4gICAgZnJvbURhdGVWYWx1ZSwgdG9EYXRlVmFsdWUsIGFjY291bnROdW1WYWx1ZSwgaGFzUmVzdG9yZWRGaWx0ZXJSZWYsIGRpZEluaXRGaWx0ZXJSZWYsXG4gICAgc2V0SG92ZXJEYXRlLCBzZXRTZWxlY3RpbmdTdGVwLCBzZXRDdXJyZW50TW9udGgsIHNldEN1cnJlbnRZZWFyLCBzZXRJc09wZW4sIHNldFNob3dGaWx0ZXJzLCBzZXRTaG93TWFudWFsRXJyb3IsXG4gICAgc2V0U2VsZWN0ZWRPd25lckF4VXNlcklkLCB2YWxpZGF0ZU1hbnVhbFJhbmdlLCBhcHBseURlZmF1bHRSYW5nZUZyb21Qcm9wcywgcmVzZXRIaXN0b3J5RmlsdGVycywgYXBwbHlDYWNoZWRGaWx0ZXIsXG4gICAgaGFuZGxlU2VsZWN0LCBoYW5kbGVDbGVhclN0YXRlLCBvcGVuUG9wb3ZlciwgaGFuZGxlQWN0aXZhdG9yS2V5RG93biwgaGFuZGxlU2VjdGlvbktleURvd24sIGhhbmRsZVF1aWNrRmlsdGVyLFxuICAgIGhhbmRsZUNsaWVudFNlbGVjdGVkLFxuICB9ID0gdXNlSGlzdG9yeUZpbHRlcnNTdGF0ZSh7XG4gICAgZGVmYXVsdEZyb21EYXRlLFxuICAgIGRlZmF1bHRUb0RhdGUsXG4gICAgbG9nSGlzdG9yeSxcbiAgICBwYXJzZURhdGVWYWx1ZSxcbiAgICBwYXJzZUlTTyxcclxuICAgIHRvSVNPLFxyXG4gICAgc3RhcnRPZkRheSxcclxuICAgIGlzQmVmb3JlLFxuICB9KTtcblxuICBjb25zdCB7IHZpc2libGVWaXNpdFVzZXJzLCB2aXNpYmxlVXNlcnNMb2FkaW5nLCB2aXNpYmxlVXNlcnNFcnJvciwgc2VsZWN0ZWRPd25lclRleHQsIGVmZmVjdGl2ZVNlbGVjdGVkT3duZXJBeFVzZXJJZCB9ID1cbiAgICB1c2VIaXN0b3J5VmlzaWJsZU93bmVyKHtcbiAgICAgIGVuYWJsZWQ6IGNhblZpZXdIaXN0b3J5LFxuICAgICAgY29tcGFueUlkLFxuICAgICAgYXhVc2VySWQsXG4gICAgICBwZXJtaXNzaW9uc1JldmlzaW9uLFxuICAgICAgc2VsZWN0ZWRPd25lckF4VXNlcklkLFxuICAgICAgb25EZWJ1ZzogbG9nSGlzdG9yeSxcbiAgICB9KTtcblxuICBjb25zdCB7IGl0ZW1zLCB0b3RhbCwgY3VycmVudFBhZ2UsIGlzTG9hZGluZywgZXJyb3JNZXNzYWdlLCBsb2FkQWN0aXZpdGllcywgcmVzZXRBY3Rpdml0aWVzLCByZXRyeU9uTmV0d29ya0Vycm9yUmVmLCBsYXN0U2lnbmF0dXJlUmVmIH0gPVxuICAgIHVzZUhpc3RvcnlBY3Rpdml0aWVzKHtcbiAgICAgIGZyb21EYXRlVmFsdWUsXG4gICAgICB0b0RhdGVWYWx1ZSxcbiAgICAgIGFjY291bnROdW1WYWx1ZSxcbiAgICAgIG93bmVyQXhVc2VySWRWYWx1ZTogZWZmZWN0aXZlU2VsZWN0ZWRPd25lckF4VXNlcklkLFxuICAgICAgcGFnZVNpemU6IFBBR0VfU0laRSxcbiAgICAgIG5vcm1hbGl6ZVJhbmdlLFxuICAgICAgb25Gb3JiaWRkZW46IHNob3dQZXJtaXNzaW9uTW9kYWwsXG4gICAgICBvbkRlYnVnOiBsb2dIaXN0b3J5LFxuICAgIH0pO1xuXHJcbiAgY29uc3QgeyBhcHBseUZpbHRlcnMsIGhhbmRsZUNsZWFyLCBoYW5kbGVSZXNldEZpbHRlcnMgfSA9IHVzZUhpc3RvcnlGaWx0ZXJBY3Rpb25zKHtcbiAgICBzdGFydERhdGUsXG4gICAgZW5kRGF0ZSxcbiAgICBmcm9tRGF0ZVZhbHVlLFxuICAgIHRvRGF0ZVZhbHVlLFxuICAgIGFjY291bnROdW1WYWx1ZSxcbiAgICBvd25lckF4VXNlcklkVmFsdWU6IGVmZmVjdGl2ZVNlbGVjdGVkT3duZXJBeFVzZXJJZCxcbiAgICBsYXN0U2lnbmF0dXJlUmVmLFxuICAgIHZhbGlkYXRlTWFudWFsUmFuZ2UsXG4gICAgbm9ybWFsaXplUmFuZ2UsXG4gICAgbG9hZEFjdGl2aXRpZXMsXG4gICAgaGFuZGxlQ2xlYXJTdGF0ZSxcbiAgICBjbGVhckZpbHRlckNhY2hlLFxuICAgIHJlc2V0QWN0aXZpdGllcyxcbiAgICByZXNldEhpc3RvcnlGaWx0ZXJzLFxuICAgIHNldElzT3BlbixcbiAgICBzZXRTaG93RmlsdGVycyxcbiAgICBzZXRTaG93TWFudWFsRXJyb3IsXG4gIH0pO1xuXHJcbiAgY29uc3QgdG90YWxQYWdlcyA9IE1hdGguY2VpbCgodG90YWwgfHwgMCkgLyBQQUdFX1NJWkUpO1xyXG5cclxuICB1c2VIaXN0b3J5UGFnZUxpc3RlbmVycyh7XG4gICAgaXNPcGVuLFxyXG4gICAgYWN0aXZhdG9yUmVmLFxyXG4gICAgcG9wb3ZlclJlZixcclxuICAgIGhhc1Jlc3RvcmVkRmlsdGVyUmVmLFxyXG4gICAgcmV0cnlPbk5ldHdvcmtFcnJvclJlZixcclxuICAgIGN1cnJlbnRQYWdlLFxyXG4gICAgbG9nSGlzdG9yeSxcclxuICAgIGNvbnN1bWVSZXR1cm5GbGFnLFxyXG4gICAgcmVhZENhY2hlZEZpbHRlcixcclxuICAgIGFwcGx5Q2FjaGVkRmlsdGVyLFxyXG4gICAgbG9hZEFjdGl2aXRpZXMsXHJcbiAgICBzZXRJc09wZW4sXHJcbiAgICBzZXRIb3ZlckRhdGUsXHJcbiAgICBzZXRTaG93RmlsdGVycyxcclxuICAgIGFwcGx5RmlsdGVycyxcbiAgfSk7XG5cbiAgdXNlSGlzdG9yeUluaXRpYWxMb2FkKHtcbiAgICBkZWZhdWx0RnJvbURhdGUsXG4gICAgZGVmYXVsdFRvRGF0ZSxcbiAgICBkaWRJbml0RmlsdGVyUmVmLFxuICAgIGhhc1Jlc3RvcmVkRmlsdGVyUmVmLFxuICAgIHJldHJ5T25OZXR3b3JrRXJyb3JSZWYsXG4gICAgY29uc3VtZVJldHVybkZsYWcsXG4gICAgcmVhZENhY2hlZEZpbHRlcixcbiAgICBhcHBseUNhY2hlZEZpbHRlcixcbiAgICBhcHBseURlZmF1bHRSYW5nZUZyb21Qcm9wcyxcbiAgICBsb2FkQWN0aXZpdGllcyxcbiAgICByZXNldEFjdGl2aXRpZXMsXG4gICAgcmVzZXRIaXN0b3J5RmlsdGVycyxcbiAgICBjbGVhckZpbHRlckNhY2hlLFxuICAgIHNldFNob3dGaWx0ZXJzLFxuICAgIHNldElzT3BlbixcbiAgICBsb2dIaXN0b3J5LFxuICB9KTtcblxyXG4gIHVzZUhpc3RvcnlQaWNrZXJTdGVwU3luYyh7IHN0YXJ0RGF0ZSwgZW5kRGF0ZSwgc2VsZWN0aW5nU3RlcCwgc2V0U2VsZWN0aW5nU3RlcCB9KTtcblxyXG4gIGNvbnN0IGhhbmRsZU5hdmlnYXRlID0gdXNlSGlzdG9yeU5hdmlnYXRpb24oe1xuICAgIGNhblZpZXdIaXN0b3J5LFxuICAgIGN1cnJlbnRQYWdlLFxuICAgIGZyb21EYXRlVmFsdWUsXG4gICAgdG9EYXRlVmFsdWUsXG4gICAgc2VsZWN0ZWRDbGllbnQsXG4gICAgb3duZXJBeFVzZXJJZDogZWZmZWN0aXZlU2VsZWN0ZWRPd25lckF4VXNlcklkLFxuICAgIG93bmVyVGV4dDogc2VsZWN0ZWRPd25lclRleHQsXG4gICAgbmF2RGVsYXlNczogTkFWX0RFTEFZX01TLFxuICAgIHNhdmVDYWNoZWRGaWx0ZXIsXG4gICAgb25Gb3JiaWRkZW46IHNob3dQZXJtaXNzaW9uTW9kYWwsXG4gIH0pO1xuXHJcbiAgY29uc3Qge1xuICAgIGNhbGVuZGFyTGFiZWwsIG1hbnVhbERheUNlbGxzLCBoYW5kbGVQcmV2TW9udGgsIGhhbmRsZU5leHRNb250aCxcbiAgICBoYW5kbGVHcmlkTW91c2VMZWF2ZSwgaGFuZGxlTWFudWFsRGF5Q2xpY2ssIGhhbmRsZU1hbnVhbERheUhvdmVyLFxuICB9ID0gdXNlSGlzdG9yeUNhbGVuZGFyUGlja2VyKHtcbiAgICBjdXJyZW50TW9udGgsXG4gICAgY3VycmVudFllYXIsXG4gICAgbG9jYWxlLFxuICAgIHN0YXJ0RGF0ZSxcbiAgICBlbmREYXRlLFxuICAgIGhvdmVyRGF0ZSxcbiAgICBzZWxlY3RpbmdTdGVwLFxuICAgIHNldEN1cnJlbnRNb250aCxcbiAgICBzZXRDdXJyZW50WWVhcixcbiAgICBzZXRIb3ZlckRhdGUsXG4gICAgaGFuZGxlU2VsZWN0LFxuICAgIGxvZ0hpc3RvcnksXG4gICAgdG9JU08sXG4gICAgaXNCZWZvcmUsXG4gICAgZm9ybWF0TW9udGhMYWJlbCxcbiAgfSk7XG5cclxuICBjb25zdCB7IHRpbWVsaW5lSXRlbXMgfSA9IHVzZUhpc3RvcnlUaW1lbGluZUl0ZW1zKHtcclxuICAgIGl0ZW1zLFxyXG4gICAgbG9jYWxlLFxyXG4gICAgbm9EYXRhVGV4dCxcclxuICAgIGxvZ0hpc3RvcnksXHJcbiAgICB0b1RpdGxlQ2FzZSxcclxuICAgIGZvcm1hdERhdGVQYXJ0cyxcclxuICB9KTtcclxuXHJcbiAgY29uc3Qge1xuICAgIGxhYmVsRnJvbSwgbGFiZWxUbywgc3VtbWFyeUZyb20sIHN1bW1hcnlUbywgZmlsdGVyVGl0bGUsIGFkZERhdGVMYWJlbCwgY2xlYXJSYW5nZUxhYmVsLFxuICAgIHByZXZNb250aExhYmVsLCBuZXh0TW9udGhMYWJlbCwgc3RhdHVzU2VsZWN0U3RhcnRMYWJlbCwgc3RhdHVzU2VsZWN0RW5kTGFiZWwsIHdlZWtEYXlMYWJlbHMsXG4gICAgY2xlYXJMYWJlbCwgYXBwbHlMYWJlbCwgY2xpZW50TGFiZWwsIG93bmVyTGFiZWwsIG93bmVyQWxsTGFiZWwsIG93bmVyTm9Vc2Vyc0xhYmVsLCBvd25lckxvYWRpbmdMYWJlbCxcbiAgICBsb2FkaW5nTGFiZWwsIG5vVmlzaXRzSW5SYW5nZUxhYmVsLCBjcmVhdGVMYWJlbCwgcXVpY2tGaWx0ZXJzLCBwYWdpbmF0aW9uTGFiZWxzLFxuICB9ID0gdXNlSGlzdG9yeUxhYmVscyhsb2NhbGUpO1xuICBjb25zdCBzaG93RmlsdGVyQWN0aW9ucyA9IHNob3dGaWx0ZXJzO1xyXG4gIGNvbnN0IHNob3dTdW1tYXJ5ID0gIXNob3dGaWx0ZXJzICYmICEhc3RhcnREYXRlICYmICEhZW5kRGF0ZTtcclxuICBjb25zdCBzaG93UmVzdWx0cyA9ICFzaG93RmlsdGVycztcclxuICBjb25zdCBzaG93TWFudWFsUGlja2VyID0gYWN0aXZlUXVpY2tGaWx0ZXIgPT09IFwiY3VzdG9tXCIgJiYgc2hvd01hbnVhbFBpY2tlclBhbmVsO1xyXG4gIGNvbnN0IHNob3dJbmxpbmVTdW1tYXJ5ID0gISFzdGFydERhdGUgJiYgISFlbmREYXRlICYmICFzaG93TWFudWFsUGlja2VyO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJtYXgtdy0zeGwgbXgtYXV0byBweC0xIHNtOnB4LTIgcHQtMyBwYi00IHNwYWNlLXktMlwiPlxyXG4gICAgICB7c2hvd1N1bW1hcnkgJiYgKFxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmlsdGVyLWNhcmQgZmlsdGVyLWNhcmQtLXN1bW1hcnkgcC0zIHNtOnAtNCBtdC0xIG1iLTNcIj5cclxuICAgICAgICAgIDxIaXN0b3J5U3VtbWFyeVxyXG4gICAgICAgICAgICBzdW1tYXJ5RnJvbUxhYmVsPXtzdW1tYXJ5RnJvbX1cclxuICAgICAgICAgICAgc3VtbWFyeVRvTGFiZWw9e3N1bW1hcnlUb31cclxuICAgICAgICAgICAgZnJvbVZhbHVlPXtzdGFydERhdGUgPyBmb3JtYXREaXNwbGF5KHN0YXJ0RGF0ZSwgbG9jYWxlKSA6IFwiLS1cIn1cclxuICAgICAgICAgICAgdG9WYWx1ZT17ZW5kRGF0ZSA/IGZvcm1hdERpc3BsYXkoZW5kRGF0ZSwgbG9jYWxlKSA6IFwiLS1cIn1cclxuICAgICAgICAgICAgY2xpZW50TGFiZWw9e2NsaWVudExhYmVsfVxuICAgICAgICAgICAgY2xpZW50VmFsdWU9e3NlbGVjdGVkQ2xpZW50Py50ZXh0IHx8IFwiXCJ9XG4gICAgICAgICAgICBzaG93Q2xpZW50PXshIXNlbGVjdGVkQ2xpZW50fVxuICAgICAgICAgICAgb3duZXJMYWJlbD17b3duZXJMYWJlbH1cbiAgICAgICAgICAgIG93bmVyVmFsdWU9e3NlbGVjdGVkT3duZXJUZXh0fVxuICAgICAgICAgICAgc2hvd093bmVyPXshIXNlbGVjdGVkT3duZXJUZXh0fVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cbiAgICAgIHtzaG93RmlsdGVycyAmJiAoXG4gICAgICAgIDxIaXN0b3J5RmlsdGVyUGFuZWxcbiAgICAgICAgICBhY3RpdmF0b3JSZWY9e2FjdGl2YXRvclJlZn1cbiAgICAgICAgICBwb3BvdmVyUmVmPXtwb3BvdmVyUmVmfVxuICAgICAgICAgIHF1aWNrRmlsdGVycz17cXVpY2tGaWx0ZXJzfVxuICAgICAgICAgIGFjdGl2ZVF1aWNrRmlsdGVyPXthY3RpdmVRdWlja0ZpbHRlcn1cbiAgICAgICAgICBzaG93SW5saW5lU3VtbWFyeT17c2hvd0lubGluZVN1bW1hcnl9XG4gICAgICAgICAgc2hvd01hbnVhbFBpY2tlcj17c2hvd01hbnVhbFBpY2tlcn1cbiAgICAgICAgICBzdW1tYXJ5RnJvbUxhYmVsPXtzdW1tYXJ5RnJvbX1cbiAgICAgICAgICBzdW1tYXJ5VG9MYWJlbD17c3VtbWFyeVRvfVxuICAgICAgICAgIGZyb21WYWx1ZT17c3RhcnREYXRlID8gZm9ybWF0RGlzcGxheShzdGFydERhdGUsIGxvY2FsZSkgOiBcIi0tXCJ9XG4gICAgICAgICAgdG9WYWx1ZT17ZW5kRGF0ZSA/IGZvcm1hdERpc3BsYXkoZW5kRGF0ZSwgbG9jYWxlKSA6IFwiLS1cIn1cbiAgICAgICAgICBvd25lckxhYmVsPXtvd25lckxhYmVsfVxuICAgICAgICAgIG93bmVyVmFsdWU9e3NlbGVjdGVkT3duZXJUZXh0fVxuICAgICAgICAgIGZpbHRlclRpdGxlPXtmaWx0ZXJUaXRsZX1cbiAgICAgICAgICBzaG93TWFudWFsRXJyb3I9e3Nob3dNYW51YWxFcnJvcn1cbiAgICAgICAgICBzaG93U3RhcnRFcnJvcj17c2hvd01hbnVhbEVycm9yICYmICFzdGFydERhdGV9XG4gICAgICAgICAgc2hvd0VuZEVycm9yPXtzaG93TWFudWFsRXJyb3IgJiYgIWVuZERhdGV9XG4gICAgICAgICAgaXNPcGVuPXtpc09wZW59XG4gICAgICAgICAgc2VsZWN0aW5nU3RlcD17c2VsZWN0aW5nU3RlcH1cbiAgICAgICAgICBsYWJlbEZyb209e2xhYmVsRnJvbX1cbiAgICAgICAgICBsYWJlbFRvPXtsYWJlbFRvfVxuICAgICAgICAgIHN0YXJ0RGF0ZVRleHQ9e3N0YXJ0RGF0ZSA/IGZvcm1hdERpc3BsYXkoc3RhcnREYXRlLCBsb2NhbGUpIDogYWRkRGF0ZUxhYmVsfVxuICAgICAgICAgIGVuZERhdGVUZXh0PXtlbmREYXRlID8gZm9ybWF0RGlzcGxheShlbmREYXRlLCBsb2NhbGUpIDogYWRkRGF0ZUxhYmVsfVxuICAgICAgICAgIGNsZWFyUmFuZ2VMYWJlbD17Y2xlYXJSYW5nZUxhYmVsfVxuICAgICAgICAgIGhhc1NlbGVjdGVkUmFuZ2U9eyEhc3RhcnREYXRlIHx8ICEhZW5kRGF0ZX1cbiAgICAgICAgICBtb250aExhYmVsPXtjYWxlbmRhckxhYmVsfVxuICAgICAgICAgIHdlZWtEYXlMYWJlbHM9e3dlZWtEYXlMYWJlbHN9XG4gICAgICAgICAgc3RhdHVzVGV4dD17c2VsZWN0aW5nU3RlcCA9PT0gXCJzdGFydFwiID8gc3RhdHVzU2VsZWN0U3RhcnRMYWJlbCA6IHN0YXR1c1NlbGVjdEVuZExhYmVsfVxuICAgICAgICAgIGRheUNlbGxzPXttYW51YWxEYXlDZWxsc31cbiAgICAgICAgICBwcmV2TW9udGhMYWJlbD17cHJldk1vbnRoTGFiZWx9XG4gICAgICAgICAgbmV4dE1vbnRoTGFiZWw9e25leHRNb250aExhYmVsfVxuICAgICAgICAgIGNsaWVudFJlc2V0S2V5PXtjbGllbnRSZXNldEtleX1cbiAgICAgICAgICBzZWxlY3RlZENsaWVudD17c2VsZWN0ZWRDbGllbnR9XG4gICAgICAgICAgY2xpZW50TGFiZWw9e2NsaWVudExhYmVsfVxuICAgICAgICAgIHZpc2libGVWaXNpdFVzZXJzPXt2aXNpYmxlVmlzaXRVc2Vyc31cbiAgICAgICAgICBjdXJyZW50T3duZXJBeFVzZXJJZD17YXhVc2VySWR9XG4gICAgICAgICAgc2VsZWN0ZWRPd25lckF4VXNlcklkPXtlZmZlY3RpdmVTZWxlY3RlZE93bmVyQXhVc2VySWR9XG4gICAgICAgICAgdmlzaWJsZVVzZXJzTG9hZGluZz17dmlzaWJsZVVzZXJzTG9hZGluZ31cbiAgICAgICAgICB2aXNpYmxlVXNlcnNFcnJvcj17dmlzaWJsZVVzZXJzRXJyb3J9XG4gICAgICAgICAgb3duZXJBbGxMYWJlbD17b3duZXJBbGxMYWJlbH1cbiAgICAgICAgICBvd25lck5vVXNlcnNMYWJlbD17b3duZXJOb1VzZXJzTGFiZWx9XG4gICAgICAgICAgb3duZXJMb2FkaW5nTGFiZWw9e293bmVyTG9hZGluZ0xhYmVsfVxuICAgICAgICAgIHNob3dGaWx0ZXJBY3Rpb25zPXtzaG93RmlsdGVyQWN0aW9uc31cbiAgICAgICAgICBjbGVhckxhYmVsPXtjbGVhckxhYmVsfVxuICAgICAgICAgIGFwcGx5TGFiZWw9e2FwcGx5TGFiZWx9XG4gICAgICAgICAgb25RdWlja0ZpbHRlcj17aGFuZGxlUXVpY2tGaWx0ZXJ9XG4gICAgICAgICAgb25PcGVuUG9wb3Zlcj17b3BlblBvcG92ZXJ9XG4gICAgICAgICAgb25BY3RpdmF0b3JLZXlEb3duPXtoYW5kbGVBY3RpdmF0b3JLZXlEb3dufVxuICAgICAgICAgIG9uU2VjdGlvbktleURvd249e2hhbmRsZVNlY3Rpb25LZXlEb3dufVxuICAgICAgICAgIG9uQ2xlYXJEYXRlPXtoYW5kbGVDbGVhcn1cbiAgICAgICAgICBvblByZXZNb250aD17aGFuZGxlUHJldk1vbnRofVxuICAgICAgICAgIG9uTmV4dE1vbnRoPXtoYW5kbGVOZXh0TW9udGh9XG4gICAgICAgICAgb25HcmlkTW91c2VMZWF2ZT17aGFuZGxlR3JpZE1vdXNlTGVhdmV9XG4gICAgICAgICAgb25EYXlDbGljaz17aGFuZGxlTWFudWFsRGF5Q2xpY2t9XG4gICAgICAgICAgb25EYXlIb3Zlcj17aGFuZGxlTWFudWFsRGF5SG92ZXJ9XG4gICAgICAgICAgb25DbGllbnRTZWxlY3RlZD17aGFuZGxlQ2xpZW50U2VsZWN0ZWR9XG4gICAgICAgICAgb25Pd25lckNoYW5nZT17c2V0U2VsZWN0ZWRPd25lckF4VXNlcklkfVxuICAgICAgICAgIG9uUmVzZXRGaWx0ZXJzPXtoYW5kbGVSZXNldEZpbHRlcnN9XG4gICAgICAgICAgb25BcHBseUZpbHRlcnM9eygpID0+IHtcbiAgICAgICAgICAgIGFwcGx5RmlsdGVycyh7IGNsb3NlUGFuZWw6IHRydWUsIHBhZ2U6IDEgfSk7XG4gICAgICAgICAgfX1cbiAgICAgICAgLz5cbiAgICAgICl9XG5cclxuICAgICAgPGlucHV0IHR5cGU9XCJoaWRkZW5cIiBpZD1cImZyb21EYXRlXCIgdmFsdWU9e2Zyb21EYXRlVmFsdWV9IHJlYWRPbmx5IC8+XHJcbiAgICAgIDxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgaWQ9XCJ0b0RhdGVcIiB2YWx1ZT17dG9EYXRlVmFsdWV9IHJlYWRPbmx5IC8+XHJcblxyXG4gICAgICA8SGlzdG9yeVJlc3VsdHNTZWN0aW9uXG4gICAgICAgIHNob3dSZXN1bHRzPXtzaG93UmVzdWx0c31cbiAgICAgICAgaXNMb2FkaW5nPXtpc0xvYWRpbmd9XG4gICAgICAgIGxvYWRpbmdMYWJlbD17bG9hZGluZ0xhYmVsfVxuICAgICAgICB0aW1lbGluZUl0ZW1zPXt0aW1lbGluZUl0ZW1zfVxuICAgICAgICBub0RhdGFUZXh0PXtub1Zpc2l0c0luUmFuZ2VMYWJlbH1cbiAgICAgICAgZXJyb3JNZXNzYWdlPXtlcnJvck1lc3NhZ2V9XG4gICAgICAgIHRvdGFsUGFnZXM9e3RvdGFsUGFnZXN9XG4gICAgICAgIGN1cnJlbnRQYWdlPXtjdXJyZW50UGFnZX1cbiAgICAgICAgcGFnZVdpbmRvdz17UEFHRV9XSU5ET1d9XG4gICAgICAgIHBhZ2luYXRpb25MYWJlbHM9e3BhZ2luYXRpb25MYWJlbHN9XG4gICAgICAgIG9uTmF2aWdhdGU9e2hhbmRsZU5hdmlnYXRlfVxuICAgICAgICBvblBhZ2VDaGFuZ2U9e2xvYWRBY3Rpdml0aWVzfVxuICAgICAgLz5cbiAgICAgIHtjYW5DcmVhdGVWaXNpdCAmJiAoXG4gICAgICAgIDxGbG9hdGluZ0FjdGlvbkJ1dHRvblxuICAgICAgICAgIHJvdXRlPVwiL1Zpc2l0YXMvQ3JlYXRlP2ZyZXNoPTFcIlxuICAgICAgICAgIGFyaWFMYWJlbD17Y3JlYXRlTGFiZWx9XG4gICAgICAgICAgc2l6ZT17NzZ9XG4gICAgICAgICAgcmlnaHQ9ezE2fVxuICAgICAgICAgIGJvdHRvbT17RkFCX0JBU0VfQk9UVE9NfVxyXG4gICAgICAgIC8+XHJcbiAgICAgICl9XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuLy8gTW91bnQgaGVscGVyIGZvciB0aGUgbGVnYWN5IFJhem9yIHZpZXcuXHJcbmV4cG9ydCBjb25zdCBtb3VudEhpc3RvcnlQYWdlID0gKHJvb3Q6IEhUTUxFbGVtZW50KSA9PiB7XG4gIGNvbnN0IGRlZmF1bHRGcm9tRGF0ZSA9IHJvb3QuZ2V0QXR0cmlidXRlKFwiZGF0YS1kZWZhdWx0LWZyb21cIikgfHwgXCJcIjtcbiAgY29uc3QgZGVmYXVsdFRvRGF0ZSA9IHJvb3QuZ2V0QXR0cmlidXRlKFwiZGF0YS1kZWZhdWx0LXRvXCIpIHx8IFwiXCI7XG4gIGNvbnN0IGNvbXBhbnlJZCA9IHJvb3QuZ2V0QXR0cmlidXRlKFwiZGF0YS1jb21wYW55LWlkXCIpIHx8IFwiXCI7XG4gIGNvbnN0IGF4VXNlcklkID0gcm9vdC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWF4LXVzZXItaWRcIikgfHwgXCJcIjtcbiAgY29uc3QgcGVybWlzc2lvbnNSZXZpc2lvbiA9IHJvb3QuZ2V0QXR0cmlidXRlKFwiZGF0YS1wZXJtaXNzaW9ucy1yZXZpc2lvblwiKSB8fCBcIlwiO1xuXG4gIG1vdW50UmVhY3RJc2xhbmQoXG4gICAgcm9vdCxcbiAgICA8SGlzdG9yeVBhZ2VcbiAgICAgIGRlZmF1bHRGcm9tRGF0ZT17ZGVmYXVsdEZyb21EYXRlfVxuICAgICAgZGVmYXVsdFRvRGF0ZT17ZGVmYXVsdFRvRGF0ZX1cbiAgICAgIGNvbXBhbnlJZD17Y29tcGFueUlkfVxuICAgICAgYXhVc2VySWQ9e2F4VXNlcklkfVxuICAgICAgcGVybWlzc2lvbnNSZXZpc2lvbj17cGVybWlzc2lvbnNSZXZpc2lvbn1cbiAgICAvPlxuICApO1xufTtcblxyXG5jb25zdCBtb3VudCA9ICgpID0+IHtcclxuICBjb25zdCByb290RWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpc2l0YXMtaGlzdG9yeS1yb290XCIpO1xyXG4gIGlmICghcm9vdEVsKSByZXR1cm47XHJcbiAgbW91bnRIaXN0b3J5UGFnZShyb290RWwpO1xyXG59O1xyXG5cclxubW91bnRXaGVuRG9jdW1lbnRSZWFkeShtb3VudCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBIaXN0b3J5UGFnZTtcclxuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBTcGlubmVyIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvU3Bpbm5lci50c3hcIjtcbmltcG9ydCB7IENoZXZyb25Eb3duU3ZnIH0gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9jaGV2cm9ucy50c3hcIjtcbmltcG9ydCB7IGNsYXNzTmFtZXMgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvY2xhc3NOYW1lcy50c1wiO1xuaW1wb3J0IHsgZm9ybWF0VmlzaWJsZVZpc2l0VXNlckxhYmVsLCB0eXBlIERhdGFWaXNpYmlsaXR5VmlzaWJsZVVzZXIgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvdmlzaWJsZVZpc2l0VXNlcnMudHNcIjtcblxudHlwZSBQcm9wcyA9IHtcbiAgdXNlcnM6IERhdGFWaXNpYmlsaXR5VmlzaWJsZVVzZXJbXTtcbiAgY3VycmVudE93bmVyQXhVc2VySWQ6IHN0cmluZztcbiAgc2VsZWN0ZWRPd25lckF4VXNlcklkOiBzdHJpbmc7XG4gIGxvYWRpbmc6IGJvb2xlYW47XG4gIGVycm9yTWVzc2FnZTogc3RyaW5nO1xuICBsYWJlbDogc3RyaW5nO1xuICBhbGxMYWJlbDogc3RyaW5nO1xuICBub1VzZXJzTGFiZWw6IHN0cmluZztcbiAgbG9hZGluZ0xhYmVsOiBzdHJpbmc7XG4gIG9uQ2hhbmdlOiAob3duZXJBeFVzZXJJZDogc3RyaW5nKSA9PiB2b2lkO1xufTtcblxuLy8gRml4ZWQgZW51bSBzZWxlY3QgZm9yIHZpc2libGUgdmlzaXQgb3duZXIgZmlsdGVyaW5nLlxuY29uc3QgVmlzaWJsZVZpc2l0T3duZXJTZWxlY3QgPSAoe1xuICB1c2VycyxcbiAgY3VycmVudE93bmVyQXhVc2VySWQsXG4gIHNlbGVjdGVkT3duZXJBeFVzZXJJZCxcbiAgbG9hZGluZyxcbiAgZXJyb3JNZXNzYWdlLFxuICBsYWJlbCxcbiAgYWxsTGFiZWwsXG4gIG5vVXNlcnNMYWJlbCxcbiAgbG9hZGluZ0xhYmVsLFxuICBvbkNoYW5nZSxcbn06IFByb3BzKSA9PiB7XG4gIGNvbnN0IGhhc1N1Ym9yZGluYXRlcyA9IHVzZXJzLmxlbmd0aCA+IDA7XG4gIGNvbnN0IGRpc2FibGVkID0gbG9hZGluZyB8fCAhaGFzU3Vib3JkaW5hdGVzO1xuICBjb25zdCBzZWxlY3RlZFVzZXJFeGlzdHMgPSB1c2Vycy5zb21lKCh1c2VyKSA9PiB1c2VyLmF4VXNlcklkLnRvVXBwZXJDYXNlKCkgPT09IHNlbGVjdGVkT3duZXJBeFVzZXJJZC50b1VwcGVyQ2FzZSgpKTtcbiAgY29uc3Qgc2VsZWN0VmFsdWUgPSBoYXNTdWJvcmRpbmF0ZXMgJiYgc2VsZWN0ZWRVc2VyRXhpc3RzID8gc2VsZWN0ZWRPd25lckF4VXNlcklkIDogXCJcIjtcbiAgY29uc3QgY3VycmVudE93bmVyTGFiZWwgPSBTdHJpbmcoY3VycmVudE93bmVyQXhVc2VySWQgfHwgXCJcIikudHJpbSgpIHx8IG5vVXNlcnNMYWJlbDtcbiAgY29uc3Qgc3RhdHVzVGV4dCA9IGxvYWRpbmcgPyBsb2FkaW5nTGFiZWwgOiBlcnJvck1lc3NhZ2U7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMVwiPlxuICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInNyLW9ubHlcIiBodG1sRm9yPVwiaGlzdG9yeS12aXNpYmxlLW93bmVyXCI+XG4gICAgICAgIHtsYWJlbH1cbiAgICAgIDwvbGFiZWw+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlXCI+XG4gICAgICAgIDxzZWxlY3RcbiAgICAgICAgICBpZD1cImhpc3RvcnktdmlzaWJsZS1vd25lclwiXG4gICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAgICAgXCJ3LWZ1bGwgYXBwZWFyYW5jZS1ub25lIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIGJnLXdoaXRlIHB4LTMgcHktMiBwci0xMCB0ZXh0LXNtIHNtOnRleHQtYmFzZSBsZWFkaW5nLTUgdGV4dC1zbGF0ZS05MDAgZm9jdXM6b3V0bGluZS1oaWRkZW4gZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctcHJpbWFyeSBmb2N1czpib3JkZXItcHJpbWFyeVwiLFxuICAgICAgICAgICAgZGlzYWJsZWQgPyBcImN1cnNvci1ub3QtYWxsb3dlZCB0ZXh0LXNsYXRlLTUwMFwiIDogXCJcIlxuICAgICAgICAgICl9XG4gICAgICAgICAgdmFsdWU9e2hhc1N1Ym9yZGluYXRlcyA/IHNlbGVjdFZhbHVlIDogY3VycmVudE93bmVyTGFiZWx9XG4gICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gb25DaGFuZ2UoZXZlbnQudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgYXJpYS1sYWJlbD17bGFiZWx9XG4gICAgICAgICAgYXJpYS1idXN5PXtsb2FkaW5nfVxuICAgICAgICA+XG4gICAgICAgICAge2hhc1N1Ym9yZGluYXRlcyA/IChcbiAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJcIj57YWxsTGFiZWx9PC9vcHRpb24+XG4gICAgICAgICAgICAgIHt1c2Vycy5tYXAoKHVzZXIpID0+IChcbiAgICAgICAgICAgICAgICA8b3B0aW9uIGtleT17dXNlci5heFVzZXJJZH0gdmFsdWU9e3VzZXIuYXhVc2VySWR9PlxuICAgICAgICAgICAgICAgICAge2Zvcm1hdFZpc2libGVWaXNpdFVzZXJMYWJlbCh1c2VyKX1cbiAgICAgICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8Lz5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT17Y3VycmVudE93bmVyTGFiZWx9PntjdXJyZW50T3duZXJMYWJlbH08L29wdGlvbj5cbiAgICAgICAgICApfVxuICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicG9pbnRlci1ldmVudHMtbm9uZSBhYnNvbHV0ZSBpbnNldC15LTAgcmlnaHQtMCBmbGV4IGl0ZW1zLWNlbnRlciBwci0zIHRleHQtc2xhdGUtNTAwXCI+XG4gICAgICAgICAge2xvYWRpbmcgPyA8U3Bpbm5lciBzaXplPVwiaC00IHctNFwiIGxhYmVsPXtsb2FkaW5nTGFiZWx9IC8+IDogPENoZXZyb25Eb3duU3ZnIGNsYXNzTmFtZT1cImgtNSB3LTVcIiAvPn1cbiAgICAgICAgPC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgICB7c3RhdHVzVGV4dCAmJiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsIGZsZXgganVzdGlmeS1lbmRcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXCJ0ZXh0LXhzIHRlY2gtaW5mb1wiLCBlcnJvck1lc3NhZ2UgPyBcInRleHQtYW1iZXItNzAwXCIgOiBcInRleHQtc2xhdGUtNTAwXCIpfT57c3RhdHVzVGV4dH08L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFZpc2libGVWaXNpdE93bmVyU2VsZWN0O1xuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBBY3Rpb25CdXR0b24gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9BY3Rpb25CdXR0b24udHN4XCI7XG5pbXBvcnQgRmlsdGVyQnV0dG9uIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvRmlsdGVyQnV0dG9uLnRzeFwiO1xuaW1wb3J0IENsaWVudFNlYXJjaENvbWJvYm94LCB7IHR5cGUgQ2xpZW50T3B0aW9uIH0gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvdmlzaXRhcy9DbGllbnRTZWFyY2hDb21ib2JveC50c3hcIjtcbmltcG9ydCBIaXN0b3J5TWFudWFsRGF0ZVBpY2tlciwgeyB0eXBlIEhpc3RvcnlNYW51YWxEYXlDZWxsIH0gZnJvbSBcIi4vSGlzdG9yeU1hbnVhbERhdGVQaWNrZXIudHN4XCI7XG5pbXBvcnQgSGlzdG9yeVN1bW1hcnkgZnJvbSBcIi4vSGlzdG9yeVN1bW1hcnkudHN4XCI7XG5pbXBvcnQgVmlzaWJsZVZpc2l0T3duZXJTZWxlY3QgZnJvbSBcIi4vVmlzaWJsZVZpc2l0T3duZXJTZWxlY3QudHN4XCI7XG5pbXBvcnQgdHlwZSB7IFF1aWNrRmlsdGVySWQgfSBmcm9tIFwiLi91c2VIaXN0b3J5RmlsdGVyc1N0YXRlLnRzXCI7XG5pbXBvcnQgdHlwZSB7IERhdGFWaXNpYmlsaXR5VmlzaWJsZVVzZXIgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvdmlzaWJsZVZpc2l0VXNlcnMudHNcIjtcblxudHlwZSBRdWlja0ZpbHRlck9wdGlvbiA9IHtcbiAgaWQ6IFF1aWNrRmlsdGVySWQ7XG4gIGxhYmVsOiBzdHJpbmc7XG59O1xuXG50eXBlIFByb3BzID0ge1xuICBhY3RpdmF0b3JSZWY6IFJlYWN0LlJlZk9iamVjdDxIVE1MRGl2RWxlbWVudCB8IG51bGw+O1xuICBwb3BvdmVyUmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTERpdkVsZW1lbnQgfCBudWxsPjtcbiAgcXVpY2tGaWx0ZXJzOiBRdWlja0ZpbHRlck9wdGlvbltdO1xuICBhY3RpdmVRdWlja0ZpbHRlcjogUXVpY2tGaWx0ZXJJZCB8IG51bGw7XG4gIHNob3dJbmxpbmVTdW1tYXJ5OiBib29sZWFuO1xuICBzaG93TWFudWFsUGlja2VyOiBib29sZWFuO1xuICBzdW1tYXJ5RnJvbUxhYmVsOiBzdHJpbmc7XG4gIHN1bW1hcnlUb0xhYmVsOiBzdHJpbmc7XG4gIGZyb21WYWx1ZTogc3RyaW5nO1xuICB0b1ZhbHVlOiBzdHJpbmc7XG4gIG93bmVyTGFiZWw6IHN0cmluZztcbiAgb3duZXJWYWx1ZTogc3RyaW5nO1xuICBmaWx0ZXJUaXRsZTogc3RyaW5nO1xuICBzaG93TWFudWFsRXJyb3I6IGJvb2xlYW47XG4gIHNob3dTdGFydEVycm9yOiBib29sZWFuO1xuICBzaG93RW5kRXJyb3I6IGJvb2xlYW47XG4gIGlzT3BlbjogYm9vbGVhbjtcbiAgc2VsZWN0aW5nU3RlcDogXCJzdGFydFwiIHwgXCJlbmRcIiB8IFwiZG9uZVwiO1xuICBsYWJlbEZyb206IHN0cmluZztcbiAgbGFiZWxUbzogc3RyaW5nO1xuICBzdGFydERhdGVUZXh0OiBzdHJpbmc7XG4gIGVuZERhdGVUZXh0OiBzdHJpbmc7XG4gIGNsZWFyUmFuZ2VMYWJlbDogc3RyaW5nO1xuICBoYXNTZWxlY3RlZFJhbmdlOiBib29sZWFuO1xuICBtb250aExhYmVsOiBzdHJpbmc7XG4gIHdlZWtEYXlMYWJlbHM6IHN0cmluZ1tdO1xuICBzdGF0dXNUZXh0OiBzdHJpbmc7XG4gIGRheUNlbGxzOiBIaXN0b3J5TWFudWFsRGF5Q2VsbFtdO1xuICBwcmV2TW9udGhMYWJlbDogc3RyaW5nO1xuICBuZXh0TW9udGhMYWJlbDogc3RyaW5nO1xuICBjbGllbnRSZXNldEtleTogbnVtYmVyO1xuICBzZWxlY3RlZENsaWVudDogQ2xpZW50T3B0aW9uIHwgbnVsbDtcbiAgY2xpZW50TGFiZWw6IHN0cmluZztcbiAgdmlzaWJsZVZpc2l0VXNlcnM6IERhdGFWaXNpYmlsaXR5VmlzaWJsZVVzZXJbXTtcbiAgY3VycmVudE93bmVyQXhVc2VySWQ6IHN0cmluZztcbiAgc2VsZWN0ZWRPd25lckF4VXNlcklkOiBzdHJpbmc7XG4gIHZpc2libGVVc2Vyc0xvYWRpbmc6IGJvb2xlYW47XG4gIHZpc2libGVVc2Vyc0Vycm9yOiBzdHJpbmc7XG4gIG93bmVyQWxsTGFiZWw6IHN0cmluZztcbiAgb3duZXJOb1VzZXJzTGFiZWw6IHN0cmluZztcbiAgb3duZXJMb2FkaW5nTGFiZWw6IHN0cmluZztcbiAgc2hvd0ZpbHRlckFjdGlvbnM6IGJvb2xlYW47XG4gIGNsZWFyTGFiZWw6IHN0cmluZztcbiAgYXBwbHlMYWJlbDogc3RyaW5nO1xuICBvblF1aWNrRmlsdGVyOiAoZmlsdGVySWQ6IFF1aWNrRmlsdGVySWQpID0+IHZvaWQ7XG4gIG9uT3BlblBvcG92ZXI6IChzZWN0aW9uOiBcInN0YXJ0XCIgfCBcImVuZFwiKSA9PiB2b2lkO1xuICBvbkFjdGl2YXRvcktleURvd246IChldmVudDogUmVhY3QuS2V5Ym9hcmRFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHZvaWQ7XG4gIG9uU2VjdGlvbktleURvd246IChldmVudDogUmVhY3QuS2V5Ym9hcmRFdmVudDxIVE1MRGl2RWxlbWVudD4sIHNlY3Rpb246IFwic3RhcnRcIiB8IFwiZW5kXCIpID0+IHZvaWQ7XG4gIG9uQ2xlYXJEYXRlOiAoZXZlbnQ6IFJlYWN0Lk1vdXNlRXZlbnQpID0+IHZvaWQ7XG4gIG9uUHJldk1vbnRoOiAoZXZlbnQ6IFJlYWN0Lk1vdXNlRXZlbnQ8SFRNTEJ1dHRvbkVsZW1lbnQ+KSA9PiB2b2lkO1xuICBvbk5leHRNb250aDogKGV2ZW50OiBSZWFjdC5Nb3VzZUV2ZW50PEhUTUxCdXR0b25FbGVtZW50PikgPT4gdm9pZDtcbiAgb25HcmlkTW91c2VMZWF2ZTogKCkgPT4gdm9pZDtcbiAgb25EYXlDbGljazogKGRheTogSGlzdG9yeU1hbnVhbERheUNlbGwpID0+IHZvaWQ7XG4gIG9uRGF5SG92ZXI6IChkYXk6IEhpc3RvcnlNYW51YWxEYXlDZWxsKSA9PiB2b2lkO1xuICBvbkNsaWVudFNlbGVjdGVkOiAoY2xpZW50OiBDbGllbnRPcHRpb24gfCBudWxsKSA9PiB2b2lkO1xuICBvbk93bmVyQ2hhbmdlOiAob3duZXJBeFVzZXJJZDogc3RyaW5nKSA9PiB2b2lkO1xuICBvblJlc2V0RmlsdGVyczogKCkgPT4gdm9pZDtcbiAgb25BcHBseUZpbHRlcnM6ICgpID0+IHZvaWQ7XG59O1xuXG4vLyBSZW5kZXJzIGhpc3RvcnkgZmlsdGVyIGNvbnRyb2xzIHdoaWxlIHRoZSBwYWdlIGNvbnRhaW5lciBvd25zIHN0YXRlIGFuZCBkYXRhIGxvYWRpbmcuXG5jb25zdCBIaXN0b3J5RmlsdGVyUGFuZWwgPSAoe1xuICBhY3RpdmF0b3JSZWYsXG4gIHBvcG92ZXJSZWYsXG4gIHF1aWNrRmlsdGVycyxcbiAgYWN0aXZlUXVpY2tGaWx0ZXIsXG4gIHNob3dJbmxpbmVTdW1tYXJ5LFxuICBzaG93TWFudWFsUGlja2VyLFxuICBzdW1tYXJ5RnJvbUxhYmVsLFxuICBzdW1tYXJ5VG9MYWJlbCxcbiAgZnJvbVZhbHVlLFxuICB0b1ZhbHVlLFxuICBvd25lckxhYmVsLFxuICBvd25lclZhbHVlLFxuICBmaWx0ZXJUaXRsZSxcbiAgc2hvd01hbnVhbEVycm9yLFxuICBzaG93U3RhcnRFcnJvcixcbiAgc2hvd0VuZEVycm9yLFxuICBpc09wZW4sXG4gIHNlbGVjdGluZ1N0ZXAsXG4gIGxhYmVsRnJvbSxcbiAgbGFiZWxUbyxcbiAgc3RhcnREYXRlVGV4dCxcbiAgZW5kRGF0ZVRleHQsXG4gIGNsZWFyUmFuZ2VMYWJlbCxcbiAgaGFzU2VsZWN0ZWRSYW5nZSxcbiAgbW9udGhMYWJlbCxcbiAgd2Vla0RheUxhYmVscyxcbiAgc3RhdHVzVGV4dCxcbiAgZGF5Q2VsbHMsXG4gIHByZXZNb250aExhYmVsLFxuICBuZXh0TW9udGhMYWJlbCxcbiAgY2xpZW50UmVzZXRLZXksXG4gIHNlbGVjdGVkQ2xpZW50LFxuICBjbGllbnRMYWJlbCxcbiAgdmlzaWJsZVZpc2l0VXNlcnMsXG4gIGN1cnJlbnRPd25lckF4VXNlcklkLFxuICBzZWxlY3RlZE93bmVyQXhVc2VySWQsXG4gIHZpc2libGVVc2Vyc0xvYWRpbmcsXG4gIHZpc2libGVVc2Vyc0Vycm9yLFxuICBvd25lckFsbExhYmVsLFxuICBvd25lck5vVXNlcnNMYWJlbCxcbiAgb3duZXJMb2FkaW5nTGFiZWwsXG4gIHNob3dGaWx0ZXJBY3Rpb25zLFxuICBjbGVhckxhYmVsLFxuICBhcHBseUxhYmVsLFxuICBvblF1aWNrRmlsdGVyLFxuICBvbk9wZW5Qb3BvdmVyLFxuICBvbkFjdGl2YXRvcktleURvd24sXG4gIG9uU2VjdGlvbktleURvd24sXG4gIG9uQ2xlYXJEYXRlLFxuICBvblByZXZNb250aCxcbiAgb25OZXh0TW9udGgsXG4gIG9uR3JpZE1vdXNlTGVhdmUsXG4gIG9uRGF5Q2xpY2ssXG4gIG9uRGF5SG92ZXIsXG4gIG9uQ2xpZW50U2VsZWN0ZWQsXG4gIG9uT3duZXJDaGFuZ2UsXG4gIG9uUmVzZXRGaWx0ZXJzLFxuICBvbkFwcGx5RmlsdGVycyxcbn06IFByb3BzKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJmaWx0ZXItY2FyZCBmaWx0ZXItY2FyZC0tZXhwYW5kZWQgcC0yIHNtOnAtMi41IHJlbGF0aXZlXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImdhcC15LTEuNSBoaXN0b3J5LWZpbHRlci1zdGFjayBmbGV4IGZsZXgtY29sXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBnYXAtMiBoaXN0b3J5LXF1aWNrLWZpbHRlcnNcIiBhcmlhLWxhYmVsPXtmaWx0ZXJUaXRsZX0+XG4gICAgICAgICAge3F1aWNrRmlsdGVycy5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGlzQWN0aXZlID0gYWN0aXZlUXVpY2tGaWx0ZXIgPT09IGl0ZW0uaWQ7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICA8RmlsdGVyQnV0dG9uXG4gICAgICAgICAgICAgICAga2V5PXtpdGVtLmlkfVxuICAgICAgICAgICAgICAgIGxhYmVsPXtpdGVtLmxhYmVsfVxuICAgICAgICAgICAgICAgIGFjdGl2ZT17aXNBY3RpdmV9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsXCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvblF1aWNrRmlsdGVyKGl0ZW0uaWQpfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9KX1cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAge3Nob3dJbmxpbmVTdW1tYXJ5ICYmIChcbiAgICAgICAgICA8SGlzdG9yeVN1bW1hcnlcbiAgICAgICAgICAgIHN1bW1hcnlGcm9tTGFiZWw9e3N1bW1hcnlGcm9tTGFiZWx9XG4gICAgICAgICAgICBzdW1tYXJ5VG9MYWJlbD17c3VtbWFyeVRvTGFiZWx9XG4gICAgICAgICAgICBmcm9tVmFsdWU9e2Zyb21WYWx1ZX1cbiAgICAgICAgICAgIHRvVmFsdWU9e3RvVmFsdWV9XG4gICAgICAgICAgICBvd25lckxhYmVsPXtvd25lckxhYmVsfVxuICAgICAgICAgICAgb3duZXJWYWx1ZT17b3duZXJWYWx1ZX1cbiAgICAgICAgICAgIHNob3dPd25lcj17ISFvd25lclZhbHVlfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiZ2FwLXktMSB0ZXh0LVsxMXB4XSBweC0xXCJcbiAgICAgICAgICAvPlxuICAgICAgICApfVxuXG4gICAgICAgIHtzaG93TWFudWFsUGlja2VyICYmIChcbiAgICAgICAgICA8SGlzdG9yeU1hbnVhbERhdGVQaWNrZXJcbiAgICAgICAgICAgIGFjdGl2YXRvclJlZj17YWN0aXZhdG9yUmVmfVxuICAgICAgICAgICAgcG9wb3ZlclJlZj17cG9wb3ZlclJlZn1cbiAgICAgICAgICAgIHNob3dNYW51YWxFcnJvcj17c2hvd01hbnVhbEVycm9yfVxuICAgICAgICAgICAgc2hvd1N0YXJ0RXJyb3I9e3Nob3dTdGFydEVycm9yfVxuICAgICAgICAgICAgc2hvd0VuZEVycm9yPXtzaG93RW5kRXJyb3J9XG4gICAgICAgICAgICBmaWx0ZXJUaXRsZT17ZmlsdGVyVGl0bGV9XG4gICAgICAgICAgICBpc09wZW49e2lzT3Blbn1cbiAgICAgICAgICAgIHNlbGVjdGluZ1N0ZXA9e3NlbGVjdGluZ1N0ZXB9XG4gICAgICAgICAgICBsYWJlbEZyb209e2xhYmVsRnJvbX1cbiAgICAgICAgICAgIGxhYmVsVG89e2xhYmVsVG99XG4gICAgICAgICAgICBzdGFydERhdGVUZXh0PXtzdGFydERhdGVUZXh0fVxuICAgICAgICAgICAgZW5kRGF0ZVRleHQ9e2VuZERhdGVUZXh0fVxuICAgICAgICAgICAgY2xlYXJSYW5nZUxhYmVsPXtjbGVhclJhbmdlTGFiZWx9XG4gICAgICAgICAgICBoYXNTZWxlY3RlZFJhbmdlPXtoYXNTZWxlY3RlZFJhbmdlfVxuICAgICAgICAgICAgbW9udGhMYWJlbD17bW9udGhMYWJlbH1cbiAgICAgICAgICAgIHdlZWtEYXlMYWJlbHM9e3dlZWtEYXlMYWJlbHN9XG4gICAgICAgICAgICBzdGF0dXNUZXh0PXtzdGF0dXNUZXh0fVxuICAgICAgICAgICAgZGF5Q2VsbHM9e2RheUNlbGxzfVxuICAgICAgICAgICAgcHJldk1vbnRoTGFiZWw9e3ByZXZNb250aExhYmVsfVxuICAgICAgICAgICAgbmV4dE1vbnRoTGFiZWw9e25leHRNb250aExhYmVsfVxuICAgICAgICAgICAgb25PcGVuUG9wb3Zlcj17b25PcGVuUG9wb3Zlcn1cbiAgICAgICAgICAgIG9uQWN0aXZhdG9yS2V5RG93bj17b25BY3RpdmF0b3JLZXlEb3dufVxuICAgICAgICAgICAgb25TZWN0aW9uS2V5RG93bj17b25TZWN0aW9uS2V5RG93bn1cbiAgICAgICAgICAgIG9uQ2xlYXI9e29uQ2xlYXJEYXRlfVxuICAgICAgICAgICAgb25QcmV2TW9udGg9e29uUHJldk1vbnRofVxuICAgICAgICAgICAgb25OZXh0TW9udGg9e29uTmV4dE1vbnRofVxuICAgICAgICAgICAgb25HcmlkTW91c2VMZWF2ZT17b25HcmlkTW91c2VMZWF2ZX1cbiAgICAgICAgICAgIG9uRGF5Q2xpY2s9e29uRGF5Q2xpY2t9XG4gICAgICAgICAgICBvbkRheUhvdmVyPXtvbkRheUhvdmVyfVxuICAgICAgICAgIC8+XG4gICAgICAgICl9XG5cbiAgICAgICAgPFZpc2libGVWaXNpdE93bmVyU2VsZWN0XG4gICAgICAgICAgdXNlcnM9e3Zpc2libGVWaXNpdFVzZXJzfVxuICAgICAgICAgIGN1cnJlbnRPd25lckF4VXNlcklkPXtjdXJyZW50T3duZXJBeFVzZXJJZH1cbiAgICAgICAgICBzZWxlY3RlZE93bmVyQXhVc2VySWQ9e3NlbGVjdGVkT3duZXJBeFVzZXJJZH1cbiAgICAgICAgICBsb2FkaW5nPXt2aXNpYmxlVXNlcnNMb2FkaW5nfVxuICAgICAgICAgIGVycm9yTWVzc2FnZT17dmlzaWJsZVVzZXJzRXJyb3J9XG4gICAgICAgICAgbGFiZWw9e293bmVyTGFiZWx9XG4gICAgICAgICAgYWxsTGFiZWw9e293bmVyQWxsTGFiZWx9XG4gICAgICAgICAgbm9Vc2Vyc0xhYmVsPXtvd25lck5vVXNlcnNMYWJlbH1cbiAgICAgICAgICBsb2FkaW5nTGFiZWw9e293bmVyTG9hZGluZ0xhYmVsfVxuICAgICAgICAgIG9uQ2hhbmdlPXtvbk93bmVyQ2hhbmdlfVxuICAgICAgICAvPlxuXG4gICAgICAgIDxDbGllbnRTZWFyY2hDb21ib2JveFxuICAgICAgICAgIGtleT17Y2xpZW50UmVzZXRLZXl9XG4gICAgICAgICAgdmFsdWU9e3NlbGVjdGVkQ2xpZW50fVxuICAgICAgICAgIG9uU2VsZWN0ZWQ9e29uQ2xpZW50U2VsZWN0ZWR9XG4gICAgICAgICAgbGFiZWw9e2NsaWVudExhYmVsfVxuICAgICAgICAgIHBsYWNlaG9sZGVyPXtjbGllbnRMYWJlbH1cbiAgICAgICAgICB2YXJpYW50PVwiY29tcGFjdFwiXG4gICAgICAgICAgc2hvd0xhYmVsPXtmYWxzZX1cbiAgICAgICAgICBpZEJhc2U9XCJoaXN0b3J5LWNsaWVudFwiXG4gICAgICAgICAgcG9ydGFsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcbiAgICAgICAgLz5cblxuICAgICAgICB7c2hvd0ZpbHRlckFjdGlvbnMgJiYgKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtMSBncmlkIGdyaWQtY29scy0yIGdhcC0yIGhpc3RvcnktZmlsdGVyLWFjdGlvbnNcIj5cbiAgICAgICAgICAgIDxBY3Rpb25CdXR0b24gbGFiZWw9e2NsZWFyTGFiZWx9IGNsYXNzTmFtZT1cInctZnVsbFwiIG9uQ2xpY2s9e29uUmVzZXRGaWx0ZXJzfSAvPlxuICAgICAgICAgICAgPEFjdGlvbkJ1dHRvbiBsYWJlbD17YXBwbHlMYWJlbH0gY2xhc3NOYW1lPVwidy1mdWxsXCIgb25DbGljaz17b25BcHBseUZpbHRlcnN9IC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEhpc3RvcnlGaWx0ZXJQYW5lbDtcbiIsICJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2ssIHVzZVJlZiB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBjbGFzc05hbWVzIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2NsYXNzTmFtZXMudHNcIjtcclxuaW1wb3J0IHsgdXNlVGltZWxpbmVDYXJkRWZmZWN0cyB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VUaW1lbGluZUNhcmRFZmZlY3RzLnRzXCI7XHJcblxyXG5leHBvcnQgdHlwZSBUaW1lbGluZURhdGVQYXJ0cyA9IHtcclxuICB5ZWFyOiBzdHJpbmc7XHJcbiAgbW9udGg6IHN0cmluZztcclxuICBkYXk6IHN0cmluZztcclxufTtcclxuXHJcbmV4cG9ydCB0eXBlIFRpbWVsaW5lSXRlbSA9IHtcclxuICBpZDogc3RyaW5nO1xyXG4gIGFjdGl2aWRhZElkPzogc3RyaW5nO1xyXG4gIHJlY0lkPzogbnVtYmVyIHwgbnVsbDtcclxuICBuYW1lOiBzdHJpbmc7XHJcbiAgZGVzY3JpcHRpb246IHN0cmluZztcclxuICBmdWxsTmFtZTogc3RyaW5nO1xyXG4gIGZ1bGxEZXNjOiBzdHJpbmc7XHJcbiAgZGF0ZVBhcnRzOiBUaW1lbGluZURhdGVQYXJ0cztcclxuICBpc05vRGF0YTogYm9vbGVhbjtcclxufTtcclxuXHJcbnR5cGUgUHJvcHMgPSB7XHJcbiAgaXRlbXM6IFRpbWVsaW5lSXRlbVtdO1xyXG4gIG5vRGF0YVRleHQ6IHN0cmluZztcclxuICBlcnJvck1lc3NhZ2U6IHN0cmluZztcclxuICBvbk5hdmlnYXRlOiAobGlua0lkOiBzdHJpbmcpID0+IHZvaWQ7XHJcbn07XHJcblxyXG5jb25zdCBUQVBfTU9WRV9QWCA9IDE0O1xyXG5jb25zdCBIT0xEX1RPX1BSRVZJRVdfTVMgPSAxNjA7XHJcblxyXG50eXBlIFRhcEd1YXJkU3RhdGUgPSB7XHJcbiAgYWN0aXZlOiBib29sZWFuO1xyXG4gIHBvaW50ZXJJZDogbnVtYmVyIHwgbnVsbDtcclxuICBzdGFydFg6IG51bWJlcjtcclxuICBzdGFydFk6IG51bWJlcjtcclxuICBzdGFydFRpbWU6IG51bWJlcjtcclxuICBtb3ZlZDogYm9vbGVhbjtcclxuICBsaW5rSWQ6IHN0cmluZztcclxufTtcclxuXHJcbmNvbnN0IEhpc3RvcnlUYWJsZSA9ICh7IGl0ZW1zLCBub0RhdGFUZXh0LCBlcnJvck1lc3NhZ2UsIG9uTmF2aWdhdGUgfTogUHJvcHMpID0+IHtcclxuICBjb25zdCBjb250YWluZXJSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcclxuICBjb25zdCB0YXBHdWFyZFJlZiA9IHVzZVJlZjxUYXBHdWFyZFN0YXRlPih7XHJcbiAgICBhY3RpdmU6IGZhbHNlLFxyXG4gICAgcG9pbnRlcklkOiBudWxsLFxyXG4gICAgc3RhcnRYOiAwLFxyXG4gICAgc3RhcnRZOiAwLFxyXG4gICAgc3RhcnRUaW1lOiAwLFxyXG4gICAgbW92ZWQ6IGZhbHNlLFxyXG4gICAgbGlua0lkOiBcIlwiLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCByZXNvbHZlQ2xpY2thYmxlQ2FyZCA9IHVzZUNhbGxiYWNrKCh0YXJnZXQ6IEV2ZW50VGFyZ2V0IHwgbnVsbCkgPT4ge1xyXG4gICAgY29uc3Qgbm9kZSA9IHRhcmdldCBhcyBIVE1MRWxlbWVudCB8IG51bGw7XHJcbiAgICBpZiAoIW5vZGUgfHwgdHlwZW9mIG5vZGUuY2xvc2VzdCAhPT0gXCJmdW5jdGlvblwiKSByZXR1cm4gbnVsbDtcclxuICAgIGNvbnN0IGNhcmQgPSBub2RlLmNsb3Nlc3Q8SFRNTEVsZW1lbnQ+KFwiLnRpbWVsaW5lLWNhcmQtLWNsaWNrYWJsZVtkYXRhLWxpbmstaWRdXCIpO1xyXG4gICAgaWYgKCFjYXJkKSByZXR1cm4gbnVsbDtcclxuICAgIGlmICghY29udGFpbmVyUmVmLmN1cnJlbnQ/LmNvbnRhaW5zKGNhcmQpKSByZXR1cm4gbnVsbDtcclxuICAgIHJldHVybiBjYXJkO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgcmVzZXRUYXBHdWFyZCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIHRhcEd1YXJkUmVmLmN1cnJlbnQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB0YXBHdWFyZFJlZi5jdXJyZW50LnBvaW50ZXJJZCA9IG51bGw7XHJcbiAgICB0YXBHdWFyZFJlZi5jdXJyZW50Lm1vdmVkID0gZmFsc2U7XHJcbiAgICB0YXBHdWFyZFJlZi5jdXJyZW50LmxpbmtJZCA9IFwiXCI7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBoYW5kbGVQb2ludGVyRG93biA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKGV2ZW50OiBSZWFjdC5Qb2ludGVyRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB7XHJcbiAgICAgIGlmIChldmVudC5wb2ludGVyVHlwZSA9PT0gXCJtb3VzZVwiICYmIGV2ZW50LmJ1dHRvbiAhPT0gMCkgcmV0dXJuO1xyXG4gICAgICBjb25zdCBjYXJkID0gcmVzb2x2ZUNsaWNrYWJsZUNhcmQoZXZlbnQudGFyZ2V0KTtcclxuICAgICAgaWYgKCFjYXJkKSByZXR1cm47XHJcbiAgICAgIGNvbnN0IGxpbmtJZCA9IGNhcmQuZGF0YXNldC5saW5rSWQgfHwgXCJcIjtcclxuICAgICAgaWYgKCFsaW5rSWQpIHJldHVybjtcclxuXHJcbiAgICAgIHRhcEd1YXJkUmVmLmN1cnJlbnQuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgdGFwR3VhcmRSZWYuY3VycmVudC5wb2ludGVySWQgPSBldmVudC5wb2ludGVySWQ7XHJcbiAgICAgIHRhcEd1YXJkUmVmLmN1cnJlbnQuc3RhcnRYID0gZXZlbnQuY2xpZW50WDtcclxuICAgICAgdGFwR3VhcmRSZWYuY3VycmVudC5zdGFydFkgPSBldmVudC5jbGllbnRZO1xyXG4gICAgICB0YXBHdWFyZFJlZi5jdXJyZW50LnN0YXJ0VGltZSA9IERhdGUubm93KCk7XHJcbiAgICAgIHRhcEd1YXJkUmVmLmN1cnJlbnQubW92ZWQgPSBmYWxzZTtcclxuICAgICAgdGFwR3VhcmRSZWYuY3VycmVudC5saW5rSWQgPSBsaW5rSWQ7XHJcbiAgICB9LFxyXG4gICAgW3Jlc29sdmVDbGlja2FibGVDYXJkXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZVBvaW50ZXJNb3ZlID0gdXNlQ2FsbGJhY2soKGV2ZW50OiBSZWFjdC5Qb2ludGVyRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB7XHJcbiAgICBjb25zdCBzdGF0ZSA9IHRhcEd1YXJkUmVmLmN1cnJlbnQ7XHJcbiAgICBpZiAoIXN0YXRlLmFjdGl2ZSB8fCBldmVudC5wb2ludGVySWQgIT09IHN0YXRlLnBvaW50ZXJJZCkgcmV0dXJuO1xyXG4gICAgY29uc3QgZHggPSBNYXRoLmFicyhldmVudC5jbGllbnRYIC0gc3RhdGUuc3RhcnRYKTtcclxuICAgIGNvbnN0IGR5ID0gTWF0aC5hYnMoZXZlbnQuY2xpZW50WSAtIHN0YXRlLnN0YXJ0WSk7XHJcbiAgICBpZiAoZHggPiBUQVBfTU9WRV9QWCB8fCBkeSA+IFRBUF9NT1ZFX1BYKSB7XHJcbiAgICAgIHN0YXRlLm1vdmVkID0gdHJ1ZTtcclxuICAgIH1cclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZVBvaW50ZXJVcCA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKGV2ZW50OiBSZWFjdC5Qb2ludGVyRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB7XHJcbiAgICAgIGNvbnN0IHN0YXRlID0gdGFwR3VhcmRSZWYuY3VycmVudDtcclxuICAgICAgaWYgKCFzdGF0ZS5hY3RpdmUgfHwgZXZlbnQucG9pbnRlcklkICE9PSBzdGF0ZS5wb2ludGVySWQpIHJldHVybjtcclxuICAgICAgY29uc3QgbGlua0lkID0gc3RhdGUubGlua0lkO1xyXG4gICAgICBjb25zdCBoZWxkTXMgPSBEYXRlLm5vdygpIC0gc3RhdGUuc3RhcnRUaW1lO1xyXG4gICAgICBjb25zdCBzaG91bGRUYXAgPSAhc3RhdGUubW92ZWQgJiYgaGVsZE1zIDwgSE9MRF9UT19QUkVWSUVXX01TO1xyXG4gICAgICByZXNldFRhcEd1YXJkKCk7XHJcbiAgICAgIGlmIChzaG91bGRUYXAgJiYgbGlua0lkKSB7XHJcbiAgICAgICAgb25OYXZpZ2F0ZShsaW5rSWQpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgW29uTmF2aWdhdGUsIHJlc2V0VGFwR3VhcmRdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgYmxvY2tDbGlwYm9hcmRBY3Rpb24gPSB1c2VDYWxsYmFjayhcclxuICAgIChldmVudDogUmVhY3QuQ2xpcGJvYXJkRXZlbnQ8SFRNTERpdkVsZW1lbnQ+IHwgUmVhY3QuTW91c2VFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHtcclxuICAgICAgaWYgKCFyZXNvbHZlQ2xpY2thYmxlQ2FyZChldmVudC50YXJnZXQpKSByZXR1cm47XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9LFxyXG4gICAgW3Jlc29sdmVDbGlja2FibGVDYXJkXVxyXG4gICk7XHJcblxyXG4gIHVzZVRpbWVsaW5lQ2FyZEVmZmVjdHMoeyBjb250YWluZXJSZWYsIGVycm9yTWVzc2FnZSwgaXRlbXMsIHJlc29sdmVDbGlja2FibGVDYXJkIH0pO1xyXG5cclxuICBjb25zdCBoYXNJdGVtcyA9IGl0ZW1zLmxlbmd0aCA+IDA7XHJcbiAgY29uc3Qgc2hvd0VtcHR5ID0gIWVycm9yTWVzc2FnZSAmJiAhaGFzSXRlbXM7XHJcblxyXG4gIGNvbnN0IGNvbnRlbnQgPSBlcnJvck1lc3NhZ2UgPyAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtZGFuZ2VyXCI+e2Vycm9yTWVzc2FnZX08L2Rpdj5cclxuICApIDogaGFzSXRlbXMgPyAoXHJcbiAgICBpdGVtcy5tYXAoKGl0ZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgIGNvbnN0IGtleSA9IGl0ZW0uaWQgfHwgaXRlbS5yZWNJZD8udG9TdHJpbmcoKSB8fCBgdGltZWxpbmUtJHtpbmRleH1gO1xyXG4gICAgICBjb25zdCBpc0NsaWNrYWJsZSA9ICFpdGVtLmlzTm9EYXRhICYmICEhaXRlbS5pZDtcclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2IGtleT17a2V5fSBjbGFzc05hbWU9XCJ0aW1lbGluZS1pdGVtXCI+XHJcbiAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcclxuICAgICAgICAgICAgICBcInRpbWVsaW5lLWNhcmRcIixcclxuICAgICAgICAgICAgICBpdGVtLmlzTm9EYXRhID8gXCJ0aW1lbGluZS1jYXJkLS1ub2RhdGFcIiA6IFwiXCIsXHJcbiAgICAgICAgICAgICAgaXNDbGlja2FibGUgPyBcInRpbWVsaW5lLWNhcmQtLWNsaWNrYWJsZVwiIDogXCJcIlxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgICBkYXRhLWFjdGl2aWRhZGlkPXtpdGVtLmFjdGl2aWRhZElkIHx8IFwiXCJ9XHJcbiAgICAgICAgICAgIGRhdGEtcmVjaWQ9e2l0ZW0ucmVjSWQgIT0gbnVsbCA/IFN0cmluZyhpdGVtLnJlY0lkKSA6IFwiXCJ9XHJcbiAgICAgICAgICAgIGRhdGEtbGluay1pZD17aXNDbGlja2FibGUgPyBpdGVtLmlkIDogXCJcIn1cclxuICAgICAgICAgICAgcm9sZT17aXNDbGlja2FibGUgPyBcImJ1dHRvblwiIDogdW5kZWZpbmVkfVxyXG4gICAgICAgICAgICB0YWJJbmRleD17aXNDbGlja2FibGUgPyAwIDogdW5kZWZpbmVkfVxyXG4gICAgICAgICAgICBhcmlhLWxhYmVsPXtpc0NsaWNrYWJsZSA/IChpdGVtLmZ1bGxOYW1lIHx8IGl0ZW0ubmFtZSB8fCBub0RhdGFUZXh0KSA6IHVuZGVmaW5lZH1cclxuICAgICAgICAgICAgb25LZXlEb3duPXtpc0NsaWNrYWJsZVxyXG4gICAgICAgICAgICAgID8gKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQua2V5ID09PSBcIkVudGVyXCIgfHwgZXZlbnQua2V5ID09PSBcIiBcIikge1xyXG4gICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICBvbk5hdmlnYXRlKGl0ZW0uaWQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICA6IHVuZGVmaW5lZH1cclxuICAgICAgICAgID5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aW1lbGluZS1kYXRlLXBhbmVsIGZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0xIHB4LTMgcHktMyBiZy1zbGF0ZS01MCBib3JkZXItciBib3JkZXItc2xhdGUtMjAwIHRleHQtc2xhdGUtNjAwXCI+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdHJhY2tpbmctWzAuMmVtXSB0ZXh0LXNsYXRlLTUwMFwiPntpdGVtLmRhdGVQYXJ0cy55ZWFyfTwvZGl2PlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LXNlbWlib2xkIHVwcGVyY2FzZSB0cmFja2luZy1bMC4yZW1dIHRleHQtc2xhdGUtNTAwXCI+e2l0ZW0uZGF0ZVBhcnRzLm1vbnRofTwvZGl2PlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC0yeGwgZm9udC1zZW1pYm9sZCB0ZXh0LXByaW1hcnlcIj57aXRlbS5kYXRlUGFydHMuZGF5fTwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aW1lbGluZS1jYXJkX19jb250ZW50IGZsZXgtMSBweS0zIHB4LTRcIj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpbWVsaW5lLW5hbWVcIiBkYXRhLWZ1bGx0ZXh0PXtpdGVtLmZ1bGxOYW1lIHx8IGl0ZW0ubmFtZX0+e2l0ZW0ubmFtZX08L2Rpdj5cclxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0aW1lbGluZS1kZXNjLXRleHRcIiBkYXRhLWZ1bGx0ZXh0PXtpdGVtLmZ1bGxEZXNjIHx8IGl0ZW0uZGVzY3JpcHRpb259PntpdGVtLmRlc2NyaXB0aW9uIHx8IG5vRGF0YVRleHR9PC9wPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApO1xyXG4gICAgfSlcclxuICApIDogbnVsbDtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXZcclxuICAgICAgaWQ9XCJ0aW1lbGluZUNvbnRhaW5lclwiXHJcbiAgICAgIHJlZj17Y29udGFpbmVyUmVmfVxyXG4gICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXCJ0aW1lbGluZS1ib3hcIiwgc2hvd0VtcHR5ID8gXCJ0aW1lbGluZS1lbXB0eVwiIDogXCJcIil9XHJcbiAgICAgIGRhdGEtZW1wdHktdGV4dD17bm9EYXRhVGV4dH1cclxuICAgICAgb25Qb2ludGVyRG93bkNhcHR1cmU9e2hhbmRsZVBvaW50ZXJEb3dufVxyXG4gICAgICBvblBvaW50ZXJNb3ZlQ2FwdHVyZT17aGFuZGxlUG9pbnRlck1vdmV9XHJcbiAgICAgIG9uUG9pbnRlclVwQ2FwdHVyZT17aGFuZGxlUG9pbnRlclVwfVxyXG4gICAgICBvblBvaW50ZXJDYW5jZWxDYXB0dXJlPXtyZXNldFRhcEd1YXJkfVxyXG4gICAgICBvblBvaW50ZXJMZWF2ZT17cmVzZXRUYXBHdWFyZH1cclxuICAgICAgb25Db250ZXh0TWVudUNhcHR1cmU9e2Jsb2NrQ2xpcGJvYXJkQWN0aW9ufVxyXG4gICAgICBvbkNvcHlDYXB0dXJlPXtibG9ja0NsaXBib2FyZEFjdGlvbn1cclxuICAgICAgb25DdXRDYXB0dXJlPXtibG9ja0NsaXBib2FyZEFjdGlvbn1cclxuICAgICAgb25QYXN0ZUNhcHR1cmU9e2Jsb2NrQ2xpcGJvYXJkQWN0aW9ufVxyXG4gICAgPlxyXG4gICAgICB7Y29udGVudH1cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG5jb25zdCBNZW1vaXplZEhpc3RvcnlUYWJsZSA9IFJlYWN0Lm1lbW8oSGlzdG9yeVRhYmxlKTtcclxuTWVtb2l6ZWRIaXN0b3J5VGFibGUuZGlzcGxheU5hbWUgPSBcIkhpc3RvcnlUYWJsZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgTWVtb2l6ZWRIaXN0b3J5VGFibGU7XHJcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgQ29tcGFjdFBhZ2luYXRpb24gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9Db21wYWN0UGFnaW5hdGlvbi50c3hcIjtcbmltcG9ydCBIaXN0b3J5VGFibGUsIHsgdHlwZSBUaW1lbGluZUl0ZW0gfSBmcm9tIFwiLi9IaXN0b3J5VGFibGUudHN4XCI7XG5cbnR5cGUgUGFnaW5hdGlvbkxhYmVscyA9IHtcbiAgZmlyc3Q6IHN0cmluZztcbiAgcHJldjogc3RyaW5nO1xuICBuZXh0OiBzdHJpbmc7XG4gIGxhc3Q6IHN0cmluZztcbn07XG5cbnR5cGUgUHJvcHMgPSB7XG4gIHNob3dSZXN1bHRzOiBib29sZWFuO1xuICBpc0xvYWRpbmc6IGJvb2xlYW47XG4gIGxvYWRpbmdMYWJlbDogc3RyaW5nO1xuICB0aW1lbGluZUl0ZW1zOiBUaW1lbGluZUl0ZW1bXTtcbiAgbm9EYXRhVGV4dDogc3RyaW5nO1xuICBlcnJvck1lc3NhZ2U6IHN0cmluZztcbiAgdG90YWxQYWdlczogbnVtYmVyO1xuICBjdXJyZW50UGFnZTogbnVtYmVyO1xuICBwYWdlV2luZG93OiBudW1iZXI7XG4gIHBhZ2luYXRpb25MYWJlbHM6IFBhZ2luYXRpb25MYWJlbHM7XG4gIG9uTmF2aWdhdGU6IChsaW5rSWQ6IHN0cmluZykgPT4gdm9pZDtcbiAgb25QYWdlQ2hhbmdlOiAocGFnZTogbnVtYmVyKSA9PiB2b2lkO1xufTtcblxuLy8gUmVuZGVycyBoaXN0b3J5IGxvYWRpbmcsIHRhYmxlIGFuZCBwYWdpbmF0aW9uIGFzIGEgZm9jdXNlZCByZXN1bHQgc2VjdGlvbi5cbmNvbnN0IEhpc3RvcnlSZXN1bHRzU2VjdGlvbiA9ICh7XG4gIHNob3dSZXN1bHRzLFxuICBpc0xvYWRpbmcsXG4gIGxvYWRpbmdMYWJlbCxcbiAgdGltZWxpbmVJdGVtcyxcbiAgbm9EYXRhVGV4dCxcbiAgZXJyb3JNZXNzYWdlLFxuICB0b3RhbFBhZ2VzLFxuICBjdXJyZW50UGFnZSxcbiAgcGFnZVdpbmRvdyxcbiAgcGFnaW5hdGlvbkxhYmVscyxcbiAgb25OYXZpZ2F0ZSxcbiAgb25QYWdlQ2hhbmdlLFxufTogUHJvcHMpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPGRpdlxuICAgICAgICBpZD1cInJlc3VsdHNMb2FkZXJcIlxuICAgICAgICBjbGFzc05hbWU9XCJsb2FkZXItYm94IGdsYXNzLXBhbmVsIHNoYWRvdy1jYXJkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQtc20gdGV4dC1uZXV0cmFsLTcwMFwiXG4gICAgICAgIHN0eWxlPXt7IGRpc3BsYXk6IGlzTG9hZGluZyA/IFwiZmxleFwiIDogXCJub25lXCIgfX1cbiAgICAgID5cbiAgICAgICAgPHN2ZyBjbGFzc05hbWU9XCJpbmQtc3Bpbm5lciBzaXplLTVcIiB2aWV3Qm94PVwiMCAwIDIwIDIwXCIgcm9sZT1cInN0YXR1c1wiIGFyaWEtbGFiZWw9e2xvYWRpbmdMYWJlbH0+XG4gICAgICAgICAgPGNpcmNsZSBjbGFzc05hbWU9XCJpbmQtc3Bpbm5lcl9fY2lyY2xlXCIgY3g9XCIxMFwiIGN5PVwiMTBcIiByPVwiOFwiIHN0cm9rZVdpZHRoPVwiMlwiIC8+XG4gICAgICAgIDwvc3ZnPlxuICAgICAgICB7bG9hZGluZ0xhYmVsfVxuICAgICAgPC9kaXY+XG5cbiAgICAgIHtzaG93UmVzdWx0cyAmJiAoXG4gICAgICAgIDw+XG4gICAgICAgICAgPEhpc3RvcnlUYWJsZVxuICAgICAgICAgICAgaXRlbXM9e3RpbWVsaW5lSXRlbXN9XG4gICAgICAgICAgICBub0RhdGFUZXh0PXtub0RhdGFUZXh0fVxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlPXtlcnJvck1lc3NhZ2V9XG4gICAgICAgICAgICBvbk5hdmlnYXRlPXtvbk5hdmlnYXRlfVxuICAgICAgICAgIC8+XG5cbiAgICAgICAgICA8Q29tcGFjdFBhZ2luYXRpb25cbiAgICAgICAgICAgIHRvdGFsUGFnZXM9e3RvdGFsUGFnZXN9XG4gICAgICAgICAgICBjdXJyZW50UGFnZT17Y3VycmVudFBhZ2V9XG4gICAgICAgICAgICBwYWdlV2luZG93PXtwYWdlV2luZG93fVxuICAgICAgICAgICAgbG9hZGluZz17aXNMb2FkaW5nfVxuICAgICAgICAgICAgb25QYWdlQ2hhbmdlPXtvblBhZ2VDaGFuZ2V9XG4gICAgICAgICAgICBsYWJlbHM9e3BhZ2luYXRpb25MYWJlbHN9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC8+XG4gICAgICApfVxuICAgIDwvPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgSGlzdG9yeVJlc3VsdHNTZWN0aW9uO1xuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VNZW1vLCB0eXBlIERpc3BhdGNoLCB0eXBlIE1vdXNlRXZlbnQgYXMgUmVhY3RNb3VzZUV2ZW50LCB0eXBlIFNldFN0YXRlQWN0aW9uIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBjbGFzc05hbWVzIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2NsYXNzTmFtZXMudHNcIjtcbmltcG9ydCB0eXBlIHsgSGlzdG9yeU1hbnVhbERheUNlbGwgfSBmcm9tIFwiLi9IaXN0b3J5TWFudWFsRGF0ZVBpY2tlci50c3hcIjtcblxudHlwZSBDYWxlbmRhckNlbGwgPSB7XG4gIGRhdGU6IERhdGUgfCBudWxsO1xuICBpc286IHN0cmluZztcbiAgaXNFbXB0eTogYm9vbGVhbjtcbn07XG5cbnR5cGUgQXJncyA9IHtcbiAgY3VycmVudE1vbnRoOiBudW1iZXI7XG4gIGN1cnJlbnRZZWFyOiBudW1iZXI7XG4gIGxvY2FsZTogc3RyaW5nO1xuICBzdGFydERhdGU6IERhdGUgfCBudWxsO1xuICBlbmREYXRlOiBEYXRlIHwgbnVsbDtcbiAgaG92ZXJEYXRlOiBEYXRlIHwgbnVsbDtcbiAgc2VsZWN0aW5nU3RlcDogXCJzdGFydFwiIHwgXCJlbmRcIiB8IFwiZG9uZVwiO1xuICBzZXRDdXJyZW50TW9udGg6IERpc3BhdGNoPFNldFN0YXRlQWN0aW9uPG51bWJlcj4+O1xuICBzZXRDdXJyZW50WWVhcjogRGlzcGF0Y2g8U2V0U3RhdGVBY3Rpb248bnVtYmVyPj47XG4gIHNldEhvdmVyRGF0ZTogRGlzcGF0Y2g8U2V0U3RhdGVBY3Rpb248RGF0ZSB8IG51bGw+PjtcbiAgaGFuZGxlU2VsZWN0OiAoZGF0ZU9iajogRGF0ZSkgPT4gdm9pZDtcbiAgbG9nSGlzdG9yeTogKG1lc3NhZ2U6IHN0cmluZywgZGF0YT86IFJlY29yZDxzdHJpbmcsIHVua25vd24+KSA9PiB2b2lkO1xuICB0b0lTTzogKHZhbHVlOiBEYXRlKSA9PiBzdHJpbmc7XG4gIGlzQmVmb3JlOiAoYTogRGF0ZSB8IG51bGwsIGI6IERhdGUgfCBudWxsKSA9PiBib29sZWFuO1xuICBmb3JtYXRNb250aExhYmVsOiAodmFsdWU6IERhdGUsIGxvY2FsZTogc3RyaW5nKSA9PiBzdHJpbmc7XG59O1xuXG5jb25zdCBzYW1lRGF5ID0gKGE6IERhdGUgfCBudWxsLCBiOiBEYXRlIHwgbnVsbCkgPT4gISEoYSAmJiBiICYmIGEuZ2V0VGltZSgpID09PSBiLmdldFRpbWUoKSk7XG5cbi8vIE93bnMgY2FsZW5kYXIgbW9udGggbmF2aWdhdGlvbiBhbmQgZGF5LWNlbGwgZGVyaXZhdGlvbiBmb3IgdGhlIGhpc3RvcnkgcGlja2VyLlxuZXhwb3J0IGNvbnN0IHVzZUhpc3RvcnlDYWxlbmRhclBpY2tlciA9ICh7XG4gIGN1cnJlbnRNb250aCxcbiAgY3VycmVudFllYXIsXG4gIGxvY2FsZSxcbiAgc3RhcnREYXRlLFxuICBlbmREYXRlLFxuICBob3ZlckRhdGUsXG4gIHNlbGVjdGluZ1N0ZXAsXG4gIHNldEN1cnJlbnRNb250aCxcbiAgc2V0Q3VycmVudFllYXIsXG4gIHNldEhvdmVyRGF0ZSxcbiAgaGFuZGxlU2VsZWN0LFxuICBsb2dIaXN0b3J5LFxuICB0b0lTTyxcbiAgaXNCZWZvcmUsXG4gIGZvcm1hdE1vbnRoTGFiZWwsXG59OiBBcmdzKSA9PiB7XG4gIGNvbnN0IGNhbGVuZGFyID0gdXNlTWVtbygoKSA9PiB7XG4gICAgY29uc3QgZmlyc3REYXkgPSBuZXcgRGF0ZShjdXJyZW50WWVhciwgY3VycmVudE1vbnRoLCAxKTtcbiAgICBjb25zdCBkYXlzSW5Nb250aCA9IG5ldyBEYXRlKGN1cnJlbnRZZWFyLCBjdXJyZW50TW9udGggKyAxLCAwKS5nZXREYXRlKCk7XG4gICAgY29uc3Qgb2Zmc2V0ID0gKGZpcnN0RGF5LmdldERheSgpICsgNikgJSA3O1xuICAgIGNvbnN0IGNlbGxzOiBDYWxlbmRhckNlbGxbXSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb2Zmc2V0OyBpKyspIHtcbiAgICAgIGNlbGxzLnB1c2goeyBkYXRlOiBudWxsLCBpc286IFwiXCIsIGlzRW1wdHk6IHRydWUgfSk7XG4gICAgfVxuICAgIGZvciAobGV0IGQgPSAxOyBkIDw9IGRheXNJbk1vbnRoOyBkKyspIHtcbiAgICAgIGNvbnN0IGRhdGVPYmogPSBuZXcgRGF0ZShjdXJyZW50WWVhciwgY3VycmVudE1vbnRoLCBkKTtcbiAgICAgIGNlbGxzLnB1c2goeyBkYXRlOiBkYXRlT2JqLCBpc286IHRvSVNPKGRhdGVPYmopLCBpc0VtcHR5OiBmYWxzZSB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIGNlbGxzLFxuICAgICAgbGFiZWw6IGZvcm1hdE1vbnRoTGFiZWwoZmlyc3REYXksIGxvY2FsZSksXG4gICAgfTtcbiAgfSwgW2N1cnJlbnRNb250aCwgY3VycmVudFllYXIsIGZvcm1hdE1vbnRoTGFiZWwsIGxvY2FsZSwgdG9JU09dKTtcblxuICBjb25zdCBwcmV2aWV3RW5kID0gZW5kRGF0ZSB8fCAoc2VsZWN0aW5nU3RlcCA9PT0gXCJlbmRcIiA/IGhvdmVyRGF0ZSA6IG51bGwpO1xuXG4gIGNvbnN0IGhhbmRsZVByZXZNb250aCA9IHVzZUNhbGxiYWNrKFxuICAgIChldmVudDogUmVhY3RNb3VzZUV2ZW50PEhUTUxCdXR0b25FbGVtZW50PikgPT4ge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBzZXRDdXJyZW50TW9udGgoKHByZXYpID0+IHtcbiAgICAgICAgY29uc3QgbmV4dCA9IHByZXYgLSAxO1xuICAgICAgICBpZiAobmV4dCA8IDApIHtcbiAgICAgICAgICBzZXRDdXJyZW50WWVhcigoeWVhcikgPT4geWVhciAtIDEpO1xuICAgICAgICAgIHJldHVybiAxMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgW3NldEN1cnJlbnRNb250aCwgc2V0Q3VycmVudFllYXJdXG4gICk7XG5cbiAgY29uc3QgaGFuZGxlTmV4dE1vbnRoID0gdXNlQ2FsbGJhY2soXG4gICAgKGV2ZW50OiBSZWFjdE1vdXNlRXZlbnQ8SFRNTEJ1dHRvbkVsZW1lbnQ+KSA9PiB7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIHNldEN1cnJlbnRNb250aCgocHJldikgPT4ge1xuICAgICAgICBjb25zdCBuZXh0ID0gcHJldiArIDE7XG4gICAgICAgIGlmIChuZXh0ID4gMTEpIHtcbiAgICAgICAgICBzZXRDdXJyZW50WWVhcigoeWVhcikgPT4geWVhciArIDEpO1xuICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBbc2V0Q3VycmVudE1vbnRoLCBzZXRDdXJyZW50WWVhcl1cbiAgKTtcblxuICBjb25zdCBoYW5kbGVHcmlkTW91c2VMZWF2ZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBzZXRIb3ZlckRhdGUobnVsbCk7XG4gIH0sIFtzZXRIb3ZlckRhdGVdKTtcblxuICBjb25zdCBoYW5kbGVNYW51YWxEYXlDbGljayA9IHVzZUNhbGxiYWNrKFxuICAgIChjZWxsOiBIaXN0b3J5TWFudWFsRGF5Q2VsbCkgPT4ge1xuICAgICAgaWYgKCFjZWxsLmRhdGUpIHJldHVybjtcbiAgICAgIGxvZ0hpc3RvcnkoXCJkYXlDbGlja1wiLCB7IGRhdGU6IGNlbGwuaXNvIHx8IFwiXCIsIGRpc2FibGVkOiAhIWNlbGwuZGlzYWJsZWQgfSk7XG4gICAgICBoYW5kbGVTZWxlY3QoY2VsbC5kYXRlKTtcbiAgICB9LFxuICAgIFtoYW5kbGVTZWxlY3QsIGxvZ0hpc3RvcnldXG4gICk7XG5cbiAgY29uc3QgaGFuZGxlTWFudWFsRGF5SG92ZXIgPSB1c2VDYWxsYmFjayhcbiAgICAoY2VsbDogSGlzdG9yeU1hbnVhbERheUNlbGwpID0+IHtcbiAgICAgIGlmICghY2VsbC5kYXRlKSByZXR1cm47XG4gICAgICBpZiAoc2VsZWN0aW5nU3RlcCA9PT0gXCJlbmRcIiAmJiBzdGFydERhdGUpIHtcbiAgICAgICAgc2V0SG92ZXJEYXRlKG5ldyBEYXRlKGNlbGwuZGF0ZSkpO1xuICAgICAgfVxuICAgIH0sXG4gICAgW3NlbGVjdGluZ1N0ZXAsIHNldEhvdmVyRGF0ZSwgc3RhcnREYXRlXVxuICApO1xuXG4gIGNvbnN0IG1hbnVhbERheUNlbGxzID0gdXNlTWVtbzxIaXN0b3J5TWFudWFsRGF5Q2VsbFtdPigoKSA9PiB7XG4gICAgcmV0dXJuIGNhbGVuZGFyLmNlbGxzLm1hcCgoY2VsbCwgaWR4KSA9PiB7XG4gICAgICBpZiAoY2VsbC5pc0VtcHR5KSB7XG4gICAgICAgIHJldHVybiB7IGtleTogYGVtcHR5LSR7aWR4fWAsIGlzRW1wdHk6IHRydWUgfTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZGF0ZU9iaiA9IGNlbGwuZGF0ZSBhcyBEYXRlO1xuICAgICAgY29uc3QgaXNTdGFydCA9IHNhbWVEYXkoZGF0ZU9iaiwgc3RhcnREYXRlKTtcbiAgICAgIGNvbnN0IGlzRW5kID0gc2FtZURheShkYXRlT2JqLCBlbmREYXRlKTtcbiAgICAgIGNvbnN0IGluUmFuZ2UgPSBzdGFydERhdGUgJiYgcHJldmlld0VuZCAmJiBpc0JlZm9yZShzdGFydERhdGUsIGRhdGVPYmopICYmIGlzQmVmb3JlKGRhdGVPYmosIHByZXZpZXdFbmQpO1xuICAgICAgY29uc3QgaG92ZXJSYW5nZSA9IHN0YXJ0RGF0ZSAmJiAhZW5kRGF0ZSAmJiBob3ZlckRhdGUgJiYgaXNCZWZvcmUoc3RhcnREYXRlLCBkYXRlT2JqKSAmJiBpc0JlZm9yZShkYXRlT2JqLCBob3ZlckRhdGUpO1xuICAgICAgY29uc3QgZGlzYWJsZWQgPSBzZWxlY3RpbmdTdGVwID09PSBcImVuZFwiICYmICEhc3RhcnREYXRlICYmIGlzQmVmb3JlKGRhdGVPYmosIHN0YXJ0RGF0ZSk7XG4gICAgICBjb25zdCBpc1RvZGF5ID0gc2FtZURheShkYXRlT2JqLCBuZXcgRGF0ZSgpKTtcblxuICAgICAgY29uc3QgZGF5Q2xhc3MgPSBjbGFzc05hbWVzKFxuICAgICAgICBcImRycC1kYXlcIixcbiAgICAgICAgaXNTdGFydCA/IFwic3RhcnQgcmFuZ2Utc3RhcnRcIiA6IFwiXCIsXG4gICAgICAgIGlzRW5kID8gXCJlbmQgcmFuZ2UtZW5kXCIgOiBcIlwiLFxuICAgICAgICBpblJhbmdlID8gXCJpbi1yYW5nZVwiIDogXCJcIixcbiAgICAgICAgaG92ZXJSYW5nZSA/IFwiaG92ZXItcmFuZ2VcIiA6IFwiXCIsXG4gICAgICAgIGRpc2FibGVkID8gXCJkaXNhYmxlZFwiIDogXCJcIixcbiAgICAgICAgaXNUb2RheSA/IFwidG9kYXlcIiA6IFwiXCJcbiAgICAgICk7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGtleTogY2VsbC5pc28sXG4gICAgICAgIGlzRW1wdHk6IGZhbHNlLFxuICAgICAgICBkYXRlOiBkYXRlT2JqLFxuICAgICAgICBpc286IGNlbGwuaXNvLFxuICAgICAgICBkYXlMYWJlbDogZGF0ZU9iai5nZXREYXRlKCksXG4gICAgICAgIGRheUNsYXNzLFxuICAgICAgICBkaXNhYmxlZCxcbiAgICAgIH07XG4gICAgfSk7XG4gIH0sIFtjYWxlbmRhci5jZWxscywgZW5kRGF0ZSwgaG92ZXJEYXRlLCBpc0JlZm9yZSwgcHJldmlld0VuZCwgc2VsZWN0aW5nU3RlcCwgc3RhcnREYXRlXSk7XG5cbiAgcmV0dXJuIHtcbiAgICBjYWxlbmRhckxhYmVsOiBjYWxlbmRhci5sYWJlbCxcbiAgICBtYW51YWxEYXlDZWxscyxcbiAgICBoYW5kbGVQcmV2TW9udGgsXG4gICAgaGFuZGxlTmV4dE1vbnRoLFxuICAgIGhhbmRsZUdyaWRNb3VzZUxlYXZlLFxuICAgIGhhbmRsZU1hbnVhbERheUNsaWNrLFxuICAgIGhhbmRsZU1hbnVhbERheUhvdmVyLFxuICB9O1xufTtcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjaywgdHlwZSBEaXNwYXRjaCwgdHlwZSBNb3VzZUV2ZW50IGFzIFJlYWN0TW91c2VFdmVudCwgdHlwZSBTZXRTdGF0ZUFjdGlvbiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHR5cGUgeyBMb2FkT3ZlcnJpZGUgfSBmcm9tIFwiLi91c2VIaXN0b3J5RmlsdGVyc1N0YXRlLnRzXCI7XG5cbnR5cGUgQXBwbHlPcHRpb25zID0ge1xuICBjbG9zZVBhbmVsPzogYm9vbGVhbjtcbiAgZm9yY2U/OiBib29sZWFuO1xuICBwYWdlPzogbnVtYmVyO1xufTtcblxudHlwZSBTdHJpbmdSZWYgPSB7XG4gIGN1cnJlbnQ6IHN0cmluZztcbn07XG5cbnR5cGUgQXJncyA9IHtcbiAgc3RhcnREYXRlOiBEYXRlIHwgbnVsbDtcbiAgZW5kRGF0ZTogRGF0ZSB8IG51bGw7XG4gIGZyb21EYXRlVmFsdWU6IHN0cmluZztcbiAgdG9EYXRlVmFsdWU6IHN0cmluZztcbiAgYWNjb3VudE51bVZhbHVlOiBzdHJpbmc7XG4gIG93bmVyQXhVc2VySWRWYWx1ZTogc3RyaW5nO1xuICBsYXN0U2lnbmF0dXJlUmVmOiBTdHJpbmdSZWY7XG4gIHZhbGlkYXRlTWFudWFsUmFuZ2U6ICgpID0+IGJvb2xlYW47XG4gIG5vcm1hbGl6ZVJhbmdlOiAoZnJvbTogc3RyaW5nLCB0bzogc3RyaW5nKSA9PiB7IGZyb206IHN0cmluZzsgdG86IHN0cmluZyB9O1xuICBsb2FkQWN0aXZpdGllczogKHBhZ2U6IG51bWJlciwgb3ZlcnJpZGU/OiBMb2FkT3ZlcnJpZGUpID0+IHZvaWQ7XG4gIGhhbmRsZUNsZWFyU3RhdGU6IChldmVudDogUmVhY3RNb3VzZUV2ZW50KSA9PiB2b2lkO1xuICBjbGVhckZpbHRlckNhY2hlOiAoKSA9PiB2b2lkO1xuICByZXNldEFjdGl2aXRpZXM6ICgpID0+IHZvaWQ7XG4gIHJlc2V0SGlzdG9yeUZpbHRlcnM6ICgpID0+IHZvaWQ7XG4gIHNldElzT3BlbjogRGlzcGF0Y2g8U2V0U3RhdGVBY3Rpb248Ym9vbGVhbj4+O1xuICBzZXRTaG93RmlsdGVyczogRGlzcGF0Y2g8U2V0U3RhdGVBY3Rpb248Ym9vbGVhbj4+O1xuICBzZXRTaG93TWFudWFsRXJyb3I6IERpc3BhdGNoPFNldFN0YXRlQWN0aW9uPGJvb2xlYW4+Pjtcbn07XG5cbi8vIEtlZXBzIGZpbHRlciBhcHBseS9yZXNldCBiZWhhdmlvciB0b2dldGhlciBhbmQgb3V0IG9mIHRoZSBwYWdlIHJlbmRlciBjb250YWluZXIuXG5leHBvcnQgY29uc3QgdXNlSGlzdG9yeUZpbHRlckFjdGlvbnMgPSAoe1xuICBzdGFydERhdGUsXG4gIGVuZERhdGUsXG4gIGZyb21EYXRlVmFsdWUsXG4gIHRvRGF0ZVZhbHVlLFxuICBhY2NvdW50TnVtVmFsdWUsXG4gIG93bmVyQXhVc2VySWRWYWx1ZSxcbiAgbGFzdFNpZ25hdHVyZVJlZixcbiAgdmFsaWRhdGVNYW51YWxSYW5nZSxcbiAgbm9ybWFsaXplUmFuZ2UsXG4gIGxvYWRBY3Rpdml0aWVzLFxuICBoYW5kbGVDbGVhclN0YXRlLFxuICBjbGVhckZpbHRlckNhY2hlLFxuICByZXNldEFjdGl2aXRpZXMsXG4gIHJlc2V0SGlzdG9yeUZpbHRlcnMsXG4gIHNldElzT3BlbixcbiAgc2V0U2hvd0ZpbHRlcnMsXG4gIHNldFNob3dNYW51YWxFcnJvcixcbn06IEFyZ3MpID0+IHtcbiAgY29uc3QgYXBwbHlGaWx0ZXJzID0gdXNlQ2FsbGJhY2soXG4gICAgKG9wdGlvbnM/OiBBcHBseU9wdGlvbnMpID0+IHtcbiAgICAgIGlmICghdmFsaWRhdGVNYW51YWxSYW5nZSgpKSByZXR1cm47XG4gICAgICBpZiAoIXN0YXJ0RGF0ZSB8fCAhZW5kRGF0ZSkgcmV0dXJuO1xuXG4gICAgICBjb25zdCBub3JtYWxpemVkID0gbm9ybWFsaXplUmFuZ2UoZnJvbURhdGVWYWx1ZSwgdG9EYXRlVmFsdWUpO1xuICAgICAgY29uc3QgcGFnZSA9IG9wdGlvbnM/LnBhZ2UgPz8gMTtcbiAgICAgIGNvbnN0IHNpZ25hdHVyZSA9IGAke25vcm1hbGl6ZWQuZnJvbX18JHtub3JtYWxpemVkLnRvfXwke2FjY291bnROdW1WYWx1ZX18JHtvd25lckF4VXNlcklkVmFsdWV9fCR7cGFnZX1gO1xuXG4gICAgICBpZiAob3B0aW9ucz8uZm9yY2UgfHwgbGFzdFNpZ25hdHVyZVJlZi5jdXJyZW50ICE9PSBzaWduYXR1cmUpIHtcbiAgICAgICAgbG9hZEFjdGl2aXRpZXMocGFnZSwge1xuICAgICAgICAgIGZyb21EYXRlOiBub3JtYWxpemVkLmZyb20sXG4gICAgICAgICAgdG9EYXRlOiBub3JtYWxpemVkLnRvLFxuICAgICAgICAgIGFjY291bnROdW06IGFjY291bnROdW1WYWx1ZSxcbiAgICAgICAgICBvd25lckF4VXNlcklkOiBvd25lckF4VXNlcklkVmFsdWUsXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBzZXRTaG93TWFudWFsRXJyb3IoZmFsc2UpO1xuICAgICAgaWYgKG9wdGlvbnM/LmNsb3NlUGFuZWwpIHtcbiAgICAgICAgc2V0SXNPcGVuKGZhbHNlKTtcbiAgICAgICAgc2V0U2hvd0ZpbHRlcnMoZmFsc2UpO1xuICAgICAgfVxuICAgIH0sXG4gICAgW1xuICAgICAgYWNjb3VudE51bVZhbHVlLFxuICAgICAgZW5kRGF0ZSxcbiAgICAgIGZyb21EYXRlVmFsdWUsXG4gICAgICBsYXN0U2lnbmF0dXJlUmVmLFxuICAgICAgbG9hZEFjdGl2aXRpZXMsXG4gICAgICBvd25lckF4VXNlcklkVmFsdWUsXG4gICAgICBzZXRJc09wZW4sXG4gICAgICBzZXRTaG93RmlsdGVycyxcbiAgICAgIHNldFNob3dNYW51YWxFcnJvcixcbiAgICAgIHN0YXJ0RGF0ZSxcbiAgICAgIHRvRGF0ZVZhbHVlLFxuICAgICAgdmFsaWRhdGVNYW51YWxSYW5nZSxcbiAgICAgIG5vcm1hbGl6ZVJhbmdlLFxuICAgIF1cbiAgKTtcblxuICBjb25zdCBoYW5kbGVDbGVhciA9IHVzZUNhbGxiYWNrKFxuICAgIChldmVudDogUmVhY3RNb3VzZUV2ZW50KSA9PiB7XG4gICAgICBoYW5kbGVDbGVhclN0YXRlKGV2ZW50KTtcbiAgICAgIGNsZWFyRmlsdGVyQ2FjaGUoKTtcbiAgICAgIHJlc2V0QWN0aXZpdGllcygpO1xuICAgIH0sXG4gICAgW2NsZWFyRmlsdGVyQ2FjaGUsIGhhbmRsZUNsZWFyU3RhdGUsIHJlc2V0QWN0aXZpdGllc11cbiAgKTtcblxuICBjb25zdCBoYW5kbGVSZXNldEZpbHRlcnMgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgcmVzZXRIaXN0b3J5RmlsdGVycygpO1xuICAgIGNsZWFyRmlsdGVyQ2FjaGUoKTtcbiAgICByZXNldEFjdGl2aXRpZXMoKTtcbiAgICBzZXRJc09wZW4oZmFsc2UpO1xuICAgIHNldFNob3dGaWx0ZXJzKHRydWUpO1xuICB9LCBbY2xlYXJGaWx0ZXJDYWNoZSwgcmVzZXRBY3Rpdml0aWVzLCByZXNldEhpc3RvcnlGaWx0ZXJzLCBzZXRJc09wZW4sIHNldFNob3dGaWx0ZXJzXSk7XG5cbiAgcmV0dXJuIHtcbiAgICBhcHBseUZpbHRlcnMsXG4gICAgaGFuZGxlQ2xlYXIsXG4gICAgaGFuZGxlUmVzZXRGaWx0ZXJzLFxuICB9O1xufTtcbiIsICJpbXBvcnQgeyB1c2VFZmZlY3QsIHR5cGUgRGlzcGF0Y2gsIHR5cGUgU2V0U3RhdGVBY3Rpb24gfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB0eXBlIHsgSGlzdG9yeUNhY2hlZEZpbHRlciB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VIaXN0b3J5RmlsdGVyQ2FjaGUudHNcIjtcbmltcG9ydCB0eXBlIHsgRmlsdGVyTG9hZFJlcXVlc3QsIExvYWRPdmVycmlkZSB9IGZyb20gXCIuL3VzZUhpc3RvcnlGaWx0ZXJzU3RhdGUudHNcIjtcblxudHlwZSBCb29sZWFuUmVmID0ge1xuICBjdXJyZW50OiBib29sZWFuO1xufTtcblxudHlwZSBBcmdzID0ge1xuICBkZWZhdWx0RnJvbURhdGU6IHN0cmluZztcbiAgZGVmYXVsdFRvRGF0ZTogc3RyaW5nO1xuICBkaWRJbml0RmlsdGVyUmVmOiBCb29sZWFuUmVmO1xuICBoYXNSZXN0b3JlZEZpbHRlclJlZjogQm9vbGVhblJlZjtcbiAgcmV0cnlPbk5ldHdvcmtFcnJvclJlZjogQm9vbGVhblJlZjtcbiAgY29uc3VtZVJldHVybkZsYWc6ICgpID0+IGJvb2xlYW47XG4gIHJlYWRDYWNoZWRGaWx0ZXI6ICgpID0+IEhpc3RvcnlDYWNoZWRGaWx0ZXIgfCBudWxsO1xuICBhcHBseUNhY2hlZEZpbHRlcjogKGZpbHRlcjogSGlzdG9yeUNhY2hlZEZpbHRlciB8IG51bGwpID0+IEZpbHRlckxvYWRSZXF1ZXN0IHwgbnVsbDtcbiAgYXBwbHlEZWZhdWx0UmFuZ2VGcm9tUHJvcHM6ICgpID0+IEZpbHRlckxvYWRSZXF1ZXN0IHwgbnVsbDtcbiAgbG9hZEFjdGl2aXRpZXM6IChwYWdlOiBudW1iZXIsIG92ZXJyaWRlPzogTG9hZE92ZXJyaWRlKSA9PiB2b2lkO1xuICByZXNldEFjdGl2aXRpZXM6ICgpID0+IHZvaWQ7XG4gIHJlc2V0SGlzdG9yeUZpbHRlcnM6ICgpID0+IHZvaWQ7XG4gIGNsZWFyRmlsdGVyQ2FjaGU6ICgpID0+IHZvaWQ7XG4gIHNldFNob3dGaWx0ZXJzOiBEaXNwYXRjaDxTZXRTdGF0ZUFjdGlvbjxib29sZWFuPj47XG4gIHNldElzT3BlbjogRGlzcGF0Y2g8U2V0U3RhdGVBY3Rpb248Ym9vbGVhbj4+O1xuICBsb2dIaXN0b3J5OiAobWVzc2FnZTogc3RyaW5nLCBkYXRhPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pID0+IHZvaWQ7XG59O1xuXG4vLyBSZXN0b3JlcyB0aGUgaGlzdG9yeSBmaWx0ZXJzIG9uY2Ugb24gbW91bnQgYW5kIHN0YXJ0cyB0aGUgZmlyc3QgYWN0aXZpdHkgbG9hZC5cbmV4cG9ydCBjb25zdCB1c2VIaXN0b3J5SW5pdGlhbExvYWQgPSAoe1xuICBkZWZhdWx0RnJvbURhdGUsXG4gIGRlZmF1bHRUb0RhdGUsXG4gIGRpZEluaXRGaWx0ZXJSZWYsXG4gIGhhc1Jlc3RvcmVkRmlsdGVyUmVmLFxuICByZXRyeU9uTmV0d29ya0Vycm9yUmVmLFxuICBjb25zdW1lUmV0dXJuRmxhZyxcbiAgcmVhZENhY2hlZEZpbHRlcixcbiAgYXBwbHlDYWNoZWRGaWx0ZXIsXG4gIGFwcGx5RGVmYXVsdFJhbmdlRnJvbVByb3BzLFxuICBsb2FkQWN0aXZpdGllcyxcbiAgcmVzZXRBY3Rpdml0aWVzLFxuICByZXNldEhpc3RvcnlGaWx0ZXJzLFxuICBjbGVhckZpbHRlckNhY2hlLFxuICBzZXRTaG93RmlsdGVycyxcbiAgc2V0SXNPcGVuLFxuICBsb2dIaXN0b3J5LFxufTogQXJncykgPT4ge1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGxvZ0hpc3RvcnkoXCJpbml0XCIsIHsgZGVmYXVsdEZyb21EYXRlLCBkZWZhdWx0VG9EYXRlIH0pO1xuICB9LCBbZGVmYXVsdEZyb21EYXRlLCBkZWZhdWx0VG9EYXRlLCBsb2dIaXN0b3J5XSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoZGlkSW5pdEZpbHRlclJlZi5jdXJyZW50KSByZXR1cm47XG4gICAgZGlkSW5pdEZpbHRlclJlZi5jdXJyZW50ID0gdHJ1ZTtcbiAgICBjb25zdCBjYWNoZWQgPSBjb25zdW1lUmV0dXJuRmxhZygpID8gcmVhZENhY2hlZEZpbHRlcigpIDogbnVsbDtcbiAgICBpZiAoY2FjaGVkICYmIGNhY2hlZC5mcm9tRGF0ZSAmJiBjYWNoZWQudG9EYXRlKSB7XG4gICAgICBsb2dIaXN0b3J5KFwicmVzdG9yZUZpbHRlclwiLCBjYWNoZWQpO1xuICAgICAgY29uc3QgY2FjaGVkUmVxdWVzdCA9IGFwcGx5Q2FjaGVkRmlsdGVyKGNhY2hlZCk7XG4gICAgICBpZiAoY2FjaGVkUmVxdWVzdCkge1xuICAgICAgICByZXRyeU9uTmV0d29ya0Vycm9yUmVmLmN1cnJlbnQgPSB0cnVlO1xuICAgICAgICBsb2FkQWN0aXZpdGllcyhjYWNoZWRSZXF1ZXN0LnBhZ2UsIGNhY2hlZFJlcXVlc3Qub3ZlcnJpZGUpO1xuICAgICAgICBzZXRTaG93RmlsdGVycyhmYWxzZSk7XG4gICAgICAgIHNldElzT3BlbihmYWxzZSk7XG4gICAgICAgIGhhc1Jlc3RvcmVkRmlsdGVyUmVmLmN1cnJlbnQgPSB0cnVlO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgZGVmYXVsdFJlcXVlc3QgPSBhcHBseURlZmF1bHRSYW5nZUZyb21Qcm9wcygpO1xuICAgIGlmIChkZWZhdWx0UmVxdWVzdCkge1xuICAgICAgcmV0cnlPbk5ldHdvcmtFcnJvclJlZi5jdXJyZW50ID0gdHJ1ZTtcbiAgICAgIGxvYWRBY3Rpdml0aWVzKGRlZmF1bHRSZXF1ZXN0LnBhZ2UsIGRlZmF1bHRSZXF1ZXN0Lm92ZXJyaWRlKTtcbiAgICAgIHNldFNob3dGaWx0ZXJzKGZhbHNlKTtcbiAgICAgIHNldElzT3BlbihmYWxzZSk7XG4gICAgICBoYXNSZXN0b3JlZEZpbHRlclJlZi5jdXJyZW50ID0gdHJ1ZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICByZXNldEhpc3RvcnlGaWx0ZXJzKCk7XG4gICAgY2xlYXJGaWx0ZXJDYWNoZSgpO1xuICAgIHJlc2V0QWN0aXZpdGllcygpO1xuICAgIHNldFNob3dGaWx0ZXJzKHRydWUpO1xuICAgIHNldElzT3BlbihmYWxzZSk7XG4gIH0sIFtcbiAgICBhcHBseUNhY2hlZEZpbHRlcixcbiAgICBhcHBseURlZmF1bHRSYW5nZUZyb21Qcm9wcyxcbiAgICBjbGVhckZpbHRlckNhY2hlLFxuICAgIGNvbnN1bWVSZXR1cm5GbGFnLFxuICAgIGRpZEluaXRGaWx0ZXJSZWYsXG4gICAgaGFzUmVzdG9yZWRGaWx0ZXJSZWYsXG4gICAgbG9hZEFjdGl2aXRpZXMsXG4gICAgcmVhZENhY2hlZEZpbHRlcixcbiAgICByZXNldEFjdGl2aXRpZXMsXG4gICAgcmVzZXRIaXN0b3J5RmlsdGVycyxcbiAgICByZXRyeU9uTmV0d29ya0Vycm9yUmVmLFxuICAgIHNldElzT3BlbixcbiAgICBzZXRTaG93RmlsdGVycyxcbiAgICBsb2dIaXN0b3J5LFxuICBdKTtcbn07XG4iLCAiaW1wb3J0IHsgdXNlTWVtbyB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5cbmNvbnN0IHRvU2VudGVuY2VDYXNlID0gKHZhbHVlOiBzdHJpbmcsIGxvY2FsZTogc3RyaW5nKSA9PiB7XG4gIGlmICghdmFsdWUpIHJldHVybiBcIlwiO1xuICBjb25zdCB0cmltbWVkID0gdmFsdWUudHJpbSgpO1xuICBpZiAoIXRyaW1tZWQpIHJldHVybiB0cmltbWVkO1xuICBjb25zdCBsb3dlciA9IHRyaW1tZWQudG9Mb2NhbGVMb3dlckNhc2UobG9jYWxlKTtcbiAgcmV0dXJuIGxvd2VyWzBdLnRvTG9jYWxlVXBwZXJDYXNlKGxvY2FsZSkgKyBsb3dlci5zbGljZSgxKTtcbn07XG5cbi8vIEdyb3VwcyBsb2NhbGl6ZWQgaGlzdG9yeSBsYWJlbHMgYW5kIGZpeGVkIG9wdGlvbiBsaXN0cyBmb3IgdGhlIHBhZ2UuXG5leHBvcnQgY29uc3QgdXNlSGlzdG9yeUxhYmVscyA9IChsb2NhbGU6IHN0cmluZykgPT4ge1xuICBjb25zdCBsYWJlbEZyb20gPSB0b1NlbnRlbmNlQ2FzZShpbmRUKFwiSGlzdG9yeV9Gcm9tXCIsIFwiRnJvbVwiKSwgbG9jYWxlKTtcbiAgY29uc3QgbGFiZWxUbyA9IHRvU2VudGVuY2VDYXNlKGluZFQoXCJIaXN0b3J5X1RvXCIsIFwiVG9cIiksIGxvY2FsZSk7XG4gIGNvbnN0IHF1aWNrQ3VzdG9tTGFiZWwgPSBpbmRUKFwiSGlzdG9yeV9RdWlja19DdXN0b21cIiwgXCJEYXRlXCIpO1xuICBjb25zdCBxdWljazdEYXlzTGFiZWwgPSBpbmRUKFwiSGlzdG9yeV9RdWlja183RGF5c1wiLCBcIjcgZGF5c1wiKTtcbiAgY29uc3QgcXVpY2szMERheXNMYWJlbCA9IGluZFQoXCJIaXN0b3J5X1F1aWNrXzMwRGF5c1wiLCBcIjMwIGRheXNcIik7XG4gIGNvbnN0IHF1aWNrOTBEYXlzTGFiZWwgPSBpbmRUKFwiSGlzdG9yeV9RdWlja185MERheXNcIiwgXCI5MCBkYXlzXCIpO1xuICBjb25zdCBwYWdlRmlyc3RMYWJlbCA9IGluZFQoXCJIaXN0b3J5X1BhZ2VfRmlyc3RcIiwgXCJGaXJzdFwiKTtcbiAgY29uc3QgcGFnZVByZXZMYWJlbCA9IGluZFQoXCJIaXN0b3J5X1BhZ2VfUHJldlwiLCBcIlByZXZpb3VzXCIpO1xuICBjb25zdCBwYWdlTmV4dExhYmVsID0gaW5kVChcIkhpc3RvcnlfUGFnZV9OZXh0XCIsIFwiTmV4dFwiKTtcbiAgY29uc3QgcGFnZUxhc3RMYWJlbCA9IGluZFQoXCJIaXN0b3J5X1BhZ2VfTGFzdFwiLCBcIkxhc3RcIik7XG5cbiAgY29uc3Qgd2Vla0RheUxhYmVscyA9IHVzZU1lbW8oXG4gICAgKCkgPT4gW1xuICAgICAgaW5kVChcIkhpc3RvcnlfRGF5X01vblwiLCBcIk1vblwiKSxcbiAgICAgIGluZFQoXCJIaXN0b3J5X0RheV9UdWVcIiwgXCJUdWVcIiksXG4gICAgICBpbmRUKFwiSGlzdG9yeV9EYXlfV2VkXCIsIFwiV2VkXCIpLFxuICAgICAgaW5kVChcIkhpc3RvcnlfRGF5X1RodVwiLCBcIlRodVwiKSxcbiAgICAgIGluZFQoXCJIaXN0b3J5X0RheV9GcmlcIiwgXCJGcmlcIiksXG4gICAgICBpbmRUKFwiSGlzdG9yeV9EYXlfU2F0XCIsIFwiU2F0XCIpLFxuICAgICAgaW5kVChcIkhpc3RvcnlfRGF5X1N1blwiLCBcIlN1blwiKSxcbiAgICBdLFxuICAgIFtdXG4gICk7XG5cbiAgY29uc3QgcXVpY2tGaWx0ZXJzID0gdXNlTWVtbyhcbiAgICAoKSA9PiBbXG4gICAgICB7IGlkOiBcImN1c3RvbVwiIGFzIGNvbnN0LCBsYWJlbDogcXVpY2tDdXN0b21MYWJlbCB9LFxuICAgICAgeyBpZDogXCJkYXlzLTdcIiBhcyBjb25zdCwgbGFiZWw6IHF1aWNrN0RheXNMYWJlbCB9LFxuICAgICAgeyBpZDogXCJkYXlzLTMwXCIgYXMgY29uc3QsIGxhYmVsOiBxdWljazMwRGF5c0xhYmVsIH0sXG4gICAgICB7IGlkOiBcImRheXMtOTBcIiBhcyBjb25zdCwgbGFiZWw6IHF1aWNrOTBEYXlzTGFiZWwgfSxcbiAgICBdLFxuICAgIFtxdWljazMwRGF5c0xhYmVsLCBxdWljazdEYXlzTGFiZWwsIHF1aWNrOTBEYXlzTGFiZWwsIHF1aWNrQ3VzdG9tTGFiZWxdXG4gICk7XG5cbiAgY29uc3QgcGFnaW5hdGlvbkxhYmVscyA9IHVzZU1lbW8oXG4gICAgKCkgPT4gKHtcbiAgICAgIGZpcnN0OiBwYWdlRmlyc3RMYWJlbCxcbiAgICAgIHByZXY6IHBhZ2VQcmV2TGFiZWwsXG4gICAgICBuZXh0OiBwYWdlTmV4dExhYmVsLFxuICAgICAgbGFzdDogcGFnZUxhc3RMYWJlbCxcbiAgICB9KSxcbiAgICBbcGFnZUZpcnN0TGFiZWwsIHBhZ2VMYXN0TGFiZWwsIHBhZ2VOZXh0TGFiZWwsIHBhZ2VQcmV2TGFiZWxdXG4gICk7XG5cbiAgcmV0dXJuIHtcbiAgICBsYWJlbEZyb20sXG4gICAgbGFiZWxUbyxcbiAgICBzdW1tYXJ5RnJvbTogbGFiZWxGcm9tLFxuICAgIHN1bW1hcnlUbzogbGFiZWxUbyxcbiAgICBmaWx0ZXJUaXRsZTogaW5kVChcIkhpc3RvcnlfRmlsdGVyX0RhdGVcIiwgXCJEYXRlXCIpLFxuICAgIGFkZERhdGVMYWJlbDogaW5kVChcIkhpc3RvcnlfQWRkRGF0ZVwiLCBcIkFkZCBkYXRlXCIpLFxuICAgIGNsZWFyUmFuZ2VMYWJlbDogaW5kVChcIkhpc3RvcnlfQ2xlYXJSYW5nZVwiLCBcIkNsZWFyIHJhbmdlXCIpLFxuICAgIHByZXZNb250aExhYmVsOiBpbmRUKFwiSGlzdG9yeV9QcmV2TW9udGhcIiwgXCJQcmV2aW91cyBtb250aFwiKSxcbiAgICBuZXh0TW9udGhMYWJlbDogaW5kVChcIkhpc3RvcnlfTmV4dE1vbnRoXCIsIFwiTmV4dCBtb250aFwiKSxcbiAgICBzdGF0dXNTZWxlY3RTdGFydExhYmVsOiBpbmRUKFwiSGlzdG9yeV9TdGF0dXNfU2VsZWN0U3RhcnRcIiwgXCJTZWxlY3Qgc3RhcnQgZGF0ZVwiKSxcbiAgICBzdGF0dXNTZWxlY3RFbmRMYWJlbDogaW5kVChcIkhpc3RvcnlfU3RhdHVzX1NlbGVjdEVuZFwiLCBcIlNlbGVjdCBlbmQgZGF0ZVwiKSxcbiAgICBjbGVhckxhYmVsOiBpbmRUKFwiSGlzdG9yeV9GaWx0ZXJfQ2xlYXJcIiwgXCJDbGVhclwiKSxcbiAgICBhcHBseUxhYmVsOiBpbmRUKFwiSGlzdG9yeV9GaWx0ZXJfQXBwbHlcIiwgXCJBcHBseVwiKSxcbiAgICBjbGllbnRMYWJlbDogaW5kVChcIkhpc3RvcnlfRmlsdGVyX0NsaWVudFwiLCBcIkFjY291bnRcIiksXG4gICAgb3duZXJMYWJlbDogaW5kVChcIkhpc3RvcnlfRmlsdGVyX093bmVyXCIsIFwiT3duZXJcIiksXG4gICAgb3duZXJBbGxMYWJlbDogaW5kVChcIkhpc3RvcnlfRmlsdGVyX093bmVyX0FsbFwiLCBcIkFsbCBteSBzdWJvcmRpbmF0ZXNcIiksXG4gICAgb3duZXJOb1VzZXJzTGFiZWw6IGluZFQoXCJIaXN0b3J5X0ZpbHRlcl9Pd25lcl9Ob25lXCIsIFwiTm8gdmlzaWJsZSB1c2Vyc1wiKSxcbiAgICBvd25lckxvYWRpbmdMYWJlbDogaW5kVChcIkhpc3RvcnlfRmlsdGVyX093bmVyX0xvYWRpbmdcIiwgXCJMb2FkaW5nIHZpc2libGUgdXNlcnNcIiksXG4gICAgbG9hZGluZ0xhYmVsOiBpbmRUKFwiSGlzdG9yeV9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKSxcbiAgICBub1Zpc2l0c0luUmFuZ2VMYWJlbDogaW5kVChcIkhpc3RvcnlfTm9EYXRhSW5SYW5nZVwiLCBcIk5vIHZpc2l0cyBpbiB0aGlzIHJhbmdlXCIpLFxuICAgIGNyZWF0ZUxhYmVsOiBpbmRUKFwiQ29tbW9uX0NyZWF0ZVwiLCBcIkNyZWF0ZVwiKSxcbiAgICB3ZWVrRGF5TGFiZWxzLFxuICAgIHF1aWNrRmlsdGVycyxcbiAgICBwYWdpbmF0aW9uTGFiZWxzLFxuICB9O1xufTtcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjayB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHR5cGUgeyBDbGllbnRPcHRpb24gfSBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy92aXNpdGFzL0NsaWVudFNlYXJjaENvbWJvYm94LnRzeFwiO1xuaW1wb3J0IHR5cGUgeyBIaXN0b3J5Q2FjaGVkRmlsdGVyIH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZUhpc3RvcnlGaWx0ZXJDYWNoZS50c1wiO1xuXG50eXBlIEFyZ3MgPSB7XG4gIGNhblZpZXdIaXN0b3J5OiBib29sZWFuO1xuICBjdXJyZW50UGFnZTogbnVtYmVyO1xuICBmcm9tRGF0ZVZhbHVlOiBzdHJpbmc7XG4gIHRvRGF0ZVZhbHVlOiBzdHJpbmc7XG4gIHNlbGVjdGVkQ2xpZW50OiBDbGllbnRPcHRpb24gfCBudWxsO1xuICBvd25lckF4VXNlcklkOiBzdHJpbmc7XG4gIG93bmVyVGV4dDogc3RyaW5nO1xuICBuYXZEZWxheU1zOiBudW1iZXI7XG4gIHNhdmVDYWNoZWRGaWx0ZXI6IChmaWx0ZXI6IEhpc3RvcnlDYWNoZWRGaWx0ZXIpID0+IHZvaWQ7XG4gIG9uRm9yYmlkZGVuOiAoKSA9PiB2b2lkO1xufTtcblxuLy8gQ3JlYXRlcyB0aGUgZGV0YWlsIG5hdmlnYXRpb24gaGFuZGxlciBhbmQgcGVyc2lzdHMgdGhlIGN1cnJlbnQgaGlzdG9yeSBmaWx0ZXIuXG5leHBvcnQgY29uc3QgdXNlSGlzdG9yeU5hdmlnYXRpb24gPSAoe1xuICBjYW5WaWV3SGlzdG9yeSxcbiAgY3VycmVudFBhZ2UsXG4gIGZyb21EYXRlVmFsdWUsXG4gIHRvRGF0ZVZhbHVlLFxuICBzZWxlY3RlZENsaWVudCxcbiAgb3duZXJBeFVzZXJJZCxcbiAgb3duZXJUZXh0LFxuICBuYXZEZWxheU1zLFxuICBzYXZlQ2FjaGVkRmlsdGVyLFxuICBvbkZvcmJpZGRlbixcbn06IEFyZ3MpID0+IHtcbiAgcmV0dXJuIHVzZUNhbGxiYWNrKFxuICAgIChsaW5rSWQ6IHN0cmluZykgPT4ge1xuICAgICAgaWYgKCFjYW5WaWV3SGlzdG9yeSkge1xuICAgICAgICBvbkZvcmJpZGRlbigpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgc2F2ZUNhY2hlZEZpbHRlcih7XG4gICAgICAgICAgZnJvbURhdGU6IGZyb21EYXRlVmFsdWUgfHwgXCJcIixcbiAgICAgICAgICB0b0RhdGU6IHRvRGF0ZVZhbHVlIHx8IFwiXCIsXG4gICAgICAgICAgcGFnZTogY3VycmVudFBhZ2UsXG4gICAgICAgICAgY2xpZW50QWNjb3VudDogc2VsZWN0ZWRDbGllbnQ/LnZhbHVlIHx8IFwiXCIsXG4gICAgICAgICAgY2xpZW50VGV4dDogc2VsZWN0ZWRDbGllbnQ/LnRleHQgfHwgXCJcIixcbiAgICAgICAgICBvd25lckF4VXNlcklkLFxuICAgICAgICAgIG93bmVyVGV4dCxcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGVuY29kZVVSSUNvbXBvbmVudChsaW5rSWQpO1xuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGAvVmlzaXRhcy9EZXRhbGxlLyR7dGFyZ2V0fWA7XG4gICAgICB9LCBuYXZEZWxheU1zKTtcbiAgICB9LFxuICAgIFtcbiAgICAgIGNhblZpZXdIaXN0b3J5LFxuICAgICAgY3VycmVudFBhZ2UsXG4gICAgICBmcm9tRGF0ZVZhbHVlLFxuICAgICAgbmF2RGVsYXlNcyxcbiAgICAgIG9uRm9yYmlkZGVuLFxuICAgICAgb3duZXJBeFVzZXJJZCxcbiAgICAgIG93bmVyVGV4dCxcbiAgICAgIHNhdmVDYWNoZWRGaWx0ZXIsXG4gICAgICBzZWxlY3RlZENsaWVudCxcbiAgICAgIHRvRGF0ZVZhbHVlLFxuICAgIF1cbiAgKTtcbn07XG4iLCAiXHVGRUZGaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgdHlwZSB7IEhpc3RvcnlDYWNoZWRGaWx0ZXIgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlSGlzdG9yeUZpbHRlckNhY2hlLnRzXCI7XHJcbmltcG9ydCB7IHNldFRvcGJhckFjdGlvbkdyb3VwUmVhZHkgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvdG9wYmFyQWN0aW9uVmlzaWJpbGl0eS50c1wiO1xyXG5pbXBvcnQgdHlwZSB7IEZpbHRlckxvYWRSZXF1ZXN0LCBMb2FkT3ZlcnJpZGUgfSBmcm9tIFwiLi91c2VIaXN0b3J5RmlsdGVyc1N0YXRlLnRzXCI7XHJcblxyXG50eXBlIFVzZUhpc3RvcnlQYWdlTGlzdGVuZXJzQXJncyA9IHtcclxuICBpc09wZW46IGJvb2xlYW47XHJcbiAgYWN0aXZhdG9yUmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTERpdkVsZW1lbnQgfCBudWxsPjtcclxuICBwb3BvdmVyUmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTERpdkVsZW1lbnQgfCBudWxsPjtcclxuICBoYXNSZXN0b3JlZEZpbHRlclJlZjogUmVhY3QuTXV0YWJsZVJlZk9iamVjdDxib29sZWFuPjtcclxuICByZXRyeU9uTmV0d29ya0Vycm9yUmVmOiBSZWFjdC5NdXRhYmxlUmVmT2JqZWN0PGJvb2xlYW4+O1xyXG4gIGN1cnJlbnRQYWdlOiBudW1iZXI7XHJcbiAgbG9nSGlzdG9yeTogKG1lc3NhZ2U6IHN0cmluZywgZGF0YT86IFJlY29yZDxzdHJpbmcsIHVua25vd24+KSA9PiB2b2lkO1xyXG4gIGNvbnN1bWVSZXR1cm5GbGFnOiAoKSA9PiBib29sZWFuO1xyXG4gIHJlYWRDYWNoZWRGaWx0ZXI6ICgpID0+IEhpc3RvcnlDYWNoZWRGaWx0ZXIgfCBudWxsO1xyXG4gIGFwcGx5Q2FjaGVkRmlsdGVyOiAoZmlsdGVyOiBIaXN0b3J5Q2FjaGVkRmlsdGVyIHwgbnVsbCkgPT4gRmlsdGVyTG9hZFJlcXVlc3QgfCBudWxsO1xyXG4gIGxvYWRBY3Rpdml0aWVzOiAocGFnZTogbnVtYmVyLCBvdmVycmlkZT86IExvYWRPdmVycmlkZSkgPT4gdm9pZDtcclxuICBzZXRJc09wZW46IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPGJvb2xlYW4+PjtcclxuICBzZXRIb3ZlckRhdGU6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPERhdGUgfCBudWxsPj47XHJcbiAgc2V0U2hvd0ZpbHRlcnM6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPGJvb2xlYW4+PjtcclxuICBhcHBseUZpbHRlcnM6IChvcHRpb25zPzogeyBjbG9zZVBhbmVsPzogYm9vbGVhbjsgZm9yY2U/OiBib29sZWFuOyBwYWdlPzogbnVtYmVyIH0pID0+IHZvaWQ7XHJcbn07XHJcblxyXG4vLyBIYW5kbGVzIGdsb2JhbCBsaXN0ZW5lcnMgdXNlZCBieSB0aGUgaGlzdG9yeSBwYWdlIGZpbHRlcnMgYW5kIGNhbGVuZGFyIFVJLlxyXG5leHBvcnQgY29uc3QgdXNlSGlzdG9yeVBhZ2VMaXN0ZW5lcnMgPSAoe1xyXG4gIGlzT3BlbixcclxuICBhY3RpdmF0b3JSZWYsXHJcbiAgcG9wb3ZlclJlZixcclxuICBoYXNSZXN0b3JlZEZpbHRlclJlZixcclxuICByZXRyeU9uTmV0d29ya0Vycm9yUmVmLFxyXG4gIGN1cnJlbnRQYWdlLFxyXG4gIGxvZ0hpc3RvcnksXHJcbiAgY29uc3VtZVJldHVybkZsYWcsXHJcbiAgcmVhZENhY2hlZEZpbHRlcixcclxuICBhcHBseUNhY2hlZEZpbHRlcixcclxuICBsb2FkQWN0aXZpdGllcyxcclxuICBzZXRJc09wZW4sXHJcbiAgc2V0SG92ZXJEYXRlLFxyXG4gIHNldFNob3dGaWx0ZXJzLFxyXG4gIGFwcGx5RmlsdGVycyxcclxufTogVXNlSGlzdG9yeVBhZ2VMaXN0ZW5lcnNBcmdzKSA9PiB7XHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIHNldFRvcGJhckFjdGlvbkdyb3VwUmVhZHkoXCJoaXN0b3J5LWxpc3QtYWN0aW9uc1wiKTtcclxuICB9LCBbXSk7XHJcblxyXG4gIC8vIENsb3NlIHRoZSBtYW51YWwgcGlja2VyIHdoZW4gY2xpY2tpbmcgb3V0c2lkZSBvZiB0aGUgcmFuZ2UgcGlja2VyIFVJLlxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIWlzT3BlbikgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IGhhbmRsZU91dHNpZGUgPSAoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHtcclxuICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0IGFzIE5vZGUgfCBudWxsO1xyXG4gICAgICBpZiAoIXRhcmdldCkgcmV0dXJuO1xyXG4gICAgICBpZiAocG9wb3ZlclJlZi5jdXJyZW50Py5jb250YWlucyh0YXJnZXQpKSByZXR1cm47XHJcbiAgICAgIGlmIChhY3RpdmF0b3JSZWYuY3VycmVudD8uY29udGFpbnModGFyZ2V0KSkgcmV0dXJuO1xyXG4gICAgICBsb2dIaXN0b3J5KFwiY2xvc2VQb3BvdmVyOm91dHNpZGVcIik7XHJcbiAgICAgIHNldElzT3BlbihmYWxzZSk7XHJcbiAgICAgIHNldEhvdmVyRGF0ZShudWxsKTtcclxuICAgIH07XHJcblxyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBoYW5kbGVPdXRzaWRlKTtcclxuICAgIHJldHVybiAoKSA9PiBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGhhbmRsZU91dHNpZGUpO1xyXG4gIH0sIFthY3RpdmF0b3JSZWYsIGlzT3BlbiwgbG9nSGlzdG9yeSwgcG9wb3ZlclJlZiwgc2V0SG92ZXJEYXRlLCBzZXRJc09wZW5dKTtcclxuXHJcbiAgLy8gUmUtYXBwbHkgZmlsdGVycyBhZnRlciBicm93c2VyIGJhY2svZm9yd2FyZCBuYXZpZ2F0aW9uIHJldHVybnMgdG8gdGhlIHBhZ2UuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IG9uUGFnZVNob3cgPSAoKSA9PiB7XHJcbiAgICAgIGlmIChoYXNSZXN0b3JlZEZpbHRlclJlZi5jdXJyZW50KSByZXR1cm47XHJcbiAgICAgIGlmIChjb25zdW1lUmV0dXJuRmxhZygpKSB7XHJcbiAgICAgICAgY29uc3QgY2FjaGVkID0gcmVhZENhY2hlZEZpbHRlcigpO1xyXG4gICAgICAgIGNvbnN0IGNhY2hlZFJlcXVlc3QgPSBhcHBseUNhY2hlZEZpbHRlcihjYWNoZWQpO1xyXG4gICAgICAgIGlmIChjYWNoZWRSZXF1ZXN0KSB7XHJcbiAgICAgICAgICByZXRyeU9uTmV0d29ya0Vycm9yUmVmLmN1cnJlbnQgPSB0cnVlO1xyXG4gICAgICAgICAgbG9hZEFjdGl2aXRpZXMoY2FjaGVkUmVxdWVzdC5wYWdlLCBjYWNoZWRSZXF1ZXN0Lm92ZXJyaWRlKTtcclxuICAgICAgICAgIHNldFNob3dGaWx0ZXJzKGZhbHNlKTtcclxuICAgICAgICAgIHNldElzT3BlbihmYWxzZSk7XHJcbiAgICAgICAgICBoYXNSZXN0b3JlZEZpbHRlclJlZi5jdXJyZW50ID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwYWdlc2hvd1wiLCBvblBhZ2VTaG93KTtcclxuICAgIHJldHVybiAoKSA9PiB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInBhZ2VzaG93XCIsIG9uUGFnZVNob3cpO1xyXG4gIH0sIFtcclxuICAgIGFwcGx5Q2FjaGVkRmlsdGVyLFxyXG4gICAgY29uc3VtZVJldHVybkZsYWcsXHJcbiAgICBoYXNSZXN0b3JlZEZpbHRlclJlZixcclxuICAgIGxvYWRBY3Rpdml0aWVzLFxyXG4gICAgcmVhZENhY2hlZEZpbHRlcixcclxuICAgIHJldHJ5T25OZXR3b3JrRXJyb3JSZWYsXHJcbiAgICBzZXRJc09wZW4sXHJcbiAgICBzZXRTaG93RmlsdGVycyxcclxuICBdKTtcclxuXHJcbiAgLy8gV2lyZSB0b3BiYXIgYWN0aW9ucyB0aGF0IHRvZ2dsZSBmaWx0ZXJzIG9yIGZvcmNlIHJlZnJlc2ggb2YgY3VycmVudCBwYWdlLlxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBvblRvZ2dsZUZpbHRlcnMgPSAoKSA9PiB7XHJcbiAgICAgIHNldFNob3dGaWx0ZXJzKChwcmV2KSA9PiB7XHJcbiAgICAgICAgY29uc3QgbmV4dCA9ICFwcmV2O1xyXG4gICAgICAgIGlmICghbmV4dCkge1xyXG4gICAgICAgICAgc2V0SXNPcGVuKGZhbHNlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgd2luZG93LnNjcm9sbFRvKHsgdG9wOiAwLCBiZWhhdmlvcjogXCJzbW9vdGhcIiB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5leHQ7XHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBvblJlZnJlc2ggPSAoKSA9PiB7XHJcbiAgICAgIGFwcGx5RmlsdGVycyh7IHBhZ2U6IGN1cnJlbnRQYWdlLCBmb3JjZTogdHJ1ZSwgY2xvc2VQYW5lbDogdHJ1ZSB9KTtcclxuICAgIH07XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJoaXN0b3J5LXRvZ2dsZS1maWx0ZXJcIiwgb25Ub2dnbGVGaWx0ZXJzKTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiaGlzdG9yeS1yZWZyZXNoXCIsIG9uUmVmcmVzaCk7XHJcblxyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJoaXN0b3J5LXRvZ2dsZS1maWx0ZXJcIiwgb25Ub2dnbGVGaWx0ZXJzKTtcclxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJoaXN0b3J5LXJlZnJlc2hcIiwgb25SZWZyZXNoKTtcclxuICAgIH07XHJcbiAgfSwgW2FwcGx5RmlsdGVycywgY3VycmVudFBhZ2UsIHNldElzT3Blbiwgc2V0U2hvd0ZpbHRlcnNdKTtcclxufTtcclxuIiwgImltcG9ydCB7IHVzZUVmZmVjdCwgdHlwZSBEaXNwYXRjaCwgdHlwZSBTZXRTdGF0ZUFjdGlvbiB9IGZyb20gXCJyZWFjdFwiO1xuXG50eXBlIEFyZ3MgPSB7XG4gIHN0YXJ0RGF0ZTogRGF0ZSB8IG51bGw7XG4gIGVuZERhdGU6IERhdGUgfCBudWxsO1xuICBzZWxlY3RpbmdTdGVwOiBcInN0YXJ0XCIgfCBcImVuZFwiIHwgXCJkb25lXCI7XG4gIHNldFNlbGVjdGluZ1N0ZXA6IERpc3BhdGNoPFNldFN0YXRlQWN0aW9uPFwic3RhcnRcIiB8IFwiZW5kXCIgfCBcImRvbmVcIj4+O1xufTtcblxuLy8gS2VlcHMgdGhlIG1hbnVhbCBkYXRlIHBpY2tlciBzdGVwIGFsaWduZWQgd2l0aCB0aGUgc2VsZWN0ZWQgcmFuZ2UuXG5leHBvcnQgY29uc3QgdXNlSGlzdG9yeVBpY2tlclN0ZXBTeW5jID0gKHsgc3RhcnREYXRlLCBlbmREYXRlLCBzZWxlY3RpbmdTdGVwLCBzZXRTZWxlY3RpbmdTdGVwIH06IEFyZ3MpID0+IHtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoc3RhcnREYXRlICYmICFlbmREYXRlICYmIHNlbGVjdGluZ1N0ZXAgPT09IFwic3RhcnRcIikge1xuICAgICAgc2V0U2VsZWN0aW5nU3RlcChcImVuZFwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCFzdGFydERhdGUgJiYgc2VsZWN0aW5nU3RlcCAhPT0gXCJzdGFydFwiKSB7XG4gICAgICBzZXRTZWxlY3RpbmdTdGVwKFwic3RhcnRcIik7XG4gICAgfVxuICB9LCBbc3RhcnREYXRlLCBlbmREYXRlLCBzZWxlY3RpbmdTdGVwLCBzZXRTZWxlY3RpbmdTdGVwXSk7XG59O1xuIiwgIlx1RkVGRmltcG9ydCBSZWFjdCwgeyB1c2VNZW1vLCB1c2VSZWYgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHR5cGUgeyBUaW1lbGluZUl0ZW0gfSBmcm9tIFwiLi9IaXN0b3J5VGFibGUudHN4XCI7XHJcblxyXG50eXBlIEFjdGl2aXR5UmVjb3JkID0gUmVjb3JkPHN0cmluZywgdW5rbm93bj47XHJcblxyXG50eXBlIFVzZUhpc3RvcnlUaW1lbGluZUl0ZW1zQXJncyA9IHtcclxuICBpdGVtczogQWN0aXZpdHlSZWNvcmRbXTtcclxuICBsb2NhbGU6IHN0cmluZztcclxuICBub0RhdGFUZXh0OiBzdHJpbmc7XHJcbiAgbG9nSGlzdG9yeTogKG1lc3NhZ2U6IHN0cmluZywgZGF0YT86IFJlY29yZDxzdHJpbmcsIHVua25vd24+KSA9PiB2b2lkO1xyXG4gIHRvVGl0bGVDYXNlOiAodmFsdWU6IHN0cmluZywgbG9jYWxlOiBzdHJpbmcpID0+IHN0cmluZztcclxuICBmb3JtYXREYXRlUGFydHM6ICh2YWx1ZTogc3RyaW5nLCBsb2NhbGU6IHN0cmluZykgPT4geyB5ZWFyOiBzdHJpbmc7IG1vbnRoOiBzdHJpbmc7IGRheTogc3RyaW5nIH07XHJcbn07XHJcblxyXG4vLyBNYXBzIHJhdyBoaXN0b3J5IHBheWxvYWQgaXRlbXMgaW50byB0aW1lbGluZSBjYXJkcyB1c2VkIGJ5IEhpc3RvcnlUYWJsZS5cclxuZXhwb3J0IGNvbnN0IHVzZUhpc3RvcnlUaW1lbGluZUl0ZW1zID0gKHtcclxuICBpdGVtcyxcclxuICBsb2NhbGUsXHJcbiAgbm9EYXRhVGV4dCxcclxuICBsb2dIaXN0b3J5LFxyXG4gIHRvVGl0bGVDYXNlLFxyXG4gIGZvcm1hdERhdGVQYXJ0cyxcclxufTogVXNlSGlzdG9yeVRpbWVsaW5lSXRlbXNBcmdzKSA9PiB7XHJcbiAgY29uc3QgZGVidWdMb2dnZWRSZWYgPSB1c2VSZWYoMCk7XHJcblxyXG4gIGNvbnN0IHRpbWVsaW5lSXRlbXM6IFRpbWVsaW5lSXRlbVtdID0gdXNlTWVtbygoKSA9PiB7XHJcbiAgICByZXR1cm4gaXRlbXMubWFwKChlbnRyeSkgPT4ge1xyXG4gICAgICBjb25zdCBhY3RpdmlkYWRJZFJhdyA9IChlbnRyeS5hY3RpdmlkYWRJZCA/PyBlbnRyeS5BY3RpdmlkYWRJZCA/PyBcIlwiKS50b1N0cmluZygpLnRyaW0oKTtcclxuICAgICAgY29uc3QgYWN0aXZpZGFkSWQgPSBhY3RpdmlkYWRJZFJhdyB8fCBcIlwiO1xyXG4gICAgICBjb25zdCByZWNJZFJhdyA9IGVudHJ5LnJlY0lkID8/IGVudHJ5LlJlY0lkID8/IFwiXCI7XHJcbiAgICAgIGNvbnN0IHJlY0lkID0gcmVjSWRSYXcgJiYgIU51bWJlci5pc05hTihOdW1iZXIocmVjSWRSYXcpKSA/IE51bWJlcihyZWNJZFJhdykgOiBudWxsO1xyXG4gICAgICBsZXQgbGlua0lkID0gYWN0aXZpZGFkSWQgfHwgKHJlY0lkID8gcmVjSWQudG9TdHJpbmcoKSA6IFwiXCIpO1xyXG5cclxuICAgICAgaWYgKGRlYnVnTG9nZ2VkUmVmLmN1cnJlbnQgPCA1KSB7XHJcbiAgICAgICAgbG9nSGlzdG9yeShcImFjdGl2aXR5IGl0ZW1cIiwgeyBhY3RpdmlkYWRJZCwgcmVjSWRSYXcsIHJlY0lkIH0pO1xyXG4gICAgICAgIGRlYnVnTG9nZ2VkUmVmLmN1cnJlbnQgKz0gMTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgcmF3TmFtZSA9IChlbnRyeS5uYW1lID8/IGVudHJ5Lk5hbWUgPz8gXCJcIikudG9TdHJpbmcoKS50cmltKCk7XHJcbiAgICAgIGNvbnN0IGZ1bGxOYW1lID0gdG9UaXRsZUNhc2UocmF3TmFtZSwgbG9jYWxlKTtcclxuICAgICAgY29uc3QgZmVjaGEgPSAoZW50cnkudHJhbnNEYXRlID8/IGVudHJ5LlRyYW5zRGF0ZSA/PyBcIlwiKS50b1N0cmluZygpO1xyXG4gICAgICBjb25zdCByYXdEZXNjID0gKGVudHJ5LmRlc2NyaXB0aW9uID8/IGVudHJ5LkRlc2NyaXB0aW9uID8/IFwiXCIpLnRvU3RyaW5nKCkudHJpbSgpO1xyXG4gICAgICBjb25zdCBmdWxsRGVzYyA9IHJhd0Rlc2M7XHJcblxyXG4gICAgICBjb25zdCBpc05vRGF0YUNhcmQgPSAhcmF3TmFtZSAmJiAhcmF3RGVzYztcclxuICAgICAgaWYgKGlzTm9EYXRhQ2FyZCkge1xyXG4gICAgICAgIGxpbmtJZCA9IFwiXCI7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgaWQ6IGxpbmtJZCxcclxuICAgICAgICBhY3RpdmlkYWRJZCxcclxuICAgICAgICByZWNJZCxcclxuICAgICAgICBuYW1lOiBmdWxsTmFtZSxcclxuICAgICAgICBkZXNjcmlwdGlvbjogZnVsbERlc2MgfHwgbm9EYXRhVGV4dCxcclxuICAgICAgICBmdWxsTmFtZSxcclxuICAgICAgICBmdWxsRGVzYyxcclxuICAgICAgICBkYXRlUGFydHM6IGZvcm1hdERhdGVQYXJ0cyhmZWNoYSwgbG9jYWxlKSxcclxuICAgICAgICBpc05vRGF0YTogaXNOb0RhdGFDYXJkLFxyXG4gICAgICB9O1xyXG4gICAgfSk7XHJcbiAgfSwgW2Zvcm1hdERhdGVQYXJ0cywgaXRlbXMsIGxvY2FsZSwgbG9nSGlzdG9yeSwgbm9EYXRhVGV4dCwgdG9UaXRsZUNhc2VdKTtcclxuXHJcbiAgcmV0dXJuIHsgdGltZWxpbmVJdGVtcyB9O1xyXG59O1xyXG4iLCAiaW1wb3J0IHsgdXNlTWVtbyB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgc2hvd1Blcm1pc3Npb25Nb2RhbCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9wZXJtaXNzaW9ucy50c1wiO1xuaW1wb3J0IHsgdXNlVmlzaWJsZVZpc2l0VXNlcnMgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlVmlzaWJsZVZpc2l0VXNlcnMudHNcIjtcbmltcG9ydCB7IGZvcm1hdFZpc2libGVWaXNpdFVzZXJMYWJlbCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy92aXNpYmxlVmlzaXRVc2Vycy50c1wiO1xuXG50eXBlIEFyZ3MgPSB7XG4gIGVuYWJsZWQ6IGJvb2xlYW47XG4gIGNvbXBhbnlJZDogc3RyaW5nO1xuICBheFVzZXJJZDogc3RyaW5nO1xuICBwZXJtaXNzaW9uc1JldmlzaW9uOiBzdHJpbmc7XG4gIHNlbGVjdGVkT3duZXJBeFVzZXJJZDogc3RyaW5nO1xuICBvbkRlYnVnOiAobWVzc2FnZTogc3RyaW5nLCBkYXRhPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pID0+IHZvaWQ7XG59O1xuXG4vLyBMb2FkcyB2aXNpYmxlIHZpc2l0IG93bmVycyBhbmQgcmVzb2x2ZXMgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCBvd25lciBzYWZlbHkuXG5leHBvcnQgY29uc3QgdXNlSGlzdG9yeVZpc2libGVPd25lciA9ICh7XG4gIGVuYWJsZWQsXG4gIGNvbXBhbnlJZCxcbiAgYXhVc2VySWQsXG4gIHBlcm1pc3Npb25zUmV2aXNpb24sXG4gIHNlbGVjdGVkT3duZXJBeFVzZXJJZCxcbiAgb25EZWJ1Zyxcbn06IEFyZ3MpID0+IHtcbiAgY29uc3QgeyB2aXNpYmxlVmlzaXRVc2VycywgdmlzaWJsZVVzZXJzTG9hZGluZywgdmlzaWJsZVVzZXJzRXJyb3IsIHZpc2libGVVc2Vyc1JlYWR5IH0gPSB1c2VWaXNpYmxlVmlzaXRVc2Vycyh7XG4gICAgZW5hYmxlZCxcbiAgICBjb21wYW55SWQsXG4gICAgYXhVc2VySWQsXG4gICAgcGVybWlzc2lvbnNSZXZpc2lvbixcbiAgICBvbkZvcmJpZGRlbjogc2hvd1Blcm1pc3Npb25Nb2RhbCxcbiAgICBvbkRlYnVnLFxuICB9KTtcblxuICBjb25zdCBjdXJyZW50QXhVc2VySWQgPSBheFVzZXJJZC50cmltKCk7XG4gIGNvbnN0IGhhc1Zpc2libGVTdWJvcmRpbmF0ZXMgPSB2aXNpYmxlVXNlcnNSZWFkeSAmJiB2aXNpYmxlVmlzaXRVc2Vycy5sZW5ndGggPiAwO1xuICBjb25zdCBzZWxlY3RlZE93bmVyID0gdXNlTWVtbygoKSA9PiB7XG4gICAgaWYgKCFzZWxlY3RlZE93bmVyQXhVc2VySWQgfHwgIWhhc1Zpc2libGVTdWJvcmRpbmF0ZXMpIHJldHVybiBudWxsO1xuICAgIHJldHVybiAoXG4gICAgICB2aXNpYmxlVmlzaXRVc2Vycy5maW5kKCh1c2VyKSA9PiB1c2VyLmF4VXNlcklkLnRvVXBwZXJDYXNlKCkgPT09IHNlbGVjdGVkT3duZXJBeFVzZXJJZC50b1VwcGVyQ2FzZSgpKSB8fCBudWxsXG4gICAgKTtcbiAgfSwgW2hhc1Zpc2libGVTdWJvcmRpbmF0ZXMsIHNlbGVjdGVkT3duZXJBeFVzZXJJZCwgdmlzaWJsZVZpc2l0VXNlcnNdKTtcblxuICBjb25zdCBmYWxsYmFja093bmVyVGV4dCA9ICFoYXNWaXNpYmxlU3Vib3JkaW5hdGVzICYmIHZpc2libGVVc2Vyc1JlYWR5ICYmIGN1cnJlbnRBeFVzZXJJZCA/IGN1cnJlbnRBeFVzZXJJZCA6IFwiXCI7XG5cbiAgcmV0dXJuIHtcbiAgICB2aXNpYmxlVmlzaXRVc2VycyxcbiAgICB2aXNpYmxlVXNlcnNMb2FkaW5nLFxuICAgIHZpc2libGVVc2Vyc0Vycm9yLFxuICAgIHZpc2libGVVc2Vyc1JlYWR5LFxuICAgIHNlbGVjdGVkT3duZXJUZXh0OiBzZWxlY3RlZE93bmVyID8gZm9ybWF0VmlzaWJsZVZpc2l0VXNlckxhYmVsKHNlbGVjdGVkT3duZXIpIDogZmFsbGJhY2tPd25lclRleHQsXG4gICAgZWZmZWN0aXZlU2VsZWN0ZWRPd25lckF4VXNlcklkOiBzZWxlY3RlZE93bmVyPy5heFVzZXJJZCB8fCBmYWxsYmFja093bmVyVGV4dCxcbiAgfTtcbn07XG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBBcGlGZXRjaEVycm9yLCBmZXRjaEpzb24gfSBmcm9tIFwiLi4vc2VydmljZXMvYXBpU2VydmljZS50c1wiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuXHJcbmV4cG9ydCB0eXBlIEhpc3RvcnlBY3Rpdml0eUl0ZW0gPSB7XHJcbiAgYWN0aXZpZGFkSWQ/OiBzdHJpbmcgfCBudW1iZXI7XHJcbiAgQWN0aXZpZGFkSWQ/OiBzdHJpbmcgfCBudW1iZXI7XHJcbiAgcmVjSWQ/OiBzdHJpbmcgfCBudW1iZXI7XHJcbiAgUmVjSWQ/OiBzdHJpbmcgfCBudW1iZXI7XHJcbiAgbmFtZT86IHN0cmluZztcclxuICBOYW1lPzogc3RyaW5nO1xyXG4gIHRyYW5zRGF0ZT86IHN0cmluZztcclxuICBUcmFuc0RhdGU/OiBzdHJpbmc7XHJcbiAgZGVzY3JpcHRpb24/OiBzdHJpbmc7XHJcbiAgRGVzY3JpcHRpb24/OiBzdHJpbmc7XHJcbn07XHJcblxyXG50eXBlIEhpc3RvcnlSZXNwb25zZSA9IHtcclxuICBpdGVtcz86IEhpc3RvcnlBY3Rpdml0eUl0ZW1bXTtcclxuICB0b3RhbD86IG51bWJlcjtcclxufTtcclxuXHJcbnR5cGUgTG9hZE92ZXJyaWRlID0ge1xuICBmcm9tRGF0ZTogc3RyaW5nO1xuICB0b0RhdGU6IHN0cmluZztcbiAgYWNjb3VudE51bT86IHN0cmluZztcbiAgb3duZXJBeFVzZXJJZD86IHN0cmluZztcbn07XG5cclxudHlwZSBVc2VIaXN0b3J5QWN0aXZpdGllc0FyZ3MgPSB7XHJcbiAgZnJvbURhdGVWYWx1ZTogc3RyaW5nO1xuICB0b0RhdGVWYWx1ZTogc3RyaW5nO1xuICBhY2NvdW50TnVtVmFsdWU6IHN0cmluZztcbiAgb3duZXJBeFVzZXJJZFZhbHVlPzogc3RyaW5nO1xuICBwYWdlU2l6ZTogbnVtYmVyO1xuICByZXRyeURlbGF5TXM/OiBudW1iZXI7XHJcbiAgbm9ybWFsaXplUmFuZ2U6IChmcm9tOiBzdHJpbmcsIHRvOiBzdHJpbmcpID0+IHsgZnJvbTogc3RyaW5nOyB0bzogc3RyaW5nIH07XHJcbiAgb25Gb3JiaWRkZW46ICgpID0+IHZvaWQ7XHJcbiAgb25EZWJ1Zz86IChtZXNzYWdlOiBzdHJpbmcsIGRhdGE/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPikgPT4gdm9pZDtcclxufTtcclxuXHJcbi8vIENlbnRyYWxpemVzIGhpc3RvcnkgZmV0Y2gvcmV0cnkgbG9naWMgdG8ga2VlcCBwYWdlIGNvbXBvbmVudHMgc21hbGxlci5cclxuZXhwb3J0IGNvbnN0IHVzZUhpc3RvcnlBY3Rpdml0aWVzID0gKHtcclxuICBmcm9tRGF0ZVZhbHVlLFxuICB0b0RhdGVWYWx1ZSxcbiAgYWNjb3VudE51bVZhbHVlLFxuICBvd25lckF4VXNlcklkVmFsdWUgPSBcIlwiLFxuICBwYWdlU2l6ZSxcbiAgcmV0cnlEZWxheU1zID0gNjAwLFxyXG4gIG5vcm1hbGl6ZVJhbmdlLFxyXG4gIG9uRm9yYmlkZGVuLFxyXG4gIG9uRGVidWcsXHJcbn06IFVzZUhpc3RvcnlBY3Rpdml0aWVzQXJncykgPT4ge1xyXG4gIGNvbnN0IFtpdGVtcywgc2V0SXRlbXNdID0gdXNlU3RhdGU8SGlzdG9yeUFjdGl2aXR5SXRlbVtdPihbXSk7XHJcbiAgY29uc3QgW3RvdGFsLCBzZXRUb3RhbF0gPSB1c2VTdGF0ZSgwKTtcclxuICBjb25zdCBbY3VycmVudFBhZ2UsIHNldEN1cnJlbnRQYWdlXSA9IHVzZVN0YXRlKDEpO1xyXG4gIGNvbnN0IFtpc0xvYWRpbmcsIHNldElzTG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW2Vycm9yTWVzc2FnZSwgc2V0RXJyb3JNZXNzYWdlXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG5cclxuICBjb25zdCByZXRyeU9uTmV0d29ya0Vycm9yUmVmID0gdXNlUmVmKGZhbHNlKTtcclxuICBjb25zdCBhY3RpdmVBYm9ydFJlZiA9IHVzZVJlZjxBYm9ydENvbnRyb2xsZXIgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBhY3RpdmVSZXF1ZXN0SWRSZWYgPSB1c2VSZWYoMCk7XHJcbiAgY29uc3QgcmV0cnlUaW1lclJlZiA9IHVzZVJlZjxudW1iZXIgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBsYXN0U2lnbmF0dXJlUmVmID0gdXNlUmVmKFwiXCIpO1xyXG5cclxuICBjb25zdCBjbGVhclJldHJ5VGltZXIgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAocmV0cnlUaW1lclJlZi5jdXJyZW50KSB7XHJcbiAgICAgIGNsZWFyVGltZW91dChyZXRyeVRpbWVyUmVmLmN1cnJlbnQpO1xyXG4gICAgICByZXRyeVRpbWVyUmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgfVxyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgYWJvcnRBY3RpdmVSZXF1ZXN0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKCFhY3RpdmVBYm9ydFJlZi5jdXJyZW50KSByZXR1cm47XHJcbiAgICB0cnkge1xyXG4gICAgICBhY3RpdmVBYm9ydFJlZi5jdXJyZW50LmFib3J0KCk7XHJcbiAgICB9IGNhdGNoIHtcclxuICAgICAgLy8gSWdub3JlIGFib3J0IGVycm9ycy5cclxuICAgIH1cclxuICAgIGFjdGl2ZUFib3J0UmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgcmVzZXRBY3Rpdml0aWVzID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgY2xlYXJSZXRyeVRpbWVyKCk7XHJcbiAgICBhYm9ydEFjdGl2ZVJlcXVlc3QoKTtcclxuICAgIHNldEl0ZW1zKFtdKTtcclxuICAgIHNldFRvdGFsKDApO1xyXG4gICAgc2V0RXJyb3JNZXNzYWdlKFwiXCIpO1xyXG4gICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcclxuICB9LCBbYWJvcnRBY3RpdmVSZXF1ZXN0LCBjbGVhclJldHJ5VGltZXJdKTtcclxuXHJcbiAgY29uc3QgbG9hZEFjdGl2aXRpZXMgPSB1c2VDYWxsYmFjayhcclxuICAgIGFzeW5jIChwYWdlOiBudW1iZXIsIG92ZXJyaWRlPzogTG9hZE92ZXJyaWRlKSA9PiB7XHJcbiAgICAgIGNvbnN0IGZyb21EYXRlU3RyID0gb3ZlcnJpZGU/LmZyb21EYXRlID8/IGZyb21EYXRlVmFsdWU7XG4gICAgICBjb25zdCB0b0RhdGVTdHIgPSBvdmVycmlkZT8udG9EYXRlID8/IHRvRGF0ZVZhbHVlO1xuICAgICAgY29uc3QgYWNjb3VudE51bVN0ciA9IG92ZXJyaWRlPy5hY2NvdW50TnVtID8/IGFjY291bnROdW1WYWx1ZTtcbiAgICAgIGNvbnN0IG93bmVyQXhVc2VySWRTdHIgPSBvdmVycmlkZT8ub3duZXJBeFVzZXJJZCA/PyBvd25lckF4VXNlcklkVmFsdWU7XG5cclxuICAgICAgaWYgKCFmcm9tRGF0ZVN0ciB8fCAhdG9EYXRlU3RyKSB7XHJcbiAgICAgICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcclxuICAgICAgICBzZXRJdGVtcyhbXSk7XHJcbiAgICAgICAgc2V0VG90YWwoMCk7XHJcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKFwiXCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2V0Q3VycmVudFBhZ2UocGFnZSk7XHJcbiAgICAgIGNsZWFyUmV0cnlUaW1lcigpO1xyXG5cclxuICAgICAgY29uc3QgcmVxdWVzdElkID0gKythY3RpdmVSZXF1ZXN0SWRSZWYuY3VycmVudDtcclxuICAgICAgYWJvcnRBY3RpdmVSZXF1ZXN0KCk7XHJcblxyXG4gICAgICBjb25zdCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xyXG4gICAgICBhY3RpdmVBYm9ydFJlZi5jdXJyZW50ID0gY29udHJvbGxlcjtcclxuXHJcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSBub3JtYWxpemVSYW5nZShmcm9tRGF0ZVN0ciwgdG9EYXRlU3RyKTtcclxuICAgICAgY29uc3Qgbm9ybWFsaXplZE93bmVyQXhVc2VySWQgPSBvd25lckF4VXNlcklkU3RyLnRyaW0oKTtcbiAgICAgIGNvbnN0IGZpbHRlclNpZ25hdHVyZSA9IGAke25vcm1hbGl6ZWQuZnJvbX18JHtub3JtYWxpemVkLnRvfXwke2FjY291bnROdW1TdHJ9fCR7bm9ybWFsaXplZE93bmVyQXhVc2VySWR9fCR7cGFnZX1gO1xuICAgICAgbGFzdFNpZ25hdHVyZVJlZi5jdXJyZW50ID0gZmlsdGVyU2lnbmF0dXJlO1xuXHJcbiAgICAgIHNldElzTG9hZGluZyh0cnVlKTtcclxuICAgICAgc2V0SXRlbXMoW10pO1xyXG4gICAgICBzZXRUb3RhbCgwKTtcclxuICAgICAgc2V0RXJyb3JNZXNzYWdlKFwiXCIpO1xyXG5cclxuICAgICAgY29uc3QgcGF5bG9hZDoge1xuICAgICAgICBmcm9tRGF0ZTogc3RyaW5nO1xuICAgICAgICB0b0RhdGU6IHN0cmluZztcbiAgICAgICAgYWNjb3VudE51bTogc3RyaW5nO1xuICAgICAgICBvd25lckF4VXNlcklkPzogc3RyaW5nO1xuICAgICAgfSA9IHtcbiAgICAgICAgZnJvbURhdGU6IG5vcm1hbGl6ZWQuZnJvbSxcbiAgICAgICAgdG9EYXRlOiBub3JtYWxpemVkLnRvLFxuICAgICAgICBhY2NvdW50TnVtOiBhY2NvdW50TnVtU3RyLFxuICAgICAgfTtcbiAgICAgIGlmIChub3JtYWxpemVkT3duZXJBeFVzZXJJZCkge1xuICAgICAgICBwYXlsb2FkLm93bmVyQXhVc2VySWQgPSBub3JtYWxpemVkT3duZXJBeFVzZXJJZDtcbiAgICAgIH1cblxyXG4gICAgICBvbkRlYnVnPy4oXCJsb2FkQWN0aXZpdGllczpyZXF1ZXN0XCIsIHsgcGFnZSwgcGFnZVNpemUsIHBheWxvYWQgfSk7XHJcblxyXG4gICAgICBsZXQgZGF0YTogSGlzdG9yeVJlc3BvbnNlO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGRhdGEgPSBhd2FpdCBmZXRjaEpzb248SGlzdG9yeVJlc3BvbnNlPihgL0hpc3RvcmlhbC9HZXRBY3Rpdml0aWVzP3BhZ2U9JHtwYWdlfSZwYWdlU2l6ZT0ke3BhZ2VTaXplfWAsIHtcclxuICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXHJcbiAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXlsb2FkKSxcclxuICAgICAgICAgIHNpZ25hbDogY29udHJvbGxlci5zaWduYWwsXHJcbiAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcclxuICAgICAgICB9KTtcclxuICAgICAgfSBjYXRjaCAoZXJyOiBhbnkpIHtcclxuICAgICAgICBpZiAocmVxdWVzdElkICE9PSBhY3RpdmVSZXF1ZXN0SWRSZWYuY3VycmVudCkgcmV0dXJuO1xyXG4gICAgICAgIGlmIChlcnI/Lm5hbWUgPT09IFwiQWJvcnRFcnJvclwiKSB7XHJcbiAgICAgICAgICBhY3RpdmVBYm9ydFJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChlcnIgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yICYmIGVyci5zdGF0dXMgPT09IDQwMykge1xyXG4gICAgICAgICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcclxuICAgICAgICAgIGFjdGl2ZUFib3J0UmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICAgICAgb25Gb3JiaWRkZW4oKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGlzTmV0d29ya0Vycm9yID0gIShlcnIgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yKSB8fCB0eXBlb2YgZXJyLnN0YXR1cyAhPT0gXCJudW1iZXJcIjtcclxuICAgICAgICBpZiAoaXNOZXR3b3JrRXJyb3IgJiYgcmV0cnlPbk5ldHdvcmtFcnJvclJlZi5jdXJyZW50KSB7XHJcbiAgICAgICAgICByZXRyeU9uTmV0d29ya0Vycm9yUmVmLmN1cnJlbnQgPSBmYWxzZTtcclxuICAgICAgICAgIGFjdGl2ZUFib3J0UmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICAgICAgcmV0cnlUaW1lclJlZi5jdXJyZW50ID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmVxdWVzdElkICE9PSBhY3RpdmVSZXF1ZXN0SWRSZWYuY3VycmVudCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBpZiAobGFzdFNpZ25hdHVyZVJlZi5jdXJyZW50ICE9PSBmaWx0ZXJTaWduYXR1cmUpIHJldHVybjtcclxuICAgICAgICAgICAgbG9hZEFjdGl2aXRpZXMocGFnZSwge1xyXG4gICAgICAgICAgICAgIGZyb21EYXRlOiBmcm9tRGF0ZVN0cixcbiAgICAgICAgICAgICAgdG9EYXRlOiB0b0RhdGVTdHIsXG4gICAgICAgICAgICAgIGFjY291bnROdW06IGFjY291bnROdW1TdHIsXG4gICAgICAgICAgICAgIG93bmVyQXhVc2VySWQ6IG5vcm1hbGl6ZWRPd25lckF4VXNlcklkLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSwgcmV0cnlEZWxheU1zKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcclxuICAgICAgICBzZXRFcnJvck1lc3NhZ2UoZXJyPy5tZXNzYWdlIHx8IGluZFQoXCJBcGlfUmVxdWVzdEZhaWxlZFwiLCBcIk5vIHNlIHB1ZG8gY29uZWN0YXIgY29uIGVsIHNlcnZpZG9yIChyZWQpLlwiKSk7XHJcbiAgICAgICAgYWN0aXZlQWJvcnRSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAocmVxdWVzdElkICE9PSBhY3RpdmVSZXF1ZXN0SWRSZWYuY3VycmVudCkgcmV0dXJuO1xyXG5cclxuICAgICAgb25EZWJ1Zz8uKFwibG9hZEFjdGl2aXRpZXM6cmVzcG9uc2VcIiwge1xyXG4gICAgICAgIHN0YXR1czogMjAwLFxyXG4gICAgICAgIHRvdGFsOiBkYXRhPy50b3RhbCA/PyAwLFxyXG4gICAgICAgIGNvdW50OiBBcnJheS5pc0FycmF5KGRhdGE/Lml0ZW1zKSA/IGRhdGEuaXRlbXMubGVuZ3RoIDogMCxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xyXG4gICAgICBzZXRJdGVtcyhkYXRhLml0ZW1zIHx8IFtdKTtcclxuICAgICAgc2V0VG90YWwoZGF0YS50b3RhbCB8fCAoZGF0YS5pdGVtcyB8fCBbXSkubGVuZ3RoKTtcclxuICAgICAgYWN0aXZlQWJvcnRSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICB9LFxyXG4gICAgW1xyXG4gICAgICBhYm9ydEFjdGl2ZVJlcXVlc3QsXHJcbiAgICAgIGFjY291bnROdW1WYWx1ZSxcbiAgICAgIGNsZWFyUmV0cnlUaW1lcixcbiAgICAgIGZyb21EYXRlVmFsdWUsXG4gICAgICBub3JtYWxpemVSYW5nZSxcbiAgICAgIG9uRGVidWcsXG4gICAgICBvbkZvcmJpZGRlbixcbiAgICAgIG93bmVyQXhVc2VySWRWYWx1ZSxcbiAgICAgIHBhZ2VTaXplLFxuICAgICAgcmV0cnlEZWxheU1zLFxuICAgICAgdG9EYXRlVmFsdWUsXG4gICAgXVxyXG4gICk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBjbGVhclJldHJ5VGltZXIoKTtcclxuICAgICAgYWJvcnRBY3RpdmVSZXF1ZXN0KCk7XHJcbiAgICB9O1xyXG4gIH0sIFthYm9ydEFjdGl2ZVJlcXVlc3QsIGNsZWFyUmV0cnlUaW1lcl0pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgaXRlbXMsXHJcbiAgICB0b3RhbCxcclxuICAgIGN1cnJlbnRQYWdlLFxyXG4gICAgaXNMb2FkaW5nLFxyXG4gICAgZXJyb3JNZXNzYWdlLFxyXG4gICAgbG9hZEFjdGl2aXRpZXMsXHJcbiAgICByZXNldEFjdGl2aXRpZXMsXHJcbiAgICByZXRyeU9uTmV0d29ya0Vycm9yUmVmLFxyXG4gICAgbGFzdFNpZ25hdHVyZVJlZixcclxuICB9O1xyXG59O1xyXG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2sgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgSElTVE9SWV9GSUxURVJfS0VZLCBISVNUT1JZX1JFVFVSTl9GTEFHX0tFWSB9IGZyb20gXCIuLi91dGlscy92aXNpdGFzSGlzdG9yeS50c1wiO1xyXG5pbXBvcnQge1xyXG4gIGdldFNlc3Npb25Kc29uV2l0aEV4cGlyeSxcclxuICBnZXRTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5LFxyXG4gIHJlbW92ZVNlc3Npb25WYWx1ZVdpdGhFeHBpcnksXHJcbiAgc2V0U2Vzc2lvbkpzb25XaXRoRXhwaXJ5LFxyXG4gIHNldFNlc3Npb25WYWx1ZVdpdGhFeHBpcnksXHJcbn0gZnJvbSBcIi4uL3V0aWxzL3Nlc3Npb25FeHBpcnkudHNcIjtcclxuXHJcbmV4cG9ydCB0eXBlIEhpc3RvcnlDYWNoZWRGaWx0ZXIgPSB7XG4gIGZyb21EYXRlOiBzdHJpbmc7XG4gIHRvRGF0ZTogc3RyaW5nO1xuICBwYWdlPzogbnVtYmVyO1xuICBjbGllbnRBY2NvdW50Pzogc3RyaW5nO1xuICBjbGllbnRUZXh0Pzogc3RyaW5nO1xuICBvd25lckF4VXNlcklkPzogc3RyaW5nO1xuICBvd25lclRleHQ/OiBzdHJpbmc7XG59O1xuXHJcbmNvbnN0IEhJU1RPUllfQ0FDSEVfVFRMX01TID0gMTIgKiA2MCAqIDYwICogMTAwMDtcclxuXHJcbmNvbnN0IG5vcm1hbGl6ZUNhY2hlZEZpbHRlciA9ICh2YWx1ZTogSGlzdG9yeUNhY2hlZEZpbHRlciB8IG51bGwpOiBIaXN0b3J5Q2FjaGVkRmlsdGVyIHwgbnVsbCA9PiB7XHJcbiAgaWYgKCF2YWx1ZSB8fCB0eXBlb2YgdmFsdWUgIT09IFwib2JqZWN0XCIpIHJldHVybiBudWxsO1xyXG4gIHJldHVybiB7XHJcbiAgICBmcm9tRGF0ZTogdmFsdWUuZnJvbURhdGUgfHwgXCJcIixcclxuICAgIHRvRGF0ZTogdmFsdWUudG9EYXRlIHx8IFwiXCIsXHJcbiAgICBwYWdlOiB2YWx1ZS5wYWdlLFxuICAgIGNsaWVudEFjY291bnQ6IHZhbHVlLmNsaWVudEFjY291bnQgfHwgXCJcIixcbiAgICBjbGllbnRUZXh0OiB2YWx1ZS5jbGllbnRUZXh0IHx8IFwiXCIsXG4gICAgb3duZXJBeFVzZXJJZDogdmFsdWUub3duZXJBeFVzZXJJZCB8fCBcIlwiLFxuICAgIG93bmVyVGV4dDogdmFsdWUub3duZXJUZXh0IHx8IFwiXCIsXG4gIH07XG59O1xuXHJcbi8vIEtlZXBzIGhpc3RvcnkgZmlsdGVyIGNhY2hlIHJlYWRzL3dyaXRlcyBpbiBvbmUgcGxhY2UuXHJcbmV4cG9ydCBjb25zdCB1c2VIaXN0b3J5RmlsdGVyQ2FjaGUgPSAoKSA9PiB7XHJcbiAgY29uc3QgcmVhZENhY2hlZEZpbHRlciA9IHVzZUNhbGxiYWNrKCgpOiBIaXN0b3J5Q2FjaGVkRmlsdGVyIHwgbnVsbCA9PiB7XHJcbiAgICBjb25zdCBwYXJzZWQgPSBnZXRTZXNzaW9uSnNvbldpdGhFeHBpcnk8SGlzdG9yeUNhY2hlZEZpbHRlcj4oSElTVE9SWV9GSUxURVJfS0VZKTtcclxuICAgIHJldHVybiBub3JtYWxpemVDYWNoZWRGaWx0ZXIocGFyc2VkKTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IGNsZWFyRmlsdGVyQ2FjaGUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICByZW1vdmVTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KEhJU1RPUllfRklMVEVSX0tFWSk7XHJcbiAgICByZW1vdmVTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KEhJU1RPUllfUkVUVVJOX0ZMQUdfS0VZKTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IGNvbnN1bWVSZXR1cm5GbGFnID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgY29uc3QgcmF3ID0gZ2V0U2Vzc2lvblZhbHVlV2l0aEV4cGlyeShISVNUT1JZX1JFVFVSTl9GTEFHX0tFWSk7XHJcbiAgICBpZiAocmF3ID09PSBcIjFcIikge1xyXG4gICAgICByZW1vdmVTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KEhJU1RPUllfUkVUVVJOX0ZMQUdfS0VZKTtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBzYXZlQ2FjaGVkRmlsdGVyID0gdXNlQ2FsbGJhY2soKGZpbHRlcjogSGlzdG9yeUNhY2hlZEZpbHRlcikgPT4ge1xyXG4gICAgc2V0U2Vzc2lvbkpzb25XaXRoRXhwaXJ5KEhJU1RPUllfRklMVEVSX0tFWSwgZmlsdGVyLCBISVNUT1JZX0NBQ0hFX1RUTF9NUyk7XHJcbiAgICBzZXRTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KEhJU1RPUllfUkVUVVJOX0ZMQUdfS0VZLCBcIjFcIiwgSElTVE9SWV9DQUNIRV9UVExfTVMpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHJlYWRDYWNoZWRGaWx0ZXIsXHJcbiAgICBjbGVhckZpbHRlckNhY2hlLFxyXG4gICAgY29uc3VtZVJldHVybkZsYWcsXHJcbiAgICBzYXZlQ2FjaGVkRmlsdGVyLFxyXG4gIH07XHJcbn07XHJcbiIsICJcdUZFRkZpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2ssIHVzZU1lbW8sIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHR5cGUgeyBNb3VzZUV2ZW50IGFzIFJlYWN0TW91c2VFdmVudCB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgdHlwZSB7IENsaWVudE9wdGlvbiB9IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL3Zpc2l0YXMvQ2xpZW50U2VhcmNoQ29tYm9ib3gudHN4XCI7XHJcbmltcG9ydCB0eXBlIHsgSGlzdG9yeUNhY2hlZEZpbHRlciB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VIaXN0b3J5RmlsdGVyQ2FjaGUudHNcIjtcclxuXHJcbmV4cG9ydCB0eXBlIFF1aWNrRmlsdGVySWQgPSBcImN1c3RvbVwiIHwgXCJkYXlzLTdcIiB8IFwiZGF5cy0zMFwiIHwgXCJkYXlzLTkwXCI7XHJcblxyXG5leHBvcnQgdHlwZSBMb2FkT3ZlcnJpZGUgPSB7XG4gIGZyb21EYXRlOiBzdHJpbmc7XG4gIHRvRGF0ZTogc3RyaW5nO1xuICBhY2NvdW50TnVtPzogc3RyaW5nO1xuICBvd25lckF4VXNlcklkPzogc3RyaW5nO1xufTtcblxyXG5leHBvcnQgdHlwZSBGaWx0ZXJMb2FkUmVxdWVzdCA9IHtcclxuICBwYWdlOiBudW1iZXI7XHJcbiAgb3ZlcnJpZGU6IExvYWRPdmVycmlkZTtcclxufTtcclxuXHJcbmNvbnN0IEhJU1RPUllfUVVJQ0tfRklMVEVSX1JBTkdFUzogQXJyYXk8e1xyXG4gIGlkOiBFeGNsdWRlPFF1aWNrRmlsdGVySWQsIFwiY3VzdG9tXCI+O1xyXG4gIGRheXNUb1N1YnRyYWN0OiBudW1iZXI7XHJcbn0+ID0gW1xyXG4gIHsgaWQ6IFwiZGF5cy03XCIsIGRheXNUb1N1YnRyYWN0OiA2IH0sXHJcbiAgeyBpZDogXCJkYXlzLTMwXCIsIGRheXNUb1N1YnRyYWN0OiAyOSB9LFxyXG4gIHsgaWQ6IFwiZGF5cy05MFwiLCBkYXlzVG9TdWJ0cmFjdDogODkgfSxcclxuXTtcclxuXHJcbnR5cGUgVXNlSGlzdG9yeUZpbHRlcnNTdGF0ZUFyZ3MgPSB7XHJcbiAgZGVmYXVsdEZyb21EYXRlOiBzdHJpbmc7XHJcbiAgZGVmYXVsdFRvRGF0ZTogc3RyaW5nO1xyXG4gIGxvZ0hpc3Rvcnk6IChtZXNzYWdlOiBzdHJpbmcsIGRhdGE/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPikgPT4gdm9pZDtcclxuICBwYXJzZURhdGVWYWx1ZTogKHZhbHVlOiBzdHJpbmcpID0+IERhdGUgfCBudWxsO1xyXG4gIHBhcnNlSVNPOiAodmFsdWU6IHN0cmluZykgPT4gRGF0ZSB8IG51bGw7XHJcbiAgdG9JU086ICh2YWx1ZTogRGF0ZSkgPT4gc3RyaW5nO1xyXG4gIHN0YXJ0T2ZEYXk6ICh2YWx1ZTogRGF0ZSkgPT4gRGF0ZTtcclxuICBpc0JlZm9yZTogKGE6IERhdGUgfCBudWxsLCBiOiBEYXRlIHwgbnVsbCkgPT4gYm9vbGVhbjtcclxufTtcclxuXHJcbi8vIEVuY2Fwc3VsYXRlcyBoaXN0b3J5IGZpbHRlciBzdGF0ZSBhbmQgZGF0ZS1yYW5nZSBvcmNoZXN0cmF0aW9uLlxyXG5leHBvcnQgY29uc3QgdXNlSGlzdG9yeUZpbHRlcnNTdGF0ZSA9ICh7XHJcbiAgZGVmYXVsdEZyb21EYXRlLFxyXG4gIGRlZmF1bHRUb0RhdGUsXHJcbiAgbG9nSGlzdG9yeSxcclxuICBwYXJzZURhdGVWYWx1ZSxcclxuICBwYXJzZUlTTyxcclxuICB0b0lTTyxcclxuICBzdGFydE9mRGF5LFxyXG4gIGlzQmVmb3JlLFxyXG59OiBVc2VIaXN0b3J5RmlsdGVyc1N0YXRlQXJncykgPT4ge1xyXG4gIGNvbnN0IHJlc29sdmVRdWlja0ZpbHRlckZyb21SYW5nZSA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKHN0YXJ0OiBEYXRlIHwgbnVsbCwgZW5kOiBEYXRlIHwgbnVsbCk6IFF1aWNrRmlsdGVySWQgfCBudWxsID0+IHtcclxuICAgICAgaWYgKCFzdGFydCB8fCAhZW5kKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRTdGFydCA9IHN0YXJ0T2ZEYXkoc3RhcnQpO1xyXG4gICAgICBjb25zdCBub3JtYWxpemVkRW5kID0gc3RhcnRPZkRheShlbmQpO1xyXG4gICAgICBjb25zdCB0b2RheSA9IHN0YXJ0T2ZEYXkobmV3IERhdGUoKSk7XHJcbiAgICAgIGlmICh0b0lTTyhub3JtYWxpemVkRW5kKSAhPT0gdG9JU08odG9kYXkpKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGZvciAoY29uc3QgZW50cnkgb2YgSElTVE9SWV9RVUlDS19GSUxURVJfUkFOR0VTKSB7XHJcbiAgICAgICAgY29uc3QgY2FuZGlkYXRlU3RhcnQgPSBuZXcgRGF0ZSh0b2RheSk7XHJcbiAgICAgICAgY2FuZGlkYXRlU3RhcnQuc2V0RGF0ZSh0b2RheS5nZXREYXRlKCkgLSBlbnRyeS5kYXlzVG9TdWJ0cmFjdCk7XHJcbiAgICAgICAgaWYgKHRvSVNPKG5vcm1hbGl6ZWRTdGFydCkgPT09IHRvSVNPKGNhbmRpZGF0ZVN0YXJ0KSkge1xyXG4gICAgICAgICAgcmV0dXJuIGVudHJ5LmlkO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9LFxyXG4gICAgW3N0YXJ0T2ZEYXksIHRvSVNPXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IFtzdGFydERhdGUsIHNldFN0YXJ0RGF0ZV0gPSB1c2VTdGF0ZTxEYXRlIHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgW2VuZERhdGUsIHNldEVuZERhdGVdID0gdXNlU3RhdGU8RGF0ZSB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IFttYW51YWxTdGFydERhdGUsIHNldE1hbnVhbFN0YXJ0RGF0ZV0gPSB1c2VTdGF0ZTxEYXRlIHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgW21hbnVhbEVuZERhdGUsIHNldE1hbnVhbEVuZERhdGVdID0gdXNlU3RhdGU8RGF0ZSB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IFtob3ZlckRhdGUsIHNldEhvdmVyRGF0ZV0gPSB1c2VTdGF0ZTxEYXRlIHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgW3NlbGVjdGluZ1N0ZXAsIHNldFNlbGVjdGluZ1N0ZXBdID0gdXNlU3RhdGU8XCJzdGFydFwiIHwgXCJlbmRcIiB8IFwiZG9uZVwiPihcInN0YXJ0XCIpO1xyXG4gIGNvbnN0IFtjdXJyZW50TW9udGgsIHNldEN1cnJlbnRNb250aF0gPSB1c2VTdGF0ZShuZXcgRGF0ZSgpLmdldE1vbnRoKCkpO1xyXG4gIGNvbnN0IFtjdXJyZW50WWVhciwgc2V0Q3VycmVudFllYXJdID0gdXNlU3RhdGUobmV3IERhdGUoKS5nZXRGdWxsWWVhcigpKTtcclxuICBjb25zdCBbaXNPcGVuLCBzZXRJc09wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtzaG93TWFudWFsUGlja2VyUGFuZWwsIHNldFNob3dNYW51YWxQaWNrZXJQYW5lbF0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW2FjdGl2ZVF1aWNrRmlsdGVyLCBzZXRBY3RpdmVRdWlja0ZpbHRlcl0gPSB1c2VTdGF0ZTxRdWlja0ZpbHRlcklkIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtzZWxlY3RlZENsaWVudCwgc2V0U2VsZWN0ZWRDbGllbnRdID0gdXNlU3RhdGU8Q2xpZW50T3B0aW9uIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtzZWxlY3RlZE93bmVyQXhVc2VySWQsIHNldFNlbGVjdGVkT3duZXJBeFVzZXJJZF0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2NsaWVudFJlc2V0S2V5LCBzZXRDbGllbnRSZXNldEtleV0gPSB1c2VTdGF0ZSgwKTtcbiAgY29uc3QgW3Nob3dGaWx0ZXJzLCBzZXRTaG93RmlsdGVyc10gPSB1c2VTdGF0ZSh0cnVlKTtcclxuICBjb25zdCBbc2hvd01hbnVhbEVycm9yLCBzZXRTaG93TWFudWFsRXJyb3JdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG5cclxuICBjb25zdCBoYXNSZXN0b3JlZEZpbHRlclJlZiA9IHVzZVJlZihmYWxzZSk7XHJcbiAgY29uc3QgZGlkSW5pdEZpbHRlclJlZiA9IHVzZVJlZihmYWxzZSk7XHJcblxyXG4gIGNvbnN0IGZyb21EYXRlVmFsdWUgPSB1c2VNZW1vKCgpID0+IChzdGFydERhdGUgPyB0b0lTTyhzdGFydERhdGUpIDogXCJcIiksIFtzdGFydERhdGUsIHRvSVNPXSk7XHJcbiAgY29uc3QgdG9EYXRlVmFsdWUgPSB1c2VNZW1vKCgpID0+IChlbmREYXRlID8gdG9JU08oZW5kRGF0ZSkgOiBcIlwiKSwgW2VuZERhdGUsIHRvSVNPXSk7XHJcbiAgY29uc3QgYWNjb3VudE51bVZhbHVlID0gdXNlTWVtbygoKSA9PiAoc2VsZWN0ZWRDbGllbnQgPyBzZWxlY3RlZENsaWVudC52YWx1ZSA6IFwiXCIpLCBbc2VsZWN0ZWRDbGllbnRdKTtcclxuXHJcbiAgY29uc3QgdmFsaWRhdGVNYW51YWxSYW5nZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmIChhY3RpdmVRdWlja0ZpbHRlciA9PT0gXCJjdXN0b21cIiAmJiAoIXN0YXJ0RGF0ZSB8fCAhZW5kRGF0ZSkpIHtcclxuICAgICAgc2V0U2hvd01hbnVhbEVycm9yKHRydWUpO1xyXG4gICAgICBzZXRTZWxlY3RpbmdTdGVwKCFzdGFydERhdGUgPyBcInN0YXJ0XCIgOiBcImVuZFwiKTtcclxuICAgICAgc2V0U2hvd01hbnVhbFBpY2tlclBhbmVsKHRydWUpO1xyXG4gICAgICBzZXRJc09wZW4odHJ1ZSk7XHJcbiAgICAgIHNldFNob3dGaWx0ZXJzKHRydWUpO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9LCBbYWN0aXZlUXVpY2tGaWx0ZXIsIGVuZERhdGUsIHN0YXJ0RGF0ZV0pO1xyXG5cclxuICAvLyBBcHBsaWVzIGEgZGVmYXVsdCBkYXRlIHJhbmdlIGFuZCByZXR1cm5zIHRoZSBsb2FkIHBheWxvYWQgbmVlZGVkIGJ5IHRoZSBwYWdlLlxyXG4gIGNvbnN0IGFwcGx5RGVmYXVsdFJhbmdlRnJvbVByb3BzID0gdXNlQ2FsbGJhY2soKCk6IEZpbHRlckxvYWRSZXF1ZXN0IHwgbnVsbCA9PiB7XHJcbiAgICBpZiAoIWRlZmF1bHRGcm9tRGF0ZSB8fCAhZGVmYXVsdFRvRGF0ZSkgcmV0dXJuIG51bGw7XHJcbiAgICBjb25zdCBzdGFydFJhdyA9IHBhcnNlRGF0ZVZhbHVlKGRlZmF1bHRGcm9tRGF0ZSk7XHJcbiAgICBjb25zdCBlbmRSYXcgPSBwYXJzZURhdGVWYWx1ZShkZWZhdWx0VG9EYXRlKTtcclxuICAgIGlmICghc3RhcnRSYXcgfHwgIWVuZFJhdykgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgY29uc3Qgc3RhcnREYXkgPSBzdGFydE9mRGF5KHN0YXJ0UmF3KTtcclxuICAgIGNvbnN0IGVuZERheSA9IHN0YXJ0T2ZEYXkoZW5kUmF3KTtcclxuXHJcbiAgICBsZXQgc3RhcnQgPSBzdGFydERheTtcclxuICAgIGxldCBlbmQgPSBlbmREYXk7XHJcbiAgICBpZiAoaXNCZWZvcmUoZW5kLCBzdGFydCkpIHtcclxuICAgICAgY29uc3Qgc3dhcCA9IHN0YXJ0O1xyXG4gICAgICBzdGFydCA9IGVuZDtcclxuICAgICAgZW5kID0gc3dhcDtcclxuICAgIH1cclxuXHJcbiAgICBzZXRTdGFydERhdGUoc3RhcnQpO1xyXG4gICAgc2V0RW5kRGF0ZShlbmQpO1xyXG4gICAgc2V0U2VsZWN0aW5nU3RlcChcImRvbmVcIik7XHJcbiAgICBzZXRIb3ZlckRhdGUobnVsbCk7XHJcbiAgICBzZXRDdXJyZW50TW9udGgoc3RhcnQuZ2V0TW9udGgoKSk7XHJcbiAgICBzZXRDdXJyZW50WWVhcihzdGFydC5nZXRGdWxsWWVhcigpKTtcclxuICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKHJlc29sdmVRdWlja0ZpbHRlckZyb21SYW5nZShzdGFydCwgZW5kKSk7XG4gICAgc2V0U2VsZWN0ZWRDbGllbnQobnVsbCk7XG4gICAgc2V0U2VsZWN0ZWRPd25lckF4VXNlcklkKFwiXCIpO1xuICAgIHNldElzT3BlbihmYWxzZSk7XG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIHBhZ2U6IDEsXHJcbiAgICAgIG92ZXJyaWRlOiB7XHJcbiAgICAgICAgZnJvbURhdGU6IHRvSVNPKHN0YXJ0KSxcclxuICAgICAgICB0b0RhdGU6IHRvSVNPKGVuZCksXHJcbiAgICAgICAgYWNjb3VudE51bTogXCJcIixcclxuICAgICAgfSxcclxuICAgIH07XHJcbiAgfSwgW2RlZmF1bHRGcm9tRGF0ZSwgZGVmYXVsdFRvRGF0ZSwgaXNCZWZvcmUsIHBhcnNlRGF0ZVZhbHVlLCByZXNvbHZlUXVpY2tGaWx0ZXJGcm9tUmFuZ2UsIHN0YXJ0T2ZEYXksIHRvSVNPXSk7XHJcblxyXG4gIC8vIFJlc2V0cyBoaXN0b3J5IGZpbHRlcnMgbG9jYWwgc3RhdGUgb25seS5cclxuICBjb25zdCByZXNldEhpc3RvcnlGaWx0ZXJzID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgc2V0U3RhcnREYXRlKG51bGwpO1xyXG4gICAgc2V0RW5kRGF0ZShudWxsKTtcclxuICAgIHNldE1hbnVhbFN0YXJ0RGF0ZShudWxsKTtcclxuICAgIHNldE1hbnVhbEVuZERhdGUobnVsbCk7XHJcbiAgICBzZXRTZWxlY3RpbmdTdGVwKFwic3RhcnRcIik7XHJcbiAgICBzZXRIb3ZlckRhdGUobnVsbCk7XHJcbiAgICBzZXRDdXJyZW50TW9udGgobmV3IERhdGUoKS5nZXRNb250aCgpKTtcclxuICAgIHNldEN1cnJlbnRZZWFyKG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKSk7XHJcbiAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcihudWxsKTtcbiAgICBzZXRTaG93TWFudWFsUGlja2VyUGFuZWwoZmFsc2UpO1xuICAgIHNldFNlbGVjdGVkQ2xpZW50KG51bGwpO1xuICAgIHNldFNlbGVjdGVkT3duZXJBeFVzZXJJZChcIlwiKTtcbiAgICBzZXRDbGllbnRSZXNldEtleSgocHJldikgPT4gcHJldiArIDEpO1xuICAgIHNldFNob3dNYW51YWxFcnJvcihmYWxzZSk7XHJcbiAgfSwgW10pO1xyXG5cclxuICAvLyBBcHBsaWVzIGNhY2hlZCBmaWx0ZXJzIGFuZCByZXR1cm5zIHRoZSBsb2FkIHBheWxvYWQgbmVlZGVkIGJ5IHRoZSBwYWdlLlxyXG4gIGNvbnN0IGFwcGx5Q2FjaGVkRmlsdGVyID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoZmlsdGVyOiBIaXN0b3J5Q2FjaGVkRmlsdGVyIHwgbnVsbCk6IEZpbHRlckxvYWRSZXF1ZXN0IHwgbnVsbCA9PiB7XHJcbiAgICAgIGlmICghZmlsdGVyIHx8ICFmaWx0ZXIuZnJvbURhdGUgfHwgIWZpbHRlci50b0RhdGUpIHJldHVybiBudWxsO1xyXG5cclxuICAgICAgY29uc3Qgc3RhcnQgPSBwYXJzZUlTTyhmaWx0ZXIuZnJvbURhdGUpO1xyXG4gICAgICBjb25zdCBlbmQgPSBwYXJzZUlTTyhmaWx0ZXIudG9EYXRlKTtcclxuICAgICAgc2V0U3RhcnREYXRlKHN0YXJ0KTtcclxuICAgICAgc2V0RW5kRGF0ZShlbmQpO1xyXG4gICAgICBzZXRTZWxlY3RpbmdTdGVwKGVuZCA/IFwiZG9uZVwiIDogXCJlbmRcIik7XHJcbiAgICAgIHNldEhvdmVyRGF0ZShudWxsKTtcclxuICAgICAgc2V0Q3VycmVudE1vbnRoKHN0YXJ0ID8gc3RhcnQuZ2V0TW9udGgoKSA6IG5ldyBEYXRlKCkuZ2V0TW9udGgoKSk7XHJcbiAgICAgIHNldEN1cnJlbnRZZWFyKHN0YXJ0ID8gc3RhcnQuZ2V0RnVsbFllYXIoKSA6IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKSk7XHJcbiAgICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKHJlc29sdmVRdWlja0ZpbHRlckZyb21SYW5nZShzdGFydCwgZW5kKSk7XHJcbiAgICAgIHNldFNob3dNYW51YWxQaWNrZXJQYW5lbChmYWxzZSk7XHJcbiAgICAgIHNldFNob3dNYW51YWxFcnJvcihmYWxzZSk7XHJcblxyXG4gICAgICBpZiAoZmlsdGVyLmNsaWVudEFjY291bnQpIHtcbiAgICAgICAgc2V0U2VsZWN0ZWRDbGllbnQoeyB2YWx1ZTogZmlsdGVyLmNsaWVudEFjY291bnQsIHRleHQ6IGZpbHRlci5jbGllbnRUZXh0IHx8IGZpbHRlci5jbGllbnRBY2NvdW50IH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2V0U2VsZWN0ZWRDbGllbnQobnVsbCk7XG4gICAgICB9XG4gICAgICBzZXRTZWxlY3RlZE93bmVyQXhVc2VySWQoZmlsdGVyLm93bmVyQXhVc2VySWQgfHwgXCJcIik7XG5cclxuICAgICAgY29uc3QgcGFnZVZhbCA9IE51bWJlcihmaWx0ZXIucGFnZSk7XHJcbiAgICAgIGNvbnN0IHBhZ2VUb0xvYWQgPSBOdW1iZXIuaXNGaW5pdGUocGFnZVZhbCkgJiYgcGFnZVZhbCA+IDAgPyBwYWdlVmFsIDogMTtcclxuXHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgcGFnZTogcGFnZVRvTG9hZCxcclxuICAgICAgICBvdmVycmlkZToge1xuICAgICAgICAgIGZyb21EYXRlOiBmaWx0ZXIuZnJvbURhdGUsXG4gICAgICAgICAgdG9EYXRlOiBmaWx0ZXIudG9EYXRlLFxuICAgICAgICAgIGFjY291bnROdW06IGZpbHRlci5jbGllbnRBY2NvdW50IHx8IFwiXCIsXG4gICAgICAgICAgb3duZXJBeFVzZXJJZDogZmlsdGVyLm93bmVyQXhVc2VySWQgfHwgXCJcIixcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgfSxcclxuICAgIFtwYXJzZUlTTywgcmVzb2x2ZVF1aWNrRmlsdGVyRnJvbVJhbmdlXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZVNlbGVjdCA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKGRhdGVPYmo6IERhdGUpID0+IHtcclxuICAgICAgbG9nSGlzdG9yeShcImhhbmRsZVNlbGVjdFwiLCB7XHJcbiAgICAgICAgY2xpY2tlZDogdG9JU08oZGF0ZU9iaiksXHJcbiAgICAgICAgc3RhcnQ6IGZyb21EYXRlVmFsdWUsXHJcbiAgICAgICAgZW5kOiB0b0RhdGVWYWx1ZSxcclxuICAgICAgICBzZWxlY3RpbmdTdGVwLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHNldFNob3dNYW51YWxFcnJvcihmYWxzZSk7XHJcbiAgICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKFwiY3VzdG9tXCIpO1xyXG4gICAgICBzZXRTaG93TWFudWFsUGlja2VyUGFuZWwodHJ1ZSk7XHJcbiAgICAgIGNvbnN0IGhhc1N0YXJ0ID0gISFzdGFydERhdGU7XHJcbiAgICAgIGNvbnN0IGhhc0VuZCA9ICEhZW5kRGF0ZTtcclxuXHJcbiAgICAgIGlmIChzZWxlY3RpbmdTdGVwID09PSBcImVuZFwiKSB7XHJcbiAgICAgICAgaWYgKCFoYXNTdGFydCkge1xyXG4gICAgICAgICAgc2V0U3RhcnREYXRlKGRhdGVPYmopO1xyXG4gICAgICAgICAgc2V0RW5kRGF0ZShudWxsKTtcclxuICAgICAgICAgIHNldFNlbGVjdGluZ1N0ZXAoXCJlbmRcIik7XHJcbiAgICAgICAgICBzZXRDdXJyZW50TW9udGgoZGF0ZU9iai5nZXRNb250aCgpKTtcclxuICAgICAgICAgIHNldEN1cnJlbnRZZWFyKGRhdGVPYmouZ2V0RnVsbFllYXIoKSk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbmV3U3RhcnQgPSBzdGFydERhdGUgYXMgRGF0ZTtcclxuICAgICAgICBsZXQgbmV3RW5kID0gZGF0ZU9iajtcclxuICAgICAgICBpZiAoaXNCZWZvcmUobmV3RW5kLCBuZXdTdGFydCkpIHtcclxuICAgICAgICAgIGNvbnN0IHN3YXAgPSBuZXdTdGFydDtcclxuICAgICAgICAgIG5ld1N0YXJ0ID0gbmV3RW5kO1xyXG4gICAgICAgICAgbmV3RW5kID0gc3dhcDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldFN0YXJ0RGF0ZShuZXdTdGFydCk7XHJcbiAgICAgICAgc2V0RW5kRGF0ZShuZXdFbmQpO1xyXG4gICAgICAgIHNldE1hbnVhbFN0YXJ0RGF0ZShuZXdTdGFydCk7XHJcbiAgICAgICAgc2V0TWFudWFsRW5kRGF0ZShuZXdFbmQpO1xyXG4gICAgICAgIHNldFNlbGVjdGluZ1N0ZXAoXCJkb25lXCIpO1xyXG4gICAgICAgIHNldEN1cnJlbnRNb250aChuZXdFbmQuZ2V0TW9udGgoKSk7XHJcbiAgICAgICAgc2V0Q3VycmVudFllYXIobmV3RW5kLmdldEZ1bGxZZWFyKCkpO1xyXG4gICAgICAgIHNldEhvdmVyRGF0ZShudWxsKTtcclxuICAgICAgICBzZXRJc09wZW4oZmFsc2UpO1xyXG4gICAgICAgIHNldFNob3dNYW51YWxQaWNrZXJQYW5lbChmYWxzZSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBuZXdTdGFydCA9IGRhdGVPYmo7XHJcbiAgICAgIGlmIChoYXNFbmQgJiYgZW5kRGF0ZSAmJiBpc0JlZm9yZShlbmREYXRlLCBuZXdTdGFydCkpIHtcclxuICAgICAgICBzZXRTdGFydERhdGUobmV3U3RhcnQpO1xyXG4gICAgICAgIHNldEVuZERhdGUobnVsbCk7XHJcbiAgICAgICAgc2V0U2VsZWN0aW5nU3RlcChcImVuZFwiKTtcclxuICAgICAgICBzZXRDdXJyZW50TW9udGgobmV3U3RhcnQuZ2V0TW9udGgoKSk7XHJcbiAgICAgICAgc2V0Q3VycmVudFllYXIobmV3U3RhcnQuZ2V0RnVsbFllYXIoKSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzZXRTdGFydERhdGUobmV3U3RhcnQpO1xyXG4gICAgICBpZiAoaGFzRW5kICYmIGVuZERhdGUpIHtcclxuICAgICAgICBzZXRFbmREYXRlKGVuZERhdGUpO1xyXG4gICAgICAgIHNldE1hbnVhbFN0YXJ0RGF0ZShuZXdTdGFydCk7XHJcbiAgICAgICAgc2V0TWFudWFsRW5kRGF0ZShlbmREYXRlKTtcclxuICAgICAgICBzZXRTZWxlY3RpbmdTdGVwKFwiZG9uZVwiKTtcclxuICAgICAgICBzZXRIb3ZlckRhdGUobnVsbCk7XHJcbiAgICAgICAgc2V0SXNPcGVuKGZhbHNlKTtcclxuICAgICAgICBzZXRTaG93TWFudWFsUGlja2VyUGFuZWwoZmFsc2UpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNldEVuZERhdGUobnVsbCk7XHJcbiAgICAgICAgc2V0U2VsZWN0aW5nU3RlcChcImVuZFwiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2V0Q3VycmVudE1vbnRoKG5ld1N0YXJ0LmdldE1vbnRoKCkpO1xyXG4gICAgICBzZXRDdXJyZW50WWVhcihuZXdTdGFydC5nZXRGdWxsWWVhcigpKTtcclxuICAgIH0sXHJcbiAgICBbZW5kRGF0ZSwgZnJvbURhdGVWYWx1ZSwgaXNCZWZvcmUsIGxvZ0hpc3RvcnksIHNlbGVjdGluZ1N0ZXAsIHN0YXJ0RGF0ZSwgdG9EYXRlVmFsdWUsIHRvSVNPXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUNsZWFyU3RhdGUgPSB1c2VDYWxsYmFjayhcclxuICAgIChldmVudDogUmVhY3RNb3VzZUV2ZW50KSA9PiB7XHJcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICBsb2dIaXN0b3J5KFwiY2xlYXJSYW5nZVwiKTtcclxuICAgICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIobnVsbCk7XHJcbiAgICAgIHNldFNob3dNYW51YWxFcnJvcihmYWxzZSk7XHJcbiAgICAgIHNldFNob3dNYW51YWxQaWNrZXJQYW5lbChmYWxzZSk7XHJcbiAgICAgIHJlc2V0SGlzdG9yeUZpbHRlcnMoKTtcclxuICAgICAgc2V0SXNPcGVuKGZhbHNlKTtcclxuICAgICAgc2V0U2hvd0ZpbHRlcnModHJ1ZSk7XHJcbiAgICB9LFxyXG4gICAgW2xvZ0hpc3RvcnksIHJlc2V0SGlzdG9yeUZpbHRlcnNdXHJcbiAgKTtcclxuXHJcbiAgY29uc3Qgb3BlblBvcG92ZXIgPSB1c2VDYWxsYmFjayhcclxuICAgIChzZWN0aW9uOiBcInN0YXJ0XCIgfCBcImVuZFwiKSA9PiB7XHJcbiAgICAgIGxvZ0hpc3RvcnkoXCJvcGVuUG9wb3ZlclwiLCB7IHNlY3Rpb24sIHN0YXJ0OiBmcm9tRGF0ZVZhbHVlLCBlbmQ6IHRvRGF0ZVZhbHVlLCBzZWxlY3RpbmdTdGVwIH0pO1xyXG4gICAgICBzZXRTaG93TWFudWFsRXJyb3IoZmFsc2UpO1xyXG4gICAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcihcImN1c3RvbVwiKTtcclxuICAgICAgc2V0U2hvd01hbnVhbFBpY2tlclBhbmVsKHRydWUpO1xyXG5cclxuICAgICAgaWYgKHNlY3Rpb24gPT09IFwiZW5kXCIgJiYgIXN0YXJ0RGF0ZSkge1xyXG4gICAgICAgIHNldFNlbGVjdGluZ1N0ZXAoXCJzdGFydFwiKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzZXRTZWxlY3RpbmdTdGVwKHNlY3Rpb24pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzZXRJc09wZW4odHJ1ZSk7XHJcbiAgICB9LFxyXG4gICAgW2Zyb21EYXRlVmFsdWUsIGxvZ0hpc3RvcnksIHNlbGVjdGluZ1N0ZXAsIHN0YXJ0RGF0ZSwgdG9EYXRlVmFsdWVdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQWN0aXZhdG9yS2V5RG93biA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKGV2ZW50OiBSZWFjdC5LZXlib2FyZEV2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4ge1xyXG4gICAgICBpZiAoZXZlbnQua2V5ICE9PSBcIkVudGVyXCIgJiYgZXZlbnQua2V5ICE9PSBcIiBcIikgcmV0dXJuO1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBvcGVuUG9wb3ZlcihcInN0YXJ0XCIpO1xyXG4gICAgfSxcclxuICAgIFtvcGVuUG9wb3Zlcl1cclxuICApO1xyXG5cclxuICBjb25zdCBoYW5kbGVTZWN0aW9uS2V5RG93biA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKGV2ZW50OiBSZWFjdC5LZXlib2FyZEV2ZW50PEhUTUxEaXZFbGVtZW50Piwgc2VjdGlvbjogXCJzdGFydFwiIHwgXCJlbmRcIikgPT4ge1xyXG4gICAgICBpZiAoZXZlbnQua2V5ICE9PSBcIkVudGVyXCIgJiYgZXZlbnQua2V5ICE9PSBcIiBcIikgcmV0dXJuO1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgb3BlblBvcG92ZXIoc2VjdGlvbik7XHJcbiAgICB9LFxyXG4gICAgW29wZW5Qb3BvdmVyXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGFwcGx5UXVpY2tSYW5nZSA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKGZpbHRlcklkOiBRdWlja0ZpbHRlcklkLCBzdGFydDogRGF0ZSwgZW5kOiBEYXRlKSA9PiB7XHJcbiAgICAgIGNvbnN0IHN0YXJ0RGF5ID0gc3RhcnRPZkRheShzdGFydCk7XHJcbiAgICAgIGNvbnN0IGVuZERheSA9IHN0YXJ0T2ZEYXkoZW5kKTtcclxuICAgICAgc2V0U3RhcnREYXRlKHN0YXJ0RGF5KTtcclxuICAgICAgc2V0RW5kRGF0ZShlbmREYXkpO1xyXG4gICAgICBzZXRTZWxlY3RpbmdTdGVwKFwiZG9uZVwiKTtcclxuICAgICAgc2V0SG92ZXJEYXRlKG51bGwpO1xyXG4gICAgICBzZXRDdXJyZW50TW9udGgoc3RhcnREYXkuZ2V0TW9udGgoKSk7XHJcbiAgICAgIHNldEN1cnJlbnRZZWFyKHN0YXJ0RGF5LmdldEZ1bGxZZWFyKCkpO1xyXG4gICAgICBzZXRJc09wZW4oZmFsc2UpO1xyXG4gICAgICBzZXRTaG93TWFudWFsUGlja2VyUGFuZWwoZmFsc2UpO1xyXG4gICAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcihmaWx0ZXJJZCk7XHJcbiAgICAgIHNldFNob3dNYW51YWxFcnJvcihmYWxzZSk7XHJcbiAgICB9LFxyXG4gICAgW3N0YXJ0T2ZEYXldXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlUXVpY2tGaWx0ZXIgPSB1c2VDYWxsYmFjayhcclxuICAgIChmaWx0ZXJJZDogUXVpY2tGaWx0ZXJJZCkgPT4ge1xyXG4gICAgICBjb25zdCB0b2RheSA9IHN0YXJ0T2ZEYXkobmV3IERhdGUoKSk7XHJcblxyXG4gICAgICBpZiAoZmlsdGVySWQgPT09IFwiY3VzdG9tXCIpIHtcclxuICAgICAgICAvLyBUb2dnbGUgbWFudWFsIHBhbmVsIG9uIGV2ZXJ5IERhdGUgYnV0dG9uIGNsaWNrLlxyXG4gICAgICAgIGlmIChzaG93TWFudWFsUGlja2VyUGFuZWwpIHtcclxuICAgICAgICAgIHNldFNob3dNYW51YWxFcnJvcihmYWxzZSk7XHJcbiAgICAgICAgICBzZXRIb3ZlckRhdGUobnVsbCk7XHJcbiAgICAgICAgICBzZXRTZWxlY3RpbmdTdGVwKHN0YXJ0RGF0ZSAmJiBlbmREYXRlID8gXCJkb25lXCIgOiBzdGFydERhdGUgPyBcImVuZFwiIDogXCJzdGFydFwiKTtcclxuICAgICAgICAgIHNldElzT3BlbihmYWxzZSk7XHJcbiAgICAgICAgICBzZXRTaG93TWFudWFsUGlja2VyUGFuZWwoZmFsc2UpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgbmV4dFN0YXJ0ID0gbWFudWFsU3RhcnREYXRlID8gbmV3IERhdGUobWFudWFsU3RhcnREYXRlKSA6IHN0YXJ0RGF0ZSA/IG5ldyBEYXRlKHN0YXJ0RGF0ZSkgOiBudWxsO1xyXG4gICAgICAgIGNvbnN0IG5leHRFbmQgPSBtYW51YWxFbmREYXRlID8gbmV3IERhdGUobWFudWFsRW5kRGF0ZSkgOiBlbmREYXRlID8gbmV3IERhdGUoZW5kRGF0ZSkgOiBudWxsO1xyXG4gICAgICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKFwiY3VzdG9tXCIpO1xyXG4gICAgICAgIHNldFNob3dNYW51YWxQaWNrZXJQYW5lbCh0cnVlKTtcclxuICAgICAgICBzZXRTdGFydERhdGUobmV4dFN0YXJ0KTtcclxuICAgICAgICBzZXRFbmREYXRlKG5leHRFbmQpO1xyXG5cclxuICAgICAgICBpZiAobmV4dFN0YXJ0KSB7XHJcbiAgICAgICAgICBzZXRDdXJyZW50TW9udGgobmV4dFN0YXJ0LmdldE1vbnRoKCkpO1xyXG4gICAgICAgICAgc2V0Q3VycmVudFllYXIobmV4dFN0YXJ0LmdldEZ1bGxZZWFyKCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQWx3YXlzIHJlb3BlbiB0aGUgbWFudWFsIGNhbGVuZGFyIHdoZW4gdGhlIGN1c3RvbSBkYXRlIHF1aWNrIGZpbHRlciBpcyBwcmVzc2VkLlxyXG4gICAgICAgIHNldFNlbGVjdGluZ1N0ZXAobmV4dFN0YXJ0ICYmICFuZXh0RW5kID8gXCJlbmRcIiA6IFwic3RhcnRcIik7XHJcbiAgICAgICAgc2V0SXNPcGVuKHRydWUpO1xyXG4gICAgICAgIHNldEhvdmVyRGF0ZShudWxsKTtcclxuICAgICAgICBzZXRTaG93TWFudWFsRXJyb3IoZmFsc2UpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGZpbHRlcklkID09PSBcImRheXMtN1wiKSB7XHJcbiAgICAgICAgY29uc3Qgc3RhcnQgPSBuZXcgRGF0ZSh0b2RheSk7XHJcbiAgICAgICAgc3RhcnQuc2V0RGF0ZSh0b2RheS5nZXREYXRlKCkgLSA2KTtcclxuICAgICAgICBhcHBseVF1aWNrUmFuZ2UoZmlsdGVySWQsIHN0YXJ0LCB0b2RheSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoZmlsdGVySWQgPT09IFwiZGF5cy0zMFwiKSB7XHJcbiAgICAgICAgY29uc3Qgc3RhcnQgPSBuZXcgRGF0ZSh0b2RheSk7XHJcbiAgICAgICAgc3RhcnQuc2V0RGF0ZSh0b2RheS5nZXREYXRlKCkgLSAyOSk7XHJcbiAgICAgICAgYXBwbHlRdWlja1JhbmdlKGZpbHRlcklkLCBzdGFydCwgdG9kYXkpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGZpbHRlcklkID09PSBcImRheXMtOTBcIikge1xyXG4gICAgICAgIGNvbnN0IHN0YXJ0ID0gbmV3IERhdGUodG9kYXkpO1xyXG4gICAgICAgIHN0YXJ0LnNldERhdGUodG9kYXkuZ2V0RGF0ZSgpIC0gODkpO1xyXG4gICAgICAgIGFwcGx5UXVpY2tSYW5nZShmaWx0ZXJJZCwgc3RhcnQsIHRvZGF5KTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFthcHBseVF1aWNrUmFuZ2UsIGVuZERhdGUsIG1hbnVhbEVuZERhdGUsIG1hbnVhbFN0YXJ0RGF0ZSwgc2hvd01hbnVhbFBpY2tlclBhbmVsLCBzdGFydERhdGUsIHN0YXJ0T2ZEYXldXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQ2xpZW50U2VsZWN0ZWQgPSB1c2VDYWxsYmFjaygoY2xpZW50OiBDbGllbnRPcHRpb24gfCBudWxsKSA9PiB7XHJcbiAgICBzZXRTZWxlY3RlZENsaWVudChjbGllbnQpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHN0YXJ0RGF0ZSxcclxuICAgIGVuZERhdGUsXHJcbiAgICBtYW51YWxTdGFydERhdGUsXHJcbiAgICBtYW51YWxFbmREYXRlLFxyXG4gICAgaG92ZXJEYXRlLFxyXG4gICAgc2VsZWN0aW5nU3RlcCxcclxuICAgIGN1cnJlbnRNb250aCxcclxuICAgIGN1cnJlbnRZZWFyLFxyXG4gICAgaXNPcGVuLFxyXG4gICAgc2hvd01hbnVhbFBpY2tlclBhbmVsLFxyXG4gICAgYWN0aXZlUXVpY2tGaWx0ZXIsXHJcbiAgICBzZWxlY3RlZENsaWVudCxcbiAgICBzZWxlY3RlZE93bmVyQXhVc2VySWQsXG4gICAgY2xpZW50UmVzZXRLZXksXG4gICAgc2hvd0ZpbHRlcnMsXHJcbiAgICBzaG93TWFudWFsRXJyb3IsXHJcbiAgICBmcm9tRGF0ZVZhbHVlLFxyXG4gICAgdG9EYXRlVmFsdWUsXHJcbiAgICBhY2NvdW50TnVtVmFsdWUsXHJcbiAgICBoYXNSZXN0b3JlZEZpbHRlclJlZixcclxuICAgIGRpZEluaXRGaWx0ZXJSZWYsXHJcbiAgICBzZXRTdGFydERhdGUsXHJcbiAgICBzZXRFbmREYXRlLFxyXG4gICAgc2V0TWFudWFsU3RhcnREYXRlLFxyXG4gICAgc2V0TWFudWFsRW5kRGF0ZSxcclxuICAgIHNldEhvdmVyRGF0ZSxcclxuICAgIHNldFNlbGVjdGluZ1N0ZXAsXHJcbiAgICBzZXRDdXJyZW50TW9udGgsXHJcbiAgICBzZXRDdXJyZW50WWVhcixcclxuICAgIHNldElzT3BlbixcclxuICAgIHNldFNob3dNYW51YWxQaWNrZXJQYW5lbCxcclxuICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyLFxyXG4gICAgc2V0U2VsZWN0ZWRDbGllbnQsXG4gICAgc2V0U2VsZWN0ZWRPd25lckF4VXNlcklkLFxuICAgIHNldENsaWVudFJlc2V0S2V5LFxuICAgIHNldFNob3dGaWx0ZXJzLFxyXG4gICAgc2V0U2hvd01hbnVhbEVycm9yLFxyXG4gICAgdmFsaWRhdGVNYW51YWxSYW5nZSxcclxuICAgIGFwcGx5RGVmYXVsdFJhbmdlRnJvbVByb3BzLFxyXG4gICAgcmVzZXRIaXN0b3J5RmlsdGVycyxcclxuICAgIGFwcGx5Q2FjaGVkRmlsdGVyLFxyXG4gICAgaGFuZGxlU2VsZWN0LFxyXG4gICAgaGFuZGxlQ2xlYXJTdGF0ZSxcclxuICAgIG9wZW5Qb3BvdmVyLFxyXG4gICAgaGFuZGxlQWN0aXZhdG9yS2V5RG93bixcclxuICAgIGhhbmRsZVNlY3Rpb25LZXlEb3duLFxyXG4gICAgaGFuZGxlUXVpY2tGaWx0ZXIsXHJcbiAgICBoYW5kbGVDbGllbnRTZWxlY3RlZCxcclxuICB9O1xyXG59O1xyXG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUFBLGlCQUF1Qzs7O0FDeUNqQztBQXJCTixJQUFNLDBCQUEwQixDQUFDO0FBQUEsRUFDL0I7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRixNQUFhO0FBQ1gsUUFBTSxrQkFBa0IsTUFBTSxTQUFTO0FBQ3ZDLFFBQU0sV0FBVyxXQUFXLENBQUM7QUFDN0IsUUFBTSxxQkFBcUIsTUFBTSxLQUFLLENBQUMsU0FBUyxLQUFLLFNBQVMsWUFBWSxNQUFNLHNCQUFzQixZQUFZLENBQUM7QUFDbkgsUUFBTSxjQUFjLG1CQUFtQixxQkFBcUIsd0JBQXdCO0FBQ3BGLFFBQU0sb0JBQW9CLE9BQU8sd0JBQXdCLEVBQUUsRUFBRSxLQUFLLEtBQUs7QUFDdkUsUUFBTSxhQUFhLFVBQVUsZUFBZTtBQUU1QyxTQUNFLDZDQUFDLFNBQUksV0FBVSxhQUNiO0FBQUEsZ0RBQUMsV0FBTSxXQUFVLFdBQVUsU0FBUSx5QkFDaEMsaUJBQ0g7QUFBQSxJQUNBLDZDQUFDLFNBQUksV0FBVSxZQUNiO0FBQUE7QUFBQSxRQUFDO0FBQUE7QUFBQSxVQUNDLElBQUc7QUFBQSxVQUNILFdBQVc7QUFBQSxZQUNUO0FBQUEsWUFDQSxXQUFXLHNDQUFzQztBQUFBLFVBQ25EO0FBQUEsVUFDQSxPQUFPLGtCQUFrQixjQUFjO0FBQUEsVUFDdkMsVUFBVSxDQUFDLFVBQVUsU0FBUyxNQUFNLE9BQU8sS0FBSztBQUFBLFVBQ2hEO0FBQUEsVUFDQSxjQUFZO0FBQUEsVUFDWixhQUFXO0FBQUEsVUFFViw0QkFDQyw0RUFDRTtBQUFBLHdEQUFDLFlBQU8sT0FBTSxJQUFJLG9CQUFTO0FBQUEsWUFDMUIsTUFBTSxJQUFJLENBQUMsU0FDViw0Q0FBQyxZQUEyQixPQUFPLEtBQUssVUFDckMsc0NBQTRCLElBQUksS0FEdEIsS0FBSyxRQUVsQixDQUNEO0FBQUEsYUFDSCxJQUVBLDRDQUFDLFlBQU8sT0FBTyxtQkFBb0IsNkJBQWtCO0FBQUE7QUFBQSxNQUV6RDtBQUFBLE1BQ0EsNENBQUMsVUFBSyxXQUFVLHdGQUNiLG9CQUFVLDRDQUFDLG1CQUFRLE1BQUssV0FBVSxPQUFPLGNBQWMsSUFBSyw0Q0FBQyxrQkFBZSxXQUFVLFdBQVUsR0FDbkc7QUFBQSxPQUNGO0FBQUEsSUFDQyxjQUNDLDRDQUFDLFNBQUksV0FBVSwyQkFDYixzREFBQyxVQUFLLFdBQVcsV0FBVyxxQkFBcUIsZUFBZSxtQkFBbUIsZ0JBQWdCLEdBQUksc0JBQVcsR0FDcEg7QUFBQSxLQUVKO0FBRUo7QUFFQSxJQUFPLGtDQUFROzs7QUM2REQsSUFBQUMsc0JBQUE7QUFuRWQsSUFBTSxxQkFBcUIsQ0FBQztBQUFBLEVBQzFCO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0YsTUFBYTtBQUNYLFNBQ0UsNkNBQUMsU0FBSSxXQUFVLDJEQUNiLHdEQUFDLFNBQUksV0FBVSxnREFDYjtBQUFBLGlEQUFDLFNBQUksV0FBVSxnREFBK0MsY0FBWSxhQUN2RSx1QkFBYSxJQUFJLENBQUMsU0FBUztBQUMxQixZQUFNLFdBQVcsc0JBQXNCLEtBQUs7QUFDNUMsYUFDRTtBQUFBLFFBQUM7QUFBQTtBQUFBLFVBRUMsT0FBTyxLQUFLO0FBQUEsVUFDWixRQUFRO0FBQUEsVUFDUixXQUFVO0FBQUEsVUFDVixTQUFTLE1BQU0sY0FBYyxLQUFLLEVBQUU7QUFBQTtBQUFBLFFBSi9CLEtBQUs7QUFBQSxNQUtaO0FBQUEsSUFFSixDQUFDLEdBQ0g7QUFBQSxJQUVDLHFCQUNDO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQztBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQSxXQUFXLENBQUMsQ0FBQztBQUFBLFFBQ2IsV0FBVTtBQUFBO0FBQUEsSUFDWjtBQUFBLElBR0Qsb0JBQ0M7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0EsU0FBUztBQUFBLFFBQ1Q7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUE7QUFBQSxJQUNGO0FBQUEsSUFHRjtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0MsT0FBTztBQUFBLFFBQ1A7QUFBQSxRQUNBO0FBQUEsUUFDQSxTQUFTO0FBQUEsUUFDVCxjQUFjO0FBQUEsUUFDZCxPQUFPO0FBQUEsUUFDUCxVQUFVO0FBQUEsUUFDVixjQUFjO0FBQUEsUUFDZCxjQUFjO0FBQUEsUUFDZCxVQUFVO0FBQUE7QUFBQSxJQUNaO0FBQUEsSUFFQTtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBRUMsT0FBTztBQUFBLFFBQ1AsWUFBWTtBQUFBLFFBQ1osT0FBTztBQUFBLFFBQ1AsYUFBYTtBQUFBLFFBQ2IsU0FBUTtBQUFBLFFBQ1IsV0FBVztBQUFBLFFBQ1gsUUFBTztBQUFBLFFBQ1AsaUJBQWdCO0FBQUE7QUFBQSxNQVJYO0FBQUEsSUFTUDtBQUFBLElBRUMscUJBQ0MsOENBQUMsU0FBSSxXQUFVLHNEQUNiO0FBQUEsbURBQUMsd0JBQWEsT0FBTyxZQUFZLFdBQVUsVUFBUyxTQUFTLGdCQUFnQjtBQUFBLE1BQzdFLDZDQUFDLHdCQUFhLE9BQU8sWUFBWSxXQUFVLFVBQVMsU0FBUyxnQkFBZ0I7QUFBQSxPQUMvRTtBQUFBLEtBRUosR0FDRjtBQUVKO0FBRUEsSUFBTyw2QkFBUTs7O0FDOU9mLG1CQUEyQztBQWdJdkMsSUFBQUMsc0JBQUE7QUFuR0osSUFBTSxjQUFjO0FBQ3BCLElBQU0scUJBQXFCO0FBWTNCLElBQU0sZUFBZSxDQUFDLEVBQUUsT0FBTyxZQUFZLGNBQWMsV0FBVyxNQUFhO0FBQy9FLFFBQU0sbUJBQWUscUJBQThCLElBQUk7QUFDdkQsUUFBTSxrQkFBYyxxQkFBc0I7QUFBQSxJQUN4QyxRQUFRO0FBQUEsSUFDUixXQUFXO0FBQUEsSUFDWCxRQUFRO0FBQUEsSUFDUixRQUFRO0FBQUEsSUFDUixXQUFXO0FBQUEsSUFDWCxPQUFPO0FBQUEsSUFDUCxRQUFRO0FBQUEsRUFDVixDQUFDO0FBRUQsUUFBTSwyQkFBdUIsMEJBQVksQ0FBQyxXQUErQjtBQUN2RSxVQUFNLE9BQU87QUFDYixRQUFJLENBQUMsUUFBUSxPQUFPLEtBQUssWUFBWSxXQUFZLFFBQU87QUFDeEQsVUFBTSxPQUFPLEtBQUssUUFBcUIseUNBQXlDO0FBQ2hGLFFBQUksQ0FBQyxLQUFNLFFBQU87QUFDbEIsUUFBSSxDQUFDLGFBQWEsU0FBUyxTQUFTLElBQUksRUFBRyxRQUFPO0FBQ2xELFdBQU87QUFBQSxFQUNULEdBQUcsQ0FBQyxDQUFDO0FBRUwsUUFBTSxvQkFBZ0IsMEJBQVksTUFBTTtBQUN0QyxnQkFBWSxRQUFRLFNBQVM7QUFDN0IsZ0JBQVksUUFBUSxZQUFZO0FBQ2hDLGdCQUFZLFFBQVEsUUFBUTtBQUM1QixnQkFBWSxRQUFRLFNBQVM7QUFBQSxFQUMvQixHQUFHLENBQUMsQ0FBQztBQUVMLFFBQU0sd0JBQW9CO0FBQUEsSUFDeEIsQ0FBQyxVQUE4QztBQUM3QyxVQUFJLE1BQU0sZ0JBQWdCLFdBQVcsTUFBTSxXQUFXLEVBQUc7QUFDekQsWUFBTSxPQUFPLHFCQUFxQixNQUFNLE1BQU07QUFDOUMsVUFBSSxDQUFDLEtBQU07QUFDWCxZQUFNLFNBQVMsS0FBSyxRQUFRLFVBQVU7QUFDdEMsVUFBSSxDQUFDLE9BQVE7QUFFYixrQkFBWSxRQUFRLFNBQVM7QUFDN0Isa0JBQVksUUFBUSxZQUFZLE1BQU07QUFDdEMsa0JBQVksUUFBUSxTQUFTLE1BQU07QUFDbkMsa0JBQVksUUFBUSxTQUFTLE1BQU07QUFDbkMsa0JBQVksUUFBUSxZQUFZLEtBQUssSUFBSTtBQUN6QyxrQkFBWSxRQUFRLFFBQVE7QUFDNUIsa0JBQVksUUFBUSxTQUFTO0FBQUEsSUFDL0I7QUFBQSxJQUNBLENBQUMsb0JBQW9CO0FBQUEsRUFDdkI7QUFFQSxRQUFNLHdCQUFvQiwwQkFBWSxDQUFDLFVBQThDO0FBQ25GLFVBQU0sUUFBUSxZQUFZO0FBQzFCLFFBQUksQ0FBQyxNQUFNLFVBQVUsTUFBTSxjQUFjLE1BQU0sVUFBVztBQUMxRCxVQUFNLEtBQUssS0FBSyxJQUFJLE1BQU0sVUFBVSxNQUFNLE1BQU07QUFDaEQsVUFBTSxLQUFLLEtBQUssSUFBSSxNQUFNLFVBQVUsTUFBTSxNQUFNO0FBQ2hELFFBQUksS0FBSyxlQUFlLEtBQUssYUFBYTtBQUN4QyxZQUFNLFFBQVE7QUFBQSxJQUNoQjtBQUFBLEVBQ0YsR0FBRyxDQUFDLENBQUM7QUFFTCxRQUFNLHNCQUFrQjtBQUFBLElBQ3RCLENBQUMsVUFBOEM7QUFDN0MsWUFBTSxRQUFRLFlBQVk7QUFDMUIsVUFBSSxDQUFDLE1BQU0sVUFBVSxNQUFNLGNBQWMsTUFBTSxVQUFXO0FBQzFELFlBQU0sU0FBUyxNQUFNO0FBQ3JCLFlBQU0sU0FBUyxLQUFLLElBQUksSUFBSSxNQUFNO0FBQ2xDLFlBQU0sWUFBWSxDQUFDLE1BQU0sU0FBUyxTQUFTO0FBQzNDLG9CQUFjO0FBQ2QsVUFBSSxhQUFhLFFBQVE7QUFDdkIsbUJBQVcsTUFBTTtBQUFBLE1BQ25CO0FBQUEsSUFDRjtBQUFBLElBQ0EsQ0FBQyxZQUFZLGFBQWE7QUFBQSxFQUM1QjtBQUVBLFFBQU0sMkJBQXVCO0FBQUEsSUFDM0IsQ0FBQyxVQUFtRjtBQUNsRixVQUFJLENBQUMscUJBQXFCLE1BQU0sTUFBTSxFQUFHO0FBQ3pDLFlBQU0sZUFBZTtBQUFBLElBQ3ZCO0FBQUEsSUFDQSxDQUFDLG9CQUFvQjtBQUFBLEVBQ3ZCO0FBRUEseUJBQXVCLEVBQUUsY0FBYyxjQUFjLE9BQU8scUJBQXFCLENBQUM7QUFFbEYsUUFBTSxXQUFXLE1BQU0sU0FBUztBQUNoQyxRQUFNLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQztBQUVwQyxRQUFNLFVBQVUsZUFDZCw2Q0FBQyxTQUFJLFdBQVUsZUFBZSx3QkFBYSxJQUN6QyxXQUNGLE1BQU0sSUFBSSxDQUFDLE1BQU0sVUFBVTtBQUN6QixVQUFNLE1BQU0sS0FBSyxNQUFNLEtBQUssT0FBTyxTQUFTLEtBQUssWUFBWSxLQUFLO0FBQ2xFLFVBQU0sY0FBYyxDQUFDLEtBQUssWUFBWSxDQUFDLENBQUMsS0FBSztBQUM3QyxXQUNFLDZDQUFDLFNBQWMsV0FBVSxpQkFDdkI7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLFdBQVc7QUFBQSxVQUNUO0FBQUEsVUFDQSxLQUFLLFdBQVcsMEJBQTBCO0FBQUEsVUFDMUMsY0FBYyw2QkFBNkI7QUFBQSxRQUM3QztBQUFBLFFBQ0Esb0JBQWtCLEtBQUssZUFBZTtBQUFBLFFBQ3RDLGNBQVksS0FBSyxTQUFTLE9BQU8sT0FBTyxLQUFLLEtBQUssSUFBSTtBQUFBLFFBQ3RELGdCQUFjLGNBQWMsS0FBSyxLQUFLO0FBQUEsUUFDdEMsTUFBTSxjQUFjLFdBQVc7QUFBQSxRQUMvQixVQUFVLGNBQWMsSUFBSTtBQUFBLFFBQzVCLGNBQVksY0FBZSxLQUFLLFlBQVksS0FBSyxRQUFRLGFBQWM7QUFBQSxRQUN2RSxXQUFXLGNBQ1AsQ0FBQyxVQUFVO0FBQ1gsY0FBSSxNQUFNLFFBQVEsV0FBVyxNQUFNLFFBQVEsS0FBSztBQUM5QyxrQkFBTSxlQUFlO0FBQ3JCLHVCQUFXLEtBQUssRUFBRTtBQUFBLFVBQ3BCO0FBQUEsUUFDRixJQUNFO0FBQUEsUUFFSjtBQUFBLHdEQUFDLFNBQUksV0FBVSxzSUFDYjtBQUFBLHlEQUFDLFNBQUksV0FBVSx5REFBeUQsZUFBSyxVQUFVLE1BQUs7QUFBQSxZQUM1Riw2Q0FBQyxTQUFJLFdBQVUsbUVBQW1FLGVBQUssVUFBVSxPQUFNO0FBQUEsWUFDdkcsNkNBQUMsU0FBSSxXQUFVLHVDQUF1QyxlQUFLLFVBQVUsS0FBSTtBQUFBLGFBQzNFO0FBQUEsVUFDQSw4Q0FBQyxTQUFJLFdBQVUsMkNBQ2I7QUFBQSx5REFBQyxTQUFJLFdBQVUsaUJBQWdCLGlCQUFlLEtBQUssWUFBWSxLQUFLLE1BQU8sZUFBSyxNQUFLO0FBQUEsWUFDckYsNkNBQUMsT0FBRSxXQUFVLHNCQUFxQixpQkFBZSxLQUFLLFlBQVksS0FBSyxhQUFjLGVBQUssZUFBZSxZQUFXO0FBQUEsYUFDdEg7QUFBQTtBQUFBO0FBQUEsSUFDRixLQS9CUSxHQWdDVjtBQUFBLEVBRUosQ0FBQyxJQUNDO0FBRUosU0FDRTtBQUFBLElBQUM7QUFBQTtBQUFBLE1BQ0MsSUFBRztBQUFBLE1BQ0gsS0FBSztBQUFBLE1BQ0wsV0FBVyxXQUFXLGdCQUFnQixZQUFZLG1CQUFtQixFQUFFO0FBQUEsTUFDdkUsbUJBQWlCO0FBQUEsTUFDakIsc0JBQXNCO0FBQUEsTUFDdEIsc0JBQXNCO0FBQUEsTUFDdEIsb0JBQW9CO0FBQUEsTUFDcEIsd0JBQXdCO0FBQUEsTUFDeEIsZ0JBQWdCO0FBQUEsTUFDaEIsc0JBQXNCO0FBQUEsTUFDdEIsZUFBZTtBQUFBLE1BQ2YsY0FBYztBQUFBLE1BQ2QsZ0JBQWdCO0FBQUEsTUFFZjtBQUFBO0FBQUEsRUFDSDtBQUVKO0FBRUEsSUFBTSx1QkFBdUIsYUFBQUMsUUFBTSxLQUFLLFlBQVk7QUFDcEQscUJBQXFCLGNBQWM7QUFFbkMsSUFBTyx1QkFBUTs7O0FDeEpULElBQUFDLHNCQUFBO0FBaEJOLElBQU0sd0JBQXdCLENBQUM7QUFBQSxFQUM3QjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0YsTUFBYTtBQUNYLFNBQ0UsOEVBQ0U7QUFBQTtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0MsSUFBRztBQUFBLFFBQ0gsV0FBVTtBQUFBLFFBQ1YsT0FBTyxFQUFFLFNBQVMsWUFBWSxTQUFTLE9BQU87QUFBQSxRQUU5QztBQUFBLHVEQUFDLFNBQUksV0FBVSxzQkFBcUIsU0FBUSxhQUFZLE1BQUssVUFBUyxjQUFZLGNBQ2hGLHVEQUFDLFlBQU8sV0FBVSx1QkFBc0IsSUFBRyxNQUFLLElBQUcsTUFBSyxHQUFFLEtBQUksYUFBWSxLQUFJLEdBQ2hGO0FBQUEsVUFDQztBQUFBO0FBQUE7QUFBQSxJQUNIO0FBQUEsSUFFQyxlQUNDLDhFQUNFO0FBQUE7QUFBQSxRQUFDO0FBQUE7QUFBQSxVQUNDLE9BQU87QUFBQSxVQUNQO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQTtBQUFBLE1BQ0Y7QUFBQSxNQUVBO0FBQUEsUUFBQztBQUFBO0FBQUEsVUFDQztBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQSxTQUFTO0FBQUEsVUFDVDtBQUFBLFVBQ0EsUUFBUTtBQUFBO0FBQUEsTUFDVjtBQUFBLE9BQ0Y7QUFBQSxLQUVKO0FBRUo7QUFFQSxJQUFPLGdDQUFROzs7QUM3RWYsSUFBQUMsZ0JBQTZHO0FBNEI3RyxJQUFNLFVBQVUsQ0FBQyxHQUFnQixNQUFtQixDQUFDLEVBQUUsS0FBSyxLQUFLLEVBQUUsUUFBUSxNQUFNLEVBQUUsUUFBUTtBQUdwRixJQUFNLDJCQUEyQixDQUFDO0FBQUEsRUFDdkM7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQSxZQUFBQztBQUFBLEVBQ0EsT0FBQUM7QUFBQSxFQUNBLFVBQUFDO0FBQUEsRUFDQSxrQkFBQUM7QUFDRixNQUFZO0FBQ1YsUUFBTSxlQUFXLHVCQUFRLE1BQU07QUFDN0IsVUFBTSxXQUFXLElBQUksS0FBSyxhQUFhLGNBQWMsQ0FBQztBQUN0RCxVQUFNLGNBQWMsSUFBSSxLQUFLLGFBQWEsZUFBZSxHQUFHLENBQUMsRUFBRSxRQUFRO0FBQ3ZFLFVBQU0sVUFBVSxTQUFTLE9BQU8sSUFBSSxLQUFLO0FBQ3pDLFVBQU0sUUFBd0IsQ0FBQztBQUMvQixhQUFTLElBQUksR0FBRyxJQUFJLFFBQVEsS0FBSztBQUMvQixZQUFNLEtBQUssRUFBRSxNQUFNLE1BQU0sS0FBSyxJQUFJLFNBQVMsS0FBSyxDQUFDO0FBQUEsSUFDbkQ7QUFDQSxhQUFTLElBQUksR0FBRyxLQUFLLGFBQWEsS0FBSztBQUNyQyxZQUFNLFVBQVUsSUFBSSxLQUFLLGFBQWEsY0FBYyxDQUFDO0FBQ3JELFlBQU0sS0FBSyxFQUFFLE1BQU0sU0FBUyxLQUFLRixPQUFNLE9BQU8sR0FBRyxTQUFTLE1BQU0sQ0FBQztBQUFBLElBQ25FO0FBQ0EsV0FBTztBQUFBLE1BQ0w7QUFBQSxNQUNBLE9BQU9FLGtCQUFpQixVQUFVLE1BQU07QUFBQSxJQUMxQztBQUFBLEVBQ0YsR0FBRyxDQUFDLGNBQWMsYUFBYUEsbUJBQWtCLFFBQVFGLE1BQUssQ0FBQztBQUUvRCxRQUFNLGFBQWEsWUFBWSxrQkFBa0IsUUFBUSxZQUFZO0FBRXJFLFFBQU0sc0JBQWtCO0FBQUEsSUFDdEIsQ0FBQyxVQUE4QztBQUM3QyxZQUFNLGdCQUFnQjtBQUN0QixzQkFBZ0IsQ0FBQyxTQUFTO0FBQ3hCLGNBQU0sT0FBTyxPQUFPO0FBQ3BCLFlBQUksT0FBTyxHQUFHO0FBQ1oseUJBQWUsQ0FBQyxTQUFTLE9BQU8sQ0FBQztBQUNqQyxpQkFBTztBQUFBLFFBQ1Q7QUFDQSxlQUFPO0FBQUEsTUFDVCxDQUFDO0FBQUEsSUFDSDtBQUFBLElBQ0EsQ0FBQyxpQkFBaUIsY0FBYztBQUFBLEVBQ2xDO0FBRUEsUUFBTSxzQkFBa0I7QUFBQSxJQUN0QixDQUFDLFVBQThDO0FBQzdDLFlBQU0sZ0JBQWdCO0FBQ3RCLHNCQUFnQixDQUFDLFNBQVM7QUFDeEIsY0FBTSxPQUFPLE9BQU87QUFDcEIsWUFBSSxPQUFPLElBQUk7QUFDYix5QkFBZSxDQUFDLFNBQVMsT0FBTyxDQUFDO0FBQ2pDLGlCQUFPO0FBQUEsUUFDVDtBQUNBLGVBQU87QUFBQSxNQUNULENBQUM7QUFBQSxJQUNIO0FBQUEsSUFDQSxDQUFDLGlCQUFpQixjQUFjO0FBQUEsRUFDbEM7QUFFQSxRQUFNLDJCQUF1QiwyQkFBWSxNQUFNO0FBQzdDLGlCQUFhLElBQUk7QUFBQSxFQUNuQixHQUFHLENBQUMsWUFBWSxDQUFDO0FBRWpCLFFBQU0sMkJBQXVCO0FBQUEsSUFDM0IsQ0FBQyxTQUErQjtBQUM5QixVQUFJLENBQUMsS0FBSyxLQUFNO0FBQ2hCLE1BQUFELFlBQVcsWUFBWSxFQUFFLE1BQU0sS0FBSyxPQUFPLElBQUksVUFBVSxDQUFDLENBQUMsS0FBSyxTQUFTLENBQUM7QUFDMUUsbUJBQWEsS0FBSyxJQUFJO0FBQUEsSUFDeEI7QUFBQSxJQUNBLENBQUMsY0FBY0EsV0FBVTtBQUFBLEVBQzNCO0FBRUEsUUFBTSwyQkFBdUI7QUFBQSxJQUMzQixDQUFDLFNBQStCO0FBQzlCLFVBQUksQ0FBQyxLQUFLLEtBQU07QUFDaEIsVUFBSSxrQkFBa0IsU0FBUyxXQUFXO0FBQ3hDLHFCQUFhLElBQUksS0FBSyxLQUFLLElBQUksQ0FBQztBQUFBLE1BQ2xDO0FBQUEsSUFDRjtBQUFBLElBQ0EsQ0FBQyxlQUFlLGNBQWMsU0FBUztBQUFBLEVBQ3pDO0FBRUEsUUFBTSxxQkFBaUIsdUJBQWdDLE1BQU07QUFDM0QsV0FBTyxTQUFTLE1BQU0sSUFBSSxDQUFDLE1BQU0sUUFBUTtBQUN2QyxVQUFJLEtBQUssU0FBUztBQUNoQixlQUFPLEVBQUUsS0FBSyxTQUFTLEdBQUcsSUFBSSxTQUFTLEtBQUs7QUFBQSxNQUM5QztBQUVBLFlBQU0sVUFBVSxLQUFLO0FBQ3JCLFlBQU0sVUFBVSxRQUFRLFNBQVMsU0FBUztBQUMxQyxZQUFNLFFBQVEsUUFBUSxTQUFTLE9BQU87QUFDdEMsWUFBTSxVQUFVLGFBQWEsY0FBY0UsVUFBUyxXQUFXLE9BQU8sS0FBS0EsVUFBUyxTQUFTLFVBQVU7QUFDdkcsWUFBTSxhQUFhLGFBQWEsQ0FBQyxXQUFXLGFBQWFBLFVBQVMsV0FBVyxPQUFPLEtBQUtBLFVBQVMsU0FBUyxTQUFTO0FBQ3BILFlBQU0sV0FBVyxrQkFBa0IsU0FBUyxDQUFDLENBQUMsYUFBYUEsVUFBUyxTQUFTLFNBQVM7QUFDdEYsWUFBTSxVQUFVLFFBQVEsU0FBUyxvQkFBSSxLQUFLLENBQUM7QUFFM0MsWUFBTSxXQUFXO0FBQUEsUUFDZjtBQUFBLFFBQ0EsVUFBVSxzQkFBc0I7QUFBQSxRQUNoQyxRQUFRLGtCQUFrQjtBQUFBLFFBQzFCLFVBQVUsYUFBYTtBQUFBLFFBQ3ZCLGFBQWEsZ0JBQWdCO0FBQUEsUUFDN0IsV0FBVyxhQUFhO0FBQUEsUUFDeEIsVUFBVSxVQUFVO0FBQUEsTUFDdEI7QUFFQSxhQUFPO0FBQUEsUUFDTCxLQUFLLEtBQUs7QUFBQSxRQUNWLFNBQVM7QUFBQSxRQUNULE1BQU07QUFBQSxRQUNOLEtBQUssS0FBSztBQUFBLFFBQ1YsVUFBVSxRQUFRLFFBQVE7QUFBQSxRQUMxQjtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSCxHQUFHLENBQUMsU0FBUyxPQUFPLFNBQVMsV0FBV0EsV0FBVSxZQUFZLGVBQWUsU0FBUyxDQUFDO0FBRXZGLFNBQU87QUFBQSxJQUNMLGVBQWUsU0FBUztBQUFBLElBQ3hCO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQ0Y7OztBQ3RLQSxJQUFBRSxnQkFBb0c7QUFrQzdGLElBQU0sMEJBQTBCLENBQUM7QUFBQSxFQUN0QztBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBLGdCQUFBQztBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0YsTUFBWTtBQUNWLFFBQU0sbUJBQWU7QUFBQSxJQUNuQixDQUFDLFlBQTJCO0FBQzFCLFVBQUksQ0FBQyxvQkFBb0IsRUFBRztBQUM1QixVQUFJLENBQUMsYUFBYSxDQUFDLFFBQVM7QUFFNUIsWUFBTSxhQUFhQSxnQkFBZSxlQUFlLFdBQVc7QUFDNUQsWUFBTSxPQUFPLFNBQVMsUUFBUTtBQUM5QixZQUFNLFlBQVksR0FBRyxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsSUFBSSxlQUFlLElBQUksa0JBQWtCLElBQUksSUFBSTtBQUV0RyxVQUFJLFNBQVMsU0FBUyxpQkFBaUIsWUFBWSxXQUFXO0FBQzVELHVCQUFlLE1BQU07QUFBQSxVQUNuQixVQUFVLFdBQVc7QUFBQSxVQUNyQixRQUFRLFdBQVc7QUFBQSxVQUNuQixZQUFZO0FBQUEsVUFDWixlQUFlO0FBQUEsUUFDakIsQ0FBQztBQUFBLE1BQ0g7QUFFQSx5QkFBbUIsS0FBSztBQUN4QixVQUFJLFNBQVMsWUFBWTtBQUN2QixrQkFBVSxLQUFLO0FBQ2YsdUJBQWUsS0FBSztBQUFBLE1BQ3RCO0FBQUEsSUFDRjtBQUFBLElBQ0E7QUFBQSxNQUNFO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBQTtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBRUEsUUFBTSxrQkFBYztBQUFBLElBQ2xCLENBQUMsVUFBMkI7QUFDMUIsdUJBQWlCLEtBQUs7QUFDdEIsdUJBQWlCO0FBQ2pCLHNCQUFnQjtBQUFBLElBQ2xCO0FBQUEsSUFDQSxDQUFDLGtCQUFrQixrQkFBa0IsZUFBZTtBQUFBLEVBQ3REO0FBRUEsUUFBTSx5QkFBcUIsMkJBQVksTUFBTTtBQUMzQyx3QkFBb0I7QUFDcEIscUJBQWlCO0FBQ2pCLG9CQUFnQjtBQUNoQixjQUFVLEtBQUs7QUFDZixtQkFBZSxJQUFJO0FBQUEsRUFDckIsR0FBRyxDQUFDLGtCQUFrQixpQkFBaUIscUJBQXFCLFdBQVcsY0FBYyxDQUFDO0FBRXRGLFNBQU87QUFBQSxJQUNMO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQ0Y7OztBQ3BIQSxJQUFBQyxnQkFBOEQ7QUE0QnZELElBQU0sd0JBQXdCLENBQUM7QUFBQSxFQUNwQztBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQSxZQUFBQztBQUNGLE1BQVk7QUFDViwrQkFBVSxNQUFNO0FBQ2QsSUFBQUEsWUFBVyxRQUFRLEVBQUUsaUJBQWlCLGNBQWMsQ0FBQztBQUFBLEVBQ3ZELEdBQUcsQ0FBQyxpQkFBaUIsZUFBZUEsV0FBVSxDQUFDO0FBRS9DLCtCQUFVLE1BQU07QUFDZCxRQUFJLGlCQUFpQixRQUFTO0FBQzlCLHFCQUFpQixVQUFVO0FBQzNCLFVBQU0sU0FBUyxrQkFBa0IsSUFBSSxpQkFBaUIsSUFBSTtBQUMxRCxRQUFJLFVBQVUsT0FBTyxZQUFZLE9BQU8sUUFBUTtBQUM5QyxNQUFBQSxZQUFXLGlCQUFpQixNQUFNO0FBQ2xDLFlBQU0sZ0JBQWdCLGtCQUFrQixNQUFNO0FBQzlDLFVBQUksZUFBZTtBQUNqQiwrQkFBdUIsVUFBVTtBQUNqQyx1QkFBZSxjQUFjLE1BQU0sY0FBYyxRQUFRO0FBQ3pELHVCQUFlLEtBQUs7QUFDcEIsa0JBQVUsS0FBSztBQUNmLDZCQUFxQixVQUFVO0FBQy9CO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFFQSxVQUFNLGlCQUFpQiwyQkFBMkI7QUFDbEQsUUFBSSxnQkFBZ0I7QUFDbEIsNkJBQXVCLFVBQVU7QUFDakMscUJBQWUsZUFBZSxNQUFNLGVBQWUsUUFBUTtBQUMzRCxxQkFBZSxLQUFLO0FBQ3BCLGdCQUFVLEtBQUs7QUFDZiwyQkFBcUIsVUFBVTtBQUMvQjtBQUFBLElBQ0Y7QUFFQSx3QkFBb0I7QUFDcEIscUJBQWlCO0FBQ2pCLG9CQUFnQjtBQUNoQixtQkFBZSxJQUFJO0FBQ25CLGNBQVUsS0FBSztBQUFBLEVBQ2pCLEdBQUc7QUFBQSxJQUNEO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQUE7QUFBQSxFQUNGLENBQUM7QUFDSDs7O0FDbEdBLElBQUFDLGdCQUF3QjtBQUd4QixJQUFNLGlCQUFpQixDQUFDLE9BQWUsV0FBbUI7QUFDeEQsTUFBSSxDQUFDLE1BQU8sUUFBTztBQUNuQixRQUFNLFVBQVUsTUFBTSxLQUFLO0FBQzNCLE1BQUksQ0FBQyxRQUFTLFFBQU87QUFDckIsUUFBTSxRQUFRLFFBQVEsa0JBQWtCLE1BQU07QUFDOUMsU0FBTyxNQUFNLENBQUMsRUFBRSxrQkFBa0IsTUFBTSxJQUFJLE1BQU0sTUFBTSxDQUFDO0FBQzNEO0FBR08sSUFBTSxtQkFBbUIsQ0FBQyxXQUFtQjtBQUNsRCxRQUFNLFlBQVksZUFBZSxLQUFLLGdCQUFnQixNQUFNLEdBQUcsTUFBTTtBQUNyRSxRQUFNLFVBQVUsZUFBZSxLQUFLLGNBQWMsSUFBSSxHQUFHLE1BQU07QUFDL0QsUUFBTSxtQkFBbUIsS0FBSyx3QkFBd0IsTUFBTTtBQUM1RCxRQUFNLGtCQUFrQixLQUFLLHVCQUF1QixRQUFRO0FBQzVELFFBQU0sbUJBQW1CLEtBQUssd0JBQXdCLFNBQVM7QUFDL0QsUUFBTSxtQkFBbUIsS0FBSyx3QkFBd0IsU0FBUztBQUMvRCxRQUFNLGlCQUFpQixLQUFLLHNCQUFzQixPQUFPO0FBQ3pELFFBQU0sZ0JBQWdCLEtBQUsscUJBQXFCLFVBQVU7QUFDMUQsUUFBTSxnQkFBZ0IsS0FBSyxxQkFBcUIsTUFBTTtBQUN0RCxRQUFNLGdCQUFnQixLQUFLLHFCQUFxQixNQUFNO0FBRXRELFFBQU0sb0JBQWdCO0FBQUEsSUFDcEIsTUFBTTtBQUFBLE1BQ0osS0FBSyxtQkFBbUIsS0FBSztBQUFBLE1BQzdCLEtBQUssbUJBQW1CLEtBQUs7QUFBQSxNQUM3QixLQUFLLG1CQUFtQixLQUFLO0FBQUEsTUFDN0IsS0FBSyxtQkFBbUIsS0FBSztBQUFBLE1BQzdCLEtBQUssbUJBQW1CLEtBQUs7QUFBQSxNQUM3QixLQUFLLG1CQUFtQixLQUFLO0FBQUEsTUFDN0IsS0FBSyxtQkFBbUIsS0FBSztBQUFBLElBQy9CO0FBQUEsSUFDQSxDQUFDO0FBQUEsRUFDSDtBQUVBLFFBQU0sbUJBQWU7QUFBQSxJQUNuQixNQUFNO0FBQUEsTUFDSixFQUFFLElBQUksVUFBbUIsT0FBTyxpQkFBaUI7QUFBQSxNQUNqRCxFQUFFLElBQUksVUFBbUIsT0FBTyxnQkFBZ0I7QUFBQSxNQUNoRCxFQUFFLElBQUksV0FBb0IsT0FBTyxpQkFBaUI7QUFBQSxNQUNsRCxFQUFFLElBQUksV0FBb0IsT0FBTyxpQkFBaUI7QUFBQSxJQUNwRDtBQUFBLElBQ0EsQ0FBQyxrQkFBa0IsaUJBQWlCLGtCQUFrQixnQkFBZ0I7QUFBQSxFQUN4RTtBQUVBLFFBQU0sdUJBQW1CO0FBQUEsSUFDdkIsT0FBTztBQUFBLE1BQ0wsT0FBTztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLElBQ1I7QUFBQSxJQUNBLENBQUMsZ0JBQWdCLGVBQWUsZUFBZSxhQUFhO0FBQUEsRUFDOUQ7QUFFQSxTQUFPO0FBQUEsSUFDTDtBQUFBLElBQ0E7QUFBQSxJQUNBLGFBQWE7QUFBQSxJQUNiLFdBQVc7QUFBQSxJQUNYLGFBQWEsS0FBSyx1QkFBdUIsTUFBTTtBQUFBLElBQy9DLGNBQWMsS0FBSyxtQkFBbUIsVUFBVTtBQUFBLElBQ2hELGlCQUFpQixLQUFLLHNCQUFzQixhQUFhO0FBQUEsSUFDekQsZ0JBQWdCLEtBQUsscUJBQXFCLGdCQUFnQjtBQUFBLElBQzFELGdCQUFnQixLQUFLLHFCQUFxQixZQUFZO0FBQUEsSUFDdEQsd0JBQXdCLEtBQUssOEJBQThCLG1CQUFtQjtBQUFBLElBQzlFLHNCQUFzQixLQUFLLDRCQUE0QixpQkFBaUI7QUFBQSxJQUN4RSxZQUFZLEtBQUssd0JBQXdCLE9BQU87QUFBQSxJQUNoRCxZQUFZLEtBQUssd0JBQXdCLE9BQU87QUFBQSxJQUNoRCxhQUFhLEtBQUsseUJBQXlCLFNBQVM7QUFBQSxJQUNwRCxZQUFZLEtBQUssd0JBQXdCLE9BQU87QUFBQSxJQUNoRCxlQUFlLEtBQUssNEJBQTRCLHFCQUFxQjtBQUFBLElBQ3JFLG1CQUFtQixLQUFLLDZCQUE2QixrQkFBa0I7QUFBQSxJQUN2RSxtQkFBbUIsS0FBSyxnQ0FBZ0MsdUJBQXVCO0FBQUEsSUFDL0UsY0FBYyxLQUFLLG1CQUFtQixTQUFTO0FBQUEsSUFDL0Msc0JBQXNCLEtBQUsseUJBQXlCLHlCQUF5QjtBQUFBLElBQzdFLGFBQWEsS0FBSyxpQkFBaUIsUUFBUTtBQUFBLElBQzNDO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQ0Y7OztBQ25GQSxJQUFBQyxnQkFBNEI7QUFrQnJCLElBQU0sdUJBQXVCLENBQUM7QUFBQSxFQUNuQztBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUNGLE1BQVk7QUFDVixhQUFPO0FBQUEsSUFDTCxDQUFDLFdBQW1CO0FBQ2xCLFVBQUksQ0FBQyxnQkFBZ0I7QUFDbkIsb0JBQVk7QUFDWjtBQUFBLE1BQ0Y7QUFDQSxpQkFBVyxNQUFNO0FBQ2YseUJBQWlCO0FBQUEsVUFDZixVQUFVLGlCQUFpQjtBQUFBLFVBQzNCLFFBQVEsZUFBZTtBQUFBLFVBQ3ZCLE1BQU07QUFBQSxVQUNOLGVBQWUsZ0JBQWdCLFNBQVM7QUFBQSxVQUN4QyxZQUFZLGdCQUFnQixRQUFRO0FBQUEsVUFDcEM7QUFBQSxVQUNBO0FBQUEsUUFDRixDQUFDO0FBQ0QsY0FBTSxTQUFTLG1CQUFtQixNQUFNO0FBQ3hDLGVBQU8sU0FBUyxPQUFPLG9CQUFvQixNQUFNO0FBQUEsTUFDbkQsR0FBRyxVQUFVO0FBQUEsSUFDZjtBQUFBLElBQ0E7QUFBQSxNQUNFO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRjs7O0FDL0RDLElBQUFDLGdCQUFpQztBQXdCM0IsSUFBTSwwQkFBMEIsQ0FBQztBQUFBLEVBQ3RDO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBLFlBQUFDO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRixNQUFtQztBQUNqQywrQkFBVSxNQUFNO0FBQ2QsOEJBQTBCLHNCQUFzQjtBQUFBLEVBQ2xELEdBQUcsQ0FBQyxDQUFDO0FBR0wsK0JBQVUsTUFBTTtBQUNkLFFBQUksQ0FBQyxPQUFRO0FBRWIsVUFBTSxnQkFBZ0IsQ0FBQyxVQUFzQjtBQUMzQyxZQUFNLFNBQVMsTUFBTTtBQUNyQixVQUFJLENBQUMsT0FBUTtBQUNiLFVBQUksV0FBVyxTQUFTLFNBQVMsTUFBTSxFQUFHO0FBQzFDLFVBQUksYUFBYSxTQUFTLFNBQVMsTUFBTSxFQUFHO0FBQzVDLE1BQUFBLFlBQVcsc0JBQXNCO0FBQ2pDLGdCQUFVLEtBQUs7QUFDZixtQkFBYSxJQUFJO0FBQUEsSUFDbkI7QUFFQSxhQUFTLGlCQUFpQixhQUFhLGFBQWE7QUFDcEQsV0FBTyxNQUFNLFNBQVMsb0JBQW9CLGFBQWEsYUFBYTtBQUFBLEVBQ3RFLEdBQUcsQ0FBQyxjQUFjLFFBQVFBLGFBQVksWUFBWSxjQUFjLFNBQVMsQ0FBQztBQUcxRSwrQkFBVSxNQUFNO0FBQ2QsVUFBTSxhQUFhLE1BQU07QUFDdkIsVUFBSSxxQkFBcUIsUUFBUztBQUNsQyxVQUFJLGtCQUFrQixHQUFHO0FBQ3ZCLGNBQU0sU0FBUyxpQkFBaUI7QUFDaEMsY0FBTSxnQkFBZ0Isa0JBQWtCLE1BQU07QUFDOUMsWUFBSSxlQUFlO0FBQ2pCLGlDQUF1QixVQUFVO0FBQ2pDLHlCQUFlLGNBQWMsTUFBTSxjQUFjLFFBQVE7QUFDekQseUJBQWUsS0FBSztBQUNwQixvQkFBVSxLQUFLO0FBQ2YsK0JBQXFCLFVBQVU7QUFBQSxRQUNqQztBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBRUEsV0FBTyxpQkFBaUIsWUFBWSxVQUFVO0FBQzlDLFdBQU8sTUFBTSxPQUFPLG9CQUFvQixZQUFZLFVBQVU7QUFBQSxFQUNoRSxHQUFHO0FBQUEsSUFDRDtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGLENBQUM7QUFHRCwrQkFBVSxNQUFNO0FBQ2QsVUFBTSxrQkFBa0IsTUFBTTtBQUM1QixxQkFBZSxDQUFDLFNBQVM7QUFDdkIsY0FBTSxPQUFPLENBQUM7QUFDZCxZQUFJLENBQUMsTUFBTTtBQUNULG9CQUFVLEtBQUs7QUFBQSxRQUNqQixPQUFPO0FBQ0wsaUJBQU8sU0FBUyxFQUFFLEtBQUssR0FBRyxVQUFVLFNBQVMsQ0FBQztBQUFBLFFBQ2hEO0FBQ0EsZUFBTztBQUFBLE1BQ1QsQ0FBQztBQUFBLElBQ0g7QUFFQSxVQUFNLFlBQVksTUFBTTtBQUN0QixtQkFBYSxFQUFFLE1BQU0sYUFBYSxPQUFPLE1BQU0sWUFBWSxLQUFLLENBQUM7QUFBQSxJQUNuRTtBQUVBLFdBQU8saUJBQWlCLHlCQUF5QixlQUFlO0FBQ2hFLFdBQU8saUJBQWlCLG1CQUFtQixTQUFTO0FBRXBELFdBQU8sTUFBTTtBQUNYLGFBQU8sb0JBQW9CLHlCQUF5QixlQUFlO0FBQ25FLGFBQU8sb0JBQW9CLG1CQUFtQixTQUFTO0FBQUEsSUFDekQ7QUFBQSxFQUNGLEdBQUcsQ0FBQyxjQUFjLGFBQWEsV0FBVyxjQUFjLENBQUM7QUFDM0Q7OztBQ3ZIQSxJQUFBQyxnQkFBOEQ7QUFVdkQsSUFBTSwyQkFBMkIsQ0FBQyxFQUFFLFdBQVcsU0FBUyxlQUFlLGlCQUFpQixNQUFZO0FBQ3pHLCtCQUFVLE1BQU07QUFDZCxRQUFJLGFBQWEsQ0FBQyxXQUFXLGtCQUFrQixTQUFTO0FBQ3RELHVCQUFpQixLQUFLO0FBQ3RCO0FBQUEsSUFDRjtBQUNBLFFBQUksQ0FBQyxhQUFhLGtCQUFrQixTQUFTO0FBQzNDLHVCQUFpQixPQUFPO0FBQUEsSUFDMUI7QUFBQSxFQUNGLEdBQUcsQ0FBQyxXQUFXLFNBQVMsZUFBZSxnQkFBZ0IsQ0FBQztBQUMxRDs7O0FDcEJDLElBQUFDLGdCQUF1QztBQWVqQyxJQUFNLDBCQUEwQixDQUFDO0FBQUEsRUFDdEM7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0EsWUFBQUM7QUFBQSxFQUNBLGFBQUFDO0FBQUEsRUFDQSxpQkFBQUM7QUFDRixNQUFtQztBQUNqQyxRQUFNLHFCQUFpQixzQkFBTyxDQUFDO0FBRS9CLFFBQU0sb0JBQWdDLHVCQUFRLE1BQU07QUFDbEQsV0FBTyxNQUFNLElBQUksQ0FBQyxVQUFVO0FBQzFCLFlBQU0sa0JBQWtCLE1BQU0sZUFBZSxNQUFNLGVBQWUsSUFBSSxTQUFTLEVBQUUsS0FBSztBQUN0RixZQUFNLGNBQWMsa0JBQWtCO0FBQ3RDLFlBQU0sV0FBVyxNQUFNLFNBQVMsTUFBTSxTQUFTO0FBQy9DLFlBQU0sUUFBUSxZQUFZLENBQUMsT0FBTyxNQUFNLE9BQU8sUUFBUSxDQUFDLElBQUksT0FBTyxRQUFRLElBQUk7QUFDL0UsVUFBSSxTQUFTLGdCQUFnQixRQUFRLE1BQU0sU0FBUyxJQUFJO0FBRXhELFVBQUksZUFBZSxVQUFVLEdBQUc7QUFDOUIsUUFBQUYsWUFBVyxpQkFBaUIsRUFBRSxhQUFhLFVBQVUsTUFBTSxDQUFDO0FBQzVELHVCQUFlLFdBQVc7QUFBQSxNQUM1QjtBQUVBLFlBQU0sV0FBVyxNQUFNLFFBQVEsTUFBTSxRQUFRLElBQUksU0FBUyxFQUFFLEtBQUs7QUFDakUsWUFBTSxXQUFXQyxhQUFZLFNBQVMsTUFBTTtBQUM1QyxZQUFNLFNBQVMsTUFBTSxhQUFhLE1BQU0sYUFBYSxJQUFJLFNBQVM7QUFDbEUsWUFBTSxXQUFXLE1BQU0sZUFBZSxNQUFNLGVBQWUsSUFBSSxTQUFTLEVBQUUsS0FBSztBQUMvRSxZQUFNLFdBQVc7QUFFakIsWUFBTSxlQUFlLENBQUMsV0FBVyxDQUFDO0FBQ2xDLFVBQUksY0FBYztBQUNoQixpQkFBUztBQUFBLE1BQ1g7QUFFQSxhQUFPO0FBQUEsUUFDTCxJQUFJO0FBQUEsUUFDSjtBQUFBLFFBQ0E7QUFBQSxRQUNBLE1BQU07QUFBQSxRQUNOLGFBQWEsWUFBWTtBQUFBLFFBQ3pCO0FBQUEsUUFDQTtBQUFBLFFBQ0EsV0FBV0MsaUJBQWdCLE9BQU8sTUFBTTtBQUFBLFFBQ3hDLFVBQVU7QUFBQSxNQUNaO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSCxHQUFHLENBQUNBLGtCQUFpQixPQUFPLFFBQVFGLGFBQVksWUFBWUMsWUFBVyxDQUFDO0FBRXhFLFNBQU8sRUFBRSxjQUFjO0FBQ3pCOzs7QUNoRUEsSUFBQUUsaUJBQXdCO0FBZWpCLElBQU0seUJBQXlCLENBQUM7QUFBQSxFQUNyQztBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0YsTUFBWTtBQUNWLFFBQU0sRUFBRSxtQkFBbUIscUJBQXFCLG1CQUFtQixrQkFBa0IsSUFBSSxxQkFBcUI7QUFBQSxJQUM1RztBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0EsYUFBYTtBQUFBLElBQ2I7QUFBQSxFQUNGLENBQUM7QUFFRCxRQUFNLGtCQUFrQixTQUFTLEtBQUs7QUFDdEMsUUFBTSx5QkFBeUIscUJBQXFCLGtCQUFrQixTQUFTO0FBQy9FLFFBQU0sb0JBQWdCLHdCQUFRLE1BQU07QUFDbEMsUUFBSSxDQUFDLHlCQUF5QixDQUFDLHVCQUF3QixRQUFPO0FBQzlELFdBQ0Usa0JBQWtCLEtBQUssQ0FBQyxTQUFTLEtBQUssU0FBUyxZQUFZLE1BQU0sc0JBQXNCLFlBQVksQ0FBQyxLQUFLO0FBQUEsRUFFN0csR0FBRyxDQUFDLHdCQUF3Qix1QkFBdUIsaUJBQWlCLENBQUM7QUFFckUsUUFBTSxvQkFBb0IsQ0FBQywwQkFBMEIscUJBQXFCLGtCQUFrQixrQkFBa0I7QUFFOUcsU0FBTztBQUFBLElBQ0w7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBLG1CQUFtQixnQkFBZ0IsNEJBQTRCLGFBQWEsSUFBSTtBQUFBLElBQ2hGLGdDQUFnQyxlQUFlLFlBQVk7QUFBQSxFQUM3RDtBQUNGOzs7QUNuREEsSUFBQUMsaUJBQXlEO0FBMENsRCxJQUFNLHVCQUF1QixDQUFDO0FBQUEsRUFDbkM7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0EscUJBQXFCO0FBQUEsRUFDckI7QUFBQSxFQUNBLGVBQWU7QUFBQSxFQUNmLGdCQUFBQztBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0YsTUFBZ0M7QUFDOUIsUUFBTSxDQUFDLE9BQU8sUUFBUSxRQUFJLHlCQUFnQyxDQUFDLENBQUM7QUFDNUQsUUFBTSxDQUFDLE9BQU8sUUFBUSxRQUFJLHlCQUFTLENBQUM7QUFDcEMsUUFBTSxDQUFDLGFBQWEsY0FBYyxRQUFJLHlCQUFTLENBQUM7QUFDaEQsUUFBTSxDQUFDLFdBQVcsWUFBWSxRQUFJLHlCQUFTLEtBQUs7QUFDaEQsUUFBTSxDQUFDLGNBQWMsZUFBZSxRQUFJLHlCQUFTLEVBQUU7QUFFbkQsUUFBTSw2QkFBeUIsdUJBQU8sS0FBSztBQUMzQyxRQUFNLHFCQUFpQix1QkFBK0IsSUFBSTtBQUMxRCxRQUFNLHlCQUFxQix1QkFBTyxDQUFDO0FBQ25DLFFBQU0sb0JBQWdCLHVCQUFzQixJQUFJO0FBQ2hELFFBQU0sdUJBQW1CLHVCQUFPLEVBQUU7QUFFbEMsUUFBTSxzQkFBa0IsNEJBQVksTUFBTTtBQUN4QyxRQUFJLGNBQWMsU0FBUztBQUN6QixtQkFBYSxjQUFjLE9BQU87QUFDbEMsb0JBQWMsVUFBVTtBQUFBLElBQzFCO0FBQUEsRUFDRixHQUFHLENBQUMsQ0FBQztBQUVMLFFBQU0seUJBQXFCLDRCQUFZLE1BQU07QUFDM0MsUUFBSSxDQUFDLGVBQWUsUUFBUztBQUM3QixRQUFJO0FBQ0YscUJBQWUsUUFBUSxNQUFNO0FBQUEsSUFDL0IsUUFBUTtBQUFBLElBRVI7QUFDQSxtQkFBZSxVQUFVO0FBQUEsRUFDM0IsR0FBRyxDQUFDLENBQUM7QUFFTCxRQUFNLHNCQUFrQiw0QkFBWSxNQUFNO0FBQ3hDLG9CQUFnQjtBQUNoQix1QkFBbUI7QUFDbkIsYUFBUyxDQUFDLENBQUM7QUFDWCxhQUFTLENBQUM7QUFDVixvQkFBZ0IsRUFBRTtBQUNsQixpQkFBYSxLQUFLO0FBQUEsRUFDcEIsR0FBRyxDQUFDLG9CQUFvQixlQUFlLENBQUM7QUFFeEMsUUFBTSxxQkFBaUI7QUFBQSxJQUNyQixPQUFPLE1BQWMsYUFBNEI7QUFDL0MsWUFBTSxjQUFjLFVBQVUsWUFBWTtBQUMxQyxZQUFNLFlBQVksVUFBVSxVQUFVO0FBQ3RDLFlBQU0sZ0JBQWdCLFVBQVUsY0FBYztBQUM5QyxZQUFNLG1CQUFtQixVQUFVLGlCQUFpQjtBQUVwRCxVQUFJLENBQUMsZUFBZSxDQUFDLFdBQVc7QUFDOUIscUJBQWEsS0FBSztBQUNsQixpQkFBUyxDQUFDLENBQUM7QUFDWCxpQkFBUyxDQUFDO0FBQ1Ysd0JBQWdCLEVBQUU7QUFDbEI7QUFBQSxNQUNGO0FBRUEscUJBQWUsSUFBSTtBQUNuQixzQkFBZ0I7QUFFaEIsWUFBTSxZQUFZLEVBQUUsbUJBQW1CO0FBQ3ZDLHlCQUFtQjtBQUVuQixZQUFNLGFBQWEsSUFBSSxnQkFBZ0I7QUFDdkMscUJBQWUsVUFBVTtBQUV6QixZQUFNLGFBQWFBLGdCQUFlLGFBQWEsU0FBUztBQUN4RCxZQUFNLDBCQUEwQixpQkFBaUIsS0FBSztBQUN0RCxZQUFNLGtCQUFrQixHQUFHLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxJQUFJLGFBQWEsSUFBSSx1QkFBdUIsSUFBSSxJQUFJO0FBQy9HLHVCQUFpQixVQUFVO0FBRTNCLG1CQUFhLElBQUk7QUFDakIsZUFBUyxDQUFDLENBQUM7QUFDWCxlQUFTLENBQUM7QUFDVixzQkFBZ0IsRUFBRTtBQUVsQixZQUFNLFVBS0Y7QUFBQSxRQUNGLFVBQVUsV0FBVztBQUFBLFFBQ3JCLFFBQVEsV0FBVztBQUFBLFFBQ25CLFlBQVk7QUFBQSxNQUNkO0FBQ0EsVUFBSSx5QkFBeUI7QUFDM0IsZ0JBQVEsZ0JBQWdCO0FBQUEsTUFDMUI7QUFFQSxnQkFBVSwwQkFBMEIsRUFBRSxNQUFNLFVBQVUsUUFBUSxDQUFDO0FBRS9ELFVBQUk7QUFDSixVQUFJO0FBQ0YsZUFBTyxNQUFNLFVBQTJCLGlDQUFpQyxJQUFJLGFBQWEsUUFBUSxJQUFJO0FBQUEsVUFDcEcsUUFBUTtBQUFBLFVBQ1IsU0FBUyxFQUFFLGdCQUFnQixtQkFBbUI7QUFBQSxVQUM5QyxNQUFNLEtBQUssVUFBVSxPQUFPO0FBQUEsVUFDNUIsUUFBUSxXQUFXO0FBQUEsVUFDbkIseUJBQXlCO0FBQUEsUUFDM0IsQ0FBQztBQUFBLE1BQ0gsU0FBUyxLQUFVO0FBQ2pCLFlBQUksY0FBYyxtQkFBbUIsUUFBUztBQUM5QyxZQUFJLEtBQUssU0FBUyxjQUFjO0FBQzlCLHlCQUFlLFVBQVU7QUFDekI7QUFBQSxRQUNGO0FBRUEsWUFBSSxlQUFlLGlCQUFpQixJQUFJLFdBQVcsS0FBSztBQUN0RCx1QkFBYSxLQUFLO0FBQ2xCLHlCQUFlLFVBQVU7QUFDekIsc0JBQVk7QUFDWjtBQUFBLFFBQ0Y7QUFFQSxjQUFNLGlCQUFpQixFQUFFLGVBQWUsa0JBQWtCLE9BQU8sSUFBSSxXQUFXO0FBQ2hGLFlBQUksa0JBQWtCLHVCQUF1QixTQUFTO0FBQ3BELGlDQUF1QixVQUFVO0FBQ2pDLHlCQUFlLFVBQVU7QUFDekIsd0JBQWMsVUFBVSxPQUFPLFdBQVcsTUFBTTtBQUM5QyxnQkFBSSxjQUFjLG1CQUFtQixRQUFTO0FBQzlDLGdCQUFJLGlCQUFpQixZQUFZLGdCQUFpQjtBQUNsRCwyQkFBZSxNQUFNO0FBQUEsY0FDbkIsVUFBVTtBQUFBLGNBQ1YsUUFBUTtBQUFBLGNBQ1IsWUFBWTtBQUFBLGNBQ1osZUFBZTtBQUFBLFlBQ2pCLENBQUM7QUFBQSxVQUNILEdBQUcsWUFBWTtBQUNmO0FBQUEsUUFDRjtBQUNBLHFCQUFhLEtBQUs7QUFDbEIsd0JBQWdCLEtBQUssV0FBVyxLQUFLLHFCQUFxQiw0Q0FBNEMsQ0FBQztBQUN2Ryx1QkFBZSxVQUFVO0FBQ3pCO0FBQUEsTUFDRjtBQUVBLFVBQUksY0FBYyxtQkFBbUIsUUFBUztBQUU5QyxnQkFBVSwyQkFBMkI7QUFBQSxRQUNuQyxRQUFRO0FBQUEsUUFDUixPQUFPLE1BQU0sU0FBUztBQUFBLFFBQ3RCLE9BQU8sTUFBTSxRQUFRLE1BQU0sS0FBSyxJQUFJLEtBQUssTUFBTSxTQUFTO0FBQUEsTUFDMUQsQ0FBQztBQUVELG1CQUFhLEtBQUs7QUFDbEIsZUFBUyxLQUFLLFNBQVMsQ0FBQyxDQUFDO0FBQ3pCLGVBQVMsS0FBSyxVQUFVLEtBQUssU0FBUyxDQUFDLEdBQUcsTUFBTTtBQUNoRCxxQkFBZSxVQUFVO0FBQUEsSUFDM0I7QUFBQSxJQUNBO0FBQUEsTUFDRTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0FBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFFQSxnQ0FBVSxNQUFNO0FBQ2QsV0FBTyxNQUFNO0FBQ1gsc0JBQWdCO0FBQ2hCLHlCQUFtQjtBQUFBLElBQ3JCO0FBQUEsRUFDRixHQUFHLENBQUMsb0JBQW9CLGVBQWUsQ0FBQztBQUV4QyxTQUFPO0FBQUEsSUFDTDtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRjtBQUNGOzs7QUN4T0EsSUFBQUMsaUJBQTRCO0FBb0I1QixJQUFNLHVCQUF1QixLQUFLLEtBQUssS0FBSztBQUU1QyxJQUFNLHdCQUF3QixDQUFDLFVBQWtFO0FBQy9GLE1BQUksQ0FBQyxTQUFTLE9BQU8sVUFBVSxTQUFVLFFBQU87QUFDaEQsU0FBTztBQUFBLElBQ0wsVUFBVSxNQUFNLFlBQVk7QUFBQSxJQUM1QixRQUFRLE1BQU0sVUFBVTtBQUFBLElBQ3hCLE1BQU0sTUFBTTtBQUFBLElBQ1osZUFBZSxNQUFNLGlCQUFpQjtBQUFBLElBQ3RDLFlBQVksTUFBTSxjQUFjO0FBQUEsSUFDaEMsZUFBZSxNQUFNLGlCQUFpQjtBQUFBLElBQ3RDLFdBQVcsTUFBTSxhQUFhO0FBQUEsRUFDaEM7QUFDRjtBQUdPLElBQU0sd0JBQXdCLE1BQU07QUFDekMsUUFBTSx1QkFBbUIsNEJBQVksTUFBa0M7QUFDckUsVUFBTSxTQUFTLHlCQUE4QyxrQkFBa0I7QUFDL0UsV0FBTyxzQkFBc0IsTUFBTTtBQUFBLEVBQ3JDLEdBQUcsQ0FBQyxDQUFDO0FBRUwsUUFBTSx1QkFBbUIsNEJBQVksTUFBTTtBQUN6QyxpQ0FBNkIsa0JBQWtCO0FBQy9DLGlDQUE2Qix1QkFBdUI7QUFBQSxFQUN0RCxHQUFHLENBQUMsQ0FBQztBQUVMLFFBQU0sd0JBQW9CLDRCQUFZLE1BQU07QUFDMUMsVUFBTSxNQUFNLDBCQUEwQix1QkFBdUI7QUFDN0QsUUFBSSxRQUFRLEtBQUs7QUFDZixtQ0FBNkIsdUJBQXVCO0FBQ3BELGFBQU87QUFBQSxJQUNUO0FBQ0EsV0FBTztBQUFBLEVBQ1QsR0FBRyxDQUFDLENBQUM7QUFFTCxRQUFNLHVCQUFtQiw0QkFBWSxDQUFDLFdBQWdDO0FBQ3BFLDZCQUF5QixvQkFBb0IsUUFBUSxvQkFBb0I7QUFDekUsOEJBQTBCLHlCQUF5QixLQUFLLG9CQUFvQjtBQUFBLEVBQzlFLEdBQUcsQ0FBQyxDQUFDO0FBRUwsU0FBTztBQUFBLElBQ0w7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQ0Y7OztBQ25FQyxJQUFBQyxpQkFBOEQ7QUFtQi9ELElBQU0sOEJBR0Q7QUFBQSxFQUNILEVBQUUsSUFBSSxVQUFVLGdCQUFnQixFQUFFO0FBQUEsRUFDbEMsRUFBRSxJQUFJLFdBQVcsZ0JBQWdCLEdBQUc7QUFBQSxFQUNwQyxFQUFFLElBQUksV0FBVyxnQkFBZ0IsR0FBRztBQUN0QztBQWNPLElBQU0seUJBQXlCLENBQUM7QUFBQSxFQUNyQztBQUFBLEVBQ0E7QUFBQSxFQUNBLFlBQUFDO0FBQUEsRUFDQSxnQkFBQUM7QUFBQSxFQUNBLFVBQUFDO0FBQUEsRUFDQSxPQUFBQztBQUFBLEVBQ0EsWUFBQUM7QUFBQSxFQUNBLFVBQUFDO0FBQ0YsTUFBa0M7QUFDaEMsUUFBTSxrQ0FBOEI7QUFBQSxJQUNsQyxDQUFDLE9BQW9CLFFBQTJDO0FBQzlELFVBQUksQ0FBQyxTQUFTLENBQUMsS0FBSztBQUNsQixlQUFPO0FBQUEsTUFDVDtBQUVBLFlBQU0sa0JBQWtCRCxZQUFXLEtBQUs7QUFDeEMsWUFBTSxnQkFBZ0JBLFlBQVcsR0FBRztBQUNwQyxZQUFNLFFBQVFBLFlBQVcsb0JBQUksS0FBSyxDQUFDO0FBQ25DLFVBQUlELE9BQU0sYUFBYSxNQUFNQSxPQUFNLEtBQUssR0FBRztBQUN6QyxlQUFPO0FBQUEsTUFDVDtBQUVBLGlCQUFXLFNBQVMsNkJBQTZCO0FBQy9DLGNBQU0saUJBQWlCLElBQUksS0FBSyxLQUFLO0FBQ3JDLHVCQUFlLFFBQVEsTUFBTSxRQUFRLElBQUksTUFBTSxjQUFjO0FBQzdELFlBQUlBLE9BQU0sZUFBZSxNQUFNQSxPQUFNLGNBQWMsR0FBRztBQUNwRCxpQkFBTyxNQUFNO0FBQUEsUUFDZjtBQUFBLE1BQ0Y7QUFFQSxhQUFPO0FBQUEsSUFDVDtBQUFBLElBQ0EsQ0FBQ0MsYUFBWUQsTUFBSztBQUFBLEVBQ3BCO0FBRUEsUUFBTSxDQUFDLFdBQVcsWUFBWSxRQUFJLHlCQUFzQixJQUFJO0FBQzVELFFBQU0sQ0FBQyxTQUFTLFVBQVUsUUFBSSx5QkFBc0IsSUFBSTtBQUN4RCxRQUFNLENBQUMsaUJBQWlCLGtCQUFrQixRQUFJLHlCQUFzQixJQUFJO0FBQ3hFLFFBQU0sQ0FBQyxlQUFlLGdCQUFnQixRQUFJLHlCQUFzQixJQUFJO0FBQ3BFLFFBQU0sQ0FBQyxXQUFXLFlBQVksUUFBSSx5QkFBc0IsSUFBSTtBQUM1RCxRQUFNLENBQUMsZUFBZSxnQkFBZ0IsUUFBSSx5QkFBbUMsT0FBTztBQUNwRixRQUFNLENBQUMsY0FBYyxlQUFlLFFBQUksMEJBQVMsb0JBQUksS0FBSyxHQUFFLFNBQVMsQ0FBQztBQUN0RSxRQUFNLENBQUMsYUFBYSxjQUFjLFFBQUksMEJBQVMsb0JBQUksS0FBSyxHQUFFLFlBQVksQ0FBQztBQUN2RSxRQUFNLENBQUMsUUFBUSxTQUFTLFFBQUkseUJBQVMsS0FBSztBQUMxQyxRQUFNLENBQUMsdUJBQXVCLHdCQUF3QixRQUFJLHlCQUFTLEtBQUs7QUFDeEUsUUFBTSxDQUFDLG1CQUFtQixvQkFBb0IsUUFBSSx5QkFBK0IsSUFBSTtBQUNyRixRQUFNLENBQUMsZ0JBQWdCLGlCQUFpQixRQUFJLHlCQUE4QixJQUFJO0FBQzlFLFFBQU0sQ0FBQyx1QkFBdUIsd0JBQXdCLFFBQUkseUJBQVMsRUFBRTtBQUNyRSxRQUFNLENBQUMsZ0JBQWdCLGlCQUFpQixRQUFJLHlCQUFTLENBQUM7QUFDdEQsUUFBTSxDQUFDLGFBQWEsY0FBYyxRQUFJLHlCQUFTLElBQUk7QUFDbkQsUUFBTSxDQUFDLGlCQUFpQixrQkFBa0IsUUFBSSx5QkFBUyxLQUFLO0FBRTVELFFBQU0sMkJBQXVCLHVCQUFPLEtBQUs7QUFDekMsUUFBTSx1QkFBbUIsdUJBQU8sS0FBSztBQUVyQyxRQUFNLG9CQUFnQix3QkFBUSxNQUFPLFlBQVlBLE9BQU0sU0FBUyxJQUFJLElBQUssQ0FBQyxXQUFXQSxNQUFLLENBQUM7QUFDM0YsUUFBTSxrQkFBYyx3QkFBUSxNQUFPLFVBQVVBLE9BQU0sT0FBTyxJQUFJLElBQUssQ0FBQyxTQUFTQSxNQUFLLENBQUM7QUFDbkYsUUFBTSxzQkFBa0Isd0JBQVEsTUFBTyxpQkFBaUIsZUFBZSxRQUFRLElBQUssQ0FBQyxjQUFjLENBQUM7QUFFcEcsUUFBTSwwQkFBc0IsNEJBQVksTUFBTTtBQUM1QyxRQUFJLHNCQUFzQixhQUFhLENBQUMsYUFBYSxDQUFDLFVBQVU7QUFDOUQseUJBQW1CLElBQUk7QUFDdkIsdUJBQWlCLENBQUMsWUFBWSxVQUFVLEtBQUs7QUFDN0MsK0JBQXlCLElBQUk7QUFDN0IsZ0JBQVUsSUFBSTtBQUNkLHFCQUFlLElBQUk7QUFDbkIsYUFBTztBQUFBLElBQ1Q7QUFDQSxXQUFPO0FBQUEsRUFDVCxHQUFHLENBQUMsbUJBQW1CLFNBQVMsU0FBUyxDQUFDO0FBRzFDLFFBQU0saUNBQTZCLDRCQUFZLE1BQWdDO0FBQzdFLFFBQUksQ0FBQyxtQkFBbUIsQ0FBQyxjQUFlLFFBQU87QUFDL0MsVUFBTSxXQUFXRixnQkFBZSxlQUFlO0FBQy9DLFVBQU0sU0FBU0EsZ0JBQWUsYUFBYTtBQUMzQyxRQUFJLENBQUMsWUFBWSxDQUFDLE9BQVEsUUFBTztBQUVqQyxVQUFNLFdBQVdHLFlBQVcsUUFBUTtBQUNwQyxVQUFNLFNBQVNBLFlBQVcsTUFBTTtBQUVoQyxRQUFJLFFBQVE7QUFDWixRQUFJLE1BQU07QUFDVixRQUFJQyxVQUFTLEtBQUssS0FBSyxHQUFHO0FBQ3hCLFlBQU0sT0FBTztBQUNiLGNBQVE7QUFDUixZQUFNO0FBQUEsSUFDUjtBQUVBLGlCQUFhLEtBQUs7QUFDbEIsZUFBVyxHQUFHO0FBQ2QscUJBQWlCLE1BQU07QUFDdkIsaUJBQWEsSUFBSTtBQUNqQixvQkFBZ0IsTUFBTSxTQUFTLENBQUM7QUFDaEMsbUJBQWUsTUFBTSxZQUFZLENBQUM7QUFDbEMseUJBQXFCLDRCQUE0QixPQUFPLEdBQUcsQ0FBQztBQUM1RCxzQkFBa0IsSUFBSTtBQUN0Qiw2QkFBeUIsRUFBRTtBQUMzQixjQUFVLEtBQUs7QUFFZixXQUFPO0FBQUEsTUFDTCxNQUFNO0FBQUEsTUFDTixVQUFVO0FBQUEsUUFDUixVQUFVRixPQUFNLEtBQUs7QUFBQSxRQUNyQixRQUFRQSxPQUFNLEdBQUc7QUFBQSxRQUNqQixZQUFZO0FBQUEsTUFDZDtBQUFBLElBQ0Y7QUFBQSxFQUNGLEdBQUcsQ0FBQyxpQkFBaUIsZUFBZUUsV0FBVUosaUJBQWdCLDZCQUE2QkcsYUFBWUQsTUFBSyxDQUFDO0FBRzdHLFFBQU0sMEJBQXNCLDRCQUFZLE1BQU07QUFDNUMsaUJBQWEsSUFBSTtBQUNqQixlQUFXLElBQUk7QUFDZix1QkFBbUIsSUFBSTtBQUN2QixxQkFBaUIsSUFBSTtBQUNyQixxQkFBaUIsT0FBTztBQUN4QixpQkFBYSxJQUFJO0FBQ2pCLHFCQUFnQixvQkFBSSxLQUFLLEdBQUUsU0FBUyxDQUFDO0FBQ3JDLG9CQUFlLG9CQUFJLEtBQUssR0FBRSxZQUFZLENBQUM7QUFDdkMseUJBQXFCLElBQUk7QUFDekIsNkJBQXlCLEtBQUs7QUFDOUIsc0JBQWtCLElBQUk7QUFDdEIsNkJBQXlCLEVBQUU7QUFDM0Isc0JBQWtCLENBQUMsU0FBUyxPQUFPLENBQUM7QUFDcEMsdUJBQW1CLEtBQUs7QUFBQSxFQUMxQixHQUFHLENBQUMsQ0FBQztBQUdMLFFBQU0sd0JBQW9CO0FBQUEsSUFDeEIsQ0FBQyxXQUFpRTtBQUNoRSxVQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sWUFBWSxDQUFDLE9BQU8sT0FBUSxRQUFPO0FBRTFELFlBQU0sUUFBUUQsVUFBUyxPQUFPLFFBQVE7QUFDdEMsWUFBTSxNQUFNQSxVQUFTLE9BQU8sTUFBTTtBQUNsQyxtQkFBYSxLQUFLO0FBQ2xCLGlCQUFXLEdBQUc7QUFDZCx1QkFBaUIsTUFBTSxTQUFTLEtBQUs7QUFDckMsbUJBQWEsSUFBSTtBQUNqQixzQkFBZ0IsUUFBUSxNQUFNLFNBQVMsS0FBSSxvQkFBSSxLQUFLLEdBQUUsU0FBUyxDQUFDO0FBQ2hFLHFCQUFlLFFBQVEsTUFBTSxZQUFZLEtBQUksb0JBQUksS0FBSyxHQUFFLFlBQVksQ0FBQztBQUNyRSwyQkFBcUIsNEJBQTRCLE9BQU8sR0FBRyxDQUFDO0FBQzVELCtCQUF5QixLQUFLO0FBQzlCLHlCQUFtQixLQUFLO0FBRXhCLFVBQUksT0FBTyxlQUFlO0FBQ3hCLDBCQUFrQixFQUFFLE9BQU8sT0FBTyxlQUFlLE1BQU0sT0FBTyxjQUFjLE9BQU8sY0FBYyxDQUFDO0FBQUEsTUFDcEcsT0FBTztBQUNMLDBCQUFrQixJQUFJO0FBQUEsTUFDeEI7QUFDQSwrQkFBeUIsT0FBTyxpQkFBaUIsRUFBRTtBQUVuRCxZQUFNLFVBQVUsT0FBTyxPQUFPLElBQUk7QUFDbEMsWUFBTSxhQUFhLE9BQU8sU0FBUyxPQUFPLEtBQUssVUFBVSxJQUFJLFVBQVU7QUFFdkUsYUFBTztBQUFBLFFBQ0wsTUFBTTtBQUFBLFFBQ04sVUFBVTtBQUFBLFVBQ1IsVUFBVSxPQUFPO0FBQUEsVUFDakIsUUFBUSxPQUFPO0FBQUEsVUFDZixZQUFZLE9BQU8saUJBQWlCO0FBQUEsVUFDcEMsZUFBZSxPQUFPLGlCQUFpQjtBQUFBLFFBQ3pDO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLENBQUNBLFdBQVUsMkJBQTJCO0FBQUEsRUFDeEM7QUFFQSxRQUFNLG1CQUFlO0FBQUEsSUFDbkIsQ0FBQyxZQUFrQjtBQUNqQixNQUFBRixZQUFXLGdCQUFnQjtBQUFBLFFBQ3pCLFNBQVNHLE9BQU0sT0FBTztBQUFBLFFBQ3RCLE9BQU87QUFBQSxRQUNQLEtBQUs7QUFBQSxRQUNMO0FBQUEsTUFDRixDQUFDO0FBRUQseUJBQW1CLEtBQUs7QUFDeEIsMkJBQXFCLFFBQVE7QUFDN0IsK0JBQXlCLElBQUk7QUFDN0IsWUFBTSxXQUFXLENBQUMsQ0FBQztBQUNuQixZQUFNLFNBQVMsQ0FBQyxDQUFDO0FBRWpCLFVBQUksa0JBQWtCLE9BQU87QUFDM0IsWUFBSSxDQUFDLFVBQVU7QUFDYix1QkFBYSxPQUFPO0FBQ3BCLHFCQUFXLElBQUk7QUFDZiwyQkFBaUIsS0FBSztBQUN0QiwwQkFBZ0IsUUFBUSxTQUFTLENBQUM7QUFDbEMseUJBQWUsUUFBUSxZQUFZLENBQUM7QUFDcEM7QUFBQSxRQUNGO0FBRUEsWUFBSUcsWUFBVztBQUNmLFlBQUksU0FBUztBQUNiLFlBQUlELFVBQVMsUUFBUUMsU0FBUSxHQUFHO0FBQzlCLGdCQUFNLE9BQU9BO0FBQ2IsVUFBQUEsWUFBVztBQUNYLG1CQUFTO0FBQUEsUUFDWDtBQUVBLHFCQUFhQSxTQUFRO0FBQ3JCLG1CQUFXLE1BQU07QUFDakIsMkJBQW1CQSxTQUFRO0FBQzNCLHlCQUFpQixNQUFNO0FBQ3ZCLHlCQUFpQixNQUFNO0FBQ3ZCLHdCQUFnQixPQUFPLFNBQVMsQ0FBQztBQUNqQyx1QkFBZSxPQUFPLFlBQVksQ0FBQztBQUNuQyxxQkFBYSxJQUFJO0FBQ2pCLGtCQUFVLEtBQUs7QUFDZixpQ0FBeUIsS0FBSztBQUM5QjtBQUFBLE1BQ0Y7QUFFQSxZQUFNLFdBQVc7QUFDakIsVUFBSSxVQUFVLFdBQVdELFVBQVMsU0FBUyxRQUFRLEdBQUc7QUFDcEQscUJBQWEsUUFBUTtBQUNyQixtQkFBVyxJQUFJO0FBQ2YseUJBQWlCLEtBQUs7QUFDdEIsd0JBQWdCLFNBQVMsU0FBUyxDQUFDO0FBQ25DLHVCQUFlLFNBQVMsWUFBWSxDQUFDO0FBQ3JDO0FBQUEsTUFDRjtBQUVBLG1CQUFhLFFBQVE7QUFDckIsVUFBSSxVQUFVLFNBQVM7QUFDckIsbUJBQVcsT0FBTztBQUNsQiwyQkFBbUIsUUFBUTtBQUMzQix5QkFBaUIsT0FBTztBQUN4Qix5QkFBaUIsTUFBTTtBQUN2QixxQkFBYSxJQUFJO0FBQ2pCLGtCQUFVLEtBQUs7QUFDZixpQ0FBeUIsS0FBSztBQUFBLE1BQ2hDLE9BQU87QUFDTCxtQkFBVyxJQUFJO0FBQ2YseUJBQWlCLEtBQUs7QUFBQSxNQUN4QjtBQUVBLHNCQUFnQixTQUFTLFNBQVMsQ0FBQztBQUNuQyxxQkFBZSxTQUFTLFlBQVksQ0FBQztBQUFBLElBQ3ZDO0FBQUEsSUFDQSxDQUFDLFNBQVMsZUFBZUEsV0FBVUwsYUFBWSxlQUFlLFdBQVcsYUFBYUcsTUFBSztBQUFBLEVBQzdGO0FBRUEsUUFBTSx1QkFBbUI7QUFBQSxJQUN2QixDQUFDLFVBQTJCO0FBQzFCLFlBQU0sZ0JBQWdCO0FBQ3RCLE1BQUFILFlBQVcsWUFBWTtBQUN2QiwyQkFBcUIsSUFBSTtBQUN6Qix5QkFBbUIsS0FBSztBQUN4QiwrQkFBeUIsS0FBSztBQUM5QiwwQkFBb0I7QUFDcEIsZ0JBQVUsS0FBSztBQUNmLHFCQUFlLElBQUk7QUFBQSxJQUNyQjtBQUFBLElBQ0EsQ0FBQ0EsYUFBWSxtQkFBbUI7QUFBQSxFQUNsQztBQUVBLFFBQU0sa0JBQWM7QUFBQSxJQUNsQixDQUFDLFlBQTZCO0FBQzVCLE1BQUFBLFlBQVcsZUFBZSxFQUFFLFNBQVMsT0FBTyxlQUFlLEtBQUssYUFBYSxjQUFjLENBQUM7QUFDNUYseUJBQW1CLEtBQUs7QUFDeEIsMkJBQXFCLFFBQVE7QUFDN0IsK0JBQXlCLElBQUk7QUFFN0IsVUFBSSxZQUFZLFNBQVMsQ0FBQyxXQUFXO0FBQ25DLHlCQUFpQixPQUFPO0FBQUEsTUFDMUIsT0FBTztBQUNMLHlCQUFpQixPQUFPO0FBQUEsTUFDMUI7QUFFQSxnQkFBVSxJQUFJO0FBQUEsSUFDaEI7QUFBQSxJQUNBLENBQUMsZUFBZUEsYUFBWSxlQUFlLFdBQVcsV0FBVztBQUFBLEVBQ25FO0FBRUEsUUFBTSw2QkFBeUI7QUFBQSxJQUM3QixDQUFDLFVBQStDO0FBQzlDLFVBQUksTUFBTSxRQUFRLFdBQVcsTUFBTSxRQUFRLElBQUs7QUFDaEQsWUFBTSxlQUFlO0FBQ3JCLGtCQUFZLE9BQU87QUFBQSxJQUNyQjtBQUFBLElBQ0EsQ0FBQyxXQUFXO0FBQUEsRUFDZDtBQUVBLFFBQU0sMkJBQXVCO0FBQUEsSUFDM0IsQ0FBQyxPQUE0QyxZQUE2QjtBQUN4RSxVQUFJLE1BQU0sUUFBUSxXQUFXLE1BQU0sUUFBUSxJQUFLO0FBQ2hELFlBQU0sZUFBZTtBQUNyQixZQUFNLGdCQUFnQjtBQUN0QixrQkFBWSxPQUFPO0FBQUEsSUFDckI7QUFBQSxJQUNBLENBQUMsV0FBVztBQUFBLEVBQ2Q7QUFFQSxRQUFNLHNCQUFrQjtBQUFBLElBQ3RCLENBQUMsVUFBeUIsT0FBYSxRQUFjO0FBQ25ELFlBQU0sV0FBV0ksWUFBVyxLQUFLO0FBQ2pDLFlBQU0sU0FBU0EsWUFBVyxHQUFHO0FBQzdCLG1CQUFhLFFBQVE7QUFDckIsaUJBQVcsTUFBTTtBQUNqQix1QkFBaUIsTUFBTTtBQUN2QixtQkFBYSxJQUFJO0FBQ2pCLHNCQUFnQixTQUFTLFNBQVMsQ0FBQztBQUNuQyxxQkFBZSxTQUFTLFlBQVksQ0FBQztBQUNyQyxnQkFBVSxLQUFLO0FBQ2YsK0JBQXlCLEtBQUs7QUFDOUIsMkJBQXFCLFFBQVE7QUFDN0IseUJBQW1CLEtBQUs7QUFBQSxJQUMxQjtBQUFBLElBQ0EsQ0FBQ0EsV0FBVTtBQUFBLEVBQ2I7QUFFQSxRQUFNLHdCQUFvQjtBQUFBLElBQ3hCLENBQUMsYUFBNEI7QUFDM0IsWUFBTSxRQUFRQSxZQUFXLG9CQUFJLEtBQUssQ0FBQztBQUVuQyxVQUFJLGFBQWEsVUFBVTtBQUV6QixZQUFJLHVCQUF1QjtBQUN6Qiw2QkFBbUIsS0FBSztBQUN4Qix1QkFBYSxJQUFJO0FBQ2pCLDJCQUFpQixhQUFhLFVBQVUsU0FBUyxZQUFZLFFBQVEsT0FBTztBQUM1RSxvQkFBVSxLQUFLO0FBQ2YsbUNBQXlCLEtBQUs7QUFDOUI7QUFBQSxRQUNGO0FBRUEsY0FBTSxZQUFZLGtCQUFrQixJQUFJLEtBQUssZUFBZSxJQUFJLFlBQVksSUFBSSxLQUFLLFNBQVMsSUFBSTtBQUNsRyxjQUFNLFVBQVUsZ0JBQWdCLElBQUksS0FBSyxhQUFhLElBQUksVUFBVSxJQUFJLEtBQUssT0FBTyxJQUFJO0FBQ3hGLDZCQUFxQixRQUFRO0FBQzdCLGlDQUF5QixJQUFJO0FBQzdCLHFCQUFhLFNBQVM7QUFDdEIsbUJBQVcsT0FBTztBQUVsQixZQUFJLFdBQVc7QUFDYiwwQkFBZ0IsVUFBVSxTQUFTLENBQUM7QUFDcEMseUJBQWUsVUFBVSxZQUFZLENBQUM7QUFBQSxRQUN4QztBQUdBLHlCQUFpQixhQUFhLENBQUMsVUFBVSxRQUFRLE9BQU87QUFDeEQsa0JBQVUsSUFBSTtBQUNkLHFCQUFhLElBQUk7QUFDakIsMkJBQW1CLEtBQUs7QUFDeEI7QUFBQSxNQUNGO0FBRUEsVUFBSSxhQUFhLFVBQVU7QUFDekIsY0FBTSxRQUFRLElBQUksS0FBSyxLQUFLO0FBQzVCLGNBQU0sUUFBUSxNQUFNLFFBQVEsSUFBSSxDQUFDO0FBQ2pDLHdCQUFnQixVQUFVLE9BQU8sS0FBSztBQUN0QztBQUFBLE1BQ0Y7QUFFQSxVQUFJLGFBQWEsV0FBVztBQUMxQixjQUFNLFFBQVEsSUFBSSxLQUFLLEtBQUs7QUFDNUIsY0FBTSxRQUFRLE1BQU0sUUFBUSxJQUFJLEVBQUU7QUFDbEMsd0JBQWdCLFVBQVUsT0FBTyxLQUFLO0FBQ3RDO0FBQUEsTUFDRjtBQUVBLFVBQUksYUFBYSxXQUFXO0FBQzFCLGNBQU0sUUFBUSxJQUFJLEtBQUssS0FBSztBQUM1QixjQUFNLFFBQVEsTUFBTSxRQUFRLElBQUksRUFBRTtBQUNsQyx3QkFBZ0IsVUFBVSxPQUFPLEtBQUs7QUFBQSxNQUN4QztBQUFBLElBQ0Y7QUFBQSxJQUNBLENBQUMsaUJBQWlCLFNBQVMsZUFBZSxpQkFBaUIsdUJBQXVCLFdBQVdBLFdBQVU7QUFBQSxFQUN6RztBQUVBLFFBQU0sMkJBQXVCLDRCQUFZLENBQUMsV0FBZ0M7QUFDeEUsc0JBQWtCLE1BQU07QUFBQSxFQUMxQixHQUFHLENBQUMsQ0FBQztBQUVMLFNBQU87QUFBQSxJQUNMO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQ0Y7OztBaEIvRkksSUFBQUcsc0JBQUE7QUF0VkosSUFBTSxZQUFZO0FBQ2xCLElBQU0sY0FBYztBQUNwQixJQUFNLGVBQWU7QUFDckIsSUFBTSxrQkFBa0I7QUFFeEIsSUFBTSxvQkFBb0IsQ0FBQyxXQUFtQjtBQUM1QyxRQUFNLFFBQVEsT0FBTyxVQUFVLEVBQUUsRUFBRSxLQUFLO0FBQ3hDLE1BQUksQ0FBQyxNQUFPLFFBQU87QUFDbkIsTUFBSSxZQUFZLEtBQUssS0FBSyxFQUFHLFFBQU87QUFDcEMsU0FBTztBQUNUO0FBRUEsSUFBTSxpQkFBaUIsQ0FBQyxXQUFtQixTQUFTLEtBQUssT0FBTyxVQUFVLEVBQUUsQ0FBQztBQUU3RSxJQUFNLGdCQUFnQjtBQUFBLEVBQ3BCO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRjtBQUVBLElBQU0sc0JBQXNCO0FBQUEsRUFDMUI7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUNGO0FBRUEsSUFBTSwwQkFBMEIsSUFBSSxLQUFLLGVBQWUsU0FBUyxFQUFFLE1BQU0sV0FBVyxPQUFPLE9BQU8sQ0FBQztBQUVuRyxJQUFNLGNBQWMsTUFBTTtBQUN4QixRQUFNLFdBQVcsT0FBTyxhQUFhLGNBQWMsU0FBUyxnQkFBZ0IsT0FBTztBQUNuRixNQUFJLFlBQVksT0FBTyxRQUFRLEVBQUUsS0FBSyxFQUFHLFFBQU8sa0JBQWtCLFFBQVE7QUFDMUUsU0FBTztBQUNUO0FBRUEsSUFBTSxNQUFNLENBQUMsTUFBYyxFQUFFLFNBQVMsRUFBRSxTQUFTLEdBQUcsR0FBRztBQUV2RCxJQUFNLFFBQVEsQ0FBQyxNQUFZLEdBQUcsRUFBRSxZQUFZLENBQUMsSUFBSSxJQUFJLEVBQUUsU0FBUyxJQUFJLENBQUMsQ0FBQyxJQUFJLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztBQUUxRixJQUFNLGFBQWEsQ0FBQyxNQUFZLElBQUksS0FBSyxFQUFFLFlBQVksR0FBRyxFQUFFLFNBQVMsR0FBRyxFQUFFLFFBQVEsQ0FBQztBQUVuRixJQUFNLFdBQVcsQ0FBQyxNQUFjO0FBQzlCLE1BQUksQ0FBQyxFQUFHLFFBQU87QUFDZixRQUFNLFFBQVEsRUFBRSxNQUFNLEdBQUcsRUFBRSxJQUFJLE1BQU07QUFDckMsTUFBSSxNQUFNLFdBQVcsRUFBRyxRQUFPO0FBQy9CLFNBQU8sSUFBSSxLQUFLLE1BQU0sQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLENBQUM7QUFDbEQ7QUFFQSxJQUFNLFdBQVcsQ0FBQyxHQUFnQixNQUFtQixDQUFDLEVBQUUsS0FBSyxLQUFLLEVBQUUsUUFBUSxJQUFJLEVBQUUsUUFBUTtBQUUxRixJQUFNLGlCQUFpQixDQUFDLE1BQWMsT0FBZTtBQUNuRCxNQUFJLENBQUMsUUFBUSxDQUFDLEdBQUksUUFBTyxFQUFFLE1BQU0sR0FBRztBQUNwQyxRQUFNLFdBQVcsU0FBUyxJQUFJO0FBQzlCLFFBQU0sU0FBUyxTQUFTLEVBQUU7QUFDMUIsTUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFRLFFBQU8sRUFBRSxNQUFNLEdBQUc7QUFDNUMsTUFBSSxTQUFTLFFBQVEsUUFBUSxHQUFHO0FBQzlCLFdBQU8sRUFBRSxNQUFNLE1BQU0sTUFBTSxHQUFHLElBQUksTUFBTSxRQUFRLEVBQUU7QUFBQSxFQUNwRDtBQUNBLFNBQU8sRUFBRSxNQUFNLE1BQU0sUUFBUSxHQUFHLElBQUksTUFBTSxNQUFNLEVBQUU7QUFDcEQ7QUFFQSxJQUFNLGdCQUFnQixDQUFDLEdBQVMsV0FBbUI7QUFDakQsTUFBSSxlQUFlLE1BQU0sR0FBRztBQUMxQixVQUFNLFFBQVEsb0JBQW9CLEVBQUUsU0FBUyxDQUFDO0FBQzlDLFdBQU8sR0FBRyxFQUFFLFFBQVEsQ0FBQyxJQUFJLEtBQUssSUFBSSxFQUFFLFlBQVksQ0FBQyxHQUFHLFlBQVk7QUFBQSxFQUNsRTtBQUNBLFNBQU8sRUFDSixtQkFBbUIsUUFBUTtBQUFBLElBQzFCLEtBQUs7QUFBQSxJQUNMLE9BQU87QUFBQSxJQUNQLE1BQU07QUFBQSxFQUNSLENBQUMsRUFDQSxRQUFRLE9BQU8sRUFBRSxFQUNqQixZQUFZO0FBQ2pCO0FBRUEsSUFBTSxtQkFBbUIsQ0FBQyxHQUFTLFdBQW1CO0FBQ3BELE1BQUksT0FBTyxLQUFLLE1BQU0sR0FBRztBQUN2QixXQUFPLHdCQUF3QixPQUFPLENBQUM7QUFBQSxFQUN6QztBQUNBLE1BQUksZUFBZSxNQUFNLEdBQUc7QUFDMUIsV0FBTyxHQUFHLGNBQWMsRUFBRSxTQUFTLENBQUMsQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDO0FBQUEsRUFDMUQ7QUFDQSxRQUFNLFlBQVksRUFBRSxtQkFBbUIsUUFBUSxFQUFFLE9BQU8sT0FBTyxDQUFDO0FBQ2hFLFFBQU0sZUFBZSxhQUFhLFdBQVcsS0FBSyxVQUFVLENBQUMsQ0FBQyxJQUMxRCxVQUFVLENBQUMsRUFBRSxrQkFBa0IsTUFBTSxJQUFJLFVBQVUsTUFBTSxDQUFDLElBQzFEO0FBQ0osU0FBTyxHQUFHLFlBQVksSUFBSSxFQUFFLFlBQVksQ0FBQztBQUMzQztBQUVBLElBQU0saUJBQWlCLENBQUMsVUFBa0I7QUFDeEMsTUFBSSxDQUFDLE1BQU8sUUFBTztBQUNuQixRQUFNLE1BQU0sT0FBTyxLQUFLLEVBQUUsS0FBSztBQUMvQixNQUFJLENBQUMsSUFBSyxRQUFPO0FBRWpCLFFBQU0sV0FBVyxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUMsRUFBRSxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBRS9DLE1BQUksc0JBQXNCLEtBQUssUUFBUSxHQUFHO0FBQ3hDLFVBQU0sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLFNBQVMsTUFBTSxHQUFHLEVBQUUsSUFBSSxNQUFNO0FBQ2hELFdBQU8sSUFBSSxLQUFLLEdBQUcsSUFBSSxHQUFHLENBQUM7QUFBQSxFQUM3QjtBQUVBLE1BQUksOEJBQThCLEtBQUssUUFBUSxHQUFHO0FBQ2hELFVBQU0sUUFBUSxTQUFTLE1BQU0sT0FBTyxFQUFFLElBQUksTUFBTTtBQUNoRCxVQUFNLENBQUMsR0FBRyxHQUFHLENBQUMsSUFBSTtBQUNsQixXQUFPLElBQUksS0FBSyxHQUFHLElBQUksR0FBRyxDQUFDO0FBQUEsRUFDN0I7QUFFQSxRQUFNLFNBQVMsSUFBSSxLQUFLLEdBQUc7QUFDM0IsU0FBTyxPQUFPLE1BQU0sT0FBTyxRQUFRLENBQUMsSUFBSSxPQUFPO0FBQ2pEO0FBRUEsSUFBTSxrQkFBa0IsQ0FBQyxPQUFlLFdBQW1CO0FBQ3pELE1BQUksQ0FBQyxNQUFPLFFBQU8sRUFBRSxNQUFNLElBQUksT0FBTyxJQUFJLEtBQUssR0FBRztBQUNsRCxRQUFNLElBQUksZUFBZSxLQUFLO0FBQzlCLE1BQUksQ0FBQyxFQUFHLFFBQU8sRUFBRSxNQUFNLElBQUksT0FBTyxJQUFJLEtBQUssR0FBRztBQUM5QyxNQUFJLFFBQVE7QUFDWixNQUFJLGVBQWUsTUFBTSxHQUFHO0FBQzFCLFlBQVEsb0JBQW9CLEVBQUUsU0FBUyxDQUFDLEtBQUs7QUFBQSxFQUMvQyxPQUFPO0FBQ0wsWUFBUSxFQUFFLG1CQUFtQixRQUFRLEVBQUUsT0FBTyxRQUFRLENBQUMsRUFBRSxRQUFRLE9BQU8sRUFBRTtBQUFBLEVBQzVFO0FBQ0EsU0FBTztBQUFBLElBQ0wsTUFBTSxPQUFPLEVBQUUsWUFBWSxDQUFDO0FBQUEsSUFDNUIsT0FBTyxNQUFNLFlBQVk7QUFBQSxJQUN6QixLQUFLLE9BQU8sRUFBRSxRQUFRLENBQUMsRUFBRSxTQUFTLEdBQUcsR0FBRztBQUFBLEVBQzFDO0FBQ0Y7QUFFQSxJQUFNLGNBQWMsQ0FBQyxPQUFlLFdBQW1CO0FBQ3JELE1BQUksQ0FBQyxNQUFPLFFBQU87QUFDbkIsUUFBTSxRQUFRLE1BQU0sa0JBQWtCLE1BQU07QUFDNUMsTUFBSTtBQUNGLFdBQU8sTUFBTSxRQUFRLHlCQUF5QixDQUFDLFFBQVEsUUFBUSxPQUFPLEdBQUcsTUFBTSxHQUFHLEdBQUcsa0JBQWtCLE1BQU0sQ0FBQyxFQUFFO0FBQUEsRUFDbEgsUUFBUTtBQUNOLFdBQU8sTUFBTSxRQUFRLG1CQUFtQixDQUFDLFFBQVEsUUFBUSxPQUFPLEdBQUcsTUFBTSxHQUFHLEdBQUcsa0JBQWtCLE1BQU0sQ0FBQyxFQUFFO0FBQUEsRUFDNUc7QUFDRjtBQUVBLElBQU0sYUFBYSxDQUFDLFNBQWlCLFNBQW1DO0FBQ3RFLE1BQUksT0FBTyxXQUFXLFlBQWE7QUFDbkMsUUFBTSxZQUFhLE9BQWU7QUFDbEMsTUFBSSxjQUFjLEtBQU07QUFDeEIsTUFBSSxNQUFNO0FBQ1IsWUFBUSxNQUFNLGFBQWEsU0FBUyxJQUFJO0FBQUEsRUFDMUMsT0FBTztBQUNMLFlBQVEsTUFBTSxhQUFhLE9BQU87QUFBQSxFQUNwQztBQUNGO0FBR08sSUFBTSxjQUFjLENBQUM7QUFBQSxFQUMxQixrQkFBa0I7QUFBQSxFQUNsQixnQkFBZ0I7QUFBQSxFQUNoQixZQUFZO0FBQUEsRUFDWixXQUFXO0FBQUEsRUFDWCxzQkFBc0I7QUFDeEIsTUFBYTtBQUNYLFFBQU0sYUFBUyx3QkFBUSxNQUFNLFlBQVksR0FBRyxDQUFDLENBQUM7QUFDOUMsUUFBTSxpQkFBaUIsVUFBVSxtQkFBbUIsTUFBTTtBQUMxRCxRQUFNLGlCQUFpQixVQUFVLG1CQUFtQixLQUFLO0FBQ3pELFFBQU0sYUFBYSxLQUFLLGlCQUFpQixTQUFTO0FBRWxELFFBQU0sbUJBQWUsdUJBQThCLElBQUk7QUFDdkQsUUFBTSxpQkFBYSx1QkFBOEIsSUFBSTtBQUVyRCxRQUFNLEVBQUUsa0JBQWtCLGtCQUFrQixtQkFBbUIsaUJBQWlCLElBQUksc0JBQXNCO0FBQzFHLFFBQU07QUFBQSxJQUNKO0FBQUEsSUFBVztBQUFBLElBQVM7QUFBQSxJQUFXO0FBQUEsSUFBZTtBQUFBLElBQWM7QUFBQSxJQUFhO0FBQUEsSUFBUTtBQUFBLElBQ2pGO0FBQUEsSUFBbUI7QUFBQSxJQUFnQjtBQUFBLElBQXVCO0FBQUEsSUFBZ0I7QUFBQSxJQUFhO0FBQUEsSUFDdkY7QUFBQSxJQUFlO0FBQUEsSUFBYTtBQUFBLElBQWlCO0FBQUEsSUFBc0I7QUFBQSxJQUNuRTtBQUFBLElBQWM7QUFBQSxJQUFrQjtBQUFBLElBQWlCO0FBQUEsSUFBZ0I7QUFBQSxJQUFXO0FBQUEsSUFBZ0I7QUFBQSxJQUM1RjtBQUFBLElBQTBCO0FBQUEsSUFBcUI7QUFBQSxJQUE0QjtBQUFBLElBQXFCO0FBQUEsSUFDaEc7QUFBQSxJQUFjO0FBQUEsSUFBa0I7QUFBQSxJQUFhO0FBQUEsSUFBd0I7QUFBQSxJQUFzQjtBQUFBLElBQzNGO0FBQUEsRUFDRixJQUFJLHVCQUF1QjtBQUFBLElBQ3pCO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0YsQ0FBQztBQUVELFFBQU0sRUFBRSxtQkFBbUIscUJBQXFCLG1CQUFtQixtQkFBbUIsK0JBQStCLElBQ25ILHVCQUF1QjtBQUFBLElBQ3JCLFNBQVM7QUFBQSxJQUNUO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQSxTQUFTO0FBQUEsRUFDWCxDQUFDO0FBRUgsUUFBTSxFQUFFLE9BQU8sT0FBTyxhQUFhLFdBQVcsY0FBYyxnQkFBZ0IsaUJBQWlCLHdCQUF3QixpQkFBaUIsSUFDcEkscUJBQXFCO0FBQUEsSUFDbkI7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0Esb0JBQW9CO0FBQUEsSUFDcEIsVUFBVTtBQUFBLElBQ1Y7QUFBQSxJQUNBLGFBQWE7QUFBQSxJQUNiLFNBQVM7QUFBQSxFQUNYLENBQUM7QUFFSCxRQUFNLEVBQUUsY0FBYyxhQUFhLG1CQUFtQixJQUFJLHdCQUF3QjtBQUFBLElBQ2hGO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0Esb0JBQW9CO0FBQUEsSUFDcEI7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRixDQUFDO0FBRUQsUUFBTSxhQUFhLEtBQUssTUFBTSxTQUFTLEtBQUssU0FBUztBQUVyRCwwQkFBd0I7QUFBQSxJQUN0QjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRixDQUFDO0FBRUQsd0JBQXNCO0FBQUEsSUFDcEI7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGLENBQUM7QUFFRCwyQkFBeUIsRUFBRSxXQUFXLFNBQVMsZUFBZSxpQkFBaUIsQ0FBQztBQUVoRixRQUFNLGlCQUFpQixxQkFBcUI7QUFBQSxJQUMxQztBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBLGVBQWU7QUFBQSxJQUNmLFdBQVc7QUFBQSxJQUNYLFlBQVk7QUFBQSxJQUNaO0FBQUEsSUFDQSxhQUFhO0FBQUEsRUFDZixDQUFDO0FBRUQsUUFBTTtBQUFBLElBQ0o7QUFBQSxJQUFlO0FBQUEsSUFBZ0I7QUFBQSxJQUFpQjtBQUFBLElBQ2hEO0FBQUEsSUFBc0I7QUFBQSxJQUFzQjtBQUFBLEVBQzlDLElBQUkseUJBQXlCO0FBQUEsSUFDM0I7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0YsQ0FBQztBQUVELFFBQU0sRUFBRSxjQUFjLElBQUksd0JBQXdCO0FBQUEsSUFDaEQ7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0YsQ0FBQztBQUVELFFBQU07QUFBQSxJQUNKO0FBQUEsSUFBVztBQUFBLElBQVM7QUFBQSxJQUFhO0FBQUEsSUFBVztBQUFBLElBQWE7QUFBQSxJQUFjO0FBQUEsSUFDdkU7QUFBQSxJQUFnQjtBQUFBLElBQWdCO0FBQUEsSUFBd0I7QUFBQSxJQUFzQjtBQUFBLElBQzlFO0FBQUEsSUFBWTtBQUFBLElBQVk7QUFBQSxJQUFhO0FBQUEsSUFBWTtBQUFBLElBQWU7QUFBQSxJQUFtQjtBQUFBLElBQ25GO0FBQUEsSUFBYztBQUFBLElBQXNCO0FBQUEsSUFBYTtBQUFBLElBQWM7QUFBQSxFQUNqRSxJQUFJLGlCQUFpQixNQUFNO0FBQzNCLFFBQU0sb0JBQW9CO0FBQzFCLFFBQU0sY0FBYyxDQUFDLGVBQWUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQ3JELFFBQU0sY0FBYyxDQUFDO0FBQ3JCLFFBQU0sbUJBQW1CLHNCQUFzQixZQUFZO0FBQzNELFFBQU0sb0JBQW9CLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxXQUFXLENBQUM7QUFFdkQsU0FDRSw4Q0FBQyxTQUFJLFdBQVUsc0RBQ1o7QUFBQSxtQkFDQyw2Q0FBQyxTQUFJLFdBQVUseURBQ2I7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLGtCQUFrQjtBQUFBLFFBQ2xCLGdCQUFnQjtBQUFBLFFBQ2hCLFdBQVcsWUFBWSxjQUFjLFdBQVcsTUFBTSxJQUFJO0FBQUEsUUFDMUQsU0FBUyxVQUFVLGNBQWMsU0FBUyxNQUFNLElBQUk7QUFBQSxRQUNwRDtBQUFBLFFBQ0EsYUFBYSxnQkFBZ0IsUUFBUTtBQUFBLFFBQ3JDLFlBQVksQ0FBQyxDQUFDO0FBQUEsUUFDZDtBQUFBLFFBQ0EsWUFBWTtBQUFBLFFBQ1osV0FBVyxDQUFDLENBQUM7QUFBQTtBQUFBLElBQ2YsR0FDRjtBQUFBLElBRUQsZUFDQztBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0M7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0Esa0JBQWtCO0FBQUEsUUFDbEIsZ0JBQWdCO0FBQUEsUUFDaEIsV0FBVyxZQUFZLGNBQWMsV0FBVyxNQUFNLElBQUk7QUFBQSxRQUMxRCxTQUFTLFVBQVUsY0FBYyxTQUFTLE1BQU0sSUFBSTtBQUFBLFFBQ3BEO0FBQUEsUUFDQSxZQUFZO0FBQUEsUUFDWjtBQUFBLFFBQ0E7QUFBQSxRQUNBLGdCQUFnQixtQkFBbUIsQ0FBQztBQUFBLFFBQ3BDLGNBQWMsbUJBQW1CLENBQUM7QUFBQSxRQUNsQztBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0EsZUFBZSxZQUFZLGNBQWMsV0FBVyxNQUFNLElBQUk7QUFBQSxRQUM5RCxhQUFhLFVBQVUsY0FBYyxTQUFTLE1BQU0sSUFBSTtBQUFBLFFBQ3hEO0FBQUEsUUFDQSxrQkFBa0IsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQUEsUUFDbkMsWUFBWTtBQUFBLFFBQ1o7QUFBQSxRQUNBLFlBQVksa0JBQWtCLFVBQVUseUJBQXlCO0FBQUEsUUFDakUsVUFBVTtBQUFBLFFBQ1Y7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0Esc0JBQXNCO0FBQUEsUUFDdEIsdUJBQXVCO0FBQUEsUUFDdkI7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQSxlQUFlO0FBQUEsUUFDZixlQUFlO0FBQUEsUUFDZixvQkFBb0I7QUFBQSxRQUNwQixrQkFBa0I7QUFBQSxRQUNsQixhQUFhO0FBQUEsUUFDYixhQUFhO0FBQUEsUUFDYixhQUFhO0FBQUEsUUFDYixrQkFBa0I7QUFBQSxRQUNsQixZQUFZO0FBQUEsUUFDWixZQUFZO0FBQUEsUUFDWixrQkFBa0I7QUFBQSxRQUNsQixlQUFlO0FBQUEsUUFDZixnQkFBZ0I7QUFBQSxRQUNoQixnQkFBZ0IsTUFBTTtBQUNwQix1QkFBYSxFQUFFLFlBQVksTUFBTSxNQUFNLEVBQUUsQ0FBQztBQUFBLFFBQzVDO0FBQUE7QUFBQSxJQUNGO0FBQUEsSUFHRiw2Q0FBQyxXQUFNLE1BQUssVUFBUyxJQUFHLFlBQVcsT0FBTyxlQUFlLFVBQVEsTUFBQztBQUFBLElBQ2xFLDZDQUFDLFdBQU0sTUFBSyxVQUFTLElBQUcsVUFBUyxPQUFPLGFBQWEsVUFBUSxNQUFDO0FBQUEsSUFFOUQ7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQSxZQUFZO0FBQUEsUUFDWjtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQSxZQUFZO0FBQUEsUUFDWjtBQUFBLFFBQ0EsWUFBWTtBQUFBLFFBQ1osY0FBYztBQUFBO0FBQUEsSUFDaEI7QUFBQSxJQUNDLGtCQUNDO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQyxPQUFNO0FBQUEsUUFDTixXQUFXO0FBQUEsUUFDWCxNQUFNO0FBQUEsUUFDTixPQUFPO0FBQUEsUUFDUCxRQUFRO0FBQUE7QUFBQSxJQUNWO0FBQUEsS0FFSjtBQUVKO0FBR08sSUFBTSxtQkFBbUIsQ0FBQyxTQUFzQjtBQUNyRCxRQUFNLGtCQUFrQixLQUFLLGFBQWEsbUJBQW1CLEtBQUs7QUFDbEUsUUFBTSxnQkFBZ0IsS0FBSyxhQUFhLGlCQUFpQixLQUFLO0FBQzlELFFBQU0sWUFBWSxLQUFLLGFBQWEsaUJBQWlCLEtBQUs7QUFDMUQsUUFBTSxXQUFXLEtBQUssYUFBYSxpQkFBaUIsS0FBSztBQUN6RCxRQUFNLHNCQUFzQixLQUFLLGFBQWEsMkJBQTJCLEtBQUs7QUFFOUU7QUFBQSxJQUNFO0FBQUEsSUFDQTtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0M7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUE7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGO0FBRUEsSUFBTSxRQUFRLE1BQU07QUFDbEIsUUFBTSxTQUFTLFNBQVMsZUFBZSxzQkFBc0I7QUFDN0QsTUFBSSxDQUFDLE9BQVE7QUFDYixtQkFBaUIsTUFBTTtBQUN6QjtBQUVBLHVCQUF1QixLQUFLO0FBRTVCLElBQU8sc0JBQVE7IiwKICAibmFtZXMiOiBbImltcG9ydF9yZWFjdCIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgIlJlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfcmVhY3QiLCAibG9nSGlzdG9yeSIsICJ0b0lTTyIsICJpc0JlZm9yZSIsICJmb3JtYXRNb250aExhYmVsIiwgImltcG9ydF9yZWFjdCIsICJub3JtYWxpemVSYW5nZSIsICJpbXBvcnRfcmVhY3QiLCAibG9nSGlzdG9yeSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJsb2dIaXN0b3J5IiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAibG9nSGlzdG9yeSIsICJ0b1RpdGxlQ2FzZSIsICJmb3JtYXREYXRlUGFydHMiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJub3JtYWxpemVSYW5nZSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImxvZ0hpc3RvcnkiLCAicGFyc2VEYXRlVmFsdWUiLCAicGFyc2VJU08iLCAidG9JU08iLCAic3RhcnRPZkRheSIsICJpc0JlZm9yZSIsICJuZXdTdGFydCIsICJpbXBvcnRfanN4X3J1bnRpbWUiXQp9Cg==
