import {
  ClientSearchCombobox_default
} from "./chunks/chunk-FGHGWQVH.js";
import {
  buildVisibleUserByOwnerMap,
  formatModuleVisibleUserLabel,
  getVisibleUserForOwner,
  normalizeOwnerAxUserId,
  useModuleDataVisibility
} from "./chunks/chunk-ATML23VI.js";
import {
  ActionButton_default,
  FilterButton_default,
  HistoryManualDatePicker_default,
  HistorySummary_default
} from "./chunks/chunk-ZYPRLFAC.js";
import {
  CompactPagination_default,
  FloatingActionButton_default,
  useTimelineCardEffects
} from "./chunks/chunk-2YXSM2RQ.js";
import "./chunks/chunk-YMDESVRK.js";
import {
  SelectCombobox_default
} from "./chunks/chunk-5FRAKTKT.js";
import {
  HISTORY_FILTER_KEY,
  HISTORY_RETURN_FLAG_KEY
} from "./chunks/chunk-CBDB7NMA.js";
import {
  setTopbarActionGroupReady
} from "./chunks/chunk-ZBKHPZJX.js";
import "./chunks/chunk-DY2B5JHI.js";
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
var import_react15 = __toESM(require_react());

// Web/wwwroot/react/src/pages/visitas/historial/VisibleVisitOwnerSelect.tsx
var import_react = __toESM(require_react());

// Web/wwwroot/react/src/pages/visitas/historial/historyVisibleOwnerSelection.ts
var HISTORY_VISIBLE_OWNER_ALL_VALUE = "__history_visible_owner_all__";
var normalizeUserId = (value) => String(value || "").trim();
var isSameHistoryVisibleOwner = (left, right) => {
  const normalizedLeft = normalizeOwnerAxUserId(left);
  const normalizedRight = normalizeOwnerAxUserId(right);
  return !!normalizedLeft && normalizedLeft === normalizedRight;
};
var ensureCurrentHistoryVisibleOwnerInList = (users, currentAxUserId) => {
  const normalizedCurrent = normalizeUserId(currentAxUserId);
  const normalizedUsers = Array.isArray(users) ? users : [];
  if (!normalizedCurrent) return normalizedUsers;
  if (normalizedUsers.some((entry) => isSameHistoryVisibleOwner(entry.axUserId, normalizedCurrent))) {
    return normalizedUsers;
  }
  return [
    {
      alias: normalizedCurrent,
      axUserId: normalizedCurrent,
      crmUserId: "",
      name: normalizedCurrent,
      source: "CurrentUserFallback",
      mutationPolicy: "",
      mutationPolicyInt: null,
      mutationPolicyLabel: "",
      canMutate: true
    },
    ...normalizedUsers
  ];
};
var hasHistoryVisibleSubordinates = (users, currentAxUserId) => {
  const normalizedCurrent = normalizeOwnerAxUserId(currentAxUserId);
  if (!normalizedCurrent) return users.length > 1;
  return users.some((entry) => {
    const ownerId = normalizeOwnerAxUserId(entry.axUserId);
    return !!ownerId && ownerId !== normalizedCurrent;
  });
};
var resolveHistoryVisibleOwnerSelection = (requestedOwnerAxUserId, currentAxUserId, users) => {
  const normalizedRequested = normalizeUserId(requestedOwnerAxUserId);
  const normalizedCurrent = normalizeUserId(currentAxUserId);
  if (normalizedRequested && normalizedRequested !== HISTORY_VISIBLE_OWNER_ALL_VALUE) {
    const exact = users.find((entry) => isSameHistoryVisibleOwner(entry.axUserId, normalizedRequested));
    if (exact) return exact.axUserId;
  }
  if (normalizedCurrent) {
    const self = users.find((entry) => isSameHistoryVisibleOwner(entry.axUserId, normalizedCurrent));
    return self?.axUserId || normalizedCurrent;
  }
  return "";
};
var resolveHistoryVisibleOwnerSelectValue = ({
  selectedOwnerAxUserId,
  currentAxUserId,
  users,
  canManageVisibleOwners
}) => {
  if (canManageVisibleOwners) {
    const normalizedSelected = normalizeUserId(selectedOwnerAxUserId);
    if (normalizedSelected && normalizedSelected !== HISTORY_VISIBLE_OWNER_ALL_VALUE) {
      const exact = users.find((entry) => isSameHistoryVisibleOwner(entry.axUserId, normalizedSelected));
      if (exact) return exact.axUserId;
    }
    return HISTORY_VISIBLE_OWNER_ALL_VALUE;
  }
  return resolveHistoryVisibleOwnerSelection(selectedOwnerAxUserId, currentAxUserId, users);
};
var resolveHistoryEffectiveOwnerAxUserId = ({
  selectedOwnerAxUserId,
  currentAxUserId,
  users,
  canManageVisibleOwners
}) => {
  if (canManageVisibleOwners) {
    const normalizedSelected = normalizeUserId(selectedOwnerAxUserId);
    if (!normalizedSelected || normalizedSelected === HISTORY_VISIBLE_OWNER_ALL_VALUE) return "";
    const exact = users.find((entry) => isSameHistoryVisibleOwner(entry.axUserId, normalizedSelected));
    return exact?.axUserId || "";
  }
  return resolveHistoryVisibleOwnerSelection(selectedOwnerAxUserId, currentAxUserId, users);
};

// Web/wwwroot/react/src/pages/visitas/historial/VisibleVisitOwnerSelect.tsx
var import_jsx_runtime = __toESM(require_jsx_runtime());
var VisibleVisitOwnerSelect = ({
  users,
  selectedOwnerAxUserId,
  loading,
  disabled,
  errorMessage,
  label,
  allOption = null,
  noUsersLabel,
  loadingLabel,
  onChange
}) => {
  const options = (0, import_react.useMemo)(() => {
    const ownerOptions = (Array.isArray(users) ? users : []).map((entry) => {
      const axUserId = String(entry.axUserId || "").trim();
      const optionLabel = formatModuleVisibleUserLabel(entry);
      if (!axUserId || !optionLabel) return null;
      return {
        value: axUserId,
        text: optionLabel
      };
    }).filter((entry) => !!entry);
    return allOption ? [allOption, ...ownerOptions] : ownerOptions;
  }, [allOption, users]);
  const hasOptions = options.length > 0;
  const selectedExists = options.some((entry) => entry.value.toUpperCase() === selectedOwnerAxUserId.toUpperCase());
  const value = hasOptions && selectedExists ? selectedOwnerAxUserId : "";
  const statusText = loading ? loadingLabel : errorMessage;
  const selectedTextMode = allOption && value === HISTORY_VISIBLE_OWNER_ALL_VALUE ? "text" : "value";
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "space-y-1", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      SelectCombobox_default,
      {
        label,
        placeholder: hasOptions ? label : noUsersLabel,
        options: hasOptions ? options : [{ value: "", text: noUsersLabel }],
        value,
        onChange: (nextValue) => {
          onChange(nextValue === HISTORY_VISIBLE_OWNER_ALL_VALUE ? "" : nextValue);
        },
        disabled: disabled || loading || !hasOptions,
        idBase: "history-visible-owner",
        portalClassName: "visitas-typography",
        panelClassName: "visitas-typography",
        allowTextInput: true,
        selectedTextMode,
        showLabel: false
      }
    ),
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
  ownerFilterDisabled,
  visibleUsersError,
  ownerAllOption,
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
        disabled: ownerFilterDisabled,
        errorMessage: visibleUsersError,
        label: ownerLabel,
        allOption: ownerAllOption,
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
var import_react2 = __toESM(require_react());
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
var TAP_MOVE_PX = 14;
var HOLD_TO_PREVIEW_MS = 160;
var HistoryTable = ({ items, noDataText, errorMessage, onNavigate }) => {
  const containerRef = (0, import_react2.useRef)(null);
  const tapGuardRef = (0, import_react2.useRef)({
    active: false,
    pointerId: null,
    startX: 0,
    startY: 0,
    startTime: 0,
    moved: false,
    linkId: ""
  });
  const resolveClickableCard = (0, import_react2.useCallback)((target) => {
    const node = target;
    if (!node || typeof node.closest !== "function") return null;
    const card = node.closest(".timeline-card--clickable[data-link-id]");
    if (!card) return null;
    if (!containerRef.current?.contains(card)) return null;
    return card;
  }, []);
  const resetTapGuard = (0, import_react2.useCallback)(() => {
    tapGuardRef.current.active = false;
    tapGuardRef.current.pointerId = null;
    tapGuardRef.current.moved = false;
    tapGuardRef.current.linkId = "";
  }, []);
  const handlePointerDown = (0, import_react2.useCallback)(
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
  const handlePointerMove = (0, import_react2.useCallback)((event) => {
    const state = tapGuardRef.current;
    if (!state.active || event.pointerId !== state.pointerId) return;
    const dx = Math.abs(event.clientX - state.startX);
    const dy = Math.abs(event.clientY - state.startY);
    if (dx > TAP_MOVE_PX || dy > TAP_MOVE_PX) {
      state.moved = true;
    }
  }, []);
  const handlePointerUp = (0, import_react2.useCallback)(
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
  const blockClipboardAction = (0, import_react2.useCallback)(
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
var MemoizedHistoryTable = import_react2.default.memo(HistoryTable);
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
var import_react3 = __toESM(require_react());
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
  const calendar = (0, import_react3.useMemo)(() => {
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
  const handlePrevMonth = (0, import_react3.useCallback)(
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
  const handleNextMonth = (0, import_react3.useCallback)(
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
  const handleGridMouseLeave = (0, import_react3.useCallback)(() => {
    setHoverDate(null);
  }, [setHoverDate]);
  const handleManualDayClick = (0, import_react3.useCallback)(
    (cell) => {
      if (!cell.date) return;
      logHistory2("dayClick", { date: cell.iso || "", disabled: !!cell.disabled });
      handleSelect(cell.date);
    },
    [handleSelect, logHistory2]
  );
  const handleManualDayHover = (0, import_react3.useCallback)(
    (cell) => {
      if (!cell.date) return;
      if (selectingStep === "end" && startDate) {
        setHoverDate(new Date(cell.date));
      }
    },
    [selectingStep, setHoverDate, startDate]
  );
  const manualDayCells = (0, import_react3.useMemo)(() => {
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
var import_react4 = __toESM(require_react());
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
  const applyFilters = (0, import_react4.useCallback)(
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
  const handleClear = (0, import_react4.useCallback)(
    (event) => {
      handleClearState(event);
      clearFilterCache();
      resetActivities();
    },
    [clearFilterCache, handleClearState, resetActivities]
  );
  const handleResetFilters = (0, import_react4.useCallback)(() => {
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
var import_react5 = __toESM(require_react());
var useHistoryInitialLoad = ({
  readyToLoad,
  defaultFromDate,
  defaultToDate,
  didInitFilterRef,
  hasRestoredFilterRef,
  retryOnNetworkErrorRef,
  consumeReturnFlag,
  readCachedFilter,
  applyCachedFilter,
  applyDefaultRangeFromProps,
  resolveOwnerAxUserIdForLoad,
  loadActivities,
  resetActivities,
  resetHistoryFilters,
  clearFilterCache,
  setShowFilters,
  setIsOpen,
  logHistory: logHistory2
}) => {
  (0, import_react5.useEffect)(() => {
    logHistory2("init", { defaultFromDate, defaultToDate });
  }, [defaultFromDate, defaultToDate, logHistory2]);
  (0, import_react5.useEffect)(() => {
    if (!readyToLoad) return;
    if (didInitFilterRef.current) return;
    didInitFilterRef.current = true;
    const withResolvedOwner = (request) => ({
      ...request,
      override: {
        ...request.override,
        ownerAxUserId: resolveOwnerAxUserIdForLoad(request.override.ownerAxUserId)
      }
    });
    const cached = consumeReturnFlag() ? readCachedFilter() : null;
    if (cached && cached.fromDate && cached.toDate) {
      logHistory2("restoreFilter", cached);
      const cachedRequest = applyCachedFilter(cached);
      if (cachedRequest) {
        const resolvedRequest = withResolvedOwner(cachedRequest);
        retryOnNetworkErrorRef.current = true;
        loadActivities(resolvedRequest.page, resolvedRequest.override);
        setShowFilters(false);
        setIsOpen(false);
        hasRestoredFilterRef.current = true;
        return;
      }
    }
    const defaultRequest = applyDefaultRangeFromProps();
    if (defaultRequest) {
      const resolvedRequest = withResolvedOwner(defaultRequest);
      retryOnNetworkErrorRef.current = true;
      loadActivities(resolvedRequest.page, resolvedRequest.override);
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
    readyToLoad,
    readCachedFilter,
    resetActivities,
    resetHistoryFilters,
    retryOnNetworkErrorRef,
    resolveOwnerAxUserIdForLoad,
    setIsOpen,
    setShowFilters,
    logHistory2
  ]);
};

// Web/wwwroot/react/src/pages/visitas/historial/useHistoryLabels.ts
var import_react6 = __toESM(require_react());
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
  const weekDayLabels = (0, import_react6.useMemo)(
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
  const quickFilters = (0, import_react6.useMemo)(
    () => [
      { id: "custom", label: quickCustomLabel },
      { id: "days-7", label: quick7DaysLabel },
      { id: "days-30", label: quick30DaysLabel },
      { id: "days-90", label: quick90DaysLabel }
    ],
    [quick30DaysLabel, quick7DaysLabel, quick90DaysLabel, quickCustomLabel]
  );
  const paginationLabels = (0, import_react6.useMemo)(
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
var import_react7 = __toESM(require_react());
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
  return (0, import_react7.useCallback)(
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
var import_react8 = __toESM(require_react());
var useHistoryPageListeners = ({
  readyToLoad,
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
  resolveOwnerAxUserIdForLoad,
  loadActivities,
  setIsOpen,
  setHoverDate,
  setShowFilters,
  applyFilters
}) => {
  (0, import_react8.useEffect)(() => {
    setTopbarActionGroupReady("history-list-actions");
  }, []);
  (0, import_react8.useEffect)(() => {
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
  (0, import_react8.useEffect)(() => {
    const onPageShow = () => {
      if (!readyToLoad) return;
      if (hasRestoredFilterRef.current) return;
      if (consumeReturnFlag()) {
        const cached = readCachedFilter();
        const cachedRequest = applyCachedFilter(cached);
        if (cachedRequest) {
          const resolvedRequest = {
            ...cachedRequest,
            override: {
              ...cachedRequest.override,
              ownerAxUserId: resolveOwnerAxUserIdForLoad(cachedRequest.override.ownerAxUserId)
            }
          };
          retryOnNetworkErrorRef.current = true;
          loadActivities(resolvedRequest.page, resolvedRequest.override);
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
    readyToLoad,
    retryOnNetworkErrorRef,
    resolveOwnerAxUserIdForLoad,
    setIsOpen,
    setShowFilters
  ]);
  (0, import_react8.useEffect)(() => {
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
      if (!readyToLoad) return;
      applyFilters({ page: currentPage, force: true, closePanel: true });
    };
    window.addEventListener("history-toggle-filter", onToggleFilters);
    window.addEventListener("history-refresh", onRefresh);
    return () => {
      window.removeEventListener("history-toggle-filter", onToggleFilters);
      window.removeEventListener("history-refresh", onRefresh);
    };
  }, [applyFilters, currentPage, readyToLoad, setIsOpen, setShowFilters]);
};

// Web/wwwroot/react/src/pages/visitas/historial/useHistoryPickerStepSync.ts
var import_react9 = __toESM(require_react());
var useHistoryPickerStepSync = ({ startDate, endDate, selectingStep, setSelectingStep }) => {
  (0, import_react9.useEffect)(() => {
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
var import_react10 = __toESM(require_react());
var useHistoryTimelineItems = ({
  items,
  locale,
  noDataText,
  logHistory: logHistory2,
  toTitleCase: toTitleCase2,
  formatDateParts: formatDateParts2
}) => {
  const debugLoggedRef = (0, import_react10.useRef)(0);
  const timelineItems = (0, import_react10.useMemo)(() => {
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
var import_react11 = __toESM(require_react());
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
  const visibleVisitUsers = (0, import_react11.useMemo)(() => {
    return ensureCurrentHistoryVisibleOwnerInList(visibleUsers, axUserId);
  }, [axUserId, visibleUsers]);
  const visibleVisitUserByOwnerAxUserId = (0, import_react11.useMemo)(() => {
    return buildVisibleUserByOwnerMap(visibleVisitUsers);
  }, [visibleVisitUsers]);
  const canManageVisibleOwners = (0, import_react11.useMemo)(() => {
    return visibleUsersReady && hasHistoryVisibleSubordinates(visibleVisitUsers, axUserId);
  }, [axUserId, visibleUsersReady, visibleVisitUsers]);
  const ownerSelectValue = (0, import_react11.useMemo)(() => {
    return resolveHistoryVisibleOwnerSelectValue({
      selectedOwnerAxUserId,
      currentAxUserId: axUserId,
      users: visibleVisitUsers,
      canManageVisibleOwners
    });
  }, [axUserId, canManageVisibleOwners, selectedOwnerAxUserId, visibleVisitUsers]);
  const resolveEffectiveOwnerAxUserId = (0, import_react11.useCallback)(
    (requestedOwnerAxUserId) => {
      return resolveHistoryEffectiveOwnerAxUserId({
        selectedOwnerAxUserId: requestedOwnerAxUserId ?? selectedOwnerAxUserId,
        currentAxUserId: axUserId,
        users: visibleVisitUsers,
        canManageVisibleOwners
      });
    },
    [axUserId, canManageVisibleOwners, selectedOwnerAxUserId, visibleVisitUsers]
  );
  const effectiveSelectedOwnerAxUserId = (0, import_react11.useMemo)(() => {
    return resolveEffectiveOwnerAxUserId(selectedOwnerAxUserId);
  }, [resolveEffectiveOwnerAxUserId, selectedOwnerAxUserId]);
  const selectedOwner = (0, import_react11.useMemo)(() => {
    return getVisibleUserForOwner(visibleVisitUserByOwnerAxUserId, effectiveSelectedOwnerAxUserId);
  }, [effectiveSelectedOwnerAxUserId, visibleVisitUserByOwnerAxUserId]);
  return {
    visibleVisitUsers,
    visibleUsersLoading,
    visibleUsersError,
    visibleUsersReady,
    ownerSelectValue,
    ownerFilterDisabled: !visibleUsersReady || visibleUsersLoading || !canManageVisibleOwners,
    canManageVisibleOwners,
    selectedOwnerText: selectedOwner ? formatModuleVisibleUserLabel(selectedOwner) : "",
    effectiveSelectedOwnerAxUserId,
    resolveEffectiveOwnerAxUserId
  };
};

// Web/wwwroot/react/src/hooks/useHistoryActivities.ts
var import_react12 = __toESM(require_react());
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
  const [items, setItems] = (0, import_react12.useState)([]);
  const [total, setTotal] = (0, import_react12.useState)(0);
  const [currentPage, setCurrentPage] = (0, import_react12.useState)(1);
  const [isLoading, setIsLoading] = (0, import_react12.useState)(false);
  const [errorMessage, setErrorMessage] = (0, import_react12.useState)("");
  const retryOnNetworkErrorRef = (0, import_react12.useRef)(false);
  const activeAbortRef = (0, import_react12.useRef)(null);
  const activeRequestIdRef = (0, import_react12.useRef)(0);
  const retryTimerRef = (0, import_react12.useRef)(null);
  const lastSignatureRef = (0, import_react12.useRef)("");
  const clearRetryTimer = (0, import_react12.useCallback)(() => {
    if (retryTimerRef.current) {
      clearTimeout(retryTimerRef.current);
      retryTimerRef.current = null;
    }
  }, []);
  const abortActiveRequest = (0, import_react12.useCallback)(() => {
    if (!activeAbortRef.current) return;
    try {
      activeAbortRef.current.abort();
    } catch {
    }
    activeAbortRef.current = null;
  }, []);
  const resetActivities = (0, import_react12.useCallback)(() => {
    clearRetryTimer();
    abortActiveRequest();
    setItems([]);
    setTotal(0);
    setErrorMessage("");
    setIsLoading(false);
  }, [abortActiveRequest, clearRetryTimer]);
  const loadActivities = (0, import_react12.useCallback)(
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
  (0, import_react12.useEffect)(() => {
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
var import_react13 = __toESM(require_react());
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
  const readCachedFilter = (0, import_react13.useCallback)(() => {
    const parsed = getSessionJsonWithExpiry(HISTORY_FILTER_KEY);
    return normalizeCachedFilter(parsed);
  }, []);
  const clearFilterCache = (0, import_react13.useCallback)(() => {
    removeSessionValueWithExpiry(HISTORY_FILTER_KEY);
    removeSessionValueWithExpiry(HISTORY_RETURN_FLAG_KEY);
  }, []);
  const consumeReturnFlag = (0, import_react13.useCallback)(() => {
    const raw = getSessionValueWithExpiry(HISTORY_RETURN_FLAG_KEY);
    if (raw === "1") {
      removeSessionValueWithExpiry(HISTORY_RETURN_FLAG_KEY);
      return true;
    }
    return false;
  }, []);
  const saveCachedFilter = (0, import_react13.useCallback)((filter) => {
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
var import_react14 = __toESM(require_react());
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
  const resolveQuickFilterFromRange = (0, import_react14.useCallback)(
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
  const [startDate, setStartDate] = (0, import_react14.useState)(null);
  const [endDate, setEndDate] = (0, import_react14.useState)(null);
  const [manualStartDate, setManualStartDate] = (0, import_react14.useState)(null);
  const [manualEndDate, setManualEndDate] = (0, import_react14.useState)(null);
  const [hoverDate, setHoverDate] = (0, import_react14.useState)(null);
  const [selectingStep, setSelectingStep] = (0, import_react14.useState)("start");
  const [currentMonth, setCurrentMonth] = (0, import_react14.useState)((/* @__PURE__ */ new Date()).getMonth());
  const [currentYear, setCurrentYear] = (0, import_react14.useState)((/* @__PURE__ */ new Date()).getFullYear());
  const [isOpen, setIsOpen] = (0, import_react14.useState)(false);
  const [showManualPickerPanel, setShowManualPickerPanel] = (0, import_react14.useState)(false);
  const [activeQuickFilter, setActiveQuickFilter] = (0, import_react14.useState)(null);
  const [selectedClient, setSelectedClient] = (0, import_react14.useState)(null);
  const [selectedOwnerAxUserId, setSelectedOwnerAxUserId] = (0, import_react14.useState)("");
  const [clientResetKey, setClientResetKey] = (0, import_react14.useState)(0);
  const [showFilters, setShowFilters] = (0, import_react14.useState)(true);
  const [showManualError, setShowManualError] = (0, import_react14.useState)(false);
  const hasRestoredFilterRef = (0, import_react14.useRef)(false);
  const didInitFilterRef = (0, import_react14.useRef)(false);
  const fromDateValue = (0, import_react14.useMemo)(() => startDate ? toISO2(startDate) : "", [startDate, toISO2]);
  const toDateValue = (0, import_react14.useMemo)(() => endDate ? toISO2(endDate) : "", [endDate, toISO2]);
  const accountNumValue = (0, import_react14.useMemo)(() => selectedClient ? selectedClient.value : "", [selectedClient]);
  const validateManualRange = (0, import_react14.useCallback)(() => {
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
  const applyDefaultRangeFromProps = (0, import_react14.useCallback)(() => {
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
  const resetHistoryFilters = (0, import_react14.useCallback)(() => {
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
  const applyCachedFilter = (0, import_react14.useCallback)(
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
  const handleSelect = (0, import_react14.useCallback)(
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
  const handleClearState = (0, import_react14.useCallback)(
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
  const openPopover = (0, import_react14.useCallback)(
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
  const handleActivatorKeyDown = (0, import_react14.useCallback)(
    (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      openPopover("start");
    },
    [openPopover]
  );
  const handleSectionKeyDown = (0, import_react14.useCallback)(
    (event, section) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      event.stopPropagation();
      openPopover(section);
    },
    [openPopover]
  );
  const applyQuickRange = (0, import_react14.useCallback)(
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
  const handleQuickFilter = (0, import_react14.useCallback)(
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
  const handleClientSelected = (0, import_react14.useCallback)((client) => {
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
  const locale = (0, import_react15.useMemo)(() => getUiLocale(), []);
  const canViewHistory = canAccess("VISITAS_GESTION", "View");
  const canCreateVisit = canAccess("VISITAS_GESTION", "Add");
  const noDataText = indT("Common_NoData", "No data");
  const activatorRef = (0, import_react15.useRef)(null);
  const popoverRef = (0, import_react15.useRef)(null);
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
  const {
    visibleVisitUsers,
    visibleUsersLoading,
    visibleUsersError,
    visibleUsersReady,
    ownerSelectValue,
    ownerFilterDisabled,
    canManageVisibleOwners,
    selectedOwnerText,
    effectiveSelectedOwnerAxUserId,
    resolveEffectiveOwnerAxUserId
  } = useHistoryVisibleOwner({
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
    readyToLoad: visibleUsersReady,
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
    resolveOwnerAxUserIdForLoad: resolveEffectiveOwnerAxUserId,
    loadActivities,
    setIsOpen,
    setHoverDate,
    setShowFilters,
    applyFilters
  });
  useHistoryInitialLoad({
    readyToLoad: visibleUsersReady,
    defaultFromDate,
    defaultToDate,
    didInitFilterRef,
    hasRestoredFilterRef,
    retryOnNetworkErrorRef,
    consumeReturnFlag,
    readCachedFilter,
    applyCachedFilter,
    applyDefaultRangeFromProps,
    resolveOwnerAxUserIdForLoad: resolveEffectiveOwnerAxUserId,
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
        selectedOwnerAxUserId: ownerSelectValue,
        visibleUsersLoading,
        ownerFilterDisabled,
        visibleUsersError,
        ownerAllOption: canManageVisibleOwners ? { value: HISTORY_VISIBLE_OWNER_ALL_VALUE, text: ownerAllLabel } : null,
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvaGlzdG9yaWFsL0hpc3RvcnlQYWdlLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9oaXN0b3JpYWwvVmlzaWJsZVZpc2l0T3duZXJTZWxlY3QudHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy92aXNpdGFzL2hpc3RvcmlhbC9oaXN0b3J5VmlzaWJsZU93bmVyU2VsZWN0aW9uLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy92aXNpdGFzL2hpc3RvcmlhbC9IaXN0b3J5RmlsdGVyUGFuZWwudHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy92aXNpdGFzL2hpc3RvcmlhbC9IaXN0b3J5VGFibGUudHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy92aXNpdGFzL2hpc3RvcmlhbC9IaXN0b3J5UmVzdWx0c1NlY3Rpb24udHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy92aXNpdGFzL2hpc3RvcmlhbC91c2VIaXN0b3J5Q2FsZW5kYXJQaWNrZXIudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvaGlzdG9yaWFsL3VzZUhpc3RvcnlGaWx0ZXJBY3Rpb25zLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy92aXNpdGFzL2hpc3RvcmlhbC91c2VIaXN0b3J5SW5pdGlhbExvYWQudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvaGlzdG9yaWFsL3VzZUhpc3RvcnlMYWJlbHMudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvaGlzdG9yaWFsL3VzZUhpc3RvcnlOYXZpZ2F0aW9uLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy92aXNpdGFzL2hpc3RvcmlhbC91c2VIaXN0b3J5UGFnZUxpc3RlbmVycy50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9oaXN0b3JpYWwvdXNlSGlzdG9yeVBpY2tlclN0ZXBTeW5jLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy92aXNpdGFzL2hpc3RvcmlhbC91c2VIaXN0b3J5VGltZWxpbmVJdGVtcy50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9oaXN0b3JpYWwvdXNlSGlzdG9yeVZpc2libGVPd25lci50cyIsICIuLi9yZWFjdC9zcmMvaG9va3MvdXNlSGlzdG9yeUFjdGl2aXRpZXMudHMiLCAiLi4vcmVhY3Qvc3JjL2hvb2tzL3VzZUhpc3RvcnlGaWx0ZXJDYWNoZS50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9oaXN0b3JpYWwvdXNlSGlzdG9yeUZpbHRlcnNTdGF0ZS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IFJlYWN0LCB7IHVzZU1lbW8sIHVzZVJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgeyBjYW5BY2Nlc3MsIHNob3dQZXJtaXNzaW9uTW9kYWwgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvcGVybWlzc2lvbnMudHNcIjtcbmltcG9ydCBIaXN0b3J5U3VtbWFyeSBmcm9tIFwiLi9IaXN0b3J5U3VtbWFyeS50c3hcIjtcbmltcG9ydCBIaXN0b3J5RmlsdGVyUGFuZWwgZnJvbSBcIi4vSGlzdG9yeUZpbHRlclBhbmVsLnRzeFwiO1xuaW1wb3J0IEhpc3RvcnlSZXN1bHRzU2VjdGlvbiBmcm9tIFwiLi9IaXN0b3J5UmVzdWx0c1NlY3Rpb24udHN4XCI7XG5pbXBvcnQgeyB1c2VIaXN0b3J5Q2FsZW5kYXJQaWNrZXIgfSBmcm9tIFwiLi91c2VIaXN0b3J5Q2FsZW5kYXJQaWNrZXIudHNcIjtcbmltcG9ydCB7IHVzZUhpc3RvcnlGaWx0ZXJBY3Rpb25zIH0gZnJvbSBcIi4vdXNlSGlzdG9yeUZpbHRlckFjdGlvbnMudHNcIjtcbmltcG9ydCB7IHVzZUhpc3RvcnlJbml0aWFsTG9hZCB9IGZyb20gXCIuL3VzZUhpc3RvcnlJbml0aWFsTG9hZC50c1wiO1xuaW1wb3J0IHsgdXNlSGlzdG9yeUxhYmVscyB9IGZyb20gXCIuL3VzZUhpc3RvcnlMYWJlbHMudHNcIjtcbmltcG9ydCB7IHVzZUhpc3RvcnlOYXZpZ2F0aW9uIH0gZnJvbSBcIi4vdXNlSGlzdG9yeU5hdmlnYXRpb24udHNcIjtcbmltcG9ydCB7IHVzZUhpc3RvcnlQYWdlTGlzdGVuZXJzIH0gZnJvbSBcIi4vdXNlSGlzdG9yeVBhZ2VMaXN0ZW5lcnMudHNcIjtcbmltcG9ydCB7IHVzZUhpc3RvcnlQaWNrZXJTdGVwU3luYyB9IGZyb20gXCIuL3VzZUhpc3RvcnlQaWNrZXJTdGVwU3luYy50c1wiO1xuaW1wb3J0IHsgdXNlSGlzdG9yeVRpbWVsaW5lSXRlbXMgfSBmcm9tIFwiLi91c2VIaXN0b3J5VGltZWxpbmVJdGVtcy50c1wiO1xuaW1wb3J0IHsgdXNlSGlzdG9yeVZpc2libGVPd25lciB9IGZyb20gXCIuL3VzZUhpc3RvcnlWaXNpYmxlT3duZXIudHNcIjtcbmltcG9ydCB7IEhJU1RPUllfVklTSUJMRV9PV05FUl9BTExfVkFMVUUgfSBmcm9tIFwiLi9oaXN0b3J5VmlzaWJsZU93bmVyU2VsZWN0aW9uLnRzXCI7XG5pbXBvcnQgRmxvYXRpbmdBY3Rpb25CdXR0b24gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9GbG9hdGluZ0FjdGlvbkJ1dHRvbi50c3hcIjtcbmltcG9ydCB7IHVzZUhpc3RvcnlBY3Rpdml0aWVzIH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZUhpc3RvcnlBY3Rpdml0aWVzLnRzXCI7XG5pbXBvcnQgeyB1c2VIaXN0b3J5RmlsdGVyQ2FjaGUgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlSGlzdG9yeUZpbHRlckNhY2hlLnRzXCI7XG5pbXBvcnQgeyB1c2VIaXN0b3J5RmlsdGVyc1N0YXRlIH0gZnJvbSBcIi4vdXNlSGlzdG9yeUZpbHRlcnNTdGF0ZS50c1wiO1xuaW1wb3J0IHsgbW91bnRSZWFjdElzbGFuZCwgbW91bnRXaGVuRG9jdW1lbnRSZWFkeSB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9yZWFjdElzbGFuZC50c3hcIjtcblxudHlwZSBQcm9wcyA9IHtcbiAgZGVmYXVsdEZyb21EYXRlPzogc3RyaW5nO1xuICBkZWZhdWx0VG9EYXRlPzogc3RyaW5nO1xuICBjb21wYW55SWQ/OiBzdHJpbmc7XG4gIGF4VXNlcklkPzogc3RyaW5nO1xuICBwZXJtaXNzaW9uc1JldmlzaW9uPzogc3RyaW5nO1xufTtcblxyXG5jb25zdCBQQUdFX1NJWkUgPSA2O1xuY29uc3QgUEFHRV9XSU5ET1cgPSA2O1xyXG5jb25zdCBOQVZfREVMQVlfTVMgPSAzMjA7XHJcbmNvbnN0IEZBQl9CQVNFX0JPVFRPTSA9IDMyO1xyXG5cclxuY29uc3Qgbm9ybWFsaXplVWlMb2NhbGUgPSAobG9jYWxlOiBzdHJpbmcpID0+IHtcclxuICBjb25zdCB2YWx1ZSA9IFN0cmluZyhsb2NhbGUgfHwgXCJcIikudHJpbSgpO1xyXG4gIGlmICghdmFsdWUpIHJldHVybiBcImVzLUVTXCI7XHJcbiAgaWYgKC9eemgtaGFucy9pLnRlc3QodmFsdWUpKSByZXR1cm4gXCJ6aC1DTlwiO1xyXG4gIHJldHVybiB2YWx1ZTtcclxufTtcclxuXHJcbmNvbnN0IGlzQmFzcXVlTG9jYWxlID0gKGxvY2FsZTogc3RyaW5nKSA9PiAvXmV1XFxiL2kudGVzdChTdHJpbmcobG9jYWxlIHx8IFwiXCIpKTtcclxuXHJcbmNvbnN0IEJBU1FVRV9NT05USFMgPSBbXHJcbiAgXCJ1cnRhcnJpbGFcIixcclxuICBcIm90c2FpbGFcIixcclxuICBcIm1hcnR4b2FcIixcclxuICBcImFwaXJpbGFcIixcclxuICBcIm1haWF0emFcIixcclxuICBcImVrYWluYVwiLFxyXG4gIFwidXp0YWlsYVwiLFxyXG4gIFwiYWJ1enR1YVwiLFxyXG4gIFwiaXJhaWxhXCIsXHJcbiAgXCJ1cnJpYVwiLFxyXG4gIFwiYXphcm9hXCIsXHJcbiAgXCJhYmVuZHVhXCIsXHJcbl07XHJcblxyXG5jb25zdCBCQVNRVUVfTU9OVEhTX1NIT1JUID0gW1xuICBcInVydFwiLFxyXG4gIFwib3RzXCIsXHJcbiAgXCJtYXJcIixcclxuICBcImFwaVwiLFxyXG4gIFwibWFpXCIsXHJcbiAgXCJla2FcIixcclxuICBcInV6dFwiLFxyXG4gIFwiYWJ1XCIsXHJcbiAgXCJpcmFcIixcclxuICBcInVyclwiLFxyXG4gIFwiYXphXCIsXHJcbiAgXCJhYmVcIixcbl07XG5cbmNvbnN0IFpIX01PTlRIX1lFQVJfRk9STUFUVEVSID0gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQoXCJ6aC1DTlwiLCB7IHllYXI6IFwibnVtZXJpY1wiLCBtb250aDogXCJsb25nXCIgfSk7XG5cbmNvbnN0IGdldFVpTG9jYWxlID0gKCkgPT4ge1xyXG4gIGNvbnN0IGZyb21IdG1sID0gdHlwZW9mIGRvY3VtZW50ICE9PSBcInVuZGVmaW5lZFwiID8gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmxhbmcgOiBcIlwiO1xyXG4gIGlmIChmcm9tSHRtbCAmJiBTdHJpbmcoZnJvbUh0bWwpLnRyaW0oKSkgcmV0dXJuIG5vcm1hbGl6ZVVpTG9jYWxlKGZyb21IdG1sKTtcclxuICByZXR1cm4gXCJlcy1FU1wiO1xyXG59O1xyXG5cclxuY29uc3QgcGFkID0gKG46IG51bWJlcikgPT4gbi50b1N0cmluZygpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcclxuXHJcbmNvbnN0IHRvSVNPID0gKGQ6IERhdGUpID0+IGAke2QuZ2V0RnVsbFllYXIoKX0tJHtwYWQoZC5nZXRNb250aCgpICsgMSl9LSR7cGFkKGQuZ2V0RGF0ZSgpKX1gO1xyXG5cclxuY29uc3Qgc3RhcnRPZkRheSA9IChkOiBEYXRlKSA9PiBuZXcgRGF0ZShkLmdldEZ1bGxZZWFyKCksIGQuZ2V0TW9udGgoKSwgZC5nZXREYXRlKCkpO1xyXG5cclxuY29uc3QgcGFyc2VJU08gPSAoczogc3RyaW5nKSA9PiB7XHJcbiAgaWYgKCFzKSByZXR1cm4gbnVsbDtcclxuICBjb25zdCBwYXJ0cyA9IHMuc3BsaXQoXCItXCIpLm1hcChOdW1iZXIpO1xyXG4gIGlmIChwYXJ0cy5sZW5ndGggIT09IDMpIHJldHVybiBudWxsO1xyXG4gIHJldHVybiBuZXcgRGF0ZShwYXJ0c1swXSwgcGFydHNbMV0gLSAxLCBwYXJ0c1syXSk7XHJcbn07XHJcblxyXG5jb25zdCBpc0JlZm9yZSA9IChhOiBEYXRlIHwgbnVsbCwgYjogRGF0ZSB8IG51bGwpID0+ICEhKGEgJiYgYiAmJiBhLmdldFRpbWUoKSA8IGIuZ2V0VGltZSgpKTtcblxuY29uc3Qgbm9ybWFsaXplUmFuZ2UgPSAoZnJvbTogc3RyaW5nLCB0bzogc3RyaW5nKSA9PiB7XG4gIGlmICghZnJvbSB8fCAhdG8pIHJldHVybiB7IGZyb20sIHRvIH07XG4gIGNvbnN0IGZyb21EYXRlID0gcGFyc2VJU08oZnJvbSk7XG4gIGNvbnN0IHRvRGF0ZSA9IHBhcnNlSVNPKHRvKTtcbiAgaWYgKCFmcm9tRGF0ZSB8fCAhdG9EYXRlKSByZXR1cm4geyBmcm9tLCB0byB9O1xuICBpZiAoaXNCZWZvcmUodG9EYXRlLCBmcm9tRGF0ZSkpIHtcbiAgICByZXR1cm4geyBmcm9tOiB0b0lTTyh0b0RhdGUpLCB0bzogdG9JU08oZnJvbURhdGUpIH07XG4gIH1cbiAgcmV0dXJuIHsgZnJvbTogdG9JU08oZnJvbURhdGUpLCB0bzogdG9JU08odG9EYXRlKSB9O1xufTtcblxuY29uc3QgZm9ybWF0RGlzcGxheSA9IChkOiBEYXRlLCBsb2NhbGU6IHN0cmluZykgPT4ge1xuICBpZiAoaXNCYXNxdWVMb2NhbGUobG9jYWxlKSkge1xuICAgIGNvbnN0IG1vbnRoID0gQkFTUVVFX01PTlRIU19TSE9SVFtkLmdldE1vbnRoKCldO1xuICAgIHJldHVybiBgJHtkLmdldERhdGUoKX0gJHttb250aH0gJHtkLmdldEZ1bGxZZWFyKCl9YC50b0xvd2VyQ2FzZSgpO1xuICB9XHJcbiAgcmV0dXJuIGRcclxuICAgIC50b0xvY2FsZURhdGVTdHJpbmcobG9jYWxlLCB7XHJcbiAgICAgIGRheTogXCJudW1lcmljXCIsXHJcbiAgICAgIG1vbnRoOiBcInNob3J0XCIsXHJcbiAgICAgIHllYXI6IFwibnVtZXJpY1wiLFxyXG4gICAgfSlcclxuICAgIC5yZXBsYWNlKC9cXC4vZywgXCJcIilcclxuICAgIC50b0xvd2VyQ2FzZSgpO1xyXG59O1xyXG5cclxuY29uc3QgZm9ybWF0TW9udGhMYWJlbCA9IChkOiBEYXRlLCBsb2NhbGU6IHN0cmluZykgPT4ge1xuICBpZiAoL156aC9pLnRlc3QobG9jYWxlKSkge1xuICAgIHJldHVybiBaSF9NT05USF9ZRUFSX0ZPUk1BVFRFUi5mb3JtYXQoZCk7XG4gIH1cbiAgaWYgKGlzQmFzcXVlTG9jYWxlKGxvY2FsZSkpIHtcclxuICAgIHJldHVybiBgJHtCQVNRVUVfTU9OVEhTW2QuZ2V0TW9udGgoKV19ICR7ZC5nZXRGdWxsWWVhcigpfWA7XHJcbiAgfVxyXG4gIGNvbnN0IG1vbnRoTmFtZSA9IGQudG9Mb2NhbGVEYXRlU3RyaW5nKGxvY2FsZSwgeyBtb250aDogXCJsb25nXCIgfSk7XHJcbiAgY29uc3QgY2FwTW9udGhOYW1lID0gbW9udGhOYW1lICYmIC9bQS1aYS16XS8udGVzdChtb250aE5hbWVbMF0pXHJcbiAgICA/IG1vbnRoTmFtZVswXS50b0xvY2FsZVVwcGVyQ2FzZShsb2NhbGUpICsgbW9udGhOYW1lLnNsaWNlKDEpXHJcbiAgICA6IG1vbnRoTmFtZTtcclxuICByZXR1cm4gYCR7Y2FwTW9udGhOYW1lfSAke2QuZ2V0RnVsbFllYXIoKX1gO1xyXG59O1xyXG5cclxuY29uc3QgcGFyc2VEYXRlVmFsdWUgPSAodmFsdWU6IHN0cmluZykgPT4ge1xyXG4gIGlmICghdmFsdWUpIHJldHVybiBudWxsO1xyXG4gIGNvbnN0IHJhdyA9IFN0cmluZyh2YWx1ZSkudHJpbSgpO1xyXG4gIGlmICghcmF3KSByZXR1cm4gbnVsbDtcclxuXHJcbiAgY29uc3QgZGF0ZVBhcnQgPSByYXcuc3BsaXQoXCJUXCIpWzBdLnNwbGl0KFwiIFwiKVswXTtcclxuXHJcbiAgaWYgKC9eXFxkezR9LVxcZHsyfS1cXGR7Mn0kLy50ZXN0KGRhdGVQYXJ0KSkge1xyXG4gICAgY29uc3QgW3ksIG0sIGRdID0gZGF0ZVBhcnQuc3BsaXQoXCItXCIpLm1hcChOdW1iZXIpO1xyXG4gICAgcmV0dXJuIG5ldyBEYXRlKHksIG0gLSAxLCBkKTtcclxuICB9XHJcblxyXG4gIGlmICgvXlxcZHsyfVsuLy1dXFxkezJ9Wy4vLV1cXGR7NH0kLy50ZXN0KGRhdGVQYXJ0KSkge1xyXG4gICAgY29uc3QgcGFydHMgPSBkYXRlUGFydC5zcGxpdCgvWy4vLV0vKS5tYXAoTnVtYmVyKTtcclxuICAgIGNvbnN0IFtkLCBtLCB5XSA9IHBhcnRzO1xyXG4gICAgcmV0dXJuIG5ldyBEYXRlKHksIG0gLSAxLCBkKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHBhcnNlZCA9IG5ldyBEYXRlKHJhdyk7XHJcbiAgcmV0dXJuIE51bWJlci5pc05hTihwYXJzZWQuZ2V0VGltZSgpKSA/IG51bGwgOiBwYXJzZWQ7XHJcbn07XHJcblxyXG5jb25zdCBmb3JtYXREYXRlUGFydHMgPSAodmFsdWU6IHN0cmluZywgbG9jYWxlOiBzdHJpbmcpID0+IHtcclxuICBpZiAoIXZhbHVlKSByZXR1cm4geyB5ZWFyOiBcIlwiLCBtb250aDogXCJcIiwgZGF5OiBcIlwiIH07XHJcbiAgY29uc3QgZCA9IHBhcnNlRGF0ZVZhbHVlKHZhbHVlKTtcclxuICBpZiAoIWQpIHJldHVybiB7IHllYXI6IFwiXCIsIG1vbnRoOiBcIlwiLCBkYXk6IFwiXCIgfTtcclxuICBsZXQgbW9udGggPSBcIlwiO1xyXG4gIGlmIChpc0Jhc3F1ZUxvY2FsZShsb2NhbGUpKSB7XHJcbiAgICBtb250aCA9IEJBU1FVRV9NT05USFNfU0hPUlRbZC5nZXRNb250aCgpXSB8fCBcIlwiO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBtb250aCA9IGQudG9Mb2NhbGVEYXRlU3RyaW5nKGxvY2FsZSwgeyBtb250aDogXCJzaG9ydFwiIH0pLnJlcGxhY2UoL1xcLi9nLCBcIlwiKTtcclxuICB9XHJcbiAgcmV0dXJuIHtcclxuICAgIHllYXI6IFN0cmluZyhkLmdldEZ1bGxZZWFyKCkpLFxyXG4gICAgbW9udGg6IG1vbnRoLnRvVXBwZXJDYXNlKCksXHJcbiAgICBkYXk6IFN0cmluZyhkLmdldERhdGUoKSkucGFkU3RhcnQoMiwgXCIwXCIpLFxyXG4gIH07XHJcbn07XHJcblxyXG5jb25zdCB0b1RpdGxlQ2FzZSA9ICh2YWx1ZTogc3RyaW5nLCBsb2NhbGU6IHN0cmluZykgPT4ge1xyXG4gIGlmICghdmFsdWUpIHJldHVybiBcIlwiO1xyXG4gIGNvbnN0IGxvd2VyID0gdmFsdWUudG9Mb2NhbGVMb3dlckNhc2UobG9jYWxlKTtcclxuICB0cnkge1xyXG4gICAgcmV0dXJuIGxvd2VyLnJlcGxhY2UoLyhefFteXFxwe0x9XSkoXFxwe0x9KS9ndSwgKF9tYXRjaCwgcHJlZml4LCBjaCkgPT4gYCR7cHJlZml4fSR7Y2gudG9Mb2NhbGVVcHBlckNhc2UobG9jYWxlKX1gKTtcclxuICB9IGNhdGNoIHtcclxuICAgIHJldHVybiBsb3dlci5yZXBsYWNlKC8oXnxbXFxzLS9dKShcXFMpL2csIChfbWF0Y2gsIHByZWZpeCwgY2gpID0+IGAke3ByZWZpeH0ke2NoLnRvTG9jYWxlVXBwZXJDYXNlKGxvY2FsZSl9YCk7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgbG9nSGlzdG9yeSA9IChtZXNzYWdlOiBzdHJpbmcsIGRhdGE/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPikgPT4ge1xuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuO1xyXG4gIGNvbnN0IGRlYnVnRmxhZyA9ICh3aW5kb3cgYXMgYW55KS5fX0lORF9ERUJVR19ISVNUT1JZX187XHJcbiAgaWYgKGRlYnVnRmxhZyAhPT0gdHJ1ZSkgcmV0dXJuO1xyXG4gIGlmIChkYXRhKSB7XHJcbiAgICBjb25zb2xlLmRlYnVnKFwiW0hpc3RvcnldXCIsIG1lc3NhZ2UsIGRhdGEpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBjb25zb2xlLmRlYnVnKFwiW0hpc3RvcnldXCIsIG1lc3NhZ2UpO1xyXG4gIH1cclxufTtcclxuXHJcbi8vIEhpc3RvcnkgcGFnZSB3aXRoIFJlYWN0IHN0YXRlICsgZWZmZWN0cyAobm8gbGVnYWN5IERPTSBsb2dpYykuXHJcbmV4cG9ydCBjb25zdCBIaXN0b3J5UGFnZSA9ICh7XG4gIGRlZmF1bHRGcm9tRGF0ZSA9IFwiXCIsXG4gIGRlZmF1bHRUb0RhdGUgPSBcIlwiLFxuICBjb21wYW55SWQgPSBcIlwiLFxuICBheFVzZXJJZCA9IFwiXCIsXG4gIHBlcm1pc3Npb25zUmV2aXNpb24gPSBcIlwiLFxufTogUHJvcHMpID0+IHtcbiAgY29uc3QgbG9jYWxlID0gdXNlTWVtbygoKSA9PiBnZXRVaUxvY2FsZSgpLCBbXSk7XG4gIGNvbnN0IGNhblZpZXdIaXN0b3J5ID0gY2FuQWNjZXNzKFwiVklTSVRBU19HRVNUSU9OXCIsIFwiVmlld1wiKTtcbiAgY29uc3QgY2FuQ3JlYXRlVmlzaXQgPSBjYW5BY2Nlc3MoXCJWSVNJVEFTX0dFU1RJT05cIiwgXCJBZGRcIik7XG4gIGNvbnN0IG5vRGF0YVRleHQgPSBpbmRUKFwiQ29tbW9uX05vRGF0YVwiLCBcIk5vIGRhdGFcIik7XG5cbiAgY29uc3QgYWN0aXZhdG9yUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IHBvcG92ZXJSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcblxyXG4gIGNvbnN0IHsgcmVhZENhY2hlZEZpbHRlciwgY2xlYXJGaWx0ZXJDYWNoZSwgY29uc3VtZVJldHVybkZsYWcsIHNhdmVDYWNoZWRGaWx0ZXIgfSA9IHVzZUhpc3RvcnlGaWx0ZXJDYWNoZSgpO1xyXG4gIGNvbnN0IHtcbiAgICBzdGFydERhdGUsIGVuZERhdGUsIGhvdmVyRGF0ZSwgc2VsZWN0aW5nU3RlcCwgY3VycmVudE1vbnRoLCBjdXJyZW50WWVhciwgaXNPcGVuLCBzaG93TWFudWFsUGlja2VyUGFuZWwsXG4gICAgYWN0aXZlUXVpY2tGaWx0ZXIsIHNlbGVjdGVkQ2xpZW50LCBzZWxlY3RlZE93bmVyQXhVc2VySWQsIGNsaWVudFJlc2V0S2V5LCBzaG93RmlsdGVycywgc2hvd01hbnVhbEVycm9yLFxuICAgIGZyb21EYXRlVmFsdWUsIHRvRGF0ZVZhbHVlLCBhY2NvdW50TnVtVmFsdWUsIGhhc1Jlc3RvcmVkRmlsdGVyUmVmLCBkaWRJbml0RmlsdGVyUmVmLFxuICAgIHNldEhvdmVyRGF0ZSwgc2V0U2VsZWN0aW5nU3RlcCwgc2V0Q3VycmVudE1vbnRoLCBzZXRDdXJyZW50WWVhciwgc2V0SXNPcGVuLCBzZXRTaG93RmlsdGVycywgc2V0U2hvd01hbnVhbEVycm9yLFxuICAgIHNldFNlbGVjdGVkT3duZXJBeFVzZXJJZCwgdmFsaWRhdGVNYW51YWxSYW5nZSwgYXBwbHlEZWZhdWx0UmFuZ2VGcm9tUHJvcHMsIHJlc2V0SGlzdG9yeUZpbHRlcnMsIGFwcGx5Q2FjaGVkRmlsdGVyLFxuICAgIGhhbmRsZVNlbGVjdCwgaGFuZGxlQ2xlYXJTdGF0ZSwgb3BlblBvcG92ZXIsIGhhbmRsZUFjdGl2YXRvcktleURvd24sIGhhbmRsZVNlY3Rpb25LZXlEb3duLCBoYW5kbGVRdWlja0ZpbHRlcixcbiAgICBoYW5kbGVDbGllbnRTZWxlY3RlZCxcbiAgfSA9IHVzZUhpc3RvcnlGaWx0ZXJzU3RhdGUoe1xuICAgIGRlZmF1bHRGcm9tRGF0ZSxcbiAgICBkZWZhdWx0VG9EYXRlLFxuICAgIGxvZ0hpc3RvcnksXG4gICAgcGFyc2VEYXRlVmFsdWUsXG4gICAgcGFyc2VJU08sXHJcbiAgICB0b0lTTyxcclxuICAgIHN0YXJ0T2ZEYXksXHJcbiAgICBpc0JlZm9yZSxcbiAgfSk7XG5cbiAgY29uc3Qge1xuICAgIHZpc2libGVWaXNpdFVzZXJzLFxuICAgIHZpc2libGVVc2Vyc0xvYWRpbmcsXG4gICAgdmlzaWJsZVVzZXJzRXJyb3IsXG4gICAgdmlzaWJsZVVzZXJzUmVhZHksXG4gICAgb3duZXJTZWxlY3RWYWx1ZSxcbiAgICBvd25lckZpbHRlckRpc2FibGVkLFxuICAgIGNhbk1hbmFnZVZpc2libGVPd25lcnMsXG4gICAgc2VsZWN0ZWRPd25lclRleHQsXG4gICAgZWZmZWN0aXZlU2VsZWN0ZWRPd25lckF4VXNlcklkLFxuICAgIHJlc29sdmVFZmZlY3RpdmVPd25lckF4VXNlcklkLFxuICB9ID1cbiAgICB1c2VIaXN0b3J5VmlzaWJsZU93bmVyKHtcbiAgICAgIGVuYWJsZWQ6IGNhblZpZXdIaXN0b3J5LFxuICAgICAgY29tcGFueUlkLFxuICAgICAgYXhVc2VySWQsXG4gICAgICBwZXJtaXNzaW9uc1JldmlzaW9uLFxuICAgICAgc2VsZWN0ZWRPd25lckF4VXNlcklkLFxuICAgICAgb25EZWJ1ZzogbG9nSGlzdG9yeSxcbiAgICB9KTtcblxuICBjb25zdCB7IGl0ZW1zLCB0b3RhbCwgY3VycmVudFBhZ2UsIGlzTG9hZGluZywgZXJyb3JNZXNzYWdlLCBsb2FkQWN0aXZpdGllcywgcmVzZXRBY3Rpdml0aWVzLCByZXRyeU9uTmV0d29ya0Vycm9yUmVmLCBsYXN0U2lnbmF0dXJlUmVmIH0gPVxuICAgIHVzZUhpc3RvcnlBY3Rpdml0aWVzKHtcbiAgICAgIGZyb21EYXRlVmFsdWUsXG4gICAgICB0b0RhdGVWYWx1ZSxcbiAgICAgIGFjY291bnROdW1WYWx1ZSxcbiAgICAgIG93bmVyQXhVc2VySWRWYWx1ZTogZWZmZWN0aXZlU2VsZWN0ZWRPd25lckF4VXNlcklkLFxuICAgICAgcGFnZVNpemU6IFBBR0VfU0laRSxcbiAgICAgIG5vcm1hbGl6ZVJhbmdlLFxuICAgICAgb25Gb3JiaWRkZW46IHNob3dQZXJtaXNzaW9uTW9kYWwsXG4gICAgICBvbkRlYnVnOiBsb2dIaXN0b3J5LFxuICAgIH0pO1xuXHJcbiAgY29uc3QgeyBhcHBseUZpbHRlcnMsIGhhbmRsZUNsZWFyLCBoYW5kbGVSZXNldEZpbHRlcnMgfSA9IHVzZUhpc3RvcnlGaWx0ZXJBY3Rpb25zKHtcbiAgICBzdGFydERhdGUsXG4gICAgZW5kRGF0ZSxcbiAgICBmcm9tRGF0ZVZhbHVlLFxuICAgIHRvRGF0ZVZhbHVlLFxuICAgIGFjY291bnROdW1WYWx1ZSxcbiAgICBvd25lckF4VXNlcklkVmFsdWU6IGVmZmVjdGl2ZVNlbGVjdGVkT3duZXJBeFVzZXJJZCxcbiAgICBsYXN0U2lnbmF0dXJlUmVmLFxuICAgIHZhbGlkYXRlTWFudWFsUmFuZ2UsXG4gICAgbm9ybWFsaXplUmFuZ2UsXG4gICAgbG9hZEFjdGl2aXRpZXMsXG4gICAgaGFuZGxlQ2xlYXJTdGF0ZSxcbiAgICBjbGVhckZpbHRlckNhY2hlLFxuICAgIHJlc2V0QWN0aXZpdGllcyxcbiAgICByZXNldEhpc3RvcnlGaWx0ZXJzLFxuICAgIHNldElzT3BlbixcbiAgICBzZXRTaG93RmlsdGVycyxcbiAgICBzZXRTaG93TWFudWFsRXJyb3IsXG4gIH0pO1xuXHJcbiAgY29uc3QgdG90YWxQYWdlcyA9IE1hdGguY2VpbCgodG90YWwgfHwgMCkgLyBQQUdFX1NJWkUpO1xyXG5cclxuICB1c2VIaXN0b3J5UGFnZUxpc3RlbmVycyh7XG4gICAgcmVhZHlUb0xvYWQ6IHZpc2libGVVc2Vyc1JlYWR5LFxuICAgIGlzT3BlbixcbiAgICBhY3RpdmF0b3JSZWYsXG4gICAgcG9wb3ZlclJlZixcclxuICAgIGhhc1Jlc3RvcmVkRmlsdGVyUmVmLFxyXG4gICAgcmV0cnlPbk5ldHdvcmtFcnJvclJlZixcclxuICAgIGN1cnJlbnRQYWdlLFxyXG4gICAgbG9nSGlzdG9yeSxcclxuICAgIGNvbnN1bWVSZXR1cm5GbGFnLFxuICAgIHJlYWRDYWNoZWRGaWx0ZXIsXG4gICAgYXBwbHlDYWNoZWRGaWx0ZXIsXG4gICAgcmVzb2x2ZU93bmVyQXhVc2VySWRGb3JMb2FkOiByZXNvbHZlRWZmZWN0aXZlT3duZXJBeFVzZXJJZCxcbiAgICBsb2FkQWN0aXZpdGllcyxcbiAgICBzZXRJc09wZW4sXHJcbiAgICBzZXRIb3ZlckRhdGUsXHJcbiAgICBzZXRTaG93RmlsdGVycyxcclxuICAgIGFwcGx5RmlsdGVycyxcbiAgfSk7XG5cbiAgdXNlSGlzdG9yeUluaXRpYWxMb2FkKHtcbiAgICByZWFkeVRvTG9hZDogdmlzaWJsZVVzZXJzUmVhZHksXG4gICAgZGVmYXVsdEZyb21EYXRlLFxuICAgIGRlZmF1bHRUb0RhdGUsXG4gICAgZGlkSW5pdEZpbHRlclJlZixcbiAgICBoYXNSZXN0b3JlZEZpbHRlclJlZixcbiAgICByZXRyeU9uTmV0d29ya0Vycm9yUmVmLFxuICAgIGNvbnN1bWVSZXR1cm5GbGFnLFxuICAgIHJlYWRDYWNoZWRGaWx0ZXIsXG4gICAgYXBwbHlDYWNoZWRGaWx0ZXIsXG4gICAgYXBwbHlEZWZhdWx0UmFuZ2VGcm9tUHJvcHMsXG4gICAgcmVzb2x2ZU93bmVyQXhVc2VySWRGb3JMb2FkOiByZXNvbHZlRWZmZWN0aXZlT3duZXJBeFVzZXJJZCxcbiAgICBsb2FkQWN0aXZpdGllcyxcbiAgICByZXNldEFjdGl2aXRpZXMsXG4gICAgcmVzZXRIaXN0b3J5RmlsdGVycyxcbiAgICBjbGVhckZpbHRlckNhY2hlLFxuICAgIHNldFNob3dGaWx0ZXJzLFxuICAgIHNldElzT3BlbixcbiAgICBsb2dIaXN0b3J5LFxuICB9KTtcblxyXG4gIHVzZUhpc3RvcnlQaWNrZXJTdGVwU3luYyh7IHN0YXJ0RGF0ZSwgZW5kRGF0ZSwgc2VsZWN0aW5nU3RlcCwgc2V0U2VsZWN0aW5nU3RlcCB9KTtcblxyXG4gIGNvbnN0IGhhbmRsZU5hdmlnYXRlID0gdXNlSGlzdG9yeU5hdmlnYXRpb24oe1xuICAgIGNhblZpZXdIaXN0b3J5LFxuICAgIGN1cnJlbnRQYWdlLFxuICAgIGZyb21EYXRlVmFsdWUsXG4gICAgdG9EYXRlVmFsdWUsXG4gICAgc2VsZWN0ZWRDbGllbnQsXG4gICAgb3duZXJBeFVzZXJJZDogZWZmZWN0aXZlU2VsZWN0ZWRPd25lckF4VXNlcklkLFxuICAgIG93bmVyVGV4dDogc2VsZWN0ZWRPd25lclRleHQsXG4gICAgbmF2RGVsYXlNczogTkFWX0RFTEFZX01TLFxuICAgIHNhdmVDYWNoZWRGaWx0ZXIsXG4gICAgb25Gb3JiaWRkZW46IHNob3dQZXJtaXNzaW9uTW9kYWwsXG4gIH0pO1xuXHJcbiAgY29uc3Qge1xuICAgIGNhbGVuZGFyTGFiZWwsIG1hbnVhbERheUNlbGxzLCBoYW5kbGVQcmV2TW9udGgsIGhhbmRsZU5leHRNb250aCxcbiAgICBoYW5kbGVHcmlkTW91c2VMZWF2ZSwgaGFuZGxlTWFudWFsRGF5Q2xpY2ssIGhhbmRsZU1hbnVhbERheUhvdmVyLFxuICB9ID0gdXNlSGlzdG9yeUNhbGVuZGFyUGlja2VyKHtcbiAgICBjdXJyZW50TW9udGgsXG4gICAgY3VycmVudFllYXIsXG4gICAgbG9jYWxlLFxuICAgIHN0YXJ0RGF0ZSxcbiAgICBlbmREYXRlLFxuICAgIGhvdmVyRGF0ZSxcbiAgICBzZWxlY3RpbmdTdGVwLFxuICAgIHNldEN1cnJlbnRNb250aCxcbiAgICBzZXRDdXJyZW50WWVhcixcbiAgICBzZXRIb3ZlckRhdGUsXG4gICAgaGFuZGxlU2VsZWN0LFxuICAgIGxvZ0hpc3RvcnksXG4gICAgdG9JU08sXG4gICAgaXNCZWZvcmUsXG4gICAgZm9ybWF0TW9udGhMYWJlbCxcbiAgfSk7XG5cclxuICBjb25zdCB7IHRpbWVsaW5lSXRlbXMgfSA9IHVzZUhpc3RvcnlUaW1lbGluZUl0ZW1zKHtcclxuICAgIGl0ZW1zLFxyXG4gICAgbG9jYWxlLFxyXG4gICAgbm9EYXRhVGV4dCxcclxuICAgIGxvZ0hpc3RvcnksXHJcbiAgICB0b1RpdGxlQ2FzZSxcclxuICAgIGZvcm1hdERhdGVQYXJ0cyxcclxuICB9KTtcclxuXHJcbiAgY29uc3Qge1xuICAgIGxhYmVsRnJvbSwgbGFiZWxUbywgc3VtbWFyeUZyb20sIHN1bW1hcnlUbywgZmlsdGVyVGl0bGUsIGFkZERhdGVMYWJlbCwgY2xlYXJSYW5nZUxhYmVsLFxuICAgIHByZXZNb250aExhYmVsLCBuZXh0TW9udGhMYWJlbCwgc3RhdHVzU2VsZWN0U3RhcnRMYWJlbCwgc3RhdHVzU2VsZWN0RW5kTGFiZWwsIHdlZWtEYXlMYWJlbHMsXG4gICAgY2xlYXJMYWJlbCwgYXBwbHlMYWJlbCwgY2xpZW50TGFiZWwsIG93bmVyTGFiZWwsIG93bmVyQWxsTGFiZWwsIG93bmVyTm9Vc2Vyc0xhYmVsLCBvd25lckxvYWRpbmdMYWJlbCxcbiAgICBsb2FkaW5nTGFiZWwsIG5vVmlzaXRzSW5SYW5nZUxhYmVsLCBjcmVhdGVMYWJlbCwgcXVpY2tGaWx0ZXJzLCBwYWdpbmF0aW9uTGFiZWxzLFxuICB9ID0gdXNlSGlzdG9yeUxhYmVscyhsb2NhbGUpO1xuICBjb25zdCBzaG93RmlsdGVyQWN0aW9ucyA9IHNob3dGaWx0ZXJzO1xuICBjb25zdCBzaG93U3VtbWFyeSA9ICFzaG93RmlsdGVycyAmJiAhIXN0YXJ0RGF0ZSAmJiAhIWVuZERhdGU7XHJcbiAgY29uc3Qgc2hvd1Jlc3VsdHMgPSAhc2hvd0ZpbHRlcnM7XHJcbiAgY29uc3Qgc2hvd01hbnVhbFBpY2tlciA9IGFjdGl2ZVF1aWNrRmlsdGVyID09PSBcImN1c3RvbVwiICYmIHNob3dNYW51YWxQaWNrZXJQYW5lbDtcclxuICBjb25zdCBzaG93SW5saW5lU3VtbWFyeSA9ICEhc3RhcnREYXRlICYmICEhZW5kRGF0ZSAmJiAhc2hvd01hbnVhbFBpY2tlcjtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwibWF4LXctM3hsIG14LWF1dG8gcHgtMSBzbTpweC0yIHB0LTMgcGItNCBzcGFjZS15LTJcIj5cclxuICAgICAge3Nob3dTdW1tYXJ5ICYmIChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpbHRlci1jYXJkIGZpbHRlci1jYXJkLS1zdW1tYXJ5IHAtMyBzbTpwLTQgbXQtMSBtYi0zXCI+XHJcbiAgICAgICAgICA8SGlzdG9yeVN1bW1hcnlcclxuICAgICAgICAgICAgc3VtbWFyeUZyb21MYWJlbD17c3VtbWFyeUZyb219XHJcbiAgICAgICAgICAgIHN1bW1hcnlUb0xhYmVsPXtzdW1tYXJ5VG99XHJcbiAgICAgICAgICAgIGZyb21WYWx1ZT17c3RhcnREYXRlID8gZm9ybWF0RGlzcGxheShzdGFydERhdGUsIGxvY2FsZSkgOiBcIi0tXCJ9XHJcbiAgICAgICAgICAgIHRvVmFsdWU9e2VuZERhdGUgPyBmb3JtYXREaXNwbGF5KGVuZERhdGUsIGxvY2FsZSkgOiBcIi0tXCJ9XHJcbiAgICAgICAgICAgIGNsaWVudExhYmVsPXtjbGllbnRMYWJlbH1cbiAgICAgICAgICAgIGNsaWVudFZhbHVlPXtzZWxlY3RlZENsaWVudD8udGV4dCB8fCBcIlwifVxuICAgICAgICAgICAgc2hvd0NsaWVudD17ISFzZWxlY3RlZENsaWVudH1cbiAgICAgICAgICAgIG93bmVyTGFiZWw9e293bmVyTGFiZWx9XG4gICAgICAgICAgICBvd25lclZhbHVlPXtzZWxlY3RlZE93bmVyVGV4dH1cbiAgICAgICAgICAgIHNob3dPd25lcj17ISFzZWxlY3RlZE93bmVyVGV4dH1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG4gICAgICB7c2hvd0ZpbHRlcnMgJiYgKFxuICAgICAgICA8SGlzdG9yeUZpbHRlclBhbmVsXG4gICAgICAgICAgYWN0aXZhdG9yUmVmPXthY3RpdmF0b3JSZWZ9XG4gICAgICAgICAgcG9wb3ZlclJlZj17cG9wb3ZlclJlZn1cbiAgICAgICAgICBxdWlja0ZpbHRlcnM9e3F1aWNrRmlsdGVyc31cbiAgICAgICAgICBhY3RpdmVRdWlja0ZpbHRlcj17YWN0aXZlUXVpY2tGaWx0ZXJ9XG4gICAgICAgICAgc2hvd0lubGluZVN1bW1hcnk9e3Nob3dJbmxpbmVTdW1tYXJ5fVxuICAgICAgICAgIHNob3dNYW51YWxQaWNrZXI9e3Nob3dNYW51YWxQaWNrZXJ9XG4gICAgICAgICAgc3VtbWFyeUZyb21MYWJlbD17c3VtbWFyeUZyb219XG4gICAgICAgICAgc3VtbWFyeVRvTGFiZWw9e3N1bW1hcnlUb31cbiAgICAgICAgICBmcm9tVmFsdWU9e3N0YXJ0RGF0ZSA/IGZvcm1hdERpc3BsYXkoc3RhcnREYXRlLCBsb2NhbGUpIDogXCItLVwifVxuICAgICAgICAgIHRvVmFsdWU9e2VuZERhdGUgPyBmb3JtYXREaXNwbGF5KGVuZERhdGUsIGxvY2FsZSkgOiBcIi0tXCJ9XG4gICAgICAgICAgb3duZXJMYWJlbD17b3duZXJMYWJlbH1cbiAgICAgICAgICBvd25lclZhbHVlPXtzZWxlY3RlZE93bmVyVGV4dH1cbiAgICAgICAgICBmaWx0ZXJUaXRsZT17ZmlsdGVyVGl0bGV9XG4gICAgICAgICAgc2hvd01hbnVhbEVycm9yPXtzaG93TWFudWFsRXJyb3J9XG4gICAgICAgICAgc2hvd1N0YXJ0RXJyb3I9e3Nob3dNYW51YWxFcnJvciAmJiAhc3RhcnREYXRlfVxuICAgICAgICAgIHNob3dFbmRFcnJvcj17c2hvd01hbnVhbEVycm9yICYmICFlbmREYXRlfVxuICAgICAgICAgIGlzT3Blbj17aXNPcGVufVxuICAgICAgICAgIHNlbGVjdGluZ1N0ZXA9e3NlbGVjdGluZ1N0ZXB9XG4gICAgICAgICAgbGFiZWxGcm9tPXtsYWJlbEZyb219XG4gICAgICAgICAgbGFiZWxUbz17bGFiZWxUb31cbiAgICAgICAgICBzdGFydERhdGVUZXh0PXtzdGFydERhdGUgPyBmb3JtYXREaXNwbGF5KHN0YXJ0RGF0ZSwgbG9jYWxlKSA6IGFkZERhdGVMYWJlbH1cbiAgICAgICAgICBlbmREYXRlVGV4dD17ZW5kRGF0ZSA/IGZvcm1hdERpc3BsYXkoZW5kRGF0ZSwgbG9jYWxlKSA6IGFkZERhdGVMYWJlbH1cbiAgICAgICAgICBjbGVhclJhbmdlTGFiZWw9e2NsZWFyUmFuZ2VMYWJlbH1cbiAgICAgICAgICBoYXNTZWxlY3RlZFJhbmdlPXshIXN0YXJ0RGF0ZSB8fCAhIWVuZERhdGV9XG4gICAgICAgICAgbW9udGhMYWJlbD17Y2FsZW5kYXJMYWJlbH1cbiAgICAgICAgICB3ZWVrRGF5TGFiZWxzPXt3ZWVrRGF5TGFiZWxzfVxuICAgICAgICAgIHN0YXR1c1RleHQ9e3NlbGVjdGluZ1N0ZXAgPT09IFwic3RhcnRcIiA/IHN0YXR1c1NlbGVjdFN0YXJ0TGFiZWwgOiBzdGF0dXNTZWxlY3RFbmRMYWJlbH1cbiAgICAgICAgICBkYXlDZWxscz17bWFudWFsRGF5Q2VsbHN9XG4gICAgICAgICAgcHJldk1vbnRoTGFiZWw9e3ByZXZNb250aExhYmVsfVxuICAgICAgICAgIG5leHRNb250aExhYmVsPXtuZXh0TW9udGhMYWJlbH1cbiAgICAgICAgICBjbGllbnRSZXNldEtleT17Y2xpZW50UmVzZXRLZXl9XG4gICAgICAgICAgc2VsZWN0ZWRDbGllbnQ9e3NlbGVjdGVkQ2xpZW50fVxuICAgICAgICAgIGNsaWVudExhYmVsPXtjbGllbnRMYWJlbH1cbiAgICAgICAgICB2aXNpYmxlVmlzaXRVc2Vycz17dmlzaWJsZVZpc2l0VXNlcnN9XG4gICAgICAgICAgc2VsZWN0ZWRPd25lckF4VXNlcklkPXtvd25lclNlbGVjdFZhbHVlfVxuICAgICAgICAgIHZpc2libGVVc2Vyc0xvYWRpbmc9e3Zpc2libGVVc2Vyc0xvYWRpbmd9XG4gICAgICAgICAgb3duZXJGaWx0ZXJEaXNhYmxlZD17b3duZXJGaWx0ZXJEaXNhYmxlZH1cbiAgICAgICAgICB2aXNpYmxlVXNlcnNFcnJvcj17dmlzaWJsZVVzZXJzRXJyb3J9XG4gICAgICAgICAgb3duZXJBbGxPcHRpb249e2Nhbk1hbmFnZVZpc2libGVPd25lcnMgPyB7IHZhbHVlOiBISVNUT1JZX1ZJU0lCTEVfT1dORVJfQUxMX1ZBTFVFLCB0ZXh0OiBvd25lckFsbExhYmVsIH0gOiBudWxsfVxuICAgICAgICAgIG93bmVyTm9Vc2Vyc0xhYmVsPXtvd25lck5vVXNlcnNMYWJlbH1cbiAgICAgICAgICBvd25lckxvYWRpbmdMYWJlbD17b3duZXJMb2FkaW5nTGFiZWx9XG4gICAgICAgICAgc2hvd0ZpbHRlckFjdGlvbnM9e3Nob3dGaWx0ZXJBY3Rpb25zfVxuICAgICAgICAgIGNsZWFyTGFiZWw9e2NsZWFyTGFiZWx9XG4gICAgICAgICAgYXBwbHlMYWJlbD17YXBwbHlMYWJlbH1cbiAgICAgICAgICBvblF1aWNrRmlsdGVyPXtoYW5kbGVRdWlja0ZpbHRlcn1cbiAgICAgICAgICBvbk9wZW5Qb3BvdmVyPXtvcGVuUG9wb3Zlcn1cbiAgICAgICAgICBvbkFjdGl2YXRvcktleURvd249e2hhbmRsZUFjdGl2YXRvcktleURvd259XG4gICAgICAgICAgb25TZWN0aW9uS2V5RG93bj17aGFuZGxlU2VjdGlvbktleURvd259XG4gICAgICAgICAgb25DbGVhckRhdGU9e2hhbmRsZUNsZWFyfVxuICAgICAgICAgIG9uUHJldk1vbnRoPXtoYW5kbGVQcmV2TW9udGh9XG4gICAgICAgICAgb25OZXh0TW9udGg9e2hhbmRsZU5leHRNb250aH1cbiAgICAgICAgICBvbkdyaWRNb3VzZUxlYXZlPXtoYW5kbGVHcmlkTW91c2VMZWF2ZX1cbiAgICAgICAgICBvbkRheUNsaWNrPXtoYW5kbGVNYW51YWxEYXlDbGlja31cbiAgICAgICAgICBvbkRheUhvdmVyPXtoYW5kbGVNYW51YWxEYXlIb3Zlcn1cbiAgICAgICAgICBvbkNsaWVudFNlbGVjdGVkPXtoYW5kbGVDbGllbnRTZWxlY3RlZH1cbiAgICAgICAgICBvbk93bmVyQ2hhbmdlPXtzZXRTZWxlY3RlZE93bmVyQXhVc2VySWR9XG4gICAgICAgICAgb25SZXNldEZpbHRlcnM9e2hhbmRsZVJlc2V0RmlsdGVyc31cbiAgICAgICAgICBvbkFwcGx5RmlsdGVycz17KCkgPT4ge1xuICAgICAgICAgICAgYXBwbHlGaWx0ZXJzKHsgY2xvc2VQYW5lbDogdHJ1ZSwgcGFnZTogMSB9KTtcbiAgICAgICAgICB9fVxuICAgICAgICAvPlxuICAgICAgKX1cblxyXG4gICAgICA8aW5wdXQgdHlwZT1cImhpZGRlblwiIGlkPVwiZnJvbURhdGVcIiB2YWx1ZT17ZnJvbURhdGVWYWx1ZX0gcmVhZE9ubHkgLz5cclxuICAgICAgPGlucHV0IHR5cGU9XCJoaWRkZW5cIiBpZD1cInRvRGF0ZVwiIHZhbHVlPXt0b0RhdGVWYWx1ZX0gcmVhZE9ubHkgLz5cclxuXHJcbiAgICAgIDxIaXN0b3J5UmVzdWx0c1NlY3Rpb25cbiAgICAgICAgc2hvd1Jlc3VsdHM9e3Nob3dSZXN1bHRzfVxuICAgICAgICBpc0xvYWRpbmc9e2lzTG9hZGluZ31cbiAgICAgICAgbG9hZGluZ0xhYmVsPXtsb2FkaW5nTGFiZWx9XG4gICAgICAgIHRpbWVsaW5lSXRlbXM9e3RpbWVsaW5lSXRlbXN9XG4gICAgICAgIG5vRGF0YVRleHQ9e25vVmlzaXRzSW5SYW5nZUxhYmVsfVxuICAgICAgICBlcnJvck1lc3NhZ2U9e2Vycm9yTWVzc2FnZX1cbiAgICAgICAgdG90YWxQYWdlcz17dG90YWxQYWdlc31cbiAgICAgICAgY3VycmVudFBhZ2U9e2N1cnJlbnRQYWdlfVxuICAgICAgICBwYWdlV2luZG93PXtQQUdFX1dJTkRPV31cbiAgICAgICAgcGFnaW5hdGlvbkxhYmVscz17cGFnaW5hdGlvbkxhYmVsc31cbiAgICAgICAgb25OYXZpZ2F0ZT17aGFuZGxlTmF2aWdhdGV9XG4gICAgICAgIG9uUGFnZUNoYW5nZT17bG9hZEFjdGl2aXRpZXN9XG4gICAgICAvPlxuICAgICAge2NhbkNyZWF0ZVZpc2l0ICYmIChcbiAgICAgICAgPEZsb2F0aW5nQWN0aW9uQnV0dG9uXG4gICAgICAgICAgcm91dGU9XCIvVmlzaXRhcy9DcmVhdGU/ZnJlc2g9MVwiXG4gICAgICAgICAgYXJpYUxhYmVsPXtjcmVhdGVMYWJlbH1cbiAgICAgICAgICBzaXplPXs3Nn1cbiAgICAgICAgICByaWdodD17MTZ9XG4gICAgICAgICAgYm90dG9tPXtGQUJfQkFTRV9CT1RUT019XHJcbiAgICAgICAgLz5cclxuICAgICAgKX1cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG4vLyBNb3VudCBoZWxwZXIgZm9yIHRoZSBsZWdhY3kgUmF6b3Igdmlldy5cclxuZXhwb3J0IGNvbnN0IG1vdW50SGlzdG9yeVBhZ2UgPSAocm9vdDogSFRNTEVsZW1lbnQpID0+IHtcbiAgY29uc3QgZGVmYXVsdEZyb21EYXRlID0gcm9vdC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWRlZmF1bHQtZnJvbVwiKSB8fCBcIlwiO1xuICBjb25zdCBkZWZhdWx0VG9EYXRlID0gcm9vdC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWRlZmF1bHQtdG9cIikgfHwgXCJcIjtcbiAgY29uc3QgY29tcGFueUlkID0gcm9vdC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNvbXBhbnktaWRcIikgfHwgXCJcIjtcbiAgY29uc3QgYXhVc2VySWQgPSByb290LmdldEF0dHJpYnV0ZShcImRhdGEtYXgtdXNlci1pZFwiKSB8fCBcIlwiO1xuICBjb25zdCBwZXJtaXNzaW9uc1JldmlzaW9uID0gcm9vdC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXBlcm1pc3Npb25zLXJldmlzaW9uXCIpIHx8IFwiXCI7XG5cbiAgbW91bnRSZWFjdElzbGFuZChcbiAgICByb290LFxuICAgIDxIaXN0b3J5UGFnZVxuICAgICAgZGVmYXVsdEZyb21EYXRlPXtkZWZhdWx0RnJvbURhdGV9XG4gICAgICBkZWZhdWx0VG9EYXRlPXtkZWZhdWx0VG9EYXRlfVxuICAgICAgY29tcGFueUlkPXtjb21wYW55SWR9XG4gICAgICBheFVzZXJJZD17YXhVc2VySWR9XG4gICAgICBwZXJtaXNzaW9uc1JldmlzaW9uPXtwZXJtaXNzaW9uc1JldmlzaW9ufVxuICAgIC8+XG4gICk7XG59O1xuXHJcbmNvbnN0IG1vdW50ID0gKCkgPT4ge1xyXG4gIGNvbnN0IHJvb3RFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlzaXRhcy1oaXN0b3J5LXJvb3RcIik7XHJcbiAgaWYgKCFyb290RWwpIHJldHVybjtcclxuICBtb3VudEhpc3RvcnlQYWdlKHJvb3RFbCk7XHJcbn07XHJcblxyXG5tb3VudFdoZW5Eb2N1bWVudFJlYWR5KG1vdW50KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEhpc3RvcnlQYWdlO1xyXG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZU1lbW8gfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBTZWxlY3RDb21ib2JveCBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NlbGVjdENvbWJvYm94LnRzeFwiO1xuaW1wb3J0IHsgY2xhc3NOYW1lcyB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9jbGFzc05hbWVzLnRzXCI7XG5pbXBvcnQgeyBmb3JtYXRNb2R1bGVWaXNpYmxlVXNlckxhYmVsLCB0eXBlIE1vZHVsZURhdGFWaXNpYmlsaXR5VmlzaWJsZVVzZXIgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvbW9kdWxlRGF0YVZpc2liaWxpdHkudHNcIjtcbmltcG9ydCB7IEhJU1RPUllfVklTSUJMRV9PV05FUl9BTExfVkFMVUUgfSBmcm9tIFwiLi9oaXN0b3J5VmlzaWJsZU93bmVyU2VsZWN0aW9uLnRzXCI7XG5cbnR5cGUgVmlzaXRPd25lclNlbGVjdE9wdGlvbiA9IHtcbiAgdmFsdWU6IHN0cmluZztcbiAgdGV4dDogc3RyaW5nO1xufTtcblxudHlwZSBQcm9wcyA9IHtcbiAgdXNlcnM6IE1vZHVsZURhdGFWaXNpYmlsaXR5VmlzaWJsZVVzZXJbXTtcbiAgc2VsZWN0ZWRPd25lckF4VXNlcklkOiBzdHJpbmc7XG4gIGxvYWRpbmc6IGJvb2xlYW47XG4gIGRpc2FibGVkOiBib29sZWFuO1xuICBlcnJvck1lc3NhZ2U6IHN0cmluZztcbiAgbGFiZWw6IHN0cmluZztcbiAgYWxsT3B0aW9uPzogVmlzaXRPd25lclNlbGVjdE9wdGlvbiB8IG51bGw7XG4gIG5vVXNlcnNMYWJlbDogc3RyaW5nO1xuICBsb2FkaW5nTGFiZWw6IHN0cmluZztcbiAgb25DaGFuZ2U6IChvd25lckF4VXNlcklkOiBzdHJpbmcpID0+IHZvaWQ7XG59O1xuXG4vLyBGaXhlZCBsb2NhbCBvd25lciBzZWxlY3RvciB1c2VkIHRvIGZpbHRlciB2aXNpdCBoaXN0b3J5IGJ5IHZpc2libGUgQXggdXNlcnMuXG5jb25zdCBWaXNpYmxlVmlzaXRPd25lclNlbGVjdCA9ICh7XG4gIHVzZXJzLFxuICBzZWxlY3RlZE93bmVyQXhVc2VySWQsXG4gIGxvYWRpbmcsXG4gIGRpc2FibGVkLFxuICBlcnJvck1lc3NhZ2UsXG4gIGxhYmVsLFxuICBhbGxPcHRpb24gPSBudWxsLFxuICBub1VzZXJzTGFiZWwsXG4gIGxvYWRpbmdMYWJlbCxcbiAgb25DaGFuZ2UsXG59OiBQcm9wcykgPT4ge1xuICBjb25zdCBvcHRpb25zID0gdXNlTWVtbzxWaXNpdE93bmVyU2VsZWN0T3B0aW9uW10+KCgpID0+IHtcbiAgICBjb25zdCBvd25lck9wdGlvbnMgPSAoQXJyYXkuaXNBcnJheSh1c2VycykgPyB1c2VycyA6IFtdKVxuICAgICAgLm1hcCgoZW50cnkpID0+IHtcbiAgICAgICAgY29uc3QgYXhVc2VySWQgPSBTdHJpbmcoZW50cnkuYXhVc2VySWQgfHwgXCJcIikudHJpbSgpO1xuICAgICAgICBjb25zdCBvcHRpb25MYWJlbCA9IGZvcm1hdE1vZHVsZVZpc2libGVVc2VyTGFiZWwoZW50cnkpO1xuICAgICAgICBpZiAoIWF4VXNlcklkIHx8ICFvcHRpb25MYWJlbCkgcmV0dXJuIG51bGw7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdmFsdWU6IGF4VXNlcklkLFxuICAgICAgICAgIHRleHQ6IG9wdGlvbkxhYmVsLFxuICAgICAgICB9IGFzIFZpc2l0T3duZXJTZWxlY3RPcHRpb247XG4gICAgICB9KVxuICAgICAgLmZpbHRlcigoZW50cnkpOiBlbnRyeSBpcyBWaXNpdE93bmVyU2VsZWN0T3B0aW9uID0+ICEhZW50cnkpO1xuXG4gICAgcmV0dXJuIGFsbE9wdGlvbiA/IFthbGxPcHRpb24sIC4uLm93bmVyT3B0aW9uc10gOiBvd25lck9wdGlvbnM7XG4gIH0sIFthbGxPcHRpb24sIHVzZXJzXSk7XG5cbiAgY29uc3QgaGFzT3B0aW9ucyA9IG9wdGlvbnMubGVuZ3RoID4gMDtcbiAgY29uc3Qgc2VsZWN0ZWRFeGlzdHMgPSBvcHRpb25zLnNvbWUoKGVudHJ5KSA9PiBlbnRyeS52YWx1ZS50b1VwcGVyQ2FzZSgpID09PSBzZWxlY3RlZE93bmVyQXhVc2VySWQudG9VcHBlckNhc2UoKSk7XG4gIGNvbnN0IHZhbHVlID0gaGFzT3B0aW9ucyAmJiBzZWxlY3RlZEV4aXN0cyA/IHNlbGVjdGVkT3duZXJBeFVzZXJJZCA6IFwiXCI7XG4gIGNvbnN0IHN0YXR1c1RleHQgPSBsb2FkaW5nID8gbG9hZGluZ0xhYmVsIDogZXJyb3JNZXNzYWdlO1xuICBjb25zdCBzZWxlY3RlZFRleHRNb2RlID1cbiAgICBhbGxPcHRpb24gJiYgdmFsdWUgPT09IEhJU1RPUllfVklTSUJMRV9PV05FUl9BTExfVkFMVUUgPyBcInRleHRcIiA6IFwidmFsdWVcIjtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xXCI+XG4gICAgICA8U2VsZWN0Q29tYm9ib3hcbiAgICAgICAgbGFiZWw9e2xhYmVsfVxuICAgICAgICBwbGFjZWhvbGRlcj17aGFzT3B0aW9ucyA/IGxhYmVsIDogbm9Vc2Vyc0xhYmVsfVxuICAgICAgICBvcHRpb25zPXtoYXNPcHRpb25zID8gb3B0aW9ucyA6IFt7IHZhbHVlOiBcIlwiLCB0ZXh0OiBub1VzZXJzTGFiZWwgfV19XG4gICAgICAgIHZhbHVlPXt2YWx1ZX1cbiAgICAgICAgb25DaGFuZ2U9eyhuZXh0VmFsdWUpID0+IHtcbiAgICAgICAgICBvbkNoYW5nZShuZXh0VmFsdWUgPT09IEhJU1RPUllfVklTSUJMRV9PV05FUl9BTExfVkFMVUUgPyBcIlwiIDogbmV4dFZhbHVlKTtcbiAgICAgICAgfX1cbiAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkIHx8IGxvYWRpbmcgfHwgIWhhc09wdGlvbnN9XG4gICAgICAgIGlkQmFzZT1cImhpc3RvcnktdmlzaWJsZS1vd25lclwiXG4gICAgICAgIHBvcnRhbENsYXNzTmFtZT1cInZpc2l0YXMtdHlwb2dyYXBoeVwiXG4gICAgICAgIHBhbmVsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcbiAgICAgICAgYWxsb3dUZXh0SW5wdXRcbiAgICAgICAgc2VsZWN0ZWRUZXh0TW9kZT17c2VsZWN0ZWRUZXh0TW9kZX1cbiAgICAgICAgc2hvd0xhYmVsPXtmYWxzZX1cbiAgICAgIC8+XG4gICAgICB7c3RhdHVzVGV4dCAmJiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsIGZsZXgganVzdGlmeS1lbmRcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXCJ0ZXh0LXhzIHRlY2gtaW5mb1wiLCBlcnJvck1lc3NhZ2UgPyBcInRleHQtYW1iZXItNzAwXCIgOiBcInRleHQtc2xhdGUtNTAwXCIpfT5cbiAgICAgICAgICAgIHtzdGF0dXNUZXh0fVxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgVmlzaWJsZVZpc2l0T3duZXJTZWxlY3Q7XG4iLCAiaW1wb3J0IHR5cGUgeyBNb2R1bGVEYXRhVmlzaWJpbGl0eVZpc2libGVVc2VyIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL21vZHVsZURhdGFWaXNpYmlsaXR5LnRzXCI7XG5pbXBvcnQgeyBub3JtYWxpemVPd25lckF4VXNlcklkIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL21vZHVsZURhdGFWaXNpYmlsaXR5LnRzXCI7XG5cbmV4cG9ydCBjb25zdCBISVNUT1JZX1ZJU0lCTEVfT1dORVJfQUxMX1ZBTFVFID0gXCJfX2hpc3RvcnlfdmlzaWJsZV9vd25lcl9hbGxfX1wiO1xuXG5jb25zdCBub3JtYWxpemVVc2VySWQgPSAodmFsdWU6IHVua25vd24pOiBzdHJpbmcgPT4gU3RyaW5nKHZhbHVlIHx8IFwiXCIpLnRyaW0oKTtcblxuLy8gQ29tcGFyZXMgdmlzaXQgb3duZXIgQXggdXNlciBpZHMgd2l0aCB0aGUgc2FtZSBub3JtYWxpemF0aW9uIHVzZWQgYnkgcmVjb3JkIHZpc2liaWxpdHkuXG5leHBvcnQgY29uc3QgaXNTYW1lSGlzdG9yeVZpc2libGVPd25lciA9IChsZWZ0OiB1bmtub3duLCByaWdodDogdW5rbm93bik6IGJvb2xlYW4gPT4ge1xuICBjb25zdCBub3JtYWxpemVkTGVmdCA9IG5vcm1hbGl6ZU93bmVyQXhVc2VySWQobGVmdCk7XG4gIGNvbnN0IG5vcm1hbGl6ZWRSaWdodCA9IG5vcm1hbGl6ZU93bmVyQXhVc2VySWQocmlnaHQpO1xuICByZXR1cm4gISFub3JtYWxpemVkTGVmdCAmJiBub3JtYWxpemVkTGVmdCA9PT0gbm9ybWFsaXplZFJpZ2h0O1xufTtcblxuLy8gS2VlcHMgdGhlIGxvZ2dlZCBBeCB1c2VyIGF2YWlsYWJsZSB3aGVuIHRoZSB2aXNpYmlsaXR5IGVuZHBvaW50IG9ubHkgcmV0dXJucyBzdWJvcmRpbmF0ZXMuXG5leHBvcnQgY29uc3QgZW5zdXJlQ3VycmVudEhpc3RvcnlWaXNpYmxlT3duZXJJbkxpc3QgPSAoXG4gIHVzZXJzOiBNb2R1bGVEYXRhVmlzaWJpbGl0eVZpc2libGVVc2VyW10sXG4gIGN1cnJlbnRBeFVzZXJJZDogdW5rbm93blxuKTogTW9kdWxlRGF0YVZpc2liaWxpdHlWaXNpYmxlVXNlcltdID0+IHtcbiAgY29uc3Qgbm9ybWFsaXplZEN1cnJlbnQgPSBub3JtYWxpemVVc2VySWQoY3VycmVudEF4VXNlcklkKTtcbiAgY29uc3Qgbm9ybWFsaXplZFVzZXJzID0gQXJyYXkuaXNBcnJheSh1c2VycykgPyB1c2VycyA6IFtdO1xuICBpZiAoIW5vcm1hbGl6ZWRDdXJyZW50KSByZXR1cm4gbm9ybWFsaXplZFVzZXJzO1xuICBpZiAobm9ybWFsaXplZFVzZXJzLnNvbWUoKGVudHJ5KSA9PiBpc1NhbWVIaXN0b3J5VmlzaWJsZU93bmVyKGVudHJ5LmF4VXNlcklkLCBub3JtYWxpemVkQ3VycmVudCkpKSB7XG4gICAgcmV0dXJuIG5vcm1hbGl6ZWRVc2VycztcbiAgfVxuXG4gIHJldHVybiBbXG4gICAge1xuICAgICAgYWxpYXM6IG5vcm1hbGl6ZWRDdXJyZW50LFxuICAgICAgYXhVc2VySWQ6IG5vcm1hbGl6ZWRDdXJyZW50LFxuICAgICAgY3JtVXNlcklkOiBcIlwiLFxuICAgICAgbmFtZTogbm9ybWFsaXplZEN1cnJlbnQsXG4gICAgICBzb3VyY2U6IFwiQ3VycmVudFVzZXJGYWxsYmFja1wiLFxuICAgICAgbXV0YXRpb25Qb2xpY3k6IFwiXCIsXG4gICAgICBtdXRhdGlvblBvbGljeUludDogbnVsbCxcbiAgICAgIG11dGF0aW9uUG9saWN5TGFiZWw6IFwiXCIsXG4gICAgICBjYW5NdXRhdGU6IHRydWUsXG4gICAgfSxcbiAgICAuLi5ub3JtYWxpemVkVXNlcnMsXG4gIF07XG59O1xuXG4vLyBEZXRlY3RzIHdoZXRoZXIgdGhlIGN1cnJlbnQgdXNlciBoYXMgYXQgbGVhc3Qgb25lIHZpc2libGUgc3Vib3JkaW5hdGUgb3duZXIuXG5leHBvcnQgY29uc3QgaGFzSGlzdG9yeVZpc2libGVTdWJvcmRpbmF0ZXMgPSAoXG4gIHVzZXJzOiBNb2R1bGVEYXRhVmlzaWJpbGl0eVZpc2libGVVc2VyW10sXG4gIGN1cnJlbnRBeFVzZXJJZDogdW5rbm93blxuKTogYm9vbGVhbiA9PiB7XG4gIGNvbnN0IG5vcm1hbGl6ZWRDdXJyZW50ID0gbm9ybWFsaXplT3duZXJBeFVzZXJJZChjdXJyZW50QXhVc2VySWQpO1xuICBpZiAoIW5vcm1hbGl6ZWRDdXJyZW50KSByZXR1cm4gdXNlcnMubGVuZ3RoID4gMTtcblxuICByZXR1cm4gdXNlcnMuc29tZSgoZW50cnkpID0+IHtcbiAgICBjb25zdCBvd25lcklkID0gbm9ybWFsaXplT3duZXJBeFVzZXJJZChlbnRyeS5heFVzZXJJZCk7XG4gICAgcmV0dXJuICEhb3duZXJJZCAmJiBvd25lcklkICE9PSBub3JtYWxpemVkQ3VycmVudDtcbiAgfSk7XG59O1xuXG4vLyBSZXNvbHZlcyBhIGNvbmNyZXRlIG93bmVyIGlkIGZyb20gYSByZXF1ZXN0ZWQgdmFsdWUgYW5kIHRoZSBhdmFpbGFibGUgdmlzaXQgb3duZXIgbGlzdC5cbmV4cG9ydCBjb25zdCByZXNvbHZlSGlzdG9yeVZpc2libGVPd25lclNlbGVjdGlvbiA9IChcbiAgcmVxdWVzdGVkT3duZXJBeFVzZXJJZDogdW5rbm93bixcbiAgY3VycmVudEF4VXNlcklkOiB1bmtub3duLFxuICB1c2VyczogTW9kdWxlRGF0YVZpc2liaWxpdHlWaXNpYmxlVXNlcltdXG4pOiBzdHJpbmcgPT4ge1xuICBjb25zdCBub3JtYWxpemVkUmVxdWVzdGVkID0gbm9ybWFsaXplVXNlcklkKHJlcXVlc3RlZE93bmVyQXhVc2VySWQpO1xuICBjb25zdCBub3JtYWxpemVkQ3VycmVudCA9IG5vcm1hbGl6ZVVzZXJJZChjdXJyZW50QXhVc2VySWQpO1xuXG4gIGlmIChub3JtYWxpemVkUmVxdWVzdGVkICYmIG5vcm1hbGl6ZWRSZXF1ZXN0ZWQgIT09IEhJU1RPUllfVklTSUJMRV9PV05FUl9BTExfVkFMVUUpIHtcbiAgICBjb25zdCBleGFjdCA9IHVzZXJzLmZpbmQoKGVudHJ5KSA9PiBpc1NhbWVIaXN0b3J5VmlzaWJsZU93bmVyKGVudHJ5LmF4VXNlcklkLCBub3JtYWxpemVkUmVxdWVzdGVkKSk7XG4gICAgaWYgKGV4YWN0KSByZXR1cm4gZXhhY3QuYXhVc2VySWQ7XG4gIH1cblxuICBpZiAobm9ybWFsaXplZEN1cnJlbnQpIHtcbiAgICBjb25zdCBzZWxmID0gdXNlcnMuZmluZCgoZW50cnkpID0+IGlzU2FtZUhpc3RvcnlWaXNpYmxlT3duZXIoZW50cnkuYXhVc2VySWQsIG5vcm1hbGl6ZWRDdXJyZW50KSk7XG4gICAgcmV0dXJuIHNlbGY/LmF4VXNlcklkIHx8IG5vcm1hbGl6ZWRDdXJyZW50O1xuICB9XG5cbiAgcmV0dXJuIFwiXCI7XG59O1xuXG50eXBlIEhpc3RvcnlWaXNpYmxlT3duZXJSZXNvbHV0aW9uQXJncyA9IHtcbiAgc2VsZWN0ZWRPd25lckF4VXNlcklkOiB1bmtub3duO1xuICBjdXJyZW50QXhVc2VySWQ6IHVua25vd247XG4gIHVzZXJzOiBNb2R1bGVEYXRhVmlzaWJpbGl0eVZpc2libGVVc2VyW107XG4gIGNhbk1hbmFnZVZpc2libGVPd25lcnM6IGJvb2xlYW47XG59O1xuXG4vLyBSZXNvbHZlcyB0aGUgdmFsdWUgc2hvd24gYnkgdGhlIGZpbHRlciBpbnB1dC5cbmV4cG9ydCBjb25zdCByZXNvbHZlSGlzdG9yeVZpc2libGVPd25lclNlbGVjdFZhbHVlID0gKHtcbiAgc2VsZWN0ZWRPd25lckF4VXNlcklkLFxuICBjdXJyZW50QXhVc2VySWQsXG4gIHVzZXJzLFxuICBjYW5NYW5hZ2VWaXNpYmxlT3duZXJzLFxufTogSGlzdG9yeVZpc2libGVPd25lclJlc29sdXRpb25BcmdzKTogc3RyaW5nID0+IHtcbiAgaWYgKGNhbk1hbmFnZVZpc2libGVPd25lcnMpIHtcbiAgICBjb25zdCBub3JtYWxpemVkU2VsZWN0ZWQgPSBub3JtYWxpemVVc2VySWQoc2VsZWN0ZWRPd25lckF4VXNlcklkKTtcbiAgICBpZiAobm9ybWFsaXplZFNlbGVjdGVkICYmIG5vcm1hbGl6ZWRTZWxlY3RlZCAhPT0gSElTVE9SWV9WSVNJQkxFX09XTkVSX0FMTF9WQUxVRSkge1xuICAgICAgY29uc3QgZXhhY3QgPSB1c2Vycy5maW5kKChlbnRyeSkgPT4gaXNTYW1lSGlzdG9yeVZpc2libGVPd25lcihlbnRyeS5heFVzZXJJZCwgbm9ybWFsaXplZFNlbGVjdGVkKSk7XG4gICAgICBpZiAoZXhhY3QpIHJldHVybiBleGFjdC5heFVzZXJJZDtcbiAgICB9XG5cbiAgICByZXR1cm4gSElTVE9SWV9WSVNJQkxFX09XTkVSX0FMTF9WQUxVRTtcbiAgfVxuXG4gIHJldHVybiByZXNvbHZlSGlzdG9yeVZpc2libGVPd25lclNlbGVjdGlvbihzZWxlY3RlZE93bmVyQXhVc2VySWQsIGN1cnJlbnRBeFVzZXJJZCwgdXNlcnMpO1xufTtcblxuLy8gUmVzb2x2ZXMgdGhlIG93bmVyIGlkIHRoYXQgbXVzdCBiZSBzZW50IHRvIHRoZSBhY3Rpdml0aWVzIEFQSS5cbmV4cG9ydCBjb25zdCByZXNvbHZlSGlzdG9yeUVmZmVjdGl2ZU93bmVyQXhVc2VySWQgPSAoe1xuICBzZWxlY3RlZE93bmVyQXhVc2VySWQsXG4gIGN1cnJlbnRBeFVzZXJJZCxcbiAgdXNlcnMsXG4gIGNhbk1hbmFnZVZpc2libGVPd25lcnMsXG59OiBIaXN0b3J5VmlzaWJsZU93bmVyUmVzb2x1dGlvbkFyZ3MpOiBzdHJpbmcgPT4ge1xuICBpZiAoY2FuTWFuYWdlVmlzaWJsZU93bmVycykge1xuICAgIGNvbnN0IG5vcm1hbGl6ZWRTZWxlY3RlZCA9IG5vcm1hbGl6ZVVzZXJJZChzZWxlY3RlZE93bmVyQXhVc2VySWQpO1xuICAgIGlmICghbm9ybWFsaXplZFNlbGVjdGVkIHx8IG5vcm1hbGl6ZWRTZWxlY3RlZCA9PT0gSElTVE9SWV9WSVNJQkxFX09XTkVSX0FMTF9WQUxVRSkgcmV0dXJuIFwiXCI7XG5cbiAgICBjb25zdCBleGFjdCA9IHVzZXJzLmZpbmQoKGVudHJ5KSA9PiBpc1NhbWVIaXN0b3J5VmlzaWJsZU93bmVyKGVudHJ5LmF4VXNlcklkLCBub3JtYWxpemVkU2VsZWN0ZWQpKTtcbiAgICByZXR1cm4gZXhhY3Q/LmF4VXNlcklkIHx8IFwiXCI7XG4gIH1cblxuICByZXR1cm4gcmVzb2x2ZUhpc3RvcnlWaXNpYmxlT3duZXJTZWxlY3Rpb24oc2VsZWN0ZWRPd25lckF4VXNlcklkLCBjdXJyZW50QXhVc2VySWQsIHVzZXJzKTtcbn07XG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IEFjdGlvbkJ1dHRvbiBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0FjdGlvbkJ1dHRvbi50c3hcIjtcbmltcG9ydCBGaWx0ZXJCdXR0b24gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9GaWx0ZXJCdXR0b24udHN4XCI7XG5pbXBvcnQgQ2xpZW50U2VhcmNoQ29tYm9ib3gsIHsgdHlwZSBDbGllbnRPcHRpb24gfSBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy92aXNpdGFzL0NsaWVudFNlYXJjaENvbWJvYm94LnRzeFwiO1xuaW1wb3J0IEhpc3RvcnlNYW51YWxEYXRlUGlja2VyLCB7IHR5cGUgSGlzdG9yeU1hbnVhbERheUNlbGwgfSBmcm9tIFwiLi9IaXN0b3J5TWFudWFsRGF0ZVBpY2tlci50c3hcIjtcbmltcG9ydCBIaXN0b3J5U3VtbWFyeSBmcm9tIFwiLi9IaXN0b3J5U3VtbWFyeS50c3hcIjtcbmltcG9ydCBWaXNpYmxlVmlzaXRPd25lclNlbGVjdCBmcm9tIFwiLi9WaXNpYmxlVmlzaXRPd25lclNlbGVjdC50c3hcIjtcbmltcG9ydCB0eXBlIHsgUXVpY2tGaWx0ZXJJZCB9IGZyb20gXCIuL3VzZUhpc3RvcnlGaWx0ZXJzU3RhdGUudHNcIjtcbmltcG9ydCB0eXBlIHsgTW9kdWxlRGF0YVZpc2liaWxpdHlWaXNpYmxlVXNlciB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9tb2R1bGVEYXRhVmlzaWJpbGl0eS50c1wiO1xuXG50eXBlIFF1aWNrRmlsdGVyT3B0aW9uID0ge1xuICBpZDogUXVpY2tGaWx0ZXJJZDtcbiAgbGFiZWw6IHN0cmluZztcbn07XG5cbnR5cGUgVmlzaXRPd25lclNlbGVjdE9wdGlvbiA9IHtcbiAgdmFsdWU6IHN0cmluZztcbiAgdGV4dDogc3RyaW5nO1xufTtcblxudHlwZSBQcm9wcyA9IHtcbiAgYWN0aXZhdG9yUmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTERpdkVsZW1lbnQgfCBudWxsPjtcbiAgcG9wb3ZlclJlZjogUmVhY3QuUmVmT2JqZWN0PEhUTUxEaXZFbGVtZW50IHwgbnVsbD47XG4gIHF1aWNrRmlsdGVyczogUXVpY2tGaWx0ZXJPcHRpb25bXTtcbiAgYWN0aXZlUXVpY2tGaWx0ZXI6IFF1aWNrRmlsdGVySWQgfCBudWxsO1xuICBzaG93SW5saW5lU3VtbWFyeTogYm9vbGVhbjtcbiAgc2hvd01hbnVhbFBpY2tlcjogYm9vbGVhbjtcbiAgc3VtbWFyeUZyb21MYWJlbDogc3RyaW5nO1xuICBzdW1tYXJ5VG9MYWJlbDogc3RyaW5nO1xuICBmcm9tVmFsdWU6IHN0cmluZztcbiAgdG9WYWx1ZTogc3RyaW5nO1xuICBvd25lckxhYmVsOiBzdHJpbmc7XG4gIG93bmVyVmFsdWU6IHN0cmluZztcbiAgZmlsdGVyVGl0bGU6IHN0cmluZztcbiAgc2hvd01hbnVhbEVycm9yOiBib29sZWFuO1xuICBzaG93U3RhcnRFcnJvcjogYm9vbGVhbjtcbiAgc2hvd0VuZEVycm9yOiBib29sZWFuO1xuICBpc09wZW46IGJvb2xlYW47XG4gIHNlbGVjdGluZ1N0ZXA6IFwic3RhcnRcIiB8IFwiZW5kXCIgfCBcImRvbmVcIjtcbiAgbGFiZWxGcm9tOiBzdHJpbmc7XG4gIGxhYmVsVG86IHN0cmluZztcbiAgc3RhcnREYXRlVGV4dDogc3RyaW5nO1xuICBlbmREYXRlVGV4dDogc3RyaW5nO1xuICBjbGVhclJhbmdlTGFiZWw6IHN0cmluZztcbiAgaGFzU2VsZWN0ZWRSYW5nZTogYm9vbGVhbjtcbiAgbW9udGhMYWJlbDogc3RyaW5nO1xuICB3ZWVrRGF5TGFiZWxzOiBzdHJpbmdbXTtcbiAgc3RhdHVzVGV4dDogc3RyaW5nO1xuICBkYXlDZWxsczogSGlzdG9yeU1hbnVhbERheUNlbGxbXTtcbiAgcHJldk1vbnRoTGFiZWw6IHN0cmluZztcbiAgbmV4dE1vbnRoTGFiZWw6IHN0cmluZztcbiAgY2xpZW50UmVzZXRLZXk6IG51bWJlcjtcbiAgc2VsZWN0ZWRDbGllbnQ6IENsaWVudE9wdGlvbiB8IG51bGw7XG4gIGNsaWVudExhYmVsOiBzdHJpbmc7XG4gIHZpc2libGVWaXNpdFVzZXJzOiBNb2R1bGVEYXRhVmlzaWJpbGl0eVZpc2libGVVc2VyW107XG4gIHNlbGVjdGVkT3duZXJBeFVzZXJJZDogc3RyaW5nO1xuICB2aXNpYmxlVXNlcnNMb2FkaW5nOiBib29sZWFuO1xuICBvd25lckZpbHRlckRpc2FibGVkOiBib29sZWFuO1xuICB2aXNpYmxlVXNlcnNFcnJvcjogc3RyaW5nO1xuICBvd25lckFsbE9wdGlvbj86IFZpc2l0T3duZXJTZWxlY3RPcHRpb24gfCBudWxsO1xuICBvd25lck5vVXNlcnNMYWJlbDogc3RyaW5nO1xuICBvd25lckxvYWRpbmdMYWJlbDogc3RyaW5nO1xuICBzaG93RmlsdGVyQWN0aW9uczogYm9vbGVhbjtcbiAgY2xlYXJMYWJlbDogc3RyaW5nO1xuICBhcHBseUxhYmVsOiBzdHJpbmc7XG4gIG9uUXVpY2tGaWx0ZXI6IChmaWx0ZXJJZDogUXVpY2tGaWx0ZXJJZCkgPT4gdm9pZDtcbiAgb25PcGVuUG9wb3ZlcjogKHNlY3Rpb246IFwic3RhcnRcIiB8IFwiZW5kXCIpID0+IHZvaWQ7XG4gIG9uQWN0aXZhdG9yS2V5RG93bjogKGV2ZW50OiBSZWFjdC5LZXlib2FyZEV2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4gdm9pZDtcbiAgb25TZWN0aW9uS2V5RG93bjogKGV2ZW50OiBSZWFjdC5LZXlib2FyZEV2ZW50PEhUTUxEaXZFbGVtZW50Piwgc2VjdGlvbjogXCJzdGFydFwiIHwgXCJlbmRcIikgPT4gdm9pZDtcbiAgb25DbGVhckRhdGU6IChldmVudDogUmVhY3QuTW91c2VFdmVudCkgPT4gdm9pZDtcbiAgb25QcmV2TW9udGg6IChldmVudDogUmVhY3QuTW91c2VFdmVudDxIVE1MQnV0dG9uRWxlbWVudD4pID0+IHZvaWQ7XG4gIG9uTmV4dE1vbnRoOiAoZXZlbnQ6IFJlYWN0Lk1vdXNlRXZlbnQ8SFRNTEJ1dHRvbkVsZW1lbnQ+KSA9PiB2b2lkO1xuICBvbkdyaWRNb3VzZUxlYXZlOiAoKSA9PiB2b2lkO1xuICBvbkRheUNsaWNrOiAoZGF5OiBIaXN0b3J5TWFudWFsRGF5Q2VsbCkgPT4gdm9pZDtcbiAgb25EYXlIb3ZlcjogKGRheTogSGlzdG9yeU1hbnVhbERheUNlbGwpID0+IHZvaWQ7XG4gIG9uQ2xpZW50U2VsZWN0ZWQ6IChjbGllbnQ6IENsaWVudE9wdGlvbiB8IG51bGwpID0+IHZvaWQ7XG4gIG9uT3duZXJDaGFuZ2U6IChvd25lckF4VXNlcklkOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uUmVzZXRGaWx0ZXJzOiAoKSA9PiB2b2lkO1xuICBvbkFwcGx5RmlsdGVyczogKCkgPT4gdm9pZDtcbn07XG5cbi8vIFJlbmRlcnMgaGlzdG9yeSBmaWx0ZXIgY29udHJvbHMgd2hpbGUgdGhlIHBhZ2UgY29udGFpbmVyIG93bnMgc3RhdGUgYW5kIGRhdGEgbG9hZGluZy5cbmNvbnN0IEhpc3RvcnlGaWx0ZXJQYW5lbCA9ICh7XG4gIGFjdGl2YXRvclJlZixcbiAgcG9wb3ZlclJlZixcbiAgcXVpY2tGaWx0ZXJzLFxuICBhY3RpdmVRdWlja0ZpbHRlcixcbiAgc2hvd0lubGluZVN1bW1hcnksXG4gIHNob3dNYW51YWxQaWNrZXIsXG4gIHN1bW1hcnlGcm9tTGFiZWwsXG4gIHN1bW1hcnlUb0xhYmVsLFxuICBmcm9tVmFsdWUsXG4gIHRvVmFsdWUsXG4gIG93bmVyTGFiZWwsXG4gIG93bmVyVmFsdWUsXG4gIGZpbHRlclRpdGxlLFxuICBzaG93TWFudWFsRXJyb3IsXG4gIHNob3dTdGFydEVycm9yLFxuICBzaG93RW5kRXJyb3IsXG4gIGlzT3BlbixcbiAgc2VsZWN0aW5nU3RlcCxcbiAgbGFiZWxGcm9tLFxuICBsYWJlbFRvLFxuICBzdGFydERhdGVUZXh0LFxuICBlbmREYXRlVGV4dCxcbiAgY2xlYXJSYW5nZUxhYmVsLFxuICBoYXNTZWxlY3RlZFJhbmdlLFxuICBtb250aExhYmVsLFxuICB3ZWVrRGF5TGFiZWxzLFxuICBzdGF0dXNUZXh0LFxuICBkYXlDZWxscyxcbiAgcHJldk1vbnRoTGFiZWwsXG4gIG5leHRNb250aExhYmVsLFxuICBjbGllbnRSZXNldEtleSxcbiAgc2VsZWN0ZWRDbGllbnQsXG4gIGNsaWVudExhYmVsLFxuICB2aXNpYmxlVmlzaXRVc2VycyxcbiAgc2VsZWN0ZWRPd25lckF4VXNlcklkLFxuICB2aXNpYmxlVXNlcnNMb2FkaW5nLFxuICBvd25lckZpbHRlckRpc2FibGVkLFxuICB2aXNpYmxlVXNlcnNFcnJvcixcbiAgb3duZXJBbGxPcHRpb24sXG4gIG93bmVyTm9Vc2Vyc0xhYmVsLFxuICBvd25lckxvYWRpbmdMYWJlbCxcbiAgc2hvd0ZpbHRlckFjdGlvbnMsXG4gIGNsZWFyTGFiZWwsXG4gIGFwcGx5TGFiZWwsXG4gIG9uUXVpY2tGaWx0ZXIsXG4gIG9uT3BlblBvcG92ZXIsXG4gIG9uQWN0aXZhdG9yS2V5RG93bixcbiAgb25TZWN0aW9uS2V5RG93bixcbiAgb25DbGVhckRhdGUsXG4gIG9uUHJldk1vbnRoLFxuICBvbk5leHRNb250aCxcbiAgb25HcmlkTW91c2VMZWF2ZSxcbiAgb25EYXlDbGljayxcbiAgb25EYXlIb3ZlcixcbiAgb25DbGllbnRTZWxlY3RlZCxcbiAgb25Pd25lckNoYW5nZSxcbiAgb25SZXNldEZpbHRlcnMsXG4gIG9uQXBwbHlGaWx0ZXJzLFxufTogUHJvcHMpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImZpbHRlci1jYXJkIGZpbHRlci1jYXJkLS1leHBhbmRlZCBwLTIgc206cC0yLjUgcmVsYXRpdmVcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ2FwLXktMS41IGhpc3RvcnktZmlsdGVyLXN0YWNrIGZsZXggZmxleC1jb2xcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIGdhcC0yIGhpc3RvcnktcXVpY2stZmlsdGVyc1wiIGFyaWEtbGFiZWw9e2ZpbHRlclRpdGxlfT5cbiAgICAgICAgICB7cXVpY2tGaWx0ZXJzLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaXNBY3RpdmUgPSBhY3RpdmVRdWlja0ZpbHRlciA9PT0gaXRlbS5pZDtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgIDxGaWx0ZXJCdXR0b25cbiAgICAgICAgICAgICAgICBrZXk9e2l0ZW0uaWR9XG4gICAgICAgICAgICAgICAgbGFiZWw9e2l0ZW0ubGFiZWx9XG4gICAgICAgICAgICAgICAgYWN0aXZlPXtpc0FjdGl2ZX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGxcIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG9uUXVpY2tGaWx0ZXIoaXRlbS5pZCl9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0pfVxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7c2hvd0lubGluZVN1bW1hcnkgJiYgKFxuICAgICAgICAgIDxIaXN0b3J5U3VtbWFyeVxuICAgICAgICAgICAgc3VtbWFyeUZyb21MYWJlbD17c3VtbWFyeUZyb21MYWJlbH1cbiAgICAgICAgICAgIHN1bW1hcnlUb0xhYmVsPXtzdW1tYXJ5VG9MYWJlbH1cbiAgICAgICAgICAgIGZyb21WYWx1ZT17ZnJvbVZhbHVlfVxuICAgICAgICAgICAgdG9WYWx1ZT17dG9WYWx1ZX1cbiAgICAgICAgICAgIG93bmVyTGFiZWw9e293bmVyTGFiZWx9XG4gICAgICAgICAgICBvd25lclZhbHVlPXtvd25lclZhbHVlfVxuICAgICAgICAgICAgc2hvd093bmVyPXshIW93bmVyVmFsdWV9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJnYXAteS0xIHRleHQtWzExcHhdIHB4LTFcIlxuICAgICAgICAgIC8+XG4gICAgICAgICl9XG5cbiAgICAgICAge3Nob3dNYW51YWxQaWNrZXIgJiYgKFxuICAgICAgICAgIDxIaXN0b3J5TWFudWFsRGF0ZVBpY2tlclxuICAgICAgICAgICAgYWN0aXZhdG9yUmVmPXthY3RpdmF0b3JSZWZ9XG4gICAgICAgICAgICBwb3BvdmVyUmVmPXtwb3BvdmVyUmVmfVxuICAgICAgICAgICAgc2hvd01hbnVhbEVycm9yPXtzaG93TWFudWFsRXJyb3J9XG4gICAgICAgICAgICBzaG93U3RhcnRFcnJvcj17c2hvd1N0YXJ0RXJyb3J9XG4gICAgICAgICAgICBzaG93RW5kRXJyb3I9e3Nob3dFbmRFcnJvcn1cbiAgICAgICAgICAgIGZpbHRlclRpdGxlPXtmaWx0ZXJUaXRsZX1cbiAgICAgICAgICAgIGlzT3Blbj17aXNPcGVufVxuICAgICAgICAgICAgc2VsZWN0aW5nU3RlcD17c2VsZWN0aW5nU3RlcH1cbiAgICAgICAgICAgIGxhYmVsRnJvbT17bGFiZWxGcm9tfVxuICAgICAgICAgICAgbGFiZWxUbz17bGFiZWxUb31cbiAgICAgICAgICAgIHN0YXJ0RGF0ZVRleHQ9e3N0YXJ0RGF0ZVRleHR9XG4gICAgICAgICAgICBlbmREYXRlVGV4dD17ZW5kRGF0ZVRleHR9XG4gICAgICAgICAgICBjbGVhclJhbmdlTGFiZWw9e2NsZWFyUmFuZ2VMYWJlbH1cbiAgICAgICAgICAgIGhhc1NlbGVjdGVkUmFuZ2U9e2hhc1NlbGVjdGVkUmFuZ2V9XG4gICAgICAgICAgICBtb250aExhYmVsPXttb250aExhYmVsfVxuICAgICAgICAgICAgd2Vla0RheUxhYmVscz17d2Vla0RheUxhYmVsc31cbiAgICAgICAgICAgIHN0YXR1c1RleHQ9e3N0YXR1c1RleHR9XG4gICAgICAgICAgICBkYXlDZWxscz17ZGF5Q2VsbHN9XG4gICAgICAgICAgICBwcmV2TW9udGhMYWJlbD17cHJldk1vbnRoTGFiZWx9XG4gICAgICAgICAgICBuZXh0TW9udGhMYWJlbD17bmV4dE1vbnRoTGFiZWx9XG4gICAgICAgICAgICBvbk9wZW5Qb3BvdmVyPXtvbk9wZW5Qb3BvdmVyfVxuICAgICAgICAgICAgb25BY3RpdmF0b3JLZXlEb3duPXtvbkFjdGl2YXRvcktleURvd259XG4gICAgICAgICAgICBvblNlY3Rpb25LZXlEb3duPXtvblNlY3Rpb25LZXlEb3dufVxuICAgICAgICAgICAgb25DbGVhcj17b25DbGVhckRhdGV9XG4gICAgICAgICAgICBvblByZXZNb250aD17b25QcmV2TW9udGh9XG4gICAgICAgICAgICBvbk5leHRNb250aD17b25OZXh0TW9udGh9XG4gICAgICAgICAgICBvbkdyaWRNb3VzZUxlYXZlPXtvbkdyaWRNb3VzZUxlYXZlfVxuICAgICAgICAgICAgb25EYXlDbGljaz17b25EYXlDbGlja31cbiAgICAgICAgICAgIG9uRGF5SG92ZXI9e29uRGF5SG92ZXJ9XG4gICAgICAgICAgLz5cbiAgICAgICAgKX1cblxuICAgICAgICA8VmlzaWJsZVZpc2l0T3duZXJTZWxlY3RcbiAgICAgICAgICB1c2Vycz17dmlzaWJsZVZpc2l0VXNlcnN9XG4gICAgICAgICAgc2VsZWN0ZWRPd25lckF4VXNlcklkPXtzZWxlY3RlZE93bmVyQXhVc2VySWR9XG4gICAgICAgICAgbG9hZGluZz17dmlzaWJsZVVzZXJzTG9hZGluZ31cbiAgICAgICAgICBkaXNhYmxlZD17b3duZXJGaWx0ZXJEaXNhYmxlZH1cbiAgICAgICAgICBlcnJvck1lc3NhZ2U9e3Zpc2libGVVc2Vyc0Vycm9yfVxuICAgICAgICAgIGxhYmVsPXtvd25lckxhYmVsfVxuICAgICAgICAgIGFsbE9wdGlvbj17b3duZXJBbGxPcHRpb259XG4gICAgICAgICAgbm9Vc2Vyc0xhYmVsPXtvd25lck5vVXNlcnNMYWJlbH1cbiAgICAgICAgICBsb2FkaW5nTGFiZWw9e293bmVyTG9hZGluZ0xhYmVsfVxuICAgICAgICAgIG9uQ2hhbmdlPXtvbk93bmVyQ2hhbmdlfVxuICAgICAgICAvPlxuXG4gICAgICAgIDxDbGllbnRTZWFyY2hDb21ib2JveFxuICAgICAgICAgIGtleT17Y2xpZW50UmVzZXRLZXl9XG4gICAgICAgICAgdmFsdWU9e3NlbGVjdGVkQ2xpZW50fVxuICAgICAgICAgIG9uU2VsZWN0ZWQ9e29uQ2xpZW50U2VsZWN0ZWR9XG4gICAgICAgICAgbGFiZWw9e2NsaWVudExhYmVsfVxuICAgICAgICAgIHBsYWNlaG9sZGVyPXtjbGllbnRMYWJlbH1cbiAgICAgICAgICB2YXJpYW50PVwiY29tcGFjdFwiXG4gICAgICAgICAgc2hvd0xhYmVsPXtmYWxzZX1cbiAgICAgICAgICBpZEJhc2U9XCJoaXN0b3J5LWNsaWVudFwiXG4gICAgICAgICAgcG9ydGFsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcbiAgICAgICAgLz5cblxuICAgICAgICB7c2hvd0ZpbHRlckFjdGlvbnMgJiYgKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtMSBncmlkIGdyaWQtY29scy0yIGdhcC0yIGhpc3RvcnktZmlsdGVyLWFjdGlvbnNcIj5cbiAgICAgICAgICAgIDxBY3Rpb25CdXR0b24gbGFiZWw9e2NsZWFyTGFiZWx9IGNsYXNzTmFtZT1cInctZnVsbFwiIG9uQ2xpY2s9e29uUmVzZXRGaWx0ZXJzfSAvPlxuICAgICAgICAgICAgPEFjdGlvbkJ1dHRvbiBsYWJlbD17YXBwbHlMYWJlbH0gY2xhc3NOYW1lPVwidy1mdWxsXCIgb25DbGljaz17b25BcHBseUZpbHRlcnN9IC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEhpc3RvcnlGaWx0ZXJQYW5lbDtcbiIsICJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2ssIHVzZVJlZiB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBjbGFzc05hbWVzIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2NsYXNzTmFtZXMudHNcIjtcclxuaW1wb3J0IHsgdXNlVGltZWxpbmVDYXJkRWZmZWN0cyB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VUaW1lbGluZUNhcmRFZmZlY3RzLnRzXCI7XHJcblxyXG5leHBvcnQgdHlwZSBUaW1lbGluZURhdGVQYXJ0cyA9IHtcclxuICB5ZWFyOiBzdHJpbmc7XHJcbiAgbW9udGg6IHN0cmluZztcclxuICBkYXk6IHN0cmluZztcclxufTtcclxuXHJcbmV4cG9ydCB0eXBlIFRpbWVsaW5lSXRlbSA9IHtcclxuICBpZDogc3RyaW5nO1xyXG4gIGFjdGl2aWRhZElkPzogc3RyaW5nO1xyXG4gIHJlY0lkPzogbnVtYmVyIHwgbnVsbDtcclxuICBuYW1lOiBzdHJpbmc7XHJcbiAgZGVzY3JpcHRpb246IHN0cmluZztcclxuICBmdWxsTmFtZTogc3RyaW5nO1xyXG4gIGZ1bGxEZXNjOiBzdHJpbmc7XHJcbiAgZGF0ZVBhcnRzOiBUaW1lbGluZURhdGVQYXJ0cztcclxuICBpc05vRGF0YTogYm9vbGVhbjtcclxufTtcclxuXHJcbnR5cGUgUHJvcHMgPSB7XHJcbiAgaXRlbXM6IFRpbWVsaW5lSXRlbVtdO1xyXG4gIG5vRGF0YVRleHQ6IHN0cmluZztcclxuICBlcnJvck1lc3NhZ2U6IHN0cmluZztcclxuICBvbk5hdmlnYXRlOiAobGlua0lkOiBzdHJpbmcpID0+IHZvaWQ7XHJcbn07XHJcblxyXG5jb25zdCBUQVBfTU9WRV9QWCA9IDE0O1xyXG5jb25zdCBIT0xEX1RPX1BSRVZJRVdfTVMgPSAxNjA7XHJcblxyXG50eXBlIFRhcEd1YXJkU3RhdGUgPSB7XHJcbiAgYWN0aXZlOiBib29sZWFuO1xyXG4gIHBvaW50ZXJJZDogbnVtYmVyIHwgbnVsbDtcclxuICBzdGFydFg6IG51bWJlcjtcclxuICBzdGFydFk6IG51bWJlcjtcclxuICBzdGFydFRpbWU6IG51bWJlcjtcclxuICBtb3ZlZDogYm9vbGVhbjtcclxuICBsaW5rSWQ6IHN0cmluZztcclxufTtcclxuXHJcbmNvbnN0IEhpc3RvcnlUYWJsZSA9ICh7IGl0ZW1zLCBub0RhdGFUZXh0LCBlcnJvck1lc3NhZ2UsIG9uTmF2aWdhdGUgfTogUHJvcHMpID0+IHtcclxuICBjb25zdCBjb250YWluZXJSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcclxuICBjb25zdCB0YXBHdWFyZFJlZiA9IHVzZVJlZjxUYXBHdWFyZFN0YXRlPih7XHJcbiAgICBhY3RpdmU6IGZhbHNlLFxyXG4gICAgcG9pbnRlcklkOiBudWxsLFxyXG4gICAgc3RhcnRYOiAwLFxyXG4gICAgc3RhcnRZOiAwLFxyXG4gICAgc3RhcnRUaW1lOiAwLFxyXG4gICAgbW92ZWQ6IGZhbHNlLFxyXG4gICAgbGlua0lkOiBcIlwiLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCByZXNvbHZlQ2xpY2thYmxlQ2FyZCA9IHVzZUNhbGxiYWNrKCh0YXJnZXQ6IEV2ZW50VGFyZ2V0IHwgbnVsbCkgPT4ge1xyXG4gICAgY29uc3Qgbm9kZSA9IHRhcmdldCBhcyBIVE1MRWxlbWVudCB8IG51bGw7XHJcbiAgICBpZiAoIW5vZGUgfHwgdHlwZW9mIG5vZGUuY2xvc2VzdCAhPT0gXCJmdW5jdGlvblwiKSByZXR1cm4gbnVsbDtcclxuICAgIGNvbnN0IGNhcmQgPSBub2RlLmNsb3Nlc3Q8SFRNTEVsZW1lbnQ+KFwiLnRpbWVsaW5lLWNhcmQtLWNsaWNrYWJsZVtkYXRhLWxpbmstaWRdXCIpO1xyXG4gICAgaWYgKCFjYXJkKSByZXR1cm4gbnVsbDtcclxuICAgIGlmICghY29udGFpbmVyUmVmLmN1cnJlbnQ/LmNvbnRhaW5zKGNhcmQpKSByZXR1cm4gbnVsbDtcclxuICAgIHJldHVybiBjYXJkO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgcmVzZXRUYXBHdWFyZCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIHRhcEd1YXJkUmVmLmN1cnJlbnQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB0YXBHdWFyZFJlZi5jdXJyZW50LnBvaW50ZXJJZCA9IG51bGw7XHJcbiAgICB0YXBHdWFyZFJlZi5jdXJyZW50Lm1vdmVkID0gZmFsc2U7XHJcbiAgICB0YXBHdWFyZFJlZi5jdXJyZW50LmxpbmtJZCA9IFwiXCI7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBoYW5kbGVQb2ludGVyRG93biA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKGV2ZW50OiBSZWFjdC5Qb2ludGVyRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB7XHJcbiAgICAgIGlmIChldmVudC5wb2ludGVyVHlwZSA9PT0gXCJtb3VzZVwiICYmIGV2ZW50LmJ1dHRvbiAhPT0gMCkgcmV0dXJuO1xyXG4gICAgICBjb25zdCBjYXJkID0gcmVzb2x2ZUNsaWNrYWJsZUNhcmQoZXZlbnQudGFyZ2V0KTtcclxuICAgICAgaWYgKCFjYXJkKSByZXR1cm47XHJcbiAgICAgIGNvbnN0IGxpbmtJZCA9IGNhcmQuZGF0YXNldC5saW5rSWQgfHwgXCJcIjtcclxuICAgICAgaWYgKCFsaW5rSWQpIHJldHVybjtcclxuXHJcbiAgICAgIHRhcEd1YXJkUmVmLmN1cnJlbnQuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgdGFwR3VhcmRSZWYuY3VycmVudC5wb2ludGVySWQgPSBldmVudC5wb2ludGVySWQ7XHJcbiAgICAgIHRhcEd1YXJkUmVmLmN1cnJlbnQuc3RhcnRYID0gZXZlbnQuY2xpZW50WDtcclxuICAgICAgdGFwR3VhcmRSZWYuY3VycmVudC5zdGFydFkgPSBldmVudC5jbGllbnRZO1xyXG4gICAgICB0YXBHdWFyZFJlZi5jdXJyZW50LnN0YXJ0VGltZSA9IERhdGUubm93KCk7XHJcbiAgICAgIHRhcEd1YXJkUmVmLmN1cnJlbnQubW92ZWQgPSBmYWxzZTtcclxuICAgICAgdGFwR3VhcmRSZWYuY3VycmVudC5saW5rSWQgPSBsaW5rSWQ7XHJcbiAgICB9LFxyXG4gICAgW3Jlc29sdmVDbGlja2FibGVDYXJkXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZVBvaW50ZXJNb3ZlID0gdXNlQ2FsbGJhY2soKGV2ZW50OiBSZWFjdC5Qb2ludGVyRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB7XHJcbiAgICBjb25zdCBzdGF0ZSA9IHRhcEd1YXJkUmVmLmN1cnJlbnQ7XHJcbiAgICBpZiAoIXN0YXRlLmFjdGl2ZSB8fCBldmVudC5wb2ludGVySWQgIT09IHN0YXRlLnBvaW50ZXJJZCkgcmV0dXJuO1xyXG4gICAgY29uc3QgZHggPSBNYXRoLmFicyhldmVudC5jbGllbnRYIC0gc3RhdGUuc3RhcnRYKTtcclxuICAgIGNvbnN0IGR5ID0gTWF0aC5hYnMoZXZlbnQuY2xpZW50WSAtIHN0YXRlLnN0YXJ0WSk7XHJcbiAgICBpZiAoZHggPiBUQVBfTU9WRV9QWCB8fCBkeSA+IFRBUF9NT1ZFX1BYKSB7XHJcbiAgICAgIHN0YXRlLm1vdmVkID0gdHJ1ZTtcclxuICAgIH1cclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZVBvaW50ZXJVcCA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKGV2ZW50OiBSZWFjdC5Qb2ludGVyRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB7XHJcbiAgICAgIGNvbnN0IHN0YXRlID0gdGFwR3VhcmRSZWYuY3VycmVudDtcclxuICAgICAgaWYgKCFzdGF0ZS5hY3RpdmUgfHwgZXZlbnQucG9pbnRlcklkICE9PSBzdGF0ZS5wb2ludGVySWQpIHJldHVybjtcclxuICAgICAgY29uc3QgbGlua0lkID0gc3RhdGUubGlua0lkO1xyXG4gICAgICBjb25zdCBoZWxkTXMgPSBEYXRlLm5vdygpIC0gc3RhdGUuc3RhcnRUaW1lO1xyXG4gICAgICBjb25zdCBzaG91bGRUYXAgPSAhc3RhdGUubW92ZWQgJiYgaGVsZE1zIDwgSE9MRF9UT19QUkVWSUVXX01TO1xyXG4gICAgICByZXNldFRhcEd1YXJkKCk7XHJcbiAgICAgIGlmIChzaG91bGRUYXAgJiYgbGlua0lkKSB7XHJcbiAgICAgICAgb25OYXZpZ2F0ZShsaW5rSWQpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgW29uTmF2aWdhdGUsIHJlc2V0VGFwR3VhcmRdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgYmxvY2tDbGlwYm9hcmRBY3Rpb24gPSB1c2VDYWxsYmFjayhcclxuICAgIChldmVudDogUmVhY3QuQ2xpcGJvYXJkRXZlbnQ8SFRNTERpdkVsZW1lbnQ+IHwgUmVhY3QuTW91c2VFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHtcclxuICAgICAgaWYgKCFyZXNvbHZlQ2xpY2thYmxlQ2FyZChldmVudC50YXJnZXQpKSByZXR1cm47XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9LFxyXG4gICAgW3Jlc29sdmVDbGlja2FibGVDYXJkXVxyXG4gICk7XHJcblxyXG4gIHVzZVRpbWVsaW5lQ2FyZEVmZmVjdHMoeyBjb250YWluZXJSZWYsIGVycm9yTWVzc2FnZSwgaXRlbXMsIHJlc29sdmVDbGlja2FibGVDYXJkIH0pO1xyXG5cclxuICBjb25zdCBoYXNJdGVtcyA9IGl0ZW1zLmxlbmd0aCA+IDA7XHJcbiAgY29uc3Qgc2hvd0VtcHR5ID0gIWVycm9yTWVzc2FnZSAmJiAhaGFzSXRlbXM7XHJcblxyXG4gIGNvbnN0IGNvbnRlbnQgPSBlcnJvck1lc3NhZ2UgPyAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtZGFuZ2VyXCI+e2Vycm9yTWVzc2FnZX08L2Rpdj5cclxuICApIDogaGFzSXRlbXMgPyAoXHJcbiAgICBpdGVtcy5tYXAoKGl0ZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgIGNvbnN0IGtleSA9IGl0ZW0uaWQgfHwgaXRlbS5yZWNJZD8udG9TdHJpbmcoKSB8fCBgdGltZWxpbmUtJHtpbmRleH1gO1xyXG4gICAgICBjb25zdCBpc0NsaWNrYWJsZSA9ICFpdGVtLmlzTm9EYXRhICYmICEhaXRlbS5pZDtcclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2IGtleT17a2V5fSBjbGFzc05hbWU9XCJ0aW1lbGluZS1pdGVtXCI+XHJcbiAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcclxuICAgICAgICAgICAgICBcInRpbWVsaW5lLWNhcmRcIixcclxuICAgICAgICAgICAgICBpdGVtLmlzTm9EYXRhID8gXCJ0aW1lbGluZS1jYXJkLS1ub2RhdGFcIiA6IFwiXCIsXHJcbiAgICAgICAgICAgICAgaXNDbGlja2FibGUgPyBcInRpbWVsaW5lLWNhcmQtLWNsaWNrYWJsZVwiIDogXCJcIlxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgICBkYXRhLWFjdGl2aWRhZGlkPXtpdGVtLmFjdGl2aWRhZElkIHx8IFwiXCJ9XHJcbiAgICAgICAgICAgIGRhdGEtcmVjaWQ9e2l0ZW0ucmVjSWQgIT0gbnVsbCA/IFN0cmluZyhpdGVtLnJlY0lkKSA6IFwiXCJ9XHJcbiAgICAgICAgICAgIGRhdGEtbGluay1pZD17aXNDbGlja2FibGUgPyBpdGVtLmlkIDogXCJcIn1cclxuICAgICAgICAgICAgcm9sZT17aXNDbGlja2FibGUgPyBcImJ1dHRvblwiIDogdW5kZWZpbmVkfVxyXG4gICAgICAgICAgICB0YWJJbmRleD17aXNDbGlja2FibGUgPyAwIDogdW5kZWZpbmVkfVxyXG4gICAgICAgICAgICBhcmlhLWxhYmVsPXtpc0NsaWNrYWJsZSA/IChpdGVtLmZ1bGxOYW1lIHx8IGl0ZW0ubmFtZSB8fCBub0RhdGFUZXh0KSA6IHVuZGVmaW5lZH1cclxuICAgICAgICAgICAgb25LZXlEb3duPXtpc0NsaWNrYWJsZVxyXG4gICAgICAgICAgICAgID8gKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQua2V5ID09PSBcIkVudGVyXCIgfHwgZXZlbnQua2V5ID09PSBcIiBcIikge1xyXG4gICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICBvbk5hdmlnYXRlKGl0ZW0uaWQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICA6IHVuZGVmaW5lZH1cclxuICAgICAgICAgID5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aW1lbGluZS1kYXRlLXBhbmVsIGZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0xIHB4LTMgcHktMyBiZy1zbGF0ZS01MCBib3JkZXItciBib3JkZXItc2xhdGUtMjAwIHRleHQtc2xhdGUtNjAwXCI+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdHJhY2tpbmctWzAuMmVtXSB0ZXh0LXNsYXRlLTUwMFwiPntpdGVtLmRhdGVQYXJ0cy55ZWFyfTwvZGl2PlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LXNlbWlib2xkIHVwcGVyY2FzZSB0cmFja2luZy1bMC4yZW1dIHRleHQtc2xhdGUtNTAwXCI+e2l0ZW0uZGF0ZVBhcnRzLm1vbnRofTwvZGl2PlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC0yeGwgZm9udC1zZW1pYm9sZCB0ZXh0LXByaW1hcnlcIj57aXRlbS5kYXRlUGFydHMuZGF5fTwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aW1lbGluZS1jYXJkX19jb250ZW50IGZsZXgtMSBweS0zIHB4LTRcIj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpbWVsaW5lLW5hbWVcIiBkYXRhLWZ1bGx0ZXh0PXtpdGVtLmZ1bGxOYW1lIHx8IGl0ZW0ubmFtZX0+e2l0ZW0ubmFtZX08L2Rpdj5cclxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0aW1lbGluZS1kZXNjLXRleHRcIiBkYXRhLWZ1bGx0ZXh0PXtpdGVtLmZ1bGxEZXNjIHx8IGl0ZW0uZGVzY3JpcHRpb259PntpdGVtLmRlc2NyaXB0aW9uIHx8IG5vRGF0YVRleHR9PC9wPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApO1xyXG4gICAgfSlcclxuICApIDogbnVsbDtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXZcclxuICAgICAgaWQ9XCJ0aW1lbGluZUNvbnRhaW5lclwiXHJcbiAgICAgIHJlZj17Y29udGFpbmVyUmVmfVxyXG4gICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXCJ0aW1lbGluZS1ib3hcIiwgc2hvd0VtcHR5ID8gXCJ0aW1lbGluZS1lbXB0eVwiIDogXCJcIil9XHJcbiAgICAgIGRhdGEtZW1wdHktdGV4dD17bm9EYXRhVGV4dH1cclxuICAgICAgb25Qb2ludGVyRG93bkNhcHR1cmU9e2hhbmRsZVBvaW50ZXJEb3dufVxyXG4gICAgICBvblBvaW50ZXJNb3ZlQ2FwdHVyZT17aGFuZGxlUG9pbnRlck1vdmV9XHJcbiAgICAgIG9uUG9pbnRlclVwQ2FwdHVyZT17aGFuZGxlUG9pbnRlclVwfVxyXG4gICAgICBvblBvaW50ZXJDYW5jZWxDYXB0dXJlPXtyZXNldFRhcEd1YXJkfVxyXG4gICAgICBvblBvaW50ZXJMZWF2ZT17cmVzZXRUYXBHdWFyZH1cclxuICAgICAgb25Db250ZXh0TWVudUNhcHR1cmU9e2Jsb2NrQ2xpcGJvYXJkQWN0aW9ufVxyXG4gICAgICBvbkNvcHlDYXB0dXJlPXtibG9ja0NsaXBib2FyZEFjdGlvbn1cclxuICAgICAgb25DdXRDYXB0dXJlPXtibG9ja0NsaXBib2FyZEFjdGlvbn1cclxuICAgICAgb25QYXN0ZUNhcHR1cmU9e2Jsb2NrQ2xpcGJvYXJkQWN0aW9ufVxyXG4gICAgPlxyXG4gICAgICB7Y29udGVudH1cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG5jb25zdCBNZW1vaXplZEhpc3RvcnlUYWJsZSA9IFJlYWN0Lm1lbW8oSGlzdG9yeVRhYmxlKTtcclxuTWVtb2l6ZWRIaXN0b3J5VGFibGUuZGlzcGxheU5hbWUgPSBcIkhpc3RvcnlUYWJsZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgTWVtb2l6ZWRIaXN0b3J5VGFibGU7XHJcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgQ29tcGFjdFBhZ2luYXRpb24gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9Db21wYWN0UGFnaW5hdGlvbi50c3hcIjtcbmltcG9ydCBIaXN0b3J5VGFibGUsIHsgdHlwZSBUaW1lbGluZUl0ZW0gfSBmcm9tIFwiLi9IaXN0b3J5VGFibGUudHN4XCI7XG5cbnR5cGUgUGFnaW5hdGlvbkxhYmVscyA9IHtcbiAgZmlyc3Q6IHN0cmluZztcbiAgcHJldjogc3RyaW5nO1xuICBuZXh0OiBzdHJpbmc7XG4gIGxhc3Q6IHN0cmluZztcbn07XG5cbnR5cGUgUHJvcHMgPSB7XG4gIHNob3dSZXN1bHRzOiBib29sZWFuO1xuICBpc0xvYWRpbmc6IGJvb2xlYW47XG4gIGxvYWRpbmdMYWJlbDogc3RyaW5nO1xuICB0aW1lbGluZUl0ZW1zOiBUaW1lbGluZUl0ZW1bXTtcbiAgbm9EYXRhVGV4dDogc3RyaW5nO1xuICBlcnJvck1lc3NhZ2U6IHN0cmluZztcbiAgdG90YWxQYWdlczogbnVtYmVyO1xuICBjdXJyZW50UGFnZTogbnVtYmVyO1xuICBwYWdlV2luZG93OiBudW1iZXI7XG4gIHBhZ2luYXRpb25MYWJlbHM6IFBhZ2luYXRpb25MYWJlbHM7XG4gIG9uTmF2aWdhdGU6IChsaW5rSWQ6IHN0cmluZykgPT4gdm9pZDtcbiAgb25QYWdlQ2hhbmdlOiAocGFnZTogbnVtYmVyKSA9PiB2b2lkO1xufTtcblxuLy8gUmVuZGVycyBoaXN0b3J5IGxvYWRpbmcsIHRhYmxlIGFuZCBwYWdpbmF0aW9uIGFzIGEgZm9jdXNlZCByZXN1bHQgc2VjdGlvbi5cbmNvbnN0IEhpc3RvcnlSZXN1bHRzU2VjdGlvbiA9ICh7XG4gIHNob3dSZXN1bHRzLFxuICBpc0xvYWRpbmcsXG4gIGxvYWRpbmdMYWJlbCxcbiAgdGltZWxpbmVJdGVtcyxcbiAgbm9EYXRhVGV4dCxcbiAgZXJyb3JNZXNzYWdlLFxuICB0b3RhbFBhZ2VzLFxuICBjdXJyZW50UGFnZSxcbiAgcGFnZVdpbmRvdyxcbiAgcGFnaW5hdGlvbkxhYmVscyxcbiAgb25OYXZpZ2F0ZSxcbiAgb25QYWdlQ2hhbmdlLFxufTogUHJvcHMpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPGRpdlxuICAgICAgICBpZD1cInJlc3VsdHNMb2FkZXJcIlxuICAgICAgICBjbGFzc05hbWU9XCJsb2FkZXItYm94IGdsYXNzLXBhbmVsIHNoYWRvdy1jYXJkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQtc20gdGV4dC1uZXV0cmFsLTcwMFwiXG4gICAgICAgIHN0eWxlPXt7IGRpc3BsYXk6IGlzTG9hZGluZyA/IFwiZmxleFwiIDogXCJub25lXCIgfX1cbiAgICAgID5cbiAgICAgICAgPHN2ZyBjbGFzc05hbWU9XCJpbmQtc3Bpbm5lciBzaXplLTVcIiB2aWV3Qm94PVwiMCAwIDIwIDIwXCIgcm9sZT1cInN0YXR1c1wiIGFyaWEtbGFiZWw9e2xvYWRpbmdMYWJlbH0+XG4gICAgICAgICAgPGNpcmNsZSBjbGFzc05hbWU9XCJpbmQtc3Bpbm5lcl9fY2lyY2xlXCIgY3g9XCIxMFwiIGN5PVwiMTBcIiByPVwiOFwiIHN0cm9rZVdpZHRoPVwiMlwiIC8+XG4gICAgICAgIDwvc3ZnPlxuICAgICAgICB7bG9hZGluZ0xhYmVsfVxuICAgICAgPC9kaXY+XG5cbiAgICAgIHtzaG93UmVzdWx0cyAmJiAoXG4gICAgICAgIDw+XG4gICAgICAgICAgPEhpc3RvcnlUYWJsZVxuICAgICAgICAgICAgaXRlbXM9e3RpbWVsaW5lSXRlbXN9XG4gICAgICAgICAgICBub0RhdGFUZXh0PXtub0RhdGFUZXh0fVxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlPXtlcnJvck1lc3NhZ2V9XG4gICAgICAgICAgICBvbk5hdmlnYXRlPXtvbk5hdmlnYXRlfVxuICAgICAgICAgIC8+XG5cbiAgICAgICAgICA8Q29tcGFjdFBhZ2luYXRpb25cbiAgICAgICAgICAgIHRvdGFsUGFnZXM9e3RvdGFsUGFnZXN9XG4gICAgICAgICAgICBjdXJyZW50UGFnZT17Y3VycmVudFBhZ2V9XG4gICAgICAgICAgICBwYWdlV2luZG93PXtwYWdlV2luZG93fVxuICAgICAgICAgICAgbG9hZGluZz17aXNMb2FkaW5nfVxuICAgICAgICAgICAgb25QYWdlQ2hhbmdlPXtvblBhZ2VDaGFuZ2V9XG4gICAgICAgICAgICBsYWJlbHM9e3BhZ2luYXRpb25MYWJlbHN9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC8+XG4gICAgICApfVxuICAgIDwvPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgSGlzdG9yeVJlc3VsdHNTZWN0aW9uO1xuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VNZW1vLCB0eXBlIERpc3BhdGNoLCB0eXBlIE1vdXNlRXZlbnQgYXMgUmVhY3RNb3VzZUV2ZW50LCB0eXBlIFNldFN0YXRlQWN0aW9uIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBjbGFzc05hbWVzIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2NsYXNzTmFtZXMudHNcIjtcbmltcG9ydCB0eXBlIHsgSGlzdG9yeU1hbnVhbERheUNlbGwgfSBmcm9tIFwiLi9IaXN0b3J5TWFudWFsRGF0ZVBpY2tlci50c3hcIjtcblxudHlwZSBDYWxlbmRhckNlbGwgPSB7XG4gIGRhdGU6IERhdGUgfCBudWxsO1xuICBpc286IHN0cmluZztcbiAgaXNFbXB0eTogYm9vbGVhbjtcbn07XG5cbnR5cGUgQXJncyA9IHtcbiAgY3VycmVudE1vbnRoOiBudW1iZXI7XG4gIGN1cnJlbnRZZWFyOiBudW1iZXI7XG4gIGxvY2FsZTogc3RyaW5nO1xuICBzdGFydERhdGU6IERhdGUgfCBudWxsO1xuICBlbmREYXRlOiBEYXRlIHwgbnVsbDtcbiAgaG92ZXJEYXRlOiBEYXRlIHwgbnVsbDtcbiAgc2VsZWN0aW5nU3RlcDogXCJzdGFydFwiIHwgXCJlbmRcIiB8IFwiZG9uZVwiO1xuICBzZXRDdXJyZW50TW9udGg6IERpc3BhdGNoPFNldFN0YXRlQWN0aW9uPG51bWJlcj4+O1xuICBzZXRDdXJyZW50WWVhcjogRGlzcGF0Y2g8U2V0U3RhdGVBY3Rpb248bnVtYmVyPj47XG4gIHNldEhvdmVyRGF0ZTogRGlzcGF0Y2g8U2V0U3RhdGVBY3Rpb248RGF0ZSB8IG51bGw+PjtcbiAgaGFuZGxlU2VsZWN0OiAoZGF0ZU9iajogRGF0ZSkgPT4gdm9pZDtcbiAgbG9nSGlzdG9yeTogKG1lc3NhZ2U6IHN0cmluZywgZGF0YT86IFJlY29yZDxzdHJpbmcsIHVua25vd24+KSA9PiB2b2lkO1xuICB0b0lTTzogKHZhbHVlOiBEYXRlKSA9PiBzdHJpbmc7XG4gIGlzQmVmb3JlOiAoYTogRGF0ZSB8IG51bGwsIGI6IERhdGUgfCBudWxsKSA9PiBib29sZWFuO1xuICBmb3JtYXRNb250aExhYmVsOiAodmFsdWU6IERhdGUsIGxvY2FsZTogc3RyaW5nKSA9PiBzdHJpbmc7XG59O1xuXG5jb25zdCBzYW1lRGF5ID0gKGE6IERhdGUgfCBudWxsLCBiOiBEYXRlIHwgbnVsbCkgPT4gISEoYSAmJiBiICYmIGEuZ2V0VGltZSgpID09PSBiLmdldFRpbWUoKSk7XG5cbi8vIE93bnMgY2FsZW5kYXIgbW9udGggbmF2aWdhdGlvbiBhbmQgZGF5LWNlbGwgZGVyaXZhdGlvbiBmb3IgdGhlIGhpc3RvcnkgcGlja2VyLlxuZXhwb3J0IGNvbnN0IHVzZUhpc3RvcnlDYWxlbmRhclBpY2tlciA9ICh7XG4gIGN1cnJlbnRNb250aCxcbiAgY3VycmVudFllYXIsXG4gIGxvY2FsZSxcbiAgc3RhcnREYXRlLFxuICBlbmREYXRlLFxuICBob3ZlckRhdGUsXG4gIHNlbGVjdGluZ1N0ZXAsXG4gIHNldEN1cnJlbnRNb250aCxcbiAgc2V0Q3VycmVudFllYXIsXG4gIHNldEhvdmVyRGF0ZSxcbiAgaGFuZGxlU2VsZWN0LFxuICBsb2dIaXN0b3J5LFxuICB0b0lTTyxcbiAgaXNCZWZvcmUsXG4gIGZvcm1hdE1vbnRoTGFiZWwsXG59OiBBcmdzKSA9PiB7XG4gIGNvbnN0IGNhbGVuZGFyID0gdXNlTWVtbygoKSA9PiB7XG4gICAgY29uc3QgZmlyc3REYXkgPSBuZXcgRGF0ZShjdXJyZW50WWVhciwgY3VycmVudE1vbnRoLCAxKTtcbiAgICBjb25zdCBkYXlzSW5Nb250aCA9IG5ldyBEYXRlKGN1cnJlbnRZZWFyLCBjdXJyZW50TW9udGggKyAxLCAwKS5nZXREYXRlKCk7XG4gICAgY29uc3Qgb2Zmc2V0ID0gKGZpcnN0RGF5LmdldERheSgpICsgNikgJSA3O1xuICAgIGNvbnN0IGNlbGxzOiBDYWxlbmRhckNlbGxbXSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb2Zmc2V0OyBpKyspIHtcbiAgICAgIGNlbGxzLnB1c2goeyBkYXRlOiBudWxsLCBpc286IFwiXCIsIGlzRW1wdHk6IHRydWUgfSk7XG4gICAgfVxuICAgIGZvciAobGV0IGQgPSAxOyBkIDw9IGRheXNJbk1vbnRoOyBkKyspIHtcbiAgICAgIGNvbnN0IGRhdGVPYmogPSBuZXcgRGF0ZShjdXJyZW50WWVhciwgY3VycmVudE1vbnRoLCBkKTtcbiAgICAgIGNlbGxzLnB1c2goeyBkYXRlOiBkYXRlT2JqLCBpc286IHRvSVNPKGRhdGVPYmopLCBpc0VtcHR5OiBmYWxzZSB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIGNlbGxzLFxuICAgICAgbGFiZWw6IGZvcm1hdE1vbnRoTGFiZWwoZmlyc3REYXksIGxvY2FsZSksXG4gICAgfTtcbiAgfSwgW2N1cnJlbnRNb250aCwgY3VycmVudFllYXIsIGZvcm1hdE1vbnRoTGFiZWwsIGxvY2FsZSwgdG9JU09dKTtcblxuICBjb25zdCBwcmV2aWV3RW5kID0gZW5kRGF0ZSB8fCAoc2VsZWN0aW5nU3RlcCA9PT0gXCJlbmRcIiA/IGhvdmVyRGF0ZSA6IG51bGwpO1xuXG4gIGNvbnN0IGhhbmRsZVByZXZNb250aCA9IHVzZUNhbGxiYWNrKFxuICAgIChldmVudDogUmVhY3RNb3VzZUV2ZW50PEhUTUxCdXR0b25FbGVtZW50PikgPT4ge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBzZXRDdXJyZW50TW9udGgoKHByZXYpID0+IHtcbiAgICAgICAgY29uc3QgbmV4dCA9IHByZXYgLSAxO1xuICAgICAgICBpZiAobmV4dCA8IDApIHtcbiAgICAgICAgICBzZXRDdXJyZW50WWVhcigoeWVhcikgPT4geWVhciAtIDEpO1xuICAgICAgICAgIHJldHVybiAxMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgW3NldEN1cnJlbnRNb250aCwgc2V0Q3VycmVudFllYXJdXG4gICk7XG5cbiAgY29uc3QgaGFuZGxlTmV4dE1vbnRoID0gdXNlQ2FsbGJhY2soXG4gICAgKGV2ZW50OiBSZWFjdE1vdXNlRXZlbnQ8SFRNTEJ1dHRvbkVsZW1lbnQ+KSA9PiB7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIHNldEN1cnJlbnRNb250aCgocHJldikgPT4ge1xuICAgICAgICBjb25zdCBuZXh0ID0gcHJldiArIDE7XG4gICAgICAgIGlmIChuZXh0ID4gMTEpIHtcbiAgICAgICAgICBzZXRDdXJyZW50WWVhcigoeWVhcikgPT4geWVhciArIDEpO1xuICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBbc2V0Q3VycmVudE1vbnRoLCBzZXRDdXJyZW50WWVhcl1cbiAgKTtcblxuICBjb25zdCBoYW5kbGVHcmlkTW91c2VMZWF2ZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBzZXRIb3ZlckRhdGUobnVsbCk7XG4gIH0sIFtzZXRIb3ZlckRhdGVdKTtcblxuICBjb25zdCBoYW5kbGVNYW51YWxEYXlDbGljayA9IHVzZUNhbGxiYWNrKFxuICAgIChjZWxsOiBIaXN0b3J5TWFudWFsRGF5Q2VsbCkgPT4ge1xuICAgICAgaWYgKCFjZWxsLmRhdGUpIHJldHVybjtcbiAgICAgIGxvZ0hpc3RvcnkoXCJkYXlDbGlja1wiLCB7IGRhdGU6IGNlbGwuaXNvIHx8IFwiXCIsIGRpc2FibGVkOiAhIWNlbGwuZGlzYWJsZWQgfSk7XG4gICAgICBoYW5kbGVTZWxlY3QoY2VsbC5kYXRlKTtcbiAgICB9LFxuICAgIFtoYW5kbGVTZWxlY3QsIGxvZ0hpc3RvcnldXG4gICk7XG5cbiAgY29uc3QgaGFuZGxlTWFudWFsRGF5SG92ZXIgPSB1c2VDYWxsYmFjayhcbiAgICAoY2VsbDogSGlzdG9yeU1hbnVhbERheUNlbGwpID0+IHtcbiAgICAgIGlmICghY2VsbC5kYXRlKSByZXR1cm47XG4gICAgICBpZiAoc2VsZWN0aW5nU3RlcCA9PT0gXCJlbmRcIiAmJiBzdGFydERhdGUpIHtcbiAgICAgICAgc2V0SG92ZXJEYXRlKG5ldyBEYXRlKGNlbGwuZGF0ZSkpO1xuICAgICAgfVxuICAgIH0sXG4gICAgW3NlbGVjdGluZ1N0ZXAsIHNldEhvdmVyRGF0ZSwgc3RhcnREYXRlXVxuICApO1xuXG4gIGNvbnN0IG1hbnVhbERheUNlbGxzID0gdXNlTWVtbzxIaXN0b3J5TWFudWFsRGF5Q2VsbFtdPigoKSA9PiB7XG4gICAgcmV0dXJuIGNhbGVuZGFyLmNlbGxzLm1hcCgoY2VsbCwgaWR4KSA9PiB7XG4gICAgICBpZiAoY2VsbC5pc0VtcHR5KSB7XG4gICAgICAgIHJldHVybiB7IGtleTogYGVtcHR5LSR7aWR4fWAsIGlzRW1wdHk6IHRydWUgfTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZGF0ZU9iaiA9IGNlbGwuZGF0ZSBhcyBEYXRlO1xuICAgICAgY29uc3QgaXNTdGFydCA9IHNhbWVEYXkoZGF0ZU9iaiwgc3RhcnREYXRlKTtcbiAgICAgIGNvbnN0IGlzRW5kID0gc2FtZURheShkYXRlT2JqLCBlbmREYXRlKTtcbiAgICAgIGNvbnN0IGluUmFuZ2UgPSBzdGFydERhdGUgJiYgcHJldmlld0VuZCAmJiBpc0JlZm9yZShzdGFydERhdGUsIGRhdGVPYmopICYmIGlzQmVmb3JlKGRhdGVPYmosIHByZXZpZXdFbmQpO1xuICAgICAgY29uc3QgaG92ZXJSYW5nZSA9IHN0YXJ0RGF0ZSAmJiAhZW5kRGF0ZSAmJiBob3ZlckRhdGUgJiYgaXNCZWZvcmUoc3RhcnREYXRlLCBkYXRlT2JqKSAmJiBpc0JlZm9yZShkYXRlT2JqLCBob3ZlckRhdGUpO1xuICAgICAgY29uc3QgZGlzYWJsZWQgPSBzZWxlY3RpbmdTdGVwID09PSBcImVuZFwiICYmICEhc3RhcnREYXRlICYmIGlzQmVmb3JlKGRhdGVPYmosIHN0YXJ0RGF0ZSk7XG4gICAgICBjb25zdCBpc1RvZGF5ID0gc2FtZURheShkYXRlT2JqLCBuZXcgRGF0ZSgpKTtcblxuICAgICAgY29uc3QgZGF5Q2xhc3MgPSBjbGFzc05hbWVzKFxuICAgICAgICBcImRycC1kYXlcIixcbiAgICAgICAgaXNTdGFydCA/IFwic3RhcnQgcmFuZ2Utc3RhcnRcIiA6IFwiXCIsXG4gICAgICAgIGlzRW5kID8gXCJlbmQgcmFuZ2UtZW5kXCIgOiBcIlwiLFxuICAgICAgICBpblJhbmdlID8gXCJpbi1yYW5nZVwiIDogXCJcIixcbiAgICAgICAgaG92ZXJSYW5nZSA/IFwiaG92ZXItcmFuZ2VcIiA6IFwiXCIsXG4gICAgICAgIGRpc2FibGVkID8gXCJkaXNhYmxlZFwiIDogXCJcIixcbiAgICAgICAgaXNUb2RheSA/IFwidG9kYXlcIiA6IFwiXCJcbiAgICAgICk7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGtleTogY2VsbC5pc28sXG4gICAgICAgIGlzRW1wdHk6IGZhbHNlLFxuICAgICAgICBkYXRlOiBkYXRlT2JqLFxuICAgICAgICBpc286IGNlbGwuaXNvLFxuICAgICAgICBkYXlMYWJlbDogZGF0ZU9iai5nZXREYXRlKCksXG4gICAgICAgIGRheUNsYXNzLFxuICAgICAgICBkaXNhYmxlZCxcbiAgICAgIH07XG4gICAgfSk7XG4gIH0sIFtjYWxlbmRhci5jZWxscywgZW5kRGF0ZSwgaG92ZXJEYXRlLCBpc0JlZm9yZSwgcHJldmlld0VuZCwgc2VsZWN0aW5nU3RlcCwgc3RhcnREYXRlXSk7XG5cbiAgcmV0dXJuIHtcbiAgICBjYWxlbmRhckxhYmVsOiBjYWxlbmRhci5sYWJlbCxcbiAgICBtYW51YWxEYXlDZWxscyxcbiAgICBoYW5kbGVQcmV2TW9udGgsXG4gICAgaGFuZGxlTmV4dE1vbnRoLFxuICAgIGhhbmRsZUdyaWRNb3VzZUxlYXZlLFxuICAgIGhhbmRsZU1hbnVhbERheUNsaWNrLFxuICAgIGhhbmRsZU1hbnVhbERheUhvdmVyLFxuICB9O1xufTtcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjaywgdHlwZSBEaXNwYXRjaCwgdHlwZSBNb3VzZUV2ZW50IGFzIFJlYWN0TW91c2VFdmVudCwgdHlwZSBTZXRTdGF0ZUFjdGlvbiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHR5cGUgeyBMb2FkT3ZlcnJpZGUgfSBmcm9tIFwiLi91c2VIaXN0b3J5RmlsdGVyc1N0YXRlLnRzXCI7XG5cbnR5cGUgQXBwbHlPcHRpb25zID0ge1xuICBjbG9zZVBhbmVsPzogYm9vbGVhbjtcbiAgZm9yY2U/OiBib29sZWFuO1xuICBwYWdlPzogbnVtYmVyO1xufTtcblxudHlwZSBTdHJpbmdSZWYgPSB7XG4gIGN1cnJlbnQ6IHN0cmluZztcbn07XG5cbnR5cGUgQXJncyA9IHtcbiAgc3RhcnREYXRlOiBEYXRlIHwgbnVsbDtcbiAgZW5kRGF0ZTogRGF0ZSB8IG51bGw7XG4gIGZyb21EYXRlVmFsdWU6IHN0cmluZztcbiAgdG9EYXRlVmFsdWU6IHN0cmluZztcbiAgYWNjb3VudE51bVZhbHVlOiBzdHJpbmc7XG4gIG93bmVyQXhVc2VySWRWYWx1ZTogc3RyaW5nO1xuICBsYXN0U2lnbmF0dXJlUmVmOiBTdHJpbmdSZWY7XG4gIHZhbGlkYXRlTWFudWFsUmFuZ2U6ICgpID0+IGJvb2xlYW47XG4gIG5vcm1hbGl6ZVJhbmdlOiAoZnJvbTogc3RyaW5nLCB0bzogc3RyaW5nKSA9PiB7IGZyb206IHN0cmluZzsgdG86IHN0cmluZyB9O1xuICBsb2FkQWN0aXZpdGllczogKHBhZ2U6IG51bWJlciwgb3ZlcnJpZGU/OiBMb2FkT3ZlcnJpZGUpID0+IHZvaWQ7XG4gIGhhbmRsZUNsZWFyU3RhdGU6IChldmVudDogUmVhY3RNb3VzZUV2ZW50KSA9PiB2b2lkO1xuICBjbGVhckZpbHRlckNhY2hlOiAoKSA9PiB2b2lkO1xuICByZXNldEFjdGl2aXRpZXM6ICgpID0+IHZvaWQ7XG4gIHJlc2V0SGlzdG9yeUZpbHRlcnM6ICgpID0+IHZvaWQ7XG4gIHNldElzT3BlbjogRGlzcGF0Y2g8U2V0U3RhdGVBY3Rpb248Ym9vbGVhbj4+O1xuICBzZXRTaG93RmlsdGVyczogRGlzcGF0Y2g8U2V0U3RhdGVBY3Rpb248Ym9vbGVhbj4+O1xuICBzZXRTaG93TWFudWFsRXJyb3I6IERpc3BhdGNoPFNldFN0YXRlQWN0aW9uPGJvb2xlYW4+Pjtcbn07XG5cbi8vIEtlZXBzIGZpbHRlciBhcHBseS9yZXNldCBiZWhhdmlvciB0b2dldGhlciBhbmQgb3V0IG9mIHRoZSBwYWdlIHJlbmRlciBjb250YWluZXIuXG5leHBvcnQgY29uc3QgdXNlSGlzdG9yeUZpbHRlckFjdGlvbnMgPSAoe1xuICBzdGFydERhdGUsXG4gIGVuZERhdGUsXG4gIGZyb21EYXRlVmFsdWUsXG4gIHRvRGF0ZVZhbHVlLFxuICBhY2NvdW50TnVtVmFsdWUsXG4gIG93bmVyQXhVc2VySWRWYWx1ZSxcbiAgbGFzdFNpZ25hdHVyZVJlZixcbiAgdmFsaWRhdGVNYW51YWxSYW5nZSxcbiAgbm9ybWFsaXplUmFuZ2UsXG4gIGxvYWRBY3Rpdml0aWVzLFxuICBoYW5kbGVDbGVhclN0YXRlLFxuICBjbGVhckZpbHRlckNhY2hlLFxuICByZXNldEFjdGl2aXRpZXMsXG4gIHJlc2V0SGlzdG9yeUZpbHRlcnMsXG4gIHNldElzT3BlbixcbiAgc2V0U2hvd0ZpbHRlcnMsXG4gIHNldFNob3dNYW51YWxFcnJvcixcbn06IEFyZ3MpID0+IHtcbiAgY29uc3QgYXBwbHlGaWx0ZXJzID0gdXNlQ2FsbGJhY2soXG4gICAgKG9wdGlvbnM/OiBBcHBseU9wdGlvbnMpID0+IHtcbiAgICAgIGlmICghdmFsaWRhdGVNYW51YWxSYW5nZSgpKSByZXR1cm47XG4gICAgICBpZiAoIXN0YXJ0RGF0ZSB8fCAhZW5kRGF0ZSkgcmV0dXJuO1xuXG4gICAgICBjb25zdCBub3JtYWxpemVkID0gbm9ybWFsaXplUmFuZ2UoZnJvbURhdGVWYWx1ZSwgdG9EYXRlVmFsdWUpO1xuICAgICAgY29uc3QgcGFnZSA9IG9wdGlvbnM/LnBhZ2UgPz8gMTtcbiAgICAgIGNvbnN0IHNpZ25hdHVyZSA9IGAke25vcm1hbGl6ZWQuZnJvbX18JHtub3JtYWxpemVkLnRvfXwke2FjY291bnROdW1WYWx1ZX18JHtvd25lckF4VXNlcklkVmFsdWV9fCR7cGFnZX1gO1xuXG4gICAgICBpZiAob3B0aW9ucz8uZm9yY2UgfHwgbGFzdFNpZ25hdHVyZVJlZi5jdXJyZW50ICE9PSBzaWduYXR1cmUpIHtcbiAgICAgICAgbG9hZEFjdGl2aXRpZXMocGFnZSwge1xuICAgICAgICAgIGZyb21EYXRlOiBub3JtYWxpemVkLmZyb20sXG4gICAgICAgICAgdG9EYXRlOiBub3JtYWxpemVkLnRvLFxuICAgICAgICAgIGFjY291bnROdW06IGFjY291bnROdW1WYWx1ZSxcbiAgICAgICAgICBvd25lckF4VXNlcklkOiBvd25lckF4VXNlcklkVmFsdWUsXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBzZXRTaG93TWFudWFsRXJyb3IoZmFsc2UpO1xuICAgICAgaWYgKG9wdGlvbnM/LmNsb3NlUGFuZWwpIHtcbiAgICAgICAgc2V0SXNPcGVuKGZhbHNlKTtcbiAgICAgICAgc2V0U2hvd0ZpbHRlcnMoZmFsc2UpO1xuICAgICAgfVxuICAgIH0sXG4gICAgW1xuICAgICAgYWNjb3VudE51bVZhbHVlLFxuICAgICAgZW5kRGF0ZSxcbiAgICAgIGZyb21EYXRlVmFsdWUsXG4gICAgICBsYXN0U2lnbmF0dXJlUmVmLFxuICAgICAgbG9hZEFjdGl2aXRpZXMsXG4gICAgICBvd25lckF4VXNlcklkVmFsdWUsXG4gICAgICBzZXRJc09wZW4sXG4gICAgICBzZXRTaG93RmlsdGVycyxcbiAgICAgIHNldFNob3dNYW51YWxFcnJvcixcbiAgICAgIHN0YXJ0RGF0ZSxcbiAgICAgIHRvRGF0ZVZhbHVlLFxuICAgICAgdmFsaWRhdGVNYW51YWxSYW5nZSxcbiAgICAgIG5vcm1hbGl6ZVJhbmdlLFxuICAgIF1cbiAgKTtcblxuICBjb25zdCBoYW5kbGVDbGVhciA9IHVzZUNhbGxiYWNrKFxuICAgIChldmVudDogUmVhY3RNb3VzZUV2ZW50KSA9PiB7XG4gICAgICBoYW5kbGVDbGVhclN0YXRlKGV2ZW50KTtcbiAgICAgIGNsZWFyRmlsdGVyQ2FjaGUoKTtcbiAgICAgIHJlc2V0QWN0aXZpdGllcygpO1xuICAgIH0sXG4gICAgW2NsZWFyRmlsdGVyQ2FjaGUsIGhhbmRsZUNsZWFyU3RhdGUsIHJlc2V0QWN0aXZpdGllc11cbiAgKTtcblxuICBjb25zdCBoYW5kbGVSZXNldEZpbHRlcnMgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgcmVzZXRIaXN0b3J5RmlsdGVycygpO1xuICAgIGNsZWFyRmlsdGVyQ2FjaGUoKTtcbiAgICByZXNldEFjdGl2aXRpZXMoKTtcbiAgICBzZXRJc09wZW4oZmFsc2UpO1xuICAgIHNldFNob3dGaWx0ZXJzKHRydWUpO1xuICB9LCBbY2xlYXJGaWx0ZXJDYWNoZSwgcmVzZXRBY3Rpdml0aWVzLCByZXNldEhpc3RvcnlGaWx0ZXJzLCBzZXRJc09wZW4sIHNldFNob3dGaWx0ZXJzXSk7XG5cbiAgcmV0dXJuIHtcbiAgICBhcHBseUZpbHRlcnMsXG4gICAgaGFuZGxlQ2xlYXIsXG4gICAgaGFuZGxlUmVzZXRGaWx0ZXJzLFxuICB9O1xufTtcbiIsICJpbXBvcnQgeyB1c2VFZmZlY3QsIHR5cGUgRGlzcGF0Y2gsIHR5cGUgU2V0U3RhdGVBY3Rpb24gfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB0eXBlIHsgSGlzdG9yeUNhY2hlZEZpbHRlciB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VIaXN0b3J5RmlsdGVyQ2FjaGUudHNcIjtcbmltcG9ydCB0eXBlIHsgRmlsdGVyTG9hZFJlcXVlc3QsIExvYWRPdmVycmlkZSB9IGZyb20gXCIuL3VzZUhpc3RvcnlGaWx0ZXJzU3RhdGUudHNcIjtcblxudHlwZSBCb29sZWFuUmVmID0ge1xuICBjdXJyZW50OiBib29sZWFuO1xufTtcblxudHlwZSBBcmdzID0ge1xuICByZWFkeVRvTG9hZDogYm9vbGVhbjtcbiAgZGVmYXVsdEZyb21EYXRlOiBzdHJpbmc7XG4gIGRlZmF1bHRUb0RhdGU6IHN0cmluZztcbiAgZGlkSW5pdEZpbHRlclJlZjogQm9vbGVhblJlZjtcbiAgaGFzUmVzdG9yZWRGaWx0ZXJSZWY6IEJvb2xlYW5SZWY7XG4gIHJldHJ5T25OZXR3b3JrRXJyb3JSZWY6IEJvb2xlYW5SZWY7XG4gIGNvbnN1bWVSZXR1cm5GbGFnOiAoKSA9PiBib29sZWFuO1xuICByZWFkQ2FjaGVkRmlsdGVyOiAoKSA9PiBIaXN0b3J5Q2FjaGVkRmlsdGVyIHwgbnVsbDtcbiAgYXBwbHlDYWNoZWRGaWx0ZXI6IChmaWx0ZXI6IEhpc3RvcnlDYWNoZWRGaWx0ZXIgfCBudWxsKSA9PiBGaWx0ZXJMb2FkUmVxdWVzdCB8IG51bGw7XG4gIGFwcGx5RGVmYXVsdFJhbmdlRnJvbVByb3BzOiAoKSA9PiBGaWx0ZXJMb2FkUmVxdWVzdCB8IG51bGw7XG4gIHJlc29sdmVPd25lckF4VXNlcklkRm9yTG9hZDogKG93bmVyQXhVc2VySWQ/OiBzdHJpbmcpID0+IHN0cmluZztcbiAgbG9hZEFjdGl2aXRpZXM6IChwYWdlOiBudW1iZXIsIG92ZXJyaWRlPzogTG9hZE92ZXJyaWRlKSA9PiB2b2lkO1xuICByZXNldEFjdGl2aXRpZXM6ICgpID0+IHZvaWQ7XG4gIHJlc2V0SGlzdG9yeUZpbHRlcnM6ICgpID0+IHZvaWQ7XG4gIGNsZWFyRmlsdGVyQ2FjaGU6ICgpID0+IHZvaWQ7XG4gIHNldFNob3dGaWx0ZXJzOiBEaXNwYXRjaDxTZXRTdGF0ZUFjdGlvbjxib29sZWFuPj47XG4gIHNldElzT3BlbjogRGlzcGF0Y2g8U2V0U3RhdGVBY3Rpb248Ym9vbGVhbj4+O1xuICBsb2dIaXN0b3J5OiAobWVzc2FnZTogc3RyaW5nLCBkYXRhPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pID0+IHZvaWQ7XG59O1xuXG4vLyBSZXN0b3JlcyB0aGUgaGlzdG9yeSBmaWx0ZXJzIG9uY2Ugb24gbW91bnQgYW5kIHN0YXJ0cyB0aGUgZmlyc3QgYWN0aXZpdHkgbG9hZC5cbmV4cG9ydCBjb25zdCB1c2VIaXN0b3J5SW5pdGlhbExvYWQgPSAoe1xuICByZWFkeVRvTG9hZCxcbiAgZGVmYXVsdEZyb21EYXRlLFxuICBkZWZhdWx0VG9EYXRlLFxuICBkaWRJbml0RmlsdGVyUmVmLFxuICBoYXNSZXN0b3JlZEZpbHRlclJlZixcbiAgcmV0cnlPbk5ldHdvcmtFcnJvclJlZixcbiAgY29uc3VtZVJldHVybkZsYWcsXG4gIHJlYWRDYWNoZWRGaWx0ZXIsXG4gIGFwcGx5Q2FjaGVkRmlsdGVyLFxuICBhcHBseURlZmF1bHRSYW5nZUZyb21Qcm9wcyxcbiAgcmVzb2x2ZU93bmVyQXhVc2VySWRGb3JMb2FkLFxuICBsb2FkQWN0aXZpdGllcyxcbiAgcmVzZXRBY3Rpdml0aWVzLFxuICByZXNldEhpc3RvcnlGaWx0ZXJzLFxuICBjbGVhckZpbHRlckNhY2hlLFxuICBzZXRTaG93RmlsdGVycyxcbiAgc2V0SXNPcGVuLFxuICBsb2dIaXN0b3J5LFxufTogQXJncykgPT4ge1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGxvZ0hpc3RvcnkoXCJpbml0XCIsIHsgZGVmYXVsdEZyb21EYXRlLCBkZWZhdWx0VG9EYXRlIH0pO1xuICB9LCBbZGVmYXVsdEZyb21EYXRlLCBkZWZhdWx0VG9EYXRlLCBsb2dIaXN0b3J5XSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIXJlYWR5VG9Mb2FkKSByZXR1cm47XG4gICAgaWYgKGRpZEluaXRGaWx0ZXJSZWYuY3VycmVudCkgcmV0dXJuO1xuICAgIGRpZEluaXRGaWx0ZXJSZWYuY3VycmVudCA9IHRydWU7XG5cbiAgICBjb25zdCB3aXRoUmVzb2x2ZWRPd25lciA9IChyZXF1ZXN0OiBGaWx0ZXJMb2FkUmVxdWVzdCk6IEZpbHRlckxvYWRSZXF1ZXN0ID0+ICh7XG4gICAgICAuLi5yZXF1ZXN0LFxuICAgICAgb3ZlcnJpZGU6IHtcbiAgICAgICAgLi4ucmVxdWVzdC5vdmVycmlkZSxcbiAgICAgICAgb3duZXJBeFVzZXJJZDogcmVzb2x2ZU93bmVyQXhVc2VySWRGb3JMb2FkKHJlcXVlc3Qub3ZlcnJpZGUub3duZXJBeFVzZXJJZCksXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgY29uc3QgY2FjaGVkID0gY29uc3VtZVJldHVybkZsYWcoKSA/IHJlYWRDYWNoZWRGaWx0ZXIoKSA6IG51bGw7XG4gICAgaWYgKGNhY2hlZCAmJiBjYWNoZWQuZnJvbURhdGUgJiYgY2FjaGVkLnRvRGF0ZSkge1xuICAgICAgbG9nSGlzdG9yeShcInJlc3RvcmVGaWx0ZXJcIiwgY2FjaGVkKTtcbiAgICAgIGNvbnN0IGNhY2hlZFJlcXVlc3QgPSBhcHBseUNhY2hlZEZpbHRlcihjYWNoZWQpO1xuICAgICAgaWYgKGNhY2hlZFJlcXVlc3QpIHtcbiAgICAgICAgY29uc3QgcmVzb2x2ZWRSZXF1ZXN0ID0gd2l0aFJlc29sdmVkT3duZXIoY2FjaGVkUmVxdWVzdCk7XG4gICAgICAgIHJldHJ5T25OZXR3b3JrRXJyb3JSZWYuY3VycmVudCA9IHRydWU7XG4gICAgICAgIGxvYWRBY3Rpdml0aWVzKHJlc29sdmVkUmVxdWVzdC5wYWdlLCByZXNvbHZlZFJlcXVlc3Qub3ZlcnJpZGUpO1xuICAgICAgICBzZXRTaG93RmlsdGVycyhmYWxzZSk7XG4gICAgICAgIHNldElzT3BlbihmYWxzZSk7XG4gICAgICAgIGhhc1Jlc3RvcmVkRmlsdGVyUmVmLmN1cnJlbnQgPSB0cnVlO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgZGVmYXVsdFJlcXVlc3QgPSBhcHBseURlZmF1bHRSYW5nZUZyb21Qcm9wcygpO1xuICAgIGlmIChkZWZhdWx0UmVxdWVzdCkge1xuICAgICAgY29uc3QgcmVzb2x2ZWRSZXF1ZXN0ID0gd2l0aFJlc29sdmVkT3duZXIoZGVmYXVsdFJlcXVlc3QpO1xuICAgICAgcmV0cnlPbk5ldHdvcmtFcnJvclJlZi5jdXJyZW50ID0gdHJ1ZTtcbiAgICAgIGxvYWRBY3Rpdml0aWVzKHJlc29sdmVkUmVxdWVzdC5wYWdlLCByZXNvbHZlZFJlcXVlc3Qub3ZlcnJpZGUpO1xuICAgICAgc2V0U2hvd0ZpbHRlcnMoZmFsc2UpO1xuICAgICAgc2V0SXNPcGVuKGZhbHNlKTtcbiAgICAgIGhhc1Jlc3RvcmVkRmlsdGVyUmVmLmN1cnJlbnQgPSB0cnVlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHJlc2V0SGlzdG9yeUZpbHRlcnMoKTtcbiAgICBjbGVhckZpbHRlckNhY2hlKCk7XG4gICAgcmVzZXRBY3Rpdml0aWVzKCk7XG4gICAgc2V0U2hvd0ZpbHRlcnModHJ1ZSk7XG4gICAgc2V0SXNPcGVuKGZhbHNlKTtcbiAgfSwgW1xuICAgIGFwcGx5Q2FjaGVkRmlsdGVyLFxuICAgIGFwcGx5RGVmYXVsdFJhbmdlRnJvbVByb3BzLFxuICAgIGNsZWFyRmlsdGVyQ2FjaGUsXG4gICAgY29uc3VtZVJldHVybkZsYWcsXG4gICAgZGlkSW5pdEZpbHRlclJlZixcbiAgICBoYXNSZXN0b3JlZEZpbHRlclJlZixcbiAgICBsb2FkQWN0aXZpdGllcyxcbiAgICByZWFkeVRvTG9hZCxcbiAgICByZWFkQ2FjaGVkRmlsdGVyLFxuICAgIHJlc2V0QWN0aXZpdGllcyxcbiAgICByZXNldEhpc3RvcnlGaWx0ZXJzLFxuICAgIHJldHJ5T25OZXR3b3JrRXJyb3JSZWYsXG4gICAgcmVzb2x2ZU93bmVyQXhVc2VySWRGb3JMb2FkLFxuICAgIHNldElzT3BlbixcbiAgICBzZXRTaG93RmlsdGVycyxcbiAgICBsb2dIaXN0b3J5LFxuICBdKTtcbn07XG4iLCAiaW1wb3J0IHsgdXNlTWVtbyB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5cbmNvbnN0IHRvU2VudGVuY2VDYXNlID0gKHZhbHVlOiBzdHJpbmcsIGxvY2FsZTogc3RyaW5nKSA9PiB7XG4gIGlmICghdmFsdWUpIHJldHVybiBcIlwiO1xuICBjb25zdCB0cmltbWVkID0gdmFsdWUudHJpbSgpO1xuICBpZiAoIXRyaW1tZWQpIHJldHVybiB0cmltbWVkO1xuICBjb25zdCBsb3dlciA9IHRyaW1tZWQudG9Mb2NhbGVMb3dlckNhc2UobG9jYWxlKTtcbiAgcmV0dXJuIGxvd2VyWzBdLnRvTG9jYWxlVXBwZXJDYXNlKGxvY2FsZSkgKyBsb3dlci5zbGljZSgxKTtcbn07XG5cbi8vIEdyb3VwcyBsb2NhbGl6ZWQgaGlzdG9yeSBsYWJlbHMgYW5kIGZpeGVkIG9wdGlvbiBsaXN0cyBmb3IgdGhlIHBhZ2UuXG5leHBvcnQgY29uc3QgdXNlSGlzdG9yeUxhYmVscyA9IChsb2NhbGU6IHN0cmluZykgPT4ge1xuICBjb25zdCBsYWJlbEZyb20gPSB0b1NlbnRlbmNlQ2FzZShpbmRUKFwiSGlzdG9yeV9Gcm9tXCIsIFwiRnJvbVwiKSwgbG9jYWxlKTtcbiAgY29uc3QgbGFiZWxUbyA9IHRvU2VudGVuY2VDYXNlKGluZFQoXCJIaXN0b3J5X1RvXCIsIFwiVG9cIiksIGxvY2FsZSk7XG4gIGNvbnN0IHF1aWNrQ3VzdG9tTGFiZWwgPSBpbmRUKFwiSGlzdG9yeV9RdWlja19DdXN0b21cIiwgXCJEYXRlXCIpO1xuICBjb25zdCBxdWljazdEYXlzTGFiZWwgPSBpbmRUKFwiSGlzdG9yeV9RdWlja183RGF5c1wiLCBcIjcgZGF5c1wiKTtcbiAgY29uc3QgcXVpY2szMERheXNMYWJlbCA9IGluZFQoXCJIaXN0b3J5X1F1aWNrXzMwRGF5c1wiLCBcIjMwIGRheXNcIik7XG4gIGNvbnN0IHF1aWNrOTBEYXlzTGFiZWwgPSBpbmRUKFwiSGlzdG9yeV9RdWlja185MERheXNcIiwgXCI5MCBkYXlzXCIpO1xuICBjb25zdCBwYWdlRmlyc3RMYWJlbCA9IGluZFQoXCJIaXN0b3J5X1BhZ2VfRmlyc3RcIiwgXCJGaXJzdFwiKTtcbiAgY29uc3QgcGFnZVByZXZMYWJlbCA9IGluZFQoXCJIaXN0b3J5X1BhZ2VfUHJldlwiLCBcIlByZXZpb3VzXCIpO1xuICBjb25zdCBwYWdlTmV4dExhYmVsID0gaW5kVChcIkhpc3RvcnlfUGFnZV9OZXh0XCIsIFwiTmV4dFwiKTtcbiAgY29uc3QgcGFnZUxhc3RMYWJlbCA9IGluZFQoXCJIaXN0b3J5X1BhZ2VfTGFzdFwiLCBcIkxhc3RcIik7XG5cbiAgY29uc3Qgd2Vla0RheUxhYmVscyA9IHVzZU1lbW8oXG4gICAgKCkgPT4gW1xuICAgICAgaW5kVChcIkhpc3RvcnlfRGF5X01vblwiLCBcIk1vblwiKSxcbiAgICAgIGluZFQoXCJIaXN0b3J5X0RheV9UdWVcIiwgXCJUdWVcIiksXG4gICAgICBpbmRUKFwiSGlzdG9yeV9EYXlfV2VkXCIsIFwiV2VkXCIpLFxuICAgICAgaW5kVChcIkhpc3RvcnlfRGF5X1RodVwiLCBcIlRodVwiKSxcbiAgICAgIGluZFQoXCJIaXN0b3J5X0RheV9GcmlcIiwgXCJGcmlcIiksXG4gICAgICBpbmRUKFwiSGlzdG9yeV9EYXlfU2F0XCIsIFwiU2F0XCIpLFxuICAgICAgaW5kVChcIkhpc3RvcnlfRGF5X1N1blwiLCBcIlN1blwiKSxcbiAgICBdLFxuICAgIFtdXG4gICk7XG5cbiAgY29uc3QgcXVpY2tGaWx0ZXJzID0gdXNlTWVtbyhcbiAgICAoKSA9PiBbXG4gICAgICB7IGlkOiBcImN1c3RvbVwiIGFzIGNvbnN0LCBsYWJlbDogcXVpY2tDdXN0b21MYWJlbCB9LFxuICAgICAgeyBpZDogXCJkYXlzLTdcIiBhcyBjb25zdCwgbGFiZWw6IHF1aWNrN0RheXNMYWJlbCB9LFxuICAgICAgeyBpZDogXCJkYXlzLTMwXCIgYXMgY29uc3QsIGxhYmVsOiBxdWljazMwRGF5c0xhYmVsIH0sXG4gICAgICB7IGlkOiBcImRheXMtOTBcIiBhcyBjb25zdCwgbGFiZWw6IHF1aWNrOTBEYXlzTGFiZWwgfSxcbiAgICBdLFxuICAgIFtxdWljazMwRGF5c0xhYmVsLCBxdWljazdEYXlzTGFiZWwsIHF1aWNrOTBEYXlzTGFiZWwsIHF1aWNrQ3VzdG9tTGFiZWxdXG4gICk7XG5cbiAgY29uc3QgcGFnaW5hdGlvbkxhYmVscyA9IHVzZU1lbW8oXG4gICAgKCkgPT4gKHtcbiAgICAgIGZpcnN0OiBwYWdlRmlyc3RMYWJlbCxcbiAgICAgIHByZXY6IHBhZ2VQcmV2TGFiZWwsXG4gICAgICBuZXh0OiBwYWdlTmV4dExhYmVsLFxuICAgICAgbGFzdDogcGFnZUxhc3RMYWJlbCxcbiAgICB9KSxcbiAgICBbcGFnZUZpcnN0TGFiZWwsIHBhZ2VMYXN0TGFiZWwsIHBhZ2VOZXh0TGFiZWwsIHBhZ2VQcmV2TGFiZWxdXG4gICk7XG5cbiAgcmV0dXJuIHtcbiAgICBsYWJlbEZyb20sXG4gICAgbGFiZWxUbyxcbiAgICBzdW1tYXJ5RnJvbTogbGFiZWxGcm9tLFxuICAgIHN1bW1hcnlUbzogbGFiZWxUbyxcbiAgICBmaWx0ZXJUaXRsZTogaW5kVChcIkhpc3RvcnlfRmlsdGVyX0RhdGVcIiwgXCJEYXRlXCIpLFxuICAgIGFkZERhdGVMYWJlbDogaW5kVChcIkhpc3RvcnlfQWRkRGF0ZVwiLCBcIkFkZCBkYXRlXCIpLFxuICAgIGNsZWFyUmFuZ2VMYWJlbDogaW5kVChcIkhpc3RvcnlfQ2xlYXJSYW5nZVwiLCBcIkNsZWFyIHJhbmdlXCIpLFxuICAgIHByZXZNb250aExhYmVsOiBpbmRUKFwiSGlzdG9yeV9QcmV2TW9udGhcIiwgXCJQcmV2aW91cyBtb250aFwiKSxcbiAgICBuZXh0TW9udGhMYWJlbDogaW5kVChcIkhpc3RvcnlfTmV4dE1vbnRoXCIsIFwiTmV4dCBtb250aFwiKSxcbiAgICBzdGF0dXNTZWxlY3RTdGFydExhYmVsOiBpbmRUKFwiSGlzdG9yeV9TdGF0dXNfU2VsZWN0U3RhcnRcIiwgXCJTZWxlY3Qgc3RhcnQgZGF0ZVwiKSxcbiAgICBzdGF0dXNTZWxlY3RFbmRMYWJlbDogaW5kVChcIkhpc3RvcnlfU3RhdHVzX1NlbGVjdEVuZFwiLCBcIlNlbGVjdCBlbmQgZGF0ZVwiKSxcbiAgICBjbGVhckxhYmVsOiBpbmRUKFwiSGlzdG9yeV9GaWx0ZXJfQ2xlYXJcIiwgXCJDbGVhclwiKSxcbiAgICBhcHBseUxhYmVsOiBpbmRUKFwiSGlzdG9yeV9GaWx0ZXJfQXBwbHlcIiwgXCJBcHBseVwiKSxcbiAgICBjbGllbnRMYWJlbDogaW5kVChcIkhpc3RvcnlfRmlsdGVyX0NsaWVudFwiLCBcIkFjY291bnRcIiksXG4gICAgb3duZXJMYWJlbDogaW5kVChcIkhpc3RvcnlfRmlsdGVyX093bmVyXCIsIFwiT3duZXJcIiksXG4gICAgb3duZXJBbGxMYWJlbDogaW5kVChcIkhpc3RvcnlfRmlsdGVyX093bmVyX0FsbFwiLCBcIkFsbCBteSBzdWJvcmRpbmF0ZXNcIiksXG4gICAgb3duZXJOb1VzZXJzTGFiZWw6IGluZFQoXCJIaXN0b3J5X0ZpbHRlcl9Pd25lcl9Ob25lXCIsIFwiTm8gdmlzaWJsZSB1c2Vyc1wiKSxcbiAgICBvd25lckxvYWRpbmdMYWJlbDogaW5kVChcIkhpc3RvcnlfRmlsdGVyX093bmVyX0xvYWRpbmdcIiwgXCJMb2FkaW5nIHZpc2libGUgdXNlcnNcIiksXG4gICAgbG9hZGluZ0xhYmVsOiBpbmRUKFwiSGlzdG9yeV9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKSxcbiAgICBub1Zpc2l0c0luUmFuZ2VMYWJlbDogaW5kVChcIkhpc3RvcnlfTm9EYXRhSW5SYW5nZVwiLCBcIk5vIHZpc2l0cyBpbiB0aGlzIHJhbmdlXCIpLFxuICAgIGNyZWF0ZUxhYmVsOiBpbmRUKFwiQ29tbW9uX0NyZWF0ZVwiLCBcIkNyZWF0ZVwiKSxcbiAgICB3ZWVrRGF5TGFiZWxzLFxuICAgIHF1aWNrRmlsdGVycyxcbiAgICBwYWdpbmF0aW9uTGFiZWxzLFxuICB9O1xufTtcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjayB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHR5cGUgeyBDbGllbnRPcHRpb24gfSBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy92aXNpdGFzL0NsaWVudFNlYXJjaENvbWJvYm94LnRzeFwiO1xuaW1wb3J0IHR5cGUgeyBIaXN0b3J5Q2FjaGVkRmlsdGVyIH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZUhpc3RvcnlGaWx0ZXJDYWNoZS50c1wiO1xuXG50eXBlIEFyZ3MgPSB7XG4gIGNhblZpZXdIaXN0b3J5OiBib29sZWFuO1xuICBjdXJyZW50UGFnZTogbnVtYmVyO1xuICBmcm9tRGF0ZVZhbHVlOiBzdHJpbmc7XG4gIHRvRGF0ZVZhbHVlOiBzdHJpbmc7XG4gIHNlbGVjdGVkQ2xpZW50OiBDbGllbnRPcHRpb24gfCBudWxsO1xuICBvd25lckF4VXNlcklkOiBzdHJpbmc7XG4gIG93bmVyVGV4dDogc3RyaW5nO1xuICBuYXZEZWxheU1zOiBudW1iZXI7XG4gIHNhdmVDYWNoZWRGaWx0ZXI6IChmaWx0ZXI6IEhpc3RvcnlDYWNoZWRGaWx0ZXIpID0+IHZvaWQ7XG4gIG9uRm9yYmlkZGVuOiAoKSA9PiB2b2lkO1xufTtcblxuLy8gQ3JlYXRlcyB0aGUgZGV0YWlsIG5hdmlnYXRpb24gaGFuZGxlciBhbmQgcGVyc2lzdHMgdGhlIGN1cnJlbnQgaGlzdG9yeSBmaWx0ZXIuXG5leHBvcnQgY29uc3QgdXNlSGlzdG9yeU5hdmlnYXRpb24gPSAoe1xuICBjYW5WaWV3SGlzdG9yeSxcbiAgY3VycmVudFBhZ2UsXG4gIGZyb21EYXRlVmFsdWUsXG4gIHRvRGF0ZVZhbHVlLFxuICBzZWxlY3RlZENsaWVudCxcbiAgb3duZXJBeFVzZXJJZCxcbiAgb3duZXJUZXh0LFxuICBuYXZEZWxheU1zLFxuICBzYXZlQ2FjaGVkRmlsdGVyLFxuICBvbkZvcmJpZGRlbixcbn06IEFyZ3MpID0+IHtcbiAgcmV0dXJuIHVzZUNhbGxiYWNrKFxuICAgIChsaW5rSWQ6IHN0cmluZykgPT4ge1xuICAgICAgaWYgKCFjYW5WaWV3SGlzdG9yeSkge1xuICAgICAgICBvbkZvcmJpZGRlbigpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgc2F2ZUNhY2hlZEZpbHRlcih7XG4gICAgICAgICAgZnJvbURhdGU6IGZyb21EYXRlVmFsdWUgfHwgXCJcIixcbiAgICAgICAgICB0b0RhdGU6IHRvRGF0ZVZhbHVlIHx8IFwiXCIsXG4gICAgICAgICAgcGFnZTogY3VycmVudFBhZ2UsXG4gICAgICAgICAgY2xpZW50QWNjb3VudDogc2VsZWN0ZWRDbGllbnQ/LnZhbHVlIHx8IFwiXCIsXG4gICAgICAgICAgY2xpZW50VGV4dDogc2VsZWN0ZWRDbGllbnQ/LnRleHQgfHwgXCJcIixcbiAgICAgICAgICBvd25lckF4VXNlcklkLFxuICAgICAgICAgIG93bmVyVGV4dCxcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGVuY29kZVVSSUNvbXBvbmVudChsaW5rSWQpO1xuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGAvVmlzaXRhcy9EZXRhbGxlLyR7dGFyZ2V0fWA7XG4gICAgICB9LCBuYXZEZWxheU1zKTtcbiAgICB9LFxuICAgIFtcbiAgICAgIGNhblZpZXdIaXN0b3J5LFxuICAgICAgY3VycmVudFBhZ2UsXG4gICAgICBmcm9tRGF0ZVZhbHVlLFxuICAgICAgbmF2RGVsYXlNcyxcbiAgICAgIG9uRm9yYmlkZGVuLFxuICAgICAgb3duZXJBeFVzZXJJZCxcbiAgICAgIG93bmVyVGV4dCxcbiAgICAgIHNhdmVDYWNoZWRGaWx0ZXIsXG4gICAgICBzZWxlY3RlZENsaWVudCxcbiAgICAgIHRvRGF0ZVZhbHVlLFxuICAgIF1cbiAgKTtcbn07XG4iLCAiXHVGRUZGaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgdHlwZSB7IEhpc3RvcnlDYWNoZWRGaWx0ZXIgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlSGlzdG9yeUZpbHRlckNhY2hlLnRzXCI7XHJcbmltcG9ydCB7IHNldFRvcGJhckFjdGlvbkdyb3VwUmVhZHkgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvdG9wYmFyQWN0aW9uVmlzaWJpbGl0eS50c1wiO1xyXG5pbXBvcnQgdHlwZSB7IEZpbHRlckxvYWRSZXF1ZXN0LCBMb2FkT3ZlcnJpZGUgfSBmcm9tIFwiLi91c2VIaXN0b3J5RmlsdGVyc1N0YXRlLnRzXCI7XHJcblxyXG50eXBlIFVzZUhpc3RvcnlQYWdlTGlzdGVuZXJzQXJncyA9IHtcbiAgcmVhZHlUb0xvYWQ6IGJvb2xlYW47XG4gIGlzT3BlbjogYm9vbGVhbjtcbiAgYWN0aXZhdG9yUmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTERpdkVsZW1lbnQgfCBudWxsPjtcclxuICBwb3BvdmVyUmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTERpdkVsZW1lbnQgfCBudWxsPjtcclxuICBoYXNSZXN0b3JlZEZpbHRlclJlZjogUmVhY3QuTXV0YWJsZVJlZk9iamVjdDxib29sZWFuPjtcclxuICByZXRyeU9uTmV0d29ya0Vycm9yUmVmOiBSZWFjdC5NdXRhYmxlUmVmT2JqZWN0PGJvb2xlYW4+O1xyXG4gIGN1cnJlbnRQYWdlOiBudW1iZXI7XHJcbiAgbG9nSGlzdG9yeTogKG1lc3NhZ2U6IHN0cmluZywgZGF0YT86IFJlY29yZDxzdHJpbmcsIHVua25vd24+KSA9PiB2b2lkO1xyXG4gIGNvbnN1bWVSZXR1cm5GbGFnOiAoKSA9PiBib29sZWFuO1xyXG4gIHJlYWRDYWNoZWRGaWx0ZXI6ICgpID0+IEhpc3RvcnlDYWNoZWRGaWx0ZXIgfCBudWxsO1xuICBhcHBseUNhY2hlZEZpbHRlcjogKGZpbHRlcjogSGlzdG9yeUNhY2hlZEZpbHRlciB8IG51bGwpID0+IEZpbHRlckxvYWRSZXF1ZXN0IHwgbnVsbDtcbiAgcmVzb2x2ZU93bmVyQXhVc2VySWRGb3JMb2FkOiAob3duZXJBeFVzZXJJZD86IHN0cmluZykgPT4gc3RyaW5nO1xuICBsb2FkQWN0aXZpdGllczogKHBhZ2U6IG51bWJlciwgb3ZlcnJpZGU/OiBMb2FkT3ZlcnJpZGUpID0+IHZvaWQ7XG4gIHNldElzT3BlbjogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248Ym9vbGVhbj4+O1xyXG4gIHNldEhvdmVyRGF0ZTogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248RGF0ZSB8IG51bGw+PjtcclxuICBzZXRTaG93RmlsdGVyczogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248Ym9vbGVhbj4+O1xyXG4gIGFwcGx5RmlsdGVyczogKG9wdGlvbnM/OiB7IGNsb3NlUGFuZWw/OiBib29sZWFuOyBmb3JjZT86IGJvb2xlYW47IHBhZ2U/OiBudW1iZXIgfSkgPT4gdm9pZDtcclxufTtcclxuXHJcbi8vIEhhbmRsZXMgZ2xvYmFsIGxpc3RlbmVycyB1c2VkIGJ5IHRoZSBoaXN0b3J5IHBhZ2UgZmlsdGVycyBhbmQgY2FsZW5kYXIgVUkuXHJcbmV4cG9ydCBjb25zdCB1c2VIaXN0b3J5UGFnZUxpc3RlbmVycyA9ICh7XG4gIHJlYWR5VG9Mb2FkLFxuICBpc09wZW4sXG4gIGFjdGl2YXRvclJlZixcclxuICBwb3BvdmVyUmVmLFxyXG4gIGhhc1Jlc3RvcmVkRmlsdGVyUmVmLFxyXG4gIHJldHJ5T25OZXR3b3JrRXJyb3JSZWYsXHJcbiAgY3VycmVudFBhZ2UsXHJcbiAgbG9nSGlzdG9yeSxcclxuICBjb25zdW1lUmV0dXJuRmxhZyxcclxuICByZWFkQ2FjaGVkRmlsdGVyLFxuICBhcHBseUNhY2hlZEZpbHRlcixcbiAgcmVzb2x2ZU93bmVyQXhVc2VySWRGb3JMb2FkLFxuICBsb2FkQWN0aXZpdGllcyxcbiAgc2V0SXNPcGVuLFxyXG4gIHNldEhvdmVyRGF0ZSxcclxuICBzZXRTaG93RmlsdGVycyxcclxuICBhcHBseUZpbHRlcnMsXHJcbn06IFVzZUhpc3RvcnlQYWdlTGlzdGVuZXJzQXJncykgPT4ge1xyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBzZXRUb3BiYXJBY3Rpb25Hcm91cFJlYWR5KFwiaGlzdG9yeS1saXN0LWFjdGlvbnNcIik7XHJcbiAgfSwgW10pO1xyXG5cclxuICAvLyBDbG9zZSB0aGUgbWFudWFsIHBpY2tlciB3aGVuIGNsaWNraW5nIG91dHNpZGUgb2YgdGhlIHJhbmdlIHBpY2tlciBVSS5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFpc09wZW4pIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBoYW5kbGVPdXRzaWRlID0gKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XHJcbiAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldCBhcyBOb2RlIHwgbnVsbDtcclxuICAgICAgaWYgKCF0YXJnZXQpIHJldHVybjtcclxuICAgICAgaWYgKHBvcG92ZXJSZWYuY3VycmVudD8uY29udGFpbnModGFyZ2V0KSkgcmV0dXJuO1xyXG4gICAgICBpZiAoYWN0aXZhdG9yUmVmLmN1cnJlbnQ/LmNvbnRhaW5zKHRhcmdldCkpIHJldHVybjtcclxuICAgICAgbG9nSGlzdG9yeShcImNsb3NlUG9wb3ZlcjpvdXRzaWRlXCIpO1xyXG4gICAgICBzZXRJc09wZW4oZmFsc2UpO1xyXG4gICAgICBzZXRIb3ZlckRhdGUobnVsbCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgaGFuZGxlT3V0c2lkZSk7XHJcbiAgICByZXR1cm4gKCkgPT4gZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBoYW5kbGVPdXRzaWRlKTtcclxuICB9LCBbYWN0aXZhdG9yUmVmLCBpc09wZW4sIGxvZ0hpc3RvcnksIHBvcG92ZXJSZWYsIHNldEhvdmVyRGF0ZSwgc2V0SXNPcGVuXSk7XHJcblxyXG4gIC8vIFJlLWFwcGx5IGZpbHRlcnMgYWZ0ZXIgYnJvd3NlciBiYWNrL2ZvcndhcmQgbmF2aWdhdGlvbiByZXR1cm5zIHRvIHRoZSBwYWdlLlxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBvblBhZ2VTaG93ID0gKCkgPT4ge1xuICAgICAgaWYgKCFyZWFkeVRvTG9hZCkgcmV0dXJuO1xuICAgICAgaWYgKGhhc1Jlc3RvcmVkRmlsdGVyUmVmLmN1cnJlbnQpIHJldHVybjtcbiAgICAgIGlmIChjb25zdW1lUmV0dXJuRmxhZygpKSB7XG4gICAgICAgIGNvbnN0IGNhY2hlZCA9IHJlYWRDYWNoZWRGaWx0ZXIoKTtcbiAgICAgICAgY29uc3QgY2FjaGVkUmVxdWVzdCA9IGFwcGx5Q2FjaGVkRmlsdGVyKGNhY2hlZCk7XG4gICAgICAgIGlmIChjYWNoZWRSZXF1ZXN0KSB7XG4gICAgICAgICAgY29uc3QgcmVzb2x2ZWRSZXF1ZXN0ID0ge1xuICAgICAgICAgICAgLi4uY2FjaGVkUmVxdWVzdCxcbiAgICAgICAgICAgIG92ZXJyaWRlOiB7XG4gICAgICAgICAgICAgIC4uLmNhY2hlZFJlcXVlc3Qub3ZlcnJpZGUsXG4gICAgICAgICAgICAgIG93bmVyQXhVc2VySWQ6IHJlc29sdmVPd25lckF4VXNlcklkRm9yTG9hZChjYWNoZWRSZXF1ZXN0Lm92ZXJyaWRlLm93bmVyQXhVc2VySWQpLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9O1xuICAgICAgICAgIHJldHJ5T25OZXR3b3JrRXJyb3JSZWYuY3VycmVudCA9IHRydWU7XG4gICAgICAgICAgbG9hZEFjdGl2aXRpZXMocmVzb2x2ZWRSZXF1ZXN0LnBhZ2UsIHJlc29sdmVkUmVxdWVzdC5vdmVycmlkZSk7XG4gICAgICAgICAgc2V0U2hvd0ZpbHRlcnMoZmFsc2UpO1xuICAgICAgICAgIHNldElzT3BlbihmYWxzZSk7XG4gICAgICAgICAgaGFzUmVzdG9yZWRGaWx0ZXJSZWYuY3VycmVudCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicGFnZXNob3dcIiwgb25QYWdlU2hvdyk7XHJcbiAgICByZXR1cm4gKCkgPT4gd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwYWdlc2hvd1wiLCBvblBhZ2VTaG93KTtcclxuICB9LCBbXHJcbiAgICBhcHBseUNhY2hlZEZpbHRlcixcbiAgICBjb25zdW1lUmV0dXJuRmxhZyxcbiAgICBoYXNSZXN0b3JlZEZpbHRlclJlZixcbiAgICBsb2FkQWN0aXZpdGllcyxcbiAgICByZWFkQ2FjaGVkRmlsdGVyLFxuICAgIHJlYWR5VG9Mb2FkLFxuICAgIHJldHJ5T25OZXR3b3JrRXJyb3JSZWYsXG4gICAgcmVzb2x2ZU93bmVyQXhVc2VySWRGb3JMb2FkLFxuICAgIHNldElzT3BlbixcbiAgICBzZXRTaG93RmlsdGVycyxcbiAgXSk7XG5cclxuICAvLyBXaXJlIHRvcGJhciBhY3Rpb25zIHRoYXQgdG9nZ2xlIGZpbHRlcnMgb3IgZm9yY2UgcmVmcmVzaCBvZiBjdXJyZW50IHBhZ2UuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IG9uVG9nZ2xlRmlsdGVycyA9ICgpID0+IHtcclxuICAgICAgc2V0U2hvd0ZpbHRlcnMoKHByZXYpID0+IHtcclxuICAgICAgICBjb25zdCBuZXh0ID0gIXByZXY7XHJcbiAgICAgICAgaWYgKCFuZXh0KSB7XHJcbiAgICAgICAgICBzZXRJc09wZW4oZmFsc2UpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oeyB0b3A6IDAsIGJlaGF2aW9yOiBcInNtb290aFwiIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV4dDtcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IG9uUmVmcmVzaCA9ICgpID0+IHtcbiAgICAgIGlmICghcmVhZHlUb0xvYWQpIHJldHVybjtcbiAgICAgIGFwcGx5RmlsdGVycyh7IHBhZ2U6IGN1cnJlbnRQYWdlLCBmb3JjZTogdHJ1ZSwgY2xvc2VQYW5lbDogdHJ1ZSB9KTtcbiAgICB9O1xuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImhpc3RvcnktdG9nZ2xlLWZpbHRlclwiLCBvblRvZ2dsZUZpbHRlcnMpO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJoaXN0b3J5LXJlZnJlc2hcIiwgb25SZWZyZXNoKTtcclxuXHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImhpc3RvcnktdG9nZ2xlLWZpbHRlclwiLCBvblRvZ2dsZUZpbHRlcnMpO1xyXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImhpc3RvcnktcmVmcmVzaFwiLCBvblJlZnJlc2gpO1xyXG4gICAgfTtcclxuICB9LCBbYXBwbHlGaWx0ZXJzLCBjdXJyZW50UGFnZSwgcmVhZHlUb0xvYWQsIHNldElzT3Blbiwgc2V0U2hvd0ZpbHRlcnNdKTtcbn07XG4iLCAiaW1wb3J0IHsgdXNlRWZmZWN0LCB0eXBlIERpc3BhdGNoLCB0eXBlIFNldFN0YXRlQWN0aW9uIH0gZnJvbSBcInJlYWN0XCI7XG5cbnR5cGUgQXJncyA9IHtcbiAgc3RhcnREYXRlOiBEYXRlIHwgbnVsbDtcbiAgZW5kRGF0ZTogRGF0ZSB8IG51bGw7XG4gIHNlbGVjdGluZ1N0ZXA6IFwic3RhcnRcIiB8IFwiZW5kXCIgfCBcImRvbmVcIjtcbiAgc2V0U2VsZWN0aW5nU3RlcDogRGlzcGF0Y2g8U2V0U3RhdGVBY3Rpb248XCJzdGFydFwiIHwgXCJlbmRcIiB8IFwiZG9uZVwiPj47XG59O1xuXG4vLyBLZWVwcyB0aGUgbWFudWFsIGRhdGUgcGlja2VyIHN0ZXAgYWxpZ25lZCB3aXRoIHRoZSBzZWxlY3RlZCByYW5nZS5cbmV4cG9ydCBjb25zdCB1c2VIaXN0b3J5UGlja2VyU3RlcFN5bmMgPSAoeyBzdGFydERhdGUsIGVuZERhdGUsIHNlbGVjdGluZ1N0ZXAsIHNldFNlbGVjdGluZ1N0ZXAgfTogQXJncykgPT4ge1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChzdGFydERhdGUgJiYgIWVuZERhdGUgJiYgc2VsZWN0aW5nU3RlcCA9PT0gXCJzdGFydFwiKSB7XG4gICAgICBzZXRTZWxlY3RpbmdTdGVwKFwiZW5kXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIXN0YXJ0RGF0ZSAmJiBzZWxlY3RpbmdTdGVwICE9PSBcInN0YXJ0XCIpIHtcbiAgICAgIHNldFNlbGVjdGluZ1N0ZXAoXCJzdGFydFwiKTtcbiAgICB9XG4gIH0sIFtzdGFydERhdGUsIGVuZERhdGUsIHNlbGVjdGluZ1N0ZXAsIHNldFNlbGVjdGluZ1N0ZXBdKTtcbn07XG4iLCAiXHVGRUZGaW1wb3J0IFJlYWN0LCB7IHVzZU1lbW8sIHVzZVJlZiB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgdHlwZSB7IFRpbWVsaW5lSXRlbSB9IGZyb20gXCIuL0hpc3RvcnlUYWJsZS50c3hcIjtcclxuXHJcbnR5cGUgQWN0aXZpdHlSZWNvcmQgPSBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPjtcclxuXHJcbnR5cGUgVXNlSGlzdG9yeVRpbWVsaW5lSXRlbXNBcmdzID0ge1xyXG4gIGl0ZW1zOiBBY3Rpdml0eVJlY29yZFtdO1xyXG4gIGxvY2FsZTogc3RyaW5nO1xyXG4gIG5vRGF0YVRleHQ6IHN0cmluZztcclxuICBsb2dIaXN0b3J5OiAobWVzc2FnZTogc3RyaW5nLCBkYXRhPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pID0+IHZvaWQ7XHJcbiAgdG9UaXRsZUNhc2U6ICh2YWx1ZTogc3RyaW5nLCBsb2NhbGU6IHN0cmluZykgPT4gc3RyaW5nO1xyXG4gIGZvcm1hdERhdGVQYXJ0czogKHZhbHVlOiBzdHJpbmcsIGxvY2FsZTogc3RyaW5nKSA9PiB7IHllYXI6IHN0cmluZzsgbW9udGg6IHN0cmluZzsgZGF5OiBzdHJpbmcgfTtcclxufTtcclxuXHJcbi8vIE1hcHMgcmF3IGhpc3RvcnkgcGF5bG9hZCBpdGVtcyBpbnRvIHRpbWVsaW5lIGNhcmRzIHVzZWQgYnkgSGlzdG9yeVRhYmxlLlxyXG5leHBvcnQgY29uc3QgdXNlSGlzdG9yeVRpbWVsaW5lSXRlbXMgPSAoe1xyXG4gIGl0ZW1zLFxyXG4gIGxvY2FsZSxcclxuICBub0RhdGFUZXh0LFxyXG4gIGxvZ0hpc3RvcnksXHJcbiAgdG9UaXRsZUNhc2UsXHJcbiAgZm9ybWF0RGF0ZVBhcnRzLFxyXG59OiBVc2VIaXN0b3J5VGltZWxpbmVJdGVtc0FyZ3MpID0+IHtcclxuICBjb25zdCBkZWJ1Z0xvZ2dlZFJlZiA9IHVzZVJlZigwKTtcclxuXHJcbiAgY29uc3QgdGltZWxpbmVJdGVtczogVGltZWxpbmVJdGVtW10gPSB1c2VNZW1vKCgpID0+IHtcclxuICAgIHJldHVybiBpdGVtcy5tYXAoKGVudHJ5KSA9PiB7XHJcbiAgICAgIGNvbnN0IGFjdGl2aWRhZElkUmF3ID0gKGVudHJ5LmFjdGl2aWRhZElkID8/IGVudHJ5LkFjdGl2aWRhZElkID8/IFwiXCIpLnRvU3RyaW5nKCkudHJpbSgpO1xyXG4gICAgICBjb25zdCBhY3RpdmlkYWRJZCA9IGFjdGl2aWRhZElkUmF3IHx8IFwiXCI7XHJcbiAgICAgIGNvbnN0IHJlY0lkUmF3ID0gZW50cnkucmVjSWQgPz8gZW50cnkuUmVjSWQgPz8gXCJcIjtcclxuICAgICAgY29uc3QgcmVjSWQgPSByZWNJZFJhdyAmJiAhTnVtYmVyLmlzTmFOKE51bWJlcihyZWNJZFJhdykpID8gTnVtYmVyKHJlY0lkUmF3KSA6IG51bGw7XHJcbiAgICAgIGxldCBsaW5rSWQgPSBhY3RpdmlkYWRJZCB8fCAocmVjSWQgPyByZWNJZC50b1N0cmluZygpIDogXCJcIik7XHJcblxyXG4gICAgICBpZiAoZGVidWdMb2dnZWRSZWYuY3VycmVudCA8IDUpIHtcclxuICAgICAgICBsb2dIaXN0b3J5KFwiYWN0aXZpdHkgaXRlbVwiLCB7IGFjdGl2aWRhZElkLCByZWNJZFJhdywgcmVjSWQgfSk7XHJcbiAgICAgICAgZGVidWdMb2dnZWRSZWYuY3VycmVudCArPSAxO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCByYXdOYW1lID0gKGVudHJ5Lm5hbWUgPz8gZW50cnkuTmFtZSA/PyBcIlwiKS50b1N0cmluZygpLnRyaW0oKTtcclxuICAgICAgY29uc3QgZnVsbE5hbWUgPSB0b1RpdGxlQ2FzZShyYXdOYW1lLCBsb2NhbGUpO1xyXG4gICAgICBjb25zdCBmZWNoYSA9IChlbnRyeS50cmFuc0RhdGUgPz8gZW50cnkuVHJhbnNEYXRlID8/IFwiXCIpLnRvU3RyaW5nKCk7XHJcbiAgICAgIGNvbnN0IHJhd0Rlc2MgPSAoZW50cnkuZGVzY3JpcHRpb24gPz8gZW50cnkuRGVzY3JpcHRpb24gPz8gXCJcIikudG9TdHJpbmcoKS50cmltKCk7XHJcbiAgICAgIGNvbnN0IGZ1bGxEZXNjID0gcmF3RGVzYztcclxuXHJcbiAgICAgIGNvbnN0IGlzTm9EYXRhQ2FyZCA9ICFyYXdOYW1lICYmICFyYXdEZXNjO1xyXG4gICAgICBpZiAoaXNOb0RhdGFDYXJkKSB7XHJcbiAgICAgICAgbGlua0lkID0gXCJcIjtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBpZDogbGlua0lkLFxyXG4gICAgICAgIGFjdGl2aWRhZElkLFxyXG4gICAgICAgIHJlY0lkLFxyXG4gICAgICAgIG5hbWU6IGZ1bGxOYW1lLFxyXG4gICAgICAgIGRlc2NyaXB0aW9uOiBmdWxsRGVzYyB8fCBub0RhdGFUZXh0LFxyXG4gICAgICAgIGZ1bGxOYW1lLFxyXG4gICAgICAgIGZ1bGxEZXNjLFxyXG4gICAgICAgIGRhdGVQYXJ0czogZm9ybWF0RGF0ZVBhcnRzKGZlY2hhLCBsb2NhbGUpLFxyXG4gICAgICAgIGlzTm9EYXRhOiBpc05vRGF0YUNhcmQsXHJcbiAgICAgIH07XHJcbiAgICB9KTtcclxuICB9LCBbZm9ybWF0RGF0ZVBhcnRzLCBpdGVtcywgbG9jYWxlLCBsb2dIaXN0b3J5LCBub0RhdGFUZXh0LCB0b1RpdGxlQ2FzZV0pO1xyXG5cclxuICByZXR1cm4geyB0aW1lbGluZUl0ZW1zIH07XHJcbn07XHJcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlTWVtbyB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgc2hvd1Blcm1pc3Npb25Nb2RhbCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9wZXJtaXNzaW9ucy50c1wiO1xuaW1wb3J0IHsgdXNlTW9kdWxlRGF0YVZpc2liaWxpdHkgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlTW9kdWxlRGF0YVZpc2liaWxpdHkudHNcIjtcbmltcG9ydCB7IGJ1aWxkVmlzaWJsZVVzZXJCeU93bmVyTWFwLCBmb3JtYXRNb2R1bGVWaXNpYmxlVXNlckxhYmVsLCBnZXRWaXNpYmxlVXNlckZvck93bmVyIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL21vZHVsZURhdGFWaXNpYmlsaXR5LnRzXCI7XG5pbXBvcnQge1xuICBlbnN1cmVDdXJyZW50SGlzdG9yeVZpc2libGVPd25lckluTGlzdCxcbiAgaGFzSGlzdG9yeVZpc2libGVTdWJvcmRpbmF0ZXMsXG4gIHJlc29sdmVIaXN0b3J5RWZmZWN0aXZlT3duZXJBeFVzZXJJZCxcbiAgcmVzb2x2ZUhpc3RvcnlWaXNpYmxlT3duZXJTZWxlY3RWYWx1ZSxcbn0gZnJvbSBcIi4vaGlzdG9yeVZpc2libGVPd25lclNlbGVjdGlvbi50c1wiO1xuXG50eXBlIEFyZ3MgPSB7XG4gIGVuYWJsZWQ6IGJvb2xlYW47XG4gIGNvbXBhbnlJZDogc3RyaW5nO1xuICBheFVzZXJJZDogc3RyaW5nO1xuICBwZXJtaXNzaW9uc1JldmlzaW9uOiBzdHJpbmc7XG4gIHNlbGVjdGVkT3duZXJBeFVzZXJJZDogc3RyaW5nO1xuICBvbkRlYnVnOiAobWVzc2FnZTogc3RyaW5nLCBkYXRhPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pID0+IHZvaWQ7XG59O1xuXG5jb25zdCBBUFBfQ09ERSA9IFwiQ1JNXCI7XG5jb25zdCBNT0RVTEVfQ09ERSA9IFwiVklTSVRBU19HRVNUSU9OXCI7XG5cbi8vIExvYWRzIHZpc2libGUgdmlzaXQgb3duZXJzIGFuZCByZXNvbHZlcyB0aGUgY3VycmVudGx5IHNlbGVjdGVkIG93bmVyIHNhZmVseS5cbmV4cG9ydCBjb25zdCB1c2VIaXN0b3J5VmlzaWJsZU93bmVyID0gKHtcbiAgZW5hYmxlZCxcbiAgY29tcGFueUlkLFxuICBheFVzZXJJZCxcbiAgcGVybWlzc2lvbnNSZXZpc2lvbixcbiAgc2VsZWN0ZWRPd25lckF4VXNlcklkLFxuICBvbkRlYnVnLFxufTogQXJncykgPT4ge1xuICBjb25zdCB7XG4gICAgdmlzaWJsZVVzZXJzLFxuICAgIHZpc2libGVVc2Vyc0xvYWRpbmcsXG4gICAgdmlzaWJsZVVzZXJzRXJyb3IsXG4gICAgdmlzaWJsZVVzZXJzUmVhZHksXG4gIH0gPSB1c2VNb2R1bGVEYXRhVmlzaWJpbGl0eSh7XG4gICAgZW5hYmxlZCxcbiAgICBjb21wYW55SWQsXG4gICAgYXhVc2VySWQsXG4gICAgcGVybWlzc2lvbnNSZXZpc2lvbixcbiAgICBhcHBDb2RlOiBBUFBfQ09ERSxcbiAgICBtb2R1bGVDb2RlOiBNT0RVTEVfQ09ERSxcbiAgICBwcmVsb2FkZWRVc2VyczogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdy5fX0lORF9WSVNJQkxFX1ZJU0lUX1VTRVJTX18gOiB1bmRlZmluZWQsXG4gICAgb25Gb3JiaWRkZW46IHNob3dQZXJtaXNzaW9uTW9kYWwsXG4gICAgb25EZWJ1ZyxcbiAgfSk7XG5cbiAgY29uc3QgdmlzaWJsZVZpc2l0VXNlcnMgPSB1c2VNZW1vKCgpID0+IHtcbiAgICByZXR1cm4gZW5zdXJlQ3VycmVudEhpc3RvcnlWaXNpYmxlT3duZXJJbkxpc3QodmlzaWJsZVVzZXJzLCBheFVzZXJJZCk7XG4gIH0sIFtheFVzZXJJZCwgdmlzaWJsZVVzZXJzXSk7XG5cbiAgY29uc3QgdmlzaWJsZVZpc2l0VXNlckJ5T3duZXJBeFVzZXJJZCA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIHJldHVybiBidWlsZFZpc2libGVVc2VyQnlPd25lck1hcCh2aXNpYmxlVmlzaXRVc2Vycyk7XG4gIH0sIFt2aXNpYmxlVmlzaXRVc2Vyc10pO1xuXG4gIGNvbnN0IGNhbk1hbmFnZVZpc2libGVPd25lcnMgPSB1c2VNZW1vKCgpID0+IHtcbiAgICByZXR1cm4gdmlzaWJsZVVzZXJzUmVhZHkgJiYgaGFzSGlzdG9yeVZpc2libGVTdWJvcmRpbmF0ZXModmlzaWJsZVZpc2l0VXNlcnMsIGF4VXNlcklkKTtcbiAgfSwgW2F4VXNlcklkLCB2aXNpYmxlVXNlcnNSZWFkeSwgdmlzaWJsZVZpc2l0VXNlcnNdKTtcblxuICBjb25zdCBvd25lclNlbGVjdFZhbHVlID0gdXNlTWVtbygoKSA9PiB7XG4gICAgcmV0dXJuIHJlc29sdmVIaXN0b3J5VmlzaWJsZU93bmVyU2VsZWN0VmFsdWUoe1xuICAgICAgc2VsZWN0ZWRPd25lckF4VXNlcklkLFxuICAgICAgY3VycmVudEF4VXNlcklkOiBheFVzZXJJZCxcbiAgICAgIHVzZXJzOiB2aXNpYmxlVmlzaXRVc2VycyxcbiAgICAgIGNhbk1hbmFnZVZpc2libGVPd25lcnMsXG4gICAgfSk7XG4gIH0sIFtheFVzZXJJZCwgY2FuTWFuYWdlVmlzaWJsZU93bmVycywgc2VsZWN0ZWRPd25lckF4VXNlcklkLCB2aXNpYmxlVmlzaXRVc2Vyc10pO1xuXG4gIGNvbnN0IHJlc29sdmVFZmZlY3RpdmVPd25lckF4VXNlcklkID0gdXNlQ2FsbGJhY2soXG4gICAgKHJlcXVlc3RlZE93bmVyQXhVc2VySWQ/OiBzdHJpbmcpID0+IHtcbiAgICAgIHJldHVybiByZXNvbHZlSGlzdG9yeUVmZmVjdGl2ZU93bmVyQXhVc2VySWQoe1xuICAgICAgICBzZWxlY3RlZE93bmVyQXhVc2VySWQ6IHJlcXVlc3RlZE93bmVyQXhVc2VySWQgPz8gc2VsZWN0ZWRPd25lckF4VXNlcklkLFxuICAgICAgICBjdXJyZW50QXhVc2VySWQ6IGF4VXNlcklkLFxuICAgICAgICB1c2VyczogdmlzaWJsZVZpc2l0VXNlcnMsXG4gICAgICAgIGNhbk1hbmFnZVZpc2libGVPd25lcnMsXG4gICAgICB9KTtcbiAgICB9LFxuICAgIFtheFVzZXJJZCwgY2FuTWFuYWdlVmlzaWJsZU93bmVycywgc2VsZWN0ZWRPd25lckF4VXNlcklkLCB2aXNpYmxlVmlzaXRVc2Vyc11cbiAgKTtcblxuICBjb25zdCBlZmZlY3RpdmVTZWxlY3RlZE93bmVyQXhVc2VySWQgPSB1c2VNZW1vKCgpID0+IHtcbiAgICByZXR1cm4gcmVzb2x2ZUVmZmVjdGl2ZU93bmVyQXhVc2VySWQoc2VsZWN0ZWRPd25lckF4VXNlcklkKTtcbiAgfSwgW3Jlc29sdmVFZmZlY3RpdmVPd25lckF4VXNlcklkLCBzZWxlY3RlZE93bmVyQXhVc2VySWRdKTtcblxuICBjb25zdCBzZWxlY3RlZE93bmVyID0gdXNlTWVtbygoKSA9PiB7XG4gICAgcmV0dXJuIGdldFZpc2libGVVc2VyRm9yT3duZXIodmlzaWJsZVZpc2l0VXNlckJ5T3duZXJBeFVzZXJJZCwgZWZmZWN0aXZlU2VsZWN0ZWRPd25lckF4VXNlcklkKTtcbiAgfSwgW2VmZmVjdGl2ZVNlbGVjdGVkT3duZXJBeFVzZXJJZCwgdmlzaWJsZVZpc2l0VXNlckJ5T3duZXJBeFVzZXJJZF0pO1xuXG4gIHJldHVybiB7XG4gICAgdmlzaWJsZVZpc2l0VXNlcnMsXG4gICAgdmlzaWJsZVVzZXJzTG9hZGluZyxcbiAgICB2aXNpYmxlVXNlcnNFcnJvcixcbiAgICB2aXNpYmxlVXNlcnNSZWFkeSxcbiAgICBvd25lclNlbGVjdFZhbHVlLFxuICAgIG93bmVyRmlsdGVyRGlzYWJsZWQ6ICF2aXNpYmxlVXNlcnNSZWFkeSB8fCB2aXNpYmxlVXNlcnNMb2FkaW5nIHx8ICFjYW5NYW5hZ2VWaXNpYmxlT3duZXJzLFxuICAgIGNhbk1hbmFnZVZpc2libGVPd25lcnMsXG4gICAgc2VsZWN0ZWRPd25lclRleHQ6IHNlbGVjdGVkT3duZXIgPyBmb3JtYXRNb2R1bGVWaXNpYmxlVXNlckxhYmVsKHNlbGVjdGVkT3duZXIpIDogXCJcIixcbiAgICBlZmZlY3RpdmVTZWxlY3RlZE93bmVyQXhVc2VySWQsXG4gICAgcmVzb2x2ZUVmZmVjdGl2ZU93bmVyQXhVc2VySWQsXG4gIH07XG59O1xuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgQXBpRmV0Y2hFcnJvciwgZmV0Y2hKc29uIH0gZnJvbSBcIi4uL3NlcnZpY2VzL2FwaVNlcnZpY2UudHNcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi91dGlscy9pbmRJMThuLnRzXCI7XHJcblxyXG5leHBvcnQgdHlwZSBIaXN0b3J5QWN0aXZpdHlJdGVtID0ge1xyXG4gIGFjdGl2aWRhZElkPzogc3RyaW5nIHwgbnVtYmVyO1xyXG4gIEFjdGl2aWRhZElkPzogc3RyaW5nIHwgbnVtYmVyO1xyXG4gIHJlY0lkPzogc3RyaW5nIHwgbnVtYmVyO1xyXG4gIFJlY0lkPzogc3RyaW5nIHwgbnVtYmVyO1xyXG4gIG5hbWU/OiBzdHJpbmc7XHJcbiAgTmFtZT86IHN0cmluZztcclxuICB0cmFuc0RhdGU/OiBzdHJpbmc7XHJcbiAgVHJhbnNEYXRlPzogc3RyaW5nO1xyXG4gIGRlc2NyaXB0aW9uPzogc3RyaW5nO1xyXG4gIERlc2NyaXB0aW9uPzogc3RyaW5nO1xyXG59O1xyXG5cclxudHlwZSBIaXN0b3J5UmVzcG9uc2UgPSB7XHJcbiAgaXRlbXM/OiBIaXN0b3J5QWN0aXZpdHlJdGVtW107XHJcbiAgdG90YWw/OiBudW1iZXI7XHJcbn07XHJcblxyXG50eXBlIExvYWRPdmVycmlkZSA9IHtcbiAgZnJvbURhdGU6IHN0cmluZztcbiAgdG9EYXRlOiBzdHJpbmc7XG4gIGFjY291bnROdW0/OiBzdHJpbmc7XG4gIG93bmVyQXhVc2VySWQ/OiBzdHJpbmc7XG59O1xuXHJcbnR5cGUgVXNlSGlzdG9yeUFjdGl2aXRpZXNBcmdzID0ge1xyXG4gIGZyb21EYXRlVmFsdWU6IHN0cmluZztcbiAgdG9EYXRlVmFsdWU6IHN0cmluZztcbiAgYWNjb3VudE51bVZhbHVlOiBzdHJpbmc7XG4gIG93bmVyQXhVc2VySWRWYWx1ZT86IHN0cmluZztcbiAgcGFnZVNpemU6IG51bWJlcjtcbiAgcmV0cnlEZWxheU1zPzogbnVtYmVyO1xyXG4gIG5vcm1hbGl6ZVJhbmdlOiAoZnJvbTogc3RyaW5nLCB0bzogc3RyaW5nKSA9PiB7IGZyb206IHN0cmluZzsgdG86IHN0cmluZyB9O1xyXG4gIG9uRm9yYmlkZGVuOiAoKSA9PiB2b2lkO1xyXG4gIG9uRGVidWc/OiAobWVzc2FnZTogc3RyaW5nLCBkYXRhPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pID0+IHZvaWQ7XHJcbn07XHJcblxyXG4vLyBDZW50cmFsaXplcyBoaXN0b3J5IGZldGNoL3JldHJ5IGxvZ2ljIHRvIGtlZXAgcGFnZSBjb21wb25lbnRzIHNtYWxsZXIuXHJcbmV4cG9ydCBjb25zdCB1c2VIaXN0b3J5QWN0aXZpdGllcyA9ICh7XHJcbiAgZnJvbURhdGVWYWx1ZSxcbiAgdG9EYXRlVmFsdWUsXG4gIGFjY291bnROdW1WYWx1ZSxcbiAgb3duZXJBeFVzZXJJZFZhbHVlID0gXCJcIixcbiAgcGFnZVNpemUsXG4gIHJldHJ5RGVsYXlNcyA9IDYwMCxcclxuICBub3JtYWxpemVSYW5nZSxcclxuICBvbkZvcmJpZGRlbixcclxuICBvbkRlYnVnLFxyXG59OiBVc2VIaXN0b3J5QWN0aXZpdGllc0FyZ3MpID0+IHtcclxuICBjb25zdCBbaXRlbXMsIHNldEl0ZW1zXSA9IHVzZVN0YXRlPEhpc3RvcnlBY3Rpdml0eUl0ZW1bXT4oW10pO1xyXG4gIGNvbnN0IFt0b3RhbCwgc2V0VG90YWxdID0gdXNlU3RhdGUoMCk7XHJcbiAgY29uc3QgW2N1cnJlbnRQYWdlLCBzZXRDdXJyZW50UGFnZV0gPSB1c2VTdGF0ZSgxKTtcclxuICBjb25zdCBbaXNMb2FkaW5nLCBzZXRJc0xvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtlcnJvck1lc3NhZ2UsIHNldEVycm9yTWVzc2FnZV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuXHJcbiAgY29uc3QgcmV0cnlPbk5ldHdvcmtFcnJvclJlZiA9IHVzZVJlZihmYWxzZSk7XHJcbiAgY29uc3QgYWN0aXZlQWJvcnRSZWYgPSB1c2VSZWY8QWJvcnRDb250cm9sbGVyIHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgYWN0aXZlUmVxdWVzdElkUmVmID0gdXNlUmVmKDApO1xyXG4gIGNvbnN0IHJldHJ5VGltZXJSZWYgPSB1c2VSZWY8bnVtYmVyIHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgbGFzdFNpZ25hdHVyZVJlZiA9IHVzZVJlZihcIlwiKTtcclxuXHJcbiAgY29uc3QgY2xlYXJSZXRyeVRpbWVyID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKHJldHJ5VGltZXJSZWYuY3VycmVudCkge1xyXG4gICAgICBjbGVhclRpbWVvdXQocmV0cnlUaW1lclJlZi5jdXJyZW50KTtcclxuICAgICAgcmV0cnlUaW1lclJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgIH1cclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IGFib3J0QWN0aXZlUmVxdWVzdCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmICghYWN0aXZlQWJvcnRSZWYuY3VycmVudCkgcmV0dXJuO1xyXG4gICAgdHJ5IHtcclxuICAgICAgYWN0aXZlQWJvcnRSZWYuY3VycmVudC5hYm9ydCgpO1xyXG4gICAgfSBjYXRjaCB7XHJcbiAgICAgIC8vIElnbm9yZSBhYm9ydCBlcnJvcnMuXHJcbiAgICB9XHJcbiAgICBhY3RpdmVBYm9ydFJlZi5jdXJyZW50ID0gbnVsbDtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IHJlc2V0QWN0aXZpdGllcyA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGNsZWFyUmV0cnlUaW1lcigpO1xyXG4gICAgYWJvcnRBY3RpdmVSZXF1ZXN0KCk7XHJcbiAgICBzZXRJdGVtcyhbXSk7XHJcbiAgICBzZXRUb3RhbCgwKTtcclxuICAgIHNldEVycm9yTWVzc2FnZShcIlwiKTtcclxuICAgIHNldElzTG9hZGluZyhmYWxzZSk7XHJcbiAgfSwgW2Fib3J0QWN0aXZlUmVxdWVzdCwgY2xlYXJSZXRyeVRpbWVyXSk7XHJcblxyXG4gIGNvbnN0IGxvYWRBY3Rpdml0aWVzID0gdXNlQ2FsbGJhY2soXHJcbiAgICBhc3luYyAocGFnZTogbnVtYmVyLCBvdmVycmlkZT86IExvYWRPdmVycmlkZSkgPT4ge1xyXG4gICAgICBjb25zdCBmcm9tRGF0ZVN0ciA9IG92ZXJyaWRlPy5mcm9tRGF0ZSA/PyBmcm9tRGF0ZVZhbHVlO1xuICAgICAgY29uc3QgdG9EYXRlU3RyID0gb3ZlcnJpZGU/LnRvRGF0ZSA/PyB0b0RhdGVWYWx1ZTtcbiAgICAgIGNvbnN0IGFjY291bnROdW1TdHIgPSBvdmVycmlkZT8uYWNjb3VudE51bSA/PyBhY2NvdW50TnVtVmFsdWU7XG4gICAgICBjb25zdCBvd25lckF4VXNlcklkU3RyID0gb3ZlcnJpZGU/Lm93bmVyQXhVc2VySWQgPz8gb3duZXJBeFVzZXJJZFZhbHVlO1xuXHJcbiAgICAgIGlmICghZnJvbURhdGVTdHIgfHwgIXRvRGF0ZVN0cikge1xyXG4gICAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XHJcbiAgICAgICAgc2V0SXRlbXMoW10pO1xyXG4gICAgICAgIHNldFRvdGFsKDApO1xyXG4gICAgICAgIHNldEVycm9yTWVzc2FnZShcIlwiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNldEN1cnJlbnRQYWdlKHBhZ2UpO1xyXG4gICAgICBjbGVhclJldHJ5VGltZXIoKTtcclxuXHJcbiAgICAgIGNvbnN0IHJlcXVlc3RJZCA9ICsrYWN0aXZlUmVxdWVzdElkUmVmLmN1cnJlbnQ7XHJcbiAgICAgIGFib3J0QWN0aXZlUmVxdWVzdCgpO1xyXG5cclxuICAgICAgY29uc3QgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcclxuICAgICAgYWN0aXZlQWJvcnRSZWYuY3VycmVudCA9IGNvbnRyb2xsZXI7XHJcblxyXG4gICAgICBjb25zdCBub3JtYWxpemVkID0gbm9ybWFsaXplUmFuZ2UoZnJvbURhdGVTdHIsIHRvRGF0ZVN0cik7XHJcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRPd25lckF4VXNlcklkID0gb3duZXJBeFVzZXJJZFN0ci50cmltKCk7XG4gICAgICBjb25zdCBmaWx0ZXJTaWduYXR1cmUgPSBgJHtub3JtYWxpemVkLmZyb219fCR7bm9ybWFsaXplZC50b318JHthY2NvdW50TnVtU3RyfXwke25vcm1hbGl6ZWRPd25lckF4VXNlcklkfXwke3BhZ2V9YDtcbiAgICAgIGxhc3RTaWduYXR1cmVSZWYuY3VycmVudCA9IGZpbHRlclNpZ25hdHVyZTtcblxyXG4gICAgICBzZXRJc0xvYWRpbmcodHJ1ZSk7XHJcbiAgICAgIHNldEl0ZW1zKFtdKTtcclxuICAgICAgc2V0VG90YWwoMCk7XHJcbiAgICAgIHNldEVycm9yTWVzc2FnZShcIlwiKTtcclxuXHJcbiAgICAgIGNvbnN0IHBheWxvYWQ6IHtcbiAgICAgICAgZnJvbURhdGU6IHN0cmluZztcbiAgICAgICAgdG9EYXRlOiBzdHJpbmc7XG4gICAgICAgIGFjY291bnROdW06IHN0cmluZztcbiAgICAgICAgb3duZXJBeFVzZXJJZD86IHN0cmluZztcbiAgICAgIH0gPSB7XG4gICAgICAgIGZyb21EYXRlOiBub3JtYWxpemVkLmZyb20sXG4gICAgICAgIHRvRGF0ZTogbm9ybWFsaXplZC50byxcbiAgICAgICAgYWNjb3VudE51bTogYWNjb3VudE51bVN0cixcbiAgICAgIH07XG4gICAgICBpZiAobm9ybWFsaXplZE93bmVyQXhVc2VySWQpIHtcbiAgICAgICAgcGF5bG9hZC5vd25lckF4VXNlcklkID0gbm9ybWFsaXplZE93bmVyQXhVc2VySWQ7XG4gICAgICB9XG5cclxuICAgICAgb25EZWJ1Zz8uKFwibG9hZEFjdGl2aXRpZXM6cmVxdWVzdFwiLCB7IHBhZ2UsIHBhZ2VTaXplLCBwYXlsb2FkIH0pO1xyXG5cclxuICAgICAgbGV0IGRhdGE6IEhpc3RvcnlSZXNwb25zZTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBkYXRhID0gYXdhaXQgZmV0Y2hKc29uPEhpc3RvcnlSZXNwb25zZT4oYC9IaXN0b3JpYWwvR2V0QWN0aXZpdGllcz9wYWdlPSR7cGFnZX0mcGFnZVNpemU9JHtwYWdlU2l6ZX1gLCB7XHJcbiAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxyXG4gICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGF5bG9hZCksXHJcbiAgICAgICAgICBzaWduYWw6IGNvbnRyb2xsZXIuc2lnbmFsLFxyXG4gICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycjogYW55KSB7XHJcbiAgICAgICAgaWYgKHJlcXVlc3RJZCAhPT0gYWN0aXZlUmVxdWVzdElkUmVmLmN1cnJlbnQpIHJldHVybjtcclxuICAgICAgICBpZiAoZXJyPy5uYW1lID09PSBcIkFib3J0RXJyb3JcIikge1xyXG4gICAgICAgICAgYWN0aXZlQWJvcnRSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZXJyIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvciAmJiBlcnIuc3RhdHVzID09PSA0MDMpIHtcclxuICAgICAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XHJcbiAgICAgICAgICBhY3RpdmVBYm9ydFJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgICAgIG9uRm9yYmlkZGVuKCk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBpc05ldHdvcmtFcnJvciA9ICEoZXJyIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvcikgfHwgdHlwZW9mIGVyci5zdGF0dXMgIT09IFwibnVtYmVyXCI7XHJcbiAgICAgICAgaWYgKGlzTmV0d29ya0Vycm9yICYmIHJldHJ5T25OZXR3b3JrRXJyb3JSZWYuY3VycmVudCkge1xyXG4gICAgICAgICAgcmV0cnlPbk5ldHdvcmtFcnJvclJlZi5jdXJyZW50ID0gZmFsc2U7XHJcbiAgICAgICAgICBhY3RpdmVBYm9ydFJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgICAgIHJldHJ5VGltZXJSZWYuY3VycmVudCA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlcXVlc3RJZCAhPT0gYWN0aXZlUmVxdWVzdElkUmVmLmN1cnJlbnQpIHJldHVybjtcclxuICAgICAgICAgICAgaWYgKGxhc3RTaWduYXR1cmVSZWYuY3VycmVudCAhPT0gZmlsdGVyU2lnbmF0dXJlKSByZXR1cm47XHJcbiAgICAgICAgICAgIGxvYWRBY3Rpdml0aWVzKHBhZ2UsIHtcclxuICAgICAgICAgICAgICBmcm9tRGF0ZTogZnJvbURhdGVTdHIsXG4gICAgICAgICAgICAgIHRvRGF0ZTogdG9EYXRlU3RyLFxuICAgICAgICAgICAgICBhY2NvdW50TnVtOiBhY2NvdW50TnVtU3RyLFxuICAgICAgICAgICAgICBvd25lckF4VXNlcklkOiBub3JtYWxpemVkT3duZXJBeFVzZXJJZCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sIHJldHJ5RGVsYXlNcyk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XHJcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKGVycj8ubWVzc2FnZSB8fCBpbmRUKFwiQXBpX1JlcXVlc3RGYWlsZWRcIiwgXCJObyBzZSBwdWRvIGNvbmVjdGFyIGNvbiBlbCBzZXJ2aWRvciAocmVkKS5cIikpO1xyXG4gICAgICAgIGFjdGl2ZUFib3J0UmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHJlcXVlc3RJZCAhPT0gYWN0aXZlUmVxdWVzdElkUmVmLmN1cnJlbnQpIHJldHVybjtcclxuXHJcbiAgICAgIG9uRGVidWc/LihcImxvYWRBY3Rpdml0aWVzOnJlc3BvbnNlXCIsIHtcclxuICAgICAgICBzdGF0dXM6IDIwMCxcclxuICAgICAgICB0b3RhbDogZGF0YT8udG90YWwgPz8gMCxcclxuICAgICAgICBjb3VudDogQXJyYXkuaXNBcnJheShkYXRhPy5pdGVtcykgPyBkYXRhLml0ZW1zLmxlbmd0aCA6IDAsXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcclxuICAgICAgc2V0SXRlbXMoZGF0YS5pdGVtcyB8fCBbXSk7XHJcbiAgICAgIHNldFRvdGFsKGRhdGEudG90YWwgfHwgKGRhdGEuaXRlbXMgfHwgW10pLmxlbmd0aCk7XHJcbiAgICAgIGFjdGl2ZUFib3J0UmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgfSxcclxuICAgIFtcclxuICAgICAgYWJvcnRBY3RpdmVSZXF1ZXN0LFxyXG4gICAgICBhY2NvdW50TnVtVmFsdWUsXG4gICAgICBjbGVhclJldHJ5VGltZXIsXG4gICAgICBmcm9tRGF0ZVZhbHVlLFxuICAgICAgbm9ybWFsaXplUmFuZ2UsXG4gICAgICBvbkRlYnVnLFxuICAgICAgb25Gb3JiaWRkZW4sXG4gICAgICBvd25lckF4VXNlcklkVmFsdWUsXG4gICAgICBwYWdlU2l6ZSxcbiAgICAgIHJldHJ5RGVsYXlNcyxcbiAgICAgIHRvRGF0ZVZhbHVlLFxuICAgIF1cclxuICApO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgY2xlYXJSZXRyeVRpbWVyKCk7XHJcbiAgICAgIGFib3J0QWN0aXZlUmVxdWVzdCgpO1xyXG4gICAgfTtcclxuICB9LCBbYWJvcnRBY3RpdmVSZXF1ZXN0LCBjbGVhclJldHJ5VGltZXJdKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGl0ZW1zLFxyXG4gICAgdG90YWwsXHJcbiAgICBjdXJyZW50UGFnZSxcclxuICAgIGlzTG9hZGluZyxcclxuICAgIGVycm9yTWVzc2FnZSxcclxuICAgIGxvYWRBY3Rpdml0aWVzLFxyXG4gICAgcmVzZXRBY3Rpdml0aWVzLFxyXG4gICAgcmV0cnlPbk5ldHdvcmtFcnJvclJlZixcclxuICAgIGxhc3RTaWduYXR1cmVSZWYsXHJcbiAgfTtcclxufTtcclxuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IEhJU1RPUllfRklMVEVSX0tFWSwgSElTVE9SWV9SRVRVUk5fRkxBR19LRVkgfSBmcm9tIFwiLi4vdXRpbHMvdmlzaXRhc0hpc3RvcnkudHNcIjtcclxuaW1wb3J0IHtcclxuICBnZXRTZXNzaW9uSnNvbldpdGhFeHBpcnksXHJcbiAgZ2V0U2Vzc2lvblZhbHVlV2l0aEV4cGlyeSxcclxuICByZW1vdmVTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5LFxyXG4gIHNldFNlc3Npb25Kc29uV2l0aEV4cGlyeSxcclxuICBzZXRTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5LFxyXG59IGZyb20gXCIuLi91dGlscy9zZXNzaW9uRXhwaXJ5LnRzXCI7XHJcblxyXG5leHBvcnQgdHlwZSBIaXN0b3J5Q2FjaGVkRmlsdGVyID0ge1xuICBmcm9tRGF0ZTogc3RyaW5nO1xuICB0b0RhdGU6IHN0cmluZztcbiAgcGFnZT86IG51bWJlcjtcbiAgY2xpZW50QWNjb3VudD86IHN0cmluZztcbiAgY2xpZW50VGV4dD86IHN0cmluZztcbiAgb3duZXJBeFVzZXJJZD86IHN0cmluZztcbiAgb3duZXJUZXh0Pzogc3RyaW5nO1xufTtcblxyXG5jb25zdCBISVNUT1JZX0NBQ0hFX1RUTF9NUyA9IDEyICogNjAgKiA2MCAqIDEwMDA7XHJcblxyXG5jb25zdCBub3JtYWxpemVDYWNoZWRGaWx0ZXIgPSAodmFsdWU6IEhpc3RvcnlDYWNoZWRGaWx0ZXIgfCBudWxsKTogSGlzdG9yeUNhY2hlZEZpbHRlciB8IG51bGwgPT4ge1xyXG4gIGlmICghdmFsdWUgfHwgdHlwZW9mIHZhbHVlICE9PSBcIm9iamVjdFwiKSByZXR1cm4gbnVsbDtcclxuICByZXR1cm4ge1xyXG4gICAgZnJvbURhdGU6IHZhbHVlLmZyb21EYXRlIHx8IFwiXCIsXHJcbiAgICB0b0RhdGU6IHZhbHVlLnRvRGF0ZSB8fCBcIlwiLFxyXG4gICAgcGFnZTogdmFsdWUucGFnZSxcbiAgICBjbGllbnRBY2NvdW50OiB2YWx1ZS5jbGllbnRBY2NvdW50IHx8IFwiXCIsXG4gICAgY2xpZW50VGV4dDogdmFsdWUuY2xpZW50VGV4dCB8fCBcIlwiLFxuICAgIG93bmVyQXhVc2VySWQ6IHZhbHVlLm93bmVyQXhVc2VySWQgfHwgXCJcIixcbiAgICBvd25lclRleHQ6IHZhbHVlLm93bmVyVGV4dCB8fCBcIlwiLFxuICB9O1xufTtcblxyXG4vLyBLZWVwcyBoaXN0b3J5IGZpbHRlciBjYWNoZSByZWFkcy93cml0ZXMgaW4gb25lIHBsYWNlLlxyXG5leHBvcnQgY29uc3QgdXNlSGlzdG9yeUZpbHRlckNhY2hlID0gKCkgPT4ge1xyXG4gIGNvbnN0IHJlYWRDYWNoZWRGaWx0ZXIgPSB1c2VDYWxsYmFjaygoKTogSGlzdG9yeUNhY2hlZEZpbHRlciB8IG51bGwgPT4ge1xyXG4gICAgY29uc3QgcGFyc2VkID0gZ2V0U2Vzc2lvbkpzb25XaXRoRXhwaXJ5PEhpc3RvcnlDYWNoZWRGaWx0ZXI+KEhJU1RPUllfRklMVEVSX0tFWSk7XHJcbiAgICByZXR1cm4gbm9ybWFsaXplQ2FjaGVkRmlsdGVyKHBhcnNlZCk7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBjbGVhckZpbHRlckNhY2hlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgcmVtb3ZlU2Vzc2lvblZhbHVlV2l0aEV4cGlyeShISVNUT1JZX0ZJTFRFUl9LRVkpO1xyXG4gICAgcmVtb3ZlU2Vzc2lvblZhbHVlV2l0aEV4cGlyeShISVNUT1JZX1JFVFVSTl9GTEFHX0tFWSk7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBjb25zdW1lUmV0dXJuRmxhZyA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGNvbnN0IHJhdyA9IGdldFNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoSElTVE9SWV9SRVRVUk5fRkxBR19LRVkpO1xyXG4gICAgaWYgKHJhdyA9PT0gXCIxXCIpIHtcclxuICAgICAgcmVtb3ZlU2Vzc2lvblZhbHVlV2l0aEV4cGlyeShISVNUT1JZX1JFVFVSTl9GTEFHX0tFWSk7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3Qgc2F2ZUNhY2hlZEZpbHRlciA9IHVzZUNhbGxiYWNrKChmaWx0ZXI6IEhpc3RvcnlDYWNoZWRGaWx0ZXIpID0+IHtcclxuICAgIHNldFNlc3Npb25Kc29uV2l0aEV4cGlyeShISVNUT1JZX0ZJTFRFUl9LRVksIGZpbHRlciwgSElTVE9SWV9DQUNIRV9UVExfTVMpO1xyXG4gICAgc2V0U2Vzc2lvblZhbHVlV2l0aEV4cGlyeShISVNUT1JZX1JFVFVSTl9GTEFHX0tFWSwgXCIxXCIsIEhJU1RPUllfQ0FDSEVfVFRMX01TKTtcclxuICB9LCBbXSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICByZWFkQ2FjaGVkRmlsdGVyLFxyXG4gICAgY2xlYXJGaWx0ZXJDYWNoZSxcclxuICAgIGNvbnN1bWVSZXR1cm5GbGFnLFxyXG4gICAgc2F2ZUNhY2hlZEZpbHRlcixcclxuICB9O1xyXG59O1xyXG4iLCAiXHVGRUZGaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrLCB1c2VNZW1vLCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB0eXBlIHsgTW91c2VFdmVudCBhcyBSZWFjdE1vdXNlRXZlbnQgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHR5cGUgeyBDbGllbnRPcHRpb24gfSBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy92aXNpdGFzL0NsaWVudFNlYXJjaENvbWJvYm94LnRzeFwiO1xyXG5pbXBvcnQgdHlwZSB7IEhpc3RvcnlDYWNoZWRGaWx0ZXIgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlSGlzdG9yeUZpbHRlckNhY2hlLnRzXCI7XHJcblxyXG5leHBvcnQgdHlwZSBRdWlja0ZpbHRlcklkID0gXCJjdXN0b21cIiB8IFwiZGF5cy03XCIgfCBcImRheXMtMzBcIiB8IFwiZGF5cy05MFwiO1xyXG5cclxuZXhwb3J0IHR5cGUgTG9hZE92ZXJyaWRlID0ge1xuICBmcm9tRGF0ZTogc3RyaW5nO1xuICB0b0RhdGU6IHN0cmluZztcbiAgYWNjb3VudE51bT86IHN0cmluZztcbiAgb3duZXJBeFVzZXJJZD86IHN0cmluZztcbn07XG5cclxuZXhwb3J0IHR5cGUgRmlsdGVyTG9hZFJlcXVlc3QgPSB7XHJcbiAgcGFnZTogbnVtYmVyO1xyXG4gIG92ZXJyaWRlOiBMb2FkT3ZlcnJpZGU7XHJcbn07XHJcblxyXG5jb25zdCBISVNUT1JZX1FVSUNLX0ZJTFRFUl9SQU5HRVM6IEFycmF5PHtcclxuICBpZDogRXhjbHVkZTxRdWlja0ZpbHRlcklkLCBcImN1c3RvbVwiPjtcclxuICBkYXlzVG9TdWJ0cmFjdDogbnVtYmVyO1xyXG59PiA9IFtcclxuICB7IGlkOiBcImRheXMtN1wiLCBkYXlzVG9TdWJ0cmFjdDogNiB9LFxyXG4gIHsgaWQ6IFwiZGF5cy0zMFwiLCBkYXlzVG9TdWJ0cmFjdDogMjkgfSxcclxuICB7IGlkOiBcImRheXMtOTBcIiwgZGF5c1RvU3VidHJhY3Q6IDg5IH0sXHJcbl07XHJcblxyXG50eXBlIFVzZUhpc3RvcnlGaWx0ZXJzU3RhdGVBcmdzID0ge1xyXG4gIGRlZmF1bHRGcm9tRGF0ZTogc3RyaW5nO1xyXG4gIGRlZmF1bHRUb0RhdGU6IHN0cmluZztcclxuICBsb2dIaXN0b3J5OiAobWVzc2FnZTogc3RyaW5nLCBkYXRhPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pID0+IHZvaWQ7XHJcbiAgcGFyc2VEYXRlVmFsdWU6ICh2YWx1ZTogc3RyaW5nKSA9PiBEYXRlIHwgbnVsbDtcclxuICBwYXJzZUlTTzogKHZhbHVlOiBzdHJpbmcpID0+IERhdGUgfCBudWxsO1xyXG4gIHRvSVNPOiAodmFsdWU6IERhdGUpID0+IHN0cmluZztcclxuICBzdGFydE9mRGF5OiAodmFsdWU6IERhdGUpID0+IERhdGU7XHJcbiAgaXNCZWZvcmU6IChhOiBEYXRlIHwgbnVsbCwgYjogRGF0ZSB8IG51bGwpID0+IGJvb2xlYW47XHJcbn07XHJcblxyXG4vLyBFbmNhcHN1bGF0ZXMgaGlzdG9yeSBmaWx0ZXIgc3RhdGUgYW5kIGRhdGUtcmFuZ2Ugb3JjaGVzdHJhdGlvbi5cclxuZXhwb3J0IGNvbnN0IHVzZUhpc3RvcnlGaWx0ZXJzU3RhdGUgPSAoe1xyXG4gIGRlZmF1bHRGcm9tRGF0ZSxcclxuICBkZWZhdWx0VG9EYXRlLFxyXG4gIGxvZ0hpc3RvcnksXHJcbiAgcGFyc2VEYXRlVmFsdWUsXHJcbiAgcGFyc2VJU08sXHJcbiAgdG9JU08sXHJcbiAgc3RhcnRPZkRheSxcclxuICBpc0JlZm9yZSxcclxufTogVXNlSGlzdG9yeUZpbHRlcnNTdGF0ZUFyZ3MpID0+IHtcclxuICBjb25zdCByZXNvbHZlUXVpY2tGaWx0ZXJGcm9tUmFuZ2UgPSB1c2VDYWxsYmFjayhcclxuICAgIChzdGFydDogRGF0ZSB8IG51bGwsIGVuZDogRGF0ZSB8IG51bGwpOiBRdWlja0ZpbHRlcklkIHwgbnVsbCA9PiB7XHJcbiAgICAgIGlmICghc3RhcnQgfHwgIWVuZCkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBub3JtYWxpemVkU3RhcnQgPSBzdGFydE9mRGF5KHN0YXJ0KTtcclxuICAgICAgY29uc3Qgbm9ybWFsaXplZEVuZCA9IHN0YXJ0T2ZEYXkoZW5kKTtcclxuICAgICAgY29uc3QgdG9kYXkgPSBzdGFydE9mRGF5KG5ldyBEYXRlKCkpO1xyXG4gICAgICBpZiAodG9JU08obm9ybWFsaXplZEVuZCkgIT09IHRvSVNPKHRvZGF5KSkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBmb3IgKGNvbnN0IGVudHJ5IG9mIEhJU1RPUllfUVVJQ0tfRklMVEVSX1JBTkdFUykge1xyXG4gICAgICAgIGNvbnN0IGNhbmRpZGF0ZVN0YXJ0ID0gbmV3IERhdGUodG9kYXkpO1xyXG4gICAgICAgIGNhbmRpZGF0ZVN0YXJ0LnNldERhdGUodG9kYXkuZ2V0RGF0ZSgpIC0gZW50cnkuZGF5c1RvU3VidHJhY3QpO1xyXG4gICAgICAgIGlmICh0b0lTTyhub3JtYWxpemVkU3RhcnQpID09PSB0b0lTTyhjYW5kaWRhdGVTdGFydCkpIHtcclxuICAgICAgICAgIHJldHVybiBlbnRyeS5pZDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfSxcclxuICAgIFtzdGFydE9mRGF5LCB0b0lTT11cclxuICApO1xyXG5cclxuICBjb25zdCBbc3RhcnREYXRlLCBzZXRTdGFydERhdGVdID0gdXNlU3RhdGU8RGF0ZSB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IFtlbmREYXRlLCBzZXRFbmREYXRlXSA9IHVzZVN0YXRlPERhdGUgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBbbWFudWFsU3RhcnREYXRlLCBzZXRNYW51YWxTdGFydERhdGVdID0gdXNlU3RhdGU8RGF0ZSB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IFttYW51YWxFbmREYXRlLCBzZXRNYW51YWxFbmREYXRlXSA9IHVzZVN0YXRlPERhdGUgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBbaG92ZXJEYXRlLCBzZXRIb3ZlckRhdGVdID0gdXNlU3RhdGU8RGF0ZSB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IFtzZWxlY3RpbmdTdGVwLCBzZXRTZWxlY3RpbmdTdGVwXSA9IHVzZVN0YXRlPFwic3RhcnRcIiB8IFwiZW5kXCIgfCBcImRvbmVcIj4oXCJzdGFydFwiKTtcclxuICBjb25zdCBbY3VycmVudE1vbnRoLCBzZXRDdXJyZW50TW9udGhdID0gdXNlU3RhdGUobmV3IERhdGUoKS5nZXRNb250aCgpKTtcclxuICBjb25zdCBbY3VycmVudFllYXIsIHNldEN1cnJlbnRZZWFyXSA9IHVzZVN0YXRlKG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKSk7XHJcbiAgY29uc3QgW2lzT3Blbiwgc2V0SXNPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbc2hvd01hbnVhbFBpY2tlclBhbmVsLCBzZXRTaG93TWFudWFsUGlja2VyUGFuZWxdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFthY3RpdmVRdWlja0ZpbHRlciwgc2V0QWN0aXZlUXVpY2tGaWx0ZXJdID0gdXNlU3RhdGU8UXVpY2tGaWx0ZXJJZCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbc2VsZWN0ZWRDbGllbnQsIHNldFNlbGVjdGVkQ2xpZW50XSA9IHVzZVN0YXRlPENsaWVudE9wdGlvbiB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbc2VsZWN0ZWRPd25lckF4VXNlcklkLCBzZXRTZWxlY3RlZE93bmVyQXhVc2VySWRdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtjbGllbnRSZXNldEtleSwgc2V0Q2xpZW50UmVzZXRLZXldID0gdXNlU3RhdGUoMCk7XG4gIGNvbnN0IFtzaG93RmlsdGVycywgc2V0U2hvd0ZpbHRlcnNdID0gdXNlU3RhdGUodHJ1ZSk7XHJcbiAgY29uc3QgW3Nob3dNYW51YWxFcnJvciwgc2V0U2hvd01hbnVhbEVycm9yXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuXHJcbiAgY29uc3QgaGFzUmVzdG9yZWRGaWx0ZXJSZWYgPSB1c2VSZWYoZmFsc2UpO1xyXG4gIGNvbnN0IGRpZEluaXRGaWx0ZXJSZWYgPSB1c2VSZWYoZmFsc2UpO1xyXG5cclxuICBjb25zdCBmcm9tRGF0ZVZhbHVlID0gdXNlTWVtbygoKSA9PiAoc3RhcnREYXRlID8gdG9JU08oc3RhcnREYXRlKSA6IFwiXCIpLCBbc3RhcnREYXRlLCB0b0lTT10pO1xyXG4gIGNvbnN0IHRvRGF0ZVZhbHVlID0gdXNlTWVtbygoKSA9PiAoZW5kRGF0ZSA/IHRvSVNPKGVuZERhdGUpIDogXCJcIiksIFtlbmREYXRlLCB0b0lTT10pO1xyXG4gIGNvbnN0IGFjY291bnROdW1WYWx1ZSA9IHVzZU1lbW8oKCkgPT4gKHNlbGVjdGVkQ2xpZW50ID8gc2VsZWN0ZWRDbGllbnQudmFsdWUgOiBcIlwiKSwgW3NlbGVjdGVkQ2xpZW50XSk7XHJcblxyXG4gIGNvbnN0IHZhbGlkYXRlTWFudWFsUmFuZ2UgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAoYWN0aXZlUXVpY2tGaWx0ZXIgPT09IFwiY3VzdG9tXCIgJiYgKCFzdGFydERhdGUgfHwgIWVuZERhdGUpKSB7XHJcbiAgICAgIHNldFNob3dNYW51YWxFcnJvcih0cnVlKTtcclxuICAgICAgc2V0U2VsZWN0aW5nU3RlcCghc3RhcnREYXRlID8gXCJzdGFydFwiIDogXCJlbmRcIik7XHJcbiAgICAgIHNldFNob3dNYW51YWxQaWNrZXJQYW5lbCh0cnVlKTtcclxuICAgICAgc2V0SXNPcGVuKHRydWUpO1xyXG4gICAgICBzZXRTaG93RmlsdGVycyh0cnVlKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfSwgW2FjdGl2ZVF1aWNrRmlsdGVyLCBlbmREYXRlLCBzdGFydERhdGVdKTtcclxuXHJcbiAgLy8gQXBwbGllcyBhIGRlZmF1bHQgZGF0ZSByYW5nZSBhbmQgcmV0dXJucyB0aGUgbG9hZCBwYXlsb2FkIG5lZWRlZCBieSB0aGUgcGFnZS5cclxuICBjb25zdCBhcHBseURlZmF1bHRSYW5nZUZyb21Qcm9wcyA9IHVzZUNhbGxiYWNrKCgpOiBGaWx0ZXJMb2FkUmVxdWVzdCB8IG51bGwgPT4ge1xyXG4gICAgaWYgKCFkZWZhdWx0RnJvbURhdGUgfHwgIWRlZmF1bHRUb0RhdGUpIHJldHVybiBudWxsO1xyXG4gICAgY29uc3Qgc3RhcnRSYXcgPSBwYXJzZURhdGVWYWx1ZShkZWZhdWx0RnJvbURhdGUpO1xyXG4gICAgY29uc3QgZW5kUmF3ID0gcGFyc2VEYXRlVmFsdWUoZGVmYXVsdFRvRGF0ZSk7XHJcbiAgICBpZiAoIXN0YXJ0UmF3IHx8ICFlbmRSYXcpIHJldHVybiBudWxsO1xyXG5cclxuICAgIGNvbnN0IHN0YXJ0RGF5ID0gc3RhcnRPZkRheShzdGFydFJhdyk7XHJcbiAgICBjb25zdCBlbmREYXkgPSBzdGFydE9mRGF5KGVuZFJhdyk7XHJcblxyXG4gICAgbGV0IHN0YXJ0ID0gc3RhcnREYXk7XHJcbiAgICBsZXQgZW5kID0gZW5kRGF5O1xyXG4gICAgaWYgKGlzQmVmb3JlKGVuZCwgc3RhcnQpKSB7XHJcbiAgICAgIGNvbnN0IHN3YXAgPSBzdGFydDtcclxuICAgICAgc3RhcnQgPSBlbmQ7XHJcbiAgICAgIGVuZCA9IHN3YXA7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0U3RhcnREYXRlKHN0YXJ0KTtcclxuICAgIHNldEVuZERhdGUoZW5kKTtcclxuICAgIHNldFNlbGVjdGluZ1N0ZXAoXCJkb25lXCIpO1xyXG4gICAgc2V0SG92ZXJEYXRlKG51bGwpO1xyXG4gICAgc2V0Q3VycmVudE1vbnRoKHN0YXJ0LmdldE1vbnRoKCkpO1xyXG4gICAgc2V0Q3VycmVudFllYXIoc3RhcnQuZ2V0RnVsbFllYXIoKSk7XHJcbiAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcihyZXNvbHZlUXVpY2tGaWx0ZXJGcm9tUmFuZ2Uoc3RhcnQsIGVuZCkpO1xuICAgIHNldFNlbGVjdGVkQ2xpZW50KG51bGwpO1xuICAgIHNldFNlbGVjdGVkT3duZXJBeFVzZXJJZChcIlwiKTtcbiAgICBzZXRJc09wZW4oZmFsc2UpO1xuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBwYWdlOiAxLFxyXG4gICAgICBvdmVycmlkZToge1xyXG4gICAgICAgIGZyb21EYXRlOiB0b0lTTyhzdGFydCksXHJcbiAgICAgICAgdG9EYXRlOiB0b0lTTyhlbmQpLFxyXG4gICAgICAgIGFjY291bnROdW06IFwiXCIsXHJcbiAgICAgIH0sXHJcbiAgICB9O1xyXG4gIH0sIFtkZWZhdWx0RnJvbURhdGUsIGRlZmF1bHRUb0RhdGUsIGlzQmVmb3JlLCBwYXJzZURhdGVWYWx1ZSwgcmVzb2x2ZVF1aWNrRmlsdGVyRnJvbVJhbmdlLCBzdGFydE9mRGF5LCB0b0lTT10pO1xyXG5cclxuICAvLyBSZXNldHMgaGlzdG9yeSBmaWx0ZXJzIGxvY2FsIHN0YXRlIG9ubHkuXHJcbiAgY29uc3QgcmVzZXRIaXN0b3J5RmlsdGVycyA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIHNldFN0YXJ0RGF0ZShudWxsKTtcclxuICAgIHNldEVuZERhdGUobnVsbCk7XHJcbiAgICBzZXRNYW51YWxTdGFydERhdGUobnVsbCk7XHJcbiAgICBzZXRNYW51YWxFbmREYXRlKG51bGwpO1xyXG4gICAgc2V0U2VsZWN0aW5nU3RlcChcInN0YXJ0XCIpO1xyXG4gICAgc2V0SG92ZXJEYXRlKG51bGwpO1xyXG4gICAgc2V0Q3VycmVudE1vbnRoKG5ldyBEYXRlKCkuZ2V0TW9udGgoKSk7XHJcbiAgICBzZXRDdXJyZW50WWVhcihuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCkpO1xyXG4gICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIobnVsbCk7XG4gICAgc2V0U2hvd01hbnVhbFBpY2tlclBhbmVsKGZhbHNlKTtcbiAgICBzZXRTZWxlY3RlZENsaWVudChudWxsKTtcbiAgICBzZXRTZWxlY3RlZE93bmVyQXhVc2VySWQoXCJcIik7XG4gICAgc2V0Q2xpZW50UmVzZXRLZXkoKHByZXYpID0+IHByZXYgKyAxKTtcbiAgICBzZXRTaG93TWFudWFsRXJyb3IoZmFsc2UpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgLy8gQXBwbGllcyBjYWNoZWQgZmlsdGVycyBhbmQgcmV0dXJucyB0aGUgbG9hZCBwYXlsb2FkIG5lZWRlZCBieSB0aGUgcGFnZS5cclxuICBjb25zdCBhcHBseUNhY2hlZEZpbHRlciA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKGZpbHRlcjogSGlzdG9yeUNhY2hlZEZpbHRlciB8IG51bGwpOiBGaWx0ZXJMb2FkUmVxdWVzdCB8IG51bGwgPT4ge1xyXG4gICAgICBpZiAoIWZpbHRlciB8fCAhZmlsdGVyLmZyb21EYXRlIHx8ICFmaWx0ZXIudG9EYXRlKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgICAgIGNvbnN0IHN0YXJ0ID0gcGFyc2VJU08oZmlsdGVyLmZyb21EYXRlKTtcclxuICAgICAgY29uc3QgZW5kID0gcGFyc2VJU08oZmlsdGVyLnRvRGF0ZSk7XHJcbiAgICAgIHNldFN0YXJ0RGF0ZShzdGFydCk7XHJcbiAgICAgIHNldEVuZERhdGUoZW5kKTtcclxuICAgICAgc2V0U2VsZWN0aW5nU3RlcChlbmQgPyBcImRvbmVcIiA6IFwiZW5kXCIpO1xyXG4gICAgICBzZXRIb3ZlckRhdGUobnVsbCk7XHJcbiAgICAgIHNldEN1cnJlbnRNb250aChzdGFydCA/IHN0YXJ0LmdldE1vbnRoKCkgOiBuZXcgRGF0ZSgpLmdldE1vbnRoKCkpO1xyXG4gICAgICBzZXRDdXJyZW50WWVhcihzdGFydCA/IHN0YXJ0LmdldEZ1bGxZZWFyKCkgOiBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCkpO1xyXG4gICAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcihyZXNvbHZlUXVpY2tGaWx0ZXJGcm9tUmFuZ2Uoc3RhcnQsIGVuZCkpO1xyXG4gICAgICBzZXRTaG93TWFudWFsUGlja2VyUGFuZWwoZmFsc2UpO1xyXG4gICAgICBzZXRTaG93TWFudWFsRXJyb3IoZmFsc2UpO1xyXG5cclxuICAgICAgaWYgKGZpbHRlci5jbGllbnRBY2NvdW50KSB7XG4gICAgICAgIHNldFNlbGVjdGVkQ2xpZW50KHsgdmFsdWU6IGZpbHRlci5jbGllbnRBY2NvdW50LCB0ZXh0OiBmaWx0ZXIuY2xpZW50VGV4dCB8fCBmaWx0ZXIuY2xpZW50QWNjb3VudCB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNldFNlbGVjdGVkQ2xpZW50KG51bGwpO1xuICAgICAgfVxuICAgICAgc2V0U2VsZWN0ZWRPd25lckF4VXNlcklkKGZpbHRlci5vd25lckF4VXNlcklkIHx8IFwiXCIpO1xuXHJcbiAgICAgIGNvbnN0IHBhZ2VWYWwgPSBOdW1iZXIoZmlsdGVyLnBhZ2UpO1xyXG4gICAgICBjb25zdCBwYWdlVG9Mb2FkID0gTnVtYmVyLmlzRmluaXRlKHBhZ2VWYWwpICYmIHBhZ2VWYWwgPiAwID8gcGFnZVZhbCA6IDE7XHJcblxyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHBhZ2U6IHBhZ2VUb0xvYWQsXHJcbiAgICAgICAgb3ZlcnJpZGU6IHtcbiAgICAgICAgICBmcm9tRGF0ZTogZmlsdGVyLmZyb21EYXRlLFxuICAgICAgICAgIHRvRGF0ZTogZmlsdGVyLnRvRGF0ZSxcbiAgICAgICAgICBhY2NvdW50TnVtOiBmaWx0ZXIuY2xpZW50QWNjb3VudCB8fCBcIlwiLFxuICAgICAgICAgIG93bmVyQXhVc2VySWQ6IGZpbHRlci5vd25lckF4VXNlcklkIHx8IFwiXCIsXG4gICAgICAgIH0sXG4gICAgICB9O1xuICAgIH0sXHJcbiAgICBbcGFyc2VJU08sIHJlc29sdmVRdWlja0ZpbHRlckZyb21SYW5nZV1cclxuICApO1xyXG5cclxuICBjb25zdCBoYW5kbGVTZWxlY3QgPSB1c2VDYWxsYmFjayhcclxuICAgIChkYXRlT2JqOiBEYXRlKSA9PiB7XHJcbiAgICAgIGxvZ0hpc3RvcnkoXCJoYW5kbGVTZWxlY3RcIiwge1xyXG4gICAgICAgIGNsaWNrZWQ6IHRvSVNPKGRhdGVPYmopLFxyXG4gICAgICAgIHN0YXJ0OiBmcm9tRGF0ZVZhbHVlLFxyXG4gICAgICAgIGVuZDogdG9EYXRlVmFsdWUsXHJcbiAgICAgICAgc2VsZWN0aW5nU3RlcCxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBzZXRTaG93TWFudWFsRXJyb3IoZmFsc2UpO1xyXG4gICAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcihcImN1c3RvbVwiKTtcclxuICAgICAgc2V0U2hvd01hbnVhbFBpY2tlclBhbmVsKHRydWUpO1xyXG4gICAgICBjb25zdCBoYXNTdGFydCA9ICEhc3RhcnREYXRlO1xyXG4gICAgICBjb25zdCBoYXNFbmQgPSAhIWVuZERhdGU7XHJcblxyXG4gICAgICBpZiAoc2VsZWN0aW5nU3RlcCA9PT0gXCJlbmRcIikge1xyXG4gICAgICAgIGlmICghaGFzU3RhcnQpIHtcclxuICAgICAgICAgIHNldFN0YXJ0RGF0ZShkYXRlT2JqKTtcclxuICAgICAgICAgIHNldEVuZERhdGUobnVsbCk7XHJcbiAgICAgICAgICBzZXRTZWxlY3RpbmdTdGVwKFwiZW5kXCIpO1xyXG4gICAgICAgICAgc2V0Q3VycmVudE1vbnRoKGRhdGVPYmouZ2V0TW9udGgoKSk7XHJcbiAgICAgICAgICBzZXRDdXJyZW50WWVhcihkYXRlT2JqLmdldEZ1bGxZZWFyKCkpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG5ld1N0YXJ0ID0gc3RhcnREYXRlIGFzIERhdGU7XHJcbiAgICAgICAgbGV0IG5ld0VuZCA9IGRhdGVPYmo7XHJcbiAgICAgICAgaWYgKGlzQmVmb3JlKG5ld0VuZCwgbmV3U3RhcnQpKSB7XHJcbiAgICAgICAgICBjb25zdCBzd2FwID0gbmV3U3RhcnQ7XHJcbiAgICAgICAgICBuZXdTdGFydCA9IG5ld0VuZDtcclxuICAgICAgICAgIG5ld0VuZCA9IHN3YXA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRTdGFydERhdGUobmV3U3RhcnQpO1xyXG4gICAgICAgIHNldEVuZERhdGUobmV3RW5kKTtcclxuICAgICAgICBzZXRNYW51YWxTdGFydERhdGUobmV3U3RhcnQpO1xyXG4gICAgICAgIHNldE1hbnVhbEVuZERhdGUobmV3RW5kKTtcclxuICAgICAgICBzZXRTZWxlY3RpbmdTdGVwKFwiZG9uZVwiKTtcclxuICAgICAgICBzZXRDdXJyZW50TW9udGgobmV3RW5kLmdldE1vbnRoKCkpO1xyXG4gICAgICAgIHNldEN1cnJlbnRZZWFyKG5ld0VuZC5nZXRGdWxsWWVhcigpKTtcclxuICAgICAgICBzZXRIb3ZlckRhdGUobnVsbCk7XHJcbiAgICAgICAgc2V0SXNPcGVuKGZhbHNlKTtcclxuICAgICAgICBzZXRTaG93TWFudWFsUGlja2VyUGFuZWwoZmFsc2UpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgbmV3U3RhcnQgPSBkYXRlT2JqO1xyXG4gICAgICBpZiAoaGFzRW5kICYmIGVuZERhdGUgJiYgaXNCZWZvcmUoZW5kRGF0ZSwgbmV3U3RhcnQpKSB7XHJcbiAgICAgICAgc2V0U3RhcnREYXRlKG5ld1N0YXJ0KTtcclxuICAgICAgICBzZXRFbmREYXRlKG51bGwpO1xyXG4gICAgICAgIHNldFNlbGVjdGluZ1N0ZXAoXCJlbmRcIik7XHJcbiAgICAgICAgc2V0Q3VycmVudE1vbnRoKG5ld1N0YXJ0LmdldE1vbnRoKCkpO1xyXG4gICAgICAgIHNldEN1cnJlbnRZZWFyKG5ld1N0YXJ0LmdldEZ1bGxZZWFyKCkpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2V0U3RhcnREYXRlKG5ld1N0YXJ0KTtcclxuICAgICAgaWYgKGhhc0VuZCAmJiBlbmREYXRlKSB7XHJcbiAgICAgICAgc2V0RW5kRGF0ZShlbmREYXRlKTtcclxuICAgICAgICBzZXRNYW51YWxTdGFydERhdGUobmV3U3RhcnQpO1xyXG4gICAgICAgIHNldE1hbnVhbEVuZERhdGUoZW5kRGF0ZSk7XHJcbiAgICAgICAgc2V0U2VsZWN0aW5nU3RlcChcImRvbmVcIik7XHJcbiAgICAgICAgc2V0SG92ZXJEYXRlKG51bGwpO1xyXG4gICAgICAgIHNldElzT3BlbihmYWxzZSk7XHJcbiAgICAgICAgc2V0U2hvd01hbnVhbFBpY2tlclBhbmVsKGZhbHNlKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzZXRFbmREYXRlKG51bGwpO1xyXG4gICAgICAgIHNldFNlbGVjdGluZ1N0ZXAoXCJlbmRcIik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNldEN1cnJlbnRNb250aChuZXdTdGFydC5nZXRNb250aCgpKTtcclxuICAgICAgc2V0Q3VycmVudFllYXIobmV3U3RhcnQuZ2V0RnVsbFllYXIoKSk7XHJcbiAgICB9LFxyXG4gICAgW2VuZERhdGUsIGZyb21EYXRlVmFsdWUsIGlzQmVmb3JlLCBsb2dIaXN0b3J5LCBzZWxlY3RpbmdTdGVwLCBzdGFydERhdGUsIHRvRGF0ZVZhbHVlLCB0b0lTT11cclxuICApO1xyXG5cclxuICBjb25zdCBoYW5kbGVDbGVhclN0YXRlID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoZXZlbnQ6IFJlYWN0TW91c2VFdmVudCkgPT4ge1xyXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgbG9nSGlzdG9yeShcImNsZWFyUmFuZ2VcIik7XHJcbiAgICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKG51bGwpO1xyXG4gICAgICBzZXRTaG93TWFudWFsRXJyb3IoZmFsc2UpO1xyXG4gICAgICBzZXRTaG93TWFudWFsUGlja2VyUGFuZWwoZmFsc2UpO1xyXG4gICAgICByZXNldEhpc3RvcnlGaWx0ZXJzKCk7XHJcbiAgICAgIHNldElzT3BlbihmYWxzZSk7XHJcbiAgICAgIHNldFNob3dGaWx0ZXJzKHRydWUpO1xyXG4gICAgfSxcclxuICAgIFtsb2dIaXN0b3J5LCByZXNldEhpc3RvcnlGaWx0ZXJzXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IG9wZW5Qb3BvdmVyID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoc2VjdGlvbjogXCJzdGFydFwiIHwgXCJlbmRcIikgPT4ge1xyXG4gICAgICBsb2dIaXN0b3J5KFwib3BlblBvcG92ZXJcIiwgeyBzZWN0aW9uLCBzdGFydDogZnJvbURhdGVWYWx1ZSwgZW5kOiB0b0RhdGVWYWx1ZSwgc2VsZWN0aW5nU3RlcCB9KTtcclxuICAgICAgc2V0U2hvd01hbnVhbEVycm9yKGZhbHNlKTtcclxuICAgICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIoXCJjdXN0b21cIik7XHJcbiAgICAgIHNldFNob3dNYW51YWxQaWNrZXJQYW5lbCh0cnVlKTtcclxuXHJcbiAgICAgIGlmIChzZWN0aW9uID09PSBcImVuZFwiICYmICFzdGFydERhdGUpIHtcclxuICAgICAgICBzZXRTZWxlY3RpbmdTdGVwKFwic3RhcnRcIik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc2V0U2VsZWN0aW5nU3RlcChzZWN0aW9uKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2V0SXNPcGVuKHRydWUpO1xyXG4gICAgfSxcclxuICAgIFtmcm9tRGF0ZVZhbHVlLCBsb2dIaXN0b3J5LCBzZWxlY3RpbmdTdGVwLCBzdGFydERhdGUsIHRvRGF0ZVZhbHVlXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUFjdGl2YXRvcktleURvd24gPSB1c2VDYWxsYmFjayhcclxuICAgIChldmVudDogUmVhY3QuS2V5Ym9hcmRFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHtcclxuICAgICAgaWYgKGV2ZW50LmtleSAhPT0gXCJFbnRlclwiICYmIGV2ZW50LmtleSAhPT0gXCIgXCIpIHJldHVybjtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgb3BlblBvcG92ZXIoXCJzdGFydFwiKTtcclxuICAgIH0sXHJcbiAgICBbb3BlblBvcG92ZXJdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlU2VjdGlvbktleURvd24gPSB1c2VDYWxsYmFjayhcclxuICAgIChldmVudDogUmVhY3QuS2V5Ym9hcmRFdmVudDxIVE1MRGl2RWxlbWVudD4sIHNlY3Rpb246IFwic3RhcnRcIiB8IFwiZW5kXCIpID0+IHtcclxuICAgICAgaWYgKGV2ZW50LmtleSAhPT0gXCJFbnRlclwiICYmIGV2ZW50LmtleSAhPT0gXCIgXCIpIHJldHVybjtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIG9wZW5Qb3BvdmVyKHNlY3Rpb24pO1xyXG4gICAgfSxcclxuICAgIFtvcGVuUG9wb3Zlcl1cclxuICApO1xyXG5cclxuICBjb25zdCBhcHBseVF1aWNrUmFuZ2UgPSB1c2VDYWxsYmFjayhcclxuICAgIChmaWx0ZXJJZDogUXVpY2tGaWx0ZXJJZCwgc3RhcnQ6IERhdGUsIGVuZDogRGF0ZSkgPT4ge1xyXG4gICAgICBjb25zdCBzdGFydERheSA9IHN0YXJ0T2ZEYXkoc3RhcnQpO1xyXG4gICAgICBjb25zdCBlbmREYXkgPSBzdGFydE9mRGF5KGVuZCk7XHJcbiAgICAgIHNldFN0YXJ0RGF0ZShzdGFydERheSk7XHJcbiAgICAgIHNldEVuZERhdGUoZW5kRGF5KTtcclxuICAgICAgc2V0U2VsZWN0aW5nU3RlcChcImRvbmVcIik7XHJcbiAgICAgIHNldEhvdmVyRGF0ZShudWxsKTtcclxuICAgICAgc2V0Q3VycmVudE1vbnRoKHN0YXJ0RGF5LmdldE1vbnRoKCkpO1xyXG4gICAgICBzZXRDdXJyZW50WWVhcihzdGFydERheS5nZXRGdWxsWWVhcigpKTtcclxuICAgICAgc2V0SXNPcGVuKGZhbHNlKTtcclxuICAgICAgc2V0U2hvd01hbnVhbFBpY2tlclBhbmVsKGZhbHNlKTtcclxuICAgICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIoZmlsdGVySWQpO1xyXG4gICAgICBzZXRTaG93TWFudWFsRXJyb3IoZmFsc2UpO1xyXG4gICAgfSxcclxuICAgIFtzdGFydE9mRGF5XVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZVF1aWNrRmlsdGVyID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoZmlsdGVySWQ6IFF1aWNrRmlsdGVySWQpID0+IHtcclxuICAgICAgY29uc3QgdG9kYXkgPSBzdGFydE9mRGF5KG5ldyBEYXRlKCkpO1xyXG5cclxuICAgICAgaWYgKGZpbHRlcklkID09PSBcImN1c3RvbVwiKSB7XHJcbiAgICAgICAgLy8gVG9nZ2xlIG1hbnVhbCBwYW5lbCBvbiBldmVyeSBEYXRlIGJ1dHRvbiBjbGljay5cclxuICAgICAgICBpZiAoc2hvd01hbnVhbFBpY2tlclBhbmVsKSB7XHJcbiAgICAgICAgICBzZXRTaG93TWFudWFsRXJyb3IoZmFsc2UpO1xyXG4gICAgICAgICAgc2V0SG92ZXJEYXRlKG51bGwpO1xyXG4gICAgICAgICAgc2V0U2VsZWN0aW5nU3RlcChzdGFydERhdGUgJiYgZW5kRGF0ZSA/IFwiZG9uZVwiIDogc3RhcnREYXRlID8gXCJlbmRcIiA6IFwic3RhcnRcIik7XHJcbiAgICAgICAgICBzZXRJc09wZW4oZmFsc2UpO1xyXG4gICAgICAgICAgc2V0U2hvd01hbnVhbFBpY2tlclBhbmVsKGZhbHNlKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IG5leHRTdGFydCA9IG1hbnVhbFN0YXJ0RGF0ZSA/IG5ldyBEYXRlKG1hbnVhbFN0YXJ0RGF0ZSkgOiBzdGFydERhdGUgPyBuZXcgRGF0ZShzdGFydERhdGUpIDogbnVsbDtcclxuICAgICAgICBjb25zdCBuZXh0RW5kID0gbWFudWFsRW5kRGF0ZSA/IG5ldyBEYXRlKG1hbnVhbEVuZERhdGUpIDogZW5kRGF0ZSA/IG5ldyBEYXRlKGVuZERhdGUpIDogbnVsbDtcclxuICAgICAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcihcImN1c3RvbVwiKTtcclxuICAgICAgICBzZXRTaG93TWFudWFsUGlja2VyUGFuZWwodHJ1ZSk7XHJcbiAgICAgICAgc2V0U3RhcnREYXRlKG5leHRTdGFydCk7XHJcbiAgICAgICAgc2V0RW5kRGF0ZShuZXh0RW5kKTtcclxuXHJcbiAgICAgICAgaWYgKG5leHRTdGFydCkge1xyXG4gICAgICAgICAgc2V0Q3VycmVudE1vbnRoKG5leHRTdGFydC5nZXRNb250aCgpKTtcclxuICAgICAgICAgIHNldEN1cnJlbnRZZWFyKG5leHRTdGFydC5nZXRGdWxsWWVhcigpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEFsd2F5cyByZW9wZW4gdGhlIG1hbnVhbCBjYWxlbmRhciB3aGVuIHRoZSBjdXN0b20gZGF0ZSBxdWljayBmaWx0ZXIgaXMgcHJlc3NlZC5cclxuICAgICAgICBzZXRTZWxlY3RpbmdTdGVwKG5leHRTdGFydCAmJiAhbmV4dEVuZCA/IFwiZW5kXCIgOiBcInN0YXJ0XCIpO1xyXG4gICAgICAgIHNldElzT3Blbih0cnVlKTtcclxuICAgICAgICBzZXRIb3ZlckRhdGUobnVsbCk7XHJcbiAgICAgICAgc2V0U2hvd01hbnVhbEVycm9yKGZhbHNlKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChmaWx0ZXJJZCA9PT0gXCJkYXlzLTdcIikge1xyXG4gICAgICAgIGNvbnN0IHN0YXJ0ID0gbmV3IERhdGUodG9kYXkpO1xyXG4gICAgICAgIHN0YXJ0LnNldERhdGUodG9kYXkuZ2V0RGF0ZSgpIC0gNik7XHJcbiAgICAgICAgYXBwbHlRdWlja1JhbmdlKGZpbHRlcklkLCBzdGFydCwgdG9kYXkpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGZpbHRlcklkID09PSBcImRheXMtMzBcIikge1xyXG4gICAgICAgIGNvbnN0IHN0YXJ0ID0gbmV3IERhdGUodG9kYXkpO1xyXG4gICAgICAgIHN0YXJ0LnNldERhdGUodG9kYXkuZ2V0RGF0ZSgpIC0gMjkpO1xyXG4gICAgICAgIGFwcGx5UXVpY2tSYW5nZShmaWx0ZXJJZCwgc3RhcnQsIHRvZGF5KTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChmaWx0ZXJJZCA9PT0gXCJkYXlzLTkwXCIpIHtcclxuICAgICAgICBjb25zdCBzdGFydCA9IG5ldyBEYXRlKHRvZGF5KTtcclxuICAgICAgICBzdGFydC5zZXREYXRlKHRvZGF5LmdldERhdGUoKSAtIDg5KTtcclxuICAgICAgICBhcHBseVF1aWNrUmFuZ2UoZmlsdGVySWQsIHN0YXJ0LCB0b2RheSk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBbYXBwbHlRdWlja1JhbmdlLCBlbmREYXRlLCBtYW51YWxFbmREYXRlLCBtYW51YWxTdGFydERhdGUsIHNob3dNYW51YWxQaWNrZXJQYW5lbCwgc3RhcnREYXRlLCBzdGFydE9mRGF5XVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUNsaWVudFNlbGVjdGVkID0gdXNlQ2FsbGJhY2soKGNsaWVudDogQ2xpZW50T3B0aW9uIHwgbnVsbCkgPT4ge1xyXG4gICAgc2V0U2VsZWN0ZWRDbGllbnQoY2xpZW50KTtcclxuICB9LCBbXSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBzdGFydERhdGUsXHJcbiAgICBlbmREYXRlLFxyXG4gICAgbWFudWFsU3RhcnREYXRlLFxyXG4gICAgbWFudWFsRW5kRGF0ZSxcclxuICAgIGhvdmVyRGF0ZSxcclxuICAgIHNlbGVjdGluZ1N0ZXAsXHJcbiAgICBjdXJyZW50TW9udGgsXHJcbiAgICBjdXJyZW50WWVhcixcclxuICAgIGlzT3BlbixcclxuICAgIHNob3dNYW51YWxQaWNrZXJQYW5lbCxcclxuICAgIGFjdGl2ZVF1aWNrRmlsdGVyLFxyXG4gICAgc2VsZWN0ZWRDbGllbnQsXG4gICAgc2VsZWN0ZWRPd25lckF4VXNlcklkLFxuICAgIGNsaWVudFJlc2V0S2V5LFxuICAgIHNob3dGaWx0ZXJzLFxyXG4gICAgc2hvd01hbnVhbEVycm9yLFxyXG4gICAgZnJvbURhdGVWYWx1ZSxcclxuICAgIHRvRGF0ZVZhbHVlLFxyXG4gICAgYWNjb3VudE51bVZhbHVlLFxyXG4gICAgaGFzUmVzdG9yZWRGaWx0ZXJSZWYsXHJcbiAgICBkaWRJbml0RmlsdGVyUmVmLFxyXG4gICAgc2V0U3RhcnREYXRlLFxyXG4gICAgc2V0RW5kRGF0ZSxcclxuICAgIHNldE1hbnVhbFN0YXJ0RGF0ZSxcclxuICAgIHNldE1hbnVhbEVuZERhdGUsXHJcbiAgICBzZXRIb3ZlckRhdGUsXHJcbiAgICBzZXRTZWxlY3RpbmdTdGVwLFxyXG4gICAgc2V0Q3VycmVudE1vbnRoLFxyXG4gICAgc2V0Q3VycmVudFllYXIsXHJcbiAgICBzZXRJc09wZW4sXHJcbiAgICBzZXRTaG93TWFudWFsUGlja2VyUGFuZWwsXHJcbiAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcixcclxuICAgIHNldFNlbGVjdGVkQ2xpZW50LFxuICAgIHNldFNlbGVjdGVkT3duZXJBeFVzZXJJZCxcbiAgICBzZXRDbGllbnRSZXNldEtleSxcbiAgICBzZXRTaG93RmlsdGVycyxcclxuICAgIHNldFNob3dNYW51YWxFcnJvcixcclxuICAgIHZhbGlkYXRlTWFudWFsUmFuZ2UsXHJcbiAgICBhcHBseURlZmF1bHRSYW5nZUZyb21Qcm9wcyxcclxuICAgIHJlc2V0SGlzdG9yeUZpbHRlcnMsXHJcbiAgICBhcHBseUNhY2hlZEZpbHRlcixcclxuICAgIGhhbmRsZVNlbGVjdCxcclxuICAgIGhhbmRsZUNsZWFyU3RhdGUsXHJcbiAgICBvcGVuUG9wb3ZlcixcclxuICAgIGhhbmRsZUFjdGl2YXRvcktleURvd24sXHJcbiAgICBoYW5kbGVTZWN0aW9uS2V5RG93bixcclxuICAgIGhhbmRsZVF1aWNrRmlsdGVyLFxyXG4gICAgaGFuZGxlQ2xpZW50U2VsZWN0ZWQsXHJcbiAgfTtcclxufTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUFBLGlCQUF1Qzs7O0FDQXZDLG1CQUErQjs7O0FDR3hCLElBQU0sa0NBQWtDO0FBRS9DLElBQU0sa0JBQWtCLENBQUMsVUFBMkIsT0FBTyxTQUFTLEVBQUUsRUFBRSxLQUFLO0FBR3RFLElBQU0sNEJBQTRCLENBQUMsTUFBZSxVQUE0QjtBQUNuRixRQUFNLGlCQUFpQix1QkFBdUIsSUFBSTtBQUNsRCxRQUFNLGtCQUFrQix1QkFBdUIsS0FBSztBQUNwRCxTQUFPLENBQUMsQ0FBQyxrQkFBa0IsbUJBQW1CO0FBQ2hEO0FBR08sSUFBTSx5Q0FBeUMsQ0FDcEQsT0FDQSxvQkFDc0M7QUFDdEMsUUFBTSxvQkFBb0IsZ0JBQWdCLGVBQWU7QUFDekQsUUFBTSxrQkFBa0IsTUFBTSxRQUFRLEtBQUssSUFBSSxRQUFRLENBQUM7QUFDeEQsTUFBSSxDQUFDLGtCQUFtQixRQUFPO0FBQy9CLE1BQUksZ0JBQWdCLEtBQUssQ0FBQyxVQUFVLDBCQUEwQixNQUFNLFVBQVUsaUJBQWlCLENBQUMsR0FBRztBQUNqRyxXQUFPO0FBQUEsRUFDVDtBQUVBLFNBQU87QUFBQSxJQUNMO0FBQUEsTUFDRSxPQUFPO0FBQUEsTUFDUCxVQUFVO0FBQUEsTUFDVixXQUFXO0FBQUEsTUFDWCxNQUFNO0FBQUEsTUFDTixRQUFRO0FBQUEsTUFDUixnQkFBZ0I7QUFBQSxNQUNoQixtQkFBbUI7QUFBQSxNQUNuQixxQkFBcUI7QUFBQSxNQUNyQixXQUFXO0FBQUEsSUFDYjtBQUFBLElBQ0EsR0FBRztBQUFBLEVBQ0w7QUFDRjtBQUdPLElBQU0sZ0NBQWdDLENBQzNDLE9BQ0Esb0JBQ1k7QUFDWixRQUFNLG9CQUFvQix1QkFBdUIsZUFBZTtBQUNoRSxNQUFJLENBQUMsa0JBQW1CLFFBQU8sTUFBTSxTQUFTO0FBRTlDLFNBQU8sTUFBTSxLQUFLLENBQUMsVUFBVTtBQUMzQixVQUFNLFVBQVUsdUJBQXVCLE1BQU0sUUFBUTtBQUNyRCxXQUFPLENBQUMsQ0FBQyxXQUFXLFlBQVk7QUFBQSxFQUNsQyxDQUFDO0FBQ0g7QUFHTyxJQUFNLHNDQUFzQyxDQUNqRCx3QkFDQSxpQkFDQSxVQUNXO0FBQ1gsUUFBTSxzQkFBc0IsZ0JBQWdCLHNCQUFzQjtBQUNsRSxRQUFNLG9CQUFvQixnQkFBZ0IsZUFBZTtBQUV6RCxNQUFJLHVCQUF1Qix3QkFBd0IsaUNBQWlDO0FBQ2xGLFVBQU0sUUFBUSxNQUFNLEtBQUssQ0FBQyxVQUFVLDBCQUEwQixNQUFNLFVBQVUsbUJBQW1CLENBQUM7QUFDbEcsUUFBSSxNQUFPLFFBQU8sTUFBTTtBQUFBLEVBQzFCO0FBRUEsTUFBSSxtQkFBbUI7QUFDckIsVUFBTSxPQUFPLE1BQU0sS0FBSyxDQUFDLFVBQVUsMEJBQTBCLE1BQU0sVUFBVSxpQkFBaUIsQ0FBQztBQUMvRixXQUFPLE1BQU0sWUFBWTtBQUFBLEVBQzNCO0FBRUEsU0FBTztBQUNUO0FBVU8sSUFBTSx3Q0FBd0MsQ0FBQztBQUFBLEVBQ3BEO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0YsTUFBaUQ7QUFDL0MsTUFBSSx3QkFBd0I7QUFDMUIsVUFBTSxxQkFBcUIsZ0JBQWdCLHFCQUFxQjtBQUNoRSxRQUFJLHNCQUFzQix1QkFBdUIsaUNBQWlDO0FBQ2hGLFlBQU0sUUFBUSxNQUFNLEtBQUssQ0FBQyxVQUFVLDBCQUEwQixNQUFNLFVBQVUsa0JBQWtCLENBQUM7QUFDakcsVUFBSSxNQUFPLFFBQU8sTUFBTTtBQUFBLElBQzFCO0FBRUEsV0FBTztBQUFBLEVBQ1Q7QUFFQSxTQUFPLG9DQUFvQyx1QkFBdUIsaUJBQWlCLEtBQUs7QUFDMUY7QUFHTyxJQUFNLHVDQUF1QyxDQUFDO0FBQUEsRUFDbkQ7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRixNQUFpRDtBQUMvQyxNQUFJLHdCQUF3QjtBQUMxQixVQUFNLHFCQUFxQixnQkFBZ0IscUJBQXFCO0FBQ2hFLFFBQUksQ0FBQyxzQkFBc0IsdUJBQXVCLGdDQUFpQyxRQUFPO0FBRTFGLFVBQU0sUUFBUSxNQUFNLEtBQUssQ0FBQyxVQUFVLDBCQUEwQixNQUFNLFVBQVUsa0JBQWtCLENBQUM7QUFDakcsV0FBTyxPQUFPLFlBQVk7QUFBQSxFQUM1QjtBQUVBLFNBQU8sb0NBQW9DLHVCQUF1QixpQkFBaUIsS0FBSztBQUMxRjs7O0FENURJO0FBcENKLElBQU0sMEJBQTBCLENBQUM7QUFBQSxFQUMvQjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQSxZQUFZO0FBQUEsRUFDWjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0YsTUFBYTtBQUNYLFFBQU0sY0FBVSxzQkFBa0MsTUFBTTtBQUN0RCxVQUFNLGdCQUFnQixNQUFNLFFBQVEsS0FBSyxJQUFJLFFBQVEsQ0FBQyxHQUNuRCxJQUFJLENBQUMsVUFBVTtBQUNkLFlBQU0sV0FBVyxPQUFPLE1BQU0sWUFBWSxFQUFFLEVBQUUsS0FBSztBQUNuRCxZQUFNLGNBQWMsNkJBQTZCLEtBQUs7QUFDdEQsVUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFhLFFBQU87QUFDdEMsYUFBTztBQUFBLFFBQ0wsT0FBTztBQUFBLFFBQ1AsTUFBTTtBQUFBLE1BQ1I7QUFBQSxJQUNGLENBQUMsRUFDQSxPQUFPLENBQUMsVUFBMkMsQ0FBQyxDQUFDLEtBQUs7QUFFN0QsV0FBTyxZQUFZLENBQUMsV0FBVyxHQUFHLFlBQVksSUFBSTtBQUFBLEVBQ3BELEdBQUcsQ0FBQyxXQUFXLEtBQUssQ0FBQztBQUVyQixRQUFNLGFBQWEsUUFBUSxTQUFTO0FBQ3BDLFFBQU0saUJBQWlCLFFBQVEsS0FBSyxDQUFDLFVBQVUsTUFBTSxNQUFNLFlBQVksTUFBTSxzQkFBc0IsWUFBWSxDQUFDO0FBQ2hILFFBQU0sUUFBUSxjQUFjLGlCQUFpQix3QkFBd0I7QUFDckUsUUFBTSxhQUFhLFVBQVUsZUFBZTtBQUM1QyxRQUFNLG1CQUNKLGFBQWEsVUFBVSxrQ0FBa0MsU0FBUztBQUVwRSxTQUNFLDZDQUFDLFNBQUksV0FBVSxhQUNiO0FBQUE7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDO0FBQUEsUUFDQSxhQUFhLGFBQWEsUUFBUTtBQUFBLFFBQ2xDLFNBQVMsYUFBYSxVQUFVLENBQUMsRUFBRSxPQUFPLElBQUksTUFBTSxhQUFhLENBQUM7QUFBQSxRQUNsRTtBQUFBLFFBQ0EsVUFBVSxDQUFDLGNBQWM7QUFDdkIsbUJBQVMsY0FBYyxrQ0FBa0MsS0FBSyxTQUFTO0FBQUEsUUFDekU7QUFBQSxRQUNBLFVBQVUsWUFBWSxXQUFXLENBQUM7QUFBQSxRQUNsQyxRQUFPO0FBQUEsUUFDUCxpQkFBZ0I7QUFBQSxRQUNoQixnQkFBZTtBQUFBLFFBQ2YsZ0JBQWM7QUFBQSxRQUNkO0FBQUEsUUFDQSxXQUFXO0FBQUE7QUFBQSxJQUNiO0FBQUEsSUFDQyxjQUNDLDRDQUFDLFNBQUksV0FBVSwyQkFDYixzREFBQyxVQUFLLFdBQVcsV0FBVyxxQkFBcUIsZUFBZSxtQkFBbUIsZ0JBQWdCLEdBQ2hHLHNCQUNILEdBQ0Y7QUFBQSxLQUVKO0FBRUo7QUFFQSxJQUFPLGtDQUFROzs7QUU0REQsSUFBQUMsc0JBQUE7QUFuRWQsSUFBTSxxQkFBcUIsQ0FBQztBQUFBLEVBQzFCO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0YsTUFBYTtBQUNYLFNBQ0UsNkNBQUMsU0FBSSxXQUFVLDJEQUNiLHdEQUFDLFNBQUksV0FBVSxnREFDYjtBQUFBLGlEQUFDLFNBQUksV0FBVSxnREFBK0MsY0FBWSxhQUN2RSx1QkFBYSxJQUFJLENBQUMsU0FBUztBQUMxQixZQUFNLFdBQVcsc0JBQXNCLEtBQUs7QUFDNUMsYUFDRTtBQUFBLFFBQUM7QUFBQTtBQUFBLFVBRUMsT0FBTyxLQUFLO0FBQUEsVUFDWixRQUFRO0FBQUEsVUFDUixXQUFVO0FBQUEsVUFDVixTQUFTLE1BQU0sY0FBYyxLQUFLLEVBQUU7QUFBQTtBQUFBLFFBSi9CLEtBQUs7QUFBQSxNQUtaO0FBQUEsSUFFSixDQUFDLEdBQ0g7QUFBQSxJQUVDLHFCQUNDO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQztBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQSxXQUFXLENBQUMsQ0FBQztBQUFBLFFBQ2IsV0FBVTtBQUFBO0FBQUEsSUFDWjtBQUFBLElBR0Qsb0JBQ0M7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0EsU0FBUztBQUFBLFFBQ1Q7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUE7QUFBQSxJQUNGO0FBQUEsSUFHRjtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0MsT0FBTztBQUFBLFFBQ1A7QUFBQSxRQUNBLFNBQVM7QUFBQSxRQUNULFVBQVU7QUFBQSxRQUNWLGNBQWM7QUFBQSxRQUNkLE9BQU87QUFBQSxRQUNQLFdBQVc7QUFBQSxRQUNYLGNBQWM7QUFBQSxRQUNkLGNBQWM7QUFBQSxRQUNkLFVBQVU7QUFBQTtBQUFBLElBQ1o7QUFBQSxJQUVBO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFFQyxPQUFPO0FBQUEsUUFDUCxZQUFZO0FBQUEsUUFDWixPQUFPO0FBQUEsUUFDUCxhQUFhO0FBQUEsUUFDYixTQUFRO0FBQUEsUUFDUixXQUFXO0FBQUEsUUFDWCxRQUFPO0FBQUEsUUFDUCxpQkFBZ0I7QUFBQTtBQUFBLE1BUlg7QUFBQSxJQVNQO0FBQUEsSUFFQyxxQkFDQyw4Q0FBQyxTQUFJLFdBQVUsc0RBQ2I7QUFBQSxtREFBQyx3QkFBYSxPQUFPLFlBQVksV0FBVSxVQUFTLFNBQVMsZ0JBQWdCO0FBQUEsTUFDN0UsNkNBQUMsd0JBQWEsT0FBTyxZQUFZLFdBQVUsVUFBUyxTQUFTLGdCQUFnQjtBQUFBLE9BQy9FO0FBQUEsS0FFSixHQUNGO0FBRUo7QUFFQSxJQUFPLDZCQUFROzs7QUNuUGYsSUFBQUMsZ0JBQTJDO0FBZ0l2QyxJQUFBQyxzQkFBQTtBQW5HSixJQUFNLGNBQWM7QUFDcEIsSUFBTSxxQkFBcUI7QUFZM0IsSUFBTSxlQUFlLENBQUMsRUFBRSxPQUFPLFlBQVksY0FBYyxXQUFXLE1BQWE7QUFDL0UsUUFBTSxtQkFBZSxzQkFBOEIsSUFBSTtBQUN2RCxRQUFNLGtCQUFjLHNCQUFzQjtBQUFBLElBQ3hDLFFBQVE7QUFBQSxJQUNSLFdBQVc7QUFBQSxJQUNYLFFBQVE7QUFBQSxJQUNSLFFBQVE7QUFBQSxJQUNSLFdBQVc7QUFBQSxJQUNYLE9BQU87QUFBQSxJQUNQLFFBQVE7QUFBQSxFQUNWLENBQUM7QUFFRCxRQUFNLDJCQUF1QiwyQkFBWSxDQUFDLFdBQStCO0FBQ3ZFLFVBQU0sT0FBTztBQUNiLFFBQUksQ0FBQyxRQUFRLE9BQU8sS0FBSyxZQUFZLFdBQVksUUFBTztBQUN4RCxVQUFNLE9BQU8sS0FBSyxRQUFxQix5Q0FBeUM7QUFDaEYsUUFBSSxDQUFDLEtBQU0sUUFBTztBQUNsQixRQUFJLENBQUMsYUFBYSxTQUFTLFNBQVMsSUFBSSxFQUFHLFFBQU87QUFDbEQsV0FBTztBQUFBLEVBQ1QsR0FBRyxDQUFDLENBQUM7QUFFTCxRQUFNLG9CQUFnQiwyQkFBWSxNQUFNO0FBQ3RDLGdCQUFZLFFBQVEsU0FBUztBQUM3QixnQkFBWSxRQUFRLFlBQVk7QUFDaEMsZ0JBQVksUUFBUSxRQUFRO0FBQzVCLGdCQUFZLFFBQVEsU0FBUztBQUFBLEVBQy9CLEdBQUcsQ0FBQyxDQUFDO0FBRUwsUUFBTSx3QkFBb0I7QUFBQSxJQUN4QixDQUFDLFVBQThDO0FBQzdDLFVBQUksTUFBTSxnQkFBZ0IsV0FBVyxNQUFNLFdBQVcsRUFBRztBQUN6RCxZQUFNLE9BQU8scUJBQXFCLE1BQU0sTUFBTTtBQUM5QyxVQUFJLENBQUMsS0FBTTtBQUNYLFlBQU0sU0FBUyxLQUFLLFFBQVEsVUFBVTtBQUN0QyxVQUFJLENBQUMsT0FBUTtBQUViLGtCQUFZLFFBQVEsU0FBUztBQUM3QixrQkFBWSxRQUFRLFlBQVksTUFBTTtBQUN0QyxrQkFBWSxRQUFRLFNBQVMsTUFBTTtBQUNuQyxrQkFBWSxRQUFRLFNBQVMsTUFBTTtBQUNuQyxrQkFBWSxRQUFRLFlBQVksS0FBSyxJQUFJO0FBQ3pDLGtCQUFZLFFBQVEsUUFBUTtBQUM1QixrQkFBWSxRQUFRLFNBQVM7QUFBQSxJQUMvQjtBQUFBLElBQ0EsQ0FBQyxvQkFBb0I7QUFBQSxFQUN2QjtBQUVBLFFBQU0sd0JBQW9CLDJCQUFZLENBQUMsVUFBOEM7QUFDbkYsVUFBTSxRQUFRLFlBQVk7QUFDMUIsUUFBSSxDQUFDLE1BQU0sVUFBVSxNQUFNLGNBQWMsTUFBTSxVQUFXO0FBQzFELFVBQU0sS0FBSyxLQUFLLElBQUksTUFBTSxVQUFVLE1BQU0sTUFBTTtBQUNoRCxVQUFNLEtBQUssS0FBSyxJQUFJLE1BQU0sVUFBVSxNQUFNLE1BQU07QUFDaEQsUUFBSSxLQUFLLGVBQWUsS0FBSyxhQUFhO0FBQ3hDLFlBQU0sUUFBUTtBQUFBLElBQ2hCO0FBQUEsRUFDRixHQUFHLENBQUMsQ0FBQztBQUVMLFFBQU0sc0JBQWtCO0FBQUEsSUFDdEIsQ0FBQyxVQUE4QztBQUM3QyxZQUFNLFFBQVEsWUFBWTtBQUMxQixVQUFJLENBQUMsTUFBTSxVQUFVLE1BQU0sY0FBYyxNQUFNLFVBQVc7QUFDMUQsWUFBTSxTQUFTLE1BQU07QUFDckIsWUFBTSxTQUFTLEtBQUssSUFBSSxJQUFJLE1BQU07QUFDbEMsWUFBTSxZQUFZLENBQUMsTUFBTSxTQUFTLFNBQVM7QUFDM0Msb0JBQWM7QUFDZCxVQUFJLGFBQWEsUUFBUTtBQUN2QixtQkFBVyxNQUFNO0FBQUEsTUFDbkI7QUFBQSxJQUNGO0FBQUEsSUFDQSxDQUFDLFlBQVksYUFBYTtBQUFBLEVBQzVCO0FBRUEsUUFBTSwyQkFBdUI7QUFBQSxJQUMzQixDQUFDLFVBQW1GO0FBQ2xGLFVBQUksQ0FBQyxxQkFBcUIsTUFBTSxNQUFNLEVBQUc7QUFDekMsWUFBTSxlQUFlO0FBQUEsSUFDdkI7QUFBQSxJQUNBLENBQUMsb0JBQW9CO0FBQUEsRUFDdkI7QUFFQSx5QkFBdUIsRUFBRSxjQUFjLGNBQWMsT0FBTyxxQkFBcUIsQ0FBQztBQUVsRixRQUFNLFdBQVcsTUFBTSxTQUFTO0FBQ2hDLFFBQU0sWUFBWSxDQUFDLGdCQUFnQixDQUFDO0FBRXBDLFFBQU0sVUFBVSxlQUNkLDZDQUFDLFNBQUksV0FBVSxlQUFlLHdCQUFhLElBQ3pDLFdBQ0YsTUFBTSxJQUFJLENBQUMsTUFBTSxVQUFVO0FBQ3pCLFVBQU0sTUFBTSxLQUFLLE1BQU0sS0FBSyxPQUFPLFNBQVMsS0FBSyxZQUFZLEtBQUs7QUFDbEUsVUFBTSxjQUFjLENBQUMsS0FBSyxZQUFZLENBQUMsQ0FBQyxLQUFLO0FBQzdDLFdBQ0UsNkNBQUMsU0FBYyxXQUFVLGlCQUN2QjtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0MsV0FBVztBQUFBLFVBQ1Q7QUFBQSxVQUNBLEtBQUssV0FBVywwQkFBMEI7QUFBQSxVQUMxQyxjQUFjLDZCQUE2QjtBQUFBLFFBQzdDO0FBQUEsUUFDQSxvQkFBa0IsS0FBSyxlQUFlO0FBQUEsUUFDdEMsY0FBWSxLQUFLLFNBQVMsT0FBTyxPQUFPLEtBQUssS0FBSyxJQUFJO0FBQUEsUUFDdEQsZ0JBQWMsY0FBYyxLQUFLLEtBQUs7QUFBQSxRQUN0QyxNQUFNLGNBQWMsV0FBVztBQUFBLFFBQy9CLFVBQVUsY0FBYyxJQUFJO0FBQUEsUUFDNUIsY0FBWSxjQUFlLEtBQUssWUFBWSxLQUFLLFFBQVEsYUFBYztBQUFBLFFBQ3ZFLFdBQVcsY0FDUCxDQUFDLFVBQVU7QUFDWCxjQUFJLE1BQU0sUUFBUSxXQUFXLE1BQU0sUUFBUSxLQUFLO0FBQzlDLGtCQUFNLGVBQWU7QUFDckIsdUJBQVcsS0FBSyxFQUFFO0FBQUEsVUFDcEI7QUFBQSxRQUNGLElBQ0U7QUFBQSxRQUVKO0FBQUEsd0RBQUMsU0FBSSxXQUFVLHNJQUNiO0FBQUEseURBQUMsU0FBSSxXQUFVLHlEQUF5RCxlQUFLLFVBQVUsTUFBSztBQUFBLFlBQzVGLDZDQUFDLFNBQUksV0FBVSxtRUFBbUUsZUFBSyxVQUFVLE9BQU07QUFBQSxZQUN2Ryw2Q0FBQyxTQUFJLFdBQVUsdUNBQXVDLGVBQUssVUFBVSxLQUFJO0FBQUEsYUFDM0U7QUFBQSxVQUNBLDhDQUFDLFNBQUksV0FBVSwyQ0FDYjtBQUFBLHlEQUFDLFNBQUksV0FBVSxpQkFBZ0IsaUJBQWUsS0FBSyxZQUFZLEtBQUssTUFBTyxlQUFLLE1BQUs7QUFBQSxZQUNyRiw2Q0FBQyxPQUFFLFdBQVUsc0JBQXFCLGlCQUFlLEtBQUssWUFBWSxLQUFLLGFBQWMsZUFBSyxlQUFlLFlBQVc7QUFBQSxhQUN0SDtBQUFBO0FBQUE7QUFBQSxJQUNGLEtBL0JRLEdBZ0NWO0FBQUEsRUFFSixDQUFDLElBQ0M7QUFFSixTQUNFO0FBQUEsSUFBQztBQUFBO0FBQUEsTUFDQyxJQUFHO0FBQUEsTUFDSCxLQUFLO0FBQUEsTUFDTCxXQUFXLFdBQVcsZ0JBQWdCLFlBQVksbUJBQW1CLEVBQUU7QUFBQSxNQUN2RSxtQkFBaUI7QUFBQSxNQUNqQixzQkFBc0I7QUFBQSxNQUN0QixzQkFBc0I7QUFBQSxNQUN0QixvQkFBb0I7QUFBQSxNQUNwQix3QkFBd0I7QUFBQSxNQUN4QixnQkFBZ0I7QUFBQSxNQUNoQixzQkFBc0I7QUFBQSxNQUN0QixlQUFlO0FBQUEsTUFDZixjQUFjO0FBQUEsTUFDZCxnQkFBZ0I7QUFBQSxNQUVmO0FBQUE7QUFBQSxFQUNIO0FBRUo7QUFFQSxJQUFNLHVCQUF1QixjQUFBQyxRQUFNLEtBQUssWUFBWTtBQUNwRCxxQkFBcUIsY0FBYztBQUVuQyxJQUFPLHVCQUFROzs7QUN4SlQsSUFBQUMsc0JBQUE7QUFoQk4sSUFBTSx3QkFBd0IsQ0FBQztBQUFBLEVBQzdCO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRixNQUFhO0FBQ1gsU0FDRSw4RUFDRTtBQUFBO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQyxJQUFHO0FBQUEsUUFDSCxXQUFVO0FBQUEsUUFDVixPQUFPLEVBQUUsU0FBUyxZQUFZLFNBQVMsT0FBTztBQUFBLFFBRTlDO0FBQUEsdURBQUMsU0FBSSxXQUFVLHNCQUFxQixTQUFRLGFBQVksTUFBSyxVQUFTLGNBQVksY0FDaEYsdURBQUMsWUFBTyxXQUFVLHVCQUFzQixJQUFHLE1BQUssSUFBRyxNQUFLLEdBQUUsS0FBSSxhQUFZLEtBQUksR0FDaEY7QUFBQSxVQUNDO0FBQUE7QUFBQTtBQUFBLElBQ0g7QUFBQSxJQUVDLGVBQ0MsOEVBQ0U7QUFBQTtBQUFBLFFBQUM7QUFBQTtBQUFBLFVBQ0MsT0FBTztBQUFBLFVBQ1A7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBO0FBQUEsTUFDRjtBQUFBLE1BRUE7QUFBQSxRQUFDO0FBQUE7QUFBQSxVQUNDO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBLFNBQVM7QUFBQSxVQUNUO0FBQUEsVUFDQSxRQUFRO0FBQUE7QUFBQSxNQUNWO0FBQUEsT0FDRjtBQUFBLEtBRUo7QUFFSjtBQUVBLElBQU8sZ0NBQVE7OztBQzdFZixJQUFBQyxnQkFBNkc7QUE0QjdHLElBQU0sVUFBVSxDQUFDLEdBQWdCLE1BQW1CLENBQUMsRUFBRSxLQUFLLEtBQUssRUFBRSxRQUFRLE1BQU0sRUFBRSxRQUFRO0FBR3BGLElBQU0sMkJBQTJCLENBQUM7QUFBQSxFQUN2QztBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBLFlBQUFDO0FBQUEsRUFDQSxPQUFBQztBQUFBLEVBQ0EsVUFBQUM7QUFBQSxFQUNBLGtCQUFBQztBQUNGLE1BQVk7QUFDVixRQUFNLGVBQVcsdUJBQVEsTUFBTTtBQUM3QixVQUFNLFdBQVcsSUFBSSxLQUFLLGFBQWEsY0FBYyxDQUFDO0FBQ3RELFVBQU0sY0FBYyxJQUFJLEtBQUssYUFBYSxlQUFlLEdBQUcsQ0FBQyxFQUFFLFFBQVE7QUFDdkUsVUFBTSxVQUFVLFNBQVMsT0FBTyxJQUFJLEtBQUs7QUFDekMsVUFBTSxRQUF3QixDQUFDO0FBQy9CLGFBQVMsSUFBSSxHQUFHLElBQUksUUFBUSxLQUFLO0FBQy9CLFlBQU0sS0FBSyxFQUFFLE1BQU0sTUFBTSxLQUFLLElBQUksU0FBUyxLQUFLLENBQUM7QUFBQSxJQUNuRDtBQUNBLGFBQVMsSUFBSSxHQUFHLEtBQUssYUFBYSxLQUFLO0FBQ3JDLFlBQU0sVUFBVSxJQUFJLEtBQUssYUFBYSxjQUFjLENBQUM7QUFDckQsWUFBTSxLQUFLLEVBQUUsTUFBTSxTQUFTLEtBQUtGLE9BQU0sT0FBTyxHQUFHLFNBQVMsTUFBTSxDQUFDO0FBQUEsSUFDbkU7QUFDQSxXQUFPO0FBQUEsTUFDTDtBQUFBLE1BQ0EsT0FBT0Usa0JBQWlCLFVBQVUsTUFBTTtBQUFBLElBQzFDO0FBQUEsRUFDRixHQUFHLENBQUMsY0FBYyxhQUFhQSxtQkFBa0IsUUFBUUYsTUFBSyxDQUFDO0FBRS9ELFFBQU0sYUFBYSxZQUFZLGtCQUFrQixRQUFRLFlBQVk7QUFFckUsUUFBTSxzQkFBa0I7QUFBQSxJQUN0QixDQUFDLFVBQThDO0FBQzdDLFlBQU0sZ0JBQWdCO0FBQ3RCLHNCQUFnQixDQUFDLFNBQVM7QUFDeEIsY0FBTSxPQUFPLE9BQU87QUFDcEIsWUFBSSxPQUFPLEdBQUc7QUFDWix5QkFBZSxDQUFDLFNBQVMsT0FBTyxDQUFDO0FBQ2pDLGlCQUFPO0FBQUEsUUFDVDtBQUNBLGVBQU87QUFBQSxNQUNULENBQUM7QUFBQSxJQUNIO0FBQUEsSUFDQSxDQUFDLGlCQUFpQixjQUFjO0FBQUEsRUFDbEM7QUFFQSxRQUFNLHNCQUFrQjtBQUFBLElBQ3RCLENBQUMsVUFBOEM7QUFDN0MsWUFBTSxnQkFBZ0I7QUFDdEIsc0JBQWdCLENBQUMsU0FBUztBQUN4QixjQUFNLE9BQU8sT0FBTztBQUNwQixZQUFJLE9BQU8sSUFBSTtBQUNiLHlCQUFlLENBQUMsU0FBUyxPQUFPLENBQUM7QUFDakMsaUJBQU87QUFBQSxRQUNUO0FBQ0EsZUFBTztBQUFBLE1BQ1QsQ0FBQztBQUFBLElBQ0g7QUFBQSxJQUNBLENBQUMsaUJBQWlCLGNBQWM7QUFBQSxFQUNsQztBQUVBLFFBQU0sMkJBQXVCLDJCQUFZLE1BQU07QUFDN0MsaUJBQWEsSUFBSTtBQUFBLEVBQ25CLEdBQUcsQ0FBQyxZQUFZLENBQUM7QUFFakIsUUFBTSwyQkFBdUI7QUFBQSxJQUMzQixDQUFDLFNBQStCO0FBQzlCLFVBQUksQ0FBQyxLQUFLLEtBQU07QUFDaEIsTUFBQUQsWUFBVyxZQUFZLEVBQUUsTUFBTSxLQUFLLE9BQU8sSUFBSSxVQUFVLENBQUMsQ0FBQyxLQUFLLFNBQVMsQ0FBQztBQUMxRSxtQkFBYSxLQUFLLElBQUk7QUFBQSxJQUN4QjtBQUFBLElBQ0EsQ0FBQyxjQUFjQSxXQUFVO0FBQUEsRUFDM0I7QUFFQSxRQUFNLDJCQUF1QjtBQUFBLElBQzNCLENBQUMsU0FBK0I7QUFDOUIsVUFBSSxDQUFDLEtBQUssS0FBTTtBQUNoQixVQUFJLGtCQUFrQixTQUFTLFdBQVc7QUFDeEMscUJBQWEsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDO0FBQUEsTUFDbEM7QUFBQSxJQUNGO0FBQUEsSUFDQSxDQUFDLGVBQWUsY0FBYyxTQUFTO0FBQUEsRUFDekM7QUFFQSxRQUFNLHFCQUFpQix1QkFBZ0MsTUFBTTtBQUMzRCxXQUFPLFNBQVMsTUFBTSxJQUFJLENBQUMsTUFBTSxRQUFRO0FBQ3ZDLFVBQUksS0FBSyxTQUFTO0FBQ2hCLGVBQU8sRUFBRSxLQUFLLFNBQVMsR0FBRyxJQUFJLFNBQVMsS0FBSztBQUFBLE1BQzlDO0FBRUEsWUFBTSxVQUFVLEtBQUs7QUFDckIsWUFBTSxVQUFVLFFBQVEsU0FBUyxTQUFTO0FBQzFDLFlBQU0sUUFBUSxRQUFRLFNBQVMsT0FBTztBQUN0QyxZQUFNLFVBQVUsYUFBYSxjQUFjRSxVQUFTLFdBQVcsT0FBTyxLQUFLQSxVQUFTLFNBQVMsVUFBVTtBQUN2RyxZQUFNLGFBQWEsYUFBYSxDQUFDLFdBQVcsYUFBYUEsVUFBUyxXQUFXLE9BQU8sS0FBS0EsVUFBUyxTQUFTLFNBQVM7QUFDcEgsWUFBTSxXQUFXLGtCQUFrQixTQUFTLENBQUMsQ0FBQyxhQUFhQSxVQUFTLFNBQVMsU0FBUztBQUN0RixZQUFNLFVBQVUsUUFBUSxTQUFTLG9CQUFJLEtBQUssQ0FBQztBQUUzQyxZQUFNLFdBQVc7QUFBQSxRQUNmO0FBQUEsUUFDQSxVQUFVLHNCQUFzQjtBQUFBLFFBQ2hDLFFBQVEsa0JBQWtCO0FBQUEsUUFDMUIsVUFBVSxhQUFhO0FBQUEsUUFDdkIsYUFBYSxnQkFBZ0I7QUFBQSxRQUM3QixXQUFXLGFBQWE7QUFBQSxRQUN4QixVQUFVLFVBQVU7QUFBQSxNQUN0QjtBQUVBLGFBQU87QUFBQSxRQUNMLEtBQUssS0FBSztBQUFBLFFBQ1YsU0FBUztBQUFBLFFBQ1QsTUFBTTtBQUFBLFFBQ04sS0FBSyxLQUFLO0FBQUEsUUFDVixVQUFVLFFBQVEsUUFBUTtBQUFBLFFBQzFCO0FBQUEsUUFDQTtBQUFBLE1BQ0Y7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNILEdBQUcsQ0FBQyxTQUFTLE9BQU8sU0FBUyxXQUFXQSxXQUFVLFlBQVksZUFBZSxTQUFTLENBQUM7QUFFdkYsU0FBTztBQUFBLElBQ0wsZUFBZSxTQUFTO0FBQUEsSUFDeEI7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0Y7QUFDRjs7O0FDdEtBLElBQUFFLGdCQUFvRztBQWtDN0YsSUFBTSwwQkFBMEIsQ0FBQztBQUFBLEVBQ3RDO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0EsZ0JBQUFDO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRixNQUFZO0FBQ1YsUUFBTSxtQkFBZTtBQUFBLElBQ25CLENBQUMsWUFBMkI7QUFDMUIsVUFBSSxDQUFDLG9CQUFvQixFQUFHO0FBQzVCLFVBQUksQ0FBQyxhQUFhLENBQUMsUUFBUztBQUU1QixZQUFNLGFBQWFBLGdCQUFlLGVBQWUsV0FBVztBQUM1RCxZQUFNLE9BQU8sU0FBUyxRQUFRO0FBQzlCLFlBQU0sWUFBWSxHQUFHLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxJQUFJLGVBQWUsSUFBSSxrQkFBa0IsSUFBSSxJQUFJO0FBRXRHLFVBQUksU0FBUyxTQUFTLGlCQUFpQixZQUFZLFdBQVc7QUFDNUQsdUJBQWUsTUFBTTtBQUFBLFVBQ25CLFVBQVUsV0FBVztBQUFBLFVBQ3JCLFFBQVEsV0FBVztBQUFBLFVBQ25CLFlBQVk7QUFBQSxVQUNaLGVBQWU7QUFBQSxRQUNqQixDQUFDO0FBQUEsTUFDSDtBQUVBLHlCQUFtQixLQUFLO0FBQ3hCLFVBQUksU0FBUyxZQUFZO0FBQ3ZCLGtCQUFVLEtBQUs7QUFDZix1QkFBZSxLQUFLO0FBQUEsTUFDdEI7QUFBQSxJQUNGO0FBQUEsSUFDQTtBQUFBLE1BQ0U7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0FBO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFFQSxRQUFNLGtCQUFjO0FBQUEsSUFDbEIsQ0FBQyxVQUEyQjtBQUMxQix1QkFBaUIsS0FBSztBQUN0Qix1QkFBaUI7QUFDakIsc0JBQWdCO0FBQUEsSUFDbEI7QUFBQSxJQUNBLENBQUMsa0JBQWtCLGtCQUFrQixlQUFlO0FBQUEsRUFDdEQ7QUFFQSxRQUFNLHlCQUFxQiwyQkFBWSxNQUFNO0FBQzNDLHdCQUFvQjtBQUNwQixxQkFBaUI7QUFDakIsb0JBQWdCO0FBQ2hCLGNBQVUsS0FBSztBQUNmLG1CQUFlLElBQUk7QUFBQSxFQUNyQixHQUFHLENBQUMsa0JBQWtCLGlCQUFpQixxQkFBcUIsV0FBVyxjQUFjLENBQUM7QUFFdEYsU0FBTztBQUFBLElBQ0w7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0Y7QUFDRjs7O0FDcEhBLElBQUFDLGdCQUE4RDtBQThCdkQsSUFBTSx3QkFBd0IsQ0FBQztBQUFBLEVBQ3BDO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0EsWUFBQUM7QUFDRixNQUFZO0FBQ1YsK0JBQVUsTUFBTTtBQUNkLElBQUFBLFlBQVcsUUFBUSxFQUFFLGlCQUFpQixjQUFjLENBQUM7QUFBQSxFQUN2RCxHQUFHLENBQUMsaUJBQWlCLGVBQWVBLFdBQVUsQ0FBQztBQUUvQywrQkFBVSxNQUFNO0FBQ2QsUUFBSSxDQUFDLFlBQWE7QUFDbEIsUUFBSSxpQkFBaUIsUUFBUztBQUM5QixxQkFBaUIsVUFBVTtBQUUzQixVQUFNLG9CQUFvQixDQUFDLGFBQW1EO0FBQUEsTUFDNUUsR0FBRztBQUFBLE1BQ0gsVUFBVTtBQUFBLFFBQ1IsR0FBRyxRQUFRO0FBQUEsUUFDWCxlQUFlLDRCQUE0QixRQUFRLFNBQVMsYUFBYTtBQUFBLE1BQzNFO0FBQUEsSUFDRjtBQUVBLFVBQU0sU0FBUyxrQkFBa0IsSUFBSSxpQkFBaUIsSUFBSTtBQUMxRCxRQUFJLFVBQVUsT0FBTyxZQUFZLE9BQU8sUUFBUTtBQUM5QyxNQUFBQSxZQUFXLGlCQUFpQixNQUFNO0FBQ2xDLFlBQU0sZ0JBQWdCLGtCQUFrQixNQUFNO0FBQzlDLFVBQUksZUFBZTtBQUNqQixjQUFNLGtCQUFrQixrQkFBa0IsYUFBYTtBQUN2RCwrQkFBdUIsVUFBVTtBQUNqQyx1QkFBZSxnQkFBZ0IsTUFBTSxnQkFBZ0IsUUFBUTtBQUM3RCx1QkFBZSxLQUFLO0FBQ3BCLGtCQUFVLEtBQUs7QUFDZiw2QkFBcUIsVUFBVTtBQUMvQjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBRUEsVUFBTSxpQkFBaUIsMkJBQTJCO0FBQ2xELFFBQUksZ0JBQWdCO0FBQ2xCLFlBQU0sa0JBQWtCLGtCQUFrQixjQUFjO0FBQ3hELDZCQUF1QixVQUFVO0FBQ2pDLHFCQUFlLGdCQUFnQixNQUFNLGdCQUFnQixRQUFRO0FBQzdELHFCQUFlLEtBQUs7QUFDcEIsZ0JBQVUsS0FBSztBQUNmLDJCQUFxQixVQUFVO0FBQy9CO0FBQUEsSUFDRjtBQUVBLHdCQUFvQjtBQUNwQixxQkFBaUI7QUFDakIsb0JBQWdCO0FBQ2hCLG1CQUFlLElBQUk7QUFDbkIsY0FBVSxLQUFLO0FBQUEsRUFDakIsR0FBRztBQUFBLElBQ0Q7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0FBO0FBQUEsRUFDRixDQUFDO0FBQ0g7OztBQ3BIQSxJQUFBQyxnQkFBd0I7QUFHeEIsSUFBTSxpQkFBaUIsQ0FBQyxPQUFlLFdBQW1CO0FBQ3hELE1BQUksQ0FBQyxNQUFPLFFBQU87QUFDbkIsUUFBTSxVQUFVLE1BQU0sS0FBSztBQUMzQixNQUFJLENBQUMsUUFBUyxRQUFPO0FBQ3JCLFFBQU0sUUFBUSxRQUFRLGtCQUFrQixNQUFNO0FBQzlDLFNBQU8sTUFBTSxDQUFDLEVBQUUsa0JBQWtCLE1BQU0sSUFBSSxNQUFNLE1BQU0sQ0FBQztBQUMzRDtBQUdPLElBQU0sbUJBQW1CLENBQUMsV0FBbUI7QUFDbEQsUUFBTSxZQUFZLGVBQWUsS0FBSyxnQkFBZ0IsTUFBTSxHQUFHLE1BQU07QUFDckUsUUFBTSxVQUFVLGVBQWUsS0FBSyxjQUFjLElBQUksR0FBRyxNQUFNO0FBQy9ELFFBQU0sbUJBQW1CLEtBQUssd0JBQXdCLE1BQU07QUFDNUQsUUFBTSxrQkFBa0IsS0FBSyx1QkFBdUIsUUFBUTtBQUM1RCxRQUFNLG1CQUFtQixLQUFLLHdCQUF3QixTQUFTO0FBQy9ELFFBQU0sbUJBQW1CLEtBQUssd0JBQXdCLFNBQVM7QUFDL0QsUUFBTSxpQkFBaUIsS0FBSyxzQkFBc0IsT0FBTztBQUN6RCxRQUFNLGdCQUFnQixLQUFLLHFCQUFxQixVQUFVO0FBQzFELFFBQU0sZ0JBQWdCLEtBQUsscUJBQXFCLE1BQU07QUFDdEQsUUFBTSxnQkFBZ0IsS0FBSyxxQkFBcUIsTUFBTTtBQUV0RCxRQUFNLG9CQUFnQjtBQUFBLElBQ3BCLE1BQU07QUFBQSxNQUNKLEtBQUssbUJBQW1CLEtBQUs7QUFBQSxNQUM3QixLQUFLLG1CQUFtQixLQUFLO0FBQUEsTUFDN0IsS0FBSyxtQkFBbUIsS0FBSztBQUFBLE1BQzdCLEtBQUssbUJBQW1CLEtBQUs7QUFBQSxNQUM3QixLQUFLLG1CQUFtQixLQUFLO0FBQUEsTUFDN0IsS0FBSyxtQkFBbUIsS0FBSztBQUFBLE1BQzdCLEtBQUssbUJBQW1CLEtBQUs7QUFBQSxJQUMvQjtBQUFBLElBQ0EsQ0FBQztBQUFBLEVBQ0g7QUFFQSxRQUFNLG1CQUFlO0FBQUEsSUFDbkIsTUFBTTtBQUFBLE1BQ0osRUFBRSxJQUFJLFVBQW1CLE9BQU8saUJBQWlCO0FBQUEsTUFDakQsRUFBRSxJQUFJLFVBQW1CLE9BQU8sZ0JBQWdCO0FBQUEsTUFDaEQsRUFBRSxJQUFJLFdBQW9CLE9BQU8saUJBQWlCO0FBQUEsTUFDbEQsRUFBRSxJQUFJLFdBQW9CLE9BQU8saUJBQWlCO0FBQUEsSUFDcEQ7QUFBQSxJQUNBLENBQUMsa0JBQWtCLGlCQUFpQixrQkFBa0IsZ0JBQWdCO0FBQUEsRUFDeEU7QUFFQSxRQUFNLHVCQUFtQjtBQUFBLElBQ3ZCLE9BQU87QUFBQSxNQUNMLE9BQU87QUFBQSxNQUNQLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxJQUNSO0FBQUEsSUFDQSxDQUFDLGdCQUFnQixlQUFlLGVBQWUsYUFBYTtBQUFBLEVBQzlEO0FBRUEsU0FBTztBQUFBLElBQ0w7QUFBQSxJQUNBO0FBQUEsSUFDQSxhQUFhO0FBQUEsSUFDYixXQUFXO0FBQUEsSUFDWCxhQUFhLEtBQUssdUJBQXVCLE1BQU07QUFBQSxJQUMvQyxjQUFjLEtBQUssbUJBQW1CLFVBQVU7QUFBQSxJQUNoRCxpQkFBaUIsS0FBSyxzQkFBc0IsYUFBYTtBQUFBLElBQ3pELGdCQUFnQixLQUFLLHFCQUFxQixnQkFBZ0I7QUFBQSxJQUMxRCxnQkFBZ0IsS0FBSyxxQkFBcUIsWUFBWTtBQUFBLElBQ3RELHdCQUF3QixLQUFLLDhCQUE4QixtQkFBbUI7QUFBQSxJQUM5RSxzQkFBc0IsS0FBSyw0QkFBNEIsaUJBQWlCO0FBQUEsSUFDeEUsWUFBWSxLQUFLLHdCQUF3QixPQUFPO0FBQUEsSUFDaEQsWUFBWSxLQUFLLHdCQUF3QixPQUFPO0FBQUEsSUFDaEQsYUFBYSxLQUFLLHlCQUF5QixTQUFTO0FBQUEsSUFDcEQsWUFBWSxLQUFLLHdCQUF3QixPQUFPO0FBQUEsSUFDaEQsZUFBZSxLQUFLLDRCQUE0QixxQkFBcUI7QUFBQSxJQUNyRSxtQkFBbUIsS0FBSyw2QkFBNkIsa0JBQWtCO0FBQUEsSUFDdkUsbUJBQW1CLEtBQUssZ0NBQWdDLHVCQUF1QjtBQUFBLElBQy9FLGNBQWMsS0FBSyxtQkFBbUIsU0FBUztBQUFBLElBQy9DLHNCQUFzQixLQUFLLHlCQUF5Qix5QkFBeUI7QUFBQSxJQUM3RSxhQUFhLEtBQUssaUJBQWlCLFFBQVE7QUFBQSxJQUMzQztBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRjtBQUNGOzs7QUNuRkEsSUFBQUMsZ0JBQTRCO0FBa0JyQixJQUFNLHVCQUF1QixDQUFDO0FBQUEsRUFDbkM7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRixNQUFZO0FBQ1YsYUFBTztBQUFBLElBQ0wsQ0FBQyxXQUFtQjtBQUNsQixVQUFJLENBQUMsZ0JBQWdCO0FBQ25CLG9CQUFZO0FBQ1o7QUFBQSxNQUNGO0FBQ0EsaUJBQVcsTUFBTTtBQUNmLHlCQUFpQjtBQUFBLFVBQ2YsVUFBVSxpQkFBaUI7QUFBQSxVQUMzQixRQUFRLGVBQWU7QUFBQSxVQUN2QixNQUFNO0FBQUEsVUFDTixlQUFlLGdCQUFnQixTQUFTO0FBQUEsVUFDeEMsWUFBWSxnQkFBZ0IsUUFBUTtBQUFBLFVBQ3BDO0FBQUEsVUFDQTtBQUFBLFFBQ0YsQ0FBQztBQUNELGNBQU0sU0FBUyxtQkFBbUIsTUFBTTtBQUN4QyxlQUFPLFNBQVMsT0FBTyxvQkFBb0IsTUFBTTtBQUFBLE1BQ25ELEdBQUcsVUFBVTtBQUFBLElBQ2Y7QUFBQSxJQUNBO0FBQUEsTUFDRTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0Y7OztBQy9EQyxJQUFBQyxnQkFBaUM7QUEwQjNCLElBQU0sMEJBQTBCLENBQUM7QUFBQSxFQUN0QztBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0EsWUFBQUM7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRixNQUFtQztBQUNqQywrQkFBVSxNQUFNO0FBQ2QsOEJBQTBCLHNCQUFzQjtBQUFBLEVBQ2xELEdBQUcsQ0FBQyxDQUFDO0FBR0wsK0JBQVUsTUFBTTtBQUNkLFFBQUksQ0FBQyxPQUFRO0FBRWIsVUFBTSxnQkFBZ0IsQ0FBQyxVQUFzQjtBQUMzQyxZQUFNLFNBQVMsTUFBTTtBQUNyQixVQUFJLENBQUMsT0FBUTtBQUNiLFVBQUksV0FBVyxTQUFTLFNBQVMsTUFBTSxFQUFHO0FBQzFDLFVBQUksYUFBYSxTQUFTLFNBQVMsTUFBTSxFQUFHO0FBQzVDLE1BQUFBLFlBQVcsc0JBQXNCO0FBQ2pDLGdCQUFVLEtBQUs7QUFDZixtQkFBYSxJQUFJO0FBQUEsSUFDbkI7QUFFQSxhQUFTLGlCQUFpQixhQUFhLGFBQWE7QUFDcEQsV0FBTyxNQUFNLFNBQVMsb0JBQW9CLGFBQWEsYUFBYTtBQUFBLEVBQ3RFLEdBQUcsQ0FBQyxjQUFjLFFBQVFBLGFBQVksWUFBWSxjQUFjLFNBQVMsQ0FBQztBQUcxRSwrQkFBVSxNQUFNO0FBQ2QsVUFBTSxhQUFhLE1BQU07QUFDdkIsVUFBSSxDQUFDLFlBQWE7QUFDbEIsVUFBSSxxQkFBcUIsUUFBUztBQUNsQyxVQUFJLGtCQUFrQixHQUFHO0FBQ3ZCLGNBQU0sU0FBUyxpQkFBaUI7QUFDaEMsY0FBTSxnQkFBZ0Isa0JBQWtCLE1BQU07QUFDOUMsWUFBSSxlQUFlO0FBQ2pCLGdCQUFNLGtCQUFrQjtBQUFBLFlBQ3RCLEdBQUc7QUFBQSxZQUNILFVBQVU7QUFBQSxjQUNSLEdBQUcsY0FBYztBQUFBLGNBQ2pCLGVBQWUsNEJBQTRCLGNBQWMsU0FBUyxhQUFhO0FBQUEsWUFDakY7QUFBQSxVQUNGO0FBQ0EsaUNBQXVCLFVBQVU7QUFDakMseUJBQWUsZ0JBQWdCLE1BQU0sZ0JBQWdCLFFBQVE7QUFDN0QseUJBQWUsS0FBSztBQUNwQixvQkFBVSxLQUFLO0FBQ2YsK0JBQXFCLFVBQVU7QUFBQSxRQUNqQztBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBRUEsV0FBTyxpQkFBaUIsWUFBWSxVQUFVO0FBQzlDLFdBQU8sTUFBTSxPQUFPLG9CQUFvQixZQUFZLFVBQVU7QUFBQSxFQUNoRSxHQUFHO0FBQUEsSUFDRDtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0YsQ0FBQztBQUdELCtCQUFVLE1BQU07QUFDZCxVQUFNLGtCQUFrQixNQUFNO0FBQzVCLHFCQUFlLENBQUMsU0FBUztBQUN2QixjQUFNLE9BQU8sQ0FBQztBQUNkLFlBQUksQ0FBQyxNQUFNO0FBQ1Qsb0JBQVUsS0FBSztBQUFBLFFBQ2pCLE9BQU87QUFDTCxpQkFBTyxTQUFTLEVBQUUsS0FBSyxHQUFHLFVBQVUsU0FBUyxDQUFDO0FBQUEsUUFDaEQ7QUFDQSxlQUFPO0FBQUEsTUFDVCxDQUFDO0FBQUEsSUFDSDtBQUVBLFVBQU0sWUFBWSxNQUFNO0FBQ3RCLFVBQUksQ0FBQyxZQUFhO0FBQ2xCLG1CQUFhLEVBQUUsTUFBTSxhQUFhLE9BQU8sTUFBTSxZQUFZLEtBQUssQ0FBQztBQUFBLElBQ25FO0FBRUEsV0FBTyxpQkFBaUIseUJBQXlCLGVBQWU7QUFDaEUsV0FBTyxpQkFBaUIsbUJBQW1CLFNBQVM7QUFFcEQsV0FBTyxNQUFNO0FBQ1gsYUFBTyxvQkFBb0IseUJBQXlCLGVBQWU7QUFDbkUsYUFBTyxvQkFBb0IsbUJBQW1CLFNBQVM7QUFBQSxJQUN6RDtBQUFBLEVBQ0YsR0FBRyxDQUFDLGNBQWMsYUFBYSxhQUFhLFdBQVcsY0FBYyxDQUFDO0FBQ3hFOzs7QUN0SUEsSUFBQUMsZ0JBQThEO0FBVXZELElBQU0sMkJBQTJCLENBQUMsRUFBRSxXQUFXLFNBQVMsZUFBZSxpQkFBaUIsTUFBWTtBQUN6RywrQkFBVSxNQUFNO0FBQ2QsUUFBSSxhQUFhLENBQUMsV0FBVyxrQkFBa0IsU0FBUztBQUN0RCx1QkFBaUIsS0FBSztBQUN0QjtBQUFBLElBQ0Y7QUFDQSxRQUFJLENBQUMsYUFBYSxrQkFBa0IsU0FBUztBQUMzQyx1QkFBaUIsT0FBTztBQUFBLElBQzFCO0FBQUEsRUFDRixHQUFHLENBQUMsV0FBVyxTQUFTLGVBQWUsZ0JBQWdCLENBQUM7QUFDMUQ7OztBQ3BCQyxJQUFBQyxpQkFBdUM7QUFlakMsSUFBTSwwQkFBMEIsQ0FBQztBQUFBLEVBQ3RDO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBLFlBQUFDO0FBQUEsRUFDQSxhQUFBQztBQUFBLEVBQ0EsaUJBQUFDO0FBQ0YsTUFBbUM7QUFDakMsUUFBTSxxQkFBaUIsdUJBQU8sQ0FBQztBQUUvQixRQUFNLG9CQUFnQyx3QkFBUSxNQUFNO0FBQ2xELFdBQU8sTUFBTSxJQUFJLENBQUMsVUFBVTtBQUMxQixZQUFNLGtCQUFrQixNQUFNLGVBQWUsTUFBTSxlQUFlLElBQUksU0FBUyxFQUFFLEtBQUs7QUFDdEYsWUFBTSxjQUFjLGtCQUFrQjtBQUN0QyxZQUFNLFdBQVcsTUFBTSxTQUFTLE1BQU0sU0FBUztBQUMvQyxZQUFNLFFBQVEsWUFBWSxDQUFDLE9BQU8sTUFBTSxPQUFPLFFBQVEsQ0FBQyxJQUFJLE9BQU8sUUFBUSxJQUFJO0FBQy9FLFVBQUksU0FBUyxnQkFBZ0IsUUFBUSxNQUFNLFNBQVMsSUFBSTtBQUV4RCxVQUFJLGVBQWUsVUFBVSxHQUFHO0FBQzlCLFFBQUFGLFlBQVcsaUJBQWlCLEVBQUUsYUFBYSxVQUFVLE1BQU0sQ0FBQztBQUM1RCx1QkFBZSxXQUFXO0FBQUEsTUFDNUI7QUFFQSxZQUFNLFdBQVcsTUFBTSxRQUFRLE1BQU0sUUFBUSxJQUFJLFNBQVMsRUFBRSxLQUFLO0FBQ2pFLFlBQU0sV0FBV0MsYUFBWSxTQUFTLE1BQU07QUFDNUMsWUFBTSxTQUFTLE1BQU0sYUFBYSxNQUFNLGFBQWEsSUFBSSxTQUFTO0FBQ2xFLFlBQU0sV0FBVyxNQUFNLGVBQWUsTUFBTSxlQUFlLElBQUksU0FBUyxFQUFFLEtBQUs7QUFDL0UsWUFBTSxXQUFXO0FBRWpCLFlBQU0sZUFBZSxDQUFDLFdBQVcsQ0FBQztBQUNsQyxVQUFJLGNBQWM7QUFDaEIsaUJBQVM7QUFBQSxNQUNYO0FBRUEsYUFBTztBQUFBLFFBQ0wsSUFBSTtBQUFBLFFBQ0o7QUFBQSxRQUNBO0FBQUEsUUFDQSxNQUFNO0FBQUEsUUFDTixhQUFhLFlBQVk7QUFBQSxRQUN6QjtBQUFBLFFBQ0E7QUFBQSxRQUNBLFdBQVdDLGlCQUFnQixPQUFPLE1BQU07QUFBQSxRQUN4QyxVQUFVO0FBQUEsTUFDWjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0gsR0FBRyxDQUFDQSxrQkFBaUIsT0FBTyxRQUFRRixhQUFZLFlBQVlDLFlBQVcsQ0FBQztBQUV4RSxTQUFPLEVBQUUsY0FBYztBQUN6Qjs7O0FDaEVBLElBQUFFLGlCQUFxQztBQW9CckMsSUFBTSxXQUFXO0FBQ2pCLElBQU0sY0FBYztBQUdiLElBQU0seUJBQXlCLENBQUM7QUFBQSxFQUNyQztBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0YsTUFBWTtBQUNWLFFBQU07QUFBQSxJQUNKO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRixJQUFJLHdCQUF3QjtBQUFBLElBQzFCO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQSxTQUFTO0FBQUEsSUFDVCxZQUFZO0FBQUEsSUFDWixnQkFBZ0IsT0FBTyxXQUFXLGNBQWMsT0FBTyw4QkFBOEI7QUFBQSxJQUNyRixhQUFhO0FBQUEsSUFDYjtBQUFBLEVBQ0YsQ0FBQztBQUVELFFBQU0sd0JBQW9CLHdCQUFRLE1BQU07QUFDdEMsV0FBTyx1Q0FBdUMsY0FBYyxRQUFRO0FBQUEsRUFDdEUsR0FBRyxDQUFDLFVBQVUsWUFBWSxDQUFDO0FBRTNCLFFBQU0sc0NBQWtDLHdCQUFRLE1BQU07QUFDcEQsV0FBTywyQkFBMkIsaUJBQWlCO0FBQUEsRUFDckQsR0FBRyxDQUFDLGlCQUFpQixDQUFDO0FBRXRCLFFBQU0sNkJBQXlCLHdCQUFRLE1BQU07QUFDM0MsV0FBTyxxQkFBcUIsOEJBQThCLG1CQUFtQixRQUFRO0FBQUEsRUFDdkYsR0FBRyxDQUFDLFVBQVUsbUJBQW1CLGlCQUFpQixDQUFDO0FBRW5ELFFBQU0sdUJBQW1CLHdCQUFRLE1BQU07QUFDckMsV0FBTyxzQ0FBc0M7QUFBQSxNQUMzQztBQUFBLE1BQ0EsaUJBQWlCO0FBQUEsTUFDakIsT0FBTztBQUFBLE1BQ1A7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNILEdBQUcsQ0FBQyxVQUFVLHdCQUF3Qix1QkFBdUIsaUJBQWlCLENBQUM7QUFFL0UsUUFBTSxvQ0FBZ0M7QUFBQSxJQUNwQyxDQUFDLDJCQUFvQztBQUNuQyxhQUFPLHFDQUFxQztBQUFBLFFBQzFDLHVCQUF1QiwwQkFBMEI7QUFBQSxRQUNqRCxpQkFBaUI7QUFBQSxRQUNqQixPQUFPO0FBQUEsUUFDUDtBQUFBLE1BQ0YsQ0FBQztBQUFBLElBQ0g7QUFBQSxJQUNBLENBQUMsVUFBVSx3QkFBd0IsdUJBQXVCLGlCQUFpQjtBQUFBLEVBQzdFO0FBRUEsUUFBTSxxQ0FBaUMsd0JBQVEsTUFBTTtBQUNuRCxXQUFPLDhCQUE4QixxQkFBcUI7QUFBQSxFQUM1RCxHQUFHLENBQUMsK0JBQStCLHFCQUFxQixDQUFDO0FBRXpELFFBQU0sb0JBQWdCLHdCQUFRLE1BQU07QUFDbEMsV0FBTyx1QkFBdUIsaUNBQWlDLDhCQUE4QjtBQUFBLEVBQy9GLEdBQUcsQ0FBQyxnQ0FBZ0MsK0JBQStCLENBQUM7QUFFcEUsU0FBTztBQUFBLElBQ0w7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQSxxQkFBcUIsQ0FBQyxxQkFBcUIsdUJBQXVCLENBQUM7QUFBQSxJQUNuRTtBQUFBLElBQ0EsbUJBQW1CLGdCQUFnQiw2QkFBNkIsYUFBYSxJQUFJO0FBQUEsSUFDakY7QUFBQSxJQUNBO0FBQUEsRUFDRjtBQUNGOzs7QUN0R0EsSUFBQUMsaUJBQXlEO0FBMENsRCxJQUFNLHVCQUF1QixDQUFDO0FBQUEsRUFDbkM7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0EscUJBQXFCO0FBQUEsRUFDckI7QUFBQSxFQUNBLGVBQWU7QUFBQSxFQUNmLGdCQUFBQztBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0YsTUFBZ0M7QUFDOUIsUUFBTSxDQUFDLE9BQU8sUUFBUSxRQUFJLHlCQUFnQyxDQUFDLENBQUM7QUFDNUQsUUFBTSxDQUFDLE9BQU8sUUFBUSxRQUFJLHlCQUFTLENBQUM7QUFDcEMsUUFBTSxDQUFDLGFBQWEsY0FBYyxRQUFJLHlCQUFTLENBQUM7QUFDaEQsUUFBTSxDQUFDLFdBQVcsWUFBWSxRQUFJLHlCQUFTLEtBQUs7QUFDaEQsUUFBTSxDQUFDLGNBQWMsZUFBZSxRQUFJLHlCQUFTLEVBQUU7QUFFbkQsUUFBTSw2QkFBeUIsdUJBQU8sS0FBSztBQUMzQyxRQUFNLHFCQUFpQix1QkFBK0IsSUFBSTtBQUMxRCxRQUFNLHlCQUFxQix1QkFBTyxDQUFDO0FBQ25DLFFBQU0sb0JBQWdCLHVCQUFzQixJQUFJO0FBQ2hELFFBQU0sdUJBQW1CLHVCQUFPLEVBQUU7QUFFbEMsUUFBTSxzQkFBa0IsNEJBQVksTUFBTTtBQUN4QyxRQUFJLGNBQWMsU0FBUztBQUN6QixtQkFBYSxjQUFjLE9BQU87QUFDbEMsb0JBQWMsVUFBVTtBQUFBLElBQzFCO0FBQUEsRUFDRixHQUFHLENBQUMsQ0FBQztBQUVMLFFBQU0seUJBQXFCLDRCQUFZLE1BQU07QUFDM0MsUUFBSSxDQUFDLGVBQWUsUUFBUztBQUM3QixRQUFJO0FBQ0YscUJBQWUsUUFBUSxNQUFNO0FBQUEsSUFDL0IsUUFBUTtBQUFBLElBRVI7QUFDQSxtQkFBZSxVQUFVO0FBQUEsRUFDM0IsR0FBRyxDQUFDLENBQUM7QUFFTCxRQUFNLHNCQUFrQiw0QkFBWSxNQUFNO0FBQ3hDLG9CQUFnQjtBQUNoQix1QkFBbUI7QUFDbkIsYUFBUyxDQUFDLENBQUM7QUFDWCxhQUFTLENBQUM7QUFDVixvQkFBZ0IsRUFBRTtBQUNsQixpQkFBYSxLQUFLO0FBQUEsRUFDcEIsR0FBRyxDQUFDLG9CQUFvQixlQUFlLENBQUM7QUFFeEMsUUFBTSxxQkFBaUI7QUFBQSxJQUNyQixPQUFPLE1BQWMsYUFBNEI7QUFDL0MsWUFBTSxjQUFjLFVBQVUsWUFBWTtBQUMxQyxZQUFNLFlBQVksVUFBVSxVQUFVO0FBQ3RDLFlBQU0sZ0JBQWdCLFVBQVUsY0FBYztBQUM5QyxZQUFNLG1CQUFtQixVQUFVLGlCQUFpQjtBQUVwRCxVQUFJLENBQUMsZUFBZSxDQUFDLFdBQVc7QUFDOUIscUJBQWEsS0FBSztBQUNsQixpQkFBUyxDQUFDLENBQUM7QUFDWCxpQkFBUyxDQUFDO0FBQ1Ysd0JBQWdCLEVBQUU7QUFDbEI7QUFBQSxNQUNGO0FBRUEscUJBQWUsSUFBSTtBQUNuQixzQkFBZ0I7QUFFaEIsWUFBTSxZQUFZLEVBQUUsbUJBQW1CO0FBQ3ZDLHlCQUFtQjtBQUVuQixZQUFNLGFBQWEsSUFBSSxnQkFBZ0I7QUFDdkMscUJBQWUsVUFBVTtBQUV6QixZQUFNLGFBQWFBLGdCQUFlLGFBQWEsU0FBUztBQUN4RCxZQUFNLDBCQUEwQixpQkFBaUIsS0FBSztBQUN0RCxZQUFNLGtCQUFrQixHQUFHLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxJQUFJLGFBQWEsSUFBSSx1QkFBdUIsSUFBSSxJQUFJO0FBQy9HLHVCQUFpQixVQUFVO0FBRTNCLG1CQUFhLElBQUk7QUFDakIsZUFBUyxDQUFDLENBQUM7QUFDWCxlQUFTLENBQUM7QUFDVixzQkFBZ0IsRUFBRTtBQUVsQixZQUFNLFVBS0Y7QUFBQSxRQUNGLFVBQVUsV0FBVztBQUFBLFFBQ3JCLFFBQVEsV0FBVztBQUFBLFFBQ25CLFlBQVk7QUFBQSxNQUNkO0FBQ0EsVUFBSSx5QkFBeUI7QUFDM0IsZ0JBQVEsZ0JBQWdCO0FBQUEsTUFDMUI7QUFFQSxnQkFBVSwwQkFBMEIsRUFBRSxNQUFNLFVBQVUsUUFBUSxDQUFDO0FBRS9ELFVBQUk7QUFDSixVQUFJO0FBQ0YsZUFBTyxNQUFNLFVBQTJCLGlDQUFpQyxJQUFJLGFBQWEsUUFBUSxJQUFJO0FBQUEsVUFDcEcsUUFBUTtBQUFBLFVBQ1IsU0FBUyxFQUFFLGdCQUFnQixtQkFBbUI7QUFBQSxVQUM5QyxNQUFNLEtBQUssVUFBVSxPQUFPO0FBQUEsVUFDNUIsUUFBUSxXQUFXO0FBQUEsVUFDbkIseUJBQXlCO0FBQUEsUUFDM0IsQ0FBQztBQUFBLE1BQ0gsU0FBUyxLQUFVO0FBQ2pCLFlBQUksY0FBYyxtQkFBbUIsUUFBUztBQUM5QyxZQUFJLEtBQUssU0FBUyxjQUFjO0FBQzlCLHlCQUFlLFVBQVU7QUFDekI7QUFBQSxRQUNGO0FBRUEsWUFBSSxlQUFlLGlCQUFpQixJQUFJLFdBQVcsS0FBSztBQUN0RCx1QkFBYSxLQUFLO0FBQ2xCLHlCQUFlLFVBQVU7QUFDekIsc0JBQVk7QUFDWjtBQUFBLFFBQ0Y7QUFFQSxjQUFNLGlCQUFpQixFQUFFLGVBQWUsa0JBQWtCLE9BQU8sSUFBSSxXQUFXO0FBQ2hGLFlBQUksa0JBQWtCLHVCQUF1QixTQUFTO0FBQ3BELGlDQUF1QixVQUFVO0FBQ2pDLHlCQUFlLFVBQVU7QUFDekIsd0JBQWMsVUFBVSxPQUFPLFdBQVcsTUFBTTtBQUM5QyxnQkFBSSxjQUFjLG1CQUFtQixRQUFTO0FBQzlDLGdCQUFJLGlCQUFpQixZQUFZLGdCQUFpQjtBQUNsRCwyQkFBZSxNQUFNO0FBQUEsY0FDbkIsVUFBVTtBQUFBLGNBQ1YsUUFBUTtBQUFBLGNBQ1IsWUFBWTtBQUFBLGNBQ1osZUFBZTtBQUFBLFlBQ2pCLENBQUM7QUFBQSxVQUNILEdBQUcsWUFBWTtBQUNmO0FBQUEsUUFDRjtBQUNBLHFCQUFhLEtBQUs7QUFDbEIsd0JBQWdCLEtBQUssV0FBVyxLQUFLLHFCQUFxQiw0Q0FBNEMsQ0FBQztBQUN2Ryx1QkFBZSxVQUFVO0FBQ3pCO0FBQUEsTUFDRjtBQUVBLFVBQUksY0FBYyxtQkFBbUIsUUFBUztBQUU5QyxnQkFBVSwyQkFBMkI7QUFBQSxRQUNuQyxRQUFRO0FBQUEsUUFDUixPQUFPLE1BQU0sU0FBUztBQUFBLFFBQ3RCLE9BQU8sTUFBTSxRQUFRLE1BQU0sS0FBSyxJQUFJLEtBQUssTUFBTSxTQUFTO0FBQUEsTUFDMUQsQ0FBQztBQUVELG1CQUFhLEtBQUs7QUFDbEIsZUFBUyxLQUFLLFNBQVMsQ0FBQyxDQUFDO0FBQ3pCLGVBQVMsS0FBSyxVQUFVLEtBQUssU0FBUyxDQUFDLEdBQUcsTUFBTTtBQUNoRCxxQkFBZSxVQUFVO0FBQUEsSUFDM0I7QUFBQSxJQUNBO0FBQUEsTUFDRTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0FBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFFQSxnQ0FBVSxNQUFNO0FBQ2QsV0FBTyxNQUFNO0FBQ1gsc0JBQWdCO0FBQ2hCLHlCQUFtQjtBQUFBLElBQ3JCO0FBQUEsRUFDRixHQUFHLENBQUMsb0JBQW9CLGVBQWUsQ0FBQztBQUV4QyxTQUFPO0FBQUEsSUFDTDtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRjtBQUNGOzs7QUN4T0EsSUFBQUMsaUJBQTRCO0FBb0I1QixJQUFNLHVCQUF1QixLQUFLLEtBQUssS0FBSztBQUU1QyxJQUFNLHdCQUF3QixDQUFDLFVBQWtFO0FBQy9GLE1BQUksQ0FBQyxTQUFTLE9BQU8sVUFBVSxTQUFVLFFBQU87QUFDaEQsU0FBTztBQUFBLElBQ0wsVUFBVSxNQUFNLFlBQVk7QUFBQSxJQUM1QixRQUFRLE1BQU0sVUFBVTtBQUFBLElBQ3hCLE1BQU0sTUFBTTtBQUFBLElBQ1osZUFBZSxNQUFNLGlCQUFpQjtBQUFBLElBQ3RDLFlBQVksTUFBTSxjQUFjO0FBQUEsSUFDaEMsZUFBZSxNQUFNLGlCQUFpQjtBQUFBLElBQ3RDLFdBQVcsTUFBTSxhQUFhO0FBQUEsRUFDaEM7QUFDRjtBQUdPLElBQU0sd0JBQXdCLE1BQU07QUFDekMsUUFBTSx1QkFBbUIsNEJBQVksTUFBa0M7QUFDckUsVUFBTSxTQUFTLHlCQUE4QyxrQkFBa0I7QUFDL0UsV0FBTyxzQkFBc0IsTUFBTTtBQUFBLEVBQ3JDLEdBQUcsQ0FBQyxDQUFDO0FBRUwsUUFBTSx1QkFBbUIsNEJBQVksTUFBTTtBQUN6QyxpQ0FBNkIsa0JBQWtCO0FBQy9DLGlDQUE2Qix1QkFBdUI7QUFBQSxFQUN0RCxHQUFHLENBQUMsQ0FBQztBQUVMLFFBQU0sd0JBQW9CLDRCQUFZLE1BQU07QUFDMUMsVUFBTSxNQUFNLDBCQUEwQix1QkFBdUI7QUFDN0QsUUFBSSxRQUFRLEtBQUs7QUFDZixtQ0FBNkIsdUJBQXVCO0FBQ3BELGFBQU87QUFBQSxJQUNUO0FBQ0EsV0FBTztBQUFBLEVBQ1QsR0FBRyxDQUFDLENBQUM7QUFFTCxRQUFNLHVCQUFtQiw0QkFBWSxDQUFDLFdBQWdDO0FBQ3BFLDZCQUF5QixvQkFBb0IsUUFBUSxvQkFBb0I7QUFDekUsOEJBQTBCLHlCQUF5QixLQUFLLG9CQUFvQjtBQUFBLEVBQzlFLEdBQUcsQ0FBQyxDQUFDO0FBRUwsU0FBTztBQUFBLElBQ0w7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQ0Y7OztBQ25FQyxJQUFBQyxpQkFBOEQ7QUFtQi9ELElBQU0sOEJBR0Q7QUFBQSxFQUNILEVBQUUsSUFBSSxVQUFVLGdCQUFnQixFQUFFO0FBQUEsRUFDbEMsRUFBRSxJQUFJLFdBQVcsZ0JBQWdCLEdBQUc7QUFBQSxFQUNwQyxFQUFFLElBQUksV0FBVyxnQkFBZ0IsR0FBRztBQUN0QztBQWNPLElBQU0seUJBQXlCLENBQUM7QUFBQSxFQUNyQztBQUFBLEVBQ0E7QUFBQSxFQUNBLFlBQUFDO0FBQUEsRUFDQSxnQkFBQUM7QUFBQSxFQUNBLFVBQUFDO0FBQUEsRUFDQSxPQUFBQztBQUFBLEVBQ0EsWUFBQUM7QUFBQSxFQUNBLFVBQUFDO0FBQ0YsTUFBa0M7QUFDaEMsUUFBTSxrQ0FBOEI7QUFBQSxJQUNsQyxDQUFDLE9BQW9CLFFBQTJDO0FBQzlELFVBQUksQ0FBQyxTQUFTLENBQUMsS0FBSztBQUNsQixlQUFPO0FBQUEsTUFDVDtBQUVBLFlBQU0sa0JBQWtCRCxZQUFXLEtBQUs7QUFDeEMsWUFBTSxnQkFBZ0JBLFlBQVcsR0FBRztBQUNwQyxZQUFNLFFBQVFBLFlBQVcsb0JBQUksS0FBSyxDQUFDO0FBQ25DLFVBQUlELE9BQU0sYUFBYSxNQUFNQSxPQUFNLEtBQUssR0FBRztBQUN6QyxlQUFPO0FBQUEsTUFDVDtBQUVBLGlCQUFXLFNBQVMsNkJBQTZCO0FBQy9DLGNBQU0saUJBQWlCLElBQUksS0FBSyxLQUFLO0FBQ3JDLHVCQUFlLFFBQVEsTUFBTSxRQUFRLElBQUksTUFBTSxjQUFjO0FBQzdELFlBQUlBLE9BQU0sZUFBZSxNQUFNQSxPQUFNLGNBQWMsR0FBRztBQUNwRCxpQkFBTyxNQUFNO0FBQUEsUUFDZjtBQUFBLE1BQ0Y7QUFFQSxhQUFPO0FBQUEsSUFDVDtBQUFBLElBQ0EsQ0FBQ0MsYUFBWUQsTUFBSztBQUFBLEVBQ3BCO0FBRUEsUUFBTSxDQUFDLFdBQVcsWUFBWSxRQUFJLHlCQUFzQixJQUFJO0FBQzVELFFBQU0sQ0FBQyxTQUFTLFVBQVUsUUFBSSx5QkFBc0IsSUFBSTtBQUN4RCxRQUFNLENBQUMsaUJBQWlCLGtCQUFrQixRQUFJLHlCQUFzQixJQUFJO0FBQ3hFLFFBQU0sQ0FBQyxlQUFlLGdCQUFnQixRQUFJLHlCQUFzQixJQUFJO0FBQ3BFLFFBQU0sQ0FBQyxXQUFXLFlBQVksUUFBSSx5QkFBc0IsSUFBSTtBQUM1RCxRQUFNLENBQUMsZUFBZSxnQkFBZ0IsUUFBSSx5QkFBbUMsT0FBTztBQUNwRixRQUFNLENBQUMsY0FBYyxlQUFlLFFBQUksMEJBQVMsb0JBQUksS0FBSyxHQUFFLFNBQVMsQ0FBQztBQUN0RSxRQUFNLENBQUMsYUFBYSxjQUFjLFFBQUksMEJBQVMsb0JBQUksS0FBSyxHQUFFLFlBQVksQ0FBQztBQUN2RSxRQUFNLENBQUMsUUFBUSxTQUFTLFFBQUkseUJBQVMsS0FBSztBQUMxQyxRQUFNLENBQUMsdUJBQXVCLHdCQUF3QixRQUFJLHlCQUFTLEtBQUs7QUFDeEUsUUFBTSxDQUFDLG1CQUFtQixvQkFBb0IsUUFBSSx5QkFBK0IsSUFBSTtBQUNyRixRQUFNLENBQUMsZ0JBQWdCLGlCQUFpQixRQUFJLHlCQUE4QixJQUFJO0FBQzlFLFFBQU0sQ0FBQyx1QkFBdUIsd0JBQXdCLFFBQUkseUJBQVMsRUFBRTtBQUNyRSxRQUFNLENBQUMsZ0JBQWdCLGlCQUFpQixRQUFJLHlCQUFTLENBQUM7QUFDdEQsUUFBTSxDQUFDLGFBQWEsY0FBYyxRQUFJLHlCQUFTLElBQUk7QUFDbkQsUUFBTSxDQUFDLGlCQUFpQixrQkFBa0IsUUFBSSx5QkFBUyxLQUFLO0FBRTVELFFBQU0sMkJBQXVCLHVCQUFPLEtBQUs7QUFDekMsUUFBTSx1QkFBbUIsdUJBQU8sS0FBSztBQUVyQyxRQUFNLG9CQUFnQix3QkFBUSxNQUFPLFlBQVlBLE9BQU0sU0FBUyxJQUFJLElBQUssQ0FBQyxXQUFXQSxNQUFLLENBQUM7QUFDM0YsUUFBTSxrQkFBYyx3QkFBUSxNQUFPLFVBQVVBLE9BQU0sT0FBTyxJQUFJLElBQUssQ0FBQyxTQUFTQSxNQUFLLENBQUM7QUFDbkYsUUFBTSxzQkFBa0Isd0JBQVEsTUFBTyxpQkFBaUIsZUFBZSxRQUFRLElBQUssQ0FBQyxjQUFjLENBQUM7QUFFcEcsUUFBTSwwQkFBc0IsNEJBQVksTUFBTTtBQUM1QyxRQUFJLHNCQUFzQixhQUFhLENBQUMsYUFBYSxDQUFDLFVBQVU7QUFDOUQseUJBQW1CLElBQUk7QUFDdkIsdUJBQWlCLENBQUMsWUFBWSxVQUFVLEtBQUs7QUFDN0MsK0JBQXlCLElBQUk7QUFDN0IsZ0JBQVUsSUFBSTtBQUNkLHFCQUFlLElBQUk7QUFDbkIsYUFBTztBQUFBLElBQ1Q7QUFDQSxXQUFPO0FBQUEsRUFDVCxHQUFHLENBQUMsbUJBQW1CLFNBQVMsU0FBUyxDQUFDO0FBRzFDLFFBQU0saUNBQTZCLDRCQUFZLE1BQWdDO0FBQzdFLFFBQUksQ0FBQyxtQkFBbUIsQ0FBQyxjQUFlLFFBQU87QUFDL0MsVUFBTSxXQUFXRixnQkFBZSxlQUFlO0FBQy9DLFVBQU0sU0FBU0EsZ0JBQWUsYUFBYTtBQUMzQyxRQUFJLENBQUMsWUFBWSxDQUFDLE9BQVEsUUFBTztBQUVqQyxVQUFNLFdBQVdHLFlBQVcsUUFBUTtBQUNwQyxVQUFNLFNBQVNBLFlBQVcsTUFBTTtBQUVoQyxRQUFJLFFBQVE7QUFDWixRQUFJLE1BQU07QUFDVixRQUFJQyxVQUFTLEtBQUssS0FBSyxHQUFHO0FBQ3hCLFlBQU0sT0FBTztBQUNiLGNBQVE7QUFDUixZQUFNO0FBQUEsSUFDUjtBQUVBLGlCQUFhLEtBQUs7QUFDbEIsZUFBVyxHQUFHO0FBQ2QscUJBQWlCLE1BQU07QUFDdkIsaUJBQWEsSUFBSTtBQUNqQixvQkFBZ0IsTUFBTSxTQUFTLENBQUM7QUFDaEMsbUJBQWUsTUFBTSxZQUFZLENBQUM7QUFDbEMseUJBQXFCLDRCQUE0QixPQUFPLEdBQUcsQ0FBQztBQUM1RCxzQkFBa0IsSUFBSTtBQUN0Qiw2QkFBeUIsRUFBRTtBQUMzQixjQUFVLEtBQUs7QUFFZixXQUFPO0FBQUEsTUFDTCxNQUFNO0FBQUEsTUFDTixVQUFVO0FBQUEsUUFDUixVQUFVRixPQUFNLEtBQUs7QUFBQSxRQUNyQixRQUFRQSxPQUFNLEdBQUc7QUFBQSxRQUNqQixZQUFZO0FBQUEsTUFDZDtBQUFBLElBQ0Y7QUFBQSxFQUNGLEdBQUcsQ0FBQyxpQkFBaUIsZUFBZUUsV0FBVUosaUJBQWdCLDZCQUE2QkcsYUFBWUQsTUFBSyxDQUFDO0FBRzdHLFFBQU0sMEJBQXNCLDRCQUFZLE1BQU07QUFDNUMsaUJBQWEsSUFBSTtBQUNqQixlQUFXLElBQUk7QUFDZix1QkFBbUIsSUFBSTtBQUN2QixxQkFBaUIsSUFBSTtBQUNyQixxQkFBaUIsT0FBTztBQUN4QixpQkFBYSxJQUFJO0FBQ2pCLHFCQUFnQixvQkFBSSxLQUFLLEdBQUUsU0FBUyxDQUFDO0FBQ3JDLG9CQUFlLG9CQUFJLEtBQUssR0FBRSxZQUFZLENBQUM7QUFDdkMseUJBQXFCLElBQUk7QUFDekIsNkJBQXlCLEtBQUs7QUFDOUIsc0JBQWtCLElBQUk7QUFDdEIsNkJBQXlCLEVBQUU7QUFDM0Isc0JBQWtCLENBQUMsU0FBUyxPQUFPLENBQUM7QUFDcEMsdUJBQW1CLEtBQUs7QUFBQSxFQUMxQixHQUFHLENBQUMsQ0FBQztBQUdMLFFBQU0sd0JBQW9CO0FBQUEsSUFDeEIsQ0FBQyxXQUFpRTtBQUNoRSxVQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sWUFBWSxDQUFDLE9BQU8sT0FBUSxRQUFPO0FBRTFELFlBQU0sUUFBUUQsVUFBUyxPQUFPLFFBQVE7QUFDdEMsWUFBTSxNQUFNQSxVQUFTLE9BQU8sTUFBTTtBQUNsQyxtQkFBYSxLQUFLO0FBQ2xCLGlCQUFXLEdBQUc7QUFDZCx1QkFBaUIsTUFBTSxTQUFTLEtBQUs7QUFDckMsbUJBQWEsSUFBSTtBQUNqQixzQkFBZ0IsUUFBUSxNQUFNLFNBQVMsS0FBSSxvQkFBSSxLQUFLLEdBQUUsU0FBUyxDQUFDO0FBQ2hFLHFCQUFlLFFBQVEsTUFBTSxZQUFZLEtBQUksb0JBQUksS0FBSyxHQUFFLFlBQVksQ0FBQztBQUNyRSwyQkFBcUIsNEJBQTRCLE9BQU8sR0FBRyxDQUFDO0FBQzVELCtCQUF5QixLQUFLO0FBQzlCLHlCQUFtQixLQUFLO0FBRXhCLFVBQUksT0FBTyxlQUFlO0FBQ3hCLDBCQUFrQixFQUFFLE9BQU8sT0FBTyxlQUFlLE1BQU0sT0FBTyxjQUFjLE9BQU8sY0FBYyxDQUFDO0FBQUEsTUFDcEcsT0FBTztBQUNMLDBCQUFrQixJQUFJO0FBQUEsTUFDeEI7QUFDQSwrQkFBeUIsT0FBTyxpQkFBaUIsRUFBRTtBQUVuRCxZQUFNLFVBQVUsT0FBTyxPQUFPLElBQUk7QUFDbEMsWUFBTSxhQUFhLE9BQU8sU0FBUyxPQUFPLEtBQUssVUFBVSxJQUFJLFVBQVU7QUFFdkUsYUFBTztBQUFBLFFBQ0wsTUFBTTtBQUFBLFFBQ04sVUFBVTtBQUFBLFVBQ1IsVUFBVSxPQUFPO0FBQUEsVUFDakIsUUFBUSxPQUFPO0FBQUEsVUFDZixZQUFZLE9BQU8saUJBQWlCO0FBQUEsVUFDcEMsZUFBZSxPQUFPLGlCQUFpQjtBQUFBLFFBQ3pDO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLENBQUNBLFdBQVUsMkJBQTJCO0FBQUEsRUFDeEM7QUFFQSxRQUFNLG1CQUFlO0FBQUEsSUFDbkIsQ0FBQyxZQUFrQjtBQUNqQixNQUFBRixZQUFXLGdCQUFnQjtBQUFBLFFBQ3pCLFNBQVNHLE9BQU0sT0FBTztBQUFBLFFBQ3RCLE9BQU87QUFBQSxRQUNQLEtBQUs7QUFBQSxRQUNMO0FBQUEsTUFDRixDQUFDO0FBRUQseUJBQW1CLEtBQUs7QUFDeEIsMkJBQXFCLFFBQVE7QUFDN0IsK0JBQXlCLElBQUk7QUFDN0IsWUFBTSxXQUFXLENBQUMsQ0FBQztBQUNuQixZQUFNLFNBQVMsQ0FBQyxDQUFDO0FBRWpCLFVBQUksa0JBQWtCLE9BQU87QUFDM0IsWUFBSSxDQUFDLFVBQVU7QUFDYix1QkFBYSxPQUFPO0FBQ3BCLHFCQUFXLElBQUk7QUFDZiwyQkFBaUIsS0FBSztBQUN0QiwwQkFBZ0IsUUFBUSxTQUFTLENBQUM7QUFDbEMseUJBQWUsUUFBUSxZQUFZLENBQUM7QUFDcEM7QUFBQSxRQUNGO0FBRUEsWUFBSUcsWUFBVztBQUNmLFlBQUksU0FBUztBQUNiLFlBQUlELFVBQVMsUUFBUUMsU0FBUSxHQUFHO0FBQzlCLGdCQUFNLE9BQU9BO0FBQ2IsVUFBQUEsWUFBVztBQUNYLG1CQUFTO0FBQUEsUUFDWDtBQUVBLHFCQUFhQSxTQUFRO0FBQ3JCLG1CQUFXLE1BQU07QUFDakIsMkJBQW1CQSxTQUFRO0FBQzNCLHlCQUFpQixNQUFNO0FBQ3ZCLHlCQUFpQixNQUFNO0FBQ3ZCLHdCQUFnQixPQUFPLFNBQVMsQ0FBQztBQUNqQyx1QkFBZSxPQUFPLFlBQVksQ0FBQztBQUNuQyxxQkFBYSxJQUFJO0FBQ2pCLGtCQUFVLEtBQUs7QUFDZixpQ0FBeUIsS0FBSztBQUM5QjtBQUFBLE1BQ0Y7QUFFQSxZQUFNLFdBQVc7QUFDakIsVUFBSSxVQUFVLFdBQVdELFVBQVMsU0FBUyxRQUFRLEdBQUc7QUFDcEQscUJBQWEsUUFBUTtBQUNyQixtQkFBVyxJQUFJO0FBQ2YseUJBQWlCLEtBQUs7QUFDdEIsd0JBQWdCLFNBQVMsU0FBUyxDQUFDO0FBQ25DLHVCQUFlLFNBQVMsWUFBWSxDQUFDO0FBQ3JDO0FBQUEsTUFDRjtBQUVBLG1CQUFhLFFBQVE7QUFDckIsVUFBSSxVQUFVLFNBQVM7QUFDckIsbUJBQVcsT0FBTztBQUNsQiwyQkFBbUIsUUFBUTtBQUMzQix5QkFBaUIsT0FBTztBQUN4Qix5QkFBaUIsTUFBTTtBQUN2QixxQkFBYSxJQUFJO0FBQ2pCLGtCQUFVLEtBQUs7QUFDZixpQ0FBeUIsS0FBSztBQUFBLE1BQ2hDLE9BQU87QUFDTCxtQkFBVyxJQUFJO0FBQ2YseUJBQWlCLEtBQUs7QUFBQSxNQUN4QjtBQUVBLHNCQUFnQixTQUFTLFNBQVMsQ0FBQztBQUNuQyxxQkFBZSxTQUFTLFlBQVksQ0FBQztBQUFBLElBQ3ZDO0FBQUEsSUFDQSxDQUFDLFNBQVMsZUFBZUEsV0FBVUwsYUFBWSxlQUFlLFdBQVcsYUFBYUcsTUFBSztBQUFBLEVBQzdGO0FBRUEsUUFBTSx1QkFBbUI7QUFBQSxJQUN2QixDQUFDLFVBQTJCO0FBQzFCLFlBQU0sZ0JBQWdCO0FBQ3RCLE1BQUFILFlBQVcsWUFBWTtBQUN2QiwyQkFBcUIsSUFBSTtBQUN6Qix5QkFBbUIsS0FBSztBQUN4QiwrQkFBeUIsS0FBSztBQUM5QiwwQkFBb0I7QUFDcEIsZ0JBQVUsS0FBSztBQUNmLHFCQUFlLElBQUk7QUFBQSxJQUNyQjtBQUFBLElBQ0EsQ0FBQ0EsYUFBWSxtQkFBbUI7QUFBQSxFQUNsQztBQUVBLFFBQU0sa0JBQWM7QUFBQSxJQUNsQixDQUFDLFlBQTZCO0FBQzVCLE1BQUFBLFlBQVcsZUFBZSxFQUFFLFNBQVMsT0FBTyxlQUFlLEtBQUssYUFBYSxjQUFjLENBQUM7QUFDNUYseUJBQW1CLEtBQUs7QUFDeEIsMkJBQXFCLFFBQVE7QUFDN0IsK0JBQXlCLElBQUk7QUFFN0IsVUFBSSxZQUFZLFNBQVMsQ0FBQyxXQUFXO0FBQ25DLHlCQUFpQixPQUFPO0FBQUEsTUFDMUIsT0FBTztBQUNMLHlCQUFpQixPQUFPO0FBQUEsTUFDMUI7QUFFQSxnQkFBVSxJQUFJO0FBQUEsSUFDaEI7QUFBQSxJQUNBLENBQUMsZUFBZUEsYUFBWSxlQUFlLFdBQVcsV0FBVztBQUFBLEVBQ25FO0FBRUEsUUFBTSw2QkFBeUI7QUFBQSxJQUM3QixDQUFDLFVBQStDO0FBQzlDLFVBQUksTUFBTSxRQUFRLFdBQVcsTUFBTSxRQUFRLElBQUs7QUFDaEQsWUFBTSxlQUFlO0FBQ3JCLGtCQUFZLE9BQU87QUFBQSxJQUNyQjtBQUFBLElBQ0EsQ0FBQyxXQUFXO0FBQUEsRUFDZDtBQUVBLFFBQU0sMkJBQXVCO0FBQUEsSUFDM0IsQ0FBQyxPQUE0QyxZQUE2QjtBQUN4RSxVQUFJLE1BQU0sUUFBUSxXQUFXLE1BQU0sUUFBUSxJQUFLO0FBQ2hELFlBQU0sZUFBZTtBQUNyQixZQUFNLGdCQUFnQjtBQUN0QixrQkFBWSxPQUFPO0FBQUEsSUFDckI7QUFBQSxJQUNBLENBQUMsV0FBVztBQUFBLEVBQ2Q7QUFFQSxRQUFNLHNCQUFrQjtBQUFBLElBQ3RCLENBQUMsVUFBeUIsT0FBYSxRQUFjO0FBQ25ELFlBQU0sV0FBV0ksWUFBVyxLQUFLO0FBQ2pDLFlBQU0sU0FBU0EsWUFBVyxHQUFHO0FBQzdCLG1CQUFhLFFBQVE7QUFDckIsaUJBQVcsTUFBTTtBQUNqQix1QkFBaUIsTUFBTTtBQUN2QixtQkFBYSxJQUFJO0FBQ2pCLHNCQUFnQixTQUFTLFNBQVMsQ0FBQztBQUNuQyxxQkFBZSxTQUFTLFlBQVksQ0FBQztBQUNyQyxnQkFBVSxLQUFLO0FBQ2YsK0JBQXlCLEtBQUs7QUFDOUIsMkJBQXFCLFFBQVE7QUFDN0IseUJBQW1CLEtBQUs7QUFBQSxJQUMxQjtBQUFBLElBQ0EsQ0FBQ0EsV0FBVTtBQUFBLEVBQ2I7QUFFQSxRQUFNLHdCQUFvQjtBQUFBLElBQ3hCLENBQUMsYUFBNEI7QUFDM0IsWUFBTSxRQUFRQSxZQUFXLG9CQUFJLEtBQUssQ0FBQztBQUVuQyxVQUFJLGFBQWEsVUFBVTtBQUV6QixZQUFJLHVCQUF1QjtBQUN6Qiw2QkFBbUIsS0FBSztBQUN4Qix1QkFBYSxJQUFJO0FBQ2pCLDJCQUFpQixhQUFhLFVBQVUsU0FBUyxZQUFZLFFBQVEsT0FBTztBQUM1RSxvQkFBVSxLQUFLO0FBQ2YsbUNBQXlCLEtBQUs7QUFDOUI7QUFBQSxRQUNGO0FBRUEsY0FBTSxZQUFZLGtCQUFrQixJQUFJLEtBQUssZUFBZSxJQUFJLFlBQVksSUFBSSxLQUFLLFNBQVMsSUFBSTtBQUNsRyxjQUFNLFVBQVUsZ0JBQWdCLElBQUksS0FBSyxhQUFhLElBQUksVUFBVSxJQUFJLEtBQUssT0FBTyxJQUFJO0FBQ3hGLDZCQUFxQixRQUFRO0FBQzdCLGlDQUF5QixJQUFJO0FBQzdCLHFCQUFhLFNBQVM7QUFDdEIsbUJBQVcsT0FBTztBQUVsQixZQUFJLFdBQVc7QUFDYiwwQkFBZ0IsVUFBVSxTQUFTLENBQUM7QUFDcEMseUJBQWUsVUFBVSxZQUFZLENBQUM7QUFBQSxRQUN4QztBQUdBLHlCQUFpQixhQUFhLENBQUMsVUFBVSxRQUFRLE9BQU87QUFDeEQsa0JBQVUsSUFBSTtBQUNkLHFCQUFhLElBQUk7QUFDakIsMkJBQW1CLEtBQUs7QUFDeEI7QUFBQSxNQUNGO0FBRUEsVUFBSSxhQUFhLFVBQVU7QUFDekIsY0FBTSxRQUFRLElBQUksS0FBSyxLQUFLO0FBQzVCLGNBQU0sUUFBUSxNQUFNLFFBQVEsSUFBSSxDQUFDO0FBQ2pDLHdCQUFnQixVQUFVLE9BQU8sS0FBSztBQUN0QztBQUFBLE1BQ0Y7QUFFQSxVQUFJLGFBQWEsV0FBVztBQUMxQixjQUFNLFFBQVEsSUFBSSxLQUFLLEtBQUs7QUFDNUIsY0FBTSxRQUFRLE1BQU0sUUFBUSxJQUFJLEVBQUU7QUFDbEMsd0JBQWdCLFVBQVUsT0FBTyxLQUFLO0FBQ3RDO0FBQUEsTUFDRjtBQUVBLFVBQUksYUFBYSxXQUFXO0FBQzFCLGNBQU0sUUFBUSxJQUFJLEtBQUssS0FBSztBQUM1QixjQUFNLFFBQVEsTUFBTSxRQUFRLElBQUksRUFBRTtBQUNsQyx3QkFBZ0IsVUFBVSxPQUFPLEtBQUs7QUFBQSxNQUN4QztBQUFBLElBQ0Y7QUFBQSxJQUNBLENBQUMsaUJBQWlCLFNBQVMsZUFBZSxpQkFBaUIsdUJBQXVCLFdBQVdBLFdBQVU7QUFBQSxFQUN6RztBQUVBLFFBQU0sMkJBQXVCLDRCQUFZLENBQUMsV0FBZ0M7QUFDeEUsc0JBQWtCLE1BQU07QUFBQSxFQUMxQixHQUFHLENBQUMsQ0FBQztBQUVMLFNBQU87QUFBQSxJQUNMO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQ0Y7OztBakIvRUksSUFBQUcsc0JBQUE7QUFyV0osSUFBTSxZQUFZO0FBQ2xCLElBQU0sY0FBYztBQUNwQixJQUFNLGVBQWU7QUFDckIsSUFBTSxrQkFBa0I7QUFFeEIsSUFBTSxvQkFBb0IsQ0FBQyxXQUFtQjtBQUM1QyxRQUFNLFFBQVEsT0FBTyxVQUFVLEVBQUUsRUFBRSxLQUFLO0FBQ3hDLE1BQUksQ0FBQyxNQUFPLFFBQU87QUFDbkIsTUFBSSxZQUFZLEtBQUssS0FBSyxFQUFHLFFBQU87QUFDcEMsU0FBTztBQUNUO0FBRUEsSUFBTSxpQkFBaUIsQ0FBQyxXQUFtQixTQUFTLEtBQUssT0FBTyxVQUFVLEVBQUUsQ0FBQztBQUU3RSxJQUFNLGdCQUFnQjtBQUFBLEVBQ3BCO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRjtBQUVBLElBQU0sc0JBQXNCO0FBQUEsRUFDMUI7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUNGO0FBRUEsSUFBTSwwQkFBMEIsSUFBSSxLQUFLLGVBQWUsU0FBUyxFQUFFLE1BQU0sV0FBVyxPQUFPLE9BQU8sQ0FBQztBQUVuRyxJQUFNLGNBQWMsTUFBTTtBQUN4QixRQUFNLFdBQVcsT0FBTyxhQUFhLGNBQWMsU0FBUyxnQkFBZ0IsT0FBTztBQUNuRixNQUFJLFlBQVksT0FBTyxRQUFRLEVBQUUsS0FBSyxFQUFHLFFBQU8sa0JBQWtCLFFBQVE7QUFDMUUsU0FBTztBQUNUO0FBRUEsSUFBTSxNQUFNLENBQUMsTUFBYyxFQUFFLFNBQVMsRUFBRSxTQUFTLEdBQUcsR0FBRztBQUV2RCxJQUFNLFFBQVEsQ0FBQyxNQUFZLEdBQUcsRUFBRSxZQUFZLENBQUMsSUFBSSxJQUFJLEVBQUUsU0FBUyxJQUFJLENBQUMsQ0FBQyxJQUFJLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztBQUUxRixJQUFNLGFBQWEsQ0FBQyxNQUFZLElBQUksS0FBSyxFQUFFLFlBQVksR0FBRyxFQUFFLFNBQVMsR0FBRyxFQUFFLFFBQVEsQ0FBQztBQUVuRixJQUFNLFdBQVcsQ0FBQyxNQUFjO0FBQzlCLE1BQUksQ0FBQyxFQUFHLFFBQU87QUFDZixRQUFNLFFBQVEsRUFBRSxNQUFNLEdBQUcsRUFBRSxJQUFJLE1BQU07QUFDckMsTUFBSSxNQUFNLFdBQVcsRUFBRyxRQUFPO0FBQy9CLFNBQU8sSUFBSSxLQUFLLE1BQU0sQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLENBQUM7QUFDbEQ7QUFFQSxJQUFNLFdBQVcsQ0FBQyxHQUFnQixNQUFtQixDQUFDLEVBQUUsS0FBSyxLQUFLLEVBQUUsUUFBUSxJQUFJLEVBQUUsUUFBUTtBQUUxRixJQUFNLGlCQUFpQixDQUFDLE1BQWMsT0FBZTtBQUNuRCxNQUFJLENBQUMsUUFBUSxDQUFDLEdBQUksUUFBTyxFQUFFLE1BQU0sR0FBRztBQUNwQyxRQUFNLFdBQVcsU0FBUyxJQUFJO0FBQzlCLFFBQU0sU0FBUyxTQUFTLEVBQUU7QUFDMUIsTUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFRLFFBQU8sRUFBRSxNQUFNLEdBQUc7QUFDNUMsTUFBSSxTQUFTLFFBQVEsUUFBUSxHQUFHO0FBQzlCLFdBQU8sRUFBRSxNQUFNLE1BQU0sTUFBTSxHQUFHLElBQUksTUFBTSxRQUFRLEVBQUU7QUFBQSxFQUNwRDtBQUNBLFNBQU8sRUFBRSxNQUFNLE1BQU0sUUFBUSxHQUFHLElBQUksTUFBTSxNQUFNLEVBQUU7QUFDcEQ7QUFFQSxJQUFNLGdCQUFnQixDQUFDLEdBQVMsV0FBbUI7QUFDakQsTUFBSSxlQUFlLE1BQU0sR0FBRztBQUMxQixVQUFNLFFBQVEsb0JBQW9CLEVBQUUsU0FBUyxDQUFDO0FBQzlDLFdBQU8sR0FBRyxFQUFFLFFBQVEsQ0FBQyxJQUFJLEtBQUssSUFBSSxFQUFFLFlBQVksQ0FBQyxHQUFHLFlBQVk7QUFBQSxFQUNsRTtBQUNBLFNBQU8sRUFDSixtQkFBbUIsUUFBUTtBQUFBLElBQzFCLEtBQUs7QUFBQSxJQUNMLE9BQU87QUFBQSxJQUNQLE1BQU07QUFBQSxFQUNSLENBQUMsRUFDQSxRQUFRLE9BQU8sRUFBRSxFQUNqQixZQUFZO0FBQ2pCO0FBRUEsSUFBTSxtQkFBbUIsQ0FBQyxHQUFTLFdBQW1CO0FBQ3BELE1BQUksT0FBTyxLQUFLLE1BQU0sR0FBRztBQUN2QixXQUFPLHdCQUF3QixPQUFPLENBQUM7QUFBQSxFQUN6QztBQUNBLE1BQUksZUFBZSxNQUFNLEdBQUc7QUFDMUIsV0FBTyxHQUFHLGNBQWMsRUFBRSxTQUFTLENBQUMsQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDO0FBQUEsRUFDMUQ7QUFDQSxRQUFNLFlBQVksRUFBRSxtQkFBbUIsUUFBUSxFQUFFLE9BQU8sT0FBTyxDQUFDO0FBQ2hFLFFBQU0sZUFBZSxhQUFhLFdBQVcsS0FBSyxVQUFVLENBQUMsQ0FBQyxJQUMxRCxVQUFVLENBQUMsRUFBRSxrQkFBa0IsTUFBTSxJQUFJLFVBQVUsTUFBTSxDQUFDLElBQzFEO0FBQ0osU0FBTyxHQUFHLFlBQVksSUFBSSxFQUFFLFlBQVksQ0FBQztBQUMzQztBQUVBLElBQU0saUJBQWlCLENBQUMsVUFBa0I7QUFDeEMsTUFBSSxDQUFDLE1BQU8sUUFBTztBQUNuQixRQUFNLE1BQU0sT0FBTyxLQUFLLEVBQUUsS0FBSztBQUMvQixNQUFJLENBQUMsSUFBSyxRQUFPO0FBRWpCLFFBQU0sV0FBVyxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUMsRUFBRSxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBRS9DLE1BQUksc0JBQXNCLEtBQUssUUFBUSxHQUFHO0FBQ3hDLFVBQU0sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLFNBQVMsTUFBTSxHQUFHLEVBQUUsSUFBSSxNQUFNO0FBQ2hELFdBQU8sSUFBSSxLQUFLLEdBQUcsSUFBSSxHQUFHLENBQUM7QUFBQSxFQUM3QjtBQUVBLE1BQUksOEJBQThCLEtBQUssUUFBUSxHQUFHO0FBQ2hELFVBQU0sUUFBUSxTQUFTLE1BQU0sT0FBTyxFQUFFLElBQUksTUFBTTtBQUNoRCxVQUFNLENBQUMsR0FBRyxHQUFHLENBQUMsSUFBSTtBQUNsQixXQUFPLElBQUksS0FBSyxHQUFHLElBQUksR0FBRyxDQUFDO0FBQUEsRUFDN0I7QUFFQSxRQUFNLFNBQVMsSUFBSSxLQUFLLEdBQUc7QUFDM0IsU0FBTyxPQUFPLE1BQU0sT0FBTyxRQUFRLENBQUMsSUFBSSxPQUFPO0FBQ2pEO0FBRUEsSUFBTSxrQkFBa0IsQ0FBQyxPQUFlLFdBQW1CO0FBQ3pELE1BQUksQ0FBQyxNQUFPLFFBQU8sRUFBRSxNQUFNLElBQUksT0FBTyxJQUFJLEtBQUssR0FBRztBQUNsRCxRQUFNLElBQUksZUFBZSxLQUFLO0FBQzlCLE1BQUksQ0FBQyxFQUFHLFFBQU8sRUFBRSxNQUFNLElBQUksT0FBTyxJQUFJLEtBQUssR0FBRztBQUM5QyxNQUFJLFFBQVE7QUFDWixNQUFJLGVBQWUsTUFBTSxHQUFHO0FBQzFCLFlBQVEsb0JBQW9CLEVBQUUsU0FBUyxDQUFDLEtBQUs7QUFBQSxFQUMvQyxPQUFPO0FBQ0wsWUFBUSxFQUFFLG1CQUFtQixRQUFRLEVBQUUsT0FBTyxRQUFRLENBQUMsRUFBRSxRQUFRLE9BQU8sRUFBRTtBQUFBLEVBQzVFO0FBQ0EsU0FBTztBQUFBLElBQ0wsTUFBTSxPQUFPLEVBQUUsWUFBWSxDQUFDO0FBQUEsSUFDNUIsT0FBTyxNQUFNLFlBQVk7QUFBQSxJQUN6QixLQUFLLE9BQU8sRUFBRSxRQUFRLENBQUMsRUFBRSxTQUFTLEdBQUcsR0FBRztBQUFBLEVBQzFDO0FBQ0Y7QUFFQSxJQUFNLGNBQWMsQ0FBQyxPQUFlLFdBQW1CO0FBQ3JELE1BQUksQ0FBQyxNQUFPLFFBQU87QUFDbkIsUUFBTSxRQUFRLE1BQU0sa0JBQWtCLE1BQU07QUFDNUMsTUFBSTtBQUNGLFdBQU8sTUFBTSxRQUFRLHlCQUF5QixDQUFDLFFBQVEsUUFBUSxPQUFPLEdBQUcsTUFBTSxHQUFHLEdBQUcsa0JBQWtCLE1BQU0sQ0FBQyxFQUFFO0FBQUEsRUFDbEgsUUFBUTtBQUNOLFdBQU8sTUFBTSxRQUFRLG1CQUFtQixDQUFDLFFBQVEsUUFBUSxPQUFPLEdBQUcsTUFBTSxHQUFHLEdBQUcsa0JBQWtCLE1BQU0sQ0FBQyxFQUFFO0FBQUEsRUFDNUc7QUFDRjtBQUVBLElBQU0sYUFBYSxDQUFDLFNBQWlCLFNBQW1DO0FBQ3RFLE1BQUksT0FBTyxXQUFXLFlBQWE7QUFDbkMsUUFBTSxZQUFhLE9BQWU7QUFDbEMsTUFBSSxjQUFjLEtBQU07QUFDeEIsTUFBSSxNQUFNO0FBQ1IsWUFBUSxNQUFNLGFBQWEsU0FBUyxJQUFJO0FBQUEsRUFDMUMsT0FBTztBQUNMLFlBQVEsTUFBTSxhQUFhLE9BQU87QUFBQSxFQUNwQztBQUNGO0FBR08sSUFBTSxjQUFjLENBQUM7QUFBQSxFQUMxQixrQkFBa0I7QUFBQSxFQUNsQixnQkFBZ0I7QUFBQSxFQUNoQixZQUFZO0FBQUEsRUFDWixXQUFXO0FBQUEsRUFDWCxzQkFBc0I7QUFDeEIsTUFBYTtBQUNYLFFBQU0sYUFBUyx3QkFBUSxNQUFNLFlBQVksR0FBRyxDQUFDLENBQUM7QUFDOUMsUUFBTSxpQkFBaUIsVUFBVSxtQkFBbUIsTUFBTTtBQUMxRCxRQUFNLGlCQUFpQixVQUFVLG1CQUFtQixLQUFLO0FBQ3pELFFBQU0sYUFBYSxLQUFLLGlCQUFpQixTQUFTO0FBRWxELFFBQU0sbUJBQWUsdUJBQThCLElBQUk7QUFDdkQsUUFBTSxpQkFBYSx1QkFBOEIsSUFBSTtBQUVyRCxRQUFNLEVBQUUsa0JBQWtCLGtCQUFrQixtQkFBbUIsaUJBQWlCLElBQUksc0JBQXNCO0FBQzFHLFFBQU07QUFBQSxJQUNKO0FBQUEsSUFBVztBQUFBLElBQVM7QUFBQSxJQUFXO0FBQUEsSUFBZTtBQUFBLElBQWM7QUFBQSxJQUFhO0FBQUEsSUFBUTtBQUFBLElBQ2pGO0FBQUEsSUFBbUI7QUFBQSxJQUFnQjtBQUFBLElBQXVCO0FBQUEsSUFBZ0I7QUFBQSxJQUFhO0FBQUEsSUFDdkY7QUFBQSxJQUFlO0FBQUEsSUFBYTtBQUFBLElBQWlCO0FBQUEsSUFBc0I7QUFBQSxJQUNuRTtBQUFBLElBQWM7QUFBQSxJQUFrQjtBQUFBLElBQWlCO0FBQUEsSUFBZ0I7QUFBQSxJQUFXO0FBQUEsSUFBZ0I7QUFBQSxJQUM1RjtBQUFBLElBQTBCO0FBQUEsSUFBcUI7QUFBQSxJQUE0QjtBQUFBLElBQXFCO0FBQUEsSUFDaEc7QUFBQSxJQUFjO0FBQUEsSUFBa0I7QUFBQSxJQUFhO0FBQUEsSUFBd0I7QUFBQSxJQUFzQjtBQUFBLElBQzNGO0FBQUEsRUFDRixJQUFJLHVCQUF1QjtBQUFBLElBQ3pCO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0YsQ0FBQztBQUVELFFBQU07QUFBQSxJQUNKO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRixJQUNFLHVCQUF1QjtBQUFBLElBQ3JCLFNBQVM7QUFBQSxJQUNUO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQSxTQUFTO0FBQUEsRUFDWCxDQUFDO0FBRUgsUUFBTSxFQUFFLE9BQU8sT0FBTyxhQUFhLFdBQVcsY0FBYyxnQkFBZ0IsaUJBQWlCLHdCQUF3QixpQkFBaUIsSUFDcEkscUJBQXFCO0FBQUEsSUFDbkI7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0Esb0JBQW9CO0FBQUEsSUFDcEIsVUFBVTtBQUFBLElBQ1Y7QUFBQSxJQUNBLGFBQWE7QUFBQSxJQUNiLFNBQVM7QUFBQSxFQUNYLENBQUM7QUFFSCxRQUFNLEVBQUUsY0FBYyxhQUFhLG1CQUFtQixJQUFJLHdCQUF3QjtBQUFBLElBQ2hGO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0Esb0JBQW9CO0FBQUEsSUFDcEI7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRixDQUFDO0FBRUQsUUFBTSxhQUFhLEtBQUssTUFBTSxTQUFTLEtBQUssU0FBUztBQUVyRCwwQkFBd0I7QUFBQSxJQUN0QixhQUFhO0FBQUEsSUFDYjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0EsNkJBQTZCO0FBQUEsSUFDN0I7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRixDQUFDO0FBRUQsd0JBQXNCO0FBQUEsSUFDcEIsYUFBYTtBQUFBLElBQ2I7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0EsNkJBQTZCO0FBQUEsSUFDN0I7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGLENBQUM7QUFFRCwyQkFBeUIsRUFBRSxXQUFXLFNBQVMsZUFBZSxpQkFBaUIsQ0FBQztBQUVoRixRQUFNLGlCQUFpQixxQkFBcUI7QUFBQSxJQUMxQztBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBLGVBQWU7QUFBQSxJQUNmLFdBQVc7QUFBQSxJQUNYLFlBQVk7QUFBQSxJQUNaO0FBQUEsSUFDQSxhQUFhO0FBQUEsRUFDZixDQUFDO0FBRUQsUUFBTTtBQUFBLElBQ0o7QUFBQSxJQUFlO0FBQUEsSUFBZ0I7QUFBQSxJQUFpQjtBQUFBLElBQ2hEO0FBQUEsSUFBc0I7QUFBQSxJQUFzQjtBQUFBLEVBQzlDLElBQUkseUJBQXlCO0FBQUEsSUFDM0I7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0YsQ0FBQztBQUVELFFBQU0sRUFBRSxjQUFjLElBQUksd0JBQXdCO0FBQUEsSUFDaEQ7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0YsQ0FBQztBQUVELFFBQU07QUFBQSxJQUNKO0FBQUEsSUFBVztBQUFBLElBQVM7QUFBQSxJQUFhO0FBQUEsSUFBVztBQUFBLElBQWE7QUFBQSxJQUFjO0FBQUEsSUFDdkU7QUFBQSxJQUFnQjtBQUFBLElBQWdCO0FBQUEsSUFBd0I7QUFBQSxJQUFzQjtBQUFBLElBQzlFO0FBQUEsSUFBWTtBQUFBLElBQVk7QUFBQSxJQUFhO0FBQUEsSUFBWTtBQUFBLElBQWU7QUFBQSxJQUFtQjtBQUFBLElBQ25GO0FBQUEsSUFBYztBQUFBLElBQXNCO0FBQUEsSUFBYTtBQUFBLElBQWM7QUFBQSxFQUNqRSxJQUFJLGlCQUFpQixNQUFNO0FBQzNCLFFBQU0sb0JBQW9CO0FBQzFCLFFBQU0sY0FBYyxDQUFDLGVBQWUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQ3JELFFBQU0sY0FBYyxDQUFDO0FBQ3JCLFFBQU0sbUJBQW1CLHNCQUFzQixZQUFZO0FBQzNELFFBQU0sb0JBQW9CLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxXQUFXLENBQUM7QUFFdkQsU0FDRSw4Q0FBQyxTQUFJLFdBQVUsc0RBQ1o7QUFBQSxtQkFDQyw2Q0FBQyxTQUFJLFdBQVUseURBQ2I7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLGtCQUFrQjtBQUFBLFFBQ2xCLGdCQUFnQjtBQUFBLFFBQ2hCLFdBQVcsWUFBWSxjQUFjLFdBQVcsTUFBTSxJQUFJO0FBQUEsUUFDMUQsU0FBUyxVQUFVLGNBQWMsU0FBUyxNQUFNLElBQUk7QUFBQSxRQUNwRDtBQUFBLFFBQ0EsYUFBYSxnQkFBZ0IsUUFBUTtBQUFBLFFBQ3JDLFlBQVksQ0FBQyxDQUFDO0FBQUEsUUFDZDtBQUFBLFFBQ0EsWUFBWTtBQUFBLFFBQ1osV0FBVyxDQUFDLENBQUM7QUFBQTtBQUFBLElBQ2YsR0FDRjtBQUFBLElBRUQsZUFDQztBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0M7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0Esa0JBQWtCO0FBQUEsUUFDbEIsZ0JBQWdCO0FBQUEsUUFDaEIsV0FBVyxZQUFZLGNBQWMsV0FBVyxNQUFNLElBQUk7QUFBQSxRQUMxRCxTQUFTLFVBQVUsY0FBYyxTQUFTLE1BQU0sSUFBSTtBQUFBLFFBQ3BEO0FBQUEsUUFDQSxZQUFZO0FBQUEsUUFDWjtBQUFBLFFBQ0E7QUFBQSxRQUNBLGdCQUFnQixtQkFBbUIsQ0FBQztBQUFBLFFBQ3BDLGNBQWMsbUJBQW1CLENBQUM7QUFBQSxRQUNsQztBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0EsZUFBZSxZQUFZLGNBQWMsV0FBVyxNQUFNLElBQUk7QUFBQSxRQUM5RCxhQUFhLFVBQVUsY0FBYyxTQUFTLE1BQU0sSUFBSTtBQUFBLFFBQ3hEO0FBQUEsUUFDQSxrQkFBa0IsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQUEsUUFDbkMsWUFBWTtBQUFBLFFBQ1o7QUFBQSxRQUNBLFlBQVksa0JBQWtCLFVBQVUseUJBQXlCO0FBQUEsUUFDakUsVUFBVTtBQUFBLFFBQ1Y7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0EsdUJBQXVCO0FBQUEsUUFDdkI7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0EsZ0JBQWdCLHlCQUF5QixFQUFFLE9BQU8saUNBQWlDLE1BQU0sY0FBYyxJQUFJO0FBQUEsUUFDM0c7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQSxlQUFlO0FBQUEsUUFDZixlQUFlO0FBQUEsUUFDZixvQkFBb0I7QUFBQSxRQUNwQixrQkFBa0I7QUFBQSxRQUNsQixhQUFhO0FBQUEsUUFDYixhQUFhO0FBQUEsUUFDYixhQUFhO0FBQUEsUUFDYixrQkFBa0I7QUFBQSxRQUNsQixZQUFZO0FBQUEsUUFDWixZQUFZO0FBQUEsUUFDWixrQkFBa0I7QUFBQSxRQUNsQixlQUFlO0FBQUEsUUFDZixnQkFBZ0I7QUFBQSxRQUNoQixnQkFBZ0IsTUFBTTtBQUNwQix1QkFBYSxFQUFFLFlBQVksTUFBTSxNQUFNLEVBQUUsQ0FBQztBQUFBLFFBQzVDO0FBQUE7QUFBQSxJQUNGO0FBQUEsSUFHRiw2Q0FBQyxXQUFNLE1BQUssVUFBUyxJQUFHLFlBQVcsT0FBTyxlQUFlLFVBQVEsTUFBQztBQUFBLElBQ2xFLDZDQUFDLFdBQU0sTUFBSyxVQUFTLElBQUcsVUFBUyxPQUFPLGFBQWEsVUFBUSxNQUFDO0FBQUEsSUFFOUQ7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQSxZQUFZO0FBQUEsUUFDWjtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQSxZQUFZO0FBQUEsUUFDWjtBQUFBLFFBQ0EsWUFBWTtBQUFBLFFBQ1osY0FBYztBQUFBO0FBQUEsSUFDaEI7QUFBQSxJQUNDLGtCQUNDO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQyxPQUFNO0FBQUEsUUFDTixXQUFXO0FBQUEsUUFDWCxNQUFNO0FBQUEsUUFDTixPQUFPO0FBQUEsUUFDUCxRQUFRO0FBQUE7QUFBQSxJQUNWO0FBQUEsS0FFSjtBQUVKO0FBR08sSUFBTSxtQkFBbUIsQ0FBQyxTQUFzQjtBQUNyRCxRQUFNLGtCQUFrQixLQUFLLGFBQWEsbUJBQW1CLEtBQUs7QUFDbEUsUUFBTSxnQkFBZ0IsS0FBSyxhQUFhLGlCQUFpQixLQUFLO0FBQzlELFFBQU0sWUFBWSxLQUFLLGFBQWEsaUJBQWlCLEtBQUs7QUFDMUQsUUFBTSxXQUFXLEtBQUssYUFBYSxpQkFBaUIsS0FBSztBQUN6RCxRQUFNLHNCQUFzQixLQUFLLGFBQWEsMkJBQTJCLEtBQUs7QUFFOUU7QUFBQSxJQUNFO0FBQUEsSUFDQTtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0M7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUE7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGO0FBRUEsSUFBTSxRQUFRLE1BQU07QUFDbEIsUUFBTSxTQUFTLFNBQVMsZUFBZSxzQkFBc0I7QUFDN0QsTUFBSSxDQUFDLE9BQVE7QUFDYixtQkFBaUIsTUFBTTtBQUN6QjtBQUVBLHVCQUF1QixLQUFLO0FBRTVCLElBQU8sc0JBQVE7IiwKICAibmFtZXMiOiBbImltcG9ydF9yZWFjdCIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSIsICJSZWFjdCIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X3JlYWN0IiwgImxvZ0hpc3RvcnkiLCAidG9JU08iLCAiaXNCZWZvcmUiLCAiZm9ybWF0TW9udGhMYWJlbCIsICJpbXBvcnRfcmVhY3QiLCAibm9ybWFsaXplUmFuZ2UiLCAiaW1wb3J0X3JlYWN0IiwgImxvZ0hpc3RvcnkiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAibG9nSGlzdG9yeSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImxvZ0hpc3RvcnkiLCAidG9UaXRsZUNhc2UiLCAiZm9ybWF0RGF0ZVBhcnRzIiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAibm9ybWFsaXplUmFuZ2UiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJsb2dIaXN0b3J5IiwgInBhcnNlRGF0ZVZhbHVlIiwgInBhcnNlSVNPIiwgInRvSVNPIiwgInN0YXJ0T2ZEYXkiLCAiaXNCZWZvcmUiLCAibmV3U3RhcnQiLCAiaW1wb3J0X2pzeF9ydW50aW1lIl0KfQo=
