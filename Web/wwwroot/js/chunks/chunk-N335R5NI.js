import {
  ActionButton_default,
  FilterButton_default,
  HistoryManualDatePicker_default
} from "./chunk-7Z3NMBR5.js";
import {
  DEFAULT_EXPENSE_STATUS_FILTER
} from "./chunk-W2YOA3BT.js";
import {
  SelectCombobox_default
} from "./chunk-JR7YV7OS.js";
import {
  classNames,
  indT
} from "./chunk-BYICIYT4.js";
import {
  require_jsx_runtime,
  require_react
} from "./chunk-BWM3JLWG.js";
import {
  ApiFetchError
} from "./chunk-IKHTGBEE.js";
import {
  __toESM
} from "./chunk-45FWCHS2.js";

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

// Web/wwwroot/react/src/pages/gastos/utils/expenseRequestRetry.ts
var ABORT_ERROR_MESSAGE_HINTS = [
  "signal is aborted",
  "aborted without reason",
  "the operation was aborted",
  "the user aborted a request",
  "user aborted a request"
];
var RETRYABLE_ERROR_MESSAGE_HINTS = [
  "failed to fetch",
  "networkerror",
  "network request failed",
  "load failed",
  "timeout",
  "temporarily unavailable"
];
var RETRYABLE_STATUS_CODES = /* @__PURE__ */ new Set([408, 429, 500, 502, 503, 504]);
var DEFAULT_MAX_ATTEMPTS = 2;
var DEFAULT_RETRY_DELAY_MS = 250;
var normalizeErrorText = (value) => {
  return String(value || "").trim().toLowerCase();
};
var isExpenseAbortLikeError = (error, signal) => {
  if (signal?.aborted) return true;
  if (error instanceof DOMException && error.name === "AbortError") return true;
  if (!(error instanceof Error)) return false;
  const normalizedName = normalizeErrorText(error.name);
  const normalizedMessage = normalizeErrorText(error.message);
  if (normalizedName === "aborterror") return true;
  return ABORT_ERROR_MESSAGE_HINTS.some((hint) => normalizedMessage.includes(hint));
};
var isRetryableExpenseReadError = (error, signal) => {
  if (isExpenseAbortLikeError(error, signal)) return false;
  if (error instanceof ApiFetchError) {
    const status = Number(error.status);
    return RETRYABLE_STATUS_CODES.has(status);
  }
  if (error instanceof TypeError) {
    return true;
  }
  if (!(error instanceof Error)) return false;
  const normalizedMessage = normalizeErrorText(error.message);
  return RETRYABLE_ERROR_MESSAGE_HINTS.some((hint) => normalizedMessage.includes(hint));
};
var waitForRetryDelay = async (delayMs, signal) => {
  if (delayMs <= 0) return;
  if (signal?.aborted) {
    throw new DOMException("Aborted", "AbortError");
  }
  await new Promise((resolve, reject) => {
    const timeoutId = window.setTimeout(() => {
      if (signal) {
        signal.removeEventListener("abort", handleAbort);
      }
      resolve();
    }, delayMs);
    const handleAbort = () => {
      window.clearTimeout(timeoutId);
      signal?.removeEventListener("abort", handleAbort);
      reject(new DOMException("Aborted", "AbortError"));
    };
    signal?.addEventListener("abort", handleAbort, { once: true });
  });
};
var runExpenseReadRequestWithRetry = async (request, options) => {
  const maxAttemptsRaw = Number(options?.maxAttempts ?? DEFAULT_MAX_ATTEMPTS);
  const maxAttempts = Number.isFinite(maxAttemptsRaw) && maxAttemptsRaw > 0 ? Math.floor(maxAttemptsRaw) : DEFAULT_MAX_ATTEMPTS;
  const retryDelayRaw = Number(options?.retryDelayMs ?? DEFAULT_RETRY_DELAY_MS);
  const retryDelayMs = Number.isFinite(retryDelayRaw) && retryDelayRaw >= 0 ? retryDelayRaw : DEFAULT_RETRY_DELAY_MS;
  const signal = options?.signal;
  let lastError = null;
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      return await request();
    } catch (error) {
      lastError = error;
      if (!isRetryableExpenseReadError(error, signal) || attempt >= maxAttempts) {
        throw error;
      }
      await waitForRetryDelay(retryDelayMs * attempt, signal);
    }
  }
  throw lastError instanceof Error ? lastError : new Error("Expense read request failed.");
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
  isExpenseAbortLikeError,
  runExpenseReadRequestWithRetry,
  isExpenseHistoryBackForwardNavigation,
  hasExpenseReturnReferrer
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy91dGlscy9leHBlbnNlUGF5bG9hZEJ1aWxkZXJzLnRzIiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdXRpbHMvZXhwZW5zZUhpc3RvcnlOYXZpZ2F0aW9uLnRzIiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlRGF0ZVJhbmdlRmlsdGVyLnRzeCIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3V0aWxzL2V4cGVuc2VEYXRlUmFuZ2VVdGlscy50cyIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbXBvbmVudHMvRXhwZW5zZUZpbHRlckFjdGlvbnMudHN4IiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlTWFuYWdlZFVzZXJGaWx0ZXJTZWxlY3QudHN4IiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlUXVpY2tEYXRlRmlsdGVycy50c3giLCAiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy91dGlscy9leHBlbnNlUmVxdWVzdFJldHJ5LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgdHlwZSB7XG4gIEV4cGVuc2VTaGVldExpc3RBcGlSZXF1ZXN0LFxuICBFeHBlbnNlU2hlZXRUaWNrZXRMaW5rQnVsa0ZpbHRlcnMsXG4gIEV4cGVuc2VTaGVldFRpY2tldExpbmtMaXN0UmVxdWVzdCxcbiAgRXhwZW5zZVNoZWV0TGlzdEZpbHRlcnMsXG4gIEV4cGVuc2VTaGVldFRpY2tldExpc3RSZXF1ZXN0LFxufSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XG5pbXBvcnQgeyBERUZBVUxUX0VYUEVOU0VfU1RBVFVTX0ZJTFRFUiB9IGZyb20gXCIuLi9jb25zdGFudHMvZXhwZW5zZVN0YXR1c0NhdGFsb2cudHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCB9IGZyb20gXCIuLi90aWNrZXRzL2V4cGVuc2VUaWNrZXRMaXN0VHlwZXMudHNcIjtcblxuY29uc3QgREVGQVVMVF9TVUdHRVNUX1BBR0VfU0laRSA9IDUwO1xuY29uc3QgQUxMT1dFRF9USUNLRVRfR0FTVE9fVFlQRVMgPSBuZXcgU2V0PG51bWJlcj4oWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDE0XSk7XG5cbmNvbnN0IGlzVmFsaWRFeHBlbnNlU2hlZXRTdGF0dXMgPSAodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBudW1iZXIgPT4ge1xuICByZXR1cm4gTnVtYmVyLmlzSW50ZWdlcih2YWx1ZSkgJiYgTnVtYmVyKHZhbHVlKSA+PSAwICYmIE51bWJlcih2YWx1ZSkgPD0gNDtcbn07XG5cbi8vIFJlc29sdmVzIHRoZSBvcHRpb25hbCBBUEkgc3RhdHVzIGZpbHRlciBmcm9tIFVJIGZpbHRlciBzdGF0ZS5cbmNvbnN0IHJlc29sdmVFeHBlbnNlU2hlZXRTdGF0dXMgPSAoc3RhdHVzRmlsdGVyOiBudW1iZXIpOiBudW1iZXIgfCBudWxsID0+IHtcbiAgaWYgKHN0YXR1c0ZpbHRlciA9PT0gREVGQVVMVF9FWFBFTlNFX1NUQVRVU19GSUxURVIpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGlmICghaXNWYWxpZEV4cGVuc2VTaGVldFN0YXR1cyhzdGF0dXNGaWx0ZXIpKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZXR1cm4gc3RhdHVzRmlsdGVyO1xufTtcblxuY29uc3Qgbm9ybWFsaXplT3B0aW9uYWxUZXh0ID0gKHZhbHVlOiBzdHJpbmcgfCB1bmRlZmluZWQpOiBzdHJpbmcgfCB1bmRlZmluZWQgPT4ge1xuICBjb25zdCB0cmltbWVkID0gU3RyaW5nKHZhbHVlIHx8IFwiXCIpLnRyaW0oKTtcbiAgcmV0dXJuIHRyaW1tZWQgPyB0cmltbWVkIDogdW5kZWZpbmVkO1xufTtcblxuY29uc3QgcmVzb2x2ZVByb2Nlc3NlZEJ5QWlGaWx0ZXIgPSAoXG4gIHZhbHVlOiBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90W1wicHJvY2Vzc2VkQnlJYUZpbHRlclwiXVxuKTogYm9vbGVhbiB8IG51bGwgPT4ge1xuICBpZiAodmFsdWUgPT09IFwieWVzXCIpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGlmICh2YWx1ZSA9PT0gXCJub1wiKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59O1xuXG5jb25zdCByZXNvbHZlVGlja2V0U3RhdHVzRmlsdGVyID0gKFxuICB2YWx1ZTogRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdFtcInN0YXR1c0ZpbHRlclwiXVxuKTogMCB8IDEgfCBudWxsID0+IHtcbiAgcmV0dXJuIHZhbHVlID09PSAwIHx8IHZhbHVlID09PSAxID8gdmFsdWUgOiBudWxsO1xufTtcblxuY29uc3QgcmVzb2x2ZVRpY2tldEdhc3RvVHlwZUZpbHRlciA9IChcbiAgdmFsdWU6IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3RbXCJnYXN0b1R5cGVGaWx0ZXJcIl1cbik6IEV4cGVuc2VTaGVldFRpY2tldExpc3RSZXF1ZXN0W1wiZ2FzdG9UeXBlXCJdID0+IHtcbiAgaWYgKHZhbHVlID09PSBcIlwiIHx8IHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGNvbnN0IHBhcnNlZCA9IE51bWJlcih2YWx1ZSk7XG4gIGlmICghTnVtYmVyLmlzSW50ZWdlcihwYXJzZWQpIHx8ICFBTExPV0VEX1RJQ0tFVF9HQVNUT19UWVBFUy5oYXMocGFyc2VkKSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcmV0dXJuIHBhcnNlZCBhcyBFeHBlbnNlU2hlZXRUaWNrZXRMaXN0UmVxdWVzdFtcImdhc3RvVHlwZVwiXTtcbn07XG5cbmNvbnN0IGJ1aWxkRXhwZW5zZVRpY2tldEZpbHRlclBheWxvYWQgPSAoXG4gIGZpbHRlcnM6IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3Rcbik6IEV4cGVuc2VTaGVldFRpY2tldExpbmtCdWxrRmlsdGVycyA9PiB7XG4gIGNvbnN0IHNhZmVGaWx0ZXJLZXkgPSBub3JtYWxpemVPcHRpb25hbFRleHQoZmlsdGVycy5maWx0ZXJLZXkpO1xuXG4gIHJldHVybiB7XG4gICAgY3JlYXRlZERhdGVGcm9tOiBub3JtYWxpemVPcHRpb25hbFRleHQoZmlsdGVycy5mcm9tRGF0ZSksXG4gICAgY3JlYXRlZERhdGVUbzogbm9ybWFsaXplT3B0aW9uYWxUZXh0KGZpbHRlcnMudG9EYXRlKSxcbiAgICBzZWFyY2hLZXk6IHNhZmVGaWx0ZXJLZXksXG4gICAgZmlsdGVyOiBzYWZlRmlsdGVyS2V5LFxuICAgIGN1cnJlbmN5Q29kZTogbm9ybWFsaXplT3B0aW9uYWxUZXh0KGZpbHRlcnMuY3VycmVuY3lDb2RlKSxcbiAgICBnYXN0b1R5cGU6IHJlc29sdmVUaWNrZXRHYXN0b1R5cGVGaWx0ZXIoZmlsdGVycy5nYXN0b1R5cGVGaWx0ZXIpLFxuICAgIHByb2Nlc3NlZEJ5QUk6IHJlc29sdmVQcm9jZXNzZWRCeUFpRmlsdGVyKGZpbHRlcnMucHJvY2Vzc2VkQnlJYUZpbHRlciksXG4gIH07XG59O1xuXG4vLyBCdWlsZCBsaXN0IHBheWxvYWQgZm9yIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvbGlzdCBmcm9tIGN1cnJlbnQgZmlsdGVyIHN0YXRlLlxuZXhwb3J0IGNvbnN0IGJ1aWxkRXhwZW5zZUxpc3RQYXlsb2FkID0gKFxuICBmaWx0ZXJzOiBFeHBlbnNlU2hlZXRMaXN0RmlsdGVycyxcbiAgcGFnZTogbnVtYmVyLFxuICBwYWdlU2l6ZTogbnVtYmVyXG4pOiBFeHBlbnNlU2hlZXRMaXN0QXBpUmVxdWVzdCA9PiB7XG4gIGNvbnN0IG5leHRQYWdlID0gTnVtYmVyLmlzRmluaXRlKHBhZ2UpICYmIHBhZ2UgPiAwID8gcGFnZSA6IDE7XG4gIGNvbnN0IG5leHRQYWdlU2l6ZSA9IE51bWJlci5pc0Zpbml0ZShwYWdlU2l6ZSkgJiYgcGFnZVNpemUgPiAwID8gcGFnZVNpemUgOiBERUZBVUxUX1NVR0dFU1RfUEFHRV9TSVpFO1xuICBjb25zdCBzYWZlRmlsdGVyID0gU3RyaW5nKGZpbHRlcnMuZmlsdGVyIHx8IGZpbHRlcnMuaG9qYUdhc3Rvc0lkIHx8IFwiXCIpLnRyaW0oKTtcblxuICByZXR1cm4ge1xuICAgIGZpbHRlcjogc2FmZUZpbHRlciB8fCBcIlwiLFxuICAgIGJpbGxlZE1vZGU6IDIsXG4gICAgY3JlYXRlZERhdGVGcm9tOiBub3JtYWxpemVPcHRpb25hbFRleHQoZmlsdGVycy5mcm9tRGF0ZSksXG4gICAgY3JlYXRlZERhdGVUbzogbm9ybWFsaXplT3B0aW9uYWxUZXh0KGZpbHRlcnMudG9EYXRlKSxcbiAgICBwcm9qSWQ6IG5vcm1hbGl6ZU9wdGlvbmFsVGV4dChmaWx0ZXJzLnByb2plY3RJZCksXG4gICAgY3VycmVuY3lDb2RlOiBub3JtYWxpemVPcHRpb25hbFRleHQoZmlsdGVycy5jdXJyZW5jeUNvZGUpLFxuICAgIGV4cGVuc2VTaGVldFN0YXR1czogcmVzb2x2ZUV4cGVuc2VTaGVldFN0YXR1cyhmaWx0ZXJzLnN0YXR1c0ZpbHRlciksXG4gICAgaW5jbHVkZVN1Ym9yZGluYXRlczogZmlsdGVycy5pbmNsdWRlU3Vib3JkaW5hdGVzID09PSB0cnVlLFxuICAgIHBhZ2U6IG5leHRQYWdlLFxuICAgIHBhZ2VTaXplOiBuZXh0UGFnZVNpemUsXG4gIH07XG59O1xuXG4vLyBCdWlsZCBzdWdnZXN0aW9uIHBheWxvYWQgZm9yIGV4cGVuc2Ugc2hlZXQgZHJvcGRvd24gc2VhcmNoLlxuZXhwb3J0IGNvbnN0IGJ1aWxkRXhwZW5zZVNoZWV0U3VnZ2VzdFBheWxvYWQgPSAoXG4gIHRlcm06IHN0cmluZyxcbiAgcGFnZVNpemUgPSBERUZBVUxUX1NVR0dFU1RfUEFHRV9TSVpFLFxuICBwYWdlID0gMSxcbiAgaW5jbHVkZVN1Ym9yZGluYXRlcyA9IGZhbHNlXG4pOiBFeHBlbnNlU2hlZXRMaXN0QXBpUmVxdWVzdCA9PiB7XG4gIGNvbnN0IHNhZmVUZXJtID0gU3RyaW5nKHRlcm0gfHwgXCJcIikudHJpbSgpO1xuICBjb25zdCBuZXh0UGFnZVNpemUgPSBOdW1iZXIuaXNGaW5pdGUocGFnZVNpemUpICYmIHBhZ2VTaXplID4gMCA/IHBhZ2VTaXplIDogREVGQVVMVF9TVUdHRVNUX1BBR0VfU0laRTtcbiAgY29uc3QgbmV4dFBhZ2UgPSBOdW1iZXIuaXNGaW5pdGUocGFnZSkgJiYgcGFnZSA+IDAgPyBNYXRoLmZsb29yKHBhZ2UpIDogMTtcblxuICByZXR1cm4ge1xuICAgIGZpbHRlcjogc2FmZVRlcm0gfHwgXCJcIixcbiAgICBiaWxsZWRNb2RlOiAyLFxuICAgIGNyZWF0ZWREYXRlRnJvbTogdW5kZWZpbmVkLFxuICAgIGNyZWF0ZWREYXRlVG86IHVuZGVmaW5lZCxcbiAgICBwcm9qSWQ6IHVuZGVmaW5lZCxcbiAgICBjdXJyZW5jeUNvZGU6IHVuZGVmaW5lZCxcbiAgICBpbmNsdWRlU3Vib3JkaW5hdGVzOiBpbmNsdWRlU3Vib3JkaW5hdGVzID09PSB0cnVlLFxuICAgIHBhZ2U6IG5leHRQYWdlLFxuICAgIHBhZ2VTaXplOiBuZXh0UGFnZVNpemUsXG4gIH07XG59O1xuXG4vLyBCdWlsZCBsaXN0IHBheWxvYWQgZm9yIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy9saXN0IGZyb20gdGlja2V0IGZpbHRlciBzdGF0ZS5cbmV4cG9ydCBjb25zdCBidWlsZEV4cGVuc2VUaWNrZXRMaXN0UGF5bG9hZCA9IChcbiAgZmlsdGVyczogRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCxcbiAgcGFnZTogbnVtYmVyLFxuICBwYWdlU2l6ZTogbnVtYmVyXG4pOiBFeHBlbnNlU2hlZXRUaWNrZXRMaXN0UmVxdWVzdCA9PiB7XG4gIGNvbnN0IG5leHRQYWdlID0gTnVtYmVyLmlzRmluaXRlKHBhZ2UpICYmIHBhZ2UgPiAwID8gTWF0aC5mbG9vcihwYWdlKSA6IDE7XG4gIGNvbnN0IG5leHRQYWdlU2l6ZSA9IE51bWJlci5pc0Zpbml0ZShwYWdlU2l6ZSkgJiYgcGFnZVNpemUgPiAwID8gTWF0aC5mbG9vcihwYWdlU2l6ZSkgOiBERUZBVUxUX1NVR0dFU1RfUEFHRV9TSVpFO1xuXG4gIHJldHVybiB7XG4gICAgcGFnZTogbmV4dFBhZ2UsXG4gICAgcGFnZVNpemU6IG5leHRQYWdlU2l6ZSxcbiAgICAuLi5idWlsZEV4cGVuc2VUaWNrZXRGaWx0ZXJQYXlsb2FkKGZpbHRlcnMpLFxuICAgIHN0YXR1czogcmVzb2x2ZVRpY2tldFN0YXR1c0ZpbHRlcihmaWx0ZXJzLnN0YXR1c0ZpbHRlciksXG4gIH07XG59O1xuXG4vLyBCdWlsZCBsaXN0IHBheWxvYWQgZm9yIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy9saW5rL2xpc3QgZnJvbSB0aWNrZXQgZmlsdGVyIHN0YXRlLlxuZXhwb3J0IGNvbnN0IGJ1aWxkRXhwZW5zZVRpY2tldExpbmtMaXN0UGF5bG9hZCA9IChcbiAgZmlsdGVyczogRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCxcbiAgcGFnZTogbnVtYmVyLFxuICBwYWdlU2l6ZTogbnVtYmVyXG4pOiBFeHBlbnNlU2hlZXRUaWNrZXRMaW5rTGlzdFJlcXVlc3QgPT4ge1xuICBjb25zdCBuZXh0UGFnZSA9IE51bWJlci5pc0Zpbml0ZShwYWdlKSAmJiBwYWdlID4gMCA/IE1hdGguZmxvb3IocGFnZSkgOiAxO1xuICBjb25zdCBuZXh0UGFnZVNpemUgPSBOdW1iZXIuaXNGaW5pdGUocGFnZVNpemUpICYmIHBhZ2VTaXplID4gMCA/IE1hdGguZmxvb3IocGFnZVNpemUpIDogREVGQVVMVF9TVUdHRVNUX1BBR0VfU0laRTtcblxuICByZXR1cm4ge1xuICAgIHBhZ2U6IG5leHRQYWdlLFxuICAgIHBhZ2VTaXplOiBuZXh0UGFnZVNpemUsXG4gICAgLi4uYnVpbGRFeHBlbnNlVGlja2V0RmlsdGVyUGF5bG9hZChmaWx0ZXJzKSxcbiAgfTtcbn07XG5cbi8vIEJ1aWxkIGZpbHRlciBwYXlsb2FkIGZvciAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMvbGluay9idWxrIGluIGZpbHRlcmVkIG1vZGUuXG5leHBvcnQgY29uc3QgYnVpbGRFeHBlbnNlVGlja2V0TGlua0J1bGtGaWx0ZXJzID0gKFxuICBmaWx0ZXJzOiBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90XG4pOiBFeHBlbnNlU2hlZXRUaWNrZXRMaW5rQnVsa0ZpbHRlcnMgPT4ge1xuICByZXR1cm4gYnVpbGRFeHBlbnNlVGlja2V0RmlsdGVyUGF5bG9hZChmaWx0ZXJzKTtcbn07XG4iLCAiLy8gRGV0ZWN0cyBicm93c2VyIGhpc3RvcnkgcmV0dXJucyB0aGF0IHJlY3JlYXRlIHRoZSBwYWdlIHdpdGhvdXQgYXBwLWxldmVsIHJldHVybiBmbGFncy5cbmV4cG9ydCBjb25zdCBpc0V4cGVuc2VIaXN0b3J5QmFja0ZvcndhcmROYXZpZ2F0aW9uID0gKCk6IGJvb2xlYW4gPT4ge1xuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIiB8fCB0eXBlb2YgcGVyZm9ybWFuY2UgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAodHlwZW9mIHBlcmZvcm1hbmNlLmdldEVudHJpZXNCeVR5cGUgIT09IFwiZnVuY3Rpb25cIikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGNvbnN0IG5hdmlnYXRpb25FbnRyaWVzID0gcGVyZm9ybWFuY2UuZ2V0RW50cmllc0J5VHlwZShcIm5hdmlnYXRpb25cIik7XG4gIGNvbnN0IG5hdmlnYXRpb25FbnRyeSA9IG5hdmlnYXRpb25FbnRyaWVzWzBdIGFzIFBlcmZvcm1hbmNlTmF2aWdhdGlvblRpbWluZyB8IHVuZGVmaW5lZDtcbiAgcmV0dXJuIG5hdmlnYXRpb25FbnRyeT8udHlwZSA9PT0gXCJiYWNrX2ZvcndhcmRcIjtcbn07XG5cbmNvbnN0IG5vcm1hbGl6ZVBhdGhuYW1lID0gKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICByZXR1cm4gU3RyaW5nKHZhbHVlIHx8IFwiXCIpLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xufTtcblxuLy8gRGV0ZWN0cyB3aGV0aGVyIHRoZSBjdXJyZW50IHBhZ2Ugd2FzIG9wZW5lZCBmcm9tIG9uZSBvZiB0aGUgZXhwZWN0ZWQgZXhwZW5zZSBkZXRhaWwgcm91dGVzLlxuZXhwb3J0IGNvbnN0IGhhc0V4cGVuc2VSZXR1cm5SZWZlcnJlciA9IChleHBlY3RlZFBhdGhzOiBzdHJpbmdbXSk6IGJvb2xlYW4gPT4ge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiIHx8IHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjb25zdCByYXdSZWZlcnJlciA9IFN0cmluZyhkb2N1bWVudC5yZWZlcnJlciB8fCBcIlwiKS50cmltKCk7XG4gIGlmICghcmF3UmVmZXJyZXIpIHJldHVybiBmYWxzZTtcblxuICB0cnkge1xuICAgIGNvbnN0IHJlZmVycmVyVXJsID0gbmV3IFVSTChyYXdSZWZlcnJlciwgd2luZG93LmxvY2F0aW9uLm9yaWdpbik7XG4gICAgY29uc3QgcmVmZXJyZXJQYXRoID0gbm9ybWFsaXplUGF0aG5hbWUocmVmZXJyZXJVcmwucGF0aG5hbWUpO1xuICAgIHJldHVybiBleHBlY3RlZFBhdGhzLnNvbWUoKHBhdGgpID0+IG5vcm1hbGl6ZVBhdGhuYW1lKHBhdGgpID09PSByZWZlcnJlclBhdGgpO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn07XG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuaW1wb3J0IEhpc3RvcnlNYW51YWxEYXRlUGlja2VyLCB7XG4gIEhpc3RvcnlNYW51YWxEYXlDZWxsLFxufSBmcm9tIFwiLi4vLi4vdmlzaXRhcy9oaXN0b3JpYWwvSGlzdG9yeU1hbnVhbERhdGVQaWNrZXIudHN4XCI7XG5pbXBvcnQge1xuICBidWlsZENhbGVuZGFyTW9udGgsXG4gIGJ1aWxkRGF0ZVJhbmdlRGF5Q2VsbHMsXG4gIGZvY3VzRGF0ZVJhbmdlU2VjdGlvbixcbiAgZm9ybWF0RGF0ZVJhbmdlRGlzcGxheSxcbiAgaXNCZWZvcmVEYXksXG4gIHBhcnNlSXNvRGF0ZVJhbmdlVmFsdWUsXG4gIHJlc29sdmVVaUxvY2FsZSxcbiAgdG9Jc29EYXRlUmFuZ2VWYWx1ZSxcbiAgdG9TZW50ZW5jZUNhc2UsXG59IGZyb20gXCIuLi91dGlscy9leHBlbnNlRGF0ZVJhbmdlVXRpbHMudHNcIjtcblxudHlwZSBFeHBlbnNlRGF0ZVJhbmdlRmlsdGVyUHJvcHMgPSB7XG4gIGZyb21EYXRlOiBzdHJpbmc7XG4gIHRvRGF0ZTogc3RyaW5nO1xuICBvbkNoYW5nZTogKGZyb21EYXRlOiBzdHJpbmcsIHRvRGF0ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBvblJhbmdlQ29tcGxldGU/OiAoZnJvbURhdGU6IHN0cmluZywgdG9EYXRlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIGF1dG9PcGVuUmVxdWVzdElkPzogbnVtYmVyO1xuICBzaG93TWFudWFsRXJyb3I/OiBib29sZWFuO1xuICBzaG93U3RhcnRFcnJvcj86IGJvb2xlYW47XG4gIHNob3dFbmRFcnJvcj86IGJvb2xlYW47XG59O1xuXG4vLyBTaGFyZWQgZGF0ZSByYW5nZSBwaWNrZXIgZm9yIGV4cGVuc2UgZmlsdGVycyBiYXNlZCBvbiB0aGUgaGlzdG9yeSBkYXRlIGNvbXBvbmVudC5cbmNvbnN0IEV4cGVuc2VEYXRlUmFuZ2VGaWx0ZXIgPSAoe1xuICBmcm9tRGF0ZSxcbiAgdG9EYXRlLFxuICBvbkNoYW5nZSxcbiAgb25SYW5nZUNvbXBsZXRlLFxuICBhdXRvT3BlblJlcXVlc3RJZCA9IDAsXG4gIHNob3dNYW51YWxFcnJvciA9IGZhbHNlLFxuICBzaG93U3RhcnRFcnJvciA9IGZhbHNlLFxuICBzaG93RW5kRXJyb3IgPSBmYWxzZSxcbn06IEV4cGVuc2VEYXRlUmFuZ2VGaWx0ZXJQcm9wcykgPT4ge1xuICBjb25zdCBsb2NhbGUgPSB1c2VNZW1vKCgpID0+IHJlc29sdmVVaUxvY2FsZSgpLCBbXSk7XG4gIGNvbnN0IGFjdGl2YXRvclJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBwb3BvdmVyUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XG5cbiAgY29uc3QgW3N0YXJ0RGF0ZSwgc2V0U3RhcnREYXRlXSA9IHVzZVN0YXRlPERhdGUgfCBudWxsPigoKSA9PiBwYXJzZUlzb0RhdGVSYW5nZVZhbHVlKGZyb21EYXRlKSk7XG4gIGNvbnN0IFtlbmREYXRlLCBzZXRFbmREYXRlXSA9IHVzZVN0YXRlPERhdGUgfCBudWxsPigoKSA9PiBwYXJzZUlzb0RhdGVSYW5nZVZhbHVlKHRvRGF0ZSkpO1xuICBjb25zdCBbaG92ZXJEYXRlLCBzZXRIb3ZlckRhdGVdID0gdXNlU3RhdGU8RGF0ZSB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbc2VsZWN0aW5nU3RlcCwgc2V0U2VsZWN0aW5nU3RlcF0gPSB1c2VTdGF0ZTxcInN0YXJ0XCIgfCBcImVuZFwiIHwgXCJkb25lXCI+KFwic3RhcnRcIik7XG4gIGNvbnN0IFtpc09wZW4sIHNldElzT3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgY29uc3Qgbm93ID0gdXNlTWVtbygoKSA9PiBuZXcgRGF0ZSgpLCBbXSk7XG4gIGNvbnN0IFtjdXJyZW50TW9udGgsIHNldEN1cnJlbnRNb250aF0gPSB1c2VTdGF0ZSgocGFyc2VJc29EYXRlUmFuZ2VWYWx1ZShmcm9tRGF0ZSkgfHwgbm93KS5nZXRNb250aCgpKTtcbiAgY29uc3QgW2N1cnJlbnRZZWFyLCBzZXRDdXJyZW50WWVhcl0gPSB1c2VTdGF0ZSgocGFyc2VJc29EYXRlUmFuZ2VWYWx1ZShmcm9tRGF0ZSkgfHwgbm93KS5nZXRGdWxsWWVhcigpKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHNldFN0YXJ0RGF0ZShwYXJzZUlzb0RhdGVSYW5nZVZhbHVlKGZyb21EYXRlKSk7XG4gIH0sIFtmcm9tRGF0ZV0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc2V0RW5kRGF0ZShwYXJzZUlzb0RhdGVSYW5nZVZhbHVlKHRvRGF0ZSkpO1xuICB9LCBbdG9EYXRlXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBvbkNoYW5nZShzdGFydERhdGUgPyB0b0lzb0RhdGVSYW5nZVZhbHVlKHN0YXJ0RGF0ZSkgOiBcIlwiLCBlbmREYXRlID8gdG9Jc29EYXRlUmFuZ2VWYWx1ZShlbmREYXRlKSA6IFwiXCIpO1xuICB9LCBbc3RhcnREYXRlLCBlbmREYXRlLCBvbkNoYW5nZV0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFpc09wZW4pIHJldHVybjtcblxuICAgIGNvbnN0IGhhbmRsZU91dHNpZGUgPSAoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldCBhcyBOb2RlIHwgbnVsbDtcbiAgICAgIGlmICghdGFyZ2V0KSByZXR1cm47XG4gICAgICBpZiAocG9wb3ZlclJlZi5jdXJyZW50Py5jb250YWlucyh0YXJnZXQpKSByZXR1cm47XG4gICAgICBpZiAoYWN0aXZhdG9yUmVmLmN1cnJlbnQ/LmNvbnRhaW5zKHRhcmdldCkpIHJldHVybjtcbiAgICAgIHNldElzT3BlbihmYWxzZSk7XG4gICAgICBzZXRIb3ZlckRhdGUobnVsbCk7XG4gICAgfTtcblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgaGFuZGxlT3V0c2lkZSk7XG4gICAgcmV0dXJuICgpID0+IGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgaGFuZGxlT3V0c2lkZSk7XG4gIH0sIFtpc09wZW5dKTtcblxuICBjb25zdCBvcGVuUG9wb3ZlciA9IHVzZUNhbGxiYWNrKFxuICAgIChzZWN0aW9uOiBcInN0YXJ0XCIgfCBcImVuZFwiKSA9PiB7XG4gICAgICBzZXRTZWxlY3RpbmdTdGVwKHNlY3Rpb24pO1xuICAgICAgc2V0SXNPcGVuKHRydWUpO1xuICAgICAgc2V0SG92ZXJEYXRlKG51bGwpO1xuXG4gICAgICBjb25zdCBiYXNlID0gc2VjdGlvbiA9PT0gXCJzdGFydFwiID8gc3RhcnREYXRlIHx8IGVuZERhdGUgfHwgbm93IDogZW5kRGF0ZSB8fCBzdGFydERhdGUgfHwgbm93O1xuICAgICAgc2V0Q3VycmVudE1vbnRoKGJhc2UuZ2V0TW9udGgoKSk7XG4gICAgICBzZXRDdXJyZW50WWVhcihiYXNlLmdldEZ1bGxZZWFyKCkpO1xuICAgIH0sXG4gICAgW2VuZERhdGUsIG5vdywgc3RhcnREYXRlXVxuICApO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKGF1dG9PcGVuUmVxdWVzdElkIDw9IDApIHJldHVybjtcbiAgICBzZXRTZWxlY3RpbmdTdGVwKFwic3RhcnRcIik7XG4gICAgc2V0SXNPcGVuKHRydWUpO1xuICAgIHNldEhvdmVyRGF0ZShudWxsKTtcbiAgICBjb25zdCBiYXNlID0gc3RhcnREYXRlIHx8IGVuZERhdGUgfHwgbm93O1xuICAgIHNldEN1cnJlbnRNb250aChiYXNlLmdldE1vbnRoKCkpO1xuICAgIHNldEN1cnJlbnRZZWFyKGJhc2UuZ2V0RnVsbFllYXIoKSk7XG4gIH0sIFthdXRvT3BlblJlcXVlc3RJZF0pO1xuXG4gIGNvbnN0IG9uQWN0aXZhdG9yS2V5RG93biA9IHVzZUNhbGxiYWNrKFxuICAgIChldmVudDogUmVhY3QuS2V5Ym9hcmRFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHtcbiAgICAgIGlmIChldmVudC5rZXkgIT09IFwiRW50ZXJcIiAmJiBldmVudC5rZXkgIT09IFwiIFwiKSByZXR1cm47XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgb3BlblBvcG92ZXIoXCJzdGFydFwiKTtcbiAgICB9LFxuICAgIFtvcGVuUG9wb3Zlcl1cbiAgKTtcblxuICBjb25zdCBvblNlY3Rpb25LZXlEb3duID0gdXNlQ2FsbGJhY2soXG4gICAgKGV2ZW50OiBSZWFjdC5LZXlib2FyZEV2ZW50PEhUTUxEaXZFbGVtZW50Piwgc2VjdGlvbjogXCJzdGFydFwiIHwgXCJlbmRcIikgPT4ge1xuICAgICAgaWYgKGV2ZW50LmtleSAhPT0gXCJFbnRlclwiICYmIGV2ZW50LmtleSAhPT0gXCIgXCIpIHJldHVybjtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBvcGVuUG9wb3ZlcihzZWN0aW9uKTtcbiAgICB9LFxuICAgIFtvcGVuUG9wb3Zlcl1cbiAgKTtcblxuICBjb25zdCBvbkNsZWFyID0gdXNlQ2FsbGJhY2soKGV2ZW50OiBSZWFjdC5Nb3VzZUV2ZW50KSA9PiB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBzZXRTdGFydERhdGUobnVsbCk7XG4gICAgc2V0RW5kRGF0ZShudWxsKTtcbiAgICBzZXRIb3ZlckRhdGUobnVsbCk7XG4gICAgc2V0U2VsZWN0aW5nU3RlcChcInN0YXJ0XCIpO1xuICB9LCBbXSk7XG5cbiAgY29uc3Qgb25QcmV2TW9udGggPSB1c2VDYWxsYmFjaygoZXZlbnQ6IFJlYWN0Lk1vdXNlRXZlbnQ8SFRNTEJ1dHRvbkVsZW1lbnQ+KSA9PiB7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgc2V0Q3VycmVudE1vbnRoKChwcmV2aW91cykgPT4ge1xuICAgICAgY29uc3QgbmV4dCA9IHByZXZpb3VzIC0gMTtcbiAgICAgIGlmIChuZXh0IDwgMCkge1xuICAgICAgICBzZXRDdXJyZW50WWVhcigoeWVhcikgPT4geWVhciAtIDEpO1xuICAgICAgICByZXR1cm4gMTE7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV4dDtcbiAgICB9KTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IG9uTmV4dE1vbnRoID0gdXNlQ2FsbGJhY2soKGV2ZW50OiBSZWFjdC5Nb3VzZUV2ZW50PEhUTUxCdXR0b25FbGVtZW50PikgPT4ge1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHNldEN1cnJlbnRNb250aCgocHJldmlvdXMpID0+IHtcbiAgICAgIGNvbnN0IG5leHQgPSBwcmV2aW91cyArIDE7XG4gICAgICBpZiAobmV4dCA+IDExKSB7XG4gICAgICAgIHNldEN1cnJlbnRZZWFyKCh5ZWFyKSA9PiB5ZWFyICsgMSk7XG4gICAgICAgIHJldHVybiAwO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5leHQ7XG4gICAgfSk7XG4gIH0sIFtdKTtcblxuICBjb25zdCBvbkRheUNsaWNrID0gdXNlQ2FsbGJhY2soXG4gICAgKGRheTogSGlzdG9yeU1hbnVhbERheUNlbGwpID0+IHtcbiAgICAgIGlmICghZGF5LmRhdGUgfHwgZGF5LmRpc2FibGVkKSByZXR1cm47XG5cbiAgICAgIGNvbnN0IG5leHREYXRlID0gbmV3IERhdGUoZGF5LmRhdGUuZ2V0RnVsbFllYXIoKSwgZGF5LmRhdGUuZ2V0TW9udGgoKSwgZGF5LmRhdGUuZ2V0RGF0ZSgpKTtcblxuICAgICAgaWYgKCFzdGFydERhdGUgfHwgc2VsZWN0aW5nU3RlcCA9PT0gXCJzdGFydFwiKSB7XG4gICAgICAgIHNldFN0YXJ0RGF0ZShuZXh0RGF0ZSk7XG4gICAgICAgIGlmIChlbmREYXRlICYmIGlzQmVmb3JlRGF5KGVuZERhdGUsIG5leHREYXRlKSkge1xuICAgICAgICAgIHNldEVuZERhdGUobnVsbCk7XG4gICAgICAgIH1cbiAgICAgICAgc2V0U2VsZWN0aW5nU3RlcChcImVuZFwiKTtcbiAgICAgICAgc2V0Q3VycmVudE1vbnRoKG5leHREYXRlLmdldE1vbnRoKCkpO1xuICAgICAgICBzZXRDdXJyZW50WWVhcihuZXh0RGF0ZS5nZXRGdWxsWWVhcigpKTtcbiAgICAgICAgZm9jdXNEYXRlUmFuZ2VTZWN0aW9uKGFjdGl2YXRvclJlZi5jdXJyZW50LCBcImVuZFwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoc2VsZWN0aW5nU3RlcCA9PT0gXCJlbmRcIikge1xuICAgICAgICBsZXQgZmluYWxTdGFydCA9IHN0YXJ0RGF0ZTtcbiAgICAgICAgbGV0IGZpbmFsRW5kID0gbmV4dERhdGU7XG5cbiAgICAgICAgaWYgKGlzQmVmb3JlRGF5KG5leHREYXRlLCBzdGFydERhdGUpKSB7XG4gICAgICAgICAgZmluYWxTdGFydCA9IG5leHREYXRlO1xuICAgICAgICAgIGZpbmFsRW5kID0gc3RhcnREYXRlO1xuICAgICAgICAgIHNldEVuZERhdGUoZmluYWxFbmQpO1xuICAgICAgICAgIHNldFN0YXJ0RGF0ZShmaW5hbFN0YXJ0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZXRFbmREYXRlKGZpbmFsRW5kKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG9uUmFuZ2VDb21wbGV0ZT8uKHRvSXNvRGF0ZVJhbmdlVmFsdWUoZmluYWxTdGFydCksIHRvSXNvRGF0ZVJhbmdlVmFsdWUoZmluYWxFbmQpKTtcbiAgICAgICAgc2V0U2VsZWN0aW5nU3RlcChcImRvbmVcIik7XG4gICAgICAgIHNldElzT3BlbihmYWxzZSk7XG4gICAgICAgIHNldEhvdmVyRGF0ZShudWxsKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIFtlbmREYXRlLCBvblJhbmdlQ29tcGxldGUsIHNlbGVjdGluZ1N0ZXAsIHN0YXJ0RGF0ZV1cbiAgKTtcblxuICBjb25zdCBvbkRheUhvdmVyID0gdXNlQ2FsbGJhY2soXG4gICAgKGRheTogSGlzdG9yeU1hbnVhbERheUNlbGwpID0+IHtcbiAgICAgIGlmICghZGF5LmRhdGUgfHwgc2VsZWN0aW5nU3RlcCAhPT0gXCJlbmRcIiB8fCAhc3RhcnREYXRlKSByZXR1cm47XG4gICAgICBzZXRIb3ZlckRhdGUobmV3IERhdGUoZGF5LmRhdGUuZ2V0RnVsbFllYXIoKSwgZGF5LmRhdGUuZ2V0TW9udGgoKSwgZGF5LmRhdGUuZ2V0RGF0ZSgpKSk7XG4gICAgfSxcbiAgICBbc2VsZWN0aW5nU3RlcCwgc3RhcnREYXRlXVxuICApO1xuXG4gIGNvbnN0IG9uR3JpZE1vdXNlTGVhdmUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgc2V0SG92ZXJEYXRlKG51bGwpO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgY2FsZW5kYXIgPSB1c2VNZW1vKCgpID0+IHtcbiAgICByZXR1cm4gYnVpbGRDYWxlbmRhck1vbnRoKGN1cnJlbnRZZWFyLCBjdXJyZW50TW9udGgsIGxvY2FsZSk7XG4gIH0sIFtjdXJyZW50TW9udGgsIGN1cnJlbnRZZWFyLCBsb2NhbGVdKTtcblxuICBjb25zdCBkYXlDZWxscyA9IHVzZU1lbW8oXG4gICAgKCkgPT4gYnVpbGREYXRlUmFuZ2VEYXlDZWxscyhjYWxlbmRhci5jZWxscywgc3RhcnREYXRlLCBlbmREYXRlLCBob3ZlckRhdGUsIHNlbGVjdGluZ1N0ZXApLFxuICAgIFtjYWxlbmRhci5jZWxscywgZW5kRGF0ZSwgaG92ZXJEYXRlLCBzZWxlY3RpbmdTdGVwLCBzdGFydERhdGVdXG4gICk7XG5cbiAgY29uc3QgbGFiZWxGcm9tID0gdG9TZW50ZW5jZUNhc2UoaW5kVChcIkhpc3RvcnlfRnJvbVwiLCBcIkZyb21cIiksIGxvY2FsZSk7XG4gIGNvbnN0IGxhYmVsVG8gPSB0b1NlbnRlbmNlQ2FzZShpbmRUKFwiSGlzdG9yeV9Ub1wiLCBcIlRvXCIpLCBsb2NhbGUpO1xuXG4gIHJldHVybiAoXG4gICAgPEhpc3RvcnlNYW51YWxEYXRlUGlja2VyXG4gICAgICBhY3RpdmF0b3JSZWY9e2FjdGl2YXRvclJlZn1cbiAgICAgIHBvcG92ZXJSZWY9e3BvcG92ZXJSZWZ9XG4gICAgICBzaG93TWFudWFsRXJyb3I9e3Nob3dNYW51YWxFcnJvcn1cbiAgICAgIHNob3dTdGFydEVycm9yPXtzaG93U3RhcnRFcnJvcn1cbiAgICAgIHNob3dFbmRFcnJvcj17c2hvd0VuZEVycm9yfVxuICAgICAgZmlsdGVyVGl0bGU9e2luZFQoXCJIaXN0b3J5X0ZpbHRlcl9EYXRlXCIsIFwiRGF0ZVwiKX1cbiAgICAgIGlzT3Blbj17aXNPcGVufVxuICAgICAgc2VsZWN0aW5nU3RlcD17c2VsZWN0aW5nU3RlcH1cbiAgICAgIGxhYmVsRnJvbT17bGFiZWxGcm9tfVxuICAgICAgbGFiZWxUbz17bGFiZWxUb31cbiAgICAgIHN0YXJ0RGF0ZVRleHQ9e3N0YXJ0RGF0ZSA/IGZvcm1hdERhdGVSYW5nZURpc3BsYXkoc3RhcnREYXRlLCBsb2NhbGUpIDogaW5kVChcIkhpc3RvcnlfQWRkRGF0ZVwiLCBcIkFkZCBkYXRlXCIpfVxuICAgICAgZW5kRGF0ZVRleHQ9e2VuZERhdGUgPyBmb3JtYXREYXRlUmFuZ2VEaXNwbGF5KGVuZERhdGUsIGxvY2FsZSkgOiBpbmRUKFwiSGlzdG9yeV9BZGREYXRlXCIsIFwiQWRkIGRhdGVcIil9XG4gICAgICBjbGVhclJhbmdlTGFiZWw9e2luZFQoXCJIaXN0b3J5X0NsZWFyUmFuZ2VcIiwgXCJDbGVhciByYW5nZVwiKX1cbiAgICAgIGhhc1NlbGVjdGVkUmFuZ2U9eyEhc3RhcnREYXRlIHx8ICEhZW5kRGF0ZX1cbiAgICAgIG1vbnRoTGFiZWw9e2NhbGVuZGFyLm1vbnRoTGFiZWx9XG4gICAgICB3ZWVrRGF5TGFiZWxzPXtbXG4gICAgICAgIGluZFQoXCJIaXN0b3J5X0RheV9Nb25cIiwgXCJNb25cIiksXG4gICAgICAgIGluZFQoXCJIaXN0b3J5X0RheV9UdWVcIiwgXCJUdWVcIiksXG4gICAgICAgIGluZFQoXCJIaXN0b3J5X0RheV9XZWRcIiwgXCJXZWRcIiksXG4gICAgICAgIGluZFQoXCJIaXN0b3J5X0RheV9UaHVcIiwgXCJUaHVcIiksXG4gICAgICAgIGluZFQoXCJIaXN0b3J5X0RheV9GcmlcIiwgXCJGcmlcIiksXG4gICAgICAgIGluZFQoXCJIaXN0b3J5X0RheV9TYXRcIiwgXCJTYXRcIiksXG4gICAgICAgIGluZFQoXCJIaXN0b3J5X0RheV9TdW5cIiwgXCJTdW5cIiksXG4gICAgICBdfVxuICAgICAgc3RhdHVzVGV4dD17XG4gICAgICAgIHNlbGVjdGluZ1N0ZXAgPT09IFwic3RhcnRcIlxuICAgICAgICAgID8gaW5kVChcIkhpc3RvcnlfU3RhdHVzX1NlbGVjdFN0YXJ0XCIsIFwiU2VsZWN0IHN0YXJ0IGRhdGVcIilcbiAgICAgICAgICA6IGluZFQoXCJIaXN0b3J5X1N0YXR1c19TZWxlY3RFbmRcIiwgXCJTZWxlY3QgZW5kIGRhdGVcIilcbiAgICAgIH1cbiAgICAgIGRheUNlbGxzPXtkYXlDZWxsc31cbiAgICAgIHByZXZNb250aExhYmVsPXtpbmRUKFwiSGlzdG9yeV9QcmV2TW9udGhcIiwgXCJQcmV2aW91cyBtb250aFwiKX1cbiAgICAgIG5leHRNb250aExhYmVsPXtpbmRUKFwiSGlzdG9yeV9OZXh0TW9udGhcIiwgXCJOZXh0IG1vbnRoXCIpfVxuICAgICAgb25PcGVuUG9wb3Zlcj17b3BlblBvcG92ZXJ9XG4gICAgICBvbkFjdGl2YXRvcktleURvd249e29uQWN0aXZhdG9yS2V5RG93bn1cbiAgICAgIG9uU2VjdGlvbktleURvd249e29uU2VjdGlvbktleURvd259XG4gICAgICBvbkNsZWFyPXtvbkNsZWFyfVxuICAgICAgb25QcmV2TW9udGg9e29uUHJldk1vbnRofVxuICAgICAgb25OZXh0TW9udGg9e29uTmV4dE1vbnRofVxuICAgICAgb25HcmlkTW91c2VMZWF2ZT17b25HcmlkTW91c2VMZWF2ZX1cbiAgICAgIG9uRGF5Q2xpY2s9e29uRGF5Q2xpY2t9XG4gICAgICBvbkRheUhvdmVyPXtvbkRheUhvdmVyfVxuICAgIC8+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlRGF0ZVJhbmdlRmlsdGVyO1xuIiwgImltcG9ydCB7IGNsYXNzTmFtZXMgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvY2xhc3NOYW1lcy50c1wiO1xuaW1wb3J0IHR5cGUgeyBIaXN0b3J5TWFudWFsRGF5Q2VsbCB9IGZyb20gXCIuLi8uLi92aXNpdGFzL2hpc3RvcmlhbC9IaXN0b3J5TWFudWFsRGF0ZVBpY2tlci50c3hcIjtcblxuZXhwb3J0IHR5cGUgQ2FsZW5kYXJDZWxsID0ge1xuICBkYXRlOiBEYXRlIHwgbnVsbDtcbiAgaXNvOiBzdHJpbmc7XG4gIGlzRW1wdHk6IGJvb2xlYW47XG59O1xuXG5jb25zdCBwYWQgPSAodmFsdWU6IG51bWJlcik6IHN0cmluZyA9PiB2YWx1ZS50b1N0cmluZygpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcblxuZXhwb3J0IGNvbnN0IHRvSXNvRGF0ZVJhbmdlVmFsdWUgPSAoZGF0ZTogRGF0ZSk6IHN0cmluZyA9PiB7XG4gIHJldHVybiBgJHtkYXRlLmdldEZ1bGxZZWFyKCl9LSR7cGFkKGRhdGUuZ2V0TW9udGgoKSArIDEpfS0ke3BhZChkYXRlLmdldERhdGUoKSl9YDtcbn07XG5cbmV4cG9ydCBjb25zdCBwYXJzZUlzb0RhdGVSYW5nZVZhbHVlID0gKHZhbHVlOiBzdHJpbmcpOiBEYXRlIHwgbnVsbCA9PiB7XG4gIGlmICghdmFsdWUpIHJldHVybiBudWxsO1xuICBjb25zdCB0cmltbWVkID0gU3RyaW5nKHZhbHVlKS50cmltKCk7XG4gIGlmICghdHJpbW1lZCkgcmV0dXJuIG51bGw7XG5cbiAgY29uc3QgZGF0ZVBhcnQgPSB0cmltbWVkLnNwbGl0KFwiVFwiKVswXS5zcGxpdChcIiBcIilbMF07XG4gIGlmICghL15cXGR7NH0tXFxkezJ9LVxcZHsyfSQvLnRlc3QoZGF0ZVBhcnQpKSByZXR1cm4gbnVsbDtcblxuICBjb25zdCBbeWVhciwgbW9udGgsIGRheV0gPSBkYXRlUGFydC5zcGxpdChcIi1cIikubWFwKE51bWJlcik7XG4gIHJldHVybiBuZXcgRGF0ZSh5ZWFyLCBtb250aCAtIDEsIGRheSk7XG59O1xuXG5leHBvcnQgY29uc3QgaXNTYW1lRGF5ID0gKGE6IERhdGUgfCBudWxsLCBiOiBEYXRlIHwgbnVsbCk6IGJvb2xlYW4gPT4ge1xuICByZXR1cm4gISEoYSAmJiBiICYmIGEuZ2V0VGltZSgpID09PSBiLmdldFRpbWUoKSk7XG59O1xuXG5leHBvcnQgY29uc3QgaXNCZWZvcmVEYXkgPSAoYTogRGF0ZSB8IG51bGwsIGI6IERhdGUgfCBudWxsKTogYm9vbGVhbiA9PiB7XG4gIHJldHVybiAhIShhICYmIGIgJiYgYS5nZXRUaW1lKCkgPCBiLmdldFRpbWUoKSk7XG59O1xuXG5leHBvcnQgY29uc3QgZm9jdXNEYXRlUmFuZ2VTZWN0aW9uID0gKGNvbnRhaW5lcjogSFRNTERpdkVsZW1lbnQgfCBudWxsLCBzZWN0aW9uOiBcInN0YXJ0XCIgfCBcImVuZFwiKTogdm9pZCA9PiB7XG4gIGlmICghY29udGFpbmVyKSByZXR1cm47XG4gIGNvbnN0IHRhcmdldCA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yPEhUTUxFbGVtZW50PihgW2RhdGEtc2VjdGlvbj1cIiR7c2VjdGlvbn1cIl1gKTtcbiAgaWYgKCF0YXJnZXQpIHJldHVybjtcbiAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0YXJnZXQuZm9jdXMoKSk7XG59O1xuXG5jb25zdCB0b1RpdGxlQ2FzZSA9ICh2YWx1ZTogc3RyaW5nLCBsb2NhbGU6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGlmICghdmFsdWUpIHJldHVybiBcIlwiO1xuICBjb25zdCBsb3dlciA9IHZhbHVlLnRvTG9jYWxlTG93ZXJDYXNlKGxvY2FsZSk7XG4gIHJldHVybiBsb3dlclswXS50b0xvY2FsZVVwcGVyQ2FzZShsb2NhbGUpICsgbG93ZXIuc2xpY2UoMSk7XG59O1xuXG5leHBvcnQgY29uc3QgdG9TZW50ZW5jZUNhc2UgPSAodmFsdWU6IHN0cmluZywgbG9jYWxlOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICBpZiAoIXZhbHVlKSByZXR1cm4gXCJcIjtcbiAgY29uc3QgdHJpbW1lZCA9IHZhbHVlLnRyaW0oKTtcbiAgaWYgKCF0cmltbWVkKSByZXR1cm4gdHJpbW1lZDtcbiAgY29uc3QgbG93ZXIgPSB0cmltbWVkLnRvTG9jYWxlTG93ZXJDYXNlKGxvY2FsZSk7XG4gIHJldHVybiBsb3dlclswXS50b0xvY2FsZVVwcGVyQ2FzZShsb2NhbGUpICsgbG93ZXIuc2xpY2UoMSk7XG59O1xuXG5leHBvcnQgY29uc3QgZm9ybWF0RGF0ZVJhbmdlRGlzcGxheSA9IChkYXRlOiBEYXRlLCBsb2NhbGU6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIHJldHVybiBkYXRlXG4gICAgLnRvTG9jYWxlRGF0ZVN0cmluZyhsb2NhbGUsIHtcbiAgICAgIGRheTogXCJudW1lcmljXCIsXG4gICAgICBtb250aDogXCJzaG9ydFwiLFxuICAgICAgeWVhcjogXCJudW1lcmljXCIsXG4gICAgfSlcbiAgICAucmVwbGFjZSgvXFwuL2csIFwiXCIpXG4gICAgLnRvTG93ZXJDYXNlKCk7XG59O1xuXG5leHBvcnQgY29uc3QgZm9ybWF0TW9udGhMYWJlbCA9IChkYXRlOiBEYXRlLCBsb2NhbGU6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IG1vbnRoTmFtZSA9IGRhdGUudG9Mb2NhbGVEYXRlU3RyaW5nKGxvY2FsZSwgeyBtb250aDogXCJsb25nXCIgfSk7XG4gIHJldHVybiBgJHt0b1RpdGxlQ2FzZShtb250aE5hbWUsIGxvY2FsZSl9ICR7ZGF0ZS5nZXRGdWxsWWVhcigpfWA7XG59O1xuXG5leHBvcnQgY29uc3QgcmVzb2x2ZVVpTG9jYWxlID0gKCk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IGZyb21IdG1sID0gdHlwZW9mIGRvY3VtZW50ICE9PSBcInVuZGVmaW5lZFwiID8gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmxhbmcgOiBcIlwiO1xuICByZXR1cm4gZnJvbUh0bWwgJiYgU3RyaW5nKGZyb21IdG1sKS50cmltKCkgPyBmcm9tSHRtbCA6IFwiZXMtRVNcIjtcbn07XG5cbmV4cG9ydCBjb25zdCBidWlsZENhbGVuZGFyTW9udGggPSAoeWVhcjogbnVtYmVyLCBtb250aDogbnVtYmVyLCBsb2NhbGU6IHN0cmluZyk6IHsgbW9udGhMYWJlbDogc3RyaW5nOyBjZWxsczogQ2FsZW5kYXJDZWxsW10gfSA9PiB7XG4gIGNvbnN0IGZpcnN0RGF5ID0gbmV3IERhdGUoeWVhciwgbW9udGgsIDEpO1xuICBjb25zdCBkYXlzSW5Nb250aCA9IG5ldyBEYXRlKHllYXIsIG1vbnRoICsgMSwgMCkuZ2V0RGF0ZSgpO1xuICBjb25zdCBvZmZzZXQgPSAoZmlyc3REYXkuZ2V0RGF5KCkgKyA2KSAlIDc7XG4gIGNvbnN0IGNlbGxzOiBDYWxlbmRhckNlbGxbXSA9IFtdO1xuXG4gIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBvZmZzZXQ7IGluZGV4ICs9IDEpIHtcbiAgICBjZWxscy5wdXNoKHsgZGF0ZTogbnVsbCwgaXNvOiBcIlwiLCBpc0VtcHR5OiB0cnVlIH0pO1xuICB9XG5cbiAgZm9yIChsZXQgZGF5ID0gMTsgZGF5IDw9IGRheXNJbk1vbnRoOyBkYXkgKz0gMSkge1xuICAgIGNvbnN0IGRhdGVPYmogPSBuZXcgRGF0ZSh5ZWFyLCBtb250aCwgZGF5KTtcbiAgICBjZWxscy5wdXNoKHsgZGF0ZTogZGF0ZU9iaiwgaXNvOiB0b0lzb0RhdGVSYW5nZVZhbHVlKGRhdGVPYmopLCBpc0VtcHR5OiBmYWxzZSB9KTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbW9udGhMYWJlbDogZm9ybWF0TW9udGhMYWJlbChmaXJzdERheSwgbG9jYWxlKSxcbiAgICBjZWxscyxcbiAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCBidWlsZERhdGVSYW5nZURheUNlbGxzID0gKFxuICBjZWxsczogQ2FsZW5kYXJDZWxsW10sXG4gIHN0YXJ0RGF0ZTogRGF0ZSB8IG51bGwsXG4gIGVuZERhdGU6IERhdGUgfCBudWxsLFxuICBob3ZlckRhdGU6IERhdGUgfCBudWxsLFxuICBzZWxlY3RpbmdTdGVwOiBcInN0YXJ0XCIgfCBcImVuZFwiIHwgXCJkb25lXCJcbik6IEhpc3RvcnlNYW51YWxEYXlDZWxsW10gPT4ge1xuICBjb25zdCBwcmV2aWV3RW5kID0gZW5kRGF0ZSB8fCAoc2VsZWN0aW5nU3RlcCA9PT0gXCJlbmRcIiA/IGhvdmVyRGF0ZSA6IG51bGwpO1xuXG4gIHJldHVybiBjZWxscy5tYXAoKGNlbGwsIGluZGV4KSA9PiB7XG4gICAgaWYgKGNlbGwuaXNFbXB0eSB8fCAhY2VsbC5kYXRlKSB7XG4gICAgICByZXR1cm4geyBrZXk6IGBlbXB0eS0ke2luZGV4fWAsIGlzRW1wdHk6IHRydWUgfTtcbiAgICB9XG5cbiAgICBjb25zdCBkYXRlT2JqID0gY2VsbC5kYXRlO1xuICAgIGNvbnN0IGlzU3RhcnQgPSBpc1NhbWVEYXkoZGF0ZU9iaiwgc3RhcnREYXRlKTtcbiAgICBjb25zdCBpc0VuZCA9IGlzU2FtZURheShkYXRlT2JqLCBlbmREYXRlKTtcbiAgICBjb25zdCBpblJhbmdlID0gc3RhcnREYXRlICYmIHByZXZpZXdFbmQgJiYgaXNCZWZvcmVEYXkoc3RhcnREYXRlLCBkYXRlT2JqKSAmJiBpc0JlZm9yZURheShkYXRlT2JqLCBwcmV2aWV3RW5kKTtcbiAgICBjb25zdCBob3ZlclJhbmdlID0gc3RhcnREYXRlICYmICFlbmREYXRlICYmIGhvdmVyRGF0ZSAmJiBpc0JlZm9yZURheShzdGFydERhdGUsIGRhdGVPYmopICYmIGlzQmVmb3JlRGF5KGRhdGVPYmosIGhvdmVyRGF0ZSk7XG4gICAgY29uc3QgZGlzYWJsZWQgPSBzZWxlY3RpbmdTdGVwID09PSBcImVuZFwiICYmICEhc3RhcnREYXRlICYmIGlzQmVmb3JlRGF5KGRhdGVPYmosIHN0YXJ0RGF0ZSk7XG4gICAgY29uc3QgaXNUb2RheSA9IGlzU2FtZURheShkYXRlT2JqLCBuZXcgRGF0ZSgpKTtcblxuICAgIHJldHVybiB7XG4gICAgICBrZXk6IGNlbGwuaXNvLFxuICAgICAgaXNFbXB0eTogZmFsc2UsXG4gICAgICBkYXRlOiBkYXRlT2JqLFxuICAgICAgaXNvOiBjZWxsLmlzbyxcbiAgICAgIGRheUxhYmVsOiBkYXRlT2JqLmdldERhdGUoKSxcbiAgICAgIGRheUNsYXNzOiBjbGFzc05hbWVzKFxuICAgICAgICBcImRycC1kYXlcIixcbiAgICAgICAgaXNTdGFydCA/IFwic3RhcnQgcmFuZ2Utc3RhcnRcIiA6IFwiXCIsXG4gICAgICAgIGlzRW5kID8gXCJlbmQgcmFuZ2UtZW5kXCIgOiBcIlwiLFxuICAgICAgICBpblJhbmdlID8gXCJpbi1yYW5nZVwiIDogXCJcIixcbiAgICAgICAgaG92ZXJSYW5nZSA/IFwiaG92ZXItcmFuZ2VcIiA6IFwiXCIsXG4gICAgICAgIGRpc2FibGVkID8gXCJkaXNhYmxlZFwiIDogXCJcIixcbiAgICAgICAgaXNUb2RheSA/IFwidG9kYXlcIiA6IFwiXCJcbiAgICAgICksXG4gICAgICBkaXNhYmxlZCxcbiAgICB9O1xuICB9KTtcbn07XG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IEFjdGlvbkJ1dHRvbiBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0FjdGlvbkJ1dHRvbi50c3hcIjtcblxudHlwZSBFeHBlbnNlRmlsdGVyQWN0aW9uc1Byb3BzID0ge1xuICBjbGVhckxhYmVsOiBzdHJpbmc7XG4gIGFwcGx5TGFiZWw6IHN0cmluZztcbiAgb25DbGVhcjogKCkgPT4gdm9pZDtcbiAgb25BcHBseTogKCkgPT4gdm9pZDtcbn07XG5cbi8vIFNoYXJlZCBhcHBseS9jbGVhciBhY3Rpb24gcm93IGZvciBleHBlbnNlIHNoZWV0IGZpbHRlcnMuXG5jb25zdCBFeHBlbnNlRmlsdGVyQWN0aW9ucyA9ICh7XG4gIGNsZWFyTGFiZWwsXG4gIGFwcGx5TGFiZWwsXG4gIG9uQ2xlYXIsXG4gIG9uQXBwbHksXG59OiBFeHBlbnNlRmlsdGVyQWN0aW9uc1Byb3BzKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJtdC0xIGdyaWQgZ3JpZC1jb2xzLTIgZ2FwLTIgaGlzdG9yeS1maWx0ZXItYWN0aW9uc1wiPlxuICAgICAgPEFjdGlvbkJ1dHRvbiBsYWJlbD17Y2xlYXJMYWJlbH0gY2xhc3NOYW1lPVwidy1mdWxsXCIgb25DbGljaz17b25DbGVhcn0gLz5cbiAgICAgIDxBY3Rpb25CdXR0b24gbGFiZWw9e2FwcGx5TGFiZWx9IGNsYXNzTmFtZT1cInctZnVsbFwiIG9uQ2xpY2s9e29uQXBwbHl9IC8+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlRmlsdGVyQWN0aW9ucztcbiIsICJpbXBvcnQgUmVhY3QsIHsgdXNlTWVtbyB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFNlbGVjdENvbWJvYm94IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvU2VsZWN0Q29tYm9ib3gudHN4XCI7XG5pbXBvcnQgdHlwZSB7IEF1dGhNYW5hZ2VkVXNlciB9IGZyb20gXCIuLi8uLi8uLi9jb250ZXh0L0F1dGhDb250ZXh0LnRzeFwiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2VsZWN0T3B0aW9uIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VTZWxlY3RPcHRpb25zLnRzXCI7XG5cbnR5cGUgRXhwZW5zZU1hbmFnZWRVc2VyRmlsdGVyU2VsZWN0UHJvcHMgPSB7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG4gIHZhbHVlOiBzdHJpbmc7XG4gIHVzZXJzOiBBdXRoTWFuYWdlZFVzZXJbXTtcbiAgYWxsT3B0aW9uPzogRXhwZW5zZVNlbGVjdE9wdGlvbiB8IG51bGw7XG4gIG9uQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgcmVhZE9ubHk/OiBib29sZWFuO1xuICBkaXNhYmxlZD86IGJvb2xlYW47XG4gIHNob3dMYWJlbD86IGJvb2xlYW47XG4gIGNsZWFyT25FbXB0eUlucHV0PzogYm9vbGVhbjtcbn07XG5cbmNvbnN0IHRvT3B0aW9uVGV4dCA9ICh1c2VyOiBBdXRoTWFuYWdlZFVzZXIpOiBzdHJpbmcgPT4ge1xuICBjb25zdCBheFVzZXJJZCA9IFN0cmluZyh1c2VyLmF4VXNlcklkIHx8IFwiXCIpLnRyaW0oKTtcbiAgY29uc3QgbmFtZSA9IFN0cmluZyh1c2VyLm5hbWUgfHwgXCJcIikudHJpbSgpO1xuICBpZiAoIWF4VXNlcklkKSByZXR1cm4gXCJcIjtcbiAgaWYgKCFuYW1lIHx8IG5hbWUudG9VcHBlckNhc2UoKSA9PT0gYXhVc2VySWQudG9VcHBlckNhc2UoKSkge1xuICAgIHJldHVybiBheFVzZXJJZDtcbiAgfVxuICByZXR1cm4gYCR7YXhVc2VySWR9IC0gJHtuYW1lfWA7XG59O1xuXG4vLyBGaXhlZCBsb2NhbCB1c2VyIHNlbGVjdG9yIHVzZWQgdG8gZmlsdGVyIGV4cGVuc2Ugc2hlZXRzIGJ5IG1hbmFnZWQgQXggdXNlci5cbmNvbnN0IEV4cGVuc2VNYW5hZ2VkVXNlckZpbHRlclNlbGVjdCA9ICh7XG4gIGxhYmVsLFxuICBwbGFjZWhvbGRlcixcbiAgdmFsdWUsXG4gIHVzZXJzLFxuICBhbGxPcHRpb24gPSBudWxsLFxuICBvbkNoYW5nZSxcbiAgcmVhZE9ubHkgPSBmYWxzZSxcbiAgZGlzYWJsZWQgPSBmYWxzZSxcbiAgc2hvd0xhYmVsID0gdHJ1ZSxcbiAgY2xlYXJPbkVtcHR5SW5wdXQgPSBmYWxzZSxcbn06IEV4cGVuc2VNYW5hZ2VkVXNlckZpbHRlclNlbGVjdFByb3BzKSA9PiB7XG4gIGNvbnN0IG9wdGlvbnMgPSB1c2VNZW1vPEV4cGVuc2VTZWxlY3RPcHRpb25bXT4oKCkgPT4ge1xuICAgIGNvbnN0IHVzZXJPcHRpb25zID0gKEFycmF5LmlzQXJyYXkodXNlcnMpID8gdXNlcnMgOiBbXSlcbiAgICAgIC5tYXAoKGVudHJ5KSA9PiB7XG4gICAgICAgIGNvbnN0IGF4VXNlcklkID0gU3RyaW5nKGVudHJ5LmF4VXNlcklkIHx8IFwiXCIpLnRyaW0oKTtcbiAgICAgICAgY29uc3QgbGFiZWwgPSB0b09wdGlvblRleHQoZW50cnkpO1xuICAgICAgICBpZiAoIWF4VXNlcklkIHx8ICFsYWJlbCkgcmV0dXJuIG51bGw7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdmFsdWU6IGF4VXNlcklkLFxuICAgICAgICAgIHRleHQ6IGxhYmVsLFxuICAgICAgICB9IGFzIEV4cGVuc2VTZWxlY3RPcHRpb247XG4gICAgICB9KVxuICAgICAgLmZpbHRlcigoZW50cnkpOiBlbnRyeSBpcyBFeHBlbnNlU2VsZWN0T3B0aW9uID0+ICEhZW50cnkpO1xuICAgIHJldHVybiBhbGxPcHRpb24gPyBbYWxsT3B0aW9uLCAuLi51c2VyT3B0aW9uc10gOiB1c2VyT3B0aW9ucztcbiAgfSwgW2FsbE9wdGlvbiwgdXNlcnNdKTtcblxuICBjb25zdCBzZWxlY3RlZFRleHRNb2RlID0gYWxsT3B0aW9uICYmIHZhbHVlID09PSBhbGxPcHRpb24udmFsdWUgPyBcInRleHRcIiA6IFwidmFsdWVcIjtcblxuICByZXR1cm4gKFxuICAgIDxTZWxlY3RDb21ib2JveFxuICAgICAgbGFiZWw9e2xhYmVsfVxuICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxuICAgICAgb3B0aW9ucz17b3B0aW9uc31cbiAgICAgIHZhbHVlPXt2YWx1ZX1cbiAgICAgIG9uQ2hhbmdlPXtvbkNoYW5nZX1cbiAgICAgIHJlYWRPbmx5PXtyZWFkT25seX1cbiAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgIGlkQmFzZT1cImV4cGVuc2UtbWFuYWdlZC11c2VyLWZpbHRlclwiXG4gICAgICBwb3J0YWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxuICAgICAgcGFuZWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxuICAgICAgYWxsb3dUZXh0SW5wdXRcbiAgICAgIHNlbGVjdGVkVGV4dE1vZGU9e3NlbGVjdGVkVGV4dE1vZGV9XG4gICAgICBzaG93TGFiZWw9e3Nob3dMYWJlbH1cbiAgICAgIGNsZWFyT25FbXB0eUlucHV0PXtjbGVhck9uRW1wdHlJbnB1dH1cbiAgICAvPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZU1hbmFnZWRVc2VyRmlsdGVyU2VsZWN0O1xuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBGaWx0ZXJCdXR0b24gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9GaWx0ZXJCdXR0b24udHN4XCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVF1aWNrRGF0ZUZpbHRlcklkIH0gZnJvbSBcIi4uL2NvbnN0YW50cy9leHBlbnNlUXVpY2tEYXRlRmlsdGVyQ2F0YWxvZy50c1wiO1xuXG50eXBlIEV4cGVuc2VRdWlja0RhdGVGaWx0ZXJzUHJvcHMgPSB7XG4gIGFjdGl2ZVF1aWNrRmlsdGVyOiBFeHBlbnNlUXVpY2tEYXRlRmlsdGVySWQgfCBudWxsO1xuICBvblF1aWNrRmlsdGVyQ2hhbmdlOiAoZmlsdGVySWQ6IEV4cGVuc2VRdWlja0RhdGVGaWx0ZXJJZCkgPT4gdm9pZDtcbn07XG5cbi8vIFNoYXJlZCBxdWljayBkYXRlIGZpbHRlcnMgdXNlZCBieSBleHBlbnNlIHNoZWV0cyBhbmQgdGlja2V0cyBwYW5lbHMuXG5jb25zdCBFeHBlbnNlUXVpY2tEYXRlRmlsdGVycyA9ICh7IGFjdGl2ZVF1aWNrRmlsdGVyLCBvblF1aWNrRmlsdGVyQ2hhbmdlIH06IEV4cGVuc2VRdWlja0RhdGVGaWx0ZXJzUHJvcHMpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgZ2FwLTIgaGlzdG9yeS1xdWljay1maWx0ZXJzXCIgYXJpYS1sYWJlbD17aW5kVChcIkhpc3RvcnlfRmlsdGVyX0RhdGVcIiwgXCJEYXRlXCIpfT5cbiAgICAgIDxGaWx0ZXJCdXR0b25cbiAgICAgICAgbGFiZWw9e2luZFQoXCJIaXN0b3J5X1F1aWNrX0N1c3RvbVwiLCBcIkRhdGVcIil9XG4gICAgICAgIGFjdGl2ZT17YWN0aXZlUXVpY2tGaWx0ZXIgPT09IFwiY3VzdG9tXCJ9XG4gICAgICAgIGNsYXNzTmFtZT1cInctZnVsbFwiXG4gICAgICAgIG9uQ2xpY2s9eygpID0+IG9uUXVpY2tGaWx0ZXJDaGFuZ2UoXCJjdXN0b21cIil9XG4gICAgICAvPlxuICAgICAgPEZpbHRlckJ1dHRvblxuICAgICAgICBsYWJlbD17aW5kVChcIkhpc3RvcnlfUXVpY2tfN0RheXNcIiwgXCI3IGRheXNcIil9XG4gICAgICAgIGFjdGl2ZT17YWN0aXZlUXVpY2tGaWx0ZXIgPT09IFwiZGF5cy03XCJ9XG4gICAgICAgIGNsYXNzTmFtZT1cInctZnVsbFwiXG4gICAgICAgIG9uQ2xpY2s9eygpID0+IG9uUXVpY2tGaWx0ZXJDaGFuZ2UoXCJkYXlzLTdcIil9XG4gICAgICAvPlxuICAgICAgPEZpbHRlckJ1dHRvblxuICAgICAgICBsYWJlbD17aW5kVChcIkhpc3RvcnlfUXVpY2tfMzBEYXlzXCIsIFwiMzAgZGF5c1wiKX1cbiAgICAgICAgYWN0aXZlPXthY3RpdmVRdWlja0ZpbHRlciA9PT0gXCJkYXlzLTMwXCJ9XG4gICAgICAgIGNsYXNzTmFtZT1cInctZnVsbFwiXG4gICAgICAgIG9uQ2xpY2s9eygpID0+IG9uUXVpY2tGaWx0ZXJDaGFuZ2UoXCJkYXlzLTMwXCIpfVxuICAgICAgLz5cbiAgICAgIDxGaWx0ZXJCdXR0b25cbiAgICAgICAgbGFiZWw9e2luZFQoXCJIaXN0b3J5X1F1aWNrXzkwRGF5c1wiLCBcIjkwIGRheXNcIil9XG4gICAgICAgIGFjdGl2ZT17YWN0aXZlUXVpY2tGaWx0ZXIgPT09IFwiZGF5cy05MFwifVxuICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGxcIlxuICAgICAgICBvbkNsaWNrPXsoKSA9PiBvblF1aWNrRmlsdGVyQ2hhbmdlKFwiZGF5cy05MFwiKX1cbiAgICAgIC8+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlUXVpY2tEYXRlRmlsdGVycztcbiIsICJpbXBvcnQgeyBBcGlGZXRjaEVycm9yIH0gZnJvbSBcIi4uLy4uLy4uL3NlcnZpY2VzL2FwaVNlcnZpY2UudHNcIjtcblxuY29uc3QgQUJPUlRfRVJST1JfTUVTU0FHRV9ISU5UUyA9IFtcbiAgXCJzaWduYWwgaXMgYWJvcnRlZFwiLFxuICBcImFib3J0ZWQgd2l0aG91dCByZWFzb25cIixcbiAgXCJ0aGUgb3BlcmF0aW9uIHdhcyBhYm9ydGVkXCIsXG4gIFwidGhlIHVzZXIgYWJvcnRlZCBhIHJlcXVlc3RcIixcbiAgXCJ1c2VyIGFib3J0ZWQgYSByZXF1ZXN0XCIsXG5dO1xuY29uc3QgUkVUUllBQkxFX0VSUk9SX01FU1NBR0VfSElOVFMgPSBbXG4gIFwiZmFpbGVkIHRvIGZldGNoXCIsXG4gIFwibmV0d29ya2Vycm9yXCIsXG4gIFwibmV0d29yayByZXF1ZXN0IGZhaWxlZFwiLFxuICBcImxvYWQgZmFpbGVkXCIsXG4gIFwidGltZW91dFwiLFxuICBcInRlbXBvcmFyaWx5IHVuYXZhaWxhYmxlXCIsXG5dO1xuY29uc3QgUkVUUllBQkxFX1NUQVRVU19DT0RFUyA9IG5ldyBTZXQoWzQwOCwgNDI5LCA1MDAsIDUwMiwgNTAzLCA1MDRdKTtcbmNvbnN0IERFRkFVTFRfTUFYX0FUVEVNUFRTID0gMjtcbmNvbnN0IERFRkFVTFRfUkVUUllfREVMQVlfTVMgPSAyNTA7XG5cbmV4cG9ydCB0eXBlIEV4cGVuc2VSZWFkUmV0cnlPcHRpb25zID0ge1xuICBtYXhBdHRlbXB0cz86IG51bWJlcjtcbiAgcmV0cnlEZWxheU1zPzogbnVtYmVyO1xuICBzaWduYWw/OiBBYm9ydFNpZ25hbDtcbn07XG5cbmNvbnN0IG5vcm1hbGl6ZUVycm9yVGV4dCA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZyA9PiB7XG4gIHJldHVybiBTdHJpbmcodmFsdWUgfHwgXCJcIikudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG59O1xuXG5leHBvcnQgY29uc3QgaXNFeHBlbnNlQWJvcnRMaWtlRXJyb3IgPSAoZXJyb3I6IHVua25vd24sIHNpZ25hbD86IEFib3J0U2lnbmFsKTogYm9vbGVhbiA9PiB7XG4gIGlmIChzaWduYWw/LmFib3J0ZWQpIHJldHVybiB0cnVlO1xuICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBET01FeGNlcHRpb24gJiYgZXJyb3IubmFtZSA9PT0gXCJBYm9ydEVycm9yXCIpIHJldHVybiB0cnVlO1xuICBpZiAoIShlcnJvciBpbnN0YW5jZW9mIEVycm9yKSkgcmV0dXJuIGZhbHNlO1xuXG4gIGNvbnN0IG5vcm1hbGl6ZWROYW1lID0gbm9ybWFsaXplRXJyb3JUZXh0KGVycm9yLm5hbWUpO1xuICBjb25zdCBub3JtYWxpemVkTWVzc2FnZSA9IG5vcm1hbGl6ZUVycm9yVGV4dChlcnJvci5tZXNzYWdlKTtcbiAgaWYgKG5vcm1hbGl6ZWROYW1lID09PSBcImFib3J0ZXJyb3JcIikgcmV0dXJuIHRydWU7XG5cbiAgcmV0dXJuIEFCT1JUX0VSUk9SX01FU1NBR0VfSElOVFMuc29tZSgoaGludCkgPT4gbm9ybWFsaXplZE1lc3NhZ2UuaW5jbHVkZXMoaGludCkpO1xufTtcblxuY29uc3QgaXNSZXRyeWFibGVFeHBlbnNlUmVhZEVycm9yID0gKGVycm9yOiB1bmtub3duLCBzaWduYWw/OiBBYm9ydFNpZ25hbCk6IGJvb2xlYW4gPT4ge1xuICBpZiAoaXNFeHBlbnNlQWJvcnRMaWtlRXJyb3IoZXJyb3IsIHNpZ25hbCkpIHJldHVybiBmYWxzZTtcblxuICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yKSB7XG4gICAgY29uc3Qgc3RhdHVzID0gTnVtYmVyKGVycm9yLnN0YXR1cyk7XG4gICAgcmV0dXJuIFJFVFJZQUJMRV9TVEFUVVNfQ09ERVMuaGFzKHN0YXR1cyk7XG4gIH1cblxuICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBUeXBlRXJyb3IpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGlmICghKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpKSByZXR1cm4gZmFsc2U7XG5cbiAgY29uc3Qgbm9ybWFsaXplZE1lc3NhZ2UgPSBub3JtYWxpemVFcnJvclRleHQoZXJyb3IubWVzc2FnZSk7XG4gIHJldHVybiBSRVRSWUFCTEVfRVJST1JfTUVTU0FHRV9ISU5UUy5zb21lKChoaW50KSA9PiBub3JtYWxpemVkTWVzc2FnZS5pbmNsdWRlcyhoaW50KSk7XG59O1xuXG5jb25zdCB3YWl0Rm9yUmV0cnlEZWxheSA9IGFzeW5jIChkZWxheU1zOiBudW1iZXIsIHNpZ25hbD86IEFib3J0U2lnbmFsKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gIGlmIChkZWxheU1zIDw9IDApIHJldHVybjtcbiAgaWYgKHNpZ25hbD8uYWJvcnRlZCkge1xuICAgIHRocm93IG5ldyBET01FeGNlcHRpb24oXCJBYm9ydGVkXCIsIFwiQWJvcnRFcnJvclwiKTtcbiAgfVxuXG4gIGF3YWl0IG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBjb25zdCB0aW1lb3V0SWQgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBpZiAoc2lnbmFsKSB7XG4gICAgICAgIHNpZ25hbC5yZW1vdmVFdmVudExpc3RlbmVyKFwiYWJvcnRcIiwgaGFuZGxlQWJvcnQpO1xuICAgICAgfVxuICAgICAgcmVzb2x2ZSgpO1xuICAgIH0sIGRlbGF5TXMpO1xuXG4gICAgY29uc3QgaGFuZGxlQWJvcnQgPSAoKSA9PiB7XG4gICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHRpbWVvdXRJZCk7XG4gICAgICBzaWduYWw/LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJhYm9ydFwiLCBoYW5kbGVBYm9ydCk7XG4gICAgICByZWplY3QobmV3IERPTUV4Y2VwdGlvbihcIkFib3J0ZWRcIiwgXCJBYm9ydEVycm9yXCIpKTtcbiAgICB9O1xuXG4gICAgc2lnbmFsPy5hZGRFdmVudExpc3RlbmVyKFwiYWJvcnRcIiwgaGFuZGxlQWJvcnQsIHsgb25jZTogdHJ1ZSB9KTtcbiAgfSk7XG59O1xuXG4vLyBSZXRyaWVzIGlkZW1wb3RlbnQgZXhwZW5zZSByZWFkIHJlcXVlc3RzIG9uY2UgYWZ0ZXIgdHJhbnNpZW50IGZhaWx1cmVzLlxuZXhwb3J0IGNvbnN0IHJ1bkV4cGVuc2VSZWFkUmVxdWVzdFdpdGhSZXRyeSA9IGFzeW5jIDxUPihcbiAgcmVxdWVzdDogKCkgPT4gUHJvbWlzZTxUPixcbiAgb3B0aW9ucz86IEV4cGVuc2VSZWFkUmV0cnlPcHRpb25zXG4pOiBQcm9taXNlPFQ+ID0+IHtcbiAgY29uc3QgbWF4QXR0ZW1wdHNSYXcgPSBOdW1iZXIob3B0aW9ucz8ubWF4QXR0ZW1wdHMgPz8gREVGQVVMVF9NQVhfQVRURU1QVFMpO1xuICBjb25zdCBtYXhBdHRlbXB0cyA9IE51bWJlci5pc0Zpbml0ZShtYXhBdHRlbXB0c1JhdykgJiYgbWF4QXR0ZW1wdHNSYXcgPiAwID8gTWF0aC5mbG9vcihtYXhBdHRlbXB0c1JhdykgOiBERUZBVUxUX01BWF9BVFRFTVBUUztcbiAgY29uc3QgcmV0cnlEZWxheVJhdyA9IE51bWJlcihvcHRpb25zPy5yZXRyeURlbGF5TXMgPz8gREVGQVVMVF9SRVRSWV9ERUxBWV9NUyk7XG4gIGNvbnN0IHJldHJ5RGVsYXlNcyA9IE51bWJlci5pc0Zpbml0ZShyZXRyeURlbGF5UmF3KSAmJiByZXRyeURlbGF5UmF3ID49IDAgPyByZXRyeURlbGF5UmF3IDogREVGQVVMVF9SRVRSWV9ERUxBWV9NUztcbiAgY29uc3Qgc2lnbmFsID0gb3B0aW9ucz8uc2lnbmFsO1xuXG4gIGxldCBsYXN0RXJyb3I6IHVua25vd24gPSBudWxsO1xuXG4gIGZvciAobGV0IGF0dGVtcHQgPSAxOyBhdHRlbXB0IDw9IG1heEF0dGVtcHRzOyBhdHRlbXB0ICs9IDEpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGF3YWl0IHJlcXVlc3QoKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbGFzdEVycm9yID0gZXJyb3I7XG4gICAgICBpZiAoIWlzUmV0cnlhYmxlRXhwZW5zZVJlYWRFcnJvcihlcnJvciwgc2lnbmFsKSB8fCBhdHRlbXB0ID49IG1heEF0dGVtcHRzKSB7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgICAgfVxuXG4gICAgICBhd2FpdCB3YWl0Rm9yUmV0cnlEZWxheShyZXRyeURlbGF5TXMgKiBhdHRlbXB0LCBzaWduYWwpO1xuICAgIH1cbiAgfVxuXG4gIHRocm93IGxhc3RFcnJvciBpbnN0YW5jZW9mIEVycm9yID8gbGFzdEVycm9yIDogbmV3IEVycm9yKFwiRXhwZW5zZSByZWFkIHJlcXVlc3QgZmFpbGVkLlwiKTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFVQSxJQUFNLDRCQUE0QjtBQUNsQyxJQUFNLDZCQUE2QixvQkFBSSxJQUFZLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFDO0FBRWxGLElBQU0sNEJBQTRCLENBQUMsVUFBb0M7QUFDckUsU0FBTyxPQUFPLFVBQVUsS0FBSyxLQUFLLE9BQU8sS0FBSyxLQUFLLEtBQUssT0FBTyxLQUFLLEtBQUs7QUFDM0U7QUFHQSxJQUFNLDRCQUE0QixDQUFDLGlCQUF3QztBQUN6RSxNQUFJLGlCQUFpQiwrQkFBK0I7QUFDbEQsV0FBTztBQUFBLEVBQ1Q7QUFFQSxNQUFJLENBQUMsMEJBQTBCLFlBQVksR0FBRztBQUM1QyxXQUFPO0FBQUEsRUFDVDtBQUVBLFNBQU87QUFDVDtBQUVBLElBQU0sd0JBQXdCLENBQUMsVUFBa0Q7QUFDL0UsUUFBTSxVQUFVLE9BQU8sU0FBUyxFQUFFLEVBQUUsS0FBSztBQUN6QyxTQUFPLFVBQVUsVUFBVTtBQUM3QjtBQUVBLElBQU0sNkJBQTZCLENBQ2pDLFVBQ21CO0FBQ25CLE1BQUksVUFBVSxPQUFPO0FBQ25CLFdBQU87QUFBQSxFQUNUO0FBRUEsTUFBSSxVQUFVLE1BQU07QUFDbEIsV0FBTztBQUFBLEVBQ1Q7QUFFQSxTQUFPO0FBQ1Q7QUFFQSxJQUFNLDRCQUE0QixDQUNoQyxVQUNpQjtBQUNqQixTQUFPLFVBQVUsS0FBSyxVQUFVLElBQUksUUFBUTtB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QUFJLGlCQUFpQixXQUFXO0FBQzlCLFdBQU87QUFBQSxFQUNUO0FBRUEsTUFBSSxFQUFFLGlCQUFpQixPQUFRLFFBQU87QUFFdEMsUUFBTSxvQkFBb0IsbUJBQW1CLE1BQU0sT0FBTztBQUMxRCxTQUFPLDhCQUE4QixLQUFLLENBQUMsU0FBUyxrQkFBa0IsU0FBUyxJQUFJLENBQUM7QUFDdEY7QUFFQSxJQUFNLG9CQUFvQixPQUFPLFNBQWlCLFdBQXdDO0FBQ3hGLE1BQUksV0FBVyxFQUFHO0FBQ2xCLE1BQUksUUFBUSxTQUFTO0FBQ25CLFVBQU0sSUFBSSxhQUFhLFdBQVcsWUFBWTtBQUFBLEVBQ2hEO0FBRUEsUUFBTSxJQUFJLFFBQWMsQ0FBQyxTQUFTLFdBQVc7QUFDM0MsVUFBTSxZQUFZLE9BQU8sV0FBVyxNQUFNO0FBQ3hDLFVBQUksUUFBUTtBQUNWLGVBQU8sb0JBQW9CLFNBQVMsV0FBVztBQUFBLE1BQ2pEO0FBQ0EsY0FBUTtBQUFBLElBQ1YsR0FBRyxPQUFPO0FBRVYsVUFBTSxjQUFjLE1BQU07QUFDeEIsYUFBTyxhQUFhLFNBQVM7QUFDN0IsY0FBUSxvQkFBb0IsU0FBUyxXQUFXO0FBQ2hELGFBQU8sSUFBSSxhQUFhLFdBQVcsWUFBWSxDQUFDO0FBQUEsSUFDbEQ7QUFFQSxZQUFRLGlCQUFpQixTQUFTLGFBQWEsRUFBRSxNQUFNLEtBQUssQ0FBQztBQUFBLEVBQy9ELENBQUM7QUFDSDtBQUdPLElBQU0saUNBQWlDLE9BQzVDLFNBQ0EsWUFDZTtBQUNmLFFBQU0saUJBQWlCLE9BQU8sU0FBUyxlQUFlLG9CQUFvQjtBQUMxRSxRQUFNLGNBQWMsT0FBTyxTQUFTLGNBQWMsS0FBSyxpQkFBaUIsSUFBSSxLQUFLLE1BQU0sY0FBYyxJQUFJO0FBQ3pHLFFBQU0sZ0JBQWdCLE9BQU8sU0FBUyxnQkFBZ0Isc0JBQXNCO0FBQzVFLFFBQU0sZUFBZSxPQUFPLFNBQVMsYUFBYSxLQUFLLGlCQUFpQixJQUFJLGdCQUFnQjtBQUM1RixRQUFNLFNBQVMsU0FBUztBQUV4QixNQUFJLFlBQXFCO0FBRXpCLFdBQVMsVUFBVSxHQUFHLFdBQVcsYUFBYSxXQUFXLEdBQUc7QUFDMUQsUUFBSTtBQUNGLGFBQU8sTUFBTSxRQUFRO0FBQUEsSUFDdkIsU0FBUyxPQUFPO0FBQ2Qsa0JBQVk7QUFDWixVQUFJLENBQUMsNEJBQTRCLE9BQU8sTUFBTSxLQUFLLFdBQVcsYUFBYTtBQUN6RSxjQUFNO0FBQUEsTUFDUjtBQUVBLFlBQU0sa0JBQWtCLGVBQWUsU0FBUyxNQUFNO0FBQUEsSUFDeEQ7QUFBQSxFQUNGO0FBRUEsUUFBTSxxQkFBcUIsUUFBUSxZQUFZLElBQUksTUFBTSw4QkFBOEI7QUFDekY7IiwKICAibmFtZXMiOiBbImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImxhYmVsIiwgImltcG9ydF9qc3hfcnVudGltZSJdCn0K
