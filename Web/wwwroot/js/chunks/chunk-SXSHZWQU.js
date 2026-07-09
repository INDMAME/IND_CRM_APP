import {
  ActionButton_default,
  FilterButton_default,
  HistoryManualDatePicker_default
} from "./chunk-KXW5U6SP.js";
import {
  formatUserNameWithId
} from "./chunk-DG56V5LO.js";
import {
  DEFAULT_EXPENSE_STATUS_FILTER
} from "./chunk-CI3J3X7E.js";
import {
  SelectCombobox_default
} from "./chunk-SSILOGLX.js";
import {
  safeText,
  startOfDay,
  toIsoDate
} from "./chunk-63PNSQ5Z.js";
import {
  toExpenseGastoTypeCode
} from "./chunk-UYN2TXUI.js";
import {
  classNames
} from "./chunk-UNQYUM6B.js";
import {
  require_jsx_runtime,
  require_react
} from "./chunk-2NKOKBT5.js";
import {
  indT
} from "./chunk-PNIKV5DC.js";
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
var normalizeUserText = (value) => String(value || "").trim();
var isSameUser = (left, right) => {
  const normalizedLeft = normalizeUserText(left).toUpperCase();
  const normalizedRight = normalizeUserText(right).toUpperCase();
  return !!normalizedLeft && normalizedLeft === normalizedRight;
};
var toOptionText = (user, currentAxUserId = "", currentUserName = "") => {
  const axUserId = String(user.axUserId || "").trim();
  const name = String(user.name || "").trim();
  const contextUserName = normalizeUserText(currentUserName);
  if (!axUserId) return "";
  if (contextUserName && isSameUser(axUserId, currentAxUserId)) {
    return formatUserNameWithId(contextUserName, axUserId);
  }
  return formatUserNameWithId(name, axUserId);
};
var ExpenseManagedUserFilterSelect = ({
  label,
  placeholder,
  value,
  users,
  currentAxUserId = "",
  currentUserName = "",
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
      const label2 = toOptionText(entry, currentAxUserId, currentUserName);
      if (!axUserId || !label2) return null;
      return {
        value: axUserId,
        text: label2
      };
    }).filter((entry) => !!entry);
    return allOption ? [allOption, ...userOptions] : userOptions;
  }, [allOption, currentAxUserId, currentUserName, users]);
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
      selectedTextMode: "text",
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy91dGlscy9leHBlbnNlUGF5bG9hZEJ1aWxkZXJzLnRzIiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdXRpbHMvZXhwZW5zZUhpc3RvcnlOYXZpZ2F0aW9uLnRzIiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlRGF0ZVJhbmdlRmlsdGVyLnRzeCIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3V0aWxzL2V4cGVuc2VEYXRlUmFuZ2VVdGlscy50cyIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbXBvbmVudHMvRXhwZW5zZUZpbHRlckFjdGlvbnMudHN4IiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlTWFuYWdlZFVzZXJGaWx0ZXJTZWxlY3QudHN4IiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlUXVpY2tEYXRlRmlsdGVycy50c3giLCAiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy91dGlscy9leHBlbnNlUXVpY2tEYXRlRmlsdGVyU3RhdGUudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB0eXBlIHtcclxuICBFeHBlbnNlU2hlZXRMaXN0QXBpUmVxdWVzdCxcclxuICBFeHBlbnNlU2hlZXRUaWNrZXRMaW5rQnVsa0ZpbHRlcnMsXHJcbiAgRXhwZW5zZVNoZWV0VGlja2V0TGlua0xpc3RSZXF1ZXN0LFxyXG4gIEV4cGVuc2VTaGVldExpc3RGaWx0ZXJzLFxyXG4gIEV4cGVuc2VTaGVldFRpY2tldExpc3RSZXF1ZXN0LFxyXG59IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcclxuaW1wb3J0IHsgREVGQVVMVF9FWFBFTlNFX1NUQVRVU19GSUxURVIgfSBmcm9tIFwiLi4vY29uc3RhbnRzL2V4cGVuc2VTdGF0dXNDYXRhbG9nLnRzXCI7XHJcbmltcG9ydCB7IHRvRXhwZW5zZUdhc3RvVHlwZUNvZGUgfSBmcm9tIFwiLi4vY29uc3RhbnRzL2V4cGVuc2VHYXN0b1R5cGVDYXRhbG9nLnRzXCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCB9IGZyb20gXCIuLi90aWNrZXRzL2V4cGVuc2VUaWNrZXRMaXN0VHlwZXMudHNcIjtcclxuXHJcbmNvbnN0IERFRkFVTFRfU1VHR0VTVF9QQUdFX1NJWkUgPSA1MDtcclxuXHJcbmNvbnN0IGlzVmFsaWRFeHBlbnNlU2hlZXRTdGF0dXMgPSAodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBudW1iZXIgPT4ge1xyXG4gIHJldHVybiBOdW1iZXIuaXNJbnRlZ2VyKHZhbHVlKSAmJiBOdW1iZXIodmFsdWUpID49IDA7XHJcbn07XHJcblxyXG4vLyBSZXNvbHZlcyB0aGUgb3B0aW9uYWwgQVBJIHN0YXR1cyBmaWx0ZXIgZnJvbSBVSSBmaWx0ZXIgc3RhdGUuXHJcbmNvbnN0IHJlc29sdmVFeHBlbnNlU2hlZXRTdGF0dXMgPSAoc3RhdHVzRmlsdGVyOiBudW1iZXIpOiBudW1iZXIgfCBudWxsID0+IHtcclxuICBpZiAoc3RhdHVzRmlsdGVyID09PSBERUZBVUxUX0VYUEVOU0VfU1RBVFVTX0ZJTFRFUikge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBpZiAoIWlzVmFsaWRFeHBlbnNlU2hlZXRTdGF0dXMoc3RhdHVzRmlsdGVyKSkge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gc3RhdHVzRmlsdGVyO1xyXG59O1xyXG5cclxuY29uc3Qgbm9ybWFsaXplT3B0aW9uYWxUZXh0ID0gKHZhbHVlOiBzdHJpbmcgfCB1bmRlZmluZWQpOiBzdHJpbmcgfCB1bmRlZmluZWQgPT4ge1xyXG4gIGNvbnN0IHRyaW1tZWQgPSBTdHJpbmcodmFsdWUgfHwgXCJcIikudHJpbSgpO1xyXG4gIHJldHVybiB0cmltbWVkID8gdHJpbW1lZCA6IHVuZGVmaW5lZDtcclxufTtcclxuXHJcbmNvbnN0IHJlc29sdmVQcm9jZXNzZWRCeUFpRmlsdGVyID0gKFxyXG4gIHZhbHVlOiBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90W1wicHJvY2Vzc2VkQnlJYUZpbHRlclwiXVxyXG4pOiBib29sZWFuIHwgbnVsbCA9PiB7XHJcbiAgaWYgKHZhbHVlID09PSBcInllc1wiKSB7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIGlmICh2YWx1ZSA9PT0gXCJub1wiKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gbnVsbDtcclxufTtcclxuXHJcbmNvbnN0IHJlc29sdmVUaWNrZXRTdGF0dXNGaWx0ZXIgPSAoXHJcbiAgdmFsdWU6IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3RbXCJzdGF0dXNGaWx0ZXJcIl1cclxuKTogbnVtYmVyIHwgbnVsbCA9PiB7XHJcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIiAmJiBOdW1iZXIuaXNJbnRlZ2VyKHZhbHVlKSAmJiB2YWx1ZSA+PSAwID8gdmFsdWUgOiBudWxsO1xyXG59O1xyXG5cclxuY29uc3QgcmVzb2x2ZVRpY2tldEdhc3RvVHlwZUZpbHRlciA9IChcclxuICB2YWx1ZTogRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdFtcImdhc3RvVHlwZUZpbHRlclwiXVxyXG4pOiBFeHBlbnNlU2hlZXRUaWNrZXRMaXN0UmVxdWVzdFtcImdhc3RvVHlwZVwiXSA9PiB7XHJcbiAgaWYgKHZhbHVlID09PSBcIlwiIHx8IHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHRvRXhwZW5zZUdhc3RvVHlwZUNvZGUodmFsdWUpIGFzIEV4cGVuc2VTaGVldFRpY2tldExpc3RSZXF1ZXN0W1wiZ2FzdG9UeXBlXCJdO1xyXG59O1xyXG5cclxuY29uc3QgYnVpbGRFeHBlbnNlVGlja2V0RmlsdGVyUGF5bG9hZCA9IChcclxuICBmaWx0ZXJzOiBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90XHJcbik6IEV4cGVuc2VTaGVldFRpY2tldExpbmtCdWxrRmlsdGVycyA9PiB7XHJcbiAgY29uc3Qgc2FmZUZpbHRlcktleSA9IG5vcm1hbGl6ZU9wdGlvbmFsVGV4dChmaWx0ZXJzLmZpbHRlcktleSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBjcmVhdGVkRGF0ZUZyb206IG5vcm1hbGl6ZU9wdGlvbmFsVGV4dChmaWx0ZXJzLmZyb21EYXRlKSxcclxuICAgIGNyZWF0ZWREYXRlVG86IG5vcm1hbGl6ZU9wdGlvbmFsVGV4dChmaWx0ZXJzLnRvRGF0ZSksXHJcbiAgICBzZWFyY2hLZXk6IHNhZmVGaWx0ZXJLZXksXHJcbiAgICBmaWx0ZXI6IHNhZmVGaWx0ZXJLZXksXHJcbiAgICBjdXJyZW5jeUNvZGU6IG5vcm1hbGl6ZU9wdGlvbmFsVGV4dChmaWx0ZXJzLmN1cnJlbmN5Q29kZSksXHJcbiAgICBnYXN0b1R5cGU6IHJlc29sdmVUaWNrZXRHYXN0b1R5cGVGaWx0ZXIoZmlsdGVycy5nYXN0b1R5cGVGaWx0ZXIpLFxyXG4gICAgcHJvY2Vzc2VkQnlBSTogcmVzb2x2ZVByb2Nlc3NlZEJ5QWlGaWx0ZXIoZmlsdGVycy5wcm9jZXNzZWRCeUlhRmlsdGVyKSxcclxuICB9O1xyXG59O1xyXG5cclxuLy8gQnVpbGQgbGlzdCBwYXlsb2FkIGZvciAvYXBpL2NybS9leHBlbnNlc2hlZXRzL2xpc3QgZnJvbSBjdXJyZW50IGZpbHRlciBzdGF0ZS5cclxuZXhwb3J0IGNvbnN0IGJ1aWxkRXhwZW5zZUxpc3RQYXlsb2FkID0gKFxyXG4gIGZpbHRlcnM6IEV4cGVuc2VTaGVldExpc3RGaWx0ZXJzLFxyXG4gIHBhZ2U6IG51bWJlcixcclxuICBwYWdlU2l6ZTogbnVtYmVyXHJcbik6IEV4cGVuc2VTaGVldExpc3RBcGlSZXF1ZXN0ID0+IHtcclxuICBjb25zdCBuZXh0UGFnZSA9IE51bWJlci5pc0Zpbml0ZShwYWdlKSAmJiBwYWdlID4gMCA/IHBhZ2UgOiAxO1xyXG4gIGNvbnN0IG5leHRQYWdlU2l6ZSA9IE51bWJlci5pc0Zpbml0ZShwYWdlU2l6ZSkgJiYgcGFnZVNpemUgPiAwID8gcGFnZVNpemUgOiBERUZBVUxUX1NVR0dFU1RfUEFHRV9TSVpFO1xyXG4gIGNvbnN0IHNhZmVGaWx0ZXIgPSBTdHJpbmcoZmlsdGVycy5maWx0ZXIgfHwgZmlsdGVycy5ob2phR2FzdG9zSWQgfHwgXCJcIikudHJpbSgpO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgZmlsdGVyOiBzYWZlRmlsdGVyIHx8IFwiXCIsXHJcbiAgICBiaWxsZWRNb2RlOiAyLFxyXG4gICAgY3JlYXRlZERhdGVGcm9tOiBub3JtYWxpemVPcHRpb25hbFRleHQoZmlsdGVycy5mcm9tRGF0ZSksXHJcbiAgICBjcmVhdGVkRGF0ZVRvOiBub3JtYWxpemVPcHRpb25hbFRleHQoZmlsdGVycy50b0RhdGUpLFxyXG4gICAgcHJvaklkOiBub3JtYWxpemVPcHRpb25hbFRleHQoZmlsdGVycy5wcm9qZWN0SWQpLFxyXG4gICAgY3VycmVuY3lDb2RlOiBub3JtYWxpemVPcHRpb25hbFRleHQoZmlsdGVycy5jdXJyZW5jeUNvZGUpLFxyXG4gICAgZXhwZW5zZVNoZWV0U3RhdHVzOiByZXNvbHZlRXhwZW5zZVNoZWV0U3RhdHVzKGZpbHRlcnMuc3RhdHVzRmlsdGVyKSxcclxuICAgIHJlaW1idXJzYWJsZUV4cGVuc2U6IGZpbHRlcnMucmVpbWJ1cnNhYmxlRXhwZW5zZSA/PyBudWxsLFxyXG4gICAgaW5jbHVkZVN1Ym9yZGluYXRlczogZmlsdGVycy5pbmNsdWRlU3Vib3JkaW5hdGVzID09PSB0cnVlLFxyXG4gICAgcGFnZTogbmV4dFBhZ2UsXHJcbiAgICBwYWdlU2l6ZTogbmV4dFBhZ2VTaXplLFxyXG4gIH07XHJcbn07XHJcblxyXG4vLyBCdWlsZCBzdWdnZXN0aW9uIHBheWxvYWQgZm9yIGV4cGVuc2Ugc2hlZXQgZHJvcGRvd24gc2VhcmNoLlxyXG5leHBvcnQgY29uc3QgYnVpbGRFeHBlbnNlU2hlZXRTdWdnZXN0UGF5bG9hZCA9IChcclxuICB0ZXJtOiBzdHJpbmcsXHJcbiAgcGFnZVNpemUgPSBERUZBVUxUX1NVR0dFU1RfUEFHRV9TSVpFLFxyXG4gIHBhZ2UgPSAxLFxyXG4gIGluY2x1ZGVTdWJvcmRpbmF0ZXMgPSBmYWxzZVxyXG4pOiBFeHBlbnNlU2hlZXRMaXN0QXBpUmVxdWVzdCA9PiB7XHJcbiAgY29uc3Qgc2FmZVRlcm0gPSBTdHJpbmcodGVybSB8fCBcIlwiKS50cmltKCk7XHJcbiAgY29uc3QgbmV4dFBhZ2VTaXplID0gTnVtYmVyLmlzRmluaXRlKHBhZ2VTaXplKSAmJiBwYWdlU2l6ZSA+IDAgPyBwYWdlU2l6ZSA6IERFRkFVTFRfU1VHR0VTVF9QQUdFX1NJWkU7XHJcbiAgY29uc3QgbmV4dFBhZ2UgPSBOdW1iZXIuaXNGaW5pdGUocGFnZSkgJiYgcGFnZSA+IDAgPyBNYXRoLmZsb29yKHBhZ2UpIDogMTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGZpbHRlcjogc2FmZVRlcm0gfHwgXCJcIixcclxuICAgIGJpbGxlZE1vZGU6IDIsXHJcbiAgICBjcmVhdGVkRGF0ZUZyb206IHVuZGVmaW5lZCxcclxuICAgIGNyZWF0ZWREYXRlVG86IHVuZGVmaW5lZCxcclxuICAgIHByb2pJZDogdW5kZWZpbmVkLFxyXG4gICAgY3VycmVuY3lDb2RlOiB1bmRlZmluZWQsXHJcbiAgICBpbmNsdWRlU3Vib3JkaW5hdGVzOiBpbmNsdWRlU3Vib3JkaW5hdGVzID09PSB0cnVlLFxyXG4gICAgcGFnZTogbmV4dFBhZ2UsXHJcbiAgICBwYWdlU2l6ZTogbmV4dFBhZ2VTaXplLFxyXG4gIH07XHJcbn07XHJcblxyXG4vLyBCdWlsZCBsaXN0IHBheWxvYWQgZm9yIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy9saXN0IGZyb20gdGlja2V0IGZpbHRlciBzdGF0ZS5cclxuZXhwb3J0IGNvbnN0IGJ1aWxkRXhwZW5zZVRpY2tldExpc3RQYXlsb2FkID0gKFxyXG4gIGZpbHRlcnM6IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QsXHJcbiAgcGFnZTogbnVtYmVyLFxyXG4gIHBhZ2VTaXplOiBudW1iZXJcclxuKTogRXhwZW5zZVNoZWV0VGlja2V0TGlzdFJlcXVlc3QgPT4ge1xyXG4gIGNvbnN0IG5leHRQYWdlID0gTnVtYmVyLmlzRmluaXRlKHBhZ2UpICYmIHBhZ2UgPiAwID8gTWF0aC5mbG9vcihwYWdlKSA6IDE7XHJcbiAgY29uc3QgbmV4dFBhZ2VTaXplID0gTnVtYmVyLmlzRmluaXRlKHBhZ2VTaXplKSAmJiBwYWdlU2l6ZSA+IDAgPyBNYXRoLmZsb29yKHBhZ2VTaXplKSA6IERFRkFVTFRfU1VHR0VTVF9QQUdFX1NJWkU7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBwYWdlOiBuZXh0UGFnZSxcclxuICAgIHBhZ2VTaXplOiBuZXh0UGFnZVNpemUsXHJcbiAgICAuLi5idWlsZEV4cGVuc2VUaWNrZXRGaWx0ZXJQYXlsb2FkKGZpbHRlcnMpLFxyXG4gICAgc3RhdHVzOiByZXNvbHZlVGlja2V0U3RhdHVzRmlsdGVyKGZpbHRlcnMuc3RhdHVzRmlsdGVyKSxcclxuICB9O1xyXG59O1xyXG5cclxuLy8gQnVpbGQgbGlzdCBwYXlsb2FkIGZvciAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMvbGluay9saXN0IGZyb20gdGlja2V0IGZpbHRlciBzdGF0ZS5cclxuZXhwb3J0IGNvbnN0IGJ1aWxkRXhwZW5zZVRpY2tldExpbmtMaXN0UGF5bG9hZCA9IChcclxuICBmaWx0ZXJzOiBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90LFxyXG4gIHBhZ2U6IG51bWJlcixcclxuICBwYWdlU2l6ZTogbnVtYmVyXHJcbik6IEV4cGVuc2VTaGVldFRpY2tldExpbmtMaXN0UmVxdWVzdCA9PiB7XHJcbiAgY29uc3QgbmV4dFBhZ2UgPSBOdW1iZXIuaXNGaW5pdGUocGFnZSkgJiYgcGFnZSA+IDAgPyBNYXRoLmZsb29yKHBhZ2UpIDogMTtcclxuICBjb25zdCBuZXh0UGFnZVNpemUgPSBOdW1iZXIuaXNGaW5pdGUocGFnZVNpemUpICYmIHBhZ2VTaXplID4gMCA/IE1hdGguZmxvb3IocGFnZVNpemUpIDogREVGQVVMVF9TVUdHRVNUX1BBR0VfU0laRTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHBhZ2U6IG5leHRQYWdlLFxyXG4gICAgcGFnZVNpemU6IG5leHRQYWdlU2l6ZSxcclxuICAgIC4uLmJ1aWxkRXhwZW5zZVRpY2tldEZpbHRlclBheWxvYWQoZmlsdGVycyksXHJcbiAgfTtcclxufTtcclxuXHJcbi8vIEJ1aWxkIGZpbHRlciBwYXlsb2FkIGZvciAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMvbGluay9idWxrIGluIGZpbHRlcmVkIG1vZGUuXHJcbmV4cG9ydCBjb25zdCBidWlsZEV4cGVuc2VUaWNrZXRMaW5rQnVsa0ZpbHRlcnMgPSAoXHJcbiAgZmlsdGVyczogRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdFxyXG4pOiBFeHBlbnNlU2hlZXRUaWNrZXRMaW5rQnVsa0ZpbHRlcnMgPT4ge1xyXG4gIHJldHVybiBidWlsZEV4cGVuc2VUaWNrZXRGaWx0ZXJQYXlsb2FkKGZpbHRlcnMpO1xyXG59O1xyXG4iLCAiLy8gRGV0ZWN0cyBicm93c2VyIGhpc3RvcnkgcmV0dXJucyB0aGF0IHJlY3JlYXRlIHRoZSBwYWdlIHdpdGhvdXQgYXBwLWxldmVsIHJldHVybiBmbGFncy5cclxuZXhwb3J0IGNvbnN0IGlzRXhwZW5zZUhpc3RvcnlCYWNrRm9yd2FyZE5hdmlnYXRpb24gPSAoKTogYm9vbGVhbiA9PiB7XHJcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIgfHwgdHlwZW9mIHBlcmZvcm1hbmNlID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBpZiAodHlwZW9mIHBlcmZvcm1hbmNlLmdldEVudHJpZXNCeVR5cGUgIT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgbmF2aWdhdGlvbkVudHJpZXMgPSBwZXJmb3JtYW5jZS5nZXRFbnRyaWVzQnlUeXBlKFwibmF2aWdhdGlvblwiKTtcclxuICBjb25zdCBuYXZpZ2F0aW9uRW50cnkgPSBuYXZpZ2F0aW9uRW50cmllc1swXSBhcyBQZXJmb3JtYW5jZU5hdmlnYXRpb25UaW1pbmcgfCB1bmRlZmluZWQ7XHJcbiAgcmV0dXJuIG5hdmlnYXRpb25FbnRyeT8udHlwZSA9PT0gXCJiYWNrX2ZvcndhcmRcIjtcclxufTtcclxuXHJcbmNvbnN0IG5vcm1hbGl6ZVBhdGhuYW1lID0gKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xyXG4gIHJldHVybiBTdHJpbmcodmFsdWUgfHwgXCJcIikudHJpbSgpLnRvTG93ZXJDYXNlKCk7XHJcbn07XHJcblxyXG4vLyBEZXRlY3RzIHdoZXRoZXIgdGhlIGN1cnJlbnQgcGFnZSB3YXMgb3BlbmVkIGZyb20gb25lIG9mIHRoZSBleHBlY3RlZCBleHBlbnNlIGRldGFpbCByb3V0ZXMuXHJcbmV4cG9ydCBjb25zdCBoYXNFeHBlbnNlUmV0dXJuUmVmZXJyZXIgPSAoZXhwZWN0ZWRQYXRoczogc3RyaW5nW10pOiBib29sZWFuID0+IHtcclxuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiIHx8IHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHJhd1JlZmVycmVyID0gU3RyaW5nKGRvY3VtZW50LnJlZmVycmVyIHx8IFwiXCIpLnRyaW0oKTtcclxuICBpZiAoIXJhd1JlZmVycmVyKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gIHRyeSB7XHJcbiAgICBjb25zdCByZWZlcnJlclVybCA9IG5ldyBVUkwocmF3UmVmZXJyZXIsIHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4pO1xyXG4gICAgY29uc3QgcmVmZXJyZXJQYXRoID0gbm9ybWFsaXplUGF0aG5hbWUocmVmZXJyZXJVcmwucGF0aG5hbWUpO1xyXG4gICAgcmV0dXJuIGV4cGVjdGVkUGF0aHMuc29tZSgocGF0aCkgPT4gbm9ybWFsaXplUGF0aG5hbWUocGF0aCkgPT09IHJlZmVycmVyUGF0aCk7XHJcbiAgfSBjYXRjaCB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG59O1xyXG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCBIaXN0b3J5TWFudWFsRGF0ZVBpY2tlciwge1xyXG4gIEhpc3RvcnlNYW51YWxEYXlDZWxsLFxyXG59IGZyb20gXCIuLi8uLi92aXNpdGFzL2hpc3RvcmlhbC9IaXN0b3J5TWFudWFsRGF0ZVBpY2tlci50c3hcIjtcclxuaW1wb3J0IHtcclxuICBidWlsZENhbGVuZGFyTW9udGgsXHJcbiAgYnVpbGREYXRlUmFuZ2VEYXlDZWxscyxcclxuICBmb2N1c0RhdGVSYW5nZVNlY3Rpb24sXHJcbiAgZm9ybWF0RGF0ZVJhbmdlRGlzcGxheSxcclxuICBpc0JlZm9yZURheSxcclxuICBwYXJzZUlzb0RhdGVSYW5nZVZhbHVlLFxyXG4gIHJlc29sdmVVaUxvY2FsZSxcclxuICB0b0lzb0RhdGVSYW5nZVZhbHVlLFxyXG4gIHRvU2VudGVuY2VDYXNlLFxyXG59IGZyb20gXCIuLi91dGlscy9leHBlbnNlRGF0ZVJhbmdlVXRpbHMudHNcIjtcclxuXHJcbnR5cGUgRXhwZW5zZURhdGVSYW5nZUZpbHRlclByb3BzID0ge1xyXG4gIGZyb21EYXRlOiBzdHJpbmc7XHJcbiAgdG9EYXRlOiBzdHJpbmc7XHJcbiAgb25DaGFuZ2U6IChmcm9tRGF0ZTogc3RyaW5nLCB0b0RhdGU6IHN0cmluZykgPT4gdm9pZDtcclxuICBvblJhbmdlQ29tcGxldGU/OiAoZnJvbURhdGU6IHN0cmluZywgdG9EYXRlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgYXV0b09wZW5SZXF1ZXN0SWQ/OiBudW1iZXI7XHJcbiAgc2hvd01hbnVhbEVycm9yPzogYm9vbGVhbjtcclxuICBzaG93U3RhcnRFcnJvcj86IGJvb2xlYW47XHJcbiAgc2hvd0VuZEVycm9yPzogYm9vbGVhbjtcclxufTtcclxuXHJcbi8vIFNoYXJlZCBkYXRlIHJhbmdlIHBpY2tlciBmb3IgZXhwZW5zZSBmaWx0ZXJzIGJhc2VkIG9uIHRoZSBoaXN0b3J5IGRhdGUgY29tcG9uZW50LlxyXG5jb25zdCBFeHBlbnNlRGF0ZVJhbmdlRmlsdGVyID0gKHtcclxuICBmcm9tRGF0ZSxcclxuICB0b0RhdGUsXHJcbiAgb25DaGFuZ2UsXHJcbiAgb25SYW5nZUNvbXBsZXRlLFxyXG4gIGF1dG9PcGVuUmVxdWVzdElkID0gMCxcclxuICBzaG93TWFudWFsRXJyb3IgPSBmYWxzZSxcclxuICBzaG93U3RhcnRFcnJvciA9IGZhbHNlLFxyXG4gIHNob3dFbmRFcnJvciA9IGZhbHNlLFxyXG59OiBFeHBlbnNlRGF0ZVJhbmdlRmlsdGVyUHJvcHMpID0+IHtcclxuICBjb25zdCBsb2NhbGUgPSB1c2VNZW1vKCgpID0+IHJlc29sdmVVaUxvY2FsZSgpLCBbXSk7XHJcbiAgY29uc3QgYWN0aXZhdG9yUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgcG9wb3ZlclJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xyXG5cclxuICBjb25zdCBbc3RhcnREYXRlLCBzZXRTdGFydERhdGVdID0gdXNlU3RhdGU8RGF0ZSB8IG51bGw+KCgpID0+IHBhcnNlSXNvRGF0ZVJhbmdlVmFsdWUoZnJvbURhdGUpKTtcclxuICBjb25zdCBbZW5kRGF0ZSwgc2V0RW5kRGF0ZV0gPSB1c2VTdGF0ZTxEYXRlIHwgbnVsbD4oKCkgPT4gcGFyc2VJc29EYXRlUmFuZ2VWYWx1ZSh0b0RhdGUpKTtcclxuICBjb25zdCBbaG92ZXJEYXRlLCBzZXRIb3ZlckRhdGVdID0gdXNlU3RhdGU8RGF0ZSB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IFtzZWxlY3RpbmdTdGVwLCBzZXRTZWxlY3RpbmdTdGVwXSA9IHVzZVN0YXRlPFwic3RhcnRcIiB8IFwiZW5kXCIgfCBcImRvbmVcIj4oXCJzdGFydFwiKTtcclxuICBjb25zdCBbaXNPcGVuLCBzZXRJc09wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xyXG5cclxuICBjb25zdCBub3cgPSB1c2VNZW1vKCgpID0+IG5ldyBEYXRlKCksIFtdKTtcclxuICBjb25zdCBbY3VycmVudE1vbnRoLCBzZXRDdXJyZW50TW9udGhdID0gdXNlU3RhdGUoKHBhcnNlSXNvRGF0ZVJhbmdlVmFsdWUoZnJvbURhdGUpIHx8IG5vdykuZ2V0TW9udGgoKSk7XHJcbiAgY29uc3QgW2N1cnJlbnRZZWFyLCBzZXRDdXJyZW50WWVhcl0gPSB1c2VTdGF0ZSgocGFyc2VJc29EYXRlUmFuZ2VWYWx1ZShmcm9tRGF0ZSkgfHwgbm93KS5nZXRGdWxsWWVhcigpKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIHNldFN0YXJ0RGF0ZShwYXJzZUlzb0RhdGVSYW5nZVZhbHVlKGZyb21EYXRlKSk7XHJcbiAgfSwgW2Zyb21EYXRlXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBzZXRFbmREYXRlKHBhcnNlSXNvRGF0ZVJhbmdlVmFsdWUodG9EYXRlKSk7XHJcbiAgfSwgW3RvRGF0ZV0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgb25DaGFuZ2Uoc3RhcnREYXRlID8gdG9Jc29EYXRlUmFuZ2VWYWx1ZShzdGFydERhdGUpIDogXCJcIiwgZW5kRGF0ZSA/IHRvSXNvRGF0ZVJhbmdlVmFsdWUoZW5kRGF0ZSkgOiBcIlwiKTtcclxuICB9LCBbc3RhcnREYXRlLCBlbmREYXRlLCBvbkNoYW5nZV0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFpc09wZW4pIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBoYW5kbGVPdXRzaWRlID0gKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XHJcbiAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldCBhcyBOb2RlIHwgbnVsbDtcclxuICAgICAgaWYgKCF0YXJnZXQpIHJldHVybjtcclxuICAgICAgaWYgKHBvcG92ZXJSZWYuY3VycmVudD8uY29udGFpbnModGFyZ2V0KSkgcmV0dXJuO1xyXG4gICAgICBpZiAoYWN0aXZhdG9yUmVmLmN1cnJlbnQ/LmNvbnRhaW5zKHRhcmdldCkpIHJldHVybjtcclxuICAgICAgc2V0SXNPcGVuKGZhbHNlKTtcclxuICAgICAgc2V0SG92ZXJEYXRlKG51bGwpO1xyXG4gICAgfTtcclxuXHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGhhbmRsZU91dHNpZGUpO1xyXG4gICAgcmV0dXJuICgpID0+IGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgaGFuZGxlT3V0c2lkZSk7XHJcbiAgfSwgW2lzT3Blbl0pO1xyXG5cclxuICBjb25zdCBvcGVuUG9wb3ZlciA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKHNlY3Rpb246IFwic3RhcnRcIiB8IFwiZW5kXCIpID0+IHtcclxuICAgICAgc2V0U2VsZWN0aW5nU3RlcChzZWN0aW9uKTtcclxuICAgICAgc2V0SXNPcGVuKHRydWUpO1xyXG4gICAgICBzZXRIb3ZlckRhdGUobnVsbCk7XHJcblxyXG4gICAgICBjb25zdCBiYXNlID0gc2VjdGlvbiA9PT0gXCJzdGFydFwiID8gc3RhcnREYXRlIHx8IGVuZERhdGUgfHwgbm93IDogZW5kRGF0ZSB8fCBzdGFydERhdGUgfHwgbm93O1xyXG4gICAgICBzZXRDdXJyZW50TW9udGgoYmFzZS5nZXRNb250aCgpKTtcclxuICAgICAgc2V0Q3VycmVudFllYXIoYmFzZS5nZXRGdWxsWWVhcigpKTtcclxuICAgIH0sXHJcbiAgICBbZW5kRGF0ZSwgbm93LCBzdGFydERhdGVdXHJcbiAgKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmIChhdXRvT3BlblJlcXVlc3RJZCA8PSAwKSByZXR1cm47XHJcbiAgICBzZXRTZWxlY3RpbmdTdGVwKFwic3RhcnRcIik7XHJcbiAgICBzZXRJc09wZW4odHJ1ZSk7XHJcbiAgICBzZXRIb3ZlckRhdGUobnVsbCk7XHJcbiAgICBjb25zdCBiYXNlID0gc3RhcnREYXRlIHx8IGVuZERhdGUgfHwgbm93O1xyXG4gICAgc2V0Q3VycmVudE1vbnRoKGJhc2UuZ2V0TW9udGgoKSk7XHJcbiAgICBzZXRDdXJyZW50WWVhcihiYXNlLmdldEZ1bGxZZWFyKCkpO1xyXG4gIH0sIFthdXRvT3BlblJlcXVlc3RJZF0pO1xyXG5cclxuICBjb25zdCBvbkFjdGl2YXRvcktleURvd24gPSB1c2VDYWxsYmFjayhcclxuICAgIChldmVudDogUmVhY3QuS2V5Ym9hcmRFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHtcclxuICAgICAgaWYgKGV2ZW50LmtleSAhPT0gXCJFbnRlclwiICYmIGV2ZW50LmtleSAhPT0gXCIgXCIpIHJldHVybjtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgb3BlblBvcG92ZXIoXCJzdGFydFwiKTtcclxuICAgIH0sXHJcbiAgICBbb3BlblBvcG92ZXJdXHJcbiAgKTtcclxuXHJcbiAgY29uc3Qgb25TZWN0aW9uS2V5RG93biA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKGV2ZW50OiBSZWFjdC5LZXlib2FyZEV2ZW50PEhUTUxEaXZFbGVtZW50Piwgc2VjdGlvbjogXCJzdGFydFwiIHwgXCJlbmRcIikgPT4ge1xyXG4gICAgICBpZiAoZXZlbnQua2V5ICE9PSBcIkVudGVyXCIgJiYgZXZlbnQua2V5ICE9PSBcIiBcIikgcmV0dXJuO1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBvcGVuUG9wb3ZlcihzZWN0aW9uKTtcclxuICAgIH0sXHJcbiAgICBbb3BlblBvcG92ZXJdXHJcbiAgKTtcclxuXHJcbiAgY29uc3Qgb25DbGVhciA9IHVzZUNhbGxiYWNrKChldmVudDogUmVhY3QuTW91c2VFdmVudCkgPT4ge1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgc2V0U3RhcnREYXRlKG51bGwpO1xyXG4gICAgc2V0RW5kRGF0ZShudWxsKTtcclxuICAgIHNldEhvdmVyRGF0ZShudWxsKTtcclxuICAgIHNldFNlbGVjdGluZ1N0ZXAoXCJzdGFydFwiKTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IG9uUHJldk1vbnRoID0gdXNlQ2FsbGJhY2soKGV2ZW50OiBSZWFjdC5Nb3VzZUV2ZW50PEhUTUxCdXR0b25FbGVtZW50PikgPT4ge1xyXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICBzZXRDdXJyZW50TW9udGgoKHByZXZpb3VzKSA9PiB7XHJcbiAgICAgIGNvbnN0IG5leHQgPSBwcmV2aW91cyAtIDE7XHJcbiAgICAgIGlmIChuZXh0IDwgMCkge1xyXG4gICAgICAgIHNldEN1cnJlbnRZZWFyKCh5ZWFyKSA9PiB5ZWFyIC0gMSk7XHJcbiAgICAgICAgcmV0dXJuIDExO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBuZXh0O1xyXG4gICAgfSk7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBvbk5leHRNb250aCA9IHVzZUNhbGxiYWNrKChldmVudDogUmVhY3QuTW91c2VFdmVudDxIVE1MQnV0dG9uRWxlbWVudD4pID0+IHtcclxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgc2V0Q3VycmVudE1vbnRoKChwcmV2aW91cykgPT4ge1xyXG4gICAgICBjb25zdCBuZXh0ID0gcHJldmlvdXMgKyAxO1xyXG4gICAgICBpZiAobmV4dCA+IDExKSB7XHJcbiAgICAgICAgc2V0Q3VycmVudFllYXIoKHllYXIpID0+IHllYXIgKyAxKTtcclxuICAgICAgICByZXR1cm4gMDtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gbmV4dDtcclxuICAgIH0pO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3Qgb25EYXlDbGljayA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKGRheTogSGlzdG9yeU1hbnVhbERheUNlbGwpID0+IHtcclxuICAgICAgaWYgKCFkYXkuZGF0ZSB8fCBkYXkuZGlzYWJsZWQpIHJldHVybjtcclxuXHJcbiAgICAgIGNvbnN0IG5leHREYXRlID0gbmV3IERhdGUoZGF5LmRhdGUuZ2V0RnVsbFllYXIoKSwgZGF5LmRhdGUuZ2V0TW9udGgoKSwgZGF5LmRhdGUuZ2V0RGF0ZSgpKTtcclxuXHJcbiAgICAgIGlmICghc3RhcnREYXRlIHx8IHNlbGVjdGluZ1N0ZXAgPT09IFwic3RhcnRcIikge1xyXG4gICAgICAgIHNldFN0YXJ0RGF0ZShuZXh0RGF0ZSk7XHJcbiAgICAgICAgaWYgKGVuZERhdGUgJiYgaXNCZWZvcmVEYXkoZW5kRGF0ZSwgbmV4dERhdGUpKSB7XHJcbiAgICAgICAgICBzZXRFbmREYXRlKG51bGwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZXRTZWxlY3RpbmdTdGVwKFwiZW5kXCIpO1xyXG4gICAgICAgIHNldEN1cnJlbnRNb250aChuZXh0RGF0ZS5nZXRNb250aCgpKTtcclxuICAgICAgICBzZXRDdXJyZW50WWVhcihuZXh0RGF0ZS5nZXRGdWxsWWVhcigpKTtcclxuICAgICAgICBmb2N1c0RhdGVSYW5nZVNlY3Rpb24oYWN0aXZhdG9yUmVmLmN1cnJlbnQsIFwiZW5kXCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHNlbGVjdGluZ1N0ZXAgPT09IFwiZW5kXCIpIHtcclxuICAgICAgICBsZXQgZmluYWxTdGFydCA9IHN0YXJ0RGF0ZTtcclxuICAgICAgICBsZXQgZmluYWxFbmQgPSBuZXh0RGF0ZTtcclxuXHJcbiAgICAgICAgaWYgKGlzQmVmb3JlRGF5KG5leHREYXRlLCBzdGFydERhdGUpKSB7XHJcbiAgICAgICAgICBmaW5hbFN0YXJ0ID0gbmV4dERhdGU7XHJcbiAgICAgICAgICBmaW5hbEVuZCA9IHN0YXJ0RGF0ZTtcclxuICAgICAgICAgIHNldEVuZERhdGUoZmluYWxFbmQpO1xyXG4gICAgICAgICAgc2V0U3RhcnREYXRlKGZpbmFsU3RhcnQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBzZXRFbmREYXRlKGZpbmFsRW5kKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9uUmFuZ2VDb21wbGV0ZT8uKHRvSXNvRGF0ZVJhbmdlVmFsdWUoZmluYWxTdGFydCksIHRvSXNvRGF0ZVJhbmdlVmFsdWUoZmluYWxFbmQpKTtcclxuICAgICAgICBzZXRTZWxlY3RpbmdTdGVwKFwiZG9uZVwiKTtcclxuICAgICAgICBzZXRJc09wZW4oZmFsc2UpO1xyXG4gICAgICAgIHNldEhvdmVyRGF0ZShudWxsKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFtlbmREYXRlLCBvblJhbmdlQ29tcGxldGUsIHNlbGVjdGluZ1N0ZXAsIHN0YXJ0RGF0ZV1cclxuICApO1xyXG5cclxuICBjb25zdCBvbkRheUhvdmVyID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoZGF5OiBIaXN0b3J5TWFudWFsRGF5Q2VsbCkgPT4ge1xyXG4gICAgICBpZiAoIWRheS5kYXRlIHx8IHNlbGVjdGluZ1N0ZXAgIT09IFwiZW5kXCIgfHwgIXN0YXJ0RGF0ZSkgcmV0dXJuO1xyXG4gICAgICBzZXRIb3ZlckRhdGUobmV3IERhdGUoZGF5LmRhdGUuZ2V0RnVsbFllYXIoKSwgZGF5LmRhdGUuZ2V0TW9udGgoKSwgZGF5LmRhdGUuZ2V0RGF0ZSgpKSk7XHJcbiAgICB9LFxyXG4gICAgW3NlbGVjdGluZ1N0ZXAsIHN0YXJ0RGF0ZV1cclxuICApO1xyXG5cclxuICBjb25zdCBvbkdyaWRNb3VzZUxlYXZlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgc2V0SG92ZXJEYXRlKG51bGwpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgY2FsZW5kYXIgPSB1c2VNZW1vKCgpID0+IHtcclxuICAgIHJldHVybiBidWlsZENhbGVuZGFyTW9udGgoY3VycmVudFllYXIsIGN1cnJlbnRNb250aCwgbG9jYWxlKTtcclxuICB9LCBbY3VycmVudE1vbnRoLCBjdXJyZW50WWVhciwgbG9jYWxlXSk7XHJcblxyXG4gIGNvbnN0IGRheUNlbGxzID0gdXNlTWVtbyhcclxuICAgICgpID0+IGJ1aWxkRGF0ZVJhbmdlRGF5Q2VsbHMoY2FsZW5kYXIuY2VsbHMsIHN0YXJ0RGF0ZSwgZW5kRGF0ZSwgaG92ZXJEYXRlLCBzZWxlY3RpbmdTdGVwKSxcclxuICAgIFtjYWxlbmRhci5jZWxscywgZW5kRGF0ZSwgaG92ZXJEYXRlLCBzZWxlY3RpbmdTdGVwLCBzdGFydERhdGVdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgbGFiZWxGcm9tID0gdG9TZW50ZW5jZUNhc2UoaW5kVChcIkhpc3RvcnlfRnJvbVwiLCBcIkZyb21cIiksIGxvY2FsZSk7XHJcbiAgY29uc3QgbGFiZWxUbyA9IHRvU2VudGVuY2VDYXNlKGluZFQoXCJIaXN0b3J5X1RvXCIsIFwiVG9cIiksIGxvY2FsZSk7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8SGlzdG9yeU1hbnVhbERhdGVQaWNrZXJcclxuICAgICAgYWN0aXZhdG9yUmVmPXthY3RpdmF0b3JSZWZ9XHJcbiAgICAgIHBvcG92ZXJSZWY9e3BvcG92ZXJSZWZ9XHJcbiAgICAgIHNob3dNYW51YWxFcnJvcj17c2hvd01hbnVhbEVycm9yfVxyXG4gICAgICBzaG93U3RhcnRFcnJvcj17c2hvd1N0YXJ0RXJyb3J9XHJcbiAgICAgIHNob3dFbmRFcnJvcj17c2hvd0VuZEVycm9yfVxyXG4gICAgICBmaWx0ZXJUaXRsZT17aW5kVChcIkhpc3RvcnlfRmlsdGVyX0RhdGVcIiwgXCJEYXRlXCIpfVxyXG4gICAgICBpc09wZW49e2lzT3Blbn1cclxuICAgICAgc2VsZWN0aW5nU3RlcD17c2VsZWN0aW5nU3RlcH1cclxuICAgICAgbGFiZWxGcm9tPXtsYWJlbEZyb219XHJcbiAgICAgIGxhYmVsVG89e2xhYmVsVG99XHJcbiAgICAgIHN0YXJ0RGF0ZVRleHQ9e3N0YXJ0RGF0ZSA/IGZvcm1hdERhdGVSYW5nZURpc3BsYXkoc3RhcnREYXRlLCBsb2NhbGUpIDogaW5kVChcIkhpc3RvcnlfQWRkRGF0ZVwiLCBcIkFkZCBkYXRlXCIpfVxyXG4gICAgICBlbmREYXRlVGV4dD17ZW5kRGF0ZSA/IGZvcm1hdERhdGVSYW5nZURpc3BsYXkoZW5kRGF0ZSwgbG9jYWxlKSA6IGluZFQoXCJIaXN0b3J5X0FkZERhdGVcIiwgXCJBZGQgZGF0ZVwiKX1cclxuICAgICAgY2xlYXJSYW5nZUxhYmVsPXtpbmRUKFwiSGlzdG9yeV9DbGVhclJhbmdlXCIsIFwiQ2xlYXIgcmFuZ2VcIil9XHJcbiAgICAgIGhhc1NlbGVjdGVkUmFuZ2U9eyEhc3RhcnREYXRlIHx8ICEhZW5kRGF0ZX1cclxuICAgICAgbW9udGhMYWJlbD17Y2FsZW5kYXIubW9udGhMYWJlbH1cclxuICAgICAgd2Vla0RheUxhYmVscz17W1xyXG4gICAgICAgIGluZFQoXCJIaXN0b3J5X0RheV9Nb25cIiwgXCJNb25cIiksXHJcbiAgICAgICAgaW5kVChcIkhpc3RvcnlfRGF5X1R1ZVwiLCBcIlR1ZVwiKSxcclxuICAgICAgICBpbmRUKFwiSGlzdG9yeV9EYXlfV2VkXCIsIFwiV2VkXCIpLFxyXG4gICAgICAgIGluZFQoXCJIaXN0b3J5X0RheV9UaHVcIiwgXCJUaHVcIiksXHJcbiAgICAgICAgaW5kVChcIkhpc3RvcnlfRGF5X0ZyaVwiLCBcIkZyaVwiKSxcclxuICAgICAgICBpbmRUKFwiSGlzdG9yeV9EYXlfU2F0XCIsIFwiU2F0XCIpLFxyXG4gICAgICAgIGluZFQoXCJIaXN0b3J5X0RheV9TdW5cIiwgXCJTdW5cIiksXHJcbiAgICAgIF19XHJcbiAgICAgIHN0YXR1c1RleHQ9e1xyXG4gICAgICAgIHNlbGVjdGluZ1N0ZXAgPT09IFwic3RhcnRcIlxyXG4gICAgICAgICAgPyBpbmRUKFwiSGlzdG9yeV9TdGF0dXNfU2VsZWN0U3RhcnRcIiwgXCJTZWxlY3Qgc3RhcnQgZGF0ZVwiKVxyXG4gICAgICAgICAgOiBpbmRUKFwiSGlzdG9yeV9TdGF0dXNfU2VsZWN0RW5kXCIsIFwiU2VsZWN0IGVuZCBkYXRlXCIpXHJcbiAgICAgIH1cclxuICAgICAgZGF5Q2VsbHM9e2RheUNlbGxzfVxyXG4gICAgICBwcmV2TW9udGhMYWJlbD17aW5kVChcIkhpc3RvcnlfUHJldk1vbnRoXCIsIFwiUHJldmlvdXMgbW9udGhcIil9XHJcbiAgICAgIG5leHRNb250aExhYmVsPXtpbmRUKFwiSGlzdG9yeV9OZXh0TW9udGhcIiwgXCJOZXh0IG1vbnRoXCIpfVxyXG4gICAgICBvbk9wZW5Qb3BvdmVyPXtvcGVuUG9wb3Zlcn1cclxuICAgICAgb25BY3RpdmF0b3JLZXlEb3duPXtvbkFjdGl2YXRvcktleURvd259XHJcbiAgICAgIG9uU2VjdGlvbktleURvd249e29uU2VjdGlvbktleURvd259XHJcbiAgICAgIG9uQ2xlYXI9e29uQ2xlYXJ9XHJcbiAgICAgIG9uUHJldk1vbnRoPXtvblByZXZNb250aH1cclxuICAgICAgb25OZXh0TW9udGg9e29uTmV4dE1vbnRofVxyXG4gICAgICBvbkdyaWRNb3VzZUxlYXZlPXtvbkdyaWRNb3VzZUxlYXZlfVxyXG4gICAgICBvbkRheUNsaWNrPXtvbkRheUNsaWNrfVxyXG4gICAgICBvbkRheUhvdmVyPXtvbkRheUhvdmVyfVxyXG4gICAgLz5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZURhdGVSYW5nZUZpbHRlcjtcclxuIiwgImltcG9ydCB7IGNsYXNzTmFtZXMgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvY2xhc3NOYW1lcy50c1wiO1xyXG5pbXBvcnQgdHlwZSB7IEhpc3RvcnlNYW51YWxEYXlDZWxsIH0gZnJvbSBcIi4uLy4uL3Zpc2l0YXMvaGlzdG9yaWFsL0hpc3RvcnlNYW51YWxEYXRlUGlja2VyLnRzeFwiO1xyXG5cclxuZXhwb3J0IHR5cGUgQ2FsZW5kYXJDZWxsID0ge1xyXG4gIGRhdGU6IERhdGUgfCBudWxsO1xyXG4gIGlzbzogc3RyaW5nO1xyXG4gIGlzRW1wdHk6IGJvb2xlYW47XHJcbn07XHJcblxyXG5jb25zdCBwYWQgPSAodmFsdWU6IG51bWJlcik6IHN0cmluZyA9PiB2YWx1ZS50b1N0cmluZygpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcclxuXHJcbmV4cG9ydCBjb25zdCB0b0lzb0RhdGVSYW5nZVZhbHVlID0gKGRhdGU6IERhdGUpOiBzdHJpbmcgPT4ge1xyXG4gIHJldHVybiBgJHtkYXRlLmdldEZ1bGxZZWFyKCl9LSR7cGFkKGRhdGUuZ2V0TW9udGgoKSArIDEpfS0ke3BhZChkYXRlLmdldERhdGUoKSl9YDtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBwYXJzZUlzb0RhdGVSYW5nZVZhbHVlID0gKHZhbHVlOiBzdHJpbmcpOiBEYXRlIHwgbnVsbCA9PiB7XHJcbiAgaWYgKCF2YWx1ZSkgcmV0dXJuIG51bGw7XHJcbiAgY29uc3QgdHJpbW1lZCA9IFN0cmluZyh2YWx1ZSkudHJpbSgpO1xyXG4gIGlmICghdHJpbW1lZCkgcmV0dXJuIG51bGw7XHJcblxyXG4gIGNvbnN0IGRhdGVQYXJ0ID0gdHJpbW1lZC5zcGxpdChcIlRcIilbMF0uc3BsaXQoXCIgXCIpWzBdO1xyXG4gIGlmICghL15cXGR7NH0tXFxkezJ9LVxcZHsyfSQvLnRlc3QoZGF0ZVBhcnQpKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgY29uc3QgW3llYXIsIG1vbnRoLCBkYXldID0gZGF0ZVBhcnQuc3BsaXQoXCItXCIpLm1hcChOdW1iZXIpO1xyXG4gIHJldHVybiBuZXcgRGF0ZSh5ZWFyLCBtb250aCAtIDEsIGRheSk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgaXNTYW1lRGF5ID0gKGE6IERhdGUgfCBudWxsLCBiOiBEYXRlIHwgbnVsbCk6IGJvb2xlYW4gPT4ge1xyXG4gIHJldHVybiAhIShhICYmIGIgJiYgYS5nZXRUaW1lKCkgPT09IGIuZ2V0VGltZSgpKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBpc0JlZm9yZURheSA9IChhOiBEYXRlIHwgbnVsbCwgYjogRGF0ZSB8IG51bGwpOiBib29sZWFuID0+IHtcclxuICByZXR1cm4gISEoYSAmJiBiICYmIGEuZ2V0VGltZSgpIDwgYi5nZXRUaW1lKCkpO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGZvY3VzRGF0ZVJhbmdlU2VjdGlvbiA9IChjb250YWluZXI6IEhUTUxEaXZFbGVtZW50IHwgbnVsbCwgc2VjdGlvbjogXCJzdGFydFwiIHwgXCJlbmRcIik6IHZvaWQgPT4ge1xyXG4gIGlmICghY29udGFpbmVyKSByZXR1cm47XHJcbiAgY29uc3QgdGFyZ2V0ID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQ+KGBbZGF0YS1zZWN0aW9uPVwiJHtzZWN0aW9ufVwiXWApO1xyXG4gIGlmICghdGFyZ2V0KSByZXR1cm47XHJcbiAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0YXJnZXQuZm9jdXMoKSk7XHJcbn07XHJcblxyXG5jb25zdCB0b1RpdGxlQ2FzZSA9ICh2YWx1ZTogc3RyaW5nLCBsb2NhbGU6IHN0cmluZyk6IHN0cmluZyA9PiB7XHJcbiAgaWYgKCF2YWx1ZSkgcmV0dXJuIFwiXCI7XHJcbiAgY29uc3QgbG93ZXIgPSB2YWx1ZS50b0xvY2FsZUxvd2VyQ2FzZShsb2NhbGUpO1xyXG4gIHJldHVybiBsb3dlclswXS50b0xvY2FsZVVwcGVyQ2FzZShsb2NhbGUpICsgbG93ZXIuc2xpY2UoMSk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgdG9TZW50ZW5jZUNhc2UgPSAodmFsdWU6IHN0cmluZywgbG9jYWxlOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xyXG4gIGlmICghdmFsdWUpIHJldHVybiBcIlwiO1xyXG4gIGNvbnN0IHRyaW1tZWQgPSB2YWx1ZS50cmltKCk7XHJcbiAgaWYgKCF0cmltbWVkKSByZXR1cm4gdHJpbW1lZDtcclxuICBjb25zdCBsb3dlciA9IHRyaW1tZWQudG9Mb2NhbGVMb3dlckNhc2UobG9jYWxlKTtcclxuICByZXR1cm4gbG93ZXJbMF0udG9Mb2NhbGVVcHBlckNhc2UobG9jYWxlKSArIGxvd2VyLnNsaWNlKDEpO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGZvcm1hdERhdGVSYW5nZURpc3BsYXkgPSAoZGF0ZTogRGF0ZSwgbG9jYWxlOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xyXG4gIHJldHVybiBkYXRlXHJcbiAgICAudG9Mb2NhbGVEYXRlU3RyaW5nKGxvY2FsZSwge1xyXG4gICAgICBkYXk6IFwibnVtZXJpY1wiLFxyXG4gICAgICBtb250aDogXCJzaG9ydFwiLFxyXG4gICAgICB5ZWFyOiBcIm51bWVyaWNcIixcclxuICAgIH0pXHJcbiAgICAucmVwbGFjZSgvXFwuL2csIFwiXCIpXHJcbiAgICAudG9Mb3dlckNhc2UoKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBmb3JtYXRNb250aExhYmVsID0gKGRhdGU6IERhdGUsIGxvY2FsZTogc3RyaW5nKTogc3RyaW5nID0+IHtcclxuICBjb25zdCBtb250aE5hbWUgPSBkYXRlLnRvTG9jYWxlRGF0ZVN0cmluZyhsb2NhbGUsIHsgbW9udGg6IFwibG9uZ1wiIH0pO1xyXG4gIHJldHVybiBgJHt0b1RpdGxlQ2FzZShtb250aE5hbWUsIGxvY2FsZSl9ICR7ZGF0ZS5nZXRGdWxsWWVhcigpfWA7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgcmVzb2x2ZVVpTG9jYWxlID0gKCk6IHN0cmluZyA9PiB7XHJcbiAgY29uc3QgZnJvbUh0bWwgPSB0eXBlb2YgZG9jdW1lbnQgIT09IFwidW5kZWZpbmVkXCIgPyBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQubGFuZyA6IFwiXCI7XHJcbiAgcmV0dXJuIGZyb21IdG1sICYmIFN0cmluZyhmcm9tSHRtbCkudHJpbSgpID8gZnJvbUh0bWwgOiBcImVzLUVTXCI7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgYnVpbGRDYWxlbmRhck1vbnRoID0gKHllYXI6IG51bWJlciwgbW9udGg6IG51bWJlciwgbG9jYWxlOiBzdHJpbmcpOiB7IG1vbnRoTGFiZWw6IHN0cmluZzsgY2VsbHM6IENhbGVuZGFyQ2VsbFtdIH0gPT4ge1xyXG4gIGNvbnN0IGZpcnN0RGF5ID0gbmV3IERhdGUoeWVhciwgbW9udGgsIDEpO1xyXG4gIGNvbnN0IGRheXNJbk1vbnRoID0gbmV3IERhdGUoeWVhciwgbW9udGggKyAxLCAwKS5nZXREYXRlKCk7XHJcbiAgY29uc3Qgb2Zmc2V0ID0gKGZpcnN0RGF5LmdldERheSgpICsgNikgJSA3O1xyXG4gIGNvbnN0IGNlbGxzOiBDYWxlbmRhckNlbGxbXSA9IFtdO1xyXG5cclxuICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgb2Zmc2V0OyBpbmRleCArPSAxKSB7XHJcbiAgICBjZWxscy5wdXNoKHsgZGF0ZTogbnVsbCwgaXNvOiBcIlwiLCBpc0VtcHR5OiB0cnVlIH0pO1xyXG4gIH1cclxuXHJcbiAgZm9yIChsZXQgZGF5ID0gMTsgZGF5IDw9IGRheXNJbk1vbnRoOyBkYXkgKz0gMSkge1xyXG4gICAgY29uc3QgZGF0ZU9iaiA9IG5ldyBEYXRlKHllYXIsIG1vbnRoLCBkYXkpO1xyXG4gICAgY2VsbHMucHVzaCh7IGRhdGU6IGRhdGVPYmosIGlzbzogdG9Jc29EYXRlUmFuZ2VWYWx1ZShkYXRlT2JqKSwgaXNFbXB0eTogZmFsc2UgfSk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgbW9udGhMYWJlbDogZm9ybWF0TW9udGhMYWJlbChmaXJzdERheSwgbG9jYWxlKSxcclxuICAgIGNlbGxzLFxyXG4gIH07XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgYnVpbGREYXRlUmFuZ2VEYXlDZWxscyA9IChcclxuICBjZWxsczogQ2FsZW5kYXJDZWxsW10sXHJcbiAgc3RhcnREYXRlOiBEYXRlIHwgbnVsbCxcclxuICBlbmREYXRlOiBEYXRlIHwgbnVsbCxcclxuICBob3ZlckRhdGU6IERhdGUgfCBudWxsLFxyXG4gIHNlbGVjdGluZ1N0ZXA6IFwic3RhcnRcIiB8IFwiZW5kXCIgfCBcImRvbmVcIlxyXG4pOiBIaXN0b3J5TWFudWFsRGF5Q2VsbFtdID0+IHtcclxuICBjb25zdCBwcmV2aWV3RW5kID0gZW5kRGF0ZSB8fCAoc2VsZWN0aW5nU3RlcCA9PT0gXCJlbmRcIiA/IGhvdmVyRGF0ZSA6IG51bGwpO1xyXG5cclxuICByZXR1cm4gY2VsbHMubWFwKChjZWxsLCBpbmRleCkgPT4ge1xyXG4gICAgaWYgKGNlbGwuaXNFbXB0eSB8fCAhY2VsbC5kYXRlKSB7XHJcbiAgICAgIHJldHVybiB7IGtleTogYGVtcHR5LSR7aW5kZXh9YCwgaXNFbXB0eTogdHJ1ZSB9O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGRhdGVPYmogPSBjZWxsLmRhdGU7XHJcbiAgICBjb25zdCBpc1N0YXJ0ID0gaXNTYW1lRGF5KGRhdGVPYmosIHN0YXJ0RGF0ZSk7XHJcbiAgICBjb25zdCBpc0VuZCA9IGlzU2FtZURheShkYXRlT2JqLCBlbmREYXRlKTtcclxuICAgIGNvbnN0IGluUmFuZ2UgPSBzdGFydERhdGUgJiYgcHJldmlld0VuZCAmJiBpc0JlZm9yZURheShzdGFydERhdGUsIGRhdGVPYmopICYmIGlzQmVmb3JlRGF5KGRhdGVPYmosIHByZXZpZXdFbmQpO1xyXG4gICAgY29uc3QgaG92ZXJSYW5nZSA9IHN0YXJ0RGF0ZSAmJiAhZW5kRGF0ZSAmJiBob3ZlckRhdGUgJiYgaXNCZWZvcmVEYXkoc3RhcnREYXRlLCBkYXRlT2JqKSAmJiBpc0JlZm9yZURheShkYXRlT2JqLCBob3ZlckRhdGUpO1xyXG4gICAgY29uc3QgZGlzYWJsZWQgPSBzZWxlY3RpbmdTdGVwID09PSBcImVuZFwiICYmICEhc3RhcnREYXRlICYmIGlzQmVmb3JlRGF5KGRhdGVPYmosIHN0YXJ0RGF0ZSk7XHJcbiAgICBjb25zdCBpc1RvZGF5ID0gaXNTYW1lRGF5KGRhdGVPYmosIG5ldyBEYXRlKCkpO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIGtleTogY2VsbC5pc28sXHJcbiAgICAgIGlzRW1wdHk6IGZhbHNlLFxyXG4gICAgICBkYXRlOiBkYXRlT2JqLFxyXG4gICAgICBpc286IGNlbGwuaXNvLFxyXG4gICAgICBkYXlMYWJlbDogZGF0ZU9iai5nZXREYXRlKCksXHJcbiAgICAgIGRheUNsYXNzOiBjbGFzc05hbWVzKFxyXG4gICAgICAgIFwiZHJwLWRheVwiLFxyXG4gICAgICAgIGlzU3RhcnQgPyBcInN0YXJ0IHJhbmdlLXN0YXJ0XCIgOiBcIlwiLFxyXG4gICAgICAgIGlzRW5kID8gXCJlbmQgcmFuZ2UtZW5kXCIgOiBcIlwiLFxyXG4gICAgICAgIGluUmFuZ2UgPyBcImluLXJhbmdlXCIgOiBcIlwiLFxyXG4gICAgICAgIGhvdmVyUmFuZ2UgPyBcImhvdmVyLXJhbmdlXCIgOiBcIlwiLFxyXG4gICAgICAgIGRpc2FibGVkID8gXCJkaXNhYmxlZFwiIDogXCJcIixcclxuICAgICAgICBpc1RvZGF5ID8gXCJ0b2RheVwiIDogXCJcIlxyXG4gICAgICApLFxyXG4gICAgICBkaXNhYmxlZCxcclxuICAgIH07XHJcbiAgfSk7XHJcbn07XHJcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBBY3Rpb25CdXR0b24gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9BY3Rpb25CdXR0b24udHN4XCI7XHJcblxyXG50eXBlIEV4cGVuc2VGaWx0ZXJBY3Rpb25zUHJvcHMgPSB7XHJcbiAgY2xlYXJMYWJlbDogc3RyaW5nO1xyXG4gIGFwcGx5TGFiZWw6IHN0cmluZztcclxuICBvbkNsZWFyOiAoKSA9PiB2b2lkO1xyXG4gIG9uQXBwbHk6ICgpID0+IHZvaWQ7XHJcbn07XHJcblxyXG4vLyBTaGFyZWQgYXBwbHkvY2xlYXIgYWN0aW9uIHJvdyBmb3IgZXhwZW5zZSBzaGVldCBmaWx0ZXJzLlxyXG5jb25zdCBFeHBlbnNlRmlsdGVyQWN0aW9ucyA9ICh7XHJcbiAgY2xlYXJMYWJlbCxcclxuICBhcHBseUxhYmVsLFxyXG4gIG9uQ2xlYXIsXHJcbiAgb25BcHBseSxcclxufTogRXhwZW5zZUZpbHRlckFjdGlvbnNQcm9wcykgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTEgZ3JpZCBncmlkLWNvbHMtMiBnYXAtMiBoaXN0b3J5LWZpbHRlci1hY3Rpb25zXCI+XHJcbiAgICAgIDxBY3Rpb25CdXR0b24gbGFiZWw9e2NsZWFyTGFiZWx9IGNsYXNzTmFtZT1cInctZnVsbFwiIG9uQ2xpY2s9e29uQ2xlYXJ9IC8+XHJcbiAgICAgIDxBY3Rpb25CdXR0b24gbGFiZWw9e2FwcGx5TGFiZWx9IGNsYXNzTmFtZT1cInctZnVsbFwiIG9uQ2xpY2s9e29uQXBwbHl9IC8+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZUZpbHRlckFjdGlvbnM7XHJcbiIsICJpbXBvcnQgUmVhY3QsIHsgdXNlTWVtbyB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFNlbGVjdENvbWJvYm94IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvU2VsZWN0Q29tYm9ib3gudHN4XCI7XG5pbXBvcnQgdHlwZSB7IEF1dGhNYW5hZ2VkVXNlciB9IGZyb20gXCIuLi8uLi8uLi9jb250ZXh0L0F1dGhDb250ZXh0LnRzeFwiO1xuaW1wb3J0IHsgZm9ybWF0VXNlck5hbWVXaXRoSWQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvdXNlckxhYmVscy50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2VsZWN0T3B0aW9uIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VTZWxlY3RPcHRpb25zLnRzXCI7XG5cclxudHlwZSBFeHBlbnNlTWFuYWdlZFVzZXJGaWx0ZXJTZWxlY3RQcm9wcyA9IHtcclxuICBsYWJlbDogc3RyaW5nO1xyXG4gIHBsYWNlaG9sZGVyOiBzdHJpbmc7XHJcbiAgdmFsdWU6IHN0cmluZztcclxuICB1c2VyczogQXV0aE1hbmFnZWRVc2VyW107XG4gIGN1cnJlbnRBeFVzZXJJZD86IHN0cmluZztcbiAgY3VycmVudFVzZXJOYW1lPzogc3RyaW5nO1xuICBhbGxPcHRpb24/OiBFeHBlbnNlU2VsZWN0T3B0aW9uIHwgbnVsbDtcbiAgb25DaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIHJlYWRPbmx5PzogYm9vbGVhbjtcclxuICBkaXNhYmxlZD86IGJvb2xlYW47XHJcbiAgc2hvd0xhYmVsPzogYm9vbGVhbjtcclxuICBjbGVhck9uRW1wdHlJbnB1dD86IGJvb2xlYW47XHJcbn07XHJcblxyXG5jb25zdCBub3JtYWxpemVVc2VyVGV4dCA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZyA9PiBTdHJpbmcodmFsdWUgfHwgXCJcIikudHJpbSgpO1xuXG5jb25zdCBpc1NhbWVVc2VyID0gKGxlZnQ6IHVua25vd24sIHJpZ2h0OiB1bmtub3duKTogYm9vbGVhbiA9PiB7XG4gIGNvbnN0IG5vcm1hbGl6ZWRMZWZ0ID0gbm9ybWFsaXplVXNlclRleHQobGVmdCkudG9VcHBlckNhc2UoKTtcbiAgY29uc3Qgbm9ybWFsaXplZFJpZ2h0ID0gbm9ybWFsaXplVXNlclRleHQocmlnaHQpLnRvVXBwZXJDYXNlKCk7XG4gIHJldHVybiAhIW5vcm1hbGl6ZWRMZWZ0ICYmIG5vcm1hbGl6ZWRMZWZ0ID09PSBub3JtYWxpemVkUmlnaHQ7XG59O1xuXG5jb25zdCB0b09wdGlvblRleHQgPSAodXNlcjogQXV0aE1hbmFnZWRVc2VyLCBjdXJyZW50QXhVc2VySWQgPSBcIlwiLCBjdXJyZW50VXNlck5hbWUgPSBcIlwiKTogc3RyaW5nID0+IHtcbiAgY29uc3QgYXhVc2VySWQgPSBTdHJpbmcodXNlci5heFVzZXJJZCB8fCBcIlwiKS50cmltKCk7XG4gIGNvbnN0IG5hbWUgPSBTdHJpbmcodXNlci5uYW1lIHx8IFwiXCIpLnRyaW0oKTtcbiAgY29uc3QgY29udGV4dFVzZXJOYW1lID0gbm9ybWFsaXplVXNlclRleHQoY3VycmVudFVzZXJOYW1lKTtcbiAgaWYgKCFheFVzZXJJZCkgcmV0dXJuIFwiXCI7XG4gIGlmIChjb250ZXh0VXNlck5hbWUgJiYgaXNTYW1lVXNlcihheFVzZXJJZCwgY3VycmVudEF4VXNlcklkKSkge1xuICAgIHJldHVybiBmb3JtYXRVc2VyTmFtZVdpdGhJZChjb250ZXh0VXNlck5hbWUsIGF4VXNlcklkKTtcbiAgfVxuXG4gIHJldHVybiBmb3JtYXRVc2VyTmFtZVdpdGhJZChuYW1lLCBheFVzZXJJZCk7XG59O1xuXHJcbi8vIEZpeGVkIGxvY2FsIHVzZXIgc2VsZWN0b3IgdXNlZCB0byBmaWx0ZXIgZXhwZW5zZSBzaGVldHMgYnkgbWFuYWdlZCBBeCB1c2VyLlxyXG5jb25zdCBFeHBlbnNlTWFuYWdlZFVzZXJGaWx0ZXJTZWxlY3QgPSAoe1xyXG4gIGxhYmVsLFxyXG4gIHBsYWNlaG9sZGVyLFxyXG4gIHZhbHVlLFxuICB1c2VycyxcbiAgY3VycmVudEF4VXNlcklkID0gXCJcIixcbiAgY3VycmVudFVzZXJOYW1lID0gXCJcIixcbiAgYWxsT3B0aW9uID0gbnVsbCxcbiAgb25DaGFuZ2UsXHJcbiAgcmVhZE9ubHkgPSBmYWxzZSxcclxuICBkaXNhYmxlZCA9IGZhbHNlLFxyXG4gIHNob3dMYWJlbCA9IHRydWUsXHJcbiAgY2xlYXJPbkVtcHR5SW5wdXQgPSBmYWxzZSxcclxufTogRXhwZW5zZU1hbmFnZWRVc2VyRmlsdGVyU2VsZWN0UHJvcHMpID0+IHtcclxuICBjb25zdCBvcHRpb25zID0gdXNlTWVtbzxFeHBlbnNlU2VsZWN0T3B0aW9uW10+KCgpID0+IHtcclxuICAgIGNvbnN0IHVzZXJPcHRpb25zID0gKEFycmF5LmlzQXJyYXkodXNlcnMpID8gdXNlcnMgOiBbXSlcclxuICAgICAgLm1hcCgoZW50cnkpID0+IHtcclxuICAgICAgICBjb25zdCBheFVzZXJJZCA9IFN0cmluZyhlbnRyeS5heFVzZXJJZCB8fCBcIlwiKS50cmltKCk7XHJcbiAgICAgICAgY29uc3QgbGFiZWwgPSB0b09wdGlvblRleHQoZW50cnksIGN1cnJlbnRBeFVzZXJJZCwgY3VycmVudFVzZXJOYW1lKTtcbiAgICAgICAgaWYgKCFheFVzZXJJZCB8fCAhbGFiZWwpIHJldHVybiBudWxsO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICB2YWx1ZTogYXhVc2VySWQsXHJcbiAgICAgICAgICB0ZXh0OiBsYWJlbCxcclxuICAgICAgICB9IGFzIEV4cGVuc2VTZWxlY3RPcHRpb247XHJcbiAgICAgIH0pXHJcbiAgICAgIC5maWx0ZXIoKGVudHJ5KTogZW50cnkgaXMgRXhwZW5zZVNlbGVjdE9wdGlvbiA9PiAhIWVudHJ5KTtcclxuICAgIHJldHVybiBhbGxPcHRpb24gPyBbYWxsT3B0aW9uLCAuLi51c2VyT3B0aW9uc10gOiB1c2VyT3B0aW9ucztcclxuICB9LCBbYWxsT3B0aW9uLCBjdXJyZW50QXhVc2VySWQsIGN1cnJlbnRVc2VyTmFtZSwgdXNlcnNdKTtcblxyXG4gIHJldHVybiAoXG4gICAgPFNlbGVjdENvbWJvYm94XG4gICAgICBsYWJlbD17bGFiZWx9XHJcbiAgICAgIHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cclxuICAgICAgb3B0aW9ucz17b3B0aW9uc31cclxuICAgICAgdmFsdWU9e3ZhbHVlfVxyXG4gICAgICBvbkNoYW5nZT17b25DaGFuZ2V9XHJcbiAgICAgIHJlYWRPbmx5PXtyZWFkT25seX1cclxuICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxyXG4gICAgICBpZEJhc2U9XCJleHBlbnNlLW1hbmFnZWQtdXNlci1maWx0ZXJcIlxyXG4gICAgICBwb3J0YWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxuICAgICAgcGFuZWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxuICAgICAgYWxsb3dUZXh0SW5wdXRcbiAgICAgIHNlbGVjdGVkVGV4dE1vZGU9XCJ0ZXh0XCJcbiAgICAgIHNob3dMYWJlbD17c2hvd0xhYmVsfVxuICAgICAgY2xlYXJPbkVtcHR5SW5wdXQ9e2NsZWFyT25FbXB0eUlucHV0fVxuICAgIC8+XG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlTWFuYWdlZFVzZXJGaWx0ZXJTZWxlY3Q7XHJcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBGaWx0ZXJCdXR0b24gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9GaWx0ZXJCdXR0b24udHN4XCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VRdWlja0RhdGVGaWx0ZXJJZCB9IGZyb20gXCIuLi9jb25zdGFudHMvZXhwZW5zZVF1aWNrRGF0ZUZpbHRlckNhdGFsb2cudHNcIjtcclxuXHJcbnR5cGUgRXhwZW5zZVF1aWNrRGF0ZUZpbHRlcnNQcm9wcyA9IHtcclxuICBhY3RpdmVRdWlja0ZpbHRlcjogRXhwZW5zZVF1aWNrRGF0ZUZpbHRlcklkIHwgbnVsbDtcclxuICBvblF1aWNrRmlsdGVyQ2hhbmdlOiAoZmlsdGVySWQ6IEV4cGVuc2VRdWlja0RhdGVGaWx0ZXJJZCkgPT4gdm9pZDtcclxufTtcclxuXHJcbi8vIFNoYXJlZCBxdWljayBkYXRlIGZpbHRlcnMgdXNlZCBieSBleHBlbnNlIHNoZWV0cyBhbmQgdGlja2V0cyBwYW5lbHMuXHJcbmNvbnN0IEV4cGVuc2VRdWlja0RhdGVGaWx0ZXJzID0gKHsgYWN0aXZlUXVpY2tGaWx0ZXIsIG9uUXVpY2tGaWx0ZXJDaGFuZ2UgfTogRXhwZW5zZVF1aWNrRGF0ZUZpbHRlcnNQcm9wcykgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgZ2FwLTIgaGlzdG9yeS1xdWljay1maWx0ZXJzXCIgYXJpYS1sYWJlbD17aW5kVChcIkhpc3RvcnlfRmlsdGVyX0RhdGVcIiwgXCJEYXRlXCIpfT5cclxuICAgICAgPEZpbHRlckJ1dHRvblxyXG4gICAgICAgIGxhYmVsPXtpbmRUKFwiSGlzdG9yeV9RdWlja19DdXN0b21cIiwgXCJEYXRlXCIpfVxyXG4gICAgICAgIGFjdGl2ZT17YWN0aXZlUXVpY2tGaWx0ZXIgPT09IFwiY3VzdG9tXCJ9XHJcbiAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsXCJcclxuICAgICAgICBvbkNsaWNrPXsoKSA9PiBvblF1aWNrRmlsdGVyQ2hhbmdlKFwiY3VzdG9tXCIpfVxyXG4gICAgICAvPlxyXG4gICAgICA8RmlsdGVyQnV0dG9uXHJcbiAgICAgICAgbGFiZWw9e2luZFQoXCJIaXN0b3J5X1F1aWNrXzdEYXlzXCIsIFwiNyBkYXlzXCIpfVxyXG4gICAgICAgIGFjdGl2ZT17YWN0aXZlUXVpY2tGaWx0ZXIgPT09IFwiZGF5cy03XCJ9XHJcbiAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsXCJcclxuICAgICAgICBvbkNsaWNrPXsoKSA9PiBvblF1aWNrRmlsdGVyQ2hhbmdlKFwiZGF5cy03XCIpfVxyXG4gICAgICAvPlxyXG4gICAgICA8RmlsdGVyQnV0dG9uXHJcbiAgICAgICAgbGFiZWw9e2luZFQoXCJIaXN0b3J5X1F1aWNrXzMwRGF5c1wiLCBcIjMwIGRheXNcIil9XHJcbiAgICAgICAgYWN0aXZlPXthY3RpdmVRdWlja0ZpbHRlciA9PT0gXCJkYXlzLTMwXCJ9XHJcbiAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsXCJcclxuICAgICAgICBvbkNsaWNrPXsoKSA9PiBvblF1aWNrRmlsdGVyQ2hhbmdlKFwiZGF5cy0zMFwiKX1cclxuICAgICAgLz5cclxuICAgICAgPEZpbHRlckJ1dHRvblxyXG4gICAgICAgIGxhYmVsPXtpbmRUKFwiSGlzdG9yeV9RdWlja185MERheXNcIiwgXCI5MCBkYXlzXCIpfVxyXG4gICAgICAgIGFjdGl2ZT17YWN0aXZlUXVpY2tGaWx0ZXIgPT09IFwiZGF5cy05MFwifVxyXG4gICAgICAgIGNsYXNzTmFtZT1cInctZnVsbFwiXHJcbiAgICAgICAgb25DbGljaz17KCkgPT4gb25RdWlja0ZpbHRlckNoYW5nZShcImRheXMtOTBcIil9XHJcbiAgICAgIC8+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVF1aWNrRGF0ZUZpbHRlcnM7XHJcbiIsICJpbXBvcnQgdHlwZSB7IEV4cGVuc2VRdWlja0RhdGVGaWx0ZXJJZCB9IGZyb20gXCIuLi9jb25zdGFudHMvZXhwZW5zZVF1aWNrRGF0ZUZpbHRlckNhdGFsb2cudHNcIjtcbmltcG9ydCB7IHNhZmVUZXh0LCBzdGFydE9mRGF5LCB0b0lzb0RhdGUgfSBmcm9tIFwiLi9leHBlbnNlVWlVdGlscy50c1wiO1xuXG5jb25zdCBRVUlDS19EQVRFX0ZJTFRFUl9SQU5HRVM6IEFycmF5PHtcbiAgaWQ6IEV4Y2x1ZGU8RXhwZW5zZVF1aWNrRGF0ZUZpbHRlcklkLCBcImN1c3RvbVwiPjtcbiAgZGF5c1RvU3VidHJhY3Q6IG51bWJlcjtcbn0+ID0gW1xuICB7IGlkOiBcImRheXMtN1wiLCBkYXlzVG9TdWJ0cmFjdDogNiB9LFxuICB7IGlkOiBcImRheXMtMzBcIiwgZGF5c1RvU3VidHJhY3Q6IDI5IH0sXG4gIHsgaWQ6IFwiZGF5cy05MFwiLCBkYXlzVG9TdWJ0cmFjdDogODkgfSxcbl07XG5cbi8vIFJlc29sdmVzIHdoaWNoIHF1aWNrIGRhdGUgcHJlc2V0IG1hdGNoZXMgb25lIHBlcnNpc3RlZCBleHBlbnNlIGRhdGUgcmFuZ2UuXG5leHBvcnQgY29uc3QgcmVzb2x2ZUV4cGVuc2VRdWlja0RhdGVGaWx0ZXJGcm9tUmFuZ2UgPSAoXG4gIGZyb21EYXRlOiBzdHJpbmcsXG4gIHRvRGF0ZTogc3RyaW5nXG4pOiBFeHBlbnNlUXVpY2tEYXRlRmlsdGVySWQgfCBudWxsID0+IHtcbiAgY29uc3Qgbm9ybWFsaXplZEZyb21EYXRlID0gc2FmZVRleHQoZnJvbURhdGUpO1xuICBjb25zdCBub3JtYWxpemVkVG9EYXRlID0gc2FmZVRleHQodG9EYXRlKTtcbiAgaWYgKCFub3JtYWxpemVkRnJvbURhdGUgfHwgIW5vcm1hbGl6ZWRUb0RhdGUpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGNvbnN0IHRvZGF5ID0gc3RhcnRPZkRheShuZXcgRGF0ZSgpKTtcbiAgaWYgKG5vcm1hbGl6ZWRUb0RhdGUgIT09IHRvSXNvRGF0ZSh0b2RheSkpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGZvciAoY29uc3QgZW50cnkgb2YgUVVJQ0tfREFURV9GSUxURVJfUkFOR0VTKSB7XG4gICAgY29uc3QgY2FuZGlkYXRlRnJvbURhdGUgPSBuZXcgRGF0ZSh0b2RheSk7XG4gICAgY2FuZGlkYXRlRnJvbURhdGUuc2V0RGF0ZSh0b2RheS5nZXREYXRlKCkgLSBlbnRyeS5kYXlzVG9TdWJ0cmFjdCk7XG4gICAgaWYgKG5vcm1hbGl6ZWRGcm9tRGF0ZSA9PT0gdG9Jc29EYXRlKGNhbmRpZGF0ZUZyb21EYXRlKSkge1xuICAgICAgcmV0dXJuIGVudHJ5LmlkO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBudWxsO1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFXQSxJQUFNLDRCQUE0QjtBQUVsQyxJQUFNLDRCQUE0QixDQUFDLFVBQW9DO0FBQ3JFLFNBQU8sT0FBTyxVQUFVLEtBQUssS0FBSyxPQUFPLEtBQUssS0FBSztBQUNyRDtBQUdBLElBQU0sNEJBQTRCLENBQUMsaUJBQXdDO0FBQ3pFLE1BQUksaUJBQWlCLCtCQUErQjtBQUNsRCxXQUFPO0FBQUEsRUFDVDtBQUVBLE1BQUksQ0FBQywwQkFBMEIsWUFBWSxHQUFHO0FBQzVDLFdB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RSw4Q0FBQyxTQUFJLFdBQVUsZ0RBQStDLGNBQVksS0FBSyx1QkFBdUIsTUFBTSxHQUMxRztBQUFBO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQyxPQUFPLEtBQUssd0JBQXdCLE1BQU07QUFBQSxRQUMxQyxRQUFRLHNCQUFzQjtBQUFBLFFBQzlCLFdBQVU7QUFBQSxRQUNWLFNBQVMsTUFBTSxvQkFBb0IsUUFBUTtBQUFBO0FBQUEsSUFDN0M7QUFBQSxJQUNBO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQyxPQUFPLEtBQUssdUJBQXVCLFFBQVE7QUFBQSxRQUMzQyxRQUFRLHNCQUFzQjtBQUFBLFFBQzlCLFdBQVU7QUFBQSxRQUNWLFNBQVMsTUFBTSxvQkFBb0IsUUFBUTtBQUFBO0FBQUEsSUFDN0M7QUFBQSxJQUNBO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQyxPQUFPLEtBQUssd0JBQXdCLFNBQVM7QUFBQSxRQUM3QyxRQUFRLHNCQUFzQjtBQUFBLFFBQzlCLFdBQVU7QUFBQSxRQUNWLFNBQVMsTUFBTSxvQkFBb0IsU0FBUztBQUFBO0FBQUEsSUFDOUM7QUFBQSxJQUNBO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQyxPQUFPLEtBQUssd0JBQXdCLFNBQVM7QUFBQSxRQUM3QyxRQUFRLHNCQUFzQjtBQUFBLFFBQzlCLFdBQVU7QUFBQSxRQUNWLFNBQVMsTUFBTSxvQkFBb0IsU0FBUztBQUFBO0FBQUEsSUFDOUM7QUFBQSxLQUNGO0FBRUo7QUFFQSxJQUFPLGtDQUFROzs7QUN2Q2YsSUFBTSwyQkFHRDtBQUFBLEVBQ0gsRUFBRSxJQUFJLFVBQVUsZ0JBQWdCLEVBQUU7QUFBQSxFQUNsQyxFQUFFLElBQUksV0FBVyxnQkFBZ0IsR0FBRztBQUFBLEVBQ3BDLEVBQUUsSUFBSSxXQUFXLGdCQUFnQixHQUFHO0FBQ3RDO0FBR08sSUFBTSx5Q0FBeUMsQ0FDcEQsVUFDQSxXQUNvQztBQUNwQyxRQUFNLHFCQUFxQixTQUFTLFFBQVE7QUFDNUMsUUFBTSxtQkFBbUIsU0FBUyxNQUFNO0FBQ3hDLE1BQUksQ0FBQyxzQkFBc0IsQ0FBQyxrQkFBa0I7QUFDNUMsV0FBTztBQUFBLEVBQ1Q7QUFFQSxRQUFNLFFBQVEsV0FBVyxvQkFBSSxLQUFLLENBQUM7QUFDbkMsTUFBSSxxQkFBcUIsVUFBVSxLQUFLLEdBQUc7QUFDekMsV0FBTztBQUFBLEVBQ1Q7QUFFQSxhQUFXLFNBQVMsMEJBQTBCO0FBQzVDLFVBQU0sb0JBQW9CLElBQUksS0FBSyxLQUFLO0FBQ3hDLHNCQUFrQixRQUFRLE1BQU0sUUFBUSxJQUFJLE1BQU0sY0FBYztBQUNoRSxRQUFJLHVCQUF1QixVQUFVLGlCQUFpQixHQUFHO0FBQ3ZELGFBQU8sTUFBTTtBQUFBLElBQ2Y7QUFBQSxFQUNGO0FBRUEsU0FBTztBQUNUOyIsCiAgIm5hbWVzIjogWyJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSIsICJsYWJlbCIsICJpbXBvcnRfanN4X3J1bnRpbWUiXQp9Cg==
