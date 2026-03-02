import {
  ActionButton_default,
  HistoryManualDatePicker_default
} from "./chunk-K3YT7KGG.js";
import {
  DEFAULT_EXPENSE_STATUS_FILTER
} from "./chunk-T6LHHTEC.js";
import {
  classNames,
  indT
} from "./chunk-TAYDLPRE.js";
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
  buildExpenseListPayload,
  buildExpenseSheetSuggestPayload,
  buildExpenseTicketListPayload
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VEYXRlUmFuZ2VGaWx0ZXIudHN4IiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdXRpbHMvZXhwZW5zZURhdGVSYW5nZVV0aWxzLnRzIiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlRmlsdGVyQWN0aW9ucy50c3giLCAiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy91dGlscy9leHBlbnNlUGF5bG9hZEJ1aWxkZXJzLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgSGlzdG9yeU1hbnVhbERhdGVQaWNrZXIsIHtcbiAgSGlzdG9yeU1hbnVhbERheUNlbGwsXG59IGZyb20gXCIuLi8uLi92aXNpdGFzL2hpc3RvcmlhbC9IaXN0b3J5TWFudWFsRGF0ZVBpY2tlci50c3hcIjtcbmltcG9ydCB7XG4gIGJ1aWxkQ2FsZW5kYXJNb250aCxcbiAgYnVpbGREYXRlUmFuZ2VEYXlDZWxscyxcbiAgZm9jdXNEYXRlUmFuZ2VTZWN0aW9uLFxuICBmb3JtYXREYXRlUmFuZ2VEaXNwbGF5LFxuICBpc0JlZm9yZURheSxcbiAgcGFyc2VJc29EYXRlUmFuZ2VWYWx1ZSxcbiAgcmVzb2x2ZVVpTG9jYWxlLFxuICB0b0lzb0RhdGVSYW5nZVZhbHVlLFxuICB0b1NlbnRlbmNlQ2FzZSxcbn0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VEYXRlUmFuZ2VVdGlscy50c1wiO1xuXG50eXBlIEV4cGVuc2VEYXRlUmFuZ2VGaWx0ZXJQcm9wcyA9IHtcbiAgZnJvbURhdGU6IHN0cmluZztcbiAgdG9EYXRlOiBzdHJpbmc7XG4gIG9uQ2hhbmdlOiAoZnJvbURhdGU6IHN0cmluZywgdG9EYXRlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uUmFuZ2VDb21wbGV0ZT86IChmcm9tRGF0ZTogc3RyaW5nLCB0b0RhdGU6IHN0cmluZykgPT4gdm9pZDtcbiAgYXV0b09wZW5SZXF1ZXN0SWQ/OiBudW1iZXI7XG4gIHNob3dNYW51YWxFcnJvcj86IGJvb2xlYW47XG4gIHNob3dTdGFydEVycm9yPzogYm9vbGVhbjtcbiAgc2hvd0VuZEVycm9yPzogYm9vbGVhbjtcbn07XG5cbi8vIFNoYXJlZCBkYXRlIHJhbmdlIHBpY2tlciBmb3IgZXhwZW5zZSBmaWx0ZXJzIGJhc2VkIG9uIHRoZSBoaXN0b3J5IGRhdGUgY29tcG9uZW50LlxuY29uc3QgRXhwZW5zZURhdGVSYW5nZUZpbHRlciA9ICh7XG4gIGZyb21EYXRlLFxuICB0b0RhdGUsXG4gIG9uQ2hhbmdlLFxuICBvblJhbmdlQ29tcGxldGUsXG4gIGF1dG9PcGVuUmVxdWVzdElkID0gMCxcbiAgc2hvd01hbnVhbEVycm9yID0gZmFsc2UsXG4gIHNob3dTdGFydEVycm9yID0gZmFsc2UsXG4gIHNob3dFbmRFcnJvciA9IGZhbHNlLFxufTogRXhwZW5zZURhdGVSYW5nZUZpbHRlclByb3BzKSA9PiB7XG4gIGNvbnN0IGxvY2FsZSA9IHVzZU1lbW8oKCkgPT4gcmVzb2x2ZVVpTG9jYWxlKCksIFtdKTtcbiAgY29uc3QgYWN0aXZhdG9yUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IHBvcG92ZXJSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcblxuICBjb25zdCBbc3RhcnREYXRlLCBzZXRTdGFydERhdGVdID0gdXNlU3RhdGU8RGF0ZSB8IG51bGw+KCgpID0+IHBhcnNlSXNvRGF0ZVJhbmdlVmFsdWUoZnJvbURhdGUpKTtcbiAgY29uc3QgW2VuZERhdGUsIHNldEVuZERhdGVdID0gdXNlU3RhdGU8RGF0ZSB8IG51bGw+KCgpID0+IHBhcnNlSXNvRGF0ZVJhbmdlVmFsdWUodG9EYXRlKSk7XG4gIGNvbnN0IFtob3ZlckRhdGUsIHNldEhvdmVyRGF0ZV0gPSB1c2VTdGF0ZTxEYXRlIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtzZWxlY3RpbmdTdGVwLCBzZXRTZWxlY3RpbmdTdGVwXSA9IHVzZVN0YXRlPFwic3RhcnRcIiB8IFwiZW5kXCIgfCBcImRvbmVcIj4oXCJzdGFydFwiKTtcbiAgY29uc3QgW2lzT3Blbiwgc2V0SXNPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICBjb25zdCBub3cgPSB1c2VNZW1vKCgpID0+IG5ldyBEYXRlKCksIFtdKTtcbiAgY29uc3QgW2N1cnJlbnRNb250aCwgc2V0Q3VycmVudE1vbnRoXSA9IHVzZVN0YXRlKChwYXJzZUlzb0RhdGVSYW5nZVZhbHVlKGZyb21EYXRlKSB8fCBub3cpLmdldE1vbnRoKCkpO1xuICBjb25zdCBbY3VycmVudFllYXIsIHNldEN1cnJlbnRZZWFyXSA9IHVzZVN0YXRlKChwYXJzZUlzb0RhdGVSYW5nZVZhbHVlKGZyb21EYXRlKSB8fCBub3cpLmdldEZ1bGxZZWFyKCkpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc2V0U3RhcnREYXRlKHBhcnNlSXNvRGF0ZVJhbmdlVmFsdWUoZnJvbURhdGUpKTtcbiAgfSwgW2Zyb21EYXRlXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBzZXRFbmREYXRlKHBhcnNlSXNvRGF0ZVJhbmdlVmFsdWUodG9EYXRlKSk7XG4gIH0sIFt0b0RhdGVdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIG9uQ2hhbmdlKHN0YXJ0RGF0ZSA/IHRvSXNvRGF0ZVJhbmdlVmFsdWUoc3RhcnREYXRlKSA6IFwiXCIsIGVuZERhdGUgPyB0b0lzb0RhdGVSYW5nZVZhbHVlKGVuZERhdGUpIDogXCJcIik7XG4gIH0sIFtzdGFydERhdGUsIGVuZERhdGUsIG9uQ2hhbmdlXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWlzT3BlbikgcmV0dXJuO1xuXG4gICAgY29uc3QgaGFuZGxlT3V0c2lkZSA9IChldmVudDogTW91c2VFdmVudCkgPT4ge1xuICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0IGFzIE5vZGUgfCBudWxsO1xuICAgICAgaWYgKCF0YXJnZXQpIHJldHVybjtcbiAgICAgIGlmIChwb3BvdmVyUmVmLmN1cnJlbnQ/LmNvbnRhaW5zKHRhcmdldCkpIHJldHVybjtcbiAgICAgIGlmIChhY3RpdmF0b3JSZWYuY3VycmVudD8uY29udGFpbnModGFyZ2V0KSkgcmV0dXJuO1xuICAgICAgc2V0SXNPcGVuKGZhbHNlKTtcbiAgICAgIHNldEhvdmVyRGF0ZShudWxsKTtcbiAgICB9O1xuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBoYW5kbGVPdXRzaWRlKTtcbiAgICByZXR1cm4gKCkgPT4gZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBoYW5kbGVPdXRzaWRlKTtcbiAgfSwgW2lzT3Blbl0pO1xuXG4gIGNvbnN0IG9wZW5Qb3BvdmVyID0gdXNlQ2FsbGJhY2soXG4gICAgKHNlY3Rpb246IFwic3RhcnRcIiB8IFwiZW5kXCIpID0+IHtcbiAgICAgIHNldFNlbGVjdGluZ1N0ZXAoc2VjdGlvbik7XG4gICAgICBzZXRJc09wZW4odHJ1ZSk7XG4gICAgICBzZXRIb3ZlckRhdGUobnVsbCk7XG5cbiAgICAgIGNvbnN0IGJhc2UgPSBzZWN0aW9uID09PSBcInN0YXJ0XCIgPyBzdGFydERhdGUgfHwgZW5kRGF0ZSB8fCBub3cgOiBlbmREYXRlIHx8IHN0YXJ0RGF0ZSB8fCBub3c7XG4gICAgICBzZXRDdXJyZW50TW9udGgoYmFzZS5nZXRNb250aCgpKTtcbiAgICAgIHNldEN1cnJlbnRZZWFyKGJhc2UuZ2V0RnVsbFllYXIoKSk7XG4gICAgfSxcbiAgICBbZW5kRGF0ZSwgbm93LCBzdGFydERhdGVdXG4gICk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoYXV0b09wZW5SZXF1ZXN0SWQgPD0gMCkgcmV0dXJuO1xuICAgIHNldFNlbGVjdGluZ1N0ZXAoXCJzdGFydFwiKTtcbiAgICBzZXRJc09wZW4odHJ1ZSk7XG4gICAgc2V0SG92ZXJEYXRlKG51bGwpO1xuICAgIGNvbnN0IGJhc2UgPSBzdGFydERhdGUgfHwgZW5kRGF0ZSB8fCBub3c7XG4gICAgc2V0Q3VycmVudE1vbnRoKGJhc2UuZ2V0TW9udGgoKSk7XG4gICAgc2V0Q3VycmVudFllYXIoYmFzZS5nZXRGdWxsWWVhcigpKTtcbiAgfSwgW2F1dG9PcGVuUmVxdWVzdElkXSk7XG5cbiAgY29uc3Qgb25BY3RpdmF0b3JLZXlEb3duID0gdXNlQ2FsbGJhY2soXG4gICAgKGV2ZW50OiBSZWFjdC5LZXlib2FyZEV2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4ge1xuICAgICAgaWYgKGV2ZW50LmtleSAhPT0gXCJFbnRlclwiICYmIGV2ZW50LmtleSAhPT0gXCIgXCIpIHJldHVybjtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBvcGVuUG9wb3ZlcihcInN0YXJ0XCIpO1xuICAgIH0sXG4gICAgW29wZW5Qb3BvdmVyXVxuICApO1xuXG4gIGNvbnN0IG9uU2VjdGlvbktleURvd24gPSB1c2VDYWxsYmFjayhcbiAgICAoZXZlbnQ6IFJlYWN0LktleWJvYXJkRXZlbnQ8SFRNTERpdkVsZW1lbnQ+LCBzZWN0aW9uOiBcInN0YXJ0XCIgfCBcImVuZFwiKSA9PiB7XG4gICAgICBpZiAoZXZlbnQua2V5ICE9PSBcIkVudGVyXCIgJiYgZXZlbnQua2V5ICE9PSBcIiBcIikgcmV0dXJuO1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIG9wZW5Qb3BvdmVyKHNlY3Rpb24pO1xuICAgIH0sXG4gICAgW29wZW5Qb3BvdmVyXVxuICApO1xuXG4gIGNvbnN0IG9uQ2xlYXIgPSB1c2VDYWxsYmFjaygoZXZlbnQ6IFJlYWN0Lk1vdXNlRXZlbnQpID0+IHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHNldFN0YXJ0RGF0ZShudWxsKTtcbiAgICBzZXRFbmREYXRlKG51bGwpO1xuICAgIHNldEhvdmVyRGF0ZShudWxsKTtcbiAgICBzZXRTZWxlY3RpbmdTdGVwKFwic3RhcnRcIik7XG4gIH0sIFtdKTtcblxuICBjb25zdCBvblByZXZNb250aCA9IHVzZUNhbGxiYWNrKChldmVudDogUmVhY3QuTW91c2VFdmVudDxIVE1MQnV0dG9uRWxlbWVudD4pID0+IHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBzZXRDdXJyZW50TW9udGgoKHByZXZpb3VzKSA9PiB7XG4gICAgICBjb25zdCBuZXh0ID0gcHJldmlvdXMgLSAxO1xuICAgICAgaWYgKG5leHQgPCAwKSB7XG4gICAgICAgIHNldEN1cnJlbnRZZWFyKCh5ZWFyKSA9PiB5ZWFyIC0gMSk7XG4gICAgICAgIHJldHVybiAxMTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXh0O1xuICAgIH0pO1xuICB9LCBbXSk7XG5cbiAgY29uc3Qgb25OZXh0TW9udGggPSB1c2VDYWxsYmFjaygoZXZlbnQ6IFJlYWN0Lk1vdXNlRXZlbnQ8SFRNTEJ1dHRvbkVsZW1lbnQ+KSA9PiB7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgc2V0Q3VycmVudE1vbnRoKChwcmV2aW91cykgPT4ge1xuICAgICAgY29uc3QgbmV4dCA9IHByZXZpb3VzICsgMTtcbiAgICAgIGlmIChuZXh0ID4gMTEpIHtcbiAgICAgICAgc2V0Q3VycmVudFllYXIoKHllYXIpID0+IHllYXIgKyAxKTtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV4dDtcbiAgICB9KTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IG9uRGF5Q2xpY2sgPSB1c2VDYWxsYmFjayhcbiAgICAoZGF5OiBIaXN0b3J5TWFudWFsRGF5Q2VsbCkgPT4ge1xuICAgICAgaWYgKCFkYXkuZGF0ZSB8fCBkYXkuZGlzYWJsZWQpIHJldHVybjtcblxuICAgICAgY29uc3QgbmV4dERhdGUgPSBuZXcgRGF0ZShkYXkuZGF0ZS5nZXRGdWxsWWVhcigpLCBkYXkuZGF0ZS5nZXRNb250aCgpLCBkYXkuZGF0ZS5nZXREYXRlKCkpO1xuXG4gICAgICBpZiAoIXN0YXJ0RGF0ZSB8fCBzZWxlY3RpbmdTdGVwID09PSBcInN0YXJ0XCIpIHtcbiAgICAgICAgc2V0U3RhcnREYXRlKG5leHREYXRlKTtcbiAgICAgICAgaWYgKGVuZERhdGUgJiYgaXNCZWZvcmVEYXkoZW5kRGF0ZSwgbmV4dERhdGUpKSB7XG4gICAgICAgICAgc2V0RW5kRGF0ZShudWxsKTtcbiAgICAgICAgfVxuICAgICAgICBzZXRTZWxlY3RpbmdTdGVwKFwiZW5kXCIpO1xuICAgICAgICBzZXRDdXJyZW50TW9udGgobmV4dERhdGUuZ2V0TW9udGgoKSk7XG4gICAgICAgIHNldEN1cnJlbnRZZWFyKG5leHREYXRlLmdldEZ1bGxZZWFyKCkpO1xuICAgICAgICBmb2N1c0RhdGVSYW5nZVNlY3Rpb24oYWN0aXZhdG9yUmVmLmN1cnJlbnQsIFwiZW5kXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChzZWxlY3RpbmdTdGVwID09PSBcImVuZFwiKSB7XG4gICAgICAgIGxldCBmaW5hbFN0YXJ0ID0gc3RhcnREYXRlO1xuICAgICAgICBsZXQgZmluYWxFbmQgPSBuZXh0RGF0ZTtcblxuICAgICAgICBpZiAoaXNCZWZvcmVEYXkobmV4dERhdGUsIHN0YXJ0RGF0ZSkpIHtcbiAgICAgICAgICBmaW5hbFN0YXJ0ID0gbmV4dERhdGU7XG4gICAgICAgICAgZmluYWxFbmQgPSBzdGFydERhdGU7XG4gICAgICAgICAgc2V0RW5kRGF0ZShmaW5hbEVuZCk7XG4gICAgICAgICAgc2V0U3RhcnREYXRlKGZpbmFsU3RhcnQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNldEVuZERhdGUoZmluYWxFbmQpO1xuICAgICAgICB9XG5cbiAgICAgICAgb25SYW5nZUNvbXBsZXRlPy4odG9Jc29EYXRlUmFuZ2VWYWx1ZShmaW5hbFN0YXJ0KSwgdG9Jc29EYXRlUmFuZ2VWYWx1ZShmaW5hbEVuZCkpO1xuICAgICAgICBzZXRTZWxlY3RpbmdTdGVwKFwiZG9uZVwiKTtcbiAgICAgICAgc2V0SXNPcGVuKGZhbHNlKTtcbiAgICAgICAgc2V0SG92ZXJEYXRlKG51bGwpO1xuICAgICAgfVxuICAgIH0sXG4gICAgW2VuZERhdGUsIG9uUmFuZ2VDb21wbGV0ZSwgc2VsZWN0aW5nU3RlcCwgc3RhcnREYXRlXVxuICApO1xuXG4gIGNvbnN0IG9uRGF5SG92ZXIgPSB1c2VDYWxsYmFjayhcbiAgICAoZGF5OiBIaXN0b3J5TWFudWFsRGF5Q2VsbCkgPT4ge1xuICAgICAgaWYgKCFkYXkuZGF0ZSB8fCBzZWxlY3RpbmdTdGVwICE9PSBcImVuZFwiIHx8ICFzdGFydERhdGUpIHJldHVybjtcbiAgICAgIHNldEhvdmVyRGF0ZShuZXcgRGF0ZShkYXkuZGF0ZS5nZXRGdWxsWWVhcigpLCBkYXkuZGF0ZS5nZXRNb250aCgpLCBkYXkuZGF0ZS5nZXREYXRlKCkpKTtcbiAgICB9LFxuICAgIFtzZWxlY3RpbmdTdGVwLCBzdGFydERhdGVdXG4gICk7XG5cbiAgY29uc3Qgb25HcmlkTW91c2VMZWF2ZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBzZXRIb3ZlckRhdGUobnVsbCk7XG4gIH0sIFtdKTtcblxuICBjb25zdCBjYWxlbmRhciA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIHJldHVybiBidWlsZENhbGVuZGFyTW9udGgoY3VycmVudFllYXIsIGN1cnJlbnRNb250aCwgbG9jYWxlKTtcbiAgfSwgW2N1cnJlbnRNb250aCwgY3VycmVudFllYXIsIGxvY2FsZV0pO1xuXG4gIGNvbnN0IGRheUNlbGxzID0gdXNlTWVtbyhcbiAgICAoKSA9PiBidWlsZERhdGVSYW5nZURheUNlbGxzKGNhbGVuZGFyLmNlbGxzLCBzdGFydERhdGUsIGVuZERhdGUsIGhvdmVyRGF0ZSwgc2VsZWN0aW5nU3RlcCksXG4gICAgW2NhbGVuZGFyLmNlbGxzLCBlbmREYXRlLCBob3ZlckRhdGUsIHNlbGVjdGluZ1N0ZXAsIHN0YXJ0RGF0ZV1cbiAgKTtcblxuICBjb25zdCBsYWJlbEZyb20gPSB0b1NlbnRlbmNlQ2FzZShpbmRUKFwiSGlzdG9yeV9Gcm9tXCIsIFwiRnJvbVwiKSwgbG9jYWxlKTtcbiAgY29uc3QgbGFiZWxUbyA9IHRvU2VudGVuY2VDYXNlKGluZFQoXCJIaXN0b3J5X1RvXCIsIFwiVG9cIiksIGxvY2FsZSk7XG5cbiAgcmV0dXJuIChcbiAgICA8SGlzdG9yeU1hbnVhbERhdGVQaWNrZXJcbiAgICAgIGFjdGl2YXRvclJlZj17YWN0aXZhdG9yUmVmfVxuICAgICAgcG9wb3ZlclJlZj17cG9wb3ZlclJlZn1cbiAgICAgIHNob3dNYW51YWxFcnJvcj17c2hvd01hbnVhbEVycm9yfVxuICAgICAgc2hvd1N0YXJ0RXJyb3I9e3Nob3dTdGFydEVycm9yfVxuICAgICAgc2hvd0VuZEVycm9yPXtzaG93RW5kRXJyb3J9XG4gICAgICBmaWx0ZXJUaXRsZT17aW5kVChcIkhpc3RvcnlfRmlsdGVyX0RhdGVcIiwgXCJEYXRlXCIpfVxuICAgICAgaXNPcGVuPXtpc09wZW59XG4gICAgICBzZWxlY3RpbmdTdGVwPXtzZWxlY3RpbmdTdGVwfVxuICAgICAgbGFiZWxGcm9tPXtsYWJlbEZyb219XG4gICAgICBsYWJlbFRvPXtsYWJlbFRvfVxuICAgICAgc3RhcnREYXRlVGV4dD17c3RhcnREYXRlID8gZm9ybWF0RGF0ZVJhbmdlRGlzcGxheShzdGFydERhdGUsIGxvY2FsZSkgOiBpbmRUKFwiSGlzdG9yeV9BZGREYXRlXCIsIFwiQWRkIGRhdGVcIil9XG4gICAgICBlbmREYXRlVGV4dD17ZW5kRGF0ZSA/IGZvcm1hdERhdGVSYW5nZURpc3BsYXkoZW5kRGF0ZSwgbG9jYWxlKSA6IGluZFQoXCJIaXN0b3J5X0FkZERhdGVcIiwgXCJBZGQgZGF0ZVwiKX1cbiAgICAgIGNsZWFyUmFuZ2VMYWJlbD17aW5kVChcIkhpc3RvcnlfQ2xlYXJSYW5nZVwiLCBcIkNsZWFyIHJhbmdlXCIpfVxuICAgICAgaGFzU2VsZWN0ZWRSYW5nZT17ISFzdGFydERhdGUgfHwgISFlbmREYXRlfVxuICAgICAgbW9udGhMYWJlbD17Y2FsZW5kYXIubW9udGhMYWJlbH1cbiAgICAgIHdlZWtEYXlMYWJlbHM9e1tcbiAgICAgICAgaW5kVChcIkhpc3RvcnlfRGF5X01vblwiLCBcIk1vblwiKSxcbiAgICAgICAgaW5kVChcIkhpc3RvcnlfRGF5X1R1ZVwiLCBcIlR1ZVwiKSxcbiAgICAgICAgaW5kVChcIkhpc3RvcnlfRGF5X1dlZFwiLCBcIldlZFwiKSxcbiAgICAgICAgaW5kVChcIkhpc3RvcnlfRGF5X1RodVwiLCBcIlRodVwiKSxcbiAgICAgICAgaW5kVChcIkhpc3RvcnlfRGF5X0ZyaVwiLCBcIkZyaVwiKSxcbiAgICAgICAgaW5kVChcIkhpc3RvcnlfRGF5X1NhdFwiLCBcIlNhdFwiKSxcbiAgICAgICAgaW5kVChcIkhpc3RvcnlfRGF5X1N1blwiLCBcIlN1blwiKSxcbiAgICAgIF19XG4gICAgICBzdGF0dXNUZXh0PXtcbiAgICAgICAgc2VsZWN0aW5nU3RlcCA9PT0gXCJzdGFydFwiXG4gICAgICAgICAgPyBpbmRUKFwiSGlzdG9yeV9TdGF0dXNfU2VsZWN0U3RhcnRcIiwgXCJTZWxlY3Qgc3RhcnQgZGF0ZVwiKVxuICAgICAgICAgIDogaW5kVChcIkhpc3RvcnlfU3RhdHVzX1NlbGVjdEVuZFwiLCBcIlNlbGVjdCBlbmQgZGF0ZVwiKVxuICAgICAgfVxuICAgICAgZGF5Q2VsbHM9e2RheUNlbGxzfVxuICAgICAgcHJldk1vbnRoTGFiZWw9e2luZFQoXCJIaXN0b3J5X1ByZXZNb250aFwiLCBcIlByZXZpb3VzIG1vbnRoXCIpfVxuICAgICAgbmV4dE1vbnRoTGFiZWw9e2luZFQoXCJIaXN0b3J5X05leHRNb250aFwiLCBcIk5leHQgbW9udGhcIil9XG4gICAgICBvbk9wZW5Qb3BvdmVyPXtvcGVuUG9wb3Zlcn1cbiAgICAgIG9uQWN0aXZhdG9yS2V5RG93bj17b25BY3RpdmF0b3JLZXlEb3dufVxuICAgICAgb25TZWN0aW9uS2V5RG93bj17b25TZWN0aW9uS2V5RG93bn1cbiAgICAgIG9uQ2xlYXI9e29uQ2xlYXJ9XG4gICAgICBvblByZXZNb250aD17b25QcmV2TW9udGh9XG4gICAgICBvbk5leHRNb250aD17b25OZXh0TW9udGh9XG4gICAgICBvbkdyaWRNb3VzZUxlYXZlPXtvbkdyaWRNb3VzZUxlYXZlfVxuICAgICAgb25EYXlDbGljaz17b25EYXlDbGlja31cbiAgICAgIG9uRGF5SG92ZXI9e29uRGF5SG92ZXJ9XG4gICAgLz5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VEYXRlUmFuZ2VGaWx0ZXI7XG4iLCAiaW1wb3J0IHsgY2xhc3NOYW1lcyB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9jbGFzc05hbWVzLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEhpc3RvcnlNYW51YWxEYXlDZWxsIH0gZnJvbSBcIi4uLy4uL3Zpc2l0YXMvaGlzdG9yaWFsL0hpc3RvcnlNYW51YWxEYXRlUGlja2VyLnRzeFwiO1xuXG5leHBvcnQgdHlwZSBDYWxlbmRhckNlbGwgPSB7XG4gIGRhdGU6IERhdGUgfCBudWxsO1xuICBpc286IHN0cmluZztcbiAgaXNFbXB0eTogYm9vbGVhbjtcbn07XG5cbmNvbnN0IHBhZCA9ICh2YWx1ZTogbnVtYmVyKTogc3RyaW5nID0+IHZhbHVlLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgXCIwXCIpO1xuXG5leHBvcnQgY29uc3QgdG9Jc29EYXRlUmFuZ2VWYWx1ZSA9IChkYXRlOiBEYXRlKTogc3RyaW5nID0+IHtcbiAgcmV0dXJuIGAke2RhdGUuZ2V0RnVsbFllYXIoKX0tJHtwYWQoZGF0ZS5nZXRNb250aCgpICsgMSl9LSR7cGFkKGRhdGUuZ2V0RGF0ZSgpKX1gO1xufTtcblxuZXhwb3J0IGNvbnN0IHBhcnNlSXNvRGF0ZVJhbmdlVmFsdWUgPSAodmFsdWU6IHN0cmluZyk6IERhdGUgfCBudWxsID0+IHtcbiAgaWYgKCF2YWx1ZSkgcmV0dXJuIG51bGw7XG4gIGNvbnN0IHRyaW1tZWQgPSBTdHJpbmcodmFsdWUpLnRyaW0oKTtcbiAgaWYgKCF0cmltbWVkKSByZXR1cm4gbnVsbDtcblxuICBjb25zdCBkYXRlUGFydCA9IHRyaW1tZWQuc3BsaXQoXCJUXCIpWzBdLnNwbGl0KFwiIFwiKVswXTtcbiAgaWYgKCEvXlxcZHs0fS1cXGR7Mn0tXFxkezJ9JC8udGVzdChkYXRlUGFydCkpIHJldHVybiBudWxsO1xuXG4gIGNvbnN0IFt5ZWFyLCBtb250aCwgZGF5XSA9IGRhdGVQYXJ0LnNwbGl0KFwiLVwiKS5tYXAoTnVtYmVyKTtcbiAgcmV0dXJuIG5ldyBEYXRlKHllYXIsIG1vbnRoIC0gMSwgZGF5KTtcbn07XG5cbmV4cG9ydCBjb25zdCBpc1NhbWVEYXkgPSAoYTogRGF0ZSB8IG51bGwsIGI6IERhdGUgfCBudWxsKTogYm9vbGVhbiA9PiB7XG4gIHJldHVybiAhIShhICYmIGIgJiYgYS5nZXRUaW1lKCkgPT09IGIuZ2V0VGltZSgpKTtcbn07XG5cbmV4cG9ydCBjb25zdCBpc0JlZm9yZURheSA9IChhOiBEYXRlIHwgbnVsbCwgYjogRGF0ZSB8IG51bGwpOiBib29sZWFuID0+IHtcbiAgcmV0dXJuICEhKGEgJiYgYiAmJiBhLmdldFRpbWUoKSA8IGIuZ2V0VGltZSgpKTtcbn07XG5cbmV4cG9ydCBjb25zdCBmb2N1c0RhdGVSYW5nZVNlY3Rpb24gPSAoY29udGFpbmVyOiBIVE1MRGl2RWxlbWVudCB8IG51bGwsIHNlY3Rpb246IFwic3RhcnRcIiB8IFwiZW5kXCIpOiB2b2lkID0+IHtcbiAgaWYgKCFjb250YWluZXIpIHJldHVybjtcbiAgY29uc3QgdGFyZ2V0ID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQ+KGBbZGF0YS1zZWN0aW9uPVwiJHtzZWN0aW9ufVwiXWApO1xuICBpZiAoIXRhcmdldCkgcmV0dXJuO1xuICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHRhcmdldC5mb2N1cygpKTtcbn07XG5cbmNvbnN0IHRvVGl0bGVDYXNlID0gKHZhbHVlOiBzdHJpbmcsIGxvY2FsZTogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgaWYgKCF2YWx1ZSkgcmV0dXJuIFwiXCI7XG4gIGNvbnN0IGxvd2VyID0gdmFsdWUudG9Mb2NhbGVMb3dlckNhc2UobG9jYWxlKTtcbiAgcmV0dXJuIGxvd2VyWzBdLnRvTG9jYWxlVXBwZXJDYXNlKGxvY2FsZSkgKyBsb3dlci5zbGljZSgxKTtcbn07XG5cbmV4cG9ydCBjb25zdCB0b1NlbnRlbmNlQ2FzZSA9ICh2YWx1ZTogc3RyaW5nLCBsb2NhbGU6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGlmICghdmFsdWUpIHJldHVybiBcIlwiO1xuICBjb25zdCB0cmltbWVkID0gdmFsdWUudHJpbSgpO1xuICBpZiAoIXRyaW1tZWQpIHJldHVybiB0cmltbWVkO1xuICBjb25zdCBsb3dlciA9IHRyaW1tZWQudG9Mb2NhbGVMb3dlckNhc2UobG9jYWxlKTtcbiAgcmV0dXJuIGxvd2VyWzBdLnRvTG9jYWxlVXBwZXJDYXNlKGxvY2FsZSkgKyBsb3dlci5zbGljZSgxKTtcbn07XG5cbmV4cG9ydCBjb25zdCBmb3JtYXREYXRlUmFuZ2VEaXNwbGF5ID0gKGRhdGU6IERhdGUsIGxvY2FsZTogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgcmV0dXJuIGRhdGVcbiAgICAudG9Mb2NhbGVEYXRlU3RyaW5nKGxvY2FsZSwge1xuICAgICAgZGF5OiBcIm51bWVyaWNcIixcbiAgICAgIG1vbnRoOiBcInNob3J0XCIsXG4gICAgICB5ZWFyOiBcIm51bWVyaWNcIixcbiAgICB9KVxuICAgIC5yZXBsYWNlKC9cXC4vZywgXCJcIilcbiAgICAudG9Mb3dlckNhc2UoKTtcbn07XG5cbmV4cG9ydCBjb25zdCBmb3JtYXRNb250aExhYmVsID0gKGRhdGU6IERhdGUsIGxvY2FsZTogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgY29uc3QgbW9udGhOYW1lID0gZGF0ZS50b0xvY2FsZURhdGVTdHJpbmcobG9jYWxlLCB7IG1vbnRoOiBcImxvbmdcIiB9KTtcbiAgcmV0dXJuIGAke3RvVGl0bGVDYXNlKG1vbnRoTmFtZSwgbG9jYWxlKX0gJHtkYXRlLmdldEZ1bGxZZWFyKCl9YDtcbn07XG5cbmV4cG9ydCBjb25zdCByZXNvbHZlVWlMb2NhbGUgPSAoKTogc3RyaW5nID0+IHtcbiAgY29uc3QgZnJvbUh0bWwgPSB0eXBlb2YgZG9jdW1lbnQgIT09IFwidW5kZWZpbmVkXCIgPyBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQubGFuZyA6IFwiXCI7XG4gIHJldHVybiBmcm9tSHRtbCAmJiBTdHJpbmcoZnJvbUh0bWwpLnRyaW0oKSA/IGZyb21IdG1sIDogXCJlcy1FU1wiO1xufTtcblxuZXhwb3J0IGNvbnN0IGJ1aWxkQ2FsZW5kYXJNb250aCA9ICh5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXIsIGxvY2FsZTogc3RyaW5nKTogeyBtb250aExhYmVsOiBzdHJpbmc7IGNlbGxzOiBDYWxlbmRhckNlbGxbXSB9ID0+IHtcbiAgY29uc3QgZmlyc3REYXkgPSBuZXcgRGF0ZSh5ZWFyLCBtb250aCwgMSk7XG4gIGNvbnN0IGRheXNJbk1vbnRoID0gbmV3IERhdGUoeWVhciwgbW9udGggKyAxLCAwKS5nZXREYXRlKCk7XG4gIGNvbnN0IG9mZnNldCA9IChmaXJzdERheS5nZXREYXkoKSArIDYpICUgNztcbiAgY29uc3QgY2VsbHM6IENhbGVuZGFyQ2VsbFtdID0gW107XG5cbiAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IG9mZnNldDsgaW5kZXggKz0gMSkge1xuICAgIGNlbGxzLnB1c2goeyBkYXRlOiBudWxsLCBpc286IFwiXCIsIGlzRW1wdHk6IHRydWUgfSk7XG4gIH1cblxuICBmb3IgKGxldCBkYXkgPSAxOyBkYXkgPD0gZGF5c0luTW9udGg7IGRheSArPSAxKSB7XG4gICAgY29uc3QgZGF0ZU9iaiA9IG5ldyBEYXRlKHllYXIsIG1vbnRoLCBkYXkpO1xuICAgIGNlbGxzLnB1c2goeyBkYXRlOiBkYXRlT2JqLCBpc286IHRvSXNvRGF0ZVJhbmdlVmFsdWUoZGF0ZU9iaiksIGlzRW1wdHk6IGZhbHNlIH0pO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBtb250aExhYmVsOiBmb3JtYXRNb250aExhYmVsKGZpcnN0RGF5LCBsb2NhbGUpLFxuICAgIGNlbGxzLFxuICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IGJ1aWxkRGF0ZVJhbmdlRGF5Q2VsbHMgPSAoXG4gIGNlbGxzOiBDYWxlbmRhckNlbGxbXSxcbiAgc3RhcnREYXRlOiBEYXRlIHwgbnVsbCxcbiAgZW5kRGF0ZTogRGF0ZSB8IG51bGwsXG4gIGhvdmVyRGF0ZTogRGF0ZSB8IG51bGwsXG4gIHNlbGVjdGluZ1N0ZXA6IFwic3RhcnRcIiB8IFwiZW5kXCIgfCBcImRvbmVcIlxuKTogSGlzdG9yeU1hbnVhbERheUNlbGxbXSA9PiB7XG4gIGNvbnN0IHByZXZpZXdFbmQgPSBlbmREYXRlIHx8IChzZWxlY3RpbmdTdGVwID09PSBcImVuZFwiID8gaG92ZXJEYXRlIDogbnVsbCk7XG5cbiAgcmV0dXJuIGNlbGxzLm1hcCgoY2VsbCwgaW5kZXgpID0+IHtcbiAgICBpZiAoY2VsbC5pc0VtcHR5IHx8ICFjZWxsLmRhdGUpIHtcbiAgICAgIHJldHVybiB7IGtleTogYGVtcHR5LSR7aW5kZXh9YCwgaXNFbXB0eTogdHJ1ZSB9O1xuICAgIH1cblxuICAgIGNvbnN0IGRhdGVPYmogPSBjZWxsLmRhdGU7XG4gICAgY29uc3QgaXNTdGFydCA9IGlzU2FtZURheShkYXRlT2JqLCBzdGFydERhdGUpO1xuICAgIGNvbnN0IGlzRW5kID0gaXNTYW1lRGF5KGRhdGVPYmosIGVuZERhdGUpO1xuICAgIGNvbnN0IGluUmFuZ2UgPSBzdGFydERhdGUgJiYgcHJldmlld0VuZCAmJiBpc0JlZm9yZURheShzdGFydERhdGUsIGRhdGVPYmopICYmIGlzQmVmb3JlRGF5KGRhdGVPYmosIHByZXZpZXdFbmQpO1xuICAgIGNvbnN0IGhvdmVyUmFuZ2UgPSBzdGFydERhdGUgJiYgIWVuZERhdGUgJiYgaG92ZXJEYXRlICYmIGlzQmVmb3JlRGF5KHN0YXJ0RGF0ZSwgZGF0ZU9iaikgJiYgaXNCZWZvcmVEYXkoZGF0ZU9iaiwgaG92ZXJEYXRlKTtcbiAgICBjb25zdCBkaXNhYmxlZCA9IHNlbGVjdGluZ1N0ZXAgPT09IFwiZW5kXCIgJiYgISFzdGFydERhdGUgJiYgaXNCZWZvcmVEYXkoZGF0ZU9iaiwgc3RhcnREYXRlKTtcbiAgICBjb25zdCBpc1RvZGF5ID0gaXNTYW1lRGF5KGRhdGVPYmosIG5ldyBEYXRlKCkpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGtleTogY2VsbC5pc28sXG4gICAgICBpc0VtcHR5OiBmYWxzZSxcbiAgICAgIGRhdGU6IGRhdGVPYmosXG4gICAgICBpc286IGNlbGwuaXNvLFxuICAgICAgZGF5TGFiZWw6IGRhdGVPYmouZ2V0RGF0ZSgpLFxuICAgICAgZGF5Q2xhc3M6IGNsYXNzTmFtZXMoXG4gICAgICAgIFwiZHJwLWRheVwiLFxuICAgICAgICBpc1N0YXJ0ID8gXCJzdGFydCByYW5nZS1zdGFydFwiIDogXCJcIixcbiAgICAgICAgaXNFbmQgPyBcImVuZCByYW5nZS1lbmRcIiA6IFwiXCIsXG4gICAgICAgIGluUmFuZ2UgPyBcImluLXJhbmdlXCIgOiBcIlwiLFxuICAgICAgICBob3ZlclJhbmdlID8gXCJob3Zlci1yYW5nZVwiIDogXCJcIixcbiAgICAgICAgZGlzYWJsZWQgPyBcImRpc2FibGVkXCIgOiBcIlwiLFxuICAgICAgICBpc1RvZGF5ID8gXCJ0b2RheVwiIDogXCJcIlxuICAgICAgKSxcbiAgICAgIGRpc2FibGVkLFxuICAgIH07XG4gIH0pO1xufTtcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgQWN0aW9uQnV0dG9uIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvQWN0aW9uQnV0dG9uLnRzeFwiO1xuXG50eXBlIEV4cGVuc2VGaWx0ZXJBY3Rpb25zUHJvcHMgPSB7XG4gIGNsZWFyTGFiZWw6IHN0cmluZztcbiAgYXBwbHlMYWJlbDogc3RyaW5nO1xuICBvbkNsZWFyOiAoKSA9PiB2b2lkO1xuICBvbkFwcGx5OiAoKSA9PiB2b2lkO1xufTtcblxuLy8gU2hhcmVkIGFwcGx5L2NsZWFyIGFjdGlvbiByb3cgZm9yIGV4cGVuc2Ugc2hlZXQgZmlsdGVycy5cbmNvbnN0IEV4cGVuc2VGaWx0ZXJBY3Rpb25zID0gKHtcbiAgY2xlYXJMYWJlbCxcbiAgYXBwbHlMYWJlbCxcbiAgb25DbGVhcixcbiAgb25BcHBseSxcbn06IEV4cGVuc2VGaWx0ZXJBY3Rpb25zUHJvcHMpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTEgZ3JpZCBncmlkLWNvbHMtMiBnYXAtMiBoaXN0b3J5LWZpbHRlci1hY3Rpb25zXCI+XG4gICAgICA8QWN0aW9uQnV0dG9uIGxhYmVsPXtjbGVhckxhYmVsfSBjbGFzc05hbWU9XCJ3LWZ1bGxcIiBvbkNsaWNrPXtvbkNsZWFyfSAvPlxuICAgICAgPEFjdGlvbkJ1dHRvbiBsYWJlbD17YXBwbHlMYWJlbH0gY2xhc3NOYW1lPVwidy1mdWxsXCIgb25DbGljaz17b25BcHBseX0gLz5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VGaWx0ZXJBY3Rpb25zO1xuIiwgImltcG9ydCB0eXBlIHtcbiAgRXhwZW5zZVNoZWV0TGlzdEFwaVJlcXVlc3QsXG4gIEV4cGVuc2VTaGVldExpc3RGaWx0ZXJzLFxuICBFeHBlbnNlU2hlZXRUaWNrZXRMaXN0UmVxdWVzdCxcbn0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xuaW1wb3J0IHsgREVGQVVMVF9FWFBFTlNFX1NUQVRVU19GSUxURVIgfSBmcm9tIFwiLi4vY29uc3RhbnRzL2V4cGVuc2VTdGF0dXNDYXRhbG9nLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QgfSBmcm9tIFwiLi4vdGlja2V0cy9leHBlbnNlVGlja2V0TGlzdFR5cGVzLnRzXCI7XG5cbmNvbnN0IERFRkFVTFRfU1VHR0VTVF9QQUdFX1NJWkUgPSA1MDtcblxuY29uc3QgaXNWYWxpZEV4cGVuc2VTaGVldFN0YXR1cyA9ICh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG51bWJlciA9PiB7XG4gIHJldHVybiBOdW1iZXIuaXNJbnRlZ2VyKHZhbHVlKSAmJiBOdW1iZXIodmFsdWUpID49IDAgJiYgTnVtYmVyKHZhbHVlKSA8PSA0O1xufTtcblxuLy8gUmVzb2x2ZXMgdGhlIG9wdGlvbmFsIEFQSSBzdGF0dXMgZmlsdGVyIGZyb20gVUkgZmlsdGVyIHN0YXRlLlxuY29uc3QgcmVzb2x2ZUV4cGVuc2VTaGVldFN0YXR1cyA9IChzdGF0dXNGaWx0ZXI6IG51bWJlcik6IG51bWJlciB8IHVuZGVmaW5lZCA9PiB7XG4gIGlmIChzdGF0dXNGaWx0ZXIgPT09IERFRkFVTFRfRVhQRU5TRV9TVEFUVVNfRklMVEVSKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIGlmICghaXNWYWxpZEV4cGVuc2VTaGVldFN0YXR1cyhzdGF0dXNGaWx0ZXIpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiZXhwZW5zZVNoZWV0U3RhdHVzIGZpbHRlciBtdXN0IGJlIGFuIGludGVnZXIgYmV0d2VlbiAwIGFuZCA0LlwiKTtcbiAgfVxuXG4gIHJldHVybiBzdGF0dXNGaWx0ZXI7XG59O1xuXG5jb25zdCBub3JtYWxpemVPcHRpb25hbFRleHQgPSAodmFsdWU6IHN0cmluZyB8IHVuZGVmaW5lZCk6IHN0cmluZyB8IHVuZGVmaW5lZCA9PiB7XG4gIGNvbnN0IHRyaW1tZWQgPSBTdHJpbmcodmFsdWUgfHwgXCJcIikudHJpbSgpO1xuICByZXR1cm4gdHJpbW1lZCA/IHRyaW1tZWQgOiB1bmRlZmluZWQ7XG59O1xuXG5jb25zdCByZXNvbHZlUHJvY2Vzc2VkQnlBaUZpbHRlciA9IChcbiAgdmFsdWU6IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3RbXCJwcm9jZXNzZWRCeUlhRmlsdGVyXCJdXG4pOiBib29sZWFuIHwgdW5kZWZpbmVkID0+IHtcbiAgaWYgKHZhbHVlID09PSBcInllc1wiKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBpZiAodmFsdWUgPT09IFwibm9cIikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB1bmRlZmluZWQ7XG59O1xuXG4vLyBCdWlsZCBsaXN0IHBheWxvYWQgZm9yIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvbGlzdCBmcm9tIGN1cnJlbnQgZmlsdGVyIHN0YXRlLlxuZXhwb3J0IGNvbnN0IGJ1aWxkRXhwZW5zZUxpc3RQYXlsb2FkID0gKFxuICBmaWx0ZXJzOiBFeHBlbnNlU2hlZXRMaXN0RmlsdGVycyxcbiAgcGFnZTogbnVtYmVyLFxuICBwYWdlU2l6ZTogbnVtYmVyXG4pOiBFeHBlbnNlU2hlZXRMaXN0QXBpUmVxdWVzdCA9PiB7XG4gIGNvbnN0IG5leHRQYWdlID0gTnVtYmVyLmlzRmluaXRlKHBhZ2UpICYmIHBhZ2UgPiAwID8gcGFnZSA6IDE7XG4gIGNvbnN0IG5leHRQYWdlU2l6ZSA9IE51bWJlci5pc0Zpbml0ZShwYWdlU2l6ZSkgJiYgcGFnZVNpemUgPiAwID8gcGFnZVNpemUgOiBERUZBVUxUX1NVR0dFU1RfUEFHRV9TSVpFO1xuICBjb25zdCBzYWZlRmlsdGVyID0gU3RyaW5nKGZpbHRlcnMuZmlsdGVyIHx8IGZpbHRlcnMuaG9qYUdhc3Rvc0lkIHx8IFwiXCIpLnRyaW0oKTtcblxuICByZXR1cm4ge1xuICAgIGZpbHRlcjogc2FmZUZpbHRlciB8fCBcIlwiLFxuICAgIGJpbGxlZE1vZGU6IDIsXG4gICAgY3JlYXRlZERhdGVGcm9tOiBub3JtYWxpemVPcHRpb25hbFRleHQoZmlsdGVycy5mcm9tRGF0ZSksXG4gICAgY3JlYXRlZERhdGVUbzogbm9ybWFsaXplT3B0aW9uYWxUZXh0KGZpbHRlcnMudG9EYXRlKSxcbiAgICBwcm9qSWQ6IG5vcm1hbGl6ZU9wdGlvbmFsVGV4dChmaWx0ZXJzLnByb2plY3RJZCksXG4gICAgY3VycmVuY3lDb2RlOiBub3JtYWxpemVPcHRpb25hbFRleHQoZmlsdGVycy5jdXJyZW5jeUNvZGUpLFxuICAgIGV4cGVuc2VTaGVldFN0YXR1czogcmVzb2x2ZUV4cGVuc2VTaGVldFN0YXR1cyhmaWx0ZXJzLnN0YXR1c0ZpbHRlciksXG4gICAgcGFnZTogbmV4dFBhZ2UsXG4gICAgcGFnZVNpemU6IG5leHRQYWdlU2l6ZSxcbiAgfTtcbn07XG5cbi8vIEJ1aWxkIHN1Z2dlc3Rpb24gcGF5bG9hZCBmb3IgZXhwZW5zZSBzaGVldCBkcm9wZG93biBzZWFyY2guXG5leHBvcnQgY29uc3QgYnVpbGRFeHBlbnNlU2hlZXRTdWdnZXN0UGF5bG9hZCA9IChcbiAgdGVybTogc3RyaW5nLFxuICBwYWdlU2l6ZSA9IERFRkFVTFRfU1VHR0VTVF9QQUdFX1NJWkUsXG4gIHBhZ2UgPSAxXG4pOiBFeHBlbnNlU2hlZXRMaXN0QXBpUmVxdWVzdCA9PiB7XG4gIGNvbnN0IHNhZmVUZXJtID0gU3RyaW5nKHRlcm0gfHwgXCJcIikudHJpbSgpO1xuICBjb25zdCBuZXh0UGFnZVNpemUgPSBOdW1iZXIuaXNGaW5pdGUocGFnZVNpemUpICYmIHBhZ2VTaXplID4gMCA/IHBhZ2VTaXplIDogREVGQVVMVF9TVUdHRVNUX1BBR0VfU0laRTtcbiAgY29uc3QgbmV4dFBhZ2UgPSBOdW1iZXIuaXNGaW5pdGUocGFnZSkgJiYgcGFnZSA+IDAgPyBNYXRoLmZsb29yKHBhZ2UpIDogMTtcblxuICByZXR1cm4ge1xuICAgIGZpbHRlcjogc2FmZVRlcm0gfHwgXCJcIixcbiAgICBiaWxsZWRNb2RlOiAyLFxuICAgIGNyZWF0ZWREYXRlRnJvbTogdW5kZWZpbmVkLFxuICAgIGNyZWF0ZWREYXRlVG86IHVuZGVmaW5lZCxcbiAgICBwcm9qSWQ6IHVuZGVmaW5lZCxcbiAgICBjdXJyZW5jeUNvZGU6IHVuZGVmaW5lZCxcbiAgICBwYWdlOiBuZXh0UGFnZSxcbiAgICBwYWdlU2l6ZTogbmV4dFBhZ2VTaXplLFxuICB9O1xufTtcblxuLy8gQnVpbGQgbGlzdCBwYXlsb2FkIGZvciAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMvbGlzdCBmcm9tIHRpY2tldCBmaWx0ZXIgc3RhdGUuXG5leHBvcnQgY29uc3QgYnVpbGRFeHBlbnNlVGlja2V0TGlzdFBheWxvYWQgPSAoXG4gIGZpbHRlcnM6IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QsXG4gIHBhZ2U6IG51bWJlcixcbiAgcGFnZVNpemU6IG51bWJlclxuKTogRXhwZW5zZVNoZWV0VGlja2V0TGlzdFJlcXVlc3QgPT4ge1xuICBjb25zdCBuZXh0UGFnZSA9IE51bWJlci5pc0Zpbml0ZShwYWdlKSAmJiBwYWdlID4gMCA/IE1hdGguZmxvb3IocGFnZSkgOiAxO1xuICBjb25zdCBuZXh0UGFnZVNpemUgPSBOdW1iZXIuaXNGaW5pdGUocGFnZVNpemUpICYmIHBhZ2VTaXplID4gMCA/IE1hdGguZmxvb3IocGFnZVNpemUpIDogREVGQVVMVF9TVUdHRVNUX1BBR0VfU0laRTtcbiAgY29uc3Qgc2FmZUZpbHRlcktleSA9IG5vcm1hbGl6ZU9wdGlvbmFsVGV4dChmaWx0ZXJzLmZpbHRlcktleSk7XG5cbiAgcmV0dXJuIHtcbiAgICBwYWdlOiBuZXh0UGFnZSxcbiAgICBwYWdlU2l6ZTogbmV4dFBhZ2VTaXplLFxuICAgIGNyZWF0ZWREYXRlRnJvbTogbm9ybWFsaXplT3B0aW9uYWxUZXh0KGZpbHRlcnMuZnJvbURhdGUpLFxuICAgIGNyZWF0ZWREYXRlVG86IG5vcm1hbGl6ZU9wdGlvbmFsVGV4dChmaWx0ZXJzLnRvRGF0ZSksXG4gICAgc2VhcmNoS2V5OiBzYWZlRmlsdGVyS2V5LFxuICAgIGZpbHRlcjogc2FmZUZpbHRlcktleSxcbiAgICBzdGF0dXM6IGZpbHRlcnMuc3RhdHVzRmlsdGVyID09PSBcIlwiID8gdW5kZWZpbmVkIDogZmlsdGVycy5zdGF0dXNGaWx0ZXIsXG4gICAgY3VycmVuY3lDb2RlOiBub3JtYWxpemVPcHRpb25hbFRleHQoZmlsdGVycy5jdXJyZW5jeUNvZGUpLFxuICAgIGdhc3RvVHlwZTogZmlsdGVycy5nYXN0b1R5cGVGaWx0ZXIgPT09IFwiXCIgPyB1bmRlZmluZWQgOiBmaWx0ZXJzLmdhc3RvVHlwZUZpbHRlcixcbiAgICBwcm9jZXNzZWRCeUFJOiByZXNvbHZlUHJvY2Vzc2VkQnlBaUZpbHRlcihmaWx0ZXJzLnByb2Nlc3NlZEJ5SWFGaWx0ZXIpLFxuICB9O1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbUJBQXlFOzs7QUNTekUsSUFBTSxNQUFNLENBQUMsVUFBMEIsTUFBTSxTQUFTLEVBQUUsU0FBUyxHQUFHLEdBQUc7QUFFaEUsSUFBTSxzQkFBc0IsQ0FBQyxTQUF1QjtBQUN6RCxTQUFPLEdBQUcsS0FBSyxZQUFZLENBQUMsSUFBSSxJQUFJLEtBQUssU0FBUyxJQUFJLENBQUMsQ0FBQyxJQUFJLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQztBQUNqRjtBQUVPLElBQU0seUJBQXlCLENBQUMsVUFBK0I7QUFDcEUsTUFBSSxDQUFDLE1BQU8sUUFBTztBQUNuQixRQUFNLFVBQVUsT0FBTyxLQUFLLEVBQUUsS0FBSztBQUNuQyxNQUFJLENBQUMsUUFBUyxRQUFPO0FBRXJCLFFBQU0sV0FBVyxRQUFRLE1BQU0sR0FBRyxFQUFFLENBQUMsRUFBRSxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQ25ELE1BQUksQ0FBQyxzQkFBc0IsS0FBSyxRQUFRLEVBQUcsUUFBTztBQUVsRCxRQUFNLENBQUMsTUFBTSxPQUFPLEdBQUcsSUFBSSxTQUFTLE1BQU0sR0FBRyxFQUFFLElBQUksTUFBTTtBQUN6RCxTQUFPLElBQUksS0FBSyxNQUFNLFFBQVEsR0FBRyxHQUFHO0FBQ3RDO0FBRU8sSUFBTSxZQUFZLENBQUMsR0FBZ0IsTUFBNEI7QUFDcEUsU0FBTyxD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
