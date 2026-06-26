import {
  ActionButton_default,
  FilterButton_default,
  HistoryManualDatePicker_default
} from "./chunk-ZYPRLFAC.js";
import {
  DEFAULT_EXPENSE_STATUS_FILTER
} from "./chunk-CHKLJEF3.js";
import {
  SelectCombobox_default
} from "./chunk-5FRAKTKT.js";
import {
  safeText,
  startOfDay,
  toIsoDate
} from "./chunk-GDLOXSCF.js";
import {
  toExpenseGastoTypeCode
} from "./chunk-HGU6IHIX.js";
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
var isValidExpenseSheetStatus = (value) => {
  return Number.isInteger(value) && Number(value) >= 0;
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
  return typeof value === "number" && Number.isInteger(value) && value >= 0 ? value : null;
};
var resolveTicketGastoTypeFilter = (value) => {
  if (value === "" || value === null || value === void 0) {
    return null;
  }
  return toExpenseGastoTypeCode(value);
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
    reimbursableExpense: filters.reimbursableExpense ?? null,
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy91dGlscy9leHBlbnNlUGF5bG9hZEJ1aWxkZXJzLnRzIiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdXRpbHMvZXhwZW5zZUhpc3RvcnlOYXZpZ2F0aW9uLnRzIiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlRGF0ZVJhbmdlRmlsdGVyLnRzeCIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3V0aWxzL2V4cGVuc2VEYXRlUmFuZ2VVdGlscy50cyIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbXBvbmVudHMvRXhwZW5zZUZpbHRlckFjdGlvbnMudHN4IiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlTWFuYWdlZFVzZXJGaWx0ZXJTZWxlY3QudHN4IiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlUXVpY2tEYXRlRmlsdGVycy50c3giLCAiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy91dGlscy9leHBlbnNlUXVpY2tEYXRlRmlsdGVyU3RhdGUudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB0eXBlIHtcclxuICBFeHBlbnNlU2hlZXRMaXN0QXBpUmVxdWVzdCxcclxuICBFeHBlbnNlU2hlZXRUaWNrZXRMaW5rQnVsa0ZpbHRlcnMsXHJcbiAgRXhwZW5zZVNoZWV0VGlja2V0TGlua0xpc3RSZXF1ZXN0LFxyXG4gIEV4cGVuc2VTaGVldExpc3RGaWx0ZXJzLFxyXG4gIEV4cGVuc2VTaGVldFRpY2tldExpc3RSZXF1ZXN0LFxyXG59IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcclxuaW1wb3J0IHsgREVGQVVMVF9FWFBFTlNFX1NUQVRVU19GSUxURVIgfSBmcm9tIFwiLi4vY29uc3RhbnRzL2V4cGVuc2VTdGF0dXNDYXRhbG9nLnRzXCI7XG5pbXBvcnQgeyB0b0V4cGVuc2VHYXN0b1R5cGVDb2RlIH0gZnJvbSBcIi4uL2NvbnN0YW50cy9leHBlbnNlR2FzdG9UeXBlQ2F0YWxvZy50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90IH0gZnJvbSBcIi4uL3RpY2tldHMvZXhwZW5zZVRpY2tldExpc3RUeXBlcy50c1wiO1xuXG5jb25zdCBERUZBVUxUX1NVR0dFU1RfUEFHRV9TSVpFID0gNTA7XG5cclxuY29uc3QgaXNWYWxpZEV4cGVuc2VTaGVldFN0YXR1cyA9ICh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG51bWJlciA9PiB7XG4gIHJldHVybiBOdW1iZXIuaXNJbnRlZ2VyKHZhbHVlKSAmJiBOdW1iZXIodmFsdWUpID49IDA7XG59O1xuXHJcbi8vIFJlc29sdmVzIHRoZSBvcHRpb25hbCBBUEkgc3RhdHVzIGZpbHRlciBmcm9tIFVJIGZpbHRlciBzdGF0ZS5cclxuY29uc3QgcmVzb2x2ZUV4cGVuc2VTaGVldFN0YXR1cyA9IChzdGF0dXNGaWx0ZXI6IG51bWJlcik6IG51bWJlciB8IG51bGwgPT4ge1xyXG4gIGlmIChzdGF0dXNGaWx0ZXIgPT09IERFRkFVTFRfRVhQRU5TRV9TVEFUVVNfRklMVEVSKSB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIGlmICghaXNWYWxpZEV4cGVuc2VTaGVldFN0YXR1cyhzdGF0dXNGaWx0ZXIpKSB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIHJldHVybiBzdGF0dXNGaWx0ZXI7XHJcbn07XHJcblxyXG5jb25zdCBub3JtYWxpemVPcHRpb25hbFRleHQgPSAodmFsdWU6IHN0cmluZyB8IHVuZGVmaW5lZCk6IHN0cmluZyB8IHVuZGVmaW5lZCA9PiB7XHJcbiAgY29uc3QgdHJpbW1lZCA9IFN0cmluZyh2YWx1ZSB8fCBcIlwiKS50cmltKCk7XHJcbiAgcmV0dXJuIHRyaW1tZWQgPyB0cmltbWVkIDogdW5kZWZpbmVkO1xyXG59O1xyXG5cclxuY29uc3QgcmVzb2x2ZVByb2Nlc3NlZEJ5QWlGaWx0ZXIgPSAoXHJcbiAgdmFsdWU6IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3RbXCJwcm9jZXNzZWRCeUlhRmlsdGVyXCJdXHJcbik6IGJvb2xlYW4gfCBudWxsID0+IHtcclxuICBpZiAodmFsdWUgPT09IFwieWVzXCIpIHtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgaWYgKHZhbHVlID09PSBcIm5vXCIpIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIHJldHVybiBudWxsO1xyXG59O1xyXG5cclxuY29uc3QgcmVzb2x2ZVRpY2tldFN0YXR1c0ZpbHRlciA9IChcbiAgdmFsdWU6IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3RbXCJzdGF0dXNGaWx0ZXJcIl1cbik6IG51bWJlciB8IG51bGwgPT4ge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiICYmIE51bWJlci5pc0ludGVnZXIodmFsdWUpICYmIHZhbHVlID49IDAgPyB2YWx1ZSA6IG51bGw7XG59O1xuXHJcbmNvbnN0IHJlc29sdmVUaWNrZXRHYXN0b1R5cGVGaWx0ZXIgPSAoXHJcbiAgdmFsdWU6IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3RbXCJnYXN0b1R5cGVGaWx0ZXJcIl1cclxuKTogRXhwZW5zZVNoZWV0VGlja2V0TGlzdFJlcXVlc3RbXCJnYXN0b1R5cGVcIl0gPT4ge1xyXG4gIGlmICh2YWx1ZSA9PT0gXCJcIiB8fCB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIHJldHVybiB0b0V4cGVuc2VHYXN0b1R5cGVDb2RlKHZhbHVlKSBhcyBFeHBlbnNlU2hlZXRUaWNrZXRMaXN0UmVxdWVzdFtcImdhc3RvVHlwZVwiXTtcbn07XG5cclxuY29uc3QgYnVpbGRFeHBlbnNlVGlja2V0RmlsdGVyUGF5bG9hZCA9IChcclxuICBmaWx0ZXJzOiBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90XHJcbik6IEV4cGVuc2VTaGVldFRpY2tldExpbmtCdWxrRmlsdGVycyA9PiB7XHJcbiAgY29uc3Qgc2FmZUZpbHRlcktleSA9IG5vcm1hbGl6ZU9wdGlvbmFsVGV4dChmaWx0ZXJzLmZpbHRlcktleSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBjcmVhdGVkRGF0ZUZyb206IG5vcm1hbGl6ZU9wdGlvbmFsVGV4dChmaWx0ZXJzLmZyb21EYXRlKSxcclxuICAgIGNyZWF0ZWREYXRlVG86IG5vcm1hbGl6ZU9wdGlvbmFsVGV4dChmaWx0ZXJzLnRvRGF0ZSksXHJcbiAgICBzZWFyY2hLZXk6IHNhZmVGaWx0ZXJLZXksXHJcbiAgICBmaWx0ZXI6IHNhZmVGaWx0ZXJLZXksXHJcbiAgICBjdXJyZW5jeUNvZGU6IG5vcm1hbGl6ZU9wdGlvbmFsVGV4dChmaWx0ZXJzLmN1cnJlbmN5Q29kZSksXHJcbiAgICBnYXN0b1R5cGU6IHJlc29sdmVUaWNrZXRHYXN0b1R5cGVGaWx0ZXIoZmlsdGVycy5nYXN0b1R5cGVGaWx0ZXIpLFxyXG4gICAgcHJvY2Vzc2VkQnlBSTogcmVzb2x2ZVByb2Nlc3NlZEJ5QWlGaWx0ZXIoZmlsdGVycy5wcm9jZXNzZWRCeUlhRmlsdGVyKSxcclxuICB9O1xyXG59O1xyXG5cclxuLy8gQnVpbGQgbGlzdCBwYXlsb2FkIGZvciAvYXBpL2NybS9leHBlbnNlc2hlZXRzL2xpc3QgZnJvbSBjdXJyZW50IGZpbHRlciBzdGF0ZS5cclxuZXhwb3J0IGNvbnN0IGJ1aWxkRXhwZW5zZUxpc3RQYXlsb2FkID0gKFxyXG4gIGZpbHRlcnM6IEV4cGVuc2VTaGVldExpc3RGaWx0ZXJzLFxyXG4gIHBhZ2U6IG51bWJlcixcclxuICBwYWdlU2l6ZTogbnVtYmVyXHJcbik6IEV4cGVuc2VTaGVldExpc3RBcGlSZXF1ZXN0ID0+IHtcclxuICBjb25zdCBuZXh0UGFnZSA9IE51bWJlci5pc0Zpbml0ZShwYWdlKSAmJiBwYWdlID4gMCA/IHBhZ2UgOiAxO1xyXG4gIGNvbnN0IG5leHRQYWdlU2l6ZSA9IE51bWJlci5pc0Zpbml0ZShwYWdlU2l6ZSkgJiYgcGFnZVNpemUgPiAwID8gcGFnZVNpemUgOiBERUZBVUxUX1NVR0dFU1RfUEFHRV9TSVpFO1xyXG4gIGNvbnN0IHNhZmVGaWx0ZXIgPSBTdHJpbmcoZmlsdGVycy5maWx0ZXIgfHwgZmlsdGVycy5ob2phR2FzdG9zSWQgfHwgXCJcIikudHJpbSgpO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgZmlsdGVyOiBzYWZlRmlsdGVyIHx8IFwiXCIsXHJcbiAgICBiaWxsZWRNb2RlOiAyLFxyXG4gICAgY3JlYXRlZERhdGVGcm9tOiBub3JtYWxpemVPcHRpb25hbFRleHQoZmlsdGVycy5mcm9tRGF0ZSksXHJcbiAgICBjcmVhdGVkRGF0ZVRvOiBub3JtYWxpemVPcHRpb25hbFRleHQoZmlsdGVycy50b0RhdGUpLFxyXG4gICAgcHJvaklkOiBub3JtYWxpemVPcHRpb25hbFRleHQoZmlsdGVycy5wcm9qZWN0SWQpLFxyXG4gICAgY3VycmVuY3lDb2RlOiBub3JtYWxpemVPcHRpb25hbFRleHQoZmlsdGVycy5jdXJyZW5jeUNvZGUpLFxuICAgIGV4cGVuc2VTaGVldFN0YXR1czogcmVzb2x2ZUV4cGVuc2VTaGVldFN0YXR1cyhmaWx0ZXJzLnN0YXR1c0ZpbHRlciksXG4gICAgcmVpbWJ1cnNhYmxlRXhwZW5zZTogZmlsdGVycy5yZWltYnVyc2FibGVFeHBlbnNlID8/IG51bGwsXG4gICAgaW5jbHVkZVN1Ym9yZGluYXRlczogZmlsdGVycy5pbmNsdWRlU3Vib3JkaW5hdGVzID09PSB0cnVlLFxuICAgIHBhZ2U6IG5leHRQYWdlLFxyXG4gICAgcGFnZVNpemU6IG5leHRQYWdlU2l6ZSxcclxuICB9O1xyXG59O1xyXG5cclxuLy8gQnVpbGQgc3VnZ2VzdGlvbiBwYXlsb2FkIGZvciBleHBlbnNlIHNoZWV0IGRyb3Bkb3duIHNlYXJjaC5cclxuZXhwb3J0IGNvbnN0IGJ1aWxkRXhwZW5zZVNoZWV0U3VnZ2VzdFBheWxvYWQgPSAoXHJcbiAgdGVybTogc3RyaW5nLFxyXG4gIHBhZ2VTaXplID0gREVGQVVMVF9TVUdHRVNUX1BBR0VfU0laRSxcclxuICBwYWdlID0gMSxcclxuICBpbmNsdWRlU3Vib3JkaW5hdGVzID0gZmFsc2VcclxuKTogRXhwZW5zZVNoZWV0TGlzdEFwaVJlcXVlc3QgPT4ge1xyXG4gIGNvbnN0IHNhZmVUZXJtID0gU3RyaW5nKHRlcm0gfHwgXCJcIikudHJpbSgpO1xyXG4gIGNvbnN0IG5leHRQYWdlU2l6ZSA9IE51bWJlci5pc0Zpbml0ZShwYWdlU2l6ZSkgJiYgcGFnZVNpemUgPiAwID8gcGFnZVNpemUgOiBERUZBVUxUX1NVR0dFU1RfUEFHRV9TSVpFO1xyXG4gIGNvbnN0IG5leHRQYWdlID0gTnVtYmVyLmlzRmluaXRlKHBhZ2UpICYmIHBhZ2UgPiAwID8gTWF0aC5mbG9vcihwYWdlKSA6IDE7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBmaWx0ZXI6IHNhZmVUZXJtIHx8IFwiXCIsXHJcbiAgICBiaWxsZWRNb2RlOiAyLFxyXG4gICAgY3JlYXRlZERhdGVGcm9tOiB1bmRlZmluZWQsXHJcbiAgICBjcmVhdGVkRGF0ZVRvOiB1bmRlZmluZWQsXHJcbiAgICBwcm9qSWQ6IHVuZGVmaW5lZCxcclxuICAgIGN1cnJlbmN5Q29kZTogdW5kZWZpbmVkLFxyXG4gICAgaW5jbHVkZVN1Ym9yZGluYXRlczogaW5jbHVkZVN1Ym9yZGluYXRlcyA9PT0gdHJ1ZSxcclxuICAgIHBhZ2U6IG5leHRQYWdlLFxyXG4gICAgcGFnZVNpemU6IG5leHRQYWdlU2l6ZSxcclxuICB9O1xyXG59O1xyXG5cclxuLy8gQnVpbGQgbGlzdCBwYXlsb2FkIGZvciAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMvbGlzdCBmcm9tIHRpY2tldCBmaWx0ZXIgc3RhdGUuXHJcbmV4cG9ydCBjb25zdCBidWlsZEV4cGVuc2VUaWNrZXRMaXN0UGF5bG9hZCA9IChcclxuICBmaWx0ZXJzOiBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90LFxyXG4gIHBhZ2U6IG51bWJlcixcclxuICBwYWdlU2l6ZTogbnVtYmVyXHJcbik6IEV4cGVuc2VTaGVldFRpY2tldExpc3RSZXF1ZXN0ID0+IHtcclxuICBjb25zdCBuZXh0UGFnZSA9IE51bWJlci5pc0Zpbml0ZShwYWdlKSAmJiBwYWdlID4gMCA/IE1hdGguZmxvb3IocGFnZSkgOiAxO1xyXG4gIGNvbnN0IG5leHRQYWdlU2l6ZSA9IE51bWJlci5pc0Zpbml0ZShwYWdlU2l6ZSkgJiYgcGFnZVNpemUgPiAwID8gTWF0aC5mbG9vcihwYWdlU2l6ZSkgOiBERUZBVUxUX1NVR0dFU1RfUEFHRV9TSVpFO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgcGFnZTogbmV4dFBhZ2UsXHJcbiAgICBwYWdlU2l6ZTogbmV4dFBhZ2VTaXplLFxyXG4gICAgLi4uYnVpbGRFeHBlbnNlVGlja2V0RmlsdGVyUGF5bG9hZChmaWx0ZXJzKSxcclxuICAgIHN0YXR1czogcmVzb2x2ZVRpY2tldFN0YXR1c0ZpbHRlcihmaWx0ZXJzLnN0YXR1c0ZpbHRlciksXHJcbiAgfTtcclxufTtcclxuXHJcbi8vIEJ1aWxkIGxpc3QgcGF5bG9hZCBmb3IgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzL2xpbmsvbGlzdCBmcm9tIHRpY2tldCBmaWx0ZXIgc3RhdGUuXHJcbmV4cG9ydCBjb25zdCBidWlsZEV4cGVuc2VUaWNrZXRMaW5rTGlzdFBheWxvYWQgPSAoXHJcbiAgZmlsdGVyczogRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCxcclxuICBwYWdlOiBudW1iZXIsXHJcbiAgcGFnZVNpemU6IG51bWJlclxyXG4pOiBFeHBlbnNlU2hlZXRUaWNrZXRMaW5rTGlzdFJlcXVlc3QgPT4ge1xyXG4gIGNvbnN0IG5leHRQYWdlID0gTnVtYmVyLmlzRmluaXRlKHBhZ2UpICYmIHBhZ2UgPiAwID8gTWF0aC5mbG9vcihwYWdlKSA6IDE7XHJcbiAgY29uc3QgbmV4dFBhZ2VTaXplID0gTnVtYmVyLmlzRmluaXRlKHBhZ2VTaXplKSAmJiBwYWdlU2l6ZSA+IDAgPyBNYXRoLmZsb29yKHBhZ2VTaXplKSA6IERFRkFVTFRfU1VHR0VTVF9QQUdFX1NJWkU7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBwYWdlOiBuZXh0UGFnZSxcclxuICAgIHBhZ2VTaXplOiBuZXh0UGFnZVNpemUsXHJcbiAgICAuLi5idWlsZEV4cGVuc2VUaWNrZXRGaWx0ZXJQYXlsb2FkKGZpbHRlcnMpLFxyXG4gIH07XHJcbn07XHJcblxyXG4vLyBCdWlsZCBmaWx0ZXIgcGF5bG9hZCBmb3IgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzL2xpbmsvYnVsayBpbiBmaWx0ZXJlZCBtb2RlLlxyXG5leHBvcnQgY29uc3QgYnVpbGRFeHBlbnNlVGlja2V0TGlua0J1bGtGaWx0ZXJzID0gKFxyXG4gIGZpbHRlcnM6IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3RcclxuKTogRXhwZW5zZVNoZWV0VGlja2V0TGlua0J1bGtGaWx0ZXJzID0+IHtcclxuICByZXR1cm4gYnVpbGRFeHBlbnNlVGlja2V0RmlsdGVyUGF5bG9hZChmaWx0ZXJzKTtcclxufTtcclxuIiwgIi8vIERldGVjdHMgYnJvd3NlciBoaXN0b3J5IHJldHVybnMgdGhhdCByZWNyZWF0ZSB0aGUgcGFnZSB3aXRob3V0IGFwcC1sZXZlbCByZXR1cm4gZmxhZ3MuXHJcbmV4cG9ydCBjb25zdCBpc0V4cGVuc2VIaXN0b3J5QmFja0ZvcndhcmROYXZpZ2F0aW9uID0gKCk6IGJvb2xlYW4gPT4ge1xyXG4gIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiIHx8IHR5cGVvZiBwZXJmb3JtYW5jZSA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgaWYgKHR5cGVvZiBwZXJmb3JtYW5jZS5nZXRFbnRyaWVzQnlUeXBlICE9PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIGNvbnN0IG5hdmlnYXRpb25FbnRyaWVzID0gcGVyZm9ybWFuY2UuZ2V0RW50cmllc0J5VHlwZShcIm5hdmlnYXRpb25cIik7XHJcbiAgY29uc3QgbmF2aWdhdGlvbkVudHJ5ID0gbmF2aWdhdGlvbkVudHJpZXNbMF0gYXMgUGVyZm9ybWFuY2VOYXZpZ2F0aW9uVGltaW5nIHwgdW5kZWZpbmVkO1xyXG4gIHJldHVybiBuYXZpZ2F0aW9uRW50cnk/LnR5cGUgPT09IFwiYmFja19mb3J3YXJkXCI7XHJcbn07XHJcblxyXG5jb25zdCBub3JtYWxpemVQYXRobmFtZSA9ICh2YWx1ZTogc3RyaW5nKTogc3RyaW5nID0+IHtcclxuICByZXR1cm4gU3RyaW5nKHZhbHVlIHx8IFwiXCIpLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xyXG59O1xyXG5cclxuLy8gRGV0ZWN0cyB3aGV0aGVyIHRoZSBjdXJyZW50IHBhZ2Ugd2FzIG9wZW5lZCBmcm9tIG9uZSBvZiB0aGUgZXhwZWN0ZWQgZXhwZW5zZSBkZXRhaWwgcm91dGVzLlxyXG5leHBvcnQgY29uc3QgaGFzRXhwZW5zZVJldHVyblJlZmVycmVyID0gKGV4cGVjdGVkUGF0aHM6IHN0cmluZ1tdKTogYm9vbGVhbiA9PiB7XHJcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIiB8fCB0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBjb25zdCByYXdSZWZlcnJlciA9IFN0cmluZyhkb2N1bWVudC5yZWZlcnJlciB8fCBcIlwiKS50cmltKCk7XHJcbiAgaWYgKCFyYXdSZWZlcnJlcikgcmV0dXJuIGZhbHNlO1xyXG5cclxuICB0cnkge1xyXG4gICAgY29uc3QgcmVmZXJyZXJVcmwgPSBuZXcgVVJMKHJhd1JlZmVycmVyLCB3aW5kb3cubG9jYXRpb24ub3JpZ2luKTtcclxuICAgIGNvbnN0IHJlZmVycmVyUGF0aCA9IG5vcm1hbGl6ZVBhdGhuYW1lKHJlZmVycmVyVXJsLnBhdGhuYW1lKTtcclxuICAgIHJldHVybiBleHBlY3RlZFBhdGhzLnNvbWUoKHBhdGgpID0+IG5vcm1hbGl6ZVBhdGhuYW1lKHBhdGgpID09PSByZWZlcnJlclBhdGgpO1xyXG4gIH0gY2F0Y2gge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxufTtcclxuIiwgImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgSGlzdG9yeU1hbnVhbERhdGVQaWNrZXIsIHtcclxuICBIaXN0b3J5TWFudWFsRGF5Q2VsbCxcclxufSBmcm9tIFwiLi4vLi4vdmlzaXRhcy9oaXN0b3JpYWwvSGlzdG9yeU1hbnVhbERhdGVQaWNrZXIudHN4XCI7XHJcbmltcG9ydCB7XHJcbiAgYnVpbGRDYWxlbmRhck1vbnRoLFxyXG4gIGJ1aWxkRGF0ZVJhbmdlRGF5Q2VsbHMsXHJcbiAgZm9jdXNEYXRlUmFuZ2VTZWN0aW9uLFxyXG4gIGZvcm1hdERhdGVSYW5nZURpc3BsYXksXHJcbiAgaXNCZWZvcmVEYXksXHJcbiAgcGFyc2VJc29EYXRlUmFuZ2VWYWx1ZSxcclxuICByZXNvbHZlVWlMb2NhbGUsXHJcbiAgdG9Jc29EYXRlUmFuZ2VWYWx1ZSxcclxuICB0b1NlbnRlbmNlQ2FzZSxcclxufSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZURhdGVSYW5nZVV0aWxzLnRzXCI7XHJcblxyXG50eXBlIEV4cGVuc2VEYXRlUmFuZ2VGaWx0ZXJQcm9wcyA9IHtcclxuICBmcm9tRGF0ZTogc3RyaW5nO1xyXG4gIHRvRGF0ZTogc3RyaW5nO1xyXG4gIG9uQ2hhbmdlOiAoZnJvbURhdGU6IHN0cmluZywgdG9EYXRlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgb25SYW5nZUNvbXBsZXRlPzogKGZyb21EYXRlOiBzdHJpbmcsIHRvRGF0ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIGF1dG9PcGVuUmVxdWVzdElkPzogbnVtYmVyO1xyXG4gIHNob3dNYW51YWxFcnJvcj86IGJvb2xlYW47XHJcbiAgc2hvd1N0YXJ0RXJyb3I/OiBib29sZWFuO1xyXG4gIHNob3dFbmRFcnJvcj86IGJvb2xlYW47XHJcbn07XHJcblxyXG4vLyBTaGFyZWQgZGF0ZSByYW5nZSBwaWNrZXIgZm9yIGV4cGVuc2UgZmlsdGVycyBiYXNlZCBvbiB0aGUgaGlzdG9yeSBkYXRlIGNvbXBvbmVudC5cclxuY29uc3QgRXhwZW5zZURhdGVSYW5nZUZpbHRlciA9ICh7XHJcbiAgZnJvbURhdGUsXHJcbiAgdG9EYXRlLFxyXG4gIG9uQ2hhbmdlLFxyXG4gIG9uUmFuZ2VDb21wbGV0ZSxcclxuICBhdXRvT3BlblJlcXVlc3RJZCA9IDAsXHJcbiAgc2hvd01hbnVhbEVycm9yID0gZmFsc2UsXHJcbiAgc2hvd1N0YXJ0RXJyb3IgPSBmYWxzZSxcclxuICBzaG93RW5kRXJyb3IgPSBmYWxzZSxcclxufTogRXhwZW5zZURhdGVSYW5nZUZpbHRlclByb3BzKSA9PiB7XHJcbiAgY29uc3QgbG9jYWxlID0gdXNlTWVtbygoKSA9PiByZXNvbHZlVWlMb2NhbGUoKSwgW10pO1xyXG4gIGNvbnN0IGFjdGl2YXRvclJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IHBvcG92ZXJSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcclxuXHJcbiAgY29uc3QgW3N0YXJ0RGF0ZSwgc2V0U3RhcnREYXRlXSA9IHVzZVN0YXRlPERhdGUgfCBudWxsPigoKSA9PiBwYXJzZUlzb0RhdGVSYW5nZVZhbHVlKGZyb21EYXRlKSk7XHJcbiAgY29uc3QgW2VuZERhdGUsIHNldEVuZERhdGVdID0gdXNlU3RhdGU8RGF0ZSB8IG51bGw+KCgpID0+IHBhcnNlSXNvRGF0ZVJhbmdlVmFsdWUodG9EYXRlKSk7XHJcbiAgY29uc3QgW2hvdmVyRGF0ZSwgc2V0SG92ZXJEYXRlXSA9IHVzZVN0YXRlPERhdGUgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBbc2VsZWN0aW5nU3RlcCwgc2V0U2VsZWN0aW5nU3RlcF0gPSB1c2VTdGF0ZTxcInN0YXJ0XCIgfCBcImVuZFwiIHwgXCJkb25lXCI+KFwic3RhcnRcIik7XHJcbiAgY29uc3QgW2lzT3Blbiwgc2V0SXNPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuXHJcbiAgY29uc3Qgbm93ID0gdXNlTWVtbygoKSA9PiBuZXcgRGF0ZSgpLCBbXSk7XHJcbiAgY29uc3QgW2N1cnJlbnRNb250aCwgc2V0Q3VycmVudE1vbnRoXSA9IHVzZVN0YXRlKChwYXJzZUlzb0RhdGVSYW5nZVZhbHVlKGZyb21EYXRlKSB8fCBub3cpLmdldE1vbnRoKCkpO1xyXG4gIGNvbnN0IFtjdXJyZW50WWVhciwgc2V0Q3VycmVudFllYXJdID0gdXNlU3RhdGUoKHBhcnNlSXNvRGF0ZVJhbmdlVmFsdWUoZnJvbURhdGUpIHx8IG5vdykuZ2V0RnVsbFllYXIoKSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBzZXRTdGFydERhdGUocGFyc2VJc29EYXRlUmFuZ2VWYWx1ZShmcm9tRGF0ZSkpO1xyXG4gIH0sIFtmcm9tRGF0ZV0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgc2V0RW5kRGF0ZShwYXJzZUlzb0RhdGVSYW5nZVZhbHVlKHRvRGF0ZSkpO1xyXG4gIH0sIFt0b0RhdGVdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIG9uQ2hhbmdlKHN0YXJ0RGF0ZSA/IHRvSXNvRGF0ZVJhbmdlVmFsdWUoc3RhcnREYXRlKSA6IFwiXCIsIGVuZERhdGUgPyB0b0lzb0RhdGVSYW5nZVZhbHVlKGVuZERhdGUpIDogXCJcIik7XHJcbiAgfSwgW3N0YXJ0RGF0ZSwgZW5kRGF0ZSwgb25DaGFuZ2VdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghaXNPcGVuKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgaGFuZGxlT3V0c2lkZSA9IChldmVudDogTW91c2VFdmVudCkgPT4ge1xyXG4gICAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQgYXMgTm9kZSB8IG51bGw7XHJcbiAgICAgIGlmICghdGFyZ2V0KSByZXR1cm47XHJcbiAgICAgIGlmIChwb3BvdmVyUmVmLmN1cnJlbnQ/LmNvbnRhaW5zKHRhcmdldCkpIHJldHVybjtcclxuICAgICAgaWYgKGFjdGl2YXRvclJlZi5jdXJyZW50Py5jb250YWlucyh0YXJnZXQpKSByZXR1cm47XHJcbiAgICAgIHNldElzT3BlbihmYWxzZSk7XHJcbiAgICAgIHNldEhvdmVyRGF0ZShudWxsKTtcclxuICAgIH07XHJcblxyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBoYW5kbGVPdXRzaWRlKTtcclxuICAgIHJldHVybiAoKSA9PiBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGhhbmRsZU91dHNpZGUpO1xyXG4gIH0sIFtpc09wZW5dKTtcclxuXHJcbiAgY29uc3Qgb3BlblBvcG92ZXIgPSB1c2VDYWxsYmFjayhcclxuICAgIChzZWN0aW9uOiBcInN0YXJ0XCIgfCBcImVuZFwiKSA9PiB7XHJcbiAgICAgIHNldFNlbGVjdGluZ1N0ZXAoc2VjdGlvbik7XHJcbiAgICAgIHNldElzT3Blbih0cnVlKTtcclxuICAgICAgc2V0SG92ZXJEYXRlKG51bGwpO1xyXG5cclxuICAgICAgY29uc3QgYmFzZSA9IHNlY3Rpb24gPT09IFwic3RhcnRcIiA/IHN0YXJ0RGF0ZSB8fCBlbmREYXRlIHx8IG5vdyA6IGVuZERhdGUgfHwgc3RhcnREYXRlIHx8IG5vdztcclxuICAgICAgc2V0Q3VycmVudE1vbnRoKGJhc2UuZ2V0TW9udGgoKSk7XHJcbiAgICAgIHNldEN1cnJlbnRZZWFyKGJhc2UuZ2V0RnVsbFllYXIoKSk7XHJcbiAgICB9LFxyXG4gICAgW2VuZERhdGUsIG5vdywgc3RhcnREYXRlXVxyXG4gICk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoYXV0b09wZW5SZXF1ZXN0SWQgPD0gMCkgcmV0dXJuO1xyXG4gICAgc2V0U2VsZWN0aW5nU3RlcChcInN0YXJ0XCIpO1xyXG4gICAgc2V0SXNPcGVuKHRydWUpO1xyXG4gICAgc2V0SG92ZXJEYXRlKG51bGwpO1xyXG4gICAgY29uc3QgYmFzZSA9IHN0YXJ0RGF0ZSB8fCBlbmREYXRlIHx8IG5vdztcclxuICAgIHNldEN1cnJlbnRNb250aChiYXNlLmdldE1vbnRoKCkpO1xyXG4gICAgc2V0Q3VycmVudFllYXIoYmFzZS5nZXRGdWxsWWVhcigpKTtcclxuICB9LCBbYXV0b09wZW5SZXF1ZXN0SWRdKTtcclxuXHJcbiAgY29uc3Qgb25BY3RpdmF0b3JLZXlEb3duID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoZXZlbnQ6IFJlYWN0LktleWJvYXJkRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB7XHJcbiAgICAgIGlmIChldmVudC5rZXkgIT09IFwiRW50ZXJcIiAmJiBldmVudC5rZXkgIT09IFwiIFwiKSByZXR1cm47XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIG9wZW5Qb3BvdmVyKFwic3RhcnRcIik7XHJcbiAgICB9LFxyXG4gICAgW29wZW5Qb3BvdmVyXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IG9uU2VjdGlvbktleURvd24gPSB1c2VDYWxsYmFjayhcclxuICAgIChldmVudDogUmVhY3QuS2V5Ym9hcmRFdmVudDxIVE1MRGl2RWxlbWVudD4sIHNlY3Rpb246IFwic3RhcnRcIiB8IFwiZW5kXCIpID0+IHtcclxuICAgICAgaWYgKGV2ZW50LmtleSAhPT0gXCJFbnRlclwiICYmIGV2ZW50LmtleSAhPT0gXCIgXCIpIHJldHVybjtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgb3BlblBvcG92ZXIoc2VjdGlvbik7XHJcbiAgICB9LFxyXG4gICAgW29wZW5Qb3BvdmVyXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IG9uQ2xlYXIgPSB1c2VDYWxsYmFjaygoZXZlbnQ6IFJlYWN0Lk1vdXNlRXZlbnQpID0+IHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIHNldFN0YXJ0RGF0ZShudWxsKTtcclxuICAgIHNldEVuZERhdGUobnVsbCk7XHJcbiAgICBzZXRIb3ZlckRhdGUobnVsbCk7XHJcbiAgICBzZXRTZWxlY3RpbmdTdGVwKFwic3RhcnRcIik7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBvblByZXZNb250aCA9IHVzZUNhbGxiYWNrKChldmVudDogUmVhY3QuTW91c2VFdmVudDxIVE1MQnV0dG9uRWxlbWVudD4pID0+IHtcclxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgc2V0Q3VycmVudE1vbnRoKChwcmV2aW91cykgPT4ge1xyXG4gICAgICBjb25zdCBuZXh0ID0gcHJldmlvdXMgLSAxO1xyXG4gICAgICBpZiAobmV4dCA8IDApIHtcclxuICAgICAgICBzZXRDdXJyZW50WWVhcigoeWVhcikgPT4geWVhciAtIDEpO1xyXG4gICAgICAgIHJldHVybiAxMTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gbmV4dDtcclxuICAgIH0pO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3Qgb25OZXh0TW9udGggPSB1c2VDYWxsYmFjaygoZXZlbnQ6IFJlYWN0Lk1vdXNlRXZlbnQ8SFRNTEJ1dHRvbkVsZW1lbnQ+KSA9PiB7XHJcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIHNldEN1cnJlbnRNb250aCgocHJldmlvdXMpID0+IHtcclxuICAgICAgY29uc3QgbmV4dCA9IHByZXZpb3VzICsgMTtcclxuICAgICAgaWYgKG5leHQgPiAxMSkge1xyXG4gICAgICAgIHNldEN1cnJlbnRZZWFyKCh5ZWFyKSA9PiB5ZWFyICsgMSk7XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG5leHQ7XHJcbiAgICB9KTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IG9uRGF5Q2xpY2sgPSB1c2VDYWxsYmFjayhcclxuICAgIChkYXk6IEhpc3RvcnlNYW51YWxEYXlDZWxsKSA9PiB7XHJcbiAgICAgIGlmICghZGF5LmRhdGUgfHwgZGF5LmRpc2FibGVkKSByZXR1cm47XHJcblxyXG4gICAgICBjb25zdCBuZXh0RGF0ZSA9IG5ldyBEYXRlKGRheS5kYXRlLmdldEZ1bGxZZWFyKCksIGRheS5kYXRlLmdldE1vbnRoKCksIGRheS5kYXRlLmdldERhdGUoKSk7XHJcblxyXG4gICAgICBpZiAoIXN0YXJ0RGF0ZSB8fCBzZWxlY3RpbmdTdGVwID09PSBcInN0YXJ0XCIpIHtcclxuICAgICAgICBzZXRTdGFydERhdGUobmV4dERhdGUpO1xyXG4gICAgICAgIGlmIChlbmREYXRlICYmIGlzQmVmb3JlRGF5KGVuZERhdGUsIG5leHREYXRlKSkge1xyXG4gICAgICAgICAgc2V0RW5kRGF0ZShudWxsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2V0U2VsZWN0aW5nU3RlcChcImVuZFwiKTtcclxuICAgICAgICBzZXRDdXJyZW50TW9udGgobmV4dERhdGUuZ2V0TW9udGgoKSk7XHJcbiAgICAgICAgc2V0Q3VycmVudFllYXIobmV4dERhdGUuZ2V0RnVsbFllYXIoKSk7XHJcbiAgICAgICAgZm9jdXNEYXRlUmFuZ2VTZWN0aW9uKGFjdGl2YXRvclJlZi5jdXJyZW50LCBcImVuZFwiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChzZWxlY3RpbmdTdGVwID09PSBcImVuZFwiKSB7XHJcbiAgICAgICAgbGV0IGZpbmFsU3RhcnQgPSBzdGFydERhdGU7XHJcbiAgICAgICAgbGV0IGZpbmFsRW5kID0gbmV4dERhdGU7XHJcblxyXG4gICAgICAgIGlmIChpc0JlZm9yZURheShuZXh0RGF0ZSwgc3RhcnREYXRlKSkge1xyXG4gICAgICAgICAgZmluYWxTdGFydCA9IG5leHREYXRlO1xyXG4gICAgICAgICAgZmluYWxFbmQgPSBzdGFydERhdGU7XHJcbiAgICAgICAgICBzZXRFbmREYXRlKGZpbmFsRW5kKTtcclxuICAgICAgICAgIHNldFN0YXJ0RGF0ZShmaW5hbFN0YXJ0KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgc2V0RW5kRGF0ZShmaW5hbEVuZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvblJhbmdlQ29tcGxldGU/Lih0b0lzb0RhdGVSYW5nZVZhbHVlKGZpbmFsU3RhcnQpLCB0b0lzb0RhdGVSYW5nZVZhbHVlKGZpbmFsRW5kKSk7XHJcbiAgICAgICAgc2V0U2VsZWN0aW5nU3RlcChcImRvbmVcIik7XHJcbiAgICAgICAgc2V0SXNPcGVuKGZhbHNlKTtcclxuICAgICAgICBzZXRIb3ZlckRhdGUobnVsbCk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBbZW5kRGF0ZSwgb25SYW5nZUNvbXBsZXRlLCBzZWxlY3RpbmdTdGVwLCBzdGFydERhdGVdXHJcbiAgKTtcclxuXHJcbiAgY29uc3Qgb25EYXlIb3ZlciA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKGRheTogSGlzdG9yeU1hbnVhbERheUNlbGwpID0+IHtcclxuICAgICAgaWYgKCFkYXkuZGF0ZSB8fCBzZWxlY3RpbmdTdGVwICE9PSBcImVuZFwiIHx8ICFzdGFydERhdGUpIHJldHVybjtcclxuICAgICAgc2V0SG92ZXJEYXRlKG5ldyBEYXRlKGRheS5kYXRlLmdldEZ1bGxZZWFyKCksIGRheS5kYXRlLmdldE1vbnRoKCksIGRheS5kYXRlLmdldERhdGUoKSkpO1xyXG4gICAgfSxcclxuICAgIFtzZWxlY3RpbmdTdGVwLCBzdGFydERhdGVdXHJcbiAgKTtcclxuXHJcbiAgY29uc3Qgb25HcmlkTW91c2VMZWF2ZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIHNldEhvdmVyRGF0ZShudWxsKTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IGNhbGVuZGFyID0gdXNlTWVtbygoKSA9PiB7XHJcbiAgICByZXR1cm4gYnVpbGRDYWxlbmRhck1vbnRoKGN1cnJlbnRZZWFyLCBjdXJyZW50TW9udGgsIGxvY2FsZSk7XHJcbiAgfSwgW2N1cnJlbnRNb250aCwgY3VycmVudFllYXIsIGxvY2FsZV0pO1xyXG5cclxuICBjb25zdCBkYXlDZWxscyA9IHVzZU1lbW8oXHJcbiAgICAoKSA9PiBidWlsZERhdGVSYW5nZURheUNlbGxzKGNhbGVuZGFyLmNlbGxzLCBzdGFydERhdGUsIGVuZERhdGUsIGhvdmVyRGF0ZSwgc2VsZWN0aW5nU3RlcCksXHJcbiAgICBbY2FsZW5kYXIuY2VsbHMsIGVuZERhdGUsIGhvdmVyRGF0ZSwgc2VsZWN0aW5nU3RlcCwgc3RhcnREYXRlXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGxhYmVsRnJvbSA9IHRvU2VudGVuY2VDYXNlKGluZFQoXCJIaXN0b3J5X0Zyb21cIiwgXCJGcm9tXCIpLCBsb2NhbGUpO1xyXG4gIGNvbnN0IGxhYmVsVG8gPSB0b1NlbnRlbmNlQ2FzZShpbmRUKFwiSGlzdG9yeV9Ub1wiLCBcIlRvXCIpLCBsb2NhbGUpO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPEhpc3RvcnlNYW51YWxEYXRlUGlja2VyXHJcbiAgICAgIGFjdGl2YXRvclJlZj17YWN0aXZhdG9yUmVmfVxyXG4gICAgICBwb3BvdmVyUmVmPXtwb3BvdmVyUmVmfVxyXG4gICAgICBzaG93TWFudWFsRXJyb3I9e3Nob3dNYW51YWxFcnJvcn1cclxuICAgICAgc2hvd1N0YXJ0RXJyb3I9e3Nob3dTdGFydEVycm9yfVxyXG4gICAgICBzaG93RW5kRXJyb3I9e3Nob3dFbmRFcnJvcn1cclxuICAgICAgZmlsdGVyVGl0bGU9e2luZFQoXCJIaXN0b3J5X0ZpbHRlcl9EYXRlXCIsIFwiRGF0ZVwiKX1cclxuICAgICAgaXNPcGVuPXtpc09wZW59XHJcbiAgICAgIHNlbGVjdGluZ1N0ZXA9e3NlbGVjdGluZ1N0ZXB9XHJcbiAgICAgIGxhYmVsRnJvbT17bGFiZWxGcm9tfVxyXG4gICAgICBsYWJlbFRvPXtsYWJlbFRvfVxyXG4gICAgICBzdGFydERhdGVUZXh0PXtzdGFydERhdGUgPyBmb3JtYXREYXRlUmFuZ2VEaXNwbGF5KHN0YXJ0RGF0ZSwgbG9jYWxlKSA6IGluZFQoXCJIaXN0b3J5X0FkZERhdGVcIiwgXCJBZGQgZGF0ZVwiKX1cclxuICAgICAgZW5kRGF0ZVRleHQ9e2VuZERhdGUgPyBmb3JtYXREYXRlUmFuZ2VEaXNwbGF5KGVuZERhdGUsIGxvY2FsZSkgOiBpbmRUKFwiSGlzdG9yeV9BZGREYXRlXCIsIFwiQWRkIGRhdGVcIil9XHJcbiAgICAgIGNsZWFyUmFuZ2VMYWJlbD17aW5kVChcIkhpc3RvcnlfQ2xlYXJSYW5nZVwiLCBcIkNsZWFyIHJhbmdlXCIpfVxyXG4gICAgICBoYXNTZWxlY3RlZFJhbmdlPXshIXN0YXJ0RGF0ZSB8fCAhIWVuZERhdGV9XHJcbiAgICAgIG1vbnRoTGFiZWw9e2NhbGVuZGFyLm1vbnRoTGFiZWx9XHJcbiAgICAgIHdlZWtEYXlMYWJlbHM9e1tcclxuICAgICAgICBpbmRUKFwiSGlzdG9yeV9EYXlfTW9uXCIsIFwiTW9uXCIpLFxyXG4gICAgICAgIGluZFQoXCJIaXN0b3J5X0RheV9UdWVcIiwgXCJUdWVcIiksXHJcbiAgICAgICAgaW5kVChcIkhpc3RvcnlfRGF5X1dlZFwiLCBcIldlZFwiKSxcclxuICAgICAgICBpbmRUKFwiSGlzdG9yeV9EYXlfVGh1XCIsIFwiVGh1XCIpLFxyXG4gICAgICAgIGluZFQoXCJIaXN0b3J5X0RheV9GcmlcIiwgXCJGcmlcIiksXHJcbiAgICAgICAgaW5kVChcIkhpc3RvcnlfRGF5X1NhdFwiLCBcIlNhdFwiKSxcclxuICAgICAgICBpbmRUKFwiSGlzdG9yeV9EYXlfU3VuXCIsIFwiU3VuXCIpLFxyXG4gICAgICBdfVxyXG4gICAgICBzdGF0dXNUZXh0PXtcclxuICAgICAgICBzZWxlY3RpbmdTdGVwID09PSBcInN0YXJ0XCJcclxuICAgICAgICAgID8gaW5kVChcIkhpc3RvcnlfU3RhdHVzX1NlbGVjdFN0YXJ0XCIsIFwiU2VsZWN0IHN0YXJ0IGRhdGVcIilcclxuICAgICAgICAgIDogaW5kVChcIkhpc3RvcnlfU3RhdHVzX1NlbGVjdEVuZFwiLCBcIlNlbGVjdCBlbmQgZGF0ZVwiKVxyXG4gICAgICB9XHJcbiAgICAgIGRheUNlbGxzPXtkYXlDZWxsc31cclxuICAgICAgcHJldk1vbnRoTGFiZWw9e2luZFQoXCJIaXN0b3J5X1ByZXZNb250aFwiLCBcIlByZXZpb3VzIG1vbnRoXCIpfVxyXG4gICAgICBuZXh0TW9udGhMYWJlbD17aW5kVChcIkhpc3RvcnlfTmV4dE1vbnRoXCIsIFwiTmV4dCBtb250aFwiKX1cclxuICAgICAgb25PcGVuUG9wb3Zlcj17b3BlblBvcG92ZXJ9XHJcbiAgICAgIG9uQWN0aXZhdG9yS2V5RG93bj17b25BY3RpdmF0b3JLZXlEb3dufVxyXG4gICAgICBvblNlY3Rpb25LZXlEb3duPXtvblNlY3Rpb25LZXlEb3dufVxyXG4gICAgICBvbkNsZWFyPXtvbkNsZWFyfVxyXG4gICAgICBvblByZXZNb250aD17b25QcmV2TW9udGh9XHJcbiAgICAgIG9uTmV4dE1vbnRoPXtvbk5leHRNb250aH1cclxuICAgICAgb25HcmlkTW91c2VMZWF2ZT17b25HcmlkTW91c2VMZWF2ZX1cclxuICAgICAgb25EYXlDbGljaz17b25EYXlDbGlja31cclxuICAgICAgb25EYXlIb3Zlcj17b25EYXlIb3Zlcn1cclxuICAgIC8+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VEYXRlUmFuZ2VGaWx0ZXI7XHJcbiIsICJpbXBvcnQgeyBjbGFzc05hbWVzIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2NsYXNzTmFtZXMudHNcIjtcclxuaW1wb3J0IHR5cGUgeyBIaXN0b3J5TWFudWFsRGF5Q2VsbCB9IGZyb20gXCIuLi8uLi92aXNpdGFzL2hpc3RvcmlhbC9IaXN0b3J5TWFudWFsRGF0ZVBpY2tlci50c3hcIjtcclxuXHJcbmV4cG9ydCB0eXBlIENhbGVuZGFyQ2VsbCA9IHtcclxuICBkYXRlOiBEYXRlIHwgbnVsbDtcclxuICBpc286IHN0cmluZztcclxuICBpc0VtcHR5OiBib29sZWFuO1xyXG59O1xyXG5cclxuY29uc3QgcGFkID0gKHZhbHVlOiBudW1iZXIpOiBzdHJpbmcgPT4gdmFsdWUudG9TdHJpbmcoKS5wYWRTdGFydCgyLCBcIjBcIik7XHJcblxyXG5leHBvcnQgY29uc3QgdG9Jc29EYXRlUmFuZ2VWYWx1ZSA9IChkYXRlOiBEYXRlKTogc3RyaW5nID0+IHtcclxuICByZXR1cm4gYCR7ZGF0ZS5nZXRGdWxsWWVhcigpfS0ke3BhZChkYXRlLmdldE1vbnRoKCkgKyAxKX0tJHtwYWQoZGF0ZS5nZXREYXRlKCkpfWA7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgcGFyc2VJc29EYXRlUmFuZ2VWYWx1ZSA9ICh2YWx1ZTogc3RyaW5nKTogRGF0ZSB8IG51bGwgPT4ge1xyXG4gIGlmICghdmFsdWUpIHJldHVybiBudWxsO1xyXG4gIGNvbnN0IHRyaW1tZWQgPSBTdHJpbmcodmFsdWUpLnRyaW0oKTtcclxuICBpZiAoIXRyaW1tZWQpIHJldHVybiBudWxsO1xyXG5cclxuICBjb25zdCBkYXRlUGFydCA9IHRyaW1tZWQuc3BsaXQoXCJUXCIpWzBdLnNwbGl0KFwiIFwiKVswXTtcclxuICBpZiAoIS9eXFxkezR9LVxcZHsyfS1cXGR7Mn0kLy50ZXN0KGRhdGVQYXJ0KSkgcmV0dXJuIG51bGw7XHJcblxyXG4gIGNvbnN0IFt5ZWFyLCBtb250aCwgZGF5XSA9IGRhdGVQYXJ0LnNwbGl0KFwiLVwiKS5tYXAoTnVtYmVyKTtcclxuICByZXR1cm4gbmV3IERhdGUoeWVhciwgbW9udGggLSAxLCBkYXkpO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGlzU2FtZURheSA9IChhOiBEYXRlIHwgbnVsbCwgYjogRGF0ZSB8IG51bGwpOiBib29sZWFuID0+IHtcclxuICByZXR1cm4gISEoYSAmJiBiICYmIGEuZ2V0VGltZSgpID09PSBiLmdldFRpbWUoKSk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgaXNCZWZvcmVEYXkgPSAoYTogRGF0ZSB8IG51bGwsIGI6IERhdGUgfCBudWxsKTogYm9vbGVhbiA9PiB7XHJcbiAgcmV0dXJuICEhKGEgJiYgYiAmJiBhLmdldFRpbWUoKSA8IGIuZ2V0VGltZSgpKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBmb2N1c0RhdGVSYW5nZVNlY3Rpb24gPSAoY29udGFpbmVyOiBIVE1MRGl2RWxlbWVudCB8IG51bGwsIHNlY3Rpb246IFwic3RhcnRcIiB8IFwiZW5kXCIpOiB2b2lkID0+IHtcclxuICBpZiAoIWNvbnRhaW5lcikgcmV0dXJuO1xyXG4gIGNvbnN0IHRhcmdldCA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yPEhUTUxFbGVtZW50PihgW2RhdGEtc2VjdGlvbj1cIiR7c2VjdGlvbn1cIl1gKTtcclxuICBpZiAoIXRhcmdldCkgcmV0dXJuO1xyXG4gIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gdGFyZ2V0LmZvY3VzKCkpO1xyXG59O1xyXG5cclxuY29uc3QgdG9UaXRsZUNhc2UgPSAodmFsdWU6IHN0cmluZywgbG9jYWxlOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xyXG4gIGlmICghdmFsdWUpIHJldHVybiBcIlwiO1xyXG4gIGNvbnN0IGxvd2VyID0gdmFsdWUudG9Mb2NhbGVMb3dlckNhc2UobG9jYWxlKTtcclxuICByZXR1cm4gbG93ZXJbMF0udG9Mb2NhbGVVcHBlckNhc2UobG9jYWxlKSArIGxvd2VyLnNsaWNlKDEpO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHRvU2VudGVuY2VDYXNlID0gKHZhbHVlOiBzdHJpbmcsIGxvY2FsZTogc3RyaW5nKTogc3RyaW5nID0+IHtcclxuICBpZiAoIXZhbHVlKSByZXR1cm4gXCJcIjtcclxuICBjb25zdCB0cmltbWVkID0gdmFsdWUudHJpbSgpO1xyXG4gIGlmICghdHJpbW1lZCkgcmV0dXJuIHRyaW1tZWQ7XHJcbiAgY29uc3QgbG93ZXIgPSB0cmltbWVkLnRvTG9jYWxlTG93ZXJDYXNlKGxvY2FsZSk7XHJcbiAgcmV0dXJuIGxvd2VyWzBdLnRvTG9jYWxlVXBwZXJDYXNlKGxvY2FsZSkgKyBsb3dlci5zbGljZSgxKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBmb3JtYXREYXRlUmFuZ2VEaXNwbGF5ID0gKGRhdGU6IERhdGUsIGxvY2FsZTogc3RyaW5nKTogc3RyaW5nID0+IHtcclxuICByZXR1cm4gZGF0ZVxyXG4gICAgLnRvTG9jYWxlRGF0ZVN0cmluZyhsb2NhbGUsIHtcclxuICAgICAgZGF5OiBcIm51bWVyaWNcIixcclxuICAgICAgbW9udGg6IFwic2hvcnRcIixcclxuICAgICAgeWVhcjogXCJudW1lcmljXCIsXHJcbiAgICB9KVxyXG4gICAgLnJlcGxhY2UoL1xcLi9nLCBcIlwiKVxyXG4gICAgLnRvTG93ZXJDYXNlKCk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZm9ybWF0TW9udGhMYWJlbCA9IChkYXRlOiBEYXRlLCBsb2NhbGU6IHN0cmluZyk6IHN0cmluZyA9PiB7XHJcbiAgY29uc3QgbW9udGhOYW1lID0gZGF0ZS50b0xvY2FsZURhdGVTdHJpbmcobG9jYWxlLCB7IG1vbnRoOiBcImxvbmdcIiB9KTtcclxuICByZXR1cm4gYCR7dG9UaXRsZUNhc2UobW9udGhOYW1lLCBsb2NhbGUpfSAke2RhdGUuZ2V0RnVsbFllYXIoKX1gO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHJlc29sdmVVaUxvY2FsZSA9ICgpOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IGZyb21IdG1sID0gdHlwZW9mIGRvY3VtZW50ICE9PSBcInVuZGVmaW5lZFwiID8gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmxhbmcgOiBcIlwiO1xyXG4gIHJldHVybiBmcm9tSHRtbCAmJiBTdHJpbmcoZnJvbUh0bWwpLnRyaW0oKSA/IGZyb21IdG1sIDogXCJlcy1FU1wiO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGJ1aWxkQ2FsZW5kYXJNb250aCA9ICh5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXIsIGxvY2FsZTogc3RyaW5nKTogeyBtb250aExhYmVsOiBzdHJpbmc7IGNlbGxzOiBDYWxlbmRhckNlbGxbXSB9ID0+IHtcclxuICBjb25zdCBmaXJzdERheSA9IG5ldyBEYXRlKHllYXIsIG1vbnRoLCAxKTtcclxuICBjb25zdCBkYXlzSW5Nb250aCA9IG5ldyBEYXRlKHllYXIsIG1vbnRoICsgMSwgMCkuZ2V0RGF0ZSgpO1xyXG4gIGNvbnN0IG9mZnNldCA9IChmaXJzdERheS5nZXREYXkoKSArIDYpICUgNztcclxuICBjb25zdCBjZWxsczogQ2FsZW5kYXJDZWxsW10gPSBbXTtcclxuXHJcbiAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IG9mZnNldDsgaW5kZXggKz0gMSkge1xyXG4gICAgY2VsbHMucHVzaCh7IGRhdGU6IG51bGwsIGlzbzogXCJcIiwgaXNFbXB0eTogdHJ1ZSB9KTtcclxuICB9XHJcblxyXG4gIGZvciAobGV0IGRheSA9IDE7IGRheSA8PSBkYXlzSW5Nb250aDsgZGF5ICs9IDEpIHtcclxuICAgIGNvbnN0IGRhdGVPYmogPSBuZXcgRGF0ZSh5ZWFyLCBtb250aCwgZGF5KTtcclxuICAgIGNlbGxzLnB1c2goeyBkYXRlOiBkYXRlT2JqLCBpc286IHRvSXNvRGF0ZVJhbmdlVmFsdWUoZGF0ZU9iaiksIGlzRW1wdHk6IGZhbHNlIH0pO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIG1vbnRoTGFiZWw6IGZvcm1hdE1vbnRoTGFiZWwoZmlyc3REYXksIGxvY2FsZSksXHJcbiAgICBjZWxscyxcclxuICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGJ1aWxkRGF0ZVJhbmdlRGF5Q2VsbHMgPSAoXHJcbiAgY2VsbHM6IENhbGVuZGFyQ2VsbFtdLFxyXG4gIHN0YXJ0RGF0ZTogRGF0ZSB8IG51bGwsXHJcbiAgZW5kRGF0ZTogRGF0ZSB8IG51bGwsXHJcbiAgaG92ZXJEYXRlOiBEYXRlIHwgbnVsbCxcclxuICBzZWxlY3RpbmdTdGVwOiBcInN0YXJ0XCIgfCBcImVuZFwiIHwgXCJkb25lXCJcclxuKTogSGlzdG9yeU1hbnVhbERheUNlbGxbXSA9PiB7XHJcbiAgY29uc3QgcHJldmlld0VuZCA9IGVuZERhdGUgfHwgKHNlbGVjdGluZ1N0ZXAgPT09IFwiZW5kXCIgPyBob3ZlckRhdGUgOiBudWxsKTtcclxuXHJcbiAgcmV0dXJuIGNlbGxzLm1hcCgoY2VsbCwgaW5kZXgpID0+IHtcclxuICAgIGlmIChjZWxsLmlzRW1wdHkgfHwgIWNlbGwuZGF0ZSkge1xyXG4gICAgICByZXR1cm4geyBrZXk6IGBlbXB0eS0ke2luZGV4fWAsIGlzRW1wdHk6IHRydWUgfTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBkYXRlT2JqID0gY2VsbC5kYXRlO1xyXG4gICAgY29uc3QgaXNTdGFydCA9IGlzU2FtZURheShkYXRlT2JqLCBzdGFydERhdGUpO1xyXG4gICAgY29uc3QgaXNFbmQgPSBpc1NhbWVEYXkoZGF0ZU9iaiwgZW5kRGF0ZSk7XHJcbiAgICBjb25zdCBpblJhbmdlID0gc3RhcnREYXRlICYmIHByZXZpZXdFbmQgJiYgaXNCZWZvcmVEYXkoc3RhcnREYXRlLCBkYXRlT2JqKSAmJiBpc0JlZm9yZURheShkYXRlT2JqLCBwcmV2aWV3RW5kKTtcclxuICAgIGNvbnN0IGhvdmVyUmFuZ2UgPSBzdGFydERhdGUgJiYgIWVuZERhdGUgJiYgaG92ZXJEYXRlICYmIGlzQmVmb3JlRGF5KHN0YXJ0RGF0ZSwgZGF0ZU9iaikgJiYgaXNCZWZvcmVEYXkoZGF0ZU9iaiwgaG92ZXJEYXRlKTtcclxuICAgIGNvbnN0IGRpc2FibGVkID0gc2VsZWN0aW5nU3RlcCA9PT0gXCJlbmRcIiAmJiAhIXN0YXJ0RGF0ZSAmJiBpc0JlZm9yZURheShkYXRlT2JqLCBzdGFydERhdGUpO1xyXG4gICAgY29uc3QgaXNUb2RheSA9IGlzU2FtZURheShkYXRlT2JqLCBuZXcgRGF0ZSgpKTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBrZXk6IGNlbGwuaXNvLFxyXG4gICAgICBpc0VtcHR5OiBmYWxzZSxcclxuICAgICAgZGF0ZTogZGF0ZU9iaixcclxuICAgICAgaXNvOiBjZWxsLmlzbyxcclxuICAgICAgZGF5TGFiZWw6IGRhdGVPYmouZ2V0RGF0ZSgpLFxyXG4gICAgICBkYXlDbGFzczogY2xhc3NOYW1lcyhcclxuICAgICAgICBcImRycC1kYXlcIixcclxuICAgICAgICBpc1N0YXJ0ID8gXCJzdGFydCByYW5nZS1zdGFydFwiIDogXCJcIixcclxuICAgICAgICBpc0VuZCA/IFwiZW5kIHJhbmdlLWVuZFwiIDogXCJcIixcclxuICAgICAgICBpblJhbmdlID8gXCJpbi1yYW5nZVwiIDogXCJcIixcclxuICAgICAgICBob3ZlclJhbmdlID8gXCJob3Zlci1yYW5nZVwiIDogXCJcIixcclxuICAgICAgICBkaXNhYmxlZCA/IFwiZGlzYWJsZWRcIiA6IFwiXCIsXHJcbiAgICAgICAgaXNUb2RheSA/IFwidG9kYXlcIiA6IFwiXCJcclxuICAgICAgKSxcclxuICAgICAgZGlzYWJsZWQsXHJcbiAgICB9O1xyXG4gIH0pO1xyXG59O1xyXG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgQWN0aW9uQnV0dG9uIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvQWN0aW9uQnV0dG9uLnRzeFwiO1xyXG5cclxudHlwZSBFeHBlbnNlRmlsdGVyQWN0aW9uc1Byb3BzID0ge1xyXG4gIGNsZWFyTGFiZWw6IHN0cmluZztcclxuICBhcHBseUxhYmVsOiBzdHJpbmc7XHJcbiAgb25DbGVhcjogKCkgPT4gdm9pZDtcclxuICBvbkFwcGx5OiAoKSA9PiB2b2lkO1xyXG59O1xyXG5cclxuLy8gU2hhcmVkIGFwcGx5L2NsZWFyIGFjdGlvbiByb3cgZm9yIGV4cGVuc2Ugc2hlZXQgZmlsdGVycy5cclxuY29uc3QgRXhwZW5zZUZpbHRlckFjdGlvbnMgPSAoe1xyXG4gIGNsZWFyTGFiZWwsXHJcbiAgYXBwbHlMYWJlbCxcclxuICBvbkNsZWFyLFxyXG4gIG9uQXBwbHksXHJcbn06IEV4cGVuc2VGaWx0ZXJBY3Rpb25zUHJvcHMpID0+IHtcclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJtdC0xIGdyaWQgZ3JpZC1jb2xzLTIgZ2FwLTIgaGlzdG9yeS1maWx0ZXItYWN0aW9uc1wiPlxyXG4gICAgICA8QWN0aW9uQnV0dG9uIGxhYmVsPXtjbGVhckxhYmVsfSBjbGFzc05hbWU9XCJ3LWZ1bGxcIiBvbkNsaWNrPXtvbkNsZWFyfSAvPlxyXG4gICAgICA8QWN0aW9uQnV0dG9uIGxhYmVsPXthcHBseUxhYmVsfSBjbGFzc05hbWU9XCJ3LWZ1bGxcIiBvbkNsaWNrPXtvbkFwcGx5fSAvPlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VGaWx0ZXJBY3Rpb25zO1xyXG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZU1lbW8gfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFNlbGVjdENvbWJvYm94IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvU2VsZWN0Q29tYm9ib3gudHN4XCI7XHJcbmltcG9ydCB0eXBlIHsgQXV0aE1hbmFnZWRVc2VyIH0gZnJvbSBcIi4uLy4uLy4uL2NvbnRleHQvQXV0aENvbnRleHQudHN4XCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNlbGVjdE9wdGlvbiB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlU2VsZWN0T3B0aW9ucy50c1wiO1xyXG5cclxudHlwZSBFeHBlbnNlTWFuYWdlZFVzZXJGaWx0ZXJTZWxlY3RQcm9wcyA9IHtcclxuICBsYWJlbDogc3RyaW5nO1xyXG4gIHBsYWNlaG9sZGVyOiBzdHJpbmc7XHJcbiAgdmFsdWU6IHN0cmluZztcclxuICB1c2VyczogQXV0aE1hbmFnZWRVc2VyW107XHJcbiAgYWxsT3B0aW9uPzogRXhwZW5zZVNlbGVjdE9wdGlvbiB8IG51bGw7XHJcbiAgb25DaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIHJlYWRPbmx5PzogYm9vbGVhbjtcclxuICBkaXNhYmxlZD86IGJvb2xlYW47XHJcbiAgc2hvd0xhYmVsPzogYm9vbGVhbjtcclxuICBjbGVhck9uRW1wdHlJbnB1dD86IGJvb2xlYW47XHJcbn07XHJcblxyXG5jb25zdCB0b09wdGlvblRleHQgPSAodXNlcjogQXV0aE1hbmFnZWRVc2VyKTogc3RyaW5nID0+IHtcclxuICBjb25zdCBheFVzZXJJZCA9IFN0cmluZyh1c2VyLmF4VXNlcklkIHx8IFwiXCIpLnRyaW0oKTtcclxuICBjb25zdCBuYW1lID0gU3RyaW5nKHVzZXIubmFtZSB8fCBcIlwiKS50cmltKCk7XHJcbiAgaWYgKCFheFVzZXJJZCkgcmV0dXJuIFwiXCI7XHJcbiAgaWYgKCFuYW1lIHx8IG5hbWUudG9VcHBlckNhc2UoKSA9PT0gYXhVc2VySWQudG9VcHBlckNhc2UoKSkge1xyXG4gICAgcmV0dXJuIGF4VXNlcklkO1xyXG4gIH1cclxuICByZXR1cm4gYCR7YXhVc2VySWR9IC0gJHtuYW1lfWA7XHJcbn07XHJcblxyXG4vLyBGaXhlZCBsb2NhbCB1c2VyIHNlbGVjdG9yIHVzZWQgdG8gZmlsdGVyIGV4cGVuc2Ugc2hlZXRzIGJ5IG1hbmFnZWQgQXggdXNlci5cclxuY29uc3QgRXhwZW5zZU1hbmFnZWRVc2VyRmlsdGVyU2VsZWN0ID0gKHtcclxuICBsYWJlbCxcclxuICBwbGFjZWhvbGRlcixcclxuICB2YWx1ZSxcclxuICB1c2VycyxcclxuICBhbGxPcHRpb24gPSBudWxsLFxyXG4gIG9uQ2hhbmdlLFxyXG4gIHJlYWRPbmx5ID0gZmFsc2UsXHJcbiAgZGlzYWJsZWQgPSBmYWxzZSxcclxuICBzaG93TGFiZWwgPSB0cnVlLFxyXG4gIGNsZWFyT25FbXB0eUlucHV0ID0gZmFsc2UsXHJcbn06IEV4cGVuc2VNYW5hZ2VkVXNlckZpbHRlclNlbGVjdFByb3BzKSA9PiB7XHJcbiAgY29uc3Qgb3B0aW9ucyA9IHVzZU1lbW88RXhwZW5zZVNlbGVjdE9wdGlvbltdPigoKSA9PiB7XHJcbiAgICBjb25zdCB1c2VyT3B0aW9ucyA9IChBcnJheS5pc0FycmF5KHVzZXJzKSA/IHVzZXJzIDogW10pXHJcbiAgICAgIC5tYXAoKGVudHJ5KSA9PiB7XHJcbiAgICAgICAgY29uc3QgYXhVc2VySWQgPSBTdHJpbmcoZW50cnkuYXhVc2VySWQgfHwgXCJcIikudHJpbSgpO1xyXG4gICAgICAgIGNvbnN0IGxhYmVsID0gdG9PcHRpb25UZXh0KGVudHJ5KTtcclxuICAgICAgICBpZiAoIWF4VXNlcklkIHx8ICFsYWJlbCkgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHZhbHVlOiBheFVzZXJJZCxcclxuICAgICAgICAgIHRleHQ6IGxhYmVsLFxyXG4gICAgICAgIH0gYXMgRXhwZW5zZVNlbGVjdE9wdGlvbjtcclxuICAgICAgfSlcclxuICAgICAgLmZpbHRlcigoZW50cnkpOiBlbnRyeSBpcyBFeHBlbnNlU2VsZWN0T3B0aW9uID0+ICEhZW50cnkpO1xyXG4gICAgcmV0dXJuIGFsbE9wdGlvbiA/IFthbGxPcHRpb24sIC4uLnVzZXJPcHRpb25zXSA6IHVzZXJPcHRpb25zO1xyXG4gIH0sIFthbGxPcHRpb24sIHVzZXJzXSk7XHJcblxyXG4gIGNvbnN0IHNlbGVjdGVkVGV4dE1vZGUgPSBhbGxPcHRpb24gJiYgdmFsdWUgPT09IGFsbE9wdGlvbi52YWx1ZSA/IFwidGV4dFwiIDogXCJ2YWx1ZVwiO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPFNlbGVjdENvbWJvYm94XHJcbiAgICAgIGxhYmVsPXtsYWJlbH1cclxuICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxyXG4gICAgICBvcHRpb25zPXtvcHRpb25zfVxyXG4gICAgICB2YWx1ZT17dmFsdWV9XHJcbiAgICAgIG9uQ2hhbmdlPXtvbkNoYW5nZX1cclxuICAgICAgcmVhZE9ubHk9e3JlYWRPbmx5fVxyXG4gICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XHJcbiAgICAgIGlkQmFzZT1cImV4cGVuc2UtbWFuYWdlZC11c2VyLWZpbHRlclwiXHJcbiAgICAgIHBvcnRhbENsYXNzTmFtZT1cInZpc2l0YXMtdHlwb2dyYXBoeVwiXHJcbiAgICAgIHBhbmVsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcclxuICAgICAgYWxsb3dUZXh0SW5wdXRcclxuICAgICAgc2VsZWN0ZWRUZXh0TW9kZT17c2VsZWN0ZWRUZXh0TW9kZX1cclxuICAgICAgc2hvd0xhYmVsPXtzaG93TGFiZWx9XHJcbiAgICAgIGNsZWFyT25FbXB0eUlucHV0PXtjbGVhck9uRW1wdHlJbnB1dH1cclxuICAgIC8+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VNYW5hZ2VkVXNlckZpbHRlclNlbGVjdDtcclxuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IEZpbHRlckJ1dHRvbiBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0ZpbHRlckJ1dHRvbi50c3hcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVF1aWNrRGF0ZUZpbHRlcklkIH0gZnJvbSBcIi4uL2NvbnN0YW50cy9leHBlbnNlUXVpY2tEYXRlRmlsdGVyQ2F0YWxvZy50c1wiO1xyXG5cclxudHlwZSBFeHBlbnNlUXVpY2tEYXRlRmlsdGVyc1Byb3BzID0ge1xyXG4gIGFjdGl2ZVF1aWNrRmlsdGVyOiBFeHBlbnNlUXVpY2tEYXRlRmlsdGVySWQgfCBudWxsO1xyXG4gIG9uUXVpY2tGaWx0ZXJDaGFuZ2U6IChmaWx0ZXJJZDogRXhwZW5zZVF1aWNrRGF0ZUZpbHRlcklkKSA9PiB2b2lkO1xyXG59O1xyXG5cclxuLy8gU2hhcmVkIHF1aWNrIGRhdGUgZmlsdGVycyB1c2VkIGJ5IGV4cGVuc2Ugc2hlZXRzIGFuZCB0aWNrZXRzIHBhbmVscy5cclxuY29uc3QgRXhwZW5zZVF1aWNrRGF0ZUZpbHRlcnMgPSAoeyBhY3RpdmVRdWlja0ZpbHRlciwgb25RdWlja0ZpbHRlckNoYW5nZSB9OiBFeHBlbnNlUXVpY2tEYXRlRmlsdGVyc1Byb3BzKSA9PiB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBnYXAtMiBoaXN0b3J5LXF1aWNrLWZpbHRlcnNcIiBhcmlhLWxhYmVsPXtpbmRUKFwiSGlzdG9yeV9GaWx0ZXJfRGF0ZVwiLCBcIkRhdGVcIil9PlxyXG4gICAgICA8RmlsdGVyQnV0dG9uXHJcbiAgICAgICAgbGFiZWw9e2luZFQoXCJIaXN0b3J5X1F1aWNrX0N1c3RvbVwiLCBcIkRhdGVcIil9XHJcbiAgICAgICAgYWN0aXZlPXthY3RpdmVRdWlja0ZpbHRlciA9PT0gXCJjdXN0b21cIn1cclxuICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGxcIlxyXG4gICAgICAgIG9uQ2xpY2s9eygpID0+IG9uUXVpY2tGaWx0ZXJDaGFuZ2UoXCJjdXN0b21cIil9XHJcbiAgICAgIC8+XHJcbiAgICAgIDxGaWx0ZXJCdXR0b25cclxuICAgICAgICBsYWJlbD17aW5kVChcIkhpc3RvcnlfUXVpY2tfN0RheXNcIiwgXCI3IGRheXNcIil9XHJcbiAgICAgICAgYWN0aXZlPXthY3RpdmVRdWlja0ZpbHRlciA9PT0gXCJkYXlzLTdcIn1cclxuICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGxcIlxyXG4gICAgICAgIG9uQ2xpY2s9eygpID0+IG9uUXVpY2tGaWx0ZXJDaGFuZ2UoXCJkYXlzLTdcIil9XHJcbiAgICAgIC8+XHJcbiAgICAgIDxGaWx0ZXJCdXR0b25cclxuICAgICAgICBsYWJlbD17aW5kVChcIkhpc3RvcnlfUXVpY2tfMzBEYXlzXCIsIFwiMzAgZGF5c1wiKX1cclxuICAgICAgICBhY3RpdmU9e2FjdGl2ZVF1aWNrRmlsdGVyID09PSBcImRheXMtMzBcIn1cclxuICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGxcIlxyXG4gICAgICAgIG9uQ2xpY2s9eygpID0+IG9uUXVpY2tGaWx0ZXJDaGFuZ2UoXCJkYXlzLTMwXCIpfVxyXG4gICAgICAvPlxyXG4gICAgICA8RmlsdGVyQnV0dG9uXHJcbiAgICAgICAgbGFiZWw9e2luZFQoXCJIaXN0b3J5X1F1aWNrXzkwRGF5c1wiLCBcIjkwIGRheXNcIil9XHJcbiAgICAgICAgYWN0aXZlPXthY3RpdmVRdWlja0ZpbHRlciA9PT0gXCJkYXlzLTkwXCJ9XHJcbiAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsXCJcclxuICAgICAgICBvbkNsaWNrPXsoKSA9PiBvblF1aWNrRmlsdGVyQ2hhbmdlKFwiZGF5cy05MFwiKX1cclxuICAgICAgLz5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlUXVpY2tEYXRlRmlsdGVycztcclxuIiwgImltcG9ydCB0eXBlIHsgRXhwZW5zZVF1aWNrRGF0ZUZpbHRlcklkIH0gZnJvbSBcIi4uL2NvbnN0YW50cy9leHBlbnNlUXVpY2tEYXRlRmlsdGVyQ2F0YWxvZy50c1wiO1xyXG5pbXBvcnQgeyBzYWZlVGV4dCwgc3RhcnRPZkRheSwgdG9Jc29EYXRlIH0gZnJvbSBcIi4vZXhwZW5zZVVpVXRpbHMudHNcIjtcclxuXHJcbmNvbnN0IFFVSUNLX0RBVEVfRklMVEVSX1JBTkdFUzogQXJyYXk8e1xyXG4gIGlkOiBFeGNsdWRlPEV4cGVuc2VRdWlja0RhdGVGaWx0ZXJJZCwgXCJjdXN0b21cIj47XHJcbiAgZGF5c1RvU3VidHJhY3Q6IG51bWJlcjtcclxufT4gPSBbXHJcbiAgeyBpZDogXCJkYXlzLTdcIiwgZGF5c1RvU3VidHJhY3Q6IDYgfSxcclxuICB7IGlkOiBcImRheXMtMzBcIiwgZGF5c1RvU3VidHJhY3Q6IDI5IH0sXHJcbiAgeyBpZDogXCJkYXlzLTkwXCIsIGRheXNUb1N1YnRyYWN0OiA4OSB9LFxyXG5dO1xyXG5cclxuLy8gUmVzb2x2ZXMgd2hpY2ggcXVpY2sgZGF0ZSBwcmVzZXQgbWF0Y2hlcyBvbmUgcGVyc2lzdGVkIGV4cGVuc2UgZGF0ZSByYW5nZS5cclxuZXhwb3J0IGNvbnN0IHJlc29sdmVFeHBlbnNlUXVpY2tEYXRlRmlsdGVyRnJvbVJhbmdlID0gKFxyXG4gIGZyb21EYXRlOiBzdHJpbmcsXHJcbiAgdG9EYXRlOiBzdHJpbmdcclxuKTogRXhwZW5zZVF1aWNrRGF0ZUZpbHRlcklkIHwgbnVsbCA9PiB7XHJcbiAgY29uc3Qgbm9ybWFsaXplZEZyb21EYXRlID0gc2FmZVRleHQoZnJvbURhdGUpO1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRUb0RhdGUgPSBzYWZlVGV4dCh0b0RhdGUpO1xyXG4gIGlmICghbm9ybWFsaXplZEZyb21EYXRlIHx8ICFub3JtYWxpemVkVG9EYXRlKSB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIGNvbnN0IHRvZGF5ID0gc3RhcnRPZkRheShuZXcgRGF0ZSgpKTtcclxuICBpZiAobm9ybWFsaXplZFRvRGF0ZSAhPT0gdG9Jc29EYXRlKHRvZGF5KSkge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBmb3IgKGNvbnN0IGVudHJ5IG9mIFFVSUNLX0RBVEVfRklMVEVSX1JBTkdFUykge1xyXG4gICAgY29uc3QgY2FuZGlkYXRlRnJvbURhdGUgPSBuZXcgRGF0ZSh0b2RheSk7XHJcbiAgICBjYW5kaWRhdGVGcm9tRGF0ZS5zZXREYXRlKHRvZGF5LmdldERhdGUoKSAtIGVudHJ5LmRheXNUb1N1YnRyYWN0KTtcclxuICAgIGlmIChub3JtYWxpemVkRnJvbURhdGUgPT09IHRvSXNvRGF0ZShjYW5kaWRhdGVGcm9tRGF0ZSkpIHtcclxuICAgICAgcmV0dXJuIGVudHJ5LmlkO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG51bGw7XHJcbn07XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFXQSxJQUFNLDRCQUE0QjtBQUVsQyxJQUFNLDRCQUE0QixDQUFDLFVBQW9DO0FBQ3JFLFNBQU8sT0FBTyxVQUFVLEtBQUssS0FBSyxPQUFPLEtBQUssS0FBSztBQUNyRDtBQUdBLElBQU0sNEJBQTRCLENBQUMsaUJBQXdDO0FBQ3pFLE1BQUksaUJBQWlCLCtCQUErQjtBQUNsRCxXQUFPO0FBQUEsRUFDVDtBQUVBLE1BQUksQ0FBQywwQkFBMEIsWUFBWSxHQUFHO0FBQzVDLFdBQU87QUFBQSxFQUNUO0FBRUEsU0FBTztBQUNUO0FBRUEsSUFBTSx3QkFBd0IsQ0FBQyxVQUFrRDtBQUMvRSxRQUFNLFVBQVUsT0FBTyxTQUFTLEVBQUUsRUFBRSxLQUFLO0FBQ3pDLFNBQU8sVUFBVSxVQUFVO0FBQzdCO0FBRUEsSUFBTSw2QkFBNkIsQ0FDakMsVUFDbUI7QUFDbkIsTUFBSSxVQUFVLE9BQU87QUFDbkIsV0FBTztBQUFBLEVBQ1Q7QUFFQSxNQUFJLFVBQVUsTUFBTTtBQUNsQixXQUFPO0FBQUEsRUFDVDtBQUVBLFNBQU87QUFDVDtBQUVBLElBQU0sNEJBQTRCLENBQ2hDLFVBQ2tCO0FBQ2xCLFNBQU8sT0FBTyxVQUFVLFlBQVksT0FBTyxVQUFVLEtBQUssS0FBSyxTQUFTLElBQUksUUFBUTtBQUN0RjtBQUVBLElBQU0sK0JBQStCLENBQ25DLFVBQytDO0FBQy9DLE1BQUksVUFBVSxNQUFNLFVBQVUsUUFBUSxVQUFVLFFBQVc7QUFDekQsV0FBTztBQUFBLEVBQ1Q7QUFFQSxTQUFPLHVCQUF1QixLQUFLO0FBQ3JDO0FBRUEsSUFBTSxrQ0FBa0MsQ0FDdEMsWUFDc0M7QUFDdEMsUUFBTSxnQkFBZ0Isc0JBQXNCLFFBQVEsU0FBUztBQUU3RCxTQUFPO0FBQUEsSUFDTCxpQkFBaUIsc0JBQXNCLFFBQVEsUUFBUTtB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QkFBbUIsU0FBUyxNQUFNO0FBQ3hDLE1BQUksQ0FBQyxzQkFBc0IsQ0FBQyxrQkFBa0I7QUFDNUMsV0FBTztBQUFBLEVBQ1Q7QUFFQSxRQUFNLFFBQVEsV0FBVyxvQkFBSSxLQUFLLENBQUM7QUFDbkMsTUFBSSxxQkFBcUIsVUFBVSxLQUFLLEdBQUc7QUFDekMsV0FBTztBQUFBLEVBQ1Q7QUFFQSxhQUFXLFNBQVMsMEJBQTBCO0FBQzVDLFVBQU0sb0JBQW9CLElBQUksS0FBSyxLQUFLO0FBQ3hDLHNCQUFrQixRQUFRLE1BQU0sUUFBUSxJQUFJLE1BQU0sY0FBYztBQUNoRSxRQUFJLHVCQUF1QixVQUFVLGlCQUFpQixHQUFHO0FBQ3ZELGFBQU8sTUFBTTtBQUFBLElBQ2Y7QUFBQSxFQUNGO0FBRUEsU0FBTztBQUNUOyIsCiAgIm5hbWVzIjogWyJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSIsICJsYWJlbCIsICJpbXBvcnRfanN4X3J1bnRpbWUiXQp9Cg==
