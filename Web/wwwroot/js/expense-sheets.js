import {
  ActionButton_default,
  FilterButton_default,
  HistoryManualDatePicker_default,
  HistorySummary_default
} from "./chunks/chunk-BPJ5F64S.js";
import {
  ExpenseCurrencyFilterSelect_default,
  ExpenseProjectFilterInput_default,
  ExpenseTimelineCard_default,
  RemoteSearchCombobox_default
} from "./chunks/chunk-SPX7OF4P.js";
import {
  CompactPagination_default,
  useTimelineCardEffects
} from "./chunks/chunk-TJCFPVBB.js";
import "./chunks/chunk-6HMZLOGF.js";
import {
  fetchExpenseSheetList,
  formatAmountWithCurrency,
  formatExpenseDateParts,
  formatExpenseDisplayDate,
  hasAssignedVoucher,
  navigateToExpenseUrl,
  safeText,
  startOfDay,
  toIsoDate
} from "./chunks/chunk-CHD5EVDL.js";
import {
  SelectCombobox_default,
  VisitasPageProviders_default
} from "./chunks/chunk-WPRFFVHK.js";
import {
  FloatingActionButton_default
} from "./chunks/chunk-3H4F5G6V.js";
import {
  ApiFetchError,
  canAccess,
  classNames,
  indT,
  showPermissionModal
} from "./chunks/chunk-FICWEV5U.js";
import {
  getSessionJsonWithExpiry,
  getSessionValueWithExpiry,
  removeSessionValueWithExpiry,
  setSessionJsonWithExpiry,
  setSessionValueWithExpiry
} from "./chunks/chunk-7SKLSV7K.js";
import {
  mountReactIsland,
  mountWhenDocumentReady,
  require_jsx_runtime,
  require_react
} from "./chunks/chunk-BWM3JLWG.js";
import {
  __toESM
} from "./chunks/chunk-45FWCHS2.js";

// Web/wwwroot/react/src/pages/gastos/list/ExpenseSheetsPage.tsx
var import_react7 = __toESM(require_react());

// Web/wwwroot/react/src/pages/gastos/components/ExpenseBilledModeFilterSelect.tsx
var import_react = __toESM(require_react());
var import_jsx_runtime = __toESM(require_jsx_runtime());
var ExpenseBilledModeFilterSelect = ({
  label,
  placeholder,
  value,
  onChange,
  readOnly = false,
  disabled = false,
  showLabel = true
}) => {
  const options = (0, import_react.useMemo)(
    () => [
      { value: "0", text: indT("ExpenseSheets_Filter_Status_Unbilled", "No Pagado") },
      { value: "1", text: indT("ExpenseSheets_Filter_Status_Billed", "Pagado") },
      { value: "2", text: indT("ExpenseSheets_Filter_Status_Both", "Ambos") }
    ],
    []
  );
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    SelectCombobox_default,
    {
      label,
      placeholder,
      options,
      value,
      onChange: (nextValue) => {
        const parsed = Number(nextValue);
        if (parsed === 0 || parsed === 1 || parsed === 2) {
          onChange(parsed);
          return;
        }
        onChange(2);
      },
      readOnly,
      disabled,
      idBase: "expense-billed-mode",
      portalClassName: "visitas-typography",
      panelClassName: "visitas-typography",
      allowTextInput: false,
      showLabel
    }
  );
};
var ExpenseBilledModeFilterSelect_default = ExpenseBilledModeFilterSelect;

// Web/wwwroot/react/src/pages/gastos/components/ExpenseDateRangeFilter.tsx
var import_react2 = __toESM(require_react());

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
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var ExpenseDateRangeFilter = ({
  fromDate,
  toDate,
  onChange,
  autoOpenRequestId = 0,
  showManualError = false,
  showStartError = false,
  showEndError = false
}) => {
  const locale = (0, import_react2.useMemo)(() => resolveUiLocale(), []);
  const activatorRef = (0, import_react2.useRef)(null);
  const popoverRef = (0, import_react2.useRef)(null);
  const [startDate, setStartDate] = (0, import_react2.useState)(() => parseIsoDateRangeValue(fromDate));
  const [endDate, setEndDate] = (0, import_react2.useState)(() => parseIsoDateRangeValue(toDate));
  const [hoverDate, setHoverDate] = (0, import_react2.useState)(null);
  const [selectingStep, setSelectingStep] = (0, import_react2.useState)("start");
  const [isOpen, setIsOpen] = (0, import_react2.useState)(false);
  const now = (0, import_react2.useMemo)(() => /* @__PURE__ */ new Date(), []);
  const [currentMonth, setCurrentMonth] = (0, import_react2.useState)((parseIsoDateRangeValue(fromDate) || now).getMonth());
  const [currentYear, setCurrentYear] = (0, import_react2.useState)((parseIsoDateRangeValue(fromDate) || now).getFullYear());
  (0, import_react2.useEffect)(() => {
    setStartDate(parseIsoDateRangeValue(fromDate));
  }, [fromDate]);
  (0, import_react2.useEffect)(() => {
    setEndDate(parseIsoDateRangeValue(toDate));
  }, [toDate]);
  (0, import_react2.useEffect)(() => {
    onChange(startDate ? toIsoDateRangeValue(startDate) : "", endDate ? toIsoDateRangeValue(endDate) : "");
  }, [startDate, endDate, onChange]);
  (0, import_react2.useEffect)(() => {
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
  const openPopover = (0, import_react2.useCallback)(
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
  (0, import_react2.useEffect)(() => {
    if (autoOpenRequestId <= 0) return;
    setSelectingStep("start");
    setIsOpen(true);
    setHoverDate(null);
    const base = startDate || endDate || now;
    setCurrentMonth(base.getMonth());
    setCurrentYear(base.getFullYear());
  }, [autoOpenRequestId]);
  const onActivatorKeyDown = (0, import_react2.useCallback)(
    (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      openPopover("start");
    },
    [openPopover]
  );
  const onSectionKeyDown = (0, import_react2.useCallback)(
    (event, section) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      openPopover(section);
    },
    [openPopover]
  );
  const onClear = (0, import_react2.useCallback)((event) => {
    event.preventDefault();
    event.stopPropagation();
    setStartDate(null);
    setEndDate(null);
    setHoverDate(null);
    setSelectingStep("start");
  }, []);
  const onPrevMonth = (0, import_react2.useCallback)((event) => {
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
  const onNextMonth = (0, import_react2.useCallback)((event) => {
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
  const onDayClick = (0, import_react2.useCallback)(
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
        if (isBeforeDay(nextDate, startDate)) {
          setEndDate(startDate);
          setStartDate(nextDate);
        } else {
          setEndDate(nextDate);
        }
        setSelectingStep("done");
        setIsOpen(false);
        setHoverDate(null);
      }
    },
    [endDate, selectingStep, startDate]
  );
  const onDayHover = (0, import_react2.useCallback)(
    (day) => {
      if (!day.date || selectingStep !== "end" || !startDate) return;
      setHoverDate(new Date(day.date.getFullYear(), day.date.getMonth(), day.date.getDate()));
    },
    [selectingStep, startDate]
  );
  const onGridMouseLeave = (0, import_react2.useCallback)(() => {
    setHoverDate(null);
  }, []);
  const calendar = (0, import_react2.useMemo)(() => {
    return buildCalendarMonth(currentYear, currentMonth, locale);
  }, [currentMonth, currentYear, locale]);
  const dayCells = (0, import_react2.useMemo)(
    () => buildDateRangeDayCells(calendar.cells, startDate, endDate, hoverDate, selectingStep),
    [calendar.cells, endDate, hoverDate, selectingStep, startDate]
  );
  const labelFrom = toSentenceCase(indT("History_From", "From"), locale);
  const labelTo = toSentenceCase(indT("History_To", "To"), locale);
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
var ExpenseFilterActions = ({
  clearLabel,
  applyLabel,
  onClear,
  onApply
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "mt-1 grid grid-cols-2 gap-2 history-filter-actions", children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ActionButton_default, { label: clearLabel, className: "w-full", onClick: onClear }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ActionButton_default, { label: applyLabel, className: "w-full", onClick: onApply })
  ] });
};
var ExpenseFilterActions_default = ExpenseFilterActions;

// Web/wwwroot/react/src/pages/gastos/components/ExpenseSheetFilterInput.tsx
var import_react3 = __toESM(require_react());

// Web/wwwroot/react/src/pages/gastos/utils/expensePayloadBuilders.ts
var DEFAULT_SUGGEST_PAGE_SIZE = 50;
var buildExpenseListPayload = (filters, page, pageSize) => {
  const nextPage = Number.isFinite(page) && page > 0 ? page : 1;
  const nextPageSize = Number.isFinite(pageSize) && pageSize > 0 ? pageSize : DEFAULT_SUGGEST_PAGE_SIZE;
  const safeFilter = String(filters.filter || filters.hojaGastosId || "").trim();
  return {
    filter: safeFilter,
    billedMode: filters.billedMode,
    fromDate: filters.fromDate,
    toDate: filters.toDate,
    projectId: filters.projectId,
    hojaGastosId: filters.hojaGastosId,
    currencyCode: filters.currencyCode,
    page: nextPage,
    pageSize: nextPageSize
  };
};
var buildExpenseSheetSuggestPayload = (term, pageSize = DEFAULT_SUGGEST_PAGE_SIZE, page = 1) => {
  const safeTerm = String(term || "").trim();
  const nextPageSize = Number.isFinite(pageSize) && pageSize > 0 ? pageSize : DEFAULT_SUGGEST_PAGE_SIZE;
  const nextPage = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
  return {
    filter: safeTerm,
    billedMode: 2,
    fromDate: "",
    toDate: "",
    projectId: "",
    hojaGastosId: "",
    currencyCode: "",
    page: nextPage,
    pageSize: nextPageSize
  };
};

// Web/wwwroot/react/src/pages/gastos/components/ExpenseSheetFilterInput.tsx
var import_jsx_runtime4 = __toESM(require_jsx_runtime());
var SEARCH_PAGE_SIZE = 10;
var mapSheetOptions = (items) => {
  return (Array.isArray(items) ? items : []).map((item) => {
    const id = String(item?.hojaGastosId || "").trim();
    if (!id) return null;
    return {
      value: id,
      title: id,
      subtitle: String(item?.description || "").trim() || "-"
    };
  }).filter(Boolean);
};
var ExpenseSheetFilterInput = ({
  label,
  placeholder,
  value,
  onChange,
  enableRemoteSuggestions = true,
  disabled = false,
  readOnly = false,
  showLabel = true
}) => {
  const readOnlyMode = readOnly || disabled;
  const loadOptions = (0, import_react3.useCallback)(async (term, signal) => {
    const payload = buildExpenseSheetSuggestPayload(term, SEARCH_PAGE_SIZE, 1);
    const response = await fetchExpenseSheetList(payload, {
      suppressPermissionModal: true,
      signal
    });
    return mapSheetOptions(response?.items);
  }, []);
  const loadOptionsPage = (0, import_react3.useCallback)(async (term, page, pageSize, signal) => {
    const payload = buildExpenseSheetSuggestPayload(term, pageSize, page);
    const response = await fetchExpenseSheetList(payload, {
      suppressPermissionModal: true,
      signal
    });
    return {
      items: mapSheetOptions(response?.items),
      total: Number(response?.total || 0)
    };
  }, []);
  if (!enableRemoteSuggestions || readOnlyMode) {
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "space-y-2", children: [
      showLabel ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("label", { className: "form-label font-semibold", style: { color: "#00296be0" }, children: label }) : null,
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        "input",
        {
          className: "w-full rounded-xl border border-slate-200 px-3 py-2 text-sm sm:text-base leading-5 text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-primary focus:border-primary",
          value,
          onChange: (event) => onChange(event.target.value),
          placeholder,
          "aria-label": label,
          readOnly,
          disabled
        }
      )
    ] });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
    RemoteSearchCombobox_default,
    {
      label,
      placeholder,
      value,
      onChange,
      onSearch: async (term, signal) => {
        try {
          return await loadOptions(term, signal);
        } catch (error) {
          if (error instanceof ApiFetchError && error.status === 403) {
            return [];
          }
          throw error;
        }
      },
      onSearchPage: async (term, page, pageSize, signal) => {
        try {
          return await loadOptionsPage(term, page, pageSize, signal);
        } catch (error) {
          if (error instanceof ApiFetchError && error.status === 403) {
            return { items: [], total: 0 };
          }
          throw error;
        }
      },
      idBase: "expense-sheet-filter",
      minSearchLength: 0,
      pageSize: SEARCH_PAGE_SIZE,
      allowEmptySearch: true,
      loadOnOpen: true,
      infiniteScroll: true,
      disabled,
      readOnly,
      showLabel,
      panelClassName: "visitas-typography"
    }
  );
};
var ExpenseSheetFilterInput_default = ExpenseSheetFilterInput;

// Web/wwwroot/react/src/pages/gastos/components/ExpenseFiltersPanel.tsx
var import_jsx_runtime5 = __toESM(require_jsx_runtime());
var parseIsoDate = (raw) => {
  if (!raw) return null;
  const value = String(raw).trim().split("T")[0];
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
};
var formatDate = (raw, locale) => {
  const date = parseIsoDate(raw);
  if (!date) return "--";
  return date.toLocaleDateString(locale, {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).replace(/\./g, "").toLowerCase();
};
var ExpenseFiltersPanel = ({
  visible,
  showManualDateFilter,
  manualDateAutoOpenKey,
  fromDate,
  toDate,
  projectId,
  hojaGastosId,
  currencyCode,
  billedMode,
  activeQuickFilter,
  showManualDateError,
  onDateRangeChange,
  onQuickFilterChange,
  onProjectIdChange,
  onHojaGastosIdChange,
  onCurrencyCodeChange,
  onBilledModeChange,
  onClear,
  onApply
}) => {
  if (!visible) return null;
  const locale = document?.documentElement?.lang || "es-ES";
  const showInlineDateSummary = !showManualDateFilter && !!fromDate && !!toDate;
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "filter-card filter-card--expanded p-2 sm:p-2.5 relative", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "history-filter-stack flex flex-col space-y-2", children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "grid grid-cols-2 gap-2 history-quick-filters", "aria-label": indT("History_Filter_Date", "Date"), children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
        FilterButton_default,
        {
          label: indT("History_Quick_Custom", "Date"),
          active: activeQuickFilter === "custom",
          className: "w-full",
          onClick: () => onQuickFilterChange("custom")
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
        FilterButton_default,
        {
          label: indT("History_Quick_7Days", "7 days"),
          active: activeQuickFilter === "days-7",
          className: "w-full",
          onClick: () => onQuickFilterChange("days-7")
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
        FilterButton_default,
        {
          label: indT("History_Quick_30Days", "30 days"),
          active: activeQuickFilter === "days-30",
          className: "w-full",
          onClick: () => onQuickFilterChange("days-30")
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
        FilterButton_default,
        {
          label: indT("History_Quick_90Days", "90 days"),
          active: activeQuickFilter === "days-90",
          className: "w-full",
          onClick: () => onQuickFilterChange("days-90")
        }
      )
    ] }),
    showManualDateFilter ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
      ExpenseDateRangeFilter_default,
      {
        fromDate,
        toDate,
        onChange: onDateRangeChange,
        autoOpenRequestId: manualDateAutoOpenKey,
        showManualError: showManualDateError,
        showStartError: showManualDateError && !fromDate,
        showEndError: showManualDateError && !toDate
      }
    ) : showInlineDateSummary ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
      HistorySummary_default,
      {
        summaryFromLabel: indT("History_From", "From"),
        summaryToLabel: indT("History_To", "To"),
        fromValue: formatDate(fromDate, locale),
        toValue: formatDate(toDate, locale),
        className: "gap-y-1 text-[11px] px-1"
      }
    ) : null,
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "grid grid-cols-1 sm:grid-cols-4 gap-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
        ExpenseProjectFilterInput_default,
        {
          label: indT("ExpenseSheets_Filter_Project", "Project"),
          placeholder: indT("ExpenseSheets_Filter_Project", "Project"),
          value: projectId,
          onChange: onProjectIdChange,
          showLabel: false
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
        ExpenseSheetFilterInput_default,
        {
          label: indT("ExpenseSheets_Filter_Sheet", "Expense sheet"),
          placeholder: indT("ExpenseSheets_Filter_Sheet", "Expense sheet"),
          value: hojaGastosId,
          onChange: onHojaGastosIdChange,
          enableRemoteSuggestions: true,
          showLabel: false
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
        ExpenseCurrencyFilterSelect_default,
        {
          label: indT("ExpenseSheets_Filter_Currency", "Currency"),
          placeholder: indT("ExpenseSheets_Filter_Currency", "Currency"),
          value: currencyCode,
          onChange: onCurrencyCodeChange,
          showLabel: false
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
        ExpenseBilledModeFilterSelect_default,
        {
          label: indT("ExpenseSheets_Filter_Status", "Estado"),
          placeholder: indT("ExpenseSheets_Filter_Status", "Estado"),
          value: billedMode,
          onChange: onBilledModeChange,
          showLabel: false
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
      ExpenseFilterActions_default,
      {
        clearLabel: indT("History_Filter_Clear", "Clear"),
        applyLabel: indT("History_Filter_Apply", "Apply"),
        onClear,
        onApply
      }
    )
  ] }) });
};
var ExpenseFiltersPanel_default = ExpenseFiltersPanel;

// Web/wwwroot/react/src/pages/gastos/list/useExpenseSheetsListData.ts
var import_react4 = __toESM(require_react());
var useExpenseSheetsListData = ({ hasAccess, pageSize, onForbidden }) => {
  const [items, setItems] = (0, import_react4.useState)([]);
  const [total, setTotal] = (0, import_react4.useState)(0);
  const [currentPage, setCurrentPage] = (0, import_react4.useState)(1);
  const [isLoading, setIsLoading] = (0, import_react4.useState)(false);
  const [errorMessage, setErrorMessage] = (0, import_react4.useState)("");
  const loadList = (0, import_react4.useCallback)(
    async (page, filters) => {
      if (!hasAccess) {
        onForbidden();
        return;
      }
      setIsLoading(true);
      setErrorMessage("");
      const payload = buildExpenseListPayload(filters, page, pageSize);
      try {
        const response = await fetchExpenseSheetList(payload, {
          suppressPermissionModal: true
        });
        if (response?.success === false) {
          setErrorMessage(response.message || indT("ExpenseSheets_LoadError", "Could not load expense sheets."));
          setItems([]);
          setTotal(0);
          setCurrentPage(page);
          return;
        }
        const nextItems = Array.isArray(response?.items) ? response.items : [];
        const nextTotal = Number(response?.total || nextItems.length || 0);
        setItems(nextItems);
        setTotal(nextTotal);
        setCurrentPage(page);
      } catch (error) {
        if (error instanceof ApiFetchError && error.status === 403) {
          onForbidden();
          return;
        }
        const message = error instanceof Error ? error.message : indT("ExpenseSheets_LoadError", "Could not load expense sheets.");
        setErrorMessage(message);
        setItems([]);
        setTotal(0);
        setCurrentPage(page);
      } finally {
        setIsLoading(false);
      }
    },
    [hasAccess, onForbidden, pageSize]
  );
  const resetList = (0, import_react4.useCallback)(() => {
    setItems([]);
    setTotal(0);
    setCurrentPage(1);
    setErrorMessage("");
  }, []);
  return {
    items,
    total,
    currentPage,
    isLoading,
    errorMessage,
    loadList,
    resetList
  };
};

// Web/wwwroot/react/src/pages/gastos/list/useExpenseSheetsFiltersState.ts
var import_react5 = __toESM(require_react());

// Web/wwwroot/react/src/pages/gastos/list/expenseFilterSnapshot.ts
var normalizeExpenseFilterSnapshot = (value) => {
  const billedModeRaw = Number(value?.billedMode);
  const billedMode = Number.isFinite(billedModeRaw) && billedModeRaw >= 0 && billedModeRaw <= 2 ? billedModeRaw : 2;
  const hojaGastosId = String(value?.hojaGastosId || "").trim();
  return {
    fromDate: String(value?.fromDate || "").trim(),
    toDate: String(value?.toDate || "").trim(),
    projectId: String(value?.projectId || "").trim(),
    hojaGastosId,
    currencyCode: String(value?.currencyCode || "").trim(),
    billedMode,
    filter: String(value?.filter || hojaGastosId || "").trim()
  };
};

// Web/wwwroot/react/src/pages/gastos/list/useExpenseSheetsFiltersState.ts
var useExpenseSheetsFiltersState = ({ onApplyFilters, onClearFilters }) => {
  const [fromDate, setFromDate] = (0, import_react5.useState)("");
  const [toDate, setToDate] = (0, import_react5.useState)("");
  const [projectId, setProjectId] = (0, import_react5.useState)("");
  const [hojaGastosId, setHojaGastosId] = (0, import_react5.useState)("");
  const [currencyCode, setCurrencyCode] = (0, import_react5.useState)("");
  const [billedMode, setBilledMode] = (0, import_react5.useState)(2);
  const [activeQuickFilter, setActiveQuickFilter] = (0, import_react5.useState)(null);
  const [showManualDateFilter, setShowManualDateFilter] = (0, import_react5.useState)(false);
  const [showManualDateError, setShowManualDateError] = (0, import_react5.useState)(false);
  const [manualDateAutoOpenKey, setManualDateAutoOpenKey] = (0, import_react5.useState)(0);
  const [appliedFilters, setAppliedFilters] = (0, import_react5.useState)(null);
  const [showFilters, setShowFilters] = (0, import_react5.useState)(true);
  const currentFilters = (0, import_react5.useMemo)(
    () => ({
      fromDate,
      toDate,
      projectId,
      hojaGastosId,
      currencyCode,
      billedMode,
      filter: hojaGastosId
    }),
    [billedMode, currencyCode, fromDate, hojaGastosId, projectId, toDate]
  );
  const onApply = (0, import_react5.useCallback)(() => {
    if (!fromDate || !toDate) {
      setShowManualDateError(true);
      setShowManualDateFilter(true);
      setActiveQuickFilter("custom");
      return;
    }
    const snapshot = {
      fromDate,
      toDate,
      projectId,
      hojaGastosId,
      currencyCode,
      billedMode,
      filter: hojaGastosId
    };
    setShowManualDateError(false);
    setAppliedFilters(snapshot);
    setShowManualDateFilter(false);
    setShowFilters(false);
    onApplyFilters(snapshot);
  }, [billedMode, currencyCode, fromDate, hojaGastosId, onApplyFilters, projectId, toDate]);
  const restoreAppliedFilters = (0, import_react5.useCallback)((snapshot) => {
    const normalized = normalizeExpenseFilterSnapshot(snapshot);
    setFromDate(normalized.fromDate);
    setToDate(normalized.toDate);
    setProjectId(normalized.projectId);
    setHojaGastosId(normalized.hojaGastosId);
    setCurrencyCode(normalized.currencyCode);
    setBilledMode(normalized.billedMode);
    setActiveQuickFilter(null);
    setShowManualDateFilter(false);
    setShowManualDateError(false);
    setAppliedFilters(normalized);
    setShowFilters(false);
  }, []);
  const onClear = (0, import_react5.useCallback)(() => {
    setFromDate("");
    setToDate("");
    setProjectId("");
    setHojaGastosId("");
    setCurrencyCode("");
    setBilledMode(2);
    setActiveQuickFilter(null);
    setShowManualDateFilter(false);
    setShowManualDateError(false);
    setManualDateAutoOpenKey(0);
    setAppliedFilters(null);
    setShowFilters(true);
    onClearFilters();
  }, [onClearFilters]);
  const onDateRangeChange = (0, import_react5.useCallback)(
    (nextFromDate, nextToDate) => {
      setFromDate(nextFromDate);
      setToDate(nextToDate);
      setShowManualDateFilter(true);
      setActiveQuickFilter("custom");
      if (showManualDateError) {
        setShowManualDateError(!(nextFromDate && nextToDate));
      }
    },
    [showManualDateError]
  );
  const onQuickFilterChange = (0, import_react5.useCallback)(
    (filterId) => {
      if (filterId === "custom") {
        if (showManualDateFilter) {
          setShowManualDateFilter(false);
          setShowManualDateError(false);
          if (!fromDate || !toDate) {
            setActiveQuickFilter(null);
          }
          return;
        }
        setActiveQuickFilter("custom");
        setShowManualDateFilter(true);
        setShowManualDateError(false);
        setManualDateAutoOpenKey((previous) => previous + 1);
        return;
      }
      setActiveQuickFilter(filterId);
      setShowManualDateFilter(false);
      setShowManualDateError(false);
      const today = startOfDay(/* @__PURE__ */ new Date());
      const nextFrom = new Date(today);
      if (filterId === "days-7") {
        nextFrom.setDate(today.getDate() - 6);
      } else if (filterId === "days-30") {
        nextFrom.setDate(today.getDate() - 29);
      } else {
        nextFrom.setDate(today.getDate() - 89);
      }
      setFromDate(toIsoDate(nextFrom));
      setToDate(toIsoDate(today));
    },
    [fromDate, showManualDateFilter, toDate]
  );
  const toggleFilterPanel = (0, import_react5.useCallback)(() => {
    setShowFilters((previous) => {
      const next = !previous;
      if (!next) {
        setShowManualDateFilter(false);
      }
      return next;
    });
  }, []);
  return {
    fromDate,
    toDate,
    projectId,
    hojaGastosId,
    currencyCode,
    billedMode,
    activeQuickFilter,
    showManualDateFilter,
    showManualDateError,
    manualDateAutoOpenKey,
    appliedFilters,
    showFilters,
    currentFilters,
    setProjectId,
    setHojaGastosId,
    setCurrencyCode,
    setBilledMode,
    onApply,
    onClear,
    restoreAppliedFilters,
    onDateRangeChange,
    onQuickFilterChange,
    toggleFilterPanel
  };
};

// Web/wwwroot/react/src/pages/gastos/list/useExpenseSheetsFilterCache.ts
var import_react6 = __toESM(require_react());
var EXPENSE_SHEETS_FILTER_KEY = "expense_sheets_filter_v1";
var EXPENSE_SHEETS_RETURN_FLAG_KEY = "expense_sheets_return_v1";
var EXPENSE_SHEETS_CACHE_TTL_MS = 12 * 60 * 60 * 1e3;
var normalizeState = (raw) => {
  if (!raw || typeof raw !== "object") return null;
  const pageRaw = Number(raw.page);
  const page = Number.isFinite(pageRaw) && pageRaw > 0 ? Math.floor(pageRaw) : 1;
  const scrollRaw = Number(raw.scrollY);
  const scrollY = Number.isFinite(scrollRaw) && scrollRaw >= 0 ? Math.floor(scrollRaw) : 0;
  return {
    filters: normalizeExpenseFilterSnapshot(raw.filters),
    page,
    scrollY
  };
};
var useExpenseSheetsFilterCache = () => {
  const readCachedState = (0, import_react6.useCallback)(() => {
    const raw = getSessionJsonWithExpiry(EXPENSE_SHEETS_FILTER_KEY);
    return normalizeState(raw);
  }, []);
  const consumeReturnFlag = (0, import_react6.useCallback)(() => {
    const raw = getSessionValueWithExpiry(EXPENSE_SHEETS_RETURN_FLAG_KEY);
    if (raw === "1") {
      removeSessionValueWithExpiry(EXPENSE_SHEETS_RETURN_FLAG_KEY);
      return true;
    }
    return false;
  }, []);
  const saveCachedState = (0, import_react6.useCallback)((state) => {
    const normalized = normalizeState(state);
    if (!normalized) return;
    setSessionJsonWithExpiry(EXPENSE_SHEETS_FILTER_KEY, normalized, EXPENSE_SHEETS_CACHE_TTL_MS);
    setSessionValueWithExpiry(EXPENSE_SHEETS_RETURN_FLAG_KEY, "1", EXPENSE_SHEETS_CACHE_TTL_MS);
  }, []);
  const clearCachedState = (0, import_react6.useCallback)(() => {
    removeSessionValueWithExpiry(EXPENSE_SHEETS_FILTER_KEY);
    removeSessionValueWithExpiry(EXPENSE_SHEETS_RETURN_FLAG_KEY);
  }, []);
  return {
    readCachedState,
    consumeReturnFlag,
    saveCachedState,
    clearCachedState
  };
};

// Web/wwwroot/react/src/pages/gastos/list/ExpenseSheetsPage.tsx
var import_jsx_runtime6 = __toESM(require_jsx_runtime());
var PAGE_SIZE = 6;
var ExpenseSheetsPageContent = () => {
  const hasAccess = canAccess("GASTOS_HOJA_GASTO", "View");
  const canCreateExpense = canAccess("GASTOS_HOJA_GASTO", "Add");
  const timelineContainerRef = import_react7.default.useRef(null);
  const paginationLabels = (0, import_react7.useMemo)(
    () => ({
      first: indT("History_Page_First", "First"),
      prev: indT("History_Page_Prev", "Previous"),
      next: indT("History_Page_Next", "Next"),
      last: indT("History_Page_Last", "Last")
    }),
    []
  );
  const { items, total, currentPage, isLoading, errorMessage, loadList, resetList } = useExpenseSheetsListData({
    hasAccess,
    pageSize: PAGE_SIZE,
    onForbidden: showPermissionModal
  });
  const { readCachedState, consumeReturnFlag, saveCachedState, clearCachedState } = useExpenseSheetsFilterCache();
  const didRestoreOnMountRef = import_react7.default.useRef(false);
  const pendingScrollRestoreRef = import_react7.default.useRef(null);
  const {
    fromDate,
    toDate,
    projectId,
    hojaGastosId,
    currencyCode,
    billedMode,
    activeQuickFilter,
    showManualDateFilter,
    showManualDateError,
    manualDateAutoOpenKey,
    appliedFilters,
    showFilters,
    currentFilters,
    setProjectId,
    setHojaGastosId,
    setCurrencyCode,
    setBilledMode,
    onApply,
    onClear,
    restoreAppliedFilters,
    onDateRangeChange,
    onQuickFilterChange,
    toggleFilterPanel
  } = useExpenseSheetsFiltersState({
    onApplyFilters: (snapshot) => {
      void loadList(1, snapshot);
    },
    onClearFilters: () => {
      clearCachedState();
      resetList();
    }
  });
  const goToDetail = (0, import_react7.useCallback)(
    (sheetId) => {
      if (!sheetId) return;
      const snapshot = appliedFilters || currentFilters;
      saveCachedState({
        filters: snapshot,
        page: currentPage < 1 ? 1 : currentPage,
        scrollY: typeof window !== "undefined" ? window.scrollY || 0 : 0
      });
      const id = encodeURIComponent(sheetId);
      navigateToExpenseUrl(`/Gastos/ExpenseSheetDetail?hojaGastosId=${id}`, {
        bypassGuardOnce: false
      });
    },
    [appliedFilters, currentFilters, currentPage, saveCachedState]
  );
  const handleOpenCreateSheetMode = (0, import_react7.useCallback)(() => {
    if (!canCreateExpense) {
      showPermissionModal();
      return;
    }
    navigateToExpenseUrl("/Gastos/ExpenseSheetDetail?mode=create", {
      bypassGuardOnce: false
    });
  }, [canCreateExpense]);
  const resolveClickableCard = (0, import_react7.useCallback)((target) => {
    const node = target;
    if (!node || typeof node.closest !== "function") return null;
    const card = node.closest(".timeline-card--clickable");
    if (!card) return null;
    if (!timelineContainerRef.current?.contains(card)) return null;
    return card;
  }, []);
  useTimelineCardEffects({
    containerRef: timelineContainerRef,
    errorMessage,
    items,
    resolveClickableCard
  });
  const totalPages = Math.ceil((total || 0) / PAGE_SIZE);
  const summaryDate = (0, import_react7.useMemo)(() => {
    if (!appliedFilters) return null;
    const locale = document?.documentElement?.lang || "es-ES";
    const fromDateText = formatExpenseDisplayDate(appliedFilters.fromDate, locale, "");
    const toDateText = formatExpenseDisplayDate(appliedFilters.toDate, locale, "");
    if (!fromDateText && !toDateText) return null;
    return {
      fromValue: fromDateText || "--",
      toValue: toDateText || "--"
    };
  }, [appliedFilters]);
  const summaryItems = (0, import_react7.useMemo)(() => {
    if (!appliedFilters) return [];
    const summary = [];
    if (appliedFilters.projectId.trim()) {
      summary.push(`${indT("ExpenseSheets_Filter_Project", "Project")}: ${appliedFilters.projectId.trim()}`);
    }
    if (appliedFilters.hojaGastosId.trim()) {
      summary.push(`${indT("ExpenseSheets_Filter_Sheet", "Expense sheet")}: ${appliedFilters.hojaGastosId.trim()}`);
    }
    if (appliedFilters.currencyCode.trim()) {
      summary.push(`${indT("ExpenseSheets_Filter_Currency", "Currency")}: ${appliedFilters.currencyCode.trim()}`);
    }
    summary.push(
      `${indT("ExpenseSheets_Filter_Status", "Estado")}: ${appliedFilters.billedMode === 1 ? indT("ExpenseSheets_Filter_Status_Billed", "Pagado") : appliedFilters.billedMode === 2 ? indT("ExpenseSheets_Filter_Status_Both", "Ambos") : indT("ExpenseSheets_Filter_Status_Unbilled", "No Pagado")}`
    );
    return summary;
  }, [appliedFilters]);
  const showSummary = !showFilters && (!!summaryDate || summaryItems.length > 0);
  (0, import_react7.useEffect)(() => {
    if (didRestoreOnMountRef.current) return;
    didRestoreOnMountRef.current = true;
    if (!consumeReturnFlag()) return;
    const cachedState = readCachedState();
    if (!cachedState) {
      clearCachedState();
      return;
    }
    restoreAppliedFilters(cachedState.filters);
    pendingScrollRestoreRef.current = cachedState.scrollY;
    void loadList(cachedState.page, cachedState.filters);
  }, [clearCachedState, consumeReturnFlag, loadList, readCachedState, restoreAppliedFilters]);
  (0, import_react7.useEffect)(() => {
    if (isLoading) return;
    const pendingScrollY = pendingScrollRestoreRef.current;
    if (pendingScrollY == null) return;
    pendingScrollRestoreRef.current = null;
    window.requestAnimationFrame(() => {
      window.scrollTo({
        top: Math.max(0, pendingScrollY),
        behavior: "auto"
      });
    });
  }, [currentPage, isLoading, items.length]);
  (0, import_react7.useEffect)(() => {
    const onToggleFilters = () => {
      toggleFilterPanel();
    };
    const onRefresh = () => {
      if (!appliedFilters) {
        return;
      }
      void loadList(currentPage < 1 ? 1 : currentPage, appliedFilters);
    };
    window.addEventListener("expense-sheets-toggle-filter", onToggleFilters);
    window.addEventListener("expense-sheets-refresh", onRefresh);
    return () => {
      window.removeEventListener("expense-sheets-toggle-filter", onToggleFilters);
      window.removeEventListener("expense-sheets-refresh", onRefresh);
    };
  }, [appliedFilters, currentPage, loadList, toggleFilterPanel]);
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "space-y-2", children: [
    showSummary ? /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "filter-card filter-card--summary p-3 sm:p-4 mt-1 mb-3", children: [
      summaryDate ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
        HistorySummary_default,
        {
          summaryFromLabel: indT("History_From", "From"),
          summaryToLabel: indT("History_To", "To"),
          fromValue: summaryDate.fromValue,
          toValue: summaryDate.toValue,
          className: "gap-y-1 text-[11px]"
        }
      ) : null,
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: `flex flex-col items-start gap-y-1 text-xs ${summaryDate ? "mt-1" : ""}`.trim(), children: summaryItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "history-filter-summary leading-5", children: item }, item)) })
    ] }) : null,
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
      ExpenseFiltersPanel_default,
      {
        visible: showFilters,
        showManualDateFilter,
        showManualDateError,
        manualDateAutoOpenKey,
        fromDate,
        toDate,
        projectId,
        hojaGastosId,
        currencyCode,
        billedMode,
        activeQuickFilter,
        onDateRangeChange,
        onQuickFilterChange,
        onProjectIdChange: setProjectId,
        onHojaGastosIdChange: setHojaGastosId,
        onCurrencyCodeChange: setCurrencyCode,
        onBilledModeChange: setBilledMode,
        onClear,
        onApply
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
      "div",
      {
        className: "loader-box glass-panel shadow-card flex items-center gap-2 text-sm text-slate-700",
        style: { display: isLoading ? "flex" : "none" },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("svg", { className: "ind-spinner h-5 w-5", viewBox: "0 0 20 20", role: "status", "aria-label": indT("Common_Loading", "Loading"), children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("circle", { className: "ind-spinner__circle", cx: "10", cy: "10", r: "8", strokeWidth: "2" }) }),
          indT("Common_Loading", "Loading")
        ]
      }
    ),
    errorMessage ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "text-danger", children: errorMessage }) : null,
    !isLoading && !errorMessage && items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "timeline-box timeline-empty", "data-empty-text": indT("Common_NoData", "No data") }) : null,
    !errorMessage && items.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { ref: timelineContainerRef, className: "timeline-box", children: items.map((item, index) => {
      const id = safeText(item.hojaGastosId);
      const dateParts = formatExpenseDateParts(item.createdDate || item.transDate, document?.documentElement?.lang || "es-ES");
      const currency = safeText(item.currencyCode);
      const description = safeText(item.description);
      const voucher = safeText(item.voucher);
      const totalAmountText = formatAmountWithCurrency(item.totalAmountMST ?? null, currency);
      const isBilled = hasAssignedVoucher(voucher);
      const statusLabel = isBilled ? indT("ExpenseSheets_Filter_Status_Billed", "Pagado") : indT("ExpenseSheets_Filter_Status_Unbilled", "No Pagado");
      const statusClass = isBilled ? "expense-sheet-card__status expense-sheet-card__status--billed" : "expense-sheet-card__status expense-sheet-card__status--unbilled";
      return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "timeline-item", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
        ExpenseTimelineCard_default,
        {
          dateParts,
          title: description || "-",
          amountText: totalAmountText,
          onOpen: () => goToDetail(id),
          titleClassName: "expense-sheet-card__title timeline-name",
          statusClassName: statusClass,
          statusLabel
        }
      ) }, `${id}-${index}`);
    }) }) : null,
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
      CompactPagination_default,
      {
        totalPages,
        currentPage,
        onPageChange: (page) => {
          const snapshot = appliedFilters || currentFilters;
          void loadList(page, snapshot);
        },
        labels: paginationLabels
      }
    ),
    canCreateExpense ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
      FloatingActionButton_default,
      {
        route: "",
        ariaLabel: indT("Common_Create", "Create"),
        size: 76,
        right: 16,
        bottom: 24,
        onClick: handleOpenCreateSheetMode
      }
    ) : null
  ] });
};
var ExpenseSheetsPage = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(VisitasPageProviders_default, { children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(ExpenseSheetsPageContent, {}) });
};
var mount = () => {
  const rootEl = document.getElementById("expense-sheets-root");
  if (!rootEl) return;
  mountReactIsland(rootEl, /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(ExpenseSheetsPage, {}));
};
mountWhenDocumentReady(mount);
var ExpenseSheetsPage_default = ExpenseSheetsPage;
export {
  ExpenseSheetsPage_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9saXN0L0V4cGVuc2VTaGVldHNQYWdlLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbXBvbmVudHMvRXhwZW5zZUJpbGxlZE1vZGVGaWx0ZXJTZWxlY3QudHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlRGF0ZVJhbmdlRmlsdGVyLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3V0aWxzL2V4cGVuc2VEYXRlUmFuZ2VVdGlscy50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbXBvbmVudHMvRXhwZW5zZUZpbHRlckFjdGlvbnMudHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlU2hlZXRGaWx0ZXJJbnB1dC50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy91dGlscy9leHBlbnNlUGF5bG9hZEJ1aWxkZXJzLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlRmlsdGVyc1BhbmVsLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2xpc3QvdXNlRXhwZW5zZVNoZWV0c0xpc3REYXRhLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvbGlzdC91c2VFeHBlbnNlU2hlZXRzRmlsdGVyc1N0YXRlLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvbGlzdC9leHBlbnNlRmlsdGVyU25hcHNob3QudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9saXN0L3VzZUV4cGVuc2VTaGVldHNGaWx0ZXJDYWNoZS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZU1lbW8gfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBWaXNpdGFzUGFnZVByb3ZpZGVycyBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1Zpc2l0YXNQYWdlUHJvdmlkZXJzLnRzeFwiO1xuaW1wb3J0IENvbXBhY3RQYWdpbmF0aW9uIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvQ29tcGFjdFBhZ2luYXRpb24udHN4XCI7XG5pbXBvcnQgRmxvYXRpbmdBY3Rpb25CdXR0b24gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9GbG9hdGluZ0FjdGlvbkJ1dHRvbi50c3hcIjtcbmltcG9ydCB7IGNhbkFjY2Vzcywgc2hvd1Blcm1pc3Npb25Nb2RhbCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9wZXJtaXNzaW9ucy50c1wiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgeyBtb3VudFJlYWN0SXNsYW5kLCBtb3VudFdoZW5Eb2N1bWVudFJlYWR5IH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3JlYWN0SXNsYW5kLnRzeFwiO1xuaW1wb3J0IHsgZm9ybWF0QW1vdW50V2l0aEN1cnJlbmN5IH0gZnJvbSBcIi4uL2V4cGVuc2VGb3JtYXR0ZXJzLnRzXCI7XG5pbXBvcnQgRXhwZW5zZUZpbHRlcnNQYW5lbCBmcm9tIFwiLi4vY29tcG9uZW50cy9FeHBlbnNlRmlsdGVyc1BhbmVsLnRzeFwiO1xuaW1wb3J0IHsgdXNlVGltZWxpbmVDYXJkRWZmZWN0cyB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VUaW1lbGluZUNhcmRFZmZlY3RzLnRzXCI7XG5pbXBvcnQgSGlzdG9yeVN1bW1hcnkgZnJvbSBcIi4uLy4uL3Zpc2l0YXMvaGlzdG9yaWFsL0hpc3RvcnlTdW1tYXJ5LnRzeFwiO1xuaW1wb3J0IHsgZm9ybWF0RXhwZW5zZURhdGVQYXJ0cywgZm9ybWF0RXhwZW5zZURpc3BsYXlEYXRlLCBoYXNBc3NpZ25lZFZvdWNoZXIsIHNhZmVUZXh0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XG5pbXBvcnQgeyB1c2VFeHBlbnNlU2hlZXRzTGlzdERhdGEgfSBmcm9tIFwiLi91c2VFeHBlbnNlU2hlZXRzTGlzdERhdGEudHNcIjtcbmltcG9ydCB7IHVzZUV4cGVuc2VTaGVldHNGaWx0ZXJzU3RhdGUgfSBmcm9tIFwiLi91c2VFeHBlbnNlU2hlZXRzRmlsdGVyc1N0YXRlLnRzXCI7XG5pbXBvcnQgeyB1c2VFeHBlbnNlU2hlZXRzRmlsdGVyQ2FjaGUgfSBmcm9tIFwiLi91c2VFeHBlbnNlU2hlZXRzRmlsdGVyQ2FjaGUudHNcIjtcbmltcG9ydCBFeHBlbnNlVGltZWxpbmVDYXJkIGZyb20gXCIuLi9jb21wb25lbnRzL0V4cGVuc2VUaW1lbGluZUNhcmQudHN4XCI7XG5pbXBvcnQgeyBuYXZpZ2F0ZVRvRXhwZW5zZVVybCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlTmF2aWdhdGlvbi50c1wiO1xuXG5jb25zdCBQQUdFX1NJWkUgPSA2O1xuXG5jb25zdCBFeHBlbnNlU2hlZXRzUGFnZUNvbnRlbnQgPSAoKSA9PiB7XG4gIGNvbnN0IGhhc0FjY2VzcyA9IGNhbkFjY2VzcyhcIkdBU1RPU19IT0pBX0dBU1RPXCIsIFwiVmlld1wiKTtcbiAgY29uc3QgY2FuQ3JlYXRlRXhwZW5zZSA9IGNhbkFjY2VzcyhcIkdBU1RPU19IT0pBX0dBU1RPXCIsIFwiQWRkXCIpO1xuICBjb25zdCB0aW1lbGluZUNvbnRhaW5lclJlZiA9IFJlYWN0LnVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xuXG4gIGNvbnN0IHBhZ2luYXRpb25MYWJlbHMgPSB1c2VNZW1vKFxuICAgICgpID0+ICh7XG4gICAgICBmaXJzdDogaW5kVChcIkhpc3RvcnlfUGFnZV9GaXJzdFwiLCBcIkZpcnN0XCIpLFxuICAgICAgcHJldjogaW5kVChcIkhpc3RvcnlfUGFnZV9QcmV2XCIsIFwiUHJldmlvdXNcIiksXG4gICAgICBuZXh0OiBpbmRUKFwiSGlzdG9yeV9QYWdlX05leHRcIiwgXCJOZXh0XCIpLFxuICAgICAgbGFzdDogaW5kVChcIkhpc3RvcnlfUGFnZV9MYXN0XCIsIFwiTGFzdFwiKSxcbiAgICB9KSxcbiAgICBbXVxuICApO1xuXG4gIGNvbnN0IHsgaXRlbXMsIHRvdGFsLCBjdXJyZW50UGFnZSwgaXNMb2FkaW5nLCBlcnJvck1lc3NhZ2UsIGxvYWRMaXN0LCByZXNldExpc3QgfSA9IHVzZUV4cGVuc2VTaGVldHNMaXN0RGF0YSh7XG4gICAgaGFzQWNjZXNzLFxuICAgIHBhZ2VTaXplOiBQQUdFX1NJWkUsXG4gICAgb25Gb3JiaWRkZW46IHNob3dQZXJtaXNzaW9uTW9kYWwsXG4gIH0pO1xuXG4gIGNvbnN0IHsgcmVhZENhY2hlZFN0YXRlLCBjb25zdW1lUmV0dXJuRmxhZywgc2F2ZUNhY2hlZFN0YXRlLCBjbGVhckNhY2hlZFN0YXRlIH0gPSB1c2VFeHBlbnNlU2hlZXRzRmlsdGVyQ2FjaGUoKTtcbiAgY29uc3QgZGlkUmVzdG9yZU9uTW91bnRSZWYgPSBSZWFjdC51c2VSZWYoZmFsc2UpO1xuICBjb25zdCBwZW5kaW5nU2Nyb2xsUmVzdG9yZVJlZiA9IFJlYWN0LnVzZVJlZjxudW1iZXIgfCBudWxsPihudWxsKTtcblxuICBjb25zdCB7XG4gICAgZnJvbURhdGUsXG4gICAgdG9EYXRlLFxuICAgIHByb2plY3RJZCxcbiAgICBob2phR2FzdG9zSWQsXG4gICAgY3VycmVuY3lDb2RlLFxuICAgIGJpbGxlZE1vZGUsXG4gICAgYWN0aXZlUXVpY2tGaWx0ZXIsXG4gICAgc2hvd01hbnVhbERhdGVGaWx0ZXIsXG4gICAgc2hvd01hbnVhbERhdGVFcnJvcixcbiAgICBtYW51YWxEYXRlQXV0b09wZW5LZXksXG4gICAgYXBwbGllZEZpbHRlcnMsXG4gICAgc2hvd0ZpbHRlcnMsXG4gICAgY3VycmVudEZpbHRlcnMsXG4gICAgc2V0UHJvamVjdElkLFxuICAgIHNldEhvamFHYXN0b3NJZCxcbiAgICBzZXRDdXJyZW5jeUNvZGUsXG4gICAgc2V0QmlsbGVkTW9kZSxcbiAgICBvbkFwcGx5LFxuICAgIG9uQ2xlYXIsXG4gICAgcmVzdG9yZUFwcGxpZWRGaWx0ZXJzLFxuICAgIG9uRGF0ZVJhbmdlQ2hhbmdlLFxuICAgIG9uUXVpY2tGaWx0ZXJDaGFuZ2UsXG4gICAgdG9nZ2xlRmlsdGVyUGFuZWwsXG4gIH0gPSB1c2VFeHBlbnNlU2hlZXRzRmlsdGVyc1N0YXRlKHtcbiAgICBvbkFwcGx5RmlsdGVyczogKHNuYXBzaG90KSA9PiB7XG4gICAgICB2b2lkIGxvYWRMaXN0KDEsIHNuYXBzaG90KTtcbiAgICB9LFxuICAgIG9uQ2xlYXJGaWx0ZXJzOiAoKSA9PiB7XG4gICAgICBjbGVhckNhY2hlZFN0YXRlKCk7XG4gICAgICByZXNldExpc3QoKTtcbiAgICB9LFxuICB9KTtcblxuICBjb25zdCBnb1RvRGV0YWlsID0gdXNlQ2FsbGJhY2soXG4gICAgKHNoZWV0SWQ6IHN0cmluZykgPT4ge1xuICAgICAgaWYgKCFzaGVldElkKSByZXR1cm47XG5cbiAgICAgIGNvbnN0IHNuYXBzaG90ID0gYXBwbGllZEZpbHRlcnMgfHwgY3VycmVudEZpbHRlcnM7XG4gICAgICBzYXZlQ2FjaGVkU3RhdGUoe1xuICAgICAgICBmaWx0ZXJzOiBzbmFwc2hvdCxcbiAgICAgICAgcGFnZTogY3VycmVudFBhZ2UgPCAxID8gMSA6IGN1cnJlbnRQYWdlLFxuICAgICAgICBzY3JvbGxZOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93LnNjcm9sbFkgfHwgMCA6IDAsXG4gICAgICB9KTtcblxuICAgICAgY29uc3QgaWQgPSBlbmNvZGVVUklDb21wb25lbnQoc2hlZXRJZCk7XG4gICAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybChgL0dhc3Rvcy9FeHBlbnNlU2hlZXREZXRhaWw/aG9qYUdhc3Rvc0lkPSR7aWR9YCwge1xuICAgICAgICBieXBhc3NHdWFyZE9uY2U6IGZhbHNlLFxuICAgICAgfSk7XG4gICAgfSxcbiAgICBbYXBwbGllZEZpbHRlcnMsIGN1cnJlbnRGaWx0ZXJzLCBjdXJyZW50UGFnZSwgc2F2ZUNhY2hlZFN0YXRlXVxuICApO1xuXG4gIGNvbnN0IGhhbmRsZU9wZW5DcmVhdGVTaGVldE1vZGUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKCFjYW5DcmVhdGVFeHBlbnNlKSB7XG4gICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoXCIvR2FzdG9zL0V4cGVuc2VTaGVldERldGFpbD9tb2RlPWNyZWF0ZVwiLCB7XG4gICAgICBieXBhc3NHdWFyZE9uY2U6IGZhbHNlLFxuICAgIH0pO1xuICB9LCBbY2FuQ3JlYXRlRXhwZW5zZV0pO1xuXG4gIGNvbnN0IHJlc29sdmVDbGlja2FibGVDYXJkID0gdXNlQ2FsbGJhY2soKHRhcmdldDogRXZlbnRUYXJnZXQgfCBudWxsKSA9PiB7XG4gICAgY29uc3Qgbm9kZSA9IHRhcmdldCBhcyBIVE1MRWxlbWVudCB8IG51bGw7XG4gICAgaWYgKCFub2RlIHx8IHR5cGVvZiBub2RlLmNsb3Nlc3QgIT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIG51bGw7XG4gICAgY29uc3QgY2FyZCA9IG5vZGUuY2xvc2VzdDxIVE1MRWxlbWVudD4oXCIudGltZWxpbmUtY2FyZC0tY2xpY2thYmxlXCIpO1xuICAgIGlmICghY2FyZCkgcmV0dXJuIG51bGw7XG4gICAgaWYgKCF0aW1lbGluZUNvbnRhaW5lclJlZi5jdXJyZW50Py5jb250YWlucyhjYXJkKSkgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuIGNhcmQ7XG4gIH0sIFtdKTtcblxuICB1c2VUaW1lbGluZUNhcmRFZmZlY3RzKHtcbiAgICBjb250YWluZXJSZWY6IHRpbWVsaW5lQ29udGFpbmVyUmVmLFxuICAgIGVycm9yTWVzc2FnZSxcbiAgICBpdGVtcyxcbiAgICByZXNvbHZlQ2xpY2thYmxlQ2FyZCxcbiAgfSk7XG5cbiAgY29uc3QgdG90YWxQYWdlcyA9IE1hdGguY2VpbCgodG90YWwgfHwgMCkgLyBQQUdFX1NJWkUpO1xuXG4gIGNvbnN0IHN1bW1hcnlEYXRlID0gdXNlTWVtbygoKSA9PiB7XG4gICAgaWYgKCFhcHBsaWVkRmlsdGVycykgcmV0dXJuIG51bGwgYXMgeyBmcm9tVmFsdWU6IHN0cmluZzsgdG9WYWx1ZTogc3RyaW5nIH0gfCBudWxsO1xuXG4gICAgY29uc3QgbG9jYWxlID0gZG9jdW1lbnQ/LmRvY3VtZW50RWxlbWVudD8ubGFuZyB8fCBcImVzLUVTXCI7XG4gICAgY29uc3QgZnJvbURhdGVUZXh0ID0gZm9ybWF0RXhwZW5zZURpc3BsYXlEYXRlKGFwcGxpZWRGaWx0ZXJzLmZyb21EYXRlLCBsb2NhbGUsIFwiXCIpO1xuICAgIGNvbnN0IHRvRGF0ZVRleHQgPSBmb3JtYXRFeHBlbnNlRGlzcGxheURhdGUoYXBwbGllZEZpbHRlcnMudG9EYXRlLCBsb2NhbGUsIFwiXCIpO1xuXG4gICAgaWYgKCFmcm9tRGF0ZVRleHQgJiYgIXRvRGF0ZVRleHQpIHJldHVybiBudWxsO1xuICAgIHJldHVybiB7XG4gICAgICBmcm9tVmFsdWU6IGZyb21EYXRlVGV4dCB8fCBcIi0tXCIsXG4gICAgICB0b1ZhbHVlOiB0b0RhdGVUZXh0IHx8IFwiLS1cIixcbiAgICB9O1xuICB9LCBbYXBwbGllZEZpbHRlcnNdKTtcblxuICBjb25zdCBzdW1tYXJ5SXRlbXMgPSB1c2VNZW1vKCgpID0+IHtcbiAgICBpZiAoIWFwcGxpZWRGaWx0ZXJzKSByZXR1cm4gW10gYXMgc3RyaW5nW107XG5cbiAgICBjb25zdCBzdW1tYXJ5OiBzdHJpbmdbXSA9IFtdO1xuICAgIGlmIChhcHBsaWVkRmlsdGVycy5wcm9qZWN0SWQudHJpbSgpKSB7XG4gICAgICBzdW1tYXJ5LnB1c2goYCR7aW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX1Byb2plY3RcIiwgXCJQcm9qZWN0XCIpfTogJHthcHBsaWVkRmlsdGVycy5wcm9qZWN0SWQudHJpbSgpfWApO1xuICAgIH1cbiAgICBpZiAoYXBwbGllZEZpbHRlcnMuaG9qYUdhc3Rvc0lkLnRyaW0oKSkge1xuICAgICAgc3VtbWFyeS5wdXNoKGAke2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9TaGVldFwiLCBcIkV4cGVuc2Ugc2hlZXRcIil9OiAke2FwcGxpZWRGaWx0ZXJzLmhvamFHYXN0b3NJZC50cmltKCl9YCk7XG4gICAgfVxuICAgIGlmIChhcHBsaWVkRmlsdGVycy5jdXJyZW5jeUNvZGUudHJpbSgpKSB7XG4gICAgICBzdW1tYXJ5LnB1c2goYCR7aW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX0N1cnJlbmN5XCIsIFwiQ3VycmVuY3lcIil9OiAke2FwcGxpZWRGaWx0ZXJzLmN1cnJlbmN5Q29kZS50cmltKCl9YCk7XG4gICAgfVxuICAgIHN1bW1hcnkucHVzaChcbiAgICAgIGAke2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9TdGF0dXNcIiwgXCJFc3RhZG9cIil9OiAke1xuICAgICAgICBhcHBsaWVkRmlsdGVycy5iaWxsZWRNb2RlID09PSAxXG4gICAgICAgICAgPyBpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfU3RhdHVzX0JpbGxlZFwiLCBcIlBhZ2Fkb1wiKVxuICAgICAgICAgIDogYXBwbGllZEZpbHRlcnMuYmlsbGVkTW9kZSA9PT0gMlxuICAgICAgICAgICAgPyBpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfU3RhdHVzX0JvdGhcIiwgXCJBbWJvc1wiKVxuICAgICAgICAgICAgOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfU3RhdHVzX1VuYmlsbGVkXCIsIFwiTm8gUGFnYWRvXCIpXG4gICAgICB9YFxuICAgICk7XG5cbiAgICByZXR1cm4gc3VtbWFyeTtcbiAgfSwgW2FwcGxpZWRGaWx0ZXJzXSk7XG5cbiAgY29uc3Qgc2hvd1N1bW1hcnkgPSAhc2hvd0ZpbHRlcnMgJiYgKCEhc3VtbWFyeURhdGUgfHwgc3VtbWFyeUl0ZW1zLmxlbmd0aCA+IDApO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKGRpZFJlc3RvcmVPbk1vdW50UmVmLmN1cnJlbnQpIHJldHVybjtcbiAgICBkaWRSZXN0b3JlT25Nb3VudFJlZi5jdXJyZW50ID0gdHJ1ZTtcblxuICAgIGlmICghY29uc3VtZVJldHVybkZsYWcoKSkgcmV0dXJuO1xuXG4gICAgY29uc3QgY2FjaGVkU3RhdGUgPSByZWFkQ2FjaGVkU3RhdGUoKTtcbiAgICBpZiAoIWNhY2hlZFN0YXRlKSB7XG4gICAgICBjbGVhckNhY2hlZFN0YXRlKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcmVzdG9yZUFwcGxpZWRGaWx0ZXJzKGNhY2hlZFN0YXRlLmZpbHRlcnMpO1xuICAgIHBlbmRpbmdTY3JvbGxSZXN0b3JlUmVmLmN1cnJlbnQgPSBjYWNoZWRTdGF0ZS5zY3JvbGxZO1xuICAgIHZvaWQgbG9hZExpc3QoY2FjaGVkU3RhdGUucGFnZSwgY2FjaGVkU3RhdGUuZmlsdGVycyk7XG4gIH0sIFtjbGVhckNhY2hlZFN0YXRlLCBjb25zdW1lUmV0dXJuRmxhZywgbG9hZExpc3QsIHJlYWRDYWNoZWRTdGF0ZSwgcmVzdG9yZUFwcGxpZWRGaWx0ZXJzXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoaXNMb2FkaW5nKSByZXR1cm47XG4gICAgY29uc3QgcGVuZGluZ1Njcm9sbFkgPSBwZW5kaW5nU2Nyb2xsUmVzdG9yZVJlZi5jdXJyZW50O1xuICAgIGlmIChwZW5kaW5nU2Nyb2xsWSA9PSBudWxsKSByZXR1cm47XG5cbiAgICBwZW5kaW5nU2Nyb2xsUmVzdG9yZVJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIHdpbmRvdy5zY3JvbGxUbyh7XG4gICAgICAgIHRvcDogTWF0aC5tYXgoMCwgcGVuZGluZ1Njcm9sbFkpLFxuICAgICAgICBiZWhhdmlvcjogXCJhdXRvXCIsXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSwgW2N1cnJlbnRQYWdlLCBpc0xvYWRpbmcsIGl0ZW1zLmxlbmd0aF0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3Qgb25Ub2dnbGVGaWx0ZXJzID0gKCkgPT4ge1xuICAgICAgdG9nZ2xlRmlsdGVyUGFuZWwoKTtcbiAgICB9O1xuXG4gICAgY29uc3Qgb25SZWZyZXNoID0gKCkgPT4ge1xuICAgICAgaWYgKCFhcHBsaWVkRmlsdGVycykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZvaWQgbG9hZExpc3QoY3VycmVudFBhZ2UgPCAxID8gMSA6IGN1cnJlbnRQYWdlLCBhcHBsaWVkRmlsdGVycyk7XG4gICAgfTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiZXhwZW5zZS1zaGVldHMtdG9nZ2xlLWZpbHRlclwiLCBvblRvZ2dsZUZpbHRlcnMpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiZXhwZW5zZS1zaGVldHMtcmVmcmVzaFwiLCBvblJlZnJlc2gpO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwiZXhwZW5zZS1zaGVldHMtdG9nZ2xlLWZpbHRlclwiLCBvblRvZ2dsZUZpbHRlcnMpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJleHBlbnNlLXNoZWV0cy1yZWZyZXNoXCIsIG9uUmVmcmVzaCk7XG4gICAgfTtcbiAgfSwgW2FwcGxpZWRGaWx0ZXJzLCBjdXJyZW50UGFnZSwgbG9hZExpc3QsIHRvZ2dsZUZpbHRlclBhbmVsXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMlwiPlxuICAgICAge3Nob3dTdW1tYXJ5ID8gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpbHRlci1jYXJkIGZpbHRlci1jYXJkLS1zdW1tYXJ5IHAtMyBzbTpwLTQgbXQtMSBtYi0zXCI+XG4gICAgICAgICAge3N1bW1hcnlEYXRlID8gKFxuICAgICAgICAgICAgPEhpc3RvcnlTdW1tYXJ5XG4gICAgICAgICAgICAgIHN1bW1hcnlGcm9tTGFiZWw9e2luZFQoXCJIaXN0b3J5X0Zyb21cIiwgXCJGcm9tXCIpfVxuICAgICAgICAgICAgICBzdW1tYXJ5VG9MYWJlbD17aW5kVChcIkhpc3RvcnlfVG9cIiwgXCJUb1wiKX1cbiAgICAgICAgICAgICAgZnJvbVZhbHVlPXtzdW1tYXJ5RGF0ZS5mcm9tVmFsdWV9XG4gICAgICAgICAgICAgIHRvVmFsdWU9e3N1bW1hcnlEYXRlLnRvVmFsdWV9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImdhcC15LTEgdGV4dC1bMTFweF1cIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGZsZXggZmxleC1jb2wgaXRlbXMtc3RhcnQgZ2FwLXktMSB0ZXh0LXhzICR7c3VtbWFyeURhdGUgPyBcIm10LTFcIiA6IFwiXCJ9YC50cmltKCl9PlxuICAgICAgICAgICAge3N1bW1hcnlJdGVtcy5tYXAoKGl0ZW0pID0+IChcbiAgICAgICAgICAgICAgPGRpdiBrZXk9e2l0ZW19IGNsYXNzTmFtZT1cImhpc3RvcnktZmlsdGVyLXN1bW1hcnkgbGVhZGluZy01XCI+XG4gICAgICAgICAgICAgICAge2l0ZW19XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKSl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKSA6IG51bGx9XG5cbiAgICAgIDxFeHBlbnNlRmlsdGVyc1BhbmVsXG4gICAgICAgIHZpc2libGU9e3Nob3dGaWx0ZXJzfVxuICAgICAgICBzaG93TWFudWFsRGF0ZUZpbHRlcj17c2hvd01hbnVhbERhdGVGaWx0ZXJ9XG4gICAgICAgIHNob3dNYW51YWxEYXRlRXJyb3I9e3Nob3dNYW51YWxEYXRlRXJyb3J9XG4gICAgICAgIG1hbnVhbERhdGVBdXRvT3BlbktleT17bWFudWFsRGF0ZUF1dG9PcGVuS2V5fVxuICAgICAgICBmcm9tRGF0ZT17ZnJvbURhdGV9XG4gICAgICAgIHRvRGF0ZT17dG9EYXRlfVxuICAgICAgICBwcm9qZWN0SWQ9e3Byb2plY3RJZH1cbiAgICAgICAgaG9qYUdhc3Rvc0lkPXtob2phR2FzdG9zSWR9XG4gICAgICAgIGN1cnJlbmN5Q29kZT17Y3VycmVuY3lDb2RlfVxuICAgICAgICBiaWxsZWRNb2RlPXtiaWxsZWRNb2RlfVxuICAgICAgICBhY3RpdmVRdWlja0ZpbHRlcj17YWN0aXZlUXVpY2tGaWx0ZXJ9XG4gICAgICAgIG9uRGF0ZVJhbmdlQ2hhbmdlPXtvbkRhdGVSYW5nZUNoYW5nZX1cbiAgICAgICAgb25RdWlja0ZpbHRlckNoYW5nZT17b25RdWlja0ZpbHRlckNoYW5nZX1cbiAgICAgICAgb25Qcm9qZWN0SWRDaGFuZ2U9e3NldFByb2plY3RJZH1cbiAgICAgICAgb25Ib2phR2FzdG9zSWRDaGFuZ2U9e3NldEhvamFHYXN0b3NJZH1cbiAgICAgICAgb25DdXJyZW5jeUNvZGVDaGFuZ2U9e3NldEN1cnJlbmN5Q29kZX1cbiAgICAgICAgb25CaWxsZWRNb2RlQ2hhbmdlPXtzZXRCaWxsZWRNb2RlfVxuICAgICAgICBvbkNsZWFyPXtvbkNsZWFyfVxuICAgICAgICBvbkFwcGx5PXtvbkFwcGx5fVxuICAgICAgLz5cblxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9XCJsb2FkZXItYm94IGdsYXNzLXBhbmVsIHNoYWRvdy1jYXJkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQtc20gdGV4dC1zbGF0ZS03MDBcIlxuICAgICAgICBzdHlsZT17eyBkaXNwbGF5OiBpc0xvYWRpbmcgPyBcImZsZXhcIiA6IFwibm9uZVwiIH19XG4gICAgICA+XG4gICAgICAgIDxzdmcgY2xhc3NOYW1lPVwiaW5kLXNwaW5uZXIgaC01IHctNVwiIHZpZXdCb3g9XCIwIDAgMjAgMjBcIiByb2xlPVwic3RhdHVzXCIgYXJpYS1sYWJlbD17aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX0+XG4gICAgICAgICAgPGNpcmNsZSBjbGFzc05hbWU9XCJpbmQtc3Bpbm5lcl9fY2lyY2xlXCIgY3g9XCIxMFwiIGN5PVwiMTBcIiByPVwiOFwiIHN0cm9rZVdpZHRoPVwiMlwiIC8+XG4gICAgICAgIDwvc3ZnPlxuICAgICAgICB7aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX1cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7ZXJyb3JNZXNzYWdlID8gPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWRhbmdlclwiPntlcnJvck1lc3NhZ2V9PC9kaXY+IDogbnVsbH1cblxuICAgICAgeyFpc0xvYWRpbmcgJiYgIWVycm9yTWVzc2FnZSAmJiBpdGVtcy5sZW5ndGggPT09IDAgPyAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGltZWxpbmUtYm94IHRpbWVsaW5lLWVtcHR5XCIgZGF0YS1lbXB0eS10ZXh0PXtpbmRUKFwiQ29tbW9uX05vRGF0YVwiLCBcIk5vIGRhdGFcIil9IC8+XG4gICAgICApIDogbnVsbH1cblxuICAgICAgeyFlcnJvck1lc3NhZ2UgJiYgaXRlbXMubGVuZ3RoID4gMCA/IChcbiAgICAgICAgPGRpdiByZWY9e3RpbWVsaW5lQ29udGFpbmVyUmVmfSBjbGFzc05hbWU9XCJ0aW1lbGluZS1ib3hcIj5cbiAgICAgICAgICB7aXRlbXMubWFwKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaWQgPSBzYWZlVGV4dChpdGVtLmhvamFHYXN0b3NJZCk7XG4gICAgICAgICAgICBjb25zdCBkYXRlUGFydHMgPSBmb3JtYXRFeHBlbnNlRGF0ZVBhcnRzKGl0ZW0uY3JlYXRlZERhdGUgfHwgaXRlbS50cmFuc0RhdGUsIGRvY3VtZW50Py5kb2N1bWVudEVsZW1lbnQ/LmxhbmcgfHwgXCJlcy1FU1wiKTtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbmN5ID0gc2FmZVRleHQoaXRlbS5jdXJyZW5jeUNvZGUpO1xuICAgICAgICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSBzYWZlVGV4dChpdGVtLmRlc2NyaXB0aW9uKTtcbiAgICAgICAgICAgIGNvbnN0IHZvdWNoZXIgPSBzYWZlVGV4dChpdGVtLnZvdWNoZXIpO1xuICAgICAgICAgICAgY29uc3QgdG90YWxBbW91bnRUZXh0ID0gZm9ybWF0QW1vdW50V2l0aEN1cnJlbmN5KGl0ZW0udG90YWxBbW91bnRNU1QgPz8gbnVsbCwgY3VycmVuY3kpO1xuICAgICAgICAgICAgY29uc3QgaXNCaWxsZWQgPSBoYXNBc3NpZ25lZFZvdWNoZXIodm91Y2hlcik7XG4gICAgICAgICAgICBjb25zdCBzdGF0dXNMYWJlbCA9IGlzQmlsbGVkXG4gICAgICAgICAgICAgID8gaW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX1N0YXR1c19CaWxsZWRcIiwgXCJQYWdhZG9cIilcbiAgICAgICAgICAgICAgOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfU3RhdHVzX1VuYmlsbGVkXCIsIFwiTm8gUGFnYWRvXCIpO1xuICAgICAgICAgICAgY29uc3Qgc3RhdHVzQ2xhc3MgPSBpc0JpbGxlZFxuICAgICAgICAgICAgICA/IFwiZXhwZW5zZS1zaGVldC1jYXJkX19zdGF0dXMgZXhwZW5zZS1zaGVldC1jYXJkX19zdGF0dXMtLWJpbGxlZFwiXG4gICAgICAgICAgICAgIDogXCJleHBlbnNlLXNoZWV0LWNhcmRfX3N0YXR1cyBleHBlbnNlLXNoZWV0LWNhcmRfX3N0YXR1cy0tdW5iaWxsZWRcIjtcblxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgPGRpdiBrZXk9e2Ake2lkfS0ke2luZGV4fWB9IGNsYXNzTmFtZT1cInRpbWVsaW5lLWl0ZW1cIj5cbiAgICAgICAgICAgICAgICA8RXhwZW5zZVRpbWVsaW5lQ2FyZFxuICAgICAgICAgICAgICAgICAgZGF0ZVBhcnRzPXtkYXRlUGFydHN9XG4gICAgICAgICAgICAgICAgICB0aXRsZT17ZGVzY3JpcHRpb24gfHwgXCItXCJ9XG4gICAgICAgICAgICAgICAgICBhbW91bnRUZXh0PXt0b3RhbEFtb3VudFRleHR9XG4gICAgICAgICAgICAgICAgICBvbk9wZW49eygpID0+IGdvVG9EZXRhaWwoaWQpfVxuICAgICAgICAgICAgICAgICAgdGl0bGVDbGFzc05hbWU9XCJleHBlbnNlLXNoZWV0LWNhcmRfX3RpdGxlIHRpbWVsaW5lLW5hbWVcIlxuICAgICAgICAgICAgICAgICAgc3RhdHVzQ2xhc3NOYW1lPXtzdGF0dXNDbGFzc31cbiAgICAgICAgICAgICAgICAgIHN0YXR1c0xhYmVsPXtzdGF0dXNMYWJlbH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgKSA6IG51bGx9XG5cbiAgICAgIDxDb21wYWN0UGFnaW5hdGlvblxuICAgICAgICB0b3RhbFBhZ2VzPXt0b3RhbFBhZ2VzfVxuICAgICAgICBjdXJyZW50UGFnZT17Y3VycmVudFBhZ2V9XG4gICAgICAgIG9uUGFnZUNoYW5nZT17KHBhZ2UpID0+IHtcbiAgICAgICAgICBjb25zdCBzbmFwc2hvdCA9IGFwcGxpZWRGaWx0ZXJzIHx8IGN1cnJlbnRGaWx0ZXJzO1xuICAgICAgICAgIHZvaWQgbG9hZExpc3QocGFnZSwgc25hcHNob3QpO1xuICAgICAgICB9fVxuICAgICAgICBsYWJlbHM9e3BhZ2luYXRpb25MYWJlbHN9XG4gICAgICAvPlxuXG4gICAgICB7Y2FuQ3JlYXRlRXhwZW5zZSA/IChcbiAgICAgICAgPEZsb2F0aW5nQWN0aW9uQnV0dG9uXG4gICAgICAgICAgcm91dGU9XCJcIlxuICAgICAgICAgIGFyaWFMYWJlbD17aW5kVChcIkNvbW1vbl9DcmVhdGVcIiwgXCJDcmVhdGVcIil9XG4gICAgICAgICAgc2l6ZT17NzZ9XG4gICAgICAgICAgcmlnaHQ9ezE2fVxuICAgICAgICAgIGJvdHRvbT17MjR9XG4gICAgICAgICAgb25DbGljaz17aGFuZGxlT3BlbkNyZWF0ZVNoZWV0TW9kZX1cbiAgICAgICAgLz5cbiAgICAgICkgOiBudWxsfVxuICAgIDwvZGl2PlxuICApO1xufTtcblxuLy8gTWFpbiBwYWdlIGVudHJ5IGZvciBleHBlbnNlIHNoZWV0cyBsaXN0LlxuY29uc3QgRXhwZW5zZVNoZWV0c1BhZ2UgPSAoKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPFZpc2l0YXNQYWdlUHJvdmlkZXJzPlxuICAgICAgPEV4cGVuc2VTaGVldHNQYWdlQ29udGVudCAvPlxuICAgIDwvVmlzaXRhc1BhZ2VQcm92aWRlcnM+XG4gICk7XG59O1xuXG5jb25zdCBtb3VudCA9ICgpID0+IHtcbiAgY29uc3Qgcm9vdEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJleHBlbnNlLXNoZWV0cy1yb290XCIpO1xuICBpZiAoIXJvb3RFbCkgcmV0dXJuO1xuICBtb3VudFJlYWN0SXNsYW5kKHJvb3RFbCwgPEV4cGVuc2VTaGVldHNQYWdlIC8+KTtcbn07XG5cbm1vdW50V2hlbkRvY3VtZW50UmVhZHkobW91bnQpO1xuXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlU2hlZXRzUGFnZTtcbiIsICJpbXBvcnQgUmVhY3QsIHsgdXNlTWVtbyB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFNlbGVjdENvbWJvYm94IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvU2VsZWN0Q29tYm9ib3gudHN4XCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNlbGVjdE9wdGlvbiB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlU2VsZWN0T3B0aW9ucy50c1wiO1xuXG50eXBlIEV4cGVuc2VCaWxsZWRNb2RlRmlsdGVyU2VsZWN0UHJvcHMgPSB7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG4gIHZhbHVlOiBudW1iZXI7XG4gIG9uQ2hhbmdlOiAodmFsdWU6IG51bWJlcikgPT4gdm9pZDtcbiAgcmVhZE9ubHk/OiBib29sZWFuO1xuICBkaXNhYmxlZD86IGJvb2xlYW47XG4gIHNob3dMYWJlbD86IGJvb2xlYW47XG59O1xuXG4vLyBTaGFyZWQgYmlsbGVkIG1vZGUgZmlsdGVyIGZvciBleHBlbnNlIHNoZWV0IGxpc3QgcmVxdWVzdHMuXG5jb25zdCBFeHBlbnNlQmlsbGVkTW9kZUZpbHRlclNlbGVjdCA9ICh7XG4gIGxhYmVsLFxuICBwbGFjZWhvbGRlcixcbiAgdmFsdWUsXG4gIG9uQ2hhbmdlLFxuICByZWFkT25seSA9IGZhbHNlLFxuICBkaXNhYmxlZCA9IGZhbHNlLFxuICBzaG93TGFiZWwgPSB0cnVlLFxufTogRXhwZW5zZUJpbGxlZE1vZGVGaWx0ZXJTZWxlY3RQcm9wcykgPT4ge1xuICBjb25zdCBvcHRpb25zID0gdXNlTWVtbzxFeHBlbnNlU2VsZWN0T3B0aW9uW10+KFxuICAgICgpID0+IFtcbiAgICAgIHsgdmFsdWU6IFwiMFwiLCB0ZXh0OiBpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfU3RhdHVzX1VuYmlsbGVkXCIsIFwiTm8gUGFnYWRvXCIpIH0sXG4gICAgICB7IHZhbHVlOiBcIjFcIiwgdGV4dDogaW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX1N0YXR1c19CaWxsZWRcIiwgXCJQYWdhZG9cIikgfSxcbiAgICAgIHsgdmFsdWU6IFwiMlwiLCB0ZXh0OiBpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfU3RhdHVzX0JvdGhcIiwgXCJBbWJvc1wiKSB9LFxuICAgIF0sXG4gICAgW11cbiAgKTtcblxuICByZXR1cm4gKFxuICAgIDxTZWxlY3RDb21ib2JveFxuICAgICAgbGFiZWw9e2xhYmVsfVxuICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxuICAgICAgb3B0aW9ucz17b3B0aW9uc31cbiAgICAgIHZhbHVlPXt2YWx1ZX1cbiAgICAgIG9uQ2hhbmdlPXsobmV4dFZhbHVlKSA9PiB7XG4gICAgICAgIGNvbnN0IHBhcnNlZCA9IE51bWJlcihuZXh0VmFsdWUpO1xuICAgICAgICBpZiAocGFyc2VkID09PSAwIHx8IHBhcnNlZCA9PT0gMSB8fCBwYXJzZWQgPT09IDIpIHtcbiAgICAgICAgICBvbkNoYW5nZShwYXJzZWQpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBvbkNoYW5nZSgyKTtcbiAgICAgIH19XG4gICAgICByZWFkT25seT17cmVhZE9ubHl9XG4gICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICBpZEJhc2U9XCJleHBlbnNlLWJpbGxlZC1tb2RlXCJcbiAgICAgIHBvcnRhbENsYXNzTmFtZT1cInZpc2l0YXMtdHlwb2dyYXBoeVwiXG4gICAgICBwYW5lbENsYXNzTmFtZT1cInZpc2l0YXMtdHlwb2dyYXBoeVwiXG4gICAgICBhbGxvd1RleHRJbnB1dD17ZmFsc2V9XG4gICAgICBzaG93TGFiZWw9e3Nob3dMYWJlbH1cbiAgICAvPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZUJpbGxlZE1vZGVGaWx0ZXJTZWxlY3Q7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuaW1wb3J0IEhpc3RvcnlNYW51YWxEYXRlUGlja2VyLCB7XG4gIEhpc3RvcnlNYW51YWxEYXlDZWxsLFxufSBmcm9tIFwiLi4vLi4vdmlzaXRhcy9oaXN0b3JpYWwvSGlzdG9yeU1hbnVhbERhdGVQaWNrZXIudHN4XCI7XG5pbXBvcnQge1xuICBidWlsZENhbGVuZGFyTW9udGgsXG4gIGJ1aWxkRGF0ZVJhbmdlRGF5Q2VsbHMsXG4gIGZvY3VzRGF0ZVJhbmdlU2VjdGlvbixcbiAgZm9ybWF0RGF0ZVJhbmdlRGlzcGxheSxcbiAgaXNCZWZvcmVEYXksXG4gIHBhcnNlSXNvRGF0ZVJhbmdlVmFsdWUsXG4gIHJlc29sdmVVaUxvY2FsZSxcbiAgdG9Jc29EYXRlUmFuZ2VWYWx1ZSxcbiAgdG9TZW50ZW5jZUNhc2UsXG59IGZyb20gXCIuLi91dGlscy9leHBlbnNlRGF0ZVJhbmdlVXRpbHMudHNcIjtcblxudHlwZSBFeHBlbnNlRGF0ZVJhbmdlRmlsdGVyUHJvcHMgPSB7XG4gIGZyb21EYXRlOiBzdHJpbmc7XG4gIHRvRGF0ZTogc3RyaW5nO1xuICBvbkNoYW5nZTogKGZyb21EYXRlOiBzdHJpbmcsIHRvRGF0ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBhdXRvT3BlblJlcXVlc3RJZD86IG51bWJlcjtcbiAgc2hvd01hbnVhbEVycm9yPzogYm9vbGVhbjtcbiAgc2hvd1N0YXJ0RXJyb3I/OiBib29sZWFuO1xuICBzaG93RW5kRXJyb3I/OiBib29sZWFuO1xufTtcblxuLy8gU2hhcmVkIGRhdGUgcmFuZ2UgcGlja2VyIGZvciBleHBlbnNlIGZpbHRlcnMgYmFzZWQgb24gdGhlIGhpc3RvcnkgZGF0ZSBjb21wb25lbnQuXG5jb25zdCBFeHBlbnNlRGF0ZVJhbmdlRmlsdGVyID0gKHtcbiAgZnJvbURhdGUsXG4gIHRvRGF0ZSxcbiAgb25DaGFuZ2UsXG4gIGF1dG9PcGVuUmVxdWVzdElkID0gMCxcbiAgc2hvd01hbnVhbEVycm9yID0gZmFsc2UsXG4gIHNob3dTdGFydEVycm9yID0gZmFsc2UsXG4gIHNob3dFbmRFcnJvciA9IGZhbHNlLFxufTogRXhwZW5zZURhdGVSYW5nZUZpbHRlclByb3BzKSA9PiB7XG4gIGNvbnN0IGxvY2FsZSA9IHVzZU1lbW8oKCkgPT4gcmVzb2x2ZVVpTG9jYWxlKCksIFtdKTtcbiAgY29uc3QgYWN0aXZhdG9yUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IHBvcG92ZXJSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcblxuICBjb25zdCBbc3RhcnREYXRlLCBzZXRTdGFydERhdGVdID0gdXNlU3RhdGU8RGF0ZSB8IG51bGw+KCgpID0+IHBhcnNlSXNvRGF0ZVJhbmdlVmFsdWUoZnJvbURhdGUpKTtcbiAgY29uc3QgW2VuZERhdGUsIHNldEVuZERhdGVdID0gdXNlU3RhdGU8RGF0ZSB8IG51bGw+KCgpID0+IHBhcnNlSXNvRGF0ZVJhbmdlVmFsdWUodG9EYXRlKSk7XG4gIGNvbnN0IFtob3ZlckRhdGUsIHNldEhvdmVyRGF0ZV0gPSB1c2VTdGF0ZTxEYXRlIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtzZWxlY3RpbmdTdGVwLCBzZXRTZWxlY3RpbmdTdGVwXSA9IHVzZVN0YXRlPFwic3RhcnRcIiB8IFwiZW5kXCIgfCBcImRvbmVcIj4oXCJzdGFydFwiKTtcbiAgY29uc3QgW2lzT3Blbiwgc2V0SXNPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICBjb25zdCBub3cgPSB1c2VNZW1vKCgpID0+IG5ldyBEYXRlKCksIFtdKTtcbiAgY29uc3QgW2N1cnJlbnRNb250aCwgc2V0Q3VycmVudE1vbnRoXSA9IHVzZVN0YXRlKChwYXJzZUlzb0RhdGVSYW5nZVZhbHVlKGZyb21EYXRlKSB8fCBub3cpLmdldE1vbnRoKCkpO1xuICBjb25zdCBbY3VycmVudFllYXIsIHNldEN1cnJlbnRZZWFyXSA9IHVzZVN0YXRlKChwYXJzZUlzb0RhdGVSYW5nZVZhbHVlKGZyb21EYXRlKSB8fCBub3cpLmdldEZ1bGxZZWFyKCkpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc2V0U3RhcnREYXRlKHBhcnNlSXNvRGF0ZVJhbmdlVmFsdWUoZnJvbURhdGUpKTtcbiAgfSwgW2Zyb21EYXRlXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBzZXRFbmREYXRlKHBhcnNlSXNvRGF0ZVJhbmdlVmFsdWUodG9EYXRlKSk7XG4gIH0sIFt0b0RhdGVdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIG9uQ2hhbmdlKHN0YXJ0RGF0ZSA/IHRvSXNvRGF0ZVJhbmdlVmFsdWUoc3RhcnREYXRlKSA6IFwiXCIsIGVuZERhdGUgPyB0b0lzb0RhdGVSYW5nZVZhbHVlKGVuZERhdGUpIDogXCJcIik7XG4gIH0sIFtzdGFydERhdGUsIGVuZERhdGUsIG9uQ2hhbmdlXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWlzT3BlbikgcmV0dXJuO1xuXG4gICAgY29uc3QgaGFuZGxlT3V0c2lkZSA9IChldmVudDogTW91c2VFdmVudCkgPT4ge1xuICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0IGFzIE5vZGUgfCBudWxsO1xuICAgICAgaWYgKCF0YXJnZXQpIHJldHVybjtcbiAgICAgIGlmIChwb3BvdmVyUmVmLmN1cnJlbnQ/LmNvbnRhaW5zKHRhcmdldCkpIHJldHVybjtcbiAgICAgIGlmIChhY3RpdmF0b3JSZWYuY3VycmVudD8uY29udGFpbnModGFyZ2V0KSkgcmV0dXJuO1xuICAgICAgc2V0SXNPcGVuKGZhbHNlKTtcbiAgICAgIHNldEhvdmVyRGF0ZShudWxsKTtcbiAgICB9O1xuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBoYW5kbGVPdXRzaWRlKTtcbiAgICByZXR1cm4gKCkgPT4gZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBoYW5kbGVPdXRzaWRlKTtcbiAgfSwgW2lzT3Blbl0pO1xuXG4gIGNvbnN0IG9wZW5Qb3BvdmVyID0gdXNlQ2FsbGJhY2soXG4gICAgKHNlY3Rpb246IFwic3RhcnRcIiB8IFwiZW5kXCIpID0+IHtcbiAgICAgIHNldFNlbGVjdGluZ1N0ZXAoc2VjdGlvbik7XG4gICAgICBzZXRJc09wZW4odHJ1ZSk7XG4gICAgICBzZXRIb3ZlckRhdGUobnVsbCk7XG5cbiAgICAgIGNvbnN0IGJhc2UgPSBzZWN0aW9uID09PSBcInN0YXJ0XCIgPyBzdGFydERhdGUgfHwgZW5kRGF0ZSB8fCBub3cgOiBlbmREYXRlIHx8IHN0YXJ0RGF0ZSB8fCBub3c7XG4gICAgICBzZXRDdXJyZW50TW9udGgoYmFzZS5nZXRNb250aCgpKTtcbiAgICAgIHNldEN1cnJlbnRZZWFyKGJhc2UuZ2V0RnVsbFllYXIoKSk7XG4gICAgfSxcbiAgICBbZW5kRGF0ZSwgbm93LCBzdGFydERhdGVdXG4gICk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoYXV0b09wZW5SZXF1ZXN0SWQgPD0gMCkgcmV0dXJuO1xuICAgIHNldFNlbGVjdGluZ1N0ZXAoXCJzdGFydFwiKTtcbiAgICBzZXRJc09wZW4odHJ1ZSk7XG4gICAgc2V0SG92ZXJEYXRlKG51bGwpO1xuICAgIGNvbnN0IGJhc2UgPSBzdGFydERhdGUgfHwgZW5kRGF0ZSB8fCBub3c7XG4gICAgc2V0Q3VycmVudE1vbnRoKGJhc2UuZ2V0TW9udGgoKSk7XG4gICAgc2V0Q3VycmVudFllYXIoYmFzZS5nZXRGdWxsWWVhcigpKTtcbiAgfSwgW2F1dG9PcGVuUmVxdWVzdElkXSk7XG5cbiAgY29uc3Qgb25BY3RpdmF0b3JLZXlEb3duID0gdXNlQ2FsbGJhY2soXG4gICAgKGV2ZW50OiBSZWFjdC5LZXlib2FyZEV2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4ge1xuICAgICAgaWYgKGV2ZW50LmtleSAhPT0gXCJFbnRlclwiICYmIGV2ZW50LmtleSAhPT0gXCIgXCIpIHJldHVybjtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBvcGVuUG9wb3ZlcihcInN0YXJ0XCIpO1xuICAgIH0sXG4gICAgW29wZW5Qb3BvdmVyXVxuICApO1xuXG4gIGNvbnN0IG9uU2VjdGlvbktleURvd24gPSB1c2VDYWxsYmFjayhcbiAgICAoZXZlbnQ6IFJlYWN0LktleWJvYXJkRXZlbnQ8SFRNTERpdkVsZW1lbnQ+LCBzZWN0aW9uOiBcInN0YXJ0XCIgfCBcImVuZFwiKSA9PiB7XG4gICAgICBpZiAoZXZlbnQua2V5ICE9PSBcIkVudGVyXCIgJiYgZXZlbnQua2V5ICE9PSBcIiBcIikgcmV0dXJuO1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIG9wZW5Qb3BvdmVyKHNlY3Rpb24pO1xuICAgIH0sXG4gICAgW29wZW5Qb3BvdmVyXVxuICApO1xuXG4gIGNvbnN0IG9uQ2xlYXIgPSB1c2VDYWxsYmFjaygoZXZlbnQ6IFJlYWN0Lk1vdXNlRXZlbnQpID0+IHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHNldFN0YXJ0RGF0ZShudWxsKTtcbiAgICBzZXRFbmREYXRlKG51bGwpO1xuICAgIHNldEhvdmVyRGF0ZShudWxsKTtcbiAgICBzZXRTZWxlY3RpbmdTdGVwKFwic3RhcnRcIik7XG4gIH0sIFtdKTtcblxuICBjb25zdCBvblByZXZNb250aCA9IHVzZUNhbGxiYWNrKChldmVudDogUmVhY3QuTW91c2VFdmVudDxIVE1MQnV0dG9uRWxlbWVudD4pID0+IHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBzZXRDdXJyZW50TW9udGgoKHByZXZpb3VzKSA9PiB7XG4gICAgICBjb25zdCBuZXh0ID0gcHJldmlvdXMgLSAxO1xuICAgICAgaWYgKG5leHQgPCAwKSB7XG4gICAgICAgIHNldEN1cnJlbnRZZWFyKCh5ZWFyKSA9PiB5ZWFyIC0gMSk7XG4gICAgICAgIHJldHVybiAxMTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXh0O1xuICAgIH0pO1xuICB9LCBbXSk7XG5cbiAgY29uc3Qgb25OZXh0TW9udGggPSB1c2VDYWxsYmFjaygoZXZlbnQ6IFJlYWN0Lk1vdXNlRXZlbnQ8SFRNTEJ1dHRvbkVsZW1lbnQ+KSA9PiB7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgc2V0Q3VycmVudE1vbnRoKChwcmV2aW91cykgPT4ge1xuICAgICAgY29uc3QgbmV4dCA9IHByZXZpb3VzICsgMTtcbiAgICAgIGlmIChuZXh0ID4gMTEpIHtcbiAgICAgICAgc2V0Q3VycmVudFllYXIoKHllYXIpID0+IHllYXIgKyAxKTtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV4dDtcbiAgICB9KTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IG9uRGF5Q2xpY2sgPSB1c2VDYWxsYmFjayhcbiAgICAoZGF5OiBIaXN0b3J5TWFudWFsRGF5Q2VsbCkgPT4ge1xuICAgICAgaWYgKCFkYXkuZGF0ZSB8fCBkYXkuZGlzYWJsZWQpIHJldHVybjtcblxuICAgICAgY29uc3QgbmV4dERhdGUgPSBuZXcgRGF0ZShkYXkuZGF0ZS5nZXRGdWxsWWVhcigpLCBkYXkuZGF0ZS5nZXRNb250aCgpLCBkYXkuZGF0ZS5nZXREYXRlKCkpO1xuXG4gICAgICBpZiAoIXN0YXJ0RGF0ZSB8fCBzZWxlY3RpbmdTdGVwID09PSBcInN0YXJ0XCIpIHtcbiAgICAgICAgc2V0U3RhcnREYXRlKG5leHREYXRlKTtcbiAgICAgICAgaWYgKGVuZERhdGUgJiYgaXNCZWZvcmVEYXkoZW5kRGF0ZSwgbmV4dERhdGUpKSB7XG4gICAgICAgICAgc2V0RW5kRGF0ZShudWxsKTtcbiAgICAgICAgfVxuICAgICAgICBzZXRTZWxlY3RpbmdTdGVwKFwiZW5kXCIpO1xuICAgICAgICBzZXRDdXJyZW50TW9udGgobmV4dERhdGUuZ2V0TW9udGgoKSk7XG4gICAgICAgIHNldEN1cnJlbnRZZWFyKG5leHREYXRlLmdldEZ1bGxZZWFyKCkpO1xuICAgICAgICBmb2N1c0RhdGVSYW5nZVNlY3Rpb24oYWN0aXZhdG9yUmVmLmN1cnJlbnQsIFwiZW5kXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChzZWxlY3RpbmdTdGVwID09PSBcImVuZFwiKSB7XG4gICAgICAgIGlmIChpc0JlZm9yZURheShuZXh0RGF0ZSwgc3RhcnREYXRlKSkge1xuICAgICAgICAgIHNldEVuZERhdGUoc3RhcnREYXRlKTtcbiAgICAgICAgICBzZXRTdGFydERhdGUobmV4dERhdGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNldEVuZERhdGUobmV4dERhdGUpO1xuICAgICAgICB9XG4gICAgICAgIHNldFNlbGVjdGluZ1N0ZXAoXCJkb25lXCIpO1xuICAgICAgICBzZXRJc09wZW4oZmFsc2UpO1xuICAgICAgICBzZXRIb3ZlckRhdGUobnVsbCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBbZW5kRGF0ZSwgc2VsZWN0aW5nU3RlcCwgc3RhcnREYXRlXVxuICApO1xuXG4gIGNvbnN0IG9uRGF5SG92ZXIgPSB1c2VDYWxsYmFjayhcbiAgICAoZGF5OiBIaXN0b3J5TWFudWFsRGF5Q2VsbCkgPT4ge1xuICAgICAgaWYgKCFkYXkuZGF0ZSB8fCBzZWxlY3RpbmdTdGVwICE9PSBcImVuZFwiIHx8ICFzdGFydERhdGUpIHJldHVybjtcbiAgICAgIHNldEhvdmVyRGF0ZShuZXcgRGF0ZShkYXkuZGF0ZS5nZXRGdWxsWWVhcigpLCBkYXkuZGF0ZS5nZXRNb250aCgpLCBkYXkuZGF0ZS5nZXREYXRlKCkpKTtcbiAgICB9LFxuICAgIFtzZWxlY3RpbmdTdGVwLCBzdGFydERhdGVdXG4gICk7XG5cbiAgY29uc3Qgb25HcmlkTW91c2VMZWF2ZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBzZXRIb3ZlckRhdGUobnVsbCk7XG4gIH0sIFtdKTtcblxuICBjb25zdCBjYWxlbmRhciA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIHJldHVybiBidWlsZENhbGVuZGFyTW9udGgoY3VycmVudFllYXIsIGN1cnJlbnRNb250aCwgbG9jYWxlKTtcbiAgfSwgW2N1cnJlbnRNb250aCwgY3VycmVudFllYXIsIGxvY2FsZV0pO1xuXG4gIGNvbnN0IGRheUNlbGxzID0gdXNlTWVtbyhcbiAgICAoKSA9PiBidWlsZERhdGVSYW5nZURheUNlbGxzKGNhbGVuZGFyLmNlbGxzLCBzdGFydERhdGUsIGVuZERhdGUsIGhvdmVyRGF0ZSwgc2VsZWN0aW5nU3RlcCksXG4gICAgW2NhbGVuZGFyLmNlbGxzLCBlbmREYXRlLCBob3ZlckRhdGUsIHNlbGVjdGluZ1N0ZXAsIHN0YXJ0RGF0ZV1cbiAgKTtcblxuICBjb25zdCBsYWJlbEZyb20gPSB0b1NlbnRlbmNlQ2FzZShpbmRUKFwiSGlzdG9yeV9Gcm9tXCIsIFwiRnJvbVwiKSwgbG9jYWxlKTtcbiAgY29uc3QgbGFiZWxUbyA9IHRvU2VudGVuY2VDYXNlKGluZFQoXCJIaXN0b3J5X1RvXCIsIFwiVG9cIiksIGxvY2FsZSk7XG5cbiAgcmV0dXJuIChcbiAgICA8SGlzdG9yeU1hbnVhbERhdGVQaWNrZXJcbiAgICAgIGFjdGl2YXRvclJlZj17YWN0aXZhdG9yUmVmfVxuICAgICAgcG9wb3ZlclJlZj17cG9wb3ZlclJlZn1cbiAgICAgIHNob3dNYW51YWxFcnJvcj17c2hvd01hbnVhbEVycm9yfVxuICAgICAgc2hvd1N0YXJ0RXJyb3I9e3Nob3dTdGFydEVycm9yfVxuICAgICAgc2hvd0VuZEVycm9yPXtzaG93RW5kRXJyb3J9XG4gICAgICBmaWx0ZXJUaXRsZT17aW5kVChcIkhpc3RvcnlfRmlsdGVyX0RhdGVcIiwgXCJEYXRlXCIpfVxuICAgICAgaXNPcGVuPXtpc09wZW59XG4gICAgICBzZWxlY3RpbmdTdGVwPXtzZWxlY3RpbmdTdGVwfVxuICAgICAgbGFiZWxGcm9tPXtsYWJlbEZyb219XG4gICAgICBsYWJlbFRvPXtsYWJlbFRvfVxuICAgICAgc3RhcnREYXRlVGV4dD17c3RhcnREYXRlID8gZm9ybWF0RGF0ZVJhbmdlRGlzcGxheShzdGFydERhdGUsIGxvY2FsZSkgOiBpbmRUKFwiSGlzdG9yeV9BZGREYXRlXCIsIFwiQWRkIGRhdGVcIil9XG4gICAgICBlbmREYXRlVGV4dD17ZW5kRGF0ZSA/IGZvcm1hdERhdGVSYW5nZURpc3BsYXkoZW5kRGF0ZSwgbG9jYWxlKSA6IGluZFQoXCJIaXN0b3J5X0FkZERhdGVcIiwgXCJBZGQgZGF0ZVwiKX1cbiAgICAgIGNsZWFyUmFuZ2VMYWJlbD17aW5kVChcIkhpc3RvcnlfQ2xlYXJSYW5nZVwiLCBcIkNsZWFyIHJhbmdlXCIpfVxuICAgICAgaGFzU2VsZWN0ZWRSYW5nZT17ISFzdGFydERhdGUgfHwgISFlbmREYXRlfVxuICAgICAgbW9udGhMYWJlbD17Y2FsZW5kYXIubW9udGhMYWJlbH1cbiAgICAgIHdlZWtEYXlMYWJlbHM9e1tcbiAgICAgICAgaW5kVChcIkhpc3RvcnlfRGF5X01vblwiLCBcIk1vblwiKSxcbiAgICAgICAgaW5kVChcIkhpc3RvcnlfRGF5X1R1ZVwiLCBcIlR1ZVwiKSxcbiAgICAgICAgaW5kVChcIkhpc3RvcnlfRGF5X1dlZFwiLCBcIldlZFwiKSxcbiAgICAgICAgaW5kVChcIkhpc3RvcnlfRGF5X1RodVwiLCBcIlRodVwiKSxcbiAgICAgICAgaW5kVChcIkhpc3RvcnlfRGF5X0ZyaVwiLCBcIkZyaVwiKSxcbiAgICAgICAgaW5kVChcIkhpc3RvcnlfRGF5X1NhdFwiLCBcIlNhdFwiKSxcbiAgICAgICAgaW5kVChcIkhpc3RvcnlfRGF5X1N1blwiLCBcIlN1blwiKSxcbiAgICAgIF19XG4gICAgICBzdGF0dXNUZXh0PXtcbiAgICAgICAgc2VsZWN0aW5nU3RlcCA9PT0gXCJzdGFydFwiXG4gICAgICAgICAgPyBpbmRUKFwiSGlzdG9yeV9TdGF0dXNfU2VsZWN0U3RhcnRcIiwgXCJTZWxlY3Qgc3RhcnQgZGF0ZVwiKVxuICAgICAgICAgIDogaW5kVChcIkhpc3RvcnlfU3RhdHVzX1NlbGVjdEVuZFwiLCBcIlNlbGVjdCBlbmQgZGF0ZVwiKVxuICAgICAgfVxuICAgICAgZGF5Q2VsbHM9e2RheUNlbGxzfVxuICAgICAgcHJldk1vbnRoTGFiZWw9e2luZFQoXCJIaXN0b3J5X1ByZXZNb250aFwiLCBcIlByZXZpb3VzIG1vbnRoXCIpfVxuICAgICAgbmV4dE1vbnRoTGFiZWw9e2luZFQoXCJIaXN0b3J5X05leHRNb250aFwiLCBcIk5leHQgbW9udGhcIil9XG4gICAgICBvbk9wZW5Qb3BvdmVyPXtvcGVuUG9wb3Zlcn1cbiAgICAgIG9uQWN0aXZhdG9yS2V5RG93bj17b25BY3RpdmF0b3JLZXlEb3dufVxuICAgICAgb25TZWN0aW9uS2V5RG93bj17b25TZWN0aW9uS2V5RG93bn1cbiAgICAgIG9uQ2xlYXI9e29uQ2xlYXJ9XG4gICAgICBvblByZXZNb250aD17b25QcmV2TW9udGh9XG4gICAgICBvbk5leHRNb250aD17b25OZXh0TW9udGh9XG4gICAgICBvbkdyaWRNb3VzZUxlYXZlPXtvbkdyaWRNb3VzZUxlYXZlfVxuICAgICAgb25EYXlDbGljaz17b25EYXlDbGlja31cbiAgICAgIG9uRGF5SG92ZXI9e29uRGF5SG92ZXJ9XG4gICAgLz5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VEYXRlUmFuZ2VGaWx0ZXI7XG4iLCAiaW1wb3J0IHsgY2xhc3NOYW1lcyB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9jbGFzc05hbWVzLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEhpc3RvcnlNYW51YWxEYXlDZWxsIH0gZnJvbSBcIi4uLy4uL3Zpc2l0YXMvaGlzdG9yaWFsL0hpc3RvcnlNYW51YWxEYXRlUGlja2VyLnRzeFwiO1xuXG5leHBvcnQgdHlwZSBDYWxlbmRhckNlbGwgPSB7XG4gIGRhdGU6IERhdGUgfCBudWxsO1xuICBpc286IHN0cmluZztcbiAgaXNFbXB0eTogYm9vbGVhbjtcbn07XG5cbmNvbnN0IHBhZCA9ICh2YWx1ZTogbnVtYmVyKTogc3RyaW5nID0+IHZhbHVlLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgXCIwXCIpO1xuXG5leHBvcnQgY29uc3QgdG9Jc29EYXRlUmFuZ2VWYWx1ZSA9IChkYXRlOiBEYXRlKTogc3RyaW5nID0+IHtcbiAgcmV0dXJuIGAke2RhdGUuZ2V0RnVsbFllYXIoKX0tJHtwYWQoZGF0ZS5nZXRNb250aCgpICsgMSl9LSR7cGFkKGRhdGUuZ2V0RGF0ZSgpKX1gO1xufTtcblxuZXhwb3J0IGNvbnN0IHBhcnNlSXNvRGF0ZVJhbmdlVmFsdWUgPSAodmFsdWU6IHN0cmluZyk6IERhdGUgfCBudWxsID0+IHtcbiAgaWYgKCF2YWx1ZSkgcmV0dXJuIG51bGw7XG4gIGNvbnN0IHRyaW1tZWQgPSBTdHJpbmcodmFsdWUpLnRyaW0oKTtcbiAgaWYgKCF0cmltbWVkKSByZXR1cm4gbnVsbDtcblxuICBjb25zdCBkYXRlUGFydCA9IHRyaW1tZWQuc3BsaXQoXCJUXCIpWzBdLnNwbGl0KFwiIFwiKVswXTtcbiAgaWYgKCEvXlxcZHs0fS1cXGR7Mn0tXFxkezJ9JC8udGVzdChkYXRlUGFydCkpIHJldHVybiBudWxsO1xuXG4gIGNvbnN0IFt5ZWFyLCBtb250aCwgZGF5XSA9IGRhdGVQYXJ0LnNwbGl0KFwiLVwiKS5tYXAoTnVtYmVyKTtcbiAgcmV0dXJuIG5ldyBEYXRlKHllYXIsIG1vbnRoIC0gMSwgZGF5KTtcbn07XG5cbmV4cG9ydCBjb25zdCBpc1NhbWVEYXkgPSAoYTogRGF0ZSB8IG51bGwsIGI6IERhdGUgfCBudWxsKTogYm9vbGVhbiA9PiB7XG4gIHJldHVybiAhIShhICYmIGIgJiYgYS5nZXRUaW1lKCkgPT09IGIuZ2V0VGltZSgpKTtcbn07XG5cbmV4cG9ydCBjb25zdCBpc0JlZm9yZURheSA9IChhOiBEYXRlIHwgbnVsbCwgYjogRGF0ZSB8IG51bGwpOiBib29sZWFuID0+IHtcbiAgcmV0dXJuICEhKGEgJiYgYiAmJiBhLmdldFRpbWUoKSA8IGIuZ2V0VGltZSgpKTtcbn07XG5cbmV4cG9ydCBjb25zdCBmb2N1c0RhdGVSYW5nZVNlY3Rpb24gPSAoY29udGFpbmVyOiBIVE1MRGl2RWxlbWVudCB8IG51bGwsIHNlY3Rpb246IFwic3RhcnRcIiB8IFwiZW5kXCIpOiB2b2lkID0+IHtcbiAgaWYgKCFjb250YWluZXIpIHJldHVybjtcbiAgY29uc3QgdGFyZ2V0ID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQ+KGBbZGF0YS1zZWN0aW9uPVwiJHtzZWN0aW9ufVwiXWApO1xuICBpZiAoIXRhcmdldCkgcmV0dXJuO1xuICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHRhcmdldC5mb2N1cygpKTtcbn07XG5cbmNvbnN0IHRvVGl0bGVDYXNlID0gKHZhbHVlOiBzdHJpbmcsIGxvY2FsZTogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgaWYgKCF2YWx1ZSkgcmV0dXJuIFwiXCI7XG4gIGNvbnN0IGxvd2VyID0gdmFsdWUudG9Mb2NhbGVMb3dlckNhc2UobG9jYWxlKTtcbiAgcmV0dXJuIGxvd2VyWzBdLnRvTG9jYWxlVXBwZXJDYXNlKGxvY2FsZSkgKyBsb3dlci5zbGljZSgxKTtcbn07XG5cbmV4cG9ydCBjb25zdCB0b1NlbnRlbmNlQ2FzZSA9ICh2YWx1ZTogc3RyaW5nLCBsb2NhbGU6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGlmICghdmFsdWUpIHJldHVybiBcIlwiO1xuICBjb25zdCB0cmltbWVkID0gdmFsdWUudHJpbSgpO1xuICBpZiAoIXRyaW1tZWQpIHJldHVybiB0cmltbWVkO1xuICBjb25zdCBsb3dlciA9IHRyaW1tZWQudG9Mb2NhbGVMb3dlckNhc2UobG9jYWxlKTtcbiAgcmV0dXJuIGxvd2VyWzBdLnRvTG9jYWxlVXBwZXJDYXNlKGxvY2FsZSkgKyBsb3dlci5zbGljZSgxKTtcbn07XG5cbmV4cG9ydCBjb25zdCBmb3JtYXREYXRlUmFuZ2VEaXNwbGF5ID0gKGRhdGU6IERhdGUsIGxvY2FsZTogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgcmV0dXJuIGRhdGVcbiAgICAudG9Mb2NhbGVEYXRlU3RyaW5nKGxvY2FsZSwge1xuICAgICAgZGF5OiBcIm51bWVyaWNcIixcbiAgICAgIG1vbnRoOiBcInNob3J0XCIsXG4gICAgICB5ZWFyOiBcIm51bWVyaWNcIixcbiAgICB9KVxuICAgIC5yZXBsYWNlKC9cXC4vZywgXCJcIilcbiAgICAudG9Mb3dlckNhc2UoKTtcbn07XG5cbmV4cG9ydCBjb25zdCBmb3JtYXRNb250aExhYmVsID0gKGRhdGU6IERhdGUsIGxvY2FsZTogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgY29uc3QgbW9udGhOYW1lID0gZGF0ZS50b0xvY2FsZURhdGVTdHJpbmcobG9jYWxlLCB7IG1vbnRoOiBcImxvbmdcIiB9KTtcbiAgcmV0dXJuIGAke3RvVGl0bGVDYXNlKG1vbnRoTmFtZSwgbG9jYWxlKX0gJHtkYXRlLmdldEZ1bGxZZWFyKCl9YDtcbn07XG5cbmV4cG9ydCBjb25zdCByZXNvbHZlVWlMb2NhbGUgPSAoKTogc3RyaW5nID0+IHtcbiAgY29uc3QgZnJvbUh0bWwgPSB0eXBlb2YgZG9jdW1lbnQgIT09IFwidW5kZWZpbmVkXCIgPyBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQubGFuZyA6IFwiXCI7XG4gIHJldHVybiBmcm9tSHRtbCAmJiBTdHJpbmcoZnJvbUh0bWwpLnRyaW0oKSA/IGZyb21IdG1sIDogXCJlcy1FU1wiO1xufTtcblxuZXhwb3J0IGNvbnN0IGJ1aWxkQ2FsZW5kYXJNb250aCA9ICh5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXIsIGxvY2FsZTogc3RyaW5nKTogeyBtb250aExhYmVsOiBzdHJpbmc7IGNlbGxzOiBDYWxlbmRhckNlbGxbXSB9ID0+IHtcbiAgY29uc3QgZmlyc3REYXkgPSBuZXcgRGF0ZSh5ZWFyLCBtb250aCwgMSk7XG4gIGNvbnN0IGRheXNJbk1vbnRoID0gbmV3IERhdGUoeWVhciwgbW9udGggKyAxLCAwKS5nZXREYXRlKCk7XG4gIGNvbnN0IG9mZnNldCA9IChmaXJzdERheS5nZXREYXkoKSArIDYpICUgNztcbiAgY29uc3QgY2VsbHM6IENhbGVuZGFyQ2VsbFtdID0gW107XG5cbiAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IG9mZnNldDsgaW5kZXggKz0gMSkge1xuICAgIGNlbGxzLnB1c2goeyBkYXRlOiBudWxsLCBpc286IFwiXCIsIGlzRW1wdHk6IHRydWUgfSk7XG4gIH1cblxuICBmb3IgKGxldCBkYXkgPSAxOyBkYXkgPD0gZGF5c0luTW9udGg7IGRheSArPSAxKSB7XG4gICAgY29uc3QgZGF0ZU9iaiA9IG5ldyBEYXRlKHllYXIsIG1vbnRoLCBkYXkpO1xuICAgIGNlbGxzLnB1c2goeyBkYXRlOiBkYXRlT2JqLCBpc286IHRvSXNvRGF0ZVJhbmdlVmFsdWUoZGF0ZU9iaiksIGlzRW1wdHk6IGZhbHNlIH0pO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBtb250aExhYmVsOiBmb3JtYXRNb250aExhYmVsKGZpcnN0RGF5LCBsb2NhbGUpLFxuICAgIGNlbGxzLFxuICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IGJ1aWxkRGF0ZVJhbmdlRGF5Q2VsbHMgPSAoXG4gIGNlbGxzOiBDYWxlbmRhckNlbGxbXSxcbiAgc3RhcnREYXRlOiBEYXRlIHwgbnVsbCxcbiAgZW5kRGF0ZTogRGF0ZSB8IG51bGwsXG4gIGhvdmVyRGF0ZTogRGF0ZSB8IG51bGwsXG4gIHNlbGVjdGluZ1N0ZXA6IFwic3RhcnRcIiB8IFwiZW5kXCIgfCBcImRvbmVcIlxuKTogSGlzdG9yeU1hbnVhbERheUNlbGxbXSA9PiB7XG4gIGNvbnN0IHByZXZpZXdFbmQgPSBlbmREYXRlIHx8IChzZWxlY3RpbmdTdGVwID09PSBcImVuZFwiID8gaG92ZXJEYXRlIDogbnVsbCk7XG5cbiAgcmV0dXJuIGNlbGxzLm1hcCgoY2VsbCwgaW5kZXgpID0+IHtcbiAgICBpZiAoY2VsbC5pc0VtcHR5IHx8ICFjZWxsLmRhdGUpIHtcbiAgICAgIHJldHVybiB7IGtleTogYGVtcHR5LSR7aW5kZXh9YCwgaXNFbXB0eTogdHJ1ZSB9O1xuICAgIH1cblxuICAgIGNvbnN0IGRhdGVPYmogPSBjZWxsLmRhdGU7XG4gICAgY29uc3QgaXNTdGFydCA9IGlzU2FtZURheShkYXRlT2JqLCBzdGFydERhdGUpO1xuICAgIGNvbnN0IGlzRW5kID0gaXNTYW1lRGF5KGRhdGVPYmosIGVuZERhdGUpO1xuICAgIGNvbnN0IGluUmFuZ2UgPSBzdGFydERhdGUgJiYgcHJldmlld0VuZCAmJiBpc0JlZm9yZURheShzdGFydERhdGUsIGRhdGVPYmopICYmIGlzQmVmb3JlRGF5KGRhdGVPYmosIHByZXZpZXdFbmQpO1xuICAgIGNvbnN0IGhvdmVyUmFuZ2UgPSBzdGFydERhdGUgJiYgIWVuZERhdGUgJiYgaG92ZXJEYXRlICYmIGlzQmVmb3JlRGF5KHN0YXJ0RGF0ZSwgZGF0ZU9iaikgJiYgaXNCZWZvcmVEYXkoZGF0ZU9iaiwgaG92ZXJEYXRlKTtcbiAgICBjb25zdCBkaXNhYmxlZCA9IHNlbGVjdGluZ1N0ZXAgPT09IFwiZW5kXCIgJiYgISFzdGFydERhdGUgJiYgaXNCZWZvcmVEYXkoZGF0ZU9iaiwgc3RhcnREYXRlKTtcbiAgICBjb25zdCBpc1RvZGF5ID0gaXNTYW1lRGF5KGRhdGVPYmosIG5ldyBEYXRlKCkpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGtleTogY2VsbC5pc28sXG4gICAgICBpc0VtcHR5OiBmYWxzZSxcbiAgICAgIGRhdGU6IGRhdGVPYmosXG4gICAgICBpc286IGNlbGwuaXNvLFxuICAgICAgZGF5TGFiZWw6IGRhdGVPYmouZ2V0RGF0ZSgpLFxuICAgICAgZGF5Q2xhc3M6IGNsYXNzTmFtZXMoXG4gICAgICAgIFwiZHJwLWRheVwiLFxuICAgICAgICBpc1N0YXJ0ID8gXCJzdGFydCByYW5nZS1zdGFydFwiIDogXCJcIixcbiAgICAgICAgaXNFbmQgPyBcImVuZCByYW5nZS1lbmRcIiA6IFwiXCIsXG4gICAgICAgIGluUmFuZ2UgPyBcImluLXJhbmdlXCIgOiBcIlwiLFxuICAgICAgICBob3ZlclJhbmdlID8gXCJob3Zlci1yYW5nZVwiIDogXCJcIixcbiAgICAgICAgZGlzYWJsZWQgPyBcImRpc2FibGVkXCIgOiBcIlwiLFxuICAgICAgICBpc1RvZGF5ID8gXCJ0b2RheVwiIDogXCJcIlxuICAgICAgKSxcbiAgICAgIGRpc2FibGVkLFxuICAgIH07XG4gIH0pO1xufTtcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgQWN0aW9uQnV0dG9uIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvQWN0aW9uQnV0dG9uLnRzeFwiO1xuXG50eXBlIEV4cGVuc2VGaWx0ZXJBY3Rpb25zUHJvcHMgPSB7XG4gIGNsZWFyTGFiZWw6IHN0cmluZztcbiAgYXBwbHlMYWJlbDogc3RyaW5nO1xuICBvbkNsZWFyOiAoKSA9PiB2b2lkO1xuICBvbkFwcGx5OiAoKSA9PiB2b2lkO1xufTtcblxuLy8gU2hhcmVkIGFwcGx5L2NsZWFyIGFjdGlvbiByb3cgZm9yIGV4cGVuc2Ugc2hlZXQgZmlsdGVycy5cbmNvbnN0IEV4cGVuc2VGaWx0ZXJBY3Rpb25zID0gKHtcbiAgY2xlYXJMYWJlbCxcbiAgYXBwbHlMYWJlbCxcbiAgb25DbGVhcixcbiAgb25BcHBseSxcbn06IEV4cGVuc2VGaWx0ZXJBY3Rpb25zUHJvcHMpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTEgZ3JpZCBncmlkLWNvbHMtMiBnYXAtMiBoaXN0b3J5LWZpbHRlci1hY3Rpb25zXCI+XG4gICAgICA8QWN0aW9uQnV0dG9uIGxhYmVsPXtjbGVhckxhYmVsfSBjbGFzc05hbWU9XCJ3LWZ1bGxcIiBvbkNsaWNrPXtvbkNsZWFyfSAvPlxuICAgICAgPEFjdGlvbkJ1dHRvbiBsYWJlbD17YXBwbHlMYWJlbH0gY2xhc3NOYW1lPVwidy1mdWxsXCIgb25DbGljaz17b25BcHBseX0gLz5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VGaWx0ZXJBY3Rpb25zO1xuIiwgImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjayB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFJlbW90ZVNlYXJjaENvbWJvYm94LCB7IHR5cGUgUmVtb3RlU2VhcmNoT3B0aW9uIH0gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9SZW1vdGVTZWFyY2hDb21ib2JveC50c3hcIjtcbmltcG9ydCB7IEFwaUZldGNoRXJyb3IgfSBmcm9tIFwiLi4vLi4vLi4vc2VydmljZXMvYXBpU2VydmljZS50c1wiO1xuaW1wb3J0IHsgYnVpbGRFeHBlbnNlU2hlZXRTdWdnZXN0UGF5bG9hZCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlUGF5bG9hZEJ1aWxkZXJzLnRzXCI7XG5pbXBvcnQgeyBmZXRjaEV4cGVuc2VTaGVldExpc3QgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZUFwaS50c1wiO1xuXG50eXBlIEV4cGVuc2VTaGVldEZpbHRlcklucHV0UHJvcHMgPSB7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG4gIHZhbHVlOiBzdHJpbmc7XG4gIG9uQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgZW5hYmxlUmVtb3RlU3VnZ2VzdGlvbnM/OiBib29sZWFuO1xuICBkaXNhYmxlZD86IGJvb2xlYW47XG4gIHJlYWRPbmx5PzogYm9vbGVhbjtcbiAgc2hvd0xhYmVsPzogYm9vbGVhbjtcbn07XG5cbmNvbnN0IFNFQVJDSF9QQUdFX1NJWkUgPSAxMDtcblxuY29uc3QgbWFwU2hlZXRPcHRpb25zID0gKGl0ZW1zOiBBcnJheTx7IGhvamFHYXN0b3NJZD86IHN0cmluZzsgZGVzY3JpcHRpb24/OiBzdHJpbmcgfT4gfCB1bmRlZmluZWQpOiBSZW1vdGVTZWFyY2hPcHRpb25bXSA9PiB7XG4gIHJldHVybiAoQXJyYXkuaXNBcnJheShpdGVtcykgPyBpdGVtcyA6IFtdKVxuICAgIC5tYXAoKGl0ZW0pID0+IHtcbiAgICAgIGNvbnN0IGlkID0gU3RyaW5nKGl0ZW0/LmhvamFHYXN0b3NJZCB8fCBcIlwiKS50cmltKCk7XG4gICAgICBpZiAoIWlkKSByZXR1cm4gbnVsbDtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHZhbHVlOiBpZCxcbiAgICAgICAgdGl0bGU6IGlkLFxuICAgICAgICBzdWJ0aXRsZTogU3RyaW5nKGl0ZW0/LmRlc2NyaXB0aW9uIHx8IFwiXCIpLnRyaW0oKSB8fCBcIi1cIixcbiAgICAgIH0gYXMgUmVtb3RlU2VhcmNoT3B0aW9uO1xuICAgIH0pXG4gICAgLmZpbHRlcihCb29sZWFuKSBhcyBSZW1vdGVTZWFyY2hPcHRpb25bXTtcbn07XG5cbi8vIEV4cGVuc2Ugc2hlZXQgZmlsdGVyIGlucHV0IHdpdGggcmVtb3RlIGxpc3Qgc3VnZ2VzdGlvbnMuXG5jb25zdCBFeHBlbnNlU2hlZXRGaWx0ZXJJbnB1dCA9ICh7XG4gIGxhYmVsLFxuICBwbGFjZWhvbGRlcixcbiAgdmFsdWUsXG4gIG9uQ2hhbmdlLFxuICBlbmFibGVSZW1vdGVTdWdnZXN0aW9ucyA9IHRydWUsXG4gIGRpc2FibGVkID0gZmFsc2UsXG4gIHJlYWRPbmx5ID0gZmFsc2UsXG4gIHNob3dMYWJlbCA9IHRydWUsXG59OiBFeHBlbnNlU2hlZXRGaWx0ZXJJbnB1dFByb3BzKSA9PiB7XG4gIGNvbnN0IHJlYWRPbmx5TW9kZSA9IHJlYWRPbmx5IHx8IGRpc2FibGVkO1xuXG4gIGNvbnN0IGxvYWRPcHRpb25zID0gdXNlQ2FsbGJhY2soYXN5bmMgKHRlcm06IHN0cmluZywgc2lnbmFsOiBBYm9ydFNpZ25hbCk6IFByb21pc2U8UmVtb3RlU2VhcmNoT3B0aW9uW10+ID0+IHtcbiAgICBjb25zdCBwYXlsb2FkID0gYnVpbGRFeHBlbnNlU2hlZXRTdWdnZXN0UGF5bG9hZCh0ZXJtLCBTRUFSQ0hfUEFHRV9TSVpFLCAxKTtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoRXhwZW5zZVNoZWV0TGlzdChwYXlsb2FkLCB7XG4gICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcbiAgICAgIHNpZ25hbCxcbiAgICB9KTtcblxuICAgIHJldHVybiBtYXBTaGVldE9wdGlvbnMocmVzcG9uc2U/Lml0ZW1zKTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IGxvYWRPcHRpb25zUGFnZSA9IHVzZUNhbGxiYWNrKGFzeW5jICh0ZXJtOiBzdHJpbmcsIHBhZ2U6IG51bWJlciwgcGFnZVNpemU6IG51bWJlciwgc2lnbmFsOiBBYm9ydFNpZ25hbCkgPT4ge1xuICAgIC8vIFRoaXMgY29udHJvbGxlciBlbmRwb2ludCBydW5zIHNlcnZlci1zaWRlIGFuZCBhbHdheXMgZm9yd2FyZHMgYXV0aCwgY29tcGFueSBhbmQgQXhVc2VyIGhlYWRlcnMuXG4gICAgY29uc3QgcGF5bG9hZCA9IGJ1aWxkRXhwZW5zZVNoZWV0U3VnZ2VzdFBheWxvYWQodGVybSwgcGFnZVNpemUsIHBhZ2UpO1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hFeHBlbnNlU2hlZXRMaXN0KHBheWxvYWQsIHtcbiAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxuICAgICAgc2lnbmFsLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGl0ZW1zOiBtYXBTaGVldE9wdGlvbnMocmVzcG9uc2U/Lml0ZW1zKSxcbiAgICAgIHRvdGFsOiBOdW1iZXIocmVzcG9uc2U/LnRvdGFsIHx8IDApLFxuICAgIH07XG4gIH0sIFtdKTtcblxuICBpZiAoIWVuYWJsZVJlbW90ZVN1Z2dlc3Rpb25zIHx8IHJlYWRPbmx5TW9kZSkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMlwiPlxuICAgICAgICB7c2hvd0xhYmVsID8gKFxuICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb3JtLWxhYmVsIGZvbnQtc2VtaWJvbGRcIiBzdHlsZT17eyBjb2xvcjogXCIjMDAyOTZiZTBcIiB9fT5cbiAgICAgICAgICAgIHtsYWJlbH1cbiAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICApIDogbnVsbH1cbiAgICAgICAgPGlucHV0XG4gICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgcHgtMyBweS0yIHRleHQtc20gc206dGV4dC1iYXNlIGxlYWRpbmctNSB0ZXh0LXNsYXRlLTkwMCBmb2N1czpvdXRsaW5lLWhpZGRlbiBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1wcmltYXJ5IGZvY3VzOmJvcmRlci1wcmltYXJ5XCJcbiAgICAgICAgICB2YWx1ZT17dmFsdWV9XG4gICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gb25DaGFuZ2UoZXZlbnQudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICBwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XG4gICAgICAgICAgYXJpYS1sYWJlbD17bGFiZWx9XG4gICAgICAgICAgcmVhZE9ubHk9e3JlYWRPbmx5fVxuICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxSZW1vdGVTZWFyY2hDb21ib2JveFxuICAgICAgbGFiZWw9e2xhYmVsfVxuICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxuICAgICAgdmFsdWU9e3ZhbHVlfVxuICAgICAgb25DaGFuZ2U9e29uQ2hhbmdlfVxuICAgICAgb25TZWFyY2g9e2FzeW5jICh0ZXJtLCBzaWduYWwpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXR1cm4gYXdhaXQgbG9hZE9wdGlvbnModGVybSwgc2lnbmFsKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yICYmIGVycm9yLnN0YXR1cyA9PT0gNDAzKSB7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgICAgfVxuICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgICB9fVxuICAgICAgb25TZWFyY2hQYWdlPXthc3luYyAodGVybSwgcGFnZSwgcGFnZVNpemUsIHNpZ25hbCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHJldHVybiBhd2FpdCBsb2FkT3B0aW9uc1BhZ2UodGVybSwgcGFnZSwgcGFnZVNpemUsIHNpZ25hbCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvciAmJiBlcnJvci5zdGF0dXMgPT09IDQwMykge1xuICAgICAgICAgICAgcmV0dXJuIHsgaXRlbXM6IFtdLCB0b3RhbDogMCB9O1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfX1cbiAgICAgIGlkQmFzZT1cImV4cGVuc2Utc2hlZXQtZmlsdGVyXCJcbiAgICAgIG1pblNlYXJjaExlbmd0aD17MH1cbiAgICAgIHBhZ2VTaXplPXtTRUFSQ0hfUEFHRV9TSVpFfVxuICAgICAgYWxsb3dFbXB0eVNlYXJjaFxuICAgICAgbG9hZE9uT3BlblxuICAgICAgaW5maW5pdGVTY3JvbGxcbiAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgIHJlYWRPbmx5PXtyZWFkT25seX1cbiAgICAgIHNob3dMYWJlbD17c2hvd0xhYmVsfVxuICAgICAgcGFuZWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxuICAgIC8+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlU2hlZXRGaWx0ZXJJbnB1dDtcbiIsICJpbXBvcnQgdHlwZSB7IEV4cGVuc2VTaGVldExpc3RGaWx0ZXJzLCBFeHBlbnNlU2hlZXRMaXN0UmVxdWVzdCB9IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcblxuY29uc3QgREVGQVVMVF9TVUdHRVNUX1BBR0VfU0laRSA9IDUwO1xuXG4vLyBCdWlsZCBsaXN0IHBheWxvYWQgZm9yIC9HYXN0b3MvTGlzdEV4cGVuc2VTaGVldHMgZnJvbSBjdXJyZW50IGZpbHRlciBzdGF0ZS5cbmV4cG9ydCBjb25zdCBidWlsZEV4cGVuc2VMaXN0UGF5bG9hZCA9IChcbiAgZmlsdGVyczogRXhwZW5zZVNoZWV0TGlzdEZpbHRlcnMsXG4gIHBhZ2U6IG51bWJlcixcbiAgcGFnZVNpemU6IG51bWJlclxuKTogRXhwZW5zZVNoZWV0TGlzdFJlcXVlc3QgPT4ge1xuICBjb25zdCBuZXh0UGFnZSA9IE51bWJlci5pc0Zpbml0ZShwYWdlKSAmJiBwYWdlID4gMCA/IHBhZ2UgOiAxO1xuICBjb25zdCBuZXh0UGFnZVNpemUgPSBOdW1iZXIuaXNGaW5pdGUocGFnZVNpemUpICYmIHBhZ2VTaXplID4gMCA/IHBhZ2VTaXplIDogREVGQVVMVF9TVUdHRVNUX1BBR0VfU0laRTtcbiAgY29uc3Qgc2FmZUZpbHRlciA9IFN0cmluZyhmaWx0ZXJzLmZpbHRlciB8fCBmaWx0ZXJzLmhvamFHYXN0b3NJZCB8fCBcIlwiKS50cmltKCk7XG5cbiAgcmV0dXJuIHtcbiAgICBmaWx0ZXI6IHNhZmVGaWx0ZXIsXG4gICAgYmlsbGVkTW9kZTogZmlsdGVycy5iaWxsZWRNb2RlLFxuICAgIGZyb21EYXRlOiBmaWx0ZXJzLmZyb21EYXRlLFxuICAgIHRvRGF0ZTogZmlsdGVycy50b0RhdGUsXG4gICAgcHJvamVjdElkOiBmaWx0ZXJzLnByb2plY3RJZCxcbiAgICBob2phR2FzdG9zSWQ6IGZpbHRlcnMuaG9qYUdhc3Rvc0lkLFxuICAgIGN1cnJlbmN5Q29kZTogZmlsdGVycy5jdXJyZW5jeUNvZGUsXG4gICAgcGFnZTogbmV4dFBhZ2UsXG4gICAgcGFnZVNpemU6IG5leHRQYWdlU2l6ZSxcbiAgfTtcbn07XG5cbi8vIEJ1aWxkIHN1Z2dlc3Rpb24gcGF5bG9hZCBmb3IgZXhwZW5zZSBzaGVldCBkcm9wZG93biBzZWFyY2guXG5leHBvcnQgY29uc3QgYnVpbGRFeHBlbnNlU2hlZXRTdWdnZXN0UGF5bG9hZCA9IChcbiAgdGVybTogc3RyaW5nLFxuICBwYWdlU2l6ZSA9IERFRkFVTFRfU1VHR0VTVF9QQUdFX1NJWkUsXG4gIHBhZ2UgPSAxXG4pOiBFeHBlbnNlU2hlZXRMaXN0UmVxdWVzdCA9PiB7XG4gIGNvbnN0IHNhZmVUZXJtID0gU3RyaW5nKHRlcm0gfHwgXCJcIikudHJpbSgpO1xuICBjb25zdCBuZXh0UGFnZVNpemUgPSBOdW1iZXIuaXNGaW5pdGUocGFnZVNpemUpICYmIHBhZ2VTaXplID4gMCA/IHBhZ2VTaXplIDogREVGQVVMVF9TVUdHRVNUX1BBR0VfU0laRTtcbiAgY29uc3QgbmV4dFBhZ2UgPSBOdW1iZXIuaXNGaW5pdGUocGFnZSkgJiYgcGFnZSA+IDAgPyBNYXRoLmZsb29yKHBhZ2UpIDogMTtcblxuICByZXR1cm4ge1xuICAgIGZpbHRlcjogc2FmZVRlcm0sXG4gICAgYmlsbGVkTW9kZTogMixcbiAgICBmcm9tRGF0ZTogXCJcIixcbiAgICB0b0RhdGU6IFwiXCIsXG4gICAgcHJvamVjdElkOiBcIlwiLFxuICAgIGhvamFHYXN0b3NJZDogXCJcIixcbiAgICBjdXJyZW5jeUNvZGU6IFwiXCIsXG4gICAgcGFnZTogbmV4dFBhZ2UsXG4gICAgcGFnZVNpemU6IG5leHRQYWdlU2l6ZSxcbiAgfTtcbn07XG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IEZpbHRlckJ1dHRvbiBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0ZpbHRlckJ1dHRvbi50c3hcIjtcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuaW1wb3J0IEV4cGVuc2VCaWxsZWRNb2RlRmlsdGVyU2VsZWN0IGZyb20gXCIuL0V4cGVuc2VCaWxsZWRNb2RlRmlsdGVyU2VsZWN0LnRzeFwiO1xuaW1wb3J0IEV4cGVuc2VDdXJyZW5jeUZpbHRlclNlbGVjdCBmcm9tIFwiLi9FeHBlbnNlQ3VycmVuY3lGaWx0ZXJTZWxlY3QudHN4XCI7XG5pbXBvcnQgRXhwZW5zZURhdGVSYW5nZUZpbHRlciBmcm9tIFwiLi9FeHBlbnNlRGF0ZVJhbmdlRmlsdGVyLnRzeFwiO1xuaW1wb3J0IEV4cGVuc2VGaWx0ZXJBY3Rpb25zIGZyb20gXCIuL0V4cGVuc2VGaWx0ZXJBY3Rpb25zLnRzeFwiO1xuaW1wb3J0IEV4cGVuc2VQcm9qZWN0RmlsdGVySW5wdXQgZnJvbSBcIi4vRXhwZW5zZVByb2plY3RGaWx0ZXJJbnB1dC50c3hcIjtcbmltcG9ydCBFeHBlbnNlU2hlZXRGaWx0ZXJJbnB1dCBmcm9tIFwiLi9FeHBlbnNlU2hlZXRGaWx0ZXJJbnB1dC50c3hcIjtcbmltcG9ydCBIaXN0b3J5U3VtbWFyeSBmcm9tIFwiLi4vLi4vdmlzaXRhcy9oaXN0b3JpYWwvSGlzdG9yeVN1bW1hcnkudHN4XCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VRdWlja0ZpbHRlcklkIH0gZnJvbSBcIi4uL2xpc3QvZXhwZW5zZUxpc3RUeXBlcy50c1wiO1xuXG5leHBvcnQgdHlwZSB7IEV4cGVuc2VRdWlja0ZpbHRlcklkIH07XG5cbmNvbnN0IHBhcnNlSXNvRGF0ZSA9IChyYXc6IHN0cmluZyk6IERhdGUgfCBudWxsID0+IHtcbiAgaWYgKCFyYXcpIHJldHVybiBudWxsO1xuICBjb25zdCB2YWx1ZSA9IFN0cmluZyhyYXcpLnRyaW0oKS5zcGxpdChcIlRcIilbMF07XG4gIGlmICghL15cXGR7NH0tXFxkezJ9LVxcZHsyfSQvLnRlc3QodmFsdWUpKSByZXR1cm4gbnVsbDtcbiAgY29uc3QgW3llYXIsIG1vbnRoLCBkYXldID0gdmFsdWUuc3BsaXQoXCItXCIpLm1hcChOdW1iZXIpO1xuICByZXR1cm4gbmV3IERhdGUoeWVhciwgbW9udGggLSAxLCBkYXkpO1xufTtcblxuY29uc3QgZm9ybWF0RGF0ZSA9IChyYXc6IHN0cmluZywgbG9jYWxlOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICBjb25zdCBkYXRlID0gcGFyc2VJc29EYXRlKHJhdyk7XG4gIGlmICghZGF0ZSkgcmV0dXJuIFwiLS1cIjtcbiAgcmV0dXJuIGRhdGVcbiAgICAudG9Mb2NhbGVEYXRlU3RyaW5nKGxvY2FsZSwge1xuICAgICAgZGF5OiBcIm51bWVyaWNcIixcbiAgICAgIG1vbnRoOiBcInNob3J0XCIsXG4gICAgICB5ZWFyOiBcIm51bWVyaWNcIixcbiAgICB9KVxuICAgIC5yZXBsYWNlKC9cXC4vZywgXCJcIilcbiAgICAudG9Mb3dlckNhc2UoKTtcbn07XG5cbnR5cGUgRXhwZW5zZUZpbHRlcnNQYW5lbFByb3BzID0ge1xuICB2aXNpYmxlOiBib29sZWFuO1xuICBzaG93TWFudWFsRGF0ZUZpbHRlcjogYm9vbGVhbjtcbiAgbWFudWFsRGF0ZUF1dG9PcGVuS2V5OiBudW1iZXI7XG4gIGZyb21EYXRlOiBzdHJpbmc7XG4gIHRvRGF0ZTogc3RyaW5nO1xuICBwcm9qZWN0SWQ6IHN0cmluZztcbiAgaG9qYUdhc3Rvc0lkOiBzdHJpbmc7XG4gIGN1cnJlbmN5Q29kZTogc3RyaW5nO1xuICBiaWxsZWRNb2RlOiBudW1iZXI7XG4gIGFjdGl2ZVF1aWNrRmlsdGVyOiBFeHBlbnNlUXVpY2tGaWx0ZXJJZCB8IG51bGw7XG4gIHNob3dNYW51YWxEYXRlRXJyb3I6IGJvb2xlYW47XG4gIG9uRGF0ZVJhbmdlQ2hhbmdlOiAoZnJvbURhdGU6IHN0cmluZywgdG9EYXRlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uUXVpY2tGaWx0ZXJDaGFuZ2U6IChmaWx0ZXJJZDogRXhwZW5zZVF1aWNrRmlsdGVySWQpID0+IHZvaWQ7XG4gIG9uUHJvamVjdElkQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgb25Ib2phR2FzdG9zSWRDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBvbkN1cnJlbmN5Q29kZUNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uQmlsbGVkTW9kZUNoYW5nZTogKHZhbHVlOiBudW1iZXIpID0+IHZvaWQ7XG4gIG9uQ2xlYXI6ICgpID0+IHZvaWQ7XG4gIG9uQXBwbHk6ICgpID0+IHZvaWQ7XG59O1xuXG4vLyBTaGFyZWQgZXhwZW5zZSBzaGVldCBmaWx0ZXIgcGFuZWwgY29tcG9zZWQgZnJvbSByZXVzYWJsZSBtb2R1bGUgY29tcG9uZW50cy5cbmNvbnN0IEV4cGVuc2VGaWx0ZXJzUGFuZWwgPSAoe1xuICB2aXNpYmxlLFxuICBzaG93TWFudWFsRGF0ZUZpbHRlcixcbiAgbWFudWFsRGF0ZUF1dG9PcGVuS2V5LFxuICBmcm9tRGF0ZSxcbiAgdG9EYXRlLFxuICBwcm9qZWN0SWQsXG4gIGhvamFHYXN0b3NJZCxcbiAgY3VycmVuY3lDb2RlLFxuICBiaWxsZWRNb2RlLFxuICBhY3RpdmVRdWlja0ZpbHRlcixcbiAgc2hvd01hbnVhbERhdGVFcnJvcixcbiAgb25EYXRlUmFuZ2VDaGFuZ2UsXG4gIG9uUXVpY2tGaWx0ZXJDaGFuZ2UsXG4gIG9uUHJvamVjdElkQ2hhbmdlLFxuICBvbkhvamFHYXN0b3NJZENoYW5nZSxcbiAgb25DdXJyZW5jeUNvZGVDaGFuZ2UsXG4gIG9uQmlsbGVkTW9kZUNoYW5nZSxcbiAgb25DbGVhcixcbiAgb25BcHBseSxcbn06IEV4cGVuc2VGaWx0ZXJzUGFuZWxQcm9wcykgPT4ge1xuICBpZiAoIXZpc2libGUpIHJldHVybiBudWxsO1xuICBjb25zdCBsb2NhbGUgPSBkb2N1bWVudD8uZG9jdW1lbnRFbGVtZW50Py5sYW5nIHx8IFwiZXMtRVNcIjtcbiAgY29uc3Qgc2hvd0lubGluZURhdGVTdW1tYXJ5ID0gIXNob3dNYW51YWxEYXRlRmlsdGVyICYmICEhZnJvbURhdGUgJiYgISF0b0RhdGU7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImZpbHRlci1jYXJkIGZpbHRlci1jYXJkLS1leHBhbmRlZCBwLTIgc206cC0yLjUgcmVsYXRpdmVcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGlzdG9yeS1maWx0ZXItc3RhY2sgZmxleCBmbGV4LWNvbCBzcGFjZS15LTJcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIGdhcC0yIGhpc3RvcnktcXVpY2stZmlsdGVyc1wiIGFyaWEtbGFiZWw9e2luZFQoXCJIaXN0b3J5X0ZpbHRlcl9EYXRlXCIsIFwiRGF0ZVwiKX0+XG4gICAgICAgICAgPEZpbHRlckJ1dHRvblxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJIaXN0b3J5X1F1aWNrX0N1c3RvbVwiLCBcIkRhdGVcIil9XG4gICAgICAgICAgICBhY3RpdmU9e2FjdGl2ZVF1aWNrRmlsdGVyID09PSBcImN1c3RvbVwifVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG9uUXVpY2tGaWx0ZXJDaGFuZ2UoXCJjdXN0b21cIil9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8RmlsdGVyQnV0dG9uXG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIkhpc3RvcnlfUXVpY2tfN0RheXNcIiwgXCI3IGRheXNcIil9XG4gICAgICAgICAgICBhY3RpdmU9e2FjdGl2ZVF1aWNrRmlsdGVyID09PSBcImRheXMtN1wifVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG9uUXVpY2tGaWx0ZXJDaGFuZ2UoXCJkYXlzLTdcIil9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8RmlsdGVyQnV0dG9uXG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIkhpc3RvcnlfUXVpY2tfMzBEYXlzXCIsIFwiMzAgZGF5c1wiKX1cbiAgICAgICAgICAgIGFjdGl2ZT17YWN0aXZlUXVpY2tGaWx0ZXIgPT09IFwiZGF5cy0zMFwifVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG9uUXVpY2tGaWx0ZXJDaGFuZ2UoXCJkYXlzLTMwXCIpfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPEZpbHRlckJ1dHRvblxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJIaXN0b3J5X1F1aWNrXzkwRGF5c1wiLCBcIjkwIGRheXNcIil9XG4gICAgICAgICAgICBhY3RpdmU9e2FjdGl2ZVF1aWNrRmlsdGVyID09PSBcImRheXMtOTBcIn1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbFwiXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvblF1aWNrRmlsdGVyQ2hhbmdlKFwiZGF5cy05MFwiKX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7c2hvd01hbnVhbERhdGVGaWx0ZXIgPyAoXG4gICAgICAgICAgPEV4cGVuc2VEYXRlUmFuZ2VGaWx0ZXJcbiAgICAgICAgICAgIGZyb21EYXRlPXtmcm9tRGF0ZX1cbiAgICAgICAgICAgIHRvRGF0ZT17dG9EYXRlfVxuICAgICAgICAgICAgb25DaGFuZ2U9e29uRGF0ZVJhbmdlQ2hhbmdlfVxuICAgICAgICAgICAgYXV0b09wZW5SZXF1ZXN0SWQ9e21hbnVhbERhdGVBdXRvT3BlbktleX1cbiAgICAgICAgICAgIHNob3dNYW51YWxFcnJvcj17c2hvd01hbnVhbERhdGVFcnJvcn1cbiAgICAgICAgICAgIHNob3dTdGFydEVycm9yPXtzaG93TWFudWFsRGF0ZUVycm9yICYmICFmcm9tRGF0ZX1cbiAgICAgICAgICAgIHNob3dFbmRFcnJvcj17c2hvd01hbnVhbERhdGVFcnJvciAmJiAhdG9EYXRlfVxuICAgICAgICAgIC8+XG4gICAgICAgICkgOiBzaG93SW5saW5lRGF0ZVN1bW1hcnkgPyAoXG4gICAgICAgICAgPEhpc3RvcnlTdW1tYXJ5XG4gICAgICAgICAgICBzdW1tYXJ5RnJvbUxhYmVsPXtpbmRUKFwiSGlzdG9yeV9Gcm9tXCIsIFwiRnJvbVwiKX1cbiAgICAgICAgICAgIHN1bW1hcnlUb0xhYmVsPXtpbmRUKFwiSGlzdG9yeV9Ub1wiLCBcIlRvXCIpfVxuICAgICAgICAgICAgZnJvbVZhbHVlPXtmb3JtYXREYXRlKGZyb21EYXRlLCBsb2NhbGUpfVxuICAgICAgICAgICAgdG9WYWx1ZT17Zm9ybWF0RGF0ZSh0b0RhdGUsIGxvY2FsZSl9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJnYXAteS0xIHRleHQtWzExcHhdIHB4LTFcIlxuICAgICAgICAgIC8+XG4gICAgICAgICkgOiBudWxsfVxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBzbTpncmlkLWNvbHMtNCBnYXAtMlwiPlxuICAgICAgICAgIDxFeHBlbnNlUHJvamVjdEZpbHRlcklucHV0XG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX1Byb2plY3RcIiwgXCJQcm9qZWN0XCIpfVxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9Qcm9qZWN0XCIsIFwiUHJvamVjdFwiKX1cbiAgICAgICAgICAgIHZhbHVlPXtwcm9qZWN0SWR9XG4gICAgICAgICAgICBvbkNoYW5nZT17b25Qcm9qZWN0SWRDaGFuZ2V9XG4gICAgICAgICAgICBzaG93TGFiZWw9e2ZhbHNlfVxuICAgICAgICAgIC8+XG5cbiAgICAgICAgICA8RXhwZW5zZVNoZWV0RmlsdGVySW5wdXRcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfU2hlZXRcIiwgXCJFeHBlbnNlIHNoZWV0XCIpfVxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9TaGVldFwiLCBcIkV4cGVuc2Ugc2hlZXRcIil9XG4gICAgICAgICAgICB2YWx1ZT17aG9qYUdhc3Rvc0lkfVxuICAgICAgICAgICAgb25DaGFuZ2U9e29uSG9qYUdhc3Rvc0lkQ2hhbmdlfVxuICAgICAgICAgICAgZW5hYmxlUmVtb3RlU3VnZ2VzdGlvbnNcbiAgICAgICAgICAgIHNob3dMYWJlbD17ZmFsc2V9XG4gICAgICAgICAgLz5cblxuICAgICAgICAgIDxFeHBlbnNlQ3VycmVuY3lGaWx0ZXJTZWxlY3RcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfQ3VycmVuY3lcIiwgXCJDdXJyZW5jeVwiKX1cbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfQ3VycmVuY3lcIiwgXCJDdXJyZW5jeVwiKX1cbiAgICAgICAgICAgIHZhbHVlPXtjdXJyZW5jeUNvZGV9XG4gICAgICAgICAgICBvbkNoYW5nZT17b25DdXJyZW5jeUNvZGVDaGFuZ2V9XG4gICAgICAgICAgICBzaG93TGFiZWw9e2ZhbHNlfVxuICAgICAgICAgIC8+XG5cbiAgICAgICAgICA8RXhwZW5zZUJpbGxlZE1vZGVGaWx0ZXJTZWxlY3RcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfU3RhdHVzXCIsIFwiRXN0YWRvXCIpfVxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9TdGF0dXNcIiwgXCJFc3RhZG9cIil9XG4gICAgICAgICAgICB2YWx1ZT17YmlsbGVkTW9kZX1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkJpbGxlZE1vZGVDaGFuZ2V9XG4gICAgICAgICAgICBzaG93TGFiZWw9e2ZhbHNlfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxFeHBlbnNlRmlsdGVyQWN0aW9uc1xuICAgICAgICAgIGNsZWFyTGFiZWw9e2luZFQoXCJIaXN0b3J5X0ZpbHRlcl9DbGVhclwiLCBcIkNsZWFyXCIpfVxuICAgICAgICAgIGFwcGx5TGFiZWw9e2luZFQoXCJIaXN0b3J5X0ZpbHRlcl9BcHBseVwiLCBcIkFwcGx5XCIpfVxuICAgICAgICAgIG9uQ2xlYXI9e29uQ2xlYXJ9XG4gICAgICAgICAgb25BcHBseT17b25BcHBseX1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZUZpbHRlcnNQYW5lbDtcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IEFwaUZldGNoRXJyb3IgfSBmcm9tIFwiLi4vLi4vLi4vc2VydmljZXMvYXBpU2VydmljZS50c1wiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTaGVldENhcmQsIEV4cGVuc2VTaGVldExpc3RGaWx0ZXJzIH0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xuaW1wb3J0IHsgYnVpbGRFeHBlbnNlTGlzdFBheWxvYWQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVBheWxvYWRCdWlsZGVycy50c1wiO1xuaW1wb3J0IHsgZmV0Y2hFeHBlbnNlU2hlZXRMaXN0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcblxudHlwZSBVc2VFeHBlbnNlU2hlZXRzTGlzdERhdGFBcmdzID0ge1xuICBoYXNBY2Nlc3M6IGJvb2xlYW47XG4gIHBhZ2VTaXplOiBudW1iZXI7XG4gIG9uRm9yYmlkZGVuOiAoKSA9PiB2b2lkO1xufTtcblxuLy8gT3ducyBsaXN0IGRhdGEgZmV0Y2gsIGxvYWRpbmcgc3RhdGUsIGFuZCBwYWdpbmF0aW9uIG1ldGFkYXRhLlxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VTaGVldHNMaXN0RGF0YSA9ICh7IGhhc0FjY2VzcywgcGFnZVNpemUsIG9uRm9yYmlkZGVuIH06IFVzZUV4cGVuc2VTaGVldHNMaXN0RGF0YUFyZ3MpID0+IHtcbiAgY29uc3QgW2l0ZW1zLCBzZXRJdGVtc10gPSB1c2VTdGF0ZTxFeHBlbnNlU2hlZXRDYXJkW10+KFtdKTtcbiAgY29uc3QgW3RvdGFsLCBzZXRUb3RhbF0gPSB1c2VTdGF0ZSgwKTtcbiAgY29uc3QgW2N1cnJlbnRQYWdlLCBzZXRDdXJyZW50UGFnZV0gPSB1c2VTdGF0ZSgxKTtcbiAgY29uc3QgW2lzTG9hZGluZywgc2V0SXNMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2Vycm9yTWVzc2FnZSwgc2V0RXJyb3JNZXNzYWdlXSA9IHVzZVN0YXRlKFwiXCIpO1xuXG4gIGNvbnN0IGxvYWRMaXN0ID0gdXNlQ2FsbGJhY2soXG4gICAgYXN5bmMgKHBhZ2U6IG51bWJlciwgZmlsdGVyczogRXhwZW5zZVNoZWV0TGlzdEZpbHRlcnMpID0+IHtcbiAgICAgIGlmICghaGFzQWNjZXNzKSB7XG4gICAgICAgIG9uRm9yYmlkZGVuKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgc2V0SXNMb2FkaW5nKHRydWUpO1xuICAgICAgc2V0RXJyb3JNZXNzYWdlKFwiXCIpO1xuICAgICAgY29uc3QgcGF5bG9hZCA9IGJ1aWxkRXhwZW5zZUxpc3RQYXlsb2FkKGZpbHRlcnMsIHBhZ2UsIHBhZ2VTaXplKTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEV4cGVuc2VTaGVldExpc3QocGF5bG9hZCwge1xuICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAocmVzcG9uc2U/LnN1Y2Nlc3MgPT09IGZhbHNlKSB7XG4gICAgICAgICAgc2V0RXJyb3JNZXNzYWdlKHJlc3BvbnNlLm1lc3NhZ2UgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfTG9hZEVycm9yXCIsIFwiQ291bGQgbm90IGxvYWQgZXhwZW5zZSBzaGVldHMuXCIpKTtcbiAgICAgICAgICBzZXRJdGVtcyhbXSk7XG4gICAgICAgICAgc2V0VG90YWwoMCk7XG4gICAgICAgICAgc2V0Q3VycmVudFBhZ2UocGFnZSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbmV4dEl0ZW1zID0gQXJyYXkuaXNBcnJheShyZXNwb25zZT8uaXRlbXMpID8gcmVzcG9uc2UuaXRlbXMgOiBbXTtcbiAgICAgICAgY29uc3QgbmV4dFRvdGFsID0gTnVtYmVyKHJlc3BvbnNlPy50b3RhbCB8fCBuZXh0SXRlbXMubGVuZ3RoIHx8IDApO1xuICAgICAgICBzZXRJdGVtcyhuZXh0SXRlbXMpO1xuICAgICAgICBzZXRUb3RhbChuZXh0VG90YWwpO1xuICAgICAgICBzZXRDdXJyZW50UGFnZShwYWdlKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IgJiYgZXJyb3Iuc3RhdHVzID09PSA0MDMpIHtcbiAgICAgICAgICBvbkZvcmJpZGRlbigpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0xvYWRFcnJvclwiLCBcIkNvdWxkIG5vdCBsb2FkIGV4cGVuc2Ugc2hlZXRzLlwiKTtcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKG1lc3NhZ2UpO1xuICAgICAgICBzZXRJdGVtcyhbXSk7XG4gICAgICAgIHNldFRvdGFsKDApO1xuICAgICAgICBzZXRDdXJyZW50UGFnZShwYWdlKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBbaGFzQWNjZXNzLCBvbkZvcmJpZGRlbiwgcGFnZVNpemVdXG4gICk7XG5cbiAgY29uc3QgcmVzZXRMaXN0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIHNldEl0ZW1zKFtdKTtcbiAgICBzZXRUb3RhbCgwKTtcbiAgICBzZXRDdXJyZW50UGFnZSgxKTtcbiAgICBzZXRFcnJvck1lc3NhZ2UoXCJcIik7XG4gIH0sIFtdKTtcblxuICByZXR1cm4ge1xuICAgIGl0ZW1zLFxuICAgIHRvdGFsLFxuICAgIGN1cnJlbnRQYWdlLFxuICAgIGlzTG9hZGluZyxcbiAgICBlcnJvck1lc3NhZ2UsXG4gICAgbG9hZExpc3QsXG4gICAgcmVzZXRMaXN0LFxuICB9O1xufTtcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlTWVtbywgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVF1aWNrRmlsdGVySWQsIEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCB9IGZyb20gXCIuL2V4cGVuc2VMaXN0VHlwZXMudHNcIjtcbmltcG9ydCB7IHN0YXJ0T2ZEYXksIHRvSXNvRGF0ZSB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xuaW1wb3J0IHsgbm9ybWFsaXplRXhwZW5zZUZpbHRlclNuYXBzaG90IH0gZnJvbSBcIi4vZXhwZW5zZUZpbHRlclNuYXBzaG90LnRzXCI7XG5cbnR5cGUgVXNlRXhwZW5zZVNoZWV0c0ZpbHRlcnNTdGF0ZUFyZ3MgPSB7XG4gIG9uQXBwbHlGaWx0ZXJzOiAoc25hcHNob3Q6IEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCkgPT4gdm9pZDtcbiAgb25DbGVhckZpbHRlcnM6ICgpID0+IHZvaWQ7XG59O1xuXG4vLyBPd25zIGZpbHRlciBVSSBzdGF0ZSBhbmQgYXBwbHkvY2xlYXIgcnVsZXMgZm9yIGV4cGVuc2UgbGlzdCBwYWdlLlxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VTaGVldHNGaWx0ZXJzU3RhdGUgPSAoeyBvbkFwcGx5RmlsdGVycywgb25DbGVhckZpbHRlcnMgfTogVXNlRXhwZW5zZVNoZWV0c0ZpbHRlcnNTdGF0ZUFyZ3MpID0+IHtcbiAgY29uc3QgW2Zyb21EYXRlLCBzZXRGcm9tRGF0ZV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW3RvRGF0ZSwgc2V0VG9EYXRlXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbcHJvamVjdElkLCBzZXRQcm9qZWN0SWRdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtob2phR2FzdG9zSWQsIHNldEhvamFHYXN0b3NJZF0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2N1cnJlbmN5Q29kZSwgc2V0Q3VycmVuY3lDb2RlXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbYmlsbGVkTW9kZSwgc2V0QmlsbGVkTW9kZV0gPSB1c2VTdGF0ZSgyKTtcbiAgY29uc3QgW2FjdGl2ZVF1aWNrRmlsdGVyLCBzZXRBY3RpdmVRdWlja0ZpbHRlcl0gPSB1c2VTdGF0ZTxFeHBlbnNlUXVpY2tGaWx0ZXJJZCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbc2hvd01hbnVhbERhdGVGaWx0ZXIsIHNldFNob3dNYW51YWxEYXRlRmlsdGVyXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3Nob3dNYW51YWxEYXRlRXJyb3IsIHNldFNob3dNYW51YWxEYXRlRXJyb3JdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbbWFudWFsRGF0ZUF1dG9PcGVuS2V5LCBzZXRNYW51YWxEYXRlQXV0b09wZW5LZXldID0gdXNlU3RhdGUoMCk7XG4gIGNvbnN0IFthcHBsaWVkRmlsdGVycywgc2V0QXBwbGllZEZpbHRlcnNdID0gdXNlU3RhdGU8QXBwbGllZEZpbHRlclNuYXBzaG90IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtzaG93RmlsdGVycywgc2V0U2hvd0ZpbHRlcnNdID0gdXNlU3RhdGUodHJ1ZSk7XG5cbiAgY29uc3QgY3VycmVudEZpbHRlcnMgPSB1c2VNZW1vPEFwcGxpZWRGaWx0ZXJTbmFwc2hvdD4oXG4gICAgKCkgPT4gKHtcbiAgICAgIGZyb21EYXRlLFxuICAgICAgdG9EYXRlLFxuICAgICAgcHJvamVjdElkLFxuICAgICAgaG9qYUdhc3Rvc0lkLFxuICAgICAgY3VycmVuY3lDb2RlLFxuICAgICAgYmlsbGVkTW9kZSxcbiAgICAgIGZpbHRlcjogaG9qYUdhc3Rvc0lkLFxuICAgIH0pLFxuICAgIFtiaWxsZWRNb2RlLCBjdXJyZW5jeUNvZGUsIGZyb21EYXRlLCBob2phR2FzdG9zSWQsIHByb2plY3RJZCwgdG9EYXRlXVxuICApO1xuXG4gIGNvbnN0IG9uQXBwbHkgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKCFmcm9tRGF0ZSB8fCAhdG9EYXRlKSB7XG4gICAgICBzZXRTaG93TWFudWFsRGF0ZUVycm9yKHRydWUpO1xuICAgICAgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXIodHJ1ZSk7XG4gICAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcihcImN1c3RvbVwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBzbmFwc2hvdDogQXBwbGllZEZpbHRlclNuYXBzaG90ID0ge1xuICAgICAgZnJvbURhdGUsXG4gICAgICB0b0RhdGUsXG4gICAgICBwcm9qZWN0SWQsXG4gICAgICBob2phR2FzdG9zSWQsXG4gICAgICBjdXJyZW5jeUNvZGUsXG4gICAgICBiaWxsZWRNb2RlLFxuICAgICAgZmlsdGVyOiBob2phR2FzdG9zSWQsXG4gICAgfTtcblxuICAgIHNldFNob3dNYW51YWxEYXRlRXJyb3IoZmFsc2UpO1xuICAgIHNldEFwcGxpZWRGaWx0ZXJzKHNuYXBzaG90KTtcbiAgICBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcihmYWxzZSk7XG4gICAgc2V0U2hvd0ZpbHRlcnMoZmFsc2UpO1xuICAgIG9uQXBwbHlGaWx0ZXJzKHNuYXBzaG90KTtcbiAgfSwgW2JpbGxlZE1vZGUsIGN1cnJlbmN5Q29kZSwgZnJvbURhdGUsIGhvamFHYXN0b3NJZCwgb25BcHBseUZpbHRlcnMsIHByb2plY3RJZCwgdG9EYXRlXSk7XG5cbiAgLy8gUmVoeWRyYXRlcyB0aGUgbGlzdCBmaWx0ZXJzIGZyb20gYSBjYWNoZWQgc25hcHNob3Qgd2hlbiByZXR1cm5pbmcgZnJvbSBkZXRhaWwuXG4gIGNvbnN0IHJlc3RvcmVBcHBsaWVkRmlsdGVycyA9IHVzZUNhbGxiYWNrKChzbmFwc2hvdDogQXBwbGllZEZpbHRlclNuYXBzaG90KSA9PiB7XG4gICAgY29uc3Qgbm9ybWFsaXplZCA9IG5vcm1hbGl6ZUV4cGVuc2VGaWx0ZXJTbmFwc2hvdChzbmFwc2hvdCk7XG4gICAgc2V0RnJvbURhdGUobm9ybWFsaXplZC5mcm9tRGF0ZSk7XG4gICAgc2V0VG9EYXRlKG5vcm1hbGl6ZWQudG9EYXRlKTtcbiAgICBzZXRQcm9qZWN0SWQobm9ybWFsaXplZC5wcm9qZWN0SWQpO1xuICAgIHNldEhvamFHYXN0b3NJZChub3JtYWxpemVkLmhvamFHYXN0b3NJZCk7XG4gICAgc2V0Q3VycmVuY3lDb2RlKG5vcm1hbGl6ZWQuY3VycmVuY3lDb2RlKTtcbiAgICBzZXRCaWxsZWRNb2RlKG5vcm1hbGl6ZWQuYmlsbGVkTW9kZSk7XG4gICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIobnVsbCk7XG4gICAgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXIoZmFsc2UpO1xuICAgIHNldFNob3dNYW51YWxEYXRlRXJyb3IoZmFsc2UpO1xuICAgIHNldEFwcGxpZWRGaWx0ZXJzKG5vcm1hbGl6ZWQpO1xuICAgIHNldFNob3dGaWx0ZXJzKGZhbHNlKTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IG9uQ2xlYXIgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgc2V0RnJvbURhdGUoXCJcIik7XG4gICAgc2V0VG9EYXRlKFwiXCIpO1xuICAgIHNldFByb2plY3RJZChcIlwiKTtcbiAgICBzZXRIb2phR2FzdG9zSWQoXCJcIik7XG4gICAgc2V0Q3VycmVuY3lDb2RlKFwiXCIpO1xuICAgIHNldEJpbGxlZE1vZGUoMik7XG4gICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIobnVsbCk7XG4gICAgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXIoZmFsc2UpO1xuICAgIHNldFNob3dNYW51YWxEYXRlRXJyb3IoZmFsc2UpO1xuICAgIHNldE1hbnVhbERhdGVBdXRvT3BlbktleSgwKTtcbiAgICBzZXRBcHBsaWVkRmlsdGVycyhudWxsKTtcbiAgICBzZXRTaG93RmlsdGVycyh0cnVlKTtcbiAgICBvbkNsZWFyRmlsdGVycygpO1xuICB9LCBbb25DbGVhckZpbHRlcnNdKTtcblxuICBjb25zdCBvbkRhdGVSYW5nZUNoYW5nZSA9IHVzZUNhbGxiYWNrKFxuICAgIChuZXh0RnJvbURhdGU6IHN0cmluZywgbmV4dFRvRGF0ZTogc3RyaW5nKSA9PiB7XG4gICAgICBzZXRGcm9tRGF0ZShuZXh0RnJvbURhdGUpO1xuICAgICAgc2V0VG9EYXRlKG5leHRUb0RhdGUpO1xuICAgICAgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXIodHJ1ZSk7XG4gICAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcihcImN1c3RvbVwiKTtcbiAgICAgIGlmIChzaG93TWFudWFsRGF0ZUVycm9yKSB7XG4gICAgICAgIHNldFNob3dNYW51YWxEYXRlRXJyb3IoIShuZXh0RnJvbURhdGUgJiYgbmV4dFRvRGF0ZSkpO1xuICAgICAgfVxuICAgIH0sXG4gICAgW3Nob3dNYW51YWxEYXRlRXJyb3JdXG4gICk7XG5cbiAgY29uc3Qgb25RdWlja0ZpbHRlckNoYW5nZSA9IHVzZUNhbGxiYWNrKFxuICAgIChmaWx0ZXJJZDogRXhwZW5zZVF1aWNrRmlsdGVySWQpID0+IHtcbiAgICAgIGlmIChmaWx0ZXJJZCA9PT0gXCJjdXN0b21cIikge1xuICAgICAgICBpZiAoc2hvd01hbnVhbERhdGVGaWx0ZXIpIHtcbiAgICAgICAgICBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcihmYWxzZSk7XG4gICAgICAgICAgc2V0U2hvd01hbnVhbERhdGVFcnJvcihmYWxzZSk7XG4gICAgICAgICAgaWYgKCFmcm9tRGF0ZSB8fCAhdG9EYXRlKSB7XG4gICAgICAgICAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcihudWxsKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIoXCJjdXN0b21cIik7XG4gICAgICAgIHNldFNob3dNYW51YWxEYXRlRmlsdGVyKHRydWUpO1xuICAgICAgICBzZXRTaG93TWFudWFsRGF0ZUVycm9yKGZhbHNlKTtcbiAgICAgICAgc2V0TWFudWFsRGF0ZUF1dG9PcGVuS2V5KChwcmV2aW91cykgPT4gcHJldmlvdXMgKyAxKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcihmaWx0ZXJJZCk7XG4gICAgICBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcihmYWxzZSk7XG4gICAgICBzZXRTaG93TWFudWFsRGF0ZUVycm9yKGZhbHNlKTtcblxuICAgICAgY29uc3QgdG9kYXkgPSBzdGFydE9mRGF5KG5ldyBEYXRlKCkpO1xuICAgICAgY29uc3QgbmV4dEZyb20gPSBuZXcgRGF0ZSh0b2RheSk7XG4gICAgICBpZiAoZmlsdGVySWQgPT09IFwiZGF5cy03XCIpIHtcbiAgICAgICAgbmV4dEZyb20uc2V0RGF0ZSh0b2RheS5nZXREYXRlKCkgLSA2KTtcbiAgICAgIH0gZWxzZSBpZiAoZmlsdGVySWQgPT09IFwiZGF5cy0zMFwiKSB7XG4gICAgICAgIG5leHRGcm9tLnNldERhdGUodG9kYXkuZ2V0RGF0ZSgpIC0gMjkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV4dEZyb20uc2V0RGF0ZSh0b2RheS5nZXREYXRlKCkgLSA4OSk7XG4gICAgICB9XG5cbiAgICAgIHNldEZyb21EYXRlKHRvSXNvRGF0ZShuZXh0RnJvbSkpO1xuICAgICAgc2V0VG9EYXRlKHRvSXNvRGF0ZSh0b2RheSkpO1xuICAgIH0sXG4gICAgW2Zyb21EYXRlLCBzaG93TWFudWFsRGF0ZUZpbHRlciwgdG9EYXRlXVxuICApO1xuXG4gIGNvbnN0IHRvZ2dsZUZpbHRlclBhbmVsID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIHNldFNob3dGaWx0ZXJzKChwcmV2aW91cykgPT4ge1xuICAgICAgY29uc3QgbmV4dCA9ICFwcmV2aW91cztcbiAgICAgIGlmICghbmV4dCkge1xuICAgICAgICBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcihmYWxzZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV4dDtcbiAgICB9KTtcbiAgfSwgW10pO1xuXG4gIHJldHVybiB7XG4gICAgZnJvbURhdGUsXG4gICAgdG9EYXRlLFxuICAgIHByb2plY3RJZCxcbiAgICBob2phR2FzdG9zSWQsXG4gICAgY3VycmVuY3lDb2RlLFxuICAgIGJpbGxlZE1vZGUsXG4gICAgYWN0aXZlUXVpY2tGaWx0ZXIsXG4gICAgc2hvd01hbnVhbERhdGVGaWx0ZXIsXG4gICAgc2hvd01hbnVhbERhdGVFcnJvcixcbiAgICBtYW51YWxEYXRlQXV0b09wZW5LZXksXG4gICAgYXBwbGllZEZpbHRlcnMsXG4gICAgc2hvd0ZpbHRlcnMsXG4gICAgY3VycmVudEZpbHRlcnMsXG4gICAgc2V0UHJvamVjdElkLFxuICAgIHNldEhvamFHYXN0b3NJZCxcbiAgICBzZXRDdXJyZW5jeUNvZGUsXG4gICAgc2V0QmlsbGVkTW9kZSxcbiAgICBvbkFwcGx5LFxuICAgIG9uQ2xlYXIsXG4gICAgcmVzdG9yZUFwcGxpZWRGaWx0ZXJzLFxuICAgIG9uRGF0ZVJhbmdlQ2hhbmdlLFxuICAgIG9uUXVpY2tGaWx0ZXJDaGFuZ2UsXG4gICAgdG9nZ2xlRmlsdGVyUGFuZWwsXG4gIH07XG59O1xuIiwgImltcG9ydCB0eXBlIHsgQXBwbGllZEZpbHRlclNuYXBzaG90IH0gZnJvbSBcIi4vZXhwZW5zZUxpc3RUeXBlcy50c1wiO1xuXG4vLyBOb3JtYWxpemVzIGFuIGV4cGVuc2UgZmlsdGVyIHNuYXBzaG90IHNvIGNhY2hlIGFuZCBVSSB1c2Ugb25lIGNhbm9uaWNhbCBzaGFwZS5cbmV4cG9ydCBjb25zdCBub3JtYWxpemVFeHBlbnNlRmlsdGVyU25hcHNob3QgPSAoXG4gIHZhbHVlOiBQYXJ0aWFsPEFwcGxpZWRGaWx0ZXJTbmFwc2hvdD4gfCBudWxsIHwgdW5kZWZpbmVkXG4pOiBBcHBsaWVkRmlsdGVyU25hcHNob3QgPT4ge1xuICBjb25zdCBiaWxsZWRNb2RlUmF3ID0gTnVtYmVyKHZhbHVlPy5iaWxsZWRNb2RlKTtcbiAgY29uc3QgYmlsbGVkTW9kZSA9IE51bWJlci5pc0Zpbml0ZShiaWxsZWRNb2RlUmF3KSAmJiBiaWxsZWRNb2RlUmF3ID49IDAgJiYgYmlsbGVkTW9kZVJhdyA8PSAyID8gYmlsbGVkTW9kZVJhdyA6IDI7XG4gIGNvbnN0IGhvamFHYXN0b3NJZCA9IFN0cmluZyh2YWx1ZT8uaG9qYUdhc3Rvc0lkIHx8IFwiXCIpLnRyaW0oKTtcblxuICByZXR1cm4ge1xuICAgIGZyb21EYXRlOiBTdHJpbmcodmFsdWU/LmZyb21EYXRlIHx8IFwiXCIpLnRyaW0oKSxcbiAgICB0b0RhdGU6IFN0cmluZyh2YWx1ZT8udG9EYXRlIHx8IFwiXCIpLnRyaW0oKSxcbiAgICBwcm9qZWN0SWQ6IFN0cmluZyh2YWx1ZT8ucHJvamVjdElkIHx8IFwiXCIpLnRyaW0oKSxcbiAgICBob2phR2FzdG9zSWQsXG4gICAgY3VycmVuY3lDb2RlOiBTdHJpbmcodmFsdWU/LmN1cnJlbmN5Q29kZSB8fCBcIlwiKS50cmltKCksXG4gICAgYmlsbGVkTW9kZSxcbiAgICBmaWx0ZXI6IFN0cmluZyh2YWx1ZT8uZmlsdGVyIHx8IGhvamFHYXN0b3NJZCB8fCBcIlwiKS50cmltKCksXG4gIH07XG59O1xuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgdHlwZSB7IEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCB9IGZyb20gXCIuL2V4cGVuc2VMaXN0VHlwZXMudHNcIjtcbmltcG9ydCB7IG5vcm1hbGl6ZUV4cGVuc2VGaWx0ZXJTbmFwc2hvdCB9IGZyb20gXCIuL2V4cGVuc2VGaWx0ZXJTbmFwc2hvdC50c1wiO1xuaW1wb3J0IHtcbiAgZ2V0U2Vzc2lvbkpzb25XaXRoRXhwaXJ5LFxuICBnZXRTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5LFxuICByZW1vdmVTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5LFxuICBzZXRTZXNzaW9uSnNvbldpdGhFeHBpcnksXG4gIHNldFNlc3Npb25WYWx1ZVdpdGhFeHBpcnksXG59IGZyb20gXCIuLi8uLi8uLi91dGlscy9zZXNzaW9uRXhwaXJ5LnRzXCI7XG5cbmNvbnN0IEVYUEVOU0VfU0hFRVRTX0ZJTFRFUl9LRVkgPSBcImV4cGVuc2Vfc2hlZXRzX2ZpbHRlcl92MVwiO1xuY29uc3QgRVhQRU5TRV9TSEVFVFNfUkVUVVJOX0ZMQUdfS0VZID0gXCJleHBlbnNlX3NoZWV0c19yZXR1cm5fdjFcIjtcbmNvbnN0IEVYUEVOU0VfU0hFRVRTX0NBQ0hFX1RUTF9NUyA9IDEyICogNjAgKiA2MCAqIDEwMDA7XG5cbmV4cG9ydCB0eXBlIEV4cGVuc2VTaGVldHNDYWNoZWRTdGF0ZSA9IHtcbiAgZmlsdGVyczogQXBwbGllZEZpbHRlclNuYXBzaG90O1xuICBwYWdlOiBudW1iZXI7XG4gIHNjcm9sbFk6IG51bWJlcjtcbn07XG5cbmNvbnN0IG5vcm1hbGl6ZVN0YXRlID0gKHJhdzogRXhwZW5zZVNoZWV0c0NhY2hlZFN0YXRlIHwgbnVsbCk6IEV4cGVuc2VTaGVldHNDYWNoZWRTdGF0ZSB8IG51bGwgPT4ge1xuICBpZiAoIXJhdyB8fCB0eXBlb2YgcmF3ICE9PSBcIm9iamVjdFwiKSByZXR1cm4gbnVsbDtcblxuICBjb25zdCBwYWdlUmF3ID0gTnVtYmVyKHJhdy5wYWdlKTtcbiAgY29uc3QgcGFnZSA9IE51bWJlci5pc0Zpbml0ZShwYWdlUmF3KSAmJiBwYWdlUmF3ID4gMCA/IE1hdGguZmxvb3IocGFnZVJhdykgOiAxO1xuXG4gIGNvbnN0IHNjcm9sbFJhdyA9IE51bWJlcihyYXcuc2Nyb2xsWSk7XG4gIGNvbnN0IHNjcm9sbFkgPSBOdW1iZXIuaXNGaW5pdGUoc2Nyb2xsUmF3KSAmJiBzY3JvbGxSYXcgPj0gMCA/IE1hdGguZmxvb3Ioc2Nyb2xsUmF3KSA6IDA7XG5cbiAgcmV0dXJuIHtcbiAgICBmaWx0ZXJzOiBub3JtYWxpemVFeHBlbnNlRmlsdGVyU25hcHNob3QocmF3LmZpbHRlcnMpLFxuICAgIHBhZ2UsXG4gICAgc2Nyb2xsWSxcbiAgfTtcbn07XG5cbi8vIENlbnRyYWxpemVzIGNhY2hlIHBlcnNpc3RlbmNlIGZvciByZXR1cm5pbmcgZnJvbSBleHBlbnNlIGRldGFpbCB0byBsaXN0LlxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VTaGVldHNGaWx0ZXJDYWNoZSA9ICgpID0+IHtcbiAgY29uc3QgcmVhZENhY2hlZFN0YXRlID0gdXNlQ2FsbGJhY2soKCk6IEV4cGVuc2VTaGVldHNDYWNoZWRTdGF0ZSB8IG51bGwgPT4ge1xuICAgIGNvbnN0IHJhdyA9IGdldFNlc3Npb25Kc29uV2l0aEV4cGlyeTxFeHBlbnNlU2hlZXRzQ2FjaGVkU3RhdGU+KEVYUEVOU0VfU0hFRVRTX0ZJTFRFUl9LRVkpO1xuICAgIHJldHVybiBub3JtYWxpemVTdGF0ZShyYXcpO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgY29uc3VtZVJldHVybkZsYWcgPSB1c2VDYWxsYmFjaygoKTogYm9vbGVhbiA9PiB7XG4gICAgY29uc3QgcmF3ID0gZ2V0U2Vzc2lvblZhbHVlV2l0aEV4cGlyeShFWFBFTlNFX1NIRUVUU19SRVRVUk5fRkxBR19LRVkpO1xuICAgIGlmIChyYXcgPT09IFwiMVwiKSB7XG4gICAgICByZW1vdmVTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KEVYUEVOU0VfU0hFRVRTX1JFVFVSTl9GTEFHX0tFWSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9LCBbXSk7XG5cbiAgY29uc3Qgc2F2ZUNhY2hlZFN0YXRlID0gdXNlQ2FsbGJhY2soKHN0YXRlOiBFeHBlbnNlU2hlZXRzQ2FjaGVkU3RhdGUpOiB2b2lkID0+IHtcbiAgICBjb25zdCBub3JtYWxpemVkID0gbm9ybWFsaXplU3RhdGUoc3RhdGUpO1xuICAgIGlmICghbm9ybWFsaXplZCkgcmV0dXJuO1xuXG4gICAgc2V0U2Vzc2lvbkpzb25XaXRoRXhwaXJ5KEVYUEVOU0VfU0hFRVRTX0ZJTFRFUl9LRVksIG5vcm1hbGl6ZWQsIEVYUEVOU0VfU0hFRVRTX0NBQ0hFX1RUTF9NUyk7XG4gICAgc2V0U2Vzc2lvblZhbHVlV2l0aEV4cGlyeShFWFBFTlNFX1NIRUVUU19SRVRVUk5fRkxBR19LRVksIFwiMVwiLCBFWFBFTlNFX1NIRUVUU19DQUNIRV9UVExfTVMpO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgY2xlYXJDYWNoZWRTdGF0ZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICByZW1vdmVTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KEVYUEVOU0VfU0hFRVRTX0ZJTFRFUl9LRVkpO1xuICAgIHJlbW92ZVNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoRVhQRU5TRV9TSEVFVFNfUkVUVVJOX0ZMQUdfS0VZKTtcbiAgfSwgW10pO1xuXG4gIHJldHVybiB7XG4gICAgcmVhZENhY2hlZFN0YXRlLFxuICAgIGNvbnN1bWVSZXR1cm5GbGFnLFxuICAgIHNhdmVDYWNoZWRTdGF0ZSxcbiAgICBjbGVhckNhY2hlZFN0YXRlLFxuICB9O1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUFBLGdCQUF1RDs7O0FDQXZELG1CQUErQjtBQW1DM0I7QUFuQkosSUFBTSxnQ0FBZ0MsQ0FBQztBQUFB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O0FBR0EsSUFBTSxvQkFBb0IsTUFBTTtBQUM5QixTQUNFLDZDQUFDLGdDQUNDLHVEQUFDLDRCQUF5QixHQUM1QjtBQUVKO0FBRUEsSUFBTSxRQUFRLE1BQU07QUFDbEIsUUFBTSxTQUFTLFNBQVMsZUFBZSxxQkFBcUI7QUFDNUQsTUFBSSxDQUFDLE9BQVE7QUFDYixtQkFBaUIsUUFBUSw2Q0FBQyxxQkFBa0IsQ0FBRTtBQUNoRDtBQUVBLHVCQUF1QixLQUFLO0FBRTVCLElBQU8sNEJBQVE7IiwKICAibmFtZXMiOiBbImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiUmVhY3QiXQp9Cg==
