import {
  ActionButton_default,
  FilterButton_default,
  HistoryManualDatePicker_default
} from "./chunk-IE7PMQKQ.js";
import {
  DEFAULT_EXPENSE_STATUS_FILTER
} from "./chunk-2BH5SUTF.js";
import {
  SelectCombobox_default
} from "./chunk-WNGAZ2I2.js";
import {
  safeText,
  startOfDay,
  toIsoDate
} from "./chunk-UNKHH33H.js";
import {
  classNames
} from "./chunk-EGSPAV7B.js";
import {
  require_jsx_runtime,
  require_react
} from "./chunk-2NKOKBT5.js";
import {
  indT
} from "./chunk-63VW7TTG.js";
import {
  __toESM
} from "./chunk-W7NC74ZX.js";

// Web/wwwroot/react/src/pages/gastos/utils/expensePayloadBuilders.ts
var DEFAULT_SUGGEST_PAGE_SIZE = 50;
var ALLOWED_TICKET_GASTO_TYPES = /* @__PURE__ */ new Set([0, 1, 2, 3, 4, 5, 6, 7, 8, 14]);
var isValidExpenseSheetStatus = (value) => {
  return Number.isInteger(value) && Number(value) >= 0 && Number(value) <= 4;
};
var resolveExpenseSheetStatus = (statusFilter) => {
  if (statusFilter === DEFAULT_EXPENSE_STATUS_FILTER) {
    return null;
  }
  if (!isValidExpenseSheetStatus(statusFilter)) {
    return null;
  }
  return statusFilter;
};
var normalizeOptionalText = (value) => {
  const trimmed = String(value || "").trim();
  return trimmed ? trimmed : void 0;
};
var resolveProcessedByAiFilter = (value) => {
  if (value === "yes") {
    return true;
  }
  if (value === "no") {
    return false;
  }
  return null;
};
var resolveTicketStatusFilter = (value) => {
  return value === 0 || value === 1 ? value : null;
};
var resolveTicketGastoTypeFilter = (value) => {
  if (value === "" || value === null || value === void 0) {
    return null;
  }
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || !ALLOWED_TICKET_GASTO_TYPES.has(parsed)) {
    return null;
  }
  return parsed;
};
var buildExpenseTicketFilterPayload = (filters) => {
  const safeFilterKey = normalizeOptionalText(filters.filterKey);
  return {
    createdDateFrom: normalizeOptionalText(filters.fromDate),
    createdDateTo: normalizeOptionalText(filters.toDate),
    searchKey: safeFilterKey,
    filter: safeFilterKey,
    currencyCode: normalizeOptionalText(filters.currencyCode),
    gastoType: resolveTicketGastoTypeFilter(filters.gastoTypeFilter),
    processedByAI: resolveProcessedByAiFilter(filters.processedByIaFilter)
  };
};
var buildExpenseListPayload = (filters, page, pageSize) => {
  const nextPage = Number.isFinite(page) && page > 0 ? page : 1;
  const nextPageSize = Number.isFinite(pageSize) && pageSize > 0 ? pageSize : DEFAULT_SUGGEST_PAGE_SIZE;
  const safeFilter = String(filters.filter || filters.hojaGastosId || "").trim();
  return {
    filter: safeFilter || "",
    billedMode: 2,
    createdDateFrom: normalizeOptionalText(filters.fromDate),
    createdDateTo: normalizeOptionalText(filters.toDate),
    projId: normalizeOptionalText(filters.projectId),
    currencyCode: normalizeOptionalText(filters.currencyCode),
    expenseSheetStatus: resolveExpenseSheetStatus(filters.statusFilter),
    includeSubordinates: filters.includeSubordinates === true,
    page: nextPage,
    pageSize: nextPageSize
  };
};
var buildExpenseSheetSuggestPayload = (term, pageSize = DEFAULT_SUGGEST_PAGE_SIZE, page = 1, includeSubordinates = false) => {
  const safeTerm = String(term || "").trim();
  const nextPageSize = Number.isFinite(pageSize) && pageSize > 0 ? pageSize : DEFAULT_SUGGEST_PAGE_SIZE;
  const nextPage = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
  return {
    filter: safeTerm || "",
    billedMode: 2,
    createdDateFrom: void 0,
    createdDateTo: void 0,
    projId: void 0,
    currencyCode: void 0,
    includeSubordinates: includeSubordinates === true,
    page: nextPage,
    pageSize: nextPageSize
  };
};
var buildExpenseTicketListPayload = (filters, page, pageSize) => {
  const nextPage = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
  const nextPageSize = Number.isFinite(pageSize) && pageSize > 0 ? Math.floor(pageSize) : DEFAULT_SUGGEST_PAGE_SIZE;
  return {
    page: nextPage,
    pageSize: nextPageSize,
    ...buildExpenseTicketFilterPayload(filters),
    status: resolveTicketStatusFilter(filters.statusFilter)
  };
};
var buildExpenseTicketLinkListPayload = (filters, page, pageSize) => {
  const nextPage = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
  const nextPageSize = Number.isFinite(pageSize) && pageSize > 0 ? Math.floor(pageSize) : DEFAULT_SUGGEST_PAGE_SIZE;
  return {
    page: nextPage,
    pageSize: nextPageSize,
    ...buildExpenseTicketFilterPayload(filters)
  };
};
var buildExpenseTicketLinkBulkFilters = (filters) => {
  return buildExpenseTicketFilterPayload(filters);
};

// Web/wwwroot/react/src/pages/gastos/utils/expenseHistoryNavigation.ts
var isExpenseHistoryBackForwardNavigation = () => {
  if (typeof window === "undefined" || typeof performance === "undefined") {
    return false;
  }
  if (typeof performance.getEntriesByType !== "function") {
    return false;
  }
  const navigationEntries = performance.getEntriesByType("navigation");
  const navigationEntry = navigationEntries[0];
  return navigationEntry?.type === "back_forward";
};
var normalizePathname = (value) => {
  return String(value || "").trim().toLowerCase();
};
var hasExpenseReturnReferrer = (expectedPaths) => {
  if (typeof document === "undefined" || typeof window === "undefined") {
    return false;
  }
  const rawReferrer = String(document.referrer || "").trim();
  if (!rawReferrer) return false;
  try {
    const referrerUrl = new URL(rawReferrer, window.location.origin);
    const referrerPath = normalizePathname(referrerUrl.pathname);
    return expectedPaths.some((path) => normalizePathname(path) === referrerPath);
  } catch {
    return false;
  }
};

// Web/wwwroot/react/src/pages/gastos/components/ExpenseDateRangeFilter.tsx
var import_react = __toESM(require_react());

// Web/wwwroot/react/src/pages/gastos/utils/expenseDateRangeUtils.ts
var pad = (value) => value.toString().padStart(2, "0");
var toIsoDateRangeValue = (date) => {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};
var parseIsoDateRangeValue = (value) => {
  if (!value) return null;
  const trimmed = String(value).trim();
  if (!trimmed) return null;
  const datePart = trimmed.split("T")[0].split(" ")[0];
  if (!/^\d{4}-\d{2}-\d{2}$/.test(datePart)) return null;
  const [year, month, day] = datePart.split("-").map(Number);
  return new Date(year, month - 1, day);
};
var isSameDay = (a, b) => {
  return !!(a && b && a.getTime() === b.getTime());
};
var isBeforeDay = (a, b) => {
  return !!(a && b && a.getTime() < b.getTime());
};
var focusDateRangeSection = (container, section) => {
  if (!container) return;
  const target = container.querySelector(`[data-section="${section}"]`);
  if (!target) return;
  window.requestAnimationFrame(() => target.focus());
};
var toTitleCase = (value, locale) => {
  if (!value) return "";
  const lower = value.toLocaleLowerCase(locale);
  return lower[0].toLocaleUpperCase(locale) + lower.slice(1);
};
var toSentenceCase = (value, locale) => {
  if (!value) return "";
  const trimmed = value.trim();
  if (!trimmed) return trimmed;
  const lower = trimmed.toLocaleLowerCase(locale);
  return lower[0].toLocaleUpperCase(locale) + lower.slice(1);
};
var formatDateRangeDisplay = (date, locale) => {
  return date.toLocaleDateString(locale, {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).replace(/\./g, "").toLowerCase();
};
var formatMonthLabel = (date, locale) => {
  const monthName = date.toLocaleDateString(locale, { month: "long" });
  return `${toTitleCase(monthName, locale)} ${date.getFullYear()}`;
};
var resolveUiLocale = () => {
  const fromHtml = typeof document !== "undefined" ? document.documentElement.lang : "";
  return fromHtml && String(fromHtml).trim() ? fromHtml : "es-ES";
};
var buildCalendarMonth = (year, month, locale) => {
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const offset = (firstDay.getDay() + 6) % 7;
  const cells = [];
  for (let index = 0; index < offset; index += 1) {
    cells.push({ date: null, iso: "", isEmpty: true });
  }
  for (let day = 1; day <= daysInMonth; day += 1) {
    const dateObj = new Date(year, month, day);
    cells.push({ date: dateObj, iso: toIsoDateRangeValue(dateObj), isEmpty: false });
  }
  return {
    monthLabel: formatMonthLabel(firstDay, locale),
    cells
  };
};
var buildDateRangeDayCells = (cells, startDate, endDate, hoverDate, selectingStep) => {
  const previewEnd = endDate || (selectingStep === "end" ? hoverDate : null);
  return cells.map((cell, index) => {
    if (cell.isEmpty || !cell.date) {
      return { key: `empty-${index}`, isEmpty: true };
    }
    const dateObj = cell.date;
    const isStart = isSameDay(dateObj, startDate);
    const isEnd = isSameDay(dateObj, endDate);
    const inRange = startDate && previewEnd && isBeforeDay(startDate, dateObj) && isBeforeDay(dateObj, previewEnd);
    const hoverRange = startDate && !endDate && hoverDate && isBeforeDay(startDate, dateObj) && isBeforeDay(dateObj, hoverDate);
    const disabled = selectingStep === "end" && !!startDate && isBeforeDay(dateObj, startDate);
    const isToday = isSameDay(dateObj, /* @__PURE__ */ new Date());
    return {
      key: cell.iso,
      isEmpty: false,
      date: dateObj,
      iso: cell.iso,
      dayLabel: dateObj.getDate(),
      dayClass: classNames(
        "drp-day",
        isStart ? "start range-start" : "",
        isEnd ? "end range-end" : "",
        inRange ? "in-range" : "",
        hoverRange ? "hover-range" : "",
        disabled ? "disabled" : "",
        isToday ? "today" : ""
      ),
      disabled
    };
  });
};

// Web/wwwroot/react/src/pages/gastos/components/ExpenseDateRangeFilter.tsx
var import_jsx_runtime = __toESM(require_jsx_runtime());
var ExpenseDateRangeFilter = ({
  fromDate,
  toDate,
  onChange,
  onRangeComplete,
  autoOpenRequestId = 0,
  showManualError = false,
  showStartError = false,
  showEndError = false
}) => {
  const locale = (0, import_react.useMemo)(() => resolveUiLocale(), []);
  const activatorRef = (0, import_react.useRef)(null);
  const popoverRef = (0, import_react.useRef)(null);
  const [startDate, setStartDate] = (0, import_react.useState)(() => parseIsoDateRangeValue(fromDate));
  const [endDate, setEndDate] = (0, import_react.useState)(() => parseIsoDateRangeValue(toDate));
  const [hoverDate, setHoverDate] = (0, import_react.useState)(null);
  const [selectingStep, setSelectingStep] = (0, import_react.useState)("start");
  const [isOpen, setIsOpen] = (0, import_react.useState)(false);
  const now = (0, import_react.useMemo)(() => /* @__PURE__ */ new Date(), []);
  const [currentMonth, setCurrentMonth] = (0, import_react.useState)((parseIsoDateRangeValue(fromDate) || now).getMonth());
  const [currentYear, setCurrentYear] = (0, import_react.useState)((parseIsoDateRangeValue(fromDate) || now).getFullYear());
  (0, import_react.useEffect)(() => {
    setStartDate(parseIsoDateRangeValue(fromDate));
  }, [fromDate]);
  (0, import_react.useEffect)(() => {
    setEndDate(parseIsoDateRangeValue(toDate));
  }, [toDate]);
  (0, import_react.useEffect)(() => {
    onChange(startDate ? toIsoDateRangeValue(startDate) : "", endDate ? toIsoDateRangeValue(endDate) : "");
  }, [startDate, endDate, onChange]);
  (0, import_react.useEffect)(() => {
    if (!isOpen) return;
    const handleOutside = (event) => {
      const target = event.target;
      if (!target) return;
      if (popoverRef.current?.contains(target)) return;
      if (activatorRef.current?.contains(target)) return;
      setIsOpen(false);
      setHoverDate(null);
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [isOpen]);
  const openPopover = (0, import_react.useCallback)(
    (section) => {
      setSelectingStep(section);
      setIsOpen(true);
      setHoverDate(null);
      const base = section === "start" ? startDate || endDate || now : endDate || startDate || now;
      setCurrentMonth(base.getMonth());
      setCurrentYear(base.getFullYear());
    },
    [endDate, now, startDate]
  );
  (0, import_react.useEffect)(() => {
    if (autoOpenRequestId <= 0) return;
    setSelectingStep("start");
    setIsOpen(true);
    setHoverDate(null);
    const base = startDate || endDate || now;
    setCurrentMonth(base.getMonth());
    setCurrentYear(base.getFullYear());
  }, [autoOpenRequestId]);
  const onActivatorKeyDown = (0, import_react.useCallback)(
    (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      openPopover("start");
    },
    [openPopover]
  );
  const onSectionKeyDown = (0, import_react.useCallback)(
    (event, section) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      openPopover(section);
    },
    [openPopover]
  );
  const onClear = (0, import_react.useCallback)((event) => {
    event.preventDefault();
    event.stopPropagation();
    setStartDate(null);
    setEndDate(null);
    setHoverDate(null);
    setSelectingStep("start");
  }, []);
  const onPrevMonth = (0, import_react.useCallback)((event) => {
    event.stopPropagation();
    setCurrentMonth((previous) => {
      const next = previous - 1;
      if (next < 0) {
        setCurrentYear((year) => year - 1);
        return 11;
      }
      return next;
    });
  }, []);
  const onNextMonth = (0, import_react.useCallback)((event) => {
    event.stopPropagation();
    setCurrentMonth((previous) => {
      const next = previous + 1;
      if (next > 11) {
        setCurrentYear((year) => year + 1);
        return 0;
      }
      return next;
    });
  }, []);
  const onDayClick = (0, import_react.useCallback)(
    (day) => {
      if (!day.date || day.disabled) return;
      const nextDate = new Date(day.date.getFullYear(), day.date.getMonth(), day.date.getDate());
      if (!startDate || selectingStep === "start") {
        setStartDate(nextDate);
        if (endDate && isBeforeDay(endDate, nextDate)) {
          setEndDate(null);
        }
        setSelectingStep("end");
        setCurrentMonth(nextDate.getMonth());
        setCurrentYear(nextDate.getFullYear());
        focusDateRangeSection(activatorRef.current, "end");
        return;
      }
      if (selectingStep === "end") {
        let finalStart = startDate;
        let finalEnd = nextDate;
        if (isBeforeDay(nextDate, startDate)) {
          finalStart = nextDate;
          finalEnd = startDate;
          setEndDate(finalEnd);
          setStartDate(finalStart);
        } else {
          setEndDate(finalEnd);
        }
        onRangeComplete?.(toIsoDateRangeValue(finalStart), toIsoDateRangeValue(finalEnd));
        setSelectingStep("done");
        setIsOpen(false);
        setHoverDate(null);
      }
    },
    [endDate, onRangeComplete, selectingStep, startDate]
  );
  const onDayHover = (0, import_react.useCallback)(
    (day) => {
      if (!day.date || selectingStep !== "end" || !startDate) return;
      setHoverDate(new Date(day.date.getFullYear(), day.date.getMonth(), day.date.getDate()));
    },
    [selectingStep, startDate]
  );
  const onGridMouseLeave = (0, import_react.useCallback)(() => {
    setHoverDate(null);
  }, []);
  const calendar = (0, import_react.useMemo)(() => {
    return buildCalendarMonth(currentYear, currentMonth, locale);
  }, [currentMonth, currentYear, locale]);
  const dayCells = (0, import_react.useMemo)(
    () => buildDateRangeDayCells(calendar.cells, startDate, endDate, hoverDate, selectingStep),
    [calendar.cells, endDate, hoverDate, selectingStep, startDate]
  );
  const labelFrom = toSentenceCase(indT("History_From", "From"), locale);
  const labelTo = toSentenceCase(indT("History_To", "To"), locale);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    HistoryManualDatePicker_default,
    {
      activatorRef,
      popoverRef,
      showManualError,
      showStartError,
      showEndError,
      filterTitle: indT("History_Filter_Date", "Date"),
      isOpen,
      selectingStep,
      labelFrom,
      labelTo,
      startDateText: startDate ? formatDateRangeDisplay(startDate, locale) : indT("History_AddDate", "Add date"),
      endDateText: endDate ? formatDateRangeDisplay(endDate, locale) : indT("History_AddDate", "Add date"),
      clearRangeLabel: indT("History_ClearRange", "Clear range"),
      hasSelectedRange: !!startDate || !!endDate,
      monthLabel: calendar.monthLabel,
      weekDayLabels: [
        indT("History_Day_Mon", "Mon"),
        indT("History_Day_Tue", "Tue"),
        indT("History_Day_Wed", "Wed"),
        indT("History_Day_Thu", "Thu"),
        indT("History_Day_Fri", "Fri"),
        indT("History_Day_Sat", "Sat"),
        indT("History_Day_Sun", "Sun")
      ],
      statusText: selectingStep === "start" ? indT("History_Status_SelectStart", "Select start date") : indT("History_Status_SelectEnd", "Select end date"),
      dayCells,
      prevMonthLabel: indT("History_PrevMonth", "Previous month"),
      nextMonthLabel: indT("History_NextMonth", "Next month"),
      onOpenPopover: openPopover,
      onActivatorKeyDown,
      onSectionKeyDown,
      onClear,
      onPrevMonth,
      onNextMonth,
      onGridMouseLeave,
      onDayClick,
      onDayHover
    }
  );
};
var ExpenseDateRangeFilter_default = ExpenseDateRangeFilter;

// Web/wwwroot/react/src/pages/gastos/components/ExpenseFilterActions.tsx
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var ExpenseFilterActions = ({
  clearLabel,
  applyLabel,
  onClear,
  onApply
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "mt-1 grid grid-cols-2 gap-2 history-filter-actions", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ActionButton_default, { label: clearLabel, className: "w-full", onClick: onClear }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ActionButton_default, { label: applyLabel, className: "w-full", onClick: onApply })
  ] });
};
var ExpenseFilterActions_default = ExpenseFilterActions;

// Web/wwwroot/react/src/pages/gastos/components/ExpenseManagedUserFilterSelect.tsx
var import_react2 = __toESM(require_react());
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
var toOptionText = (user) => {
  const axUserId = String(user.axUserId || "").trim();
  const name = String(user.name || "").trim();
  if (!axUserId) return "";
  if (!name || name.toUpperCase() === axUserId.toUpperCase()) {
    return axUserId;
  }
  return `${axUserId} - ${name}`;
};
var ExpenseManagedUserFilterSelect = ({
  label,
  placeholder,
  value,
  users,
  allOption = null,
  onChange,
  readOnly = false,
  disabled = false,
  showLabel = true,
  clearOnEmptyInput = false
}) => {
  const options = (0, import_react2.useMemo)(() => {
    const userOptions = (Array.isArray(users) ? users : []).map((entry) => {
      const axUserId = String(entry.axUserId || "").trim();
      const label2 = toOptionText(entry);
      if (!axUserId || !label2) return null;
      return {
        value: axUserId,
        text: label2
      };
    }).filter((entry) => !!entry);
    return allOption ? [allOption, ...userOptions] : userOptions;
  }, [allOption, users]);
  const selectedTextMode = allOption && value === allOption.value ? "text" : "value";
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    SelectCombobox_default,
    {
      label,
      placeholder,
      options,
      value,
      onChange,
      readOnly,
      disabled,
      idBase: "expense-managed-user-filter",
      portalClassName: "visitas-typography",
      panelClassName: "visitas-typography",
      allowTextInput: true,
      selectedTextMode,
      showLabel,
      clearOnEmptyInput
    }
  );
};
var ExpenseManagedUserFilterSelect_default = ExpenseManagedUserFilterSelect;

// Web/wwwroot/react/src/pages/gastos/components/ExpenseQuickDateFilters.tsx
var import_jsx_runtime4 = __toESM(require_jsx_runtime());
var ExpenseQuickDateFilters = ({ activeQuickFilter, onQuickFilterChange }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "grid grid-cols-2 gap-2 history-quick-filters", "aria-label": indT("History_Filter_Date", "Date"), children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      FilterButton_default,
      {
        label: indT("History_Quick_Custom", "Date"),
        active: activeQuickFilter === "custom",
        className: "w-full",
        onClick: () => onQuickFilterChange("custom")
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      FilterButton_default,
      {
        label: indT("History_Quick_7Days", "7 days"),
        active: activeQuickFilter === "days-7",
        className: "w-full",
        onClick: () => onQuickFilterChange("days-7")
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      FilterButton_default,
      {
        label: indT("History_Quick_30Days", "30 days"),
        active: activeQuickFilter === "days-30",
        className: "w-full",
        onClick: () => onQuickFilterChange("days-30")
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      FilterButton_default,
      {
        label: indT("History_Quick_90Days", "90 days"),
        active: activeQuickFilter === "days-90",
        className: "w-full",
        onClick: () => onQuickFilterChange("days-90")
      }
    )
  ] });
};
var ExpenseQuickDateFilters_default = ExpenseQuickDateFilters;

// Web/wwwroot/react/src/pages/gastos/utils/expenseQuickDateFilterState.ts
var QUICK_DATE_FILTER_RANGES = [
  { id: "days-7", daysToSubtract: 6 },
  { id: "days-30", daysToSubtract: 29 },
  { id: "days-90", daysToSubtract: 89 }
];
var resolveExpenseQuickDateFilterFromRange = (fromDate, toDate) => {
  const normalizedFromDate = safeText(fromDate);
  const normalizedToDate = safeText(toDate);
  if (!normalizedFromDate || !normalizedToDate) {
    return null;
  }
  const today = startOfDay(/* @__PURE__ */ new Date());
  if (normalizedToDate !== toIsoDate(today)) {
    return null;
  }
  for (const entry of QUICK_DATE_FILTER_RANGES) {
    const candidateFromDate = new Date(today);
    candidateFromDate.setDate(today.getDate() - entry.daysToSubtract);
    if (normalizedFromDate === toIsoDate(candidateFromDate)) {
      return entry.id;
    }
  }
  return null;
};

export {
  ExpenseDateRangeFilter_default,
  ExpenseFilterActions_default,
  ExpenseManagedUserFilterSelect_default,
  ExpenseQuickDateFilters_default,
  buildExpenseListPayload,
  buildExpenseSheetSuggestPayload,
  buildExpenseTicketListPayload,
  buildExpenseTicketLinkListPayload,
  buildExpenseTicketLinkBulkFilters,
  resolveExpenseQuickDateFilterFromRange,
  isExpenseHistoryBackForwardNavigation,
  hasExpenseReturnReferrer
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy91dGlscy9leHBlbnNlUGF5bG9hZEJ1aWxkZXJzLnRzIiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdXRpbHMvZXhwZW5zZUhpc3RvcnlOYXZpZ2F0aW9uLnRzIiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlRGF0ZVJhbmdlRmlsdGVyLnRzeCIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3V0aWxzL2V4cGVuc2VEYXRlUmFuZ2VVdGlscy50cyIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbXBvbmVudHMvRXhwZW5zZUZpbHRlckFjdGlvbnMudHN4IiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlTWFuYWdlZFVzZXJGaWx0ZXJTZWxlY3QudHN4IiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlUXVpY2tEYXRlRmlsdGVycy50c3giLCAiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy91dGlscy9leHBlbnNlUXVpY2tEYXRlRmlsdGVyU3RhdGUudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB0eXBlIHtcclxuICBFeHBlbnNlU2hlZXRMaXN0QXBpUmVxdWVzdCxcclxuICBFeHBlbnNlU2hlZXRUaWNrZXRMaW5rQnVsa0ZpbHRlcnMsXHJcbiAgRXhwZW5zZVNoZWV0VGlja2V0TGlua0xpc3RSZXF1ZXN0LFxyXG4gIEV4cGVuc2VTaGVldExpc3RGaWx0ZXJzLFxyXG4gIEV4cGVuc2VTaGVldFRpY2tldExpc3RSZXF1ZXN0LFxyXG59IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcclxuaW1wb3J0IHsgREVGQVVMVF9FWFBFTlNFX1NUQVRVU19GSUxURVIgfSBmcm9tIFwiLi4vY29uc3RhbnRzL2V4cGVuc2VTdGF0dXNDYXRhbG9nLnRzXCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCB9IGZyb20gXCIuLi90aWNrZXRzL2V4cGVuc2VUaWNrZXRMaXN0VHlwZXMudHNcIjtcclxuXHJcbmNvbnN0IERFRkFVTFRfU1VHR0VTVF9QQUdFX1NJWkUgPSA1MDtcclxuY29uc3QgQUxMT1dFRF9USUNLRVRfR0FTVE9fVFlQRVMgPSBuZXcgU2V0PG51bWJlcj4oWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDE0XSk7XHJcblxyXG5jb25zdCBpc1ZhbGlkRXhwZW5zZVNoZWV0U3RhdHVzID0gKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgbnVtYmVyID0+IHtcclxuICByZXR1cm4gTnVtYmVyLmlzSW50ZWdlcih2YWx1ZSkgJiYgTnVtYmVyKHZhbHVlKSA+PSAwICYmIE51bWJlcih2YWx1ZSkgPD0gNDtcclxufTtcclxuXHJcbi8vIFJlc29sdmVzIHRoZSBvcHRpb25hbCBBUEkgc3RhdHVzIGZpbHRlciBmcm9tIFVJIGZpbHRlciBzdGF0ZS5cclxuY29uc3QgcmVzb2x2ZUV4cGVuc2VTaGVldFN0YXR1cyA9IChzdGF0dXNGaWx0ZXI6IG51bWJlcik6IG51bWJlciB8IG51bGwgPT4ge1xyXG4gIGlmIChzdGF0dXNGaWx0ZXIgPT09IERFRkFVTFRfRVhQRU5TRV9TVEFUVVNfRklMVEVSKSB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIGlmICghaXNWYWxpZEV4cGVuc2VTaGVldFN0YXR1cyhzdGF0dXNGaWx0ZXIpKSB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIHJldHVybiBzdGF0dXNGaWx0ZXI7XHJcbn07XHJcblxyXG5jb25zdCBub3JtYWxpemVPcHRpb25hbFRleHQgPSAodmFsdWU6IHN0cmluZyB8IHVuZGVmaW5lZCk6IHN0cmluZyB8IHVuZGVmaW5lZCA9PiB7XHJcbiAgY29uc3QgdHJpbW1lZCA9IFN0cmluZyh2YWx1ZSB8fCBcIlwiKS50cmltKCk7XHJcbiAgcmV0dXJuIHRyaW1tZWQgPyB0cmltbWVkIDogdW5kZWZpbmVkO1xyXG59O1xyXG5cclxuY29uc3QgcmVzb2x2ZVByb2Nlc3NlZEJ5QWlGaWx0ZXIgPSAoXHJcbiAgdmFsdWU6IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3RbXCJwcm9jZXNzZWRCeUlhRmlsdGVyXCJdXHJcbik6IGJvb2xlYW4gfCBudWxsID0+IHtcclxuICBpZiAodmFsdWUgPT09IFwieWVzXCIpIHtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgaWYgKHZhbHVlID09PSBcIm5vXCIpIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIHJldHVybiBudWxsO1xyXG59O1xyXG5cclxuY29uc3QgcmVzb2x2ZVRpY2tldFN0YXR1c0ZpbHRlciA9IChcclxuICB2YWx1ZTogRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdFtcInN0YXR1c0ZpbHRlclwiXVxyXG4pOiAwIHwgMSB8IG51bGwgPT4ge1xyXG4gIHJldHVybiB2YWx1ZSA9PT0gMCB8fCB2YWx1ZSA9PT0gMSA/IHZhbHVlIDogbnVsbDtcclxufTtcclxuXHJcbmNvbnN0IHJlc29sdmVUaWNrZXRHYXN0b1R5cGVGaWx0ZXIgPSAoXHJcbiAgdmFsdWU6IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3RbXCJnYXN0b1R5cGVGaWx0ZXJcIl1cclxuKTogRXhwZW5zZVNoZWV0VGlja2V0TGlzdFJlcXVlc3RbXCJnYXN0b1R5cGVcIl0gPT4ge1xyXG4gIGlmICh2YWx1ZSA9PT0gXCJcIiB8fCB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIGNvbnN0IHBhcnNlZCA9IE51bWJlcih2YWx1ZSk7XHJcbiAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKHBhcnNlZCkgfHwgIUFMTE9XRURfVElDS0VUX0dBU1RPX1RZUEVTLmhhcyhwYXJzZWQpKSB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIHJldHVybiBwYXJzZWQgYXMgRXhwZW5zZVNoZWV0VGlja2V0TGlzdFJlcXVlc3RbXCJnYXN0b1R5cGVcIl07XHJcbn07XHJcblxyXG5jb25zdCBidWlsZEV4cGVuc2VUaWNrZXRGaWx0ZXJQYXlsb2FkID0gKFxyXG4gIGZpbHRlcnM6IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3RcclxuKTogRXhwZW5zZVNoZWV0VGlja2V0TGlua0J1bGtGaWx0ZXJzID0+IHtcclxuICBjb25zdCBzYWZlRmlsdGVyS2V5ID0gbm9ybWFsaXplT3B0aW9uYWxUZXh0KGZpbHRlcnMuZmlsdGVyS2V5KTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGNyZWF0ZWREYXRlRnJvbTogbm9ybWFsaXplT3B0aW9uYWxUZXh0KGZpbHRlcnMuZnJvbURhdGUpLFxyXG4gICAgY3JlYXRlZERhdGVUbzogbm9ybWFsaXplT3B0aW9uYWxUZXh0KGZpbHRlcnMudG9EYXRlKSxcclxuICAgIHNlYXJjaEtleTogc2FmZUZpbHRlcktleSxcclxuICAgIGZpbHRlcjogc2FmZUZpbHRlcktleSxcclxuICAgIGN1cnJlbmN5Q29kZTogbm9ybWFsaXplT3B0aW9uYWxUZXh0KGZpbHRlcnMuY3VycmVuY3lDb2RlKSxcclxuICAgIGdhc3RvVHlwZTogcmVzb2x2ZVRpY2tldEdhc3RvVHlwZUZpbHRlcihmaWx0ZXJzLmdhc3RvVHlwZUZpbHRlciksXHJcbiAgICBwcm9jZXNzZWRCeUFJOiByZXNvbHZlUHJvY2Vzc2VkQnlBaUZpbHRlcihmaWx0ZXJzLnByb2Nlc3NlZEJ5SWFGaWx0ZXIpLFxyXG4gIH07XHJcbn07XHJcblxyXG4vLyBCdWlsZCBsaXN0IHBheWxvYWQgZm9yIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvbGlzdCBmcm9tIGN1cnJlbnQgZmlsdGVyIHN0YXRlLlxyXG5leHBvcnQgY29uc3QgYnVpbGRFeHBlbnNlTGlzdFBheWxvYWQgPSAoXHJcbiAgZmlsdGVyczogRXhwZW5zZVNoZWV0TGlzdEZpbHRlcnMsXHJcbiAgcGFnZTogbnVtYmVyLFxyXG4gIHBhZ2VTaXplOiBudW1iZXJcclxuKTogRXhwZW5zZVNoZWV0TGlzdEFwaVJlcXVlc3QgPT4ge1xyXG4gIGNvbnN0IG5leHRQYWdlID0gTnVtYmVyLmlzRmluaXRlKHBhZ2UpICYmIHBhZ2UgPiAwID8gcGFnZSA6IDE7XHJcbiAgY29uc3QgbmV4dFBhZ2VTaXplID0gTnVtYmVyLmlzRmluaXRlKHBhZ2VTaXplKSAmJiBwYWdlU2l6ZSA+IDAgPyBwYWdlU2l6ZSA6IERFRkFVTFRfU1VHR0VTVF9QQUdFX1NJWkU7XHJcbiAgY29uc3Qgc2FmZUZpbHRlciA9IFN0cmluZyhmaWx0ZXJzLmZpbHRlciB8fCBmaWx0ZXJzLmhvamFHYXN0b3NJZCB8fCBcIlwiKS50cmltKCk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBmaWx0ZXI6IHNhZmVGaWx0ZXIgfHwgXCJcIixcclxuICAgIGJpbGxlZE1vZGU6IDIsXHJcbiAgICBjcmVhdGVkRGF0ZUZyb206IG5vcm1hbGl6ZU9wdGlvbmFsVGV4dChmaWx0ZXJzLmZyb21EYXRlKSxcclxuICAgIGNyZWF0ZWREYXRlVG86IG5vcm1hbGl6ZU9wdGlvbmFsVGV4dChmaWx0ZXJzLnRvRGF0ZSksXHJcbiAgICBwcm9qSWQ6IG5vcm1hbGl6ZU9wdGlvbmFsVGV4dChmaWx0ZXJzLnByb2plY3RJZCksXHJcbiAgICBjdXJyZW5jeUNvZGU6IG5vcm1hbGl6ZU9wdGlvbmFsVGV4dChmaWx0ZXJzLmN1cnJlbmN5Q29kZSksXHJcbiAgICBleHBlbnNlU2hlZXRTdGF0dXM6IHJlc29sdmVFeHBlbnNlU2hlZXRTdGF0dXMoZmlsdGVycy5zdGF0dXNGaWx0ZXIpLFxyXG4gICAgaW5jbHVkZVN1Ym9yZGluYXRlczogZmlsdGVycy5pbmNsdWRlU3Vib3JkaW5hdGVzID09PSB0cnVlLFxyXG4gICAgcGFnZTogbmV4dFBhZ2UsXHJcbiAgICBwYWdlU2l6ZTogbmV4dFBhZ2VTaXplLFxyXG4gIH07XHJcbn07XHJcblxyXG4vLyBCdWlsZCBzdWdnZXN0aW9uIHBheWxvYWQgZm9yIGV4cGVuc2Ugc2hlZXQgZHJvcGRvd24gc2VhcmNoLlxyXG5leHBvcnQgY29uc3QgYnVpbGRFeHBlbnNlU2hlZXRTdWdnZXN0UGF5bG9hZCA9IChcclxuICB0ZXJtOiBzdHJpbmcsXHJcbiAgcGFnZVNpemUgPSBERUZBVUxUX1NVR0dFU1RfUEFHRV9TSVpFLFxyXG4gIHBhZ2UgPSAxLFxyXG4gIGluY2x1ZGVTdWJvcmRpbmF0ZXMgPSBmYWxzZVxyXG4pOiBFeHBlbnNlU2hlZXRMaXN0QXBpUmVxdWVzdCA9PiB7XHJcbiAgY29uc3Qgc2FmZVRlcm0gPSBTdHJpbmcodGVybSB8fCBcIlwiKS50cmltKCk7XHJcbiAgY29uc3QgbmV4dFBhZ2VTaXplID0gTnVtYmVyLmlzRmluaXRlKHBhZ2VTaXplKSAmJiBwYWdlU2l6ZSA+IDAgPyBwYWdlU2l6ZSA6IERFRkFVTFRfU1VHR0VTVF9QQUdFX1NJWkU7XHJcbiAgY29uc3QgbmV4dFBhZ2UgPSBOdW1iZXIuaXNGaW5pdGUocGFnZSkgJiYgcGFnZSA+IDAgPyBNYXRoLmZsb29yKHBhZ2UpIDogMTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGZpbHRlcjogc2FmZVRlcm0gfHwgXCJcIixcclxuICAgIGJpbGxlZE1vZGU6IDIsXHJcbiAgICBjcmVhdGVkRGF0ZUZyb206IHVuZGVmaW5lZCxcclxuICAgIGNyZWF0ZWREYXRlVG86IHVuZGVmaW5lZCxcclxuICAgIHByb2pJZDogdW5kZWZpbmVkLFxyXG4gICAgY3VycmVuY3lDb2RlOiB1bmRlZmluZWQsXHJcbiAgICBpbmNsdWRlU3Vib3JkaW5hdGVzOiBpbmNsdWRlU3Vib3JkaW5hdGVzID09PSB0cnVlLFxyXG4gICAgcGFnZTogbmV4dFBhZ2UsXHJcbiAgICBwYWdlU2l6ZTogbmV4dFBhZ2VTaXplLFxyXG4gIH07XHJcbn07XHJcblxyXG4vLyBCdWlsZCBsaXN0IHBheWxvYWQgZm9yIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy9saXN0IGZyb20gdGlja2V0IGZpbHRlciBzdGF0ZS5cclxuZXhwb3J0IGNvbnN0IGJ1aWxkRXhwZW5zZVRpY2tldExpc3RQYXlsb2FkID0gKFxyXG4gIGZpbHRlcnM6IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QsXHJcbiAgcGFnZTogbnVtYmVyLFxyXG4gIHBhZ2VTaXplOiBudW1iZXJcclxuKTogRXhwZW5zZVNoZWV0VGlja2V0TGlzdFJlcXVlc3QgPT4ge1xyXG4gIGNvbnN0IG5leHRQYWdlID0gTnVtYmVyLmlzRmluaXRlKHBhZ2UpICYmIHBhZ2UgPiAwID8gTWF0aC5mbG9vcihwYWdlKSA6IDE7XHJcbiAgY29uc3QgbmV4dFBhZ2VTaXplID0gTnVtYmVyLmlzRmluaXRlKHBhZ2VTaXplKSAmJiBwYWdlU2l6ZSA+IDAgPyBNYXRoLmZsb29yKHBhZ2VTaXplKSA6IERFRkFVTFRfU1VHR0VTVF9QQUdFX1NJWkU7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBwYWdlOiBuZXh0UGFnZSxcclxuICAgIHBhZ2VTaXplOiBuZXh0UGFnZVNpemUsXHJcbiAgICAuLi5idWlsZEV4cGVuc2VUaWNrZXRGaWx0ZXJQYXlsb2FkKGZpbHRlcnMpLFxyXG4gICAgc3RhdHVzOiByZXNvbHZlVGlja2V0U3RhdHVzRmlsdGVyKGZpbHRlcnMuc3RhdHVzRmlsdGVyKSxcclxuICB9O1xyXG59O1xyXG5cclxuLy8gQnVpbGQgbGlzdCBwYXlsb2FkIGZvciAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMvbGluay9saXN0IGZyb20gdGlja2V0IGZpbHRlciBzdGF0ZS5cclxuZXhwb3J0IGNvbnN0IGJ1aWxkRXhwZW5zZVRpY2tldExpbmtMaXN0UGF5bG9hZCA9IChcclxuICBmaWx0ZXJzOiBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90LFxyXG4gIHBhZ2U6IG51bWJlcixcclxuICBwYWdlU2l6ZTogbnVtYmVyXHJcbik6IEV4cGVuc2VTaGVldFRpY2tldExpbmtMaXN0UmVxdWVzdCA9PiB7XHJcbiAgY29uc3QgbmV4dFBhZ2UgPSBOdW1iZXIuaXNGaW5pdGUocGFnZSkgJiYgcGFnZSA+IDAgPyBNYXRoLmZsb29yKHBhZ2UpIDogMTtcclxuICBjb25zdCBuZXh0UGFnZVNpemUgPSBOdW1iZXIuaXNGaW5pdGUocGFnZVNpemUpICYmIHBhZ2VTaXplID4gMCA/IE1hdGguZmxvb3IocGFnZVNpemUpIDogREVGQVVMVF9TVUdHRVNUX1BBR0VfU0laRTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHBhZ2U6IG5leHRQYWdlLFxyXG4gICAgcGFnZVNpemU6IG5leHRQYWdlU2l6ZSxcclxuICAgIC4uLmJ1aWxkRXhwZW5zZVRpY2tldEZpbHRlclBheWxvYWQoZmlsdGVycyksXHJcbiAgfTtcclxufTtcclxuXHJcbi8vIEJ1aWxkIGZpbHRlciBwYXlsb2FkIGZvciAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMvbGluay9idWxrIGluIGZpbHRlcmVkIG1vZGUuXHJcbmV4cG9ydCBjb25zdCBidWlsZEV4cGVuc2VUaWNrZXRMaW5rQnVsa0ZpbHRlcnMgPSAoXHJcbiAgZmlsdGVyczogRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdFxyXG4pOiBFeHBlbnNlU2hlZXRUaWNrZXRMaW5rQnVsa0ZpbHRlcnMgPT4ge1xyXG4gIHJldHVybiBidWlsZEV4cGVuc2VUaWNrZXRGaWx0ZXJQYXlsb2FkKGZpbHRlcnMpO1xyXG59O1xyXG4iLCAiLy8gRGV0ZWN0cyBicm93c2VyIGhpc3RvcnkgcmV0dXJucyB0aGF0IHJlY3JlYXRlIHRoZSBwYWdlIHdpdGhvdXQgYXBwLWxldmVsIHJldHVybiBmbGFncy5cclxuZXhwb3J0IGNvbnN0IGlzRXhwZW5zZUhpc3RvcnlCYWNrRm9yd2FyZE5hdmlnYXRpb24gPSAoKTogYm9vbGVhbiA9PiB7XHJcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIgfHwgdHlwZW9mIHBlcmZvcm1hbmNlID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBpZiAodHlwZW9mIHBlcmZvcm1hbmNlLmdldEVudHJpZXNCeVR5cGUgIT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgbmF2aWdhdGlvbkVudHJpZXMgPSBwZXJmb3JtYW5jZS5nZXRFbnRyaWVzQnlUeXBlKFwibmF2aWdhdGlvblwiKTtcclxuICBjb25zdCBuYXZpZ2F0aW9uRW50cnkgPSBuYXZpZ2F0aW9uRW50cmllc1swXSBhcyBQZXJmb3JtYW5jZU5hdmlnYXRpb25UaW1pbmcgfCB1bmRlZmluZWQ7XHJcbiAgcmV0dXJuIG5hdmlnYXRpb25FbnRyeT8udHlwZSA9PT0gXCJiYWNrX2ZvcndhcmRcIjtcclxufTtcclxuXHJcbmNvbnN0IG5vcm1hbGl6ZVBhdGhuYW1lID0gKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xyXG4gIHJldHVybiBTdHJpbmcodmFsdWUgfHwgXCJcIikudHJpbSgpLnRvTG93ZXJDYXNlKCk7XHJcbn07XHJcblxyXG4vLyBEZXRlY3RzIHdoZXRoZXIgdGhlIGN1cnJlbnQgcGFnZSB3YXMgb3BlbmVkIGZyb20gb25lIG9mIHRoZSBleHBlY3RlZCBleHBlbnNlIGRldGFpbCByb3V0ZXMuXHJcbmV4cG9ydCBjb25zdCBoYXNFeHBlbnNlUmV0dXJuUmVmZXJyZXIgPSAoZXhwZWN0ZWRQYXRoczogc3RyaW5nW10pOiBib29sZWFuID0+IHtcclxuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiIHx8IHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHJhd1JlZmVycmVyID0gU3RyaW5nKGRvY3VtZW50LnJlZmVycmVyIHx8IFwiXCIpLnRyaW0oKTtcclxuICBpZiAoIXJhd1JlZmVycmVyKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gIHRyeSB7XHJcbiAgICBjb25zdCByZWZlcnJlclVybCA9IG5ldyBVUkwocmF3UmVmZXJyZXIsIHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4pO1xyXG4gICAgY29uc3QgcmVmZXJyZXJQYXRoID0gbm9ybWFsaXplUGF0aG5hbWUocmVmZXJyZXJVcmwucGF0aG5hbWUpO1xyXG4gICAgcmV0dXJuIGV4cGVjdGVkUGF0aHMuc29tZSgocGF0aCkgPT4gbm9ybWFsaXplUGF0aG5hbWUocGF0aCkgPT09IHJlZmVycmVyUGF0aCk7XHJcbiAgfSBjYXRjaCB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG59O1xyXG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCBIaXN0b3J5TWFudWFsRGF0ZVBpY2tlciwge1xyXG4gIEhpc3RvcnlNYW51YWxEYXlDZWxsLFxyXG59IGZyb20gXCIuLi8uLi92aXNpdGFzL2hpc3RvcmlhbC9IaXN0b3J5TWFudWFsRGF0ZVBpY2tlci50c3hcIjtcclxuaW1wb3J0IHtcclxuICBidWlsZENhbGVuZGFyTW9udGgsXHJcbiAgYnVpbGREYXRlUmFuZ2VEYXlDZWxscyxcclxuICBmb2N1c0RhdGVSYW5nZVNlY3Rpb24sXHJcbiAgZm9ybWF0RGF0ZVJhbmdlRGlzcGxheSxcclxuICBpc0JlZm9yZURheSxcclxuICBwYXJzZUlzb0RhdGVSYW5nZVZhbHVlLFxyXG4gIHJlc29sdmVVaUxvY2FsZSxcclxuICB0b0lzb0RhdGVSYW5nZVZhbHVlLFxyXG4gIHRvU2VudGVuY2VDYXNlLFxyXG59IGZyb20gXCIuLi91dGlscy9leHBlbnNlRGF0ZVJhbmdlVXRpbHMudHNcIjtcclxuXHJcbnR5cGUgRXhwZW5zZURhdGVSYW5nZUZpbHRlclByb3BzID0ge1xyXG4gIGZyb21EYXRlOiBzdHJpbmc7XHJcbiAgdG9EYXRlOiBzdHJpbmc7XHJcbiAgb25DaGFuZ2U6IChmcm9tRGF0ZTogc3RyaW5nLCB0b0RhdGU6IHN0cmluZykgPT4gdm9pZDtcclxuICBvblJhbmdlQ29tcGxldGU/OiAoZnJvbURhdGU6IHN0cmluZywgdG9EYXRlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgYXV0b09wZW5SZXF1ZXN0SWQ/OiBudW1iZXI7XHJcbiAgc2hvd01hbnVhbEVycm9yPzogYm9vbGVhbjtcclxuICBzaG93U3RhcnRFcnJvcj86IGJvb2xlYW47XHJcbiAgc2hvd0VuZEVycm9yPzogYm9vbGVhbjtcclxufTtcclxuXHJcbi8vIFNoYXJlZCBkYXRlIHJhbmdlIHBpY2tlciBmb3IgZXhwZW5zZSBmaWx0ZXJzIGJhc2VkIG9uIHRoZSBoaXN0b3J5IGRhdGUgY29tcG9uZW50LlxyXG5jb25zdCBFeHBlbnNlRGF0ZVJhbmdlRmlsdGVyID0gKHtcclxuICBmcm9tRGF0ZSxcclxuICB0b0RhdGUsXHJcbiAgb25DaGFuZ2UsXHJcbiAgb25SYW5nZUNvbXBsZXRlLFxyXG4gIGF1dG9PcGVuUmVxdWVzdElkID0gMCxcclxuICBzaG93TWFudWFsRXJyb3IgPSBmYWxzZSxcclxuICBzaG93U3RhcnRFcnJvciA9IGZhbHNlLFxyXG4gIHNob3dFbmRFcnJvciA9IGZhbHNlLFxyXG59OiBFeHBlbnNlRGF0ZVJhbmdlRmlsdGVyUHJvcHMpID0+IHtcclxuICBjb25zdCBsb2NhbGUgPSB1c2VNZW1vKCgpID0+IHJlc29sdmVVaUxvY2FsZSgpLCBbXSk7XHJcbiAgY29uc3QgYWN0aXZhdG9yUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgcG9wb3ZlclJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xyXG5cclxuICBjb25zdCBbc3RhcnREYXRlLCBzZXRTdGFydERhdGVdID0gdXNlU3RhdGU8RGF0ZSB8IG51bGw+KCgpID0+IHBhcnNlSXNvRGF0ZVJhbmdlVmFsdWUoZnJvbURhdGUpKTtcclxuICBjb25zdCBbZW5kRGF0ZSwgc2V0RW5kRGF0ZV0gPSB1c2VTdGF0ZTxEYXRlIHwgbnVsbD4oKCkgPT4gcGFyc2VJc29EYXRlUmFuZ2VWYWx1ZSh0b0RhdGUpKTtcclxuICBjb25zdCBbaG92ZXJEYXRlLCBzZXRIb3ZlckRhdGVdID0gdXNlU3RhdGU8RGF0ZSB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IFtzZWxlY3RpbmdTdGVwLCBzZXRTZWxlY3RpbmdTdGVwXSA9IHVzZVN0YXRlPFwic3RhcnRcIiB8IFwiZW5kXCIgfCBcImRvbmVcIj4oXCJzdGFydFwiKTtcclxuICBjb25zdCBbaXNPcGVuLCBzZXRJc09wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xyXG5cclxuICBjb25zdCBub3cgPSB1c2VNZW1vKCgpID0+IG5ldyBEYXRlKCksIFtdKTtcclxuICBjb25zdCBbY3VycmVudE1vbnRoLCBzZXRDdXJyZW50TW9udGhdID0gdXNlU3RhdGUoKHBhcnNlSXNvRGF0ZVJhbmdlVmFsdWUoZnJvbURhdGUpIHx8IG5vdykuZ2V0TW9udGgoKSk7XHJcbiAgY29uc3QgW2N1cnJlbnRZZWFyLCBzZXRDdXJyZW50WWVhcl0gPSB1c2VTdGF0ZSgocGFyc2VJc29EYXRlUmFuZ2VWYWx1ZShmcm9tRGF0ZSkgfHwgbm93KS5nZXRGdWxsWWVhcigpKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIHNldFN0YXJ0RGF0ZShwYXJzZUlzb0RhdGVSYW5nZVZhbHVlKGZyb21EYXRlKSk7XHJcbiAgfSwgW2Zyb21EYXRlXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBzZXRFbmREYXRlKHBhcnNlSXNvRGF0ZVJhbmdlVmFsdWUodG9EYXRlKSk7XHJcbiAgfSwgW3RvRGF0ZV0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgb25DaGFuZ2Uoc3RhcnREYXRlID8gdG9Jc29EYXRlUmFuZ2VWYWx1ZShzdGFydERhdGUpIDogXCJcIiwgZW5kRGF0ZSA/IHRvSXNvRGF0ZVJhbmdlVmFsdWUoZW5kRGF0ZSkgOiBcIlwiKTtcclxuICB9LCBbc3RhcnREYXRlLCBlbmREYXRlLCBvbkNoYW5nZV0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFpc09wZW4pIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBoYW5kbGVPdXRzaWRlID0gKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XHJcbiAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldCBhcyBOb2RlIHwgbnVsbDtcclxuICAgICAgaWYgKCF0YXJnZXQpIHJldHVybjtcclxuICAgICAgaWYgKHBvcG92ZXJSZWYuY3VycmVudD8uY29udGFpbnModGFyZ2V0KSkgcmV0dXJuO1xyXG4gICAgICBpZiAoYWN0aXZhdG9yUmVmLmN1cnJlbnQ/LmNvbnRhaW5zKHRhcmdldCkpIHJldHVybjtcclxuICAgICAgc2V0SXNPcGVuKGZhbHNlKTtcclxuICAgICAgc2V0SG92ZXJEYXRlKG51bGwpO1xyXG4gICAgfTtcclxuXHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGhhbmRsZU91dHNpZGUpO1xyXG4gICAgcmV0dXJuICgpID0+IGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgaGFuZGxlT3V0c2lkZSk7XHJcbiAgfSwgW2lzT3Blbl0pO1xyXG5cclxuICBjb25zdCBvcGVuUG9wb3ZlciA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKHNlY3Rpb246IFwic3RhcnRcIiB8IFwiZW5kXCIpID0+IHtcclxuICAgICAgc2V0U2VsZWN0aW5nU3RlcChzZWN0aW9uKTtcclxuICAgICAgc2V0SXNPcGVuKHRydWUpO1xyXG4gICAgICBzZXRIb3ZlckRhdGUobnVsbCk7XHJcblxyXG4gICAgICBjb25zdCBiYXNlID0gc2VjdGlvbiA9PT0gXCJzdGFydFwiID8gc3RhcnREYXRlIHx8IGVuZERhdGUgfHwgbm93IDogZW5kRGF0ZSB8fCBzdGFydERhdGUgfHwgbm93O1xyXG4gICAgICBzZXRDdXJyZW50TW9udGgoYmFzZS5nZXRNb250aCgpKTtcclxuICAgICAgc2V0Q3VycmVudFllYXIoYmFzZS5nZXRGdWxsWWVhcigpKTtcclxuICAgIH0sXHJcbiAgICBbZW5kRGF0ZSwgbm93LCBzdGFydERhdGVdXHJcbiAgKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmIChhdXRvT3BlblJlcXVlc3RJZCA8PSAwKSByZXR1cm47XHJcbiAgICBzZXRTZWxlY3RpbmdTdGVwKFwic3RhcnRcIik7XHJcbiAgICBzZXRJc09wZW4odHJ1ZSk7XHJcbiAgICBzZXRIb3ZlckRhdGUobnVsbCk7XHJcbiAgICBjb25zdCBiYXNlID0gc3RhcnREYXRlIHx8IGVuZERhdGUgfHwgbm93O1xyXG4gICAgc2V0Q3VycmVudE1vbnRoKGJhc2UuZ2V0TW9udGgoKSk7XHJcbiAgICBzZXRDdXJyZW50WWVhcihiYXNlLmdldEZ1bGxZZWFyKCkpO1xyXG4gIH0sIFthdXRvT3BlblJlcXVlc3RJZF0pO1xyXG5cclxuICBjb25zdCBvbkFjdGl2YXRvcktleURvd24gPSB1c2VDYWxsYmFjayhcclxuICAgIChldmVudDogUmVhY3QuS2V5Ym9hcmRFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHtcclxuICAgICAgaWYgKGV2ZW50LmtleSAhPT0gXCJFbnRlclwiICYmIGV2ZW50LmtleSAhPT0gXCIgXCIpIHJldHVybjtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgb3BlblBvcG92ZXIoXCJzdGFydFwiKTtcclxuICAgIH0sXHJcbiAgICBbb3BlblBvcG92ZXJdXHJcbiAgKTtcclxuXHJcbiAgY29uc3Qgb25TZWN0aW9uS2V5RG93biA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKGV2ZW50OiBSZWFjdC5LZXlib2FyZEV2ZW50PEhUTUxEaXZFbGVtZW50Piwgc2VjdGlvbjogXCJzdGFydFwiIHwgXCJlbmRcIikgPT4ge1xyXG4gICAgICBpZiAoZXZlbnQua2V5ICE9PSBcIkVudGVyXCIgJiYgZXZlbnQua2V5ICE9PSBcIiBcIikgcmV0dXJuO1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBvcGVuUG9wb3ZlcihzZWN0aW9uKTtcclxuICAgIH0sXHJcbiAgICBbb3BlblBvcG92ZXJdXHJcbiAgKTtcclxuXHJcbiAgY29uc3Qgb25DbGVhciA9IHVzZUNhbGxiYWNrKChldmVudDogUmVhY3QuTW91c2VFdmVudCkgPT4ge1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgc2V0U3RhcnREYXRlKG51bGwpO1xyXG4gICAgc2V0RW5kRGF0ZShudWxsKTtcclxuICAgIHNldEhvdmVyRGF0ZShudWxsKTtcclxuICAgIHNldFNlbGVjdGluZ1N0ZXAoXCJzdGFydFwiKTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IG9uUHJldk1vbnRoID0gdXNlQ2FsbGJhY2soKGV2ZW50OiBSZWFjdC5Nb3VzZUV2ZW50PEhUTUxCdXR0b25FbGVtZW50PikgPT4ge1xyXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICBzZXRDdXJyZW50TW9udGgoKHByZXZpb3VzKSA9PiB7XHJcbiAgICAgIGNvbnN0IG5leHQgPSBwcmV2aW91cyAtIDE7XHJcbiAgICAgIGlmIChuZXh0IDwgMCkge1xyXG4gICAgICAgIHNldEN1cnJlbnRZZWFyKCh5ZWFyKSA9PiB5ZWFyIC0gMSk7XHJcbiAgICAgICAgcmV0dXJuIDExO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBuZXh0O1xyXG4gICAgfSk7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBvbk5leHRNb250aCA9IHVzZUNhbGxiYWNrKChldmVudDogUmVhY3QuTW91c2VFdmVudDxIVE1MQnV0dG9uRWxlbWVudD4pID0+IHtcclxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgc2V0Q3VycmVudE1vbnRoKChwcmV2aW91cykgPT4ge1xyXG4gICAgICBjb25zdCBuZXh0ID0gcHJldmlvdXMgKyAxO1xyXG4gICAgICBpZiAobmV4dCA+IDExKSB7XHJcbiAgICAgICAgc2V0Q3VycmVudFllYXIoKHllYXIpID0+IHllYXIgKyAxKTtcclxuICAgICAgICByZXR1cm4gMDtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gbmV4dDtcclxuICAgIH0pO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3Qgb25EYXlDbGljayA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKGRheTogSGlzdG9yeU1hbnVhbERheUNlbGwpID0+IHtcclxuICAgICAgaWYgKCFkYXkuZGF0ZSB8fCBkYXkuZGlzYWJsZWQpIHJldHVybjtcclxuXHJcbiAgICAgIGNvbnN0IG5leHREYXRlID0gbmV3IERhdGUoZGF5LmRhdGUuZ2V0RnVsbFllYXIoKSwgZGF5LmRhdGUuZ2V0TW9udGgoKSwgZGF5LmRhdGUuZ2V0RGF0ZSgpKTtcclxuXHJcbiAgICAgIGlmICghc3RhcnREYXRlIHx8IHNlbGVjdGluZ1N0ZXAgPT09IFwic3RhcnRcIikge1xyXG4gICAgICAgIHNldFN0YXJ0RGF0ZShuZXh0RGF0ZSk7XHJcbiAgICAgICAgaWYgKGVuZERhdGUgJiYgaXNCZWZvcmVEYXkoZW5kRGF0ZSwgbmV4dERhdGUpKSB7XHJcbiAgICAgICAgICBzZXRFbmREYXRlKG51bGwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZXRTZWxlY3RpbmdTdGVwKFwiZW5kXCIpO1xyXG4gICAgICAgIHNldEN1cnJlbnRNb250aChuZXh0RGF0ZS5nZXRNb250aCgpKTtcclxuICAgICAgICBzZXRDdXJyZW50WWVhcihuZXh0RGF0ZS5nZXRGdWxsWWVhcigpKTtcclxuICAgICAgICBmb2N1c0RhdGVSYW5nZVNlY3Rpb24oYWN0aXZhdG9yUmVmLmN1cnJlbnQsIFwiZW5kXCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHNlbGVjdGluZ1N0ZXAgPT09IFwiZW5kXCIpIHtcclxuICAgICAgICBsZXQgZmluYWxTdGFydCA9IHN0YXJ0RGF0ZTtcclxuICAgICAgICBsZXQgZmluYWxFbmQgPSBuZXh0RGF0ZTtcclxuXHJcbiAgICAgICAgaWYgKGlzQmVmb3JlRGF5KG5leHREYXRlLCBzdGFydERhdGUpKSB7XHJcbiAgICAgICAgICBmaW5hbFN0YXJ0ID0gbmV4dERhdGU7XHJcbiAgICAgICAgICBmaW5hbEVuZCA9IHN0YXJ0RGF0ZTtcclxuICAgICAgICAgIHNldEVuZERhdGUoZmluYWxFbmQpO1xyXG4gICAgICAgICAgc2V0U3RhcnREYXRlKGZpbmFsU3RhcnQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBzZXRFbmREYXRlKGZpbmFsRW5kKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9uUmFuZ2VDb21wbGV0ZT8uKHRvSXNvRGF0ZVJhbmdlVmFsdWUoZmluYWxTdGFydCksIHRvSXNvRGF0ZVJhbmdlVmFsdWUoZmluYWxFbmQpKTtcclxuICAgICAgICBzZXRTZWxlY3RpbmdTdGVwKFwiZG9uZVwiKTtcclxuICAgICAgICBzZXRJc09wZW4oZmFsc2UpO1xyXG4gICAgICAgIHNldEhvdmVyRGF0ZShudWxsKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFtlbmREYXRlLCBvblJhbmdlQ29tcGxldGUsIHNlbGVjdGluZ1N0ZXAsIHN0YXJ0RGF0ZV1cclxuICApO1xyXG5cclxuICBjb25zdCBvbkRheUhvdmVyID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoZGF5OiBIaXN0b3J5TWFudWFsRGF5Q2VsbCkgPT4ge1xyXG4gICAgICBpZiAoIWRheS5kYXRlIHx8IHNlbGVjdGluZ1N0ZXAgIT09IFwiZW5kXCIgfHwgIXN0YXJ0RGF0ZSkgcmV0dXJuO1xyXG4gICAgICBzZXRIb3ZlckRhdGUobmV3IERhdGUoZGF5LmRhdGUuZ2V0RnVsbFllYXIoKSwgZGF5LmRhdGUuZ2V0TW9udGgoKSwgZGF5LmRhdGUuZ2V0RGF0ZSgpKSk7XHJcbiAgICB9LFxyXG4gICAgW3NlbGVjdGluZ1N0ZXAsIHN0YXJ0RGF0ZV1cclxuICApO1xyXG5cclxuICBjb25zdCBvbkdyaWRNb3VzZUxlYXZlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgc2V0SG92ZXJEYXRlKG51bGwpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgY2FsZW5kYXIgPSB1c2VNZW1vKCgpID0+IHtcclxuICAgIHJldHVybiBidWlsZENhbGVuZGFyTW9udGgoY3VycmVudFllYXIsIGN1cnJlbnRNb250aCwgbG9jYWxlKTtcclxuICB9LCBbY3VycmVudE1vbnRoLCBjdXJyZW50WWVhciwgbG9jYWxlXSk7XHJcblxyXG4gIGNvbnN0IGRheUNlbGxzID0gdXNlTWVtbyhcclxuICAgICgpID0+IGJ1aWxkRGF0ZVJhbmdlRGF5Q2VsbHMoY2FsZW5kYXIuY2VsbHMsIHN0YXJ0RGF0ZSwgZW5kRGF0ZSwgaG92ZXJEYXRlLCBzZWxlY3RpbmdTdGVwKSxcclxuICAgIFtjYWxlbmRhci5jZWxscywgZW5kRGF0ZSwgaG92ZXJEYXRlLCBzZWxlY3RpbmdTdGVwLCBzdGFydERhdGVdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgbGFiZWxGcm9tID0gdG9TZW50ZW5jZUNhc2UoaW5kVChcIkhpc3RvcnlfRnJvbVwiLCBcIkZyb21cIiksIGxvY2FsZSk7XHJcbiAgY29uc3QgbGFiZWxUbyA9IHRvU2VudGVuY2VDYXNlKGluZFQoXCJIaXN0b3J5X1RvXCIsIFwiVG9cIiksIGxvY2FsZSk7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8SGlzdG9yeU1hbnVhbERhdGVQaWNrZXJcclxuICAgICAgYWN0aXZhdG9yUmVmPXthY3RpdmF0b3JSZWZ9XHJcbiAgICAgIHBvcG92ZXJSZWY9e3BvcG92ZXJSZWZ9XHJcbiAgICAgIHNob3dNYW51YWxFcnJvcj17c2hvd01hbnVhbEVycm9yfVxyXG4gICAgICBzaG93U3RhcnRFcnJvcj17c2hvd1N0YXJ0RXJyb3J9XHJcbiAgICAgIHNob3dFbmRFcnJvcj17c2hvd0VuZEVycm9yfVxyXG4gICAgICBmaWx0ZXJUaXRsZT17aW5kVChcIkhpc3RvcnlfRmlsdGVyX0RhdGVcIiwgXCJEYXRlXCIpfVxyXG4gICAgICBpc09wZW49e2lzT3Blbn1cclxuICAgICAgc2VsZWN0aW5nU3RlcD17c2VsZWN0aW5nU3RlcH1cclxuICAgICAgbGFiZWxGcm9tPXtsYWJlbEZyb219XHJcbiAgICAgIGxhYmVsVG89e2xhYmVsVG99XHJcbiAgICAgIHN0YXJ0RGF0ZVRleHQ9e3N0YXJ0RGF0ZSA/IGZvcm1hdERhdGVSYW5nZURpc3BsYXkoc3RhcnREYXRlLCBsb2NhbGUpIDogaW5kVChcIkhpc3RvcnlfQWRkRGF0ZVwiLCBcIkFkZCBkYXRlXCIpfVxyXG4gICAgICBlbmREYXRlVGV4dD17ZW5kRGF0ZSA/IGZvcm1hdERhdGVSYW5nZURpc3BsYXkoZW5kRGF0ZSwgbG9jYWxlKSA6IGluZFQoXCJIaXN0b3J5X0FkZERhdGVcIiwgXCJBZGQgZGF0ZVwiKX1cclxuICAgICAgY2xlYXJSYW5nZUxhYmVsPXtpbmRUKFwiSGlzdG9yeV9DbGVhclJhbmdlXCIsIFwiQ2xlYXIgcmFuZ2VcIil9XHJcbiAgICAgIGhhc1NlbGVjdGVkUmFuZ2U9eyEhc3RhcnREYXRlIHx8ICEhZW5kRGF0ZX1cclxuICAgICAgbW9udGhMYWJlbD17Y2FsZW5kYXIubW9udGhMYWJlbH1cclxuICAgICAgd2Vla0RheUxhYmVscz17W1xyXG4gICAgICAgIGluZFQoXCJIaXN0b3J5X0RheV9Nb25cIiwgXCJNb25cIiksXHJcbiAgICAgICAgaW5kVChcIkhpc3RvcnlfRGF5X1R1ZVwiLCBcIlR1ZVwiKSxcclxuICAgICAgICBpbmRUKFwiSGlzdG9yeV9EYXlfV2VkXCIsIFwiV2VkXCIpLFxyXG4gICAgICAgIGluZFQoXCJIaXN0b3J5X0RheV9UaHVcIiwgXCJUaHVcIiksXHJcbiAgICAgICAgaW5kVChcIkhpc3RvcnlfRGF5X0ZyaVwiLCBcIkZyaVwiKSxcclxuICAgICAgICBpbmRUKFwiSGlzdG9yeV9EYXlfU2F0XCIsIFwiU2F0XCIpLFxyXG4gICAgICAgIGluZFQoXCJIaXN0b3J5X0RheV9TdW5cIiwgXCJTdW5cIiksXHJcbiAgICAgIF19XHJcbiAgICAgIHN0YXR1c1RleHQ9e1xyXG4gICAgICAgIHNlbGVjdGluZ1N0ZXAgPT09IFwic3RhcnRcIlxyXG4gICAgICAgICAgPyBpbmRUKFwiSGlzdG9yeV9TdGF0dXNfU2VsZWN0U3RhcnRcIiwgXCJTZWxlY3Qgc3RhcnQgZGF0ZVwiKVxyXG4gICAgICAgICAgOiBpbmRUKFwiSGlzdG9yeV9TdGF0dXNfU2VsZWN0RW5kXCIsIFwiU2VsZWN0IGVuZCBkYXRlXCIpXHJcbiAgICAgIH1cclxuICAgICAgZGF5Q2VsbHM9e2RheUNlbGxzfVxyXG4gICAgICBwcmV2TW9udGhMYWJlbD17aW5kVChcIkhpc3RvcnlfUHJldk1vbnRoXCIsIFwiUHJldmlvdXMgbW9udGhcIil9XHJcbiAgICAgIG5leHRNb250aExhYmVsPXtpbmRUKFwiSGlzdG9yeV9OZXh0TW9udGhcIiwgXCJOZXh0IG1vbnRoXCIpfVxyXG4gICAgICBvbk9wZW5Qb3BvdmVyPXtvcGVuUG9wb3Zlcn1cclxuICAgICAgb25BY3RpdmF0b3JLZXlEb3duPXtvbkFjdGl2YXRvcktleURvd259XHJcbiAgICAgIG9uU2VjdGlvbktleURvd249e29uU2VjdGlvbktleURvd259XHJcbiAgICAgIG9uQ2xlYXI9e29uQ2xlYXJ9XHJcbiAgICAgIG9uUHJldk1vbnRoPXtvblByZXZNb250aH1cclxuICAgICAgb25OZXh0TW9udGg9e29uTmV4dE1vbnRofVxyXG4gICAgICBvbkdyaWRNb3VzZUxlYXZlPXtvbkdyaWRNb3VzZUxlYXZlfVxyXG4gICAgICBvbkRheUNsaWNrPXtvbkRheUNsaWNrfVxyXG4gICAgICBvbkRheUhvdmVyPXtvbkRheUhvdmVyfVxyXG4gICAgLz5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZURhdGVSYW5nZUZpbHRlcjtcclxuIiwgImltcG9ydCB7IGNsYXNzTmFtZXMgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvY2xhc3NOYW1lcy50c1wiO1xyXG5pbXBvcnQgdHlwZSB7IEhpc3RvcnlNYW51YWxEYXlDZWxsIH0gZnJvbSBcIi4uLy4uL3Zpc2l0YXMvaGlzdG9yaWFsL0hpc3RvcnlNYW51YWxEYXRlUGlja2VyLnRzeFwiO1xyXG5cclxuZXhwb3J0IHR5cGUgQ2FsZW5kYXJDZWxsID0ge1xyXG4gIGRhdGU6IERhdGUgfCBudWxsO1xyXG4gIGlzbzogc3RyaW5nO1xyXG4gIGlzRW1wdHk6IGJvb2xlYW47XHJcbn07XHJcblxyXG5jb25zdCBwYWQgPSAodmFsdWU6IG51bWJlcik6IHN0cmluZyA9PiB2YWx1ZS50b1N0cmluZygpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcclxuXHJcbmV4cG9ydCBjb25zdCB0b0lzb0RhdGVSYW5nZVZhbHVlID0gKGRhdGU6IERhdGUpOiBzdHJpbmcgPT4ge1xyXG4gIHJldHVybiBgJHtkYXRlLmdldEZ1bGxZZWFyKCl9LSR7cGFkKGRhdGUuZ2V0TW9udGgoKSArIDEpfS0ke3BhZChkYXRlLmdldERhdGUoKSl9YDtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBwYXJzZUlzb0RhdGVSYW5nZVZhbHVlID0gKHZhbHVlOiBzdHJpbmcpOiBEYXRlIHwgbnVsbCA9PiB7XHJcbiAgaWYgKCF2YWx1ZSkgcmV0dXJuIG51bGw7XHJcbiAgY29uc3QgdHJpbW1lZCA9IFN0cmluZyh2YWx1ZSkudHJpbSgpO1xyXG4gIGlmICghdHJpbW1lZCkgcmV0dXJuIG51bGw7XHJcblxyXG4gIGNvbnN0IGRhdGVQYXJ0ID0gdHJpbW1lZC5zcGxpdChcIlRcIilbMF0uc3BsaXQoXCIgXCIpWzBdO1xyXG4gIGlmICghL15cXGR7NH0tXFxkezJ9LVxcZHsyfSQvLnRlc3QoZGF0ZVBhcnQpKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgY29uc3QgW3llYXIsIG1vbnRoLCBkYXldID0gZGF0ZVBhcnQuc3BsaXQoXCItXCIpLm1hcChOdW1iZXIpO1xyXG4gIHJldHVybiBuZXcgRGF0ZSh5ZWFyLCBtb250aCAtIDEsIGRheSk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgaXNTYW1lRGF5ID0gKGE6IERhdGUgfCBudWxsLCBiOiBEYXRlIHwgbnVsbCk6IGJvb2xlYW4gPT4ge1xyXG4gIHJldHVybiAhIShhICYmIGIgJiYgYS5nZXRUaW1lKCkgPT09IGIuZ2V0VGltZSgpKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBpc0JlZm9yZURheSA9IChhOiBEYXRlIHwgbnVsbCwgYjogRGF0ZSB8IG51bGwpOiBib29sZWFuID0+IHtcclxuICByZXR1cm4gISEoYSAmJiBiICYmIGEuZ2V0VGltZSgpIDwgYi5nZXRUaW1lKCkpO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGZvY3VzRGF0ZVJhbmdlU2VjdGlvbiA9IChjb250YWluZXI6IEhUTUxEaXZFbGVtZW50IHwgbnVsbCwgc2VjdGlvbjogXCJzdGFydFwiIHwgXCJlbmRcIik6IHZvaWQgPT4ge1xyXG4gIGlmICghY29udGFpbmVyKSByZXR1cm47XHJcbiAgY29uc3QgdGFyZ2V0ID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQ+KGBbZGF0YS1zZWN0aW9uPVwiJHtzZWN0aW9ufVwiXWApO1xyXG4gIGlmICghdGFyZ2V0KSByZXR1cm47XHJcbiAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0YXJnZXQuZm9jdXMoKSk7XHJcbn07XHJcblxyXG5jb25zdCB0b1RpdGxlQ2FzZSA9ICh2YWx1ZTogc3RyaW5nLCBsb2NhbGU6IHN0cmluZyk6IHN0cmluZyA9PiB7XHJcbiAgaWYgKCF2YWx1ZSkgcmV0dXJuIFwiXCI7XHJcbiAgY29uc3QgbG93ZXIgPSB2YWx1ZS50b0xvY2FsZUxvd2VyQ2FzZShsb2NhbGUpO1xyXG4gIHJldHVybiBsb3dlclswXS50b0xvY2FsZVVwcGVyQ2FzZShsb2NhbGUpICsgbG93ZXIuc2xpY2UoMSk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgdG9TZW50ZW5jZUNhc2UgPSAodmFsdWU6IHN0cmluZywgbG9jYWxlOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xyXG4gIGlmICghdmFsdWUpIHJldHVybiBcIlwiO1xyXG4gIGNvbnN0IHRyaW1tZWQgPSB2YWx1ZS50cmltKCk7XHJcbiAgaWYgKCF0cmltbWVkKSByZXR1cm4gdHJpbW1lZDtcclxuICBjb25zdCBsb3dlciA9IHRyaW1tZWQudG9Mb2NhbGVMb3dlckNhc2UobG9jYWxlKTtcclxuICByZXR1cm4gbG93ZXJbMF0udG9Mb2NhbGVVcHBlckNhc2UobG9jYWxlKSArIGxvd2VyLnNsaWNlKDEpO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGZvcm1hdERhdGVSYW5nZURpc3BsYXkgPSAoZGF0ZTogRGF0ZSwgbG9jYWxlOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xyXG4gIHJldHVybiBkYXRlXHJcbiAgICAudG9Mb2NhbGVEYXRlU3RyaW5nKGxvY2FsZSwge1xyXG4gICAgICBkYXk6IFwibnVtZXJpY1wiLFxyXG4gICAgICBtb250aDogXCJzaG9ydFwiLFxyXG4gICAgICB5ZWFyOiBcIm51bWVyaWNcIixcclxuICAgIH0pXHJcbiAgICAucmVwbGFjZSgvXFwuL2csIFwiXCIpXHJcbiAgICAudG9Mb3dlckNhc2UoKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBmb3JtYXRNb250aExhYmVsID0gKGRhdGU6IERhdGUsIGxvY2FsZTogc3RyaW5nKTogc3RyaW5nID0+IHtcclxuICBjb25zdCBtb250aE5hbWUgPSBkYXRlLnRvTG9jYWxlRGF0ZVN0cmluZyhsb2NhbGUsIHsgbW9udGg6IFwibG9uZ1wiIH0pO1xyXG4gIHJldHVybiBgJHt0b1RpdGxlQ2FzZShtb250aE5hbWUsIGxvY2FsZSl9ICR7ZGF0ZS5nZXRGdWxsWWVhcigpfWA7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgcmVzb2x2ZVVpTG9jYWxlID0gKCk6IHN0cmluZyA9PiB7XHJcbiAgY29uc3QgZnJvbUh0bWwgPSB0eXBlb2YgZG9jdW1lbnQgIT09IFwidW5kZWZpbmVkXCIgPyBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQubGFuZyA6IFwiXCI7XHJcbiAgcmV0dXJuIGZyb21IdG1sICYmIFN0cmluZyhmcm9tSHRtbCkudHJpbSgpID8gZnJvbUh0bWwgOiBcImVzLUVTXCI7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgYnVpbGRDYWxlbmRhck1vbnRoID0gKHllYXI6IG51bWJlciwgbW9udGg6IG51bWJlciwgbG9jYWxlOiBzdHJpbmcpOiB7IG1vbnRoTGFiZWw6IHN0cmluZzsgY2VsbHM6IENhbGVuZGFyQ2VsbFtdIH0gPT4ge1xyXG4gIGNvbnN0IGZpcnN0RGF5ID0gbmV3IERhdGUoeWVhciwgbW9udGgsIDEpO1xyXG4gIGNvbnN0IGRheXNJbk1vbnRoID0gbmV3IERhdGUoeWVhciwgbW9udGggKyAxLCAwKS5nZXREYXRlKCk7XHJcbiAgY29uc3Qgb2Zmc2V0ID0gKGZpcnN0RGF5LmdldERheSgpICsgNikgJSA3O1xyXG4gIGNvbnN0IGNlbGxzOiBDYWxlbmRhckNlbGxbXSA9IFtdO1xyXG5cclxuICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgb2Zmc2V0OyBpbmRleCArPSAxKSB7XHJcbiAgICBjZWxscy5wdXNoKHsgZGF0ZTogbnVsbCwgaXNvOiBcIlwiLCBpc0VtcHR5OiB0cnVlIH0pO1xyXG4gIH1cclxuXHJcbiAgZm9yIChsZXQgZGF5ID0gMTsgZGF5IDw9IGRheXNJbk1vbnRoOyBkYXkgKz0gMSkge1xyXG4gICAgY29uc3QgZGF0ZU9iaiA9IG5ldyBEYXRlKHllYXIsIG1vbnRoLCBkYXkpO1xyXG4gICAgY2VsbHMucHVzaCh7IGRhdGU6IGRhdGVPYmosIGlzbzogdG9Jc29EYXRlUmFuZ2VWYWx1ZShkYXRlT2JqKSwgaXNFbXB0eTogZmFsc2UgfSk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgbW9udGhMYWJlbDogZm9ybWF0TW9udGhMYWJlbChmaXJzdERheSwgbG9jYWxlKSxcclxuICAgIGNlbGxzLFxyXG4gIH07XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgYnVpbGREYXRlUmFuZ2VEYXlDZWxscyA9IChcclxuICBjZWxsczogQ2FsZW5kYXJDZWxsW10sXHJcbiAgc3RhcnREYXRlOiBEYXRlIHwgbnVsbCxcclxuICBlbmREYXRlOiBEYXRlIHwgbnVsbCxcclxuICBob3ZlckRhdGU6IERhdGUgfCBudWxsLFxyXG4gIHNlbGVjdGluZ1N0ZXA6IFwic3RhcnRcIiB8IFwiZW5kXCIgfCBcImRvbmVcIlxyXG4pOiBIaXN0b3J5TWFudWFsRGF5Q2VsbFtdID0+IHtcclxuICBjb25zdCBwcmV2aWV3RW5kID0gZW5kRGF0ZSB8fCAoc2VsZWN0aW5nU3RlcCA9PT0gXCJlbmRcIiA/IGhvdmVyRGF0ZSA6IG51bGwpO1xyXG5cclxuICByZXR1cm4gY2VsbHMubWFwKChjZWxsLCBpbmRleCkgPT4ge1xyXG4gICAgaWYgKGNlbGwuaXNFbXB0eSB8fCAhY2VsbC5kYXRlKSB7XHJcbiAgICAgIHJldHVybiB7IGtleTogYGVtcHR5LSR7aW5kZXh9YCwgaXNFbXB0eTogdHJ1ZSB9O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGRhdGVPYmogPSBjZWxsLmRhdGU7XHJcbiAgICBjb25zdCBpc1N0YXJ0ID0gaXNTYW1lRGF5KGRhdGVPYmosIHN0YXJ0RGF0ZSk7XHJcbiAgICBjb25zdCBpc0VuZCA9IGlzU2FtZURheShkYXRlT2JqLCBlbmREYXRlKTtcclxuICAgIGNvbnN0IGluUmFuZ2UgPSBzdGFydERhdGUgJiYgcHJldmlld0VuZCAmJiBpc0JlZm9yZURheShzdGFydERhdGUsIGRhdGVPYmopICYmIGlzQmVmb3JlRGF5KGRhdGVPYmosIHByZXZpZXdFbmQpO1xyXG4gICAgY29uc3QgaG92ZXJSYW5nZSA9IHN0YXJ0RGF0ZSAmJiAhZW5kRGF0ZSAmJiBob3ZlckRhdGUgJiYgaXNCZWZvcmVEYXkoc3RhcnREYXRlLCBkYXRlT2JqKSAmJiBpc0JlZm9yZURheShkYXRlT2JqLCBob3ZlckRhdGUpO1xyXG4gICAgY29uc3QgZGlzYWJsZWQgPSBzZWxlY3RpbmdTdGVwID09PSBcImVuZFwiICYmICEhc3RhcnREYXRlICYmIGlzQmVmb3JlRGF5KGRhdGVPYmosIHN0YXJ0RGF0ZSk7XHJcbiAgICBjb25zdCBpc1RvZGF5ID0gaXNTYW1lRGF5KGRhdGVPYmosIG5ldyBEYXRlKCkpO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIGtleTogY2VsbC5pc28sXHJcbiAgICAgIGlzRW1wdHk6IGZhbHNlLFxyXG4gICAgICBkYXRlOiBkYXRlT2JqLFxyXG4gICAgICBpc286IGNlbGwuaXNvLFxyXG4gICAgICBkYXlMYWJlbDogZGF0ZU9iai5nZXREYXRlKCksXHJcbiAgICAgIGRheUNsYXNzOiBjbGFzc05hbWVzKFxyXG4gICAgICAgIFwiZHJwLWRheVwiLFxyXG4gICAgICAgIGlzU3RhcnQgPyBcInN0YXJ0IHJhbmdlLXN0YXJ0XCIgOiBcIlwiLFxyXG4gICAgICAgIGlzRW5kID8gXCJlbmQgcmFuZ2UtZW5kXCIgOiBcIlwiLFxyXG4gICAgICAgIGluUmFuZ2UgPyBcImluLXJhbmdlXCIgOiBcIlwiLFxyXG4gICAgICAgIGhvdmVyUmFuZ2UgPyBcImhvdmVyLXJhbmdlXCIgOiBcIlwiLFxyXG4gICAgICAgIGRpc2FibGVkID8gXCJkaXNhYmxlZFwiIDogXCJcIixcclxuICAgICAgICBpc1RvZGF5ID8gXCJ0b2RheVwiIDogXCJcIlxyXG4gICAgICApLFxyXG4gICAgICBkaXNhYmxlZCxcclxuICAgIH07XHJcbiAgfSk7XHJcbn07XHJcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBBY3Rpb25CdXR0b24gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9BY3Rpb25CdXR0b24udHN4XCI7XHJcblxyXG50eXBlIEV4cGVuc2VGaWx0ZXJBY3Rpb25zUHJvcHMgPSB7XHJcbiAgY2xlYXJMYWJlbDogc3RyaW5nO1xyXG4gIGFwcGx5TGFiZWw6IHN0cmluZztcclxuICBvbkNsZWFyOiAoKSA9PiB2b2lkO1xyXG4gIG9uQXBwbHk6ICgpID0+IHZvaWQ7XHJcbn07XHJcblxyXG4vLyBTaGFyZWQgYXBwbHkvY2xlYXIgYWN0aW9uIHJvdyBmb3IgZXhwZW5zZSBzaGVldCBmaWx0ZXJzLlxyXG5jb25zdCBFeHBlbnNlRmlsdGVyQWN0aW9ucyA9ICh7XHJcbiAgY2xlYXJMYWJlbCxcclxuICBhcHBseUxhYmVsLFxyXG4gIG9uQ2xlYXIsXHJcbiAgb25BcHBseSxcclxufTogRXhwZW5zZUZpbHRlckFjdGlvbnNQcm9wcykgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTEgZ3JpZCBncmlkLWNvbHMtMiBnYXAtMiBoaXN0b3J5LWZpbHRlci1hY3Rpb25zXCI+XHJcbiAgICAgIDxBY3Rpb25CdXR0b24gbGFiZWw9e2NsZWFyTGFiZWx9IGNsYXNzTmFtZT1cInctZnVsbFwiIG9uQ2xpY2s9e29uQ2xlYXJ9IC8+XHJcbiAgICAgIDxBY3Rpb25CdXR0b24gbGFiZWw9e2FwcGx5TGFiZWx9IGNsYXNzTmFtZT1cInctZnVsbFwiIG9uQ2xpY2s9e29uQXBwbHl9IC8+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZUZpbHRlckFjdGlvbnM7XHJcbiIsICJpbXBvcnQgUmVhY3QsIHsgdXNlTWVtbyB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgU2VsZWN0Q29tYm9ib3ggZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9TZWxlY3RDb21ib2JveC50c3hcIjtcclxuaW1wb3J0IHR5cGUgeyBBdXRoTWFuYWdlZFVzZXIgfSBmcm9tIFwiLi4vLi4vLi4vY29udGV4dC9BdXRoQ29udGV4dC50c3hcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2VsZWN0T3B0aW9uIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VTZWxlY3RPcHRpb25zLnRzXCI7XHJcblxyXG50eXBlIEV4cGVuc2VNYW5hZ2VkVXNlckZpbHRlclNlbGVjdFByb3BzID0ge1xyXG4gIGxhYmVsOiBzdHJpbmc7XHJcbiAgcGxhY2Vob2xkZXI6IHN0cmluZztcclxuICB2YWx1ZTogc3RyaW5nO1xyXG4gIHVzZXJzOiBBdXRoTWFuYWdlZFVzZXJbXTtcclxuICBhbGxPcHRpb24/OiBFeHBlbnNlU2VsZWN0T3B0aW9uIHwgbnVsbDtcclxuICBvbkNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgcmVhZE9ubHk/OiBib29sZWFuO1xyXG4gIGRpc2FibGVkPzogYm9vbGVhbjtcclxuICBzaG93TGFiZWw/OiBib29sZWFuO1xyXG4gIGNsZWFyT25FbXB0eUlucHV0PzogYm9vbGVhbjtcclxufTtcclxuXHJcbmNvbnN0IHRvT3B0aW9uVGV4dCA9ICh1c2VyOiBBdXRoTWFuYWdlZFVzZXIpOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IGF4VXNlcklkID0gU3RyaW5nKHVzZXIuYXhVc2VySWQgfHwgXCJcIikudHJpbSgpO1xyXG4gIGNvbnN0IG5hbWUgPSBTdHJpbmcodXNlci5uYW1lIHx8IFwiXCIpLnRyaW0oKTtcclxuICBpZiAoIWF4VXNlcklkKSByZXR1cm4gXCJcIjtcclxuICBpZiAoIW5hbWUgfHwgbmFtZS50b1VwcGVyQ2FzZSgpID09PSBheFVzZXJJZC50b1VwcGVyQ2FzZSgpKSB7XHJcbiAgICByZXR1cm4gYXhVc2VySWQ7XHJcbiAgfVxyXG4gIHJldHVybiBgJHtheFVzZXJJZH0gLSAke25hbWV9YDtcclxufTtcclxuXHJcbi8vIEZpeGVkIGxvY2FsIHVzZXIgc2VsZWN0b3IgdXNlZCB0byBmaWx0ZXIgZXhwZW5zZSBzaGVldHMgYnkgbWFuYWdlZCBBeCB1c2VyLlxyXG5jb25zdCBFeHBlbnNlTWFuYWdlZFVzZXJGaWx0ZXJTZWxlY3QgPSAoe1xyXG4gIGxhYmVsLFxyXG4gIHBsYWNlaG9sZGVyLFxyXG4gIHZhbHVlLFxyXG4gIHVzZXJzLFxyXG4gIGFsbE9wdGlvbiA9IG51bGwsXHJcbiAgb25DaGFuZ2UsXHJcbiAgcmVhZE9ubHkgPSBmYWxzZSxcclxuICBkaXNhYmxlZCA9IGZhbHNlLFxyXG4gIHNob3dMYWJlbCA9IHRydWUsXHJcbiAgY2xlYXJPbkVtcHR5SW5wdXQgPSBmYWxzZSxcclxufTogRXhwZW5zZU1hbmFnZWRVc2VyRmlsdGVyU2VsZWN0UHJvcHMpID0+IHtcclxuICBjb25zdCBvcHRpb25zID0gdXNlTWVtbzxFeHBlbnNlU2VsZWN0T3B0aW9uW10+KCgpID0+IHtcclxuICAgIGNvbnN0IHVzZXJPcHRpb25zID0gKEFycmF5LmlzQXJyYXkodXNlcnMpID8gdXNlcnMgOiBbXSlcclxuICAgICAgLm1hcCgoZW50cnkpID0+IHtcclxuICAgICAgICBjb25zdCBheFVzZXJJZCA9IFN0cmluZyhlbnRyeS5heFVzZXJJZCB8fCBcIlwiKS50cmltKCk7XHJcbiAgICAgICAgY29uc3QgbGFiZWwgPSB0b09wdGlvblRleHQoZW50cnkpO1xyXG4gICAgICAgIGlmICghYXhVc2VySWQgfHwgIWxhYmVsKSByZXR1cm4gbnVsbDtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgdmFsdWU6IGF4VXNlcklkLFxyXG4gICAgICAgICAgdGV4dDogbGFiZWwsXHJcbiAgICAgICAgfSBhcyBFeHBlbnNlU2VsZWN0T3B0aW9uO1xyXG4gICAgICB9KVxyXG4gICAgICAuZmlsdGVyKChlbnRyeSk6IGVudHJ5IGlzIEV4cGVuc2VTZWxlY3RPcHRpb24gPT4gISFlbnRyeSk7XHJcbiAgICByZXR1cm4gYWxsT3B0aW9uID8gW2FsbE9wdGlvbiwgLi4udXNlck9wdGlvbnNdIDogdXNlck9wdGlvbnM7XHJcbiAgfSwgW2FsbE9wdGlvbiwgdXNlcnNdKTtcclxuXHJcbiAgY29uc3Qgc2VsZWN0ZWRUZXh0TW9kZSA9IGFsbE9wdGlvbiAmJiB2YWx1ZSA9PT0gYWxsT3B0aW9uLnZhbHVlID8gXCJ0ZXh0XCIgOiBcInZhbHVlXCI7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8U2VsZWN0Q29tYm9ib3hcclxuICAgICAgbGFiZWw9e2xhYmVsfVxyXG4gICAgICBwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XHJcbiAgICAgIG9wdGlvbnM9e29wdGlvbnN9XHJcbiAgICAgIHZhbHVlPXt2YWx1ZX1cclxuICAgICAgb25DaGFuZ2U9e29uQ2hhbmdlfVxyXG4gICAgICByZWFkT25seT17cmVhZE9ubHl9XHJcbiAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cclxuICAgICAgaWRCYXNlPVwiZXhwZW5zZS1tYW5hZ2VkLXVzZXItZmlsdGVyXCJcclxuICAgICAgcG9ydGFsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcclxuICAgICAgcGFuZWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxyXG4gICAgICBhbGxvd1RleHRJbnB1dFxyXG4gICAgICBzZWxlY3RlZFRleHRNb2RlPXtzZWxlY3RlZFRleHRNb2RlfVxyXG4gICAgICBzaG93TGFiZWw9e3Nob3dMYWJlbH1cclxuICAgICAgY2xlYXJPbkVtcHR5SW5wdXQ9e2NsZWFyT25FbXB0eUlucHV0fVxyXG4gICAgLz5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZU1hbmFnZWRVc2VyRmlsdGVyU2VsZWN0O1xyXG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgRmlsdGVyQnV0dG9uIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvRmlsdGVyQnV0dG9uLnRzeFwiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlUXVpY2tEYXRlRmlsdGVySWQgfSBmcm9tIFwiLi4vY29uc3RhbnRzL2V4cGVuc2VRdWlja0RhdGVGaWx0ZXJDYXRhbG9nLnRzXCI7XHJcblxyXG50eXBlIEV4cGVuc2VRdWlja0RhdGVGaWx0ZXJzUHJvcHMgPSB7XHJcbiAgYWN0aXZlUXVpY2tGaWx0ZXI6IEV4cGVuc2VRdWlja0RhdGVGaWx0ZXJJZCB8IG51bGw7XHJcbiAgb25RdWlja0ZpbHRlckNoYW5nZTogKGZpbHRlcklkOiBFeHBlbnNlUXVpY2tEYXRlRmlsdGVySWQpID0+IHZvaWQ7XHJcbn07XHJcblxyXG4vLyBTaGFyZWQgcXVpY2sgZGF0ZSBmaWx0ZXJzIHVzZWQgYnkgZXhwZW5zZSBzaGVldHMgYW5kIHRpY2tldHMgcGFuZWxzLlxyXG5jb25zdCBFeHBlbnNlUXVpY2tEYXRlRmlsdGVycyA9ICh7IGFjdGl2ZVF1aWNrRmlsdGVyLCBvblF1aWNrRmlsdGVyQ2hhbmdlIH06IEV4cGVuc2VRdWlja0RhdGVGaWx0ZXJzUHJvcHMpID0+IHtcclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIGdhcC0yIGhpc3RvcnktcXVpY2stZmlsdGVyc1wiIGFyaWEtbGFiZWw9e2luZFQoXCJIaXN0b3J5X0ZpbHRlcl9EYXRlXCIsIFwiRGF0ZVwiKX0+XHJcbiAgICAgIDxGaWx0ZXJCdXR0b25cclxuICAgICAgICBsYWJlbD17aW5kVChcIkhpc3RvcnlfUXVpY2tfQ3VzdG9tXCIsIFwiRGF0ZVwiKX1cclxuICAgICAgICBhY3RpdmU9e2FjdGl2ZVF1aWNrRmlsdGVyID09PSBcImN1c3RvbVwifVxyXG4gICAgICAgIGNsYXNzTmFtZT1cInctZnVsbFwiXHJcbiAgICAgICAgb25DbGljaz17KCkgPT4gb25RdWlja0ZpbHRlckNoYW5nZShcImN1c3RvbVwiKX1cclxuICAgICAgLz5cclxuICAgICAgPEZpbHRlckJ1dHRvblxyXG4gICAgICAgIGxhYmVsPXtpbmRUKFwiSGlzdG9yeV9RdWlja183RGF5c1wiLCBcIjcgZGF5c1wiKX1cclxuICAgICAgICBhY3RpdmU9e2FjdGl2ZVF1aWNrRmlsdGVyID09PSBcImRheXMtN1wifVxyXG4gICAgICAgIGNsYXNzTmFtZT1cInctZnVsbFwiXHJcbiAgICAgICAgb25DbGljaz17KCkgPT4gb25RdWlja0ZpbHRlckNoYW5nZShcImRheXMtN1wiKX1cclxuICAgICAgLz5cclxuICAgICAgPEZpbHRlckJ1dHRvblxyXG4gICAgICAgIGxhYmVsPXtpbmRUKFwiSGlzdG9yeV9RdWlja18zMERheXNcIiwgXCIzMCBkYXlzXCIpfVxyXG4gICAgICAgIGFjdGl2ZT17YWN0aXZlUXVpY2tGaWx0ZXIgPT09IFwiZGF5cy0zMFwifVxyXG4gICAgICAgIGNsYXNzTmFtZT1cInctZnVsbFwiXHJcbiAgICAgICAgb25DbGljaz17KCkgPT4gb25RdWlja0ZpbHRlckNoYW5nZShcImRheXMtMzBcIil9XHJcbiAgICAgIC8+XHJcbiAgICAgIDxGaWx0ZXJCdXR0b25cclxuICAgICAgICBsYWJlbD17aW5kVChcIkhpc3RvcnlfUXVpY2tfOTBEYXlzXCIsIFwiOTAgZGF5c1wiKX1cclxuICAgICAgICBhY3RpdmU9e2FjdGl2ZVF1aWNrRmlsdGVyID09PSBcImRheXMtOTBcIn1cclxuICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGxcIlxyXG4gICAgICAgIG9uQ2xpY2s9eygpID0+IG9uUXVpY2tGaWx0ZXJDaGFuZ2UoXCJkYXlzLTkwXCIpfVxyXG4gICAgICAvPlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VRdWlja0RhdGVGaWx0ZXJzO1xyXG4iLCAiaW1wb3J0IHR5cGUgeyBFeHBlbnNlUXVpY2tEYXRlRmlsdGVySWQgfSBmcm9tIFwiLi4vY29uc3RhbnRzL2V4cGVuc2VRdWlja0RhdGVGaWx0ZXJDYXRhbG9nLnRzXCI7XHJcbmltcG9ydCB7IHNhZmVUZXh0LCBzdGFydE9mRGF5LCB0b0lzb0RhdGUgfSBmcm9tIFwiLi9leHBlbnNlVWlVdGlscy50c1wiO1xyXG5cclxuY29uc3QgUVVJQ0tfREFURV9GSUxURVJfUkFOR0VTOiBBcnJheTx7XHJcbiAgaWQ6IEV4Y2x1ZGU8RXhwZW5zZVF1aWNrRGF0ZUZpbHRlcklkLCBcImN1c3RvbVwiPjtcclxuICBkYXlzVG9TdWJ0cmFjdDogbnVtYmVyO1xyXG59PiA9IFtcclxuICB7IGlkOiBcImRheXMtN1wiLCBkYXlzVG9TdWJ0cmFjdDogNiB9LFxyXG4gIHsgaWQ6IFwiZGF5cy0zMFwiLCBkYXlzVG9TdWJ0cmFjdDogMjkgfSxcclxuICB7IGlkOiBcImRheXMtOTBcIiwgZGF5c1RvU3VidHJhY3Q6IDg5IH0sXHJcbl07XHJcblxyXG4vLyBSZXNvbHZlcyB3aGljaCBxdWljayBkYXRlIHByZXNldCBtYXRjaGVzIG9uZSBwZXJzaXN0ZWQgZXhwZW5zZSBkYXRlIHJhbmdlLlxyXG5leHBvcnQgY29uc3QgcmVzb2x2ZUV4cGVuc2VRdWlja0RhdGVGaWx0ZXJGcm9tUmFuZ2UgPSAoXHJcbiAgZnJvbURhdGU6IHN0cmluZyxcclxuICB0b0RhdGU6IHN0cmluZ1xyXG4pOiBFeHBlbnNlUXVpY2tEYXRlRmlsdGVySWQgfCBudWxsID0+IHtcclxuICBjb25zdCBub3JtYWxpemVkRnJvbURhdGUgPSBzYWZlVGV4dChmcm9tRGF0ZSk7XHJcbiAgY29uc3Qgbm9ybWFsaXplZFRvRGF0ZSA9IHNhZmVUZXh0KHRvRGF0ZSk7XHJcbiAgaWYgKCFub3JtYWxpemVkRnJvbURhdGUgfHwgIW5vcm1hbGl6ZWRUb0RhdGUpIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgdG9kYXkgPSBzdGFydE9mRGF5KG5ldyBEYXRlKCkpO1xyXG4gIGlmIChub3JtYWxpemVkVG9EYXRlICE9PSB0b0lzb0RhdGUodG9kYXkpKSB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIGZvciAoY29uc3QgZW50cnkgb2YgUVVJQ0tfREFURV9GSUxURVJfUkFOR0VTKSB7XHJcbiAgICBjb25zdCBjYW5kaWRhdGVGcm9tRGF0ZSA9IG5ldyBEYXRlKHRvZGF5KTtcclxuICAgIGNhbmRpZGF0ZUZyb21EYXRlLnNldERhdGUodG9kYXkuZ2V0RGF0ZSgpIC0gZW50cnkuZGF5c1RvU3VidHJhY3QpO1xyXG4gICAgaWYgKG5vcm1hbGl6ZWRGcm9tRGF0ZSA9PT0gdG9Jc29EYXRlKGNhbmRpZGF0ZUZyb21EYXRlKSkge1xyXG4gICAgICByZXR1cm4gZW50cnkuaWQ7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gbnVsbDtcclxufTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVVBLElBQU0sNEJBQTRCO0FBQ2xDLElBQU0sNkJBQTZCLG9CQUFJLElBQVksQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUM7QUFFbEYsSUFBTSw0QkFBNEIsQ0FBQyxVQUFvQztBQUNyRSxTQUFPLE9BQU8sVUFBVSxLQUFLLEtBQUssT0FBTyxLQUFLLEtBQUssS0FBSyxPQUFPLEtBQUssS0FBSztBQUMzRTtBQUdBLElBQU0sNEJBQTRCLENBQUMsaUJBQXdDO0FBQ3pFLE1BQUksaUJBQWlCLCtCQUErQjtBQUNsRCxXQUFPO0FBQUEsRUFDVDtBQUVBLE1BQUksQ0FBQywwQkFBMEIsWUFBWSxHQUFHO0FBQzVDLFdBQU87QUFBQSxFQUNUO0FBRUEsU0FBTztBQUNUO0FBRUEsSUFBTSx3QkFBd0IsQ0FBQyxVQUFrRDtBQUMvRSxRQUFNLFVBQVUsT0FBTyxTQUFTLEVBQUUsRUFBRSxLQUFLO0FBQ3pDLFNBQU8sVUFBVSxVQUFVO0FBQzdCO0FBRUEsSUFBTSw2QkFBNkIsQ0FDakMsVUFDbUI7QUFDbkIsTUFBSSxVQUFVLE9BQU87QUFDbkIsV0FBTztBQUFBLEVBQ1Q7QUFFQSxNQUFJLFVBQVUsTUFBTTtBQUNsQixXQUFPO0FBQUEsRUFDVDtBQUVBLFNBQU87QUFDVDtBQUVBLElBQU0sNEJBQTRCLENBQ2hDLFVBQ2lCO0FBQ2pCLFNBQU8sVUFBVSxLQUFLLFVBQVUsSUFBSSxRQUFRO0FBQzlDO0FBRUEsSUFBTSwrQkFBK0IsQ0FDbkMsVUFDK0M7QUFDL0MsTUFBSSxVQUFVLE1BQU0sVUFBVSxRQUFRLFVBQVUsUUFBVztB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LElBQU8sa0NBQVE7OztBQ3ZDZixJQUFNLDJCQUdEO0FBQUEsRUFDSCxFQUFFLElBQUksVUFBVSxnQkFBZ0IsRUFBRTtBQUFBLEVBQ2xDLEVBQUUsSUFBSSxXQUFXLGdCQUFnQixHQUFHO0FBQUEsRUFDcEMsRUFBRSxJQUFJLFdBQVcsZ0JBQWdCLEdBQUc7QUFDdEM7QUFHTyxJQUFNLHlDQUF5QyxDQUNwRCxVQUNBLFdBQ29DO0FBQ3BDLFFBQU0scUJBQXFCLFNBQVMsUUFBUTtBQUM1QyxRQUFNLG1CQUFtQixTQUFTLE1BQU07QUFDeEMsTUFBSSxDQUFDLHNCQUFzQixDQUFDLGtCQUFrQjtBQUM1QyxXQUFPO0FBQUEsRUFDVDtBQUVBLFFBQU0sUUFBUSxXQUFXLG9CQUFJLEtBQUssQ0FBQztBQUNuQyxNQUFJLHFCQUFxQixVQUFVLEtBQUssR0FBRztBQUN6QyxXQUFPO0FBQUEsRUFDVDtBQUVBLGFBQVcsU0FBUywwQkFBMEI7QUFDNUMsVUFBTSxvQkFBb0IsSUFBSSxLQUFLLEtBQUs7QUFDeEMsc0JBQWtCLFFBQVEsTUFBTSxRQUFRLElBQUksTUFBTSxjQUFjO0FBQ2hFLFFBQUksdUJBQXVCLFVBQVUsaUJBQWlCLEdBQUc7QUFDdkQsYUFBTyxNQUFNO0FBQUEsSUFDZjtBQUFBLEVBQ0Y7QUFFQSxTQUFPO0FBQ1Q7IiwKICAibmFtZXMiOiBbImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImxhYmVsIiwgImltcG9ydF9qc3hfcnVudGltZSJdCn0K
