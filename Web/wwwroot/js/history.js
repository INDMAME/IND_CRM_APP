import {
  ClientSearchCombobox_default
} from "./chunks/chunk-A6URYQYK.js";
import {
  buildVisibleUserByOwnerMap,
  formatModuleVisibleUserLabel,
  getVisibleUserForOwner,
  normalizeOwnerAxUserId,
  useModuleDataVisibility
} from "./chunks/chunk-BHTW7YTR.js";
import {
  ActionButton_default,
  FilterButton_default,
  HistoryManualDatePicker_default,
  HistorySummary_default
} from "./chunks/chunk-KXW5U6SP.js";
import "./chunks/chunk-DG56V5LO.js";
import {
  FloatingActionButton_default
} from "./chunks/chunk-LZSH3IN4.js";
import {
  CompactPagination_default,
  useTimelineCardEffects
} from "./chunks/chunk-GLDIL3AG.js";
import "./chunks/chunk-YMDESVRK.js";
import {
  SelectCombobox_default
} from "./chunks/chunk-SSILOGLX.js";
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
        selectedTextMode: "text",
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
    const showDescription = item.hasDescription || item.isNoData;
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
            showDescription ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "timeline-desc-text", "data-fulltext": item.fullDesc || item.description, children: item.description || noDataText }) : null
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
var EMPTY_DESCRIPTION_LABELS = /* @__PURE__ */ new Set(["sin datos", "no data"]);
var hasRealDescription = (value, noDataText) => {
  const normalizedValue = value.trim().toLocaleLowerCase();
  if (!normalizedValue) return false;
  const normalizedNoDataText = noDataText.trim().toLocaleLowerCase();
  return normalizedValue !== normalizedNoDataText && !EMPTY_DESCRIPTION_LABELS.has(normalizedValue);
};
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
      const hasDescription = hasRealDescription(rawDesc, noDataText);
      const fullDesc = hasDescription ? rawDesc : "";
      const isNoDataCard = !rawName && !hasDescription;
      if (isNoDataCard) {
        linkId = "";
      }
      return {
        id: linkId,
        actividadId,
        recId,
        name: fullName,
        description: hasDescription ? fullDesc : isNoDataCard ? noDataText : "",
        fullName,
        fullDesc,
        hasDescription,
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvaGlzdG9yaWFsL0hpc3RvcnlQYWdlLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9oaXN0b3JpYWwvVmlzaWJsZVZpc2l0T3duZXJTZWxlY3QudHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy92aXNpdGFzL2hpc3RvcmlhbC9oaXN0b3J5VmlzaWJsZU93bmVyU2VsZWN0aW9uLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy92aXNpdGFzL2hpc3RvcmlhbC9IaXN0b3J5RmlsdGVyUGFuZWwudHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy92aXNpdGFzL2hpc3RvcmlhbC9IaXN0b3J5VGFibGUudHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy92aXNpdGFzL2hpc3RvcmlhbC9IaXN0b3J5UmVzdWx0c1NlY3Rpb24udHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy92aXNpdGFzL2hpc3RvcmlhbC91c2VIaXN0b3J5Q2FsZW5kYXJQaWNrZXIudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvaGlzdG9yaWFsL3VzZUhpc3RvcnlGaWx0ZXJBY3Rpb25zLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy92aXNpdGFzL2hpc3RvcmlhbC91c2VIaXN0b3J5SW5pdGlhbExvYWQudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvaGlzdG9yaWFsL3VzZUhpc3RvcnlMYWJlbHMudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvaGlzdG9yaWFsL3VzZUhpc3RvcnlOYXZpZ2F0aW9uLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy92aXNpdGFzL2hpc3RvcmlhbC91c2VIaXN0b3J5UGFnZUxpc3RlbmVycy50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9oaXN0b3JpYWwvdXNlSGlzdG9yeVBpY2tlclN0ZXBTeW5jLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy92aXNpdGFzL2hpc3RvcmlhbC91c2VIaXN0b3J5VGltZWxpbmVJdGVtcy50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9oaXN0b3JpYWwvdXNlSGlzdG9yeVZpc2libGVPd25lci50cyIsICIuLi9yZWFjdC9zcmMvaG9va3MvdXNlSGlzdG9yeUFjdGl2aXRpZXMudHMiLCAiLi4vcmVhY3Qvc3JjL2hvb2tzL3VzZUhpc3RvcnlGaWx0ZXJDYWNoZS50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9oaXN0b3JpYWwvdXNlSGlzdG9yeUZpbHRlcnNTdGF0ZS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IFJlYWN0LCB7IHVzZU1lbW8sIHVzZVJlZiB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHsgY2FuQWNjZXNzLCBzaG93UGVybWlzc2lvbk1vZGFsIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3Blcm1pc3Npb25zLnRzXCI7XHJcbmltcG9ydCBIaXN0b3J5U3VtbWFyeSBmcm9tIFwiLi9IaXN0b3J5U3VtbWFyeS50c3hcIjtcclxuaW1wb3J0IEhpc3RvcnlGaWx0ZXJQYW5lbCBmcm9tIFwiLi9IaXN0b3J5RmlsdGVyUGFuZWwudHN4XCI7XHJcbmltcG9ydCBIaXN0b3J5UmVzdWx0c1NlY3Rpb24gZnJvbSBcIi4vSGlzdG9yeVJlc3VsdHNTZWN0aW9uLnRzeFwiO1xyXG5pbXBvcnQgeyB1c2VIaXN0b3J5Q2FsZW5kYXJQaWNrZXIgfSBmcm9tIFwiLi91c2VIaXN0b3J5Q2FsZW5kYXJQaWNrZXIudHNcIjtcclxuaW1wb3J0IHsgdXNlSGlzdG9yeUZpbHRlckFjdGlvbnMgfSBmcm9tIFwiLi91c2VIaXN0b3J5RmlsdGVyQWN0aW9ucy50c1wiO1xyXG5pbXBvcnQgeyB1c2VIaXN0b3J5SW5pdGlhbExvYWQgfSBmcm9tIFwiLi91c2VIaXN0b3J5SW5pdGlhbExvYWQudHNcIjtcclxuaW1wb3J0IHsgdXNlSGlzdG9yeUxhYmVscyB9IGZyb20gXCIuL3VzZUhpc3RvcnlMYWJlbHMudHNcIjtcclxuaW1wb3J0IHsgdXNlSGlzdG9yeU5hdmlnYXRpb24gfSBmcm9tIFwiLi91c2VIaXN0b3J5TmF2aWdhdGlvbi50c1wiO1xyXG5pbXBvcnQgeyB1c2VIaXN0b3J5UGFnZUxpc3RlbmVycyB9IGZyb20gXCIuL3VzZUhpc3RvcnlQYWdlTGlzdGVuZXJzLnRzXCI7XHJcbmltcG9ydCB7IHVzZUhpc3RvcnlQaWNrZXJTdGVwU3luYyB9IGZyb20gXCIuL3VzZUhpc3RvcnlQaWNrZXJTdGVwU3luYy50c1wiO1xyXG5pbXBvcnQgeyB1c2VIaXN0b3J5VGltZWxpbmVJdGVtcyB9IGZyb20gXCIuL3VzZUhpc3RvcnlUaW1lbGluZUl0ZW1zLnRzXCI7XHJcbmltcG9ydCB7IHVzZUhpc3RvcnlWaXNpYmxlT3duZXIgfSBmcm9tIFwiLi91c2VIaXN0b3J5VmlzaWJsZU93bmVyLnRzXCI7XHJcbmltcG9ydCB7IEhJU1RPUllfVklTSUJMRV9PV05FUl9BTExfVkFMVUUgfSBmcm9tIFwiLi9oaXN0b3J5VmlzaWJsZU93bmVyU2VsZWN0aW9uLnRzXCI7XHJcbmltcG9ydCBGbG9hdGluZ0FjdGlvbkJ1dHRvbiBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0Zsb2F0aW5nQWN0aW9uQnV0dG9uLnRzeFwiO1xyXG5pbXBvcnQgeyB1c2VIaXN0b3J5QWN0aXZpdGllcyB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VIaXN0b3J5QWN0aXZpdGllcy50c1wiO1xyXG5pbXBvcnQgeyB1c2VIaXN0b3J5RmlsdGVyQ2FjaGUgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlSGlzdG9yeUZpbHRlckNhY2hlLnRzXCI7XHJcbmltcG9ydCB7IHVzZUhpc3RvcnlGaWx0ZXJzU3RhdGUgfSBmcm9tIFwiLi91c2VIaXN0b3J5RmlsdGVyc1N0YXRlLnRzXCI7XHJcbmltcG9ydCB7IG1vdW50UmVhY3RJc2xhbmQsIG1vdW50V2hlbkRvY3VtZW50UmVhZHkgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvcmVhY3RJc2xhbmQudHN4XCI7XHJcblxyXG50eXBlIFByb3BzID0ge1xyXG4gIGRlZmF1bHRGcm9tRGF0ZT86IHN0cmluZztcclxuICBkZWZhdWx0VG9EYXRlPzogc3RyaW5nO1xyXG4gIGNvbXBhbnlJZD86IHN0cmluZztcclxuICBheFVzZXJJZD86IHN0cmluZztcclxuICBwZXJtaXNzaW9uc1JldmlzaW9uPzogc3RyaW5nO1xyXG59O1xyXG5cclxuY29uc3QgUEFHRV9TSVpFID0gNjtcclxuY29uc3QgUEFHRV9XSU5ET1cgPSA2O1xyXG5jb25zdCBOQVZfREVMQVlfTVMgPSAzMjA7XHJcbmNvbnN0IEZBQl9CQVNFX0JPVFRPTSA9IDMyO1xyXG5cclxuY29uc3Qgbm9ybWFsaXplVWlMb2NhbGUgPSAobG9jYWxlOiBzdHJpbmcpID0+IHtcclxuICBjb25zdCB2YWx1ZSA9IFN0cmluZyhsb2NhbGUgfHwgXCJcIikudHJpbSgpO1xyXG4gIGlmICghdmFsdWUpIHJldHVybiBcImVzLUVTXCI7XHJcbiAgaWYgKC9eemgtaGFucy9pLnRlc3QodmFsdWUpKSByZXR1cm4gXCJ6aC1DTlwiO1xyXG4gIHJldHVybiB2YWx1ZTtcclxufTtcclxuXHJcbmNvbnN0IGlzQmFzcXVlTG9jYWxlID0gKGxvY2FsZTogc3RyaW5nKSA9PiAvXmV1XFxiL2kudGVzdChTdHJpbmcobG9jYWxlIHx8IFwiXCIpKTtcclxuXHJcbmNvbnN0IEJBU1FVRV9NT05USFMgPSBbXHJcbiAgXCJ1cnRhcnJpbGFcIixcclxuICBcIm90c2FpbGFcIixcclxuICBcIm1hcnR4b2FcIixcclxuICBcImFwaXJpbGFcIixcclxuICBcIm1haWF0emFcIixcclxuICBcImVrYWluYVwiLFxyXG4gIFwidXp0YWlsYVwiLFxyXG4gIFwiYWJ1enR1YVwiLFxyXG4gIFwiaXJhaWxhXCIsXHJcbiAgXCJ1cnJpYVwiLFxyXG4gIFwiYXphcm9hXCIsXHJcbiAgXCJhYmVuZHVhXCIsXHJcbl07XHJcblxyXG5jb25zdCBCQVNRVUVfTU9OVEhTX1NIT1JUID0gW1xyXG4gIFwidXJ0XCIsXHJcbiAgXCJvdHNcIixcclxuICBcIm1hclwiLFxyXG4gIFwiYXBpXCIsXHJcbiAgXCJtYWlcIixcclxuICBcImVrYVwiLFxyXG4gIFwidXp0XCIsXHJcbiAgXCJhYnVcIixcclxuICBcImlyYVwiLFxyXG4gIFwidXJyXCIsXHJcbiAgXCJhemFcIixcclxuICBcImFiZVwiLFxyXG5dO1xyXG5cclxuY29uc3QgWkhfTU9OVEhfWUVBUl9GT1JNQVRURVIgPSBuZXcgSW50bC5EYXRlVGltZUZvcm1hdChcInpoLUNOXCIsIHsgeWVhcjogXCJudW1lcmljXCIsIG1vbnRoOiBcImxvbmdcIiB9KTtcclxuXHJcbmNvbnN0IGdldFVpTG9jYWxlID0gKCkgPT4ge1xyXG4gIGNvbnN0IGZyb21IdG1sID0gdHlwZW9mIGRvY3VtZW50ICE9PSBcInVuZGVmaW5lZFwiID8gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmxhbmcgOiBcIlwiO1xyXG4gIGlmIChmcm9tSHRtbCAmJiBTdHJpbmcoZnJvbUh0bWwpLnRyaW0oKSkgcmV0dXJuIG5vcm1hbGl6ZVVpTG9jYWxlKGZyb21IdG1sKTtcclxuICByZXR1cm4gXCJlcy1FU1wiO1xyXG59O1xyXG5cclxuY29uc3QgcGFkID0gKG46IG51bWJlcikgPT4gbi50b1N0cmluZygpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcclxuXHJcbmNvbnN0IHRvSVNPID0gKGQ6IERhdGUpID0+IGAke2QuZ2V0RnVsbFllYXIoKX0tJHtwYWQoZC5nZXRNb250aCgpICsgMSl9LSR7cGFkKGQuZ2V0RGF0ZSgpKX1gO1xyXG5cclxuY29uc3Qgc3RhcnRPZkRheSA9IChkOiBEYXRlKSA9PiBuZXcgRGF0ZShkLmdldEZ1bGxZZWFyKCksIGQuZ2V0TW9udGgoKSwgZC5nZXREYXRlKCkpO1xyXG5cclxuY29uc3QgcGFyc2VJU08gPSAoczogc3RyaW5nKSA9PiB7XHJcbiAgaWYgKCFzKSByZXR1cm4gbnVsbDtcclxuICBjb25zdCBwYXJ0cyA9IHMuc3BsaXQoXCItXCIpLm1hcChOdW1iZXIpO1xyXG4gIGlmIChwYXJ0cy5sZW5ndGggIT09IDMpIHJldHVybiBudWxsO1xyXG4gIHJldHVybiBuZXcgRGF0ZShwYXJ0c1swXSwgcGFydHNbMV0gLSAxLCBwYXJ0c1syXSk7XHJcbn07XHJcblxyXG5jb25zdCBpc0JlZm9yZSA9IChhOiBEYXRlIHwgbnVsbCwgYjogRGF0ZSB8IG51bGwpID0+ICEhKGEgJiYgYiAmJiBhLmdldFRpbWUoKSA8IGIuZ2V0VGltZSgpKTtcclxuXHJcbmNvbnN0IG5vcm1hbGl6ZVJhbmdlID0gKGZyb206IHN0cmluZywgdG86IHN0cmluZykgPT4ge1xyXG4gIGlmICghZnJvbSB8fCAhdG8pIHJldHVybiB7IGZyb20sIHRvIH07XHJcbiAgY29uc3QgZnJvbURhdGUgPSBwYXJzZUlTTyhmcm9tKTtcclxuICBjb25zdCB0b0RhdGUgPSBwYXJzZUlTTyh0byk7XHJcbiAgaWYgKCFmcm9tRGF0ZSB8fCAhdG9EYXRlKSByZXR1cm4geyBmcm9tLCB0byB9O1xyXG4gIGlmIChpc0JlZm9yZSh0b0RhdGUsIGZyb21EYXRlKSkge1xyXG4gICAgcmV0dXJuIHsgZnJvbTogdG9JU08odG9EYXRlKSwgdG86IHRvSVNPKGZyb21EYXRlKSB9O1xyXG4gIH1cclxuICByZXR1cm4geyBmcm9tOiB0b0lTTyhmcm9tRGF0ZSksIHRvOiB0b0lTTyh0b0RhdGUpIH07XHJcbn07XHJcblxyXG5jb25zdCBmb3JtYXREaXNwbGF5ID0gKGQ6IERhdGUsIGxvY2FsZTogc3RyaW5nKSA9PiB7XHJcbiAgaWYgKGlzQmFzcXVlTG9jYWxlKGxvY2FsZSkpIHtcclxuICAgIGNvbnN0IG1vbnRoID0gQkFTUVVFX01PTlRIU19TSE9SVFtkLmdldE1vbnRoKCldO1xyXG4gICAgcmV0dXJuIGAke2QuZ2V0RGF0ZSgpfSAke21vbnRofSAke2QuZ2V0RnVsbFllYXIoKX1gLnRvTG93ZXJDYXNlKCk7XHJcbiAgfVxyXG4gIHJldHVybiBkXHJcbiAgICAudG9Mb2NhbGVEYXRlU3RyaW5nKGxvY2FsZSwge1xyXG4gICAgICBkYXk6IFwibnVtZXJpY1wiLFxyXG4gICAgICBtb250aDogXCJzaG9ydFwiLFxyXG4gICAgICB5ZWFyOiBcIm51bWVyaWNcIixcclxuICAgIH0pXHJcbiAgICAucmVwbGFjZSgvXFwuL2csIFwiXCIpXHJcbiAgICAudG9Mb3dlckNhc2UoKTtcclxufTtcclxuXHJcbmNvbnN0IGZvcm1hdE1vbnRoTGFiZWwgPSAoZDogRGF0ZSwgbG9jYWxlOiBzdHJpbmcpID0+IHtcclxuICBpZiAoL156aC9pLnRlc3QobG9jYWxlKSkge1xyXG4gICAgcmV0dXJuIFpIX01PTlRIX1lFQVJfRk9STUFUVEVSLmZvcm1hdChkKTtcclxuICB9XHJcbiAgaWYgKGlzQmFzcXVlTG9jYWxlKGxvY2FsZSkpIHtcclxuICAgIHJldHVybiBgJHtCQVNRVUVfTU9OVEhTW2QuZ2V0TW9udGgoKV19ICR7ZC5nZXRGdWxsWWVhcigpfWA7XHJcbiAgfVxyXG4gIGNvbnN0IG1vbnRoTmFtZSA9IGQudG9Mb2NhbGVEYXRlU3RyaW5nKGxvY2FsZSwgeyBtb250aDogXCJsb25nXCIgfSk7XHJcbiAgY29uc3QgY2FwTW9udGhOYW1lID0gbW9udGhOYW1lICYmIC9bQS1aYS16XS8udGVzdChtb250aE5hbWVbMF0pXHJcbiAgICA/IG1vbnRoTmFtZVswXS50b0xvY2FsZVVwcGVyQ2FzZShsb2NhbGUpICsgbW9udGhOYW1lLnNsaWNlKDEpXHJcbiAgICA6IG1vbnRoTmFtZTtcclxuICByZXR1cm4gYCR7Y2FwTW9udGhOYW1lfSAke2QuZ2V0RnVsbFllYXIoKX1gO1xyXG59O1xyXG5cclxuY29uc3QgcGFyc2VEYXRlVmFsdWUgPSAodmFsdWU6IHN0cmluZykgPT4ge1xyXG4gIGlmICghdmFsdWUpIHJldHVybiBudWxsO1xyXG4gIGNvbnN0IHJhdyA9IFN0cmluZyh2YWx1ZSkudHJpbSgpO1xyXG4gIGlmICghcmF3KSByZXR1cm4gbnVsbDtcclxuXHJcbiAgY29uc3QgZGF0ZVBhcnQgPSByYXcuc3BsaXQoXCJUXCIpWzBdLnNwbGl0KFwiIFwiKVswXTtcclxuXHJcbiAgaWYgKC9eXFxkezR9LVxcZHsyfS1cXGR7Mn0kLy50ZXN0KGRhdGVQYXJ0KSkge1xyXG4gICAgY29uc3QgW3ksIG0sIGRdID0gZGF0ZVBhcnQuc3BsaXQoXCItXCIpLm1hcChOdW1iZXIpO1xyXG4gICAgcmV0dXJuIG5ldyBEYXRlKHksIG0gLSAxLCBkKTtcclxuICB9XHJcblxyXG4gIGlmICgvXlxcZHsyfVsuLy1dXFxkezJ9Wy4vLV1cXGR7NH0kLy50ZXN0KGRhdGVQYXJ0KSkge1xyXG4gICAgY29uc3QgcGFydHMgPSBkYXRlUGFydC5zcGxpdCgvWy4vLV0vKS5tYXAoTnVtYmVyKTtcclxuICAgIGNvbnN0IFtkLCBtLCB5XSA9IHBhcnRzO1xyXG4gICAgcmV0dXJuIG5ldyBEYXRlKHksIG0gLSAxLCBkKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHBhcnNlZCA9IG5ldyBEYXRlKHJhdyk7XHJcbiAgcmV0dXJuIE51bWJlci5pc05hTihwYXJzZWQuZ2V0VGltZSgpKSA/IG51bGwgOiBwYXJzZWQ7XHJcbn07XHJcblxyXG5jb25zdCBmb3JtYXREYXRlUGFydHMgPSAodmFsdWU6IHN0cmluZywgbG9jYWxlOiBzdHJpbmcpID0+IHtcclxuICBpZiAoIXZhbHVlKSByZXR1cm4geyB5ZWFyOiBcIlwiLCBtb250aDogXCJcIiwgZGF5OiBcIlwiIH07XHJcbiAgY29uc3QgZCA9IHBhcnNlRGF0ZVZhbHVlKHZhbHVlKTtcclxuICBpZiAoIWQpIHJldHVybiB7IHllYXI6IFwiXCIsIG1vbnRoOiBcIlwiLCBkYXk6IFwiXCIgfTtcclxuICBsZXQgbW9udGggPSBcIlwiO1xyXG4gIGlmIChpc0Jhc3F1ZUxvY2FsZShsb2NhbGUpKSB7XHJcbiAgICBtb250aCA9IEJBU1FVRV9NT05USFNfU0hPUlRbZC5nZXRNb250aCgpXSB8fCBcIlwiO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBtb250aCA9IGQudG9Mb2NhbGVEYXRlU3RyaW5nKGxvY2FsZSwgeyBtb250aDogXCJzaG9ydFwiIH0pLnJlcGxhY2UoL1xcLi9nLCBcIlwiKTtcclxuICB9XHJcbiAgcmV0dXJuIHtcclxuICAgIHllYXI6IFN0cmluZyhkLmdldEZ1bGxZZWFyKCkpLFxyXG4gICAgbW9udGg6IG1vbnRoLnRvVXBwZXJDYXNlKCksXHJcbiAgICBkYXk6IFN0cmluZyhkLmdldERhdGUoKSkucGFkU3RhcnQoMiwgXCIwXCIpLFxyXG4gIH07XHJcbn07XHJcblxyXG5jb25zdCB0b1RpdGxlQ2FzZSA9ICh2YWx1ZTogc3RyaW5nLCBsb2NhbGU6IHN0cmluZykgPT4ge1xyXG4gIGlmICghdmFsdWUpIHJldHVybiBcIlwiO1xyXG4gIGNvbnN0IGxvd2VyID0gdmFsdWUudG9Mb2NhbGVMb3dlckNhc2UobG9jYWxlKTtcclxuICB0cnkge1xyXG4gICAgcmV0dXJuIGxvd2VyLnJlcGxhY2UoLyhefFteXFxwe0x9XSkoXFxwe0x9KS9ndSwgKF9tYXRjaCwgcHJlZml4LCBjaCkgPT4gYCR7cHJlZml4fSR7Y2gudG9Mb2NhbGVVcHBlckNhc2UobG9jYWxlKX1gKTtcclxuICB9IGNhdGNoIHtcclxuICAgIHJldHVybiBsb3dlci5yZXBsYWNlKC8oXnxbXFxzLS9dKShcXFMpL2csIChfbWF0Y2gsIHByZWZpeCwgY2gpID0+IGAke3ByZWZpeH0ke2NoLnRvTG9jYWxlVXBwZXJDYXNlKGxvY2FsZSl9YCk7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgbG9nSGlzdG9yeSA9IChtZXNzYWdlOiBzdHJpbmcsIGRhdGE/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPikgPT4ge1xyXG4gIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm47XHJcbiAgY29uc3QgZGVidWdGbGFnID0gKHdpbmRvdyBhcyBhbnkpLl9fSU5EX0RFQlVHX0hJU1RPUllfXztcclxuICBpZiAoZGVidWdGbGFnICE9PSB0cnVlKSByZXR1cm47XHJcbiAgaWYgKGRhdGEpIHtcclxuICAgIGNvbnNvbGUuZGVidWcoXCJbSGlzdG9yeV1cIiwgbWVzc2FnZSwgZGF0YSk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGNvbnNvbGUuZGVidWcoXCJbSGlzdG9yeV1cIiwgbWVzc2FnZSk7XHJcbiAgfVxyXG59O1xyXG5cclxuLy8gSGlzdG9yeSBwYWdlIHdpdGggUmVhY3Qgc3RhdGUgKyBlZmZlY3RzIChubyBsZWdhY3kgRE9NIGxvZ2ljKS5cclxuZXhwb3J0IGNvbnN0IEhpc3RvcnlQYWdlID0gKHtcclxuICBkZWZhdWx0RnJvbURhdGUgPSBcIlwiLFxyXG4gIGRlZmF1bHRUb0RhdGUgPSBcIlwiLFxyXG4gIGNvbXBhbnlJZCA9IFwiXCIsXHJcbiAgYXhVc2VySWQgPSBcIlwiLFxyXG4gIHBlcm1pc3Npb25zUmV2aXNpb24gPSBcIlwiLFxyXG59OiBQcm9wcykgPT4ge1xyXG4gIGNvbnN0IGxvY2FsZSA9IHVzZU1lbW8oKCkgPT4gZ2V0VWlMb2NhbGUoKSwgW10pO1xyXG4gIGNvbnN0IGNhblZpZXdIaXN0b3J5ID0gY2FuQWNjZXNzKFwiVklTSVRBU19HRVNUSU9OXCIsIFwiVmlld1wiKTtcclxuICBjb25zdCBjYW5DcmVhdGVWaXNpdCA9IGNhbkFjY2VzcyhcIlZJU0lUQVNfR0VTVElPTlwiLCBcIkFkZFwiKTtcclxuICBjb25zdCBub0RhdGFUZXh0ID0gaW5kVChcIkNvbW1vbl9Ob0RhdGFcIiwgXCJObyBkYXRhXCIpO1xyXG5cclxuICBjb25zdCBhY3RpdmF0b3JSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBwb3BvdmVyUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XHJcblxyXG4gIGNvbnN0IHsgcmVhZENhY2hlZEZpbHRlciwgY2xlYXJGaWx0ZXJDYWNoZSwgY29uc3VtZVJldHVybkZsYWcsIHNhdmVDYWNoZWRGaWx0ZXIgfSA9IHVzZUhpc3RvcnlGaWx0ZXJDYWNoZSgpO1xyXG4gIGNvbnN0IHtcclxuICAgIHN0YXJ0RGF0ZSwgZW5kRGF0ZSwgaG92ZXJEYXRlLCBzZWxlY3RpbmdTdGVwLCBjdXJyZW50TW9udGgsIGN1cnJlbnRZZWFyLCBpc09wZW4sIHNob3dNYW51YWxQaWNrZXJQYW5lbCxcclxuICAgIGFjdGl2ZVF1aWNrRmlsdGVyLCBzZWxlY3RlZENsaWVudCwgc2VsZWN0ZWRPd25lckF4VXNlcklkLCBjbGllbnRSZXNldEtleSwgc2hvd0ZpbHRlcnMsIHNob3dNYW51YWxFcnJvcixcclxuICAgIGZyb21EYXRlVmFsdWUsIHRvRGF0ZVZhbHVlLCBhY2NvdW50TnVtVmFsdWUsIGhhc1Jlc3RvcmVkRmlsdGVyUmVmLCBkaWRJbml0RmlsdGVyUmVmLFxyXG4gICAgc2V0SG92ZXJEYXRlLCBzZXRTZWxlY3RpbmdTdGVwLCBzZXRDdXJyZW50TW9udGgsIHNldEN1cnJlbnRZZWFyLCBzZXRJc09wZW4sIHNldFNob3dGaWx0ZXJzLCBzZXRTaG93TWFudWFsRXJyb3IsXHJcbiAgICBzZXRTZWxlY3RlZE93bmVyQXhVc2VySWQsIHZhbGlkYXRlTWFudWFsUmFuZ2UsIGFwcGx5RGVmYXVsdFJhbmdlRnJvbVByb3BzLCByZXNldEhpc3RvcnlGaWx0ZXJzLCBhcHBseUNhY2hlZEZpbHRlcixcclxuICAgIGhhbmRsZVNlbGVjdCwgaGFuZGxlQ2xlYXJTdGF0ZSwgb3BlblBvcG92ZXIsIGhhbmRsZUFjdGl2YXRvcktleURvd24sIGhhbmRsZVNlY3Rpb25LZXlEb3duLCBoYW5kbGVRdWlja0ZpbHRlcixcclxuICAgIGhhbmRsZUNsaWVudFNlbGVjdGVkLFxyXG4gIH0gPSB1c2VIaXN0b3J5RmlsdGVyc1N0YXRlKHtcclxuICAgIGRlZmF1bHRGcm9tRGF0ZSxcclxuICAgIGRlZmF1bHRUb0RhdGUsXHJcbiAgICBsb2dIaXN0b3J5LFxyXG4gICAgcGFyc2VEYXRlVmFsdWUsXHJcbiAgICBwYXJzZUlTTyxcclxuICAgIHRvSVNPLFxyXG4gICAgc3RhcnRPZkRheSxcclxuICAgIGlzQmVmb3JlLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCB7XHJcbiAgICB2aXNpYmxlVmlzaXRVc2VycyxcclxuICAgIHZpc2libGVVc2Vyc0xvYWRpbmcsXHJcbiAgICB2aXNpYmxlVXNlcnNFcnJvcixcclxuICAgIHZpc2libGVVc2Vyc1JlYWR5LFxyXG4gICAgb3duZXJTZWxlY3RWYWx1ZSxcclxuICAgIG93bmVyRmlsdGVyRGlzYWJsZWQsXHJcbiAgICBjYW5NYW5hZ2VWaXNpYmxlT3duZXJzLFxyXG4gICAgc2VsZWN0ZWRPd25lclRleHQsXHJcbiAgICBlZmZlY3RpdmVTZWxlY3RlZE93bmVyQXhVc2VySWQsXHJcbiAgICByZXNvbHZlRWZmZWN0aXZlT3duZXJBeFVzZXJJZCxcclxuICB9ID1cclxuICAgIHVzZUhpc3RvcnlWaXNpYmxlT3duZXIoe1xyXG4gICAgICBlbmFibGVkOiBjYW5WaWV3SGlzdG9yeSxcclxuICAgICAgY29tcGFueUlkLFxyXG4gICAgICBheFVzZXJJZCxcclxuICAgICAgcGVybWlzc2lvbnNSZXZpc2lvbixcclxuICAgICAgc2VsZWN0ZWRPd25lckF4VXNlcklkLFxyXG4gICAgICBvbkRlYnVnOiBsb2dIaXN0b3J5LFxyXG4gICAgfSk7XHJcblxyXG4gIGNvbnN0IHsgaXRlbXMsIHRvdGFsLCBjdXJyZW50UGFnZSwgaXNMb2FkaW5nLCBlcnJvck1lc3NhZ2UsIGxvYWRBY3Rpdml0aWVzLCByZXNldEFjdGl2aXRpZXMsIHJldHJ5T25OZXR3b3JrRXJyb3JSZWYsIGxhc3RTaWduYXR1cmVSZWYgfSA9XHJcbiAgICB1c2VIaXN0b3J5QWN0aXZpdGllcyh7XHJcbiAgICAgIGZyb21EYXRlVmFsdWUsXHJcbiAgICAgIHRvRGF0ZVZhbHVlLFxyXG4gICAgICBhY2NvdW50TnVtVmFsdWUsXHJcbiAgICAgIG93bmVyQXhVc2VySWRWYWx1ZTogZWZmZWN0aXZlU2VsZWN0ZWRPd25lckF4VXNlcklkLFxyXG4gICAgICBwYWdlU2l6ZTogUEFHRV9TSVpFLFxyXG4gICAgICBub3JtYWxpemVSYW5nZSxcclxuICAgICAgb25Gb3JiaWRkZW46IHNob3dQZXJtaXNzaW9uTW9kYWwsXHJcbiAgICAgIG9uRGVidWc6IGxvZ0hpc3RvcnksXHJcbiAgICB9KTtcclxuXHJcbiAgY29uc3QgeyBhcHBseUZpbHRlcnMsIGhhbmRsZUNsZWFyLCBoYW5kbGVSZXNldEZpbHRlcnMgfSA9IHVzZUhpc3RvcnlGaWx0ZXJBY3Rpb25zKHtcclxuICAgIHN0YXJ0RGF0ZSxcclxuICAgIGVuZERhdGUsXHJcbiAgICBmcm9tRGF0ZVZhbHVlLFxyXG4gICAgdG9EYXRlVmFsdWUsXHJcbiAgICBhY2NvdW50TnVtVmFsdWUsXHJcbiAgICBvd25lckF4VXNlcklkVmFsdWU6IGVmZmVjdGl2ZVNlbGVjdGVkT3duZXJBeFVzZXJJZCxcclxuICAgIGxhc3RTaWduYXR1cmVSZWYsXHJcbiAgICB2YWxpZGF0ZU1hbnVhbFJhbmdlLFxyXG4gICAgbm9ybWFsaXplUmFuZ2UsXHJcbiAgICBsb2FkQWN0aXZpdGllcyxcclxuICAgIGhhbmRsZUNsZWFyU3RhdGUsXHJcbiAgICBjbGVhckZpbHRlckNhY2hlLFxyXG4gICAgcmVzZXRBY3Rpdml0aWVzLFxyXG4gICAgcmVzZXRIaXN0b3J5RmlsdGVycyxcclxuICAgIHNldElzT3BlbixcclxuICAgIHNldFNob3dGaWx0ZXJzLFxyXG4gICAgc2V0U2hvd01hbnVhbEVycm9yLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCB0b3RhbFBhZ2VzID0gTWF0aC5jZWlsKCh0b3RhbCB8fCAwKSAvIFBBR0VfU0laRSk7XHJcblxyXG4gIHVzZUhpc3RvcnlQYWdlTGlzdGVuZXJzKHtcclxuICAgIHJlYWR5VG9Mb2FkOiB2aXNpYmxlVXNlcnNSZWFkeSxcclxuICAgIGlzT3BlbixcclxuICAgIGFjdGl2YXRvclJlZixcclxuICAgIHBvcG92ZXJSZWYsXHJcbiAgICBoYXNSZXN0b3JlZEZpbHRlclJlZixcclxuICAgIHJldHJ5T25OZXR3b3JrRXJyb3JSZWYsXHJcbiAgICBjdXJyZW50UGFnZSxcclxuICAgIGxvZ0hpc3RvcnksXHJcbiAgICBjb25zdW1lUmV0dXJuRmxhZyxcclxuICAgIHJlYWRDYWNoZWRGaWx0ZXIsXHJcbiAgICBhcHBseUNhY2hlZEZpbHRlcixcclxuICAgIHJlc29sdmVPd25lckF4VXNlcklkRm9yTG9hZDogcmVzb2x2ZUVmZmVjdGl2ZU93bmVyQXhVc2VySWQsXHJcbiAgICBsb2FkQWN0aXZpdGllcyxcclxuICAgIHNldElzT3BlbixcclxuICAgIHNldEhvdmVyRGF0ZSxcclxuICAgIHNldFNob3dGaWx0ZXJzLFxyXG4gICAgYXBwbHlGaWx0ZXJzLFxyXG4gIH0pO1xyXG5cclxuICB1c2VIaXN0b3J5SW5pdGlhbExvYWQoe1xyXG4gICAgcmVhZHlUb0xvYWQ6IHZpc2libGVVc2Vyc1JlYWR5LFxyXG4gICAgZGVmYXVsdEZyb21EYXRlLFxyXG4gICAgZGVmYXVsdFRvRGF0ZSxcclxuICAgIGRpZEluaXRGaWx0ZXJSZWYsXHJcbiAgICBoYXNSZXN0b3JlZEZpbHRlclJlZixcclxuICAgIHJldHJ5T25OZXR3b3JrRXJyb3JSZWYsXHJcbiAgICBjb25zdW1lUmV0dXJuRmxhZyxcclxuICAgIHJlYWRDYWNoZWRGaWx0ZXIsXHJcbiAgICBhcHBseUNhY2hlZEZpbHRlcixcclxuICAgIGFwcGx5RGVmYXVsdFJhbmdlRnJvbVByb3BzLFxyXG4gICAgcmVzb2x2ZU93bmVyQXhVc2VySWRGb3JMb2FkOiByZXNvbHZlRWZmZWN0aXZlT3duZXJBeFVzZXJJZCxcclxuICAgIGxvYWRBY3Rpdml0aWVzLFxyXG4gICAgcmVzZXRBY3Rpdml0aWVzLFxyXG4gICAgcmVzZXRIaXN0b3J5RmlsdGVycyxcclxuICAgIGNsZWFyRmlsdGVyQ2FjaGUsXHJcbiAgICBzZXRTaG93RmlsdGVycyxcclxuICAgIHNldElzT3BlbixcclxuICAgIGxvZ0hpc3RvcnksXHJcbiAgfSk7XHJcblxyXG4gIHVzZUhpc3RvcnlQaWNrZXJTdGVwU3luYyh7IHN0YXJ0RGF0ZSwgZW5kRGF0ZSwgc2VsZWN0aW5nU3RlcCwgc2V0U2VsZWN0aW5nU3RlcCB9KTtcclxuXHJcbiAgY29uc3QgaGFuZGxlTmF2aWdhdGUgPSB1c2VIaXN0b3J5TmF2aWdhdGlvbih7XHJcbiAgICBjYW5WaWV3SGlzdG9yeSxcclxuICAgIGN1cnJlbnRQYWdlLFxyXG4gICAgZnJvbURhdGVWYWx1ZSxcclxuICAgIHRvRGF0ZVZhbHVlLFxyXG4gICAgc2VsZWN0ZWRDbGllbnQsXHJcbiAgICBvd25lckF4VXNlcklkOiBlZmZlY3RpdmVTZWxlY3RlZE93bmVyQXhVc2VySWQsXHJcbiAgICBvd25lclRleHQ6IHNlbGVjdGVkT3duZXJUZXh0LFxyXG4gICAgbmF2RGVsYXlNczogTkFWX0RFTEFZX01TLFxyXG4gICAgc2F2ZUNhY2hlZEZpbHRlcixcclxuICAgIG9uRm9yYmlkZGVuOiBzaG93UGVybWlzc2lvbk1vZGFsLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCB7XHJcbiAgICBjYWxlbmRhckxhYmVsLCBtYW51YWxEYXlDZWxscywgaGFuZGxlUHJldk1vbnRoLCBoYW5kbGVOZXh0TW9udGgsXHJcbiAgICBoYW5kbGVHcmlkTW91c2VMZWF2ZSwgaGFuZGxlTWFudWFsRGF5Q2xpY2ssIGhhbmRsZU1hbnVhbERheUhvdmVyLFxyXG4gIH0gPSB1c2VIaXN0b3J5Q2FsZW5kYXJQaWNrZXIoe1xyXG4gICAgY3VycmVudE1vbnRoLFxyXG4gICAgY3VycmVudFllYXIsXHJcbiAgICBsb2NhbGUsXHJcbiAgICBzdGFydERhdGUsXHJcbiAgICBlbmREYXRlLFxyXG4gICAgaG92ZXJEYXRlLFxyXG4gICAgc2VsZWN0aW5nU3RlcCxcclxuICAgIHNldEN1cnJlbnRNb250aCxcclxuICAgIHNldEN1cnJlbnRZZWFyLFxyXG4gICAgc2V0SG92ZXJEYXRlLFxyXG4gICAgaGFuZGxlU2VsZWN0LFxyXG4gICAgbG9nSGlzdG9yeSxcclxuICAgIHRvSVNPLFxyXG4gICAgaXNCZWZvcmUsXHJcbiAgICBmb3JtYXRNb250aExhYmVsLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCB7IHRpbWVsaW5lSXRlbXMgfSA9IHVzZUhpc3RvcnlUaW1lbGluZUl0ZW1zKHtcclxuICAgIGl0ZW1zLFxyXG4gICAgbG9jYWxlLFxyXG4gICAgbm9EYXRhVGV4dCxcclxuICAgIGxvZ0hpc3RvcnksXHJcbiAgICB0b1RpdGxlQ2FzZSxcclxuICAgIGZvcm1hdERhdGVQYXJ0cyxcclxuICB9KTtcclxuXHJcbiAgY29uc3Qge1xyXG4gICAgbGFiZWxGcm9tLCBsYWJlbFRvLCBzdW1tYXJ5RnJvbSwgc3VtbWFyeVRvLCBmaWx0ZXJUaXRsZSwgYWRkRGF0ZUxhYmVsLCBjbGVhclJhbmdlTGFiZWwsXHJcbiAgICBwcmV2TW9udGhMYWJlbCwgbmV4dE1vbnRoTGFiZWwsIHN0YXR1c1NlbGVjdFN0YXJ0TGFiZWwsIHN0YXR1c1NlbGVjdEVuZExhYmVsLCB3ZWVrRGF5TGFiZWxzLFxyXG4gICAgY2xlYXJMYWJlbCwgYXBwbHlMYWJlbCwgY2xpZW50TGFiZWwsIG93bmVyTGFiZWwsIG93bmVyQWxsTGFiZWwsIG93bmVyTm9Vc2Vyc0xhYmVsLCBvd25lckxvYWRpbmdMYWJlbCxcclxuICAgIGxvYWRpbmdMYWJlbCwgbm9WaXNpdHNJblJhbmdlTGFiZWwsIGNyZWF0ZUxhYmVsLCBxdWlja0ZpbHRlcnMsIHBhZ2luYXRpb25MYWJlbHMsXHJcbiAgfSA9IHVzZUhpc3RvcnlMYWJlbHMobG9jYWxlKTtcclxuICBjb25zdCBzaG93RmlsdGVyQWN0aW9ucyA9IHNob3dGaWx0ZXJzO1xyXG4gIGNvbnN0IHNob3dTdW1tYXJ5ID0gIXNob3dGaWx0ZXJzICYmICEhc3RhcnREYXRlICYmICEhZW5kRGF0ZTtcclxuICBjb25zdCBzaG93UmVzdWx0cyA9ICFzaG93RmlsdGVycztcclxuICBjb25zdCBzaG93TWFudWFsUGlja2VyID0gYWN0aXZlUXVpY2tGaWx0ZXIgPT09IFwiY3VzdG9tXCIgJiYgc2hvd01hbnVhbFBpY2tlclBhbmVsO1xyXG4gIGNvbnN0IHNob3dJbmxpbmVTdW1tYXJ5ID0gISFzdGFydERhdGUgJiYgISFlbmREYXRlICYmICFzaG93TWFudWFsUGlja2VyO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJtYXgtdy0zeGwgbXgtYXV0byBweC0xIHNtOnB4LTIgcHQtMyBwYi00IHNwYWNlLXktMlwiPlxyXG4gICAgICB7c2hvd1N1bW1hcnkgJiYgKFxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmlsdGVyLWNhcmQgZmlsdGVyLWNhcmQtLXN1bW1hcnkgcC0zIHNtOnAtNCBtdC0xIG1iLTNcIj5cclxuICAgICAgICAgIDxIaXN0b3J5U3VtbWFyeVxyXG4gICAgICAgICAgICBzdW1tYXJ5RnJvbUxhYmVsPXtzdW1tYXJ5RnJvbX1cclxuICAgICAgICAgICAgc3VtbWFyeVRvTGFiZWw9e3N1bW1hcnlUb31cclxuICAgICAgICAgICAgZnJvbVZhbHVlPXtzdGFydERhdGUgPyBmb3JtYXREaXNwbGF5KHN0YXJ0RGF0ZSwgbG9jYWxlKSA6IFwiLS1cIn1cclxuICAgICAgICAgICAgdG9WYWx1ZT17ZW5kRGF0ZSA/IGZvcm1hdERpc3BsYXkoZW5kRGF0ZSwgbG9jYWxlKSA6IFwiLS1cIn1cclxuICAgICAgICAgICAgY2xpZW50TGFiZWw9e2NsaWVudExhYmVsfVxyXG4gICAgICAgICAgICBjbGllbnRWYWx1ZT17c2VsZWN0ZWRDbGllbnQ/LnRleHQgfHwgXCJcIn1cclxuICAgICAgICAgICAgc2hvd0NsaWVudD17ISFzZWxlY3RlZENsaWVudH1cclxuICAgICAgICAgICAgb3duZXJMYWJlbD17b3duZXJMYWJlbH1cclxuICAgICAgICAgICAgb3duZXJWYWx1ZT17c2VsZWN0ZWRPd25lclRleHR9XHJcbiAgICAgICAgICAgIHNob3dPd25lcj17ISFzZWxlY3RlZE93bmVyVGV4dH1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICl9XHJcbiAgICAgIHtzaG93RmlsdGVycyAmJiAoXHJcbiAgICAgICAgPEhpc3RvcnlGaWx0ZXJQYW5lbFxyXG4gICAgICAgICAgYWN0aXZhdG9yUmVmPXthY3RpdmF0b3JSZWZ9XHJcbiAgICAgICAgICBwb3BvdmVyUmVmPXtwb3BvdmVyUmVmfVxyXG4gICAgICAgICAgcXVpY2tGaWx0ZXJzPXtxdWlja0ZpbHRlcnN9XHJcbiAgICAgICAgICBhY3RpdmVRdWlja0ZpbHRlcj17YWN0aXZlUXVpY2tGaWx0ZXJ9XHJcbiAgICAgICAgICBzaG93SW5saW5lU3VtbWFyeT17c2hvd0lubGluZVN1bW1hcnl9XHJcbiAgICAgICAgICBzaG93TWFudWFsUGlja2VyPXtzaG93TWFudWFsUGlja2VyfVxyXG4gICAgICAgICAgc3VtbWFyeUZyb21MYWJlbD17c3VtbWFyeUZyb219XHJcbiAgICAgICAgICBzdW1tYXJ5VG9MYWJlbD17c3VtbWFyeVRvfVxyXG4gICAgICAgICAgZnJvbVZhbHVlPXtzdGFydERhdGUgPyBmb3JtYXREaXNwbGF5KHN0YXJ0RGF0ZSwgbG9jYWxlKSA6IFwiLS1cIn1cclxuICAgICAgICAgIHRvVmFsdWU9e2VuZERhdGUgPyBmb3JtYXREaXNwbGF5KGVuZERhdGUsIGxvY2FsZSkgOiBcIi0tXCJ9XHJcbiAgICAgICAgICBvd25lckxhYmVsPXtvd25lckxhYmVsfVxyXG4gICAgICAgICAgb3duZXJWYWx1ZT17c2VsZWN0ZWRPd25lclRleHR9XHJcbiAgICAgICAgICBmaWx0ZXJUaXRsZT17ZmlsdGVyVGl0bGV9XHJcbiAgICAgICAgICBzaG93TWFudWFsRXJyb3I9e3Nob3dNYW51YWxFcnJvcn1cclxuICAgICAgICAgIHNob3dTdGFydEVycm9yPXtzaG93TWFudWFsRXJyb3IgJiYgIXN0YXJ0RGF0ZX1cclxuICAgICAgICAgIHNob3dFbmRFcnJvcj17c2hvd01hbnVhbEVycm9yICYmICFlbmREYXRlfVxyXG4gICAgICAgICAgaXNPcGVuPXtpc09wZW59XHJcbiAgICAgICAgICBzZWxlY3RpbmdTdGVwPXtzZWxlY3RpbmdTdGVwfVxyXG4gICAgICAgICAgbGFiZWxGcm9tPXtsYWJlbEZyb219XHJcbiAgICAgICAgICBsYWJlbFRvPXtsYWJlbFRvfVxyXG4gICAgICAgICAgc3RhcnREYXRlVGV4dD17c3RhcnREYXRlID8gZm9ybWF0RGlzcGxheShzdGFydERhdGUsIGxvY2FsZSkgOiBhZGREYXRlTGFiZWx9XHJcbiAgICAgICAgICBlbmREYXRlVGV4dD17ZW5kRGF0ZSA/IGZvcm1hdERpc3BsYXkoZW5kRGF0ZSwgbG9jYWxlKSA6IGFkZERhdGVMYWJlbH1cclxuICAgICAgICAgIGNsZWFyUmFuZ2VMYWJlbD17Y2xlYXJSYW5nZUxhYmVsfVxyXG4gICAgICAgICAgaGFzU2VsZWN0ZWRSYW5nZT17ISFzdGFydERhdGUgfHwgISFlbmREYXRlfVxyXG4gICAgICAgICAgbW9udGhMYWJlbD17Y2FsZW5kYXJMYWJlbH1cclxuICAgICAgICAgIHdlZWtEYXlMYWJlbHM9e3dlZWtEYXlMYWJlbHN9XHJcbiAgICAgICAgICBzdGF0dXNUZXh0PXtzZWxlY3RpbmdTdGVwID09PSBcInN0YXJ0XCIgPyBzdGF0dXNTZWxlY3RTdGFydExhYmVsIDogc3RhdHVzU2VsZWN0RW5kTGFiZWx9XHJcbiAgICAgICAgICBkYXlDZWxscz17bWFudWFsRGF5Q2VsbHN9XHJcbiAgICAgICAgICBwcmV2TW9udGhMYWJlbD17cHJldk1vbnRoTGFiZWx9XHJcbiAgICAgICAgICBuZXh0TW9udGhMYWJlbD17bmV4dE1vbnRoTGFiZWx9XHJcbiAgICAgICAgICBjbGllbnRSZXNldEtleT17Y2xpZW50UmVzZXRLZXl9XHJcbiAgICAgICAgICBzZWxlY3RlZENsaWVudD17c2VsZWN0ZWRDbGllbnR9XHJcbiAgICAgICAgICBjbGllbnRMYWJlbD17Y2xpZW50TGFiZWx9XHJcbiAgICAgICAgICB2aXNpYmxlVmlzaXRVc2Vycz17dmlzaWJsZVZpc2l0VXNlcnN9XHJcbiAgICAgICAgICBzZWxlY3RlZE93bmVyQXhVc2VySWQ9e293bmVyU2VsZWN0VmFsdWV9XHJcbiAgICAgICAgICB2aXNpYmxlVXNlcnNMb2FkaW5nPXt2aXNpYmxlVXNlcnNMb2FkaW5nfVxyXG4gICAgICAgICAgb3duZXJGaWx0ZXJEaXNhYmxlZD17b3duZXJGaWx0ZXJEaXNhYmxlZH1cclxuICAgICAgICAgIHZpc2libGVVc2Vyc0Vycm9yPXt2aXNpYmxlVXNlcnNFcnJvcn1cclxuICAgICAgICAgIG93bmVyQWxsT3B0aW9uPXtjYW5NYW5hZ2VWaXNpYmxlT3duZXJzID8geyB2YWx1ZTogSElTVE9SWV9WSVNJQkxFX09XTkVSX0FMTF9WQUxVRSwgdGV4dDogb3duZXJBbGxMYWJlbCB9IDogbnVsbH1cclxuICAgICAgICAgIG93bmVyTm9Vc2Vyc0xhYmVsPXtvd25lck5vVXNlcnNMYWJlbH1cclxuICAgICAgICAgIG93bmVyTG9hZGluZ0xhYmVsPXtvd25lckxvYWRpbmdMYWJlbH1cclxuICAgICAgICAgIHNob3dGaWx0ZXJBY3Rpb25zPXtzaG93RmlsdGVyQWN0aW9uc31cclxuICAgICAgICAgIGNsZWFyTGFiZWw9e2NsZWFyTGFiZWx9XHJcbiAgICAgICAgICBhcHBseUxhYmVsPXthcHBseUxhYmVsfVxyXG4gICAgICAgICAgb25RdWlja0ZpbHRlcj17aGFuZGxlUXVpY2tGaWx0ZXJ9XHJcbiAgICAgICAgICBvbk9wZW5Qb3BvdmVyPXtvcGVuUG9wb3Zlcn1cclxuICAgICAgICAgIG9uQWN0aXZhdG9yS2V5RG93bj17aGFuZGxlQWN0aXZhdG9yS2V5RG93bn1cclxuICAgICAgICAgIG9uU2VjdGlvbktleURvd249e2hhbmRsZVNlY3Rpb25LZXlEb3dufVxyXG4gICAgICAgICAgb25DbGVhckRhdGU9e2hhbmRsZUNsZWFyfVxyXG4gICAgICAgICAgb25QcmV2TW9udGg9e2hhbmRsZVByZXZNb250aH1cclxuICAgICAgICAgIG9uTmV4dE1vbnRoPXtoYW5kbGVOZXh0TW9udGh9XHJcbiAgICAgICAgICBvbkdyaWRNb3VzZUxlYXZlPXtoYW5kbGVHcmlkTW91c2VMZWF2ZX1cclxuICAgICAgICAgIG9uRGF5Q2xpY2s9e2hhbmRsZU1hbnVhbERheUNsaWNrfVxyXG4gICAgICAgICAgb25EYXlIb3Zlcj17aGFuZGxlTWFudWFsRGF5SG92ZXJ9XHJcbiAgICAgICAgICBvbkNsaWVudFNlbGVjdGVkPXtoYW5kbGVDbGllbnRTZWxlY3RlZH1cclxuICAgICAgICAgIG9uT3duZXJDaGFuZ2U9e3NldFNlbGVjdGVkT3duZXJBeFVzZXJJZH1cclxuICAgICAgICAgIG9uUmVzZXRGaWx0ZXJzPXtoYW5kbGVSZXNldEZpbHRlcnN9XHJcbiAgICAgICAgICBvbkFwcGx5RmlsdGVycz17KCkgPT4ge1xyXG4gICAgICAgICAgICBhcHBseUZpbHRlcnMoeyBjbG9zZVBhbmVsOiB0cnVlLCBwYWdlOiAxIH0pO1xyXG4gICAgICAgICAgfX1cclxuICAgICAgICAvPlxyXG4gICAgICApfVxyXG5cclxuICAgICAgPGlucHV0IHR5cGU9XCJoaWRkZW5cIiBpZD1cImZyb21EYXRlXCIgdmFsdWU9e2Zyb21EYXRlVmFsdWV9IHJlYWRPbmx5IC8+XHJcbiAgICAgIDxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgaWQ9XCJ0b0RhdGVcIiB2YWx1ZT17dG9EYXRlVmFsdWV9IHJlYWRPbmx5IC8+XHJcblxyXG4gICAgICA8SGlzdG9yeVJlc3VsdHNTZWN0aW9uXHJcbiAgICAgICAgc2hvd1Jlc3VsdHM9e3Nob3dSZXN1bHRzfVxyXG4gICAgICAgIGlzTG9hZGluZz17aXNMb2FkaW5nfVxyXG4gICAgICAgIGxvYWRpbmdMYWJlbD17bG9hZGluZ0xhYmVsfVxyXG4gICAgICAgIHRpbWVsaW5lSXRlbXM9e3RpbWVsaW5lSXRlbXN9XHJcbiAgICAgICAgbm9EYXRhVGV4dD17bm9WaXNpdHNJblJhbmdlTGFiZWx9XHJcbiAgICAgICAgZXJyb3JNZXNzYWdlPXtlcnJvck1lc3NhZ2V9XHJcbiAgICAgICAgdG90YWxQYWdlcz17dG90YWxQYWdlc31cclxuICAgICAgICBjdXJyZW50UGFnZT17Y3VycmVudFBhZ2V9XHJcbiAgICAgICAgcGFnZVdpbmRvdz17UEFHRV9XSU5ET1d9XHJcbiAgICAgICAgcGFnaW5hdGlvbkxhYmVscz17cGFnaW5hdGlvbkxhYmVsc31cclxuICAgICAgICBvbk5hdmlnYXRlPXtoYW5kbGVOYXZpZ2F0ZX1cclxuICAgICAgICBvblBhZ2VDaGFuZ2U9e2xvYWRBY3Rpdml0aWVzfVxyXG4gICAgICAvPlxyXG4gICAgICB7Y2FuQ3JlYXRlVmlzaXQgJiYgKFxyXG4gICAgICAgIDxGbG9hdGluZ0FjdGlvbkJ1dHRvblxyXG4gICAgICAgICAgcm91dGU9XCIvVmlzaXRhcy9DcmVhdGU/ZnJlc2g9MVwiXHJcbiAgICAgICAgICBhcmlhTGFiZWw9e2NyZWF0ZUxhYmVsfVxyXG4gICAgICAgICAgc2l6ZT17NzZ9XHJcbiAgICAgICAgICByaWdodD17MTZ9XHJcbiAgICAgICAgICBib3R0b209e0ZBQl9CQVNFX0JPVFRPTX1cclxuICAgICAgICAvPlxyXG4gICAgICApfVxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbi8vIE1vdW50IGhlbHBlciBmb3IgdGhlIGxlZ2FjeSBSYXpvciB2aWV3LlxyXG5leHBvcnQgY29uc3QgbW91bnRIaXN0b3J5UGFnZSA9IChyb290OiBIVE1MRWxlbWVudCkgPT4ge1xyXG4gIGNvbnN0IGRlZmF1bHRGcm9tRGF0ZSA9IHJvb3QuZ2V0QXR0cmlidXRlKFwiZGF0YS1kZWZhdWx0LWZyb21cIikgfHwgXCJcIjtcclxuICBjb25zdCBkZWZhdWx0VG9EYXRlID0gcm9vdC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWRlZmF1bHQtdG9cIikgfHwgXCJcIjtcclxuICBjb25zdCBjb21wYW55SWQgPSByb290LmdldEF0dHJpYnV0ZShcImRhdGEtY29tcGFueS1pZFwiKSB8fCBcIlwiO1xyXG4gIGNvbnN0IGF4VXNlcklkID0gcm9vdC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWF4LXVzZXItaWRcIikgfHwgXCJcIjtcclxuICBjb25zdCBwZXJtaXNzaW9uc1JldmlzaW9uID0gcm9vdC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXBlcm1pc3Npb25zLXJldmlzaW9uXCIpIHx8IFwiXCI7XHJcblxyXG4gIG1vdW50UmVhY3RJc2xhbmQoXHJcbiAgICByb290LFxyXG4gICAgPEhpc3RvcnlQYWdlXHJcbiAgICAgIGRlZmF1bHRGcm9tRGF0ZT17ZGVmYXVsdEZyb21EYXRlfVxyXG4gICAgICBkZWZhdWx0VG9EYXRlPXtkZWZhdWx0VG9EYXRlfVxyXG4gICAgICBjb21wYW55SWQ9e2NvbXBhbnlJZH1cclxuICAgICAgYXhVc2VySWQ9e2F4VXNlcklkfVxyXG4gICAgICBwZXJtaXNzaW9uc1JldmlzaW9uPXtwZXJtaXNzaW9uc1JldmlzaW9ufVxyXG4gICAgLz5cclxuICApO1xyXG59O1xyXG5cclxuY29uc3QgbW91bnQgPSAoKSA9PiB7XHJcbiAgY29uc3Qgcm9vdEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2aXNpdGFzLWhpc3Rvcnktcm9vdFwiKTtcclxuICBpZiAoIXJvb3RFbCkgcmV0dXJuO1xyXG4gIG1vdW50SGlzdG9yeVBhZ2Uocm9vdEVsKTtcclxufTtcclxuXHJcbm1vdW50V2hlbkRvY3VtZW50UmVhZHkobW91bnQpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgSGlzdG9yeVBhZ2U7XHJcbiIsICJpbXBvcnQgUmVhY3QsIHsgdXNlTWVtbyB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFNlbGVjdENvbWJvYm94IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvU2VsZWN0Q29tYm9ib3gudHN4XCI7XG5pbXBvcnQgeyBjbGFzc05hbWVzIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2NsYXNzTmFtZXMudHNcIjtcbmltcG9ydCB7IGZvcm1hdE1vZHVsZVZpc2libGVVc2VyTGFiZWwsIHR5cGUgTW9kdWxlRGF0YVZpc2liaWxpdHlWaXNpYmxlVXNlciB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9tb2R1bGVEYXRhVmlzaWJpbGl0eS50c1wiO1xuaW1wb3J0IHsgSElTVE9SWV9WSVNJQkxFX09XTkVSX0FMTF9WQUxVRSB9IGZyb20gXCIuL2hpc3RvcnlWaXNpYmxlT3duZXJTZWxlY3Rpb24udHNcIjtcblxyXG50eXBlIFZpc2l0T3duZXJTZWxlY3RPcHRpb24gPSB7XHJcbiAgdmFsdWU6IHN0cmluZztcclxuICB0ZXh0OiBzdHJpbmc7XHJcbn07XHJcblxyXG50eXBlIFByb3BzID0ge1xyXG4gIHVzZXJzOiBNb2R1bGVEYXRhVmlzaWJpbGl0eVZpc2libGVVc2VyW107XHJcbiAgc2VsZWN0ZWRPd25lckF4VXNlcklkOiBzdHJpbmc7XHJcbiAgbG9hZGluZzogYm9vbGVhbjtcclxuICBkaXNhYmxlZDogYm9vbGVhbjtcclxuICBlcnJvck1lc3NhZ2U6IHN0cmluZztcclxuICBsYWJlbDogc3RyaW5nO1xyXG4gIGFsbE9wdGlvbj86IFZpc2l0T3duZXJTZWxlY3RPcHRpb24gfCBudWxsO1xyXG4gIG5vVXNlcnNMYWJlbDogc3RyaW5nO1xyXG4gIGxvYWRpbmdMYWJlbDogc3RyaW5nO1xyXG4gIG9uQ2hhbmdlOiAob3duZXJBeFVzZXJJZDogc3RyaW5nKSA9PiB2b2lkO1xyXG59O1xyXG5cclxuLy8gRml4ZWQgbG9jYWwgb3duZXIgc2VsZWN0b3IgdXNlZCB0byBmaWx0ZXIgdmlzaXQgaGlzdG9yeSBieSB2aXNpYmxlIEF4IHVzZXJzLlxyXG5jb25zdCBWaXNpYmxlVmlzaXRPd25lclNlbGVjdCA9ICh7XHJcbiAgdXNlcnMsXHJcbiAgc2VsZWN0ZWRPd25lckF4VXNlcklkLFxyXG4gIGxvYWRpbmcsXHJcbiAgZGlzYWJsZWQsXHJcbiAgZXJyb3JNZXNzYWdlLFxyXG4gIGxhYmVsLFxyXG4gIGFsbE9wdGlvbiA9IG51bGwsXHJcbiAgbm9Vc2Vyc0xhYmVsLFxyXG4gIGxvYWRpbmdMYWJlbCxcclxuICBvbkNoYW5nZSxcclxufTogUHJvcHMpID0+IHtcclxuICBjb25zdCBvcHRpb25zID0gdXNlTWVtbzxWaXNpdE93bmVyU2VsZWN0T3B0aW9uW10+KCgpID0+IHtcclxuICAgIGNvbnN0IG93bmVyT3B0aW9ucyA9IChBcnJheS5pc0FycmF5KHVzZXJzKSA/IHVzZXJzIDogW10pXHJcbiAgICAgIC5tYXAoKGVudHJ5KSA9PiB7XHJcbiAgICAgICAgY29uc3QgYXhVc2VySWQgPSBTdHJpbmcoZW50cnkuYXhVc2VySWQgfHwgXCJcIikudHJpbSgpO1xyXG4gICAgICAgIGNvbnN0IG9wdGlvbkxhYmVsID0gZm9ybWF0TW9kdWxlVmlzaWJsZVVzZXJMYWJlbChlbnRyeSk7XHJcbiAgICAgICAgaWYgKCFheFVzZXJJZCB8fCAhb3B0aW9uTGFiZWwpIHJldHVybiBudWxsO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICB2YWx1ZTogYXhVc2VySWQsXHJcbiAgICAgICAgICB0ZXh0OiBvcHRpb25MYWJlbCxcclxuICAgICAgICB9IGFzIFZpc2l0T3duZXJTZWxlY3RPcHRpb247XHJcbiAgICAgIH0pXHJcbiAgICAgIC5maWx0ZXIoKGVudHJ5KTogZW50cnkgaXMgVmlzaXRPd25lclNlbGVjdE9wdGlvbiA9PiAhIWVudHJ5KTtcclxuXHJcbiAgICByZXR1cm4gYWxsT3B0aW9uID8gW2FsbE9wdGlvbiwgLi4ub3duZXJPcHRpb25zXSA6IG93bmVyT3B0aW9ucztcclxuICB9LCBbYWxsT3B0aW9uLCB1c2Vyc10pO1xyXG5cclxuICBjb25zdCBoYXNPcHRpb25zID0gb3B0aW9ucy5sZW5ndGggPiAwO1xyXG4gIGNvbnN0IHNlbGVjdGVkRXhpc3RzID0gb3B0aW9ucy5zb21lKChlbnRyeSkgPT4gZW50cnkudmFsdWUudG9VcHBlckNhc2UoKSA9PT0gc2VsZWN0ZWRPd25lckF4VXNlcklkLnRvVXBwZXJDYXNlKCkpO1xyXG4gIGNvbnN0IHZhbHVlID0gaGFzT3B0aW9ucyAmJiBzZWxlY3RlZEV4aXN0cyA/IHNlbGVjdGVkT3duZXJBeFVzZXJJZCA6IFwiXCI7XHJcbiAgY29uc3Qgc3RhdHVzVGV4dCA9IGxvYWRpbmcgPyBsb2FkaW5nTGFiZWwgOiBlcnJvck1lc3NhZ2U7XHJcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMVwiPlxuICAgICAgPFNlbGVjdENvbWJvYm94XG4gICAgICAgIGxhYmVsPXtsYWJlbH1cclxuICAgICAgICBwbGFjZWhvbGRlcj17aGFzT3B0aW9ucyA/IGxhYmVsIDogbm9Vc2Vyc0xhYmVsfVxyXG4gICAgICAgIG9wdGlvbnM9e2hhc09wdGlvbnMgPyBvcHRpb25zIDogW3sgdmFsdWU6IFwiXCIsIHRleHQ6IG5vVXNlcnNMYWJlbCB9XX1cclxuICAgICAgICB2YWx1ZT17dmFsdWV9XHJcbiAgICAgICAgb25DaGFuZ2U9eyhuZXh0VmFsdWUpID0+IHtcclxuICAgICAgICAgIG9uQ2hhbmdlKG5leHRWYWx1ZSA9PT0gSElTVE9SWV9WSVNJQkxFX09XTkVSX0FMTF9WQUxVRSA/IFwiXCIgOiBuZXh0VmFsdWUpO1xyXG4gICAgICAgIH19XHJcbiAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkIHx8IGxvYWRpbmcgfHwgIWhhc09wdGlvbnN9XHJcbiAgICAgICAgaWRCYXNlPVwiaGlzdG9yeS12aXNpYmxlLW93bmVyXCJcbiAgICAgICAgcG9ydGFsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcbiAgICAgICAgcGFuZWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxuICAgICAgICBhbGxvd1RleHRJbnB1dFxuICAgICAgICBzZWxlY3RlZFRleHRNb2RlPVwidGV4dFwiXG4gICAgICAgIHNob3dMYWJlbD17ZmFsc2V9XG4gICAgICAvPlxuICAgICAge3N0YXR1c1RleHQgJiYgKFxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsIGZsZXgganVzdGlmeS1lbmRcIj5cclxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcInRleHQteHMgdGVjaC1pbmZvXCIsIGVycm9yTWVzc2FnZSA/IFwidGV4dC1hbWJlci03MDBcIiA6IFwidGV4dC1zbGF0ZS01MDBcIil9PlxyXG4gICAgICAgICAgICB7c3RhdHVzVGV4dH1cclxuICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgKX1cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBWaXNpYmxlVmlzaXRPd25lclNlbGVjdDtcclxuIiwgImltcG9ydCB0eXBlIHsgTW9kdWxlRGF0YVZpc2liaWxpdHlWaXNpYmxlVXNlciB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9tb2R1bGVEYXRhVmlzaWJpbGl0eS50c1wiO1xyXG5pbXBvcnQgeyBub3JtYWxpemVPd25lckF4VXNlcklkIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL21vZHVsZURhdGFWaXNpYmlsaXR5LnRzXCI7XHJcblxyXG5leHBvcnQgY29uc3QgSElTVE9SWV9WSVNJQkxFX09XTkVSX0FMTF9WQUxVRSA9IFwiX19oaXN0b3J5X3Zpc2libGVfb3duZXJfYWxsX19cIjtcclxuXHJcbmNvbnN0IG5vcm1hbGl6ZVVzZXJJZCA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZyA9PiBTdHJpbmcodmFsdWUgfHwgXCJcIikudHJpbSgpO1xyXG5cclxuLy8gQ29tcGFyZXMgdmlzaXQgb3duZXIgQXggdXNlciBpZHMgd2l0aCB0aGUgc2FtZSBub3JtYWxpemF0aW9uIHVzZWQgYnkgcmVjb3JkIHZpc2liaWxpdHkuXHJcbmV4cG9ydCBjb25zdCBpc1NhbWVIaXN0b3J5VmlzaWJsZU93bmVyID0gKGxlZnQ6IHVua25vd24sIHJpZ2h0OiB1bmtub3duKTogYm9vbGVhbiA9PiB7XHJcbiAgY29uc3Qgbm9ybWFsaXplZExlZnQgPSBub3JtYWxpemVPd25lckF4VXNlcklkKGxlZnQpO1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRSaWdodCA9IG5vcm1hbGl6ZU93bmVyQXhVc2VySWQocmlnaHQpO1xyXG4gIHJldHVybiAhIW5vcm1hbGl6ZWRMZWZ0ICYmIG5vcm1hbGl6ZWRMZWZ0ID09PSBub3JtYWxpemVkUmlnaHQ7XHJcbn07XHJcblxyXG4vLyBLZWVwcyB0aGUgbG9nZ2VkIEF4IHVzZXIgYXZhaWxhYmxlIHdoZW4gdGhlIHZpc2liaWxpdHkgZW5kcG9pbnQgb25seSByZXR1cm5zIHN1Ym9yZGluYXRlcy5cclxuZXhwb3J0IGNvbnN0IGVuc3VyZUN1cnJlbnRIaXN0b3J5VmlzaWJsZU93bmVySW5MaXN0ID0gKFxyXG4gIHVzZXJzOiBNb2R1bGVEYXRhVmlzaWJpbGl0eVZpc2libGVVc2VyW10sXHJcbiAgY3VycmVudEF4VXNlcklkOiB1bmtub3duXHJcbik6IE1vZHVsZURhdGFWaXNpYmlsaXR5VmlzaWJsZVVzZXJbXSA9PiB7XHJcbiAgY29uc3Qgbm9ybWFsaXplZEN1cnJlbnQgPSBub3JtYWxpemVVc2VySWQoY3VycmVudEF4VXNlcklkKTtcclxuICBjb25zdCBub3JtYWxpemVkVXNlcnMgPSBBcnJheS5pc0FycmF5KHVzZXJzKSA/IHVzZXJzIDogW107XHJcbiAgaWYgKCFub3JtYWxpemVkQ3VycmVudCkgcmV0dXJuIG5vcm1hbGl6ZWRVc2VycztcclxuICBpZiAobm9ybWFsaXplZFVzZXJzLnNvbWUoKGVudHJ5KSA9PiBpc1NhbWVIaXN0b3J5VmlzaWJsZU93bmVyKGVudHJ5LmF4VXNlcklkLCBub3JtYWxpemVkQ3VycmVudCkpKSB7XHJcbiAgICByZXR1cm4gbm9ybWFsaXplZFVzZXJzO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIFtcclxuICAgIHtcclxuICAgICAgYWxpYXM6IG5vcm1hbGl6ZWRDdXJyZW50LFxyXG4gICAgICBheFVzZXJJZDogbm9ybWFsaXplZEN1cnJlbnQsXHJcbiAgICAgIGNybVVzZXJJZDogXCJcIixcclxuICAgICAgbmFtZTogbm9ybWFsaXplZEN1cnJlbnQsXHJcbiAgICAgIHNvdXJjZTogXCJDdXJyZW50VXNlckZhbGxiYWNrXCIsXHJcbiAgICAgIG11dGF0aW9uUG9saWN5OiBcIlwiLFxyXG4gICAgICBtdXRhdGlvblBvbGljeUludDogbnVsbCxcclxuICAgICAgbXV0YXRpb25Qb2xpY3lMYWJlbDogXCJcIixcclxuICAgICAgY2FuTXV0YXRlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIC4uLm5vcm1hbGl6ZWRVc2VycyxcclxuICBdO1xyXG59O1xyXG5cclxuLy8gRGV0ZWN0cyB3aGV0aGVyIHRoZSBjdXJyZW50IHVzZXIgaGFzIGF0IGxlYXN0IG9uZSB2aXNpYmxlIHN1Ym9yZGluYXRlIG93bmVyLlxyXG5leHBvcnQgY29uc3QgaGFzSGlzdG9yeVZpc2libGVTdWJvcmRpbmF0ZXMgPSAoXHJcbiAgdXNlcnM6IE1vZHVsZURhdGFWaXNpYmlsaXR5VmlzaWJsZVVzZXJbXSxcclxuICBjdXJyZW50QXhVc2VySWQ6IHVua25vd25cclxuKTogYm9vbGVhbiA9PiB7XHJcbiAgY29uc3Qgbm9ybWFsaXplZEN1cnJlbnQgPSBub3JtYWxpemVPd25lckF4VXNlcklkKGN1cnJlbnRBeFVzZXJJZCk7XHJcbiAgaWYgKCFub3JtYWxpemVkQ3VycmVudCkgcmV0dXJuIHVzZXJzLmxlbmd0aCA+IDE7XHJcblxyXG4gIHJldHVybiB1c2Vycy5zb21lKChlbnRyeSkgPT4ge1xyXG4gICAgY29uc3Qgb3duZXJJZCA9IG5vcm1hbGl6ZU93bmVyQXhVc2VySWQoZW50cnkuYXhVc2VySWQpO1xyXG4gICAgcmV0dXJuICEhb3duZXJJZCAmJiBvd25lcklkICE9PSBub3JtYWxpemVkQ3VycmVudDtcclxuICB9KTtcclxufTtcclxuXHJcbi8vIFJlc29sdmVzIGEgY29uY3JldGUgb3duZXIgaWQgZnJvbSBhIHJlcXVlc3RlZCB2YWx1ZSBhbmQgdGhlIGF2YWlsYWJsZSB2aXNpdCBvd25lciBsaXN0LlxyXG5leHBvcnQgY29uc3QgcmVzb2x2ZUhpc3RvcnlWaXNpYmxlT3duZXJTZWxlY3Rpb24gPSAoXHJcbiAgcmVxdWVzdGVkT3duZXJBeFVzZXJJZDogdW5rbm93bixcclxuICBjdXJyZW50QXhVc2VySWQ6IHVua25vd24sXHJcbiAgdXNlcnM6IE1vZHVsZURhdGFWaXNpYmlsaXR5VmlzaWJsZVVzZXJbXVxyXG4pOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRSZXF1ZXN0ZWQgPSBub3JtYWxpemVVc2VySWQocmVxdWVzdGVkT3duZXJBeFVzZXJJZCk7XHJcbiAgY29uc3Qgbm9ybWFsaXplZEN1cnJlbnQgPSBub3JtYWxpemVVc2VySWQoY3VycmVudEF4VXNlcklkKTtcclxuXHJcbiAgaWYgKG5vcm1hbGl6ZWRSZXF1ZXN0ZWQgJiYgbm9ybWFsaXplZFJlcXVlc3RlZCAhPT0gSElTVE9SWV9WSVNJQkxFX09XTkVSX0FMTF9WQUxVRSkge1xyXG4gICAgY29uc3QgZXhhY3QgPSB1c2Vycy5maW5kKChlbnRyeSkgPT4gaXNTYW1lSGlzdG9yeVZpc2libGVPd25lcihlbnRyeS5heFVzZXJJZCwgbm9ybWFsaXplZFJlcXVlc3RlZCkpO1xyXG4gICAgaWYgKGV4YWN0KSByZXR1cm4gZXhhY3QuYXhVc2VySWQ7XHJcbiAgfVxyXG5cclxuICBpZiAobm9ybWFsaXplZEN1cnJlbnQpIHtcclxuICAgIGNvbnN0IHNlbGYgPSB1c2Vycy5maW5kKChlbnRyeSkgPT4gaXNTYW1lSGlzdG9yeVZpc2libGVPd25lcihlbnRyeS5heFVzZXJJZCwgbm9ybWFsaXplZEN1cnJlbnQpKTtcclxuICAgIHJldHVybiBzZWxmPy5heFVzZXJJZCB8fCBub3JtYWxpemVkQ3VycmVudDtcclxuICB9XHJcblxyXG4gIHJldHVybiBcIlwiO1xyXG59O1xyXG5cclxudHlwZSBIaXN0b3J5VmlzaWJsZU93bmVyUmVzb2x1dGlvbkFyZ3MgPSB7XHJcbiAgc2VsZWN0ZWRPd25lckF4VXNlcklkOiB1bmtub3duO1xyXG4gIGN1cnJlbnRBeFVzZXJJZDogdW5rbm93bjtcclxuICB1c2VyczogTW9kdWxlRGF0YVZpc2liaWxpdHlWaXNpYmxlVXNlcltdO1xyXG4gIGNhbk1hbmFnZVZpc2libGVPd25lcnM6IGJvb2xlYW47XHJcbn07XHJcblxyXG4vLyBSZXNvbHZlcyB0aGUgdmFsdWUgc2hvd24gYnkgdGhlIGZpbHRlciBpbnB1dC5cclxuZXhwb3J0IGNvbnN0IHJlc29sdmVIaXN0b3J5VmlzaWJsZU93bmVyU2VsZWN0VmFsdWUgPSAoe1xyXG4gIHNlbGVjdGVkT3duZXJBeFVzZXJJZCxcclxuICBjdXJyZW50QXhVc2VySWQsXHJcbiAgdXNlcnMsXHJcbiAgY2FuTWFuYWdlVmlzaWJsZU93bmVycyxcclxufTogSGlzdG9yeVZpc2libGVPd25lclJlc29sdXRpb25BcmdzKTogc3RyaW5nID0+IHtcclxuICBpZiAoY2FuTWFuYWdlVmlzaWJsZU93bmVycykge1xyXG4gICAgY29uc3Qgbm9ybWFsaXplZFNlbGVjdGVkID0gbm9ybWFsaXplVXNlcklkKHNlbGVjdGVkT3duZXJBeFVzZXJJZCk7XHJcbiAgICBpZiAobm9ybWFsaXplZFNlbGVjdGVkICYmIG5vcm1hbGl6ZWRTZWxlY3RlZCAhPT0gSElTVE9SWV9WSVNJQkxFX09XTkVSX0FMTF9WQUxVRSkge1xyXG4gICAgICBjb25zdCBleGFjdCA9IHVzZXJzLmZpbmQoKGVudHJ5KSA9PiBpc1NhbWVIaXN0b3J5VmlzaWJsZU93bmVyKGVudHJ5LmF4VXNlcklkLCBub3JtYWxpemVkU2VsZWN0ZWQpKTtcclxuICAgICAgaWYgKGV4YWN0KSByZXR1cm4gZXhhY3QuYXhVc2VySWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIEhJU1RPUllfVklTSUJMRV9PV05FUl9BTExfVkFMVUU7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gcmVzb2x2ZUhpc3RvcnlWaXNpYmxlT3duZXJTZWxlY3Rpb24oc2VsZWN0ZWRPd25lckF4VXNlcklkLCBjdXJyZW50QXhVc2VySWQsIHVzZXJzKTtcclxufTtcclxuXHJcbi8vIFJlc29sdmVzIHRoZSBvd25lciBpZCB0aGF0IG11c3QgYmUgc2VudCB0byB0aGUgYWN0aXZpdGllcyBBUEkuXHJcbmV4cG9ydCBjb25zdCByZXNvbHZlSGlzdG9yeUVmZmVjdGl2ZU93bmVyQXhVc2VySWQgPSAoe1xyXG4gIHNlbGVjdGVkT3duZXJBeFVzZXJJZCxcclxuICBjdXJyZW50QXhVc2VySWQsXHJcbiAgdXNlcnMsXHJcbiAgY2FuTWFuYWdlVmlzaWJsZU93bmVycyxcclxufTogSGlzdG9yeVZpc2libGVPd25lclJlc29sdXRpb25BcmdzKTogc3RyaW5nID0+IHtcclxuICBpZiAoY2FuTWFuYWdlVmlzaWJsZU93bmVycykge1xyXG4gICAgY29uc3Qgbm9ybWFsaXplZFNlbGVjdGVkID0gbm9ybWFsaXplVXNlcklkKHNlbGVjdGVkT3duZXJBeFVzZXJJZCk7XHJcbiAgICBpZiAoIW5vcm1hbGl6ZWRTZWxlY3RlZCB8fCBub3JtYWxpemVkU2VsZWN0ZWQgPT09IEhJU1RPUllfVklTSUJMRV9PV05FUl9BTExfVkFMVUUpIHJldHVybiBcIlwiO1xyXG5cclxuICAgIGNvbnN0IGV4YWN0ID0gdXNlcnMuZmluZCgoZW50cnkpID0+IGlzU2FtZUhpc3RvcnlWaXNpYmxlT3duZXIoZW50cnkuYXhVc2VySWQsIG5vcm1hbGl6ZWRTZWxlY3RlZCkpO1xyXG4gICAgcmV0dXJuIGV4YWN0Py5heFVzZXJJZCB8fCBcIlwiO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHJlc29sdmVIaXN0b3J5VmlzaWJsZU93bmVyU2VsZWN0aW9uKHNlbGVjdGVkT3duZXJBeFVzZXJJZCwgY3VycmVudEF4VXNlcklkLCB1c2Vycyk7XHJcbn07XHJcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBBY3Rpb25CdXR0b24gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9BY3Rpb25CdXR0b24udHN4XCI7XHJcbmltcG9ydCBGaWx0ZXJCdXR0b24gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9GaWx0ZXJCdXR0b24udHN4XCI7XHJcbmltcG9ydCBDbGllbnRTZWFyY2hDb21ib2JveCwgeyB0eXBlIENsaWVudE9wdGlvbiB9IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL3Zpc2l0YXMvQ2xpZW50U2VhcmNoQ29tYm9ib3gudHN4XCI7XHJcbmltcG9ydCBIaXN0b3J5TWFudWFsRGF0ZVBpY2tlciwgeyB0eXBlIEhpc3RvcnlNYW51YWxEYXlDZWxsIH0gZnJvbSBcIi4vSGlzdG9yeU1hbnVhbERhdGVQaWNrZXIudHN4XCI7XHJcbmltcG9ydCBIaXN0b3J5U3VtbWFyeSBmcm9tIFwiLi9IaXN0b3J5U3VtbWFyeS50c3hcIjtcclxuaW1wb3J0IFZpc2libGVWaXNpdE93bmVyU2VsZWN0IGZyb20gXCIuL1Zpc2libGVWaXNpdE93bmVyU2VsZWN0LnRzeFwiO1xyXG5pbXBvcnQgdHlwZSB7IFF1aWNrRmlsdGVySWQgfSBmcm9tIFwiLi91c2VIaXN0b3J5RmlsdGVyc1N0YXRlLnRzXCI7XHJcbmltcG9ydCB0eXBlIHsgTW9kdWxlRGF0YVZpc2liaWxpdHlWaXNpYmxlVXNlciB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9tb2R1bGVEYXRhVmlzaWJpbGl0eS50c1wiO1xyXG5cclxudHlwZSBRdWlja0ZpbHRlck9wdGlvbiA9IHtcclxuICBpZDogUXVpY2tGaWx0ZXJJZDtcclxuICBsYWJlbDogc3RyaW5nO1xyXG59O1xyXG5cclxudHlwZSBWaXNpdE93bmVyU2VsZWN0T3B0aW9uID0ge1xyXG4gIHZhbHVlOiBzdHJpbmc7XHJcbiAgdGV4dDogc3RyaW5nO1xyXG59O1xyXG5cclxudHlwZSBQcm9wcyA9IHtcclxuICBhY3RpdmF0b3JSZWY6IFJlYWN0LlJlZk9iamVjdDxIVE1MRGl2RWxlbWVudCB8IG51bGw+O1xyXG4gIHBvcG92ZXJSZWY6IFJlYWN0LlJlZk9iamVjdDxIVE1MRGl2RWxlbWVudCB8IG51bGw+O1xyXG4gIHF1aWNrRmlsdGVyczogUXVpY2tGaWx0ZXJPcHRpb25bXTtcclxuICBhY3RpdmVRdWlja0ZpbHRlcjogUXVpY2tGaWx0ZXJJZCB8IG51bGw7XHJcbiAgc2hvd0lubGluZVN1bW1hcnk6IGJvb2xlYW47XHJcbiAgc2hvd01hbnVhbFBpY2tlcjogYm9vbGVhbjtcclxuICBzdW1tYXJ5RnJvbUxhYmVsOiBzdHJpbmc7XHJcbiAgc3VtbWFyeVRvTGFiZWw6IHN0cmluZztcclxuICBmcm9tVmFsdWU6IHN0cmluZztcclxuICB0b1ZhbHVlOiBzdHJpbmc7XHJcbiAgb3duZXJMYWJlbDogc3RyaW5nO1xyXG4gIG93bmVyVmFsdWU6IHN0cmluZztcclxuICBmaWx0ZXJUaXRsZTogc3RyaW5nO1xyXG4gIHNob3dNYW51YWxFcnJvcjogYm9vbGVhbjtcclxuICBzaG93U3RhcnRFcnJvcjogYm9vbGVhbjtcclxuICBzaG93RW5kRXJyb3I6IGJvb2xlYW47XHJcbiAgaXNPcGVuOiBib29sZWFuO1xyXG4gIHNlbGVjdGluZ1N0ZXA6IFwic3RhcnRcIiB8IFwiZW5kXCIgfCBcImRvbmVcIjtcclxuICBsYWJlbEZyb206IHN0cmluZztcclxuICBsYWJlbFRvOiBzdHJpbmc7XHJcbiAgc3RhcnREYXRlVGV4dDogc3RyaW5nO1xyXG4gIGVuZERhdGVUZXh0OiBzdHJpbmc7XHJcbiAgY2xlYXJSYW5nZUxhYmVsOiBzdHJpbmc7XHJcbiAgaGFzU2VsZWN0ZWRSYW5nZTogYm9vbGVhbjtcclxuICBtb250aExhYmVsOiBzdHJpbmc7XHJcbiAgd2Vla0RheUxhYmVsczogc3RyaW5nW107XHJcbiAgc3RhdHVzVGV4dDogc3RyaW5nO1xyXG4gIGRheUNlbGxzOiBIaXN0b3J5TWFudWFsRGF5Q2VsbFtdO1xyXG4gIHByZXZNb250aExhYmVsOiBzdHJpbmc7XHJcbiAgbmV4dE1vbnRoTGFiZWw6IHN0cmluZztcclxuICBjbGllbnRSZXNldEtleTogbnVtYmVyO1xyXG4gIHNlbGVjdGVkQ2xpZW50OiBDbGllbnRPcHRpb24gfCBudWxsO1xyXG4gIGNsaWVudExhYmVsOiBzdHJpbmc7XHJcbiAgdmlzaWJsZVZpc2l0VXNlcnM6IE1vZHVsZURhdGFWaXNpYmlsaXR5VmlzaWJsZVVzZXJbXTtcclxuICBzZWxlY3RlZE93bmVyQXhVc2VySWQ6IHN0cmluZztcclxuICB2aXNpYmxlVXNlcnNMb2FkaW5nOiBib29sZWFuO1xyXG4gIG93bmVyRmlsdGVyRGlzYWJsZWQ6IGJvb2xlYW47XHJcbiAgdmlzaWJsZVVzZXJzRXJyb3I6IHN0cmluZztcclxuICBvd25lckFsbE9wdGlvbj86IFZpc2l0T3duZXJTZWxlY3RPcHRpb24gfCBudWxsO1xyXG4gIG93bmVyTm9Vc2Vyc0xhYmVsOiBzdHJpbmc7XHJcbiAgb3duZXJMb2FkaW5nTGFiZWw6IHN0cmluZztcclxuICBzaG93RmlsdGVyQWN0aW9uczogYm9vbGVhbjtcclxuICBjbGVhckxhYmVsOiBzdHJpbmc7XHJcbiAgYXBwbHlMYWJlbDogc3RyaW5nO1xyXG4gIG9uUXVpY2tGaWx0ZXI6IChmaWx0ZXJJZDogUXVpY2tGaWx0ZXJJZCkgPT4gdm9pZDtcclxuICBvbk9wZW5Qb3BvdmVyOiAoc2VjdGlvbjogXCJzdGFydFwiIHwgXCJlbmRcIikgPT4gdm9pZDtcclxuICBvbkFjdGl2YXRvcktleURvd246IChldmVudDogUmVhY3QuS2V5Ym9hcmRFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHZvaWQ7XHJcbiAgb25TZWN0aW9uS2V5RG93bjogKGV2ZW50OiBSZWFjdC5LZXlib2FyZEV2ZW50PEhUTUxEaXZFbGVtZW50Piwgc2VjdGlvbjogXCJzdGFydFwiIHwgXCJlbmRcIikgPT4gdm9pZDtcclxuICBvbkNsZWFyRGF0ZTogKGV2ZW50OiBSZWFjdC5Nb3VzZUV2ZW50KSA9PiB2b2lkO1xyXG4gIG9uUHJldk1vbnRoOiAoZXZlbnQ6IFJlYWN0Lk1vdXNlRXZlbnQ8SFRNTEJ1dHRvbkVsZW1lbnQ+KSA9PiB2b2lkO1xyXG4gIG9uTmV4dE1vbnRoOiAoZXZlbnQ6IFJlYWN0Lk1vdXNlRXZlbnQ8SFRNTEJ1dHRvbkVsZW1lbnQ+KSA9PiB2b2lkO1xyXG4gIG9uR3JpZE1vdXNlTGVhdmU6ICgpID0+IHZvaWQ7XHJcbiAgb25EYXlDbGljazogKGRheTogSGlzdG9yeU1hbnVhbERheUNlbGwpID0+IHZvaWQ7XHJcbiAgb25EYXlIb3ZlcjogKGRheTogSGlzdG9yeU1hbnVhbERheUNlbGwpID0+IHZvaWQ7XHJcbiAgb25DbGllbnRTZWxlY3RlZDogKGNsaWVudDogQ2xpZW50T3B0aW9uIHwgbnVsbCkgPT4gdm9pZDtcclxuICBvbk93bmVyQ2hhbmdlOiAob3duZXJBeFVzZXJJZDogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIG9uUmVzZXRGaWx0ZXJzOiAoKSA9PiB2b2lkO1xyXG4gIG9uQXBwbHlGaWx0ZXJzOiAoKSA9PiB2b2lkO1xyXG59O1xyXG5cclxuLy8gUmVuZGVycyBoaXN0b3J5IGZpbHRlciBjb250cm9scyB3aGlsZSB0aGUgcGFnZSBjb250YWluZXIgb3ducyBzdGF0ZSBhbmQgZGF0YSBsb2FkaW5nLlxyXG5jb25zdCBIaXN0b3J5RmlsdGVyUGFuZWwgPSAoe1xyXG4gIGFjdGl2YXRvclJlZixcclxuICBwb3BvdmVyUmVmLFxyXG4gIHF1aWNrRmlsdGVycyxcclxuICBhY3RpdmVRdWlja0ZpbHRlcixcclxuICBzaG93SW5saW5lU3VtbWFyeSxcclxuICBzaG93TWFudWFsUGlja2VyLFxyXG4gIHN1bW1hcnlGcm9tTGFiZWwsXHJcbiAgc3VtbWFyeVRvTGFiZWwsXHJcbiAgZnJvbVZhbHVlLFxyXG4gIHRvVmFsdWUsXHJcbiAgb3duZXJMYWJlbCxcclxuICBvd25lclZhbHVlLFxyXG4gIGZpbHRlclRpdGxlLFxyXG4gIHNob3dNYW51YWxFcnJvcixcclxuICBzaG93U3RhcnRFcnJvcixcclxuICBzaG93RW5kRXJyb3IsXHJcbiAgaXNPcGVuLFxyXG4gIHNlbGVjdGluZ1N0ZXAsXHJcbiAgbGFiZWxGcm9tLFxyXG4gIGxhYmVsVG8sXHJcbiAgc3RhcnREYXRlVGV4dCxcclxuICBlbmREYXRlVGV4dCxcclxuICBjbGVhclJhbmdlTGFiZWwsXHJcbiAgaGFzU2VsZWN0ZWRSYW5nZSxcclxuICBtb250aExhYmVsLFxyXG4gIHdlZWtEYXlMYWJlbHMsXHJcbiAgc3RhdHVzVGV4dCxcclxuICBkYXlDZWxscyxcclxuICBwcmV2TW9udGhMYWJlbCxcclxuICBuZXh0TW9udGhMYWJlbCxcclxuICBjbGllbnRSZXNldEtleSxcclxuICBzZWxlY3RlZENsaWVudCxcclxuICBjbGllbnRMYWJlbCxcclxuICB2aXNpYmxlVmlzaXRVc2VycyxcclxuICBzZWxlY3RlZE93bmVyQXhVc2VySWQsXHJcbiAgdmlzaWJsZVVzZXJzTG9hZGluZyxcclxuICBvd25lckZpbHRlckRpc2FibGVkLFxyXG4gIHZpc2libGVVc2Vyc0Vycm9yLFxyXG4gIG93bmVyQWxsT3B0aW9uLFxyXG4gIG93bmVyTm9Vc2Vyc0xhYmVsLFxyXG4gIG93bmVyTG9hZGluZ0xhYmVsLFxyXG4gIHNob3dGaWx0ZXJBY3Rpb25zLFxyXG4gIGNsZWFyTGFiZWwsXHJcbiAgYXBwbHlMYWJlbCxcclxuICBvblF1aWNrRmlsdGVyLFxyXG4gIG9uT3BlblBvcG92ZXIsXHJcbiAgb25BY3RpdmF0b3JLZXlEb3duLFxyXG4gIG9uU2VjdGlvbktleURvd24sXHJcbiAgb25DbGVhckRhdGUsXHJcbiAgb25QcmV2TW9udGgsXHJcbiAgb25OZXh0TW9udGgsXHJcbiAgb25HcmlkTW91c2VMZWF2ZSxcclxuICBvbkRheUNsaWNrLFxyXG4gIG9uRGF5SG92ZXIsXHJcbiAgb25DbGllbnRTZWxlY3RlZCxcclxuICBvbk93bmVyQ2hhbmdlLFxyXG4gIG9uUmVzZXRGaWx0ZXJzLFxyXG4gIG9uQXBwbHlGaWx0ZXJzLFxyXG59OiBQcm9wcykgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImZpbHRlci1jYXJkIGZpbHRlci1jYXJkLS1leHBhbmRlZCBwLTIgc206cC0yLjUgcmVsYXRpdmVcIj5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJnYXAteS0xLjUgaGlzdG9yeS1maWx0ZXItc3RhY2sgZmxleCBmbGV4LWNvbFwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBnYXAtMiBoaXN0b3J5LXF1aWNrLWZpbHRlcnNcIiBhcmlhLWxhYmVsPXtmaWx0ZXJUaXRsZX0+XHJcbiAgICAgICAgICB7cXVpY2tGaWx0ZXJzLm1hcCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBpc0FjdGl2ZSA9IGFjdGl2ZVF1aWNrRmlsdGVyID09PSBpdGVtLmlkO1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgIDxGaWx0ZXJCdXR0b25cclxuICAgICAgICAgICAgICAgIGtleT17aXRlbS5pZH1cclxuICAgICAgICAgICAgICAgIGxhYmVsPXtpdGVtLmxhYmVsfVxyXG4gICAgICAgICAgICAgICAgYWN0aXZlPXtpc0FjdGl2ZX1cclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbFwiXHJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvblF1aWNrRmlsdGVyKGl0ZW0uaWQpfVxyXG4gICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9KX1cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAge3Nob3dJbmxpbmVTdW1tYXJ5ICYmIChcclxuICAgICAgICAgIDxIaXN0b3J5U3VtbWFyeVxyXG4gICAgICAgICAgICBzdW1tYXJ5RnJvbUxhYmVsPXtzdW1tYXJ5RnJvbUxhYmVsfVxyXG4gICAgICAgICAgICBzdW1tYXJ5VG9MYWJlbD17c3VtbWFyeVRvTGFiZWx9XHJcbiAgICAgICAgICAgIGZyb21WYWx1ZT17ZnJvbVZhbHVlfVxyXG4gICAgICAgICAgICB0b1ZhbHVlPXt0b1ZhbHVlfVxyXG4gICAgICAgICAgICBvd25lckxhYmVsPXtvd25lckxhYmVsfVxyXG4gICAgICAgICAgICBvd25lclZhbHVlPXtvd25lclZhbHVlfVxyXG4gICAgICAgICAgICBzaG93T3duZXI9eyEhb3duZXJWYWx1ZX1cclxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiZ2FwLXktMSB0ZXh0LVsxMXB4XSBweC0xXCJcclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgKX1cclxuXHJcbiAgICAgICAge3Nob3dNYW51YWxQaWNrZXIgJiYgKFxyXG4gICAgICAgICAgPEhpc3RvcnlNYW51YWxEYXRlUGlja2VyXHJcbiAgICAgICAgICAgIGFjdGl2YXRvclJlZj17YWN0aXZhdG9yUmVmfVxyXG4gICAgICAgICAgICBwb3BvdmVyUmVmPXtwb3BvdmVyUmVmfVxyXG4gICAgICAgICAgICBzaG93TWFudWFsRXJyb3I9e3Nob3dNYW51YWxFcnJvcn1cclxuICAgICAgICAgICAgc2hvd1N0YXJ0RXJyb3I9e3Nob3dTdGFydEVycm9yfVxyXG4gICAgICAgICAgICBzaG93RW5kRXJyb3I9e3Nob3dFbmRFcnJvcn1cclxuICAgICAgICAgICAgZmlsdGVyVGl0bGU9e2ZpbHRlclRpdGxlfVxyXG4gICAgICAgICAgICBpc09wZW49e2lzT3Blbn1cclxuICAgICAgICAgICAgc2VsZWN0aW5nU3RlcD17c2VsZWN0aW5nU3RlcH1cclxuICAgICAgICAgICAgbGFiZWxGcm9tPXtsYWJlbEZyb219XHJcbiAgICAgICAgICAgIGxhYmVsVG89e2xhYmVsVG99XHJcbiAgICAgICAgICAgIHN0YXJ0RGF0ZVRleHQ9e3N0YXJ0RGF0ZVRleHR9XHJcbiAgICAgICAgICAgIGVuZERhdGVUZXh0PXtlbmREYXRlVGV4dH1cclxuICAgICAgICAgICAgY2xlYXJSYW5nZUxhYmVsPXtjbGVhclJhbmdlTGFiZWx9XHJcbiAgICAgICAgICAgIGhhc1NlbGVjdGVkUmFuZ2U9e2hhc1NlbGVjdGVkUmFuZ2V9XHJcbiAgICAgICAgICAgIG1vbnRoTGFiZWw9e21vbnRoTGFiZWx9XHJcbiAgICAgICAgICAgIHdlZWtEYXlMYWJlbHM9e3dlZWtEYXlMYWJlbHN9XHJcbiAgICAgICAgICAgIHN0YXR1c1RleHQ9e3N0YXR1c1RleHR9XHJcbiAgICAgICAgICAgIGRheUNlbGxzPXtkYXlDZWxsc31cclxuICAgICAgICAgICAgcHJldk1vbnRoTGFiZWw9e3ByZXZNb250aExhYmVsfVxyXG4gICAgICAgICAgICBuZXh0TW9udGhMYWJlbD17bmV4dE1vbnRoTGFiZWx9XHJcbiAgICAgICAgICAgIG9uT3BlblBvcG92ZXI9e29uT3BlblBvcG92ZXJ9XHJcbiAgICAgICAgICAgIG9uQWN0aXZhdG9yS2V5RG93bj17b25BY3RpdmF0b3JLZXlEb3dufVxyXG4gICAgICAgICAgICBvblNlY3Rpb25LZXlEb3duPXtvblNlY3Rpb25LZXlEb3dufVxyXG4gICAgICAgICAgICBvbkNsZWFyPXtvbkNsZWFyRGF0ZX1cclxuICAgICAgICAgICAgb25QcmV2TW9udGg9e29uUHJldk1vbnRofVxyXG4gICAgICAgICAgICBvbk5leHRNb250aD17b25OZXh0TW9udGh9XHJcbiAgICAgICAgICAgIG9uR3JpZE1vdXNlTGVhdmU9e29uR3JpZE1vdXNlTGVhdmV9XHJcbiAgICAgICAgICAgIG9uRGF5Q2xpY2s9e29uRGF5Q2xpY2t9XHJcbiAgICAgICAgICAgIG9uRGF5SG92ZXI9e29uRGF5SG92ZXJ9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICl9XHJcblxyXG4gICAgICAgIDxWaXNpYmxlVmlzaXRPd25lclNlbGVjdFxyXG4gICAgICAgICAgdXNlcnM9e3Zpc2libGVWaXNpdFVzZXJzfVxyXG4gICAgICAgICAgc2VsZWN0ZWRPd25lckF4VXNlcklkPXtzZWxlY3RlZE93bmVyQXhVc2VySWR9XHJcbiAgICAgICAgICBsb2FkaW5nPXt2aXNpYmxlVXNlcnNMb2FkaW5nfVxyXG4gICAgICAgICAgZGlzYWJsZWQ9e293bmVyRmlsdGVyRGlzYWJsZWR9XHJcbiAgICAgICAgICBlcnJvck1lc3NhZ2U9e3Zpc2libGVVc2Vyc0Vycm9yfVxyXG4gICAgICAgICAgbGFiZWw9e293bmVyTGFiZWx9XHJcbiAgICAgICAgICBhbGxPcHRpb249e293bmVyQWxsT3B0aW9ufVxyXG4gICAgICAgICAgbm9Vc2Vyc0xhYmVsPXtvd25lck5vVXNlcnNMYWJlbH1cclxuICAgICAgICAgIGxvYWRpbmdMYWJlbD17b3duZXJMb2FkaW5nTGFiZWx9XHJcbiAgICAgICAgICBvbkNoYW5nZT17b25Pd25lckNoYW5nZX1cclxuICAgICAgICAvPlxyXG5cclxuICAgICAgICA8Q2xpZW50U2VhcmNoQ29tYm9ib3hcclxuICAgICAgICAgIGtleT17Y2xpZW50UmVzZXRLZXl9XHJcbiAgICAgICAgICB2YWx1ZT17c2VsZWN0ZWRDbGllbnR9XHJcbiAgICAgICAgICBvblNlbGVjdGVkPXtvbkNsaWVudFNlbGVjdGVkfVxyXG4gICAgICAgICAgbGFiZWw9e2NsaWVudExhYmVsfVxyXG4gICAgICAgICAgcGxhY2Vob2xkZXI9e2NsaWVudExhYmVsfVxyXG4gICAgICAgICAgdmFyaWFudD1cImNvbXBhY3RcIlxyXG4gICAgICAgICAgc2hvd0xhYmVsPXtmYWxzZX1cclxuICAgICAgICAgIGlkQmFzZT1cImhpc3RvcnktY2xpZW50XCJcclxuICAgICAgICAgIHBvcnRhbENsYXNzTmFtZT1cInZpc2l0YXMtdHlwb2dyYXBoeVwiXHJcbiAgICAgICAgLz5cclxuXHJcbiAgICAgICAge3Nob3dGaWx0ZXJBY3Rpb25zICYmIChcclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtMSBncmlkIGdyaWQtY29scy0yIGdhcC0yIGhpc3RvcnktZmlsdGVyLWFjdGlvbnNcIj5cclxuICAgICAgICAgICAgPEFjdGlvbkJ1dHRvbiBsYWJlbD17Y2xlYXJMYWJlbH0gY2xhc3NOYW1lPVwidy1mdWxsXCIgb25DbGljaz17b25SZXNldEZpbHRlcnN9IC8+XHJcbiAgICAgICAgICAgIDxBY3Rpb25CdXR0b24gbGFiZWw9e2FwcGx5TGFiZWx9IGNsYXNzTmFtZT1cInctZnVsbFwiIG9uQ2xpY2s9e29uQXBwbHlGaWx0ZXJzfSAvPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKX1cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgSGlzdG9yeUZpbHRlclBhbmVsO1xyXG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrLCB1c2VSZWYgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgY2xhc3NOYW1lcyB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9jbGFzc05hbWVzLnRzXCI7XHJcbmltcG9ydCB7IHVzZVRpbWVsaW5lQ2FyZEVmZmVjdHMgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlVGltZWxpbmVDYXJkRWZmZWN0cy50c1wiO1xyXG5cclxuZXhwb3J0IHR5cGUgVGltZWxpbmVEYXRlUGFydHMgPSB7XHJcbiAgeWVhcjogc3RyaW5nO1xyXG4gIG1vbnRoOiBzdHJpbmc7XHJcbiAgZGF5OiBzdHJpbmc7XHJcbn07XHJcblxyXG5leHBvcnQgdHlwZSBUaW1lbGluZUl0ZW0gPSB7XHJcbiAgaWQ6IHN0cmluZztcclxuICBhY3RpdmlkYWRJZD86IHN0cmluZztcclxuICByZWNJZD86IG51bWJlciB8IG51bGw7XHJcbiAgbmFtZTogc3RyaW5nO1xuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICBmdWxsTmFtZTogc3RyaW5nO1xuICBmdWxsRGVzYzogc3RyaW5nO1xuICBoYXNEZXNjcmlwdGlvbjogYm9vbGVhbjtcbiAgZGF0ZVBhcnRzOiBUaW1lbGluZURhdGVQYXJ0cztcbiAgaXNOb0RhdGE6IGJvb2xlYW47XG59O1xuXHJcbnR5cGUgUHJvcHMgPSB7XHJcbiAgaXRlbXM6IFRpbWVsaW5lSXRlbVtdO1xyXG4gIG5vRGF0YVRleHQ6IHN0cmluZztcclxuICBlcnJvck1lc3NhZ2U6IHN0cmluZztcclxuICBvbk5hdmlnYXRlOiAobGlua0lkOiBzdHJpbmcpID0+IHZvaWQ7XHJcbn07XHJcblxyXG5jb25zdCBUQVBfTU9WRV9QWCA9IDE0O1xyXG5jb25zdCBIT0xEX1RPX1BSRVZJRVdfTVMgPSAxNjA7XHJcblxyXG50eXBlIFRhcEd1YXJkU3RhdGUgPSB7XHJcbiAgYWN0aXZlOiBib29sZWFuO1xyXG4gIHBvaW50ZXJJZDogbnVtYmVyIHwgbnVsbDtcclxuICBzdGFydFg6IG51bWJlcjtcclxuICBzdGFydFk6IG51bWJlcjtcclxuICBzdGFydFRpbWU6IG51bWJlcjtcclxuICBtb3ZlZDogYm9vbGVhbjtcclxuICBsaW5rSWQ6IHN0cmluZztcclxufTtcclxuXHJcbmNvbnN0IEhpc3RvcnlUYWJsZSA9ICh7IGl0ZW1zLCBub0RhdGFUZXh0LCBlcnJvck1lc3NhZ2UsIG9uTmF2aWdhdGUgfTogUHJvcHMpID0+IHtcclxuICBjb25zdCBjb250YWluZXJSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcclxuICBjb25zdCB0YXBHdWFyZFJlZiA9IHVzZVJlZjxUYXBHdWFyZFN0YXRlPih7XHJcbiAgICBhY3RpdmU6IGZhbHNlLFxyXG4gICAgcG9pbnRlcklkOiBudWxsLFxyXG4gICAgc3RhcnRYOiAwLFxyXG4gICAgc3RhcnRZOiAwLFxyXG4gICAgc3RhcnRUaW1lOiAwLFxyXG4gICAgbW92ZWQ6IGZhbHNlLFxyXG4gICAgbGlua0lkOiBcIlwiLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCByZXNvbHZlQ2xpY2thYmxlQ2FyZCA9IHVzZUNhbGxiYWNrKCh0YXJnZXQ6IEV2ZW50VGFyZ2V0IHwgbnVsbCkgPT4ge1xyXG4gICAgY29uc3Qgbm9kZSA9IHRhcmdldCBhcyBIVE1MRWxlbWVudCB8IG51bGw7XHJcbiAgICBpZiAoIW5vZGUgfHwgdHlwZW9mIG5vZGUuY2xvc2VzdCAhPT0gXCJmdW5jdGlvblwiKSByZXR1cm4gbnVsbDtcclxuICAgIGNvbnN0IGNhcmQgPSBub2RlLmNsb3Nlc3Q8SFRNTEVsZW1lbnQ+KFwiLnRpbWVsaW5lLWNhcmQtLWNsaWNrYWJsZVtkYXRhLWxpbmstaWRdXCIpO1xyXG4gICAgaWYgKCFjYXJkKSByZXR1cm4gbnVsbDtcclxuICAgIGlmICghY29udGFpbmVyUmVmLmN1cnJlbnQ/LmNvbnRhaW5zKGNhcmQpKSByZXR1cm4gbnVsbDtcclxuICAgIHJldHVybiBjYXJkO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgcmVzZXRUYXBHdWFyZCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIHRhcEd1YXJkUmVmLmN1cnJlbnQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB0YXBHdWFyZFJlZi5jdXJyZW50LnBvaW50ZXJJZCA9IG51bGw7XHJcbiAgICB0YXBHdWFyZFJlZi5jdXJyZW50Lm1vdmVkID0gZmFsc2U7XHJcbiAgICB0YXBHdWFyZFJlZi5jdXJyZW50LmxpbmtJZCA9IFwiXCI7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBoYW5kbGVQb2ludGVyRG93biA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKGV2ZW50OiBSZWFjdC5Qb2ludGVyRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB7XHJcbiAgICAgIGlmIChldmVudC5wb2ludGVyVHlwZSA9PT0gXCJtb3VzZVwiICYmIGV2ZW50LmJ1dHRvbiAhPT0gMCkgcmV0dXJuO1xyXG4gICAgICBjb25zdCBjYXJkID0gcmVzb2x2ZUNsaWNrYWJsZUNhcmQoZXZlbnQudGFyZ2V0KTtcclxuICAgICAgaWYgKCFjYXJkKSByZXR1cm47XHJcbiAgICAgIGNvbnN0IGxpbmtJZCA9IGNhcmQuZGF0YXNldC5saW5rSWQgfHwgXCJcIjtcclxuICAgICAgaWYgKCFsaW5rSWQpIHJldHVybjtcclxuXHJcbiAgICAgIHRhcEd1YXJkUmVmLmN1cnJlbnQuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgdGFwR3VhcmRSZWYuY3VycmVudC5wb2ludGVySWQgPSBldmVudC5wb2ludGVySWQ7XHJcbiAgICAgIHRhcEd1YXJkUmVmLmN1cnJlbnQuc3RhcnRYID0gZXZlbnQuY2xpZW50WDtcclxuICAgICAgdGFwR3VhcmRSZWYuY3VycmVudC5zdGFydFkgPSBldmVudC5jbGllbnRZO1xyXG4gICAgICB0YXBHdWFyZFJlZi5jdXJyZW50LnN0YXJ0VGltZSA9IERhdGUubm93KCk7XHJcbiAgICAgIHRhcEd1YXJkUmVmLmN1cnJlbnQubW92ZWQgPSBmYWxzZTtcclxuICAgICAgdGFwR3VhcmRSZWYuY3VycmVudC5saW5rSWQgPSBsaW5rSWQ7XHJcbiAgICB9LFxyXG4gICAgW3Jlc29sdmVDbGlja2FibGVDYXJkXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZVBvaW50ZXJNb3ZlID0gdXNlQ2FsbGJhY2soKGV2ZW50OiBSZWFjdC5Qb2ludGVyRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB7XHJcbiAgICBjb25zdCBzdGF0ZSA9IHRhcEd1YXJkUmVmLmN1cnJlbnQ7XHJcbiAgICBpZiAoIXN0YXRlLmFjdGl2ZSB8fCBldmVudC5wb2ludGVySWQgIT09IHN0YXRlLnBvaW50ZXJJZCkgcmV0dXJuO1xyXG4gICAgY29uc3QgZHggPSBNYXRoLmFicyhldmVudC5jbGllbnRYIC0gc3RhdGUuc3RhcnRYKTtcclxuICAgIGNvbnN0IGR5ID0gTWF0aC5hYnMoZXZlbnQuY2xpZW50WSAtIHN0YXRlLnN0YXJ0WSk7XHJcbiAgICBpZiAoZHggPiBUQVBfTU9WRV9QWCB8fCBkeSA+IFRBUF9NT1ZFX1BYKSB7XHJcbiAgICAgIHN0YXRlLm1vdmVkID0gdHJ1ZTtcclxuICAgIH1cclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZVBvaW50ZXJVcCA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKGV2ZW50OiBSZWFjdC5Qb2ludGVyRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB7XHJcbiAgICAgIGNvbnN0IHN0YXRlID0gdGFwR3VhcmRSZWYuY3VycmVudDtcclxuICAgICAgaWYgKCFzdGF0ZS5hY3RpdmUgfHwgZXZlbnQucG9pbnRlcklkICE9PSBzdGF0ZS5wb2ludGVySWQpIHJldHVybjtcclxuICAgICAgY29uc3QgbGlua0lkID0gc3RhdGUubGlua0lkO1xyXG4gICAgICBjb25zdCBoZWxkTXMgPSBEYXRlLm5vdygpIC0gc3RhdGUuc3RhcnRUaW1lO1xyXG4gICAgICBjb25zdCBzaG91bGRUYXAgPSAhc3RhdGUubW92ZWQgJiYgaGVsZE1zIDwgSE9MRF9UT19QUkVWSUVXX01TO1xyXG4gICAgICByZXNldFRhcEd1YXJkKCk7XHJcbiAgICAgIGlmIChzaG91bGRUYXAgJiYgbGlua0lkKSB7XHJcbiAgICAgICAgb25OYXZpZ2F0ZShsaW5rSWQpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgW29uTmF2aWdhdGUsIHJlc2V0VGFwR3VhcmRdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgYmxvY2tDbGlwYm9hcmRBY3Rpb24gPSB1c2VDYWxsYmFjayhcclxuICAgIChldmVudDogUmVhY3QuQ2xpcGJvYXJkRXZlbnQ8SFRNTERpdkVsZW1lbnQ+IHwgUmVhY3QuTW91c2VFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHtcclxuICAgICAgaWYgKCFyZXNvbHZlQ2xpY2thYmxlQ2FyZChldmVudC50YXJnZXQpKSByZXR1cm47XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9LFxyXG4gICAgW3Jlc29sdmVDbGlja2FibGVDYXJkXVxyXG4gICk7XHJcblxyXG4gIHVzZVRpbWVsaW5lQ2FyZEVmZmVjdHMoeyBjb250YWluZXJSZWYsIGVycm9yTWVzc2FnZSwgaXRlbXMsIHJlc29sdmVDbGlja2FibGVDYXJkIH0pO1xyXG5cclxuICBjb25zdCBoYXNJdGVtcyA9IGl0ZW1zLmxlbmd0aCA+IDA7XHJcbiAgY29uc3Qgc2hvd0VtcHR5ID0gIWVycm9yTWVzc2FnZSAmJiAhaGFzSXRlbXM7XHJcblxyXG4gIGNvbnN0IGNvbnRlbnQgPSBlcnJvck1lc3NhZ2UgPyAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtZGFuZ2VyXCI+e2Vycm9yTWVzc2FnZX08L2Rpdj5cclxuICApIDogaGFzSXRlbXMgPyAoXHJcbiAgICBpdGVtcy5tYXAoKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCBrZXkgPSBpdGVtLmlkIHx8IGl0ZW0ucmVjSWQ/LnRvU3RyaW5nKCkgfHwgYHRpbWVsaW5lLSR7aW5kZXh9YDtcbiAgICAgIGNvbnN0IGlzQ2xpY2thYmxlID0gIWl0ZW0uaXNOb0RhdGEgJiYgISFpdGVtLmlkO1xuICAgICAgY29uc3Qgc2hvd0Rlc2NyaXB0aW9uID0gaXRlbS5oYXNEZXNjcmlwdGlvbiB8fCBpdGVtLmlzTm9EYXRhO1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBrZXk9e2tleX0gY2xhc3NOYW1lPVwidGltZWxpbmUtaXRlbVwiPlxuICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxyXG4gICAgICAgICAgICAgIFwidGltZWxpbmUtY2FyZFwiLFxyXG4gICAgICAgICAgICAgIGl0ZW0uaXNOb0RhdGEgPyBcInRpbWVsaW5lLWNhcmQtLW5vZGF0YVwiIDogXCJcIixcclxuICAgICAgICAgICAgICBpc0NsaWNrYWJsZSA/IFwidGltZWxpbmUtY2FyZC0tY2xpY2thYmxlXCIgOiBcIlwiXHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgIGRhdGEtYWN0aXZpZGFkaWQ9e2l0ZW0uYWN0aXZpZGFkSWQgfHwgXCJcIn1cclxuICAgICAgICAgICAgZGF0YS1yZWNpZD17aXRlbS5yZWNJZCAhPSBudWxsID8gU3RyaW5nKGl0ZW0ucmVjSWQpIDogXCJcIn1cclxuICAgICAgICAgICAgZGF0YS1saW5rLWlkPXtpc0NsaWNrYWJsZSA/IGl0ZW0uaWQgOiBcIlwifVxyXG4gICAgICAgICAgICByb2xlPXtpc0NsaWNrYWJsZSA/IFwiYnV0dG9uXCIgOiB1bmRlZmluZWR9XHJcbiAgICAgICAgICAgIHRhYkluZGV4PXtpc0NsaWNrYWJsZSA/IDAgOiB1bmRlZmluZWR9XHJcbiAgICAgICAgICAgIGFyaWEtbGFiZWw9e2lzQ2xpY2thYmxlID8gKGl0ZW0uZnVsbE5hbWUgfHwgaXRlbS5uYW1lIHx8IG5vRGF0YVRleHQpIDogdW5kZWZpbmVkfVxyXG4gICAgICAgICAgICBvbktleURvd249e2lzQ2xpY2thYmxlXHJcbiAgICAgICAgICAgICAgPyAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChldmVudC5rZXkgPT09IFwiRW50ZXJcIiB8fCBldmVudC5rZXkgPT09IFwiIFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgIG9uTmF2aWdhdGUoaXRlbS5pZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIDogdW5kZWZpbmVkfVxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpbWVsaW5lLWRhdGUtcGFuZWwgZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTEgcHgtMyBweS0zIGJnLXNsYXRlLTUwIGJvcmRlci1yIGJvcmRlci1zbGF0ZS0yMDAgdGV4dC1zbGF0ZS02MDBcIj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1zZW1pYm9sZCB0cmFja2luZy1bMC4yZW1dIHRleHQtc2xhdGUtNTAwXCI+e2l0ZW0uZGF0ZVBhcnRzLnllYXJ9PC9kaXY+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdXBwZXJjYXNlIHRyYWNraW5nLVswLjJlbV0gdGV4dC1zbGF0ZS01MDBcIj57aXRlbS5kYXRlUGFydHMubW9udGh9PC9kaXY+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LTJ4bCBmb250LXNlbWlib2xkIHRleHQtcHJpbWFyeVwiPntpdGVtLmRhdGVQYXJ0cy5kYXl9PC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aW1lbGluZS1jYXJkX19jb250ZW50IGZsZXgtMSBweS0zIHB4LTRcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aW1lbGluZS1uYW1lXCIgZGF0YS1mdWxsdGV4dD17aXRlbS5mdWxsTmFtZSB8fCBpdGVtLm5hbWV9PntpdGVtLm5hbWV9PC9kaXY+XG4gICAgICAgICAgICAgIHtzaG93RGVzY3JpcHRpb24gPyAoXG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGltZWxpbmUtZGVzYy10ZXh0XCIgZGF0YS1mdWxsdGV4dD17aXRlbS5mdWxsRGVzYyB8fCBpdGVtLmRlc2NyaXB0aW9ufT5cbiAgICAgICAgICAgICAgICAgIHtpdGVtLmRlc2NyaXB0aW9uIHx8IG5vRGF0YVRleHR9XG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XHJcbiAgICB9KVxyXG4gICkgOiBudWxsO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdlxyXG4gICAgICBpZD1cInRpbWVsaW5lQ29udGFpbmVyXCJcclxuICAgICAgcmVmPXtjb250YWluZXJSZWZ9XHJcbiAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcInRpbWVsaW5lLWJveFwiLCBzaG93RW1wdHkgPyBcInRpbWVsaW5lLWVtcHR5XCIgOiBcIlwiKX1cclxuICAgICAgZGF0YS1lbXB0eS10ZXh0PXtub0RhdGFUZXh0fVxyXG4gICAgICBvblBvaW50ZXJEb3duQ2FwdHVyZT17aGFuZGxlUG9pbnRlckRvd259XHJcbiAgICAgIG9uUG9pbnRlck1vdmVDYXB0dXJlPXtoYW5kbGVQb2ludGVyTW92ZX1cclxuICAgICAgb25Qb2ludGVyVXBDYXB0dXJlPXtoYW5kbGVQb2ludGVyVXB9XHJcbiAgICAgIG9uUG9pbnRlckNhbmNlbENhcHR1cmU9e3Jlc2V0VGFwR3VhcmR9XHJcbiAgICAgIG9uUG9pbnRlckxlYXZlPXtyZXNldFRhcEd1YXJkfVxyXG4gICAgICBvbkNvbnRleHRNZW51Q2FwdHVyZT17YmxvY2tDbGlwYm9hcmRBY3Rpb259XHJcbiAgICAgIG9uQ29weUNhcHR1cmU9e2Jsb2NrQ2xpcGJvYXJkQWN0aW9ufVxyXG4gICAgICBvbkN1dENhcHR1cmU9e2Jsb2NrQ2xpcGJvYXJkQWN0aW9ufVxyXG4gICAgICBvblBhc3RlQ2FwdHVyZT17YmxvY2tDbGlwYm9hcmRBY3Rpb259XHJcbiAgICA+XHJcbiAgICAgIHtjb250ZW50fVxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbmNvbnN0IE1lbW9pemVkSGlzdG9yeVRhYmxlID0gUmVhY3QubWVtbyhIaXN0b3J5VGFibGUpO1xyXG5NZW1vaXplZEhpc3RvcnlUYWJsZS5kaXNwbGF5TmFtZSA9IFwiSGlzdG9yeVRhYmxlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNZW1vaXplZEhpc3RvcnlUYWJsZTtcclxuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IENvbXBhY3RQYWdpbmF0aW9uIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvQ29tcGFjdFBhZ2luYXRpb24udHN4XCI7XHJcbmltcG9ydCBIaXN0b3J5VGFibGUsIHsgdHlwZSBUaW1lbGluZUl0ZW0gfSBmcm9tIFwiLi9IaXN0b3J5VGFibGUudHN4XCI7XHJcblxyXG50eXBlIFBhZ2luYXRpb25MYWJlbHMgPSB7XHJcbiAgZmlyc3Q6IHN0cmluZztcclxuICBwcmV2OiBzdHJpbmc7XHJcbiAgbmV4dDogc3RyaW5nO1xyXG4gIGxhc3Q6IHN0cmluZztcclxufTtcclxuXHJcbnR5cGUgUHJvcHMgPSB7XHJcbiAgc2hvd1Jlc3VsdHM6IGJvb2xlYW47XHJcbiAgaXNMb2FkaW5nOiBib29sZWFuO1xyXG4gIGxvYWRpbmdMYWJlbDogc3RyaW5nO1xyXG4gIHRpbWVsaW5lSXRlbXM6IFRpbWVsaW5lSXRlbVtdO1xyXG4gIG5vRGF0YVRleHQ6IHN0cmluZztcclxuICBlcnJvck1lc3NhZ2U6IHN0cmluZztcclxuICB0b3RhbFBhZ2VzOiBudW1iZXI7XHJcbiAgY3VycmVudFBhZ2U6IG51bWJlcjtcclxuICBwYWdlV2luZG93OiBudW1iZXI7XHJcbiAgcGFnaW5hdGlvbkxhYmVsczogUGFnaW5hdGlvbkxhYmVscztcclxuICBvbk5hdmlnYXRlOiAobGlua0lkOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgb25QYWdlQ2hhbmdlOiAocGFnZTogbnVtYmVyKSA9PiB2b2lkO1xyXG59O1xyXG5cclxuLy8gUmVuZGVycyBoaXN0b3J5IGxvYWRpbmcsIHRhYmxlIGFuZCBwYWdpbmF0aW9uIGFzIGEgZm9jdXNlZCByZXN1bHQgc2VjdGlvbi5cclxuY29uc3QgSGlzdG9yeVJlc3VsdHNTZWN0aW9uID0gKHtcclxuICBzaG93UmVzdWx0cyxcclxuICBpc0xvYWRpbmcsXHJcbiAgbG9hZGluZ0xhYmVsLFxyXG4gIHRpbWVsaW5lSXRlbXMsXHJcbiAgbm9EYXRhVGV4dCxcclxuICBlcnJvck1lc3NhZ2UsXHJcbiAgdG90YWxQYWdlcyxcclxuICBjdXJyZW50UGFnZSxcclxuICBwYWdlV2luZG93LFxyXG4gIHBhZ2luYXRpb25MYWJlbHMsXHJcbiAgb25OYXZpZ2F0ZSxcclxuICBvblBhZ2VDaGFuZ2UsXHJcbn06IFByb3BzKSA9PiB7XHJcbiAgcmV0dXJuIChcclxuICAgIDw+XHJcbiAgICAgIDxkaXZcclxuICAgICAgICBpZD1cInJlc3VsdHNMb2FkZXJcIlxyXG4gICAgICAgIGNsYXNzTmFtZT1cImxvYWRlci1ib3ggZ2xhc3MtcGFuZWwgc2hhZG93LWNhcmQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC1zbSB0ZXh0LW5ldXRyYWwtNzAwXCJcclxuICAgICAgICBzdHlsZT17eyBkaXNwbGF5OiBpc0xvYWRpbmcgPyBcImZsZXhcIiA6IFwibm9uZVwiIH19XHJcbiAgICAgID5cclxuICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cImluZC1zcGlubmVyIHNpemUtNVwiIHZpZXdCb3g9XCIwIDAgMjAgMjBcIiByb2xlPVwic3RhdHVzXCIgYXJpYS1sYWJlbD17bG9hZGluZ0xhYmVsfT5cclxuICAgICAgICAgIDxjaXJjbGUgY2xhc3NOYW1lPVwiaW5kLXNwaW5uZXJfX2NpcmNsZVwiIGN4PVwiMTBcIiBjeT1cIjEwXCIgcj1cIjhcIiBzdHJva2VXaWR0aD1cIjJcIiAvPlxyXG4gICAgICAgIDwvc3ZnPlxyXG4gICAgICAgIHtsb2FkaW5nTGFiZWx9XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAge3Nob3dSZXN1bHRzICYmIChcclxuICAgICAgICA8PlxyXG4gICAgICAgICAgPEhpc3RvcnlUYWJsZVxyXG4gICAgICAgICAgICBpdGVtcz17dGltZWxpbmVJdGVtc31cclxuICAgICAgICAgICAgbm9EYXRhVGV4dD17bm9EYXRhVGV4dH1cclxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlPXtlcnJvck1lc3NhZ2V9XHJcbiAgICAgICAgICAgIG9uTmF2aWdhdGU9e29uTmF2aWdhdGV9XHJcbiAgICAgICAgICAvPlxyXG5cclxuICAgICAgICAgIDxDb21wYWN0UGFnaW5hdGlvblxyXG4gICAgICAgICAgICB0b3RhbFBhZ2VzPXt0b3RhbFBhZ2VzfVxyXG4gICAgICAgICAgICBjdXJyZW50UGFnZT17Y3VycmVudFBhZ2V9XHJcbiAgICAgICAgICAgIHBhZ2VXaW5kb3c9e3BhZ2VXaW5kb3d9XHJcbiAgICAgICAgICAgIGxvYWRpbmc9e2lzTG9hZGluZ31cclxuICAgICAgICAgICAgb25QYWdlQ2hhbmdlPXtvblBhZ2VDaGFuZ2V9XHJcbiAgICAgICAgICAgIGxhYmVscz17cGFnaW5hdGlvbkxhYmVsc31cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgPC8+XHJcbiAgICAgICl9XHJcbiAgICA8Lz5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgSGlzdG9yeVJlc3VsdHNTZWN0aW9uO1xyXG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZU1lbW8sIHR5cGUgRGlzcGF0Y2gsIHR5cGUgTW91c2VFdmVudCBhcyBSZWFjdE1vdXNlRXZlbnQsIHR5cGUgU2V0U3RhdGVBY3Rpb24gfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgY2xhc3NOYW1lcyB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9jbGFzc05hbWVzLnRzXCI7XHJcbmltcG9ydCB0eXBlIHsgSGlzdG9yeU1hbnVhbERheUNlbGwgfSBmcm9tIFwiLi9IaXN0b3J5TWFudWFsRGF0ZVBpY2tlci50c3hcIjtcclxuXHJcbnR5cGUgQ2FsZW5kYXJDZWxsID0ge1xyXG4gIGRhdGU6IERhdGUgfCBudWxsO1xyXG4gIGlzbzogc3RyaW5nO1xyXG4gIGlzRW1wdHk6IGJvb2xlYW47XHJcbn07XHJcblxyXG50eXBlIEFyZ3MgPSB7XHJcbiAgY3VycmVudE1vbnRoOiBudW1iZXI7XHJcbiAgY3VycmVudFllYXI6IG51bWJlcjtcclxuICBsb2NhbGU6IHN0cmluZztcclxuICBzdGFydERhdGU6IERhdGUgfCBudWxsO1xyXG4gIGVuZERhdGU6IERhdGUgfCBudWxsO1xyXG4gIGhvdmVyRGF0ZTogRGF0ZSB8IG51bGw7XHJcbiAgc2VsZWN0aW5nU3RlcDogXCJzdGFydFwiIHwgXCJlbmRcIiB8IFwiZG9uZVwiO1xyXG4gIHNldEN1cnJlbnRNb250aDogRGlzcGF0Y2g8U2V0U3RhdGVBY3Rpb248bnVtYmVyPj47XHJcbiAgc2V0Q3VycmVudFllYXI6IERpc3BhdGNoPFNldFN0YXRlQWN0aW9uPG51bWJlcj4+O1xyXG4gIHNldEhvdmVyRGF0ZTogRGlzcGF0Y2g8U2V0U3RhdGVBY3Rpb248RGF0ZSB8IG51bGw+PjtcclxuICBoYW5kbGVTZWxlY3Q6IChkYXRlT2JqOiBEYXRlKSA9PiB2b2lkO1xyXG4gIGxvZ0hpc3Rvcnk6IChtZXNzYWdlOiBzdHJpbmcsIGRhdGE/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPikgPT4gdm9pZDtcclxuICB0b0lTTzogKHZhbHVlOiBEYXRlKSA9PiBzdHJpbmc7XHJcbiAgaXNCZWZvcmU6IChhOiBEYXRlIHwgbnVsbCwgYjogRGF0ZSB8IG51bGwpID0+IGJvb2xlYW47XHJcbiAgZm9ybWF0TW9udGhMYWJlbDogKHZhbHVlOiBEYXRlLCBsb2NhbGU6IHN0cmluZykgPT4gc3RyaW5nO1xyXG59O1xyXG5cclxuY29uc3Qgc2FtZURheSA9IChhOiBEYXRlIHwgbnVsbCwgYjogRGF0ZSB8IG51bGwpID0+ICEhKGEgJiYgYiAmJiBhLmdldFRpbWUoKSA9PT0gYi5nZXRUaW1lKCkpO1xyXG5cclxuLy8gT3ducyBjYWxlbmRhciBtb250aCBuYXZpZ2F0aW9uIGFuZCBkYXktY2VsbCBkZXJpdmF0aW9uIGZvciB0aGUgaGlzdG9yeSBwaWNrZXIuXHJcbmV4cG9ydCBjb25zdCB1c2VIaXN0b3J5Q2FsZW5kYXJQaWNrZXIgPSAoe1xyXG4gIGN1cnJlbnRNb250aCxcclxuICBjdXJyZW50WWVhcixcclxuICBsb2NhbGUsXHJcbiAgc3RhcnREYXRlLFxyXG4gIGVuZERhdGUsXHJcbiAgaG92ZXJEYXRlLFxyXG4gIHNlbGVjdGluZ1N0ZXAsXHJcbiAgc2V0Q3VycmVudE1vbnRoLFxyXG4gIHNldEN1cnJlbnRZZWFyLFxyXG4gIHNldEhvdmVyRGF0ZSxcclxuICBoYW5kbGVTZWxlY3QsXHJcbiAgbG9nSGlzdG9yeSxcclxuICB0b0lTTyxcclxuICBpc0JlZm9yZSxcclxuICBmb3JtYXRNb250aExhYmVsLFxyXG59OiBBcmdzKSA9PiB7XHJcbiAgY29uc3QgY2FsZW5kYXIgPSB1c2VNZW1vKCgpID0+IHtcclxuICAgIGNvbnN0IGZpcnN0RGF5ID0gbmV3IERhdGUoY3VycmVudFllYXIsIGN1cnJlbnRNb250aCwgMSk7XHJcbiAgICBjb25zdCBkYXlzSW5Nb250aCA9IG5ldyBEYXRlKGN1cnJlbnRZZWFyLCBjdXJyZW50TW9udGggKyAxLCAwKS5nZXREYXRlKCk7XHJcbiAgICBjb25zdCBvZmZzZXQgPSAoZmlyc3REYXkuZ2V0RGF5KCkgKyA2KSAlIDc7XHJcbiAgICBjb25zdCBjZWxsczogQ2FsZW5kYXJDZWxsW10gPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb2Zmc2V0OyBpKyspIHtcclxuICAgICAgY2VsbHMucHVzaCh7IGRhdGU6IG51bGwsIGlzbzogXCJcIiwgaXNFbXB0eTogdHJ1ZSB9KTtcclxuICAgIH1cclxuICAgIGZvciAobGV0IGQgPSAxOyBkIDw9IGRheXNJbk1vbnRoOyBkKyspIHtcclxuICAgICAgY29uc3QgZGF0ZU9iaiA9IG5ldyBEYXRlKGN1cnJlbnRZZWFyLCBjdXJyZW50TW9udGgsIGQpO1xyXG4gICAgICBjZWxscy5wdXNoKHsgZGF0ZTogZGF0ZU9iaiwgaXNvOiB0b0lTTyhkYXRlT2JqKSwgaXNFbXB0eTogZmFsc2UgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBjZWxscyxcclxuICAgICAgbGFiZWw6IGZvcm1hdE1vbnRoTGFiZWwoZmlyc3REYXksIGxvY2FsZSksXHJcbiAgICB9O1xyXG4gIH0sIFtjdXJyZW50TW9udGgsIGN1cnJlbnRZZWFyLCBmb3JtYXRNb250aExhYmVsLCBsb2NhbGUsIHRvSVNPXSk7XHJcblxyXG4gIGNvbnN0IHByZXZpZXdFbmQgPSBlbmREYXRlIHx8IChzZWxlY3RpbmdTdGVwID09PSBcImVuZFwiID8gaG92ZXJEYXRlIDogbnVsbCk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZVByZXZNb250aCA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKGV2ZW50OiBSZWFjdE1vdXNlRXZlbnQ8SFRNTEJ1dHRvbkVsZW1lbnQ+KSA9PiB7XHJcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICBzZXRDdXJyZW50TW9udGgoKHByZXYpID0+IHtcclxuICAgICAgICBjb25zdCBuZXh0ID0gcHJldiAtIDE7XHJcbiAgICAgICAgaWYgKG5leHQgPCAwKSB7XHJcbiAgICAgICAgICBzZXRDdXJyZW50WWVhcigoeWVhcikgPT4geWVhciAtIDEpO1xyXG4gICAgICAgICAgcmV0dXJuIDExO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV4dDtcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgW3NldEN1cnJlbnRNb250aCwgc2V0Q3VycmVudFllYXJdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlTmV4dE1vbnRoID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoZXZlbnQ6IFJlYWN0TW91c2VFdmVudDxIVE1MQnV0dG9uRWxlbWVudD4pID0+IHtcclxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIHNldEN1cnJlbnRNb250aCgocHJldikgPT4ge1xyXG4gICAgICAgIGNvbnN0IG5leHQgPSBwcmV2ICsgMTtcclxuICAgICAgICBpZiAobmV4dCA+IDExKSB7XHJcbiAgICAgICAgICBzZXRDdXJyZW50WWVhcigoeWVhcikgPT4geWVhciArIDEpO1xyXG4gICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXh0O1xyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBbc2V0Q3VycmVudE1vbnRoLCBzZXRDdXJyZW50WWVhcl1cclxuICApO1xyXG5cclxuICBjb25zdCBoYW5kbGVHcmlkTW91c2VMZWF2ZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIHNldEhvdmVyRGF0ZShudWxsKTtcclxuICB9LCBbc2V0SG92ZXJEYXRlXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZU1hbnVhbERheUNsaWNrID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoY2VsbDogSGlzdG9yeU1hbnVhbERheUNlbGwpID0+IHtcclxuICAgICAgaWYgKCFjZWxsLmRhdGUpIHJldHVybjtcclxuICAgICAgbG9nSGlzdG9yeShcImRheUNsaWNrXCIsIHsgZGF0ZTogY2VsbC5pc28gfHwgXCJcIiwgZGlzYWJsZWQ6ICEhY2VsbC5kaXNhYmxlZCB9KTtcclxuICAgICAgaGFuZGxlU2VsZWN0KGNlbGwuZGF0ZSk7XHJcbiAgICB9LFxyXG4gICAgW2hhbmRsZVNlbGVjdCwgbG9nSGlzdG9yeV1cclxuICApO1xyXG5cclxuICBjb25zdCBoYW5kbGVNYW51YWxEYXlIb3ZlciA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKGNlbGw6IEhpc3RvcnlNYW51YWxEYXlDZWxsKSA9PiB7XHJcbiAgICAgIGlmICghY2VsbC5kYXRlKSByZXR1cm47XHJcbiAgICAgIGlmIChzZWxlY3RpbmdTdGVwID09PSBcImVuZFwiICYmIHN0YXJ0RGF0ZSkge1xyXG4gICAgICAgIHNldEhvdmVyRGF0ZShuZXcgRGF0ZShjZWxsLmRhdGUpKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFtzZWxlY3RpbmdTdGVwLCBzZXRIb3ZlckRhdGUsIHN0YXJ0RGF0ZV1cclxuICApO1xyXG5cclxuICBjb25zdCBtYW51YWxEYXlDZWxscyA9IHVzZU1lbW88SGlzdG9yeU1hbnVhbERheUNlbGxbXT4oKCkgPT4ge1xyXG4gICAgcmV0dXJuIGNhbGVuZGFyLmNlbGxzLm1hcCgoY2VsbCwgaWR4KSA9PiB7XHJcbiAgICAgIGlmIChjZWxsLmlzRW1wdHkpIHtcclxuICAgICAgICByZXR1cm4geyBrZXk6IGBlbXB0eS0ke2lkeH1gLCBpc0VtcHR5OiB0cnVlIH07XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGRhdGVPYmogPSBjZWxsLmRhdGUgYXMgRGF0ZTtcclxuICAgICAgY29uc3QgaXNTdGFydCA9IHNhbWVEYXkoZGF0ZU9iaiwgc3RhcnREYXRlKTtcclxuICAgICAgY29uc3QgaXNFbmQgPSBzYW1lRGF5KGRhdGVPYmosIGVuZERhdGUpO1xyXG4gICAgICBjb25zdCBpblJhbmdlID0gc3RhcnREYXRlICYmIHByZXZpZXdFbmQgJiYgaXNCZWZvcmUoc3RhcnREYXRlLCBkYXRlT2JqKSAmJiBpc0JlZm9yZShkYXRlT2JqLCBwcmV2aWV3RW5kKTtcclxuICAgICAgY29uc3QgaG92ZXJSYW5nZSA9IHN0YXJ0RGF0ZSAmJiAhZW5kRGF0ZSAmJiBob3ZlckRhdGUgJiYgaXNCZWZvcmUoc3RhcnREYXRlLCBkYXRlT2JqKSAmJiBpc0JlZm9yZShkYXRlT2JqLCBob3ZlckRhdGUpO1xyXG4gICAgICBjb25zdCBkaXNhYmxlZCA9IHNlbGVjdGluZ1N0ZXAgPT09IFwiZW5kXCIgJiYgISFzdGFydERhdGUgJiYgaXNCZWZvcmUoZGF0ZU9iaiwgc3RhcnREYXRlKTtcclxuICAgICAgY29uc3QgaXNUb2RheSA9IHNhbWVEYXkoZGF0ZU9iaiwgbmV3IERhdGUoKSk7XHJcblxyXG4gICAgICBjb25zdCBkYXlDbGFzcyA9IGNsYXNzTmFtZXMoXHJcbiAgICAgICAgXCJkcnAtZGF5XCIsXHJcbiAgICAgICAgaXNTdGFydCA/IFwic3RhcnQgcmFuZ2Utc3RhcnRcIiA6IFwiXCIsXHJcbiAgICAgICAgaXNFbmQgPyBcImVuZCByYW5nZS1lbmRcIiA6IFwiXCIsXHJcbiAgICAgICAgaW5SYW5nZSA/IFwiaW4tcmFuZ2VcIiA6IFwiXCIsXHJcbiAgICAgICAgaG92ZXJSYW5nZSA/IFwiaG92ZXItcmFuZ2VcIiA6IFwiXCIsXHJcbiAgICAgICAgZGlzYWJsZWQgPyBcImRpc2FibGVkXCIgOiBcIlwiLFxyXG4gICAgICAgIGlzVG9kYXkgPyBcInRvZGF5XCIgOiBcIlwiXHJcbiAgICAgICk7XHJcblxyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIGtleTogY2VsbC5pc28sXHJcbiAgICAgICAgaXNFbXB0eTogZmFsc2UsXHJcbiAgICAgICAgZGF0ZTogZGF0ZU9iaixcclxuICAgICAgICBpc286IGNlbGwuaXNvLFxyXG4gICAgICAgIGRheUxhYmVsOiBkYXRlT2JqLmdldERhdGUoKSxcclxuICAgICAgICBkYXlDbGFzcyxcclxuICAgICAgICBkaXNhYmxlZCxcclxuICAgICAgfTtcclxuICAgIH0pO1xyXG4gIH0sIFtjYWxlbmRhci5jZWxscywgZW5kRGF0ZSwgaG92ZXJEYXRlLCBpc0JlZm9yZSwgcHJldmlld0VuZCwgc2VsZWN0aW5nU3RlcCwgc3RhcnREYXRlXSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBjYWxlbmRhckxhYmVsOiBjYWxlbmRhci5sYWJlbCxcclxuICAgIG1hbnVhbERheUNlbGxzLFxyXG4gICAgaGFuZGxlUHJldk1vbnRoLFxyXG4gICAgaGFuZGxlTmV4dE1vbnRoLFxyXG4gICAgaGFuZGxlR3JpZE1vdXNlTGVhdmUsXHJcbiAgICBoYW5kbGVNYW51YWxEYXlDbGljayxcclxuICAgIGhhbmRsZU1hbnVhbERheUhvdmVyLFxyXG4gIH07XHJcbn07XHJcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjaywgdHlwZSBEaXNwYXRjaCwgdHlwZSBNb3VzZUV2ZW50IGFzIFJlYWN0TW91c2VFdmVudCwgdHlwZSBTZXRTdGF0ZUFjdGlvbiB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgdHlwZSB7IExvYWRPdmVycmlkZSB9IGZyb20gXCIuL3VzZUhpc3RvcnlGaWx0ZXJzU3RhdGUudHNcIjtcclxuXHJcbnR5cGUgQXBwbHlPcHRpb25zID0ge1xyXG4gIGNsb3NlUGFuZWw/OiBib29sZWFuO1xyXG4gIGZvcmNlPzogYm9vbGVhbjtcclxuICBwYWdlPzogbnVtYmVyO1xyXG59O1xyXG5cclxudHlwZSBTdHJpbmdSZWYgPSB7XHJcbiAgY3VycmVudDogc3RyaW5nO1xyXG59O1xyXG5cclxudHlwZSBBcmdzID0ge1xyXG4gIHN0YXJ0RGF0ZTogRGF0ZSB8IG51bGw7XHJcbiAgZW5kRGF0ZTogRGF0ZSB8IG51bGw7XHJcbiAgZnJvbURhdGVWYWx1ZTogc3RyaW5nO1xyXG4gIHRvRGF0ZVZhbHVlOiBzdHJpbmc7XHJcbiAgYWNjb3VudE51bVZhbHVlOiBzdHJpbmc7XHJcbiAgb3duZXJBeFVzZXJJZFZhbHVlOiBzdHJpbmc7XHJcbiAgbGFzdFNpZ25hdHVyZVJlZjogU3RyaW5nUmVmO1xyXG4gIHZhbGlkYXRlTWFudWFsUmFuZ2U6ICgpID0+IGJvb2xlYW47XHJcbiAgbm9ybWFsaXplUmFuZ2U6IChmcm9tOiBzdHJpbmcsIHRvOiBzdHJpbmcpID0+IHsgZnJvbTogc3RyaW5nOyB0bzogc3RyaW5nIH07XHJcbiAgbG9hZEFjdGl2aXRpZXM6IChwYWdlOiBudW1iZXIsIG92ZXJyaWRlPzogTG9hZE92ZXJyaWRlKSA9PiB2b2lkO1xyXG4gIGhhbmRsZUNsZWFyU3RhdGU6IChldmVudDogUmVhY3RNb3VzZUV2ZW50KSA9PiB2b2lkO1xyXG4gIGNsZWFyRmlsdGVyQ2FjaGU6ICgpID0+IHZvaWQ7XHJcbiAgcmVzZXRBY3Rpdml0aWVzOiAoKSA9PiB2b2lkO1xyXG4gIHJlc2V0SGlzdG9yeUZpbHRlcnM6ICgpID0+IHZvaWQ7XHJcbiAgc2V0SXNPcGVuOiBEaXNwYXRjaDxTZXRTdGF0ZUFjdGlvbjxib29sZWFuPj47XHJcbiAgc2V0U2hvd0ZpbHRlcnM6IERpc3BhdGNoPFNldFN0YXRlQWN0aW9uPGJvb2xlYW4+PjtcclxuICBzZXRTaG93TWFudWFsRXJyb3I6IERpc3BhdGNoPFNldFN0YXRlQWN0aW9uPGJvb2xlYW4+PjtcclxufTtcclxuXHJcbi8vIEtlZXBzIGZpbHRlciBhcHBseS9yZXNldCBiZWhhdmlvciB0b2dldGhlciBhbmQgb3V0IG9mIHRoZSBwYWdlIHJlbmRlciBjb250YWluZXIuXHJcbmV4cG9ydCBjb25zdCB1c2VIaXN0b3J5RmlsdGVyQWN0aW9ucyA9ICh7XHJcbiAgc3RhcnREYXRlLFxyXG4gIGVuZERhdGUsXHJcbiAgZnJvbURhdGVWYWx1ZSxcclxuICB0b0RhdGVWYWx1ZSxcclxuICBhY2NvdW50TnVtVmFsdWUsXHJcbiAgb3duZXJBeFVzZXJJZFZhbHVlLFxyXG4gIGxhc3RTaWduYXR1cmVSZWYsXHJcbiAgdmFsaWRhdGVNYW51YWxSYW5nZSxcclxuICBub3JtYWxpemVSYW5nZSxcclxuICBsb2FkQWN0aXZpdGllcyxcclxuICBoYW5kbGVDbGVhclN0YXRlLFxyXG4gIGNsZWFyRmlsdGVyQ2FjaGUsXHJcbiAgcmVzZXRBY3Rpdml0aWVzLFxyXG4gIHJlc2V0SGlzdG9yeUZpbHRlcnMsXHJcbiAgc2V0SXNPcGVuLFxyXG4gIHNldFNob3dGaWx0ZXJzLFxyXG4gIHNldFNob3dNYW51YWxFcnJvcixcclxufTogQXJncykgPT4ge1xyXG4gIGNvbnN0IGFwcGx5RmlsdGVycyA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKG9wdGlvbnM/OiBBcHBseU9wdGlvbnMpID0+IHtcclxuICAgICAgaWYgKCF2YWxpZGF0ZU1hbnVhbFJhbmdlKCkpIHJldHVybjtcclxuICAgICAgaWYgKCFzdGFydERhdGUgfHwgIWVuZERhdGUpIHJldHVybjtcclxuXHJcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSBub3JtYWxpemVSYW5nZShmcm9tRGF0ZVZhbHVlLCB0b0RhdGVWYWx1ZSk7XHJcbiAgICAgIGNvbnN0IHBhZ2UgPSBvcHRpb25zPy5wYWdlID8/IDE7XHJcbiAgICAgIGNvbnN0IHNpZ25hdHVyZSA9IGAke25vcm1hbGl6ZWQuZnJvbX18JHtub3JtYWxpemVkLnRvfXwke2FjY291bnROdW1WYWx1ZX18JHtvd25lckF4VXNlcklkVmFsdWV9fCR7cGFnZX1gO1xyXG5cclxuICAgICAgaWYgKG9wdGlvbnM/LmZvcmNlIHx8IGxhc3RTaWduYXR1cmVSZWYuY3VycmVudCAhPT0gc2lnbmF0dXJlKSB7XHJcbiAgICAgICAgbG9hZEFjdGl2aXRpZXMocGFnZSwge1xyXG4gICAgICAgICAgZnJvbURhdGU6IG5vcm1hbGl6ZWQuZnJvbSxcclxuICAgICAgICAgIHRvRGF0ZTogbm9ybWFsaXplZC50byxcclxuICAgICAgICAgIGFjY291bnROdW06IGFjY291bnROdW1WYWx1ZSxcclxuICAgICAgICAgIG93bmVyQXhVc2VySWQ6IG93bmVyQXhVc2VySWRWYWx1ZSxcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2V0U2hvd01hbnVhbEVycm9yKGZhbHNlKTtcclxuICAgICAgaWYgKG9wdGlvbnM/LmNsb3NlUGFuZWwpIHtcclxuICAgICAgICBzZXRJc09wZW4oZmFsc2UpO1xyXG4gICAgICAgIHNldFNob3dGaWx0ZXJzKGZhbHNlKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFtcclxuICAgICAgYWNjb3VudE51bVZhbHVlLFxyXG4gICAgICBlbmREYXRlLFxyXG4gICAgICBmcm9tRGF0ZVZhbHVlLFxyXG4gICAgICBsYXN0U2lnbmF0dXJlUmVmLFxyXG4gICAgICBsb2FkQWN0aXZpdGllcyxcclxuICAgICAgb3duZXJBeFVzZXJJZFZhbHVlLFxyXG4gICAgICBzZXRJc09wZW4sXHJcbiAgICAgIHNldFNob3dGaWx0ZXJzLFxyXG4gICAgICBzZXRTaG93TWFudWFsRXJyb3IsXHJcbiAgICAgIHN0YXJ0RGF0ZSxcclxuICAgICAgdG9EYXRlVmFsdWUsXHJcbiAgICAgIHZhbGlkYXRlTWFudWFsUmFuZ2UsXHJcbiAgICAgIG5vcm1hbGl6ZVJhbmdlLFxyXG4gICAgXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUNsZWFyID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoZXZlbnQ6IFJlYWN0TW91c2VFdmVudCkgPT4ge1xyXG4gICAgICBoYW5kbGVDbGVhclN0YXRlKGV2ZW50KTtcclxuICAgICAgY2xlYXJGaWx0ZXJDYWNoZSgpO1xyXG4gICAgICByZXNldEFjdGl2aXRpZXMoKTtcclxuICAgIH0sXHJcbiAgICBbY2xlYXJGaWx0ZXJDYWNoZSwgaGFuZGxlQ2xlYXJTdGF0ZSwgcmVzZXRBY3Rpdml0aWVzXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZVJlc2V0RmlsdGVycyA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIHJlc2V0SGlzdG9yeUZpbHRlcnMoKTtcclxuICAgIGNsZWFyRmlsdGVyQ2FjaGUoKTtcclxuICAgIHJlc2V0QWN0aXZpdGllcygpO1xyXG4gICAgc2V0SXNPcGVuKGZhbHNlKTtcclxuICAgIHNldFNob3dGaWx0ZXJzKHRydWUpO1xyXG4gIH0sIFtjbGVhckZpbHRlckNhY2hlLCByZXNldEFjdGl2aXRpZXMsIHJlc2V0SGlzdG9yeUZpbHRlcnMsIHNldElzT3Blbiwgc2V0U2hvd0ZpbHRlcnNdKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGFwcGx5RmlsdGVycyxcclxuICAgIGhhbmRsZUNsZWFyLFxyXG4gICAgaGFuZGxlUmVzZXRGaWx0ZXJzLFxyXG4gIH07XHJcbn07XHJcbiIsICJpbXBvcnQgeyB1c2VFZmZlY3QsIHR5cGUgRGlzcGF0Y2gsIHR5cGUgU2V0U3RhdGVBY3Rpb24gfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHR5cGUgeyBIaXN0b3J5Q2FjaGVkRmlsdGVyIH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZUhpc3RvcnlGaWx0ZXJDYWNoZS50c1wiO1xyXG5pbXBvcnQgdHlwZSB7IEZpbHRlckxvYWRSZXF1ZXN0LCBMb2FkT3ZlcnJpZGUgfSBmcm9tIFwiLi91c2VIaXN0b3J5RmlsdGVyc1N0YXRlLnRzXCI7XHJcblxyXG50eXBlIEJvb2xlYW5SZWYgPSB7XHJcbiAgY3VycmVudDogYm9vbGVhbjtcclxufTtcclxuXHJcbnR5cGUgQXJncyA9IHtcclxuICByZWFkeVRvTG9hZDogYm9vbGVhbjtcclxuICBkZWZhdWx0RnJvbURhdGU6IHN0cmluZztcclxuICBkZWZhdWx0VG9EYXRlOiBzdHJpbmc7XHJcbiAgZGlkSW5pdEZpbHRlclJlZjogQm9vbGVhblJlZjtcclxuICBoYXNSZXN0b3JlZEZpbHRlclJlZjogQm9vbGVhblJlZjtcclxuICByZXRyeU9uTmV0d29ya0Vycm9yUmVmOiBCb29sZWFuUmVmO1xyXG4gIGNvbnN1bWVSZXR1cm5GbGFnOiAoKSA9PiBib29sZWFuO1xyXG4gIHJlYWRDYWNoZWRGaWx0ZXI6ICgpID0+IEhpc3RvcnlDYWNoZWRGaWx0ZXIgfCBudWxsO1xyXG4gIGFwcGx5Q2FjaGVkRmlsdGVyOiAoZmlsdGVyOiBIaXN0b3J5Q2FjaGVkRmlsdGVyIHwgbnVsbCkgPT4gRmlsdGVyTG9hZFJlcXVlc3QgfCBudWxsO1xyXG4gIGFwcGx5RGVmYXVsdFJhbmdlRnJvbVByb3BzOiAoKSA9PiBGaWx0ZXJMb2FkUmVxdWVzdCB8IG51bGw7XHJcbiAgcmVzb2x2ZU93bmVyQXhVc2VySWRGb3JMb2FkOiAob3duZXJBeFVzZXJJZD86IHN0cmluZykgPT4gc3RyaW5nO1xyXG4gIGxvYWRBY3Rpdml0aWVzOiAocGFnZTogbnVtYmVyLCBvdmVycmlkZT86IExvYWRPdmVycmlkZSkgPT4gdm9pZDtcclxuICByZXNldEFjdGl2aXRpZXM6ICgpID0+IHZvaWQ7XHJcbiAgcmVzZXRIaXN0b3J5RmlsdGVyczogKCkgPT4gdm9pZDtcclxuICBjbGVhckZpbHRlckNhY2hlOiAoKSA9PiB2b2lkO1xyXG4gIHNldFNob3dGaWx0ZXJzOiBEaXNwYXRjaDxTZXRTdGF0ZUFjdGlvbjxib29sZWFuPj47XHJcbiAgc2V0SXNPcGVuOiBEaXNwYXRjaDxTZXRTdGF0ZUFjdGlvbjxib29sZWFuPj47XHJcbiAgbG9nSGlzdG9yeTogKG1lc3NhZ2U6IHN0cmluZywgZGF0YT86IFJlY29yZDxzdHJpbmcsIHVua25vd24+KSA9PiB2b2lkO1xyXG59O1xyXG5cclxuLy8gUmVzdG9yZXMgdGhlIGhpc3RvcnkgZmlsdGVycyBvbmNlIG9uIG1vdW50IGFuZCBzdGFydHMgdGhlIGZpcnN0IGFjdGl2aXR5IGxvYWQuXHJcbmV4cG9ydCBjb25zdCB1c2VIaXN0b3J5SW5pdGlhbExvYWQgPSAoe1xyXG4gIHJlYWR5VG9Mb2FkLFxyXG4gIGRlZmF1bHRGcm9tRGF0ZSxcclxuICBkZWZhdWx0VG9EYXRlLFxyXG4gIGRpZEluaXRGaWx0ZXJSZWYsXHJcbiAgaGFzUmVzdG9yZWRGaWx0ZXJSZWYsXHJcbiAgcmV0cnlPbk5ldHdvcmtFcnJvclJlZixcclxuICBjb25zdW1lUmV0dXJuRmxhZyxcclxuICByZWFkQ2FjaGVkRmlsdGVyLFxyXG4gIGFwcGx5Q2FjaGVkRmlsdGVyLFxyXG4gIGFwcGx5RGVmYXVsdFJhbmdlRnJvbVByb3BzLFxyXG4gIHJlc29sdmVPd25lckF4VXNlcklkRm9yTG9hZCxcclxuICBsb2FkQWN0aXZpdGllcyxcclxuICByZXNldEFjdGl2aXRpZXMsXHJcbiAgcmVzZXRIaXN0b3J5RmlsdGVycyxcclxuICBjbGVhckZpbHRlckNhY2hlLFxyXG4gIHNldFNob3dGaWx0ZXJzLFxyXG4gIHNldElzT3BlbixcclxuICBsb2dIaXN0b3J5LFxyXG59OiBBcmdzKSA9PiB7XHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGxvZ0hpc3RvcnkoXCJpbml0XCIsIHsgZGVmYXVsdEZyb21EYXRlLCBkZWZhdWx0VG9EYXRlIH0pO1xyXG4gIH0sIFtkZWZhdWx0RnJvbURhdGUsIGRlZmF1bHRUb0RhdGUsIGxvZ0hpc3RvcnldKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghcmVhZHlUb0xvYWQpIHJldHVybjtcclxuICAgIGlmIChkaWRJbml0RmlsdGVyUmVmLmN1cnJlbnQpIHJldHVybjtcclxuICAgIGRpZEluaXRGaWx0ZXJSZWYuY3VycmVudCA9IHRydWU7XHJcblxyXG4gICAgY29uc3Qgd2l0aFJlc29sdmVkT3duZXIgPSAocmVxdWVzdDogRmlsdGVyTG9hZFJlcXVlc3QpOiBGaWx0ZXJMb2FkUmVxdWVzdCA9PiAoe1xyXG4gICAgICAuLi5yZXF1ZXN0LFxyXG4gICAgICBvdmVycmlkZToge1xyXG4gICAgICAgIC4uLnJlcXVlc3Qub3ZlcnJpZGUsXHJcbiAgICAgICAgb3duZXJBeFVzZXJJZDogcmVzb2x2ZU93bmVyQXhVc2VySWRGb3JMb2FkKHJlcXVlc3Qub3ZlcnJpZGUub3duZXJBeFVzZXJJZCksXHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBjYWNoZWQgPSBjb25zdW1lUmV0dXJuRmxhZygpID8gcmVhZENhY2hlZEZpbHRlcigpIDogbnVsbDtcclxuICAgIGlmIChjYWNoZWQgJiYgY2FjaGVkLmZyb21EYXRlICYmIGNhY2hlZC50b0RhdGUpIHtcclxuICAgICAgbG9nSGlzdG9yeShcInJlc3RvcmVGaWx0ZXJcIiwgY2FjaGVkKTtcclxuICAgICAgY29uc3QgY2FjaGVkUmVxdWVzdCA9IGFwcGx5Q2FjaGVkRmlsdGVyKGNhY2hlZCk7XHJcbiAgICAgIGlmIChjYWNoZWRSZXF1ZXN0KSB7XHJcbiAgICAgICAgY29uc3QgcmVzb2x2ZWRSZXF1ZXN0ID0gd2l0aFJlc29sdmVkT3duZXIoY2FjaGVkUmVxdWVzdCk7XHJcbiAgICAgICAgcmV0cnlPbk5ldHdvcmtFcnJvclJlZi5jdXJyZW50ID0gdHJ1ZTtcclxuICAgICAgICBsb2FkQWN0aXZpdGllcyhyZXNvbHZlZFJlcXVlc3QucGFnZSwgcmVzb2x2ZWRSZXF1ZXN0Lm92ZXJyaWRlKTtcclxuICAgICAgICBzZXRTaG93RmlsdGVycyhmYWxzZSk7XHJcbiAgICAgICAgc2V0SXNPcGVuKGZhbHNlKTtcclxuICAgICAgICBoYXNSZXN0b3JlZEZpbHRlclJlZi5jdXJyZW50ID0gdHJ1ZTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBkZWZhdWx0UmVxdWVzdCA9IGFwcGx5RGVmYXVsdFJhbmdlRnJvbVByb3BzKCk7XHJcbiAgICBpZiAoZGVmYXVsdFJlcXVlc3QpIHtcclxuICAgICAgY29uc3QgcmVzb2x2ZWRSZXF1ZXN0ID0gd2l0aFJlc29sdmVkT3duZXIoZGVmYXVsdFJlcXVlc3QpO1xyXG4gICAgICByZXRyeU9uTmV0d29ya0Vycm9yUmVmLmN1cnJlbnQgPSB0cnVlO1xyXG4gICAgICBsb2FkQWN0aXZpdGllcyhyZXNvbHZlZFJlcXVlc3QucGFnZSwgcmVzb2x2ZWRSZXF1ZXN0Lm92ZXJyaWRlKTtcclxuICAgICAgc2V0U2hvd0ZpbHRlcnMoZmFsc2UpO1xyXG4gICAgICBzZXRJc09wZW4oZmFsc2UpO1xyXG4gICAgICBoYXNSZXN0b3JlZEZpbHRlclJlZi5jdXJyZW50ID0gdHJ1ZTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHJlc2V0SGlzdG9yeUZpbHRlcnMoKTtcclxuICAgIGNsZWFyRmlsdGVyQ2FjaGUoKTtcclxuICAgIHJlc2V0QWN0aXZpdGllcygpO1xyXG4gICAgc2V0U2hvd0ZpbHRlcnModHJ1ZSk7XHJcbiAgICBzZXRJc09wZW4oZmFsc2UpO1xyXG4gIH0sIFtcclxuICAgIGFwcGx5Q2FjaGVkRmlsdGVyLFxyXG4gICAgYXBwbHlEZWZhdWx0UmFuZ2VGcm9tUHJvcHMsXHJcbiAgICBjbGVhckZpbHRlckNhY2hlLFxyXG4gICAgY29uc3VtZVJldHVybkZsYWcsXHJcbiAgICBkaWRJbml0RmlsdGVyUmVmLFxyXG4gICAgaGFzUmVzdG9yZWRGaWx0ZXJSZWYsXHJcbiAgICBsb2FkQWN0aXZpdGllcyxcclxuICAgIHJlYWR5VG9Mb2FkLFxyXG4gICAgcmVhZENhY2hlZEZpbHRlcixcclxuICAgIHJlc2V0QWN0aXZpdGllcyxcclxuICAgIHJlc2V0SGlzdG9yeUZpbHRlcnMsXHJcbiAgICByZXRyeU9uTmV0d29ya0Vycm9yUmVmLFxyXG4gICAgcmVzb2x2ZU93bmVyQXhVc2VySWRGb3JMb2FkLFxyXG4gICAgc2V0SXNPcGVuLFxyXG4gICAgc2V0U2hvd0ZpbHRlcnMsXHJcbiAgICBsb2dIaXN0b3J5LFxyXG4gIF0pO1xyXG59O1xyXG4iLCAiaW1wb3J0IHsgdXNlTWVtbyB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuXHJcbmNvbnN0IHRvU2VudGVuY2VDYXNlID0gKHZhbHVlOiBzdHJpbmcsIGxvY2FsZTogc3RyaW5nKSA9PiB7XHJcbiAgaWYgKCF2YWx1ZSkgcmV0dXJuIFwiXCI7XHJcbiAgY29uc3QgdHJpbW1lZCA9IHZhbHVlLnRyaW0oKTtcclxuICBpZiAoIXRyaW1tZWQpIHJldHVybiB0cmltbWVkO1xyXG4gIGNvbnN0IGxvd2VyID0gdHJpbW1lZC50b0xvY2FsZUxvd2VyQ2FzZShsb2NhbGUpO1xyXG4gIHJldHVybiBsb3dlclswXS50b0xvY2FsZVVwcGVyQ2FzZShsb2NhbGUpICsgbG93ZXIuc2xpY2UoMSk7XHJcbn07XHJcblxyXG4vLyBHcm91cHMgbG9jYWxpemVkIGhpc3RvcnkgbGFiZWxzIGFuZCBmaXhlZCBvcHRpb24gbGlzdHMgZm9yIHRoZSBwYWdlLlxyXG5leHBvcnQgY29uc3QgdXNlSGlzdG9yeUxhYmVscyA9IChsb2NhbGU6IHN0cmluZykgPT4ge1xyXG4gIGNvbnN0IGxhYmVsRnJvbSA9IHRvU2VudGVuY2VDYXNlKGluZFQoXCJIaXN0b3J5X0Zyb21cIiwgXCJGcm9tXCIpLCBsb2NhbGUpO1xyXG4gIGNvbnN0IGxhYmVsVG8gPSB0b1NlbnRlbmNlQ2FzZShpbmRUKFwiSGlzdG9yeV9Ub1wiLCBcIlRvXCIpLCBsb2NhbGUpO1xyXG4gIGNvbnN0IHF1aWNrQ3VzdG9tTGFiZWwgPSBpbmRUKFwiSGlzdG9yeV9RdWlja19DdXN0b21cIiwgXCJEYXRlXCIpO1xyXG4gIGNvbnN0IHF1aWNrN0RheXNMYWJlbCA9IGluZFQoXCJIaXN0b3J5X1F1aWNrXzdEYXlzXCIsIFwiNyBkYXlzXCIpO1xyXG4gIGNvbnN0IHF1aWNrMzBEYXlzTGFiZWwgPSBpbmRUKFwiSGlzdG9yeV9RdWlja18zMERheXNcIiwgXCIzMCBkYXlzXCIpO1xyXG4gIGNvbnN0IHF1aWNrOTBEYXlzTGFiZWwgPSBpbmRUKFwiSGlzdG9yeV9RdWlja185MERheXNcIiwgXCI5MCBkYXlzXCIpO1xyXG4gIGNvbnN0IHBhZ2VGaXJzdExhYmVsID0gaW5kVChcIkhpc3RvcnlfUGFnZV9GaXJzdFwiLCBcIkZpcnN0XCIpO1xyXG4gIGNvbnN0IHBhZ2VQcmV2TGFiZWwgPSBpbmRUKFwiSGlzdG9yeV9QYWdlX1ByZXZcIiwgXCJQcmV2aW91c1wiKTtcclxuICBjb25zdCBwYWdlTmV4dExhYmVsID0gaW5kVChcIkhpc3RvcnlfUGFnZV9OZXh0XCIsIFwiTmV4dFwiKTtcclxuICBjb25zdCBwYWdlTGFzdExhYmVsID0gaW5kVChcIkhpc3RvcnlfUGFnZV9MYXN0XCIsIFwiTGFzdFwiKTtcclxuXHJcbiAgY29uc3Qgd2Vla0RheUxhYmVscyA9IHVzZU1lbW8oXHJcbiAgICAoKSA9PiBbXHJcbiAgICAgIGluZFQoXCJIaXN0b3J5X0RheV9Nb25cIiwgXCJNb25cIiksXHJcbiAgICAgIGluZFQoXCJIaXN0b3J5X0RheV9UdWVcIiwgXCJUdWVcIiksXHJcbiAgICAgIGluZFQoXCJIaXN0b3J5X0RheV9XZWRcIiwgXCJXZWRcIiksXHJcbiAgICAgIGluZFQoXCJIaXN0b3J5X0RheV9UaHVcIiwgXCJUaHVcIiksXHJcbiAgICAgIGluZFQoXCJIaXN0b3J5X0RheV9GcmlcIiwgXCJGcmlcIiksXHJcbiAgICAgIGluZFQoXCJIaXN0b3J5X0RheV9TYXRcIiwgXCJTYXRcIiksXHJcbiAgICAgIGluZFQoXCJIaXN0b3J5X0RheV9TdW5cIiwgXCJTdW5cIiksXHJcbiAgICBdLFxyXG4gICAgW11cclxuICApO1xyXG5cclxuICBjb25zdCBxdWlja0ZpbHRlcnMgPSB1c2VNZW1vKFxyXG4gICAgKCkgPT4gW1xyXG4gICAgICB7IGlkOiBcImN1c3RvbVwiIGFzIGNvbnN0LCBsYWJlbDogcXVpY2tDdXN0b21MYWJlbCB9LFxyXG4gICAgICB7IGlkOiBcImRheXMtN1wiIGFzIGNvbnN0LCBsYWJlbDogcXVpY2s3RGF5c0xhYmVsIH0sXHJcbiAgICAgIHsgaWQ6IFwiZGF5cy0zMFwiIGFzIGNvbnN0LCBsYWJlbDogcXVpY2szMERheXNMYWJlbCB9LFxyXG4gICAgICB7IGlkOiBcImRheXMtOTBcIiBhcyBjb25zdCwgbGFiZWw6IHF1aWNrOTBEYXlzTGFiZWwgfSxcclxuICAgIF0sXHJcbiAgICBbcXVpY2szMERheXNMYWJlbCwgcXVpY2s3RGF5c0xhYmVsLCBxdWljazkwRGF5c0xhYmVsLCBxdWlja0N1c3RvbUxhYmVsXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IHBhZ2luYXRpb25MYWJlbHMgPSB1c2VNZW1vKFxyXG4gICAgKCkgPT4gKHtcclxuICAgICAgZmlyc3Q6IHBhZ2VGaXJzdExhYmVsLFxyXG4gICAgICBwcmV2OiBwYWdlUHJldkxhYmVsLFxyXG4gICAgICBuZXh0OiBwYWdlTmV4dExhYmVsLFxyXG4gICAgICBsYXN0OiBwYWdlTGFzdExhYmVsLFxyXG4gICAgfSksXHJcbiAgICBbcGFnZUZpcnN0TGFiZWwsIHBhZ2VMYXN0TGFiZWwsIHBhZ2VOZXh0TGFiZWwsIHBhZ2VQcmV2TGFiZWxdXHJcbiAgKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGxhYmVsRnJvbSxcclxuICAgIGxhYmVsVG8sXHJcbiAgICBzdW1tYXJ5RnJvbTogbGFiZWxGcm9tLFxyXG4gICAgc3VtbWFyeVRvOiBsYWJlbFRvLFxyXG4gICAgZmlsdGVyVGl0bGU6IGluZFQoXCJIaXN0b3J5X0ZpbHRlcl9EYXRlXCIsIFwiRGF0ZVwiKSxcclxuICAgIGFkZERhdGVMYWJlbDogaW5kVChcIkhpc3RvcnlfQWRkRGF0ZVwiLCBcIkFkZCBkYXRlXCIpLFxyXG4gICAgY2xlYXJSYW5nZUxhYmVsOiBpbmRUKFwiSGlzdG9yeV9DbGVhclJhbmdlXCIsIFwiQ2xlYXIgcmFuZ2VcIiksXHJcbiAgICBwcmV2TW9udGhMYWJlbDogaW5kVChcIkhpc3RvcnlfUHJldk1vbnRoXCIsIFwiUHJldmlvdXMgbW9udGhcIiksXHJcbiAgICBuZXh0TW9udGhMYWJlbDogaW5kVChcIkhpc3RvcnlfTmV4dE1vbnRoXCIsIFwiTmV4dCBtb250aFwiKSxcclxuICAgIHN0YXR1c1NlbGVjdFN0YXJ0TGFiZWw6IGluZFQoXCJIaXN0b3J5X1N0YXR1c19TZWxlY3RTdGFydFwiLCBcIlNlbGVjdCBzdGFydCBkYXRlXCIpLFxyXG4gICAgc3RhdHVzU2VsZWN0RW5kTGFiZWw6IGluZFQoXCJIaXN0b3J5X1N0YXR1c19TZWxlY3RFbmRcIiwgXCJTZWxlY3QgZW5kIGRhdGVcIiksXHJcbiAgICBjbGVhckxhYmVsOiBpbmRUKFwiSGlzdG9yeV9GaWx0ZXJfQ2xlYXJcIiwgXCJDbGVhclwiKSxcclxuICAgIGFwcGx5TGFiZWw6IGluZFQoXCJIaXN0b3J5X0ZpbHRlcl9BcHBseVwiLCBcIkFwcGx5XCIpLFxyXG4gICAgY2xpZW50TGFiZWw6IGluZFQoXCJIaXN0b3J5X0ZpbHRlcl9DbGllbnRcIiwgXCJBY2NvdW50XCIpLFxyXG4gICAgb3duZXJMYWJlbDogaW5kVChcIkhpc3RvcnlfRmlsdGVyX093bmVyXCIsIFwiT3duZXJcIiksXHJcbiAgICBvd25lckFsbExhYmVsOiBpbmRUKFwiSGlzdG9yeV9GaWx0ZXJfT3duZXJfQWxsXCIsIFwiQWxsIG15IHN1Ym9yZGluYXRlc1wiKSxcclxuICAgIG93bmVyTm9Vc2Vyc0xhYmVsOiBpbmRUKFwiSGlzdG9yeV9GaWx0ZXJfT3duZXJfTm9uZVwiLCBcIk5vIHZpc2libGUgdXNlcnNcIiksXHJcbiAgICBvd25lckxvYWRpbmdMYWJlbDogaW5kVChcIkhpc3RvcnlfRmlsdGVyX093bmVyX0xvYWRpbmdcIiwgXCJMb2FkaW5nIHZpc2libGUgdXNlcnNcIiksXHJcbiAgICBsb2FkaW5nTGFiZWw6IGluZFQoXCJIaXN0b3J5X0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpLFxyXG4gICAgbm9WaXNpdHNJblJhbmdlTGFiZWw6IGluZFQoXCJIaXN0b3J5X05vRGF0YUluUmFuZ2VcIiwgXCJObyB2aXNpdHMgaW4gdGhpcyByYW5nZVwiKSxcclxuICAgIGNyZWF0ZUxhYmVsOiBpbmRUKFwiQ29tbW9uX0NyZWF0ZVwiLCBcIkNyZWF0ZVwiKSxcclxuICAgIHdlZWtEYXlMYWJlbHMsXHJcbiAgICBxdWlja0ZpbHRlcnMsXHJcbiAgICBwYWdpbmF0aW9uTGFiZWxzLFxyXG4gIH07XHJcbn07XHJcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjayB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgdHlwZSB7IENsaWVudE9wdGlvbiB9IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL3Zpc2l0YXMvQ2xpZW50U2VhcmNoQ29tYm9ib3gudHN4XCI7XHJcbmltcG9ydCB0eXBlIHsgSGlzdG9yeUNhY2hlZEZpbHRlciB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VIaXN0b3J5RmlsdGVyQ2FjaGUudHNcIjtcclxuXHJcbnR5cGUgQXJncyA9IHtcclxuICBjYW5WaWV3SGlzdG9yeTogYm9vbGVhbjtcclxuICBjdXJyZW50UGFnZTogbnVtYmVyO1xyXG4gIGZyb21EYXRlVmFsdWU6IHN0cmluZztcclxuICB0b0RhdGVWYWx1ZTogc3RyaW5nO1xyXG4gIHNlbGVjdGVkQ2xpZW50OiBDbGllbnRPcHRpb24gfCBudWxsO1xyXG4gIG93bmVyQXhVc2VySWQ6IHN0cmluZztcclxuICBvd25lclRleHQ6IHN0cmluZztcclxuICBuYXZEZWxheU1zOiBudW1iZXI7XHJcbiAgc2F2ZUNhY2hlZEZpbHRlcjogKGZpbHRlcjogSGlzdG9yeUNhY2hlZEZpbHRlcikgPT4gdm9pZDtcclxuICBvbkZvcmJpZGRlbjogKCkgPT4gdm9pZDtcclxufTtcclxuXHJcbi8vIENyZWF0ZXMgdGhlIGRldGFpbCBuYXZpZ2F0aW9uIGhhbmRsZXIgYW5kIHBlcnNpc3RzIHRoZSBjdXJyZW50IGhpc3RvcnkgZmlsdGVyLlxyXG5leHBvcnQgY29uc3QgdXNlSGlzdG9yeU5hdmlnYXRpb24gPSAoe1xyXG4gIGNhblZpZXdIaXN0b3J5LFxyXG4gIGN1cnJlbnRQYWdlLFxyXG4gIGZyb21EYXRlVmFsdWUsXHJcbiAgdG9EYXRlVmFsdWUsXHJcbiAgc2VsZWN0ZWRDbGllbnQsXHJcbiAgb3duZXJBeFVzZXJJZCxcclxuICBvd25lclRleHQsXHJcbiAgbmF2RGVsYXlNcyxcclxuICBzYXZlQ2FjaGVkRmlsdGVyLFxyXG4gIG9uRm9yYmlkZGVuLFxyXG59OiBBcmdzKSA9PiB7XHJcbiAgcmV0dXJuIHVzZUNhbGxiYWNrKFxyXG4gICAgKGxpbmtJZDogc3RyaW5nKSA9PiB7XHJcbiAgICAgIGlmICghY2FuVmlld0hpc3RvcnkpIHtcclxuICAgICAgICBvbkZvcmJpZGRlbigpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBzYXZlQ2FjaGVkRmlsdGVyKHtcclxuICAgICAgICAgIGZyb21EYXRlOiBmcm9tRGF0ZVZhbHVlIHx8IFwiXCIsXHJcbiAgICAgICAgICB0b0RhdGU6IHRvRGF0ZVZhbHVlIHx8IFwiXCIsXHJcbiAgICAgICAgICBwYWdlOiBjdXJyZW50UGFnZSxcclxuICAgICAgICAgIGNsaWVudEFjY291bnQ6IHNlbGVjdGVkQ2xpZW50Py52YWx1ZSB8fCBcIlwiLFxyXG4gICAgICAgICAgY2xpZW50VGV4dDogc2VsZWN0ZWRDbGllbnQ/LnRleHQgfHwgXCJcIixcclxuICAgICAgICAgIG93bmVyQXhVc2VySWQsXHJcbiAgICAgICAgICBvd25lclRleHQsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZW5jb2RlVVJJQ29tcG9uZW50KGxpbmtJZCk7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBgL1Zpc2l0YXMvRGV0YWxsZS8ke3RhcmdldH1gO1xyXG4gICAgICB9LCBuYXZEZWxheU1zKTtcclxuICAgIH0sXHJcbiAgICBbXHJcbiAgICAgIGNhblZpZXdIaXN0b3J5LFxyXG4gICAgICBjdXJyZW50UGFnZSxcclxuICAgICAgZnJvbURhdGVWYWx1ZSxcclxuICAgICAgbmF2RGVsYXlNcyxcclxuICAgICAgb25Gb3JiaWRkZW4sXHJcbiAgICAgIG93bmVyQXhVc2VySWQsXHJcbiAgICAgIG93bmVyVGV4dCxcclxuICAgICAgc2F2ZUNhY2hlZEZpbHRlcixcclxuICAgICAgc2VsZWN0ZWRDbGllbnQsXHJcbiAgICAgIHRvRGF0ZVZhbHVlLFxyXG4gICAgXVxyXG4gICk7XHJcbn07XHJcbiIsICJcdUZFRkZpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0IH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB0eXBlIHsgSGlzdG9yeUNhY2hlZEZpbHRlciB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VIaXN0b3J5RmlsdGVyQ2FjaGUudHNcIjtcclxuaW1wb3J0IHsgc2V0VG9wYmFyQWN0aW9uR3JvdXBSZWFkeSB9IGZyb20gXCIuLi8uLi8uLi91dGlscy90b3BiYXJBY3Rpb25WaXNpYmlsaXR5LnRzXCI7XHJcbmltcG9ydCB0eXBlIHsgRmlsdGVyTG9hZFJlcXVlc3QsIExvYWRPdmVycmlkZSB9IGZyb20gXCIuL3VzZUhpc3RvcnlGaWx0ZXJzU3RhdGUudHNcIjtcclxuXHJcbnR5cGUgVXNlSGlzdG9yeVBhZ2VMaXN0ZW5lcnNBcmdzID0ge1xyXG4gIHJlYWR5VG9Mb2FkOiBib29sZWFuO1xyXG4gIGlzT3BlbjogYm9vbGVhbjtcclxuICBhY3RpdmF0b3JSZWY6IFJlYWN0LlJlZk9iamVjdDxIVE1MRGl2RWxlbWVudCB8IG51bGw+O1xyXG4gIHBvcG92ZXJSZWY6IFJlYWN0LlJlZk9iamVjdDxIVE1MRGl2RWxlbWVudCB8IG51bGw+O1xyXG4gIGhhc1Jlc3RvcmVkRmlsdGVyUmVmOiBSZWFjdC5NdXRhYmxlUmVmT2JqZWN0PGJvb2xlYW4+O1xyXG4gIHJldHJ5T25OZXR3b3JrRXJyb3JSZWY6IFJlYWN0Lk11dGFibGVSZWZPYmplY3Q8Ym9vbGVhbj47XHJcbiAgY3VycmVudFBhZ2U6IG51bWJlcjtcclxuICBsb2dIaXN0b3J5OiAobWVzc2FnZTogc3RyaW5nLCBkYXRhPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pID0+IHZvaWQ7XHJcbiAgY29uc3VtZVJldHVybkZsYWc6ICgpID0+IGJvb2xlYW47XHJcbiAgcmVhZENhY2hlZEZpbHRlcjogKCkgPT4gSGlzdG9yeUNhY2hlZEZpbHRlciB8IG51bGw7XHJcbiAgYXBwbHlDYWNoZWRGaWx0ZXI6IChmaWx0ZXI6IEhpc3RvcnlDYWNoZWRGaWx0ZXIgfCBudWxsKSA9PiBGaWx0ZXJMb2FkUmVxdWVzdCB8IG51bGw7XHJcbiAgcmVzb2x2ZU93bmVyQXhVc2VySWRGb3JMb2FkOiAob3duZXJBeFVzZXJJZD86IHN0cmluZykgPT4gc3RyaW5nO1xyXG4gIGxvYWRBY3Rpdml0aWVzOiAocGFnZTogbnVtYmVyLCBvdmVycmlkZT86IExvYWRPdmVycmlkZSkgPT4gdm9pZDtcclxuICBzZXRJc09wZW46IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPGJvb2xlYW4+PjtcclxuICBzZXRIb3ZlckRhdGU6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPERhdGUgfCBudWxsPj47XHJcbiAgc2V0U2hvd0ZpbHRlcnM6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPGJvb2xlYW4+PjtcclxuICBhcHBseUZpbHRlcnM6IChvcHRpb25zPzogeyBjbG9zZVBhbmVsPzogYm9vbGVhbjsgZm9yY2U/OiBib29sZWFuOyBwYWdlPzogbnVtYmVyIH0pID0+IHZvaWQ7XHJcbn07XHJcblxyXG4vLyBIYW5kbGVzIGdsb2JhbCBsaXN0ZW5lcnMgdXNlZCBieSB0aGUgaGlzdG9yeSBwYWdlIGZpbHRlcnMgYW5kIGNhbGVuZGFyIFVJLlxyXG5leHBvcnQgY29uc3QgdXNlSGlzdG9yeVBhZ2VMaXN0ZW5lcnMgPSAoe1xyXG4gIHJlYWR5VG9Mb2FkLFxyXG4gIGlzT3BlbixcclxuICBhY3RpdmF0b3JSZWYsXHJcbiAgcG9wb3ZlclJlZixcclxuICBoYXNSZXN0b3JlZEZpbHRlclJlZixcclxuICByZXRyeU9uTmV0d29ya0Vycm9yUmVmLFxyXG4gIGN1cnJlbnRQYWdlLFxyXG4gIGxvZ0hpc3RvcnksXHJcbiAgY29uc3VtZVJldHVybkZsYWcsXHJcbiAgcmVhZENhY2hlZEZpbHRlcixcclxuICBhcHBseUNhY2hlZEZpbHRlcixcclxuICByZXNvbHZlT3duZXJBeFVzZXJJZEZvckxvYWQsXHJcbiAgbG9hZEFjdGl2aXRpZXMsXHJcbiAgc2V0SXNPcGVuLFxyXG4gIHNldEhvdmVyRGF0ZSxcclxuICBzZXRTaG93RmlsdGVycyxcclxuICBhcHBseUZpbHRlcnMsXHJcbn06IFVzZUhpc3RvcnlQYWdlTGlzdGVuZXJzQXJncykgPT4ge1xyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBzZXRUb3BiYXJBY3Rpb25Hcm91cFJlYWR5KFwiaGlzdG9yeS1saXN0LWFjdGlvbnNcIik7XHJcbiAgfSwgW10pO1xyXG5cclxuICAvLyBDbG9zZSB0aGUgbWFudWFsIHBpY2tlciB3aGVuIGNsaWNraW5nIG91dHNpZGUgb2YgdGhlIHJhbmdlIHBpY2tlciBVSS5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFpc09wZW4pIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBoYW5kbGVPdXRzaWRlID0gKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XHJcbiAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldCBhcyBOb2RlIHwgbnVsbDtcclxuICAgICAgaWYgKCF0YXJnZXQpIHJldHVybjtcclxuICAgICAgaWYgKHBvcG92ZXJSZWYuY3VycmVudD8uY29udGFpbnModGFyZ2V0KSkgcmV0dXJuO1xyXG4gICAgICBpZiAoYWN0aXZhdG9yUmVmLmN1cnJlbnQ/LmNvbnRhaW5zKHRhcmdldCkpIHJldHVybjtcclxuICAgICAgbG9nSGlzdG9yeShcImNsb3NlUG9wb3ZlcjpvdXRzaWRlXCIpO1xyXG4gICAgICBzZXRJc09wZW4oZmFsc2UpO1xyXG4gICAgICBzZXRIb3ZlckRhdGUobnVsbCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgaGFuZGxlT3V0c2lkZSk7XHJcbiAgICByZXR1cm4gKCkgPT4gZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBoYW5kbGVPdXRzaWRlKTtcclxuICB9LCBbYWN0aXZhdG9yUmVmLCBpc09wZW4sIGxvZ0hpc3RvcnksIHBvcG92ZXJSZWYsIHNldEhvdmVyRGF0ZSwgc2V0SXNPcGVuXSk7XHJcblxyXG4gIC8vIFJlLWFwcGx5IGZpbHRlcnMgYWZ0ZXIgYnJvd3NlciBiYWNrL2ZvcndhcmQgbmF2aWdhdGlvbiByZXR1cm5zIHRvIHRoZSBwYWdlLlxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBvblBhZ2VTaG93ID0gKCkgPT4ge1xyXG4gICAgICBpZiAoIXJlYWR5VG9Mb2FkKSByZXR1cm47XHJcbiAgICAgIGlmIChoYXNSZXN0b3JlZEZpbHRlclJlZi5jdXJyZW50KSByZXR1cm47XHJcbiAgICAgIGlmIChjb25zdW1lUmV0dXJuRmxhZygpKSB7XHJcbiAgICAgICAgY29uc3QgY2FjaGVkID0gcmVhZENhY2hlZEZpbHRlcigpO1xyXG4gICAgICAgIGNvbnN0IGNhY2hlZFJlcXVlc3QgPSBhcHBseUNhY2hlZEZpbHRlcihjYWNoZWQpO1xyXG4gICAgICAgIGlmIChjYWNoZWRSZXF1ZXN0KSB7XHJcbiAgICAgICAgICBjb25zdCByZXNvbHZlZFJlcXVlc3QgPSB7XHJcbiAgICAgICAgICAgIC4uLmNhY2hlZFJlcXVlc3QsXHJcbiAgICAgICAgICAgIG92ZXJyaWRlOiB7XHJcbiAgICAgICAgICAgICAgLi4uY2FjaGVkUmVxdWVzdC5vdmVycmlkZSxcclxuICAgICAgICAgICAgICBvd25lckF4VXNlcklkOiByZXNvbHZlT3duZXJBeFVzZXJJZEZvckxvYWQoY2FjaGVkUmVxdWVzdC5vdmVycmlkZS5vd25lckF4VXNlcklkKSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgICByZXRyeU9uTmV0d29ya0Vycm9yUmVmLmN1cnJlbnQgPSB0cnVlO1xyXG4gICAgICAgICAgbG9hZEFjdGl2aXRpZXMocmVzb2x2ZWRSZXF1ZXN0LnBhZ2UsIHJlc29sdmVkUmVxdWVzdC5vdmVycmlkZSk7XHJcbiAgICAgICAgICBzZXRTaG93RmlsdGVycyhmYWxzZSk7XHJcbiAgICAgICAgICBzZXRJc09wZW4oZmFsc2UpO1xyXG4gICAgICAgICAgaGFzUmVzdG9yZWRGaWx0ZXJSZWYuY3VycmVudCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicGFnZXNob3dcIiwgb25QYWdlU2hvdyk7XHJcbiAgICByZXR1cm4gKCkgPT4gd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwYWdlc2hvd1wiLCBvblBhZ2VTaG93KTtcclxuICB9LCBbXHJcbiAgICBhcHBseUNhY2hlZEZpbHRlcixcclxuICAgIGNvbnN1bWVSZXR1cm5GbGFnLFxyXG4gICAgaGFzUmVzdG9yZWRGaWx0ZXJSZWYsXHJcbiAgICBsb2FkQWN0aXZpdGllcyxcclxuICAgIHJlYWRDYWNoZWRGaWx0ZXIsXHJcbiAgICByZWFkeVRvTG9hZCxcclxuICAgIHJldHJ5T25OZXR3b3JrRXJyb3JSZWYsXHJcbiAgICByZXNvbHZlT3duZXJBeFVzZXJJZEZvckxvYWQsXHJcbiAgICBzZXRJc09wZW4sXHJcbiAgICBzZXRTaG93RmlsdGVycyxcclxuICBdKTtcclxuXHJcbiAgLy8gV2lyZSB0b3BiYXIgYWN0aW9ucyB0aGF0IHRvZ2dsZSBmaWx0ZXJzIG9yIGZvcmNlIHJlZnJlc2ggb2YgY3VycmVudCBwYWdlLlxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBvblRvZ2dsZUZpbHRlcnMgPSAoKSA9PiB7XHJcbiAgICAgIHNldFNob3dGaWx0ZXJzKChwcmV2KSA9PiB7XHJcbiAgICAgICAgY29uc3QgbmV4dCA9ICFwcmV2O1xyXG4gICAgICAgIGlmICghbmV4dCkge1xyXG4gICAgICAgICAgc2V0SXNPcGVuKGZhbHNlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgd2luZG93LnNjcm9sbFRvKHsgdG9wOiAwLCBiZWhhdmlvcjogXCJzbW9vdGhcIiB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5leHQ7XHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBvblJlZnJlc2ggPSAoKSA9PiB7XHJcbiAgICAgIGlmICghcmVhZHlUb0xvYWQpIHJldHVybjtcclxuICAgICAgYXBwbHlGaWx0ZXJzKHsgcGFnZTogY3VycmVudFBhZ2UsIGZvcmNlOiB0cnVlLCBjbG9zZVBhbmVsOiB0cnVlIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImhpc3RvcnktdG9nZ2xlLWZpbHRlclwiLCBvblRvZ2dsZUZpbHRlcnMpO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJoaXN0b3J5LXJlZnJlc2hcIiwgb25SZWZyZXNoKTtcclxuXHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImhpc3RvcnktdG9nZ2xlLWZpbHRlclwiLCBvblRvZ2dsZUZpbHRlcnMpO1xyXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImhpc3RvcnktcmVmcmVzaFwiLCBvblJlZnJlc2gpO1xyXG4gICAgfTtcclxuICB9LCBbYXBwbHlGaWx0ZXJzLCBjdXJyZW50UGFnZSwgcmVhZHlUb0xvYWQsIHNldElzT3Blbiwgc2V0U2hvd0ZpbHRlcnNdKTtcclxufTtcclxuIiwgImltcG9ydCB7IHVzZUVmZmVjdCwgdHlwZSBEaXNwYXRjaCwgdHlwZSBTZXRTdGF0ZUFjdGlvbiB9IGZyb20gXCJyZWFjdFwiO1xyXG5cclxudHlwZSBBcmdzID0ge1xyXG4gIHN0YXJ0RGF0ZTogRGF0ZSB8IG51bGw7XHJcbiAgZW5kRGF0ZTogRGF0ZSB8IG51bGw7XHJcbiAgc2VsZWN0aW5nU3RlcDogXCJzdGFydFwiIHwgXCJlbmRcIiB8IFwiZG9uZVwiO1xyXG4gIHNldFNlbGVjdGluZ1N0ZXA6IERpc3BhdGNoPFNldFN0YXRlQWN0aW9uPFwic3RhcnRcIiB8IFwiZW5kXCIgfCBcImRvbmVcIj4+O1xyXG59O1xyXG5cclxuLy8gS2VlcHMgdGhlIG1hbnVhbCBkYXRlIHBpY2tlciBzdGVwIGFsaWduZWQgd2l0aCB0aGUgc2VsZWN0ZWQgcmFuZ2UuXHJcbmV4cG9ydCBjb25zdCB1c2VIaXN0b3J5UGlja2VyU3RlcFN5bmMgPSAoeyBzdGFydERhdGUsIGVuZERhdGUsIHNlbGVjdGluZ1N0ZXAsIHNldFNlbGVjdGluZ1N0ZXAgfTogQXJncykgPT4ge1xyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoc3RhcnREYXRlICYmICFlbmREYXRlICYmIHNlbGVjdGluZ1N0ZXAgPT09IFwic3RhcnRcIikge1xyXG4gICAgICBzZXRTZWxlY3RpbmdTdGVwKFwiZW5kXCIpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoIXN0YXJ0RGF0ZSAmJiBzZWxlY3RpbmdTdGVwICE9PSBcInN0YXJ0XCIpIHtcclxuICAgICAgc2V0U2VsZWN0aW5nU3RlcChcInN0YXJ0XCIpO1xyXG4gICAgfVxyXG4gIH0sIFtzdGFydERhdGUsIGVuZERhdGUsIHNlbGVjdGluZ1N0ZXAsIHNldFNlbGVjdGluZ1N0ZXBdKTtcclxufTtcclxuIiwgIlx1RkVGRmltcG9ydCBSZWFjdCwgeyB1c2VNZW1vLCB1c2VSZWYgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHR5cGUgeyBUaW1lbGluZUl0ZW0gfSBmcm9tIFwiLi9IaXN0b3J5VGFibGUudHN4XCI7XHJcblxyXG50eXBlIEFjdGl2aXR5UmVjb3JkID0gUmVjb3JkPHN0cmluZywgdW5rbm93bj47XHJcblxyXG50eXBlIFVzZUhpc3RvcnlUaW1lbGluZUl0ZW1zQXJncyA9IHtcbiAgaXRlbXM6IEFjdGl2aXR5UmVjb3JkW107XG4gIGxvY2FsZTogc3RyaW5nO1xuICBub0RhdGFUZXh0OiBzdHJpbmc7XG4gIGxvZ0hpc3Rvcnk6IChtZXNzYWdlOiBzdHJpbmcsIGRhdGE/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPikgPT4gdm9pZDtcclxuICB0b1RpdGxlQ2FzZTogKHZhbHVlOiBzdHJpbmcsIGxvY2FsZTogc3RyaW5nKSA9PiBzdHJpbmc7XHJcbiAgZm9ybWF0RGF0ZVBhcnRzOiAodmFsdWU6IHN0cmluZywgbG9jYWxlOiBzdHJpbmcpID0+IHsgeWVhcjogc3RyaW5nOyBtb250aDogc3RyaW5nOyBkYXk6IHN0cmluZyB9O1xufTtcblxuY29uc3QgRU1QVFlfREVTQ1JJUFRJT05fTEFCRUxTID0gbmV3IFNldChbXCJzaW4gZGF0b3NcIiwgXCJubyBkYXRhXCJdKTtcblxuY29uc3QgaGFzUmVhbERlc2NyaXB0aW9uID0gKHZhbHVlOiBzdHJpbmcsIG5vRGF0YVRleHQ6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xuICBjb25zdCBub3JtYWxpemVkVmFsdWUgPSB2YWx1ZS50cmltKCkudG9Mb2NhbGVMb3dlckNhc2UoKTtcbiAgaWYgKCFub3JtYWxpemVkVmFsdWUpIHJldHVybiBmYWxzZTtcblxuICBjb25zdCBub3JtYWxpemVkTm9EYXRhVGV4dCA9IG5vRGF0YVRleHQudHJpbSgpLnRvTG9jYWxlTG93ZXJDYXNlKCk7XG4gIHJldHVybiBub3JtYWxpemVkVmFsdWUgIT09IG5vcm1hbGl6ZWROb0RhdGFUZXh0ICYmICFFTVBUWV9ERVNDUklQVElPTl9MQUJFTFMuaGFzKG5vcm1hbGl6ZWRWYWx1ZSk7XG59O1xuXG4vLyBNYXBzIHJhdyBoaXN0b3J5IHBheWxvYWQgaXRlbXMgaW50byB0aW1lbGluZSBjYXJkcyB1c2VkIGJ5IEhpc3RvcnlUYWJsZS5cbmV4cG9ydCBjb25zdCB1c2VIaXN0b3J5VGltZWxpbmVJdGVtcyA9ICh7XG4gIGl0ZW1zLFxyXG4gIGxvY2FsZSxcclxuICBub0RhdGFUZXh0LFxyXG4gIGxvZ0hpc3RvcnksXHJcbiAgdG9UaXRsZUNhc2UsXHJcbiAgZm9ybWF0RGF0ZVBhcnRzLFxyXG59OiBVc2VIaXN0b3J5VGltZWxpbmVJdGVtc0FyZ3MpID0+IHtcclxuICBjb25zdCBkZWJ1Z0xvZ2dlZFJlZiA9IHVzZVJlZigwKTtcclxuXHJcbiAgY29uc3QgdGltZWxpbmVJdGVtczogVGltZWxpbmVJdGVtW10gPSB1c2VNZW1vKCgpID0+IHtcclxuICAgIHJldHVybiBpdGVtcy5tYXAoKGVudHJ5KSA9PiB7XHJcbiAgICAgIGNvbnN0IGFjdGl2aWRhZElkUmF3ID0gKGVudHJ5LmFjdGl2aWRhZElkID8/IGVudHJ5LkFjdGl2aWRhZElkID8/IFwiXCIpLnRvU3RyaW5nKCkudHJpbSgpO1xyXG4gICAgICBjb25zdCBhY3RpdmlkYWRJZCA9IGFjdGl2aWRhZElkUmF3IHx8IFwiXCI7XHJcbiAgICAgIGNvbnN0IHJlY0lkUmF3ID0gZW50cnkucmVjSWQgPz8gZW50cnkuUmVjSWQgPz8gXCJcIjtcclxuICAgICAgY29uc3QgcmVjSWQgPSByZWNJZFJhdyAmJiAhTnVtYmVyLmlzTmFOKE51bWJlcihyZWNJZFJhdykpID8gTnVtYmVyKHJlY0lkUmF3KSA6IG51bGw7XHJcbiAgICAgIGxldCBsaW5rSWQgPSBhY3RpdmlkYWRJZCB8fCAocmVjSWQgPyByZWNJZC50b1N0cmluZygpIDogXCJcIik7XHJcblxyXG4gICAgICBpZiAoZGVidWdMb2dnZWRSZWYuY3VycmVudCA8IDUpIHtcclxuICAgICAgICBsb2dIaXN0b3J5KFwiYWN0aXZpdHkgaXRlbVwiLCB7IGFjdGl2aWRhZElkLCByZWNJZFJhdywgcmVjSWQgfSk7XHJcbiAgICAgICAgZGVidWdMb2dnZWRSZWYuY3VycmVudCArPSAxO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCByYXdOYW1lID0gKGVudHJ5Lm5hbWUgPz8gZW50cnkuTmFtZSA/PyBcIlwiKS50b1N0cmluZygpLnRyaW0oKTtcclxuICAgICAgY29uc3QgZnVsbE5hbWUgPSB0b1RpdGxlQ2FzZShyYXdOYW1lLCBsb2NhbGUpO1xyXG4gICAgICBjb25zdCBmZWNoYSA9IChlbnRyeS50cmFuc0RhdGUgPz8gZW50cnkuVHJhbnNEYXRlID8/IFwiXCIpLnRvU3RyaW5nKCk7XG4gICAgICBjb25zdCByYXdEZXNjID0gKGVudHJ5LmRlc2NyaXB0aW9uID8/IGVudHJ5LkRlc2NyaXB0aW9uID8/IFwiXCIpLnRvU3RyaW5nKCkudHJpbSgpO1xuICAgICAgY29uc3QgaGFzRGVzY3JpcHRpb24gPSBoYXNSZWFsRGVzY3JpcHRpb24ocmF3RGVzYywgbm9EYXRhVGV4dCk7XG4gICAgICBjb25zdCBmdWxsRGVzYyA9IGhhc0Rlc2NyaXB0aW9uID8gcmF3RGVzYyA6IFwiXCI7XG5cbiAgICAgIGNvbnN0IGlzTm9EYXRhQ2FyZCA9ICFyYXdOYW1lICYmICFoYXNEZXNjcmlwdGlvbjtcbiAgICAgIGlmIChpc05vRGF0YUNhcmQpIHtcbiAgICAgICAgbGlua0lkID0gXCJcIjtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBpZDogbGlua0lkLFxyXG4gICAgICAgIGFjdGl2aWRhZElkLFxuICAgICAgICByZWNJZCxcbiAgICAgICAgbmFtZTogZnVsbE5hbWUsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBoYXNEZXNjcmlwdGlvbiA/IGZ1bGxEZXNjIDogaXNOb0RhdGFDYXJkID8gbm9EYXRhVGV4dCA6IFwiXCIsXG4gICAgICAgIGZ1bGxOYW1lLFxuICAgICAgICBmdWxsRGVzYyxcbiAgICAgICAgaGFzRGVzY3JpcHRpb24sXG4gICAgICAgIGRhdGVQYXJ0czogZm9ybWF0RGF0ZVBhcnRzKGZlY2hhLCBsb2NhbGUpLFxuICAgICAgICBpc05vRGF0YTogaXNOb0RhdGFDYXJkLFxuICAgICAgfTtcbiAgICB9KTtcclxuICB9LCBbZm9ybWF0RGF0ZVBhcnRzLCBpdGVtcywgbG9jYWxlLCBsb2dIaXN0b3J5LCBub0RhdGFUZXh0LCB0b1RpdGxlQ2FzZV0pO1xyXG5cclxuICByZXR1cm4geyB0aW1lbGluZUl0ZW1zIH07XHJcbn07XHJcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlTWVtbyB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBzaG93UGVybWlzc2lvbk1vZGFsIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3Blcm1pc3Npb25zLnRzXCI7XHJcbmltcG9ydCB7IHVzZU1vZHVsZURhdGFWaXNpYmlsaXR5IH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZU1vZHVsZURhdGFWaXNpYmlsaXR5LnRzXCI7XHJcbmltcG9ydCB7IGJ1aWxkVmlzaWJsZVVzZXJCeU93bmVyTWFwLCBmb3JtYXRNb2R1bGVWaXNpYmxlVXNlckxhYmVsLCBnZXRWaXNpYmxlVXNlckZvck93bmVyIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL21vZHVsZURhdGFWaXNpYmlsaXR5LnRzXCI7XHJcbmltcG9ydCB7XHJcbiAgZW5zdXJlQ3VycmVudEhpc3RvcnlWaXNpYmxlT3duZXJJbkxpc3QsXHJcbiAgaGFzSGlzdG9yeVZpc2libGVTdWJvcmRpbmF0ZXMsXHJcbiAgcmVzb2x2ZUhpc3RvcnlFZmZlY3RpdmVPd25lckF4VXNlcklkLFxyXG4gIHJlc29sdmVIaXN0b3J5VmlzaWJsZU93bmVyU2VsZWN0VmFsdWUsXHJcbn0gZnJvbSBcIi4vaGlzdG9yeVZpc2libGVPd25lclNlbGVjdGlvbi50c1wiO1xyXG5cclxudHlwZSBBcmdzID0ge1xyXG4gIGVuYWJsZWQ6IGJvb2xlYW47XHJcbiAgY29tcGFueUlkOiBzdHJpbmc7XHJcbiAgYXhVc2VySWQ6IHN0cmluZztcclxuICBwZXJtaXNzaW9uc1JldmlzaW9uOiBzdHJpbmc7XHJcbiAgc2VsZWN0ZWRPd25lckF4VXNlcklkOiBzdHJpbmc7XHJcbiAgb25EZWJ1ZzogKG1lc3NhZ2U6IHN0cmluZywgZGF0YT86IFJlY29yZDxzdHJpbmcsIHVua25vd24+KSA9PiB2b2lkO1xyXG59O1xyXG5cclxuY29uc3QgQVBQX0NPREUgPSBcIkNSTVwiO1xyXG5jb25zdCBNT0RVTEVfQ09ERSA9IFwiVklTSVRBU19HRVNUSU9OXCI7XHJcblxyXG4vLyBMb2FkcyB2aXNpYmxlIHZpc2l0IG93bmVycyBhbmQgcmVzb2x2ZXMgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCBvd25lciBzYWZlbHkuXHJcbmV4cG9ydCBjb25zdCB1c2VIaXN0b3J5VmlzaWJsZU93bmVyID0gKHtcclxuICBlbmFibGVkLFxyXG4gIGNvbXBhbnlJZCxcclxuICBheFVzZXJJZCxcclxuICBwZXJtaXNzaW9uc1JldmlzaW9uLFxyXG4gIHNlbGVjdGVkT3duZXJBeFVzZXJJZCxcclxuICBvbkRlYnVnLFxyXG59OiBBcmdzKSA9PiB7XHJcbiAgY29uc3Qge1xyXG4gICAgdmlzaWJsZVVzZXJzLFxyXG4gICAgdmlzaWJsZVVzZXJzTG9hZGluZyxcclxuICAgIHZpc2libGVVc2Vyc0Vycm9yLFxyXG4gICAgdmlzaWJsZVVzZXJzUmVhZHksXHJcbiAgfSA9IHVzZU1vZHVsZURhdGFWaXNpYmlsaXR5KHtcclxuICAgIGVuYWJsZWQsXHJcbiAgICBjb21wYW55SWQsXHJcbiAgICBheFVzZXJJZCxcclxuICAgIHBlcm1pc3Npb25zUmV2aXNpb24sXHJcbiAgICBhcHBDb2RlOiBBUFBfQ09ERSxcclxuICAgIG1vZHVsZUNvZGU6IE1PRFVMRV9DT0RFLFxyXG4gICAgcHJlbG9hZGVkVXNlcnM6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cuX19JTkRfVklTSUJMRV9WSVNJVF9VU0VSU19fIDogdW5kZWZpbmVkLFxyXG4gICAgb25Gb3JiaWRkZW46IHNob3dQZXJtaXNzaW9uTW9kYWwsXHJcbiAgICBvbkRlYnVnLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCB2aXNpYmxlVmlzaXRVc2VycyA9IHVzZU1lbW8oKCkgPT4ge1xyXG4gICAgcmV0dXJuIGVuc3VyZUN1cnJlbnRIaXN0b3J5VmlzaWJsZU93bmVySW5MaXN0KHZpc2libGVVc2VycywgYXhVc2VySWQpO1xyXG4gIH0sIFtheFVzZXJJZCwgdmlzaWJsZVVzZXJzXSk7XHJcblxyXG4gIGNvbnN0IHZpc2libGVWaXNpdFVzZXJCeU93bmVyQXhVc2VySWQgPSB1c2VNZW1vKCgpID0+IHtcclxuICAgIHJldHVybiBidWlsZFZpc2libGVVc2VyQnlPd25lck1hcCh2aXNpYmxlVmlzaXRVc2Vycyk7XHJcbiAgfSwgW3Zpc2libGVWaXNpdFVzZXJzXSk7XHJcblxyXG4gIGNvbnN0IGNhbk1hbmFnZVZpc2libGVPd25lcnMgPSB1c2VNZW1vKCgpID0+IHtcclxuICAgIHJldHVybiB2aXNpYmxlVXNlcnNSZWFkeSAmJiBoYXNIaXN0b3J5VmlzaWJsZVN1Ym9yZGluYXRlcyh2aXNpYmxlVmlzaXRVc2VycywgYXhVc2VySWQpO1xyXG4gIH0sIFtheFVzZXJJZCwgdmlzaWJsZVVzZXJzUmVhZHksIHZpc2libGVWaXNpdFVzZXJzXSk7XHJcblxyXG4gIGNvbnN0IG93bmVyU2VsZWN0VmFsdWUgPSB1c2VNZW1vKCgpID0+IHtcclxuICAgIHJldHVybiByZXNvbHZlSGlzdG9yeVZpc2libGVPd25lclNlbGVjdFZhbHVlKHtcclxuICAgICAgc2VsZWN0ZWRPd25lckF4VXNlcklkLFxyXG4gICAgICBjdXJyZW50QXhVc2VySWQ6IGF4VXNlcklkLFxyXG4gICAgICB1c2VyczogdmlzaWJsZVZpc2l0VXNlcnMsXHJcbiAgICAgIGNhbk1hbmFnZVZpc2libGVPd25lcnMsXHJcbiAgICB9KTtcclxuICB9LCBbYXhVc2VySWQsIGNhbk1hbmFnZVZpc2libGVPd25lcnMsIHNlbGVjdGVkT3duZXJBeFVzZXJJZCwgdmlzaWJsZVZpc2l0VXNlcnNdKTtcclxuXHJcbiAgY29uc3QgcmVzb2x2ZUVmZmVjdGl2ZU93bmVyQXhVc2VySWQgPSB1c2VDYWxsYmFjayhcclxuICAgIChyZXF1ZXN0ZWRPd25lckF4VXNlcklkPzogc3RyaW5nKSA9PiB7XHJcbiAgICAgIHJldHVybiByZXNvbHZlSGlzdG9yeUVmZmVjdGl2ZU93bmVyQXhVc2VySWQoe1xyXG4gICAgICAgIHNlbGVjdGVkT3duZXJBeFVzZXJJZDogcmVxdWVzdGVkT3duZXJBeFVzZXJJZCA/PyBzZWxlY3RlZE93bmVyQXhVc2VySWQsXHJcbiAgICAgICAgY3VycmVudEF4VXNlcklkOiBheFVzZXJJZCxcclxuICAgICAgICB1c2VyczogdmlzaWJsZVZpc2l0VXNlcnMsXHJcbiAgICAgICAgY2FuTWFuYWdlVmlzaWJsZU93bmVycyxcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgW2F4VXNlcklkLCBjYW5NYW5hZ2VWaXNpYmxlT3duZXJzLCBzZWxlY3RlZE93bmVyQXhVc2VySWQsIHZpc2libGVWaXNpdFVzZXJzXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGVmZmVjdGl2ZVNlbGVjdGVkT3duZXJBeFVzZXJJZCA9IHVzZU1lbW8oKCkgPT4ge1xyXG4gICAgcmV0dXJuIHJlc29sdmVFZmZlY3RpdmVPd25lckF4VXNlcklkKHNlbGVjdGVkT3duZXJBeFVzZXJJZCk7XHJcbiAgfSwgW3Jlc29sdmVFZmZlY3RpdmVPd25lckF4VXNlcklkLCBzZWxlY3RlZE93bmVyQXhVc2VySWRdKTtcclxuXHJcbiAgY29uc3Qgc2VsZWN0ZWRPd25lciA9IHVzZU1lbW8oKCkgPT4ge1xyXG4gICAgcmV0dXJuIGdldFZpc2libGVVc2VyRm9yT3duZXIodmlzaWJsZVZpc2l0VXNlckJ5T3duZXJBeFVzZXJJZCwgZWZmZWN0aXZlU2VsZWN0ZWRPd25lckF4VXNlcklkKTtcclxuICB9LCBbZWZmZWN0aXZlU2VsZWN0ZWRPd25lckF4VXNlcklkLCB2aXNpYmxlVmlzaXRVc2VyQnlPd25lckF4VXNlcklkXSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICB2aXNpYmxlVmlzaXRVc2VycyxcclxuICAgIHZpc2libGVVc2Vyc0xvYWRpbmcsXHJcbiAgICB2aXNpYmxlVXNlcnNFcnJvcixcclxuICAgIHZpc2libGVVc2Vyc1JlYWR5LFxyXG4gICAgb3duZXJTZWxlY3RWYWx1ZSxcclxuICAgIG93bmVyRmlsdGVyRGlzYWJsZWQ6ICF2aXNpYmxlVXNlcnNSZWFkeSB8fCB2aXNpYmxlVXNlcnNMb2FkaW5nIHx8ICFjYW5NYW5hZ2VWaXNpYmxlT3duZXJzLFxyXG4gICAgY2FuTWFuYWdlVmlzaWJsZU93bmVycyxcclxuICAgIHNlbGVjdGVkT3duZXJUZXh0OiBzZWxlY3RlZE93bmVyID8gZm9ybWF0TW9kdWxlVmlzaWJsZVVzZXJMYWJlbChzZWxlY3RlZE93bmVyKSA6IFwiXCIsXHJcbiAgICBlZmZlY3RpdmVTZWxlY3RlZE93bmVyQXhVc2VySWQsXHJcbiAgICByZXNvbHZlRWZmZWN0aXZlT3duZXJBeFVzZXJJZCxcclxuICB9O1xyXG59O1xyXG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBBcGlGZXRjaEVycm9yLCBmZXRjaEpzb24gfSBmcm9tIFwiLi4vc2VydmljZXMvYXBpU2VydmljZS50c1wiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuXHJcbmV4cG9ydCB0eXBlIEhpc3RvcnlBY3Rpdml0eUl0ZW0gPSB7XHJcbiAgYWN0aXZpZGFkSWQ/OiBzdHJpbmcgfCBudW1iZXI7XHJcbiAgQWN0aXZpZGFkSWQ/OiBzdHJpbmcgfCBudW1iZXI7XHJcbiAgcmVjSWQ/OiBzdHJpbmcgfCBudW1iZXI7XHJcbiAgUmVjSWQ/OiBzdHJpbmcgfCBudW1iZXI7XHJcbiAgbmFtZT86IHN0cmluZztcclxuICBOYW1lPzogc3RyaW5nO1xyXG4gIHRyYW5zRGF0ZT86IHN0cmluZztcclxuICBUcmFuc0RhdGU/OiBzdHJpbmc7XHJcbiAgZGVzY3JpcHRpb24/OiBzdHJpbmc7XHJcbiAgRGVzY3JpcHRpb24/OiBzdHJpbmc7XHJcbn07XHJcblxyXG50eXBlIEhpc3RvcnlSZXNwb25zZSA9IHtcclxuICBpdGVtcz86IEhpc3RvcnlBY3Rpdml0eUl0ZW1bXTtcclxuICB0b3RhbD86IG51bWJlcjtcclxufTtcclxuXHJcbnR5cGUgTG9hZE92ZXJyaWRlID0ge1xyXG4gIGZyb21EYXRlOiBzdHJpbmc7XHJcbiAgdG9EYXRlOiBzdHJpbmc7XHJcbiAgYWNjb3VudE51bT86IHN0cmluZztcclxuICBvd25lckF4VXNlcklkPzogc3RyaW5nO1xyXG59O1xyXG5cclxudHlwZSBVc2VIaXN0b3J5QWN0aXZpdGllc0FyZ3MgPSB7XHJcbiAgZnJvbURhdGVWYWx1ZTogc3RyaW5nO1xyXG4gIHRvRGF0ZVZhbHVlOiBzdHJpbmc7XHJcbiAgYWNjb3VudE51bVZhbHVlOiBzdHJpbmc7XHJcbiAgb3duZXJBeFVzZXJJZFZhbHVlPzogc3RyaW5nO1xyXG4gIHBhZ2VTaXplOiBudW1iZXI7XHJcbiAgcmV0cnlEZWxheU1zPzogbnVtYmVyO1xyXG4gIG5vcm1hbGl6ZVJhbmdlOiAoZnJvbTogc3RyaW5nLCB0bzogc3RyaW5nKSA9PiB7IGZyb206IHN0cmluZzsgdG86IHN0cmluZyB9O1xyXG4gIG9uRm9yYmlkZGVuOiAoKSA9PiB2b2lkO1xyXG4gIG9uRGVidWc/OiAobWVzc2FnZTogc3RyaW5nLCBkYXRhPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pID0+IHZvaWQ7XHJcbn07XHJcblxyXG4vLyBDZW50cmFsaXplcyBoaXN0b3J5IGZldGNoL3JldHJ5IGxvZ2ljIHRvIGtlZXAgcGFnZSBjb21wb25lbnRzIHNtYWxsZXIuXHJcbmV4cG9ydCBjb25zdCB1c2VIaXN0b3J5QWN0aXZpdGllcyA9ICh7XHJcbiAgZnJvbURhdGVWYWx1ZSxcclxuICB0b0RhdGVWYWx1ZSxcclxuICBhY2NvdW50TnVtVmFsdWUsXHJcbiAgb3duZXJBeFVzZXJJZFZhbHVlID0gXCJcIixcclxuICBwYWdlU2l6ZSxcclxuICByZXRyeURlbGF5TXMgPSA2MDAsXHJcbiAgbm9ybWFsaXplUmFuZ2UsXHJcbiAgb25Gb3JiaWRkZW4sXHJcbiAgb25EZWJ1ZyxcclxufTogVXNlSGlzdG9yeUFjdGl2aXRpZXNBcmdzKSA9PiB7XHJcbiAgY29uc3QgW2l0ZW1zLCBzZXRJdGVtc10gPSB1c2VTdGF0ZTxIaXN0b3J5QWN0aXZpdHlJdGVtW10+KFtdKTtcclxuICBjb25zdCBbdG90YWwsIHNldFRvdGFsXSA9IHVzZVN0YXRlKDApO1xyXG4gIGNvbnN0IFtjdXJyZW50UGFnZSwgc2V0Q3VycmVudFBhZ2VdID0gdXNlU3RhdGUoMSk7XHJcbiAgY29uc3QgW2lzTG9hZGluZywgc2V0SXNMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbZXJyb3JNZXNzYWdlLCBzZXRFcnJvck1lc3NhZ2VdID0gdXNlU3RhdGUoXCJcIik7XHJcblxyXG4gIGNvbnN0IHJldHJ5T25OZXR3b3JrRXJyb3JSZWYgPSB1c2VSZWYoZmFsc2UpO1xyXG4gIGNvbnN0IGFjdGl2ZUFib3J0UmVmID0gdXNlUmVmPEFib3J0Q29udHJvbGxlciB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IGFjdGl2ZVJlcXVlc3RJZFJlZiA9IHVzZVJlZigwKTtcclxuICBjb25zdCByZXRyeVRpbWVyUmVmID0gdXNlUmVmPG51bWJlciB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IGxhc3RTaWduYXR1cmVSZWYgPSB1c2VSZWYoXCJcIik7XHJcblxyXG4gIGNvbnN0IGNsZWFyUmV0cnlUaW1lciA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmIChyZXRyeVRpbWVyUmVmLmN1cnJlbnQpIHtcclxuICAgICAgY2xlYXJUaW1lb3V0KHJldHJ5VGltZXJSZWYuY3VycmVudCk7XHJcbiAgICAgIHJldHJ5VGltZXJSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICB9XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBhYm9ydEFjdGl2ZVJlcXVlc3QgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAoIWFjdGl2ZUFib3J0UmVmLmN1cnJlbnQpIHJldHVybjtcclxuICAgIHRyeSB7XHJcbiAgICAgIGFjdGl2ZUFib3J0UmVmLmN1cnJlbnQuYWJvcnQoKTtcclxuICAgIH0gY2F0Y2gge1xyXG4gICAgICAvLyBJZ25vcmUgYWJvcnQgZXJyb3JzLlxyXG4gICAgfVxyXG4gICAgYWN0aXZlQWJvcnRSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCByZXNldEFjdGl2aXRpZXMgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBjbGVhclJldHJ5VGltZXIoKTtcclxuICAgIGFib3J0QWN0aXZlUmVxdWVzdCgpO1xyXG4gICAgc2V0SXRlbXMoW10pO1xyXG4gICAgc2V0VG90YWwoMCk7XHJcbiAgICBzZXRFcnJvck1lc3NhZ2UoXCJcIik7XHJcbiAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xyXG4gIH0sIFthYm9ydEFjdGl2ZVJlcXVlc3QsIGNsZWFyUmV0cnlUaW1lcl0pO1xyXG5cclxuICBjb25zdCBsb2FkQWN0aXZpdGllcyA9IHVzZUNhbGxiYWNrKFxyXG4gICAgYXN5bmMgKHBhZ2U6IG51bWJlciwgb3ZlcnJpZGU/OiBMb2FkT3ZlcnJpZGUpID0+IHtcclxuICAgICAgY29uc3QgZnJvbURhdGVTdHIgPSBvdmVycmlkZT8uZnJvbURhdGUgPz8gZnJvbURhdGVWYWx1ZTtcclxuICAgICAgY29uc3QgdG9EYXRlU3RyID0gb3ZlcnJpZGU/LnRvRGF0ZSA/PyB0b0RhdGVWYWx1ZTtcclxuICAgICAgY29uc3QgYWNjb3VudE51bVN0ciA9IG92ZXJyaWRlPy5hY2NvdW50TnVtID8/IGFjY291bnROdW1WYWx1ZTtcclxuICAgICAgY29uc3Qgb3duZXJBeFVzZXJJZFN0ciA9IG92ZXJyaWRlPy5vd25lckF4VXNlcklkID8/IG93bmVyQXhVc2VySWRWYWx1ZTtcclxuXHJcbiAgICAgIGlmICghZnJvbURhdGVTdHIgfHwgIXRvRGF0ZVN0cikge1xyXG4gICAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XHJcbiAgICAgICAgc2V0SXRlbXMoW10pO1xyXG4gICAgICAgIHNldFRvdGFsKDApO1xyXG4gICAgICAgIHNldEVycm9yTWVzc2FnZShcIlwiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNldEN1cnJlbnRQYWdlKHBhZ2UpO1xyXG4gICAgICBjbGVhclJldHJ5VGltZXIoKTtcclxuXHJcbiAgICAgIGNvbnN0IHJlcXVlc3RJZCA9ICsrYWN0aXZlUmVxdWVzdElkUmVmLmN1cnJlbnQ7XHJcbiAgICAgIGFib3J0QWN0aXZlUmVxdWVzdCgpO1xyXG5cclxuICAgICAgY29uc3QgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcclxuICAgICAgYWN0aXZlQWJvcnRSZWYuY3VycmVudCA9IGNvbnRyb2xsZXI7XHJcblxyXG4gICAgICBjb25zdCBub3JtYWxpemVkID0gbm9ybWFsaXplUmFuZ2UoZnJvbURhdGVTdHIsIHRvRGF0ZVN0cik7XHJcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRPd25lckF4VXNlcklkID0gb3duZXJBeFVzZXJJZFN0ci50cmltKCk7XHJcbiAgICAgIGNvbnN0IGZpbHRlclNpZ25hdHVyZSA9IGAke25vcm1hbGl6ZWQuZnJvbX18JHtub3JtYWxpemVkLnRvfXwke2FjY291bnROdW1TdHJ9fCR7bm9ybWFsaXplZE93bmVyQXhVc2VySWR9fCR7cGFnZX1gO1xyXG4gICAgICBsYXN0U2lnbmF0dXJlUmVmLmN1cnJlbnQgPSBmaWx0ZXJTaWduYXR1cmU7XHJcblxyXG4gICAgICBzZXRJc0xvYWRpbmcodHJ1ZSk7XHJcbiAgICAgIHNldEl0ZW1zKFtdKTtcclxuICAgICAgc2V0VG90YWwoMCk7XHJcbiAgICAgIHNldEVycm9yTWVzc2FnZShcIlwiKTtcclxuXHJcbiAgICAgIGNvbnN0IHBheWxvYWQ6IHtcclxuICAgICAgICBmcm9tRGF0ZTogc3RyaW5nO1xyXG4gICAgICAgIHRvRGF0ZTogc3RyaW5nO1xyXG4gICAgICAgIGFjY291bnROdW06IHN0cmluZztcclxuICAgICAgICBvd25lckF4VXNlcklkPzogc3RyaW5nO1xyXG4gICAgICB9ID0ge1xyXG4gICAgICAgIGZyb21EYXRlOiBub3JtYWxpemVkLmZyb20sXHJcbiAgICAgICAgdG9EYXRlOiBub3JtYWxpemVkLnRvLFxyXG4gICAgICAgIGFjY291bnROdW06IGFjY291bnROdW1TdHIsXHJcbiAgICAgIH07XHJcbiAgICAgIGlmIChub3JtYWxpemVkT3duZXJBeFVzZXJJZCkge1xyXG4gICAgICAgIHBheWxvYWQub3duZXJBeFVzZXJJZCA9IG5vcm1hbGl6ZWRPd25lckF4VXNlcklkO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBvbkRlYnVnPy4oXCJsb2FkQWN0aXZpdGllczpyZXF1ZXN0XCIsIHsgcGFnZSwgcGFnZVNpemUsIHBheWxvYWQgfSk7XHJcblxyXG4gICAgICBsZXQgZGF0YTogSGlzdG9yeVJlc3BvbnNlO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGRhdGEgPSBhd2FpdCBmZXRjaEpzb248SGlzdG9yeVJlc3BvbnNlPihgL0hpc3RvcmlhbC9HZXRBY3Rpdml0aWVzP3BhZ2U9JHtwYWdlfSZwYWdlU2l6ZT0ke3BhZ2VTaXplfWAsIHtcclxuICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXHJcbiAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXlsb2FkKSxcclxuICAgICAgICAgIHNpZ25hbDogY29udHJvbGxlci5zaWduYWwsXHJcbiAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcclxuICAgICAgICB9KTtcclxuICAgICAgfSBjYXRjaCAoZXJyOiBhbnkpIHtcclxuICAgICAgICBpZiAocmVxdWVzdElkICE9PSBhY3RpdmVSZXF1ZXN0SWRSZWYuY3VycmVudCkgcmV0dXJuO1xyXG4gICAgICAgIGlmIChlcnI/Lm5hbWUgPT09IFwiQWJvcnRFcnJvclwiKSB7XHJcbiAgICAgICAgICBhY3RpdmVBYm9ydFJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChlcnIgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yICYmIGVyci5zdGF0dXMgPT09IDQwMykge1xyXG4gICAgICAgICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcclxuICAgICAgICAgIGFjdGl2ZUFib3J0UmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICAgICAgb25Gb3JiaWRkZW4oKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGlzTmV0d29ya0Vycm9yID0gIShlcnIgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yKSB8fCB0eXBlb2YgZXJyLnN0YXR1cyAhPT0gXCJudW1iZXJcIjtcclxuICAgICAgICBpZiAoaXNOZXR3b3JrRXJyb3IgJiYgcmV0cnlPbk5ldHdvcmtFcnJvclJlZi5jdXJyZW50KSB7XHJcbiAgICAgICAgICByZXRyeU9uTmV0d29ya0Vycm9yUmVmLmN1cnJlbnQgPSBmYWxzZTtcclxuICAgICAgICAgIGFjdGl2ZUFib3J0UmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICAgICAgcmV0cnlUaW1lclJlZi5jdXJyZW50ID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmVxdWVzdElkICE9PSBhY3RpdmVSZXF1ZXN0SWRSZWYuY3VycmVudCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBpZiAobGFzdFNpZ25hdHVyZVJlZi5jdXJyZW50ICE9PSBmaWx0ZXJTaWduYXR1cmUpIHJldHVybjtcclxuICAgICAgICAgICAgbG9hZEFjdGl2aXRpZXMocGFnZSwge1xyXG4gICAgICAgICAgICAgIGZyb21EYXRlOiBmcm9tRGF0ZVN0cixcclxuICAgICAgICAgICAgICB0b0RhdGU6IHRvRGF0ZVN0cixcclxuICAgICAgICAgICAgICBhY2NvdW50TnVtOiBhY2NvdW50TnVtU3RyLFxyXG4gICAgICAgICAgICAgIG93bmVyQXhVc2VySWQ6IG5vcm1hbGl6ZWRPd25lckF4VXNlcklkLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0sIHJldHJ5RGVsYXlNcyk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XHJcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKGVycj8ubWVzc2FnZSB8fCBpbmRUKFwiQXBpX1JlcXVlc3RGYWlsZWRcIiwgXCJObyBzZSBwdWRvIGNvbmVjdGFyIGNvbiBlbCBzZXJ2aWRvciAocmVkKS5cIikpO1xyXG4gICAgICAgIGFjdGl2ZUFib3J0UmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHJlcXVlc3RJZCAhPT0gYWN0aXZlUmVxdWVzdElkUmVmLmN1cnJlbnQpIHJldHVybjtcclxuXHJcbiAgICAgIG9uRGVidWc/LihcImxvYWRBY3Rpdml0aWVzOnJlc3BvbnNlXCIsIHtcclxuICAgICAgICBzdGF0dXM6IDIwMCxcclxuICAgICAgICB0b3RhbDogZGF0YT8udG90YWwgPz8gMCxcclxuICAgICAgICBjb3VudDogQXJyYXkuaXNBcnJheShkYXRhPy5pdGVtcykgPyBkYXRhLml0ZW1zLmxlbmd0aCA6IDAsXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcclxuICAgICAgc2V0SXRlbXMoZGF0YS5pdGVtcyB8fCBbXSk7XHJcbiAgICAgIHNldFRvdGFsKGRhdGEudG90YWwgfHwgKGRhdGEuaXRlbXMgfHwgW10pLmxlbmd0aCk7XHJcbiAgICAgIGFjdGl2ZUFib3J0UmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgfSxcclxuICAgIFtcclxuICAgICAgYWJvcnRBY3RpdmVSZXF1ZXN0LFxyXG4gICAgICBhY2NvdW50TnVtVmFsdWUsXHJcbiAgICAgIGNsZWFyUmV0cnlUaW1lcixcclxuICAgICAgZnJvbURhdGVWYWx1ZSxcclxuICAgICAgbm9ybWFsaXplUmFuZ2UsXHJcbiAgICAgIG9uRGVidWcsXHJcbiAgICAgIG9uRm9yYmlkZGVuLFxyXG4gICAgICBvd25lckF4VXNlcklkVmFsdWUsXHJcbiAgICAgIHBhZ2VTaXplLFxyXG4gICAgICByZXRyeURlbGF5TXMsXHJcbiAgICAgIHRvRGF0ZVZhbHVlLFxyXG4gICAgXVxyXG4gICk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBjbGVhclJldHJ5VGltZXIoKTtcclxuICAgICAgYWJvcnRBY3RpdmVSZXF1ZXN0KCk7XHJcbiAgICB9O1xyXG4gIH0sIFthYm9ydEFjdGl2ZVJlcXVlc3QsIGNsZWFyUmV0cnlUaW1lcl0pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgaXRlbXMsXHJcbiAgICB0b3RhbCxcclxuICAgIGN1cnJlbnRQYWdlLFxyXG4gICAgaXNMb2FkaW5nLFxyXG4gICAgZXJyb3JNZXNzYWdlLFxyXG4gICAgbG9hZEFjdGl2aXRpZXMsXHJcbiAgICByZXNldEFjdGl2aXRpZXMsXHJcbiAgICByZXRyeU9uTmV0d29ya0Vycm9yUmVmLFxyXG4gICAgbGFzdFNpZ25hdHVyZVJlZixcclxuICB9O1xyXG59O1xyXG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2sgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgSElTVE9SWV9GSUxURVJfS0VZLCBISVNUT1JZX1JFVFVSTl9GTEFHX0tFWSB9IGZyb20gXCIuLi91dGlscy92aXNpdGFzSGlzdG9yeS50c1wiO1xyXG5pbXBvcnQge1xyXG4gIGdldFNlc3Npb25Kc29uV2l0aEV4cGlyeSxcclxuICBnZXRTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5LFxyXG4gIHJlbW92ZVNlc3Npb25WYWx1ZVdpdGhFeHBpcnksXHJcbiAgc2V0U2Vzc2lvbkpzb25XaXRoRXhwaXJ5LFxyXG4gIHNldFNlc3Npb25WYWx1ZVdpdGhFeHBpcnksXHJcbn0gZnJvbSBcIi4uL3V0aWxzL3Nlc3Npb25FeHBpcnkudHNcIjtcclxuXHJcbmV4cG9ydCB0eXBlIEhpc3RvcnlDYWNoZWRGaWx0ZXIgPSB7XHJcbiAgZnJvbURhdGU6IHN0cmluZztcclxuICB0b0RhdGU6IHN0cmluZztcclxuICBwYWdlPzogbnVtYmVyO1xyXG4gIGNsaWVudEFjY291bnQ/OiBzdHJpbmc7XHJcbiAgY2xpZW50VGV4dD86IHN0cmluZztcclxuICBvd25lckF4VXNlcklkPzogc3RyaW5nO1xyXG4gIG93bmVyVGV4dD86IHN0cmluZztcclxufTtcclxuXHJcbmNvbnN0IEhJU1RPUllfQ0FDSEVfVFRMX01TID0gMTIgKiA2MCAqIDYwICogMTAwMDtcclxuXHJcbmNvbnN0IG5vcm1hbGl6ZUNhY2hlZEZpbHRlciA9ICh2YWx1ZTogSGlzdG9yeUNhY2hlZEZpbHRlciB8IG51bGwpOiBIaXN0b3J5Q2FjaGVkRmlsdGVyIHwgbnVsbCA9PiB7XHJcbiAgaWYgKCF2YWx1ZSB8fCB0eXBlb2YgdmFsdWUgIT09IFwib2JqZWN0XCIpIHJldHVybiBudWxsO1xyXG4gIHJldHVybiB7XHJcbiAgICBmcm9tRGF0ZTogdmFsdWUuZnJvbURhdGUgfHwgXCJcIixcclxuICAgIHRvRGF0ZTogdmFsdWUudG9EYXRlIHx8IFwiXCIsXHJcbiAgICBwYWdlOiB2YWx1ZS5wYWdlLFxyXG4gICAgY2xpZW50QWNjb3VudDogdmFsdWUuY2xpZW50QWNjb3VudCB8fCBcIlwiLFxyXG4gICAgY2xpZW50VGV4dDogdmFsdWUuY2xpZW50VGV4dCB8fCBcIlwiLFxyXG4gICAgb3duZXJBeFVzZXJJZDogdmFsdWUub3duZXJBeFVzZXJJZCB8fCBcIlwiLFxyXG4gICAgb3duZXJUZXh0OiB2YWx1ZS5vd25lclRleHQgfHwgXCJcIixcclxuICB9O1xyXG59O1xyXG5cclxuLy8gS2VlcHMgaGlzdG9yeSBmaWx0ZXIgY2FjaGUgcmVhZHMvd3JpdGVzIGluIG9uZSBwbGFjZS5cclxuZXhwb3J0IGNvbnN0IHVzZUhpc3RvcnlGaWx0ZXJDYWNoZSA9ICgpID0+IHtcclxuICBjb25zdCByZWFkQ2FjaGVkRmlsdGVyID0gdXNlQ2FsbGJhY2soKCk6IEhpc3RvcnlDYWNoZWRGaWx0ZXIgfCBudWxsID0+IHtcclxuICAgIGNvbnN0IHBhcnNlZCA9IGdldFNlc3Npb25Kc29uV2l0aEV4cGlyeTxIaXN0b3J5Q2FjaGVkRmlsdGVyPihISVNUT1JZX0ZJTFRFUl9LRVkpO1xyXG4gICAgcmV0dXJuIG5vcm1hbGl6ZUNhY2hlZEZpbHRlcihwYXJzZWQpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgY2xlYXJGaWx0ZXJDYWNoZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIHJlbW92ZVNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoSElTVE9SWV9GSUxURVJfS0VZKTtcclxuICAgIHJlbW92ZVNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoSElTVE9SWV9SRVRVUk5fRkxBR19LRVkpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgY29uc3VtZVJldHVybkZsYWcgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBjb25zdCByYXcgPSBnZXRTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KEhJU1RPUllfUkVUVVJOX0ZMQUdfS0VZKTtcclxuICAgIGlmIChyYXcgPT09IFwiMVwiKSB7XHJcbiAgICAgIHJlbW92ZVNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoSElTVE9SWV9SRVRVUk5fRkxBR19LRVkpO1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IHNhdmVDYWNoZWRGaWx0ZXIgPSB1c2VDYWxsYmFjaygoZmlsdGVyOiBIaXN0b3J5Q2FjaGVkRmlsdGVyKSA9PiB7XHJcbiAgICBzZXRTZXNzaW9uSnNvbldpdGhFeHBpcnkoSElTVE9SWV9GSUxURVJfS0VZLCBmaWx0ZXIsIEhJU1RPUllfQ0FDSEVfVFRMX01TKTtcclxuICAgIHNldFNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoSElTVE9SWV9SRVRVUk5fRkxBR19LRVksIFwiMVwiLCBISVNUT1JZX0NBQ0hFX1RUTF9NUyk7XHJcbiAgfSwgW10pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgcmVhZENhY2hlZEZpbHRlcixcclxuICAgIGNsZWFyRmlsdGVyQ2FjaGUsXHJcbiAgICBjb25zdW1lUmV0dXJuRmxhZyxcclxuICAgIHNhdmVDYWNoZWRGaWx0ZXIsXHJcbiAgfTtcclxufTtcclxuIiwgIlx1RkVGRmltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjaywgdXNlTWVtbywgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgdHlwZSB7IE1vdXNlRXZlbnQgYXMgUmVhY3RNb3VzZUV2ZW50IH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB0eXBlIHsgQ2xpZW50T3B0aW9uIH0gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvdmlzaXRhcy9DbGllbnRTZWFyY2hDb21ib2JveC50c3hcIjtcclxuaW1wb3J0IHR5cGUgeyBIaXN0b3J5Q2FjaGVkRmlsdGVyIH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZUhpc3RvcnlGaWx0ZXJDYWNoZS50c1wiO1xyXG5cclxuZXhwb3J0IHR5cGUgUXVpY2tGaWx0ZXJJZCA9IFwiY3VzdG9tXCIgfCBcImRheXMtN1wiIHwgXCJkYXlzLTMwXCIgfCBcImRheXMtOTBcIjtcclxuXHJcbmV4cG9ydCB0eXBlIExvYWRPdmVycmlkZSA9IHtcclxuICBmcm9tRGF0ZTogc3RyaW5nO1xyXG4gIHRvRGF0ZTogc3RyaW5nO1xyXG4gIGFjY291bnROdW0/OiBzdHJpbmc7XHJcbiAgb3duZXJBeFVzZXJJZD86IHN0cmluZztcclxufTtcclxuXHJcbmV4cG9ydCB0eXBlIEZpbHRlckxvYWRSZXF1ZXN0ID0ge1xyXG4gIHBhZ2U6IG51bWJlcjtcclxuICBvdmVycmlkZTogTG9hZE92ZXJyaWRlO1xyXG59O1xyXG5cclxuY29uc3QgSElTVE9SWV9RVUlDS19GSUxURVJfUkFOR0VTOiBBcnJheTx7XHJcbiAgaWQ6IEV4Y2x1ZGU8UXVpY2tGaWx0ZXJJZCwgXCJjdXN0b21cIj47XHJcbiAgZGF5c1RvU3VidHJhY3Q6IG51bWJlcjtcclxufT4gPSBbXHJcbiAgeyBpZDogXCJkYXlzLTdcIiwgZGF5c1RvU3VidHJhY3Q6IDYgfSxcclxuICB7IGlkOiBcImRheXMtMzBcIiwgZGF5c1RvU3VidHJhY3Q6IDI5IH0sXHJcbiAgeyBpZDogXCJkYXlzLTkwXCIsIGRheXNUb1N1YnRyYWN0OiA4OSB9LFxyXG5dO1xyXG5cclxudHlwZSBVc2VIaXN0b3J5RmlsdGVyc1N0YXRlQXJncyA9IHtcclxuICBkZWZhdWx0RnJvbURhdGU6IHN0cmluZztcclxuICBkZWZhdWx0VG9EYXRlOiBzdHJpbmc7XHJcbiAgbG9nSGlzdG9yeTogKG1lc3NhZ2U6IHN0cmluZywgZGF0YT86IFJlY29yZDxzdHJpbmcsIHVua25vd24+KSA9PiB2b2lkO1xyXG4gIHBhcnNlRGF0ZVZhbHVlOiAodmFsdWU6IHN0cmluZykgPT4gRGF0ZSB8IG51bGw7XHJcbiAgcGFyc2VJU086ICh2YWx1ZTogc3RyaW5nKSA9PiBEYXRlIHwgbnVsbDtcclxuICB0b0lTTzogKHZhbHVlOiBEYXRlKSA9PiBzdHJpbmc7XHJcbiAgc3RhcnRPZkRheTogKHZhbHVlOiBEYXRlKSA9PiBEYXRlO1xyXG4gIGlzQmVmb3JlOiAoYTogRGF0ZSB8IG51bGwsIGI6IERhdGUgfCBudWxsKSA9PiBib29sZWFuO1xyXG59O1xyXG5cclxuLy8gRW5jYXBzdWxhdGVzIGhpc3RvcnkgZmlsdGVyIHN0YXRlIGFuZCBkYXRlLXJhbmdlIG9yY2hlc3RyYXRpb24uXHJcbmV4cG9ydCBjb25zdCB1c2VIaXN0b3J5RmlsdGVyc1N0YXRlID0gKHtcclxuICBkZWZhdWx0RnJvbURhdGUsXHJcbiAgZGVmYXVsdFRvRGF0ZSxcclxuICBsb2dIaXN0b3J5LFxyXG4gIHBhcnNlRGF0ZVZhbHVlLFxyXG4gIHBhcnNlSVNPLFxyXG4gIHRvSVNPLFxyXG4gIHN0YXJ0T2ZEYXksXHJcbiAgaXNCZWZvcmUsXHJcbn06IFVzZUhpc3RvcnlGaWx0ZXJzU3RhdGVBcmdzKSA9PiB7XHJcbiAgY29uc3QgcmVzb2x2ZVF1aWNrRmlsdGVyRnJvbVJhbmdlID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoc3RhcnQ6IERhdGUgfCBudWxsLCBlbmQ6IERhdGUgfCBudWxsKTogUXVpY2tGaWx0ZXJJZCB8IG51bGwgPT4ge1xyXG4gICAgICBpZiAoIXN0YXJ0IHx8ICFlbmQpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3Qgbm9ybWFsaXplZFN0YXJ0ID0gc3RhcnRPZkRheShzdGFydCk7XHJcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRFbmQgPSBzdGFydE9mRGF5KGVuZCk7XHJcbiAgICAgIGNvbnN0IHRvZGF5ID0gc3RhcnRPZkRheShuZXcgRGF0ZSgpKTtcclxuICAgICAgaWYgKHRvSVNPKG5vcm1hbGl6ZWRFbmQpICE9PSB0b0lTTyh0b2RheSkpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgfVxyXG5cclxuICAgICAgZm9yIChjb25zdCBlbnRyeSBvZiBISVNUT1JZX1FVSUNLX0ZJTFRFUl9SQU5HRVMpIHtcclxuICAgICAgICBjb25zdCBjYW5kaWRhdGVTdGFydCA9IG5ldyBEYXRlKHRvZGF5KTtcclxuICAgICAgICBjYW5kaWRhdGVTdGFydC5zZXREYXRlKHRvZGF5LmdldERhdGUoKSAtIGVudHJ5LmRheXNUb1N1YnRyYWN0KTtcclxuICAgICAgICBpZiAodG9JU08obm9ybWFsaXplZFN0YXJ0KSA9PT0gdG9JU08oY2FuZGlkYXRlU3RhcnQpKSB7XHJcbiAgICAgICAgICByZXR1cm4gZW50cnkuaWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH0sXHJcbiAgICBbc3RhcnRPZkRheSwgdG9JU09dXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgW3N0YXJ0RGF0ZSwgc2V0U3RhcnREYXRlXSA9IHVzZVN0YXRlPERhdGUgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBbZW5kRGF0ZSwgc2V0RW5kRGF0ZV0gPSB1c2VTdGF0ZTxEYXRlIHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgW21hbnVhbFN0YXJ0RGF0ZSwgc2V0TWFudWFsU3RhcnREYXRlXSA9IHVzZVN0YXRlPERhdGUgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBbbWFudWFsRW5kRGF0ZSwgc2V0TWFudWFsRW5kRGF0ZV0gPSB1c2VTdGF0ZTxEYXRlIHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgW2hvdmVyRGF0ZSwgc2V0SG92ZXJEYXRlXSA9IHVzZVN0YXRlPERhdGUgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBbc2VsZWN0aW5nU3RlcCwgc2V0U2VsZWN0aW5nU3RlcF0gPSB1c2VTdGF0ZTxcInN0YXJ0XCIgfCBcImVuZFwiIHwgXCJkb25lXCI+KFwic3RhcnRcIik7XHJcbiAgY29uc3QgW2N1cnJlbnRNb250aCwgc2V0Q3VycmVudE1vbnRoXSA9IHVzZVN0YXRlKG5ldyBEYXRlKCkuZ2V0TW9udGgoKSk7XHJcbiAgY29uc3QgW2N1cnJlbnRZZWFyLCBzZXRDdXJyZW50WWVhcl0gPSB1c2VTdGF0ZShuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCkpO1xyXG4gIGNvbnN0IFtpc09wZW4sIHNldElzT3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW3Nob3dNYW51YWxQaWNrZXJQYW5lbCwgc2V0U2hvd01hbnVhbFBpY2tlclBhbmVsXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbYWN0aXZlUXVpY2tGaWx0ZXIsIHNldEFjdGl2ZVF1aWNrRmlsdGVyXSA9IHVzZVN0YXRlPFF1aWNrRmlsdGVySWQgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBbc2VsZWN0ZWRDbGllbnQsIHNldFNlbGVjdGVkQ2xpZW50XSA9IHVzZVN0YXRlPENsaWVudE9wdGlvbiB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IFtzZWxlY3RlZE93bmVyQXhVc2VySWQsIHNldFNlbGVjdGVkT3duZXJBeFVzZXJJZF0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbY2xpZW50UmVzZXRLZXksIHNldENsaWVudFJlc2V0S2V5XSA9IHVzZVN0YXRlKDApO1xyXG4gIGNvbnN0IFtzaG93RmlsdGVycywgc2V0U2hvd0ZpbHRlcnNdID0gdXNlU3RhdGUodHJ1ZSk7XHJcbiAgY29uc3QgW3Nob3dNYW51YWxFcnJvciwgc2V0U2hvd01hbnVhbEVycm9yXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuXHJcbiAgY29uc3QgaGFzUmVzdG9yZWRGaWx0ZXJSZWYgPSB1c2VSZWYoZmFsc2UpO1xyXG4gIGNvbnN0IGRpZEluaXRGaWx0ZXJSZWYgPSB1c2VSZWYoZmFsc2UpO1xyXG5cclxuICBjb25zdCBmcm9tRGF0ZVZhbHVlID0gdXNlTWVtbygoKSA9PiAoc3RhcnREYXRlID8gdG9JU08oc3RhcnREYXRlKSA6IFwiXCIpLCBbc3RhcnREYXRlLCB0b0lTT10pO1xyXG4gIGNvbnN0IHRvRGF0ZVZhbHVlID0gdXNlTWVtbygoKSA9PiAoZW5kRGF0ZSA/IHRvSVNPKGVuZERhdGUpIDogXCJcIiksIFtlbmREYXRlLCB0b0lTT10pO1xyXG4gIGNvbnN0IGFjY291bnROdW1WYWx1ZSA9IHVzZU1lbW8oKCkgPT4gKHNlbGVjdGVkQ2xpZW50ID8gc2VsZWN0ZWRDbGllbnQudmFsdWUgOiBcIlwiKSwgW3NlbGVjdGVkQ2xpZW50XSk7XHJcblxyXG4gIGNvbnN0IHZhbGlkYXRlTWFudWFsUmFuZ2UgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAoYWN0aXZlUXVpY2tGaWx0ZXIgPT09IFwiY3VzdG9tXCIgJiYgKCFzdGFydERhdGUgfHwgIWVuZERhdGUpKSB7XHJcbiAgICAgIHNldFNob3dNYW51YWxFcnJvcih0cnVlKTtcclxuICAgICAgc2V0U2VsZWN0aW5nU3RlcCghc3RhcnREYXRlID8gXCJzdGFydFwiIDogXCJlbmRcIik7XHJcbiAgICAgIHNldFNob3dNYW51YWxQaWNrZXJQYW5lbCh0cnVlKTtcclxuICAgICAgc2V0SXNPcGVuKHRydWUpO1xyXG4gICAgICBzZXRTaG93RmlsdGVycyh0cnVlKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfSwgW2FjdGl2ZVF1aWNrRmlsdGVyLCBlbmREYXRlLCBzdGFydERhdGVdKTtcclxuXHJcbiAgLy8gQXBwbGllcyBhIGRlZmF1bHQgZGF0ZSByYW5nZSBhbmQgcmV0dXJucyB0aGUgbG9hZCBwYXlsb2FkIG5lZWRlZCBieSB0aGUgcGFnZS5cclxuICBjb25zdCBhcHBseURlZmF1bHRSYW5nZUZyb21Qcm9wcyA9IHVzZUNhbGxiYWNrKCgpOiBGaWx0ZXJMb2FkUmVxdWVzdCB8IG51bGwgPT4ge1xyXG4gICAgaWYgKCFkZWZhdWx0RnJvbURhdGUgfHwgIWRlZmF1bHRUb0RhdGUpIHJldHVybiBudWxsO1xyXG4gICAgY29uc3Qgc3RhcnRSYXcgPSBwYXJzZURhdGVWYWx1ZShkZWZhdWx0RnJvbURhdGUpO1xyXG4gICAgY29uc3QgZW5kUmF3ID0gcGFyc2VEYXRlVmFsdWUoZGVmYXVsdFRvRGF0ZSk7XHJcbiAgICBpZiAoIXN0YXJ0UmF3IHx8ICFlbmRSYXcpIHJldHVybiBudWxsO1xyXG5cclxuICAgIGNvbnN0IHN0YXJ0RGF5ID0gc3RhcnRPZkRheShzdGFydFJhdyk7XHJcbiAgICBjb25zdCBlbmREYXkgPSBzdGFydE9mRGF5KGVuZFJhdyk7XHJcblxyXG4gICAgbGV0IHN0YXJ0ID0gc3RhcnREYXk7XHJcbiAgICBsZXQgZW5kID0gZW5kRGF5O1xyXG4gICAgaWYgKGlzQmVmb3JlKGVuZCwgc3RhcnQpKSB7XHJcbiAgICAgIGNvbnN0IHN3YXAgPSBzdGFydDtcclxuICAgICAgc3RhcnQgPSBlbmQ7XHJcbiAgICAgIGVuZCA9IHN3YXA7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0U3RhcnREYXRlKHN0YXJ0KTtcclxuICAgIHNldEVuZERhdGUoZW5kKTtcclxuICAgIHNldFNlbGVjdGluZ1N0ZXAoXCJkb25lXCIpO1xyXG4gICAgc2V0SG92ZXJEYXRlKG51bGwpO1xyXG4gICAgc2V0Q3VycmVudE1vbnRoKHN0YXJ0LmdldE1vbnRoKCkpO1xyXG4gICAgc2V0Q3VycmVudFllYXIoc3RhcnQuZ2V0RnVsbFllYXIoKSk7XHJcbiAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcihyZXNvbHZlUXVpY2tGaWx0ZXJGcm9tUmFuZ2Uoc3RhcnQsIGVuZCkpO1xyXG4gICAgc2V0U2VsZWN0ZWRDbGllbnQobnVsbCk7XHJcbiAgICBzZXRTZWxlY3RlZE93bmVyQXhVc2VySWQoXCJcIik7XHJcbiAgICBzZXRJc09wZW4oZmFsc2UpO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIHBhZ2U6IDEsXHJcbiAgICAgIG92ZXJyaWRlOiB7XHJcbiAgICAgICAgZnJvbURhdGU6IHRvSVNPKHN0YXJ0KSxcclxuICAgICAgICB0b0RhdGU6IHRvSVNPKGVuZCksXHJcbiAgICAgICAgYWNjb3VudE51bTogXCJcIixcclxuICAgICAgfSxcclxuICAgIH07XHJcbiAgfSwgW2RlZmF1bHRGcm9tRGF0ZSwgZGVmYXVsdFRvRGF0ZSwgaXNCZWZvcmUsIHBhcnNlRGF0ZVZhbHVlLCByZXNvbHZlUXVpY2tGaWx0ZXJGcm9tUmFuZ2UsIHN0YXJ0T2ZEYXksIHRvSVNPXSk7XHJcblxyXG4gIC8vIFJlc2V0cyBoaXN0b3J5IGZpbHRlcnMgbG9jYWwgc3RhdGUgb25seS5cclxuICBjb25zdCByZXNldEhpc3RvcnlGaWx0ZXJzID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgc2V0U3RhcnREYXRlKG51bGwpO1xyXG4gICAgc2V0RW5kRGF0ZShudWxsKTtcclxuICAgIHNldE1hbnVhbFN0YXJ0RGF0ZShudWxsKTtcclxuICAgIHNldE1hbnVhbEVuZERhdGUobnVsbCk7XHJcbiAgICBzZXRTZWxlY3RpbmdTdGVwKFwic3RhcnRcIik7XHJcbiAgICBzZXRIb3ZlckRhdGUobnVsbCk7XHJcbiAgICBzZXRDdXJyZW50TW9udGgobmV3IERhdGUoKS5nZXRNb250aCgpKTtcclxuICAgIHNldEN1cnJlbnRZZWFyKG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKSk7XHJcbiAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcihudWxsKTtcclxuICAgIHNldFNob3dNYW51YWxQaWNrZXJQYW5lbChmYWxzZSk7XHJcbiAgICBzZXRTZWxlY3RlZENsaWVudChudWxsKTtcclxuICAgIHNldFNlbGVjdGVkT3duZXJBeFVzZXJJZChcIlwiKTtcclxuICAgIHNldENsaWVudFJlc2V0S2V5KChwcmV2KSA9PiBwcmV2ICsgMSk7XHJcbiAgICBzZXRTaG93TWFudWFsRXJyb3IoZmFsc2UpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgLy8gQXBwbGllcyBjYWNoZWQgZmlsdGVycyBhbmQgcmV0dXJucyB0aGUgbG9hZCBwYXlsb2FkIG5lZWRlZCBieSB0aGUgcGFnZS5cclxuICBjb25zdCBhcHBseUNhY2hlZEZpbHRlciA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKGZpbHRlcjogSGlzdG9yeUNhY2hlZEZpbHRlciB8IG51bGwpOiBGaWx0ZXJMb2FkUmVxdWVzdCB8IG51bGwgPT4ge1xyXG4gICAgICBpZiAoIWZpbHRlciB8fCAhZmlsdGVyLmZyb21EYXRlIHx8ICFmaWx0ZXIudG9EYXRlKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgICAgIGNvbnN0IHN0YXJ0ID0gcGFyc2VJU08oZmlsdGVyLmZyb21EYXRlKTtcclxuICAgICAgY29uc3QgZW5kID0gcGFyc2VJU08oZmlsdGVyLnRvRGF0ZSk7XHJcbiAgICAgIHNldFN0YXJ0RGF0ZShzdGFydCk7XHJcbiAgICAgIHNldEVuZERhdGUoZW5kKTtcclxuICAgICAgc2V0U2VsZWN0aW5nU3RlcChlbmQgPyBcImRvbmVcIiA6IFwiZW5kXCIpO1xyXG4gICAgICBzZXRIb3ZlckRhdGUobnVsbCk7XHJcbiAgICAgIHNldEN1cnJlbnRNb250aChzdGFydCA/IHN0YXJ0LmdldE1vbnRoKCkgOiBuZXcgRGF0ZSgpLmdldE1vbnRoKCkpO1xyXG4gICAgICBzZXRDdXJyZW50WWVhcihzdGFydCA/IHN0YXJ0LmdldEZ1bGxZZWFyKCkgOiBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCkpO1xyXG4gICAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcihyZXNvbHZlUXVpY2tGaWx0ZXJGcm9tUmFuZ2Uoc3RhcnQsIGVuZCkpO1xyXG4gICAgICBzZXRTaG93TWFudWFsUGlja2VyUGFuZWwoZmFsc2UpO1xyXG4gICAgICBzZXRTaG93TWFudWFsRXJyb3IoZmFsc2UpO1xyXG5cclxuICAgICAgaWYgKGZpbHRlci5jbGllbnRBY2NvdW50KSB7XHJcbiAgICAgICAgc2V0U2VsZWN0ZWRDbGllbnQoeyB2YWx1ZTogZmlsdGVyLmNsaWVudEFjY291bnQsIHRleHQ6IGZpbHRlci5jbGllbnRUZXh0IHx8IGZpbHRlci5jbGllbnRBY2NvdW50IH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNldFNlbGVjdGVkQ2xpZW50KG51bGwpO1xyXG4gICAgICB9XHJcbiAgICAgIHNldFNlbGVjdGVkT3duZXJBeFVzZXJJZChmaWx0ZXIub3duZXJBeFVzZXJJZCB8fCBcIlwiKTtcclxuXHJcbiAgICAgIGNvbnN0IHBhZ2VWYWwgPSBOdW1iZXIoZmlsdGVyLnBhZ2UpO1xyXG4gICAgICBjb25zdCBwYWdlVG9Mb2FkID0gTnVtYmVyLmlzRmluaXRlKHBhZ2VWYWwpICYmIHBhZ2VWYWwgPiAwID8gcGFnZVZhbCA6IDE7XHJcblxyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHBhZ2U6IHBhZ2VUb0xvYWQsXHJcbiAgICAgICAgb3ZlcnJpZGU6IHtcclxuICAgICAgICAgIGZyb21EYXRlOiBmaWx0ZXIuZnJvbURhdGUsXHJcbiAgICAgICAgICB0b0RhdGU6IGZpbHRlci50b0RhdGUsXHJcbiAgICAgICAgICBhY2NvdW50TnVtOiBmaWx0ZXIuY2xpZW50QWNjb3VudCB8fCBcIlwiLFxyXG4gICAgICAgICAgb3duZXJBeFVzZXJJZDogZmlsdGVyLm93bmVyQXhVc2VySWQgfHwgXCJcIixcclxuICAgICAgICB9LFxyXG4gICAgICB9O1xyXG4gICAgfSxcclxuICAgIFtwYXJzZUlTTywgcmVzb2x2ZVF1aWNrRmlsdGVyRnJvbVJhbmdlXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZVNlbGVjdCA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKGRhdGVPYmo6IERhdGUpID0+IHtcclxuICAgICAgbG9nSGlzdG9yeShcImhhbmRsZVNlbGVjdFwiLCB7XHJcbiAgICAgICAgY2xpY2tlZDogdG9JU08oZGF0ZU9iaiksXHJcbiAgICAgICAgc3RhcnQ6IGZyb21EYXRlVmFsdWUsXHJcbiAgICAgICAgZW5kOiB0b0RhdGVWYWx1ZSxcclxuICAgICAgICBzZWxlY3RpbmdTdGVwLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHNldFNob3dNYW51YWxFcnJvcihmYWxzZSk7XHJcbiAgICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKFwiY3VzdG9tXCIpO1xyXG4gICAgICBzZXRTaG93TWFudWFsUGlja2VyUGFuZWwodHJ1ZSk7XHJcbiAgICAgIGNvbnN0IGhhc1N0YXJ0ID0gISFzdGFydERhdGU7XHJcbiAgICAgIGNvbnN0IGhhc0VuZCA9ICEhZW5kRGF0ZTtcclxuXHJcbiAgICAgIGlmIChzZWxlY3RpbmdTdGVwID09PSBcImVuZFwiKSB7XHJcbiAgICAgICAgaWYgKCFoYXNTdGFydCkge1xyXG4gICAgICAgICAgc2V0U3RhcnREYXRlKGRhdGVPYmopO1xyXG4gICAgICAgICAgc2V0RW5kRGF0ZShudWxsKTtcclxuICAgICAgICAgIHNldFNlbGVjdGluZ1N0ZXAoXCJlbmRcIik7XHJcbiAgICAgICAgICBzZXRDdXJyZW50TW9udGgoZGF0ZU9iai5nZXRNb250aCgpKTtcclxuICAgICAgICAgIHNldEN1cnJlbnRZZWFyKGRhdGVPYmouZ2V0RnVsbFllYXIoKSk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbmV3U3RhcnQgPSBzdGFydERhdGUgYXMgRGF0ZTtcclxuICAgICAgICBsZXQgbmV3RW5kID0gZGF0ZU9iajtcclxuICAgICAgICBpZiAoaXNCZWZvcmUobmV3RW5kLCBuZXdTdGFydCkpIHtcclxuICAgICAgICAgIGNvbnN0IHN3YXAgPSBuZXdTdGFydDtcclxuICAgICAgICAgIG5ld1N0YXJ0ID0gbmV3RW5kO1xyXG4gICAgICAgICAgbmV3RW5kID0gc3dhcDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldFN0YXJ0RGF0ZShuZXdTdGFydCk7XHJcbiAgICAgICAgc2V0RW5kRGF0ZShuZXdFbmQpO1xyXG4gICAgICAgIHNldE1hbnVhbFN0YXJ0RGF0ZShuZXdTdGFydCk7XHJcbiAgICAgICAgc2V0TWFudWFsRW5kRGF0ZShuZXdFbmQpO1xyXG4gICAgICAgIHNldFNlbGVjdGluZ1N0ZXAoXCJkb25lXCIpO1xyXG4gICAgICAgIHNldEN1cnJlbnRNb250aChuZXdFbmQuZ2V0TW9udGgoKSk7XHJcbiAgICAgICAgc2V0Q3VycmVudFllYXIobmV3RW5kLmdldEZ1bGxZZWFyKCkpO1xyXG4gICAgICAgIHNldEhvdmVyRGF0ZShudWxsKTtcclxuICAgICAgICBzZXRJc09wZW4oZmFsc2UpO1xyXG4gICAgICAgIHNldFNob3dNYW51YWxQaWNrZXJQYW5lbChmYWxzZSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBuZXdTdGFydCA9IGRhdGVPYmo7XHJcbiAgICAgIGlmIChoYXNFbmQgJiYgZW5kRGF0ZSAmJiBpc0JlZm9yZShlbmREYXRlLCBuZXdTdGFydCkpIHtcclxuICAgICAgICBzZXRTdGFydERhdGUobmV3U3RhcnQpO1xyXG4gICAgICAgIHNldEVuZERhdGUobnVsbCk7XHJcbiAgICAgICAgc2V0U2VsZWN0aW5nU3RlcChcImVuZFwiKTtcclxuICAgICAgICBzZXRDdXJyZW50TW9udGgobmV3U3RhcnQuZ2V0TW9udGgoKSk7XHJcbiAgICAgICAgc2V0Q3VycmVudFllYXIobmV3U3RhcnQuZ2V0RnVsbFllYXIoKSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzZXRTdGFydERhdGUobmV3U3RhcnQpO1xyXG4gICAgICBpZiAoaGFzRW5kICYmIGVuZERhdGUpIHtcclxuICAgICAgICBzZXRFbmREYXRlKGVuZERhdGUpO1xyXG4gICAgICAgIHNldE1hbnVhbFN0YXJ0RGF0ZShuZXdTdGFydCk7XHJcbiAgICAgICAgc2V0TWFudWFsRW5kRGF0ZShlbmREYXRlKTtcclxuICAgICAgICBzZXRTZWxlY3RpbmdTdGVwKFwiZG9uZVwiKTtcclxuICAgICAgICBzZXRIb3ZlckRhdGUobnVsbCk7XHJcbiAgICAgICAgc2V0SXNPcGVuKGZhbHNlKTtcclxuICAgICAgICBzZXRTaG93TWFudWFsUGlja2VyUGFuZWwoZmFsc2UpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNldEVuZERhdGUobnVsbCk7XHJcbiAgICAgICAgc2V0U2VsZWN0aW5nU3RlcChcImVuZFwiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2V0Q3VycmVudE1vbnRoKG5ld1N0YXJ0LmdldE1vbnRoKCkpO1xyXG4gICAgICBzZXRDdXJyZW50WWVhcihuZXdTdGFydC5nZXRGdWxsWWVhcigpKTtcclxuICAgIH0sXHJcbiAgICBbZW5kRGF0ZSwgZnJvbURhdGVWYWx1ZSwgaXNCZWZvcmUsIGxvZ0hpc3RvcnksIHNlbGVjdGluZ1N0ZXAsIHN0YXJ0RGF0ZSwgdG9EYXRlVmFsdWUsIHRvSVNPXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUNsZWFyU3RhdGUgPSB1c2VDYWxsYmFjayhcclxuICAgIChldmVudDogUmVhY3RNb3VzZUV2ZW50KSA9PiB7XHJcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICBsb2dIaXN0b3J5KFwiY2xlYXJSYW5nZVwiKTtcclxuICAgICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIobnVsbCk7XHJcbiAgICAgIHNldFNob3dNYW51YWxFcnJvcihmYWxzZSk7XHJcbiAgICAgIHNldFNob3dNYW51YWxQaWNrZXJQYW5lbChmYWxzZSk7XHJcbiAgICAgIHJlc2V0SGlzdG9yeUZpbHRlcnMoKTtcclxuICAgICAgc2V0SXNPcGVuKGZhbHNlKTtcclxuICAgICAgc2V0U2hvd0ZpbHRlcnModHJ1ZSk7XHJcbiAgICB9LFxyXG4gICAgW2xvZ0hpc3RvcnksIHJlc2V0SGlzdG9yeUZpbHRlcnNdXHJcbiAgKTtcclxuXHJcbiAgY29uc3Qgb3BlblBvcG92ZXIgPSB1c2VDYWxsYmFjayhcclxuICAgIChzZWN0aW9uOiBcInN0YXJ0XCIgfCBcImVuZFwiKSA9PiB7XHJcbiAgICAgIGxvZ0hpc3RvcnkoXCJvcGVuUG9wb3ZlclwiLCB7IHNlY3Rpb24sIHN0YXJ0OiBmcm9tRGF0ZVZhbHVlLCBlbmQ6IHRvRGF0ZVZhbHVlLCBzZWxlY3RpbmdTdGVwIH0pO1xyXG4gICAgICBzZXRTaG93TWFudWFsRXJyb3IoZmFsc2UpO1xyXG4gICAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcihcImN1c3RvbVwiKTtcclxuICAgICAgc2V0U2hvd01hbnVhbFBpY2tlclBhbmVsKHRydWUpO1xyXG5cclxuICAgICAgaWYgKHNlY3Rpb24gPT09IFwiZW5kXCIgJiYgIXN0YXJ0RGF0ZSkge1xyXG4gICAgICAgIHNldFNlbGVjdGluZ1N0ZXAoXCJzdGFydFwiKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzZXRTZWxlY3RpbmdTdGVwKHNlY3Rpb24pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzZXRJc09wZW4odHJ1ZSk7XHJcbiAgICB9LFxyXG4gICAgW2Zyb21EYXRlVmFsdWUsIGxvZ0hpc3RvcnksIHNlbGVjdGluZ1N0ZXAsIHN0YXJ0RGF0ZSwgdG9EYXRlVmFsdWVdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQWN0aXZhdG9yS2V5RG93biA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKGV2ZW50OiBSZWFjdC5LZXlib2FyZEV2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4ge1xyXG4gICAgICBpZiAoZXZlbnQua2V5ICE9PSBcIkVudGVyXCIgJiYgZXZlbnQua2V5ICE9PSBcIiBcIikgcmV0dXJuO1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBvcGVuUG9wb3ZlcihcInN0YXJ0XCIpO1xyXG4gICAgfSxcclxuICAgIFtvcGVuUG9wb3Zlcl1cclxuICApO1xyXG5cclxuICBjb25zdCBoYW5kbGVTZWN0aW9uS2V5RG93biA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKGV2ZW50OiBSZWFjdC5LZXlib2FyZEV2ZW50PEhUTUxEaXZFbGVtZW50Piwgc2VjdGlvbjogXCJzdGFydFwiIHwgXCJlbmRcIikgPT4ge1xyXG4gICAgICBpZiAoZXZlbnQua2V5ICE9PSBcIkVudGVyXCIgJiYgZXZlbnQua2V5ICE9PSBcIiBcIikgcmV0dXJuO1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgb3BlblBvcG92ZXIoc2VjdGlvbik7XHJcbiAgICB9LFxyXG4gICAgW29wZW5Qb3BvdmVyXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGFwcGx5UXVpY2tSYW5nZSA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKGZpbHRlcklkOiBRdWlja0ZpbHRlcklkLCBzdGFydDogRGF0ZSwgZW5kOiBEYXRlKSA9PiB7XHJcbiAgICAgIGNvbnN0IHN0YXJ0RGF5ID0gc3RhcnRPZkRheShzdGFydCk7XHJcbiAgICAgIGNvbnN0IGVuZERheSA9IHN0YXJ0T2ZEYXkoZW5kKTtcclxuICAgICAgc2V0U3RhcnREYXRlKHN0YXJ0RGF5KTtcclxuICAgICAgc2V0RW5kRGF0ZShlbmREYXkpO1xyXG4gICAgICBzZXRTZWxlY3RpbmdTdGVwKFwiZG9uZVwiKTtcclxuICAgICAgc2V0SG92ZXJEYXRlKG51bGwpO1xyXG4gICAgICBzZXRDdXJyZW50TW9udGgoc3RhcnREYXkuZ2V0TW9udGgoKSk7XHJcbiAgICAgIHNldEN1cnJlbnRZZWFyKHN0YXJ0RGF5LmdldEZ1bGxZZWFyKCkpO1xyXG4gICAgICBzZXRJc09wZW4oZmFsc2UpO1xyXG4gICAgICBzZXRTaG93TWFudWFsUGlja2VyUGFuZWwoZmFsc2UpO1xyXG4gICAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcihmaWx0ZXJJZCk7XHJcbiAgICAgIHNldFNob3dNYW51YWxFcnJvcihmYWxzZSk7XHJcbiAgICB9LFxyXG4gICAgW3N0YXJ0T2ZEYXldXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlUXVpY2tGaWx0ZXIgPSB1c2VDYWxsYmFjayhcclxuICAgIChmaWx0ZXJJZDogUXVpY2tGaWx0ZXJJZCkgPT4ge1xyXG4gICAgICBjb25zdCB0b2RheSA9IHN0YXJ0T2ZEYXkobmV3IERhdGUoKSk7XHJcblxyXG4gICAgICBpZiAoZmlsdGVySWQgPT09IFwiY3VzdG9tXCIpIHtcclxuICAgICAgICAvLyBUb2dnbGUgbWFudWFsIHBhbmVsIG9uIGV2ZXJ5IERhdGUgYnV0dG9uIGNsaWNrLlxyXG4gICAgICAgIGlmIChzaG93TWFudWFsUGlja2VyUGFuZWwpIHtcclxuICAgICAgICAgIHNldFNob3dNYW51YWxFcnJvcihmYWxzZSk7XHJcbiAgICAgICAgICBzZXRIb3ZlckRhdGUobnVsbCk7XHJcbiAgICAgICAgICBzZXRTZWxlY3RpbmdTdGVwKHN0YXJ0RGF0ZSAmJiBlbmREYXRlID8gXCJkb25lXCIgOiBzdGFydERhdGUgPyBcImVuZFwiIDogXCJzdGFydFwiKTtcclxuICAgICAgICAgIHNldElzT3BlbihmYWxzZSk7XHJcbiAgICAgICAgICBzZXRTaG93TWFudWFsUGlja2VyUGFuZWwoZmFsc2UpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgbmV4dFN0YXJ0ID0gbWFudWFsU3RhcnREYXRlID8gbmV3IERhdGUobWFudWFsU3RhcnREYXRlKSA6IHN0YXJ0RGF0ZSA/IG5ldyBEYXRlKHN0YXJ0RGF0ZSkgOiBudWxsO1xyXG4gICAgICAgIGNvbnN0IG5leHRFbmQgPSBtYW51YWxFbmREYXRlID8gbmV3IERhdGUobWFudWFsRW5kRGF0ZSkgOiBlbmREYXRlID8gbmV3IERhdGUoZW5kRGF0ZSkgOiBudWxsO1xyXG4gICAgICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKFwiY3VzdG9tXCIpO1xyXG4gICAgICAgIHNldFNob3dNYW51YWxQaWNrZXJQYW5lbCh0cnVlKTtcclxuICAgICAgICBzZXRTdGFydERhdGUobmV4dFN0YXJ0KTtcclxuICAgICAgICBzZXRFbmREYXRlKG5leHRFbmQpO1xyXG5cclxuICAgICAgICBpZiAobmV4dFN0YXJ0KSB7XHJcbiAgICAgICAgICBzZXRDdXJyZW50TW9udGgobmV4dFN0YXJ0LmdldE1vbnRoKCkpO1xyXG4gICAgICAgICAgc2V0Q3VycmVudFllYXIobmV4dFN0YXJ0LmdldEZ1bGxZZWFyKCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQWx3YXlzIHJlb3BlbiB0aGUgbWFudWFsIGNhbGVuZGFyIHdoZW4gdGhlIGN1c3RvbSBkYXRlIHF1aWNrIGZpbHRlciBpcyBwcmVzc2VkLlxyXG4gICAgICAgIHNldFNlbGVjdGluZ1N0ZXAobmV4dFN0YXJ0ICYmICFuZXh0RW5kID8gXCJlbmRcIiA6IFwic3RhcnRcIik7XHJcbiAgICAgICAgc2V0SXNPcGVuKHRydWUpO1xyXG4gICAgICAgIHNldEhvdmVyRGF0ZShudWxsKTtcclxuICAgICAgICBzZXRTaG93TWFudWFsRXJyb3IoZmFsc2UpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGZpbHRlcklkID09PSBcImRheXMtN1wiKSB7XHJcbiAgICAgICAgY29uc3Qgc3RhcnQgPSBuZXcgRGF0ZSh0b2RheSk7XHJcbiAgICAgICAgc3RhcnQuc2V0RGF0ZSh0b2RheS5nZXREYXRlKCkgLSA2KTtcclxuICAgICAgICBhcHBseVF1aWNrUmFuZ2UoZmlsdGVySWQsIHN0YXJ0LCB0b2RheSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoZmlsdGVySWQgPT09IFwiZGF5cy0zMFwiKSB7XHJcbiAgICAgICAgY29uc3Qgc3RhcnQgPSBuZXcgRGF0ZSh0b2RheSk7XHJcbiAgICAgICAgc3RhcnQuc2V0RGF0ZSh0b2RheS5nZXREYXRlKCkgLSAyOSk7XHJcbiAgICAgICAgYXBwbHlRdWlja1JhbmdlKGZpbHRlcklkLCBzdGFydCwgdG9kYXkpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGZpbHRlcklkID09PSBcImRheXMtOTBcIikge1xyXG4gICAgICAgIGNvbnN0IHN0YXJ0ID0gbmV3IERhdGUodG9kYXkpO1xyXG4gICAgICAgIHN0YXJ0LnNldERhdGUodG9kYXkuZ2V0RGF0ZSgpIC0gODkpO1xyXG4gICAgICAgIGFwcGx5UXVpY2tSYW5nZShmaWx0ZXJJZCwgc3RhcnQsIHRvZGF5KTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFthcHBseVF1aWNrUmFuZ2UsIGVuZERhdGUsIG1hbnVhbEVuZERhdGUsIG1hbnVhbFN0YXJ0RGF0ZSwgc2hvd01hbnVhbFBpY2tlclBhbmVsLCBzdGFydERhdGUsIHN0YXJ0T2ZEYXldXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQ2xpZW50U2VsZWN0ZWQgPSB1c2VDYWxsYmFjaygoY2xpZW50OiBDbGllbnRPcHRpb24gfCBudWxsKSA9PiB7XHJcbiAgICBzZXRTZWxlY3RlZENsaWVudChjbGllbnQpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHN0YXJ0RGF0ZSxcclxuICAgIGVuZERhdGUsXHJcbiAgICBtYW51YWxTdGFydERhdGUsXHJcbiAgICBtYW51YWxFbmREYXRlLFxyXG4gICAgaG92ZXJEYXRlLFxyXG4gICAgc2VsZWN0aW5nU3RlcCxcclxuICAgIGN1cnJlbnRNb250aCxcclxuICAgIGN1cnJlbnRZZWFyLFxyXG4gICAgaXNPcGVuLFxyXG4gICAgc2hvd01hbnVhbFBpY2tlclBhbmVsLFxyXG4gICAgYWN0aXZlUXVpY2tGaWx0ZXIsXHJcbiAgICBzZWxlY3RlZENsaWVudCxcclxuICAgIHNlbGVjdGVkT3duZXJBeFVzZXJJZCxcclxuICAgIGNsaWVudFJlc2V0S2V5LFxyXG4gICAgc2hvd0ZpbHRlcnMsXHJcbiAgICBzaG93TWFudWFsRXJyb3IsXHJcbiAgICBmcm9tRGF0ZVZhbHVlLFxyXG4gICAgdG9EYXRlVmFsdWUsXHJcbiAgICBhY2NvdW50TnVtVmFsdWUsXHJcbiAgICBoYXNSZXN0b3JlZEZpbHRlclJlZixcclxuICAgIGRpZEluaXRGaWx0ZXJSZWYsXHJcbiAgICBzZXRTdGFydERhdGUsXHJcbiAgICBzZXRFbmREYXRlLFxyXG4gICAgc2V0TWFudWFsU3RhcnREYXRlLFxyXG4gICAgc2V0TWFudWFsRW5kRGF0ZSxcclxuICAgIHNldEhvdmVyRGF0ZSxcclxuICAgIHNldFNlbGVjdGluZ1N0ZXAsXHJcbiAgICBzZXRDdXJyZW50TW9udGgsXHJcbiAgICBzZXRDdXJyZW50WWVhcixcclxuICAgIHNldElzT3BlbixcclxuICAgIHNldFNob3dNYW51YWxQaWNrZXJQYW5lbCxcclxuICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyLFxyXG4gICAgc2V0U2VsZWN0ZWRDbGllbnQsXHJcbiAgICBzZXRTZWxlY3RlZE93bmVyQXhVc2VySWQsXHJcbiAgICBzZXRDbGllbnRSZXNldEtleSxcclxuICAgIHNldFNob3dGaWx0ZXJzLFxyXG4gICAgc2V0U2hvd01hbnVhbEVycm9yLFxyXG4gICAgdmFsaWRhdGVNYW51YWxSYW5nZSxcclxuICAgIGFwcGx5RGVmYXVsdFJhbmdlRnJvbVByb3BzLFxyXG4gICAgcmVzZXRIaXN0b3J5RmlsdGVycyxcclxuICAgIGFwcGx5Q2FjaGVkRmlsdGVyLFxyXG4gICAgaGFuZGxlU2VsZWN0LFxyXG4gICAgaGFuZGxlQ2xlYXJTdGF0ZSxcclxuICAgIG9wZW5Qb3BvdmVyLFxyXG4gICAgaGFuZGxlQWN0aXZhdG9yS2V5RG93bixcclxuICAgIGhhbmRsZVNlY3Rpb25LZXlEb3duLFxyXG4gICAgaGFuZGxlUXVpY2tGaWx0ZXIsXHJcbiAgICBoYW5kbGVDbGllbnRTZWxlY3RlZCxcclxuICB9O1xyXG59O1xyXG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBQUEsaUJBQXVDOzs7QUNBdkMsbUJBQStCOzs7QUNHeEIsSUFBTSxrQ0FBa0M7QUFFL0MsSUFBTSxrQkFBa0IsQ0FBQyxVQUEyQixPQUFPLFNBQVMsRUFBRSxFQUFFLEtBQUs7QUFHdEUsSUFBTSw0QkFBNEIsQ0FBQyxNQUFlLFVBQTRCO0FBQ25GLFFBQU0saUJBQWlCLHVCQUF1QixJQUFJO0FBQ2xELFFBQU0sa0JBQWtCLHVCQUF1QixLQUFLO0FBQ3BELFNBQU8sQ0FBQyxDQUFDLGtCQUFrQixtQkFBbUI7QUFDaEQ7QUFHTyxJQUFNLHlDQUF5QyxDQUNwRCxPQUNBLG9CQUNzQztBQUN0QyxRQUFNLG9CQUFvQixnQkFBZ0IsZUFBZTtBQUN6RCxRQUFNLGtCQUFrQixNQUFNLFFBQVEsS0FBSyxJQUFJLFFBQVEsQ0FBQztBQUN4RCxNQUFJLENBQUMsa0JBQW1CLFFBQU87QUFDL0IsTUFBSSxnQkFBZ0IsS0FBSyxDQUFDLFVBQVUsMEJBQTBCLE1BQU0sVUFBVSxpQkFBaUIsQ0FBQyxHQUFHO0FBQ2pHLFdBQU87QUFBQSxFQUNUO0FBRUEsU0FBTztBQUFBLElBQ0w7QUFBQSxNQUNFLE9BQU87QUFBQSxNQUNQLFVBQVU7QUFBQSxNQUNWLFdBQVc7QUFBQSxNQUNYLE1BQU07QUFBQSxNQUNOLFFBQVE7QUFBQSxNQUNSLGdCQUFnQjtBQUFBLE1B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QUFlLHNCQUFzQjtBQUM3RCxNQUFJLENBQUMsT0FBUTtBQUNiLG1CQUFpQixNQUFNO0FBQ3pCO0FBRUEsdUJBQXVCLEtBQUs7QUFFNUIsSUFBTyxzQkFBUTsiLAogICJuYW1lcyI6IFsiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgIlJlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfcmVhY3QiLCAibG9nSGlzdG9yeSIsICJ0b0lTTyIsICJpc0JlZm9yZSIsICJmb3JtYXRNb250aExhYmVsIiwgImltcG9ydF9yZWFjdCIsICJub3JtYWxpemVSYW5nZSIsICJpbXBvcnRfcmVhY3QiLCAibG9nSGlzdG9yeSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJsb2dIaXN0b3J5IiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAibG9nSGlzdG9yeSIsICJ0b1RpdGxlQ2FzZSIsICJmb3JtYXREYXRlUGFydHMiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJub3JtYWxpemVSYW5nZSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImxvZ0hpc3RvcnkiLCAicGFyc2VEYXRlVmFsdWUiLCAicGFyc2VJU08iLCAidG9JU08iLCAic3RhcnRPZkRheSIsICJpc0JlZm9yZSIsICJuZXdTdGFydCIsICJpbXBvcnRfanN4X3J1bnRpbWUiXQp9Cg==
