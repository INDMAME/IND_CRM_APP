import {
  ActionButton_default,
  FilterButton_default,
  HistoryManualDatePicker_default
} from "./chunk-PSIQGRBK.js";
import {
  DEFAULT_EXPENSE_STATUS_FILTER
} from "./chunk-JPVM4PLL.js";
import {
  classNames,
  indT
} from "./chunk-U25S3E2U.js";
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

// Web/wwwroot/react/src/pages/gastos/components/ExpenseQuickDateFilters.tsx
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
var ExpenseQuickDateFilters = ({ activeQuickFilter, onQuickFilterChange }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "grid grid-cols-2 gap-2 history-quick-filters", "aria-label": indT("History_Filter_Date", "Date"), children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      FilterButton_default,
      {
        label: indT("History_Quick_Custom", "Date"),
        active: activeQuickFilter === "custom",
        className: "w-full",
        onClick: () => onQuickFilterChange("custom")
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      FilterButton_default,
      {
        label: indT("History_Quick_7Days", "7 days"),
        active: activeQuickFilter === "days-7",
        className: "w-full",
        onClick: () => onQuickFilterChange("days-7")
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      FilterButton_default,
      {
        label: indT("History_Quick_30Days", "30 days"),
        active: activeQuickFilter === "days-30",
        className: "w-full",
        onClick: () => onQuickFilterChange("days-30")
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
var isValidExpenseSheetStatus = (value) => {
  return Number.isInteger(value) && Number(value) >= 0 && Number(value) <= 4;
};
var resolveExpenseSheetStatus = (statusFilter) => {
  if (statusFilter === DEFAULT_EXPENSE_STATUS_FILTER) {
    return void 0;
  }
  if (!isValidExpenseSheetStatus(statusFilter)) {
    throw new Error("expenseSheetStatus filter must be an integer between 0 and 4.");
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
  return void 0;
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
    page: nextPage,
    pageSize: nextPageSize
  };
};
var buildExpenseSheetSuggestPayload = (term, pageSize = DEFAULT_SUGGEST_PAGE_SIZE, page = 1) => {
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
    status: filters.statusFilter === "" ? void 0 : filters.statusFilter,
    currencyCode: normalizeOptionalText(filters.currencyCode),
    gastoType: filters.gastoTypeFilter === "" ? void 0 : filters.gastoTypeFilter,
    processedByAI: resolveProcessedByAiFilter(filters.processedByIaFilter)
  };
};

export {
  ExpenseDateRangeFilter_default,
  ExpenseFilterActions_default,
  ExpenseQuickDateFilters_default,
  buildExpenseListPayload,
  buildExpenseSheetSuggestPayload,
  buildExpenseTicketListPayload
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VEYXRlUmFuZ2VGaWx0ZXIudHN4IiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdXRpbHMvZXhwZW5zZURhdGVSYW5nZVV0aWxzLnRzIiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlRmlsdGVyQWN0aW9ucy50c3giLCAiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VRdWlja0RhdGVGaWx0ZXJzLnRzeCIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3V0aWxzL2V4cGVuc2VQYXlsb2FkQnVpbGRlcnMudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCBIaXN0b3J5TWFudWFsRGF0ZVBpY2tlciwge1xuICBIaXN0b3J5TWFudWFsRGF5Q2VsbCxcbn0gZnJvbSBcIi4uLy4uL3Zpc2l0YXMvaGlzdG9yaWFsL0hpc3RvcnlNYW51YWxEYXRlUGlja2VyLnRzeFwiO1xuaW1wb3J0IHtcbiAgYnVpbGRDYWxlbmRhck1vbnRoLFxuICBidWlsZERhdGVSYW5nZURheUNlbGxzLFxuICBmb2N1c0RhdGVSYW5nZVNlY3Rpb24sXG4gIGZvcm1hdERhdGVSYW5nZURpc3BsYXksXG4gIGlzQmVmb3JlRGF5LFxuICBwYXJzZUlzb0RhdGVSYW5nZVZhbHVlLFxuICByZXNvbHZlVWlMb2NhbGUsXG4gIHRvSXNvRGF0ZVJhbmdlVmFsdWUsXG4gIHRvU2VudGVuY2VDYXNlLFxufSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZURhdGVSYW5nZVV0aWxzLnRzXCI7XG5cbnR5cGUgRXhwZW5zZURhdGVSYW5nZUZpbHRlclByb3BzID0ge1xuICBmcm9tRGF0ZTogc3RyaW5nO1xuICB0b0RhdGU6IHN0cmluZztcbiAgb25DaGFuZ2U6IChmcm9tRGF0ZTogc3RyaW5nLCB0b0RhdGU6IHN0cmluZykgPT4gdm9pZDtcbiAgb25SYW5nZUNvbXBsZXRlPzogKGZyb21EYXRlOiBzdHJpbmcsIHRvRGF0ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBhdXRvT3BlblJlcXVlc3RJZD86IG51bWJlcjtcbiAgc2hvd01hbnVhbEVycm9yPzogYm9vbGVhbjtcbiAgc2hvd1N0YXJ0RXJyb3I/OiBib29sZWFuO1xuICBzaG93RW5kRXJyb3I/OiBib29sZWFuO1xufTtcblxuLy8gU2hhcmVkIGRhdGUgcmFuZ2UgcGlja2VyIGZvciBleHBlbnNlIGZpbHRlcnMgYmFzZWQgb24gdGhlIGhpc3RvcnkgZGF0ZSBjb21wb25lbnQuXG5jb25zdCBFeHBlbnNlRGF0ZVJhbmdlRmlsdGVyID0gKHtcbiAgZnJvbURhdGUsXG4gIHRvRGF0ZSxcbiAgb25DaGFuZ2UsXG4gIG9uUmFuZ2VDb21wbGV0ZSxcbiAgYXV0b09wZW5SZXF1ZXN0SWQgPSAwLFxuICBzaG93TWFudWFsRXJyb3IgPSBmYWxzZSxcbiAgc2hvd1N0YXJ0RXJyb3IgPSBmYWxzZSxcbiAgc2hvd0VuZEVycm9yID0gZmFsc2UsXG59OiBFeHBlbnNlRGF0ZVJhbmdlRmlsdGVyUHJvcHMpID0+IHtcbiAgY29uc3QgbG9jYWxlID0gdXNlTWVtbygoKSA9PiByZXNvbHZlVWlMb2NhbGUoKSwgW10pO1xuICBjb25zdCBhY3RpdmF0b3JSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgcG9wb3ZlclJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xuXG4gIGNvbnN0IFtzdGFydERhdGUsIHNldFN0YXJ0RGF0ZV0gPSB1c2VTdGF0ZTxEYXRlIHwgbnVsbD4oKCkgPT4gcGFyc2VJc29EYXRlUmFuZ2VWYWx1ZShmcm9tRGF0ZSkpO1xuICBjb25zdCBbZW5kRGF0ZSwgc2V0RW5kRGF0ZV0gPSB1c2VTdGF0ZTxEYXRlIHwgbnVsbD4oKCkgPT4gcGFyc2VJc29EYXRlUmFuZ2VWYWx1ZSh0b0RhdGUpKTtcbiAgY29uc3QgW2hvdmVyRGF0ZSwgc2V0SG92ZXJEYXRlXSA9IHVzZVN0YXRlPERhdGUgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW3NlbGVjdGluZ1N0ZXAsIHNldFNlbGVjdGluZ1N0ZXBdID0gdXNlU3RhdGU8XCJzdGFydFwiIHwgXCJlbmRcIiB8IFwiZG9uZVwiPihcInN0YXJ0XCIpO1xuICBjb25zdCBbaXNPcGVuLCBzZXRJc09wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIGNvbnN0IG5vdyA9IHVzZU1lbW8oKCkgPT4gbmV3IERhdGUoKSwgW10pO1xuICBjb25zdCBbY3VycmVudE1vbnRoLCBzZXRDdXJyZW50TW9udGhdID0gdXNlU3RhdGUoKHBhcnNlSXNvRGF0ZVJhbmdlVmFsdWUoZnJvbURhdGUpIHx8IG5vdykuZ2V0TW9udGgoKSk7XG4gIGNvbnN0IFtjdXJyZW50WWVhciwgc2V0Q3VycmVudFllYXJdID0gdXNlU3RhdGUoKHBhcnNlSXNvRGF0ZVJhbmdlVmFsdWUoZnJvbURhdGUpIHx8IG5vdykuZ2V0RnVsbFllYXIoKSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBzZXRTdGFydERhdGUocGFyc2VJc29EYXRlUmFuZ2VWYWx1ZShmcm9tRGF0ZSkpO1xuICB9LCBbZnJvbURhdGVdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHNldEVuZERhdGUocGFyc2VJc29EYXRlUmFuZ2VWYWx1ZSh0b0RhdGUpKTtcbiAgfSwgW3RvRGF0ZV0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgb25DaGFuZ2Uoc3RhcnREYXRlID8gdG9Jc29EYXRlUmFuZ2VWYWx1ZShzdGFydERhdGUpIDogXCJcIiwgZW5kRGF0ZSA/IHRvSXNvRGF0ZVJhbmdlVmFsdWUoZW5kRGF0ZSkgOiBcIlwiKTtcbiAgfSwgW3N0YXJ0RGF0ZSwgZW5kRGF0ZSwgb25DaGFuZ2VdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghaXNPcGVuKSByZXR1cm47XG5cbiAgICBjb25zdCBoYW5kbGVPdXRzaWRlID0gKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQgYXMgTm9kZSB8IG51bGw7XG4gICAgICBpZiAoIXRhcmdldCkgcmV0dXJuO1xuICAgICAgaWYgKHBvcG92ZXJSZWYuY3VycmVudD8uY29udGFpbnModGFyZ2V0KSkgcmV0dXJuO1xuICAgICAgaWYgKGFjdGl2YXRvclJlZi5jdXJyZW50Py5jb250YWlucyh0YXJnZXQpKSByZXR1cm47XG4gICAgICBzZXRJc09wZW4oZmFsc2UpO1xuICAgICAgc2V0SG92ZXJEYXRlKG51bGwpO1xuICAgIH07XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGhhbmRsZU91dHNpZGUpO1xuICAgIHJldHVybiAoKSA9PiBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGhhbmRsZU91dHNpZGUpO1xuICB9LCBbaXNPcGVuXSk7XG5cbiAgY29uc3Qgb3BlblBvcG92ZXIgPSB1c2VDYWxsYmFjayhcbiAgICAoc2VjdGlvbjogXCJzdGFydFwiIHwgXCJlbmRcIikgPT4ge1xuICAgICAgc2V0U2VsZWN0aW5nU3RlcChzZWN0aW9uKTtcbiAgICAgIHNldElzT3Blbih0cnVlKTtcbiAgICAgIHNldEhvdmVyRGF0ZShudWxsKTtcblxuICAgICAgY29uc3QgYmFzZSA9IHNlY3Rpb24gPT09IFwic3RhcnRcIiA/IHN0YXJ0RGF0ZSB8fCBlbmREYXRlIHx8IG5vdyA6IGVuZERhdGUgfHwgc3RhcnREYXRlIHx8IG5vdztcbiAgICAgIHNldEN1cnJlbnRNb250aChiYXNlLmdldE1vbnRoKCkpO1xuICAgICAgc2V0Q3VycmVudFllYXIoYmFzZS5nZXRGdWxsWWVhcigpKTtcbiAgICB9LFxuICAgIFtlbmREYXRlLCBub3csIHN0YXJ0RGF0ZV1cbiAgKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChhdXRvT3BlblJlcXVlc3RJZCA8PSAwKSByZXR1cm47XG4gICAgc2V0U2VsZWN0aW5nU3RlcChcInN0YXJ0XCIpO1xuICAgIHNldElzT3Blbih0cnVlKTtcbiAgICBzZXRIb3ZlckRhdGUobnVsbCk7XG4gICAgY29uc3QgYmFzZSA9IHN0YXJ0RGF0ZSB8fCBlbmREYXRlIHx8IG5vdztcbiAgICBzZXRDdXJyZW50TW9udGgoYmFzZS5nZXRNb250aCgpKTtcbiAgICBzZXRDdXJyZW50WWVhcihiYXNlLmdldEZ1bGxZZWFyKCkpO1xuICB9LCBbYXV0b09wZW5SZXF1ZXN0SWRdKTtcblxuICBjb25zdCBvbkFjdGl2YXRvcktleURvd24gPSB1c2VDYWxsYmFjayhcbiAgICAoZXZlbnQ6IFJlYWN0LktleWJvYXJkRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB7XG4gICAgICBpZiAoZXZlbnQua2V5ICE9PSBcIkVudGVyXCIgJiYgZXZlbnQua2V5ICE9PSBcIiBcIikgcmV0dXJuO1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIG9wZW5Qb3BvdmVyKFwic3RhcnRcIik7XG4gICAgfSxcbiAgICBbb3BlblBvcG92ZXJdXG4gICk7XG5cbiAgY29uc3Qgb25TZWN0aW9uS2V5RG93biA9IHVzZUNhbGxiYWNrKFxuICAgIChldmVudDogUmVhY3QuS2V5Ym9hcmRFdmVudDxIVE1MRGl2RWxlbWVudD4sIHNlY3Rpb246IFwic3RhcnRcIiB8IFwiZW5kXCIpID0+IHtcbiAgICAgIGlmIChldmVudC5rZXkgIT09IFwiRW50ZXJcIiAmJiBldmVudC5rZXkgIT09IFwiIFwiKSByZXR1cm47XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgb3BlblBvcG92ZXIoc2VjdGlvbik7XG4gICAgfSxcbiAgICBbb3BlblBvcG92ZXJdXG4gICk7XG5cbiAgY29uc3Qgb25DbGVhciA9IHVzZUNhbGxiYWNrKChldmVudDogUmVhY3QuTW91c2VFdmVudCkgPT4ge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgc2V0U3RhcnREYXRlKG51bGwpO1xuICAgIHNldEVuZERhdGUobnVsbCk7XG4gICAgc2V0SG92ZXJEYXRlKG51bGwpO1xuICAgIHNldFNlbGVjdGluZ1N0ZXAoXCJzdGFydFwiKTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IG9uUHJldk1vbnRoID0gdXNlQ2FsbGJhY2soKGV2ZW50OiBSZWFjdC5Nb3VzZUV2ZW50PEhUTUxCdXR0b25FbGVtZW50PikgPT4ge1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHNldEN1cnJlbnRNb250aCgocHJldmlvdXMpID0+IHtcbiAgICAgIGNvbnN0IG5leHQgPSBwcmV2aW91cyAtIDE7XG4gICAgICBpZiAobmV4dCA8IDApIHtcbiAgICAgICAgc2V0Q3VycmVudFllYXIoKHllYXIpID0+IHllYXIgLSAxKTtcbiAgICAgICAgcmV0dXJuIDExO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5leHQ7XG4gICAgfSk7XG4gIH0sIFtdKTtcblxuICBjb25zdCBvbk5leHRNb250aCA9IHVzZUNhbGxiYWNrKChldmVudDogUmVhY3QuTW91c2VFdmVudDxIVE1MQnV0dG9uRWxlbWVudD4pID0+IHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBzZXRDdXJyZW50TW9udGgoKHByZXZpb3VzKSA9PiB7XG4gICAgICBjb25zdCBuZXh0ID0gcHJldmlvdXMgKyAxO1xuICAgICAgaWYgKG5leHQgPiAxMSkge1xuICAgICAgICBzZXRDdXJyZW50WWVhcigoeWVhcikgPT4geWVhciArIDEpO1xuICAgICAgICByZXR1cm4gMDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXh0O1xuICAgIH0pO1xuICB9LCBbXSk7XG5cbiAgY29uc3Qgb25EYXlDbGljayA9IHVzZUNhbGxiYWNrKFxuICAgIChkYXk6IEhpc3RvcnlNYW51YWxEYXlDZWxsKSA9PiB7XG4gICAgICBpZiAoIWRheS5kYXRlIHx8IGRheS5kaXNhYmxlZCkgcmV0dXJuO1xuXG4gICAgICBjb25zdCBuZXh0RGF0ZSA9IG5ldyBEYXRlKGRheS5kYXRlLmdldEZ1bGxZZWFyKCksIGRheS5kYXRlLmdldE1vbnRoKCksIGRheS5kYXRlLmdldERhdGUoKSk7XG5cbiAgICAgIGlmICghc3RhcnREYXRlIHx8IHNlbGVjdGluZ1N0ZXAgPT09IFwic3RhcnRcIikge1xuICAgICAgICBzZXRTdGFydERhdGUobmV4dERhdGUpO1xuICAgICAgICBpZiAoZW5kRGF0ZSAmJiBpc0JlZm9yZURheShlbmREYXRlLCBuZXh0RGF0ZSkpIHtcbiAgICAgICAgICBzZXRFbmREYXRlKG51bGwpO1xuICAgICAgICB9XG4gICAgICAgIHNldFNlbGVjdGluZ1N0ZXAoXCJlbmRcIik7XG4gICAgICAgIHNldEN1cnJlbnRNb250aChuZXh0RGF0ZS5nZXRNb250aCgpKTtcbiAgICAgICAgc2V0Q3VycmVudFllYXIobmV4dERhdGUuZ2V0RnVsbFllYXIoKSk7XG4gICAgICAgIGZvY3VzRGF0ZVJhbmdlU2VjdGlvbihhY3RpdmF0b3JSZWYuY3VycmVudCwgXCJlbmRcIik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHNlbGVjdGluZ1N0ZXAgPT09IFwiZW5kXCIpIHtcbiAgICAgICAgbGV0IGZpbmFsU3RhcnQgPSBzdGFydERhdGU7XG4gICAgICAgIGxldCBmaW5hbEVuZCA9IG5leHREYXRlO1xuXG4gICAgICAgIGlmIChpc0JlZm9yZURheShuZXh0RGF0ZSwgc3RhcnREYXRlKSkge1xuICAgICAgICAgIGZpbmFsU3RhcnQgPSBuZXh0RGF0ZTtcbiAgICAgICAgICBmaW5hbEVuZCA9IHN0YXJ0RGF0ZTtcbiAgICAgICAgICBzZXRFbmREYXRlKGZpbmFsRW5kKTtcbiAgICAgICAgICBzZXRTdGFydERhdGUoZmluYWxTdGFydCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2V0RW5kRGF0ZShmaW5hbEVuZCk7XG4gICAgICAgIH1cblxuICAgICAgICBvblJhbmdlQ29tcGxldGU/Lih0b0lzb0RhdGVSYW5nZVZhbHVlKGZpbmFsU3RhcnQpLCB0b0lzb0RhdGVSYW5nZVZhbHVlKGZpbmFsRW5kKSk7XG4gICAgICAgIHNldFNlbGVjdGluZ1N0ZXAoXCJkb25lXCIpO1xuICAgICAgICBzZXRJc09wZW4oZmFsc2UpO1xuICAgICAgICBzZXRIb3ZlckRhdGUobnVsbCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBbZW5kRGF0ZSwgb25SYW5nZUNvbXBsZXRlLCBzZWxlY3RpbmdTdGVwLCBzdGFydERhdGVdXG4gICk7XG5cbiAgY29uc3Qgb25EYXlIb3ZlciA9IHVzZUNhbGxiYWNrKFxuICAgIChkYXk6IEhpc3RvcnlNYW51YWxEYXlDZWxsKSA9PiB7XG4gICAgICBpZiAoIWRheS5kYXRlIHx8IHNlbGVjdGluZ1N0ZXAgIT09IFwiZW5kXCIgfHwgIXN0YXJ0RGF0ZSkgcmV0dXJuO1xuICAgICAgc2V0SG92ZXJEYXRlKG5ldyBEYXRlKGRheS5kYXRlLmdldEZ1bGxZZWFyKCksIGRheS5kYXRlLmdldE1vbnRoKCksIGRheS5kYXRlLmdldERhdGUoKSkpO1xuICAgIH0sXG4gICAgW3NlbGVjdGluZ1N0ZXAsIHN0YXJ0RGF0ZV1cbiAgKTtcblxuICBjb25zdCBvbkdyaWRNb3VzZUxlYXZlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIHNldEhvdmVyRGF0ZShudWxsKTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IGNhbGVuZGFyID0gdXNlTWVtbygoKSA9PiB7XG4gICAgcmV0dXJuIGJ1aWxkQ2FsZW5kYXJNb250aChjdXJyZW50WWVhciwgY3VycmVudE1vbnRoLCBsb2NhbGUpO1xuICB9LCBbY3VycmVudE1vbnRoLCBjdXJyZW50WWVhciwgbG9jYWxlXSk7XG5cbiAgY29uc3QgZGF5Q2VsbHMgPSB1c2VNZW1vKFxuICAgICgpID0+IGJ1aWxkRGF0ZVJhbmdlRGF5Q2VsbHMoY2FsZW5kYXIuY2VsbHMsIHN0YXJ0RGF0ZSwgZW5kRGF0ZSwgaG92ZXJEYXRlLCBzZWxlY3RpbmdTdGVwKSxcbiAgICBbY2FsZW5kYXIuY2VsbHMsIGVuZERhdGUsIGhvdmVyRGF0ZSwgc2VsZWN0aW5nU3RlcCwgc3RhcnREYXRlXVxuICApO1xuXG4gIGNvbnN0IGxhYmVsRnJvbSA9IHRvU2VudGVuY2VDYXNlKGluZFQoXCJIaXN0b3J5X0Zyb21cIiwgXCJGcm9tXCIpLCBsb2NhbGUpO1xuICBjb25zdCBsYWJlbFRvID0gdG9TZW50ZW5jZUNhc2UoaW5kVChcIkhpc3RvcnlfVG9cIiwgXCJUb1wiKSwgbG9jYWxlKTtcblxuICByZXR1cm4gKFxuICAgIDxIaXN0b3J5TWFudWFsRGF0ZVBpY2tlclxuICAgICAgYWN0aXZhdG9yUmVmPXthY3RpdmF0b3JSZWZ9XG4gICAgICBwb3BvdmVyUmVmPXtwb3BvdmVyUmVmfVxuICAgICAgc2hvd01hbnVhbEVycm9yPXtzaG93TWFudWFsRXJyb3J9XG4gICAgICBzaG93U3RhcnRFcnJvcj17c2hvd1N0YXJ0RXJyb3J9XG4gICAgICBzaG93RW5kRXJyb3I9e3Nob3dFbmRFcnJvcn1cbiAgICAgIGZpbHRlclRpdGxlPXtpbmRUKFwiSGlzdG9yeV9GaWx0ZXJfRGF0ZVwiLCBcIkRhdGVcIil9XG4gICAgICBpc09wZW49e2lzT3Blbn1cbiAgICAgIHNlbGVjdGluZ1N0ZXA9e3NlbGVjdGluZ1N0ZXB9XG4gICAgICBsYWJlbEZyb209e2xhYmVsRnJvbX1cbiAgICAgIGxhYmVsVG89e2xhYmVsVG99XG4gICAgICBzdGFydERhdGVUZXh0PXtzdGFydERhdGUgPyBmb3JtYXREYXRlUmFuZ2VEaXNwbGF5KHN0YXJ0RGF0ZSwgbG9jYWxlKSA6IGluZFQoXCJIaXN0b3J5X0FkZERhdGVcIiwgXCJBZGQgZGF0ZVwiKX1cbiAgICAgIGVuZERhdGVUZXh0PXtlbmREYXRlID8gZm9ybWF0RGF0ZVJhbmdlRGlzcGxheShlbmREYXRlLCBsb2NhbGUpIDogaW5kVChcIkhpc3RvcnlfQWRkRGF0ZVwiLCBcIkFkZCBkYXRlXCIpfVxuICAgICAgY2xlYXJSYW5nZUxhYmVsPXtpbmRUKFwiSGlzdG9yeV9DbGVhclJhbmdlXCIsIFwiQ2xlYXIgcmFuZ2VcIil9XG4gICAgICBoYXNTZWxlY3RlZFJhbmdlPXshIXN0YXJ0RGF0ZSB8fCAhIWVuZERhdGV9XG4gICAgICBtb250aExhYmVsPXtjYWxlbmRhci5tb250aExhYmVsfVxuICAgICAgd2Vla0RheUxhYmVscz17W1xuICAgICAgICBpbmRUKFwiSGlzdG9yeV9EYXlfTW9uXCIsIFwiTW9uXCIpLFxuICAgICAgICBpbmRUKFwiSGlzdG9yeV9EYXlfVHVlXCIsIFwiVHVlXCIpLFxuICAgICAgICBpbmRUKFwiSGlzdG9yeV9EYXlfV2VkXCIsIFwiV2VkXCIpLFxuICAgICAgICBpbmRUKFwiSGlzdG9yeV9EYXlfVGh1XCIsIFwiVGh1XCIpLFxuICAgICAgICBpbmRUKFwiSGlzdG9yeV9EYXlfRnJpXCIsIFwiRnJpXCIpLFxuICAgICAgICBpbmRUKFwiSGlzdG9yeV9EYXlfU2F0XCIsIFwiU2F0XCIpLFxuICAgICAgICBpbmRUKFwiSGlzdG9yeV9EYXlfU3VuXCIsIFwiU3VuXCIpLFxuICAgICAgXX1cbiAgICAgIHN0YXR1c1RleHQ9e1xuICAgICAgICBzZWxlY3RpbmdTdGVwID09PSBcInN0YXJ0XCJcbiAgICAgICAgICA/IGluZFQoXCJIaXN0b3J5X1N0YXR1c19TZWxlY3RTdGFydFwiLCBcIlNlbGVjdCBzdGFydCBkYXRlXCIpXG4gICAgICAgICAgOiBpbmRUKFwiSGlzdG9yeV9TdGF0dXNfU2VsZWN0RW5kXCIsIFwiU2VsZWN0IGVuZCBkYXRlXCIpXG4gICAgICB9XG4gICAgICBkYXlDZWxscz17ZGF5Q2VsbHN9XG4gICAgICBwcmV2TW9udGhMYWJlbD17aW5kVChcIkhpc3RvcnlfUHJldk1vbnRoXCIsIFwiUHJldmlvdXMgbW9udGhcIil9XG4gICAgICBuZXh0TW9udGhMYWJlbD17aW5kVChcIkhpc3RvcnlfTmV4dE1vbnRoXCIsIFwiTmV4dCBtb250aFwiKX1cbiAgICAgIG9uT3BlblBvcG92ZXI9e29wZW5Qb3BvdmVyfVxuICAgICAgb25BY3RpdmF0b3JLZXlEb3duPXtvbkFjdGl2YXRvcktleURvd259XG4gICAgICBvblNlY3Rpb25LZXlEb3duPXtvblNlY3Rpb25LZXlEb3dufVxuICAgICAgb25DbGVhcj17b25DbGVhcn1cbiAgICAgIG9uUHJldk1vbnRoPXtvblByZXZNb250aH1cbiAgICAgIG9uTmV4dE1vbnRoPXtvbk5leHRNb250aH1cbiAgICAgIG9uR3JpZE1vdXNlTGVhdmU9e29uR3JpZE1vdXNlTGVhdmV9XG4gICAgICBvbkRheUNsaWNrPXtvbkRheUNsaWNrfVxuICAgICAgb25EYXlIb3Zlcj17b25EYXlIb3Zlcn1cbiAgICAvPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZURhdGVSYW5nZUZpbHRlcjtcbiIsICJpbXBvcnQgeyBjbGFzc05hbWVzIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2NsYXNzTmFtZXMudHNcIjtcbmltcG9ydCB0eXBlIHsgSGlzdG9yeU1hbnVhbERheUNlbGwgfSBmcm9tIFwiLi4vLi4vdmlzaXRhcy9oaXN0b3JpYWwvSGlzdG9yeU1hbnVhbERhdGVQaWNrZXIudHN4XCI7XG5cbmV4cG9ydCB0eXBlIENhbGVuZGFyQ2VsbCA9IHtcbiAgZGF0ZTogRGF0ZSB8IG51bGw7XG4gIGlzbzogc3RyaW5nO1xuICBpc0VtcHR5OiBib29sZWFuO1xufTtcblxuY29uc3QgcGFkID0gKHZhbHVlOiBudW1iZXIpOiBzdHJpbmcgPT4gdmFsdWUudG9TdHJpbmcoKS5wYWRTdGFydCgyLCBcIjBcIik7XG5cbmV4cG9ydCBjb25zdCB0b0lzb0RhdGVSYW5nZVZhbHVlID0gKGRhdGU6IERhdGUpOiBzdHJpbmcgPT4ge1xuICByZXR1cm4gYCR7ZGF0ZS5nZXRGdWxsWWVhcigpfS0ke3BhZChkYXRlLmdldE1vbnRoKCkgKyAxKX0tJHtwYWQoZGF0ZS5nZXREYXRlKCkpfWA7XG59O1xuXG5leHBvcnQgY29uc3QgcGFyc2VJc29EYXRlUmFuZ2VWYWx1ZSA9ICh2YWx1ZTogc3RyaW5nKTogRGF0ZSB8IG51bGwgPT4ge1xuICBpZiAoIXZhbHVlKSByZXR1cm4gbnVsbDtcbiAgY29uc3QgdHJpbW1lZCA9IFN0cmluZyh2YWx1ZSkudHJpbSgpO1xuICBpZiAoIXRyaW1tZWQpIHJldHVybiBudWxsO1xuXG4gIGNvbnN0IGRhdGVQYXJ0ID0gdHJpbW1lZC5zcGxpdChcIlRcIilbMF0uc3BsaXQoXCIgXCIpWzBdO1xuICBpZiAoIS9eXFxkezR9LVxcZHsyfS1cXGR7Mn0kLy50ZXN0KGRhdGVQYXJ0KSkgcmV0dXJuIG51bGw7XG5cbiAgY29uc3QgW3llYXIsIG1vbnRoLCBkYXldID0gZGF0ZVBhcnQuc3BsaXQoXCItXCIpLm1hcChOdW1iZXIpO1xuICByZXR1cm4gbmV3IERhdGUoeWVhciwgbW9udGggLSAxLCBkYXkpO1xufTtcblxuZXhwb3J0IGNvbnN0IGlzU2FtZURheSA9IChhOiBEYXRlIHwgbnVsbCwgYjogRGF0ZSB8IG51bGwpOiBib29sZWFuID0+IHtcbiAgcmV0dXJuICEhKGEgJiYgYiAmJiBhLmdldFRpbWUoKSA9PT0gYi5nZXRUaW1lKCkpO1xufTtcblxuZXhwb3J0IGNvbnN0IGlzQmVmb3JlRGF5ID0gKGE6IERhdGUgfCBudWxsLCBiOiBEYXRlIHwgbnVsbCk6IGJvb2xlYW4gPT4ge1xuICByZXR1cm4gISEoYSAmJiBiICYmIGEuZ2V0VGltZSgpIDwgYi5nZXRUaW1lKCkpO1xufTtcblxuZXhwb3J0IGNvbnN0IGZvY3VzRGF0ZVJhbmdlU2VjdGlvbiA9IChjb250YWluZXI6IEhUTUxEaXZFbGVtZW50IHwgbnVsbCwgc2VjdGlvbjogXCJzdGFydFwiIHwgXCJlbmRcIik6IHZvaWQgPT4ge1xuICBpZiAoIWNvbnRhaW5lcikgcmV0dXJuO1xuICBjb25zdCB0YXJnZXQgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcjxIVE1MRWxlbWVudD4oYFtkYXRhLXNlY3Rpb249XCIke3NlY3Rpb259XCJdYCk7XG4gIGlmICghdGFyZ2V0KSByZXR1cm47XG4gIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gdGFyZ2V0LmZvY3VzKCkpO1xufTtcblxuY29uc3QgdG9UaXRsZUNhc2UgPSAodmFsdWU6IHN0cmluZywgbG9jYWxlOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICBpZiAoIXZhbHVlKSByZXR1cm4gXCJcIjtcbiAgY29uc3QgbG93ZXIgPSB2YWx1ZS50b0xvY2FsZUxvd2VyQ2FzZShsb2NhbGUpO1xuICByZXR1cm4gbG93ZXJbMF0udG9Mb2NhbGVVcHBlckNhc2UobG9jYWxlKSArIGxvd2VyLnNsaWNlKDEpO1xufTtcblxuZXhwb3J0IGNvbnN0IHRvU2VudGVuY2VDYXNlID0gKHZhbHVlOiBzdHJpbmcsIGxvY2FsZTogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgaWYgKCF2YWx1ZSkgcmV0dXJuIFwiXCI7XG4gIGNvbnN0IHRyaW1tZWQgPSB2YWx1ZS50cmltKCk7XG4gIGlmICghdHJpbW1lZCkgcmV0dXJuIHRyaW1tZWQ7XG4gIGNvbnN0IGxvd2VyID0gdHJpbW1lZC50b0xvY2FsZUxvd2VyQ2FzZShsb2NhbGUpO1xuICByZXR1cm4gbG93ZXJbMF0udG9Mb2NhbGVVcHBlckNhc2UobG9jYWxlKSArIGxvd2VyLnNsaWNlKDEpO1xufTtcblxuZXhwb3J0IGNvbnN0IGZvcm1hdERhdGVSYW5nZURpc3BsYXkgPSAoZGF0ZTogRGF0ZSwgbG9jYWxlOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICByZXR1cm4gZGF0ZVxuICAgIC50b0xvY2FsZURhdGVTdHJpbmcobG9jYWxlLCB7XG4gICAgICBkYXk6IFwibnVtZXJpY1wiLFxuICAgICAgbW9udGg6IFwic2hvcnRcIixcbiAgICAgIHllYXI6IFwibnVtZXJpY1wiLFxuICAgIH0pXG4gICAgLnJlcGxhY2UoL1xcLi9nLCBcIlwiKVxuICAgIC50b0xvd2VyQ2FzZSgpO1xufTtcblxuZXhwb3J0IGNvbnN0IGZvcm1hdE1vbnRoTGFiZWwgPSAoZGF0ZTogRGF0ZSwgbG9jYWxlOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICBjb25zdCBtb250aE5hbWUgPSBkYXRlLnRvTG9jYWxlRGF0ZVN0cmluZyhsb2NhbGUsIHsgbW9udGg6IFwibG9uZ1wiIH0pO1xuICByZXR1cm4gYCR7dG9UaXRsZUNhc2UobW9udGhOYW1lLCBsb2NhbGUpfSAke2RhdGUuZ2V0RnVsbFllYXIoKX1gO1xufTtcblxuZXhwb3J0IGNvbnN0IHJlc29sdmVVaUxvY2FsZSA9ICgpOiBzdHJpbmcgPT4ge1xuICBjb25zdCBmcm9tSHRtbCA9IHR5cGVvZiBkb2N1bWVudCAhPT0gXCJ1bmRlZmluZWRcIiA/IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5sYW5nIDogXCJcIjtcbiAgcmV0dXJuIGZyb21IdG1sICYmIFN0cmluZyhmcm9tSHRtbCkudHJpbSgpID8gZnJvbUh0bWwgOiBcImVzLUVTXCI7XG59O1xuXG5leHBvcnQgY29uc3QgYnVpbGRDYWxlbmRhck1vbnRoID0gKHllYXI6IG51bWJlciwgbW9udGg6IG51bWJlciwgbG9jYWxlOiBzdHJpbmcpOiB7IG1vbnRoTGFiZWw6IHN0cmluZzsgY2VsbHM6IENhbGVuZGFyQ2VsbFtdIH0gPT4ge1xuICBjb25zdCBmaXJzdERheSA9IG5ldyBEYXRlKHllYXIsIG1vbnRoLCAxKTtcbiAgY29uc3QgZGF5c0luTW9udGggPSBuZXcgRGF0ZSh5ZWFyLCBtb250aCArIDEsIDApLmdldERhdGUoKTtcbiAgY29uc3Qgb2Zmc2V0ID0gKGZpcnN0RGF5LmdldERheSgpICsgNikgJSA3O1xuICBjb25zdCBjZWxsczogQ2FsZW5kYXJDZWxsW10gPSBbXTtcblxuICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgb2Zmc2V0OyBpbmRleCArPSAxKSB7XG4gICAgY2VsbHMucHVzaCh7IGRhdGU6IG51bGwsIGlzbzogXCJcIiwgaXNFbXB0eTogdHJ1ZSB9KTtcbiAgfVxuXG4gIGZvciAobGV0IGRheSA9IDE7IGRheSA8PSBkYXlzSW5Nb250aDsgZGF5ICs9IDEpIHtcbiAgICBjb25zdCBkYXRlT2JqID0gbmV3IERhdGUoeWVhciwgbW9udGgsIGRheSk7XG4gICAgY2VsbHMucHVzaCh7IGRhdGU6IGRhdGVPYmosIGlzbzogdG9Jc29EYXRlUmFuZ2VWYWx1ZShkYXRlT2JqKSwgaXNFbXB0eTogZmFsc2UgfSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIG1vbnRoTGFiZWw6IGZvcm1hdE1vbnRoTGFiZWwoZmlyc3REYXksIGxvY2FsZSksXG4gICAgY2VsbHMsXG4gIH07XG59O1xuXG5leHBvcnQgY29uc3QgYnVpbGREYXRlUmFuZ2VEYXlDZWxscyA9IChcbiAgY2VsbHM6IENhbGVuZGFyQ2VsbFtdLFxuICBzdGFydERhdGU6IERhdGUgfCBudWxsLFxuICBlbmREYXRlOiBEYXRlIHwgbnVsbCxcbiAgaG92ZXJEYXRlOiBEYXRlIHwgbnVsbCxcbiAgc2VsZWN0aW5nU3RlcDogXCJzdGFydFwiIHwgXCJlbmRcIiB8IFwiZG9uZVwiXG4pOiBIaXN0b3J5TWFudWFsRGF5Q2VsbFtdID0+IHtcbiAgY29uc3QgcHJldmlld0VuZCA9IGVuZERhdGUgfHwgKHNlbGVjdGluZ1N0ZXAgPT09IFwiZW5kXCIgPyBob3ZlckRhdGUgOiBudWxsKTtcblxuICByZXR1cm4gY2VsbHMubWFwKChjZWxsLCBpbmRleCkgPT4ge1xuICAgIGlmIChjZWxsLmlzRW1wdHkgfHwgIWNlbGwuZGF0ZSkge1xuICAgICAgcmV0dXJuIHsga2V5OiBgZW1wdHktJHtpbmRleH1gLCBpc0VtcHR5OiB0cnVlIH07XG4gICAgfVxuXG4gICAgY29uc3QgZGF0ZU9iaiA9IGNlbGwuZGF0ZTtcbiAgICBjb25zdCBpc1N0YXJ0ID0gaXNTYW1lRGF5KGRhdGVPYmosIHN0YXJ0RGF0ZSk7XG4gICAgY29uc3QgaXNFbmQgPSBpc1NhbWVEYXkoZGF0ZU9iaiwgZW5kRGF0ZSk7XG4gICAgY29uc3QgaW5SYW5nZSA9IHN0YXJ0RGF0ZSAmJiBwcmV2aWV3RW5kICYmIGlzQmVmb3JlRGF5KHN0YXJ0RGF0ZSwgZGF0ZU9iaikgJiYgaXNCZWZvcmVEYXkoZGF0ZU9iaiwgcHJldmlld0VuZCk7XG4gICAgY29uc3QgaG92ZXJSYW5nZSA9IHN0YXJ0RGF0ZSAmJiAhZW5kRGF0ZSAmJiBob3ZlckRhdGUgJiYgaXNCZWZvcmVEYXkoc3RhcnREYXRlLCBkYXRlT2JqKSAmJiBpc0JlZm9yZURheShkYXRlT2JqLCBob3ZlckRhdGUpO1xuICAgIGNvbnN0IGRpc2FibGVkID0gc2VsZWN0aW5nU3RlcCA9PT0gXCJlbmRcIiAmJiAhIXN0YXJ0RGF0ZSAmJiBpc0JlZm9yZURheShkYXRlT2JqLCBzdGFydERhdGUpO1xuICAgIGNvbnN0IGlzVG9kYXkgPSBpc1NhbWVEYXkoZGF0ZU9iaiwgbmV3IERhdGUoKSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAga2V5OiBjZWxsLmlzbyxcbiAgICAgIGlzRW1wdHk6IGZhbHNlLFxuICAgICAgZGF0ZTogZGF0ZU9iaixcbiAgICAgIGlzbzogY2VsbC5pc28sXG4gICAgICBkYXlMYWJlbDogZGF0ZU9iai5nZXREYXRlKCksXG4gICAgICBkYXlDbGFzczogY2xhc3NOYW1lcyhcbiAgICAgICAgXCJkcnAtZGF5XCIsXG4gICAgICAgIGlzU3RhcnQgPyBcInN0YXJ0IHJhbmdlLXN0YXJ0XCIgOiBcIlwiLFxuICAgICAgICBpc0VuZCA/IFwiZW5kIHJhbmdlLWVuZFwiIDogXCJcIixcbiAgICAgICAgaW5SYW5nZSA/IFwiaW4tcmFuZ2VcIiA6IFwiXCIsXG4gICAgICAgIGhvdmVyUmFuZ2UgPyBcImhvdmVyLXJhbmdlXCIgOiBcIlwiLFxuICAgICAgICBkaXNhYmxlZCA/IFwiZGlzYWJsZWRcIiA6IFwiXCIsXG4gICAgICAgIGlzVG9kYXkgPyBcInRvZGF5XCIgOiBcIlwiXG4gICAgICApLFxuICAgICAgZGlzYWJsZWQsXG4gICAgfTtcbiAgfSk7XG59O1xuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBBY3Rpb25CdXR0b24gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9BY3Rpb25CdXR0b24udHN4XCI7XG5cbnR5cGUgRXhwZW5zZUZpbHRlckFjdGlvbnNQcm9wcyA9IHtcbiAgY2xlYXJMYWJlbDogc3RyaW5nO1xuICBhcHBseUxhYmVsOiBzdHJpbmc7XG4gIG9uQ2xlYXI6ICgpID0+IHZvaWQ7XG4gIG9uQXBwbHk6ICgpID0+IHZvaWQ7XG59O1xuXG4vLyBTaGFyZWQgYXBwbHkvY2xlYXIgYWN0aW9uIHJvdyBmb3IgZXhwZW5zZSBzaGVldCBmaWx0ZXJzLlxuY29uc3QgRXhwZW5zZUZpbHRlckFjdGlvbnMgPSAoe1xuICBjbGVhckxhYmVsLFxuICBhcHBseUxhYmVsLFxuICBvbkNsZWFyLFxuICBvbkFwcGx5LFxufTogRXhwZW5zZUZpbHRlckFjdGlvbnNQcm9wcykgPT4ge1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtMSBncmlkIGdyaWQtY29scy0yIGdhcC0yIGhpc3RvcnktZmlsdGVyLWFjdGlvbnNcIj5cbiAgICAgIDxBY3Rpb25CdXR0b24gbGFiZWw9e2NsZWFyTGFiZWx9IGNsYXNzTmFtZT1cInctZnVsbFwiIG9uQ2xpY2s9e29uQ2xlYXJ9IC8+XG4gICAgICA8QWN0aW9uQnV0dG9uIGxhYmVsPXthcHBseUxhYmVsfSBjbGFzc05hbWU9XCJ3LWZ1bGxcIiBvbkNsaWNrPXtvbkFwcGx5fSAvPlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZUZpbHRlckFjdGlvbnM7XG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IEZpbHRlckJ1dHRvbiBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0ZpbHRlckJ1dHRvbi50c3hcIjtcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlUXVpY2tEYXRlRmlsdGVySWQgfSBmcm9tIFwiLi4vY29uc3RhbnRzL2V4cGVuc2VRdWlja0RhdGVGaWx0ZXJDYXRhbG9nLnRzXCI7XG5cbnR5cGUgRXhwZW5zZVF1aWNrRGF0ZUZpbHRlcnNQcm9wcyA9IHtcbiAgYWN0aXZlUXVpY2tGaWx0ZXI6IEV4cGVuc2VRdWlja0RhdGVGaWx0ZXJJZCB8IG51bGw7XG4gIG9uUXVpY2tGaWx0ZXJDaGFuZ2U6IChmaWx0ZXJJZDogRXhwZW5zZVF1aWNrRGF0ZUZpbHRlcklkKSA9PiB2b2lkO1xufTtcblxuLy8gU2hhcmVkIHF1aWNrIGRhdGUgZmlsdGVycyB1c2VkIGJ5IGV4cGVuc2Ugc2hlZXRzIGFuZCB0aWNrZXRzIHBhbmVscy5cbmNvbnN0IEV4cGVuc2VRdWlja0RhdGVGaWx0ZXJzID0gKHsgYWN0aXZlUXVpY2tGaWx0ZXIsIG9uUXVpY2tGaWx0ZXJDaGFuZ2UgfTogRXhwZW5zZVF1aWNrRGF0ZUZpbHRlcnNQcm9wcykgPT4ge1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBnYXAtMiBoaXN0b3J5LXF1aWNrLWZpbHRlcnNcIiBhcmlhLWxhYmVsPXtpbmRUKFwiSGlzdG9yeV9GaWx0ZXJfRGF0ZVwiLCBcIkRhdGVcIil9PlxuICAgICAgPEZpbHRlckJ1dHRvblxuICAgICAgICBsYWJlbD17aW5kVChcIkhpc3RvcnlfUXVpY2tfQ3VzdG9tXCIsIFwiRGF0ZVwiKX1cbiAgICAgICAgYWN0aXZlPXthY3RpdmVRdWlja0ZpbHRlciA9PT0gXCJjdXN0b21cIn1cbiAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsXCJcbiAgICAgICAgb25DbGljaz17KCkgPT4gb25RdWlja0ZpbHRlckNoYW5nZShcImN1c3RvbVwiKX1cbiAgICAgIC8+XG4gICAgICA8RmlsdGVyQnV0dG9uXG4gICAgICAgIGxhYmVsPXtpbmRUKFwiSGlzdG9yeV9RdWlja183RGF5c1wiLCBcIjcgZGF5c1wiKX1cbiAgICAgICAgYWN0aXZlPXthY3RpdmVRdWlja0ZpbHRlciA9PT0gXCJkYXlzLTdcIn1cbiAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsXCJcbiAgICAgICAgb25DbGljaz17KCkgPT4gb25RdWlja0ZpbHRlckNoYW5nZShcImRheXMtN1wiKX1cbiAgICAgIC8+XG4gICAgICA8RmlsdGVyQnV0dG9uXG4gICAgICAgIGxhYmVsPXtpbmRUKFwiSGlzdG9yeV9RdWlja18zMERheXNcIiwgXCIzMCBkYXlzXCIpfVxuICAgICAgICBhY3RpdmU9e2FjdGl2ZVF1aWNrRmlsdGVyID09PSBcImRheXMtMzBcIn1cbiAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsXCJcbiAgICAgICAgb25DbGljaz17KCkgPT4gb25RdWlja0ZpbHRlckNoYW5nZShcImRheXMtMzBcIil9XG4gICAgICAvPlxuICAgICAgPEZpbHRlckJ1dHRvblxuICAgICAgICBsYWJlbD17aW5kVChcIkhpc3RvcnlfUXVpY2tfOTBEYXlzXCIsIFwiOTAgZGF5c1wiKX1cbiAgICAgICAgYWN0aXZlPXthY3RpdmVRdWlja0ZpbHRlciA9PT0gXCJkYXlzLTkwXCJ9XG4gICAgICAgIGNsYXNzTmFtZT1cInctZnVsbFwiXG4gICAgICAgIG9uQ2xpY2s9eygpID0+IG9uUXVpY2tGaWx0ZXJDaGFuZ2UoXCJkYXlzLTkwXCIpfVxuICAgICAgLz5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VRdWlja0RhdGVGaWx0ZXJzO1xuIiwgImltcG9ydCB0eXBlIHtcbiAgRXhwZW5zZVNoZWV0TGlzdEFwaVJlcXVlc3QsXG4gIEV4cGVuc2VTaGVldExpc3RGaWx0ZXJzLFxuICBFeHBlbnNlU2hlZXRUaWNrZXRMaXN0UmVxdWVzdCxcbn0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xuaW1wb3J0IHsgREVGQVVMVF9FWFBFTlNFX1NUQVRVU19GSUxURVIgfSBmcm9tIFwiLi4vY29uc3RhbnRzL2V4cGVuc2VTdGF0dXNDYXRhbG9nLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QgfSBmcm9tIFwiLi4vdGlja2V0cy9leHBlbnNlVGlja2V0TGlzdFR5cGVzLnRzXCI7XG5cbmNvbnN0IERFRkFVTFRfU1VHR0VTVF9QQUdFX1NJWkUgPSA1MDtcblxuY29uc3QgaXNWYWxpZEV4cGVuc2VTaGVldFN0YXR1cyA9ICh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG51bWJlciA9PiB7XG4gIHJldHVybiBOdW1iZXIuaXNJbnRlZ2VyKHZhbHVlKSAmJiBOdW1iZXIodmFsdWUpID49IDAgJiYgTnVtYmVyKHZhbHVlKSA8PSA0O1xufTtcblxuLy8gUmVzb2x2ZXMgdGhlIG9wdGlvbmFsIEFQSSBzdGF0dXMgZmlsdGVyIGZyb20gVUkgZmlsdGVyIHN0YXRlLlxuY29uc3QgcmVzb2x2ZUV4cGVuc2VTaGVldFN0YXR1cyA9IChzdGF0dXNGaWx0ZXI6IG51bWJlcik6IG51bWJlciB8IHVuZGVmaW5lZCA9PiB7XG4gIGlmIChzdGF0dXNGaWx0ZXIgPT09IERFRkFVTFRfRVhQRU5TRV9TVEFUVVNfRklMVEVSKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIGlmICghaXNWYWxpZEV4cGVuc2VTaGVldFN0YXR1cyhzdGF0dXNGaWx0ZXIpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiZXhwZW5zZVNoZWV0U3RhdHVzIGZpbHRlciBtdXN0IGJlIGFuIGludGVnZXIgYmV0d2VlbiAwIGFuZCA0LlwiKTtcbiAgfVxuXG4gIHJldHVybiBzdGF0dXNGaWx0ZXI7XG59O1xuXG5jb25zdCBub3JtYWxpemVPcHRpb25hbFRleHQgPSAodmFsdWU6IHN0cmluZyB8IHVuZGVmaW5lZCk6IHN0cmluZyB8IHVuZGVmaW5lZCA9PiB7XG4gIGNvbnN0IHRyaW1tZWQgPSBTdHJpbmcodmFsdWUgfHwgXCJcIikudHJpbSgpO1xuICByZXR1cm4gdHJpbW1lZCA/IHRyaW1tZWQgOiB1bmRlZmluZWQ7XG59O1xuXG5jb25zdCByZXNvbHZlUHJvY2Vzc2VkQnlBaUZpbHRlciA9IChcbiAgdmFsdWU6IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3RbXCJwcm9jZXNzZWRCeUlhRmlsdGVyXCJdXG4pOiBib29sZWFuIHwgdW5kZWZpbmVkID0+IHtcbiAgaWYgKHZhbHVlID09PSBcInllc1wiKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBpZiAodmFsdWUgPT09IFwibm9cIikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB1bmRlZmluZWQ7XG59O1xuXG4vLyBCdWlsZCBsaXN0IHBheWxvYWQgZm9yIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvbGlzdCBmcm9tIGN1cnJlbnQgZmlsdGVyIHN0YXRlLlxuZXhwb3J0IGNvbnN0IGJ1aWxkRXhwZW5zZUxpc3RQYXlsb2FkID0gKFxuICBmaWx0ZXJzOiBFeHBlbnNlU2hlZXRMaXN0RmlsdGVycyxcbiAgcGFnZTogbnVtYmVyLFxuICBwYWdlU2l6ZTogbnVtYmVyXG4pOiBFeHBlbnNlU2hlZXRMaXN0QXBpUmVxdWVzdCA9PiB7XG4gIGNvbnN0IG5leHRQYWdlID0gTnVtYmVyLmlzRmluaXRlKHBhZ2UpICYmIHBhZ2UgPiAwID8gcGFnZSA6IDE7XG4gIGNvbnN0IG5leHRQYWdlU2l6ZSA9IE51bWJlci5pc0Zpbml0ZShwYWdlU2l6ZSkgJiYgcGFnZVNpemUgPiAwID8gcGFnZVNpemUgOiBERUZBVUxUX1NVR0dFU1RfUEFHRV9TSVpFO1xuICBjb25zdCBzYWZlRmlsdGVyID0gU3RyaW5nKGZpbHRlcnMuZmlsdGVyIHx8IGZpbHRlcnMuaG9qYUdhc3Rvc0lkIHx8IFwiXCIpLnRyaW0oKTtcblxuICByZXR1cm4ge1xuICAgIGZpbHRlcjogc2FmZUZpbHRlciB8fCBcIlwiLFxuICAgIGJpbGxlZE1vZGU6IDIsXG4gICAgY3JlYXRlZERhdGVGcm9tOiBub3JtYWxpemVPcHRpb25hbFRleHQoZmlsdGVycy5mcm9tRGF0ZSksXG4gICAgY3JlYXRlZERhdGVUbzogbm9ybWFsaXplT3B0aW9uYWxUZXh0KGZpbHRlcnMudG9EYXRlKSxcbiAgICBwcm9qSWQ6IG5vcm1hbGl6ZU9wdGlvbmFsVGV4dChmaWx0ZXJzLnByb2plY3RJZCksXG4gICAgY3VycmVuY3lDb2RlOiBub3JtYWxpemVPcHRpb25hbFRleHQoZmlsdGVycy5jdXJyZW5jeUNvZGUpLFxuICAgIGV4cGVuc2VTaGVldFN0YXR1czogcmVzb2x2ZUV4cGVuc2VTaGVldFN0YXR1cyhmaWx0ZXJzLnN0YXR1c0ZpbHRlciksXG4gICAgcGFnZTogbmV4dFBhZ2UsXG4gICAgcGFnZVNpemU6IG5leHRQYWdlU2l6ZSxcbiAgfTtcbn07XG5cbi8vIEJ1aWxkIHN1Z2dlc3Rpb24gcGF5bG9hZCBmb3IgZXhwZW5zZSBzaGVldCBkcm9wZG93biBzZWFyY2guXG5leHBvcnQgY29uc3QgYnVpbGRFeHBlbnNlU2hlZXRTdWdnZXN0UGF5bG9hZCA9IChcbiAgdGVybTogc3RyaW5nLFxuICBwYWdlU2l6ZSA9IERFRkFVTFRfU1VHR0VTVF9QQUdFX1NJWkUsXG4gIHBhZ2UgPSAxXG4pOiBFeHBlbnNlU2hlZXRMaXN0QXBpUmVxdWVzdCA9PiB7XG4gIGNvbnN0IHNhZmVUZXJtID0gU3RyaW5nKHRlcm0gfHwgXCJcIikudHJpbSgpO1xuICBjb25zdCBuZXh0UGFnZVNpemUgPSBOdW1iZXIuaXNGaW5pdGUocGFnZVNpemUpICYmIHBhZ2VTaXplID4gMCA/IHBhZ2VTaXplIDogREVGQVVMVF9TVUdHRVNUX1BBR0VfU0laRTtcbiAgY29uc3QgbmV4dFBhZ2UgPSBOdW1iZXIuaXNGaW5pdGUocGFnZSkgJiYgcGFnZSA+IDAgPyBNYXRoLmZsb29yKHBhZ2UpIDogMTtcblxuICByZXR1cm4ge1xuICAgIGZpbHRlcjogc2FmZVRlcm0gfHwgXCJcIixcbiAgICBiaWxsZWRNb2RlOiAyLFxuICAgIGNyZWF0ZWREYXRlRnJvbTogdW5kZWZpbmVkLFxuICAgIGNyZWF0ZWREYXRlVG86IHVuZGVmaW5lZCxcbiAgICBwcm9qSWQ6IHVuZGVmaW5lZCxcbiAgICBjdXJyZW5jeUNvZGU6IHVuZGVmaW5lZCxcbiAgICBwYWdlOiBuZXh0UGFnZSxcbiAgICBwYWdlU2l6ZTogbmV4dFBhZ2VTaXplLFxuICB9O1xufTtcblxuLy8gQnVpbGQgbGlzdCBwYXlsb2FkIGZvciAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMvbGlzdCBmcm9tIHRpY2tldCBmaWx0ZXIgc3RhdGUuXG5leHBvcnQgY29uc3QgYnVpbGRFeHBlbnNlVGlja2V0TGlzdFBheWxvYWQgPSAoXG4gIGZpbHRlcnM6IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QsXG4gIHBhZ2U6IG51bWJlcixcbiAgcGFnZVNpemU6IG51bWJlclxuKTogRXhwZW5zZVNoZWV0VGlja2V0TGlzdFJlcXVlc3QgPT4ge1xuICBjb25zdCBuZXh0UGFnZSA9IE51bWJlci5pc0Zpbml0ZShwYWdlKSAmJiBwYWdlID4gMCA/IE1hdGguZmxvb3IocGFnZSkgOiAxO1xuICBjb25zdCBuZXh0UGFnZVNpemUgPSBOdW1iZXIuaXNGaW5pdGUocGFnZVNpemUpICYmIHBhZ2VTaXplID4gMCA/IE1hdGguZmxvb3IocGFnZVNpemUpIDogREVGQVVMVF9TVUdHRVNUX1BBR0VfU0laRTtcbiAgY29uc3Qgc2FmZUZpbHRlcktleSA9IG5vcm1hbGl6ZU9wdGlvbmFsVGV4dChmaWx0ZXJzLmZpbHRlcktleSk7XG5cbiAgcmV0dXJuIHtcbiAgICBwYWdlOiBuZXh0UGFnZSxcbiAgICBwYWdlU2l6ZTogbmV4dFBhZ2VTaXplLFxuICAgIGNyZWF0ZWREYXRlRnJvbTogbm9ybWFsaXplT3B0aW9uYWxUZXh0KGZpbHRlcnMuZnJvbURhdGUpLFxuICAgIGNyZWF0ZWREYXRlVG86IG5vcm1hbGl6ZU9wdGlvbmFsVGV4dChmaWx0ZXJzLnRvRGF0ZSksXG4gICAgc2VhcmNoS2V5OiBzYWZlRmlsdGVyS2V5LFxuICAgIGZpbHRlcjogc2FmZUZpbHRlcktleSxcbiAgICBzdGF0dXM6IGZpbHRlcnMuc3RhdHVzRmlsdGVyID09PSBcIlwiID8gdW5kZWZpbmVkIDogZmlsdGVycy5zdGF0dXNGaWx0ZXIsXG4gICAgY3VycmVuY3lDb2RlOiBub3JtYWxpemVPcHRpb25hbFRleHQoZmlsdGVycy5jdXJyZW5jeUNvZGUpLFxuICAgIGdhc3RvVHlwZTogZmlsdGVycy5nYXN0b1R5cGVGaWx0ZXIgPT09IFwiXCIgPyB1bmRlZmluZWQgOiBmaWx0ZXJzLmdhc3RvVHlwZUZpbHRlcixcbiAgICBwcm9jZXNzZWRCeUFJOiByZXNvbHZlUHJvY2Vzc2VkQnlBaUZpbHRlcihmaWx0ZXJzLnByb2Nlc3NlZEJ5SWFGaWx0ZXIpLFxuICB9O1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1CQUF5RTs7O0FDU3pFLElBQU0sTUFBTSxDQUFDLFVBQTBCLE1BQU0sU0FBUyxFQUFFLFNBQVMsR0FBRyxHQUFHO0FBRWhFLElBQU0sc0JBQXNCLENBQUMsU0FBdUI7QUFDekQsU0FBTyxHQUFHLEtBQUssWUFBWSxDQUFDLElBQUksSUFBSSxLQUFLLFNBQVMsSUFBSSxDQUFDLENBQUMsSUFBSSxJQUFJLEtBQUssUUFBUSxDQUFDLENBQUM7QUFDakY7QUFFTyxJQUFNLHlCQUF5QixDQUFDLFVBQStCO0FBQ3BFLE1BQUksQ0FBQyxNQUFPLFFBQU87QUFDbkIsUUFBTSxVQUFVLE9BQU8sS0FBSyxFQUFFLEtBQUs7QUFDbkMsTUFBSSxDQUFDLFFBQVMsUUFBTztBQUVyQixRQUFNLFdBQVcsUUFBUSxNQUFNLEdBQUcsRUFBRSxDQUFDLEVBQUUsTUFBTSxHQUFHLEVBQUUsQ0FBQztBQUNuRCxNQUFJLENBQUMsc0JBQXNCLEtBQUssUUFBUSxFQUFHLFFBQU87QUFFbEQsUUFBTSxDQUFDLE1BQU0sT0FBTyxHQUFHLElBQUksU0FBUyxNQUFNLEdBQUcsRUFBRSxJQUFJLE1BQU07QUFDekQsU0FBTyxJQUFJLEtBQUssTUFBTSxRQUFRLEdBQUcsR0FBRztBQUN0QztBQUVPLElBQU0sWUFBWSxDQUFDLEdBQWdCLE1BQTRCO0FB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QUFhLE9BQU8sUUFBUSxVQUFVLFFBQVEsZ0JBQWdCLEVBQUUsRUFBRSxLQUFLO0FBRTdFLFNBQU87QUFBQSxJQUNMLFFBQVEsY0FBYztBQUFBLElBQ3RCLFlBQVk7QUFBQSxJQUNaLGlCQUFpQixzQkFBc0IsUUFBUSxRQUFRO0FBQUEsSUFDdkQsZUFBZSxzQkFBc0IsUUFBUSxNQUFNO0FBQUEsSUFDbkQsUUFBUSxzQkFBc0IsUUFBUSxTQUFTO0FBQUEsSUFDL0MsY0FBYyxzQkFBc0IsUUFBUSxZQUFZO0FBQUEsSUFDeEQsb0JBQW9CLDBCQUEwQixRQUFRLFlBQVk7QUFBQSxJQUNsRSxNQUFNO0FBQUEsSUFDTixVQUFVO0FBQUEsRUFDWjtBQUNGO0FBR08sSUFBTSxrQ0FBa0MsQ0FDN0MsTUFDQSxXQUFXLDJCQUNYLE9BQU8sTUFDd0I7QUFDL0IsUUFBTSxXQUFXLE9BQU8sUUFBUSxFQUFFLEVBQUUsS0FBSztBQUN6QyxRQUFNLGVBQWUsT0FBTyxTQUFTLFFBQVEsS0FBSyxXQUFXLElBQUksV0FBVztBQUM1RSxRQUFNLFdBQVcsT0FBTyxTQUFTLElBQUksS0FBSyxPQUFPLElBQUksS0FBSyxNQUFNLElBQUksSUFBSTtBQUV4RSxTQUFPO0FBQUEsSUFDTCxRQUFRLFlBQVk7QUFBQSxJQUNwQixZQUFZO0FBQUEsSUFDWixpQkFBaUI7QUFBQSxJQUNqQixlQUFlO0FBQUEsSUFDZixRQUFRO0FBQUEsSUFDUixjQUFjO0FBQUEsSUFDZCxNQUFNO0FBQUEsSUFDTixVQUFVO0FBQUEsRUFDWjtBQUNGO0FBR08sSUFBTSxnQ0FBZ0MsQ0FDM0MsU0FDQSxNQUNBLGFBQ2tDO0FBQ2xDLFFBQU0sV0FBVyxPQUFPLFNBQVMsSUFBSSxLQUFLLE9BQU8sSUFBSSxLQUFLLE1BQU0sSUFBSSxJQUFJO0FBQ3hFLFFBQU0sZUFBZSxPQUFPLFNBQVMsUUFBUSxLQUFLLFdBQVcsSUFBSSxLQUFLLE1BQU0sUUFBUSxJQUFJO0FBQ3hGLFFBQU0sZ0JBQWdCLHNCQUFzQixRQUFRLFNBQVM7QUFFN0QsU0FBTztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sVUFBVTtBQUFBLElBQ1YsaUJBQWlCLHNCQUFzQixRQUFRLFFBQVE7QUFBQSxJQUN2RCxlQUFlLHNCQUFzQixRQUFRLE1BQU07QUFBQSxJQUNuRCxXQUFXO0FBQUEsSUFDWCxRQUFRO0FBQUEsSUFDUixRQUFRLFFBQVEsaUJBQWlCLEtBQUssU0FBWSxRQUFRO0FBQUEsSUFDMUQsY0FBYyxzQkFBc0IsUUFBUSxZQUFZO0FBQUEsSUFDeEQsV0FBVyxRQUFRLG9CQUFvQixLQUFLLFNBQVksUUFBUTtBQUFBLElBQ2hFLGVBQWUsMkJBQTJCLFFBQVEsbUJBQW1CO0FBQUEsRUFDdkU7QUFDRjsiLAogICJuYW1lcyI6IFsiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9qc3hfcnVudGltZSJdCn0K
