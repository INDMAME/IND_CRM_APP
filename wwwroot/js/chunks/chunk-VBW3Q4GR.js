import {
  ActionButton_default,
  FilterButton_default,
  HistoryManualDatePicker_default
} from "./chunk-7Z3NMBR5.js";
import {
  DEFAULT_EXPENSE_STATUS_FILTER
} from "./chunk-ZN2XQFXY.js";
import {
  SelectCombobox_default
} from "./chunk-YGPFKAYG.js";
import {
  classNames,
  indT
} from "./chunk-BYICIYT4.js";
import {
  require_jsx_runtime,
  require_react
} from "./chunk-BWM3JLWG.js";
import {
  __toESM
} from "./chunk-45FWCHS2.js";

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
  const safeFilterKey = normalizeOptionalText(filters.filterKey);
  return {
    page: nextPage,
    pageSize: nextPageSize,
    createdDateFrom: normalizeOptionalText(filters.fromDate),
    createdDateTo: normalizeOptionalText(filters.toDate),
    searchKey: safeFilterKey,
    filter: safeFilterKey,
    status: resolveTicketStatusFilter(filters.statusFilter),
    currencyCode: normalizeOptionalText(filters.currencyCode),
    gastoType: resolveTicketGastoTypeFilter(filters.gastoTypeFilter),
    processedByAI: resolveProcessedByAiFilter(filters.processedByIaFilter)
  };
};

export {
  ExpenseDateRangeFilter_default,
  ExpenseFilterActions_default,
  ExpenseManagedUserFilterSelect_default,
  ExpenseQuickDateFilters_default,
  buildExpenseListPayload,
  buildExpenseSheetSuggestPayload,
  buildExpenseTicketListPayload
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VEYXRlUmFuZ2VGaWx0ZXIudHN4IiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdXRpbHMvZXhwZW5zZURhdGVSYW5nZVV0aWxzLnRzIiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlRmlsdGVyQWN0aW9ucy50c3giLCAiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VNYW5hZ2VkVXNlckZpbHRlclNlbGVjdC50c3giLCAiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VRdWlja0RhdGVGaWx0ZXJzLnRzeCIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3V0aWxzL2V4cGVuc2VQYXlsb2FkQnVpbGRlcnMudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCBIaXN0b3J5TWFudWFsRGF0ZVBpY2tlciwge1xuICBIaXN0b3J5TWFudWFsRGF5Q2VsbCxcbn0gZnJvbSBcIi4uLy4uL3Zpc2l0YXMvaGlzdG9yaWFsL0hpc3RvcnlNYW51YWxEYXRlUGlja2VyLnRzeFwiO1xuaW1wb3J0IHtcbiAgYnVpbGRDYWxlbmRhck1vbnRoLFxuICBidWlsZERhdGVSYW5nZURheUNlbGxzLFxuICBmb2N1c0RhdGVSYW5nZVNlY3Rpb24sXG4gIGZvcm1hdERhdGVSYW5nZURpc3BsYXksXG4gIGlzQmVmb3JlRGF5LFxuICBwYXJzZUlzb0RhdGVSYW5nZVZhbHVlLFxuICByZXNvbHZlVWlMb2NhbGUsXG4gIHRvSXNvRGF0ZVJhbmdlVmFsdWUsXG4gIHRvU2VudGVuY2VDYXNlLFxufSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZURhdGVSYW5nZVV0aWxzLnRzXCI7XG5cbnR5cGUgRXhwZW5zZURhdGVSYW5nZUZpbHRlclByb3BzID0ge1xuICBmcm9tRGF0ZTogc3RyaW5nO1xuICB0b0RhdGU6IHN0cmluZztcbiAgb25DaGFuZ2U6IChmcm9tRGF0ZTogc3RyaW5nLCB0b0RhdGU6IHN0cmluZykgPT4gdm9pZDtcbiAgb25SYW5nZUNvbXBsZXRlPzogKGZyb21EYXRlOiBzdHJpbmcsIHRvRGF0ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBhdXRvT3BlblJlcXVlc3RJZD86IG51bWJlcjtcbiAgc2hvd01hbnVhbEVycm9yPzogYm9vbGVhbjtcbiAgc2hvd1N0YXJ0RXJyb3I/OiBib29sZWFuO1xuICBzaG93RW5kRXJyb3I/OiBib29sZWFuO1xufTtcblxuLy8gU2hhcmVkIGRhdGUgcmFuZ2UgcGlja2VyIGZvciBleHBlbnNlIGZpbHRlcnMgYmFzZWQgb24gdGhlIGhpc3RvcnkgZGF0ZSBjb21wb25lbnQuXG5jb25zdCBFeHBlbnNlRGF0ZVJhbmdlRmlsdGVyID0gKHtcbiAgZnJvbURhdGUsXG4gIHRvRGF0ZSxcbiAgb25DaGFuZ2UsXG4gIG9uUmFuZ2VDb21wbGV0ZSxcbiAgYXV0b09wZW5SZXF1ZXN0SWQgPSAwLFxuICBzaG93TWFudWFsRXJyb3IgPSBmYWxzZSxcbiAgc2hvd1N0YXJ0RXJyb3IgPSBmYWxzZSxcbiAgc2hvd0VuZEVycm9yID0gZmFsc2UsXG59OiBFeHBlbnNlRGF0ZVJhbmdlRmlsdGVyUHJvcHMpID0+IHtcbiAgY29uc3QgbG9jYWxlID0gdXNlTWVtbygoKSA9PiByZXNvbHZlVWlMb2NhbGUoKSwgW10pO1xuICBjb25zdCBhY3RpdmF0b3JSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgcG9wb3ZlclJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xuXG4gIGNvbnN0IFtzdGFydERhdGUsIHNldFN0YXJ0RGF0ZV0gPSB1c2VTdGF0ZTxEYXRlIHwgbnVsbD4oKCkgPT4gcGFyc2VJc29EYXRlUmFuZ2VWYWx1ZShmcm9tRGF0ZSkpO1xuICBjb25zdCBbZW5kRGF0ZSwgc2V0RW5kRGF0ZV0gPSB1c2VTdGF0ZTxEYXRlIHwgbnVsbD4oKCkgPT4gcGFyc2VJc29EYXRlUmFuZ2VWYWx1ZSh0b0RhdGUpKTtcbiAgY29uc3QgW2hvdmVyRGF0ZSwgc2V0SG92ZXJEYXRlXSA9IHVzZVN0YXRlPERhdGUgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW3NlbGVjdGluZ1N0ZXAsIHNldFNlbGVjdGluZ1N0ZXBdID0gdXNlU3RhdGU8XCJzdGFydFwiIHwgXCJlbmRcIiB8IFwiZG9uZVwiPihcInN0YXJ0XCIpO1xuICBjb25zdCBbaXNPcGVuLCBzZXRJc09wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIGNvbnN0IG5vdyA9IHVzZU1lbW8oKCkgPT4gbmV3IERhdGUoKSwgW10pO1xuICBjb25zdCBbY3VycmVudE1vbnRoLCBzZXRDdXJyZW50TW9udGhdID0gdXNlU3RhdGUoKHBhcnNlSXNvRGF0ZVJhbmdlVmFsdWUoZnJvbURhdGUpIHx8IG5vdykuZ2V0TW9udGgoKSk7XG4gIGNvbnN0IFtjdXJyZW50WWVhciwgc2V0Q3VycmVudFllYXJdID0gdXNlU3RhdGUoKHBhcnNlSXNvRGF0ZVJhbmdlVmFsdWUoZnJvbURhdGUpIHx8IG5vdykuZ2V0RnVsbFllYXIoKSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBzZXRTdGFydERhdGUocGFyc2VJc29EYXRlUmFuZ2VWYWx1ZShmcm9tRGF0ZSkpO1xuICB9LCBbZnJvbURhdGVdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHNldEVuZERhdGUocGFyc2VJc29EYXRlUmFuZ2VWYWx1ZSh0b0RhdGUpKTtcbiAgfSwgW3RvRGF0ZV0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgb25DaGFuZ2Uoc3RhcnREYXRlID8gdG9Jc29EYXRlUmFuZ2VWYWx1ZShzdGFydERhdGUpIDogXCJcIiwgZW5kRGF0ZSA/IHRvSXNvRGF0ZVJhbmdlVmFsdWUoZW5kRGF0ZSkgOiBcIlwiKTtcbiAgfSwgW3N0YXJ0RGF0ZSwgZW5kRGF0ZSwgb25DaGFuZ2VdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghaXNPcGVuKSByZXR1cm47XG5cbiAgICBjb25zdCBoYW5kbGVPdXRzaWRlID0gKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQgYXMgTm9kZSB8IG51bGw7XG4gICAgICBpZiAoIXRhcmdldCkgcmV0dXJuO1xuICAgICAgaWYgKHBvcG92ZXJSZWYuY3VycmVudD8uY29udGFpbnModGFyZ2V0KSkgcmV0dXJuO1xuICAgICAgaWYgKGFjdGl2YXRvclJlZi5jdXJyZW50Py5jb250YWlucyh0YXJnZXQpKSByZXR1cm47XG4gICAgICBzZXRJc09wZW4oZmFsc2UpO1xuICAgICAgc2V0SG92ZXJEYXRlKG51bGwpO1xuICAgIH07XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGhhbmRsZU91dHNpZGUpO1xuICAgIHJldHVybiAoKSA9PiBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGhhbmRsZU91dHNpZGUpO1xuICB9LCBbaXNPcGVuXSk7XG5cbiAgY29uc3Qgb3BlblBvcG92ZXIgPSB1c2VDYWxsYmFjayhcbiAgICAoc2VjdGlvbjogXCJzdGFydFwiIHwgXCJlbmRcIikgPT4ge1xuICAgICAgc2V0U2VsZWN0aW5nU3RlcChzZWN0aW9uKTtcbiAgICAgIHNldElzT3Blbih0cnVlKTtcbiAgICAgIHNldEhvdmVyRGF0ZShudWxsKTtcblxuICAgICAgY29uc3QgYmFzZSA9IHNlY3Rpb24gPT09IFwic3RhcnRcIiA/IHN0YXJ0RGF0ZSB8fCBlbmREYXRlIHx8IG5vdyA6IGVuZERhdGUgfHwgc3RhcnREYXRlIHx8IG5vdztcbiAgICAgIHNldEN1cnJlbnRNb250aChiYXNlLmdldE1vbnRoKCkpO1xuICAgICAgc2V0Q3VycmVudFllYXIoYmFzZS5nZXRGdWxsWWVhcigpKTtcbiAgICB9LFxuICAgIFtlbmREYXRlLCBub3csIHN0YXJ0RGF0ZV1cbiAgKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChhdXRvT3BlblJlcXVlc3RJZCA8PSAwKSByZXR1cm47XG4gICAgc2V0U2VsZWN0aW5nU3RlcChcInN0YXJ0XCIpO1xuICAgIHNldElzT3Blbih0cnVlKTtcbiAgICBzZXRIb3ZlckRhdGUobnVsbCk7XG4gICAgY29uc3QgYmFzZSA9IHN0YXJ0RGF0ZSB8fCBlbmREYXRlIHx8IG5vdztcbiAgICBzZXRDdXJyZW50TW9udGgoYmFzZS5nZXRNb250aCgpKTtcbiAgICBzZXRDdXJyZW50WWVhcihiYXNlLmdldEZ1bGxZZWFyKCkpO1xuICB9LCBbYXV0b09wZW5SZXF1ZXN0SWRdKTtcblxuICBjb25zdCBvbkFjdGl2YXRvcktleURvd24gPSB1c2VDYWxsYmFjayhcbiAgICAoZXZlbnQ6IFJlYWN0LktleWJvYXJkRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB7XG4gICAgICBpZiAoZXZlbnQua2V5ICE9PSBcIkVudGVyXCIgJiYgZXZlbnQua2V5ICE9PSBcIiBcIikgcmV0dXJuO1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIG9wZW5Qb3BvdmVyKFwic3RhcnRcIik7XG4gICAgfSxcbiAgICBbb3BlblBvcG92ZXJdXG4gICk7XG5cbiAgY29uc3Qgb25TZWN0aW9uS2V5RG93biA9IHVzZUNhbGxiYWNrKFxuICAgIChldmVudDogUmVhY3QuS2V5Ym9hcmRFdmVudDxIVE1MRGl2RWxlbWVudD4sIHNlY3Rpb246IFwic3RhcnRcIiB8IFwiZW5kXCIpID0+IHtcbiAgICAgIGlmIChldmVudC5rZXkgIT09IFwiRW50ZXJcIiAmJiBldmVudC5rZXkgIT09IFwiIFwiKSByZXR1cm47XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgb3BlblBvcG92ZXIoc2VjdGlvbik7XG4gICAgfSxcbiAgICBbb3BlblBvcG92ZXJdXG4gICk7XG5cbiAgY29uc3Qgb25DbGVhciA9IHVzZUNhbGxiYWNrKChldmVudDogUmVhY3QuTW91c2VFdmVudCkgPT4ge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgc2V0U3RhcnREYXRlKG51bGwpO1xuICAgIHNldEVuZERhdGUobnVsbCk7XG4gICAgc2V0SG92ZXJEYXRlKG51bGwpO1xuICAgIHNldFNlbGVjdGluZ1N0ZXAoXCJzdGFydFwiKTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IG9uUHJldk1vbnRoID0gdXNlQ2FsbGJhY2soKGV2ZW50OiBSZWFjdC5Nb3VzZUV2ZW50PEhUTUxCdXR0b25FbGVtZW50PikgPT4ge1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHNldEN1cnJlbnRNb250aCgocHJldmlvdXMpID0+IHtcbiAgICAgIGNvbnN0IG5leHQgPSBwcmV2aW91cyAtIDE7XG4gICAgICBpZiAobmV4dCA8IDApIHtcbiAgICAgICAgc2V0Q3VycmVudFllYXIoKHllYXIpID0+IHllYXIgLSAxKTtcbiAgICAgICAgcmV0dXJuIDExO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5leHQ7XG4gICAgfSk7XG4gIH0sIFtdKTtcblxuICBjb25zdCBvbk5leHRNb250aCA9IHVzZUNhbGxiYWNrKChldmVudDogUmVhY3QuTW91c2VFdmVudDxIVE1MQnV0dG9uRWxlbWVudD4pID0+IHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBzZXRDdXJyZW50TW9udGgoKHByZXZpb3VzKSA9PiB7XG4gICAgICBjb25zdCBuZXh0ID0gcHJldmlvdXMgKyAxO1xuICAgICAgaWYgKG5leHQgPiAxMSkge1xuICAgICAgICBzZXRDdXJyZW50WWVhcigoeWVhcikgPT4geWVhciArIDEpO1xuICAgICAgICByZXR1cm4gMDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXh0O1xuICAgIH0pO1xuICB9LCBbXSk7XG5cbiAgY29uc3Qgb25EYXlDbGljayA9IHVzZUNhbGxiYWNrKFxuICAgIChkYXk6IEhpc3RvcnlNYW51YWxEYXlDZWxsKSA9PiB7XG4gICAgICBpZiAoIWRheS5kYXRlIHx8IGRheS5kaXNhYmxlZCkgcmV0dXJuO1xuXG4gICAgICBjb25zdCBuZXh0RGF0ZSA9IG5ldyBEYXRlKGRheS5kYXRlLmdldEZ1bGxZZWFyKCksIGRheS5kYXRlLmdldE1vbnRoKCksIGRheS5kYXRlLmdldERhdGUoKSk7XG5cbiAgICAgIGlmICghc3RhcnREYXRlIHx8IHNlbGVjdGluZ1N0ZXAgPT09IFwic3RhcnRcIikge1xuICAgICAgICBzZXRTdGFydERhdGUobmV4dERhdGUpO1xuICAgICAgICBpZiAoZW5kRGF0ZSAmJiBpc0JlZm9yZURheShlbmREYXRlLCBuZXh0RGF0ZSkpIHtcbiAgICAgICAgICBzZXRFbmREYXRlKG51bGwpO1xuICAgICAgICB9XG4gICAgICAgIHNldFNlbGVjdGluZ1N0ZXAoXCJlbmRcIik7XG4gICAgICAgIHNldEN1cnJlbnRNb250aChuZXh0RGF0ZS5nZXRNb250aCgpKTtcbiAgICAgICAgc2V0Q3VycmVudFllYXIobmV4dERhdGUuZ2V0RnVsbFllYXIoKSk7XG4gICAgICAgIGZvY3VzRGF0ZVJhbmdlU2VjdGlvbihhY3RpdmF0b3JSZWYuY3VycmVudCwgXCJlbmRcIik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHNlbGVjdGluZ1N0ZXAgPT09IFwiZW5kXCIpIHtcbiAgICAgICAgbGV0IGZpbmFsU3RhcnQgPSBzdGFydERhdGU7XG4gICAgICAgIGxldCBmaW5hbEVuZCA9IG5leHREYXRlO1xuXG4gICAgICAgIGlmIChpc0JlZm9yZURheShuZXh0RGF0ZSwgc3RhcnREYXRlKSkge1xuICAgICAgICAgIGZpbmFsU3RhcnQgPSBuZXh0RGF0ZTtcbiAgICAgICAgICBmaW5hbEVuZCA9IHN0YXJ0RGF0ZTtcbiAgICAgICAgICBzZXRFbmREYXRlKGZpbmFsRW5kKTtcbiAgICAgICAgICBzZXRTdGFydERhdGUoZmluYWxTdGFydCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2V0RW5kRGF0ZShmaW5hbEVuZCk7XG4gICAgICAgIH1cblxuICAgICAgICBvblJhbmdlQ29tcGxldGU/Lih0b0lzb0RhdGVSYW5nZVZhbHVlKGZpbmFsU3RhcnQpLCB0b0lzb0RhdGVSYW5nZVZhbHVlKGZpbmFsRW5kKSk7XG4gICAgICAgIHNldFNlbGVjdGluZ1N0ZXAoXCJkb25lXCIpO1xuICAgICAgICBzZXRJc09wZW4oZmFsc2UpO1xuICAgICAgICBzZXRIb3ZlckRhdGUobnVsbCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBbZW5kRGF0ZSwgb25SYW5nZUNvbXBsZXRlLCBzZWxlY3RpbmdTdGVwLCBzdGFydERhdGVdXG4gICk7XG5cbiAgY29uc3Qgb25EYXlIb3ZlciA9IHVzZUNhbGxiYWNrKFxuICAgIChkYXk6IEhpc3RvcnlNYW51YWxEYXlDZWxsKSA9PiB7XG4gICAgICBpZiAoIWRheS5kYXRlIHx8IHNlbGVjdGluZ1N0ZXAgIT09IFwiZW5kXCIgfHwgIXN0YXJ0RGF0ZSkgcmV0dXJuO1xuICAgICAgc2V0SG92ZXJEYXRlKG5ldyBEYXRlKGRheS5kYXRlLmdldEZ1bGxZZWFyKCksIGRheS5kYXRlLmdldE1vbnRoKCksIGRheS5kYXRlLmdldERhdGUoKSkpO1xuICAgIH0sXG4gICAgW3NlbGVjdGluZ1N0ZXAsIHN0YXJ0RGF0ZV1cbiAgKTtcblxuICBjb25zdCBvbkdyaWRNb3VzZUxlYXZlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIHNldEhvdmVyRGF0ZShudWxsKTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IGNhbGVuZGFyID0gdXNlTWVtbygoKSA9PiB7XG4gICAgcmV0dXJuIGJ1aWxkQ2FsZW5kYXJNb250aChjdXJyZW50WWVhciwgY3VycmVudE1vbnRoLCBsb2NhbGUpO1xuICB9LCBbY3VycmVudE1vbnRoLCBjdXJyZW50WWVhciwgbG9jYWxlXSk7XG5cbiAgY29uc3QgZGF5Q2VsbHMgPSB1c2VNZW1vKFxuICAgICgpID0+IGJ1aWxkRGF0ZVJhbmdlRGF5Q2VsbHMoY2FsZW5kYXIuY2VsbHMsIHN0YXJ0RGF0ZSwgZW5kRGF0ZSwgaG92ZXJEYXRlLCBzZWxlY3RpbmdTdGVwKSxcbiAgICBbY2FsZW5kYXIuY2VsbHMsIGVuZERhdGUsIGhvdmVyRGF0ZSwgc2VsZWN0aW5nU3RlcCwgc3RhcnREYXRlXVxuICApO1xuXG4gIGNvbnN0IGxhYmVsRnJvbSA9IHRvU2VudGVuY2VDYXNlKGluZFQoXCJIaXN0b3J5X0Zyb21cIiwgXCJGcm9tXCIpLCBsb2NhbGUpO1xuICBjb25zdCBsYWJlbFRvID0gdG9TZW50ZW5jZUNhc2UoaW5kVChcIkhpc3RvcnlfVG9cIiwgXCJUb1wiKSwgbG9jYWxlKTtcblxuICByZXR1cm4gKFxuICAgIDxIaXN0b3J5TWFudWFsRGF0ZVBpY2tlclxuICAgICAgYWN0aXZhdG9yUmVmPXthY3RpdmF0b3JSZWZ9XG4gICAgICBwb3BvdmVyUmVmPXtwb3BvdmVyUmVmfVxuICAgICAgc2hvd01hbnVhbEVycm9yPXtzaG93TWFudWFsRXJyb3J9XG4gICAgICBzaG93U3RhcnRFcnJvcj17c2hvd1N0YXJ0RXJyb3J9XG4gICAgICBzaG93RW5kRXJyb3I9e3Nob3dFbmRFcnJvcn1cbiAgICAgIGZpbHRlclRpdGxlPXtpbmRUKFwiSGlzdG9yeV9GaWx0ZXJfRGF0ZVwiLCBcIkRhdGVcIil9XG4gICAgICBpc09wZW49e2lzT3Blbn1cbiAgICAgIHNlbGVjdGluZ1N0ZXA9e3NlbGVjdGluZ1N0ZXB9XG4gICAgICBsYWJlbEZyb209e2xhYmVsRnJvbX1cbiAgICAgIGxhYmVsVG89e2xhYmVsVG99XG4gICAgICBzdGFydERhdGVUZXh0PXtzdGFydERhdGUgPyBmb3JtYXREYXRlUmFuZ2VEaXNwbGF5KHN0YXJ0RGF0ZSwgbG9jYWxlKSA6IGluZFQoXCJIaXN0b3J5X0FkZERhdGVcIiwgXCJBZGQgZGF0ZVwiKX1cbiAgICAgIGVuZERhdGVUZXh0PXtlbmREYXRlID8gZm9ybWF0RGF0ZVJhbmdlRGlzcGxheShlbmREYXRlLCBsb2NhbGUpIDogaW5kVChcIkhpc3RvcnlfQWRkRGF0ZVwiLCBcIkFkZCBkYXRlXCIpfVxuICAgICAgY2xlYXJSYW5nZUxhYmVsPXtpbmRUKFwiSGlzdG9yeV9DbGVhclJhbmdlXCIsIFwiQ2xlYXIgcmFuZ2VcIil9XG4gICAgICBoYXNTZWxlY3RlZFJhbmdlPXshIXN0YXJ0RGF0ZSB8fCAhIWVuZERhdGV9XG4gICAgICBtb250aExhYmVsPXtjYWxlbmRhci5tb250aExhYmVsfVxuICAgICAgd2Vla0RheUxhYmVscz17W1xuICAgICAgICBpbmRUKFwiSGlzdG9yeV9EYXlfTW9uXCIsIFwiTW9uXCIpLFxuICAgICAgICBpbmRUKFwiSGlzdG9yeV9EYXlfVHVlXCIsIFwiVHVlXCIpLFxuICAgICAgICBpbmRUKFwiSGlzdG9yeV9EYXlfV2VkXCIsIFwiV2VkXCIpLFxuICAgICAgICBpbmRUKFwiSGlzdG9yeV9EYXlfVGh1XCIsIFwiVGh1XCIpLFxuICAgICAgICBpbmRUKFwiSGlzdG9yeV9EYXlfRnJpXCIsIFwiRnJpXCIpLFxuICAgICAgICBpbmRUKFwiSGlzdG9yeV9EYXlfU2F0XCIsIFwiU2F0XCIpLFxuICAgICAgICBpbmRUKFwiSGlzdG9yeV9EYXlfU3VuXCIsIFwiU3VuXCIpLFxuICAgICAgXX1cbiAgICAgIHN0YXR1c1RleHQ9e1xuICAgICAgICBzZWxlY3RpbmdTdGVwID09PSBcInN0YXJ0XCJcbiAgICAgICAgICA/IGluZFQoXCJIaXN0b3J5X1N0YXR1c19TZWxlY3RTdGFydFwiLCBcIlNlbGVjdCBzdGFydCBkYXRlXCIpXG4gICAgICAgICAgOiBpbmRUKFwiSGlzdG9yeV9TdGF0dXNfU2VsZWN0RW5kXCIsIFwiU2VsZWN0IGVuZCBkYXRlXCIpXG4gICAgICB9XG4gICAgICBkYXlDZWxscz17ZGF5Q2VsbHN9XG4gICAgICBwcmV2TW9udGhMYWJlbD17aW5kVChcIkhpc3RvcnlfUHJldk1vbnRoXCIsIFwiUHJldmlvdXMgbW9udGhcIil9XG4gICAgICBuZXh0TW9udGhMYWJlbD17aW5kVChcIkhpc3RvcnlfTmV4dE1vbnRoXCIsIFwiTmV4dCBtb250aFwiKX1cbiAgICAgIG9uT3BlblBvcG92ZXI9e29wZW5Qb3BvdmVyfVxuICAgICAgb25BY3RpdmF0b3JLZXlEb3duPXtvbkFjdGl2YXRvcktleURvd259XG4gICAgICBvblNlY3Rpb25LZXlEb3duPXtvblNlY3Rpb25LZXlEb3dufVxuICAgICAgb25DbGVhcj17b25DbGVhcn1cbiAgICAgIG9uUHJldk1vbnRoPXtvblByZXZNb250aH1cbiAgICAgIG9uTmV4dE1vbnRoPXtvbk5leHRNb250aH1cbiAgICAgIG9uR3JpZE1vdXNlTGVhdmU9e29uR3JpZE1vdXNlTGVhdmV9XG4gICAgICBvbkRheUNsaWNrPXtvbkRheUNsaWNrfVxuICAgICAgb25EYXlIb3Zlcj17b25EYXlIb3Zlcn1cbiAgICAvPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZURhdGVSYW5nZUZpbHRlcjtcbiIsICJpbXBvcnQgeyBjbGFzc05hbWVzIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2NsYXNzTmFtZXMudHNcIjtcbmltcG9ydCB0eXBlIHsgSGlzdG9yeU1hbnVhbERheUNlbGwgfSBmcm9tIFwiLi4vLi4vdmlzaXRhcy9oaXN0b3JpYWwvSGlzdG9yeU1hbnVhbERhdGVQaWNrZXIudHN4XCI7XG5cbmV4cG9ydCB0eXBlIENhbGVuZGFyQ2VsbCA9IHtcbiAgZGF0ZTogRGF0ZSB8IG51bGw7XG4gIGlzbzogc3RyaW5nO1xuICBpc0VtcHR5OiBib29sZWFuO1xufTtcblxuY29uc3QgcGFkID0gKHZhbHVlOiBudW1iZXIpOiBzdHJpbmcgPT4gdmFsdWUudG9TdHJpbmcoKS5wYWRTdGFydCgyLCBcIjBcIik7XG5cbmV4cG9ydCBjb25zdCB0b0lzb0RhdGVSYW5nZVZhbHVlID0gKGRhdGU6IERhdGUpOiBzdHJpbmcgPT4ge1xuICByZXR1cm4gYCR7ZGF0ZS5nZXRGdWxsWWVhcigpfS0ke3BhZChkYXRlLmdldE1vbnRoKCkgKyAxKX0tJHtwYWQoZGF0ZS5nZXREYXRlKCkpfWA7XG59O1xuXG5leHBvcnQgY29uc3QgcGFyc2VJc29EYXRlUmFuZ2VWYWx1ZSA9ICh2YWx1ZTogc3RyaW5nKTogRGF0ZSB8IG51bGwgPT4ge1xuICBpZiAoIXZhbHVlKSByZXR1cm4gbnVsbDtcbiAgY29uc3QgdHJpbW1lZCA9IFN0cmluZyh2YWx1ZSkudHJpbSgpO1xuICBpZiAoIXRyaW1tZWQpIHJldHVybiBudWxsO1xuXG4gIGNvbnN0IGRhdGVQYXJ0ID0gdHJpbW1lZC5zcGxpdChcIlRcIilbMF0uc3BsaXQoXCIgXCIpWzBdO1xuICBpZiAoIS9eXFxkezR9LVxcZHsyfS1cXGR7Mn0kLy50ZXN0KGRhdGVQYXJ0KSkgcmV0dXJuIG51bGw7XG5cbiAgY29uc3QgW3llYXIsIG1vbnRoLCBkYXldID0gZGF0ZVBhcnQuc3BsaXQoXCItXCIpLm1hcChOdW1iZXIpO1xuICByZXR1cm4gbmV3IERhdGUoeWVhciwgbW9udGggLSAxLCBkYXkpO1xufTtcblxuZXhwb3J0IGNvbnN0IGlzU2FtZURheSA9IChhOiBEYXRlIHwgbnVsbCwgYjogRGF0ZSB8IG51bGwpOiBib29sZWFuID0+IHtcbiAgcmV0dXJuICEhKGEgJiYgYiAmJiBhLmdldFRpbWUoKSA9PT0gYi5nZXRUaW1lKCkpO1xufTtcblxuZXhwb3J0IGNvbnN0IGlzQmVmb3JlRGF5ID0gKGE6IERhdGUgfCBudWxsLCBiOiBEYXRlIHwgbnVsbCk6IGJvb2xlYW4gPT4ge1xuICByZXR1cm4gISEoYSAmJiBiICYmIGEuZ2V0VGltZSgpIDwgYi5nZXRUaW1lKCkpO1xufTtcblxuZXhwb3J0IGNvbnN0IGZvY3VzRGF0ZVJhbmdlU2VjdGlvbiA9IChjb250YWluZXI6IEhUTUxEaXZFbGVtZW50IHwgbnVsbCwgc2VjdGlvbjogXCJzdGFydFwiIHwgXCJlbmRcIik6IHZvaWQgPT4ge1xuICBpZiAoIWNvbnRhaW5lcikgcmV0dXJuO1xuICBjb25zdCB0YXJnZXQgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcjxIVE1MRWxlbWVudD4oYFtkYXRhLXNlY3Rpb249XCIke3NlY3Rpb259XCJdYCk7XG4gIGlmICghdGFyZ2V0KSByZXR1cm47XG4gIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gdGFyZ2V0LmZvY3VzKCkpO1xufTtcblxuY29uc3QgdG9UaXRsZUNhc2UgPSAodmFsdWU6IHN0cmluZywgbG9jYWxlOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICBpZiAoIXZhbHVlKSByZXR1cm4gXCJcIjtcbiAgY29uc3QgbG93ZXIgPSB2YWx1ZS50b0xvY2FsZUxvd2VyQ2FzZShsb2NhbGUpO1xuICByZXR1cm4gbG93ZXJbMF0udG9Mb2NhbGVVcHBlckNhc2UobG9jYWxlKSArIGxvd2VyLnNsaWNlKDEpO1xufTtcblxuZXhwb3J0IGNvbnN0IHRvU2VudGVuY2VDYXNlID0gKHZhbHVlOiBzdHJpbmcsIGxvY2FsZTogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgaWYgKCF2YWx1ZSkgcmV0dXJuIFwiXCI7XG4gIGNvbnN0IHRyaW1tZWQgPSB2YWx1ZS50cmltKCk7XG4gIGlmICghdHJpbW1lZCkgcmV0dXJuIHRyaW1tZWQ7XG4gIGNvbnN0IGxvd2VyID0gdHJpbW1lZC50b0xvY2FsZUxvd2VyQ2FzZShsb2NhbGUpO1xuICByZXR1cm4gbG93ZXJbMF0udG9Mb2NhbGVVcHBlckNhc2UobG9jYWxlKSArIGxvd2VyLnNsaWNlKDEpO1xufTtcblxuZXhwb3J0IGNvbnN0IGZvcm1hdERhdGVSYW5nZURpc3BsYXkgPSAoZGF0ZTogRGF0ZSwgbG9jYWxlOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICByZXR1cm4gZGF0ZVxuICAgIC50b0xvY2FsZURhdGVTdHJpbmcobG9jYWxlLCB7XG4gICAgICBkYXk6IFwibnVtZXJpY1wiLFxuICAgICAgbW9udGg6IFwic2hvcnRcIixcbiAgICAgIHllYXI6IFwibnVtZXJpY1wiLFxuICAgIH0pXG4gICAgLnJlcGxhY2UoL1xcLi9nLCBcIlwiKVxuICAgIC50b0xvd2VyQ2FzZSgpO1xufTtcblxuZXhwb3J0IGNvbnN0IGZvcm1hdE1vbnRoTGFiZWwgPSAoZGF0ZTogRGF0ZSwgbG9jYWxlOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICBjb25zdCBtb250aE5hbWUgPSBkYXRlLnRvTG9jYWxlRGF0ZVN0cmluZyhsb2NhbGUsIHsgbW9udGg6IFwibG9uZ1wiIH0pO1xuICByZXR1cm4gYCR7dG9UaXRsZUNhc2UobW9udGhOYW1lLCBsb2NhbGUpfSAke2RhdGUuZ2V0RnVsbFllYXIoKX1gO1xufTtcblxuZXhwb3J0IGNvbnN0IHJlc29sdmVVaUxvY2FsZSA9ICgpOiBzdHJpbmcgPT4ge1xuICBjb25zdCBmcm9tSHRtbCA9IHR5cGVvZiBkb2N1bWVudCAhPT0gXCJ1bmRlZmluZWRcIiA/IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5sYW5nIDogXCJcIjtcbiAgcmV0dXJuIGZyb21IdG1sICYmIFN0cmluZyhmcm9tSHRtbCkudHJpbSgpID8gZnJvbUh0bWwgOiBcImVzLUVTXCI7XG59O1xuXG5leHBvcnQgY29uc3QgYnVpbGRDYWxlbmRhck1vbnRoID0gKHllYXI6IG51bWJlciwgbW9udGg6IG51bWJlciwgbG9jYWxlOiBzdHJpbmcpOiB7IG1vbnRoTGFiZWw6IHN0cmluZzsgY2VsbHM6IENhbGVuZGFyQ2VsbFtdIH0gPT4ge1xuICBjb25zdCBmaXJzdERheSA9IG5ldyBEYXRlKHllYXIsIG1vbnRoLCAxKTtcbiAgY29uc3QgZGF5c0luTW9udGggPSBuZXcgRGF0ZSh5ZWFyLCBtb250aCArIDEsIDApLmdldERhdGUoKTtcbiAgY29uc3Qgb2Zmc2V0ID0gKGZpcnN0RGF5LmdldERheSgpICsgNikgJSA3O1xuICBjb25zdCBjZWxsczogQ2FsZW5kYXJDZWxsW10gPSBbXTtcblxuICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgb2Zmc2V0OyBpbmRleCArPSAxKSB7XG4gICAgY2VsbHMucHVzaCh7IGRhdGU6IG51bGwsIGlzbzogXCJcIiwgaXNFbXB0eTogdHJ1ZSB9KTtcbiAgfVxuXG4gIGZvciAobGV0IGRheSA9IDE7IGRheSA8PSBkYXlzSW5Nb250aDsgZGF5ICs9IDEpIHtcbiAgICBjb25zdCBkYXRlT2JqID0gbmV3IERhdGUoeWVhciwgbW9udGgsIGRheSk7XG4gICAgY2VsbHMucHVzaCh7IGRhdGU6IGRhdGVPYmosIGlzbzogdG9Jc29EYXRlUmFuZ2VWYWx1ZShkYXRlT2JqKSwgaXNFbXB0eTogZmFsc2UgfSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIG1vbnRoTGFiZWw6IGZvcm1hdE1vbnRoTGFiZWwoZmlyc3REYXksIGxvY2FsZSksXG4gICAgY2VsbHMsXG4gIH07XG59O1xuXG5leHBvcnQgY29uc3QgYnVpbGREYXRlUmFuZ2VEYXlDZWxscyA9IChcbiAgY2VsbHM6IENhbGVuZGFyQ2VsbFtdLFxuICBzdGFydERhdGU6IERhdGUgfCBudWxsLFxuICBlbmREYXRlOiBEYXRlIHwgbnVsbCxcbiAgaG92ZXJEYXRlOiBEYXRlIHwgbnVsbCxcbiAgc2VsZWN0aW5nU3RlcDogXCJzdGFydFwiIHwgXCJlbmRcIiB8IFwiZG9uZVwiXG4pOiBIaXN0b3J5TWFudWFsRGF5Q2VsbFtdID0+IHtcbiAgY29uc3QgcHJldmlld0VuZCA9IGVuZERhdGUgfHwgKHNlbGVjdGluZ1N0ZXAgPT09IFwiZW5kXCIgPyBob3ZlckRhdGUgOiBudWxsKTtcblxuICByZXR1cm4gY2VsbHMubWFwKChjZWxsLCBpbmRleCkgPT4ge1xuICAgIGlmIChjZWxsLmlzRW1wdHkgfHwgIWNlbGwuZGF0ZSkge1xuICAgICAgcmV0dXJuIHsga2V5OiBgZW1wdHktJHtpbmRleH1gLCBpc0VtcHR5OiB0cnVlIH07XG4gICAgfVxuXG4gICAgY29uc3QgZGF0ZU9iaiA9IGNlbGwuZGF0ZTtcbiAgICBjb25zdCBpc1N0YXJ0ID0gaXNTYW1lRGF5KGRhdGVPYmosIHN0YXJ0RGF0ZSk7XG4gICAgY29uc3QgaXNFbmQgPSBpc1NhbWVEYXkoZGF0ZU9iaiwgZW5kRGF0ZSk7XG4gICAgY29uc3QgaW5SYW5nZSA9IHN0YXJ0RGF0ZSAmJiBwcmV2aWV3RW5kICYmIGlzQmVmb3JlRGF5KHN0YXJ0RGF0ZSwgZGF0ZU9iaikgJiYgaXNCZWZvcmVEYXkoZGF0ZU9iaiwgcHJldmlld0VuZCk7XG4gICAgY29uc3QgaG92ZXJSYW5nZSA9IHN0YXJ0RGF0ZSAmJiAhZW5kRGF0ZSAmJiBob3ZlckRhdGUgJiYgaXNCZWZvcmVEYXkoc3RhcnREYXRlLCBkYXRlT2JqKSAmJiBpc0JlZm9yZURheShkYXRlT2JqLCBob3ZlckRhdGUpO1xuICAgIGNvbnN0IGRpc2FibGVkID0gc2VsZWN0aW5nU3RlcCA9PT0gXCJlbmRcIiAmJiAhIXN0YXJ0RGF0ZSAmJiBpc0JlZm9yZURheShkYXRlT2JqLCBzdGFydERhdGUpO1xuICAgIGNvbnN0IGlzVG9kYXkgPSBpc1NhbWVEYXkoZGF0ZU9iaiwgbmV3IERhdGUoKSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAga2V5OiBjZWxsLmlzbyxcbiAgICAgIGlzRW1wdHk6IGZhbHNlLFxuICAgICAgZGF0ZTogZGF0ZU9iaixcbiAgICAgIGlzbzogY2VsbC5pc28sXG4gICAgICBkYXlMYWJlbDogZGF0ZU9iai5nZXREYXRlKCksXG4gICAgICBkYXlDbGFzczogY2xhc3NOYW1lcyhcbiAgICAgICAgXCJkcnAtZGF5XCIsXG4gICAgICAgIGlzU3RhcnQgPyBcInN0YXJ0IHJhbmdlLXN0YXJ0XCIgOiBcIlwiLFxuICAgICAgICBpc0VuZCA/IFwiZW5kIHJhbmdlLWVuZFwiIDogXCJcIixcbiAgICAgICAgaW5SYW5nZSA/IFwiaW4tcmFuZ2VcIiA6IFwiXCIsXG4gICAgICAgIGhvdmVyUmFuZ2UgPyBcImhvdmVyLXJhbmdlXCIgOiBcIlwiLFxuICAgICAgICBkaXNhYmxlZCA/IFwiZGlzYWJsZWRcIiA6IFwiXCIsXG4gICAgICAgIGlzVG9kYXkgPyBcInRvZGF5XCIgOiBcIlwiXG4gICAgICApLFxuICAgICAgZGlzYWJsZWQsXG4gICAgfTtcbiAgfSk7XG59O1xuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBBY3Rpb25CdXR0b24gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9BY3Rpb25CdXR0b24udHN4XCI7XG5cbnR5cGUgRXhwZW5zZUZpbHRlckFjdGlvbnNQcm9wcyA9IHtcbiAgY2xlYXJMYWJlbDogc3RyaW5nO1xuICBhcHBseUxhYmVsOiBzdHJpbmc7XG4gIG9uQ2xlYXI6ICgpID0+IHZvaWQ7XG4gIG9uQXBwbHk6ICgpID0+IHZvaWQ7XG59O1xuXG4vLyBTaGFyZWQgYXBwbHkvY2xlYXIgYWN0aW9uIHJvdyBmb3IgZXhwZW5zZSBzaGVldCBmaWx0ZXJzLlxuY29uc3QgRXhwZW5zZUZpbHRlckFjdGlvbnMgPSAoe1xuICBjbGVhckxhYmVsLFxuICBhcHBseUxhYmVsLFxuICBvbkNsZWFyLFxuICBvbkFwcGx5LFxufTogRXhwZW5zZUZpbHRlckFjdGlvbnNQcm9wcykgPT4ge1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtMSBncmlkIGdyaWQtY29scy0yIGdhcC0yIGhpc3RvcnktZmlsdGVyLWFjdGlvbnNcIj5cbiAgICAgIDxBY3Rpb25CdXR0b24gbGFiZWw9e2NsZWFyTGFiZWx9IGNsYXNzTmFtZT1cInctZnVsbFwiIG9uQ2xpY2s9e29uQ2xlYXJ9IC8+XG4gICAgICA8QWN0aW9uQnV0dG9uIGxhYmVsPXthcHBseUxhYmVsfSBjbGFzc05hbWU9XCJ3LWZ1bGxcIiBvbkNsaWNrPXtvbkFwcGx5fSAvPlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZUZpbHRlckFjdGlvbnM7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZU1lbW8gfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBTZWxlY3RDb21ib2JveCBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NlbGVjdENvbWJvYm94LnRzeFwiO1xuaW1wb3J0IHR5cGUgeyBBdXRoTWFuYWdlZFVzZXIgfSBmcm9tIFwiLi4vLi4vLi4vY29udGV4dC9BdXRoQ29udGV4dC50c3hcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNlbGVjdE9wdGlvbiB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlU2VsZWN0T3B0aW9ucy50c1wiO1xuXG50eXBlIEV4cGVuc2VNYW5hZ2VkVXNlckZpbHRlclNlbGVjdFByb3BzID0ge1xuICBsYWJlbDogc3RyaW5nO1xuICBwbGFjZWhvbGRlcjogc3RyaW5nO1xuICB2YWx1ZTogc3RyaW5nO1xuICB1c2VyczogQXV0aE1hbmFnZWRVc2VyW107XG4gIGFsbE9wdGlvbj86IEV4cGVuc2VTZWxlY3RPcHRpb24gfCBudWxsO1xuICBvbkNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHJlYWRPbmx5PzogYm9vbGVhbjtcbiAgZGlzYWJsZWQ/OiBib29sZWFuO1xuICBzaG93TGFiZWw/OiBib29sZWFuO1xuICBjbGVhck9uRW1wdHlJbnB1dD86IGJvb2xlYW47XG59O1xuXG5jb25zdCB0b09wdGlvblRleHQgPSAodXNlcjogQXV0aE1hbmFnZWRVc2VyKTogc3RyaW5nID0+IHtcbiAgY29uc3QgYXhVc2VySWQgPSBTdHJpbmcodXNlci5heFVzZXJJZCB8fCBcIlwiKS50cmltKCk7XG4gIGNvbnN0IG5hbWUgPSBTdHJpbmcodXNlci5uYW1lIHx8IFwiXCIpLnRyaW0oKTtcbiAgaWYgKCFheFVzZXJJZCkgcmV0dXJuIFwiXCI7XG4gIGlmICghbmFtZSB8fCBuYW1lLnRvVXBwZXJDYXNlKCkgPT09IGF4VXNlcklkLnRvVXBwZXJDYXNlKCkpIHtcbiAgICByZXR1cm4gYXhVc2VySWQ7XG4gIH1cbiAgcmV0dXJuIGAke2F4VXNlcklkfSAtICR7bmFtZX1gO1xufTtcblxuLy8gRml4ZWQgbG9jYWwgdXNlciBzZWxlY3RvciB1c2VkIHRvIGZpbHRlciBleHBlbnNlIHNoZWV0cyBieSBtYW5hZ2VkIEF4IHVzZXIuXG5jb25zdCBFeHBlbnNlTWFuYWdlZFVzZXJGaWx0ZXJTZWxlY3QgPSAoe1xuICBsYWJlbCxcbiAgcGxhY2Vob2xkZXIsXG4gIHZhbHVlLFxuICB1c2VycyxcbiAgYWxsT3B0aW9uID0gbnVsbCxcbiAgb25DaGFuZ2UsXG4gIHJlYWRPbmx5ID0gZmFsc2UsXG4gIGRpc2FibGVkID0gZmFsc2UsXG4gIHNob3dMYWJlbCA9IHRydWUsXG4gIGNsZWFyT25FbXB0eUlucHV0ID0gZmFsc2UsXG59OiBFeHBlbnNlTWFuYWdlZFVzZXJGaWx0ZXJTZWxlY3RQcm9wcykgPT4ge1xuICBjb25zdCBvcHRpb25zID0gdXNlTWVtbzxFeHBlbnNlU2VsZWN0T3B0aW9uW10+KCgpID0+IHtcbiAgICBjb25zdCB1c2VyT3B0aW9ucyA9IChBcnJheS5pc0FycmF5KHVzZXJzKSA/IHVzZXJzIDogW10pXG4gICAgICAubWFwKChlbnRyeSkgPT4ge1xuICAgICAgICBjb25zdCBheFVzZXJJZCA9IFN0cmluZyhlbnRyeS5heFVzZXJJZCB8fCBcIlwiKS50cmltKCk7XG4gICAgICAgIGNvbnN0IGxhYmVsID0gdG9PcHRpb25UZXh0KGVudHJ5KTtcbiAgICAgICAgaWYgKCFheFVzZXJJZCB8fCAhbGFiZWwpIHJldHVybiBudWxsO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHZhbHVlOiBheFVzZXJJZCxcbiAgICAgICAgICB0ZXh0OiBsYWJlbCxcbiAgICAgICAgfSBhcyBFeHBlbnNlU2VsZWN0T3B0aW9uO1xuICAgICAgfSlcbiAgICAgIC5maWx0ZXIoKGVudHJ5KTogZW50cnkgaXMgRXhwZW5zZVNlbGVjdE9wdGlvbiA9PiAhIWVudHJ5KTtcbiAgICByZXR1cm4gYWxsT3B0aW9uID8gW2FsbE9wdGlvbiwgLi4udXNlck9wdGlvbnNdIDogdXNlck9wdGlvbnM7XG4gIH0sIFthbGxPcHRpb24sIHVzZXJzXSk7XG5cbiAgY29uc3Qgc2VsZWN0ZWRUZXh0TW9kZSA9IGFsbE9wdGlvbiAmJiB2YWx1ZSA9PT0gYWxsT3B0aW9uLnZhbHVlID8gXCJ0ZXh0XCIgOiBcInZhbHVlXCI7XG5cbiAgcmV0dXJuIChcbiAgICA8U2VsZWN0Q29tYm9ib3hcbiAgICAgIGxhYmVsPXtsYWJlbH1cbiAgICAgIHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cbiAgICAgIG9wdGlvbnM9e29wdGlvbnN9XG4gICAgICB2YWx1ZT17dmFsdWV9XG4gICAgICBvbkNoYW5nZT17b25DaGFuZ2V9XG4gICAgICByZWFkT25seT17cmVhZE9ubHl9XG4gICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICBpZEJhc2U9XCJleHBlbnNlLW1hbmFnZWQtdXNlci1maWx0ZXJcIlxuICAgICAgcG9ydGFsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcbiAgICAgIHBhbmVsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcbiAgICAgIGFsbG93VGV4dElucHV0XG4gICAgICBzZWxlY3RlZFRleHRNb2RlPXtzZWxlY3RlZFRleHRNb2RlfVxuICAgICAgc2hvd0xhYmVsPXtzaG93TGFiZWx9XG4gICAgICBjbGVhck9uRW1wdHlJbnB1dD17Y2xlYXJPbkVtcHR5SW5wdXR9XG4gICAgLz5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VNYW5hZ2VkVXNlckZpbHRlclNlbGVjdDtcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgRmlsdGVyQnV0dG9uIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvRmlsdGVyQnV0dG9uLnRzeFwiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VRdWlja0RhdGVGaWx0ZXJJZCB9IGZyb20gXCIuLi9jb25zdGFudHMvZXhwZW5zZVF1aWNrRGF0ZUZpbHRlckNhdGFsb2cudHNcIjtcblxudHlwZSBFeHBlbnNlUXVpY2tEYXRlRmlsdGVyc1Byb3BzID0ge1xuICBhY3RpdmVRdWlja0ZpbHRlcjogRXhwZW5zZVF1aWNrRGF0ZUZpbHRlcklkIHwgbnVsbDtcbiAgb25RdWlja0ZpbHRlckNoYW5nZTogKGZpbHRlcklkOiBFeHBlbnNlUXVpY2tEYXRlRmlsdGVySWQpID0+IHZvaWQ7XG59O1xuXG4vLyBTaGFyZWQgcXVpY2sgZGF0ZSBmaWx0ZXJzIHVzZWQgYnkgZXhwZW5zZSBzaGVldHMgYW5kIHRpY2tldHMgcGFuZWxzLlxuY29uc3QgRXhwZW5zZVF1aWNrRGF0ZUZpbHRlcnMgPSAoeyBhY3RpdmVRdWlja0ZpbHRlciwgb25RdWlja0ZpbHRlckNoYW5nZSB9OiBFeHBlbnNlUXVpY2tEYXRlRmlsdGVyc1Byb3BzKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIGdhcC0yIGhpc3RvcnktcXVpY2stZmlsdGVyc1wiIGFyaWEtbGFiZWw9e2luZFQoXCJIaXN0b3J5X0ZpbHRlcl9EYXRlXCIsIFwiRGF0ZVwiKX0+XG4gICAgICA8RmlsdGVyQnV0dG9uXG4gICAgICAgIGxhYmVsPXtpbmRUKFwiSGlzdG9yeV9RdWlja19DdXN0b21cIiwgXCJEYXRlXCIpfVxuICAgICAgICBhY3RpdmU9e2FjdGl2ZVF1aWNrRmlsdGVyID09PSBcImN1c3RvbVwifVxuICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGxcIlxuICAgICAgICBvbkNsaWNrPXsoKSA9PiBvblF1aWNrRmlsdGVyQ2hhbmdlKFwiY3VzdG9tXCIpfVxuICAgICAgLz5cbiAgICAgIDxGaWx0ZXJCdXR0b25cbiAgICAgICAgbGFiZWw9e2luZFQoXCJIaXN0b3J5X1F1aWNrXzdEYXlzXCIsIFwiNyBkYXlzXCIpfVxuICAgICAgICBhY3RpdmU9e2FjdGl2ZVF1aWNrRmlsdGVyID09PSBcImRheXMtN1wifVxuICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGxcIlxuICAgICAgICBvbkNsaWNrPXsoKSA9PiBvblF1aWNrRmlsdGVyQ2hhbmdlKFwiZGF5cy03XCIpfVxuICAgICAgLz5cbiAgICAgIDxGaWx0ZXJCdXR0b25cbiAgICAgICAgbGFiZWw9e2luZFQoXCJIaXN0b3J5X1F1aWNrXzMwRGF5c1wiLCBcIjMwIGRheXNcIil9XG4gICAgICAgIGFjdGl2ZT17YWN0aXZlUXVpY2tGaWx0ZXIgPT09IFwiZGF5cy0zMFwifVxuICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGxcIlxuICAgICAgICBvbkNsaWNrPXsoKSA9PiBvblF1aWNrRmlsdGVyQ2hhbmdlKFwiZGF5cy0zMFwiKX1cbiAgICAgIC8+XG4gICAgICA8RmlsdGVyQnV0dG9uXG4gICAgICAgIGxhYmVsPXtpbmRUKFwiSGlzdG9yeV9RdWlja185MERheXNcIiwgXCI5MCBkYXlzXCIpfVxuICAgICAgICBhY3RpdmU9e2FjdGl2ZVF1aWNrRmlsdGVyID09PSBcImRheXMtOTBcIn1cbiAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsXCJcbiAgICAgICAgb25DbGljaz17KCkgPT4gb25RdWlja0ZpbHRlckNoYW5nZShcImRheXMtOTBcIil9XG4gICAgICAvPlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVF1aWNrRGF0ZUZpbHRlcnM7XG4iLCAiaW1wb3J0IHR5cGUge1xuICBFeHBlbnNlU2hlZXRMaXN0QXBpUmVxdWVzdCxcbiAgRXhwZW5zZVNoZWV0TGlzdEZpbHRlcnMsXG4gIEV4cGVuc2VTaGVldFRpY2tldExpc3RSZXF1ZXN0LFxufSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XG5pbXBvcnQgeyBERUZBVUxUX0VYUEVOU0VfU1RBVFVTX0ZJTFRFUiB9IGZyb20gXCIuLi9jb25zdGFudHMvZXhwZW5zZVN0YXR1c0NhdGFsb2cudHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCB9IGZyb20gXCIuLi90aWNrZXRzL2V4cGVuc2VUaWNrZXRMaXN0VHlwZXMudHNcIjtcblxuY29uc3QgREVGQVVMVF9TVUdHRVNUX1BBR0VfU0laRSA9IDUwO1xuY29uc3QgQUxMT1dFRF9USUNLRVRfR0FTVE9fVFlQRVMgPSBuZXcgU2V0PG51bWJlcj4oWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDE0XSk7XG5cbmNvbnN0IGlzVmFsaWRFeHBlbnNlU2hlZXRTdGF0dXMgPSAodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBudW1iZXIgPT4ge1xuICByZXR1cm4gTnVtYmVyLmlzSW50ZWdlcih2YWx1ZSkgJiYgTnVtYmVyKHZhbHVlKSA+PSAwICYmIE51bWJlcih2YWx1ZSkgPD0gNDtcbn07XG5cbi8vIFJlc29sdmVzIHRoZSBvcHRpb25hbCBBUEkgc3RhdHVzIGZpbHRlciBmcm9tIFVJIGZpbHRlciBzdGF0ZS5cbmNvbnN0IHJlc29sdmVFeHBlbnNlU2hlZXRTdGF0dXMgPSAoc3RhdHVzRmlsdGVyOiBudW1iZXIpOiBudW1iZXIgfCBudWxsID0+IHtcbiAgaWYgKHN0YXR1c0ZpbHRlciA9PT0gREVGQVVMVF9FWFBFTlNFX1NUQVRVU19GSUxURVIpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGlmICghaXNWYWxpZEV4cGVuc2VTaGVldFN0YXR1cyhzdGF0dXNGaWx0ZXIpKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZXR1cm4gc3RhdHVzRmlsdGVyO1xufTtcblxuY29uc3Qgbm9ybWFsaXplT3B0aW9uYWxUZXh0ID0gKHZhbHVlOiBzdHJpbmcgfCB1bmRlZmluZWQpOiBzdHJpbmcgfCB1bmRlZmluZWQgPT4ge1xuICBjb25zdCB0cmltbWVkID0gU3RyaW5nKHZhbHVlIHx8IFwiXCIpLnRyaW0oKTtcbiAgcmV0dXJuIHRyaW1tZWQgPyB0cmltbWVkIDogdW5kZWZpbmVkO1xufTtcblxuY29uc3QgcmVzb2x2ZVByb2Nlc3NlZEJ5QWlGaWx0ZXIgPSAoXG4gIHZhbHVlOiBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90W1wicHJvY2Vzc2VkQnlJYUZpbHRlclwiXVxuKTogYm9vbGVhbiB8IG51bGwgPT4ge1xuICBpZiAodmFsdWUgPT09IFwieWVzXCIpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGlmICh2YWx1ZSA9PT0gXCJub1wiKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59O1xuXG5jb25zdCByZXNvbHZlVGlja2V0U3RhdHVzRmlsdGVyID0gKFxuICB2YWx1ZTogRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdFtcInN0YXR1c0ZpbHRlclwiXVxuKTogMCB8IDEgfCBudWxsID0+IHtcbiAgcmV0dXJuIHZhbHVlID09PSAwIHx8IHZhbHVlID09PSAxID8gdmFsdWUgOiBudWxsO1xufTtcblxuY29uc3QgcmVzb2x2ZVRpY2tldEdhc3RvVHlwZUZpbHRlciA9IChcbiAgdmFsdWU6IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3RbXCJnYXN0b1R5cGVGaWx0ZXJcIl1cbik6IEV4cGVuc2VTaGVldFRpY2tldExpc3RSZXF1ZXN0W1wiZ2FzdG9UeXBlXCJdID0+IHtcbiAgaWYgKHZhbHVlID09PSBcIlwiIHx8IHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGNvbnN0IHBhcnNlZCA9IE51bWJlcih2YWx1ZSk7XG4gIGlmICghTnVtYmVyLmlzSW50ZWdlcihwYXJzZWQpIHx8ICFBTExPV0VEX1RJQ0tFVF9HQVNUT19UWVBFUy5oYXMocGFyc2VkKSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcmV0dXJuIHBhcnNlZCBhcyBFeHBlbnNlU2hlZXRUaWNrZXRMaXN0UmVxdWVzdFtcImdhc3RvVHlwZVwiXTtcbn07XG5cbi8vIEJ1aWxkIGxpc3QgcGF5bG9hZCBmb3IgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy9saXN0IGZyb20gY3VycmVudCBmaWx0ZXIgc3RhdGUuXG5leHBvcnQgY29uc3QgYnVpbGRFeHBlbnNlTGlzdFBheWxvYWQgPSAoXG4gIGZpbHRlcnM6IEV4cGVuc2VTaGVldExpc3RGaWx0ZXJzLFxuICBwYWdlOiBudW1iZXIsXG4gIHBhZ2VTaXplOiBudW1iZXJcbik6IEV4cGVuc2VTaGVldExpc3RBcGlSZXF1ZXN0ID0+IHtcbiAgY29uc3QgbmV4dFBhZ2UgPSBOdW1iZXIuaXNGaW5pdGUocGFnZSkgJiYgcGFnZSA+IDAgPyBwYWdlIDogMTtcbiAgY29uc3QgbmV4dFBhZ2VTaXplID0gTnVtYmVyLmlzRmluaXRlKHBhZ2VTaXplKSAmJiBwYWdlU2l6ZSA+IDAgPyBwYWdlU2l6ZSA6IERFRkFVTFRfU1VHR0VTVF9QQUdFX1NJWkU7XG4gIGNvbnN0IHNhZmVGaWx0ZXIgPSBTdHJpbmcoZmlsdGVycy5maWx0ZXIgfHwgZmlsdGVycy5ob2phR2FzdG9zSWQgfHwgXCJcIikudHJpbSgpO1xuXG4gIHJldHVybiB7XG4gICAgZmlsdGVyOiBzYWZlRmlsdGVyIHx8IFwiXCIsXG4gICAgYmlsbGVkTW9kZTogMixcbiAgICBjcmVhdGVkRGF0ZUZyb206IG5vcm1hbGl6ZU9wdGlvbmFsVGV4dChmaWx0ZXJzLmZyb21EYXRlKSxcbiAgICBjcmVhdGVkRGF0ZVRvOiBub3JtYWxpemVPcHRpb25hbFRleHQoZmlsdGVycy50b0RhdGUpLFxuICAgIHByb2pJZDogbm9ybWFsaXplT3B0aW9uYWxUZXh0KGZpbHRlcnMucHJvamVjdElkKSxcbiAgICBjdXJyZW5jeUNvZGU6IG5vcm1hbGl6ZU9wdGlvbmFsVGV4dChmaWx0ZXJzLmN1cnJlbmN5Q29kZSksXG4gICAgZXhwZW5zZVNoZWV0U3RhdHVzOiByZXNvbHZlRXhwZW5zZVNoZWV0U3RhdHVzKGZpbHRlcnMuc3RhdHVzRmlsdGVyKSxcbiAgICBpbmNsdWRlU3Vib3JkaW5hdGVzOiBmaWx0ZXJzLmluY2x1ZGVTdWJvcmRpbmF0ZXMgPT09IHRydWUsXG4gICAgcGFnZTogbmV4dFBhZ2UsXG4gICAgcGFnZVNpemU6IG5leHRQYWdlU2l6ZSxcbiAgfTtcbn07XG5cbi8vIEJ1aWxkIHN1Z2dlc3Rpb24gcGF5bG9hZCBmb3IgZXhwZW5zZSBzaGVldCBkcm9wZG93biBzZWFyY2guXG5leHBvcnQgY29uc3QgYnVpbGRFeHBlbnNlU2hlZXRTdWdnZXN0UGF5bG9hZCA9IChcbiAgdGVybTogc3RyaW5nLFxuICBwYWdlU2l6ZSA9IERFRkFVTFRfU1VHR0VTVF9QQUdFX1NJWkUsXG4gIHBhZ2UgPSAxLFxuICBpbmNsdWRlU3Vib3JkaW5hdGVzID0gZmFsc2Vcbik6IEV4cGVuc2VTaGVldExpc3RBcGlSZXF1ZXN0ID0+IHtcbiAgY29uc3Qgc2FmZVRlcm0gPSBTdHJpbmcodGVybSB8fCBcIlwiKS50cmltKCk7XG4gIGNvbnN0IG5leHRQYWdlU2l6ZSA9IE51bWJlci5pc0Zpbml0ZShwYWdlU2l6ZSkgJiYgcGFnZVNpemUgPiAwID8gcGFnZVNpemUgOiBERUZBVUxUX1NVR0dFU1RfUEFHRV9TSVpFO1xuICBjb25zdCBuZXh0UGFnZSA9IE51bWJlci5pc0Zpbml0ZShwYWdlKSAmJiBwYWdlID4gMCA/IE1hdGguZmxvb3IocGFnZSkgOiAxO1xuXG4gIHJldHVybiB7XG4gICAgZmlsdGVyOiBzYWZlVGVybSB8fCBcIlwiLFxuICAgIGJpbGxlZE1vZGU6IDIsXG4gICAgY3JlYXRlZERhdGVGcm9tOiB1bmRlZmluZWQsXG4gICAgY3JlYXRlZERhdGVUbzogdW5kZWZpbmVkLFxuICAgIHByb2pJZDogdW5kZWZpbmVkLFxuICAgIGN1cnJlbmN5Q29kZTogdW5kZWZpbmVkLFxuICAgIGluY2x1ZGVTdWJvcmRpbmF0ZXM6IGluY2x1ZGVTdWJvcmRpbmF0ZXMgPT09IHRydWUsXG4gICAgcGFnZTogbmV4dFBhZ2UsXG4gICAgcGFnZVNpemU6IG5leHRQYWdlU2l6ZSxcbiAgfTtcbn07XG5cbi8vIEJ1aWxkIGxpc3QgcGF5bG9hZCBmb3IgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzL2xpc3QgZnJvbSB0aWNrZXQgZmlsdGVyIHN0YXRlLlxuZXhwb3J0IGNvbnN0IGJ1aWxkRXhwZW5zZVRpY2tldExpc3RQYXlsb2FkID0gKFxuICBmaWx0ZXJzOiBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90LFxuICBwYWdlOiBudW1iZXIsXG4gIHBhZ2VTaXplOiBudW1iZXJcbik6IEV4cGVuc2VTaGVldFRpY2tldExpc3RSZXF1ZXN0ID0+IHtcbiAgY29uc3QgbmV4dFBhZ2UgPSBOdW1iZXIuaXNGaW5pdGUocGFnZSkgJiYgcGFnZSA+IDAgPyBNYXRoLmZsb29yKHBhZ2UpIDogMTtcbiAgY29uc3QgbmV4dFBhZ2VTaXplID0gTnVtYmVyLmlzRmluaXRlKHBhZ2VTaXplKSAmJiBwYWdlU2l6ZSA+IDAgPyBNYXRoLmZsb29yKHBhZ2VTaXplKSA6IERFRkFVTFRfU1VHR0VTVF9QQUdFX1NJWkU7XG4gIGNvbnN0IHNhZmVGaWx0ZXJLZXkgPSBub3JtYWxpemVPcHRpb25hbFRleHQoZmlsdGVycy5maWx0ZXJLZXkpO1xuXG4gIHJldHVybiB7XG4gICAgcGFnZTogbmV4dFBhZ2UsXG4gICAgcGFnZVNpemU6IG5leHRQYWdlU2l6ZSxcbiAgICBjcmVhdGVkRGF0ZUZyb206IG5vcm1hbGl6ZU9wdGlvbmFsVGV4dChmaWx0ZXJzLmZyb21EYXRlKSxcbiAgICBjcmVhdGVkRGF0ZVRvOiBub3JtYWxpemVPcHRpb25hbFRleHQoZmlsdGVycy50b0RhdGUpLFxuICAgIHNlYXJjaEtleTogc2FmZUZpbHRlcktleSxcbiAgICBmaWx0ZXI6IHNhZmVGaWx0ZXJLZXksXG4gICAgc3RhdHVzOiByZXNvbHZlVGlja2V0U3RhdHVzRmlsdGVyKGZpbHRlcnMuc3RhdHVzRmlsdGVyKSxcbiAgICBjdXJyZW5jeUNvZGU6IG5vcm1hbGl6ZU9wdGlvbmFsVGV4dChmaWx0ZXJzLmN1cnJlbmN5Q29kZSksXG4gICAgZ2FzdG9UeXBlOiByZXNvbHZlVGlja2V0R2FzdG9UeXBlRmlsdGVyKGZpbHRlcnMuZ2FzdG9UeXBlRmlsdGVyKSxcbiAgICBwcm9jZXNzZWRCeUFJOiByZXNvbHZlUHJvY2Vzc2VkQnlBaUZpbHRlcihmaWx0ZXJzLnByb2Nl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QUFBLElBQ3BCLFlBQVk7QUFBQSxJQUNaLGlCQUFpQjtBQUFBLElBQ2pCLGVBQWU7QUFBQSxJQUNmLFFBQVE7QUFBQSxJQUNSLGNBQWM7QUFBQSxJQUNkLHFCQUFxQix3QkFBd0I7QUFBQSxJQUM3QyxNQUFNO0FBQUEsSUFDTixVQUFVO0FBQUEsRUFDWjtBQUNGO0FBR08sSUFBTSxnQ0FBZ0MsQ0FDM0MsU0FDQSxNQUNBLGFBQ2tDO0FBQ2xDLFFBQU0sV0FBVyxPQUFPLFNBQVMsSUFBSSxLQUFLLE9BQU8sSUFBSSxLQUFLLE1BQU0sSUFBSSxJQUFJO0FBQ3hFLFFBQU0sZUFBZSxPQUFPLFNBQVMsUUFBUSxLQUFLLFdBQVcsSUFBSSxLQUFLLE1BQU0sUUFBUSxJQUFJO0FBQ3hGLFFBQU0sZ0JBQWdCLHNCQUFzQixRQUFRLFNBQVM7QUFFN0QsU0FBTztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sVUFBVTtBQUFBLElBQ1YsaUJBQWlCLHNCQUFzQixRQUFRLFFBQVE7QUFBQSxJQUN2RCxlQUFlLHNCQUFzQixRQUFRLE1BQU07QUFBQSxJQUNuRCxXQUFXO0FBQUEsSUFDWCxRQUFRO0FBQUEsSUFDUixRQUFRLDBCQUEwQixRQUFRLFlBQVk7QUFBQSxJQUN0RCxjQUFjLHNCQUFzQixRQUFRLFlBQVk7QUFBQSxJQUN4RCxXQUFXLDZCQUE2QixRQUFRLGVBQWU7QUFBQSxJQUMvRCxlQUFlLDJCQUEyQixRQUFRLG1CQUFtQjtBQUFBLEVBQ3ZFO0FBQ0Y7IiwKICAibmFtZXMiOiBbImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImxhYmVsIiwgImltcG9ydF9qc3hfcnVudGltZSJdCn0K
